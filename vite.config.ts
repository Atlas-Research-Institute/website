import { createServer, defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "path";
import {
  articleJsonLd,
  parseResource,
  RESOURCES_PATH,
  resourcePath,
  sortResources,
} from "./src/lib/resourceMeta";
import {
  canonicalUrl,
  documentTitle,
  ROUTE_SEO,
  SITE_ORIGIN,
  type RouteSeo,
} from "./src/lib/seo";

/**
 * Strip macOS junk from the build output.
 *
 * Vite copies `public/` into `dist/` VERBATIM and offers no ignore list, so
 * `public/.DS_Store` was being published — it is in .gitignore, which is exactly
 * why it went unnoticed: `git status` never mentions it, but the file is on disk
 * and the copy step does not consult .gitignore.
 *
 * Deleting the file is not a fix on its own. Finder recreates .DS_Store the next
 * time anyone opens the folder, so without this the leak returns on the next
 * build. This runs after the bundle is written and removes them from the output
 * rather than from the source, which is the only place it matters.
 *
 * .DS_Store leaks directory metadata — including names of files since deleted.
 */
function stripDsStore(): Plugin {
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (entry === ".DS_Store") {
        rmSync(full, { force: true });
        continue;
      }
      if (statSync(full).isDirectory()) walk(full);
    }
  };

  return {
    name: "strip-ds-store",
    apply: "build",
    closeBundle() {
      const out = path.resolve(__dirname, "dist");
      try {
        walk(out);
      } catch {
        // No dist, or it vanished mid-build. Nothing to clean, nothing to report.
      }
    },
  };
}

/**
 * Gives /resources and every Resources post its own HTML head, and adds the
 * posts to the sitemap.
 *
 * WHY. This is a client-rendered app: every route is served index.html, and
 * Seo.tsx corrects the tags only once JavaScript runs. Google runs it; the
 * crawlers behind link previews (Slack, LinkedIn, iMessage, X) do not, so
 * without this every shared post would preview as the homepage.
 *
 * WHAT. After the build, for /resources and each src/content/resources/*.md,
 * it copies dist/index.html to dist/resources[/<slug>]/index.html with the
 * title, description, canonical, og:*, twitter:* and og:image tags replaced,
 * og:type set to "article" and the Article JSON-LD added. Vercel serves a real
 * file before applying the SPA rewrite in vercel.json, so these pages get their
 * own head.
 *
 * The body is prerendered too: the page is rendered with React on the server
 * (src/entry-server.tsx) and written into #root, so the whole post, including
 * the collapsed transcript, is in the HTML before any JavaScript runs.
 * main.tsx then hydrates it.
 *
 * It also appends one <url> per post to dist/sitemap.xml, so a new post is in
 * the sitemap without anyone editing public/sitemap.xml.
 *
 * A post that fails validation, or has no cover in public/ (run
 * `npm run covers`), fails the build, naming the file.
 */
function resourcePages(): Plugin {
  const contentDir = path.resolve(__dirname, "src/content/resources");
  const outDir = path.resolve(__dirname, "dist");

  const escapeAttr = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  /** Replaces one attribute value in index.html, or fails if the tag is gone. */
  const setAttr = (html: string, tag: RegExp, value: string) => {
    if (!tag.test(html)) {
      throw new Error(`[resources] index.html no longer has ${tag}`);
    }
    return html.replace(tag, (_m, start: string, end: string) =>
      `${start}${escapeAttr(value)}${end}`
    );
  };

  const withHead = (
    template: string,
    pathname: string,
    seo: RouteSeo,
    body: string
  ) => {
    const title = documentTitle(seo);
    const canonical = canonicalUrl(pathname);
    let html = template;
    html = setAttr(html, /(<title>)[^<]*(<\/title>)/, title);
    html = setAttr(html, /(<meta\s+name="description"\s+content=")[^"]*(")/, seo.description);
    html = setAttr(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/, canonical);
    html = setAttr(html, /(<meta\s+property="og:title"\s+content=")[^"]*(")/, title);
    html = setAttr(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/, seo.description);
    html = setAttr(html, /(<meta\s+property="og:type"\s+content=")[^"]*(")/, seo.ogType ?? "website");
    html = setAttr(html, /(<meta\s+property="og:url"\s+content=")[^"]*(")/, canonical);
    html = setAttr(html, /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/, title);
    html = setAttr(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/, seo.description);
    if (seo.image) {
      html = setAttr(html, /(<meta\s+property="og:image"\s+content=")[^"]*(")/, `${SITE_ORIGIN}${seo.image}`);
      html = setAttr(html, /(<meta\s+name="twitter:image"\s+content=")[^"]*(")/, `${SITE_ORIGIN}${seo.image}`);
    }
    if (!html.includes('<div id="root"></div>')) {
      throw new Error('[resources] index.html no longer has <div id="root"></div>');
    }
    html = html.replace(
      '<div id="root"></div>',
      () => `<div id="root" data-prerendered="${escapeAttr(pathname)}">${body}</div>`
    );
    if (seo.jsonLd) {
      // "<" escaped so text in a post can never close the script tag.
      const json = JSON.stringify(seo.jsonLd).replace(/</g, "\\u003c");
      html = html.replace(
        "</head>",
        `  <script type="application/ld+json" id="route-jsonld">${json}</script>\n  </head>`
      );
    }
    return html;
  };

  const write = (pathname: string, html: string) => {
    const dir = path.join(outDir, pathname);
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, "index.html"), html);
  };

  return {
    name: "resource-pages",
    apply: "build",
    async closeBundle() {
      const posts = sortResources(
        readdirSync(contentDir)
          .filter((file) => file.endsWith(".md"))
          .map((file) => {
            const slug = file.replace(/\.md$/, "");
            try {
              return parseResource(slug, readFileSync(path.join(contentDir, file), "utf8"));
            } catch (err) {
              throw new Error(`[resources] ${file}: ${(err as Error).message}`);
            }
          })
      );

      for (const post of posts) {
        if (!existsSync(path.join(__dirname, "public", post.cover))) {
          throw new Error(
            `[resources] ${post.slug}.md has no cover at public${post.cover}. Run npm run covers.`
          );
        }
      }

      // A throwaway dev server, only to load the app through Vite (JSX, the
      // "@" alias, import.meta.glob) and render it to HTML.
      const server = await createServer({
        configFile: path.resolve(__dirname, "vite.config.ts"),
        server: { middlewareMode: true, hmr: false },
        appType: "custom",
        logLevel: "error",
        // react-router-dom's package points Node at its CommonJS build, which
        // hides StaticRouter from named imports; "module-sync" picks its ESM
        // build instead.
        ssr: { resolve: { externalConditions: ["module-sync"] } },
      });
      let render: (url: string) => string;
      try {
        ({ render } = await server.ssrLoadModule("/src/entry-server.tsx"));
      } catch (err) {
        await server.close();
        throw err;
      }

      try {
        const template = readFileSync(path.join(outDir, "index.html"), "utf8");
        write(
          RESOURCES_PATH,
          withHead(template, RESOURCES_PATH, ROUTE_SEO[RESOURCES_PATH], render(RESOURCES_PATH))
        );
        for (const post of posts) {
          write(
            resourcePath(post),
            withHead(
              template,
              resourcePath(post),
              {
                title: post.title,
                description: post.description,
                ogType: "article",
                image: post.cover,
                jsonLd: articleJsonLd(post),
              },
              render(resourcePath(post))
            )
          );
        }
      } finally {
        await server.close();
      }

      const sitemapPath = path.join(outDir, "sitemap.xml");
      const entries = posts
        .map(
          (post) =>
            `  <url>\n    <loc>${SITE_ORIGIN}${resourcePath(post)}</loc>\n    <lastmod>${post.updated ?? post.date}</lastmod>\n  </url>\n`
        )
        .join("");
      const sitemap = readFileSync(sitemapPath, "utf8");
      if (!sitemap.includes("</urlset>")) {
        throw new Error("[resources] public/sitemap.xml has no </urlset>");
      }
      writeFileSync(sitemapPath, sitemap.replace("</urlset>", `${entries}</urlset>`));
    },
  };
}

export default defineConfig({
  plugins: [react(), stripDsStore(), resourcePages()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

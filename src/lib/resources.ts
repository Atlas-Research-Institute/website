import { Marked } from "marked";
import {
  articleJsonLd,
  parseResource,
  RESOURCES_PATH,
  sortResources,
  type ResourcePost,
} from "./resourceMeta";
import { ROUTE_SEO, type RouteSeo } from "./seo";

/**
 * Every Resources post, read from src/content/resources/*.md at build time.
 *
 * Adding a post is adding a file: Vite's glob picks it up, the list page shows
 * it, it gets its own page, and the build writes its HTML head and sitemap
 * entry (see resourcePages in vite.config.ts). No code changes.
 *
 * A post that fails validation is left out here with a console error naming the
 * file, so one bad file cannot blank the page. The build is stricter: the same
 * error fails `npm run build`, so a broken post never ships.
 */
const files = import.meta.glob("../content/resources/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const RESOURCES: ResourcePost[] = sortResources(
  Object.entries(files).flatMap(([path, source]) => {
    const slug = path.split("/").pop()!.replace(/\.md$/, "");
    try {
      return [parseResource(slug, source)];
    } catch (err) {
      console.error(`[resources] ${slug}.md skipped: ${(err as Error).message}`);
      return [];
    }
  })
);

export function findResource(slug: string): ResourcePost | undefined {
  return RESOURCES.find((post) => post.slug === slug);
}

/**
 * Markdown to HTML. Posts are authored in this repo, so the HTML is trusted.
 * Links that leave the site open in a new tab. Raw HTML passes through, which is
 * how a post adds a collapsed <details> section.
 */
const marked = new Marked({
  gfm: true,
  renderer: {
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href);
      const titleAttr = title ? ` title="${title}"` : "";
      const target = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${href}"${titleAttr}${target}>${text}</a>`;
    },
    /**
     * Diagrams. Shown at their drawn width (460px, see
     * scripts/resource-covers.mjs) and loaded only when scrolled near.
     */
    image({ href, text }) {
      const alt = text.replace(/"/g, "&quot;");
      return `<img src="${href}" alt="${alt}" loading="lazy" decoding="async">`;
    },
  },
});

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false });
}

/**
 * SEO for a /resources/<slug> path, or undefined for any other path. An unknown
 * slug is noindex so a mistyped link never gets indexed as a page.
 */
export function resourceSeo(pathname: string): RouteSeo | undefined {
  const match = pathname.match(new RegExp(`^${RESOURCES_PATH}/([^/]+)/?$`));
  if (!match) return undefined;
  const post = findResource(match[1]);
  if (!post) {
    return { ...ROUTE_SEO[RESOURCES_PATH], noindex: true };
  }
  return {
    title: post.title,
    description: post.description,
    ogType: "article",
    image: post.cover,
    jsonLd: articleJsonLd(post),
  };
}

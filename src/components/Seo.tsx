import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  canonicalUrl,
  documentTitle,
  seoForPath,
  SITE_ORIGIN,
} from "@/lib/seo";
import { resourceSeo } from "@/lib/resources";

/**
 * Writes the per-route title, description and canonical URL.
 *
 * Mounted once in App, inside the router. Renders nothing.
 *
 * This runs on the client, so a crawler that does not execute JS sees the
 * defaults baked into index.html instead. That is the reason index.html carries
 * a complete set of tags rather than placeholders: the home page must be correct
 * without JS, and every other route degrades to the site-level title and
 * description rather than to nothing.
 */
function setMeta(selector: string, attr: "content" | "href", value: string) {
  const el = document.head.querySelector(selector);
  if (el) {
    el.setAttribute(attr, value);
    return;
  }
  // Only the canonical link is created on demand; every meta tag already exists
  // in index.html, so a missing one means the markup was edited out of sync.
  if (selector === 'link[rel="canonical"]') {
    const link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    link.setAttribute("href", value);
    document.head.appendChild(link);
  }
}

/**
 * Adds <meta name="robots" content="noindex"> on noindex routes and removes it
 * everywhere else, so it never lingers after client-side navigation.
 */
function setRobots(noindex: boolean) {
  const existing = document.head.querySelector('meta[name="robots"]');
  if (!noindex) {
    existing?.remove();
    return;
  }
  if (existing) {
    existing.setAttribute("content", "noindex");
    return;
  }
  const meta = document.createElement("meta");
  meta.setAttribute("name", "robots");
  meta.setAttribute("content", "noindex");
  document.head.appendChild(meta);
}

/**
 * Writes the route's JSON-LD into <script id="route-jsonld">, or removes it.
 *
 * Resources posts ship with this script already in their prerendered HTML
 * (vite.config.ts), so the id is shared: the app replaces that script rather
 * than adding a second copy, and removes it when you navigate to a page
 * without structured data. The site-wide organization JSON-LD in index.html
 * has no id and is never touched.
 */
function setJsonLd(data: Record<string, unknown> | undefined) {
  const existing = document.getElementById("route-jsonld");
  if (!data) {
    existing?.remove();
    return;
  }
  const script = existing ?? document.createElement("script");
  script.id = "route-jsonld";
  script.setAttribute("type", "application/ld+json");
  script.textContent = JSON.stringify(data);
  if (!existing) document.head.appendChild(script);
}

export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = resourceSeo(pathname) ?? seoForPath(pathname);
    const title = documentTitle(seo);
    const canonical = canonicalUrl(pathname);

    document.title = title;
    setMeta('meta[name="description"]', "content", seo.description);
    setMeta('meta[property="og:title"]', "content", title);
    setMeta('meta[property="og:description"]', "content", seo.description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:type"]', "content", seo.ogType ?? "website");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", seo.description);
    const image = `${SITE_ORIGIN}${seo.image ?? "/og-image.png"}`;
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[name="twitter:image"]', "content", image);
    setMeta('link[rel="canonical"]', "href", canonical);
    setRobots(Boolean(seo.noindex));
    setJsonLd(seo.jsonLd);
  }, [pathname]);

  return null;
}

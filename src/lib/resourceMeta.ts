import { SITE_NAME, SITE_ORIGIN } from "./seo";

/**
 * Resources posts: parsing, validation and the per-post SEO data.
 *
 * SHARED BY THE APP AND THE BUILD. src/lib/resources.ts uses this in the
 * browser; vite.config.ts uses it at build time to write each post's own
 * index.html (title, description, Open Graph, JSON-LD) and its sitemap entry.
 * One copy of the logic means the tags a crawler sees in the HTML and the tags
 * the app writes after navigation cannot disagree.
 *
 * Node-safe on purpose: relative imports only (the "@" alias does not exist when
 * vite.config.ts is loaded) and nothing that needs Vite or the DOM.
 *
 * Posts live in src/content/resources/<slug>.md. See the README section
 * "Resources (the blog)" for the file format.
 */

export const RESOURCE_CATEGORIES = {
  lecture: { label: "Lecture", plural: "Lectures" },
  guide: { label: "Guide", plural: "Guides" },
  "fellow-story": { label: "Fellow story", plural: "Fellow stories" },
} as const;

export type ResourceCategory = keyof typeof RESOURCE_CATEGORIES;

/** Tie-break when two posts share a date: lectures, then guides, then stories. */
const CATEGORY_ORDER: ResourceCategory[] = ["lecture", "guide", "fellow-story"];

export type ResourcePost = {
  /** From the file name: src/content/resources/<slug>.md. */
  slug: string;
  title: string;
  /** Meta description, Open Graph description and the summary on the list. */
  description: string;
  category: ResourceCategory;
  /** ISO date, YYYY-MM-DD. Structured data and sitemap only; never displayed. */
  date: string;
  /** Optional ISO date of the last real edit. Defaults to `date`. */
  updated: string | null;
  /** YouTube video id, shown above the body. */
  youtubeId: string | null;
  /** The video's title, used for the player's accessible name. */
  videoTitle: string | null;
  /**
   * The post's cover: public/images/resources/<slug>.jpg, made by
   * `npm run covers` (scripts/resource-covers.mjs). The video's YouTube
   * thumbnail for a video post, otherwise a drawn cover. Shown on the card, at
   * the top of the post and as og:image.
   */
  cover: string;
  /** Alt text for the cover. */
  coverAlt: string;
  /**
   * Which drawn illustration the cover uses; required unless youtubeId is set.
   * The choices are the ILLUSTRATIONS keys in scripts/resource-covers.mjs, which
   * checks the value.
   */
  illustration: string | null;
  /** Markdown body. */
  body: string;
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Splits `---` frontmatter from the body. Frontmatter is one `key: value` per
 * line; values may be wrapped in double quotes (needed when they contain a
 * colon or start with a quote). No nesting, no lists: every field is a string.
 */
function splitFrontmatter(source: string): {
  fields: Record<string, string>;
  body: string;
} {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error("missing the --- frontmatter block at the top");

  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const at = line.indexOf(":");
    if (at === -1) throw new Error(`frontmatter line has no colon: "${line}"`);
    const key = line.slice(0, at).trim();
    let value = line.slice(at + 1).trim();
    if (value.length >= 2 && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1).replace(/\\"/g, '"');
    }
    fields[key] = value;
  }
  return { fields, body: match[2].trim() };
}

/**
 * Parses and validates one post. Throws with a message naming the problem; the
 * build turns that into a failed build, the app into a skipped post plus a
 * console error.
 */
export function parseResource(slug: string, source: string): ResourcePost {
  if (!SLUG_RE.test(slug)) {
    throw new Error(
      `file name "${slug}" must be lowercase words joined by hyphens`
    );
  }
  const { fields, body } = splitFrontmatter(source);
  const required = (key: string) => {
    const value = fields[key];
    if (!value) throw new Error(`"${key}" is required`);
    return value;
  };
  const optional = (key: string) => fields[key] || null;

  const category = required("category");
  if (!(category in RESOURCE_CATEGORIES)) {
    throw new Error(
      `category "${category}" must be one of: ${Object.keys(RESOURCE_CATEGORIES).join(", ")}`
    );
  }
  const date = required("date");
  if (!DATE_RE.test(date)) throw new Error(`date "${date}" must be YYYY-MM-DD`);
  const updated = optional("updated");
  if (updated && !DATE_RE.test(updated)) {
    throw new Error(`updated "${updated}" must be YYYY-MM-DD`);
  }
  const youtubeId = optional("youtubeId");
  const illustration = optional("illustration");
  if (!youtubeId && !illustration) {
    throw new Error(
      '"illustration" is required for a post without a video; it picks the drawing on the cover'
    );
  }
  if (!body) throw new Error("the post has no body");

  return {
    slug,
    title: required("title"),
    description: required("description"),
    category: category as ResourceCategory,
    date,
    updated,
    youtubeId,
    videoTitle: optional("videoTitle"),
    cover: coverPath(slug),
    coverAlt: required("coverAlt"),
    illustration,
    body,
  };
}

/** Where `npm run covers` writes a post's cover, as served from public/. */
export function coverPath(slug: string): string {
  return `/images/resources/${slug}.jpg`;
}

/** Newest first. */
export function sortResources(posts: ResourcePost[]): ResourcePost[] {
  return [...posts].sort(
    (a, b) =>
      b.date.localeCompare(a.date) ||
      CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) ||
      a.title.localeCompare(b.title)
  );
}

export const RESOURCES_PATH = "/resources";

export function resourcePath(post: Pick<ResourcePost, "slug">): string {
  return `${RESOURCES_PATH}/${post.slug}`;
}

/** schema.org Article for one post. The date lives here and nowhere visible. */
export function articleJsonLd(post: ResourcePost): Record<string, unknown> {
  const url = `${SITE_ORIGIN}${resourcePath(post)}`;
  const atlas = {
    "@type": "Organization",
    name: SITE_NAME,
    url: `${SITE_ORIGIN}/`,
    logo: { "@type": "ImageObject", url: `${SITE_ORIGIN}/icon-512.png` },
  };
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    articleSection: RESOURCE_CATEGORIES[post.category].label,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: atlas,
    publisher: atlas,
    image: [`${SITE_ORIGIN}${post.cover}`],
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

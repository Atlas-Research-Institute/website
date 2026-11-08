import { FEATURED_PAPERS, type FeaturedPaper } from "@/data/featuredPapers";
import { ROUTE_SEO, type RouteSeo } from "./seo";

/** Where each paper's page lives: /journal/papers/<slug>. */
export const PAPERS_PATH = "/journal/papers";

export function paperPath(slug: string): string {
  return `${PAPERS_PATH}/${slug}`;
}

export function findPaper(slug: string): FeaturedPaper | undefined {
  return FEATURED_PAPERS.find((p) => p.slug === slug);
}

/** The abstract's first sentence, used as the page description. */
function firstSentence(text: string): string {
  return text.match(/^.*?[.!?](?=\s+[A-Z]|$)/)?.[0] ?? text;
}

/**
 * SEO for a /journal/papers/<slug> path, or undefined for any other path. An
 * unknown slug is noindex so a mistyped link never gets indexed as a page.
 */
export function paperSeo(pathname: string): RouteSeo | undefined {
  const match = pathname.match(new RegExp(`^${PAPERS_PATH}/([^/]+)/?$`));
  if (!match) return undefined;
  const paper = findPaper(match[1]);
  if (!paper) {
    return { ...ROUTE_SEO["/journal"], noindex: true };
  }
  return {
    title: paper.title,
    description: firstSentence(paper.abstract),
    ogType: "article",
    image: paper.cover,
  };
}

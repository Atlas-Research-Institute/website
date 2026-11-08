import { Link } from "react-router-dom";
import { Container } from "@/components/site/Container";
import { FEATURED_PAPERS } from "@/data/featuredPapers";
import { SUBMIT_FORM_URL } from "@/lib/dates";
import { paperPath } from "@/lib/papers";

/**
 * The Atlas Journal: submission links, then a row for every paper in
 * src/data/featuredPapers.ts (the same list the homepage carousel reads), each
 * linking to its page at /journal/papers/<slug>.
 * To add a paper, follow "Publishing a journal paper" in CLAUDE.md.
 */
export function Journal() {
  return (
    <div className="bg-paper text-ink text-[19px] leading-[1.65]">
      <Container className="pt-16 pb-[104px]">
        <h1 className="m-0 mb-6 text-[length:clamp(40px,5.2vw,62px)] leading-[1.08] tracking-[-0.01em]">
          The Atlas Journal
        </h1>
        <p className="m-0 max-w-[36em] text-[17px] text-muted">
          Atlas editors read every paper before it goes up.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={SUBMIT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-crimson px-7 py-[15px] text-[18px] font-semibold text-white no-underline hover:bg-crimson-hover transition-colors"
          >
            Submit a paper
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link
            to="/journal/standards"
            className="text-[18px] text-crimson underline underline-offset-4 hover:text-crimson-hover"
          >
            Our standards
          </Link>
        </div>

        <ul className="m-0 mt-16 list-none border-t border-rule p-0" aria-label="Papers">
          {FEATURED_PAPERS.map((p) => (
            <li key={p.slug} className="border-b border-rule">
              <Link
                to={paperPath(p.slug)}
                className="group flex items-start gap-8 py-8 text-ink no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
              >
                <img
                  src={p.cover}
                  alt=""
                  width={900}
                  height={1164}
                  loading="lazy"
                  decoding="async"
                  className="hidden h-auto w-[90px] shrink-0 rounded-[2px] border border-rule md:block"
                />
                <div className="min-w-0 max-w-[46em]">
                  <h2 className="m-0 mb-2 break-words text-[length:clamp(20px,2.2vw,24px)] leading-[1.3] group-hover:text-crimson group-hover:underline group-hover:underline-offset-4">
                    {p.title}
                  </h2>
                  <p className="m-0 text-[17px]">{p.authors.join(", ")}</p>
                  <p className="m-0 text-[16px] text-muted">{p.date}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

/** Used by JournalArticle.tsx. Kept here so that route needs no changes. */
export function formatPublishedDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  });
}

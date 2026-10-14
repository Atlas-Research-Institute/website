import { Link } from "react-router-dom";
import { Container } from "@/components/site/Container";
import { APPLY_PATH, DATES } from "@/lib/dates";

/**
 * The Atlas Journal: a next-issue notice until the journal system is rebuilt.
 *
 * Publications are deliberately NOT fetched here. src/data/publications.ts,
 * the publications source, the /journal/:slug route and JournalArticle.tsx
 * are kept for that rebuild.
 */
export function Journal() {
  return (
    <div className="bg-paper text-ink text-[19px] leading-[1.65]">
      <Container className="pt-16 pb-[104px]">
        <h1 className="m-0 mb-6 text-[length:clamp(40px,5.2vw,62px)] leading-[1.08] tracking-[-0.01em]">
          The Atlas Journal
        </h1>
        <p className="m-0 mb-4 max-w-[36em] text-[21px] text-body-muted">
          An open archive of the research papers Atlas fellows write. Each issue
          collects the papers from one fellowship.
        </p>
        <p className="m-0 max-w-[36em] text-[17px] text-muted">
          Atlas editors read every paper before it goes up. The journal is not
          externally peer reviewed.
        </p>

        <div className="mt-12 flex flex-wrap items-end justify-between gap-x-12 gap-y-6 rounded bg-mist p-8 md:p-10">
          <div>
            <p className="m-0 mb-1 text-[16px] italic text-muted">Next issue</p>
            <p className="m-0 mb-2 text-[length:clamp(26px,3vw,34px)] leading-[1.2] font-semibold text-navy">
              Spring 2027. Coming soon.
            </p>
            <p className="m-0">Papers from the {DATES.cohortName}.</p>
          </div>
          <Link
            to={APPLY_PATH}
            className="max-w-[22em] py-3 text-crimson underline underline-offset-4 hover:text-crimson-hover"
          >
            Want your paper in a future issue? Apply to the fellowship
          </Link>
        </div>
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

import { Link, useParams } from "react-router-dom";
import { Container } from "@/components/site/Container";
import { findPaper } from "@/lib/papers";

/**
 * /journal/papers/:slug: one paper from src/data/featuredPapers.ts, with its
 * abstract, keywords and a link to the PDF.
 *
 * Separate from the old /journal/:slug route (JournalArticle.tsx), which reads
 * the unused Sheet-driven publications. React Router ranks this longer path
 * above that one, so /journal/papers/<slug> always lands here.
 */
export function JournalPaper() {
  const { slug } = useParams<{ slug: string }>();
  const paper = slug ? findPaper(slug) : undefined;

  return (
    <div className="bg-paper text-ink text-[19px] leading-[1.65]">
      <Container className="pt-16 pb-[104px]">
        <Link
          to="/journal"
          className="text-[16px] text-crimson underline underline-offset-4 hover:text-crimson-hover"
        >
          <span aria-hidden>← </span>Back to the journal
        </Link>

        {!paper ? (
          <h1 className="m-0 mt-6 text-[length:clamp(40px,5.2vw,62px)] leading-[1.08] tracking-[-0.01em]">
            Paper not found
          </h1>
        ) : (
          <div className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-[240px_1fr]">
            <img
              src={paper.cover}
              alt={`First page of ${paper.title}`}
              width={900}
              height={1164}
              className="block h-auto w-[160px] rounded-[2px] border border-rule md:w-full"
            />
            <div className="max-w-[40em]">
              <h1 className="m-0 mb-4 break-words text-[length:clamp(28px,3.4vw,42px)] leading-[1.2]">
                {paper.title}
              </h1>
              <p className="m-0 text-[17px]">{paper.authors.join(", ")}</p>
              <p className="m-0 mb-8 text-[16px] text-muted">{paper.date}</p>

              <h2 className="m-0 mb-2 text-[20px]">Abstract</h2>
              <p className="m-0 mb-8 text-[17px] leading-[1.65]">{paper.abstract}</p>

              <h2 className="m-0 mb-2 text-[20px]">Keywords</h2>
              <ul className="m-0 mb-10 flex list-none flex-wrap gap-2 p-0">
                {paper.keywords.map((k) => (
                  <li key={k} className="rounded-[3px] bg-mist px-3 py-1 text-[15px]">
                    {k}
                  </li>
                ))}
              </ul>

              <a
                href={paper.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded bg-crimson px-7 py-[15px] text-[18px] font-semibold text-white no-underline hover:bg-crimson-hover transition-colors"
              >
                Read the full paper
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

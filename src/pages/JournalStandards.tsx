import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/site/Container";

/**
 * /journal/standards: who can submit to the Atlas Journal and how papers are
 * reviewed and published. The wording is Atlas's final text, word for word.
 * Do not reword it here; change it only when Atlas sends a new version.
 */
export function JournalStandards() {
  return (
    <div className="bg-paper text-ink text-[19px] leading-[1.65]">
      <Container className="pt-16 pb-[104px]">
        <Link
          to="/journal"
          className="text-[16px] text-crimson underline underline-offset-4 hover:text-crimson-hover"
        >
          <span aria-hidden>← </span>Back to the journal
        </Link>
        <h1 className="m-0 mt-6 mb-10 text-[length:clamp(40px,5.2vw,62px)] leading-[1.08] tracking-[-0.01em]">
          Atlas Journal Standards
        </h1>

        <div className="max-w-[36em]">
          <Section title="Who can submit">
            <p className="m-0">
              High school and undergraduate students anywhere in the world. You
              do not need to be an Atlas fellow. Co-authored papers are welcome,
              and every author must be a student.
            </p>
          </Section>

          <Section title="What we publish">
            <p className="m-0">
              Original student research in any field. We accept literature
              reviews, original data analyses, case studies and policy briefs.
              Papers run 2,000 to 6,000 words, not counting references.
            </p>
          </Section>

          <Section title="What every paper must have">
            <ol className="m-0 list-decimal pl-6 [&>li]:mb-2 [&>li]:pl-1">
              <li>A title, an abstract of 150 to 250 words, and 3 to 5 keywords.</li>
              <li>A clear research question.</li>
              <li>
                A methods or approach section that says what sources or data
                were used and how they were chosen.
              </li>
              <li>At least one stated limitation.</li>
              <li>
                A reference list in APA style. Every claim that is not your own
                finding must be cited.
              </li>
            </ol>
          </Section>

          <Section title="Integrity">
            <p className="m-0">
              The work must be your own. Copying without citation means
              automatic rejection. If your research collected data from people,
              through surveys or interviews, you must have had their permission,
              and for anyone under 18, a parent or guardian's permission as
              well. Do not name individual people, and do not identify schools
              in a way that singles them out.
            </p>
          </Section>

          <Section title="How review works">
            <p className="m-0">
              Every submission is read by the Atlas review team. We check that
              the paper meets these standards, that its sources support its
              claims, and that its conclusions match its evidence. Review is
              editorial, not external peer review. Possible outcomes are accept,
              revise and resubmit, or decline. You will hear back within two
              weeks.
            </p>
          </Section>

          <Section title="Publication and rights">
            <p className="m-0 mb-4">
              You keep the copyright. By submitting, you give Atlas permission
              to publish your paper on atlas-research.org with your name and
              school.
            </p>
            <p className="m-0 mb-4">
              Accepted papers are published in the Atlas template. That means we
              reformat the layout, add Atlas Research Institute branding and a
              citation line, and may fix spelling, grammar and formatting. We do
              not change your argument, findings or conclusions.
            </p>
            <p className="m-0">
              You may submit your paper to other journals before or after Atlas
              publishes it. Some journals treat a paper posted online as already
              published, so check their policy first. We ask that you tell us
              where else you submit, so we can follow your work.
            </p>
          </Section>

          <Section title="Corrections">
            <p className="m-0">
              If an error is found after publication, we post a correction. If a
              serious problem is found, such as plagiarism or fabricated data,
              we remove the paper.
            </p>
          </Section>
        </div>
      </Container>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10 last:mb-0">
      <h2 className="m-0 mb-3 text-[length:clamp(24px,2.6vw,30px)] leading-[1.25]">
        {title}
      </h2>
      {children}
    </section>
  );
}

import { Link } from "react-router-dom";
import { APPLY_PATH, DATES } from "@/lib/dates";
import { Container, SectionHeading } from "@/components/site/Container";
import { FactStrip } from "@/components/site/FactStrip";
import { NameList, ResearcherList } from "@/components/site/Researchers";
import { CountryList, Quote } from "@/components/site/Quote";

/**
 * The homepage, built from notes/redesign/home.html.
 *
 *   hero · facts · navy proof · lessons · fellowship weeks · testimonials
 *   where your paper goes · navy apply · (footer)
 *
 * Copy is the reference text word for word. The research groups listing, the
 * partner logos and the stat band are no longer on this page; their components
 * are kept in src/components/home/.
 */

const COUNTRIES = [
  "Kazakhstan",
  "Bangladesh",
  "Ghana",
  "Ethiopia",
  "Uzbekistan",
  "Türkiye",
  "Lebanon",
  "Spain",
  "Poland",
  "United States",
];

const WEEKS = [
  {
    when: "Week 1",
    title: "Your question",
    body: "Pick an education access problem where you live and turn it into a question you can actually answer.",
  },
  {
    when: "Week 2",
    title: "Sources",
    body: "Find published research on it and learn to tell reliable sources from weak ones.",
  },
  {
    when: "Weeks 3 to 4",
    title: "Evidence",
    body: "Work with real data and connect it back to your question.",
  },
  {
    when: "Weeks 5 to 6",
    title: "Your paper",
    body: "Write it up, get feedback on your draft, and hand in a finished paper.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The structure and tasks that were given each week helped a lot to get started with writing a research paper. The thing I liked most is the feedback that our mentor … gave to me. At first, I did not think he would spend time to review honestly. I changed my mind after the feedback he gave.",
    name: "Sevinch",
    country: "Uzbekistan",
  },
  {
    quote:
      "I really liked the lectures. I also really liked the sheets and materials they provided because they were clear and easy to understand.",
    name: "Aidana",
    country: "Kazakhstan",
  },
  {
    quote:
      "The materials provided for us in the fellowship weeks were actually elite and extremely useful for my research.",
    name: "Abenezer",
    country: "Ethiopia",
  },
];

const PARTNERS = [
  {
    name: "International Journal of High School Research",
    detail: "Peer-reviewed submission route.",
  },
  { name: "The Curieux Review", detail: "Student research writing partner." },
  {
    name: "Lumiere Education",
    detail: "Program partner. Scholarships to Lumiere programs for Atlas fellows.",
  },
];

export function Landing() {
  return (
    <div className="bg-paper text-ink text-[19px] leading-[1.65]">
      {/* Hero */}
      <section
        id="fellowship"
        className="mx-auto max-w-[1200px] px-6 pt-16 pb-12 grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] gap-x-16 gap-y-12 items-center"
      >
        <div>
          <h1 className="m-0 mb-6 text-[length:clamp(40px,5.2vw,62px)] leading-[1.08] tracking-[-0.01em]">
            Curiosity is everywhere, yet research training is not.
          </h1>
          <p className="m-0 mb-8 text-[21px] text-body-muted max-w-[30em]">
            We teach it for free, to students wherever they live. In six weeks,
            you pick a question about education access in your own community,
            learn how to find and test evidence, and finish your first research
            paper.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <Link
              to={APPLY_PATH}
              className="inline-block rounded bg-crimson px-7 py-[15px] text-[18px] font-semibold text-white no-underline hover:bg-crimson-hover transition-colors"
            >
              Apply by {DATES.applicationsCloseLabel}
            </Link>
            <a
              href="#fellows"
              className="py-3 text-[18px] text-crimson underline underline-offset-4 hover:text-crimson-hover"
            >
              Hear from past fellows
            </a>
          </div>
        </div>
        {/* The Fuller slide stands in until a real photo of fellows replaces it (src/components/site/HeroImage.tsx). */}
        <figure className="m-0">
          <img
            src="/images/fuller-lesson.webp"
            alt="Slide from Prof. Bruce Fuller's lesson on research method, titled Method: Describing, Correlating, Explaining"
            width={1600}
            height={900}
            // React 18 only knows the lowercase attribute; camelCase arrives in React 19.
            {...{ fetchpriority: "high" }}
            className="block h-auto w-full rounded border border-rule"
          />
          <figcaption className="mt-3 text-[16px] italic text-muted">
            Prof. Bruce Fuller teaching research method to Atlas fellows,
            August 2026.
          </figcaption>
        </figure>
      </section>

      {/* Facts */}
      <Container>
        <FactStrip />
      </Container>

      {/* Navy proof */}
      <section className="on-navy mt-[88px] bg-navy text-white">
        <Container className="pt-[88px] pb-11 grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-x-[72px] gap-y-11 items-center">
          <div>
            <p className="m-0 mb-5 text-[length:clamp(30px,3.6vw,42px)] leading-[1.22] font-semibold">
              88% of the fellows we surveyed last summer had never finished a
              research project before Atlas.
            </p>
            <p className="m-0 text-[20px] text-on-navy-muted">
              94% said they plan to keep doing research.
            </p>
          </div>
          <figure className="m-0 rounded bg-white p-8 text-ink">
            <blockquote className="m-0 mb-5 text-[21px] leading-[1.55] italic">
              “Before the fellowship, I did not have much experience with the
              whole research process. During the program, I learned how to find
              reliable sources, check the information carefully, work with
              data, and bring everything together into a research paper.”
            </blockquote>
            <figcaption className="text-[17px] text-body-muted">
              <strong className="font-semibold text-navy">Mahajabin</strong>,
              Bangladesh
            </figcaption>
          </figure>
        </Container>
        <Container className="pb-[88px]">
          <p className="m-0 mb-3.5 text-[18px] italic text-on-navy-muted">
            Last summer's fellows came from 20 countries, including
          </p>
          <CountryList countries={COUNTRIES} itemClassName="border border-navy-border" />
        </Container>
      </section>

      {/* Lessons */}
      <section id="lessons" className="mx-auto max-w-[1200px] px-6 py-[104px]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-x-[72px] gap-y-8 items-start">
          <div>
            <SectionHeading className="m-0 mb-4">
              Fellows learn from working researchers
            </SectionHeading>
            <p className="m-0 max-w-[32em]">
              Live lessons on how research is done: forming a question,
              choosing a method, reading evidence. To name a few of the
              researchers who teach them:
            </p>
          </div>
          <div>
            <ResearcherList noteClassName="mt-6 mb-0" />
          </div>
        </div>
      </section>

      {/* Fellowship weeks */}
      <section className="bg-mist">
        <Container className="py-24">
          <SectionHeading className="m-0 mb-9">
            What the fellowship weeks look like
          </SectionHeading>
          <ol className="m-0 p-0 list-none grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-5">
            {WEEKS.map((w) => (
              <li key={w.when} className="rounded bg-white p-7">
                <div className="mb-2 text-[16px] italic text-navy">{w.when}</div>
                <h3 className="m-0 mb-2.5 text-[24px] leading-[1.25]">{w.title}</h3>
                <p className="m-0 text-[17px] leading-[1.6]">{w.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Testimonials */}
      <section id="fellows" className="mx-auto max-w-[1200px] px-6 pt-[104px] pb-[88px]">
        <SectionHeading className="m-0 mb-9">From the summer 2026 fellows</SectionHeading>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,310px),1fr))] gap-6">
          {TESTIMONIALS.map((t) => (
            <Quote key={t.name} {...t} className="bg-mist" />
          ))}
        </div>
      </section>

      {/* Where your paper goes */}
      <section
        id="journal"
        className="mx-auto max-w-[1200px] px-6 pt-4 pb-[104px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-x-[72px] gap-y-10"
      >
        <div>
          <SectionHeading className="m-0 mb-4">Where your paper goes</SectionHeading>
          <p className="m-0 mb-3.5 max-w-[32em]">
            Finished papers can be shared in the Atlas Journal. Atlas editors
            read every paper before it goes up. The journal is not externally
            peer reviewed.
          </p>
          <p className="m-0 max-w-[32em]">
            Strong papers can also be submitted to peer-reviewed journals.
            Acceptance is the journal's decision, not ours.
          </p>
        </div>
        <div className="self-center">
          <NameList items={PARTNERS} gap="gap-5" />
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="on-navy bg-navy text-white">
        <Container className="py-20 flex flex-wrap items-center justify-between gap-x-12 gap-y-7">
          <h2 className="m-0 text-[length:clamp(30px,4vw,46px)] leading-[1.12]">
            Applications close {DATES.applicationsCloseLabel}
          </h2>
          <Link
            to={APPLY_PATH}
            className="inline-block rounded bg-white px-[30px] py-4 text-[19px] font-semibold text-navy no-underline hover:bg-mist transition-colors"
          >
            Apply to the {DATES.cohortName}
          </Link>
        </Container>
      </section>
    </div>
  );
}

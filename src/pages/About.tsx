import { Container, SectionHeading } from "@/components/site/Container";
import { NameList, ResearchersWithPhoto } from "@/components/site/Researchers";
import { CountryList, Quote } from "@/components/site/Quote";
import { PartnershipForm } from "@/components/PartnershipForm";

/**
 * /about: the page for nonprofits, funders and grant organizations.
 *
 *   hero · impact (navy) · access, not ability · how Atlas works
 *   researchers · fellow testimonials · partners and journals · contact form
 *
 * The former /partners page was merged into this one; /partners redirects
 * here. The impact band and the Lumiere entry came from the homepage by way
 * of /partners, figures unchanged. The tracks, researchers and testimonials
 * are the previous About page's, unchanged.
 */

/** Countries for the impact band. */
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

/** Where the research groups are. The original About list, in its original order. */
const GROUP_COUNTRIES = [
  "Vietnam",
  "India",
  "United States",
  "Bhutan",
  "China",
  "Türkiye",
  "Brazil",
  "Nepal",
  "Pakistan",
];

/** Same entries and wording as before the merge. */
const PARTNERS = [
  {
    name: "International Journal of High School Research",
    detail: "Peer-reviewed submission route for fellows' papers.",
  },
  { name: "The Curieux Review", detail: "Student research writing partner." },
  {
    name: "Lumiere Education",
    detail: "Program partner. Scholarships to Lumiere programs for Atlas fellows.",
  },
  {
    name: "The Atlas Journal",
    detail:
      "Where fellows share finished work. Read by Atlas editors before it goes up, not externally peer reviewed.",
  },
];

const TRACKS = [
  {
    who: "Open to everyone who applies",
    title: "The Atlas community",
    body: "Recorded lessons, research guides and other opportunities students can apply to.",
  },
  {
    who: "For admitted fellows",
    title: "The Atlas Fellowship",
    body: "One theme and a fixed start and end date. Each fellow finishes a first research paper with weekly lessons and feedback.",
  },
  {
    who: "For fellows who finish",
    title: "Research groups",
    body: "Small groups, each run by a student lead, that take the work further and write papers for submission.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "They pushed me to think beyond my usual perspective, take ideas more seriously, and turn curiosity into meaningful action.",
    name: "Mohammad",
    country: "Lebanon",
  },
  {
    quote:
      "I liked that the program gave me the opportunity to work on a real research project and learn how to find, evaluate, and use reliable sources.",
    name: "Nada",
    country: "Spain",
  },
  {
    quote:
      "One thing I liked most about the program was having the opportunity to conduct independent research on a topic I genuinely care about.",
    name: "Hayriye",
    country: "Türkiye",
  },
];

export function About() {
  return (
    <div className="bg-paper text-ink text-[19px] leading-[1.65]">
      {/* Hero */}
      <Container className="pt-16 pb-[88px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] items-center gap-x-16 gap-y-12">
        <div>
          <h1 className="m-0 mb-6 max-w-[22ch] text-[length:clamp(38px,5vw,58px)] leading-[1.1] tracking-[-0.01em]">
            Partner with us to bring research training to students who have
            never had it.
          </h1>
          <p className="m-0 mb-8 max-w-[36em] text-[21px] text-body-muted">
            Curiosity is everywhere, yet research training is not. Atlas runs a
            free, six-week online fellowship where high school and university
            students pick a question about education access in their own
            community and write their first research paper.
          </p>
          <a
            href="#contact"
            className="inline-block rounded bg-crimson px-7 py-[15px] text-[18px] font-semibold text-white no-underline hover:bg-crimson-hover transition-colors"
          >
            Contact us
          </a>
        </div>
        <img
          src="/images/about-hero.webp"
          alt="Two students writing at a desk"
          width={1600}
          height={1066}
          // React 18 only knows the lowercase attribute; camelCase arrives in React 19.
          {...{ fetchpriority: "high" }}
          className="block aspect-[3/2] h-auto w-full rounded border border-rule object-cover"
        />
      </Container>

      {/* Impact. Moved from the homepage; every figure is as it was there. */}
      <section className="on-navy bg-navy text-white">
        <Container className="pt-[88px] pb-11 grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-x-[72px] gap-y-11 items-center">
          <div>
            <p className="m-0 mb-5 text-[length:clamp(30px,3.6vw,42px)] leading-[1.22] font-semibold">
              88% of the fellows we surveyed last summer had never finished a
              research project before Atlas.
            </p>
            <p className="m-0 mb-3 text-[20px] text-on-navy-muted">
              94% said they plan to keep doing research.
            </p>
            <p className="m-0 text-[20px] text-on-navy-muted">
              Students lead 18 research groups across 9 countries.
            </p>
            {/*
              Filled white chips, so this list reads as separate from the
              outlined "20 countries" list of last summer's fellows below.
            */}
            <p className="m-0 mt-5 mb-2.5 text-[16px] italic text-on-navy-muted">
              Research groups in:
            </p>
            <CountryList
              countries={GROUP_COUNTRIES}
              itemClassName="bg-white px-3 py-1 text-[16px] text-navy"
            />
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

      {/* Who we reach */}
      <Container className="py-24">
        <SectionHeading className="m-0 mb-5">Access, not ability</SectionHeading>
        <p className="m-0 max-w-[36em]">
          Most fellows from Nepal, Bangladesh, Pakistan, Syria and Bolivia told
          us they had little or no research experience before Atlas. Fellows
          from the US, Canada and China more often arrived with some already.
          The gap we see is access to training, not ability.
        </p>
      </Container>

      {/* How Atlas works */}
      <section className="bg-mist">
        <Container className="py-24">
          <SectionHeading className="m-0 mb-8">How Atlas works</SectionHeading>
          <ol className="m-0 p-0 list-none grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
            {TRACKS.map((t) => (
              <li key={t.title} className="rounded bg-white p-7">
                <div className="mb-2 text-[16px] italic text-navy">{t.who}</div>
                <h3 className="m-0 mb-2.5 text-[24px] leading-[1.25]">{t.title}</h3>
                <p className="m-0 text-[17px] leading-[1.6]">{t.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Researchers */}
      <Container className="py-24">
        <ResearchersWithPhoto
          noteClassName="mt-[22px] mb-0"
          intro={
            <>
              <SectionHeading className="m-0 mb-3">
                Researchers who have taught Atlas fellows
              </SectionHeading>
              <p className="m-0 mb-[22px]">To name a few:</p>
            </>
          }
        />
      </Container>

      {/* Testimonials */}
      <section className="bg-mist">
        <Container className="py-24">
          <SectionHeading className="m-0 mb-8">More from the fellows</SectionHeading>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
            {TESTIMONIALS.map((t) => (
              <Quote key={t.name} {...t} className="bg-white" />
            ))}
          </div>
        </Container>
      </section>

      {/* Partners and journals */}
      <section>
        <Container className="py-24">
          <SectionHeading className="m-0 mb-4">Partners and journals</SectionHeading>
          <p className="m-0 mb-8 max-w-[36em]">
            Where fellows' work goes, and who supports them.
          </p>
          <NameList items={PARTNERS} gap="gap-5" />
        </Container>
      </section>

      {/* Contact form */}
      <div className="border-t border-rule">
        <section
          id="contact"
          className="mx-auto max-w-[848px] px-6 pt-[88px] pb-[104px]"
        >
          <PartnershipForm />
        </section>
      </div>
    </div>
  );
}

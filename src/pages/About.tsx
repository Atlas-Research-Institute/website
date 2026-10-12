import { CONTACT_EMAIL } from "@/lib/dates";
import { Container, SectionHeading, SubHeading } from "@/components/site/Container";
import { NameList, ResearcherList } from "@/components/site/Researchers";
import { CountryList, Quote } from "@/components/site/Quote";

/** /about, built from notes/redesign/about.html. Copy is word for word. */

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
      <Container className="pt-[72px] pb-16">
        <h1 className="m-0 mb-7 max-w-[20ch] text-[length:clamp(38px,5vw,58px)] leading-[1.1] tracking-[-0.01em]">
          We introduce research to students who have never had a way in.
        </h1>
        <div className="grid max-w-[1040px] grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-x-14 gap-y-4">
          <p className="m-0 text-[21px] text-body-muted">
            Research is how knowledge gets made. Students in well-resourced
            schools meet it early, through programs, mentors and teachers who
            have done it themselves. Students in much of South Asia, Central
            Asia and Africa usually do not.
          </p>
          <p className="m-0 text-[21px] text-body-muted">
            Atlas gives those students a first chance to run their own project,
            for free, and to learn how research actually works by doing it.
          </p>
        </div>
      </Container>

      <section className="on-navy bg-navy text-white">
        <Container className="py-20">
          <SubHeading className="m-0 mb-6">The summer 2026 fellowship</SubHeading>
          <p className="m-0 mb-9 max-w-[34ch] text-[length:clamp(24px,2.8vw,32px)] leading-[1.4]">
            About 500 students applied in two weeks. We admitted 25 fellows
            from 20 countries, and they wrote research papers.
          </p>
          <div className="grid max-w-[1040px] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-12 gap-y-5 border-t border-navy-border pt-6 text-on-navy-muted">
            <p className="m-0">
              <strong className="font-semibold text-white">88%</strong> of the
              fellows we surveyed had never finished an independent research
              project before Atlas.
            </p>
            <p className="m-0">
              <strong className="font-semibold text-white">94%</strong> said, at
              the end of the fellowship, that they plan to keep doing research.
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-24">
        <SectionHeading className="m-0 mb-8">How Atlas works</SectionHeading>
        <ol className="m-0 p-0 list-none grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
          {TRACKS.map((t) => (
            <li key={t.title} className="rounded bg-mist p-7">
              <div className="mb-2 text-[16px] italic text-navy">{t.who}</div>
              <h3 className="m-0 mb-2.5 text-[24px] leading-[1.25]">{t.title}</h3>
              <p className="m-0 text-[17px] leading-[1.6]">{t.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14 border-t border-rule pt-8">
          <p className="m-0 mb-[18px] text-[length:clamp(24px,2.8vw,32px)] leading-[1.3] font-semibold text-navy">
            Students lead 19 research groups in 9 countries.
          </p>
          <CountryList countries={GROUP_COUNTRIES} itemClassName="bg-mist" />
        </div>
      </Container>

      <section className="border-t border-rule">
        <Container className="py-24 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-x-[72px] gap-y-12">
          <div>
            <SubHeading className="m-0 mb-3">
              Researchers who have taught Atlas fellows
            </SubHeading>
            <p className="m-0 mb-[22px]">To name a few:</p>
            <ResearcherList noteClassName="mt-[22px] mb-0" />
          </div>
          <div>
            <SubHeading className="m-0 mb-3">Partners and journals</SubHeading>
            <p className="m-0 mb-[22px]">
              Where fellows' work goes, and who supports them.
            </p>
            <NameList items={PARTNERS} />
          </div>
        </Container>
      </section>

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

      <Container className="py-24">
        <SubHeading className="m-0 mb-3.5">Work with us</SubHeading>
        <p className="m-0 mb-[22px] max-w-[32em]">
          We work with researchers, schools, journals and organizations that
          want to bring research to students without access to it.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-block rounded bg-crimson px-[26px] py-[15px] font-semibold text-white no-underline hover:bg-crimson-hover transition-colors break-all"
        >
          {CONTACT_EMAIL}
        </a>
      </Container>
    </div>
  );
}

import { Container, SectionHeading } from "@/components/site/Container";
import { CONTACT_EMAIL, GET_INVOLVED_FORM_URL } from "@/lib/dates";

/**
 * Get Involved — recruits volunteers to the Atlas team through one Google
 * Form (GET_INVOLVED_FORM_URL).
 *
 *   intro · where you could help (mist) · how it works · navy join band
 *
 * The old two-track page rendered from src/data/openings.ts; that file and
 * the components it used are left in place, unused by this page.
 */

const AREAS = [
  {
    title: "Grow Atlas where you are",
    body: "Bring Atlas to students in your school, city or country. Connect us with teachers, clubs and local groups.",
  },
  {
    title: "Help run Atlas",
    body: "Outreach, social media, design, writing and operations. The work that keeps Atlas going every week.",
  },
  {
    title: "Mentor students",
    body: "For university students, professors, and researchers. Give feedback on fellows' research and help with lessons.",
  },
];

const STEPS = [
  {
    title: "Fill out a short form",
    body: "About ten minutes. Tell us what you have led, what research you have done, and where you want to help.",
  },
  {
    title: "Talk with us",
    body: "A short video call with someone from the Atlas team.",
  },
  {
    title: "Join a team",
    body: "We place you where your skills fit and introduce you to the people you will work with.",
  },
];

export function GetInvolved() {
  return (
    <div className="bg-paper text-ink text-[19px] leading-[1.65]">
      {/* Intro */}
      <Container className="pt-16 pb-[88px]">
        <h1 className="m-0 mb-6 max-w-[20ch] text-[length:clamp(40px,5.2vw,62px)] leading-[1.08] tracking-[-0.01em]">
          Help bring research to more students
        </h1>
        <p className="m-0 max-w-[36em] text-[21px] text-body-muted">
          We are looking for people who want to bring research training to
          students who never had it, in their own school, in their country, or
          online.
        </p>
      </Container>

      {/* Where you could help */}
      <section className="bg-mist">
        <Container className="py-24">
          <SectionHeading className="m-0 mb-9">Where you could help</SectionHeading>
          <ul className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-5">
            {AREAS.map((a) => (
              <li key={a.title} className="rounded bg-white p-7">
                <h3 className="m-0 mb-2.5 text-[24px] leading-[1.25]">{a.title}</h3>
                <p className="m-0 text-[17px] leading-[1.6]">{a.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-[1200px] px-6 py-[104px]">
        <SectionHeading className="m-0 mb-9">How it works</SectionHeading>
        <ol className="m-0 p-0 list-none grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
          {STEPS.map((s, i) => (
            <li key={s.title} className="border-t-2 border-navy pt-5">
              <div className="mb-2 text-[16px] italic text-navy">Step {i + 1}</div>
              <h3 className="m-0 mb-2.5 text-[24px] leading-[1.25]">{s.title}</h3>
              <p className="m-0 text-[17px] leading-[1.6]">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="m-0 mt-12 text-[17px] text-muted">
          Organizations who want to work with Atlas: email{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="underline underline-offset-4 hover:text-crimson break-words"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      </section>

      {/* Join */}
      <section className="on-navy bg-navy text-white">
        <Container className="py-20 flex flex-wrap items-center justify-between gap-x-12 gap-y-7">
          <div>
            <h2 className="m-0 mb-3 text-[length:clamp(30px,4vw,46px)] leading-[1.12]">
              Join the Atlas team
            </h2>
            <p className="m-0 text-[20px] text-on-navy-muted">
              Volunteer roles, open to secondary and university students
              anywhere.
            </p>
          </div>
          <a
            href={GET_INVOLVED_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded bg-white px-[30px] py-4 text-[19px] font-semibold text-navy no-underline hover:bg-mist transition-colors"
          >
            Fill out the form
          </a>
        </Container>
      </section>
    </div>
  );
}

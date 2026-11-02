import { Container, SectionHeading } from "@/components/site/Container";
import { DiscordButton } from "@/components/DiscordButton";
import { DISCORD_URLS } from "@/lib/dates";

const ITEMS = [
  "Live sessions with researchers",
  "Recorded lessons",
  "Research guides",
  "Opportunities to apply to",
];

/** "Join the Atlas community": the Discord, after the written testimonials. */
export function CommunityBand() {
  return (
    <section id="community" className="bg-mist">
      <Container className="py-24">
        <SectionHeading className="m-0 mb-4">Join the Atlas community</SectionHeading>
        <p className="m-0 mb-9 max-w-[34em]">
          Meet students researching their own communities in 20 countries. Ask
          questions, get feedback and find your next project.
        </p>
        <ul className="m-0 mb-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <li
              key={item}
              className="rounded bg-white px-6 py-5 text-[18px] font-semibold leading-[1.35] text-navy"
            >
              {item}
            </li>
          ))}
        </ul>
        <DiscordButton href={DISCORD_URLS.home} className="px-9 py-[18px] text-[20px]" />
      </Container>
    </section>
  );
}

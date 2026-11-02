import { useEffect, useState } from "react";
import { CONTACT_EMAIL, DISCORD_URL } from "@/lib/dates";
import { Container, SectionHeading } from "@/components/site/Container";
import { DiscordButton } from "@/components/DiscordButton";

const ITEMS = [
  "Live sessions with researchers",
  "Recorded lessons",
  "Research guides",
  "Opportunities to apply to",
];

/** The invite code, taken from DISCORD_URL so there is one place to change it. */
const INVITE_CODE = DISCORD_URL.split("/").pop() ?? "";

/**
 * Live member count from Discord's public invite endpoint.
 *
 * NEVER A HARDCODED NUMBER. Returns null while loading, and stays null if the
 * request fails, is blocked (CORS, an ad blocker, a country that blocks
 * Discord), times out, or carries no count. The line simply does not render.
 * Rounded down to the nearest 10, and only shown from 10 up.
 */
function useDiscordMemberCount(): number | null {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!INVITE_CODE) return;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    fetch(
      `https://discord.com/api/v9/invites/${INVITE_CODE}?with_counts=true`,
      { signal: controller.signal }
    )
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const n = data?.approximate_member_count;
        if (typeof n === "number" && n >= 10) setCount(Math.floor(n / 10) * 10);
      })
      .catch(() => {
        /* No count: the line stays hidden. */
      })
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return count;
}

/** "Join the Atlas community": the Discord, after the written testimonials. */
export function CommunityBand() {
  const count = useDiscordMemberCount();

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
        {count !== null && (
          <p className="m-0 mb-4 text-[18px] text-body-muted">
            <strong className="font-semibold text-navy">
              {count.toLocaleString("en-US")}
            </strong>{" "}
            members and growing
          </p>
        )}
        <DiscordButton className="px-9 py-[18px] text-[20px]" />
        <p className="m-0 mt-4 max-w-[36em] text-[16px] text-muted">
          Discord blocked where you live? You can still apply. Email us and we
          will keep you in the loop.{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-crimson underline underline-offset-4 hover:text-crimson-hover [overflow-wrap:anywhere]"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
      </Container>
    </section>
  );
}

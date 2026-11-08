import { Link } from "react-router-dom";
import { DiscordButton } from "@/components/DiscordButton";
import { APPLY_PATH, DATES, DISCORD_URLS } from "@/lib/dates";
import { cn } from "@/lib/utils";

/**
 * The two calls to action at the end of every Resources post, in this order:
 * join the community (Discord), then apply to the fellowship.
 *
 * The closing date comes from DATES.applicationsClose in src/lib/dates.ts, the
 * one place the date is written. Once that date has passed, the line is left
 * out rather than showing a deadline in the past.
 *
 * ATTRIBUTION. Cloudflare Web Analytics has no click events and does not record
 * query strings, so neither button can be counted there:
 *
 *   Join   uses DISCORD_URLS.resources. Give it its own Discord invite and
 *          Discord's invite list shows how many joined from Resources.
 *   Apply  carries utm_source=resources and utm_campaign=<slug>. Readable in
 *          Vercel Web Analytics with the Web Analytics Plus add-on.
 */
const CLOSE_DATE = new Date(`${DATES.applicationsClose}T23:59:59`);

const closeLabel = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
}).format(new Date(`${DATES.applicationsClose}T00:00:00Z`));

export function ResourceCtas({ slug }: { slug: string }) {
  const applyHref = `${APPLY_PATH}?utm_source=resources&utm_medium=website&utm_campaign=${slug}`;
  const open = new Date() <= CLOSE_DATE;

  return (
    <div className="mt-20 grid gap-5">
      <section className="rounded bg-mist p-8 sm:p-10">
        <h2 className="m-0 mb-3 text-[length:clamp(26px,3vw,34px)] leading-[1.2]">
          Want more? Join the Atlas community
        </h2>
        <p className="m-0 mb-7 max-w-[34em] text-[18px] text-body-muted">
          Members get every session live, plus recordings, guides and feedback.
        </p>
        <DiscordButton href={DISCORD_URLS.resources} />
      </section>

      <section className="on-navy rounded bg-navy p-8 text-white sm:p-10">
        <h2 className="m-0 mb-3 text-[length:clamp(26px,3vw,34px)] leading-[1.2]">
          Ready to write your own paper? Apply to the {DATES.cohortName}
        </h2>
        <p
          className={cn(
            "m-0 max-w-[36em] text-[18px] text-on-navy-muted",
            open ? "mb-3" : "mb-7"
          )}
        >
          Atlas Research Institute is a nonprofit that introduces students to
          research. In our free six-week online fellowship, students pick an
          issue they care about, learn to find and test evidence, and finish
          their first research paper.
        </p>
        {open && (
          <p className="m-0 mb-7 text-[18px] font-semibold text-white">
            Applications close {closeLabel}.
          </p>
        )}
        <Link
          to={applyHref}
          className="inline-block rounded bg-white px-[30px] py-4 text-[19px] font-semibold text-navy no-underline transition-colors hover:bg-mist"
        >
          Apply
        </Link>
      </section>
    </div>
  );
}

import { FaDiscord } from "react-icons/fa6";
import { cn } from "@/lib/utils";

/**
 * "Join our Discord", white on Discord blurple with the Discord mark.
 *
 * The one Discord button style on the site, used on the homepage (hero and
 * community band) and on the application's thank-you screen. Blurple is
 * Discord's brand color, used here and nowhere else; crimson stays the primary
 * action (Apply) wherever both appear.
 *
 * `href` is required and should be one of DISCORD_URLS in src/lib/dates.ts:
 * each placement has its own invite.
 */
export function DiscordButton({
  href,
  className,
}: {
  href: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded bg-[#5865F2] px-7 py-[15px] text-[18px] font-semibold text-white no-underline transition-colors hover:bg-[#4752C4]",
        className
      )}
    >
      <FaDiscord aria-hidden size={22} />
      Join our Discord
    </a>
  );
}

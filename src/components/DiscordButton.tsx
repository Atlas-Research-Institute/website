import { FaDiscord } from "react-icons/fa6";
import { DISCORD_URL } from "@/lib/dates";
import { cn } from "@/lib/utils";

/**
 * "Join our Discord", white on Discord blurple with the Discord mark.
 *
 * The one Discord button on the site, so the hero and the community band
 * cannot drift apart. Blurple is Discord's brand color, used here and nowhere
 * else; crimson stays the primary action (Apply) wherever both appear.
 */
export function DiscordButton({ className }: { className?: string }) {
  return (
    <a
      href={DISCORD_URL}
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

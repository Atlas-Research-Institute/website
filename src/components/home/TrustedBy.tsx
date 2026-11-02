import type { IconType } from "react-icons";
import { FaAward, FaBookOpen, FaMicrophone } from "react-icons/fa6";

/**
 * Partners and recognition, directly under the hero, as a slow continuous
 * marquee: three partner logos, then three recognition badges.
 *
 * WHAT MAY GO HERE.
 *   Logos: only for organizations Atlas actually works with, and only with
 *   their permission to use the mark. Files live in public/partners/.
 *   Recognition: text badges with a generic icon (react-icons). Never an
 *   official seal, crest or another organization's logo, even when the
 *   recognition comes from that organization. Badges are not links.
 *
 * Full color on white, between hairline rules, so the logos' own white
 * backgrounds disappear into the strip.
 *
 * HOW THE LOOP STAYS SEAMLESS. The track holds two identical halves and
 * animates from 0 to -50% (index.css, .marquee-track), so the frame where it
 * restarts looks exactly like the frame before. Each half repeats the item
 * list REPEATS times so that one half is always wider than the strip. With six
 * items one copy already is (about 2,500px on desktop against a strip of at
 * most 977px), so REPEATS is 1: the track is the list plus one duplicate.
 * Spacing is padding on each item, not `gap`, so both halves have exactly the
 * same width. Every item has an explicit whole-pixel width (logos: their
 * aspect ratio at that height, rounded; badges: measured text width plus
 * slack, rounded), so the halves are a whole number of pixels wide and the
 * restart frame matches pixel for pixel.
 *
 * ACCESSIBILITY. Only the first occurrence of each item is exposed: every
 * repeat is aria-hidden and its link is out of the tab order, so a screen
 * reader hears each partner and each recognition once. The marquee pauses on
 * hover and while any logo has keyboard focus. Under prefers-reduced-motion it
 * is a static centered layout of the six items (wrapping to several rows on
 * narrow screens). There the badges also drop their fixed width and may wrap
 * their text, because the widest badge is wider than a phone-width strip.
 *
 * NOT lazy-loaded. Repeats sit far to the right of the strip, and lazy images
 * there would load only as they scroll in, popping in mid-loop. Width and
 * height are the files' pixel sizes, so each slot has its final width before
 * the image arrives.
 */

type Logo = {
  kind: "logo";
  name: string;
  src: string;
  href: string | null;
  w: number;
  h: number;
  imgCls: string;
};

type Badge = {
  kind: "badge";
  icon: IconType;
  line1: string;
  line2: string;
  /**
   * Whole-pixel widths for mobile and desktop: the measured width of the
   * badge in Source Serif 4, rounded up, plus about 12px of slack. If you
   * change a badge's text, re-measure and update these.
   */
  boxCls: string;
};

const ITEMS: (Logo | Badge)[] = [
  {
    kind: "logo",
    name: "Lumiere Education",
    src: "/partners/lumiere.png",
    href: "https://www.lumiere-education.com",
    w: 738,
    h: 201,
    imgCls: "h-11 w-[162px] md:h-14 md:w-[206px]",
  },
  {
    kind: "logo",
    name: "International Journal of High School Research",
    src: "/partners/ijhsr.png",
    href: "https://www.ijhighschoolresearch.org",
    w: 294,
    h: 86,
    imgCls: "h-11 w-[150px] md:h-14 md:w-[191px]",
  },
  {
    /*
     * The Curieux file is a 225×225 square with the mark in the middle and a
     * wide white margin around it. Drawn at the same height as the others,
     * the mark would be half their size. It is drawn larger and the margin is
     * clipped by the row (the item box is the same height as the others and
     * hides its overflow), so the visible mark matches the other two.
     */
    kind: "logo",
    name: "The Curieux Review",
    src: "/partners/curieux.png",
    href: null,
    w: 225,
    h: 225,
    imgCls: "h-[84px] w-[84px] md:h-[106px] md:w-[106px]",
  },
  {
    kind: "badge",
    icon: FaBookOpen,
    line1: "Published in Teaching Anthropology",
    line2: "A journal of the Royal Anthropological Institute",
    boxCls: "w-[349px] md:w-[372px]",
  },
  {
    kind: "badge",
    icon: FaAward,
    line1: "Special Congressional Recognition",
    line2: "Rep. Mark DeSaulnier, for founding Atlas",
    boxCls: "w-[307px] md:w-[328px]",
  },
  {
    kind: "badge",
    icon: FaMicrophone,
    line1: "Selected for the AAA 2026 Annual Meeting program",
    line2: "American Anthropological Association",
    boxCls: "w-[418px] md:w-[443px]",
  },
];

const REPEATS = 1;

function LogoItem({ item, duplicate }: { item: Logo; duplicate: boolean }) {
  const img = (
    <img
      src={item.src}
      alt={duplicate ? "" : item.name}
      width={item.w}
      height={item.h}
      className={`block max-w-none ${item.imgCls}`}
    />
  );
  return item.href ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      title={duplicate ? undefined : item.name}
      tabIndex={duplicate ? -1 : undefined}
    >
      {img}
    </a>
  ) : (
    img
  );
}

function BadgeItem({ item }: { item: Badge }) {
  const Icon = item.icon;
  return (
    <div className={`marquee-badge flex items-center gap-3 ${item.boxCls}`}>
      <Icon aria-hidden className="h-7 w-7 shrink-0 text-navy md:h-8 md:w-8" />
      <div className="marquee-badge-text whitespace-nowrap">
        <div className="text-[15px] font-semibold leading-[1.25] text-navy md:text-[16px]">
          {item.line1}
        </div>
        <div className="text-[13px] leading-[1.3] text-muted md:text-[14px]">
          {item.line2}
        </div>
      </div>
    </div>
  );
}

export function TrustedBy() {
  const half = Array.from({ length: REPEATS }, () => ITEMS).flat();
  const items = [...half, ...half];

  return (
    <section
      aria-labelledby="partners-heading"
      className="border-y border-rule bg-white"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-6 py-6 md:flex-row md:items-center md:gap-10">
        <h2
          id="partners-heading"
          className="m-0 shrink-0 text-[16px] font-normal italic text-muted"
        >
          Partners and recognition
        </h2>
        <div className="marquee min-w-0 flex-1 overflow-hidden">
          <ul className="marquee-track m-0 flex w-max list-none items-center p-0">
            {items.map((item, i) => {
              const duplicate = i >= ITEMS.length;
              return (
                <li
                  key={i}
                  aria-hidden={duplicate || undefined}
                  className={`marquee-item flex h-11 shrink-0 items-center overflow-hidden pr-14 md:h-14 md:pr-20${
                    item.kind === "badge" ? " marquee-badge-item" : ""
                  }${duplicate ? " marquee-dup" : ""}`}
                >
                  {item.kind === "logo" ? (
                    <LogoItem item={item} duplicate={duplicate} />
                  ) : (
                    <BadgeItem item={item} />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

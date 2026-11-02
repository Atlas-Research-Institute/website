/**
 * Partners and recognition, directly under the hero, as a slow continuous
 * marquee of logos.
 *
 * WHAT MAY GO HERE. Logos only:
 *   - organizations Atlas works with, with their permission to use the mark;
 *   - journals or conferences where Atlas work was published or invited.
 * Never a government seal or crest. The recognition context (what was
 * published, what was presented, the congressional certificate) lives as text
 * in the "Recognition" section on /about, not here. Files live in
 * public/partners/.
 *
 * Full color on white, between hairline rules, so the logos' own white
 * backgrounds disappear into the strip.
 *
 * VISUAL WEIGHT. Every logo sits in the same 44px (mobile) / 56px (desktop)
 * row. The wordmarks (Lumiere, IJHSR, AAA) and the Teaching Anthropology
 * square fill its height. Curieux is drawn larger with its white margin
 * clipped.
 *
 * HOW THE LOOP STAYS SEAMLESS. The track holds two identical halves and
 * animates from 0 to -50% (index.css, .marquee-track), so the frame where it
 * restarts looks exactly like the frame before. Each half repeats the list
 * REPEATS times so that one half is always wider than the strip. With five
 * logos one copy already is (1,138px on desktop against a strip of at most
 * 941px; 861px on mobile against 312px), so REPEATS is 1. The desktop margin
 * is narrow: if a logo is removed, set REPEATS to 2 or the loop will show a
 * gap at the right edge on wide screens. Spacing is padding
 * on each item, not `gap`, so both halves have exactly the same width. Each
 * logo has an explicit whole-pixel width (its aspect ratio at that height,
 * rounded), so the halves are a whole number of pixels wide and the restart
 * frame matches pixel for pixel.
 *
 * ACCESSIBILITY. Only the first occurrence of each logo is exposed: every
 * repeat is aria-hidden, its image has empty alt text and its link is out of
 * the tab order, so a screen reader hears each organization once. The marquee
 * pauses on hover and while any logo link has keyboard focus. Under
 * prefers-reduced-motion it is a static centered row of the five logos
 * (wrapping on narrow screens).
 *
 * NOT lazy-loaded. Repeats sit far to the right of the strip, and lazy images
 * there would load only as they scroll in, popping in mid-loop. Width and
 * height are the files' pixel sizes, so each slot has its final width before
 * the image arrives.
 */
const LOGOS = [
  {
    name: "Lumiere Education",
    src: "/partners/lumiere.png",
    href: "https://www.lumiere-education.com",
    w: 738,
    h: 201,
    imgCls: "h-11 w-[162px] md:h-14 md:w-[206px]",
  },
  {
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
    name: "The Curieux Review",
    src: "/partners/curieux.png",
    href: null,
    w: 225,
    h: 225,
    imgCls: "h-[84px] w-[84px] md:h-[106px] md:w-[106px]",
  },
  {
    /* A square mark, at the full row height like the AAA spiral beside it. */
    name: "Teaching Anthropology",
    src: "/partners/teaching-anthropology.webp",
    href: "https://www.teachinganthropology.org",
    w: 224,
    h: 224,
    imgCls: "h-11 w-11 md:h-14 md:w-14",
  },
  {
    name: "American Anthropological Association",
    src: "/partners/aaa.svg",
    href: "https://americananthro.org",
    w: 198,
    h: 62,
    imgCls: "h-11 w-[141px] md:h-14 md:w-[179px]",
  },
] as const;

const REPEATS = 1;

export function TrustedBy() {
  const half = Array.from({ length: REPEATS }, () => LOGOS).flat();
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
            {items.map((p, i) => {
              const duplicate = i >= LOGOS.length;
              const logo = (
                <img
                  src={p.src}
                  alt={duplicate ? "" : p.name}
                  width={p.w}
                  height={p.h}
                  className={`block max-w-none ${p.imgCls}`}
                />
              );
              return (
                <li
                  key={i}
                  aria-hidden={duplicate || undefined}
                  className={`marquee-item flex h-11 shrink-0 items-center overflow-hidden pr-14 md:h-14 md:pr-20${
                    duplicate ? " marquee-dup" : ""
                  }`}
                >
                  {p.href ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={duplicate ? undefined : p.name}
                      tabIndex={duplicate ? -1 : undefined}
                    >
                      {logo}
                    </a>
                  ) : (
                    logo
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

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "@/components/site/Container";
import { FEATURED_PAPERS } from "@/data/featuredPapers";
import { paperPath } from "@/lib/papers";

/**
 * "Research by Atlas students": the first page of each paper as a sheet on a
 * desk, each linking to that paper's own page at /journal/papers/<slug>.
 *
 * Reads only from FEATURED_PAPERS, and shows only the papers marked
 * featured: true. To change what shows here, edit src/data/featuredPapers.ts,
 * not this file.
 *
 * Desktop shows the three sheets in a row. Below md the row becomes a
 * horizontal scroll-snap carousel, one sheet at a time with the next peeking
 * in, and dots under it. No carousel library: the browser does the snapping.
 */

/*
 * THE ONE SHADOW ON THE SITE. The design system has no shadows; paper covers
 * are a deliberate exception, so the white page lifts off the mist background
 * like a sheet of paper. Do not reuse this anywhere else.
 */
const SHEET =
  "overflow-hidden border border-rule bg-white shadow-[0_1px_2px_rgba(19,41,75,0.08),0_14px_30px_-10px_rgba(19,41,75,0.30)]";

const PAPERS = FEATURED_PAPERS.filter((p) => p.featured);

export function FeaturedPapers() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLUListElement>(null);

  // Which sheet the mobile carousel is on: the one whose snap point is nearest the scroll position.
  // The track is the offsetParent (relative), and 24 is its px-6 / scroll-px-6 inset.
  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    const offsets = Array.from(track.children, (el) => (el as HTMLElement).offsetLeft - 24);
    const distance = (o: number) => Math.abs(o - track.scrollLeft);
    setActive(offsets.indexOf(offsets.reduce((a, b) => (distance(b) < distance(a) ? b : a))));
  }

  function scrollToSheet(i: number) {
    const track = trackRef.current;
    const item = track?.children[i] as HTMLElement | undefined;
    if (track && item) track.scrollTo({ left: item.offsetLeft - 24 });
  }

  return (
    <section id="papers" className="bg-mist">
      <Container className="pt-24 pb-[88px]">
        <SectionHeading className="m-0 mb-10">Research by Atlas students</SectionHeading>
        {/*
          Below md: a scroll-snap track that bleeds to the screen edges (-mx-6,
          px-6) and scrolls inside itself only. The vertical padding leaves room
          for the hover lift and the shadow, which overflow-x would otherwise clip.
        */}
        <ul
          ref={trackRef}
          onScroll={handleScroll}
          className="relative m-0 -mx-6 flex list-none snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto px-6 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-3 md:gap-x-12 md:overflow-visible md:px-0 md:py-0"
        >
          {PAPERS.map((p) => (
            <li
              key={p.slug}
              className="group relative flex w-[78%] shrink-0 snap-start snap-always flex-col md:w-auto"
            >
              <div
                className={cn(
                  SHEET,
                  "rounded-[2px] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out motion-safe:group-hover:-translate-y-1.5 motion-safe:group-focus-within:-translate-y-1.5"
                )}
              >
                {/* The top of the page, about four fifths: title, authors and abstract. */}
                <img
                  src={p.cover}
                  alt={`First page of ${p.title}`}
                  width={900}
                  height={1164}
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[900/910] h-auto w-full object-cover object-top"
                />
              </div>
              <h3 className="m-0 mt-6 mb-2 text-[20px] leading-[1.3] text-navy">
                {/* The ::after stretches this link over the whole sheet and its caption, so any click on it opens the paper's page. */}
                <Link
                  to={paperPath(p.slug)}
                  className="line-clamp-2 break-words text-left font-semibold text-inherit no-underline [font:inherit] focus:outline-none after:absolute after:-inset-2 after:rounded after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-navy"
                >
                  {p.title}
                </Link>
              </h3>
              <p className="m-0 text-[17px] text-ink">{p.authorsShort}</p>
              <p className="m-0 text-[16px] italic text-muted">{p.context}</p>
              <p className="m-0 text-[16px] text-muted">{p.date}</p>
              <span aria-hidden className="mt-3 text-[16px] font-semibold text-crimson">
                Read the whole paper
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center gap-1 md:hidden">
          {PAPERS.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => scrollToSheet(i)}
              aria-label={`Show paper ${i + 1} of ${PAPERS.length}`}
              aria-current={i === active ? "true" : undefined}
              className="flex h-6 w-6 items-center justify-center"
            >
              <span
                aria-hidden
                className={cn(
                  "block h-2 w-2 rounded-full",
                  i === active ? "bg-navy" : "bg-rule"
                )}
              />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Container, SectionHeading } from "@/components/site/Container";
import { FEATURED_PAPERS, type FeaturedPaper } from "@/data/featuredPapers";

/**
 * "Research by Atlas students": the first page of each paper as a sheet on a
 * desk, each opening a pop-up with the abstract and a link to the PDF.
 *
 * Reads only from FEATURED_PAPERS. To change what shows here, edit
 * src/data/featuredPapers.ts, not this file.
 *
 * Desktop shows the three sheets in a row. Below md the row becomes a
 * horizontal scroll-snap carousel, one sheet at a time with the next peeking
 * in, and dots under it. No carousel library: the browser does the snapping.
 *
 * The pop-up is a native <dialog> opened with showModal(), so the browser
 * handles the focus trap, the inert page behind it and Escape. This component
 * adds the rest: backdrop click to close, locking page scroll, and returning
 * focus to the sheet that opened it. The PDF is linked, never embedded.
 */

/*
 * THE ONE SHADOW ON THE SITE. The design system has no shadows; paper covers
 * are a deliberate exception, so the white page lifts off the mist background
 * like a sheet of paper. Do not reuse this anywhere else.
 */
const SHEET =
  "overflow-hidden border border-rule bg-white shadow-[0_1px_2px_rgba(19,41,75,0.08),0_14px_30px_-10px_rgba(19,41,75,0.30)]";

export function FeaturedPapers() {
  const [open, setOpen] = useState<FeaturedPaper | null>(null);
  const [active, setActive] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const triggers = useRef(new Map<string, HTMLButtonElement>());

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    return () => {
      root.style.overflow = previousOverflow;
    };
  }, [open]);

  // Fires for every way the dialog closes: Escape, the close button, the backdrop.
  function handleClose() {
    const slug = open?.slug;
    setOpen(null);
    if (slug) triggers.current.get(slug)?.focus();
  }

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
          {FEATURED_PAPERS.map((p) => (
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
                {/* The ::after stretches this button over the whole sheet and its caption, so any click on it opens the paper. */}
                <button
                  type="button"
                  ref={(el) => {
                    if (el) triggers.current.set(p.slug, el);
                    else triggers.current.delete(p.slug);
                  }}
                  onClick={() => setOpen(p)}
                  aria-haspopup="dialog"
                  className="line-clamp-2 break-words bg-transparent p-0 text-left font-semibold text-inherit [font:inherit] focus:outline-none after:absolute after:-inset-2 after:rounded after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-navy"
                >
                  {p.title}
                </button>
              </h3>
              <p className="m-0 text-[17px] text-ink">{p.authorsShort}</p>
              <p className="m-0 text-[16px] italic text-muted">{p.context}</p>
              <p className="m-0 text-[16px] text-muted">{p.date}</p>
              <span aria-hidden className="mt-3 text-[16px] font-semibold text-crimson">
                Read abstract
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-center gap-1 md:hidden">
          {FEATURED_PAPERS.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              onClick={() => scrollToSheet(i)}
              aria-label={`Show paper ${i + 1} of ${FEATURED_PAPERS.length}`}
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

      <dialog
        ref={dialogRef}
        aria-labelledby="featured-paper-title"
        onClose={handleClose}
        onClick={(e) => {
          if (e.target === e.currentTarget) e.currentTarget.close();
        }}
        className="m-auto w-[calc(100vw-16px)] max-w-[760px] max-h-[calc(100dvh-16px)] h-[calc(100dvh-16px)] md:h-auto overflow-hidden rounded border border-rule bg-white p-0 text-ink backdrop:bg-navy/60"
      >
        {open && (
          <div className="flex h-full max-h-[calc(100dvh-16px)] flex-col">
            <div className="flex shrink-0 justify-end px-3 pt-3">
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                aria-label="Close"
                className="flex h-10 w-10 items-center justify-center rounded text-[28px] leading-none text-muted hover:bg-mist hover:text-navy"
              >
                <span aria-hidden>×</span>
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 md:px-10">
              <img
                src={open.cover}
                alt={`First page of ${open.title}`}
                width={900}
                height={1164}
                className={cn(SHEET, "mb-5 block h-auto w-[96px] rounded-[2px]")}
              />
              <h2
                id="featured-paper-title"
                className="m-0 mb-4 break-words text-[length:clamp(22px,2.6vw,30px)] leading-[1.25] text-navy"
              >
                {open.title}
              </h2>
              <p className="m-0 text-[17px]">{open.authors.join(", ")}</p>
              <p className="m-0 mb-6 text-[16px] italic text-muted">
                {open.context} · {open.date}
              </p>
              <h3 className="m-0 mb-2 text-[18px] text-navy">Abstract</h3>
              <p className="m-0 mb-6 text-[17px] leading-[1.65]">{open.abstract}</p>
              <h3 className="m-0 mb-2 text-[18px] text-navy">Keywords</h3>
              <ul className="m-0 p-0 list-none flex flex-wrap gap-2">
                {open.keywords.map((k) => (
                  <li key={k} className="rounded-[3px] bg-mist px-3 py-1 text-[15px]">
                    {k}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0 border-t border-rule px-6 py-4 md:px-10">
              <a
                href={open.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full rounded bg-crimson px-7 py-[13px] text-center text-[17px] font-semibold text-white no-underline hover:bg-crimson-hover transition-colors sm:w-auto"
              >
                Read the full paper
                <span className="sr-only"> (PDF, opens in a new tab)</span>
              </a>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

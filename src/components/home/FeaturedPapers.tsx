import { useEffect, useRef, useState } from "react";
import { Container, SectionHeading } from "@/components/site/Container";
import { FEATURED_PAPERS, type FeaturedPaper } from "@/data/featuredPapers";

/**
 * "Research by Atlas students": three paper cards, each opening a pop-up with
 * the abstract and a link to the PDF.
 *
 * Reads only from FEATURED_PAPERS. To change what shows here, edit
 * src/data/featuredPapers.ts, not this file.
 *
 * The pop-up is a native <dialog> opened with showModal(), so the browser
 * handles the focus trap, the inert page behind it and Escape. This component
 * adds the rest: backdrop click to close, locking page scroll, and returning
 * focus to the card that opened it. The PDF is linked, never embedded.
 */
export function FeaturedPapers() {
  const [open, setOpen] = useState<FeaturedPaper | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
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

  return (
    <section id="papers" className="mx-auto max-w-[1200px] px-6 pt-4 pb-[104px]">
      <SectionHeading className="m-0 mb-3">Research by Atlas students</SectionHeading>
      <p className="m-0 mb-9 max-w-[32em] text-body-muted">
        Papers written by fellows and the Atlas team.
      </p>
      <ul className="m-0 p-0 list-none grid gap-6 md:grid-cols-3">
        {FEATURED_PAPERS.map((p) => (
          <li
            key={p.slug}
            className="relative flex flex-col rounded border border-rule bg-white p-7 transition-colors hover:border-navy focus-within:border-navy"
          >
            <h3 className="m-0 mb-4 text-[21px] leading-[1.3] text-navy">
              {/* The ::after stretches this button over the whole card, so any click on it opens the paper. */}
              <button
                type="button"
                ref={(el) => {
                  if (el) triggers.current.set(p.slug, el);
                  else triggers.current.delete(p.slug);
                }}
                onClick={() => setOpen(p)}
                aria-haspopup="dialog"
                className="line-clamp-4 break-words bg-transparent p-0 text-left font-semibold text-inherit [font:inherit] focus:outline-none after:absolute after:inset-0 after:rounded after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-navy"
              >
                {p.title}
              </button>
            </h3>
            <p className="m-0 text-[17px] text-ink">{p.authorsShort}</p>
            <p className="m-0 text-[16px] italic text-muted">{p.context}</p>
            <p className="m-0 text-[16px] text-muted">{p.date}</p>
            <span aria-hidden className="mt-auto pt-5 text-[16px] font-semibold text-crimson">
              Read abstract
            </span>
          </li>
        ))}
      </ul>

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

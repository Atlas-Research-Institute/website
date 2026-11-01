/**
 * Partner logos, directly under the hero.
 *
 * A static row, not a carousel: three logos rotating is movement without
 * information, and a reader cannot compare them. Turn this into a marquee
 * when there are more than six.
 *
 * Logos live in public/partners/. Only add an organisation Atlas actually
 * works with, and only with their permission to use the mark.
 */
const PARTNERS = [
  {
    name: "Lumiere Education",
    src: "/partners/lumiere.png",
    href: "https://www.lumiere-education.com",
  },
  {
    name: "International Journal of High School Research",
    src: "/partners/ijhsr.png",
    href: "https://www.ijhighschoolresearch.org",
  },
  {
    name: "The Curieux Review",
    src: "/partners/curieux.png",
    href: null,
  },
] as const;

export function TrustedBy() {
  return (
    <section
      aria-labelledby="partners-heading"
      className="border-y border-rule bg-mist"
    >
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-x-12 gap-y-6 px-6 py-7">
        <h2
          id="partners-heading"
          className="m-0 text-[16px] font-normal italic text-muted"
        >
          In partnership with
        </h2>
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-12 gap-y-6 p-0">
          {PARTNERS.map((p) => {
            const logo = (
              <img
                src={p.src}
                alt={p.name}
                loading="lazy"
                className="block h-9 w-auto opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            );
            return (
              <li key={p.name}>
                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={p.name}
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
    </section>
  );
}

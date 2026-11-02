import type { ReactNode } from "react";

/**
 * Researchers who have taught Atlas fellows.
 *
 * THE NAMES AND THE NON-AFFILIATION LINE TRAVEL TOGETHER. The list renders the
 * line itself, directly under the names, so no page can show one without the
 * other.
 */
const RESEARCHERS = [
  {
    name: "Prof. Denise Clark Pope",
    affiliation: "Graduate School of Education, Stanford University",
  },
  {
    name: "Prof. Sarah Levine",
    affiliation: "Graduate School of Education, Stanford University",
  },
  {
    name: "Prof. Bruce Fuller",
    affiliation: "Professor Emeritus, Graduate School of Education, UC Berkeley",
  },
];

export function ResearcherList({ noteClassName }: { noteClassName: string }) {
  return (
    <>
      <NameList items={RESEARCHERS.map((r) => ({ name: r.name, detail: r.affiliation }))} />
      <p className={`${noteClassName} text-[16px] text-muted`}>
        Atlas is not affiliated with or endorsed by these universities.
      </p>
    </>
  );
}

/** A name in navy semibold over an italic muted line. */
export function NameList({
  items,
  gap = "gap-4",
}: {
  items: { name: string; detail: string }[];
  gap?: string;
}) {
  return (
    <ul className={`m-0 p-0 list-none grid ${gap}`}>
      {items.map((item) => (
        <li key={item.name}>
          <div className="font-semibold text-navy">{item.name}</div>
          <div className="text-[17px] italic text-muted">{item.detail}</div>
        </li>
      ))}
    </ul>
  );
}

/**
 * The researchers block with a lesson photo: intro and list on the left, the
 * Fuller lesson in a bordered frame on the right. The image drops below the
 * list on narrow screens. Used on the homepage and on /about, so the two
 * cannot drift apart. ResearcherList still carries the non-affiliation line.
 */
export function ResearchersWithPhoto({
  intro,
  noteClassName,
}: {
  intro: ReactNode;
  noteClassName: string;
}) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-x-[72px] gap-y-12">
      <div>
        {intro}
        <ResearcherList noteClassName={noteClassName} />
      </div>
      <figure className="m-0">
        <img
          src="/images/fuller-lesson.webp"
          alt="Slide from Prof. Bruce Fuller's lesson on research method, titled Method: Describing, Correlating, Explaining"
          width={1600}
          height={900}
          loading="lazy"
          className="block h-auto w-full rounded border border-rule"
        />
        <figcaption className="mt-3 text-[16px] italic text-muted">
          Prof. Bruce Fuller teaching Atlas fellows
        </figcaption>
      </figure>
    </div>
  );
}

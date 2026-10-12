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

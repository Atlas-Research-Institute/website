import { DATES } from "@/lib/dates";

/** The fellowship facts, on mist. Dates come from src/lib/dates.ts. */
const FACTS = [
  { label: "Applications close", value: DATES.applicationsCloseLabel },
  { label: "Fellowship runs", value: DATES.fellowshipRunsLabel },
  { label: "Where", value: "Online" },
  { label: "Cost", value: "Free" },
  { label: "Who can apply", value: "Secondary and university students", small: true },
];

export function FactStrip() {
  return (
    <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,190px),1fr))] rounded bg-mist px-2.5 py-1.5">
      {FACTS.map((f) => (
        <div key={f.label} className="px-5 py-[18px]">
          <dt className="mb-0.5 text-[15px] italic text-muted">{f.label}</dt>
          <dd
            className={
              f.small
                ? "m-0 text-[19px] leading-[1.35] font-semibold text-navy"
                : "m-0 text-[21px] font-semibold text-navy"
            }
          >
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

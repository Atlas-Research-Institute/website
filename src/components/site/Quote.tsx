import { cn } from "@/lib/utils";

/** A fellow's quote with their first name and country. */
export function Quote({
  quote,
  name,
  country,
  className,
}: {
  quote: string;
  name: string;
  country: string;
  className: string;
}) {
  return (
    <figure
      className={cn(
        "m-0 rounded p-[30px] flex flex-col justify-between gap-5",
        className
      )}
    >
      <blockquote className="m-0 text-[19px] leading-[1.55] italic">
        “{quote}”
      </blockquote>
      <figcaption className="text-[17px] text-body-muted">
        <strong className="font-semibold text-navy">{name}</strong>, {country}
      </figcaption>
    </figure>
  );
}

/** Small bordered or filled country chips. */
export function CountryList({
  countries,
  itemClassName,
}: {
  countries: string[];
  itemClassName: string;
}) {
  return (
    <ul className="m-0 p-0 list-none flex flex-wrap gap-2.5">
      {countries.map((c) => (
        <li
          key={c}
          className={cn("rounded-[3px] px-4 py-1.5 text-[18px]", itemClassName)}
        >
          {c}
        </li>
      ))}
    </ul>
  );
}

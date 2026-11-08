import { Link, useSearchParams } from "react-router-dom";
import { Container } from "@/components/site/Container";
import { RESOURCES } from "@/lib/resources";
import {
  RESOURCE_CATEGORIES,
  resourcePath,
  type ResourceCategory,
} from "@/lib/resourceMeta";
import { cn } from "@/lib/utils";

/**
 * /resources: every post, newest first, with category filters.
 *
 * Posts come from src/content/resources/*.md; nothing here is edited to add one.
 * The filter is kept in the URL (?category=guide) so a filtered list can be
 * shared and survives the back button. No dates are shown on this page; the
 * date is in each post's structured data only.
 *
 * A category gets a filter button only once it has a post, so an empty one
 * (Fellow stories, for now) stays in the code but out of sight. A link to an
 * empty or unknown category shows everything.
 */
const FILTERS: { value: ResourceCategory | null; label: string }[] = [
  { value: null, label: "All" },
  ...(Object.keys(RESOURCE_CATEGORIES) as ResourceCategory[])
    .filter((value) => RESOURCES.some((post) => post.category === value))
    .map((value) => ({
      value,
      label: RESOURCE_CATEGORIES[value].plural,
    })),
];

export function Resources() {
  const [params, setParams] = useSearchParams();
  const requested = params.get("category");
  const active =
    FILTERS.find((filter) => filter.value && filter.value === requested)
      ?.value ?? null;
  const posts = active
    ? RESOURCES.filter((post) => post.category === active)
    : RESOURCES;

  return (
    <div className="bg-paper text-ink text-[19px] leading-[1.65]">
      <Container className="pt-16 pb-[104px]">
        <h1 className="m-0 mb-6 text-[length:clamp(40px,5.2vw,62px)] leading-[1.08] tracking-[-0.01em]">
          Resources
        </h1>
        <p className="m-0 max-w-[36em] text-[21px] text-body-muted">
          These are some of the things Atlas members get. Members get every
          session live, plus recordings, guides and feedback.
        </p>

        <div
          role="group"
          aria-label="Filter by category"
          className="mt-12 flex flex-wrap gap-2.5"
        >
          {FILTERS.map((filter) => {
            const pressed = filter.value === active;
            return (
              <button
                key={filter.label}
                type="button"
                aria-pressed={pressed}
                onClick={() =>
                  setParams(
                    filter.value ? { category: filter.value } : {},
                    { replace: true }
                  )
                }
                className={cn(
                  "min-h-[44px] rounded border px-[18px] py-2 text-[17px] transition-colors",
                  pressed
                    ? "border-navy bg-navy font-semibold text-white"
                    : "border-rule bg-white text-ink hover:border-navy"
                )}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <ul className="m-0 mt-10 list-none border-t border-rule p-0">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="group relative grid gap-5 border-b border-rule py-9 sm:grid-cols-[minmax(0,320px)_minmax(0,1fr)] sm:items-start sm:gap-8"
            >
              <img
                src={post.cover}
                alt={post.coverAlt}
                width={1280}
                height={720}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full rounded border border-rule"
              />
              <div>
                <p className="m-0 mb-2 text-[16px] italic text-muted">
                  {RESOURCE_CATEGORIES[post.category].label}
                </p>
                <h2 className="m-0 mb-3 max-w-[30em] text-[length:clamp(24px,2.6vw,30px)] leading-[1.25]">
                  {/* The link covers the whole card, image included. */}
                  <Link
                    to={resourcePath(post)}
                    className="text-navy no-underline decoration-2 underline-offset-[5px] transition-colors after:absolute after:inset-0 hover:text-crimson hover:underline group-hover:text-crimson group-hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="m-0 max-w-[40em] text-[18px] text-body-muted">
                  {post.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {posts.length === 0 && (
          <p className="m-0 mt-10 text-muted">Nothing in this category yet.</p>
        )}
      </Container>
    </div>
  );
}

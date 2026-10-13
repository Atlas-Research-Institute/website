import { Link, useLocation } from "react-router-dom";
import { APPLY_PATH } from "@/lib/dates";
import { cn } from "@/lib/utils";

/**
 * Sitewide header: an 8px navy bar, the wordmark, five links and the Apply
 * button.
 *
 * Fellowship and Lessons are sections of the homepage. Research Groups,
 * Events and Partners are no longer in the nav; their pages still exist.
 */
const LINKS = [
  { to: "/#fellowship", label: "Fellowship" },
  { to: "/#lessons", label: "Lessons" },
  { to: "/journal", label: "Journal" },
  { to: "/about", label: "About" },
  { to: "/get-involved", label: "Get Involved" },
];

export function Nav() {
  const { pathname } = useLocation();

  return (
    <>
      <div className="bg-navy h-2" />
      <header className="bg-paper border-b border-rule">
        <div className="mx-auto max-w-[1200px] px-6 py-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-3">
          <Link
            to="/"
            className="py-2 text-[24px] leading-[1.3] font-bold text-navy no-underline"
          >
            Atlas Research Institute
          </Link>
          <nav
            aria-label="Main"
            className="flex flex-wrap items-center gap-x-5 sm:gap-x-7 gap-y-1 text-[17px] leading-[1.65]"
          >
            {LINKS.map((l) => {
              const active =
                !l.to.includes("#") &&
                (pathname === l.to || pathname.startsWith(`${l.to}/`));
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "py-3 transition-colors",
                    active
                      ? "text-navy font-semibold underline decoration-2 underline-offset-[6px]"
                      : "text-ink no-underline hover:text-crimson"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
            <Link
              to={APPLY_PATH}
              className="rounded bg-crimson px-[22px] py-[11px] font-semibold text-white no-underline hover:bg-crimson-hover transition-colors"
            >
              Apply
            </Link>
          </nav>
        </div>
      </header>
    </>
  );
}

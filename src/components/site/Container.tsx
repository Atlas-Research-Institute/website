import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** The 1200px column with 24px gutters that every redesigned section sits in. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto max-w-[1200px] px-6", className)}>
      {children}
    </div>
  );
}

/** Section heading, 30px to 42px. */
export function SectionHeading({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={cn(
        "text-[length:clamp(30px,3.4vw,42px)] leading-[1.15]",
        className
      )}
    >
      {children}
    </h2>
  );
}

/** Smaller section heading, 28px to 36px. */
export function SubHeading({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <h2
      className={cn(
        "text-[length:clamp(28px,3vw,36px)] leading-[1.2]",
        className
      )}
    >
      {children}
    </h2>
  );
}

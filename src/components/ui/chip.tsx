import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function chipClassName(active = false, className?: string) {
  return cn(
    "inline-flex touch-manipulation items-center rounded-full border px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:rgba(20,127,146,0.28)]",
    active
      ? "border-[color:rgba(20,127,146,0.18)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-strong)]"
      : "border-[color:var(--color-border)] bg-white/80 text-[color:var(--color-ink-soft)] hover:border-[color:rgba(20,127,146,0.22)] hover:bg-white hover:text-[color:var(--color-ink)]",
    className,
  );
}

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  active?: boolean;
};

export function Chip({ active = false, className, ...props }: ChipProps) {
  return <span className={chipClassName(active, className)} {...props} />;
}

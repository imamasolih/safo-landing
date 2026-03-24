import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function chipClassName(active = false, className?: string) {
  return cn(
    "inline-flex touch-manipulation items-center rounded-full border px-4 py-2 text-[0.76rem] font-semibold tracking-[0.14em] uppercase transition-colors",
    active
      ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-strong)]"
      : "border-[color:var(--color-border)] bg-white/75 text-[color:var(--color-ink-soft)]",
    className,
  );
}

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  active?: boolean;
};

export function Chip({ active = false, className, ...props }: ChipProps) {
  return <span className={chipClassName(active, className)} {...props} />;
}

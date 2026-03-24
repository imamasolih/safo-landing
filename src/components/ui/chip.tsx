import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function chipClassName(active = false, className?: string) {
  return cn(
    "inline-flex min-h-11 touch-manipulation items-center rounded-full border px-4 py-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.12em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:rgba(20,127,146,0.28)]",
    active
      ? "border-[color:rgba(15,29,47,0.08)] bg-[color:var(--color-graphite)] text-white shadow-[0_14px_32px_rgba(15,29,47,0.12)]"
      : "border-[color:rgba(15,29,47,0.12)] bg-white/96 text-[color:var(--color-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(15,29,47,0.03)] hover:-translate-y-px hover:border-[color:rgba(20,127,146,0.24)] hover:bg-white hover:text-[color:var(--color-ink)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_8px_22px_rgba(15,29,47,0.08)]",
    className,
  );
}

type ChipProps = HTMLAttributes<HTMLSpanElement> & {
  active?: boolean;
};

export function Chip({ active = false, className, ...props }: ChipProps) {
  return <span className={chipClassName(active, className)} {...props} />;
}

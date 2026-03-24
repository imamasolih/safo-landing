import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md";

export function buttonClassName({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex touch-manipulation items-center justify-center rounded-full font-semibold uppercase tracking-[0.1em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:rgba(20,127,146,0.28)] disabled:cursor-not-allowed disabled:opacity-55",
    size === "sm" ? "min-h-11 px-4 text-[0.72rem]" : "min-h-12 px-6 text-[0.78rem]",
    variant === "primary" &&
      "bg-[color:var(--color-graphite)] text-white shadow-[0_18px_50px_rgba(15,29,47,0.14)] hover:-translate-y-px hover:bg-[color:var(--color-ink)]",
    variant === "secondary" &&
      "border border-[color:var(--color-border-strong)] bg-white/82 text-[color:var(--color-ink)] hover:border-[color:rgba(20,127,146,0.32)] hover:bg-white hover:text-[color:var(--color-accent-strong)]",
    variant === "ghost" &&
      "text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)]",
    className,
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, className })}
      {...props}
    />
  );
}

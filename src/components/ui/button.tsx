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
    "inline-flex touch-manipulation items-center justify-center rounded-full font-semibold tracking-[0.08em] uppercase transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:rgba(18,146,163,0.38)] disabled:cursor-not-allowed disabled:opacity-55",
    size === "sm" ? "min-h-11 px-4 text-xs" : "min-h-12 px-6 text-[0.82rem]",
    variant === "primary" &&
      "bg-[color:var(--color-graphite)] text-white shadow-[0_18px_50px_rgba(15,29,47,0.16)] hover:bg-[color:var(--color-ink)]",
    variant === "secondary" &&
      "border border-[color:var(--color-border-strong)] bg-white/75 text-[color:var(--color-ink)] hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent-strong)]",
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

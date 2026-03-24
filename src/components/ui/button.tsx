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
    "inline-flex min-w-0 touch-manipulation items-center justify-center gap-2 rounded-full whitespace-nowrap font-semibold tracking-[0.04em] transition-[background-color,border-color,color,box-shadow,transform] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:rgba(20,127,146,0.28)] disabled:cursor-not-allowed disabled:opacity-55",
    size === "sm"
      ? "min-h-11 px-5 text-[0.79rem] leading-none"
      : "min-h-[3.15rem] px-6 text-[0.88rem] leading-none",
    variant === "primary" &&
      "border border-transparent bg-[color:var(--color-graphite)] !text-white shadow-[0_18px_44px_rgba(15,29,47,0.18)] hover:-translate-y-px hover:bg-[color:var(--color-ink)] hover:!text-white hover:shadow-[0_22px_50px_rgba(15,29,47,0.22)]",
    variant === "secondary" &&
      "border border-[color:rgba(15,29,47,0.12)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,249,252,0.96))] text-[color:var(--color-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.92),0_10px_24px_rgba(15,29,47,0.06)] hover:-translate-y-px hover:border-[color:rgba(20,127,146,0.22)] hover:bg-white hover:text-[color:var(--color-ink)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.94),0_16px_32px_rgba(15,29,47,0.08)]",
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

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  kicker: string;
  title: string;
  intro?: string;
  className?: string;
};

export function SectionHeading({
  kicker,
  title,
  intro,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="medical-kicker">{kicker}</p>
      <h2 className="mt-5 font-display text-4xl leading-[0.98] text-[color:var(--color-ink)] sm:text-[3.4rem] [text-wrap:balance]">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-[color:var(--color-ink-soft)] sm:text-[1.05rem]">
          {intro}
        </p>
      ) : null}
    </div>
  );
}

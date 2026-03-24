import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import type { HeroContent } from "@/types/content";

type HeroSectionProps = {
  hero: HeroContent;
  brandName: string;
  devicesKicker: string;
  filters: string[];
};

export function HeroSection({
  hero,
  brandName,
  devicesKicker,
  filters,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pb-18 pt-12 sm:pb-24 sm:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(18,146,163,0.18),transparent_46%),radial-gradient(circle_at_82%_12%,rgba(15,29,47,0.12),transparent_28%)]" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)] lg:items-center">
          <div className="max-w-2xl">
            <p className="medical-kicker">{hero.eyebrow}</p>
            <h1 className="mt-6 font-display text-[3.05rem] leading-[0.94] text-[color:var(--color-ink)] sm:text-[4.2rem] lg:text-[5.1rem] [text-wrap:balance]">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-[color:var(--color-ink-soft)] sm:text-[1.08rem]">
              {hero.subheadline}
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent-strong)]">
              {hero.audience_line}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {hero.proof_chips.map((chip) => (
                <Chip key={chip}>{chip}</Chip>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#contact" className={buttonClassName()}>
                {hero.primary_cta}
              </a>
              <a
                href="#devices"
                className={buttonClassName({ variant: "secondary" })}
              >
                {hero.secondary_cta}
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="absolute left-10 top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(18,146,163,0.18),transparent_70%)] blur-3xl" />
            <Card className="relative overflow-hidden rounded-[2.2rem] p-5 sm:p-6">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(232,239,245,0.76))]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="medical-kicker">{devicesKicker}</span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
                    {brandName}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
                  <div className="relative min-h-[20rem] rounded-[1.7rem] border border-white/70 bg-[linear-gradient(180deg,#112136,#0d1828_68%,#17273c)] p-5 shadow-[var(--shadow-lift)]">
                    <div className="absolute inset-x-5 top-5 h-px bg-[linear-gradient(90deg,transparent,rgba(18,146,163,0.9),transparent)]" />
                    <div className="absolute bottom-5 left-1/2 h-[74%] w-[62%] -translate-x-1/2 rounded-[1.65rem] border border-white/15 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.28),transparent_26%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />
                    <div className="absolute bottom-10 left-[18%] h-[48%] w-12 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.04))]" />
                    <div className="absolute bottom-16 right-[16%] h-[34%] w-10 rounded-full border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03))]" />
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[1.45rem] border border-[color:rgba(15,29,47,0.08)] bg-white/86 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
                        Treatment Goals
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {filters.map((filter) => (
                          <Chip
                            key={filter}
                            className="border-transparent bg-[color:var(--color-surface-muted)]"
                          >
                            {filter}
                          </Chip>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.45rem] border border-[color:rgba(15,29,47,0.08)] bg-[linear-gradient(180deg,rgba(18,146,163,0.09),rgba(255,255,255,0.75))] p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent-strong)]">
                        Product-Led Navigation
                      </p>
                      <div className="mt-4 space-y-3">
                        {hero.proof_chips.map((item) => (
                          <div
                            key={item}
                            className="rounded-[1rem] border border-white/80 bg-white/78 px-4 py-3 text-sm leading-6 text-[color:var(--color-ink)]"
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

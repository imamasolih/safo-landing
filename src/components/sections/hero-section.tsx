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
    <section className="relative overflow-hidden pb-18 pt-10 sm:pb-24 sm:pt-14">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(circle_at_top_left,rgba(20,127,146,0.12),transparent_40%),radial-gradient(circle_at_84%_12%,rgba(15,29,47,0.09),transparent_26%)]" />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center">
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
            <div className="absolute inset-x-10 top-8 h-36 rounded-full bg-[radial-gradient(circle,rgba(20,127,146,0.14),transparent_70%)] blur-3xl" />
            <Card className="relative overflow-hidden rounded-[2.3rem] border-[color:rgba(15,29,47,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(239,244,249,0.88))] p-5 sm:p-6">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.8),transparent_48%)]" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="medical-kicker">{devicesKicker}</span>
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
                    {brandName}
                  </span>
                </div>

                <div className="mt-6 rounded-[1.95rem] border border-white/80 bg-[linear-gradient(180deg,#0f1d2f,#13243a_72%,#1b2d43)] p-5 shadow-[var(--shadow-lift)] sm:p-6">
                  <div className="relative min-h-[22rem] overflow-hidden rounded-[1.65rem] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
                    <div className="absolute inset-x-6 top-6 flex items-center justify-between">
                      <span
                        aria-hidden="true"
                        className="h-px w-20 bg-[linear-gradient(90deg,rgba(20,127,146,0),rgba(20,127,146,0.9),rgba(20,127,146,0))]"
                      />
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full bg-[color:var(--color-accent)]"
                      />
                    </div>

                    <div className="absolute left-1/2 top-8 h-[58%] w-[46%] -translate-x-1/2 rounded-[1.8rem] border border-white/12 bg-[radial-gradient(circle_at_50%_14%,rgba(255,255,255,0.28),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03))] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_24px_60px_rgba(7,14,24,0.26)]" />
                    <div className="absolute bottom-10 left-[15%] h-[42%] w-[18%] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03))] shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]" />
                    <div className="absolute bottom-12 right-[14%] h-[34%] w-[14%] rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.03))] shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]" />

                    <div className="absolute inset-x-5 bottom-5 grid gap-2 sm:grid-cols-2">
                      {filters.map((filter) => (
                        <Chip
                          key={filter}
                          className="justify-center border-white/8 bg-white/10 px-3 text-center text-white/90 hover:border-white/18 hover:bg-white/14 hover:text-white"
                        >
                          {filter}
                        </Chip>
                      ))}
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

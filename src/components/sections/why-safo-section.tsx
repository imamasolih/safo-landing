import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { WhySafoContent } from "@/types/content";

type WhySafoSectionProps = {
  whySafo: WhySafoContent;
};

export function WhySafoSection({ whySafo }: WhySafoSectionProps) {
  return (
    <section id="why-safo" className="scroll-mt-28 pb-24">
      <Container>
        <SectionHeading
          kicker={whySafo.kicker}
          title={whySafo.title}
          intro={whySafo.intro}
        />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {whySafo.pillars.map((pillar, index) => (
            <li key={pillar.title}>
              <Card className="h-full rounded-[1.8rem] border-[color:rgba(15,29,47,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(239,244,249,0.88))] p-6">
                <div className="flex items-center justify-between gap-4">
                  <span
                    aria-hidden="true"
                    className="h-px w-14 bg-[linear-gradient(90deg,rgba(20,127,146,0.9),rgba(20,127,146,0))]"
                  />
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)]">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.35rem] font-semibold leading-snug text-[color:var(--color-ink)]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--color-ink-soft)]">
                  {pillar.body}
                </p>
              </Card>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

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
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {whySafo.pillars.map((pillar) => (
            <Card
              key={pillar.title}
              className="rounded-[1.7rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(232,239,245,0.84))] p-6"
            >
              <div className="h-12 w-12 rounded-2xl bg-[linear-gradient(180deg,rgba(18,146,163,0.16),rgba(18,146,163,0.04))]" />
              <h3 className="mt-6 text-xl font-semibold text-[color:var(--color-ink)]">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-[color:var(--color-ink-soft)]">
                {pillar.body}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

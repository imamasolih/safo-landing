import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { isPlaceholder } from "@/lib/utils";
import type { ProofContent } from "@/types/content";

type ProofSectionProps = {
  proof: ProofContent;
};

export function ProofSection({ proof }: ProofSectionProps) {
  const cards = proof.cards.filter(
    (card) => !isPlaceholder(card.title) && !isPlaceholder(card.body),
  );

  return (
    <section id="proof" className="scroll-mt-28 pb-24">
      <Container>
        <SectionHeading
          kicker={proof.kicker}
          title={proof.title}
          intro={proof.intro}
        />

        {cards.length > 0 ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {cards.map((card) => (
              <Card key={card.title} className="rounded-[1.7rem] p-6">
                <h3 className="text-lg font-semibold text-[color:var(--color-ink)]">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[color:var(--color-ink-soft)]">
                  {card.body}
                </p>
              </Card>
            ))}
          </div>
        ) : null}

        <Card className="mt-10 rounded-[2rem] border-[color:rgba(15,29,47,0.08)] bg-[linear-gradient(120deg,rgba(255,255,255,0.94),rgba(232,239,245,0.82))] p-7 sm:p-9">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h3 className="font-display text-3xl leading-tight text-[color:var(--color-ink)] sm:text-[2.7rem]">
                {proof.callout_title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--color-ink-soft)]">
                {proof.callout_body}
              </p>
            </div>

            <a href="#contact" className={buttonClassName()}>
              {proof.callout_cta}
            </a>
          </div>
        </Card>
      </Container>
    </section>
  );
}

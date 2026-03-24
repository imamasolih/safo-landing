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
          intro={cards.length > 0 ? proof.intro : undefined}
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

        <Card className="mt-8 rounded-[2rem] border-[color:rgba(15,29,47,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(239,244,249,0.92))] p-7 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold leading-tight text-[color:var(--color-ink)] sm:text-[2rem]">
                {proof.callout_title}
              </h3>
              <p className="mt-4 text-base leading-8 text-[color:var(--color-ink-soft)]">
                {proof.callout_body}
              </p>
            </div>

            <a
              href="#contact"
              className={buttonClassName({ className: "w-full sm:w-auto" })}
            >
              {proof.callout_cta}
            </a>
          </div>
        </Card>
      </Container>
    </section>
  );
}

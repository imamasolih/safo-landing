import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import type { TrustStripContent } from "@/types/content";

type TrustStripSectionProps = {
  trustStrip: TrustStripContent;
};

export function TrustStripSection({ trustStrip }: TrustStripSectionProps) {
  return (
    <section className="pb-18">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {trustStrip.items.map((item) => (
            <Card
              key={item.title}
              className="rounded-[1.5rem] bg-white/78 px-5 py-5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-strong)]">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
                {item.body}
              </p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

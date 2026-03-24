import { Container } from "@/components/ui/container";
import type { TrustStripContent } from "@/types/content";

type TrustStripSectionProps = {
  trustStrip: TrustStripContent;
};

export function TrustStripSection({ trustStrip }: TrustStripSectionProps) {
  return (
    <section className="pb-18">
      <Container>
        <div className="rounded-[2rem] border border-[color:rgba(15,29,47,0.08)] bg-white/70 p-2 shadow-[0_18px_48px_rgba(15,29,47,0.05)]">
          <ul className="grid gap-px overflow-hidden rounded-[1.5rem] bg-[color:rgba(15,29,47,0.08)] sm:grid-cols-2 xl:grid-cols-4">
          {trustStrip.items.map((item) => (
            <li
              key={item.title}
              className="bg-[rgba(255,255,255,0.94)] px-5 py-5"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-strong)]">
                {item.title}
              </p>
              <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
                {item.body}
              </p>
            </li>
          ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

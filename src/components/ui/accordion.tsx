import { Card } from "@/components/ui/card";
import type { FaqItem } from "@/types/content";

type AccordionProps = {
  items: FaqItem[];
};

export function Accordion({ items }: AccordionProps) {
  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <Card
          key={item.question}
          className="overflow-hidden rounded-[1.4rem] bg-white/86"
        >
          <details className="group" open={index === 0}>
            <summary className="list-none px-5 py-5 sm:px-6">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-left text-lg font-semibold text-[color:var(--color-ink)]">
                  {item.question}
                </h3>
                <span className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border)] text-[color:var(--color-accent-strong)]">
                  +
                </span>
              </div>
            </summary>
            <div className="border-t border-[color:var(--color-border)] px-5 py-5 text-[0.98rem] leading-7 text-[color:var(--color-ink-soft)] sm:px-6">
              {item.answer}
            </div>
          </details>
        </Card>
      ))}
    </div>
  );
}

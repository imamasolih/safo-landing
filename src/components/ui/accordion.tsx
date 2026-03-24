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
          className="overflow-hidden rounded-[1.5rem] border-[color:rgba(15,29,47,0.08)] bg-white/88"
        >
          <details className="group" open={index === 0}>
            <summary className="list-none px-5 py-5 transition-[background-color] duration-200 hover:bg-white/94 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[color:rgba(20,127,146,0.28)] sm:px-6">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-left text-lg font-semibold leading-[1.3] text-[color:var(--color-ink)]">
                  {item.question}
                </h3>
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white text-[color:var(--color-accent-strong)]"
                >
                  <span className="relative h-3 w-3">
                    <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-opacity duration-200 group-open:opacity-0" />
                  </span>
                </span>
              </div>
            </summary>
            <div className="border-t border-[color:var(--color-border)] px-5 pb-5 pt-4 text-[0.98rem] leading-7 text-[color:var(--color-ink-soft)] sm:px-6">
              {item.answer}
            </div>
          </details>
        </Card>
      ))}
    </div>
  );
}

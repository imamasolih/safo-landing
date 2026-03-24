import { InquiryForm } from "@/components/forms/inquiry-form";
import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { ContactContent, FaqContent } from "@/types/content";

type FaqContactSectionProps = {
  faq: FaqContent;
  contact: ContactContent;
  deviceNames: string[];
};

export function FaqContactSection({
  faq,
  contact,
  deviceNames,
}: FaqContactSectionProps) {
  return (
    <section id="faq" className="scroll-mt-28 pb-16">
      <Container>
        <div className="grid gap-10 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div>
            <SectionHeading kicker={faq.kicker} title={faq.title} />
            <div className="mt-8">
              <Accordion items={faq.items} />
            </div>
          </div>

          <div id="contact" className="scroll-mt-28 space-y-5">
            <InquiryForm contact={contact} deviceNames={deviceNames} />

            <Card className="rounded-[1.8rem] p-6 sm:p-7">
              <h3 className="text-lg font-semibold uppercase tracking-[0.12em] text-[color:var(--color-accent-strong)]">
                {contact.helper.title}
              </h3>
              <ol className="mt-5 space-y-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">
                {contact.helper.steps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-white/85 text-xs font-semibold text-[color:var(--color-ink)]">
                      0{index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

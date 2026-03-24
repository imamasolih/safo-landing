import { InquiryForm } from "@/components/forms/inquiry-form";
import { Accordion } from "@/components/ui/accordion";
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
          </div>
        </div>
      </Container>
    </section>
  );
}

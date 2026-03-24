import { Container } from "@/components/ui/container";
import { isPlaceholder } from "@/lib/utils";
import type { FooterContent } from "@/types/content";

type SiteFooterProps = {
  brandName: string;
  footer: FooterContent;
};

export function SiteFooter({ brandName, footer }: SiteFooterProps) {
  const showEmail = !isPlaceholder(footer.email);
  const showAddress = !isPlaceholder(footer.address);

  return (
    <footer className="pb-24 pt-12 lg:pb-14">
      <Container>
        <div className="grid gap-8 border-t border-[color:var(--color-border)] pt-8 sm:grid-cols-2 xl:grid-cols-[1.05fr_0.7fr_0.45fr]">
          <div>
            <p className="font-display text-3xl text-[color:var(--color-ink)]">
              {brandName}
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-[color:var(--color-ink-soft)]">
              {footer.descriptor}
            </p>
          </div>

          <div className="space-y-2 text-sm leading-7 text-[color:var(--color-ink-soft)]">
            {showEmail ? <p>{footer.email}</p> : null}
            {showAddress ? <p>{footer.address}</p> : null}
          </div>

          <div className="space-y-2 text-sm leading-7 text-[color:var(--color-ink-soft)]">
            <p>{footer.privacy_label}</p>
            <p>{footer.note}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

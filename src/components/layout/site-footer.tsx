import { Container } from "@/components/ui/container";
import { isPlaceholder } from "@/lib/utils";
import type { FooterContent } from "@/types/content";

type SiteFooterProps = {
  brandName: string;
  footer: FooterContent;
};

export function SiteFooter({ brandName, footer }: SiteFooterProps) {
  const showByline = !isPlaceholder(footer.byline);
  const showPhone = !isPlaceholder(footer.phone);
  const showEmail = !isPlaceholder(footer.email);
  const showAddress = !isPlaceholder(footer.address);
  const addressLines = showAddress
    ? footer.address.split("\n").filter((line) => line.trim().length > 0)
    : [];

  return (
    <footer className="pb-20 pt-10 lg:pb-12">
      <Container>
        <div className="border-t border-[color:rgba(15,29,47,0.08)] pt-6">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10">
            <div className="max-w-xl">
              {showByline ? (
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-strong)]">
                  {footer.byline}
                </p>
              ) : null}
              <p className="mt-2 font-display text-[2.7rem] leading-none text-[color:var(--color-ink)] sm:text-[3rem]">
                {brandName}
              </p>
              <p className="mt-3 max-w-[34rem] text-base leading-7 text-[color:var(--color-ink-soft)]">
                {footer.descriptor}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
              <div className="space-y-5">
                {showPhone ? (
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-accent-strong)]">
                      Telephone
                    </p>
                    <a
                      href={`tel:${footer.phone.replace(/\s+/g, "")}`}
                      className="mt-0.5 block text-[1.05rem] leading-7 text-[color:var(--color-ink)] transition-colors duration-200 hover:text-[color:var(--color-accent-strong)]"
                    >
                      {footer.phone}
                    </a>
                  </div>
                ) : null}

                {showEmail ? (
                  <div>
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-accent-strong)]">
                      Email
                    </p>
                    <a
                      href={`mailto:${footer.email}`}
                      className="mt-0.5 block break-all text-[1.05rem] leading-7 text-[color:var(--color-ink)] transition-colors duration-200 hover:text-[color:var(--color-accent-strong)]"
                    >
                      {footer.email}
                    </a>
                  </div>
                ) : null}
              </div>

              {addressLines.length > 0 ? (
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-accent-strong)]">
                    Address
                  </p>
                  <address className="mt-0.5 space-y-0.5 not-italic text-[1.05rem] leading-7 text-[color:var(--color-ink)]">
                    {addressLines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </address>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 border-t border-[color:rgba(15,29,47,0.08)] pt-4">
            <p className="text-xs uppercase tracking-[0.08em] text-[color:var(--color-ink-soft)]">
              {footer.copyright}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

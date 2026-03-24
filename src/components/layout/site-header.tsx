import { buttonClassName } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { NavItem } from "@/types/content";

type SiteHeaderProps = {
  brandName: string;
  descriptor: string;
  nav: NavItem[];
  cta: string;
};

export function SiteHeader({
  brandName,
  descriptor,
  nav,
  cta,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:rgba(15,29,47,0.06)] bg-[rgba(242,246,250,0.84)] backdrop-blur-xl">
      <Container>
        <div className="flex min-h-20 items-center justify-between gap-4">
          <a href="#top" className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="font-display text-[2rem] leading-none text-[color:var(--color-ink)]">
                {brandName}
              </span>
              <span className="hidden h-2 w-2 rounded-full bg-[color:var(--color-accent)] sm:block" />
            </div>
            <p className="mt-1 hidden text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)] xl:block">
              {descriptor}
            </p>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-7 text-sm text-[color:var(--color-ink-soft)] lg:flex"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[color:var(--color-ink)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className={buttonClassName()}>
            {cta}
          </a>
        </div>
      </Container>
    </header>
  );
}

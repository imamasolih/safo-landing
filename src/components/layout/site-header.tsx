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
    <header className="sticky top-0 z-50 border-b border-[color:rgba(15,29,47,0.08)] bg-[rgba(248,251,254,0.88)] backdrop-blur-2xl">
      <Container>
        <div className="flex min-h-[4.5rem] items-center justify-between gap-4">
          <a
            href="#top"
            className="min-w-0 rounded-[1.4rem] px-1 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:rgba(20,127,146,0.28)]"
          >
            <div className="flex items-center gap-3">
              <span className="font-display text-[1.95rem] leading-none text-[color:var(--color-ink)]">
                {brandName}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-2 w-2 rounded-full bg-[color:var(--color-accent)] sm:block"
              />
            </div>
            <p className="mt-1 hidden text-xs uppercase tracking-[0.18em] text-[color:var(--color-ink-soft)] 2xl:block">
              {descriptor}
            </p>
          </a>

          <nav
            aria-label="Primary"
            className="hidden items-center gap-2 text-sm text-[color:var(--color-ink-soft)] lg:flex"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 transition-[background-color,color] duration-200 hover:bg-white/76 hover:text-[color:var(--color-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:rgba(20,127,146,0.28)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className={buttonClassName({ size: "sm" })}>
            {cta}
          </a>
        </div>
      </Container>
    </header>
  );
}

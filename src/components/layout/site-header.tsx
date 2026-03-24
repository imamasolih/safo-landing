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
    <header className="sticky top-0 z-50 border-b border-[color:rgba(15,29,47,0.08)] bg-[rgba(248,251,254,0.92)] backdrop-blur-2xl">
      <Container>
        <div className="flex min-h-[4.75rem] items-center justify-between gap-4 py-2 lg:grid lg:grid-cols-[minmax(0,18rem)_1fr_auto] lg:gap-6">
          <a
            href="#top"
            className="min-w-0 max-w-[18rem] rounded-[1.4rem] px-1 py-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:rgba(20,127,146,0.28)]"
          >
            <div className="flex items-center gap-2.5">
              <span className="font-display text-[1.75rem] leading-none text-[color:var(--color-ink)] sm:text-[1.9rem]">
                {brandName}
              </span>
              <span
                aria-hidden="true"
                className="hidden h-2 w-2 rounded-full bg-[color:var(--color-accent)] sm:block"
              />
            </div>
            <p className="mt-1 hidden max-w-[17rem] text-[0.64rem] uppercase leading-[1.45] tracking-[0.16em] text-[color:rgba(88,103,121,0.94)] xl:block">
              {descriptor}
            </p>
          </a>

          <nav
            aria-label="Primary"
            className="hidden min-w-0 items-center justify-center gap-1 rounded-full border border-[color:rgba(15,29,47,0.07)] bg-white/74 px-2 py-1 text-[0.95rem] text-[color:var(--color-ink-soft)] shadow-[0_10px_28px_rgba(15,29,47,0.04)] lg:flex"
          >
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2.5 transition-[background-color,color,box-shadow] duration-200 hover:bg-white hover:text-[color:var(--color-ink)] hover:shadow-[0_10px_24px_rgba(15,29,47,0.06)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:rgba(20,127,146,0.28)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className={buttonClassName({
              size: "sm",
              className:
                "justify-self-end px-5 !text-white shadow-[0_18px_38px_rgba(15,29,47,0.16)]",
            })}
          >
            {cta}
          </a>
        </div>
      </Container>
    </header>
  );
}

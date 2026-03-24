"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { chipClassName } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { DevicesContent } from "@/types/content";

type PortfolioSectionProps = {
  devices: DevicesContent;
};

export function PortfolioSection({ devices }: PortfolioSectionProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedFilter = searchParams.get("goal");
  const activeFilter = devices.filters.includes(requestedFilter ?? "")
    ? requestedFilter
    : null;
  const visibleCards = activeFilter
    ? devices.cards.filter((card) => card.filter === activeFilter)
    : devices.cards;

  function buildDeviceHref(deviceName: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("selected_device", deviceName);
    return `/?${params.toString()}#contact`;
  }

  function handleFilterToggle(filter: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (activeFilter === filter) {
      params.delete("goal");
    } else {
      params.set("goal", filter);
    }

    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, {
      scroll: false,
    });
  }

  return (
    <section id="devices" className="scroll-mt-28 pb-24">
      <Container>
        <SectionHeading
          kicker={devices.kicker}
          title={devices.title}
          intro={devices.intro}
        />

        <nav aria-label="Treatment Goals" className="mt-8">
          <div className="flex flex-wrap gap-3">
            {devices.filters.map((filter) => {
              const isActive = filter === activeFilter;

              return (
                <button
                  key={filter}
                  type="button"
                  className={chipClassName(isActive, "cursor-pointer")}
                  aria-pressed={isActive}
                  onClick={() => handleFilterToggle(filter)}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </nav>

        <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {visibleCards.map((card) => (
            <Card
              key={card.id}
              className="flex h-full flex-col rounded-[1.8rem] border-[color:rgba(15,29,47,0.08)] bg-white/92 p-6 sm:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="rounded-full border border-[color:rgba(20,127,146,0.16)] bg-[color:var(--color-accent-soft)] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-strong)]">
                  {card.filter}
                </span>
                <p className="max-w-[13rem] text-right text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-soft)]">
                  {card.type}
                </p>
              </div>

              <h3 className="mt-6 font-display text-[2rem] leading-tight text-[color:var(--color-ink)]">
                {card.name}
              </h3>

              <p className="mt-5 text-base leading-8 text-[color:var(--color-ink-soft)]">
                {card.summary}
              </p>

              <ul className="mt-6 space-y-3 text-sm leading-7 text-[color:var(--color-ink)]">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-3 h-px w-5 shrink-0 bg-[linear-gradient(90deg,rgba(20,127,146,0.78),rgba(20,127,146,0.18))]"
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <a
                href={buildDeviceHref(card.name)}
                className={buttonClassName({
                  variant: "secondary",
                  className: "mt-8 w-full",
                })}
              >
                {card.cta}
              </a>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

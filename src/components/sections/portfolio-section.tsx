"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { buttonClassName } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { chipClassName } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
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

        <div className="mt-8 flex flex-wrap gap-3">
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

        <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {visibleCards.map((card, index) => (
            <Card
              key={card.id}
              className={cn(
                "flex h-full flex-col rounded-[1.8rem] p-6",
                index % 3 === 0 && "xl:translate-y-4",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent-strong)]">
                    {card.filter}
                  </p>
                  <h3 className="mt-4 font-display text-[2rem] leading-tight text-[color:var(--color-ink)]">
                    {card.name}
                  </h3>
                </div>
                <span className="rounded-full border border-[color:var(--color-border)] bg-white/74 px-3 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-ink-soft)]">
                  {card.type}
                </span>
              </div>

              <p className="mt-5 text-base leading-8 text-[color:var(--color-ink-soft)]">
                {card.summary}
              </p>

              <ul className="mt-6 space-y-3 text-sm leading-7 text-[color:var(--color-ink)]">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
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

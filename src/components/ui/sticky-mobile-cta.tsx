"use client";

import { useEffect, useState } from "react";
import { buttonClassName } from "@/components/ui/button";

type StickyMobileCtaProps = {
  label: string;
};

export function StickyMobileCta({ label }: StickyMobileCtaProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("contact");

    if (!target) {
      return;
    }

    const isTargetVisible = () => {
      const rect = target.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    };

    const syncVisibility = () => {
      setIsHidden(isTargetVisible());
    };

    syncVisibility();

    const supportsIntersectionObserver =
      typeof IntersectionObserver !== "undefined";

    if (supportsIntersectionObserver) {
      const observer = new IntersectionObserver(
        (entries) => {
          setIsHidden(Boolean(entries[0]?.isIntersecting));
        },
        {
          threshold: 0.15,
          rootMargin: "0px 0px -18% 0px",
        },
      );

      observer.observe(target);
      window.addEventListener("hashchange", syncVisibility);

      return () => {
        observer.disconnect();
        window.removeEventListener("hashchange", syncVisibility);
      };
    }

    window.addEventListener("scroll", syncVisibility, { passive: true });
    window.addEventListener("resize", syncVisibility);
    window.addEventListener("hashchange", syncVisibility);

    return () => {
      window.removeEventListener("scroll", syncVisibility);
      window.removeEventListener("resize", syncVisibility);
      window.removeEventListener("hashchange", syncVisibility);
    };
  }, []);

  return (
    <div
      id="mobile-sticky-cta"
      hidden={isHidden}
      className="mobile-sticky-cta pointer-events-none fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 px-4 lg:hidden"
    >
      <div className="mx-auto max-w-md rounded-full border border-white/65 bg-[rgba(15,29,47,0.9)] p-2 shadow-[var(--shadow-lift)] backdrop-blur">
        <a
          id="mobile-sticky-cta-trigger"
          href="#contact"
          className={buttonClassName({
            className:
              "pointer-events-auto w-full bg-[color:var(--color-accent)] text-white hover:bg-[color:var(--color-accent-strong)]",
          })}
        >
          {label}
        </a>
      </div>
    </div>
  );
}

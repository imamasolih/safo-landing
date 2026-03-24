import { buttonClassName } from "@/components/ui/button";

type StickyMobileCtaProps = {
  label: string;
};

const stickyCtaScript = `
(() => {
  const container = document.getElementById("mobile-sticky-cta");
  const target = document.getElementById("contact");

  if (!container || !target) {
    return;
  }

  const isTargetVisible = () => {
    const rect = target.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  let formIsVisible = isTargetVisible();

  const syncVisibility = () => {
    container.hidden = formIsVisible;
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        formIsVisible = Boolean(entries[0]?.isIntersecting);
        syncVisibility();
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -18% 0px",
      },
    );

    observer.observe(target);
  } else {
    const handleScroll = () => {
      formIsVisible = isTargetVisible();
      syncVisibility();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
  }

  syncVisibility();
  window.addEventListener("hashchange", () => {
    formIsVisible = isTargetVisible();
    syncVisibility();
  });
})();
`;

export function StickyMobileCta({ label }: StickyMobileCtaProps) {
  return (
    <>
      <div
        id="mobile-sticky-cta"
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

      <script
        dangerouslySetInnerHTML={{
          __html: stickyCtaScript,
        }}
      />
    </>
  );
}

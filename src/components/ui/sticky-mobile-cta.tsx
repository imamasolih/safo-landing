import { buttonClassName } from "@/components/ui/button";

type StickyMobileCtaProps = {
  label: string;
};

const stickyCtaScript = `
(() => {
  const container = document.getElementById("mobile-sticky-cta");
  const trigger = document.getElementById("mobile-sticky-cta-trigger");
  const target = document.getElementById("contact");

  if (!container || !trigger || !target) {
    return;
  }

  const syncVisibility = () => {
    const rect = target.getBoundingClientRect();
    const formIsVisible = rect.top < window.innerHeight && rect.bottom > 0;
    container.hidden = formIsVisible || window.location.hash === "#contact";
  };

  trigger.addEventListener("click", () => {
    container.hidden = true;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(
      null,
      "",
      \`\${window.location.pathname}\${window.location.search}#contact\`,
    );
  });

  syncVisibility();
  window.addEventListener("scroll", syncVisibility, { passive: true });
  window.addEventListener("resize", syncVisibility);
  window.addEventListener("hashchange", syncVisibility);
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
          <button
            id="mobile-sticky-cta-trigger"
            type="button"
            className={buttonClassName({
              className:
                "pointer-events-auto w-full bg-[color:var(--color-accent)] text-white hover:bg-[color:var(--color-accent-strong)]",
            })}
          >
            {label}
          </button>
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

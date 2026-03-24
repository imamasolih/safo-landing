import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { FaqContactSection } from "@/components/sections/faq-contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { ProofSection } from "@/components/sections/proof-section";
import { TrustStripSection } from "@/components/sections/trust-strip-section";
import { WhySafoSection } from "@/components/sections/why-safo-section";
import { StickyMobileCta } from "@/components/ui/sticky-mobile-cta";
import { getSiteContent } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import { buildFaqSchema } from "@/lib/schema";
import { firstSearchParam } from "@/lib/utils";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getSiteContent();
  return buildMetadata(content);
}

export default async function Home({ searchParams }: PageProps) {
  const content = await getSiteContent();
  const params = await searchParams;
  const rawSelectedDevice = firstSearchParam(params.selected_device);
  const selectedDevice = content.devices.cards.some(
    (card) => card.name === rawSelectedDevice,
  )
    ? rawSelectedDevice
    : "";
  const trackingFields = {
    utm_source: firstSearchParam(params.utm_source),
    utm_medium: firstSearchParam(params.utm_medium),
    utm_campaign: firstSearchParam(params.utm_campaign),
    utm_content: firstSearchParam(params.utm_content),
  };
  const faqSchema = buildFaqSchema(content);

  return (
    <>
      <div id="top" />
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-full bg-[color:var(--color-graphite)] px-4 py-2 text-sm font-semibold text-white focus:not-sr-only"
      >
        Skip to main content
      </a>
      <SiteHeader
        brandName={content.brand.name}
        descriptor={content.brand.descriptor}
        nav={content.header.nav}
        cta={content.header.primary_cta}
      />

      <main id="main-content" className="overflow-x-hidden">
        <HeroSection
          hero={content.hero}
          brandName={content.brand.name}
          devicesKicker={content.devices.kicker}
          filters={content.devices.filters}
        />
        <TrustStripSection trustStrip={content.trust_strip} />
        <PortfolioSection devices={content.devices} />
        <WhySafoSection whySafo={content.why_safo} />
        <ProofSection proof={content.proof} />
        <FaqContactSection
          faq={content.faq}
          contact={content.contact}
          selectedDevice={selectedDevice}
          trackingFields={trackingFields}
        />
      </main>

      <SiteFooter brandName={content.brand.name} footer={content.footer} />
      <StickyMobileCta label={content.header.primary_cta} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

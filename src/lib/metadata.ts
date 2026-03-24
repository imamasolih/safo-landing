import type { Metadata } from "next";
import type { SiteContent } from "@/types/content";

export function buildMetadata(content: SiteContent): Metadata {
  return {
    title: content.brand.name,
    description: content.brand.descriptor,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
    openGraph: {
      title: content.brand.name,
      description: content.brand.descriptor,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.brand.name,
      description: content.brand.descriptor,
    },
    alternates: {
      canonical: "/",
    },
  };
}

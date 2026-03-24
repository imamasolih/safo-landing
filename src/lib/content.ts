import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { load } from "js-yaml";
import type { SiteContent } from "@/types/content";

function assertSiteContent(value: unknown): asserts value is SiteContent {
  if (!value || typeof value !== "object") {
    throw new Error("content/content.yaml did not produce an object.");
  }

  const requiredSections = [
    "brand",
    "header",
    "hero",
    "trust_strip",
    "devices",
    "why_safo",
    "proof",
    "faq",
    "contact",
    "footer",
  ] as const;

  for (const section of requiredSections) {
    if (!(section in value)) {
      throw new Error(`content/content.yaml is missing the "${section}" section.`);
    }
  }
}

export const getSiteContent = cache(async () => {
  const contentPath = path.join(process.cwd(), "content", "content.yaml");
  const raw = await readFile(contentPath, "utf8");
  const parsed = load(raw);

  assertSiteContent(parsed);

  return parsed;
});

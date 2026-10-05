// Single typed configuration for identity, production origin, and external links.
// Source: public site configuration "External links" + deployment metadata configuration.
// Missing values are explicit placeholder states — never guessed or rendered as anchors.

import { externalLink } from "@/lib/link-state";

export const site = {
  name: "Sahil Swain",
  positioning: "Senior Backend Engineer + AI Automation Builder",
  email: "swainsahil079@gmail.com", // Source: résumé (public site configuration)
  linkedin: externalLink("https://www.linkedin.com/in/sahil-swain-687a73285/"),
  github: externalLink("https://github.com/Sahil049SW"),
  domain: "sahil-portfolio-14d.pages.dev" as string | null, // deployment metadata configuration — current production origin; custom domain still open
} as const;

export function siteOrigin(): string | undefined {
  if (!site.domain) return undefined;

  const parsed = new URL(`https://${site.domain}`);
  if (!parsed.hostname) {
    throw new Error(`Invalid portfolio domain: ${site.domain}`);
  }
  return parsed.origin;
}

export function canonicalUrl(pathname: string): string | undefined {
  const origin = siteOrigin();
  return origin ? new URL(pathname, origin).toString() : undefined;
}

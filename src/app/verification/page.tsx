import type { Metadata } from "next";
import Link from "next/link";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ExternalLink } from "@/components/ExternalLink";
import { canonicalUrl, site } from "@/config/site";
import { professionalVerification, verificationLanguage } from "@/content/credentials";
import { technicalDepth } from "@/content/home";

const canonical = canonicalUrl("/verification");

export const metadata: Metadata = {
  title: "Professional Verification",
  description:
    "Professional experience supported by employment documentation — public summary for Sahil Swain.",
  ...(canonical ? { alternates: { canonical } } : {}),
};

/**
 * Professional verification summary.
 * Policy: public verification policy — public summary only.
 * No raw employment documents are published; a controlled proof viewer is
 * deliberately out of scope until the defined privacy review happens.
 */
export default function VerificationPage() {
  return (
    <article>
      <header className="border-b border-border bg-surface bg-grid">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {professionalVerification.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {verificationLanguage[0]} {verificationLanguage[1]}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="timeline-heading">
            <h2
              id="timeline-heading"
              className="text-xs font-medium uppercase tracking-[0.18em] text-accent"
            >
              Employment timeline
            </h2>
            <div className="mt-6">
              <ExperienceTimeline />
            </div>
            <p className="mt-6 max-w-md text-xs leading-relaxed text-fg-muted">
              Each role lists the documentation that supports it. Where a date
              is not established by the available documents, the entry states
              the evidence bound rather than a specific date.
            </p>
          </section>

          <div className="space-y-10">
            <section aria-labelledby="domain-heading">
              <h2
                id="domain-heading"
                className="text-xs font-medium uppercase tracking-[0.18em] text-accent"
              >
                Technology domain
              </h2>
              <ul className="mt-5 space-y-3">
                {technicalDepth.map((group) => (
                  <li key={group.group} className="border border-border bg-surface p-4">
                    <p className="text-xs font-medium text-fg">{group.group}</p>
                    <p className="mt-1 text-sm text-fg-muted">{group.items.join(" · ")}</p>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="profiles-heading">
              <h2
                id="profiles-heading"
                className="text-xs font-medium uppercase tracking-[0.18em] text-accent"
              >
                Public profiles
              </h2>
              <ul className="mt-5 space-y-2 text-sm">
                <li>
                  <ExternalLink target={site.linkedin} className="text-accent underline underline-offset-4">
                    LinkedIn
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink target={site.github} className="text-accent underline underline-offset-4">
                    GitHub
                  </ExternalLink>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-accent underline underline-offset-4"
                  >
                    {site.email}
                  </a>
                </li>
              </ul>
            </section>

            <section
              aria-labelledby="docs-heading"
              className="border border-border bg-surface p-6"
            >
              <h2
                id="docs-heading"
                className="text-xs font-medium uppercase tracking-[0.18em] text-accent"
              >
                About the documents
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-fg-muted">
                Supporting employment documentation exists and is available
                for verification in conversation. Raw documents are not published
                on this site — they contain personal and internal details that stay
                private.
              </p>
              <Link
                href="/#contact"
                className="mt-5 inline-block border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-fg"
              >
                Request verification details
              </Link>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}

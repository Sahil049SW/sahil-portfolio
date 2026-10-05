import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { ExternalLink } from "@/components/ExternalLink";
import { site } from "@/config/site";
import { about } from "@/content/home";
import { professionalVerification, verificationLanguage } from "@/content/credentials";

/**
 * Professional experience / verification — public summary only.
 * Policy: public verification policy.
 */
export function ExperienceSection() {
  return (
    <Section
      id="experience"
      eyebrow="Professional experience"
      title={professionalVerification.headline}
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <Reveal>
          <ExperienceTimeline />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/verification"
              className="border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-fg"
            >
              View professional verification
            </Link>
            <ExternalLink target={site.linkedin} className="text-sm text-accent underline underline-offset-4">
              LinkedIn
            </ExternalLink>
            <ExternalLink target={site.github} className="text-sm text-accent underline underline-offset-4">
              GitHub
            </ExternalLink>
          </div>
          <p className="mt-6 text-xs leading-relaxed text-fg-muted">
            {verificationLanguage[1]}
          </p>
        </Reveal>
        <Reveal>
          <div className="border border-border bg-surface p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold">{about.title}</h3>
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-4 text-sm leading-relaxed text-fg-muted">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

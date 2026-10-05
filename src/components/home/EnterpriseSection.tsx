import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { getProject } from "@/content/projects";
import { enterpriseCopy } from "@/content/home";

const project = getProject("enterprise-backend-engineering")!;

export function EnterpriseSection() {
  return (
    <Section
      id="case-study"
      eyebrow="Enterprise engineering · professional case study"
      title={enterpriseCopy.title}
      intro="Documented professional work, described at a public, non-confidential level."
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.showcase!.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 border border-border bg-surface px-3 py-2.5 text-sm text-fg-muted"
                >
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-l-2 border-border pl-4 text-xs leading-relaxed text-fg-muted">
              {enterpriseCopy.disclosure}
            </p>
            <Link
              href={enterpriseCopy.cta.href}
              className="mt-6 inline-block bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              {enterpriseCopy.cta.label}
            </Link>
          </div>
          <div className="border border-border bg-surface p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-fg-muted">
              Technology domain
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.techStack!.map((tech) => (
                <li key={tech} className="bg-surface-2 px-3 py-1.5 font-mono text-xs text-fg">
                  {tech}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-fg-muted">
              Also documented on the résumé
            </p>
            <ul className="mt-3 space-y-2 text-sm text-fg-muted">
              <li>Tidal Watch — logistics platform, APL Logistics</li>
              <li>Stox — investment &amp; portfolio platform, The Vanguard Group</li>
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

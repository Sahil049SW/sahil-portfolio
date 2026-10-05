import Link from "next/link";
import type { Project } from "@/lib/types";
import { projects } from "@/content/projects";
import { Diagram } from "@/components/diagrams";
import { ExternalLink } from "@/components/ExternalLink";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="text-xs font-medium uppercase tracking-[0.18em] text-accent">{title}</h2>
      <div className="mt-4 max-w-3xl text-base leading-relaxed text-fg-muted">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-2 h-1 w-1 shrink-0 bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function RelatedCaseStudies({ currentSlug }: { currentSlug: string }) {
  const currentIndex = projects.findIndex((project) => project.slug === currentSlug);
  if (currentIndex === -1) return null;

  const previous = projects[(currentIndex - 1 + projects.length) % projects.length];
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <nav aria-label="More case studies" className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
      <Link
        href={`/work/${previous.slug}`}
        className="border border-border bg-surface p-5 transition-colors hover:border-accent"
      >
        <span className="text-xs uppercase tracking-[0.18em] text-fg-muted">Previous case study</span>
        <span className="mt-2 block font-display text-lg font-semibold">{previous.title}</span>
      </Link>
      <Link
        href={`/work/${next.slug}`}
        className="border border-border bg-surface p-5 transition-colors hover:border-accent sm:text-right"
      >
        <span className="text-xs uppercase tracking-[0.18em] text-fg-muted">Next case study</span>
        <span className="mt-2 block font-display text-lg font-semibold">{next.title}</span>
      </Link>
    </nav>
  );
}

/**
 * Case-study template — implements the structure defined in
 * page architecture.
 */
export function CaseStudyLayout({
  project,
  demo,
}: {
  project: Project;
  demo?: React.ReactNode;
}) {
  const cs = project.caseStudy;
  return (
    <article>
      <header className="border-b border-border bg-surface bg-grid">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:py-20">
          <Link href="/#work" className="text-sm text-fg-muted transition-colors hover:text-fg">
            ← All work
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="border border-accent px-2.5 py-1 text-[11px] uppercase tracking-wide text-accent">
              {project.truthLabel}
            </span>
            <span className="text-xs uppercase tracking-wide text-fg-muted">{project.status}</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 text-sm uppercase tracking-wide text-fg-muted">{project.type}</p>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{project.summary}</p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 pb-20">
        <Block title="What problem existed?">
          <p>{cs.problem}</p>
        </Block>

        <Block title="Context / constraints">
          <BulletList items={cs.context} />
        </Block>

        <Block title="What was built">
          <BulletList items={cs.built} />
        </Block>

        <Block title="Architecture">
          <div className="space-y-4">
            <BulletList items={cs.architecture.description} />
            <div className="border border-border bg-surface p-4 sm:p-6">
              <Diagram name={cs.architecture.diagram} />
            </div>
          </div>
        </Block>

        <Block title="Key engineering decisions">
          <BulletList items={cs.decisions} />
        </Block>

        <Block title="Validation / tests">
          <BulletList items={cs.validation} />
        </Block>

        <Block title="What is deliberately not claimed">
          <BulletList items={cs.notClaimed} />
        </Block>

        {demo && (
          <Block title="Interactive demo — runs directly on this page">
            <div className="max-w-none">{demo}</div>
          </Block>
        )}

        {cs.links.length > 0 && (
          <Block title="Source">
            <ul className="space-y-2">
              {cs.links.map((link) => (
                <li key={link.label}>
                  {link.target.kind === "external" ? (
                    <ExternalLink target={link.target} className="text-accent underline underline-offset-4">
                      {link.label}
                    </ExternalLink>
                  ) : (
                    <span className="text-fg-muted">
                      <span className="text-fg">{link.label}</span>
                      {" — "}
                      {link.note ?? "not yet publicly available"}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </Block>
        )}

        <RelatedCaseStudies currentSlug={project.slug} />

        <div className="mt-12 border border-border bg-surface p-8 text-center">
          <p className="font-display text-xl font-semibold">
            Want this kind of system built for your workflow?
          </p>
          <Link
            href="/#contact"
            className="mt-5 inline-block bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            Start a project
          </Link>
        </div>
      </div>
    </article>
  );
}

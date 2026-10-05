import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ReviewWorkflowDemo } from "@/components/ReviewWorkflowDemo";
import { getProject } from "@/content/projects";
import { reviewWorkflowCopy } from "@/content/home";

const spreadsheet = getProject("spreadsheet-workflow-automation")!;

export function AutomationSection() {
  return (
    <Section
      id="automation"
      eyebrow="Business automation"
      title="Workflows that replace repetitive effort"
      intro="Prototype demos running on deterministic synthetic data — built to be inspected, not just described."
    >
      <div className="space-y-10">
        <Reveal>
          <div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <h3 className="font-display text-xl font-semibold">{reviewWorkflowCopy.title}</h3>
              <span className="border border-border px-2 py-0.5 text-[11px] uppercase tracking-wide text-fg-muted">
                {reviewWorkflowCopy.type}
              </span>
            </div>
            <ReviewWorkflowDemo />
          </div>
        </Reveal>

        <Reveal>
          <div className="border border-border bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-display text-xl font-semibold">{spreadsheet.title}</h3>
              <span className="border border-border px-2 py-0.5 text-[11px] uppercase tracking-wide text-fg-muted">
                {spreadsheet.truthLabel}
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
              {spreadsheet.summary}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {spreadsheet.showcase!.map((item) => (
                <li
                  key={item}
                  className="border border-border px-3 py-1.5 text-xs text-fg-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href={`/work/${spreadsheet.slug}`}
              className="mt-6 inline-block border border-accent px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-fg"
            >
              Open the data-workflow demo
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

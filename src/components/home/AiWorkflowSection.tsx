import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { aiWorkflow } from "@/content/home";

/**
 * AI-native engineering workflow.
 * Model names shown here must reflect the models actually used for this
 * build (verified claim set) — see src/content/home.ts.
 */
export function AiWorkflowSection() {
  return (
    <Section
      id="ai-workflow"
      eyebrow="Method"
      title={aiWorkflow.title}
      intro={aiWorkflow.body}
    >
      <Reveal>
        <div className="grid gap-8 lg:grid-cols-2">
          <ul className="grid content-start gap-2 sm:grid-cols-2">
            {aiWorkflow.uses.map((use) => (
              <li
                key={use}
                className="flex items-center gap-2 border border-border bg-surface px-3 py-2.5 text-sm text-fg-muted"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                {use}
              </li>
            ))}
          </ul>
          <div className="border border-border bg-surface p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-fg-muted">
              Verified work on this site
            </p>
            <ol className="mt-4 space-y-0">
              {aiWorkflow.pipeline.map((step, i) => (
                <li key={step} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-border font-mono text-[11px] text-fg-muted">
                    {i + 1}
                  </span>
                  <span className="py-2 text-sm">{step}</span>
                  {i < aiWorkflow.pipeline.length - 1 && (
                    <span aria-hidden="true" className="sr-only">
                      then
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[11px] leading-relaxed text-fg-muted">
              Completed stages only. Unverified model use, final polish, and
              production deployment are not claimed.
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

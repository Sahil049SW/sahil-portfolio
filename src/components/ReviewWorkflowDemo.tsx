"use client";

import { useState } from "react";
import {
  advanceAll,
  advanceCustomer,
  currentStepLabel,
  initialState,
  isComplete,
  stepLabels,
  syntheticCustomers,
  workflowSteps,
} from "@/lib/review-workflow";
import { DemoFrame } from "@/components/DemoFrame";
import { cx } from "@/lib/cx";

/**
 * Customer Follow-Up & Review Workflow demo.
 * Deterministic state machine over synthetic customers.
 * Policy: identical neutral review request for every customer — no gating.
 */
export function ReviewWorkflowDemo() {
  const [state, setState] = useState(initialState);

  return (
    <DemoFrame title="follow-up-workflow · demo">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <ul className="space-y-4">
            {syntheticCustomers.map((customer) => {
              const done = state.progress[customer.id] ?? 0;
              const complete = done >= workflowSteps.length;
              return (
                <li key={customer.id} className="border border-border p-4">
                  <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{customer.name}</p>
                      <p className="text-xs text-fg-muted">
                        {customer.service} · {currentStepLabel(state, customer.id)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setState((s) => advanceCustomer(s, customer.id))}
                      disabled={complete}
                      className="w-full shrink-0 border border-accent px-3 py-2 text-xs font-medium text-accent transition-opacity disabled:cursor-not-allowed disabled:opacity-30 sm:w-auto sm:justify-self-end"
                    >
                      {complete ? "Complete" : "Advance step"}
                    </button>
                  </div>
                  <ol className="mt-3 flex flex-wrap gap-1.5" aria-label={`Progress for ${customer.name}`}>
                    {workflowSteps.map((step, i) => (
                      <li
                        key={step}
                        title={stepLabels[step]}
                        className={cx(
                          "h-1.5 flex-1 min-w-8",
                          i < done ? "bg-ok" : i === done ? "bg-accent" : "bg-border",
                        )}
                      >
                        <span className="sr-only">
                          {stepLabels[step]} {i < done ? "(done)" : i === done ? "(next)" : "(pending)"}
                        </span>
                      </li>
                    ))}
                  </ol>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setState((s) => advanceAll(s))}
              disabled={isComplete(state)}
              className="bg-accent px-4 py-2 text-xs font-medium text-accent-fg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Advance all customers
            </button>
            <button
              type="button"
              onClick={() => setState(initialState())}
              className="border border-border px-4 py-2 text-xs text-fg-muted transition-colors hover:text-fg"
            >
              Reset
            </button>
          </div>
        </div>

        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
            Event log
          </p>
          <ol
            aria-live="polite"
            className="max-h-72 space-y-1.5 overflow-y-auto border border-border bg-surface-2 p-3 font-mono text-[11px] leading-relaxed"
          >
            {state.events.length === 0 && (
              <li className="text-fg-muted">No events yet — advance a step.</li>
            )}
            {state.events.map((event) => (
              <li key={event.seq} className="text-fg-muted">
                <span className="text-fg">#{String(event.seq).padStart(3, "0")}</span> {event.message}
              </li>
            ))}
          </ol>
          <p className="mt-3 text-[11px] leading-relaxed text-fg-muted">
            Policy: every customer receives the same neutral request. Review
            requests are never gated or suppressed based on sentiment.
          </p>
        </div>
      </div>
    </DemoFrame>
  );
}

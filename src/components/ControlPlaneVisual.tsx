"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cx } from "@/lib/cx";
import {
  advanceTo,
  applyDecision,
  finishExecution,
  initialState,
  phaseLabel,
  planSteps,
  resetState,
  startAtDecisionPoint,
  startCycle,
  STEP_DELAY_MS,
  type ControlPlaneState,
} from "@/lib/control-plane";

/**
 * Control-plane interface composition for the AI Agent Control Plane.
 * Deterministic lifecycle: proposed → verified → human checkpoint →
 * executed → audited. State transitions live in @/lib/control-plane and
 * are covered by deterministic tests. No timers run under
 * prefers-reduced-motion.
 */

export function ControlPlaneVisual() {
  const headingId = useId();
  const [state, setState] = useState<ControlPlaneState>(() => initialState());
  const { phase, stepIndex, audit } = state;
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function schedule(fn: () => void, delay: number) {
    timers.current.push(setTimeout(fn, delay));
  }

  function run() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setState(startCycle());

    if (reducedMotion()) {
      // Jump straight to the decision point — no animated sequencing.
      setState(startAtDecisionPoint());
      return;
    }

    for (let i = 1; i <= 4; i++) {
      schedule(() => setState((s) => advanceTo(s, i)), i * STEP_DELAY_MS);
    }
  }

  function decide(approved: boolean) {
    if (phase !== "awaiting_human") return;
    setState((s) => applyDecision(s, approved));
    if (!approved) return;
    const finish = () => setState((s) => finishExecution(s));
    if (reducedMotion()) finish();
    else schedule(finish, STEP_DELAY_MS);
  }

  function reset() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setState(resetState());
  }

  const awaiting = phase === "awaiting_human";

  return (
    <div
      className="border border-border bg-surface font-mono text-xs"
      role="group"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="sr-only">
        AI Agent Control Plane deterministic prototype
      </h2>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        Control plane status: {phaseLabel[phase]}.
      </div>
      {/* Window chrome */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span
            className={cx(
              "inline-block h-2 w-2 rounded-full",
              phase === "idle" ? "bg-fg-muted" : "bg-ok cp-pulse",
            )}
            aria-hidden="true"
          />
          <span className="text-fg-muted">agent-control-plane</span>
        </div>
        <span
          className={cx(
            "border px-2 py-0.5",
            awaiting
              ? "border-accent text-accent"
              : phase === "audited"
                ? "border-ok text-ok"
                : "border-border text-fg-muted",
          )}
        >
          {phaseLabel[phase]}
        </span>
      </div>
      <div className="border-b border-border px-4 py-2 text-[10px] uppercase leading-relaxed tracking-[0.14em] text-fg-muted">
        Deterministic personal prototype · scripted states · no live model, policy engine, or tool integration
      </div>

      <div className="grid gap-px bg-border lg:grid-cols-2">
        {/* Plan */}
        <div className="bg-surface p-4">
          <p className="mb-3 text-[10px] uppercase tracking-[0.18em] text-fg-muted">
            Plan · task #4471
          </p>
          <ol className="space-y-2">
            {planSteps.map((step, i) => {
              const done = stepIndex > i || phase === "audited";
              const active = stepIndex === i && phase !== "audited" && phase !== "rejected";
              return (
                <li key={step} className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={cx(
                      "flex h-4 w-4 items-center justify-center border text-[9px]",
                      done
                        ? "border-ok bg-ok text-accent-fg"
                        : active
                          ? "border-accent text-accent"
                          : "border-border text-fg-muted",
                    )}
                  >
                    {done ? "✓" : i + 1}
                  </span>
                  <span className={cx(done || active ? "text-fg" : "text-fg-muted")}>{step}</span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Verification + checkpoint */}
        <div className="flex flex-col gap-px bg-border">
          <div className="flex-1 bg-surface p-4">
            <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-fg-muted">
              Verification
            </p>
            <dl className="space-y-1.5">
              {[
                ["Policy check", stepIndex >= 3 ? "pass" : "—"],
                ["Scope check", stepIndex >= 3 ? "pass" : "—"],
                ["Risk level", stepIndex >= 3 ? "medium" : "—"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="text-fg-muted">{k}</dt>
                  <dd className={v === "pass" ? "text-ok" : v === "medium" ? "text-warn" : "text-fg-muted"}>
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div
            className={cx(
              "bg-surface p-4",
              awaiting && "outline outline-1 -outline-offset-1 outline-accent",
            )}
          >
            <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-fg-muted">
              Human decision checkpoint
            </p>
            <p className="mb-3 text-fg-muted">
              op-4471 requests: <span className="text-fg">write report to workspace</span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => decide(true)}
                disabled={!awaiting}
                className="flex-1 border border-ok px-3 py-2 text-ok transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
              >
                Approve
              </button>
              <button
                type="button"
                onClick={() => decide(false)}
                disabled={!awaiting}
                className="flex-1 border border-border px-3 py-2 text-fg-muted transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Audit trail */}
      <div className="border-t border-border p-4">
        <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-fg-muted">Audit trail</p>
        <ul className="space-y-1.5">
          {audit.slice(0, 4).map((entry) => (
            <li
              key={entry.id + entry.text}
              className={cx(
                "flex items-center gap-2",
                entry.tone === "ok" && "text-ok",
                entry.tone === "warn" && "text-warn",
                entry.tone === "muted" && "text-fg-muted",
              )}
            >
              <span aria-hidden="true">·</span>
              {entry.text}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-2 font-sans">
          <button
            type="button"
            onClick={run}
            className="bg-accent px-4 py-2 text-xs font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            {phase === "idle" ? "Run operation cycle" : "Run again"}
          </button>
          {phase !== "idle" && (
            <button
              type="button"
              onClick={reset}
              className="border border-border px-4 py-2 text-xs text-fg-muted transition-colors hover:text-fg"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

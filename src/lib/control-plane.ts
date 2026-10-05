// Deterministic state logic for the AI Agent Control Plane prototype.
// Scripted prototype states only: no live model, policy engine, or tool
// integration. Pure, synchronous transitions — verified by
// src/lib/control-plane.test.ts. Timers and media queries stay in the
// component; this module is DOM-free.

export const planSteps = [
  "Parse objective into operations",
  "Resolve tools & constraints",
  "Propose operation op-4471",
  "Verify against policy",
  "Request human decision",
  "Execute under supervision",
] as const;

export type Phase =
  | "idle"
  | "proposed"
  | "verifying"
  | "awaiting_human"
  | "executing"
  | "audited"
  | "rejected";

export const phaseLabel: Record<Phase, string> = {
  idle: "Standby",
  proposed: "Operation proposed",
  verifying: "Verifying",
  awaiting_human: "Awaiting human decision",
  executing: "Executing",
  audited: "Audited",
  rejected: "Rejected by operator",
};

export const stepPhaseMap: Record<number, Phase> = {
  0: "proposed",
  1: "proposed",
  2: "proposed",
  3: "verifying",
  4: "awaiting_human",
  5: "executing",
};

export interface AuditEntry {
  id: string;
  text: string;
  tone: "ok" | "warn" | "muted";
}

export const initialAudit: AuditEntry[] = [
  { id: "op-4468", text: "op-4468 · read-only query · executed · verified", tone: "muted" },
  { id: "op-4469", text: "op-4469 · write outside scope · rejected by policy", tone: "warn" },
  { id: "op-4470", text: "op-4470 · approved by operator · executed", tone: "ok" },
];

const rejectedEntry: AuditEntry = {
  id: "op-4471",
  text: "op-4471 · rejected by operator at checkpoint",
  tone: "warn",
};

const approvedEntry: AuditEntry = {
  id: "op-4471",
  text: "op-4471 · approved by operator · executed · verified",
  tone: "ok",
};

export const STEP_DELAY_MS = 900;

export interface ControlPlaneState {
  phase: Phase;
  stepIndex: number;
  audit: AuditEntry[];
}

export function initialState(): ControlPlaneState {
  return { phase: "idle", stepIndex: -1, audit: initialAudit };
}

/** Start a fresh cycle at the first plan step. */
export function startCycle(): ControlPlaneState {
  return { phase: "proposed", stepIndex: 0, audit: initialAudit };
}

/** Advance the cycle to plan step `i` (used for steps 1–4). */
export function advanceTo(state: ControlPlaneState, i: number): ControlPlaneState {
  return { ...state, stepIndex: i, phase: stepPhaseMap[i] };
}

/** Reduced-motion fast-forward: jump straight to the human checkpoint. */
export function startAtDecisionPoint(): ControlPlaneState {
  return { phase: "awaiting_human", stepIndex: 4, audit: initialAudit };
}

/** Record the operator's decision. No-op unless awaiting a human decision. */
export function applyDecision(state: ControlPlaneState, approved: boolean): ControlPlaneState {
  if (state.phase !== "awaiting_human") return state;
  if (!approved) {
    return { ...state, phase: "rejected", audit: [rejectedEntry, ...state.audit] };
  }
  return { ...state, phase: "executing", stepIndex: 5 };
}

/** Finish execution and record the approval. No-op unless executing. */
export function finishExecution(state: ControlPlaneState): ControlPlaneState {
  if (state.phase !== "executing") return state;
  return { ...state, phase: "audited", audit: [approvedEntry, ...state.audit] };
}

export function resetState(): ControlPlaneState {
  return initialState();
}

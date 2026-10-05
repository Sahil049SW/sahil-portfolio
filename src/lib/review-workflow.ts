// Deterministic demo logic for the Customer Follow-Up & Review Workflow.
// Source: approved public content — flow + policy. Synthetic data only.
// POLICY (hard rule, public content policy #9): no sentiment-based review gating.
// There is deliberately no sentiment field anywhere in this module.

export const workflowSteps = [
  "service_completed",
  "customer_recorded",
  "followup_scheduled",
  "review_requested",
  "event_tracked",
] as const;

export type WorkflowStep = (typeof workflowSteps)[number];

export const stepLabels: Record<WorkflowStep, string> = {
  service_completed: "Service completed",
  customer_recorded: "Customer recorded",
  followup_scheduled: "Follow-up scheduled",
  review_requested: "Neutral review request sent",
  event_tracked: "Event tracked",
};

/** Synthetic fixture data — not real people. */
export const syntheticCustomers = [
  { id: "c-001", name: "Alex Morgan", service: "Home cleaning" },
  { id: "c-002", name: "Priya Nair", service: "Lawn care" },
  { id: "c-003", name: "Daniel Osei", service: "Window washing" },
] as const;

export type SyntheticCustomer = (typeof syntheticCustomers)[number];

export interface WorkflowEvent {
  seq: number;
  customerId: string;
  step: WorkflowStep;
  message: string;
}

export interface WorkflowState {
  /** customer id -> index into workflowSteps (how many steps are done) */
  progress: Record<string, number>;
  events: WorkflowEvent[];
}

export function initialState(): WorkflowState {
  return {
    progress: Object.fromEntries(syntheticCustomers.map((c) => [c.id, 0])),
    events: [],
  };
}

function eventMessage(customer: SyntheticCustomer, step: WorkflowStep): string {
  switch (step) {
    case "service_completed":
      return `${customer.service} marked complete for ${customer.name}.`;
    case "customer_recorded":
      return `${customer.name} recorded in the follow-up list.`;
    case "followup_scheduled":
      return `Follow-up scheduled for ${customer.name}.`;
    case "review_requested":
      // Same neutral request for every customer — never sentiment-gated.
      return `Standard neutral review request sent to ${customer.name}.`;
    case "event_tracked":
      return `Workflow event recorded for ${customer.name}.`;
  }
}

/** Advance one customer by one step. Deterministic; no-op when complete. */
export function advanceCustomer(state: WorkflowState, customerId: string): WorkflowState {
  const done = state.progress[customerId] ?? 0;
  if (done >= workflowSteps.length) return state;
  const customer = syntheticCustomers.find((c) => c.id === customerId);
  if (!customer) return state;

  const step = workflowSteps[done];
  const event: WorkflowEvent = {
    seq: state.events.length + 1,
    customerId,
    step,
    message: eventMessage(customer, step),
  };
  return {
    progress: { ...state.progress, [customerId]: done + 1 },
    events: [...state.events, event],
  };
}

/** Advance every customer by one step. */
export function advanceAll(state: WorkflowState): WorkflowState {
  return syntheticCustomers.reduce((s, c) => advanceCustomer(s, c.id), state);
}

export function isComplete(state: WorkflowState): boolean {
  return syntheticCustomers.every(
    (c) => (state.progress[c.id] ?? 0) >= workflowSteps.length,
  );
}

export function currentStepLabel(state: WorkflowState, customerId: string): string {
  const done = state.progress[customerId] ?? 0;
  if (done >= workflowSteps.length) return "Complete";
  return stepLabels[workflowSteps[done]];
}

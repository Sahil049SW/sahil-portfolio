import { describe, expect, it } from "vitest";
import {
  advanceAll,
  advanceCustomer,
  initialState,
  isComplete,
  syntheticCustomers,
  workflowSteps,
} from "@/lib/review-workflow";

describe("review workflow state machine", () => {
  it("advances one customer through one step deterministically", () => {
    const s0 = initialState();
    const s1 = advanceCustomer(s0, "c-001");
    expect(s1.progress["c-001"]).toBe(1);
    expect(s1.progress["c-002"]).toBe(0);
    expect(s1.events).toHaveLength(1);
    expect(s1.events[0].step).toBe("service_completed");
    // original state untouched (immutable transitions)
    expect(s0.progress["c-001"]).toBe(0);
  });

  it("walks every customer through the full flow in order", () => {
    let state = initialState();
    for (let i = 0; i < workflowSteps.length; i++) {
      state = advanceAll(state);
    }
    expect(isComplete(state)).toBe(true);
    expect(state.events).toHaveLength(syntheticCustomers.length * workflowSteps.length);
    // further advances are no-ops
    expect(advanceAll(state)).toBe(state);
  });

  it("ignores unknown customer ids", () => {
    const s0 = initialState();
    expect(advanceCustomer(s0, "nobody")).toBe(s0);
  });

  it("has no sentiment field or gating anywhere in the module", () => {
    // Hard policy: public content policy #9 — review requests are never
    // gated or suppressed based on sentiment. Guard against regressions.
    const moduleSource = JSON.stringify({ syntheticCustomers, workflowSteps });
    expect(moduleSource.toLowerCase()).not.toContain("sentiment");
    for (const customer of syntheticCustomers) {
      expect(Object.keys(customer)).not.toContain("sentiment");
    }
    // every customer receives the identical neutral request
    let state = initialState();
    for (let i = 0; i < 4; i++) state = advanceAll(state);
    const requests = state.events.filter((e) => e.step === "review_requested");
    expect(requests).toHaveLength(syntheticCustomers.length);
    const bodies = new Set(
      requests.map((e) => e.message.replace(/to .+\.$/, "to <customer>.")),
    );
    expect(bodies.size).toBe(1);
  });
});

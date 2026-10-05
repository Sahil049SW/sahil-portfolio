import { describe, expect, it } from "vitest";
import {
  advanceTo,
  applyDecision,
  finishExecution,
  initialAudit,
  initialState,
  planSteps,
  resetState,
  startAtDecisionPoint,
  startCycle,
  stepPhaseMap,
} from "@/lib/control-plane";

/** Walk the scripted cycle from the start to the human checkpoint. */
function atDecisionPoint() {
  let state = startCycle();
  for (let i = 1; i <= 4; i++) state = advanceTo(state, i);
  return state;
}

describe("control plane state machine", () => {
  it("starts a cycle at the first plan step with a clean audit trail", () => {
    const state = startCycle();
    expect(state.phase).toBe("proposed");
    expect(state.stepIndex).toBe(0);
    expect(state.audit).toEqual(initialAudit);
  });

  it("advances through verification to the human checkpoint", () => {
    const state = atDecisionPoint();
    expect(state.stepIndex).toBe(4);
    expect(state.phase).toBe("awaiting_human");
    expect(stepPhaseMap[3]).toBe("verifying");
  });

  it("approve -> executing -> audited records the operation", () => {
    const decided = applyDecision(atDecisionPoint(), true);
    expect(decided.phase).toBe("executing");
    expect(decided.stepIndex).toBe(5);

    const done = finishExecution(decided);
    expect(done.phase).toBe("audited");
    expect(done.audit[0]).toEqual({
      id: "op-4471",
      text: "op-4471 · approved by operator · executed · verified",
      tone: "ok",
    });
    expect(done.audit).toHaveLength(initialAudit.length + 1);
  });

  it("reject -> audit entry and no execution", () => {
    const rejected = applyDecision(atDecisionPoint(), false);
    expect(rejected.phase).toBe("rejected");
    expect(rejected.stepIndex).toBe(4);
    expect(rejected.audit[0]).toEqual({
      id: "op-4471",
      text: "op-4471 · rejected by operator at checkpoint",
      tone: "warn",
    });
    expect(rejected.audit).toHaveLength(initialAudit.length + 1);
  });

  it("reset returns to the initial state without mutating the shared audit trail", () => {
    let state = startCycle();
    for (let i = 1; i <= 4; i++) state = advanceTo(state, i);
    state = applyDecision(state, false);

    const reset = resetState();
    expect(reset).toEqual(initialState());
    expect(reset.phase).toBe("idle");
    expect(reset.stepIndex).toBe(-1);
    // the cycle above must not have mutated the shared initial audit trail
    expect(initialAudit).toHaveLength(3);
    expect(initialAudit[0].id).toBe("op-4468");
  });

  it("reduced-motion fast-forward skips to the checkpoint and completes immediately", () => {
    const fast = startAtDecisionPoint();
    expect(fast.phase).toBe("awaiting_human");
    expect(fast.stepIndex).toBe(4);

    const done = finishExecution(applyDecision(fast, true));
    expect(done.phase).toBe("audited");
    expect(done.audit[0].tone).toBe("ok");
  });

  it("is immutable and guards transitions outside their valid phase", () => {
    const idle = initialState();
    expect(applyDecision(idle, true)).toBe(idle);
    expect(finishExecution(idle)).toBe(idle);

    const before = atDecisionPoint();
    const after = applyDecision(before, true);
    expect(after).not.toBe(before);
    expect(before.phase).toBe("awaiting_human");
    expect(before.audit).toEqual(initialAudit);
  });

  it("keeps plan steps and the phase map aligned", () => {
    expect(planSteps).toHaveLength(6);
    expect(stepPhaseMap[4]).toBe("awaiting_human");
    expect(stepPhaseMap[5]).toBe("executing");
  });
});

import { describe, expect, it } from "vitest";
import { professionalVerification } from "@/content/credentials";

// Scope: employment periods published by the centralized credential source
// (content/credential_public_metadata.json) — the periods rendered by the
// professional verification timeline. Verifies these are month-level only.
// Not a repo-wide check: employment references in other content modules
// (e.g. projects case-study prose) are outside this test's scope.
const dayLevelDate = /\b\d{1,2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/;

describe("credential source employment periods (professionalVerification)", () => {
  it("publishes the documented public employment periods", () => {
    const byCompany = new Map(professionalVerification.items.map((i) => [i.company, i]));
    const hcl = byCompany.get("HCL Technologies");
    const cadential = byCompany.get("Cadential Technologies");

    expect(hcl?.period).toBe("May 2025 – Sep 2025");
    const hclPeriods = new Map((hcl?.roles ?? []).map((r) => [r.role, r.period]));
    expect(hclPeriods.get("Lead Engineer")).toBe("May 2025 – Sep 2025");

    expect(cadential?.period).toBe("Feb 2021 – Mar 2025");
    const cadentialPeriods = new Map((cadential?.roles ?? []).map((r) => [r.role, r.period]));
    expect(cadentialPeriods.get("Associate Software Engineer")).toBe("From Jul 2022");
    expect(cadentialPeriods.get("Software Intern")).toBe("Feb 2021 – Jul 2022");
  });

  it("publishes no day-level employment dates in professionalVerification periods", () => {
    const periods = professionalVerification.items.flatMap((item) => [
      item.period,
      ...item.roles.map((role) => role.period),
    ]);
    for (const period of periods) {
      expect(period).not.toMatch(dayLevelDate);
    }
  });
});

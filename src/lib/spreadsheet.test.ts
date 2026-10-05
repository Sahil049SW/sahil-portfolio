import { describe, expect, it } from "vitest";
import { messyRows, normalizeRows } from "@/lib/spreadsheet";

describe("spreadsheet normalization", () => {
  const result = normalizeRows(messyRows);

  it("is deterministic — same input, same output", () => {
    expect(normalizeRows(messyRows)).toEqual(result);
  });

  it("normalizes casing, phone, date, and amount formats", () => {
    const alex = result.clean[0];
    expect(alex).toEqual({
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "+15550102233",
      date: "2025-03-04",
      amount: 1200,
    });
  });

  it("detects the duplicate record by normalized email", () => {
    expect(result.duplicates).toHaveLength(1);
    expect(result.duplicates[0].email).toBe("alex.morgan@example.com");
    expect(result.duplicates[0].rowIndexes).toEqual([0, 2]);
  });

  it("reports anomalies instead of silently dropping them", () => {
    const fields = result.anomalies.map((a) => `${a.rowIndex}:${a.field}`);
    // row 4 (index 3): missing email + invalid amount
    expect(fields).toContain("3:email");
    expect(fields).toContain("3:amount");
  });

  it("parses mixed date formats to ISO", () => {
    expect(result.clean[1].date).toBe("2025-03-11"); // already ISO
    expect(result.clean[3].date).toBe("2025-04-02"); // "Apr 2, 2025"
  });

  it("rejects impossible calendar dates in every supported format", () => {
    const invalidRows = [
      { ...messyRows[0], date: "2025-99-99" },
      { ...messyRows[0], date: "02/30/2025" },
      { ...messyRows[0], date: "Feb 31, 2025" },
    ];

    const invalidResult = normalizeRows(invalidRows);

    expect(invalidResult.clean.map((row) => row.date)).toEqual(["", "", ""]);
    expect(invalidResult.anomalies).toHaveLength(3);
    expect(invalidResult.anomalies.every((anomaly) => anomaly.field === "date")).toBe(true);
  });
});

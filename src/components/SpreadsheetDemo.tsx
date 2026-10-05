"use client";

import { useState } from "react";
import { messyRows, normalizeRows, type NormalizeResult } from "@/lib/spreadsheet";
import { DemoFrame } from "@/components/DemoFrame";
import { cx } from "@/lib/cx";

const thClass = "px-3 py-2 text-left font-medium text-fg-muted";
const tdClass = "px-3 py-2 align-top";

/**
 * Spreadsheet / Data Workflow Automation demo.
 * Deterministic: the same synthetic messy rows always produce the same
 * clean rows, anomaly list, and duplicate report.
 */
export function SpreadsheetDemo() {
  const [result, setResult] = useState<NormalizeResult | null>(null);

  return (
    <DemoFrame title="data-workflow · demo">
      <div className="space-y-6">
        <div>
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
            Input · messy rows (synthetic)
          </p>
          <div
            className="overflow-x-auto border border-border"
            role="region"
            aria-label="Synthetic input table; scroll horizontally to review all columns"
            tabIndex={0}
          >
            <table className="w-full min-w-[560px] border-collapse text-xs">
              <caption className="sr-only">
                Synthetic messy spreadsheet rows before normalization
              </caption>
              <thead className="bg-surface-2">
                <tr>
                  <th scope="col" className={thClass}>name</th>
                  <th scope="col" className={thClass}>email</th>
                  <th scope="col" className={thClass}>phone</th>
                  <th scope="col" className={thClass}>date</th>
                  <th scope="col" className={thClass}>amount</th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {messyRows.map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className={tdClass}>{row.name}</td>
                    <td className={tdClass}>{row.email || <span className="text-warn">(empty)</span>}</td>
                    <td className={tdClass}>{row.phone}</td>
                    <td className={tdClass}>{row.date}</td>
                    <td className={tdClass}>{row.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-fg-muted sm:hidden">
            Scroll horizontally to review every input column.
          </p>
          <button
            type="button"
            onClick={() => setResult(normalizeRows(messyRows))}
            className="mt-3 bg-accent px-4 py-2 text-xs font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            {result ? "Re-run normalization" : "Run normalization"}
          </button>
        </div>

        {result && (
          <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
                Output · clean rows
              </p>
              <div
                className="overflow-x-auto border border-border"
                role="region"
                aria-label="Normalized output table; scroll horizontally to review all columns"
                tabIndex={0}
              >
                <table className="w-full min-w-[560px] border-collapse text-xs">
                  <caption className="sr-only">
                    Clean spreadsheet rows after deterministic normalization
                  </caption>
                  <thead className="bg-surface-2">
                    <tr>
                      <th scope="col" className={thClass}>name</th>
                      <th scope="col" className={thClass}>email</th>
                      <th scope="col" className={thClass}>phone</th>
                      <th scope="col" className={thClass}>date</th>
                      <th scope="col" className={thClass}>amount</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {result.clean.map((row, i) => {
                      const anomalyFields = new Set(
                        result.anomalies.filter((a) => a.rowIndex === i).map((a) => a.field),
                      );
                      const isDuplicate = result.duplicates.some((d) =>
                        d.rowIndexes.includes(i),
                      );
                      return (
                        <tr key={i} className="border-t border-border">
                          <td className={tdClass}>{row.name}</td>
                          <td className={cx(tdClass, (anomalyFields.has("email") || isDuplicate) && "text-warn")}>
                            {row.email || "—"}
                          </td>
                          <td className={tdClass}>{row.phone || "—"}</td>
                          <td className={tdClass}>{row.date || "—"}</td>
                          <td className={cx(tdClass, anomalyFields.has("amount") && "text-warn")}>
                            {row.amount === null ? "—" : row.amount.toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[11px] text-fg-muted sm:hidden">
                Scroll horizontally to review every normalized column.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
                  Anomalies ({result.anomalies.length})
                </p>
                <ul className="space-y-1.5 border border-border bg-surface-2 p-3 text-[11px]">
                  {result.anomalies.map((a, i) => (
                    <li key={i} className="text-fg-muted">
                      Row {a.rowIndex + 1} · <span className="text-warn">{a.field}</span> — {a.reason}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-muted">
                  Duplicates ({result.duplicates.length})
                </p>
                <ul className="space-y-1.5 border border-border bg-surface-2 p-3 text-[11px]">
                  {result.duplicates.length === 0 && (
                    <li className="text-fg-muted">None detected.</li>
                  )}
                  {result.duplicates.map((d) => (
                    <li key={d.email} className="text-fg-muted">
                      <span className="text-warn">{d.email}</span> appears in rows{" "}
                      {d.rowIndexes.map((i) => i + 1).join(" & ")}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </DemoFrame>
  );
}

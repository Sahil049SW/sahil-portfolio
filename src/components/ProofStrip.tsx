/**
 * Proof strip — every item maps to an approved claim in verified claim set.
 * No counters, no logos, no invented metrics.
 */
const proofItems = [
  {
    stat: "4+ years",
    label: "Software engineering experience",
    source: "résumé",
  },
  {
    stat: "Lead Engineer",
    label: "HCL Technologies — supported by employment documentation",
    source: "experience letter",
  },
  {
    stat: "80%+",
    label: "Targeted unit + integration coverage (raised from ~40% on owned services)",
    source: "résumé",
  },
  {
    stat: "3 enterprises",
    label: "Documented project work: CitiBank, APL Logistics, The Vanguard Group",
    source: "résumé",
  },
] as const;

export function ProofStrip() {
  return (
    <section aria-label="Key professional facts" className="border-b border-border bg-surface">
      <dl className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
        {proofItems.map((item) => (
          <div key={item.stat + item.label} className="flex flex-col px-5 py-6">
            <dt className="order-2 mt-1 text-xs leading-relaxed text-fg-muted">{item.label}</dt>
            <dd className="order-1 font-display text-xl font-semibold tracking-tight">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

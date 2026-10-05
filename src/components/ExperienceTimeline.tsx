import { professionalVerification } from "@/content/credentials";

/**
 * Professional experience timeline.
 * Employment dates come from employment documentation; where a date is not
 * established, the period states the evidence bound instead of a guess
 * (public verification policy).
 */
export function ExperienceTimeline() {
  return (
    <ol className="relative space-y-8 border-l border-border pl-6">
      {professionalVerification.items.map((item) => (
        <li key={item.company} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-bg"
          />
          <p className="font-mono text-xs text-fg-muted">{item.period}</p>
          <p className="mt-1 font-display text-lg font-semibold">{item.company}</p>
          <ul className="mt-3 space-y-3">
            {item.roles.map((entry) => (
              <li key={entry.role} className="border-l border-border pl-3">
                <p className="text-sm font-medium text-fg">{entry.role}</p>
                <p className="font-mono text-xs text-fg-muted">{entry.period}</p>
                {entry.note ? (
                  <p className="mt-1 text-xs leading-relaxed text-fg-muted">
                    {entry.note}
                  </p>
                ) : null}
                <p className="mt-1 text-xs leading-relaxed text-fg-muted">
                  Source: {entry.source}
                </p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

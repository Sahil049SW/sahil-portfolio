import { site } from "@/config/site";

// Single source of truth stays src/config/site.ts — the split is derived here so
// the name is never duplicated across the data layer.
const [givenName, familyName] = site.name.split(" ");

/**
 * Personal identity mark — compact SS monogram + wordmark.
 *
 * The monogram is a restrained bordered square; the amber accent appears only
 * on the initials so it stays an accent (design system — single amber
 * accent, no logo walls, no oversized logos). Decorative only: callers own the
 * accessible name on the wrapping link, so the mark is hidden from assistive
 * technology and the name is read instead.
 */
export function Wordmark() {
  return (
    <span className="flex items-center gap-2 whitespace-nowrap">
      <span
        aria-hidden="true"
        className="flex h-6 w-6 shrink-0 items-center justify-center border border-border bg-surface-2 font-mono text-[11px] font-medium leading-none tracking-[0.04em] text-accent"
      >
        SS
      </span>
      <span className="font-display text-sm tracking-tight">
        <span className="font-semibold text-fg">{givenName}</span>{" "}
        <span className="font-medium text-fg-muted">{familyName}</span>
      </span>
    </span>
  );
}
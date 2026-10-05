import { cx } from "@/lib/cx";

/**
 * Labeled wrapper for interactive demos. Every demo is a prototype on
 * synthetic data (public content policy #4, #10) — the badge says so.
 */
export function DemoFrame({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("border border-border bg-surface", className)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-4 py-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-fg-muted">
          {title}
        </span>
        <span className="border border-accent px-2 py-0.5 text-[10px] uppercase tracking-wide text-accent">
          Prototype · synthetic data
        </span>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

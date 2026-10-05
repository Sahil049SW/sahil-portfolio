import { cx } from "@/lib/cx";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} className={cx("scroll-mt-20 border-t border-border", className)}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        {eyebrow && (
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
        )}
        {title && (
          <h2 className="max-w-3xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
        )}
        {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-muted">{intro}</p>}
        <div className={title || eyebrow ? "mt-10" : undefined}>{children}</div>
      </div>
    </section>
  );
}

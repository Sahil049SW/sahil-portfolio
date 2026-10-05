import Link from "next/link";
import type { Project } from "@/lib/types";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group flex h-full flex-col border border-border bg-surface p-6 transition-colors hover:border-accent"
    >
      <div className="flex items-baseline justify-between gap-4">
        <span className="font-display text-xs text-fg-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="border border-border px-2 py-0.5 text-[11px] uppercase tracking-wide text-fg-muted">
          {project.truthLabel}
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight group-hover:text-accent">
        {project.title}
      </h3>
      <p className="mt-1 text-xs uppercase tracking-wide text-fg-muted">{project.type}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">{project.summary}</p>
      <span className="mt-5 text-sm font-medium text-accent">
        View case study <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

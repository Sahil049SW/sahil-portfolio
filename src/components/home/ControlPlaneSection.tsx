import Link from "next/link";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { Diagram } from "@/components/diagrams";
import { getProject } from "@/content/projects";
import { flagship } from "@/content/home";

const project = getProject("ai-agent-control-plane")!;

export function ControlPlaneSection() {
  return (
    <Section
      id="control-plane"
      eyebrow="Flagship · personal engineering project"
      title={flagship.title}
      intro={project.summary}
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <Reveal>
          <blockquote className="border-l-2 border-accent pl-5 font-display text-xl font-medium leading-snug sm:text-2xl">
            “{flagship.principle}”
          </blockquote>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {project.showcase!.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 border border-border bg-surface px-3 py-2.5 text-sm text-fg-muted"
              >
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={flagship.cta.href}
            className="mt-8 inline-block bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            {flagship.cta.label}
          </Link>
        </Reveal>
        <Reveal>
          <div className="border border-border bg-surface p-4 sm:p-6">
            <Diagram name="control-plane" />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

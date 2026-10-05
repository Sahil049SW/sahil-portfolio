import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { technicalDepth } from "@/content/home";

/**
 * Technical depth — grouped résumé capabilities
 * (approved professional facts). Grouped by domain, not a logo wall
 * (public content policy #12).
 */
export function TechDepthSection() {
  return (
    <Section
      id="tech-depth"
      eyebrow="Technical depth"
      title="The toolbox, grouped by the problems it solves"
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {technicalDepth.map((group) => (
          <Reveal key={group.group}>
            <div className="h-full border border-border bg-surface p-5">
              <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
                {group.group}
              </h3>
              <ul className="mt-4 space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm leading-relaxed text-fg-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

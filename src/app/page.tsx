import type { Metadata } from "next";
import { canonicalUrl } from "@/config/site";
import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { ControlPlaneSection } from "@/components/home/ControlPlaneSection";
import { AutomationSection } from "@/components/home/AutomationSection";
import { EnterpriseSection } from "@/components/home/EnterpriseSection";
import { AiWorkflowSection } from "@/components/home/AiWorkflowSection";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { TechDepthSection } from "@/components/home/TechDepthSection";
import { ContactCTA } from "@/components/ContactCTA";
import { featuredProjects } from "@/content/projects";
import { valuePillars } from "@/content/home";

const canonical = canonicalUrl("/");

export const metadata: Metadata = canonical
  ? { alternates: { canonical } }
  : {};

/**
 * Home — sections follow page architecture exactly:
 * nav → hero → proof strip → featured work → flagship → automation demos →
 * enterprise case study → AI-native workflow → experience/verification →
 * technical depth → contact CTA → footer (chrome lives in layout.tsx).
 */
export default function HomePage() {
  return (
    <>
      {/* 2. Hero */}
      <Hero />

      {/* 3. Proof strip */}
      <ProofStrip />

      {/* 4. Featured work */}
      <Section
        id="work"
        eyebrow="Featured work"
        title="Proof over promises"
        intro="Four pieces of evidence: a flagship personal system, two labeled automation prototypes, and a documented professional case study."
      >
        <Reveal>
          <ul className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {valuePillars.map((pillar) => (
              <li key={pillar.title} className="bg-surface p-5">
                <h3 className="font-display text-sm font-semibold">{pillar.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-fg-muted">{pillar.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {featuredProjects.map((project, i) => (
            <Reveal key={project.slug}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 5. Flagship: AI Agent Control Plane */}
      <ControlPlaneSection />

      {/* 6. Business automation demos */}
      <AutomationSection />

      {/* 7. Enterprise engineering case study */}
      <EnterpriseSection />

      {/* 8. AI-native engineering workflow */}
      <AiWorkflowSection />

      {/* 9. Professional experience / verification */}
      <ExperienceSection />

      {/* 10. Technical depth */}
      <TechDepthSection />

      {/* 11. Contact CTA */}
      <Section id="contact">
        <Reveal>
          <ContactCTA />
        </Reveal>
      </Section>
    </>
  );
}

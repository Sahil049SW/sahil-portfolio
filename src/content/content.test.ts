import { describe, expect, it } from "vitest";
import registry from "@content/project_registry.json";
import { projects } from "@/content/projects";

describe("content registry integrity", () => {
  it("every registry slug has typed project content", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const entry of registry.projects) {
      expect(slugs.has(entry.slug)).toBe(true);
    }
  });

  it("slugs are unique and route-safe", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("every project carries a truth label and a complete case study", () => {
    for (const p of projects) {
      expect(p.truthLabel.length).toBeGreaterThan(0);
      expect(p.caseStudy.problem.length).toBeGreaterThan(0);
      expect(p.caseStudy.notClaimed.length).toBeGreaterThan(0);
    }
  });

  it("requires prototypes to explicitly disclaim client relationships", () => {
    for (const p of projects) {
      if (!p.truthLabel.toLowerCase().startsWith("prototype")) continue;

      const disclaimers = p.caseStudy.notClaimed.join(" ").toLowerCase();

      expect(disclaimers).toMatch(/(?:not (?:a|an) client|no client)/);
    }
  });
});

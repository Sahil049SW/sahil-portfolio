// Shared content types for the portfolio.
// Content model per public site configuration: typed local data modules,
// no strings scattered across components.

import type { ExternalLinkTarget } from "@/lib/link-state";

export type DiagramKey =
  | "control-plane"
  | "review-workflow"
  | "iss-data-lake"
  | "spreadsheet";

export interface ProjectLink {
  label: string;
  target: ExternalLinkTarget;
  kind: "repo" | "demo" | "external";
  /** Visitor-facing status shown when an external target is not available. */
  note?: string;
}

/** Case-study template from page architecture. */
export interface CaseStudy {
  problem: string;
  context: string[];
  built: string[];
  architecture: { description: string[]; diagram: DiagramKey };
  decisions: string[];
  validation: string[];
  notClaimed: string[];
  links: ProjectLink[];
}

export interface Project {
  slug: string;
  title: string;
  /** e.g. "Personal engineering project" — shown verbatim as the truth label */
  type: string;
  status: string;
  featured: boolean;
  truthLabel: string;
  summary: string;
  techStack?: readonly string[];
  showcase?: string[];
  caseStudy: CaseStudy;
}

export interface CredentialRole {
  role: string;
  period: string;
  source: string;
  /** Used when a fact is bounded by evidence rather than a known date. */
  note?: string;
}

/** One employer, with the documented role progression inside it. */
export interface CredentialItem {
  company: string;
  period: string;
  roles: CredentialRole[];
}

export interface ProfessionalVerification {
  headline: string;
  items: CredentialItem[];
}

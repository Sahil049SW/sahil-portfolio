// Typed project content module.
// Registry source: content/project_registry.json
// Copy sources: approved public content, verified claim set, approved professional facts
// Rule: every factual claim here traces to an approved doc. Nothing invented.

import registry from "@content/project_registry.json";
import { placeholderLink } from "@/lib/link-state";
import type { Project } from "@/lib/types";

type RegistryEntry = (typeof registry.projects)[number];

const registryBySlug = new Map<string, RegistryEntry>(
  registry.projects.map((p) => [p.slug, p]),
);

function fromRegistry(slug: string): RegistryEntry {
  const entry = registryBySlug.get(slug);
  if (!entry) {
    throw new Error(`Project slug "${slug}" missing from content/project_registry.json`);
  }
  return entry;
}

export const projects: Project[] = [
  {
    ...fromRegistry("ai-agent-control-plane"),
    summary:
      "A visual control surface for an agent framework that separates model reasoning from framework control: plan, verify, request human decisions where required, execute, and audit.",
    showcase: [
      "Execution state",
      "Proposed operation",
      "Verification state",
      "Human decision checkpoint",
      "Audit trail",
      "Operation history",
      "Risk / status information",
    ],
    caseStudy: {
      problem:
        "AI agents that call tools and take actions are hard to trust when the model's reasoning and the system's control logic are tangled together. There is no clear place to see what the agent intends to do, whether it was verified, or why it was allowed to run.",
      context: [
        "Personal engineering project informed by my broader AI Agent Framework work.",
        "The AI Agent Framework itself is not published in this portfolio, so it is not publicly inspectable here.",
        "Designed as a control surface for agentic systems rather than another chat interface.",
      ],
      built: [
        "A control-plane interface, demonstrated through the scripted prototype on this page, that surfaces agent/task state, planning, verification, human decision checkpoints, execution, and audit history as first-class objects.",
        "In the prototype, a strict separation is demonstrated between model reasoning and framework control: the framework — not the model — decides what the model is allowed to do.",
      ],
      architecture: {
        description: [
          "The core principle: the model is not the framework. The framework controls the model.",
          "Proposed operations flow through explicit states — planned, verified, approved or rejected at human checkpoints where required, executed, and recorded in an audit trail.",
        ],
        diagram: "control-plane",
      },
      decisions: [
        "Model output is treated as a proposal in the prototype workflow, never as an instruction.",
        "Human decision points are explicit states in the workflow, not implicit prompts.",
        "In the prototype, every operation is recorded so the demonstrated behavior is auditable after the fact.",
      ],
      validation: [
        "The prototype's scripted state cycle (operation proposed → verified → human checkpoint → executed → audited, or rejected at the checkpoint) is covered by deterministic unit tests in src/lib/control-plane.test.ts.",
      ],
      notClaimed: [
        "Not a deployed commercial product.",
        "No client usage, users, or business outcomes are claimed.",
      ],
      links: [
        // deployment metadata configuration — the interactive demo runs on this page; no external
        // demo URL is required. The source repository stays unavailable until
        // a verified public repository exists.
        {
          label: "Source repository",
          target: placeholderLink("No verified public repository exists yet"),
          kind: "repo",
          note: "Not yet publicly available — no verified public repository exists.",
        },
      ],
    },
  },
  {
    ...fromRegistry("customer-follow-up-workflow"),
    summary:
      "A small workflow that helps a business follow up with customers after a completed service and makes it easier for customers to leave genuine feedback.",
    showcase: [
      "Service completed → customer recorded → follow-up scheduled → neutral review request → event tracked",
      "Every customer receives the same neutral request",
      "No sentiment-based review gating, ever",
    ],
    caseStudy: {
      problem:
        "Small service businesses finish a job and then lose the thread: no structured follow-up, no consistent review request, no record of what was sent to whom.",
      context: [
        "Prototype / business automation demo. Synthetic customer data only.",
        "Not a client deployment and not affiliated with any specific business.",
      ],
      built: [
        "A deterministic workflow: service completed → customer recorded → follow-up scheduled → neutral review request → event tracked.",
        "An event log that makes every step inspectable.",
      ],
      architecture: {
        description: [
          "A linear, inspectable state flow. Each customer moves through the same steps, and every transition is recorded as an event.",
        ],
        diagram: "review-workflow",
      },
      decisions: [
        "Every customer receives the same neutral review request.",
        "Review requests are never gated or suppressed based on predicted sentiment.",
        "Demo runs on deterministic synthetic fixtures — no backend, no real customer data.",
      ],
      validation: [
        "Workflow transitions are covered by unit tests, including an explicit assertion that no sentiment-based gating exists.",
      ],
      notClaimed: [
        "Not a client project. No business is a client of this demo.",
        "No revenue, conversion, or review-volume outcomes are claimed.",
      ],
      links: [{ label: "Source repository", target: placeholderLink("Repository URL not supplied"), kind: "repo" }],
    },
  },
  {
    ...fromRegistry("enterprise-backend-engineering"),
    summary:
      "A multi-microservice financial file-ingestion platform — the Issuer Shared Service / CitiBank Data Lake — involving Java 17, Spring Boot, AWS S3, Apache Kafka, MySQL, Flyway, Docker and Helm.",
    techStack: [
      "Java 17",
      "Spring Boot",
      "Microservices",
      "AWS S3",
      "Apache Kafka",
      "MySQL",
      "Flyway",
      "Docker",
      "Helm",
      "Autosys",
    ],
    showcase: [
      "Secure file-ingestion workflow",
      "S3 access verification",
      "Metadata / pipeline tracking",
      "Service orchestration",
      "Retry and exception handling",
      "Flyway migrations",
      "JaCoCo test coverage raised from ~40% to 80%+",
      "Deployment collaboration with Helm / ECS / Autosys",
    ],
    caseStudy: {
      problem:
        "Financial file ingestion needs to be secure, trackable, and recoverable: files must be verified, tracked through a pipeline, and retried cleanly when things fail.",
      context: [
        "Professional experience case study from work at HCL Technologies (Lead Engineer, May 2025 – Sep 2025), described only at a non-confidential level supported by the résumé.",
        "Stack: Java 17, Spring Boot, Microservices, AWS S3, Apache Kafka, MySQL, Flyway, Docker, Helm, Autosys.",
        "The architecture shown here is a generalized public pattern, not an exact client topology.",
      ],
      built: [
        "Secure file-ingestion workflow with S3 access verification before processing.",
        "File metadata and pipeline tracking so every ingested file has an inspectable lifecycle.",
        "Orchestrator and client services (BanzaiUploadService, BanzaiTriggerService) with exception handling and retry logic.",
        "Flyway-managed schema migrations and automated scheduling.",
      ],
      architecture: {
        description: [
          "Résumé-supported responsibilities include S3 access verification, metadata and pipeline tracking, service orchestration, retry handling, migrations, scheduling, and deployment collaboration.",
          "Kafka, MySQL, Docker, Helm, ECS, and Autosys are shown as approved technology context only; the diagram does not claim how they were connected inside the client system.",
        ],
        diagram: "iss-data-lake",
      },
      decisions: [
        "Verify S3 access before processing so permission failures surface immediately.",
        "Track file metadata and pipeline state explicitly instead of inferring it from logs.",
        "Design retry and exception handling as first-class behavior, not an afterthought.",
      ],
      validation: [
        "Raised JaCoCo test coverage on the owned services from ~40% to 80%+ (engineering metric, per résumé).",
        "JUnit 5 / Mockito unit tests and integration testing as part of the delivery workflow.",
      ],
      notClaimed: [
        "No exact confidential client architecture or component topology is disclosed or claimed.",
        "No confidential implementation details, internal hostnames, credentials, customer-sensitive data, or proprietary business rules are disclosed.",
        "The test-coverage figure is an engineering metric on owned services — not a client-wide business outcome.",
      ],
      links: [],
    },
  },
  {
    ...fromRegistry("spreadsheet-workflow-automation"),
    summary:
      "Messy spreadsheet → deterministic validation and normalization → duplicate/anomaly report → clean output → optional lightweight reminder/dashboard.",
    showcase: [
      "Deterministic validation rules",
      "Normalization of inconsistent formats",
      "Duplicate and anomaly reporting",
      "Clean, inspectable output",
    ],
    caseStudy: {
      problem:
        "Operational data lives in spreadsheets that accumulate inconsistent formats, duplicates, and silent errors — and nobody trusts the numbers enough to act on them.",
      context: [
        "Prototype / automation demo. Synthetic data only.",
        "Deliberately not positioned as a SaaS — no validated demand is claimed.",
      ],
      built: [
        "Deterministic validation and normalization passes over messy tabular data.",
        "A duplicate/anomaly report that shows exactly what was wrong and what changed.",
        "Clean output suitable for downstream use, with an optional lightweight reminder/dashboard concept.",
      ],
      architecture: {
        description: [
          "A pipeline of pure, deterministic transformations: parse → validate → normalize → report → emit clean rows. Same input always produces the same output.",
        ],
        diagram: "spreadsheet",
      },
      decisions: [
        "Deterministic rules over heuristics — every change is explainable.",
        "Anomalies are reported, never silently discarded.",
      ],
      validation: [
        "Normalization and duplicate-detection logic covered by unit tests against fixed synthetic fixtures.",
      ],
      notClaimed: [
        "Not a product, not a client deployment, no users or outcomes claimed.",
      ],
      links: [{ label: "Source repository", target: placeholderLink("Repository URL not supplied"), kind: "repo" }],
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const featuredProjects = projects.filter((project) => project.featured);

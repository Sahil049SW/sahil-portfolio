// Home page copy. Source: approved public content (approved content), verbatim where defined.
// Professional facts: approved professional facts. Claims: verified claim set.

export const hero = {
  eyebrow: "AI • Automation • Backend Engineering",
  headline: "I build reliable software systems for real-world workflows.",
  supporting:
    "Senior backend engineer with 4+ years of experience across Java, Spring Boot, Microservices, AWS and Kafka, now applying that engineering discipline to AI-powered automation and agentic systems.",
  ctas: [
    { label: "Explore the work", href: "/#work" },
    { label: "Start a project", href: "/#contact" },
  ],
  proofLine: "Lead Engineer experience • Enterprise systems • AI-native engineering",
} as const;

export const valuePillars = [
  {
    title: "AI Systems",
    body: "Design AI workflows around explicit states, tools, verification, and human decision points.",
  },
  {
    title: "Business Automation",
    body: "Turn repetitive manual processes into simple, inspectable workflows.",
  },
  {
    title: "Backend Engineering",
    body: "Build APIs, distributed services, event-driven systems, data flows, and cloud-native infrastructure.",
  },
  {
    title: "Engineering Quality",
    body: "Treat testing, failure handling, auditability, and maintainability as product features.",
  },
] as const;

export const flagship = {
  title: "AI Agent Control Plane",
  type: "Personal engineering project",
  principle: "The model is not the framework. The framework controls the model.",
  cta: { label: "Explore architecture", href: "/work/ai-agent-control-plane" },
} as const;

// AI-native workflow — approved public content "AI-native workflow".
// Only completed and verified work is listed here (verified claim set).
// Final visual polish and production deployment are intentionally not claimed.
export const aiWorkflow = {
  title: "AI-native engineering workflow",
  body: "AI models are used as engineering collaborators for tasks such as design exploration, implementation, code review, testing assistance, refactoring, and documentation.",
  uses: [
    "Planning / design exploration",
    "Implementation",
    "Code review",
    "Testing assistance",
    "Refactoring",
    "Documentation",
  ],
  // Verified completed work only. The senior audit was a read-only Command Code
  // audit; exact audit-model identity is not asserted without session evidence.
  pipeline: [
    "Specification",
    "Kimi K3 implementation",
    "Read-only Command Code senior audit",
    "Targeted remediation",
    "Validation",
  ],
} as const;

// Technical depth — grouped capabilities from the résumé skills section.
// Source: approved professional facts "Technical capabilities listed on résumé".
// Grouped by domain, not a flat technology list. Capabilities here are the
// general professional profile and are not attributed to any single project.
// The "Python & Web" group is not résumé-listed — it is broader technical
// background / user-confirmed capability (verified claim set).
export const technicalDepth = [
  {
    group: "Languages & Frameworks",
    items: ["Java 8 / 11 / 17", "Spring Boot", "Spring Security", "Spring Data JPA", "REST APIs"],
  },
  {
    group: "Data & Messaging",
    items: ["Apache Kafka", "MySQL", "Snowflake", "Flyway"],
  },
  {
    group: "Cloud & Infrastructure",
    items: ["AWS S3 / EC2 / Lambda / CodePipeline / ECS", "Docker", "Kubernetes", "Helm"],
  },
  {
    group: "Delivery & Quality",
    items: ["JUnit 5 / Mockito / Integration Testing", "Jenkins / GitHub Actions / AWS CodePipeline", "Git / Bitbucket / Jira / Agile / Scrum / Code Review"],
  },
  {
    group: "Python & Web",
    items: ["Python", "Django"],
  },
] as const;

export const about = {
  title: "About",
  paragraphs: [
    "I'm a software engineer focused on backend systems, automation, AI-assisted workflows, and practical tooling.",
    "My background is in enterprise software engineering with Java, Spring Boot, Microservices, AWS and Kafka. I'm now extending that foundation into AI systems that are structured, testable, and designed around explicit workflows rather than hype.",
  ],
} as const;

export const contact = {
  headline: "Have a workflow that should not require repetitive human effort?",
  body: "Tell me what is manual today, what the output needs to look like, and where the workflow currently breaks.",
  ctaLabel: "Start a project",
} as const;

export const reviewWorkflowCopy = {
  title: "Customer Follow-Up & Review Workflow",
  type: "Prototype / Business Automation Demo",
} as const;

export const enterpriseCopy = {
  title: "Issuer Shared Service — CitiBank Data Lake",
  type: "Professional experience case study",
  disclosure:
    "Publicly described only at the engineering level supported by the résumé. No confidential implementation details, internal hostnames, credentials, customer-sensitive data, or proprietary business rules.",
  cta: { label: "Read the case study", href: "/work/enterprise-backend-engineering" },
} as const;

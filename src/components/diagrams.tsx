import type { DiagramKey } from "@/lib/types";

/**
 * Inline SVG architecture diagrams — evidence over decoration
 * (design system). All render at pattern level only; no internal
 * hostnames, credentials, or proprietary detail (approved public content).
 */

const box = {
  fill: "var(--surface-2)",
  stroke: "var(--border)",
} as const;

const accentStroke = "var(--accent)";
const textFill = "var(--fg)";
const mutedFill = "var(--fg-muted)";

function Arrow({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label?: string }) {
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={mutedFill} strokeWidth="1" markerEnd="url(#arrowhead)" />
      {label && (
        <text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 4} textAnchor="middle" fontSize="8.5" fill={mutedFill} fontFamily="inherit">
          {label}
        </text>
      )}
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <marker id="arrowhead" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
        <path d="M0,0 L7,3.5 L0,7 z" fill={mutedFill} />
      </marker>
    </defs>
  );
}

function Box({ x, y, w, h, title, sub, accent }: { x: number; y: number; w: number; h: number; title: string; sub?: string; accent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={box.fill} stroke={accent ? accentStroke : box.stroke} strokeWidth={accent ? 1.5 : 1} />
      <text x={x + w / 2} y={sub ? y + h / 2 - 3 : y + h / 2 + 3} textAnchor="middle" fontSize="10" fill={textFill} fontFamily="inherit">
        {title}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle" fontSize="8" fill={mutedFill} fontFamily="inherit">
          {sub}
        </text>
      )}
    </g>
  );
}

function ControlPlaneDiagram() {
  return (
    <svg viewBox="0 0 640 240" className="h-auto w-full font-mono" role="img"
      aria-label="Architecture: the model proposes operations; the framework verifies them, requires human approval for risky operations, executes, and writes an audit trail">
      <Defs />
      <Box x={10} y={85} w={110} h={52} title="Model" sub="reasoning only" />
      <Box x={180} y={20} w={130} h={44} title="Planner" sub="objective → ops" />
      <Box x={180} y={150} w={130} h={44} title="Policy / Verify" sub="scope · risk" />
      <Box x={370} y={85} w={120} h={52} title="Human checkpoint" sub="approve / reject" accent />
      <Box x={540} y={20} w={90} h={44} title="Executor" />
      <Box x={540} y={150} w={90} h={44} title="Audit trail" />

      <Arrow x1={120} y1={100} x2={180} y2={48} label="proposal" />
      <Arrow x1={245} y1={64} x2={245} y2={150} label="candidate op" />
      <Arrow x1={310} y1={172} x2={400} y2={137} label="verified" />
      <Arrow x1={490} y1={100} x2={540} y2={48} label="approved" />
      <Arrow x1={585} y1={64} x2={585} y2={150} label="recorded" />
      <Arrow x1={430} y1={137} x2={540} y2={172} label="rejected" />
      <text x={10} y={225} fontSize="9" fill={mutedFill} fontFamily="inherit">
        The model is not the framework. The framework controls the model.
      </text>
    </svg>
  );
}

function ReviewWorkflowDiagram() {
  const steps = ["Service completed", "Customer recorded", "Follow-up scheduled", "Neutral review request", "Event tracked"];

  return (
    <div
      className="font-mono"
      role="img"
      aria-label="Workflow: service completed, customer recorded, follow-up scheduled, neutral review request sent, event tracked"
    >
      <div
        aria-hidden="true"
        className="grid min-w-[640px] grid-cols-[minmax(104px,1fr)_20px_minmax(104px,1fr)_20px_minmax(104px,1fr)_20px_minmax(104px,1fr)_20px_minmax(104px,1fr)] items-stretch"
      >
        {steps.map((step, i) => (
          <div key={step} className="contents">
            <div
              className={`flex min-h-16 min-w-0 items-center justify-center border px-3 py-3 text-center text-xs leading-snug ${
                i === 3 ? "border-accent bg-accent-soft text-fg" : "border-border bg-surface-2 text-fg"
              }`}
            >
              {step}
            </div>
            {i < steps.length - 1 && (
              <div className="relative h-px self-center bg-fg-muted after:absolute after:-right-0.5 after:top-1/2 after:h-2 after:w-2 after:-translate-y-1/2 after:rotate-45 after:border-r after:border-t after:border-fg-muted" />
            )}
          </div>
        ))}
      </div>
      <p className="mt-4 text-[10px] leading-relaxed text-fg-muted">
        Every customer receives the same neutral request. No sentiment-based gating.
      </p>
    </div>
  );
}

function IssDataLakeDiagram() {
  return (
    <svg viewBox="0 0 640 250" className="h-auto w-full font-mono" role="img"
      aria-label="Generalized public engineering pattern for the CitiBank case study: secure file ingestion, S3 access verification, metadata and pipeline tracking, service orchestration, retries, persistence and migrations, with Kafka and deployment technologies shown only as résumé-supported context. This is not an exact client topology.">
      <text x={10} y={22} fontSize="9" fill={mutedFill} fontFamily="inherit" letterSpacing="1.5">
        GENERALIZED PUBLIC PATTERN · NOT CLIENT TOPOLOGY
      </text>
      <Box x={10} y={48} w={140} h={52} title="File ingestion" sub="secure intake" />
      <Box x={170} y={48} w={140} h={52} title="Access verification" sub="S3 permissions" accent />
      <Box x={330} y={48} w={140} h={52} title="Metadata tracking" sub="pipeline lifecycle" />
      <Box x={490} y={48} w={140} h={52} title="Service orchestration" sub="upload · trigger" />
      <Box x={10} y={125} w={140} h={52} title="Reliability" sub="retry · exceptions" />
      <Box x={170} y={125} w={140} h={52} title="Persistence" sub="MySQL · Flyway" />
      <Box x={330} y={125} w={140} h={52} title="Messaging context" sub="Apache Kafka" />
      <Box x={490} y={125} w={140} h={52} title="Delivery context" sub="Helm · ECS · Autosys" />
      <text x={10} y={220} fontSize="9" fill={mutedFill} fontFamily="inherit">
        Résumé-supported responsibilities and technology context only.
      </text>
      <text x={10} y={236} fontSize="9" fill={mutedFill} fontFamily="inherit">
        Connections, hosts, and internal deployment topology are intentionally not shown.
      </text>
    </svg>
  );
}

function SpreadsheetDiagram() {
  const steps = ["Messy input", "Validate", "Normalize", "Anomaly report", "Clean output"];
  const w = 106;
  const gap = 16;
  return (
    <svg viewBox={`0 0 ${steps.length * (w + gap) + 10} 120`} className="h-auto w-full font-mono" role="img"
      aria-label="Deterministic pipeline: messy input, validate, normalize, duplicate and anomaly report, clean output">
      <Defs />
      {steps.map((step, i) => (
        <g key={step}>
          <Box x={5 + i * (w + gap)} y={38} w={w} h={44} title={step} accent={i === 3} />
          {i < steps.length - 1 && (
            <Arrow x1={5 + i * (w + gap) + w} y1={60} x2={5 + (i + 1) * (w + gap)} y2={60} />
          )}
        </g>
      ))}
      <text x={5} y={105} fontSize="9" fill={mutedFill} fontFamily="inherit">
        Deterministic rules — same input, same output. Anomalies reported, never discarded.
      </text>
    </svg>
  );
}

const diagramLabels: Record<DiagramKey, string> = {
  "control-plane": "AI Agent Control Plane architecture diagram",
  "review-workflow": "Customer follow-up workflow diagram",
  "iss-data-lake": "Generalized CitiBank engineering pattern diagram",
  spreadsheet: "Spreadsheet normalization workflow diagram",
};

export function Diagram({ name }: { name: DiagramKey }) {
  let diagram: React.ReactNode;
  switch (name) {
    case "control-plane":
      diagram = <ControlPlaneDiagram />;
      break;
    case "review-workflow":
      diagram = <ReviewWorkflowDiagram />;
      break;
    case "iss-data-lake":
      diagram = <IssDataLakeDiagram />;
      break;
    case "spreadsheet":
      diagram = <SpreadsheetDiagram />;
      break;
  }

  return (
    <div
      className="overflow-x-auto"
      role="region"
      aria-label={`${diagramLabels[name]}; scroll horizontally to inspect it at a readable size`}
      tabIndex={0}
    >
      <div className="min-w-[560px]">{diagram}</div>
      <p className="mt-2 text-[11px] text-fg-muted sm:hidden">
        Scroll horizontally to inspect the diagram at a readable size.
      </p>
    </div>
  );
}

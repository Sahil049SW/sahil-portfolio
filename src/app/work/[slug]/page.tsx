import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { ControlPlaneVisual } from "@/components/ControlPlaneVisual";
import { ReviewWorkflowDemo } from "@/components/ReviewWorkflowDemo";
import { SpreadsheetDemo } from "@/components/SpreadsheetDemo";
import { projects, getProject } from "@/content/projects";
import { canonicalUrl } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const canonical = canonicalUrl(`/work/${project.slug}`);

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
    ...(canonical ? { alternates: { canonical } } : {}),
  };
}

function projectDemo(slug: string): React.ReactNode {
  switch (slug) {
    case "ai-agent-control-plane":
      return <ControlPlaneVisual />;
    case "customer-follow-up-workflow":
      return <ReviewWorkflowDemo />;
    case "spreadsheet-workflow-automation":
      return <SpreadsheetDemo />;
    default:
      return null;
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <CaseStudyLayout project={project} demo={projectDemo(project.slug)} />;
}

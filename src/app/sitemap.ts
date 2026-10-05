import type { MetadataRoute } from "next";
import { siteOrigin } from "@/config/site";
import { projects } from "@/content/projects";

// Required for `output: "export"`: metadata routes compile to GET route
// handlers, which are dynamic by default in Next.js 15+.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // A public sitemap requires the approved production domain. Until it is
  // supplied, emit no URLs rather than advertising localhost (deployment metadata configuration).
  const origin = siteOrigin();
  if (!origin) return [];

  return [
    { url: `${origin}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${origin}/verification`, changeFrequency: "yearly", priority: 0.6 },
    ...projects.map((p) => ({
      url: `${origin}/work/${p.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

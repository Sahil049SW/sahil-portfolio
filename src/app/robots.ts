import type { MetadataRoute } from "next";
import { siteOrigin } from "@/config/site";

// Required for `output: "export"`: metadata routes compile to GET route
// handlers, which are dynamic by default in Next.js 15+.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();

  return {
    rules: { userAgent: "*", allow: "/" },
    ...(origin ? { sitemap: `${origin}/sitemap.xml` } : {}),
  };
}

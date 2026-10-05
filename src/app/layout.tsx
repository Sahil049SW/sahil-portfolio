import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { site, siteOrigin } from "@/config/site";
import { SiteHeader } from "@/components/SiteHeader";
import { Footer } from "@/components/Footer";

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-head",
  display: "swap",
});

const description =
  "Senior backend engineer with 4+ years of experience across Java, Spring Boot, Microservices, AWS and Kafka, now building AI-powered automation and agentic systems.";

const origin = siteOrigin();

export const metadata: Metadata = {
  ...(origin ? { metadataBase: new URL(origin) } : {}),
  title: {
    default: `${site.name} — ${site.positioning}`,
    template: `%s — ${site.name}`,
  },
  description,
  openGraph: {
    title: `${site.name} — ${site.positioning}`,
    description,
    type: "website",
  },
};

// JSON-LD Person schema — approved facts only (approved professional facts)
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Senior Backend Engineer",
  email: `mailto:${site.email}`,
  knowsAbout: [
    "Java",
    "Spring Boot",
    "Microservices",
    "AWS",
    "Apache Kafka",
    "AI Automation",
  ],
};

// Dark-first theme bootstrap: default dark, honor stored choice, avoid flash.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark")}else{document.documentElement.classList.add("dark")}}catch(e){document.documentElement.classList.add("dark")}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className={`${body.variable} ${display.variable} bg-bg text-fg`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

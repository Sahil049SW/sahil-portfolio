import Link from "next/link";
import { site } from "@/config/site";
import { ExternalLink } from "@/components/ExternalLink";
import { Wordmark } from "@/components/Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-3">
        <div>
          <Wordmark />
          <p className="mt-2 text-sm text-fg-muted">{site.positioning}</p>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-fg-muted">
            Prototypes are labeled as prototypes. Employment facts are supported
            by employment documentation; project details and metrics by résumé /
            project records. No invented clients, metrics, or testimonials.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-fg-muted">Site</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/#work" className="text-fg-muted transition-colors hover:text-fg">Work</Link></li>
            <li><Link href="/work/ai-agent-control-plane" className="text-fg-muted transition-colors hover:text-fg">AI Agent Control Plane</Link></li>
            <li><Link href="/work/enterprise-backend-engineering" className="text-fg-muted transition-colors hover:text-fg">Enterprise case study</Link></li>
            <li><Link href="/verification" className="text-fg-muted transition-colors hover:text-fg">Professional verification</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-fg-muted">Contact</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="text-fg-muted transition-colors hover:text-fg">
                {site.email}
              </a>
            </li>
            <li><ExternalLink target={site.linkedin}>LinkedIn</ExternalLink></li>
            <li><ExternalLink target={site.github}>GitHub</ExternalLink></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-fg-muted">
          © {new Date().getFullYear()} {site.name}. Built as a proof-driven portfolio.
        </p>
      </div>
    </footer>
  );
}

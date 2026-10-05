import { site } from "@/config/site";
import { contact } from "@/content/home";

/**
 * Contact CTA — mailto only. No backend, no form infrastructure
 * (public content policy #13).
 */
export function ContactCTA() {
  const subject = encodeURIComponent("Project inquiry — via portfolio");
  return (
    <div className="border border-border bg-surface bg-grid p-8 text-center sm:p-14">
      <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {contact.headline}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
        {contact.body}
      </p>
      <a
        href={`mailto:${site.email}?subject=${subject}`}
        className="mt-8 inline-block bg-accent px-8 py-3.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
      >
        {contact.ctaLabel}
      </a>
      <p className="mt-4 text-xs text-fg-muted">{site.email}</p>
    </div>
  );
}

import type { ExternalLinkTarget } from "@/lib/link-state";

interface ExternalLinkProps {
  target: ExternalLinkTarget;
  children: React.ReactNode;
  className?: string;
}

/**
 * External link with explicit availability state. Missing URLs stay disabled,
 * and usable URLs can only be created through the HTTPS validator.
 */
export function ExternalLink({ target, children, className }: ExternalLinkProps) {
  if (target.kind === "placeholder") {
    return (
      <span
        aria-disabled="true"
        title={target.reason}
        className="cursor-not-allowed text-fg-muted"
      >
        {children}
        <span className="ml-1 text-xs">(link pending)</span>
      </span>
    );
  }

  return (
    <a href={target.href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

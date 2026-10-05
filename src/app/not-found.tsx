import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-5 py-24 sm:py-32">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight">
        This page doesn&apos;t exist.
      </h1>
      <p className="mt-4 max-w-md text-base text-fg-muted">
        The work, the case studies, and the verification summary are all one
        click away.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/#work"
          className="border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Explore the work
        </Link>
      </div>
    </div>
  );
}

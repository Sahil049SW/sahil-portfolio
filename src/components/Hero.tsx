import Link from "next/link";
import { hero } from "@/content/home";
import { ControlPlaneVisual } from "@/components/ControlPlaneVisual";

/**
 * Hero — eyebrow → positioning statement → CTAs → proof line →
 * control-plane product visual (page architecture).
 */
export function Hero() {
  return (
    <section className="bg-grid border-b border-border">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg">
            {hero.supporting}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={hero.ctas[0].href}
              className="bg-accent px-6 py-3 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              {hero.ctas[0].label}
            </a>
            <Link
              href={hero.ctas[1].href}
              className="border border-border px-6 py-3 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
            >
              {hero.ctas[1].label}
            </Link>
          </div>
          <p className="mt-8 border-l-2 border-accent pl-4 text-sm text-fg-muted">
            {hero.proofLine}
          </p>
        </div>
        <div aria-hidden={false}>
          <ControlPlaneVisual />
          <p className="mt-3 text-center font-mono text-[11px] text-fg-muted">
            Deterministic personal prototype — no live model or tool integration.
          </p>
        </div>
      </div>
    </section>
  );
}

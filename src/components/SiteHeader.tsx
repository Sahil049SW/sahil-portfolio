"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import { ExternalLink } from "@/components/ExternalLink";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Wordmark } from "@/components/Wordmark";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Control Plane", href: "/#control-plane" },
  { label: "Automation", href: "/#automation" },
  { label: "Case Study", href: "/#case-study" },
  { label: "Experience", href: "/#experience" },
  { label: "Verification", href: "/verification" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>("a");
    firstLink?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className="flex min-w-0 items-center"
          aria-label={`${site.name} — home`}
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden shrink-0 items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {link.label}
            </Link>
          ))}
          <ExternalLink target={site.github} className="text-sm text-fg-muted transition-colors hover:text-fg">
            GitHub
          </ExternalLink>
          <ExternalLink target={site.linkedin} className="text-sm text-fg-muted transition-colors hover:text-fg">
            LinkedIn
          </ExternalLink>
          <ThemeToggle />
          <Link
            href="/#contact"
            className="bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            Start a project
          </Link>
        </nav>

        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center border border-border"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              {open ? (
                <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" ref={menuRef} className="border-t border-border bg-bg lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col px-5 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-base text-fg"
              >
                {link.label}
              </Link>
            ))}
            <ExternalLink
              target={site.github}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3 text-base text-fg"
            >
              GitHub
            </ExternalLink>
            <ExternalLink
              target={site.linkedin}
              onClick={() => setOpen(false)}
              className="border-b border-border py-3 text-base text-fg"
            >
              LinkedIn
            </ExternalLink>
            <Link
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-4 bg-accent px-4 py-3 text-center text-sm font-medium text-accent-fg"
            >
              Start a project
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

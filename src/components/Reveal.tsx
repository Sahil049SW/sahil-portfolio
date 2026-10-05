"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

/**
 * Section reveal on scroll. Instantly visible when the user prefers
 * reduced motion, and a no-op if IntersectionObserver is unavailable.
 */
export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (
      !el ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        setVisible(isVisible);
        if (isVisible) observer.disconnect();
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cx("reveal", visible && "is-visible", className)}>
      {children}
    </div>
  );
}

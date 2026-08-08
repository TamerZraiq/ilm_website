"use client";

import { useEffect } from "react";

/** Lenis is pure progressive enhancement — nothing on the page depends on it,
 *  and nobody has scrolled yet at first paint. Importing it dynamically keeps
 *  it out of the initial bundle entirely and lets it attach a beat later. */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let cleanup: (() => void) | undefined;
    let cancelled = false;

    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;

      const lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      }
      frame = requestAnimationFrame(raf);

      cleanup = () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}

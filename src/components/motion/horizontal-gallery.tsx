"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { m, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useDesktopMotion } from "@/components/motion/motion";
import { cn } from "@/lib/utils";

/**
 * Pinned horizontal scroll on desktop: the section pins and its track
 * translates sideways as you scroll down, with a progress rule underneath so
 * the visitor can see how far through the set they are.
 *
 * Falls back to a native swipe/scroll row on mobile and under reduced motion.
 *
 * The pinned and fallback states share one `trackRef`/`sectionRef` pair
 * instead of returning two separate trees keyed on `enabled`. An earlier
 * version early-returned a different subtree per state, which meant the
 * refs pointed at two different DOM nodes depending on which branch had
 * rendered — and the width-measuring effect only runs once on mount, so
 * whichever node existed at that instant is the one measured. If mount
 * happened to land on the fallback tree, `maxX` stayed 0 forever after
 * switching to the pinned tree: the section still pinned for a screen's
 * height, but the track never actually translated, so scrolling through it
 * looked exactly like scrolling straight down past a static row. Keeping
 * the same nodes across both states means there's nothing to re-measure —
 * and the ResizeObserver still self-corrects if their content ever resizes.
 *
 * Progress is driven by a manual scroll listener reading the section's live
 * `getBoundingClientRect()`, not `useScroll({ target })`. That hook caches
 * the target's scroll boundaries and, in practice, the section's own height
 * changes right after mount — it starts at a plain `100vh` and only grows to
 * `100vh + maxX` once the track has been measured a beat later. If the cache
 * doesn't pick up that resize before the user starts scrolling, the tracked
 * "end" boundary stays pinned to the original, too-small height: progress
 * hits 1 (and the cards finish translating) after the first screen-height of
 * scroll, then the user keeps scrolling through the remaining — now much
 * taller — pinned section with nothing left to reveal, which reads as a dead
 * gap before the next section arrives. Reading the rect fresh on every
 * scroll tick can't go stale, because there's nothing cached to go stale.
 */
export function HorizontalGallery({
  children,
  rtl = false,
  label,
}: {
  children: ReactNode;
  rtl?: boolean;
  /** Accessible name for the scrollable region on the touch/fallback path. */
  label?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const enabled = useDesktopMotion();
  const [maxX, setMaxX] = useState(0);

  const measure = useCallback(() => {
    if (!trackRef.current) return;
    setMaxX(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 96));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    // The track's width depends on font loading and image layout, both of
    // which can land after the first paint — a ResizeObserver catches those
    // without re-running the effect on every render the way a `children`
    // dependency would.
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [measure]);

  // Explicit re-measure on the fallback→pinned flip (typically right after
  // hydration, see the note above), on top of the ResizeObserver — belt and
  // suspenders, since this value silently breaking the whole interaction is
  // exactly the failure mode this component has already shipped once.
  useEffect(measure, [enabled, measure]);

  const rawProgress = useMotionValue(0);

  useEffect(() => {
    if (!enabled) return;

    function onScroll() {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      rawProgress.set(scrollable <= 0 ? 0 : Math.min(1, Math.max(0, -rect.top / scrollable)));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    // Re-attached whenever maxX changes so a re-measured (taller/shorter)
    // section is reflected immediately, not just on the next scroll event.
  }, [enabled, maxX, rawProgress]);

  // Critically damped so the track carries a little velocity past the wheel
  // stopping, instead of snapping 1:1 to every scroll tick.
  const progress = useSpring(rawProgress, {
    stiffness: 260,
    damping: 40,
    mass: 0.5,
  });
  const x = useTransform(progress, [0, 1], rtl ? [0, maxX] : [0, -maxX]);
  const indicator = useTransform(progress, [0, 1], [0.06, 1]);

  return (
    <div ref={sectionRef} style={enabled ? { height: `calc(100vh + ${maxX}px)` } : undefined}>
      <div
        className={cn(
          enabled
            ? "sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
            : "overflow-x-auto pb-2"
        )}
        {...(!enabled && { "data-lenis-prevent": true, role: "region", "aria-label": label, tabIndex: 0 })}
      >
        <m.div
          ref={trackRef}
          style={enabled ? { x } : undefined}
          // Same padding in both states — the fallback's scrollable row does
          // not need to match the pinned track's width for any functional
          // reason, but keeping it identical means nothing about the track's
          // own scrollWidth depends on `enabled`, which is one less thing
          // that can silently invalidate `maxX`.
          className={cn(
            "flex gap-6 px-[max(1.5rem,calc((100vw-1200px)/2))]",
            !enabled && "snap-x snap-mandatory"
          )}
        >
          {children}
        </m.div>

        {enabled && (
          <div className="mt-12 px-[max(1.5rem,calc((100vw-1200px)/2))]">
            <div aria-hidden className="h-px w-full bg-navy/10">
              <m.div
                className="h-px origin-[left] bg-gold rtl:origin-[right]"
                style={{ scaleX: indicator }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

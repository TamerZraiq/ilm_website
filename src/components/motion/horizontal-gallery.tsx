"use client";

import { useRef, useState, useEffect, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Pinned horizontal scroll on desktop: the section pins and its track
 * translates sideways as you scroll down. Falls back to a native
 * swipe/scroll row on mobile and when reduced motion is requested.
 */
export function HorizontalGallery({
  children,
  rtl = false,
}: {
  children: ReactNode;
  rtl?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [maxX, setMaxX] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    function measure() {
      const on = mq.matches && !reduce;
      setEnabled(on);
      if (trackRef.current) {
        setMaxX(
          Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 96)
        );
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduce, children, enabled]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], rtl ? [0, maxX] : [0, -maxX]);

  return (
    <div
      ref={sectionRef}
      style={enabled ? { height: `calc(100vh + ${maxX}px)` } : undefined}
    >
      {enabled ? (
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 px-[max(1.5rem,calc((100vw-1200px)/2))]"
          >
            {children}
          </motion.div>
        </div>
      ) : (
        <div className="overflow-x-auto pb-2" data-lenis-prevent>
          <div ref={trackRef} className="flex snap-x snap-mandatory gap-6 px-6">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

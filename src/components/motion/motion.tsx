"use client";

import { useRef, type ReactNode } from "react";
import {
  m,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

// Critically damped springs (bounce: 0) for the whole reveal system — no
// overshoot, but a spring's organic, velocity-aware settle reads distinctly
// different from a fixed cubic-bezier duration. Every Reveal/RevealImage on
// the site runs through this, so the choice is a house style, not a
// per-section flourish — see HeroIllustration for the one deliberate
// exception (a touch of bounce) that marks the page's single signature
// moment.
const SPRING = { type: "spring", bounce: 0, duration: 0.7 } as const;
const SPRING_IMAGE = { type: "spring", bounce: 0, duration: 0.9 } as const;
const SPRING_IMAGE_INNER = { type: "spring", bounce: 0, duration: 1.05 } as const;

/** Fade + rise as the element scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 34,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </m.div>
  );
}

/** Fade + rise on mount, not on scroll — for content that's already in the
 *  initial viewport (the hero). `whileInView` has nothing to trigger on
 *  there since the element never "scrolls into view," and it ships as an
 *  inert `opacity:0` in any render that doesn't run the intersection
 *  observer (crawlers, link-preview bots, backgrounded tabs). */
export function RevealOnLoad({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </m.div>
  );
}

/** Clip-mask image reveal: wipes open while the inner content scales down. */
export function RevealImage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <m.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: "-10%" }}
      transition={SPRING_IMAGE}
    >
      <m.div
        className="h-full w-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={SPRING_IMAGE_INNER}
      >
        {children}
      </m.div>
    </m.div>
  );
}

/** Vertical parallax drift tied to scroll position. */
export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  return (
    <div ref={ref} className={className}>
      <m.div style={reduce ? undefined : { y }} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}

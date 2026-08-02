"use client";

import { useRef, type ReactNode } from "react";
import {
  m,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

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
      transition={{ duration: 0.8, ease: EASE, delay }}
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
      transition={{ duration: 1.1, ease: EASE }}
    >
      <m.div
        className="h-full w-full"
        initial={{ scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.3, ease: EASE }}
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

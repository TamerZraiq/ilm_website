"use client";

import { m, type Variant } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

// Matches the spring house style in components/motion/motion.tsx — critically
// damped (no overshoot), so every reveal on the site settles the same way.
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: RevealProps) {
  const axis = direction === "up" ? "y" : "x";
  const distance = direction === "right" ? -40 : 40;

  const hidden: Variant = { opacity: 0, [axis]: distance };
  const visible: Variant = { opacity: 1, [axis]: 0 };

  return (
    <m.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ type: "spring", bounce: 0, duration: 0.7, delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}

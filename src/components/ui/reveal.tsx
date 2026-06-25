"use client";

import { motion, type Variant } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

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
    <motion.div
      initial={hidden}
      whileInView={visible}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroIllustration() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto aspect-[693/694] w-[74vw] max-w-[360px] sm:max-w-[440px] md:w-full md:max-w-[600px]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9, ease }}
    >
      <Image
        src="/logo-icon.svg"
        alt="Ilm Learning Center"
        fill
        priority
        unoptimized
        className="object-contain"
      />
    </motion.div>
  );
}

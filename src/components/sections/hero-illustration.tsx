"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function HeroIllustration() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto aspect-[693/694] w-60 sm:w-[336px] lg:w-[480px]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.9, ease }}
    >
      <Image
        src="/logo-icon.png"
        alt="Ilm Learning Center"
        fill
        priority
        sizes="(min-width: 1024px) 480px, (min-width: 640px) 336px, 240px"
        className="object-contain"
      />
    </motion.div>
  );
}

"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";

export function HeroIllustration() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      className="relative mx-auto aspect-[693/694] w-[74vw] max-w-[360px] sm:max-w-[440px] md:w-full md:max-w-[600px]"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      // The one deliberate exception to the site's critically-damped house
      // style: a touch of bounce marks this as the single signature moment
      // (the brand mark, first thing on screen), everything else settles clean.
      transition={prefersReducedMotion ? { duration: 0 } : { type: "spring", bounce: 0.18, duration: 1.1 }}
    >
      <Image
        src="/logo-icon.svg"
        alt="Ilm Learning Center"
        fill
        priority
        unoptimized
        className="object-contain"
      />
    </m.div>
  );
}

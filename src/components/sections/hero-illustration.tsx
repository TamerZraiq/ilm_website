"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";

/** The brand mark, and the page's one signature moment.
 *
 *  Everything else on the site settles critically damped; this alone carries
 *  a little bounce (DESIGN.md §6, "one signature moment per page"). */
export function HeroIllustration() {
  const reduce = useReducedMotion();

  return (
    <m.div
      className="relative mx-auto aspect-[693/694] w-[74vw] max-w-[340px] sm:max-w-[420px] md:w-full md:max-w-[560px]"
      initial={reduce ? false : { opacity: 0, y: 34, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 90, damping: 16, mass: 0.9 }
      }
    >
      <Image
        src="/logo-icon.svg"
        alt=""
        aria-hidden
        fill
        priority
        unoptimized
        className="object-contain"
      />
    </m.div>
  );
}

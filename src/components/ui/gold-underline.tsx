"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function GoldUnderline({ delay = 0 }: { delay?: number }) {
  return (
    <svg
      viewBox="0 0 280 12"
      fill="none"
      className="mt-1 h-3 w-full max-w-[280px]"
      aria-hidden="true"
    >
      <motion.path
        d="M2 8c20-4 45-2 70-3s55 3 80 1 50-5 75-2c15 2 30 3 50 1"
        stroke="#C9A84C"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease, delay }}
      />
    </svg>
  );
}

"use client";

import { DecorativeLeaf } from "./decorative-leaf";
import { DecorativeStar } from "./decorative-star";

interface SectionDividerProps {
  variant?: "leaf" | "star" | "line";
  className?: string;
}

export function SectionDivider({
  variant = "leaf",
  className = "",
}: SectionDividerProps) {
  return (
    <div className={`flex items-center justify-center py-4 ${className}`}>
      <div className="h-px flex-1 bg-gold/15" />
      <div className="mx-4">
        {variant === "leaf" && <DecorativeLeaf size={18} opacity={0.35} />}
        {variant === "star" && <DecorativeStar size={14} opacity={0.35} />}
        {variant === "line" && <div className="h-1.5 w-1.5 rounded-full bg-gold/25" />}
      </div>
      <div className="h-px flex-1 bg-gold/15" />
    </div>
  );
}

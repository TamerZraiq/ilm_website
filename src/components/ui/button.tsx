"use client";

import type { ComponentProps, ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { Magnetic } from "@/components/motion/motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "navy" | "onDark";
type Size = "md" | "lg";

const BASE =
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[14px] font-semibold " +
  "transition-[transform,background-color,border-color,box-shadow,filter] duration-300 ease-[var(--ease-out-expo)] " +
  "hover:scale-[1.02] active:scale-[0.97] active:duration-[120ms]";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-gold text-navy shadow-[0_1px_3px_rgba(17,30,74,0.05)] hover:brightness-[1.08] hover:shadow-[var(--shadow-glow)]",
  ghost:
    "border-[1.5px] border-navy/20 text-navy hover:border-navy/40 hover:bg-navy/[0.03]",
  navy: "bg-navy text-white hover:bg-navy-dark hover:shadow-[0_10px_30px_rgba(26,43,107,0.28)]",
  onDark:
    "border border-white/20 bg-white/10 text-white backdrop-blur-sm hover:border-gold/40 hover:bg-white/[0.16]",
};

const SIZES: Record<Size, string> = {
  md: "h-12 px-7 text-sm",
  lg: "h-14 px-9 text-[15px]",
};

/** Diagonal light sweep on hover. Gold fills only — on the ghost and dark
 *  variants there is no surface bright enough for it to read against. */
function Shimmer() {
  return (
    <span
      aria-hidden
      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[600ms] ease-[var(--ease-out-expo)] group-hover:translate-x-full"
    />
  );
}

function inner(children: ReactNode, variant: Variant) {
  return (
    <>
      {variant === "primary" && <Shimmer />}
      <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
    </>
  );
}

interface Common {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
  children: ReactNode;
}

/** External / `href`-based action (WhatsApp, Maps, anchors). */
export function ButtonLink({
  variant = "primary",
  size = "md",
  magnetic = true,
  className,
  children,
  ...props
}: Common & ComponentProps<"a">) {
  const el = (
    <a className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      {inner(children, variant)}
    </a>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

/** Internal, locale-aware route. */
export function ButtonRoute({
  variant = "ghost",
  size = "md",
  magnetic = true,
  className,
  children,
  href,
}: Common & { href: ComponentProps<typeof Link>["href"] }) {
  const el = (
    <Link href={href} className={cn(BASE, VARIANTS[variant], SIZES[size], className)}>
      {inner(children, variant)}
    </Link>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

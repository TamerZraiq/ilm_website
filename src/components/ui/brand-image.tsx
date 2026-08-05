import Image from "next/image";
import { cn } from "@/lib/utils";
import { BLUR_PLACEHOLDERS } from "@/lib/blur-placeholders";

const PLACEHOLDER: Record<number, string> = {
  1: "linear-gradient(150deg,#2A3D8F,#111E4A), radial-gradient(circle at 28% 30%, rgba(201,168,76,.28), transparent 55%)",
  2: "radial-gradient(circle at 70% 22%, rgba(212,184,106,.32), transparent 52%), linear-gradient(160deg,#243684,#141f52)",
  3: "linear-gradient(120deg,#1A2B6B,#0e1a44), radial-gradient(circle at 22% 78%, rgba(201,168,76,.24), transparent 55%)",
  4: "radial-gradient(circle at 50% 30%, #2f4396, #101c48)",
  5: "linear-gradient(145deg,#26397f,#111e4a), radial-gradient(circle at 80% 70%, rgba(201,168,76,.22), transparent 50%)",
  6: "linear-gradient(135deg,#1d2f72,#0f1a45), radial-gradient(circle at 25% 25%, rgba(212,184,106,.24), transparent 55%)",
};

interface BrandImageProps {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  figNumber?: string;
  figLabel?: string;
  variant?: number;
  overlay?: "soft" | "strong" | "none";
  rounded?: string;
}

export function BrandImage({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority,
  figNumber,
  figLabel,
  variant = 1,
  overlay = "soft",
  rounded = "rounded-2xl",
}: BrandImageProps) {
  return (
    <figure
      className={cn(
        "relative overflow-hidden border border-navy/10 bg-navy-dark",
        rounded,
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={BLUR_PLACEHOLDERS[src] ? "blur" : "empty"}
          blurDataURL={BLUR_PLACEHOLDERS[src]}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundImage: PLACEHOLDER[variant] ?? PLACEHOLDER[1] }}
        />
      )}

      {overlay !== "none" && (
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 mix-blend-multiply",
            overlay === "strong"
              ? "bg-gradient-to-br from-navy/40 to-navy-dark/60"
              : "bg-gradient-to-br from-navy/15 to-navy-dark/35"
          )}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 90px rgba(17,30,74,0.35)" }}
      />

      {(figNumber || figLabel) && (
        <figcaption className="absolute bottom-4 start-4 z-[2] text-white">
          {figNumber && (
            <span className="block text-[10px] font-semibold uppercase tracking-[3px] text-gold-light">
              {figNumber}
            </span>
          )}
          {figLabel && (
            <span className="block text-sm font-semibold">{figLabel}</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}

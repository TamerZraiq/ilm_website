"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { RevealImage } from "@/components/motion/motion";
import { BrandImage } from "@/components/ui/brand-image";
import { cn } from "@/lib/utils";

/** Muted, looping, self-playing clip framed to match BrandImage tiles.
 *  Loading is deferred until the clip is close to entering the viewport,
 *  so visitors who never scroll this far never pay for the download. */
export function AutoVideo({
  src,
  className,
  label,
}: {
  src: string;
  className?: string;
  label?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className={cn("relative overflow-hidden bg-navy-dark", className)}>
      <video
        ref={ref}
        src={shouldLoad ? src : undefined}
        autoPlay={shouldLoad}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ boxShadow: "inset 0 0 90px rgba(17,30,74,0.35)" }}
      />
      {label && (
        <figcaption className="absolute bottom-4 start-4 z-[2]">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[2px] text-gold-light backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-light opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold-light" />
            </span>
            {label}
          </span>
        </figcaption>
      )}
    </figure>
  );
}

const POS = [
  "md:col-start-1 md:row-start-1",
  "md:col-start-1 md:row-start-2",
  "md:col-start-4 md:row-start-1",
  "md:col-start-4 md:row-start-2",
] as const;

/** Two photo columns flanking a self-playing reel. Reflows from a single
 *  mobile column to a 3-column desktop grid. Expects exactly four photos. */
export function FamilyMosaic({
  video,
  photos,
  badgeKey,
}: {
  video: string;
  photos: readonly { src: string; altKey: string }[];
  badgeKey?: string;
}) {
  const t = useTranslations();
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2 md:h-[560px] lg:h-[620px]">
      <RevealImage className="order-first col-span-2 mx-auto aspect-[9/16] w-[72%] max-w-[290px] overflow-hidden rounded-2xl border border-navy/10 md:order-none md:col-span-2 md:col-start-2 md:row-span-2 md:mx-0 md:aspect-auto md:h-full md:w-full md:max-w-none">
        <AutoVideo
          src={video}
          label={badgeKey ? t(badgeKey) : undefined}
          className="h-full w-full"
        />
      </RevealImage>
      {photos.slice(0, 4).map((p, i) => (
        <RevealImage
          key={p.src}
          className={cn(
            "aspect-[4/5] overflow-hidden rounded-2xl md:aspect-auto md:h-full",
            POS[i]
          )}
        >
          <BrandImage
            src={p.src}
            alt={t(p.altKey)}
            overlay="none"
            className="h-full w-full"
            sizes="(min-width: 768px) 22vw, 45vw"
          />
        </RevealImage>
      ))}
    </div>
  );
}

"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import {
  m,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/* ─────────────────────────────────────────────────────────────────────────
 * Motion language — see DESIGN.md §6.
 *
 * Three classes, and every export below belongs to exactly one:
 *   1. Entrance     one-shot, fires once, critically damped
 *   2. Scroll-linked  continuously bound to scroll, always spring-smoothed
 *   3. Interactive    pointer/press response, always under 200ms
 * ───────────────────────────────────────────────────────────────────────── */

/** Entrance spring. Critically damped — organic settle, zero overshoot. */
const SPRING = { type: "spring", stiffness: 120, damping: 22, mass: 0.6 } as const;
/** Scroll-linked smoothing. Tight enough to feel directly driven, loose
 *  enough that the track carries a little velocity past the wheel stopping. */
const SPRING_SCROLL = { stiffness: 260, damping: 40, mass: 0.5 } as const;

/**
 * Vertical-only intersection margin, e.g. "-10% 0px" (top/bottom/left/right).
 * A single percentage shrinks the trigger zone on *all four sides*, not just
 * top/bottom — on a wide multi-column row, items sitting near the browser's
 * left or right edge (the mosaic's outer photos, the curriculum gallery's
 * edge cards) then sit outside that shrunk zone and never fire, which reads
 * as "half the images are just missing." Restricting the margin to the
 * vertical axis keeps the "trigger a beat before it's fully in view" timing
 * without punishing anything for its horizontal position.
 */
const VIEWPORT_MARGIN = "-10% 0px";
const VIEWPORT_MARGIN_LG = "-12% 0px";

const DESKTOP_QUERY = "(min-width: 768px) and (pointer: fine)";

/** Subscribes to a media query without an effect, so there's no cascading
 *  render on mount and the server snapshot is unambiguous. */
function subscribeToQuery(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** Heavy scroll-linked work is desktop-only: a fine pointer, a wide viewport,
 *  and no reduced-motion request. Mobile gets the same composition with
 *  entrance motion alone (DESIGN.md §9). */
export function useDesktopMotion(): boolean {
  const reduce = useReducedMotion();
  const wide = useSyncExternalStore(
    subscribeToQuery,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    // Server render assumes the conservative path; React re-checks on hydration.
    () => false
  );
  return wide && !reduce;
}

/** Scroll progress through an element, 0 at first contact → 1 at last,
 *  spring-smoothed. The shared primitive behind every scroll-linked effect. */
export function useSectionProgress(
  ref: React.RefObject<HTMLElement | null>,
  offset: ["start end", "end start"] | ["start start", "end end"] = [
    "start end",
    "end start",
  ]
): MotionValue<number> {
  const { scrollYProgress } = useScroll({ target: ref, offset });
  return useSpring(scrollYProgress, SPRING_SCROLL);
}

/* ── 1. Entrance ──────────────────────────────────────────────────────── */

/** Fade + rise as the element scrolls into view.
 *
 *  Use it for the *first* element of a section and let `Stagger` carry the
 *  rest — an entrance on every individual element is the saturated default
 *  this system exists to avoid. */
export function Reveal({
  children,
  delay = 0,
  y = 34,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: VIEWPORT_MARGIN_LG }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </m.div>
  );
}

/** Fade + rise on mount, not on scroll — for content that's already in the
 *  initial viewport (the hero). `whileInView` has nothing to trigger on there
 *  since the element never "scrolls into view," and it ships as an inert
 *  `opacity:0` in any render that doesn't run the intersection observer
 *  (crawlers, link-preview bots, backgrounded tabs). */
export function RevealOnLoad({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      data-reveal
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...SPRING, delay }}
    >
      {children}
    </m.div>
  );
}

/** Choreography container. Children animate in sequence off one trigger
 *  rather than each carrying a hand-computed `delay` — which is what makes a
 *  group read as one orchestrated gesture instead of N independent elements.
 *
 *  Pair with `StaggerItem`. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "ul" ? m.ul : as === "ol" ? m.ol : m.div;
  return (
    <Tag
      className={className}
      initial={reduce ? undefined : "hidden"}
      whileInView={reduce ? undefined : "shown"}
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      variants={{
        hidden: {},
        shown: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </Tag>
  );
}

/** A child of `Stagger`. Inherits the parent's timing; carries no delay of
 *  its own. `anticipate` adds a small counter-move before the travel —
 *  reserve it for the one or two moments per page that carry real weight. */
export function StaggerItem({
  children,
  className,
  y = 28,
  anticipate = false,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  anticipate?: boolean;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const Tag = as === "li" ? m.li : m.div;
  if (reduce) return <Tag className={className}>{children}</Tag>;
  return (
    <Tag
      data-reveal
      className={className}
      variants={{
        hidden: { opacity: 0, y: anticipate ? -y * 0.14 : y },
        shown: { opacity: 1, y: 0, transition: SPRING },
      }}
    >
      {children}
    </Tag>
  );
}

/** Clip-mask image reveal: the frame wipes open while the content inside
 *  scales down from 1.12. The two run at deliberately different speeds so
 *  the frame arrives before the image settles (DESIGN.md §7). */
export function RevealImage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)" }}
      whileInView={{ clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, margin: VIEWPORT_MARGIN }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <m.div
        className="h-full w-full"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: VIEWPORT_MARGIN }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </m.div>
    </m.div>
  );
}

/* ── 2. Scroll-linked ─────────────────────────────────────────────────── */

/** Vertical parallax drift tied to scroll position. */
export function Parallax({
  children,
  speed = 40,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useDesktopMotion();
  const progress = useSectionProgress(ref);
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  return (
    <div ref={ref} className={className}>
      <m.div style={active ? { y } : undefined} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}

/** Scroll-linked scale + fade, for media that should feel like it settles
 *  into place rather than simply appearing. */
export function ScrollScale({
  children,
  className,
  from = 0.92,
}: {
  children: ReactNode;
  className?: string;
  from?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const smooth = useSpring(scrollYProgress, SPRING_SCROLL);
  const scale = useTransform(smooth, [0, 1], [from, 1]);
  return (
    <div ref={ref} className={className}>
      <m.div style={active ? { scale } : undefined} className="h-full w-full">
        {children}
      </m.div>
    </div>
  );
}

function LitWord({
  word,
  progress,
  start,
  end,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
}) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const y = useTransform(progress, [start, end], [8, 0]);
  return (
    <m.span style={{ opacity, y }} className="inline-block">
      {word}
      {" "}
    </m.span>
  );
}

/** Word-by-word illumination driven by scroll position — the page's
 *  typographic centrepiece. Each word brightens as it passes through the
 *  viewport, so the sentence is *read* by the scroll rather than dropped in
 *  by a fade.
 *
 *  Falls back to plain, fully-lit text when scroll-linked motion is off, so
 *  the sentence is never left at 16% opacity. */
export function ScrollLitText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const active = useDesktopMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const progress = useSpring(scrollYProgress, SPRING_SCROLL);

  const words = text.split(" ");

  if (!active) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <LitWord
          key={`${word}-${i}`}
          word={word}
          progress={progress}
          start={i / words.length}
          end={(i + 1) / words.length}
        />
      ))}
    </p>
  );
}

/** Infinite horizontal ticker. Children are rendered twice — the duplicate
 *  is `aria-hidden` so the loop is purely visual — and the CSS track
 *  translates exactly -50%, which lands the copy where the original started.
 *  Pauses on hover; stops entirely under reduced motion (globals.css). */
export function Marquee({
  children,
  className,
  duration = 46,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <div className={`marquee-viewport overflow-hidden ${className ?? ""}`}>
      <div
        className="marquee-track"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ── 3. Interactive ───────────────────────────────────────────────────── */

/** Pointer-following pull. The child drifts toward the cursor while it's
 *  within the element, then springs home on leave — the interaction that
 *  makes a button feel physical rather than rectangular.
 *
 *  Desktop pointers only: on touch there is no hover state to respond to,
 *  and the transform would only fight the tap. */
export function Magnetic({
  children,
  className,
  strength = 0.28,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  max?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const active = useDesktopMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLSpanElement>) {
    if (!active || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * strength;
    const dy = (e.clientY - (r.top + r.height / 2)) * strength;
    mx.set(Math.max(-max, Math.min(max, dx)));
    my.set(Math.max(-max, Math.min(max, dy)));
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <m.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={active ? { x, y } : undefined}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </m.span>
  );
}

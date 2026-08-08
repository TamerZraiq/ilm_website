---
name: Ilm Learning Center
description: Bilingual (AR-primary / EN) marketing site for a Palestine-based tutoring centre — GCSE, A-Level, IB, Tawjihi, SAT and nine more curricula
colors:
  navy: "#1A2B6B"
  navy-light: "#2A3D8F"
  navy-dark: "#111E4A"
  navy-deep: "#0B1234"
  gold: "#C9A84C"
  gold-light: "#D4B86A"
  gold-dark: "#A8882E"
  gold-ink: "#6E5615"
  warm-bg: "#F7F5F0"
  warm-deep: "#EFEBE2"
  card-white: "#FFFFFF"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.4vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.045em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(1rem, 0.97rem + 0.15vw, 1.0625rem)"
    fontWeight: 400
    lineHeight: 1.7
  arabic:
    fontFamily: "Tajawal, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.85
rounded:
  sm: "6px"
  md: "10px"
  lg: "14px"
  xl: "20px"
  2xl: "28px"
---

# Design Language: Ilm Learning Center

This document is the contract. Code conforms to it, not the other way round.
If a section can't be built without breaking a rule here, the rule gets
amended deliberately — it doesn't get quietly ignored.

---

## 1. Visual philosophy

**North star: "The Open Hand."**

The brand mark is a navy hand offering gold leaves and stars upward. That is
the entire thesis — *knowledge given freely, growth made visible.* Two ideas
fall out of it, and every design decision on this site answers to one of them:

1. **Offering.** Gold is the colour of the thing being given. It appears where
   something is being handed to the visitor — a CTA, a signal, a name. It is
   never wallpaper.
2. **Growth.** The page should feel like it *ascends*. It opens warm and
   grounded, opens further as you scroll, and finishes at its most confident.
   The last screen is the loudest, not the first.

**Register.** A serious institution that happens to be warm. The reference is
a well-made prospectus for an international school — editorial, confident,
unhurried — not a SaaS pricing page and not a startup landing template.

**What this site is explicitly not.** No gradient text. No stacked uppercase
eyebrows above every section. No identical icon-card grids repeated down the
page. No invented statistics or counters. No stock photography. No decorative
emoji. If a section could be lifted into a different company's site by swapping
the copy, it is not finished.

---

## 2. Composition

The single biggest quality signal on this site is that **no two sections share
a layout**. A visitor scrolling should never be able to predict the shape of
what's coming next.

### The section-identity rule

Every section must be distinguishable from every other section by **at least
two** of these axes:

| Axis | Options |
| --- | --- |
| Container | Contained (max-w-6xl) · Wide (max-w-7xl) · Full-bleed · Asymmetric offset |
| Ground | Warm paper · White · Navy · Navy-deep |
| Alignment | Left/start · Centred · Split · Staggered |
| Reading direction | Vertical stack · Horizontal track · Sticky/scroll-past |
| Type role | Type as label · Type as content · **Type as the artwork** |

A section that is "contained + white + left-aligned + vertical stack + type as
label" is the default shape. **At most one section per page may be it.**

### Bleed and overlap

Premium composition comes from things crossing their boundaries. Use:

- **Media that bleeds** past the text container (full-width, or one edge only).
- **Overlap** — a heading that sits over the top edge of an image; a card that
  hangs into the section below.
- **Negative offset** — content pulled up into the previous section's padding
  (`-mt-*`) so the seam disappears.

Hard, full-width horizontal seams between coloured sections are the "stacked
document" tell. Every colour change should be softened by *something* crossing
it — a bleeding image, an overhanging card, a gradient transition band.

### The spacing rhythm

Uniform spacing is the mathematical-correctness trap. Sections do not all get
`py-24 lg:py-32`. Instead, pick one of three rhythms per section and alternate
deliberately so the page breathes unevenly:

| Rhythm | Token | Use for |
| --- | --- | --- |
| **Compressed** | `--space-section-tight` (clamp 3rem→4rem) | Sections that continue the previous thought — a caption to what came before |
| **Standard** | `--space-section` (clamp 4.5rem→6rem) | Most content sections |
| **Expansive** | `--space-section-loose` (clamp 6rem→8.5rem) | The page's few big moments — the statement, the finale |

Two consecutive sections must not use the same rhythm.

**Within** a section, the vertical scale is `4 / 8 / 12 / 20 / 32 / 56 / 88`px —
a rounded Fibonacci-ish ramp. Gaps get *tighter* as elements get more related
(label→heading = 12px; heading→body = 20px; heading-block→content = 56px).

### The grid

12 columns, `max-w-6xl` (1152px) default, `max-w-7xl` (1280px) for wide
sections. Editorial layouts should use **unequal** column splits — 7/5, 8/4,
5/7 — never 6/6. A 50/50 split reads as a Bootstrap default.

---

## 3. Typography

**Latin:** Plus Jakarta Sans. **Arabic:** Tajawal. Neither is a fallback for
the other; each language gets its own native face at matching weight and warmth.

### The scale

Fluid, `clamp()`-driven, defined as CSS custom properties in `globals.css`:

| Token | Size | Role |
| --- | --- | --- |
| `--fs-mega` | clamp(3rem, 9vw, 7.5rem) | **Type as artwork** — the statement, the finale, background wordmarks |
| `--fs-display` | clamp(2.5rem, 5.4vw, 4.25rem) | Hero H1, page H1s |
| `--fs-h2` | clamp(1.875rem, 3.4vw, 2.75rem) | Section headings |
| `--fs-h3` | clamp(1.125rem, 1.6vw, 1.375rem) | Card and item headings |
| `--fs-lead` | clamp(1.0625rem, 1.4vw, 1.25rem) | Section intro paragraphs |
| `--fs-body` | clamp(1rem, 0.97rem + 0.15vw, 1.0625rem) | Body copy |
| `--fs-micro` | 0.75rem | Labels, kickers, meta |

### Optical rules

- **Letter-spacing tightens as size grows.** `--fs-mega` and `--fs-display`
  run at `-0.045em`; `--fs-h2` at `-0.03em`; body at `0`. Large type set at
  default tracking is the single most common amateur tell.
- **Line-height loosens as size shrinks.** Display `0.95`, H2 `1.05`,
  body `1.7`.
- **Arabic runs one notch looser** on line-height (`1.85` body) — Tajawal's
  ascenders and descenders need the room — and **never** takes negative
  letter-spacing. Arabic script is joined; tracking breaks the joins.
  This is enforced by `[dir="rtl"]` overrides, not left to each component.
- **Measure:** 60–70ch for body, 20–26ch for display headings. Long headings
  get `text-balance`; paragraphs get `text-pretty`.

### Type as artwork

At least twice per page, typography must be the *primary* visual element —
not a label on top of one. That means `--fs-mega`, set tight, either as the
subject itself (the statement section) or as a low-opacity ground the content
sits on (section wordmarks, oversized numerals).

### The ch-unit trap

`max-w-[Nch]` must go **on the element that carries the font-size**, never
on a wrapper around it. `ch` resolves against whichever element it's
declared on — a wrapper with no type class inherits body text size, so a
heading nested inside it gets capped against a ~17px measure instead of its
own 44–68px one, collapsing its box to roughly a quarter of the intended
width and forcing a short heading into far more lines than it needs. This
already happened three times in one pass. If a heading and a wrapper need
different measures, cap each element individually — never cap the parent
and assume it propagates correctly to a differently-sized child.

### The one-eyebrow rule

At most one uppercase letter-spaced label per page. The hero's is the
deliberate instance. Section kickers on cards are **not** exempt from the
spirit of this — where they appear, they must be doing real work
(distinguishing GCSE "Years 10–11" from IB "Diploma"), not decorating.

---

## 4. Colour

Two hues, full stop. Navy carries authority; gold carries the offer.

### Roles

- **Institutional Navy `#1A2B6B`** — primary text, dark grounds, the mark.
- **Navy Dark `#111E4A`** / **Navy Deep `#0B1234`** — layered dark surfaces.
  Two dark values let dark sections have internal depth instead of one flat field.
- **Signal Gold `#C9A84C`** — fills and lines on dark or mid grounds; the
  brand's accent shape language.
- **Gold Ink `#6E5615`** — **the only gold permitted for small text on light
  grounds.** `#C9A84C` on white is 2.29:1 and fails WCAG AA outright; this is
  not negotiable and not a matter of taste.
- **Warm Paper `#F7F5F0`** / **Warm Deep `#EFEBE2`** — the light grounds.

### Contrast floor (verified, not assumed)

| Combination | Ratio | Verdict |
| --- | --- | --- |
| navy on warm | 12.0 | pass |
| navy/70 on warm | 5.0 | pass — this is the muted-text floor |
| navy/60 on warm | 3.8 | **large text only** |
| navy/50 on warm | 2.9 | **never for text** |
| gold on white | 2.3 | **never for text** |
| gold-ink on white | 6.5 | pass |
| gold on navy | 5.7 | pass |
| white/65 on navy | 6.4 | pass |

**Rule:** muted body text bottoms out at `navy/70`. Anything lighter is
decoration, not information.

### The single-accent rule

Gold fills at most one element per viewport at full saturation. Everywhere
else it is a hairline, a small mark, or a low-opacity decorative shape.

---

## 5. Depth and materials

The old system was flat by policy. That policy is what made everything sit on
one plane. The new system has **four depth planes**, and every element declares
which one it lives on:

| Plane | Treatment | Contents |
| --- | --- | --- |
| **0 — Ground** | Flat colour, optional grain | Section backgrounds |
| **1 — Atmosphere** | Blurred colour fields, oversized watermark type, decorative marks, all under 12% opacity | Behind content, never interactive |
| **2 — Content** | Text, images, media | The actual page |
| **3 — Lifted** | Hairline border + ambient shadow; gains lift + shadow on hover | Cards, controls, anything clickable |

**Materials:**

- **Grain.** A single 0.025-opacity SVG noise overlay on dark sections. It is
  what stops a large navy field reading as flat digital colour. Applied via the
  `.grain` utility — one definition, never re-rolled per section.
- **Glass.** `backdrop-blur` + white/5 fill, on dark grounds only. Must go
  solid under `prefers-reduced-transparency`.
- **Gradient transitions.** Where two coloured sections meet, a 6–10rem
  gradient band carries one into the other rather than a hard edge.

### Shadow vocabulary

- **Ambient** `0 1px 3px rgba(17,30,74,.05)` — resting card.
- **Lift** `0 18px 45px -12px rgba(17,30,74,.18)` — hover on interactive cards.
- **Gold glow** `0 8px 30px rgba(201,168,76,.35)` — gold buttons on hover only.

**Hover earns shadow.** Nothing carries a resting shadow heavier than ambient.
And nothing gets a hover-lift unless it is genuinely clickable — a lift on
static content is a lie about affordance.

---

## 6. Motion

Motion is the axis where "developer-built" and "designed" diverge most
visibly. The distinction:

> A developer animation says *"this element has entered."*
> A designed animation says *"this content matters, and here is how."*

### The three motion classes

**1. Entrance** — one-shot, fires once, `viewport: { once: true }`.
Critically-damped spring, no bounce. Used sparingly: an entrance on *every*
element is the AI-default tell. Reserve it for the first element of a section
and let stagger carry the rest.

The trigger margin must be vertical-only (`"-10% 0px"`), never a bare
percentage. A single percentage shrinks the trigger zone on *all four
sides*, including left/right — on a wide row, items sitting near the
browser's edge then sit outside that shrunk zone and never fire, which
looks exactly like the content is missing.

**2. Scroll-linked** — continuously bound to scroll position. Parallax,
progress tracks, word-by-word text illumination, pinned horizontal travel.
This is the class that makes a site feel authored. It must be smoothed through
a spring (`useSpring`), never mapped 1:1 to raw scroll.

**3. Interactive** — responds to pointer/press. Magnetic pull, hover lift,
press compression. Must be interruptible and must never exceed 200ms.

### Timing and easing

| Token | Value | Use |
| --- | --- | --- |
| `--ease-out-expo` | `cubic-bezier(.16,1,.3,1)` | Entrances, reveals |
| `--ease-in-out-quint` | `cubic-bezier(.83,0,.17,1)` | State changes, menus |
| `--ease-spring` | `cubic-bezier(.34,1.56,.64,1)` | Playful accents only |
| Spring (default) | `{ stiffness: 120, damping: 22, mass: .6 }` | Entrances |
| Spring (scroll) | `{ stiffness: 260, damping: 40, mass: .5 }` | Scroll-linked smoothing |
| Press | `120ms` | Active/press feedback |

**Durations by distance:** the further a thing travels, the longer it takes.
A 4px hover shift is 150ms; a 40px entrance is 700ms; a full-height mask wipe
is 1000ms. Uniform 300ms on everything is the developer default.

### One reveal driver per block

A block gets exactly one entrance mechanism, not two layered on each other.
A parent scroll-linked scale (`ScrollScale`) and five children each running
their own one-shot `RevealImage` inside it is not "extra polish" — it's five
independent `IntersectionObserver`s racing an already-animating parent, and
in practice they don't all resolve together: some settle, others stay
clipped to zero indefinitely, which reads as content silently missing. If a
block already has a parent-level entrance, its children render plainly and
let the parent carry the motion.

### Choreography

- **Stagger children, don't delay siblings.** A parent variant with
  `staggerChildren` is the correct primitive. Hand-passing `delay={i * 0.1}`
  to each item is the thing it replaces.
- **Anticipation.** Meaningful reveals may start with a 2–4% counter-move
  before travelling. Not on everything — on the one or two moments per page
  that carry weight.
- **Velocity carries.** Scroll-linked transforms run through a spring so the
  track keeps moving briefly after the wheel stops.
- **One signature moment per page.** The home page's is the hero mark's
  bounce-in. Everything else settles clean.

### Reduced motion

`prefers-reduced-motion: reduce` is not a degraded experience — it's a
different, still-complete one. Entrances render at their final state (no
opacity:0 shipped in HTML). Scroll-linked transforms become static. Parallax
becomes flat. Marquees stop. Interactive feedback (hover, press) stays.

---

## 7. Components

### Buttons

- **Primary** — gold fill, navy text, `rounded-lg` (14px), 14px/32px padding,
  semibold. Hover: brightness +8%, gold glow, `scale(1.02)`, shimmer sweep.
  Press: `scale(0.97)` at 120ms. Desktop pointer: magnetic pull up to 6px.
- **Ghost** — transparent, 1.5px navy/20 border, navy text. Hover deepens
  border and adds 3% navy tint.
- **On dark** — white/10 glass fill with white/20 hairline.
- **Focus** — every interactive element gets a visible
  `focus-visible` gold ring at 2px with a 2px offset. No exceptions, no
  `outline: none` without a replacement.

### Cards

Cards are permitted but must not be the default answer. Where a card *is*
right (a grid of twelve curricula genuinely is a directory), it gets:
`rounded-xl`, hairline navy/8 border, white fill, ambient shadow, `p-8`.
Interactive cards additionally get lift-on-hover and a gold border tint.

Where a card is **not** right: testimonials (use editorial pull-quotes),
process steps (use a staggered editorial sequence), value statements (use
typographic hierarchy).

### Media

Images sit in `rounded-2xl` frames with a hairline navy/10 border and an
inset navy vignette that ties every photo to the palette regardless of what
was shot. Reveals wipe open via `clip-path` while the inner image scales down
from 1.12 — the two speeds are deliberately different so the frame arrives
before the content settles.

### Navigation

Sticky, transparent at rest, white/85 + blur once scrolled with a soft shadow
(never a hard border). A gold scroll-progress hairline sits at its bottom
edge. Active link marked by a gold underline that animates between links via
a shared layout transition. Mobile is a full drawer with focus trap, Escape
to close, and scroll lock.

---

## 8. Bilingual (RTL) rules

Arabic is the **primary** locale — served at the bare root, no prefix. It is
not a translation layer over an English design.

- Use **logical properties everywhere**: `ps/pe`, `ms/me`, `start/end`,
  `border-s/border-e`. Physical `left/right` in a component is a bug.
- Directional icons (arrows, chevrons) mirror with `rtl:rotate-180` or an
  explicit locale check. Non-directional icons never mirror.
- Horizontal scroll tracks and parallax travel reverse direction in RTL.
- Arabic gets looser line-height and zero letter-spacing (see §3).
- **Every section is checked in both directions before it's called done.**

---

## 9. Performance budget

Craft is not an excuse for a slow site — the audience is on mobile in
Palestine, not on a design-studio fibre line.

- **First Load JS** ≤ 270KB gzip per route. Currently ~254–266KB; this is
  the ceiling, not headroom.
- **No new runtime dependencies** for visual effects. Framer Motion and Lenis
  are already in the bundle; everything else is CSS.
- **Heavy scroll-linked effects are desktop-only** — gated behind
  `(min-width: 768px)` and `(pointer: fine)`. Mobile gets the same composition
  with entrance motion only.
- Images self-hosted, `next/image`, blur placeholders, explicit `sizes`.
- Video lazy-loaded via IntersectionObserver, `preload="none"`, never
  autoplaying above the fold.

---

## 10. Definition of done

A section is finished when all of these are true:

1. Its layout is distinguishable from every other section on at least two axes (§2).
2. It uses one of the three spacing rhythms, and not the same one as its neighbour.
3. Its motion belongs to a named class (§6) and isn't a fade-and-rise by default.
4. It renders correctly in `dir="rtl"` with Tajawal.
5. Every text colour in it clears the §4 contrast floor.
6. Every interactive element in it has a visible focus state.
7. With `prefers-reduced-motion: reduce`, it is complete and readable —
   nothing stuck at `opacity: 0`.
8. It contains no invented facts, no placeholder statistics, and no emoji.

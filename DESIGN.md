---
name: Ilm Learning Center
description: Bilingual (EN/AR) marketing site for a Palestine-based GCSE/A-Level/IB/Tawjihi tutoring center
colors:
  navy: "#1A2B6B"
  navy-light: "#2A3D8F"
  navy-dark: "#111E4A"
  gold: "#C9A84C"
  gold-light: "#D4B86A"
  gold-dark: "#A8882E"
  warm-bg: "#F7F5F0"
  card-white: "#FFFFFF"
  muted-surface: "#F0EDE6"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "clamp(2.2rem, 5vw, 56px)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
  arabic:
    fontFamily: "Cairo, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "3px"
rounded:
  sm: "calc(0.625rem * 0.6)"
  md: "calc(0.625rem * 0.8)"
  lg: "0.625rem"
  xl: "calc(0.625rem * 1.4)"
  2xl: "calc(0.625rem * 1.8)"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.navy}"
    rounded: "{rounded.lg}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.gold-light}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.navy}"
    rounded: "{rounded.lg}"
    padding: "12px 28px"
---

# Design System: Ilm Learning Center

## 1. Overview

**Creative North Star: "The Open Hand"**

The brand mark — a navy hand offering gold leaves and stars upward — is the entire visual thesis: knowledge given freely, growth made visible. The system built around it should feel like a serious, established institution that happens to be warm rather than corporate: think a well-run international school's prospectus, not a SaaS pricing page. Navy carries authority and trust; gold is used sparingly as the signal of distinction (the thing being "offered" — a CTA, a credential, a highlight), never as a background flood.

The system explicitly rejects the generic 2025/2026 AI-landing-page grammar: no gradient text, no uppercase tracked eyebrows stacked above every section, no numbered 01/02/03 scaffolding on content that isn't a real sequence, no identical icon-card grids repeated section after section, no fabricated stat counters. Where the current build leans on these patterns, that is a known liability for the audit to flag, not a brand decision to preserve.

**Key Characteristics:**
- Two-color discipline: navy + gold, no added accent hues.
- Warm off-white body background (#F7F5F0), not stark white, not cream-as-AI-default — it is the brand's own tint, not a cliché reach.
- Generous whitespace; density stays low even with nine parallel program tracks (GCSE/A-Level/IB/Tawjihi/SAT/IELTS/AP/CLEP/School Curriculum) to document — the scattered-typography treatment on "What We Teach" exists specifically to hold that many names without feeling like a directory listing.
- Bilingual-native: every layout decision is tested in both LTR (English/Jakarta Sans) and RTL (Arabic/Cairo).

## 2. Colors

The palette is deliberately narrow: one authority color, one distinction color, warm neutrals to host them.

### Primary
- **Institutional Navy** (#1A2B6B): primary text color, header/footer background, the hand mark, primary buttons' text. Carries the brand's authority.
- **Navy Light** (#2A3D8F): hover/active states on navy surfaces, secondary emphasis.
- **Navy Dark** (#111E4A): deepest contrast moments — footer base, dark-mode-adjacent surfaces.

### Secondary
- **Signal Gold** (#C9A84C): the "offering" color — primary CTA fills, active nav underline, accent dividers, the leaves/stars in the mark. Used as fill on small, high-intent surfaces only.
- **Gold Light** (#D4B86A): hover state for gold-filled buttons.
- **Gold Dark** (#A8882E): pressed/active states, text-on-gold when contrast requires it.

### Neutral
- **Warm Paper** (#F7F5F0): page background — the brand's own warm-neutral tint, not a default cream.
- **Card White** (#FFFFFF): card and popover surfaces, sits one step lighter than the page to create layering without shadow.
- **Muted Surface** (#F0EDE6): subtle section banding, disabled states.
- **Navy/50% (muted-foreground)**: body copy at reduced emphasis (rgba(26,43,107,0.5)) — verify this against the 4.5:1 contrast floor wherever it sits on #F7F5F0 or #FFFFFF; at 50% navy-on-warm it is close to the line and is a documented audit risk, not a settled pass.

### Named Rules
**The Single-Accent Rule.** Gold fills no more than one element per viewport at full saturation (one button, one underline, one icon). Everywhere else gold appears as a thin line, small icon, or low-opacity decorative shape — never as a second background color competing with navy.

## 3. Typography

**Display Font:** Plus Jakarta Sans (with system-ui, sans-serif fallback)
**Body Font:** Plus Jakarta Sans (same family, lighter weights)
**Arabic Font:** Cairo (with system-ui, sans-serif fallback) — swaps in fully for `dir="rtl"`, not a fallback patch on the Latin stack.

**Character:** A single confident geometric-humanist sans carries both display and body — Jakarta Sans reads modern and credible without the coldness of a pure geometric face like Inter. Cairo is its Arabic counterpart at matching weight and warmth, chosen so neither language reads as the "translated" afterthought.

### Hierarchy
- **Display** (700, clamp(2.2rem, 5vw, 56px), line-height 1.05, letter-spacing -0.03em): hero H1 only.
- **Headline** (700, 2.25rem/36px, tight): section H2s (Programs, Why Ilm, Testimonials, CTA banner).
- **Title** (600, 1.125rem/18px): card and component headings (program names, team names, testimonial author).
- **Body** (400, 16px, line-height 1.7, max ~65ch): paragraph copy, descriptions.
- **Label** (600, 11px, letter-spacing 3px, uppercase): the hero eyebrow ("TUTORING CENTRE — PALESTINE") and nav-adjacent micro-labels — use sparingly per the eyebrow anti-pattern; this is the one deliberate instance, not a per-section default.

### Named Rules
**The One Eyebrow Rule.** At most one uppercase-tracked label per page (the hero's program-positioning line). It is not a section-header template to repeat on Programs, Why Ilm, Testimonials, or the CTA banner.

## 4. Elevation

The system is mostly flat with restrained tonal layering, not a shadow-driven hierarchy: cards separate from the page via a one-step lighter background (white card on warm-paper page) plus a hairline navy border (`rgba(26,43,107,0.08)`), with shadow reserved for interactive lift on hover.

### Shadow Vocabulary
- **Resting card** (`box-shadow: 0 1px 3px rgba(0,0,0,0.04)`): default state for program cards, default elevation off the page.
- **Hover lift** (`box-shadow: 0 8px 30px rgba(26,43,107,0.08)`): program cards and interactive cards on hover, paired with a small `-translate-y-1` motion.
- **Gold glow** (`box-shadow: 0 4px 20px rgba(201,168,76,0.35)`): primary gold buttons on hover only — the one place shadow carries brand color instead of neutral black.

### Named Rules
**The Hover-Earns-Shadow Rule.** Nothing carries a resting shadow heavier than the 0.04-opacity ambient card shadow. Heavier shadows (hover lift, gold glow) are a response to interaction, never a static decoration.

## 5. Components

### Buttons
- **Shape:** rounded-lg (10px, `{rounded.lg}`).
- **Primary:** gold fill (#C9A84C), navy text (#1A2B6B), 12px/28px padding, semibold. A diagonal shimmer sweep plays on hover.
- **Hover / Focus:** brightens toward Gold Light, gains the gold glow shadow; transitions are ~300-500ms.
- **Ghost / Secondary:** transparent fill, 1.5px navy border at 20% opacity, navy text; hover deepens the border and adds a 3% navy tint background.

### Cards
- **Corner Style:** rounded-2xl (≈18px) for program/feature cards.
- **Background:** white on warm-paper page sections; white/5%-opacity glass-on-navy for testimonial cards on the dark section.
- **Shadow Strategy:** resting card → hover lift (see Elevation).
- **Border:** hairline navy at 6-8% opacity; gold at 20-30% opacity on hover as the accent signal.
- **Internal Padding:** generous, ~32px (`p-8`) — the system favors whitespace over density even with nine parallel program tracks to present.

### Inputs / Fields
- shadcn/ui primitives (Input, Textarea, Select) — navy-on-white, hairline border, gold focus ring (`--ring: #C9A84C`).

### Navigation
- Sticky navy-bordered header, transparent until scroll then white/90% + blur; gold underline marks the active link; mobile collapses into a shadcn Sheet drawer. RTL mirrors link order and underline side.

### The Open Hand (signature component)
The hero illustration — the single brand-mark image (hand + leaves + stars, transparent PNG extracted from the master logo asset) — is the one place the system allows a non-flat, non-card visual element. It enters with a single fade/scale-in (no per-piece choreography) and mirrors via `scaleX(-1)` for RTL rather than being re-laid-out.

## 6. Do's and Don'ts

### Do:
- **Do** keep gold to one full-saturation fill per viewport (Single-Accent Rule).
- **Do** use the warm-paper background (#F7F5F0) as-is — it's the brand's own tint, already differentiated from generic AI-cream by the navy/gold system around it.
- **Do** test every layout in both `dir="ltr"` (Jakarta Sans) and `dir="rtl"` (Cairo) before calling a section done.
- **Do** treat hover shadow/lift as the only place elevation gets heavier than the 0.04-opacity ambient card shadow.
- **Do** keep the hero illustration as one cohesive image/asset, not a hand-placed collection of pieces.

### Don't:
- **Don't** add gradient text (`background-clip: text` + gradient) anywhere — single solid color, weight/size carries emphasis instead.
- **Don't** stack an uppercase tracked eyebrow above every section — the hero's "TUTORING CENTRE — PALESTINE" label is the one deliberate instance, not a template.
- **Don't** add numbered 01/02/03 markers to sections that aren't a real, ordered sequence.
- **Don't** repeat the identical icon+heading+text card grid as the default answer for every section — it's already the Programs section; don't let Why Ilm, Testimonials, or future sections default to the same shape without a reason.
- **Don't** introduce placeholder stat counters or invented numbers — CLAUDE.md is explicit: no fake stat cards, ever.
- **Don't** introduce a third accent hue. Navy and gold are the complete palette.
- **Don't** let muted/50%-opacity navy text drop below 4.5:1 contrast on warm-paper or white backgrounds — verify, don't assume the existing `--muted-foreground` token clears the bar everywhere it's used.

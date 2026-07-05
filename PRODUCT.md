# Product

## Register

brand

## Users

Parents and students in Palestine (and the diaspora) evaluating tutoring options for GCSE, A-Level, IB, and Tawjihi qualifications. They are comparison-shopping against international schools, private tutors, and other centers, often on a phone, often switching between English and Arabic. The job to be done: quickly judge whether this center is credible and qualified enough to trust with exam results that determine university admission, then convert into a contact-form lead or signup.

## Product Purpose

A public marketing site + lightweight auth gateway for Ilm Learning Center, a tutoring center offering GCSE, A-Level, IB, and Tawjihi tutoring. It exists to build credibility for a real, currently-operating business, communicate program coverage clearly across four distinct qualification tracks, and convert visitors into contact-form or signup leads. Success looks like a visitor coming away convinced this is run by serious educators (not a generic tutoring-listicle business) and taking a contact/explore action. Student/parent/teacher/admin dashboards exist only as placeholder shells; this audit is scoped to the public-facing surfaces.

## Brand Personality

Trustworthy, premium, warm. Credible enough that a parent will hand over tuition money for an exam that determines university admission; polished enough to compete visually with international schools; still personal and approachable rather than cold or corporate. The brand mark (a navy hand offering gold leaves and stars) carries a "knowledge given, growth offered" warmth — the site's visual language should echo that rather than read as a generic SaaS template wearing navy and gold.

## Anti-references

- The generic 2025/2026 AI-generated SaaS landing page look: cream/sand body backgrounds by default, gradient text, uppercase tracked eyebrows above every section, numbered 01/02/03 scaffolding on non-sequential content, identical icon+heading+text card grids, fake stat counters with no real numbers behind them.
- Anything that reads as a tutoring-directory listing page rather than a single confident institution.
- Cold/corporate-SaaS tone — this is a human tutoring business, not an enterprise tool.

## Design Principles

1. **Earn trust before asking for action.** Every section should add a credibility signal (real program depth, real qualifications, real specificity) before the next CTA — no decoration that doesn't do persuasive work.
2. **Bilingual is not an afterthought.** EN and AR (RTL) are both primary experiences for this audience; layout, mirroring, and type choices must hold up natively in both, not just flip direction mechanically.
3. **Premium through restraint, not ornamentation.** Navy/gold is the full palette — depth comes from spacing, type hierarchy, and one real brand asset (the hand mark), not from added gradients, glass, or extra accent colors.
4. **No invented numbers.** Per CLAUDE.md: no placeholder stat cards, no fake counters. Trust signals must be real or explicitly marked TODO, never fabricated to look more impressive.
5. **Four programs, one institution.** GCSE/A-Level/IB/Tawjihi must each read as fully covered and equally serious — the design shouldn't make any one track feel like an afterthought.

## Accessibility & Inclusion

Target WCAG 2.1 AA. Specific considerations: full RTL correctness for Arabic (not just text direction but icon/illustration mirroring and reading order), bilingual font legibility (Plus Jakarta Sans / Cairo) at body-text sizes, and `prefers-reduced-motion` support for all entrance/scroll animations.

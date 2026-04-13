# Redesign Brief — danieljohnsonxyz-preview

**Vercel project:** `danieljohnsonxyz-preview`
**Framework:** Astro
**Reference file:** `danieljohnson-redesign-v3.html` (attached — use as the structural source of truth)

## What to keep

- The **original warm light colour palette** (#fafaf9 background, cream/off-white cards, warm shadows). Do NOT make the site dark-first. The reference HTML uses a dark palette — ignore the colours, follow the structure only.
- All existing content, images, links, and SEO metadata.
- Manrope + IBM Plex Mono fonts.
- The accent gradient (#7b2ff7 → #7aa5ff).

## What to change

### 1. Add dark sections for contrast rhythm
Insert dark background sections (#09090b) for **Proof** and **Principles** only. Everything else stays light. This creates a light → dark → light → dark visual rhythm instead of the current monotone.

### 2. Rewrite all copy to first person
Every instance of "Daniel Johnson helps…", "He works with…", "Daniel's work" → "I help…", "I work with…", "my work". Testimonial quotes stay unchanged (they're third-person quotes from other people).

### 3. Replace the process section with a pipeline layout
The current section should become a **4-column pipeline** (see reference HTML). Four numbered stages with arrow connectors between columns on desktop:
- **01 Diagnose** — I audit your growth stack, data quality, and team capacity to find the real blockers — not the symptoms.
- **02 Prioritise** — We build a ranked experiment backlog scored on impact, confidence, and effort. No guessing.
- **03 Execute** — I work alongside your team to run experiments, build repeatable systems, and ship what matters.
- **04 Compound** — We review, learn, and feed wins back into the system so every cycle makes the next one faster.

Use large gradient numbers (01–04), not icons. Columns divided by subtle borders with small arrow circles at the dividers.

### 4. Consolidate cards — fewer, larger blocks
- **Operating Experience**: Merge the 4 separate cards into a **single timeline** (year markers on the left, descriptions on the right). See the reference HTML's "Background" section.
- **Profiles** (GrowthMentor, LinkedIn, WSS): Merge into **one card** with link rows instead of 3 separate cards.
- **Thought Leadership logos + speaking/mentoring/writing cards**: Remove the 3 generic cards. Keep just the logo trust bar and the speaking footprint.

### 5. Upgrade the CTA section
Replace the current light CTA card with a **gradient accent background** section (deep purple/navy: `linear-gradient(135deg, #0f0a1e, #1a1030 40%, #0d1225)`).
- Headline: "Stop guessing. Start compounding." (gradient text)
- Subtext: "If you have traction but growth still feels fragile, let's build the system that makes it durable."
- Primary button: "Enter the Growth System" (not "Book a Call")
- Secondary: "Speaking & media enquiries"

### 6. Expandable testimonials
Show **3 testimonials** initially. Add a "See all testimonials" button that reveals the remaining quotes with a smooth expand.

### 7. Move logos into a compact trust bar
Remove the current logo grid section. Instead, place a **compact horizontal logo strip** (small grayscale logos, centered) directly beneath the hero CTAs. Label: no label needed, just the logos.

### 8. Tighten spacing
Current `section-space` padding is ~72px/96px. Reduce to **48px/72px** (3rem/4.5rem). Tighten card gaps from 20px to ~16-20px.

### 9. Hero should stay light and friendly
The hero should use the **warm light palette** with the headshot photo card on the right. First person copy: "I help startups build repeatable growth." Include mini stats beneath the photo (20+ startups, 479+ sessions). Logos sit below the CTA buttons as a trust bar.

## Section order (top to bottom)

1. Nav (light, sticky)
2. Hero (light — headshot, first person, logo trust bar)
3. How I Work — pipeline (light)
4. Proof — stats + metrics (DARK)
5. Testimonials (light, expandable)
6. What I'm Known For — 3 principles (DARK)
7. Background — timeline + headshot (light)
8. Speaking Footprint (light)
9. Selected Thinking — essays + profiles (DARK)
10. CTA (gradient/dark accent)
11. Footer (dark)

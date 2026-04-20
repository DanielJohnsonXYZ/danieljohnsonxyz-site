# Website feedback — 21 April 2026

Source brief that drove the `feat/overhaul-apr26` pass. Kept in-repo for traceability so reviewers can see the rationale behind the changes.

## Core objective

Make danieljohnson.xyz feel like a top-tier growth operator for serious founders, not a generic consultant site. Should communicate:

- premium
- trusted
- sharp
- commercially effective
- modern
- AI-native
- proven results
- worth booking immediately

## Strategic positioning fixes (high priority)

1. **Improve CTAs everywhere.** Replace generic CTAs with stronger outcome-led offers: Get a Growth Diagnosis, Find Your Biggest Growth Bottleneck, Free Revenue Growth Review, Diagnose Your GTM Issues, Book a 30-min Growth Audit. Use throughout hero, mid-page, footer.
2. **Fractional vs full-time positioning.** Current messaging suggests both fractional CMO and full-time Head of Growth — conflicting. Primary lane: Fractional CMO / Growth Operator for post-PMF startups. Demote full-time to a smaller About note.
3. **PMF consistency.** Copy references both "Post-PMF" and "Pre-seed to Series B". Pre-seed usually means no PMF. Fix to Seed–Series B, post-PMF.
4. **Location.** Fix to `UK-based, currently in Asia. Serving clients globally.`
5. **Hero rewrite.** Focus on founder pain + commercial outcome — growth plateauing, founder-led sales bottleneck, no repeatable pipeline, messy GTM.

## Trust / proof

1. **Reorder metrics.** Lead with strongest third-party proof first: 4.93 / 219 reviews from GrowthMentor, 388+ sessions, 20+ startups, £18M+ revenue, £6.8M+ ad spend.
2. **Affiliations row.** Remove WSS (own company). Replace with Techstars, Google for Startups, Cambridge, credible external logos.
3. **Testimonials.** Lead with strongest specific result — Christian A, 40% revenue increase. Pull a handful from GrowthMentor (names + companies + specific outcomes).
4. **Tighten claims.** Soften "Ship 5× faster" until sourced. Remove 6-vs-7-layers inconsistency until confirmed.

## UX / navigation

1. **Reduce header clutter.** Top nav: Work with me, Results, Speaking, Writing, About, Growth Diagnosis (suggestion — reconsidered from first principles).
2. **Consolidate speaking links.** Too many footer entries. Merge.
3. **Clean user journey.** Every page should guide toward credibility → clarity → CTA.

## Content / structure

1. **Reduce duplicated messaging.** Hero subheadline should add new information, not repeat the H1.
2. **Add "Who this is for / not for".**
3. **Add "Why me vs agency" comparison.**
4. **Add Projects section.** Ventures, experiments, AI tools, advisory, startup builds.
5. **Add case studies.** 2–3 detailed: problem, actions, measurable result, timeline.
6. **Advisory Days.** Currently footer-only. Either a proper service section or remove.

## Visual / branding

1. Update images.
2. Break up text-heavy sections with diagrams / frameworks / charts / icons.
3. Add social proof imagery (workshop / speaking).
4. Announcement banner (limited slots / free diagnosis offer).

## Premium feature

**Interactive Growth Diagnosis tool.** 5-question quiz: no pipeline / poor conversion / weak messaging / founder bottleneck / inefficient spend. Tailored output + CTA.

## SEO / AEO / GEO

1. Titles, meta descriptions, schema, internal linking, page speed, image optimisation, semantic headings.
2. AI search readiness — entity signals around Daniel Johnson, Fractional CMO, AI Growth, B2B SaaS Growth Consultant.

## Dev / code quality

Scalable structure, clean components, fast performance, accessibility, responsive, analytics tracking, SEO-friendly architecture.

## Small fixes

- Replace hyphens with commas where appropriate.
- Correct 6-vs-7-layer inconsistency.
- Remove duplicate footer links.
- Improve spacing on dense text blocks.
- Elite mobile experience.

## Inspiration

Cloudflare AI — modern motion, enterprise polish, conversion-led simplicity.

---

## Decisions taken during this pass (2026-04-21)

- **Primary lane:** Fractional CMO / Growth Operator for post-PMF Seed–Series B AI & B2B SaaS. Full-time roles demoted.
- **Location line:** "UK-based, currently in Asia. Serving clients globally."
- **Metrics (sourced):** 4.93 / 219 reviews on GrowthMentor, 388+ sessions, £18M+ revenue, £6.8M+ ad spend, 20+ startups. Dropped the unsourced £15M raised line (kept softer phrasing).
- **Hero CTA:** `Book a 30-min Growth Audit`. Mid-page: `Free Revenue Growth Review`. Footer / exit: `Find Your Biggest Growth Bottleneck`. Quiz entry: `Get a Growth Diagnosis`.
- **Testimonials on homepage:** Christian A (40% revenue), Francine Powers (struggling → consistent sales), Scott Cowley (story / statistic / specific tactic). Two more on `/about`.
- **"Ship 5× faster":** softened to "ship faster" pending a source.
- **Layers:** rebuilt as a single consistent list (count derived from the array, so there's no number-vs-length drift).
- **Announcement banner:** built, default-off (`siteConfig.announcement.enabled = false`). Owner flips it on once copy is agreed.
- **Affiliations:** WSS removed. Kept Google (Launchpad), Cambridge, GrowthMentor. Techstars needs a logo file — text badge used until one is dropped in.
- **Hero photo:** left pointing at existing `daniel-headshot.webp`. Replace the file in `public/images/` to update everywhere; no code change needed.

# Design guidelines

The site should feel like one product, even though different pages have different jobs.

There are two design files to know:

- `src/styles/home-v6.css` is the hand-tuned homepage.
- `src/styles/page-system.css` translates that same visual language across every other page.

`page-system.css` is loaded last by `BaseLayout`, so it is the main place to change shared page styling. Do not fix visual inconsistencies one page at a time unless the page genuinely needs a unique component.

---

## The design direction

**Warm editorial operator.**

The site is deliberately more like a well-designed editorial product than a SaaS template. It uses a warm cream canvas, white and muted-cream surfaces, British racing green for action and emphasis, and a near-black green for dark sections.

The visual system should feel:

- calm rather than flashy
- senior rather than agency-like
- human rather than templated
- editorial rather than dashboard-heavy
- confident enough to use whitespace
- practical rather than ornamental

---

## Palette

The homepage is the visual reference.

| Role | Value |
| --- | --- |
| Canvas | `#f7f5ef` |
| Deeper cream | `#eeeae0` |
| White surface | `#ffffff` |
| Main ink | `#111713` |
| Muted text | `#606860` / `#697169` |
| Primary green | `#04452c` |
| Deep green | `#062f20` |
| Dark section | `#0d1b14` |
| Mint surface | `#e8efe9` |
| Warm sand | `#e7d9c3` |
| Dark-section accent | `#9fd2b8` |

There is one real accent hue: green. Red is acceptable only when it carries semantic meaning such as a genuine warning or negative state. Purple, bright cyan and yellow are not part of the interface palette.

---

## Type

- **Fraunces** for important headlines and editorial display text.
- **Source Sans 3** for body copy and interface text.
- **JetBrains Mono** for small uppercase labels, numbers and technical metadata.

The hierarchy is centralised in `page-system.css`:

```css
--title-page:     /* page H1 */
--title-section:  /* major H2 */
--title-sub:      /* card/subsection heading */
--measure:        /* long-form reading width */
```

Do not create a new headline scale because a particular page feels slightly different. Change the shared scale unless the difference is semantically necessary.

---

## Page heroes

Every inner page automatically gets the homepage-family hero treatment through:

```css
.site-main > section:first-of-type
```

That means:

- warm sand light from the upper left
- a restrained green wash from the upper right
- a faint rule grid that fades downward
- large Fraunces headline
- green mono eyebrow with a small dot
- generous whitespace

The homepage is intentionally excluded because its first child is `.home-v6`, which has its own hero.

---

## Surfaces and cards

Cards use white or contextual muted surfaces, a fine border and very little resting shadow. They should feel like pieces of paper laid on the canvas, not floating app widgets.

Shared values live in:

```css
--radius-sm
--radius-md
--radius-lg
--card-pad
--shadow-xs
--shadow-md
```

Most cards use `--radius-lg` (`1.35rem`). Controls use `--radius-control` (`0.72rem`). Pills are reserved for chips, tags and genuine compact status objects.

Hover movement should be subtle, normally no more than 2–3px.

---

## Dark sections

Dark bands use `#0d1b14`, not generic black or navy. Their supporting accent is mint green, not purple.

Use dark sections when a page needs a meaningful change of pace, such as:

- method / operating-system explanation
- strong proof block
- final CTA

Do not alternate dark and light sections merely for decoration.

---

## Buttons

Primary actions are racing green with white text. Secondary actions are white/transparent with a fine dark border.

The hierarchy is:

1. `.button-accent` / `.button-primary` for the primary action
2. `.button-secondary` for a real alternative
3. `.button-link` / `.link-arrow` for navigation or supporting actions

Avoid multiple filled buttons in one cluster.

---

## Long-form pages

Writing, resources and case studies use the same visual system but preserve reading comfort:

- `68ch` maximum prose measure
- larger Fraunces section headings
- muted body copy
- mint TL;DR panels
- editorial blockquotes rather than plain vertical rules
- warm bordered tables

A content page should still look like DanielJohnson.xyz, not a generic blog theme.

---

## Forms and tools

Inputs, textareas and selects inherit the same control radius, white surface, fine border and green focus ring. This applies to contact, newsletter, calculators, lead magnets and intake forms.

Do not use pill-shaped text fields.

---

## Rules of thumb

- The homepage is the reference, not an exception to the brand.
- One green accent hue.
- Proof can be louder than adjectives.
- Whitespace is preferable to decorative dividers.
- Labels orient. Headlines sell the idea.
- Different page structures are fine. Different visual languages are not.
- Do not add gradients, glows or animation unless they clarify hierarchy or interaction.
- If a component appears on multiple pages, fix the primitive rather than each instance.

---

## Checking changes

Run all three before considering a design-system change finished:

```bash
npm audit
npm run check
npm run build
```

The build's post-step also checks every generated HTML page for required metadata and validates internal destinations.

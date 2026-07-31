# Design guidelines

One place that decides how the site looks. If you want to change
something everywhere, change it here — not on individual pages.

**The file that controls it all:** `src/styles/page-system.css`

---

## The short version

Every page used to be styled by hand, so the same thing was written a
different way on nearly every page. Before this was centralised:

| Element | Should be | Was actually |
| --- | --- | --- |
| Page headline | 1 style | 16 different ones |
| Section headline | 1 style | 51 different ones |
| Small caps label | 1 style | 3 competing versions |
| Card padding | 1 value | 10 different values |

Now there is one of each, defined in one file. Pages can still be written
however is convenient — the shared rules normalise the result, so a new
page picks up the system automatically without anyone remembering to.

---

## How to change something everywhere

Open `src/styles/page-system.css` and edit the value. The block near the
top called `CENTRALISED PRIMITIVES` holds the ones you're most likely to
want:

```css
--title-page:     /* size of the big headline at the top of a page */
--title-section:  /* size of headlines that start a section */
--title-sub:      /* size of small headlines inside cards */
--card-pad:       /* inside spacing of every card */
--space-section:  /* vertical gap between sections */
```

Values use `clamp(minimum, scales-with-screen, maximum)`. The first number
is what phones get, the last is what large screens get, and it slides
smoothly between the two. To make headlines bigger everywhere, raise the
last number.

The hero lighting is directly above that block:

```css
--lit-warm:  /* warm light from the left */
--lit-teal:  /* teal light from the right */
--lit-rule:  /* faint grid lines */
```

---

## The look

**Light cinematic.** Pages are lit like a photograph rather than filled
with flat colour: a warm light from the top left, a teal light from the
top right, a faint grid that dissolves toward the edges, fine grain so the
gradients don't band, and a soft darkening at the corners.

The top section of every page gets this automatically. You don't add
anything to a page to opt in.

**Type.** Fraunces (serif) for headlines, Source Sans for body text,
JetBrains Mono for small uppercase labels. One size for each role.

**Colour.** Deep teal `#0d5c63` is the only accent. Warm stone
backgrounds, near-black text.

**Cards.** Soft, rounded, barely any shadow at rest, lifting slightly on
hover. They should recede, not shout.

---

## Rules of thumb

- One accent colour. Teal earns attention; nothing else competes for it.
- One highlight per headline at most (`class="hl"`).
- Labels are quiet. They orient the reader, they don't sell.
- Whitespace over dividers. Prefer space between sections to drawing
  lines between them.
- Numbers are the loudest thing on the page. Proof outranks adjectives.

---

## Two things to know before editing

**The homepage is separate.** It has its own file,
`src/styles/home-v5.css`, and its own hero. This was deliberate — it's the
one page worth tuning by hand. It shares the same lighting recipe and
colours, so the two stay in family. Changing `page-system.css` will not
change the homepage hero.

**Watch out for specificity.** `global.css` contains a rule that sets the
margin on every paragraph. A rule written as `.my-class` loses to it, and
the spacing silently disappears. Write `.parent .my-class` instead. This
has caused the bug twice; if spacing you set isn't showing up, this is
almost certainly why.

---

## Checking your work

```bash
npm run dev      # preview locally at localhost:4321
npm run build    # must pass before merging
npx astro check  # must report 0 errors
```

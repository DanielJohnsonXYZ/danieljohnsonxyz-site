# danieljohnson.xyz

Personal brand relaunch for Daniel Johnson, built as a static Astro site with MDX content collections, a curated archive, and first-principles copy.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Replace Before Launch

- `src/site.ts`
  - `gtmId`
- `public/images/daniel-hero-cutout.webp`
  - Current homepage hero image, generated from Daniel's supplied headshot asset

## Deployment Notes

- Build output is static in `dist/`
- A sample host config is included at `ops/Caddyfile.example`
- `danieljohnsonx.xyz` should 301 redirect to `danieljohnson.xyz`
- Current booking CTA points to `https://calendly.com/danieljohnson`

# Deployment Notes

## Cloudflare Pages

Recommended Pages project name: `danieljohnsonxyz-site`

- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `main`

Direct upload, once Cloudflare is authenticated:

```bash
npm run build
npx wrangler pages deploy dist --project-name=danieljohnsonxyz-site --branch=main
```

## Domains

Primary domain: `danieljohnson.xyz`

Redirect domains:

- `www.danieljohnson.xyz` -> `danieljohnson.xyz`
- `danieljohnsonx.xyz` -> `danieljohnson.xyz` if the domain remains attached

Host redirects are handled in `public/_redirects` and `functions/_middleware.js`.

# Operations Runbook

Operational reference for `danieljohnson.xyz` — a static [Astro](https://astro.build)
site deployed on **Cloudflare Pages**. Covers deploy, rollback, cache, DNS,
security headers, CI/CD, dependency hygiene, and incident response.

For day-to-day deploy commands see also [`deployment.md`](./deployment.md).

---

## 1. Architecture at a glance

| Concern              | Where it lives                                             |
| -------------------- | --------------------------------------------------------- |
| Static site build    | Astro → `dist/` (`npm run build`)                         |
| Hosting              | Cloudflare Pages project `danieljohnsonxyz-site`          |
| Edge logic           | `functions/_middleware.js` (HTTPS/host canonicalisation)  |
| Response headers     | `public/_headers` (security + cache)                      |
| Redirects            | `public/_redirects` (301/404 at real HTTP status)         |
| Self-host fallback   | `ops/Caddyfile.example` (kept in sync with `_headers`)    |
| CI                   | `.github/workflows/ci.yml` (check + build + audit)        |
| Dependency updates   | `.github/dependabot.yml` (npm + GitHub Actions, weekly)   |

Production branch: `main`. Pushes to `main` trigger a Cloudflare Pages build.

---

## 2. Deploy

Cloudflare Pages auto-builds on push to `main`. Manual direct upload (once
`wrangler` is authenticated):

```bash
npm ci
npm run build
npx wrangler pages deploy dist --project-name=danieljohnsonxyz-site --branch=main
```

Pre-deploy sanity:

```bash
npm run check   # astro check — type/content errors
npm run build   # must succeed; this is what CI gates on
```

---

## 3. Rollback

1. **Cloudflare dashboard → Pages → `danieljohnsonxyz-site` → Deployments.**
   Find the last-known-good deployment and use **"Rollback to this deployment"**.
2. **Git revert** (preferred when the cause is a known commit):
   ```bash
   git revert <bad-sha>
   git push origin main
   ```
   Let the resulting Pages build promote the revert.
3. After any rollback, **purge the edge cache** (§4) — stale HTML is the most
   common cause of a "looks broken after deploy" report.

---

## 4. Cache & the "unstyled site" failure mode

**Symptom:** the site renders with no CSS / looks naked after a deploy.

**Cause:** HTML references a hashed stylesheet at `/_astro/BaseLayout.<hash>.css`.
If the edge has an old HTML page cached but the new deploy dropped that old
hashed file, the stylesheet URL 404s and the page loses its styles.

**Defenses already in place:**
- `public/_headers` sets `no-store` on HTML (`/`, `/index.html`, `/*`).
- `functions/_middleware.js` also sets `Cache-Control: no-store` on `text/html`.
- Hashed assets under `/_astro/*`, `/images/*`, `/og/*` are `immutable`.

**Operational rules:**
- After a deploy, **purge Cloudflare cache** (Caching → Configuration → Purge
  Everything) if anything looks off.
- **Never** add a dashboard "Cache Everything" / "Cache Level: Cache Everything"
  page rule that caches HTML at the edge — it defeats the `no-store` policy and
  reintroduces the stale-CSS bug.

---

## 5. DNS & domains

Primary: `danieljohnson.xyz`. Canonicalisation is enforced in two layers
(`functions/_middleware.js` for HTTPS + non-www, `public/_redirects` for host
consolidation):

| From                        | To                      | Mechanism                |
| --------------------------- | ----------------------- | ------------------------ |
| `http://*`                  | `https://*`             | middleware 301           |
| `www.danieljohnson.xyz`     | `danieljohnson.xyz`     | middleware + `_redirects`|
| `danieljohnsonx.xyz` (typo) | `danieljohnson.xyz`     | `ops/Caddyfile.example`  |

HSTS is sent with `preload` (§6) — only keep this if you intend to stay on
HTTPS for the apex **and** all subdomains indefinitely. Removing HTTPS from any
subdomain after preload submission will break it.

---

## 6. Security headers

Source of truth: **`public/_headers`** (Cloudflare Pages). The self-host
`ops/Caddyfile.example` mirrors the same policy and must be updated in lockstep.

Currently enforced on all responses:

| Header                      | Value / intent                                      |
| --------------------------- | --------------------------------------------------- |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload`      |
| `X-Content-Type-Options`    | `nosniff`                                            |
| `X-Frame-Options`           | `SAMEORIGIN` (legacy clients)                        |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                   |
| `Permissions-Policy`        | denies FLoC, geolocation, camera, mic, payment      |
| `Content-Security-Policy`   | see below                                           |

### Content-Security-Policy

```
default-src 'self';
script-src  'self' 'unsafe-inline' https://www.googletagmanager.com;
style-src   'self' 'unsafe-inline';
img-src     'self' data: https: blob:;
font-src    'self' data:;
connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com
            https://www.googletagmanager.com https://stats.g.doubleclick.net
            https://*.calendly.com https://comms.wescalestartups.com;
frame-src   https://calendly.com https://www.youtube-nocookie.com https://www.youtube.com;
object-src  'none';
base-uri    'self';
form-action 'self' mailto: https://comms.wescalestartups.com;
frame-ancestors 'self';
```

**Known residual risk:** `script-src`/`style-src` allow `'unsafe-inline'`. This
is required by the Google Tag Manager bootstrap and Astro's inline island
scripts on a static host (no per-request nonce). It is an accepted trade-off,
not an oversight. Removing it would require either a nonce mechanism (needs a
dynamic edge layer) or hashing every inline block.

### Changing the CSP safely

1. Edit `public/_headers` **and** `ops/Caddyfile.example` together.
2. When adding a third-party (embed, analytics, form endpoint), add it only to
   the **specific directive** it needs (`connect-src`, `frame-src`, etc.), never
   to `default-src`.
3. Verify after deploy:
   ```bash
   curl -sI https://danieljohnson.xyz | grep -i content-security-policy
   ```
4. Open the live site with DevTools console open and watch for CSP violation
   reports before considering the change done.

External validation: <https://securityheaders.com/?q=danieljohnson.xyz> and
<https://observatory.mozilla.org/>.

---

## 7. CI/CD & supply chain

`.github/workflows/ci.yml` runs on push/PR to `main`:

- `permissions: contents: read` — least-privilege `GITHUB_TOKEN`.
- `concurrency` with `cancel-in-progress` — supersede stale runs.
- `npm ci` → `npm run check` → `npm run build`.
- `npm audit --audit-level=high --omit=dev` — **advisory** (`continue-on-error`),
  surfaces vulnerable runtime deps without blocking deploys on un-fixable
  transitive advisories.

`.github/dependabot.yml` opens weekly PRs for npm and GitHub Actions, grouping
low-risk build tooling to cut review noise.

**Future hardening (not yet done):** pin GitHub Actions to commit SHAs instead
of `@v4` tags. Dependabot's `github-actions` updater will then keep the pins
current. Track this as a follow-up rather than a blocker.

---

## 8. Incident response

| Incident                        | First moves                                              |
| ------------------------------- | ------------------------------------------------------- |
| Site unstyled / partial render  | §4 — purge edge cache; check `/_astro/*` 200s.          |
| Bad deploy                      | §3 — roll back, then `git revert` the cause.            |
| CSP breaking a feature          | Reproduce with DevTools console; scope the fix to one   |
|                                 | directive (§6); never widen to `default-src`.           |
| Dependency CVE flagged in CI    | Review the advisory; bump via Dependabot PR or `npm     |
|                                 | audit fix`; re-run build.                               |
| Redirect loop / wrong host      | Inspect `_middleware.js` + `_redirects` precedence;     |
|                                 | specific rules must precede catch-alls.                 |

---

## 9. Hardening checklist

Done:

- [x] HSTS with `includeSubDomains; preload`
- [x] Full security-header set on every response (`_headers`)
- [x] CSP with explicit `object-src 'none'`, `base-uri 'self'`, `frame-ancestors`
- [x] HTTPS + non-www canonicalisation at the edge
- [x] HTML never edge-cached (stale-CSS defense)
- [x] CI least-privilege token (`contents: read`)
- [x] CI concurrency cancellation
- [x] CI advisory dependency audit
- [x] Dependabot for npm + GitHub Actions
- [x] Self-host (`Caddyfile`) header parity with Pages

Open / future:

- [ ] Pin GitHub Actions to commit SHAs
- [ ] Remove `'unsafe-inline'` from `script-src` (needs nonce/hashing strategy)
- [ ] Evaluate `Cross-Origin-Opener-Policy` (verify Calendly/YouTube embeds first)
- [ ] CSP violation reporting endpoint (`report-to`) for live telemetry

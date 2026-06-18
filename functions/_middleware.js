// Non-script CSP directives. Kept in sync with the enforced policy in `public/_headers`
// (everything there except `script-src`). The report-only policy below pairs these with a
// hardened, hash-based `script-src` so we can observe violations before enforcing it.
const CSP_BASE_DIRECTIVES = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://cloudflareinsights.com https://*.calendly.com https://comms.wescalestartups.com",
  "frame-src https://calendly.com https://www.youtube-nocookie.com https://www.youtube.com",
  "base-uri 'self'",
  "form-action 'self' mailto: https://comms.wescalestartups.com",
  "frame-ancestors 'self'"
];

// Matches every <script ...>...</script> block (non-greedy body).
const SCRIPT_RE = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

function base64FromBuffer(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// sha256 hashes of every executable inline script in the document, as CSP source values.
// Excludes external (`src`) scripts and non-executable JSON-LD data blocks.
async function inlineScriptHashes(html) {
  const hashes = new Set();
  let match;
  SCRIPT_RE.lastIndex = 0;
  while ((match = SCRIPT_RE.exec(html)) !== null) {
    const attrs = match[1];
    if (/\bsrc\s*=/i.test(attrs)) continue;
    if (/type\s*=\s*["']?application\/ld\+json/i.test(attrs)) continue;
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(match[2]));
    hashes.add(`'sha256-${base64FromBuffer(digest)}'`);
  }
  return [...hashes];
}

// Hardened script-src: inline scripts are allowed by sha256 hash; external scripts by host
// allowlist. `'strict-dynamic'` is deliberately NOT used — it makes browsers ignore the host
// allowlist, which would block the Cloudflare Web Analytics beacon (a parser-inserted external
// script injected at the edge after this middleware runs). The GTM bootstrap (hashed) loads
// gtm.js from googletagmanager.com, which then loads GA4 from the same host. `'unsafe-inline'`
// is intentionally absent.
const SCRIPT_HOSTS = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://static.cloudflareinsights.com"
];
function buildScriptSrc(hashes) {
  return ["script-src 'self'", ...hashes, ...SCRIPT_HOSTS].join(" ");
}

export async function onRequest(context) {
  const url = new URL(context.request.url);
  let changed = false;

  // Force HTTPS
  if (url.protocol === "http:") {
    url.protocol = "https:";
    changed = true;
  }

  // Force non-www
  if (url.hostname === "www.danieljohnson.xyz") {
    url.hostname = "danieljohnson.xyz";
    changed = true;
  }

  if (changed) {
    return Response.redirect(url.toString(), 301);
  }

  const response = await context.next();
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("text/html")) {
    return response;
  }

  const body = await response.text();
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");

  // Enforce the hardened, hash-based CSP, generated per page from its actual inline scripts.
  // Verified clean via a report-only rollout first (zero violations across a full page load,
  // GTM included), so dropping 'unsafe-inline' is safe. The static CSP in public/_headers (which
  // keeps 'unsafe-inline') stays as a resilience fallback: if hashing ever throws, the page is
  // served with that policy still in place rather than breaking.
  try {
    const hashes = await inlineScriptHashes(body);
    const csp = [buildScriptSrc(hashes), ...CSP_BASE_DIRECTIVES].join("; ");
    headers.set("Content-Security-Policy", csp);
  } catch {
    // Leave the enforced CSP inherited from public/_headers in place.
  }

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

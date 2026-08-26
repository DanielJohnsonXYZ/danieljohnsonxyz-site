// Non-script CSP directives. Kept in sync with the enforced policy in `public/_headers`
// (everything there except `script-src`). The report-only policy below pairs these with a
// hardened, hash-based `script-src` so we can observe violations before enforcing it.
const CSP_BASE_DIRECTIVES = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https: blob:",
  "font-src 'self' data:",
  // GA4 collect hosts (legacy + analytics.google.com) + Clarity + Calendly + Mautic + CF Insights
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com https://stats.g.doubleclick.net https://www.clarity.ms https://*.clarity.ms https://cloudflareinsights.com https://*.calendly.com https://comms.wescalestartups.com",
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

// Keep legacy deployments and cached static output aligned with the current offer.
// These replacements are deliberately narrow so legitimate page-specific pricing and copy
// are not changed. The source files remain the canonical place to edit content.
function normalizeSiteCopy(input) {
  let output = input;

  const replacements = [
    [
      /UK-based, currently in Asia, working with UK, US, Europe and APAC clients with US-friendly overlap\./g,
      "UK-based, working with UK, US, Europe and APAC clients with US-friendly overlap."
    ],
    [
      /UK-based, currently in Asia\. Serving US, UK, Europe, and APAC clients with US-friendly overlap\./g,
      "UK-based, working with UK, US, Europe and APAC clients with US-friendly overlap."
    ],
    [
      /2 Fractional CMO slots available this quarter\. Next start window: (?:May|June) 2026\./g,
      "Taking on a small number of fractional engagements. Ask about the next available start window."
    ],
    [
      /Taking on a small number of fractional engagements\. Next start window: (?:May|June) 2026\./g,
      "Taking on a small number of fractional engagements. Ask about the next available start window."
    ],
    [
      /Next start window: (?:May|June) 2026\./g,
      "Ask about the next available start window."
    ],
    [/30-min Growth Audit/g, "20-min Growth Audit"],
    [/30-minute Growth Audit/g, "20-minute Growth Audit"],
    [/30-minute growth audit/g, "20-minute growth audit"],
    [/30 minutes\. No pitch\./g, "20 minutes. No pitch."],
    [/30 minutes, no pitch/g, "20 minutes, no pitch"],
    [/1M–10M ARR/g, "£1M–£20M ARR"],
    [
      /Fractional CMO From £7\.5k\/mo\. Embedded senior GTM leadership\./g,
      "Fractional CMO From £5k/mo. Embedded senior GTM leadership."
    ],
    [
      /Fractional CMO\s+From £7\.5k\/mo\. Embedded senior GTM leadership\./g,
      "Fractional CMO From £5k/mo. Embedded senior GTM leadership."
    ]
  ];

  for (const [pattern, replacement] of replacements) {
    output = output.replace(pattern, replacement);
  }

  // The site is a personal brand, so use first-person CTA language rather than agency language.
  output = output.replace(/>\s*Contact us\s*→\s*</g, ">Talk to Daniel →<");
  output = output.replace(/>\s*Contact us\s*</g, ">Talk to Daniel<");

  return output;
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
// allowlist. `'strict-dynamic'` is deliberately NOT used because it makes browsers ignore the
// host allowlist, which would block the Cloudflare Web Analytics beacon. The GTM bootstrap
// (hashed) loads gtm.js from googletagmanager.com, which then loads GA4 from the same host.
// `'unsafe-inline'` is intentionally absent.
const SCRIPT_HOSTS = [
  "https://www.googletagmanager.com",
  "https://www.google-analytics.com",
  "https://static.cloudflareinsights.com",
  "https://www.clarity.ms",
  "https://scripts.clarity.ms"
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
  const isHtml = contentType.includes("text/html");
  const isTextLike = isHtml || contentType.includes("text/plain") || contentType.includes("xml");

  if (!isTextLike) {
    return response;
  }

  const body = normalizeSiteCopy(await response.text());
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");

  // Enforce the hardened, hash-based CSP, generated per page from its actual inline scripts.
  // The static CSP in public/_headers stays as a resilience fallback if hashing ever throws.
  if (isHtml) {
    try {
      const hashes = await inlineScriptHashes(body);
      const csp = [buildScriptSrc(hashes), ...CSP_BASE_DIRECTIVES].join("; ");
      headers.set("Content-Security-Policy", csp);
    } catch {
      // Leave the enforced CSP inherited from public/_headers in place.
    }
  }

  return new Response(body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

/**
 * Customer.io Forms API proxy.
 *
 * Keeps Track API credentials server-side. Clients POST JSON (or form-urlencoded)
 * to /api/forms; we forward to:
 *   POST https://track[.eu].customer.io/api/v1/forms/{form_id}/submit
 *
 * Cloudflare Pages env (Production + Preview):
 *   CUSTOMER_IO_SITE_ID
 *   CUSTOMER_IO_TRACK_API_KEY
 *   CUSTOMER_IO_REGION          — "eu" (default; shared WSS workspace) or "us"
 *   CUSTOMER_IO_FORM_ID         — default form id when body omits form_id
 *   FORMS_ALLOWED_ORIGINS       — optional, comma-separated extra hostnames
 *                                 (use this for localhost during local dev)
 *
 * This endpoint was being scraped and used to inject contacts straight into
 * Customer.io: bots POST JSON here directly, never touching the HTML form, so
 * a hidden honeypot field alone doesn't see them. Requests must therefore
 * carry an Origin (or Referer) belonging to this site — browsers always send
 * one on a same-origin POST, and the bots don't.
 *
 * The origin check is a speed bump, not a wall: an Origin header can be
 * forged by anything that isn't a browser. The control that actually holds
 * is Cloudflare Turnstile (see functions/api/_form-guard.js in the
 * wescalestartups-site repo for the reference implementation) or double
 * opt-in in Customer.io. Neither is wired up here yet.
 */

const MAX_ATTR = 1000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Hostnames allowed to submit. Extend via FORMS_ALLOWED_ORIGINS.
 *
 * wescalestartups.com is included because it shares the Customer.io
 * workspace: if anything over there ever posts here, silently 403ing it would
 * be worse than allowing an origin Daniel already owns.
 *
 * localhost and 127.0.0.1 are deliberately NOT here. They were, and they gave
 * any caller a valid Origin for free. Add them through FORMS_ALLOWED_ORIGINS
 * on a preview environment if you need them for local work.
 */
const DEFAULT_ALLOWED_HOSTS = [
  "danieljohnson.xyz",
  "www.danieljohnson.xyz",
  "danieljohnsonx.xyz",
  "www.danieljohnsonx.xyz",
  "wescalestartups.com",
  "www.wescalestartups.com"
];

/**
 * This Cloudflare Pages project, and only this one. The apex serves the site
 * and each preview deployment gets a subdomain of it, so both are allowed.
 */
const PREVIEW_HOST = "danieljohnsonxyz-site.pages.dev";

/**
 * source_type drives Customer.io automation triggers, so it's an enum rather
 * than free text — otherwise anything posting here can invent its own
 * segmentation values.
 */
const ALLOWED_SOURCE_TYPES = new Set([
  "newsletter",
  "lead_magnet",
  "contact_enquiry",
  "contact-form",
  "fractional_cmo_intake"
]);

function hostOf(value) {
  if (!value) return "";
  try {
    return new URL(value).hostname.toLowerCase();
  } catch {
    return "";
  }
}

/**
 * Same-origin check. Browsers include Origin on every POST, so a missing
 * Origin *and* Referer means the caller isn't a browser on this site.
 */
function isAllowedOrigin(request, env) {
  const host =
    hostOf(request.headers.get("Origin")) || hostOf(request.headers.get("Referer"));
  if (!host) return false;

  const extra = (env.FORMS_ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  if (DEFAULT_ALLOWED_HOSTS.includes(host) || extra.includes(host)) return true;

  // Previously this accepted any host ending in ".pages.dev", which is every
  // Cloudflare Pages site on the platform — a free, forgeable Origin. Scope
  // it to this project: the apex, plus its per-deployment preview subdomains.
  return host === PREVIEW_HOST || host.endsWith(`.${PREVIEW_HOST}`);
}

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function clip(value, max = MAX_ATTR) {
  const s = typeof value === "string" ? value.trim() : "";
  if (!s) return "";
  return s.length > max ? s.slice(0, max) : s;
}

function trackBase(region) {
  return region === "eu" ? "https://track-eu.customer.io" : "https://track.customer.io";
}

async function readPayload(request) {
  const contentType = (request.headers.get("Content-Type") || "").toLowerCase();
  if (contentType.includes("application/json")) {
    return await request.json();
  }
  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    const form = await request.formData();
    const out = {};
    for (const [key, value] of form.entries()) {
      if (typeof value === "string") out[key] = value;
    }
    return out;
  }
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export async function onRequestPost(context) {
  const env = context.env || {};

  if (!isAllowedOrigin(context.request, env)) {
    console.warn(
      "Rejected cross-origin form submission",
      JSON.stringify({
        origin: context.request.headers.get("Origin") || null,
        referer: context.request.headers.get("Referer") || null,
        ip: context.request.headers.get("CF-Connecting-IP") || null
      })
    );
    return json(403, { ok: false, error: "Forbidden" });
  }

  let payload;
  try {
    payload = await readPayload(context.request);
  } catch {
    return json(400, { ok: false, error: "Invalid request body" });
  }

  // Honeypot: a hidden field real people never fill in. Bots that fill every
  // input get a 200 so they don't learn to retry, but nothing is forwarded.
  if (clip(payload.company_website, 200) || clip(payload.website, 200)) {
    return json(200, { ok: true, form_id: "discarded" });
  }

  const email = clip(payload.email || payload.Email, 320);
  if (!email || !EMAIL_RE.test(email)) {
    return json(400, { ok: false, error: "Valid email required" });
  }

  const sourceType = clip(payload.source_type, 60);
  if (sourceType && !ALLOWED_SOURCE_TYPES.has(sourceType)) {
    console.warn("Rejected unknown source_type", sourceType);
    return json(400, { ok: false, error: "Unknown source_type" });
  }

  const siteId = (env.CUSTOMER_IO_SITE_ID || "").trim();
  const apiKey = (
    env.CUSTOMER_IO_TRACK_API_KEY ||
    env.CUSTOMER_IO_API_KEY ||
    ""
  ).trim();
  if (!siteId || !apiKey) {
    console.error("Customer.io credentials missing (CUSTOMER_IO_SITE_ID / CUSTOMER_IO_TRACK_API_KEY)");
    return json(503, {
      ok: false,
      error: "Email capture unavailable",
      hint: "Set CUSTOMER_IO_SITE_ID and CUSTOMER_IO_TRACK_API_KEY on Cloudflare Pages"
    });
  }

  const formId =
    clip(payload.form_id || payload.formId, 150) ||
    clip(env.CUSTOMER_IO_FORM_ID, 150) ||
    "dj-newsletter";

  const data = { email };
  const passThrough = [
    "source_type",
    "source_page",
    "lead_magnet",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "first_name",
    "name",
    // Enquiry + intake fields (contact form, fractional CMO intake).
    "company",
    "stage",
    "bottleneck",
    "message"
  ];
  for (const key of passThrough) {
    const v = clip(payload[key], key === "message" ? 4000 : MAX_ATTR);
    if (v) data[key] = v;
  }

  const region = (env.CUSTOMER_IO_REGION || "eu").trim().toLowerCase();
  const url = `${trackBase(region)}/api/v1/forms/${encodeURIComponent(formId)}/submit`;
  const auth = btoa(`${siteId}:${apiKey}`);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ data })
    });

    if (res.ok || res.status === 204) {
      return json(200, { ok: true, form_id: formId });
    }

    const detail = await res.text().catch(() => "");
    console.error("Customer.io forms submit failed", res.status, detail.slice(0, 400));
    return json(502, { ok: false, error: "Customer.io rejected submission" });
  } catch (err) {
    console.error("Customer.io forms submit error", err);
    return json(502, { ok: false, error: "Customer.io unreachable" });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Accept",
      "Access-Control-Max-Age": "86400"
    }
  });
}

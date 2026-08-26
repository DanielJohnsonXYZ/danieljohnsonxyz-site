import { access, readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const distDir = fileURLToPath(new URL("../dist/", import.meta.url));
const siteOrigin = "https://danieljohnson.xyz";

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }

  return files;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function stripHtml(value) {
  return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function routeCandidates(pathname) {
  const cleanPath = decodeURIComponent(pathname).replace(/^\/+/, "");

  if (!cleanPath) return [join(distDir, "index.html")];

  if (extname(cleanPath)) {
    return [join(distDir, cleanPath)];
  }

  return [
    join(distDir, cleanPath, "index.html"),
    join(distDir, `${cleanPath}.html`)
  ];
}

const files = await walk(distDir);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const failures = [];
const internalLinks = [];

const staleCopyChecks = [
  "currently in Asia",
  "Next start window: June 2026.",
  "Next start window: May 2026.",
  "Fractional CMO engagements open for Q2 2026."
];

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const page = `/${relative(distDir, file).replaceAll("\\", "/")}`;

  if (!/<title>[^<]+<\/title>/i.test(html)) failures.push(`${page}: missing <title>`);
  if (!/<meta\s+name=["']description["'][^>]+content=["'][^"']+/i.test(html) && !/<meta\s+content=["'][^"']+["'][^>]+name=["']description["']/i.test(html)) {
    failures.push(`${page}: missing meta description`);
  }
  if (!/<link\s+rel=["']canonical["'][^>]+href=["'][^"']+/i.test(html) && !/<link\s+href=["'][^"']+["'][^>]+rel=["']canonical["']/i.test(html)) {
    failures.push(`${page}: missing canonical URL`);
  }
  if (!/<h1(?:\s|>)/i.test(html)) failures.push(`${page}: missing H1`);

  for (const stale of staleCopyChecks) {
    if (stripHtml(html).includes(stale)) failures.push(`${page}: stale copy found, ${stale}`);
  }

  for (const match of html.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    const href = match[1].trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;

    let url;
    try {
      url = new URL(href, siteOrigin);
    } catch {
      failures.push(`${page}: invalid href ${href}`);
      continue;
    }

    if (url.origin !== siteOrigin) continue;
    if (url.pathname.startsWith("/api/")) continue;

    internalLinks.push({ page, href, pathname: url.pathname });
  }
}

const checkedPaths = new Map();
for (const link of internalLinks) {
  if (!checkedPaths.has(link.pathname)) {
    const candidates = routeCandidates(link.pathname);
    checkedPaths.set(link.pathname, (await Promise.all(candidates.map(exists))).some(Boolean));
  }

  if (!checkedPaths.get(link.pathname)) {
    failures.push(`${link.page}: broken internal link ${link.href}`);
  }
}

if (failures.length > 0) {
  console.error(`Whole-site QA failed with ${failures.length} issue(s):`);
  for (const failure of [...new Set(failures)]) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Whole-site QA passed, ${htmlFiles.length} HTML page(s), ${checkedPaths.size} unique internal target(s) checked.`
);

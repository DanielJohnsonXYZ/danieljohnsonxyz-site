import { promises as fs } from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const SYSTEM_MARKER = "--site-green-black:#0d1b14";
const HOMEPAGE_MARKER = ".home-v6";

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function cssHrefs(html) {
  const hrefs = [];
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = match[0];
    if (!/\brel=["']stylesheet["']/i.test(tag)) continue;
    const href = tag.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (href) hrefs.push(href);
  }
  return hrefs;
}

function inlineStyles(html) {
  return [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join("\n");
}

async function localCss(href) {
  try {
    const url = new URL(href, "https://danieljohnson.xyz");
    const localPath = path.join(DIST, decodeURIComponent(url.pathname).replace(/^\/+/, ""));
    return await fs.readFile(localPath, "utf8");
  } catch {
    return "";
  }
}

const allFiles = await walk(DIST);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const failures = [];
let homepageChecked = false;

for (const file of htmlFiles) {
  const html = await fs.readFile(file, "utf8");
  const linkedCss = await Promise.all(cssHrefs(html).map(localCss));
  const css = `${inlineStyles(html)}\n${linkedCss.join("\n")}`.replace(/\s+/g, "");
  const route = `/${path.relative(DIST, file).replace(/\\/g, "/").replace(/index\.html$/, "").replace(/\.html$/, "")}`.replace(/\/+/g, "/");

  if (!css.includes(SYSTEM_MARKER)) {
    failures.push(`${route}: missing shared v6 page-system CSS`);
  }

  if (route === "/" || route === "//") {
    homepageChecked = true;
    if (!css.includes(HOMEPAGE_MARKER)) {
      failures.push("/: missing homepage v6 CSS");
    }
  }
}

if (!homepageChecked) failures.push("/: homepage HTML was not found");

if (failures.length) {
  console.error("Design-system QA failed:\n" + failures.map((item) => `- ${item}`).join("\n"));
  process.exit(1);
}

console.log(`Design-system QA passed, ${htmlFiles.length} HTML page(s) inherit the v6 visual system.`);

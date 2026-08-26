import { readFile, writeFile } from "node:fs/promises";

async function replaceRequired(path, from, to, label) {
  const current = await readFile(path, "utf8");
  if (!current.includes(from)) {
    if (current.includes(to)) {
      console.log(`${label}: already clean`);
      return false;
    }
    throw new Error(`${label}: expected source snippet not found`);
  }
  await writeFile(path, current.replace(from, to), "utf8");
  console.log(`${label}: updated`);
  return true;
}

const root = new URL("../", import.meta.url);
const growthAuditPath = new URL("src/pages/growth-audit.astro", root);
const mediaKitPath = new URL("src/pages/media-kit.astro", root);

await replaceRequired(
  growthAuditPath,
  'import { afterYouBookSteps, ctas, growthAuditPage, growthAuditSampleOutput, siteConfig } from "../site";',
  'import { afterYouBookSteps, ctas, growthAuditPage, growthAuditSampleOutput } from "../site";',
  "growth-audit unused siteConfig import"
);

const legacyClipboard = `        const writeFallback = () => {
          // execCommand fallback for older Safari / non-secure contexts
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          const ok = document.execCommand("copy");
          document.body.removeChild(ta);
          return ok;
        };
        let copied = false;
        try {
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch {
          try {
            copied = writeFallback();
          } catch {
            copied = false;
          }
        }`;

const modernClipboard = `        let copied = false;
        try {
          if (!navigator.clipboard) throw new Error("Clipboard API unavailable");
          await navigator.clipboard.writeText(text);
          copied = true;
        } catch {
          copied = false;
        }`;

await replaceRequired(
  mediaKitPath,
  legacyClipboard,
  modernClipboard,
  "media-kit deprecated clipboard fallback"
);

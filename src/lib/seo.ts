import { siteConfig } from "../site";

const TITLE_SEPARATOR = " | ";
const DESCRIPTION_MIN = 110;
const DESCRIPTION_MAX = 170;

function stripKnownBrandSuffix(value: string) {
  const escapedName = siteConfig.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const suffixPattern = new RegExp(`(?:\\s*\\|\\s*${escapedName})+\\s*$`, "i");
  return value.replace(suffixPattern, "").trim();
}

export function buildPageTitle(rawTitle: string, brandName = siteConfig.name) {
  const cleaned = stripKnownBrandSuffix(rawTitle.replace(/\s+/g, " ").trim());
  if (!cleaned) return brandName;
  if (cleaned.toLowerCase() === brandName.toLowerCase()) return brandName;
  return `${cleaned}${TITLE_SEPARATOR}${brandName}`;
}

export function normalizeMetaDescription(rawDescription: string) {
  const collapsed = rawDescription.replace(/\s+/g, " ").trim();
  if (!collapsed) return siteConfig.description;
  if (collapsed.length <= DESCRIPTION_MAX) return collapsed;

  const cutoff = collapsed.slice(0, DESCRIPTION_MAX);
  const lastSpace = cutoff.lastIndexOf(" ");
  const cropped = (lastSpace > DESCRIPTION_MIN ? cutoff.slice(0, lastSpace) : cutoff).trimEnd();
  return `${cropped}...`;
}

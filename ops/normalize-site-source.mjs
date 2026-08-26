import { readFile, writeFile } from "node:fs/promises";

const sitePath = new URL("../src/site.ts", import.meta.url);
const layoutPath = new URL("../src/layouts/BaseLayout.astro", import.meta.url);

async function replaceInFile(path, replacements) {
  let content = await readFile(path, "utf8");
  let changed = 0;

  for (const { from, to } of replacements) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      changed += 1;
    }
  }

  if (changed > 0) {
    await writeFile(path, content, "utf8");
  }

  return { content, changed };
}

const siteResult = await replaceInFile(sitePath, [
  {
    from: 'availability: "Taking on a small number of fractional engagements. Next start window: June 2026.",',
    to: 'availability: "Taking on a small number of fractional engagements. Ask about the next available start window.",'
  },
  {
    from: 'nextStartWindow: "Next start window: June 2026.",',
    to: 'nextStartWindow: "Ask about the next available start window.",'
  },
  {
    from: 'navBookingLabel: "Contact us",',
    to: 'navBookingLabel: "Talk to Daniel",'
  },
  {
    from: 'location: "UK-based, currently in Asia, working with UK, US, Europe and APAC clients with US-friendly overlap.",',
    to: 'location: "UK-based, working with UK, US, Europe and APAC clients with US-friendly overlap.",'
  },
  {
    from: 'startupsAdvised: "20+",',
    to: 'startupsAdvised: "200+",'
  },
  {
    from: 'mentorSessions: "479+",',
    to: 'mentorSessions: "405",'
  },
  {
    from: 'mentorRating: "4.97",',
    to: 'mentorRating: "4.94",'
  },
  {
    from: 'mentorReviewCount: "220",',
    to: 'mentorReviewCount: "225",'
  },
  {
    from: 'description: "4.97/5 from 220 reviews · 479+ mentor sessions."',
    to: 'description: "4.94/5 from 225 reviews · 405 GrowthMentor sessions."'
  },
  {
    from: 'message: "Fractional CMO engagements open for Q2 2026.",',
    to: 'message: "Fractional CMO engagements: ask about current availability.",'
  },
  {
    from: 'label: "Contact us",\n    href: siteConfig.bookingPageUrl,',
    to: 'label: "Talk to Daniel",\n    href: siteConfig.bookingPageUrl,'
  }
]);

const layoutResult = await replaceInFile(layoutPath, [
  {
    from: "  lastUpdated = siteConfig.lastUpdated,",
    to: "  lastUpdated = false,"
  }
]);

const forbiddenSiteCopy = [
  "currently in Asia",
  "Next start window: June 2026.",
  'navBookingLabel: "Contact us"',
  'message: "Fractional CMO engagements open for Q2 2026."',
  'startupsAdvised: "20+"',
  'mentorSessions: "479+"',
  'mentorRating: "4.97"',
  'mentorReviewCount: "220"'
];

for (const phrase of forbiddenSiteCopy) {
  if (siteResult.content.includes(phrase)) {
    throw new Error(`Stale site copy remains after normalization: ${phrase}`);
  }
}

const expectedSiteCopy = [
  'navBookingLabel: "Talk to Daniel"',
  'startupsAdvised: "200+"',
  'mentorSessions: "405"',
  'mentorRating: "4.94"',
  'mentorReviewCount: "225"'
];

for (const phrase of expectedSiteCopy) {
  if (!siteResult.content.includes(phrase)) {
    throw new Error(`Expected normalized site copy was not found: ${phrase}`);
  }
}

if (layoutResult.content.includes("  lastUpdated = siteConfig.lastUpdated,")) {
  throw new Error("BaseLayout still derives page freshness from the deployment date.");
}

console.log(
  `Normalized site source for production build, ${siteResult.changed} site.ts replacement(s), ${layoutResult.changed} BaseLayout replacement(s).`
);

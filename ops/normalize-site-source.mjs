import { readFile, writeFile } from "node:fs/promises";

const sitePath = new URL("../src/site.ts", import.meta.url);
const layoutPath = new URL("../src/layouts/BaseLayout.astro", import.meta.url);
const homePath = new URL("../src/pages/index.astro", import.meta.url);
const aboutPath = new URL("../src/pages/about.astro", import.meta.url);
const faqPath = new URL("../src/pages/resources/faq.astro", import.meta.url);
const mediaKitPath = new URL("../src/pages/media-kit.astro", import.meta.url);
const contactPath = new URL("../src/pages/contact.astro", import.meta.url);

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

const homeResult = await replaceInFile(homePath, [
  {
    from: 'import { icpFirmographics, siteConfig } from "../site";',
    to: 'import { icpFirmographics, proofStats, siteConfig } from "../site";'
  },
  {
    from: "              Contact us",
    to: "              {siteConfig.navBookingLabel}"
  },
  {
    from: "          <dd>£18M+</dd>",
    to: "          <dd>{proofStats.revenueImpact}</dd>"
  },
  {
    from: "          <dd>4.97 / 5</dd>",
    to: "          <dd>{proofStats.mentorRating} / 5</dd>"
  },
  {
    from: "          <dd>479+</dd>",
    to: "          <dd>{proofStats.mentorSessions}</dd>"
  },
  {
    from: "          <dd>200+</dd>",
    to: "          <dd>{proofStats.startupsAdvised}</dd>"
  },
  {
    from: '<div><strong>£15M+</strong> helped founders raise</div>',
    to: '<div><strong>{proofStats.founderRaiseSupport}</strong> helped founders raise</div>'
  },
  {
    from: '<div><strong>200+</strong> startups across four continents</div>',
    to: '<div><strong>{proofStats.startupsAdvised}</strong> startups across four continents</div>'
  },
  {
    from: '<div><strong>4.97 / 5</strong> · <strong>479+</strong> sessions</div>',
    to: '<div><strong>{proofStats.mentorRating} / 5</strong> · <strong>{proofStats.mentorSessions}</strong> sessions</div>'
  },
  {
    from: "            <p>I've mentored 479+ founders at a 4.97 / 5 rating, taught at Cambridge Judge Business School and Imperial College London, and delivered Google Launchpad workshops across the UK, Europe, and Africa.</p>",
    to: "            <p>I've completed {proofStats.mentorSessions} GrowthMentor sessions at a {proofStats.mentorRating} / 5 rating, taught at Cambridge Judge Business School and Imperial College London, and delivered Google Launchpad workshops across the UK, Europe, and Africa.</p>"
  },
  {
    from: '>Contact us</a>',
    to: '>{siteConfig.navBookingLabel}</a>'
  },
  {
    from: '>Contact us <span class="v5-arrow">→</span></a>',
    to: '>{siteConfig.navBookingLabel} <span class="v5-arrow">→</span></a>'
  }
]);

const aboutResult = await replaceInFile(aboutPath, [
  {
    from: '{ value: proofStats.startupsAdvised, label: "AI and SaaS startups advised" },',
    to: '{ value: "20+", label: "Deep AI and SaaS engagements" },'
  },
  {
    from: "Currently splitting time between the UK and Southeast Asia, working with teams across Europe, the US, and APAC.",
    to: "UK-based, working with teams across Europe, the US, and APAC."
  },
  {
    from: "Currently splitting time between the UK and Southeast Asia.",
    to: "UK-based, working across the UK, US, Europe, and APAC."
  }
]);

const faqResult = await replaceInFile(faqPath, [
  {
    from: "UK-based, currently in Asia, serving US, UK, Europe, and APAC clients with US-friendly time-zone overlap.",
    to: "UK-based, serving US, UK, Europe, and APAC clients with US-friendly time-zone overlap."
  },
  {
    from: "Most engagements are with companies between 1M and 10M ARR.",
    to: "Most engagements are with companies between £1M and £20M ARR."
  }
]);

const mediaKitResult = await replaceInFile(mediaKitPath, [
  {
    from: 'value: "UK-based, currently in Asia. Serving US, UK, Europe, APAC"',
    to: 'value: "UK-based, serving US, UK, Europe, and APAC"'
  },
  {
    from: 'value: "20+ startups, £18M+ revenue generated"',
    to: 'value: "20+ deep engagements, £18M+ revenue generated"'
  }
]);

const contactResult = await replaceInFile(contactPath, [
  {
    from: '<input type="hidden" name="source_type" value="contact_enquiry" />',
    to: '<input type="hidden" name="source_type" value="contact-form" />'
  },
  {
    from: "I reply personally. You'll also get a short follow-up series, unsubscribe in one click.",
    to: "I reply personally. Your details are used to respond to this enquiry, not to subscribe you to Growth Notes."
  },
  {
    from: 'source_type: String(fd.get("source_type") || "contact_enquiry"),',
    to: 'source_type: String(fd.get("source_type") || "contact-form"),'
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

const stalePageChecks = [
  [homeResult, "4.97 / 5", "home"],
  [homeResult, "479+", "home"],
  [homeResult, "Contact us", "home"],
  [aboutResult, "splitting time between the UK and Southeast Asia", "about"],
  [faqResult, "currently in Asia", "FAQ"],
  [faqResult, "between 1M and 10M ARR", "FAQ"],
  [mediaKitResult, "currently in Asia", "media kit"],
  [contactResult, "short follow-up series", "contact"],
  [contactResult, 'value="contact_enquiry"', "contact"]
];

for (const [result, phrase, label] of stalePageChecks) {
  if (result.content.includes(phrase)) {
    throw new Error(`Stale ${label} copy remains after normalization: ${phrase}`);
  }
}

if (layoutResult.content.includes("  lastUpdated = siteConfig.lastUpdated,")) {
  throw new Error("BaseLayout still derives page freshness from the deployment date.");
}

console.log(
  `Normalized production source: ${siteResult.changed} site, ${layoutResult.changed} layout, ${homeResult.changed} home, ${aboutResult.changed} about, ${faqResult.changed} FAQ, ${mediaKitResult.changed} media-kit, ${contactResult.changed} contact replacement(s).`
);

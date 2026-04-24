export const siteConfig = {
  name: "Daniel Johnson",
  firstName: "Daniel",
  title: "Fractional CMO for Seed–Series B AI & B2B SaaS | Daniel Johnson",
  description:
    "Fractional CMO and AI-native growth operator for Seed to Series B AI and B2B SaaS founders. Predictable pipeline, sharper positioning, senior growth leadership — without a £150k full-time hire.",
  siteUrl: "https://danieljohnson.xyz",
  canonicalHost: "danieljohnson.xyz",
  redirectHost: "danieljohnsonx.xyz",

  // Primary booking CTA rotates across the site (hero, mid-page, footer).
  // The label that wins in reviews/tests should become the default here.
  bookingUrl: "https://calendly.com/wescalestartups",
  bookingLabel: "Book a 30-min Growth Audit",
  bookingNote:
    "30 minutes. No pitch. We diagnose your biggest growth bottleneck and decide whether it makes sense to work together.",

  // Positioning — fractional is the primary lane; full-time is a supporting note
  // surfaced only in About / FAQ, not on the headline cards.
  primaryLane: "Fractional CMO / Growth Operator for post-PMF Seed–Series B AI & B2B SaaS startups.",
  availability:
    "2 fractional CMO slots available this quarter. Next start window: May 2026.",
  openToFullTime: true, // mentioned only in About FAQ

  email: "daniel@wescalestartups.com",
  phone: "+44 7918 665435",
  location: "UK-based, currently in Asia. Serving US, UK, Europe, and APAC clients with US-friendly overlap.",
  locationShort: "UK-based · US-friendly overlap",
  linkedin: "https://www.linkedin.com/in/danieljohnsonxyz/",
  growthMentor: "https://app.growthmentor.com/mentors/daniel-johnson",
  growthMentorReviews: "https://app.growthmentor.com/mentors/daniel-johnson#reviews-section",
  mentorCruise: "https://mentorcruise.com/mentor/danieljohnson/",
  malt: "https://www.malt.uk/profile/danieljohnsonxyz",
  pangea: "https://pangea.app/profile/daniel-johnson",
  instagram: "https://www.instagram.com/danieljohnsonxyz/",
  youtube: "https://www.youtube.com/@danieljohnson6000",
  youtubeUploadsEmbed: "https://www.youtube-nocookie.com/embed/videoseries?list=UUkEPRVEnpDIdSk8o2vC3_WA",
  companyUrl: "https://www.wescalestartups.com",
  companyName: "We Scale Startups",
  gtmId: "GTM-5S892HK",
  twitterHandle: "@djohnsonxyz",
  ogImage: "/og/default.png",
  headshot: "/images/daniel-headshot.webp",
  sameAs: [
    "https://www.linkedin.com/in/danieljohnsonxyz/",
    "https://app.growthmentor.com/mentors/daniel-johnson",
    "https://mentorcruise.com/mentor/danieljohnson/",
    "https://www.malt.uk/profile/danieljohnsonxyz",
    "https://pangea.app/profile/daniel-johnson",
    "https://www.instagram.com/danieljohnsonxyz/",
    "https://www.youtube.com/@danieljohnson6000",
    "https://www.wescalestartups.com"
  ]
} as const;

// ──────────────────────────────────────────────────────────────────────────
// Positioning — the buyer + outcome rewrite used in the hero subheadline
// and as structured data inputs. Keeping it here means hero/meta/llms.txt
// all draw from one source of truth.
// ──────────────────────────────────────────────────────────────────────────
export const positioning = {
  buyer: "Seed to Series B AI and B2B SaaS founders",
  outcome: "predictable pipeline, sharper positioning, senior growth leadership",
  without: "without a £150k full-time hire",
  subheadline:
    "Fractional CMO for Seed to Series B AI and B2B SaaS founders — predictable pipeline, sharper positioning, and senior growth leadership without a £150k full-time hire."
} as const;

// ──────────────────────────────────────────────────────────────────────────
// Announcement banner (feature-flagged)
// Flip `enabled` to true once the copy is agreed. Keep `message` short.
// ──────────────────────────────────────────────────────────────────────────
export const announcement = {
  enabled: false,
  message: "Limited fractional CMO slots open for Q2 2026.",
  ctaLabel: "See how I work",
  ctaHref: "/fractional-cmo/"
} as const;

// ──────────────────────────────────────────────────────────────────────────
// CTA library — only the approved commercial CTAs used across the site.
// ──────────────────────────────────────────────────────────────────────────
export const ctas = {
  primary: {
    label: "Book a 30-min Growth Audit",
    href: siteConfig.bookingUrl,
    hint: "Free · 30 minutes · No pitch"
  },
  caseStudies: {
    label: "View case studies",
    href: "/case-studies/",
    hint: "See real outcomes"
  },
  bottleneck: {
    label: "Find Your Biggest Growth Bottleneck",
    href: "/#growth-diagnosis",
    hint: "Free · 2 minutes"
  }
} as const;

export const navigation = [
  { href: "/fractional-cmo/", label: "Fractional CMO" },
  { href: "/case-studies/", label: "Results" },
  { href: "/writing/", label: "Writing" },
  { href: "/speaking/", label: "Speaking" },
  { href: "/about/", label: "About" }
] as const;

export const footerNavigation = {
  workWithMe: [
    { href: "/fractional-cmo/", label: "Fractional CMO" },
    { href: "/mentoring/", label: "Founder office hours" },
    { href: "/speaking/", label: "Speaking / workshops" },
    { href: siteConfig.bookingUrl, label: "Book a 30-min Growth Audit" }
  ],
  more: [
    { href: "/writing/", label: "Writing" },
    { href: "/case-studies/", label: "Case studies" },
    { href: "/about/", label: "About" },
    { href: "/newsletter/", label: "Growth Notes" },
    { href: "/growth-bottleneck-checklist/", label: "Growth bottleneck checklist" },
    { href: "/contact/", label: "Contact" }
  ]
} as const;

export const audienceBands = [
  "Seed to Series B founders with real traction and a growth plateau",
  "Founders bottlenecked on sales, pipeline, or GTM clarity",
  "Teams that need senior systems, not junior execution"
] as const;

// Who this is for / not for — used on homepage to qualify leads early.
export const fitSignals = {
  bestFor: [
    "Seed to Series B, post-PMF",
    "Real traction — founders already have paying customers",
    "Founder bottlenecked on growth decisions",
    "Need senior operator judgement, not junior execution",
    "Ready to invest in systems, not campaigns"
  ],
  notFor: [
    "Pre-PMF / pre-revenue teams still searching for a problem",
    "Looking for a cheap agency to run ads",
    "Need a full-time FTE replaced at junior cost",
    "Want vanity metrics reporting rather than revenue impact"
  ]
} as const;

// Why me vs agency — simple comparison table on homepage.
export const agencyVsMe = {
  agency: {
    heading: "A typical agency",
    points: [
      "Junior account managers execute the work",
      "Long retainers, fixed scopes",
      "Vanity metrics in monthly reports",
      "Brand-safe best practice, not contextual calls",
      "Handoffs between strategy and execution"
    ]
  },
  me: {
    heading: "Working with me",
    points: [
      "Senior operator in the seat — no junior layer",
      "Embedded ownership of the growth function",
      "Revenue-focused. Pipeline, conversion, payback",
      "Opinionated, contextual calls on your company",
      "Build the system, then hand it off clean"
    ]
  }
} as const;

// ──────────────────────────────────────────────────────────────────────────
// Why Daniel vs the other five options a founder is weighing. Used on the
// Fractional CMO page as a wider comparison than the homepage 2-up grid.
// ──────────────────────────────────────────────────────────────────────────
export const whyDaniel = [
  {
    option: "Agency",
    cost: "£6–20k/month + long retainer",
    owner: "Account manager, junior team",
    problem: "Channel execution, not senior GTM judgement. Strategy lives in the founder's head."
  },
  {
    option: "Freelancer",
    cost: "£2–6k/month, one channel",
    owner: "Freelancer owns execution",
    problem: "Narrow by design. No ownership of the full system, no senior calls."
  },
  {
    option: "Junior marketer hire",
    cost: "£50–80k + on-costs",
    owner: "Needs your direction",
    problem: "You become the CMO. The bottleneck you wanted to fix now reports to you."
  },
  {
    option: "Full-time Head of Growth",
    cost: "£120–180k + equity",
    owner: "Full ownership",
    problem: "Often too early. A 6-month hire cycle and a 12-month ramp before impact."
  },
  {
    option: "Generic consultant",
    cost: "£500–2,000/day",
    owner: "Advice only",
    problem: "Ships a deck, disappears. No operating ownership, no accountability for revenue."
  },
  {
    option: "Daniel (Fractional CMO)",
    cost: "£7.5–12k/month, 3-month minimum",
    owner: "Senior operator in the seat",
    problem: "Owns GTM priorities, reporting, and the team's weekly rhythm. Builds the system, then hands it off clean.",
    highlight: true
  }
] as const;

// ──────────────────────────────────────────────────────────────────────────
// ROI framing for the pricing section on Fractional CMO page.
// ──────────────────────────────────────────────────────────────────────────
export const roiFrames = [
  "Less than one bad senior hire.",
  "Faster than waiting 6 months to recruit a full-time CMO.",
  "Cheaper than an agency + Head of Growth combo.",
  "No recruitment fee, no equity dilution, no 3-month notice period."
] as const;

// ──────────────────────────────────────────────────────────────────────────
// Affiliations (logos). WSS removed — it's Daniel's own company, not an
// external trust signal. Only include logos that ship as assets; text-only
// badges are rendered separately in the component.
// ──────────────────────────────────────────────────────────────────────────
export const trustLogos = [
  {
    id: "growthmentor",
    src: "/images/logos/growthmentor.png",
    alt: "GrowthMentor — Top-Rated Mentor",
    label: "GrowthMentor"
  },
  {
    id: "google",
    src: "/images/logos/google.webp",
    alt: "Google for Startups — Growth Mentor",
    label: "Google for Startups"
  },
  {
    id: "cambridge",
    src: "/images/logos/cambridge.webp",
    alt: "University of Cambridge — Visiting Lecturer",
    label: "Cambridge"
  }
] as const;

// Text-only affiliation badges — shown alongside logos until image assets
// are added to public/images/logos/.
export const trustBadges = [
  { label: "Techstars Mentor", variant: "compact" },
  { label: "Google for Startups — Growth Mentor", variant: "wide" },
  { label: "Cambridge Judge — Visiting Lecturer", variant: "wide" }
] as const;

// Headline metrics on the homepage. Order matters — leading proof first.
// £18M+ moved OUT of here — it now lives only in the dark "lifetimeTotals"
// strip lower down the page, to avoid the hero + proof-bar duplication.
export const proofBar = [
  { value: "4.93 / 5", label: "from 219 reviews on GrowthMentor", source: "https://app.growthmentor.com/mentors/daniel-johnson#reviews-section" },
  { value: "388+", label: "mentor sessions delivered" },
  { value: "20+", label: "AI & SaaS startups advised" },
  { value: "£6.8M+", label: "ad spend managed" }
] as const;

// Lifetime totals — one strip, lower on the homepage. Single home for the
// £18M+ revenue claim so it does not double-appear with the hero.
export const lifetimeTotals = [
  "£18M+ revenue generated for clients",
  "£6.8M+ ad spend managed",
  "20+ startups scaled",
  "Helped founders raise £15M+"
] as const;

// Short testimonial snippet used in the active footer and sticky CTA.
export const footerTestimonial = {
  quote:
    "Daniel walked in, saw the whole system at once, and named the two levers that mattered. Inside 60 days we had a weekly rhythm and pipeline actually built to our ICP.",
  name: "Christian A.",
  role: "Founder — AI Healthtech"
} as const;

export const principleCards = [
  {
    title: "Growth is an operating system",
    body: "I help teams replace one-off campaigns with a system for prioritising, learning, and compounding what works."
  },
  {
    title: "Evidence beats noise",
    body: "Customer research, instrumentation, and experiment design sit before channel scaling, not after it."
  },
  {
    title: "Clarity creates speed",
    body: "The real unlock is usually sharper positioning, cleaner decision-making, and a team that knows what to test next."
  }
] as const;

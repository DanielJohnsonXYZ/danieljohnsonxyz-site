export const siteConfig = {
  name: "Daniel Johnson",
  firstName: "Daniel",
  title: "Daniel Johnson | Fractional CMO & Growth Operator for AI & B2B SaaS",
  description:
    "Fractional CMO and AI-native growth operator for post-PMF AI and B2B SaaS startups (Seed to Series B). Turn traction into predictable revenue.",
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
    "Currently accepting a small number of fractional CMO engagements for Q2 2026.",
  openToFullTime: true, // mentioned only in About FAQ

  email: "daniel@wescalestartups.com",
  phone: "+44 7918 665435",
  location: "UK-based, currently in Asia. Serving US, UK, Europe, and APAC clients with US-friendly overlap.",
  locationShort: "UK-based · US-friendly overlap",
  linkedin: "https://www.linkedin.com/in/danieljohnsonxyz/",
  growthMentor: "https://app.growthmentor.com/mentors/daniel-johnson",
  growthMentorReviews: "https://app.growthmentor.com/mentors/daniel-johnson#reviews-section",
  youtube: "https://www.youtube.com/@danieljohnson6000",
  youtubeUploadsEmbed: "https://www.youtube-nocookie.com/embed/videoseries?list=UUkEPRVEnpDIdSk8o2vC3_WA",
  companyUrl: "https://www.wescalestartups.com",
  companyName: "We Scale Startups",
  gtmId: "GTM-5S892HK",
  twitterHandle: "@djohnsonxyz",
  ogImage: "/og/default.png",
  headshot: "/images/daniel-headshot.webp"
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
// CTA library — outcome-led labels used across the site. Import by key so
// each section can pull the right variant without hard-coding copy.
// ──────────────────────────────────────────────────────────────────────────
export const ctas = {
  primary: {
    label: "Book a 30-min Growth Audit",
    href: "/book-a-call/",
    hint: "Free · 30 minutes · No pitch"
  },
  diagnosis: {
    label: "Get a Growth Diagnosis",
    href: "/#growth-diagnosis",
    hint: "2-minute quiz · Tailored output"
  },
  bottleneck: {
    label: "Find Your Biggest Growth Bottleneck",
    href: "/#growth-diagnosis",
    hint: "Free · 2 minutes"
  },
  revenueReview: {
    label: "Free Revenue Growth Review",
    href: "/book-a-call/",
    hint: "30 minutes with Daniel"
  },
  gtmAudit: {
    label: "Diagnose Your GTM Issues",
    href: "/book-a-call/",
    hint: "30-min working session"
  }
} as const;

export const navigation = [
  { href: "/", label: "Work with me" },
  { href: "/case-studies/", label: "Results" },
  { href: "/speaking/", label: "Speaking" },
  { href: "/writing/", label: "Writing" },
  { href: "/about/", label: "About" }
] as const;

export const footerNavigation = {
  workWithMe: [
    { href: "/fractional-cmo/", label: "Fractional CMO" },
    { href: "/advisory/", label: "Advisory days" },
    { href: "/mentoring/", label: "Mentoring" },
    { href: "/book-a-call/", label: "Book a Growth Audit" }
  ],
  // Speaking sub-links consolidated under a single parent section.
  speaking: [
    { href: "/speaking/", label: "Overview" },
    { href: "/topics-and-talks/", label: "Topics & talks" },
    { href: "/podcast-appearances/", label: "Podcast appearances" },
    { href: "/press-and-media/", label: "Press & media" },
    { href: "/book-daniel-to-speak/", label: "Book Daniel to speak" }
  ],
  more: [
    { href: "/writing/", label: "Writing" },
    { href: "/case-studies/", label: "Case studies" },
    { href: "/about/", label: "About" },
    { href: "/now/", label: "Now" },
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
// Affiliations (logos). WSS removed — it's Daniel's own company, not an
// external trust signal. Only include logos that ship as assets; text-only
// badges are rendered separately in the component.
// ──────────────────────────────────────────────────────────────────────────
export const trustLogos = [
  {
    src: "/images/logos/growthmentor.png",
    alt: "GrowthMentor",
    label: "GrowthMentor"
  },
  {
    src: "/images/logos/google.webp",
    alt: "Google for Startups (Launchpad)",
    label: "Google for Startups"
  },
  {
    src: "/images/logos/cambridge.webp",
    alt: "University of Cambridge",
    label: "Cambridge"
  }
] as const;

// Text-only affiliation badges — shown alongside logos until image assets
// are added to public/images/logos/.
export const trustBadges = [
  "Techstars Alum",
  "Google for Startups — Growth Mentor",
  "Cambridge Judge — Visiting Lecturer"
] as const;

// Headline metrics on the homepage. Order matters — leading proof first.
export const proofBar = [
  { value: "4.93 / 5", label: "from 219 reviews on GrowthMentor", source: "https://app.growthmentor.com/mentors/daniel-johnson#reviews-section" },
  { value: "388+", label: "mentor sessions delivered" },
  { value: "20+", label: "AI & SaaS startups advised" },
  { value: "£18M+", label: "revenue generated for clients" },
  { value: "£6.8M+", label: "ad spend managed" }
] as const;

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

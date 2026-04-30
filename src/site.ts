export const siteConfig = {
  name: "Daniel Johnson",
  firstName: "Daniel",
  title: "Fractional CMO for Seed–Series B AI & B2B SaaS | Daniel Johnson",
  description:
    "Fractional CMO and AI-native growth operator for Seed to Series B AI and B2B SaaS founders. Predictable pipeline, sharper positioning, senior growth leadership — without a £150k full-time hire.",
  siteUrl: "https://danieljohnson.xyz",
  canonicalHost: "danieljohnson.xyz",
  redirectHost: "danieljohnsonx.xyz",
  lastUpdated: "30 April 2026",

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
  companyUrl: "https://www.wescalestartups.com",
  companyName: "We Scale Startups",
  gtmId: "GTM-5S892HK",
  twitterHandle: "@djohnsonxyz",
  ogImage: "/og/default.png",
  headshot: "/images/daniel-hero-cutout.webp",
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

export const siteImages = {
  heroCutout: {
    src: "/images/daniel-hero-cutout.webp",
    width: 760,
    height: 925,
    alt: "Daniel Johnson, fractional CMO and AI-native GTM operator"
  },
  outdoorPortrait: {
    src: "/images/daniel-outdoor-portrait.webp",
    width: 1200,
    height: 1460,
    alt: "Portrait of Daniel Johnson outdoors"
  },
  speakingCircle: {
    src: "/images/daniel-speaking-circle.webp",
    width: 900,
    height: 900,
    alt: "Daniel Johnson speaking with a microphone"
  },
  speakingMic: {
    src: "/images/daniel-speaking-mic.webp",
    width: 1080,
    height: 1078,
    alt: "Daniel Johnson presenting during a startup growth session"
  },
  speakingStageBw: {
    src: "/images/daniel-speaking-stage-bw.webp",
    width: 1100,
    height: 1100,
    alt: "Daniel Johnson speaking on stage"
  }
} as const;

export const proofStats = {
  revenueImpact: "£18M+",
  adSpend: "£6.8M+",
  startupsAdvised: "20+",
  mentorSessions: "479+",
  mentorRating: "4.97",
  mentorReviewCount: "220",
  founderRaiseSupport: "£15M+",
  founderExits: "Two founder exits — eQuoo (mental-health tech) and an eCommerce brand"
} as const;

// ──────────────────────────────────────────────────────────────────────────
// Single-idea anchor — the one sentence everything else on the site
// reinforces. Used as the dark-section H2 on the home page, the eyebrow on
// /start-here, and the opening line of /llms.txt for AI search engines.
// ──────────────────────────────────────────────────────────────────────────
export const singleIdea = {
  short: "Growth systems that run without you.",
  long: "I don't run campaigns. I build growth systems that run without you."
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
  // Subheadline now leads with OUTCOME, not category. The category lives in
  // the eyebrow above the H1, so the first thing a founder reads after the
  // headline is what they actually get.
  subheadline:
    "Predictable pipeline, sharper positioning, and senior growth leadership for Seed to Series B AI and B2B SaaS founders — without a £150k full-time hire."
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
  },
  startHere: {
    label: "Start here",
    href: "/start-here/",
    hint: "5-minute orientation"
  }
} as const;

export const navigation = [
  { href: "/start-here/", label: "Start here" },
  { href: "/fractional-cmo/", label: "Fractional CMO" },
  { href: "/case-studies/", label: "Results" },
  { href: "/writing/", label: "Writing" },
  { href: "/speaking/", label: "Speaking" },
  { href: "/about/", label: "About" }
] as const;

export const navigationGroups = [
  {
    label: "Work with me",
    href: "/start-here/",
    items: [
      { href: "/start-here/", label: "Start here", description: "Five-minute orientation. Where to begin if it's your first visit." },
      { href: "/growth-audit/", label: "30-min Growth Audit", description: "Free diagnostic call. Bottleneck read in 30 minutes." },
      { href: "/strategy-sprint/", label: "Strategy Sprint", description: "From £6k. 2–4 weeks. Plan, artefacts, first wins." },
      { href: "/fractional-cmo/", label: "Fractional CMO", description: "From £7.5k/mo. Embedded senior GTM leadership." },
      { href: "/mentoring/", label: "Founder office hours", description: "Focused growth decisions and second-brain sessions." },
      { href: "/speaking/", label: "Speaking", description: "Talks, workshops, and founder-cohort sessions." }
    ]
  },
  {
    label: "Compare",
    href: "/fractional-cmo/",
    items: [
      { href: "/fractional-cmo-vs-agency/", label: "Fractional CMO vs. agency", description: "Senior judgement vs. junior execution. When each is right." },
      { href: "/fractional-cmo-vs-full-time-cmo/", label: "Fractional CMO vs. full-time CMO", description: "Cost, ramp, ownership, and notice-period maths." },
      { href: "/fractional-cmo/#why-daniel", label: "All six options compared", description: "Agency, freelancer, junior, full-time, consultant, fractional CMO." }
    ]
  },
  {
    label: "Expertise",
    href: "/gtm-systems/",
    items: [
      { href: "/gtm-systems/", label: "GTM systems", description: "ICP, positioning, channel strategy, operating cadence." },
      { href: "/product-led-growth/", label: "Product-led growth", description: "Activation, onboarding, trial conversion, retention." },
      { href: "/experimentation/", label: "Experimentation", description: "Hypotheses, prioritisation, decision rules, learning loops." },
      { href: "/ai-native-workflows/", label: "AI-native workflows", description: "Research, messaging, briefs, reporting, and faster iteration." },
      { href: "/revenue-operations/", label: "Revenue operations", description: "Funnel visibility, pipeline process, reporting cadence." }
    ]
  },
  {
    label: "Media",
    href: "/media-kit/",
    items: [
      { href: "/media-kit/", label: "Media kit", description: "Bios, headshots, topics, proof, and producer assets." },
      { href: "/podcast-guest/", label: "Podcast guest", description: "Book Daniel for AI-native GTM and growth-system interviews." },
      { href: "/speaking/", label: "Speaking", description: "Talks, workshops, panels, and founder-cohort sessions." },
      { href: "/writing/", label: "Writing", description: "Essays and practical growth notes." },
      { href: "/now/", label: "Now", description: "Current work, availability, and focus." }
    ]
  }
] as const;

export const footerNavigation = {
  workWithMe: [
    { href: "/start-here/", label: "Start here" },
    { href: "/growth-audit/", label: "30-min Growth Audit" },
    { href: "/strategy-sprint/", label: "Strategy Sprint" },
    { href: "/fractional-cmo/", label: "Fractional CMO" },
    { href: "/mentoring/", label: "Founder office hours" },
    { href: "/speaking/", label: "Speaking / workshops" }
  ],
  expertise: [
    { href: "/gtm-systems/", label: "GTM systems" },
    { href: "/product-led-growth/", label: "Product-led growth" },
    { href: "/experimentation/", label: "Experimentation" },
    { href: "/ai-native-workflows/", label: "AI-native workflows" },
    { href: "/revenue-operations/", label: "Revenue operations" }
  ],
  more: [
    { href: "/fractional-cmo-vs-agency/", label: "vs. Agency" },
    { href: "/fractional-cmo-vs-full-time-cmo/", label: "vs. Full-time CMO" },
    { href: "/case-studies/", label: "Case studies" },
    { href: "/writing/", label: "Writing" },
    { href: "/media-kit/", label: "Media kit" },
    { href: "/podcast-guest/", label: "Podcast guest" },
    { href: "/now/", label: "Now" },
    { href: "/about/", label: "About" },
    { href: "/newsletter/", label: "Growth Notes" },
    { href: "/growth-bottleneck-checklist/", label: "Growth bottleneck checklist" },
    { href: "/contact/", label: "Contact" }
  ]
} as const;

export const socialLinks = [
  { href: siteConfig.linkedin, label: "LinkedIn" },
  { href: siteConfig.youtube, label: "YouTube" },
  { href: siteConfig.growthMentor, label: "GrowthMentor" },
  { href: siteConfig.mentorCruise, label: "MentorCruise" },
  { href: siteConfig.instagram, label: "Instagram" },
  { href: siteConfig.malt, label: "Malt" },
  { href: siteConfig.pangea, label: "Pangea" }
] as const;

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

// ROI framing for the pricing section on Fractional CMO page.
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
  { id: "growthmentor", src: "/images/logos/growthmentor.png", alt: "GrowthMentor — Top-Rated Mentor", label: "GrowthMentor" },
  { id: "google", src: "/images/logos/google.webp", alt: "Google for Startups — Growth Mentor", label: "Google for Startups" },
  { id: "cambridge", src: "/images/logos/cambridge.webp", alt: "University of Cambridge — Visiting Lecturer", label: "Cambridge" }
] as const;

export const trustAffiliations = [
  "Techstars mentor",
  "Imperial College London guest lecturer",
  "General Assembly trainer",
  "UK Space Agency innovation talk"
] as const;

// Headline metrics on the homepage. Order matters — leading proof first.
// £18M+ revenue is now the lead metric: it's the most concrete dollar-tangible
// claim and what founders care about most. £6.8M+ ad spend moves to slot 4.
export const proofBar = [
  { icon: "💰", value: proofStats.revenueImpact, label: "client revenue generated", source: "/case-studies/" },
  { icon: "⭐", value: `${proofStats.mentorRating} / 5`, label: `from ${proofStats.mentorReviewCount} reviews on GrowthMentor`, source: "https://app.growthmentor.com/mentors/daniel-johnson#reviews-section" },
  { icon: "🚀", value: proofStats.startupsAdvised, label: "AI & SaaS startups advised" },
  { icon: "📈", value: proofStats.adSpend, label: "ad spend managed" }
] as const;

// Lifetime totals — one strip, lower on the homepage. Now used as a wider
// "lifetime aggregate" line that complements the proof bar without duplicating
// its specific metrics. £18M+ stays as the lead claim where it matters.
export const lifetimeTotals = [
  `${proofStats.mentorSessions} mentor sessions delivered`,
  "20+ AI & B2B SaaS startups scaled",
  `${proofStats.founderRaiseSupport} helped founders raise`,
  proofStats.founderExits
] as const;

export const aiWorkflowExamples = [
  {
    input: "Customer calls",
    synthesis: "Message bank",
    decision: "Which pain is sharp enough to lead with",
    output: "Landing page tests"
  },
  {
    input: "Competitor teardown",
    synthesis: "Positioning gaps",
    decision: "Where the category is overclaimed or underexplained",
    output: "Campaign angles"
  },
  {
    input: "CRM data",
    synthesis: "Pipeline diagnosis",
    decision: "What to stop, fix, or scale this week",
    output: "Weekly decision rhythm"
  }
] as const;

export const speakingVideos = [
  {
    id: "9CR19_PiuGs",
    title: "Daniel Johnson Introduction",
    source: "How Startups Win With AI",
    description: "A quick intro to Daniel's growth operator background and current point of view."
  },
  {
    id: "B_GVNYU_StM",
    title: "What The Hell is Growth",
    source: "How Startups Win With AI",
    description: "An actionable guide to growth marketing for startup founders."
  },
  {
    id: "p5Q7PuUNHtc",
    title: "How to Use AI for Product Market Fit",
    source: "How Startups Win With AI",
    description: "A practical view on using AI to sharpen product-market fit and startup growth."
  },
  {
    id: "A4dE89dp3K4",
    title: "Founding Partner of We Scale Startups",
    source: "First Customers",
    description: "A founder interview covering early customers, building businesses, and growth lessons."
  },
  {
    id: "lapORJpeEHE",
    title: "Growth Marketing for Startups",
    source: "TechGenez",
    description: "A startup growth session from StartupsExpo 2022."
  },
  {
    id: "25UGbSw941g",
    title: "Getting the Best Out of Your Team",
    source: "Staff Treats",
    description: "A conversation on team performance and founder operating habits."
  },
  {
    id: "Qg9vSybTKz8",
    title: "Beginners Guide to Growth Marketing",
    source: "Tom West",
    description: "A beginner-friendly explanation of growth marketing foundations."
  },
  {
    id: "rJoHvpYewEo",
    title: "Repeatable, Predictable & Scalable Growth Engines",
    source: "GrowthMatch",
    description: "How tech startups can build growth engines rather than chase isolated tactics."
  },
  {
    id: "jgn2QTH8c44",
    title: "Actionable Growth Marketing for Startups",
    source: "Unit Network",
    description: "A London startup growth talk with practical acquisition and experimentation ideas."
  },
  {
    id: "ZKU9B_jcrQU",
    title: "What Startups in Taiwan Neglect to Prioritize",
    source: "Startup Taiwan",
    description: "A startup ecosystem talk on neglected growth and prioritisation decisions."
  }
].map((video) => ({
  ...video,
  href: `https://www.youtube.com/watch?v=${video.id}`,
  embed: `https://www.youtube-nocookie.com/embed/${video.id}`,
  thumbnail: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
}));

// ──────────────────────────────────────────────────────────────────────────
// Home-page service ladder — a CLEAN buying ladder, not a service-shape mix.
// Audit (free entry) → Sprint (£6k, fixed scope) → Fractional CMO (embedded).
// Speaking and Office Hours move below the ladder as a "secondary" mention so
// the home page reads like a buying journey, not a menu of unrelated services.
// ──────────────────────────────────────────────────────────────────────────
export const homeServiceLadder = [
  {
    tier: "Tier 1 · Entry",
    heading: "30-min Growth Audit",
    price: "Free",
    cadence: "30 minutes · No pitch · No deck",
    body:
      "Bring the messy growth question. We diagnose the bottleneck and decide together whether working together makes sense — or where else to go if it doesn't.",
    bestFor:
      "Anyone unsure whether they need a fractional CMO, an agency, an internal hire, or just a sharper plan.",
    outcome: "A clearer read on the bottleneck and the most useful next step.",
    href: "/growth-audit/",
    cta: "See what's covered",
    primary: false
  },
  {
    tier: "Tier 2 · Plan",
    heading: "Strategy Sprint",
    price: "From £6k",
    cadence: "2–4 week engagement",
    body:
      "Diagnose, prioritise, and ship the first artefacts. ICP, positioning, 90-day priorities, weekly dashboard, first acquisition or conversion test live.",
    bestFor:
      "Founders who need the plan, the operating rhythm, and the first wins before committing to ongoing work.",
    outcome: "A 90-day growth plan, the first artefacts, and a working operating rhythm.",
    href: "/strategy-sprint/",
    cta: "See Strategy Sprint scope",
    primary: false
  },
  {
    tier: "Tier 3 · Embedded",
    heading: "Fractional CMO",
    price: "From £7.5k",
    cadence: "/ month · 3-month minimum",
    body:
      "Embedded senior ownership 1–2 days a week. GTM priorities, reporting, weekly rhythm, hiring and agency calls. Builds the system and then hands it off clean.",
    bestFor:
      "£1m–£10m ARR, founder-led, growth stuck, senior help needed before or alongside a £150k+ full-time CMO hire.",
    outcome: "Pipeline rhythm, sharper positioning, and a growth system the team can run after I'm gone.",
    href: "/fractional-cmo/",
    cta: "Explore Fractional CMO",
    primary: true
  }
] as const;

// ──────────────────────────────────────────────────────────────────────────
// Comparison: Fractional CMO vs Agency. Used on /fractional-cmo-vs-agency.
// High-intent SEO term. Real founders type this query into Google and AI
// search engines when they're picking between the two.
// ──────────────────────────────────────────────────────────────────────────
export const vsAgency = {
  title: "Fractional CMO vs. Agency",
  rows: [
    { dimension: "Who's in the seat", agency: "Account manager + junior team", fractional: "Senior operator (10+ years), embedded", winner: "fractional" },
    { dimension: "Scope", agency: "Defined channel — paid, SEO, content, outbound", fractional: "Whole GTM system — ICP, positioning, channels, conversion, reporting", winner: "fractional" },
    { dimension: "Strategy ownership", agency: "Founder still owns it", fractional: "Operator owns it, founder makes the calls", winner: "fractional" },
    { dimension: "Reporting", agency: "Activity dashboards (clicks, impressions)", fractional: "Pipeline, conversion, payback, what to scale/stop/fix", winner: "fractional" },
    { dimension: "Decision-making", agency: "Brand-safe best practice", fractional: "Opinionated, contextual to your company", winner: "fractional" },
    { dimension: "Speed", agency: "Slower — agreed scope, change orders", fractional: "Faster — embedded operator, no handoffs", winner: "fractional" },
    { dimension: "Typical cost", agency: "£6–20k/month + retainer", fractional: "£7.5–12k/month, 3-month minimum", winner: null },
    { dimension: "When it's right", agency: "You already have a CMO and need execution capacity", fractional: "You don't yet have a CMO and growth needs senior judgement", winner: null }
  ],
  whenAgency: [
    "You already have senior GTM leadership in-house",
    "You need execution capacity in a specific channel — not strategic ownership",
    "Brand and compliance constraints require a credentialled agency partner",
    "Scope is fixed and well-understood (e.g. paid media at scale)"
  ],
  whenFractional: [
    "Founder still owns growth decisions and it's becoming a bottleneck",
    "Strategy lives in the founder's head — there's no operating system",
    "Reporting shows activity, not what to scale, stop, or fix",
    "You'd hire a £150k+ CMO if you were ready, but you're not yet"
  ],
  faq: [
    {
      question: "Can I do both — fractional CMO and an agency?",
      answer:
        "Often yes. The fractional CMO sets priorities, channel rules, and reporting; the agency executes a specific channel inside that framework. The CMO runs the agency relationship instead of the founder. That's frequently the cleanest setup for £1m–£10m ARR teams."
    },
    {
      question: "Is a fractional CMO more expensive than an agency?",
      answer:
        "Per month, similar — £7.5–12k for a fractional CMO, £6–20k for a typical agency. But you're buying different things. The agency runs a channel; the fractional CMO runs the system. Most agency engagements still need someone senior to direct them — that's the role the fractional CMO fills."
    },
    {
      question: "How long does a fractional CMO engagement run?",
      answer:
        "3 to 9 months typically. The first 90 days build the diagnosis, operating rhythm, and first system. After that, it's either scale, hand off to internal hires, or move to a lighter advisory cadence."
    }
  ]
} as const;

// ──────────────────────────────────────────────────────────────────────────
// Comparison: Fractional CMO vs Full-time CMO. Used on /fractional-cmo-vs-
// full-time-cmo. Another high-intent SEO query. The honest answer is "it
// depends on stage" — this page makes the trade-offs visible.
// ──────────────────────────────────────────────────────────────────────────
export const vsFulltimeCMO = {
  title: "Fractional CMO vs. Full-time CMO",
  rows: [
    { dimension: "All-in cost", fractional: "£7.5–12k/month (~£90–144k/year)", fulltime: "£120–180k base + 0.5–1.5% equity + on-costs", winner: "fractional" },
    { dimension: "Time to start", fractional: "Days", fulltime: "6 months to hire, 12 months to ramp", winner: "fractional" },
    { dimension: "Commitment", fractional: "3-month minimum, rolling thereafter", fulltime: "Permanent — 3-month notice on either side", winner: "fractional" },
    { dimension: "Risk if it doesn't fit", fractional: "Low — end the engagement, no severance", fulltime: "High — recruitment fee, equity dilution, 3-month notice", winner: "fractional" },
    { dimension: "Time on the seat", fractional: "1–2 days a week", fulltime: "5 days a week + leadership presence", winner: "fulltime" },
    { dimension: "Team management", fractional: "Yes, but limited bandwidth", fulltime: "Yes, full ownership", winner: "fulltime" },
    { dimension: "External representation", fractional: "Limited — focused on operating", fulltime: "Yes — investors, partners, hires", winner: "fulltime" },
    { dimension: "When it's right", fractional: "Pre-£10m ARR, growth stuck, no senior owner yet", fulltime: "Post-£10m ARR, growth proven, ready to scale a marketing org", winner: null }
  ],
  whenFractional: [
    "£1m–£10m ARR or clear post-PMF traction",
    "Founder still carrying revenue decisions",
    "You need senior judgement now, but a 6-month hire cycle is too slow",
    "You're not yet sure what shape the full-time CMO role should take",
    "You want to de-risk the next senior hire by getting the system in place first"
  ],
  whenFulltime: [
    "Post-£10m ARR with proven growth",
    "Marketing has its own org chart and the role is clearly scoped",
    "External presence (analyst calls, partner relationships, recruiting) is part of the role",
    "Equity-based compensation is a real motivator for the candidate",
    "You can absorb 6 months of hiring + 12 months of ramp"
  ],
  bridge:
    "Many founders use a fractional CMO as the bridge: 6–12 months of embedded leadership while they recruit, then the fractional CMO hands off the operating system to the new full-time hire. Cleaner than starting cold.",
  faq: [
    {
      question: "Can a fractional CMO bridge into a full-time hire?",
      answer:
        "Yes. The most common pattern: fractional CMO embeds for 6–9 months, builds the operating system, scopes the full-time role accurately, helps interview, then hands off cleanly. The new CMO inherits a working system instead of starting from zero."
    },
    {
      question: "Will a fractional CMO sit in board meetings?",
      answer:
        "Sometimes, by exception. Fractional engagements are scoped on operating impact, not external representation. Investor calls and board meetings are typically the founder's job until the full-time CMO is in place."
    },
    {
      question: "What's the per-hour cost difference?",
      answer:
        "Roughly the same — £7.5k/month for ~32 hours of senior time is ~£235/hour, comparable to a £150k full-time CMO once equity, on-costs, and ramp time are factored in. But the fractional version starts in days, not months."
    }
  ]
} as const;

// ──────────────────────────────────────────────────────────────────────────
// /growth-audit page data — free 30-min diagnostic call. SEO surface for
// "free growth audit" queries; bottom-of-funnel intent.
// ──────────────────────────────────────────────────────────────────────────
export const growthAuditPage = {
  agenda: [
    { title: "Bottleneck read", body: "Where's the constraint right now — ICP, channel, conversion, founder-led sales, or reporting?" },
    { title: "Stage check", body: "Where the company actually is on the post-PMF curve, and what that means for what to fix next." },
    { title: "Honest fit call", body: "Is a fractional CMO the right shape? Or an agency, freelancer, internal hire, or just sharper focus?" },
    { title: "Next step", body: "A clear recommendation. If we're a fit, the engagement shape that makes sense. If not, who to talk to instead." }
  ],
  bring: [
    "Your stage and current ARR or signal",
    "Top 1–2 growth questions you actually want answered",
    "What you've tried that didn't work",
    "Anything you're considering — a hire, an agency, a re-org, a campaign"
  ],
  notForYou: [
    "If you're pre-revenue and pre-PMF — that's customer research time, not GTM time",
    "If you've already decided what to do and want validation",
    "If you want a sales pitch — you won't get one"
  ],
  faq: [
    {
      question: "Is the call really free?",
      answer:
        "Yes. 30 minutes, no pitch, no deck. The economics work because most calls end with either a clear engagement shape, or a clear no — and 'no' founders refer the right founders later."
    },
    {
      question: "What if you decide we're not a fit?",
      answer:
        "I'll tell you on the call and point you to the right person — an agency, a different operator, or just the right next step you can do yourself. That's the deal."
    },
    {
      question: "Will I be sent recordings, decks, or follow-up sequences after?",
      answer:
        "No. If we agree to work together, the next step is a scoping conversation. If not, the call ends with the recommendation and you don't hear from me again unless you reach out."
    }
  ]
} as const;

// ──────────────────────────────────────────────────────────────────────────
// /strategy-sprint page data — £6k, 2–4 week fixed-scope engagement.
// Lower commitment than full Fractional CMO; higher than the audit.
// ──────────────────────────────────────────────────────────────────────────
export const strategySprintPage = {
  price: "From £6,000",
  cadence: "2–4 weeks · Fixed scope",
  oneLiner:
    "Diagnose the bottleneck, set 90-day priorities, ship the first artefacts. The plan and the operating rhythm before you commit to ongoing work.",
  weeks: [
    {
      week: "Week 1 — Diagnose",
      bullets: [
        "Audit ICP, pipeline, funnel, CRM, acquisition channels, positioning, and current reporting",
        "Interview founder, sales/customer team, and 3–5 customers",
        "Build the constraint map: where the system is leaking pipeline, conversion, retention, or decision speed"
      ]
    },
    {
      week: "Week 2 — Prioritise",
      bullets: [
        "Agree the 90-day growth priorities — what to scale, stop, fix",
        "Decide the operating cadence: weekly meeting, dashboard, owner map",
        "Sequence the first 2–3 acquisition or conversion tests"
      ]
    },
    {
      week: "Weeks 3–4 — Ship",
      bullets: [
        "Ship the first artefacts: ICP doc, positioning lines, weekly dashboard, first campaign brief",
        "Run the first growth meeting with the team using the new rhythm",
        "Hand off a 90-day plan the team can actually execute"
      ]
    }
  ],
  deliverables: [
    "ICP and positioning doc",
    "90-day growth priorities (numbered, owner-mapped)",
    "Weekly growth dashboard (the metrics the team checks every Monday)",
    "First campaign brief or conversion test, ready to ship",
    "Operating-rhythm playbook — meeting structure, decision rules, reporting cadence",
    "Recommendation on the next engagement shape (fractional CMO, internal hire, agency, or none)"
  ],
  bestFor: [
    "Post-PMF founder-led teams who need the plan first",
    "Companies considering a CMO hire who want the role scoped before recruiting",
    "Teams emerging from a re-org, pivot, or funding round who need fresh GTM clarity",
    "Founders who want senior judgement without a 3-month minimum"
  ],
  notFor: [
    "Pre-PMF teams — diagnosis can't fix product-market fit",
    "Teams that need ongoing execution, not a plan",
    "Companies that won't make hard priority calls after the sprint"
  ],
  faq: [
    {
      question: "Why fixed scope and fixed price?",
      answer:
        "Because the value is the diagnosis and the operating system, and that's a known shape of work. Hourly billing rewards drag; fixed pricing rewards getting to clarity fast."
    },
    {
      question: "Can the sprint extend into a fractional engagement?",
      answer:
        "Yes — and often does. Roughly half of sprints become fractional engagements; the other half end with a clear plan the team executes themselves, with optional advisory check-ins."
    },
    {
      question: "What happens if we don't like the diagnosis?",
      answer:
        "It's a working diagnosis, not a verdict. The week-2 prioritisation session is collaborative — your team's context shapes the priorities, and there's room to push back. If after the sprint you don't think it's useful, you don't pay for any further work."
    }
  ]
} as const;

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

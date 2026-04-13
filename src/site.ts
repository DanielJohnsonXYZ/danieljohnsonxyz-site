export const siteConfig = {
  name: "Daniel Johnson",
  firstName: "Daniel",
  title: "Daniel Johnson | Growth Systems for Ambitious Startups",
  description:
    "I help ambitious startups turn early traction into durable, repeatable growth systems through sharper GTM judgment, experimentation, and commercial clarity.",
  siteUrl: "https://danieljohnson.xyz",
  canonicalHost: "danieljohnson.xyz",
  redirectHost: "danieljohnsonx.xyz",
  bookingUrl: "https://calendly.com/wescalestartups",
  email: "daniel@wescalestartups.com",
  phone: "+44 7918 665435",
  location: "London, United Kingdom",
  linkedin: "https://www.linkedin.com/in/danieljohnsonxyz/",
  growthMentor: "https://app.growthmentor.com/mentors/daniel-johnson",
  companyUrl: "https://www.wescalestartups.com",
  companyName: "We Scale Startups",
  gtmId: "GTM-XXXXXXX",
  twitterHandle: "@djohnsonxyz",
  ogImage: "/og/default.svg",
  headshot: "/images/daniel-headshot.png"
} as const;

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/advisory", label: "Advisory" },
  { href: "/speaking", label: "Speaking" },
  { href: "/insights", label: "Insights" }
] as const;

export const audienceBands = [
  "Founder-led startups finding their first repeatable growth motion",
  "Series A and B teams tightening the link between product, positioning, and revenue",
  "Innovation programmes that need a speaker who can make growth practical"
] as const;

export const trustLogos = [
  {
    src: "/images/logos/google.webp",
    alt: "Google logo from Daniel's public web footprint",
    label: "Google Launchpad"
  },
  {
    src: "/images/logos/growthmentor.png",
    alt: "GrowthMentor logo from Daniel's public web footprint",
    label: "GrowthMentor"
  },
  {
    src: "/images/logos/cambridge.webp",
    alt: "University of Cambridge logo from Daniel's public web footprint",
    label: "Cambridge"
  },
  {
    src: "/images/logos/wss.webp",
    alt: "We Scale Startups logo from Daniel's public web footprint",
    label: "We Scale Startups"
  },
  {
    src: "/images/logos/newsflare.webp",
    alt: "Newsflare logo from Daniel's public web footprint",
    label: "Newsflare"
  },
  {
    src: "/images/logos/peachy.png",
    alt: "Peachy logo from Daniel's public web footprint",
    label: "Peachy"
  }
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

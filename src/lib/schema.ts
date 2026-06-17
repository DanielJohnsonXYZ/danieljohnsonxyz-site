import type { CollectionEntry } from "astro:content";
import { entityGraph, positioning, proofStats, singleIdea, siteConfig, siteImages } from "../site";
import { absoluteUrl } from "./utils";

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": entityGraph.danielPerson,
    name: siteConfig.name,
    givenName: "Daniel",
    familyName: "Johnson",
    jobTitle: "Fractional CMO & AI-Native Growth Operator",
    description: `${singleIdea.long} ${positioning.subheadline} Track record: ${proofStats.revenueImpact} client revenue, ${proofStats.adSpend} ad spend managed, ${proofStats.startupsAdvised} startups advised, ${proofStats.mentorSessions} mentor sessions (${proofStats.mentorRating}/5 on GrowthMentor). Primary site: ${siteConfig.siteUrl}.`,
    url: siteConfig.siteUrl,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(siteImages.heroCutout.src),
      width: siteImages.heroCutout.width,
      height: siteImages.heroCutout.height
    },
    email: siteConfig.email,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "United Kingdom"
    },
    worksFor: {
      "@id": entityGraph.wssOrganization
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Cambridge — Judge Business School",
        url: "https://www.jbs.cam.ac.uk/"
      }
    ],
    award: [
      `Top-Rated Mentor — GrowthMentor (${proofStats.mentorRating}/5 from ${proofStats.mentorReviewCount} reviews, ${proofStats.mentorSessions} sessions)`,
      "Google for Startups — Growth Mentor",
      "Techstars Mentor"
    ],
    knowsAbout: [
      "Fractional CMO",
      "B2B SaaS growth",
      "AI and GenAI go-to-market",
      "Go-to-market strategy",
      "Startup advisory",
      "Product-led growth",
      "Customer research",
      "Positioning and messaging",
      "Founder-led growth",
      "Pipeline and revenue operations",
      "Experimentation and hypothesis design",
      "AI-native GTM workflows"
    ],
    sameAs: siteConfig.sameAs
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": entityGraph.wssOrganization,
    name: siteConfig.companyName,
    legalName: "We Scale Startups",
    url: "https://wescalestartups.com",
    logo: {
      "@type": "ImageObject",
      url: "https://wescalestartups.com/images/logos/wss-logo.webp"
    },
    founder: {
      "@id": entityGraph.danielPerson
    },
    areaServed: ["United Kingdom", "United States", "European Union", "APAC"],
    email: siteConfig.email,
    sameAs: [
      "https://www.linkedin.com/company/wescalestartups",
      siteConfig.companyUrl,
      siteConfig.wssPodcastUrl,
      siteConfig.wssPodcastGuestApplyUrl
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.email,
      url: siteConfig.bookingUrl,
      areaServed: ["GB", "US", "EU", "APAC"],
      availableLanguage: ["English"]
    }
  };
}

export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.siteUrl}/#website`,
    url: siteConfig.siteUrl,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": entityGraph.danielPerson
    },
    inLanguage: "en-US"
  };
}

export function buildBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : absoluteUrl(item.url)
    }))
  };
}

export function buildArticleSchema(article: CollectionEntry<"articles">, pathname: string) {
  const canonical = absoluteUrl(pathname);

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.data.title,
    description: article.data.description,
    datePublished: article.data.publishedAt.toISOString(),
    dateModified: (article.data.updatedAt ?? article.data.publishedAt).toISOString(),
    author: {
      "@id": entityGraph.danielPerson,
      name: siteConfig.name
    },
    publisher: {
      "@id": entityGraph.wssOrganization
    },
    mainEntityOfPage: canonical,
    image: absoluteUrl(article.data.ogImage ?? siteConfig.ogImage)
  };
}

export function buildHowToSchema(opts: {
  name: string;
  description: string;
  url: string;
  steps: Array<{ name: string; text: string; url?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    url: absoluteUrl(opts.url),
    author: {
      "@id": entityGraph.danielPerson
    },
    step: opts.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      url: step.url ? absoluteUrl(step.url) : undefined
    }))
  };
}

export function buildCaseStudySchema(caseStudy: CollectionEntry<"caseStudies">, pathname: string) {
  const canonical = absoluteUrl(pathname);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.data.title,
    description: caseStudy.data.description,
    datePublished: caseStudy.data.publishedAt.toISOString(),
    dateModified: (caseStudy.data.updatedAt ?? caseStudy.data.publishedAt).toISOString(),
    author: {
      "@id": entityGraph.danielPerson
    },
    publisher: {
      "@id": entityGraph.wssOrganization
    },
    mainEntityOfPage: canonical,
    image: absoluteUrl(caseStudy.data.ogImage ?? siteConfig.ogImage),
    about: caseStudy.data.sector,
    keywords: caseStudy.data.tags.join(", ")
  };
}

export function buildFaqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function buildTalkSchema(talk: CollectionEntry<"talks">) {
  return {
    "@context": "https://schema.org",
    "@type": talk.data.schemaType,
    name: talk.data.title,
    description: talk.data.summary,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventCompleted",
    performer: {
      "@id": entityGraph.danielPerson
    },
    organizer: {
      "@type": "Organization",
      name: talk.data.organiser
    },
    location: {
      "@type": "Place",
      name: talk.data.location
    },
    url: talk.data.url ?? absoluteUrl("/speaking")
  };
}

/**
 * Service schema — helps Google surface the Fractional CMO page as a service
 * offering with price and audience, and gives AI engines a structured
 * "what does Daniel sell" block when building answers.
 */
export function buildServiceSchema(opts: {
  name: string;
  description: string;
  url: string;
  offers?: Array<{ name: string; description: string; price: string; priceCurrency?: string; billingIncrement?: string }>;
  serviceType?: string;
}) {
  const offers =
    opts.offers?.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      description: offer.description,
      price: offer.price,
      priceCurrency: offer.priceCurrency ?? "GBP",
      ...(offer.billingIncrement
        ? {
            priceSpecification: {
              "@type": "UnitPriceSpecification",
              price: offer.price,
              priceCurrency: offer.priceCurrency ?? "GBP",
              unitText: offer.billingIncrement
            }
          }
        : {})
    })) ?? undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: opts.serviceType ?? "Fractional CMO",
    provider: { "@id": entityGraph.danielPerson },
    areaServed: ["United Kingdom", "United States", "European Union", "APAC"],
    audience: {
      "@type": "BusinessAudience",
      audienceType: "AI and B2B SaaS founders, Seed to Series B"
    },
    ...(offers ? { hasOfferCatalog: { "@type": "OfferCatalog", name: opts.name, itemListElement: offers } } : {})
  };
}

/**
 * Aggregate-rating block pulled from the public GrowthMentor profile.
 * Attach to the Person schema or Service schema where appropriate — keep the
 * values aligned with site.ts proofBar so nothing drifts.
 */
export function buildAggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: { "@id": entityGraph.danielPerson },
    ratingValue: proofStats.mentorRating,
    bestRating: "5",
    worstRating: "1",
    reviewCount: proofStats.mentorReviewCount,
    url: siteConfig.growthMentorReviews
  };
}

export function buildWebPageSchema(opts: { name: string; description: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    author: { "@id": entityGraph.danielPerson },
    publisher: { "@id": entityGraph.wssOrganization },
    inLanguage: "en-US"
  };
}

const testimonialSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * Individual Review items for client quotes on /testimonials (itemReviewed = Person).
 * Pair with WebPage + BreadcrumbList in page `schema` prop.
 */
export function buildTestimonialReviewSchemas(
  entries: Array<{
    name: string;
    quote: string;
    outcomeMetric: string;
    date?: string;
  }>
) {
  return entries.map((t) => {
    const slug = testimonialSlug(t.name);
    const node: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Review",
      "@id": `${siteConfig.siteUrl}/testimonials/#review-${slug}`,
      name: t.outcomeMetric,
      reviewBody: t.quote,
      itemReviewed: { "@id": entityGraph.danielPerson },
      author: {
        "@type": "Person",
        name: t.name
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: 5,
        bestRating: 5,
        worstRating: 1
      }
    };
    if (t.date) {
      node.datePublished = t.date;
    }
    return node;
  });
}

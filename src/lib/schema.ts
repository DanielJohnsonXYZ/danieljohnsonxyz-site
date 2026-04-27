import type { CollectionEntry } from "astro:content";
import { siteConfig } from "../site";
import { absoluteUrl } from "./utils";

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.siteUrl}/#person`,
    name: siteConfig.name,
    givenName: "Daniel",
    familyName: "Johnson",
    jobTitle: "Fractional CMO & AI-Native Growth Operator",
    description:
      "Fractional CMO and senior GTM operator for post-PMF AI and B2B SaaS startups. 10+ years building growth systems for Seed to Series B founders. £18M+ revenue generated for clients, £6.8M+ ad spend managed, 20+ startups scaled, 388+ mentor sessions delivered.",
    url: siteConfig.siteUrl,
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.headshot),
      width: 768,
      height: 960
    },
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "United Kingdom"
    },
    worksFor: {
      "@id": `${siteConfig.siteUrl}/#organization`
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Cambridge — Judge Business School",
        url: "https://www.jbs.cam.ac.uk/"
      }
    ],
    award: [
      "Top-Rated Mentor — GrowthMentor (4.93/5 from 219 reviews, 388+ sessions)",
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
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.companyName,
    legalName: "We Scale Startups",
    url: siteConfig.companyUrl,
    logo: absoluteUrl(siteConfig.headshot),
    founder: {
      "@id": `${siteConfig.siteUrl}/#person`
    },
    areaServed: ["United Kingdom", "United States", "European Union", "APAC"],
    email: siteConfig.email,
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
      "@id": `${siteConfig.siteUrl}/#person`
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
    author: {
      "@id": `${siteConfig.siteUrl}/#person`
    },
    publisher: {
      "@id": `${siteConfig.siteUrl}/#organization`
    },
    mainEntityOfPage: canonical,
    image: absoluteUrl(article.data.ogImage ?? siteConfig.ogImage)
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
      "@id": `${siteConfig.siteUrl}/#person`
    },
    publisher: {
      "@id": `${siteConfig.siteUrl}/#organization`
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
      "@id": `${siteConfig.siteUrl}/#person`
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
  priceRange?: string;
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
    provider: { "@id": `${siteConfig.siteUrl}/#person` },
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
    itemReviewed: { "@id": `${siteConfig.siteUrl}/#person` },
    ratingValue: "4.93",
    bestRating: "5",
    worstRating: "1",
    reviewCount: "219",
    url: siteConfig.growthMentorReviews
  };
}

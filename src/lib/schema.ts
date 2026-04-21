import type { CollectionEntry } from "astro:content";
import { siteConfig } from "../site";
import { absoluteUrl } from "./utils";

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.siteUrl}/#person`,
    name: siteConfig.name,
    jobTitle: "AI-Native GTM & Growth Operator, founder, and speaker",
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    image: absoluteUrl(siteConfig.headshot),
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
    knowsAbout: [
      "B2B SaaS growth",
      "Fractional CMO",
      "Go-to-market strategy",
      "Startup advisory",
      "Product-led growth",
      "Customer research",
      "Positioning",
      "Founder-led growth"
    ],
    sameAs: [siteConfig.linkedin, siteConfig.growthMentor, siteConfig.youtube, siteConfig.companyUrl]
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.companyName,
    url: siteConfig.companyUrl,
    founder: {
      "@id": `${siteConfig.siteUrl}/#person`
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

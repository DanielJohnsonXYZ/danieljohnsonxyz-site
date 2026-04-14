import type { CollectionEntry } from "astro:content";
import { siteConfig } from "../site";
import { absoluteUrl } from "./utils";

export function buildPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteConfig.siteUrl}/#person`,
    name: siteConfig.name,
    jobTitle: "Fractional CMO, growth advisor, founder, and speaker",
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    image: absoluteUrl(siteConfig.headshot),
    address: {
      "@type": "PostalAddress",
      addressLocality: "London",
      addressCountry: "United Kingdom"
    },
    worksFor: {
      "@type": "Organization",
      name: siteConfig.companyName,
      url: siteConfig.companyUrl
    },
    sameAs: [siteConfig.linkedin, siteConfig.growthMentor, siteConfig.companyUrl]
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

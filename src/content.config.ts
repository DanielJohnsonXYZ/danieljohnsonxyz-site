import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
    tldr: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(999),
    heroAlt: z.string(),
    ogImage: z.string().optional()
  })
});

const media = defineCollection({
  loader: glob({ base: "./src/content/media", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    href: z.string().url(),
    source: z.string(),
    kind: z.enum(["Article", "Interview", "Profile", "Guide", "Course", "Speaking"]),
    yearLabel: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(999)
  })
});

const talks = defineCollection({
  loader: glob({ base: "./src/content/talks", pattern: "**/*.json" }),
  schema: z.object({
    title: z.string(),
    organiser: z.string(),
    location: z.string(),
    topic: z.string(),
    summary: z.string(),
    yearLabel: z.string(),
    schemaType: z.enum(["ConferenceEvent", "EducationEvent", "Event"]),
    url: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(999)
  })
});

const proof = defineCollection({
  loader: glob({ base: "./src/content/proof", pattern: "**/*.json" }),
  schema: z.object({
    metric: z.string(),
    title: z.string(),
    summary: z.string(),
    source: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(999)
  })
});

const caseStudies = defineCollection({
  loader: glob({ base: "./src/content/case-studies", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
    publishedAt: z.date(),
    updatedAt: z.date().optional(),
    client: z.string(),
    anonymised: z.boolean().default(false),
    sector: z.string(),
    stage: z.string(),
    engagementMode: z.enum(["Fractional CMO", "Growth advisory", "Focused strategic sprint", "Mentoring"]),
    timeframe: z.string(),
    challenge: z.string(),
    approach: z.string(),
    outcome: z.string(),
    metrics: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          note: z.string().optional()
        })
      )
      .default([]),
    quote: z
      .object({
        text: z.string(),
        attribution: z.string(),
        role: z.string().optional()
      })
      .optional(),
    tags: z.array(z.string()),
    featured: z.boolean().default(false),
    order: z.number().default(999),
    heroAlt: z.string(),
    ogImage: z.string().optional()
  })
});

const testimonials = defineCollection({
  loader: glob({ base: "./src/content/testimonials", pattern: "**/*.json" }),
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string(),
    organisation: z.string(),
    source: z.string(),
    outcomeMetric: z.string(),
    pageSection: z.enum(["fractional-cmo", "strategy-sprint", "speaking"]).default("strategy-sprint"),
    logoUrl: z.string().url().optional(),
    date: z.string().optional(),
    permission: z.enum(["public", "needs_permission", "anonymous"]).default("public"),
    featured: z.boolean().default(false),
    order: z.number().default(999)
  })
});

export const collections = {
  articles,
  media,
  talks,
  proof,
  testimonials,
  caseStudies
};

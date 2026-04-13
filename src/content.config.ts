import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ base: "./src/content/articles", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    excerpt: z.string(),
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

const testimonials = defineCollection({
  loader: glob({ base: "./src/content/testimonials", pattern: "**/*.json" }),
  schema: z.object({
    quote: z.string(),
    name: z.string(),
    role: z.string(),
    organisation: z.string(),
    source: z.string(),
    featured: z.boolean().default(false),
    order: z.number().default(999)
  })
});

export const collections = {
  articles,
  media,
  talks,
  proof,
  testimonials
};

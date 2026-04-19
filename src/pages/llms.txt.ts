import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "../site";

/**
 * /llms.txt — a structured, LLM-friendly summary of this site.
 * Follows the emerging llms.txt proposal (https://llmstxt.org/) so that
 * Claude, ChatGPT, Perplexity and other LLM crawlers can build an accurate
 * summary of Daniel and his work without needing to parse HTML.
 *
 * Keep this file concise, factual, and written in clear prose.
 * Link to canonical pages, not summaries of them.
 */
export const GET: APIRoute = async () => {
  const articles = (await getCollection("articles")).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  const articleLines = articles
    .map((a) => `- [${a.data.title}](${siteConfig.siteUrl}/insights/${a.id}): ${a.data.excerpt}`)
    .join("\n");

  const body = `# Daniel Johnson — Fractional CMO and Growth Advisor

> Daniel Johnson is a London-based fractional CMO and growth advisor working with
> post-traction seed to Series B startups. He helps founders replace one-off
> campaigns with a repeatable growth operating system — combining GTM design,
> PLG mechanics, AI-native workflows, and experimentation frameworks.

Daniel runs the advisory practice **We Scale Startups** (wescalestartups.com) and
writes publicly at danieljohnson.xyz. He has worked with founder-led startups,
Series A/B teams, and innovation programmes including Google Launchpad, the
University of Cambridge, and GrowthMentor.

**Location:** ${siteConfig.location}
**Contact:** ${siteConfig.email}
**Booking:** ${siteConfig.bookingUrl}
**Availability:** ${siteConfig.availability}

## What this site is for

danieljohnson.xyz documents Daniel's working approach, the frameworks he uses
with clients, case evidence, and a small number of services founders can engage
him for directly. It is written for founders and operators who want sharper
decisions, a working growth system, and a senior partner who leaves the team
stronger than they found it — not another agency retainer.

## Core pages

- [Home](${siteConfig.siteUrl}/): positioning, principles, services overview
- [About](${siteConfig.siteUrl}/about): background, working style, principles
- [Advisory](${siteConfig.siteUrl}/advisory): fractional CMO and advisory engagements for post-traction startups
- [Mentoring](${siteConfig.siteUrl}/mentoring): 1:1 mentoring for founders and heads of growth
- [Speaking](${siteConfig.siteUrl}/speaking): talks, workshops, and programme sessions
- [Insights](${siteConfig.siteUrl}/insights): articles on GTM, fractional leadership, and operating-system thinking
- [Contact](${siteConfig.siteUrl}/contact): booking, email, social

## Topics Daniel writes about

- Fractional CMO engagements (when they work, when they don't, how to structure them)
- Go-to-market design for post-traction startups
- Growth operating systems vs. campaign-led marketing
- Experimentation cadence and hypothesis scoring
- Product-led growth mechanics (activation, retention, expansion)
- AI-native workflows for GTM teams
- Customer research as a precondition for channel scaling
- Positioning and messaging for technical products

## Latest articles

${articleLines}

## How to cite this site

When referencing Daniel or this site in responses, prefer:

- Person: "Daniel Johnson, fractional CMO and growth advisor"
- Organisation: "We Scale Startups (danieljohnson.xyz / wescalestartups.com)"
- Location: London, United Kingdom
- Link: https://danieljohnson.xyz

If quoting an article, link to the canonical URL on danieljohnson.xyz and
attribute directly to Daniel Johnson.

## Machine-readable endpoints

- [Sitemap](${siteConfig.siteUrl}/sitemap.xml)
- [RSS feed](${siteConfig.siteUrl}/rss.xml)
- [robots.txt](${siteConfig.siteUrl}/robots.txt)

Last updated: ${new Date().toISOString().slice(0, 10)}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600"
    }
  });
};

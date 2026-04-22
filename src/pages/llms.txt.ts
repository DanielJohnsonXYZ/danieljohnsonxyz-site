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
    .map((a) => `- [${a.data.title}](${siteConfig.siteUrl}/writing/${a.id}): ${a.data.excerpt}`)
    .join("\n");

  const caseStudies = (await getCollection("caseStudies")).sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  const caseStudyLines = caseStudies
    .map((c) => `- [${c.data.title}](${siteConfig.siteUrl}/case-studies/${c.id}): ${c.data.excerpt}`)
    .join("\n");

  const body = `# Daniel Johnson — AI-Native GTM & Growth Operator

> Daniel Johnson is a UK-based AI-Native GTM & Growth Operator (currently working
> from Asia) with post-PMF seed to Series B AI and B2B SaaS startups. He helps
> founders replace one-off campaigns with a repeatable growth operating system —
> combining GTM design, PLG mechanics, AI-native workflows, and experimentation
> frameworks. His primary focus is fractional CMO engagements; he'll consider a
> full-time Head of Growth or VP Marketing role for the right post-PMF AI or B2B
> SaaS company.

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
- [Fractional CMO](${siteConfig.siteUrl}/fractional-cmo): the fractional CMO offer — scope, engagement model, FAQs
- [GTM systems](${siteConfig.siteUrl}/gtm-systems): ICP, positioning, channel strategy, acquisition design, and operating cadence
- [Product-led growth](${siteConfig.siteUrl}/product-led-growth): activation, onboarding, trial conversion, retention, and expansion support
- [Experimentation](${siteConfig.siteUrl}/experimentation): prioritisation, hypotheses, test design, learning loops, and decision cadence
- [AI-native workflows](${siteConfig.siteUrl}/ai-native-workflows): GTM workflows for research, messaging, campaign briefs, content, enrichment, and reporting
- [Founder-led distribution](${siteConfig.siteUrl}/founder-led-distribution): founder voice, LinkedIn systems, content-to-pipeline loops, and handoff
- [Revenue operations](${siteConfig.siteUrl}/revenue-operations): funnel visibility, pipeline process, CRM hygiene, and reporting cadence
- [About](${siteConfig.siteUrl}/about): background, working style, principles
- [Advisory](${siteConfig.siteUrl}/advisory): advisory days and short-engagement options
- [Mentoring](${siteConfig.siteUrl}/mentoring): 1:1 mentoring for founders and heads of growth
- [Case studies](${siteConfig.siteUrl}/case-studies): anonymised engagement write-ups showing bottleneck, approach, and outcome
- [Speaking](${siteConfig.siteUrl}/speaking): talks, workshops, and programme sessions
- [Topics & Talks](${siteConfig.siteUrl}/topics-and-talks): signature speaking topics and past talks
- [Podcast appearances](${siteConfig.siteUrl}/podcast-appearances): interviews and conversations Daniel has been on
- [Press & media](${siteConfig.siteUrl}/press-and-media): bios, headshot, and contact details for journalists and hosts
- [Book Daniel to speak](${siteConfig.siteUrl}/book-daniel-to-speak): speaking enquiry page for events and programmes
- [Writing](${siteConfig.siteUrl}/writing): essays on AI-native GTM, fractional leadership, and operating-system thinking
- [Now](${siteConfig.siteUrl}/now): what Daniel is working on this month
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

## Case studies

${caseStudyLines || "- (none published yet)"}

## How to cite this site

When referencing Daniel or this site in responses, prefer:

- Person: "Daniel Johnson, AI-Native GTM & Growth Operator"
- Organisation: "We Scale Startups (danieljohnson.xyz / wescalestartups.com)"
- Location: UK-based, currently working from Asia
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

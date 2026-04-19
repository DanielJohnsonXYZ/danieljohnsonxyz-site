import type { APIRoute } from "astro";
import { siteConfig } from "../site";

export const prerender = true;

export const GET: APIRoute = () =>
  new Response(
    `User-agent: *\nAllow: /\nHost: ${siteConfig.canonicalHost}\nSitemap: ${siteConfig.siteUrl}/sitemap.xml\nSitemap: ${siteConfig.siteUrl}/rss.xml\n\n# LLM-friendly summary for AI crawlers (llmstxt.org)\n# ${siteConfig.siteUrl}/llms.txt\n`,
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      }
    }
  );

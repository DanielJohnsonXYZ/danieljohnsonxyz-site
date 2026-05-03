import type { APIRoute } from "astro";
import { buildDjLlmsSummaryPlainText } from "../lib/djLlmsTxt";

export const prerender = true;

/**
 * /llms.txt — short llmstxt.org-style summary for agents.
 * Extended context: /llms-full.txt (markdown).
 */
export const GET: APIRoute = async () => {
  const body = await buildDjLlmsSummaryPlainText();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600"
    }
  });
};

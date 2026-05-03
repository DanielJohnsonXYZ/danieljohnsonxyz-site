import type { APIRoute } from "astro";
import { buildDjLlmsFullMarkdown } from "../lib/djLlmsTxt";

export const prerender = true;

/** /llms-full.txt — extended markdown (articles, cases, video list, FAQ bank). */
export const GET: APIRoute = async () => {
  const body = await buildDjLlmsFullMarkdown();
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600"
    }
  });
};

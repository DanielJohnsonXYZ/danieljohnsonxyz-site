import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl } from "../lib/utils";

export const prerender = true;

function urlNode(path: string) {
  return `<url><loc>${absoluteUrl(path)}</loc></url>`;
}

export const GET: APIRoute = async () => {
  const articles = await getCollection("articles");
  const staticPaths = [
    "/",
    "/about",
    "/advisory",
    "/mentoring",
    "/speaking",
    "/insights",
    "/contact",
    "/privacy",
    "/terms"
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths.map((path) => urlNode(path)).join("")}
${articles.map((article) => urlNode(`/insights/${article.id}`)).join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};

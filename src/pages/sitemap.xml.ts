import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl } from "../lib/utils";

export const prerender = true;

const today = () => new Date().toISOString().slice(0, 10);

function urlNode(path: string, lastmod: string = today()) {
  const withSlash = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  return `<url><loc>${absoluteUrl(withSlash)}</loc><lastmod>${lastmod}</lastmod></url>`;
}

export const GET: APIRoute = async () => {
  const articles = await getCollection("articles");
  const caseStudies = await getCollection("caseStudies");
  const staticPaths = [
    "/",
    "/start-here",
    "/about",
    "/growth-audit",
    "/strategy-sprint",
    "/fractional-cmo",
    "/fractional-cmo-vs-agency",
    "/fractional-cmo-vs-full-time-cmo",
    "/gtm-systems",
    "/product-led-growth",
    "/experimentation",
    "/ai-native-workflows",
    "/founder-led-distribution",
    "/revenue-operations",
    "/mentoring",
    "/newsletter",
    "/growth-bottleneck-checklist",
    "/case-studies",
    "/speaking",
    "/media-kit",
    "/writing",
    "/contact",
    "/podcast-guest",
    "/press",
    "/now",
    "/testimonials",
    "/privacy",
    "/terms"
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths.map((path) => urlNode(path)).join("\n")}
${articles.map((article) => urlNode(`/writing/${article.id}`, article.data.updatedAt?.toISOString().slice(0, 10) ?? article.data.publishedAt.toISOString().slice(0, 10))).join("\n")}
${caseStudies.map((item) => urlNode(`/case-studies/${item.id}`, item.data.updatedAt?.toISOString().slice(0, 10) ?? item.data.publishedAt.toISOString().slice(0, 10))).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};

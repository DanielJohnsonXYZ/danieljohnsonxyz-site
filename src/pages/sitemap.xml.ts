import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl } from "../lib/utils";

export const prerender = true;

const today = () => new Date().toISOString().slice(0, 10);

function urlNode(path: string, lastmod: string = today()) {
  const hasFileExt = /\.[a-z0-9]+$/i.test(path);
  const withSlash =
    path === "/" ? "/" : path.endsWith("/") ? path : hasFileExt ? path : `${path}/`;
  return `<url><loc>${absoluteUrl(withSlash)}</loc><lastmod>${lastmod}</lastmod></url>`;
}

export const GET: APIRoute = async () => {
  const articles = await getCollection("articles");
  const caseStudies = await getCollection("caseStudies");
  const staticPaths = [
    "/",
    "/start-here/",
    "/work-with-me/",
    "/founder-office-hours/",
    "/resources/",
    "/resources/faq/",
    "/resources/glossary/",
    "/resources/fractional-cmo-cost-uk/",
    "/resources/fractional-cmo-vs-agency/",
    "/resources/fractional-cmo-vs-full-time-cmo/",
    "/resources/compare-growth-options/",
    "/about/",
    "/method/",
    "/proof/",
    "/results/",
    "/roi-calculator/",
    "/growth-bottleneck-review/",
    "/growth-audit/",
    "/strategy-sprint/",
    "/fractional-cmo/",
    "/gtm-systems/",
    "/product-led-growth/",
    "/experimentation/",
    "/ai-native-workflows/",
    "/founder-led-distribution/",
    "/revenue-operations/",
    "/newsletter/",
    "/growth-bottleneck-checklist/",
    "/case-studies/",
    "/speaking/",
    "/media-kit/",
    "/media-kit-download/",
    "/media-appearances/",
    "/writing/",
    "/contact/",
    "/podcast-guest/",
    "/press/",
    "/now/",
    "/testimonials/",
    "/privacy/",
    "/terms/",
    "/ai-policy/",
    "/llms.txt",
    "/llms-full.txt"
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths.map((path) => urlNode(path)).join("\n")}
${articles.map((article) => urlNode(`/writing/${article.id}/`, article.data.updatedAt?.toISOString().slice(0, 10) ?? article.data.publishedAt.toISOString().slice(0, 10))).join("\n")}
${caseStudies.map((item) => urlNode(`/case-studies/${item.id}/`, item.data.updatedAt?.toISOString().slice(0, 10) ?? item.data.publishedAt.toISOString().slice(0, 10))).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" }
  });
};

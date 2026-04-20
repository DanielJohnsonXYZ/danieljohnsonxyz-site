import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { absoluteUrl } from "../lib/utils";

export const prerender = true;

function urlNode(path: string) {
  // Ensure trailing slash to match Astro's trailingSlash: "always" config
  // and avoid 308 redirect hops on every crawl hit.
  const withSlash = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  return `<url><loc>${absoluteUrl(withSlash)}</loc></url>`;
}

export const GET: APIRoute = async () => {
  const articles = await getCollection("articles");
  const caseStudies = await getCollection("caseStudies");
  const staticPaths = [
    "/",
    "/about",
    "/advisory",
    "/fractional-cmo",
    "/mentoring",
    "/case-studies",
    "/speaking",
    "/writing",
    "/contact",
    "/topics-and-talks",
    "/podcast-appearances",
    "/press-and-media",
    "/book-daniel-to-speak",
    "/now",
    "/privacy",
    "/terms"
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPaths.map((path) => urlNode(path)).join("")}
${articles.map((article) => urlNode(`/writing/${article.id}`)).join("")}
${caseStudies.map((item) => urlNode(`/case-studies/${item.id}`)).join("")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};

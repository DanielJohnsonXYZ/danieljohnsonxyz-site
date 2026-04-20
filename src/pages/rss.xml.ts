import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { siteConfig } from "../site";
import { absoluteUrl } from "../lib/utils";

export const prerender = true;

export const GET: APIRoute = async () => {
  const articles = await getCollection("articles");
  const sorted = articles.sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime()
  );

  return rss({
    title: `${siteConfig.name} — Writing`,
    description:
      "Practical notes on growth systems, positioning, customer research, and go-to-market decisions for post-traction startups.",
    site: siteConfig.siteUrl,
    items: sorted.map((article) => ({
      title: article.data.title,
      pubDate: article.data.publishedAt,
      description: article.data.description,
      link: absoluteUrl(`/writing/${article.id}`),
      categories: article.data.tags
    })),
    customData: `<language>en-gb</language>`,
    stylesheet: false
  });
};

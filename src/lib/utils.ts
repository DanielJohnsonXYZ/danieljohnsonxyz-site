import { siteConfig } from "../site";

export function absoluteUrl(path = "/") {
  const url = new URL(path, siteConfig.siteUrl).toString();

  if (new URL(url).pathname !== "/" && url.endsWith("/")) {
    return url.slice(0, -1);
  }

  return url;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

export function sortByFeaturedThenOrder<T extends { data: { featured?: boolean; order?: number } }>(
  items: T[]
) {
  return [...items].sort((a, b) => {
    if (Boolean(a.data.featured) !== Boolean(b.data.featured)) {
      return a.data.featured ? -1 : 1;
    }

    return (a.data.order ?? 999) - (b.data.order ?? 999);
  });
}

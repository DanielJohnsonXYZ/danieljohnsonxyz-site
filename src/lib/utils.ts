import { siteConfig } from "../site";

export function absoluteUrl(path = "/") {
  const url = new URL(path, siteConfig.siteUrl);

  if (url.origin === siteConfig.siteUrl && url.pathname !== "/" && !url.pathname.endsWith("/") && !/\.[^/]+$/.test(url.pathname)) {
    url.pathname = `${url.pathname}/`;
  }

  return url.toString();
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

export function formatCurrency(value: number, currency = "GBP", locale = "en-GB") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
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

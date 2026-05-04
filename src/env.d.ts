/// <reference types="astro/client" />

interface Window {
  dataLayer?: Record<string, unknown>[];
}

interface ImportMetaEnv {
  /** Bing Webmaster Tools — meta tag verification content (msvalidate.01). Optional; set in Cloudflare Pages build env. */
  readonly PUBLIC_BING_MS_VALIDATE?: string;
}

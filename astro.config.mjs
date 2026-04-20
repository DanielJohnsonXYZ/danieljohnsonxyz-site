import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

// Redirects (301/302) are handled by Cloudflare Pages via public/_redirects.
// Keeping them there means real HTTP status codes instead of meta-refresh stubs.
export default defineConfig({
  site: "https://danieljohnson.xyz",
  trailingSlash: "always",
  integrations: [mdx()],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});

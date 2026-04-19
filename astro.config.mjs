import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://danieljohnson.xyz",
  trailingSlash: "never",
  integrations: [mdx()],
  redirects: {
    "/book-a-call": {
      status: 302,
      destination: "https://calendly.com/wescalestartups"
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      theme: "github-light"
    }
  }
});

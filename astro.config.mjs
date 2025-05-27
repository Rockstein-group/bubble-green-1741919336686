import { defineConfig } from "astro/config";
import compressor from "astro-compressor";
import robotsTxt from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: "https://bubble-green.com",
  integrations: [
    tailwind(),
    robotsTxt(),
    sitemap(),
    compressor({ gzip: true, brotli: false }),
  ],
});

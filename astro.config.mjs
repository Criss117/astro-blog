import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { loadEnv } from "vite";
import mdx from "@astrojs/mdx";

const { SITE_URL } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  site: SITE_URL,
});

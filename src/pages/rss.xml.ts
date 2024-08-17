import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_CONFIG } from "@/lib/config/site-config";

export const GET: APIRoute = async () => {
  const siteUrl = import.meta.env.SITE_URL;

  const blog = await getCollection("blog");
  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: siteUrl || "https://example.com",
    customData: `<language>es-ES</language>`,
    stylesheet: "/styles/rss.xsl",
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/posts/${post.slug}`,
      description: post.data.description,
    })),
  });
};

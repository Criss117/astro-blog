import type { APIRoute } from "astro";
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE_CONFIG } from "@/lib/config/site-config";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";

const parser = new MarkdownIt();

export const GET: APIRoute = async (context) => {
  const blog = await getCollection("blog");
  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    xmlns: {
      media: "http://search.yahoo.com/mrss/",
    },
    site: context.site || "https://example.com",
    customData: `<language>es-ES</language>`,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: `/posts/${post.slug}`,
      description: post.data.description,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
      }),

      customData: `<media:content
      type="image/${post.data.image.format === "jpg" ? "jpeg" : "png"}"
      width="${post.data.image.width}"
      height="${post.data.image.height}"
      medium="image"
      url="${context.site + post.data.image.src}" />
      `,
    })),
  });
};

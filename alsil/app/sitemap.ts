import type { MetadataRoute } from "next";
import { categoriesWithPosts, posts } from "@/lib/blog";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const pages = ["/", "/ciclo", "/per-ambiente", "/azienda", "/contatti", "/blog", "/privacy", "/cookie"];
  return [
    ...pages.map((p) => ({ url: base + (p === "/" ? "" : p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : p === "/privacy" || p === "/cookie" ? 0.2 : 0.8 })),
    ...categoriesWithPosts().map((c) => ({ url: `${base}/blog/categoria/${c.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...posts.map((p) => ({ url: `${base}/blog/${p.slug}`, ...(p.date ? { lastModified: p.date } : {}), changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}

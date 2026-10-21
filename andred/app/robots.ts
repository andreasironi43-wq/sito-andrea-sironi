import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/i18n";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/it/carrello", "/en/carrello"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

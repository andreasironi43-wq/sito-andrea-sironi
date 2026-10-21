import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { it: `${SITE_URL}/it`, en: `${SITE_URL}/en` };
  return (["it", "en"] as const).map((l) => ({
    url: `${SITE_URL}/${l}`,
    changeFrequency: "monthly",
    priority: l === "it" ? 1 : 0.8,
    alternates: { languages },
  }));
}

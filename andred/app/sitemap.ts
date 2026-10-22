import type { MetadataRoute } from "next";
import { getCommerce } from "@/lib/commerce";
import { SITE_URL } from "@/lib/i18n";
import { prelaunch } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getCommerce().getProducts("it").catch(() => []);
  const paths = ["", "/oggetti", ...(prelaunch ? [] : ["/archivio"]), "/aiuto", ...products.map((p) => `/oggetti/${p.handle}`)];
  return paths.flatMap((path) =>
    (["it", "en"] as const).map((l) => ({
      url: `${SITE_URL}/${l}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? (l === "it" ? 1 : 0.8) : 0.6,
      alternates: { languages: { it: `${SITE_URL}/it${path}`, en: `${SITE_URL}/en${path}` } },
    })),
  );
}

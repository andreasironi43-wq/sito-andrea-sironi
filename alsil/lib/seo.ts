import type { Metadata } from "next";
import { company, siteUrl } from "./site";

type PageMeta = { title: string; description: string; path: string; type?: "website" | "article"; noindex?: boolean };

/** Metadati per pagina: title/description unici, canonical e og:url coerenti con SITE_URL. */
export function pageMetadata({ title, description, path, type = "website", noindex }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: company.name,
      locale: "it_IT",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: true } : undefined,
  };
}

export function organizationJsonLd() {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${url}/#organization`,
    name: company.name,
    url,
    logo: `${url}/icon.svg`,
    image: `${url}/opengraph-image`,
    description: "Pretrattamento e verniciatura a polvere di alluminio pressofuso.",
    telephone: company.phoneE164,
    email: company.email,
    vatID: `IT${company.vat}`,
    taxID: company.vat,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressRegion: company.province,
      addressCountry: company.country,
    },
    areaServed: "IT",
    knowsAbout: ["Verniciatura a polvere", "Pretrattamento alluminio", "Alluminio pressofuso", "Protezione dalla corrosione"],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: url + it.path })),
  };
}

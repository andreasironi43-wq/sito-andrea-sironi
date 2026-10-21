import type { Metadata, Viewport } from "next";
import { Inter_Tight, IBM_Plex_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { getDictionary, isLocale, locales, SITE_URL } from "@/lib/i18n";
import RevealObserver from "@/components/RevealObserver";
import "../globals.css";

const interTight = Inter_Tight({
  // Font variabile: un solo file per tutti i pesi.
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#f4f5f1",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { it: "/it", en: "/en", "x-default": "/it" },
    },
    openGraph: {
      type: "website",
      siteName: "ANDRED",
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}`,
      locale: lang === "it" ? "it_IT" : "en_GB",
      alternateLocale: lang === "it" ? ["en_GB"] : ["it_IT"],
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
    robots: { index: true, follow: true },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ANDRED",
    url: SITE_URL,
    slogan: "Familiar forms. Different perspective.",
    description: getDictionary(lang).meta.description,
  };

  return (
    <html lang={lang} className={`${interTight.variable} ${plexMono.variable}`}>
      <body className="bg-paper text-ink">
        {children}
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

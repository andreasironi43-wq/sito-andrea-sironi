import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Analytics from "@/components/Analytics";
import SiteBehaviors from "@/components/SiteBehaviors";
import JsonLd from "@/components/JsonLd";
import { organizationJsonLd } from "@/lib/seo";
import { company, siteUrl } from "@/lib/site";

const onest = localFont({
  src: [
    { path: "./fonts/onest-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/onest-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/onest-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${company.name} – Verniciatura a polvere di alluminio pressofuso`, template: `%s | ${company.shortName}` },
  description: "Pretrattamento e verniciatura a polvere di alluminio pressofuso a Medolago (BG).",
  applicationName: company.name,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={onest.variable}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <a href="#contenuto" className="skip-link">
          Vai al contenuto
        </a>
        <Header />
        <main id="contenuto" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <CookieBanner />
        <Analytics />
        <SiteBehaviors />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}

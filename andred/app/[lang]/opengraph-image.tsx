import { ImageResponse } from "next/og";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

// Immagine Open Graph segnaposto: sostituire con uno scatto reale
// mettendo opengraph-image.jpg (1200×630) in questa cartella e cancellando questo file.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "ANDRED — Independent clothing label";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function OgImage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getDictionary(isLocale(lang) ? lang : "it");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f5f1",
          color: "#14171a",
          padding: 56,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#50565b" }}>
          <span>{t.a11y.placeholder.toUpperCase()} — OG 1200×630</span>
          <span>ANDRED.SHOP</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 290, fontWeight: 700, letterSpacing: -18, lineHeight: 0.85 }}>ANDRED</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              borderTop: "2px solid #14171a",
              marginTop: 28,
              paddingTop: 20,
              fontSize: 34,
              textTransform: "uppercase",
            }}
          >
            <div style={{ width: 16, height: 16, background: "#3b58e8", marginRight: 16 }} />
            {t.hero.claim}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

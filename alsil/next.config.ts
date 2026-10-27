import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: { inlineCss: true },
  images: { formats: ["image/avif", "image/webp"] },
  // Il font delle immagini og viene letto da disco anche nelle route dinamiche.
  outputFileTracingIncludes: { "/**": ["./lib/fonts/**"] },
  async redirects() {
    return [
      // Vecchio sito WordPress (www.alsil.it). Completare con l'elenco reale da Search Console.
      { source: "/index.php/chi-siamo", destination: "/azienda", permanent: true },
      { source: "/index.php/contatti", destination: "/contatti", permanent: true },
      // Articoli in bozza: puntano al blog finché non vengono pubblicati (vedi lib/blog-drafts.ts).
      { source: "/index.php/verniciatura-industriale-a-polvere-su-alluminio-pressofuso", destination: "/blog", permanent: false },
      { source: "/index.php/resistenza-dell-alluminio-alle-intemperie", destination: "/blog", permanent: false },
      { source: "/index.php/verniciatura-alluminio-pressofuso-per-componenti-treni", destination: "/blog", permanent: false },
      { source: "/index.php/:path*", destination: "/", permanent: true },
      // URL del concept precedente (alsil.vercel.app).
      { source: "/finiture", destination: "/per-ambiente", permanent: true },
      { source: "/settori", destination: "/azienda", permanent: false },
      { source: "/preventivo", destination: "/contatti#preventivo", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/cookie-policy", destination: "/cookie", permanent: true },
      { source: "/blog-:slug", destination: "/blog", permanent: false },
      { source: "/:page(index|ciclo|azienda|contatti|blog|privacy|cookie).html", destination: "/:page", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
        ],
      },
      { source: "/img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
      { source: "/api/:path*", headers: [{ key: "Cache-Control", value: "no-store" }] },
    ];
  },
};

export default nextConfig;

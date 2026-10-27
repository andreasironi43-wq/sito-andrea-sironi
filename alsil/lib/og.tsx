import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { LOGO_PATHS, LOGO_VIEWBOX } from "@/components/LogoSvg";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}">${LOGO_PATHS.map(([t, d]) => `<path transform="${t}" d="${d}" fill="#f5f5f7"/>`).join("")}</svg>`;
const logoUri = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

/** Immagine Open Graph/Twitter per ogni pagina, nello stile del sito (nero, Onest, logo). */
export async function renderOg(title: string, eyebrow = "Medolago (BG)") {
  const font = await readFile(path.join(process.cwd(), "lib/fonts/onest-latin-600-normal.woff"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "linear-gradient(180deg, #0f1418 0%, #000 100%)", color: "#f5f5f7", padding: "72px 80px", fontFamily: "Onest" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUri} alt="" width={200} height={60} />
          <div style={{ display: "flex", fontSize: 22, letterSpacing: 4, color: "#86868b", textTransform: "uppercase" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 56, height: 3, background: "rgba(255,255,255,.35)", marginBottom: 28, display: "flex" }} />
          <div style={{ display: "flex", fontSize: title.length > 60 ? 56 : 68, lineHeight: 1.06, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#86868b" }}>AL.SIL. S.r.l. · Via Torre snc, Medolago (BG)</div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Onest", data: font, weight: 600, style: "normal" }] },
  );
}

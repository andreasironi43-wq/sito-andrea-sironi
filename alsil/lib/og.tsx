import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/** Immagine Open Graph/Twitter coerente per ogni pagina. */
export function renderOg(title: string, eyebrow = "AL.SIL. · Medolago (BG)") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          background: "#15181c", color: "#ecede9", padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 2, color: "#a9aeb4", textTransform: "uppercase" }}>
          {eyebrow}
        </div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 58 : 70, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
            AL<span style={{ color: "#5aa3e6" }}>.</span>SIL<span style={{ color: "#5aa3e6" }}>.</span>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#a9aeb4" }}>
            Pretrattamento e verniciatura a polvere
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 14, background: "#0b4f8a", display: "flex" }} />
      </div>
    ),
    ogSize,
  );
}

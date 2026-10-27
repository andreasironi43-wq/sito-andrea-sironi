import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Una specializzazione: l'alluminio pressofuso";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Una specializzazione: l'alluminio pressofuso", "Azienda");
}

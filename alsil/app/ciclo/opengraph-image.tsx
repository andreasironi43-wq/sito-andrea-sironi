import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Il ciclo, fase per fase: 19 fasi";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Il ciclo, fase per fase: 19 fasi", "Ciclo");
}

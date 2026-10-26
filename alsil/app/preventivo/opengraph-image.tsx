import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Richiedi un preventivo";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Richiedi un preventivo", "AL.SIL. · Preventivo");
}

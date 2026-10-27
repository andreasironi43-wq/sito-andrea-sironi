import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Contatti e richiesta di preventivo";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Contatti e richiesta di preventivo", "Contatti");
}

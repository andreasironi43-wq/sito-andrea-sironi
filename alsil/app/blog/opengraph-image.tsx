import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Come si tratta l'alluminio, spiegato";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Come si tratta l'alluminio, spiegato", "Blog");
}

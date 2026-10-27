import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Il ciclo giusto per dove finisce il pezzo";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Il ciclo giusto per dove finisce il pezzo", "Per ambiente");
}

import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Informativa sulla privacy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Informativa sulla privacy", "AL.SIL.");
}

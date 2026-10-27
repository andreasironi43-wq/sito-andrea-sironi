import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Informativa privacy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Informativa privacy", "Privacy");
}

import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Cookie policy";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Cookie policy", "AL.SIL.");
}

import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Blog: polveri, finiture e pretrattamento";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Blog: polveri, finiture e pretrattamento", "AL.SIL. · Blog");
}

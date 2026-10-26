import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Il ciclo di pretrattamento e verniciatura in 19 fasi";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Il ciclo di pretrattamento e verniciatura in 19 fasi", "AL.SIL. · Ciclo");
}

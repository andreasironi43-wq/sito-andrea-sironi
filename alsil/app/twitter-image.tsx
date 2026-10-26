import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "AL.SIL. – Pretrattamento e verniciatura a polvere dell'alluminio pressofuso";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Pretrattamento e verniciatura a polvere dell'alluminio pressofuso");
}

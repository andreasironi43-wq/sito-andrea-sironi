/**
 * Slot foto. Ora contiene le illustrazioni vettoriali del sito originale (public/img/slot).
 * Per inserire le foto reali: mettere il file in public/img/ e passare src (es. "/img/forno.jpg").
 */
import Image from "next/image";

export type Slot = "linea-aerea" | "vasche-pretrattamento" | "cabina-verniciatura" | "forno" | "stabilimento" | "camera-prova" | "pezzi-verniciati";

const ALT: Record<Slot, string> = {
  "linea-aerea": "Illustrazione: pezzi in alluminio appesi alla linea aerea",
  "vasche-pretrattamento": "Illustrazione: vasche della linea di pretrattamento",
  "cabina-verniciatura": "Illustrazione: pezzo in cabina di verniciatura a polvere",
  forno: "Illustrazione: bocca del forno di cottura",
  stabilimento: "Illustrazione: lo stabilimento di Medolago",
  "camera-prova": "Illustrazione: provini in camera di prova",
  "pezzi-verniciati": "Illustrazione: pezzi verniciati",
};

export default function Photo({ slot, src, alt, priority, className = "photo", sizes = "100vw" }: { slot: Slot; src?: string; alt?: string; priority?: boolean; className?: string; sizes?: string }) {
  const url = src || `/img/slot/${slot}.svg`;
  const isSvg = url.endsWith(".svg");
  return (
    <div className={className}>
      <Image src={url} alt={alt ?? ALT[slot]} fill sizes={sizes} priority={priority} unoptimized={isSvg} style={{ objectFit: "cover" }} />
    </div>
  );
}

import Image from "next/image";
import { foto, type FotoKey } from "@/lib/foto";

/** Slot foto: foto reale dal catalogo (lib/foto.ts), ottimizzata da next/image in AVIF/WebP. */
export default function Photo({ name, priority, className = "photo", sizes = "100vw", position }: { name: FotoKey; priority?: boolean; className?: string; sizes?: string; position?: string }) {
  const f = foto[name];
  return (
    <div className={className}>
      <Image src={f.src} alt={f.alt} fill sizes={sizes} priority={priority} quality={70} style={{ objectFit: "cover", objectPosition: position || f.pos }} />
    </div>
  );
}

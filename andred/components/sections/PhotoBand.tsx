import Image from "next/image";

/** Foto a tutta larghezza tra due sezioni, con didascalia mono. */
export default function PhotoBand({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="wrap pb-24 md:pb-36">
      <div className="relative aspect-[4/3] w-full overflow-hidden border border-stone bg-stone/25 sm:aspect-[16/9]">
        <Image src={src} alt={alt} fill sizes="(min-width: 1600px) 1600px, 100vw" className="object-cover" />
      </div>
      <figcaption className="mono mt-3 flex justify-between gap-4 text-muted">
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

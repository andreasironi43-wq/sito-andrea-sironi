import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { prelaunch } from "@/lib/site";
import Wordmark from "../Wordmark";

/**
 * Apertura. Telefono e tablet: foto da bordo a bordo, poi il wordmark, poi frase e pulsante.
 * Desktop: foto a destra e testo a sinistra, wordmark a tutta larghezza in fondo al primo schermo.
 */
export default function Hero({ t }: { t: Dictionary }) {
  const cta = prelaunch ? { href: "#drop", label: t.hero.cta } : { href: "#oggetti", label: t.nav.objects };
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="grid lg:wrap lg:min-h-[calc(100svh-3.5rem)] lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:gap-x-[var(--gutter)] lg:pt-[var(--gutter)]"
    >
      <figure className="relative aspect-[4/5] overflow-hidden bg-stone/25 sm:aspect-[16/10] lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:aspect-auto lg:min-h-[22rem]">
        <Image
          src={t.hero.image.src}
          alt={t.hero.image.alt}
          fill
          priority
          sizes="(min-width: 1024px) 66vw, 100vw"
          className="object-cover object-[50%_18%] sm:object-[50%_32%] lg:object-[50%_22%]"
        />
      </figure>

      <h1
        id="hero-title"
        className="wrap mt-3 text-[clamp(3rem,calc((min(100vw,1600px)-2*var(--gutter))/3.85),26rem)] lg:col-span-12 lg:row-start-2 lg:mt-[var(--gutter)] lg:-ml-[0.04em] lg:px-0"
      >
        <Wordmark animate />
      </h1>

      <div className="wrap flex flex-col gap-6 pt-4 pb-10 lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:justify-between lg:px-0 lg:pt-0 lg:pb-0">
        <p className="max-w-[24ch] text-[clamp(1.25rem,2vw,2rem)] leading-[1.15] font-medium tracking-[-0.02em]">
          <span className="block">{t.hero.kicker}.</span>
          <span className="block">{t.hero.claim}</span>
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={cta.href}
            className="inline-flex h-14 w-full items-center justify-center bg-ink px-6 text-base font-bold tracking-[-0.01em] text-paper uppercase hover:bg-signal sm:w-auto"
          >
            {cta.label} →
          </a>
          <a href="#about" className="group hidden min-h-11 items-center gap-3 lg:inline-flex">
            <span aria-hidden="true" className="scroll-line block h-10 w-px bg-stone" />
            <span className="mono group-hover:text-signal">{t.hero.scroll} ↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

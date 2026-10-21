import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Objects from "@/components/sections/Objects";
import Process from "@/components/sections/Process";
import Editions from "@/components/sections/Editions";
import Journal from "@/components/sections/Journal";
import Signup from "@/components/sections/Signup";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <a
        href="#main"
        className="mono sr-only z-50 bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        {t.a11y.skip}
      </a>
      <Header lang={lang} t={t} />
      <main id="main">
        <Hero t={t} />
        <Intro t={t} />
        <Objects t={t} />
        <Process t={t} />
        <Editions t={t} />
        <Journal t={t} />
        <Signup t={t} lang={lang} />
      </main>
    </>
  );
}

import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Objects from "@/components/sections/Objects";
import Process from "@/components/sections/Process";
import Editions from "@/components/sections/Editions";
import Journal from "@/components/sections/Journal";
import Signup from "@/components/sections/Signup";
import PhotoBand from "@/components/sections/PhotoBand";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <Hero t={t} />
      <Intro t={t} />
      <PhotoBand {...t.bands[0]} />
      <Objects t={t} lang={lang} />
      <Process t={t} />
      <PhotoBand {...t.bands[1]} />
      <Editions t={t} lang={lang} />
      <Journal t={t} />
      <Signup t={t} lang={lang} />
    </>
  );
}

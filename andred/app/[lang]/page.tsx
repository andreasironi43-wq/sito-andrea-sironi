import { Fragment } from "react";
import { notFound } from "next/navigation";
import { getDictionary, isLocale } from "@/lib/i18n";
import { prelaunch } from "@/lib/site";
import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Objects from "@/components/sections/Objects";
import Process from "@/components/sections/Process";
import Editions from "@/components/sections/Editions";
import Journal from "@/components/sections/Journal";
import Signup from "@/components/sections/Signup";
import PhotoBand from "@/components/sections/PhotoBand";

type Key = "intro" | "objects" | "process" | "editions" | "journal" | "signup";

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);

  // Pre-lancio: l'iscrizione sale subito dopo gli oggetti, il Journal resta fuori.
  const order: Key[] = prelaunch
    ? ["intro", "objects", "signup", "process", "editions"]
    : ["intro", "objects", "process", "editions", "journal", "signup"];
  const total = order.length;
  const n = (k: Key) => order.indexOf(k) + 1;

  const render: Record<Key, React.ReactNode> = {
    intro: (
      <>
        <Intro t={t} n={n("intro")} total={total} />
        <PhotoBand {...t.bands[0]} />
      </>
    ),
    objects: <Objects t={t} lang={lang} n={n("objects")} total={total} />,
    process: (
      <>
        <Process t={t} n={n("process")} total={total} />
        <PhotoBand {...t.bands[1]} />
      </>
    ),
    editions: <Editions t={t} lang={lang} n={n("editions")} total={total} showArchive={!prelaunch} />,
    journal: <Journal t={t} n={n("journal")} total={total} />,
    signup: <Signup t={t} lang={lang} n={n("signup")} total={total} />,
  };

  return (
    <>
      <Hero t={t} />
      {order.map((k) => (
        <Fragment key={k}>{render[k]}</Fragment>
      ))}
    </>
  );
}

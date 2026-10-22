import type { Dictionary, Locale } from "@/lib/i18n";
import SectionHead from "../SectionHead";
import SignupForm from "./SignupForm";

export default function Signup({ t, lang, n, total }: { t: Dictionary; lang: Locale; n: number; total: number }) {
  return (
    <section id="drop" aria-labelledby="drop-title" className="wrap pb-24 md:pb-36">
      <SectionHead label={t.signup.label} n={n} total={total} />
      <div className="grid-12 mt-10 gap-y-10 md:mt-16">
        <div className="col-span-12 lg:col-span-7">
          <h2 id="drop-title" className="display text-[clamp(2.5rem,7.5vw,7.5rem)]">
            {t.signup.title}
          </h2>
          <p className="mt-6 max-w-[34ch] text-lg leading-snug">{t.signup.body}</p>
        </div>
        <div className="col-span-12 self-end lg:col-span-5">
          <SignupForm t={t.signup} lang={lang} />
        </div>
      </div>
    </section>
  );
}

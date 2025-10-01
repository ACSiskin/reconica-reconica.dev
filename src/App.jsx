import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import roiLogo from "./assets/ROILogo.png";
const LOGO_SRC = roiLogo;

const copy = {
  pl: {
    navAbout: "O projekcie",
    navPartners: "Partnerzy",
    navContact: "Kontakt",
    navLogin: "Logowanie do R.O.I.",
    navLoginShort: "Logowanie",
    heroLine1: "Zobacz sens w szumie.",
    heroLine2: "Informacja to przewaga.",
    heroP:
      "Reconica OSINT Intelligence redefiniuje sposób, w jaki patrzysz na dane. Zamiast fragmentów widzisz pełny obraz. Zamiast hałasu — spójny sygnał. Zbudowane dla tych, którzy działają szybko, precyzyjnie i bez kompromisów.",
    ctaMore: "Dowiedz się więcej",
    badge1: "Private by design",
    badge2: "Analiza wieloźródłowa",
    badge3: "Agentowy workflow",
    aboutH: "O projekcie",
    aboutP1:
      "Nie zdradzamy sekretów. Ale możemy zdradzić jedno: każda informacja ma drugie dno. Reconica pozwala zobaczyć narrację ukrytą w danych rozproszonych po otwartej sieci i systemach, które z pozoru nie łączą się ze sobą. Wykorzystujemy zestaw narzędzi analitycznych i agentowe scenariusze działania, które składają się na uporządkowany proces — od sygnału, przez kontekst, po decyzję.",
    aboutP2:
      "To platforma dla zespołów operacyjnych, badawczych i bezpieczeństwa. Dyskretnie obsługuje przepływy pracy, które wymagają szybkości, powtarzalności i odporności na szum informacyjny. Reszta pozostaje poza kadrem.",
    extH: "Co zobaczysz z zewnątrz",
    extLi1: "Elegancki panel wejściowy i kontrola dostępu do R.O.I.",
    extLi2: "Przejrzyste narracje wyników — bez ujawniania zaplecza.",
    extLi3: "Stabilne działanie i dyskretna telemetria.",
    extLi4: "Integracje opisane językiem biznesu, nie konfiguracją.",
    extNote:
      "* Wewnętrzna architektura, zestaw źródeł, reguły agentów oraz techniki łączenia sygnałów pozostają niejawne.",
    partnersH: "Partnerzy i współpraca",
    partnersP:
       "Współpracujemy z zespołami analitycznymi oraz jednostkami badawczymi przy projektach OSINT/CTI/DFIR. W ramach wybranych inicjatyw pracujemy m.in. z zespołem OSINTownia.pl. Szczegóły integracji i metody pozostają niejawne.",
    bannerH: "Gotowy, by wejść do Reconica OSINT Intelligence?",
    bannerP: "Dostęp wyłącznie dla zweryfikowanych użytkowników.",
    contactH: "Kontakt",
    contactP:
       "Jeśli masz pytanie merytoryczne lub dotyczące współpracy badawczo-analitycznej, napisz do nas odpowiednim kanałem — zespół odpowiada selektywnie.",
    contactGen: "Zapytania ogólne",
    contactBiz: "Współpraca",
    contactSup: "Wsparcie",
    footerAbout: "O projekcie",
    footerContact: "Kontakt",
    footerLogin: "Logowanie",
    docTitle: "Reconica OSINT Intelligence",
  },
  en: {
    navAbout: "About",
    navPartners: "Partners",
    navContact: "Contact",
    navLogin: "Sign in to R.O.I.",
    navLoginShort: "Sign in",
    heroLine1: "See the signal in the noise.",
    heroLine2: "Information is an advantage.",
    heroP:
      "Reconica OSINT Intelligence redefines how you look at data. Instead of fragments you see the whole picture. Instead of noise — a coherent signal. Built for those who act fast, precisely, and without compromise.",
    ctaMore: "Learn more",
    badge1: "Private by design",
    badge2: "Multi‑source analysis",
    badge3: "Agentic workflow",
    aboutH: "About the project",
    aboutP1:
      "We keep our secrets. But here’s one: every piece of information has a second layer. Reconica reveals the narrative hidden in data scattered across the open web and systems that seemingly don’t connect. We use analytical toolsets and agentic playbooks that form an orderly process — from signal, through context, to decision.",
    aboutP2:
      "It’s a platform for operational, research, and security teams. It discreetly powers workflows that demand speed, repeatability, and resilience to information noise. The rest stays off‑camera.",
    extH: "What you’ll see from the outside",
    extLi1: "Elegant entry panel and access control to R.O.I.",
    extLi2: "Clear result narratives — without unveiling the backstage.",
    extLi3: "Stable operation and discreet telemetry.",
    extLi4: "Integrations described in business language, not configuration.",
    extNote:
      "* Internal architecture, source sets, agent rules and signal‑fusion techniques remain undisclosed.",
    partnersH: "Partners & collaboration",
    partnersP:
       "We collaborate with analytical and research teams on OSINT/CTI/DFIR initiatives. Selected projects include work with the OSINTownia.pl team. Integration details and methods remain undisclosed.",
    bannerH: "Ready to enter Reconica OSINT Intelligence?",
    bannerP: "Access for verified users only.",
    contactH: "Contact",
    contactP:
     "For research-oriented or analytical inquiries, reach out via the appropriate channel — the team responds selectively.",
    contactGen: "General inquiries",
    contactBiz: "Partnerships",
    contactSup: "Support",
    footerAbout: "About",
    footerContact: "Contact",
    footerLogin: "Sign in",
    docTitle: "Reconica OSINT Intelligence",
  },
};

export default function App() {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("reconica_lang") || "pl";
    }
    return "pl";
  });

  useEffect(() => {
    document.title = copy[lang].docTitle;
    if (typeof window !== "undefined") localStorage.setItem("reconica_lang", lang);
  }, [lang]);

  const t = (k) => copy[lang][k];

  const { scrollYProgress } = useScroll();
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.6, 0.1]);
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <div className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      {/* Background Video (YouTube as cover) */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute -inset-x-10 -inset-y-20">
          <iframe
            className="w-[120vw] h-[120vh] object-cover scale-110"
            src="https://www.youtube.com/embed/MG_V9-X0L8Q?autoplay=1&mute=1&controls=0&loop=1&playlist=MG_V9-X0L8Q&modestbranding=1&playsinline=1&showinfo=0"
            title="Reconica Promo"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
        {/* Subtle animated glow */}
        <motion.div
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute -top-1/3 left-1/2 h-[80vh] w-[80vw] -translate-x-1/2 rounded-full blur-3xl"
        >
          <div className="h-full w-full bg-gradient-to-b from-white/10 via-white/5 to-transparent" />
        </motion.div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-20 backdrop-blur-lg bg-black/30 border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
<a href="#top" className="group inline-flex items-center gap-3">
  <img
    src={LOGO_SRC}
    alt="Reconica"
    className="h-20 w-20 object-contain select-none"
    draggable="false"
  />
  <div>
    <div className="text-sm uppercase tracking-widest text-white/70">Reconica</div>
    <div className="-mt-0.5 text-base font-semibold">OSINT Intelligence</div>
  </div>
</a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-white/80 transition-colors">{t("navAbout")}</a>
            <a href="#partners" className="hover:text-white/80 transition-colors">{t("navPartners")}</a>
            <a href="#contact" className="hover:text-white/80 transition-colors">{t("navContact")}</a>
            <LangSwitcher lang={lang} setLang={setLang} />
            <a
              href="/roi"
              className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 font-semibold backdrop-blur hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              {t("navLogin")}
            </a>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <LangSwitcher lang={lang} setLang={setLang} />
            <a
              href="/roi"
              className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold"
            >
              {t("navLoginShort")}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col items-center justify-center px-4 md:px-8">
        <motion.h1
          style={{ y: yHero }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-center text-4xl font-black leading-tight md:text-6xl"
        >
          {t("heroLine1")}
          <span className="block text-white/70">{t("heroLine2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 max-w-2xl text-center text-base text-white/80 md:text-lg"
        >
          {t("heroP")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/roi"
            className="group relative inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold backdrop-blur-sm transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/40"
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            {t("navLogin")}
          </a>
          <a href="#about" className="rounded-2xl border border-white/15 px-6 py-3 text-base text-white/80 hover:text-white/100">
            {t("ctaMore")}
          </a>
        </motion.div>

        {/* subtle badges */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-xs text-white/60">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{t("badge1")}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{t("badge2")}</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">{t("badge3")}</span>
        </div>
      </section>

      {/* About: enigmatic copy */}
      <section id="about" className="relative mx-auto max-w-6xl px-4 py-20 md:px-8">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold md:text-3xl">{t("aboutH")}</h2>
            <p className="mt-4 text-white/80">{t("aboutP1")}</p>
            <p className="mt-4 text-white/70">{t("aboutP2")}</p>
          </div>
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <h3 className="text-lg font-semibold">{t("extH")}</h3>
              <ul className="mt-4 space-y-3 text-white/80">
                <li className="flex items-start gap-3"><Bullet/> {t("extLi1")}</li>
                <li className="flex items-start gap-3"><Bullet/> {t("extLi2")}</li>
                <li className="flex items-start gap-3"><Bullet/> {t("extLi3")}</li>
                <li className="flex items-start gap-3"><Bullet/> {t("extLi4")}</li>
              </ul>
              <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/60">
                {t("extNote")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section id="partners" className="relative mx-auto max-w-6xl px-4 py-16 md:px-8">
        <h2 className="text-2xl font-bold md:text-3xl">{t("partnersH")}</h2>
        <p className="mt-4 max-w-3xl text-white/80">{t("partnersP")}</p>
        <div className="mt-8 grid grid-cols-2 gap-4 opacity-80 md:grid-cols-4">
          <Partner name="OSINTownia.pl"/>
          <Partner name="CTI"/>
          <Partner name="DFIR"/>
          <Partner name="R&D"/>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative border-y border-white/10 bg-white/[0.03] py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h3 className="text-xl font-semibold md:text-2xl">{t("bannerH")}</h3>
              <p className="mt-2 text-white/70">{t("bannerP")}</p>
            </div>
            <a
              href="/roi"
              className="group relative inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-3 font-semibold backdrop-blur hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-80"><path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              {t("navLogin")}
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative mx-auto max-w-6xl px-4 py-20 md:px-8">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-2xl font-bold md:text-3xl">{t("contactH")}</h2>
          <p className="mt-4 max-w-3xl text-white/80">{t("contactP")}</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <ContactCard title={t("contactGen")} value="kontakt@osintownia.dev" />
            <ContactCard title={t("contactBiz")} value="p.oleksiak@osintownia.dev" />
            <ContactCard title={t("contactSup")} value="support@reconica.dev" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-sm text-white/60 md:flex-row md:px-8">
          <div>© {new Date().getFullYear()} Reconica OSINT Intelligence. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}

function LangSwitcher({ lang, setLang }) {
  return (
    <div className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 p-1 text-xs">
      <button
        onClick={() => setLang("pl")}
        className={`px-2 py-1 rounded-md transition ${lang === "pl" ? "bg-white/20" : "hover:bg-white/10"}`}
        aria-pressed={lang === "pl"}
      >
        PL
      </button>
      <button
        onClick={() => setLang("en")}
        className={`px-2 py-1 rounded-md transition ${lang === "en" ? "bg-white/20" : "hover:bg-white/10"}`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}

function Bullet() {
  return (
    <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-md border border-white/15 bg-white/10 text-[10px]">★</span>
  );
}

function Partner({ name }) {
  return (
    <div className="flex h-14 items-center justify-center rounded-xl border border-white/10 bg-black/30">
      <span className="text-sm tracking-wide text-white/70">{name}</span>
    </div>
  );
}

function ContactCard({ title, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/30 p-4">
      <div className="text-xs uppercase tracking-widest text-white/60">{title}</div>
      <div className="mt-1 text-sm font-medium">{value}</div>
    </div>
  );
}

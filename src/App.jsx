import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import hrpLogo from "./assets/HRP_LOGO.jpeg";

const LOGO_SRC = hrpLogo;

// Public docs (served from /public in Vite)
const DOCS = {
  mindOs: "/docs/MIND_OS_Cognitive_Architecture_v3.1.pdf",
  dtr: "/docs/VESPER_DTR_v1.2.pdf",
};

const VIDEO = {
  youtubeUrl: "https://www.youtube.com/watch?v=yqasKddWLLg",
};

const copy = {
  pl: {
    navAbstract: "Abstrakt",
    navContrib: "Wkład",
    navArchitecture: "Architektura",
    navExperiments: "Eksperymenty",
    navImplementations: "Implementacje",
    navDocs: "Dokumenty",
    navContact: "Kontakt",

    topBadge: "HRP / MIND_OS • architektura poznawcza agentów",
    heroTitle: "Homeostatic Regulation Protocol",
    heroSubtitle:
      "Warstwa wewnętrznej regulacji agenta: homeostaza, popędy, metabolizm poznawczy i konsolidacja pamięci.",
    heroP:
      "HRP pozycjonuje się obok protokołów narzędziowych i komunikacyjnych (MCP/ACP/A2A): zamiast transportu kontekstu, adresuje stabilność zachowania, koszt akcji i autonomię w długich horyzontach.",
    ctaPrimary: "Czytaj whitepaper",
    ctaSecondary: "Zobacz architekturę",

    abstractTitle: "Abstrakt",
    abstractP1:
      "W praktyce agentowej brak stabilnej autonomii rzadko wynika z „braku promptu”. Częściej to efekt braku regulatora stanu: kosztów poznawczych, priorytetów, popędów oraz wygaszania napięcia.",
    abstractP2:
      "HRP wprowadza pętlę regulacji wewnętrznej, która kontroluje przełączanie trybów decyzyjnych, budżety energii/uwagi oraz konsolidację pamięci epizodycznej do narracji (system sleep).",

    contribTitle: "Kluczowy wkład",
    contrib1Title: "HRP ≠ protokół komunikacji",
    contrib1P:
      "MCP/ACP/A2A rozwiązują głównie transport kontekstu i współpracę między agentami. HRP reguluje „dlaczego/kiedy/jak” agent działa — wewnątrz instancji.",
    contrib2Title: "Metabolizm poznawczy",
    contrib2P:
      "Agent posiada budżet energii (uwaga/obciążenie). Wysoki koszt uruchamia refleksję, niski — heurystyki. Ciało (akcje narzędziowe) uruchamiane jest tylko, gdy warto.",
    contrib3Title: "Homeostaza i wygaszanie",
    contrib3P:
      "Stany (np. PAD) oraz popędy podlegają inercji, decay i powrotowi do baseline — stabilizując zachowanie bez „sztywnej dyscypliny promptowej”.",
    contrib4Title: "Konsolidacja narracyjna",
    contrib4P:
      "„Sen systemowy” konsoliduje epizody do autobiografii i modelu JA, redukując drift i poprawiając spójność długich sesji.",

    archTitle: "Pozycjonowanie w stosie agentowym",
    archLead:
      "HRP działa wewnątrz instancji. Protokoły typu MCP/ACP/A2A otaczają agenta — łączą narzędzia, kontekst i współpracę.",
    archCard1Title: "Zewnętrze (tooling / współpraca)",
    archCard1Bullets: ["MCP / ACP / A2A", "Kontekst, narzędzia, kanały", "Interoperacyjność agentów"],
    archCard2Title: "Wnętrze (regulacja / autonomia)",
    archCard2Bullets: ["HRP", "Homeostaza + drives + PAD", "Router decyzyjny + budżety", "Sleep / konsolidacja"],

    curiosTitle: "Ciekawostki (w stylu research)",
    curios1: "Ten sam bodziec ≠ ten sam efekt: appraisal zależy od historii epizodów i aktywnych drive’ów.",
    curios2: "Najczęstsza porażka agentów to „over-tooling”: HRP minimalizuje zbędne akcje narzędziowe.",
    curios3: "Drift narracyjny to nie tylko pamięć — to brak wygaszania i brak konsolidacji.",
    curios4: "Najtańszy zysk jakości często daje meta-kontrola (kiedy przejść w refleksję), nie „dłuższy prompt”.",

    expTitle: "Eksperymenty i metryki",
    expLead:
      "Strona jest pozycjonowana badawczo, więc pokazujemy metryki, a nie obietnice. Poniżej przykładowy zestaw, który dobrze waliduje HRP.",
    exp1Title: "Stabilność w długiej sesji",
    exp1P: "Dryf zachowania vs powrót do baseline (N=300–2000 tur).",
    exp2Title: "Koszt narzędzi i decyzji",
    exp2P: "Ile tool-call’i agent wykonuje na jednostkę celu (przy zachowaniu jakości).",
    exp3Title: "Odporność na szum bodźców",
    exp3P: "Czy appraisal filtruje szum i utrzymuje priorytety bez eskalacji kosztów.",
    exp4Title: "Bezpieczeństwo i gating",
    exp4P: "Czy safety gate blokuje wysokie ryzyko przy minimalnej degradacji użyteczności.",

    implTitle: "Reference implementations",
    implLead:
      "Aplikacje nie są tu „produktem do kupienia” — są implementacjami referencyjnymi, które dostarczają danych z pola i pozwalają walidować HRP.",
    impl1Title: "R.O.I.",
    impl1P: "Środowisko operacyjne, gdzie liczy się koszt akcji i precyzyjne priorytetyzowanie.",
    impl2Title: "S.A.R.A.",
    impl2P: "Asystent ciągły — nacisk na stabilność narracji, spójność i konsolidację pamięci.",
    impl3Title: "V.E.S.P.E.R.",
    impl3P: "System narzędziowy (tooling-heavy) — idealny do badania meta-kontroli i ograniczania over-tooling.",

    docsTitle: "Dokumenty",
    docsLead:
      "Poniżej znajdują się publiczne materiały techniczne (PDF). Jeśli publikujesz wersje nowsze — podmień pliki w /public/docs.",
    docs1Title: "MIND_OS / HRP Whitepaper",
    docs1P: "V.E.S.P.E.R. Alpha 2.0 — MIND_OS Cognitive Architecture (v3.1).",
    docs2Title: "V.E.S.P.E.R. DTR",
    docs2P: "Dokumentacja techniczno-ruchowa (DTR) v1.2 (naukowa, FULL).",

    videoTitle: "Talk / Demo",
    videoLead:
      "Materiał wideo jako artefakt badawczy: wprowadzenie koncepcyjne i narracyjne do HRP/MIND_OS.",
    videoBullets: [
      "Motywacja: dlaczego same protokoły kontekstowe nie wystarczają",
      "Homeostaza, popędy i koszt poznawczy",
      "Jak HRP pozycjonuje się względem MCP/ACP/A2A",
    ],
    videoButton: "Otwórz na YouTube",

    ethicsTitle: "Ograniczenia i bezpieczeństwo",
    ethicsP:
      "HRP jest warstwą regulacji i nie zastępuje polityk bezpieczeństwa, weryfikacji narzędzi ani zgodności prawnej. Projekt zakłada audytowalność decyzji, gating oraz minimalizację danych wrażliwych — szczegóły zależą od wdrożenia.",

    contactTitle: "Kontakt",
    contactP: "Pisz bezpośrednio:",
    contactEmail1Label: "antoni.czyz@outlook.com",
    contactEmail2Label: "support@reconica.dev",

    footer: "© Reconica • HRP / MIND_OS research landing",
    langToggle: "EN",
  },

  en: {
    navAbstract: "Abstract",
    navContrib: "Contributions",
    navArchitecture: "Architecture",
    navExperiments: "Experiments",
    navImplementations: "Implementations",
    navDocs: "Docs",
    navContact: "Contact",

    topBadge: "HRP / MIND_OS • cognitive agent architecture",
    heroTitle: "Homeostatic Regulation Protocol",
    heroSubtitle:
      "An internal regulation layer for agents: homeostasis, drives, cognitive metabolism, and memory consolidation.",
    heroP:
      "HRP is positioned alongside tool/communication protocols (MCP/ACP/A2A): instead of moving context, it targets behavioral stability, action cost, and long-horizon autonomy.",
    ctaPrimary: "Read the whitepaper",
    ctaSecondary: "View architecture",

    abstractTitle: "Abstract",
    abstractP1:
      "In real agent deployments, instability rarely comes from “missing prompt tricks”. More often it’s the absence of a state regulator: cognitive costs, priorities, drives, and tension decay.",
    abstractP2:
      "HRP introduces an internal regulation loop that controls decision-mode switching, energy/attention budgets, and the consolidation of episodic memory into a narrative (“system sleep”).",

    contribTitle: "Key contributions",
    contrib1Title: "HRP ≠ a communication protocol",
    contrib1P:
      "MCP/ACP/A2A primarily address context transport and inter-agent collaboration. HRP regulates the agent’s internal “why/when/how” — inside the instance.",
    contrib2Title: "Cognitive metabolism",
    contrib2P:
      "The agent has an energy budget (attention/load). High cost triggers reflection; low cost uses heuristics. The “body” (tool actions) runs only when it’s worth it.",
    contrib3Title: "Homeostasis & decay",
    contrib3P:
      "States (e.g., PAD) and drives have inertia, decay, and a return-to-baseline — stabilizing behavior without rigid prompt discipline.",
    contrib4Title: "Narrative consolidation",
    contrib4P:
      "A system “sleep” pipeline consolidates episodes into an autobiography and self-model, reducing drift and improving long-session coherence.",

    archTitle: "Where HRP sits in the agent stack",
    archLead:
      "HRP runs inside the instance. Protocols like MCP/ACP/A2A sit around the agent — connecting tools, context, and collaboration.",
    archCard1Title: "Outside (tooling / collaboration)",
    archCard1Bullets: ["MCP / ACP / A2A", "Context, tools, channels", "Interoperability"],
    archCard2Title: "Inside (regulation / autonomy)",
    archCard2Bullets: ["HRP", "Homeostasis + drives + PAD", "Decision router + budgets", "Sleep / consolidation"],

    curiosTitle: "Research notes (quick facts)",
    curios1: "Same stimulus ≠ same outcome: appraisal depends on episodic history and active drives.",
    curios2: "A common failure mode is “over-tooling”: HRP reduces unnecessary tool actions.",
    curios3: "Narrative drift is not just memory — it’s missing decay and consolidation.",
    curios4: "The cheapest quality win is often meta-control (when to reflect), not longer prompts.",

    expTitle: "Experiments & metrics",
    expLead:
      "A research landing should show metrics, not promises. Below is a practical validation set for HRP.",
    exp1Title: "Long-session stability",
    exp1P: "Behavior drift vs return-to-baseline (N=300–2000 turns).",
    exp2Title: "Tooling & decision cost",
    exp2P: "Tool-call count per objective unit while preserving quality.",
    exp3Title: "Noise robustness",
    exp3P: "Appraisal filtering keeps priorities without escalating cost.",
    exp4Title: "Safety gating",
    exp4P: "Safety gate blocks high-risk actions with minimal utility loss.",

    implTitle: "Reference implementations",
    implLead:
      "Apps are not “the product” here — they are field reference implementations that generate evidence and validate HRP.",
    impl1Title: "R.O.I.",
    impl1P: "Operational environment where action cost and strict prioritization matter.",
    impl2Title: "S.A.R.A.",
    impl2P: "Continuous assistant — focus on narrative stability, coherence, and consolidation.",
    impl3Title: "V.E.S.P.E.R.",
    impl3P: "Tooling-heavy system — ideal for studying meta-control and reducing over-tooling.",

    docsTitle: "Docs",
    docsLead:
      "Public technical materials (PDF). If you publish newer versions — replace files in /public/docs.",
    docs1Title: "MIND_OS / HRP Whitepaper",
    docs1P: "V.E.S.P.E.R. Alpha 2.0 — MIND_OS Cognitive Architecture (v3.1).",
    docs2Title: "V.E.S.P.E.R. DTR",
    docs2P: "Technical documentation (DTR) v1.2 (scientific, FULL).",

    videoTitle: "Talk / Demo",
    videoLead:
      "A video artifact: conceptual and narrative framing for HRP/MIND_OS.",
    videoBullets: [
      "Motivation: why context protocols alone are not enough",
      "Homeostasis, drives, and cognitive cost",
      "How HRP relates to MCP/ACP/A2A",
    ],
    videoButton: "Open on YouTube",

    ethicsTitle: "Limitations & safety",
    ethicsP:
      "HRP is a regulation layer and does not replace safety policies, tool verification, or legal compliance. The project assumes auditability, gating, and minimization of sensitive data — specifics depend on deployment.",

    contactTitle: "Contact",
    contactP: "Reach out:",
    contactEmail1Label: "antoni.czyz@outlook.com",
    contactEmail2Label: "support@reconica.dev",

    footer: "© Reconica • HRP / MIND_OS research landing",
    langToggle: "PL",
  },
};

function cn(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-28 py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-5">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.22em] text-white/50">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 text-2xl md:text-3xl font-semibold tracking-tight">
          {title}
        </h2>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}

function Card({ title, children, className }) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white/5 border border-white/10 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]",
        className
      )}
    >
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-white/80">
        {children}
      </div>
    </div>
  );
}

function BulletList({ items }) {
  return (
    <ul className="mt-3 space-y-2 text-sm text-white/80">
      {items.map((x) => (
        <li key={x} className="flex gap-3">
          <span className="mt-[0.38rem] h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" />
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

function StackDiagram({ t }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-6 overflow-hidden">
      <div className="grid md:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-black/25 border border-white/10 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">
            {t.archCard1Title}
          </div>
          <BulletList items={t.archCard1Bullets} />
        </div>

        <div className="rounded-2xl bg-black/25 border border-white/10 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">
            {t.archCard2Title}
          </div>
          <BulletList items={t.archCard2Bullets} />
        </div>
      </div>

      <div className="mt-6">
        <div className="rounded-2xl bg-black/25 border border-white/10 p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-white/50">
            HRP Core Loop (concept)
          </div>

          {/* lightweight inline diagram */}
          <div className="mt-4 grid md:grid-cols-5 gap-3 text-xs">
            {["SENSE", "APPRAISE", "STATE", "DECIDE", "ACT/MEM"].map((step) => (
              <div
                key={step}
                className="rounded-xl bg-white/5 border border-white/10 px-3 py-3 text-center text-white/80"
              >
                {step}
              </div>
            ))}
          </div>

          <p className="mt-4 text-sm text-white/70 leading-relaxed">
            Tick loop: perception/context → appraisal → homeostatic update
            (drives/PAD/decay) → decision router (heuristic vs reflective) →
            tool action + memory write.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const stored = localStorage.getItem("reconica_lang");
    if (stored === "pl" || stored === "en") setLang(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("reconica_lang", lang);
  }, [lang]);

  const t = copy[lang];

  const nav = useMemo(
    () => [
      { id: "abstract", label: t.navAbstract },
      { id: "contrib", label: t.navContrib },
      { id: "architecture", label: t.navArchitecture },
      { id: "experiments", label: t.navExperiments },
      { id: "implementations", label: t.navImplementations },
      { id: "docs", label: t.navDocs },
      { id: "contact", label: t.navContact },
    ],
    [t]
  );

  const { scrollYProgress } = useScroll();
  const barX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const toggleLang = () => setLang((p) => (p === "pl" ? "en" : "pl"));

  return (
    <div className="min-h-screen bg-[#070A12] text-white">
      {/* Subtle background */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(140,170,255,0.18),transparent_45%),radial-gradient(circle_at_80%_35%,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_40%_90%,rgba(160,255,220,0.10),transparent_45%)]" />
        <div className="absolute inset-0 opacity-[0.35] bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.25),rgba(0,0,0,0.6))]" />
      </div>

      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-white/10">
        <motion.div className="h-full bg-white/70" style={{ width: barX }} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={LOGO_SRC}
              alt="HRP"
              className="h-9 w-9 rounded-xl object-cover border border-white/10"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold">Reconica</div>
              <div className="text-xs text-white/60">{t.topBadge}</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-5 text-sm text-white/70">
            {nav.map((x) => (
              <a
                key={x.id}
                href={`#${x.id}`}
                className="hover:text-white transition-colors"
              >
                {x.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleLang}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 transition"
              aria-label="Toggle language"
            >
              {t.langToggle}
            </button>
            <a
              href="#docs"
              className="rounded-xl bg-white text-black px-3 py-2 text-xs font-semibold hover:opacity-90 transition"
            >
              {t.navDocs}
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative">
        <section className="pt-16 md:pt-20 pb-10">
          <div className="max-w-6xl mx-auto px-5">
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/55">
                  {t.topBadge}
                </p>
                <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
                  {t.heroTitle}
                </h1>
                <p className="mt-4 text-base md:text-lg text-white/75 leading-relaxed">
                  {t.heroSubtitle}
                </p>
                <p className="mt-5 text-sm md:text-base text-white/70 leading-relaxed max-w-2xl">
                  {t.heroP}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={DOCS.mindOs}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold hover:opacity-90 transition"
                  >
                    {t.ctaPrimary}
                  </a>
                  <a
                    href="#architecture"
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white/90 hover:bg-white/10 transition"
                  >
                    {t.ctaSecondary}
                  </a>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl bg-white/5 border border-white/10 p-6"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-white/55">
                  HRP at a glance
                </div>
                <div className="mt-5 space-y-4 text-sm text-white/80">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                    <span>Homeostasis (baseline, decay, stability)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                    <span>Drives + PAD-style state representation</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                    <span>Decision router (heuristics ↔ reflection)</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                    <span>System sleep (episodic → narrative)</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Abstract */}
        <Section id="abstract" title={t.abstractTitle}>
          <div className="grid md:grid-cols-2 gap-6">
            <Card title={t.abstractTitle}>
              <p>{t.abstractP1}</p>
              <p className="mt-3">{t.abstractP2}</p>
            </Card>
            <Card title={t.ethicsTitle}>
              <p>{t.ethicsP}</p>
              <p className="mt-4 text-xs text-white/60">
                Note: this landing is intentionally research-first (no autoplay embeds, minimal tracking).
              </p>
            </Card>
          </div>
        </Section>

        {/* Contributions */}
        <Section id="contrib" title={t.contribTitle}>
          <div className="grid md:grid-cols-2 gap-6">
            <Card title={t.contrib1Title}>{t.contrib1P}</Card>
            <Card title={t.contrib2Title}>{t.contrib2P}</Card>
            <Card title={t.contrib3Title}>{t.contrib3P}</Card>
            <Card title={t.contrib4Title}>{t.contrib4P}</Card>
          </div>
        </Section>

        {/* Architecture */}
        <Section id="architecture" title={t.archTitle}>
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-3xl">
            {t.archLead}
          </p>
          <div className="mt-6">
            <StackDiagram t={t} />
          </div>

          <div className="mt-10">
            <Card title={t.curiosTitle}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="text-sm text-white/80 leading-relaxed">{t.curios1}</div>
                <div className="text-sm text-white/80 leading-relaxed">{t.curios2}</div>
                <div className="text-sm text-white/80 leading-relaxed">{t.curios3}</div>
                <div className="text-sm text-white/80 leading-relaxed">{t.curios4}</div>
              </div>
            </Card>
          </div>
        </Section>

        {/* Experiments */}
        <Section id="experiments" title={t.expTitle}>
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-3xl">
            {t.expLead}
          </p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <Card title={t.exp1Title}>{t.exp1P}</Card>
            <Card title={t.exp2Title}>{t.exp2P}</Card>
            <Card title={t.exp3Title}>{t.exp3P}</Card>
            <Card title={t.exp4Title}>{t.exp4P}</Card>
          </div>
        </Section>

        {/* Implementations */}
        <Section id="implementations" title={t.implTitle}>
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-3xl">
            {t.implLead}
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <Card title={t.impl1Title}>{t.impl1P}</Card>
            <Card title={t.impl2Title}>{t.impl2P}</Card>
            <Card title={t.impl3Title}>{t.impl3P}</Card>
          </div>
        </Section>

        {/* Docs */}
        <Section id="docs" title={t.docsTitle}>
          <p className="text-sm md:text-base text-white/70 leading-relaxed max-w-3xl">
            {t.docsLead}
          </p>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <Card title={t.docs1Title}>
              <p>{t.docs1P}</p>
              <a
                href={DOCS.mindOs}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2 text-xs font-semibold hover:opacity-90 transition"
              >
                PDF
              </a>
            </Card>

            <Card title={t.docs2Title}>
              <p>{t.docs2P}</p>
              <a
                href={DOCS.dtr}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-white text-black px-4 py-2 text-xs font-semibold hover:opacity-90 transition"
              >
                PDF
              </a>
            </Card>
          </div>

          <div className="mt-10">
            <Card title={t.videoTitle}>
              <p className="text-sm text-white/75">{t.videoLead}</p>
              <div className="mt-4 grid md:grid-cols-[1fr_0.9fr] gap-6 items-start">
                <div className="rounded-2xl bg-black/25 border border-white/10 p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/55">
                    {t.videoTitle}
                  </div>
                  <BulletList items={t.videoBullets} />
                  <a
                    href={VIDEO.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white/90 hover:bg-white/10 transition"
                  >
                    {t.videoButton}
                  </a>
                </div>

                <div className="rounded-2xl bg-black/25 border border-white/10 p-5">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/55">
                    Embed policy
                  </div>
                  <p className="mt-3 text-sm text-white/75 leading-relaxed">
                    To keep the landing lightweight and privacy-friendly, the video is linked
                    instead of autoplay-embedding YouTube. If you decide to embed, prefer lazy-load
                    and “nocookie” mode.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title={t.contactTitle}>
          <Card title={t.contactTitle}>
            <p className="text-sm text-white/75">{t.contactP}</p>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a
                className="text-white/90 hover:text-white underline decoration-white/20 hover:decoration-white/50"
                href="mailto:antoni.czyz@outlook.com"
              >
                {t.contactEmail1Label}
              </a>
              <a
                className="text-white/90 hover:text-white underline decoration-white/20 hover:decoration-white/50"
                href="mailto:support@reconica.dev"
              >
                {t.contactEmail2Label}
              </a>
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs text-white/50">
              <a className="hover:text-white/70" href="/regulamin.html">
                {lang === "pl" ? "Regulamin" : "Terms"}
              </a>
              <span>•</span>
              <a className="hover:text-white/70" href="https://reconica.dev">
                reconica.dev
              </a>
            </div>
          </Card>
        </Section>

        <footer className="border-t border-white/10 py-10">
          <div className="max-w-6xl mx-auto px-5 text-xs text-white/55">
            {t.footer}
          </div>
        </footer>
      </main>
    </div>
  );
}

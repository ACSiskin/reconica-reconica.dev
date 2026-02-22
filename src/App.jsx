
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import hrpLogo from "./assets/HRP_logo_white.png";
import hrpLogoGold from "./assets/HRP_logo_gold.png";

const YT_URL = "https://www.youtube.com/watch?v=yqasKddWLLg";

const DOCS = {
  mindOs: "/docs/MIND_OS_whitepaper_v3.1_EN.pdf",
  vesperDtr: "/docs/VESPER_DTR_v1.2_PL.pdf",
};

const STORAGE_KEY = "reconica_lang";

const copy = {
  pl: {
    docTitle: "HRP — Homeostatic Regulation Protocol (MIND_OS)",
    nav: {
      overview: "Przegląd",
      architecture: "Architektura",
      notes: "Ciekawostki",
      experiments: "Ewaluacja",
      refs: "Implementacje",
      docs: "Dokumenty",
      contact: "Kontakt",
      lang: "EN",
    },
    hero: {
      kTag: "MIND_OS • V.E.S.P.E.R. • HRP",
      h1a: "Homeostatic",
      h1b: "Regulation Protocol",
      lead:
        "HRP to warstwa regulacji wewnętrznej agenta — zarządza stanem, popędami (drives) i kosztem poznawczym. To nie jest kolejny protokół komunikacji. To „układ autonomiczny” dla długotrwałych instancji.",
      ctaPrimary: "Czytaj whitepaper",
      ctaSecondary: "Zobacz architekturę",
      badges: [
        "homeostaza i stabilność",
        "metabolizm poznawczy",
        "warstwowa decyzyjność",
        "pamięć + konsolidacja (sen)",
      ],
    },
    abstract: {
      h: "Abstrakt",
      p1:
        "W praktycznych systemach agentowych problemem nie jest brak narzędzi, tylko brak wewnętrznej stabilizacji: dryf narracji, nadmierne użycie narzędzi, lock‑in motywacyjny i wahania trybu pracy.",
      p2:
        "HRP opisuje mechanikę homeostazy poznawczej: bodźce → appraisal → aktualizacja stanu (PAD) i popędów → router decyzji (heurystyka / refleksja / meta‑kontrola) → pamięć epizodyczna → konsolidacja narracyjna. Celem jest spójność działania w czasie, przy kontrolowanym koszcie.",
    },
    contributions: {
      h: "Najważniejsze wkłady",
      items: [
        {
          t: "Regulacja stanu wewnętrznego",
          d: "Zdefiniowany cykl homeostazy: baseline, decay, inercja oraz wpływ bodźców na stan PAD.",
        },
        {
          t: "Drives i priorytetyzacja",
          d: "Dynamiczne popędy motywacyjne, konflikt i arbitraż — zamiast stałych „celów w promptach”.",
        },
        {
          t: "Cognitive metabolism",
          d: "Budżet poznawczy i koszt akcji: agent nie odpala „ciała” (narzędzi) bez potrzeby.",
        },
        {
          t: "Pamięć i „sleep”",
          d: "Episody → narracja → aktualizacja modelu JA: spójność długich sesji bez trenowania LLM.",
        },
      ],
    },
    positioning: {
      h: "Pozycjonowanie względem MCP / ACP / A2A",
      p:
        "MCP/ACP/A2A porządkują kontekst i komunikację. HRP reguluje wnętrze instancji: kiedy działać, jak reagować i jak wracać do stabilnego baseline.",
      table: {
        col1: "Obszar",
        col2: "MCP / ACP / A2A",
        col3: "HRP",
        rows: [
          ["Cel", "kontekst + współpraca", "stan wewnętrzny + drives"],
          ["Ryzyko", "chaos narzędzi / integracji", "dryf, lock‑in, przeciążenie poznawcze"],
          ["Mechanika", "protokół komunikacji", "bio‑inspirowana pętla sprzężenia"],
          ["Korzyść", "interoperacyjność", "długotrwała stabilność i autonomia"],
        ],
      },
    },
    architecture: {
      h: "Architektura w skrócie",
      sub1: "1) Tick loop (życie instancji)",
      sub2: "2) Gdzie HRP „siedzi” w stosie",
      note:
        "Diagramy są uproszczone — pokazują przepływ kontroli i decyzji, nie detale implementacyjne.",
    },
    notes: {
      h: "Ciekawostki",
      items: [
        {
          t: "Appraisal to nie „emocje” — to funkcja znaczenia",
          d: "Ten sam bodziec może wywołać inną reakcję w zależności od aktywnych drive’ów i historii epizodów.",
        },
        {
          t: "Meta‑kontrola przełącza tryb myślenia",
          d: "Heurystyki w prostych sytuacjach, refleksja przy niepewności, safety‑gate przy ryzyku.",
        },
        {
          t: "Lock‑in motywacyjny da się mierzyć",
          d: "Jeśli jeden drive dominuje zbyt długo, spada adaptacja i rośnie koszt — HRP to wygasza.",
        },
        {
          t: "Provenance ≠ storytelling",
          d: "Episody zapisują „ślad” stanu i źródeł; narracja to konsolidacja, nie konfabulacja.",
        },
      ],
    },
    experiments: {
      h: "Ewaluacja",
      p:
        "Poniżej zestaw metryk, które dobrze oddają, czy HRP realnie stabilizuje agenta. To „laboratory‑friendly” checklist na iteracje.",
      items: [
        {
          t: "Stability / drift",
          d: "spójność odpowiedzi, powrót do baseline, odporność na szum bodźców",
        },
        {
          t: "Tool‑economy",
          d: "liczba wywołań narzędzi, czas w trybie „ciało”, koszt na zadanie",
        },
        {
          t: "Safety gating",
          d: "odsetek blokad, fałszywe pozytywy/negatywy, czas reakcji",
        },
        {
          t: "Narrative coherence",
          d: "zgodność autobiografii, stabilność preferencji, kontrola halucynacji",
        },
      ],
    },
    refs: {
      h: "Reference implementations",
      p:
        "Poniższe systemy traktujemy jako poligon wdrożeniowy do testów HRP — pokazują różne profile obciążenia i ryzyka.",
      cards: [
        {
          t: "V.E.S.P.E.R.",
          d: "Środowisko narzędziowe (tooling‑heavy): HRP steruje kosztem akcji i decyzją „czy odpalać ciało”.",
        },
        {
          t: "R.O.I.",
          d: "Środowisko operacyjne: priorytetyzacja, telemetria i kontrola dostępu w warunkach szumu informacyjnego.",
        },
        {
          t: "DOMINIKA",
          d: "Asystent długiej interakcji: spójność narracji, pamięć i stabilność zachowania w czasie.",
        },
      ],
    },
    docs: {
      h: "Dokumenty",
    
      mind: "MIND_OS / HRP — whitepaper (EN)",
      dtr: "V.E.S.P.E.R. — DTR (PL)",
      videoH: "Wideo",
    
      videoBtn: "Otwórz na YouTube",
      reg: "Regulamin",
    },
    contact: {
      h: "Kontakt",
      p:
        "Dwa kanały kontaktu, zależnie od tematu. Odpowiadamy selektywnie, ale konkretnie.",
      bizH: "Biznes / współpraca",
      bizD: "Partnerstwa, współpraca, inicjatywy komercyjne.",
      bizMail: "p.oleksiak@osintownia.pl",
      techH: "Techniczno‑badawcze",
      techD: "HRP, MIND_OS, architektura, eksperymenty i dokumentacja.",
      techMail: "antoni.czyz@outlook.com",
      li: "Profil na LinkedIn",
      footer:
        "© " + new Date().getFullYear() + " Reconica • HRP / MIND_OS",
    },
  },
  en: {
    docTitle: "HRP — Homeostatic Regulation Protocol (MIND_OS)",
    nav: {
      overview: "Overview",
      architecture: "Architecture",
      notes: "Notes",
      experiments: "Evaluation",
      refs: "Implementations",
      docs: "Docs",
      contact: "Contact",
      lang: "PL",
    },
    hero: {
      kTag: "MIND_OS • V.E.S.P.E.R. • HRP",
      h1a: "Homeostatic",
      h1b: "Regulation Protocol",
      lead:
        "HRP is an internal regulation layer for agents — it manages state, drives, and cognitive cost. It is not a communication protocol. Think of it as an “autonomic system” for long‑running entities.",
      ctaPrimary: "Read the whitepaper",
      ctaSecondary: "See the architecture",
      badges: [
        "homeostasis & stability",
        "metabolizm poznawczy",
        "layered decision making",
        "memory + consolidation (sleep)",
      ],
    },
    abstract: {
      h: "Abstract",
      p1:
        "In real agent systems, the core problem is not missing tools — it’s missing internal stabilization: narrative drift, tool overuse, motivational lock‑in, and oscillating control modes.",
      p2:
        "HRP describes cognitive homeostasis mechanics: stimuli → appraisal → state (PAD) and drives update → decision router (heuristics / reflection / meta‑control) → episodic memory → narrative consolidation. The goal is long‑term coherence at a controlled cost.",
    },
    contributions: {
      h: "Key contributions",
      items: [
        {
          t: "Internal state regulation",
          d: "A defined homeostatic cycle: baseline, decay, inertia, and PAD dynamics driven by appraisal.",
        },
        {
          t: "Drives & arbitration",
          d: "Dynamic motivational drives and conflict resolution — not static “goals in prompts”.",
        },
        {
          t: "Cognitive metabolism",
          d: "Cognitive budget and action cost: the agent should not invoke the “body” (tools) unnecessarily.",
        },
        {
          t: "Memory & “sleep”",
          d: "Episodes → narrative → self‑model updates: long‑session coherence without retraining the LLM.",
        },
      ],
    },
    positioning: {
      h: "Positioning vs MCP / ACP / A2A",
      p:
        "MCP/ACP/A2A standardize context and inter‑agent communication. HRP regulates the inside of an instance: when to act, how to react, and how to return to a stable baseline.",
      table: {
        col1: "Scope",
        col2: "MCP / ACP / A2A",
        col3: "HRP",
        rows: [
          ["Goal", "context + collaboration", "internal state + drives"],
          ["Main failure modes", "tool/integration chaos", "drift, lock‑in, cognitive overload"],
          ["Mechanics", "communication protocol", "biomimetic feedback loop"],
          ["Benefit", "interoperability", "long‑run stability and autonomy"],
        ],
      },
    },
    architecture: {
      h: "Architecture at a glance",
      sub1: "1) Tick loop (instance life cycle)",
      sub2: "2) Where HRP sits in the stack",
      note:
        "Diagrams are simplified — they show control flow and decision routing, not implementation details.",
    },
    notes: {
      h: "Research notes (quick facts)",
      items: [
        {
          t: "Appraisal is not “emotion” — it’s a meaning function",
          d: "The same stimulus can yield different reactions depending on active drives and episodic history.",
        },
        {
          t: "Meta‑control switches cognition modes",
          d: "Heuristics for easy cases, reflection under uncertainty, safety‑gate under risk.",
        },
        {
          t: "Motivational lock‑in is measurable",
          d: "If one drive dominates too long, adaptation drops and cost rises — HRP dampens it.",
        },
        {
          t: "Provenance ≠ storytelling",
          d: "Episodes store state traces and sources; narrative is consolidation, not confabulation.",
        },
      ],
    },
    experiments: {
      h: "Evaluation (metric proposals)",
      p:
        "A compact metric set that reveals whether HRP actually stabilizes an agent — a lab‑friendly checklist for iteration.",
      items: [
        { t: "Stability / drift", d: "coherence, baseline return, robustness to noisy inputs" },
        { t: "Tool‑economy", d: "tool calls, time in “body mode”, cost per task" },
        { t: "Safety gating", d: "block rate, false positives/negatives, response time" },
        { t: "Narrative coherence", d: "autobiography consistency, preference stability, hallucination control" },
      ],
    },
    refs: {
      h: "Reference implementations",
      p:
        "These systems act as deployment sandboxes for HRP — each represents a different risk and workload profile.",
      cards: [
        { t: "V.E.S.P.E.R.", d: "Tooling‑heavy environment: HRP controls action cost and “should we invoke the body?”." },
        { t: "R.O.I.", d: "Operational environment: prioritization, telemetry, access control under information noise." },
        { t: "SARA", d: "Long interaction assistant: narrative coherence, memory, long‑run behavioral stability." },
      ],
    },
    docs: {
      h: "Documents",
      p: "PDF references — ready to read, cite, and discuss.",
      mind: "MIND_OS / HRP — whitepaper (EN)",
      dtr: "V.E.S.P.E.R. — DTR (PL)",
      videoH: "Video",
      videoP: "A conceptual talk. For privacy: no YouTube embed — link only.",
      videoBtn: "Open on YouTube",
      reg: "Terms",
    },
    contact: {
      h: "Contact",
      p:
        "Two channels, depending on the topic. We respond selectively, but with substance.",
      bizH: "Business / collaboration",
      bizD: "Partnerships, collaboration, commercial initiatives.",
      bizMail: "p.oleksiak@osintownia.pl",
      techH: "Technical / research",
      techD: "HRP, MIND_OS, architecture, experiments, documentation.",
      techMail: "antoni.czyz@outlook.com",
      li: "LinkedIn profile",
      footer:
        "© " + new Date().getFullYear() + " Reconica • HRP / MIND_OS",
    },
  },
};

function Section({ id, title, children, kicker }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          {kicker && (
            <div className="mb-3 text-xs tracking-[0.2em] text-white/50">
              {kicker}
            </div>
          )}
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          <div className="mt-6">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}

function SoftCard({ title, desc, icon }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur">
      <div className="flex items-start gap-4">
        <div className="mt-1 h-9 w-9 rounded-xl border border-white/10 bg-white/[0.04] grid place-items-center text-white/80">
          {icon}
        </div>
        <div>
          <div className="text-base font-semibold text-white">{title}</div>
          <div className="mt-2 text-sm leading-relaxed text-white/70">
            {desc}
          </div>
        </div>
      </div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
      {children}
    </span>
  );
}


function DiagramTick({ lang }) {
  const L =
    lang === "pl"
      ? { title: "PĘTLA TICK", boxes: ["BODŹCE", "APPRAISAL", "STAN + DRIVES", "ROUTER DECYZJI", "AKCJA"], loop: "SPRZĘŻENIE / PAMIĘĆ" }
      : { title: "TICK LOOP", boxes: ["SENSE", "APPRAISAL", "STATE + DRIVES", "DECISION ROUTER", "ACTION"], loop: "FEEDBACK / MEMORY" };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5 overflow-hidden">
      <div className="text-xs tracking-[0.2em] text-white/50 mb-3">
        {L.title}
      </div>
      <svg viewBox="0 0 920 220" className="w-full h-auto">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>
        </defs>
        {[
          { x: 30, y: 70, w: 140, h: 70, t: L.boxes[0] },
          { x: 200, y: 70, w: 160, h: 70, t: L.boxes[1] },
          { x: 390, y: 70, w: 170, h: 70, t: L.boxes[2] },
          { x: 590, y: 70, w: 160, h: 70, t: L.boxes[3] },
          { x: 780, y: 70, w: 110, h: 70, t: L.boxes[4] },
        ].map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx="16"
              fill="url(#g1)"
              stroke="rgba(255,255,255,0.14)"
            />
            <text
              x={b.x + b.w / 2}
              y={b.y + b.h / 2 + 6}
              fill="rgba(255,255,255,0.9)"
              fontSize="14"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui"
              letterSpacing="2"
            >
              {b.t}
            </text>
          </g>
        ))}
        {[170, 360, 560, 750].map((x, i) => (
          <g key={i}>
            <line
              x1={x}
              y1={105}
              x2={x + 30}
              y2={105}
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="2"
            />
            <polygon
              points={`${x + 30},105 ${x + 22},99 ${x + 22},111`}
              fill="rgba(255,255,255,0.28)"
            />
          </g>
        ))}
        <path
          d="M 835 70 C 850 35, 880 35, 895 70"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 895 70 C 910 105, 910 140, 895 175"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 895 175 C 880 210, 850 210, 835 175"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M 835 175 C 820 140, 820 105, 835 70"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="2"
          fill="none"
        />
        <text
          x="865"
          y="205"
          fill="rgba(255,255,255,0.45)"
          fontSize="11"
          textAnchor="middle"
          fontFamily="ui-sans-serif, system-ui"
        >
          {L.loop}
        </text>
      </svg>
    </div>
  );
}
function DiagramStack({ lang }) {
  const labels =
    lang === "pl"
      ? ["Użytkownik / środowisko", "MCP / ACP / A2A", "Narzędzia / usługi", "HRP (wewnątrz instancji)", "Model (LLM)"]
      : ["User / environment", "MCP / ACP / A2A", "Tools / services", "HRP (inside instance)", "Model (LLM)"];

  return (
    <div className="rounded-2xl border border-white/10 bg-black/40 p-5 overflow-hidden">
      <div className="text-xs tracking-[0.2em] text-white/50 mb-3">
        STACK
      </div>
      <div className="grid gap-3">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={
              "rounded-xl border border-white/10 px-4 py-3 flex items-center justify-between " +
              (i === 3 ? "bg-white/[0.06]" : "bg-white/[0.03]")
            }
          >
            <div className="text-sm text-white/85 font-medium">{labels[i]}</div>
            {i === 3 && (
              <span className="text-xs text-white/60">
                PAD • drives • router • memory • sleep
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [lang, setLang] = useState("pl");
  const t = copy[lang];

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "pl" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.title = t.docTitle;
  }, [lang, t.docTitle]);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 120]);
  const glow = useTransform(scrollY, [0, 600], [0.85, 0.35]);

  const nav = t.nav;

  const navItems = useMemo(
    () => [
      { id: "overview", label: nav.overview },
      { id: "architecture", label: nav.architecture },
      { id: "notes", label: nav.notes },
      { id: "experiments", label: nav.experiments },
      { id: "refs", label: nav.refs },
      { id: "docs", label: nav.docs },
      { id: "contact", label: nav.contact },
    ],
    [nav]
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
      {/* background */}
      <motion.div
        style={{ y: bgY, opacity: glow }}
        className="pointer-events-none fixed inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.10),rgba(0,0,0,0.0)_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0.0)_60%)]" />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      </motion.div>

      {/* nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <a href="#overview" className="flex items-center gap-3">
            <img
              src={hrpLogo}
              alt="HRP"
              className="h-9 w-9 rounded-lg object-contain"
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">HRP</div>
              <div className="text-[11px] text-white/55">
                Homeostatic Regulation Protocol
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-sm text-white/70">
            {navItems.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                className="hover:text-white transition-colors"
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang((v) => (v === "pl" ? "en" : "pl"))}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/80 hover:bg-white/[0.06] transition"
              aria-label="Toggle language"
              title="Toggle language"
            >
              {nav.lang}
            </button>
            <a
              href={DOCS.mindOs}
              className="rounded-xl bg-white text-black px-4 py-2 text-xs font-semibold hover:opacity-90 transition"
              target="_blank"
              rel="noreferrer"
            >
              {lang === "pl" ? "PDF" : "PDF"}
            </a>
          </div>
        </div>
      </header>

      {/* hero */}
      <section id="overview" className="relative scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs tracking-[0.25em] text-white/55">
                {t.hero.kTag}
              </div>

              <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
                <span className="text-white">{t.hero.h1a}</span>{" "}
                <span className="text-white/70">{t.hero.h1b}</span>
              </h1>

              <p className="mt-6 text-base sm:text-lg leading-relaxed text-white/70 max-w-2xl">
                {t.hero.lead}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={DOCS.mindOs}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold hover:opacity-90 transition"
                >
                  {t.hero.ctaPrimary}
                </a>
                <a
                  href="#architecture"
                  className="rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] transition"
                >
                  {t.hero.ctaSecondary}
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {t.hero.badges.map((b, i) => (
                  <Pill key={i}>{b}</Pill>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="flex items-center justify-between">
                  <div className="text-xs tracking-[0.25em] text-white/55">
                    {lang === "pl" ? "SYGNAŁ HRP" : "HRP SIGNAL"}
                  </div>
                  <img
                    src={hrpLogoGold}
                    alt="HRP mark"
                    className="h-8 w-8 object-contain opacity-90"
                  />
                </div>

                <motion.div
                  className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5"
                  initial={{ opacity: 0.0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-sm font-semibold text-white">
                    {lang === "pl"
                      ? "Co HRP robi w jednym zdaniu"
                      : "HRP in one sentence"}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    {lang === "pl"
                      ? "Minimalizuje dryf i koszt, utrzymując spójne zachowanie agenta przez kontrolę stanu, popędów i trybu myślenia."
                      : "It reduces drift and cost by keeping agent behavior coherent via state, drives, and cognition-mode control."}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/65">
                    {(lang === "pl"
                      ? ["PAD: baseline + wygaszanie", "drives: arbitraż", "meta‑kontrola", "epizody → narracja"]
                      : ["PAD baseline + decay", "drives arbitration", "meta‑control", "episodic → narrative"]
                    ).map((x) => (
                      <div
                        key={x}
                        className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2"
                      >
                        {x}
                      </div>
                    ))}
                  </div>
                </motion.div>

                <div className="mt-6 text-xs text-white/55 leading-relaxed">
                  {lang === "pl"
                    ? "Uwaga: HRP to warstwa regulacji. Nie zastępuje protokołów komunikacji ani narzędzi — porządkuje ich użycie przez kontrolę wnętrza instancji."
                    : "Note: HRP is a regulation layer. It does not replace communication protocols or tools — it disciplines their usage by controlling the inside of an instance."}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Section id="abstract" title={t.abstract.h} kicker={lang==="pl" ? "PODSUMOWANIE" : "RESEARCH SUMMARY"}>
        <div className="max-w-4xl text-white/75 leading-relaxed space-y-4">
          <p>{t.abstract.p1}</p>
          <p>{t.abstract.p2}</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {t.contributions.items.map((it, i) => (
            <SoftCard
              key={i}
              title={it.t}
              desc={it.d}
              icon={
                <span className="text-sm font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </span>
              }
            />
          ))}
        </div>
      </Section>

      <Section
        id="positioning"
        title={t.positioning.h}
        kicker={lang==="pl" ? "POZYCJONOWANIE" : "STACK POSITIONING"}
      >
        <p className="max-w-4xl text-white/75 leading-relaxed">{t.positioning.p}</p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-3 bg-white/[0.03] text-xs text-white/70">
            <div className="px-4 py-3 border-r border-white/10">
              {t.positioning.table.col1}
            </div>
            <div className="px-4 py-3 border-r border-white/10">
              {t.positioning.table.col2}
            </div>
            <div className="px-4 py-3">{t.positioning.table.col3}</div>
          </div>
          {t.positioning.table.rows.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-3 text-sm text-white/80 bg-black/30"
            >
              <div className="px-4 py-3 border-t border-r border-white/10">
                {r[0]}
              </div>
              <div className="px-4 py-3 border-t border-r border-white/10 text-white/70">
                {r[1]}
              </div>
              <div className="px-4 py-3 border-t border-white/10">
                {r[2]}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="architecture" title={t.architecture.h} kicker={lang==="pl" ? "DIAGRAMY" : "DIAGRAMS"}>
        <div className="grid lg:grid-cols-2 gap-5">
          <div>
            <div className="text-sm font-semibold text-white mb-3">
              {t.architecture.sub1}
            </div>
            <DiagramTick lang={lang} />
          </div>
          <div>
            <div className="text-sm font-semibold text-white mb-3">
              {t.architecture.sub2}
            </div>
            <DiagramStack lang={lang} />
          </div>
        </div>

        <div className="mt-6 text-xs text-white/55">{t.architecture.note}</div>
      </Section>

      <Section id="notes" title={t.notes.h} kicker={lang==="pl" ? "NOTATKI" : "LAB NOTES"}>
        <div className="grid md:grid-cols-2 gap-4">
          {t.notes.items.map((it, i) => (
            <SoftCard
              key={i}
              title={it.t}
              desc={it.d}
              icon={<span className="text-sm">✦</span>}
            />
          ))}
        </div>
      </Section>

      <Section id="experiments" title={t.experiments.h} kicker={lang==="pl" ? "METRYKI" : "METRICS"}>
        <p className="max-w-4xl text-white/75 leading-relaxed">{t.experiments.p}</p>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {t.experiments.items.map((it, i) => (
            <SoftCard
              key={i}
              title={it.t}
              desc={it.d}
              icon={<span className="text-sm font-semibold">M</span>}
            />
          ))}
        </div>
      </Section>

      <Section id="refs" title={t.refs.h} kicker={lang==="pl" ? "WDROŻENIA" : "FIELD DEPLOYMENTS"}>
        <p className="max-w-4xl text-white/75 leading-relaxed">{t.refs.p}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {t.refs.cards.map((c, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
            >
              <div className="text-base font-semibold text-white">{c.t}</div>
              <div className="mt-2 text-sm leading-relaxed text-white/70">
                {c.d}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="docs" title={t.docs.h} kicker={lang==="pl" ? "PDF / LINKI" : "PDF / LINKS"}>
        <p className="max-w-4xl text-white/75 leading-relaxed">{t.docs.p}</p>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <a
            href={DOCS.mindOs}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition"
          >
            <div className="text-sm font-semibold text-white group-hover:text-white">
              {t.docs.mind}
            </div>
            <div className="mt-2 text-xs text-white/60">
              PDF • {lang === "pl" ? "otwórz w nowej karcie" : "open in new tab"}
            </div>
          </a>

          <a
            href={DOCS.vesperDtr}
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition"
          >
            <div className="text-sm font-semibold text-white">
              {t.docs.dtr}
            </div>
            <div className="mt-2 text-xs text-white/60">
              PDF • {lang === "pl" ? "otwórz w nowej karcie" : "open in new tab"}
            </div>
          </a>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-black/30 p-6">
          <div className="text-base font-semibold text-white">{t.docs.videoH}</div>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            {t.docs.videoP}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={YT_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold hover:opacity-90 transition"
            >
              {t.docs.videoBtn}
            </a>
            <a
              href="/regulamin.html"
              className="rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] transition"
            >
              {t.docs.reg}
            </a>
          </div>
        </div>
      </Section>

      <Section id="contact" title={t.contact.h} kicker={lang==="pl" ? "KONTAKT" : "REACH OUT"}>
        <p className="max-w-4xl text-white/75 leading-relaxed">{t.contact.p}</p>

        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <div className="text-base font-semibold text-white">{t.contact.bizH}</div>
            <div className="mt-2 text-sm text-white/70">{t.contact.bizD}</div>
            <a
              href={`mailto:${t.contact.bizMail}`}
              className="mt-4 inline-flex rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
            >
              {t.contact.bizMail}
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <div className="text-base font-semibold text-white">{t.contact.techH}</div>
            <div className="mt-2 text-sm text-white/70">{t.contact.techD}</div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={`mailto:${t.contact.techMail}`}
                className="inline-flex rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
              >
                {t.contact.techMail}
              </a>
              <a
                href="https://www.linkedin.com/in/tony-czyz-575371ba/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/[0.06] transition"
              >
                {t.contact.li}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-white/50">
          {t.contact.footer}
        </div>
      </Section>
    </div>
  );
}

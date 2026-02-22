import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import hrpLogoWhite from "./assets/HRP_logo_white.png";
import hrpLogoGold from "./assets/HRP_logo_gold.png";
import hrpLogoBack from "./assets/HRP_LOGO_back.png";

const STORAGE_KEY = "reconica_lang";

const YT_URL = "https://www.youtube.com/watch?v=yqasKddWLLg";
const LINKEDIN_URL = "https://www.linkedin.com/in/tony-czyz-575371ba/";

const DOCS = {
  mindOs: "/docs/MIND_OS_referat_rozbudowany_FULL_v31 EN.pdf",
  vesperDtr: "/docs/VESPER_DTR_Dokumentacja_v1.2_NAUKOWA_20p_PLUS.pdf",
};

const copy = {
  pl: {
    docTitle: "HRP — Homeostatic Regulation Protocol (MIND_OS)",
    nav: {
      overview: "Start",
      architecture: "Architektura",
      notes: "Notatki",
      experiments: "Ewaluacja",
      refs: "Implementacje",
      docs: "Dokumenty",
      contact: "Kontakt",
      lang: "EN",
    },
    hero: {
      kTag: "MIND_OS • V.E.S.P.E.R. • HRP",
      h1: "Homeostatic Regulation Protocol",
      lead:
        "HRP to warstwa regulacji wewnętrznej instancji — zarządza stanem (PAD), popędami (drives) i kosztem poznawczym. To nie jest protokół komunikacji. To mechanizm stabilizacji i autonomii dla długotrwałych „bytów”.",
      ctaPrimary: "Czytaj whitepaper",
      ctaSecondary: "Zobacz architekturę",
      pills: [
        "homeostaza i stabilność",
        "metabolizm poznawczy",
        "warstwowa decyzyjność",
        "pamięć + konsolidacja (sen)",
      ],
      status: {
        kicker: "STATUS BADAŃ",
        title: "Projekt badawczy",
        bullets: [
          "Docelowo wszystkie funkcje opisane w dokumentach mają zostać spełnione (pełna architektura HRP / MIND_OS).",
          "Obecnie rozwój jest iteracyjny: najpierw rdzeń regulacji, potem dopinanie infrastruktury i narzędzi.",
          "Gdy wersja bazowa będzie gotowa, udostępnimy ją publicznie jako repozytorium na GitHubie.",
        ],
      },
      current: {
        kicker: "AKTUALNE BADANIA",
        nowTitle: "Wpływ bodźców newsowych na „byty”",
        nowText:
          "Trwają badania nad wpływem newsów z kraju i ze świata na stabilność instancji: zmiany PAD/drives, dryf narracji, decyzje i koszt poznawczy.",
        nextTitle: "Kolejne fazy (infrastruktura później)",
        nextText:
          "Dopiero po ustabilizowaniu rdzenia HRP będziemy podłączać kolejną infrastrukturę, kanały bodźców i narzędzia, aby rozszerzyć badania terenowe.",
      },
      definition: {
        kicker: "DEFINICJA",
        title: "HRP w jednym zdaniu",
        text:
          "Stabilizuje zachowanie długotrwałej instancji przez regulację stanu (PAD), popędów (drives) i wyboru trybu decyzyjnego — przy kontrolowanym koszcie.",
        chips: [
          "PAD: baseline + wygaszanie",
          "drives: arbitraż",
          "meta‑kontrola",
          "epizody → narracja",
        ],
        foot:
          "Uwaga: HRP nie zastępuje protokołów komunikacji ani narzędzi — porządkuje ich użycie przez kontrolę wnętrza instancji.",
      },
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
          t: "Metabolizm poznawczy",
          d: "Budżet poznawczy i koszt akcji: instancja nie odpala „ciała” (narzędzi) bez potrzeby.",
        },
        {
          t: "Pamięć i „sen”",
          d: "Episody → narracja → aktualizacja modelu JA: spójność długich sesji bez trenowania LLM.",
        },
      ],
    },
    architecture: {
      h: "Architektura",
      sub1: "1) Tick loop (życie instancji)",
      sub2: "2) Gdzie HRP „siedzi” w stosie",
      tickDesc:
        "Tick to minimalny cykl życia instancji: pobranie bodźców → appraisal (znaczenie) → aktualizacja PAD/drives → wybór trybu (heurystyki / refleksja / meta‑kontrola) → akcja → zapis epizodu. Stabilność wynika z decay/inercji i powrotu do baseline.",
      stackDesc:
        "HRP działa wewnątrz instancji (obok LLM) i reguluje użycie narzędzi/usług. MCP/ACP/A2A porządkują kontekst i współpracę, a HRP dotyczy tego, co dzieje się „w środku”: stan, priorytety, koszt i tryb decyzyjny.",
      legendTitle: "Legenda",
      legend: [
        ["Bodźce", "wejścia z otoczenia (np. newsy, zdarzenia, użytkownik)."],
        ["Appraisal", "ocena znaczenia bodźca względem drives/celów (nie „emocje”)."],
        ["PAD", "stan (pleasure–arousal–dominance) z baseline/decay/inercją."],
        ["Drives", "zmienne motywacyjne + arbitraż priorytetów."],
        ["Router decyzji", "przełącza tryb: heurystyki / refleksja / meta‑kontrola / safety."],
        ["Sen", "konsolidacja: epizody → narracja → aktualizacja modelu JA."],
      ],
      note:
        "Diagramy są uproszczone — pokazują przepływ kontroli i decyzji, nie detale implementacyjne.",
    },
    notes: {
      h: "Notatki badawcze",
      items: [
        {
          t: "Appraisal to funkcja znaczenia, nie „emocje”",
          d: "Ten sam bodziec może dać inną reakcję w zależności od aktywnych drive’ów i historii epizodów.",
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
          d: "Episody zapisują ślad stanu i źródeł; narracja to konsolidacja, nie konfabulacja.",
        },
      ],
    },
    experiments: {
      h: "Ewaluacja",
      p:
        "Metryki, które najlepiej pokazują, czy HRP realnie stabilizuje instancję w długim czasie:",
      items: [
        { t: "Stability / drift", d: "spójność, powrót do baseline, odporność na szum bodźców" },
        { t: "Tool‑economy", d: "liczba wywołań narzędzi, czas w trybie „ciało”, koszt na zadanie" },
        { t: "Safety gating", d: "blokady, fałszywe trafienia, czas reakcji" },
        { t: "Narrative coherence", d: "spójność autobiografii, stabilność preferencji, kontrola halucynacji" },
      ],
    },
    refs: {
      h: "Implementacje referencyjne",
      p:
        "Poniższe systemy traktujemy jako poligon wdrożeniowy do testów HRP — różne profile obciążenia i ryzyka:",
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
          t: "SARA",
          d: "Asystent długiej interakcji: spójność narracji, pamięć i stabilność zachowania w czasie.",
        },
      ],
    },
    docs: {
      h: "Dokumenty",

      mind: "MIND_OS / HRP — whitepaper (EN)",
      dtr: "V.E.S.P.E.R. — DTR (PL)",
      videoH: "Wideo",
      videoP:
        "Materiał koncepcyjny. Dla prywatności: link, bez osadzania odtwarzacza.",
      videoBtn: "Otwórz na YouTube",
      reg: "Regulamin",
    },
    contact: {
      h: "Kontakt",
      p: "Wybierz kanał w zależności od tematu:",
      bizH: "Biznes / współpraca",
      bizD: "Partnerstwa, współpraca, inicjatywy komercyjne.",
      bizMail: "p.oleksiak@osintownia.pl",
      techH: "Techniczno‑badawcze",
      techD: "HRP, MIND_OS, architektura, eksperymenty i dokumentacja.",
      techMail: "antoni.czyz@outlook.com",
      li: "LinkedIn",
      footer: `© ${new Date().getFullYear()} Reconica • HRP / MIND_OS`,
    },
  },

  en: {
    docTitle: "HRP — Homeostatic Regulation Protocol (MIND_OS)",
    nav: {
      overview: "Start",
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
      h1: "Homeostatic Regulation Protocol",
      lead:
        "HRP is an internal regulation layer for long‑running entities — it manages state (PAD), drives, and cognitive cost. It is not a communication protocol. It’s a stabilization and autonomy mechanism for persistent ‘beings’.",
      ctaPrimary: "Read the whitepaper",
      ctaSecondary: "See the architecture",
      pills: [
        "homeostasis & stability",
        "cognitive metabolism",
        "layered decision making",
        "memory + consolidation (sleep)",
      ],
      status: {
        kicker: "RESEARCH STATUS",
        title: "Research project (in active development)",
        bullets: [
          "The goal is to implement the full HRP / MIND_OS feature set described in the documents.",
          "Development is iterative: stabilize the regulation core first, then connect infrastructure and tools.",
          "Once the baseline is ready, we will publish it as a GitHub repository.",
        ],
      },
      current: {
        kicker: "CURRENT STUDY",
        nowTitle: "News stimuli impact on long‑running entities",
        nowText:
          "We study how national and global news streams affect entity stability: PAD/drives changes, narrative drift, decisions, and cognitive cost.",
        nextTitle: "Next phases (infrastructure later)",
        nextText:
          "Only after the HRP core is stable we will connect more infrastructure, stimulus channels, and tools to expand field studies.",
      },
      definition: {
        kicker: "DEFINITION",
        title: "HRP in one sentence",
        text:
          "It stabilizes a long‑running entity by regulating state (PAD), drives, and decision‑mode selection — at a controlled cost.",
        chips: [
          "PAD baseline + decay",
          "drives arbitration",
          "meta‑control",
          "episodes → narrative",
        ],
        foot:
          "Note: HRP does not replace communication protocols or tools — it disciplines their use by controlling the inside of an instance.",
      },
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
          d: "Dynamic motivational drives and conflict resolution — not static ‘goals in prompts’.",
        },
        {
          t: "Cognitive metabolism",
          d: "Cognitive budget and action cost: the entity should not invoke tools unnecessarily.",
        },
        {
          t: "Memory & ‘sleep’",
          d: "Episodes → narrative → self‑model updates: long‑session coherence without retraining the LLM.",
        },
      ],
    },
    architecture: {
      h: "Architecture",
      sub1: "1) Tick loop (instance life cycle)",
      sub2: "2) Where HRP sits in the stack",
      tickDesc:
        "A tick is the minimal life cycle: ingest stimuli → appraisal (meaning) → update PAD/drives → choose mode (heuristics / reflection / meta‑control) → act → store an episode. Stability comes from decay/inertia and a return to baseline.",
      stackDesc:
        "HRP runs inside the instance (alongside the LLM) and regulates tool/service usage. MCP/ACP/A2A standardize context and collaboration; HRP controls what happens inside: state, priorities, cost, and decision mode.",
      legendTitle: "Legend",
      legend: [
        ["Stimuli", "inputs from the environment (e.g., news, events, user)."],
        ["Appraisal", "meaning evaluation relative to drives/goals (not ‘emotion’)."],
        ["PAD", "state (pleasure–arousal–dominance) with baseline/decay/inertia."],
        ["Drives", "motivational variables + priority arbitration."],
        ["Decision router", "switches mode: heuristics / reflection / meta‑control / safety."],
        ["Sleep", "consolidation: episodes → narrative → self‑model updates."],
      ],
      note:
        "Diagrams are simplified — they show control flow and decision routing, not implementation details.",
    },
    notes: {
      h: "Research notes",
      items: [
        {
          t: "Appraisal is a meaning function, not ‘emotion’",
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
      h: "Evaluation",
      p:
        "A compact metric set that reveals whether HRP actually stabilizes an entity over time:",
      items: [
        { t: "Stability / drift", d: "coherence, baseline return, robustness to noisy inputs" },
        { t: "Tool‑economy", d: "tool calls, time in ‘body mode’, cost per task" },
        { t: "Safety gating", d: "block rate, false positives/negatives, response time" },
        { t: "Narrative coherence", d: "autobiography consistency, preference stability, hallucination control" },
      ],
    },
    refs: {
      h: "Reference implementations",
      p:
        "We use these systems as deployment sandboxes for HRP — different workload and risk profiles:",
      cards: [
        { t: "V.E.S.P.E.R.", d: "Tooling‑heavy: HRP controls action cost and whether to invoke tools." },
        { t: "R.O.I.", d: "Operational: prioritization, telemetry, access control under information noise." },
        { t: "SARA", d: "Long interaction: narrative coherence, memory, long‑run behavioral stability." },
      ],
    },
    docs: {
      h: "Documents",
      p: "PDF references + video (no YouTube embed):",
      mind: "MIND_OS / HRP — whitepaper (EN)",
      dtr: "V.E.S.P.E.R. — DTR (PL)",
      videoH: "Video",
      videoP: "A conceptual talk. Privacy‑first: link only.",
      videoBtn: "Open on YouTube",
      reg: "Terms",
    },
    contact: {
      h: "Contact",
      p: "Choose a channel depending on the topic:",
      bizH: "Business / collaboration",
      bizD: "Partnerships, collaboration, commercial initiatives.",
      bizMail: "p.oleksiak@osintownia.pl",
      techH: "Technical / research",
      techD: "HRP, MIND_OS, architecture, experiments, documentation.",
      techMail: "antoni.czyz@outlook.com",
      li: "LinkedIn",
      footer: `© ${new Date().getFullYear()} Reconica • HRP / MIND_OS`,
    },
  },
};

function clsx(...xs) {
  return xs.filter(Boolean).join(" ");
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
      {children}
    </span>
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
          <div className="mt-2 text-sm leading-relaxed text-white/70">{desc}</div>
        </div>
      </div>
    </div>
  );
}

function Section({ id, title, kicker, children }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
        >
          {kicker && (
            <div className="mb-3 text-xs tracking-[0.2em] text-white/50">{kicker}</div>
          )}
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          <div className="mt-7">{children}</div>
        </motion.div>
      </div>
    </section>
  );
}

function FigureCard({ title, children, footer }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-black/35 p-6 overflow-hidden relative">
      <div className="text-sm font-semibold text-white mb-3">{title}</div>
      {children}
      {footer && <div className="mt-4 text-sm text-white/70 leading-relaxed">{footer}</div>}
    </div>
  );
}

function TickFigure({ lang }) {
  const L =
    lang === "pl"
      ? {
          title: "PĘTLA TICK",
          boxes: ["BODŹCE", "APPRAISAL", "STAN + DRIVES", "ROUTER", "AKCJA"],
          loop: "SPRZĘŻENIE / PAMIĘĆ",
        }
      : {
          title: "TICK LOOP",
          boxes: ["STIMULI", "APPRAISAL", "STATE + DRIVES", "ROUTER", "ACTION"],
          loop: "FEEDBACK / MEMORY",
        };

  return (
    <div className="rounded-2xl border border-white/10 bg-black/45 p-5">
      <div className="text-xs tracking-[0.25em] text-white/50 mb-3">{L.title}</div>
      <svg viewBox="0 0 980 250" className="w-full h-auto">
        <defs>
          <linearGradient id="card" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.16)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>
          <linearGradient id="flow" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="0.5" stopColor="rgba(255,255,255,0.70)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[
          { x: 40, y: 92, w: 160, h: 70, t: L.boxes[0] },
          { x: 230, y: 92, w: 170, h: 70, t: L.boxes[1] },
          { x: 430, y: 92, w: 190, h: 70, t: L.boxes[2] },
          { x: 650, y: 92, w: 150, h: 70, t: L.boxes[3] },
          { x: 830, y: 92, w: 110, h: 70, t: L.boxes[4] },
        ].map((b, i) => (
          <g key={i}>
            <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="18" fill="url(#card)" stroke="rgba(255,255,255,0.15)" />
            <text
              x={b.x + b.w / 2}
              y={b.y + b.h / 2 + 5}
              fill="rgba(255,255,255,0.92)"
              fontSize="13"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui"
              letterSpacing="2"
            >
              {b.t}
            </text>
          </g>
        ))}

        {/* animated flow segments */}
        {[
          { d: "M 200 127 L 230 127", delay: 0 },
          { d: "M 400 127 L 430 127", delay: 0.1 },
          { d: "M 620 127 L 650 127", delay: 0.2 },
          { d: "M 800 127 L 830 127", delay: 0.3 },
        ].map((s, idx) => (
          <motion.path
            key={idx}
            d={s.d}
            stroke="url(#flow)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="10 10"
            animate={{ strokeDashoffset: [0, -40] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: s.delay }}
            filter="url(#glow)"
          />
        ))}

        {/* feedback loop */}
        <motion.path
          d="M 900 92 C 948 52, 964 82, 952 124 C 942 160, 926 202, 884 198 C 852 196, 842 176, 852 152"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 10"
          animate={{ strokeDashoffset: [0, -60] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        />
        <text x="890" y="226" fill="rgba(255,255,255,0.45)" fontSize="11" textAnchor="middle" fontFamily="ui-sans-serif, system-ui">
          {L.loop}
        </text>
      </svg>
    </div>
  );
}

function StackFigure({ lang }) {
  const labels =
    lang === "pl"
      ? [
          "Użytkownik / środowisko",
          "MCP / ACP / A2A",
          "Narzędzia / usługi",
          "HRP (wewnątrz instancji)",
          "Model (LLM)",
        ]
      : [
          "User / environment",
          "MCP / ACP / A2A",
          "Tools / services",
          "HRP (inside instance)",
          "Model (LLM)",
        ];

  return (
    <div className="rounded-2xl border border-white/10 bg-black/45 p-5 relative overflow-hidden">
      <div className="text-xs tracking-[0.25em] text-white/50 mb-3">STACK</div>
      <div className="grid gap-3 relative z-10">
        {labels.map((label, i) => (
          <div
            key={label}
            className={clsx(
              "rounded-xl border border-white/10 px-4 py-3 flex items-center justify-between",
              i === 3 ? "bg-white/[0.06]" : "bg-white/[0.03]"
            )}
          >
            <div className="text-sm text-white/85 font-medium">{label}</div>
            {i === 3 && (
              <motion.span
                className="text-xs text-white/60"
                animate={{ opacity: [0.6, 0.95, 0.6] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              >
                PAD • drives • router • memory • sleep
              </motion.span>
            )}
          </div>
        ))}
      </div>

      {/* soft pulse behind HRP row */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0 z-0"
        style={{ top: "152px" }}
        animate={{ opacity: [0.0, 0.28, 0.0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="mx-4 h-10 rounded-xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.16),rgba(0,0,0,0.0)_65%)]" />
      </motion.div>
    </div>
  );
}

function Background() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 140]);
  const opacity = useTransform(scrollY, [0, 700], [0.85, 0.35]);

  return (
    <motion.div style={{ y, opacity }} className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.12),rgba(0,0,0,0.0)_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),rgba(0,0,0,0.0)_62%)]" />
      <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
    </motion.div>
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

  const navItems = useMemo(
    () => [
      { id: "overview", label: t.nav.overview },
      { id: "architecture", label: t.nav.architecture },
      { id: "notes", label: t.nav.notes },
      { id: "experiments", label: t.nav.experiments },
      { id: "refs", label: t.nav.refs },
      { id: "docs", label: t.nav.docs },
      { id: "contact", label: t.nav.contact },
    ],
    [t]
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white">
      <Background />

      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between gap-4">
          <a href="#overview" className="flex items-center gap-3">
            <img src={hrpLogoWhite} alt="HRP" className="h-9 w-9 rounded-lg object-contain" />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-wide">HRP</div>
              <div className="text-[11px] text-white/55">Homeostatic Regulation Protocol</div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-sm text-white/70">
            {navItems.map((it) => (
              <a key={it.id} href={`#${it.id}`} className="hover:text-white transition-colors">
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
              {t.nav.lang}
            </button>
            <a
              href={DOCS.mindOs}
              className="rounded-xl bg-white text-black px-4 py-2 text-xs font-semibold hover:opacity-90 transition"
              target="_blank"
              rel="noreferrer"
            >
              PDF
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="overview" className="relative scroll-mt-28">
        <div className="mx-auto max-w-7xl px-6 pt-14 pb-10 relative">
          {/* large watermark (fills right side on wide screens) */}
          <motion.img
            src={hrpLogoBack}
            alt=""
            aria-hidden="true"
            className="pointer-events-none hidden xl:block absolute -right-24 top-6 w-[820px] opacity-[0.13]"
            animate={{ opacity: [0.10, 0.16, 0.10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* left */}
            <motion.div
              className="lg:col-span-7"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-xs tracking-[0.25em] text-white/55">{t.hero.kTag}</div>

              <div className="mt-4 flex items-start gap-5">
                <motion.img
                  src={hrpLogoGold}
                  alt="HRP"
                  className="h-20 w-20 sm:h-24 sm:w-24 object-contain shrink-0"
                  animate={{ opacity: [0.75, 1, 0.75], scale: [1, 1.03, 1], rotate: [0, 0.4, 0] }}
                  transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.03]">
                  {t.hero.h1}
                </h1>
              </div>

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
                {t.hero.pills.map((p) => (
                  <Pill key={p}>{p}</Pill>
                ))}
              </div>

              {/* cards row (tasteful, aligned) */}
              <div className="mt-10 grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
                  <div className="text-xs tracking-[0.25em] text-white/55">{t.hero.status.kicker}</div>
                  <div className="mt-2 text-base font-semibold text-white">{t.hero.status.title}</div>
                  <ul className="mt-3 space-y-2 text-sm text-white/70 leading-relaxed list-disc pl-5">
                    {t.hero.status.bullets.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                  <div className="text-xs tracking-[0.25em] text-white/55">{t.hero.current.kicker}</div>
                  <div className="mt-3">
                    <div className="text-sm font-semibold text-white">{t.hero.current.nowTitle}</div>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{t.hero.current.nowText}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-sm font-semibold text-white">{t.hero.current.nextTitle}</div>
                    <p className="mt-2 text-sm text-white/70 leading-relaxed">{t.hero.current.nextText}</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                  <div className="text-xs tracking-[0.25em] text-white/55">
                    {lang === "pl" ? "SZYBKIE LINKI" : "QUICK LINKS"}
                  </div>
                  <div className="mt-4 grid gap-3">
                    <a
                      href={DOCS.mindOs}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] transition"
                    >
                      {lang === "pl" ? "Whitepaper (PDF)" : "Whitepaper (PDF)"}
                    </a>
                    <a
                      href="#architecture"
                      className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] transition"
                    >
                      {lang === "pl" ? "Diagramy i legenda" : "Diagrams & legend"}
                    </a>
                    <a
                      href={YT_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] transition"
                    >
                      {lang === "pl" ? "Wideo (YouTube)" : "Video (YouTube)"}
                    </a>
                  </div>
                  <div className="mt-4 text-xs text-white/55 leading-relaxed">
                    {lang === "pl"
                      ? "YouTube nie jest osadzany na stronie (privacy‑first)."
                      : "YouTube is not embedded (privacy‑first)."}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* right */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                <div className="flex items-center justify-between">
                  <div className="text-xs tracking-[0.25em] text-white/55">{t.hero.definition.kicker}</div>
                  <img src={hrpLogoWhite} alt="HRP" className="h-8 w-8 object-contain opacity-90" />
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-5">
                  <div className="text-sm font-semibold text-white">{t.hero.definition.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{t.hero.definition.text}</p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-white/65">
                    {t.hero.definition.chips.map((x) => (
                      <div key={x} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
                        {x}
                      </div>
                    ))}
                  </div>
                </div>

                {/* visually stronger, non-amateur diagram in hero */}
                <div className="mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                  <div className="text-xs tracking-[0.25em] text-white/55">
                    {lang === "pl" ? "PRZEPŁYW (WIZUALIZACJA)" : "FLOW (VISUAL)"}
                  </div>
                  <div className="mt-3">
                    <TickFigure lang={lang} />
                  </div>
                </div>

                <div className="mt-6 text-xs text-white/55 leading-relaxed">{t.hero.definition.foot}</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Section id="abstract" title={t.abstract.h} kicker={lang === "pl" ? "PODSUMOWANIE" : "SUMMARY"}>
        <div className="max-w-4xl text-white/75 leading-relaxed space-y-4">
          <p>{t.abstract.p1}</p>
          <p>{t.abstract.p2}</p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {t.contributions.items.map((it, i) => (
            <SoftCard key={it.t} title={it.t} desc={it.d} icon={<span className="text-sm font-semibold">{String(i + 1).padStart(2, "0")}</span>} />
          ))}
        </div>
      </Section>

      <Section id="architecture" title={t.architecture.h} kicker={lang === "pl" ? "DIAGRAMY" : "DIAGRAMS"}>
        <div className="grid lg:grid-cols-2 gap-5">
          <FigureCard title={t.architecture.sub1} footer={t.architecture.tickDesc}>
            <TickFigure lang={lang} />
          </FigureCard>

          <FigureCard title={t.architecture.sub2} footer={t.architecture.stackDesc}>
            <StackFigure lang={lang} />
          </FigureCard>
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="text-sm font-semibold text-white">{t.architecture.legendTitle}</div>
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            {t.architecture.legend.map(([k, v]) => (
              <div key={k} className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                <div className="text-xs tracking-[0.2em] text-white/55">{k}</div>
                <div className="mt-2 text-sm text-white/75 leading-relaxed">{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-xs text-white/55">{t.architecture.note}</div>
        </div>
      </Section>

      <Section id="notes" title={t.notes.h} kicker={lang === "pl" ? "NOTATKI" : "NOTES"}>
        <div className="grid md:grid-cols-2 gap-4">
          {t.notes.items.map((it) => (
            <SoftCard key={it.t} title={it.t} desc={it.d} icon={<span className="text-sm">✦</span>} />
          ))}
        </div>
      </Section>

      <Section id="experiments" title={t.experiments.h} kicker={lang === "pl" ? "METRYKI" : "METRICS"}>
        <p className="max-w-4xl text-white/75 leading-relaxed">{t.experiments.p}</p>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {t.experiments.items.map((it) => (
            <SoftCard key={it.t} title={it.t} desc={it.d} icon={<span className="text-sm font-semibold">M</span>} />
          ))}
        </div>
      </Section>

      <Section id="refs" title={t.refs.h} kicker={lang === "pl" ? "WDROŻENIA" : "DEPLOYMENTS"}>
        <p className="max-w-4xl text-white/75 leading-relaxed">{t.refs.p}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {t.refs.cards.map((c) => (
            <div key={c.t} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="text-base font-semibold text-white">{c.t}</div>
              <div className="mt-2 text-sm leading-relaxed text-white/70">{c.d}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="docs" title={t.docs.h} kicker={lang === "pl" ? "PDF / LINKI" : "PDF / LINKS"}>
        <p className="max-w-4xl text-white/75 leading-relaxed">{t.docs.p}</p>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <a href={DOCS.mindOs} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition">
            <div className="text-sm font-semibold text-white">{t.docs.mind}</div>
            <div className="mt-2 text-xs text-white/60">PDF</div>
          </a>
          <a href={DOCS.vesperDtr} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition">
            <div className="text-sm font-semibold text-white">{t.docs.dtr}</div>
            <div className="mt-2 text-xs text-white/60">PDF</div>
          </a>
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-black/30 p-6">
          <div className="text-base font-semibold text-white">{t.docs.videoH}</div>
          <p className="mt-2 text-sm leading-relaxed text-white/70">{t.docs.videoP}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={YT_URL} target="_blank" rel="noreferrer" className="rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold hover:opacity-90 transition">
              {t.docs.videoBtn}
            </a>
            <a href="/regulamin.html" className="rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/85 hover:bg-white/[0.06] transition">
              {t.docs.reg}
            </a>
          </div>
        </div>
      </Section>

      <Section id="contact" title={t.contact.h} kicker={lang === "pl" ? "KONTAKT" : "CONTACT"}>
        <p className="max-w-4xl text-white/75 leading-relaxed">{t.contact.p}</p>

        <div className="mt-8 grid lg:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <div className="text-base font-semibold text-white">{t.contact.bizH}</div>
            <div className="mt-2 text-sm text-white/70">{t.contact.bizD}</div>
            <a href={`mailto:${t.contact.bizMail}`} className="mt-4 inline-flex rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90 transition">
              {t.contact.bizMail}
            </a>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur">
            <div className="text-base font-semibold text-white">{t.contact.techH}</div>
            <div className="mt-2 text-sm text-white/70">{t.contact.techD}</div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={`mailto:${t.contact.techMail}`} className="inline-flex rounded-xl bg-white text-black px-4 py-2 text-sm font-semibold hover:opacity-90 transition">
                {t.contact.techMail}
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="inline-flex rounded-xl border border-white/12 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/[0.06] transition">
                {t.contact.li}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-xs text-white/50">{t.contact.footer}</div>
      </Section>
    </div>
  );
}

/**
 * International Business — Module 4 signature scenes (GOVERNANCE).
 *
 * Visual grammar: REGULATE → NEGOTIATE → INTEGRATE → GOVERN
 * Motion lives in ibChapter4.css. Frozen V7 engine untouched.
 * Do NOT import from scenes.jsx / scenes2.jsx / scenes3.jsx.
 */

import {
  WorldMap, MapMarker, MapPulse, MARKETS, project,
} from './worldmap'

const { usa, india, china, germany, singapore, brazil, japan, europe, uk, uae } = MARKETS

/* ── Local teaching coordinates (not in shared MARKETS) ──────────────────── */
const canada      = { lon: -106, lat:  56,   name: 'Canada' }
const mexico      = { lon: -102, lat:  23,   name: 'Mexico' }
const russia      = { lon:   90, lat:  60,   name: 'Russia' }
const southAfrica = { lon:   25, lat: -29,   name: 'South Africa' }
const indonesia   = { lon:  118, lat:  -2,   name: 'Indonesia' }
const thailand    = { lon:  101, lat:  15,   name: 'Thailand' }
const vietnam     = { lon:  106, lat:  16,   name: 'Vietnam' }
const pakistan    = { lon:   69, lat:  30,   name: 'Pakistan' }
const bangladesh  = { lon:   90, lat:  24,   name: 'Bangladesh' }
const nepal       = { lon:   84, lat:  28,   name: 'Nepal' }
const sriLanka    = { lon:   81, lat:   7.5, name: 'Sri Lanka' }
const egypt       = { lon:   31, lat:  27,   name: 'Egypt' }
const iran        = { lon:   53, lat:  32,   name: 'Iran' }
const ethiopia    = { lon:   40, lat:   9,   name: 'Ethiopia' }

/* ── Shared data ──────────────────────────────────────────────────────────── */
const GOVERNANCE_PATH = ['Regulate', 'Negotiate', 'Integrate', 'Govern']

const INSTITUTIONS = [
  { id: 'wto',   label: 'WTO',        sub: 'Trade rules' },
  { id: 'imf',   label: 'IMF',        sub: 'Monetary stability' },
  { id: 'unctad',label: 'UNCTAD',     sub: 'Development' },
  { id: 'wb',    label: 'World Bank', sub: 'Development finance' },
]

/* ============================================================ OPENER ===== */
/**
 * GovernanceOpener — full-bleed world map with faint routes;
 * institutional labels appear in sequence; eyebrow / h1 / sub / hint / path.
 */
export function GovernanceOpener({ module = 4 }) {
  const routes = [
    { from: [india.lon, india.lat],   to: [germany.lon, germany.lat] },
    { from: [china.lon, china.lat],   to: [usa.lon,     usa.lat]     },
    { from: [brazil.lon, brazil.lat], to: [uk.lon,      uk.lat]      },
    { from: [japan.lon, japan.lat],   to: [singapore.lon, singapore.lat] },
    { from: [uae.lon,   uae.lat],     to: [india.lon,   india.lat]   },
  ]
  return (
    <div className="ib-scene ib-m4-opener" data-slide-content="true">
      <div className="m4o-mapwrap" aria-hidden="true">
        <WorldMap className="m4o-map" showGraticule>
          {routes.map((r, i) => {
            const A = project(r.from[0], r.from[1])
            const B = project(r.to[0],   r.to[1])
            const cx = (A.x + B.x) / 2
            const cy = (A.y + B.y) / 2 - 40
            const d  = `M${A.x} ${A.y} Q${cx} ${cy} ${B.x} ${B.y}`
            return (
              <path
                key={i}
                className="m4o-faint-route"
                d={d}
                style={{ '--i': i }}
              />
            )
          })}
          <MapPulse lon={0} lat={20} />
        </WorldMap>

        <div className="m4o-institutions" aria-label="Governance bodies">
          {INSTITUTIONS.map((inst, i) => (
            <span key={inst.id} className={`m4o-inst m4o-inst-${inst.id}`} style={{ '--i': i }}>
              <strong>{inst.label}</strong>
              <em>{inst.sub}</em>
            </span>
          ))}
        </div>

        <p className="m4o-regional-hint" style={{ '--i': 4 }}>
          EU · ASEAN · SAARC · USMCA · BRICS
        </p>
      </div>

      <div className="m4o-copy">
        <p className="m4o-eyebrow">
          International Business · 22MBA401 · Chapter {String(module).padStart(2, '0')}
        </p>
        <h1 className="m4o-title">Governance</h1>
        <p className="m4o-sub">International Institutions &amp; Economic Integration</p>
        <p className="m4o-hint">
          Global business crosses borders. Governance determines the rules of crossing them.
        </p>
        <ol className="m4o-path" aria-label="Chapter journey">
          {GOVERNANCE_PATH.map((step, i) => (
            <li key={step} style={{ '--i': i }}>
              <span>{step}</span>
              {i < GOVERNANCE_PATH.length - 1 && <em aria-hidden="true">→</em>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/* ============================================================ HOOK ======= */
/**
 * GovernanceHook — quiet question visual: central "WHO SETS THE RULES?"
 * with orbit lenses around it.
 */
export function GovernanceHook() {
  const lenses = [
    'Trade rules',
    'Monetary stability',
    'Development',
    'IP & investment',
    'Regional blocs',
    'Market access',
  ]
  return (
    <div className="ib-scene ib-m4-hook">
      <div className="m4h-orbit" role="img" aria-label="Governance question orbit">
        <div className="m4h-core">
          <span>WHO SETS</span>
          <strong>THE RULES?</strong>
        </div>
        {lenses.map((lens, i) => (
          <span
            key={lens}
            className="m4h-lens"
            style={{ '--i': i, '--total': lenses.length }}
          >
            {lens}
          </span>
        ))}
      </div>
      <p className="m4h-lock">
        Rules of trade, money and market access are not natural — they are negotiated.
      </p>
    </div>
  )
}

/* ============================================================ WHY ======== */
/**
 * WhyInstitutionsVisual — four problem → institution pathways as a corridor,
 * not cards.
 */
export function WhyInstitutionsVisual() {
  const pathways = [
    { problem: 'Unpredictable trade barriers',      inst: 'WTO',       domain: 'Trade rules' },
    { problem: 'Currency crises & BoP stress',      inst: 'IMF',       domain: 'Monetary stability' },
    { problem: 'Development gaps in globalisation', inst: 'UNCTAD',    domain: 'Trade + development' },
    { problem: 'Deeper regional cooperation',       inst: 'Blocs',     domain: 'Regional integration' },
  ]
  return (
    <div className="ib-scene ib-m4-why">
      <header className="m4w-head">
        <span>Intellectual foundation</span>
        <strong>Why international business needs institutions</strong>
      </header>
      <ol className="m4w-corridor" aria-label="Problem to institution pathways">
        {pathways.map((p, i) => (
          <li key={p.inst} className="m4w-row" style={{ '--i': i }}>
            <div className="m4w-problem">
              <em aria-hidden="true" />
              <span>{p.problem}</span>
            </div>
            <div className="m4w-arrow" aria-hidden="true" />
            <div className="m4w-inst">
              <strong>{p.inst}</strong>
              <span>{p.domain}</span>
            </div>
          </li>
        ))}
      </ol>
      <p className="m4w-takeaway">
        Institutions exist to regulate, negotiate, assist and reduce uncertainty in IB.
      </p>
    </div>
  )
}

/* ============================================================ DEFINED ===== */
/**
 * InstitutionsDefinedVisual — four named bodies as institutional wordmarks
 * in a chamber layout (no logo images).
 */
export function InstitutionsDefinedVisual() {
  const bodies = [
    { id: 'wto',    name: 'WTO',        full: 'World Trade Organization',        note: 'Rules of trade between nations.' },
    { id: 'unctad', name: 'UNCTAD',     full: 'UN Conference on Trade & Dev.',   note: 'Trade and development for developing economies.' },
    { id: 'imf',    name: 'IMF',        full: 'International Monetary Fund',     note: 'Monetary cooperation and BoP support.' },
    { id: 'wb',     name: 'World Bank', full: 'World Bank Group',                note: 'Development finance and reconstruction.' },
  ]
  return (
    <div className="ib-scene ib-m4-defined">
      <div className="m4df-chamber" aria-label="Major international economic institutions">
        <div className="m4df-def">
          <span>Definition</span>
          <p>
            An organization combining two or more countries as members for mutual financial
            concerns, regulated by a central body.
          </p>
        </div>
        {bodies.map((b, i) => (
          <article key={b.id} className={`m4df-body m4df-${b.id}`} style={{ '--i': i }}>
            <strong className="m4df-acronym">{b.name}</strong>
            <em className="m4df-full">{b.full}</em>
            <p className="m4df-note">{b.note}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ============================================================ ARCHITECTURE (HERO) */
/**
 * GovernanceArchitecture HERO — layered architecture: WTO / IMF / UNCTAD /
 * Regional blocs with GLOBAL BUSINESS at centre.
 */
export function GovernanceArchitecture() {
  const layers = [
    { id: 'wto',      label: 'WTO',            sub: 'Trade rules · agreements · disputes · policy review', tier: 1 },
    { id: 'imf',      label: 'IMF',            sub: 'Monetary cooperation · surveillance · BoP lending',    tier: 2 },
    { id: 'unctad',   label: 'UNCTAD',         sub: 'Trade + development · programmes · cooperation',       tier: 3 },
    { id: 'regional', label: 'Regional Blocs', sub: 'EU · USMCA · ASEAN · SAARC / SAFTA · BRICS',          tier: 4 },
  ]
  return (
    <div className="ib-scene ib-m4-arch">
      <header className="m4ar-head">
        <span>Global governance architecture</span>
        <strong>Different institutions solve different international problems</strong>
      </header>
      <div className="m4ar-stage" role="img" aria-label="Governance layer diagram">
        <div className="m4ar-core">
          <span>GLOBAL</span>
          <strong>BUSINESS</strong>
        </div>
        {layers.map((l, i) => (
          <div key={l.id} className={`m4ar-ring m4ar-ring-${l.id}`} style={{ '--i': i, '--tier': l.tier }}>
            <div className="m4ar-label">
              <strong>{l.label}</strong>
              <span>{l.sub}</span>
            </div>
          </div>
        ))}
      </div>
      <p className="m4ar-takeaway">
        Trade → WTO · Money → IMF · Development → UNCTAD · Neighbours → Regional blocs.
      </p>
    </div>
  )
}

/* ============================================================ UNCTAD BRIDGE */
/**
 * UnctadBridge — development bridge metaphor:
 * Developing economies → Trade → Investment → Technology → Development
 */
export function UnctadBridge() {
  const spans = [
    { id: 'dev',   label: 'Developing economies', note: 'Structural constraints · commodity exposure' },
    { id: 'trade', label: 'Trade',                 note: 'Market access · rules · preferences' },
    { id: 'inv',   label: 'Investment',            note: 'FDI policy · enterprise capacity' },
    { id: 'tech',  label: 'Technology',            note: 'Innovation · e-commerce · logistics' },
    { id: 'out',   label: 'Development',           note: 'Inclusive growth · self-reliance' },
  ]
  return (
    <div className="ib-scene ib-m4-unctad">
      <header className="m4ub-head">
        <span>UNCTAD</span>
        <strong>UN focal point for trade and development</strong>
        <p>Established 1964 · Geneva · Permanent UN intergovernmental body</p>
      </header>
      <div className="m4ub-bridge" role="img" aria-label="UNCTAD development bridge">
        <div className="m4ub-rail" aria-hidden="true" />
        {spans.map((s, i) => (
          <div key={s.id} className={`m4ub-span m4ub-span-${s.id}`} style={{ '--i': i }}>
            <strong>{s.label}</strong>
            <em>{s.note}</em>
          </div>
        ))}
      </div>
      <p className="m4ub-lock">
        UNCTAD = trade + development for integrating developing countries into the world economy.
      </p>
    </div>
  )
}

/* ============================================================ UNCTAD OBJECTIVES */
export function UnctadObjectivesVisual({
  items = [
    { title: 'Inclusive & sustainable growth',  text: 'Promote growth that includes developing economies.' },
    { title: 'Facilitate trade & investment',   text: 'Help countries engage in trade and attract investment.' },
    { title: 'Development-centred globalisation', text: 'Shape globalisation so development remains the purpose.' },
    { title: 'Address development challenges',  text: 'Confront structural constraints facing developing countries.' },
    { title: 'Strengthen international cooperation', text: 'Build cooperative responses across countries and institutions.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m4-unctad-obj">
      <header className="m4uo-head">
        <span>UNCTAD objectives</span>
        <strong>What UNCTAD exists to achieve</strong>
      </header>
      <ol className="m4uo-list">
        {items.map((item, i) => (
          <li key={item.title} className="m4uo-item" style={{ '--i': i }}>
            <span className="m4uo-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="m4uo-exam">Exam: list all five objectives + integrating developing countries line.</p>
    </div>
  )
}

/* ============================================================ UNCTAD PRINCIPLES */
/**
 * UnctadPrinciplesVisual — pillars, not cards.
 */
export function UnctadPrinciplesVisual({
  items = [
    { title: 'Demand-driven technical cooperation', text: 'Support responds to country-expressed needs.' },
    { title: 'Country ownership',                   text: 'Development initiatives belong to the country.' },
    { title: 'Transparency',                        text: 'Openness in process and purpose.' },
    { title: 'Efficiency, effectiveness, accountability', text: 'Results and responsibility in programme delivery.' },
    { title: 'Sovereign equality & good faith',     text: 'Peaceful settlement; obligations in good faith.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m4-unctad-pr">
      <header className="m4up-head">
        <span>UNCTAD principles</span>
        <strong>How UNCTAD works with developing countries</strong>
      </header>
      <div className="m4up-pillars" role="list" aria-label="UNCTAD principles">
        {items.map((item, i) => (
          <div key={item.title} className="m4up-pillar" role="listitem" style={{ '--i': i }}>
            <div className="m4up-cap" />
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
      <p className="m4up-lock">
        Principles: demand-driven · ownership · transparency · accountability · sovereign equality.
      </p>
    </div>
  )
}

/* ============================================================ UNCTAD ACHIEVEMENTS */
/**
 * UnctadAchievementsVisual — outcomes placed on the development bridge.
 */
export function UnctadAchievementsVisual() {
  const achievements = [
    { id: 'tariff',     title: 'Tariff Reclassification',          text: 'Fairer tariff treatment for developing exporters.' },
    { id: 'commodity',  title: 'Integrated Programme on Commodities', text: 'Address commodity dependence and price instability.' },
    { id: 'debt',       title: 'Reducing Debt Burden',             text: 'Attention to debt pressures constraining development.' },
    { id: 'facility',   title: 'Commodity Development Facility',   text: 'Support for commodity-related development capacity.' },
  ]
  return (
    <div className="ib-scene ib-m4-unctad-ach">
      <header className="m4ua-head">
        <span>UNCTAD achievements</span>
        <strong>Concrete programmes that shaped developing-country trade agendas</strong>
      </header>
      <div className="m4ua-bridge-row">
        <div className="m4ua-spine" aria-hidden="true" />
        {achievements.map((a, i) => (
          <article key={a.id} className={`m4ua-outcome m4ua-${a.id}`} style={{ '--i': i }}>
            <strong>{a.title}</strong>
            <p>{a.text}</p>
          </article>
        ))}
      </div>
      <p className="m4ua-exam">
        Exam: four achievements with one functional phrase each — titles alone lose marks.
      </p>
    </div>
  )
}

/* ============================================================ UNCTAD STRUCTURE */
/**
 * UnctadStructureVisual — compact focus areas under the Secretary-General.
 */
export function UnctadStructureVisual() {
  const divisions = [
    { id: 'trade',  label: 'Trade & Commodities',      note: 'Trade analysis · commodity programmes' },
    { id: 'inv',    label: 'Investment & Enterprise',   note: 'FDI policy · enterprise capacity' },
    { id: 'tech',   label: 'Technology & Logistics',    note: 'Innovation · e-commerce · ASYCUDA' },
    { id: 'africa', label: 'Africa / LDC Programmes',  note: 'Productive capacities · debt finance' },
    { id: 'stats',  label: 'Statistics & Research',     note: 'Data, publications, policy briefs' },
  ]
  return (
    <div className="ib-scene ib-m4-unctad-str">
      <div className="m4us-sg">
        <span>Secretary-General's Office</span>
        <strong>Central leadership &amp; coordination</strong>
      </div>
      <div className="m4us-divisions">
        {divisions.map((d, i) => (
          <div key={d.id} className={`m4us-div m4us-${d.id}`} style={{ '--i': i }}>
            <strong>{d.label}</strong>
            <span>{d.note}</span>
          </div>
        ))}
      </div>
      <p className="m4us-note">
        Exam priority: mandate and achievements over exhaustive division names.
      </p>
    </div>
  )
}

/* ============================================================ IMF PRESSURE (HERO tier 2) */
/**
 * ImfPressureScene HERO tier2 — financial pressure indicators → IMF activates →
 * Surveillance / Lending / Technical Assistance.
 */
export function ImfPressureScene() {
  const pressures = [
    { id: 'fx',    label: 'FX volatility',       value: 87 },
    { id: 'bop',   label: 'BoP stress',           value: 74 },
    { id: 'debt',  label: 'Debt burden',          value: 68 },
    { id: 'conf',  label: 'Confidence gap',       value: 79 },
  ]
  const responses = [
    { id: 'surv', label: 'Surveillance',         text: 'Monitor economies · policy advice' },
    { id: 'lend', label: 'Lending',              text: 'Temporary support for BoP difficulties' },
    { id: 'ta',   label: 'Technical Assistance', text: 'Capacity development for institutions' },
  ]
  return (
    <div className="ib-scene ib-m4-imf">
      <header className="m4im-head">
        <span>Bretton Woods · 1944 → 1945 · Monetary stability</span>
        <strong>When a country faces serious external financial pressure</strong>
      </header>
      <div className="m4im-stage">
        <div className="m4im-gauges" aria-label="Financial pressure indicators">
          {pressures.map((p, i) => (
            <div key={p.id} className="m4im-gauge" style={{ '--i': i, '--v': p.value }}>
              <div className="m4im-bar"><i style={{ '--h': p.value }} /></div>
              <span>{p.label}</span>
            </div>
          ))}
        </div>
        <div className="m4im-activates" aria-hidden="true">
          <em />
          <strong>IMF ACTIVATES</strong>
        </div>
        <div className="m4im-triad">
          {responses.map((r, i) => (
            <article key={r.id} className={`m4im-response m4im-${r.id}`} style={{ '--i': i }}>
              <strong>{r.label}</strong>
              <p>{r.text}</p>
            </article>
          ))}
        </div>
      </div>
      <p className="m4im-lock">
        IMF = international monetary cooperation + BoP confidence.
      </p>
    </div>
  )
}

/* ============================================================ IMF OBJECTIVES */
export function ImfObjectivesVisual() {
  const objectives = [
    { title: 'Global monetary cooperation',  text: 'Strengthen cooperation on monetary issues.' },
    { title: 'Growth of international trade', text: 'Facilitate trade through a stable monetary system.' },
    { title: 'Exchange stability',            text: 'Orderly exchange arrangements and stability.' },
    { title: 'Multilateral payments system', text: 'Assist establishment of a multilateral payments system.' },
    { title: 'Confidence to members',        text: 'Temporary resources when members need it.' },
    { title: 'BoP disequilibrium',           text: 'Help correct balance-of-payments maladjustments.' },
  ]
  return (
    <div className="ib-scene ib-m4-imf-obj">
      <header className="m4io-head">
        <span>IMF objectives</span>
        <strong>Six objectives that define the Fund's mandate</strong>
      </header>
      <ol className="m4io-list">
        {objectives.map((obj, i) => (
          <li key={obj.title} className="m4io-item" style={{ '--i': i }}>
            <span className="m4io-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <strong>{obj.title}</strong>
              <p>{obj.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="m4io-mem">
        IMF objectives = cooperation · trade · FX stability · payments · confidence · BoP.
      </p>
    </div>
  )
}

/* ============================================================ IMF FUNCTIONS */
/**
 * ImfFunctionsVisual — triad system operations.
 */
export function ImfFunctionsVisual() {
  const triad = [
    {
      id: 'surv',
      label: 'Surveillance',
      icon: '◉',
      points: ['Monitor economies', 'Provide policy advice', 'Flag macro risks early'],
    },
    {
      id: 'lend',
      label: 'Lending',
      icon: '◈',
      points: ['Temporary financial support', 'BoP difficulties', 'Stabilisation programmes'],
    },
    {
      id: 'ta',
      label: 'Technical Assistance',
      icon: '◇',
      points: ['Capacity development', 'Institution building', 'Policy implementation'],
    },
  ]
  return (
    <div className="ib-scene ib-m4-imf-fn">
      <header className="m4if-head">
        <span>IMF functions</span>
        <strong>Surveillance · Lending · Technical Assistance</strong>
      </header>
      <div className="m4if-triad">
        {triad.map((t, i) => (
          <article key={t.id} className={`m4if-arm m4if-${t.id}`} style={{ '--i': i }}>
            <span className="m4if-icon" aria-hidden="true">{t.icon}</span>
            <strong>{t.label}</strong>
            <ul>
              {t.points.map(pt => <li key={pt}>{pt}</li>)}
            </ul>
          </article>
        ))}
      </div>
      <p className="m4if-lock">
        Manager signal: if a host country enters an IMF programme, watch FX, import compression,
        reform timelines and investment confidence.
      </p>
    </div>
  )
}

/* ============================================================ IMF VS WORLD BANK */
/**
 * ImfVsWorldBank — confusion split.
 */
export function ImfVsWorldBank() {
  return (
    <div className="ib-scene ib-m4-imfbank">
      <header className="m4ib-head">
        <span>Common confusion</span>
        <strong>IMF vs World Bank — not the same institution</strong>
      </header>
      <div className="m4ib-split">
        <article className="m4ib-side m4ib-imf" style={{ '--i': 0 }}>
          <strong>IMF</strong>
          <ul>
            <li>Monetary cooperation</li>
            <li>Exchange stability</li>
            <li>BoP support</li>
            <li>Surveillance &amp; temporary lending</li>
          </ul>
          <em>Problem: monetary instability &amp; BoP stress</em>
        </article>
        <div className="m4ib-divider" aria-hidden="true">
          <span>≠</span>
        </div>
        <article className="m4ib-side m4ib-wb" style={{ '--i': 1 }}>
          <strong>World Bank</strong>
          <ul>
            <li>Development finance</li>
            <li>Long-horizon projects</li>
            <li>Poverty reduction</li>
            <li>Reconstruction lending</li>
          </ul>
          <em>Problem: development &amp; reconstruction gaps</em>
        </article>
      </div>
      <p className="m4ib-trap">
        Exam trap: do not write "IMF builds roads" or "World Bank sets FX policy."
      </p>
    </div>
  )
}

/* ============================================================ GATT → WTO (HERO) */
/**
 * GattToWto HERO — treaty evolution timeline with document/treaty grammar.
 */
export function GattToWto() {
  const eras = [
    { id: 'war',    era: 'Problem',  title: 'Post-war trade uncertainty',     text: 'Countries needed rules to reopen and expand trade after WWII.' },
    { id: 'gatt',   era: 'GATT',    title: 'Goods-focused liberalisation',   text: 'Tariff rounds and rules mainly for merchandise trade.' },
    { id: 'limits', era: 'Limits',  title: 'Scope & enforcement gaps',       text: 'Services, IP and dispute strength needed more coverage.' },
    { id: 'wto',    era: 'WTO 1995', title: 'Broader rulebook',              text: 'Goods + services + IP + dispute settlement procedures.' },
  ]
  return (
    <div className="ib-scene ib-m4-gatt">
      <header className="m4gt-head">
        <span>Historical context</span>
        <strong>Post-war trade liberalisation needed a stronger institutional home</strong>
      </header>
      <div className="m4gt-rail">
        <div className="m4gt-spine" aria-hidden="true" />
        {eras.map((e, i) => (
          <article key={e.id} className={`m4gt-era m4gt-${e.id}`} style={{ '--i': i }}>
            <div className="m4gt-stamp">
              <em>{e.era}</em>
            </div>
            <strong>{e.title}</strong>
            <p>{e.text}</p>
          </article>
        ))}
      </div>
      <p className="m4gt-lock">
        GATT → goods foundation · WTO → broader rules + stronger dispute system. Est. 1 Jan 1995.
      </p>
    </div>
  )
}

/* ============================================================ WTO RULEBOOK INTRO */
/**
 * WtoRulebook — rulebook metaphor introduction.
 */
export function WtoRulebook() {
  return (
    <div className="ib-scene ib-m4-wto-rb">
      <div className="m4rb-book" aria-hidden="true">
        <div className="m4rb-spine">
          <span>WTO</span>
        </div>
        <div className="m4rb-pages">
          <span className="m4rb-page" style={{ '--i': 0 }}>Goods</span>
          <span className="m4rb-page" style={{ '--i': 1 }}>Services</span>
          <span className="m4rb-page" style={{ '--i': 2 }}>IP</span>
          <span className="m4rb-page" style={{ '--i': 3 }}>Disputes</span>
        </div>
      </div>
      <div className="m4rb-copy">
        <p className="m4rb-eyebrow">Trade rulebook</p>
        <strong className="m4rb-title">
          The only global body dealing with the rules of trade between nations
        </strong>
        <p className="m4rb-lead">
          The World Trade Organization aims to ensure that trade flows as smoothly, predictably
          and freely as possible — contributing to higher living standards, job creation and
          improved lives worldwide.
        </p>
        <dl className="m4rb-def">
          <dt>Successor to</dt><dd>GATT (1 January 1995)</dd>
          <dt>Coverage</dt><dd>Goods · services · intellectual property</dd>
          <dt>Mechanism</dt><dd>Dispute settlement procedures</dd>
        </dl>
      </div>
    </div>
  )
}

/* ============================================================ WTO OBJECTIVES */
export function WtoObjectivesVisual() {
  const objectives = [
    { title: 'Administer trade agreements',   text: 'Oversee the operation of WTO agreements.' },
    { title: 'Forum for negotiations',        text: 'Provide a platform for trade talks.' },
    { title: 'Resolve trade disputes',        text: 'Settle conflicts under agreed procedures.' },
    { title: 'Monitor trade policies',        text: "Review members' trade policies." },
    { title: 'Assist developing countries',   text: 'Support capacity and participation.' },
    { title: 'Promote free and fair trade',   text: 'Advance open, rules-based exchange.' },
    { title: 'Transparency & predictability', text: 'Make trade conditions clearer and more stable.' },
    { title: 'Cooperate with other institutions', text: 'Work with related global bodies.' },
  ]
  return (
    <div className="ib-scene ib-m4-wto-obj">
      <header className="m4wo-head">
        <span>WTO objectives</span>
        <strong>Eight objectives of the WTO</strong>
      </header>
      <ol className="m4wo-list">
        {objectives.map((obj, i) => (
          <li key={obj.title} className="m4wo-item" style={{ '--i': i }}>
            <span className="m4wo-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <strong>{obj.title}</strong>
              <p>{obj.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="m4wo-mem">
        8 objectives: administer · negotiate · disputes · monitor · assist · free/fair ·
        transparency · cooperate.
      </p>
    </div>
  )
}

/* ============================================================ WTO PRINCIPLES RULEBOOK (HERO-ish) */
/**
 * WtoPrinciplesRulebook HERO-ish — principles assembling; highlights
 * Non-discrimination with MFN + National Treatment mini examples.
 */
export function WtoPrinciplesRulebook() {
  const principles = [
    { id: 'nd',     title: 'Non-discrimination',        hero: true,  text: 'MFN across members + National Treatment inside the market.' },
    { id: 'ma',     title: 'Market access',             hero: false, text: 'Open and bound access commitments.' },
    { id: 'fc',     title: 'Fair competition',          hero: false, text: 'Disciplines against unfair trade practices.' },
    { id: 'tr',     title: 'Transparency',              hero: false, text: 'Publish and notify trade measures.' },
    { id: 'rec',    title: 'Reciprocity',               hero: false, text: 'Mutual exchange of concessions.' },
    { id: 'sdt',    title: 'Special & differential',    hero: false, text: 'Flexibilities for developing countries.' },
    { id: 'sv',     title: 'Safety valves',             hero: false, text: 'Temporary escape routes under agreed conditions.' },
  ]
  return (
    <div className="ib-scene ib-m4-principles">
      <header className="m4pr-head">
        <span>Principles that make rules meaningful</span>
        <strong>Non-discrimination is the heart of the WTO rulebook</strong>
      </header>
      <div className="m4pr-assembly">
        {principles.map((p, i) => (
          <article
            key={p.id}
            className={`m4pr-rule m4pr-${p.id}${p.hero ? ' m4pr-hero' : ''}`}
            style={{ '--i': i }}
          >
            <strong>{p.title}</strong>
            <p>{p.text}</p>
          </article>
        ))}
      </div>
      <div className="m4pr-nd-detail">
        <div className="m4pr-mfn" style={{ '--i': 0 }}>
          <span>MFN</span>
          <p>A concession granted to one member extends to all members.</p>
        </div>
        <div className="m4pr-nt" style={{ '--i': 1 }}>
          <span>National Treatment</span>
          <p>Imports, once inside the market, face no discriminatory internal taxes vs like domestic goods.</p>
        </div>
      </div>
      <p className="m4pr-exam">
        Exam: never write only "MFN and National Treatment" — define each with a one-line example.
      </p>
    </div>
  )
}

/* ============================================================ WTO ROLE OPS */
export function WtoRoleOps() {
  const ops = [
    { title: 'Help developing & transition economies', text: 'Support participation in the system.' },
    { title: 'Specialised export help',                text: 'Capacity for trade engagement.' },
    { title: 'Global policy-making role',              text: 'Voice in broader economic governance.' },
    { title: 'Information in & out',                   text: 'Gather data; inform the public.' },
    { title: 'Encourage reforms',                      text: 'Support development-oriented reform paths.' },
  ]
  return (
    <div className="ib-scene ib-m4-wto-ops">
      <header className="m4ro-head">
        <span>WTO role &amp; functioning</span>
        <strong>How the WTO operates day to day</strong>
      </header>
      <ol className="m4ro-ops">
        {ops.map((op, i) => (
          <li key={op.title} className="m4ro-op" style={{ '--i': i }}>
            <strong>{op.title}</strong>
            <p>{op.text}</p>
          </li>
        ))}
      </ol>
      <p className="m4ro-mem">
        Role = help · export support · policy voice · information · reform encouragement.
      </p>
    </div>
  )
}

/* ============================================================ WTO ADVANTAGES */
/**
 * WtoAdvantagesOutcomes — outcomes, not a duplicate of objectives.
 */
export function WtoAdvantagesOutcomes() {
  const advantages = [
    { id: 'peace',   title: 'Promotes international peace',   text: 'Rules reduce trade conflict spirals.' },
    { id: 'rules',   title: 'Rules make life easier',         text: 'Shared expectations lower transaction friction.' },
    { id: 'cost',    title: 'Reduces cost of living',         text: 'Competition and openness can lower prices.' },
    { id: 'choice',  title: 'More product choice & quality',  text: 'Imports expand variety and standards pressure.' },
    { id: 'income',  title: 'Raises income & growth',         text: 'Trade supports income and growth channels.' },
    { id: 'empl',    title: 'Supports employment goals',      text: 'Linked to fuller use of productive capacity.' },
    { id: 'lobby',   title: 'Shields from lobbying',          text: 'Bindings limit arbitrary favouritism.' },
    { id: 'gov',     title: 'Promotes good governance',       text: 'Transparency and review improve policy quality.' },
  ]
  return (
    <div className="ib-scene ib-m4-wto-adv">
      <header className="m4wa-head">
        <span>WTO advantages</span>
        <strong>Why a rules-based system helps societies and firms</strong>
      </header>
      <ul className="m4wa-outcomes">
        {advantages.map((a, i) => (
          <li key={a.id} className={`m4wa-outcome m4wa-${a.id}`} style={{ '--i': i }}>
            <strong>{a.title}</strong>
            <p>{a.text}</p>
          </li>
        ))}
      </ul>
      <p className="m4wa-exam">
        Pick 5–6 with one explanation line each; do not dump titles only.
      </p>
    </div>
  )
}

/* ============================================================ WTO MARKET ACCESS CASE */
/**
 * WtoMarketAccessCase — company → market → barrier → rule → consequence.
 * Also exported as MiniCase-compatible canvas.
 */
export function WtoMarketAccessCase() {
  const steps = [
    { id: 'co',    label: 'Company',     text: 'Indian auto-component exporter' },
    { id: 'mkt',   label: 'Market',      text: 'Two export markets — both attractive on demand' },
    { id: 'bar',   label: 'Barrier',     text: 'Destination tightens standards; safeguard tariff contemplated' },
    { id: 'rule',  label: 'Rule',        text: 'Map WTO bindings · MFN rates · transparency checks' },
    { id: 'cons',  label: 'Consequence', text: 'Market attractiveness is rewritten by rules, not only demand' },
  ]
  return (
    <div className="ib-scene ib-m4-wto-case">
      <header className="m4wc-head">
        <span>Business case</span>
        <strong>Market access under WTO rules</strong>
      </header>
      <div className="m4wc-flow">
        {steps.map((s, i) => (
          <div key={s.id} className={`m4wc-step m4wc-${s.id}`} style={{ '--i': i }}>
            <span className="m4wc-label">{s.label}</span>
            <p className="m4wc-text">{s.text}</p>
            {i < steps.length - 1 && <span className="m4wc-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <p className="m4wc-lesson">
        WTO for managers: tariffs, standards, remedies and predictability change sourcing
        and export strategy.
      </p>
    </div>
  )
}

/* ============================================================ TRIMS GATE */
/**
 * TrimsGate — investment gate metaphor.
 */
export function TrimsGate() {
  const features = [
    { title: 'Applies to',       text: 'Investment measures related to goods trade.' },
    { title: 'Does not apply to', text: 'Trade in services.' },
    { title: 'Does not regulate', text: 'Entry of foreign industry/investment as such.' },
    { title: 'Core concern',     text: 'Discriminatory treatment of imported/exported products.' },
  ]
  return (
    <div className="ib-scene ib-m4-trims">
      <div className="m4tg-gate" aria-label="TRIMS investment gate">
        <div className="m4tg-pillar m4tg-pillar-l" aria-hidden="true" />
        <div className="m4tg-arch">
          <span>TRIMS</span>
          <em>Trade-Related Investment Measures</em>
        </div>
        <div className="m4tg-pillar m4tg-pillar-r" aria-hidden="true" />
      </div>
      <div className="m4tg-copy">
        <p className="m4tg-def">
          WTO rules addressing investment measures related to trade in goods that involve
          discriminatory treatment of imported or exported products.
        </p>
        <ul className="m4tg-features">
          {features.map((f, i) => (
            <li key={f.title} style={{ '--i': i }}>
              <strong>{f.title}</strong>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
        <p className="m4tg-q">
          Manager question: does this host incentive package force local-content or
          trade-balancing behaviour that conflicts with TRIMS logic?
        </p>
      </div>
    </div>
  )
}

/* ============================================================ TRIPS SHIELD */
/**
 * TripsShield — IP shield ring with 7 IP types around the centre.
 */
export function TripsShield() {
  const ipTypes = [
    { id: 'patents',   label: 'Patents',               note: 'Invention protection · pharma/tech' },
    { id: 'copyright', label: 'Copyrights',            note: 'Literary, artistic & related rights' },
    { id: 'trademark', label: 'Trademarks',            note: 'Brand identity across markets' },
    { id: 'design',    label: 'Industrial Design',     note: 'Appearance of products' },
    { id: 'gi',        label: 'Geographical Indications', note: 'Place-linked product names' },
    { id: 'ic',        label: 'IC Layout Designs',     note: 'Semiconductor topography' },
    { id: 'secret',    label: 'Undisclosed Information', note: 'Trade secrets / confidential data' },
  ]
  return (
    <div className="ib-scene ib-m4-trips">
      <div className="m4ts-ring" role="img" aria-label="TRIPS IP shield ring">
        <div className="m4ts-core">
          <span>TRIPS</span>
          <em>IP Shield</em>
        </div>
        {ipTypes.map((ip, i) => (
          <div
            key={ip.id}
            className={`m4ts-type m4ts-${ip.id}`}
            style={{ '--i': i, '--total': ipTypes.length }}
          >
            <strong>{ip.label}</strong>
            <span>{ip.note}</span>
          </div>
        ))}
      </div>
      <p className="m4ts-lock">
        TRIPS = minimum IPR standards + enforcement logic inside WTO trade rules.
      </p>
    </div>
  )
}

/* ============================================================ TRIPS VS TRIMS */
export function TripsVsTrims() {
  return (
    <div className="ib-scene ib-m4-trvt">
      <header className="m4tvt-head">
        <span>Common confusion</span>
        <strong>TRIPS vs TRIMS — do not swap these acronyms</strong>
      </header>
      <div className="m4tvt-split">
        <article className="m4tvt-trips" style={{ '--i': 0 }}>
          <div className="m4tvt-badge">TRIPS</div>
          <dl>
            <dt>Focus</dt>         <dd>Intellectual property</dd>
            <dt>Business area</dt> <dd>Patents, brands, designs, GIs, secrets</dd>
            <dt>Question</dt>      <dd>Can rivals copy our knowledge assets?</dd>
            <dt>Memory</dt>        <dd className="m4tvt-hook">IP Shield</dd>
          </dl>
        </article>
        <div className="m4tvt-vs" aria-hidden="true">vs</div>
        <article className="m4tvt-trims" style={{ '--i': 1 }}>
          <div className="m4tvt-badge">TRIMS</div>
          <dl>
            <dt>Focus</dt>         <dd>Investment measures × goods trade</dd>
            <dt>Business area</dt> <dd>FDI conditions linked to imports/exports</dd>
            <dt>Question</dt>      <dd>Do local rules force discriminatory trade behaviour?</dd>
            <dt>Memory</dt>        <dd className="m4tvt-hook">Investment Gate</dd>
          </dl>
        </article>
      </div>
      <p className="m4tvt-exam">
        Comparison table: purpose · coverage · business example · one limitation each.
      </p>
    </div>
  )
}

/* ============================================================ INSTITUTIONS COMPARE */
/**
 * InstitutionsCompare — WTO / IMF / UNCTAD problem architecture revision.
 */
export function InstitutionsCompare() {
  const bodies = [
    {
      id: 'wto',
      name: 'WTO',
      problem: 'Unpredictable / unfair trade barriers',
      tool: 'Agreements · negotiations · disputes · policy review',
      care: 'Tariffs, access, IP, investment measures',
    },
    {
      id: 'imf',
      name: 'IMF',
      problem: 'Monetary instability and BoP stress',
      tool: 'Surveillance · lending · capacity development',
      care: 'FX, reforms, demand, country risk',
    },
    {
      id: 'unctad',
      name: 'UNCTAD',
      problem: 'Development gaps in globalisation',
      tool: 'Research · cooperation · programmes',
      care: 'Development capacity, investment climate, commodity exposure',
    },
  ]
  return (
    <div className="ib-scene ib-m4-icmp">
      <header className="m4ic-head">
        <span>Major revision</span>
        <strong>What problem does each institution address?</strong>
      </header>
      <div className="m4ic-grid">
        {bodies.map((b, i) => (
          <article key={b.id} className={`m4ic-body m4ic-${b.id}`} style={{ '--i': i }}>
            <strong className="m4ic-name">{b.name}</strong>
            <dl>
              <dt>Problem</dt> <dd>{b.problem}</dd>
              <dt>Tool</dt>    <dd>{b.tool}</dd>
              <dt>Business</dt><dd>{b.care}</dd>
            </dl>
          </article>
        ))}
      </div>
      <p className="m4ic-mem">
        WTO = trade rules · IMF = money/BoP · UNCTAD = trade + development.
      </p>
    </div>
  )
}

/* ============================================================ BRIDGE TO REGIONAL */
/**
 * BridgeToRegional — global → regional transition.
 */
export function BridgeToRegional() {
  const steps = [
    { id: 'global', label: 'Global institutions', sub: 'WTO · IMF · UNCTAD' },
    { id: 'rules',  label: 'Global rules & support', sub: 'Trade · money · development' },
    { id: 'choice', label: 'Regional choice',     sub: 'Deeper cooperation with neighbours' },
    { id: 'integ',  label: 'Economic integration', sub: 'Blocs, stages and business effects' },
  ]
  return (
    <div className="ib-scene ib-m4-bridge">
      <div className="m4br-flow" role="list" aria-label="Global to regional bridge">
        {steps.map((s, i) => (
          <div key={s.id} className={`m4br-step m4br-${s.id}`} role="listitem" style={{ '--i': i }}>
            <strong>{s.label}</strong>
            <span>{s.sub}</span>
            {i < steps.length - 1 && <em className="m4br-arrow" aria-hidden="true">→</em>}
          </div>
        ))}
      </div>
      <p className="m4br-insight">
        Global governance ≠ the end of regional cooperation. Managers must read both layers.
      </p>
    </div>
  )
}

/* ============================================================ INTEGRATION INTRO */
export function IntegrationIntroVisual() {
  return (
    <div className="ib-scene ib-m4-integ">
      <div className="m4ii-stage">
        <div className="m4ii-def">
          <span>Regional Economic Integration</span>
          <p>
            A process in which countries in a geographical region form agreements to reduce
            trade barriers and promote economic cooperation, increasing trade and investment
            among members.
          </p>
        </div>
        <div className="m4ii-why">
          <strong>Why it exists</strong>
          <ul>
            <li style={{ '--i': 0 }}>Market access &amp; efficiency</li>
            <li style={{ '--i': 1 }}>Collective bargaining power</li>
            <li style={{ '--i': 2 }}>Investment attraction</li>
            <li style={{ '--i': 3 }}>Regional peace &amp; security</li>
          </ul>
        </div>
        <div className="m4ii-examples">
          <strong>Examples</strong>
          <ul>
            <li style={{ '--i': 0 }}>EU</li>
            <li style={{ '--i': 1 }}>USMCA / NAFTA</li>
            <li style={{ '--i': 2 }}>ASEAN</li>
            <li style={{ '--i': 3 }}>SAARC / SAPTA / SAFTA</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ============================================================ BLOC REASONS */
export function BlocReasonsVisual() {
  const reasons = [
    { id: 'barriers',  title: 'Remove trade barriers',          text: 'Lower tariffs and frictions among members.' },
    { id: 'coord',     title: 'Coordination & bargaining power', text: 'Speak with a larger collective voice.' },
    { id: 'econ',      title: 'Economic considerations',         text: 'Scale, efficiency and market expansion.' },
    { id: 'returns',   title: 'Returns & competition',           text: 'Larger markets raise returns and competitive pressure.' },
    { id: 'trade',     title: 'Trade gains',                     text: 'Capture gains from deeper exchange.' },
    { id: 'inv',       title: 'Investment',                      text: 'Attract and organise cross-border investment.' },
    { id: 'security',  title: 'Security',                        text: 'Economic ties can support regional stability.' },
  ]
  return (
    <div className="ib-scene ib-m4-bloc-why">
      <header className="m4bw-head">
        <span>Motives behind regional trading blocs</span>
        <strong>Why countries form regional blocs</strong>
      </header>
      <ul className="m4bw-list">
        {reasons.map((r, i) => (
          <li key={r.id} className={`m4bw-reason m4bw-${r.id}`} style={{ '--i': i }}>
            <strong>{r.title}</strong>
            <p>{r.text}</p>
          </li>
        ))}
      </ul>
      <p className="m4bw-mem">
        Reasons: barriers · bargaining · economics · competition · trade · investment · security.
      </p>
    </div>
  )
}

/* ============================================================ INTEGRATION LADDER (HERO) */
/**
 * IntegrationLadder HERO — exact 6 levels PTA→FTA→CU→CM→Economic Union→
 * Political Union progressive climb.
 */
export function IntegrationLadder() {
  const rungs = [
    {
      id: 'pta',  n: 1, label: 'Preferential Trading Agreement',
      feature: 'Reduced tariffs / special quotas',
      note: 'Preferential access — not free trade yet',
    },
    {
      id: 'fta',  n: 2, label: 'Free Trade Area',
      feature: 'Tariff-free among members',
      note: 'Each member keeps own external tariffs',
    },
    {
      id: 'cu',   n: 3, label: 'Customs Union',
      feature: 'FTA + common external tariff (CET)',
      note: 'One external tariff face toward outsiders',
    },
    {
      id: 'cm',   n: 4, label: 'Common Market',
      feature: 'Customs union + free factor movement',
      note: 'Goods, services, people, capital move freely',
    },
    {
      id: 'eu',   n: 5, label: 'Economic Union',
      feature: 'Common market + policy harmonisation',
      note: 'Full economic policy alignment',
    },
    {
      id: 'pu',   n: 6, label: 'Political Union',
      feature: 'Shared sovereignty / unification',
      note: 'Deepest form — political integration',
    },
  ]
  return (
    <div className="ib-scene ib-m4-ladder">
      <header className="m4ld-head">
        <span>Exact PPT sequence</span>
        <strong>Integration deepens step by step</strong>
      </header>
      <div className="m4ld-ladder" role="list" aria-label="Integration ladder">
        {[...rungs].reverse().map((rung, i) => (
          <div
            key={rung.id}
            className={`m4ld-rung m4ld-${rung.id}`}
            role="listitem"
            style={{ '--i': i, '--n': rung.n }}
          >
            <span className="m4ld-num">{rung.n}</span>
            <div className="m4ld-content">
              <strong>{rung.label}</strong>
              <em>{rung.feature}</em>
              <p>{rung.note}</p>
            </div>
          </div>
        ))}
      </div>
      <p className="m4ld-exam">
        Always draw the ladder with one distinguishing feature under each step.
      </p>
    </div>
  )
}

/* ============================================================ A B C TARIFF STORY */
/**
 * AbcTariffStory — Countries A B C progressive barriers story.
 */
export function AbcTariffStory() {
  const stages = [
    { id: 'start', label: 'Start',        text: "A, B, C each tax one another's goods." },
    { id: 'fta',   label: 'FTA (A–B)',    text: 'A and B remove internal tariffs; each keeps own tariff on C.' },
    { id: 'cu',    label: 'Customs Union', text: 'A and B keep free trade and adopt a common external tariff on C.' },
    { id: 'cm',    label: 'Common Market', text: 'Free movement of services, people and capital between A and B.' },
    { id: 'eu',    label: 'Economic Union', text: 'A and B harmonise economic policies more fully.' },
  ]
  return (
    <div className="ib-scene ib-m4-abc">
      <header className="m4ab-head">
        <span>Worked logic</span>
        <strong>Watch barriers fall — then watch external policy unify</strong>
      </header>
      <div className="m4ab-actors">
        <span className="m4ab-actor m4ab-a">A</span>
        <span className="m4ab-actor m4ab-b">B</span>
        <span className="m4ab-actor m4ab-c">C</span>
      </div>
      <ol className="m4ab-stages">
        {stages.map((s, i) => (
          <li key={s.id} className={`m4ab-stage m4ab-${s.id}`} style={{ '--i': i }}>
            <strong>{s.label}</strong>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
      <p className="m4ab-lock">
        Internal free trade ≠ common external tariff ≠ factor mobility ≠ policy harmonisation.
      </p>
    </div>
  )
}

/* ============================================================ LEVELS CONFUSION BOARD */
/**
 * LevelsConfusionBoard — FTA / CU / CM / EU progressive added features.
 */
export function LevelsConfusionBoard() {
  const levels = [
    {
      id: 'fta',  label: 'FTA',
      cols: ['✓ Internal tariffs removed', '✗ No CET required', '✗ Factors not free', '✗ No policy harmonisation'],
    },
    {
      id: 'cu',   label: 'Customs Union',
      cols: ['✓ Internal free trade', '✓ + Common external tariff', '✗ Factors not free', '✗ Limited harmonisation'],
    },
    {
      id: 'cm',   label: 'Common Market',
      cols: ['✓ Internal free trade', '✓ CET', '✓ + Free factor movement', '✗ No full harmonisation'],
    },
    {
      id: 'eu',   label: 'Economic Union',
      cols: ['✓ Internal free trade', '✓ CET', '✓ Free factors', '✓ + Policy harmonisation'],
    },
  ]
  const colHeads = ['Internal barriers', 'External tariff', 'Factor mobility', 'Policy alignment']
  return (
    <div className="ib-scene ib-m4-confusion">
      <header className="m4cf-head">
        <span>Exam lock</span>
        <strong>Four questions that separate the stages</strong>
      </header>
      <div className="m4cf-board" role="table" aria-label="Integration levels comparison board">
        <div className="m4cf-row m4cf-header" role="row">
          <span className="m4cf-cell m4cf-level-col" role="columnheader">Level</span>
          {colHeads.map(h => (
            <span key={h} className="m4cf-cell" role="columnheader">{h}</span>
          ))}
        </div>
        {levels.map((lv, i) => (
          <div key={lv.id} className={`m4cf-row m4cf-${lv.id}`} role="row" style={{ '--i': i }}>
            <strong className="m4cf-cell m4cf-level-col" role="rowheader">{lv.label}</strong>
            {lv.cols.map((c, j) => (
              <span key={j} className={`m4cf-cell ${c.startsWith('✓') ? 'm4cf-yes' : 'm4cf-no'}`} role="cell">
                {c}
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="m4cf-mem">
        Memory logic: Free inside → Common outside → Factors move → Policies align.
      </p>
    </div>
  )
}

/* ============================================================ EU MARKET MAP */
/**
 * EuMarketMap — Europe markers, single market message.
 */
const FRANCE = { lon: 2.3, lat: 46.2, name: 'France' }

export function EuMarketMap() {
  const euFeatures = [
    { title: 'Single market', text: 'Deep internal market integration.' },
    { title: 'Customs union', text: 'Common external tariff toward outsiders.' },
    { title: 'Four freedoms', text: 'Goods · services · capital · people.' },
    { title: 'Euro area', text: 'Common currency for participating members.' },
    { title: '27 members', text: 'Current EU membership.' },
  ]

  return (
    <div className="ib-scene ib-m4-eu">
      <div className="m4eu-mapwrap">
        <WorldMap className="m4eu-map" showGraticule={false}>
          <MapPulse lon={europe.lon} lat={europe.lat} />
          <MapMarker lon={germany.lon} lat={germany.lat} name="Germany" role="Largest economy" kind="hq" side="top" i={0} />
          <MapMarker lon={FRANCE.lon} lat={FRANCE.lat} name="France" role="Core member" kind="hq" side="top-right" i={1} />
          <MapMarker lon={europe.lon} lat={europe.lat} name="Europe" role="Single market" kind="regional" side="top" i={2} />
          <MapMarker lon={uk.lon} lat={uk.lat} name="UK" role="Departed 2020" side="top-left" i={3} />
        </WorldMap>
      </div>
      <div className="m4eu-copy">
        <strong className="m4eu-title">EU — Single Market &amp; Integration Benchmark</strong>
        <ul className="m4eu-features">
          {euFeatures.map((f, i) => (
            <li key={f.title} style={{ '--i': i }}>
              <strong>{f.title}</strong>
              <span>{f.text}</span>
            </li>
          ))}
        </ul>
        <p className="m4eu-lock">
          EU = deep integration — single market + CET + mobility (+ euro for some).
        </p>
      </div>
    </div>
  )
}

/* ============================================================ NAFTA / USMCA MAP */
/**
 * NaftaUsmcaMap — Canada USA Mexico named; NAFTA→USMCA succession stamp.
 */
export function NaftaUsmcaMap() {
  const agreements = [
    { id: 'nafta',  label: 'NAFTA',  year: '1994', note: 'Landmark North American free-trade arrangement.' },
    { id: 'usmca',  label: 'USMCA',  year: 'Current', note: 'Successor agreement — preserve in modern answers.' },
  ]
  const themes = [
    'Agricultural tariff issues',
    'Non-tariff barriers',
    'Product origin rules',
    'Import protection disciplines',
  ]
  return (
    <div className="ib-scene ib-m4-nafta">
      <div className="m4na-mapwrap">
        <WorldMap className="m4na-map" showGraticule={false}>
          <MapPulse lon={canada.lon} lat={canada.lat} />
          <MapPulse lon={usa.lon}    lat={usa.lat} />
          <MapPulse lon={mexico.lon} lat={mexico.lat} />
          <MapMarker lon={canada.lon} lat={canada.lat} name="Canada" kind="hq"  side="top"    i={0} />
          <MapMarker lon={usa.lon}    lat={usa.lat}    name="United States" kind="hq" side="left" i={1} />
          <MapMarker lon={mexico.lon} lat={mexico.lat} name="Mexico" kind="hq"  side="bottom" i={2} />
        </WorldMap>
        <div className="m4na-stamp">
          {agreements.map((a, i) => (
            <div key={a.id} className={`m4na-agreement m4na-${a.id}`} style={{ '--i': i }}>
              <strong>{a.label}</strong>
              <span>{a.year}</span>
              <p>{a.note}</p>
            </div>
          ))}
          <em className="m4na-arrow" aria-hidden="true">→</em>
        </div>
      </div>
      <ul className="m4na-themes">
        {themes.map((t, i) => <li key={t} style={{ '--i': i }}>{t}</li>)}
      </ul>
      <p className="m4na-exam">
        Write "NAFTA (1994) succeeded by USMCA" to show both PPT terminology and current naming.
      </p>
    </div>
  )
}

/* ============================================================ ASEAN NETWORK MAP */
/**
 * AseanNetworkMap — SE Asia named members (readable subset + note).
 */
export function AseanNetworkMap() {
  const members = [
    { ...singapore,  role: 'Regional hub',    side: 'bottom', i: 0 },
    { ...indonesia,  role: '4th most populous', side: 'bottom', i: 1 },
    { ...thailand,   role: 'Production hub',  side: 'top',    i: 2 },
    { ...vietnam,    role: 'Manufacturing',   side: 'right',  i: 3 },
  ]
  const principles = [
    'Promote economic growth & social progress',
    'Regional peace & stability',
    'Collaborate on common interests',
    'Cooperate with other organisations',
  ]
  return (
    <div className="ib-scene ib-m4-asean">
      <div className="m4as-mapwrap">
        <WorldMap className="m4as-map" showGraticule={false}>
          {members.map(m => (
            <MapPulse key={m.name} lon={m.lon} lat={m.lat} />
          ))}
          {members.map(m => (
            <MapMarker
              key={m.name}
              lon={m.lon} lat={m.lat}
              name={m.name} role={m.role}
              kind="regional"
              side={m.side}
              i={m.i}
            />
          ))}
          <MapMarker lon={china.lon}    lat={china.lat}    name="China"  role="Major partner" kind="market" side="top"   i={4} />
          <MapMarker lon={india.lon}    lat={india.lat}    name="India"  role="Dialogue partner" kind="market" side="left" i={5} />
          <MapMarker lon={japan.lon}    lat={japan.lat}    name="Japan"  role="Investment source" kind="market" side="right" i={6} />
        </WorldMap>
        <p className="m4as-note">
          Visible: Singapore · Indonesia · Thailand · Vietnam — full membership: 10 nations.
        </p>
      </div>
      <div className="m4as-copy">
        <p className="m4as-fact">Founded 8 Aug 1967 · Bangkok · 10 members</p>
        <ul className="m4as-principles">
          {principles.map((p, i) => (
            <li key={p} style={{ '--i': i }}>{p}</li>
          ))}
        </ul>
        <p className="m4as-lock">
          ASEAN = production-and-demand network decision — not ten isolated countries.
        </p>
      </div>
    </div>
  )
}

/* ============================================================ SAARC PROGRESSION */
/**
 * SaarcProgression — SAARC→SAPTA→SAFTA with South Asia markers.
 */
export function SaarcProgression() {
  const progression = [
    {
      id: 'saarc',  label: 'SAARC',  year: '1985',
      note: 'Organisation: 8 members · Secretariat Kathmandu',
      sub: 'Welfare · development · collective self-reliance',
    },
    {
      id: 'sapta',  label: 'SAPTA',  year: '1993',
      note: 'Preferential Trading Arrangement',
      sub: 'First trade-liberalisation step · stepping stone',
    },
    {
      id: 'safta',  label: 'SAFTA',  year: 'Extended',
      note: 'South Asian Free Trade Area',
      sub: 'Deeper tariff liberalisation · FTA ambition',
    },
  ]
  const southAsiaMembers = [india, pakistan, bangladesh, nepal, sriLanka]

  return (
    <div className="ib-scene ib-m4-saarc">
      <div className="m4sc-mapwrap">
        <WorldMap className="m4sc-map" showGraticule={false}>
          {southAsiaMembers.map((m, i) => (
            <MapMarker
              key={m.name}
              lon={m.lon} lat={m.lat}
              name={m.name}
              kind="regional"
              side={['bottom', 'right', 'bottom-right', 'right', 'bottom'][i]}
              i={i}
            />
          ))}
          <MapPulse lon={india.lon} lat={india.lat} />
        </WorldMap>
      </div>
      <div className="m4sc-ladder">
        {progression.map((p, i) => (
          <div key={p.id} className={`m4sc-step m4sc-${p.id}`} style={{ '--i': i }}>
            <div className="m4sc-badge">
              <strong>{p.label}</strong>
              <span>{p.year}</span>
            </div>
            <div className="m4sc-text">
              <em>{p.note}</em>
              <p>{p.sub}</p>
            </div>
            {i < progression.length - 1 && <span className="m4sc-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <p className="m4sc-exam">
        Do not merge SAARC · SAPTA · SAFTA — keep the progression clear.
      </p>
    </div>
  )
}

/* ============================================================ BRICS CONSTELLATION */
/**
 * BricsConstellation — CORE five first, then CURRENT expansion stage visually separated.
 */
export function BricsConstellation() {
  const core = [
    { ...brazil,      role: 'Brazil',       i: 0 },
    { ...russia,      role: 'Russia',       i: 1 },
    { ...india,       role: 'India',        i: 2 },
    { ...china,       role: 'China',        i: 3 },
    { ...southAfrica, role: 'South Africa', i: 4 },
  ]
  const expanded = [
    { ...egypt,        role: 'Egypt (2024)',      i: 5 },
    { ...ethiopia,     role: 'Ethiopia (2024)',   i: 6 },
    { ...iran,         role: 'Iran (2024)',        i: 7 },
    { ...uae,          role: 'UAE (2024)',         i: 8 },
    { ...indonesia,    role: 'Indonesia (2025)',   i: 9 },
  ]
  return (
    <div className="ib-scene ib-m4-brics">
      <header className="m4br-head">
        <span>BRICS</span>
        <strong>Major emerging-economy cooperation platform</strong>
      </header>
      <div className="m4br-mapwrap">
        <WorldMap className="m4br-map" showGraticule>
          {core.map(m => (
            <MapPulse key={m.role} lon={m.lon} lat={m.lat} />
          ))}
          {core.map(m => (
            <MapMarker
              key={m.role}
              lon={m.lon} lat={m.lat}
              name={m.role}
              kind="hq"
              side="top"
              i={m.i}
            />
          ))}
          {expanded.map(m => (
            <MapMarker
              key={m.role}
              lon={m.lon} lat={m.lat}
              name={m.role}
              kind="regional"
              side="bottom"
              i={m.i}
            />
          ))}
        </WorldMap>
      </div>
      <div className="m4br-stages">
        <div className="m4br-core" style={{ '--i': 0 }}>
          <span>CORE FIVE (syllabus)</span>
          <ol>
            {core.map(c => <li key={c.role}>{c.role}</li>)}
          </ol>
        </div>
        <div className="m4br-expanded" style={{ '--i': 1 }}>
          <span>EXPANDED (current context)</span>
          <ol>
            {expanded.map(e => <li key={e.role}>{e.role}</li>)}
          </ol>
        </div>
      </div>
      <p className="m4br-exam">
        Lead with original five + cooperation purpose; add expansion only if the question asks.
      </p>
    </div>
  )
}

/* ============================================================ SYNTHESIS */
/**
 * GovernanceSynthesis — all motifs converge.
 */
export function GovernanceSynthesis() {
  const global = [
    { id: 'wto',    label: 'WTO',    sub: 'Trade rules' },
    { id: 'imf',    label: 'IMF',    sub: 'Money / BoP' },
    { id: 'unctad', label: 'UNCTAD', sub: 'Development' },
  ]
  const regional = [
    { id: 'eu',     label: 'EU' },
    { id: 'usmca',  label: 'USMCA' },
    { id: 'asean',  label: 'ASEAN' },
    { id: 'saarc',  label: 'SAARC / SAFTA' },
    { id: 'brics',  label: 'BRICS' },
  ]
  const effects = [
    'Market access',
    'Investment rules',
    'FX risk',
    'IP standards',
    'Supply-chain hubs',
    'Competition',
  ]
  return (
    <div className="ib-scene ib-m4-synth">
      <header className="m4sy-head">
        <span>Governance synthesis</span>
        <strong>One architecture — many levers</strong>
      </header>
      <div className="m4sy-arch">
        <div className="m4sy-layer m4sy-global" style={{ '--i': 0 }}>
          <span>Global governance</span>
          {global.map(g => (
            <div key={g.id} className={`m4sy-node m4sy-${g.id}`}>
              <strong>{g.label}</strong>
              <em>{g.sub}</em>
            </div>
          ))}
        </div>
        <div className="m4sy-layer m4sy-regional" style={{ '--i': 1 }}>
          <span>Regional governance</span>
          {regional.map(r => (
            <div key={r.id} className={`m4sy-node m4sy-${r.id}`}>
              <strong>{r.label}</strong>
            </div>
          ))}
        </div>
        <div className="m4sy-layer m4sy-firm" style={{ '--i': 2 }}>
          <span>Business effects</span>
          <div className="m4sy-effects">
            {effects.map((e, i) => (
              <span key={e} className="m4sy-effect" style={{ '--i': i }}>{e}</span>
            ))}
          </div>
        </div>
        <div className="m4sy-q" style={{ '--i': 3 }}>
          <strong>Managerial question</strong>
          <em>Which rulebook changes this decision?</em>
        </div>
      </div>
    </div>
  )
}

/* ============================================================ PAYOFF */
/**
 * GovernancePayoff — Opportunity + Judgment + Insight + Governance equation
 * + Module 5 seam.
 */
export function GovernancePayoff() {
  const chapters = [
    { n: 'Ⅰ', title: 'Opportunity',  tagline: 'Discovered the global market' },
    { n: 'Ⅱ', title: 'Judgment',     tagline: 'Taught evaluation of country climate' },
    { n: 'Ⅲ', title: 'Insight',      tagline: 'Explained why trade and competitiveness emerge' },
    { n: 'Ⅳ', title: 'Governance',   tagline: 'Institutions and blocs that regulate the system', active: true },
  ]
  const capabilities = [
    'Map the architecture — WTO · IMF · UNCTAD and why each exists',
    'Explain agreements — TRIPS vs TRIMS with business meaning',
    'Climb the ladder — PTA to Political Union with clear distinctions',
    'Read the blocs — EU · USMCA · ASEAN · SAARC–SAPTA–SAFTA · BRICS',
  ]
  return (
    <div className="ib-scene ib-m4-payoff">
      <div className="m4pf-equation" aria-label="Module progression">
        {chapters.map((ch, i) => (
          <div
            key={ch.n}
            className={`m4pf-ch m4pf-ch-${i + 1}${ch.active ? ' m4pf-active' : ''}`}
            style={{ '--i': i }}
          >
            <strong>{ch.n}</strong>
            <span>{ch.title}</span>
            <em>{ch.tagline}</em>
          </div>
        ))}
      </div>
      <div className="m4pf-lock">
        <strong>Global business crosses borders. Governance determines the rules of crossing them.</strong>
      </div>
      <ul className="m4pf-caps">
        {capabilities.map((c, i) => (
          <li key={c} style={{ '--i': i }}>{c}</li>
        ))}
      </ul>
      <div className="m4pf-seam" style={{ '--i': 4 }}>
        <strong>Next:</strong>
        <span>Ⅴ — AMBITION — building and competing as a multinational enterprise within the governed world economy.</span>
      </div>
    </div>
  )
}

/* ============================================================ CANVAS EXPORTS */
/**
 * AseanHubCanvas — ASEAN production-hub decision canvas.
 */
export function AseanHubCanvas() {
  const hubs = [
    { ...singapore,  focus: 'Finance · HQ · logistics',    kind: 'hq',       side: 'bottom' },
    { ...indonesia,  focus: 'Manufacturing · resources',    kind: 'mfg',      side: 'bottom' },
    { ...thailand,   focus: 'Auto · food · EV assembly',   kind: 'mfg',      side: 'top'    },
    { ...vietnam,    focus: 'Electronics · textiles',       kind: 'mfg',      side: 'right'  },
    { ...india,      focus: 'Tech · pharma · services',     kind: 'regional', side: 'left'   },
    { ...china,      focus: 'Demand + supply chain',        kind: 'market',   side: 'top'    },
    { ...japan,      focus: 'Investment · technology',      kind: 'hq',       side: 'right'  },
  ]
  return (
    <div className="ib-scene ib-m4-asean-hub">
      <div className="m4ah-mapwrap">
        <WorldMap className="m4ah-map" showGraticule={false}>
          <MapPulse lon={singapore.lon} lat={singapore.lat} />
          {hubs.map((h, i) => (
            <MapMarker
              key={h.name}
              lon={h.lon} lat={h.lat}
              name={h.name} role={h.focus}
              kind={h.kind}
              side={h.side}
              i={i}
            />
          ))}
        </WorldMap>
      </div>
      <p className="m4ah-insight">
        ASEAN is a network decision — evaluate hub-and-spoke production against logistics, talent,
        incentives and rules of origin.
      </p>
    </div>
  )
}

/**
 * BricsScanCanvas — BRICS market scan with geopolitical notes.
 */
export function BricsScanCanvas() {
  const scan = [
    { ...brazil,      note: 'Agri · minerals · consumer market',       risk: 'Medium' },
    { ...russia,      note: 'Energy · commodities',                     risk: 'High' },
    { ...india,       note: 'Tech · pharma · services · infra',         risk: 'Low-Med' },
    { ...china,       note: 'Manufacturing scale · consumer growth',    risk: 'Medium' },
    { ...southAfrica, note: 'Africa gateway · mining · finance hub',    risk: 'Medium' },
  ]
  return (
    <div className="ib-scene ib-m4-brics-scan">
      <div className="m4bs-mapwrap">
        <WorldMap className="m4bs-map" showGraticule>
          {scan.map((s, i) => (
            <MapMarker
              key={s.name}
              lon={s.lon} lat={s.lat}
              name={s.name}
              role={s.note}
              kind="hq"
              side="top"
              i={i}
            />
          ))}
        </WorldMap>
      </div>
      <div className="m4bs-table">
        {scan.map((s, i) => (
          <div key={s.name} className="m4bs-row" style={{ '--i': i }}>
            <strong>{s.name}</strong>
            <span>{s.note}</span>
            <em className={`m4bs-risk m4bs-risk-${s.risk.toLowerCase().replace(/\s/g, '-')}`}>
              {s.risk}
            </em>
          </div>
        ))}
      </div>
      <p className="m4bs-note">
        Underwrite each country on its own risk, rules and logistics reality.
      </p>
    </div>
  )
}

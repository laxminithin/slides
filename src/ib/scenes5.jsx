/**
 * International Business — Module 5 signature scenes (AMBITION).
 *
 * Visual grammar: GROW → EXPAND → ORGANIZE → TRANSFER → COMPETE
 * Motion lives in ibChapter5.css. Frozen V7 engine untouched.
 * Do NOT import from scenes.jsx / scenes2.jsx / scenes3.jsx / scenes4.jsx.
 */

import {
  WorldMap, MapMarker, MapPulse, MARKETS, project,
} from './worldmap'

const { usa, india, china, germany, singapore, brazil, japan, europe, uk, uae } = MARKETS

/* ── Local teaching coordinates ─────────────────────────────────────────── */
const australia  = { lon: 134,  lat: -25,  name: 'Australia' }
const southAfrica = { lon: 25,   lat: -29,  name: 'South Africa' }
const canada     = { lon: -106, lat: 56,   name: 'Canada' }
const mexico     = { lon: -102, lat: 23,   name: 'Mexico' }

/* ── Shared data ─────────────────────────────────────────────────────────── */
const AMBITION_PATH = ['Grow', 'Expand', 'Organize', 'Transfer', 'Compete']

const MNC_CHARACTERISTICS = [
  { id: 'size',      label: 'Huge Size',                          tag: 'SCALE',       angle: 0   },
  { id: 'ops',       label: 'International Operations',           tag: 'OPERATIONS',  angle: 36  },
  { id: 'power',     label: 'Oligopolistic Power',                tag: 'POWER',       angle: 72  },
  { id: 'resources', label: 'Transfer of Resources',              tag: 'RESOURCES',   angle: 108 },
  { id: 'market',    label: 'International Market',               tag: 'MARKETS',     angle: 144 },
  { id: 'tech',      label: 'Refined Technology',                 tag: 'TECHNOLOGY',  angle: 180 },
  { id: 'mgmt',      label: 'Professional Management',            tag: 'MANAGEMENT',  angle: 216 },
  { id: 'control',   label: 'Single Managerial Control',          tag: 'CONTROL',     angle: 252 },
  { id: 'scale',     label: 'Economies of Scale',                 tag: 'EFFICIENCY',  angle: 288 },
  { id: 'integrate', label: 'Integrated Worldwide Business System', tag: 'INTEGRATION', angle: 324 },
]

const GROWTH_FACTORS = [
  'Capital', 'Technology', 'Skill', 'Exports', 'Level of Integration',
  'Welfare of the Citizens', 'Investing in Local Labour',
  'Developing a Country through FDI', 'Political Improvement',
  'FDI through MNCs is Far Easier',
]

const HOST_BENEFITS = [
  'Worldwide market access', 'Capital investment', 'Technology via R&D',
  'Local supplier development', 'Job creation', 'Advanced training',
  'Managerial talent access', 'Better products / lower cost', 'Export contribution',
]

const PILLARS_FOUNDATIONS = [
  'Institutions', 'Infrastructure', 'Macroeconomic Stability', 'Health and Primary Education', 'Higher Education and Training',
]
const PILLARS_EFFICIENCY = [
  'Goods Market Efficiency', 'Labour Market Efficiency', 'Financial Market Sophistication',
]
const PILLARS_CAPABILITY = [
  'Technological Readiness', 'Market Size', 'Business Sophistication', 'Innovation',
]

const PILLARS_ARCHITECTURE = [
  { id: 'found', label: 'FOUNDATIONS', pillars: ['Institutions', 'Infrastructure', 'Macroeconomic Stability', 'Health and Primary Education'], base: 0 },
  { id: 'eff',   label: 'EFFICIENCY', pillars: ['Higher Education and Training', 'Goods Market Efficiency', 'Labour Market Efficiency', 'Financial Market Sophistication', 'Technological Readiness'], base: 4 },
  { id: 'cap',   label: 'SOPHISTICATION', pillars: ['Market Size', 'Business Sophistication', 'Innovation'], base: 9 },
]

const STRUCTURES = [
  { id: 'intl',  label: 'International Division', fit: 'Early expansion' },
  { id: 'func',  label: 'Functional',             fit: 'Shared expertise' },
  { id: 'prod',  label: 'Product',                fit: 'Product-led global brands' },
  { id: 'geo',   label: 'Geographic',             fit: 'Regional autonomy' },
  { id: 'matrix',label: 'Matrix',                 fit: 'Dual reporting complexity' },
  { id: 'mixed', label: 'Mixed / Hybrid',         fit: 'Mature global enterprise' },
]

/* ============================================================ OPENER ===== */
export function AmbitionOpener({ module = 5 }) {
  const nodes = [
    { x: 18, y: 42, label: 'HQ', phase: 0 },
    { x: 32, y: 28, label: 'Region A', phase: 1 },
    { x: 48, y: 38, label: 'Region B', phase: 2 },
    { x: 62, y: 22, label: 'Region C', phase: 3 },
    { x: 78, y: 35, label: 'Region D', phase: 4 },
    { x: 88, y: 48, label: 'Global', phase: 5 },
  ]
  return (
    <div className="ib-scene ib-m5-opener" data-slide-content="true">
      <div className="m5o-stage" aria-hidden="true">
        <div className="m5o-hq-local">
          <span className="m5o-hq-label">LOCAL HQ</span>
          <div className="m5o-hq-block" />
        </div>
        <svg className="m5o-network" viewBox="0 0 100 60" preserveAspectRatio="none">
          {nodes.slice(1).map((n, i) => (
            <line
              key={n.label}
              className="m5o-branch"
              x1={nodes[0].x} y1={nodes[0].y}
              x2={n.x} y2={n.y}
              style={{ '--i': i }}
            />
          ))}
          {nodes.map((n, i) => (
            <g key={n.label} className="m5o-node" style={{ '--i': i, '--phase': n.phase }}>
              <circle cx={n.x} cy={n.y} r={i === 0 ? 4 : 2.8} />
              {i > 0 && <text x={n.x} y={n.y - 5} className="m5o-node-label">{n.label}</text>}
            </g>
          ))}
        </svg>
        <div className="m5o-globe-hint">Global network emerging</div>
      </div>
      <div className="m5o-copy">
        <p className="m5o-eyebrow">
          International Business · 22MBA401 · Chapter {String(module).padStart(2, '0')}
        </p>
        <h1 className="m5o-title">Ⅴ Ambition</h1>
        <p className="m5o-sub">Multinational Corporations &amp; Global Competitiveness</p>
        <p className="m5o-hint">
          A company dominates at home — then ambition pulls it outward into a coordinated global enterprise.
        </p>
        <ol className="m5o-path" aria-label="Chapter journey">
          {AMBITION_PATH.map((step, i) => (
            <li key={step} style={{ '--i': i }}>
              <span>{step}</span>
              {i < AMBITION_PATH.length - 1 && <em aria-hidden="true">→</em>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

/* ============================================================ HOOK ======= */
export function AmbitionHook() {
  const forces = [
    'Markets', 'Capital', 'Technology', 'Resources', 'Scale', 'Competition',
  ]
  return (
    <div className="ib-scene ib-m5-hook">
      <div className="m5h-core-wrap" role="img" aria-label="Domestic success pulling outward">
        <div className="m5h-domestic">
          <span>DOMESTIC</span>
          <strong>SUCCESS</strong>
        </div>
        <div className="m5h-pull" aria-hidden="true">
          {forces.map((f, i) => (
            <span key={f} className="m5h-force" style={{ '--i': i, '--total': forces.length }}>
              {f}
            </span>
          ))}
        </div>
      </div>
      <p className="m5h-lock">
        Domestic dominance creates capacity — markets, capital and competition pull the firm beyond borders.
      </p>
    </div>
  )
}

/* ============================================================ JOURNEY ===== */
export function AmbitionJourney() {
  const steps = [
    { id: 'grow',     label: 'Grow',     note: 'Home-market strength' },
    { id: 'expand',   label: 'Expand',   note: 'Cross-border operations' },
    { id: 'organize', label: 'Organize', note: 'Global structure' },
    { id: 'transfer', label: 'Transfer', note: 'Technology & know-how' },
    { id: 'compete',  label: 'Compete',  note: 'Global capability' },
  ]
  return (
    <div className="ib-scene ib-m5-journey">
      <header className="m5j-head">
        <span>Chapter map</span>
        <strong>From domestic business to global competitiveness</strong>
      </header>
      <div className="m5j-track">
        {steps.map((s, i) => (
          <div key={s.id} className={`m5j-step m5j-${s.id}`} style={{ '--i': i }}>
            <div className="m5j-hq-motif" aria-hidden="true">
              <span className="m5j-hq-dot" />
              {i > 0 && <span className="m5j-hq-ring" />}
            </div>
            <strong>{s.label}</strong>
            <em>{s.note}</em>
            {i < steps.length - 1 && <span className="m5j-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <p className="m5j-path">Grow → Expand → Organize → Transfer → Compete</p>
    </div>
  )
}

/* ============================================================ MNC DEFINE */
export function MncDefinitionVisual() {
  const layers = [
    { id: 'domestic', label: 'Domestic firm', items: ['One market', 'Local control'] },
    { id: 'mnc',      label: 'Multinational', items: ['Multi-country', 'Coordinated control', 'Resource integration'] },
  ]
  return (
    <div className="ib-scene ib-m5-define">
      <header className="m5df-head">
        <span>Definition</span>
        <strong>Domestic company transforms into MNC</strong>
      </header>
      <div className="m5df-transform">
        {layers.map((l, i) => (
          <article key={l.id} className={`m5df-layer m5df-${l.id}`} style={{ '--i': i }}>
            <strong>{l.label}</strong>
            <ul>
              {l.items.map(item => <li key={item}>{item}</li>)}
            </ul>
            {l.id === 'domestic' && (
              <div className="m5df-hq-single" aria-hidden="true">
                <span>HQ</span>
              </div>
            )}
            {l.id === 'mnc' && (
              <div className="m5df-hq-network" aria-hidden="true">
                <span className="m5df-hq-centre">HQ</span>
                {['USA', 'EU', 'Asia'].map((r, j) => (
                  <span key={r} className="m5df-country" style={{ '--i': j }}>{r}</span>
                ))}
              </div>
            )}
          </article>
        ))}
        <div className="m5df-arrow" aria-hidden="true">→</div>
      </div>
      <p className="m5df-lock">MNC = coordinated cross-border ownership and control — not isolated local shops.</p>
    </div>
  )
}

/* ============================================================ MNC VS ===== */
export function MncVsDomesticVisual() {
  return (
    <div className="ib-scene ib-m5-vs">
      <header className="m5vs-head">
        <span>Contrast</span>
        <strong>Domestic success ≠ multinational capability</strong>
      </header>
      <div className="m5vs-split">
        <article className="m5vs-domestic" style={{ '--i': 0 }}>
          <strong>Domestic firm</strong>
          <ul>
            <li>One primary market</li>
            <li>Local regulation &amp; currency</li>
            <li>Limited cross-border control</li>
          </ul>
        </article>
        <div className="m5vs-divider" aria-hidden="true" />
        <article className="m5vs-mnc" style={{ '--i': 1 }}>
          <strong>MNC</strong>
          <ul>
            <li>Multi-country operations</li>
            <li>Cross-border coordination</li>
            <li>Technology &amp; resource transfer</li>
          </ul>
        </article>
      </div>
      <p className="m5vs-takeaway">Exporting reaches markets; multinational status redesigns the firm.</p>
    </div>
  )
}

/* ============================================================ ANATOMY === */
export function MncAnatomy() {
  return (
    <div className="ib-scene ib-m5-anatomy is-hero">
      <header className="m5an-head">
        <span>Nature of MNCs</span>
        <strong>Ten characteristics — enterprise anatomy</strong>
      </header>
      <div className="m5an-stage" role="img" aria-label="MNC characteristics around global enterprise centre">
        <div className="m5an-core">
          <span>GLOBAL</span>
          <strong>ENTERPRISE</strong>
        </div>
        {MNC_CHARACTERISTICS.map((c, i) => (
          <div
            key={c.id}
            className={`m5an-limb m5an-${c.id}`}
            style={{ '--i': i, '--angle': `${c.angle}deg` }}
          >
            <span className="m5an-tag">{c.tag}</span>
            <strong>{c.label}</strong>
          </div>
        ))}
      </div>
      <p className="m5an-exam">List all ten PPT characteristics with one line of meaning each.</p>
    </div>
  )
}

/* ============================================================ NATURE SCALE */
export function NatureScaleVisual() {
  const items = [
    { title: 'Huge Size', text: 'Large capital, assets, employment and multi-market footprint.' },
    { title: 'International Operations', text: 'Production, sales, finance or services in multiple countries.' },
    { title: 'Oligopolistic Power', text: 'Often compete in industries dominated by a few global players.' },
    { title: 'International Market', text: 'Serve customers across national borders.' },
    { title: 'Economies of Scale', text: 'Spread fixed costs across a larger volume base.' },
  ]
  return (
    <div className="ib-scene ib-m5-nature-scale">
      <header className="m5ns-head">
        <span>Characteristics 1–5</span>
        <strong>Scale, operations &amp; market power</strong>
      </header>
      <div className="m5ns-cluster">
        {items.map((item, i) => (
          <article key={item.title} className="m5ns-item" style={{ '--i': i }}>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <p className="m5ns-lock">Scale without coordination is waste; scale with coordination is advantage.</p>
    </div>
  )
}

/* ============================================================ NATURE CONTROL */
export function NatureControlVisual() {
  const items = [
    { title: 'Transfer of Resources', text: 'Capital, skills, brands and know-how move across borders.' },
    { title: 'Refined Technology', text: 'Advanced processes and systems differentiate MNCs.' },
    { title: 'Professional Management', text: 'Specialised managers run complex multi-country operations.' },
    { title: 'Single Managerial Control', text: 'A coordinating centre aligns strategy across units.' },
    { title: 'Integrated Worldwide Business System', text: 'Subsidiaries linked — not run as unrelated companies.' },
  ]
  return (
    <div className="ib-scene ib-m5-nature-control">
      <header className="m5nc-head">
        <span>Characteristics 6–10</span>
        <strong>Resources, technology &amp; managerial control</strong>
      </header>
      <div className="m5nc-cluster">
        {items.map((item, i) => (
          <article key={item.title} className="m5nc-item" style={{ '--i': i }}>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <p className="m5nc-lock">Nature = scale + technology + professional control + worldwide integration.</p>
    </div>
  )
}

/* ============================================================ GROWTH INTRO */
export function GrowthEngineIntro() {
  const stages = [
    { id: 'input', label: 'INPUT', note: 'Capital · Tech · Skill · Policy' },
    { id: 'cap',   label: 'CAPABILITY', note: 'Ability to invest &amp; operate abroad' },
    { id: 'exp',   label: 'EXPANSION', note: 'Foreign operations &amp; market scale' },
  ]
  return (
    <div className="ib-scene ib-m5-growth-intro">
      <header className="m5gi-head">
        <span>Growth logic</span>
        <strong>Cause and effect — not a shopping list</strong>
      </header>
      <div className="m5gi-pipeline">
        {stages.map((s, i) => (
          <div key={s.id} className={`m5gi-stage m5gi-${s.id}`} style={{ '--i': i }}>
            <strong>{s.label}</strong>
            <em>{s.note}</em>
            {i < stages.length - 1 && <span className="m5gi-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <p className="m5gi-lock">Each growth factor works through a chain: capability → expansion → further advantage.</p>
    </div>
  )
}

/* ============================================================ GROWTH ===== */
export function GrowthEngine() {
  const notes = {
    Capital: 'Funds large overseas projects',
    Technology: 'Makes foreign production viable',
    Skill: 'Managerial ability to run complex ops',
    Exports: 'Early international sales create demand pull',
    'Level of Integration': 'Linking activities raises efficiency',
    'Welfare of the Citizens': 'Rising demand opens host opportunities',
    'Investing in Local Labour': 'Local employment builds acceptance',
    'Developing a Country through FDI': 'Host development invites MNCs',
    'Political Improvement': 'Stability reduces investment risk',
    'FDI through MNCs is Far Easier': 'Packages capital, tech and management',
  }
  return (
    <div className="ib-scene ib-m5-growth">
      <header className="m5gr-head">
        <span>Positive growth factors</span>
        <strong>Ten drivers behind multinational enterprise</strong>
      </header>
      <div className="m5gr-engine">
        {GROWTH_FACTORS.map((f, i) => (
          <article key={f} className="m5gr-factor" style={{ '--i': i }}>
            <span className="m5gr-num">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <strong>{f}</strong>
              <p>{notes[f]}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="m5gr-exam">Write growth factors as cause→effect pairs, not bare bullets.</p>
    </div>
  )
}

/* ============================================================ HOST-HOME BRIDGE */
export function HostHomeBridge() {
  const flows = [
    { from: 'home', to: 'host', label: 'Capital &amp; technology out' },
    { from: 'host', to: 'home', label: 'Profits &amp; intelligence back' },
    { from: 'host', to: 'host', label: 'Jobs · suppliers · exports' },
  ]
  return (
    <div className="ib-scene ib-m5-bridge">
      <header className="m5br-head">
        <span>Stakeholder lens</span>
        <strong>HOME ↔ HOST — same firm, different calculus</strong>
      </header>
      <div className="m5br-stage">
        <div className="m5br-home" style={{ '--i': 0 }}>
          <strong>HOME</strong>
          <span>HQ country</span>
        </div>
        <div className="m5br-flows">
          {flows.map((f, i) => (
            <div key={f.label} className={`m5br-flow m5br-${f.from}-${f.to}`} style={{ '--i': i }}>
              <span className="m5br-arrow" aria-hidden="true">
                {f.from === 'home' ? '→' : '←'}
              </span>
              <em>{f.label}</em>
            </div>
          ))}
        </div>
        <div className="m5br-host" style={{ '--i': 1 }}>
          <strong>HOST</strong>
          <span>Operating country</span>
        </div>
      </div>
      <p className="m5br-lock">Do not label MNC impact as simply good or bad — specify for whom.</p>
    </div>
  )
}

/* ============================================================ HOST BENEFITS */
export function HostBenefitsVisual() {
  return (
    <div className="ib-scene ib-m5-host">
      <header className="m5ho-head">
        <span>Host country</span>
        <strong>Benefits accumulate when linkages work</strong>
      </header>
      <ul className="m5ho-stack">
        {HOST_BENEFITS.map((b, i) => (
          <li key={b} className="m5ho-benefit" style={{ '--i': i }}>
            <span className="m5ho-bar" aria-hidden="true" />
            <strong>{b}</strong>
          </li>
        ))}
      </ul>
      <p className="m5ho-lock">Host benefits span markets, capital, technology, labour and exports.</p>
    </div>
  )
}

/* ============================================================ HOME BENEFITS */
export function HomeBenefitsVisual() {
  const benefits = [
    { title: 'Economical growth', text: 'Overseas earnings and scale support home growth.' },
    { title: 'Employment opportunities', text: 'HQ, R&D and high-skill roles expand at home.' },
    { title: 'Export expansion', text: 'Foreign operations pull finished-goods exports from home.' },
  ]
  return (
    <div className="ib-scene ib-m5-home">
      <header className="m5hm-head">
        <span>Home country</span>
        <strong>Growth, jobs and export-led expansion</strong>
      </header>
      <div className="m5hm-items">
        {benefits.map((b, i) => (
          <article key={b.title} className="m5hm-item" style={{ '--i': i }}>
            <strong>{b.title}</strong>
            <p>{b.text}</p>
          </article>
        ))}
      </div>
      <p className="m5hm-lock">Home gains are growth, employment and export expansion — not automatic for every industry.</p>
    </div>
  )
}

/* ============================================================ VALUE VS RISK */
export function ValueVsRisk() {
  const value = ['Investment', 'Jobs', 'Technology', 'Market access', 'Consumer choice']
  const risks = ['Repatriation', 'Culture', 'Sovereignty', 'Thin linkages', 'Capability loss']
  return (
    <div className="ib-scene ib-m5-balance is-hero">
      <header className="m5bl-head">
        <span>Executive balance</span>
        <strong>VALUE vs RISKS — context dependent</strong>
      </header>
      <div className="m5bl-scale">
        <div className="m5bl-side m5bl-value" style={{ '--i': 0 }}>
          <strong>VALUE</strong>
          <ul>{value.map(v => <li key={v}>{v}</li>)}</ul>
        </div>
        <div className="m5bl-beam" aria-hidden="true">
          <span className="m5bl-pivot" />
        </div>
        <div className="m5bl-side m5bl-risk" style={{ '--i': 1 }}>
          <strong>RISKS</strong>
          <ul>{risks.map(r => <li key={r}>{r}</li>)}</ul>
        </div>
      </div>
      <p className="m5bl-context">
        Net impact depends on industry, policy, strategy, host economy, governance and firm behaviour.
      </p>
      <p className="m5bl-rule">Judge by linkages created — not by the MNC logo alone.</p>
    </div>
  )
}

/* ============================================================ HOST RISKS */
export function HostRisksVisual() {
  const risks = [
    { title: 'Resource drain', text: 'Profits prioritised over local development linkages.' },
    { title: 'FX strain', text: 'Imports, royalties and remittances pressure reserves.' },
    { title: 'Thin technology transfer', text: 'Know-how may stay locked inside the MNC.' },
    { title: 'Limited employment', text: 'Capital-intensive plants create fewer jobs than expected.' },
    { title: 'Sovereignty concerns', text: 'Policy influence and regulatory pressure.' },
    { title: 'Cultural influence', text: 'Consumer habits and local norms shift.' },
  ]
  return (
    <div className="ib-scene ib-m5-host-risk">
      <header className="m5hr-head">
        <span>Host challenges</span>
        <strong>Analytical consequences — not alarm</strong>
      </header>
      <div className="m5hr-grid">
        {risks.map((r, i) => (
          <article key={r.title} className="m5hr-item" style={{ '--i': i }}>
            <strong>{r.title}</strong>
            <p>{r.text}</p>
          </article>
        ))}
      </div>
      <p className="m5hr-lock">Host risks = resource/FX pressure, weak transfer, thin jobs, sovereignty and culture.</p>
    </div>
  )
}

/* ============================================================ HOME RISKS */
export function HomeRisksVisual() {
  const risks = [
    { title: 'Loss of employment', text: 'Production or services relocated overseas.' },
    { title: 'Repatriation issues', text: 'Returning profits, people or operations contested politically.' },
    { title: 'Losing competitive advantage', text: 'Know-how leakage or hollowed domestic capability.' },
  ]
  return (
    <div className="ib-scene ib-m5-home-risk">
      <header className="m5hmr-head">
        <span>Home challenges</span>
        <strong>Jobs, repatriation &amp; capability loss</strong>
      </header>
      <div className="m5hmr-items">
        {risks.map((r, i) => (
          <article key={r.title} className="m5hmr-item" style={{ '--i': i }}>
            <strong>{r.title}</strong>
            <p>{r.text}</p>
          </article>
        ))}
      </div>
      <p className="m5hmr-lock">Home risks centre on jobs, repatriation and capability loss.</p>
    </div>
  )
}

/* ============================================================ INDIA TL === */
export function IndiaTimeline() {
  const eras = [
    { id: 'colonial', label: 'Colonial era', note: 'East India Company · Dutch VOC', year: '1600s–1947' },
    { id: 'pre91',    label: 'Pre-1991', note: 'Select MNCs · controlled FDI climate', year: '1947–1991' },
    { id: 'liberal',  label: '1991 reforms', note: 'Liberalization opens FDI pathways', year: '1991' },
    { id: 'modern',   label: 'Modern India', note: 'Thousands of MNCs · services + industry', year: '2000s–' },
  ]
  return (
    <div className="ib-scene ib-m5-india-tl">
      <header className="m5it-head">
        <span>MNCs in India</span>
        <strong>Colonial trading companies to modern global presence</strong>
      </header>
      <ol className="m5it-rail">
        {eras.map((e, i) => (
          <li key={e.id} className={`m5it-era m5it-${e.id}`} style={{ '--i': i }}>
            <span className="m5it-year">{e.year}</span>
            <strong>{e.label}</strong>
            <em>{e.note}</em>
          </li>
        ))}
      </ol>
      <p className="m5it-lock">Liberalization → FDI → market access → MNC expansion in India.</p>
    </div>
  )
}

/* ============================================================ INDIA EXAMPLES */
export function IndiaExamplesVisual() {
  const eras = [
    { title: 'Pre-Independence', names: 'Philips · Siemens · Unilever · GE · Standard Chartered' },
    { title: 'Post-Independence', names: 'Shell (subsidiary established 1928)' },
    { title: 'Modern era', names: 'IBM · Microsoft · Google · Nestlé · Coca-Cola · Pfizer · TCS' },
  ]
  return (
    <div className="ib-scene ib-m5-india-ex">
      <header className="m5ie-head">
        <span>PPT examples</span>
        <strong>Three eras — names as elegant text</strong>
      </header>
      <div className="m5ie-eras">
        {eras.map((e, i) => (
          <article key={e.title} className="m5ie-era" style={{ '--i': i }}>
            <strong>{e.title}</strong>
            <p className="m5ie-names">{e.names}</p>
          </article>
        ))}
      </div>
      <p className="m5ie-note">TCS reminds students: MNCs in India includes Indian firms that became multinational.</p>
    </div>
  )
}

/* ============================================================ INDIA OUTBOUND */
export function IndiaOutbound() {
  const firms = [
    { name: 'Tata Group', role: 'Industrial · auto · steel' },
    { name: 'TCS', role: 'IT services · global delivery' },
    { name: 'Infosys', role: 'Digital · consulting' },
    { name: 'Mahindra', role: 'Auto · farm equipment' },
    { name: 'Reliance', role: 'Energy · telecom · retail' },
    { name: 'Airtel', role: 'Telecom · Africa · SE Asia' },
  ]
  const routes = [
    { to: [usa.lon, usa.lat] },
    { to: [uk.lon, uk.lat] },
    { to: [germany.lon, germany.lat] },
    { to: [singapore.lon, singapore.lat] },
    { to: [uae.lon, uae.lat] },
    { to: [australia.lon, australia.lat] },
  ]
  return (
    <div className="ib-scene ib-m5-outbound">
      <header className="m5ob-head">
        <span>Outbound ambition</span>
        <strong>India as HOME BASE — firms expand out</strong>
      </header>
      <div className="m5ob-stage">
        <div className="m5ob-mapwrap" aria-hidden="true">
          <WorldMap className="m5ob-map" showGraticule={false}>
            <MapPulse lon={india.lon} lat={india.lat} />
            {routes.map((r, i) => {
              const A = project(india.lon, india.lat)
              const B = project(r.to[0], r.to[1])
              const cx = (A.x + B.x) / 2
              const cy = (A.y + B.y) / 2 - 30
              const d = `M${A.x} ${A.y} Q${cx} ${cy} ${B.x} ${B.y}`
              return <path key={i} className="m5ob-route" d={d} style={{ '--i': i }} />
            })}
            <MapMarker lon={india.lon} lat={india.lat} name="India HQ" kind="hq" side="top" i={0} />
          </WorldMap>
        </div>
        <ul className="m5ob-firms">
          {firms.map((f, i) => (
            <li key={f.name} className="m5ob-firm" style={{ '--i': i }}>
              <strong>{f.name}</strong>
              <span>{f.role}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="m5ob-lock">Ambition is two-directional: inbound FDI and outbound Indian MNCs.</p>
    </div>
  )
}

/* ============================================================ INDIA OPP ===== */
export function IndiaOpportunitiesVisual() {
  const accelerators = [
    'Rapid Domestic Economic Growth',
    'International Expansion Strategy',
    'Factor Mobility',
    'Economic Reforms',
    'Market Potential',
    'Communication Technology',
  ]
  return (
    <div className="ib-scene ib-m5-india-opp">
      <header className="m5io-head">
        <span>Current opportunities</span>
        <strong>Six PPT drivers activating outward ambition</strong>
      </header>
      <div className="m5io-grid">
        {accelerators.map((a, i) => (
          <article key={a} className="m5io-acc" style={{ '--i': i }}>
            <span className="m5io-num">{i + 1}</span>
            <strong>{a}</strong>
          </article>
        ))}
      </div>
      <p className="m5io-lock">PPT opportunities + digital/manufacturing capability = modern Indian MNC runway.</p>
    </div>
  )
}

/* ============================================================ STRUCT NEED */
export function StructureNeed() {
  return (
    <div className="ib-scene ib-m5-struct-need">
      <header className="m5sn-head">
        <span>Structure question</span>
        <strong>Complex network — how to organize?</strong>
      </header>
      <div className="m5sn-network" role="img" aria-label="Complex multinational network">
        <div className="m5sn-hq">HQ</div>
        {['Subsidiary A', 'Subsidiary B', 'JV', 'Regional hub', 'R&D', 'Sales'].map((n, i) => (
          <span key={n} className="m5sn-node" style={{ '--i': i }}>{n}</span>
        ))}
        <svg className="m5sn-lines" viewBox="0 0 100 60" preserveAspectRatio="none">
          {[20, 35, 50, 65, 80, 90].map((x, i) => (
            <line key={i} x1="50" y1="30" x2={x} y2={10 + (i % 3) * 18} className="m5sn-link" style={{ '--i': i }} />
          ))}
        </svg>
      </div>
      <p className="m5sn-question">Which structure fits your strategy, scale and control needs?</p>
    </div>
  )
}

/* ============================================================ ORG INTL === */
export function OrgInternational() {
  return (
    <div className="ib-scene ib-m5-org-intl">
      <header className="m5oi-head">
        <span>International Division</span>
        <strong>CEO/HQ → Domestic + International Division</strong>
      </header>
      <div className="m5oi-tree">
        <div className="m5oi-ceo" style={{ '--i': 0 }}>CEO / HQ</div>
        <div className="m5oi-branches">
          <div className="m5oi-branch m5oi-domestic" style={{ '--i': 1 }}>
            <strong>Domestic Division</strong>
            <span>Home market operations</span>
          </div>
          <div className="m5oi-branch m5oi-intl" style={{ '--i': 2 }}>
            <strong>International Division</strong>
            <span>All foreign markets</span>
            <div className="m5oi-markets">
              {['Market 1', 'Market 2', 'Market 3'].map((m, j) => (
                <span key={m} style={{ '--i': j }}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="m5oi-fit">Early expansion — keeps foreign ops separate from domestic core.</p>
    </div>
  )
}

/* ============================================================ ORG FUNC === */
export function OrgFunctional() {
  const functions = ['Marketing', 'Finance', 'Operations', 'HR']
  const regions = ['Americas', 'Europe', 'Asia-Pacific']
  return (
    <div className="ib-scene ib-m5-org-func">
      <header className="m5of-head">
        <span>Functional structure</span>
        <strong>Functions span countries</strong>
      </header>
      <div className="m5of-grid">
        {functions.map((fn, i) => (
          <div key={fn} className="m5of-func" style={{ '--i': i }}>
            <strong>{fn}</strong>
            <div className="m5of-spans">
              {regions.map((r, j) => (
                <span key={r} style={{ '--i': j }}>{r}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="m5of-fit">Shared expertise across geographies — coordination at function level.</p>
    </div>
  )
}

/* ============================================================ ORG PROD === */
export function OrgProduct() {
  const products = [
    { id: 'a', label: 'Product A', regions: ['NA', 'EU', 'APAC'] },
    { id: 'b', label: 'Product B', regions: ['NA', 'EU', 'APAC'] },
    { id: 'c', label: 'Product C', regions: ['NA', 'EU', 'APAC'] },
  ]
  return (
    <div className="ib-scene ib-m5-org-prod">
      <header className="m5op-head">
        <span>Product structure</span>
        <strong>Product towers across regions</strong>
      </header>
      <div className="m5op-towers">
        {products.map((p, i) => (
          <div key={p.id} className={`m5op-tower m5op-${p.id}`} style={{ '--i': i }}>
            <strong>{p.label}</strong>
            {p.regions.map((r, j) => (
              <span key={r} className="m5op-rung" style={{ '--i': j }}>{r}</span>
            ))}
          </div>
        ))}
      </div>
      <p className="m5op-fit">Product-led global brands — each product owns its international P&amp;L.</p>
    </div>
  )
}

/* ============================================================ ORG GEO ===== */
export function OrgGeographic() {
  const regions = [
    { id: 'asia', label: 'Asia', lon: 104, lat: 35 },
    { id: 'europe', label: 'Europe', lon: 12, lat: 50 },
    { id: 'americas', label: 'Americas', lon: -97, lat: 39 },
    { id: 'mea', label: 'MEA', lon: 54, lat: 24 },
  ]
  return (
    <div className="ib-scene ib-m5-org-geo">
      <header className="m5og-head">
        <span>Geographic structure</span>
        <strong>Regional command centres</strong>
      </header>
      <div className="m5og-stage">
        <div className="m5og-mapwrap" aria-hidden="true">
          <WorldMap className="m5og-map" showGraticule={false}>
            {regions.map((r, i) => (
              <MapMarker key={r.id} lon={r.lon} lat={r.lat} name={r.label} kind="regional" side="top" i={i} />
            ))}
          </WorldMap>
        </div>
        <div className="m5og-commands">
          {regions.map((r, i) => (
            <article key={r.id} className={`m5og-cmd m5og-${r.id}`} style={{ '--i': i }}>
              <strong>{r.label}</strong>
              <span>Regional P&amp;L · local adaptation</span>
            </article>
          ))}
        </div>
      </div>
      <p className="m5og-fit">Regional autonomy — each geography runs as a semi-independent unit.</p>
    </div>
  )
}

/* ============================================================ ORG MATRIX == */
export function OrgMatrix() {
  const products = ['Product A', 'Product B', 'Product C']
  const geos = ['Americas', 'Europe', 'Asia']
  return (
    <div className="ib-scene ib-m5-org-matrix is-hero">
      <header className="m5mx-head">
        <span>Matrix structure</span>
        <strong>Product × Geography — dual reporting</strong>
      </header>
      <div className="m5mx-grid" role="grid" aria-label="Matrix structure grid">
        <div className="m5mx-corner" />
        <div className="m5mx-col-headers">
          {geos.map((g, i) => (
            <span key={g} className="m5mx-col-h" style={{ '--i': i }}>{g}</span>
          ))}
        </div>
        {products.map((p, ri) => (
          <div key={p} className="m5mx-row">
            <span className="m5mx-row-h" style={{ '--i': ri }}>{p}</span>
            {geos.map((g, ci) => (
              <div key={g} className="m5mx-cell" style={{ '--i': ri * 3 + ci }}>
                <span className="m5mx-dot" aria-hidden="true" />
                <em>{p} × {g}</em>
              </div>
            ))}
          </div>
        ))}
      </div>
      <p className="m5mx-note">Clear dual reporting — product manager AND regional manager both matter.</p>
    </div>
  )
}

/* ============================================================ ORG MIXED === */
export function OrgMixed() {
  const layers = [
    { label: 'Product lines', items: ['A', 'B', 'C'] },
    { label: 'Regions', items: ['Americas', 'Europe', 'Asia'] },
    { label: 'Functions', items: ['Finance', 'HR', 'Ops'] },
  ]
  return (
    <div className="ib-scene ib-m5-org-mixed">
      <header className="m5om-head">
        <span>Mixed / hybrid</span>
        <strong>Combining product, region and function</strong>
      </header>
      <div className="m5om-layers">
        {layers.map((l, i) => (
          <div key={l.label} className="m5om-layer" style={{ '--i': i }}>
            <strong>{l.label}</strong>
            <div className="m5om-items">
              {l.items.map((item, j) => (
                <span key={item} style={{ '--i': j }}>{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="m5om-lock">Ambition outgrows simple charts; hybrids are evidence of learning, not failure.</p>
    </div>
  )
}

/* ============================================================ STRUCT CMP == */
export function StructureCompareVisual() {
  return (
    <div className="ib-scene ib-m5-struct-cmp">
      <header className="m5sc-head">
        <span>Structure comparison</span>
        <strong>Six MNC structures — when each fits</strong>
      </header>
      <div className="m5sc-table">
        {STRUCTURES.map((s, i) => (
          <article key={s.id} className={`m5sc-row m5sc-${s.id}`} style={{ '--i': i }}>
            <strong>{s.label}</strong>
            <span>{s.fit}</span>
          </article>
        ))}
      </div>
      <p className="m5sc-exam">Explain with diagrams and state which structure fits which strategy.</p>
    </div>
  )
}

/* ============================================================ STRUCT CONF */
export function StructureConfusionVisual() {
  const pairs = [
    { a: 'International Division', b: 'Geographic Structure', note: 'Intl = separate overseas unit · Geo = regional P&amp;L autonomy' },
    { a: 'Product Structure', b: 'Matrix Structure', note: 'Product = one boss per product · Matrix = dual reporting' },
  ]
  return (
    <div className="ib-scene ib-m5-struct-conf">
      <header className="m5cf-head">
        <span>Common confusion</span>
        <strong>International ≠ Geographic · Product ≠ Matrix</strong>
      </header>
      {pairs.map((p, i) => (
        <div key={p.a} className="m5cf-pair" style={{ '--i': i }}>
          <article className="m5cf-a"><strong>{p.a}</strong></article>
          <span className="m5cf-vs" aria-hidden="true">≠</span>
          <article className="m5cf-b"><strong>{p.b}</strong></article>
          <p className="m5cf-note">{p.note}</p>
        </div>
      ))}
    </div>
  )
}

/* ============================================================ TT MEANING */
export function TechTransferMeaning() {
  const chain = [
    { id: 'owner', label: 'Owner', note: 'Technology holder' },
    { id: 'know',  label: 'Knowledge', note: 'Processes · designs · skills' },
    { id: 'mech',  label: 'Mechanism', note: 'FDI · licence · JV · etc.' },
    { id: 'recip', label: 'Recipient', note: 'Host firm / country' },
    { id: 'cap',   label: 'Capability', note: 'New productive ability' },
  ]
  return (
    <div className="ib-scene ib-m5-tt-mean">
      <header className="m5tm-head">
        <span>Technology transfer</span>
        <strong>Meaning — the transfer chain</strong>
      </header>
      <div className="m5tm-chain">
        {chain.map((s, i) => (
          <div key={s.id} className={`m5tm-step m5tm-${s.id}`} style={{ '--i': i }}>
            <strong>{s.label}</strong>
            <em>{s.note}</em>
            {i < chain.length - 1 && <span className="m5tm-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <p className="m5tm-def">Sharing technology, knowledge, skills, techniques and facilities to build new capability.</p>
    </div>
  )
}

/* ============================================================ TT REASONS */
export function TechTransferReasons() {
  const reasons = [
    'Market entry with proven technology',
    'Regulatory or local-content requirements',
    'Cost sharing for R&amp;D-intensive projects',
    'Risk reduction in unfamiliar markets',
    'Building local partner capability',
    'Extending product lifecycle globally',
  ]
  return (
    <div className="ib-scene ib-m5-tt-why">
      <header className="m5tw-head">
        <span>Strategic triggers</span>
        <strong>Six reasons firms transfer technology</strong>
      </header>
      <ol className="m5tw-list">
        {reasons.map((r, i) => (
          <li key={r} className="m5tw-reason" style={{ '--i': i }}>
            <span className="m5tw-num">{i + 1}</span>
            <strong>{r}</strong>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ============================================================ TT OVERVIEW */
export function TechTransferMethodsOverview() {
  const methods = [
    { id: 'fdi',  label: 'FDI', glyph: '●' },
    { id: 'lic',  label: 'Licensing', glyph: '◆' },
    { id: 'fran', label: 'Franchising', glyph: '▲' },
    { id: 'turn', label: 'Turnkey', glyph: '■' },
    { id: 'cm',   label: 'Contract Mfg', glyph: '⬡' },
    { id: 'jv',   label: 'Joint Venture', glyph: '★' },
  ]
  return (
    <div className="ib-scene ib-m5-tt-ov">
      <header className="m5to-head">
        <span>Transfer methods</span>
        <strong>Six distinct routes — different control &amp; investment</strong>
      </header>
      <div className="m5to-routes">
        {methods.map((m, i) => (
          <article key={m.id} className={`m5to-route m5to-${m.id}`} style={{ '--i': i }}>
            <span className="m5to-glyph" aria-hidden="true">{m.glyph}</span>
            <strong>{m.label}</strong>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ============================================================ TT METHODS A */
export function TechMethodsA() {
  const methods = [
    { id: 'fdi', label: 'FDI', flow: 'Owner → subsidiary → full control → capability in host' },
    { id: 'lic', label: 'Licensing', flow: 'Owner → licence fee → limited control → product use' },
    { id: 'fran', label: 'Franchising', flow: 'Owner → brand + system → partner ops → local delivery' },
  ]
  return (
    <div className="ib-scene ib-m5-tt-a">
      <header className="m5ta-head">
        <span>Methods A</span>
        <strong>FDI · Licensing · Franchising</strong>
      </header>
      <div className="m5ta-flows">
        {methods.map((m, i) => (
          <article key={m.id} className={`m5ta-method m5ta-${m.id}`} style={{ '--i': i }}>
            <strong>{m.label}</strong>
            <p>{m.flow}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ============================================================ TT METHODS B */
export function TechMethodsB() {
  const methods = [
    { id: 'turn', label: 'Turnkey', flow: 'Contractor → complete plant → handover → operational start' },
    { id: 'cm', label: 'Contract Manufacturing', flow: 'Owner → specs → local factory → branded output' },
    { id: 'jv', label: 'Joint Venture', flow: 'Global + local partner → shared entity → combined capability' },
  ]
  return (
    <div className="ib-scene ib-m5-tt-b">
      <header className="m5tb-head">
        <span>Methods B</span>
        <strong>Turnkey · Contract Mfg · Joint Venture</strong>
      </header>
      <div className="m5tb-flows">
        {methods.map((m, i) => (
          <article key={m.id} className={`m5tb-method m5tb-${m.id}`} style={{ '--i': i }}>
            <strong>{m.label}</strong>
            <p>{m.flow}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ============================================================ TT COMPARE */
export function TechMethodCompare() {
  const axes = ['Control', 'Investment', 'Speed', 'Risk', 'Knowledge retention']
  const methods = [
    { name: 'FDI', scores: ['High', 'High', 'Slow', 'High', 'High'] },
    { name: 'Licensing', scores: ['Low', 'Low', 'Fast', 'Low', 'Medium'] },
    { name: 'Franchising', scores: ['Medium', 'Low', 'Fast', 'Medium', 'Medium'] },
    { name: 'Turnkey', scores: ['Low', 'Medium', 'Medium', 'Medium', 'Low'] },
    { name: 'Contract Mfg', scores: ['Low', 'Low', 'Fast', 'Low', 'High'] },
    { name: 'JV', scores: ['Shared', 'Shared', 'Medium', 'Shared', 'Shared'] },
  ]
  return (
    <div className="ib-scene ib-m5-tt-cmp">
      <header className="m5tc-head">
        <span>Method comparison</span>
        <strong>Qualitative trade-offs across five axes</strong>
      </header>
      <div className="m5tc-table">
        <div className="m5tc-header">
          <span />
          {axes.map(a => <span key={a}>{a}</span>)}
        </div>
        {methods.map((m, i) => (
          <div key={m.name} className="m5tc-row" style={{ '--i': i }}>
            <strong>{m.name}</strong>
            {m.scores.map((s, j) => (
              <span key={j} className="m5tc-cell">{s}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================ TT IMPORTANCE */
export function TechImportanceLadder() {
  const rungs = [
    { label: 'Use', note: 'Apply existing technology' },
    { label: 'Skill', note: 'Build operational competence' },
    { label: 'R&D', note: 'Adapt and improve locally' },
    { label: 'Innovation', note: 'Create new solutions' },
    { label: 'Capability', note: 'Sustainable competitive advantage' },
  ]
  return (
    <div className="ib-scene ib-m5-tt-imp">
      <header className="m5ti-head">
        <span>Importance ladder</span>
        <strong>From use to sustainable capability</strong>
      </header>
      <ol className="m5ti-ladder">
        {[...rungs].reverse().map((r, i) => (
          <li key={r.label} className="m5ti-rung" style={{ '--i': i, '--rung': rungs.length - i }}>
            <strong>{r.label}</strong>
            <em>{r.note}</em>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ============================================================ TT JV CASE */
export function TechTransferJvCase() {
  const steps = [
    { label: 'Global auto firm', note: 'Proprietary engine &amp; process tech' },
    { label: 'Local partner', note: 'Market access · distribution · policy' },
    { label: 'Joint venture', note: 'Shared entity · combined investment' },
    { label: 'Tech transfer', note: 'Processes · skills · quality systems' },
    { label: 'Local capability', note: 'Supplier ecosystem · employment · exports' },
  ]
  return (
    <div className="ib-scene ib-m5-tt-jv is-hero">
      <header className="m5tj-head">
        <span>Case · Auto JV</span>
        <strong>Global auto + local partner → capability build</strong>
      </header>
      <div className="m5tj-flow">
        {steps.map((s, i) => (
          <div key={s.label} className="m5tj-step" style={{ '--i': i }}>
            <strong>{s.label}</strong>
            <em>{s.note}</em>
            {i < steps.length - 1 && <span className="m5tj-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
      <p className="m5tj-lesson">JV transfers technology AND builds local industrial capability — if linkages are designed.</p>
    </div>
  )
}

/* ============================================================ GC ARENA === */
export function CompetitivenessArena() {
  const forces = ['Rival firms', 'Substitutes', 'Buyers', 'Suppliers', 'New entrants', 'Global standards']
  return (
    <div className="ib-scene ib-m5-arena">
      <header className="m5ar-head">
        <span>Competitiveness</span>
        <strong>Strategic arena — not sports</strong>
      </header>
      <div className="m5ar-stage" role="img" aria-label="Competitive arena">
        <div className="m5ar-centre">
          <span>YOUR</span>
          <strong>FIRM</strong>
        </div>
        {forces.map((f, i) => (
          <span key={f} className="m5ar-force" style={{ '--i': i, '--total': forces.length }}>
            {f}
          </span>
        ))}
      </div>
      <p className="m5ar-lock">Competitiveness = ability to perform under international competitive pressure.</p>
    </div>
  )
}

/* ============================================================ GC NEED ===== */
export function CompetitivenessNeed() {
  const questions = [
    'Can we produce at global cost and quality standards?',
    'Do we innovate faster than rivals in key markets?',
    'Are institutions and infrastructure supportive?',
    'Can we access talent, capital and technology globally?',
    'Does our structure enable or block global coordination?',
  ]
  return (
    <div className="ib-scene ib-m5-gc-need">
      <header className="m5gn-head">
        <span>Strategy room</span>
        <strong>Five questions every global executive asks</strong>
      </header>
      <ol className="m5gn-questions">
        {questions.map((q, i) => (
          <li key={q} className="m5gn-q" style={{ '--i': i }}>
            <span className="m5gn-num">{i + 1}</span>
            <strong>{q}</strong>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ============================================================ PILLARS ===== */
export function PillarsArchitecture() {
  return (
    <div className="ib-scene ib-m5-pillars is-hero">
      <header className="m5pl-head">
        <span>12 pillars</span>
        <strong>Competitiveness architecture — all twelve visible</strong>
      </header>
      <div className="m5pl-arch">
        {PILLARS_ARCHITECTURE.map((g, gi) => (
          <div key={g.id} className={`m5pl-tier m5pl-${g.id}`} style={{ '--i': gi }}>
            <span className="m5pl-tier-label">{g.label}</span>
            <div className="m5pl-pillars">
              {g.pillars.map((p, pi) => (
                <article key={p} className="m5pl-pillar" style={{ '--i': g.base + pi }}>
                  <strong>{p}</strong>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="m5pl-exam">List all 12 pillars with one-line meaning — Foundations · Efficiency · Sophistication.</p>
    </div>
  )
}

/* ============================================================ PILLAR GROUPS */
export function PillarsFoundationsVisual() {
  return (
    <div className="ib-scene ib-m5-p-found">
      <header className="m5pf-head">
        <span>Foundations</span>
        <strong>Institutions · Infrastructure · Macro · Health · Higher Education</strong>
      </header>
      <div className="m5pf-items">
        {PILLARS_FOUNDATIONS.map((p, i) => (
          <article key={p} className="m5pf-item" style={{ '--i': i }}>
            <strong>{p}</strong>
          </article>
        ))}
      </div>
    </div>
  )
}

export function PillarsEfficiencyVisual() {
  return (
    <div className="ib-scene ib-m5-p-eff">
      <header className="m5pe-head">
        <span>Efficiency</span>
        <strong>Goods · Labour · Financial markets</strong>
      </header>
      <div className="m5pe-items">
        {PILLARS_EFFICIENCY.map((p, i) => (
          <article key={p} className="m5pe-item" style={{ '--i': i }}>
            <strong>{p}</strong>
          </article>
        ))}
      </div>
    </div>
  )
}

export function PillarsCapabilityVisual() {
  return (
    <div className="ib-scene ib-m5-p-cap">
      <header className="m5pc-head">
        <span>Sophistication</span>
        <strong>Technology · Market size · Business · Innovation</strong>
      </header>
      <div className="m5pc-items">
        {PILLARS_CAPABILITY.map((p, i) => (
          <article key={p} className="m5pc-item" style={{ '--i': i }}>
            <strong>{p}</strong>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ============================================================ IMD CONTEXT */
export function ImdContextVisual() {
  const imd2025 = [
    { rank: 1, country: 'Switzerland' },
    { rank: 2, country: 'Singapore' },
    { rank: 3, country: 'Hong Kong SAR' },
  ]
  return (
    <div className="ib-scene ib-m5-imd">
      <header className="m5im-head">
        <span>Teaching vs ranking</span>
        <strong>12-pillar framework vs IMD scorecard</strong>
      </header>
      <div className="m5im-split">
        <article className="m5im-left" style={{ '--i': 0 }}>
          <strong>12-PILLAR TEACHING FRAMEWORK</strong>
          <p>Foundations · Efficiency · Sophistication — used for exam answers and managerial diagnosis.</p>
          <ul>
            {[...PILLARS_FOUNDATIONS, ...PILLARS_EFFICIENCY, ...PILLARS_CAPABILITY].map(p => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </article>
        <article className="m5im-right" style={{ '--i': 1 }}>
          <div className="m5im-stamp">CURRENT CONTEXT</div>
          <strong>IMD World Competitiveness 2025</strong>
          <p className="m5im-india">India: <em>41 / 69</em> (2024: 39)</p>
          <ol className="m5im-top">
            {imd2025.map(t => (
              <li key={t.country}><span>{t.rank}</span> {t.country}</li>
            ))}
          </ol>
          <p className="m5im-not">NOT THE SAME SCORECARD</p>
        </article>
      </div>
    </div>
  )
}

/* ============================================================ TECH GC ===== */
export function TechCompetitivenessVisual() {
  const channels = [
    { title: 'Innovation', text: 'R&D, patents, new products' },
    { title: 'Adoption', text: 'Absorb and deploy global tech fast' },
    { title: 'Efficiency', text: 'Process tech cuts cost and waste' },
    { title: 'Market Access', text: 'Digital platforms reach global buyers' },
    { title: 'Productivity', text: 'Tech multiplies output per worker' },
  ]
  return (
    <div className="ib-scene ib-m5-tech-gc">
      <header className="m5tg-head">
        <span>Technology channels</span>
        <strong>Five accelerators of global competitiveness</strong>
      </header>
      <div className="m5tg-channels">
        {channels.map((c, i) => (
          <article key={c.title} className="m5tg-ch" style={{ '--i': i }}>
            <strong>{c.title}</strong>
            <p>{c.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

/* ============================================================ TECH NOT === */
export function TechNotEnoughVisual() {
  const needed = ['Skills', 'Management', 'Processes', 'Infrastructure', 'Strategy']
  return (
    <div className="ib-scene ib-m5-tech-not">
      <header className="m5tn-head">
        <span>Reality check</span>
        <strong>Technology alone is insufficient</strong>
      </header>
      <div className="m5tn-stage">
        <div className="m5tn-tech-alone" style={{ '--i': 0 }}>
          <strong>Technology</strong>
          <span>Necessary — not sufficient</span>
        </div>
        <span className="m5tn-plus" aria-hidden="true">+</span>
        <div className="m5tn-assemble">
          {needed.map((n, i) => (
            <span key={n} className="m5tn-piece" style={{ '--i': i + 1 }}>{n}</span>
          ))}
        </div>
        <span className="m5tn-equals" aria-hidden="true">=</span>
        <div className="m5tn-result" style={{ '--i': 6 }}>
          <strong>Competitiveness</strong>
        </div>
      </div>
      <p className="m5tn-lock">Assemble skills, management, processes, infrastructure and strategy around technology.</p>
    </div>
  )
}

/* ============================================================ SYNTHESIS == */
export function AmbitionSynthesis() {
  const inputs = ['Resources', 'Structure', 'Technology', 'Management', 'Market']
  return (
    <div className="ib-scene ib-m5-synth">
      <header className="m5sy-head">
        <span>Chapter synthesis</span>
        <strong>Ambition → Competitiveness</strong>
      </header>
      <div className="m5sy-journey">
        {AMBITION_PATH.map((s, i) => (
          <span key={s} className="m5sy-step" style={{ '--i': i }}>{s}</span>
        ))}
      </div>
      <div className="m5sy-converge">
        {inputs.map((inp, i) => (
          <span key={inp} className="m5sy-input" style={{ '--i': i }}>{inp}</span>
        ))}
        <span className="m5sy-arrow" aria-hidden="true">→</span>
        <strong className="m5sy-outcome">Competitiveness</strong>
      </div>
      <p className="m5sy-lock">Going global creates reach. Building capability creates competitiveness.</p>
    </div>
  )
}

/* ============================================================ PAYOFF ===== */
export function AmbitionPayoff() {
  const chapters = [
    { n: 'Ⅰ', title: 'Opportunity', tagline: 'Discovered the global market' },
    { n: 'Ⅱ', title: 'Judgment', tagline: 'Evaluated country climate' },
    { n: 'Ⅲ', title: 'Insight', tagline: 'Trade and competition emerge' },
    { n: 'Ⅳ', title: 'Governance', tagline: 'Institutions set the rules' },
    { n: 'Ⅴ', title: 'Ambition', tagline: 'Grow, organize, transfer, compete', active: true },
  ]
  return (
    <div className="ib-scene ib-m5-payoff">
      <div className="m5pf-network" aria-hidden="true">
        <div className="m5pf-hq">HQ</div>
        {['NA', 'EU', 'Asia', 'MEA'].map((r, i) => (
          <span key={r} className="m5pf-node" style={{ '--i': i }}>{r}</span>
        ))}
      </div>
      <div className="m5pf-equation" aria-label="Module progression">
        {chapters.map((ch, i) => (
          <div
            key={ch.n}
            className={`m5pf-ch m5pf-ch-${i + 1}${ch.active ? ' m5pf-active' : ''}`}
            style={{ '--i': i }}
          >
            <strong>{ch.n}</strong>
            <span>{ch.title}</span>
            <em>{ch.tagline}</em>
          </div>
        ))}
      </div>
      <div className="m5pf-seam" style={{ '--i': 5 }}>
        <strong>Next:</strong>
        <span>Ⅵ — COMMAND — marketing, people, capital and production as one global machine.</span>
      </div>
    </div>
  )
}

/* ============================================================ EXAM BOARD */
export function ExamBoardVisual() {
  const blocks = [
    { label: 'Path', value: 'Grow→Expand→Organize→Transfer→Compete' },
    { label: 'Nature', value: '10 characteristics' },
    { label: 'Growth', value: '10 factors' },
    { label: 'Host', value: '9 benefits · 6 risks' },
    { label: 'Home', value: '3 benefits · 3 risks' },
    { label: 'Structure', value: '6 types' },
    { label: 'TT', value: '6 reasons · 6 methods · 5 importance' },
    { label: 'GC', value: '5 need · 12 pillars · 5 tech channels' },
  ]
  return (
    <div className="ib-scene ib-m5-exam">
      <header className="m5ex-head">
        <span>Revision board</span>
        <strong>Ambition — compact memory map</strong>
      </header>
      <div className="m5ex-grid">
        {blocks.map((b, i) => (
          <article key={b.label} className="m5ex-block" style={{ '--i': i }}>
            <strong>{b.label}</strong>
            <span>{b.value}</span>
          </article>
        ))}
      </div>
    </div>
  )
}

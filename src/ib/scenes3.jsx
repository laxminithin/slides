/**
 * International Business — Module 3 signature scenes (INSIGHT).
 *
 * Visual grammar: OBSERVE → EXPLAIN → MODEL → COMPARE → APPLY
 * Metaphor: THE BLUEPRINT — reality first, then theory that explains why.
 * Motion lives in ibChapter3.css. Frozen V7 engine untouched.
 * Module 1 / Module 2 scenes and CSS are reference only — do not edit.
 */

import {
  WorldMap, MapMarker, MapPulse, MARKETS, project,
} from './worldmap'

const { usa, india, china, germany, japan } = MARKETS

/** Bengaluru — local teaching coordinate (not in shared MARKETS). */
const bengaluru = { lon: 77.6, lat: 12.97, name: 'Bengaluru' }
/** Taiwan / TSMC cluster cue. */
const taiwan = { lon: 121, lat: 23.7, name: 'Taiwan' }
/** Vietnam — mature production relocation cue. */
const vietnam = { lon: 106.3, lat: 16.0, name: 'Vietnam' }

const THEORY_LADDER = [
  { id: 'merc', short: 'Mercantilism', motif: 'vault', line: 'Wealth as bullion · surplus race' },
  { id: 'abs', short: 'Absolute', motif: 'columns', line: 'Absolute efficiency enters' },
  { id: 'comp', short: 'Comparative', motif: 'balance', line: 'Relative opportunity cost' },
  { id: 'ho', short: 'H–O', motif: 'stacks', line: 'Factor endowments' },
  { id: 'plc', short: 'PLC', motif: 'curve', line: 'Products migrate in time' },
  { id: 'riv', short: 'Rivalry', motif: 'arena', line: 'Firm strategy & scale' },
  { id: 'por', short: 'Porter', motif: 'diamond', line: 'National industry systems' },
]

/* ============================================================ OPENER ===== */
/** Chapter opener — blueprint studio, not a world-map bloom. */
export function InsightOpener({ module = 3 }) {
  return (
    <div className="ib-scene ib-m3-opener" data-slide-content="true">
      <div className="m3o-grid" aria-hidden="true" />
      <div className="m3o-stage">
        <svg className="m3o-blueprint" viewBox="0 0 640 360" aria-hidden="true">
          <defs>
            <pattern id="m3o-dots" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.7" fill="rgba(26, 54, 93, 0.18)" />
            </pattern>
          </defs>
          <rect width="640" height="360" fill="url(#m3o-dots)" />
          <path className="m3o-spine" d="M48 300 C140 260, 220 200, 300 170 S460 120, 592 88" fill="none" />
          {THEORY_LADDER.map((t, i) => {
            const x = 70 + i * 80
            const y = 290 - i * 28
            return (
              <g key={t.id} className={`m3o-node m3o-node-${t.motif}`} style={{ '--i': i }}>
                <circle cx={x} cy={y} r="10" />
                <text x={x} y={y + 28} textAnchor="middle">{t.short}</text>
              </g>
            )
          })}
        </svg>
        <ul className="m3o-motifs" aria-label="Theory visual identities">
          {THEORY_LADDER.map((t, i) => (
            <li key={t.id} className={`m3o-motif m3o-motif-${t.motif}`} style={{ '--i': i }}>
              <em aria-hidden="true" />
              <span>{t.short}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="m3o-copy">
        <p className="m3o-eyebrow">International Business · 22MBA401 · Chapter {String(module).padStart(2, '0')}</p>
        <h1 className="m3o-title">Insight</h1>
        <p className="m3o-sub">Business Theories</p>
        <p className="m3o-hint">We observed trade. Now we model why it happens.</p>
        <p className="m3o-path">Observe → Explain → Model → Compare → Apply</p>
      </div>
    </div>
  )
}

/* ============================================================ HOOK ======== */
/** Quiet theory gallery — insight question silhouette. */
export function InsightQuestion({
  lenses = ['Wealth', 'Efficiency', 'Opportunity cost', 'Factors', 'Product cycle', 'Firm rivalry', 'National diamond'],
}) {
  return (
    <div className="ib-scene ib-m3-question">
      <div className="m3q-orbit">
        <div className="m3q-core">
          <span>WHY</span>
          <strong>Trade?</strong>
        </div>
        {lenses.map((item, i) => (
          <span key={item} className="m3q-lens" style={{ '--i': i }}>{item}</span>
        ))}
      </div>
      <p className="m3q-lock">Insight begins when observation asks for a model.</p>
    </div>
  )
}

/* ============================================================ INTRO ======= */
export function CountryFirmBridge({
  steps = [
    { k: 'Observe', v: 'What trade and investment patterns do we see in the world?' },
    { k: 'Explain', v: 'What logic — wealth, cost, factors, products, rivalry — drives those patterns?' },
    { k: 'Apply', v: 'How should managers choose locations, products and competitive moves?' },
  ],
  examTip = 'Open theory answers by stating whether the theory is country-based or firm-based, then give the core proposition.',
}) {
  return (
    <div className="ib-scene ib-m3-bridge">
      <article className="m3br-side m3br-country" style={{ '--i': 0 }}>
        <span>Country-based</span>
        <strong>Nations</strong>
        <p>Wealth · cost · factors · product stages</p>
      </article>
      <div className="m3br-span" aria-hidden="true">
        <em />
        <span>Blueprint span</span>
      </div>
      <article className="m3br-side m3br-firm" style={{ '--i': 1 }}>
        <span>Firm-based</span>
        <strong>MNCs</strong>
        <p>Rivalry · IP · scale · industry diamonds</p>
      </article>
      <ul className="m3br-steps">
        {steps.map((s, i) => (
          <li key={s.k} style={{ '--i': i }}>
            <strong>{s.k}</strong>
            <span>{s.v}</span>
          </li>
        ))}
      </ul>
      <p className="m3br-exam"><span>Exam tip</span>{examTip}</p>
    </div>
  )
}

/* ============================================================ ROLE ======== */
export function TheoryRolesRadar({
  roles = [
    { title: 'Dynamics', text: 'Why goods and capital move.' },
    { title: 'Strategy', text: 'Where to produce and sell.' },
    { title: 'Policy', text: 'Tariffs, FDI, industrial policy.' },
    { title: 'Evolution', text: 'From bullion to ecosystems.' },
    { title: 'Challenges', text: 'Gaps, resilience, inequality.' },
    { title: 'Complexity', text: 'Markets, products, rivals.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m3-roles">
      <div className="m3rl-hub">
        <span>Role of theories</span>
        <strong>Lenses</strong>
      </div>
      {roles.map((r, i) => (
        <article key={r.title} style={{ '--i': i }}>
          <strong>{r.title}</strong>
          <p>{r.text}</p>
        </article>
      ))}
    </div>
  )
}

/* ================================================= HERO 1 — EVOLUTION ==== */
/** Flagship theory evolution — one spine transforms through seven models. */
export function TheoryEvolution() {
  return (
    <div className="ib-scene ib-m3-evolution">
      <header className="m3ev-head">
        <span>Intellectual journey</span>
        <strong>Theories evolve because earlier explanations were incomplete</strong>
      </header>
      <div className="m3ev-rail" aria-label="Theory evolution">
        <div className="m3ev-spine" aria-hidden="true" />
        {THEORY_LADDER.map((t, i) => (
          <article key={t.id} className={`m3ev-step m3ev-${t.motif}`} style={{ '--i': i }}>
            <em className={`m3ev-glyph m3ev-glyph-${t.motif}`} aria-hidden="true" />
            <strong>{t.short}</strong>
            <p>{t.line}</p>
          </article>
        ))}
      </div>
      <p className="m3ev-finale">FROM TRADE → TO COMPETITIVE ADVANTAGE</p>
    </div>
  )
}

/** Gap chain — each theory solves the prior problem. */
export function TheoryGapChain({
  steps = [
    { title: 'Mercantilism', text: 'Problem: national power via surplus.' },
    { title: 'Absolute advantage', text: 'Problem: can both sides gain?' },
    { title: 'Comparative advantage', text: 'Problem: one country leads in all?' },
    { title: 'Factor endowment', text: 'Problem: which resources drive edge?' },
    { title: 'PLC + Rivalry + Porter', text: 'Problem: products, firms, ecosystems.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m3-gaps">
      {steps.map((s, i) => (
        <article key={s.title} style={{ '--i': i }}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <strong>{s.title}</strong>
          <p>{s.text}</p>
          {i < steps.length - 1 && <i className="m3gp-arrow" aria-hidden="true" />}
        </article>
      ))}
    </div>
  )
}

/* ================================================= MERCANTILISM ========== */
/** Old-world trade logic — surplus vault, not a definition card wall. */
export function MercantilismVault() {
  return (
    <div className="ib-scene ib-m3-merc">
      <div className="m3mc-nation">
        <span>Nation</span>
        <strong>State power</strong>
      </div>
      <div className="m3mc-flows">
        <div className="m3mc-export" style={{ '--i': 0 }}>
          <span>Exports ↑</span>
          <em>Gold / wealth in</em>
        </div>
        <div className="m3mc-import" style={{ '--i': 1 }}>
          <span>Imports ↓</span>
          <em>Restricted</em>
        </div>
      </div>
      <div className="m3mc-eq">
        <strong>EXPORTS &gt; IMPORTS</strong>
        <span>Trade surplus → National wealth → Government control</span>
      </div>
      <p className="m3mc-lock">Mercantilism viewed international trade as competition for national wealth.</p>
    </div>
  )
}

export function ZeroSumVsGains() {
  return (
    <div className="ib-scene ib-m3-zerosum">
      <article className="m3zs-left" style={{ '--i': 0 }}>
        <span>Mercantilist lens</span>
        <strong>Zero-sum</strong>
        <ul>
          <li>Bullion stocks = strength</li>
          <li>Surplus as scoreboard</li>
          <li>Tariffs · subsidies · empire</li>
        </ul>
      </article>
      <div className="m3zs-vs" aria-hidden="true">vs</div>
      <article className="m3zs-right" style={{ '--i': 1 }}>
        <span>Later insight</span>
        <strong>Mutual gains</strong>
        <ul>
          <li>Specialization raises output</li>
          <li>Both sides can benefit</li>
          <li>Trade is not only a race</li>
        </ul>
      </article>
    </div>
  )
}

/* ================================================= ABSOLUTE ============== */
/** Production duel — who produces more efficiently? */
export function AbsoluteDuel({
  left = { country: 'Country A', product: 'Textiles', score: 92, note: 'Higher productivity' },
  right = { country: 'Country B', product: 'Machinery', score: 88, note: 'Higher productivity' },
  insight = 'Why this matters: Smith shifts the question from “Who wins the surplus?” to “How does specialization raise total output?”',
}) {
  return (
    <div className="ib-scene ib-m3-absolute">
      <p className="m3ab-q">Who can produce more efficiently?</p>
      <div className="m3ab-duel">
        <article className="m3ab-side" style={{ '--i': 0 }}>
          <span>{left.country}</span>
          <strong>{left.product}</strong>
          <div className="m3ab-bar" style={{ '--h': left.score }}>
            <i />
          </div>
          <em>{left.note}</em>
        </article>
        <div className="m3ab-vs">ABSOLUTE</div>
        <article className="m3ab-side" style={{ '--i': 1 }}>
          <span>{right.country}</span>
          <strong>{right.product}</strong>
          <div className="m3ab-bar" style={{ '--h': right.score }}>
            <i />
          </div>
          <em>{right.note}</em>
        </article>
      </div>
      <p className="m3ab-insight">{insight}</p>
      <p className="m3ab-lock">Specialize where absolute cost is lower — then trade.</p>
    </div>
  )
}

export function AssumptionBoard({
  items = [
    { title: 'Two countries, two commodities', text: 'Simplifies comparison.' },
    { title: 'Efficiency objective', text: 'Raise output for given resources.' },
    { title: 'Zero transport costs', text: 'Ignores freight and tariffs.' },
    { title: 'Factor mobility rules', text: 'Within, not easily between countries.' },
    { title: 'Full employment', text: 'Resources assumed fully used.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m3-assumptions">
      {items.map((item, i) => (
        <article key={item.title} style={{ '--i': i }}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

/* ========================================= CONFUSION ABS vs COMP ======== */
export function AbsoluteVsComparative() {
  return (
    <div className="ib-scene ib-m3-confusion">
      <div className="m3cf-pair">
        <article className="m3cf-abs" style={{ '--i': 0 }}>
          <em className="m3cf-glyph m3cf-columns" aria-hidden="true" />
          <span>Absolute</span>
          <strong>Who is better?</strong>
          <p>Lower absolute cost · higher productivity</p>
        </article>
        <article className="m3cf-comp" style={{ '--i': 1 }}>
          <em className="m3cf-glyph m3cf-balance" aria-hidden="true" />
          <span>Comparative</span>
          <strong>Who sacrifices less?</strong>
          <p>Lower opportunity cost · relative efficiency</p>
        </article>
      </div>
      <ul className="m3cf-axes">
        <li style={{ '--i': 0 }}><span>Efficiency</span><em>Absolute level</em><em>Relative sacrifice</em></li>
        <li style={{ '--i': 1 }}><span>Opportunity cost</span><em>Not the focus</em><em>The deciding variable</em></li>
        <li style={{ '--i': 2 }}><span>Specialization</span><em>Where you lead</em><em>Where you give up least</em></li>
        <li style={{ '--i': 3 }}><span>Trade implication</span><em>Fails if one leads in all</em><em>Gains still possible</em></li>
      </ul>
      <p className="m3cf-trap">Exam trap: lacking absolute advantage in all goods ≠ no comparative advantage.</p>
    </div>
  )
}

/* ================================================= HERO 2 — COMPARATIVE == */
/** Opportunity-cost reasoning sequence. */
export function ComparativeReasoning() {
  return (
    <div className="ib-scene ib-m3-comparative">
      <ol className="m3cr-steps">
        <li style={{ '--i': 0 }} className="m3cr-wrong">
          <span>Start</span>
          <strong>Who produces more?</strong>
          <em>Wrong question</em>
        </li>
        <li style={{ '--i': 1 }} className="m3cr-pivot">
          <span>Pivot</span>
          <strong>Who gives up less?</strong>
          <em>Opportunity cost</em>
        </li>
        <li style={{ '--i': 2 }}>
          <span>Model</span>
          <strong>Country · Product · Output · OC</strong>
        </li>
        <li style={{ '--i': 3 }}>
          <span>Apply</span>
          <strong>Specialize → Trade → Mutual gain</strong>
        </li>
      </ol>
      <div className="m3cr-balance" aria-hidden="true">
        <div className="m3cr-pan m3cr-pan-l"><span>Good X</span></div>
        <div className="m3cr-fulcrum" />
        <div className="m3cr-pan m3cr-pan-r"><span>Good Y</span></div>
      </div>
      <p className="m3cr-lock">Even absolute superiority leaves room for comparative specialization.</p>
    </div>
  )
}

export function FeatureLattice({
  items = [
    { title: 'Multiplicity', text: 'Many organisations and product lines.' },
    { title: 'Two-edged', text: 'Gains plus interdependence costs.' },
    { title: 'Relative values', text: 'Advantage depends on relatives.' },
    { title: 'Money / labour', text: 'Expressible in cost or time.' },
    { title: 'Transport caveat', text: 'Zero freight is unrealistic.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m3-features">
      {items.map((item, i) => (
        <article key={item.title} style={{ '--i': i }}>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

/* ========================================= WHEAT / CLOTH NUMERICAL ======= */
/** PPT numerical — values frozen. Progressive step focus via CSS. */
export function WheatClothLedger() {
  const steps = [
    {
      id: 'given',
      label: 'STEP 1 · Given',
      body: (
        <div className="m3wl-table">
          <div className="m3wl-row m3wl-head"><span /><span>Wheat</span><span>Cloth</span></div>
          <div className="m3wl-row"><span>Country A</span><strong>10</strong><strong>5</strong></div>
          <div className="m3wl-row"><span>Country B</span><strong>5</strong><strong>4</strong></div>
          <p className="m3wl-note">Same resources · produce wheat OR cloth</p>
        </div>
      ),
    },
    {
      id: 'absolute',
      label: 'STEP 2 · Absolute reading',
      body: <p>A produces more of both → absolute advantage in wheat and cloth.</p>,
    },
    {
      id: 'oc-a',
      label: 'STEP 3 · Opportunity cost — A',
      body: (
        <ul>
          <li>1 wheat costs <strong>0.5</strong> cloth</li>
          <li>1 cloth costs <strong>2</strong> wheat</li>
        </ul>
      ),
    },
    {
      id: 'oc-b',
      label: 'STEP 4 · Opportunity cost — B',
      body: (
        <ul>
          <li>1 wheat costs <strong>0.8</strong> cloth</li>
          <li>1 cloth costs <strong>1.25</strong> wheat</li>
        </ul>
      ),
    },
    {
      id: 'specialize',
      label: 'STEP 5 · Specialize',
      body: (
        <ul>
          <li>A → wheat (lower OC)</li>
          <li>B → cloth (lower OC)</li>
        </ul>
      ),
    },
    {
      id: 'conclude',
      label: 'STEP 6 · Trade conclusion',
      body: <p>Absolute advantage in both goods ≠ no gains from trade.</p>,
    },
  ]
  return (
    <div className="ib-scene ib-m3-wheat">
      <header>
        <span>PPT numerical example</span>
        <strong>Wheat · Cloth · Opportunity cost</strong>
      </header>
      <ol className="m3wl-steps">
        {steps.map((s, i) => (
          <li key={s.id} className={`m3wl-step m3wl-${s.id}`} style={{ '--i': i }}>
            <span className="m3wl-label">{s.label}</span>
            <div className="m3wl-body">{s.body}</div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export function ValueChainPlacement({
  steps = [
    { title: 'Map activities', text: 'Design · components · assembly · services' },
    { title: 'Compare relative costs', text: 'Productivity · quality · ecosystem' },
    { title: 'Specialize the chain', text: 'Place where opportunity cost is lowest' },
    { title: 'Trade / integrate', text: 'Move intermediates and knowledge' },
  ],
}) {
  return (
    <div className="ib-scene ib-m3-chain">
      <div className="m3ch-apple">
        <span>Apple value chain</span>
        <strong>Opportunity-cost placement</strong>
      </div>
      <ol>
        {steps.map((s, i) => (
          <li key={s.title} style={{ '--i': i }}>
            <strong>{s.title}</strong>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ================================================= HERO 3 — H-O ========== */
export function FactorBalance() {
  return (
    <div className="ib-scene ib-m3-factor">
      <div className="m3ft-countries">
        <article className="m3ft-country" style={{ '--i': 0 }}>
          <span>China</span>
          <div className="m3ft-stack">
            <div className="m3ft-bar m3ft-labour" style={{ '--w': 88 }}><em>Labour</em></div>
            <div className="m3ft-bar m3ft-capital" style={{ '--w': 32 }}><em>Capital</em></div>
          </div>
          <strong>Labour-abundant</strong>
          <p>Export labour-intensive goods</p>
        </article>
        <article className="m3ft-country" style={{ '--i': 1 }}>
          <span>USA</span>
          <div className="m3ft-stack">
            <div className="m3ft-bar m3ft-labour" style={{ '--w': 36 }}><em>Labour</em></div>
            <div className="m3ft-bar m3ft-capital" style={{ '--w': 90 }}><em>Capital</em></div>
          </div>
          <strong>Capital-abundant</strong>
          <p>Export capital-intensive goods</p>
        </article>
      </div>
      <ol className="m3ft-logic">
        <li style={{ '--i': 0 }}>Abundant factor</li>
        <li style={{ '--i': 1 }}>Lower relative cost</li>
        <li style={{ '--i': 2 }}>Specialization</li>
        <li style={{ '--i': 3 }}>Export</li>
      </ol>
    </div>
  )
}

export function FactorAssumptionsBoard({
  items = [
    { title: 'PPT assumptions', text: '2×2×2 · perfect competition · diminishing returns · identical tech' },
    { title: 'Labour-intensive exports', text: 'Textiles, garments, light manufacturing' },
    { title: 'Skill / knowledge factors', text: 'IT services and GCCs as advanced talent' },
    { title: 'Capital & land', text: 'Auto and pharma clusters combine density' },
  ],
}) {
  return (
    <div className="ib-scene ib-m3-factor-assump">
      {items.map((item, i) => (
        <article key={item.title} style={{ '--i': i }}>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

export function ClassicalTrio() {
  return (
    <div className="ib-scene ib-m3-trio">
      <article className="m3tr-abs" style={{ '--i': 0 }}>
        <em className="m3tr-glyph m3tr-columns" aria-hidden="true" />
        <span>Absolute</span>
        <strong>Efficiency</strong>
        <p>Lower absolute cost / higher productivity</p>
      </article>
      <article className="m3tr-comp" style={{ '--i': 1 }}>
        <em className="m3tr-glyph m3tr-balance" aria-hidden="true" />
        <span>Comparative</span>
        <strong>Relative efficiency</strong>
        <p>Lower opportunity cost</p>
      </article>
      <article className="m3tr-ho" style={{ '--i': 2 }}>
        <em className="m3tr-glyph m3tr-stacks" aria-hidden="true" />
        <span>H–O</span>
        <strong>Factor abundance</strong>
        <p>Labour · capital · land endowments</p>
      </article>
    </div>
  )
}

/* ================================================= PLC =================== */
export function PlcCurve() {
  const stages = [
    { id: 'intro', title: 'Introduction', text: 'Innovation-led · location flexible' },
    { id: 'growth', title: 'Growth', text: 'Rivals enter · overseas demand rises' },
    { id: 'maturity', title: 'Maturity', text: 'Global demand stabilizes' },
    { id: 'decline', title: 'Decline', text: 'Rich markets move on faster' },
  ]
  return (
    <div className="ib-scene ib-m3-plc">
      <svg className="m3plc-svg" viewBox="0 0 560 220" aria-hidden="true">
        <path
          className="m3plc-curve"
          d="M40 180 C100 170, 140 80, 200 70 S300 90, 340 110 S420 150, 520 190"
          fill="none"
        />
        {[
          [70, 168],
          [200, 72],
          [340, 110],
          [500, 178],
        ].map(([x, y], i) => (
          <g key={stages[i].id} className="m3plc-dot" style={{ '--i': i }}>
            <circle cx={x} cy={y} r="7" />
            <text x={x} y={y - 14} textAnchor="middle">{stages[i].title}</text>
          </g>
        ))}
      </svg>
      <ul className="m3plc-legend">
        {stages.map((s, i) => (
          <li key={s.id} style={{ '--i': i }}>
            <strong>{s.title}</strong>
            <span>{s.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ================================================= HERO 4 — PLC MAP ====== */
/** Production migration through time — not Module 1 routes / Module 2 risk. */
export function PlcMigration() {
  const stages = [
    { m: usa, name: 'USA', role: 'Innovation hub', kind: 'hq', side: 'left', band: 'innovate' },
    { m: germany, name: 'Germany', role: 'Early developed market', side: 'top-right', band: 'early' },
    { m: japan, name: 'Japan', role: 'Developed expansion', side: 'top', band: 'expand' },
    { m: china, name: 'China', role: 'Production scale', side: 'top', band: 'produce' },
    { m: vietnam, name: 'Vietnam', role: 'Mature relocation', side: 'bottom', band: 'mature' },
    { m: india, name: 'India', role: 'Growing capacity', kind: 'regional', side: 'bottom', band: 'mature' },
  ]
  return (
    <div className="ib-scene ib-m3-migrate">
      <WorldMap className="m3mg-map" showGraticule={false}>
        <MapPulse lon={usa.lon} lat={usa.lat} />
        {stages.map((item, i) => (
          <g key={item.name} className={`m3mg-halo m3mg-${item.band}`} style={{ '--i': i }}>
            <MapMarker
              lon={item.m.lon}
              lat={item.m.lat}
              name={item.name}
              role={item.role}
              kind={item.kind || 'market'}
              side={item.side}
              i={i}
              arrive={i}
            />
          </g>
        ))}
        {/* Migration arcs — conceptual production path */}
        <path
          className="m3mg-arc"
          d={`M${project(usa.lon, usa.lat).x} ${project(usa.lon, usa.lat).y}
              Q ${project(germany.lon, germany.lat).x} ${project(germany.lon, germany.lat).y - 40}
                ${project(china.lon, china.lat).x} ${project(china.lon, china.lat).y}`}
          fill="none"
        />
      </WorldMap>
      <ol className="m3mg-timeline">
        <li style={{ '--i': 0 }}>Innovation location</li>
        <li style={{ '--i': 1 }}>Early market</li>
        <li style={{ '--i': 2 }}>Developed expansion</li>
        <li style={{ '--i': 3 }}>Production relocation</li>
        <li style={{ '--i': 4 }}>Mature global production</li>
      </ol>
      <p className="m3mg-lock">PLC map = production migration through time.</p>
    </div>
  )
}

export function PlcInnovatorAdvantages({
  items = [
    { title: 'Sustains competitive drive', text: 'Continuous innovation keeps the race alive.' },
    { title: 'Stimulates trade', text: 'New products create export waves, then shifts.' },
    { title: 'Enhances comparative advantage', text: 'Innovation renews relative strength.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m3-plc-adv">
      {items.map((item, i) => (
        <article key={item.title} style={{ '--i': i }}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

export function SmartphonePlcCase({
  layers = [
    { title: 'Innovation', text: 'Design near advanced hubs' },
    { title: 'Design / IP', text: 'Capability-dense locations' },
    { title: 'Components', text: 'Specialized supplier geography' },
    { title: 'Manufacturing', text: 'Cost–ecosystem balance' },
    { title: 'Global demand', text: 'Growth across markets' },
    { title: 'Maturity', text: 'Cost and renew cycle' },
  ],
}) {
  return (
    <div className="ib-scene ib-m3-phone">
      <div className="m3ph-device" aria-hidden="true">
        <div className="m3ph-screen">
          <span>Smartphone</span>
          <strong>PLC</strong>
        </div>
      </div>
      <ol className="m3ph-layers">
        {layers.map((l, i) => (
          <li key={l.title} style={{ '--i': i }}>
            <strong>{l.title}</strong>
            <span>{l.text}</span>
          </li>
        ))}
      </ol>
      <p className="m3ph-lock">The framework interprets the case — timing of export, FDI and renewal.</p>
    </div>
  )
}

export function PlcModernSplit() {
  return (
    <div className="ib-scene ib-m3-plc-modern">
      <article style={{ '--i': 0 }}>
        <span>Still useful</span>
        <strong>Physical products</strong>
        <p>Manufacturing shifts · FDI timing · export waves</p>
      </article>
      <article style={{ '--i': 1 }}>
        <span>Weaker for</span>
        <strong>Pure digital</strong>
        <p>Instant global launches · compressed stages</p>
      </article>
      <article style={{ '--i': 2 }}>
        <span>Modern hybrid</span>
        <strong>PLC + GVC</strong>
        <p>China+1 · friend-shoring · stage-aware capacity</p>
      </article>
    </div>
  )
}

/* ================================================= RIVALRY =============== */
export function RivalryArena({
  note = 'The PPT types slide lists Krugman’s New Trade Theory alongside strategic rivalry — both shift attention toward imperfect competition, scale and firm strategy.',
}) {
  return (
    <div className="ib-scene ib-m3-rivalry">
      <div className="m3rv-shift">
        <span>Country cost differences</span>
        <em>→</em>
        <strong>Firm strategy</strong>
      </div>
      <div className="m3rv-arena">
        <article style={{ '--i': 0 }}><strong>Apple</strong><span>Ecosystem · IP</span></article>
        <article style={{ '--i': 1 }}><strong>Tesla</strong><span>Product · scale</span></article>
        <article style={{ '--i': 2 }}><strong>NVIDIA</strong><span>R&D · lock-in</span></article>
        <article style={{ '--i': 3 }}><strong>TSMC</strong><span>Process · capacity</span></article>
      </div>
      <p className="m3rv-note">{note}</p>
      <p className="m3rv-lock">International business is not explained only by country resources.</p>
    </div>
  )
}

export function RivalryWeapons({
  weapons = [
    { title: 'R&D', text: 'Superior products and processes' },
    { title: 'Intellectual property', text: 'Patents slow imitation' },
    { title: 'Economies of scale', text: 'Volume lowers unit cost' },
    { title: 'Experience curve', text: 'Learning improves efficiency' },
    { title: 'Market access', text: 'Alliances and distribution' },
  ],
}) {
  return (
    <div className="ib-scene ib-m3-weapons">
      {weapons.map((w, i) => (
        <article key={w.title} style={{ '--i': i }}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <strong>{w.title}</strong>
          <p>{w.text}</p>
        </article>
      ))}
      <p className="m3wp-note">Krugman / new-trade framing: scale & imperfect competition (supplementary).</p>
    </div>
  )
}

/* ================================================= HERO 5 — PORTER ======= */
/** Diamond assembles one determinant at a time. */
export function PorterDiamondBuild({ assembled = true }) {
  const nodes = [
    { id: 'factor', title: 'Factor Conditions', pos: 'top' },
    { id: 'demand', title: 'Demand Conditions', pos: 'right' },
    { id: 'related', title: 'Related & Supporting', pos: 'bottom' },
    { id: 'rivalry', title: 'Firm Strategy & Rivalry', pos: 'left' },
  ]
  return (
    <div className={`ib-scene ib-m3-diamond ${assembled ? 'is-assembled' : ''}`}>
      <p className="m3dm-q">Why do some industries become globally competitive in particular countries?</p>
      <div className="m3dm-stage">
        <svg className="m3dm-svg" viewBox="0 0 320 320" aria-hidden="true">
          <polygon className="m3dm-shape" points="160,36 284,160 160,284 36,160" />
          <line className="m3dm-link" x1="160" y1="36" x2="284" y2="160" />
          <line className="m3dm-link" x1="284" y1="160" x2="160" y2="284" />
          <line className="m3dm-link" x1="160" y1="284" x2="36" y2="160" />
          <line className="m3dm-link" x1="36" y1="160" x2="160" y2="36" />
          <line className="m3dm-link m3dm-cross" x1="160" y1="36" x2="160" y2="284" />
          <line className="m3dm-link m3dm-cross" x1="36" y1="160" x2="284" y2="160" />
        </svg>
        {nodes.map((n, i) => (
          <div key={n.id} className={`m3dm-node m3dm-${n.pos}`} style={{ '--i': i }}>
            <strong>{n.title}</strong>
          </div>
        ))}
        <div className="m3dm-core">DIAMOND</div>
      </div>
      <p className="m3dm-lock">THE DIAMOND ACTIVATES — determinants reinforce each other.</p>
    </div>
  )
}

export function DiamondDeterminants({
  items = [
    { title: 'Factor conditions', text: 'Basic and advanced factors — created by investment.' },
    { title: 'Demand conditions', text: 'Sophisticated domestic buyers push quality up.' },
    { title: 'Related & supporting', text: 'Suppliers and related sectors share pressure.' },
    { title: 'Firm strategy & rivalry', text: 'Home rivalry forges global strength.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m3-determinants">
      <div className="m3dd-mini" aria-hidden="true">
        <span className="m3dd-d m3dd-t" />
        <span className="m3dd-d m3dd-r" />
        <span className="m3dd-d m3dd-b" />
        <span className="m3dd-d m3dd-l" />
      </div>
      {items.map((item, i) => (
        <article key={item.title} style={{ '--i': i }}>
          <em>{String(i + 1).padStart(2, '0')}</em>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

/* ================================================= INDIA / BENGALURU ===== */
export function BengaluruCluster() {
  const factors = [
    { title: 'Factor', text: 'Skilled English-capable talent · engineering pipeline', map: 'factor' },
    { title: 'Demand', text: 'Exacting global clients forced excellence', map: 'demand' },
    { title: 'Related', text: 'Telecom · training · campuses · cloud/AI stacks', map: 'related' },
    { title: 'Rivalry', text: 'TCS · Infosys · Wipro compete for talent & clients', map: 'rivalry' },
  ]
  return (
    <div className="ib-scene ib-m3-bengaluru">
      <div className="m3bg-mapwrap">
        <WorldMap className="m3bg-map" showGraticule={false}>
          <MapPulse lon={india.lon} lat={india.lat} />
          <MapMarker lon={india.lon} lat={india.lat} name="India" role="National industry" kind="hq" side="left" i={0} arrive={0} />
          <MapMarker
            lon={bengaluru.lon}
            lat={bengaluru.lat}
            name="Bengaluru"
            role="IT / GCC cluster"
            kind="regional"
            side="bottom"
            i={1}
            arrive={1}
          />
        </WorldMap>
        <div className="m3bg-focus">
          <span>INDIA</span>
          <em>→</em>
          <strong>BENGALURU</strong>
        </div>
      </div>
      <ul className="m3bg-diamond">
        {factors.map((f, i) => (
          <li key={f.title} className={`m3bg-${f.map}`} style={{ '--i': i }}>
            <strong>{f.title}</strong>
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
      <p className="m3bg-lock">The Diamond is not just theory — it operates around Bengaluru.</p>
    </div>
  )
}

export function PorterVsHO() {
  return (
    <div className="ib-scene ib-m3-porter-ho">
      <article className="m3ph-ho" style={{ '--i': 0 }}>
        <em className="m3ph-glyph m3ph-stacks" aria-hidden="true" />
        <span>H–O</span>
        <strong>What resources does the country possess?</strong>
        <p>Relative factor abundance → export pattern</p>
      </article>
      <article className="m3ph-porter" style={{ '--i': 1 }}>
        <em className="m3ph-glyph m3ph-diamond" aria-hidden="true" />
        <span>Porter</span>
        <strong>Why does an industry become globally competitive there?</strong>
        <p>Interacting determinants · created advantages</p>
      </article>
      <div className="m3ph-tsmc">
        <span>Callback · TSMC / Taiwan</span>
        <p>Skills · suppliers · demanding customers · rivalry — diamond over labour-cost alone.</p>
      </div>
    </div>
  )
}

/* ================================================= SYNTHESIS / FINALE ==== */
export function TheorySynthesis() {
  const path = [
    { motif: 'vault', title: 'Mercantilism', explain: 'Wealth & power' },
    { motif: 'columns', title: 'Absolute', explain: 'Efficiency' },
    { motif: 'balance', title: 'Comparative', explain: 'Relative advantage' },
    { motif: 'stacks', title: 'H–O', explain: 'Resources' },
    { motif: 'curve', title: 'PLC', explain: 'Innovation & time' },
    { motif: 'arena', title: 'Rivalry', explain: 'Strategy' },
    { motif: 'diamond', title: 'Porter', explain: 'Competitive ecosystem' },
  ]
  return (
    <div className="ib-scene ib-m3-synthesis">
      <ol className="m3sy-rail">
        {path.map((p, i) => (
          <li key={p.title} className={`m3sy-item m3sy-${p.motif}`} style={{ '--i': i }}>
            <em className={`m3sy-glyph m3sy-glyph-${p.motif}`} aria-hidden="true" />
            <strong>{p.title}</strong>
            <span>{p.explain}</span>
          </li>
        ))}
      </ol>
      <p className="m3sy-arc">
        TRADE → EFFICIENCY → RELATIVE ADVANTAGE → RESOURCES → INNOVATION → STRATEGY → COMPETITIVE ECOSYSTEM
      </p>
    </div>
  )
}

export function InsightPayoff({
  points = [
    { title: 'You can narrate the ladder', text: 'What problem each theory was created to solve.' },
    { title: 'You can work the numbers', text: 'Absolute vs comparative using the PPT wheat–cloth case.' },
    { title: 'You can choose a lens', text: 'Cost, factors, stage, firm weapons or national diamond.' },
    { title: 'You are ready for Module 4', text: 'Institutions and governance that shape the rules of trade.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m3-payoff">
      <div className="m3po-motifs">
        {THEORY_LADDER.map((t, i) => (
          <span key={t.id} className={`m3po-m m3po-${t.motif}`} style={{ '--i': i }}>{t.short}</span>
        ))}
      </div>
      <div className="m3po-eq">
        <em>OPPORTUNITY</em>
        <span>+</span>
        <em>JUDGMENT</em>
        <span>+</span>
        <strong>INSIGHT</strong>
      </div>
      <p className="m3po-line">Managers see markets. Insight explains the forces behind them.</p>
      <div className="m3po-points">
        {points.map((p, i) => (
          <article key={p.title} style={{ '--i': i }}>
            <strong>{p.title}</strong>
            <span>{p.text}</span>
          </article>
        ))}
      </div>
      <p className="m3po-next">Ⅳ — GOVERNANCE · International Institutions</p>
    </div>
  )
}

/** Quiet exam board chrome — Motifs stamp for revision readability. */
export function ExamMemoryLadder() {
  return (
    <div className="ib-scene ib-m3-exam-ladder" aria-hidden="true">
      <p className="m3ex-title">Memory ladder</p>
      <ol>
        {THEORY_LADDER.map((t, i) => (
          <li key={t.id} className={`m3ex-${t.motif}`} style={{ '--i': i }}>
            <em />
            <span>{t.short}</span>
          </li>
        ))}
      </ol>
      <p className="m3ex-num">A 10/5 vs B 5/4 · wheat / cloth</p>
    </div>
  )
}

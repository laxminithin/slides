/**
 * International Business — Module 2 signature scenes (JUDGMENT).
 *
 * Visual grammar: SCAN → COMPARE → IDENTIFY RISK → INTERPRET → DECIDE
 * Maps = intelligence / comparison / risk (not Module 1 route-bloom).
 * Motion lives in ibChapter2.css. Frozen V7 engine untouched.
 */

import {
  WorldMap, MapMarker, MapPulse, MARKETS,
} from './worldmap'

const { usa, india, china, germany, singapore, uae, japan } = MARKETS

const SCAN_MARKETS = [
  { m: india, role: 'Home · HQ', kind: 'hq', side: 'bottom' },
  { m: usa, role: 'Capital & Market', side: 'left' },
  { m: germany, role: 'Europe', side: 'top-right' },
  { m: china, role: 'Production', side: 'top' },
  { m: uae, role: 'Middle East', side: 'top' },
  { m: singapore, role: 'Regional Hub', kind: 'regional', side: 'bottom' },
]

const LAYERS = [
  { id: 'political', label: 'Political', hint: 'Policy · stability · power' },
  { id: 'legal', label: 'Legal', hint: 'Rules · compliance · liability' },
  { id: 'economic', label: 'Economic', hint: 'Income · inflation · FX' },
  { id: 'tech', label: 'Technological', hint: 'Digital · R&D · reach' },
  { id: 'culture', label: 'Socio-Cultural', hint: 'Language · values · taste' },
  { id: 'eco', label: 'Ecological', hint: 'Resources · climate · norms' },
]

/* ============================================================ SCENE A ===== */
/** Opener — quiet world → markets → environment layers → JUDGMENT lock. */
export function ClimateScanOpener({ module = 2 }) {
  return (
    <div className="ib-scene ib-m2-climate" data-slide-content="true">
      <div className="m2c-mapwrap" aria-hidden="false">
        <WorldMap className="m2c-map" showGraticule={false}>
          <MapPulse lon={india.lon} lat={india.lat} />
          {SCAN_MARKETS.map((item, i) => (
            <MapMarker
              key={item.m.name}
              lon={item.m.lon}
              lat={item.m.lat}
              name={item.m.name === 'United States' ? 'USA' : item.m.name}
              role={item.role}
              kind={item.kind || 'market'}
              side={item.side}
              i={i}
              arrive={i}
            />
          ))}
        </WorldMap>
        <div className="m2c-scanline" aria-hidden="true" />
        <ul className="m2c-layers" aria-label="Environment layers">
          {LAYERS.map((layer, i) => (
            <li key={layer.id} className={`m2c-layer m2c-layer-${layer.id}`} style={{ '--i': i }}>
              <strong>{layer.label}</strong>
              <span>{layer.hint}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="m2c-copy">
        <p className="m2c-eyebrow">International Business · 22MBA401 · Chapter {String(module).padStart(2, '0')}</p>
        <h1 className="m2c-title">Judgment</h1>
        <p className="m2c-sub">International Business Environment</p>
        <p className="m2c-hint">Opportunity means little without understanding the environment.</p>
      </div>
    </div>
  )
}

/* ============================================================ SCENE B ===== */
/** Components — the firm inside six interacting environments. */
export function SixForcesEnvironment({
  center = 'The International Firm',
  forces = [
    { title: 'Political', text: 'Systems, stability, ideology and policy toward foreign firms.', icon: 'gov' },
    { title: 'Legal', text: 'International, home and host laws — contracts, IP, liability.', icon: 'law' },
    { title: 'Economic', text: 'Income, inflation, FX, trade conditions and development.', icon: 'fx' },
    { title: 'Technological', text: 'Infrastructure, R&D, digital readiness and absorption.', icon: 'net' },
    { title: 'Socio-cultural', text: 'Language, religion, values, demographics and behaviour.', icon: 'people' },
    { title: 'Ecological', text: 'Resources, climate, pollution norms and fragile zones.', icon: 'planet' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-forces">
      <div className="m2f-core">
        <span className="m2f-kicker">Centre of analysis</span>
        <strong>{center}</strong>
      </div>
      {forces.map((f, i) => (
        <article key={f.title} className={`m2f-force m2f-${i + 1} m2f-icon-${f.icon || 'gov'}`} style={{ '--i': i }}>
          <em className="m2f-glyph" aria-hidden="true" />
          <strong>{f.title}</strong>
          <p>{f.text}</p>
        </article>
      ))}
      <p className="m2f-caption">A company does not operate independently — it operates inside interacting environments.</p>
    </div>
  )
}

/* ============================================================ SCENE C ===== */
/** Country risk map — named markets, qualitative risk, MBA question. */
export function CountryRiskMap({
  question = 'Would you enter every attractive market?',
  lock = 'Market potential ≠ Market suitability.',
  showQuestion = true,
}) {
  const risks = [
    { m: india, role: 'Stable growth · Policy watch', band: 'watch', side: 'bottom' },
    { m: usa, role: 'Deep market · Regulatory intensity', band: 'moderate', side: 'left' },
    { m: china, role: 'Scale · Geopolitical tension', band: 'elevated', side: 'top' },
    { m: germany, role: 'Rule clarity · High standards', band: 'favorable', side: 'top-right' },
    { m: uae, role: 'Hub access · Open trade', band: 'favorable', side: 'top' },
    { m: singapore, role: 'High readiness · Low friction', band: 'favorable', side: 'bottom' },
  ]
  return (
    <div className="ib-scene ib-m2-risk">
      <WorldMap className="m2r-map" showGraticule>
        <MapPulse lon={india.lon} lat={india.lat} />
        {risks.map((item, i) => (
          <g key={item.m.name} className={`m2r-halo m2r-${item.band}`} style={{ '--i': i }}>
            <MapMarker
              lon={item.m.lon}
              lat={item.m.lat}
              name={item.m.name === 'United States' ? 'USA' : item.m.name}
              role={item.role}
              kind={item.m === india ? 'hq' : item.m === singapore ? 'regional' : 'market'}
              side={item.side}
              i={i}
              arrive={i}
            />
          </g>
        ))}
      </WorldMap>
      <ul className="m2r-legend" aria-label="Qualitative risk bands">
        <li className="m2r-favorable">Favorable climate</li>
        <li className="m2r-moderate">Moderate complexity</li>
        <li className="m2r-watch">Watch closely</li>
        <li className="m2r-elevated">Elevated risk</li>
      </ul>
      {showQuestion && (
        <div className="m2r-ask">
          <p>{question}</p>
          <strong>{lock}</strong>
        </div>
      )}
    </div>
  )
}

/* ================================================= SCAN / PROCESS ======== */
export function ScanProcess({
  steps = [
    { title: 'Identify forces', text: 'Map political, legal, economic, tech, cultural and ecological signals.' },
    { title: 'Estimate impact', text: 'Score cost, demand, legality, operating model and downside risk.' },
    { title: 'Adapt strategy', text: 'Adjust entry mode, product, pricing, staffing and compliance.' },
    { title: 'Monitor change', text: 'Track elections, FX, tech shifts, regulation and social pressure.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-scanproc">
      <div className="m2sp-rail" aria-hidden="true" />
      {steps.map((step, i) => (
        <article key={step.title} style={{ '--i': i }}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <strong>{step.title}</strong>
          <p>{step.text}</p>
        </article>
      ))}
    </div>
  )
}

/* ================================================= POLITICAL ============= */
export function PoliticalContext({
  watches = [
    { title: 'What managers watch', text: 'Who holds power, how stable it is, and how friendly policy is to foreign capital.' },
    { title: 'What can change overnight', text: 'Tariffs, FDI caps, sanctions, licensing, tax incentives and expropriation risk.' },
    { title: 'Why it is unique abroad', text: 'A firm faces home-country politics and host-country politics at the same time.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-polctx">
      <div className="m2pc-country">
        <span>Host government</span>
        <strong>Policy signal</strong>
        <p>Ideology · Stability · Foreign relations · Controls</p>
      </div>
      <div className="m2pc-firm">
        <span>International firm</span>
        <strong>Daily operations</strong>
        <p>Pricing · Sourcing · Ownership · Market access</p>
      </div>
      <ul className="m2pc-list">
        {watches.map((w, i) => (
          <li key={w.title} style={{ '--i': i }}>
            <strong>{w.title}</strong>
            <p>{w.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PoliticalSystemsBoard({
  items = [
    { title: 'By government form', text: 'Parliamentary governments vs absolutist systems — who makes binding policy and how fast it can reverse.' },
    { title: 'By party structure', text: 'Two-party, multiparty, single-party and dominated one-party systems — predictability of coalitions and opposition pressure.' },
    { title: 'By economic ideology', text: 'Communism, socialism and capitalism — how much the state owns, directs or leaves to markets.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-polsys">
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

export function PoliticalDecisionRoom({
  demand = 'Strong demand in the market',
  pressures = [
    { title: 'Policy uncertainty', dir: 'up' },
    { title: 'Trade restrictions', dir: 'up' },
    { title: 'Political risk', dir: 'up' },
  ],
  choices = ['ENTER', 'WAIT', 'PARTNER', 'AVOID'],
}) {
  return (
    <div className="ib-scene ib-m2-decide">
      <div className="m2d-demand">
        <span>Signal</span>
        <strong>{demand}</strong>
      </div>
      <ul className="m2d-pressures">
        {pressures.map((p, i) => (
          <li key={p.title} style={{ '--i': i }}>
            <strong>{p.title}</strong>
            <em aria-hidden="true">↑</em>
          </li>
        ))}
      </ul>
      <div className="m2d-q">What should the manager do?</div>
      <div className="m2d-choices">
        {choices.map((c, i) => (
          <button type="button" key={c} className="m2d-choice" style={{ '--i': i }} tabIndex={-1}>
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ================================================= LEGAL ================= */
export function LegalBodiesStack({
  bodies = [
    { title: 'International law', text: 'Treaties, conventions and trade rules that govern relations between nations and cross-border commerce.' },
    { title: 'Host-country law', text: 'Local rules on incorporation, labour, tax, consumer protection, data and foreign ownership.' },
    { title: 'Home-country law', text: 'Rules that travel with the firm — anti-bribery, export controls, sanctions and tax reporting.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-legalstack">
      {bodies.map((b, i) => (
        <article key={b.title} className={`m2ls-doc m2ls-${i + 1}`} style={{ '--i': i }}>
          <span>{b.title}</span>
          <p>{b.text}</p>
        </article>
      ))}
      <div className="m2ls-firm">Company → Market</div>
    </div>
  )
}

export function ComplianceCorridor({
  gates = [
    { title: 'Map laws', text: 'International, host and home obligations for the product and market.' },
    { title: 'Design entity', text: 'Branch/subsidiary, licences, IP filings and contract templates.' },
    { title: 'Embed controls', text: 'Anti-bribery, data privacy, product safety and advertising gates.' },
    { title: 'Audit & update', text: 'Monitor enforcement trends, recalls and regulatory circulars.' },
  ],
  topics = ['Contracts', 'IPR', 'Product liability', 'Anti-bribery', 'Data / privacy', 'Consumer protection'],
}) {
  return (
    <div className="ib-scene ib-m2-corridor">
      <div className="m2cc-path">
        <div className="m2cc-start">Company</div>
        {gates.map((g, i) => (
          <article key={g.title} style={{ '--i': i }}>
            <span className="m2cc-gate">Gate {i + 1}</span>
            <strong>{g.title}</strong>
            <p>{g.text}</p>
          </article>
        ))}
        <div className="m2cc-end">Approved path → Market</div>
      </div>
      <ul className="m2cc-topics">
        {topics.map((t, i) => <li key={t} style={{ '--i': i }}>{t}</li>)}
      </ul>
    </div>
  )
}

export function LegalFactorsBoard({
  items = [
    { title: 'IPR & counterfeiting', text: 'Patents, trademarks and copyrights must be registered and enforced where you sell.' },
    { title: 'Contracts & liability', text: 'Who bears risk for defects, delays, recalls and warranty across jurisdictions.' },
    { title: 'Bribery & corruption', text: 'Facilitation pressure abroad can still violate home anti-bribery statutes.' },
    { title: 'Branch vs subsidiary', text: 'Legal form changes tax, liability ring-fencing and regulatory permission.' },
    { title: 'Grey markets', text: 'Parallel imports undermine pricing and brand control across borders.' },
    { title: 'Ads & promotions', text: 'Claims, comparative ads and influencer rules differ sharply by country.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-legalfactors">
      {items.map((item, i) => (
        <article key={item.title} style={{ '--i': i }}>
          <span className="m2lf-stamp">Check</span>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

/* ================================================= ECONOMIC ============== */
export function EconomicSides({
  items = [
    { title: 'Demand side', text: 'Income levels, disposable income and consumer spending patterns.' },
    { title: 'Cost & risk side', text: 'Inflation, taxes, interest rates and exchange-rate volatility.' },
    { title: 'Openness side', text: 'Trade conditions, capital flows and the size/composition of the economy.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-econsides">
      {items.map((item, i) => (
        <article key={item.title} style={{ '--i': i }}>
          <strong>{item.title}</strong>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  )
}

export function IndicatorBoard({
  signals = [
    { title: 'Income levels', text: 'Per-capita and disposable income decide price tiers and product mix.', tag: 'Demand' },
    { title: 'Inflation', text: 'Erodes margins, complicates contracts and forces frequent repricing.', tag: 'Cost' },
    { title: 'Exchange rates', text: 'Move reported profit, import costs and competitiveness overnight.', tag: 'FX' },
    { title: 'Trade conditions', text: 'Tariffs, logistics cost, deficits/surpluses and openness to imports.', tag: 'Trade' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-indicators">
      <header>
        <span>Executive indicator board</span>
        <strong>Country economic climate</strong>
      </header>
      <div className="m2ib-grid">
        {signals.map((s, i) => (
          <article key={s.title} style={{ '--i': i }}>
            <em>{s.tag}</em>
            <strong>{s.title}</strong>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function FxMicroStory({
  setup = 'Indian company imports from USA',
  chain = [
    { title: '₹ / $ changes', text: 'Exchange-rate move' },
    { title: 'Import cost', text: '↑' },
    { title: 'Product cost', text: '↑' },
    { title: 'Margin', text: '↓' },
  ],
  responses = ['Raise price?', 'Absorb cost?', 'Hedge?', 'Change supplier?'],
}) {
  return (
    <div className="ib-scene ib-m2-fx">
      <p className="m2fx-setup">{setup}</p>
      <div className="m2fx-chain">
        {chain.map((c, i) => (
          <article key={c.title} style={{ '--i': i }}>
            <strong>{c.title}</strong>
            <span>{c.text}</span>
          </article>
        ))}
      </div>
      <div className="m2fx-q">Managerial response?</div>
      <ul className="m2fx-opts">
        {responses.map((r, i) => <li key={r} style={{ '--i': i }}>{r}</li>)}
      </ul>
    </div>
  )
}

export function DevelopmentSplit({
  left = {
    title: 'Economic factors',
    text: 'Capital formation, natural resources, marketable agricultural surplus, foreign-trade conditions and the economic system.',
  },
  right = {
    title: 'Non-economic factors',
    text: 'Human resources, technical know-how & education, political freedom, social organization, corruption levels and desire to develop.',
  },
}) {
  return (
    <div className="ib-scene ib-m2-devsplit">
      <article className="m2ds-left" style={{ '--i': 0 }}>
        <span>Block A</span>
        <strong>{left.title}</strong>
        <p>{left.text}</p>
      </article>
      <div className="m2ds-vs" aria-hidden="true">+</div>
      <article className="m2ds-right" style={{ '--i': 1 }}>
        <span>Block B</span>
        <strong>{right.title}</strong>
        <p>{right.text}</p>
      </article>
    </div>
  )
}

/* ================================================= TECHNOLOGY ============ */
export function TechAcceleration({
  stages = [
    { title: 'Traditional firm', text: 'Local process, limited reach' },
    { title: 'Digital capability', text: 'Connectivity & platforms' },
    { title: 'Automation', text: 'Cost · quality · speed' },
    { title: 'Global coordination', text: 'Cross-border operations' },
    { title: 'E-commerce & data', text: 'Instant market access' },
    { title: 'Competitive advantage', text: 'Harder to imitate — until rivals catch up' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-techacc">
      {stages.map((s, i) => (
        <article key={s.title} style={{ '--i': i }}>
          <span>{String(i + 1).padStart(2, '0')}</span>
          <strong>{s.title}</strong>
          <p>{s.text}</p>
        </article>
      ))}
    </div>
  )
}

export function TechFeaturesOrbit({
  center = 'Technology',
  items = ['Stage', 'Rate of change', 'R&D infra', 'Orientation', 'Import & absorb', 'Obsolescence'],
}) {
  return (
    <div className="ib-scene ib-m2-techfeat">
      <div className="m2tf-core">{center}</div>
      {items.map((item, i) => (
        <span key={item} className={`m2tf-n m2tf-${i + 1}`} style={{ '--i': i }}>{item}</span>
      ))}
    </div>
  )
}

export function TechImpactFlow({
  steps = [
    { title: 'Lower cost', text: 'Automation and process tech shrink unit cost and error rates.' },
    { title: 'Raise reach', text: 'E-commerce and cloud let firms sell abroad on day one.' },
    { title: 'Compress time', text: 'Shorter innovation cycles force continuous upgrade investment.' },
    { title: 'Create risk', text: 'Cyber attacks, tech sanctions and obsolescence can strand assets.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-techimpact">
      {steps.map((s, i) => (
        <article key={s.title} style={{ '--i': i }}>
          <strong>{s.title}</strong>
          <p>{s.text}</p>
        </article>
      ))}
    </div>
  )
}

/* ================================================= CULTURE =============== */
export function CultureCanvas({
  markers = [
    { title: 'Language', text: 'Meaning travels poorly without redesign' },
    { title: 'Religion & values', text: 'Diet, dress, calendars, trust' },
    { title: 'Demographics', text: 'Age, literacy, urbanisation' },
    { title: 'Consumer behaviour', text: 'Impulse, status, dual income' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-culture">
      <WorldMap className="m2cu-map" showGraticule={false}>
        <MapMarker lon={india.lon} lat={india.lat} name="India" role="Local preference" kind="hq" side="bottom" i={0} arrive={0} />
        <MapMarker lon={japan.lon} lat={japan.lat} name="Japan" role="Market expectation" side="right" i={1} arrive={1} />
        <MapMarker lon={uae.lon} lat={uae.lat} name="UAE" role="Cultural consideration" side="top" i={2} arrive={2} />
        <MapMarker lon={germany.lon} lat={germany.lat} name="Germany" role="Consumer & regulatory" side="top-right" i={3} arrive={3} />
        <MapMarker lon={usa.lon} lat={usa.lat} name="USA" role="Brand origin markets" side="left" i={4} arrive={4} />
        <MapMarker lon={singapore.lon} lat={singapore.lat} name="Singapore" role="Regional fluency" kind="regional" side="bottom" i={5} arrive={5} />
      </WorldMap>
      <ul className="m2cu-markers">
        {markers.map((m, i) => (
          <li key={m.title} style={{ '--i': i }}>
            <strong>{m.title}</strong>
            <span>{m.text}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function LocalizationStory({
  markets = [
    { place: 'INDIA', note: 'Local preference' },
    { place: 'JAPAN', note: 'Market expectation' },
    { place: 'MIDDLE EAST', note: 'Cultural consideration' },
    { place: 'EUROPE', note: 'Consumer / regulatory context' },
  ],
  question = 'What must remain global, and what must become local?',
}) {
  return (
    <div className="ib-scene ib-m2-localize">
      <div className="m2loc-brand">GLOBAL BRAND</div>
      <div className="m2loc-markets">
        {markets.map((m, i) => (
          <article key={m.place} style={{ '--i': i }}>
            <strong>{m.place}</strong>
            <span>{m.note}</span>
          </article>
        ))}
      </div>
      <div className="m2loc-vs">
        <em>STANDARDIZE</em>
        <span>vs</span>
        <em>ADAPT</em>
      </div>
      <p className="m2loc-q">{question}</p>
    </div>
  )
}

export function CultureMeaningOrbit({
  center = 'Culture',
  items = ['Time', 'Thought patterns', 'Personal space', 'Family roles', 'Language', 'Religion', 'Achievement', 'Social behaviour'],
}) {
  return (
    <div className="ib-scene ib-m2-cultorbit">
      <div className="m2co-core">{center}</div>
      {items.map((item, i) => (
        <span key={item} className={`m2co-n m2co-${i + 1}`} style={{ '--i': i }}>{item}</span>
      ))}
    </div>
  )
}

/* ================================================= ETHICS / CSR ========== */
export function EthicsDilemmaBoard({
  issues = [
    { title: 'Export subsidies', text: 'State support can distort competition and invite retaliation.' },
    { title: 'Bio-piracy', text: 'Exploiting genetic resources/traditional knowledge without fair benefit sharing.' },
    { title: 'Safety & environment', text: 'Lower host standards do not erase moral duty for safe products and clean operations.' },
    { title: 'Corruption', text: 'Bribes and facilitation payments destroy fair markets and brand trust.' },
    { title: 'Consumerism', text: 'Truth in advertising, product claims and fair dealing with buyers.' },
    { title: 'Transfer pricing', text: 'Shifting profits across borders raises fairness and tax-morality questions.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-ethics">
      <div className="m2e-tensions">
        <div><strong>PROFIT</strong><span>↔</span><strong>ETHICS</strong></div>
        <div><strong>SPEED</strong><span>↔</span><strong>COMPLIANCE</strong></div>
        <div><strong>LOCAL PRACTICE</strong><span>↔</span><strong>GLOBAL STANDARD</strong></div>
      </div>
      <div className="m2e-issues">
        {issues.map((issue, i) => (
          <article key={issue.title} style={{ '--i': i }}>
            <strong>{issue.title}</strong>
            <p>{issue.text}</p>
          </article>
        ))}
      </div>
      <p className="m2e-q">What should the manager do?</p>
    </div>
  )
}

export function EthicsDecisionFlow({
  left = {
    title: 'Why ethics matters',
    text: 'Meets basic human needs; supports durable profit; fills gaps law cannot police; improves decisions and cooperation; promotes moral/social values.',
  },
  right = {
    title: 'How managers decide',
    text: 'Clarify facts → identify stakeholders → weigh duties vs consequences → choose the option you can defend publicly → document and review.',
  },
}) {
  return (
    <div className="ib-scene ib-m2-ethicsflow">
      <article style={{ '--i': 0 }}>
        <span>Situation → Pressure</span>
        <strong>{left.title}</strong>
        <p>{left.text}</p>
      </article>
      <article style={{ '--i': 1 }}>
        <span>Action → Consequence</span>
        <strong>{right.title}</strong>
        <p>{right.text}</p>
      </article>
    </div>
  )
}

export function CsrToolsImpact({
  tools = [
    { title: 'Accountability', text: 'Clear ownership for social and environmental outcomes.' },
    { title: 'Codes of conduct', text: 'Standards for labour, suppliers, integrity and human rights.' },
    { title: 'Fair trade', text: 'Pricing and sourcing that share value with producers.' },
    { title: 'Social accountability', text: 'Auditable labour and workplace norms across the chain.' },
    { title: 'Responsible investing', text: 'Capital allocated with social/environmental screens.' },
    { title: 'Global reporting', text: 'Transparent disclosure of impacts to stakeholders.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-csrtools">
      <div className="m2ct-flow">
        <span>Responsibility</span>
        <span>Action</span>
        <span>Stakeholders</span>
        <span>Impact</span>
        <span>Sustainable value</span>
      </div>
      <div className="m2ct-grid">
        {tools.map((t, i) => (
          <article key={t.title} style={{ '--i': i }}>
            <strong>{t.title}</strong>
            <p>{t.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function CsrStakeholderMap({
  nodes = [
    { title: 'Company', text: 'Strategy & capital' },
    { title: 'Employees', text: 'Dignity & capability' },
    { title: 'Community', text: 'Local licence' },
    { title: 'Environment', text: 'Resources & climate' },
    { title: 'Customers', text: 'Trust & preference' },
    { title: 'Society', text: 'Long-run legitimacy' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-csrmap">
      {nodes.map((n, i) => (
        <article key={n.title} className={`m2cm-n m2cm-${i + 1}`} style={{ '--i': i }}>
          <strong>{n.title}</strong>
          <span>{n.text}</span>
        </article>
      ))}
      <div className="m2cm-hub">CSR</div>
    </div>
  )
}

export function CsrDebateSplit({
  side = 'for',
  items = [],
}) {
  return (
    <div className={`ib-scene ib-m2-csrdebate m2cd-${side}`}>
      <header>{side === 'for' ? 'Arguments for CSR' : 'Arguments against CSR'}</header>
      <div className="m2cd-grid">
        {items.map((item, i) => (
          <article key={item.title} style={{ '--i': i }}>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function EsgBoard({
  items = ['Environment', 'Social', 'Governance', 'Climate risk', 'Supply chain', 'Disclosure'],
}) {
  return (
    <div className="ib-scene ib-m2-esg">
      <div className="m2esg-core">ESG</div>
      {items.map((item, i) => (
        <span key={item} style={{ '--i': i }}>{item}</span>
      ))}
    </div>
  )
}

/* ================================================= CASES / PAYOFF ======== */
export function TeslaJudgmentCanvas({
  moves = [
    'Chose Gigafactory sites using incentives, energy policy and market access',
    'Adapted to local labour rules, content expectations and permitting regimes',
    'Managed geopolitical and supply-chain risk in batteries and critical minerals',
    'Used technology (automation) to offset cost and quality variance across countries',
  ],
}) {
  const dims = ['Political', 'Legal', 'Economic', 'Technology', 'Culture']
  return (
    <div className="ib-scene ib-m2-tesla">
      <header>
        <span>Country-entry decision canvas</span>
        <strong>TESLA</strong>
      </header>
      <div className="m2te-opp">
        <span>Market opportunity</span>
        <ul>{dims.map((d, i) => <li key={d} style={{ '--i': i }}>{d}</li>)}</ul>
      </div>
      <div className="m2te-split">
        <article>
          <span>Risks</span>
          <p>Policy · geopolitics · permitting · supply minerals</p>
        </article>
        <article>
          <span>Opportunities</span>
          <p>Incentives · demand · talent · tech leverage</p>
        </article>
      </div>
      <ol className="m2te-moves">
        {moves.map((m, i) => <li key={m} style={{ '--i': i }}>{m}</li>)}
      </ol>
      <p className="m2te-lock">Managerial judgment: site selection is IBE in action.</p>
    </div>
  )
}

export function UnileverCsrCanvas({
  moves = [
    'Embedded sustainability goals into brand and supplier programmes',
    'Used codes of conduct and global reporting for accountability',
    'Localized products while keeping global integrity standards',
    'Engaged stakeholders early to reduce regulatory and activist risk',
  ],
}) {
  return (
    <div className="ib-scene ib-m2-unilever">
      <div className="m2u-triad">
        <article style={{ '--i': 0 }}><strong>Business</strong><span>Competitiveness</span></article>
        <article style={{ '--i': 1 }}><strong>Society</strong><span>Licence to operate</span></article>
        <article style={{ '--i': 2 }}><strong>Environment</strong><span>Long-run resilience</span></article>
      </div>
      <ul className="m2u-effects">
        <li style={{ '--i': 0 }}>Reputation</li>
        <li style={{ '--i': 1 }}>Stakeholders</li>
        <li style={{ '--i': 2 }}>Long-term value</li>
        <li style={{ '--i': 3 }}>Risk</li>
        <li style={{ '--i': 4 }}>Brand trust</li>
      </ul>
      <ol className="m2u-moves">
        {moves.map((m, i) => <li key={m} style={{ '--i': i }}>{m}</li>)}
      </ol>
    </div>
  )
}

export function JudgmentPayoff({
  points = [
    { title: 'You can define IBE', text: 'External forces around the firm in foreign markets.' },
    { title: 'You can scan a country', text: 'P-L-E-T-S-E forces plus ethics and CSR expectations.' },
    { title: 'You can link to P&L', text: 'Each force maps to cost, risk, demand or legitimacy.' },
    { title: 'You can decide with judgment', text: 'Enter, adapt, partner, hedge — or walk away.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-payoff">
      <div className="m2po-mapwrap">
        <WorldMap className="m2po-map" showGraticule={false}>
          {SCAN_MARKETS.map((item, i) => (
            <MapMarker
              key={item.m.name}
              lon={item.m.lon}
              lat={item.m.lat}
              name={item.m.name === 'United States' ? 'USA' : item.m.name}
              role={item.role}
              kind={item.kind || 'market'}
              side={item.side}
              i={i}
              arrive={i}
            />
          ))}
        </WorldMap>
        <ul className="m2po-layers">
          {LAYERS.map((l, i) => (
            <li key={l.id} style={{ '--i': i }}>{l.label}</li>
          ))}
        </ul>
      </div>
      <div className="m2po-eq">
        <em>OPPORTUNITY</em>
        <span>+</span>
        <em>ENVIRONMENT</em>
        <span>=</span>
        <strong>JUDGMENT</strong>
      </div>
      <p className="m2po-line">Global opportunity is discovered through analysis — but entered through judgment.</p>
      <div className="m2po-points">
        {points.map((p, i) => (
          <article key={p.title} style={{ '--i': i }}>
            <strong>{p.title}</strong>
            <span>{p.text}</span>
          </article>
        ))}
      </div>
    </div>
  )
}

export function ImportanceScanCards({
  items = [
    { title: 'Import–export dependence', text: 'Many industries rely on foreign inputs, markets and logistics — so external shocks hit faster.' },
    { title: 'Spread effects', text: 'Development, technology and crises in one region spill into others through trade and capital.' },
    { title: 'Rising complexity', text: 'Multi-currency, multi-legal and multi-cultural settings multiply decision variables.' },
    { title: 'Anticipate change', text: 'Scanning helps firms withstand policy shifts, FX moves, tech disruption and social pressure.' },
  ],
}) {
  return (
    <div className="ib-scene ib-m2-importance">
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

export function IbeDefinitionVisual() {
  return (
    <div className="ib-scene ib-m2-defviz">
      <WorldMap className="m2dv-map" showGraticule={false}>
        <MapPulse lon={india.lon} lat={india.lat} />
        <MapMarker lon={india.lon} lat={india.lat} name="India" role="Home Market · HQ" kind="hq" side="bottom" i={0} arrive={0} />
        <MapMarker lon={usa.lon} lat={usa.lat} name="USA" role="External climate" side="left" i={1} arrive={1} />
        <MapMarker lon={germany.lon} lat={germany.lat} name="Germany" role="External climate" side="top-right" i={2} arrive={2} />
        <MapMarker lon={china.lon} lat={china.lat} name="China" role="External climate" side="top" i={3} arrive={3} />
        <MapMarker lon={singapore.lon} lat={singapore.lat} name="Singapore" role="External climate" kind="regional" side="bottom" i={4} arrive={4} />
      </WorldMap>
      <div className="m2dv-ring">
        {['Political', 'Legal', 'Economic', 'Technological', 'Socio-cultural', 'Ecological'].map((l, i) => (
          <span key={l} style={{ '--i': i }}>{l}</span>
        ))}
      </div>
    </div>
  )
}

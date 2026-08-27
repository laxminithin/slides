/**
 * International Business — Chapter 1 signature scenes (benchmark lock).
 *
 * Each scene has a distinct cinematic grammar (CSS in ibChapter1.css):
 *   WorldOpensScene        → local → global aerial pull-back
 *   GlobalizationNetwork   → markets activate → flows bloom by type
 *   InternationalizationMap→ India focus → stage-gated outward expansion
 *   BorderCrossing         → value follows geography outward from India
 *   SpiceRouteMini         → historical directional travel
 * Conceptual diagrams (pathway, force field) stay non-geographic by design.
 */

import {
  WorldMap, MapMarker, MapRoute, MapPulse, RegionCaption, MARKETS,
} from './worldmap'

const { usa, india, china, japan, germany, singapore, uae, brazil, uk } = MARKETS

/* ============================================================ SCENE A ===== */
export function WorldOpensScene({ module = 1 }) {
  return (
    <div className="ib-scene ib-worldopens" data-slide-content="true">
      <div className="wo-mapwrap" aria-hidden="false">
        <WorldMap className="wo-map" showGraticule={false}>
          <MapPulse lon={india.lon} lat={india.lat} />
          <g className="wo-routes">
            <MapRoute from={[india.lon, india.lat]} to={[uae.lon, uae.lat]} flow="goods" label="Goods" i={0} bow={0.1} destArrive={1} />
            <MapRoute from={[india.lon, india.lat]} to={[germany.lon, germany.lat]} flow="goods" label="Exports" i={1} bow={0.22} destArrive={2} />
            <MapRoute from={[usa.lon, usa.lat]} to={[india.lon, india.lat]} flow="capital" label="Capital" i={2} bow={0.2} destArrive={0} />
            <MapRoute from={[japan.lon, japan.lat]} to={[china.lon, china.lat]} flow="technology" label="Technology" i={3} bow={0.12} destArrive={4} />
            <MapRoute from={[singapore.lon, singapore.lat]} to={[uk.lon, uk.lat]} flow="information" label="Information" i={4} bow={0.26} destArrive={5} />
            <MapRoute from={[india.lon, india.lat]} to={[usa.lon, usa.lat]} flow="people" label="People" i={5} bow={0.28} destArrive={3} />
          </g>
          <MapMarker lon={india.lon} lat={india.lat} name="India" role="Home Market · HQ" kind="hq" side="bottom" i={0} arrive={0} />
          <MapMarker lon={uae.lon} lat={uae.lat} name="UAE" role="Middle East Market" side="top" i={1} arrive={1} />
          <MapMarker lon={germany.lon} lat={germany.lat} name="Germany" role="Europe" side="top-right" i={2} arrive={2} />
          <MapMarker lon={usa.lon} lat={usa.lat} name="United States" role="Capital & Market" side="left" i={3} arrive={3} />
          <MapMarker lon={china.lon} lat={china.lat} name="China" role="Production" side="top" i={4} arrive={4} />
          <MapMarker lon={uk.lon} lat={uk.lat} name="United Kingdom" role="Finance" side="top-left" i={5} arrive={5} />
          <MapMarker lon={japan.lon} lat={japan.lat} name="Japan" role="Technology" side="right" i={6} arrive={4} />
          <MapMarker lon={singapore.lon} lat={singapore.lat} name="Singapore" role="Regional Hub" kind="regional" side="bottom" i={7} arrive={5} />
        </WorldMap>
      </div>
      <div className="wo-copy">
        <p className="wo-eyebrow">International Business · 22MBA401 · Chapter {String(module).padStart(2, '0')}</p>
        <h1 className="wo-title">Opportunity</h1>
        <p className="wo-sub">Introduction to International Business</p>
        <p className="wo-hint">The world’s largest companies were once local businesses with a global vision.</p>
      </div>
    </div>
  )
}

/* ============================================================ SCENE B ===== */
/* One labelled teaching line per flow; legend carries the rest.            */
const GLOBE_FLOWS = [
  { key: 'goods', label: 'Goods' },
  { key: 'services', label: 'Services' },
  { key: 'capital', label: 'Capital' },
  { key: 'technology', label: 'Technology' },
  { key: 'information', label: 'Information' },
  { key: 'people', label: 'People' },
]

export function GlobalizationNetwork({ phases = [] }) {
  return (
    <div className="ib-scene ib-globalization">
      <WorldMap className="gn-stage" showGraticule>
        <RegionCaption lon={-100} lat={56} text="NORTH AMERICA" i={0} />
        <RegionCaption lon={14} lat={60} text="EUROPE" i={1} />
        <RegionCaption lon={100} lat={50} text="ASIA" i={2} />
        <g className="gn-routes">
          <MapRoute from={[china.lon, china.lat]} to={[usa.lon, usa.lat]} flow="goods" label="Goods" i={0} bow={-0.2} moving destArrive={0} />
          <MapRoute from={[india.lon, india.lat]} to={[germany.lon, germany.lat]} flow="goods" i={1} bow={0.22} destArrive={3} />
          <MapRoute from={[brazil.lon, brazil.lat]} to={[uk.lon, uk.lat]} flow="services" label="Services" i={2} bow={0.14} destArrive={2} />
          <MapRoute from={[usa.lon, usa.lat]} to={[india.lon, india.lat]} flow="capital" label="Capital" i={3} bow={0.18} destArrive={5} />
          <MapRoute from={[uk.lon, uk.lat]} to={[singapore.lon, singapore.lat]} flow="capital" i={4} bow={0.2} destArrive={8} />
          <MapRoute from={[japan.lon, japan.lat]} to={[india.lon, india.lat]} flow="technology" label="Technology" i={5} bow={0.12} destArrive={5} />
          <MapRoute from={[usa.lon, usa.lat]} to={[china.lon, china.lat]} flow="technology" i={6} bow={0.12} destArrive={6} />
          <MapRoute from={[singapore.lon, singapore.lat]} to={[uk.lon, uk.lat]} flow="information" label="Information" i={7} bow={0.24} destArrive={2} />
          <MapRoute from={[india.lon, india.lat]} to={[uae.lon, uae.lat]} flow="people" label="People" i={8} bow={0.1} destArrive={4} />
          <MapRoute from={[india.lon, india.lat]} to={[usa.lon, usa.lat]} flow="people" i={9} bow={0.26} destArrive={0} />
        </g>
        <MapMarker lon={usa.lon} lat={usa.lat} name="United States" role="Market & Capital" side="left" i={0} arrive={0} />
        <MapMarker lon={brazil.lon} lat={brazil.lat} name="Brazil" role="Commodities" side="right" i={1} arrive={1} />
        <MapMarker lon={uk.lon} lat={uk.lat} name="United Kingdom" role="Finance" side="top-left" i={2} arrive={2} />
        <MapMarker lon={germany.lon} lat={germany.lat} name="Germany" role="European Market" side="top-right" i={3} arrive={3} />
        <MapMarker lon={uae.lon} lat={uae.lat} name="UAE" role="Middle East Market" side="top" i={4} arrive={4} />
        <MapMarker lon={india.lon} lat={india.lat} name="India" role="Emerging Market" kind="hq" side="bottom" i={5} arrive={5} />
        <MapMarker lon={china.lon} lat={china.lat} name="China" role="Production" side="top" i={6} arrive={6} />
        <MapMarker lon={japan.lon} lat={japan.lat} name="Japan" role="Strategic Market" side="right" i={7} arrive={7} />
        <MapMarker lon={singapore.lon} lat={singapore.lat} name="Singapore" role="Regional Hub" kind="regional" side="bottom" i={8} arrive={8} />
      </WorldMap>
      <div className="gn-legend" aria-label="Global flows">
        {GLOBE_FLOWS.map((f) => (
          <span key={f.key} className={`gn-key flow-${f.key}`}>{f.label}</span>
        ))}
      </div>
      {phases.length > 0 && (
        <div className="gn-phases">
          {phases.map((p, i) => (
            <article key={p.title} style={{ '--i': i }}><strong>{p.title}</strong><p>{p.text}</p></article>
          ))}
        </div>
      )}
    </div>
  )
}

/* ============================================================ SCENE C ===== */
const INTL_STAGES_DEFAULT = [
  { k: 'Domestic', t: 'India only — home market' },
  { k: 'International', t: 'Exports into foreign markets' },
  { k: 'Multinational', t: 'Country-adapted subsidiaries' },
  { k: 'Global', t: 'Coordinated worldwide network' },
  { k: 'Transnational', t: 'Distributed & interconnected' },
]

export function InternationalizationMap({ stages = INTL_STAGES_DEFAULT }) {
  return (
    <div className="ib-scene ib-intlmap">
      <div className="im-cam">
        <WorldMap className="im-stage" showGraticule={false}>
          <MapPulse lon={india.lon} lat={india.lat} />
          <g className="im-links">
            <MapRoute from={[india.lon, india.lat]} to={[uae.lon, uae.lat]} flow="goods" label="Exports" i={0} bow={0.1} stage={2} />
            <MapRoute from={[india.lon, india.lat]} to={[singapore.lon, singapore.lat]} flow="goods" i={1} bow={0.12} stage={2} />
            <MapRoute from={[india.lon, india.lat]} to={[germany.lon, germany.lat]} flow="capital" label="FDI" i={2} bow={0.22} stage={3} />
            <MapRoute from={[india.lon, india.lat]} to={[usa.lon, usa.lat]} flow="capital" i={3} bow={0.2} stage={3} />
            <MapRoute from={[singapore.lon, singapore.lat]} to={[germany.lon, germany.lat]} flow="technology" label="Integration" i={4} bow={0.16} stage={4} />
            <MapRoute from={[usa.lon, usa.lat]} to={[germany.lon, germany.lat]} flow="information" i={5} bow={0.1} stage={4} />
            <MapRoute from={[usa.lon, usa.lat]} to={[japan.lon, japan.lat]} flow="people" i={6} bow={-0.14} stage={5} />
            <MapRoute from={[singapore.lon, singapore.lat]} to={[usa.lon, usa.lat]} flow="information" i={7} bow={0.22} stage={5} />
            <MapRoute from={[japan.lon, japan.lat]} to={[india.lon, india.lat]} flow="technology" i={8} bow={0.1} stage={5} />
          </g>
          <MapMarker lon={india.lon} lat={india.lat} name="India" role="Home Market · HQ" kind="hq" side="bottom" i={0} stage={1} />
          <MapMarker lon={uae.lon} lat={uae.lat} name="UAE" role="Middle East Market" kind="market" side="top" i={1} stage={2} />
          <MapMarker lon={singapore.lon} lat={singapore.lat} name="Singapore" role="Regional Hub" kind="regional" side="bottom" i={2} stage={2} />
          <MapMarker lon={germany.lon} lat={germany.lat} name="Germany" role="European Subsidiary" kind="mfg" side="top-right" i={3} stage={3} />
          <MapMarker lon={usa.lon} lat={usa.lat} name="United States" role="Major Market" kind="market" side="left" i={4} stage={3} />
          <MapMarker lon={japan.lon} lat={japan.lat} name="Japan" role="R&D · Strategic" kind="rnd" side="right" i={5} stage={5} />
        </WorldMap>
      </div>
      <ol className="im-stages">
        {stages.map((s, i) => (
          <li key={s.k} className={`im-stage-item s${i + 1}`} style={{ '--i': i }}>
            <em className="im-stage-num">{i + 1}</em>
            <b>{s.k}</b>
            <span>{s.t}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ==================================================== CONCEPT VISUALS ===== */

export function BorderCrossing() {
  const flows = [
    { label: 'Goods', flow: 'goods', to: uae, role: 'Middle East Market', side: 'top' },
    { label: 'Services', flow: 'services', to: usa, role: 'Market', side: 'left' },
    { label: 'Capital', flow: 'capital', to: germany, role: 'European Market', side: 'top-right' },
    { label: 'Technology', flow: 'technology', to: japan, role: 'Strategic Market', side: 'right' },
    { label: 'Knowledge', flow: 'information', to: singapore, role: 'Regional Hub', side: 'bottom' },
  ]
  return (
    <div className="ib-scene ib-border">
      <WorldMap className="bx-map" showGraticule={false}>
        {flows.map((f, i) => (
          <MapRoute
            key={f.label}
            from={[india.lon, india.lat]}
            to={[f.to.lon, f.to.lat]}
            flow={f.flow}
            label={f.label}
            i={i}
            bow={0.1 + i * 0.035}
            destArrive={i + 1}
          />
        ))}
        <MapMarker lon={india.lon} lat={india.lat} name="India" role="Home Country · HQ" kind="hq" side="bottom" i={0} arrive={0} />
        {flows.map((f, i) => (
          <MapMarker
            key={f.to.name}
            lon={f.to.lon}
            lat={f.to.lat}
            name={f.to.name}
            role={f.role}
            side={f.side}
            i={i + 1}
            arrive={i + 1}
            kind={f.to === singapore ? 'regional' : 'market'}
          />
        ))}
      </WorldMap>
      <p className="bx-caption">Value crosses the national border into foreign markets</p>
    </div>
  )
}

export function EntryPathway({ steps }) {
  return (
    <div className="ib-scene ib-pathway">
      <span className="pw-axis pw-x">Commitment & control →</span>
      <div className="pw-track">
        {steps.map((s, i) => (
          <article key={s.title} className="pw-step" style={{ '--i': i, '--n': steps.length }}>
            <span className="pw-node" aria-hidden="true">{i + 1}</span>
            <strong>{s.title}</strong>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export function ForceField({ center = 'The firm today', forces }) {
  return (
    <div className="ib-scene ib-forcefield">
      <div className="ff-core">{center}</div>
      {forces.map((f, i) => (
        <div key={f.title} className={`ff-force ff-${i + 1}`} style={{ '--i': i }}>
          <strong>{f.title}</strong>
          <p>{f.text}</p>
        </div>
      ))}
    </div>
  )
}

export function SpiceRouteMini() {
  return (
    <svg className="ib-spiceroute" viewBox="0 0 360 150" role="img" aria-label="Ancient spice route from India through Arabia to Europe">
      <path className="sr-land" d="M20 100 C70 78, 110 82, 150 96 C190 72, 240 74, 280 94 C310 82, 335 88, 348 102" />
      <path className="sr-route" d="M48 96 C120 42, 220 46, 320 92" />
      <polygon className="sr-arrow" points="312,86 324,92 312,98" />
      <circle className="sr-dot d1" cx="48" cy="96" r="5" />
      <circle className="sr-dot d2" cx="180" cy="52" r="4" />
      <circle className="sr-dot d3" cx="320" cy="92" r="5" />
      <text className="sr-t sr-a" x="48" y="118" textAnchor="middle">India</text>
      <text className="sr-t sr-m" x="180" y="38" textAnchor="middle">Arabia</text>
      <text className="sr-t sr-b" x="320" y="116" textAnchor="middle">Europe</text>
      <text className="sr-flow" x="180" y="72" textAnchor="middle">Spice & silk</text>
    </svg>
  )
}

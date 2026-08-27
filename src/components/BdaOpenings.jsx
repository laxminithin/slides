/**
 * BdaOpenings — Director's Cut cinematic module-opening scenes.
 *
 * Composed from the existing living SVG kits (HadoopViz / SparkViz / MongoViz /
 * PageRankViz). Does NOT replace those architectures — it stages them as
 * unforgettable keynote metaphors with layered reveal.
 *
 * Module emotional identity:
 *   M1 Discovery / Scale / Explosion of data     → Digital Planet
 *   M2 Distributed intelligence / Movement       → Distributed City
 *   M3 Storage / Organization / Structure        → Digital Library
 *   M4 Business intelligence / Transformation    → Analytics Forge
 *   M5 Search / Influence / Ranking              → Influence Web
 */
import { Defs, Packet, Link, ServerGlyph, HadoopCluster, MapReducePipeline } from './HadoopViz'
import { SparkArchitecture } from './SparkViz'
import { MongoCollectionFlow } from './MongoViz'
import { PageRankGraph } from './PageRankViz'

const T = { fontFamily: 'inherit' }
const VB = '0 0 560 430'

const Layer = ({ d = 0, kind = 'bo-in', children }) => (
  <g className={kind} style={{ '--d': `${d}s` }}>{children}</g>
)

/* ===========================================================================
   MODULE 1 — Digital Planet
   An entire digital world: sources orbit → streams pour in → the planet
   densifies → DATA transforms to INSIGHT at the core.
   ======================================================================== */
export function OpeningDigitalPlanet() {
  // Sources ring the top + sides of the planet; the bottom band is reserved
  // for the DATA → INSIGHT arc so nothing collides.
  const sources = [
    [80, 66, 'Search'],
    [280, 34, 'Sensors'],
    [478, 66, 'Social'],
    [524, 168, 'Apps'],
    [500, 262, 'Streams'],
    [36, 262, 'Logs'],
    [30, 168, 'Campus'],
  ]
  return (
    <svg className="hv-svg bo-open" viewBox={VB} role="img" aria-label="A digital planet formed by streaming data sources that converge into insight">
      <Defs />
      {/* deep space wash */}
      <Layer d={0.05} kind="bo-in-fade">
        <circle className="bo-orbit" cx="280" cy="215" r="168" fill="none" stroke="#cddcff" strokeWidth="1.2" strokeDasharray="4 10" opacity="0.55" />
        <circle className="bo-orbit rev" cx="280" cy="215" r="198" fill="none" stroke="#b9e6df" strokeWidth="1" strokeDasharray="2 14" opacity="0.4" style={{ '--dur': '36s' }} />
      </Layer>

      {/* planet body */}
      <Layer d={0.25} kind="bo-in-scale">
        <circle className="bo-planet-glow" cx="280" cy="215" r="118" />
        <circle cx="280" cy="215" r="96" fill="url(#boPlanet)" stroke="#9fb8ff" strokeWidth="2" />
        {/* latitude / data grid on the planet */}
        <ellipse cx="280" cy="215" rx="96" ry="34" fill="none" stroke="#ffffffaa" strokeWidth="1.2" />
        <ellipse cx="280" cy="215" rx="96" ry="62" fill="none" stroke="#ffffff66" strokeWidth="1" />
        <path d="M280 119 C310 160, 310 270, 280 311 C250 270, 250 160, 280 119" fill="none" stroke="#ffffff88" strokeWidth="1.2" />
        <text x="280" y="208" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff" style={T}>BIG DATA</text>
        <text x="280" y="228" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dfe9ff" style={T}>a living digital planet</text>
      </Layer>

      {/* orbiting source chips */}
      <Layer d={0.45} kind="bo-in-fade">
        {sources.map(([x, y, label], i) => (
          <g key={label} className="bo-float" style={{ '--dur': `${6 + (i % 3)}s`, '--delay': `${i * 0.2}s` }}>
            <rect x={x - 34} y={y - 14} width="68" height="28" rx="14" fill="#ffffffee" stroke="#cddcff" />
            <circle cx={x - 20} cy={y} r="4" fill={i % 2 ? 'var(--hv-teal)' : 'var(--hv-blue)'} />
            <text x={x + 4} y={y + 4} textAnchor="middle" fontSize="11" fontWeight="800" fill="#16233b" style={T}>{label}</text>
            <Link x1={x} y1={y} x2={280} y2={215} flow arrow={false} />
            <Packet x={x} y={y} dx={280 - x} dy={215 - y} color={i % 2 ? 'var(--hv-teal)' : 'var(--hv-blue)'} dur={2.8} delay={i * 0.35} r={4} />
          </g>
        ))}
      </Layer>

      {/* DATA → INSIGHT reveal at the base */}
      <Layer d={1.1} kind="bo-in">
        <rect x="118" y="368" width="92" height="36" rx="10" fill="#2f6bff" />
        <text x="164" y="391" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff" style={T}>DATA</text>
        <path d="M222 386 H248" stroke="#7a8698" strokeWidth="2.4" markerEnd="url(#hvArrow)" />
        <rect x="258" y="368" width="110" height="36" rx="10" fill="#0f9d94" />
        <text x="313" y="391" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff" style={T}>INSIGHT</text>
        <text x="378" y="391" fontSize="10.5" fontWeight="700" fill="#5b6b82" style={T}>planetary-scale decisions</text>
      </Layer>

      <defs>
        <radialGradient id="boPlanet" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#5b8cff" />
          <stop offset="55%" stopColor="#2f6bff" />
          <stop offset="100%" stopColor="#1a3f9e" />
        </radialGradient>
      </defs>
    </svg>
  )
}

/* ===========================================================================
   MODULE 2 — Distributed City
   NameNode as city hall; racks as districts; blocks as parcels moving through
   a living distributed city. Built around HadoopCluster.
   ======================================================================== */
export function OpeningDistributedCity() {
  return (
    <div className="bo-scene bo-city" aria-label="Hadoop as a living distributed city">
      <div className="bo-scene-atmosphere" aria-hidden="true" />
      <div className="bo-scene-stage">
        <HadoopCluster />
      </div>
      <aside className="bo-scene-caption">
        <strong>A living distributed city</strong>
        <span>NameNode coordinates · DataNodes store · blocks move like city parcels</span>
      </aside>
      <div className="bo-annotation-rail" aria-hidden="true">
        <em>City Hall</em>
        <em>Districts</em>
        <em>Parcels ×3</em>
      </div>
    </div>
  )
}

/* ===========================================================================
   MODULE 2 peak — Logistics Hub (MapReduce)
   ======================================================================== */
export function OpeningLogisticsHub() {
  return (
    <div className="bo-scene bo-logistics" aria-label="MapReduce as a massive logistics hub">
      <div className="bo-scene-atmosphere" aria-hidden="true" />
      <div className="bo-scene-stage">
        <MapReducePipeline phase={9} />
      </div>
      <aside className="bo-scene-caption">
        <strong>A massive logistics hub</strong>
        <span>split · map · shuffle · reduce · ship the answer</span>
      </aside>
    </div>
  )
}

/* ===========================================================================
   MODULE 3 — Digital Library
   Flexible documents shelved in a living collection — MongoDB as a library
   that grows without rebuilding the building.
   ======================================================================== */
export function OpeningDigitalLibrary() {
  return (
    <div className="bo-scene bo-library" aria-label="MongoDB as a dynamic digital library">
      <div className="bo-scene-atmosphere" aria-hidden="true" />
      <div className="bo-scene-stage">
        <MongoCollectionFlow />
      </div>
      <aside className="bo-scene-caption">
        <strong>A dynamic digital library</strong>
        <span>one student · one document · a collection that flexes as profiles grow</span>
      </aside>
    </div>
  )
}

/* ===========================================================================
   MODULE 4 — Analytics Forge
   Raw campus ore enters, Pig forges clean metal, Hive stamps finished reports.
   ======================================================================== */
export function OpeningAnalyticsForge() {
  const stages = [
    { x: 36, label: 'Raw ore', sub: 'campus CSV', color: 'var(--hv-orange)' },
    { x: 168, label: 'Pig forge', sub: 'clean · shape', color: 'var(--hv-purple)' },
    { x: 300, label: 'Hive mint', sub: 'warehouse tables', color: 'var(--hv-blue)' },
    { x: 432, label: 'Decision', sub: 'HQL insight', color: 'var(--hv-teal)' },
  ]
  return (
    <svg className="hv-svg bo-open" viewBox={VB} role="img" aria-label="Pig and Hive transforming raw campus data into institutional decisions">
      <Defs />
      <Layer d={0.1} kind="bo-in-fade">
        <rect x="20" y="70" width="520" height="260" rx="24" fill="#fffdf9" stroke="#e4dccb" />
        <path d="M70 200 H490" stroke="#d7e0ee" strokeWidth="6" strokeLinecap="round" />
      </Layer>

      {stages.map((s, i) => (
        <Layer key={s.label} d={0.25 + i * 0.18} kind="bo-in-scale">
          <g className="bo-float" style={{ '--dur': `${7 + i}s`, '--delay': `${i * 0.25}s` }}>
            <rect x={s.x} y="128" width="96" height="144" rx="16" fill="#fff" stroke="#d7e0ee" />
            <rect x={s.x + 18} y="148" width="60" height="60" rx="14" fill="#f4f7fb" stroke={s.color} strokeWidth="2" />
            <ServerGlyph x={s.x + 36} y={168} color={s.color} />
            <text x={s.x + 48} y="240" textAnchor="middle" fontSize="13" fontWeight="900" fill="#16233b" style={T}>{s.label}</text>
            <text x={s.x + 48} y="258" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b6b82" style={T}>{s.sub}</text>
          </g>
          {i < stages.length - 1 && (
            <>
              <Link x1={s.x + 96} y1={200} x2={stages[i + 1].x} y2={200} flow />
              <Packet x={s.x + 96} y={200} dx={stages[i + 1].x - (s.x + 96)} dy={0} color={s.color} dur={2.2} delay={i * 0.4} square />
            </>
          )}
        </Layer>
      ))}

      <Layer d={1.15} kind="bo-in">
        <text x="280" y="380" textAnchor="middle" fontSize="14" fontWeight="800" fill="#16233b" style={T}>Business intelligence is transformation</text>
        <text x="280" y="402" textAnchor="middle" fontSize="12" fontWeight="700" fill="#5b6b82" style={T}>messy files become answers leaders can act on</text>
      </Layer>
    </svg>
  )
}

/* ===========================================================================
   MODULE 5 — Influence Web / Intelligent Engine
   Search begins; Spark becomes the engine; influence flows to a ranked answer.
   ======================================================================== */
export function OpeningInfluenceWeb() {
  return (
    <div className="bo-scene bo-influence" aria-label="Search intelligence: Spark engine and influence flowing across the web">
      <div className="bo-scene-atmosphere" aria-hidden="true" />
      <div className="bo-scene-split">
        <div className="bo-scene-stage">
          <SparkArchitecture phase={9} />
        </div>
        <div className="bo-scene-stage bo-scene-secondary">
          <PageRankGraph showRanks />
        </div>
      </div>
      <aside className="bo-scene-caption">
        <strong>An intelligent compute engine + influence network</strong>
        <span>Spark processes the web · PageRank lets importance flow to the best answer</span>
      </aside>
    </div>
  )
}

export function OpeningSearchQuery() {
  return (
    <svg className="hv-svg bo-open" viewBox={VB} role="img" aria-label="A search query traveling through the internet toward a ranked result">
      <Defs />
      <Layer d={0.1} kind="bo-in-fade">
        <circle className="bo-planet-glow soft" cx="280" cy="200" r="140" />
        <circle cx="280" cy="200" r="88" fill="#eef3ff" stroke="#9fb8ff" strokeWidth="2" />
        <text x="280" y="196" textAnchor="middle" fontSize="14" fontWeight="900" fill="#2f6bff" style={T}>INTERNET</text>
        <text x="280" y="216" textAnchor="middle" fontSize="11" fontWeight="700" fill="#5b6b82" style={T}>billions of pages</text>
      </Layer>

      {/* query chip */}
      <Layer d={0.35} kind="bo-in">
        <rect x="40" y="48" width="250" height="44" rx="22" fill="#fff" stroke="#2f6bff" strokeWidth="2" />
        <circle cx="66" cy="70" r="8" fill="none" stroke="#2f6bff" strokeWidth="2.2" />
        <path d="M72 76 L80 84" stroke="#2f6bff" strokeWidth="2.2" strokeLinecap="round" />
        <text x="160" y="76" textAnchor="middle" fontSize="12" fontWeight="800" fill="#16233b" style={T}>Best Engineering College…</text>
      </Layer>

      {/* journey nodes */}
      {[
        [90, 320, 'Spark', 'var(--hv-orange)'],
        [210, 340, 'Text', 'var(--hv-purple)'],
        [330, 340, 'Web', 'var(--hv-teal)'],
        [450, 320, 'Rank', 'var(--hv-blue)'],
      ].map(([x, y, label, color], i) => (
        <Layer key={label} d={0.55 + i * 0.12} kind="bo-in-scale">
          <rect x={x - 38} y={y - 22} width="76" height="44" rx="12" fill="#fff" stroke={color} strokeWidth="1.8" />
          <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="900" fill="#16233b" style={T}>{label}</text>
          {i < 3 && <Packet x={x + 38} y={y} dx={82} dy={0} color={color} dur={2} delay={i * 0.3} square />}
        </Layer>
      ))}

      <Layer d={1.2} kind="bo-in">
        <rect x="360" y="48" width="160" height="44" rx="12" fill="#0f9d94" />
        <text x="440" y="76" textAnchor="middle" fontSize="13" fontWeight="900" fill="#fff" style={T}>0.3s · Top Result</text>
      </Layer>
    </svg>
  )
}

/** Module router for opening scenes. */
export function ModuleOpening({ module = 1 }) {
  switch (module) {
    case 2: return <OpeningDistributedCity />
    case 3: return <OpeningDigitalLibrary />
    case 4: return <OpeningAnalyticsForge />
    case 5: return <OpeningSearchQuery />
    default: return <OpeningDigitalPlanet />
  }
}

/**
 * International Business — reusable premium world map (Module 1 benchmark).
 *
 * Equirectangular SVG (viewBox 1000×500). Recognisable simplified continents,
 * named markers with leader lines + business roles, curved labelled routes.
 * Motion lives in CSS (ibChapter1.css); the frozen engine is untouched.
 */

export const MAP_W = 1000
export const MAP_H = 500

/** Equirectangular projection: (lon,lat) → SVG (x,y). */
export function project(lon, lat) {
  return { x: ((lon + 180) / 360) * MAP_W, y: ((90 - lat) / 180) * MAP_H }
}

/* Named markets — lon/lat approximate centres for teaching accuracy. */
export const MARKETS = {
  usa: { lon: -97, lat: 39, name: 'United States' },
  newYork: { lon: -74, lat: 40.7, name: 'New York' },
  brazil: { lon: -51, lat: -14, name: 'Brazil' },
  uk: { lon: -1.5, lat: 52.5, name: 'United Kingdom' },
  london: { lon: -0.1, lat: 51.5, name: 'London' },
  germany: { lon: 10.5, lat: 51.2, name: 'Germany' },
  europe: { lon: 12, lat: 50, name: 'Europe' },
  uae: { lon: 54.4, lat: 24.4, name: 'UAE' },
  dubai: { lon: 55.3, lat: 25.2, name: 'Dubai' },
  india: { lon: 78.5, lat: 21.5, name: 'India' },
  mumbai: { lon: 72.9, lat: 19.1, name: 'Mumbai' },
  china: { lon: 104, lat: 35, name: 'China' },
  japan: { lon: 138, lat: 36.5, name: 'Japan' },
  tokyo: { lon: 139.7, lat: 35.7, name: 'Tokyo' },
  singapore: { lon: 103.8, lat: 1.3, name: 'Singapore' },
  australia: { lon: 134, lat: -25, name: 'Australia' },
}

/**
 * Simplified but recognisable silhouettes. Shapes favour landmark cues
 * (India peninsula, Africa horn, Alaska/Mexico taper, Australia oval) over
 * political borders — executive infographic, not gazetteer.
 */
const CONTINENTS = [
  // Greenland (subtle, aids recognition)
  'M250 36 C278 22, 308 28, 318 48 C312 68, 288 78, 262 70 C240 60, 236 44, 250 36 Z',
  // North America — Alaska · Hudson · Florida · Mexico taper
  'M72 78 C118 42, 168 36, 210 44 C248 52, 292 70, 318 92 C328 108, 322 126, 308 134 C296 140, 290 152, 294 166 C286 182, 268 194, 248 198 C228 200, 214 192, 210 184 C196 172, 178 158, 168 146 C154 128, 138 112, 122 104 C96 92, 70 90, 58 96 C48 90, 52 80, 72 78 Z',
  // Central America bridge
  'M248 198 C262 204, 274 218, 276 232 C268 236, 254 228, 246 214 C244 206, 244 200, 248 198 Z',
  // South America — Brazil bulge, southern taper
  'M278 230 C318 224, 362 236, 384 258 C396 278, 398 304, 390 330 C372 372, 342 410, 312 438 C300 420, 296 372, 292 330 C288 292, 280 258, 278 244 C276 236, 276 232, 278 230 Z',
  // Europe — Iberia · Alps · Scandinavia hint
  'M468 78 C490 58, 520 50, 546 54 C572 60, 592 78, 598 96 C596 114, 582 128, 566 134 C548 140, 530 138, 514 140 C496 144, 478 142, 466 134 C460 118, 458 96, 468 78 Z',
  // UK
  'M458 88 C468 80, 480 82, 482 94 C478 104, 466 104, 458 96 C456 92, 456 90, 458 88 Z',
  // Africa — Gulf of Guinea · Horn of Africa · southern taper
  'M478 152 C520 144, 562 148, 588 160 C612 174, 628 196, 636 220 C632 252, 620 284, 608 308 C588 340, 558 360, 536 364 C518 360, 508 346, 516 330 C500 312, 484 280, 476 248 C470 218, 468 178, 478 152 Z',
  // Asia mainland + India peninsula (critical cue)
  'M586 72 C640 48, 710 40, 772 44 C840 48, 910 56, 954 68 C948 92, 920 114, 890 132 C864 150, 838 168, 818 182 C798 196, 778 208, 760 214 C748 208, 738 196, 732 186 C722 204, 712 222, 702 232 C690 222, 686 200, 684 182 C660 176, 632 160, 612 142 C598 124, 584 100, 586 72 Z',
  // Japan archipelago
  'M900 128 C912 120, 928 124, 932 138 C926 152, 910 154, 900 146 C894 138, 894 132, 900 128 Z',
  // SE Asia / Malay tip toward Singapore
  'M782 210 C798 218, 808 232, 806 248 C794 250, 780 238, 776 224 C776 216, 778 212, 782 210 Z',
  // Australia
  'M820 276 C856 264, 900 266, 918 278 C930 292, 928 330, 920 352 C900 364, 856 362, 824 346 C810 330, 808 296, 820 276 Z',
]

/** Soft ocean + land base. Pass markers/routes as children (drawn above). */
export function WorldMap({ children, className = '', showGraticule = true }) {
  return (
    <svg
      className={`ib-worldmap ${className}`}
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="World map with international business markets and trade routes"
    >
      <rect className="wm-ocean" width={MAP_W} height={MAP_H} />
      {showGraticule && (
        <g className="wm-graticule" aria-hidden="true">
          {[100, 200, 300, 400].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2={MAP_W} y2={y} />
          ))}
          {[200, 400, 600, 800].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2={MAP_H} />
          ))}
        </g>
      )}
      <g className="wm-land">
        {CONTINENTS.map((d, i) => (
          <path key={i} className="wm-continent" style={{ '--i': i }} d={d} />
        ))}
      </g>
      {children}
    </svg>
  )
}

/** Label placement + leader-line endpoints (keeps association unambiguous). */
const SIDE = {
  top: { dx: 0, dy: -20, anchor: 'middle', lx: 0, ly: -9 },
  bottom: { dx: 0, dy: 24, anchor: 'middle', lx: 0, ly: 10 },
  left: { dx: -14, dy: 4, anchor: 'end', lx: -9, ly: 0 },
  right: { dx: 14, dy: 4, anchor: 'start', lx: 9, ly: 0 },
  'top-left': { dx: -10, dy: -18, anchor: 'end', lx: -7, ly: -8 },
  'top-right': { dx: 10, dy: -18, anchor: 'start', lx: 7, ly: -8 },
  'bottom-left': { dx: -10, dy: 24, anchor: 'end', lx: -7, ly: 9 },
  'bottom-right': { dx: 10, dy: 24, anchor: 'start', lx: 7, ly: 9 },
}

function MarkerGlyph({ kind }) {
  if (kind === 'hq') {
    return <rect className="wm-dot" x="-5" y="-5" width="10" height="10" rx="1.5" />
  }
  if (kind === 'regional') {
    return <polygon className="wm-dot" points="0,-6.5 6,5 -6,5" />
  }
  if (kind === 'mfg' || kind === 'distribution') {
    return <rect className="wm-dot" x="-4.5" y="-4.5" width="9" height="9" />
  }
  if (kind === 'rnd') {
    return <polygon className="wm-dot" points="0,-6.5 6,0 0,6.5 -6,0" />
  }
  return <circle className="wm-dot" r="5" />
}

/**
 * Named market. Outer <g> owns geographic translate so CSS scale animations
 * cannot wipe lon/lat (CSS transform overrides SVG attributes).
 *
 * kind: market | hq | regional | mfg | rnd | distribution
 * side: label offset — avoid collisions manually per scene
 * arrive: optional delay index used by destination-reaction CSS
 */
export function MapMarker({
  lon, lat, name, role, kind = 'market', side = 'top', i = 0, active = true, stage, arrive,
}) {
  const { x, y } = project(lon, lat)
  const s = SIDE[side] || SIDE.top
  const stageClass = stage ? ` s${stage}` : ''
  const arriveClass = arrive != null ? ` arrive-${arrive}` : ''
  return (
    <g transform={`translate(${x} ${y})`}>
      <g
        className={`wm-marker kind-${kind}${active ? ' is-active' : ''}${stageClass}${arriveClass}`}
        style={{ '--i': i, '--arrive': arrive ?? i }}
      >
        <circle className="wm-dot-halo" r="13" />
        <MarkerGlyph kind={kind} />
        <line className="wm-leader" x1="0" y1="0" x2={s.lx} y2={s.ly} />
        <g className="wm-label" transform={`translate(${s.dx} ${s.dy})`} textAnchor={s.anchor}>
          <text className="wm-name">{name}</text>
          {role && <text className="wm-role" y="11">{role}</text>}
        </g>
      </g>
    </g>
  )
}

/**
 * Curved labelled route. flow drives colour; label only on the teaching line.
 * destArrive: marker arrive index this route lights (cause → effect).
 */
export function MapRoute({
  from, to, flow = 'goods', label, i = 0, bow = 0.18, moving = false, stage, destArrive,
}) {
  const A = project(from[0], from[1])
  const B = project(to[0], to[1])
  const mx = (A.x + B.x) / 2
  const my = (A.y + B.y) / 2
  const dist = Math.hypot(B.x - A.x, B.y - A.y) || 1
  const nx = -(B.y - A.y) / dist
  const ny = (B.x - A.x) / dist
  const cx = mx + nx * dist * bow
  const cy = my + ny * dist * bow
  const d = `M${A.x} ${A.y} Q${cx} ${cy} ${B.x} ${B.y}`
  const lx = (A.x + 2 * cx + B.x) / 4
  const ly = (A.y + 2 * cy + B.y) / 4
  const stageClass = stage ? ` s${stage}` : ''
  return (
    <g
      className={`wm-route-g flow-${flow}${stageClass}`}
      style={{ '--i': i, '--dest': destArrive ?? '' }}
      data-dest={destArrive}
    >
      <path className="wm-route" pathLength="100" d={d} />
      {moving && (
        <circle className="wm-flow-dot" r="3">
          <animateMotion dur="4s" begin="1.6s" repeatCount="indefinite" path={d} />
        </circle>
      )}
      {label && (
        <text className="wm-route-label" x={lx} y={ly - 7} textAnchor="middle">{label}</text>
      )}
    </g>
  )
}

export function MapPulse({ lon, lat }) {
  const { x, y } = project(lon, lat)
  return <circle className="wm-pulse" cx={x} cy={y} r="14" />
}

export function RegionCaption({ lon, lat, text, i = 0 }) {
  const { x, y } = project(lon, lat)
  return (
    <text className="wm-region" style={{ '--i': i }} x={x} y={y} textAnchor="middle">{text}</text>
  )
}

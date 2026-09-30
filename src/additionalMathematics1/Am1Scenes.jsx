/**
 * Am1Scenes — VTU BEE613D Electric Motor and Drive Systems for EVs classroom
 * SVG visuals.
 *
 * Every scene animates something the syllabus asks students to reproduce with
 * a pencil: tractive effort curves crossing resistance, a chopper stepping
 * through its four quadrants, a rotating field slipping past the rotor, a
 * six-step inverter commutating a BLDC winding. Motion carries meaning —
 * nothing here moves purely for decoration.
 *
 * Phase 1 wrote one `visualSpec` paragraph per unit; VISUAL_MAP at the end of
 * this file binds each of the 80 `visual` ids to the scene that realises it.
 */

const N = '#152430'
const BLUE = '#1d4ed8'
const ROSE = '#be123c'
const PURP = '#7c3aed'
const AMBER = '#c2410c'
const GREEN = '#15803d'
const TEAL = '#0f766e'
const RED = '#b91c1c'
const MUTED = '#55677a'
const CREAM = '#fffdf8'
const SKY = '#e6eefb'
const WHITE = '#ffffff'
const MONO = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace'

export const PALETTE = { N, BLUE, ROSE, PURP, AMBER, GREEN, TEAL, RED, MUTED, CREAM, SKY }

/* JSX attributes arrive as strings when written `y="200"`, and `"200" + 11`
   is "20011", not 211 — which silently throws geometry off the canvas. Every
   helper below that does arithmetic on a coordinate prop coerces first. */
const n = (v) => Number(v)

/* ── Shell ──────────────────────────────────────────────────────── */

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`am1-scene ${className}`} aria-label={caption || 'Additional Mathematics-1 diagram'}>
      <svg viewBox={vb} role="img" className="am1-svg">
        <defs>
          <marker id="am1Arr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="am1ArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="am1ArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="am1ArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="am1ArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="am1ArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="am1ArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="am1ArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="am1ArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={MUTED} />
          </marker>
        </defs>
        <rect width="100%" height="100%" fill={CREAM} rx="8" />
        {children}
        {caption ? (
          <text x="450" y="504" textAnchor="middle" fontSize="15" fontWeight="700" fill={MUTED} fontFamily="system-ui,sans-serif">
            {caption}
          </text>
        ) : null}
      </svg>
    </div>
  )
}

export function L({ x, y, children, size = 17, fill = N, anchor = 'middle', weight = 800, className = '' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill} fontFamily="system-ui,sans-serif" className={className}>
      {children}
    </text>
  )
}

/** Monospace label — equations, matrix entries, component values. */
export function M({ x, y, children, size = 13, fill = N, anchor = 'middle', weight = 700, className = '' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={fill} fontFamily={MONO} className={className}>
      {children}
    </text>
  )
}

/* ── Drawing primitives ─────────────────────────────────────────── */

function Wire({ d, stroke = N, width = 2.5, className = '', marker, dash, opacity }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      markerEnd={marker}
      strokeDasharray={dash}
      opacity={opacity}
    />
  )
}

function Dot({ cx, cy, r = 5, fill = N, className = '', stroke, opacity }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} stroke={stroke} strokeWidth={stroke ? 2 : undefined} className={className} opacity={opacity} />
}

/**
 * Axes for a plot. `origin="center"` puts zero in the middle, which is what
 * the s-plane and every two-sided phasor sweep needs.
 */
function Axes({ x, y, w, h, xLabel, yLabel, origin = 'left', tickLabels = [], yTicks = [] }) {
  const [X, Y, W, H] = [n(x), n(y), n(w), n(h)]
  const zero = origin === 'center' ? X + W / 2 : X
  return (
    <g>
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#am1Arr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#am1Arr)" />
      {/* Anchored at the end, not centred: a long label ("load current I (A)")
          centred on X + W lands on top of the arrowhead. */}
      {xLabel ? (
        <L x={X + W - 10} y={Y + 34} size={13} fill={MUTED} weight={700} anchor="end">
          {xLabel}
        </L>
      ) : null}
      {yLabel ? (
        <L x={zero - 10} y={Y - H - 8} size={13} fill={MUTED} weight={700} anchor="end">
          {yLabel}
        </L>
      ) : null}
      {tickLabels.map(([tx, label]) => (
        <g key={`${tx}-${label}`}>
          <path d={`M${n(tx)} ${Y - 5} L${n(tx)} ${Y + 5}`} stroke={MUTED} strokeWidth="2" />
          <M x={n(tx)} y={Y + 20} size={11.5} fill={MUTED}>
            {label}
          </M>
        </g>
      ))}
      {yTicks.map(([ty, label]) => (
        <g key={`y${ty}-${label}`}>
          <path d={`M${zero - 5} ${n(ty)} L${zero + 5} ${n(ty)}`} stroke={MUTED} strokeWidth="2" />
          <M x={zero - 12} y={n(ty) + 4} size={11.5} fill={MUTED} anchor="end">
            {label}
          </M>
        </g>
      ))}
    </g>
  )
}

/** A polyline through explicit points — every response curve in the course. */
function Curve({ pts = [], stroke = BLUE, width = 2.8, className = '', dash, opacity }) {
  if (!pts.length) return null
  const d = pts.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${n(px).toFixed(1)} ${n(py).toFixed(1)}`).join(' ')
  return <Wire d={d} stroke={stroke} width={width} className={className} dash={dash} opacity={opacity} />
}

/* A CSS `transform` animation replaces the SVG `transform` attribute on the
   same element, so every helper positioned with translate() keeps its
   animation class on an inner group. */
function Block({ x, y, w, h, label, sub, stroke = BLUE, fill = WHITE, className = '', labelFill = N, mono = false, size }) {
  const [W, H] = [n(w), n(h)]
  const T = mono ? M : L
  return (
    <g transform={`translate(${n(x)},${n(y)})`}>
      <g className={className}>
        <rect width={W} height={H} rx="10" fill={fill} stroke={stroke} strokeWidth="2.5" />
        {label ? (
          <T x={W / 2} y={H / 2 + (sub ? -1 : 5)} size={size || (sub ? 13 : 14.5)} fill={labelFill}>
            {label}
          </T>
        ) : null}
        {sub ? (
          <L x={W / 2} y={H / 2 + 17} size={11} fill={MUTED} weight={700}>
            {sub}
          </L>
        ) : null}
      </g>
    </g>
  )
}

/** Labelled key/value panel — the numbers a worked example turns on. */
function Panel({ x, y, w = 250, title, rows = [], accent = BLUE, className = '', mono = false, rowH = 27 }) {
  const [X, Y, W] = [n(x), n(y), n(w)]
  const h = 34 + rows.length * rowH + 8
  const T = mono ? M : L
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <rect width={W} height={h} rx="11" fill={WHITE} stroke={accent} strokeWidth="2.3" />
        <rect width={W} height="30" rx="11" fill={accent} />
        <L x={W / 2} y={21} size={12.5} fill={WHITE} weight={800}>
          {title}
        </L>
        {rows.map((row, i) => {
          const [k, v, tone] = Array.isArray(row) ? row : [row, null, null]
          return (
            <g key={`${k}-${i}`}>
              <T x={12} y={52 + i * rowH} size={12} fill={tone || N} anchor="start" weight={700}>
                {k}
              </T>
              {v != null ? (
                <M x={W - 12} y={52 + i * rowH} size={12} fill={tone || MUTED} anchor="end" weight={800}>
                  {v}
                </M>
              ) : null}
            </g>
          )
        })}
      </g>
    </g>
  )
}

/** A titled card with body lines — the "three conditions" style callout. */
function Card({ x, y, w, h, title, lines = [], accent = BLUE, className = '', mono = false, foot, footTone = RED, children, linesY = 54, lineH = 19 }) {
  const [X, Y, W, H] = [n(x), n(y), n(w), n(h)]
  const T = mono ? M : L
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <rect width={W} height={H} rx="12" fill={WHITE} stroke={accent} strokeWidth="2.4" />
        <rect width={W} height="30" rx="12" fill={accent} />
        <L x={W / 2} y={21} size={12.5} fill={WHITE} weight={800}>
          {title}
        </L>
        {/* Card-local coordinates: children are drawn inside the translated
            group, so a mini-diagram can be positioned against the card. */}
        {children}
        {lines.map((line, i) => (
          <T key={`${line}-${i}`} x={W / 2} y={n(linesY) + i * n(lineH)} size={11.5} fill={N} weight={650}>
            {line}
          </T>
        ))}
        {foot ? (
          <L x={W / 2} y={H - 10} size={10.5} fill={footTone} weight={800}>
            {foot}
          </L>
        ) : null}
      </g>
    </g>
  )
}

/* ── Module openers / closers / fallbacks ───────────────────────── */

export function ModuleHero({ module = 1, title, question, hours }) {
  const beats = ['Resist', 'Propel', 'Commutate', 'Orient', 'Switch']
  return (
    <Scene caption={question || 'What the vehicle demands, and which motor family delivers it'}>
      <rect x="40" y="36" width="820" height="410" rx="16" fill={WHITE} stroke={BLUE} strokeWidth="3" />
      <L x="450" y="104" size={18} fill={BLUE}>{`MODULE ${module} · VTU BEE613D`}</L>
      <L x="450" y="162" size={25}>
        {title || `Module ${module}`}
      </L>
      <L x="450" y="208" size={14.5} fill={MUTED} weight={700}>
        {question || 'Match the propulsion system to what the vehicle asks of it'}
      </L>
      {beats.map((t, i) => (
        <Block
          key={t}
          x={70 + i * 154}
          y={264}
          w={134}
          h={68}
          label={t}
          stroke={i === module - 1 ? AMBER : BLUE}
          className={`am1m-flux am1m-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`am1m-current am1m-delay-${i}`}
          marker="url(#am1ArrB)"
        />
      ))}
      {hours ? <L x="450" y="396" size={14} fill={MUTED} weight={700}>{`${hours} teaching hours`}</L> : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Redraw the drive from memory — then name which quadrant it is operating in">
      <L x="450" y="86" size={19} fill={BLUE}>{`MODULE ${module} COMPLETE`}</L>
      <L x="450" y="140" size={24}>
        {title || 'Module complete'}
      </L>
      {['Draw and label the drive circuit', 'Name the quadrant of operation', 'State the control law before solving', 'Mark every reference direction', 'Check the units on the answer'].map((t, i) => (
        <g key={t} className={`am1m-cell-in am1m-delay-${i}`}>
          <Block x={64} y={190 + i * 52} w={772} h={44} label={t} stroke={i % 2 ? GREEN : BLUE} />
        </g>
      ))}
    </Scene>
  )
}

export function ConceptBoard({ title = 'Concept', points = [] }) {
  const rows = points.slice(0, 6)
  return (
    <Scene caption="Key terms for this unit">
      <Block x="60" y="52" w="780" h="58" label={title} stroke={BLUE} />
      {rows.map((p, i) => (
        <g key={String(p)} className={`am1m-cell-in am1m-delay-${i % 5}`}>
          <rect x="60" y={134 + i * 58} width="780" height="46" rx="9" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="92" cy={157 + i * 58} r="8" fill={i % 2 ? AMBER : BLUE} />
          <L x="118" y={163 + i * 58} size={16} anchor="start">
            {String(p)}
          </L>
        </g>
      ))}
    </Scene>
  )
}

/* ── AM1-specific primitives ─────────────────────────────────────────── */

/* Scene helpers unique to Additional Mathematics-1 land here. Coerce every numeric
   prop through n() -- including width/length props, not just x and y. */


/* ── Module 1 ────────────────────────────────────────────────────────── */

/* ── Module 1  Polar Curves and Curvature ───────────────────────────── */

/* Local polar primitives. Nearly every module-1 scene plots r = f(θ) about a
   pole, marks an angle, or drops a perpendicular, so those shapes are solved
   here once. Every numeric prop passes through n() first — sizes included. */

/* Reveal delay, inline: the am1m-delay-* classes are declared before the
   reveal keyframes and lose to their `animation` shorthand. */
const m1d = (s) => ({ animationDelay: `${n(s)}s` })
/* am1m-draw with a delay: keep the stroke hidden until its turn comes. */
const m1dd = (s) => ({ animationDelay: `${n(s)}s`, animationFillMode: 'backwards' })

/* Polar point (r, t) → canvas, pole at (cx, cy), s canvas units per unit r. */
function m1P(cx, cy, s, r, t) {
  return [n(cx) + n(s) * n(r) * Math.cos(n(t)), n(cy) - n(s) * n(r) * Math.sin(n(t))]
}

/* Sample r = f(θ) for θ in [t0, t1]. */
function m1Polar(cx, cy, s, f, t0, t1, steps = 160) {
  const pts = []
  const [a, b, k] = [n(t0), n(t1), n(steps)]
  for (let i = 0; i <= k; i += 1) {
    const t = a + ((b - a) * i) / k
    pts.push(m1P(cx, cy, s, f(t), t))
  }
  return pts
}

const m1D = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${n(x).toFixed(1)} ${n(y).toFixed(1)}`).join(' ')

/* Arc of radius R about (cx, cy) from math angle a0 to a1 (radians). */
function m1Arc(cx, cy, R, a0, a1) {
  const [p0, p1] = [m1P(cx, cy, 1, R, a0), m1P(cx, cy, 1, R, a1)]
  const large = Math.abs(n(a1) - n(a0)) > Math.PI ? 1 : 0
  const sweep = n(a1) > n(a0) ? 0 : 1
  return `M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${n(R)} ${n(R)} 0 ${large} ${sweep} ${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`
}

/* Right-angle square at `at`, legs toward points A and B. */
function m1Sq(at, A, B, k = 11) {
  const u = (p) => {
    const dx = n(p[0]) - n(at[0])
    const dy = n(p[1]) - n(at[1])
    const d = Math.hypot(dx, dy) || 1
    return [(dx / d) * n(k), (dy / d) * n(k)]
  }
  const [a, b] = [u(A), u(B)]
  const [x, y] = [n(at[0]), n(at[1])]
  return `M${(x + a[0]).toFixed(1)} ${(y + a[1]).toFixed(1)} L${(x + a[0] + b[0]).toFixed(1)} ${(y + a[1] + b[1]).toFixed(1)} L${(x + b[0]).toFixed(1)} ${(y + b[1]).toFixed(1)}`
}

/* A curve the student is asked to draw: traced with am1m-draw. pathLength
   normalises every curve to the 900-unit dash the keyframe expects. */
function M1Draw({ pts, d, stroke = BLUE, width = 3, delay = 0, opacity }) {
  return (
    <path
      d={d || m1D(pts)}
      pathLength="900"
      fill="none"
      stroke={stroke}
      strokeWidth={n(width)}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="am1m-draw"
      style={m1dd(delay)}
      opacity={opacity}
    />
  )
}

/* Faint polar grid: rings (radii in canvas units) and evenly spaced spokes. */
function M1Grid({ cx, cy, rings = [], spokes = 0, len, opacity = 0.35 }) {
  const [X, Y] = [n(cx), n(cy)]
  const R = len != null ? n(len) : Math.max(0, ...rings.map(n)) + 10
  return (
    <g opacity={opacity}>
      {rings.map((r) => (
        <circle key={r} cx={X} cy={Y} r={n(r)} fill="none" stroke={MUTED} strokeWidth="1.3" />
      ))}
      {Array.from({ length: n(spokes) }, (_, i) => {
        const [x, y] = m1P(X, Y, 1, R, (2 * Math.PI * i) / n(spokes))
        return <path key={i} d={`M${X} ${Y} L${x.toFixed(1)} ${y.toFixed(1)}`} stroke={MUTED} strokeWidth="1" />
      })}
    </g>
  )
}

/* A label on a cream backing, for annotations that must sit over a grid. */
function M1Tag({ x, y, children, fill = N, size = 12, anchor = 'middle', mono = true, weight = 800 }) {
  const [X, Y, S] = [n(x), n(y), n(size)]
  const w = String(children).length * S * (mono ? 0.62 : 0.58) + 8
  const left = anchor === 'start' ? X - 4 : anchor === 'end' ? X - w + 4 : X - w / 2
  const T = mono ? M : L
  return (
    <g>
      <rect x={left} y={Y - S} width={w} height={S + 5} rx="4" fill={CREAM} opacity="0.92" />
      <T x={X} y={Y} size={S} fill={fill} anchor={anchor} weight={weight}>
        {children}
      </T>
    </g>
  )
}

/* ── Unit 1 · polar-grid-point-locator ── */
export function M1PolarPointScene() {
  const [ox, oy, s] = [320, 280, 55]
  const th = (2 * Math.PI) / 3
  const P = m1P(ox, oy, s, 2, th)
  const Q = m1P(ox, oy, s, 2, -Math.PI / 3)
  return (
    <Scene caption="Distance r from the pole, angle θ from the initial line, measured anticlockwise">
      <M1Grid cx={ox} cy={oy} rings={[55, 110, 165]} spokes={12} len={175} />
      <M x={ox + 6} y={339} size={11} fill={MUTED} anchor="start">1</M>
      <M x={ox + 6} y={394} size={11} fill={MUTED} anchor="start">2</M>
      <M x={ox + 6} y={449} size={11} fill={MUTED} anchor="start">3</M>
      <Dot cx={ox} cy={oy} r={6} />
      <L x={ox + 12} y={300} size={14} anchor="start">O (pole)</L>

      <g className="am1m-slide-in" style={m1d(0.4)}>
        <Wire d={`M${ox} ${oy} L${ox + 205} ${oy}`} width={4.5} marker="url(#am1Arr)" />
        <M1Tag x={470} y={272} size={12} fill={N}>initial line</M1Tag>
        <L x={538} y={286} size={15} anchor="start">X</L>
      </g>

      <M1Draw d={m1Arc(ox, oy, 30, 0, th)} stroke={AMBER} width={3} delay={1.0} />
      <g className="am1m-emerge" style={m1d(1.0)}>
        <M1Tag x={362} y={252} size={13} fill={AMBER} anchor="start">θ = 2π/3</M1Tag>
      </g>

      <g className="am1m-emerge" style={m1d(1.8)}>
        <Wire d={`M${ox} ${oy} L${P[0].toFixed(1)} ${P[1].toFixed(1)}`} stroke={BLUE} width={3.5} />
        <M1Tag x={312} y={221} size={14} fill={BLUE} anchor="start">r = 2</M1Tag>
      </g>
      <g className="am1m-emerge" style={m1d(2.3)}>
        <Dot cx={P[0]} cy={P[1]} r={7} fill={BLUE} />
        <M1Tag x={256} y={178} size={13} fill={BLUE} anchor="end">P (2, 2π/3)</M1Tag>
      </g>

      <g className="am1m-emerge" style={m1d(2.9)}>
        <Wire d={`M${ox} ${oy} L${P[0].toFixed(1)} ${oy}`} stroke={AMBER} width={4} dash="7 5" />
        <Wire d={`M${P[0].toFixed(1)} ${oy} L${P[0].toFixed(1)} ${P[1].toFixed(1)}`} stroke={GREEN} width={3} dash="7 5" />
        <path d={m1Sq([P[0], oy], [ox, oy], P, 10)} fill="none" stroke={N} strokeWidth="1.6" />
        <M1Tag x={P[0] - 10} y={214} size={12} fill={GREEN} anchor="end">y = r sin θ = √3</M1Tag>
        <M1Tag x={302} y={306} size={12} fill={AMBER} anchor="end">x = r cos θ = −1</M1Tag>
        <L x={P[0] - 4} y={oy - 6} size={12} fill={N} anchor="end">M</L>
      </g>

      <Card x={580} y={40} w={290} h={150} title="polar ↔ Cartesian" accent={TEAL} mono className="am1m-cell-in"
        lines={['x = r cos θ', 'y = r sin θ', 'r = √(x² + y²)', 'tan θ = y / x']} linesY={58} lineH={22} />

      <g className="am1m-emerge" style={m1d(3.6)}>
        <Wire d={`M${ox} ${oy} L${Q[0].toFixed(1)} ${Q[1].toFixed(1)}`} stroke={ROSE} width={2.2} dash="4 5" />
        <Dot cx={Q[0]} cy={Q[1]} r={6} fill={CREAM} stroke={ROSE} />
        <M1Tag x={Q[0] + 12} y={Q[1] + 17} size={11.5} fill={ROSE} anchor="start">ray θ = −π/3, r reversed</M1Tag>
      </g>
      <g className="am1m-emerge" style={m1d(3.6)}>
        <Card x={580} y={300} w={290} h={160} title="one point, three names" accent={ROSE} mono
          lines={['(2, 2π/3)', '= (2, 8π/3)    θ + 2π', '= (−2, −π/3)   −r, θ − π']} linesY={62} lineH={26}
          foot="at the pole θ is undefined" />
      </g>
    </Scene>
  )
}

/* ── Unit 2 · cartesian-polar-translation-table ── */
export function M1CartPolarTableScene() {
  const T = [74, 210, 346]
  const rows = [
    { c: 'x² + y² = 4y', p: 'r = 4 sin θ', step: 'r² = 4r sin θ, then ÷ r', name: 'circle above the pole', tone: BLUE },
    { c: 'x² + y² = 2ax', p: 'r = 2a cos θ', step: 'r² = 2a r cos θ, then ÷ r', name: 'circle right of the pole', tone: TEAL },
    { c: '(x² + y²)² = a²(x² − y²)', p: 'r² = a² cos 2θ', step: 'r⁴ = a²r²(cos²θ − sin²θ)', name: 'lemniscate (figure-eight)', tone: PURP },
  ]
  const lem = (py) => {
    const f = (t) => 3.5 * Math.sqrt(Math.max(0, Math.cos(2 * t)))
    const right = m1Polar(560, py, 15, f, -Math.PI / 4, Math.PI / 4, 90)
    const left = m1Polar(560, py, 15, (t) => -f(t), -Math.PI / 4, Math.PI / 4, 90)
    return `${m1D(right)} ${m1D(left)}`
  }
  const thumbs = [
    { axes: (t) => `M510 ${t + 128} L610 ${t + 128} M560 ${t + 128} L560 ${t + 62}`, d: (t) => m1D(m1Polar(560, t + 128, 15, (a) => 4 * Math.sin(a), 0, Math.PI, 90)) },
    { axes: (t) => `M505 ${t + 98} L615 ${t + 98} M530 ${t + 66} L530 ${t + 130}`, d: (t) => m1D(m1Polar(530, t + 98, 15, (a) => 4 * Math.cos(a), -Math.PI / 2, Math.PI / 2, 90)) },
    { axes: (t) => `M504 ${t + 98} L616 ${t + 98} M560 ${t + 70} L560 ${t + 126}`, d: (t) => lem(t + 98) },
  ]
  return (
    <Scene caption="Substitute x = r cos θ, y = r sin θ; to go back, multiply through by r">
      <Panel x={20} y={60} w={196} title="substitution keys" accent={TEAL} mono rows={['x = r cos θ', 'y = r sin θ', 'x² + y² = r²']} />
      <Card x={20} y={210} w={196} h={150} title="going back" accent={AMBER}
        lines={['multiply through by r', 'so r cos θ, r sin θ, r²', 'appear; replace them by', 'x, y and x² + y²']} linesY={54} lineH={20}
        foot="÷ r can drop the pole r = 0" />

      <rect x="236" y="36" width="648" height="446" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <rect x="236" y="36" width="648" height="38" rx="10" fill={SKY} />
      <path d="M500 36 L500 482 M620 36 L620 482 M236 210 L884 210 M236 346 L884 346" stroke={MUTED} strokeWidth="1.2" opacity="0.6" />
      <L x={368} y={61} size={15} fill={N}>Cartesian</L>
      <L x={560} y={61} size={15} fill={MUTED}>⇄</L>
      <L x={752} y={61} size={15} fill={N}>Polar</L>

      {rows.map((r, i) => {
        const t = T[i]
        const base = 0.6 + 1.5 * i
        return (
          <g key={r.p}>
            <g className="am1m-slide-in" style={m1d(base)}>
              <M x={368} y={t + 34} size={14}>{r.c}</M>
              <L x={368} y={t + 60} size={12} fill={MUTED} weight={700}>{r.name}</L>
            </g>
            <g className="am1m-emerge" style={m1d(base + 0.4)}>
              <Wire d={`M510 ${t + 25} L606 ${t + 25}`} stroke={BLUE} width={2.2} marker="url(#am1ArrB)" className="am1m-flow-arrow" />
              <Wire d={`M610 ${t + 37} L514 ${t + 37}`} stroke={AMBER} width={2.2} marker="url(#am1ArrA)" className="am1m-flow-arrow" />
              <M x={560} y={t + 15} size={10} fill={BLUE}>substitute</M>
              <M x={560} y={t + 52} size={10} fill={AMBER}>× r</M>
            </g>
            <g className="am1m-emerge" style={m1d(base + 0.8)}>
              <M x={752} y={t + 34} size={15} fill={r.tone} weight={800}>{r.p}</M>
              <M x={752} y={t + 58} size={11} fill={MUTED}>{r.step}</M>
            </g>
            <path d={thumbs[i].axes(t)} stroke={MUTED} strokeWidth="1.2" opacity="0.6" fill="none" />
            <M1Draw d={thumbs[i].d(t)} stroke={r.tone} width={2.6} delay={base + 1.1} />
          </g>
        )
      })}
    </Scene>
  )
}

/* ── Unit 3 · polar-curve-gallery ── */
export function M1PolarGalleryScene() {
  const cols = [155, 450, 745]
  const tops = [20, 252]
  const PI = Math.PI
  const root = (t) => Math.sqrt(Math.max(0, Math.cos(2 * t)))
  const panels = [
    { name: 'cardioid', eq: 'r = a(1 + cos θ)', dx: -35, dy: 0, parts: [[40, (t) => 1 + Math.cos(t), 0, 2 * PI, BLUE]] },
    { name: 'three-leaved rose', eq: 'r = a sin 3θ', dx: 0, dy: -12, rose: true,
      parts: [[80, (t) => Math.sin(3 * t), 0, PI / 3, BLUE], [80, (t) => Math.sin(3 * t), PI / 3, (2 * PI) / 3, AMBER], [80, (t) => Math.sin(3 * t), (2 * PI) / 3, PI, BLUE]] },
    { name: 'four-leaved rose', eq: 'r = a sin 2θ', dx: 0, dy: 0, parts: [[80, (t) => Math.sin(2 * t), 0, 2 * PI, BLUE]] },
    { name: 'lemniscate', eq: 'r² = a² cos 2θ', dx: 0, dy: 0, parts: [[82, root, -PI / 4, PI / 4, BLUE], [82, (t) => -root(t), -PI / 4, PI / 4, BLUE]] },
    { name: 'limaçon, a < b (inner loop)', eq: 'r = a + b cos θ', dx: -40, dy: 0, parts: [[28, (t) => 1 + 2 * Math.cos(t), 0, 2 * PI, BLUE]] },
    { name: 'reciprocal spiral', eq: 'rθ = a', dx: -25, dy: 0, spiral: true, parts: [[35, (t) => 1 / t, 0.42, 6 * PI, BLUE]] },
  ]
  return (
    <Scene caption="Read the bounding |r|, the zeros of r and where r < 0 before plotting a single point">
      {panels.map((pn, i) => {
        const cx = cols[i % 3]
        const top = tops[Math.floor(i / 3)]
        const [px, py] = [cx + pn.dx, top + 92 + pn.dy]
        return (
          <g key={pn.name}>
            <rect x={cx - 140} y={top} width="280" height="215" rx="12" fill={WHITE} stroke={SKY} strokeWidth="2.2" />
            <M1Grid cx={px} cy={py} rings={[40, 80]} spokes={12} len={82} opacity={0.3} />
            {pn.spiral ? (
              <g>
                <Wire d={`M${cx - 115} ${py - 35} L${cx + 100} ${py - 35}`} stroke={MUTED} width={1.4} dash="5 5" />
                <M x={cx + 132} y={py - 40} size={11} fill={MUTED} anchor="end">y = a</M>
              </g>
            ) : null}
            {pn.parts.map(([s, f, t0, t1, tone], j) => {
              const path = <M1Draw key={j} pts={m1Polar(px, py, s, f, t0, t1, pn.spiral ? 420 : 180)} stroke={tone} width={2.8} delay={0.3 + 0.7 * i + 0.25 * j} />
              return tone === AMBER ? (
                <g key={j} className="am1m-charge" style={m1d(5)}>{path}</g>
              ) : path
            })}
            <Dot cx={px} cy={py} r={3.5} fill={N} />
            <L x={cx} y={top + 192} size={12} fill={MUTED} weight={700}>{pn.name}</L>
            <M x={cx} y={top + 209} size={13}>{pn.eq}</M>
            {pn.rose ? (
              <g className="am1m-emerge" style={m1d(4.6)}>
                <M1Tag x={cx + 30} y={py + 50} size={10.5} fill={AMBER} anchor="start">r &lt; 0:</M1Tag>
                <M1Tag x={cx + 30} y={py + 64} size={10.5} fill={AMBER} anchor="start">plotted on the</M1Tag>
                <M1Tag x={cx + 30} y={py + 78} size={10.5} fill={AMBER} anchor="start">opposite ray</M1Tag>
              </g>
            ) : null}
          </g>
        )
      })}
    </Scene>
  )
}

/* ── Unit 4 · lemniscate-tracing-checklist ── */
export function M1LemniscateTraceScene() {
  const [ox, oy, s] = [620, 260, 75]
  const PI = Math.PI
  const root = (t) => 2 * Math.sqrt(Math.max(0, Math.cos(2 * t)))
  const wedge = (a0, a1) => `M${ox} ${oy} ${m1Arc(ox, oy, 160, a0, a1).replace('M', 'L')} Z`
  const quarter = m1Polar(ox, oy, s, root, 0, PI / 4, 80)
  const lower = m1Polar(ox, oy, s, root, -PI / 4, 0, 80)
  const leftLobe = m1Polar(ox, oy, s, (t) => -root(t), -PI / 4, PI / 4, 120)
  const A = m1P(ox, oy, s, 2, 0)
  const B = m1P(ox, oy, s, 1.682, PI / 8)
  const C = m1P(ox, oy, s, 1.414, PI / 6)
  const t1 = m1P(ox, oy, 1, 170, PI / 4)
  const t2 = m1P(ox, oy, 1, 170, -PI / 4)
  const checks = [
    ['Symmetry', ['θ → −θ unchanged: initial line', 'r → −r unchanged: the pole'], 0.4],
    ['Limits', ['|r| ≤ 2: bounding circle', 'r² < 0 for π/4 < θ < 3π/4'], 1.4],
    ['Pole', ['r = 0 ⇒ cos 2θ = 0', 'tangents at O: θ = ±π/4'], 2.4],
    ['Points', ['θ = 0,  π/8,  π/6', 'r = 2, 1.68, 1.41'], 3.4],
  ]
  return (
    <Scene caption="Symmetry, limits and the pole first; then three points and two mirrors finish the figure-eight">
      <defs>
        <pattern id="am1m1Hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 L0 8" stroke={MUTED} strokeWidth="2" />
        </pattern>
      </defs>

      <Card x={24} y={36} w={330} h={430} title="trace r² = 4 cos 2θ" accent={BLUE} foot="each symmetry halves the θ-range" footTone={GREEN}>
        {checks.map(([title, subs, at], i) => {
          const y0 = 72 + 92 * i
          return (
            <g key={title}>
              <rect x="16" y={y0 - 16} width="20" height="20" rx="4" fill={WHITE} stroke={N} strokeWidth="2" />
              <g className="am1m-emerge" style={m1d(at)}>
                <path d={`M19 ${y0 - 6} L25 ${y0} L34 ${y0 - 14}`} fill="none" stroke={GREEN} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <L x={48} y={y0} size={15} anchor="start">{title}</L>
              {subs.map((line, j) => (
                <M key={line} x={48} y={y0 + 24 + 18 * j} size={11.5} anchor="start" fill={MUTED}>{line}</M>
              ))}
            </g>
          )
        })}
      </Card>

      <M1Grid cx={ox} cy={oy} rings={[75, 150]} opacity={0.4} />

      <g className="am1m-emerge" style={m1d(0.4)}>
        <g className="am1m-charge">
          <Wire d={`M445 ${oy} L805 ${oy}`} stroke={PURP} width={2} dash="8 5" />
          <Wire d={`M${ox} 92 L${ox} 430`} stroke={PURP} width={2} dash="8 5" />
        </g>
      </g>

      <g className="am1m-emerge" style={m1d(1.4)}>
        <path d={wedge(PI / 4, (3 * PI) / 4)} fill="url(#am1m1Hatch)" opacity="0.45" />
        <path d={wedge((5 * PI) / 4, (7 * PI) / 4)} fill="url(#am1m1Hatch)" opacity="0.45" />
        <circle cx={ox} cy={oy} r="150" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="6 5" />
        <M1Tag x={585} y={150} size={13} fill={MUTED}>r² &lt; 0</M1Tag>
        <M1Tag x={585} y={382} size={13} fill={MUTED}>r² &lt; 0</M1Tag>
      </g>

      <g className="am1m-emerge" style={m1d(2.4)}>
        <Wire d={`M${(2 * ox - t1[0]).toFixed(1)} ${(2 * oy - t1[1]).toFixed(1)} L${t1[0].toFixed(1)} ${t1[1].toFixed(1)}`} stroke={ROSE} width={2} dash="7 5" />
        <Wire d={`M${(2 * ox - t2[0]).toFixed(1)} ${(2 * oy - t2[1]).toFixed(1)} L${t2[0].toFixed(1)} ${t2[1].toFixed(1)}`} stroke={ROSE} width={2} dash="7 5" />
        <M x={t1[0] + 6} y={t1[1] + 2} size={12} fill={ROSE} anchor="start">θ = π/4</M>
        <M x={t2[0] + 6} y={t2[1] + 10} size={12} fill={ROSE} anchor="start">θ = −π/4</M>
      </g>

      <Dot cx={ox} cy={oy} r={5} />
      <L x={632} y={292} size={14} anchor="start">O</L>

      <M1Draw pts={quarter} stroke={BLUE} width={3.6} delay={3.4} />
      <g className="am1m-emerge" style={m1d(3.6)}>
        {[A, B, C].map(([x, y]) => <Dot key={x} cx={x} cy={y} r={5} fill={BLUE} />)}
        <Wire d={`M${B[0] + 5} ${B[1] - 2} L786 203`} stroke={MUTED} width={1.2} />
        <Wire d={`M${C[0] + 5} ${C[1] - 3} L786 172`} stroke={MUTED} width={1.2} />
        <M x={790} y={208} size={12} fill={BLUE} anchor="start">(1.68, π/8)</M>
        <M x={790} y={176} size={12} fill={BLUE} anchor="start">(1.41, π/6)</M>
        <M x={778} y={284} size={12} fill={BLUE} anchor="start">A (2, 0)</M>
      </g>
      <g className="am1m-emerge" style={m1d(4.6)}>
        <Curve pts={lower} stroke={BLUE} width={3} opacity={0.6} />
      </g>
      <g className="am1m-emerge" style={m1d(5.2)}>
        <Curve pts={leftLobe} stroke={BLUE} width={3} opacity={0.6} />
      </g>
    </Scene>
  )
}

/* ── Unit 5 · chord-to-tangent-limit ── */
export function M1ChordTangentScene() {
  const [ox, oy] = [70, 450]
  const f = (t) => 300 + 80 * t
  const pt = (t) => m1P(ox, oy, 1, f(t), t)
  const [tP, tQ] = [0.35, 0.8]
  const P = pt(tP)
  const Q = pt(tQ)
  const Mf = m1P(ox, oy, 1, f(tP) * Math.cos(tQ - tP), tQ)
  const dx = 80 * Math.cos(tP) - f(tP) * Math.sin(tP)
  const dy = 80 * Math.sin(tP) + f(tP) * Math.cos(tP)
  const len = Math.hypot(dx, dy)
  const u = [dx / len, -dy / len]
  const tanA = [P[0] - 110 * u[0], P[1] - 110 * u[1]]
  const tanB = [P[0] + 130 * u[0], P[1] + 130 * u[1]]
  const chord = (K) => `M${P[0].toFixed(1)} ${P[1].toFixed(1)} L${(K[0] + 0.25 * (K[0] - P[0])).toFixed(1)} ${(K[1] + 0.25 * (K[1] - P[1])).toFixed(1)}`
  const Q2 = pt(0.6)
  const Q3 = pt(0.45)
  const ext = m1P(ox, oy, 1, f(tP) + 60, tP)
  const psi = Math.atan2(dy, dx)
  /* α at Q: between QM (toward O) and QP, as math angles. */
  const aQM = Math.atan2(-(Mf[1] - Q[1]), Mf[0] - Q[0])
  const aQP = Math.atan2(-(P[1] - Q[1]), P[0] - Q[0])
  return (
    <Scene caption="As Q slides to P the chord turns into the tangent and α becomes φ: tan φ = r dθ/dr">
      <Wire d={`M${ox} ${oy} L470 ${oy}`} stroke={MUTED} width={1.6} />
      <M1Draw pts={m1Polar(ox, oy, 1, f, 0.15, 1.05, 120)} stroke={BLUE} width={3.2} delay={0} />
      <Wire d={`M${tanA[0].toFixed(1)} ${tanA[1].toFixed(1)} L${tanB[0].toFixed(1)} ${tanB[1].toFixed(1)}`} stroke={GREEN} width={2.2} dash="8 6" />
      <Dot cx={ox} cy={oy} r={5} />
      <L x={ox} y={474} size={14}>O</L>

      <g className="am1m-emerge" style={m1d(0.4)}>
        <Wire d={`M${ox} ${oy} L${P[0].toFixed(1)} ${P[1].toFixed(1)}`} stroke={N} width={2.4} />
        <Wire d={`M${ox} ${oy} L${Q[0].toFixed(1)} ${Q[1].toFixed(1)}`} stroke={N} width={2.4} />
        <path d={m1Arc(ox, oy, 60, tP, tQ)} fill="none" stroke={PURP} strokeWidth="2.2" />
        <M x={142} y={404} size={13} fill={PURP}>δθ</M>
        <Dot cx={P[0]} cy={P[1]} r={5.5} fill={BLUE} />
        <Dot cx={Q[0]} cy={Q[1]} r={5.5} fill={AMBER} />
        <M x={392} y={338} size={12.5} fill={BLUE} anchor="start">P(r, θ)</M>
        <M x={334} y={184} size={12.5} fill={AMBER} anchor="start">Q(r + δr, θ + δθ)</M>
      </g>

      <g className="am1m-emerge" style={m1d(1.0)}>
        <Wire d={`M${P[0].toFixed(1)} ${P[1].toFixed(1)} L${Q[0].toFixed(1)} ${Q[1].toFixed(1)}`} stroke={AMBER} width={2.6} />
      </g>
      <g className="am1m-emerge" style={m1d(1.6)}>
        <Wire d={`M${P[0].toFixed(1)} ${P[1].toFixed(1)} L${Mf[0].toFixed(1)} ${Mf[1].toFixed(1)}`} stroke={TEAL} width={2.4} />
        <path d={m1Sq(Mf, Q, P, 10)} fill="none" stroke={N} strokeWidth="1.6" />
        <M x={330} y={322} size={12} fill={TEAL} anchor="end">MP = r sin δθ</M>
        <L x={Mf[0] - 10} y={Mf[1] - 6} size={13} anchor="end">M</L>
      </g>
      <g className="am1m-emerge" style={m1d(2.2)}>
        <Wire d={`M${Mf[0].toFixed(1)} ${Mf[1].toFixed(1)} L${Q[0].toFixed(1)} ${Q[1].toFixed(1)}`} stroke={ROSE} width={4} />
        <M x={285} y={205} size={12} fill={ROSE} anchor="end">MQ = δr + 2r sin²(δθ/2)</M>
      </g>
      <g className="am1m-emerge" style={m1d(2.6)}>
        <path d={m1Arc(Q[0], Q[1], 26, aQM, aQP)} fill="none" stroke={AMBER} strokeWidth="2.2" />
        <L x={315} y={234} size={14} fill={AMBER}>α</L>
      </g>

      <g className="am1m-emerge" style={m1d(3.2)}>
        <Wire d={chord(Q2)} stroke={AMBER} width={1.8} opacity={0.7} />
        <Dot cx={Q2[0]} cy={Q2[1]} r={4.5} fill={AMBER} />
        <M x={376} y={250} size={12} fill={AMBER} anchor="start">Q₂</M>
      </g>
      <g className="am1m-emerge" style={m1d(3.8)}>
        <Wire d={chord(Q3)} stroke={AMBER} width={1.8} opacity={0.7} />
        <Dot cx={Q3[0]} cy={Q3[1]} r={4.5} fill={AMBER} />
        <M x={384} y={304} size={12} fill={AMBER} anchor="start">Q₃</M>
      </g>
      <g className="am1m-emerge" style={m1d(4.4)}>
        <Wire d={`M${P[0].toFixed(1)} ${P[1].toFixed(1)} L${ext[0].toFixed(1)} ${ext[1].toFixed(1)}`} stroke={N} width={1.8} dash="5 4" />
        <g className="am1m-charge">
          <Wire d={`M${P[0].toFixed(1)} ${P[1].toFixed(1)} L${tanB[0].toFixed(1)} ${tanB[1].toFixed(1)}`} stroke={GREEN} width={3.2} />
          <path d={m1Arc(P[0], P[1], 34, tP, psi)} fill="none" stroke={GREEN} strokeWidth="2.6" />
        </g>
        <L x={415} y={301} size={15} fill={GREEN}>φ</L>
      </g>

      <Card x={490} y={30} w={390} h={190} title="right triangle PMQ" accent={TEAL} mono className="am1m-cell-in"
        lines={['MP = r sin δθ', 'MQ = δr + 2r sin²(δθ/2)', 'tan α = MP / MQ', '÷ δθ:  sin δθ / δθ → 1', 'sin²(δθ/2) / δθ → 0', 'Q → P:  chord → tangent,  α → φ']}
        linesY={56} lineH={21} />
      <g className="am1m-emerge" style={m1d(5.0)}>
        <Block x={540} y={250} w={300} h={64} label="tan φ = r dθ/dr" mono size={20} stroke={GREEN} labelFill={GREEN} />
        <M x={690} y={346} size={13} fill={MUTED}>cot φ = (1/r) dr/dθ</M>
        <L x={690} y={392} size={12.5} fill={AMBER} weight={700}>α: chord QP against OQ</L>
        <L x={690} y={414} size={12.5} fill={GREEN} weight={700}>φ: tangent against the radius vector</L>
      </g>
    </Scene>
  )
}

/* ── Unit 6 · log-diff-derivation-ladder ── */
export function M1LogDiffLadderScene() {
  const [ox, oy, a] = [820, 250, 90]
  const th = (2 * Math.PI) / 3
  const P = m1P(ox, oy, a, 1.5, th)
  const ext = m1P(ox, oy, a, 1.5 + 40 / a, th)
  const rungs = [
    ['log r = log a + log(1 − cos θ)', N, BLUE],
    ['(1/r) dr/dθ = sin θ / (1 − cos θ)', N, BLUE],
    ['= 2 sin(θ/2) cos(θ/2) / 2 sin²(θ/2)', N, BLUE],
    ['cot φ = cot(θ/2)  ⇒  φ = θ/2', GREEN, GREEN],
  ]
  const steps = ['d/dθ', 'half-angle', 'cancel']
  return (
    <Scene caption="Take logs, differentiate, use half-angles: the cardioid gives φ = θ/2">
      <Wire d={`M${ox} ${oy} L880 ${oy}`} stroke={MUTED} width={1.8} />
      <M1Draw pts={m1Polar(ox, oy, a, (t) => 1 - Math.cos(t), 0, 2 * Math.PI, 180)} stroke={BLUE} width={3.2} delay={0} />
      <Dot cx={ox} cy={oy} r={5} />
      <L x={832} y={270} size={14} anchor="start">O</L>
      <M x={740} y={400} size={14} fill={BLUE}>r = a(1 − cos θ)</M>
      <g className="am1m-emerge" style={m1d(0.6)}>
        <Wire d={`M${ox} ${oy} L${ext[0].toFixed(1)} ${ext[1].toFixed(1)}`} stroke={N} width={2} />
        <Wire d={`M650 ${P[1].toFixed(1)} L850 ${P[1].toFixed(1)}`} stroke={ROSE} width={2.4} />
        <Dot cx={P[0]} cy={P[1]} r={5.5} fill={ROSE} />
        <M x={760} y={121} size={12} fill={ROSE} anchor="start">P, θ = 2π/3</M>
      </g>
      <g className="am1m-emerge" style={m1d(0.6)}>
        <path d={m1Arc(P[0], P[1], 30, th, Math.PI)} fill="none" stroke={AMBER} strokeWidth="2.4" />
        <L x={712} y={118} size={15} fill={AMBER} anchor="end">φ</L>
      </g>

      {rungs.map(([text, tone, stroke], i) => {
        const y = 40 + 105 * i
        return (
          <g key={text} className="am1m-slide-in" style={m1d(1.2 + 0.9 * i)}>
            <Block x={30} y={y} w={470} h={56} label={text} mono size={14} stroke={stroke} labelFill={tone} />
            <M x={50} y={y + 33} size={12} fill={MUTED}>{`${i + 1}`}</M>
            {i < 3 ? (
              <g>
                <Wire d={`M265 ${y + 60} L265 ${y + 99}`} stroke={MUTED} width={2} marker="url(#am1ArrM)" />
                <M x={282} y={y + 84} size={12} fill={PURP} anchor="start">{steps[i]}</M>
              </g>
            ) : null}
          </g>
        )
      })}
      <g className="am1m-slide-in" style={m1d(4.2)}>
        <M x={265} y={450} size={12} fill={MUTED}>then p = r sin φ = 2a sin³(θ/2)</M>
      </g>

      <g className="am1m-emerge" style={m1d(3.9)}>
        <g className="am1m-charge">
          <path d={m1Arc(P[0], P[1], 30, th, Math.PI)} fill="none" stroke={GREEN} strokeWidth="4" />
        </g>
        <M1Tag x={700} y={92} size={14} fill={GREEN} anchor="end">φ = θ/2 = 60°</M1Tag>
      </g>
    </Scene>
  )
}

/* ── Unit 7 · tangent-direction-psi-triangle ── */
export function M1PsiTriangleScene() {
  const [ox, oy] = [70, 380]
  const th = (35 * Math.PI) / 180
  const psi = (80 * Math.PI) / 180
  const P = m1P(ox, oy, 1, 200, th)
  const s = (P[1] - oy) / Math.sin(psi)
  const T = [P[0] + s * Math.cos(psi), oy]
  const up = [P[0] + 90 * Math.cos(psi), P[1] - 90 * Math.sin(psi)]
  const down = [T[0] - 30 * Math.cos(psi), T[1] + 30 * Math.sin(psi)]
  const ext = m1P(ox, oy, 1, 270, th)
  const [cx, cy, a] = [590, 250, 130]
  const A = m1P(cx, cy, a, 1.5, Math.PI / 3)
  const B = m1P(cx, cy, a, 0.5, (2 * Math.PI) / 3)
  return (
    <Scene caption="ψ = θ + φ turns φ into the tangent's direction against the initial line">
      <L x={230} y={60} size={13} fill={MUTED} weight={700}>φ from the radius vector, ψ from the initial line</L>

      <g className="am1m-slide-in" style={m1d(0.2)}>
        <Wire d={`M${ox} ${oy} L440 ${oy}`} stroke={N} width={3} marker="url(#am1Arr)" />
        <Wire d={`M${ox} ${oy} L${P[0].toFixed(1)} ${P[1].toFixed(1)}`} stroke={BLUE} width={3} />
        <Wire d={`M${P[0].toFixed(1)} ${P[1].toFixed(1)} L${ext[0].toFixed(1)} ${ext[1].toFixed(1)}`} stroke={BLUE} width={1.8} dash="5 4" />
        <Wire d={`M${down[0].toFixed(1)} ${down[1].toFixed(1)} L${up[0].toFixed(1)} ${up[1].toFixed(1)}`} stroke={GREEN} width={3} />
        <Dot cx={ox} cy={oy} r={5} />
        <Dot cx={P[0]} cy={P[1]} r={5.5} fill={BLUE} />
        <Dot cx={T[0]} cy={T[1]} r={5} fill={GREEN} />
        <L x={62} y={402} size={14}>O</L>
        <L x={222} y={402} size={14} anchor="start">T</L>
        <L x={222} y={260} size={14} anchor="end">P</L>
        <L x={448} y={385} size={14} anchor="start">X</L>
      </g>
      <g className="am1m-emerge" style={m1d(0.8)}>
        <path d={m1Arc(ox, oy, 40, 0, th)} fill="none" stroke={BLUE} strokeWidth="2.6" />
        <L x={126} y={366} size={15} fill={BLUE}>θ</L>
      </g>
      <g className="am1m-emerge" style={m1d(1.4)}>
        <path d={m1Arc(P[0], P[1], 28, th, psi)} fill="none" stroke={AMBER} strokeWidth="2.6" />
        <L x={258} y={232} size={15} fill={AMBER}>φ</L>
      </g>
      <g className="am1m-emerge" style={m1d(2.0)}>
        <path d={m1Arc(T[0], T[1], 26, 0, psi)} fill="none" stroke={GREEN} strokeWidth="2.6" />
        <L x={248} y={356} size={15} fill={GREEN}>ψ</L>
      </g>
      <g className="am1m-emerge" style={m1d(2.6)}>
        <Block x={50} y={422} w={360} h={44} label="exterior angle:  ψ = θ + φ" mono size={15} stroke={GREEN} />
      </g>

      <Wire d={`M${cx} ${cy} L870 ${cy}`} stroke={MUTED} width={1.8} />
      <M1Draw pts={m1Polar(cx, cy, a, (t) => 1 + Math.cos(t), 0, 2 * Math.PI, 180)} stroke={BLUE} width={3} delay={3.0} />
      <Dot cx={cx} cy={cy} r={4.5} />
      <L x={600} y={270} size={13} anchor="start">O</L>
      <g className="am1m-emerge" style={m1d(4.0)}>
        <Wire d={`M${cx} ${cy} L${A[0].toFixed(1)} ${A[1].toFixed(1)}`} stroke={MUTED} width={1.5} dash="4 4" />
        <Wire d={`M${(A[0] - 60).toFixed(1)} ${A[1].toFixed(1)} L${(A[0] + 60).toFixed(1)} ${A[1].toFixed(1)}`} stroke={GREEN} width={3.4} />
        <Dot cx={A[0]} cy={A[1]} r={5} fill={GREEN} />
        <M x={687} y={64} size={12} fill={GREEN}>ψ = π: parallel to initial line</M>
      </g>
      <g className="am1m-emerge" style={m1d(4.8)}>
        <Wire d={`M${cx} ${cy} L${B[0].toFixed(1)} ${B[1].toFixed(1)}`} stroke={MUTED} width={1.5} dash="4 4" />
        <Wire d={`M${B[0].toFixed(1)} ${(B[1] - 44).toFixed(1)} L${B[0].toFixed(1)} ${(B[1] + 44).toFixed(1)}`} stroke={PURP} width={3.4} />
        <Dot cx={B[0]} cy={B[1]} r={5} fill={PURP} />
        <M x={548} y={178} size={12} fill={PURP} anchor="end">ψ = 3π/2</M>
        <M x={548} y={194} size={12} fill={PURP} anchor="end">perpendicular</M>
      </g>
      <M x={720} y={446} size={14} fill={BLUE}>r = a(1 + cos θ)</M>
      <M x={720} y={468} size={12} fill={MUTED}>φ = π/2 + θ/2,  ψ = π/2 + 3θ/2</M>
    </Scene>
  )
}

/* ── Unit 8 · two-curve-common-radius ── */
export function M1CommonRadiusScene() {
  const [ox, oy, s] = [250, 430, 150]
  const q = Math.PI / 4
  const P = m1P(ox, oy, s, Math.SQRT2, q)
  const ext = m1P(P[0], P[1], 1, 130, q)
  const b1 = m1P(P[0], P[1], 1, 110, (3 * Math.PI) / 4)
  const b2 = m1P(P[0], P[1], 1, 110, -Math.PI / 4)
  const wedge = `M${P[0].toFixed(1)} ${P[1].toFixed(1)} ${m1Arc(P[0], P[1], 80, Math.PI / 2, (3 * Math.PI) / 4).replace('M', 'L')} Z`
  return (
    <Scene caption="Both curves share the radius vector OP, so the angle between them is φ₁ − φ₂">
      <Wire d={`M${ox} ${oy} L540 ${oy}`} stroke={N} width={2.6} marker="url(#am1Arr)" />
      <L x={548} y={435} size={14} anchor="start">X</L>
      <M1Draw pts={m1Polar(ox, oy, s, (t) => Math.sin(t) + Math.cos(t), -Math.PI / 4, (3 * Math.PI) / 4, 160)} stroke={BLUE} width={3} delay={0.2} />
      <M1Draw pts={m1Polar(ox, oy, s, (t) => 2 * Math.sin(t), 0, Math.PI, 160)} stroke={AMBER} width={3} delay={0.8} />
      <Dot cx={ox} cy={oy} r={5} />
      <L x={238} y={450} size={14} anchor="end">O</L>
      <M x={130} y={140} size={12.5} fill={AMBER}>r = 2 sin θ</M>
      <M x={470} y={400} size={12.5} fill={BLUE} anchor="start">r = sin θ + cos θ</M>

      <g className="am1m-emerge" style={m1d(2.0)}>
        <Wire d={`M${ox} ${oy} L${ext[0].toFixed(1)} ${ext[1].toFixed(1)}`} stroke={N} width={2.6} />
      </g>
      <g className="am1m-emerge" style={m1d(1.6)}>
        <g className="am1m-cost-dot">
          <Dot cx={P[0]} cy={P[1]} r={6.5} fill={PURP} />
        </g>
        <M x={440} y={290} size={12.5} fill={PURP} anchor="start">P (√2, π/4)</M>
      </g>

      <g className="am1m-emerge" style={m1d(2.6)}>
        <Wire d={`M${b1[0].toFixed(1)} ${b1[1].toFixed(1)} L${b2[0].toFixed(1)} ${b2[1].toFixed(1)}`} stroke={BLUE} width={2.4} dash="8 5" />
        <path d={m1Sq(P, m1P(P[0], P[1], 1, 20, (5 * Math.PI) / 4), b2, 14)} fill="none" stroke={BLUE} strokeWidth="2" />
        <M x={378} y={296} size={12.5} fill={BLUE} anchor="end">φ₁ = 90°</M>
      </g>
      <g className="am1m-emerge" style={m1d(3.2)}>
        <Wire d={`M${P[0]} 150 L${P[0]} 410`} stroke={AMBER} width={2.4} dash="8 5" />
        <path d={m1Arc(P[0], P[1], 50, q, Math.PI / 2)} fill="none" stroke={AMBER} strokeWidth="2.4" />
        <M x={445} y={196} size={12.5} fill={AMBER}>φ₂ = 45°</M>
      </g>
      <g className="am1m-emerge" style={m1d(3.8)}>
        <path d={wedge} fill={PURP} opacity="0.22" />
        <Wire d={`M362 126 L390 214`} stroke={PURP} width={1.4} />
        <M x={360} y={118} size={13} fill={PURP}>φ₁ − φ₂ = 45°</M>
      </g>

      <Card x={560} y={40} w={310} h={200} title="angle of intersection" accent={PURP} mono className="am1m-cell-in"
        lines={['meet: sin θ = cos θ ⇒ θ = π/4', 'tan φ₁ = r dθ/dr → ∞ at π/4', 'φ₁ = 90°', 'tan φ₂ = tan θ ⇒ φ₂ = 45°', 'angle = φ₁ − φ₂ = 45°']}
        linesY={58} lineH={27} />
    </Scene>
  )
}

/* ── Unit 9 · orthogonal-cardioid-pair ── */
export function M1OrthoCardioidScene() {
  const [ox, oy, s] = [400, 250, 55]
  const q = Math.PI / 3
  const P = m1P(ox, oy, s, 1.5, q)
  const P2 = m1P(ox, oy, s, 1.5, -q)
  const card = [
    ['tan φ₁ = −√3', BLUE, 4.0],
    ['tan φ₂ = 1/√3', AMBER, 4.4],
    ['product = −1', GREEN, 4.8],
  ]
  return (
    <Scene caption="tan φ₁ · tan φ₂ = −1 at the meeting point: the cardioids cut at right angles">
      <Wire d={`M60 ${oy} L550 ${oy}`} stroke={MUTED} width={1.4} opacity={0.7} />
      <M1Draw pts={m1Polar(ox, oy, s, (t) => 1 + Math.cos(t), 0, 2 * Math.PI, 180)} stroke={BLUE} width={3} delay={0} />
      <M1Draw pts={m1Polar(ox, oy, s, (t) => 3 * (1 - Math.cos(t)), 0, 2 * Math.PI, 220)} stroke={AMBER} width={3} delay={0.8} />
      <Dot cx={ox} cy={oy} r={4.5} />
      <L x={392} y={272} size={14} anchor="end">O</L>
      <M x={470} y={110} size={12.5} fill={BLUE} anchor="start">r = 1 + cos θ</M>
      <M x={230} y={215} size={12.5} fill={AMBER}>r = 3(1 − cos θ)</M>

      <g className="am1m-emerge" style={m1d(1.8)}>
        <g className="am1m-cost-dot"><Dot cx={P[0]} cy={P[1]} r={6.5} fill={PURP} /></g>
        <g className="am1m-cost-dot"><Dot cx={P2[0]} cy={P2[1]} r={6.5} fill={PURP} /></g>
        <L x={464} y={158} size={14} fill={PURP} anchor="start">P (1.5, π/3)</L>
        <L x={464} y={352} size={14} fill={PURP} anchor="start">P′ (1.5, −π/3)</L>
      </g>
      <g className="am1m-emerge" style={m1d(2.4)}>
        <Wire d={`M${ox} ${oy} L${P[0].toFixed(1)} ${P[1].toFixed(1)}`} stroke={N} width={2.4} />
      </g>
      <g className="am1m-emerge" style={m1d(3.0)}>
        <Wire d={`M${(P[0] - 75).toFixed(1)} ${P[1].toFixed(1)} L${(P[0] + 75).toFixed(1)} ${P[1].toFixed(1)}`} stroke={BLUE} width={2.4} dash="8 5" />
        <Wire d={`M${P[0].toFixed(1)} ${(P[1] - 62).toFixed(1)} L${P[0].toFixed(1)} ${(P[1] + 62).toFixed(1)}`} stroke={AMBER} width={2.4} dash="8 5" />
      </g>
      <g className="am1m-emerge" style={m1d(3.6)}>
        <path d={m1Sq(P, [P[0] + 30, P[1]], [P[0], P[1] - 30], 14)} fill={GREEN} fillOpacity="0.18" stroke={GREEN} strokeWidth="2.4" />
      </g>

      <Card x={590} y={60} w={280} h={170} title="orthogonality test" accent={GREEN} />
      {card.map(([t, tone, at], i) => (
        <g key={t} className="am1m-slide-in" style={m1d(at)}>
          <M x={730} y={122 + 34 * i} size={15} fill={tone} weight={800}>{t}</M>
        </g>
      ))}
      <g className="am1m-emerge" style={m1d(5.2)}>
        <Card x={590} y={270} w={280} h={130} title="first show they meet" accent={PURP} mono
          lines={['1 + cos θ = 3 − 3 cos θ', 'cos θ = 1/2', 'θ = ±π/3,  r = 1.5']} linesY={56} lineH={22} />
      </g>
    </Scene>
  )
}

/* ── Unit 10 · pedal-perpendicular-triangle ── */
export function M1PedalTriangleScene() {
  const O = [110, 300]
  const P = [500, 210]
  const rA = Math.atan2(O[1] - P[1], P[0] - O[0])
  const tA = rA + (65 * Math.PI) / 180
  const t = [Math.cos(tA), -Math.sin(tA)]
  const k = (O[0] - P[0]) * t[0] + (O[1] - P[1]) * t[1]
  const T = [P[0] + k * t[0], P[1] + k * t[1]]
  const up = [P[0] + 160 * t[0], P[1] + 160 * t[1]]
  const dn = [T[0] - 60 * t[0], T[1] - 60 * t[1]]
  const C = [P[0] + 260 * Math.sin(tA), P[1] + 260 * Math.cos(tA)]
  const cA = Math.atan2(C[1] - P[1], P[0] - C[0])
  const ext = m1P(P[0], P[1], 1, 70, rA)
  const stack = [
    ['p = r sin φ', BLUE, 3.4],
    ['1/p² = (1/r²) cosec²φ', PURP, 4.0],
    ['= 1/r² + (1/r⁴)(dr/dθ)²', GREEN, 4.6],
  ]
  return (
    <Scene caption="Drop the perpendicular p from the pole to the tangent: p = r sin φ">
      <M1Draw d={m1Arc(C[0], C[1], 260, cA - 0.5, cA + 0.62)} stroke={BLUE} width={3.2} delay={0} />
      <Dot cx={O[0]} cy={O[1]} r={5} />
      <L x={100} y={318} size={14} anchor="end">O</L>
      <Dot cx={P[0]} cy={P[1]} r={5.5} fill={BLUE} />
      <L x={486} y={204} size={14} fill={BLUE} anchor="end">P</L>

      <g className="am1m-emerge" style={m1d(0.8)}>
        <Wire d={`M${O[0]} ${O[1]} L${P[0]} ${P[1]}`} stroke={N} width={2.6} />
        <L x={300} y={238} size={16} fill={N}>r</L>
      </g>
      <g className="am1m-emerge" style={m1d(1.4)}>
        <Wire d={`M${dn[0].toFixed(1)} ${dn[1].toFixed(1)} L${up[0].toFixed(1)} ${up[1].toFixed(1)}`} stroke={GREEN} width={2.6} />
        <M x={up[0] - 8} y={up[1] + 12} size={12} fill={GREEN} anchor="end">tangent at P</M>
      </g>
      <g className="am1m-emerge" style={m1d(2.0)}>
        <Wire d={`M${P[0]} ${P[1]} L${ext[0].toFixed(1)} ${ext[1].toFixed(1)}`} stroke={N} width={1.8} dash="5 4" />
        <path d={m1Arc(P[0], P[1], 34, rA, tA)} fill="none" stroke={AMBER} strokeWidth="2.6" />
        <L x={541} y={176} size={15} fill={AMBER}>φ</L>
      </g>
      <g className="am1m-emerge" style={m1d(2.6)}>
        <Wire d={`M${O[0]} ${O[1]} L${T[0].toFixed(1)} ${T[1].toFixed(1)}`} stroke={ROSE} width={3} />
        <path d={m1Sq(T, O, P, 12)} fill="none" stroke={ROSE} strokeWidth="2" />
        <Dot cx={T[0]} cy={T[1]} r={4.5} fill={ROSE} />
        <L x={T[0] + 10} y={T[1] + 20} size={14} fill={ROSE} anchor="start">T</L>
        <L x={290} y={362} size={16} fill={ROSE}>p</L>
      </g>

      {stack.map(([text, tone, at], i) => (
        <g key={text} className="am1m-slide-in" style={m1d(at)}>
          <Block x={600} y={70 + 80 * i} w={280} h={54} label={text} mono size={15} stroke={tone} labelFill={tone} />
        </g>
      ))}
      <g className="am1m-emerge" style={m1d(5.2)}>
        <M x={740} y={344} size={12.5} fill={MUTED}>with u = 1/r:</M>
        <M x={740} y={366} size={13} fill={N}>1/p² = u² + (du/dθ)²</M>
        <L x={740} y={410} size={12.5} fill={PURP} weight={700}>θ gone: a p–r relation only</L>
      </g>
    </Scene>
  )
}

/* ── Unit 11 · theta-elimination-funnel ── */
export function M1ThetaFunnelScene() {
  const [ox, oy, a] = [660, 300, 85]
  const P = m1P(ox, oy, a, 1, Math.PI / 2)
  const t = [Math.SQRT1_2, -Math.SQRT1_2]
  const k = (ox - P[0]) * t[0] + (oy - P[1]) * t[1]
  const Nf = [P[0] + k * t[0], P[1] + k * t[1]]
  return (
    <Scene caption="Aim the curve and sin φ at the same quantity, cos(θ/2); then θ drops out">
      <path d="M40 132 L570 132 L340 262 L270 262 Z" fill={SKY} stroke={MUTED} strokeWidth="1.6" />
      <path d="M270 262 L270 300 M340 262 L340 300" stroke={MUTED} strokeWidth="1.6" />
      <M x={350} y={290} size={12} fill={AMBER} anchor="start">eliminate cos(θ/2)</M>

      <g className="am1m-cell-in" style={m1d(0.2)}>
        <rect x="40" y="40" width="250" height="78" rx="10" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <M x={165} y={72} size={13.5}>
          curve: r = 2a <tspan fill={AMBER}>cos²(θ/2)</tspan>
        </M>
        <L x={165} y={98} size={11} fill={MUTED} weight={700}>cardioid r = a(1 + cos θ)</L>
      </g>
      <g className="am1m-cell-in" style={m1d(0.6)}>
        <rect x="320" y="40" width="250" height="78" rx="10" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
        <M x={445} y={72} size={13.5}>
          p = r sin φ = r <tspan fill={AMBER}>cos(θ/2)</tspan>
        </M>
        <L x={445} y={98} size={11} fill={MUTED} weight={700}>since φ = π/2 + θ/2</L>
      </g>

      <g className="am1m-emerge" style={m1d(1.2)}>
        <g className="am1m-merge-l">
          <rect x="145" y="162" width="84" height="28" rx="8" fill={AMBER} fillOpacity="0.16" stroke={AMBER} strokeWidth="2" />
          <M x={187} y={181} size={12} fill={AMBER}>r/2a</M>
        </g>
        <g className="am1m-merge-r">
          <rect x="381" y="162" width="84" height="28" rx="8" fill={AMBER} fillOpacity="0.16" stroke={AMBER} strokeWidth="2" />
          <M x={423} y={181} size={12} fill={AMBER}>(p/r)²</M>
        </g>
        <M x={305} y={152} size={11.5} fill={N}>cos²(θ/2) = r/2a = p²/r²</M>
      </g>

      <g className="am1m-emerge" style={m1d(2.6)}>
        <Wire d="M305 262 L305 316" stroke={GREEN} width={2.4} marker="url(#am1ArrG)" />
        <Block x={185} y={322} w={240} h={60} label="2a p² = r³" mono size={21} stroke={GREEN} labelFill={GREEN} />
        <M x={305} y={416} size={12} fill={MUTED}>pedal equation of the cardioid</M>
        <M x={305} y={440} size={11.5} fill={MUTED}>same route: p² = ar,  p aⁿ = rⁿ⁺¹</M>
      </g>

      <Wire d={`M600 ${oy} L870 ${oy}`} stroke={MUTED} width={1.4} />
      <M1Draw pts={m1Polar(ox, oy, a, (x) => 1 + Math.cos(x), 0, 2 * Math.PI, 180)} stroke={BLUE} width={2.8} delay={3.2} />
      <Dot cx={ox} cy={oy} r={4} />
      <L x={ox + 8} y={oy + 18} size={13} anchor="start">O</L>
      <g className="am1m-emerge" style={m1d(4.2)}>
        <Wire d={`M${(P[0] - 90 * t[0]).toFixed(1)} ${(P[1] - 90 * t[1]).toFixed(1)} L${(P[0] + 90 * t[0]).toFixed(1)} ${(P[1] + 90 * t[1]).toFixed(1)}`} stroke={GREEN} width={2.2} dash="7 4" />
        <Wire d={`M${ox} ${oy} L${P[0].toFixed(1)} ${P[1].toFixed(1)}`} stroke={N} width={1.8} />
        <Wire d={`M${ox} ${oy} L${Nf[0].toFixed(1)} ${Nf[1].toFixed(1)}`} stroke={ROSE} width={2.8} />
        <path d={m1Sq(Nf, [ox, oy], P, 9)} fill="none" stroke={ROSE} strokeWidth="1.8" />
        <Dot cx={P[0]} cy={P[1]} r={4.5} fill={BLUE} />
        <L x={648} y={208} size={13} fill={BLUE} anchor="end">P</L>
        <L x={645} y={274} size={14} fill={ROSE}>p</L>
        <M x={740} y={446} size={11.5} fill={MUTED}>P at θ = π/2: p = r cos 45°</M>
      </g>
    </Scene>
  )
}

/* ── Unit 12 · ellipse-tangent-perpendicular ── */
export function M1EllipsePedalScene() {
  const [ox, oy, s] = [260, 290, 70]
  const c = (x, y) => [ox + s * n(x), oy - s * n(y)]
  const P = c(3 * Math.SQRT1_2, 2 * Math.SQRT1_2)
  const [l, m] = [Math.SQRT1_2 / 3, Math.SQRT1_2 / 2]
  const q = l * l + m * m
  const Nf = c(l / q, m / q)
  const dl = Math.hypot(m, l)
  const d = [m / dl, l / dl]
  const A = [Nf[0] - 170 * d[0], Nf[1] - 170 * d[1]]
  const B = [P[0] + 110 * d[0], P[1] + 110 * d[1]]
  const angOP = (Math.atan2(P[1] - oy, P[0] - ox) * 180) / Math.PI
  const angON = (Math.atan2(Nf[1] - oy, Nf[0] - ox) * 180) / Math.PI
  const at = (Q, k) => [ox + k * (Q[0] - ox), oy + k * (Q[1] - oy)]
  const rm = at(P, 0.6)
  const pm = at(Nf, 0.55)
  const eqs = [
    ['x²/9 + y²/4 = 1', BLUE, 2.6],
    ['r² = x² + y²', N, 3.0],
    ['1/p² = x²/81 + y²/16', ROSE, 3.4],
  ]
  return (
    <Scene caption="For a Cartesian curve, p is the distance from O to the tangent line: eliminate x and y">
      <Wire d={`M40 ${oy} L490 ${oy}`} stroke={MUTED} width={2} marker="url(#am1ArrM)" />
      <Wire d={`M${ox} 450 L${ox} 40`} stroke={MUTED} width={2} marker="url(#am1ArrM)" />
      <L x={248} y={308} size={14} anchor="end">O</L>
      <M1Draw d={`M${ox - 210} ${oy} A210 140 0 1 1 ${ox + 210} ${oy} A210 140 0 1 1 ${ox - 210} ${oy}`} stroke={BLUE} width={3} delay={0} />
      <Dot cx={P[0]} cy={P[1]} r={5.5} fill={BLUE} />
      <M x={418} y={180} size={12} fill={BLUE} anchor="start">P (2.12, 1.41)</M>

      <g className="am1m-emerge" style={m1d(0.8)}>
        <Wire d={`M${A[0].toFixed(1)} ${A[1].toFixed(1)} L${B[0].toFixed(1)} ${B[1].toFixed(1)}`} stroke={GREEN} width={2.6} />
        <M x={A[0] - 8} y={A[1] - 2} size={12} fill={GREEN} anchor="end">0.2357X + 0.3536Y = 1</M>
      </g>
      <g className="am1m-emerge" style={m1d(1.4)}>
        <Wire d={`M${ox} ${oy} L${P[0].toFixed(1)} ${P[1].toFixed(1)}`} stroke={N} width={2.6} />
        <g transform={`translate(${rm[0].toFixed(1)},${rm[1].toFixed(1)}) rotate(${angOP.toFixed(1)})`}>
          <M x={0} y={18} size={12} fill={N}>r = √6.5 = 2.550</M>
        </g>
      </g>
      <g className="am1m-emerge" style={m1d(2.0)}>
        <Wire d={`M${ox} ${oy} L${Nf[0].toFixed(1)} ${Nf[1].toFixed(1)}`} stroke={ROSE} width={3} />
        <path d={m1Sq(Nf, [ox, oy], P, 10)} fill="none" stroke={ROSE} strokeWidth="2" />
        <Dot cx={Nf[0]} cy={Nf[1]} r={4.5} fill={ROSE} />
        <L x={Nf[0] + 8} y={Nf[1] - 12} size={14} fill={ROSE} anchor="start">N</L>
        <g transform={`translate(${pm[0].toFixed(1)},${pm[1].toFixed(1)}) rotate(${angON.toFixed(1)})`}>
          <M x={0} y={-8} size={12} fill={ROSE}>p = 2.353</M>
        </g>
      </g>

      {eqs.map(([text, tone, t0], i) => (
        <g key={text} className="am1m-slide-in" style={m1d(t0)}>
          <Block x={560} y={50 + 58 * i} w={300} h={46} label={text} mono size={14} stroke={tone} labelFill={tone} />
        </g>
      ))}
      <g className="am1m-emerge" style={m1d(3.9)}>
        <Wire d="M710 222 L710 262" stroke={GREEN} width={2.4} marker="url(#am1ArrG)" />
        <M x={724} y={248} size={11.5} fill={MUTED} anchor="start">eliminate x, y</M>
        <Block x={560} y={268} w={300} h={56} label="36/p² = 13 − r²" mono size={19} stroke={GREEN} labelFill={GREEN} />
        <M x={710} y={360} size={12.5} fill={N}>a²b²/p² = a² + b² − r²</M>
        <M x={710} y={386} size={11.5} fill={MUTED}>check: 36/2.353² = 6.50 = 13 − 6.5</M>
      </g>
    </Scene>
  )
}

/* ── Unit 13 · taylor-cancellation-zoom ── */
export function M1TaylorCancelScene() {
  const g = (x) => (x * Math.exp(x) - Math.log(1 + x)) / (x * x)
  const px = (x) => 320 + 440 * x
  const py = (v) => 450 - (v - 1.3) * 400
  const left = []
  const right = []
  for (let i = 0; i <= 60; i += 1) {
    const x = -0.5 + (0.49 * i) / 60
    left.push([px(x), py(g(x))])
    const xr = 0.01 + (0.49 * i) / 60
    right.push([px(xr), py(g(xr))])
  }
  return (
    <Scene caption="Expand top and bottom about 0: the common x² cancels and the limit is 3/2">
      <g className="am1m-cell-in" style={m1d(0.2)}>
        <M x={300} y={62} size={16}>x eˣ − log(1 + x)</M>
        <path d="M200 74 L400 74" stroke={N} strokeWidth="2" />
        <M x={300} y={100} size={16}>x²</M>
        <rect x="425" y="70" width="120" height="28" rx="7" fill={RED} fillOpacity="0.12" stroke={RED} strokeWidth="2" />
        <M x={485} y={89} size={13} fill={RED} weight={800}>0/0 at x = 0</M>
      </g>

      <g className="am1m-slide-in" style={m1d(1.0)}>
        <M x={40} y={150} size={13} anchor="start" fill={BLUE}>x eˣ      = x + x² + x³/2 + …</M>
      </g>
      <g className="am1m-slide-in" style={m1d(1.5)}>
        <M x={40} y={174} size={13} anchor="start" fill={PURP}>log(1 + x) = x − x²/2 + x³/3 − …</M>
      </g>
      <g className="am1m-emerge" style={m1d(2.0)}>
        <M x={290} y={214} size={14} anchor="end">0 + 0·x + (3/2)</M>
        <M x={306} y={214} size={14}>x²</M>
        <M x={322} y={214} size={14} anchor="start">+ (1/6)x³ + …</M>
        <path d="M150 226 L450 226" stroke={N} strokeWidth="2" />
        <M x={306} y={250} size={14}>x²</M>
      </g>
      <g className="am1m-emerge" style={m1d(2.8)}>
        <path d="M295 216 L317 200 M295 252 L317 236" stroke={ROSE} strokeWidth="2.6" strokeLinecap="round" />
      </g>
      <g className="am1m-emerge" style={m1d(3.2)}>
        <M x={480} y={232} size={12} anchor="start" fill={GREEN}>→ 3/2 + x/6 + … → 3/2</M>
      </g>

      <Axes x={90} y={450} w={460} h={160} origin="center" yLabel="f(x)/φ(x)" tickLabels={[[100, '−0.5'], [540, '0.5']]} />
      <L x={556} y={455} size={13} fill={MUTED} anchor="start">x</L>
      <Wire d={`M90 ${py(1.5)} L550 ${py(1.5)}`} stroke={GREEN} width={1.8} dash="7 5" />
      <M x={555} y={py(1.5) + 4} size={12} fill={GREEN} anchor="start">limit = 3/2</M>
      <M1Draw pts={left} stroke={BLUE} width={3} delay={3.6} />
      <M1Draw pts={right} stroke={BLUE} width={3} delay={3.6} />
      <Dot cx={px(0)} cy={py(1.5)} r={5.5} fill={CREAM} stroke={BLUE} />

      <g className="am1m-slide-in" style={m1d(4.4)}>
        <rect x="650" y="40" width="230" height="112" rx="10" fill={WHITE} stroke={RED} strokeWidth="2.2" />
        <L x={765} y={64} size={13} fill={N}>differentiate once</L>
        <M x={765} y={92} size={10.5} fill={N}>(eˣ + x eˣ − 1/(1+x)) / 2x</M>
        <M x={765} y={128} size={13} fill={RED} weight={800}>→ 0/0 still</M>
      </g>
      <g className="am1m-slide-in" style={m1d(5.0)}>
        <rect x="650" y="172" width="230" height="112" rx="10" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
        <L x={765} y={196} size={13} fill={N}>differentiate twice</L>
        <M x={765} y={224} size={10.5} fill={N}>(2eˣ + x eˣ + 1/(1+x)²) / 2</M>
        <M x={765} y={260} size={13} fill={GREEN} weight={800}>→ (2 + 1)/2 = 3/2</M>
      </g>
      <g className="am1m-emerge" style={m1d(5.4)}>
        <L x={765} y={318} size={11.5} fill={MUTED} weight={700}>two separate derivatives,</L>
        <L x={765} y={336} size={11.5} fill={MUTED} weight={700}>never the quotient rule</L>
      </g>
    </Scene>
  )
}

/* ── Unit 14 · growth-race-ladder ── */
export function M1GrowthLadderScene() {
  const px = (x) => 330 + ((x - 1) / 9) * 500
  const py = (v) => 300 - ((Math.log10(v) + 1) / 5.4) * 240
  const trace = (f, x0) => {
    const pts = []
    for (let i = 0; i <= 90; i += 1) {
      const x = x0 + ((10 - x0) * i) / 90
      pts.push([px(x), py(f(x))])
    }
    return pts
  }
  const cross = [px(4.536), py(Math.pow(4.536, 3))]
  const rungs = [
    ['log x', GREEN, 360],
    ['xⁿ', BLUE, 240],
    ['eˣ', RED, 120],
  ]
  const boxes = ['x³/eˣ', '3x²/eˣ', '6x/eˣ', '6/eˣ']
  return (
    <Scene caption="Exponentials beat powers, powers beat logarithms; L'Hospital's rule is the proof">
      <L x={140} y={84} size={14} fill={MUTED}>as x → ∞</L>
      <path d="M60 104 L60 420 M220 104 L220 420" stroke={MUTED} strokeWidth="3" strokeLinecap="round" />
      {rungs.map(([t, tone, y], i) => (
        <g key={t} className="am1m-cell-in" style={m1d(0.2 + 0.5 * i)}>
          <Block x={70} y={y} w={140} h={44} label={t} mono size={17} stroke={tone} labelFill={tone} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={i} className="am1m-emerge" style={m1d(0.5 + 0.5 * i)}>
          <Wire d={`M140 ${356 - 120 * i} L140 ${290 - 120 * i}`} stroke={MUTED} width={2.2} marker="url(#am1ArrM)" />
          <M x={156} y={328 - 120 * i} size={16} fill={N} anchor="start">≪</M>
        </g>
      ))}

      <Axes x={330} y={300} w={520} h={250} yLabel="log scale" tickLabels={[[330, '1'], [px(5), '5'], [px(10), '10']]}
        yTicks={[[py(1), '1'], [py(100), '10²'], [py(10000), '10⁴']]} />
      <M1Draw pts={trace((x) => Math.exp(x), 1)} stroke={RED} width={3} delay={1.6} />
      <M1Draw pts={trace((x) => x * x * x, 1)} stroke={BLUE} width={3} delay={1.6} />
      <M1Draw pts={trace((x) => Math.log(x), 1.106)} stroke={GREEN} width={3} delay={1.6} />
      <M x={px(10) + 6} y={py(Math.exp(10)) + 4} size={13} fill={RED} anchor="start">eˣ</M>
      <M x={px(10) + 6} y={py(1000) + 4} size={13} fill={BLUE} anchor="start">x³</M>
      <M x={px(10) + 6} y={py(Math.log(10)) + 4} size={13} fill={GREEN} anchor="start">log x</M>
      <g className="am1m-emerge" style={m1d(2.8)}>
        <Dot cx={cross[0]} cy={cross[1]} r={5.5} fill={RED} />
        <Wire d={`M${cross[0] + 5} ${cross[1] + 5} L556 192`} stroke={MUTED} width={1.2} />
        <M x={560} y={200} size={12} fill={RED} anchor="start">eˣ overtakes x³ near x = 4.5</M>
      </g>

      <L x={580} y={345} size={12} fill={MUTED} weight={700}>∞/∞ three times: each step lowers the power, eˣ never changes</L>
      {boxes.map((t, i) => (
        <g key={t} className="am1m-slide-in" style={m1d(3.2 + 0.6 * i)}>
          <Block x={300 + 120 * i} y={360} w={96} h={46} label={t} mono size={14} stroke={i === 3 ? GREEN : BLUE} />
          <Wire d={`M${398 + 120 * i} 383 L${416 + 120 * i} 383`} stroke={MUTED} width={2} marker="url(#am1ArrM)" />
        </g>
      ))}
      <g className="am1m-emerge" style={m1d(5.8)}>
        <L x={800} y={392} size={26} fill={GREEN}>0</L>
      </g>
      <M x={580} y={446} size={12} fill={MUTED}>(log x)/x → (1/x)/1 → 0 after one step</M>
    </Scene>
  )
}

/* ── Unit 15 · difference-to-quotient-merge ── */
export function M1DiffToQuotientScene() {
  const bar = (cx, label, at) => (
    <g>
      <g transform={`translate(${n(cx)},215) rotate(-90)`}>
        <g className="am1m-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center', ...m1d(at) }}>
          <rect x="0" y="-30" width="165" height="60" rx="6" fill={RED} fillOpacity="0.8" />
        </g>
      </g>
      <Wire d={`M${n(cx)} 46 L${n(cx)} 26`} stroke={RED} width={2.4} marker="url(#am1ArrR)" />
      <M x={n(cx) + 14} y={40} size={13} fill={RED} anchor="start">∞</M>
      <M x={n(cx)} y={234} size={13} fill={N}>{label}</M>
    </g>
  )
  const steps = [
    ['(x − sin x) / (x sin x)', '0/0', AMBER, 290, 2.0],
    ['(1 − cos x)/(sin x + x cos x)', '0/0', AMBER, 362, 2.8],
    ['sin x / (2 cos x − x sin x)', '0/2 = 0', GREEN, 428, 3.6],
  ]
  return (
    <Scene caption="Combine ∞ − ∞ into one fraction first; what survives the cancellation decides the limit">
      <path d="M50 215 L330 215" stroke={MUTED} strokeWidth="2" />
      {bar(110, '1/sin x', 0.2)}
      {bar(270, '1/x', 0.2)}
      <g className="am1m-emerge" style={m1d(1.0)}>
        <L x={190} y={140} size={30} fill={N}>−</L>
        <rect x="360" y="110" width="110" height="40" rx="8" fill={RED} fillOpacity="0.12" stroke={RED} strokeWidth="2" />
        <M x={415} y={136} size={16} fill={RED} weight={800}>∞ − ∞</M>
      </g>
      <g className="am1m-emerge" style={m1d(1.6)}>
        <Wire d="M190 242 L190 284" stroke={N} width={2.4} marker="url(#am1Arr)" className="am1m-flow-arrow" />
        <M x={205} y={266} size={12} fill={N} anchor="start">common denominator</M>
      </g>
      {steps.map(([text, tag, tone, y, at], i) => (
        <g key={text} className="am1m-slide-in" style={m1d(at)}>
          <Block x={60} y={y} w={300} h={i ? 44 : 50} label={text} mono size={14} stroke={i === 2 ? GREEN : BLUE} />
          <rect x="372" y={y + 6} width={tag.length > 3 ? 84 : 56} height="32" rx="7" fill={tone} fillOpacity="0.14" stroke={tone} strokeWidth="2" />
          <M x={372 + (tag.length > 3 ? 42 : 28)} y={y + 27} size={13} fill={tone} weight={800}>{tag}</M>
          {i ? (
            <g>
              <Wire d={`M210 ${y - 20} L210 ${y - 3}`} stroke={MUTED} width={2} marker="url(#am1ArrM)" />
              <M x={222} y={y - 7} size={11} fill={PURP} anchor="start">L'H</M>
            </g>
          ) : null}
        </g>
      ))}

      <g className="am1m-emerge" style={m1d(4.4)}>
        <Panel x={560} y={290} w={300} title="1/sin x − 1/x" accent={TEAL} rows={[['x = 0.1', '0.01669'], ['x = 0.01', '0.00167'], ['x → 0', '0']]} />
      </g>
      <g className="am1m-emerge" style={m1d(5.0)}>
        <Card x={560} y={40} w={300} h={140} title="what survives" accent={PURP} mono
          lines={['1/sin x = 1/x + x/6 + …', 'difference = x/6 + … → 0', '0 · ∞:  f·φ = f / (1/φ)']} linesY={58} lineH={26} />
      </g>
    </Scene>
  )
}

/* ── Unit 16 · log-exponent-unwrap ── */
export function M1LogUnwrapScene() {
  const y = (x) => Math.pow((Math.pow(2, x) + Math.pow(3, x) + Math.pow(4, x)) / 3, 1 / x)
  const px = (x) => 120 + 600 * x
  const py = (v) => 440 - ((v - 2.85) / 0.17) * 150
  const pts = []
  for (let i = 0; i <= 80; i += 1) {
    const x = 0.02 + (0.98 * i) / 80
    pts.push([px(x), py(y(x))])
  }
  const L0 = py(2.8845)
  return (
    <Scene caption="Take logs to turn the power into a quotient, solve that, then exponentiate back">
      <g className="am1m-cell-in" style={m1d(0.2)}>
        <rect x="20" y="56" width="240" height="120" rx="10" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <M x={140} y={100} size={12.5}>y = ((2ˣ + 3ˣ + 4ˣ)/3)^(1/x)</M>
        <rect x="104" y="122" width="72" height="28" rx="7" fill={RED} fillOpacity="0.12" stroke={RED} strokeWidth="2" />
        <M x={140} y={141} size={14} fill={RED} weight={800}>1^∞</M>
      </g>
      <g className="am1m-emerge" style={m1d(1.0)}>
        <Wire d="M264 116 L326 116" stroke={BLUE} width={2.6} marker="url(#am1ArrB)" className="am1m-flow-arrow" />
        <M x={295} y={44} size={12} fill={BLUE}>take log</M>
      </g>
      <g className="am1m-cell-in" style={m1d(1.4)}>
        <rect x="330" y="56" width="260" height="120" rx="10" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
        <M x={460} y={100} size={12}>log y = log((2ˣ+3ˣ+4ˣ)/3) / x</M>
        <rect x="424" y="122" width="72" height="28" rx="7" fill={AMBER} fillOpacity="0.14" stroke={AMBER} strokeWidth="2" />
        <M x={460} y={141} size={14} fill={AMBER} weight={800}>0/0</M>
      </g>
      <g className="am1m-emerge" style={m1d(2.2)}>
        <path d="M460 176 L460 196" stroke={PURP} strokeWidth="2" />
        <rect x="330" y="196" width="260" height="70" rx="10" fill={SKY} stroke={PURP} strokeWidth="2" />
        <L x={460} y={214} size={11} fill={MUTED} weight={700}>L'Hospital as x → 0</L>
        <M x={460} y={236} size={12}>(ln 2 + ln 3 + ln 4)/3</M>
        <M x={460} y={256} size={12} fill={PURP} weight={800}>= 1.0594</M>
      </g>
      <g className="am1m-emerge" style={m1d(3.0)}>
        <Wire d="M594 116 L656 116" stroke={GREEN} width={2.6} marker="url(#am1ArrG)" className="am1m-flow-arrow" />
        <M x={625} y={44} size={12} fill={GREEN}>exponentiate</M>
      </g>
      <g className="am1m-cell-in" style={m1d(3.4)}>
        <rect x="660" y="56" width="220" height="120" rx="10" fill={WHITE} stroke={GREEN} strokeWidth="2.5" />
        <M x={770} y={90} size={14} fill={GREEN}>y = e^1.0594</M>
        <M x={770} y={116} size={14} fill={GREEN}>= 2.8845</M>
        <M x={770} y={142} size={14} fill={GREEN} weight={800}>= 24^(1/3)</M>
      </g>

      <Axes x={120} y={450} w={620} h={170} yLabel="y" tickLabels={[[120, '0'], [420, '0.5'], [720, '1']]} />
      <Wire d={`M120 ${L0} L740 ${L0}`} stroke={GREEN} width={1.8} dash="7 5" />
      <M x={750} y={L0 + 4} size={12} fill={GREEN} anchor="start">y → 2.8845</M>
      <M1Draw pts={pts} stroke={BLUE} width={3} delay={4.0} />
      <Dot cx={px(0)} cy={L0} r={5.5} fill={CREAM} stroke={GREEN} />
      <M x={px(1) + 6} y={py(3) - 8} size={11.5} fill={BLUE} anchor="start">y(1) = 3</M>
    </Scene>
  )
}

/* ── Module 2 ────────────────────────────────────────────────────────── */

export function M2SurfaceSliceSlopesScene() {
  return (
    <Scene caption="Partial derivatives as slopes of slice curves">
      <path d="M150 250 Q250 150 450 180 T650 300 Q550 400 350 370 T150 250" fill={SKY} opacity="0.4" stroke={BLUE} strokeWidth="2" />
      
      {/* y=b plane (red) */}
      <path d="M300 100 L500 200 L500 450 L300 350 Z" fill={ROSE} opacity="0.15" />
      <path d="M300 350 L500 450" stroke={ROSE} strokeWidth="1" strokeDasharray="4 4" />
      <Wire d="M330 250 Q400 280 470 240" stroke={ROSE} width="3" />
      <Wire d="M350 230 L450 290" stroke={ROSE} width="2" marker="url(#am1ArrRo)" />
      <L x="460" y="310" fill={ROSE} size="15">slope = f_x</L>

      {/* x=a plane (blue) */}
      <path d="M500 100 L300 200 L300 450 L500 350 Z" fill={BLUE} opacity="0.1" />
      <path d="M500 350 L300 450" stroke={BLUE} strokeWidth="1" strokeDasharray="4 4" />
      <Wire d="M330 240 Q400 280 470 250" stroke={BLUE} width="3" />
      <Wire d="M350 290 L450 230" stroke={BLUE} width="2" marker="url(#am1ArrB)" />
      <L x="460" y="215" fill={BLUE} size="15">slope = f_y</L>

      <Dot cx="400" cy="265" r="5" fill={N} />
      <L x="400" y="250" size="16">P</L>

      <rect x="620" y="135" width="250" height="85" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="2" />
      <M x="640" y="163" size="12" anchor="start">f_x = lim [f(x+h,y) − f(x,y)]</M>
      <M x="640" y="185" size="12" anchor="start">/ h,  as h → 0</M>
    </Scene>
  )
}

export function M2DerivativeBranchingTreeScene() {
  return (
    <Scene caption="Second-order partial derivatives and equality of mixed partials">
      <rect x="100" y="220" width="100" height="40" rx="6" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="150" y="245" size="16">z = f(x, y)</M>

      <Wire d="M200 240 L300 160" marker="url(#am1Arr)" />
      <Wire d="M200 240 L300 320" marker="url(#am1Arr)" />

      <rect x="300" y="140" width="80" height="40" rx="6" fill={CREAM} stroke={MUTED} strokeWidth="2" />
      <M x="340" y="165" size="16">z_x</M>

      <rect x="300" y="300" width="80" height="40" rx="6" fill={CREAM} stroke={MUTED} strokeWidth="2" />
      <M x="340" y="325" size="16">z_y</M>

      <Wire d="M380 160 L500 100" marker="url(#am1Arr)" />
      <Wire d="M380 160 L500 180" marker="url(#am1Arr)" />
      <Wire d="M380 320 L500 300" marker="url(#am1Arr)" />
      <Wire d="M380 320 L500 380" marker="url(#am1Arr)" />

      <rect x="500" y="80" width="80" height="40" rx="6" fill={CREAM} stroke={MUTED} strokeWidth="2" />
      <M x="540" y="105" size="16">z_xx</M>

      <rect x="500" y="160" width="80" height="40" rx="6" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="540" y="185" size="16">z_xy</M>

      <rect x="500" y="280" width="80" height="40" rx="6" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="540" y="305" size="16">z_yx</M>

      <rect x="500" y="360" width="80" height="40" rx="6" fill={CREAM} stroke={MUTED} strokeWidth="2" />
      <M x="540" y="385" size="16">z_yy</M>

      <path d="M540 210 L540 270" stroke={GREEN} strokeWidth="3" markerEnd="url(#am1ArrG)" className="am1m-pulse" />
      <path d="M540 270 L540 210" stroke={GREEN} strokeWidth="3" markerEnd="url(#am1ArrG)" className="am1m-pulse" />
      <L x="680" y="245" fill={GREEN} size="15">equal when continuous</L>
      <Wire d="M555 240 L600 240" stroke={GREEN} dash="4 4" />

      <rect x="250" y="420" width="400" height="40" rx="6" fill={WHITE} stroke={MUTED} strokeWidth="1" />
      <M x="450" y="445" size="14">p = z_x, q = z_y, r = z_xx, s = z_xy, t = z_yy</M>
    </Scene>
  )
}

export function M2LaplaceCancellationColumnsScene() {
  return (
    <Scene caption="Verifying Laplace's equation by summing partial derivatives">
      <rect x="600" y="40" width="260" height="70" rx="6" fill={WHITE} stroke={MUTED} strokeWidth="1" />
      <M x="730" y="65" size="14">v = 1/r, r^2 = x^2 + y^2 + z^2</M>
      <L x="730" y="90" size="13" fill={MUTED}>potential of a point charge</L>

      <L x="200" y="80" size="18" weight="800">v_xx</L>
      <L x="450" y="80" size="18" weight="800">v_yy</L>
      <L x="700" y="80" size="18" weight="800">v_zz</L>

      <rect x="160" y="110" width="80" height="30" rx="4" fill={SKY} stroke={BLUE} strokeWidth="1" />
      <M x="200" y="130" size="15">r^-5</M>
      <rect x="410" y="110" width="80" height="30" rx="4" fill={SKY} stroke={BLUE} strokeWidth="1" />
      <M x="450" y="130" size="15">r^-5</M>
      <rect x="660" y="110" width="80" height="30" rx="4" fill={SKY} stroke={BLUE} strokeWidth="1" />
      <M x="700" y="130" size="15">r^-5</M>

      <M x="200" y="180" size="16">( 2x^2</M>
      <M x="200" y="210" size="16">- y^2</M>
      <M x="200" y="240" size="16">- z^2 )</M>

      <M x="450" y="180" size="16">( -x^2</M>
      <M x="450" y="210" size="16">+ 2y^2</M>
      <M x="450" y="240" size="16">- z^2 )</M>

      <M x="700" y="180" size="16">( -x^2</M>
      <M x="700" y="210" size="16">- y^2</M>
      <M x="700" y="240" size="16">+ 2z^2 )</M>

      <Wire d="M100 290 L800 290" stroke={MUTED} width="3" />
      <rect x="350" y="275" width="30" height="30" rx="15" fill={CREAM} stroke={MUTED} />
      <M x="365" y="295" size="18">+</M>
      <rect x="600" y="275" width="30" height="30" rx="15" fill={CREAM} stroke={MUTED} />
      <M x="615" y="295" size="18">+</M>

      <rect x="350" y="340" width="200" height="50" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="450" y="370" size="18">= r^-5 * 0 = 0</M>
    </Scene>
  )
}

export function M2TwoPathsPolarGridScene() {
  return (
    <Scene caption="Partial derivatives depend on which variable is held constant">
      <rect x="300" y="40" width="300" height="40" rx="6" fill={ROSE} opacity="0.1" />
      <M x="450" y="65" size="18" fill={ROSE}>(dr/dx)_theta != (dr/dx)_y</M>

      <g transform="translate(150, 400)">
        <Wire d="M0 0 L500 0" stroke={MUTED} width="2" marker="url(#am1Arr)" />
        <Wire d="M0 0 L0 -300" stroke={MUTED} width="2" marker="url(#am1Arr)" />
        <Wire d="M0 0 L400 -230.9" stroke={MUTED} dash="4 4" />
        <L x="500" y="20" fill={MUTED}>x</L>
        <L x="-20" y="-300" fill={MUTED}>y</L>

        <Wire d="M0 0 A200 200 0 0 0 200 -200" stroke={MUTED} dash="2 6" opacity="0.4" />
        <Wire d="M0 0 A220 220 0 0 0 220 -220" stroke={MUTED} dash="2 6" opacity="0.4" />

        <Dot cx="100" cy="-173.2" r="5" fill={N} />
        <L x="90" y="-185" size="15">P</L>

        <Wire d="M100 -173.2 L200 -230.9" stroke={GREEN} width="3" marker="url(#am1ArrG)" />
        <L x="260" y="-240" fill={GREEN} size="14">theta fixed: dr/dx = sec(theta) = 2</L>

        <Wire d="M100 -173.2 L200 -173.2" stroke={PURP} width="3" marker="url(#am1ArrP)" />
        <L x="300" y="-160" fill={PURP} size="14">y fixed: dr/dx = cos(theta) = 0.5</L>
      </g>
    </Scene>
  )
}


export function M2DependencyPathTreeScene() {
  return (
    <Scene caption="The total derivative via dependency paths">
      {/* Nodes */}
      <rect x="200" y="80" width="100" height="40" rx="6" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="250" y="105" size="16">u = f(x,y)</M>

      <rect x="110" y="230" width="80" height="40" rx="20" fill={CREAM} stroke={MUTED} strokeWidth="2" />
      <M x="150" y="255" size="16">x</M>

      <rect x="310" y="230" width="80" height="40" rx="20" fill={CREAM} stroke={MUTED} strokeWidth="2" />
      <M x="350" y="255" size="16">y</M>

      <rect x="210" y="380" width="80" height="40" rx="6" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="250" y="405" size="16">t</M>

      {/* Edges */}
      <Wire d="M220 120 L170 230" marker="url(#am1ArrA)" stroke={AMBER} width="3" />
      <L x="180" y="180" fill={AMBER} size="15">u_x</L>

      <Wire d="M280 120 L330 230" marker="url(#am1ArrT)" stroke={TEAL} width="3" />
      <L x="320" y="180" fill={TEAL} size="15">u_y</L>

      <Wire d="M150 270 L230 380" marker="url(#am1ArrA)" stroke={AMBER} width="3" />
      <L x="175" y="335" fill={AMBER} size="15">dx/dt</L>

      <Wire d="M350 270 L270 380" marker="url(#am1ArrT)" stroke={TEAL} width="3" />
      <L x="325" y="335" fill={TEAL} size="15">dy/dt</L>

      {/* Formula */}
      <rect x="450" y="210" width="380" height="80" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="1" />
      <M x="520" y="255" size="18">du/dt = </M>
      <M x="630" y="255" size="18" fill={AMBER}>u_x dx/dt</M>
      <M x="705" y="255" size="18"> + </M>
      <M x="770" y="255" size="18" fill={TEAL}>u_y dy/dt</M>
    </Scene>
  )
}

export function M2CylinderRateGaugesScene() {
  return (
    <Scene caption="Related rates using the total derivative">
      <g transform="translate(150, 150)">
        <path d="M0 0 A 60 20 0 1 0 120 0 A 60 20 0 1 0 0 0 Z" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <path d="M0 0 L0 200 A 60 20 0 0 0 120 200 L120 0" fill={SKY} opacity="0.3" stroke={BLUE} strokeWidth="2" />
        
        <Wire d="M60 0 L120 0" stroke={GREEN} width="2" marker="url(#am1ArrG)" />
        <L x="135" y="-15" fill={GREEN} anchor="start" size="14">r = 5 cm, dr/dt = +0.2 cm/s</L>
        
        <Wire d="M-20 0 L-20 200" stroke={RED} width="2" marker="url(#am1ArrR)" />
        <L x="-30" y="100" fill={RED} anchor="end" size="14">h = 10 cm, dh/dt = -0.5 cm/s</L>
      </g>

      <g transform="translate(550, 150)">
        <L x="0" y="0" anchor="end" size="14" fill={MUTED}>radius effect</L>
        <L x="0" y="20" anchor="end" size="14" fill={MUTED}>2 pi r h dr/dt = +20 pi</L>
        <rect x="20" y="-5" width="160" height="20" fill={GREEN} rx="4" />

        <L x="0" y="70" anchor="end" size="14" fill={MUTED}>height effect</L>
        <L x="0" y="90" anchor="end" size="14" fill={MUTED}>pi r^2 dh/dt = -12.5 pi</L>
        <rect x="-80" y="65" width="100" height="20" fill={RED} rx="4" />

        <Wire d="M-100 130 L200 130" stroke={MUTED} width="1" />
        <L x="0" y="160" anchor="end" size="16" weight="800">net dV/dt</L>
        <L x="0" y="180" anchor="end" size="14">= +7.5 pi = 23.56 cm^3/s</L>
        <rect x="20" y="155" width="60" height="20" fill={BLUE} rx="4" />
        <Wire d="M20 -20 L20 190" stroke={MUTED} dash="4 4" />
      </g>
    </Scene>
  )
}

export function M2LevelCurveGradientTangentScene() {
  return (
    <Scene caption="Implicit differentiation along a level curve">
      <Axes x="100" y="450" w="600" h="400" origin="left" />
      
      <g transform="translate(350, 250)">
        <path d="M132 0 C132 -93 30 -132 0 -132 C-30 -132 -132 -93 -132 0 C-132 93 -30 132 0 132 C30 132 132 93 132 0 Z" 
              fill="none" stroke={BLUE} strokeWidth="3" transform="rotate(-45)" />
        
        <Dot cx="50" cy="-100" r="5" fill={N} />
        <L x="65" y="-110" size="15">P(1, 2)</L>

        <Wire d="M50 -100 L90 -150" stroke={MUTED} width="3" marker="url(#am1ArrM)" />
        <L x="105" y="-155" fill={MUTED} size="14">grad f (4, 5)</L>

        <Wire d="M-50 -20 L150 -180" stroke={ROSE} width="2" />
        <L x="160" y="-190" fill={ROSE} size="14">slope = -f_x/f_y = -4/5</L>
      </g>

      <rect x="80" y="80" width="220" height="50" rx="6" fill={WHITE} stroke={MUTED} />
      <M x="190" y="110" size="16">f_x + f_y dy/dx = 0</M>
    </Scene>
  )
}

export function M2TwoLayerVariableNetworkScene() {
  return (
    <Scene caption="Composite functions and the change of variables">
      {/* Nodes */}
      <rect x="100" y="220" width="60" height="60" rx="30" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="130" y="255" size="18">u</M>

      <rect x="350" y="120" width="60" height="60" rx="30" fill={CREAM} stroke={MUTED} strokeWidth="2" />
      <M x="380" y="155" size="18">x</M>

      <rect x="350" y="320" width="60" height="60" rx="30" fill={CREAM} stroke={MUTED} strokeWidth="2" />
      <M x="380" y="355" size="18">y</M>

      <rect x="650" y="120" width="60" height="60" rx="30" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="680" y="155" size="18">s</M>

      <rect x="650" y="320" width="60" height="60" rx="30" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="680" y="355" size="18">t</M>

      {/* u to x, y */}
      <Wire d="M160 250 L350 150" marker="url(#am1Arr)" stroke={N} />
      <L x="260" y="180" size="14">u_x</L>

      <Wire d="M160 250 L350 350" marker="url(#am1Arr)" stroke={N} />
      <L x="260" y="320" size="14">u_y</L>

      {/* x to s, t */}
      <Wire d="M410 150 L650 150" marker="url(#am1ArrA)" stroke={AMBER} width="2" />
      <L x="530" y="140" size="14" fill={AMBER}>x_s</L>

      <Wire d="M410 150 L650 350" marker="url(#am1ArrT)" stroke={TEAL} width="2" />
      <L x="490" y="240" size="14" fill={TEAL}>x_t</L>

      {/* y to s, t */}
      <Wire d="M410 350 L650 150" marker="url(#am1ArrA)" stroke={AMBER} width="2" />
      <L x="490" y="270" size="14" fill={AMBER}>y_s</L>

      <Wire d="M410 350 L650 350" marker="url(#am1ArrT)" stroke={TEAL} width="2" />
      <L x="530" y="370" size="14" fill={TEAL}>y_t</L>

      {/* Matrix eq */}
      <g transform="translate(250, 430)">
        <M x="0" y="0" size="18">[u_s  u_t]  =  [u_x  u_y]</M>
        <M x="200" y="-12" size="18">[ x_s  x_t ]</M>
        <M x="200" y="12" size="18">[ y_s  y_t ]</M>
      </g>
    </Scene>
  )
}

export function M2LinkDerivativeSignTableScene() {
  return (
    <Scene caption="Proving identities with link derivatives">
      <L x="350" y="80" size="18" weight="800">d/dx</L>
      <L x="500" y="80" size="18" weight="800">d/dy</L>
      <L x="650" y="80" size="18" weight="800">d/dz</L>

      <L x="150" y="130" size="18" anchor="end">r = x - y</L>
      <rect x="280" y="110" width="420" height="40" fill={SKY} opacity="0.4" />
      <M x="350" y="135" size="18">1</M>
      <M x="500" y="135" size="18">-1</M>
      <M x="650" y="135" size="18">0</M>

      <L x="150" y="190" size="18" anchor="end">s = y - z</L>
      <rect x="280" y="170" width="420" height="40" fill={CREAM} />
      <M x="350" y="195" size="18">0</M>
      <M x="500" y="195" size="18">1</M>
      <M x="650" y="195" size="18">-1</M>

      <L x="150" y="250" size="18" anchor="end">t = z - x</L>
      <rect x="280" y="230" width="420" height="40" fill={SKY} opacity="0.4" />
      <M x="350" y="255" size="18">-1</M>
      <M x="500" y="255" size="18">0</M>
      <M x="650" y="255" size="18">1</M>

      <Wire d="M280 290 L700 290" stroke={MUTED} width="2" />
      
      <M x="350" y="325" size="16">u_x = u_r - u_t</M>
      <M x="500" y="325" size="16">u_y = -u_r + u_s</M>
      <M x="650" y="325" size="16">u_z = -u_s + u_t</M>

      <rect x="250" y="370" width="500" height="50" rx="8" fill={WHITE} stroke={BLUE} strokeWidth="2" />
      <M x="500" y="400" size="18">u_x + u_y + u_z = (u_r - u_r) + (u_s - u_s) + (u_t - u_t) = 0</M>
      
      <Wire d="M440 405 L475 395" stroke={ROSE} width="2" />
      <Wire d="M540 405 L575 395" stroke={GREEN} width="2" />
      <Wire d="M640 405 L675 395" stroke={TEAL} width="2" />
    </Scene>
  )
}

export function M2GridSquareToParallelogramScene() {
  return (
    <Scene caption="The Jacobian as a local area scale factor">
      {/* Left panel */}
      <rect x="50" y="80" width="300" height="250" fill={WHITE} stroke={MUTED} />
      <Axes x="70" y="300" w="250" h="180" origin="left" />
      <L x="200" y="100" fill={MUTED}>xy-plane</L>
      
      {/* Square at (1, 3) */}
      <rect x="150" y="180" width="30" height="30" fill={BLUE} opacity="0.3" stroke={BLUE} />
      <Dot cx="150" cy="210" r="4" fill={N} />
      <L x="135" y="220" size="13">(1,3)</L>
      <L x="165" y="170" size="14" fill={BLUE}>area h^2</L>

      {/* Map arrow */}
      <Wire d="M370 200 L530 200" stroke={N} width="4" marker="url(#am1Arr)" />
      <M x="450" y="180" size="14">(u, v) = (x^2 - y^2, 2xy)</M>

      {/* Right panel */}
      <rect x="550" y="80" width="300" height="250" fill={WHITE} stroke={MUTED} />
      <Axes x="570" y="300" w="250" h="180" origin="left" />
      <L x="700" y="100" fill={MUTED}>uv-plane</L>

      {/* Image at (-8, 6) in (u,v). Let's scale it. */}
      {/* -8 is left of origin. Let's make origin center for right axes. */}
      {/* Wait, the text says "Axes origin='left'", so I'll just draw the parallelogram explicitly */}
      <path d="M620 220 L660 210 L650 180 L610 190 Z" fill={BLUE} opacity="0.6" stroke={BLUE} strokeWidth="2" />
      <Dot cx="620" cy="220" r="4" fill={N} />
      <L x="600" y="235" size="13">(-8,6)</L>
      <L x="720" y="180" size="14" fill={BLUE}>area ~ |J| h^2 = 40 h^2</L>

      {/* Jacobian box */}
      <rect x="300" y="360" width="300" height="60" rx="6" fill={CREAM} stroke={MUTED} strokeWidth="2" />
      <M x="450" y="395" size="16">J = | 2x -2y | = 4(x^2 + y^2)</M>
      <M x="450" y="440" size="16">at (1,3): J = 4(1 + 9) = 40</M>
    </Scene>
  )
}

export function M2Jacobian3x3ZeroHuntScene() {
  return (
    <Scene caption="3x3 Jacobian: substituting the point before expanding">
      <M x="450" y="40" size="15">u = x + 3y^2 - z^3,  v = 4x^2 yz,  w = 2z^2 - xy</M>

      {/* Symbolic det */}
      <Wire d="M260 70 L250 70 L250 170 L260 170" stroke={N} width="2" />
      <Wire d="M640 70 L650 70 L650 170 L640 170" stroke={N} width="2" />
      
      <M x="350" y="95" size="16">1</M>
      <M x="450" y="95" size="16">6y</M>
      <M x="550" y="95" size="16">-3z^2</M>

      <M x="350" y="125" size="16">8xyz</M>
      <M x="450" y="125" size="16">4x^2 z</M>
      <M x="550" y="125" size="16">4x^2 y</M>

      <M x="350" y="155" size="16">-y</M>
      <M x="450" y="155" size="16">-x</M>
      <M x="550" y="155" size="16">4z</M>

      {/* Arrow down */}
      <Wire d="M450 190 L450 240" stroke={BLUE} width="3" marker="url(#am1ArrB)" />
      <L x="465" y="220" anchor="start" fill={BLUE} size="15">at (1, -1, 0)</L>

      {/* Numeric det */}
      <rect x="520" y="250" width="60" height="110" fill={AMBER} opacity="0.15" rx="6" />
      <L x="600" y="305" fill={AMBER} size="14">expand here</L>

      <Wire d="M350 260 L340 260 L340 350 L350 350" stroke={N} width="2" />
      <Wire d="M550 260 L560 260 L560 350 L550 350" stroke={N} width="2" />

      <M x="380" y="285" size="18">1</M>
      <M x="450" y="285" size="18">-6</M>
      <M x="520" y="285" size="18">0</M>
      <rect x="505" y="265" width="30" height="25" rx="12" fill="none" stroke={AMBER} strokeWidth="2" />

      <M x="380" y="315" size="18">0</M>
      <rect x="365" y="295" width="30" height="25" rx="12" fill="none" stroke={AMBER} strokeWidth="2" />
      <M x="450" y="315" size="18">0</M>
      <rect x="435" y="295" width="30" height="25" rx="12" fill="none" stroke={AMBER} strokeWidth="2" />
      <M x="520" y="315" size="18">-4</M>

      <M x="380" y="345" size="18">1</M>
      <M x="450" y="345" size="18">-1</M>
      <M x="520" y="345" size="18">0</M>
      <rect x="505" y="325" width="30" height="25" rx="12" fill="none" stroke={AMBER} strokeWidth="2" />

      <M x="450" y="400" size="20" fill={BLUE}>= -(-4) * (1(-1) - 1(-6)) = 4 * 5 = 20</M>

      {/* Side card */}
      <rect x="680" y="100" width="200" height="80" rx="8" fill={CREAM} stroke={MUTED} strokeWidth="1" />
      <L x="780" y="125" size="14" fill={MUTED} weight="700">Standard Jacobians</L>
      <M x="780" y="145" size="13">cylindrical: rho</M>
      <M x="780" y="165" size="13">spherical: r^2 sin(theta)</M>
    </Scene>
  )
}

export function M2JacobianChainConveyorScene() {
  return (
    <Scene caption="Chain rule and inversion for Jacobians">
      {/* Top row */}
      <rect x="150" y="100" width="100" height="60" rx="8" fill={SKY} stroke={BLUE} />
      <M x="200" y="135" size="16">(r, theta)</M>

      <rect x="400" y="100" width="100" height="60" rx="8" fill={CREAM} stroke={MUTED} />
      <M x="450" y="135" size="16">(x, y)</M>

      <rect x="650" y="100" width="100" height="60" rx="8" fill={SKY} stroke={BLUE} />
      <M x="700" y="135" size="16">(u, v)</M>

      <Wire d="M260 130 L390 130" stroke={N} width="2" marker="url(#am1Arr)" />
      <M x="325" y="120" size="12">J1 = r</M>

      <Wire d="M510 130 L640 130" stroke={N} width="2" marker="url(#am1Arr)" />
      <M x="575" y="120" size="12">J2 = 4(x^2 + y^2)</M>

      <path d="M200 90 Q450 -20 700 90" fill="none" stroke={TEAL} strokeWidth="3" markerEnd="url(#am1ArrT)" />
      <L x="450" y="40" fill={TEAL} size="15">J_total = J1 * J2 = 4r^3</L>

      {/* Bottom row */}
      <rect x="250" y="280" width="120" height="60" rx="8" fill={WHITE} stroke={MUTED} />
      <M x="310" y="315" size="16">(u, v)</M>

      <rect x="550" y="280" width="120" height="60" rx="8" fill={WHITE} stroke={MUTED} />
      <M x="610" y="315" size="16">(x, y)</M>

      <Wire d="M380 295 L540 295" stroke={BLUE} width="3" marker="url(#am1ArrB)" />
      <M x="460" y="285" size="15" fill={BLUE}>J' = d(x,y)/d(u,v)</M>

      <Wire d="M540 325 L380 325" stroke={ROSE} width="3" marker="url(#am1ArrRo)" />
      <M x="460" y="350" size="15" fill={ROSE}>J = d(u,v)/d(x,y)</M>

      <rect x="360" y="400" width="200" height="50" rx="6" fill={CREAM} stroke={MUTED} strokeWidth="2" />
      <M x="460" y="430" size="18">J * J' = 1</M>
    </Scene>
  )
}

export function M2PlaneCollapsesToCurveScene() {
  return (
    <Scene caption="Functional dependence: mapping the plane to a curve">
      {/* Left panel */}
      <Axes x="50" y="300" w="250" h="200" origin="left" />
      <rect x="80" y="150" width="180" height="120" fill="none" stroke={MUTED} strokeWidth="1" />
      {/* Grid lines */}
      <Wire d="M80 180 L260 180 M80 210 L260 210 M80 240 L260 240" stroke={MUTED} width="1" opacity="0.5" />
      <Wire d="M110 150 L110 270 M140 150 L140 270 M170 150 L170 270 M200 150 L200 270 M230 150 L230 270" stroke={MUTED} width="1" opacity="0.5" />
      
      {/* Shaded cells */}
      <rect x="140" y="180" width="30" height="30" fill={BLUE} opacity="0.4" />
      <rect x="170" y="210" width="30" height="30" fill={BLUE} opacity="0.4" />
      <rect x="110" y="240" width="30" height="30" fill={BLUE} opacity="0.4" />

      {/* Mapping arrow */}
      <Wire d="M330 200 L530 200" stroke={N} width="4" marker="url(#am1Arr)" />
      <M x="430" y="163" size="12">(u, v) =</M>
      <M x="430" y="180" size="12">((x+y)/(1-xy), atan x + atan y)</M>

      {/* Right panel */}
      <Axes x="580" y="300" w="250" h="200" origin="left" />
      <L x="850" y="320" fill={MUTED}>u</L>
      <L x="560" y="80" fill={MUTED}>v</L>

      {/* Curve u = tan v -> v = atan u: concave, through the origin (580, 300) */}
      <path d="M580 300 Q640 160 750 135 Q800 128 830 125" fill="none" stroke={ROSE} strokeWidth="3" />
      <L x="700" y="112" fill={ROSE} size="16" anchor="start">u = tan(v)</L>

      {/* Flattened red segments */}
      <Wire d="M630 260 L660 245" stroke={ROSE} width="6" />
      <Wire d="M680 230 L710 212" stroke={ROSE} width="6" />
      <Wire d="M720 206 L750 185" stroke={ROSE} width="6" />

      {/* Zero Jacobian box */}
      <rect x="290" y="350" width="340" height="50" rx="6" fill={WHITE} stroke={MUTED} />
      <M x="460" y="380" size="15">d(u,v)/d(x,y) = 0 for all (x, y)</M>
    </Scene>
  )
}

export function M2TaylorPolynomialsHuggingCurveScene() {
  return (
    <Scene caption="Maclaurin polynomials approximating e^x">
      <Axes x="200" y="450" w="500" h="350" origin="center" />
      
      {/* Origin is x=450, y=350. Scale dx=100, dy=50 */}
      {/* a = 0 line */}
      <Wire d="M450 100 L450 480" stroke={MUTED} dash="4 4" width="2" />
      <L x="460" y="120" anchor="start" fill={MUTED} size="14">a = 0: match value, slope, curvature...</L>

      {/* True curve f(x) = e^x */}
      {/* x=-2 -> y=e^-2 ~ 0.13 -> y=350-6.5 */}
      {/* x=-1 -> y=e^-1 ~ 0.36 -> y=350-18 */}
      {/* x=0 -> y=1 -> y=300 */}
      {/* x=1 -> y=2.71 -> y=350-135 = 215 */}
      {/* x=1.5 -> y=4.48 -> y=350-224 = 126 */}
      <path d="M250 343 Q350 332 450 300 Q550 215 600 126" fill="none" stroke={N} strokeWidth="4" />

      {/* P0 = 1 */}
      <Wire d="M250 300 L650 300" stroke={MUTED} width="2" />
      
      {/* P1 = 1 + x */}
      {/* x=-2, y=-1 -> y=400. x=1.5, y=2.5 -> y=350-125=225 */}
      <Wire d="M250 400 L600 225" stroke={BLUE} width="2.5" />

      {/* P2 = 1 + x + x^2/2 */}
      {/* x=-2: 1 - 2 + 2 = 1 -> y=300 */}
      {/* x=-1: 1 - 1 + 0.5 = 0.5 -> y=325 */}
      {/* x=0: 1 -> y=300 */}
      {/* x=1: 2.5 -> y=225 */}
      {/* x=1.5: 1+1.5+1.125 = 3.625 -> y=350-181 = 169 */}
      <path d="M250 300 Q350 350 450 300 T600 169" fill="none" stroke={GREEN} strokeWidth="2.5" />

      {/* P3 = 1 + x + x^2/2 + x^3/6 */}
      {/* x=-2: 1 - 2 + 2 - 1.33 = -0.33 -> y=350+16 = 366 */}
      {/* x=0: 1 -> y=300 */}
      {/* x=1.5: 3.625 + 0.56 = 4.18 -> y=350-209 = 141 */}
      <path d="M250 366 Q350 325 450 300 Q550 200 600 141" fill="none" stroke={AMBER} strokeWidth="2.5" />

      {/* Legend */}
      <rect x="720" y="250" width="160" height="150" rx="8" fill={WHITE} stroke={MUTED} />
      <M x="800" y="280" size="14">f(x) = e^x</M>
      <M x="800" y="310" size="14" fill={MUTED}>P0 = 1</M>
      <M x="800" y="340" size="14" fill={BLUE}>P1 = 1 + x</M>
      <M x="800" y="370" size="14" fill={GREEN}>P2 = 1 + x + x^2/2</M>
      <M x="800" y="400" size="14" fill={AMBER}>P3 = ... + x^3/6</M>
    </Scene>
  )
}

export function M2TwoRoutesToCoefficientsScene() {
  return (
    <Scene caption="Two routes to Maclaurin coefficients">
      <L x="250" y="60" size="18" weight="800">Route A: derivatives</L>
      <L x="650" y="60" size="18" weight="800">Route B: known series</L>

      {/* Left cards */}
      <rect x="150" y="90" width="200" height="40" rx="4" fill={WHITE} stroke={MUTED} />
      <M x="250" y="115" size="15">f(0) = 1</M>

      <rect x="150" y="140" width="200" height="40" rx="4" fill={WHITE} stroke={MUTED} />
      <M x="250" y="165" size="15">f'(0) = 1</M>
      <L x="360" y="165" size="11" fill={MUTED} anchor="start">f' = f cos x</L>

      <rect x="150" y="190" width="200" height="40" rx="4" fill={WHITE} stroke={MUTED} />
      <M x="250" y="215" size="15">f''(0) = 1</M>
      <L x="360" y="215" size="11" fill={MUTED} anchor="start">f'' = f' cos x - f sin x</L>

      <rect x="150" y="240" width="200" height="40" rx="4" fill={WHITE} stroke={MUTED} />
      <M x="250" y="265" size="15">f'''(0) = 0</M>

      <rect x="150" y="290" width="200" height="40" rx="4" fill={WHITE} stroke={MUTED} />
      <M x="250" y="315" size="15">f''''(0) = -3</M>

      {/* Right cards */}
      <rect x="530" y="90" width="260" height="40" rx="4" fill={WHITE} stroke={MUTED} />
      <M x="660" y="115" size="15">sin x = x - x^3/6 + ...</M>

      <rect x="530" y="140" width="260" height="50" rx="4" fill={WHITE} stroke={MUTED} />
      <M x="660" y="170" size="14">e^t = 1 + t + t^2/2 + t^3/6 + t^4/24</M>

      <rect x="530" y="200" width="260" height="40" rx="4" fill={SKY} stroke={BLUE} />
      <M x="660" y="225" size="15">substitute t = sin x</M>

      <rect x="530" y="250" width="260" height="40" rx="4" fill={SKY} stroke={BLUE} />
      <M x="660" y="275" size="15">collect powers to x^4</M>

      {/* Arrows */}
      <Wire d="M250 340 L400 420" stroke={N} width="2" marker="url(#am1Arr)" />
      <Wire d="M650 300 L500 420" stroke={N} width="2" marker="url(#am1Arr)" />

      {/* Result */}
      <rect x="250" y="420" width="400" height="60" rx="8" fill={CREAM} stroke={AMBER} strokeWidth="3" className="am1m-pulse" />
      <M x="450" y="455" size="18">e^(sin x) = 1 + x + x^2/2 - x^4/8 + ...</M>
    </Scene>
  )
}

export function M2LogSeriesTermLadderScene() {
  return (
    <Scene caption="Numerical approximation with Taylor's series">
      {/* Number line */}
      <Wire d="M100 150 L750 150" stroke={MUTED} width="3" marker="url(#am1Arr)" />
      <Dot cx="150" cy="150" r="5" fill={N} />
      <M x="150" y="175" size="14">0.090</M>
      <Dot cx="700" cy="150" r="5" fill={N} />
      <M x="700" y="175" size="14">0.100</M>
      
      {/* Jumps: 
          0.1 (700)
          0.095 (425)
          0.095333 (443)
          0.095308 (441.5)
          0.095310 (442)
      */}
      <Wire d="M150 150 Q425 80 700 150" fill="none" stroke={BLUE} strokeWidth="2" markerEnd="url(#am1ArrB)" />
      <Wire d="M700 150 Q562 100 425 150" fill="none" stroke={GREEN} strokeWidth="2" markerEnd="url(#am1ArrG)" />
      <Wire d="M425 150 Q434 130 443 150" fill="none" stroke={AMBER} strokeWidth="2" markerEnd="url(#am1ArrA)" />
      <Wire d="M443 150 Q442 140 441.5 150" fill="none" stroke={ROSE} strokeWidth="2" />
      
      <L x="442" y="185" fill={N} size="14" weight="800">Target</L>

      {/* Gold box */}
      <rect x="720" y="60" width="160" height="40" rx="6" fill={CREAM} stroke={AMBER} strokeWidth="2" />
      <M x="800" y="85" size="14">ln 1.1 = 0.0953102</M>

      {/* Ladder */}
      {/* 5 boxes shrinking */}
      <rect x="100" y="240" width="150" height="50" rx="4" fill={SKY} stroke={BLUE} />
      <M x="175" y="270" size="18">+0.1</M>

      <rect x="270" y="260" width="120" height="40" rx="4" fill={SKY} stroke={GREEN} />
      <M x="330" y="285" size="16">-0.005</M>

      <rect x="410" y="280" width="100" height="30" rx="4" fill={SKY} stroke={AMBER} />
      <M x="460" y="300" size="14">+0.000333</M>

      <rect x="530" y="300" width="80" height="25" rx="4" fill={SKY} stroke={ROSE} />
      <M x="570" y="318" size="12">-0.000025</M>

      <rect x="630" y="320" width="60" height="20" rx="4" fill={SKY} stroke={MUTED} />
      <M x="660" y="335" size="10">+0.000002</M>

      {/* Caption */}
      <L x="450" y="420" size="16" fill={MUTED}>each term ~ 10 times smaller because x - 1 = 0.1</L>
    </Scene>
  )
}

/* ── Module 3 ────────────────────────────────────────────────────────── */

export function M3ReductionStaircaseScene() {
  return (
    <Scene caption="Reduction formula staircase">
      <Block x="270" y="60" w="360" h="40" label="integration by parts + sin^2 = 1 - cos^2" className="am1m-descend" />
      
      <g className="am1m-shift">
        <Block x="100" y="140" w="100" h="40" label="I_n" />
        <Wire d="M200 160 L240 160 L240 220" stroke={BLUE} marker="url(#am1ArrB)" />
        <L x="255" y="180" size="14" fill={BLUE} anchor="start">(n-1)/n</L>
      </g>
      
      <g className="am1m-shift">
        <Block x="200" y="220" w="100" h="40" label="I_(n-2)" />
        <Wire d="M300 240 L340 240 L340 300" stroke={BLUE} marker="url(#am1ArrB)" />
        <L x="355" y="260" size="14" fill={BLUE} anchor="start">(n-3)/(n-2)</L>
      </g>
      
      <g className="am1m-shift">
        <Block x="300" y="300" w="100" h="40" label="I_(n-4)" />
        <Wire d="M400 320 L440 320 L440 380" stroke={BLUE} marker="url(#am1ArrB)" />
        <L x="455" y="340" size="14" fill={BLUE} anchor="start">...</L>
      </g>
      
      <g className="am1m-shift">
        <L x="420" y="405" size="24" weight="800">...</L>
        <Wire d="M440 400 L480 400 L480 440" stroke={BLUE} marker="url(#am1ArrB)" />
      </g>
      
      <g className="am1m-pulse">
        <Block x="450" y="440" w="120" h="48" label="I_1 = 1" sub="(odd n)" stroke={GREEN} />
        <Block x="600" y="440" w="130" h="48" label="I_0 = pi/2" sub="(even n)" stroke={GREEN} />
      </g>
      
      <Wire d="M150 195 Q40 170 40 310 Q40 480 470 480" stroke={ROSE} marker="url(#am1ArrRo)" className="am1m-return" dash="4 4" />
      <L x="450" y="30" size="16" fill={ROSE} anchor="middle" className="am1m-return">multiply the tags</L>
    </Scene>
  )
}

export function M3SinPowerPartsSplitScene() {
  return (
    <Scene caption="Reduction formula for the integral of sin^n x">
      <Block x="400" y="50" w="100" h="40" label="sin^n x" className="am1m-allocate" />
      
      <Wire d="M400 70 Q300 90 250 120" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-rewire" />
      <Wire d="M500 70 Q600 90 650 120" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-rewire" />
      
      <Block x="170" y="120" w="160" h="40" label="u = sin^(n-1) x" className="am1m-shift" />
      <Block x="570" y="120" w="160" h="40" label="dv = sin x dx" className="am1m-shift" />

      <Block x="180" y="200" w="540" h="50" label="-sin^(n-1) x cos x + (n-1) * integral sin^(n-2) x cos^2 x dx" className="am1m-insert" />
      
      <Wire d="M600 250 Q650 280 650 300" stroke={AMBER} marker="url(#am1ArrA)" className="am1m-pulse" />
      <Block x="580" y="300" w="140" h="30" label="= 1 - sin^2 x" stroke={AMBER} className="am1m-pulse" />

      <Block x="300" y="360" w="140" h="40" label="(n-1) I_(n-2)" stroke={GREEN} className="am1m-enqueue" />
      <Block x="460" y="360" w="120" h="40" label="-(n-1) I_n" stroke={RED} className="am1m-enqueue" />
      
      <Wire d="M460 380 Q250 430 150 400" stroke={RED} marker="url(#am1ArrR)" className="am1m-return" />
      <Block x="50" y="380" w="220" h="40" label="I_n + (n-1) I_n = n I_n" stroke={BLUE} className="am1m-return" />

      <Block x="180" y="460" w="540" h="50" label="I_n = -(sin^(n-1) x cos x)/n + ((n-1)/n) I_(n-2)" stroke={PURP} className="am1m-descend" />
    </Scene>
  )
}

export function M3CosPowerMethodChooserScene() {
  return (
    <Scene caption="Method selection for cos^n x integrals">
      <Block x="340" y="40" w="220" h="40" label="integral of cos^n x dx" className="am1m-allocate" />

      <Wire d="M360 80 L200 140" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-rewire" />
      <L x="260" y="110" fill={BLUE}>n odd</L>
      <Block x="50" y="140" w="300" h="60" label="split off cos x, put sin x = t" sub="integrate a polynomial" className="am1m-insert" />

      <Wire d="M540 80 L700 140" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-rewire" />
      <L x="640" y="110" fill={BLUE}>n even</L>

      <Wire d="M700 140 L520 220" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-rewire" />
      <L x="580" y="180" fill={BLUE}>n = 2 or 4</L>
      <Block x="380" y="220" w="280" h="60" label="half-angle / multiple-angle" sub="expansion" className="am1m-insert" />

      <Wire d="M700 140 L800 220" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-rewire" />
      <L x="770" y="180" fill={BLUE}>n &gt;= 6</L>
      <Block x="700" y="220" w="180" h="80" label="reduction formula" sub="(sin x cos^(n-1) x)/n + ..." className="am1m-insert" />

      <Card x="50" y="320" w="480" h="140" title="Sign difference" accent={PURP} className="am1m-pulse">
        <M x="40" y="80" size="15" anchor="start">sin^n : -(sin^(n-1) x cos x)/n + ...</M>
        <M x="40" y="120" size="15" anchor="start">cos^n : +(cos^(n-1) x sin x)/n + ...</M>
        <ellipse cx="120" cy="76" rx="14" ry="14" fill="none" stroke={RED} strokeWidth="2" />
        <ellipse cx="120" cy="116" rx="14" ry="14" fill="none" stroke={GREEN} strokeWidth="2" />
      </Card>
    </Scene>
  )
}

export function M3WallisFractionLadderScene() {
  return (
    <Scene caption="Wallis's formula for sin^n x and cos^n x">
      <L x="250" y="80" size="20" weight="800" fill={BLUE}>n odd</L>
      <L x="650" y="80" size="20" weight="800" fill={AMBER}>n even</L>

      <Wire d="M450 60 L450 360" stroke={MUTED} dash="4 4" className="am1m-pulse" />
      <Block x="360" y="180" w="180" h="40" label="same for sin^n and cos^n" fill={CREAM} stroke={MUTED} className="am1m-pulse" />

      <g className="am1m-descend">
        <M x="250" y="140" size="18">(n-1)(n-3) ... 4 . 2</M>
        <Wire d="M120 160 L380 160" stroke={N} width="2" />
        <M x="250" y="190" size="18">n(n-2) ... 5 . 3</M>
        <M x="250" y="240" size="18" fill={BLUE}>= rational</M>
      </g>

      <g className="am1m-descend">
        <M x="650" y="140" size="18">(n-1)(n-3) ... 3 . 1</M>
        <Wire d="M520 160 L780 160" stroke={N} width="2" />
        <M x="650" y="190" size="18">n(n-2) ... 4 . 2</M>
        <Block x="790" y="150" w="70" h="30" label="x pi/2" stroke={AMBER} fill={SKY} className="am1m-pop" />
      </g>

      <Block x="150" y="380" w="200" h="40" label="n = 7 -&gt; 16/35" stroke={BLUE} className="am1m-insert" />
      <Block x="550" y="380" w="200" h="40" label="n = 8 -&gt; 35 pi/256" stroke={AMBER} className="am1m-insert" />
    </Scene>
  )
}

export function M3MixedPowerGridWalkScene() {
  return (
    <Scene caption="Reduction formula for sin^m x cos^n x">
      <Axes x="100" y="450" w="700" h="350" xLabel="m (sin power)" yLabel="n (cos power)" origin="left" />
      
      {[0, 1, 2, 3, 4, 5, 6].map(m => <M key={`m${m}`} x={100 + m*100} y="470" size="12" fill={MUTED}>{m}</M>)}
      {[0, 1, 2, 3, 4].map(n => <M key={`n${n}`} x="80" y={450 - n*80 + 4} size="12" fill={MUTED} anchor="end">{n}</M>)}

      <Dot cx="600" cy="130" r="6" fill={BLUE} className="am1m-pulse" />
      <L x="615" y="125" size="15" fill={BLUE} anchor="start">(5, 4)</L>

      <Wire d="M600 130 L420 130" stroke={BLUE} width="3" marker="url(#am1ArrB)" className="am1m-rewire" />
      <L x="510" y="115" size="14" fill={BLUE}>4/9</L>

      <Dot cx="400" cy="130" r="6" fill={BLUE} />
      
      <Wire d="M400 130 L220 130" stroke={BLUE} width="3" marker="url(#am1ArrB)" className="am1m-rewire" />
      <L x="310" y="115" size="14" fill={BLUE}>2/7</L>
      
      <Dot cx="200" cy="130" r="6" fill={GREEN} />
      <Block x="80" y="70" w="240" h="40" label="integral sin x cos^4 x dx = -cos^5 x / 5" stroke={GREEN} className="am1m-insert" />
      
      <Wire d="M600 130 L600 270" stroke={ROSE} width="3" marker="url(#am1ArrRo)" dash="4 4" className="am1m-insert" />
      <L x="615" y="210" size="14" fill={ROSE} anchor="start" className="am1m-insert">companion formula</L>
      <Dot cx="600" cy="290" r="6" fill={ROSE} className="am1m-insert" />
    </Scene>
  )
}

export function M3ThreeCountdownFractionScene() {
  return (
    <Scene caption="Wallis's formula for sin^m x cos^n x">
      <Wire d="M100 160 L600 160" stroke={N} width="3" className="am1m-pulse" />
      
      <Block x="120" y="100" w="220" h="40" label="m-1, m-3, ... (to 1 or 2)" stroke={BLUE} fill={SKY} className="am1m-descend" />
      <Block x="360" y="100" w="220" h="40" label="n-1, n-3, ... (to 1 or 2)" stroke={AMBER} fill={CREAM} className="am1m-descend" />
      
      <Block x="180" y="180" w="340" h="40" label="m+n, m+n-2, ... (to 1 or 2)" stroke={MUTED} className="am1m-descend" />
      
      <Block x="640" y="100" w="180" h="40" label="both even -&gt; x pi/2" stroke={GREEN} className="am1m-pulse" />
      <Block x="640" y="180" w="180" h="40" label="either odd -&gt; x 1" stroke={MUTED} className="am1m-pulse" />
      
      <Block x="180" y="320" w="200" h="40" label="sin^4 cos^2 -&gt; pi/32" stroke={GREEN} className="am1m-insert" />
      <Block x="450" y="320" w="200" h="40" label="sin^5 cos^4 -&gt; 8/315" stroke={MUTED} className="am1m-insert" />
    </Scene>
  )
}

export function M3IndefiniteVsDefiniteSplitScene() {
  return (
    <Scene caption="Indefinite formula vs Wallis's formula">
      <Wire d="M450 40 L450 420" stroke={MUTED} dash="4 4" className="am1m-pulse" />
      
      <L x="225" y="60" size="18" weight="800" fill={BLUE}>Indefinite: integral sin^4 x dx</L>
      
      <g className="am1m-shift">
        <M x="225" y="120" size="14">n = 4: -sin^3 x cos x / 4 + (3/4) I_2</M>
        <Wire d="M225 140 L225 170" stroke={MUTED} marker="url(#am1ArrM)" />
      </g>
      
      <g className="am1m-shift">
        <M x="225" y="200" size="14">n = 2: -sin x cos x / 2 + x / 2</M>
        <Wire d="M225 220 L225 250" stroke={MUTED} marker="url(#am1ArrM)" />
      </g>
      
      <Block x="25" y="270" w="400" h="40" label="-sin^3 x cos x / 4 - (3/8) sin x cos x + (3/8) x" stroke={BLUE} className="am1m-insert" mono={true} size="12" />

      <L x="675" y="60" size="18" weight="800" fill={GREEN}>Definite: integral_0^(pi/2) cos^6 x dx</L>
      
      <g className="am1m-insert">
        <M x="675" y="160" size="16">5 . 3 . 1</M>
        <Wire d="M620 180 L730 180" stroke={N} width="2" />
        <M x="675" y="210" size="16">6 . 4 . 2</M>
        <M x="770" y="185" size="16">x  pi/2  =  5 pi / 32</M>
      </g>

      <Wire d="M225 330 Q225 400 450 400" stroke={AMBER} width="3" marker="url(#am1ArrA)" fill="none" className="am1m-rewire" />
      <Block x="470" y="380" w="340" h="40" label="put limits 0, pi/2 -&gt; 3 pi/16 = (3.1)/(4.2) x pi/2" stroke={AMBER} className="am1m-pop" mono={true} size="12" />
      <L x="830" y="405" size="24" fill={GREEN} weight="800" className="am1m-pop">✓</L>
    </Scene>
  )
}

export function M3SineSubstitutionMapScene() {
  return (
    <Scene caption="Algebraic integrals turned into Wallis's form">
      <Wire d="M100 120 L300 120" stroke={BLUE} width="4" />
      <Dot cx="100" cy="120" r="5" fill={BLUE} />
      <L x="100" y="145" size="15">0</L>
      <Dot cx="300" cy="120" r="5" fill={BLUE} />
      <L x="300" y="145" size="15">a</L>
      <L x="200" y="100" size="16" fill={BLUE} weight="800">x</L>

      <Wire d="M600 120 A 100 100 0 0 1 700 220" stroke={GREEN} width="4" fill="none" />
      <Wire d="M600 120 L600 220 L700 220" stroke={MUTED} dash="4 4" fill="none" />
      <Dot cx="700" cy="220" r="5" fill={GREEN} />
      <L x="720" y="225" size="15">0</L>
      <Dot cx="600" cy="120" r="5" fill={GREEN} />
      <L x="600" y="100" size="15">pi/2</L>
      <L x="680" y="150" size="16" fill={GREEN} weight="800">theta</L>

      <Wire d="M120 145 Q200 250 680 230" stroke={MUTED} marker="url(#am1ArrM)" fill="none" className="am1m-rewire" />
      <L x="400" y="240" size="14" fill={MUTED}>0 -&gt; 0</L>
      
      <Wire d="M320 110 Q450 60 580 110" stroke={MUTED} marker="url(#am1ArrM)" fill="none" className="am1m-rewire" />
      <L x="450" y="80" size="14" fill={MUTED}>a -&gt; pi/2</L>

      <Block x="360" y="130" w="180" h="40" label="x = a sin theta" stroke={AMBER} className="am1m-pulse" />

      <g transform="translate(400, 270)" className="am1m-insert">
        <Wire d="M0 0 L100 0 L100 -60 Z" stroke={N} fill={CREAM} width="2" />
        <L x="40" y="-40" size="13" anchor="end">a</L>
        <L x="110" y="-30" size="13" anchor="start">x</L>
        <L x="50" y="20" size="13">sqrt(a^2 - x^2) = a cos theta</L>
        <Wire d="M25 0 A 25 25 0 0 0 20 -12" stroke={MUTED} fill="none" />
        <L x="35" y="-6" size="12" fill={MUTED}>theta</L>
      </g>

      <M x="200" y="400" size="16" className="am1m-shift">x^7 / sqrt(a^2 - x^2)  dx</M>
      <Wire d="M320 395 L540 395" stroke={AMBER} width="3" marker="url(#am1ArrA)" className="am1m-rewire" />
      <M x="700" y="400" size="16" className="am1m-shift">a^7 sin^7 theta  d theta</M>
      
      <L x="430" y="420" size="14" fill={RED} className="am1m-insert">a cos theta factors cancel</L>
    </Scene>
  )
}

export function M3TangentFoldInfinityScene() {
  return (
    <Scene caption="Infinite limits and 1 + t^2 handled by t = tan theta">
      <Wire d="M100 150 L350 150" stroke={BLUE} width="4" marker="url(#am1ArrB)" className="am1m-rewire" />
      <Dot cx="100" cy="150" r="5" fill={BLUE} />
      <L x="100" y="175" size="15">0</L>
      <L x="360" y="155" size="18" fill={BLUE} anchor="start">infinity</L>
      <L x="225" y="130" size="16" fill={BLUE} weight="800">t-axis</L>

      <Wire d="M650 150 A 100 100 0 0 0 550 50" stroke={GREEN} width="3" fill="none" />
      <Wire d="M550 150 L650 150" stroke={MUTED} dash="4 4" />
      <Wire d="M550 150 L550 50" stroke={MUTED} dash="4 4" />
      <Dot cx="550" cy="150" r="5" fill={N} />
      <L x="550" y="170" size="15">0</L>
      
      <Wire d="M650 180 L650 30" stroke={MUTED} width="2" />
      
      <Wire d="M550 150 L650 80" stroke={GREEN} width="2" className="am1m-pulse" />
      <Dot cx="650" cy="80" r="5" fill={GREEN} className="am1m-pulse" />
      <L x="665" y="85" size="14" fill={GREEN} anchor="start" className="am1m-pulse">(1, tan theta)</L>
      
      <Wire d="M580 150 A 30 30 0 0 0 575 130" stroke={MUTED} fill="none" />
      <L x="590" y="145" size="12" fill={MUTED}>theta</L>

      <Wire d="M250 180 Q400 300 550 200" stroke={AMBER} width="3" marker="url(#am1ArrA)" fill="none" className="am1m-return" />
      <Block x="310" y="240" w="180" h="40" label="t = tan theta" stroke={AMBER} className="am1m-return" />

      <Panel x="150" y="320" w="600" title="Exponent ledger" accent={PURP} className="am1m-insert" rows={[
        ["numerator tan^6", "sin^6 / cos^6"],
        ["denominator (1 + t^2)^7", "sec^14"],
        ["dt", "sec^2 d theta"]
      ]} />
      <Block x="200" y="460" w="500" h="40" label="cos power: 14 - 2 - 6 = 6" stroke={PURP} fill={SKY} className="am1m-pulse" />
    </Scene>
  )
}

export function M3AngleRescalePipelineScene() {
  return (
    <Scene caption="Multiple angles and shifted limits reduced to Wallis's form">
      <Block x="50" y="60" w="220" h="60" label="cos^4 3theta sin^3 6theta" sub="0 to pi/6" stroke={BLUE} className="am1m-insert" />
      
      <Wire d="M270 90 L380 90" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-rewire" />
      <L x="325" y="70" size="12" fill={BLUE}>sin 6theta = 2 sin 3theta cos 3theta</L>
      
      <Block x="380" y="60" w="220" h="60" label="8 sin^3 3theta cos^7 3theta" sub="0 to pi/6" stroke={BLUE} className="am1m-insert" />
      
      <Wire d="M600 90 L710 90" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-rewire" />
      <L x="655" y="70" size="12" fill={BLUE}>x = 3theta, d theta = dx/3</L>
      
      <Block x="710" y="60" w="180" h="60" label="(8/3) sin^3 x cos^7 x" sub="0 to pi/2" stroke={GREEN} className="am1m-insert" />
      
      <Wire d="M800 120 L800 180" stroke={GREEN} marker="url(#am1ArrG)" className="am1m-rewire" />
      <Block x="760" y="180" w="80" h="40" label="1/15" stroke={GREEN} className="am1m-pop" />

      <g className="am1m-shift" opacity="0.6">
        <Block x="50" y="300" w="220" h="60" label="x^2 sqrt(2ax - x^2)" sub="0 to 2a" stroke={MUTED} />
        
        <Wire d="M270 330 L380 330" stroke={MUTED} marker="url(#am1ArrM)" />
        <L x="325" y="310" size="12" fill={MUTED}>x = 2a sin^2 theta</L>
        
        <Block x="380" y="300" w="220" h="60" label="32 a^4 sin^6 cos^2" sub="0 to pi/2" stroke={MUTED} />
        
        <Wire d="M600 330 L710 330" stroke={MUTED} marker="url(#am1ArrM)" />
        <Block x="710" y="300" w="140" h="60" label="5 pi a^4/8" stroke={MUTED} fill={CREAM} />
      </g>
    </Scene>
  )
}

export function M3RectangleStripSweepScene() {
  return (
    <Scene caption="Double integral as a limit of sums over a rectangle">
      <Axes x="60" y="400" w="280" h="280" xLabel="x" yLabel="y" />
      <M x="260" y="420" size="14">2</M>
      <M x="40" y="200" size="14">1</M>

      <g className="am1m-insert">
        {[...Array(11)].map((_, i) => (
          <Wire key={`v${i}`} d={`M${60 + i*20} 200 L${60 + i*20} 400`} stroke={MUTED} opacity="0.3" width="1" />
        ))}
        {[...Array(11)].map((_, i) => (
          <Wire key={`h${i}`} d={`M60 ${200 + i*20} L260 ${200 + i*20}`} stroke={MUTED} opacity="0.3" width="1" />
        ))}
        <rect x="140" y="280" width="20" height="20" fill={BLUE} opacity="0.5" />
        <Dot cx="150" cy="290" r="3" fill={N} />
        <Wire d="M150 290 L100 240" stroke={N} width="1.5" />
        <L x="90" y="235" size="12">dA = dx dy, (x_r, y_r)</L>
      </g>

      <g className="am1m-shift">
        <rect x="180" y="200" width="20" height="200" fill={BLUE} opacity="0.3" />
        <Wire d="M190 380 L190 220" stroke={BLUE} width="2" marker="url(#am1ArrB)" />
        <L x="210" y="300" size="13" fill={BLUE} anchor="start">integrate in y, x fixed</L>
        
        <Wire d="M60 440 L260 440" stroke={AMBER} width="3" marker="url(#am1ArrA)" />
        <L x="160" y="460" size="14" fill={AMBER}>sweep strip from x = 0 to 2</L>
      </g>

      <M x="425" y="300" size="30" className="am1m-pop">=</M>

      <Axes x="550" y="400" w="280" h="280" xLabel="x" yLabel="y" />
      <M x="750" y="420" size="14">2</M>
      <M x="530" y="200" size="14">1</M>

      <rect x="550" y="200" width="200" height="200" fill={SKY} opacity="0.2" stroke={BLUE} />

      <g className="am1m-shift">
        <rect x="550" y="260" width="200" height="20" fill={GREEN} opacity="0.3" />
        <Wire d="M570 270 L730 270" stroke={GREEN} width="2" marker="url(#am1ArrG)" />
        <L x="650" y="250" size="13" fill={GREEN}>integrate in x, y fixed</L>
        
        <Wire d="M490 400 L490 200" stroke={AMBER} width="3" marker="url(#am1ArrA)" />
        <L x="470" y="300" size="14" fill={AMBER} anchor="end">sweep from y = 0 to 1</L>
      </g>
    </Scene>
  )
}

export function M3ParabolaStripComparisonScene() {
  const parabolaPath = []
  for(let x=0; x<=200; x+=10) {
    const y = (x*x)/400
    parabolaPath.push(`${x===0 ? 'M' : 'L'}${100+x} ${350-y}`)
  }
  const rightParabolaPath = []
  for(let x=0; x<=200; x+=10) {
    const y = (x*x)/400
    rightParabolaPath.push(`${x===0 ? 'M' : 'L'}${500+x} ${350-y}`)
  }
  
  return (
    <Scene caption="Double integrals with variable limits: vertical vs horizontal strips">
      <Axes x="100" y="350" w="250" h="150" xLabel="x" yLabel="y" />
      <Axes x="500" y="350" w="250" h="150" xLabel="x" yLabel="y" />

      <path d={`${parabolaPath.join(' ')} L300 350 Z`} fill={SKY} opacity="0.3" />
      <Wire d={parabolaPath.join(' ')} stroke={BLUE} width="2" className="am1m-traverse" />
      <Wire d="M300 350 L300 200" stroke={BLUE} width="2" className="am1m-traverse" />
      <Dot cx="300" cy="250" r="5" fill={N} className="am1m-pulse" />
      <L x="315" y="240" size="14">L(2a, a)</L>

      <g className="am1m-descend">
        <rect x="240" y="301" width="16" height="49" fill={BLUE} opacity="0.5" />
        <L x="248" y="291" size="13" fill={BLUE}>Q: y = x^2/4a</L>
        <L x="248" y="365" size="13" fill={BLUE}>P: y = 0</L>
        
        <Wire d="M100 390 L300 390" stroke={AMBER} width="3" marker="url(#am1ArrA)" />
        <L x="200" y="410" size="14" fill={AMBER}>x: 0 to 2a</L>
      </g>

      <path d={`${rightParabolaPath.join(' ')} L700 350 Z`} fill={SKY} opacity="0.3" />
      <Wire d={rightParabolaPath.join(' ')} stroke={BLUE} width="2" className="am1m-traverse" />
      <Wire d="M700 350 L700 200" stroke={BLUE} width="2" className="am1m-traverse" />
      <Dot cx="700" cy="250" r="5" fill={N} className="am1m-pulse" />
      <L x="715" y="240" size="14">L(2a, a)</L>

      <g className="am1m-shift">
        <rect x="660" y="278" width="40" height="16" fill={GREEN} opacity="0.5" />
        <L x="640" y="290" size="13" fill={GREEN} anchor="end">R: x = 2 sqrt(ay)</L>
        <L x="710" y="290" size="13" fill={GREEN} anchor="start">S: x = 2a</L>
        
        <Wire d="M450 350 L450 250" stroke={AMBER} width="3" marker="url(#am1ArrA)" />
        <L x="430" y="300" size="14" fill={AMBER} anchor="end">y: 0 to a</L>
      </g>

      <Block x="360" y="450" w="180" h="40" label="Result = a^4 / 3" stroke={PURP} fill={CREAM} className="am1m-pop" />
    </Scene>
  )
}

export function M3NestedBoxIntegralsScene() {
  return (
    <Scene caption="Triple integrals: evaluation over a box">
      <g transform="translate(150, 350)">
        <Wire d="M0 0 L150 -50" stroke={MUTED} width="2" marker="url(#am1ArrM)" />
        <L x="160" y="-55" size="14">y (0 to 2)</L>
        
        <Wire d="M0 0 L0 -200" stroke={MUTED} width="2" marker="url(#am1ArrM)" />
        <L x="0" y="-210" size="14">z (0 to 3)</L>
        
        <Wire d="M0 0 L-100 50" stroke={MUTED} width="2" marker="url(#am1ArrM)" />
        <L x="-125" y="90" size="14" anchor="start">x (0 to 1)</L>

        <Wire d="M0 -150 L100 -180 L100 -30 Z" stroke={MUTED} fill="none" dash="2 4" />
        <Wire d="M-60 30 L40 0 L40 -150 L-60 -120 Z" stroke={MUTED} fill="none" />

        <g className="am1m-descend">
          <path d="M-30 15 L-10 8 L-10 -142 L-30 -135 Z" fill={BLUE} opacity="0.4" />
          <L x="115" y="-160" size="13" fill={BLUE} anchor="start">integrate z: 0 to 3</L>
        </g>

        <g className="am1m-shift">
          <path d="M-50 25 L50 -8 L50 -158 L-50 -125 Z" fill={GREEN} opacity="0.3" />
          <L x="60" y="-140" size="13" fill={GREEN} anchor="start">integrate y: 0 to 2</L>
        </g>

        <g className="am1m-pulse">
          <path d="M-60 30 L40 0 L40 -150 L-60 -120 Z" fill={AMBER} opacity="0.2" />
          <L x="-85" y="65" size="13" fill={AMBER} anchor="start">integrate x: 0 to 1</L>
        </g>

        <g className="am1m-insert">
          <path d="M-10 -60 L0 45" stroke={N} strokeWidth="1.3" strokeDasharray="2 3" fill="none" opacity="0.6" />
          <L x="0" y="63" size="13">dV = dx dy dz</L>
        </g>
      </g>

      <Block x="450" y="80" w="360" h="300" stroke={AMBER} className="am1m-pulse" />
      <Block x="500" y="140" w="260" h="220" stroke={GREEN} className="am1m-shift" />
      <Block x="550" y="200" w="160" h="140" stroke={BLUE} className="am1m-descend" />
      <L x="462" y="102" size="18" fill={AMBER} anchor="start">x</L>
      <L x="512" y="162" size="18" fill={GREEN} anchor="start">y</L>
      <L x="562" y="222" size="18" fill={BLUE} anchor="start">z</L>

      <Wire d="M630 200 L630 140" stroke={RED} width="3" marker="url(#am1ArrR)" className="am1m-rewire" />
      <L x="630" y="128" size="14" fill={RED}>evaluate this way</L>
    </Scene>
  )
}

export function M3OctantLimitChainScene() {
  return (
    <Scene caption="Triple integrals with variable limits over a curved solid">
      <g transform="translate(180, 360)">
        <Wire d="M0 0 L150 -50" stroke={MUTED} width="2" marker="url(#am1ArrM)" />
        <L x="165" y="-50" size="15">y</L>
        <Wire d="M0 0 L0 -200" stroke={MUTED} width="2" marker="url(#am1ArrM)" />
        <L x="0" y="-210" size="15">z</L>
        <Wire d="M0 0 L-150 50" stroke={MUTED} width="2" marker="url(#am1ArrM)" />
        <L x="-160" y="55" size="15">x</L>

        <Wire d="M0 -140 A 140 140 0 0 1 133 -44" stroke={BLUE} width="2" fill="none" />
        <Wire d="M0 -140 A 140 140 0 0 0 -133 44" stroke={BLUE} width="2" fill="none" />
        <Wire d="M-133 44 A 140 60 0 0 0 133 -44" stroke={BLUE} width="2" fill="none" />
        <path d="M0 0 L0 -140 A 140 140 0 0 1 133 -44 A 140 60 0 0 1 -133 44 A 140 140 0 0 1 0 -140 Z" fill={SKY} opacity="0.3" />

        <g className="am1m-insert">
          <rect x="-40" y="-100" width="10" height="90" fill={BLUE} opacity="0.5" />
          <L x="-20" y="-110" size="13" fill={BLUE} anchor="start">z: 0 to sqrt(1 - x^2 - y^2)</L>
        </g>
        
        <g className="am1m-shift">
          <Wire d="M-40 -10 L10 -27" stroke={GREEN} width="6" />
          <L x="-5" y="-35" size="13" fill={GREEN} anchor="start">y: 0 to sqrt(1 - x^2)</L>
        </g>

        <g className="am1m-pulse">
          <Wire d="M0 0 L-133 44" stroke={AMBER} width="3" marker="url(#am1ArrA)" />
          <L x="-70" y="40" size="13" fill={AMBER} anchor="end">x: 0 to 1</L>
        </g>
      </g>

      <Block x="450" y="80" w="300" h="60" label="z (depends on x, y)" stroke={BLUE} className="am1m-insert" />
      <Wire d="M600 140 L600 200" stroke={N} width="2" marker="url(#am1Arr)" className="am1m-rewire" />
      
      <Block x="450" y="200" w="300" h="60" label="y (depends on x)" stroke={GREEN} className="am1m-shift" />
      <Wire d="M600 260 L600 320" stroke={N} width="2" marker="url(#am1Arr)" className="am1m-rewire" />
      
      <Block x="450" y="320" w="300" h="60" label="x (constants)" stroke={AMBER} className="am1m-pulse" />
    </Scene>
  )
}

export function M3TwinParabolaAreaScene() {
  const p1 = []
  for(let x=0; x<=220; x+=10) {
    p1.push(`${x===0 ? 'M' : 'L'}${150+x} ${400 - (x*x)/200}`)
  }
  const p2 = []
  for(let x=0; x<=220; x+=10) {
    p2.push(`${x===0 ? 'M' : 'L'}${150+x} ${400 - Math.sqrt(200*x)}`)
  }

  const lens = p1.slice(0, 21).join(' ') + ' ' + 
               p2.slice(0, 21).reverse().join(' ').replace(/M/g, 'L') + ' Z'

  return (
    <Scene caption="Area of a region by double integration">
      <Axes x="150" y="400" w="300" h="300" xLabel="x" yLabel="y" />
      
      <Wire d={p1.join(' ')} stroke={BLUE} width="2" className="am1m-traverse" />
      <Wire d={p2.join(' ')} stroke={GREEN} width="2" className="am1m-traverse" />

      <path d={lens} fill={SKY} opacity="0.4" className="am1m-insert" />
      
      <Dot cx="150" cy="400" r="5" fill={N} className="am1m-pulse" />
      <L x="135" y="415" size="14">O(0, 0)</L>

      <Dot cx="350" cy="200" r="5" fill={N} className="am1m-pulse" />
      <L x="365" y="190" size="14">A(4a, 4a)</L>

      <g className="am1m-insert">
        <rect x="246" y="259" width="8" height="91" fill={BLUE} opacity="0.5" />
        <L x="260" y="265" size="13" fill={GREEN} anchor="start">Q: y = 2 sqrt(ax)</L>
        <L x="260" y="345" size="13" fill={BLUE} anchor="start">P: y = x^2/4a</L>
      </g>

      <g className="am1m-shift">
        <Wire d="M150 440 L150 450 L350 450 L350 440" stroke={AMBER} width="2" fill="none" />
        <L x="250" y="465" size="14" fill={AMBER}>x: 0 to 4a</L>
      </g>

      <Block x="550" y="80" w="200" h="50" label="A = 16a^2 / 3" stroke={PURP} fill={CREAM} className="am1m-pop" size="18" />
    </Scene>
  )
}

export function M3CardioidOutsideCircleScene() {
  const card = []
  for(let i=0; i<=120; i++) {
    const th = -Math.PI/2 + (i/120) * 2 * Math.PI
    const r = 100 * (1 + Math.cos(th))
    card.push(`${i===0 ? 'M' : 'L'}${(300 + r*Math.cos(th)).toFixed(1)} ${(260 - r*Math.sin(th)).toFixed(1)}`)
  }

  const cres = []
  for(let i=0; i<=60; i++) {
    const th = -Math.PI/2 + (i/60) * Math.PI
    const r = 100 * (1 + Math.cos(th))
    cres.push(`${i===0 ? 'M' : 'L'}${(300 + r*Math.cos(th)).toFixed(1)} ${(260 - r*Math.sin(th)).toFixed(1)}`)
  }
  for(let i=0; i<=60; i++) {
    const th = Math.PI/2 - (i/60) * Math.PI
    const r = 100
    cres.push(`L${(300 + r*Math.cos(th)).toFixed(1)} ${(260 - r*Math.sin(th)).toFixed(1)}`)
  }
  cres.push('Z')

  const upperCres = []
  for(let i=0; i<=30; i++) {
    const th = (i/30) * Math.PI/2
    const r = 100 * (1 + Math.cos(th))
    upperCres.push(`${i===0 ? 'M' : 'L'}${(300 + r*Math.cos(th)).toFixed(1)} ${(260 - r*Math.sin(th)).toFixed(1)}`)
  }
  for(let i=0; i<=30; i++) {
    const th = Math.PI/2 - (i/30) * Math.PI/2
    const r = 100
    upperCres.push(`L${(300 + r*Math.cos(th)).toFixed(1)} ${(260 - r*Math.sin(th)).toFixed(1)}`)
  }
  upperCres.push('Z')

  return (
    <Scene caption="Area of a region in polar coordinates">
      <Wire d="M100 260 L600 260" stroke={MUTED} width="2" marker="url(#am1ArrM)" />
      <L x="300" y="275" size="15">O</L>

      <circle cx="300" cy="260" r="100" fill="none" stroke={BLUE} strokeWidth="2" strokeDasharray="4 4" className="am1m-traverse" />
      <Wire d={card.join(' ')} stroke={BLUE} width="2" className="am1m-traverse" />

      <path d={cres.join(' ')} fill={SKY} opacity="0.4" className="am1m-insert" />
      <path d={upperCres.join(' ')} fill={BLUE} opacity="0.3" className="am1m-insert" />

      <g className="am1m-wrap" style={{ transformOrigin: '300px 260px' }}>
        <Wire d="M300 260 L461.6 166.7" stroke={AMBER} width="3" />
        <Dot cx="386.6" cy="210" r="5" fill={N} />
        <L x="386" y="195" size="13" fill={BLUE} anchor="end">P' (r = a)</L>
        <Dot cx="461.6" cy="166.7" r="5" fill={N} />
        <L x="470" y="160" size="13" fill={BLUE} anchor="start">P (r = a(1 + cos theta))</L>
      </g>

      <g transform="translate(60, 60)" className="am1m-pop">
        <rect x="0" y="0" width="140" height="100" rx="8" fill={WHITE} stroke={MUTED} />
        <path d="M40 70 Q70 65 100 70 L90 40 Q65 35 45 45 Z" fill={SKY} stroke={BLUE} />
        <L x="70" y="85" size="12">r d theta</L>
        <L x="20" y="60" size="12">dr</L>
      </g>

      <Block x="580" y="320" w="220" h="40" label="theta: 0 to pi/2, then double" stroke={GREEN} className="am1m-insert" />
      <Wire d="M600 320 Q550 250 400 200" stroke={GREEN} marker="url(#am1ArrG)" fill="none" className="am1m-rewire" />
    </Scene>
  )
}

/* ── Module 4 ────────────────────────────────────────────────────────── */

export function M4VectorDerivativeRulesScene() {
  return (
    <Scene caption="Product rules for vector differentiation">
      {/* Dot Product Rule */}
      <rect x="150" y="100" width="250" height="80" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="2" />
      <L x="275" y="145" size="18" fill={MUTED}>Dot Product Rule</L>

      <rect x="420" y="100" width="350" height="80" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="595" y="145" size="18" fill={BLUE}>d(F·G)/dt = dF/dt·G + F·dG/dt</M>

      {/* Cross Product Rule */}
      <rect x="150" y="240" width="250" height="80" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="2" />
      <L x="275" y="285" size="18" fill={MUTED}>Cross Product Rule</L>

      <rect x="420" y="240" width="350" height="80" rx="8" fill={CREAM} stroke={AMBER} strokeWidth="2" />
      <M x="595" y="285" size="18" fill={N}>
        d(F×G)/dt = dF/dt×<tspan fill={AMBER} className="am1m-pulse">G</tspan> + <tspan fill={AMBER} className="am1m-pulse">F</tspan>×dG/dt
      </M>
      <L x="595" y="340" size="14" fill={AMBER}>order matters!</L>
    </Scene>
  )
}

export function M4VelocityTangentCurveScene() {
  return (
    <Scene caption="Velocity and acceleration on a space curve">
      {/* 3D-like axes */}
      <Wire d="M150 400 L150 150" marker="url(#am1ArrM)" stroke={MUTED} />
      <Wire d="M150 400 L400 400" marker="url(#am1ArrM)" stroke={MUTED} />
      <Wire d="M150 400 L50 450" marker="url(#am1ArrM)" stroke={MUTED} />
      <M x="140" y="140" fill={MUTED}>z</M>
      <M x="410" y="410" fill={MUTED}>y</M>
      <M x="40" y="460" fill={MUTED}>x</M>

      {/* Curve */}
      <path d="M200 350 Q400 50 600 300" fill="none" stroke={BLUE} strokeWidth="3" />
      <L x="620" y="310" fill={BLUE} size="16">C</L>

      {/* Point P */}
      <Dot cx="400" cy="187.5" r="5" fill={N} />
      <L x="385" y="175" size="16">P</L>

      {/* Position vector R */}
      <Wire d="M150 400 L395 190" marker="url(#am1ArrM)" stroke={MUTED} width="2" />
      <M x="260" y="300" fill={MUTED} size="16">R(t)</M>

      {/* Velocity vector v */}
      <Wire d="M400 187.5 L550 168.75" marker="url(#am1ArrG)" stroke={GREEN} width="3" />
      <M x="560" y="165" fill={GREEN} size="16">v = dR/dt</M>

      {/* Acceleration vector a */}
      <Wire d="M400 187.5 L400 287.5" marker="url(#am1ArrR)" stroke={RED} width="3" />
      <M x="410" y="300" fill={RED} size="16">a = d²R/dt²</M>
    </Scene>
  )
}

export function M4NormalTangentialAccelScene() {
  return (
    <Scene caption="Tangential and normal components of acceleration">
      <path d="M150 400 Q450 100 750 400" fill="none" stroke={BLUE} strokeWidth="3" />
      
      {/* P at t=0.5: x=450, y=250. Tangent is horizontal. */}
      <Dot cx="450" cy="250" r="5" fill={N} />
      <L x="440" y="235" size="16">P</L>
      
      {/* Total acceleration a - pointing inwards and somewhat forward */}
      <Wire d="M450 250 L550 350" marker="url(#am1ArrR)" stroke={RED} width="3" />
      <M x="560" y="365" fill={RED} size="16">a</M>
      
      {/* Components */}
      <Wire d="M450 250 L550 250" marker="url(#am1ArrA)" stroke={AMBER} width="3" />
      <M x="560" y="245" fill={AMBER} size="16">a_t</M>
      
      <Wire d="M450 250 L450 350" marker="url(#am1ArrP)" stroke={PURP} width="3" />
      <M x="440" y="365" fill={PURP} size="16" anchor="end">a_n</M>
      
      {/* Rectangle */}
      <Wire d="M550 250 L550 350" stroke={MUTED} dash="4 4" width="2" />
      <Wire d="M450 350 L550 350" stroke={MUTED} dash="4 4" width="2" />
    </Scene>
  )
}

export function M4ScalarVectorFieldsComparisonScene() {
  const points = [
    [0, 0], [1, 0], [2, 0],
    [0, 1], [1, 1], [2, 1],
    [0, 2], [1, 2], [2, 2]
  ]
  return (
    <Scene caption="Scalar fields (magnitudes) vs Vector fields (arrows)">
      {/* Left: Scalar Field */}
      <L x="250" y="80" size="18" weight="800">Scalar Field (e.g., Temperature)</L>
      <g transform="translate(150, 120)">
        {points.map(([x, y]) => (
          <g key={`s-${x}-${y}`}>
            <Dot cx={x * 100} cy={y * 100} r="4" fill={MUTED} />
            <M x={x * 100} y={y * 100 - 10} size="14" fill={AMBER}>{20 + x * 2 + y * 3}</M>
          </g>
        ))}
        {/* Grid lines */}
        {[0, 1, 2].map(i => (
          <g key={`sl-${i}`}>
            <Wire d={`M0 ${i*100} L200 ${i*100}`} stroke={MUTED} opacity="0.2" />
            <Wire d={`M${i*100} 0 L${i*100} 200`} stroke={MUTED} opacity="0.2" />
          </g>
        ))}
      </g>

      {/* Right: Vector Field */}
      <Wire d="M450 50 L450 450" stroke={MUTED} opacity="0.3" />
      <L x="650" y="80" size="18" weight="800">Vector Field (e.g., Wind)</L>
      <g transform="translate(550, 120)">
        {points.map(([x, y]) => {
          const dx = 20 + y * 10
          const dy = -10 - x * 5
          return (
            <g key={`v-${x}-${y}`}>
              <Dot cx={x * 100} cy={y * 100} r="4" fill={MUTED} />
              <Wire d={`M${x * 100} ${y * 100} l${dx} ${dy}`} stroke={BLUE} marker="url(#am1ArrB)" width="2" />
            </g>
          )
        })}
        {/* Grid lines */}
        {[0, 1, 2].map(i => (
          <g key={`vl-${i}`}>
            <Wire d={`M0 ${i*100} L200 ${i*100}`} stroke={MUTED} opacity="0.2" />
            <Wire d={`M${i*100} 0 L${i*100} 200`} stroke={MUTED} opacity="0.2" />
          </g>
        ))}
      </g>
    </Scene>
  )
}

export function M4DelOperatorAnatomyScene() {
  return (
    <Scene caption="Anatomy of the Del operator">
      <rect x="150" y="200" width="600" height="120" rx="16" fill={WHITE} stroke={MUTED} strokeWidth="2" />
      <M x="200" y="270" size="48">∇ =</M>
      
      <M x="300" y="270" size="36" fill={BLUE}>i</M>
      <M x="360" y="270" size="36" fill={RED}>(∂/∂x)</M>
      
      <M x="460" y="270" size="36">+</M>
      
      <M x="510" y="270" size="36" fill={BLUE}>j</M>
      <M x="570" y="270" size="36" fill={RED}>(∂/∂y)</M>
      
      <M x="670" y="270" size="36">+</M>
      
      <M x="720" y="270" size="36" fill={BLUE}>k</M>
      <M x="780" y="270" size="36" fill={RED}>(∂/∂z)</M>

      {/* Labels */}
      <Wire d="M300 300 L300 360" marker="url(#am1ArrB)" stroke={BLUE} width="2" />
      <L x="300" y="380" fill={BLUE} size="16">vector part</L>

      <Wire d="M360 180 L360 120" marker="url(#am1ArrR)" stroke={RED} width="2" />
      <L x="360" y="100" fill={RED} size="16">differential part</L>
    </Scene>
  )
}

export function M4GradientUphillNormalScene() {
  return (
    <Scene caption="Gradient points uphill, normal to level curves">
      <g transform="translate(450, 450)">
        {/* Contours */}
        <path d="M-300 0 A 300 150 0 0 1 300 0" fill="none" stroke={MUTED} strokeWidth="2" />
        <M x="310" y="0" fill={MUTED} anchor="start">10</M>
        
        <path d="M-200 -50 A 200 100 0 0 1 200 -50" fill="none" stroke={MUTED} strokeWidth="2" />
        <M x="210" y="-50" fill={MUTED} anchor="start">20</M>

        <path d="M-100 -100 A 100 50 0 0 1 100 -100" fill="none" stroke={MUTED} strokeWidth="2" />
        <M x="110" y="-100" fill={MUTED} anchor="start">30</M>
        
        {/* Gradients */}
        <Dot cx="0" cy="-150" r="5" fill={N} />
        <Wire d="M0 -150 L0 -230" stroke={RED} width="3" marker="url(#am1ArrR)" />
        <M x="10" y="-240" fill={RED} anchor="start">grad f</M>
        
        <Dot cx="-200" cy="-112" r="5" fill={N} />
        <Wire d="M-200 -112 L-150 -224" stroke={RED} width="3" marker="url(#am1ArrR)" />
        <M x="-160" y="-234" fill={RED} anchor="end">grad f</M>
        
        <Dot cx="120" cy="-130" r="5" fill={N} /> 
        <Wire d="M120 -130 L80 -236" stroke={RED} width="3" marker="url(#am1ArrR)" />
        <M x="90" y="-246" fill={RED} anchor="start">grad f</M>
      </g>
    </Scene>
  )
}

export function M4DirectionalDerivativeProjectionScene() {
  return (
    <Scene caption="Directional derivative as a projection of the gradient">
      <g transform="translate(250, 400)">
        {/* Vector u */}
        <Wire d="M0 0 L300 0" marker="url(#am1Arr)" stroke={N} width="3" />
        <M x="310" y="5" fill={N} anchor="start" size="18">u</M>

        {/* Gradient vector */}
        <Wire d="M0 0 L150 -250" marker="url(#am1ArrR)" stroke={RED} width="3" />
        <M x="160" y="-260" fill={RED} size="18">grad f</M>

        {/* Projection dashed line */}
        <Wire d="M150 -250 L150 0" stroke={MUTED} dash="6 6" width="2" />
        
        {/* Right angle */}
        <Wire d="M135 0 L135 -15 L150 -15" stroke={MUTED} width="1.5" />

        {/* Projected segment (Directional Derivative) */}
        <Wire d="M0 0 L150 0" stroke={BLUE} width="5" />
        <L x="75" y="30" fill={BLUE} size="16">Directional Derivative = (grad f) · u</L>
      </g>
    </Scene>
  )
}

export function M4DivergenceSourceSinkScene() {
  return (
    <Scene caption="Divergence: Source, Sink, or Neither">
      {/* Source */}
      <Card x="50" y="100" w="240" h="300" title="Positive Divergence (Source)">
        <g transform="translate(120, 160)">
          <Dot cx="0" cy="0" r="8" fill={RED} />
          <Wire d="M10 0 L60 0" marker="url(#am1ArrR)" stroke={RED} width="2" />
          <Wire d="M-10 0 L-60 0" marker="url(#am1ArrR)" stroke={RED} width="2" />
          <Wire d="M0 10 L0 60" marker="url(#am1ArrR)" stroke={RED} width="2" />
          <Wire d="M0 -10 L0 -60" marker="url(#am1ArrR)" stroke={RED} width="2" />
          <Wire d="M7 7 L42 42" marker="url(#am1ArrR)" stroke={RED} width="2" />
          <Wire d="M-7 -7 L-42 -42" marker="url(#am1ArrR)" stroke={RED} width="2" />
          <Wire d="M7 -7 L42 -42" marker="url(#am1ArrR)" stroke={RED} width="2" />
          <Wire d="M-7 7 L-42 42" marker="url(#am1ArrR)" stroke={RED} width="2" />
        </g>
      </Card>

      {/* Zero Divergence */}
      <Card x="330" y="100" w="240" h="300" title="Zero Divergence" accent={MUTED}>
        <g transform="translate(120, 160)">
          <rect x="-40" y="-50" width="80" height="100" fill={SKY} stroke={BLUE} strokeDasharray="4 4" />
          {[-30, 0, 30].map(y => (
            <Wire key={y} d={`M-80 ${y} L80 ${y}`} marker="url(#am1Arr)" stroke={N} width="2" />
          ))}
        </g>
      </Card>

      {/* Sink */}
      <Card x="610" y="100" w="240" h="300" title="Negative Divergence (Sink)" accent={BLUE}>
        <g transform="translate(120, 160)">
          <Dot cx="0" cy="0" r="8" fill={BLUE} />
          <Wire d="M70 0 L15 0" marker="url(#am1ArrB)" stroke={BLUE} width="2" />
          <Wire d="M-70 0 L-15 0" marker="url(#am1ArrB)" stroke={BLUE} width="2" />
          <Wire d="M0 70 L0 15" marker="url(#am1ArrB)" stroke={BLUE} width="2" />
          <Wire d="M0 -70 L0 -15" marker="url(#am1ArrB)" stroke={BLUE} width="2" />
          <Wire d="M50 50 L12 12" marker="url(#am1ArrB)" stroke={BLUE} width="2" />
          <Wire d="M-50 -50 L-12 -12" marker="url(#am1ArrB)" stroke={BLUE} width="2" />
          <Wire d="M50 -50 L12 -12" marker="url(#am1ArrB)" stroke={BLUE} width="2" />
          <Wire d="M-50 50 L-12 12" marker="url(#am1ArrB)" stroke={BLUE} width="2" />
        </g>
      </Card>
    </Scene>
  )
}

export function M4CurlPaddleWheelScene() {
  return (
    <Scene caption="Curl measures local rotation (paddle wheel)">
      <g transform="translate(250, 120)">
        {/* Shear Flow */}
        {[0, 1, 2, 3, 4].map(i => {
          const y = i * 50;
          const length = 50 + i * 50; // top slow, bottom fast -> CCW spin
          return (
            <Wire key={`f-${i}`} d={`M0 ${y} l${length} 0`} stroke={BLUE} marker="url(#am1ArrB)" width="2" />
          )
        })}
        
        {/* Paddle Wheel */}
        <g transform="translate(100, 100)"> {/* Centered at i=2 (y=100) */}
          <Dot cx="0" cy="0" r="35" fill="none" stroke={MUTED} strokeWidth="3" />
          <g className="am1m-wrap"> {/* spins CCW */}
            <Wire d="M0 -35 L0 35" stroke={N} width="3" />
            <Wire d="M-35 0 L35 0" stroke={N} width="3" />
            <Wire d="M-24.7 -24.7 L24.7 24.7" stroke={N} width="3" />
            <Wire d="M-24.7 24.7 L24.7 -24.7" stroke={N} width="3" />
          </g>
          {/* Curl Vector pointing OUT */}
          <Dot cx="0" cy="0" r="5" fill={RED} />
          <Wire d="M0 0 L60 -80" stroke={RED} width="4" marker="url(#am1ArrR)" />
          <M x="70" y="-90" fill={RED} size="18">Curl F</M>
        </g>
      </g>
    </Scene>
  )
}

export function M4DivCurlPhysicalScene() {
  return (
    <Scene caption="Physical interpretations of Divergence and Curl">
      <Card x="100" y="100" w="300" h="300" title="Divergence = Expansion">
        <g transform="translate(150, 170)">
          {/* Expanding balloon */}
          <circle cx="0" cy="0" r="50" fill={SKY} stroke={BLUE} strokeWidth="3" className="am1m-wave" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
            const rad = (deg * Math.PI) / 180;
            const x1 = 60 * Math.cos(rad);
            const y1 = 60 * Math.sin(rad);
            const x2 = 100 * Math.cos(rad);
            const y2 = 100 * Math.sin(rad);
            return <Wire key={deg} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={BLUE} width="2" marker="url(#am1ArrB)" />
          })}
        </g>
      </Card>
      
      <Card x="500" y="100" w="300" h="300" title="Curl = Rotation" accent={RED}>
        <g transform="translate(150, 170)">
          {/* Spinning top */}
          <path d="M-40 -20 L40 -20 L0 60 Z" fill={CREAM} stroke={RED} strokeWidth="3" />
          <ellipse cx="0" cy="-20" rx="40" ry="15" fill={WHITE} stroke={RED} strokeWidth="3" />
          <Wire d="M-60 -20 A60 20 0 0 1 60 -20" stroke={RED} dash="4 4" width="2" marker="url(#am1ArrR)" />
          {/* Angular velocity axis */}
          <Wire d="M0 -20 L0 -100" stroke={N} width="4" marker="url(#am1Arr)" />
          <L x="0" y="-115" size="14" weight="800">Angular Velocity = 1/2 Curl V</L>
        </g>
      </Card>
    </Scene>
  )
}

export function M4SecondOrderDelIdentitiesScene() {
  return (
    <Scene caption="Second-order Del operators">
      <g transform="translate(150, 100)">
        <rect width="600" height="80" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="2.5" />
        <M x="300" y="45" size="24" fill={N}>Curl(Grad f) = 0</M>
        <L x="550" y="45" size="18" fill={RED} weight="800">no rotation</L>
      </g>
      
      <g transform="translate(150, 210)">
        <rect width="600" height="80" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="2.5" />
        <M x="300" y="45" size="24" fill={N}>Div(Curl F) = 0</M>
        <L x="550" y="45" size="18" fill={BLUE} weight="800">no source/sink</L>
      </g>

      <g transform="translate(150, 320)">
        <rect width="600" height="80" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="2.5" />
        <M x="300" y="45" size="24" fill={N}>Div(Grad f) = ∇²f</M>
        <L x="550" y="45" size="18" fill={AMBER} weight="800">Laplacian (spreading)</L>
      </g>
    </Scene>
  )
}

export function M4SolenoidalFlowScene() {
  return (
    <Scene caption="Solenoidal vector fields">
      <rect x="250" y="100" width="400" height="300" rx="10" fill={SKY} opacity="0.3" stroke={BLUE} strokeWidth="3" />
      
      {/* Flow arrows */}
      {[130, 200, 270, 340].map(y => (
        <g key={y}>
          {/* entering */}
          <Wire d={`M100 ${y} L280 ${y}`} stroke={BLUE} width="3" marker="url(#am1ArrB)" />
          {/* inside */}
          <Wire d={`M320 ${y} L580 ${y}`} stroke={BLUE} width="3" marker="url(#am1ArrB)" />
          {/* exiting */}
          <Wire d={`M620 ${y} L800 ${y}`} stroke={BLUE} width="3" marker="url(#am1ArrB)" />
        </g>
      ))}

      {/* Box */}
      <rect x="250" y="100" width="400" height="300" rx="10" fill="none" stroke={BLUE} strokeWidth="3" />
      
      {/* Stamp */}
      <g transform="translate(450, 250) rotate(-15)">
        <rect x="-100" y="-40" width="200" height="80" rx="8" fill={WHITE} stroke={RED} strokeWidth="4" />
        <M x="0" y="10" size="32" fill={RED} weight="800">DIV F = 0</M>
      </g>
    </Scene>
  )
}

export function M4SolenoidalConstantProblemScene() {
  return (
    <Scene caption="Finding constants for a solenoidal field">
      <rect x="250" y="100" width="400" height="70" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="2" />
      <M x="450" y="145" size="24" fill={N}>div(F) = 0</M>
      
      <Wire d="M450 170 L450 210" marker="url(#am1ArrM)" stroke={MUTED} width="2" />
      
      <rect x="250" y="210" width="400" height="70" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="450" y="255" size="24" fill={BLUE}>
        1 + 1 + <tspan fill={AMBER}>a</tspan> = 0
      </M>
      
      <Wire d="M450 280 L450 320" marker="url(#am1ArrM)" stroke={MUTED} width="2" />
      
      <rect x="350" y="320" width="200" height="70" rx="8" fill={CREAM} stroke={AMBER} strokeWidth="3" />
      <M x="450" y="365" size="28" fill={AMBER} weight="800">a = -2</M>
    </Scene>
  )
}

export function M4IrrotationalFieldNospinScene() {
  return (
    <Scene caption="Irrotational field has no circulation">
      <g transform="translate(300, 250)">
        {/* Radial Field */}
        <Dot cx="0" cy="0" r="10" fill={BLUE} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(deg => {
          const rad = (deg * Math.PI) / 180;
          const x1 = 30 * Math.cos(rad);
          const y1 = 30 * Math.sin(rad);
          const x2 = 180 * Math.cos(rad);
          const y2 = 180 * Math.sin(rad);
          return <Wire key={deg} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={BLUE} width="3" marker="url(#am1ArrB)" />
        })}
        
        {/* Paddle Wheel (not spinning) */}
        <g transform="translate(100, 0)">
          <Dot cx="0" cy="0" r="30" fill={WHITE} stroke={MUTED} strokeWidth="3" />
          <Wire d="M0 -30 L0 30" stroke={MUTED} width="3" />
          <Wire d="M-30 0 L30 0" stroke={MUTED} width="3" />
        </g>
      </g>
      
      {/* Stamp */}
      <g transform="translate(600, 200) rotate(10)">
        <rect x="-100" y="-40" width="200" height="80" rx="8" fill={WHITE} stroke={GREEN} strokeWidth="4" />
        <M x="0" y="10" size="32" fill={GREEN} weight="800">CURL F = 0</M>
      </g>
    </Scene>
  )
}

export function M4ScalarPotentialConceptScene() {
  return (
    <Scene caption="Scalar potential of an irrotational field">
      <Block x="150" y="200" w="220" h="80" label="Scalar Potential φ" stroke={AMBER} fill={CREAM} />
      
      <Wire d="M370 240 L530 240" marker="url(#am1ArrB)" stroke={BLUE} width="4" />
      <L x="450" y="225" size="16" fill={BLUE} weight="800">Gradient (∇φ)</L>
      
      <Block x="530" y="200" w="220" h="80" label="Vector Field F" stroke={BLUE} fill={SKY} />
      
      <Wire d="M640 280 Q640 380 450 380 T260 280" marker="url(#am1ArrR)" stroke={RED} width="3" dash="6 6" />
      <L x="450" y="365" size="16" fill={RED} weight="800">if Irrotational (Curl F = 0)</L>
    </Scene>
  )
}

export function M4PotentialExactDifferentialScene() {
  return (
    <Scene caption="Finding scalar potential via exact differentials">
      <M x="450" y="120" size="24">dφ = (y dx + x dy) + (z dz)</M>
      
      {/* Brackets & Arrows */}
      <Wire d="M350 140 L350 160 L450 160 L450 140" stroke={BLUE} width="2" />
      <Wire d="M400 160 L400 190" marker="url(#am1ArrB)" stroke={BLUE} width="2" />
      <M x="400" y="220" size="20" fill={BLUE}>d(xy)</M>

      <Wire d="M480 140 L480 160 L540 160 L540 140" stroke={RED} width="2" />
      <Wire d="M510 160 L510 190" marker="url(#am1ArrR)" stroke={RED} width="2" />
      <M x="510" y="220" size="20" fill={RED}>d(z²/2)</M>

      {/* Integration line */}
      <rect x="250" y="280" width="400" height="80" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <M x="450" y="330" size="28" fill={N}>∫ dφ = ∫ d(xy) + ∫ d(z²/2)</M>

      <M x="450" y="420" size="32" fill={N} weight="800">φ = xy + z²/2 + C</M>
    </Scene>
  )
}

/* ── Module 5 ────────────────────────────────────────────────────────── */

export function M5ThreeRowMovesScene() {
  return (
    <Scene caption="Elementary row operations and their inverses">
      {/* Panel 1 */}
      <L x="150" y="50" fill={BLUE}>R_23 : swap</L>
      <M x="150" y="80">a  b  c</M>
      <M x="150" y="100">d  e  f</M>
      <M x="150" y="120">g  h  i</M>
      
      <Wire d="M 120 100 C 90 100 90 120 120 120" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-draw" />
      <Wire d="M 120 120 C 90 120 90 100 120 100" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-draw am1m-delay-1" />
      <Wire d="M 150 140 L 150 180" stroke={MUTED} marker="url(#am1Arr)" />

      <M x="150" y="200">a  b  c</M>
      <M x="150" y="220">g  h  i</M>
      <M x="150" y="240">d  e  f</M>

      <g className="am1m-fade-in am1m-delay-4">
        <rect x="70" y="280" width="160" height="100" fill={WHITE} stroke={MUTED} rx="4" />
        <L x="150" y="300" size="14">Inverse: R_23</L>
        <M x="150" y="330">1  0  0</M>
        <M x="150" y="350">0  0  1</M>
        <M x="150" y="370">0  1  0</M>
        <L x="150" y="390" size="12" fill={MUTED}>E</L>
      </g>

      {/* Panel 2 */}
      <L x="450" y="50" fill={AMBER}>kR_2, k ≠ 0</L>
      <M x="450" y="80">a  b  c</M>
      <M x="450" y="100">d  e  f</M>
      <M x="450" y="120">g  h  i</M>

      <Wire d="M 450 140 L 450 180" stroke={MUTED} marker="url(#am1Arr)" />

      <M x="450" y="200">a  b  c</M>
      <rect x="390" y="208" width="120" height="16" fill={AMBER} fillOpacity="0.12" className="am1m-fade-in am1m-delay-2" />
      <M x="450" y="220" fill={AMBER}>kd ke kf</M>
      <M x="450" y="240">g  h  i</M>

      <g className="am1m-fade-in am1m-delay-4">
        <rect x="370" y="280" width="160" height="100" fill={WHITE} stroke={MUTED} rx="4" />
        <L x="450" y="300" size="14">Inverse: (1/k)R_2</L>
        <M x="450" y="330">1  0  0</M>
        <M x="450" y="350">0  k  0</M>
        <M x="450" y="370">0  0  1</M>
        <L x="450" y="390" size="12" fill={MUTED}>E</L>
      </g>

      {/* Panel 3 */}
      <L x="750" y="50" fill={GREEN}>R_3 + pR_1</L>
      <M x="750" y="80">a  b  c</M>
      <M x="750" y="100">d  e  f</M>
      <M x="750" y="120">g  h  i</M>

      <Wire d="M 750 140 L 750 180" stroke={MUTED} marker="url(#am1Arr)" />
      
      <M x="750" y="200">a  b  c</M>
      <M x="750" y="220">d  e  f</M>
      <M x="750" y="240" className="am1m-slide-in am1m-delay-3" fill={GREEN}>g+pa h+pb i+pc</M>
      <Wire d="M 825 200 C 855 200 855 240 825 240" stroke={GREEN} marker="url(#am1ArrG)" dash="4 4" className="am1m-draw am1m-delay-3" />

      <g className="am1m-fade-in am1m-delay-4">
        <rect x="670" y="280" width="160" height="100" fill={WHITE} stroke={MUTED} rx="4" />
        <L x="750" y="300" size="14">Inverse: R_3 - pR_1</L>
        <M x="750" y="330">1  0  0</M>
        <M x="750" y="350">0  1  0</M>
        <M x="750" y="370">p  0  1</M>
        <L x="750" y="390" size="12" fill={MUTED}>E</L>
      </g>

      {/* Banner */}
      <g className="am1m-fade-in am1m-delay-5">
        <rect x="150" y="420" width="600" height="40" fill={SKY} rx="20" />
        <L x="450" y="445" fill={BLUE} size="16">solution set, order and rank unchanged</L>
      </g>
    </Scene>
  )
}

export function M5EchelonStaircaseScene() {
  return (
    <Scene caption="Row echelon form and the staircase pattern">
      <L x="250" y="100">Matrix A</L>
      <g transform="translate(150, 140)">
        <rect x="0" y="0" width="200" height="120" fill="none" stroke={MUTED} rx="4" />
        <M x="50" y="30"> 1</M> <M x="100" y="30"> 3</M> <M x="150" y="30"> 3</M> <M x="200" y="30"> 2</M>
        <M x="50" y="70"> 2</M> <M x="100" y="70"> 6</M> <M x="150" y="70"> 9</M> <M x="200" y="70"> 7</M>
        <M x="50" y="110">-1</M> <M x="100" y="110">-3</M> <M x="150" y="110"> 3</M> <M x="200" y="110"> 4</M>
      </g>

      <Wire d="M 370 180 L 480 180" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-pulse" />
      <L x="425" y="170" fill={BLUE} size="12">R2 - 2R1</L>
      <L x="425" y="200" fill={BLUE} size="12">R3 + R1</L>
      <L x="425" y="215" fill={BLUE} size="12" className="am1m-fade-in am1m-delay-2">then R3 - 2R2</L>

      <L x="650" y="100">Echelon form U</L>
      <g transform="translate(550, 140)">
        {/* Grey shades for free columns */}
        <rect x="75" y="5" width="50" height="130" fill={MUTED} opacity="0.1" className="am1m-fade-in am1m-delay-5" />
        <rect x="175" y="5" width="50" height="130" fill={MUTED} opacity="0.1" className="am1m-fade-in am1m-delay-5" />
        {/* Zero row tint */}
        <rect x="20" y="90" width="210" height="30" fill={RED} opacity="0.05" />

        <rect x="0" y="0" width="200" height="120" fill="none" stroke={MUTED} rx="4" />
        
        <M x="50" y="30">1</M> <M x="100" y="30">3</M> <M x="150" y="30">3</M> <M x="200" y="30">2</M>
        <g className="am1m-fade-in am1m-delay-1">
          <M x="50" y="70">0</M>
          <M x="50" y="110">0</M>
        </g>
        <g className="am1m-fade-in am1m-delay-1">
          <M x="100" y="70">0</M> <M x="150" y="70">3</M> <M x="200" y="70">3</M>
          <M x="100" y="110">0</M> 
        </g>
        <g className="am1m-fade-in am1m-delay-2">
          <M x="150" y="110">0</M> <M x="200" y="110">0</M>
        </g>

        {/* Staircase line */}
        <Wire d="M 20 45 L 125 45 L 125 85 L 220 85 L 220 125" stroke={BLUE} width="3" className="am1m-draw am1m-delay-3" />
        
        {/* Pivots */}
        <circle cx="50" cy="25" r="15" fill="none" stroke={AMBER} strokeWidth="2" className="am1m-fade-in am1m-delay-4" />
        <circle cx="150" cy="65" r="15" fill="none" stroke={AMBER} strokeWidth="2" className="am1m-fade-in am1m-delay-4" />

        <L x="100" y="150" fill={MUTED} size="12" className="am1m-fade-in am1m-delay-5">no pivot: free</L>
        <Wire d="M 100 140 L 100 135" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-fade-in am1m-delay-5" />
        <L x="200" y="150" fill={MUTED} size="12" className="am1m-fade-in am1m-delay-5">free</L>
        <Wire d="M 200 140 L 200 135" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-fade-in am1m-delay-5" />
        <L x="250" y="105" fill={RED} size="12">zero rows last</L>
      </g>

      <g className="am1m-fade-in am1m-delay-5">
        <L x="650" y="320" size="18" fill={BLUE}>rank = number of pivots = 2</L>
      </g>
    </Scene>
  )
}

export function M5MinorSearchScene() {
  return (
    <Scene caption="Finding rank through minors">
      <g transform="translate(250, 150)">
        <M x="50" y="30">1</M> <M x="100" y="30">2</M> <M x="150" y="30">3</M>
        <M x="50" y="70">2</M> <M x="100" y="70">4</M> <M x="150" y="70">6</M>
        <M x="50" y="110">1</M> <M x="100" y="110">0</M> <M x="150" y="110">1</M>

        {/* Orange frame for 3x3 */}
        <rect x="30" y="10" width="140" height="120" fill={AMBER} opacity="0.1" stroke={AMBER} strokeWidth="2" className="am1m-fade-in" />
        <L x="100" y="-10" fill={RED} className="am1m-fade-in am1m-delay-1">3x3 minor: det A = 0 ✗</L>

        {/* Blue frame for 2x2 (rows 1,3 cols 1,2) */}
        <g className="am1m-fade-in am1m-delay-2">
          <rect x="35" y="15" width="80" height="30" fill={BLUE} opacity="0.15" stroke={BLUE} strokeWidth="2" />
          <rect x="35" y="95" width="80" height="30" fill={BLUE} opacity="0.15" stroke={BLUE} strokeWidth="2" />
          <L x="75" y="145" fill={GREEN}>2x2 minor = -2 ✓</L>
        </g>
        <L x="100" y="170" fill={MUTED} size="12">row 2 = 2 × row 1</L>
      </g>

      {/* Ladder on right */}
      <g transform="translate(600, 100)">
        <rect x="0" y="0" width="200" height="40" fill={WHITE} stroke={MUTED} />
        <L x="100" y="25" size="14">order 3: all zero</L>
        <Wire d="M 100 40 L 100 60" stroke={MUTED} marker="url(#am1ArrM)" />

        <g className="am1m-fade-in am1m-delay-3">
          <rect x="0" y="60" width="200" height="40" fill={SKY} stroke={BLUE} />
          <L x="100" y="85" size="14" fill={BLUE}>order 2: one non-zero</L>
          <Wire d="M 200 80 L 230 80" stroke={BLUE} marker="url(#am1ArrB)" />
          <L x="270" y="85" size="18" fill={BLUE}>ρ(A) = 2</L>
        </g>

        <g className="am1m-fade-in am1m-delay-4">
          <Wire d="M 100 100 L 100 120" stroke={MUTED} marker="url(#am1ArrM)" dash="4 4" />
          <rect x="0" y="120" width="200" height="40" fill={WHITE} stroke={MUTED} opacity="0.5" />
          <L x="100" y="145" size="14" fill={MUTED}>order 1: any non-zero</L>
        </g>
      </g>
    </Scene>
  )
}

export function M5SurvivingRowsScene() {
  return (
    <Scene caption="Finding rank by reduction to echelon form">
      {/* Left A */}
      <L x="200" y="80">Matrix A</L>
      <g transform="translate(100, 100)">
        <M x="40" y="30">1</M> <M x="80" y="30">1</M> <M x="120" y="30">1</M> <M x="160" y="30">1</M>
        <M x="40" y="60">1</M> <M x="80" y="60">2</M> <M x="120" y="60">3</M> <M x="160" y="60">4</M>
        <M x="40" y="90">2</M> <M x="80" y="90">3</M> <M x="120" y="90">4</M> <M x="160" y="90">5</M>
        <M x="40" y="120">1</M> <M x="80" y="120">3</M> <M x="120" y="120">5</M> <M x="160" y="120">8</M>
      </g>
      <L x="200" y="260" size="13" fill={MUTED}>det A = 0, yet rank is 3, not 0</L>

      {/* Stage 1 */}
      <Wire d="M 320 160 L 360 120" stroke={MUTED} marker="url(#am1ArrM)" />
      <L x="330" y="130" size="11" fill={MUTED}>R2-R1, R3-2R1, R4-R1</L>
      <g transform="translate(380, 50)" className="am1m-fade-in am1m-delay-1">
        <M x="40" y="30">1</M> <M x="80" y="30">1</M> <M x="120" y="30">1</M> <M x="160" y="30">1</M>
        <M x="40" y="60">0</M> <M x="80" y="60">1</M> <M x="120" y="60">2</M> <M x="160" y="60">3</M>
        <M x="40" y="90">0</M> <M x="80" y="90">1</M> <M x="120" y="90">2</M> <M x="160" y="90">3</M>
        <M x="40" y="120">0</M> <M x="80" y="120">2</M> <M x="120" y="120">4</M> <M x="160" y="120">7</M>
      </g>

      {/* Stage 2 */}
      <Wire d="M 480 180 L 480 200" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-fade-in am1m-delay-1" />
      <L x="530" y="195" size="11" fill={MUTED} className="am1m-fade-in am1m-delay-1">R3-R2, R4-2R2</L>
      <g transform="translate(380, 210)" className="am1m-fade-in am1m-delay-2">
        <M x="40" y="30">1</M> <M x="80" y="30">1</M> <M x="120" y="30">1</M> <M x="160" y="30">1</M>
        <M x="40" y="60">0</M> <M x="80" y="60">1</M> <M x="120" y="60">2</M> <M x="160" y="60">3</M>
        <M x="40" y="90">0</M> <M x="80" y="90">0</M> <M x="120" y="90">0</M> <M x="160" y="90">0</M>
        <M x="40" y="120">0</M> <M x="80" y="120">0</M> <M x="120" y="120">0</M> <M x="160" y="120">1</M>
      </g>

      {/* Final */}
      <Wire d="M 480 340 L 480 360" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-fade-in am1m-delay-2" />
      <L x="500" y="355" size="11" fill={MUTED} className="am1m-fade-in am1m-delay-2">R34</L>
      <g transform="translate(380, 370)" className="am1m-fade-in am1m-delay-3">
        <rect x="20" y="15" width="160" height="20" fill={GREEN} opacity="0.1" />
        <rect x="20" y="45" width="160" height="20" fill={GREEN} opacity="0.1" />
        <rect x="20" y="75" width="160" height="20" fill={GREEN} opacity="0.1" />
        <rect x="20" y="105" width="160" height="20" fill={MUTED} opacity="0.1" />
        <Wire d="M 20 115 L 180 115" stroke={MUTED} width="1" />

        <M x="40" y="30">1</M> <M x="80" y="30">1</M> <M x="120" y="30">1</M> <M x="160" y="30">1</M>
        <M x="40" y="60">0</M> <M x="80" y="60">1</M> <M x="120" y="60">2</M> <M x="160" y="60">3</M>
        <M x="40" y="90">0</M> <M x="80" y="90">0</M> <M x="120" y="90">0</M> <M x="160" y="90">1</M>
        <M x="40" y="120">0</M> <M x="80" y="120">0</M> <M x="120" y="120">0</M> <M x="160" y="120">0</M>

        {/* Tally marks */}
        <L x="195" y="30" fill={GREEN} weight="900">|</L>
        <L x="200" y="60" fill={GREEN} weight="900">|</L>
        <L x="205" y="90" fill={GREEN} weight="900">|</L>
      </g>

      <g transform="translate(700, 420)" className="am1m-fade-in am1m-delay-4">
        <rect x="0" y="0" width="120" height="40" fill={BLUE} rx="4" />
        <L x="60" y="25" fill={WHITE} size="16">rank = 3</L>
      </g>
    </Scene>
  )
}

export function M5RankVersusKScene() {
  return (
    <Scene caption="Rank of a matrix containing a parameter">
      <g transform="translate(100, 150)">
        <M x="50" y="30">1</M> <M x="100" y="30">1</M> <M x="150" y="30">1</M>
        <M x="50" y="70">1</M> <M x="100" y="70">2</M> <M x="150" y="70">3</M>
        <M x="50" y="110">1</M> <M x="100" y="110">4</M> <M x="150" y="110" fill={AMBER}>k</M>
        <L x="100" y="-10">A</L>
      </g>

      <Wire d="M 280 200 L 320 200" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-draw am1m-delay-1" />

      <g transform="translate(350, 150)">
        <L x="100" y="-10" className="am1m-fade-in am1m-delay-2">U</L>
        <M x="50" y="30" className="am1m-fade-in am1m-delay-2">1</M> <M x="100" y="30" className="am1m-fade-in am1m-delay-2">1</M> <M x="150" y="30" className="am1m-fade-in am1m-delay-2">1</M>
        <M x="50" y="70" className="am1m-fade-in am1m-delay-2">0</M> <M x="100" y="70" className="am1m-fade-in am1m-delay-2">1</M> <M x="150" y="70" className="am1m-fade-in am1m-delay-2">2</M>
        <M x="50" y="110" className="am1m-fade-in am1m-delay-2">0</M> <M x="100" y="110" className="am1m-fade-in am1m-delay-2">0</M>
        
        <g className="am1m-fade-in am1m-delay-3">
          <rect x="130" y="90" width="40" height="30" fill="none" stroke={AMBER} strokeWidth="2" />
          <M x="150" y="110" fill={AMBER}>k-7</M>
        </g>
      </g>

      {/* Number line */}
      <g transform="translate(580, 200)">
        {/* Green line except at k=7 */}
        <Wire d="M 0 0 L 140 0" stroke={GREEN} width="4" className="am1m-draw am1m-delay-4" />
        <Wire d="M 160 0 L 300 0" stroke={GREEN} width="4" className="am1m-draw am1m-delay-4" />
        
        <L x="75" y="-15" fill={GREEN} className="am1m-fade-in am1m-delay-4">rank 3</L>
        <L x="225" y="-15" fill={GREEN} className="am1m-fade-in am1m-delay-4">rank 3</L>

        <circle cx="150" cy="0" r="6" fill={RED} className="am1m-fade-in am1m-delay-5" />
        <L x="150" y="-15" fill={RED} className="am1m-fade-in am1m-delay-5">rank 2</L>
        <L x="150" y="25" fill={MUTED}>k = 7</L>

        <g className="am1m-slide-in am1m-delay-6">
          <L x="75" y="60" size="13">N = I_3</L>
          <L x="225" y="60" size="13">N = I_3</L>
          <L x="150" y="80" size="13" fill={RED}>N = [I_2 0 ; 0 0]</L>
        </g>
      </g>
    </Scene>
  )
}

export function M5AugmentedBarScene() {
  return (
    <Scene caption="Rouché's consistency theorem">
      {/* Left panel: inconsistent */}
      <g transform="translate(150, 100)">
        <L x="100" y="0">x + y = 2</L>
        <L x="100" y="25">2x + 2y = 5</L>
        
        <g transform="translate(0, 60)">
          <M x="50" y="30">1</M> <M x="100" y="30">1</M> <M x="150" y="30">2</M>
          <M x="50" y="70">2</M> <M x="100" y="70">2</M> <M x="150" y="70">5</M>
          <Wire d="M 125 15 L 125 85" stroke={MUTED} dash="4 4" />
        </g>

        <Wire d="M 100 170 L 100 200" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-draw am1m-delay-1" />

        <g transform="translate(0, 210)">
          <M x="50" y="30">1</M> <M x="100" y="30">1</M> <M x="150" y="30">2</M>
          <M x="50" y="70">0</M> <M x="100" y="70">0</M> <M x="150" y="70">1</M>
          <Wire d="M 125 15 L 125 85" stroke={MUTED} dash="4 4" />
          <rect x="30" y="50" width="140" height="30" fill="none" stroke={RED} strokeWidth="2" className="am1m-fade-in am1m-delay-2" />
          <L x="220" y="70" fill={RED} className="am1m-fade-in am1m-delay-2">0 = 1 !</L>
        </g>

        <g className="am1m-fade-in am1m-delay-3">
          <L x="100" y="330" fill={RED} size="14">rank A = 1, rank K = 2 → inconsistent</L>
          <Wire d="M 60 380 L 140 340" stroke={BLUE} width="2" className="am1m-draw" />
          <Wire d="M 60 400 L 140 360" stroke={BLUE} width="2" className="am1m-draw" />
        </g>
      </g>

      {/* Right panel: consistent */}
      <g transform="translate(550, 100)">
        <L x="100" y="0">x + y = 2</L>
        <L x="100" y="25">2x + 2y = 4</L>
        
        <g transform="translate(0, 60)">
          <M x="50" y="30">1</M> <M x="100" y="30">1</M> <M x="150" y="30">2</M>
          <M x="50" y="70">2</M> <M x="100" y="70">2</M> <M x="150" y="70">4</M>
          <Wire d="M 125 15 L 125 85" stroke={MUTED} dash="4 4" />
        </g>

        <Wire d="M 100 170 L 100 200" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-draw am1m-delay-1" />

        <g transform="translate(0, 210)">
          <M x="50" y="30">1</M> <M x="100" y="30">1</M> <M x="150" y="30">2</M>
          <M x="50" y="70">0</M> <M x="100" y="70">0</M> <M x="150" y="70">0</M>
          <Wire d="M 125 15 L 125 85" stroke={MUTED} dash="4 4" />
          <rect x="30" y="50" width="140" height="30" fill="none" stroke={MUTED} strokeWidth="2" className="am1m-fade-in am1m-delay-2" />
        </g>

        <g className="am1m-fade-in am1m-delay-3">
          <L x="100" y="330" fill={GREEN} size="14">rank A = rank K = 1 → consistent</L>
          <Wire d="M 60 380 L 140 340" stroke={BLUE} width="3" className="am1m-draw" />
        </g>
      </g>
    </Scene>
  )
}

export function M5RankDecisionScene() {
  return (
    <Scene caption="Counting solutions via rank">
      <g transform="translate(450, 60)">
        {/* Root */}
        <rect x="-100" y="0" width="200" height="50" fill={WHITE} stroke={MUTED} rx="4" />
        <L x="0" y="30">Reduce K = [A | B]; find r, r'</L>

        {/* Left branch */}
        <Wire d="M -20 50 L -150 120" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-draw am1m-delay-1" />
        <L x="-120" y="80" fill={MUTED} className="am1m-fade-in am1m-delay-1">r ≠ r'</L>
        <rect x="-240" y="120" width="180" height="40" fill={RED} opacity="0.1" rx="4" className="am1m-fade-in am1m-delay-1" />
        <L x="-150" y="145" fill={RED} className="am1m-fade-in am1m-delay-1">No solution (0 = c row)</L>

        {/* Right branch */}
        <Wire d="M 20 50 L 150 120" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-draw am1m-delay-2" />
        <L x="120" y="80" fill={MUTED} className="am1m-fade-in am1m-delay-2">r = r'</L>
        <g className="am1m-fade-in am1m-delay-2" transform="translate(150, 120)">
          <path d="M 0 0 L 40 25 L 0 50 L -40 25 Z" fill={WHITE} stroke={BLUE} />
          <L x="0" y="30" fill={BLUE}>r = n ?</L>
        </g>

        {/* Diamond yes */}
        <Wire d="M 110 145 L -20 220" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-draw am1m-delay-3" />
        <L x="20" y="195" fill={MUTED} className="am1m-fade-in am1m-delay-3">yes</L>
        <rect x="-110" y="220" width="180" height="40" fill={GREEN} opacity="0.1" rx="4" className="am1m-fade-in am1m-delay-3" />
        <L x="-20" y="245" fill={GREEN} className="am1m-fade-in am1m-delay-3">Unique solution</L>
        <circle cx="-20" cy="280" r="4" fill={GREEN} className="am1m-fade-in am1m-delay-5" />

        {/* Diamond no */}
        <Wire d="M 190 145 L 250 220" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-draw am1m-delay-4" />
        <L x="240" y="170" fill={MUTED} className="am1m-fade-in am1m-delay-4">no</L>
        <rect x="100" y="220" width="300" height="40" fill={BLUE} opacity="0.1" rx="4" className="am1m-fade-in am1m-delay-4" />
        <L x="250" y="245" fill={BLUE} className="am1m-fade-in am1m-delay-4">Infinitely many: n - r free parameters</L>
        
        <g className="am1m-fade-in am1m-delay-5" transform="translate(250, 280)">
          <Wire d="M -40 0 L 0 -15" stroke={BLUE} width="2" />
          <L x="-20" y="5" size="10" fill={BLUE}>n-r = 1</L>
          <path d="M 20 0 L 50 -15 L 70 -5 L 40 10 Z" fill={BLUE} opacity="0.3" />
          <L x="45" y="15" size="10" fill={BLUE}>n-r = 2</L>
        </g>
      </g>

      <g transform="translate(450, 420)" className="am1m-slide-in am1m-delay-6">
        <rect x="0" y="0" width="300" height="40" fill={SKY} rx="20" />
        <L x="150" y="25" fill={BLUE}>Ex: n = 3, r = r' = 2 → 1 parameter</L>
      </g>
    </Scene>
  )
}

export function M5KpCasePlaneScene() {
  return (
    <Scene caption="Systems with two parameters k and p">
      <g transform="translate(100, 150)">
        <L x="100" y="0" anchor="start">2x + 3y + 5z = 9</L>
        <L x="100" y="30" anchor="start">7x + 3y - 2z = 8</L>
        <L x="100" y="60" anchor="start">2x + 3y + </L>
        <L x="165" y="60" anchor="start" fill={AMBER}>kz</L>
        <L x="185" y="60" anchor="start"> = </L>
        <L x="205" y="60" anchor="start" fill={AMBER}>p</L>

        <L x="150" y="120" fill={MUTED} className="am1m-fade-in am1m-delay-1">det A = 15(5 - k)</L>
      </g>

      <g transform="translate(450, 50)">
        {/* Plane */}
        <rect x="0" y="0" width="400" height="400" fill={GREEN} opacity="0.1" className="am1m-fade-in am1m-delay-2" />
        
        {/* Axes */}
        <Wire d="M 0 350 L 400 350" stroke={MUTED} marker="url(#am1ArrM)" />
        <L x="380" y="340" fill={MUTED}>k</L>
        <Wire d="M 50 400 L 50 0" stroke={MUTED} marker="url(#am1ArrM)" />
        <L x="60" y="20" fill={MUTED}>p</L>

        {/* k = 5 line */}
        <Wire d="M 200 400 L 200 0" stroke={RED} width="3" className="am1m-draw am1m-delay-3" />
        <L x="200" y="370" fill={RED}>5</L>
        
        {/* p = 9 dot */}
        <circle cx="200" cy="150" r="8" fill={BLUE} className="am1m-pulse am1m-delay-4" />
        <L x="40" y="150" fill={BLUE}>9</L>
        <Wire d="M 45 150 L 195 150" stroke={BLUE} dash="4 4" className="am1m-fade-in am1m-delay-4" />

        {/* Labels */}
        <rect x="220" y="30" width="160" height="30" fill={WHITE} rx="4" className="am1m-fade-in am1m-delay-5" />
        <L x="300" y="50" fill={GREEN} size="12" className="am1m-fade-in am1m-delay-5">k ≠ 5 : unique solution</L>
        
        <rect x="220" y="80" width="160" height="30" fill={WHITE} rx="4" className="am1m-fade-in am1m-delay-6" />
        <L x="300" y="100" fill={RED} size="12" className="am1m-fade-in am1m-delay-6">k = 5, p ≠ 9 : no solution</L>

        <rect x="220" y="170" width="160" height="30" fill={WHITE} rx="4" className="am1m-fade-in am1m-delay-7" />
        <L x="300" y="190" fill={BLUE} size="12" className="am1m-fade-in am1m-delay-7">k = 5, p = 9 : infinitely many</L>
      </g>
    </Scene>
  )
}

export function M5HomogeneousGateScene() {
  return (
    <Scene caption="Homogeneous systems AX = 0">
      {/* Input */}
      <g transform="translate(100, 250)">
        <L x="100" y="0" size="18">AX = 0</L>
        <rect x="60" y="20" width="80" height="24" fill={GREEN} opacity="0.1" rx="12" />
        <L x="100" y="36" fill={GREEN} size="12">always has X = 0</L>
      </g>

      <Wire d="M 230 250 L 350 250" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-draw" />

      {/* Gate */}
      <g transform="translate(450, 250)" className="am1m-fade-in am1m-delay-1">
        <rect x="-80" y="-30" width="160" height="60" fill={WHITE} stroke={BLUE} strokeWidth="2" rx="8" />
        <L x="0" y="5" fill={BLUE}>rank(A) = r vs n</L>
      </g>

      {/* Upper branch */}
      <Wire d="M 450 220 C 450 150 550 150 600 150" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-draw am1m-delay-2" />
      <rect x="460" y="110" width="120" height="30" fill={WHITE} rx="4" className="am1m-fade-in am1m-delay-2" />
      <L x="520" y="130" fill={MUTED} size="12" className="am1m-fade-in am1m-delay-2">r = n (det A ≠ 0)</L>

      <g transform="translate(700, 150)" className="am1m-fade-in am1m-delay-3">
        <Wire d="M -40 0 L 40 0" stroke={MUTED} dash="4 4" />
        <Wire d="M 0 -40 L 0 40" stroke={MUTED} dash="4 4" />
        <circle cx="0" cy="0" r="6" fill={N} />
        <L x="0" y="60" size="14">trivial only</L>
      </g>

      {/* Lower branch */}
      <Wire d="M 450 280 C 450 350 550 350 600 350" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-draw am1m-delay-4" />
      <rect x="460" y="360" width="120" height="30" fill={WHITE} rx="4" className="am1m-fade-in am1m-delay-4" />
      <L x="520" y="380" fill={MUTED} size="12" className="am1m-fade-in am1m-delay-4">r &lt; n (det A = 0)</L>

      <g transform="translate(700, 350)" className="am1m-fade-in am1m-delay-5">
        <Wire d="M -40 0 L 40 0" stroke={MUTED} dash="4 4" />
        <Wire d="M 0 -40 L 0 40" stroke={MUTED} dash="4 4" />
        <Wire d="M -30 30 L 30 -30" stroke={BLUE} width="3" className="am1m-draw am1m-delay-5" />
        <L x="0" y="60" fill={BLUE} size="14">n - r independent solutions</L>
      </g>

      {/* Side box */}
      <g transform="translate(550, 450)" className="am1m-fade-in am1m-delay-6">
        <rect x="0" y="0" width="300" height="40" fill={SKY} rx="4" />
        <L x="150" y="25" fill={BLUE} size="14">m &lt; n ⇒ r ≤ m &lt; n ⇒ always non-trivial</L>
      </g>
    </Scene>
  )
}

export function M5TriangleClimbScene() {
  return (
    <Scene caption="Gauss elimination: forward elimination and back-substitution">
      <g transform="translate(200, 50)">
        <L x="100" y="-20">Augmented matrix</L>
        <M x="50" y="30">2</M> <M x="100" y="30">1</M> <M x="150" y="30">1</M> <M x="200" y="30">5</M>
        <M x="50" y="70">4</M> <M x="100" y="70">-6</M> <M x="150" y="70">0</M> <M x="200" y="70">-2</M>
        <M x="50" y="110">-2</M> <M x="100" y="110">7</M> <M x="150" y="110">2</M> <M x="200" y="110">9</M>
        <Wire d="M 175 15 L 175 125" stroke={MUTED} dash="4 4" />
      </g>

      <Wire d="M 300 180 L 300 200" stroke={MUTED} marker="url(#am1ArrM)" />

      <g transform="translate(200, 210)">
        <M x="50" y="30">2</M> <M x="100" y="30">1</M> <M x="150" y="30">1</M> <M x="200" y="30">5</M>
        <g className="am1m-fade-in am1m-delay-1">
          <M x="50" y="70">0</M> <M x="100" y="70">-8</M> <M x="150" y="70">-2</M> <M x="200" y="70">-12</M>
          <M x="50" y="110">0</M> <M x="100" y="110">8</M> <M x="150" y="110">3</M> <M x="200" y="110">14</M>
          <rect x="-10" y="55" width="40" height="20" fill={WHITE} stroke={MUTED} />
          <L x="10" y="70" size="11">l21=2</L>
          <rect x="-10" y="95" width="40" height="20" fill={WHITE} stroke={MUTED} />
          <L x="10" y="110" size="11">l31=-1</L>
        </g>
        <Wire d="M 175 15 L 175 125" stroke={MUTED} dash="4 4" />
      </g>

      <Wire d="M 300 340 L 300 360" stroke={MUTED} marker="url(#am1ArrM)" />

      <g transform="translate(200, 370)">
        <M x="50" y="30">2</M> <M x="100" y="30">1</M> <M x="150" y="30">1</M> <M x="200" y="30">5</M>
        <M x="50" y="70">0</M> <M x="100" y="70">-8</M> <M x="150" y="70">-2</M> <M x="200" y="70">-12</M>
        <g className="am1m-fade-in am1m-delay-2">
          <M x="50" y="110">0</M> <M x="100" y="110">0</M> <M x="150" y="110">1</M> <M x="200" y="110">2</M>
          <rect x="-10" y="95" width="40" height="20" fill={WHITE} stroke={MUTED} />
          <L x="10" y="110" size="11">l32=-1</L>
        </g>
        <Wire d="M 175 15 L 175 125" stroke={MUTED} dash="4 4" />

        {/* Pivots circled */}
        <circle cx="50" cy="25" r="14" fill="none" stroke={AMBER} strokeWidth="2" className="am1m-fade-in am1m-delay-3" />
        <circle cx="100" cy="65" r="14" fill="none" stroke={AMBER} strokeWidth="2" className="am1m-fade-in am1m-delay-3" />
        <circle cx="150" cy="105" r="14" fill="none" stroke={AMBER} strokeWidth="2" className="am1m-fade-in am1m-delay-3" />
      </g>

      {/* Back-sub climb */}
      <g transform="translate(550, 200)">
        <Wire d="M 50 250 L 50 200 L 100 200" stroke={BLUE} width="2" marker="url(#am1ArrB)" className="am1m-draw am1m-delay-4" />
        <L x="130" y="205" fill={BLUE} size="16" className="am1m-fade-in am1m-delay-4">w = 2</L>

        <Wire d="M 100 200 L 100 150 L 150 150" stroke={BLUE} width="2" marker="url(#am1ArrB)" className="am1m-draw am1m-delay-5" />
        <L x="180" y="155" fill={BLUE} size="16" className="am1m-fade-in am1m-delay-5">v = 1</L>

        <Wire d="M 150 150 L 150 100 L 200 100" stroke={BLUE} width="2" marker="url(#am1ArrB)" className="am1m-draw am1m-delay-6" />
        <L x="230" y="105" fill={BLUE} size="16" className="am1m-fade-in am1m-delay-6">u = 1</L>
      </g>
    </Scene>
  )
}

export function M5ChecksumScene() {
  return (
    <Scene caption="Gauss elimination by hand with fractions and the check-sum column">
      <g transform="translate(80, 60)">
        {/* Header */}
        <rect x="0" y="0" width="460" height="30" fill={SKY} />
        <L x="40" y="20">x</L> <L x="100" y="20">y</L> <L x="160" y="20">z</L> <L x="250" y="20">RHS</L>
        <rect x="350" y="0" width="110" height="420" fill={MUTED} opacity="0.1" />
        <L x="405" y="20">check-sum</L>

        {/* Stage 0 */}
        <M x="40" y="60">1</M> <M x="100" y="60">4</M> <M x="160" y="60">-1</M> <M x="250" y="60">-5</M> <M x="405" y="60">-1</M> <L x="440" y="60" fill={GREEN}>✓</L>
        <M x="40" y="90">1</M> <M x="100" y="90">1</M> <M x="160" y="90">-6</M> <M x="250" y="90">-12</M> <M x="405" y="90">-16</M> <L x="440" y="90" fill={GREEN}>✓</L>
        <M x="40" y="120">3</M> <M x="100" y="120">-1</M> <M x="160" y="120">-1</M> <M x="250" y="120">4</M> <M x="405" y="120">5</M> <L x="440" y="120" fill={GREEN}>✓</L>

        <Wire d="M 0 140 L 460 140" stroke={MUTED} dash="2 2" />

        {/* Stage 1 */}
        <g className="am1m-fade-in am1m-delay-1">
          <L x="-40" y="170" size="12" fill={MUTED}>(ii)-(i)</L>
          <M x="40" y="170">0</M> <M x="100" y="170">-3</M> <M x="160" y="170">-5</M> <M x="250" y="170">-7</M> <M x="405" y="170">-15</M>
          <L x="440" y="170" fill={GREEN} className="am1m-pulse am1m-delay-2">✓</L>
          
          <L x="-40" y="200" size="12" fill={MUTED}>(iii)-3(i)</L>
          <M x="40" y="200">0</M> <M x="100" y="200">-13</M> <M x="160" y="200">2</M> <M x="250" y="200">19</M> <M x="405" y="200">8</M>
          <L x="440" y="200" fill={GREEN} className="am1m-pulse am1m-delay-2">✓</L>
        </g>

        <Wire d="M 0 220 L 460 220" stroke={MUTED} dash="2 2" />

        {/* Stage 2 */}
        <g className="am1m-fade-in am1m-delay-3">
          <L x="-40" y="260" size="12" fill={MUTED}>(v)-(13/3)(iv)</L>
          <M x="40" y="260">0</M> <M x="100" y="260">0</M> <M x="160" y="260">71/3</M> <M x="250" y="260">148/3</M> <M x="405" y="260">73</M>
          <L x="440" y="260" fill={GREEN} className="am1m-pulse am1m-delay-4">✓</L>
        </g>
      </g>

      <g transform="translate(600, 100)">
        <rect x="0" y="200" width="220" height="40" fill={WHITE} stroke={BLUE} rx="4" className="am1m-fade-in am1m-delay-5" />
        <M x="110" y="225" fill={BLUE} className="am1m-fade-in am1m-delay-5">z = 148/71 ≈ 2.0845</M>

        <rect x="0" y="100" width="220" height="40" fill={WHITE} stroke={BLUE} rx="4" className="am1m-fade-in am1m-delay-6" />
        <M x="110" y="125" fill={BLUE} className="am1m-fade-in am1m-delay-6">y = -81/71 ≈ -1.1408</M>

        <rect x="0" y="0" width="220" height="40" fill={WHITE} stroke={BLUE} rx="4" className="am1m-fade-in am1m-delay-7" />
        <M x="110" y="25" fill={BLUE} className="am1m-fade-in am1m-delay-7">x = 117/71 ≈ 1.6479</M>
      </g>
    </Scene>
  )
}

export function M5PivotSwapScene() {
  return (
    <Scene caption="When a pivot is zero or tiny">
      {/* Left */}
      <g transform="translate(100, 150)">
        <M x="50" y="30">1</M> <M x="100" y="30">1</M> <M x="150" y="30">1</M> <M x="200" y="30">6</M>
        <M x="50" y="70">0</M> <M x="100" y="70">0</M> <M x="150" y="70">1</M> <M x="200" y="70">3</M>
        <M x="50" y="110">0</M> <M x="100" y="110">2</M> <M x="150" y="110">1</M> <M x="200" y="110">7</M>
        <circle cx="100" cy="65" r="14" fill="none" stroke={RED} strokeWidth="2" className="am1m-pulse" />
        <L x="100" y="145" fill={RED}>⚠ pivot = 0</L>

        <Wire d="M 60 70 C 40 70 40 110 60 110" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-draw am1m-delay-1" />
        <Wire d="M 60 110 C 40 110 40 70 60 70" stroke={BLUE} marker="url(#am1ArrB)" className="am1m-draw am1m-delay-1" />
      </g>

      <Wire d="M 330 200 L 370 200" stroke={MUTED} marker="url(#am1ArrM)" className="am1m-draw am1m-delay-2" />

      {/* Mid */}
      <g transform="translate(380, 150)" className="am1m-fade-in am1m-delay-2">
        <M x="50" y="30">1</M> <M x="100" y="30">1</M> <M x="150" y="30">1</M> <M x="200" y="30">6</M>
        <M x="50" y="70">0</M> <M x="100" y="70">2</M> <M x="150" y="70">1</M> <M x="200" y="70">7</M>
        <M x="50" y="110">0</M> <M x="100" y="110">0</M> <M x="150" y="110">1</M> <M x="200" y="110">3</M>
        <circle cx="50" cy="25" r="14" fill="none" stroke={GREEN} strokeWidth="2" />
        <circle cx="100" cy="65" r="14" fill="none" stroke={GREEN} strokeWidth="2" />
        <circle cx="150" cy="105" r="14" fill="none" stroke={GREEN} strokeWidth="2" />
        <L x="125" y="145" fill={GREEN}>z = 3, y = 2, x = 1</L>
      </g>

      <Wire d="M 630 100 L 630 400" stroke={MUTED} dash="4 4" />

      {/* Right */}
      <g transform="translate(680, 100)">
        <L x="100" y="0">tiny pivot, 3 significant digits</L>
        
        {/* Upper panel */}
        <g transform="translate(0, 30)" className="am1m-fade-in am1m-delay-3">
          <L x="100" y="10" size="12" fill={MUTED}>no pivoting</L>
          <M x="50" y="40">0.0001</M> <M x="110" y="40">1</M> <M x="170" y="40">1</M>
          <M x="50" y="70">1</M>      <M x="110" y="70">1</M> <M x="170" y="70">2</M>
          <L x="-20" y="70" fill={RED} size="12">l = 10000</L>
          <rect x="20" y="90" width="160" height="24" fill={RED} opacity="0.1" />
          <M x="100" y="106" fill={RED}>x = 0.00, y = 1.00 ✗</M>
        </g>

        {/* Lower panel */}
        <g transform="translate(0, 180)" className="am1m-fade-in am1m-delay-4">
          <L x="100" y="10" size="12" fill={BLUE}>partial pivoting (rows swapped)</L>
          <M x="50" y="40">1</M>      <M x="110" y="40">1</M> <M x="170" y="40">2</M>
          <M x="50" y="70">0.0001</M> <M x="110" y="70">1</M> <M x="170" y="70">1</M>
          <L x="-20" y="70" fill={GREEN} size="12">l = 0.0001</L>
          <rect x="20" y="90" width="160" height="24" fill={GREEN} opacity="0.1" />
          <M x="100" y="106" fill={GREEN}>x = 1.00, y = 1.00 ✓</M>
        </g>

        <L x="100" y="320" fill={MUTED} className="am1m-fade-in am1m-delay-5">exact: x = 1.0001, y = 0.9999</L>
      </g>
    </Scene>
  )
}

export function M5ConvergeDivergeScene() {
  // Both plots share one value scale: v = 0 at y 380, 60 px per unit.
  const vy = (v) => 380 - 60 * n(v)
  const sx = (x0, k) => n(x0) + 30 + 90 * n(k)
  const t = (s) => ({ animationDelay: `${n(s)}s` })
  const row = (x, y, a, b, rhs, box, tone) => {
    const [X, Y] = [n(x), n(y)]
    const bx = box === 'a' ? X : X + 62
    return (
      <g className="am1m-cell-in">
        <M x={X} y={Y} size={17}>{a}</M>
        <M x={X + 10} y={Y} size={17} anchor="start">x +</M>
        <M x={X + 62} y={Y} size={17}>{b}</M>
        <M x={X + 72} y={Y} size={17} anchor="start">{`y = ${rhs}`}</M>
        <rect x={bx - 10} y={Y - 17} width="20" height="23" rx="4" fill="none" stroke={tone} strokeWidth="2.2" className="am1m-emerge" style={t(0.4)} />
      </g>
    )
  }
  const xs = [0, 1.5, 1.025, 1.00125]
  const ys = [0, 1.9, 1.995, 1.99975]
  const ticks = (x0) => [0, 1, 2, 3].map((k) => [sx(x0, k), String(k)])
  const yT = [[vy(0), '0'], [vy(1), '1'], [vy(2), '2'], [vy(3), '3'], [vy(-1), '−1']]
  return (
    <Scene caption="Same pair of equations, two orderings: only the diagonally dominant one converges">
      {row(160, 50, '1', '5', '11', 'a', RED)}
      {row(160, 80, '4', '1', '6', 'b', RED)}
      {row(610, 50, '4', '1', '6', 'a', GREEN)}
      {row(610, 80, '1', '5', '11', 'b', GREEN)}
      <g className="am1m-cell-in" style={t(0.4)}>
        <M x="310" y="70" size={12.5} fill={RED} anchor="start">{'1 < 5, 1 < 4'}</M>
        <M x="755" y="70" size={12.5} fill={GREEN} anchor="start">{'4 > 1, 5 > 1'}</M>
      </g>
      <g className="am1m-slide-in" style={t(0.8)}>
        <rect x="230" y="100" width="440" height="30" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <L x="450" y="120" size={14.5} fill={BLUE}>{'|aᵢᵢ| > Σ |aᵢⱼ| (j ≠ i) in every row'}</L>
      </g>

      {/* Left: not dominant */}
      <L x="235" y="162" size={14}>x + 5y = 11 first (not dominant)</L>
      <M x="235" y="182" size={12} fill={MUTED}>x = 11 − 5y,  y = 6 − 4x</M>
      <rect x="70" y="200" width="330" height="240" fill={WHITE} stroke={SKY} strokeWidth="1.5" />
      <Axes x="70" y="440" w="330" h="250" tickLabels={ticks(70)} yTicks={yT} />
      <Wire d="M70 380 L400 380" stroke={MUTED} width={1.2} dash="4 4" />
      <L x="406" y="444" size={11} fill={MUTED} anchor="start" weight={700}>sweep</L>
      <Dot cx={sx(70, 0)} cy={vy(0)} r={5} fill={N} />
      <Wire d="M100 380 L124 204" stroke={RED} width={2.5} marker="url(#am1ArrR)" className="am1m-draw am1m-delay-5" />
      <Wire d="M100 380 L102 436" stroke={RED} width={2.5} marker="url(#am1ArrR)" className="am1m-draw am1m-delay-5" />
      <M x="140" y="226" size={13} fill={BLUE} anchor="start" className="am1m-fade-in am1m-delay-5">x: 0 → 11 → 201 …</M>
      <M x="140" y="424" size={13} fill={PURP} anchor="start" className="am1m-fade-in am1m-delay-5">y: 0 → −38 → −798 …</M>
      <L x="300" y="320" size={16} fill={RED} className="am1m-fade-in am1m-delay-6">diverges</L>

      {/* Right: dominant */}
      <L x="685" y="162" size={14}>4x + y = 6 first (dominant)</L>
      <M x="685" y="182" size={12} fill={MUTED}>x = (6 − y)/4,  y = (11 − x)/5</M>
      <rect x="520" y="200" width="330" height="240" fill={WHITE} stroke={SKY} strokeWidth="1.5" />
      <Axes x="520" y="440" w="330" h="250" tickLabels={ticks(520)} yTicks={yT} />
      <Wire d="M520 380 L850 380" stroke={MUTED} width={1.2} dash="4 4" />
      <L x="856" y="444" size={11} fill={MUTED} anchor="start" weight={700}>sweep</L>
      <Wire d={`M520 ${vy(1)} L845 ${vy(1)}`} stroke={BLUE} width={1.6} dash="6 5" />
      <Wire d={`M520 ${vy(2)} L845 ${vy(2)}`} stroke={PURP} width={1.6} dash="6 5" />
      <M x="850" y={vy(1) + 4} size={12} fill={BLUE} anchor="start">x=1</M>
      <M x="850" y={vy(2) + 4} size={12} fill={PURP} anchor="start">y=2</M>
      <Curve pts={xs.map((v, k) => [sx(520, k), vy(v)])} stroke={BLUE} className="am1m-draw am1m-delay-7" />
      <Curve pts={ys.map((v, k) => [sx(520, k), vy(v)])} stroke={PURP} className="am1m-draw am1m-delay-7" />
      {xs.map((v, k) => (
        <g key={`x${k}`} className="am1m-cell-in" style={t(2.6 + 0.5 * k)}>
          <Dot cx={sx(520, k)} cy={vy(v)} r={4.5} fill={BLUE} />
          <Dot cx={sx(520, k)} cy={vy(ys[k])} r={4.5} fill={PURP} />
        </g>
      ))}
      <g className="am1m-cell-in" style={t(4.4)}>
        <L x="700" y="226" size={16} fill={GREEN}>converges</L>
      </g>
    </Scene>
  )
}

export function M5SeidelRelayScene() {
  const t = (s) => ({ animationDelay: `${n(s)}s` })
  const cols = [130, 270, 410, 550]
  const lanes = [['x', 70, BLUE], ['y', 160, PURP], ['z', 250, ROSE]]
  const vals = [
    ['0', '0', '0'],
    ['0.8500', '−1.0275', '1.0109'],
    ['1.0025', '−0.9998', '0.9998'],
    ['1.0000', '−1.0000', '1.0000'],
  ]
  // Sweep k, unknown i: computed one after another, x then y then z.
  const at = (k, i) => (n(k) === 0 ? 0 : 0.4 + (n(k) - 1) * 1.2 + n(i) * 0.4)
  return (
    <Scene caption="Gauss–Seidel: each new value is used the moment it is computed">
      {cols.map((cx, k) => (
        <M key={`h${k}`} x={cx} y="32" size={13} fill={MUTED}>{`sweep ${k}`}</M>
      ))}
      {lanes.map(([name, ly, tone]) => (
        <L key={name} x="46" y={ly + 7} size={20} fill={tone}>{name}</L>
      ))}
      {cols.map((cx, k) => lanes.map(([name, ly, tone], i) => (
        <g key={`${name}${k}`} className="am1m-cell-in" style={t(at(k, i))}>
          <rect x={cx - 46} y={ly - 20} width="92" height="40" rx="8" fill={WHITE} stroke={k === 0 ? MUTED : tone} strokeWidth="2.2" />
          <M x={cx} y={ly + 5} size={14} fill={k === 0 ? MUTED : N}>{vals[k][i]}</M>
        </g>
      )))}

      {/* Relay inside a sweep: new x -> y, new x and y -> z */}
      {cols.slice(1).map((cx, j) => (
        <g key={`relay${j}`}>
          <g className="am1m-cell-in" style={t(at(j + 1, 0) + 0.2)}>
            <Wire d={`M${cx} 92 L${cx} 136`} stroke={AMBER} width={2} marker="url(#am1ArrA)" />
          </g>
          <g className="am1m-cell-in" style={t(at(j + 1, 1) + 0.2)}>
            <Wire d={`M${cx} 182 L${cx} 226`} stroke={AMBER} width={2} marker="url(#am1ArrA)" />
          </g>
        </g>
      ))}
      <g className="am1m-cell-in" style={t(at(1, 1) + 0.2)}>
        <Wire d="M224 80 C194 92, 194 238, 222 250" stroke={AMBER} width={2} marker="url(#am1ArrA)" />
      </g>
      {/* Carried forward: y_k, z_k feed x_(k+1) */}
      {[270, 410].map((cx, j) => (
        <g key={`fw${j}`} className="am1m-cell-in" style={t(at(j + 2, 0) - 0.2)}>
          <Wire d={`M${cx + 48} 160 L${cx + 92} 74`} stroke={GREEN} width={2} marker="url(#am1ArrG)" />
          <Wire d={`M${cx + 48} 250 L${cx + 92} 84`} stroke={GREEN} width={2} marker="url(#am1ArrG)" />
        </g>
      ))}
      <L x="84" y="296" size={12} fill={AMBER} anchor="start" weight={750}>↓ relay: new x feeds y; new x and y feed z</L>
      <L x="400" y="296" size={12} fill={GREEN} anchor="start" weight={750}>↗ carried into the next sweep</L>

      <g className="am1m-cell-in" style={t(4.0)}>
        <rect x="84" y="312" width="530" height="100" rx="10" fill="none" stroke={MUTED} strokeWidth="1.8" strokeDasharray="6 5" />
        <L x="100" y="332" size={12.5} fill={MUTED} anchor="start" weight={750}>Jacobi, first sweep: old values only</L>
        <rect x="104" y="346" width="92" height="40" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="2" />
        <M x="150" y="371" size={13} fill={MUTED}>(0, 0, 0)</M>
        <Wire d="M198 366 L236 366" stroke={MUTED} width={2} marker="url(#am1ArrM)" />
        <rect x="240" y="346" width="200" height="40" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="2" />
        <M x="340" y="371" size={13}>(0.85, −0.90, 1.25)</M>
        <L x="340" y="404" size={11.5} fill={MUTED} weight={700}>x, y, z all from sweep 0</L>
        <M x="458" y="371" size={12} fill={MUTED} anchor="start">GS: −1.0275, 1.0109</M>
      </g>

      <Card x="640" y="36" w="240" h="112" title="system (diagonally dominant)" mono className="am1m-cell-in" linesY={58} lineH={21} lines={['20x + y − 2z = 17', '3x + 20y − z = −18', '2x − 3y + 20z = 25']} />
      <Card x="640" y="164" w="240" h="112" title="update with newest values" accent={PURP} mono className="am1m-cell-in" linesY={58} lineH={21} lines={['x = (17 − y + 2z)/20', 'y = (−18 − 3x + z)/20', 'z = (25 − 2x + 3y)/20']} />
      <g className="am1m-cell-in" style={t(4.4)}>
        <Card x="640" y="312" w="240" h="100" title="sweeps to 4 decimals" accent={GREEN} lines={['Gauss–Seidel: 3 sweeps', 'Jacobi: 6 sweeps']} foot="Grewal Ex. 28.20–28.21" footTone={MUTED} />
      </g>
    </Scene>
  )
}

export function M5TraceDetScene() {
  const t = (s) => ({ animationDelay: `${n(s)}s` })
  // p(λ) = λ² − λ − 2: λ = 0 at x 330, 55 px per unit; p = 0 at y 404, 26 px per unit.
  const p = (l) => [330 + 55 * n(l), 404 - 26 * (n(l) * n(l) - n(l) - 2)]
  const pts = Array.from({ length: 49 }, (_, i) => p(-1.9 + i * 0.1))
  return (
    <Scene caption="Characteristic equation of a 2x2 matrix: λ² − (trace)λ + det = 0">
      {/* A: diagonal = trace, whole matrix = det */}
      <g className="am1m-cell-in">
        <L x="60" y="90" size={18}>A =</L>
        <Wire d="M98 46 L88 46 L88 116 L98 116" width={2.2} />
        <Wire d="M182 46 L192 46 L192 116 L182 116" width={2.2} />
      </g>
      <g className="am1m-emerge" style={t(0.35)}>
        <rect x="104" y="58" width="28" height="22" rx="5" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <rect x="146" y="88" width="32" height="22" rx="5" fill={SKY} stroke={BLUE} strokeWidth="2" />
      </g>
      <g className="am1m-cell-in">
        <M x="118" y="75" size={18}>4</M>
        <M x="162" y="75" size={18}>−5</M>
        <M x="118" y="105" size={18}>2</M>
        <M x="162" y="105" size={18}>−3</M>
      </g>
      <rect x="80" y="38" width="120" height="86" rx="6" fill="none" stroke={AMBER} strokeWidth="2.2" strokeDasharray="6 4" className="am1m-emerge" style={t(0.7)} />
      <g className="am1m-cell-in" style={t(0.7)}>
        <L x="40" y="150" size={13} fill={BLUE} anchor="start">trace = 4 + (−3) = 1</L>
        <L x="40" y="172" size={13} fill={AMBER} anchor="start">det = −12 − (−10) = −2</L>
      </g>

      {/* A − λI: λ comes off the diagonal only */}
      <g className="am1m-cell-in" style={t(1.0)}>
        <L x="372" y="90" size={18} anchor="end">A − λI =</L>
        <Wire d="M398 46 L388 46 L388 116 L398 116" width={2.2} />
        <Wire d="M552 46 L562 46 L562 116 L552 116" width={2.2} />
        <M x="418" y="75" size={18} anchor="end">4</M>
        <M x="500" y="75" size={18}>−5</M>
        <M x="430" y="105" size={18}>2</M>
        <M x="506" y="105" size={18} anchor="end">−3</M>
      </g>
      <g className="am1m-slide-in" style={t(1.2)}>
        <M x="422" y="75" size={18} anchor="start" fill={RED}>− λ</M>
        <M x="510" y="105" size={18} anchor="start" fill={RED}>− λ</M>
      </g>
      <g className="am1m-cell-in" style={t(1.2)}>
        <L x="580" y="90" size={15} fill={MUTED} anchor="start">→ |A − λI| = 0</L>
      </g>

      {/* Expansion */}
      <g className="am1m-cell-in" style={t(1.45)}>
        <M x="470" y="228" size={18} anchor="end">(4 − λ)(−3 − λ) + 10 =</M>
        <M x="480" y="228" size={18} anchor="start">λ²</M>
        <M x="510" y="228" size={18} anchor="start" fill={BLUE}>− 1λ</M>
        <M x="562" y="228" size={18} anchor="start" fill={AMBER}>− 2</M>
        <L x="537" y="254" size={12} fill={MUTED} weight={700}>λ² − (trace)λ + det</L>
      </g>
      <Wire d="M194 146 C320 150, 500 162, 528 206" stroke={BLUE} width={2} marker="url(#am1ArrB)" className="am1m-draw am1m-delay-5" />
      <Wire d="M206 168 C320 196, 560 178, 578 206" stroke={AMBER} width={2} marker="url(#am1ArrA)" className="am1m-draw am1m-delay-5" />

      {/* Roots of the characteristic polynomial */}
      <Axes x="160" y="404" w="340" h="110" origin="center" yLabel="p(λ)" />
      <Wire d="M330 404 L330 470" stroke={MUTED} width={2.2} />
      <L x="508" y="409" size={13} fill={MUTED} anchor="start">λ</L>
      <Curve pts={pts} stroke={BLUE} className="am1m-draw am1m-delay-6" />
      <L x="505" y="340" size={13} fill={BLUE} anchor="start">λ² − λ − 2</L>
      <g className="am1m-emerge" style={t(3.2)}>
        <Dot cx="275" cy="404" r={6.5} fill={GREEN} />
        <Dot cx="440" cy="404" r={6.5} fill={GREEN} />
      </g>
      <g className="am1m-cell-in" style={t(3.4)}>
        <M x="268" y="428" size={13} fill={GREEN} anchor="end">λ = −1</M>
        <M x="447" y="428" size={13} fill={GREEN} anchor="start">λ = 2</M>
      </g>
      <g className="am1m-cell-in" style={t(3.8)}>
        <Card x="640" y="300" w="240" h="100" title="check the roots" accent={GREEN} linesY={58} lineH={24} lines={['sum: −1 + 2 = 1 = trace', 'product: (−1)(2) = −2 = det']} />
      </g>
    </Scene>
  )
}

export function M5EigenDirectionsScene() {
  const t = (s) => ({ animationDelay: `${n(s)}s` })
  // Main plane: origin (110, 340), 30 px per unit.
  const P = (x, y) => [110 + 30 * n(x), 340 - 30 * n(y)]
  const seg = (a, b) => `M${a[0]} ${a[1]} L${b[0]} ${b[1]}`
  const O = P(0, 0)
  const gx = Array.from({ length: 27 }, (_, i) => 80 + 30 * i)
  const gy = Array.from({ length: 15 }, (_, i) => 40 + 30 * i)
  return (
    <Scene caption="Eigenvectors keep their direction under A; other vectors are turned">
      {gx.map((x) => <Wire key={`gx${x}`} d={`M${x} 40 L${x} 460`} stroke={SKY} width={1.2} />)}
      {gy.map((y) => <Wire key={`gy${y}`} d={`M80 ${y} L860 ${y}`} stroke={SKY} width={1.2} />)}
      <Wire d="M70 340 L872 340" stroke={MUTED} width={1.8} />
      <Wire d="M110 470 L110 30" stroke={MUTED} width={1.8} />

      {/* Eigen-lines extend last, but sit underneath the arrows */}
      <Wire d={seg(P(-1.2, -0.3), P(25.2, 6.3))} stroke={BLUE} width={2} opacity={0.35} className="am1m-draw am1m-delay-7" />
      <Wire d={seg(P(-1.2, 1.2), P(4, -4))} stroke={GREEN} width={2} opacity={0.35} className="am1m-draw am1m-delay-7" />

      {/* λ = 6: (4,1) is stretched to (24,6) along its own line */}
      <g className="am1m-cell-in" style={t(1.5)}>
        <Wire d={seg(O, P(24, 6))} stroke={BLUE} width={2} marker="url(#am1ArrB)" />
      </g>
      <g className="am1m-cell-in" style={t(1.1)}>
        <Wire d={seg(O, P(4, 1))} stroke={BLUE} width={3.2} marker="url(#am1ArrB)" />
        <M x="222" y="296" size={13} fill={BLUE} anchor="end">(4, 1)</M>
      </g>
      <g className="am1m-cell-in" style={t(1.8)}>
        <M x="815" y="136" size={13} fill={BLUE} anchor="end">A(4,1) = (24,6) = 6(4,1)</M>
      </g>

      {/* λ = 1: (1,-1) maps onto itself */}
      <g className="am1m-cell-in" style={t(1.9)}>
        <Wire d={seg(O, P(1, -1))} stroke={GREEN} width={9} opacity={0.25} />
      </g>
      <g className="am1m-cell-in" style={t(2.2)}>
        <Wire d={seg(O, P(1, -1))} stroke={GREEN} width={2.4} marker="url(#am1ArrG)" />
        <M x="170" y="380" size={13} fill={GREEN} anchor="start">A(1,−1) = (1,−1) = 1(1,−1)</M>
      </g>

      <g className="am1m-cell-in" style={t(3.8)}>
        <L x="470" y="220" size={13} fill={BLUE}>eigenspace λ = 6</L>
        <L x="245" y="450" size={13} fill={GREEN} anchor="start">eigenspace λ = 1</L>
      </g>

      <Panel x="130" y="36" w="236" title="A = [5 4 ; 1 2]" className="am1m-cell-in" rows={[['|A − λI| = 0', 'λ² − 7λ + 6 = 0'], ['eigenvalues', 'λ = 6, 1'], ['λ = 6 → x', '(4, 1)'], ['λ = 1 → x', '(1, −1)']]} />

      {/* Counter-example first: (1,0) is turned to (5,1). Inset at 40 px per unit, origin (580, 440). */}
      <g className="am1m-cell-in" style={t(0.3)}>
        <rect x="540" y="292" width="340" height="178" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
        <L x="556" y="314" size={12.5} fill={MUTED} anchor="start">not an eigenvector: direction changes</L>
        <Wire d="M556 440 L870 440" stroke={SKY} width={2} />
        <Wire d="M580 462 L580 330" stroke={SKY} width={2} />
        <Wire d="M620 440 L800 440" stroke={MUTED} width={1.4} dash="3 5" />
        <Wire d="M580 440 L620 440" stroke={MUTED} width={2.2} marker="url(#am1ArrM)" />
        <M x="620" y="460" size={12} fill={MUTED}>(1, 0)</M>
      </g>
      <g className="am1m-cell-in" style={t(0.7)}>
        <Wire d="M580 440 L780 400" stroke={MUTED} width={2.4} marker="url(#am1ArrM)" />
        <M x="700" y="384" size={12} fill={MUTED}>A(1,0) = (5,1)</M>
      </g>
    </Scene>
  )
}


/* ── Dispatch ────────────────────────────────────────────────────── */

function matchKeyword() {
  // Unreachable while VISUAL_MAP covers every unit; see beatVisual.
  return null
}

/** The worked trace for a unit: given → steps → result, built from the unit's
 *  own dry run, so no two units produce the same board. */
export function DryRunBoardScene({ dryRun, topic }) {
  const steps = (dryRun?.steps || []).slice(0, 5)
  // 62% of result strings wrap past one line, and a fixed 56px box sliced
  // every one of them through its second line. Grow into the free space
  // under the steps instead, stopping short of the 520-tall canvas edge.
  // ponytail: line count estimated at ~100 chars per 716px line of 13px text;
  // measure the foreignObject if a font change ever breaks the estimate.
  const givenLines = Math.min(3, Math.max(1, Math.ceil(String(dryRun?.input || '').length / 100)))
  const shift = (givenLines - 1) * 17 // a two-line GIVEN clipped its second line in a 62px box
  // Size the RESULT box to the lines its own text needs first, then divide
  // whatever's left among the steps -- sizing steps first and giving RESULT
  // the leftover is what let long results get clipped to a sliver.
  const resultLines = Math.min(3, Math.max(1, Math.ceil(String(dryRun?.result || '').length / 100)))
  const resultH = 30 + resultLines * 18
  // Bottom capped at 480, not 500: the caption sits at y=504, and its bottom
  // border was striking through the caption text when the card ran to 500.
  const stepsAvail = 480 - resultH - 10 - (136 + shift)
  const pitch = Math.min(58, stepsAvail / Math.max(1, steps.length))
  const stepH = Math.min(50, pitch - 6)
  const top = 136 + shift + steps.length * pitch + 10
  return (
    <Scene caption={`Worked trace — ${topic || 'this unit'}`}>
      <rect x="56" y="54" width="788" height={62 + shift} rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
      <L x="92" y="80" size={12.5} fill={BLUE} anchor="start">
        GIVEN
      </L>
      <foreignObject x="92" y="82" width="716" height={30 + shift}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#152430' }}>
          {dryRun?.input || '—'}
        </div>
      </foreignObject>
      {steps.map((st, i) => (
        <g key={String(st)} className={`am1m-slide-in am1m-delay-${i}`}>
          <rect x="56" y={130 + shift + i * pitch} width="788" height={stepH} rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="90" cy={130 + shift + i * pitch + stepH / 2} r="13" fill={AMBER} />
          <L x="90" y={136 + shift + i * pitch + stepH / 2} size={13} fill={WHITE}>
            {i + 1}
          </L>
          <foreignObject x="114" y={138 + shift + i * pitch} width="716" height={stepH - 14}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#152430', display: 'flex', alignItems: 'center', height: '100%' }}
            >
              {String(st)}
            </div>
          </foreignObject>
        </g>
      ))}
      <g className="am1m-emerge">
        <rect x="56" y={top} width="788" height={resultH} rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <L x="92" y={top + 24} size={12.5} fill={GREEN} anchor="start">
          RESULT
        </L>
        <foreignObject x="92" y={top + 26} width="716" height={resultH - 30}>
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '750 13px/1.2 system-ui,sans-serif', color: '#15803d' }}>
            {dryRun?.result || '—'}
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

const VISUAL_MAP = {
  // Module 2 — Partial Differentiation
  'surface-slice-slopes': M2SurfaceSliceSlopesScene,
  'derivative-branching-tree': M2DerivativeBranchingTreeScene,
  'laplace-cancellation-columns': M2LaplaceCancellationColumnsScene,
  'two-paths-polar-grid': M2TwoPathsPolarGridScene,
  'dependency-path-tree': M2DependencyPathTreeScene,
  'cylinder-rate-gauges': M2CylinderRateGaugesScene,
  'level-curve-gradient-tangent': M2LevelCurveGradientTangentScene,
  'two-layer-variable-network': M2TwoLayerVariableNetworkScene,
  'link-derivative-sign-table': M2LinkDerivativeSignTableScene,
  'grid-square-to-parallelogram': M2GridSquareToParallelogramScene,
  'jacobian-3x3-zero-hunt': M2Jacobian3x3ZeroHuntScene,
  'jacobian-chain-conveyor': M2JacobianChainConveyorScene,
  'plane-collapses-to-curve': M2PlaneCollapsesToCurveScene,
  'taylor-polynomials-hugging-curve': M2TaylorPolynomialsHuggingCurveScene,
  'two-routes-to-coefficients': M2TwoRoutesToCoefficientsScene,
  'log-series-term-ladder': M2LogSeriesTermLadderScene,
  // Module 3 — Integral Calculus
  'reduction-staircase': M3ReductionStaircaseScene,
  'sin-power-parts-split': M3SinPowerPartsSplitScene,
  'cos-power-method-chooser': M3CosPowerMethodChooserScene,
  'wallis-fraction-ladder': M3WallisFractionLadderScene,
  'mixed-power-grid-walk': M3MixedPowerGridWalkScene,
  'three-countdown-fraction': M3ThreeCountdownFractionScene,
  'indefinite-vs-definite-split': M3IndefiniteVsDefiniteSplitScene,
  'sine-substitution-map': M3SineSubstitutionMapScene,
  'tangent-fold-infinity': M3TangentFoldInfinityScene,
  'angle-rescale-pipeline': M3AngleRescalePipelineScene,
  'rectangle-strip-sweep': M3RectangleStripSweepScene,
  'parabola-strip-comparison': M3ParabolaStripComparisonScene,
  'nested-box-integrals': M3NestedBoxIntegralsScene,
  'octant-limit-chain': M3OctantLimitChainScene,
  'twin-parabola-area': M3TwinParabolaAreaScene,
  'cardioid-outside-circle': M3CardioidOutsideCircleScene,
  // Module 4 — Vector Calculus
  'vector-derivative-rules': M4VectorDerivativeRulesScene,
  'velocity-tangent-curve': M4VelocityTangentCurveScene,
  'normal-tangential-accel': M4NormalTangentialAccelScene,
  'scalar-vector-fields-comparison': M4ScalarVectorFieldsComparisonScene,
  'del-operator-anatomy': M4DelOperatorAnatomyScene,
  'gradient-uphill-normal': M4GradientUphillNormalScene,
  'directional-derivative-projection': M4DirectionalDerivativeProjectionScene,
  'divergence-source-sink': M4DivergenceSourceSinkScene,
  'curl-paddle-wheel': M4CurlPaddleWheelScene,
  'div-curl-physical': M4DivCurlPhysicalScene,
  'second-order-del-identities': M4SecondOrderDelIdentitiesScene,
  'solenoidal-flow': M4SolenoidalFlowScene,
  'solenoidal-constant-problem': M4SolenoidalConstantProblemScene,
  'irrotational-field-nospin': M4IrrotationalFieldNospinScene,
  'scalar-potential-concept': M4ScalarPotentialConceptScene,
  'potential-exact-differential': M4PotentialExactDifferentialScene,
  // Module 1 — Polar Curves and Curvature
  'polar-grid-point-locator': M1PolarPointScene,
  'cartesian-polar-translation-table': M1CartPolarTableScene,
  'polar-curve-gallery': M1PolarGalleryScene,
  'lemniscate-tracing-checklist': M1LemniscateTraceScene,
  'chord-to-tangent-limit': M1ChordTangentScene,
  'log-diff-derivation-ladder': M1LogDiffLadderScene,
  'tangent-direction-psi-triangle': M1PsiTriangleScene,
  'two-curve-common-radius': M1CommonRadiusScene,
  'orthogonal-cardioid-pair': M1OrthoCardioidScene,
  'pedal-perpendicular-triangle': M1PedalTriangleScene,
  'theta-elimination-funnel': M1ThetaFunnelScene,
  'ellipse-tangent-perpendicular': M1EllipsePedalScene,
  'taylor-cancellation-zoom': M1TaylorCancelScene,
  'growth-race-ladder': M1GrowthLadderScene,
  'difference-to-quotient-merge': M1DiffToQuotientScene,
  'log-exponent-unwrap': M1LogUnwrapScene,
  // Module 5 — Introduction to linear algebra
  'three-row-moves-panel': M5ThreeRowMovesScene,
  'echelon-staircase-3x4': M5EchelonStaircaseScene,
  'minor-search-window': M5MinorSearchScene,
  'surviving-rows-counter': M5SurvivingRowsScene,
  'rank-versus-k-switch': M5RankVersusKScene,
  'augmented-bar-comparison': M5AugmentedBarScene,
  'rank-decision-tree': M5RankDecisionScene,
  'k-p-case-plane': M5KpCasePlaneScene,
  'homogeneous-rank-gate': M5HomogeneousGateScene,
  'triangle-then-climb': M5TriangleClimbScene,
  'checksum-ledger': M5ChecksumScene,
  'pivot-swap-rescue': M5PivotSwapScene,
  'converge-vs-diverge-traces': M5ConvergeDivergeScene,
  'seidel-sweep-relay': M5SeidelRelayScene,
  'trace-det-quadratic': M5TraceDetScene,
  'eigen-directions-plane': M5EigenDirectionsScene,
  /* __VISUAL_MAP__ */
}

function mechanismFor(unit) {
  const key = unit?.visual
  const Comp = (key && VISUAL_MAP[key]) || null
  if (Comp) return Comp
  const blob = `${key || ''} ${unit?.topic || ''} ${(unit?.terms || []).join(' ')}`.toLowerCase()
  return matchKeyword(blob)
}

/**
 * Beat 0 introduces the mechanism and beat 1 watches it run, so both show the
 * diagram. Beat 2 pairs the written procedure with the worked trace built from
 * the unit's own `dryRun`. Beat 3 returns to the diagram so the numbers on its
 * left have something to point at.
 */
export function beatVisual(unit, beatIndex = 0) {
  if (beatIndex === 2 && unit?.dryRun) {
    return <DryRunBoardScene dryRun={unit.dryRun} topic={unit.topic} />
  }
  const Comp = mechanismFor(unit)
  if (Comp) return <Comp />
  // Last resort: the unit still gets an animated board built from its own terms.
  return <ConceptBoard title={unit?.topic || 'Concept'} points={unit?.terms || []} />
}

/** How many of this module's units have a hand-built scene rather than the
 *  generic board — surfaced in DEV so gaps are visible, not silent. */
export function visualCoverage(units = []) {
  const mapped = units.filter((u) => VISUAL_MAP[u.visual]).length
  return { mapped, total: units.length }
}


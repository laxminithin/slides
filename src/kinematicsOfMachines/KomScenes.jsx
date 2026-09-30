/**
 * KomScenes — VTU BEE613D Electric Motor and Drive Systems for EVs classroom
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
    <div className={`kom-scene ${className}`} aria-label={caption || 'Kinematics of Machines diagram'}>
      <svg viewBox={vb} role="img" className="kom-svg" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="komArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="komArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="komArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="komArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="komArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="komArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="komArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="komArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="komArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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

function markerFor(tone) {
  if (tone === BLUE) return 'komArrB'
  if (tone === AMBER) return 'komArrA'
  if (tone === ROSE) return 'komArrRo'
  if (tone === GREEN) return 'komArrG'
  if (tone === PURP) return 'komArrP'
  if (tone === TEAL) return 'komArrT'
  if (tone === RED) return 'komArrR'
  if (tone === MUTED) return 'komArrM'
  return 'komArr'
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
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#komArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#komArr)" />
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

function sinePath(x0, y0, w, amp, cycles = 2, phase = 0, steps = 120) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const x = x0 + t * w
    const y = y0 - amp * Math.sin(2 * Math.PI * cycles * t + phase)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

function Wave({ x, y, w, amp, cycles = 3, phase = 0, stroke = BLUE, width = 2.4, className = '', dash, opacity }) {
  return (
    <Wire
      d={sinePath(n(x), n(y), n(w), n(amp), n(cycles), n(phase))}
      stroke={stroke}
      width={width}
      className={className}
      dash={dash}
      opacity={opacity}
    />
  )
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

/* ── Circuit elements ───────────────────────────────────────────── */


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

/** Horizontal bars — impedance magnitudes, power shares, Q comparisons. */
function Bars({ x, y, w, items = [], accent = BLUE, rowH = 34, className = 'komm-bar', max }) {
  const [X, Y, W] = [n(x), n(y), n(w)]
  const top = max || Math.max(...items.map(([, v]) => Number(v) || 0), 1)
  return (
    <g>
      {items.map(([label, value, tone], i) => (
        <g key={`${label}-${i}`}>
          <M x={X - 10} y={Y + i * rowH + 17} size={12} fill={MUTED} anchor="end" weight={800}>
            {label}
          </M>
          <rect x={X} y={Y + i * rowH} width={W} height="22" rx="6" fill={SKY} />
          <g className={`${className} komm-delay-${i % 5}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
            <rect x={X} y={Y + i * rowH} width={Math.max(4, (W * (Number(value) || 0)) / top)} height="22" rx="6" fill={tone || accent} />
          </g>
          <M x={X + W + 10} y={Y + i * rowH + 17} size={11.5} fill={tone || accent} anchor="start" weight={800}>
            {String(value)}
          </M>
        </g>
      ))}
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
          className={`komm-flux komm-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`komm-current komm-delay-${i}`}
          marker="url(#komArrB)"
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
        <g key={t} className={`komm-cell-in komm-delay-${i}`}>
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
        <g key={String(p)} className={`komm-cell-in komm-delay-${i % 5}`}>
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

/* ── KOM-specific primitives ─────────────────────────────────────────── */

/* Scene helpers unique to Kinematics of Machines land here. Coerce every numeric
   prop through n() -- including width/length props, not just x and y. */


/* ── Module 1 ────────────────────────────────────────────────────────── */

/* ── Module 1  Mechanisms and Machines ───────────────────────────── */

/* Local linkage primitives. Nearly every module-1 scene draws a four-bar in a
   true pose, so the pose is solved here rather than eyeballed per scene. All
   numeric props pass through n() first — size props included. */

/* Reveal sequencing. An inline delay, because the komm-delay-1..4 classes are
   declared before the reveal keyframes and lose to their `animation` shorthand. */
const m1d = (s) => ({ animationDelay: `${s}s` })

/* Rotate about an exact pivot in canvas units, whatever the element's bbox. */
const m1pivot = (x, y, s = 0) => ({ transformBox: 'view-box', transformOrigin: `${n(x)}px ${n(y)}px`, animationDelay: `${s}s` })

/* Intersection of circle (P, r1) with circle (Q, r2); `sign` picks the branch
   (-1 = left of P→Q, which is screen-up when Q lies to the right of P). */
function m1Meet(P, r1, Q, r2, sign = -1) {
  const [px, py, qx, qy, R1, R2] = [n(P[0]), n(P[1]), n(Q[0]), n(Q[1]), n(r1), n(r2)]
  const dx = qx - px
  const dy = qy - py
  const d = Math.hypot(dx, dy)
  if (!d || d > R1 + R2 || d < Math.abs(R1 - R2)) return null
  const a = (R1 * R1 - R2 * R2 + d * d) / (2 * d)
  const h = Math.sqrt(Math.max(0, R1 * R1 - a * a))
  return [px + (a * dx) / d - (sign * h * dy) / d, py + (a * dy) / d + (sign * h * dx) / d]
}

/* Four-bar pose: crank O2A = a at `deg` (counter-clockwise on screen),
   coupler AB = b, follower O4B = c. Null where the chain cannot close. */
function m1Pose(o2, o4, a, b, c, deg, sign = -1) {
  const t = (n(deg) * Math.PI) / 180
  const A = [n(o2[0]) + n(a) * Math.cos(t), n(o2[1]) - n(a) * Math.sin(t)]
  const B = m1Meet(A, b, o4, c, sign)
  return B ? { A, B } : null
}

/* A point fixed to the coupler: fraction u along AB, v units to its left. */
function m1On(A, B, u, v = 0) {
  const dx = B[0] - A[0]
  const dy = B[1] - A[1]
  const len = Math.hypot(dx, dy) || 1
  return [A[0] + n(u) * dx + (n(v) * dy) / len, A[1] + n(u) * dy - (n(v) * dx) / len]
}

/* Coupler curve of point (u, v) over a full crank turn. */
function m1Trace(o2, o4, a, b, c, u, v, sign = -1, step = 4) {
  const pts = []
  for (let d = 0; d <= 360; d += step) {
    const p = m1Pose(o2, o4, a, b, c, d, sign)
    if (p) pts.push(m1On(p.A, p.B, u, v))
  }
  return pts
}

/* Velocity directions (unit vector + displacement per half degree) of A, B
   and a coupler point, by finite difference of two neighbouring poses. */
function m1Vel(o2, o4, a, b, c, deg, P = [0.5, 0], sign = -1) {
  const p0 = m1Pose(o2, o4, a, b, c, deg, sign)
  const p1 = m1Pose(o2, o4, a, b, c, n(deg) + 0.5, sign)
  const unit = (s, e) => {
    const dx = e[0] - s[0]
    const dy = e[1] - s[1]
    const len = Math.hypot(dx, dy) || 1
    return [dx / len, dy / len, len]
  }
  return { A: unit(p0.A, p1.A), B: unit(p0.B, p1.B), P: unit(m1On(p0.A, p0.B, P[0], P[1]), m1On(p1.A, p1.B, P[0], P[1])) }
}

const m1Tip = (p, u, len) => [n(p[0]) + u[0] * n(len), n(p[1]) + u[1] * n(len)]
const m1Shift = (pts, dx, dy) => pts.map(([x, y]) => [x + n(dx), y + n(dy)])

function M1Bar({ p, q, tone = N, w = 7, dash, opacity, className = '', style }) {
  return (
    <path
      d={`M${n(p[0]).toFixed(1)} ${n(p[1]).toFixed(1)} L${n(q[0]).toFixed(1)} ${n(q[1]).toFixed(1)}`}
      stroke={tone}
      strokeWidth={n(w)}
      strokeLinecap="round"
      fill="none"
      strokeDasharray={dash}
      opacity={opacity}
      className={className}
      style={style}
    />
  )
}

function M1Pin({ x, y, tone = N, r = 5.5 }) {
  return <circle cx={n(x)} cy={n(y)} r={n(r)} fill={WHITE} stroke={tone} strokeWidth="2.4" />
}

function M1Arrow({ from, to, tone = N, w = 2.2, dash, className = '', style }) {
  return (
    <path
      d={`M${n(from[0]).toFixed(1)} ${n(from[1]).toFixed(1)} L${n(to[0]).toFixed(1)} ${n(to[1]).toFixed(1)}`}
      fill="none"
      stroke={tone}
      strokeWidth={n(w)}
      strokeLinecap="round"
      strokeDasharray={dash}
      markerEnd={`url(#${markerFor(tone)})`}
      className={className}
      style={style}
    />
  )
}

/* Fixed-pivot symbol: a hatched ground block under the pin. */
function M1Ground({ x, y, w = 34, tone = MUTED }) {
  const [X, Y, W] = [n(x), n(y), n(w)]
  const hatch = []
  for (let i = 0; i <= W; i += 7) hatch.push(`M${X - W / 2 + i} ${Y + 16} L${X - W / 2 + i - 6} ${Y + 23}`)
  return (
    <g>
      <path d={`M${X} ${Y} L${X - 10} ${Y + 16} L${X + 10} ${Y + 16} Z`} fill={SKY} stroke={tone} strokeWidth="2" />
      <path d={`M${X - W / 2} ${Y + 16} L${X + W / 2} ${Y + 16} ${hatch.join(' ')}`} stroke={tone} strokeWidth="1.8" fill="none" />
    </g>
  )
}

/* The link chosen as frame: a heavy bar hatched along one side. */
function M1Frame({ p, q, tone = MUTED, w = 9, side = 1 }) {
  const [px, py, qx, qy] = [n(p[0]), n(p[1]), n(q[0]), n(q[1])]
  const len = Math.hypot(qx - px, qy - py) || 1
  const [ux, uy] = [(qx - px) / len, (qy - py) / len]
  const [nx, ny] = [-uy * n(side), ux * n(side)]
  const hatch = []
  for (let s = 6; s < len - 4; s += 9) {
    const [bx, by] = [px + ux * s + nx * 6, py + uy * s + ny * 6]
    hatch.push(`M${bx.toFixed(1)} ${by.toFixed(1)} L${(bx + nx * 8 - ux * 5).toFixed(1)} ${(by + ny * 8 - uy * 5).toFixed(1)}`)
  }
  return (
    <g>
      <path d={hatch.join(' ')} stroke={tone} strokeWidth="1.6" fill="none" />
      <M1Bar p={[px, py]} q={[qx, qy]} tone={tone} w={w} />
    </g>
  )
}

/* A four-bar in one pose: crank, coupler (a plate when P is given), follower. */
function M1FourBar({ o2, o4, a, b, c, deg, sign = -1, P, tones = [BLUE, AMBER, TEAL], w = 6, ground = true, dash, opacity, className = '', style }) {
  const pose = m1Pose(o2, o4, a, b, c, deg, sign)
  if (!pose) return null
  const { A, B } = pose
  const O2 = [n(o2[0]), n(o2[1])]
  const O4 = [n(o4[0]), n(o4[1])]
  const Pt = P ? m1On(A, B, P[0], P[1]) : null
  return (
    <g opacity={opacity} className={className} style={style}>
      {ground ? <M1Ground x={O2[0]} y={O2[1]} /> : null}
      {ground ? <M1Ground x={O4[0]} y={O4[1]} /> : null}
      <M1Bar p={O2} q={A} tone={tones[0]} w={w} dash={dash} />
      {Pt ? (
        <path
          d={`M${A[0].toFixed(1)} ${A[1].toFixed(1)} L${Pt[0].toFixed(1)} ${Pt[1].toFixed(1)} L${B[0].toFixed(1)} ${B[1].toFixed(1)} Z`}
          fill={tones[1]}
          fillOpacity="0.14"
          stroke={tones[1]}
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeDasharray={dash}
        />
      ) : null}
      <M1Bar p={A} q={B} tone={tones[1]} w={w} dash={dash} />
      <M1Bar p={O4} q={B} tone={tones[2]} w={w} dash={dash} />
      <M1Pin x={O2[0]} y={O2[1]} />
      <M1Pin x={O4[0]} y={O4[1]} />
      <M1Pin x={A[0]} y={A[1]} />
      <M1Pin x={B[0]} y={B[1]} />
      {Pt ? <Dot cx={Pt[0]} cy={Pt[1]} r={4.5} fill={tones[1]} /> : null}
    </g>
  )
}

/* Unit 1 — kinematics-kinetics-analysis-synthesis */
export function M1KinematicsKineticsScene() {
  const o2 = [164, 214]
  const o4 = [292, 214]
  const [a, b, c, deg] = [36, 108, 84, 62]
  const P = [0.45, 28]
  const { A, B } = m1Pose(o2, o4, a, b, c, deg)
  const Pt = m1On(A, B, P[0], P[1])
  const vel = m1Vel(o2, o4, a, b, c, deg, P)
  const path = m1Trace(o2, o4, a, b, c, P[0], P[1])
  const dy = 208
  const lo = (p) => [p[0], p[1] + dy]
  const vScale = 44 / vel.A[2]
  const vA = m1Tip(A, vel.A, 44)
  const vB = m1Tip(B, vel.B, vel.B[2] * vScale)
  const vP = m1Tip(Pt, vel.P, vel.P[2] * vScale)
  /* centripetal acceleration of A points at O2 — drawn beside the crank */
  const toO2 = [(o2[0] - A[0]) / a, (o2[1] - A[1]) / a]
  const aStart = [A[0] - toO2[1] * 12, A[1] + toO2[0] * 12]
  const ab = [(B[0] - A[0]) / b, (B[1] - A[1]) / b]
  /* park a copy of the coupler curve at a chosen centre */
  const centre = (pts, cx, cy) => {
    const xs = pts.map((p) => p[0])
    const ys = pts.map((p) => p[1])
    return m1Shift(pts, cx - (Math.min(...xs) + Math.max(...xs)) / 2, cy - (Math.min(...ys) + Math.max(...ys)) / 2)
  }
  const [tx, ty] = [o2[0], o2[1] + dy]
  return (
    <Scene caption="Two splits: motion vs force, and given-mechanism vs required-motion">
      <L x={305} y={27} size={15} fill={BLUE}>ANALYSIS</L>
      <L x={305} y={45} size={12} fill={MUTED} weight={700}>given mechanism → what it does</L>
      <L x={695} y={27} size={15} fill={MUTED}>SYNTHESIS</L>
      <L x={695} y={45} size={12} fill={MUTED} weight={700}>required motion → what mechanism?</L>
      <L x={58} y={146} size={14} fill={BLUE}>KINEMATICS</L>
      <L x={58} y={164} size={11.5} fill={MUTED} weight={700}>motion only</L>
      <L x={58} y={354} size={14} fill={ROSE}>KINETICS</L>
      <L x={58} y={372} size={11.5} fill={MUTED} weight={700}>forces + motion</L>

      <rect x="112" y="56" width="384" height="198" rx="10" fill={WHITE} stroke={BLUE} strokeWidth="2" />
      <rect x="112" y="262" width="384" height="198" rx="10" fill={WHITE} stroke={ROSE} strokeWidth="2" />
      <rect x="504" y="56" width="384" height="198" rx="10" fill={SKY} fillOpacity="0.5" stroke={MUTED} strokeWidth="2" strokeDasharray="7 6" />
      <rect x="504" y="262" width="384" height="198" rx="10" fill={SKY} fillOpacity="0.5" stroke={MUTED} strokeWidth="2" strokeDasharray="7 6" />

      {/* Kinematics: the linkage with velocity and acceleration only */}
      <M1FourBar o2={o2} o4={o4} a={a} b={b} c={c} deg={deg} P={P} className="komm-emerge" />
      <g className="komm-slide-in" style={m1d(0.6)}>
        <M1Arrow from={A} to={vA} tone={BLUE} />
        <M1Arrow from={B} to={vB} tone={BLUE} />
        <M1Arrow from={Pt} to={vP} tone={BLUE} />
        <M1Arrow from={aStart} to={[aStart[0] + toO2[0] * 28, aStart[1] + toO2[1] * 28]} tone={PURP} />
      </g>
      <g className="komm-slide-in" style={m1d(0.6)}>
        <L x={126} y={80} size={12} fill={BLUE} anchor="start">v velocity</L>
        <L x={126} y={97} size={12} fill={PURP} anchor="start">a acceleration</L>
      </g>
      <M1Arrow from={[330, 150]} to={[378, 150]} tone={BLUE} w={2.4} className="komm-flow-arrow" />
      <Curve pts={centre(path, 438, 150)} stroke={BLUE} width={2.6} className="komm-draw" />
      <L x={438} y={214} size={12} fill={BLUE} weight={800}>motion path</L>
      <g className="komm-cell-in" style={m1d(2.2)}>
        <rect x="392" y="64" width="96" height="26" rx="6" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
        <M x={440} y={82} size={12} fill={BLUE} weight={800}>M1 M2 M3 M5</M>
      </g>

      {/* Kinetics: the same linkage, now with forces at the joints */}
      <M1FourBar o2={lo(o2)} o4={lo(o4)} a={a} b={b} c={c} deg={deg} P={P} className="komm-emerge" />
      <g className="komm-emerge" style={m1d(1.4)}>
        <M1Arrow from={[A[0] + 34, A[1] + 16 + dy]} to={lo(A)} tone={ROSE} w={2.4} />
        <M1Arrow from={[B[0] + ab[0] * 34, B[1] + ab[1] * 34 + dy]} to={lo(B)} tone={ROSE} w={2.4} />
        <M1Arrow from={[tx - 44, ty + 8]} to={[tx - 11, ty + 8]} tone={ROSE} w={2.4} />
        <M1Arrow from={[o4[0] + 44, o4[1] + dy + 8]} to={[o4[0] + 11, o4[1] + dy + 8]} tone={ROSE} w={2.4} />
        <path d={`M${tx - 4} ${ty - 24} A 24 24 0 0 0 ${tx - 24} ${ty - 4}`} fill="none" stroke={ROSE} strokeWidth="2.2" markerEnd={`url(#${markerFor(ROSE)})`} />
      </g>
      <g className="komm-emerge" style={m1d(1.4)}><M x={tx - 40} y={ty - 30} size={12} fill={ROSE}>T</M></g>
      <L x={410} y={330} size={12.5} fill={ROSE} weight={800}>same linkage</L>
      <L x={410} y={348} size={12.5} fill={ROSE} weight={800}>+ forces at every joint</L>
      <L x={410} y={380} size={11.5} fill={MUTED} weight={700}>needs the motion first</L>
      <g className="komm-cell-in" style={m1d(2.4)}>
        <rect x="392" y="400" width="96" height="26" rx="6" fill={WHITE} stroke={ROSE} strokeWidth="2.2" />
        <M x={440} y={418} size={12} fill={ROSE} weight={800}>M3 M4</M>
      </g>

      {/* Synthesis: required path back to an unknown, dashed linkage */}
      <Curve pts={centre(path, 780, 150)} stroke={GREEN} width={3} />
      <L x={780} y={214} size={12} fill={GREEN} weight={800}>required path</L>
      <M1Arrow from={[708, 150]} to={[648, 150]} tone={MUTED} w={2.4} className="komm-flow-arrow" />
      <M1FourBar o2={[540, 214]} o4={[626, 214]} a={26} b={80} c={60} deg={70} tones={[MUTED, MUTED, MUTED]} w={3.5} dash="6 5" ground={false} />
      <L x={583} y={114} size={22} fill={MUTED}>?</L>
      <L x={583} y={244} size={11.5} fill={MUTED} weight={700}>unknown linkage</L>
      <M1FourBar o2={[540, 422]} o4={[626, 422]} a={26} b={80} c={60} deg={70} tones={[MUTED, MUTED, MUTED]} w={3.5} dash="6 5" ground={false} />
      <M1Arrow from={[708, 372]} to={[648, 372]} tone={MUTED} w={2.4} className="komm-flow-arrow" />
      <L x={790} y={366} size={12} fill={MUTED} weight={800}>required force</L>
      <L x={790} y={384} size={12} fill={MUTED} weight={800}>or torque</L>
      <L x={583} y={322} size={22} fill={MUTED}>?</L>
      <g className="komm-cell-in" style={m1d(2.6)}>
        <rect x="738" y="64" width="142" height="26" rx="6" fill={WHITE} stroke={RED} strokeWidth="2.2" />
        <L x={809} y={82} size={11.5} fill={RED}>BEYOND SYLLABUS</L>
        <rect x="738" y="270" width="142" height="26" rx="6" fill={WHITE} stroke={RED} strokeWidth="2.2" />
        <L x={809} y={288} size={11.5} fill={RED}>BEYOND SYLLABUS</L>
      </g>
    </Scene>
  )
}

/* Unit 2 — link-node-pair-anatomy */
export function M1LinkAnatomyScene() {
  const o2 = [110, 390]
  const o4 = [430, 390]
  const [a, b, c, deg] = [80, 250, 170, 70]
  const { A, B } = m1Pose(o2, o4, a, b, c, deg)
  const T = m1On(A, B, 0.45, 70)
  const mid = [260, 320]
  /* push each link 9 units away from the middle of the chain */
  const out = (pts) => {
    const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length
    const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length
    const len = Math.hypot(cx - mid[0], cy - mid[1]) || 1
    return pts.map(([x, y]) => [x + ((cx - mid[0]) / len) * 9, y + ((cy - mid[1]) / len) * 9])
  }
  const eye = (p, tone, key) => (
    <g key={key}>
      <circle cx={p[0]} cy={p[1]} r="10" fill={WHITE} stroke={tone} strokeWidth="2.6" />
      <circle cx={p[0]} cy={p[1]} r="4" fill={CREAM} stroke={tone} strokeWidth="1.4" />
    </g>
  )
  const crank = out([o2, A])
  const coup = out([A, B, T])
  const foll = out([o4, B])
  const frame = [[o2[0], o2[1] + 12], [o4[0], o4[1] + 12]]
  /* the side panel's miniature: same pose at half scale */
  const mini = (p, oy) => [36 + (p[0] - o2[0]) * 0.5, oy + (p[1] - o2[1]) * 0.5]
  const m1 = { o2: mini(o2, 186), o4: mini(o4, 186), A: mini(A, 186), B: mini(B, 186), T: mini(T, 186) }
  const m2 = { o2: mini(o2, 404), o4: mini(o4, 404), A: mini(A, 404), B: mini(B, 404), T: mini(T, 404) }
  const tri = (p, q, r) => `M${p[0].toFixed(1)} ${p[1].toFixed(1)} L${q[0].toFixed(1)} ${q[1].toFixed(1)} L${r[0].toFixed(1)} ${r[1].toFixed(1)} Z`
  return (
    <Scene caption="Links, their nodes, and the pin-in-hole pairs that join them">
      {/* exploded links: each pulled off its pins */}
      <g className="komm-emerge">
        <M1Frame p={frame[0]} q={frame[1]} />
        {eye(frame[0], MUTED, 'f0')}
        {eye(frame[1], MUTED, 'f1')}
        <M1Bar p={crank[0]} q={crank[1]} tone={BLUE} w={12} opacity={0.3} />
        {eye(crank[0], BLUE, 'c0')}
        {eye(crank[1], BLUE, 'c1')}
        <path d={tri(coup[0], coup[2], coup[1])} fill={AMBER} fillOpacity="0.14" stroke={AMBER} strokeWidth="2.6" strokeLinejoin="round" />
        {eye(coup[0], AMBER, 'k0')}
        {eye(coup[1], AMBER, 'k1')}
        {eye(coup[2], AMBER, 'k2')}
        <M1Bar p={foll[0]} q={foll[1]} tone={TEAL} w={12} opacity={0.3} />
        {eye(foll[0], TEAL, 't0')}
        {eye(foll[1], TEAL, 't1')}
      </g>
      {[o2, A, B, o4].map((p, i) => <Dot key={`pin${i}`} cx={p[0]} cy={p[1]} r={4} fill={N} />)}
      <Dot cx={T[0]} cy={T[1]} r={4.5} fill={ROSE} />
      <L x={T[0] - 16} y={T[1] - 16} size={11.5} fill={ROSE} weight={800} anchor="end">tracing point</L>

      {/* node counts */}
      <g className="komm-cell-in" style={m1d(0.9)}>
        <L x={270} y={446} size={13} fill={MUTED}>1 frame · binary · 2 nodes</L>
        <L x={94} y={300} size={13} fill={BLUE} anchor="end">2 crank</L>
        <L x={94} y={316} size={11.5} fill={BLUE} weight={700} anchor="end">binary</L>
        <L x={290} y={188} size={13} fill={AMBER}>3 coupler · ternary</L>
        <L x={290} y={204} size={11.5} fill={AMBER} weight={700}>3 nodes</L>
        <L x={420} y={300} size={13} fill={TEAL} anchor="start">4 follower</L>
        <L x={420} y={316} size={11.5} fill={TEAL} weight={700} anchor="start">binary</L>
      </g>

      {/* joint B magnified: two pairing surfaces, pin and hole */}
      <g className="komm-emerge" style={m1d(1.6)}>
        <path d={`M${B[0] - 6} ${B[1] - 12} L440 146`} stroke={MUTED} strokeWidth="1.8" strokeDasharray="4 4" fill="none" />
        <circle cx={B[0]} cy={B[1]} r="16" fill="none" stroke={MUTED} strokeWidth="1.8" strokeDasharray="4 4" />
        <circle cx="486" cy="104" r="62" fill={WHITE} stroke={MUTED} strokeWidth="2.2" />
        <circle cx="486" cy="104" r="44" fill={AMBER} fillOpacity="0.16" stroke={AMBER} strokeWidth="3" />
        <circle cx="486" cy="104" r="24" fill={CREAM} stroke={AMBER} strokeWidth="3" />
        <circle cx="486" cy="108" r="20" fill={SKY} stroke={N} strokeWidth="2.6" />
        <path d="M468 116 A 20 20 0 0 0 504 116" fill="none" stroke={ROSE} strokeWidth="4.5" strokeLinecap="round" className="komm-pulse" />
      </g>
      <g className="komm-emerge" style={m1d(1.6)}><L x={486} y={30} size={12.5} fill={N}>joint B, magnified</L></g>
      <g className="komm-emerge" style={m1d(1.6)}><L x={400} y={78} size={11.5} fill={AMBER} weight={800} anchor="end">hole in link 3</L></g>
      <g className="komm-emerge" style={m1d(1.6)}><L x={400} y={98} size={11.5} fill={N} weight={800} anchor="end">pin on link 4</L></g>
      <g className="komm-emerge" style={m1d(1.6)}><L x={500} y={186} size={11.5} fill={ROSE} weight={800}>pairing surfaces in contact</L></g>

      {/* the frame is a choice: shading jumps to link 2 */}
      <Card x={588} y={24} w={296} h={456} title="Which link is the frame? A choice" accent={N}>
        <L x={148} y={56} size={12} fill={MUTED}>link 1 fixed → crank-rocker</L>
        <M1Frame p={m1.o2} q={m1.o4} />
        <M1Bar p={m1.o2} q={m1.A} tone={BLUE} w={5} />
        <path d={tri(m1.A, m1.T, m1.B)} fill={AMBER} fillOpacity="0.14" stroke={AMBER} strokeWidth="2.2" strokeLinejoin="round" />
        <M1Bar p={m1.o4} q={m1.B} tone={TEAL} w={5} />
        {[m1.o2, m1.o4, m1.A, m1.B].map((p, i) => <M1Pin key={`a${i}`} x={p[0]} y={p[1]} r={4} />)}
        <path d="M20 232 L276 232" stroke={MUTED} strokeWidth="1.2" strokeDasharray="4 5" />
        <g className="komm-cell-in" style={m1d(2.6)}>
          <L x={148} y={270} size={12} fill={BLUE}>link 2 fixed → drag link</L>
          <M1Bar p={m2.o2} q={m2.o4} tone={MUTED} w={5} dash="7 5" />
          <M1Frame p={m2.o2} q={m2.A} tone={BLUE} side={-1} />
          <path d={tri(m2.A, m2.T, m2.B)} fill={AMBER} fillOpacity="0.14" stroke={AMBER} strokeWidth="2.2" strokeLinejoin="round" />
          <M1Bar p={m2.o4} q={m2.B} tone={TEAL} w={5} />
          {[m2.o2, m2.o4, m2.A, m2.B].map((p, i) => <M1Pin key={`b${i}`} x={p[0]} y={p[1]} r={4} />)}
        </g>
        <L x={148} y={436} size={11.5} fill={N} weight={800}>same links, same pairs — new motion</L>
      </Card>
    </Scene>
  )
}

/* Unit 3 — three-constraint-types-comparison */
export function M1ConstraintTypesScene() {
  const hit = (s) => ({ animationDelay: `${s}s` })
  return (
    <Scene caption="Constrained motion: what decides the bar's response to a push">
      <Card x={16} y={18} w={272} h={462} title="Completely constrained" accent={GREEN} foot="same response to every push" footTone={GREEN}>
        <L x={136} y={54} size={12.5} fill={MUTED} weight={700}>square bar · square hole</L>
        <rect x="100" y="112" width="72" height="30" fill={SKY} stroke={MUTED} strokeWidth="2" />
        <rect x="100" y="178" width="72" height="30" fill={SKY} stroke={MUTED} strokeWidth="2" />
        <g className="komm-shift">
          <rect x="46" y="142" width="190" height="36" rx="3" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        </g>
        <M1Arrow from={[70, 82]} to={[70, 136]} tone={ROSE} w={2.4} className="komm-spiral" style={hit(0)} />
        <M1Arrow from={[240, 88]} to={[218, 136]} tone={ROSE} w={2.4} className="komm-spiral" style={hit(1.05)} />
        <M1Arrow from={[8, 160]} to={[40, 160]} tone={ROSE} w={2.4} className="komm-spiral" style={hit(2.1)} />
        <M1Arrow from={[136, 232]} to={[92, 232]} tone={GREEN} w={2.4} />
        <M1Arrow from={[136, 232]} to={[180, 232]} tone={GREEN} w={2.4} />
        <L x={136} y={258} size={12.5} fill={GREEN}>slides along its axis</L>
        <rect x="98" y="284" width="76" height="76" fill={SKY} stroke={MUTED} strokeWidth="2" />
        <rect x="116" y="302" width="40" height="40" fill={WHITE} stroke={MUTED} strokeWidth="1.5" />
        <rect x="118" y="304" width="36" height="36" fill={BLUE} fillOpacity="0.22" stroke={BLUE} strokeWidth="2.2" />
        <L x={136} y={378} size={11} fill={MUTED} weight={700}>section: square in square</L>
        <M x={136} y={400} size={11.5} fill={N}>push ↓  → slides</M>
        <M x={136} y={418} size={11.5} fill={N}>push ↙  → slides</M>
        <M x={136} y={436} size={11.5} fill={N}>push →  → slides</M>
      </Card>

      <Card x={314} y={18} w={272} h={462} title="Incompletely constrained" accent={AMBER} foot="response depends on the push" footTone={AMBER}>
        <L x={136} y={54} size={12.5} fill={MUTED} weight={700}>round bar · round hole</L>
        <rect x="100" y="112" width="72" height="30" fill={SKY} stroke={MUTED} strokeWidth="2" />
        <rect x="100" y="178" width="72" height="30" fill={SKY} stroke={MUTED} strokeWidth="2" />
        <rect x="46" y="142" width="190" height="36" rx="18" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <M1Arrow from={[8, 160]} to={[40, 160]} tone={ROSE} w={2.4} className="komm-spiral" style={hit(0)} />
        <path d="M58 128 A 12 26 0 1 0 74 128" fill="none" stroke={ROSE} strokeWidth="2.4" markerEnd={`url(#${markerFor(ROSE)})`} className="komm-spiral" style={hit(1.6)} />
        <M1Arrow from={[120, 232]} to={[180, 232]} tone={AMBER} w={2.4} className="komm-spiral" style={hit(0)} />
        <path d="M206 128 A 12 26 0 1 1 222 128" fill="none" stroke={AMBER} strokeWidth="2.4" markerEnd={`url(#${markerFor(AMBER)})`} className="komm-spiral" style={hit(1.6)} />
        <L x={136} y={258} size={12.5} fill={AMBER}>slides … or turns?</L>
        <L x={226} y={250} size={26} fill={AMBER} className="komm-pulse">?</L>
        <circle cx="136" cy="322" r="38" fill={SKY} stroke={MUTED} strokeWidth="2" />
        <circle cx="136" cy="322" r="20" fill={WHITE} stroke={MUTED} strokeWidth="1.5" />
        <circle cx="136" cy="322" r="18" fill={BLUE} fillOpacity="0.22" stroke={BLUE} strokeWidth="2.2" />
        <L x={136} y={378} size={11} fill={MUTED} weight={700}>section: round in round</L>
        <M x={136} y={400} size={11.5} fill={N}>push →  → slides</M>
        <M x={136} y={418} size={11.5} fill={N}>twist ↻ → turns</M>
        <M x={136} y={436} size={11.5} fill={AMBER}>both → ? not definite</M>
      </Card>

      <Card x={612} y={18} w={272} h={462} title="Successfully constrained" accent={PURP} foot="definite — but only because of W" footTone={PURP}>
        <L x={136} y={54} size={12.5} fill={MUTED} weight={700}>round bar · bearing + collar</L>
        <M1Arrow from={[136, 66]} to={[136, 96]} tone={PURP} w={2.8} className="komm-emerge" style={hit(1.2)} />
        <g className="komm-emerge" style={hit(1.2)}><L x={150} y={84} size={12} fill={PURP} anchor="start">W — own weight</L></g>
        <rect x="124" y="100" width="24" height="210" rx="4" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <rect x="96" y="196" width="80" height="16" rx="3" fill={BLUE} fillOpacity="0.22" stroke={BLUE} strokeWidth="2.2" />
        <rect x="80" y="212" width="42" height="50" fill={SKY} stroke={MUTED} strokeWidth="2" />
        <rect x="150" y="212" width="42" height="50" fill={SKY} stroke={MUTED} strokeWidth="2" />
        <path d="M60 262 L212 262" stroke={MUTED} strokeWidth="2.2" />
        <path d="M96 212 L176 212" stroke={PURP} strokeWidth="4.5" strokeLinecap="round" className="komm-pulse" />
        <path d="M112 142 A 26 9 0 1 0 160 142" fill="none" stroke={GREEN} strokeWidth="2.4" markerEnd={`url(#${markerFor(GREEN)})`} className="komm-flow-arrow" />
        <L x={196} y={148} size={12} fill={GREEN} anchor="start">turns</L>
        <L x={200} y={196} size={11} fill={PURP} weight={800} anchor="start">collar</L>
        <L x={200} y={210} size={11} fill={PURP} weight={800} anchor="start">seats</L>
        <M1Arrow from={[136, 352]} to={[136, 316]} tone={ROSE} w={2.4} className="komm-spiral" style={hit(0)} />
        <L x={150} y={346} size={11.5} fill={ROSE} anchor="start">lift — W holds it</L>
        <M x={136} y={400} size={11.5} fill={N}>twist ↻ → turns</M>
        <M x={136} y={418} size={11.5} fill={N}>push ↓ → collar holds</M>
        <M x={136} y={436} size={11.5} fill={PURP}>lift ↑ → weight holds</M>
      </Card>
    </Scene>
  )
}

/* Unit 4 — rigid-resistant-body-loading */
export function M1RigidResistantScene() {
  const rows = [128, 250, 372]
  const tick = (x, y, key) => <path key={key} d={`M${x - 9} ${y} L${x - 2} ${y + 8} L${x + 11} ${y - 9}`} fill="none" stroke={GREEN} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  const cross = (x, y, key) => <path key={key} d={`M${x - 9} ${y - 9} L${x + 9} ${y + 9} M${x + 9} ${y - 9} L${x - 9} ${y + 9}`} stroke={RED} strokeWidth="4" strokeLinecap="round" />
  const rod = (x0, x1, y) => (
    <g>
      <rect x={x0 + 10} y={y - 6} width={x1 - x0 - 20} height="12" rx="4" fill={SKY} stroke={N} strokeWidth="2.2" />
      <circle cx={x0} cy={y} r="12" fill={WHITE} stroke={N} strokeWidth="2.4" />
      <circle cx={x0} cy={y} r="5" fill={CREAM} stroke={N} strokeWidth="1.5" />
      <circle cx={x1} cy={y} r="12" fill={WHITE} stroke={N} strokeWidth="2.4" />
      <circle cx={x1} cy={y} r="5" fill={CREAM} stroke={N} strokeWidth="1.5" />
      <path d={`M${x0} ${y + 24} L${x1} ${y + 24} M${x0} ${y + 18} L${x0} ${y + 30} M${x1} ${y + 18} L${x1} ${y + 30}`} stroke={MUTED} strokeWidth="1.6" fill="none" />
      <M x={(x0 + x1) / 2} y={y + 42} size={12} fill={MUTED}>L holds</M>
    </g>
  )
  const cyl = (x0, x1, y) => <path d={`M${x0} ${y - 18} L${x1} ${y - 18} M${x0} ${y + 18} L${x1} ${y + 18}`} stroke={N} strokeWidth="3" />
  const [r1, r2, r3] = rows
  return (
    <Scene caption="Rigid and resistant bodies — does the length hold under the load it carries?">
      <L x={370} y={40} size={14} fill={ROSE}>PULLED (tension)</L>
      <L x={710} y={40} size={14} fill={BLUE}>PUSHED (compression)</L>
      <path d="M20 58 L880 58 M20 189 L880 189 M20 311 L880 311" stroke={MUTED} strokeWidth="1.4" opacity="0.35" />

      <L x={108} y={r1 - 4} size={14.5} fill={N}>Steel connecting rod</L>
      <L x={108} y={r1 + 16} size={12.5} fill={GREEN}>rigid</L>
      <L x={108} y={r2 - 4} size={14.5} fill={N}>Flat belt</L>
      <L x={108} y={r2 + 16} size={12.5} fill={AMBER}>resistant: tension only</L>
      <L x={108} y={r3 - 4} size={14.5} fill={N}>Oil in a cylinder</L>
      <L x={108} y={r3 + 16} size={12.5} fill={AMBER}>resistant: compression only</L>

      {/* rod — holds its length both ways */}
      {rod(290, 450, r1)}
      {rod(630, 790, r1)}
      <g className="komm-emerge">
        <M1Arrow from={[278, r1]} to={[236, r1]} tone={ROSE} w={2.4} />
        <M1Arrow from={[462, r1]} to={[504, r1]} tone={ROSE} w={2.4} />
      </g>
      <g className="komm-emerge" style={m1d(1.2)}>
        <M1Arrow from={[572, r1]} to={[612, r1]} tone={BLUE} w={2.4} />
        <M1Arrow from={[848, r1]} to={[808, r1]} tone={BLUE} w={2.4} />
      </g>

      {/* belt — taut in tension, buckles into a loop in compression */}
      <rect x="296" y={r2 - 3} width="148" height="6" rx="2" fill={AMBER} fillOpacity="0.35" stroke={AMBER} strokeWidth="1.6" />
      <rect x="284" y={r2 - 10} width="12" height="20" rx="2" fill={WHITE} stroke={N} strokeWidth="2" />
      <rect x="444" y={r2 - 10} width="12" height="20" rx="2" fill={WHITE} stroke={N} strokeWidth="2" />
      <g className="komm-emerge">
        <M1Arrow from={[282, r2]} to={[240, r2]} tone={ROSE} w={2.4} />
        <M1Arrow from={[458, r2]} to={[500, r2]} tone={ROSE} w={2.4} />
      </g>
      <M x={370} y={r2 + 30} size={12} fill={MUTED}>stays straight, L holds</M>
      <rect x="624" y={r2 - 10} width="12" height="20" rx="2" fill={WHITE} stroke={N} strokeWidth="2" />
      <rect x="784" y={r2 - 10} width="12" height="20" rx="2" fill={WHITE} stroke={N} strokeWidth="2" />
      <path d={`M636 ${r2} L784 ${r2}`} stroke={AMBER} strokeWidth="5" opacity="0.5" className="komm-delete" style={m1d(1.2)} />
      <path
        d={`M636 ${r2} C 690 ${r2}, 734 ${r2 - 50}, 704 ${r2 - 54} C 674 ${r2 - 58}, 690 ${r2}, 784 ${r2}`}
        fill="none"
        stroke={AMBER}
        strokeWidth="5"
        className="komm-emerge"
        style={m1d(1.4)}
      />
      <g className="komm-emerge" style={m1d(1.2)}>
        <M1Arrow from={[578, r2]} to={[618, r2]} tone={BLUE} w={2.4} />
        <M1Arrow from={[842, r2]} to={[802, r2]} tone={BLUE} w={2.4} />
      </g>
      <M x={710} y={r2 + 30} size={12} fill={RED}>buckles into a loop</M>

      {/* oil column — cavitates when pulled, transmits a push */}
      {cyl(296, 444, r3)}
      <rect x="306" y={r3 - 16} width="48" height="32" fill={SKY} />
      <rect x="386" y={r3 - 16} width="48" height="32" fill={SKY} />
      <rect x="294" y={r3 - 16} width="12" height="32" fill={WHITE} stroke={N} strokeWidth="2" />
      <rect x="434" y={r3 - 16} width="12" height="32" fill={WHITE} stroke={N} strokeWidth="2" />
      <path d={`M294 ${r3} L266 ${r3} M446 ${r3} L474 ${r3}`} stroke={N} strokeWidth="4" />
      <g className="komm-emerge">
        <M1Arrow from={[264, r3]} to={[234, r3]} tone={ROSE} w={2.4} />
        <M1Arrow from={[476, r3]} to={[506, r3]} tone={ROSE} w={2.4} />
      </g>
      <M x={370} y={r3 + 38} size={12} fill={RED}>column separates</M>
      {cyl(636, 784, r3)}
      <rect x="646" y={r3 - 16} width="128" height="32" fill={SKY} />
      <path d={`M654 ${r3} L766 ${r3}`} stroke={BLUE} strokeWidth="3" fill="none" className="komm-current" />
      <rect x="634" y={r3 - 16} width="12" height="32" fill={WHITE} stroke={N} strokeWidth="2" />
      <rect x="774" y={r3 - 16} width="12" height="32" fill={WHITE} stroke={N} strokeWidth="2" />
      <path d={`M634 ${r3} L606 ${r3} M786 ${r3} L808 ${r3}`} stroke={N} strokeWidth="4" />
      <g className="komm-emerge" style={m1d(1.2)}>
        <M1Arrow from={[574, r3]} to={[602, r3]} tone={BLUE} w={2.4} />
        <M1Arrow from={[812, r3]} to={[846, r3]} tone={BLUE} w={2.4} />
      </g>
      <M x={710} y={r3 + 38} size={12} fill={MUTED}>push arrives at the far piston</M>

      <g className="komm-cell-in" style={m1d(2.4)}>
        {tick(506, r1 - 32, 't1')}
        {tick(846, r1 - 32, 't2')}
        {tick(506, r2 - 32, 't3')}
        {cross(846, r2 - 32, 'x1')}
        {cross(506, r3 - 32, 'x2')}
        {tick(846, r3 - 32, 't4')}
      </g>

      <g className="komm-cell-in" style={m1d(3)}>
        <rect x="40" y="424" width="820" height="56" rx="10" fill={SKY} />
        <L x={450} y={447} size={13.5} fill={N}>Kinematics asks one thing of a link: its length must hold under the load it actually carries.</L>
        <L x={450} y={467} size={12} fill={MUTED} weight={700}>A belt kept in tension, or oil kept in compression, is a valid link.</L>
      </g>
    </Scene>
  )
}

/* Arc on a circle, y-up degrees d0 → d1, drawn counter-clockwise on screen. */
function m1Arc(cx, cy, r, d0, d1) {
  const [X, Y, R] = [n(cx), n(cy), n(r)]
  const p = (d) => [X + R * Math.cos((d * Math.PI) / 180), Y - R * Math.sin((d * Math.PI) / 180)]
  const [s, e] = [p(n(d0)), p(n(d1))]
  const large = n(d1) - n(d0) > 180 ? 1 : 0
  return `M${s[0].toFixed(1)} ${s[1].toFixed(1)} A${R} ${R} 0 ${large} 0 ${e[0].toFixed(1)} ${e[1].toFixed(1)}`
}

/* How far the input and output links turn, following the assembly that
   contains input angle `deg`: full rotation, or the swing range (y-up deg). */
function m1Swing(o2, o4, a, b, c, deg = 90, sign = -1) {
  const closes = (d) => Boolean(m1Pose(o2, o4, a, b, c, d, sign))
  const start = Math.round(n(deg) / 2) * 2
  let lo = start
  let hi = start
  while (hi - start < 358 && closes(hi + 2)) hi += 2
  while (hi - lo < 358 && closes(lo - 2)) lo -= 2
  const ok = []
  const out = []
  for (let d = lo; d <= hi; d += 2) {
    const p = m1Pose(o2, o4, a, b, c, d, sign)
    ok.push(d)
    out.push((Math.atan2(-(p.B[1] - n(o4[1])), p.B[0] - n(o4[0])) * 180) / Math.PI)
  }
  const unwrapped = [out[0]]
  for (let i = 1; i < out.length; i += 1) {
    let step = out[i] - out[i - 1]
    if (step > 180) step -= 360
    if (step < -180) step += 360
    unwrapped.push(unwrapped[i - 1] + step)
  }
  const outSpan = Math.max(...unwrapped) - Math.min(...unwrapped)
  return {
    inFull: hi - lo >= 358,
    inRange: [lo, hi],
    outFull: outSpan > 300,
    outRange: [Math.min(...unwrapped), Math.max(...unwrapped)],
  }
}

/* A turning arrow round a horizontal axis at (x, y) — the end view of a spin. */
function M1Turn({ x, y, r = 18, tone = N, className = '', style }) {
  const [X, Y, R] = [n(x), n(y), n(r)]
  return (
    <path
      d={`M${X - 6} ${Y - R + 2} A ${R * 0.45} ${R} 0 1 0 ${X + 6} ${Y - R + 2}`}
      fill="none"
      stroke={tone}
      strokeWidth="2.2"
      markerEnd={`url(#${markerFor(tone)})`}
      className={className}
      style={style}
    />
  )
}

/* Unit 5 — six-lower-pairs-catalogue */
export function M1LowerPairsScene() {
  const shade = (i) => ({ className: 'komm-emerge', style: m1d(0.35 + i * 0.4) })
  const bush = (x, w) => (
    <g>
      <rect x={x} y="70" width={w} height="24" fill={SKY} stroke={MUTED} strokeWidth="2" />
      <rect x={x} y="122" width={w} height="24" fill={SKY} stroke={MUTED} strokeWidth="2" />
    </g>
  )
  const contact = (x, w, i) => (
    <g {...shade(i)}>
      <rect x={x} y="91" width={w} height="6" fill={ROSE} fillOpacity="0.5" />
      <rect x={x} y="119" width={w} height="6" fill={ROSE} fillOpacity="0.5" />
    </g>
  )
  const thread = (y, dir) => {
    const d = [`M24 ${y}`]
    for (let x = 24; x < 176; x += 8) d.push(`L${x + 4} ${y - 6 * dir} L${x + 8} ${y}`)
    return d.join(' ')
  }
  const pairs = [
    {
      title: 'Revolute (R)',
      foot: 'f = 1 · turn only',
      body: (i) => (
        <g>
          <rect x="36" y="96" width="128" height="24" rx="4" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="2.2" />
          <rect x="62" y="88" width="10" height="40" rx="2" fill={BLUE} fillOpacity="0.35" stroke={BLUE} strokeWidth="1.6" />
          <rect x="128" y="88" width="10" height="40" rx="2" fill={BLUE} fillOpacity="0.35" stroke={BLUE} strokeWidth="1.6" />
          {bush(74, 52)}
          {contact(74, 52, i)}
          <M1Turn x={154} y={108} r={20} tone={GREEN} className="komm-flow-arrow" />
        </g>
      ),
      symbol: (
        <g>
          <path d="M62 188 L100 176 L138 188" fill="none" stroke={N} strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="176" r="6" fill={WHITE} stroke={N} strokeWidth="2.4" />
        </g>
      ),
    },
    {
      title: 'Prismatic (P)',
      foot: 'f = 1 · slide only',
      body: (i) => (
        <g>
          <g className="komm-shift">
            <rect x="24" y="96" width="124" height="24" rx="2" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="2.2" />
          </g>
          {bush(70, 60)}
          {contact(70, 60, i)}
          <M1Arrow from={[100, 56]} to={[66, 56]} tone={GREEN} />
          <M1Arrow from={[100, 56]} to={[134, 56]} tone={GREEN} />
        </g>
      ),
      symbol: (
        <g>
          <path d="M58 188 L142 188" stroke={N} strokeWidth="2.6" />
          <rect x="84" y="168" width="32" height="18" rx="2" fill={WHITE} stroke={N} strokeWidth="2.4" />
        </g>
      ),
    },
    {
      title: 'Screw (H)',
      foot: 'f = 1 · turn and advance, locked',
      body: (i) => (
        <g>
          <rect x="24" y="98" width="152" height="20" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="2" />
          <path d={`${thread(98, 1)} ${thread(118, -1)}`} fill="none" stroke={BLUE} strokeWidth="1.8" />
          <rect x="72" y="70" width="56" height="22" fill={SKY} stroke={MUTED} strokeWidth="2" />
          <rect x="72" y="124" width="56" height="22" fill={SKY} stroke={MUTED} strokeWidth="2" />
          <g {...shade(i)}>
            <path d="M72 98 L76 92 L80 98 L84 92 L88 98 L92 92 L96 98 L100 92 L104 98 L108 92 L112 98 L116 92 L120 98 L124 92 L128 98" fill="none" stroke={ROSE} strokeWidth="3" />
            <path d="M72 118 L76 124 L80 118 L84 124 L88 118 L92 124 L96 118 L100 124 L104 118 L108 124 L112 118 L116 124 L120 118 L124 124 L128 118" fill="none" stroke={ROSE} strokeWidth="3" />
          </g>
          <M1Turn x={158} y={108} r={20} tone={GREEN} className="komm-flow-arrow" />
          <M1Arrow from={[80, 56]} to={[122, 56]} tone={GREEN} />
        </g>
      ),
      symbol: (
        <g>
          <path d="M58 188 L142 188" stroke={N} strokeWidth="2.6" />
          <rect x="84" y="168" width="32" height="18" rx="2" fill={WHITE} stroke={N} strokeWidth="2.4" />
          <path d="M90 186 L98 168 M98 186 L106 168 M106 186 L114 168" stroke={N} strokeWidth="1.6" />
        </g>
      ),
    },
    {
      title: 'Cylindric (C)',
      foot: 'f = 2 · turn + slide, independent',
      body: (i) => (
        <g>
          <rect x="24" y="96" width="152" height="24" rx="12" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="2.2" />
          {bush(74, 52)}
          {contact(74, 52, i)}
          <M1Turn x={158} y={108} r={20} tone={GREEN} className="komm-flow-arrow" />
          <M1Arrow from={[100, 56]} to={[66, 56]} tone={GREEN} />
          <M1Arrow from={[100, 56]} to={[134, 56]} tone={GREEN} />
        </g>
      ),
      symbol: (
        <g>
          <path d="M58 188 L142 188" stroke={N} strokeWidth="2.6" />
          <rect x="84" y="171" width="32" height="14" rx="7" fill={WHITE} stroke={N} strokeWidth="2.4" />
        </g>
      ),
    },
    {
      title: 'Spheric (S)',
      foot: 'f = 3 · turn about any axis',
      body: (i) => (
        <g>
          <path d="M112 98 L150 62" stroke={BLUE} strokeWidth="9" strokeLinecap="round" opacity="0.5" />
          <circle cx="100" cy="110" r="26" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="2.2" />
          <path d="M62 110 A 38 38 0 0 0 138 110 L128 110 A 28 28 0 0 1 72 110 Z" fill={SKY} stroke={MUTED} strokeWidth="2" />
          <rect x="94" y="147" width="12" height="10" fill={SKY} stroke={MUTED} strokeWidth="2" />
          <path d="M73 112 A 27 27 0 0 0 127 112" fill="none" stroke={ROSE} strokeWidth="6" opacity="0.6" {...shade(i)} />
          <path d="M118 70 A 16 6 0 1 0 138 72" fill="none" stroke={GREEN} strokeWidth="2.2" markerEnd={`url(#${markerFor(GREEN)})`} className="komm-flow-arrow" />
          <path d="M58 92 A 44 44 0 0 1 80 68" fill="none" stroke={GREEN} strokeWidth="2.2" markerEnd={`url(#${markerFor(GREEN)})`} className="komm-flow-arrow" />
          <path d="M164 98 A 16 16 0 0 1 156 124" fill="none" stroke={GREEN} strokeWidth="2.2" markerEnd={`url(#${markerFor(GREEN)})`} className="komm-flow-arrow" />
        </g>
      ),
      symbol: (
        <g>
          <path d="M60 188 L90 180 M110 176 L140 166" stroke={N} strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="178" r="8" fill={WHITE} stroke={N} strokeWidth="2.4" />
          <path d="M88 184 A 13 13 0 0 0 112 184" fill="none" stroke={N} strokeWidth="2.4" />
        </g>
      ),
    },
    {
      title: 'Planar (E)',
      foot: 'f = 3 · two slides + a turn',
      body: (i) => (
        <g>
          <rect x="24" y="122" width="152" height="16" fill={SKY} stroke={MUTED} strokeWidth="2" />
          <rect x="72" y="90" width="56" height="30" rx="2" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="2.2" />
          <rect x="72" y="117" width="56" height="6" fill={ROSE} fillOpacity="0.55" {...shade(i)} />
          <M1Arrow from={[72, 56]} to={[112, 56]} tone={GREEN} />
          <M1Arrow from={[136, 104]} to={[164, 80]} tone={GREEN} />
          <path d="M84 80 A 18 6 0 1 0 118 78" fill="none" stroke={GREEN} strokeWidth="2.2" markerEnd={`url(#${markerFor(GREEN)})`} className="komm-flow-arrow" />
        </g>
      ),
      symbol: (
        <g>
          <path d="M58 188 L142 188 M64 188 L58 196 M76 188 L70 196 M88 188 L82 196 M100 188 L94 196 M112 188 L106 196 M124 188 L118 196 M136 188 L130 196" stroke={N} strokeWidth="1.8" />
          <rect x="84" y="170" width="32" height="18" rx="2" fill={WHITE} stroke={N} strokeWidth="2.4" />
        </g>
      ),
    },
  ]
  const cam = []
  for (let d = 0; d <= 360; d += 6) {
    const r = 34 + 26 * Math.pow(Math.max(0, Math.cos(((d - 90) * Math.PI) / 180)), 2)
    cam.push([118 + r * Math.cos((d * Math.PI) / 180), 170 - r * Math.sin((d * Math.PI) / 180)])
  }
  return (
    <Scene caption="Lower pairs share a surface; higher pairs meet on a line">
      {pairs.map((p, i) => (
        <g key={p.title} className="komm-cell-in" style={m1d(i * 0.4)}>
          <Card x={16 + (i % 3) * 208} y={18 + Math.floor(i / 3) * 230} w={200} h={222} title={p.title} accent={BLUE} foot={p.foot} footTone={N}>
            {p.body(i)}
            {p.symbol}
          </Card>
        </g>
      ))}
      <g className="komm-cell-in" style={m1d(2.6)}>
        <Card x={648} y={18} w={236} h={452} title="Higher pairs: line contact" accent={AMBER}>
          <L x={118} y={56} size={12.5} fill={MUTED} weight={800}>cam and follower</L>
          <rect x="110" y="66" width="16" height="44" fill={WHITE} stroke={N} strokeWidth="2.2" />
          <path d="M76 110 L160 110" stroke={N} strokeWidth="4" strokeLinecap="round" />
          <Curve pts={cam} stroke={AMBER} width={2.6} />
          <circle cx="118" cy="170" r="5" fill={WHITE} stroke={AMBER} strokeWidth="2.2" />
          <path d="M108 115 L128 105" stroke={ROSE} strokeWidth="4" strokeLinecap="round" className="komm-pulse" />
          <L x={172} y={140} size={11.5} fill={ROSE} weight={800} anchor="start">a line</L>

          <L x={118} y={256} size={12.5} fill={MUTED} weight={800}>gear teeth</L>
          <path d="M24 356 L212 356" stroke={N} strokeWidth="3" />
          <path d="M40 356 L54 318 L70 318 L84 356 M112 356 L126 318 L142 318 L156 356" fill={AMBER} fillOpacity="0.15" stroke={AMBER} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M24 272 L212 272" stroke={N} strokeWidth="3" />
          <path d="M72 272 L86 312 L98 312 L112 272 M144 272 L158 310 L170 310 L184 272" fill={TEAL} fillOpacity="0.15" stroke={TEAL} strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M72 334 L88 318" stroke={ROSE} strokeWidth="4" strokeLinecap="round" className="komm-pulse" />
          <L x={200} y={336} size={11.5} fill={ROSE} weight={800} anchor="end">a line</L>

          <rect x="16" y="382" width="204" height="56" rx="10" fill={WHITE} stroke={RED} strokeWidth="2.2" />
          <L x={118} y={404} size={12.5} fill={RED}>⚠ Hertzian contact stress</L>
          <L x={118} y={424} size={11.5} fill={N} weight={700}>whole load squeezed onto a line</L>
        </Card>
      </g>
    </Scene>
  )
}

/* Unit 6 — chain-to-mechanism-inversions */
export function M1ChainInversionsScene() {
  /* one Grashof chain: s + l = 40 + 120 < p + q = 100 + 80 */
  const k = 0.55
  const inv = [
    { name: 'Crank-rocker', fixed: 'link 1 fixed', f: 120, a: 40, b: 100, c: 80, deg: 70 },
    { name: 'Drag link', fixed: 'link 2 (shortest) fixed', f: 40, a: 100, b: 80, c: 120, deg: 80 },
    { name: 'Double rocker', fixed: 'link 4 (opposite) fixed', f: 80, a: 120, b: 40, c: 100, deg: 58 },
    { name: 'Crank-rocker, inverted', fixed: 'link 3 fixed', f: 100, a: 40, b: 120, c: 80, deg: 70 },
  ]
  const kc = 0.6
  const c2 = [414, 90]
  const c4 = [414 + 120 * kc, 90]
  const chainA = m1Pose(c2, c4, 40 * kc, 100 * kc, 80 * kc, 70)
  const chainB = m1Pose(c2, c4, 40 * kc, 100 * kc, 80 * kc, 150)
  const floating = (p) => (
    <g>
      <path d={`M${c2[0]} ${c2[1]} L${p.A[0].toFixed(1)} ${p.A[1].toFixed(1)} L${p.B[0].toFixed(1)} ${p.B[1].toFixed(1)} L${c4[0]} ${c4[1]} Z`} fill="none" stroke={N} strokeWidth="5" strokeLinejoin="round" />
      {[c2, c4, p.A, p.B].map((q, i) => <M1Pin key={i} x={q[0]} y={q[1]} r={4} />)}
    </g>
  )
  /* extreme positions of a swinging link, drawn as dashed ghosts */
  const ghost = (o, len, range, tone) =>
    range.map((d) => (
      <M1Bar key={d} p={o} q={[o[0] + len * Math.cos((d * Math.PI) / 180), o[1] - len * Math.sin((d * Math.PI) / 180)]} tone={tone} w={2} dash="4 4" />
    ))
  return (
    <Scene caption="Fix one link of a chain and it becomes a mechanism — fix a different one, a different mechanism">
      <L x={196} y={52} size={14} fill={N} anchor="end">Kinematic chain</L>
      <L x={196} y={70} size={11.5} fill={MUTED} weight={700} anchor="end">4 links, 4 pins, nothing fixed</L>
      <g className="komm-spiral">{floating(chainA)}</g>
      <g className="komm-spiral" style={m1d(1.6)} opacity="0.55">{floating(chainB)}</g>
      <L x={560} y={52} size={12.5} fill={MUTED} anchor="start">flexes freely: no input, no output</L>
      <L x={560} y={70} size={12.5} fill={BLUE} anchor="start">fix one link ↓ four inversions</L>

      {inv.map((v, i) => {
        const x0 = 16 + i * 218
        const o2 = [x0 + 105 - (v.f * k) / 2, 232]
        const o4 = [x0 + 105 + (v.f * k) / 2, 232]
        const sw = m1Swing(o2, o4, v.a * k, v.b * k, v.c * k, v.deg)
        const pose = m1Pose(o2, o4, v.a * k, v.b * k, v.c * k, v.deg)
        const say = (full, r) => (full ? 'full turn' : `swings ${Math.round(r[1] - r[0])}°`)
        const turn = (o, full, r, tone) =>
          full ? (
            <circle cx={o[0]} cy={o[1]} r="14" fill="none" stroke={tone} strokeWidth="2.2" className="komm-current" />
          ) : (
            <path d={m1Arc(o[0], o[1], 16, r[0], r[1])} fill="none" stroke={tone} strokeWidth="2.2" className="komm-current" />
          )
        return (
          <g key={v.name} className="komm-cell-in" style={m1d(0.5 + i * 0.5)}>
            <rect x={x0} y="102" width="210" height="200" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
            <L x={x0 + 105} y={124} size={13.5} fill={BLUE}>{v.name}</L>
            <L x={x0 + 105} y={141} size={11} fill={MUTED} weight={700}>{v.fixed}</L>
            {sw.inFull ? null : ghost(o2, v.a * k, sw.inRange, BLUE)}
            {sw.outFull ? null : ghost(o4, v.c * k, sw.outRange, TEAL)}
            <M1Frame p={o2} q={o4} />
            <M1Bar p={o2} q={pose.A} tone={BLUE} w={5} />
            <M1Bar p={pose.A} q={pose.B} tone={AMBER} w={5} />
            <M1Bar p={o4} q={pose.B} tone={TEAL} w={5} />
            {turn(o2, sw.inFull, sw.inRange, BLUE)}
            {turn(o4, sw.outFull, sw.outRange, TEAL)}
            {[o2, o4, pose.A, pose.B].map((q, j) => <M1Pin key={j} x={q[0]} y={q[1]} r={4} />)}
            <M x={x0 + 105} y={276} size={11} fill={BLUE}>{`left link: ${say(sw.inFull, sw.inRange)}`}</M>
            <M x={x0 + 105} y={293} size={11} fill={TEAL}>{`right link: ${say(sw.outFull, sw.outRange)}`}</M>
          </g>
        )
      })}

      {/* mobility ladder */}
      <g className="komm-cell-in" style={m1d(2.8)}>
        <Card x={16} y={310} w={282} h={172} title="M = 1 · mechanism" accent={GREEN} foot="e.g. any working linkage" footTone={GREEN}>
          <M1FourBar o2={[92, 92]} o4={[196, 92]} a={30} b={96} c={60} deg={130} tones={[MUTED, MUTED, MUTED]} w={3} dash="5 4" ground={false} />
          <M1FourBar o2={[92, 92]} o4={[196, 92]} a={30} b={96} c={60} deg={80} />
          <M1Arrow from={[40, 58]} to={[70, 62]} tone={ROSE} className="komm-spiral" />
          <M x={141} y={140} size={11.5} fill={N}>n = 4, j = 4: 9 − 8 = 1</M>
        </Card>
        <Card x={309} y={310} w={282} h={172} title="M = 0 · structure" accent={AMBER} foot="e.g. a triangulated truss" footTone={AMBER}>
          <path d="M72 94 L141 44 L210 94 Z" fill={AMBER} fillOpacity="0.1" stroke={N} strokeWidth="4" strokeLinejoin="round" />
          <M1Ground x={72} y={94} />
          <M1Ground x={210} y={94} />
          {[[72, 94], [141, 44], [210, 94]].map((q, j) => <M1Pin key={j} x={q[0]} y={q[1]} r={4.5} />)}
          <M1Arrow from={[190, 44]} to={[152, 44]} tone={ROSE} className="komm-spiral" />
          <L x={60} y={50} size={11} fill={AMBER} weight={800} anchor="start">won’t move</L>
          <M x={141} y={140} size={11.5} fill={N}>n = 3, j = 3: 6 − 6 = 0</M>
        </Card>
        <Card x={602} y={310} w={282} h={172} title="M = −1 · preloaded structure" accent={RED} foot="e.g. an overconstrained frame" footTone={RED}>
          <path d="M72 94 L141 44 L210 94 Z" fill={RED} fillOpacity="0.06" stroke={N} strokeWidth="4" strokeLinejoin="round" />
          <path d="M141 44 L141 94" stroke={RED} strokeWidth="4" className="komm-pulse" />
          <M1Ground x={72} y={94} />
          <M1Ground x={210} y={94} />
          {[[72, 94], [141, 44], [210, 94], [141, 94]].map((q, j) => <M1Pin key={j} x={q[0]} y={q[1]} r={4.5} />)}
          <M1Arrow from={[190, 44]} to={[152, 44]} tone={ROSE} className="komm-spiral" />
          <L x={60} y={50} size={11} fill={RED} weight={800} anchor="start">locked in</L>
          <M x={141} y={140} size={11.5} fill={N}>n = 4, j = 5: 9 − 10 = −1</M>
        </Card>
      </g>
    </Scene>
  )
}

/* Unit 7 — planar-spheric-spatial-triple */
export function M1PlanarSphericSpatialScene() {
  const o2 = [70, 250]
  const o4 = [190, 250]
  const [a, b, c] = [34, 110, 80]
  const pose = m1Pose(o2, o4, a, b, c, 70)
  const path = m1Trace(o2, o4, a, b, c, 0.5, 26)
  /* parallelogram "sheet" behind a planar link, offset back by (dx, dy) */
  const sheet = (x, y, w, h, key, tone) => (
    <path key={key} d={`M${x} ${y} L${x + w} ${y} L${x + w + 34} ${y - h} L${x + 34} ${y - h} Z`} fill={tone} fillOpacity="0.08" stroke={tone} strokeOpacity="0.45" strokeWidth="1.4" />
  )
  const O = [450, 200]
  /* robot arm joints in a simple oblique projection */
  const base = [690, 290]
  const shoulder = [690, 226]
  const elbow = [758, 168]
  const wrist = [826, 196]
  const helix = []
  for (let t = 0; t <= 1.001; t += 0.02) {
    const ang = t * Math.PI * 3.2
    helix.push([790 + 46 * Math.cos(ang) - 30 * t, 214 - 16 * Math.sin(ang) - 110 * t + 40 * t * t])
  }
  const boxes = (count, x, tone) =>
    [0, 1, 2].map((i) => (
      <rect key={i} x={x + i * 22} y="444" width="16" height="16" rx="3" fill={i < count ? tone : WHITE} stroke={tone} strokeWidth="2" />
    ))
  return (
    <Scene caption="Where can a point of the mechanism go? A plane, a sphere, or anywhere in space">
      <L x={150} y={30} size={15} fill={BLUE}>Planar</L>
      <L x={450} y={30} size={15} fill={PURP}>Spheric</L>
      <L x={750} y={30} size={15} fill={AMBER}>Spatial</L>

      {/* planar: every link moves in its own parallel plane */}
      {sheet(40, 272, 200, 150, 's1', BLUE)}
      {sheet(52, 262, 200, 150, 's2', BLUE)}
      {sheet(64, 252, 200, 150, 's3', BLUE)}
      <Curve pts={path} stroke={BLUE} width={2.2} className="komm-draw" />
      <M1FourBar o2={o2} o4={o4} a={a} b={b} c={c} deg={70} P={[0.5, 26]} ground={false} />
      <path d={m1Arc(o2[0], o2[1], a + 10, 20, 340)} fill="none" stroke={BLUE} strokeWidth="1.8" className="komm-current-slow" />
      <L x={150} y={318} size={12} fill={BLUE} weight={800}>each point stays in its own plane</L>
      <L x={150} y={336} size={11.5} fill={MUTED} weight={700}>all planes parallel</L>

      {/* spheric: Hooke joint, every point on a sphere about O */}
      <circle cx={O[0]} cy={O[1]} r="92" fill={PURP} fillOpacity="0.04" stroke={PURP} strokeOpacity="0.5" strokeWidth="1.4" />
      <circle cx={O[0]} cy={O[1]} r="58" fill={PURP} fillOpacity="0.05" stroke={PURP} strokeOpacity="0.5" strokeWidth="1.4" />
      <ellipse cx={O[0]} cy={O[1]} rx="92" ry="24" fill="none" stroke={PURP} strokeOpacity="0.45" strokeWidth="1.2" strokeDasharray="5 5" />
      {/* the two shaft axes, extended: they cross at O */}
      <path d={`M${O[0] - 150} ${O[1]} L${O[0] + 70} ${O[1]}`} stroke={MUTED} strokeWidth="1.4" strokeDasharray="7 5" />
      <path d={`M${O[0] - 70} ${O[1] + 40} L${O[0] + 130} ${O[1] - 75}`} stroke={MUTED} strokeWidth="1.4" strokeDasharray="7 5" />
      <path d={`M${O[0] - 140} ${O[1]} L${O[0] - 30} ${O[1]}`} stroke={N} strokeWidth="12" strokeLinecap="round" opacity="0.85" />
      <path d={`M${O[0] + 26} ${O[1] - 15} L${O[0] + 118} ${O[1] - 68}`} stroke={PURP} strokeWidth="12" strokeLinecap="round" opacity="0.85" />
      <path d={`M${O[0] - 4} ${O[1] - 30} L${O[0] - 30} ${O[1] - 30} L${O[0] - 30} ${O[1] + 30} L${O[0] - 4} ${O[1] + 30}`} fill="none" stroke={N} strokeWidth="5" strokeLinejoin="round" />
      <path d={`M${O[0] - 12} ${O[1] - 22} L${O[0] + 12} ${O[1] + 22} M${O[0] - 12} ${O[1] + 22} L${O[0] + 12} ${O[1] - 22}`} stroke={PURP} strokeWidth="5" strokeLinecap="round" />
      <path d={`M${O[0]} ${O[1] - 30} L${O[0]} ${O[1] + 30}`} stroke={AMBER} strokeWidth="5" strokeLinecap="round" />
      <path d={`M${O[0] - 20} ${O[1] + 8} L${O[0] + 20} ${O[1] - 8}`} stroke={AMBER} strokeWidth="5" strokeLinecap="round" />
      <M1Turn x={O[0] - 100} y={O[1]} r={20} tone={N} className="komm-flow-arrow" />
      <g transform={`rotate(-30 ${O[0] + 90} ${O[1] - 52})`}>
        <M1Turn x={O[0] + 90} y={O[1] - 52} r={20} tone={PURP} className="komm-flow-arrow" />
      </g>
      <circle cx={O[0]} cy={O[1]} r="6" fill={RED} className="komm-pulse" />
      <L x={O[0] + 14} y={O[1] + 30} size={12} fill={RED} weight={800} anchor="start">O: axes meet here</L>
      <L x={450} y={318} size={12} fill={PURP} weight={800}>each point stays on a sphere about O</L>
      <L x={450} y={336} size={11.5} fill={MUTED} weight={700}>Hooke (universal) joint</L>

      {/* spatial: robot arm, path in no plane and on no sphere */}
      <path d={`M${base[0] - 34} ${base[1] + 10} L${base[0] + 34} ${base[1] + 10} L${base[0] + 50} ${base[1] - 4} L${base[0] - 18} ${base[1] - 4} Z`} fill={SKY} stroke={MUTED} strokeWidth="2" />
      <M1Bar p={[base[0], base[1] - 4]} q={shoulder} tone={N} w={12} />
      <M1Bar p={shoulder} q={elbow} tone={AMBER} w={10} />
      <M1Bar p={elbow} q={wrist} tone={AMBER} w={8} />
      {[shoulder, elbow, wrist].map((q, i) => <M1Pin key={i} x={q[0]} y={q[1]} r={6} tone={AMBER} />)}
      <Curve pts={helix} stroke={AMBER} width={2.6} className="komm-draw" />
      <M1Arrow from={[604, 296]} to={[604, 262]} tone={MUTED} w={1.6} />
      <M1Arrow from={[604, 296]} to={[640, 296]} tone={MUTED} w={1.6} />
      <M1Arrow from={[604, 296]} to={[586, 312]} tone={MUTED} w={1.6} />
      <M x={604} y={254} size={11} fill={MUTED}>z</M>
      <M x={648} y={300} size={11} fill={MUTED}>x</M>
      <M x={576} y={322} size={11} fill={MUTED}>y</M>
      <L x={750} y={318} size={12} fill={AMBER} weight={800}>path: in no plane, on no sphere</L>
      <L x={750} y={336} size={11.5} fill={MUTED} weight={700}>robot arm</L>

      {/* complexity scale */}
      <path d="M40 376 L860 376" stroke={MUTED} strokeWidth="2.2" markerEnd={`url(#${markerFor(MUTED)})`} />
      <L x={40} y={366} size={12} fill={MUTED} weight={800} anchor="start">simpler to analyse</L>
      <L x={850} y={366} size={12} fill={MUTED} weight={800} anchor="end">harder</L>
      <rect x="40" y="386" width="820" height="10" rx="5" fill={SKY} />
      <rect x="40" y="386" width="273" height="10" rx="5" fill={BLUE} className="komm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} />
      <rect x="313" y="386" width="274" height="10" rx="5" fill={PURP} className="komm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center', animationDelay: '0.8s' }} />
      <rect x="587" y="386" width="273" height="10" rx="5" fill={AMBER} className="komm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center', animationDelay: '1.6s' }} />
      <L x={150} y={426} size={12} fill={N} weight={800}>2 coordinates: x, y</L>
      <L x={450} y={426} size={12} fill={N} weight={800}>2 angles on a curved surface</L>
      <L x={750} y={426} size={12} fill={N} weight={800}>3 coordinates: x, y, z</L>
      {boxes(2, 117, BLUE)}
      {boxes(2, 417, PURP)}
      {boxes(3, 717, AMBER)}
    </Scene>
  )
}

/* Unit 8 — kutzbach-counting-worked */
export function M1KutzbachScene() {
  const o2 = [96, 262]
  const o4 = [396, 262]
  const [a, b, c] = [72, 226, 150]
  const { A, B } = m1Pose(o2, o4, a, b, c, 76)
  const mid = [(o2[0] + o4[0] + A[0] + B[0]) / 4, (o2[1] + o4[1] + A[1] + B[1]) / 4]
  /* three freedom tokens beside a link, on the side away from the middle */
  const tokens = (p, q) => {
    const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2]
    const len = Math.hypot(q[0] - p[0], q[1] - p[1])
    const u = [(q[0] - p[0]) / len, (q[1] - p[1]) / len]
    let nrm = [-u[1], u[0]]
    if ((m[0] - mid[0]) * nrm[0] + (m[1] - mid[1]) * nrm[1] < 0) nrm = [-nrm[0], -nrm[1]]
    return [-1, 0, 1].map((s) => [m[0] + u[0] * s * 17 + nrm[0] * 22, m[1] + u[1] * s * 17 + nrm[1] * 22])
  }
  const all = [...tokens(o2, A), ...tokens(A, B), ...tokens(o4, B)]
  const tone = [BLUE, BLUE, BLUE, AMBER, AMBER, AMBER, TEAL, TEAL, TEAL]
  /* which two tokens each joint removes, and when */
  const joints = [
    { at: o2, name: 'O₂', take: [0, 1], t: 1.2, dx: -30, dy: 8 },
    { at: A, name: 'A', take: [2, 3], t: 1.8, dx: -34, dy: -8 },
    { at: B, name: 'B', take: [4, 5], t: 2.4, dx: 30, dy: -12 },
    { at: o4, name: 'O₄', take: [6, 7], t: 3.0, dx: 32, dy: 8 },
  ]
  const x = (p, key, t) => (
    <g key={key} className="komm-cell-in" style={m1d(t)}>
      <path d={`M${p[0] - 7} ${p[1] - 7} L${p[0] + 7} ${p[1] + 7} M${p[0] + 7} ${p[1] - 7} L${p[0] - 7} ${p[1] + 7}`} stroke={RED} strokeWidth="2.8" strokeLinecap="round" />
    </g>
  )
  const rowY = (i) => 60 + i * 30
  const ledger = [
    ['3 moving links × 3', '9', 0.6, N],
    ['revolute at O₂   − 2', '7', 1.2, RED],
    ['revolute at A    − 2', '5', 1.8, RED],
    ['revolute at B    − 2', '3', 2.4, RED],
    ['revolute at O₄   − 2', '1', 3.0, RED],
  ]
  const strip = (x0, y0, total, kept, key) =>
    Array.from({ length: total }, (_, i) => (
      <g key={`${key}${i}`}>
        <circle cx={x0 + i * 16} cy={y0} r="6" fill={BLUE} fillOpacity="0.35" stroke={BLUE} strokeWidth="1.6" />
        {i >= kept ? x([x0 + i * 16, y0], `${key}x${i}`, 4 + i * 0.12) : null}
      </g>
    ))
  return (
    <Scene caption="Kutzbach: 3 freedoms per moving link, 2 removed by every lower pair">
      <M1FourBar o2={o2} o4={o4} a={a} b={b} c={c} deg={76} />
      {all.map((p, i) => (
        <g key={`t${i}`} className="komm-cell-in" style={m1d(0.2 + (i % 3) * 0.12)}>
          <circle cx={p[0]} cy={p[1]} r="7" fill={tone[i]} fillOpacity="0.3" stroke={tone[i]} strokeWidth="2" />
        </g>
      ))}
      {joints.map((j) => j.take.map((ti) => x(all[ti], `j${j.name}${ti}`, j.t)))}
      {joints.map((j) => (
        <g key={`b${j.name}`} className="komm-cell-in" style={m1d(j.t)}>
          <M x={j.at[0] + j.dx} y={j.at[1] + j.dy} size={12} fill={RED} weight={800}>−2</M>
        </g>
      ))}
      <L x={40} y={40} size={12.5} fill={MUTED} weight={800} anchor="start">each token = one freedom of a moving link in the plane</L>

      <Card x={540} y={20} w={344} h={272} title="Ledger  M = 3(n − 1) − 2j₁" accent={N}>
        {ledger.map(([k2, v, t, tn], i) => (
          <g key={k2} className="komm-cell-in" style={m1d(t)}>
            <M x={18} y={rowY(i)} size={12.5} fill={tn} anchor="start">{k2}</M>
            <M x={326} y={rowY(i)} size={13} fill={N} anchor="end" weight={800}>{v}</M>
          </g>
        ))}
        <g className="komm-cell-in" style={m1d(3.6)}>
          <rect x="18" y="210" width="308" height="44" rx="8" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.6" />
          <M x={172} y={238} size={14} fill={GREEN} weight={800}>M = 3(4 − 1) − 2(4) = 1</M>
        </g>
      </Card>

      <Card x={16} y={308} w={426} h={174} title="Five-bar: two inputs" accent={BLUE}>
        <M1Frame p={[36, 138]} q={[184, 138]} />
        <M1Bar p={[36, 138]} q={[52, 84]} tone={BLUE} w={5} />
        <M1Bar p={[52, 84]} q={[108, 58]} tone={AMBER} w={5} />
        <M1Bar p={[108, 58]} q={[166, 86]} tone={AMBER} w={5} />
        <M1Bar p={[184, 138]} q={[166, 86]} tone={TEAL} w={5} />
        {[[36, 138], [52, 84], [108, 58], [166, 86], [184, 138]].map((q, i) => <M1Pin key={i} x={q[0]} y={q[1]} r={4.5} />)}
        <path d={m1Arc(36, 138, 26, 40, 150)} fill="none" stroke={GREEN} strokeWidth="2" markerEnd={`url(#${markerFor(GREEN)})`} className="komm-flow-arrow" />
        <path d={m1Arc(184, 138, 26, 30, 140)} fill="none" stroke={GREEN} strokeWidth="2" markerEnd={`url(#${markerFor(GREEN)})`} className="komm-flow-arrow" />
        {strip(214, 58, 12, 2, 'f')}
        <M x={214} y={92} size={12} fill={N} anchor="start">4 moving × 3 = 12</M>
        <M x={214} y={112} size={12} fill={RED} anchor="start">5 revolutes × 2 = −10</M>
        <g className="komm-cell-in" style={m1d(5.4)}>
          <rect x="208" y="124" width="204" height="30" rx="7" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.4" />
          <M x={310} y={144} size={12.5} fill={GREEN} weight={800}>M = 2 → two inputs</M>
        </g>
      </Card>
      <Card x={458} y={308} w={426} h={174} title="Triangulated three-bar" accent={AMBER}>
        <M1Frame p={[40, 138]} q={[180, 138]} />
        <M1Bar p={[40, 138]} q={[110, 62]} tone={BLUE} w={5} />
        <M1Bar p={[180, 138]} q={[110, 62]} tone={TEAL} w={5} />
        {[[40, 138], [110, 62], [180, 138]].map((q, i) => <M1Pin key={i} x={q[0]} y={q[1]} r={4.5} />)}
        {strip(214, 58, 6, 0, 't')}
        <M x={214} y={92} size={12} fill={N} anchor="start">2 moving × 3 = 6</M>
        <M x={214} y={112} size={12} fill={RED} anchor="start">3 revolutes × 2 = −6</M>
        <g className="komm-cell-in" style={m1d(5)}>
          <rect x="208" y="124" width="204" height="30" rx="7" fill={AMBER} fillOpacity="0.1" stroke={AMBER} strokeWidth="2.4" />
          <M x={310} y={144} size={12.5} fill={AMBER} weight={800}>M = 0 → a structure</M>
        </g>
      </Card>
    </Scene>
  )
}

/* Unit 9 — mobility-paradox-parallel-linkage */
export function M1ParallelParadoxScene() {
  const r = 84
  const top = (g, deg, len = r) => [g[0] + len * Math.cos((deg * Math.PI) / 180), g[1] - len * Math.sin((deg * Math.PI) / 180)]
  /* a parallelogram family: equal parallel cranks on ground pins gs */
  const rig = (gs, deg, tones, extra) => {
    const tops = gs.map((g, i) => top(g, deg, extra && i === 1 ? extra : r))
    return (
      <g>
        <M1Bar p={tops[0]} q={tops[tops.length - 1]} tone={AMBER} w={6} />
        {gs.map((g, i) => <M1Bar key={`k${i}`} p={g} q={tops[i]} tone={tones[i]} w={6} />)}
        {[...gs, ...tops].map((q, i) => <M1Pin key={`p${i}`} x={q[0]} y={q[1]} r={4.5} />)}
      </g>
    )
  }
  const G3 = [[50, 176], [150, 176], [250, 176]]
  const G2 = [[50, 176], [250, 176]]
  const ghost = (gs, tones, s) => (
    <g className="komm-spiral" style={m1d(s)} opacity="0.5">{rig(gs, 112, tones)}</g>
  )
  return (
    <Scene caption="When geometry makes a constraint redundant, the count is wrong — until the geometry is spoiled">
      <Card x={16} y={16} w={426} h={236} title="Parallelogram four-bar" accent={BLUE}>
        <M1Frame p={G2[0]} q={G2[1]} />
        {ghost(G2, [BLUE, TEAL], 1.6)}
        <g className="komm-spiral">{rig(G2, 68, [BLUE, TEAL])}</g>
        <path d={m1Arc(50, 176, 22, 60, 120)} fill="none" stroke={BLUE} strokeWidth="2.2" className="komm-current" />
        <M x={344} y={84} size={12.5} fill={N}>n = 4, j = 4</M>
        <M x={344} y={108} size={12.5} fill={N}>M = 9 − 8 = 1</M>
        <L x={344} y={140} size={13} fill={GREEN}>moves ✓</L>
      </Card>

      <Card x={458} y={16} w={426} h={236} title="Add a fifth link, equal and parallel" accent={ROSE}>
        <M1Frame p={G3[0]} q={G3[2]} />
        {ghost(G3, [BLUE, ROSE, TEAL], 1.6)}
        <g className="komm-spiral">{rig(G3, 68, [BLUE, ROSE, TEAL])}</g>
        <M x={344} y={84} size={12.5} fill={N}>n = 5, j = 6</M>
        <g className="komm-cell-in" style={m1d(1)}>
          <M x={344} y={108} size={12.5} fill={RED}>M = 12 − 12 = 0</M>
        </g>
        <g className="komm-cell-in" style={m1d(1.8)}>
          <L x={344} y={140} size={13} fill={GREEN}>still moves ✓</L>
        </g>
        <L x={212} y={220} size={11.5} fill={ROSE} weight={800}>middle link: a constraint the geometry already satisfies</L>
      </Card>

      <Card x={16} y={264} w={426} h={218} title="Middle link 6% too long" accent={RED}>
        <M1Frame p={[50, 176]} q={[250, 176]} />
        <g>
          <M1Bar p={[50, 176]} q={top([50, 176], 68)} tone={BLUE} w={6} />
          <M1Bar p={[250, 176]} q={top([250, 176], 68)} tone={TEAL} w={6} />
          <M1Bar p={[150, 176]} q={top([150, 176], 68, 89)} tone={RED} w={6} />
          <path d={`M${top([50, 176], 68)[0]} ${top([50, 176], 68)[1]} L${top([150, 176], 68, 89)[0]} ${top([150, 176], 68, 89)[1]} L${top([250, 176], 68)[0]} ${top([250, 176], 68)[1]}`} fill="none" stroke={AMBER} strokeWidth="6" strokeLinejoin="round" />
          {[[50, 176], [150, 176], [250, 176], top([50, 176], 68), top([150, 176], 68, 89), top([250, 176], 68)].map((q, i) => (
            <M1Pin key={i} x={q[0]} y={q[1]} r={4.5} />
          ))}
        </g>
        <circle cx={top([150, 176], 68, 89)[0]} cy={top([150, 176], 68, 89)[1]} r="16" fill="none" stroke={RED} strokeWidth="2.4" className="komm-pulse" />
        <M1Arrow from={[40, 70]} to={[74, 70]} tone={ROSE} className="komm-spiral" />
        <L x={344} y={84} size={13} fill={RED}>jams ✗</L>
        <L x={344} y={108} size={11.5} fill={N} weight={700}>coupler cannot reach</L>
        <L x={344} y={126} size={11.5} fill={N} weight={700}>all three pins at once</L>
        <L x={344} y={158} size={11.5} fill={MUTED} weight={700}>now M = 0 is true</L>
      </Card>

      <Card x={458} y={264} w={426} h={218} title="Watt's straight-line linkage" accent={PURP}>
        {(() => {
          const w2 = [40, 90]
          const w4 = [240, 150]
          const pts = []
          for (let d = -34; d <= 34; d += 1) {
            const p = m1Pose(w2, w4, 100, 60, 100, d, 1)
            if (p) pts.push(m1On(p.A, p.B, 0.5, 0))
          }
          const p0 = m1Pose(w2, w4, 100, 60, 100, 0, 1)
          const mid = m1On(p0.A, p0.B, 0.5, 0)
          return (
            <g>
              <M1Ground x={w2[0]} y={w2[1]} />
              <M1Ground x={w4[0]} y={w4[1]} />
              <Curve pts={pts} stroke={PURP} width={2.6} className="komm-draw" />
              <M1Bar p={w2} q={p0.A} tone={BLUE} w={6} />
              <M1Bar p={p0.A} q={p0.B} tone={AMBER} w={6} />
              <M1Bar p={w4} q={p0.B} tone={TEAL} w={6} />
              {[w2, w4, p0.A, p0.B].map((q, i) => <M1Pin key={i} x={q[0]} y={q[1]} r={4.5} />)}
              <Dot cx={mid[0]} cy={mid[1]} r={5} fill={PURP} />
            </g>
          )
        })()}
        <M x={344} y={84} size={12.5} fill={N}>n = 4, j = 4</M>
        <M x={344} y={108} size={12.5} fill={N}>M = 1</M>
        <L x={344} y={140} size={11.5} fill={PURP} weight={800}>midpoint: near-straight</L>
        <L x={344} y={158} size={11.5} fill={PURP} weight={800}>line, from proportions</L>
        <L x={344} y={176} size={11.5} fill={MUTED} weight={700}>the count cannot see it</L>
      </Card>
    </Scene>
  )
}

/* Unit 10 — four-bar-inversion-gallery */
export function M1InversionGalleryScene() {
  /* one Grashof chain, links 1..4 = 110, 40, 100, 85 (s + l = 150 < 185) */
  const k = 0.6
  const panels = [
    { name: 'Crank-rocker', fixed: 1, f: 110, a: 40, b: 100, c: 85, deg: 60 },
    { name: 'Drag link', fixed: 2, f: 40, a: 100, b: 85, c: 110, deg: 70 },
    { name: 'Double rocker', fixed: 4, f: 85, a: 110, b: 40, c: 100, deg: 62 },
    { name: 'Crank-rocker, other side', fixed: 3, f: 100, a: 40, b: 110, c: 85, deg: 60 },
  ]
  const table = [
    ['1  crank-rocker', 'link 1', 'link 2', 'links 3, 4 rock'],
    ['2  drag link', 'link 2', 'links 1, 3, 4', 'none'],
    ['3  double rocker', 'link 4', 'link 2 (coupler)', 'links 1, 3 rock'],
    ['4  crank-rocker', 'link 3', 'link 2', 'links 1, 4 rock'],
  ]
  const cols = [30, 250, 420, 640]
  return (
    <Scene caption="Same four lengths, four fixed links: four mechanisms and four coupler curves">
      {panels.map((v, i) => {
        const x0 = 16 + i * 218
        const o2 = [x0 + 105 - (v.f * k) / 2, 236]
        const o4 = [x0 + 105 + (v.f * k) / 2, 236]
        const [A, B, C] = [v.a * k, v.b * k, v.c * k]
        const sw = m1Swing(o2, o4, A, B, C, v.deg)
        /* closed coupler curve: a full crank turn, or out on one assembly
           branch and back on the other when the input only rocks */
        let curve = m1Trace(o2, o4, A, B, C, 0.5, 18)
        if (!sw.inFull) {
          const fwd = []
          const back = []
          for (let d = sw.inRange[0]; d <= sw.inRange[1]; d += 1) {
            const p = m1Pose(o2, o4, A, B, C, d, -1)
            const q = m1Pose(o2, o4, A, B, C, d, 1)
            if (p) fwd.push(m1On(p.A, p.B, 0.5, 18))
            if (q) back.unshift(m1On(q.A, q.B, 0.5, 18))
          }
          curve = [...fwd, ...back, fwd[0]]
        }
        const pose = m1Pose(o2, o4, A, B, C, v.deg)
        const P = m1On(pose.A, pose.B, 0.5, 18)
        return (
          <g key={v.name}>
            <rect x={x0} y="16" width="210" height="296" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
            <L x={x0 + 105} y={40} size={13.5} fill={BLUE}>{`${i + 1}  ${v.name}`}</L>
            <L x={x0 + 105} y={58} size={11} fill={MUTED} weight={700}>{`link ${v.fixed} fixed`}</L>
            <Curve pts={curve} stroke={PURP} width={2.4} className="komm-draw" />
            <M1Frame p={o2} q={o4} />
            <path d={`M${pose.A[0]} ${pose.A[1]} L${P[0]} ${P[1]} L${pose.B[0]} ${pose.B[1]} Z`} fill={AMBER} fillOpacity="0.14" stroke={AMBER} strokeWidth="2" />
            <M1Bar p={o2} q={pose.A} tone={BLUE} w={5} />
            <M1Bar p={pose.A} q={pose.B} tone={AMBER} w={5} />
            <M1Bar p={o4} q={pose.B} tone={TEAL} w={5} />
            {[o2, o4, pose.A, pose.B].map((q, j) => <M1Pin key={j} x={q[0]} y={q[1]} r={4} />)}
            <Dot cx={P[0]} cy={P[1]} r={4.5} fill={PURP} />
            {sw.inFull ? (
              <circle cx={o2[0]} cy={o2[1]} r="14" fill="none" stroke={BLUE} strokeWidth="2.2" className="komm-current" />
            ) : (
              <path d={m1Arc(o2[0], o2[1], 16, sw.inRange[0], sw.inRange[1])} fill="none" stroke={BLUE} strokeWidth="2.2" className="komm-current" />
            )}
            <M x={x0 + 105} y={296} size={11} fill={PURP}>coupler curve</M>
          </g>
        )
      })}
      <Card x={16} y={322} w={868} h={160} title="Which link turns fully, relative to the frame?" accent={N}>
        {['inversion', 'fixed', 'turns fully', 'oscillates'].map((h, j) => (
          <L key={h} x={cols[j]} y={54} size={12} fill={MUTED} anchor="start">{h}</L>
        ))}
        {table.map((row, i) => (
          <g key={row[0]} className="komm-cell-in" style={m1d(0.8 + i * 0.8)}>
            {row.map((cell, j) => (
              <M key={j} x={cols[j]} y={78 + i * 20} size={12} fill={j === 2 ? BLUE : N} anchor="start">{cell}</M>
            ))}
          </g>
        ))}
        <L x={434} y={152} size={11.5} fill={GREEN} weight={800}>the shortest link, 2, turns fully relative to every other link</L>
      </Card>
    </Scene>
  )
}

/* Unit 11 — grashof-condition-balance */
export function M1GrashofBalanceScene() {
  const cases = [
    { s: 40, l: 110, p: 90, q: 80, tilt: 7, tone: GREEN, verdict: 's + l < p + q', say: 'crank turns fully', f: 110, a: 40, b: 90, c: 80 },
    { s: 40, l: 110, p: 80, q: 70, tilt: 0, tone: AMBER, verdict: 's + l = p + q', say: 'change point: which way?', f: 110, a: 40, b: 80, c: 70 },
    { s: 60, l: 110, p: 70, q: 80, tilt: -7, tone: RED, verdict: 's + l > p + q', say: 'no link turns fully', f: 110, a: 60, b: 70, c: 80 },
  ]
  const k = 0.8
  return (
    <Scene caption="Grashof: weigh shortest + longest against the other two">
      {cases.map((v, i) => {
        const y0 = 16 + i * 158
        const fx = 180
        const fy = y0 + 70
        const t = (v.tilt * Math.PI) / 180
        const Lp = [fx - 110 * Math.cos(t), fy + 110 * Math.sin(t)]
        const Rp = [fx + 110 * Math.cos(t), fy - 110 * Math.sin(t)]
        const pan = (p, h1, h2, tone, key) => (
          <g key={key}>
            <path d={`M${p[0]} ${p[1]} L${p[0] - 24} ${p[1] + 34} M${p[0]} ${p[1]} L${p[0] + 24} ${p[1] + 34}`} stroke={MUTED} strokeWidth="1.4" />
            <path d={`M${p[0] - 34} ${p[1] + 34} L${p[0] + 34} ${p[1] + 34}`} stroke={N} strokeWidth="3.5" strokeLinecap="round" />
            <rect x={p[0] - 26} y={p[1] + 34 - h1} width="24" height={h1} rx="2" fill={tone} fillOpacity="0.35" stroke={tone} strokeWidth="1.6" />
            <rect x={p[0] + 2} y={p[1] + 34 - h2} width="24" height={h2} rx="2" fill={tone} fillOpacity="0.35" stroke={tone} strokeWidth="1.6" />
          </g>
        )
        const o2 = [440, y0 + 112]
        const o4 = [440 + v.f * k, y0 + 112]
        const [A, B, C] = [v.a * k, v.b * k, v.c * k]
        const sw = m1Swing(o2, o4, A, B, C, 90)
        const deg = i === 1 ? 160 : 90
        const pose = m1Pose(o2, o4, A, B, C, deg)
        const cross = i === 1 ? m1Pose(o2, o4, A, B, C, deg, 1) : null
        const tip = (d) => [o2[0] + A * Math.cos((d * Math.PI) / 180), o2[1] - A * Math.sin((d * Math.PI) / 180)]
        return (
          <g key={v.verdict} className="komm-cell-in" style={m1d(i * 1.2)}>
            <rect x="16" y={y0} width="868" height="150" rx="11" fill={WHITE} stroke={v.tone} strokeWidth="2.2" />
            <path d={`M${fx} ${fy} L${fx - 14} ${fy + 60} L${fx + 14} ${fy + 60} Z`} fill={SKY} stroke={MUTED} strokeWidth="2" />
            <M1Bar p={Lp} q={Rp} tone={N} w={5} />
            <Dot cx={fx} cy={fy} r={4} fill={N} />
            {pan(Lp, v.s / 3, v.l / 3, BLUE, 'l')}
            {pan(Rp, v.p / 3, v.q / 3, TEAL, 'r')}
            <M x={Lp[0]} y={y0 + 20} size={12} fill={BLUE}>{`s + l = ${v.s + v.l}`}</M>
            <M x={Rp[0]} y={y0 + 20} size={12} fill={TEAL}>{`p + q = ${v.p + v.q}`}</M>

            <M1Frame p={o2} q={o4} />
            {cross ? (
              <g opacity="0.5">
                <M1Bar p={o2} q={cross.A} tone={BLUE} w={3} dash="4 4" />
                <M1Bar p={cross.A} q={cross.B} tone={AMBER} w={3} dash="4 4" />
                <M1Bar p={o4} q={cross.B} tone={TEAL} w={3} dash="4 4" />
              </g>
            ) : null}
            <M1Bar p={o2} q={pose.A} tone={BLUE} w={5} />
            <M1Bar p={pose.A} q={pose.B} tone={AMBER} w={5} />
            <M1Bar p={o4} q={pose.B} tone={TEAL} w={5} />
            {[o2, o4, pose.A, pose.B].map((q, j) => <M1Pin key={j} x={q[0]} y={q[1]} r={4} />)}
            {sw.inFull ? (
              <circle cx={o2[0]} cy={o2[1]} r={A + 8} fill="none" stroke={GREEN} strokeWidth="2.2" className="komm-current" />
            ) : (
              <g>
                <path d={m1Arc(o2[0], o2[1], A + 8, sw.inRange[0], sw.inRange[1])} fill="none" stroke={RED} strokeWidth="2.2" className="komm-current" />
                {sw.inRange.map((d) => (
                  <path key={d} d={`M${o2[0]} ${o2[1]} L${tip(d)[0].toFixed(1)} ${tip(d)[1].toFixed(1)}`} stroke={RED} strokeWidth="2" strokeDasharray="4 4" />
                ))}
              </g>
            )}
            {i === 1 ? <L x={o2[0] - 24} y={o2[1] - 30} size={22} fill={AMBER} className="komm-pulse">?</L> : null}

            <L x={740} y={y0 + 58} size={16} fill={v.tone}>{v.verdict}</L>
            <L x={740} y={y0 + 84} size={13} fill={N} weight={800}>{v.say}</L>
            <L x={740} y={y0 + 106} size={11.5} fill={MUTED} weight={700}>
              {i === 0 ? 'Grashof: one link rotates' : i === 1 ? 'links fall collinear once a turn' : 'non-Grashof: triple rocker'}
            </L>
          </g>
        )
      })}
    </Scene>
  )
}

/* Unit 12 — mechanical-advantage-through-cycle */
export function M1MechAdvantageScene() {
  const [a, b, c, f] = [36, 96, 64, 90]
  const base = [0, 0]
  const far = [f, 0]
  /* toggle: crank and coupler in line, where O2 to B is longest */
  let dT = 0
  let best = 0
  for (let d = 0; d < 360; d += 0.5) {
    const p = m1Pose(base, far, a, b, c, d)
    const reach = p ? Math.hypot(p.B[0], p.B[1]) : 0
    if (reach > best) {
      best = reach
      dT = d
    }
  }
  const ratio = (d) => {
    const v = m1Vel(base, far, a, b, c, d)
    return v.B[2] / c / (v.A[2] / a)
  }
  const span = 100
  const X = (d) => 60 + ((d - (dT - span)) / span) * 500
  const samples = []
  for (let d = dT - span; d <= dT - 0.5; d += 1) samples.push([d, ratio(d)])
  const rMax = Math.max(...samples.map((s) => s[1]))
  const maCap = 12
  const omegaPts = samples.map(([d, r]) => [X(d), 340 - (r / rMax) * 82])
  const maPts = samples.map(([d, r]) => [X(d), 470 - (Math.min(1 / r, maCap) / maCap) * 92])
  const stops = [90, 60, 30, 6].map((back) => {
    const d = dT - back
    const r = ratio(d)
    return { back, d, r, ma: 1 / r }
  })
  const maMax = Math.min(maCap, Math.max(...stops.map((s) => s.ma)))
  return (
    <Scene caption="Near the toggle the output barely moves, so the same input power buys a huge output force">
      {stops.map((s, i) => {
        const x0 = 16 + i * 152
        const o2 = [x0 + 30, 170]
        const o4 = [x0 + 30 + f, 170]
        const pose = m1Pose(o2, o4, a, b, c, s.d)
        const v = m1Vel(o2, o4, a, b, c, s.d)
        const len = 14 + (Math.min(s.ma, maCap) / maMax) * 46
        return (
          <g key={s.back} className="komm-spiral" style={m1d(i * 0.8)}>
            <rect x={x0} y="16" width="144" height="206" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
            <M x={x0 + 72} y={36} size={11.5} fill={MUTED}>{s.back > 6 ? `${s.back}° before toggle` : 'at the toggle'}</M>
            <M1Ground x={o2[0]} y={o2[1]} w={26} />
            <M1Ground x={o4[0]} y={o4[1]} w={26} />
            <M1Bar p={o2} q={pose.A} tone={BLUE} w={5} />
            <M1Bar p={pose.A} q={pose.B} tone={AMBER} w={5} />
            <M1Bar p={o4} q={pose.B} tone={TEAL} w={5} />
            {[o2, o4, pose.A, pose.B].map((q, j) => <M1Pin key={j} x={q[0]} y={q[1]} r={4} />)}
            <M1Arrow from={pose.B} to={m1Tip(pose.B, v.B, len)} tone={ROSE} w={2.4} />
            <M x={x0 + 72} y={212} size={12} fill={ROSE}>{`MA ≈ ${s.ma >= 10 ? Math.round(s.ma) : s.ma.toFixed(1)}`}</M>
          </g>
        )
      })}

      <Axes x={60} y={340} w={540} h={92} yLabel="ω₄ / ω₂" />
      <Curve pts={omegaPts} stroke={BLUE} width={2.6} className="komm-draw" />
      <Axes x={60} y={470} w={540} h={100} yLabel="MA = T₄ / T₂" />
      <Curve pts={maPts} stroke={ROSE} width={2.6} className="komm-draw" />
      <path d="M560 234 L560 470" stroke={RED} strokeWidth="1.8" strokeDasharray="6 5" />
      <L x={552} y={250} size={11.5} fill={RED} weight={800} anchor="end">toggle: ω₄ → 0, MA → ∞</L>
      {stops.map((s) => (
        <g key={`m${s.back}`}>
          <Dot cx={X(s.d)} cy={340 - (s.r / rMax) * 82} r={4} fill={BLUE} />
          <Dot cx={X(s.d)} cy={470 - (Math.min(s.ma, maCap) / maCap) * 92} r={4} fill={ROSE} />
        </g>
      ))}

      <Card x={636} y={16} w={248} h={466} title="Power in = power out" accent={GREEN}>
        {stops.map((s, i) => {
          const y = 62 + i * 94
          return (
            <g key={`p${s.back}`} className="komm-cell-in" style={m1d(0.6 + i * 0.6)}>
              <M x={16} y={y} size={11.5} fill={MUTED} anchor="start">{s.back > 6 ? `${s.back}° before` : 'toggle'}</M>
              <M x={16} y={y + 22} size={11} fill={ROSE} anchor="start">T₄</M>
              <rect x="44" y={y + 12} width={Math.max(4, (Math.min(s.ma, maCap) / maMax) * 180)} height="12" rx="4" fill={ROSE} />
              <M x={16} y={y + 42} size={11} fill={BLUE} anchor="start">ω₄</M>
              <rect x="44" y={y + 32} width={Math.max(4, (s.r / rMax) * 180)} height="12" rx="4" fill={BLUE} />
              <M x={16} y={y + 62} size={11} fill={GREEN} anchor="start">P</M>
              <rect x="44" y={y + 52} width="120" height="12" rx="4" fill={GREEN} />
              <M x={172} y={y + 62} size={11} fill={GREEN} anchor="start">same</M>
            </g>
          )
        })}
        <L x={124} y={450} size={11.5} fill={N} weight={800}>T₂ω₂ = T₄ω₄ at every position</L>
      </Card>
    </Scene>
  )
}

/* Unit 13 — transmission-angle-force-resolution */
export function M1TransmissionAngleScene() {
  /* one chain, O2A = 56, AB = 100, O4B = 60, frame 100: μ runs 14°–150° */
  const [a, b, c] = [56, 100, 60]
  const o2 = [46, 250]
  const o4 = [146, 250]
  const F = 66
  const deg = (v) => (Math.atan2(-v[1], v[0]) * 180) / Math.PI
  const muOf = (p) => {
    const u = [p.A[0] - p.B[0], p.A[1] - p.B[1]]
    const w = [o4[0] - p.B[0], o4[1] - p.B[1]]
    return (Math.acos((u[0] * w[0] + u[1] * w[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(w[0], w[1]))) * 180) / Math.PI
  }
  const cases = [
    { target: 90, tone: GREEN, say: 'F sin μ ≈ F: all torque' },
    { target: 40, tone: AMBER, say: 'torque down, bearing load up' },
    { target: 15, tone: RED, say: 'F cos μ ≈ F: bearing takes it' },
  ].map((v) => {
    let best = null
    for (let d = 0; d <= 180; d += 0.25) {
      const p = m1Pose(o2, o4, a, b, c, d)
      if (!p) continue
      const mu = muOf(p)
      if (!best || Math.abs(mu - v.target) < Math.abs(best.mu - v.target)) best = { d, mu, A: p.A, B: p.B }
    }
    const { A, B, mu } = best
    const lenAB = Math.hypot(B[0] - A[0], B[1] - A[1])
    const f = [((B[0] - A[0]) / lenAB) * F, ((B[1] - A[1]) / lenAB) * F]
    const lenR = Math.hypot(B[0] - o4[0], B[1] - o4[1])
    const r = [(B[0] - o4[0]) / lenR, (B[1] - o4[1]) / lenR]
    const t = [-r[1], r[0]]
    const fr = f[0] * r[0] + f[1] * r[1]
    const ft = f[0] * t[0] + f[1] * t[1]
    const angA = deg([A[0] - B[0], A[1] - B[1]])
    const angO = deg([o4[0] - B[0], o4[1] - B[1]])
    let [lo, hi] = [Math.min(angA, angO), Math.max(angA, angO)]
    if (hi - lo > 180) [lo, hi] = [hi, lo + 360]
    return {
      ...v, d: best.d, A, B, mu,
      Ftip: [B[0] + f[0], B[1] + f[1]],
      Rtip: [B[0] + fr * r[0], B[1] + fr * r[1]],
      Ttip: [B[0] + ft * t[0], B[1] + ft * t[1]],
      sin: Math.sin((mu * Math.PI) / 180),
      cos: Math.abs(Math.cos((mu * Math.PI) / 180)),
      arc: m1Arc(B[0], B[1], 18, lo, hi),
    }
  })
  /* polar band: centre and radii in card-local units */
  const [pcx, pcy, pR, pr] = [154, 140, 92, 62]
  const pAt = (d, rr) => [pcx + rr * Math.cos((d * Math.PI) / 180), pcy - rr * Math.sin((d * Math.PI) / 180)]
  const band = `${m1Arc(pcx, pcy, pR, 40, 140)} L${pAt(140, pr)[0].toFixed(1)} ${pAt(140, pr)[1].toFixed(1)} A${pr} ${pr} 0 0 1 ${pAt(40, pr)[0].toFixed(1)} ${pAt(40, pr)[1].toFixed(1)} Z`
  return (
    <Scene caption="Transmission angle μ: how much of the coupler force actually turns the output">
      {cases.map((v, i) => {
        const x0 = 16 + i * 296
        return (
          <g key={v.target} transform={`translate(${x0},0)`}>
            <g className="komm-cell-in" style={m1d(i * 1.3)}>
              <rect x="0" y="16" width="276" height="284" rx="11" fill={WHITE} stroke={v.tone} strokeWidth="2.2" />
              <L x={138} y={40} size={15} fill={v.tone}>{`μ = ${Math.round(v.mu)}°`}</L>
              <L x={138} y={58} size={11.5} fill={MUTED} weight={700}>{v.say}</L>
              <M1FourBar o2={o2} o4={o4} a={a} b={b} c={c} deg={v.d} w={5} />
              <path d={v.arc} fill="none" stroke={v.tone} strokeWidth="2.2" />
              <M1Arrow from={v.B} to={v.Ftip} tone={ROSE} w={2.6} />
              <g className="komm-emerge" style={m1d(i * 1.3 + 0.7)}>
                <path
                  d={`M${v.Ftip[0].toFixed(1)} ${v.Ftip[1].toFixed(1)} L${v.Ttip[0].toFixed(1)} ${v.Ttip[1].toFixed(1)} M${v.Ftip[0].toFixed(1)} ${v.Ftip[1].toFixed(1)} L${v.Rtip[0].toFixed(1)} ${v.Rtip[1].toFixed(1)}`}
                  stroke={MUTED}
                  strokeWidth="1.3"
                  strokeDasharray="4 4"
                  fill="none"
                />
                {v.sin * F > 4 ? <M1Arrow from={v.B} to={v.Ttip} tone={GREEN} w={2} /> : null}
                {v.cos * F > 4 ? <M1Arrow from={v.B} to={v.Rtip} tone={AMBER} w={2} /> : null}
              </g>
              {v.target === 15 ? (
                <L x={138} y={290} size={13} fill={RED} className="komm-pulse">⚠ bearing overload</L>
              ) : null}
            </g>
          </g>
        )
      })}

      <Card x={16} y={312} w={544} h={170} title="The coupler force F, resolved at B (to scale, F = 1)" accent={N} foot="F acts along the coupler AB; only the part square to O₄B makes torque" footTone={ROSE}>
        <L x={86} y={50} size={11.5} fill={GREEN} anchor="start">torque  F sin μ</L>
        <L x={330} y={50} size={11.5} fill={AMBER} anchor="start">bearing  F cos μ</L>
        <Bars x={86} y={58} w={150} max={1} className="komm-slide-in" items={cases.map((v) => [`μ = ${Math.round(v.mu)}°`, v.sin.toFixed(2), GREEN])} />
        <Bars x={330} y={58} w={150} max={1} className="komm-slide-in" items={cases.map((v) => ['', v.cos.toFixed(2), v.target === 15 ? RED : AMBER])} />
      </Card>

      <Card x={576} y={312} w={308} h={170} title="Acceptable transmission angle" accent={GREEN} foot="design range 40° ≤ μ ≤ 140°" footTone={GREEN}>
        <path d={`${m1Arc(pcx, pcy, pR, 0, 180)} Z`} fill={SKY} stroke={MUTED} strokeWidth="1.8" />
        <g className="komm-emerge" style={m1d(4)}>
          <path d={band} fill={GREEN} fillOpacity="0.28" stroke={GREEN} strokeWidth="1.8" />
        </g>
        {cases.map((v) => {
          const tip = pAt(v.mu, pR - 4)
          return (
            <g key={`n${v.target}`}>
              <path d={`M${pcx} ${pcy} L${tip[0].toFixed(1)} ${tip[1].toFixed(1)}`} stroke={v.tone} strokeWidth="2.4" strokeLinecap="round" />
              <Dot cx={tip[0]} cy={tip[1]} r={3.5} fill={v.tone} />
            </g>
          )
        })}
        <Dot cx={pcx} cy={pcy} r={4} fill={N} />
        <M x={pcx + pR + 10} y={pcy + 4} size={11} fill={MUTED} anchor="start">0°</M>
        <M x={pcx - pR - 10} y={pcy + 4} size={11} fill={MUTED} anchor="end">180°</M>
        <M x={pcx} y={pcy - pR - 6} size={11} fill={MUTED}>90°</M>
        <M x={pAt(40, pR + 12)[0]} y={pAt(40, pR + 12)[1]} size={11} fill={GREEN} anchor="start">40°</M>
        <M x={pAt(140, pR + 12)[0]} y={pAt(140, pR + 12)[1]} size={11} fill={GREEN} anchor="end">140°</M>
      </Card>
    </Scene>
  )
}

/* Unit 14 — slider-crank-four-inversions */
export function M1SliderCrankInversionsScene() {
  const rad = (d) => (n(d) * Math.PI) / 180
  const at = (o, r, d) => [n(o[0]) + n(r) * Math.cos(rad(d)), n(o[1]) - n(r) * Math.sin(rad(d))]
  const unit = (p, q) => {
    const [dx, dy] = [q[0] - p[0], q[1] - p[1]]
    const len = Math.hypot(dx, dy) || 1
    return [dx / len, dy / len, len]
  }
  const f1 = (v) => v.toFixed(1)
  /* Sweep the crank once, find the output's two extremes, and split the turn
     into the longer (forward) and shorter (return) crank arcs. Twelve equal
     crank steps from one extreme are tagged with the stroke they fall in. */
  const strokes = (out) => {
    let [lo, hi, vlo, vhi] = [0, 0, Infinity, -Infinity]
    for (let d = 0; d < 360; d += 0.5) {
      const v = out(d)
      if (v < vlo) [vlo, lo] = [v, d]
      if (v > vhi) [vhi, hi] = [v, d]
    }
    const up = (((hi - lo) % 360) + 360) % 360
    const fwdIsUp = up >= 180
    const fwd = Math.max(up, 360 - up)
    const ticks = Array.from({ length: 12 }, (_, i) => ({ d: lo + i * 30, fwd: i * 30 < up === fwdIsUp }))
    return { fwd, ret: 360 - fwd, ticks }
  }

  /* 1: cylinder fixed — the engine */
  const eng = { o: [50, 190], r: 32, l: 96 }
  const engX = (d) => {
    const A = at(eng.o, eng.r, d)
    return A[0] + Math.sqrt(eng.l ** 2 - (A[1] - eng.o[1]) ** 2)
  }
  const engA = at(eng.o, eng.r, 50)
  const engP = engX(50)
  const engS = strokes(engX)

  /* 2: crank fixed — Whitworth; the old frame now turns as the driving crank */
  const ww = { o1: [60, 170], o2: [60, 196], r: 52, arm: 30, l: 90 }
  const wwPose = (d) => {
    const P = at(ww.o2, ww.r, d)
    const [ux, uy, len] = unit(ww.o1, P)
    const R = [ww.o1[0] - ww.arm * ux, ww.o1[1] - ww.arm * uy]
    const Q = [R[0] + Math.sqrt(ww.l ** 2 - (R[1] - ww.o1[1]) ** 2), ww.o1[1]]
    return { P, R, Q, end: [ww.o1[0] + (len + 10) * ux, ww.o1[1] + (len + 10) * uy] }
  }
  const wwS = strokes((d) => wwPose(d).Q[0])
  const wp = wwPose(250)

  /* 3: rod fixed — oscillating cylinder (the slotted-lever family) */
  const oc = { o2: [70, 110], o1: [70, 182], r: 32, rod: 90 }
  const ocPose = (d) => {
    const P = at(oc.o2, oc.r, d)
    const [ux, uy] = unit(oc.o1, P)
    const [nx, ny] = [-uy * 13, ux * 13]
    const e0 = [oc.o1[0] - 62 * ux, oc.o1[1] - 62 * uy]
    const e1 = [oc.o1[0] + 16 * ux, oc.o1[1] + 16 * uy]
    return {
      P,
      u: [ux, uy],
      S: [P[0] - oc.rod * ux, P[1] - oc.rod * uy],
      nrm: [nx, ny],
      body: `M${f1(e0[0] + nx)} ${f1(e0[1] + ny)} L${f1(e1[0] + nx)} ${f1(e1[1] + ny)} M${f1(e1[0] - nx)} ${f1(e1[1] - ny)} L${f1(e0[0] - nx)} ${f1(e0[1] - ny)} L${f1(e0[0] + nx)} ${f1(e0[1] + ny)}`,
      fillPath: `M${f1(e0[0] + nx)} ${f1(e0[1] + ny)} L${f1(e1[0] + nx)} ${f1(e1[1] + ny)} L${f1(e1[0] - nx)} ${f1(e1[1] - ny)} L${f1(e0[0] - nx)} ${f1(e0[1] - ny)} Z`,
    }
  }
  const ocS = strokes((d) => {
    const u = ocPose(d).u
    return Math.atan2(u[0], -u[1])
  })
  const op = ocPose(200)

  /* 4: slider fixed — hand pump; handle rocks, plunger slides in the sleeve */
  const hp = { B: [140, 200], arm: 60, link: 40, grip: 124 }
  const hpPose = (psi) => {
    const ax = 60 + hp.arm * Math.cos(rad(psi))
    const ay = hp.B[1] - Math.sqrt(hp.link ** 2 - (ax - hp.B[0]) ** 2)
    const y1 = ay + hp.arm * Math.sin(rad(psi))
    return { O: [60, y1], A: [ax, ay], G: [60 + hp.grip * Math.cos(rad(psi)), y1 - hp.grip * Math.sin(rad(psi))] }
  }
  const gripPath = []
  for (let s = -15; s <= 20; s += 2.5) gripPath.push(hpPose(s).G)
  const hMain = hpPose(4)

  const panels = [
    { title: '1  Engine', sub: 'link 1 (cylinder) fixed', notes: ['piston reciprocates in', 'the fixed cylinder'] },
    { title: '2  Whitworth', sub: 'link 2 (crank) fixed', notes: [`${wwS.ticks.filter((t) => t.fwd).length} crank steps forward,`, `${wwS.ticks.filter((t) => !t.fwd).length} back: quick return`] },
    { title: '3  Oscillating cylinder', sub: 'link 3 (rod) fixed', notes: [`${ocS.ticks.filter((t) => t.fwd).length} crank steps one way,`, `${ocS.ticks.filter((t) => !t.fwd).length} back: cylinder rocks`] },
    { title: '4  Hand pump', sub: 'link 4 (slider) fixed', notes: ['handle rocks, plunger', 'slides in the fixed sleeve'] },
  ]
  const timing = [
    { name: 'Whitworth', s: wwS },
    { name: 'Oscillating cylinder', s: ocS },
  ]
  const tickStyle = (i, j) => m1d(i * 1.4 + 0.4 + j * 0.12)
  return (
    <Scene caption="One slider-crank chain, four fixed links: four different machines">
      {panels.map((p, i) => (
        <g key={p.title} transform={`translate(${16 + i * 218},0)`}>
          <g className="komm-cell-in" style={m1d(i * 1.4)}>
            <rect x="0" y="16" width="210" height="314" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
            <L x={105} y={40} size={13.5} fill={BLUE}>{p.title}</L>
            <L x={105} y={58} size={11} fill={MUTED} weight={700}>{p.sub}</L>

            {i === 0 ? (
              <g>
                <M1Frame p={[100, 174]} q={[204, 174]} side={-1} w={4} />
                <M1Frame p={[100, 206]} q={[204, 206]} side={1} w={4} />
                <M1Ground x={eng.o[0]} y={eng.o[1]} w={28} />
                <circle cx={eng.o[0]} cy={eng.o[1]} r={eng.r} fill="none" stroke={BLUE} strokeWidth="1.6" className="komm-current" />
                <M1Bar p={eng.o} q={engA} tone={BLUE} w={5} />
                <M1Bar p={engA} q={[engP, eng.o[1]]} tone={AMBER} w={5} />
                <rect x={engP - 12} y={eng.o[1] - 13} width="24" height="26" rx="3" fill={TEAL} fillOpacity="0.25" stroke={TEAL} strokeWidth="2.2" />
                <M1Pin x={eng.o[0]} y={eng.o[1]} r={4} />
                <M1Pin x={engA[0]} y={engA[1]} r={4} />
                <M1Pin x={engP} y={eng.o[1]} r={4} />
                {engS.ticks.map((t, j) => (
                  <path key={j} d={`M${f1(engX(t.d))} 232 L${f1(engX(t.d))} 242`} stroke={N} strokeWidth="2" className="komm-cell-in" style={tickStyle(i, j)} />
                ))}
                <M1Arrow from={[146, 254]} to={[eng.o[0] + eng.l + eng.r + 1, 254]} tone={MUTED} w={1.6} />
                <M1Arrow from={[146, 254]} to={[eng.o[0] + eng.l - eng.r - 1, 254]} tone={MUTED} w={1.6} />
                <M x={146} y={272} size={11} fill={MUTED}>stroke = 2r</M>
              </g>
            ) : null}

            {i === 1 ? (
              <g>
                <M1Frame p={[112, 181]} q={[206, 181]} side={1} w={3} />
                <circle cx={ww.o2[0]} cy={ww.o2[1]} r={ww.r} fill="none" stroke={BLUE} strokeWidth="1.6" className="komm-current" />
                <M1Frame p={ww.o1} q={ww.o2} side={1} w={7} />
                <M1Bar p={ww.o2} q={wp.P} tone={BLUE} w={5} />
                <M1Bar p={wp.R} q={wp.end} tone={PURP} w={5} />
                <M1Bar p={wp.R} q={wp.Q} tone={AMBER} w={4} />
                <rect x={wp.Q[0] - 13} y={159} width="26" height="20" rx="3" fill={TEAL} fillOpacity="0.25" stroke={TEAL} strokeWidth="2.2" />
                {[ww.o1, ww.o2, wp.P, wp.R, wp.Q].map((q, j) => <M1Pin key={j} x={q[0]} y={q[1]} r={4} />)}
                {wwS.ticks.map((t, j) => {
                  const x = wwPose(t.d).Q[0]
                  const y = t.fwd ? 200 : 214
                  return <path key={j} d={`M${f1(x)} ${y} L${f1(x)} ${y + 9}`} stroke={t.fwd ? GREEN : ROSE} strokeWidth="2.2" className="komm-cell-in" style={tickStyle(i, j)} />
                })}
              </g>
            ) : null}

            {i === 2 ? (
              <g>
                <path d={`M${oc.o2[0]} ${oc.o2[1]} L120 ${oc.o2[1]} M${oc.o1[0]} ${oc.o1[1]} L120 ${oc.o1[1]}`} stroke={MUTED} strokeWidth="4" strokeLinecap="round" />
                <M1Frame p={[120, oc.o2[1]]} q={[120, oc.o1[1]]} side={-1} w={6} />
                <circle cx={oc.o2[0]} cy={oc.o2[1]} r={oc.r} fill="none" stroke={BLUE} strokeWidth="1.6" className="komm-current" />
                <path d={op.fillPath} fill={SKY} />
                <path d={op.body} fill="none" stroke={TEAL} strokeWidth="2.4" strokeLinejoin="round" />
                <M1Bar p={op.S} q={op.P} tone={AMBER} w={4} />
                <M1Bar p={[op.S[0] + op.nrm[0] * 0.85, op.S[1] + op.nrm[1] * 0.85]} q={[op.S[0] - op.nrm[0] * 0.85, op.S[1] - op.nrm[1] * 0.85]} tone={AMBER} w={6} />
                <M1Bar p={oc.o2} q={op.P} tone={BLUE} w={5} />
                {[oc.o2, oc.o1, op.P].map((q, j) => <M1Pin key={j} x={q[0]} y={q[1]} r={4} />)}
                {ocS.ticks.map((t, j) => {
                  const u = ocPose(t.d).u
                  const rr = t.fwd ? 72 : 84
                  return <Dot key={j} cx={oc.o1[0] - rr * u[0]} cy={oc.o1[1] - rr * u[1]} r={3} fill={t.fwd ? GREEN : ROSE} className="komm-cell-in" />
                })}
              </g>
            ) : null}

            {i === 3 ? (
              <g>
                <M1Frame p={[50, 212]} q={[50, 258]} side={1} w={4} />
                <M1Frame p={[70, 212]} q={[70, 258]} side={-1} w={4} />
                <M1Frame p={[70, 264]} q={[140, 264]} side={1} w={5} />
                <M1Frame p={[140, 264]} q={hp.B} side={1} w={5} />
                <Curve pts={gripPath} stroke={BLUE} width={1.8} className="komm-current" />
                {[-15, 20].map((s) => {
                  const g = hpPose(s)
                  return (
                    <g key={s} opacity="0.4">
                      <M1Bar p={g.O} q={g.G} tone={BLUE} w={2.5} dash="4 4" />
                      <M1Bar p={g.A} q={hp.B} tone={AMBER} w={2.5} dash="4 4" />
                    </g>
                  )
                })}
                <M1Bar p={hMain.O} q={[60, hMain.O[1] + 80]} tone={TEAL} w={6} />
                <M1Bar p={hMain.O} q={hMain.G} tone={BLUE} w={5} />
                <M1Bar p={hMain.A} q={hp.B} tone={AMBER} w={5} />
                {[hMain.O, hMain.A, hp.B].map((q, j) => <M1Pin key={j} x={q[0]} y={q[1]} r={4} />)}
                <M1Arrow from={[32, (hpPose(-15).O[1] + hpPose(20).O[1]) / 2]} to={[32, hpPose(-15).O[1]]} tone={TEAL} w={1.8} />
                <M1Arrow from={[32, (hpPose(-15).O[1] + hpPose(20).O[1]) / 2]} to={[32, hpPose(20).O[1]]} tone={TEAL} w={1.8} />
              </g>
            ) : null}

            <L x={105} y={292} size={11} fill={N} weight={700}>{p.notes[0]}</L>
            <L x={105} y={310} size={11} fill={N} weight={700}>{p.notes[1]}</L>
          </g>
        </g>
      ))}

      <Card x={16} y={340} w={868} h={142} title="Stroke timing at uniform crank speed: forward (green) against return (rose)" accent={N} foot="time is proportional to crank angle, so the stroke that sweeps the smaller angle is the quick one" footTone={MUTED}>
        {timing.map((row, j) => {
          const y = 44 + j * 38
          const W = 440
          const wf = (W * row.s.fwd) / 360
          return (
            <g key={row.name}>
              <L x={16} y={y + 17} size={12.5} fill={N} anchor="start">{row.name}</L>
              <g className="komm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center', animationIterationCount: 1, animationFillMode: 'both', animationDelay: `${6 + j * 0.8}s` }}>
                <rect x="250" y={y} width={wf} height="24" rx="5" fill={GREEN} />
                <rect x={250 + wf} y={y} width={W - wf} height="24" rx="5" fill={ROSE} />
              </g>
              <M x={250 + wf / 2} y={y + 17} size={11.5} fill={WHITE}>{`forward ${Math.round(row.s.fwd)}°`}</M>
              <M x={250 + wf + (W - wf) / 2} y={y + 17} size={11.5} fill={WHITE}>{`return ${Math.round(row.s.ret)}°`}</M>
              <M x={706} y={y + 17} size={13} fill={ROSE} anchor="start" weight={800}>{`ratio ${(row.s.fwd / row.s.ret).toFixed(2)} : 1`}</M>
            </g>
          )
        })}
      </Card>
    </Scene>
  )
}

/* Unit 15 — double-slider-three-inversions */
export function M1DoubleSliderScene() {
  const f1 = (v) => v.toFixed(1)
  const rad = (d) => (n(d) * Math.PI) / 180

  /* 1: elliptical trammel — grooves cross at C, bar AB = 120 */
  const C = [158, 250]
  const Lb = 120
  const phi = 35
  const A = [C[0] + Lb * Math.cos(rad(phi)), C[1]]
  const B = [C[0], C[1] - Lb * Math.sin(rad(phi))]
  const pens = [
    { t: 0.3, tone: PURP, name: 'P₁' },
    { t: 0.7, tone: GREEN, name: 'P₂' },
  ].map((p) => {
    const ax = (1 - p.t) * Lb
    const by = p.t * Lb
    const pts = []
    for (let d = 0; d <= 360; d += 4) pts.push([C[0] + ax * Math.cos(rad(d)), C[1] - by * Math.sin(rad(d))])
    return { ...p, ax, by, pts, at: [A[0] + p.t * (B[0] - A[0]), A[1] + p.t * (B[1] - A[1])] }
  })
  const cross = 'M30 238 L146 238 L146 118 L170 118 L170 238 L286 238 L286 262 L170 262 L170 382 L146 382 L146 262 L30 262 Z'

  /* 2: Scotch yoke against a slider-crank of l = 1.6r */
  const O = [378, 150]
  const rc = 42
  const th = 40
  const P = [O[0] + rc * Math.cos(rad(th)), O[1] - rc * Math.sin(rad(th))]
  const px = (d) => 336 + (d / 360) * 240
  const yoke = []
  const sc = []
  for (let d = 0; d <= 360; d += 4) {
    yoke.push([px(d), 360 - 60 * Math.cos(rad(d))])
    sc.push([px(d), 360 - 60 * (Math.cos(rad(d)) + Math.sqrt(1.6 ** 2 - Math.sin(rad(d)) ** 2) - 1.6)])
  }

  /* 3: Oldham — shaft axes O1, O2 offset e = 30; C sits on the circle on O1O2 */
  const O1 = [746, 296]
  const O2 = [746, 326]
  const mid = [746, 311]
  const Cd = [761, 311]
  const ext = (from, via, len) => {
    const [dx, dy] = [via[0] - from[0], via[1] - from[1]]
    const L = Math.hypot(dx, dy)
    return [from[0] + (dx / L) * len, from[1] + (dy / L) * len]
  }
  return (
    <Scene caption="The double-slider chain: trammel, Scotch yoke and Oldham coupling">
      <g className="komm-cell-in">
        <rect x="16" y="16" width="284" height="466" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
        <L x={158} y={40} size={13.5} fill={BLUE}>1  Elliptical trammel</L>
        <L x={158} y={58} size={11} fill={MUTED} weight={700}>grooved frame fixed</L>
        <path d={cross} fill={SKY} stroke={MUTED} strokeWidth="2" strokeLinejoin="round" />
        {pens.map((p, j) => (
          <Curve key={p.name} pts={p.pts} stroke={p.tone} width={2.4} className="komm-draw" />
        ))}
        <rect x={A[0] - 14} y={C[1] - 10} width="28" height="20" rx="3" fill={BLUE} fillOpacity="0.25" stroke={BLUE} strokeWidth="2.2" />
        <rect x={C[0] - 10} y={B[1] - 14} width="20" height="28" rx="3" fill={TEAL} fillOpacity="0.25" stroke={TEAL} strokeWidth="2.2" />
        <M1Bar p={A} q={B} tone={AMBER} w={5} />
        <M1Pin x={A[0]} y={A[1]} r={4} />
        <M1Pin x={B[0]} y={B[1]} r={4} />
        {pens.map((p) => <Dot key={`d${p.name}`} cx={p.at[0]} cy={p.at[1]} r={5} fill={p.tone} />)}
        {pens.map((p, j) => (
          <M key={`t${p.name}`} x={158} y={410 + j * 18} size={12} fill={p.tone}>{`${p.name}: a = ${Math.round(p.ax)}, b = ${Math.round(p.by)}`}</M>
        ))}
        <L x={158} y={450} size={11.5} fill={N} weight={800}>semi-axes a = PB, b = PA</L>
        <L x={158} y={468} size={11} fill={MUTED} weight={700}>every point on the bar traces an ellipse</L>
      </g>

      <g className="komm-cell-in" style={m1d(1.4)}>
        <rect x="308" y="16" width="292" height="466" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
        <L x={454} y={40} size={13.5} fill={BLUE}>2  Scotch yoke</L>
        <L x={454} y={58} size={11} fill={MUTED} weight={700}>crank pin drives a slotted yoke</L>
        <M1Frame p={[470, 140]} q={[500, 140]} side={-1} w={3} />
        <M1Frame p={[470, 160]} q={[500, 160]} side={1} w={3} />
        <M1Ground x={O[0]} y={O[1]} w={28} />
        <circle cx={O[0]} cy={O[1]} r={rc} fill="none" stroke={BLUE} strokeWidth="1.6" className="komm-current" />
        <M1Bar p={[P[0] + 6, O[1]]} q={[P[0] + 176, O[1]]} tone={TEAL} w={7} />
        <rect x={P[0] - 8} y={96} width="16" height="108" rx="3" fill={WHITE} stroke={TEAL} strokeWidth="2.4" />
        <path d={`M${f1(P[0])} 104 L${f1(P[0])} 196`} stroke={TEAL} strokeWidth="1.4" strokeDasharray="3 3" />
        <M1Bar p={O} q={P} tone={BLUE} w={5} />
        <M1Pin x={O[0]} y={O[1]} r={4} />
        <M1Pin x={P[0]} y={P[1]} r={4} />
        <L x={330} y={250} size={11.5} fill={BLUE} anchor="start">Scotch yoke: x = r cos θ, exact</L>
        <L x={330} y={268} size={11.5} fill={ROSE} anchor="start">slider-crank, l = 1.6r: not sinusoidal</L>
        <Axes x={330} y={440} w={256} h={160} tickLabels={[[336, 'θ = 0'], [456, '180°'], [576, '360°']]} />
        <path d="M330 360 L586 360" stroke={MUTED} strokeWidth="1.2" strokeDasharray="4 4" />
        <Curve pts={sc} stroke={ROSE} width={2.4} dash="7 5" />
        <Curve pts={yoke} stroke={BLUE} width={2.6} className="komm-draw" />
      </g>

      <g className="komm-cell-in" style={m1d(2.8)}>
        <rect x="608" y="16" width="276" height="466" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
        <L x={746} y={40} size={13.5} fill={BLUE}>3  Oldham coupling</L>
        <L x={746} y={58} size={11} fill={MUTED} weight={700}>exploded: two shafts, three discs</L>
        <M1Bar p={[620, 118]} q={[664, 118]} tone={BLUE} w={10} />
        <rect x="664" y="80" width="14" height="76" rx="3" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="2.2" />
        <rect x="704" y="119" width="8" height="14" fill={AMBER} fillOpacity="0.35" stroke={AMBER} strokeWidth="1.6" />
        <rect x="712" y="88" width="14" height="76" rx="3" fill={AMBER} fillOpacity="0.2" stroke={AMBER} strokeWidth="2.2" />
        <rect x="726" y="96" width="8" height="60" fill={AMBER} fillOpacity="0.35" stroke={AMBER} strokeWidth="1.6" />
        <rect x="760" y="96" width="14" height="76" rx="3" fill={TEAL} fillOpacity="0.2" stroke={TEAL} strokeWidth="2.2" />
        <M1Bar p={[774, 134]} q={[870, 134]} tone={TEAL} w={10} />
        <M x={671} y={190} size={11} fill={BLUE}>1</M>
        <M x={719} y={190} size={11} fill={AMBER}>2 (floating)</M>
        <M x={767} y={190} size={11} fill={TEAL}>3</M>

        <circle cx={O1[0]} cy={O1[1]} r="56" fill="none" stroke={BLUE} strokeWidth="1.8" opacity="0.6" />
        <circle cx={O2[0]} cy={O2[1]} r="56" fill="none" stroke={TEAL} strokeWidth="1.8" opacity="0.6" />
        <circle cx={Cd[0]} cy={Cd[1]} r="46" fill={AMBER} fillOpacity="0.1" stroke={AMBER} strokeWidth="2" />
        <M1Bar p={ext(Cd, O1, -30)} q={ext(Cd, O1, 50)} tone={BLUE} w={3} />
        <M1Bar p={ext(Cd, O2, -30)} q={ext(Cd, O2, 50)} tone={TEAL} w={3} />
        <circle cx={mid[0]} cy={mid[1]} r="15" fill="none" stroke={ROSE} strokeWidth="1.6" strokeDasharray="3 3" />
        <g className="komm-spin" style={m1pivot(mid[0], mid[1])}>
          <Dot cx={mid[0] + 15} cy={mid[1]} r={4.5} fill={ROSE} />
        </g>
        <Dot cx={O1[0]} cy={O1[1]} r={3.5} fill={BLUE} />
        <Dot cx={O2[0]} cy={O2[1]} r={3.5} fill={TEAL} />
        <M x={716} y={292} size={12} fill={BLUE} anchor="end">O₁</M>
        <M x={716} y={330} size={12} fill={TEAL} anchor="end">O₂</M>
        <path d="M752 296 L822 296 M752 326 L822 326" stroke={MUTED} strokeWidth="1" strokeDasharray="2 3" />
        <M1Arrow from={[818, 311]} to={[818, 298]} tone={N} w={1.6} />
        <M1Arrow from={[818, 311]} to={[818, 324]} tone={N} w={1.6} />
        <M x={828} y={315} size={12} fill={N} anchor="start">e</M>
        <L x={746} y={404} size={11.5} fill={N} weight={700}>slots at 90°: C sees O₁O₂ at a right angle,</L>
        <L x={746} y={422} size={11.5} fill={N} weight={700}>so C stays on the circle of diameter e</L>
        <L x={746} y={446} size={11.5} fill={ROSE} weight={800}>C orbits at 2ω; both shafts turn at ω</L>
      </g>
    </Scene>
  )
}

/* Unit 16 — loop-closure-vector-polygon */
export function M1LoopClosureScene() {
  const [r1, r2, r3, r4, t2] = [180, 70, 160, 110, 60]
  const o2 = [60, 240]
  const o4 = [60 + r1, 240]
  const pose = m1Pose(o2, o4, r2, r3, r4, t2)
  const { A, B } = pose
  const ang = (p, q) => (Math.atan2(-(q[1] - p[1]), q[0] - p[0]) * 180) / Math.PI
  const t3 = ang(A, B)
  const t4 = ang(o4, B)
  const sh = (p) => [p[0] + 300, p[1]]
  const vecs = [
    { from: o2, to: A, tone: BLUE, label: 'r₂', lp: [64, 204], anchor: 'end' },
    { from: A, to: B, tone: AMBER, label: 'r₃', lp: [166, 138], anchor: 'middle' },
    { from: o4, to: B, tone: TEAL, label: 'r₄', lp: [262, 188], anchor: 'start' },
    { from: o2, to: o4, tone: MUTED, label: 'r₁', lp: [150, 258], anchor: 'middle' },
  ]
  /* tip to tail: r₂, r₃, then −r₄ and −r₁ back to the start */
  const loop = [
    { from: sh(o2), to: sh(A), tone: BLUE, label: 'r₂', lp: [364, 204], anchor: 'end' },
    { from: sh(A), to: sh(B), tone: AMBER, label: 'r₃', lp: [466, 138], anchor: 'middle' },
    { from: sh(B), to: sh(o4), tone: TEAL, label: '−r₄', lp: [562, 188], anchor: 'start' },
    { from: sh(o4), to: sh(o2), tone: MUTED, label: '−r₁', lp: [480, 258], anchor: 'middle' },
  ]
  const U = (s) => <tspan fill={ROSE}>{s}</tspan>
  return (
    <Scene caption="Loop closure: the link vectors form a closed polygon, giving two equations for two unknown angles">
      <g className="komm-cell-in">
        <rect x="16" y="16" width="284" height="284" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
        <L x={158} y={40} size={13.5} fill={BLUE}>Each link becomes a vector</L>
        <M1FourBar o2={o2} o4={o4} a={r2} b={r3} c={r4} deg={t2} w={5} opacity={0.3} />
        {vecs.map((v, i) => (
          <g key={v.label} className="komm-emerge" style={m1d(0.5 + i * 0.3)}>
            <M1Arrow from={v.from} to={v.to} tone={v.tone} w={2.8} />
            <M x={v.lp[0]} y={v.lp[1]} size={13} fill={v.tone} anchor={v.anchor} weight={800}>{v.label}</M>
          </g>
        ))}
        <path d={`M${o2[0]} ${o2[1]} L${o2[0] + 34} ${o2[1]}`} stroke={MUTED} strokeWidth="1.2" strokeDasharray="3 3" />
        <path d={m1Arc(o2[0], o2[1], 24, 0, t2)} fill="none" stroke={BLUE} strokeWidth="2" />
        <M x={91} y={222} size={12} fill={BLUE} anchor="start">θ₂</M>
        <path d={`M${A[0].toFixed(1)} ${A[1].toFixed(1)} L${(A[0] + 34).toFixed(1)} ${A[1].toFixed(1)}`} stroke={MUTED} strokeWidth="1.2" strokeDasharray="3 3" />
        <path d={m1Arc(A[0], A[1], 26, 0, t3)} fill="none" stroke={ROSE} strokeWidth="2" />
        <M x={A[0] + 27} y={A[1] + 17} size={12} fill={ROSE} anchor="start">θ₃</M>
        <path d={`M${o4[0]} ${o4[1]} L${o4[0] + 36} ${o4[1]}`} stroke={MUTED} strokeWidth="1.2" strokeDasharray="3 3" />
        <path d={m1Arc(o4[0], o4[1], 22, 0, t4)} fill="none" stroke={ROSE} strokeWidth="2" />
        <M x={265} y={217} size={12} fill={ROSE} anchor="start">θ₄</M>
      </g>

      <g className="komm-cell-in" style={m1d(1.4)}>
        <rect x="316" y="16" width="284" height="284" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
        <L x={458} y={40} size={13.5} fill={BLUE}>Lifted off, tip to tail</L>
        {loop.map((v, i) => (
          <g key={v.label} className="komm-slide-in" style={m1d(1.8 + i * 0.4)}>
            <M1Arrow from={v.from} to={v.to} tone={v.tone} w={2.8} />
            <M x={v.lp[0]} y={v.lp[1]} size={13} fill={v.tone} anchor={v.anchor} weight={800}>{v.label}</M>
          </g>
        ))}
        <Dot cx={sh(o2)[0]} cy={sh(o2)[1]} r={6} fill={GREEN} className="komm-pulse" />
        <L x={366} y={262} size={11.5} fill={GREEN} anchor="start">loop closes</L>
      </g>

      <Panel
        x={616}
        y={16}
        w={268}
        title="Known and unknown"
        className="komm-cell-in"
        rows={[
          [`r₁ = ${r1},  θ₁ = 0°`, 'frame', MUTED],
          [`r₂ = ${r2},  θ₂ = ${t2}°`, 'input', BLUE],
          [`r₃ = ${r3},  θ₃ = ?`, 'unknown', ROSE],
          [`r₄ = ${r4},  θ₄ = ?`, 'unknown', ROSE],
        ]}
      />
      <Card x={616} y={180} w={268} h={120} title="Solution check" accent={GREEN} className="komm-cell-in">
        <g className="komm-cell-in" style={m1d(4.8)}>
          <L x={134} y={56} size={12.5} fill={N} weight={800}>2 scalar equations</L>
          <L x={134} y={78} size={12.5} fill={ROSE} weight={800}>2 unknowns: θ₃, θ₄</L>
          <L x={134} y={104} size={14} fill={GREEN}>2 = 2 → determinate ✓</L>
        </g>
      </Card>

      <Card x={16} y={316} w={868} h={166} title="Loop-closure equation" accent={N} foot="θ₂ is given; the pair solves for θ₃ and θ₄ (two roots: the open and the crossed assembly)" footTone={MUTED}>
        <g className="komm-cell-in" style={m1d(3.2)}>
          <M x={434} y={62} size={16} fill={N} weight={800}>r₂ + r₃ − r₄ − r₁ = 0</M>
        </g>
        <g className="komm-cell-in" style={m1d(3.8)}>
          <M x={434} y={96} size={14} fill={N}>
            x:  r₂ cos θ₂ + r₃ cos {U('θ₃')} − r₄ cos {U('θ₄')} − r₁ = 0
          </M>
        </g>
        <g className="komm-cell-in" style={m1d(4.2)}>
          <M x={434} y={124} size={14} fill={N}>
            y:  r₂ sin θ₂ + r₃ sin {U('θ₃')} − r₄ sin {U('θ₄')} = 0
          </M>
        </g>
      </Card>
    </Scene>
  )
}

/* ── Module 2 ────────────────────────────────────────────────────────── */

/* ── Module 2  Velocity and Acceleration Analysis ─────────────── */

/* Unit 1 — absolute-relative-vector-triangle */
export function M2AbsRelVectorScene() {
  /* Four-bar left, vector triangle right, arithmetic strip beneath */
  const pivotA = [60, 320]
  const crankEnd = [140, 240]
  const couplerEnd = [320, 210]
  const pivotB = [360, 320]
  /* velocity vectors from coupler points */
  const vAx = 140, vAy = 240, vBx = 320, vBy = 210
  /* vector space pole */
  const px = 580, py = 360
  /* velocity tips */
  const tAx = 580, tAy = 260
  const tBx = 700, tBy = 300
  return (
    <Scene caption="Absolute & relative velocity — the vector triangle">
      {/* ground */}
      <Wire d={`M40 320 L380 320`} stroke={MUTED} width={2} dash="6 4" />
      {/* four-bar mechanism */}
      <Wire d={`M${pivotA[0]} ${pivotA[1]} L${crankEnd[0]} ${crankEnd[1]}`} stroke={N} width={3} />
      <Wire d={`M${crankEnd[0]} ${crankEnd[1]} L${couplerEnd[0]} ${couplerEnd[1]}`} stroke={BLUE} width={3} />
      <Wire d={`M${couplerEnd[0]} ${couplerEnd[1]} L${pivotB[0]} ${pivotB[1]}`} stroke={N} width={3} />
      {/* pivots */}
      <Dot cx={pivotA[0]} cy={pivotA[1]} r={6} fill={MUTED} />
      <Dot cx={pivotB[0]} cy={pivotB[1]} r={6} fill={MUTED} />
      <L x={pivotA[0]} y={pivotA[1] + 22} size={13} fill={MUTED}>O₁</L>
      <L x={pivotB[0]} y={pivotB[1] + 22} size={13} fill={MUTED}>O₂</L>
      {/* coupler points */}
      <Dot cx={vAx} cy={vAy} r={5} fill={BLUE} />
      <Dot cx={vBx} cy={vBy} r={5} fill={AMBER} />
      <L x={vAx - 18} y={vAy - 8} size={14} fill={BLUE}>A</L>
      <L x={vBx + 16} y={vBy - 8} size={14} fill={AMBER}>B</L>
      {/* absolute velocity arrows on mechanism */}
      <Wire d={`M${vAx} ${vAy} L${vAx - 40} ${vAy - 70}`} stroke={BLUE} width={2.5} marker="url(#komArrB)" className="komm-pulse" />
      <L x={vAx - 68} y={vAy - 78} size={11} fill={BLUE} anchor="end">V_A</L>
      <Wire d={`M${vBx} ${vBy} L${vBx + 50} ${vBy - 60}`} stroke={AMBER} width={2.5} marker="url(#komArrA)" className="komm-pulse" />
      <L x={vBx + 62} y={vBy - 70} size={11} fill={AMBER} anchor="start">V_B</L>

      {/* ── Vector space ── */}
      <L x={px} y={py + 30} size={12} fill={MUTED}>pole o</L>
      <Dot cx={px} cy={py} r={5} fill={N} />
      {/* V_A from pole */}
      <Wire d={`M${px} ${py} L${tAx} ${tAy}`} stroke={BLUE} width={2.5} marker="url(#komArrB)" />
      <L x={tAx - 36} y={tAy - 6} size={12} fill={BLUE} anchor="end">V_A</L>
      <Dot cx={tAx} cy={tAy} r={4} fill={BLUE} />
      {/* V_B from pole */}
      <Wire d={`M${px} ${py} L${tBx} ${tBy}`} stroke={AMBER} width={2.5} marker="url(#komArrA)" />
      <L x={tBx + 22} y={tBy - 16} size={12} fill={AMBER} anchor="start">V_B</L>
      <Dot cx={tBx} cy={tBy} r={4} fill={AMBER} />
      {/* closing side — relative velocity */}
      <Wire d={`M${tAx} ${tAy} L${tBx} ${tBy}`} stroke={GREEN} width={2.5} marker="url(#komArrG)" className="komm-traverse" />
      <L x={(tAx + tBx) / 2 + 11} y={(tAy + tBy) / 2 - 32} size={12} fill={GREEN}>V_BA</L>
      {/* perpendicularity note */}
      <L x={680} y={240} size={11} fill={TEAL} anchor="start">⊥ to AB</L>

      {/* ── Arithmetic strip ── */}
      <Wire d="M80 400 L440 400" stroke={MUTED} width={1.5} dash="4 3" />
      <L x={260} y={390} size={11} fill={MUTED}>Vector arithmetic</L>
      {/* head-to-tail addition */}
      <Wire d="M100 440 L170 410" stroke={BLUE} width={2} marker="url(#komArrB)" />
      <Wire d="M170 410 L250 430" stroke={GREEN} width={2} marker="url(#komArrG)" />
      <Wire d="M100 440 L250 430" stroke={AMBER} width={2} dash="5 3" marker="url(#komArrA)" />
      <L x={175} y={462} size={10} fill={N}>V_A + V_BA = V_B</L>
      {/* subtraction by reversing */}
      <Wire d="M320 440 L390 410" stroke={AMBER} width={2} marker="url(#komArrA)" />
      <Wire d="M390 410 L310 420" stroke={RED} width={2} marker="url(#komArrR)" />
      <L x={350} y={462} size={10} fill={N}>V_B − V_A = V_BA</L>
    </Scene>
  )
}

/* Unit 2 — rigid-link-relative-velocity-perpendicular */
export function M2RigidLinkPerpScene() {
  /* single link with A, B; correct perpendicular + ghosted wrong version */
  const ax = 120, ay = 260, bx = 350, by = 180
  /* link angle ≈ atan2(-80, 230) */
  const dx = bx - ax, dy = by - ay
  const linkLen = Math.sqrt(dx * dx + dy * dy)
  /* perpendicular direction to AB (rotated 90° CCW): (-dy, dx) normalised */
  const pnx = -dy / linkLen, pny = dx / linkLen
  const vMag = 70
  return (
    <Scene caption="Rigid-link relative velocity is always perpendicular to the line joining the points">
      {/* link body */}
      <Wire d={`M${ax} ${ay} L${bx} ${by}`} stroke={N} width={3.5} />
      {/* dimension line */}
      <Wire d={`M${ax + 14} ${ay + 6} L${bx - 14} ${by + 6}`} stroke={MUTED} width={1.5} dash="5 3" />
      <L x={(ax + bx) / 2} y={(ay + by) / 2 + 26} size={11} fill={MUTED}>ℓ (constant)</L>
      {/* points */}
      <Dot cx={ax} cy={ay} r={6} fill={BLUE} />
      <Dot cx={bx} cy={by} r={6} fill={AMBER} />
      <L x={ax - 18} y={ay + 6} size={14} fill={BLUE}>A</L>
      <L x={bx + 16} y={by - 4} size={14} fill={AMBER}>B</L>
      {/* correct perpendicular relative velocity from B */}
      <Wire
        d={`M${bx} ${by} L${bx + pnx * vMag} ${by + pny * vMag}`}
        stroke={GREEN} width={2.8} marker="url(#komArrG)" className="komm-pulse"
      />
      <L x={bx + pnx * vMag + 14} y={by + pny * vMag} size={12} fill={GREEN}>V_BA</L>
      {/* right-angle marker */}
      <Wire d={`M${bx + dx / linkLen * 14} ${by + dy / linkLen * 14} L${bx + dx / linkLen * 14 + pnx * 14} ${by + dy / linkLen * 14 + pny * 14} L${bx + pnx * 14} ${by + pny * 14}`} stroke={GREEN} width={1.5} />

      {/* ── Ghosted wrong version ── */}
      <g opacity={0.35}>
        <Wire d={`M${bx} ${by} L${bx + dx / linkLen * 60} ${by + dy / linkLen * 60}`} stroke={RED} width={2.4} marker="url(#komArrR)" />
        <L x={bx + dx / linkLen * 64 + 8} y={by + dy / linkLen * 64} size={11} fill={RED}>✗ along AB</L>
      </g>
      {/* inset: link stretching */}
      <Card x={490} y={50} w={200} h={105} title="If component along AB" accent={RED}
        lines={['Link stretches or', 'compresses — violates', 'rigid body constraint']} linesY={50} lineH={18}
        foot="✗ REJECTED" footTone={RED} />

      {/* ── Magnitude derivation ── */}
      <Card x={490} y={180} w={200} h={120} title="Magnitude" accent={GREEN}>
        <L x={100} y={55} size={12} fill={N}>Small rotation δθ</L>
        <L x={100} y={78} size={12} fill={N}>Arc = ℓ · δθ</L>
        <L x={100} y={101} size={12} fill={GREEN}>|V_BA| = ω · ℓ</L>
      </Card>

      {/* rotation arc indicator */}
      <Wire d={`M${ax + 60} ${ay - 40} A 50 50 0 0 1 ${ax + 90} ${ay - 60}`} stroke={TEAL} width={2} marker="url(#komArrT)" />
      <L x={ax + 100} y={ay - 64} size={11} fill={TEAL}>δθ</L>
    </Scene>
  )
}

/* Unit 3 — velocity-polygon-construction-steps */
export function M2VelPolygonScene() {
  /* four-bar left, velocity polygon right with numbered steps */
  /* mechanism joints */
  const O1 = [60, 360], A = [130, 270], B = [330, 230], O2 = [380, 360]
  /* polygon pole */
  const P = [590, 380]
  /* velocity tips */
  const a = [590, 270]  /* V_A from pole, perpendicular to crank */
  const b = [720, 310]  /* V_B from pole, perpendicular to output */
  return (
    <Scene caption="Velocity polygon — construction in four numbered steps">
      {/* ground */}
      <Wire d="M40 360 L400 360" stroke={MUTED} width={2} dash="6 4" />
      {/* mechanism links */}
      <Wire d={`M${O1[0]} ${O1[1]} L${A[0]} ${A[1]}`} stroke={ROSE} width={3} />
      <Wire d={`M${A[0]} ${A[1]} L${B[0]} ${B[1]}`} stroke={BLUE} width={3} />
      <Wire d={`M${B[0]} ${B[1]} L${O2[0]} ${O2[1]}`} stroke={PURP} width={3} />
      {/* step numbers on mechanism */}
      <Dot cx={O1[0]} cy={O1[1]} r={6} fill={MUTED} />
      <Dot cx={O2[0]} cy={O2[1]} r={6} fill={MUTED} />
      <Dot cx={A[0]} cy={A[1]} r={5} fill={ROSE} />
      <Dot cx={B[0]} cy={B[1]} r={5} fill={PURP} />
      <L x={O1[0]} y={O1[1] + 22} size={12} fill={MUTED}>O₁</L>
      <L x={O2[0]} y={O2[1] + 22} size={12} fill={MUTED}>O₂</L>
      <L x={A[0] - 18} y={A[1] - 10} size={13} fill={ROSE}>A</L>
      <L x={B[0] + 16} y={B[1] - 10} size={13} fill={PURP}>B</L>
      {/* step badges on links */}
      <circle cx={95} cy={315} r={11} fill={ROSE} />
      <L x={95} y={320} size={11} fill={WHITE}>1</L>
      <circle cx={230} cy={240} r={11} fill={BLUE} />
      <L x={230} y={245} size={11} fill={WHITE}>2</L>
      <circle cx={355} cy={295} r={11} fill={PURP} />
      <L x={355} y={300} size={11} fill={WHITE}>3</L>

      {/* ── Vector space ── */}
      <Dot cx={P[0]} cy={P[1]} r={5} fill={N} />
      <L x={P[0]} y={P[1] + 22} size={12} fill={MUTED}>o (pole)</L>
      {/* step 1: V_A from pole */}
      <Wire d={`M${P[0]} ${P[1]} L${a[0]} ${a[1]}`} stroke={ROSE} width={2.5} marker="url(#komArrRo)" className="komm-traverse" />
      <L x={a[0] - 18} y={a[1] - 10} size={12} fill={ROSE}>a</L>
      <Dot cx={a[0]} cy={a[1]} r={4} fill={ROSE} />
      {/* step 2: coupler direction from a */}
      <Wire d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`} stroke={BLUE} width={2.2} dash="6 4" />
      <L x={(a[0] + b[0]) / 2 + 8} y={(a[1] + b[1]) / 2 - 14} size={11} fill={BLUE}>⊥ coupler</L>
      {/* step 3: output direction from pole */}
      <Wire d={`M${P[0]} ${P[1]} L${b[0]} ${b[1]}`} stroke={PURP} width={2.2} dash="6 4" />
      <L x={(P[0] + b[0]) / 2 + 18} y={(P[1] + b[1]) / 2 + 6} size={11} fill={PURP}>⊥ output</L>
      {/* step 4: intersection */}
      <Dot cx={b[0]} cy={b[1]} r={7} fill={WHITE} stroke={GREEN} />
      <L x={b[0] + 14} y={b[1] - 8} size={12} fill={GREEN}>b ✓</L>
      <circle cx={b[0]} cy={b[1]} r={11} fill="none" stroke={GREEN} strokeWidth={2} className="komm-wave" />

      {/* scale bar */}
      <Wire d="M560 430 L740 430" stroke={MUTED} width={2} />
      <Wire d="M560 425 L560 435" stroke={MUTED} width={2} />
      <Wire d="M740 425 L740 435" stroke={MUTED} width={2} />
      <L x={650} y={450} size={11} fill={MUTED}>scale: 1 cm = ___ m/s</L>

      {/* step legend */}
      <L x={60} y={420} size={11} fill={ROSE} anchor="start">❶ V_A ⊥ crank</L>
      <L x={60} y={438} size={11} fill={BLUE} anchor="start">❷ V_BA direction from a</L>
      <L x={60} y={456} size={11} fill={PURP} anchor="start">❸ V_B direction from o</L>
      <L x={60} y={474} size={11} fill={GREEN} anchor="start">❹ Intersection → b</L>
    </Scene>
  )
}

/* Unit 4 — velocity-image-similar-triangle */
export function M2VelImageScene() {
  /* ternary coupler triangle on left, velocity image on right */
  /* mechanism triangle ABC */
  const Ax = 80, Ay = 300, Bx = 280, By = 200, Cx = 200, Cy = 120
  /* velocity image abc (rotated 90° + scaled) */
  const ax = 540, ay = 360, bx = 680, by = 300, cx = 620, cy = 220
  return (
    <Scene caption="Velocity image — the polygon triangle is similar to the link triangle">
      {/* link triangle */}
      <Wire d={`M${Ax} ${Ay} L${Bx} ${By} L${Cx} ${Cy} Z`} stroke={N} width={3} />
      <Dot cx={Ax} cy={Ay} r={5} fill={BLUE} />
      <Dot cx={Bx} cy={By} r={5} fill={AMBER} />
      <Dot cx={Cx} cy={Cy} r={5} fill={GREEN} />
      <L x={Ax - 16} y={Ay + 18} size={14} fill={BLUE}>A</L>
      <L x={Bx + 16} y={By - 6} size={14} fill={AMBER}>B</L>
      <L x={Cx - 4} y={Cy - 14} size={14} fill={GREEN}>C</L>
      {/* side marks */}
      <L x={(Ax + Bx) / 2 - 18} y={(Ay + By) / 2 + 18} size={10} fill={MUTED}>≈</L>
      <L x={(Bx + Cx) / 2 + 14} y={(By + Cy) / 2 - 4} size={10} fill={MUTED}>≈</L>
      <L x={(Cx + Ax) / 2 - 18} y={(Cy + Ay) / 2} size={10} fill={MUTED}>≈</L>

      {/* velocity image triangle */}
      <Wire d={`M${ax} ${ay} L${bx} ${by}`} stroke={BLUE} width={2.5} />
      <Wire d={`M${bx} ${by} L${cx} ${cy}`} stroke={AMBER} width={2.5} />
      <Wire d={`M${ax} ${ay} L${cx} ${cy}`} stroke={MUTED} width={2} dash="6 4" />
      <Dot cx={ax} cy={ay} r={5} fill={BLUE} />
      <Dot cx={bx} cy={by} r={5} fill={AMBER} />
      <L x={ax - 14} y={ay + 18} size={14} fill={BLUE}>a</L>
      <L x={bx + 14} y={by - 6} size={14} fill={AMBER}>b</L>
      {/* c constructed via arcs */}
      <Wire d={`M${ax} ${ay} A 160 160 0 0 0 ${cx} ${cy}`} stroke={TEAL} width={1.5} dash="5 3" />
      <Wire d={`M${bx} ${by} A 120 120 0 0 1 ${cx} ${cy}`} stroke={TEAL} width={1.5} dash="5 3" />
      <Dot cx={cx} cy={cy} r={6} fill={GREEN} className="komm-wave" />
      <L x={cx + 16} y={cy - 6} size={14} fill={GREEN}>c</L>

      {/* similarity annotation */}
      <L x={400} y={60} size={13} fill={TEAL}>Similar triangles</L>
      <L x={400} y={80} size={11} fill={MUTED}>Image rotated 90° in sense of ω</L>
      <L x={400} y={98} size={11} fill={MUTED}>Scale = ω (angular velocity)</L>
      {/* rotation arrow */}
      <Wire d="M370 116 A 20 20 0 0 1 350 136" stroke={TEAL} width={2} marker="url(#komArrT)" />
      <L x={336} y={130} size={10} fill={TEAL}>90°</L>

      {/* caution panel — wrong sense */}
      <Card x={490} y={390} w={200} h={90} title="⚠ Wrong sense" accent={RED}
        lines={['Mirrored image ≠ image', 'Rotation direction matters!']} linesY={52} lineH={18}
        foot="✗ ERROR" footTone={RED} />
    </Scene>
  )
}

/* Unit 5 — rubbing-velocity-at-a-pin */
export function M2RubbingVelScene() {
  /* magnified pin section with two cases side by side */
  /* pin centre */
  const pcx = 200, pcy = 200, pr = 50
  return (
    <Scene caption="Rubbing velocity at a pin joint — opposite vs same sense angular velocities">
      {/* ── Magnified pin section ── */}
      <L x={200} y={50} size={14} fill={N}>Pin joint — magnified section</L>
      {/* pin circle */}
      <circle cx={pcx} cy={pcy} r={pr} fill={SKY} stroke={N} strokeWidth={2.5} />
      <Dot cx={pcx} cy={pcy} r={4} fill={N} />
      {/* dimension: pin radius */}
      <Wire d={`M${pcx} ${pcy} L${pcx + pr} ${pcy}`} stroke={MUTED} width={1.5} dash="4 3" />
      <L x={pcx + pr / 2} y={pcy - 10} size={11} fill={MUTED}>r_p</L>
      {/* link 1 angular velocity — CCW */}
      <Wire d={`M${pcx - 70} ${pcy - 30} A 40 40 0 0 1 ${pcx - 70} ${pcy + 30}`} stroke={BLUE} width={2.2} marker="url(#komArrB)" />
      <L x={pcx - 90} y={pcy} size={12} fill={BLUE}>ω₁</L>
      {/* link 2 angular velocity — CW */}
      <Wire d={`M${pcx + 70} ${pcy + 30} A 40 40 0 0 1 ${pcx + 70} ${pcy - 30}`} stroke={AMBER} width={2.2} marker="url(#komArrA)" />
      <L x={pcx + 90} y={pcy} size={12} fill={AMBER}>ω₂</L>

      {/* ── Case 1: Opposite senses ── */}
      <Card x={40} y={290} w={190} h={130} title="Opposite senses" accent={RED}>
        <L x={95} y={56} size={11} fill={N}>Rubbing arrows ADD</L>
        <L x={95} y={78} size={12} fill={RED}>V_r = r_p (ω₁ + ω₂)</L>
        {/* rubbing bar — long */}
        <rect x={30} y={92} width={130} height={14} rx={4} fill={RED} opacity={0.25} />
        <rect x={30} y={92} width={130} height={14} rx={4} fill="none" stroke={RED} strokeWidth={1.5} />
        <L x={95} y={120} size={10} fill={RED}>longer bar</L>
      </Card>

      {/* ── Case 2: Same sense ── */}
      <Card x={260} y={290} w={190} h={130} title="Same sense" accent={GREEN}>
        <L x={95} y={56} size={11} fill={N}>Rubbing arrows SUBTRACT</L>
        <L x={95} y={78} size={12} fill={GREEN}>V_r = r_p |ω₁ − ω₂|</L>
        {/* rubbing bar — short */}
        <rect x={55} y={92} width={80} height={14} rx={4} fill={GREEN} opacity={0.25} />
        <rect x={55} y={92} width={80} height={14} rx={4} fill="none" stroke={GREEN} strokeWidth={1.5} />
        <L x={95} y={120} size={10} fill={GREEN}>shorter bar</L>
      </Card>

      {/* ── Polygon extract ── */}
      <Card x={520} y={50} w={340} h={190} title="Angular velocity from polygon" accent={BLUE}>
        {/* relative velocity segment */}
        <Wire d="M40 75 L200 75" stroke={BLUE} width={2.5} marker="url(#komArrB)" />
        <L x={120} y={65} size={11} fill={BLUE}>V_BA (from polygon)</L>
        {/* divide by length */}
        <Wire d="M220 75 L260 75" stroke={MUTED} width={1.5} />
        <L x={240} y={65} size={14} fill={N}>÷</L>
        {/* link length */}
        <Wire d="M270 75 L310 75" stroke={N} width={2.5} />
        <L x={290} y={65} size={11} fill={N}>ℓ_AB</L>
        {/* result */}
        <L x={170} y={110} size={13} fill={PURP}>ω = V_BA / ℓ_AB</L>
        {/* sense indicator */}
        <Wire d="M100 135 A 25 25 0 0 1 150 135" stroke={PURP} width={2} marker="url(#komArrP)" />
        <L x={125} y={160} size={11} fill={PURP}>sense of ω</L>
      </Card>

      {/* comparison annotation */}
      <L x={660} y={290} size={13} fill={TEAL}>Relative angular velocity</L>
      <L x={660} y={310} size={12} fill={N}>determines pin wear rate</L>
      <Wire d="M560 340 L760 340" stroke={MUTED} width={1} dash="4 3" />
      <L x={660} y={360} size={11} fill={MUTED}>Opposite sense → max rubbing</L>
      <L x={660} y={378} size={11} fill={MUTED}>Same sense → reduced rubbing</L>
    </Scene>
  )
}

/* Unit 6 — four-bar-and-slider-crank-side-by-side */
export function M2FourBarSliderScene() {
  /* two mechanisms stacked, each with its polygon; dead-centre inset at bottom */
  return (
    <Scene caption="Four-bar vs slider-crank — identical construction, different output direction">
      {/* ── Four-bar (top) ── */}
      <L x={20} y={40} size={12} fill={MUTED} anchor="start">FOUR-BAR</L>
      <Wire d="M40 170 L220 170" stroke={MUTED} width={2} dash="6 4" />
      {/* links */}
      <Wire d="M60 170 L110 100" stroke={ROSE} width={3} />
      <Wire d="M110 100 L260 80" stroke={BLUE} width={3} />
      <Wire d="M260 80 L300 170" stroke={PURP} width={3} />
      <Dot cx={60} cy={170} r={5} fill={MUTED} />
      <Dot cx={300} cy={170} r={5} fill={MUTED} />
      <Dot cx={110} cy={100} r={4} fill={ROSE} />
      <Dot cx={260} cy={80} r={4} fill={PURP} />
      <L x={110} y={88} size={11} fill={ROSE}>A</L>
      <L x={260} y={68} size={11} fill={PURP}>B</L>
      {/* right angle marker at output */}
      <Wire d="M278 150 L290 142 L298 154" stroke={PURP} width={1.5} />
      <L x={310} y={130} size={10} fill={PURP} anchor="start">V_B ⊥ output</L>
      {/* polygon */}
      <Dot cx={430} cy={170} r={4} fill={N} />
      <L x={430} y={186} size={10} fill={MUTED}>o</L>
      <Wire d="M430 170 L430 100" stroke={ROSE} width={2.2} marker="url(#komArrRo)" />
      <L x={420} y={92} size={10} fill={ROSE} anchor="end">a</L>
      <Wire d="M430 100 L530 120" stroke={BLUE} width={2} dash="5 3" />
      <Wire d="M430 170 L530 120" stroke={PURP} width={2} dash="5 3" />
      <Dot cx={530} cy={120} r={5} fill={GREEN} className="komm-wave" />
      <L x={540} y={116} size={10} fill={GREEN} anchor="start">b</L>

      {/* ── Slider-crank (middle) ── */}
      <L x={20} y={210} size={12} fill={MUTED} anchor="start">SLIDER-CRANK</L>
      <Wire d="M40 340 L350 340" stroke={MUTED} width={2} dash="6 4" />
      {/* links */}
      <Wire d="M60 340 L120 270" stroke={ROSE} width={3} />
      <Wire d="M120 270 L300 340" stroke={BLUE} width={3} />
      {/* slider block */}
      <rect x={285} y={328} width={30} height={24} rx={4} fill={WHITE} stroke={AMBER} strokeWidth={2.5} />
      <Dot cx={60} cy={340} r={5} fill={MUTED} />
      <Dot cx={120} cy={270} r={4} fill={ROSE} />
      <L x={120} y={258} size={11} fill={ROSE}>A</L>
      <L x={300} y={318} size={11} fill={AMBER}>B</L>
      {/* parallel marker at slide */}
      <Wire d="M330 340 L370 340" stroke={AMBER} width={2} marker="url(#komArrA)" />
      <L x={390} y={336} size={10} fill={AMBER} anchor="start">V_B ∥ slide</L>
      {/* polygon */}
      <Dot cx={430} cy={340} r={4} fill={N} />
      <L x={430} y={356} size={10} fill={MUTED}>o</L>
      <Wire d="M430 340 L430 270" stroke={ROSE} width={2.2} marker="url(#komArrRo)" />
      <L x={420} y={262} size={10} fill={ROSE} anchor="end">a</L>
      <Wire d="M430 270 L530 310" stroke={BLUE} width={2} dash="5 3" />
      <Wire d="M430 340 L530 340" stroke={AMBER} width={2} dash="5 3" />
      <Wire d="M530 310 L530 340" stroke={MUTED} width={1.5} dash="3 3" />
      <Dot cx={530} cy={310} r={5} fill={GREEN} className="komm-wave" />
      <L x={540} y={306} size={10} fill={GREEN} anchor="start">b</L>

      {/* ── Dead centres ── */}
      <Card x={620} y={50} w={250} h={150} title="Slider-crank dead centres" accent={AMBER}>
        {/* TDC sketch */}
        <Wire d="M30 60 L90 60" stroke={ROSE} width={2.5} />
        <Wire d="M90 60 L180 60" stroke={BLUE} width={2.5} />
        <L x={105} y={80} size={10} fill={AMBER}>TDC: V_B = 0</L>
        {/* BDC sketch */}
        <Wire d="M30 110 L90 110" stroke={ROSE} width={2.5} />
        <Wire d="M90 110 L30 110" stroke={BLUE} width={2.5} dash="4 3" />
        <L x={105} y={130} size={10} fill={AMBER}>BDC: V_B = 0</L>
      </Card>
      <L x={745} y={230} size={11} fill={MUTED}>Polygon degenerates</L>
      <L x={745} y={248} size={11} fill={MUTED}>to a single line</L>
    </Scene>
  )
}

/* Unit 7 — coincident-points-in-a-slot */
export function M2CoincidentPointsScene() {
  /* crank-and-slotted-lever with magnified callout */
  return (
    <Scene caption="Apparent velocity — coincident points on different links move along the slot">
      {/* mechanism: crank + slotted lever */}
      {/* crank pivot */}
      <Dot cx={100} cy={340} r={6} fill={MUTED} />
      <L x={100} y={360} size={11} fill={MUTED}>O₁</L>
      {/* crank */}
      <Wire d="M100 340 L180 270" stroke={ROSE} width={3} />
      <Dot cx={180} cy={270} r={5} fill={ROSE} />
      {/* lever pivot */}
      <Dot cx={350} cy={400} r={6} fill={MUTED} />
      <L x={350} y={420} size={11} fill={MUTED}>O₂</L>
      {/* lever (slotted) */}
      <Wire d="M350 400 L170 190" stroke={PURP} width={4} />
      <Wire d="M350 400 L170 190" stroke={CREAM} width={2} />
      {/* slider block on lever at coincident point */}
      <rect x={166} y={256} width={28} height={28} rx={4} fill={WHITE} stroke={AMBER} strokeWidth={2.5} className="komm-shift" />

      {/* ── Magnified callout ── */}
      <Wire d="M210 270 L310 180" stroke={MUTED} width={1} dash="3 3" />
      <Card x={310} y={40} w={250} h={170} title="Coincident points (magnified)" accent={PURP}>
        {/* two points separated for clarity */}
        <Dot cx={80} cy={75} r={6} fill={AMBER} />
        <L x={100} y={72} size={11} fill={AMBER} anchor="start">P on block</L>
        <Dot cx={80} cy={100} r={6} fill={PURP} />
        <L x={100} y={97} size={11} fill={PURP} anchor="start">P' on lever</L>
        <L x={125} y={118} size={10} fill={MUTED}>Same position, this instant</L>
        {/* slot direction */}
        <Wire d="M40 140 L210 140" stroke={TEAL} width={2} marker="url(#komArrT)" />
        <L x={125} y={155} size={11} fill={TEAL}>Apparent V along slot</L>
      </Card>

      {/* ── Contrast inset: rigid link ── */}
      <Card x={610} y={40} w={240} h={120} title="Rigid link contrast" accent={BLUE}>
        <Wire d="M40 70 L190 70" stroke={BLUE} width={2.5} />
        <Dot cx={40} cy={70} r={4} fill={BLUE} />
        <Dot cx={190} cy={70} r={4} fill={BLUE} />
        <Wire d="M190 70 L190 40" stroke={GREEN} width={2} marker="url(#komArrG)" />
        <L x={120} y={100} size={11} fill={BLUE}>V_rel ⊥ link</L>
      </Card>
      <L x={730} y={180} size={11} fill={RED}>Different rules!</L>

      {/* polygon with apparent velocity */}
      <L x={620} y={230} size={12} fill={N}>Velocity polygon</L>
      <Dot cx={620} cy={280} r={4} fill={N} />
      <L x={620} y={300} size={10} fill={MUTED}>o</L>
      <Wire d="M620 280 L620 210" stroke={ROSE} width={2.2} marker="url(#komArrRo)" />
      <L x={610} y={206} size={10} fill={ROSE} anchor="end">p</L>
      {/* apparent velocity direction */}
      <Wire d="M620 210 L740 240" stroke={TEAL} width={2.2} dash="5 3" marker="url(#komArrT)" className="komm-traverse" />
      <L x={760} y={238} size={10} fill={TEAL} anchor="start">along slot</L>
      {/* lever point velocity direction */}
      <Wire d="M620 280 L740 240" stroke={PURP} width={2} dash="5 3" />
      <Dot cx={740} cy={240} r={5} fill={GREEN} className="komm-wave" />
      <L x={750} y={256} size={10} fill={GREEN} anchor="start">p'</L>
    </Scene>
  )
}

/* Unit 8 — differentiating-loop-closure-to-velocity */
export function M2LoopClosureScene() {
  /* three-row derivation with comparison panel */
  return (
    <Scene caption="Analytical velocity — differentiate the loop-closure equation">
      {/* Row 1: Loop-closure */}
      <Card x={30} y={30} w={520} h={62} title="Loop-closure equation" accent={BLUE}>
        <M x={260} y={52} size={14} fill={N}>
          r₂e^(iθ₂) + r₃e^(iθ₃) − r₄e^(iθ₄) − r₁ = 0
        </M>
      </Card>
      <L x={570} y={50} size={11} fill={MUTED} anchor="start">r₂, r₃, r₄ = const</L>

      {/* Arrow down */}
      <Wire d="M290 92 L290 116" stroke={AMBER} width={2.5} marker="url(#komArrA)" />
      <L x={310} y={110} size={11} fill={AMBER} anchor="start">d/dt</L>

      {/* Row 2: Differentiated */}
      <Card x={30} y={120} w={520} h={80} title="Differentiated (ṙ = 0)" accent={AMBER}>
        <M x={260} y={56} size={13} fill={N}>
          ir₂ω₂e^(iθ₂) + ir₃ω₃e^(iθ₃) − ir₄ω₄e^(iθ₄) = 0
        </M>
        <L x={260} y={72} size={10} fill={AMBER}>
          each exponential → factor of iω (angular velocity)
        </L>
      </Card>

      {/* Arrow down */}
      <Wire d="M290 200 L290 224" stroke={GREEN} width={2.5} marker="url(#komArrG)" />
      <L x={310} y={218} size={11} fill={GREEN} anchor="start">Re / Im</L>

      {/* Row 3: Two equations */}
      <Card x={30} y={228} w={250} h={80} title="Real part" accent={GREEN}>
        <M x={125} y={56} size={12} fill={N}>
          −r₂ω₂sinθ₂ − r₃ω₃sinθ₃
        </M>
        <M x={125} y={72} size={12} fill={N}>+ r₄ω₄sinθ₄ = 0</M>
      </Card>
      <Card x={300} y={228} w={250} h={80} title="Imaginary part" accent={TEAL}>
        <M x={125} y={56} size={12} fill={N}>
          r₂ω₂cosθ₂ + r₃ω₃cosθ₃
        </M>
        <M x={125} y={72} size={12} fill={N}>− r₄ω₄cosθ₄ = 0</M>
      </Card>

      {/* unknowns boxed */}
      <rect x={340} y={272} width={30} height={18} rx={3} fill="none" stroke={RED} strokeWidth={2} />
      <rect x={80} y={272} width={30} height={18} rx={3} fill="none" stroke={RED} strokeWidth={2} />
      <L x={400} y={330} size={11} fill={RED} anchor="start">ω₃, ω₄ = unknowns</L>

      {/* ── Comparison panel ── */}
      <Card x={600} y={120} w={270} h={200} title="Graphical vs Analytical" accent={PURP}>
        <L x={135} y={56} size={12} fill={BLUE}>Graphical polygon</L>
        <L x={135} y={74} size={10} fill={MUTED}>Drawing error at dead centres</L>
        <L x={135} y={92} size={10} fill={MUTED}>Ill-conditioned intersection</L>
        <Wire d="M20 105 L250 105" stroke={MUTED} width={1} dash="4 3" />
        <L x={135} y={122} size={12} fill={GREEN}>Analytical (this method)</L>
        <L x={135} y={140} size={10} fill={GREEN}>Exact — no drawing error</L>
        <L x={135} y={156} size={10} fill={GREEN}>Works at dead centres</L>
        <L x={135} y={172} size={10} fill={GREEN}>Programmable: once for all θ₂</L>
      </Card>

      {/* dead centre diagram */}
      <Wire d="M620 350 L780 350" stroke={MUTED} width={2} />
      <Wire d="M620 350 L720 350" stroke={ROSE} width={2.5} />
      <Wire d="M720 350 L780 350" stroke={BLUE} width={2.5} />
      <L x={700} y={340} size={10} fill={MUTED}>Dead centre</L>
      <L x={700} y={380} size={10} fill={GREEN}>Algebra unaffected ✓</L>
    </Scene>
  )
}

/* Unit 9 — instant-centre-definition-and-count */
export function M2InstantCentreScene() {
  /* moving link with converging velocity vectors + four-bar with 6 centres + counting panel */
  return (
    <Scene caption="Instantaneous centres — every pair of links shares one point of zero relative velocity">
      {/* ── Moving link with velocity vectors ── */}
      <Wire d="M60 260 L240 200" stroke={N} width={3.5} />
      <Dot cx={60} cy={260} r={4} fill={BLUE} />
      <Dot cx={150} cy={230} r={4} fill={BLUE} />
      <Dot cx={240} cy={200} r={4} fill={BLUE} />
      {/* velocity arrows (all perp to lines to IC at ~ (180, 100)) */}
      <Wire d="M60 260 L30 220" stroke={BLUE} width={2} marker="url(#komArrB)" />
      <Wire d="M150 230 L134 186" stroke={BLUE} width={2} marker="url(#komArrB)" />
      <Wire d="M240 200 L230 150" stroke={BLUE} width={2} marker="url(#komArrB)" />
      {/* construction lines converging on IC */}
      <Wire d="M60 260 L180 100" stroke={MUTED} width={1} dash="4 3" />
      <Wire d="M150 230 L180 100" stroke={MUTED} width={1} dash="4 3" />
      <Wire d="M240 200 L180 100" stroke={MUTED} width={1} dash="4 3" />
      {/* IC point */}
      <Dot cx={180} cy={100} r={7} fill={WHITE} stroke={RED} />
      <circle cx={180} cy={100} r={12} fill="none" stroke={RED} strokeWidth={1.5} className="komm-pulse" />
      <L x={180} y={80} size={12} fill={RED}>I (zero velocity)</L>

      {/* ── Four-bar with 6 centres ── */}
      <Wire d="M380 380 L620 380" stroke={MUTED} width={2} dash="6 4" />
      {/* links */}
      <Wire d="M400 380 L450 300" stroke={ROSE} width={2.5} />
      <Wire d="M450 300 L580 280" stroke={BLUE} width={2.5} />
      <Wire d="M580 280 L600 380" stroke={PURP} width={2.5} />
      {/* four obvious pin centres */}
      <Dot cx={400} cy={380} r={6} fill={TEAL} />
      <Dot cx={450} cy={300} r={6} fill={TEAL} />
      <Dot cx={580} cy={280} r={6} fill={TEAL} />
      <Dot cx={600} cy={380} r={6} fill={TEAL} />
      <L x={400} y={400} size={10} fill={TEAL}>I₁₂</L>
      <L x={450} y={290} size={10} fill={TEAL}>I₂₃</L>
      <L x={580} y={268} size={10} fill={TEAL}>I₃₄</L>
      <L x={600} y={400} size={10} fill={TEAL}>I₁₄</L>
      {/* two remaining centres (found by Kennedy) */}
      <Dot cx={490} cy={400} r={6} fill={AMBER} className="komm-wave" />
      <L x={490} y={418} size={10} fill={AMBER}>I₂₄</L>
      <Dot cx={520} cy={210} r={6} fill={AMBER} className="komm-wave" />
      <L x={520} y={200} size={10} fill={AMBER}>I₁₃</L>

      {/* legend */}
      <Dot cx={380} y={238} r={4} fill={TEAL} />
      <L x={395} y={242} size={10} fill={TEAL} anchor="start">Pin joints (obvious)</L>
      <Dot cx={380} y={256} r={4} fill={AMBER} />
      <L x={395} y={260} size={10} fill={AMBER} anchor="start">Found by theorem</L>

      {/* ── Counting formula panel ── */}
      <Panel x={660} y={40} w={220} title="Number of I-centres"
        rows={[
          ['n = 4 links', 'C(4,2) = 6', BLUE],
          ['n = 5 links', 'C(5,2) = 10', PURP],
          ['n = 6 links', 'C(6,2) = 15', TEAL],
        ]} accent={N} />
      <L x={770} y={192} size={12} fill={MUTED}>n(n−1)/2</L>
    </Scene>
  )
}

/* Unit 10 — kennedy-theorem-two-lines-intersect */
export function M2KennedyScene() {
  /* four-bar + Kennedy circle + construction lines */
  return (
    <Scene caption="Aronhold-Kennedy theorem — three centres of three bodies are always collinear">
      {/* ── Four-bar mechanism ── */}
      <Wire d="M60 350 L340 350" stroke={MUTED} width={2} dash="6 4" />
      <Wire d="M80 350 L140 260" stroke={ROSE} width={3} />
      <Wire d="M140 260 L290 240" stroke={BLUE} width={3} />
      <Wire d="M290 240 L320 350" stroke={PURP} width={3} />
      {/* pin centres */}
      <Dot cx={80} cy={350} r={5} fill={TEAL} />
      <Dot cx={140} cy={260} r={5} fill={TEAL} />
      <Dot cx={290} cy={240} r={5} fill={TEAL} />
      <Dot cx={320} cy={350} r={5} fill={TEAL} />
      <L x={80} y={368} size={10} fill={TEAL}>I₁₂</L>
      <L x={140} y={250} size={10} fill={TEAL}>I₂₃</L>
      <L x={290} y={228} size={10} fill={TEAL}>I₃₄</L>
      <L x={320} y={368} size={10} fill={TEAL}>I₁₄</L>

      {/* construction line 1: through I₁₂ and I₂₃ (links 1,2,3) */}
      <Wire d="M80 350 L200 180" stroke={ROSE} width={1.8} dash="6 4" />
      <L x={115} y={280} size={10} fill={ROSE} anchor="start">line 1-2-3</L>

      {/* construction line 2: through I₁₄ and I₃₄ (links 1,3,4) */}
      <Wire d="M320 350 L200 180" stroke={PURP} width={1.8} dash="6 4" />
      <L x={285} y={280} size={10} fill={PURP} anchor="end">line 1-3-4</L>

      {/* intersection: I₁₃ */}
      <Dot cx={200} cy={180} r={7} fill={WHITE} stroke={GREEN} />
      <circle cx={200} cy={180} r={12} fill="none" stroke={GREEN} strokeWidth={2} className="komm-wave" />
      <L x={218} y={176} size={12} fill={GREEN} anchor="start">I₁₃</L>

      {/* ── Kennedy circle ── */}
      <circle cx={620} cy={240} r={110} fill="none" stroke={MUTED} strokeWidth={2} />
      <L x={620} y={115} size={13} fill={N}>Kennedy circle</L>
      {/* four numbered points on circle */}
      <Dot cx={534} cy={170} r={8} fill={TEAL} />
      <L x={518} y={166} size={12} fill={N} anchor="end">1</L>
      <Dot cx={706} cy={170} r={8} fill={TEAL} />
      <L x={724} y={166} size={12} fill={N} anchor="start">2</L>
      <Dot cx={710} cy={310} r={8} fill={TEAL} />
      <L x={728} y={314} size={12} fill={N} anchor="start">3</L>
      <Dot cx={534} cy={310} r={8} fill={TEAL} />
      <L x={516} y={314} size={12} fill={N} anchor="end">4</L>

      {/* chords = located centres */}
      <Wire d="M534 170 L706 170" stroke={TEAL} width={2} />
      <Wire d="M706 170 L710 310" stroke={TEAL} width={2} />
      <Wire d="M710 310 L534 310" stroke={TEAL} width={2} />
      <Wire d="M534 310 L534 170" stroke={TEAL} width={2} />
      {/* triangles used for construction (highlighted) */}
      <Wire d="M534 170 L706 170 L710 310 Z" stroke={ROSE} width={1.5} dash="4 3" />
      <Wire d="M534 170 L710 310 L534 310 Z" stroke={PURP} width={1.5} dash="4 3" />
      {/* last two chords */}
      <Wire d="M534 170 L710 310" stroke={GREEN} width={2.5} className="komm-traverse" />
      <Wire d="M706 170 L534 310" stroke={AMBER} width={2} />

      {/* step annotations */}
      <L x={620} y={390} size={11} fill={ROSE}>△ 1-2-3 → line through I₁₂, I₂₃</L>
      <L x={620} y={410} size={11} fill={PURP}>△ 1-3-4 → line through I₁₄, I₃₄</L>
      <L x={620} y={430} size={11} fill={GREEN}>Intersection = I₁₃ ✓</L>
    </Scene>
  )
}

/* Unit 11 — angular-velocity-ratio-from-common-centre */
export function M2AngVelRatioScene() {
  /* four-bar with I₂₄ on line of centres, distances dimensioned, ratio curve */
  return (
    <Scene caption="Angular velocity ratio — read the speed ratio from one common centre">
      {/* ── Mechanism ── */}
      <Wire d="M40 300 L400 300" stroke={MUTED} width={2} dash="6 4" />
      {/* four-bar */}
      <Wire d="M80 300 L140 210" stroke={ROSE} width={3} />
      <Wire d="M140 210 L300 200" stroke={BLUE} width={3} />
      <Wire d="M300 200 L360 300" stroke={PURP} width={3} />
      <Dot cx={80} cy={300} r={6} fill={MUTED} />
      <Dot cx={360} cy={300} r={6} fill={MUTED} />
      <Dot cx={140} cy={210} r={4} fill={ROSE} />
      <Dot cx={300} cy={200} r={4} fill={PURP} />
      <L x={80} y={318} size={11} fill={MUTED}>O₁</L>
      <L x={360} y={318} size={11} fill={MUTED}>O₂</L>

      {/* line of centres */}
      <Wire d="M80 300 L360 300" stroke={N} width={1.5} />
      {/* common centre I₂₄ on line of centres */}
      <Dot cx={230} cy={300} r={7} fill={AMBER} className="komm-shift" />
      <L x={230} y={282} size={12} fill={AMBER}>I₂₄</L>

      {/* distance dimensions */}
      <Wire d="M80 340 L230 340" stroke={BLUE} width={1.5} marker="url(#komArrB)" />
      <Wire d="M230 340 L80 340" stroke={BLUE} width={1.5} marker="url(#komArrB)" />
      <L x={155} y={358} size={11} fill={BLUE}>d₁</L>
      <Wire d="M230 340 L360 340" stroke={PURP} width={1.5} marker="url(#komArrP)" />
      <Wire d="M360 340 L230 340" stroke={PURP} width={1.5} marker="url(#komArrP)" />
      <L x={295} y={358} size={11} fill={PURP}>d₂</L>

      {/* ratio */}
      <L x={220} y={395} size={13} fill={N}>ω₄/ω₂ = d₁/d₂</L>
      <L x={220} y={415} size={11} fill={TEAL}>(inverse ratio of distances)</L>

      {/* ── Ratio vs crank angle curve ── */}
      <Axes x={480} y={440} w={370} h={280} xLabel="θ₂ (crank angle)" yLabel="ω₄/ω₂" />
      {/* three positions indicated */}
      <Dot cx={540} cy={440} r={4} fill={ROSE} />
      <Dot cx={620} cy={440} r={4} fill={ROSE} />
      <Dot cx={740} cy={440} r={4} fill={ROSE} />
      <L x={540} y={458} size={9} fill={ROSE}>pos 1</L>
      <L x={620} y={458} size={9} fill={ROSE}>pos 2</L>
      <L x={740} y={458} size={9} fill={ROSE}>pos 3</L>
      {/* ratio curve */}
      <Curve pts={[
        [490, 360], [520, 310], [560, 250], [600, 220],
        [640, 240], [680, 300], [720, 350], [760, 380],
        [800, 360], [840, 300]
      ]} stroke={AMBER} width={2.8} className="komm-traverse" />
      <L x={770} y={200} size={11} fill={AMBER}>ratio varies</L>
      <L x={770} y={218} size={11} fill={AMBER}>through cycle</L>

      {/* extremes annotation */}
      <Wire d="M600 220 L600 190" stroke={MUTED} width={1} dash="3 3" />
      <L x={600} y={184} size={10} fill={RED}>max</L>
    </Scene>
  )
}

/* Unit 12 — centrode-rolling-reproduction */
export function M2CentrodeScene() {
  /* coupler at multiple positions, fixed & moving centrode, rolling demo */
  return (
    <Scene caption="Centrodes — the locus of the instantaneous centre reproduces the motion by rolling">
      {/* ── Mechanism positions ── */}
      <L x={180} y={40} size={13} fill={N}>Four-bar at successive positions</L>
      {/* ground */}
      <Wire d="M30 310 L360 310" stroke={MUTED} width={2} dash="6 4" />
      <Dot cx={60} cy={310} r={5} fill={MUTED} />
      <Dot cx={320} cy={310} r={5} fill={MUTED} />
      {/* position 1 */}
      <g opacity={0.3}>
        <Wire d="M60 310 L100 240 L260 230 L320 310" stroke={N} width={2} />
      </g>
      {/* position 2 */}
      <g opacity={0.5}>
        <Wire d="M60 310 L120 230 L280 210 L320 310" stroke={N} width={2} />
      </g>
      {/* position 3 (current) */}
      <Wire d="M60 310 L130 220 L290 200 L320 310" stroke={N} width={3} />
      {/* IC marks at each position */}
      <Dot cx={150} cy={160} r={5} fill={RED} />
      <Dot cx={190} cy={140} r={5} fill={RED} />
      <Dot cx={220} cy={130} r={5} fill={RED} />

      {/* fixed centrode — smooth curve through IC positions */}
      <Curve pts={[
        [120, 190], [150, 160], [190, 140], [220, 130], [260, 140], [290, 170]
      ]} stroke={BLUE} width={2.8} />
      <L x={295} y={155} size={11} fill={BLUE} anchor="start">Fixed centrode</L>

      {/* moving centrode (attached to coupler) */}
      <Curve pts={[
        [130, 180], [158, 155], [192, 138], [220, 130], [250, 138], [270, 160]
      ]} stroke={AMBER} width={2.8} dash="6 3" />
      <L x={275} y={175} size={11} fill={AMBER} anchor="start">Moving centrode</L>

      {/* ── Rolling demonstration ── */}
      <L x={620} y={40} size={13} fill={N}>Rolling reproduction</L>
      {/* fixed centrode (copy) */}
      <Curve pts={[
        [510, 280], [560, 240], [620, 210], [680, 210], [740, 240], [790, 280]
      ]} stroke={BLUE} width={3} />
      <L x={650} y={300} size={11} fill={BLUE}>Fixed centrode</L>

      {/* moving centrode rolling on top */}
      <g className="komm-wrap">
        <Curve pts={[
          [530, 260], [570, 230], [620, 210], [670, 210], [720, 230], [750, 260]
        ]} stroke={AMBER} width={2.5} dash="5 3" />
      </g>
      <L x={650} y={186} size={11} fill={AMBER}>Moving centrode (rolls)</L>

      {/* contact point */}
      <Dot cx={620} cy={210} r={6} fill={RED} className="komm-pulse" />
      <L x={624} y={200} size={10} fill={RED} anchor="start">contact</L>

      {/* traced path from coupler point */}
      <Curve pts={[
        [540, 370], [580, 340], [620, 350], [660, 370], [700, 360], [740, 340]
      ]} stroke={GREEN} width={2.5} className="komm-traverse" />
      <L x={660} y={400} size={11} fill={GREEN}>Coupler-point path</L>

      {/* no-slip annotation */}
      <Card x={560} y={410} w={240} h={70} title="Key property" accent={TEAL}>
        <L x={120} y={50} size={11} fill={TEAL}>Rolling without slipping</L>
        <L x={120} y={65} size={10} fill={MUTED}>reproduces the exact motion</L>
      </Card>
    </Scene>
  )
}

/* Unit 13 — two-components-of-relative-acceleration */
export function M2AccelComponentsScene() {
  /* link with centripetal + tangential components, construction panel */
  const ax = 120, ay = 310, bx = 340, by = 200
  const dx = bx - ax, dy = by - ay
  const len = Math.sqrt(dx * dx + dy * dy)
  const ux = dx / len, uy = dy / len
  const px = -uy, py = ux  /* perpendicular (CCW) */
  return (
    <Scene caption="Acceleration components — centripetal along the link, tangential perpendicular">
      {/* link */}
      <Wire d={`M${ax} ${ay} L${bx} ${by}`} stroke={N} width={3.5} />
      <Dot cx={ax} cy={ay} r={6} fill={BLUE} />
      <Dot cx={bx} cy={by} r={6} fill={AMBER} />
      <L x={ax - 18} y={ay + 6} size={14} fill={BLUE}>A</L>
      <L x={bx + 16} y={by - 6} size={14} fill={AMBER}>B</L>

      {/* angular velocity + acceleration indicators */}
      <Wire d={`M${ax + 50} ${ay - 60} A 30 30 0 0 1 ${ax + 80} ${ay - 40}`} stroke={TEAL} width={2} marker="url(#komArrT)" />
      <L x={ax + 90} y={ay - 58} size={11} fill={TEAL}>ω</L>
      <Wire d={`M${ax + 50} ${ay - 34} A 30 30 0 0 1 ${ax + 80} ${ay - 14}`} stroke={PURP} width={2} marker="url(#komArrP)" />
      <L x={ax + 90} y={ay - 32} size={11} fill={PURP}>α</L>

      {/* centripetal component: B towards A (along link, inward) */}
      <Wire
        d={`M${bx} ${by} L${bx - ux * 80} ${by - uy * 80}`}
        stroke={RED} width={2.8} marker="url(#komArrR)" className="komm-pulse"
      />
      <L x={bx - ux * 88 + px * 26} y={by - uy * 88 + py * 26} size={11} fill={RED}>a^c_BA</L>

      {/* tangential component: perpendicular at B */}
      <Wire
        d={`M${bx} ${by} L${bx + px * 70} ${by + py * 70}`}
        stroke={GREEN} width={2.8} marker="url(#komArrG)" className="komm-pulse"
      />
      <L x={bx + px * 78 + 8} y={by + py * 78} size={11} fill={GREEN}>a^t_BA</L>

      {/* resultant */}
      <Wire
        d={`M${bx} ${by} L${bx - ux * 80 + px * 70} ${by - uy * 80 + py * 70}`}
        stroke={PURP} width={2} dash="5 3" marker="url(#komArrP)"
      />
      <L x={bx - ux * 80 + px * 100} y={by - uy * 80 + py * 100} size={11} fill={PURP}>a_BA</L>

      {/* formulas beside components */}
      <Card x={480} y={40} w={280} h={100} title="Centripetal component" accent={RED}>
        <L x={140} y={52} size={12} fill={RED}>Directed B → A (along link)</L>
        <M x={140} y={74} size={14} fill={N}>|a^c| = ω²·ℓ = V²_BA / ℓ</M>
        <L x={140} y={92} size={10} fill={GREEN}>✓ Fully known from velocities</L>
      </Card>

      <Card x={480} y={160} w={280} h={100} title="Tangential component" accent={GREEN}>
        <L x={140} y={52} size={12} fill={GREEN}>Perpendicular to link</L>
        <M x={140} y={74} size={14} fill={N}>|a^t| = α · ℓ</M>
        <L x={140} y={92} size={10} fill={AMBER}>Contains unknown α</L>
      </Card>

      {/* construction panel */}
      <Card x={480} y={290} w={280} h={110} title="Construction sequence" accent={BLUE}>
        <L x={140} y={54} size={11} fill={RED}>❶ Lay centripetal (fully known)</L>
        <L x={140} y={74} size={11} fill={GREEN}>❷ Tangential: direction only</L>
        <L x={140} y={94} size={11} fill={BLUE}>❸ Intersection completes polygon</L>
      </Card>
    </Scene>
  )
}

/* Unit 14 — acceleration-polygon-four-bar-build */
export function M2AccelPolygonScene() {
  /* four-bar + numbered accel polygon steps + image triangle */
  /* mechanism joints */
  const O1 = [60, 360], A = [130, 270], B = [310, 240], O2 = [370, 360]
  /* polygon pole */
  const P = [560, 400]
  /* accel tip positions */
  const aP = [560, 280]  /* crank pin centripetal from pole, towards O1 */
  const aC = [620, 310]  /* coupler centripetal added */
  const bP = [720, 340]  /* output tip after intersection */
  return (
    <Scene caption="Acceleration polygon — step-by-step construction for a four-bar">
      {/* ground */}
      <Wire d="M40 360 L400 360" stroke={MUTED} width={2} dash="6 4" />
      {/* mechanism */}
      <Wire d={`M${O1[0]} ${O1[1]} L${A[0]} ${A[1]}`} stroke={ROSE} width={3} />
      <Wire d={`M${A[0]} ${A[1]} L${B[0]} ${B[1]}`} stroke={BLUE} width={3} />
      <Wire d={`M${B[0]} ${B[1]} L${O2[0]} ${O2[1]}`} stroke={PURP} width={3} />
      <Dot cx={O1[0]} cy={O1[1]} r={5} fill={MUTED} />
      <Dot cx={O2[0]} cy={O2[1]} r={5} fill={MUTED} />
      <Dot cx={A[0]} cy={A[1]} r={4} fill={ROSE} />
      <Dot cx={B[0]} cy={B[1]} r={4} fill={PURP} />
      <L x={O1[0]} y={O1[1] + 20} size={11} fill={MUTED}>O₁</L>
      <L x={O2[0]} y={O2[1] + 20} size={11} fill={MUTED}>O₂</L>
      <L x={A[0] - 16} y={A[1] - 10} size={12} fill={ROSE}>A</L>
      <L x={B[0] + 14} y={B[1] - 10} size={12} fill={PURP}>B</L>
      {/* step badges */}
      <circle cx={95} cy={315} r={10} fill={ROSE} />
      <L x={95} y={320} size={10} fill={WHITE}>1</L>
      <circle cx={200} cy={248} r={10} fill={BLUE} />
      <L x={200} y={253} size={10} fill={WHITE}>2</L>
      <circle cx={340} cy={300} r={10} fill={PURP} />
      <L x={340} y={305} size={10} fill={WHITE}>3</L>

      {/* ── Acceleration polygon ── */}
      <Dot cx={P[0]} cy={P[1]} r={5} fill={N} />
      <L x={P[0]} y={P[1] + 20} size={11} fill={MUTED}>o' (pole)</L>

      {/* step 1: crank pin centripetal */}
      <Wire d={`M${P[0]} ${P[1]} L${aP[0]} ${aP[1]}`} stroke={ROSE} width={2.5} marker="url(#komArrRo)" />
      <L x={aP[0] - 20} y={aP[1] - 10} size={11} fill={ROSE}>a'¹</L>

      {/* step 2: coupler centripetal from a' */}
      <Wire d={`M${aP[0]} ${aP[1]} L${aC[0]} ${aC[1]}`} stroke={RED} width={2} marker="url(#komArrR)" />
      <L x={aC[0] + 10} y={aC[1] - 10} size={10} fill={RED}>a^c</L>
      {/* coupler tangential direction */}
      <Wire d={`M${aC[0]} ${aC[1]} L${bP[0]} ${bP[1]}`} stroke={BLUE} width={2} dash="5 3" />
      <L x={(aC[0] + bP[0]) / 2 + 8} y={(aC[1] + bP[1]) / 2 - 14} size={10} fill={BLUE}>a^t ⊥</L>

      {/* step 3: output centripetal from pole */}
      <Wire d={`M${P[0]} ${P[1]} L${P[0] + 100} ${P[1] - 40}`} stroke={PURP} width={2} />
      <L x={P[0] + 108} y={P[1] - 44} size={10} fill={PURP}>a^c₄</L>
      {/* output tangential direction */}
      <Wire d={`M${P[0] + 100} ${P[1] - 40} L${bP[0]} ${bP[1]}`} stroke={PURP} width={2} dash="5 3" />

      {/* intersection */}
      <Dot cx={bP[0]} cy={bP[1]} r={7} fill={WHITE} stroke={GREEN} />
      <circle cx={bP[0]} cy={bP[1]} r={12} fill="none" stroke={GREEN} strokeWidth={2} className="komm-wave" />
      <L x={bP[0] + 16} y={bP[1] - 6} size={12} fill={GREEN}>b'</L>

      {/* image triangle for offset point */}
      <Dot cx={680} cy={290} r={5} fill={TEAL} className="komm-pulse" />
      <L x={694} y={288} size={10} fill={TEAL} anchor="start">c' (image)</L>
      <Wire d={`M${aP[0]} ${aP[1]} L680 290`} stroke={TEAL} width={1.5} dash="4 3" />
      <Wire d={`M${bP[0]} ${bP[1]} L680 290`} stroke={TEAL} width={1.5} dash="4 3" />

      {/* step legend */}
      <L x={60} y={410} size={10} fill={ROSE} anchor="start">❶ Crank centripetal (ω²r towards O₁)</L>
      <L x={60} y={426} size={10} fill={BLUE} anchor="start">❷ Coupler: centripetal + tangential direction</L>
      <L x={60} y={442} size={10} fill={PURP} anchor="start">❸ Output: centripetal + tangential direction</L>
      <L x={60} y={458} size={10} fill={GREEN} anchor="start">❹ Intersection → b'; image → offset c'</L>
    </Scene>
  )
}

/* Unit 15 — coriolis-two-causes-and-direction */
export function M2CoriolisScene() {
  /* rotating lever + slider, two cause panels, direction rule */
  return (
    <Scene caption="Coriolis acceleration — 2ωv, the most commonly forgotten term">
      {/* ── Rotating slotted lever ── */}
      <Wire d="M80 380 L280 140" stroke={PURP} width={4} />
      <Wire d="M80 380 L280 140" stroke={CREAM} width={2} />
      <Dot cx={80} cy={380} r={6} fill={MUTED} />
      <L x={80} y={400} size={11} fill={MUTED}>O</L>
      {/* omega arrow */}
      <Wire d="M60 340 A 30 30 0 0 1 50 370" stroke={PURP} width={2} marker="url(#komArrP)" />
      <L x={35} y={348} size={11} fill={PURP}>ω</L>
      {/* block sliding outward */}
      <rect x={160} y={262} width={26} height={26} rx={4} fill={WHITE} stroke={AMBER} strokeWidth={2.5} className="komm-shift" />
      <L x={190} y={260} size={11} fill={AMBER} anchor="start">block</L>
      {/* sliding velocity arrow */}
      <Wire d="M186 275 L230 230" stroke={AMBER} width={2.2} marker="url(#komArrA)" />
      <L x={234} y={222} size={10} fill={AMBER} anchor="start">V_slide</L>

      {/* ── Cause 1 panel ── */}
      <Card x={340} y={30} w={250} h={120} title="Cause 1: Radius change" accent={ROSE}>
        <L x={125} y={52} size={11} fill={N}>Block moves to larger radius</L>
        <L x={125} y={70} size={11} fill={N}>→ tangential speed increases</L>
        <L x={125} y={92} size={12} fill={ROSE}>Contribution: ω × V_slide</L>
      </Card>

      {/* ── Cause 2 panel ── */}
      <Card x={340} y={170} w={250} h={120} title="Cause 2: Direction rotation" accent={BLUE}>
        <L x={125} y={52} size={11} fill={N}>Sliding velocity direction</L>
        <L x={125} y={70} size={11} fill={N}>rotates with the lever</L>
        <L x={125} y={92} size={12} fill={BLUE}>Contribution: ω × V_slide</L>
      </Card>

      {/* sum */}
      <Wire d="M470 290 L470 316" stroke={N} width={2} marker="url(#komArr)" />
      <Card x={370} y={320} w={190} h={56} title="Total Coriolis" accent={RED}>
        <M x={95} y={52} size={16} fill={RED}>a_cor = 2ωv</M>
      </Card>

      {/* ── Direction rule panel ── */}
      <Card x={620} y={30} w={250} h={190} title="Direction rule" accent={TEAL}>
        {/* sliding velocity vector */}
        <Wire d="M50 70 L180 70" stroke={AMBER} width={2.5} marker="url(#komArrA)" />
        <L x={115} y={62} size={10} fill={AMBER}>V_slide</L>
        {/* rotation arc */}
        <Wire d="M180 70 A 30 30 0 0 1 180 130" stroke={TEAL} width={2} marker="url(#komArrT)" />
        <L x={198} y={100} size={10} fill={TEAL}>90°</L>
        {/* resulting Coriolis direction */}
        <Wire d="M50 130 L180 130" stroke={RED} width={2.5} marker="url(#komArrR)" />
        <L x={115} y={150} size={10} fill={RED}>a_cor direction</L>
        <L x={125} y={172} size={10} fill={MUTED}>Rotate V_slide by 90°</L>
        <L x={125} y={186} size={10} fill={MUTED}>in sense of ω</L>
      </Card>

      {/* caution */}
      <Card x={620} y={250} w={250} h={60} title="⚠ Classic error" accent={RED}>
        <L x={125} y={52} size={11} fill={RED}>Most omitted term in course!</L>
      </Card>

      {/* formula summary */}
      <L x={120} y={460} size={12} fill={N}>Coriolis appears only when sliding occurs on a rotating link</L>
    </Scene>
  )
}

/* Unit 16 — klein-construction-and-inflection-circle */
export function M2KleinScene() {
  /* slider-crank with Klein overlay (left), inflection circle (right) */
  return (
    <Scene caption="Klein construction and the Euler-Savary equation">
      {/* ── Left half: Klein construction on slider-crank ── */}
      <L x={200} y={36} size={13} fill={N}>Klein construction</L>
      {/* slide line */}
      <Wire d="M30 340 L420 340" stroke={MUTED} width={2} dash="6 4" />
      {/* crank */}
      <Dot cx={100} cy={340} r={6} fill={MUTED} />
      <L x={100} y={360} size={10} fill={MUTED}>O</L>
      <Wire d="M100 340 L200 240" stroke={ROSE} width={3} />
      <Dot cx={200} cy={240} r={5} fill={ROSE} />
      <L x={200} y={226} size={11} fill={ROSE}>A</L>
      {/* connecting rod */}
      <Wire d="M200 240 L370 340" stroke={BLUE} width={3} />
      {/* slider */}
      <rect x={355} y={328} width={30} height={24} rx={4} fill={WHITE} stroke={AMBER} strokeWidth={2.5} />
      <L x={370} y={318} size={11} fill={AMBER}>B</L>

      {/* Klein circle 1: on connecting rod as diameter */}
      <circle cx={285} cy={290} r={95} fill="none" stroke={TEAL} strokeWidth={2} strokeDasharray="5 3" />
      <L x={285} y={382} size={10} fill={TEAL}>circle on AB as diameter</L>

      {/* Klein circle 2: centred on crank pin */}
      <circle cx={200} cy={240} r={80} fill="none" stroke={PURP} strokeWidth={2} strokeDasharray="5 3" />

      {/* common chord extended to slide line */}
      <Wire d="M170 300 L320 340" stroke={GREEN} width={2} />
      <L x={250} y={330} size={10} fill={GREEN} anchor="end">common chord</L>

      {/* quadrilateral = acceleration diagram */}
      <Wire d="M100 340 L200 240 L370 340 L320 340 Z" stroke={RED} width={2} dash="4 3" />
      <L x={240} y={300} size={10} fill={RED}>Accel diagram</L>
      <L x={240} y={314} size={9} fill={RED}>(same scale as space)</L>

      {/* ── Right half: Euler-Savary ── */}
      <L x={660} y={36} size={13} fill={N}>Euler-Savary equation</L>
      {/* coupler path trace */}
      <Curve pts={[
        [520, 300], [560, 250], [620, 210], [680, 200],
        [740, 220], [780, 270], [800, 330]
      ]} stroke={MUTED} width={2} dash="5 3" />
      <L x={810} y={326} size={10} fill={MUTED} anchor="start">coupler path</L>

      {/* coupler point */}
      <Dot cx={680} cy={200} r={5} fill={AMBER} />
      <L x={694} y={196} size={11} fill={AMBER} anchor="start">P</L>

      {/* IC */}
      <Dot cx={620} cy={320} r={6} fill={RED} />
      <L x={620} y={340} size={11} fill={RED}>I (IC)</L>

      {/* inflection circle through IC */}
      <circle cx={650} cy={260} r={80} fill="none" stroke={PURP} strokeWidth={2} />
      <L x={738} y={264} size={10} fill={PURP} anchor="start">inflection</L>
      <L x={738} y={278} size={10} fill={PURP} anchor="start">circle</L>

      {/* centre of curvature */}
      <Dot cx={740} cy={340} r={5} fill={TEAL} />
      <L x={754} y={344} size={10} fill={TEAL} anchor="start">C (centre of curvature)</L>

      {/* E-S relation annotation */}
      <Wire d="M620 320 L680 200" stroke={MUTED} width={1} dash="3 3" />
      <Wire d="M680 200 L740 340" stroke={MUTED} width={1} dash="3 3" />

      {/* point on inflection circle → straight path */}
      <Dot cx={650} cy={180} r={5} fill={GREEN} className="komm-pulse" />
      <L x={652} y={168} size={10} fill={GREEN} anchor="start">on circle: ρ→∞</L>
      <L x={652} y={154} size={9} fill={GREEN} anchor="start">(momentarily straight)</L>

      {/* E-S formula */}
      <M x={660} y={420} size={12} fill={PURP}>
        1/IP − 1/IC = 1/ID  (Euler-Savary)
      </M>
      <L x={660} y={446} size={10} fill={MUTED}>Relates point, IC, and curvature centre</L>
    </Scene>
  )
}

/* ── Module 3 ────────────────────────────────────────────────────────── */

export function M3ComplexNumberAsRotatingVectorScene() {
  return (
    <Scene caption="Complex number as rotating vector">
      {/* Left panel */}
      <Axes x="100" y="350" w="250" h="250" origin="center" xLabel="Re" yLabel="Im" />
      <Wire d="M225 350 L300 200" stroke={BLUE} marker="url(#komArrB)" />
      <Wire d="M225 350 L225 200 L300 200" stroke={MUTED} dash="4 4" width={1.5} />
      <L x="310" y="195" fill={BLUE} anchor="start">{"R = r e^(iθ)"}</L>
      <L x="262" y="365" fill={MUTED}>r cos θ</L>
      <L x="215" y="275" fill={MUTED} anchor="end">r sin θ</L>
      
      {/* Multiplication swing */}
      <Wire d="M300 200 A167 167 0 0 0 140 160" stroke={AMBER} dash="4 4" marker="url(#komArrA)" className="komm-pointer" />
      <Wire d="M225 350 L140 160" stroke={AMBER} marker="url(#komArrA)" opacity={0.5} />
      <L x="205" y="105" fill={AMBER}>{"× e^(iφ)"}</L>
      
      {/* Right panel */}
      <Axes x="550" y="350" w="250" h="250" origin="center" xLabel="Re" yLabel="Im" />
      <Wire d="M675 350 L750 200" stroke={BLUE} marker="url(#komArrB)" className="komm-pulse" />
      <Wire d="M750 200 L660 155" stroke={ROSE} marker="url(#komArrRo)" />
      <L x="760" y="200" fill={BLUE} anchor="start">R</L>
      <L x="625" y="110" fill={ROSE} anchor="end">dR/dt = i ω R</L>
      <Wire d="M720 215 A50 50 0 0 0 710 180" stroke={MUTED} marker="url(#komArrM)" />
      <L x="730" y="180" fill={MUTED}>90°</L>
    </Scene>
  )
}

export function M3ComplexLoopEquationSplitScene() {
  return (
    <Scene caption="The four-bar loop-closure equation">
      <Axes x="300" y="250" w="300" h="200" origin="center" />
      <Wire d="M450 250 L500 150 L650 120 L700 250" stroke={BLUE} width={3} />
      <Dot cx="450" cy="250" fill={WHITE} stroke={N} />
      <Dot cx="500" cy="150" fill={WHITE} stroke={N} />
      <Dot cx="650" cy="120" fill={WHITE} stroke={N} />
      <Dot cx="700" cy="250" fill={WHITE} stroke={N} />
      <Wire d="M450 250 L700 250" stroke={MUTED} width={4} dash="6 6" />
      
      <L x="460" y="195" fill={AMBER}>{"r₂ e^(iθ₂)"}</L>
      <L x="575" y="125" fill={ROSE}>{"r₃ e^(iθ₃)"}</L>
      <L x="690" y="185" fill={GREEN}>{"r₄ e^(iθ₄)"}</L>
      <L x="575" y="270" fill={MUTED}>r₁</L>
      
      <M x="450" y="60" size={18} fill={N}>
        {"r₂ e^(iθ₂) + r₃ e^(iθ₃) - r₄ e^(iθ₄) - r₁ = 0"}
      </M>
      
      <Wire d="M450 80 L450 320" stroke={MUTED} marker="url(#komArrM)" />
      <Wire d="M450 320 L250 350" stroke={MUTED} marker="url(#komArrM)" />
      <Wire d="M450 320 L650 350" stroke={MUTED} marker="url(#komArrM)" />
      
      <Card x="100" y="370" w="300" h="100" title="Real Part (Cosine)" accent={BLUE}>
        <M x="150" y="65" size={14}>r₂ cos(θ₂) + r₃ cos(θ₃) - r₄ cos(θ₄) - r₁ = 0</M>
      </Card>
      <Card x="500" y="370" w="300" h="100" title="Imaginary Part (Sine)" accent={BLUE}>
        <M x="150" y="65" size={14}>r₂ sin(θ₂) + r₃ sin(θ₃) - r₄ sin(θ₄) = 0</M>
      </Card>
      <Block x="400" y="415" w="100" h="50" label="2 Unknowns" sub="2 Equations" stroke={GREEN} fill={CREAM} />
    </Scene>
  )
}

export function M3PositionSolutionEliminationChainScene() {
  return (
    <Scene caption="Solving the position problem">
      <Card x="250" y="20" w="400" h="70" title="1. Isolate unknown coupler terms" accent={BLUE}>
        <M x="200" y="50">r₃ cos(θ₃) = r₁ + r₄ cos(θ₄) - r₂ cos(θ₂)</M>
      </Card>
      <Card x="250" y="110" w="400" h="70" title="2. Square both equations" accent={BLUE}>
        <M x="200" y="50">r₃² cos²(θ₃) = ( ... )²</M>
      </Card>
      <Card x="250" y="200" w="400" h="70" title="3. Add to eliminate θ₃" accent={AMBER}>
        <M x="200" y="50">r₃² (cos²(θ₃) + sin²(θ₃)) = r₃² (1) = r₃²</M>
      </Card>
      <Card x="250" y="290" w="400" h="70" title="4. Freudenstein equation in θ₄" accent={ROSE}>
        <M x="200" y="50">A cos(θ₄) + B sin(θ₄) + C = 0</M>
      </Card>
      <Card x="250" y="380" w="400" h="80" title="5. Half-angle substitution to quadratic" accent={GREEN}>
        <M x="200" y="50">(C-A) t² + 2B t + (C+A) = 0</M>
        <M x="200" y="70" size={12} fill={MUTED}>Two roots = open and crossed branches</M>
      </Card>
      <Wire d="M450 90 L450 110" stroke={MUTED} marker="url(#komArrM)" />
      <Wire d="M450 180 L450 200" stroke={MUTED} marker="url(#komArrM)" />
      <Wire d="M450 270 L450 290" stroke={MUTED} marker="url(#komArrM)" />
      <Wire d="M450 360 L450 380" stroke={MUTED} marker="url(#komArrM)" />
    </Scene>
  )
}

export function M3ThreeLevelsOneEquationScene() {
  return (
    <Scene caption="Three levels, one equation">
      <Card x="200" y="340" w="500" h="100" title="Position (Non-linear)" accent={ROSE}>
        <M x="250" y="50" fill={ROSE}>{"r₂ e^(iθ₂) + r₃ e^(iθ₃) - r₄ e^(iθ₄) - r₁ = 0"}</M>
        <M x="250" y="80" size={12}>Unknowns: θ₃, θ₄ (Requires solving quadratic)</M>
      </Card>
      <Card x="200" y="190" w="500" h="100" title="Velocity (Linear)" accent={AMBER}>
        <M x="250" y="50" fill={AMBER}>{"i ω₂ r₂ e^(iθ₂) + i ω₃ r₃ e^(iθ₃) - i ω₄ r₄ e^(iθ₄) = 0"}</M>
        <M x="250" y="80" size={12}>Unknowns: ω₃, ω₄ (θ₃, θ₄ now known coefficients)</M>
      </Card>
      <Card x="200" y="40" w="500" h="100" title="Acceleration (Linear)" accent={GREEN}>
        <M x="250" y="45" fill={GREEN} size={11}>{"(i α₂ - ω₂²) r₂ e^(iθ₂) + (i α₃ - ω₃²) r₃ e^(iθ₃) - (i α₄ - ω₄²) r₄ e^(iθ₄) = 0"}</M>
        <M x="250" y="80" size={12}>Unknowns: α₃, α₄ (ω, θ now known coefficients)</M>
      </Card>
      
      <Wire d="M450 340 L450 290" stroke={MUTED} marker="url(#komArrM)" />
      <Wire d="M450 190 L450 140" stroke={MUTED} marker="url(#komArrM)" />
      <Block x="465" y="300" w="60" h="24" label="d/dt" size={12} stroke={N} />
      <Block x="465" y="150" w="60" h="24" label="d/dt" size={12} stroke={N} />
    </Scene>
  )
}

export function M3SliderCrankHarmonicsDecompositionScene() {
  const exactPts = []
  const recombinedPts = []
  for (let i = 0; i <= 360; i += 5) {
    const rad = i * Math.PI / 180
    const l = 120
    const r = 40
    const exact = r * Math.cos(rad) + l * Math.sqrt(1 - Math.pow((r/l) * Math.sin(rad), 2))
    const approx = r * Math.cos(rad) + (r*r)/(4*l) * Math.cos(2*rad) + l - (r*r)/(4*l)
    exactPts.push([150 + i*1.5, 200 - (exact - l) * 1.5])
    recombinedPts.push([150 + i*1.5, 300 - (approx - l) * 1.5])
  }

  return (
    <Scene caption="Slider-crank harmonics decomposition">
      <Wire d="M400 80 L460 30 L600 80" stroke={BLUE} width={3} />
      <Dot cx="400" cy="80" />
      <Dot cx="460" cy="30" />
      <Dot cx="600" cy="80" />
      <Block x="580" y="65" w="40" h="30" stroke={N} />
      <Wire d="M350 80 L650 80" stroke={MUTED} dash="4 4" />
      
      <Axes x="150" y="200" w="540" h="60" origin="left" yLabel="Exact" />
      <Curve pts={exactPts} stroke={ROSE} />
      
      <Axes x="150" y="300" w="540" h="60" origin="left" yLabel="Sum" />
      <Curve pts={recombinedPts} stroke={PURP} />
      
      <Axes x="150" y="400" w="540" h="50" origin="left" yLabel="1st Har." />
      <Wave x="150" y="400" w="540" amp="60" cycles="1" phase="1.57" stroke={BLUE} />
      
      <Axes x="150" y="480" w="540" h="40" origin="left" yLabel="2nd Har." />
      <Wave x="150" y="480" w="540" amp="15" cycles="2" phase="1.57" stroke={AMBER} />
      
      <L x="720" y="480" fill={AMBER} size={12}>Twice crank speed</L>
    </Scene>
  )
}

export function M3CouplerCurveAtlasScene() {
  return (
    <Scene caption="Coupler curves">
      <Wire d="M350 200 L380 120 L520 100 L550 200" stroke={N} width={3} />
      <Wire d="M380 120 L450 60 L520 100" stroke={BLUE} width={2} />
      
      <g opacity="0.5">
        {[400, 420, 440, 460, 480, 500].map(cx => 
          [40, 60, 80, 100, 120, 140].map(cy => 
            <Dot key={`${cx}-${cy}`} cx={cx} cy={cy} r={2} fill={BLUE} />
          )
        )}
      </g>
      
      <Dot cx="400" cy="40" fill={ROSE} r={4} />
      <Wire d="M400 40 L250 50" stroke={ROSE} dash="4 4" />
      <Wire d="M150 50 L250 50" stroke={ROSE} width={2} />
      <L x="200" y="35" fill={ROSE} size={12}>Straight line</L>
      
      <Dot cx="500" cy="60" fill={AMBER} r={4} />
      <Wire d="M500 60 L650 60" stroke={AMBER} dash="4 4" />
      <path d="M650 60 C 650 10, 750 10, 700 60 C 650 110, 750 110, 750 60" fill="none" stroke={AMBER} strokeWidth="2" />
      
      <Dot cx="400" cy="140" fill={GREEN} r={4} />
      <Wire d="M400 140 L250 150" stroke={GREEN} dash="4 4" />
      <path d="M150 120 Q 200 150 200 180 Q 200 150 250 120" fill="none" stroke={GREEN} strokeWidth="2" />
      
      <Dot cx="500" cy="140" fill={PURP} r={4} />
      <Wire d="M500 140 L650 150" stroke={PURP} dash="4 4" />
      <path d="M650 150 Q 700 120 750 150 A 50 50 0 0 1 650 150" fill="none" stroke={PURP} strokeWidth="2" />
      
      <Block x="300" y="350" w="300" h="100" label="Dwell mechanism output" sub="Follows flat portion of coupler curve" stroke={PURP} />
      <Wire d="M350 480 L550 480" stroke={MUTED} width={6} />
      <Wire d="M400 480 L480 480" stroke={PURP} width={6} className="komm-shift" />
      <L x="450" y="500" size={12} fill={MUTED}>Dwell interval</L>
    </Scene>
  )
}

export function M3AppliedVersusConstraintForceMapScene() {
  return (
    <Scene caption="Applied and constraint forces">
      <Wire d="M300 250 L350 150 L550 120 L600 250" stroke={BLUE} width={3} />
      
      <path d="M250 280 C 250 100, 400 50, 650 100 C 650 280, 400 350, 250 280 Z" fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="8 4" />
      <L x="260" y="100" fill={MUTED} size={13}>System Boundary</L>
      
      <Wire d="M350 50 L350 150" stroke={ROSE} marker="url(#komArrRo)" />
      <L x="360" y="70" fill={ROSE} size={12} anchor="start">Link weight</L>
      
      <Wire d="M700 80 L550 120" stroke={ROSE} marker="url(#komArrRo)" />
      <L x="680" y="70" fill={ROSE} size={12} anchor="start">Output load</L>
      
      <Wire d="M220 200 A 40 40 0 0 1 280 200" stroke={ROSE} marker="url(#komArrRo)" fill="none" strokeWidth="2" />
      <L x="220" y="180" fill={ROSE} size={12}>Input torque</L>
      
      <g className="komm-pulse">
        <Wire d="M320 150 L350 150" stroke={AMBER} marker="url(#komArrA)" />
        <Wire d="M380 150 L350 150" stroke={AMBER} marker="url(#komArrA)" />
        <Wire d="M320 130 L380 170" stroke={RED} width={2} />
        
        <Wire d="M520 120 L550 120" stroke={AMBER} marker="url(#komArrA)" />
        <Wire d="M580 120 L550 120" stroke={AMBER} marker="url(#komArrA)" />
        <Wire d="M520 100 L580 140" stroke={RED} width={2} />
      </g>
    </Scene>
  )
}

export function M3FreeBodyIsolationSequenceScene() {
  return (
    <Scene caption="Free-body diagrams and equilibrium">
      <Wire d="M150 300 L200 200" stroke={BLUE} width={3} />
      <Wire d="M200 200 L250 150" stroke={AMBER} marker="url(#komArrA)" />
      <Wire d="M150 300 L100 350" stroke={AMBER} marker="url(#komArrA)" />
      <Card x="50" y="80" w="180" h="80" title="Crank" accent={BLUE}>
        <M x="90" y="55" size={12}>ΣF_x = 0, ΣF_y = 0, ΣM = 0</M>
      </Card>
      <Block x="50" y="380" w="180" h="40" label="Unknowns: 3" sub="(O₂x, O₂y, T₂)" stroke={N} size={12} />
      
      <Wire d="M350 200 L550 170" stroke={BLUE} width={3} />
      <Wire d="M350 200 L300 250" stroke={AMBER} marker="url(#komArrA)" />
      <Wire d="M550 170 L600 150" stroke={AMBER} marker="url(#komArrA)" />
      <Card x="360" y="50" w="180" h="80" title="Coupler" accent={AMBER}>
        <M x="90" y="55" size={12}>ΣF_x = 0, ΣF_y = 0, ΣM = 0</M>
      </Card>
      <Block x="360" y="380" w="180" h="40" label="Unknowns: 1" sub="(Magnitude of F₃)" stroke={GREEN} fill={CREAM} size={12} />
      <Wire d="M450 380 L450 330" stroke={GREEN} marker="url(#komArrG)" />
      <L x="460" y="350" size={12} fill={GREEN}>Start here</L>
      
      <Wire d="M700 150 L750 300" stroke={BLUE} width={3} />
      <Wire d="M700 150 L650 170" stroke={AMBER} marker="url(#komArrA)" />
      <Wire d="M750 300 L800 350" stroke={AMBER} marker="url(#komArrA)" />
      <Wire d="M780 100 L700 150" stroke={ROSE} marker="url(#komArrRo)" />
      <Card x="650" y="80" w="180" h="80" title="Output" accent={BLUE}>
        <M x="90" y="55" size={12}>ΣF_x = 0, ΣF_y = 0, ΣM = 0</M>
      </Card>
      <Block x="650" y="380" w="180" h="40" label="Unknowns: 2" sub="(O₄x, O₄y)" stroke={N} size={12} />
      
      <Wire d="M360 400 L230 400" stroke={GREEN} marker="url(#komArrG)" dash="4 4" />
      <Wire d="M540 400 L650 400" stroke={GREEN} marker="url(#komArrG)" dash="4 4" />
    </Scene>
  )
}

export function M3TwoAndThreeForceMemberConditionsScene() {
  return (
    <Scene caption="Two-force and three-force members">
      <Card x="50" y="50" w="380" h="350" title="Two-force member" accent={BLUE}>
        <Wire d="M100 150 L280 200" stroke={BLUE} width={25} />
        
        <Wire d="M100 150 L100 80" stroke={RED} marker="url(#komArrR)" dash="4 4" opacity={0.5} />
        <Wire d="M280 200 L280 270" stroke={RED} marker="url(#komArrR)" dash="4 4" opacity={0.5} />
        <path d="M150 140 A 50 50 0 0 1 230 210" fill="none" stroke={RED} strokeWidth="2" markerEnd="url(#komArrR)" opacity={0.5} />
        <M x="190" y="160" size={24} fill={RED} weight={800} opacity={0.7}>×</M>
        
        <Wire d="M100 150 L40 133" stroke={AMBER} marker="url(#komArrA)" width={3} />
        <Wire d="M280 200 L340 217" stroke={AMBER} marker="url(#komArrA)" width={3} />
        <Wire d="M40 133 L340 217" stroke={AMBER} dash="4 4" />
        <M x="190" y="220" size={12} fill={AMBER}>Collinear</M>
      </Card>
      
      <Card x="470" y="50" w="380" h="350" title="Three-force member" accent={BLUE}>
        <Wire d="M100 180 L200 100 L250 200 Z" stroke={BLUE} width={3} />
        
        <Wire d="M100 180 L70 230" stroke={AMBER} marker="url(#komArrA)" />
        <Wire d="M200 100 L210 50" stroke={AMBER} marker="url(#komArrA)" />
        <Wire d="M250 200 L300 230" stroke={AMBER} marker="url(#komArrA)" />
        
        <Wire d="M70 230 L160 80" stroke={MUTED} dash="4 4" />
        <Wire d="M210 50 L160 80" stroke={MUTED} dash="4 4" />
        <Wire d="M300 230 L160 80" stroke={MUTED} dash="4 4" />
        <Dot cx="160" cy="80" fill={N} />
        <L x="160" y="70" size={12} fill={N}>Concurrency point</L>
        
        <Wire d="M300 100 L330 50" stroke={AMBER} marker="url(#komArrA)" />
        <Wire d="M330 50 L280 80" stroke={AMBER} marker="url(#komArrA)" />
        <Wire d="M280 80 L300 100" stroke={AMBER} marker="url(#komArrA)" />
        <L x="305" y="115" size={11} fill={MUTED}>Closed triangle</L>
      </Card>
    </Scene>
  )
}

export function M3SuperpositionSplitAndRecombineScene() {
  return (
    <Scene caption="Superposition in force analysis">
      <Card x="350" y="20" w="200" h="90" title="Four-force member" accent={ROSE}>
        <Wire d="M60 50 L140 50" stroke={BLUE} width={3} />
        <Wire d="M80 50 L80 20" stroke={RED} marker="url(#komArrR)" />
        <Wire d="M120 50 L120 20" stroke={RED} marker="url(#komArrR)" />
        <M x="100" y="45" size={24} fill={RED} weight={800}>×</M>
      </Card>
      
      <Wire d="M350 70 L250 150" stroke={MUTED} dash="4 4" />
      <Wire d="M550 70 L650 150" stroke={MUTED} dash="4 4" />
      
      <Card x="150" y="150" w="200" h="90" title="Load 1 (3-force)" accent={AMBER}>
        <Wire d="M60 50 L140 50" stroke={BLUE} width={3} />
        <Wire d="M80 50 L80 20" stroke={RED} marker="url(#komArrR)" />
        <Wire d="M60 50 L50 80" stroke={AMBER} marker="url(#komArrA)" />
        <Wire d="M140 50 L150 80" stroke={AMBER} marker="url(#komArrA)" />
      </Card>
      
      <Card x="550" y="150" w="200" h="90" title="Load 2 (3-force)" accent={AMBER}>
        <Wire d="M60 50 L140 50" stroke={BLUE} width={3} />
        <Wire d="M120 50 L120 20" stroke={RED} marker="url(#komArrR)" />
        <Wire d="M60 50 L40 70" stroke={AMBER} marker="url(#komArrA)" />
        <Wire d="M140 50 L160 70" stroke={AMBER} marker="url(#komArrA)" />
      </Card>
      
      <Wire d="M250 240 L350 320" stroke={MUTED} dash="4 4" />
      <Wire d="M650 240 L550 320" stroke={MUTED} dash="4 4" />
      
      <Card x="300" y="320" w="300" h="120" title="Recombined (Vector Sum)" accent={GREEN}>
        <Wire d="M150 70 L110 50" stroke={AMBER} marker="url(#komArrA)" />
        <L x="110" y="40" size={11} fill={AMBER}>Pin force 1</L>
        <Wire d="M150 70 L170 30" stroke={AMBER} marker="url(#komArrA)" />
        <L x="190" y="30" size={11} fill={AMBER}>Pin force 2</L>
        <Wire d="M150 70 L130 10" stroke={GREEN} marker="url(#komArrG)" width={3} />
        <L x="130" y="0" size={12} fill={GREEN}>Total pin force</L>
      </Card>
    </Scene>
  )
}

export function M3GraphicalForcePropagationFourBarScene() {
  return (
    <Scene caption="Graphical static force analysis">
      <Wire d="M200 350 L250 200 L450 150 L500 350" stroke={BLUE} width={3} />
      <Wire d="M200 350 L500 350" stroke={MUTED} dash="4 4" />
      <Dot cx="200" cy="350" />
      <Dot cx="250" cy="200" />
      <Dot cx="450" cy="150" />
      <Dot cx="500" cy="350" />
      
      <Wire d="M450 150 L450 80" stroke={RED} marker="url(#komArrR)" />
      <L x="450" y="70" size={12} fill={RED}>Applied Load</L>
      
      <Wire d="M250 200 L550 125" stroke={AMBER} dash="4 4" className="komm-pointer" />
      <L x="350" y="160" size={12} fill={AMBER} className="komm-pulse">1. Two-force coupler</L>
      
      <Wire d="M450 80 L450 137.5" stroke={MUTED} dash="4 4" />
      <Dot cx="450" cy="137.5" fill={ROSE} r={4} />
      <L x="490" y="130" size={11} fill={ROSE}>2. Concurrency</L>
      <Wire d="M500 350 L450 137.5" stroke={ROSE} dash="4 4" />
      
      <Wire d="M250 200 L200 212.5" stroke={GREEN} marker="url(#komArrG)" />
      <L x="160" y="210" size={11} fill={GREEN}>3. Transfer</L>
      
      <path d="M180 320 A 30 30 0 0 1 200 280" fill="none" stroke={PURP} strokeWidth="2" markerEnd="url(#komArrP)" />
      <L x="170" y="310" size={12} fill={PURP}>4. Input Torque</L>
      
      <Card x="650" y="100" w="180" h="150" title="Force Polygon" accent={ROSE}>
        <Wire d="M90 60 L90 100" stroke={RED} marker="url(#komArrR)" />
        <Wire d="M90 100 L50 110" stroke={AMBER} marker="url(#komArrA)" />
        <Wire d="M50 110 L90 60" stroke={ROSE} marker="url(#komArrRo)" />
      </Card>
    </Scene>
  )
}

export function M3ForceEquationMatrixAssemblyScene() {
  const cyclePts = []
  for (let i = 0; i <= 360; i += 5) {
    cyclePts.push([150 + i*1.5, 450 - 30 * Math.sin(i * Math.PI / 180) - 15 * Math.cos(2*i * Math.PI / 180)])
  }
  return (
    <Scene caption="Analytical static force analysis">
      <Card x="50" y="30" w="200" h="100" title="Crank" accent={BLUE}>
        <M x="100" y="55" size={12}>3 Equations</M>
      </Card>
      <Card x="50" y="140" w="200" h="100" title="Coupler" accent={BLUE}>
        <M x="100" y="55" size={12}>3 Equations</M>
      </Card>
      <Card x="50" y="250" w="200" h="100" title="Output" accent={BLUE}>
        <M x="100" y="55" size={12}>3 Equations</M>
      </Card>
      
      <Wire d="M260 80 L350 160" stroke={MUTED} marker="url(#komArrM)" />
      <Wire d="M260 190 L350 190" stroke={MUTED} marker="url(#komArrM)" />
      <Wire d="M260 300 L350 220" stroke={MUTED} marker="url(#komArrM)" />
      
      <Block x="360" y="100" w="150" h="150" label="[ 9 × 9 ]" sub="Coefficients" stroke={AMBER} />
      <Block x="530" y="100" w="80" h="150" label="[ 9 × 1 ]" sub="Unknowns" stroke={GREEN} fill={CREAM} />
      <M x="630" y="175" size={20}>=</M>
      <Block x="660" y="100" w="80" h="150" label="[ 9 × 1 ]" sub="Loads" stroke={ROSE} />
      
      <L x="560" y="70" size={14} fill={GREEN} weight={800}>Solve at each θ₂</L>
      <Wire d="M570 260 L570 330" stroke={GREEN} marker="url(#komArrG)" />
      
      <Axes x="150" y="470" w="540" h="100" origin="left" yLabel="Pin Force" xLabel="Crank Angle" />
      <Curve pts={cyclePts} stroke={GREEN} className="komm-traverse" />
    </Scene>
  )
}

export function M3FrictionCircleAtAPinScene() {
  return (
    <Scene caption="Friction force models and efficiency">
      <Card x="50" y="50" w="350" h="300" title="Pin joint with friction" accent={BLUE}>
        <Dot cx="175" cy="180" r={40} fill={CREAM} stroke={MUTED} />
        <Dot cx="175" cy="180" r={20} fill="none" stroke={RED} dash="4 4" />
        <Dot cx="175" cy="180" r={3} fill={N} />
        <L x="175" y="240" size={11} fill={RED}>Friction circle (r sin φ)</L>
        
        <Wire d="M50 180 L300 180" stroke={MUTED} dash="4 4" />
        <L x="270" y="125" size={12} fill={MUTED}>Frictionless</L>

        <Wire d="M50 160 L300 160" stroke={AMBER} marker="url(#komArrA)" className="komm-shift" />
        <Wire d="M175 180 L175 160" stroke={N} width={1.5} />
        <L x="185" y="148" size={10} fill={N} anchor="start">offset</L>
        
        <Wire d="M300 200 L50 200" stroke={ROSE} marker="url(#komArrRo)" className="komm-shift" />
      </Card>
      
      <Card x="450" y="50" w="400" h="300" title="Efficiency chain" accent={GREEN}>
        <Wire d="M50 150 L350 150" stroke={GREEN} width={6} />
        <Block x="30" y="130" w="60" h="40" label="Input" stroke={GREEN} fill={CREAM} />
        
        {[100, 160, 220, 280].map((x, i) => (
          <g key={i}>
            <Wire d={`M${x + 30} 150 L${x + 30} 220`} stroke={RED} width={3} marker="url(#komArrR)" className="komm-descend" />
            <L x={x + 30} y={235} size={11} fill={RED}>Loss {i+1}</L>
          </g>
        ))}
        
        <Block x="330" y="130" w="60" h="40" label="Output" stroke={BLUE} fill={CREAM} />
      </Card>
    </Scene>
  )
}

export function M3VirtualWorkEliminatesPinForcesScene() {
  return (
    <Scene caption="The principle of virtual work">
      <Wire d="M100 200 L150 100 L300 80 L350 200" stroke={BLUE} width={3} />
      <Wire d="M100 200 L160 100 L310 80 L350 200" stroke={BLUE} dash="4 4" opacity={0.5} width={2} />
      
      <Dot cx="100" cy="200" />
      <Dot cx="150" cy="100" />
      <Dot cx="300" cy="80" />
      <Dot cx="350" cy="200" />
      
      <Wire d="M130 90 L170 110" stroke={AMBER} marker="url(#komArrA)" className="komm-pulse" />
      <Wire d="M170 110 L130 90" stroke={AMBER} marker="url(#komArrA)" className="komm-pulse" />
      
      <Panel x="500" y="20" w="350" title="Virtual Work Ledger" rows={[
        ['O₂ Pin pair', 'dW - dW = 0', MUTED],
        ['A Pin pair', 'dW - dW = 0', MUTED],
        ['B Pin pair', 'dW - dW = 0', MUTED],
        ['O₄ Pin pair', 'dW - dW = 0', MUTED],
        ['Input Torque', '+ T δθ', GREEN],
        ['Output Load', '- F δs', ROSE],
        ['Total Virtual Work', 'T δθ - F δs = 0', BLUE]
      ]} />
      
      <Card x="500" y="320" w="350" h="100" title="Full Free-Body Route" accent={ROSE}>
        <M x="175" y="55" size={14} fill={ROSE}>9 equations to find T</M>
        <M x="175" y="75" size={12} fill={MUTED}>(Computing 8 unwanted pin forces)</M>
      </Card>
    </Scene>
  )
}

export function M3ThreeMethodsDecisionMapScene() {
  return (
    <Scene caption="Choosing between the methods">
      <Block x="350" y="20" w="200" h="50" label="What is required?" stroke={BLUE} size={15} />
      
      <Wire d="M450 70 L200 130" stroke={MUTED} marker="url(#komArrM)" />
      <Wire d="M450 70 L450 130" stroke={MUTED} marker="url(#komArrM)" />
      <Wire d="M450 70 L700 130" stroke={MUTED} marker="url(#komArrM)" />
      
      <Card x="50" y="130" w="260" h="120" title="Input torque only" accent={GREEN}>
        <Block x="30" y="50" w="200" h="50" label="Virtual Work" sub="A few lines" stroke={GREEN} fill={CREAM} />
      </Card>
      
      <Card x="320" y="130" w="260" h="120" title="Pin forces at one position" accent={AMBER}>
        <Block x="30" y="50" w="200" h="50" label="Graphical Method" sub="Insight & errors visible" stroke={AMBER} fill={CREAM} />
      </Card>
      
      <Card x="590" y="130" w="260" h="120" title="Pin forces through cycle" accent={ROSE}>
        <Block x="30" y="50" w="200" h="50" label="Analytical Matrix" sub="Programmable" stroke={ROSE} fill={CREAM} />
      </Card>
      
      <Block x="350" y="280" w="200" h="40" label="Friction Included?" stroke={RED} size={14} />
      <Wire d="M350 300 L250 250" stroke={RED} dash="4 4" marker="url(#komArrR)" className="komm-pointer" />
      <Wire d="M450 280 L450 250" stroke={RED} dash="4 4" marker="url(#komArrR)" className="komm-pointer" />
      <L x="300" y="260" size={11} fill={RED}>No Virtual Work</L>
      <L x="500" y="260" size={11} fill={RED}>No Superposition</L>
    </Scene>
  )
}

export function M3SliderCrankForceResolutionChainScene() {
  const tmPts = []
  for (let i = 0; i <= 360; i += 5) {
    const rad = i * Math.PI / 180
    tmPts.push([150 + i * 1.5, 450 - 60 * Math.sin(rad) - 20 * Math.sin(2*rad)])
  }
  
  return (
    <Scene caption="Static force analysis of the slider-crank">
      <Wire d="M250 150 L350 50 L650 150" stroke={BLUE} width={3} />
      <Dot cx="250" cy="150" />
      <Dot cx="350" cy="50" />
      <Dot cx="650" cy="150" />
      <Block x="600" y="135" w="100" h="30" stroke={N} />
      <Wire d="M150 150 L750 150" stroke={MUTED} dash="4 4" />
      
      <Wire d="M750 150 L700 150" stroke={ROSE} marker="url(#komArrRo)" width={2} />
      <L x="750" y="140" size={12} fill={ROSE}>Gas force</L>
      
      <Wire d="M650 150 L570 125" stroke={AMBER} marker="url(#komArrA)" />
      <L x="580" y="110" size={11} fill={AMBER}>Rod thrust</L>
      <Wire d="M650 150 L650 100" stroke={RED} marker="url(#komArrR)" className="komm-pulse" />
      <L x="660" y="90" size={11} fill={RED}>Side thrust (wear)</L>
      
      <Wire d="M350 50 L270 25" stroke={AMBER} marker="url(#komArrA)" />
      <Wire d="M270 25 L300 0" stroke={GREEN} marker="url(#komArrG)" />
      <Wire d="M300 0 L350 50" stroke={MUTED} dash="4 4" />
      <Wire d="M350 50 L310 90" stroke={GREEN} marker="url(#komArrG)" />
      <L x="270" y="80" size={12} fill={GREEN}>Crank effort</L>
      <Wire d="M250 150 L310 90" stroke={MUTED} dash="4 4" />
      <L x="230" y="100" size={11} fill={MUTED}>Radius</L>
      
      <Axes x="150" y="450" w="540" h="120" origin="left" yLabel="Turning Moment" xLabel="Crank Angle" />
      <Curve pts={tmPts} stroke={GREEN} className="komm-traverse" />
    </Scene>
  )
}

/* ── Module 4 ────────────────────────────────────────────────────────── */

/* kom-m4.jsx — Module 4: Dynamic Force Analysis
   All components use primitives from KomScenes.jsx (Scene, L, M, Wire, Dot,
   Axes, Curve, Wave, Block, Res, Ind, Src, Panel, Card, Bars).
   Palette: N, BLUE, ROSE, PURP, AMBER, GREEN, TEAL, RED, MUTED, CREAM, SKY, WHITE.
   n() coerces every prop used in arithmetic. */

/* ── Unit 1 ── dalembert-conversion ──────────────────────────────── */
export function M4DalembertConversionScene() {
  /* Left: accelerating link with unbalanced resultant.
     Arrow → Right: inertia force added, polygon closes, equilibrium stamp.
     Below: angular case with inertia couple. Caution note. */
  const linkPts = [[80, 200], [230, 200]]
  const cmX = 155; const cmY = 200
  return (
    <Scene caption="d'Alembert's principle — dynamic to static equilibrium">
      {/* ── Left panel: accelerating link ── */}
      <Card x={20} y={18} w={400} h={220} title="Accelerating Link" accent={BLUE}>
        {/* Link body */}
        <Wire d="M60 120 L210 120" stroke={N} width={6} />
        <Dot cx={60} cy={120} r={6} fill={MUTED} />
        <Dot cx={210} cy={120} r={6} fill={MUTED} />
        <Dot cx={135} cy={120} r={5} fill={ROSE} />
        <L x={135} y={110} size={10} fill={ROSE}>G</L>
        {/* Applied forces */}
        <Wire d="M60 120 L60 70" stroke={BLUE} width={2.2} marker="url(#komArrB)" />
        <L x={48} y={65} size={10} fill={BLUE} anchor="end">F₁</L>
        <Wire d="M210 120 L240 80" stroke={BLUE} width={2.2} marker="url(#komArrB)" />
        <L x={248} y={76} size={10} fill={BLUE} anchor="start">F₂</L>
        {/* Acceleration vector */}
        <Wire d="M135 140 L195 140" stroke={AMBER} width={2.5} marker="url(#komArrA)" className="komm-pulse" />
        <L x={170} y={160} size={10} fill={AMBER}>a</L>
        {/* Equation */}
        <M x={200} y={195} size={12} fill={N}>ΣF = m·a ≠ 0</M>
      </Card>

      {/* Transformation arrow */}
      <Wire d="M430 128 L470 128" stroke={PURP} width={3} marker="url(#komArrP)" className="komm-shift" />
      <L x={450} y={118} size={10} fill={PURP}>add −ma</L>

      {/* ── Right panel: equilibrium ── */}
      <Card x={480} y={18} w={400} h={220} title="Dynamic Equilibrium" accent={GREEN}>
        {/* Link body */}
        <Wire d="M60 120 L210 120" stroke={N} width={6} />
        <Dot cx={60} cy={120} r={6} fill={MUTED} />
        <Dot cx={210} cy={120} r={6} fill={MUTED} />
        <Dot cx={135} cy={120} r={5} fill={GREEN} />
        <L x={135} y={110} size={10} fill={GREEN}>G</L>
        {/* Applied forces */}
        <Wire d="M60 120 L60 70" stroke={BLUE} width={2.2} marker="url(#komArrB)" />
        <L x={48} y={65} size={10} fill={BLUE} anchor="end">F₁</L>
        <Wire d="M210 120 L240 80" stroke={BLUE} width={2.2} marker="url(#komArrB)" />
        <L x={248} y={76} size={10} fill={BLUE} anchor="start">F₂</L>
        {/* Inertia force (opposite to a) */}
        <Wire d="M135 140 L75 140" stroke={ROSE} width={2.5} marker="url(#komArrRo)" className="komm-insert" />
        <L x={95} y={158} size={10} fill={ROSE}>Fᵢ = −ma</L>
        {/* Equilibrium stamp */}
        <rect x={130} y={172} width={130} height={24} rx={6} fill={GREEN} opacity={0.15} />
        <M x={195} y={189} size={11} fill={GREEN} weight={800}>ΣF = 0  ✓</M>
      </Card>

      {/* ── Bottom: angular case ── */}
      <Card x={20} y={260} w={400} h={130} title="Angular Case" accent={PURP}>
        <Wire d="M60 70 L210 70" stroke={N} width={5} />
        <Dot cx={135} cy={70} r={5} fill={PURP} />
        {/* Angular acceleration arc */}
        <Wire d="M170 55 A25 25 0 0 1 170 85" stroke={AMBER} width={2} marker="url(#komArrA)" />
        <L x={200} y={65} size={10} fill={AMBER}>α</L>
        {/* Inertia couple opposing */}
        <Wire d="M110 85 A25 25 0 0 0 110 55" stroke={ROSE} width={2} marker="url(#komArrRo)" className="komm-wrap" />
        <L x={95} y={112} size={10} fill={ROSE} anchor="end">Tᵢ = −Iα</L>
        <M x={200} y={108} size={11} fill={GREEN}>ΣM = 0  ✓</M>
      </Card>

      {/* ── Caution note ── */}
      <Card x={480} y={260} w={400} h={130} title="⚠ Caution" accent={RED}>
        <L x={200} y={62} size={12} fill={N} weight={650}>The inertia force is an</L>
        <L x={200} y={80} size={12} fill={RED} weight={800}>accounting device</L>
        <L x={200} y={98} size={12} fill={N} weight={650}>not a physical force</L>
        <L x={200} y={116} size={12} fill={MUTED} weight={650}>— it has no reaction.</L>
      </Card>
    </Scene>
  )
}

/* ── Unit 2 ── inertia-properties-and-parallel-axis ──────────────── */
export function M4InertiaPropertiesScene() {
  /* Connecting rod with CG, radius of gyration ring, parallel axis shift,
     comparison bars for disc / ring / rod. */
  return (
    <Scene caption="Centroid, centre of mass and mass moment of inertia">
      {/* ── Connecting rod body ── */}
      <Wire d="M60 140 Q90 110 160 120 Q210 125 260 115 Q290 110 310 140 Q290 170 260 165 Q210 155 160 160 Q90 170 60 140 Z" stroke={N} width={2.5} />
      <L x={60} y={135} size={9} fill={MUTED} anchor="end">big end</L>
      <L x={310} y={135} size={9} fill={MUTED} anchor="start">small end</L>

      {/* CG marker */}
      <Dot cx={175} cy={140} r={6} fill={ROSE} />
      <L x={175} y={126} size={11} fill={ROSE}>G (centre of mass)</L>

      {/* Balance construction lines */}
      <Wire d="M175 148 L175 180" stroke={ROSE} width={1.5} dash="4 3" />
      <Wire d="M145 180 L205 180" stroke={ROSE} width={1.5} />
      <L x={175} y={195} size={9} fill={MUTED}>balance point</L>

      {/* Radius of gyration ring */}
      <circle cx={175} cy={140} r={40} fill="none" stroke={PURP} strokeWidth={2} strokeDasharray="6 4" className="komm-pulse" />
      <L x={220} y={110} size={10} fill={PURP} anchor="start">k (radius of gyration)</L>
      <Wire d="M175 140 L215 140" stroke={PURP} width={1.5} />
      <L x={195} y={136} size={9} fill={PURP}>k</L>

      {/* ── Parallel axis theorem ── */}
      <Card x={360} y={20} w={250} h={200} title="Parallel Axis Theorem" accent={BLUE}>
        {/* Axis through G */}
        <Wire d="M30 70 L220 70" stroke={MUTED} width={1.5} dash="5 3" />
        <L x={225} y={74} size={9} fill={MUTED} anchor="start">G axis</L>
        {/* Shifted axis at small end */}
        <Wire d="M30 120 L220 120" stroke={AMBER} width={1.5} dash="5 3" />
        <L x={225} y={124} size={9} fill={AMBER} anchor="start">A axis</L>
        {/* Shift distance d */}
        <Wire d="M125 72 L125 118" stroke={N} width={1.5} marker="url(#komArr)" />
        <L x={135} y={98} size={10} fill={N} anchor="start">d</L>
        {/* Stacked bars */}
        <rect x={40} y={140} width={80} height={18} rx={4} fill={BLUE} opacity={0.7} />
        <L x={80} y={154} size={9} fill={WHITE}>I_G</L>
        <rect x={120} y={140} width={50} height={18} rx={4} fill={AMBER} opacity={0.7} className="komm-insert" />
        <L x={145} y={154} size={9} fill={WHITE}>m·d²</L>
        <M x={125} y={180} size={11} fill={N}>I_A = I_G + m·d²</M>
      </Card>

      {/* ── Comparison strip: disc, ring, rod ── */}
      <Card x={630} y={20} w={250} h={200} title="Same Mass, Different I" accent={TEAL}>
        {/* Disc */}
        <circle cx={55} cy={75} r={22} fill={TEAL} opacity={0.2} stroke={TEAL} strokeWidth={2} />
        <L x={55} y={80} size={9} fill={TEAL}>disc</L>
        {/* Ring */}
        <circle cx={125} cy={75} r={22} fill="none" stroke={GREEN} strokeWidth={4} />
        <L x={125} y={80} size={9} fill={GREEN}>ring</L>
        {/* Rod */}
        <Wire d="M175 55 L175 95" stroke={AMBER} width={5} />
        <L x={195} y={80} size={9} fill={AMBER} anchor="start">rod</L>
      </Card>
      <Bars x={660} y={260} w={180} items={[
        ['Disc ½mr²', 0.5, TEAL],
        ['Ring mr²', 1.0, GREEN],
        ['Rod ¹⁄₁₂ml²', 0.33, AMBER],
      ]} />

      {/* Equation beneath rod */}
      <M x={185} y={260} size={13} fill={N}>I_G = m·k²</M>
      <L x={185} y={280} size={10} fill={MUTED}>moment of inertia at G</L>
    </Scene>
  )
}

/* ── Unit 3 ── offset-inertia-force-equivalence ──────────────────── */
export function M4OffsetInertiaForceScene() {
  /* Left: force through CG + separate couple.  Arrow →  Right: single offset
     force.  Verification strip beneath. Sense indicator. */
  return (
    <Scene caption="Equivalent offset inertia force">
      {/* ── Left panel: two effects ── */}
      <Card x={20} y={20} w={370} h={195} title="Two Effects at G" accent={ROSE}>
        {/* Link */}
        <Wire d="M50 110 L280 110" stroke={N} width={5} />
        <Dot cx={165} cy={110} r={5} fill={ROSE} />
        <L x={165} y={100} size={10} fill={ROSE}>G</L>
        {/* Inertia force through G */}
        <Wire d="M165 110 L95 110" stroke={BLUE} width={2.5} marker="url(#komArrB)" className="komm-pulse" />
        <L x={120} y={97} size={10} fill={BLUE}>Fᵢ</L>
        {/* Inertia couple */}
        <Wire d="M210 95 A22 22 0 0 0 210 127" stroke={PURP} width={2.2} marker="url(#komArrP)" className="komm-wrap" />
        <L x={240} y={115} size={10} fill={PURP} anchor="start">Tᵢ = Iα</L>
        <L x={185} y={165} size={11} fill={MUTED} weight={700}>TWO separate effects</L>
      </Card>

      {/* Equivalence arrow */}
      <Wire d="M400 118 L440 118" stroke={GREEN} width={3} marker="url(#komArrG)" className="komm-shift" />
      <L x={420} y={106} size={10} fill={GREEN}>≡</L>

      {/* ── Right panel: single offset force ── */}
      <Card x={450} y={20} w={430} h={195} title="Single Offset Force" accent={GREEN}>
        {/* Link */}
        <Wire d="M50 110 L340 110" stroke={N} width={5} />
        <Dot cx={195} cy={110} r={5} fill={MUTED} />
        <L x={195} y={100} size={10} fill={MUTED}>G</L>
        {/* Offset force line — shifted down by h */}
        <Wire d="M195 140 L115 140" stroke={BLUE} width={2.5} marker="url(#komArrB)" className="komm-insert" />
        <L x={145} y={155} size={10} fill={BLUE}>Fᵢ (offset)</L>
        {/* Offset dimension h */}
        <Wire d="M195 112 L195 138" stroke={AMBER} width={1.5} dash="4 3" />
        <L x={205} y={128} size={10} fill={AMBER} anchor="start">h</L>
        {/* Equation */}
        <M x={300} y={165} size={12} fill={N}>h = Tᵢ / Fᵢ</M>
        <L x={300} y={180} size={10} fill={GREEN}>ONE effect replaces two</L>
      </Card>

      {/* ── Verification strip ── */}
      <Card x={20} y={240} w={530} h={120} title="Moment Check About G" accent={MUTED}>
        <M x={80} y={60} size={12} fill={ROSE} anchor="start">Left: M_G = Fᵢ·0 + Tᵢ = Tᵢ</M>
        <M x={80} y={85} size={12} fill={GREEN} anchor="start">Right: M_G = Fᵢ·h = Fᵢ·(Tᵢ/Fᵢ) = Tᵢ</M>
        <rect x={370} y={50} width={100} height={30} rx={6} fill={GREEN} opacity={0.15} />
        <M x={420} y={70} size={13} fill={GREEN} weight={800}>Equal ✓</M>
      </Card>

      {/* ── Sense indicator ── */}
      <Card x={570} y={240} w={310} h={120} title="Sense of Offset" accent={AMBER}>
        <L x={155} y={60} size={11} fill={N} weight={650}>Offset placed so moment</L>
        <L x={155} y={78} size={11} fill={AMBER} weight={800}>opposes angular acceleration α</L>
        <Wire d="M90 100 A18 18 0 0 1 126 100" stroke={AMBER} width={2} marker="url(#komArrA)" className="komm-wrap" />
        <L x={145} y={106} size={9} fill={AMBER} anchor="start">correct sense</L>
      </Card>
    </Scene>
  )
}

/* ── Unit 4 ── dynamic-four-bar-workflow ──────────────────────────── */
export function M4DynamicFourBarScene() {
  /* 4-stage left-to-right workflow: kinematics → inertia → free bodies → results */
  const stageW = 190; const stageH = 340; const gap = 18
  const sx = (i) => 25 + i * (stageW + gap)
  return (
    <Scene caption="Dynamic analysis of four-link mechanisms — workflow">
      {/* Stage headers */}
      {['1. Kinematics', '2. Inertia Forces', '3. Free Bodies', '4. Results'].map((t, i) => (
        <g key={t}>
          <rect x={sx(i)} y={18} width={stageW} height={28} rx={8} fill={[BLUE, ROSE, PURP, GREEN][i]} />
          <L x={sx(i) + stageW / 2} y={37} size={11} fill={WHITE} weight={800}>{t}</L>
        </g>
      ))}

      {/* Stage 1 — four-bar skeleton + polygons */}
      <g>
        <Wire d={`M${sx(0) + 30} 140 L${sx(0) + 100} 80 L${sx(0) + 160} 130 L${sx(0) + 160} 200 L${sx(0) + 30} 200 Z`} stroke={N} width={2} />
        <Dot cx={sx(0) + 30} cy={200} r={4} fill={N} />
        <Dot cx={sx(0) + 160} cy={200} r={4} fill={N} />
        {/* Velocity polygon hint */}
        <Wire d={`M${sx(0) + 40} 230 L${sx(0) + 90} 250 L${sx(0) + 70} 280`} stroke={BLUE} width={1.8} dash="5 3" />
        <L x={sx(0) + 55} y={300} size={9} fill={BLUE}>vel. polygon</L>
        {/* Acceleration polygon hint */}
        <Wire d={`M${sx(0) + 110} 230 L${sx(0) + 160} 260 L${sx(0) + 130} 290`} stroke={AMBER} width={1.8} dash="5 3" />
        <L x={sx(0) + 140} y={310} size={9} fill={AMBER}>acc. polygon</L>
        {/* CG accelerations extracted */}
        <L x={sx(0) + stageW / 2} y={340} size={9} fill={MUTED}>a_G₂, a_G₃ extracted</L>
      </g>

      {/* Flow arrow 1→2 */}
      <Wire d={`M${sx(0) + stageW + 2} 180 L${sx(1) - 2} 180`} stroke={MUTED} width={2} marker="url(#komArrM)" className="komm-shift" />

      {/* Stage 2 — links with inertia forces */}
      <g>
        {/* Link 2 */}
        <Wire d={`M${sx(1) + 30} 90 L${sx(1) + 120} 90`} stroke={N} width={4} />
        <Dot cx={sx(1) + 75} cy={90} r={4} fill={ROSE} />
        <Wire d={`M${sx(1) + 75} 90 L${sx(1) + 45} 90`} stroke={ROSE} width={2} marker="url(#komArrRo)" className="komm-pulse" />
        <L x={sx(1) + 75} y={78} size={9} fill={ROSE}>Fᵢ₂</L>
        {/* Link 3 */}
        <Wire d={`M${sx(1) + 30} 160 L${sx(1) + 150} 160`} stroke={N} width={4} />
        <Dot cx={sx(1) + 90} cy={160} r={4} fill={ROSE} />
        <Wire d={`M${sx(1) + 90} 160 L${sx(1) + 55} 160`} stroke={ROSE} width={2} marker="url(#komArrRo)" className="komm-pulse" />
        <L x={sx(1) + 90} y={148} size={9} fill={ROSE}>Fᵢ₃</L>
        {/* Inertia couples */}
        <Wire d={`M${sx(1) + 130} 80 A12 12 0 0 0 ${sx(1) + 130} 104`} stroke={PURP} width={1.8} marker="url(#komArrP)" className="komm-wrap" />
        <Wire d={`M${sx(1) + 160} 150 A12 12 0 0 0 ${sx(1) + 160} 174`} stroke={PURP} width={1.8} marker="url(#komArrP)" className="komm-wrap" />
        {/* Offset conversion note */}
        <L x={sx(1) + stageW / 2} y={220} size={9} fill={PURP}>offset conversion</L>
        <L x={sx(1) + stageW / 2} y={234} size={9} fill={MUTED}>applied to each link</L>
      </g>

      {/* Flow arrow 2→3 */}
      <Wire d={`M${sx(1) + stageW + 2} 180 L${sx(2) - 2} 180`} stroke={MUTED} width={2} marker="url(#komArrM)" className="komm-shift" />

      {/* Stage 3 — free body diagrams */}
      <g>
        {/* Simplified FBDs as boxes */}
        <Block x={sx(2) + 20} y={70} w={150} h={50} label="Link 2 FBD" stroke={PURP} className="komm-wave" />
        <Block x={sx(2) + 20} y={140} w={150} h={50} label="Link 3 FBD" stroke={PURP} className="komm-wave" />
        <Block x={sx(2) + 20} y={210} w={150} h={50} label="Link 4 FBD" stroke={PURP} className="komm-wave" />
        <L x={sx(2) + stageW / 2} y={290} size={9} fill={MUTED}>all forces incl. inertia</L>
      </g>

      {/* Flow arrow 3→4 */}
      <Wire d={`M${sx(2) + stageW + 2} 180 L${sx(3) - 2} 180`} stroke={MUTED} width={2} marker="url(#komArrM)" className="komm-shift" />

      {/* Stage 4 — results */}
      <g>
        {/* Pin forces */}
        <Block x={sx(3) + 10} y={70} w={170} h={40} label="Pin forces" stroke={GREEN} />
        {/* Input torque */}
        <Block x={sx(3) + 10} y={125} w={170} h={40} label="Input torque T₁₂" stroke={GREEN} />
        {/* Shaking force at frame */}
        <Wire d={`M${sx(3) + 95} 200 L${sx(3) + 95} 250`} stroke={RED} width={3} marker="url(#komArrR)" className="komm-wave" />
        <L x={sx(3) + 95} y={270} size={10} fill={RED}>Shaking Force</L>
        <L x={sx(3) + 95} y={285} size={9} fill={MUTED}>on frame</L>
        {/* Foundation vibration */}
        <rect x={sx(3) + 30} y={296} width={130} height={10} rx={3} fill={MUTED} opacity={0.3} />
        <Wave x={sx(3) + 30} y={320} w={130} amp={8} cycles={4} stroke={RED} width={1.5} className="komm-pulse" />
        <L x={sx(3) + 95} y={345} size={9} fill={RED}>vibration</L>
      </g>

      {/* Superposition note */}
      <M x={450} y={395} size={11} fill={MUTED}>Superposition: inertia contributions computed separately, then added</M>
    </Scene>
  )
}

/* ── Unit 5 ── piston-kinematics-curves ──────────────────────────── */
export function M4PistonKinematicsCurvesScene() {
  /* Slider-crank at top, three aligned plots (displacement, velocity, acceleration)
     against crank angle. Primary & secondary on acceleration plot. */
  const plotX = 200; const plotW = 640; const plotH = 80
  const yDisp = 170; const yVel = 275; const yAcc = 380

  /* Generate sinusoidal curve points for one revolution */
  function makeCurve(y0, amp1, amp2, phase1, phase2, steps) {
    const pts = []
    for (let i = 0; i <= (steps || 80); i++) {
      const theta = (i / (steps || 80)) * 2 * Math.PI
      const x = plotX + (i / (steps || 80)) * plotW
      const y = y0 - amp1 * Math.sin(theta + (phase1 || 0)) - amp2 * Math.sin(2 * theta + (phase2 || 0))
      pts.push([x, y])
    }
    return pts
  }

  /* Displacement: x = r(1 - cosθ) + r²/(2l)(1 - cos2θ) — inverted for plot */
  const dispPts = makeCurve(yDisp, -35, -8, Math.PI / 2, Math.PI / 2, 80)
  /* Velocity: v = rω(sinθ + (r/2l)sin2θ) */
  const velPts = makeCurve(yVel, 35, 8, 0, 0, 80)
  /* Acceleration: a = rω²(cosθ + (r/l)cos2θ) */
  const accPts = makeCurve(yAcc, 35, 12, Math.PI / 2, Math.PI / 2, 80)
  const accPrimary = makeCurve(yAcc, 35, 0, Math.PI / 2, 0, 80)
  const accSecondary = makeCurve(yAcc, 0, 12, 0, Math.PI / 2, 80)

  return (
    <Scene caption="Piston velocity and acceleration — primary and secondary components">
      {/* ── Slider-crank at top ── */}
      <circle cx={90} cy={70} r={35} fill="none" stroke={MUTED} strokeWidth={1.5} strokeDasharray="4 3" />
      <Wire d="M90 70 L120 45" stroke={BLUE} width={3} />
      <Dot cx={120} cy={45} r={4} fill={BLUE} />
      <Wire d="M120 45 L180 70" stroke={N} width={3} />
      <Dot cx={180} cy={70} r={4} fill={N} />
      <rect x={170} y={58} width={22} height={24} rx={3} fill={MUTED} opacity={0.3} stroke={N} strokeWidth={1.5} />
      <Wire d="M192 70 L220 70" stroke={MUTED} width={1.5} />
      <L x={90} y={116} size={10} fill={MUTED}>crank</L>
      <L x={150} y={38} size={10} fill={MUTED}>connecting rod</L>
      <L x={215} y={58} size={10} fill={MUTED}>piston</L>
      <Dot cx={90} cy={70} r={4} fill={N} />
      <Wire d="M55 95 L125 95" stroke={MUTED} width={1} />

      {/* ── Displacement plot ── */}
      <Axes x={plotX} y={yDisp} w={plotW} h={plotH} xLabel="" yLabel="x" />
      <Curve pts={dispPts} stroke={BLUE} width={2.2} className="komm-traverse" />
      <L x={plotX + plotW + 15} y={yDisp - plotH + 10} size={9} fill={BLUE} anchor="start">displacement</L>

      {/* Tick labels for 0, π, 2π */}
      <M x={plotX} y={n(yDisp) + 18} size={9} fill={MUTED}>0</M>
      <M x={plotX + plotW / 2} y={n(yDisp) + 18} size={9} fill={MUTED}>π</M>
      <M x={plotX + plotW} y={n(yDisp) + 18} size={9} fill={MUTED}>2π</M>

      {/* ── Velocity plot ── */}
      <Axes x={plotX} y={yVel} w={plotW} h={plotH} xLabel="" yLabel="v" />
      <Curve pts={velPts} stroke={GREEN} width={2.2} className="komm-traverse" />
      <L x={plotX + plotW + 15} y={yVel - plotH + 10} size={9} fill={GREEN} anchor="start">velocity</L>

      {/* ── Acceleration plot ── */}
      <Axes x={plotX} y={yAcc} w={plotW} h={plotH} xLabel="θ (crank angle)" yLabel="a" />
      <Curve pts={accPts} stroke={ROSE} width={2.5} className="komm-traverse" />
      <Curve pts={accPrimary} stroke={AMBER} width={1.5} dash="6 3" />
      <Curve pts={accSecondary} stroke={PURP} width={1.5} dash="4 3" />

      {/* Legend for primary/secondary */}
      <Wire d={`M${plotX + 10} ${yAcc - plotH - 15} L${plotX + 40} ${yAcc - plotH - 15}`} stroke={AMBER} width={1.5} dash="6 3" />
      <L x={plotX + 45} y={n(yAcc) - n(plotH) - 11} size={9} fill={AMBER} anchor="start">primary (cosθ)</L>
      <Wire d={`M${plotX + 150} ${yAcc - plotH - 15} L${plotX + 180} ${yAcc - plotH - 15}`} stroke={PURP} width={1.5} dash="4 3" />
      <L x={plotX + 185} y={n(yAcc) - n(plotH) - 11} size={9} fill={PURP} anchor="start">secondary (cos2θ)</L>

      {/* Dead-centre peak annotations */}
      <L x={plotX + 5} y={n(yAcc) - n(plotH) - 30} size={10} fill={ROSE} anchor="start">IDC: larger peak</L>
      <Wire d={`M${plotX} ${yAcc - plotH + 5} L${plotX} ${yAcc - plotH - 22}`} stroke={ROSE} width={1} dash="3 2" />
      <L x={plotX + plotW - 5} y={n(yAcc) - n(plotH) - 30} size={10} fill={MUTED} anchor="end">ODC: smaller peak</L>
      <Wire d={`M${plotX + plotW / 2} ${yAcc - plotH + 15} L${plotX + plotW / 2} ${yAcc - plotH - 22}`} stroke={MUTED} width={1} dash="3 2" />

      <M x={plotX + plotW / 2} y={n(yAcc) + 35} size={10} fill={MUTED}>Secondary adds at IDC, subtracts at ODC</M>
    </Scene>
  )
}

/* ── Unit 6 ── two-mass-equivalence-three-conditions ─────────────── */
export function M4TwoMassEquivalenceScene() {
  /* Rod at top; two candidate replacements below.
     First: all three conditions ticked but awkward position.
     Second: masses at pin centres, third condition crossed, correction couple. */
  return (
    <Scene caption="Equivalent dynamic system — two-mass replacement">
      {/* ── Connecting rod ── */}
      <L x={140} y={30} size={12} fill={N} weight={800}>Connecting Rod</L>
      <Wire d="M40 60 Q100 40 240 45 Q300 48 340 60" stroke={N} width={5} />
      <Dot cx={40} cy={60} r={6} fill={BLUE} />
      <Dot cx={340} cy={60} r={6} fill={BLUE} />
      <Dot cx={180} cy={48} r={5} fill={ROSE} />
      <L x={180} y={38} size={9} fill={ROSE}>G</L>
      <L x={28} y={77} size={9} fill={MUTED} anchor="start">big end</L>
      <L x={352} y={77} size={9} fill={MUTED} anchor="start">small end</L>
      <Panel x={390} y={20} w={200} title="Three Properties" rows={[
        ['Total mass', 'm', BLUE],
        ['CG position', 'at G', ROSE],
        ['Inertia I_G', 'mk²', PURP],
      ]} accent={N} />

      {/* ── Replacement 1: exact, awkward ── */}
      <Card x={20} y={110} w={420} h={165} title="Replacement 1 — Exact" accent={GREEN}>
        <Wire d="M40 80 L330 80" stroke={MUTED} width={2} dash="5 3" />
        <Dot cx={40} cy={80} r={8} fill={BLUE} />
        <L x={40} y={68} size={9} fill={BLUE}>m₁</L>
        <Dot cx={250} cy={80} r={8} fill={BLUE} />
        <L x={250} y={68} size={9} fill={BLUE}>m₂</L>
        {/* Ticks for three conditions */}
        <M x={340} y={60} size={11} fill={GREEN}>☑ mass</M>
        <M x={340} y={78} size={11} fill={GREEN}>☑ CG</M>
        <M x={340} y={96} size={11} fill={GREEN}>☑ inertia</M>
        {/* Awkward position note */}
        <Dot cx={330} cy={80} r={5} fill={RED} stroke={RED} />
        <L x={315} y={110} size={10} fill={RED}>m₂ beyond small end</L>
        <rect x={250} y={120} width={140} height={22} rx={5} fill={RED} opacity={0.1} />
        <L x={320} y={136} size={10} fill={RED} weight={800}>⚠ Inconvenient</L>
      </Card>

      {/* ── Replacement 2: at pins, correction couple ── */}
      <Card x={20} y={290} w={420} h={175} title="Replacement 2 — At Pins" accent={AMBER}>
        <Wire d="M40 80 L330 80" stroke={MUTED} width={2} dash="5 3" />
        <Dot cx={40} cy={80} r={8} fill={AMBER} />
        <L x={40} y={68} size={9} fill={AMBER}>m₁</L>
        <Dot cx={330} cy={80} r={8} fill={AMBER} />
        <L x={330} y={68} size={9} fill={AMBER}>m₂</L>
        <L x={40} y={98} size={8} fill={MUTED}>big-end pin</L>
        <L x={330} y={98} size={8} fill={MUTED}>small-end pin</L>
        {/* Condition boxes */}
        <M x={370} y={60} size={11} fill={GREEN}>☑ mass</M>
        <M x={370} y={78} size={11} fill={GREEN}>☑ CG</M>
        <M x={370} y={96} size={11} fill={RED}>☒ inertia</M>
        {/* Correction couple */}
        <Wire d="M150 120 A20 20 0 0 1 190 120" stroke={PURP} width={2.5} marker="url(#komArrP)" className="komm-wrap" />
        <L x={170} y={145} size={10} fill={PURP}>Correction couple</L>
        <M x={170} y={160} size={11} fill={PURP}>ΔT = (I_actual − I_req)·α</M>
      </Card>

      {/* ── Summary ── */}
      <Card x={480} y={110} w={400} h={145} title="Conditions Summary" accent={PURP}>
        <L x={200} y={60} size={11} fill={N} weight={650}>3 conditions, 4 unknowns</L>
        <L x={200} y={80} size={11} fill={N} weight={650}>(2 masses + 2 positions)</L>
        <L x={200} y={102} size={11} fill={AMBER} weight={800}>Over-determined → compromise</L>
        <L x={200} y={122} size={11} fill={PURP} weight={650}>Place at pins → add correction couple</L>
      </Card>

      <Panel x={480} y={290} w={400} title="Correction Couple" rows={[
        ['Required I_G', 'mk²', PURP],
        ['Achieved I_G\'', 'm₁l₁² + m₂l₂²', AMBER],
        ['Couple = (I_G\' − I_G)·α', '', RED],
      ]} accent={PURP} />
    </Scene>
  )
}

/* ── Unit 7 ── rotating-versus-reciprocating-inertia ─────────────── */
export function M4RotatingVsReciprocatingScene() {
  /* Left: rotating mass at crankpin, counterweight cancels.
     Right: reciprocating mass, oscillating force, partial counterweight trade-off. */
  return (
    <Scene caption="Rotating vs reciprocating inertia forces">
      {/* ── Left panel: rotating mass ── */}
      <Card x={15} y={15} w={420} h={280} title="Rotating Mass" accent={BLUE}>
        {/* Crank circle */}
        <circle cx={130} cy={140} r={60} fill="none" stroke={MUTED} strokeWidth={1.5} strokeDasharray="5 3" />
        <Dot cx={130} cy={140} r={4} fill={N} />
        {/* Crankpin mass rotating */}
        <g className="komm-wrap">
          <Wire d="M130 140 L190 140" stroke={BLUE} width={3} />
          <Dot cx={190} cy={140} r={8} fill={BLUE} />
          <L x={200} y={132} size={9} fill={BLUE} anchor="start">m_r</L>
          {/* Inertia force outward */}
          <Wire d="M192 140 L230 140" stroke={ROSE} width={2.2} marker="url(#komArrRo)" />
        </g>
        {/* Counterweight */}
        <Dot cx={70} cy={140} r={10} fill={GREEN} opacity={0.6} />
        <L x={48} y={144} size={9} fill={GREEN} anchor="end">CW</L>
        <Wire d="M68 140 L38 140" stroke={GREEN} width={2} marker="url(#komArrG)" />
        {/* Result */}
        <rect x={80} y={220} width={110} height={24} rx={6} fill={GREEN} opacity={0.15} />
        <M x={135} y={236} size={11} fill={GREEN} weight={800}>Resultant = 0 ✓</M>
        <L x={210} y={258} size={10} fill={MUTED}>Completely balanced</L>
      </Card>

      {/* ── Right panel: reciprocating mass ── */}
      <Card x={460} y={15} w={420} h={280} title="Reciprocating Mass" accent={AMBER}>
        {/* Cylinder axis */}
        <Wire d="M60 120 L340 120" stroke={MUTED} width={1.5} dash="5 3" />
        {/* Piston block */}
        <rect x={260} y={108} width={30} height={24} rx={4} fill={AMBER} opacity={0.3} stroke={AMBER} strokeWidth={1.5} />
        <L x={275} y={100} size={9} fill={AMBER}>m_rec</L>
        {/* Oscillating inertia force */}
        <Wire d="M292 120 L350 120" stroke={ROSE} width={2.5} marker="url(#komArrRo)" className="komm-shift" />
        <L x={330} y={108} size={9} fill={ROSE}>Fᵢ(θ)</L>
        {/* Primary + secondary curves */}
        <Axes x={60} y={210} w={280} h={50} xLabel="θ" yLabel="F" />
        <Wave x={60} y={210} w={280} amp={20} cycles={1} stroke={AMBER} width={1.8} />
        <Wave x={60} y={210} w={280} amp={8} cycles={2} stroke={PURP} width={1.2} dash="4 3" />
        <L x={350} y={200} size={9} fill={AMBER} anchor="start">primary</L>
        <L x={350} y={216} size={9} fill={PURP} anchor="start">secondary</L>
        {/* Attempted counterweight */}
        <L x={210} y={256} size={10} fill={RED} weight={700}>CW partly cancels primary</L>
        <L x={210} y={272} size={10} fill={RED} weight={700}>but introduces transverse force</L>
      </Card>

      {/* Trade-off annotation */}
      <Card x={150} y={320} w={600} h={80} title="Trade-off" accent={RED}>
        <L x={300} y={55} size={11} fill={N} weight={650}>Rotating counterweight for reciprocating mass reduces axial force</L>
        <L x={300} y={72} size={11} fill={RED} weight={800}>but creates an equal transverse component — a design compromise</L>
      </Card>
    </Scene>
  )
}

/* ── Unit 8 ── gas-plus-inertia-net-force ────────────────────────── */
export function M4GasPlusInertiaScene() {
  /* Three aligned plots (gas force, inertia force, net) over 4-stroke (720°).
     Speed slider concept with annotation. */
  const pX = 120; const pW = 700; const pH = 70

  function gasCurve(y0) {
    const pts = []
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      const deg = t * 720
      let v = 0
      if (deg < 30) v = deg / 30 * 60          /* compression end → ignition */
      else if (deg < 80) v = 60 * Math.exp(-(deg - 30) / 25)  /* power stroke peak */
      else if (deg < 180) v = 5                 /* exhaust */
      else if (deg < 360) v = -3                /* exhaust stroke */
      else if (deg < 540) v = -5                /* suction stroke */
      else v = -8 + 8 * ((deg - 540) / 180)     /* compression */
      pts.push([pX + t * pW, y0 - v])
    }
    return pts
  }

  function inertiaCurve(y0, amp) {
    const pts = []
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      const theta = t * 4 * Math.PI  /* 720° = 4π */
      const v = amp * (Math.cos(theta) + 0.28 * Math.cos(2 * theta))
      pts.push([pX + t * pW, y0 - v])
    }
    return pts
  }

  const y1 = 140; const y2 = 265; const y3 = 390

  return (
    <Scene caption="Gas force + inertia force = net piston force">
      {/* Titles */}
      <L x={55} y={n(y1) - 5} size={11} fill={BLUE} anchor="end">Gas</L>
      <L x={55} y={n(y1) + 10} size={11} fill={BLUE} anchor="end">force</L>
      <L x={55} y={n(y2) - 5} size={11} fill={ROSE} anchor="end">Inertia</L>
      <L x={55} y={n(y2) + 10} size={11} fill={ROSE} anchor="end">force</L>
      <L x={55} y={n(y3) - 5} size={11} fill={GREEN} anchor="end">Net</L>
      <L x={55} y={n(y3) + 10} size={11} fill={GREEN} anchor="end">force</L>

      {/* Plot 1: gas force */}
      <Axes x={pX} y={y1} w={pW} h={pH} xLabel="" yLabel="" />
      <Curve pts={gasCurve(y1)} stroke={BLUE} width={2.2} className="komm-traverse" />
      <L x={pX + 55} y={n(y1) - n(pH) - 8} size={9} fill={BLUE} anchor="start">power stroke peak</L>

      {/* Plot 2: reciprocating inertia force */}
      <Axes x={pX} y={y2} w={pW} h={pH} xLabel="" yLabel="" />
      <Curve pts={inertiaCurve(y2, 30)} stroke={ROSE} width={2.2} className="komm-traverse" />

      {/* Plot 3: net = gas + inertia */}
      <Axes x={pX} y={y3} w={pW} h={pH} xLabel="θ (crank angle, 720° = 4-stroke)" yLabel="" />
      {(() => {
        const gas = gasCurve(y3)
        const inertia = inertiaCurve(y3, 30)
        const net = gas.map(([gx, gy], i) => {
          const iy = inertia[i][1]
          return [gx, y3 - ((y3 - gy) + (y3 - iy))]
        })
        return <Curve pts={net} stroke={GREEN} width={2.8} className="komm-traverse" />
      })()}

      {/* Angle ticks */}
      {[0, 180, 360, 540, 720].map((deg, i) => (
        <M key={deg} x={pX + (deg / 720) * pW} y={n(y3) + 20} size={9} fill={MUTED}>{deg}°</M>
      ))}

      {/* Speed annotation */}
      <Card x={pX + pW - 240} y={18} w={240} h={85} title="Speed Effect" accent={AMBER}>
        <L x={120} y={55} size={10} fill={N} weight={650}>Higher speed → larger inertia</L>
        <L x={120} y={72} size={10} fill={AMBER} weight={800}>Inertia relieves peak gas load</L>
      </Card>

      {/* TDC annotation */}
      <Wire d={`M${pX} ${y3 + 25} L${pX} ${y3 + 38}`} stroke={MUTED} width={1} />
      <L x={pX} y={n(y3) + 48} size={8} fill={MUTED}>TDC</L>
    </Scene>
  )
}

/* ── Unit 9 ── engine-force-path-to-torque ───────────────────────── */
export function M4EngineForcePathScene() {
  /* Single cylinder engine section with force path in 4 stages.
     Torque plot beneath against crank angle. */
  return (
    <Scene caption="Bearing loads and crankshaft torque — force path">
      {/* ── Engine schematic ── */}
      {/* Cylinder wall */}
      <rect x={340} y={30} width={60} height={160} rx={3} fill={SKY} stroke={MUTED} strokeWidth={1.5} />
      {/* Piston */}
      <rect x={345} y={40} width={50} height={30} rx={4} fill={MUTED} opacity={0.4} stroke={N} strokeWidth={2} />
      <L x={370} y={26} size={10} fill={BLUE}>F_net</L>
      <Wire d="M370 25 L370 38" stroke={BLUE} width={2.5} marker="url(#komArrB)" className="komm-pulse" />

      {/* Stage 1 label */}
      <rect x={420} y={32} width={120} height={22} rx={5} fill={BLUE} opacity={0.12} />
      <L x={480} y={47} size={9} fill={BLUE}>① Net piston force</L>

      {/* Gudgeon pin */}
      <Dot cx={370} cy={80} r={5} fill={AMBER} />
      <L x={405} y={84} size={9} fill={AMBER} anchor="start">gudgeon pin</L>

      {/* Stage 2: resolution at gudgeon pin */}
      <Wire d="M370 82 L370 130" stroke={GREEN} width={2} marker="url(#komArrG)" />
      <L x={388} y={110} size={9} fill={GREEN} anchor="start">rod thrust</L>
      <Wire d="M370 82 L340 82" stroke={RED} width={2} marker="url(#komArrR)" />
      <L x={328} y={76} size={9} fill={RED} anchor="end">side thrust</L>
      <rect x={420} y={68} width={140} height={22} rx={5} fill={GREEN} opacity={0.12} />
      <L x={490} y={83} size={9} fill={GREEN}>② Resolve at gudgeon</L>

      {/* Connecting rod */}
      <Wire d="M370 130 L300 220" stroke={N} width={3} />

      {/* Stage 3: along the rod */}
      <rect x={420} y={130} width={140} height={22} rx={5} fill={PURP} opacity={0.12} />
      <L x={490} y={145} size={9} fill={PURP}>③ Along the rod</L>

      {/* Crankpin */}
      <Dot cx={300} cy={220} r={6} fill={ROSE} />
      <L x={260} y={218} size={9} fill={ROSE} anchor="end">crankpin</L>

      {/* Stage 4: resolve at crankpin */}
      <Wire d="M300 222 L250 222" stroke={TEAL} width={2} marker="url(#komArrT)" />
      <L x={235} y={236} size={9} fill={TEAL} anchor="end">radial</L>
      <Wire d="M300 222 L300 270" stroke={AMBER} width={2.5} marker="url(#komArrA)" className="komm-pulse" />
      <L x={316} y={258} size={9} fill={AMBER} anchor="start">tangential</L>
      <rect x={420} y={200} width={160} height={22} rx={5} fill={AMBER} opacity={0.12} />
      <L x={500} y={215} size={9} fill={AMBER}>④ Resolve at crankpin</L>

      {/* Crank arm to centre */}
      <Wire d="M300 220 L250 280" stroke={MUTED} width={2} />
      <Dot cx={250} cy={280} r={5} fill={N} />
      <L x={230} y={290} size={9} fill={N} anchor="end">crank centre</L>

      {/* Moment arm dimensioned */}
      <Wire d="M252 278 L298 222" stroke={AMBER} width={1} dash="4 3" />
      <L x={285} y={255} size={9} fill={AMBER}>r (arm)</L>

      {/* Bearing load annotations */}
      <Panel x={560} y={30} w={310} title="Bearing Loads" rows={[
        ['Gudgeon pin', 'F_rod + F_side', AMBER],
        ['Crankpin', 'F_rad + F_tan', ROSE],
        ['Main bearing', 'from crank equil.', MUTED],
      ]} accent={N} />

      {/* Highlight tangential = crank effort */}
      <Card x={560} y={175} w={310} h={65} title="Crank Effort" accent={AMBER}>
        <M x={155} y={52} size={12} fill={AMBER}>T = F_tan × r</M>
      </Card>

      {/* ── Torque plot ── */}
      <Axes x={80} y={430} w={430} h={100} xLabel="θ (4-stroke, 720°)" yLabel="T" />
      {(() => {
        const pts = []
        for (let i = 0; i <= 100; i++) {
          const t = i / 100; const deg = t * 720
          let v = 0
          if (deg < 60) v = 10 + 70 * Math.sin((deg / 60) * Math.PI)
          else if (deg < 180) v = 10 * Math.cos(((deg - 60) / 120) * Math.PI)
          else if (deg < 360) v = -10
          else if (deg < 540) v = -8
          else v = -15 + 10 * Math.sin(((deg - 540) / 180) * Math.PI)
          pts.push([80 + t * 430, 430 - v])
        }
        return <Curve pts={pts} stroke={AMBER} width={2.2} className="komm-traverse" />
      })()}
      <L x={160} y={325} size={9} fill={AMBER}>power stroke</L>
      <L x={350} y={445} size={9} fill={MUTED}>compression</L>

      {/* Mean torque line */}
      <Wire d="M80 420 L510 420" stroke={MUTED} width={1.5} dash="6 3" />
      <L x={520} y={424} size={9} fill={MUTED} anchor="start">mean T</L>
    </Scene>
  )
}

/* ── Unit 10 ── turning-moment-diagram-with-mean-line ────────────── */
export function M4TurningMomentDiagramScene() {
  /* TMD over 720° for single-cylinder 4-stroke. Mean line, surplus/deficit
     shading, speed trace beneath. */
  const pX = 80; const pW = 700; const pY = 230; const pH = 160

  function tmCurve() {
    const pts = []
    for (let i = 0; i <= 120; i++) {
      const t = i / 120; const deg = t * 720
      let v = 0
      if (deg < 60) v = 15 + 120 * Math.sin((deg / 60) * Math.PI)
      else if (deg < 180) v = 15 * Math.cos(((deg - 60) / 120) * Math.PI)
      else if (deg < 360) v = -15 - 5 * Math.sin(((deg - 180) / 180) * Math.PI)
      else if (deg < 540) v = -12 - 3 * Math.sin(((deg - 360) / 180) * Math.PI)
      else v = -18 + 8 * Math.sin(((deg - 540) / 180) * Math.PI)
      pts.push([pX + t * pW, pY - v])
    }
    return pts
  }

  const meanY = pY - 12  /* mean torque line level */

  return (
    <Scene caption="Turning moment diagram — single cylinder, four stroke">
      <L x={450} y={28} size={14} fill={N} weight={800}>Turning Moment Diagram</L>
      <L x={450} y={46} size={10} fill={MUTED}>Four-stroke single cylinder engine (720°)</L>

      {/* Axes */}
      <Axes x={pX} y={pY} w={pW} h={pH} xLabel="θ (crank angle)" yLabel="T" />

      {/* Torque curve */}
      <Curve pts={tmCurve()} stroke={BLUE} width={2.5} className="komm-traverse" />

      {/* Mean torque line */}
      <Wire d={`M${pX} ${meanY} L${pX + pW} ${meanY}`} stroke={ROSE} width={2} dash="8 4" />
      <L x={pX + pW + 8} y={meanY + 4} size={10} fill={ROSE} anchor="start">T_mean</L>

      {/* Surplus region shading (power stroke) */}
      <rect x={pX + 2} y={n(pY) - 130} width={100} height={118} rx={0} fill={GREEN} opacity={0.12} />
      <L x={pX + 52} y={n(pY) - 135} size={10} fill={GREEN}>surplus</L>

      {/* Deficit region shading */}
      <rect x={pX + 120} y={meanY} width={170} height={28} rx={0} fill={RED} opacity={0.1} />
      <L x={pX + 205} y={n(meanY) + 44} size={10} fill={RED}>deficit</L>

      {/* Area balance indicator */}
      <Card x={600} y={60} w={260} h={80} title="Area Balance" accent={GREEN}>
        <L x={130} y={55} size={11} fill={N} weight={650}>Σ surplus area = Σ deficit area</L>
        <M x={130} y={72} size={11} fill={GREEN} weight={800}>Energy in = Energy out ✓</M>
      </Card>

      {/* Loop labels */}
      <L x={pX + 35} y={n(pY) - 70} size={9} fill={BLUE}>power</L>
      <L x={pX + 195} y={n(pY) + 15} size={9} fill={MUTED}>exhaust</L>
      <L x={pX + 380} y={n(pY) + 15} size={9} fill={MUTED}>suction</L>
      <L x={pX + 545} y={n(pY) + 15} size={9} fill={MUTED}>compression</L>

      {/* Angle ticks */}
      {[0, 180, 360, 540, 720].map(deg => (
        <M key={deg} x={pX + (deg / 720) * pW} y={pY + 18} size={9} fill={MUTED}>{deg}°</M>
      ))}

      {/* ── Speed trace beneath ── */}
      <Axes x={pX} y={420} w={pW} h={50} xLabel="" yLabel="ω" />
      {(() => {
        const pts = []
        for (let i = 0; i <= 120; i++) {
          const t = i / 120; const deg = t * 720
          let v = 0
          if (deg < 100) v = 20 * Math.sin((deg / 100) * Math.PI)
          else if (deg < 360) v = -5
          else if (deg < 540) v = -4
          else v = -8 + 6 * Math.sin(((deg - 540) / 180) * Math.PI)
          pts.push([pX + t * pW, 420 - v])
        }
        return <Curve pts={pts} stroke={AMBER} width={2} className="komm-traverse" />
      })()}
      <L x={pX + pW + 8} y={400} size={9} fill={AMBER} anchor="start">speeds up</L>
      <L x={pX + pW + 8} y={430} size={9} fill={AMBER} anchor="start">slows down</L>
      <Wire d={`M${pX} 420 L${pX + pW} 420`} stroke={MUTED} width={1} dash="5 3" />
      <L x={pX - 8} y={424} size={9} fill={MUTED} anchor="end">ω_mean</L>
    </Scene>
  )
}

/* ── Unit 11 ── energy-accumulation-table ────────────────────────── */
export function M4EnergyAccumulationScene() {
  /* TMD at top with crossings numbered. Running energy table/curve beneath.
     Max and min lines with gap = max fluctuation. */
  const pX = 60; const pW = 500; const pY = 150; const pH = 90

  function tmCurve() {
    const pts = []
    for (let i = 0; i <= 100; i++) {
      const t = i / 100; const deg = t * 720
      let v = 0
      if (deg < 60) v = 15 + 80 * Math.sin((deg / 60) * Math.PI)
      else if (deg < 180) v = 15 * Math.cos(((deg - 60) / 120) * Math.PI)
      else if (deg < 360) v = -12
      else if (deg < 540) v = -10
      else v = -15 + 8 * Math.sin(((deg - 540) / 180) * Math.PI)
      pts.push([pX + t * pW, pY - v])
    }
    return pts
  }

  /* Crossing points of mean line (approx) */
  const crossings = [
    { id: 'A', deg: 0 },
    { id: 'B', deg: 95 },
    { id: 'C', deg: 175 },
    { id: 'D', deg: 360 },
    { id: 'E', deg: 540 },
    { id: 'F', deg: 720 },
  ]
  const meanY = pY - 8

  /* Running energy values (cumulative) */
  const energyVals = [0, 45, 30, 10, -5, 0]
  const eMax = 45; const eMin = -5
  const ePX = 60; const ePW = 500; const ePY = 380; const ePH = 100

  return (
    <Scene caption="Fluctuation of energy — running accumulation">
      <L x={300} y={26} size={13} fill={N} weight={800}>Energy Accumulation from TMD</L>

      {/* TMD plot */}
      <Axes x={pX} y={pY} w={pW} h={pH} xLabel="" yLabel="T" />
      <Curve pts={tmCurve()} stroke={BLUE} width={2.2} />
      <Wire d={`M${pX} ${meanY} L${pX + pW} ${meanY}`} stroke={ROSE} width={1.5} dash="6 3" />
      <L x={pX + pW + 8} y={meanY + 4} size={9} fill={ROSE} anchor="start">T_mean</L>

      {/* Crossing labels */}
      {crossings.map((c) => (
        <g key={c.id}>
          <Dot cx={pX + (c.deg / 720) * pW} cy={meanY} r={4} fill={AMBER} />
          <L x={pX + (c.deg / 720) * pW} y={meanY + 18} size={10} fill={AMBER}>{c.id}</L>
        </g>
      ))}

      {/* ── Running energy table ── */}
      <Panel x={590} y={35} w={290} title="Running Energy" rows={
        crossings.map((c, i) => [
          `${c.id} (${c.deg}°)`,
          `${energyVals[i] >= 0 ? '+' : ''}${energyVals[i]} J`,
          energyVals[i] === eMax ? GREEN : energyVals[i] === eMin ? RED : MUTED
        ])
      } accent={AMBER} />

      {/* ── Running energy curve ── */}
      <Axes x={ePX} y={ePY} w={ePW} h={ePH} xLabel="θ" yLabel="ΔE" />
      {(() => {
        const pts = crossings.map((c, i) => [
          ePX + (c.deg / 720) * ePW,
          ePY - (energyVals[i] / (eMax - eMin)) * ePH * 0.8
        ])
        return <Curve pts={pts} stroke={GREEN} width={2.5} className="komm-traverse" />
      })()}

      {/* Max and min horizontal lines */}
      {(() => {
        const yMax = ePY - (eMax / (eMax - eMin)) * ePH * 0.8
        const yMin = ePY - (eMin / (eMax - eMin)) * ePH * 0.8
        return (
          <g>
            <Wire d={`M${ePX} ${yMax} L${ePX + ePW} ${yMax}`} stroke={GREEN} width={1.2} dash="5 3" />
            <L x={ePX + ePW + 8} y={yMax + 4} size={9} fill={GREEN} anchor="start">E_max</L>
            <Wire d={`M${ePX} ${yMin} L${ePX + ePW} ${yMin}`} stroke={RED} width={1.2} dash="5 3" />
            <L x={ePX + ePW + 8} y={yMin + 4} size={9} fill={RED} anchor="start">E_min</L>
            {/* Gap dimensioning */}
            <Wire d={`M${ePX + ePW + 60} ${yMax} L${ePX + ePW + 60} ${yMin}`} stroke={PURP} width={2} marker="url(#komArrP)" />
            <Wire d={`M${ePX + ePW + 60} ${yMin} L${ePX + ePW + 60} ${yMax}`} stroke={PURP} width={2} marker="url(#komArrP)" />
            <L x={ePX + ePW + 75} y={(yMax + yMin) / 2 + 4} size={10} fill={PURP} anchor="start">ΔE_max</L>
          </g>
        )
      })()}

      {/* Note about datum */}
      <L x={300} y={450} size={10} fill={MUTED}>Datum choice does not affect ΔE_max = E_max − E_min</L>
    </Scene>
  )
}

/* ── Unit 12 ── coefficient-of-fluctuation-scale ─────────────────── */
export function M4CoefficientOfFluctuationScene() {
  /* Horizontal scale of C_s from 1/50 to 1/3000. Application markers with
     speed traces. Flywheel size indicator. */
  const apps = [
    { name: 'Crushing', cs: '1/50', x: 100, trace: 18 },
    { name: 'Punching', cs: '1/100', x: 230, trace: 14 },
    { name: 'Pumps', cs: '1/150', x: 350, trace: 10 },
    { name: 'Machine tools', cs: '1/300', x: 480, trace: 6 },
    { name: 'Textile looms', cs: '1/500', x: 600, trace: 4 },
    { name: 'AC generators', cs: '1/3000', x: 740, trace: 1 },
  ]
  const scaleY = 220

  return (
    <Scene caption="Coefficient of fluctuation of speed — application scale">
      <L x={450} y={30} size={14} fill={N} weight={800}>Coefficient of Fluctuation C_s</L>
      <M x={450} y={50} size={12} fill={MUTED}>C_s = (ω_max − ω_min) / ω_mean</M>

      {/* Horizontal scale bar */}
      <Wire d={`M70 ${scaleY} L800 ${scaleY}`} stroke={MUTED} width={3} />
      <L x={70} y={scaleY + 25} size={10} fill={MUTED} anchor="start">large C_s</L>
      <L x={800} y={scaleY + 25} size={10} fill={MUTED} anchor="end">small C_s</L>
      <Wire d={`M70 ${scaleY - 5} L70 ${scaleY + 5}`} stroke={MUTED} width={2} />
      <Wire d={`M800 ${scaleY - 5} L800 ${scaleY + 5}`} stroke={MUTED} width={2} />

      {/* Application markers with speed traces above */}
      {apps.map((a, i) => {
        const col = [RED, AMBER, AMBER, GREEN, TEAL, BLUE][i]
        return (
          <g key={a.name}>
            {/* Marker dot */}
            <Dot cx={a.x} cy={scaleY} r={6} fill={col} />
            {/* Labels below */}
            <L x={a.x} y={scaleY + 42} size={9} fill={col}>{a.name}</L>
            <M x={a.x} y={scaleY + 56} size={9} fill={MUTED}>{a.cs}</M>
            {/* Speed trace above — ragged to flat */}
            <Wave x={n(a.x) - 40} y={scaleY - 65} w={80} amp={a.trace} cycles={3} stroke={col} width={1.5} />
            {/* Mean speed line */}
            <Wire d={`M${n(a.x) - 40} ${scaleY - 65} L${n(a.x) + 40} ${scaleY - 65}`} stroke={MUTED} width={0.8} dash="3 3" />
          </g>
        )
      })}

      {/* ── Flywheel size indicator ── */}
      <L x={450} y={310} size={12} fill={PURP} weight={800}>Flywheel Size vs. C_s</L>
      {/* Small flywheel at left (large C_s) */}
      <circle cx={150} cy={390} r={22} fill="none" stroke={PURP} strokeWidth={3} />
      <Dot cx={150} cy={390} r={4} fill={PURP} />
      <L x={150} y={425} size={9} fill={PURP}>small flywheel</L>
      <L x={150} y={438} size={9} fill={MUTED}>large C_s OK</L>

      {/* Arrow showing growth */}
      <Wire d="M185 390 L600 390" stroke={PURP} width={2} marker="url(#komArrP)" className="komm-shift" />
      <L x={400} y={380} size={10} fill={PURP}>flywheel grows →</L>

      {/* Large flywheel at right (small C_s) */}
      <circle cx={680} cy={390} r={55} fill="none" stroke={PURP} strokeWidth={4} className="komm-pulse" />
      <Dot cx={680} cy={390} r={5} fill={PURP} />
      <L x={680} y={455} size={9} fill={PURP}>large flywheel</L>
      <L x={680} y={468} size={9} fill={MUTED}>small C_s needed</L>

      <L x={450} y={488} size={10} fill={MUTED}>Inverse relationship: tighter speed → bigger flywheel</L>
    </Scene>
  )
}

/* ── Unit 13 ── flywheel-sizing-chain ────────────────────────────── */
export function M4FlywheelSizingChainScene() {
  /* 4-stage chain: TMD → C_s selection → sizing relation → flywheel dimensions.
     Two alternative flywheels (large-light vs small-heavy). */
  const stX = (i) => 15 + i * 220
  const stW = 200; const stH = 220
  return (
    <Scene caption="Flywheel sizing — from energy fluctuation to inertia">
      {/* Stage headers */}
      {['1. TMD', '2. C_s Selection', '3. Sizing Equation', '4. Flywheel Design'].map((t, i) => (
        <g key={t}>
          <rect x={stX(i)} y={16} width={stW} height={26} rx={7} fill={[BLUE, AMBER, PURP, GREEN][i]} />
          <L x={stX(i) + stW / 2} y={34} size={10} fill={WHITE} weight={800}>{t}</L>
        </g>
      ))}

      {/* Stage 1: TMD with ΔE_max */}
      <g>
        <Axes x={stX(0) + 10} y={140} w={180} h={70} xLabel="" yLabel="T" />
        {(() => {
          const pts = []
          for (let i = 0; i <= 40; i++) {
            const t = i / 40
            const v = 50 * Math.sin(t * Math.PI * 2) * Math.exp(-t * 0.5) + 10
            pts.push([stX(0) + 10 + t * 180, 140 - v])
          }
          return <Curve pts={pts} stroke={BLUE} width={1.8} />
        })()}
        <Wire d={`M${stX(0) + 10} 130 L${stX(0) + 190} 130`} stroke={ROSE} width={1} dash="4 3" />
        <rect x={stX(0) + 30} y={160} width={140} height={24} rx={6} fill={BLUE} opacity={0.1} />
        <M x={stX(0) + 100} y={177} size={10} fill={BLUE} weight={800}>ΔE_max extracted</M>
        <L x={stX(0) + 100} y={210} size={10} fill={MUTED}>from area diff.</L>
      </g>

      {/* Flow arrow 1→2 */}
      <Wire d={`M${stX(0) + stW + 2} 130 L${stX(1) - 2} 130`} stroke={MUTED} width={2} marker="url(#komArrM)" className="komm-shift" />

      {/* Stage 2: C_s from application table */}
      <g>
        <Panel x={stX(1) + 10} y={55} w={180} title="Application" rows={[
          ['Punching', '1/100'],
          ['Machine tool', '1/300'],
          ['Alternator', '1/3000'],
        ]} accent={AMBER} />
        <rect x={stX(1) + 30} y={170} width={140} height={24} rx={6} fill={AMBER} opacity={0.1} />
        <M x={stX(1) + 100} y={187} size={10} fill={AMBER} weight={800}>C_s selected</M>
      </g>

      {/* Flow arrow 2→3 */}
      <Wire d={`M${stX(1) + stW + 2} 130 L${stX(2) - 2} 130`} stroke={MUTED} width={2} marker="url(#komArrM)" className="komm-shift" />

      {/* Stage 3: sizing equation */}
      <g>
        <Card x={stX(2) + 5} y={55} w={190} h={170} title="Sizing Relation" accent={PURP}>
          <M x={95} y={60} size={11} fill={N}>ΔE = I·ω²·C_s</M>
          <Wire d={`M30 75 L160 75`} stroke={MUTED} width={1} />
          <M x={95} y={95} size={11} fill={PURP} weight={800}>I = ΔE_max</M>
          <M x={95} y={112} size={11} fill={PURP} weight={800}>  ───────</M>
          <M x={95} y={129} size={11} fill={PURP} weight={800}>  ω²·C_s</M>
          <L x={95} y={152} size={9} fill={MUTED}>all three inputs →</L>
        </Card>
      </g>

      {/* Flow arrow 3→4 */}
      <Wire d={`M${stX(2) + stW + 2} 130 L${stX(3) - 2} 130`} stroke={MUTED} width={2} marker="url(#komArrM)" className="komm-shift" />

      {/* Stage 4: two alternative flywheels */}
      <g>
        <L x={stX(3) + stW / 2} y={58} size={10} fill={GREEN} weight={800}>Same inertia I</L>
        {/* Option A: large & light */}
        <circle cx={stX(3) + 60} cy={130} r={42} fill="none" stroke={GREEN} strokeWidth={3} />
        <Dot cx={stX(3) + 60} cy={130} r={3} fill={GREEN} />
        <L x={stX(3) + 60} y={180} size={9} fill={GREEN}>large R</L>
        <L x={stX(3) + 60} y={193} size={9} fill={MUTED}>light m</L>
        {/* Rim stress warning */}
        <rect x={stX(3) + 18} y={200} width={84} height={20} rx={5} fill={RED} opacity={0.1} />
        <L x={stX(3) + 60} y={215} size={8} fill={RED}>⚠ rim stress</L>

        {/* Option B: small & heavy */}
        <circle cx={stX(3) + 150} cy={130} r={25} fill="none" stroke={TEAL} strokeWidth={6} />
        <Dot cx={stX(3) + 150} cy={130} r={3} fill={TEAL} />
        <L x={stX(3) + 150} y={165} size={9} fill={TEAL}>small R</L>
        <L x={stX(3) + 150} y={178} size={9} fill={MUTED}>heavy m</L>
      </g>

      {/* Summary */}
      <M x={450} y={280} size={11} fill={MUTED}>I = m·R² → trade R and m for same I, but high R raises rim stress</M>
    </Scene>
  )
}

/* ── Unit 14 ── punching-press-energy-cycle ───────────────────────── */
export function M4PunchingPressScene() {
  /* Punching press with flywheel. Timeline: punch engaged (short), disengaged (long).
     Motor power (constant) vs punch demand (spike). Energy bar drains/fills.
     Motor size comparison. */
  const tX = 100; const tW = 600; const tY = 280

  return (
    <Scene caption="Punching press — flywheel as energy buffer">
      {/* ── Press schematic ── */}
      {/* Frame */}
      <rect x={50} y={20} width={120} height={200} rx={6} fill={SKY} stroke={MUTED} strokeWidth={1.5} />
      <L x={110} y={42} size={10} fill={MUTED}>PRESS</L>
      {/* Flywheel */}
      <circle cx={190} cy={80} r={30} fill="none" stroke={PURP} strokeWidth={4} className="komm-pulse" />
      <Dot cx={190} cy={80} r={4} fill={PURP} />
      <L x={190} y={120} size={9} fill={PURP}>flywheel</L>
      {/* Crank */}
      <Wire d="M110 100 L110 150" stroke={N} width={3} />
      {/* Punch */}
      <rect x={95} y={150} width={30} height={40} rx={2} fill={AMBER} opacity={0.5} stroke={AMBER} strokeWidth={2} className="komm-push" />
      <L x={110} y={206} size={9} fill={AMBER}>punch</L>

      {/* Energy bar */}
      <rect x={250} y={30} width={28} height={160} rx={4} fill={SKY} stroke={MUTED} strokeWidth={1.5} />
      <rect x={252} y={60} width={24} height={128} rx={3} fill={GREEN} opacity={0.4} className="komm-wave" />
      <L x={264} y={25} size={9} fill={GREEN}>E stored</L>
      <L x={295} y={100} size={8} fill={GREEN} anchor="start">fills</L>
      <L x={295} y={150} size={8} fill={RED} anchor="start">drains</L>

      {/* ── Timeline ── */}
      <Wire d={`M${tX} ${tY} L${tX + tW} ${tY}`} stroke={MUTED} width={2} />
      <L x={tX + tW / 2} y={tY + 18} size={10} fill={MUTED}>one revolution</L>

      {/* Punch engaged interval (short) */}
      <rect x={tX + 20} y={tY - 12} width={60} height={10} rx={3} fill={AMBER} />
      <L x={tX + 50} y={tY - 18} size={8} fill={AMBER}>punch engaged</L>
      {/* Disengaged interval (long) */}
      <rect x={tX + 80} y={tY - 12} width={520} height={10} rx={3} fill={MUTED} opacity={0.2} />
      <L x={tX + 350} y={tY - 18} size={8} fill={MUTED}>disengaged — flywheel charges</L>

      {/* Motor power trace (constant, modest) */}
      <Axes x={tX} y={tY + 90} w={tW} h={50} xLabel="" yLabel="P" />
      <Wire d={`M${tX} ${tY + 60} L${tX + tW} ${tY + 60}`} stroke={GREEN} width={2.5} />
      <L x={tX + tW + 10} y={tY + 64} size={9} fill={GREEN} anchor="start">motor P</L>

      {/* Punch demand (spike) */}
      <Wire d={`M${tX + 20} ${tY + 90} L${tX + 20} ${tY + 30} L${tX + 80} ${tY + 30} L${tX + 80} ${tY + 90}`} stroke={RED} width={2} />
      <L x={tX + 50} y={tY + 25} size={9} fill={RED}>demand spike</L>

      {/* ── Motor size comparison ── */}
      <Card x={400} y={20} w={220} h={100} title="Motor Size" accent={GREEN}>
        <rect x={20} y={50} width={40} height={30} rx={4} fill={GREEN} opacity={0.4} stroke={GREEN} strokeWidth={1.5} />
        <L x={40} y={90} size={8} fill={GREEN}>with FW</L>
        <rect x={100} y={38} width={80} height={42} rx={4} fill={RED} opacity={0.2} stroke={RED} strokeWidth={1.5} />
        <L x={140} y={90} size={8} fill={RED}>without FW</L>
      </Card>

      <L x={510} y={140} size={10} fill={MUTED}>Motor sized for average,</L>
      <L x={510} y={156} size={10} fill={GREEN} weight={700}>not peak — up to 20× smaller</L>

      {/* Axis ticks */}
      <M x={tX} y={tY + 106} size={8} fill={MUTED}>0°</M>
      <M x={tX + tW} y={tY + 106} size={8} fill={MUTED}>360°</M>
    </Scene>
  )
}

/* ── Unit 15 ── multi-cylinder-torque-superposition ──────────────── */
export function M4MultiCylinderTorqueScene() {
  /* Four individual TMDs offset by 180° (4-cyl 4-stroke), sum bold beneath.
     Fluctuation area comparison. Flywheel size comparison. */
  const pX = 60; const pW = 500; const pH = 40

  function singleCyl(y0, phase) {
    const pts = []
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      const deg = t * 720 + phase
      const rad = (deg * Math.PI) / 180
      const v = 30 * Math.sin(rad) * Math.max(0, Math.cos(rad * 0.5))
      pts.push([pX + t * pW, y0 - v])
    }
    return pts
  }

  function sumCurve(y0) {
    const pts = []
    for (let i = 0; i <= 100; i++) {
      const t = i / 100
      let total = 0
      for (const phase of [0, 180, 360, 540]) {
        const deg = t * 720 + phase
        const rad = (deg * Math.PI) / 180
        total += 30 * Math.sin(rad) * Math.max(0, Math.cos(rad * 0.5))
      }
      pts.push([pX + t * pW, y0 - total / 4])
    }
    return pts
  }

  const colors = [BLUE, AMBER, GREEN, ROSE]
  const yBase = 100

  return (
    <Scene caption="Multi-cylinder torque superposition — four cylinders">
      <L x={300} y={26} size={13} fill={N} weight={800}>Four-Cylinder Torque Summation</L>

      {/* Individual cylinder curves */}
      {[0, 1, 2, 3].map(i => (
        <g key={i}>
          <Curve pts={singleCyl(yBase + i * 55, i * 180)} stroke={colors[i]} width={1.5} dash="5 3" opacity={0.7} />
          <L x={pX + pW + 10} y={yBase + i * 55 - 5} size={8} fill={colors[i]} anchor="start">Cyl {i + 1}</L>
        </g>
      ))}

      {/* Firing interval labels */}
      <L x={pX + pW + 10} y={yBase - 25} size={9} fill={MUTED} anchor="start">180° intervals</L>

      {/* ── Summation curve ── */}
      <Wire d={`M${pX} 335 L${pX + pW} 335`} stroke={MUTED} width={1} dash="5 3" />
      <Axes x={pX} y={350} w={pW} h={50} xLabel="θ" yLabel="ΣT" />
      <Curve pts={sumCurve(350)} stroke={N} width={3} className="komm-traverse" />
      <L x={pX + pW + 10} y={340} size={10} fill={N} anchor="start" weight={800}>total T</L>

      {/* Mean lines */}
      <Wire d={`M${pX} ${yBase} L${pX + pW} ${yBase}`} stroke={MUTED} width={0.8} dash="3 3" />
      <Wire d={`M${pX} 342 L${pX + pW} 342`} stroke={ROSE} width={1} dash="4 3" />
      <L x={pX + pW + 10} y={346} size={8} fill={ROSE} anchor="start">mean</L>

      {/* ── Fluctuation area comparison ── */}
      <Card x={590} y={50} w={290} h={110} title="Fluctuation Comparison" accent={PURP}>
        <rect x={20} y={50} width={120} height={18} rx={4} fill={BLUE} opacity={0.3} />
        <L x={80} y={64} size={9} fill={BLUE}>single cyl. ΔE</L>
        <rect x={20} y={78} width={30} height={18} rx={4} fill={GREEN} opacity={0.5} className="komm-wave" />
        <L x={80} y={92} size={9} fill={GREEN} anchor="start">4-cyl ΔE (much smaller)</L>
      </Card>

      {/* ── Flywheel size comparison ── */}
      <L x={730} y={195} size={11} fill={PURP} weight={800}>Flywheel Size</L>
      <circle cx={660} cy={260} r={45} fill="none" stroke={MUTED} strokeWidth={3} strokeDasharray="5 3" />
      <L x={660} y={318} size={9} fill={MUTED}>1-cylinder</L>
      <circle cx={780} cy={260} r={18} fill="none" stroke={GREEN} strokeWidth={3} className="komm-pulse" />
      <L x={780} y={290} size={9} fill={GREEN}>4-cylinder</L>

      {/* Angle ticks */}
      {[0, 180, 360, 540, 720].map(deg => (
        <M key={deg} x={pX + (deg / 720) * pW} y={365} size={8} fill={MUTED}>{deg}°</M>
      ))}

      <L x={450} y={410} size={10} fill={MUTED}>Positive loops overlap negative loops → flatter torque → smaller flywheel</L>
    </Scene>
  )
}

/* ── Unit 16 ── dynamic-analysis-integration-map ─────────────────── */
export function M4DynamicAnalysisIntegrationScene() {
  /* Vertical 5-stage sequence: kinematics → d'Alembert → force analysis →
     TMD → flywheel. Upward design consequence arrow. Speed multiplier. */
  const stages = [
    { label: 'Kinematics', sub: 'accelerations', color: BLUE, y: 40 },
    { label: "d'Alembert", sub: 'inertia forces', color: ROSE, y: 125 },
    { label: 'Force Analysis', sub: 'pin loads, torque', color: PURP, y: 210 },
    { label: 'TMD', sub: 'energy fluctuation', color: AMBER, y: 295 },
    { label: 'Flywheel Sizing', sub: 'required inertia', color: GREEN, y: 380 },
  ]
  const colX = 250; const bW = 260; const bH = 60

  return (
    <Scene caption="Complete dynamic analysis — integration map">
      <L x={380} y={22} size={14} fill={N} weight={800}>Analysis Sequence</L>

      {/* ── Vertical stage column ── */}
      {stages.map((s, i) => (
        <g key={s.label}>
          <Block x={colX} y={s.y} w={bW} h={bH} label={s.label} sub={s.sub} stroke={s.color} className="komm-wave" />
          {/* Downward arrow to next stage */}
          {i < stages.length - 1 && (
            <Wire d={`M${colX + bW / 2} ${s.y + bH + 2} L${colX + bW / 2} ${stages[i + 1].y - 2}`} stroke={MUTED} width={2} marker="url(#komArrM)" />
          )}
        </g>
      ))}

      {/* Output labels on right */}
      {stages.map((s) => (
        <L key={`out-${s.label}`} x={colX + bW + 15} y={s.y + 35} size={9} fill={s.color} anchor="start">→ {s.sub}</L>
      ))}

      {/* ── Design consequence arrow (upward) ── */}
      <Wire d={`M${colX - 50} ${stages[4].y + bH / 2} L${colX - 50} ${stages[0].y + bH / 2}`} stroke={RED} width={3} marker="url(#komArrR)" className="komm-return" />
      <L x={colX - 60} y={240} size={11} fill={RED} anchor="end" weight={800}>Design</L>
      <L x={colX - 60} y={256} size={11} fill={RED} anchor="end" weight={800}>consequence</L>
      <L x={colX - 60} y={272} size={10} fill={MUTED} anchor="end">↑ changes propagate up</L>

      {/* ── Speed dependence panel ── */}
      <Card x={570} y={40} w={300} h={170} title="Speed Dependence" accent={RED}>
        <L x={150} y={55} size={11} fill={N} weight={650}>Inertia forces grow with</L>
        <M x={150} y={78} size={16} fill={RED} weight={800}>ω²</M>
        <L x={150} y={100} size={11} fill={N} weight={650}>so every design decision</L>
        <L x={150} y={118} size={11} fill={RED} weight={800}>is ultimately about speed</L>
        <Wire d="M40 130 L260 130" stroke={MUTED} width={1} dash="4 3" />
        <L x={150} y={148} size={10} fill={MUTED}>double ω → 4× inertia forces</L>
      </Card>

      {/* ── Speed multiplier visual ── */}
      <Card x={570} y={240} w={300} h={120} title="Speed ×2 Effect" accent={AMBER}>
        <Bars x={60} y={48} w={170} items={[
          ['ω', 1.0, BLUE],
          ['F_inertia', 4.0, RED],
        ]} max={4} rowH={30} />
        <L x={150} y={115} size={9} fill={MUTED}>square-law inflation</L>
      </Card>

      {/* Summary footer */}
      <M x={450} y={480} size={11} fill={MUTED}>Kinematics → Inertia → Forces → Torque → Flywheel   |   ω² ties it all together</M>
    </Scene>
  )
}

/* ── Module 5 ────────────────────────────────────────────────────────── */

/* ── Module 5 — Gears and Gear Trains ────────────────────────────── */

/* Unit 1 — gear-family-by-shaft-arrangement */
export function M5GearFamilyScene() {
  /* Three-column board: Parallel | Intersecting | Skew */
  return (
    <Scene caption="Classification of gears by shaft arrangement">
      {/* Column headers */}
      <rect x="20" y="18" width="276" height="36" rx="8" fill={BLUE} />
      <L x={158} y={42} size={13} fill={WHITE}>PARALLEL</L>
      <rect x="312" y="18" width="276" height="36" rx="8" fill={AMBER} />
      <L x={450} y={42} size={13} fill={WHITE}>INTERSECTING</L>
      <rect x="604" y="18" width="276" height="36" rx="8" fill={TEAL} />
      <L x={742} y={42} size={13} fill={WHITE}>SKEW</L>

      {/* ── Column 1: Parallel — spur + helical ── */}
      {/* Spur pair */}
      <g className="komm-fade-in">
        <circle cx={100} cy={130} r={42} fill="none" stroke={BLUE} strokeWidth={2.5} />
        <circle cx={186} cy={130} r={42} fill="none" stroke={BLUE} strokeWidth={2.5} />
        {/* teeth lines parallel to axis */}
        <Wire d="M100 88 L100 78" stroke={BLUE} width={2} />
        <Wire d="M186 88 L186 78" stroke={BLUE} width={2} />
        <Wire d="M100 172 L100 182" stroke={BLUE} width={2} />
        <Wire d="M186 172 L186 182" stroke={BLUE} width={2} />
        <Wire d="M58 130 L48 130" stroke={BLUE} width={2} />
        <Wire d="M228 130 L238 130" stroke={BLUE} width={2} />
        <L x={143} y={138} size={11} fill={BLUE}>spur</L>
      </g>

      {/* Helical pair */}
      <g className="komm-fade-in komm-delay-1">
        <circle cx={100} cy={256} r={38} fill="none" stroke={BLUE} strokeWidth={2.5} />
        <circle cx={178} cy={256} r={38} fill="none" stroke={BLUE} strokeWidth={2.5} />
        {/* helix angle marks — angled tooth lines */}
        <Wire d="M80 220 L90 214" stroke={BLUE} width={1.8} />
        <Wire d="M108 218 L118 212" stroke={BLUE} width={1.8} />
        <Wire d="M160 220 L170 214" stroke={BLUE} width={1.8} />
        <Wire d="M188 218 L198 212" stroke={BLUE} width={1.8} />
        <L x={139} y={264} size={11} fill={BLUE}>helical</L>
        {/* helix angle annotation */}
        <Wire d="M90 214 L90 204" stroke={MUTED} width={1.2} dash="3 2" />
        <Wire d="M90 214 L100 208" stroke={MUTED} width={1.2} dash="3 2" />
        <L x={103} y={206} size={9} fill={MUTED} anchor="start">ψ</L>
        {/* thrust arrow along shaft */}
        <Wire d="M45 256 L18 256" stroke={RED} width={2.2} marker="url(#komArrR)" className="komm-pulse" />
        <L x={31} y={274} size={9} fill={RED}>thrust</L>
      </g>

      {/* ── Column 2: Intersecting — straight & spiral bevel ── */}
      <g className="komm-fade-in komm-delay-2">
        {/* straight bevel — pitch cones */}
        <Wire d="M450 80 L410 160 L450 160" stroke={AMBER} width={2.5} />
        <Wire d="M450 80 L490 160 L450 160" stroke={AMBER} width={2.5} />
        <Wire d="M450 80 L450 60" stroke={MUTED} width={1.5} dash="4 3" />
        <Dot cx={450} cy={80} r={4} fill={AMBER} />
        <L x={450} y={56} size={9} fill={MUTED}>apex</L>
        <L x={450} y={178} size={11} fill={AMBER}>straight bevel</L>
        {/* pitch cone lines */}
        <Wire d="M410 160 L390 180" stroke={MUTED} width={1.2} dash="3 2" />
        <Wire d="M490 160 L510 180" stroke={MUTED} width={1.2} dash="3 2" />
        <L x={358} y={200} size={8} fill={MUTED} anchor="end">pitch cone</L>
      </g>

      <g className="komm-fade-in komm-delay-3">
        {/* spiral bevel */}
        <Wire d="M450 208 L414 276 L450 276" stroke={AMBER} width={2.5} />
        <Wire d="M450 208 L486 276 L450 276" stroke={AMBER} width={2.5} />
        {/* spiral tooth curve */}
        <Wire d="M426 250 Q 450 240 474 250" stroke={AMBER} width={1.8} />
        <Wire d="M430 260 Q 450 250 470 260" stroke={AMBER} width={1.8} />
        <L x={450} y={294} size={11} fill={AMBER}>spiral bevel</L>
      </g>

      {/* ── Column 3: Skew — crossed helical + worm & wheel ── */}
      <g className="komm-fade-in komm-delay-4">
        {/* crossed helical pair — two circles at an angle */}
        <circle cx={710} cy={120} r={34} fill="none" stroke={TEAL} strokeWidth={2.5} />
        <circle cx={774} cy={120} r={34} fill="none" stroke={TEAL} strokeWidth={2.5} />
        <Wire d="M690 95 L698 89" stroke={TEAL} width={1.5} />
        <Wire d="M755 95 L763 89" stroke={TEAL} width={1.5} />
        <L x={742} y={168} size={11} fill={TEAL}>crossed helical</L>
      </g>

      <g className="komm-fade-in komm-delay-5">
        {/* worm and wheel */}
        {/* worm (horizontal cylinder with thread) */}
        <rect x="700" y="220" width="84" height="22" rx="6" fill="none" stroke={TEAL} strokeWidth={2.5} />
        <Wire d="M708 222 L716 240" stroke={TEAL} width={1.5} />
        <Wire d="M724 222 L732 240" stroke={TEAL} width={1.5} />
        <Wire d="M740 222 L748 240" stroke={TEAL} width={1.5} />
        <Wire d="M756 222 L764 240" stroke={TEAL} width={1.5} />
        {/* wheel (large circle behind worm) */}
        <circle cx={742} cy={290} r={44} fill="none" stroke={TEAL} strokeWidth={2.5} />
        <L x={742} y={294} size={10} fill={TEAL}>wheel</L>
        <L x={742} y={214} size={10} fill={TEAL}>worm</L>
        {/* ratio annotation */}
        <L x={808} y={268} size={9} fill={TEAL} anchor="start">ratio ≤ 100:1</L>
        <L x={808} y={282} size={9} fill={RED} anchor="start">η ≈ 40–90%</L>
      </g>

      {/* ── Property strips ── */}
      <rect x="20" y="340" width="276" height="80" rx="8" fill={SKY} />
      <L x={158} y={362} size={10} fill={BLUE}>Smoothness: spur {"<"} helical</L>
      <L x={158} y={380} size={10} fill={BLUE}>Thrust: helical only</L>
      <L x={158} y={398} size={10} fill={BLUE}>η ≈ 96–99%</L>

      <rect x="312" y="340" width="276" height="80" rx="8" fill={SKY} />
      <L x={450} y={362} size={10} fill={AMBER}>Smoothness: spiral {">"} straight</L>
      <L x={450} y={380} size={10} fill={AMBER}>Thrust: axial + radial</L>
      <L x={450} y={398} size={10} fill={AMBER}>η ≈ 95–98%</L>

      <rect x="604" y="340" width="276" height="80" rx="8" fill={SKY} />
      <L x={742} y={362} size={10} fill={TEAL}>Smoothness: very high</L>
      <L x={742} y={380} size={10} fill={TEAL}>Thrust: significant</L>
      <L x={742} y={398} size={10} fill={TEAL}>η ≈ 40–90%</L>

      {/* comparison arrows */}
      <Wire d="M296 412 L312 412" stroke={MUTED} width={1.5} marker="url(#komArrM)" />
      <Wire d="M588 412 L604 412" stroke={MUTED} width={1.5} marker="url(#komArrM)" />
    </Scene>
  )
}

/* Unit 2 — gear-tooth-anatomy */
export function M5GearToothAnatomyScene() {
  /* Large single tooth with concentric circles + meshing pair inset */
  const cx = 240, cy = 310
  const rBase = 120, rRoot = 130, rPitch = 155, rAdd = 180
  return (
    <Scene caption="Gear tooth anatomy — circles, dimensions and the pressure angle">
      {/* Concentric circles (half arcs for clarity) */}
      <Wire d={`M${cx - rBase} ${cy} A ${rBase} ${rBase} 0 0 1 ${cx + rBase} ${cy}`}
        stroke={MUTED} width={1.8} dash="6 4" />
      <L x={cx + rBase + 6} y={cy + 4} size={9} fill={MUTED} anchor="start">base circle</L>

      <Wire d={`M${cx - rRoot} ${cy} A ${rRoot} ${rRoot} 0 0 1 ${cx + rRoot} ${cy}`}
        stroke={GREEN} width={1.8} dash="6 4" />
      <L x={cx + rRoot + 6} y={cy - 10} size={9} fill={GREEN} anchor="start">root (dedendum)</L>

      <Wire d={`M${cx - rPitch} ${cy} A ${rPitch} ${rPitch} 0 0 1 ${cx + rPitch} ${cy}`}
        stroke={BLUE} width={2.2} />
      <L x={cx + rPitch + 6} y={cy - 24} size={9} fill={BLUE} anchor="start">pitch circle</L>

      <Wire d={`M${cx - rAdd} ${cy} A ${rAdd} ${rAdd} 0 0 1 ${cx + rAdd} ${cy}`}
        stroke={AMBER} width={2} />
      <L x={cx + rAdd + 6} y={cy - 38} size={9} fill={AMBER} anchor="start">addendum circle</L>

      {/* Tooth shape (trapezoidal approximation) */}
      <Wire d="M210 310 L210 195 Q215 180 225 175 L255 175 Q265 180 270 195 L270 310"
        stroke={N} width={2.8} />
      {/* Second tooth for circular pitch */}
      <Wire d="M290 310 L290 200 Q295 185 305 180 L330 180 Q340 185 345 200 L345 310"
        stroke={N} width={2} opacity={0.4} />

      {/* Dimensions on tooth */}
      {/* addendum */}
      <Wire d="M275 155 L285 155" stroke={AMBER} width={1.5} />
      <Wire d="M275 175 L285 175" stroke={AMBER} width={1.5} />
      <Wire d="M280 155 L280 175" stroke={AMBER} width={1.5} marker="url(#komArrA)" />
      <L x={296} y={168} size={9} fill={AMBER} anchor="start">addendum</L>

      {/* dedendum */}
      <Wire d="M275 175 L285 175" stroke={GREEN} width={1.5} />
      <Wire d="M275 195 L285 195" stroke={GREEN} width={1.5} />
      <Wire d="M280 175 L280 195" stroke={GREEN} width={1.5} marker="url(#komArrG)" />
      <L x={296} y={188} size={9} fill={GREEN} anchor="start">dedendum</L>

      {/* tooth thickness on pitch circle */}
      <Wire d="M215 155 L260 155" stroke={BLUE} width={1.8} />
      <L x={237} y={148} size={9} fill={BLUE}>tooth thickness</L>

      {/* circular pitch along pitch circle */}
      <Wire d={`M225 155 A ${rPitch} ${rPitch} 0 0 1 310 160`}
        stroke={PURP} width={2} className="komm-draw" />
      <L x={268} y={140} size={9} fill={PURP}>circular pitch p</L>

      {/* Radius dimensions */}
      <Wire d={`M${cx} ${cy} L${cx} ${cy - rPitch}`} stroke={BLUE} width={1.2} dash="4 3" />
      <L x={cx - 18} y={cy - rPitch / 2} size={9} fill={BLUE}>r</L>

      {/* ── Meshing pair inset (right panel) ── */}
      <Card x={530} y={28} w={350} h={230} title="Meshing at the pitch point" accent={BLUE}>
        {/* Two pitch circles touching */}
        <circle cx={130} cy={130} r={55} fill="none" stroke={BLUE} strokeWidth={2} />
        <circle cx={240} cy={130} r={55} fill="none" stroke={BLUE} strokeWidth={2} />
        <Dot cx={185} cy={130} r={4} fill={RED} />
        <L x={185} y={118} size={9} fill={RED}>P (pitch point)</L>
        {/* common tangent */}
        <Wire d="M185 72 L185 188" stroke={MUTED} width={1.5} dash="5 3" />
        <L x={195} y={80} size={8} fill={MUTED} anchor="start">tangent</L>
        {/* common normal */}
        <Wire d="M130 130 L240 130" stroke={GREEN} width={2} />
        <L x={185} y={206} size={8} fill={GREEN}>common normal</L>
        {/* pressure angle */}
        <Wire d="M185 130 L205 112" stroke={AMBER} width={1.8} />
        <Wire d="M185 100 A 30 30 0 0 1 200 118" stroke={AMBER} width={1.5} />
        <L x={210} y={106} size={9} fill={AMBER} anchor="start">φ</L>
      </Card>

      {/* ── Relations panel ── */}
      <Panel x={530} y={280} w={350} title="Key relations" accent={BLUE} rows={[
        ['Module m = d / z', '', BLUE],
        ['Pitch diameter d = m × z', '', N],
        ['Circular pitch p = π × m', '', PURP],
        ['Addendum = m', '', AMBER],
        ['Dedendum = 1.25 m', '', GREEN],
        ['Pressure angle φ = 20° (std)', '', MUTED],
      ]} />
    </Scene>
  )
}

/* Unit 3 — law-of-gearing-common-normal */
export function M5LawOfGearingScene() {
  /* Meshing pair with common normal through pitch point at 3 positions + counter-example */
  const g1x = 160, g1y = 260, g2x = 340, g2y = 260
  const r1 = 80, r2 = 80
  const px = 250, py = 260  /* pitch point */
  return (
    <Scene caption="Law of gearing — the common normal must always pass through the pitch point">
      {/* Gear 1 pitch circle */}
      <circle cx={g1x} cy={g1y} r={r1} fill="none" stroke={BLUE} strokeWidth={2} />
      {/* Gear 2 pitch circle */}
      <circle cx={g2x} cy={g2y} r={r2} fill="none" stroke={AMBER} strokeWidth={2} />
      {/* Centre line */}
      <Wire d={`M${g1x} ${g1y} L${g2x} ${g2y}`} stroke={MUTED} width={1.5} dash="5 3" />
      <L x={g1x} y={g1y + 18} size={10} fill={BLUE}>O₁</L>
      <L x={g2x} y={g2y + 18} size={10} fill={AMBER}>O₂</L>

      {/* Pitch point */}
      <Dot cx={px} cy={py} r={6} fill={RED} className="komm-pulse" />
      <L x={px} y={py - 14} size={11} fill={RED}>P</L>

      {/* Common normals at 3 contact positions — all pass through P */}
      <Wire d={`M${px - 70} ${py - 50} L${px + 70} ${py + 50}`}
        stroke={GREEN} width={2.2} className="komm-traverse" />
      <Wire d={`M${px - 60} ${py - 65} L${px + 60} ${py + 65}`}
        stroke={GREEN} width={2} opacity={0.55} />
      <Wire d={`M${px - 80} ${py - 35} L${px + 80} ${py + 35}`}
        stroke={GREEN} width={2} opacity={0.55} />

      {/* Contact point markers */}
      <Dot cx={px - 30} cy={py - 22} r={3} fill={GREEN} />
      <Dot cx={px + 10} cy={py + 12} r={3} fill={GREEN} />
      <Dot cx={px - 50} cy={py - 38} r={3} fill={GREEN} />

      <L x={px - 85} y={py - 56} size={9} fill={GREEN} anchor="start">common normal</L>
      <L x={px + 40} y={py - 30} size={9} fill={GREEN} anchor="start">always through P</L>

      {/* label: LAW SATISFIED */}
      <Card x={40} y={30} w={180} h={70} title="✓ Conjugate" accent={GREEN}>
        <L x={90} y={56} size={10} fill={N}>ω₁/ω₂ = const</L>
      </Card>

      {/* ── Counter-example (right side) ── */}
      <rect x="490" y="60" width="390" height="220" rx="10" fill={WHITE} stroke={RED} strokeWidth={2} />
      <L x={685} y={82} size={11} fill={RED}>✗ Arbitrary profiles</L>

      {/* Two arbitrary gear circles */}
      <circle cx={590} cy={180} r={52} fill="none" stroke={RED} strokeWidth={1.8} opacity={0.6} />
      <circle cx={700} cy={180} r={52} fill="none" stroke={RED} strokeWidth={1.8} opacity={0.6} />
      <Wire d={`M${590} ${180} L${700} ${180}`} stroke={MUTED} width={1.2} dash="4 3" />

      {/* wandering normals — do NOT converge to one point */}
      <Wire d="M620 140 L680 220" stroke={RED} width={1.8} opacity={0.5} />
      <Wire d="M630 130 L670 230" stroke={RED} width={1.8} opacity={0.5} />
      <Wire d="M640 145 L690 210" stroke={RED} width={1.8} opacity={0.5} />
      <Dot cx={650} cy={180} r={3} fill={RED} />
      <Dot cx={655} cy={190} r={3} fill={RED} />
      <Dot cx={646} cy={170} r={3} fill={RED} />
      <L x={660} y={248} size={9} fill={RED}>normals cross at different points</L>

      {/* Speed trace — fluctuating */}
      <L x={830} y={104} size={9} fill={MUTED} anchor="end">ω₂/ω₁</L>
      <Wire d="M790 110 L790 260" stroke={MUTED} width={1.5} />
      <Wire d="M790 190 L870 190" stroke={MUTED} width={1.5} />
      <Curve pts={[[790,190],[800,170],[810,200],[820,160],[830,210],[840,175],[850,195],[860,165],[870,200]]}
        stroke={RED} width={2} className="komm-pulse" />
      <L x={830} y={270} size={9} fill={RED}>ratio fluctuates</L>

      {/* vibration indicator */}
      <Wire d="M848 175 L858 165" stroke={RED} width={1.5} />
      <Wire d="M852 175 L862 165" stroke={RED} width={1.5} />
      <Wire d="M856 175 L866 165" stroke={RED} width={1.5} />

      {/* ── Bottom annotation ── */}
      <Panel x={40} y={380} w={410} title="Fundamental law of gearing" accent={GREEN} rows={[
        ['Common normal at contact passes through fixed pitch point', '', GREEN],
        ['Pitch point divides line of centres inversely as ω', '', N],
        ['Profiles satisfying this are called conjugate', '', BLUE],
      ]} />
    </Scene>
  )
}

/* Unit 4 — sliding-velocity-distribution-on-tooth */
export function M5SlidingVelocityScene() {
  /* Tooth profile with path of contact + sliding velocity double-triangle */
  const toothX = 160, toothTop = 70, toothBot = 380
  const pitchY = 220  /* pitch point line */
  /* sliding velocity plot alongside */
  const plotX = 360, plotW = 160
  return (
    <Scene caption="Sliding velocity distribution — zero at the pitch point, maximum at the extremities">
      {/* Tooth profile (large) */}
      <Wire d={`M${toothX - 30} ${toothBot} L${toothX - 25} ${toothTop + 40} Q${toothX} ${toothTop} ${toothX + 25} ${toothTop + 40} L${toothX + 30} ${toothBot}`}
        stroke={N} width={3} />

      {/* Path of contact line along the tooth */}
      <Wire d={`M${toothX} ${toothTop + 30} L${toothX} ${toothBot - 20}`}
        stroke={BLUE} width={2} dash="6 4" />
      <L x={toothX - 46} y={toothTop + 28} size={9} fill={BLUE} anchor="end">tip</L>
      <L x={toothX - 46} y={toothBot - 18} size={9} fill={BLUE} anchor="end">root</L>

      {/* Pitch line */}
      <Wire d={`M${toothX - 60} ${pitchY} L${toothX + 60} ${pitchY}`}
        stroke={RED} width={2.2} />
      <Dot cx={toothX} cy={pitchY} r={5} fill={RED} className="komm-pulse" />
      <L x={toothX + 66} y={pitchY + 4} size={10} fill={RED} anchor="start">pitch point</L>
      <L x={toothX + 66} y={pitchY + 18} size={9} fill={RED} anchor="start">V_slide = 0</L>

      {/* Contact direction arrows */}
      <Wire d={`M${toothX + 20} ${toothTop + 60} L${toothX + 20} ${pitchY - 20}`}
        stroke={MUTED} width={1.5} marker="url(#komArrM)" />
      <L x={toothX + 38} y={pitchY - 50} size={8} fill={MUTED} anchor="start">contact</L>

      {/* direction reversal note */}
      <Wire d={`M${toothX + 20} ${pitchY + 20} L${toothX + 20} ${toothBot - 50}`}
        stroke={MUTED} width={1.5} marker="url(#komArrM)" />
      <L x={toothX + 38} y={pitchY + 50} size={8} fill={MUTED} anchor="start">reversed</L>

      {/* ── Sliding velocity distribution (double triangle) ── */}
      <L x={plotX + plotW / 2} y={toothTop + 12} size={11} fill={N}>Sliding velocity |V_s|</L>

      {/* axis */}
      <Wire d={`M${plotX} ${toothTop + 30} L${plotX} ${toothBot - 20}`}
        stroke={MUTED} width={1.5} />
      {/* zero line at pitch */}
      <Wire d={`M${plotX - 10} ${pitchY} L${plotX + plotW + 10} ${pitchY}`}
        stroke={MUTED} width={1.2} dash="4 3" />
      <L x={plotX - 16} y={pitchY + 4} size={8} fill={MUTED} anchor="end">0</L>

      {/* Upper triangle (tip side) */}
      <Curve pts={[
        [plotX, pitchY],
        [plotX + plotW, toothTop + 30],
      ]} stroke={AMBER} width={2.8} className="komm-draw" />
      <L x={plotX + plotW + 8} y={toothTop + 34} size={9} fill={AMBER} anchor="start">max (tip)</L>

      {/* Lower triangle (root side) */}
      <Curve pts={[
        [plotX, pitchY],
        [plotX + plotW, toothBot - 20],
      ]} stroke={PURP} width={2.8} className="komm-draw" />
      <L x={plotX + plotW + 8} y={toothBot - 16} size={9} fill={PURP} anchor="start">max (root)</L>

      {/* Fill triangles for visual weight */}
      <path d={`M${plotX} ${pitchY} L${plotX + plotW} ${toothTop + 30} L${plotX} ${toothTop + 30} Z`}
        fill={AMBER} opacity={0.12} />
      <path d={`M${plotX} ${pitchY} L${plotX + plotW} ${toothBot - 20} L${plotX} ${toothBot - 20} Z`}
        fill={PURP} opacity={0.12} />

      {/* formula */}
      <M x={plotX + plotW / 2} y={pitchY - 18} size={10} fill={N}>V_s = (ω₁+ω₂) × d</M>
      <M x={plotX + plotW / 2} y={pitchY + 24} size={9} fill={MUTED}>d = dist from P</M>

      {/* ── Worn tooth (right panel) ── */}
      <Card x={600} y={40} w={280} h={280} title="Wear pattern" accent={RED}>
        {/* Worn tooth outline */}
        <Wire d="M100 248 L105 90 Q115 70 130 66 L150 66 Q165 70 175 90 L180 248"
          stroke={N} width={2.5} />
        {/* wear shading at tip */}
        <rect x="112" y="70" width="56" height="50" rx="4" fill={RED} opacity={0.18} />
        <L x={140} y={90} size={8} fill={RED}>heavy wear</L>
        {/* wear shading at root */}
        <rect x="107" y="210" width="66" height="38" rx="4" fill={RED} opacity={0.18} />
        <L x={140} y={232} size={8} fill={RED}>heavy wear</L>
        {/* unworn pitch band */}
        <rect x="109" y="150" width="62" height="30" rx="4" fill={GREEN} opacity={0.15} />
        <Wire d="M109 165 L171 165" stroke={GREEN} width={2} />
        <L x={140} y={142} size={8} fill={GREEN}>pitch line — unworn</L>
      </Card>

      {/* Annotation */}
      <L x={740} y={356} size={10} fill={N}>Direction of sliding</L>
      <L x={740} y={374} size={10} fill={N}>reverses at pitch point</L>
      <Wire d="M690 400 L690 420 L790 420 L790 400" stroke={MUTED} width={1.5} />
      <Wire d="M690 410 L720 410" stroke={AMBER} width={2} marker="url(#komArrA)" />
      <Wire d="M790 410 L760 410" stroke={PURP} width={2} marker="url(#komArrP)" />
      <L x={740} y={444} size={9} fill={MUTED}>opposite directions</L>
    </Scene>
  )
}

/* Unit 5 — involute-generation-and-line-of-action */
export function M5InvoluteGenerationScene() {
  /* Left: base circle with string unwinding tracing involute.
     Right: two meshing involute gears with line of action. */
  const bcx = 160, bcy = 260, br = 70  /* base circle */
  return (
    <Scene caption="Involute generation and the line of action">
      {/* ── Left panel: involute generation ── */}
      <L x={160} y={42} size={13} fill={N}>Involute generation</L>

      {/* Base circle */}
      <circle cx={bcx} cy={bcy} r={br} fill="none" stroke={BLUE} strokeWidth={2.5} />
      <L x={bcx} y={bcy + 4} size={10} fill={BLUE}>base circle</L>
      <Dot cx={bcx} cy={bcy} r={3} fill={BLUE} />

      {/* String unwinding — 3 positions */}
      {/* Position 1 — tangent point at top */}
      <Wire d={`M${bcx} ${bcy - br} L${bcx + 50} ${bcy - br - 40}`}
        stroke={AMBER} width={2} dash="5 3" />
      <Dot cx={bcx + 50} cy={bcy - br - 40} r={4} fill={AMBER} />
      <L x={bcx + 56} y={bcy - br - 44} size={8} fill={AMBER} anchor="start">P₁</L>
      {/* normal tangent to base circle */}
      <Wire d={`M${bcx} ${bcy - br} L${bcx + 50} ${bcy - br - 40}`}
        stroke={GREEN} width={1.5} opacity={0.6} />

      {/* Position 2 */}
      <Wire d={`M${bcx + 52} ${bcy - 46} L${bcx + 110} ${bcy - 80}`}
        stroke={AMBER} width={2} dash="5 3" />
      <Dot cx={bcx + 110} cy={bcy - 80} r={4} fill={AMBER} />
      <L x={bcx + 116} y={bcy - 84} size={8} fill={AMBER} anchor="start">P₂</L>

      {/* Position 3 */}
      <Wire d={`M${bcx + 68} ${bcy - 16} L${bcx + 150} ${bcy - 30}`}
        stroke={AMBER} width={2} dash="5 3" />
      <Dot cx={bcx + 150} cy={bcy - 30} r={4} fill={AMBER} />
      <L x={bcx + 156} y={bcy - 34} size={8} fill={AMBER} anchor="start">P₃</L>

      {/* Involute curve through the 3 points */}
      <Curve pts={[
        [bcx + 50, bcy - br - 40],
        [bcx + 80, bcy - 90],
        [bcx + 110, bcy - 80],
        [bcx + 130, bcy - 55],
        [bcx + 150, bcy - 30],
      ]} stroke={AMBER} width={2.8} className="komm-draw" />

      {/* annotation: normal = tangent to base circle */}
      <L x={80} y={380} size={10} fill={GREEN} anchor="start">Normal to involute</L>
      <L x={80} y={396} size={10} fill={GREEN} anchor="start">= tangent to base circle</L>

      {/* ── Right panel: meshing involute pair ── */}
      <rect x="430" y="56" width="450" height="340" rx="10" fill={WHITE} stroke={BLUE} strokeWidth={1.8} />
      <L x={655} y={78} size={13} fill={N}>Meshing involute gears</L>

      {/* Gear 1 */}
      <circle cx={570} cy={240} r={65} fill="none" stroke={BLUE} strokeWidth={2} />
      <circle cx={570} cy={240} r={52} fill="none" stroke={MUTED} strokeWidth={1.5} dash="5 3" />
      <L x={570} y={244} size={9} fill={BLUE}>r_b1</L>

      {/* Gear 2 */}
      <circle cx={740} cy={240} r={65} fill="none" stroke={AMBER} strokeWidth={2} />
      <circle cx={740} cy={240} r={52} fill="none" stroke={MUTED} strokeWidth={1.5} dash="5 3" />
      <L x={740} y={244} size={9} fill={AMBER}>r_b2</L>

      {/* Pitch circles */}
      <circle cx={570} cy={240} r={58} fill="none" stroke={BLUE} strokeWidth={1.5} opacity={0.4} />
      <circle cx={740} cy={240} r={58} fill="none" stroke={AMBER} strokeWidth={1.5} opacity={0.4} />

      {/* pitch point */}
      <Dot cx={655} cy={240} r={5} fill={RED} className="komm-pulse" />
      <L x={655} y={228} size={9} fill={RED}>P</L>

      {/* Line of action — common tangent to both base circles */}
      <Wire d="M590 310 L720 170" stroke={GREEN} width={2.5} className="komm-traverse" />
      <L x={730} y={166} size={9} fill={GREEN} anchor="start">line of action</L>

      {/* Contact points travelling along line */}
      <Dot cx={630} cy={270} r={3} fill={GREEN} />
      <Dot cx={655} cy={245} r={3} fill={GREEN} />
      <Dot cx={680} cy={220} r={3} fill={GREEN} />

      {/* Centre distance variation note */}
      <Card x={445} y={310} w={200} h={76} title="Centre distance ↑" accent={TEAL}>
        <L x={100} y={52} size={10} fill={N}>Pitch circles change</L>
        <L x={100} y={66} size={10} fill={GREEN}>Ratio stays SAME</L>
      </Card>

      {/* Velocity ratio readout */}
      <rect x="670" y="312" width="110" height="40" rx="8" fill={SKY} />
      <M x={725} y={330} size={11} fill={BLUE}>ω₁/ω₂ = const</M>
      <L x={725} y={346} size={9} fill={GREEN}>✓ unchanged</L>

      {/* Pressure angle label */}
      <Wire d="M655 240 L680 218" stroke={PURP} width={1.8} />
      <L x={686} y={212} size={9} fill={PURP} anchor="start">φ</L>
    </Scene>
  )
}

/* Unit 6 — cycloid-generation-and-comparison */
export function M5CycloidComparisonScene() {
  /* Left: epicycloid + hypocycloid generation. Right: comparison table. */
  const pcx = 180, pcy = 240, pr = 80  /* pitch circle */
  const rollR = 28  /* rolling circle */
  return (
    <Scene caption="Cycloidal tooth — generation by rolling circles and comparison with involute">
      {/* ── Left panel: cycloid generation ── */}
      <L x={180} y={40} size={13} fill={N}>Cycloid generation</L>

      {/* Pitch circle */}
      <circle cx={pcx} cy={pcy} r={pr} fill="none" stroke={BLUE} strokeWidth={2.5} />
      <L x={pcx} y={pcy + 4} size={10} fill={BLUE}>pitch circle</L>

      {/* Epicycloid — rolling circle outside */}
      <circle cx={pcx} cy={pcy - pr - rollR} r={rollR} fill="none" stroke={AMBER} strokeWidth={2}
        className="komm-spin" />
      <Dot cx={pcx} cy={pcy - pr - rollR * 2} r={4} fill={AMBER} />
      <L x={pcx + 36} y={pcy - pr - rollR} size={9} fill={AMBER} anchor="start">rolling ○</L>
      <L x={pcx + 36} y={pcy - pr - rollR + 14} size={9} fill={AMBER} anchor="start">(outside)</L>

      {/* Epicycloid trace */}
      <Curve pts={[
        [pcx, pcy - pr],
        [pcx + 20, pcy - pr - 20],
        [pcx + 35, pcy - pr - 38],
        [pcx + 28, pcy - pr - 52],
        [pcx + 10, pcy - pr - 50],
      ]} stroke={AMBER} width={2.5} className="komm-draw" />
      <L x={pcx - 40} y={pcy - pr - 30} size={9} fill={AMBER} anchor="end">epicycloid</L>
      <L x={pcx - 40} y={pcy - pr - 16} size={9} fill={AMBER} anchor="end">(face)</L>

      {/* Hypocycloid — rolling circle inside */}
      <circle cx={pcx} cy={pcy + pr - rollR} r={rollR} fill="none" stroke={PURP} strokeWidth={2}
        className="komm-spin-slow" />
      <Dot cx={pcx} cy={pcy + pr} r={4} fill={PURP} />
      <L x={pcx + 36} y={pcy + pr - rollR} size={9} fill={PURP} anchor="start">rolling ○</L>
      <L x={pcx + 36} y={pcy + pr - rollR + 14} size={9} fill={PURP} anchor="start">(inside)</L>

      {/* Hypocycloid trace */}
      <Curve pts={[
        [pcx, pcy + pr],
        [pcx + 16, pcy + pr - 18],
        [pcx + 28, pcy + pr - 30],
        [pcx + 22, pcy + pr - 42],
        [pcx + 8, pcy + pr - 38],
      ]} stroke={PURP} width={2.5} className="komm-draw" />
      <L x={pcx - 40} y={pcy + pr - 20} size={9} fill={PURP} anchor="end">hypocycloid</L>
      <L x={pcx - 40} y={pcy + pr - 6} size={9} fill={PURP} anchor="end">(flank)</L>

      {/* Join point at pitch circle */}
      <Dot cx={pcx} cy={pcy - pr} r={4} fill={GREEN} />
      <Dot cx={pcx} cy={pcy + pr} r={4} fill={GREEN} />
      <L x={pcx - 10} y={pcy - pr + 14} size={8} fill={GREEN} anchor="end">join</L>

      {/* ── Right panel: comparison table ── */}
      <rect x="390" y="30" width="490" height="310" rx="10" fill={WHITE} stroke={BLUE} strokeWidth={1.8} />
      <L x={635} y={56} size={13} fill={N}>Involute vs Cycloidal</L>

      {/* Table headers */}
      <rect x="400" y="66" width="180" height="28" rx="6" fill={MUTED} />
      <L x={490} y={85} size={10} fill={WHITE}>Property</L>
      <rect x="590" y="66" width="130" height="28" rx="6" fill={BLUE} />
      <L x={655} y={85} size={10} fill={WHITE}>Involute</L>
      <rect x="730" y="66" width="140" height="28" rx="6" fill={AMBER} />
      <L x={800} y={85} size={10} fill={WHITE}>Cycloidal</L>

      {/* Table rows */}
      {[
        ['Centre dist. tolerance', '✓ tolerant', '✗ exact only'],
        ['Interference', '✗ possible', '✓ none'],
        ['Tooth strength', 'moderate', '✓ stronger root'],
        ['Sliding', 'moderate', '✓ less near P'],
        ['Manufacture', '✓ easy', '✗ difficult'],
        ['Applications', 'industry std', 'clocks, pumps'],
      ].map(([prop, inv, cyc], i) => (
        <g key={prop} className={`komm-fade-in komm-delay-${i % 5}`}>
          <L x={490} y={116 + i * 34} size={10} fill={N}>{prop}</L>
          <L x={655} y={116 + i * 34} size={10} fill={BLUE}>{inv}</L>
          <L x={800} y={116 + i * 34} size={10} fill={AMBER}>{cyc}</L>
          {i < 5 ? <Wire d={`M400 ${126 + i * 34} L870 ${126 + i * 34}`} stroke={MUTED} width={0.8} opacity={0.3} /> : null}
        </g>
      ))}

      {/* ── Surviving applications ── */}
      <L x={540} y={370} size={11} fill={AMBER}>Surviving cycloidal uses:</L>
      {/* Clock escapement */}
      <circle cx={500} cy={420} r={28} fill="none" stroke={AMBER} strokeWidth={2} />
      <Wire d="M500 392 L500 402" stroke={AMBER} width={2} />
      <Wire d="M500 438 L500 448" stroke={AMBER} width={2} />
      <L x={500} y={466} size={9} fill={AMBER}>clock wheel</L>
      {/* Gear pump */}
      <circle cx={660} cy={420} r={24} fill="none" stroke={AMBER} strokeWidth={2} />
      <circle cx={710} cy={420} r={24} fill="none" stroke={AMBER} strokeWidth={2} />
      <L x={685} y={466} size={9} fill={AMBER}>gear pump</L>
    </Scene>
  )
}

/* Unit 7 — path-of-contact-geometry */
export function M5PathOfContactScene() {
  /* Meshing pair with base/pitch/addendum circles + line of action with path of contact highlighted */
  const c1x = 240, c2x = 540, cy = 260
  const rp1 = 100, rp2 = 100  /* pitch radii */
  const rb1 = 82, rb2 = 82   /* base radii */
  const ra1 = 118, ra2 = 118  /* addendum radii */
  const px = 390  /* pitch point */
  return (
    <Scene caption="Path of contact — bounded by addendum circle crossings on the line of action">
      {/* Pitch circles */}
      <circle cx={c1x} cy={cy} r={rp1} fill="none" stroke={BLUE} strokeWidth={2} />
      <circle cx={c2x} cy={cy} r={rp2} fill="none" stroke={AMBER} strokeWidth={2} />
      <L x={c1x} y={cy + 4} size={9} fill={BLUE}>pitch</L>
      <L x={c2x} y={cy + 4} size={9} fill={AMBER}>pitch</L>

      {/* Base circles */}
      <circle cx={c1x} cy={cy} r={rb1} fill="none" stroke={MUTED} strokeWidth={1.5} dash="5 3" />
      <circle cx={c2x} cy={cy} r={rb2} fill="none" stroke={MUTED} strokeWidth={1.5} dash="5 3" />
      <L x={c1x - rb1 - 6} y={cy - 16} size={8} fill={MUTED} anchor="end">base</L>
      <L x={c2x + rb2 + 6} y={cy - 16} size={8} fill={MUTED} anchor="start">base</L>

      {/* Addendum circles */}
      <circle cx={c1x} cy={cy} r={ra1} fill="none" stroke={BLUE} strokeWidth={1.8} opacity={0.5} />
      <circle cx={c2x} cy={cy} r={ra2} fill="none" stroke={AMBER} strokeWidth={1.8} opacity={0.5} />
      <L x={c1x} y={cy - ra1 - 10} size={8} fill={BLUE}>addendum</L>
      <L x={c2x} y={cy - ra2 - 10} size={8} fill={AMBER}>addendum</L>

      {/* Line of action — common tangent to base circles */}
      <Wire d="M280 380 L500 140" stroke={MUTED} width={2} dash="6 4" />

      {/* Tangent points on base circles */}
      <Dot cx={305} cy={355} r={4} fill={MUTED} />
      <Dot cx={475} cy={165} r={4} fill={MUTED} />
      <L x={310} y={370} size={8} fill={MUTED} anchor="start">T₁</L>
      <L x={480} y={158} size={8} fill={MUTED} anchor="start">T₂</L>

      {/* Path of contact — highlighted segment between addendum crossings */}
      <Wire d="M330 330 L460 195" stroke={GREEN} width={4} className="komm-traverse" />

      {/* Addendum crossing points */}
      <Dot cx={330} cy={330} r={6} fill={GREEN} />
      <Dot cx={460} cy={195} r={6} fill={GREEN} />
      <L x={316} y={346} size={9} fill={GREEN} anchor="end">entry</L>
      <L x={474} y={190} size={9} fill={GREEN} anchor="start">exit</L>

      {/* Pitch point on the path */}
      <Dot cx={px} cy={262} r={6} fill={RED} className="komm-pulse" />
      <L x={px + 14} y={256} size={10} fill={RED} anchor="start">P</L>

      {/* Approach / recess regions */}
      {/* approach: entry → P */}
      <rect x="325" y="290" width="60" height="14" rx="3" fill={PURP} opacity={0.25} />
      <L x={355} y={284} size={8} fill={PURP}>approach</L>
      {/* recess: P → exit */}
      <rect x="400" y="228" width="60" height="14" rx="3" fill={TEAL} opacity={0.25} />
      <L x={430} y={222} size={8} fill={TEAL}>recess</L>

      {/* Dimension lines */}
      <Wire d="M330 330 L460 195" stroke={GREEN} width={1} dash="3 2" opacity={0.4} />

      {/* ── Engagement animation notation ── */}
      <Card x={620} y={60} w={260} h={140} title="Path of contact" accent={GREEN}>
        <L x={130} y={52} size={10} fill={N}>Bounded by addendum</L>
        <L x={130} y={68} size={10} fill={N}>circle crossings on</L>
        <L x={130} y={84} size={10} fill={N}>the line of action</L>
        <L x={130} y={108} size={10} fill={PURP}>Approach: entry → P</L>
        <L x={130} y={124} size={10} fill={TEAL}>Recess: P → exit</L>
      </Card>

      {/* Formula panel */}
      <Panel x={620} y={230} w={260} title="Length formulas" accent={BLUE} rows={[
        ['Path = √(r²ₐ₁−r²ᵦ₁)', '', N],
        ['      + √(r²ₐ₂−r²ᵦ₂)', '', N],
        ['      − (r₁+r₂)sin φ', '', N],
        ['Approach + Recess = Total', '', GREEN],
      ]} />
    </Scene>
  )
}

/* Unit 8 — contact-ratio-tooth-overlap */
export function M5ContactRatioScene() {
  /* Meshing counter + three comparison cases: CR<1, CR=1, CR≈1.6 */
  return (
    <Scene caption="Contact ratio — average number of tooth pairs in mesh">
      {/* ── Main meshing with counter ── */}
      <L x={200} y={38} size={13} fill={N}>Contact ratio ≈ 1.6</L>

      {/* Gear pair outline */}
      <circle cx={140} cy={160} r={65} fill="none" stroke={BLUE} strokeWidth={2} />
      <circle cx={272} cy={160} r={65} fill="none" stroke={AMBER} strokeWidth={2} />

      {/* Tooth pair markers in mesh */}
      <rect x="195" y="118" width="16" height="34" rx="3" fill={GREEN} opacity={0.6} className="komm-pulse" />
      <rect x="195" y="168" width="16" height="34" rx="3" fill={GREEN} opacity={0.3} className="komm-pulse komm-delay-1" />

      {/* Counter display */}
      <rect x="120" y="252" width="170" height="50" rx="10" fill={SKY} />
      <L x={205} y={272} size={10} fill={MUTED}>teeth in contact:</L>
      <M x={205} y={292} size={16} fill={BLUE}>1 — 2 — 1 — 2</M>

      {/* Running average */}
      <Wire d="M310 270 L380 270" stroke={MUTED} width={1.5} marker="url(#komArrM)" />
      <rect x="385" y="252" width="80" height="50" rx="10" fill={WHITE} stroke={GREEN} strokeWidth={2} />
      <L x={425} y={272} size={9} fill={MUTED}>average</L>
      <M x={425} y={292} size={18} fill={GREEN}>1.6</M>

      {/* ── Three comparison cases ── */}
      <L x={450} y={38} size={12} fill={N}>Comparison</L>

      {/* Case 1: CR < 1 — gap, shock */}
      <Card x={490} y={56} w={195} h={130} title="CR < 1" accent={RED}>
        <circle cx={60} cy={70} r={26} fill="none" stroke={RED} strokeWidth={1.8} />
        <circle cx={120} cy={70} r={26} fill="none" stroke={RED} strokeWidth={1.8} />
        {/* gap indicator */}
        <Wire d="M82 60 L98 60" stroke={RED} width={2} dash="3 3" />
        <L x={90} y={52} size={8} fill={RED}>gap!</L>
        <L x={97} y={102} size={9} fill={RED}>no teeth in contact</L>
        {/* shock indicator */}
        <L x={97} y={118} size={9} fill={RED}>💥 impact on entry</L>
      </Card>

      {/* Case 2: CR = 1 — instant handover */}
      <Card x={700} y={56} w={180} h={130} title="CR = 1" accent={AMBER}>
        <circle cx={55} cy={70} r={26} fill="none" stroke={AMBER} strokeWidth={1.8} />
        <circle cx={110} cy={70} r={26} fill="none" stroke={AMBER} strokeWidth={1.8} />
        {/* single tooth just touching */}
        <Dot cx={82} cy={56} r={3} fill={AMBER} />
        <L x={82} y={100} size={9} fill={AMBER}>exactly 1 pair</L>
        <L x={82} y={116} size={9} fill={AMBER}>zero margin</L>
      </Card>

      {/* Case 3: CR ≈ 1.6 — overlap */}
      <Card x={490} y={210} w={195} h={130} title="CR ≈ 1.6 ✓" accent={GREEN}>
        <circle cx={60} cy={70} r={26} fill="none" stroke={GREEN} strokeWidth={1.8} />
        <circle cx={120} cy={70} r={26} fill="none" stroke={GREEN} strokeWidth={1.8} />
        {/* two teeth touching */}
        <Dot cx={82} cy={56} r={3} fill={GREEN} />
        <Dot cx={82} cy={78} r={3} fill={GREEN} />
        <L x={97} y={102} size={9} fill={GREEN}>1–2 pairs overlap</L>
        <L x={97} y={118} size={9} fill={GREEN}>smooth continuous</L>
      </Card>

      {/* ── Load sharing bar ── */}
      <L x={700} y={220} size={10} fill={N}>Load sharing</L>
      <rect x="700" y="230" width="180" height="18" rx="4" fill={SKY} />
      {/* alternating 1/2 pair load */}
      <rect x="700" y="230" width="45" height="18" rx="4" fill={GREEN} opacity={0.5} />
      <rect x="745" y="230" width="45" height="18" rx="4" fill={BLUE} opacity={0.7} />
      <rect x="790" y="230" width="45" height="18" rx="4" fill={GREEN} opacity={0.5} />
      <rect x="835" y="230" width="45" height="18" rx="4" fill={BLUE} opacity={0.7} />
      <L x={722} y={264} size={8} fill={GREEN}>1</L>
      <L x={767} y={264} size={8} fill={BLUE}>2</L>
      <L x={812} y={264} size={8} fill={GREEN}>1</L>
      <L x={857} y={264} size={8} fill={BLUE}>2</L>
      <L x={790} y={280} size={9} fill={MUTED}>pairs in mesh</L>

      {/* ── Formula strip ── */}
      <Panel x={490} y={360} w={390} title="Definitions" accent={BLUE} rows={[
        ['Arc of contact = path of contact / cos φ', '', N],
        ['Contact ratio = arc of contact / circular pitch', '', GREEN],
        ['Must exceed 1.0 — practical min ≈ 1.2', '', RED],
      ]} />
    </Scene>
  )
}

/* Unit 9 — interference-tip-inside-base-circle */
export function M5InterferenceScene() {
  return (
    <Scene caption="Interference — tip contact inside the base circle where no involute exists">
      {/* ── Normal case (left) ── */}
      <Card x={20} y={20} w={260} h={220} title="✓ Normal mesh" accent={GREEN}>
        <circle cx={85} cy={110} r={48} fill="none" stroke={BLUE} strokeWidth={2} />
        <circle cx={175} cy={110} r={48} fill="none" stroke={AMBER} strokeWidth={2} />
        <circle cx={85} cy={110} r={38} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 3" />
        <circle cx={175} cy={110} r={38} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 3" />
        <Wire d="M105 165 L155 55" stroke={GREEN} width={2} />
        <Dot cx={112} cy={152} r={4} fill={GREEN} />
        <Dot cx={148} cy={68} r={4} fill={GREEN} />
        <L x={115} y={170} size={8} fill={GREEN} anchor="start">T₁</L>
        <L x={151} y={60} size={8} fill={GREEN} anchor="start">T₂</L>
        <Dot cx={120} cy={135} r={3} fill={BLUE} />
        <Dot cx={140} cy={85} r={3} fill={BLUE} />
        <L x={130} y={196} size={9} fill={GREEN}>crossings inside limits</L>
      </Card>

      {/* ── Interference case (centre) ── */}
      <Card x={300} y={20} w={290} h={280} title="✗ Interference" accent={RED}>
        <circle cx={100} cy={110} r={52} fill="none" stroke={BLUE} strokeWidth={2} />
        <circle cx={200} cy={110} r={52} fill="none" stroke={AMBER} strokeWidth={2} />
        <circle cx={100} cy={110} r={40} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 3" />
        <circle cx={200} cy={110} r={40} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 3" />
        <Wire d="M118 175 L182 45" stroke={MUTED} width={1.8} dash="5 3" />
        <Dot cx={125} cy={160} r={4} fill={MUTED} />
        <L x={110} y={176} size={8} fill={MUTED} anchor="end">T₁ limit</L>
        <Dot cx={115} cy={180} r={5} fill={RED} className="komm-pulse" />
        <L x={105} y={198} size={9} fill={RED} anchor="end">beyond T₁!</L>
        <rect x="90" y="160" width="40" height="32" rx="4" fill={RED} opacity={0.15} />
        <Wire d="M180 148 Q170 160 172 172 Q174 180 180 184"
          stroke={RED} width={2.5} className="komm-pulse" />
        <L x={186} y={178} size={8} fill={RED} anchor="start">gouge</L>
        <Wire d="M195 152 L195 170" stroke={RED} width={1.5} dash="3 2" />
        <L x={220} y={164} size={8} fill={RED} anchor="start">no involute</L>
        <L x={220} y={178} size={8} fill={RED} anchor="start">below base ○</L>
        <rect x="168" y="156" width="18" height="30" rx="3" fill={RED} opacity={0.2} />
        <L x={145} y={250} size={9} fill={RED}>tip gouges into flank</L>
      </Card>

      {/* Causes */}
      <Panel x={610} y={20} w={270} title="Causes of interference" accent={RED} rows={[
        ['Too large an addendum', '', RED],
        ['Too few teeth on pinion', '', RED],
        ['Too small pressure angle', '', RED],
      ]} />

      {/* ── Three remedy panels ── */}
      <L x={450} y={328} size={12} fill={N}>Remedies</L>

      <Card x={20} y={346} w={270} h={130} title="① Increase φ" accent={BLUE}>
        <Wire d="M40 60 L120 60" stroke={MUTED} width={1.5} dash="4 3" />
        <Wire d="M40 60 L130 40" stroke={BLUE} width={2} marker="url(#komArrB)" />
        <L x={136} y={38} size={8} fill={BLUE} anchor="start">φ ↑</L>
        <L x={135} y={84} size={10} fill={N}>Line of action rotates</L>
        <L x={135} y={100} size={10} fill={GREEN}>crossing returns inside</L>
      </Card>

      <Card x={310} y={346} w={270} h={130} title="② Shorten addendum" accent={AMBER}>
        <circle cx={80} cy={72} r={34} fill="none" stroke={AMBER} strokeWidth={2} />
        <circle cx={80} cy={72} r={42} fill="none" stroke={AMBER} strokeWidth={1.2} strokeDasharray="4 3" opacity={0.4} />
        <Wire d="M114 72 L122 72" stroke={RED} width={2} />
        <Wire d="M122 72 L114 72" stroke={GREEN} width={2} marker="url(#komArrG)" />
        <L x={135} y={84} size={10} fill={N}>Addendum pulled back</L>
        <L x={135} y={100} size={10} fill={GREEN}>crossing moves inward</L>
      </Card>

      <Card x={600} y={346} w={280} h={130} title="③ More teeth (↑z)" accent={TEAL}>
        <circle cx={70} cy={72} r={28} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 3" />
        <circle cx={70} cy={72} r={36} fill="none" stroke={TEAL} strokeWidth={2} />
        <L x={70} y={76} size={9} fill={TEAL}>r_b ↑</L>
        <L x={145} y={84} size={10} fill={N}>Larger base circle</L>
        <L x={145} y={100} size={10} fill={GREEN}>limit moves outward</L>
      </Card>
    </Scene>
  )
}

/* Unit 10 — undercutting-and-minimum-teeth */
export function M5UndercuttingScene() {
  return (
    <Scene caption="Undercutting — the cutter removes root material when the pinion has too few teeth">
      <L x={200} y={34} size={13} fill={N}>Generating process — undercutting</L>

      {/* Pinion blank */}
      <Wire d="M80 420 A 90 90 0 0 1 260 420" stroke={BLUE} width={2.5} />
      <L x={170} y={460} size={10} fill={BLUE}>pinion blank (few teeth)</L>

      {/* Rack cutter */}
      <rect x="110" y="140" width="120" height="160" rx="4" fill={WHITE} stroke={AMBER} strokeWidth={2.5} />
      <Wire d="M120 300 L140 260 L160 300" stroke={AMBER} width={2.2} />
      <Wire d="M160 300 L180 260 L200 300" stroke={AMBER} width={2.2} />
      <L x={170} y={154} size={10} fill={AMBER}>rack cutter</L>
      <Wire d="M140 340 Q155 360 170 340" stroke={RED} width={2.5} className="komm-pulse" />
      <L x={170} y={380} size={9} fill={RED}>tip sweeps root</L>

      {/* Removed material */}
      <path d="M135 340 Q155 380 175 340 Q170 360 155 370 Q140 360 135 340 Z"
        fill={RED} opacity={0.2} />
      <L x={100} y={398} size={9} fill={RED} anchor="end">material removed</L>

      {/* Full tooth ghost */}
      <Wire d="M140 420 L138 340 Q148 318 158 314 L172 314 Q182 318 192 340 L190 420"
        stroke={MUTED} width={1.8} dash="5 3" opacity={0.4} />
      <L x={80} y={316} size={8} fill={MUTED} anchor="end">full tooth</L>
      <L x={80} y={330} size={8} fill={MUTED} anchor="end">(ghosted)</L>

      {/* Undercut tooth */}
      <Wire d="M145 420 L147 355 Q155 330 165 326 L175 326 Q185 330 187 355 L185 420"
        stroke={N} width={2.5} />
      <rect x="146" y="350" width="40" height="30" rx="3" fill={RED} opacity={0.15} />
      <L x={250} y={364} size={9} fill={RED} anchor="start">weak root</L>
      <Wire d="M186 365 L248 365" stroke={RED} width={1} dash="3 2" />

      <Card x={260} y={350} w={170} h={110} title="Strength" accent={RED}>
        <L x={85} y={54} size={10} fill={N}>Full tooth: 100%</L>
        <L x={85} y={74} size={10} fill={RED}>Undercut: ~65%</L>
        <L x={85} y={94} size={9} fill={RED}>fails sooner in bending</L>
      </Card>

      {/* ── Bar chart: min teeth vs φ ── */}
      <rect x="470" y="30" width="410" height="290" rx="10" fill={WHITE} stroke={BLUE} strokeWidth={1.8} />
      <L x={675} y={56} size={13} fill={N}>Minimum teeth to avoid undercutting</L>

      <Axes x={520} y={290} w={330} h={220} xLabel="Pressure angle φ" yLabel="z_min" />

      <rect x="560" y="106" width="60" height="184" rx="6" fill={PURP} opacity={0.7} />
      <M x={590} y={98} size={12} fill={PURP}>32</M>
      <M x={590} y={308} size={11} fill={MUTED}>14.5°</M>

      <rect x="660" y="200" width="60" height="90" rx="6" fill={BLUE} opacity={0.7} />
      <M x={690} y={192} size={12} fill={BLUE}>17</M>
      <M x={690} y={308} size={11} fill={MUTED}>20°</M>

      <rect x="760" y="218" width="60" height="72" rx="6" fill={GREEN} opacity={0.7} />
      <M x={790} y={210} size={12} fill={GREEN}>14</M>
      <M x={790} y={308} size={11} fill={MUTED}>25°</M>

      <Curve pts={[[590,106],[690,200],[790,218]]} stroke={RED} width={2} dash="6 4" />

      <L x={675} y={344} size={10} fill={N}>Higher φ → fewer teeth allowed</L>
      <L x={675} y={362} size={10} fill={AMBER}>but bearing loads increase</L>
      <Wire d="M655 370 L695 370" stroke={AMBER} width={1.5} marker="url(#komArrA)" />
    </Scene>
  )
}

/* Unit 11 — helical-tooth-normal-and-transverse */
export function M5HelicalToothPlanesScene() {
  return (
    <Scene caption="Helical gear — normal and transverse planes, gradual engagement">
      <L x={220} y={34} size={13} fill={N}>Cutting planes through a helical tooth</L>

      {/* Gear cylinder outline */}
      <rect x="80" y="70" width="260" height="310" rx="14" fill={WHITE} stroke={BLUE} strokeWidth={2.5} />
      <Wire d="M100 120 L320 180" stroke={BLUE} width={2} />
      <Wire d="M100 160 L320 220" stroke={BLUE} width={2} />
      <Wire d="M100 200 L320 260" stroke={BLUE} width={2} />
      <Wire d="M100 240 L320 300" stroke={BLUE} width={2} />
      <Wire d="M100 158 L320 218" stroke={AMBER} width={4} opacity={0.5} />

      {/* Helix angle */}
      <Wire d="M100 200 L100 160" stroke={MUTED} width={1.5} dash="4 3" />
      <Wire d="M100 200 L140 175" stroke={MUTED} width={1.5} dash="4 3" />
      <Wire d="M100 178 A 22 22 0 0 1 114 183" stroke={PURP} width={1.8} />
      <L x={118} y={176} size={10} fill={PURP} anchor="start">ψ</L>

      {/* Transverse plane */}
      <Wire d="M60 220 L360 220" stroke={BLUE} width={2} dash="6 4" />
      <L x={365} y={224} size={9} fill={BLUE} anchor="start">transverse</L>
      <L x={365} y={238} size={9} fill={BLUE} anchor="start">plane</L>

      {/* Normal plane */}
      <Wire d="M160 145 L260 305" stroke={GREEN} width={2} dash="6 4" />
      <L x={268} y={310} size={9} fill={GREEN} anchor="start">normal</L>
      <L x={268} y={324} size={9} fill={GREEN} anchor="start">plane</L>

      {/* Transverse section */}
      <Card x={460} y={30} w={200} h={150} title="Transverse section" accent={BLUE}>
        <Wire d="M60 60 L60 120 Q80 130 100 120 L100 60 Q80 50 60 60"
          stroke={BLUE} width={2.5} />
        <Wire d="M55 90 L105 90" stroke={MUTED} width={1} dash="3 2" />
        <L x={80} y={82} size={8} fill={BLUE}>p_t</L>
        <L x={100} y={138} size={10} fill={N}>wider</L>
      </Card>

      {/* Normal section */}
      <Card x={680} y={30} w={200} h={150} title="Normal section" accent={GREEN}>
        <Wire d="M65 65 L65 115 Q80 122 95 115 L95 65 Q80 58 65 65"
          stroke={GREEN} width={2.5} />
        <Wire d="M60 90 L100 90" stroke={MUTED} width={1} dash="3 2" />
        <L x={80} y={82} size={8} fill={GREEN}>p_n</L>
        <L x={80} y={138} size={10} fill={N}>narrower</L>
      </Card>

      <Panel x={460} y={200} w={420} title="Pitch relation" accent={PURP} rows={[
        ['p_t = p_n / cos ψ', '', PURP],
        ['m_t = m_n / cos ψ', '', PURP],
        ['d = m_t × z = m_n × z / cos ψ', '', N],
      ]} />

      <L x={670} y={338} size={12} fill={N}>Engagement comparison</L>

      <Card x={460} y={352} w={200} h={120} title="Spur" accent={RED}>
        <rect x="40" y="50" width="120" height="24" rx="4" fill={RED} opacity={0.25} />
        <L x={100} y={66} size={9} fill={RED}>full contact at once</L>
        <L x={100} y={98} size={10} fill={RED}>shock ⚡</L>
      </Card>

      <Card x={680} y={352} w={200} h={120} title="Helical" accent={GREEN}>
        <rect x="40" y="50" width="30" height="24" rx="4" fill={GREEN} opacity={0.15} />
        <rect x="70" y="50" width="30" height="24" rx="4" fill={GREEN} opacity={0.3} />
        <rect x="100" y="50" width="30" height="24" rx="4" fill={GREEN} opacity={0.5} />
        <rect x="130" y="50" width="30" height="24" rx="4" fill={GREEN} opacity={0.7} />
        <L x={100} y={66} size={9} fill={GREEN}>gradual ✓</L>
        <L x={100} y={98} size={10} fill={GREEN}>{'smooth & quiet'}</L>
      </Card>

      <Wire d="M80 418 L52 418" stroke={RED} width={2.5} marker="url(#komArrR)" className="komm-pulse" />
      <L x={48} y={408} size={9} fill={RED} anchor="end">axial thrust</L>
    </Scene>
  )
}

/* Unit 12 — three-force-components-on-helical-tooth */
export function M5HelicalForcesScene() {
  const tx = 200, ty = 240
  return (
    <Scene caption="Helical gear forces — three components and the herringbone solution">
      <L x={200} y={34} size={13} fill={N}>Force components on a helical tooth</L>

      {/* Gear tooth outline */}
      <rect x="120" y="100" width="160" height="260" rx="10" fill={WHITE} stroke={BLUE} strokeWidth={2.5} />
      <Wire d="M130 150 L270 190" stroke={BLUE} width={1.8} />
      <Wire d="M130 200 L270 240" stroke={BLUE} width={1.8} />
      <Wire d="M130 250 L270 290" stroke={BLUE} width={1.8} />

      {/* Total force */}
      <Wire d={`M${tx} ${ty} L${n(tx) + 100} ${n(ty) - 80}`}
        stroke={N} width={3} marker="url(#komArr)" />
      <L x={n(tx) + 106} y={n(ty) - 84} size={10} fill={N} anchor="start">F_total</L>

      {/* Tangential */}
      <Wire d={`M${tx} ${ty} L${n(tx) + 100} ${ty}`}
        stroke={GREEN} width={2.8} marker="url(#komArrG)" className="komm-pulse" />
      <L x={n(tx) + 106} y={n(ty) + 4} size={10} fill={GREEN} anchor="start">F_t (tangential)</L>
      <M x={n(tx) + 106} y={n(ty) + 20} size={9} fill={GREEN} anchor="start">transmits torque</M>

      {/* Radial */}
      <Wire d={`M${tx} ${ty} L${tx} ${n(ty) - 80}`}
        stroke={AMBER} width={2.8} marker="url(#komArrA)" />
      <L x={n(tx) + 10} y={n(ty) - 86} size={10} fill={AMBER} anchor="start">F_r (radial)</L>
      <M x={n(tx) + 10} y={n(ty) - 70} size={9} fill={AMBER} anchor="start">separating</M>

      {/* Axial */}
      <Wire d={`M${tx} ${ty} L${n(tx) - 50} ${n(ty) + 40}`}
        stroke={RED} width={2.8} marker="url(#komArrR)" className="komm-pulse" />
      <L x={n(tx) - 56} y={n(ty) + 48} size={10} fill={RED} anchor="end">F_a (axial)</L>
      <M x={n(tx) - 56} y={n(ty) + 64} size={9} fill={RED} anchor="end">F_a = F_t tan ψ</M>

      <Dot cx={tx} cy={ty} r={5} fill={N} />

      {/* Formulas */}
      <Panel x={440} y={30} w={260} title="Force formulas" accent={BLUE} rows={[
        ['F_t = T / (d/2)', '', GREEN],
        ['F_r = F_t tan φ', '', AMBER],
        ['F_a = F_t tan ψ', '', RED],
        ['F_total = F_t / (cos φ cos ψ)', '', N],
      ]} />

      <Card x={440} y={210} w={260} h={100} title="ψ effect on F_a" accent={RED}>
        <L x={130} y={54} size={10} fill={N}>ψ ↑ → F_a grows rapidly</L>
        <L x={130} y={74} size={10} fill={RED}>bearing must react thrust</L>
      </Card>

      {/* Bearing load indicator */}
      <rect x="720" y="210" width="20" height="100" rx="4" fill={SKY} />
      <rect x="720" y="260" width="20" height="50" rx="4" fill={RED} opacity={0.5} className="komm-pulse" />
      <L x={730} y={200} size={9} fill={MUTED}>bearing</L>
      <L x={730} y={326} size={9} fill={RED}>load</L>

      {/* ── Herringbone ── */}
      <Card x={440} y={330} w={440} h={146} title="Herringbone — thrust cancellation" accent={TEAL}>
        <rect x="40" y="48" width="160" height="70" rx="8" fill={WHITE} stroke={TEAL} strokeWidth={2.5} />
        <Wire d="M50 60 L118 80" stroke={TEAL} width={2} />
        <Wire d="M50 80 L118 100" stroke={TEAL} width={2} />
        <Wire d="M122 80 L190 60" stroke={TEAL} width={2} />
        <Wire d="M122 100 L190 80" stroke={TEAL} width={2} />
        <Wire d="M120 46 L120 122" stroke={MUTED} width={1} dash="3 2" />
        <Wire d="M70 128 L40 128" stroke={RED} width={2} marker="url(#komArrR)" />
        <Wire d="M160 128 L190 128" stroke={RED} width={2} marker="url(#komArrR)" />
        <L x={120} y={142} size={9} fill={TEAL}>cancel at centre</L>
        <rect x="240" y="54" width="160" height="36" rx="8" fill={GREEN} opacity={0.15} />
        <L x={320} y={76} size={12} fill={GREEN}>Net F_a = 0</L>
        <L x={320} y={96} size={10} fill={TEAL}>no thrust bearing needed</L>
      </Card>
    </Scene>
  )
}

/* Unit 13 — worm-drive-ratio-and-efficiency */
export function M5WormDriveScene() {
  return (
    <Scene caption="Worm drive — enormous ratio in one stage, paid for in efficiency and heat">
      {/* ── Worm and wheel in mesh ── */}
      <L x={220} y={34} size={13} fill={N}>Worm and wheel mesh</L>

      {/* Worm (horizontal screw) */}
      <rect x="80" y="100" width="200" height="40" rx="10" fill={WHITE} stroke={TEAL} strokeWidth={2.5} />
      {/* Thread lines */}
      <Wire d="M100 102 L118 138" stroke={TEAL} width={2} />
      <Wire d="M130 102 L148 138" stroke={TEAL} width={2} />
      <Wire d="M160 102 L178 138" stroke={TEAL} width={2} />
      <Wire d="M190 102 L208 138" stroke={TEAL} width={2} />
      <Wire d="M220 102 L238 138" stroke={TEAL} width={2} />
      <L x={180} y={86} size={11} fill={TEAL}>worm</L>

      {/* Worm starts highlighted */}
      <Dot cx={110} cy={120} r={4} fill={AMBER} className="komm-pulse" />
      <Dot cx={140} cy={120} r={4} fill={AMBER} className="komm-pulse" />
      <L x={125} y={160} size={9} fill={AMBER}>2 starts</L>

      {/* Wheel (large gear below worm) */}
      <circle cx={180} cy={280} r={80} fill="none" stroke={TEAL} strokeWidth={2.5} />
      {/* Teeth on wheel */}
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => {
        const a = (i * 30) * Math.PI / 180
        const ix = 180 + 80 * Math.cos(a)
        const iy = 280 + 80 * Math.sin(a)
        const ox = 180 + 90 * Math.cos(a)
        const oy = 280 + 90 * Math.sin(a)
        return <Wire key={i} d={`M${ix.toFixed(0)} ${iy.toFixed(0)} L${ox.toFixed(0)} ${oy.toFixed(0)}`}
          stroke={TEAL} width={1.5} />
      })}
      <L x={180} y={284} size={10} fill={TEAL}>40 teeth</L>
      <L x={180} y={380} size={10} fill={TEAL}>wheel</L>

      {/* Rotation arrows */}
      <Wire d="M290 120 L330 120" stroke={BLUE} width={2.5} marker="url(#komArrB)" className="komm-pulse" />
      <L x={310} y={108} size={9} fill={BLUE}>1 rev</L>

      <Wire d="M280 280 A 30 30 0 0 1 280 310" stroke={AMBER} width={2.5} marker="url(#komArrA)" />
      <L x={300} y={298} size={9} fill={AMBER}>2 teeth</L>

      {/* Ratio computation */}
      <Card x={370} y={70} w={240} h={110} title="Ratio" accent={BLUE}>
        <M x={120} y={52} size={12} fill={N}>i = z_wheel / starts</M>
        <M x={120} y={72} size={12} fill={BLUE}>i = 40 / 2 = 20:1</M>
        <L x={120} y={94} size={10} fill={MUTED}>single stage!</L>
      </Card>

      {/* ── Efficiency vs lead angle plot ── */}
      <rect x="370" y="200" width="510" height="256" rx="10" fill={WHITE} stroke={BLUE} strokeWidth={1.8} />
      <L x={625} y={226} size={12} fill={N}>Efficiency vs lead angle</L>

      <Axes x={420} y={410} w={410} h={170} xLabel="Lead angle λ" yLabel="η %" />

      {/* Efficiency curve — rises steeply then flattens */}
      <Curve pts={[
        [420,400],[450,360],[480,310],[520,280],[560,268],
        [600,260],[650,256],[700,254],[750,252],[800,250]
      ]} stroke={GREEN} width={2.8} className="komm-draw" />

      {/* Self-locking region */}
      <rect x="420" y="340" width="80" height="70" rx="4" fill={RED} opacity={0.15} />
      <L x={460} y={334} size={9} fill={RED}>self-locking</L>
      <L x={460} y={426} size={8} fill={RED}>λ {'<'} friction angle</L>

      {/* Heat indicator */}
      <rect x="840" y="320" width="24" height="90" rx="4" fill={SKY} />
      <rect x="840" y="360" width="24" height="50" rx="4" fill={RED} opacity={0.5} className="komm-pulse" />
      <L x={852} y={312} size={8} fill={MUTED}>heat</L>

      {/* Annotation */}
      <L x={700} y={426} size={9} fill={MUTED}>higher λ → better η, but no self-lock</L>
    </Scene>
  )
}

/* Unit 14 — three-train-types */
export function M5ThreeTrainTypesScene() {
  return (
    <Scene caption="Simple, compound and reverted gear trains">
      {/* ── Panel 1: Simple train ── */}
      <Card x={15} y={18} w={280} h={220} title="Simple train" accent={BLUE}>
        {/* Four gears in line */}
        <circle cx={40} cy={90} r={24} fill="none" stroke={BLUE} strokeWidth={2} />
        <circle cx={95} cy={90} r={22} fill="none" stroke={MUTED} strokeWidth={1.8} />
        <circle cx={145} cy={90} r={22} fill="none" stroke={MUTED} strokeWidth={1.8} />
        <circle cx={200} cy={90} r={28} fill="none" stroke={AMBER} strokeWidth={2} />
        <L x={40} y={94} size={8} fill={BLUE}>z₁</L>
        <L x={95} y={94} size={8} fill={MUTED}>idler</L>
        <L x={145} y={94} size={8} fill={MUTED}>idler</L>
        <L x={200} y={94} size={8} fill={AMBER}>z₄</L>
        {/* Direction arrows */}
        <Wire d="M40 62 L50 58" stroke={BLUE} width={1.5} marker="url(#komArrB)" />
        <Wire d="M95 64 L85 60" stroke={MUTED} width={1.5} marker="url(#komArrM)" />
        <Wire d="M145 64 L155 60" stroke={MUTED} width={1.5} marker="url(#komArrM)" />
        <Wire d="M200 58 L190 54" stroke={AMBER} width={1.5} marker="url(#komArrA)" />
        <L x={120} y={134} size={9} fill={BLUE}>direction flips each idler</L>
        <M x={140} y={158} size={11} fill={N}>ratio = z₁ / z₄ only</M>
        <L x={140} y={178} size={9} fill={MUTED}>intermediates cancel</L>
      </Card>

      {/* ── Panel 2: Compound train ── */}
      <Card x={310} y={18} w={280} h={220} title="Compound train" accent={AMBER}>
        {/* Two stages — two gears keyed to common shaft */}
        <circle cx={60} cy={80} r={28} fill="none" stroke={BLUE} strokeWidth={2} />
        <circle cx={120} cy={80} r={20} fill="none" stroke={AMBER} strokeWidth={2} />
        {/* Common shaft mark */}
        <circle cx={160} cy={80} r={22} fill="none" stroke={AMBER} strokeWidth={2} />
        <rect x="132" y="72" width="36" height="16" rx="3" fill={AMBER} opacity={0.15} />
        <L x={146} y={64} size={7} fill={AMBER}>keyed</L>
        <circle cx={210} cy={80} r={30} fill="none" stroke={GREEN} strokeWidth={2} />
        <L x={60} y={84} size={8} fill={BLUE}>z₁</L>
        <L x={120} y={84} size={8} fill={AMBER}>z₂</L>
        <L x={160} y={84} size={8} fill={AMBER}>z₃</L>
        <L x={210} y={84} size={8} fill={GREEN}>z₄</L>
        <M x={140} y={134} size={10} fill={N}>ratio = (z₁/z₂)(z₃/z₄)</M>
        <L x={140} y={154} size={9} fill={AMBER}>two stages multiply</L>
        <L x={140} y={174} size={9} fill={MUTED}>large reduction, compact</L>
      </Card>

      {/* ── Panel 3: Reverted train ── */}
      <Card x={605} y={18} w={280} h={220} title="Reverted train" accent={GREEN}>
        {/* Input and output coaxial */}
        <circle cx={90} cy={80} r={30} fill="none" stroke={BLUE} strokeWidth={2} />
        <circle cx={150} cy={80} r={20} fill="none" stroke={AMBER} strokeWidth={2} />
        {/* Keyed pair */}
        <circle cx={150} cy={80} r={26} fill="none" stroke={AMBER} strokeWidth={1.5} strokeDasharray="4 3" />
        <circle cx={90} cy={80} r={24} fill="none" stroke={GREEN} strokeWidth={2} strokeDasharray="4 3" />
        {/* Centre distance lines */}
        <Wire d="M90 120 L150 120" stroke={PURP} width={2} />
        <L x={120} y={136} size={8} fill={PURP}>d₁</L>
        <Wire d="M90 140 L150 140" stroke={PURP} width={2} />
        <L x={120} y={156} size={8} fill={PURP}>d₂</L>
        <L x={90} y={84} size={8} fill={BLUE}>in</L>
        <L x={90} y={172} size={8} fill={GREEN}>out</L>
        <L x={150} y={84} size={8} fill={AMBER}>●</L>
        <L x={140} y={188} size={9} fill={PURP}>d₁ = d₂ (coaxial)</L>
        <M x={140} y={206} size={9} fill={N}>r₁+r₂ = r₃+r₄</M>
      </Card>

      {/* ── Comparison strip ── */}
      <Panel x={15} y={260} w={870} title="Comparison" accent={BLUE} rows={[
        ['Simple: idlers change direction, NOT ratio', '', BLUE],
        ['Compound: stage ratios multiply → large reduction', '', AMBER],
        ['Reverted: input–output coaxial → centre distances must match', '', GREEN],
        ['Train value = product of (driver teeth / driven teeth)', '', N],
      ]} />

      {/* Direction indicator for simple train */}
      <L x={450} y={438} size={11} fill={MUTED}>Even number of idlers → same direction; odd → reversed</L>
    </Scene>
  )
}

/* Unit 15 — epicyclic-tabular-method */
export function M5EpicyclicTabularScene() {
  /* Sun–planet–annulus–arm assembly with 3-row tabular method */
  const sx = 200, sy = 200  /* sun centre */
  const sr = 30, pr = 20, ar = 80  /* sun, planet, annulus radii */
  return (
    <Scene caption="Epicyclic gear train — tabular method of analysis">
      <L x={200} y={34} size={13} fill={N}>Sun–planet–annulus–arm</L>

      {/* Annulus (ring gear) */}
      <circle cx={sx} cy={sy} r={ar} fill="none" stroke={TEAL} strokeWidth={2.5} />
      <L x={sx} y={n(sy) - n(ar) - 12} size={10} fill={TEAL}>annulus (A)</L>

      {/* Sun gear */}
      <circle cx={sx} cy={sy} r={sr} fill="none" stroke={BLUE} strokeWidth={2.5} />
      <L x={sx} y={n(sy) + 4} size={10} fill={BLUE}>S</L>

      {/* Planet gear — between sun and annulus */}
      <circle cx={n(sx) + n(sr) + n(pr)} cy={sy} r={pr} fill="none" stroke={AMBER} strokeWidth={2.5}
        className="komm-spin-slow" />
      <L x={n(sx) + n(sr) + n(pr)} y={n(sy) + 4} size={9} fill={AMBER}>P</L>

      {/* Arm */}
      <Wire d={`M${sx} ${sy} L${n(sx) + n(sr) + n(pr)} ${sy}`}
        stroke={PURP} width={3} />
      <Dot cx={sx} cy={sy} r={4} fill={PURP} />
      <L x={n(sx) + n(sr) + n(pr) / 2} y={n(sy) - 12} size={9} fill={PURP}>arm</L>

      {/* Labels */}
      <L x={sx} y={n(sy) + n(ar) + 24} size={9} fill={MUTED}>z_S, z_P, z_A</L>

      {/* ── Three-row table (right side) ── */}
      <rect x="340" y="30" width="540" height="310" rx="10" fill={WHITE} stroke={BLUE} strokeWidth={1.8} />
      <L x={610} y={56} size={13} fill={N}>Tabular method</L>

      {/* Column headers */}
      <rect x="350" y="66" width="100" height="26" rx="5" fill={MUTED} />
      <L x={400} y={84} size={9} fill={WHITE}>Operation</L>
      <rect x="460" y="66" width="80" height="26" rx="5" fill={PURP} />
      <L x={500} y={84} size={9} fill={WHITE}>Arm</L>
      <rect x="550" y="66" width="80" height="26" rx="5" fill={BLUE} />
      <L x={590} y={84} size={9} fill={WHITE}>Sun</L>
      <rect x="640" y="66" width="80" height="26" rx="5" fill={AMBER} />
      <L x={680} y={84} size={9} fill={WHITE}>Planet</L>
      <rect x="730" y="66" width="80" height="26" rx="5" fill={TEAL} />
      <L x={770} y={84} size={9} fill={WHITE}>Annulus</L>

      {/* Row 1: Lock all, turn +1 */}
      <g className="komm-fade-in">
        <L x={400} y={118} size={10} fill={N}>Lock all, +1 rev</L>
        <M x={500} y={118} size={12} fill={PURP}>+1</M>
        <M x={590} y={118} size={12} fill={BLUE}>+1</M>
        <M x={680} y={118} size={12} fill={AMBER}>+1</M>
        <M x={770} y={118} size={12} fill={TEAL}>+1</M>
      </g>
      <Wire d="M350 130 L860 130" stroke={MUTED} width={0.8} opacity={0.3} />

      {/* Row 2: Hold arm, turn sun −1 */}
      <g className="komm-fade-in komm-delay-1">
        <L x={400} y={164} size={10} fill={N}>Hold arm, sun −1</L>
        <M x={500} y={164} size={12} fill={PURP}>0</M>
        <M x={590} y={164} size={12} fill={BLUE}>−1</M>
        <M x={680} y={164} size={12} fill={AMBER}>+z_S/z_P</M>
        <M x={770} y={164} size={12} fill={TEAL}>+z_S/z_A</M>
      </g>
      <Wire d="M350 180 L860 180" stroke={MUTED} width={0.8} opacity={0.3} />

      {/* Row 3: Sum */}
      <g className="komm-fade-in komm-delay-2">
        <rect x="350" y="192" width="520" height="30" rx="5" fill={SKY} />
        <L x={400} y={212} size={10} fill={N} weight={800}>SUM</L>
        <M x={500} y={212} size={12} fill={PURP} weight={800}>+1</M>
        <M x={590} y={212} size={12} fill={BLUE} weight={800}>0</M>
        <M x={680} y={212} size={12} fill={AMBER} weight={800}>1+z_S/z_P</M>
        <M x={770} y={212} size={12} fill={TEAL} weight={800}>1+z_S/z_A</M>
      </g>

      {/* Explanation */}
      <L x={610} y={250} size={10} fill={MUTED}>Row 1 + Row 2 → actual speeds</L>
      <L x={610} y={270} size={10} fill={GREEN}>Any member can be fixed/input/output</L>

      {/* Result readout */}
      <Panel x={360} y={290} w={250} title="If annulus fixed" accent={TEAL} rows={[
        ['Set A speed = 0', '', TEAL],
        ['Solve for arm speed', '', PURP],
        ['Very high ratio possible', '', GREEN],
      ]} />

      <Card x={630} y={290} w={230} h={100} title="Key identity" accent={BLUE}>
        <M x={115} y={56} size={11} fill={N}>(ω_S − ω_arm)</M>
        <M x={115} y={76} size={11} fill={N}>/ (ω_A − ω_arm) = −z_A/z_S</M>
      </Card>

      {/* Assembly animation note */}
      <L x={200} y={320} size={10} fill={MUTED}>Step 1: lock → rotate body</L>
      <L x={200} y={340} size={10} fill={MUTED}>Step 2: hold arm → turn gears</L>
      <L x={200} y={360} size={10} fill={MUTED}>Step 3: add the two motions</L>

      {/* Motion arrows on assembly */}
      <Wire d={`M${n(sx) - 40} ${n(sy) - 20} A 40 40 0 0 1 ${n(sx) - 40} ${n(sy) + 20}`}
        stroke={PURP} width={2} marker="url(#komArrP)" className="komm-pulse" />
      <L x={n(sx) - 56} y={sy} size={8} fill={PURP} anchor="end">arm</L>
    </Scene>
  )
}

/* Unit 16 — train-selection-decision-map */
export function M5TrainSelectionScene() {
  return (
    <Scene caption="Gear train selection — ratio, shaft arrangement, space and efficiency">
      <L x={450} y={34} size={13} fill={N}>Train selection decision map</L>

      {/* ── Decision map grid ── */}
      {/* Axis labels */}
      <L x={30} y={260} size={11} fill={MUTED} anchor="start" weight={800}>Ratio</L>
      <L x={450} y={70} size={11} fill={MUTED}>Shaft arrangement</L>

      {/* Column headers */}
      <rect x="120" y="80" width="160" height="26" rx="6" fill={BLUE} />
      <L x={200} y={98} size={10} fill={WHITE}>Parallel</L>
      <rect x="300" y="80" width="160" height="26" rx="6" fill={AMBER} />
      <L x={380} y={98} size={10} fill={WHITE}>Coaxial</L>
      <rect x="480" y="80" width="160" height="26" rx="6" fill={TEAL} />
      <L x={560} y={98} size={10} fill={WHITE}>Any angle</L>

      {/* Row headers */}
      <L x={108} y={148} size={10} fill={MUTED} anchor="end">≤ 6</L>
      <L x={108} y={218} size={10} fill={MUTED} anchor="end">6–40</L>
      <L x={108} y={288} size={10} fill={MUTED} anchor="end">40–100+</L>

      {/* ── Region cells ── */}
      {/* Single pair — low ratio, parallel */}
      <Card x={120} y={116} w={160} h={60} title="" accent={BLUE}>
        <L x={80} y={24} size={11} fill={BLUE}>Single pair</L>
        <L x={80} y={42} size={9} fill={MUTED}>η ≈ 98%</L>
      </Card>

      {/* Compound — medium ratio, parallel */}
      <Card x={120} y={190} w={160} h={60} title="" accent={BLUE}>
        <L x={80} y={24} size={11} fill={BLUE}>Compound</L>
        <L x={80} y={42} size={9} fill={MUTED}>η ≈ 95%</L>
      </Card>

      {/* Reverted — medium ratio, coaxial */}
      <Card x={300} y={148} w={160} h={60} title="" accent={AMBER}>
        <L x={80} y={24} size={11} fill={AMBER}>Reverted</L>
        <L x={80} y={42} size={9} fill={MUTED}>η ≈ 94%</L>
      </Card>

      {/* Epicyclic — high ratio, coaxial, compact */}
      <Card x={300} y={224} w={160} h={70} title="" accent={GREEN}>
        <L x={80} y={24} size={11} fill={GREEN}>Epicyclic</L>
        <L x={80} y={42} size={9} fill={MUTED}>η ≈ 92%</L>
        <L x={80} y={56} size={8} fill={GREEN}>compact, coaxial</L>
      </Card>

      {/* Worm — very high ratio, any angle */}
      <Card x={480} y={224} w={160} h={70} title="" accent={TEAL}>
        <L x={80} y={24} size={11} fill={TEAL}>Worm drive</L>
        <L x={80} y={42} size={9} fill={RED}>η ≈ 40–85%</L>
        <L x={80} y={56} size={8} fill={TEAL}>self-lock possible</L>
      </Card>

      {/* Bevel — any angle, low ratio */}
      <Card x={480} y={116} w={160} h={60} title="" accent={TEAL}>
        <L x={80} y={24} size={11} fill={TEAL}>Bevel pair</L>
        <L x={80} y={42} size={9} fill={MUTED}>η ≈ 96%</L>
      </Card>

      {/* ── Efficiency chain calculator ── */}
      <rect x="30" y="330" width="530" height="130" rx="10" fill={WHITE} stroke={RED} strokeWidth={1.8} />
      <L x={295} y={354} size={12} fill={N}>Efficiency chain — 3 stages</L>

      {/* Stage boxes */}
      <Block x={50} y={370} w={110} h={44} label="Stage 1" sub="η₁ = 97%" stroke={BLUE} />
      <Wire d="M165 392 L195 392" stroke={MUTED} width={2} marker="url(#komArrM)" />
      <Block x={200} y={370} w={110} h={44} label="Stage 2" sub="η₂ = 96%" stroke={AMBER} />
      <Wire d="M315 392 L345 392" stroke={MUTED} width={2} marker="url(#komArrM)" />
      <Block x={350} y={370} w={110} h={44} label="Stage 3" sub="η₃ = 95%" stroke={GREEN} />

      {/* Cumulative result */}
      <Wire d="M465 392 L485 392" stroke={RED} width={2} marker="url(#komArrR)" />
      <rect x="490" y="370" width="60" height="44" rx="8" fill={RED} opacity={0.12} />
      <M x={520} y={388} size={12} fill={RED}>88.4%</M>
      <L x={520} y={406} size={8} fill={RED}>total</L>

      <L x={295} y={448} size={9} fill={RED}>η_total = η₁ × η₂ × η₃ — always lower than any single stage</L>

      {/* ── Volume comparison ── */}
      <rect x="590" y="330" width="290" height="130" rx="10" fill={WHITE} stroke={PURP} strokeWidth={1.8} />
      <L x={735} y={354} size={12} fill={N}>Volume comparison</L>

      {/* Compound — larger box */}
      <rect x="610" y="370" width="100" height="70" rx="6" fill={AMBER} opacity={0.2} stroke={AMBER} strokeWidth={1.5} />
      <L x={660} y={400} size={10} fill={AMBER}>Compound</L>
      <L x={660} y={418} size={8} fill={MUTED}>larger</L>

      {/* Epicyclic — smaller box, same ratio */}
      <rect x="740" y="380" width="60" height="50" rx="6" fill={GREEN} opacity={0.25} stroke={GREEN} strokeWidth={1.5} />
      <L x={770} y={402} size={10} fill={GREEN}>Epicyclic</L>
      <L x={770} y={418} size={8} fill={GREEN}>compact</L>

      <L x={735} y={450} size={9} fill={PURP}>same ratio, much less space</L>
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
  const pitch = Math.min(58, (294 - shift) / Math.max(1, steps.length))
  const stepH = Math.min(50, pitch - 6)
  const top = 136 + shift + steps.length * pitch
  const resultH = Math.min(96, 500 - top)
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
        <g key={String(st)} className={`komm-slide-in komm-delay-${i}`}>
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
      <g className="komm-emerge">
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
  // Module 2 — Velocity and Acceleration Analysis
  'absolute-relative-vector-triangle': M2AbsRelVectorScene,
  'rigid-link-relative-velocity-perpendicular': M2RigidLinkPerpScene,
  'velocity-polygon-construction-steps': M2VelPolygonScene,
  'velocity-image-similar-triangle': M2VelImageScene,
  'rubbing-velocity-at-a-pin': M2RubbingVelScene,
  'four-bar-and-slider-crank-side-by-side': M2FourBarSliderScene,
  'coincident-points-in-a-slot': M2CoincidentPointsScene,
  'differentiating-loop-closure-to-velocity': M2LoopClosureScene,
  'instant-centre-definition-and-count': M2InstantCentreScene,
  'kennedy-theorem-two-lines-intersect': M2KennedyScene,
  'angular-velocity-ratio-from-common-centre': M2AngVelRatioScene,
  'centrode-rolling-reproduction': M2CentrodeScene,
  'two-components-of-relative-acceleration': M2AccelComponentsScene,
  'acceleration-polygon-four-bar-build': M2AccelPolygonScene,
  'coriolis-two-causes-and-direction': M2CoriolisScene,
  'klein-construction-and-inflection-circle': M2KleinScene,
  // Module 4 — Dynamic Force Analysis
  'dalembert-conversion': M4DalembertConversionScene,
  'inertia-properties-and-parallel-axis': M4InertiaPropertiesScene,
  'offset-inertia-force-equivalence': M4OffsetInertiaForceScene,
  'dynamic-four-bar-workflow': M4DynamicFourBarScene,
  'piston-kinematics-curves': M4PistonKinematicsCurvesScene,
  'two-mass-equivalence-three-conditions': M4TwoMassEquivalenceScene,
  'rotating-versus-reciprocating-inertia': M4RotatingVsReciprocatingScene,
  'gas-plus-inertia-net-force': M4GasPlusInertiaScene,
  'engine-force-path-to-torque': M4EngineForcePathScene,
  'turning-moment-diagram-with-mean-line': M4TurningMomentDiagramScene,
  'energy-accumulation-table': M4EnergyAccumulationScene,
  'coefficient-of-fluctuation-scale': M4CoefficientOfFluctuationScene,
  'flywheel-sizing-chain': M4FlywheelSizingChainScene,
  'punching-press-energy-cycle': M4PunchingPressScene,
  'multi-cylinder-torque-superposition': M4MultiCylinderTorqueScene,
  'dynamic-analysis-integration-map': M4DynamicAnalysisIntegrationScene,
  // Module 3 — Computer-Aided Analysis and Static Force Analysis
  'complex-number-as-rotating-vector': M3ComplexNumberAsRotatingVectorScene,
  'complex-loop-equation-split': M3ComplexLoopEquationSplitScene,
  'position-solution-elimination-chain': M3PositionSolutionEliminationChainScene,
  'three-levels-one-equation': M3ThreeLevelsOneEquationScene,
  'slider-crank-harmonics-decomposition': M3SliderCrankHarmonicsDecompositionScene,
  'coupler-curve-atlas': M3CouplerCurveAtlasScene,
  'applied-versus-constraint-force-map': M3AppliedVersusConstraintForceMapScene,
  'free-body-isolation-sequence': M3FreeBodyIsolationSequenceScene,
  'two-and-three-force-member-conditions': M3TwoAndThreeForceMemberConditionsScene,
  'superposition-split-and-recombine': M3SuperpositionSplitAndRecombineScene,
  'graphical-force-propagation-four-bar': M3GraphicalForcePropagationFourBarScene,
  'force-equation-matrix-assembly': M3ForceEquationMatrixAssemblyScene,
  'friction-circle-at-a-pin': M3FrictionCircleAtAPinScene,
  'virtual-work-eliminates-pin-forces': M3VirtualWorkEliminatesPinForcesScene,
  'three-methods-decision-map': M3ThreeMethodsDecisionMapScene,
  'slider-crank-force-resolution-chain': M3SliderCrankForceResolutionChainScene,
  // Module 1 — Mechanisms and Machines
  'kinematics-kinetics-analysis-synthesis': M1KinematicsKineticsScene,
  'link-node-pair-anatomy': M1LinkAnatomyScene,
  'three-constraint-types-comparison': M1ConstraintTypesScene,
  'rigid-resistant-body-loading': M1RigidResistantScene,
  'six-lower-pairs-catalogue': M1LowerPairsScene,
  'chain-to-mechanism-inversions': M1ChainInversionsScene,
  'planar-spheric-spatial-triple': M1PlanarSphericSpatialScene,
  'kutzbach-counting-worked': M1KutzbachScene,
  'mobility-paradox-parallel-linkage': M1ParallelParadoxScene,
  'four-bar-inversion-gallery': M1InversionGalleryScene,
  'grashof-condition-balance': M1GrashofBalanceScene,
  'mechanical-advantage-through-cycle': M1MechAdvantageScene,
  'transmission-angle-force-resolution': M1TransmissionAngleScene,
  'slider-crank-four-inversions': M1SliderCrankInversionsScene,
  'double-slider-three-inversions': M1DoubleSliderScene,
  'loop-closure-vector-polygon': M1LoopClosureScene,
  // Module 5 — Gears and Gear Trains
  'gear-family-by-shaft-arrangement': M5GearFamilyScene,
  'gear-tooth-anatomy': M5GearToothAnatomyScene,
  'law-of-gearing-common-normal': M5LawOfGearingScene,
  'sliding-velocity-distribution-on-tooth': M5SlidingVelocityScene,
  'involute-generation-and-line-of-action': M5InvoluteGenerationScene,
  'cycloid-generation-and-comparison': M5CycloidComparisonScene,
  'path-of-contact-geometry': M5PathOfContactScene,
  'contact-ratio-tooth-overlap': M5ContactRatioScene,
  'interference-tip-inside-base-circle': M5InterferenceScene,
  'undercutting-and-minimum-teeth': M5UndercuttingScene,
  'helical-tooth-normal-and-transverse': M5HelicalToothPlanesScene,
  'three-force-components-on-helical-tooth': M5HelicalForcesScene,
  'worm-drive-ratio-and-efficiency': M5WormDriveScene,
  'three-train-types': M5ThreeTrainTypesScene,
  'epicyclic-tabular-method': M5EpicyclicTabularScene,
  'train-selection-decision-map': M5TrainSelectionScene,
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


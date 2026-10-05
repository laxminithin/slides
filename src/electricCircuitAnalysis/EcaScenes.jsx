/**
 * EcaScenes — VTU 1BEE303 Electric Circuit Analysis classroom SVG visuals.
 *
 * Every scene animates something the syllabus asks students to reproduce with
 * a pencil: a mesh current circulating its window, a supernode surface closing
 * around a floating source, a resonant peak sharpening as Q rises, a pole
 * sliding left and the transient decaying faster because of it. Motion carries
 * meaning — nothing here moves purely for decoration.
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
    <div className={`eca-scene ${className}`} aria-label={caption || 'Electric Circuit Analysis diagram'}>
      <svg viewBox={vb} role="img" className="eca-svg">
        <defs>
          <marker id="ecaArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="ecaArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="ecaArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="ecaArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="ecaArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="ecaArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="ecaArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="ecaArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="ecaArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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
  if (tone === BLUE) return 'ecaArrB'
  if (tone === AMBER) return 'ecaArrA'
  if (tone === ROSE) return 'ecaArrRo'
  if (tone === GREEN) return 'ecaArrG'
  if (tone === PURP) return 'ecaArrP'
  if (tone === TEAL) return 'ecaArrT'
  if (tone === RED) return 'ecaArrR'
  if (tone === MUTED) return 'ecaArrM'
  return 'ecaArr'
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
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#ecaArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#ecaArr)" />
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

/** A damped sinusoid or a plain exponential — the transient of Module 3 and the
 *  waveform every left-half-plane pole maps onto in Module 4. */
function DampedPath(x0, y0, w, amp, sigma, cycles, steps = 160) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const env = Math.exp(-sigma * t)
    const osc = cycles === 0 ? 1 : Math.cos(2 * Math.PI * cycles * t)
    pts.push(`${i === 0 ? 'M' : 'L'}${(x0 + t * w).toFixed(1)} ${(y0 - amp * env * osc).toFixed(1)}`)
  }
  return pts.join(' ')
}

/** Rising exponential 1 - e^(-t/tau), the RL current and the RC voltage. */
function RisePath(x0, y0, w, amp, k = 4, steps = 120) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    pts.push(`${i === 0 ? 'M' : 'L'}${(x0 + t * w).toFixed(1)} ${(y0 - amp * (1 - Math.exp(-k * t))).toFixed(1)}`)
  }
  return pts.join(' ')
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

/**
 * Resistor drawn as the zigzag the syllabus uses. The element occupies the
 * middle 70% of `len`; the outer 15% at each end are the leads, so a chain of
 * elements laid end to end joins up without extra wire segments.
 */
function Res({ x, y, len = 72, orient = 'h', label, value, tone = N, className = '', amp = 9, labelSide = 'up' }) {
  const [X, Y, Ln] = [n(x), n(y), n(len)]
  const lead = Ln * 0.16
  const body = Ln - 2 * lead
  const seg = body / 6
  const zig = [`M${-Ln / 2} 0`, `L${-Ln / 2 + lead} 0`]
  for (let i = 0; i < 6; i += 1) {
    const sx = -Ln / 2 + lead + i * seg
    zig.push(`L${(sx + seg / 2).toFixed(1)} ${i % 2 === 0 ? -amp : amp}`)
    zig.push(`L${(sx + seg).toFixed(1)} 0`)
  }
  zig.push(`L${Ln / 2} 0`)
  const rot = orient === 'v' ? ' rotate(90)' : ''
  const dy = labelSide === 'up' ? -amp - 10 : amp + 20
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <path d={zig.join(' ')} fill="none" stroke={tone} strokeWidth="2.6" strokeLinejoin="round" strokeLinecap="round" transform={rot.trim()} />
        {label ? (
          <M x={orient === 'v' ? amp + 26 : 0} y={orient === 'v' ? 4 : dy} size={12.5} fill={tone} anchor={orient === 'v' ? 'start' : 'middle'} weight={800}>
            {label}
          </M>
        ) : null}
        {value ? (
          <M x={orient === 'v' ? amp + 26 : 0} y={orient === 'v' ? 20 : dy + (labelSide === 'up' ? -15 : 15)} size={11} fill={MUTED} anchor={orient === 'v' ? 'start' : 'middle'}>
            {value}
          </M>
        ) : null}
      </g>
    </g>
  )
}

/** Inductor: four half-circle coils over the body of the element. */
function Ind({ x, y, len = 72, orient = 'h', label, tone = PURP, className = '', labelSide = 'up' }) {
  const [X, Y, Ln] = [n(x), n(y), n(len)]
  const lead = Ln * 0.16
  const body = Ln - 2 * lead
  const r = body / 8
  const d = [`M${-Ln / 2} 0`, `L${-Ln / 2 + lead} 0`]
  for (let i = 0; i < 4; i += 1) {
    const sx = -Ln / 2 + lead + i * 2 * r
    d.push(`A${r} ${r} 0 0 1 ${(sx + 2 * r).toFixed(1)} 0`)
  }
  d.push(`L${Ln / 2} 0`)
  const rot = orient === 'v' ? 'rotate(90)' : ''
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <path d={d.join(' ')} fill="none" stroke={tone} strokeWidth="2.6" strokeLinecap="round" transform={rot} />
        {label ? (
          <M x={orient === 'v' ? 22 : 0} y={orient === 'v' ? 4 : labelSide === 'up' ? -16 : 26} size={12.5} fill={tone} anchor={orient === 'v' ? 'start' : 'middle'} weight={800}>
            {label}
          </M>
        ) : null}
      </g>
    </g>
  )
}

/** Capacitor: two plates with a gap, drawn across the middle of the element. */
function Cap({ x, y, len = 60, orient = 'h', label, tone = TEAL, className = '', plate = 20, labelSide = 'up' }) {
  const [X, Y, Ln, P] = [n(x), n(y), n(len), n(plate)]
  const gap = 8
  const d = orient === 'v'
    ? `M0 ${-Ln / 2} L0 ${-gap / 2} M${-P / 2} ${-gap / 2} L${P / 2} ${-gap / 2} M${-P / 2} ${gap / 2} L${P / 2} ${gap / 2} M0 ${gap / 2} L0 ${Ln / 2}`
    : `M${-Ln / 2} 0 L${-gap / 2} 0 M${-gap / 2} ${-P / 2} L${-gap / 2} ${P / 2} M${gap / 2} ${-P / 2} L${gap / 2} ${P / 2} M${gap / 2} 0 L${Ln / 2} 0`
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <path d={d} fill="none" stroke={tone} strokeWidth="2.6" strokeLinecap="round" />
        {label ? (
          <M x={orient === 'v' ? P / 2 + 12 : 0} y={orient === 'v' ? 4 : labelSide === 'up' ? -P / 2 - 8 : P / 2 + 20} size={12.5} fill={tone} anchor={orient === 'v' ? 'start' : 'middle'} weight={800}>
            {label}
          </M>
        ) : null}
      </g>
    </g>
  )
}

/** Independent source: a circle carrying either +/- (voltage) or an arrow
 *  (current). `dep` draws the diamond a dependent source uses instead. */
function Src({ cx, cy, r = 21, kind = 'v', label, tone = BLUE, className = '', dep = false, labelDy = 0, labelSide = 'left' }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  const body = dep
    ? <path d={`M0 ${-R} L${R} 0 L0 ${R} L${-R} 0 Z`} fill={WHITE} stroke={tone} strokeWidth="2.5" />
    : <circle r={R} fill={WHITE} stroke={tone} strokeWidth="2.5" />
  return (
    <g transform={`translate(${C},${Y})`}>
      <g className={className}>
        {body}
        {kind === 'v' ? (
          <>
            <M x={0} y={-R * 0.22} size={13} fill={tone} weight={800}>+</M>
            <M x={0} y={R * 0.62} size={13} fill={tone} weight={800}>−</M>
          </>
        ) : (
          <path d={`M0 ${R * 0.55} L0 ${-R * 0.45}`} stroke={tone} strokeWidth="2.6" markerEnd={`url(#${markerFor(tone)})`} fill="none" />
        )}
      </g>
      {label ? (
        <M
          x={labelSide === 'left' ? -R - 10 : R + 10}
          y={n(labelDy) + 5}
          size={12.5}
          fill={tone}
          anchor={labelSide === 'left' ? 'end' : 'start'}
          weight={800}
        >
          {label}
        </M>
      ) : null}
    </g>
  )
}

/** Reference node. Every node-voltage diagram in the course needs one. */
function Gnd({ x, y, tone = N, className = '', label }) {
  const [X, Y] = [n(x), n(y)]
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <path d="M0 0 L0 12" stroke={tone} strokeWidth="2.5" />
        <path d="M-14 12 L14 12 M-9 18 L9 18 M-4 24 L4 24" stroke={tone} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {label ? <M x={22} y={18} size={11} fill={MUTED} anchor="start">{label}</M> : null}
    </g>
  )
}

/** A meter in the branch: A for an ammeter, V across a pair of terminals. */
function Meter({ cx, cy, r = 20, kind = 'A', reading, tone = GREEN, className = '' }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  return (
    <g transform={`translate(${C},${Y})`}>
      <g className={className}>
        <circle r={R} fill={WHITE} stroke={tone} strokeWidth="2.5" />
        <L x={0} y={R * 0.34} size={R * 0.95} fill={tone}>
          {kind}
        </L>
      </g>
      {reading ? (
        <M x={0} y={R + 20} size={12} fill={tone} weight={800}>
          {reading}
        </M>
      ) : null}
    </g>
  )
}

/** Current-direction arrow along a branch, with its symbol. */
function Flow({ from, to, label, tone = BLUE, className = '', dy = -12, size = 12 }) {
  const [x1, y1] = from
  const [x2, y2] = to
  return (
    <g>
      <Wire d={`M${n(x1)} ${n(y1)} L${n(x2)} ${n(y2)}`} stroke={tone} width="2.4" marker={`url(#${markerFor(tone)})`} className={className} />
      {label ? (
        <M x={(n(x1) + n(x2)) / 2} y={(n(y1) + n(y2)) / 2 + n(dy)} size={size} fill={tone} weight={800}>
          {label}
        </M>
      ) : null}
    </g>
  )
}

/** A circulating mesh current inside a window: a rounded arc with an arrowhead
 *  and the mesh symbol at its centre. */
function MeshLoop({ cx, cy, r = 34, label, tone = BLUE, className = '' }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  return (
    <g>
      <g className={className} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <path
          d={`M${C} ${Y - R} A${R} ${R} 0 1 1 ${C - R * 0.7} ${Y + R * 0.72}`}
          fill="none"
          stroke={tone}
          strokeWidth="2.6"
          markerEnd={`url(#${markerFor(tone)})`}
          opacity="0.9"
        />
      </g>
      {label ? (
        <M x={C} y={Y + 5} size={14} fill={tone} weight={800}>
          {label}
        </M>
      ) : null}
    </g>
  )
}

/** Phasor plane with Re/Im axes — the diagram behind every AC answer. */
function Plane({ cx, cy, r, xLabel = 'Re', yLabel = 'Im', grid = false, tone = MUTED, half = false }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  return (
    <g>
      {grid
        ? [-0.5, 0.5].flatMap((f) => [
            <path key={`h${f}`} d={`M${C - R} ${Y + f * R} L${C + R} ${Y + f * R}`} stroke={tone} strokeWidth="1" opacity="0.28" strokeDasharray="4 6" />,
            <path key={`v${f}`} d={`M${C + f * R} ${Y - R} L${C + f * R} ${Y + R}`} stroke={tone} strokeWidth="1" opacity="0.28" strokeDasharray="4 6" />,
          ])
        : null}
      <path d={`M${half ? C : C - R} ${Y} L${C + R + 8} ${Y}`} stroke={tone} strokeWidth="2.2" markerEnd="url(#ecaArr)" fill="none" />
      <path d={`M${C} ${Y + R} L${C} ${Y - R - 8}`} stroke={tone} strokeWidth="2.2" markerEnd="url(#ecaArr)" fill="none" />
      <L x={C + R + 16} y={Y + 18} size={13} fill={tone} weight={700}>
        {xLabel}
      </L>
      <L x={C - 14} y={Y - R - 12} size={13} fill={tone} weight={700} anchor="end">
        {yLabel}
      </L>
    </g>
  )
}

/** One phasor: an arrow from the plane origin at `ang` degrees (counter-
 *  clockwise, as drawn on paper), length `len`, with its label at the tip. */
function Phasor({ ox, oy, ang = 0, len = 90, label, tone = BLUE, className = '', width = 3, labelGap = 16, dash }) {
  const [OX, OY, A, Ln] = [n(ox), n(oy), (n(ang) * Math.PI) / 180, n(len)]
  const tx = OX + Ln * Math.cos(A)
  const ty = OY - Ln * Math.sin(A)
  const lx = OX + (Ln + n(labelGap)) * Math.cos(A)
  const ly = OY - (Ln + n(labelGap)) * Math.sin(A)
  return (
    <g>
      <Wire d={`M${OX} ${OY} L${tx.toFixed(1)} ${ty.toFixed(1)}`} stroke={tone} width={width} marker={`url(#${markerFor(tone)})`} className={className} dash={dash} />
      {label ? (
        <M x={lx.toFixed(1)} y={(ly + 4).toFixed(1)} size={12} fill={tone} weight={800}>
          {label}
        </M>
      ) : null}
    </g>
  )
}

/** s-plane: poles as crosses, zeros as circles, with the stability boundary. */
function SPlane({ cx, cy, r = 150, poles = [], zeros = [], shade = true, className = '' }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  return (
    <g>
      {shade ? <rect x={C - R} y={Y - R} width={R} height={2 * R} fill={GREEN} fillOpacity="0.07" /> : null}
      <Plane cx={C} cy={Y} r={R} xLabel="σ" yLabel="jω" />
      {shade ? (
        <L x={C - R / 2} y={Y - R + 20} size={11.5} fill={GREEN} weight={800}>
          stable half-plane
        </L>
      ) : null}
      {poles.map(([px, py, tone], i) => (
        <g key={`p${i}`} className={className}>
          <path
            d={`M${C + n(px) - 8} ${Y - n(py) - 8} L${C + n(px) + 8} ${Y - n(py) + 8} M${C + n(px) + 8} ${Y - n(py) - 8} L${C + n(px) - 8} ${Y - n(py) + 8}`}
            stroke={tone || ROSE}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ))}
      {zeros.map(([zx, zy, tone], i) => (
        <circle key={`z${i}`} cx={C + n(zx)} cy={Y - n(zy)} r="8" fill="none" stroke={tone || BLUE} strokeWidth="2.8" />
      ))}
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

/** Verdict badge. The animation class sits on an inner group: a CSS transform
 *  replaces the SVG transform attribute on the same element, which snaps the
 *  badge to the origin. */
function Tag({ x, y, text, tone = GREEN, className = '', w = 104 }) {
  const [X, Y, W] = [n(x), n(y), n(w)]
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        <rect width={W} height="28" rx="14" fill={tone} opacity="0.14" />
        <rect width={W} height="28" rx="14" fill="none" stroke={tone} strokeWidth="2" />
        <M x={W / 2} y={19} size={12} fill={tone} weight={800}>
          {text}
        </M>
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

/** A matrix with bracket rules. `mark` highlights one column — which is what a
 *  mesh-resistance or node-conductance assembly actually points at. */
function Matrix({ x, y, name, rows = [], cell = 30, accent = TEAL, className = '', mark = -1, size = 12.5, markTone = AMBER, markCell }) {
  const [X, Y, C] = [n(x), n(y), n(cell)]
  const cols = rows[0] ? rows[0].length : 0
  const w = cols * C
  const h = rows.length * C
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        {name ? (
          <M x={-18} y={h / 2 + 5} size={14} fill={accent} anchor="end" weight={800}>
            {name}
          </M>
        ) : null}
        <path d={`M-6 -6 L-12 -6 L-12 ${h + 6} L-6 ${h + 6}`} fill="none" stroke={accent} strokeWidth="2.4" />
        <path d={`M${w + 6} -6 L${w + 12} -6 L${w + 12} ${h + 6} L${w + 6} ${h + 6}`} fill="none" stroke={accent} strokeWidth="2.4" />
        {mark >= 0 ? <rect x={mark * C - 2} y={-6} width={C} height={h + 12} rx="5" fill={markTone} fillOpacity="0.16" stroke={markTone} strokeWidth="2" /> : null}
        {markCell ? (
          <rect x={markCell[1] * C - 2} y={markCell[0] * C - 2} width={C} height={C} rx="5" fill={markTone} fillOpacity="0.18" stroke={markTone} strokeWidth="2" />
        ) : null}
        {rows.map((row, r) =>
          row.map((v, c) => (
            <M key={`${r}-${c}`} x={c * C + C / 2} y={r * C + C / 2 + 5} size={size} fill={c === mark ? markTone : N} weight={c === mark ? 800 : 700}>
              {String(v)}
            </M>
          )),
        )}
      </g>
    </g>
  )
}

/** Horizontal bars — impedance magnitudes, power shares, Q comparisons. */
function Bars({ x, y, w, items = [], accent = BLUE, rowH = 34, className = 'ecam-bar', max }) {
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
          <g className={`${className} ecam-delay-${i % 5}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
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

/** A two-column mapping table with a bold arrow between the halves. Half the
 *  Phase-1 specs in this subject ask for exactly this shape. */
function MapTable({ x, y, w = 800, rows = [], leftTitle, rightTitle, leftTone = BLUE, rightTone = TEAL, rowH = 38, arrowLabel }) {
  const [X, Y, W] = [n(x), n(y), n(w)]
  const colW = (W - 96) / 2
  return (
    <g>
      <rect x={X} y={Y} width={colW} height="30" rx="8" fill={leftTone} />
      <L x={X + colW / 2} y={Y + 21} size={12.5} fill={WHITE}>
        {leftTitle}
      </L>
      <rect x={X + colW + 96} y={Y} width={colW} height="30" rx="8" fill={rightTone} />
      <L x={X + colW + 96 + colW / 2} y={Y + 21} size={12.5} fill={WHITE}>
        {rightTitle}
      </L>
      {arrowLabel ? (
        <>
          <Wire
            d={`M${X + colW + 14} ${Y + 18 + (rows.length * rowH) / 2} L${X + colW + 82} ${Y + 18 + (rows.length * rowH) / 2}`}
            stroke={AMBER}
            width="3.4"
            marker="url(#ecaArrA)"
            className="ecam-flow-arrow"
          />
          <M x={X + colW + 48} y={Y + 2 + (rows.length * rowH) / 2} size={11} fill={AMBER} weight={800}>
            {arrowLabel}
          </M>
        </>
      ) : null}
      {rows.map(([l, r], i) => (
        <g key={`${l}-${i}`} className={`ecam-cell-in ecam-delay-${i % 5}`}>
          <rect x={X} y={Y + 38 + i * rowH} width={colW} height={rowH - 6} rx="8" fill={WHITE} stroke={leftTone} strokeWidth="1.8" />
          <M x={X + colW / 2} y={Y + 38 + i * rowH + (rowH - 6) / 2 + 5} size={12} fill={N}>
            {l}
          </M>
          <rect x={X + colW + 96} y={Y + 38 + i * rowH} width={colW} height={rowH - 6} rx="8" fill={WHITE} stroke={rightTone} strokeWidth="1.8" />
          <M x={X + colW + 96 + colW / 2} y={Y + 38 + i * rowH + (rowH - 6) / 2 + 5} size={12} fill={N}>
            {r}
          </M>
        </g>
      ))}
    </g>
  )
}

/* ── Module openers / closers / fallbacks ───────────────────────── */

export function ModuleHero({ module = 1, title, question, hours }) {
  const beats = ['Formulate', 'Shortcut', 'Respond', 'Transform', 'Encapsulate']
  return (
    <Scene caption={question || 'Any circuit, the smallest set of equations that determines it'}>
      <rect x="40" y="36" width="820" height="410" rx="16" fill={WHITE} stroke={BLUE} strokeWidth="3" />
      <L x="450" y="104" size={18} fill={BLUE}>{`MODULE ${module} · VTU 1BEE303`}</L>
      <L x="450" y="162" size={25}>
        {title || `Module ${module}`}
      </L>
      <L x="450" y="208" size={14.5} fill={MUTED} weight={700}>
        {question || 'Write the equations, then solve the circuit'}
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
          className={`ecam-flux ecam-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`ecam-current ecam-delay-${i}`}
          marker="url(#ecaArrB)"
        />
      ))}
      {hours ? <L x="450" y="396" size={14} fill={MUTED} weight={700}>{`${hours} teaching hours`}</L> : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Redraw the circuit from memory — then write the equations before you solve anything">
      <L x="450" y="86" size={19} fill={BLUE}>{`MODULE ${module} COMPLETE`}</L>
      <L x="450" y="140" size={24}>
        {title || 'Module complete'}
      </L>
      {['Draw and label the circuit', 'Count the equations you need', 'Write them before solving', 'Mark every reference direction', 'Check the units on the answer'].map((t, i) => (
        <g key={t} className={`ecam-cell-in ecam-delay-${i}`}>
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
        <g key={String(p)} className={`ecam-cell-in ecam-delay-${i % 5}`}>
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

/* ── Generic multi-purpose layouts ──────────────────────────────── */

export function PipelineScene({ steps = [], title = 'Procedure', accent = BLUE }) {
  const rows = steps.slice(0, 5)
  return (
    <Scene caption={`${title} — in this order, every time`}>
      <Wire d="M450 74 L450 440" stroke={MUTED} width="3" dash="9 8" />
      {rows.map((step, i) => (
        <g key={String(step)} className={`ecam-slide-in ecam-delay-${i}`}>
          <circle cx="450" cy={104 + i * 84} r="22" fill={i === rows.length - 1 ? GREEN : accent} />
          <L x="450" y={111 + i * 84} size={16} fill={WHITE}>
            {i + 1}
          </L>
          <rect
            x={i % 2 === 0 ? 62 : 508}
            y={74 + i * 84}
            width="366"
            height="62"
            rx="11"
            fill={WHITE}
            stroke={i === rows.length - 1 ? GREEN : accent}
            strokeWidth="2.3"
          />
          <foreignObject x={i % 2 === 0 ? 74 : 520} y={82 + i * 84} width="342" height="50">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ font: '600 13.5px/1.28 system-ui,sans-serif', color: '#152430', display: 'flex', alignItems: 'center', height: '100%' }}
            >
              {String(step)}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

export function TwoCaseScene({ left, right, caption = 'Two cases, two different answers', leftTone = BLUE, rightTone = AMBER }) {
  const l = left || { title: 'Case A', points: [] }
  const r = right || { title: 'Case B', points: [] }
  return (
    <Scene caption={caption}>
      <rect x="56" y="66" width="388" height="366" rx="14" fill={WHITE} stroke={leftTone} strokeWidth="2.7" />
      <rect x="56" y="66" width="388" height="52" rx="14" fill={leftTone} />
      <L x="250" y="100" size={16} fill={WHITE}>
        {l.title}
      </L>
      {(l.points || []).slice(0, 5).map((p, i) => (
        <g key={String(p)} className={`ecam-cell-in ecam-delay-${i}`}>
          <circle cx="92" cy={156 + i * 56} r="7" fill={leftTone} />
          <foreignObject x="112" y={134 + i * 56} width="316" height="46">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13.5px/1.3 system-ui,sans-serif', color: '#152430' }}>
              {String(p)}
            </div>
          </foreignObject>
        </g>
      ))}
      <rect x="456" y="66" width="388" height="366" rx="14" fill={WHITE} stroke={rightTone} strokeWidth="2.7" />
      <rect x="456" y="66" width="388" height="52" rx="14" fill={rightTone} />
      <L x="650" y="100" size={16} fill={WHITE}>
        {r.title}
      </L>
      {(r.points || []).slice(0, 5).map((p, i) => (
        <g key={String(p)} className={`ecam-cell-in ecam-delay-${i}`}>
          <circle cx="492" cy={156 + i * 56} r="7" fill={rightTone} />
          <foreignObject x="512" y={134 + i * 56} width="316" height="46">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13.5px/1.3 system-ui,sans-serif', color: '#152430' }}>
              {String(p)}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

/** Three cards on a common baseline — the shape half the Phase-1 specs ask for. */
export function CardTriadScene({ caption, cards = [], tones = [BLUE, AMBER, PURP] }) {
  return (
    <Scene caption={caption}>
      {cards.slice(0, 3).map((c, i) => (
        <Card
          key={c.title}
          x={44 + i * 278}
          y={78}
          w={258}
          h={330}
          title={c.title}
          lines={c.lines}
          accent={tones[i % tones.length]}
          foot={c.foot}
          className={`ecam-slide-in ecam-delay-${i}`}
          mono={c.mono}
        />
      ))}
    </Scene>
  )
}

/** A vertical comparison ladder — rows of label / value / verdict. */
export function LadderScene({ caption, title = 'Comparison', rows = [], accent = BLUE }) {
  return (
    <Scene caption={caption}>
      <rect x="56" y="58" width="788" height="40" rx="10" fill={accent} />
      <L x="450" y="85" size={14.5} fill={WHITE}>
        {title}
      </L>
      {rows.slice(0, 6).map((row, i) => {
        const [label, value, note, tone] = row
        return (
          <g key={`${label}-${i}`} className={`ecam-cell-in ecam-delay-${i % 5}`}>
            <rect x="56" y={112 + i * 58} width="788" height="48" rx="9" fill={WHITE} stroke={tone || MUTED} strokeWidth="1.9" />
            <L x="76" y={142 + i * 58} size={14} anchor="start" fill={tone || N}>
              {label}
            </L>
            <M x={470} y={142 + i * 58} size={13} fill={tone || N} weight={800}>
              {value}
            </M>
            <L x={824} y={142 + i * 58} size={12} anchor="end" fill={MUTED} weight={700}>
              {note}
            </L>
          </g>
        )
      })}
    </Scene>
  )
}

/* ── Module 1 — circuits, sources and systematic analysis ───────── */

export function LumpedVsDistributedScene() {
  // log10(f) mapped onto the axis: 50 Hz at x = 90, a decade every 88 px.
  const xOf = (logf) => 90 + (logf - Math.log10(50)) * 88
  const ticks = [
    [Math.log10(50), '50 Hz', 'λ = 6000 km'],
    [6, '1 MHz', 'λ = 300 m'],
    [8, '100 MHz', 'λ = 3 m'],
    [Math.log10(3e9), '3 GHz', 'λ = 100 mm'],
  ]
  return (
    <Scene caption="Physical size decides nothing; size measured in wavelengths decides everything">
      <rect x="60" y="74" width="360" height="132" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <Ind x="180" y="128" len="78" tone={GREEN} />
      <Ind x="270" y="128" len="78" tone={GREEN} />
      <Wire d="M225 104 L225 152" stroke={MUTED} width="2.4" />
      <L x="240" y="180" size={12.5} fill={GREEN} weight={800}>
        mains transformer · 1.2 m
      </L>
      <M x="240" y="198" size={11} fill={MUTED}>
        physically huge, still lumped
      </M>

      <rect x="480" y="74" width="360" height="132" rx="12" fill={WHITE} stroke={AMBER} strokeWidth="2.4" />
      <Wire d="M520 128 L800 128" stroke={AMBER} width="5" />
      <Wire d="M520 152 L800 152" stroke={MUTED} width="2" dash="5 5" />
      <M x="660" y="114" size={11} fill={AMBER} weight={800}>
        50 mm PCB track at 3 GHz
      </M>
      <M x="660" y="172" size={11} fill={MUTED}>
        half a wavelength long
      </M>
      <M x="660" y="198" size={11} fill={MUTED}>
        physically tiny, already distributed
      </M>

      <g className="ecam-slide-in">
        <rect x="90" y="248" width="470" height="30" rx="8" fill={GREEN} fillOpacity="0.18" stroke={GREEN} strokeWidth="2" />
        <L x="325" y="268" size={12.5} fill={GREEN} weight={800}>
          lumped model exact
        </L>
      </g>
      <g className="ecam-slide-in ecam-delay-2">
        <rect x="570" y="248" width="250" height="30" rx="8" fill={AMBER} fillOpacity="0.18" stroke={AMBER} strokeWidth="2" />
        <L x="695" y="268" size={12.5} fill={AMBER} weight={800}>
          distributed: transmission line
        </L>
      </g>

      <Wire d="M90 330 L830 330" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      {/* On its own line under the tick labels: at the arrow tip it straddled
          the last tick ("3 GHz"). */}
      <L x="820" y="404" size={13} fill={MUTED} weight={700} anchor="end">
        frequency (log scale)
      </L>
      {ticks.map(([lf, f, lam], i) => (
        <g key={f} className={`ecam-cell-in ecam-delay-${i}`}>
          <path d={`M${xOf(lf).toFixed(1)} 322 L${xOf(lf).toFixed(1)} 338`} stroke={MUTED} strokeWidth="2.4" />
          <M x={xOf(lf).toFixed(1)} y="358" size={12} fill={N} weight={800}>
            {f}
          </M>
          <M x={xOf(lf).toFixed(1)} y="378" size={11} fill={MUTED}>
            {lam}
          </M>
        </g>
      ))}
      <Card
        x="250"
        y="400"
        w="400"
        h="58"
        title="The working threshold"
        accent={BLUE}
        mono
        lines={['largest dimension < λ/20 → lumped']}
        linesY={50}
        className="ecam-emerge"
      />
    </Scene>
  )
}

export function CircuitClassificationScene() {
  const cards = [
    ['Linear', 'R, L, C, ideal sources', 'diode, saturating L', BLUE],
    ['Bilateral', 'R, L, C', 'diode, transistor', AMBER],
    ['Passive', 'R, L, C', 'sources, transistor', PURP],
    ['Time-invariant', 'fixed R, L, C', 'switch, chopper', TEAL],
  ]
  const techniques = ['superposition', 'Thevenin', 'phasors', 'Laplace']
  return (
    <Scene caption="Break one property and several techniques go with it">
      {cards.map(([title, ok, bad, tone], i) => {
        const x = 52 + (i % 2) * 404
        const y = 56 + Math.floor(i / 2) * 136
        return (
          <g key={title} className={`ecam-cell-in ecam-delay-${i}`}>
            <rect x={x} y={y} width="392" height="122" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.4" />
            <rect x={x} y={y} width="392" height="30" rx="12" fill={tone} />
            <L x={x + 196} y={y + 21} size={12.5} fill={WHITE}>
              {title}
            </L>
            <M x={x + 20} y={y + 56} size={11.5} fill={GREEN} anchor="start" weight={800}>
              ✓ holds for
            </M>
            <M x={x + 20} y={y + 78} size={11} fill={N} anchor="start">
              {ok}
            </M>
            <M x={x + 212} y={y + 56} size={11.5} fill={RED} anchor="start" weight={800}>
              ✗ broken by
            </M>
            <M x={x + 212} y={y + 78} size={11} fill={N} anchor="start">
              {bad}
            </M>
            <path d={`M${x + 200} ${y + 40} L${x + 200} ${y + 108}`} stroke={MUTED} strokeWidth="1.4" strokeDasharray="4 5" />
          </g>
        )
      })}
      {techniques.map((t, i) => (
        <g key={t} className={`ecam-slide-in ecam-delay-${i}`}>
          <rect x={58 + i * 196} y="396" width="182" height="40" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2" />
          <L x={149 + i * 196} y="421" size={13} fill={BLUE}>
            {t}
          </L>
          <Wire
            d={`M${149 + i * 196} 396 L${149 + i * 196} 348`}
            stroke={BLUE}
            width="2.2"
            marker="url(#ecaArrB)"
            className="ecam-up-line"
            dash="6 5"
          />
        </g>
      ))}
      <M x="450" y="458" size={11.5} fill={MUTED} weight={800}>
        each technique needs the properties above it
      </M>
    </Scene>
  )
}

export function VoltageSourceDroopScene() {
  const x0 = 500
  return (
    <Scene caption="Regulation is the whole difference between the ideal source and the real one">
      <rect x="48" y="60" width="392" height="150" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
      <L x="180" y="84" size={12.5} fill={BLUE}>
        ideal source
      </L>
      <M x="416" y="84" size={11.5} fill={GREEN} anchor="end" weight={800}>
        V = Vs
      </M>
      <Src cx="130" cy="150" kind="v" label="Vs" tone={BLUE} />
      <Wire d="M130 129 L130 110 L330 110 L330 132" stroke={N} width="2.4" />
      <Wire d="M130 171 L130 190 L330 190 L330 168" stroke={N} width="2.4" />
      <Res x="330" y="150" len="42" orient="v" label="RL" tone={N} />


      <rect x="48" y="226" width="392" height="150" rx="12" fill={WHITE} stroke={AMBER} strokeWidth="2.2" />
      <L x="160" y="250" size={12.5} fill={AMBER}>
        practical source
      </L>
      <M x="416" y="250" size={11.5} fill={AMBER} anchor="end" weight={800}>
        V = Vs − I·Rs
      </M>
      <Src cx="106" cy="316" kind="v" label="Vs" tone={AMBER} />
      <Wire d="M106 295 L106 276 L158 276" stroke={N} width="2.4" />
      <Res x="204" y="276" len="90" label="Rs" tone={AMBER} labelSide="down" />
      <Wire d="M250 276 L330 276 L330 298" stroke={N} width="2.4" />
      <Wire d="M106 337 L106 356 L330 356 L330 334" stroke={N} width="2.4" />
      <Res x="330" y="316" len="42" orient="v" label="RL" tone={N} />


      <Axes x={x0} y="396" w="330" h="300" xLabel="load current I" />
      <L x="512" y="88" size={13} fill={MUTED} weight={700} anchor="start">
        terminal V
      </L>
      <Curve pts={[[x0, 150], [x0 + 316, 150]]} stroke={BLUE} width="3" className="ecam-draw" />
      <M x={x0 + 150} y="140" size={11.5} fill={BLUE} weight={800}>
        ideal
      </M>
      <Curve pts={[[x0, 150], [x0 + 316, 300]]} stroke={AMBER} width="3" className="ecam-draw" />
      <M x={x0 + 130} y="252" size={11.5} fill={AMBER} weight={800}>
        practical, slope = −Rs
      </M>
      <g className="ecam-emerge">
        <path d={`M${x0 + 328} 150 L${x0 + 338} 150 M${x0 + 333} 150 L${x0 + 333} 300 M${x0 + 328} 300 L${x0 + 338} 300`} stroke={ROSE} strokeWidth="2.2" fill="none" />
        <M x={x0 + 316} y="232" size={11.5} fill={ROSE} anchor="end" weight={800}>
          regulation
        </M>
      </g>
      <g className="ecam-pulse">
        <circle cx={x0 + 316} cy="150" r="9" fill={RED} fillOpacity="0.25" stroke={RED} strokeWidth="2.4" />
      </g>
      <M x={x0 + 160} y="112" size={11} fill={RED} weight={800}>
        short circuit ⇒ infinite power
      </M>
    </Scene>
  )
}

export function CurrentSourceDualityScene() {
  const rows = [
    ['series Rs', 'parallel Rp'],
    ['V = Vs − I·Rs', 'I = Is − V/Rp'],
    ['stiff when Rs ≪ RL', 'stiff when Rp ≫ RL'],
    ['fails on short circuit', 'fails on open circuit'],
  ]
  return (
    <Scene caption="Every row on the left has a partner on the right — that is what duality means">
      <MapTable
        x="56"
        y="52"
        w="788"
        rows={rows}
        leftTitle="practical voltage source"
        rightTitle="practical current source"
        leftTone={BLUE}
        rightTone={AMBER}
        arrowLabel="dual"
        rowH={40}
      />
      <Axes x="280" y="450" w="330" h="140" xLabel="terminal voltage V" yLabel="current I" />
      <Curve pts={[[280, 350], [530, 350], [552, 372], [566, 450]]} stroke={AMBER} width="3" className="ecam-draw" />
      <Wire d="M540 350 L540 450" stroke={RED} width="2" dash="5 4" />
      <M x="620" y="344" size={11} fill={RED} anchor="start" weight={800}>
        compliance limit
      </M>
      <M x="390" y="336" size={11.5} fill={AMBER} weight={800}>
        I holds constant here
      </M>
    </Scene>
  )
}

export function FourDependentSourcesScene() {
  const cells = [
    ['VCVS', 'v = A·vx', 'op-amp', BLUE, 'v'],
    ['VCCS', 'i = g·vx', 'MOSFET / OTA', AMBER, 'i'],
    ['CCVS', 'v = r·ix', 'transimpedance amp', PURP, 'v'],
    ['CCCS', 'i = β·ix', 'BJT', TEAL, 'i'],
  ]
  return (
    <Scene caption="A dependent source is a constraint, not a supply — it never gets switched off">
      {cells.map(([name, eq, dev, tone, kind], i) => {
        const x = 150 + (i % 2) * 420
        const y = 120 + Math.floor(i / 2) * 140
        return (
          <g key={name} className={`ecam-cell-in ecam-delay-${i}`}>
            <rect x={x - 96} y={y - 58} width="336" height="120" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.2" />
            <Src cx={x - 40} cy={y} kind={kind} tone={tone} dep r="25" />
            <M x={x + 10} y={y - 14} size={13} fill={tone} anchor="start" weight={800}>
              {name}
            </M>
            <M x={x + 10} y={y + 8} size={12} fill={N} anchor="start">
              {eq}
            </M>
            <M x={x + 10} y={y + 30} size={11} fill={MUTED} anchor="start">
              {dev}
            </M>
          </g>
        )
      })}
      <g className="ecam-slide-in ecam-delay-4">
        <rect x="56" y="374" width="500" height="54" rx="12" fill={RED} fillOpacity="0.12" stroke={RED} strokeWidth="2.4" />
        <L x="306" y="406" size={13} fill={RED}>
          never deactivated in superposition or Thevenin
        </L>
      </g>
      <g className="ecam-cell-in ecam-delay-5">
        <rect x="576" y="374" width="268" height="54" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <Src cx="616" cy="401" kind="v" tone={GREEN} r="17" />
        <M x="652" y="396" size={11} fill={GREEN} anchor="start" weight={800}>
          independent source:
        </M>
        <M x="652" y="414" size={11} fill={GREEN} anchor="start" weight={800}>
          ✓ this one is switched off
        </M>
      </g>
    </Scene>
  )
}

export function SourceTransformationScene() {
  return (
    <Scene caption="Identical at the terminals; not identical inside">
      <rect x="56" y="70" width="330" height="190" rx="14" fill={WHITE} stroke={BLUE} strokeWidth="2.4" strokeDasharray="8 6" />
      <Src cx="112" cy="180" kind="v" label="Vs" tone={BLUE} />
      <Wire d="M112 159 L112 118 L190 118" stroke={N} width="2.4" />
      <Res x="238" y="118" len="96" label="Rs" tone={BLUE} />
      <Wire d="M286 118 L360 118" stroke={N} width="2.4" />
      <Wire d="M112 201 L112 238 L360 238" stroke={N} width="2.4" />
      <Dot cx="360" cy="118" r="5" fill={N} />
      <Dot cx="360" cy="238" r="5" fill={N} />

      <rect x="514" y="70" width="330" height="190" rx="14" fill={WHITE} stroke={AMBER} strokeWidth="2.4" strokeDasharray="8 6" />
      <Src cx="570" cy="180" kind="i" label="Is" tone={AMBER} />
      <Wire d="M570 159 L570 118 L818 118" stroke={N} width="2.4" />
      <Wire d="M570 201 L570 238 L818 238" stroke={N} width="2.4" />
      <Res x="686" y="178" len="100" orient="v" label="Rp" tone={AMBER} />
      <Wire d="M686 118 L686 130 M686 226 L686 238" stroke={N} width="2.4" />
      <Dot cx="818" cy="118" r="5" fill={N} />
      <Dot cx="818" cy="238" r="5" fill={N} />

      <g className="ecam-flow-arrow">
        <Wire d="M400 162 L500 162" stroke={PURP} width="3" marker="url(#ecaArrP)" />
        <Wire d="M500 196 L400 196" stroke={PURP} width="3" marker="url(#ecaArrP)" />
      </g>
      <M x="450" y="146" size={11.5} fill={PURP} weight={800}>
        Vs = Is·Rs
      </M>
      <M x="450" y="222" size={11.5} fill={PURP} weight={800}>
        Rs = Rp
      </M>

      <g className="ecam-emerge">
        <rect x="140" y="288" width="620" height="58" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <M x="290" y="316" size={12.5} fill={GREEN} weight={800}>
          same RL ⇒ same V
        </M>
        <M x="610" y="316" size={12.5} fill={GREEN} weight={800}>
          same RL ⇒ same I ✓
        </M>
        <M x="450" y="338" size={11} fill={MUTED}>
          equivalent at the terminals
        </M>
      </g>
      <g className="ecam-cell-in ecam-delay-3">
        <rect x="140" y="366" width="620" height="56" rx="12" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2.2" />
        <L x="450" y="392" size={12.5} fill={RED}>
          different power dissipated inside the box
        </L>
        <M x="450" y="412" size={11} fill={MUTED}>
          Rs carries the load current; Rp carries only what the load does not take
        </M>
      </g>
    </Scene>
  )
}

export function SourceShiftScene() {
  return (
    <Scene caption="Push the source through the node, or round the loop, until it has a resistor to pair with">
      <M x="80" y="72" size={12.5} fill={BLUE} anchor="start" weight={800}>
        V-shift — push through the node
      </M>
      <Src cx="106" cy="148" kind="v" label="Vs" tone={BLUE} r="18" />
      <Wire d="M106 130 L106 106 L196 106" stroke={N} width="2.4" />
      <Dot cx="196" cy="106" r="8" fill={AMBER} className="ecam-pulse" />
      {[0, 1, 2].map((i) => (
        <Wire key={i} d={`M196 106 L268 ${84 + i * 40}`} stroke={MUTED} width="2.2" />
      ))}
      <M x="286" y="180" size={11} fill={MUTED} anchor="start">
        three branches leave this node
      </M>

      <Wire d="M340 132 L412 132" stroke={PURP} width="3" marker="url(#ecaArrP)" className="ecam-flow-arrow" />
      <M x="376" y="118" size={10.5} fill={PURP} weight={800}>
        push
      </M>

      {[0, 1, 2].map((i) => (
        <g key={i} className={`ecam-pop ecam-delay-${i}`}>
          <Src cx={500} cy={88 + i * 44} kind="v" tone={BLUE} r="14" />
          <Wire d={`M514 ${88 + i * 44} L600 ${88 + i * 44}`} stroke={MUTED} width="2.2" />
          <M x={608} y={92 + i * 44} size={10.5} fill={MUTED} anchor="start">
            {`branch ${i + 1}`}
          </M>
        </g>
      ))}
      <Dot cx="466" cy="132" r="8" fill={AMBER} />
      <Tag x="700" y="190" text="now transformable" tone={GREEN} w="160" className="ecam-emerge" />

      <Wire d="M56 250 L844 250" stroke={MUTED} width="1.6" dash="6 6" />

      <M x="80" y="288" size={12.5} fill={AMBER} anchor="start" weight={800}>
        I-shift — send it round the loop
      </M>
      <Src cx="140" cy="370" kind="i" label="Is" tone={AMBER} r="19" />
      <Wire d="M140 351 L140 322 L250 322" stroke={N} width="2.4" />
      <Wire d="M140 389 L140 418 L250 418" stroke={N} width="2.4" />
      <M x="195" y="444" size={11} fill={MUTED}>
        no parallel R to pair with
      </M>

      <Wire d="M320 370 L392 370" stroke={PURP} width="3" marker="url(#ecaArrP)" className="ecam-flow-arrow" />
      <M x="356" y="356" size={10.5} fill={PURP} weight={800}>
        shift
      </M>

      <g className="ecam-pop">
        <Src cx="450" cy="322" kind="i" tone={AMBER} r="15" label="Is" labelSide="left" />
        <Src cx="450" cy="418" kind="i" tone={AMBER} r="15" label="Is" labelSide="left" />
        <Res x="600" y="322" len="90" label="R1" tone={N} />
        <Res x="600" y="418" len="90" label="R2" tone={N} />
        <Wire d="M465 322 L555 322 M645 322 L740 322" stroke={MUTED} width="2.2" />
        <Wire d="M465 418 L555 418 M645 418 L740 418" stroke={MUTED} width="2.2" />
      </g>
      <Tag x="670" y="356" text="now transformable" tone={GREEN} w="160" className="ecam-emerge" />
    </Scene>
  )
}

export function StarDeltaBridgeScene() {
  return (
    <Scene caption="Convert the delta and the bridge falls apart into series and parallel">
      <M x="160" y="68" size={11.5} fill={RED} weight={800}>
        nothing in series, nothing in parallel
      </M>
      <Dot cx="160" cy="110" r="6" fill={N} />
      <Dot cx="80" cy="220" r="6" fill={N} />
      <Dot cx="240" cy="220" r="6" fill={N} />
      <Dot cx="160" cy="330" r="6" fill={N} />
      <Wire d="M160 110 L80 220 L160 330 L240 220 L160 110" stroke={MUTED} width="2" opacity="0.4" />
      <Res x="120" y="165" len="84" label="R1" tone={N} />
      <Res x="200" y="165" len="84" label="R2" tone={N} />
      <Res x="160" y="220" len="110" label="R5" tone={ROSE} />
      <Res x="120" y="275" len="84" label="R3" tone={N} />
      <Res x="200" y="275" len="84" label="R4" tone={N} />
      <g className="ecam-pulse">
        <circle cx="160" cy="172" r="52" fill="none" stroke={AMBER} strokeWidth="2.6" strokeDasharray="8 6" />
      </g>
      <M x="160" y="366" size={11} fill={AMBER} weight={800}>
        upper delta
      </M>

      <Wire d="M300 220 L372 220" stroke={PURP} width="3" marker="url(#ecaArrP)" className="ecam-flow-arrow" />
      <M x="336" y="204" size={10.5} fill={PURP} weight={800}>
        Δ → Y
      </M>

      <Dot cx="480" cy="110" r="6" fill={N} />
      <Dot cx="410" cy="206" r="6" fill={N} />
      <Dot cx="550" cy="206" r="6" fill={N} />
      <Dot cx="480" cy="330" r="6" fill={N} />
      <Wire d="M480 110 L480 162 M480 162 L410 206 M480 162 L550 206" stroke={TEAL} width="2.8" />
      <M x="496" y="140" size={11} fill={TEAL} anchor="start" weight={800}>
        Ra
      </M>
      <M x="418" y="180" size={11} fill={TEAL} weight={800}>
        Rb
      </M>
      <M x="544" y="180" size={11} fill={TEAL} weight={800}>
        Rc
      </M>
      <g className="ecam-cell-in ecam-delay-2">
        <Wire d="M410 206 L410 268 L480 330 L550 268 L550 206" stroke={GREEN} width="2.8" />
        <M x="392" y="250" size={10.5} fill={GREEN} anchor="end" weight={800}>
          Rb+R3
        </M>
        <M x="568" y="250" size={10.5} fill={GREEN} anchor="start" weight={800}>
          Rc+R4
        </M>
      </g>
      <M x="480" y="366" size={11} fill={GREEN} weight={800}>
        two obvious series pairs
      </M>

      <Wire d="M610 220 L676 220" stroke={PURP} width="3" marker="url(#ecaArrP)" className="ecam-flow-arrow ecam-delay-2" />
      <g className="ecam-emerge">
        <Res x="770" y="220" len="110" label="Req" tone={GREEN} />
        <Wire d="M712 220 L715 220 M825 220 L832 220" stroke={MUTED} width="2.2" />
        <M x="770" y="262" size={12} fill={GREEN} weight={800}>
          ✓ one resistor
        </M>
      </g>

      <Card
        x="170"
        y="396"
        w="560"
        h="62"
        title="Conversion, both directions"
        accent={TEAL}
        mono
        lines={['Ra = R1·R2/(R1+R2+R5)      R1 = (RaRb+RbRc+RcRa)/Rc']}
        linesY={50}
        className="ecam-slide-in ecam-delay-3"
      />
    </Scene>
  )
}

export function EquationCountLedgerScene() {
  return (
    <Scene caption="Count first, then choose the method that leaves you fewer unknowns">
      <Dot cx="120" cy="110" r="7" fill={BLUE} />
      <Dot cx="330" cy="110" r="7" fill={BLUE} />
      <Dot cx="330" cy="260" r="7" fill={BLUE} />
      <Dot cx="120" cy="260" r="7" fill={BLUE} />
      <M x="104" y="100" size={11.5} fill={BLUE} anchor="end" weight={800}>1</M>
      <M x="346" y="100" size={11.5} fill={BLUE} anchor="start" weight={800}>2</M>
      <M x="346" y="278" size={11.5} fill={BLUE} anchor="start" weight={800}>3</M>
      <M x="104" y="278" size={11.5} fill={BLUE} anchor="end" weight={800}>4</M>
      <Res x="225" y="110" len="100" label="a" tone={N} />
      <Res x="330" y="185" len="100" orient="v" label="b" tone={N} />
      <Res x="225" y="260" len="100" label="c" tone={N} />
      <Res x="120" y="185" len="100" orient="v" label="d" tone={N} />
      <Res x="225" y="185" len="90" label="e" tone={N} />
      <Wire d="M120 185 L180 185 M270 185 L330 185" stroke={MUTED} width="2" opacity="0.5" />
      <Wire d="M120 110 L175 110 M275 110 L330 110 M120 260 L175 260 M275 260 L330 260" stroke={MUTED} width="2" opacity="0.5" />
      <Wire d="M120 110 L120 135 M120 235 L120 260 M330 110 L330 135 M330 235 L330 260" stroke={MUTED} width="2" opacity="0.5" />
      <Src cx="225" cy="330" kind="v" label="f" tone={AMBER} r="17" />
      <Wire d="M120 260 L120 330 L208 330 M242 330 L330 330 L330 260" stroke={MUTED} width="2.2" />
      <M x="225" y="382" size={12.5} fill={N} weight={800}>
        B = 6 branches · N = 4 nodes
      </M>

      {[
        ['independent KCL equations', 'N − 1 = 3', BLUE],
        ['independent KVL equations', 'B − N + 1 = 3', AMBER],
        ['unknown branch currents', '6 ✓', GREEN],
      ].map(([label, val, tone], i) => (
        <g key={label} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x="450" y={82 + i * 56} width="394" height="46" rx="10" fill={WHITE} stroke={tone} strokeWidth={i === 2 ? 3 : 2} />
          <L x="468" y={111 + i * 56} size={12.5} anchor="start" fill={N}>
            {label}
          </L>
          <M x="826" y={111 + i * 56} size={12.5} anchor="end" fill={tone} weight={800}>
            {val}
          </M>
        </g>
      ))}

      <Card x="450" y="266" w="190" h="92" title="mesh" accent={BLUE} mono lines={['solve', 'B − N + 1 = 3']} linesY={56} className="ecam-slide-in ecam-delay-3" />
      <Card x="654" y="266" w="190" h="92" title="node" accent={TEAL} mono lines={['solve', 'N − 1 = 3']} linesY={56} className="ecam-slide-in ecam-delay-4" />
      <M x="647" y="386" size={11.5} fill={MUTED} weight={800}>
        pick whichever count is smaller
      </M>
    </Scene>
  )
}

export function MeshMatrixAssemblyScene() {
  return (
    <Scene caption="Diagonal = resistance round that mesh; off-diagonal = the shared branch, negated">
      <Src cx="80" cy="235" kind="v" label="V1" tone={BLUE} r="19" />
      <Wire d="M80 216 L80 140 L124 140" stroke={N} width="2.4" />
      <Res x="170" y="140" len="90" label="R1" tone={N} />
      <Wire d="M215 140 L250 140" stroke={N} width="2.4" />
      <Res x="300" y="140" len="90" label="R2" tone={N} />
      <Wire d="M345 140 L390 140 L390 330" stroke={N} width="2.4" />
      <Wire d="M80 254 L80 330 L390 330" stroke={N} width="2.4" />
      <Dot cx="250" cy="140" r="6" fill={N} />
      <Dot cx="250" cy="330" r="6" fill={N} />
      {/* Labelled on the left: the helper puts a vertical label on the right,
          which lands inside the mesh-2 window next to i₂. */}
      <Res x="250" y="235" len="120" orient="v" tone={AMBER} />
      <M x="226" y="239" size={12.5} fill={AMBER} anchor="end" weight={800}>
        R3
      </M>
      <Wire d="M250 140 L250 175 M250 295 L250 330" stroke={AMBER} width="2.4" />
      <MeshLoop cx="160" cy="238" r="38" label="i₁" tone={BLUE} className="ecam-spin-slow" />
      <MeshLoop cx="330" cy="238" r="38" label="i₂" tone={PURP} className="ecam-spin-slow ecam-delay-2" />

      <Matrix x="510" y="110" rows={[['R1+R3', '−R3'], ['−R3', 'R2+R3']]} cell="76" accent={TEAL} className="ecam-cell-in" size={11.5} />
      <M x="682" y="186" size={16} fill={N}>×</M>
      <Matrix x="710" y="110" rows={[['i₁'], ['i₂']]} cell="46" accent={BLUE} className="ecam-cell-in ecam-delay-1" />
      <M x="780" y="186" size={16} fill={N}>=</M>
      <Matrix x="808" y="110" rows={[['V1'], ['0']]} cell="46" accent={AMBER} className="ecam-cell-in ecam-delay-2" />

      <Wire d="M282 196 L498 160" stroke={AMBER} width="2" dash="6 5" marker="url(#ecaArrA)" className="ecam-flow-arrow" />
      <Wire d="M282 276 L498 236" stroke={AMBER} width="2" dash="6 5" marker="url(#ecaArrA)" className="ecam-flow-arrow ecam-delay-2" />
      <M x="360" y="144" size={10.5} fill={AMBER} weight={800}>
        shared R3 → both off-diagonals
      </M>

      <Card
        x="470"
        y="306"
        w="378"
        h="82"
        title="the branch current everyone gets wrong"
        accent={ROSE}
        mono
        lines={['current in R3 = i₁ − i₂', 'not i₁, and not i₂']}
        linesY={54}
        className="ecam-emerge"
      />
    </Scene>
  )
}

export function DependentConstraintScene() {
  return (
    <Scene caption="A dependent source adds a row and breaks the symmetry of the matrix">
      <Src cx="70" cy="200" kind="v" label="Vs" tone={BLUE} r="19" />
      <Wire d="M70 181 L70 120 L128 120" stroke={N} width="2.4" />
      <Res x="176" y="120" len="94" label="vx across R" tone={AMBER} />
      <Wire d="M223 120 L280 120" stroke={N} width="2.4" />
      <Wire d="M70 219 L70 290 L380 290" stroke={N} width="2.4" />
      <Dot cx="280" cy="120" r="6" fill={N} />
      <Dot cx="280" cy="290" r="6" fill={N} />
      <Res x="280" y="200" len="110" orient="v" label="R2" tone={N} />
      <Wire d="M280 120 L280 145 M280 255 L280 290" stroke={N} width="2.4" />
      <Wire d="M280 120 L380 120" stroke={N} width="2.4" />
      <Src cx="380" cy="200" kind="v" label="k·vx" tone={PURP} dep r="24" labelSide="right" />
      <Wire d="M380 176 L380 120 M380 224 L380 290" stroke={N} width="2.4" />
      <Wire d="M176 102 L290 152 L358 188" stroke={PURP} width="1.8" dash="5 5" marker="url(#ecaArrP)" className="ecam-probe" />
      <MeshLoop cx="172" cy="200" r="32" label="i₁" tone={BLUE} className="ecam-spin-slow" />
      <MeshLoop cx="332" cy="200" r="28" label="i₂" tone={TEAL} className="ecam-spin-slow ecam-delay-2" />

      {[
        ['KVL mesh 1', '(R+R2)·i₁ − R2·i₂ = Vs', BLUE],
        ['KVL mesh 2', '−R2·i₁ + R2·i₂ = −k·vx', TEAL],
        ['constraint', 'vx = R·i₁', PURP],
      ].map(([tag, eq, tone], i) => (
        <g key={tag} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x="470" y={72 + i * 56} width="378" height="46" rx="10" fill={WHITE} stroke={tone} strokeWidth={i === 2 ? 3 : 2} />
          <M x="486" y={94 + i * 56} size={10} fill={tone} anchor="start" weight={800}>
            {tag}
          </M>
          <M x="486" y={112 + i * 56} size={11.5} fill={N} anchor="start">
            {eq}
          </M>
        </g>
      ))}

      <g className="ecam-slide-in ecam-delay-3">
        <Matrix x="540" y="276" rows={[['a', 'b'], ['b', 'c']]} cell="40" accent={GREEN} />
        <M x="580" y="384" size={11} fill={GREEN} weight={800}>
          symmetric
        </M>
        <M x="580" y="402" size={10.5} fill={MUTED}>
          independent only
        </M>
      </g>
      <g className="ecam-slide-in ecam-delay-4">
        <Matrix x="740" y="276" rows={[['a', 'b'], ['d', 'c']]} cell="40" accent={AMBER} markTone={ROSE} markCell={[1, 0]} />
        <M x="780" y="384" size={11} fill={AMBER} weight={800}>
          asymmetric
        </M>
        <M x="780" y="402" size={10.5} fill={MUTED}>
          dependent present
        </M>
      </g>
      <M x="260" y="404" size={11.5} fill={MUTED} weight={800}>
        one extra row, and R₁₂ ≠ R₂₁
      </M>
      <M x="260" y="426" size={11} fill={MUTED}>
        the symmetry check no longer applies
      </M>
    </Scene>
  )
}

export function SupermeshScene() {
  return (
    <Scene caption="Skirt the current source, then buy the missing equation back with the constraint">
      <Src cx="70" cy="215" kind="v" label="Vs" tone={BLUE} r="19" />
      <Wire d="M70 196 L70 120 L134 120" stroke={N} width="2.4" />
      <Res x="180" y="120" len="90" label="R1" tone={N} />
      <Wire d="M225 120 L290 120" stroke={N} width="2.4" />
      <Res x="345" y="120" len="90" label="R2" tone={N} />
      <Wire d="M390 120 L470 120" stroke={N} width="2.4" />
      <Res x="520" y="120" len="90" label="R4" tone={N} />
      <Wire d="M565 120 L620 120 L620 320" stroke={N} width="2.4" />
      <Wire d="M70 234 L70 320 L620 320" stroke={N} width="2.4" />
      <Dot cx="290" cy="120" r="6" fill={N} />
      <Dot cx="290" cy="320" r="6" fill={N} />
      <Dot cx="470" cy="120" r="6" fill={N} />
      <Dot cx="470" cy="320" r="6" fill={N} />
      <g className="ecam-pulse">
        <Wire d="M290 120 L290 192" stroke={RED} width="3" />
        <Wire d="M290 238 L290 320" stroke={RED} width="3" />
        <Src cx="290" cy="215" kind="i" label="Is" tone={RED} r="23" labelSide="left" />
      </g>
      <M x="290" y="352" size={11} fill={RED} weight={800}>
        voltage across it unknown
      </M>
      <Res x="470" y="215" len="110" orient="v" label="R3" tone={N} />
      <Wire d="M470 120 L470 160 M470 270 L470 320" stroke={N} width="2.4" />
      <MeshLoop cx="180" cy="218" r="30" label="i₁" tone={BLUE} className="ecam-spin-slow" />
      <MeshLoop cx="380" cy="218" r="30" label="i₂" tone={PURP} className="ecam-spin-slow ecam-delay-1" />
      <MeshLoop cx="548" cy="218" r="30" label="i₃" tone={TEAL} className="ecam-spin-slow ecam-delay-2" />

      {/* The supermesh boundary runs round meshes 1 and 2 together, detouring
          outside the red branch rather than crossing it. */}
      <Wire d="M96 98 L470 98 L470 342 L96 342 L96 98" stroke={AMBER} width="3.2" dash="10 7" className="ecam-draw" />
      <M x="230" y="86" size={11.5} fill={AMBER} weight={800}>
        supermesh: KVL round here
      </M>

      {[
        ['supermesh KVL', 'R1·i₁+R2·i₂+R3(i₂−i₃) = Vs', AMBER],
        ['constraint', 'i₁ − i₂ = Is', ROSE],
        ['mesh 3 KVL', 'R4·i₃ + R3(i₃−i₂) = 0', TEAL],
      ].map(([tag, eq, tone], i) => (
        <g key={tag} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x="648" y={104 + i * 62} width="200" height="52" rx="10" fill={WHITE} stroke={tone} strokeWidth={i === 1 ? 3 : 2} />
          <M x="662" y={126 + i * 62} size={10} fill={tone} anchor="start" weight={800}>
            {tag}
          </M>
          <M x="662" y={144 + i * 62} size={9.5} fill={N} anchor="start">
            {eq}
          </M>
        </g>
      ))}
      <Tag x="662" y="302" text="3 meshes · 3 equations" tone={GREEN} w="172" className="ecam-emerge" />
      <M x="748" y="368" size={10.5} fill={MUTED}>
        supermesh 1 + constraint 1 + mesh 3
      </M>
    </Scene>
  )
}

export function NodeMatrixAssemblyScene() {
  return (
    <Scene caption="Same machine, dual parts: conductances instead of resistances, nodes instead of loops">
      <Src cx="86" cy="150" kind="i" label="Is1" tone={BLUE} r="19" />
      <Wire d="M86 131 L86 100 L200 100" stroke={N} width="2.4" />
      <Wire d="M86 169 L86 320 L380 320" stroke={N} width="2.4" />
      <Dot cx="200" cy="100" r="7" fill={BLUE} />
      <Dot cx="380" cy="100" r="7" fill={TEAL} />
      <M x="200" y="80" size={12} fill={BLUE} weight={800}>v₁</M>
      <M x="380" y="80" size={12} fill={TEAL} weight={800}>v₂</M>
      <Res x="200" y="210" len="110" orient="v" label="G1" tone={N} />
      <Wire d="M200 100 L200 155 M200 265 L200 320" stroke={N} width="2.4" />
      <Res x="290" y="100" len="140" label="G3" tone={AMBER} />
      <Res x="380" y="210" len="110" orient="v" label="G2" tone={N} />
      <Wire d="M380 100 L380 155 M380 265 L380 320" stroke={N} width="2.4" />
      <Gnd x="290" y="320" tone={N} label="reference" />

      <Matrix x="512" y="106" rows={[['G1+G3', '−G3'], ['−G3', 'G2+G3']]} cell="76" accent={TEAL} className="ecam-cell-in" size={11.5} />
      <M x="684" y="182" size={16} fill={N}>×</M>
      <Matrix x="712" y="106" rows={[['v₁'], ['v₂']]} cell="44" accent={BLUE} className="ecam-cell-in ecam-delay-1" />
      <M x="780" y="182" size={16} fill={N}>=</M>
      <Matrix x="808" y="106" rows={[['Is1'], ['0']]} cell="44" accent={AMBER} className="ecam-cell-in ecam-delay-2" />
      <Wire d="M320 116 L500 158" stroke={AMBER} width="2" dash="6 5" marker="url(#ecaArrA)" className="ecam-flow-arrow" />
      <M x="410" y="136" size={10.5} fill={AMBER} weight={800}>
        shared G3, negated
      </M>

      <g className="ecam-slide-in ecam-delay-3">
        <rect x="56" y="374" width="788" height="62" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.4" />
        <Wire d="M450 380 L450 430" stroke={PURP} width="2" dash="5 5" />
        <M x="252" y="400" size={11.5} fill={BLUE} weight={800}>
          mesh: R · loops · voltage sources
        </M>
        <M x="252" y="422" size={10.5} fill={MUTED}>
          unknowns are mesh currents
        </M>
        <M x="650" y="400" size={11.5} fill={TEAL} weight={800}>
          node: G · nodes · current sources
        </M>
        <M x="650" y="422" size={10.5} fill={MUTED}>
          unknowns are node voltages
        </M>
      </g>
    </Scene>
  )
}

export function SupernodeScene() {
  return (
    <Scene caption="Draw a surface, sum the currents crossing it, and the unknown source current never appears">
      <Dot cx="160" cy="130" r="7" fill={BLUE} />
      <Dot cx="360" cy="130" r="7" fill={AMBER} />
      <Dot cx="540" cy="130" r="7" fill={AMBER} />
      <M x="160" y="110" size={12} fill={BLUE} weight={800}>v₁</M>
      <M x="352" y="110" size={12} fill={AMBER} weight={800} anchor="end">v₂</M>
      <M x="548" y="110" size={12} fill={AMBER} weight={800} anchor="start">v₃</M>
      <Res x="262" y="130" len="120" label="G1" tone={N} />
      <g opacity="0.45">
        <Src cx="450" cy="130" kind="v" tone={MUTED} r="21" />
        <Wire d="M360 130 L429 130 M471 130 L540 130" stroke={MUTED} width="2.4" />
        <M x="450" y="96" size={11} fill={MUTED} weight={800}>
          Vs
        </M>
      </g>
      <M x="450" y="182" size={10.5} fill={MUTED}>
        its current is unknown — and never crosses the surface
      </M>
      <Res x="360" y="250" len="100" orient="v" label="G2" tone={N} />
      <Res x="540" y="250" len="100" orient="v" label="G3" tone={N} />
      <Wire d="M360 130 L360 200 M360 300 L360 350 M540 130 L540 200 M540 300 L540 350" stroke={N} width="2.4" />
      <Wire d="M160 130 L160 350 L620 350" stroke={N} width="2.4" />
      <Src cx="100" cy="240" kind="i" label="Is" tone={BLUE} r="19" />
      <Wire d="M100 221 L100 130 L160 130 M100 259 L100 350" stroke={N} width="2.4" />
      <Gnd x="450" y="350" tone={N} />

      <Wire d="M320 82 L580 82 L580 168 L320 168 L320 82" stroke={PURP} width="3" dash="10 7" className="ecam-draw" />
      <M x="450" y="70" size={11.5} fill={PURP} weight={800}>
        supernode surface
      </M>
      <Flow from={[300, 130]} to={[334, 130]} label="G1(v₁−v₂)" tone={GREEN} dy={-14} className="ecam-current" />
      <Flow from={[360, 196]} to={[360, 226]} label="G2·v₂" tone={GREEN} dy={-2} className="ecam-current ecam-delay-1" />
      <Flow from={[540, 196]} to={[540, 226]} label="G3·v₃" tone={GREEN} dy={-2} className="ecam-current ecam-delay-2" />

      {[
        ['supernode KCL', 'G1(v₁−v₂) = G2·v₂ + G3·v₃', PURP],
        ['constraint', 'v₂ − v₃ = Vs', ROSE],
      ].map(([tag, eq, tone], i) => (
        <g key={tag} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x={120 + i * 330} y="394" width="310" height="52" rx="10" fill={WHITE} stroke={tone} strokeWidth={i === 1 ? 3 : 2} />
          <M x={136 + i * 330} y="416" size={10} fill={tone} anchor="start" weight={800}>
            {tag}
          </M>
          <M x={136 + i * 330} y="434" size={11} fill={N} anchor="start">
            {eq}
          </M>
        </g>
      ))}
      <g className="ecam-pulse">
        <rect x="690" y="248" width="164" height="62" rx="12" fill={TEAL} fillOpacity="0.12" stroke={TEAL} strokeWidth="2.4" />
        <M x="772" y="276" size={11} fill={TEAL} weight={800}>
          dual of
        </M>
        <M x="772" y="296" size={11} fill={TEAL} weight={800}>
          the supermesh
        </M>
      </g>
    </Scene>
  )
}

export function ImpedanceSubstitutionScene() {
  const rows = [
    ['resistance R', 'impedance Z'],
    ['V = I·R', 'V = I·Z'],
    ['series: ΣR', 'series: ΣZ'],
    ['parallel: ΣG', 'parallel: ΣY'],
    ['mesh matrix in R', 'same matrix in Z'],
  ]
  return (
    <Scene caption="Nothing about the method changes — only the number in each box does">
      <MapTable x="56" y="46" w="788" rows={rows} leftTitle="DC" rightTitle="AC steady state" leftTone={BLUE} rightTone={TEAL} arrowLabel="substitute" rowH={36} />
      {[
        ['R → R', 'in phase', BLUE, 0],
        ['L → jωL', 'I lags 90°', PURP, -90],
        ['C → 1/(jωC)', 'I leads 90°', AMBER, 90],
      ].map(([lab, note, tone, deg], i) => (
        <g key={lab} className={`ecam-slide-in ecam-delay-${i}`}>
          <rect x={72 + i * 268} y="278" width="248" height="166" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={196 + i * 268} y="302" size={12.5} fill={tone} weight={800}>
            {lab}
          </M>
          <Plane cx={196 + i * 268} cy={368} r={40} xLabel="" yLabel="" tone={MUTED} />
          <Phasor ox={196 + i * 268} oy={368} ang={0} len={40} tone={tone} width="3.4" />
          <Phasor ox={196 + i * 268} oy={368} ang={deg} len={30} tone={GREEN} width="3.4" />
          <rect x={112 + i * 268} y="416" width="18" height="5" rx="2" fill={tone} />
          <M x={140 + i * 268} y="422" size={10} fill={tone} anchor="start" weight={800}>
            V
          </M>
          <rect x={168 + i * 268} y="416" width="18" height="5" rx="2" fill={GREEN} />
          <M x={196 + i * 268} y="422" size={10} fill={GREEN} anchor="start" weight={800}>
            I
          </M>
          <M x={196 + i * 268} y="438" size={10} fill={MUTED} weight={800}>
            {note}
          </M>
        </g>
      ))}
    </Scene>
  )
}

export function DualityPairScene() {
  const swaps = [
    ['V', 'I'],
    ['R', 'G'],
    ['L', 'C'],
    ['series', 'parallel'],
    ['mesh', 'node'],
    ['short', 'open'],
    ['KVL', 'KCL'],
  ]
  return (
    <Scene caption="Dots inside the meshes, one outside, and the dual falls out branch by branch">
      <rect x="52" y="56" width="300" height="212" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
      <Src cx="92" cy="170" kind="v" label="V" tone={BLUE} r="16" labelSide="right" />
      <Wire d="M92 154 L92 100 L312 100 L312 240 L92 240 L92 186" stroke={N} width="2.4" />
      <Res x="180" y="100" len="70" label="R1" tone={N} />
      <Ind x="210" y="170" len="80" orient="v" label="L" tone={PURP} />
      <Wire d="M210 100 L210 132 M210 208 L210 240" stroke={N} width="2.4" />
      <Dot cx="150" cy="170" r="8" fill={AMBER} className="ecam-pop" />
      <Dot cx="266" cy="170" r="8" fill={AMBER} className="ecam-pop ecam-delay-1" />
      <Dot cx="202" cy="306" r="8" fill={AMBER} className="ecam-pop ecam-delay-2" />
      <M x="150" y="192" size={10.5} fill={AMBER} weight={800}>1</M>
      <M x="266" y="192" size={10.5} fill={AMBER} weight={800}>2</M>
      <M x="202" y="328" size={10.5} fill={AMBER} weight={800}>3 (outside)</M>
      <Wire d="M150 170 L266 170" stroke={TEAL} width="2.2" dash="6 5" className="ecam-draw" />
      <Wire d="M150 170 L202 306" stroke={TEAL} width="2.2" dash="6 5" className="ecam-draw ecam-delay-1" />
      <Wire d="M266 170 L202 306" stroke={TEAL} width="2.2" dash="6 5" className="ecam-draw ecam-delay-2" />

      <Wire d="M376 160 L436 160" stroke={PURP} width="3" marker="url(#ecaArrP)" className="ecam-flow-arrow" />
      <M x="406" y="146" size={10.5} fill={PURP} weight={800}>
        dual
      </M>

      <rect x="456" y="56" width="300" height="212" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.2" />
      <Src cx="496" cy="170" kind="i" label="I" tone={TEAL} r="16" labelSide="left" />
      <Wire d="M496 154 L496 100 L716 100 M496 186 L496 240 L716 240 M716 100 L716 240" stroke={N} width="2.4" />
      <Res x="590" y="170" len="80" orient="v" label="G1" tone={N} />
      <Wire d="M590 100 L590 132 M590 208 L590 240" stroke={N} width="2.4" />
      <Cap x="666" y="170" len="80" orient="v" label="C" tone={AMBER} />
      <Wire d="M666 100 L666 128 M666 212 L666 240" stroke={N} width="2.4" />

      {swaps.map(([a, b], i) => (
        <g key={a} className={`ecam-cell-in ecam-delay-${i % 5}`}>
          <rect x={56 + i * 114} y="382" width="104" height="44" rx="9" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <M x={84 + i * 114} y="410" size={12} fill={BLUE} weight={800}>
            {a}
          </M>
          <M x={108 + i * 114} y="410" size={12} fill={MUTED}>
            ↔
          </M>
          <M x={134 + i * 114} y="410" size={12} fill={TEAL} weight={800}>
            {b}
          </M>
        </g>
      ))}
      <M x="450" y="366" size={11.5} fill={MUTED} weight={800}>
        the swap table, applied element by element
      </M>
    </Scene>
  )
}

/* ── Module 2 — network theorems ────────────────────────────────── */

export function TheoremSelectionScene() {
  const branches = [
    ['every current and voltage', 'full mesh or node analysis', MUTED, 'expensive', 1],
    ['one load, many values', 'Thevenin or Norton', GREEN, 'reduce once, reuse', 0.3],
    ['effect of one source', 'superposition', GREEN, 'one source at a time', 0.5],
    ['best load to choose', 'maximum power transfer', BLUE, 'design, not analysis', 0.35],
  ]
  return (
    <Scene caption="The theorems are not shortcuts to the same answer — they answer different questions">
      <g className="ecam-emerge">
        <rect x="316" y="60" width="268" height="58" rx="14" fill={N} />
        <L x="450" y="96" size={14.5} fill={WHITE}>
          what do you actually need?
        </L>
      </g>
      {branches.map(([q, dest, tone, tag, cost], i) => {
        const y = 156 + i * 76
        return (
          <g key={q} className={`ecam-slide-in ecam-delay-${i}`}>
            <Wire d={`M450 118 L450 ${y - 12} L${i % 2 === 0 ? 300 : 600} ${y - 12}`} stroke={MUTED} width="2" dash="6 5" opacity="0.6" />
            <M x="90" y={y + 14} size={11.5} fill={MUTED} anchor="start" weight={800}>
              {q}
            </M>
            <rect x="330" y={y - 8} width="292" height="44" rx="10" fill={tone} fillOpacity="0.12" stroke={tone} strokeWidth="2.3" />
            <L x="476" y={y + 20} size={13} fill={tone}>
              {dest}
            </L>
            <rect x="646" y={y + 4} width="150" height="12" rx="6" fill={SKY} />
            <g className="ecam-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
              <rect x="646" y={y + 4} width={150 * cost} height="12" rx="6" fill={tone} />
            </g>
            <M x="806" y={y + 15} size={10.5} fill={tone} anchor="start" weight={800}>
              {tag}
            </M>
          </g>
        )
      })}
      <M x="720" y="140" size={11} fill={MUTED} weight={800}>
        effort
      </M>
    </Scene>
  )
}

export function LinearityScene() {
  return (
    <Scene caption="Scale the source, the response scales; add the sources, the responses add">
      <rect x="52" y="56" width="560" height="168" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.3" />
      <L x="332" y="80" size={12.5} fill={BLUE}>
        Homogeneity
      </L>
      <Src cx="118" cy="140" kind="v" label="10 V" tone={BLUE} r="22" labelDy="-40" />
      <Wire d="M140 140 L208 140" stroke={N} width="2.4" marker="url(#ecaArr)" />
      <Block x="212" y="112" w="90" h="56" label="network" stroke={MUTED} />
      <Wire d="M302 140 L366 140" stroke={N} width="2.4" marker="url(#ecaArr)" />
      <M x="400" y="146" size={13} fill={GREEN} weight={800}>
        2 A
      </M>
      <g className="ecam-pulse">
        <rect x="430" y="118" width="46" height="44" rx="10" fill={AMBER} fillOpacity="0.18" stroke={AMBER} strokeWidth="2.4" />
        <M x="453" y="146" size={14} fill={AMBER} weight={800}>
          ×3
        </M>
      </g>
      <M x="530" y="126" size={12} fill={BLUE} weight={800}>
        30 V in
      </M>
      <M x="530" y="160" size={13} fill={GREEN} weight={800}>
        6 A out
      </M>
      <M x="118" y="196" size={10.5} fill={MUTED}>
        source
      </M>

      <rect x="52" y="240" width="560" height="196" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.3" />
      <L x="332" y="264" size={12.5} fill={TEAL}>
        Additivity
      </L>
      {[
        ['A alone', '1.0 A', BLUE],
        ['B alone', '1.5 A', PURP],
        ['both', '2.5 A', GREEN],
      ].map(([lab, val, tone], i) => (
        <g key={lab} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x={76 + i * 180} y="290" width="146" height="120" rx="10" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x={149 + i * 180} y="314" size={11} fill={tone} weight={800}>
            {lab}
          </M>
          <Src cx={149 + i * 180} cy="350" kind={i === 1 ? 'i' : 'v'} tone={tone} r="17" />
          <M x={149 + i * 180} y="396" size={13} fill={GREEN} weight={800}>
            {val}
          </M>
        </g>
      ))}
      <M x="248" y="356" size={18} fill={N} weight={800}>+</M>
      <M x="428" y="356" size={18} fill={N} weight={800}>=</M>

      <g className="ecam-slide-in ecam-delay-3">
        <rect x="638" y="56" width="206" height="200" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.4" />
        <L x="741" y="84" size={12.5} fill={RED}>
          these break it
        </L>
        {['diode', 'saturating inductor', 'switch', 'anything that clips'].map((t, i) => (
          <M key={t} x="741" y={120 + i * 30} size={11.5} fill={N}>
            {t}
          </M>
        ))}
      </g>
      <Card
        x="638"
        y="276"
        w="206"
        h="160"
        title="what linearity buys"
        accent={GREEN}
        lines={['superposition', 'Thevenin & Norton', 'phasors', 'Laplace']}
        linesY={62}
        lineH={26}
        className="ecam-slide-in ecam-delay-4"
      />
    </Scene>
  )
}

export function SuperpositionScene() {
  return (
    <Scene caption="Kill one source at a time, keep the signs, then add">
      {[
        ['full circuit', 'i = ?', BLUE, 'both'],
        ['Is → open', "i′ = 1.8 A", AMBER, 'open'],
        ['Vs → short', 'i″ = 0.3 A', PURP, 'short'],
      ].map(([title, res, tone, mode], i) => (
        <g key={title} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x={44 + i * 236} y="60" width="216" height="220" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={44 + i * 236} y="60" width="216" height="28" rx="12" fill={tone} />
          <L x={152 + i * 236} y="80" size={11.5} fill={WHITE}>
            {title}
          </L>
          {mode === 'short' ? (
            <Wire d={`M${76 + i * 236} 180 L${76 + i * 236} 122`} stroke={PURP} width="3" />
          ) : (
            <Src cx={76 + i * 236} cy="152" kind="v" tone={mode === 'open' ? tone : MUTED} r="16" />
          )}
          {mode === 'open' ? (
            <g>
              <Wire d={`M${224 + i * 236} 122 L${224 + i * 236} 142`} stroke={AMBER} width="3" />
              <Wire d={`M${224 + i * 236} 168 L${224 + i * 236} 188`} stroke={AMBER} width="3" />
              <M x={224 + i * 236} y="160" size={10} fill={AMBER} weight={800}>
                gap
              </M>
            </g>
          ) : (
            <Src cx={224 + i * 236} cy="152" kind="i" tone={mode === 'short' ? tone : MUTED} r="16" />
          )}
          <Wire d={`M${76 + i * 236} 122 L${224 + i * 236} 122 M${76 + i * 236} 188 L${224 + i * 236} 188`} stroke={N} width="2.2" />
          <Res x={150 + i * 236} y="188" len="70" label="" tone={N} />
          <Flow
            from={[132 + i * 236, 218]}
            to={[i === 2 ? 108 + i * 236 : 176 + i * 236, 218]}
            label=""
            tone={tone}
            className="ecam-current"
          />
          <M x={152 + i * 236} y="252" size={13} fill={tone} weight={800}>
            {res}
          </M>
        </g>
      ))}
      <M x="290" y="306" size={16} fill={N} weight={800}>−</M>
      <M x="526" y="306" size={16} fill={N} weight={800}>=</M>
      <g className="ecam-emerge">
        <rect x="614" y="284" width="230" height="52" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="3" />
        <M x="729" y="316" size={14} fill={GREEN} weight={800}>
          i = i′ − i″ = 1.5 A
        </M>
      </g>
      <Card
        x="140"
        y="356"
        w="620"
        h="88"
        title="deactivation rules — the whole theorem in one line"
        accent={ROSE}
        lines={['V source → short circuit    ·    I source → open circuit', 'dependent source → left completely alone']}
        linesY={58}
        lineH={22}
        className="ecam-slide-in ecam-delay-3"
      />
    </Scene>
  )
}

export function PowerCrossTermScene() {
  return (
    <Scene caption="Current superposes, power does not — the cross term is what goes missing">
      <rect x="90" y="86" width="150" height="150" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2.4" className="ecam-cell-in" />
      <M x="165" y="168" size={13} fill={GREEN} weight={800}>
        i₁²
      </M>
      <rect x="240" y="236" width="150" height="150" fill={GREEN} fillOpacity="0.2" stroke={GREEN} strokeWidth="2.4" className="ecam-cell-in ecam-delay-1" />
      <M x="315" y="318" size={13} fill={GREEN} weight={800}>
        i₂²
      </M>
      <rect x="240" y="86" width="150" height="150" fill={AMBER} fillOpacity="0.22" stroke={AMBER} strokeWidth="2.4" className="ecam-cell-in ecam-delay-2" />
      <M x="315" y="168" size={13} fill={AMBER} weight={800}>
        i₁i₂
      </M>
      <rect x="90" y="236" width="150" height="150" fill={AMBER} fillOpacity="0.22" stroke={AMBER} strokeWidth="2.4" className="ecam-cell-in ecam-delay-3" />
      <M x="165" y="318" size={13} fill={AMBER} weight={800}>
        i₁i₂
      </M>
      <path d="M404 86 L414 86 M409 86 L409 386 M404 386 L414 386" stroke={AMBER} strokeWidth="2.2" fill="none" />
      <M x="424" y="228" size={11} fill={AMBER} anchor="start" weight={800}>
        the cross term
      </M>
      <M x="424" y="246" size={11} fill={AMBER} anchor="start" weight={800}>
        superposition discards
      </M>
      <M x="240" y="70" size={12} fill={N} weight={800}>
        side = i₁ + i₂
      </M>

      <Bars
        x="620"
        y="120"
        w="180"
        items={[['Σ partial P', 2, MUTED], ['true P', 4, ROSE]]}
        rowH={56}
        max={4}
      />
      <M x="700" y="248" size={11.5} fill={MUTED}>
        i₁ = i₂ = 1 A into 1 Ω
      </M>
      <g className="ecam-emerge">
        <rect x="560" y="276" width="300" height="52" rx="10" fill={ROSE} fillOpacity="0.12" stroke={ROSE} strokeWidth="2.4" />
        <M x="710" y="308" size={12.5} fill={ROSE} weight={800}>
          2 W predicted, 4 W delivered
        </M>
      </g>
      <Card
        x="560"
        y="348"
        w="300"
        h="74"
        title="the rule"
        accent={GREEN}
        mono
        lines={['superpose i, THEN compute i²R']}
        linesY={54}
        className="ecam-slide-in ecam-delay-4"
      />
    </Scene>
  )
}

export function DependentPartialsScene() {
  return (
    <Scene caption="The controlled value superposes too — because the network is still linear">
      {[
        ['full circuit', '6 V', BLUE, false],
        ['Is opened', '4 V', AMBER, true],
        ['Vs shorted', '2 V', AMBER, true],
      ].map(([title, val, tone, changed], i) => (
        <g key={title} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x={44 + i * 278} y="66" width="258" height="230" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={44 + i * 278} y="66" width="258" height="28" rx="12" fill={tone} />
          <L x={173 + i * 278} y="86" size={11.5} fill={WHITE}>
            {title}
          </L>
          <Src cx={96 + i * 278} cy="170" kind="v" tone={i === 2 ? MUTED : MUTED} r="16" />
          <Wire d={`M${96 + i * 278} 154 L${96 + i * 278} 128 L${250 + i * 278} 128`} stroke={N} width="2.2" />
          <Wire d={`M${96 + i * 278} 186 L${96 + i * 278} 244 L${250 + i * 278} 244`} stroke={N} width="2.2" />
          <Src cx={250 + i * 278} cy="186" kind="v" tone={changed ? AMBER : PURP} dep r="24" />
          <Wire d={`M${250 + i * 278} 162 L${250 + i * 278} 128 M${250 + i * 278} 210 L${250 + i * 278} 244`} stroke={N} width="2.2" />
          <Res x={173 + i * 278} y="128" len="70" label="" tone={N} />
          <M x={173 + i * 278} y="282" size={14} fill={changed ? AMBER : PURP} weight={800}>
            {`diamond = ${val}`}
          </M>
        </g>
      ))}
      <g className="ecam-emerge">
        <rect x="230" y="332" width="440" height="56" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="3" />
        <M x="450" y="366" size={15} fill={GREEN} weight={800}>
          4 V + 2 V = 6 V ✓
        </M>
      </g>
      <M x="450" y="424" size={12} fill={MUTED} weight={800}>
        it was never switched off — it just followed its controlling variable
      </M>
    </Scene>
  )
}

export function ReciprocityScene() {
  return (
    <Scene caption="Swap source and meter in a passive bilateral network and the reading does not move">
      {[
        ['source at A, meter at B', BLUE, false],
        ['source at B, meter at A', TEAL, true],
      ].map(([title, tone, swapped], i) => (
        <g key={title} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x={44 + i * 420} y="60" width="392" height="216" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={44 + i * 420} y="60" width="392" height="28" rx="12" fill={tone} />
          <L x={240 + i * 420} y="80" size={11.5} fill={WHITE}>
            {title}
          </L>
          {swapped ? (
            <Meter cx={112 + i * 420} cy="176" kind="A" tone={GREEN} className="ecam-needle" />
          ) : (
            <Src cx={112 + i * 420} cy="176" kind="v" label="V" tone={tone} r="20" />
          )}
          <Wire d={`M${112 + i * 420} 154 L${112 + i * 420} 120 L${368 + i * 420} 120`} stroke={N} width="2.2" />
          <Wire d={`M${112 + i * 420} 198 L${112 + i * 420} 242 L${368 + i * 420} 242`} stroke={N} width="2.2" />
          <Res x={240 + i * 420} y="120" len="76" label="R1" tone={N} />
          <Res x={240 + i * 420} y="181" len="60" orient="v" label="R2" tone={N} />
          <Wire d={`M${240 + i * 420} 120 L${240 + i * 420} 151 M${240 + i * 420} 211 L${240 + i * 420} 242`} stroke={N} width="2.2" />
          {swapped ? (
            <Src cx={368 + i * 420} cy="176" kind="v" label="V" tone={tone} r="20" labelSide="right" />
          ) : (
            <Meter cx={368 + i * 420} cy="176" kind="A" tone={GREEN} className="ecam-needle" />
          )}
          <Wire d={`M${368 + i * 420} 120 L${368 + i * 420} 156 M${368 + i * 420} 196 L${368 + i * 420} 242`} stroke={N} width="2.2" />
          <M x={240 + i * 420} y="266" size={10.5} fill={MUTED}>
            {swapped ? 'port B driven' : 'port A driven'}
          </M>
        </g>
      ))}
      <g className="ecam-emerge">
        <rect x="144" y="296" width="190" height="46" rx="10" fill={WHITE} stroke={GREEN} strokeWidth="3" />
        <M x="239" y="326" size={14} fill={GREEN} weight={800}>
          2.5 A
        </M>
        <M x="380" y="326" size={18} fill={N} weight={800}>
          =
        </M>
        <rect x="566" y="296" width="190" height="46" rx="10" fill={WHITE} stroke={GREEN} strokeWidth="3" />
        <M x="661" y="326" size={14} fill={GREEN} weight={800}>
          2.5 A
        </M>
      </g>
      <g className="ecam-slide-in ecam-delay-3">
        <Matrix x="150" y="374" rows={[['R₁₁', 'R₁₂'], ['R₂₁', 'R₂₂']]} cell="40" accent={TEAL} />
        <circle cx="250" cy="394" r="19" fill="none" stroke={GREEN} strokeWidth="2.4" />
        <circle cx="210" cy="434" r="19" fill="none" stroke={GREEN} strokeWidth="2.4" />
        <M x="300" y="414" size={12} fill={GREEN} anchor="start" weight={800}>
          R₁₂ = R₂₁
        </M>
      </g>
      <g className="ecam-slide-in ecam-delay-4">
        <rect x="500" y="368" width="344" height="72" rx="12" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2.4" />
        <Src cx="546" cy="404" kind="v" tone={RED} dep r="20" />
        <M x="586" y="398" size={11.5} fill={RED} anchor="start" weight={800}>
          add one of these and
        </M>
        <M x="586" y="418" size={11.5} fill={RED} anchor="start" weight={800}>
          reciprocity fails
        </M>
      </g>
    </Scene>
  )
}

export function TheveninBlackBoxScene() {
  return (
    <Scene caption="Two numbers replace the whole network — outside the terminals, nothing can tell">
      <rect x="52" y="66" width="326" height="188" rx="14" fill={MUTED} fillOpacity="0.14" stroke={MUTED} strokeWidth="2.4" />
      <Src cx="96" cy="160" kind="v" tone={MUTED} r="16" />
      <Res x="170" y="106" len="70" tone={MUTED} />
      <Res x="256" y="106" len="70" tone={MUTED} />
      <Res x="200" y="160" len="60" orient="v" tone={MUTED} />
      <Src cx="290" cy="196" kind="i" tone={MUTED} r="15" />
      <Res x="170" y="214" len="70" tone={MUTED} />
      <Wire d="M96 144 L96 106 L135 106 M205 106 L221 106 M291 106 L340 106" stroke={MUTED} width="2" />
      <Wire d="M96 176 L96 214 L135 214 M205 214 L340 214" stroke={MUTED} width="2" />
      <M x="215" y="86" size={11} fill={MUTED} weight={800}>
        any linear two-terminal network
      </M>
      <Dot cx="340" cy="106" r="6" fill={N} />
      <Dot cx="340" cy="214" r="6" fill={N} />

      <Wire d="M394 160 L478 160" stroke={PURP} width="3.4" marker="url(#ecaArrP)" className="ecam-flow-arrow" />
      <M x="436" y="144" size={10.5} fill={PURP} weight={800}>
        as seen from
      </M>
      <M x="436" y="186" size={10.5} fill={PURP} weight={800}>
        these terminals
      </M>

      <rect x="496" y="66" width="326" height="188" rx="14" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
      <Src cx="560" cy="160" kind="v" label="Vth" tone={GREEN} r="22" />
      <Wire d="M560 138 L560 106 L640 106" stroke={N} width="2.4" />
      <Res x="700" y="106" len="100" label="Rth" tone={GREEN} />
      <Wire d="M750 106 L790 106" stroke={N} width="2.4" />
      <Wire d="M560 182 L560 214 L790 214" stroke={N} width="2.4" />
      <Dot cx="790" cy="106" r="6" fill={N} />
      <Dot cx="790" cy="214" r="6" fill={N} />

      <g className="ecam-emerge">
        <Res x="340" y="300" len="70" orient="v" label="RL" tone={BLUE} />
        <Wire d="M340 214 L340 265 M340 335 L340 366" stroke={N} width="2.2" />
        <Meter cx="250" cy="320" kind="A" reading="1.5 A" tone={GREEN} className="ecam-needle" />
        <Res x="790" y="300" len="70" orient="v" label="RL" tone={BLUE} />
        <Wire d="M790 214 L790 265 M790 335 L790 366" stroke={N} width="2.2" />
        <Meter cx="700" cy="320" kind="A" reading="1.5 A" tone={GREEN} className="ecam-needle" />
        <M x="475" y="326" size={18} fill={GREEN} weight={800}>
          =
        </M>
      </g>
      <g className="ecam-slide-in ecam-delay-4">
        <rect x="140" y="400" width="620" height="46" rx="10" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2.2" />
        <L x="450" y="429" size={12.5} fill={RED}>
          equivalent outside the terminals only — the internal power is different
        </L>
      </g>
    </Scene>
  )
}

export function RthDeactivationScene() {
  const frames = [
    ['1 · load removed', BLUE],
    ['2 · sources deactivated', AMBER],
    ['3 · merge what is left', TEAL],
    ['4 · one resistor', GREEN],
  ]
  return (
    <Scene caption="With no dependent sources, Rth is just resistance arithmetic">
      {frames.map(([title, tone], i) => (
        <g key={title} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x={40 + i * 212} y="70" width="192" height="230" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={40 + i * 212} y="70" width="192" height="28" rx="12" fill={tone} />
          <L x={136 + i * 212} y="90" size={11} fill={WHITE}>
            {title}
          </L>
        </g>
      ))}

      <Src cx="76" cy="196" kind="v" tone={BLUE} r="16" />
      <Wire d="M76 180 L76 140 L196 140 M76 212 L76 256 L196 256" stroke={N} width="2.2" />
      <Res x="140" y="140" len="62" tone={N} />
      <Src cx="196" cy="196" kind="i" tone={BLUE} r="15" />
      <Wire d="M196 140 L196 181 M196 211 L196 256" stroke={N} width="2.2" />
      <Dot cx="196" cy="140" r="5" fill={N} />
      <Dot cx="196" cy="256" r="5" fill={N} />

      <Wire d="M288 180 L288 212" stroke={AMBER} width="3.4" className="ecam-collapse" />
      <M x="288" y="230" size={10} fill={AMBER} weight={800}>
        shorted
      </M>
      <Wire d="M288 140 L408 140 M288 256 L408 256" stroke={N} width="2.2" />
      <Wire d="M288 168 L288 140 M288 224 L288 256" stroke={N} width="2.2" />
      <Res x="352" y="140" len="62" tone={N} />
      <Wire d="M408 140 L408 178 M408 214 L408 256" stroke={N} width="2.2" />
      <M x="408" y="200" size={10} fill={AMBER} weight={800}>
        open
      </M>

      <Res x="564" y="140" len="62" label="R1" tone={TEAL} />
      <Res x="564" y="230" len="62" label="R2" tone={TEAL} />
      <Wire d="M500 140 L533 140 M595 140 L628 140 M500 230 L533 230 M595 230 L628 230" stroke={N} width="2.2" />
      <Wire d="M500 140 L500 230 M628 140 L628 230" stroke={N} width="2.2" />
      <g className="ecam-emerge">
        <path d="M486 132 L476 132 L476 238 L486 238" stroke={GREEN} strokeWidth="2.2" fill="none" />
        <M x="564" y="282" size={11} fill={GREEN} weight={800}>
          R1 ∥ R2 = 4 Ω
        </M>
      </g>

      <g className="ecam-emerge">
        <Res x="808" y="196" len="100" orient="v" label="Rth" tone={GREEN} />
        <Wire d="M808 140 L808 146 M808 246 L808 256" stroke={N} width="2.2" />
        <Dot cx="808" cy="140" r="5" fill={N} />
        <Dot cx="808" cy="256" r="5" fill={N} />
        <M x="808" y="282" size={13} fill={GREEN} weight={800}>
          Rth = 4 Ω
        </M>
      </g>
      <Card
        x="150"
        y="330"
        w="600"
        h="96"
        title="deactivation, in the right order"
        accent={ROSE}
        lines={['remove the load first, or you will fold it into Rth', 'V source → wire · I source → gap · dependent → untouched']}
        linesY={58}
        lineH={24}
        className="ecam-slide-in ecam-delay-4"
      />
    </Scene>
  )
}

export function TestSourceScene() {
  return (
    <Scene caption="With a dependent source in the box, Rth has to be measured, not merged">
      <rect x="44" y="60" width="392" height="240" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.3" />
      <rect x="44" y="60" width="392" height="28" rx="12" fill={PURP} />
      <L x="240" y="80" size={11.5} fill={WHITE}>
        route 1 — apply a 1 V test source
      </L>
      <Src cx="100" cy="190" kind="v" label="1 V" tone={ROSE} r="21" />
      <Wire d="M100 169 L100 130 L230 130" stroke={N} width="2.4" />
      <Wire d="M100 211 L100 254 L380 254" stroke={N} width="2.4" />
      <Res x="290" y="130" len="90" label="R" tone={N} />
      <Src cx="380" cy="190" kind="i" tone={PURP} dep r="24" className="ecam-pulse" />
      <Wire d="M380 166 L380 130 M380 214 L380 254" stroke={N} width="2.4" />
      <Meter cx="180" cy="190" kind="A" reading="Itest" tone={GREEN} className="ecam-needle" />
      <Wire d="M160 190 L122 190 M200 190 L230 190 L230 130" stroke={N} width="2.2" />
      <M x="240" y="292" size={10.5} fill={MUTED}>
        independent sources deactivated, diamond left alive
      </M>

      <rect x="464" y="60" width="392" height="240" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.3" />
      <rect x="464" y="60" width="392" height="28" rx="12" fill={TEAL} />
      <L x="660" y="80" size={11.5} fill={WHITE}>
        route 2 — open circuit, then short circuit
      </L>
      <g className="ecam-cell-in">
        <rect x="484" y="104" width="172" height="126" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.9" />
        <M x="570" y="126" size={10.5} fill={MUTED} weight={800}>
          terminals open
        </M>
        <Meter cx="570" cy="170" kind="V" reading="Voc = Vth" tone={BLUE} />
      </g>
      <g className="ecam-cell-in ecam-delay-2">
        <rect x="668" y="104" width="172" height="126" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.9" />
        <M x="754" y="126" size={10.5} fill={MUTED} weight={800}>
          terminals shorted
        </M>
        <Meter cx="754" cy="170" kind="A" reading="Isc" tone={AMBER} />
      </g>
      <g className="ecam-emerge">
        <rect x="484" y="246" width="356" height="42" rx="10" fill={WHITE} stroke={TEAL} strokeWidth="2.6" />
        <M x="662" y="273" size={13} fill={TEAL} weight={800}>
          Rth = Voc / Isc
        </M>
      </g>

      <g className="ecam-emerge">
        <rect x="44" y="318" width="392" height="42" rx="10" fill={WHITE} stroke={ROSE} strokeWidth="2.6" />
        <M x="240" y="345" size={13} fill={ROSE} weight={800}>
          Rth = Vtest / Itest = 1 / Itest
        </M>
      </g>

      <Wire d="M120 412 L800 412" stroke={MUTED} width="2.2" />
      <rect x="120" y="398" width="200" height="28" rx="6" fill={RED} fillOpacity="0.16" stroke={RED} strokeWidth="2" className="ecam-slide-in ecam-delay-4" />
      <M x="220" y="418" size={11} fill={RED} weight={800}>
        Rth &lt; 0
      </M>
      <M x="220" y="446" size={10.5} fill={MUTED}>
        possible, and physical: an active network
      </M>
      <M x="560" y="446" size={10.5} fill={MUTED}>
        passive networks live out here
      </M>
      <M x="340" y="392" size={11} fill={MUTED} anchor="start" weight={800}>
        0
      </M>
    </Scene>
  )
}

export function NortonDualityScene() {
  return (
    <Scene caption="Same two numbers, two arrangements — pick whichever the next step wants">
      <rect x="52" y="64" width="360" height="178" rx="14" fill={WHITE} stroke={BLUE} strokeWidth="2.4" strokeDasharray="8 6" />
      <Src cx="108" cy="162" kind="v" label="Vth" tone={BLUE} r="21" />
      <Wire d="M108 141 L108 104 L200 104" stroke={N} width="2.4" />
      <Res x="262" y="104" len="96" label="Rth" tone={BLUE} />
      <Wire d="M310 104 L380 104" stroke={N} width="2.4" />
      <Wire d="M108 183 L108 220 L380 220" stroke={N} width="2.4" />
      <Dot cx="380" cy="104" r="5" fill={N} />
      <Dot cx="380" cy="220" r="5" fill={N} />

      <rect x="488" y="64" width="360" height="178" rx="14" fill={WHITE} stroke={AMBER} strokeWidth="2.4" strokeDasharray="8 6" />
      <Src cx="544" cy="162" kind="i" label="In" tone={AMBER} r="21" />
      <Wire d="M544 141 L544 104 L816 104" stroke={N} width="2.4" />
      <Wire d="M544 183 L544 220 L816 220" stroke={N} width="2.4" />
      <Res x="672" y="162" len="92" orient="v" label="Rn" tone={AMBER} />
      <Wire d="M672 104 L672 116 M672 208 L672 220" stroke={N} width="2.4" />
      <Dot cx="816" cy="104" r="5" fill={N} />
      <Dot cx="816" cy="220" r="5" fill={N} />

      <g className="ecam-flow-arrow">
        <Wire d="M424 144 L476 144" stroke={PURP} width="3" marker="url(#ecaArrP)" />
        <Wire d="M476 178 L424 178" stroke={PURP} width="3" marker="url(#ecaArrP)" />
      </g>

      <Card
        x="250"
        y="266"
        w="400"
        h="98"
        title="conversion"
        accent={PURP}
        mono
        lines={['Vth = In · Rth', 'In = Vth / Rth', 'Rn = Rth']}
        linesY={54}
        lineH={20}
        className="ecam-slide-in ecam-delay-2"
      />
      <g className="ecam-cell-in ecam-delay-3">
        <Meter cx="120" cy="320" kind="V" reading="reads Vth" tone={BLUE} />
        <M x="120" y="274" size={10.5} fill={MUTED} weight={800}>
          terminals open
        </M>
      </g>
      <g className="ecam-cell-in ecam-delay-4">
        <Meter cx="780" cy="320" kind="A" reading="reads In" tone={AMBER} />
        <M x="780" y="274" size={10.5} fill={MUTED} weight={800}>
          terminals shorted
        </M>
      </g>
      <M x="450" y="418" size={12} fill={MUTED} weight={800}>
        one measurement defines each; the third number is shared
      </M>
    </Scene>
  )
}

export function MaxPowerCurveScene() {
  // RL/Rth from 0.1 to 5 across the plot; power peaks at ratio 1.
  const x0 = 110
  const xw = 620
  const base = 400
  const xOf = (r) => x0 + (Math.log10(r) + 1) * (xw / 1.7)
  const powerPts = []
  const effPts = []
  for (let i = 0; i <= 60; i += 1) {
    const r = 10 ** (-1 + (1.7 * i) / 60)
    powerPts.push([xOf(r), base - 240 * ((4 * r) / (1 + r) ** 2)])
    effPts.push([xOf(r), base - 240 * (r / (1 + r))])
  }
  return (
    <Scene caption="Matched for power, mismatched for efficiency — they are different design goals">
      <Axes
        x={x0}
        y={base}
        w={xw + 40}
        h="300"
        xLabel="RL / Rth (log)"
        yLabel="normalised"
        tickLabels={[[xOf(0.1), '0.1'], [xOf(1), '1'], [xOf(5), '5']]}
      />
      <Curve pts={powerPts} stroke={GREEN} width="3.2" className="ecam-draw" />
      <Curve pts={effPts} stroke={BLUE} width="3.2" className="ecam-draw ecam-delay-2" />
      <Wire d={`M${xOf(1).toFixed(1)} 160 L${xOf(1).toFixed(1)} ${base}`} stroke={ROSE} width="2.2" dash="6 5" className="ecam-emerge" />
      <M x={xOf(1).toFixed(1)} y="150" size={11.5} fill={ROSE} weight={800}>
        RL = Rth
      </M>
      <Dot cx={xOf(1).toFixed(1)} cy={base - 120} r="7" fill={BLUE} className="ecam-pop" />
      <M x={(xOf(1) + 12).toFixed(1)} y={base - 128} size={11} fill={BLUE} anchor="start" weight={800}>
        efficiency only 50%
      </M>
      <M x={xOf(0.35).toFixed(1)} y={base - 196} size={11.5} fill={GREEN} weight={800}>
        power delivered
      </M>
      <M x={xOf(4).toFixed(1)} y={base - 216} size={11.5} fill={BLUE} weight={800}>
        efficiency → 100%
      </M>

      <Card
        x="52"
        y="66"
        w="230"
        h="76"
        title="radio receiver"
        accent={GREEN}
        lines={['match: power is scarce']}
        linesY={54}
        className="ecam-slide-in ecam-delay-3"
      />
      <Card
        x="618"
        y="66"
        w="230"
        h="76"
        title="power distribution"
        accent={BLUE}
        lines={['RL ≫ Rth: efficiency rules']}
        linesY={54}
        className="ecam-slide-in ecam-delay-4"
      />
    </Scene>
  )
}

export function ConjugateMatchScene() {
  return (
    <Scene caption="Cancel the reactance, match the resistance — the load is the conjugate">
      <Plane cx="270" cy="250" r="170" xLabel="R" yLabel="jX" grid />
      <Phasor ox="270" oy="250" ang={38} len={150} label="Zth = R + jX" tone={BLUE} className="ecam-draw" />
      <Phasor ox="270" oy="250" ang={-38} len={150} label="ZL = R − jX" tone={AMBER} className="ecam-draw ecam-delay-2" />
      <Wire d="M388 158 L388 250" stroke={BLUE} width="1.8" dash="5 4" />
      <Wire d="M388 342 L388 250" stroke={AMBER} width="1.8" dash="5 4" />
      <g className="ecam-flux">
        <Wire d="M424 166 L424 240" stroke={ROSE} width="2.6" marker="url(#ecaArrRo)" />
        <Wire d="M424 334 L424 260" stroke={ROSE} width="2.6" marker="url(#ecaArrRo)" />
      </g>
      <M x="436" y="256" size={10.5} fill={ROSE} anchor="start" weight={800}>
        cancels
      </M>
      <path d="M270 432 L270 442 M270 437 L388 437 M388 432 L388 442" stroke={GREEN} strokeWidth="2.2" fill="none" />
      <M x="329" y="460" size={11} fill={GREEN} weight={800}>
        equal resistances
      </M>

      <rect x="500" y="76" width="348" height="180" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.3" />
      <L x="674" y="100" size={12} fill={TEAL}>
        the series loop that results
      </L>
      <Src cx="546" cy="180" kind="v" tone={TEAL} r="18" />
      <Wire d="M546 162 L546 132 L600 132" stroke={N} width="2.2" />
      <Block x="604" y="112" w="80" h="40" label="Zth" stroke={BLUE} />
      <Block x="700" y="112" w="80" h="40" label="ZL" stroke={AMBER} />
      <Wire d="M684 132 L700 132 M780 132 L816 132 L816 228 L546 228 L546 198" stroke={N} width="2.2" />
      <g className="ecam-emerge">
        <rect x="560" y="182" width="230" height="36" rx="9" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.2" />
        <M x="675" y="206" size={12} fill={GREEN} weight={800}>
          total = 2R, purely resistive
        </M>
      </g>
      <Card
        x="500"
        y="282"
        w="348"
        h="96"
        title="when XL cannot be chosen"
        accent={ROSE}
        mono
        lines={['pick RL = |Rth + j(Xth + XL)|', 'a magnitude match, not a conjugate one']}
        linesY={56}
        lineH={22}
        className="ecam-slide-in ecam-delay-4"
      />
    </Scene>
  )
}

export function AcTheveninSweepScene() {
  return (
    <Scene caption="An AC equivalent is valid at one frequency only — that is the limitation Laplace removes">
      <rect x="48" y="62" width="300" height="164" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.3" />
      <Src cx="96" cy="150" kind="v" tone={BLUE} r="18" />
      <Wire d="M96 132 L96 100 L300 100 M96 168 L96 200 L300 200" stroke={N} width="2.2" />
      <Res x="170" y="100" len="62" tone={N} />
      <Ind x="250" y="100" len="62" tone={PURP} />
      <Cap x="200" y="150" len="52" orient="v" tone={AMBER} />
      <Wire d="M200 100 L200 124 M200 176 L200 200" stroke={N} width="2.2" />
      <M x="198" y="84" size={10.5} fill={MUTED} weight={800}>
        an AC network
      </M>

      <Wire d="M368 144 L432 144" stroke={PURP} width="3.2" marker="url(#ecaArrP)" className="ecam-flow-arrow" />
      <rect x="452" y="62" width="300" height="164" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <Src cx="508" cy="150" kind="v" label="V̄th" tone={GREEN} r="20" />
      <Wire d="M508 130 L508 100 L580 100" stroke={N} width="2.2" />
      <Block x="600" y="80" w="80" h="40" label="Zth" stroke={GREEN} />
      <Wire d="M680 100 L720 100 M508 170 L508 200 L720 200" stroke={N} width="2.2" />
      <Dot cx="720" cy="100" r="5" fill={N} />
      <Dot cx="720" cy="200" r="5" fill={N} />

      {[
        ['50 Hz', '12 ∠ −4°', '3 + j1 Ω'],
        ['500 Hz', '9 ∠ −31°', '3 + j10 Ω'],
        ['5 kHz', '2 ∠ −78°', '3 + j98 Ω'],
      ].map(([f, v, z], i) => (
        <g key={f} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x={60 + i * 262} y="252" width="244" height="94" rx="11" fill={WHITE} stroke={AMBER} strokeWidth="2.2" />
          <M x={182 + i * 262} y="276" size={12} fill={N} weight={800}>
            {f}
          </M>
          <M x={182 + i * 262} y="302" size={11.5} fill={AMBER} weight={800}>
            {v}
          </M>
          <M x={182 + i * 262} y="328" size={11.5} fill={AMBER} weight={800}>
            {z}
          </M>
        </g>
      ))}
      <M x="450" y="368" size={11} fill={MUTED} weight={800}>
        three frequencies, three different equivalents
      </M>

      <g className="ecam-emerge">
        <Wire d="M120 410 L660 410" stroke={TEAL} width="3" marker="url(#ecaArrT)" />
        <M x="380" y="398" size={11.5} fill={TEAL} weight={800}>
          Module 4: Laplace gives one equivalent for every frequency at once
        </M>
        <Block x="676" y="388" w="100" h="44" label="Z(s)" stroke={TEAL} />
      </g>
    </Scene>
  )
}

export function TheoremValidityScene() {
  const rows = [
    ['Superposition', '✓', '✓  do not deactivate the diamond', GREEN],
    ['Thevenin', '✓', '✓  test source for Rth', GREEN],
    ['Norton', '✓', '✓  same, via Isc', GREEN],
    ['Max power transfer', '✓', '✓  Rth may come out negative', GREEN],
    ['Reciprocity', '✓', '✗  network is not bilateral', RED],
  ]
  return (
    <Scene caption="Four of the five survive a dependent source; the fifth does not">
      <rect x="56" y="58" width="788" height="30" rx="8" fill={N} />
      <M x="190" y="79" size={11.5} fill={WHITE} weight={800}>
        theorem
      </M>
      <M x="480" y="79" size={11.5} fill={WHITE} weight={800}>
        independent only
      </M>
      <M x="700" y="79" size={11.5} fill={WHITE} weight={800}>
        dependent present
      </M>
      {rows.map(([name, a, b, tone], i) => (
        <g key={name} className={`ecam-cell-in ecam-delay-${i % 5}`}>
          <rect x="56" y={98 + i * 46} width="788" height="38" rx="8" fill={WHITE} stroke={tone} strokeWidth={i === 4 ? 2.8 : 1.8} />
          <L x="76" y={123 + i * 46} size={12.5} anchor="start" fill={N}>
            {name}
          </L>
          <M x="480" y={123 + i * 46} size={13} fill={GREEN} weight={800}>
            {a}
          </M>
          <M x="596" y={123 + i * 46} size={11} fill={tone} anchor="start" weight={800}>
            {b}
          </M>
        </g>
      ))}
      <g className="ecam-slide-in ecam-delay-4">
        <rect x="240" y="342" width="420" height="104" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.4" />
        <M x="450" y="366" size={11} fill={PURP} weight={800}>
          why it matters: every amplifier is such a network
        </M>
        <Wire d="M280 412 L330 412" stroke={N} width="2.2" />
        <Res x="360" y="412" len="56" label="rπ" tone={N} />
        <Wire d="M388 412 L420 412" stroke={N} width="2.2" />
        <Src cx="452" cy="412" kind="i" tone={PURP} dep r="20" className="ecam-pulse" />
        <M x="500" y="416" size={11} fill={PURP} anchor="start" weight={800}>
          gm·vπ
        </M>
        <Res x="600" y="412" len="56" label="ro" tone={N} />
        <Wire d="M472 412 L572 412 M628 412 L660 412" stroke={N} width="2.2" />
      </g>
    </Scene>
  )
}

export function TheoremDecisionScene() {
  const leaves = [
    ['all branch quantities', 'full mesh / node', MUTED],
    ['one load, many values', 'Thevenin', GREEN],
    ['effect of one source', 'superposition', BLUE],
    ['which load to fit', 'max power transfer', PURP],
  ]
  return (
    <Scene caption="Choose by the question, then check with a second route">
      <g className="ecam-emerge">
        <rect x="336" y="56" width="228" height="44" rx="12" fill={N} />
        <L x="450" y="84" size={13} fill={WHITE}>
          what is being asked?
        </L>
      </g>
      {leaves.map(([q, dest, tone], i) => (
        <g key={q} className={`ecam-slide-in ecam-delay-${i}`}>
          <Wire d={`M450 100 L${110 + i * 226} 132 L${110 + i * 226} 148`} stroke={MUTED} width="2" dash="6 5" opacity="0.65" />
          <rect x={34 + i * 226} y="148" width="152" height="80" rx="11" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth="2.3" />
          <foreignObject x={44 + i * 226} y="156" width="132" height="34">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11px/1.2 system-ui,sans-serif', color: '#55677a', textAlign: 'center' }}>
              {q}
            </div>
          </foreignObject>
          <M x={110 + i * 226} y="214" size={11.5} fill={tone} weight={800}>
            {dest}
          </M>
        </g>
      ))}

      <rect x="56" y="256" width="788" height="170" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.3" />
      <L x="450" y="280" size={12} fill={TEAL}>
        the second route is the check
      </L>
      <g className="ecam-cell-in ecam-delay-2">
        <rect x="88" y="300" width="230" height="52" rx="10" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
        <M x="203" y="332" size={11.5} fill={BLUE} weight={800}>
          deactivate → merge → Rth
        </M>
        <Wire d="M318 326 L376 356" stroke={BLUE} width="2.4" marker="url(#ecaArrB)" className="ecam-flow-arrow" />
      </g>
      <g className="ecam-cell-in ecam-delay-3">
        <rect x="582" y="300" width="230" height="52" rx="10" fill={WHITE} stroke={AMBER} strokeWidth="2.2" />
        <M x="697" y="332" size={11.5} fill={AMBER} weight={800}>
          Voc ÷ Isc → Rth
        </M>
        <Wire d="M582 326 L524 356" stroke={AMBER} width="2.4" marker="url(#ecaArrA)" className="ecam-flow-arrow" />
      </g>
      <g className="ecam-emerge">
        <rect x="376" y="358" width="148" height="46" rx="10" fill={WHITE} stroke={GREEN} strokeWidth="3" />
        <M x="450" y="387" size={13} fill={GREEN} weight={800}>
          Rth = 4 Ω ✓
        </M>
      </g>
    </Scene>
  )
}

export function FourMethodsScene() {
  const quads = [
    ['mesh analysis', '2×2 matrix, solve', BLUE, 1, 44, 66],
    ['superposition', "i′ − i″ = 1.5", PURP, 0.75, 512, 66],
    ['Thevenin', 'Vth 6 V · Rth 2 Ω', GREEN, 0.3, 44, 288],
    ['Norton', 'In 3 A · Rn 2 Ω', AMBER, 0.35, 512, 288],
  ]
  return (
    <Scene caption="Four routes, one answer — the cheapest route depends on what varies">
      {quads.map(([title, sub, tone, effort, x, y], i) => (
        <g key={title} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x={x} y={y} width="344" height="152" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={x} y={y} width="344" height="28" rx="12" fill={tone} />
          <L x={x + 172} y={y + 20} size={11.5} fill={WHITE}>
            {title}
          </L>
          <M x={x + 172} y={y + 62} size={12.5} fill={N} weight={800}>
            {sub}
          </M>
          <rect x={x + 92} y={y + 92} width="160" height="12" rx="6" fill={SKY} />
          <g className="ecam-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
            <rect x={x + 92} y={y + 92} width={160 * effort} height="12" rx="6" fill={tone} />
          </g>
          <M x={x + 172} y={y + 128} size={10.5} fill={MUTED}>
            effort if the load keeps changing
          </M>
          <Wire
            d={`M${x < 400 ? x + 344 : x} ${y + 76} L${x < 400 ? 404 : 496} ${y < 200 ? 224 : 268}`}
            stroke={tone}
            width="2.2"
            dash="6 5"
            marker={`url(#${markerFor(tone)})`}
            className="ecam-flow-arrow"
          />
        </g>
      ))}
      <g className="ecam-emerge">
        <rect x="374" y="222" width="152" height="52" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="3.2" />
        <M x="450" y="254" size={14} fill={GREEN} weight={800}>
          IL = 1.5 A ✓
        </M>
      </g>
    </Scene>
  )
}

/* ── Module 3 — resonance, initial conditions and transients ────── */

/** Normalised resonance curve 1/√(1 + Q²(r − 1/r)²) over a log frequency
 *  ratio r, sampled onto a plot box. Every resonance picture in this module
 *  is this one function at a different Q. */
function resonancePts(q, x0, w, base, height, rMin = 0.35, rMax = 2.9, steps = 90) {
  const pts = []
  const lo = Math.log10(rMin)
  const hi = Math.log10(rMax)
  for (let i = 0; i <= steps; i += 1) {
    const lr = lo + ((hi - lo) * i) / steps
    const r = 10 ** lr
    const mag = 1 / Math.sqrt(1 + q * q * (r - 1 / r) ** 2)
    pts.push([x0 + ((lr - lo) / (hi - lo)) * w, base - height * mag])
  }
  return pts
}

/** x position of a frequency ratio on the same log scale as resonancePts. */
function ratioX(r, x0, w, rMin = 0.35, rMax = 2.9) {
  const lo = Math.log10(rMin)
  const hi = Math.log10(rMax)
  return x0 + ((Math.log10(r) - lo) / (hi - lo)) * w
}

export function SeriesRlcSweepScene() {
  /* A linear frequency axis, because the picture the syllabus asks for — XL a
     straight rising line, XC a falling hyperbola — is only straight on one.
     Both reactances use the same coefficient, so they cross exactly at r = 1. */
  const x0 = 110
  const w = 680
  const mid = 190
  const base = 452
  const xOf = (r) => x0 + ((r - 0.4) / 1.2) * w
  const xl = []
  const xc = []
  const sum = []
  const zmag = []
  for (let i = 0; i <= 80; i += 1) {
    const r = 0.4 + (1.2 * i) / 80
    const x = xOf(r)
    const net = 36 * (r - 1 / r)
    xl.push([x, mid - 36 * r])
    xc.push([x, mid + 36 / r])
    sum.push([x, mid - net])
    zmag.push([x, base - 1.5 * Math.sqrt(20 * 20 + net * net)])
  }
  const f0x = xOf(1)
  return (
    <Scene caption="At f₀ the two reactances cancel and the circuit is a pure resistor">
      <Tag x="80" y="52" text="capacitive · I leads" tone={AMBER} w="174" className="ecam-fade-in" />
      <Tag x="646" y="52" text="inductive · I lags" tone={PURP} w="174" className="ecam-fade-in ecam-delay-2" />

      <Wire d={`M${x0} ${mid} L${x0 + w + 16} ${mid}`} stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d={`M${x0} 96 L${x0} 284`} stroke={MUTED} width="2.2" />
      <M x={x0 - 14} y="104" size={11} fill={MUTED} anchor="end">+X</M>
      <M x={x0 - 14} y="284" size={11} fill={MUTED} anchor="end">−X</M>
      <Curve pts={xl} stroke={PURP} width="2.6" className="ecam-draw" />
      <M x={x0 + w - 6} y="112" size={11.5} fill={PURP} anchor="end" weight={800}>
        XL = ωL
      </M>
      <Curve pts={xc} stroke={AMBER} width="2.6" className="ecam-draw ecam-delay-2" />
      <M x={x0 + w - 6} y="248" size={11.5} fill={AMBER} anchor="end" weight={800}>
        XC = 1/ωC
      </M>
      <Curve pts={sum} stroke={BLUE} width="3.4" className="ecam-draw ecam-delay-3" />
      <Dot cx={f0x.toFixed(1)} cy={mid} r="8" fill={BLUE} className="ecam-pulse" />
      <M x={(f0x + 82).toFixed(1)} y={mid - 34} size={11.5} fill={BLUE} weight={800}>
        net X = 0
      </M>

      <Wire d={`M${x0} ${base} L${x0 + w + 16} ${base}`} stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <L x={x0 + w} y={base + 34} size={12.5} fill={MUTED} weight={700} anchor="end">
        frequency
      </L>
      <Curve pts={zmag} stroke={TEAL} width="3.2" className="ecam-draw ecam-delay-4" />
      <Wire d={`M${x0} ${base - 30} L${x0 + w} ${base - 30}`} stroke={MUTED} width="1.6" dash="5 5" />
      <M x={x0 - 12} y={base - 26} size={11} fill={TEAL} anchor="end" weight={800}>
        R
      </M>
      <Dot cx={f0x.toFixed(1)} cy={base - 30} r="7" fill={TEAL} className="ecam-pop" />
      <M x={(f0x + 110).toFixed(1)} y={base - 44} size={11.5} fill={TEAL} weight={800}>
        |Z| = R at resonance
      </M>
      <Wire d={`M${f0x.toFixed(1)} 96 L${f0x.toFixed(1)} ${base}`} stroke={ROSE} width="1.8" dash="6 5" />
      <M x={(f0x - 14).toFixed(1)} y={base + 20} size={12} fill={ROSE} anchor="end" weight={800}>
        f₀
      </M>
    </Scene>
  )
}

export function ResonanceConditionScene() {
  const x0 = 470
  const w = 360
  return (
    <Scene caption="R does not move the peak — it only decides how sharp the peak is">
      {[
        ['condition', 'ωL = 1/(ωC)', BLUE],
        ['rearrange', 'ω² = 1/(LC)', TEAL],
        ['result', 'ω₀ = 1/√(LC)', GREEN],
      ].map(([tag, eq, tone], i) => (
        <g key={tag} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x="52" y={82 + i * 88} width="366" height="66" rx="12" fill={WHITE} stroke={tone} strokeWidth={i === 2 ? 3.2 : 2.2} />
          <M x="72" y={106 + i * 88} size={10.5} fill={tone} anchor="start" weight={800}>
            {tag}
          </M>
          <M x="235" y={132 + i * 88} size={16} fill={N} weight={800}>
            {eq}
          </M>
        </g>
      ))}
      <M x="235" y="382" size={13} fill={GREEN} weight={800}>
        f₀ = 1 / (2π√(LC))
      </M>
      <M x="235" y="410" size={11} fill={MUTED}>
        L and C set it; R appears nowhere
      </M>

      <Wire d={`M${x0} 400 L${x0 + w + 16} 400`} stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d={`M${x0} 400 L${x0} 96`} stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <L x={x0 + w} y="434" size={12} fill={MUTED} weight={700} anchor="end">
        frequency
      </L>
      {[
        [20, GREEN, 'R = 1 Ω'],
        [6, BLUE, 'R = 10 Ω'],
        [1.6, AMBER, 'R = 100 Ω'],
      ].map(([q, tone, lab], i) => (
        <g key={lab} className={`ecam-draw ecam-delay-${i}`}>
          <Curve pts={resonancePts(q, x0, w, 400, 250)} stroke={tone} width="2.8" />
          <M x={x0 + w - 6} y={130 + i * 24} size={11} fill={tone} anchor="end" weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <Wire d={`M${ratioX(1, x0, w).toFixed(1)} 112 L${ratioX(1, x0, w).toFixed(1)} 400`} stroke={ROSE} width="2" dash="6 5" className="ecam-emerge" />
      <M x={ratioX(1, x0, w).toFixed(1)} y="420" size={12} fill={ROSE} weight={800}>
        f₀
      </M>
      <M x={x0 + w / 2} y="74" size={11.5} fill={MUTED} weight={800}>
        same position, different sharpness
      </M>
    </Scene>
  )
}

export function VoltageMagnificationScene() {
  return (
    <Scene caption="At resonance the supply sees only R — but the coil and the capacitor do not">
      <Plane cx="300" cy="250" r="176" xLabel="" yLabel="" tone={MUTED} />
      <Phasor ox="300" oy="250" ang={0} len={120} label="I (reference)" tone={GREEN} className="ecam-draw" />
      <Phasor ox="300" oy="250" ang={0} len={54} label="" tone={BLUE} width="6" />
      <M x="352" y="278" size={11} fill={BLUE} weight={800}>
        VR
      </M>
      <Phasor ox="300" oy="250" ang={90} len={168} label="VL = Q·V" tone={PURP} className="ecam-draw ecam-delay-1" />
      <Phasor ox="300" oy="250" ang={-90} len={168} label="VC = Q·V" tone={AMBER} className="ecam-draw ecam-delay-2" />
      <g className="ecam-flux">
        <path d="M232 92 L222 92 M227 92 L227 408 M232 408 L222 408" stroke={ROSE} strokeWidth="2.2" fill="none" />
        <M x="214" y="254" size={11} fill={ROSE} anchor="end" weight={800}>
          equal
        </M>
      </g>
      <g className="ecam-collapse">
        <Wire d="M380 128 L380 236" stroke={ROSE} width="2.4" dash="5 4" marker="url(#ecaArrRo)" />
        <Wire d="M380 372 L380 264" stroke={ROSE} width="2.4" dash="5 4" marker="url(#ecaArrRo)" />
      </g>
      <M x="396" y="254" size={10.5} fill={ROSE} anchor="start" weight={800}>
        cancel at the origin
      </M>

      <g className="ecam-slide-in ecam-delay-3">
        <rect x="546" y="112" width="300" height="180" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.6" />
        <L x="696" y="142" size={13} fill={RED}>
          ⚠ the number that bites
        </L>
        <M x="696" y="184" size={12.5} fill={N}>
          Q = 20, supply 230 V
        </M>
        <M x="696" y="222" size={17} fill={RED} weight={800}>
          VL = VC = 4600 V
        </M>
        <M x="696" y="258" size={11} fill={MUTED}>
          rated for 230 V, exposed to 4.6 kV
        </M>
      </g>
      <Card
        x="546"
        y="312"
        w="300"
        h="112"
        title="what the supply sees"
        accent={GREEN}
        mono
        lines={['VL + VC = 0', 'V = VR = I·R']}
        linesY={58}
        lineH={26}
        className="ecam-slide-in ecam-delay-4"
      />
    </Scene>
  )
}

export function HalfPowerBandwidthScene() {
  const x0 = 110
  const w = 540
  const base = 386
  const h = 260
  const q = 8
  // Half-power points of the normalised curve: r − 1/r = ±1/Q.
  const rHi = (1 / q + Math.sqrt(1 / (q * q) + 4)) / 2
  const rLo = (-1 / q + Math.sqrt(1 / (q * q) + 4)) / 2
  const x1 = ratioX(rLo, x0, w)
  const x2 = ratioX(rHi, x0, w)
  return (
    <Scene caption="Bandwidth is measured where the power has halved, not where the current has">
      <Wire d={`M${x0} ${base} L${x0 + w + 16} ${base}`} stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d={`M${x0} ${base} L${x0} ${base - h - 20}`} stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <L x={x0 + w} y={base + 34} size={12} fill={MUTED} weight={700} anchor="end">
        frequency
      </L>
      <L x={x0 - 10} y={base - h - 28} size={12} fill={MUTED} weight={700} anchor="end">
        current
      </L>
      <Curve pts={resonancePts(q, x0, w, base, h)} stroke={BLUE} width="3.2" className="ecam-draw" />
      <Wire d={`M${x0} ${base - h * 0.707} L${x0 + w} ${base - h * 0.707}`} stroke={ROSE} width="2" dash="7 5" className="ecam-sweep-x" />
      <M x={x0 + w - 6} y={base - h * 0.707 - 10} size={11} fill={ROSE} anchor="end" weight={800}>
        0.707 × peak → power halved
      </M>
      {[[x1, 'f₁'], [x2, 'f₂']].map(([x, lab], i) => (
        <g key={lab} className={`ecam-cell-in ecam-delay-${i}`}>
          <Wire d={`M${x.toFixed(1)} ${base - h * 0.707} L${x.toFixed(1)} ${base}`} stroke={ROSE} width="1.8" dash="5 4" />
          <Dot cx={x.toFixed(1)} cy={base - h * 0.707} r="6" fill={ROSE} />
          <M x={x.toFixed(1)} y={base + 20} size={12} fill={ROSE} weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <g className="ecam-emerge">
        <path
          d={`M${x1.toFixed(1)} ${base + 40} L${x1.toFixed(1)} ${base + 50} M${x1.toFixed(1)} ${base + 45} L${x2.toFixed(1)} ${base + 45} M${x2.toFixed(1)} ${base + 40} L${x2.toFixed(1)} ${base + 50}`}
          stroke={GREEN}
          strokeWidth="2.4"
          fill="none"
        />
        <M x={((x1 + x2) / 2).toFixed(1)} y={base + 70} size={12.5} fill={GREEN} weight={800}>
          BW = f₂ − f₁
        </M>
      </g>
      <M x={ratioX(1, x0, w).toFixed(1)} y={base - h - 8} size={11.5} fill={BLUE} weight={800}>
        f₀
      </M>
      <M x={x1.toFixed(1)} y={base - h * 0.707 - 16} size={10} fill={MUTED} anchor="end">
        |net X| = R here
      </M>

      <g className="ecam-slide-in ecam-delay-4">
        <rect x="686" y="120" width="168" height="196" rx="12" fill={WHITE} stroke={AMBER} strokeWidth="2.3" />
        <M x="770" y="146" size={11} fill={AMBER} weight={800}>
          which mean is f₀?
        </M>
        <Wire d="M706 216 L838 216" stroke={MUTED} width="2" />
        <Dot cx="756" cy="216" r="7" fill={GREEN} />
        <M x="756" y="198" size={10} fill={GREEN} weight={800}>
          √(f₁f₂)
        </M>
        <Dot cx="792" cy="216" r="7" fill={RED} />
        <M x="800" y="244" size={10} fill={RED} anchor="start" weight={800}>
          (f₁+f₂)/2
        </M>
        <M x="770" y="280" size={10.5} fill={MUTED}>
          geometric is exact;
        </M>
        <M x="770" y="298" size={10.5} fill={MUTED}>
          arithmetic only at high Q
        </M>
      </g>
    </Scene>
  )
}

export function QThreeMeaningsScene() {
  return (
    <Scene caption="Three definitions, one number — and each one is the answer to a different exam question">
      <g className="ecam-emerge">
        <circle cx="450" cy="118" r="38" fill={BLUE} />
        <L x="450" y="128" size={26} fill={WHITE}>
          Q
        </L>
      </g>
      {[
        ['energy', 'stored ÷ lost', TEAL, 116],
        ['magnification', 'VL = Q·V', PURP, 450],
        ['sharpness', 'Q = ω₀/BW', AMBER, 784],
      ].map(([title, sub, tone, cx], i) => (
        <g key={title} className={`ecam-slide-in ecam-delay-${i}`}>
          <Wire d={`M450 156 L${cx} 196`} stroke={MUTED} width="2" dash="6 5" opacity="0.6" />
          <rect x={cx - 128} y="200" width="256" height="150" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={cx - 128} y="200" width="256" height="28" rx="12" fill={tone} />
          <L x={cx} y="220" size={11.5} fill={WHITE}>
            {title}
          </L>
          <M x={cx} y="252" size={12.5} fill={N} weight={800}>
            {sub}
          </M>
          {i === 0 ? (
            <g>
              <rect x={cx - 52} y="272" width="104" height="52" rx="8" fill={TEAL} fillOpacity="0.2" stroke={TEAL} strokeWidth="2" />
              <Wire d={`M${cx + 52} 298 L${cx + 92} 298`} stroke={RED} width="2.4" marker="url(#ecaArrR)" className="ecam-current" />
              <M x={cx} y="342" size={10} fill={MUTED}>
                2π × stored / lost per cycle
              </M>
            </g>
          ) : null}
          {i === 1 ? (
            <g>
              <Phasor ox={cx} oy="316" ang={90} len={40} label="" tone={PURP} />
              <Phasor ox={cx} oy="316" ang={0} len={30} label="" tone={GREEN} />
              <M x={cx + 58} y="318" size={10} fill={MUTED} anchor="start">
                long VL, short V
              </M>
            </g>
          ) : null}
          {i === 2 ? (
            <g>
              <Curve pts={resonancePts(24, cx - 100, 200, 340, 58)} stroke={GREEN} width="2.4" />
              <Curve pts={resonancePts(3, cx - 100, 200, 340, 58)} stroke={RED} width="2.4" />
              <M x={cx - 70} y="286" size={10} fill={GREEN} weight={800}>
                Q = 50
              </M>
              <M x={cx + 74} y="286" size={10} fill={RED} weight={800}>
                Q = 5
              </M>
            </g>
          ) : null}
        </g>
      ))}
      <g className="ecam-cell-in ecam-delay-4">
        {['Q = ω₀L / R', 'Q = 1 / (ω₀CR)', 'Q = (1/R)√(L/C)'].map((f, i) => (
          <g key={f}>
            <rect x={56 + i * 266} y="382" width="246" height="46" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2" />
            <M x={179 + i * 266} y="411" size={13} fill={BLUE} weight={800}>
              {f}
            </M>
          </g>
        ))}
      </g>
      <M x="450" y="450" size={11} fill={MUTED} weight={800}>
        all three are the same number for a series circuit
      </M>
    </Scene>
  )
}

export function LcKnobsScene() {
  return (
    <Scene caption="The product moves the peak; the ratio sharpens it">
      {[
        ['L × C', 'sets ω₀ = 1/√(LC)', BLUE, 'slides'],
        ['L / C', 'sets Q = (1/R)√(L/C)', AMBER, 'narrows'],
      ].map(([knob, note, tone, effect], i) => (
        <g key={knob} className={`ecam-cell-in ecam-delay-${i}`}>
          <circle cx={136} cy={140 + i * 190} r="52" fill={WHITE} stroke={tone} strokeWidth="3" />
          <g className="ecam-needle" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
            <Wire d={`M136 ${140 + i * 190} L${136 + 36} ${140 + i * 190 - 30}`} stroke={tone} width="3.4" />
          </g>
          <Dot cx="136" cy={140 + i * 190} r="6" fill={tone} />
          <M x="136" y={212 + i * 190} size={13} fill={tone} weight={800}>
            {knob}
          </M>
          <M x="136" y={232 + i * 190} size={10.5} fill={MUTED}>
            {note}
          </M>
          <Wire d={`M200 ${150 + i * 190} L266 ${150 + i * 190}`} stroke={tone} width="2.6" marker={`url(#${markerFor(tone)})`} className="ecam-flow-arrow" />
          <M x={233} y={138 + i * 190} size={10} fill={tone} weight={800}>
            {effect}
          </M>
        </g>
      ))}

      <Wire d="M300 226 L836 226" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Curve pts={resonancePts(9, 300, 460, 226, 150)} stroke={BLUE} width="3" className="ecam-draw" />
      <Curve pts={resonancePts(9, 360, 460, 226, 150)} stroke={BLUE} width="2.2" dash="6 5" opacity="0.5" />
      <M x="640" y="66" size={11} fill={BLUE} weight={800}>
        product changed → the whole curve slid right
      </M>

      <Wire d="M300 416 L836 416" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Curve pts={resonancePts(4, 300, 460, 416, 150)} stroke={AMBER} width="2.4" dash="6 5" opacity="0.6" />
      <Curve pts={resonancePts(26, 300, 460, 416, 150)} stroke={AMBER} width="3.2" className="ecam-draw ecam-delay-2" />
      <M x={ratioX(1, 300, 460).toFixed(1)} y="436" size={11.5} fill={ROSE} weight={800}>
        ω₀ unmoved
      </M>
      <M x="700" y="300" size={11} fill={AMBER} weight={800}>
        ratio changed → same peak, Q 5 → 50
      </M>

      <g className="ecam-emerge">
        <rect x="620" y="250" width="226" height="38" rx="9" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.3" />
        <M x="733" y="274" size={13} fill={GREEN} weight={800}>
          BW = ω₀ / Q
        </M>
      </g>
    </Scene>
  )
}

export function ParallelResonanceDualityScene() {
  const rows = [
    ['ωL = 1/ωC', 'same condition'],
    ['|Z| minimum = R', '|Z| maximum → ∞'],
    ['driven by a voltage', 'driven by a current'],
    ['voltage magnified', 'current magnified'],
    ['Q = ω₀L/R', 'Q = R/(ω₀L)'],
  ]
  return (
    <Scene caption="Turn every series statement into its dual and you have the tank circuit">
      <MapTable x="56" y="46" w="788" rows={rows} leftTitle="series resonance" rightTitle="parallel resonance" leftTone={BLUE} rightTone={TEAL} arrowLabel="dual" rowH={36} />
      <Src cx="240" cy="352" kind="i" label="small supply I" tone={GREEN} r="20" />
      <Wire d="M240 332 L240 292 L660 292 M240 372 L240 412 L660 412" stroke={N} width="2.4" />
      <Ind x="440" y="292" len="80" label="L" tone={PURP} />
      <Cap x="660" y="352" len="120" orient="v" label="C" tone={AMBER} />
      <Wire d="M440 292 L560 292 M660 292 L660 322 M660 382 L660 412" stroke={N} width="2.4" />
      <Wire d="M440 412 L660 412" stroke={N} width="2.4" />
      <Wire d="M400 292 L440 292" stroke={N} width="2.4" />
      <Wire
        d="M470 314 L638 314 L638 390 L470 390 L470 336"
        stroke={ROSE}
        width="2.6"
        marker="url(#ecaArrRo)"
        className="ecam-draw"
      />
      <M x="554" y="440" size={12} fill={ROSE} weight={800}>
        large circulating current
      </M>
      <M x="240" y="442" size={11} fill={GREEN} weight={800}>
        the supply only makes up the losses
      </M>
    </Scene>
  )
}

export function PracticalTankShiftScene() {
  const x0 = 330
  const w = 300
  return (
    <Scene caption="Coil resistance moves the peak down in frequency and caps the impedance">
      <Src cx="86" cy="230" kind="i" tone={GREEN} r="18" />
      <Wire d="M86 212 L86 140 L280 140 M86 248 L86 330 L280 330" stroke={N} width="2.4" />
      <Res x="150" y="140" len="62" label="R" tone={AMBER} />
      <Ind x="230" y="140" len="62" label="L" tone={PURP} />
      <Wire d="M181 140 L199 140" stroke={N} width="2.4" />
      <Cap x="280" y="230" len="110" orient="v" label="C" tone={TEAL} />
      <Wire d="M280 140 L280 175 M280 285 L280 330" stroke={N} width="2.4" />
      <M x="180" y="108" size={10.5} fill={AMBER} weight={800}>
        coil resistance
      </M>

      <Wire d={`M${x0} 340 L${x0 + w + 20} 340`} stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Curve pts={resonancePts(14, x0, w, 340, 220)} stroke={MUTED} width="2.4" dash="6 5" />
      <M x={ratioX(1, x0, w).toFixed(1)} y="102" size={10.5} fill={MUTED} weight={800}>
        ideal 1/√(LC)
      </M>
      <Curve pts={resonancePts(9, x0 - 42, w, 340, 176)} stroke={TEAL} width="3.2" className="ecam-draw ecam-delay-2" />
      <g className="ecam-emerge">
        <path
          d={`M${(ratioX(1, x0 - 42, w)).toFixed(1)} 356 L${(ratioX(1, x0 - 42, w)).toFixed(1)} 366 M${(ratioX(1, x0 - 42, w)).toFixed(1)} 361 L${ratioX(1, x0, w).toFixed(1)} 361 M${ratioX(1, x0, w).toFixed(1)} 356 L${ratioX(1, x0, w).toFixed(1)} 366`}
          stroke={ROSE}
          strokeWidth="2.4"
          fill="none"
        />
        <M x={((ratioX(1, x0 - 42, w) + ratioX(1, x0, w)) / 2).toFixed(1)} y="384" size={11} fill={ROSE} weight={800}>
          shift due to R
        </M>
      </g>

      <Card
        x="640"
        y="96"
        w="216"
        h="196"
        title="what R changes"
        accent={TEAL}
        mono
        lines={['ω₀ = √(1/LC − R²/L²)', '', 'Zd = L / (CR)']}
        linesY={60}
        lineH={26}
        className="ecam-slide-in ecam-delay-3"
      />
      <g className="ecam-pulse">
        <rect x="640" y="310" width="216" height="72" rx="12" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2.6" />
        <M x="748" y="338" size={11.5} fill={RED} weight={800}>
          no resonance at all
        </M>
        <M x="748" y="362" size={12.5} fill={RED} weight={800}>
          if R &gt; √(L/C)
        </M>
      </g>
    </Scene>
  )
}

export function InitialFinalSandwichScene() {
  return (
    <Scene caption="Three numbers and one exponential — no differential equation required">
      <Wire d="M320 400 L830 400" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M320 400 L320 110" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <L x="820" y="434" size={12} fill={MUTED} weight={700} anchor="end">
        time
      </L>
      <Wire d="M320 160 L800 160" stroke={GREEN} width="2" dash="7 5" className="ecam-sweep-x" />
      <M x="800" y="148" size={11.5} fill={GREEN} anchor="end" weight={800}>
        final condition x(∞)
      </M>
      <Dot cx="320" cy="340" r="8" fill={ROSE} className="ecam-pop" />
      <M x="336" y="352" size={11.5} fill={ROSE} anchor="start" weight={800}>
        initial condition x(0⁺)
      </M>
      <Curve pts={(() => {
        const p = []
        for (let i = 0; i <= 80; i += 1) {
          const t = i / 80
          p.push([320 + t * 480, 340 - 180 * (1 - Math.exp(-4.2 * t))])
        }
        return p
      })()} stroke={BLUE} width="3.4" className="ecam-draw ecam-delay-2" />

      <Card
        x="320"
        y="410"
        w="510"
        h="62"
        title="the universal formula"
        accent={BLUE}
        mono
        lines={['x(t) = x(∞) + [x(0⁺) − x(∞)]·e^(−t/τ)']}
        linesY={50}
        className="ecam-emerge"
      />

      {[
        ['initial value', 'x(0⁺)', ROSE],
        ['final value', 'x(∞)', GREEN],
        ['time constant', 'τ', PURP],
      ].map(([lab, sym, tone], i) => (
        <g key={lab} className={`ecam-slide-in ecam-delay-${i}`}>
          <rect x="56" y={110 + i * 86} width="200" height="68" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="156" y={140 + i * 86} size={11.5} fill={tone} weight={800}>
            {lab}
          </M>
          <M x="156" y={166 + i * 86} size={15} fill={N} weight={800}>
            {sym}
          </M>
        </g>
      ))}
      <Wire d="M268 230 L306 230" stroke={BLUE} width="3" marker="url(#ecaArrB)" className="ecam-flow-arrow" />
      <M x="156" y="392" size={11.5} fill={BLUE} weight={800}>
        complete answer,
      </M>
      <M x="156" y="412" size={11.5} fill={BLUE} weight={800}>
        no calculus
      </M>
    </Scene>
  )
}

export function ElementEquivalentsScene() {
  const rows = [
    ['Resistor', 'R', 'R', 'R', BLUE],
    ['Inductor', 'open circuit', 'open ∥ I₀ source', 'short circuit', PURP],
    ['Capacitor', 'short circuit', 'short + V₀ source', 'open circuit', AMBER],
  ]
  return (
    <Scene caption="Memorise this table and half of every transient question is already answered">
      <rect x="56" y="70" width="788" height="34" rx="9" fill={N} />
      <M x="150" y="93" size={11.5} fill={WHITE} weight={800}>
        element
      </M>
      <M x="380" y="93" size={11.5} fill={WHITE} weight={800}>
        t = 0⁺, relaxed
      </M>
      <M x="580" y="93" size={11.5} fill={WHITE} weight={800}>
        t = 0⁺, with initial value
      </M>
      <M x="784" y="93" size={11.5} fill={WHITE} weight={800}>
        t = ∞ (DC)
      </M>
      {rows.map(([name, a, b, c, tone], i) => (
        <g key={name} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x="56" y={114 + i * 76} width="788" height="66" rx="10" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <L x="150" y={154 + i * 76} size={13.5} fill={tone}>
            {name}
          </L>
          <M x="380" y={154 + i * 76} size={12} fill={N}>
            {a}
          </M>
          <M x="580" y={154 + i * 76} size={12} fill={N}>
            {b}
          </M>
          <M x="784" y={154 + i * 76} size={12} fill={N}>
            {c}
          </M>
        </g>
      ))}
      {[
        'an infinite dv/dt across C would need infinite current',
        'an infinite di/dt through L would need infinite voltage',
      ].map((t, i) => (
        <g key={t} className={`ecam-slide-in ecam-delay-${i + 3}`}>
          <rect x={80 + i * 400} y="358" width="376" height="58" rx="11" fill={SKY} stroke={TEAL} strokeWidth="2.2" />
          <foreignObject x={94 + i * 400} y="368" width="348" height="40">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 12px/1.3 system-ui,sans-serif', color: '#0f766e', display: 'flex', alignItems: 'center', height: '100%' }}>
              {t}
            </div>
          </foreignObject>
        </g>
      ))}
      <M x="450" y="444" size={11} fill={MUTED} weight={800}>
        which is why iL and vC are the two quantities that cannot jump
      </M>
    </Scene>
  )
}

export function ThreeCircuitProcedureScene() {
  return (
    <Scene caption="Draw three circuits, not one — the middle one is where the carried values land">
      {[
        ['t = 0⁻', 'old switch position', BLUE],
        ['t = 0⁺', 'carried values attached', AMBER],
        ['t = ∞', 'new steady state', GREEN],
      ].map(([title, sub, tone], i) => (
        <g key={title} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x={40 + i * 284} y="64" width="252" height="250" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.4" />
          <rect x={40 + i * 284} y="64" width="252" height="30" rx="12" fill={tone} />
          <L x={166 + i * 284} y="85" size={12.5} fill={WHITE}>
            {title}
          </L>
          <Src cx={84 + i * 284} cy="196" kind="v" tone={MUTED} r="16" />
          <Wire d={`M${84 + i * 284} 180 L${84 + i * 284} 136 L${248 + i * 284} 136`} stroke={N} width="2.2" />
          <Wire d={`M${84 + i * 284} 212 L${84 + i * 284} 262 L${248 + i * 284} 262`} stroke={N} width="2.2" />
          <Res x={166 + i * 284} y="136" len="66" tone={N} />
          {i === 0 ? (
            <g>
              <Wire d={`M${248 + i * 284} 136 L${248 + i * 284} 262`} stroke={PURP} width="3" />
              <M x={248 + i * 284} y="192" size={10} fill={PURP} anchor="start">
                L = short
              </M>
              <circle cx={248 + i * 284} cy="199" r="18" fill="none" stroke={ROSE} strokeWidth="2.2" className="ecam-pulse" />
            </g>
          ) : null}
          {i === 1 ? (
            <g>
              <Src cx={248 + i * 284} cy="199" kind="i" tone={AMBER} r="20" />
              <Wire d={`M${248 + i * 284} 136 L${248 + i * 284} 179 M${248 + i * 284} 219 L${248 + i * 284} 262`} stroke={N} width="2.2" />
              <M x={272 + i * 284} y="203" size={10} fill={AMBER} anchor="start" weight={800}>
                iL(0⁺)
              </M>
            </g>
          ) : null}
          {i === 2 ? (
            <g>
              <Wire d={`M${248 + i * 284} 136 L${248 + i * 284} 262`} stroke={GREEN} width="3" />
              <M x={224 + i * 284} y="192" size={10} fill={GREEN} anchor="end">
                short again
              </M>
            </g>
          ) : null}
          <M x={166 + i * 284} y="296" size={10.5} fill={MUTED}>
            {sub}
          </M>
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={i} className={`ecam-flow-arrow ecam-delay-${i}`}>
          <Wire d={`M${296 + i * 284} 188 L${328 + i * 284} 188`} stroke={ROSE} width="3" marker="url(#ecaArrRo)" />
        </g>
      ))}
      <g className="ecam-emerge">
        <rect x="150" y="344" width="600" height="60" rx="12" fill={ROSE} fillOpacity="0.1" stroke={ROSE} strokeWidth="2.6" />
        <L x="450" y="372" size={13} fill={ROSE}>
          continuity: iL and vC carry across the switching instant
        </L>
        <M x="450" y="392" size={11} fill={MUTED}>
          everything else in the circuit is free to jump
        </M>
      </g>
    </Scene>
  )
}

export function ParallelInitialConditionsScene() {
  return (
    <Scene caption="The dual procedure: at 0⁺ the capacitor fixes the node voltage and the inductor fixes the current">
      <Src cx="86" cy="180" kind="i" label="Is" tone={GREEN} r="18" />
      <Wire d="M86 162 L86 110 L420 110 M86 198 L86 260 L420 260" stroke={N} width="2.4" />
      <Dot cx="200" cy="110" r="7" fill={BLUE} />
      <M x="200" y="92" size={11.5} fill={BLUE} weight={800}>
        node
      </M>
      <Res x="200" y="185" len="60" orient="v" label="R" tone={N} />
      <Ind x="310" y="185" len="60" orient="v" label="L" tone={PURP} />
      <Cap x="420" y="185" len="60" orient="v" label="C" tone={AMBER} />
      <Wire d="M200 110 L200 155 M200 215 L200 260 M310 110 L310 155 M310 215 L310 260 M420 110 L420 155 M420 215 L420 260" stroke={N} width="2.4" />
      <Gnd x="310" y="260" tone={N} />

      {[
        ['t = 0⁻', 'L short, C open', BLUE],
        ['t = 0⁺', 'L → I source, C → V source', AMBER],
        ['t = ∞', 'L short, C open again', GREEN],
      ].map(([title, sub, tone], i) => (
        <g key={title} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x="520" y={64 + i * 86} width="328" height="72" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="548" y={92 + i * 86} size={12} fill={tone} anchor="start" weight={800}>
            {title}
          </M>
          <M x="548" y={116 + i * 86} size={11.5} fill={N} anchor="start">
            {sub}
          </M>
          {i === 1 ? (
            <g>
              <Src cx="770" cy={100 + i * 86} kind="i" tone={AMBER} r="16" />
              <Src cx="816" cy={100 + i * 86} kind="v" tone={AMBER} r="16" />
            </g>
          ) : null}
        </g>
      ))}

      <g className="ecam-emerge">
        <rect x="56" y="326" width="470" height="56" rx="12" fill={SKY} stroke={AMBER} strokeWidth="2.4" />
        <L x="291" y="352" size={12.5} fill={AMBER}>
          the node voltage at 0⁺ is fixed by the capacitor
        </L>
        <M x="291" y="372" size={10.5} fill={MUTED}>
          so every branch current at 0⁺ follows from it
        </M>
      </g>
      <g className="ecam-pulse">
        <rect x="560" y="326" width="284" height="56" rx="12" fill={TEAL} fillOpacity="0.12" stroke={TEAL} strokeWidth="2.4" />
        <M x="702" y="350" size={11} fill={TEAL} weight={800}>
          dual of the series procedure
        </M>
        <M x="702" y="370" size={10.5} fill={MUTED}>
          node voltages replace loop currents
        </M>
      </g>
      <M x="450" y="428" size={11} fill={MUTED} weight={800}>
        same three drawings, same continuity rule, different unknowns
      </M>
    </Scene>
  )
}

export function RlRiseSpikeScene() {
  return (
    <Scene caption="The dangerous instant is not switch-on, it is switch-off">
      <Wire d="M76 260 L430 260" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M76 260 L76 90" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <M x="66" y="82" size={11} fill={MUTED} anchor="end" weight={800}>
        i
      </M>
      <Wire d="M76 110 L410 110" stroke={GREEN} width="2" dash="7 5" />
      <M x="404" y="100" size={11} fill={GREEN} anchor="end" weight={800}>
        V/R
      </M>
      <Wire d={RisePath(76, 260, 330, 150, 5)} stroke={BLUE} width="3.2" className="ecam-draw" />
      <Dot cx="142" cy="165" r="6" fill={ROSE} />
      <M x="150" y="186" size={10.5} fill={ROSE} anchor="start" weight={800}>
        τ · 63.2%
      </M>
      <Dot cx="406" cy="111" r="6" fill={ROSE} />
      <M x="398" y="132" size={10.5} fill={ROSE} anchor="end" weight={800}>
        5τ · 99.3%
      </M>

      <Wire d="M480 240 L840 240" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M480 300 L480 90" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <M x="470" y="82" size={11} fill={MUTED} anchor="end" weight={800}>
        vL
      </M>
      <Curve
        pts={(() => {
          const p = []
          for (let i = 0; i <= 60; i += 1) {
            const t = i / 60
            p.push([480 + t * 230, 240 - 130 * Math.exp(-5 * t)])
          }
          return p
        })()}
        stroke={PURP}
        width="3"
        className="ecam-draw ecam-delay-2"
      />
      <Wire d="M740 240 L740 100" stroke={MUTED} width="1.8" dash="5 4" />
      <M x="740" y="92" size={10.5} fill={MUTED} weight={800}>
        switch opens
      </M>
      <g className="ecam-pulse">
        <Wire d="M740 240 L748 420" stroke={RED} width="3.6" />
        <M x="800" y="404" size={11} fill={RED} anchor="end" weight={800}>
          −L·di/dt, off the scale
        </M>
      </g>

      <g className="ecam-slide-in ecam-delay-4">
        <rect x="120" y="330" width="420" height="106" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <L x="330" y="356" size={12.5} fill={GREEN}>
          ✓ the fix: a freewheeling diode across the coil
        </L>
        <Ind x="260" y="402" len="76" label="L" tone={PURP} />
        <Wire d="M222 402 L200 402 L200 372 L400 372 L400 402 L298 402" stroke={N} width="2.2" />
        <path d="M368 392 L368 412 L388 402 Z" fill={GREEN} stroke={GREEN} strokeWidth="2" />
        <Wire d="M388 392 L388 412" stroke={GREEN} width="2.6" />
        <M x="378" y="430" size={10} fill={GREEN} weight={800}>
          gives iL somewhere to go
        </M>
      </g>
    </Scene>
  )
}

export function RcChargeInrushScene() {
  return (
    <Scene caption="Charging is slow and safe; connecting a charged capacitor to a small resistance is not">
      <Wire d="M76 250 L410 250" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M76 250 L76 86" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <M x="66" y="80" size={11} fill={MUTED} anchor="end" weight={800}>
        vC
      </M>
      <Wire d="M76 108 L392 108" stroke={GREEN} width="2" dash="7 5" />
      <M x="386" y="98" size={11} fill={GREEN} anchor="end" weight={800}>
        V
      </M>
      <Wire d={RisePath(76, 250, 312, 142, 5)} stroke={TEAL} width="3.2" className="ecam-draw" />
      <Dot cx="138" cy="160" r="6" fill={ROSE} />
      <M x="146" y="180" size={10.5} fill={ROSE} anchor="start" weight={800}>
        τ · 63.2%
      </M>
      <Dot cx="388" cy="109" r="6" fill={ROSE} />
      <M x="380" y="130" size={10.5} fill={ROSE} anchor="end" weight={800}>
        5τ · 99.3%
      </M>

      <Wire d="M480 250 L830 250" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M480 250 L480 86" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <M x="470" y="80" size={11} fill={MUTED} anchor="end" weight={800}>
        i
      </M>
      <Curve
        pts={(() => {
          const p = []
          for (let i = 0; i <= 60; i += 1) {
            const t = i / 60
            p.push([480 + t * 320, 250 - 142 * Math.exp(-5 * t)])
          }
          return p
        })()}
        stroke={BLUE}
        width="3.2"
        className="ecam-draw ecam-delay-2"
      />
      <M x="520" y="98" size={11} fill={BLUE} anchor="start" weight={800}>
        starts at V/R
      </M>

      <rect x="56" y="292" width="392" height="150" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.4" />
      <L x="252" y="316" size={12.5} fill={RED}>
        a charged C onto a small R
      </L>
      <Cap x="130" y="382" len="70" orient="v" label="V₀" tone={AMBER} />
      <Wire d="M130 348 L130 340 L240 340 M130 416 L130 424 L240 424" stroke={N} width="2.2" />
      <Res x="240" y="382" len="70" orient="v" label="R small" tone={RED} />
      <Wire d="M240 340 L240 348 M240 416 L240 424" stroke={N} width="2.2" />
      <g className="ecam-pulse">
        <Wire d="M330 424 L330 334" stroke={RED} width="2.8" marker="url(#ecaArrR)" />
        <M x="392" y="376" size={11} fill={RED} weight={800}>
          inrush = V₀ / R
        </M>
      </g>

      <g className="ecam-slide-in ecam-delay-4">
        <rect x="480" y="292" width="364" height="150" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <L x="662" y="316" size={12.5} fill={GREEN}>
          ✓ the fix: a series inrush limiter
        </L>
        <Res x="600" y="382" len="88" label="R limit" tone={GREEN} />
        <Cap x="740" y="382" len="70" orient="v" label="C" tone={AMBER} />
        <Wire d="M556 382 L520 382 M644 382 L740 382 M740 348 L740 382 M740 416 L740 430 L520 430 L520 382" stroke={N} width="2.2" />
      </g>
    </Scene>
  )
}

export function TauGeometryScene() {
  return (
    <Scene caption="τ is a property of the circuit — the tangent at the origin finds it every time">
      <Wire d="M100 400 L800 400" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M100 400 L100 96" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <L x="790" y="434" size={12} fill={MUTED} weight={700} anchor="end">
        time
      </L>
      <Wire d="M100 130 L780 130" stroke={GREEN} width="2" dash="7 5" />
      <M x="772" y="120" size={11} fill={GREEN} anchor="end" weight={800}>
        final value
      </M>
      <Wire d={RisePath(100, 400, 660, 270, 5)} stroke={BLUE} width="3.4" className="ecam-draw" />
      {/* Tangent at the origin: slope = final/τ, so it meets the asymptote
          exactly at t = τ. That intersection is the construction. */}
      <Wire d="M100 400 L232 130" stroke={ROSE} width="2.4" dash="6 5" className="ecam-draw ecam-delay-2" />
      <Dot cx="232" cy="130" r="7" fill={ROSE} className="ecam-pop" />
      <Wire d="M232 130 L232 400" stroke={ROSE} width="1.8" dash="5 4" />
      <M x="232" y="422" size={13} fill={ROSE} weight={800}>
        τ
      </M>
      <M x="300" y="180" size={11} fill={ROSE} anchor="start" weight={800}>
        the tangent construction defines it
      </M>
      {[
        [1, '63.2%'],
        [2, '86.5%'],
        [3, '95.0%'],
        [4, '98.2%'],
        [5, '99.3%'],
      ].map(([k, pc], i) => {
        const x = 100 + k * 132
        const y = 400 - 270 * (1 - Math.exp(-k))
        return (
          <g key={pc} className={`ecam-cell-in ecam-delay-${i % 5}`}>
            <Dot cx={x} cy={y.toFixed(1)} r="6" fill={BLUE} />
            <M x={x} y={(y - 14).toFixed(1)} size={10.5} fill={BLUE} weight={800}>
              {pc}
            </M>
            <M x={x} y="422" size={10.5} fill={MUTED}>
              {`${k}τ`}
            </M>
          </g>
        )
      })}
      <Card
        x="560"
        y="270"
        w="280"
        h="104"
        title="τ belongs to the circuit"
        accent={PURP}
        lines={['scale the source and the curve', 'scales — τ does not move']}
        linesY={58}
        lineH={22}
        className="ecam-slide-in ecam-delay-4"
      />
    </Scene>
  )
}

export function TransientWorksheetScene() {
  const panels = [
    ['1 · t = 0⁻', 'read iL, vC', BLUE, 44, 60],
    ['2 · continuity', 'carry them across', ROSE, 44, 178],
    ['3 · t = 0⁺', 'jumped values highlighted', AMBER, 44, 296],
    ['4 · t = ∞', 'new steady state', GREEN, 660, 60],
    ['5 · τ', 'from Rth seen by L or C', PURP, 660, 178],
  ]
  return (
    <Scene caption="Five panels, one curve — and the energy account has to balance at the end">
      {panels.map(([title, sub, tone, x, y], i) => (
        <g key={title} className={`ecam-cell-in ecam-delay-${i % 5}`}>
          <rect x={x} y={y} width="196" height="102" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={x} y={y} width="196" height="26" rx="11" fill={tone} />
          <M x={x + 98} y={y + 18} size={10.5} fill={WHITE} weight={800}>
            {title}
          </M>
          <foreignObject x={x + 12} y={y + 34} width="172" height="58">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11.5px/1.3 system-ui,sans-serif', color: '#152430', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              {sub}
            </div>
          </foreignObject>
          <Wire
            d={`M${x < 400 ? x + 196 : x} ${y + 52} L${x < 400 ? 274 : 632} ${y + 52}`}
            stroke={tone}
            width="2.2"
            dash="6 5"
            marker={`url(#${markerFor(tone)})`}
            className="ecam-flow-arrow"
          />
        </g>
      ))}

      <Wire d="M288 366 L622 366" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M288 366 L288 92" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M288 120 L610 120" stroke={GREEN} width="1.8" dash="6 5" />
      <M x="604" y="112" size={10} fill={GREEN} anchor="end" weight={800}>
        x(∞)
      </M>
      <Dot cx="288" cy="300" r="6" fill={ROSE} />
      <M x="298" y="316" size={10} fill={ROSE} anchor="start" weight={800}>
        x(0⁺)
      </M>
      <Wire d={RisePath(288, 300, 320, 180, 4.6)} stroke={BLUE} width="3.2" className="ecam-draw ecam-delay-3" />
      <Dot cx="358" cy="185" r="6" fill={PURP} className="ecam-pop" />
      <M x="368" y="196" size={10} fill={PURP} anchor="start" weight={800}>
        one τ
      </M>

      <g className="ecam-slide-in ecam-delay-4">
        <rect x="288" y="398" width="334" height="48" rx="10" fill={SKY} stroke={TEAL} strokeWidth="2.2" />
        <M x="340" y="428" size={10.5} fill={TEAL} weight={800}>
          stored 0 J
        </M>
        <M x="452" y="428" size={10.5} fill={TEAL} weight={800}>
          → 0.9 J
        </M>
        <M x="570" y="428" size={10.5} fill={RED} weight={800}>
          0.9 J lost in R
        </M>
      </g>
    </Scene>
  )
}

/* ── Module 4 — the Laplace method ──────────────────────────────── */

export function PhasorVsLaplaceScene() {
  return (
    <Scene caption="Phasors know one line of the plane; Laplace knows the whole plane">
      <rect x="70" y="72" width="460" height="336" rx="12" fill={BLUE} fillOpacity="0.05" />
      <Plane cx="300" cy="240" r="164" xLabel="σ" yLabel="jω" />
      <g className="ecam-pulse">
        <Wire d="M300 82 L300 398" stroke={GREEN} width="7" opacity="0.35" />
      </g>
      <M x="300" y="66" size={11} fill={GREEN} weight={800}>
        s = jω
      </M>
      <M x="300" y="424" size={10.5} fill={GREEN} weight={800}>
        phasors live on this line only
      </M>
      <M x="128" y="102" size={10.5} fill={BLUE} anchor="start" weight={800}>
        Laplace: the whole plane
      </M>
      {[[-90, 70], [-120, -50], [-60, 110]].map(([px, py], i) => (
        <g key={i} className={`ecam-cell-in ecam-delay-${i}`}>
          <path
            d={`M${300 + px - 8} ${240 - py - 8} L${300 + px + 8} ${240 - py + 8} M${300 + px + 8} ${240 - py - 8} L${300 + px - 8} ${240 - py + 8}`}
            stroke={GREEN}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ))}
      {[[86, 60], [110, -70]].map(([px, py], i) => (
        <g key={`r${i}`} className={`ecam-cell-in ecam-delay-${i + 2}`}>
          <path
            d={`M${300 + px - 8} ${240 - py - 8} L${300 + px + 8} ${240 - py + 8} M${300 + px + 8} ${240 - py - 8} L${300 + px - 8} ${240 - py + 8}`}
            stroke={RED}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ))}
      <M x="180" y="376" size={10.5} fill={GREEN} weight={800}>
        decaying transients
      </M>
      <M x="420" y="376" size={10.5} fill={RED} weight={800}>
        growing, unstable
      </M>

      <rect x="560" y="72" width="292" height="30" rx="8" fill={N} />
      <M x="640" y="93" size={11} fill={WHITE} weight={800}>
        question
      </M>
      <M x="768" y="93" size={11} fill={WHITE} weight={800}>
        phasor
      </M>
      <M x="828" y="93" size={11} fill={WHITE} weight={800}>
        Laplace
      </M>
      {[
        ['steady state, one frequency', '✓', '✓', GREEN],
        ['response to a step', '✗', '✓', RED],
        ['transient after switching', '✗', '✓', RED],
        ['all frequencies at once', '✗', '✓', RED],
      ].map(([q, a, b, tone], i) => (
        <g key={q} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x="560" y={112 + i * 56} width="292" height="46" rx="9" fill={WHITE} stroke={tone} strokeWidth="2" />
          <foreignObject x="572" y={118 + i * 56} width="160" height="36">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11px/1.2 system-ui,sans-serif', color: '#152430', display: 'flex', alignItems: 'center', height: '100%' }}>
              {q}
            </div>
          </foreignObject>
          <M x="768" y={140 + i * 56} size={14} fill={tone} weight={800}>
            {a}
          </M>
          <M x="828" y={140 + i * 56} size={14} fill={GREEN} weight={800}>
            {b}
          </M>
        </g>
      ))}
    </Scene>
  )
}

export function TransformIntegralScene() {
  return (
    <Scene caption="The kernel is what makes the integral finite — and the ROC is where it is">
      <g className="ecam-emerge">
        <rect x="90" y="70" width="560" height="72" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <text x="370" y="120" textAnchor="middle" fontSize="27" fontWeight="700" fill={N} fontFamily={MONO}>
          F(s) = ∫₀^∞ f(t)·e^(−st) dt
        </text>
      </g>
      {[
        ['the signal', 208, 176, BLUE],
        ['the kernel: forces convergence', 360, 210, AMBER],
        ['one-sided: t < 0 ignored', 150, 244, PURP],
      ].map(([txt, lx, ly, tone], i) => (
        <g key={txt} className={`ecam-cell-in ecam-delay-${i}`}>
          <Wire d={`M${lx} 148 L${lx} ${ly - 14}`} stroke={tone} width="1.8" dash="5 4" />
          <M x={lx} y={ly} size={10.5} fill={tone} weight={800}>
            {txt}
          </M>
        </g>
      ))}

      {[
        ['f(t) grows', BLUE, (t) => Math.exp(1.1 * t) / 3],
        ['e^(−st) decays', AMBER, (t) => Math.exp(-2.6 * t)],
        ['product has finite area', GREEN, (t) => Math.exp(-1.5 * t)],
      ].map(([lab, tone, fn], i) => (
        <g key={lab} className={`ecam-draw ecam-delay-${i}`}>
          <rect x={72 + i * 204} y="280" width="178" height="140" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <Wire d={`M${90 + i * 204} 396 L${236 + i * 204} 396`} stroke={MUTED} width="1.8" />
          <Wire d={`M${90 + i * 204} 396 L${90 + i * 204} 300`} stroke={MUTED} width="1.8" />
          <Curve
            pts={Array.from({ length: 41 }, (_, k) => {
              const t = k / 40
              return [90 + i * 204 + t * 142, 396 - Math.min(92, 88 * fn(t))]
            })}
            stroke={tone}
            width="2.6"
          />
          {i === 2 ? (
            <path
              d={`M${90 + i * 204} 396 ${Array.from({ length: 41 }, (_, k) => {
                const t = k / 40
                return `L${(90 + i * 204 + t * 142).toFixed(1)} ${(396 - Math.min(92, 88 * fn(t))).toFixed(1)}`
              }).join(' ')} L${232 + i * 204} 396 Z`}
              fill={GREEN}
              fillOpacity="0.2"
            />
          ) : null}
          <M x={161 + i * 204} y="414" size={10.5} fill={tone} weight={800}>
            {lab}
          </M>
        </g>
      ))}

      <g className="ecam-slide-in ecam-delay-4">
        <rect x="690" y="180" width="164" height="240" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.3" />
        <rect x="772" y="212" width="74" height="176" fill={GREEN} fillOpacity="0.16" />
        <Wire d="M772 212 L772 388" stroke={GREEN} width="2.8" dash="6 5" />
        <Plane cx="772" cy="300" r="76" xLabel="σ" yLabel="jω" tone={MUTED} />
        <M x="772" y="204" size={10.5} fill={TEAL} weight={800}>
          region of convergence
        </M>
        <M x="812" y="412" size={10} fill={GREEN} weight={800}>
          Re(s) &gt; a
        </M>
      </g>
    </Scene>
  )
}

export function SingularityChainScene() {
  const boxes = [
    ['δ(t)', '1', ROSE],
    ['u(t)', '1/s', BLUE],
    ['r(t) = t·u(t)', '1/s²', TEAL],
  ]
  return (
    <Scene caption="Integrate in time, divide by s — the same step, twice">
      {boxes.map(([name, , tone], i) => (
        <g key={name} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x={58 + i * 276} y="70" width="236" height="160" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <Wire d={`M${82 + i * 276} 202 L${272 + i * 276} 202`} stroke={MUTED} width="1.8" marker="url(#ecaArr)" />
          <Wire d={`M${110 + i * 276} 202 L${110 + i * 276} 96`} stroke={MUTED} width="1.8" />
          {i === 0 ? (
            <g>
              <Wire d={`M${110 + i * 276} 202 L${110 + i * 276} 110`} stroke={ROSE} width="3.4" marker="url(#ecaArrRo)" />
              <M x={148 + i * 276} y="126" size={10.5} fill={ROSE} anchor="start" weight={800}>
                unit area
              </M>
            </g>
          ) : null}
          {i === 1 ? (
            <Wire d={`M${110 + i * 276} 202 L${110 + i * 276} 136 L${268 + i * 276} 136`} stroke={BLUE} width="3.2" />
          ) : null}
          {i === 2 ? (
            <Wire d={`M${110 + i * 276} 202 L${268 + i * 276} 110`} stroke={TEAL} width="3.2" />
          ) : null}
          <M x={176 + i * 276} y="224" size={12} fill={tone} weight={800}>
            {name}
          </M>
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={i} className={`ecam-flow-arrow ecam-delay-${i}`}>
          <Wire d={`M${298 + i * 276} 128 L${332 + i * 276} 128`} stroke={GREEN} width="2.8" marker="url(#ecaArrG)" />
          <M x={315 + i * 276} y="116" size={9.5} fill={GREEN} weight={800}>
            integrate
          </M>
          <Wire d={`M${332 + i * 276} 172 L${298 + i * 276} 172`} stroke={AMBER} width="2.8" marker="url(#ecaArrA)" />
          <M x={315 + i * 276} y="192" size={9.5} fill={AMBER} weight={800}>
            differentiate
          </M>
        </g>
      ))}

      {boxes.map(([, tf, tone], i) => (
        <g key={tf} className={`ecam-pop ecam-delay-${i}`}>
          <rect x={58 + i * 276} y="286" width="236" height="66" rx="12" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth="2.6" />
          <M x={176 + i * 276} y="328" size={19} fill={tone} weight={800}>
            {tf}
          </M>
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={`t${i}`} className={`ecam-flow-arrow ecam-delay-${i + 2}`}>
          <Wire d={`M${298 + i * 276} 318 L${332 + i * 276} 318`} stroke={GREEN} width="2.8" marker="url(#ecaArrG)" />
          <M x={315 + i * 276} y="306" size={9.5} fill={GREEN} weight={800}>
            ÷ s
          </M>
        </g>
      ))}
      <g className="ecam-emerge">
        <rect x="200" y="386" width="500" height="46" rx="10" fill={SKY} stroke={ROSE} strokeWidth="2.3" />
        <M x="450" y="415" size={12.5} fill={ROSE} weight={800}>
          the impulse is the identity: ℒ{'{δ}'} = 1
        </M>
      </g>
    </Scene>
  )
}

export function PoleWaveformMapScene() {
  const cases = [
    ['single real pole', 'decaying exponential', GREEN, [[-110, 0]], 0.0, 2.6, 0],
    ['pair on the axis', 'constant sinusoid', BLUE, [[0, 74], [0, -74]], 0.0, 0, 3],
    ['pair in the left half', 'decaying oscillation', TEAL, [[-74, 60], [-74, -60]], 0.0, 2.2, 3],
    ['pair in the right half', 'growing oscillation', RED, [[62, 60], [62, -60]], 0.0, -1.6, 3],
  ]
  return (
    <Scene caption="Where the pole sits is what the waveform does — read one off the other">
      <SPlane cx="250" cy="250" r="170" shade={false} />
      <M x="250" y="452" size={11} fill={MUTED} weight={800}>
        further left = faster decay
      </M>
      <M x="60" y="92" size={11} fill={MUTED} anchor="start" weight={800}>
        higher up = faster oscillation
      </M>
      {cases.map(([title, , tone, poles], i) =>
        poles.map(([px, py], k) => (
          <g key={`${title}${k}`} className={`ecam-cell-in ecam-delay-${i}`}>
            <path
              d={`M${250 + px - 8} ${250 - py - 8} L${250 + px + 8} ${250 - py + 8} M${250 + px + 8} ${250 - py - 8} L${250 + px - 8} ${250 - py + 8}`}
              stroke={tone}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
          </g>
        )),
      )}
      {cases.map(([title, note, tone, , , sigma, cyc], i) => (
        <g key={title} className={`ecam-slide-in ecam-delay-${i}`}>
          <rect x="474" y={56 + i * 106} width="376" height="94" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x="490" y={78 + i * 106} size={10.5} fill={tone} anchor="start" weight={800}>
            {title}
          </M>
          <M x="836" y={78 + i * 106} size={10} fill={MUTED} anchor="end">
            {note}
          </M>
          <Wire d={`M496 ${122 + i * 106} L836 ${122 + i * 106}`} stroke={MUTED} width="1.4" opacity="0.5" />
          <Wire
            d={DampedPath(496, 122 + i * 106, 330, 30, sigma, cyc)}
            stroke={tone}
            width="2.6"
            className="ecam-draw"
          />
        </g>
      ))}
    </Scene>
  )
}

export function DifferentiationBridgeScene() {
  return (
    <Scene caption="The initial condition is not fitted afterwards — it is already in the equation">
      <rect x="56" y="70" width="520" height="92" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
      <M x="80" y="94" size={10.5} fill={BLUE} anchor="start" weight={800}>
        time domain
      </M>
      <M x="316" y="132" size={16} fill={N} weight={800}>
        L·di/dt + R·i = v(t)
      </M>
      <g className="ecam-pulse">
        <rect x="212" y="110" width="88" height="30" rx="7" fill={AMBER} fillOpacity="0.2" stroke={AMBER} strokeWidth="2.2" />
      </g>

      <Wire d="M316 166 L316 218" stroke={PURP} width="3.4" marker="url(#ecaArrP)" className="ecam-flow-arrow" />
      <M x="348" y="196" size={13} fill={PURP} anchor="start" weight={800}>
        ℒ{'{ }'}
      </M>

      <rect x="56" y="228" width="520" height="92" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.4" />
      <M x="80" y="252" size={10.5} fill={TEAL} anchor="start" weight={800}>
        s domain — algebra only
      </M>
      <M x="316" y="290" size={15} fill={N} weight={800}>
        L[s·I(s) − i(0⁻)] + R·I(s) = V(s)
      </M>
      <g className="ecam-pulse">
        <rect x="172" y="268" width="176" height="30" rx="7" fill={AMBER} fillOpacity="0.2" stroke={AMBER} strokeWidth="2.2" />
      </g>
      <M x="316" y="342" size={11} fill={AMBER} weight={800}>
        the initial condition is right there, as a term
      </M>

      <g className="ecam-slide-in ecam-delay-3">
        <rect x="604" y="70" width="248" height="160" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.2" />
        <rect x="604" y="70" width="248" height="28" rx="12" fill={MUTED} />
        <L x="728" y="90" size={11.5} fill={WHITE}>
          the classical route
        </L>
        {['solve the homogeneous part', 'find a particular integral', 'fit constants to i(0⁺)'].map((t, i) => (
          <M key={t} x="728" y={128 + i * 32} size={10.5} fill={N}>
            {t}
          </M>
        ))}
      </g>
      <g className="ecam-slide-in ecam-delay-4">
        <rect x="604" y="250" width="248" height="98" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <rect x="604" y="250" width="248" height="28" rx="12" fill={GREEN} />
        <L x="728" y="270" size={11.5} fill={WHITE}>
          the Laplace route
        </L>
        <M x="728" y="306" size={10.5} fill={N}>
          transform, then rearrange
        </M>
        <M x="728" y="330" size={10.5} fill={N}>
          nothing to fit afterwards
        </M>
      </g>
      <M x="450" y="404" size={11.5} fill={MUTED} weight={800}>
        note i(0⁻), not i(0⁺) — the transform is taken across the switching instant
      </M>
    </Scene>
  )
}

export function ShiftingTheoremsScene() {
  return (
    <Scene caption="A shift in one domain is a multiplication in the other — both ways round">
      <M x="80" y="72" size={12} fill={BLUE} anchor="start" weight={800}>
        time shift
      </M>
      <Wire d="M76 180 L420 180" stroke={MUTED} width="1.8" />
      <Wire d="M96 180 L96 120 L164 120 L164 180" stroke={BLUE} width="3" className="ecam-draw" />
      <M x="130" y="200" size={10.5} fill={BLUE} weight={800}>
        f(t)
      </M>
      <Wire d="M256 180 L256 120 L324 120 L324 180" stroke={AMBER} width="3" className="ecam-slide-in ecam-delay-2" />
      <M x="290" y="200" size={10.5} fill={AMBER} weight={800}>
        f(t − T)·u(t − T)
      </M>
      <g className="ecam-emerge">
        <path d="M96 216 L96 226 M96 221 L256 221 M256 216 L256 226" stroke={ROSE} strokeWidth="2.2" fill="none" />
        <M x="176" y="240" size={11} fill={ROSE} weight={800}>
          delay T
        </M>
      </g>
      <g className="ecam-pop">
        <rect x="440" y="104" width="230" height="46" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
        <M x="555" y="134" size={13} fill={BLUE} weight={800}>
          F(s) → e^(−sT)·F(s)
        </M>
      </g>
      <g className="ecam-slide-in ecam-delay-3">
        <rect x="440" y="164" width="404" height="70" rx="10" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2.3" />
        <M x="642" y="192" size={11} fill={RED} weight={800}>
          the shifted signal must be multiplied by u(t − T)
        </M>
        <M x="642" y="214" size={10.5} fill={MUTED}>
          without it the theorem simply does not apply
        </M>
      </g>

      <Wire d="M56 266 L844 266" stroke={MUTED} width="1.6" dash="6 6" />

      <M x="80" y="296" size={12} fill={PURP} anchor="start" weight={800}>
        frequency shift
      </M>
      <Wire d="M76 382 L420 382" stroke={MUTED} width="1.8" />
      <Wire d={DampedPath(76, 382, 330, 60, 0, 2.4)} stroke={MUTED} width="2" opacity="0.5" />
      <Wire d={DampedPath(76, 382, 330, 60, 2.4, 2.4)} stroke={PURP} width="2.8" className="ecam-draw ecam-delay-2" />
      <M x="250" y="428" size={10.5} fill={PURP} weight={800}>
        e^(−at)·f(t)
      </M>

      <Plane cx="560" cy="376" r="72" xLabel="σ" yLabel="jω" tone={MUTED} />
      {[40, -40].map((py, i) => (
        <g key={i} className="ecam-shift" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <path
            d={`M${560 - 38 - 7} ${376 - py - 7} L${560 - 38 + 7} ${376 - py + 7} M${560 - 38 + 7} ${376 - py - 7} L${560 - 38 - 7} ${376 - py + 7}`}
            stroke={PURP}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ))}
      <M x="560" y="462" size={10.5} fill={PURP} weight={800}>
        poles slide left by a
      </M>
      <g className="ecam-pop">
        <rect x="660" y="352" width="190" height="46" rx="10" fill={SKY} stroke={PURP} strokeWidth="2.4" />
        <M x="755" y="382" size={13} fill={PURP} weight={800}>
          F(s) → F(s + a)
        </M>
      </g>
      <g className="ecam-pulse">
        <rect x="660" y="288" width="190" height="42" rx="10" fill={TEAL} fillOpacity="0.12" stroke={TEAL} strokeWidth="2.2" />
        <M x="755" y="314" size={10.5} fill={TEAL} weight={800}>
          the two halves are duals
        </M>
      </g>
    </Scene>
  )
}

export function InitialValueTheoremScene() {
  return (
    <Scene caption="One limit in s confirms a value you already know in t — that is why it is a check">
      <g className="ecam-cell-in">
        <rect x="56" y="96" width="290" height="72" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.4" />
        <M x="201" y="140" size={15} fill={N} weight={800}>
          I(s) = 10 / (s + 4)
        </M>
      </g>
      <Wire d="M362 132 L444 132" stroke={PURP} width="3" marker="url(#ecaArrP)" className="ecam-flow-arrow" />
      <M x="403" y="118" size={10} fill={PURP} weight={800}>
        × s, s → ∞
      </M>
      <g className="ecam-pop">
        <rect x="460" y="96" width="200" height="72" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="3" />
        <M x="560" y="140" size={19} fill={GREEN} weight={800}>
          i(0⁺) = 10 A
        </M>
      </g>

      <Wire d="M120 380 L800 380" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M120 380 L120 210" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <L x="790" y="414" size={12} fill={MUTED} weight={700} anchor="end">
        time
      </L>
      <Curve
        pts={Array.from({ length: 61 }, (_, i) => {
          const t = i / 60
          return [120 + t * 640, 380 - 140 * Math.exp(-4 * t)]
        })}
        stroke={BLUE}
        width="3.2"
        className="ecam-draw ecam-delay-2"
      />
      <Dot cx="120" cy="240" r="8" fill={GREEN} className="ecam-pop" />
      <M x="138" y="234" size={12} fill={GREEN} anchor="start" weight={800}>
        10 A at t = 0⁺
      </M>
      <Wire d="M560 172 L136 234" stroke={GREEN} width="1.8" dash="6 5" className="ecam-draw ecam-delay-3" />
      <M x="380" y="196" size={13} fill={GREEN} weight={800}>
        ✓
      </M>

      <g className="ecam-slide-in ecam-delay-4">
        <rect x="560" y="228" width="292" height="118" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.2" />
        <M x="706" y="254" size={11} fill={MUTED} weight={800}>
          the correspondence
        </M>
        <rect x="578" y="266" width="256" height="34" rx="8" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2" />
        <M x="706" y="288" size={11.5} fill={GREEN} weight={800}>
          s → ∞ ⇔ t → 0⁺
        </M>
        <rect x="578" y="306" width="256" height="34" rx="8" fill={MUTED} fillOpacity="0.1" stroke={MUTED} strokeWidth="2" />
        <M x="706" y="328" size={11.5} fill={MUTED} weight={800}>
          s → 0 ⇔ t → ∞  (next unit)
        </M>
      </g>
    </Scene>
  )
}

export function FinalValueValidityScene() {
  return (
    <Scene caption="Apply the final value theorem without checking the poles and it will lie to you">
      <rect x="60" y="82" width="150" height="300" fill={GREEN} fillOpacity="0.1" />
      <rect x="210" y="82" width="16" height="300" fill={AMBER} fillOpacity="0.28" />
      <rect x="226" y="82" width="150" height="300" fill={RED} fillOpacity="0.1" />
      <Plane cx="218" cy="232" r="150" xLabel="σ" yLabel="jω" tone={MUTED} />
      <M x="132" y="102" size={10.5} fill={GREEN} weight={800}>
        valid
      </M>
      <M x="218" y="72" size={10.5} fill={AMBER} weight={800}>
        INVALID
      </M>
      <M x="302" y="102" size={10.5} fill={RED} weight={800}>
        INVALID
      </M>

      {[
        ['all poles strictly left', GREEN, 2.6, 0, 0],
        ['a pole on the axis', AMBER, 0, 3, 1],
        ['a pole in the right half', RED, -1.4, 2, 2],
      ].map(([lab, tone, sigma, cyc], i) => (
        <g key={lab} className={`ecam-slide-in ecam-delay-${i}`}>
          <rect x="420" y={72 + i * 106} width="284" height="92" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x="562" y={94 + i * 106} size={10.5} fill={tone} weight={800}>
            {lab}
          </M>
          <Wire d={`M440 ${136 + i * 106} L688 ${136 + i * 106}`} stroke={MUTED} width="1.4" opacity="0.5" />
          <Wire
            d={sigma === 2.6 ? RisePath(440, 156 + i * 106, 240, 42, 4) : DampedPath(440, 136 + i * 106, 240, 30, sigma, cyc)}
            stroke={tone}
            width="2.6"
            className="ecam-draw"
          />
        </g>
      ))}

      <g className="ecam-slide-in ecam-delay-4">
        <rect x="60" y="398" width="784" height="62" rx="12" fill={RED} fillOpacity="0.08" stroke={RED} strokeWidth="2.4" />
        <M x="200" y="424" size={12} fill={N} weight={800}>
          F(s) = ω / (s² + ω²)
        </M>
        <M x="470" y="424" size={12} fill={RED} weight={800}>
          naive FVT says 0
        </M>
        <Wire d="M392 419 L556 419" stroke={RED} width="2.4" className="ecam-emerge" />
        <M x="720" y="424" size={12} fill={N} weight={800}>
          truth: sin ωt, forever
        </M>
        <M x="450" y="448" size={10.5} fill={MUTED}>
          the poles sit on the imaginary axis, so the limit is meaningless
        </M>
      </g>
    </Scene>
  )
}

export function TransformedElementsScene() {
  const rows = [
    ['R', 'R', 'R', 'R', BLUE],
    ['L', 'sL', 'sL in series with L·i(0⁻)', 'sL in parallel with i(0⁻)/s', PURP],
    ['C', '1/(sC)', '1/(sC) in series with v(0⁻)/s', '1/(sC) in parallel with C·v(0⁻)', AMBER],
  ]
  return (
    <Scene caption="Stored energy stops being an initial condition and becomes a source you can analyse">
      <rect x="56" y="66" width="788" height="32" rx="9" fill={N} />
      <M x="110" y="88" size={11} fill={WHITE} weight={800}>
        element
      </M>
      <M x="250" y="88" size={11} fill={WHITE} weight={800}>
        impedance
      </M>
      <M x="480" y="88" size={11} fill={WHITE} weight={800}>
        series model
      </M>
      <M x="730" y="88" size={11} fill={WHITE} weight={800}>
        parallel model
      </M>
      {rows.map(([name, z, ser, par, tone], i) => (
        <g key={name} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x="56" y={108 + i * 88} width="788" height="78" rx="10" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <L x="110" y={154 + i * 88} size={17} fill={tone}>
            {name}
          </L>
          <M x="250" y={154 + i * 88} size={13} fill={N} weight={800}>
            {z}
          </M>
          <foreignObject x="376" y={122 + i * 88} width="212" height="52">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11px/1.25 system-ui,sans-serif', color: '#152430', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              {ser}
            </div>
          </foreignObject>
          <foreignObject x="620" y={122 + i * 88} width="220" height="52">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11px/1.25 system-ui,sans-serif', color: '#152430', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              {par}
            </div>
          </foreignObject>
          {i > 0 ? (
            <g className="ecam-pulse">
              <Src cx="600" cy={148 + i * 88} kind="v" tone={AMBER} r="14" />
            </g>
          ) : null}
        </g>
      ))}
      <g className="ecam-emerge">
        <rect x="150" y="378" width="600" height="56" rx="12" fill={SKY} stroke={GREEN} strokeWidth="2.4" />
        <L x="450" y="404" size={12.5} fill={GREEN}>
          stored energy becomes a source
        </L>
        <M x="450" y="424" size={10.5} fill={MUTED}>
          then use mesh or node analysis exactly as before
        </M>
      </g>
    </Scene>
  )
}

export function SdomainToolboxScene() {
  const tools = ['series & parallel', 'voltage division', 'current division', 'mesh analysis', 'node analysis', 'Thevenin & Norton']
  return (
    <Scene caption="Nothing new to learn — the entire toolbox carries straight across">
      <rect x="52" y="66" width="430" height="290" rx="14" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
      <rect x="52" y="66" width="430" height="32" rx="14" fill={BLUE} />
      <L x="267" y="88" size={12.5} fill={WHITE}>
        the toolbox
      </L>
      {tools.map((t, i) => (
        <g key={t} className={`ecam-cell-in ecam-delay-${i % 5}`}>
          <rect x={72 + (i % 2) * 204} y={112 + Math.floor(i / 2) * 78} width="188" height="64" rx="10" fill={SKY} stroke={BLUE} strokeWidth="2" />
          <foreignObject x={82 + (i % 2) * 204} y={120 + Math.floor(i / 2) * 78} width="168" height="48">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '750 12px/1.2 system-ui,sans-serif', color: '#1d4ed8', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              {t}
            </div>
          </foreignObject>
        </g>
      ))}

      {['DC (R)', 'AC (jω)', 'Laplace (s)'].map((h, c) => (
        <g key={h} className={`ecam-slide-in ecam-delay-${c}`}>
          <rect x={516 + c * 112} y="66" width="100" height="32" rx="9" fill={c === 2 ? TEAL : MUTED} />
          <M x={566 + c * 112} y="88" size={10.5} fill={WHITE} weight={800}>
            {h}
          </M>
          {tools.map((t, r) => (
            <M key={t} x={566 + c * 112} y={126 + r * 38} size={15} fill={GREEN} weight={800}>
              ✓
            </M>
          ))}
        </g>
      ))}

      <g className="ecam-emerge">
        <rect x="52" y="378" width="792" height="68" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <M x="240" y="412" size={13} fill={N} weight={800}>
          V(s) = Vs·(1/sC) / (R + 1/sC)
        </M>
        <M x="580" y="404" size={11} fill={GREEN} weight={800}>
          forced part
        </M>
        <M x="720" y="404" size={11} fill={PURP} weight={800}>
          natural part
        </M>
        <M x="650" y="432" size={10.5} fill={MUTED}>
          the partial fraction split separates them
        </M>
      </g>
    </Scene>
  )
}

export function CoverUpResidueScene() {
  return (
    <Scene caption="Cover the factor, evaluate at its own pole — that number is the residue">
      <g className="ecam-cell-in">
        <rect x="150" y="62" width="600" height="60" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
        <M x="450" y="100" size={17} fill={N} weight={800}>
          F(s) = 10 / [(s + 2)(s + 5)]
        </M>
      </g>
      <g className="ecam-cell-in ecam-delay-1">
        <rect x="150" y="136" width="600" height="56" rx="12" fill={SKY} stroke={TEAL} strokeWidth="2.2" />
        <M x="450" y="172" size={16} fill={N} weight={800}>
          = A/(s + 2) + B/(s + 5)
        </M>
      </g>

      {[
        ['cover (s + 2), set s = −2', 'A = 10/3', GREEN, 0],
        ['cover (s + 5), set s = −5', 'B = −10/3', AMBER, 1],
      ].map(([step, val, tone, i]) => (
        <g key={step} className={`ecam-slide-in ecam-delay-${i + 2}`}>
          <rect x={80 + i * 400} y="212" width="360" height="88" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={260 + i * 400} y="240" size={11} fill={tone} weight={800}>
            {step}
          </M>
          <rect x={180 + i * 400} y="252" width="160" height="30" rx="7" fill={tone} fillOpacity="0.18" stroke={tone} strokeWidth="2" className="ecam-pulse" />
          <M x={260 + i * 400} y="273" size={14} fill={tone} weight={800}>
            {val}
          </M>
        </g>
      ))}

      <Wire d="M100 380 L440 380" stroke={MUTED} width="2" marker="url(#ecaArr)" />
      <Wire d="M100 380 L100 316" stroke={MUTED} width="2" />
      <Wire d={DampedPath(100, 380, 320, 52, 2.4, 0)} stroke={GREEN} width="2.6" className="ecam-draw ecam-delay-3" />
      <Wire d={DampedPath(100, 380, 320, 52, 5.4, 0)} stroke={AMBER} width="2.6" className="ecam-draw ecam-delay-4" />
      <M x="250" y="404" size={10.5} fill={MUTED}>
        A·e^(−2t) and B·e^(−5t)
      </M>

      <g className="ecam-emerge">
        <rect x="480" y="316" width="364" height="126" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <M x="662" y="344" size={11} fill={GREEN} weight={800}>
          the inverse, term by term
        </M>
        <M x="662" y="378" size={15} fill={N} weight={800}>
          f(t) = (10/3)(e^(−2t) − e^(−5t))
        </M>
        <M x="662" y="414" size={10.5} fill={MUTED}>
          two decaying components; the fast one dies first
        </M>
      </g>
    </Scene>
  )
}

export function RepeatedComplexPolesScene() {
  return (
    <Scene caption="A double pole gives t·e^(−at); a complex pair gives a decaying oscillation">
      <rect x="44" y="60" width="392" height="380" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.3" />
      <rect x="44" y="60" width="392" height="30" rx="12" fill={PURP} />
      <L x="240" y="81" size={12.5} fill={WHITE}>
        repeated pole
      </L>
      <Plane cx="240" cy="190" r="86" xLabel="σ" yLabel="jω" tone={MUTED} />
      <g className="ecam-pop">
        <path d="M172 182 L188 198 M188 182 L172 198" stroke={PURP} strokeWidth="3.2" strokeLinecap="round" />
        <path d="M176 186 L192 202 M192 186 L176 202" stroke={PURP} strokeWidth="3.2" strokeLinecap="round" opacity="0.6" />
        <M x="180" y="228" size={11} fill={PURP} weight={800}>
          ×2
        </M>
      </g>
      <Wire d="M76 390 L404 390" stroke={MUTED} width="1.8" />
      <Curve
        pts={Array.from({ length: 61 }, (_, i) => {
          const t = i / 60
          return [76 + t * 320, 390 - 260 * t * Math.exp(-3.4 * t)]
        })}
        stroke={PURP}
        width="3"
        className="ecam-draw ecam-delay-2"
      />
      <M x="240" y="414" size={11} fill={PURP} weight={800}>
        t·e^(−at) — critical damping
      </M>

      <rect x="464" y="60" width="392" height="380" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.3" />
      <rect x="464" y="60" width="392" height="30" rx="12" fill={TEAL} />
      <L x="660" y="81" size={12.5} fill={WHITE}>
        complex pair
      </L>
      <Plane cx="660" cy="190" r="86" xLabel="σ" yLabel="jω" tone={MUTED} />
      <g className="ecam-pop">
        {[46, -46].map((py, i) => (
          <path
            key={i}
            d={`M${660 - 56 - 7} ${190 - py - 7} L${660 - 56 + 7} ${190 - py + 7} M${660 - 56 + 7} ${190 - py - 7} L${660 - 56 - 7} ${190 - py + 7}`}
            stroke={TEAL}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        ))}
      </g>
      <Wire d="M604 144 L660 144 M604 236 L660 236" stroke={TEAL} width="1.6" dash="4 4" />
      <Wire d="M604 190 L604 144" stroke={TEAL} width="1.6" dash="4 4" />
      <M x="596" y="170" size={10} fill={TEAL} anchor="end" weight={800}>
        ω
      </M>
      <M x="632" y="208" size={10} fill={TEAL} weight={800}>
        −a
      </M>
      <Wire d="M496 356 L824 356" stroke={MUTED} width="1.8" />
      <Wire d={DampedPath(496, 356, 320, 56, 2.6, 0)} stroke={MUTED} width="1.8" dash="5 4" />
      <Wire d={DampedPath(496, 356, 320, 56, 2.6, 3)} stroke={TEAL} width="3" className="ecam-draw ecam-delay-3" />
      <M x="660" y="398" size={10.5} fill={MUTED}>
        envelope e^(−at), dashed
      </M>
      <g className="ecam-emerge">
        <rect x="488" y="410" width="344" height="32" rx="8" fill={SKY} stroke={TEAL} strokeWidth="2" />
        <M x="660" y="431" size={11.5} fill={TEAL} weight={800}>
          s² + 2as + b = (s + a)² + ω²
        </M>
      </g>
    </Scene>
  )
}

export function WaveformSynthesisScene() {
  const comps = [
    ['+r(t − T₁)', BLUE, 120, 1],
    ['−r(t − T₂)', AMBER, 240, -1],
    ['−r(t − T₃)', PURP, 360, -1],
    ['+r(t − T₄)', GREEN, 480, 1],
  ]
  return (
    <Scene caption="Every corner in the waveform is one shifted ramp — and they must all cancel at the end">
      <Wire d="M90 132 L620 132" stroke={MUTED} width="1.6" />
      <Wire d="M120 132 L200 132 L280 80 L400 80 L480 132 L600 132" stroke={N} width="3.4" className="ecam-draw" />
      <M x="360" y="62" size={11.5} fill={N} weight={800}>
        the target waveform
      </M>
      {['T₁', 'T₂', 'T₃', 'T₄'].map((t, i) => (
        <M key={t} x={200 + i * 80} y="152" size={10} fill={MUTED} weight={800}>
          {t}
        </M>
      ))}

      {comps.map(([lab, tone, x0, sign], i) => (
        <g key={lab} className={`ecam-cell-in ecam-delay-${i}`}>
          <Wire d={`M90 ${208 + i * 58} L620 ${208 + i * 58}`} stroke={MUTED} width="1.2" opacity="0.5" />
          <Wire
            d={`M120 ${208 + i * 58} L${x0} ${208 + i * 58} L620 ${208 + i * 58 - sign * 38}`}
            stroke={tone}
            width="2.6"
          />
          <M x="646" y={212 + i * 58} size={11} fill={tone} anchor="start" weight={800}>
            {lab}
          </M>
          <M x="786" y={212 + i * 58} size={11} fill={MUTED} anchor="start">
            {`e^(−sT${i + 1})/s²`}
          </M>
        </g>
      ))}
      <g className="ecam-emerge">
        <path d="M96 190 L86 190 M91 190 L91 440 M96 440 L86 440" stroke={GREEN} strokeWidth="2.2" fill="none" />
        <M x="78" y="318" size={11} fill={GREEN} anchor="end" weight={800}>
          Σ
        </M>
      </g>
      <g className="ecam-slide-in ecam-delay-4">
        <rect x="640" y="60" width="210" height="60" rx="11" fill={ROSE} fillOpacity="0.1" stroke={ROSE} strokeWidth="2.3" />
        <M x="745" y="84" size={10.5} fill={ROSE} weight={800}>
          the check
        </M>
        <M x="745" y="104" size={10} fill={MUTED}>
          all slopes cancel after T₄
        </M>
      </g>
    </Scene>
  )
}

export function PeriodicTransformScene() {
  const pulse = (x0, tone, op, cls) => (
    <Wire
      d={`M${x0} 180 L${x0 + 20} 180 L${x0 + 20} 116 L${x0 + 68} 116 L${x0 + 68} 180 L${x0 + 110} 180`}
      stroke={tone}
      width="3"
      opacity={op}
      className={cls}
    />
  )
  return (
    <Scene caption="Transform one period, then divide by 1 − e^(−sT) and the whole train is done">
      <Wire d="M90 180 L830 180" stroke={MUTED} width="1.8" />
      {pulse(110, GREEN, 1, 'ecam-draw')}
      <rect x="104" y="100" width="128" height="94" rx="9" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.4" className="ecam-emerge" />
      <M x="168" y="216" size={10.5} fill={GREEN} weight={800}>
        first period
      </M>
      {[1, 2, 3, 4].map((k) => (
        <g key={k} className={`ecam-cell-in ecam-delay-${k % 5}`}>
          {pulse(110 + k * 148, MUTED, 0.5, '')}
          <M x={168 + k * 148} y="216" size={10} fill={MUTED}>
            {`+${k}T`}
          </M>
        </g>
      ))}

      {[
        ['F₁(s)', BLUE],
        ['F₁(s)·e^(−sT)', BLUE],
        ['F₁(s)·e^(−2sT)', BLUE],
        ['F₁(s)·e^(−3sT) + …', BLUE],
      ].map(([t, tone], i) => (
        <g key={t} className={`ecam-slide-in ecam-delay-${i}`}>
          <rect x="72" y={252 + i * 44} width="300" height="36" rx="8" fill={WHITE} stroke={tone} strokeWidth="1.9" />
          <M x="222" y={276 + i * 44} size={12} fill={N}>
            {t}
          </M>
        </g>
      ))}
      <Wire d="M392 342 L456 342" stroke={PURP} width="3.4" marker="url(#ecaArrP)" className="ecam-flow-arrow" />
      <M x="424" y="328" size={10} fill={PURP} weight={800}>
        geometric
      </M>
      <g className="ecam-pop">
        <rect x="476" y="300" width="368" height="84" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="3.2" />
        <M x="660" y="352" size={19} fill={GREEN} weight={800}>
          F(s) = F₁(s) / (1 − e^(−sT))
        </M>
      </g>
      <M x="660" y="416" size={10.5} fill={MUTED}>
        ratio e^(−sT), and |e^(−sT)| &lt; 1 whenever Re(s) &gt; 0
      </M>
    </Scene>
  )
}

export function PoleZeroReadingScene() {
  return (
    <Scene caption="The pole-zero plot is the whole network function, drawn">
      <SPlane cx="260" cy="230" r="160" poles={[[-70, 66, ROSE], [-70, -66, ROSE]]} zeros={[[-126, 0, BLUE]]} className="ecam-pop" />
      <Wire d="M100 418 L420 418" stroke={MUTED} width="2" />
      <rect x="100" y="410" width="160" height="16" rx="6" fill={GREEN} fillOpacity="0.28" />
      <rect x="260" y="410" width="160" height="16" rx="6" fill={RED} fillOpacity="0.22" />
      <M x="260" y="446" size={10.5} fill={MUTED} weight={800}>
        all poles must be left of the axis
      </M>

      {[
        ['real part → decay envelope', TEAL, 70],
        ['imaginary part → oscillation', PURP, 190],
        ['both → the frequency response', AMBER, 310],
      ].map(([lab, tone, y], i) => (
        <g key={lab} className={`ecam-slide-in ecam-delay-${i}`}>
          <rect x="470" y={y} width="382" height="102" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x="661" y={y + 24} size={10.5} fill={tone} weight={800}>
            {lab}
          </M>
          {i === 0 ? (
            <g>
              <Wire d={`M492 ${y + 74} L830 ${y + 74}`} stroke={MUTED} width="1.4" opacity="0.5" />
              <Wire d={DampedPath(492, y + 74, 330, 30, 2.6, 0)} stroke={TEAL} width="2.6" className="ecam-draw" />
            </g>
          ) : null}
          {i === 1 ? (
            <g>
              <Wire d={`M492 ${y + 74} L830 ${y + 74}`} stroke={MUTED} width="1.4" opacity="0.5" />
              <Wire d={DampedPath(492, y + 74, 330, 26, 0, 3.2)} stroke={PURP} width="2.6" className="ecam-draw" />
            </g>
          ) : null}
          {i === 2 ? (
            <g>
              <Wire d={`M492 ${y + 86} L830 ${y + 86}`} stroke={MUTED} width="1.4" opacity="0.5" />
              <Curve pts={resonancePts(7, 500, 300, y + 86, 48)} stroke={AMBER} width="2.6" className="ecam-draw" />
              <M x="560" y={y + 50} size={9.5} fill={AMBER} weight={800}>
                peak near the pole
              </M>
              <M x="790" y={y + 76} size={9.5} fill={BLUE} anchor="end" weight={800}>
                dip near the zero
              </M>
            </g>
          ) : null}
        </g>
      ))}
    </Scene>
  )
}

export function LaplaceProcedureScene() {
  const stages = [
    ['initial conditions', 'read i(0⁻), v(0⁻)', BLUE],
    ['transformed circuit', 'elements → s', TEAL],
    ['algebra in s', 'mesh or node', PURP],
    ['check IVT & FVT', 'sanity, before you invert', AMBER],
    ['partial fractions', 'split into standard terms', ROSE],
    ['inverse transform', 'back to t', GREEN],
  ]
  return (
    <Scene caption="The check is the fourth step, not the last — a wrong algebraic result is cheapest to catch there">
      {stages.map(([title, sub, tone], i) => {
        const x = 40 + (i % 3) * 282
        const y = 66 + Math.floor(i / 3) * 132
        return (
          <g key={title} className={`ecam-cell-in ecam-delay-${i % 5}`}>
            <rect x={x} y={y} width="252" height="94" rx="12" fill={WHITE} stroke={tone} strokeWidth={i === 3 ? 3 : 2.3} />
            <rect x={x} y={y} width="252" height="28" rx="12" fill={tone} />
            <M x={x + 126} y={y + 19} size={10.5} fill={WHITE} weight={800}>
              {`${i + 1} · ${title}`}
            </M>
            <foreignObject x={x + 12} y={y + 34} width="228" height="52">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11.5px/1.25 system-ui,sans-serif', color: '#152430', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
                {sub}
              </div>
            </foreignObject>
            {i % 3 < 2 ? (
              <Wire d={`M${x + 252} ${y + 47} L${x + 274} ${y + 47}`} stroke={MUTED} width="2.4" marker="url(#ecaArrM)" className="ecam-flow-arrow" />
            ) : null}
          </g>
        )
      })}
      <Wire d="M604 160 L640 160 L640 182 L44 182 L44 198" stroke={MUTED} width="2" dash="6 5" opacity="0.6" />
      <g className="ecam-feedback">
        <Wire d="M604 244 L636 244 L636 216 L578 216" stroke={AMBER} width="2.6" dash="6 5" marker="url(#ecaArrA)" />
      </g>
      <M x="700" y="216" size={10} fill={AMBER} anchor="start" weight={800}>
        discrepancy? fix the algebra
      </M>

      <Wire d="M120 430 L790 430" stroke={MUTED} width="2" marker="url(#ecaArr)" />
      <Wire d="M120 430 L120 320" stroke={MUTED} width="2" />
      <Wire d="M120 336 L760 336" stroke={GREEN} width="2" dash="6 5" />
      <M x="752" y="328" size={10} fill={GREEN} anchor="end" weight={800}>
        forced part
      </M>
      <Wire d={RisePath(120, 430, 640, 94, 4.4)} stroke={BLUE} width="3" className="ecam-draw ecam-delay-4" />
      <M x="300" y="410" size={10} fill={PURP} weight={800}>
        natural part fills the gap
      </M>
    </Scene>
  )
}

/* ── Module 5 — unbalanced three phase and two-port networks ────── */

/** A two-port box with its four terminals and port labels. Only Module 5
 *  needs it, but every unit in the second half of the module does. */
function Port2({ x, y, w = 160, h = 110, label, tone = BLUE, className = '', faint = false }) {
  const [X, Y, W, H] = [n(x), n(y), n(w), n(h)]
  return (
    <g>
      <g className={className}>
        <rect x={X} y={Y} width={W} height={H} rx="12" fill={faint ? MUTED : WHITE} fillOpacity={faint ? 0.14 : 1} stroke={tone} strokeWidth="2.5" />
        {label ? (
          <M x={X + W / 2} y={Y + H / 2 + 5} size={13} fill={tone} weight={800}>
            {label}
          </M>
        ) : null}
      </g>
      <Wire d={`M${X - 34} ${Y + 26} L${X} ${Y + 26}`} stroke={N} width="2.3" />
      <Wire d={`M${X - 34} ${Y + H - 26} L${X} ${Y + H - 26}`} stroke={N} width="2.3" />
      <Wire d={`M${X + W} ${Y + 26} L${X + W + 34} ${Y + 26}`} stroke={N} width="2.3" />
      <Wire d={`M${X + W} ${Y + H - 26} L${X + W + 34} ${Y + H - 26}`} stroke={N} width="2.3" />
      <Dot cx={X - 34} cy={Y + 26} r="4.5" fill={N} />
      <Dot cx={X - 34} cy={Y + H - 26} r="4.5" fill={N} />
      <Dot cx={X + W + 34} cy={Y + 26} r="4.5" fill={N} />
      <Dot cx={X + W + 34} cy={Y + H - 26} r="4.5" fill={N} />
    </g>
  )
}

export function ThreePhaseAdvantageScene() {
  return (
    <Scene caption="Constant total power, no neutral current, and one phase to solve instead of three">
      <rect x="44" y="60" width="310" height="184" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
      <Wire d="M62 152 L340 152" stroke={MUTED} width="1.4" opacity="0.6" />
      {[[0, BLUE], [-2.094, AMBER], [2.094, PURP]].map(([ph, tone], i) => (
        <Wave key={i} x="62" y="152" w="278" amp="44" cycles={1} phase={ph} stroke={tone} width="2.4" className={`ecam-draw ecam-delay-${i}`} />
      ))}
      <Wire d="M62 92 L340 92" stroke={GREEN} width="3.2" className="ecam-sweep-x" />
      <M x="201" y="82" size={10.5} fill={GREEN} weight={800}>
        total power constant
      </M>
      <M x="201" y="226" size={10.5} fill={MUTED}>
        three phases, 120° apart
      </M>

      <rect x="44" y="258" width="310" height="164" rx="12" fill={WHITE} stroke={ROSE} strokeWidth="2.2" />
      <Wire d="M62 388 L340 388" stroke={MUTED} width="1.4" opacity="0.6" />
      <Curve
        pts={Array.from({ length: 81 }, (_, i) => {
          const t = i / 80
          return [62 + t * 278, 388 - 84 * Math.sin(Math.PI * 2 * t) ** 2]
        })}
        stroke={ROSE}
        width="2.8"
        className="ecam-draw ecam-delay-2"
      />
      <M x="201" y="282" size={10.5} fill={ROSE} weight={800}>
        single phase: power pulsates 0 → 2×average
      </M>

      <Plane cx="510" cy="230" r="120" xLabel="" yLabel="" tone={MUTED} />
      {[[90, BLUE], [-30, AMBER], [210, PURP]].map(([a, tone], i) => (
        <Phasor key={i} ox="510" oy="230" ang={a} len={108} label="" tone={tone} className={`ecam-draw ecam-delay-${i}`} />
      ))}
      <g className="ecam-collapse">
        <Dot cx="510" cy="230" r="10" fill={GREEN} />
      </g>
      <M x="510" y="378" size={11} fill={GREEN} weight={800}>
        vector sum = 0
      </M>

      <rect x="664" y="112" width="190" height="236" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.4" />
      <M x="759" y="138" size={11} fill={TEAL} weight={800}>
        per-phase equivalent
      </M>
      <Src cx="706" cy="234" kind="v" tone={TEAL} r="18" />
      <Wire d="M706 216 L706 178 L812 178" stroke={N} width="2.2" />
      <Wire d="M706 252 L706 290 L812 290" stroke={N} width="2.2" />
      <Res x="812" y="234" len="70" orient="v" label="Z" tone={N} />
      <Wire d="M812 178 L812 199 M812 269 L812 290" stroke={N} width="2.2" />
      <M x="759" y="326" size={10} fill={MUTED}>
        solve once, rotate 120° and 240°
      </M>
    </Scene>
  )
}

export function BalanceComparisonScene() {
  return (
    <Scene caption="Unbalance is not a fault — it is the normal state of a distribution feeder">
      <rect x="44" y="60" width="388" height="290" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <rect x="44" y="60" width="388" height="28" rx="12" fill={GREEN} />
      <L x="238" y="80" size={11.5} fill={WHITE}>
        balanced
      </L>
      <Plane cx="238" cy="216" r="106" xLabel="" yLabel="" tone={MUTED} />
      {[[90, BLUE], [-30, AMBER], [210, PURP]].map(([a, tone], i) => (
        <Phasor key={i} ox="238" oy="216" ang={a} len={96} label="" tone={tone} className={`ecam-draw ecam-delay-${i}`} />
      ))}
      <g className="ecam-collapse">
        <Dot cx="238" cy="216" r="10" fill={GREEN} />
      </g>
      <M x="238" y="338" size={12} fill={GREEN} weight={800}>
        IN = 0
      </M>

      <rect x="468" y="60" width="388" height="290" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.4" />
      <rect x="468" y="60" width="388" height="28" rx="12" fill={RED} />
      <L x="662" y="80" size={11.5} fill={WHITE}>
        unbalanced
      </L>
      <Plane cx="662" cy="216" r="106" xLabel="" yLabel="" tone={MUTED} />
      {[[100, BLUE, 96], [-22, AMBER, 60], [222, PURP, 82]].map(([a, tone, len], i) => (
        <Phasor key={i} ox="662" oy="216" ang={a} len={len} label="" tone={tone} className={`ecam-draw ecam-delay-${i}`} />
      ))}
      <Phasor ox="662" oy="216" ang={168} len={46} label="IN" tone={RED} width="4" className="ecam-emerge" />
      <M x="662" y="338" size={12} fill={RED} weight={800}>
        IN ≠ 0
      </M>

      {['uneven single-phase loading', 'demand changes through the day', 'faults'].map((t, i) => (
        <g key={t} className={`ecam-slide-in ecam-delay-${i}`}>
          <rect x={44 + i * 276} y="378" width="264" height="56" rx="11" fill={SKY} stroke={AMBER} strokeWidth="2.2" />
          <foreignObject x={56 + i * 276} y="388" width="240" height="38">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '750 11.5px/1.25 system-ui,sans-serif', color: '#c2410c', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              {t}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

export function FourWireDecouplingScene() {
  return (
    <Scene caption="The neutral is what turns one hard problem into three easy ones">
      {[
        ['Za', BLUE, 110],
        ['Zb', AMBER, 216],
        ['Zc', PURP, 322],
      ].map(([z, tone, y], i) => (
        <g key={z} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x="96" y={y - 44} width="470" height="88" rx="11" fill="none" stroke={tone} strokeWidth="2" strokeDasharray="8 6" />
          <Src cx="150" cy={y} kind="v" tone={tone} r="19" />
          <Wire d={`M169 ${y} L300 ${y}`} stroke={N} width="2.3" />
          <Res x="360" y={y} len="100" label={z} tone={tone} />
          <Wire d={`M410 ${y} L640 ${y}`} stroke={N} width="2.3" />
          <M x="250" y={y - 14} size={10} fill={tone} weight={800}>
            {`I${['a', 'b', 'c'][i]} = V / ${z}`}
          </M>
          <M x="580" y={y - 54} size={9.5} fill={tone} anchor="start">
            independent
          </M>
        </g>
      ))}
      <Wire d="M131 110 L131 322" stroke={N} width="2.3" />
      <Wire d="M131 216 L96 216" stroke={N} width="2.3" />
      <Wire d="M96 216 L96 412 L640 412" stroke={GREEN} width="5.4" />
      <Wire d="M640 110 L640 412" stroke={N} width="2.3" />
      <M x="368" y="436" size={11} fill={GREEN} weight={800}>
        the neutral holds both star points at the same potential
      </M>

      {[110, 216, 322].map((y, i) => (
        <Flow key={y} from={[664, y]} to={[706, y]} label="" tone={[BLUE, AMBER, PURP][i]} className={`ecam-current ecam-delay-${i}`} />
      ))}
      <Dot cx="726" cy="216" r="8" fill={GREEN} />
      <Wire d="M706 110 L726 110 L726 322 L706 322 M706 216 L726 216" stroke={MUTED} width="2" />
      <Flow from={[726, 216]} to={[822, 216]} label="" tone={GREEN} className="ecam-current ecam-delay-3" />
      <g className="ecam-emerge">
        <rect x="684" y="256" width="170" height="70" rx="11" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <M x="769" y="282" size={11} fill={GREEN} weight={800}>
          IN = Ia + Ib + Ic
        </M>
        <M x="769" y="304" size={10} fill={MUTED}>
          phasor sum, not arithmetic
        </M>
      </g>
      <g className="ecam-pulse">
        <rect x="684" y="76" width="170" height="60" rx="11" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2.3" />
        <M x="769" y="100" size={10.5} fill={RED} weight={800}>
          remove this wire and
        </M>
        <M x="769" y="120" size={10.5} fill={RED} weight={800}>
          the decoupling is lost
        </M>
      </g>
    </Scene>
  )
}

export function NeutralShiftScene() {
  // Source star point S at (250, 240); the three supply phasors reach the
  // corners of the line triangle. The load star point O is displaced.
  const S = [250, 240]
  const tips = [
    [250, 100],
    [371, 310],
    [129, 310],
  ]
  const O = [292, 272]
  return (
    <Scene caption="The star point moves, and the lightly loaded phase is the one that gets overvolted">
      {tips.map(([tx, ty], i) => (
        <g key={i} className={`ecam-draw ecam-delay-${i}`}>
          <Wire d={`M${S[0]} ${S[1]} L${tx} ${ty}`} stroke={MUTED} width="2.4" marker="url(#ecaArrM)" />
        </g>
      ))}
      <Wire d="M250 100 L371 310 L129 310 L250 100" stroke={MUTED} width="1.6" dash="6 5" opacity="0.6" />
      <Dot cx={S[0]} cy={S[1]} r="7" fill={N} />
      <M x={S[0] - 14} y={S[1] - 8} size={11} fill={N} anchor="end" weight={800}>
        S
      </M>
      <g className="ecam-emerge">
        <Wire d={`M${S[0]} ${S[1]} L${O[0]} ${O[1]}`} stroke={RED} width="4" marker="url(#ecaArrR)" />
        <Dot cx={O[0]} cy={O[1]} r="7" fill={RED} />
        <M x={O[0] + 14} y={O[1] + 18} size={11} fill={RED} anchor="start" weight={800}>
          O · VON
        </M>
      </g>
      {tips.map(([tx, ty], i) => (
        <g key={`o${i}`} className={`ecam-draw ecam-delay-${i + 2}`}>
          <Wire d={`M${O[0]} ${O[1]} L${tx} ${ty}`} stroke={[BLUE, AMBER, PURP][i]} width="2.8" />
        </g>
      ))}
      <M x="250" y="84" size={10} fill={BLUE} weight={800}>
        A
      </M>
      <M x="388" y="316" size={10} fill={AMBER} anchor="start" weight={800}>
        B
      </M>
      <M x="112" y="316" size={10} fill={PURP} anchor="end" weight={800}>
        C
      </M>
      <M x="250" y="358" size={10.5} fill={MUTED}>
        the three load phase voltages are now unequal
      </M>

      <Bars
        x="540"
        y="96"
        w="200"
        items={[['nominal', 231, MUTED], ['phase A', 268, RED], ['phase B', 214, BLUE], ['phase C', 210, BLUE]]}
        rowH={52}
        max={280}
      />
      <g className="ecam-slide-in ecam-delay-4">
        <rect x="470" y="326" width="380" height="96" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.6" />
        <L x="660" y="354" size={12.5} fill={RED}>
          ⚠ the lightly loaded phase is overvolted
        </L>
        <M x="660" y="380" size={11} fill={N}>
          268 V on equipment rated for 231 V
        </M>
        <M x="660" y="402" size={10.5} fill={MUTED}>
          it fails, and the fault looks like a supply problem
        </M>
      </g>
    </Scene>
  )
}

export function MillmanBalanceScene() {
  return (
    <Scene caption="The star point settles where the admittances balance — the heaviest load pulls hardest">
      <Wire d="M90 140 L470 140" stroke={MUTED} width="2" />
      <g className="ecam-needle" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <Wire d="M110 176 L450 176" stroke={N} width="5" />
      </g>
      <path d="M262 176 L280 216 L244 216 Z" fill={MUTED} />
      <Dot cx="262" cy="176" r="6" fill={N} />
      {[
        ['Ya', 140, 56, BLUE],
        ['Yb', 280, 34, AMBER],
        ['Yc', 400, 22, PURP],
      ].map(([lab, x, size, tone], i) => (
        <g key={lab} className={`ecam-cell-in ecam-delay-${i}`}>
          <Wire d={`M${x} 176 L${x} 196`} stroke={tone} width="2" />
          <rect x={x - size / 2} y={196} width={size} height={size} rx="6" fill={tone} fillOpacity="0.2" stroke={tone} strokeWidth="2.2" />
          <M x={x} y={196 + size / 2 + 5} size={11} fill={tone} weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <M x="262" y="128" size={10.5} fill={MUTED} weight={800}>
        balance point
      </M>
      <M x="262" y="288" size={10.5} fill={MUTED}>
        heavier load = larger Y = stronger pull
      </M>

      <Wire d="M262 232 L600 216" stroke={GREEN} width="1.8" dash="6 5" className="ecam-draw ecam-delay-3" />
      <Plane cx="660" cy="216" r="96" xLabel="" yLabel="" tone={MUTED} />
      {[[90, BLUE], [-30, AMBER], [210, PURP]].map(([a, tone], i) => (
        <Phasor key={i} ox="660" oy="216" ang={a} len={88} label="" tone={tone} />
      ))}
      <g className="ecam-pop">
        <Dot cx="618" cy="240" r="8" fill={GREEN} />
        <M x="612" y="264" size={10.5} fill={GREEN} anchor="end" weight={800}>
          O
        </M>
      </g>

      <g className="ecam-emerge">
        <rect x="90" y="326" width="720" height="96" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.6" />
        <M x="450" y="372" size={17} fill={N} weight={800}>
          VON = (VaYa + VbYb + VcYc) / (Ya + Yb + Yc)
        </M>
        <M x="300" y="400" size={10.5} fill={TEAL} weight={800}>
          weighted sum
        </M>
        <M x="620" y="400" size={10.5} fill={TEAL} weight={800}>
          total weight
        </M>
      </g>
    </Scene>
  )
}

export function UnbalancedDeltaScene() {
  const A = [250, 90]
  const B = [400, 320]
  const C = [100, 320]
  return (
    <Scene caption="Branch currents come straight from Ohm; line currents come from KCL at the corners">
      <Wire d={`M${A[0]} ${A[1]} L${B[0]} ${B[1]}`} stroke={BLUE} width="3.6" />
      <Wire d={`M${B[0]} ${B[1]} L${C[0]} ${C[1]}`} stroke={AMBER} width="2.4" />
      <Wire d={`M${C[0]} ${C[1]} L${A[0]} ${A[1]}`} stroke={PURP} width="5" />
      <M x="352" y="196" size={10.5} fill={BLUE} anchor="start" weight={800}>
        Iab
      </M>
      <M x="250" y="344" size={10.5} fill={AMBER} weight={800}>
        Ibc
      </M>
      <M x="148" y="196" size={10.5} fill={PURP} anchor="end" weight={800}>
        Ica
      </M>
      <Dot cx={A[0]} cy={A[1]} r="7" fill={N} />
      <Dot cx={B[0]} cy={B[1]} r="7" fill={N} />
      <Dot cx={C[0]} cy={C[1]} r="7" fill={N} />
      <Wire d={`M${A[0]} ${A[1]} L${A[0]} 56`} stroke={N} width="2.4" marker="url(#ecaArr)" />
      <Wire d={`M${B[0]} ${B[1]} L448 352`} stroke={N} width="2.4" marker="url(#ecaArr)" />
      <Wire d={`M${C[0]} ${C[1]} L52 352`} stroke={N} width="2.4" marker="url(#ecaArr)" />
      {/* All three sit left of x = 520, where the info panels begin — the
          panels paint on top of anything that drifts under them. */}
      {[
        ['IA = Iab − Ica', 262, 44, BLUE, 'start'],
        ['IB = Ibc − Iab', 438, 336, AMBER, 'end'],
        ['IC = Ica − Ibc', 62, 336, PURP, 'start'],
      ].map(([eq, x, y, tone, anchor], i) => (
        <M key={eq} x={x} y={y} size={10.5} fill={tone} anchor={anchor} weight={800} className={`ecam-cell-in ecam-delay-${i}`}>
          {eq}
        </M>
      ))}

      <rect x="520" y="62" width="330" height="172" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <M x="685" y="86" size={11} fill={GREEN} weight={800}>
        balanced
      </M>
      <Plane cx="685" cy="160" r="60" xLabel="" yLabel="" tone={MUTED} />
      {[[90, BLUE, 44], [-30, AMBER, 44], [210, PURP, 44]].map(([a, tone, l], i) => (
        <Phasor key={i} ox="685" oy="160" ang={a} len={l} label="" tone={tone} />
      ))}
      {[[60, GREEN, 58], [-60, GREEN, 58], [180, GREEN, 58]].map(([a, tone, l], i) => (
        <Phasor key={`l${i}`} ox="685" oy="160" ang={a} len={l} label="" tone={tone} dash="5 4" width="2" />
      ))}
      <M x="685" y="226" size={10} fill={GREEN} weight={800}>
        line = √3 × branch, at 30°
      </M>

      <rect x="520" y="254" width="330" height="172" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.3" />
      <M x="685" y="278" size={11} fill={RED} weight={800}>
        unbalanced
      </M>
      <Plane cx="685" cy="352" r="60" xLabel="" yLabel="" tone={MUTED} />
      {[[100, BLUE, 52], [-22, AMBER, 30], [222, PURP, 42]].map(([a, tone, l], i) => (
        <Phasor key={i} ox="685" oy="352" ang={a} len={l} label="" tone={tone} />
      ))}
      <g className="ecam-pulse">
        <M x="685" y="418" size={10} fill={RED} weight={800}>
          no √3 relation at all
        </M>
      </g>
    </Scene>
  )
}

export function UnbalancedPowerScene() {
  const tri = [
    ['phase a', 130, 34, BLUE],
    ['phase b', 340, 52, AMBER],
    ['phase c', 550, 18, PURP],
  ]
  return (
    <Scene caption="Add P and Q phase by phase — there is no single power factor angle to use">
      {tri.map(([lab, x, ang, tone], i) => {
        const w = 130
        const h = w * Math.tan((ang * Math.PI) / 180)
        return (
          <g key={lab} className={`ecam-cell-in ecam-delay-${i}`}>
            <path d={`M${x} 190 L${x + w} 190 L${x + w} ${190 - h} Z`} fill={tone} fillOpacity="0.16" stroke={tone} strokeWidth="2.4" />
            <M x={x + w / 2} y="210" size={10.5} fill={tone} weight={800}>
              {`P${i + 1}`}
            </M>
            <M x={x + w + 14} y={190 - h / 2} size={10.5} fill={tone} anchor="start" weight={800}>
              {`Q${i + 1}`}
            </M>
            <M x={x + w / 2} y="106" size={10.5} fill={MUTED}>
              {`${lab} · φ = ${ang}°`}
            </M>
          </g>
        )
      })}
      <Bars x="130" y="240" w="220" items={[['ΣP', 3, GREEN], ['ΣQ', 1.6, TEAL]]} rowH={44} max={3.4} />

      <g className="ecam-slide-in ecam-delay-3">
        <rect x="520" y="236" width="330" height="80" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.4" />
        <M x="685" y="272" size={13} fill={N} weight={800}>
          √3·V_L·I_L·cos φ
        </M>
        <Wire d="M566 267 L804 267" stroke={RED} width="2.6" className="ecam-emerge" />
        <M x="685" y="300" size={10} fill={RED} weight={800}>
          no single φ exists here
        </M>
      </g>

      <Wire d="M130 430 L820 430" stroke={MUTED} width="1.6" opacity="0.6" />
      <Wire d="M130 372 L820 372" stroke={MUTED} width="2" dash="6 5" />
      <M x="814" y="364" size={10} fill={MUTED} anchor="end" weight={800}>
        balanced case: flat
      </M>
      <Curve
        pts={Array.from({ length: 121 }, (_, i) => {
          const t = i / 120
          const th = 2 * Math.PI * 2 * t
          const p = 1.0 * Math.sin(th) ** 2 + 0.7 * Math.sin(th - 2.094) ** 2 + 1.3 * Math.sin(th + 2.094) ** 2
          return [130 + t * 690, 430 - 38 * p]
        })}
        stroke={ROSE}
        width="2.8"
        className="ecam-draw ecam-delay-4"
      />
      <M x="450" y="460" size={10.5} fill={ROSE} weight={800}>
        unbalanced: the total ripples
      </M>
    </Scene>
  )
}

export function TwoWattmeterScene() {
  return (
    <Scene caption="Two meters, three wires, any load — and a negative reading is arithmetic, not a fault">
      <Wire d="M80 100 L400 100 M80 220 L400 220 M80 340 L400 340" stroke={N} width="2.6" />
      <M x="66" y="104" size={11} fill={N} anchor="end" weight={800}>A</M>
      <M x="66" y="224" size={11} fill={N} anchor="end" weight={800}>B</M>
      <M x="66" y="344" size={11} fill={N} anchor="end" weight={800}>C</M>
      <Meter cx="190" cy="100" kind="W" tone={BLUE} className="ecam-needle" />
      <Meter cx="190" cy="220" kind="W" tone={AMBER} className="ecam-needle" />
      <M x="190" y="70" size={10.5} fill={BLUE} weight={800}>W1</M>
      <M x="190" y="256" size={10.5} fill={AMBER} weight={800}>W2</M>
      <Wire d="M212 112 L260 160 L260 340" stroke={BLUE} width="1.8" dash="5 4" />
      <Wire d="M212 232 L300 280 L300 340" stroke={AMBER} width="1.8" dash="5 4" />
      <M x="278" y="366" size={10} fill={MUTED}>
        both voltage coils reference line C
      </M>
      <Block x="400" y="88" w="70" h="264" label="load" stroke={MUTED} />
      <M x="120" y="392" size={10.5} fill={MUTED} anchor="start">
        current coils in lines A and B only
      </M>
      <g className="ecam-emerge">
        <rect x="80" y="414" width="390" height="46" rx="10" fill={SKY} stroke={GREEN} strokeWidth="2.4" />
        <M x="275" y="444" size={13} fill={GREEN} weight={800}>
          P_total = W1 + W2, algebraic sum
        </M>
      </g>

      <Wire d="M540 380 L850 380" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M540 440 L540 100" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M540 300 L840 300" stroke={MUTED} width="1.4" dash="5 5" />
      <M x="530" y="304" size={10} fill={MUTED} anchor="end">0</M>
      <L x="840" y="416" size={11.5} fill={MUTED} weight={700} anchor="end">
        power factor, 1 → 0
      </L>
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const pf = 1 - i / 40
          const phi = Math.acos(Math.max(0.001, pf))
          return [540 + (i / 40) * 290, 300 - 110 * Math.cos(phi - Math.PI / 6)]
        })}
        stroke={BLUE}
        width="3"
        className="ecam-draw ecam-delay-2"
      />
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const pf = 1 - i / 40
          const phi = Math.acos(Math.max(0.001, pf))
          return [540 + (i / 40) * 290, 300 - 110 * Math.cos(phi + Math.PI / 6)]
        })}
        stroke={AMBER}
        width="3"
        className="ecam-draw ecam-delay-3"
      />
      <g className="ecam-pulse">
        <circle cx="685" cy="300" r="16" fill="none" stroke={RED} strokeWidth="2.6" />
        <M x="712" y="338" size={10.5} fill={RED} anchor="start" weight={800}>
          W2 goes negative at pf 0.5
        </M>
        <M x="712" y="356" size={10} fill={MUTED} anchor="start">
          correct, not a fault
        </M>
      </g>
      <M x="566" y="176" size={10} fill={MUTED} anchor="start">
        equal at unity pf
      </M>
    </Scene>
  )
}

export function TwoPortAbstractionScene() {
  return (
    <Scene caption="Four numbers replace the schematic — and four numbers is what you can multiply">
      <Port2 x="150" y="84" w="230" h="150" tone={MUTED} faint className="ecam-collapse" />
      <g opacity="0.3">
        <Res x="220" y="122" len="56" tone={MUTED} />
        <Res x="300" y="160" len="56" orient="v" tone={MUTED} />
        <Res x="330" y="196" len="56" tone={MUTED} />
        <Src cx="230" cy="196" kind="v" tone={MUTED} r="14" />
      </g>
      <M x="116" y="104" size={11} fill={BLUE} anchor="end" weight={800}>V₁</M>
      <M x="116" y="216" size={11} fill={BLUE} anchor="end" weight={800}>I₁</M>
      <M x="426" y="104" size={11} fill={TEAL} anchor="start" weight={800}>V₂</M>
      <M x="426" y="216" size={11} fill={TEAL} anchor="start" weight={800}>I₂</M>
      <M x="265" y="264" size={10.5} fill={MUTED}>
        port condition: current in = current out at each pair
      </M>

      <Wire d="M470 160 L530 160" stroke={PURP} width="3.2" marker="url(#ecaArrP)" className="ecam-flow-arrow" />
      <g className="ecam-pop">
        <Matrix x="590" y="120" rows={[['Z₁₁', 'Z₁₂'], ['Z₂₁', 'Z₂₂']]} cell="56" accent={BLUE} />
        <M x="646" y="252" size={10.5} fill={BLUE} weight={800}>
          four numbers
        </M>
      </g>

      {[0, 1, 2].map((i) => (
        <g key={i} className={`ecam-cell-in ecam-delay-${i}`}>
          <Port2 x={92 + i * 244} y="316" w="150" h="92" tone={[BLUE, AMBER, TEAL][i]} label={`[T${i + 1}]`} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <M key={i} x={266 + i * 244} y="368" size={16} fill={N} weight={800}>
          ×
        </M>
      ))}
      <M x="450" y="440" size={11} fill={MUTED} weight={800}>
        this is why parameters beat schematics
      </M>
    </Scene>
  )
}

export function ZParameterScene() {
  const cells = [
    ['Z₁₁ = V₁/I₁', 'drive port 1, port 2 open', 'left'],
    ['Z₂₁ = V₂/I₁', 'drive port 1, measure port 2', 'left'],
    ['Z₁₂ = V₁/I₂', 'drive port 2, port 1 open', 'right'],
    ['Z₂₂ = V₂/I₂', 'drive port 2, measure port 2', 'right'],
  ]
  return (
    <Scene caption="Open the far port, drive the near one — every Z parameter is one measurement">
      {cells.map(([formula, note, drive], i) => {
        const x = 44 + (i % 2) * 300
        const y = 62 + Math.floor(i / 2) * 156
        return (
          <g key={formula} className={`ecam-cell-in ecam-delay-${i}`}>
            <rect x={x} y={y} width="278" height="140" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
            <Block x={x + 88} y={y + 44} w="100" h="60" label="N" stroke={MUTED} />
            <Wire d={`M${x + 36} ${y + 60} L${x + 88} ${y + 60} M${x + 36} ${y + 88} L${x + 88} ${y + 88}`} stroke={N} width="2.2" />
            <Wire d={`M${x + 188} ${y + 60} L${x + 226} ${y + 60} M${x + 188} ${y + 88} L${x + 226} ${y + 88}`} stroke={N} width="2.2" />
            {drive === 'left' ? (
              <g>
                <Src cx={x + 36} cy={y + 74} kind="i" tone={BLUE} r="14" />
                <g className="ecam-pulse">
                  <rect x={x + 228} y={y + 52} width="28" height="44" rx="6" fill={AMBER} fillOpacity="0.2" stroke={AMBER} strokeWidth="2.2" />
                </g>
                <M x={x + 242} y={y + 114} size={9.5} fill={AMBER} weight={800}>
                  I₂ = 0
                </M>
              </g>
            ) : (
              <g>
                <Src cx={x + 226} cy={y + 74} kind="i" tone={BLUE} r="14" />
                <g className="ecam-pulse">
                  <rect x={x + 8} y={y + 52} width="28" height="44" rx="6" fill={AMBER} fillOpacity="0.2" stroke={AMBER} strokeWidth="2.2" />
                </g>
                <M x={x + 22} y={y + 114} size={9.5} fill={AMBER} weight={800}>
                  I₁ = 0
                </M>
              </g>
            )}
            <M x={x + 139} y={y + 26} size={12.5} fill={BLUE} weight={800}>
              {formula}
            </M>
            <M x={x + 139} y={y + 132} size={9.5} fill={MUTED}>
              {note}
            </M>
          </g>
        )
      })}
      <Panel
        x="660"
        y="112"
        w="200"
        title="the matrix it builds"
        rows={[['V₁', 'Z₁₁I₁ + Z₁₂I₂'], ['V₂', 'Z₂₁I₁ + Z₂₂I₂'], ['use', 'series connection'], ['fails', 'if no Z exists']]}
        accent={TEAL}
        className="ecam-slide-in ecam-delay-4"
        rowH={30}
      />
      <M x="450" y="404" size={11} fill={MUTED} weight={800}>
        four setups, four numbers — and an open circuit is just I = 0
      </M>
    </Scene>
  )
}

export function YParameterPiScene() {
  return (
    <Scene caption="Short the far port instead, and the π network reads its own parameters off the arms">
      {['Y₁₁ = I₁/V₁', 'Y₂₁ = I₂/V₁', 'Y₁₂ = I₁/V₂', 'Y₂₂ = I₂/V₂'].map((f, i) => {
        const x = 44 + (i % 2) * 226
        const y = 66 + Math.floor(i / 2) * 174
        return (
          <g key={f} className={`ecam-cell-in ecam-delay-${i}`}>
            <rect x={x} y={y} width="206" height="156" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.2" />
            <M x={x + 103} y={y + 26} size={12} fill={TEAL} weight={800}>
              {f}
            </M>
            <Block x={x + 68} y={y + 52} w="72" h="56" label="N" stroke={MUTED} />
            <Wire d={`M${x + 32} ${y + 66} L${x + 68} ${y + 66} M${x + 32} ${y + 94} L${x + 68} ${y + 94}`} stroke={N} width="2.2" />
            <Wire d={`M${x + 140} ${y + 66} L${x + 174} ${y + 66} M${x + 140} ${y + 94} L${x + 174} ${y + 94}`} stroke={N} width="2.2" />
            {i < 2 ? (
              <g>
                <Src cx={x + 32} cy={y + 80} kind="v" tone={TEAL} r="14" />
                <Wire d={`M${x + 174} ${y + 66} L${x + 174} ${y + 94}`} stroke={BLUE} width="4.4" className="ecam-pulse" />
                <M x={x + 174} y={y + 118} size={9.5} fill={BLUE} weight={800}>
                  V₂ = 0
                </M>
              </g>
            ) : (
              <g>
                <Src cx={x + 174} cy={y + 80} kind="v" tone={TEAL} r="14" />
                <Wire d={`M${x + 32} ${y + 66} L${x + 32} ${y + 94}`} stroke={BLUE} width="4.4" className="ecam-pulse" />
                <M x={x + 32} y={y + 118} size={9.5} fill={BLUE} weight={800}>
                  V₁ = 0
                </M>
              </g>
            )}
            <M x={x + 103} y={y + 144} size={9.5} fill={MUTED}>
              {i < 2 ? 'drive port 1' : 'drive port 2'}
            </M>
          </g>
        )
      })}

      <rect x="508" y="66" width="348" height="356" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.4" />
      <M x="682" y="94" size={12} fill={PURP} weight={800}>
        the π network reads itself
      </M>
      <Wire d="M548 150 L816 150" stroke={N} width="2.4" />
      <Wire d="M548 300 L816 300" stroke={N} width="2.4" />
      <Res x="682" y="150" len="110" label="Yb" tone={AMBER} />
      <Res x="580" y="225" len="110" orient="v" label="Ya" tone={BLUE} />
      <Res x="784" y="225" len="110" orient="v" label="Yc" tone={TEAL} />
      <Wire d="M580 150 L580 170 M580 280 L580 300 M784 150 L784 170 M784 280 L784 300" stroke={N} width="2.4" />
      {[
        ['Y₁₁ = Ya + Yb', 344, BLUE],
        ['Y₂₂ = Yc + Yb', 368, TEAL],
        ['Y₁₂ = Y₂₁ = −Yb', 396, AMBER],
      ].map(([t, y, tone], i) => (
        <M key={t} x="682" y={y} size={12} fill={tone} weight={800} className={`ecam-cell-in ecam-delay-${i}`}>
          {t}
        </M>
      ))}
      <g className="ecam-pulse">
        <circle cx="646" cy="391" r="13" fill="none" stroke={RED} strokeWidth="2.4" />
      </g>
      <M x="682" y="418" size={9.5} fill={RED}>
        the minus is the current-direction convention, not an error
      </M>
    </Scene>
  )
}

export function AbcdCascadeScene() {
  return (
    <Scene caption="Cascade is a product, and a product does not commute — the order is the signal flow">
      <g className="ecam-cell-in">
        <Wire d="M600 84 L660 84" stroke={AMBER} width="2.6" marker="url(#ecaArrA)" />
        <M x="676" y="88" size={10.5} fill={AMBER} anchor="start" weight={800}>
          I₂ leaves the network — hence the minus signs
        </M>
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} className={`ecam-cell-in ecam-delay-${i}`}>
          <Port2 x={110 + i * 244} y="112" w="150" h="100" tone={[BLUE, AMBER, TEAL][i]} label={`[T${i + 1}]`} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <Wire key={i} d={`M${294 + i * 244} 138 L${320 + i * 244} 138 M${294 + i * 244} 186 L${320 + i * 244} 186`} stroke={N} width="2.3" />
      ))}

      {[0, 1, 2].map((i) => (
        <g key={`m${i}`} className={`ecam-slide-in ecam-delay-${i}`}>
          <Matrix x={130 + i * 210} y="276" rows={[['A', 'B'], ['C', 'D']]} cell="38" accent={[BLUE, AMBER, TEAL][i]} size={12} />
        </g>
      ))}
      {[0, 1].map((i) => (
        <M key={`x${i}`} x={250 + i * 210} y="320" size={16} fill={N} weight={800}>
          ×
        </M>
      ))}
      <M x="670" y="320" size={16} fill={N} weight={800}>
        =
      </M>
      <g className="ecam-pop">
        <Matrix x="712" y="276" rows={[['A′', 'B′'], ['C′', 'D′']]} cell="40" accent={GREEN} size={12} />
        <rect x="694" y="262" width="118" height="110" rx="10" fill="none" stroke={GREEN} strokeWidth="2.6" />
      </g>

      <g className="ecam-slide-in ecam-delay-4">
        <rect x="180" y="392" width="540" height="56" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.4" />
        <L x="450" y="418" size={12.5} fill={RED}>
          matrix multiplication does not commute
        </L>
        <M x="450" y="438" size={10.5} fill={MUTED}>
          [T₁][T₂] ≠ [T₂][T₁] — write them in the order the signal meets them
        </M>
      </g>
    </Scene>
  )
}

export function ConversionWheelScene() {
  const nodes = [
    ['Z', 450, 110, BLUE, 'series connection'],
    ['Y', 690, 250, TEAL, 'parallel connection'],
    ['ABCD', 450, 390, PURP, 'cascade'],
    ['h', 210, 250, AMBER, 'transistor models'],
  ]
  return (
    <Scene caption="One network, four descriptions — pick the one the next step can add or multiply">
      <circle cx="450" cy="250" r="140" fill="none" stroke={MUTED} strokeWidth="1.6" strokeDasharray="7 6" />
      <g className="ecam-emerge">
        <rect x="378" y="228" width="144" height="46" rx="12" fill={N} />
        <L x="450" y="257" size={12.5} fill={WHITE}>
          same network
        </L>
      </g>
      {nodes.map(([name, cx, cy, tone, use], i) => (
        <g key={name} className={`ecam-cell-in ecam-delay-${i}`}>
          <circle cx={cx} cy={cy} r="42" fill={WHITE} stroke={tone} strokeWidth="3" />
          <L x={cx} y={cy + 7} size={16} fill={tone}>
            {name}
          </L>
          <rect
            x={cx - 96}
            y={cy < 250 ? cy - 96 : cy + 54}
            width="192"
            height="34"
            rx="9"
            fill={tone}
            fillOpacity="0.12"
            stroke={tone}
            strokeWidth="2"
          />
          <M x={cx} y={(cy < 250 ? cy - 96 : cy + 54) + 22} size={10.5} fill={tone} weight={800}>
            {use}
          </M>
        </g>
      ))}
      <g className="ecam-draw ecam-delay-2">
        <Wire d="M450 152 L690 208" stroke={MUTED} width="2" marker="url(#ecaArrM)" />
        <Wire d="M690 292 L450 348" stroke={MUTED} width="2" marker="url(#ecaArrM)" />
        <Wire d="M450 348 L210 292" stroke={MUTED} width="2" marker="url(#ecaArrM)" />
        <Wire d="M210 208 L450 152" stroke={MUTED} width="2" marker="url(#ecaArrM)" />
      </g>
      <M x="600" y="164" size={10} fill={MUTED} anchor="start" weight={800}>
        matrix inverse
      </M>
      <M x="300" y="164" size={10} fill={MUTED} anchor="end" weight={800}>
        rearrange
      </M>
      <M x="600" y="344" size={10} fill={MUTED} anchor="start" weight={800}>
        solve for V₁, I₁
      </M>
      <M x="300" y="344" size={10} fill={MUTED} anchor="end" weight={800}>
        mixed variables
      </M>
    </Scene>
  )
}

export function ReciprocitySymmetryScene() {
  const rows = [
    ['Z parameters', 'Z₁₂ = Z₂₁', 'Z₁₁ = Z₂₂', BLUE],
    ['Y parameters', 'Y₁₂ = Y₂₁', 'Y₁₁ = Y₂₂', TEAL],
    ['ABCD', 'AD − BC = 1', 'A = D', PURP],
  ]
  return (
    <Scene caption="Reciprocity is about the off-diagonal; symmetry is about the diagonal">
      <rect x="44" y="62" width="500" height="32" rx="9" fill={N} />
      <M x="140" y="84" size={11} fill={WHITE} weight={800}>
        parameter set
      </M>
      <M x="330" y="84" size={11} fill={WHITE} weight={800}>
        reciprocal if
      </M>
      <M x="470" y="84" size={11} fill={WHITE} weight={800}>
        symmetrical if
      </M>
      {rows.map(([name, rec, sym, tone], i) => (
        <g key={name} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x="44" y={104 + i * 54} width="500" height="44" rx="9" fill={WHITE} stroke={tone} strokeWidth="2.1" />
          <L x="64" y={132 + i * 54} size={12.5} anchor="start" fill={tone}>
            {name}
          </L>
          <M x="330" y={132 + i * 54} size={12} fill={N}>
            {rec}
          </M>
          <M x="470" y={132 + i * 54} size={12} fill={N}>
            {sym}
          </M>
        </g>
      ))}

      {[
        ['unequal-arm T', 'reciprocal, not symmetrical', GREEN, 62, 288, [46, 74]],
        ['equal-arm T', 'both', GREEN, 302, 288, [60, 60]],
      ].map(([title, tag, tone, x, y, arms], i) => (
        <g key={title} className={`ecam-slide-in ecam-delay-${i}`}>
          <rect x={x} y={y} width="222" height="150" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x={x + 111} y={y + 24} size={11} fill={tone} weight={800}>
            {title}
          </M>
          <Wire d={`M${x + 24} ${y + 66} L${x + 198} ${y + 66}`} stroke={N} width="2.2" />
          <Res x={x + 62} y={y + 66} len={arms[0]} label="R1" tone={N} />
          <Res x={x + 160} y={y + 66} len={arms[1]} label="R2" tone={N} />
          <Res x={x + 111} y={y + 104} len="46" orient="v" label="R3" tone={N} />
          <Wire d={`M${x + 111} ${y + 66} L${x + 111} ${y + 81} M${x + 111} ${y + 127} L${x + 111} ${y + 134} L${x + 24} ${y + 134} M${x + 111} ${y + 134} L${x + 198} ${y + 134}`} stroke={N} width="2.2" />
          <M x={x + 111} y={y + 146} size={9.5} fill={tone} weight={800}>
            {tag}
          </M>
        </g>
      ))}

      <g className="ecam-pulse">
        <rect x="572" y="288" width="278" height="150" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.6" />
        <M x="711" y="314" size={11} fill={RED} weight={800}>
          with a dependent source
        </M>
        <Wire d="M600 366 L650 366" stroke={N} width="2.2" />
        <Res x="672" y="366" len="44" label="" tone={N} />
        <Src cx="740" cy="366" kind="i" tone={RED} dep r="20" />
        <Wire d="M694 366 L720 366 M760 366 L820 366" stroke={N} width="2.2" />
        <M x="711" y="412" size={10} fill={RED} weight={800}>
          neither — and that is correct for an amplifier
        </M>
      </g>

      <g className="ecam-slide-in ecam-delay-4">
        <rect x="572" y="104" width="278" height="150" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.2" />
        <M x="711" y="130" size={11} fill={MUTED} weight={800}>
          the shortcut
        </M>
        <M x="711" y="166" size={11} fill={N}>
          reciprocal ⇒ 3 independent
        </M>
        <M x="711" y="192" size={11} fill={N}>
          numbers, not 4
        </M>
        <M x="711" y="226" size={11} fill={N}>
          symmetrical ⇒ only 2
        </M>
      </g>
    </Scene>
  )
}

export function InterconnectionRulesScene() {
  const rules = [
    ['series', '[Z] = [Za] + [Zb]', BLUE, '+'],
    ['parallel', '[Y] = [Ya] + [Yb]', TEAL, '+'],
    ['cascade', '[T] = [Ta]·[Tb]', PURP, '×'],
  ]
  return (
    <Scene caption="Match the parameter set to the connection and the interconnection is one line of algebra">
      {rules.map(([name, op, tone, sym], i) => (
        <g key={name} className={`ecam-cell-in ecam-delay-${i}`}>
          <rect x="44" y={62 + i * 128} width="812" height="116" rx="12" fill={WHITE} stroke={tone} strokeWidth={i === 2 ? 3 : 2.2} />
          <M x="96" y={126 + i * 128} size={12.5} fill={tone} anchor="start" weight={800}>
            {name}
          </M>
          {i === 2 ? (
            <g>
              <Port2 x="216" y={86 + i * 128} w="110" h="68" tone={tone} label="a" />
              <Port2 x="416" y={86 + i * 128} w="110" h="68" tone={tone} label="b" />
              <Wire d={`M360 ${112 + i * 128} L382 ${112 + i * 128} M360 ${138 + i * 128} L382 ${138 + i * 128}`} stroke={N} width="2.2" />
            </g>
          ) : (
            <g>
              <Port2 x="216" y={74 + i * 128} w="110" h="46" tone={tone} label="a" />
              <Port2 x="216" y={132 + i * 128} w="110" h="46" tone={tone} label="b" />
              <Wire
                d={`M182 ${88 + i * 128} L160 ${88 + i * 128} L160 ${146 + i * 128} L182 ${146 + i * 128} M360 ${88 + i * 128} L384 ${88 + i * 128} L384 ${146 + i * 128} L360 ${146 + i * 128}`}
                stroke={i === 0 ? tone : MUTED}
                width="2.2"
                dash={i === 1 ? '5 4' : undefined}
              />
            </g>
          )}
          <g className={i === 2 ? 'ecam-pulse' : ''}>
            <rect x="600" y={94 + i * 128} width="230" height="52" rx="10" fill={tone} fillOpacity="0.12" stroke={tone} strokeWidth="2.4" />
            <M x="715" y={126 + i * 128} size={14} fill={tone} weight={800}>
              {op}
            </M>
          </g>
          <M x="566" y={126 + i * 128} size={20} fill={tone} weight={800}>
            {sym}
          </M>
        </g>
      ))}
      <M x="450" y="460" size={11} fill={MUTED} weight={800}>
        add for series and parallel; multiply for cascade
      </M>
    </Scene>
  )
}

export function PracticalTwoPortScene() {
  return (
    <Scene caption="One characterisation, reused at every frequency and in every chain">
      <rect x="44" y="62" width="270" height="200" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.3" />
      <M x="179" y="86" size={11.5} fill={BLUE} weight={800}>
        one L-section
      </M>
      <Wire d="M74 132 L112 132" stroke={N} width="2.3" />
      <Ind x="160" y="132" len="80" label="sL" tone={PURP} />
      <Wire d="M200 132 L232 132" stroke={N} width="2.3" />
      <Cap x="232" y="176" len="66" orient="v" label="sC" tone={AMBER} />
      <Wire d="M232 132 L232 152 M232 200 L232 220 L74 220 L74 132" stroke={N} width="2.3" />
      <Wire d="M232 132 L284 132 M232 220 L284 220" stroke={N} width="2.3" />
      <M x="179" y="248" size={10.5} fill={MUTED}>
        A = 1 + s²LC · B = sL · C = sC · D = 1
      </M>

      {[0, 1, 2, 3].map((i) => (
        <g key={i} className={`ecam-cell-in ecam-delay-${i}`}>
          <Block x={352 + i * 96} y="92" w="76" h="76" label={`T${i + 1}`} stroke={TEAL} />
          {i < 3 ? <Wire d={`M${428 + i * 96} 130 L${448 + i * 96} 130`} stroke={N} width="2.2" /> : null}
        </g>
      ))}
      <g className="ecam-emerge">
        <rect x="352" y="192" width="460" height="52" rx="10" fill={SKY} stroke={TEAL} strokeWidth="2.4" />
        <M x="582" y="224" size={13} fill={TEAL} weight={800}>
          [T]⁴ = [T]·[T]·[T]·[T]
        </M>
      </g>

      <Wire d="M110 430 L830 430" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <Wire d="M110 430 L110 290" stroke={MUTED} width="2.2" marker="url(#ecaArr)" />
      <L x="820" y="464" size={11.5} fill={MUTED} weight={700} anchor="end">
        frequency
      </L>
      {[
        [1, BLUE, '1 section'],
        [2, AMBER, '2 sections'],
        [4, PURP, '4 sections'],
      ].map(([k, tone, lab], i) => (
        <g key={lab} className={`ecam-draw ecam-delay-${i}`}>
          <Curve
            pts={Array.from({ length: 61 }, (_, j) => {
              const t = j / 60
              const mag = 1 / (1 + (2.4 * t) ** 2) ** (k / 2)
              return [110 + t * 700, 430 - 128 * mag]
            })}
            stroke={tone}
            width="2.8"
          />
          <M x={330 + i * 160} y={324 + i * 26} size={10.5} fill={tone} weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <M x="640" y="398" size={10.5} fill={MUTED}>
        more sections, steeper roll-off
      </M>
    </Scene>
  )
}

/* ── Binding: Phase-1 `visual` id → the scene that realises it ──── */

const VISUAL_MAP = {
  // Module 1 — circuits, sources, systematic analysis
  'lumped-versus-distributed': LumpedVsDistributedScene,
  'circuit-classification-axes': CircuitClassificationScene,
  'voltage-source-droop': VoltageSourceDroopScene,
  'current-source-duality': CurrentSourceDualityScene,
  'four-dependent-sources': FourDependentSourcesScene,
  'source-transformation-pair': SourceTransformationScene,
  'source-shift-before-after': SourceShiftScene,
  'star-delta-bridge-unlock': StarDeltaBridgeScene,
  'equation-count-ledger': EquationCountLedgerScene,
  'mesh-matrix-assembly': MeshMatrixAssemblyScene,
  'dependent-source-constraint': DependentConstraintScene,
  'supermesh-path': SupermeshScene,
  'node-matrix-assembly': NodeMatrixAssemblyScene,
  'supernode-surface': SupernodeScene,
  'impedance-substitution-map': ImpedanceSubstitutionScene,
  'duality-pair-construction': DualityPairScene,

  // Module 2 — network theorems
  'theorem-selection-map': TheoremSelectionScene,
  'linearity-two-properties': LinearityScene,
  'superposition-decomposition': SuperpositionScene,
  'power-cross-term': PowerCrossTermScene,
  'dependent-source-in-partials': DependentPartialsScene,
  'reciprocity-swap': ReciprocityScene,
  'thevenin-black-box': TheveninBlackBoxScene,
  'rth-deactivation-steps': RthDeactivationScene,
  'test-source-method': TestSourceScene,
  'norton-thevenin-duality': NortonDualityScene,
  'max-power-curve-and-efficiency': MaxPowerCurveScene,
  'conjugate-match-phasor': ConjugateMatchScene,
  'ac-thevenin-frequency-sweep': AcTheveninSweepScene,
  'theorem-validity-with-dependents': TheoremValidityScene,
  'theorem-decision-and-check': TheoremDecisionScene,
  'four-methods-one-answer': FourMethodsScene,

  // Module 3 — resonance, initial conditions, transients
  'series-rlc-impedance-sweep': SeriesRlcSweepScene,
  'resonance-condition-derivation': ResonanceConditionScene,
  'voltage-magnification-phasors': VoltageMagnificationScene,
  'half-power-bandwidth': HalfPowerBandwidthScene,
  'q-three-meanings': QThreeMeaningsScene,
  'lc-product-ratio-knobs': LcKnobsScene,
  'parallel-resonance-duality': ParallelResonanceDualityScene,
  'practical-tank-shift': PracticalTankShiftScene,
  'initial-final-sandwich': InitialFinalSandwichScene,
  'element-equivalents-table': ElementEquivalentsScene,
  'three-circuit-procedure': ThreeCircuitProcedureScene,
  'parallel-initial-conditions': ParallelInitialConditionsScene,
  'rl-rise-and-spike': RlRiseSpikeScene,
  'rc-charge-and-inrush': RcChargeInrushScene,
  'tau-geometry': TauGeometryScene,
  'end-to-end-transient-worksheet': TransientWorksheetScene,

  // Module 4 — the Laplace method
  'phasor-vs-laplace-coverage': PhasorVsLaplaceScene,
  'transform-integral-anatomy': TransformIntegralScene,
  'singularity-function-chain': SingularityChainScene,
  'pole-position-waveform-map': PoleWaveformMapScene,
  'differentiation-property-bridge': DifferentiationBridgeScene,
  'shifting-theorems-pair': ShiftingTheoremsScene,
  'initial-value-theorem-check': InitialValueTheoremScene,
  'final-value-validity': FinalValueValidityScene,
  'transformed-element-models': TransformedElementsScene,
  'sdomain-toolbox-reuse': SdomainToolboxScene,
  'cover-up-residue-method': CoverUpResidueScene,
  'repeated-and-complex-poles': RepeatedComplexPolesScene,
  'waveform-synthesis-stack': WaveformSynthesisScene,
  'periodic-transform-factor': PeriodicTransformScene,
  'pole-zero-plot-reading': PoleZeroReadingScene,
  'laplace-procedure-flow': LaplaceProcedureScene,

  // Module 5 — unbalanced three phase and two-port networks
  'balanced-three-phase-advantages': ThreePhaseAdvantageScene,
  'balanced-versus-unbalanced-phasors': BalanceComparisonScene,
  'four-wire-decoupling': FourWireDecouplingScene,
  'neutral-shift-phasor': NeutralShiftScene,
  'millman-weighted-average': MillmanBalanceScene,
  'unbalanced-delta-kcl': UnbalancedDeltaScene,
  'unbalanced-power-summation': UnbalancedPowerScene,
  'two-wattmeter-connection': TwoWattmeterScene,
  'two-port-abstraction': TwoPortAbstractionScene,
  'z-parameter-measurements': ZParameterScene,
  'y-parameter-and-pi': YParameterPiScene,
  'abcd-cascade-multiplication': AbcdCascadeScene,
  'parameter-set-conversion-wheel': ConversionWheelScene,
  'reciprocity-symmetry-conditions': ReciprocitySymmetryScene,
  'interconnection-three-rules': InterconnectionRulesScene,
  'practical-two-port-application': PracticalTwoPortScene,
}

/** Fallback for a unit whose `visual` id is not in the map: match on the words
 *  the topic and terms actually use. Order matters — the narrow patterns are
 *  tested before the broad ones. */
function matchKeyword(blob) {
  if (/lumped|distributed|wavelength/.test(blob)) return LumpedVsDistributedScene
  if (/supermesh/.test(blob)) return SupermeshScene
  if (/supernode/.test(blob)) return SupernodeScene
  if (/star.?delta|delta.?star|wye/.test(blob)) return StarDeltaBridgeScene
  if (/source transformation/.test(blob)) return SourceTransformationScene
  if (/source shift/.test(blob)) return SourceShiftScene
  if (/dependent source/.test(blob)) return FourDependentSourcesScene
  if (/mesh/.test(blob)) return MeshMatrixAssemblyScene
  if (/node voltage|nodal/.test(blob)) return NodeMatrixAssemblyScene
  if (/duality|dual/.test(blob)) return DualityPairScene
  if (/superposition/.test(blob)) return SuperpositionScene
  if (/linearity|homogeneity|additivity/.test(blob)) return LinearityScene
  if (/reciprocity/.test(blob)) return ReciprocityScene
  if (/norton/.test(blob)) return NortonDualityScene
  if (/thevenin/.test(blob)) return TheveninBlackBoxScene
  if (/maximum power|conjugate/.test(blob)) return MaxPowerCurveScene
  if (/bandwidth|half.?power/.test(blob)) return HalfPowerBandwidthScene
  if (/quality factor|selectivity|\bq\b/.test(blob)) return QThreeMeaningsScene
  if (/parallel resonance|tank/.test(blob)) return ParallelResonanceDualityScene
  if (/resonance|resonant/.test(blob)) return SeriesRlcSweepScene
  if (/time constant|\btau\b/.test(blob)) return TauGeometryScene
  if (/initial condition|final condition|continuity/.test(blob)) return InitialFinalSandwichScene
  if (/r-?l circuit|inductor transient/.test(blob)) return RlRiseSpikeScene
  if (/r-?c circuit|capacitor transient|inrush/.test(blob)) return RcChargeInrushScene
  if (/transient/.test(blob)) return TransientWorksheetScene
  if (/partial fraction|residue/.test(blob)) return CoverUpResidueScene
  if (/pole|zero/.test(blob)) return PoleZeroReadingScene
  if (/initial value theorem/.test(blob)) return InitialValueTheoremScene
  if (/final value theorem/.test(blob)) return FinalValueValidityScene
  if (/shifting|shift theorem/.test(blob)) return ShiftingTheoremsScene
  if (/periodic/.test(blob)) return PeriodicTransformScene
  if (/transformed circuit|s-?domain/.test(blob)) return TransformedElementsScene
  if (/laplace|transform/.test(blob)) return TransformIntegralScene
  if (/phasor/.test(blob)) return ImpedanceSubstitutionScene
  if (/impedance|admittance/.test(blob)) return ImpedanceSubstitutionScene
  if (/wattmeter/.test(blob)) return TwoWattmeterScene
  if (/neutral/.test(blob)) return NeutralShiftScene
  if (/millman/.test(blob)) return MillmanBalanceScene
  if (/delta load/.test(blob)) return UnbalancedDeltaScene
  if (/unbalanc/.test(blob)) return BalanceComparisonScene
  if (/three phase|3.?phase/.test(blob)) return ThreePhaseAdvantageScene
  if (/z.?parameter|open.?circuit impedance/.test(blob)) return ZParameterScene
  if (/y.?parameter|short.?circuit admittance/.test(blob)) return YParameterPiScene
  if (/abcd|transmission parameter|cascade/.test(blob)) return AbcdCascadeScene
  if (/two.?port/.test(blob)) return TwoPortAbstractionScene
  if (/kirchhoff|\bkcl\b|\bkvl\b/.test(blob)) return EquationCountLedgerScene
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
        <g key={String(st)} className={`ecam-slide-in ecam-delay-${i}`}>
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
      <g className="ecam-emerge">
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

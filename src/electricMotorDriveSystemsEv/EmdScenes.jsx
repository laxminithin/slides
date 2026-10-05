/**
 * EmdScenes — VTU BEE613D Electric Motor and Drive Systems for EVs classroom
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
    <div className={`emd-scene ${className}`} aria-label={caption || 'Electric Motor and Drive Systems diagram'}>
      <svg viewBox={vb} role="img" className="emd-svg">
        <defs>
          <marker id="emdArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="emdArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="emdArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="emdArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="emdArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="emdArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="emdArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="emdArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="emdArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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
  if (tone === BLUE) return 'emdArrB'
  if (tone === AMBER) return 'emdArrA'
  if (tone === ROSE) return 'emdArrRo'
  if (tone === GREEN) return 'emdArrG'
  if (tone === PURP) return 'emdArrP'
  if (tone === TEAL) return 'emdArrT'
  if (tone === RED) return 'emdArrR'
  if (tone === MUTED) return 'emdArrM'
  return 'emdArr'
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
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#emdArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#emdArr)" />
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
function Bars({ x, y, w, items = [], accent = BLUE, rowH = 34, className = 'emdm-bar', max }) {
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
          <g className={`${className} emdm-delay-${i % 5}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
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

/* ── EMD-specific primitives ────────────────────────────────────── */

/** Vehicle side-view silhouette — body, two wheels — the anchor for every
 *  force-balance and performance scene in Module 1. */
function Car({ x = 350, y = 260, w = 200, tone = N }) {
  const X = n(x)
  const Y = n(y)
  const W = n(w)
  return (
    <g>
      <path d={`M${X} ${Y} L${X + 20} ${Y - 40} L${X + W - 40} ${Y - 40} L${X + W} ${Y} Z`} fill={SKY} stroke={tone} strokeWidth="2.4" />
      <circle cx={X + 40} cy={Y + 10} r="20" fill={WHITE} stroke={tone} strokeWidth="2.4" />
      <circle cx={X + W - 40} cy={Y + 10} r="20" fill={WHITE} stroke={tone} strokeWidth="2.4" />
    </g>
  )
}

/* ── Module 1 — Introduction and Vehicle Fundamentals ─────────────── */

export function EvHistoryTimelineScene() {
  return (
    <Scene caption="Electric came first and lost to the starter motor and cheap petrol">
      <path d="M80 200 L780 200" stroke={MUTED} strokeWidth="2" markerEnd="url(#emdArr)" />
      <Curve pts={[[100, 160], [200, 100], [300, 190], [500, 190], [650, 150], [760, 90]]} stroke={BLUE} width="3" />
      <Dot cx="220" cy="150" r="6" fill={ROSE} />
      <M x="220" y="130" size={10.5} fill={ROSE}>starter motor</M>
      <Dot cx="300" cy="190" r="6" fill={AMBER} />
      <M x="330" y="215" size={10.5} fill={AMBER}>cheap petrol</M>
      <Bars x="150" y="300" w="560" items={[['petrol', 100, ROSE], ['lead-acid', 0.3, MUTED], ['Li-ion', 2, BLUE]]} max={100} />
      <M x="450" y="60" size={12} fill={MUTED} weight={700}>market share, 1880 → present</M>
    </Scene>
  )
}

export function HybridHistoryScene() {
  return (
    <Scene caption="Hybrids predate the First World War — electric flexibility without battery dependence">
      <Card x="60" y="80" w="330" h="140" title="Early hybrid, pre-1914" lines={['engine → generator → motor', 'same topology as today']} accent={MUTED} />
      <Card x="480" y="80" w="330" h="140" title="Modern hybrid" lines={['same topology', 'modern control electronics']} accent={BLUE} />
      <Wire d="M390 150 L480 150" stroke={AMBER} width="2.4" marker="url(#emdArrA)" />
      <M x="435" y="130" size={10} fill={AMBER}>decades gap</M>
      <Panel x="220" y="280" w="460" title="Why it gains despite mass" rows={[['engine', 'held near efficient band'], ['braking', 'recovered, not wasted']]} accent={GREEN} />
    </Scene>
  )
}

export function VehicleForceBalanceScene() {
  return (
    <Scene caption="Tractive effort minus three resistances equals mass times acceleration">
      <Car x="330" y="280" />
      <Wire d="M530 250 L610 250" stroke={GREEN} width="3" marker="url(#emdArrG)" />
      <M x="570" y="235" size={11} fill={GREEN}>F_traction</M>
      <Wire d="M330 250 L260 250" stroke={ROSE} width="2.4" marker="url(#emdArrRo)" />
      <M x="290" y="235" size={10} fill={ROSE}>roll + drag</M>
      <Wire d="M430 280 L400 340" stroke={AMBER} width="2.4" marker="url(#emdArrA)" />
      <M x="380" y="360" size={10} fill={AMBER}>F_grade</M>
      <Panel x="560" y="330" w="220" title="Balance" rows={[['m_eff', 'δ·m'], ['δ', '1.04–1.4']]} accent={TEAL} />
    </Scene>
  )
}

export function RollingResistanceScene() {
  return (
    <Scene caption="Rubber does not give the energy back — proportional to weight, largely speed-independent">
      <circle cx="300" cy="200" r="80" fill="none" stroke={N} strokeWidth="3" />
      <ellipse cx="300" cy="278" rx="60" ry="14" fill={MUTED} opacity="0.3" />
      <path d="M260 270 Q300 250 340 270" stroke={ROSE} strokeWidth="2.4" fill="none" />
      <M x="300" y="320" size={11} fill={ROSE}>contact patch, offset forward</M>
      <Axes x="500" y="280" w="240" h="200" xLabel="strain" yLabel="stress" />
      <path d="M520 260 Q600 100 720 260 Q600 200 520 260 Z" fill={AMBER} opacity="0.3" stroke={AMBER} strokeWidth="1.6" />
      <M x="620" y="300" size={10.5} fill={AMBER}>hysteresis loss</M>
      <Bars x="120" y="380" w="300" items={[['concrete', 0.013, GREEN], ['gravel', 0.02, AMBER], ['sand', 0.2, ROSE]]} max={0.2} />
    </Scene>
  )
}

export function DragSquareCubeScene() {
  return (
    <Scene caption="Force goes as speed squared, power as speed cubed — fast is expensive">
      <Axes x="90" y="220" w="300" h="150" xLabel="V" yLabel="F_drag" />
      <Curve pts={[[100, 210], [200, 190], [280, 130], [380, 70]]} stroke={BLUE} width="2.6" />
      <Axes x="450" y="420" w="300" h="350" xLabel="V" yLabel="P_drag" />
      <Curve pts={[[460, 400], [550, 380], [630, 260], [740, 60]]} stroke={ROSE} width="3" />
      <Dot cx="630" cy="260" r="6" fill={AMBER} />
      <M x="545" y="200" size={10} fill={AMBER}>120 km/h: 14.7 kW</M>
      <M x="640" y="40" size={12} fill={MUTED} weight={700}>double speed → 4× force, 8× power</M>
    </Scene>
  )
}

export function GradingResistanceScene() {
  return (
    <Scene caption="Weight times sine of slope — speed-independent, often larger than everything else">
      <path d="M100 380 L500 380 L700 180" stroke={N} strokeWidth="3" fill="none" />
      <Car x="480" y="260" w="140" />
      <Wire d="M550 260 L570 340" stroke={ROSE} width="2.6" marker="url(#emdArrRo)" />
      <M x="600" y="320" size={10.5} fill={ROSE}>mg sinα</M>
      <Bars x="120" y="60" w="620" items={[['rolling', 191, GREEN], ['drag @60', 110, BLUE], ['grade 6%', 883, ROSE]]} max={883} />
    </Scene>
  )
}

export function AdhesionLimitScene() {
  return (
    <Scene caption="Adhesion caps the usable force — weight transfer changes the cap as you accelerate">
      <Car x="330" y="260" />
      <Wire d="M370 280 L370 340" stroke={BLUE} width={6} marker="url(#emdArrB)" />
      <Wire d="M490 280 L490 340" stroke={AMBER} width={10} marker="url(#emdArrA)" />
      <M x="370" y="360" size={10} fill={BLUE}>front (light)</M>
      <M x="490" y="360" size={10} fill={AMBER}>rear (loaded)</M>
      <Axes x="90" y="420" w="300" h="220" xLabel="slip" yLabel="force" />
      <Curve pts={[[100, 400], [200, 240], [260, 260], [380, 340]]} stroke={ROSE} width="2.6" />
      <M x="250" y="220" size={10} fill={ROSE}>peak = adhesion limit</M>
    </Scene>
  )
}

export function TractiveEffortCurvesScene() {
  return (
    <Scene caption="Gear ratio trades torque for speed — each gear draws its own curve">
      <Axes x="90" y="400" w="660" h="320" xLabel="vehicle speed" yLabel="tractive effort" />
      {[1, 2, 3].map((g, i) => (
        <Curve key={g} pts={[[100, 130 + i * 60], [250 + i * 100, 130 + i * 60], [550 + i * 80, 380]]} stroke={[BLUE, TEAL, GREEN][i]} />
      ))}
      <Curve pts={[[100, 380], [740, 120]]} stroke={ROSE} dash="4 5" />
      <Dot cx="620" cy="220" r="6" fill={AMBER} />
      <M x="640" y="200" size={10} fill={AMBER}>max speed</M>
    </Scene>
  )
}

export function IdealVsRealScene() {
  return (
    <Scene caption="The ideal is constant power — a motor nearly achieves it, an engine needs a gearbox to fake it">
      <Axes x="90" y="400" w="660" h="320" xLabel="speed" yLabel="torque" />
      <Curve pts={[[120, 100], [200, 170], [300, 280], [500, 380], [740, 400]]} stroke={MUTED} dash="4 5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Curve key={i} pts={[[130 + i * 110, 150 + i * 10], [210 + i * 110, 380]]} stroke={ROSE} width="1.8" />
      ))}
      <Curve pts={[[120, 130], [320, 130], [740, 390]]} stroke={GREEN} width="3.2" />
      <M x="200" y="440" size={10.5} fill={ROSE}>engine: 5–6 gears</M>
      <M x="500" y="110" size={10.5} fill={GREEN}>motor: 1 ratio</M>
    </Scene>
  )
}

export function MaximumSpeedScene() {
  return (
    <Scene caption="Top speed is where surplus tractive effort reaches zero">
      <Axes x="90" y="420" w="660" h="350" xLabel="V" yLabel="Power" />
      <Curve pts={[[100, 400], [300, 380], [500, 260], [700, 60]]} stroke={ROSE} width="3" />
      <path d="M100 260 L740 260" stroke={GREEN} strokeWidth="2.6" strokeDasharray="4 5" />
      <Dot cx="560" cy="260" r="7" fill={AMBER} />
      <path d="M560 260 L560 420" stroke={AMBER} strokeWidth="1.4" strokeDasharray="3 4" />
      <M x="560" y="440" size={11} fill={AMBER}>V_max</M>
      <M x="700" y="45" size={10.5} fill={ROSE} anchor="end">P required (∝V³)</M>
      <M x="700" y="245" size={10.5} fill={GREEN} anchor="end">P available</M>
    </Scene>
  )
}

export function GradeabilityScene() {
  return (
    <Scene caption="Surplus effort divided by weight gives the sine of the steepest sustainable grade">
      <Axes x="90" y="220" w="660" h="150" xLabel="V" yLabel="F" />
      <Curve pts={[[100, 90], [400, 130], [740, 200]]} stroke={BLUE} />
      <Curve pts={[[100, 200], [400, 195], [740, 190]]} stroke={MUTED} />
      <path d="M100 90 L100 200 M400 130 L400 195" stroke={AMBER} strokeWidth="1.4" strokeDasharray="3 4" />
      <M x="250" y="80" size={10} fill={AMBER}>surplus (shaded)</M>
      <Axes x="90" y="440" w="660" h="150" xLabel="V" yLabel="grade %" />
      <Curve pts={[[100, 300], [400, 360], [740, 400]]} stroke={GREEN} width="2.6" />
    </Scene>
  )
}

export function AccelerationIntegrationScene() {
  return (
    <Scene caption="Integrate the reciprocal of acceleration — the last few km/h take disproportionately long">
      <Axes x="90" y="200" w="300" h="140" yLabel="surplus F" />
      <Curve pts={[[100, 80], [300, 100], [380, 190]]} stroke={BLUE} />
      <Axes x="450" y="420" w="300" h="350" xLabel="V" yLabel="1/a" />
      <path d="M460 400 Q550 380 650 200 Q700 100 730 70 L730 400 Z" fill={ROSE} opacity="0.25" stroke={ROSE} strokeWidth="2" />
      <M x="600" y="430" size={10.5} fill={ROSE}>area = time</M>
    </Scene>
  )
}

export function BrakingRegenerationScene() {
  return (
    <Scene caption="Adhesion caps deceleration too; stopping distance goes as speed squared">
      <Axes x="90" y="220" w="660" h="150" xLabel="V₀" yLabel="stopping distance" />
      <Curve pts={[[100, 200], [300, 170], [500, 100], [740, 40]]} stroke={ROSE} width="3" />
      {[[300, 170], [500, 100], [740, 40]].map(([x, y], i) => <Dot key={i} cx={x} cy={y} r="6" fill={AMBER} />)}
      <Bars x="120" y="330" w="560" items={[['gentle: regen', 80, GREEN], ['emergency: friction', 95, ROSE]]} max={100} />
    </Scene>
  )
}

export function BrakeDistributionScene() {
  return (
    <Scene caption="Load moves forward under braking — rear lock is far more dangerous, so bias forward">
      <Car x="330" y="260" />
      <Wire d="M370 280 L370 350" stroke={AMBER} width={12} marker="url(#emdArrA)" />
      <Wire d="M490 280 L490 320" stroke={BLUE} width={5} marker="url(#emdArrB)" />
      <M x="370" y="370" size={10} fill={AMBER}>front loads up</M>
      <Card x="80" y="330" w="300" h="120" title="Front lock" lines={['loses steering', 'continues straight']} accent={GREEN} />
      <Card x="480" y="330" w="300" h="120" title="Rear lock" lines={['no lateral grip', 'yaw grows — spin']} accent={RED} />
    </Scene>
  )
}

export function RequirementAssemblyScene() {
  return (
    <Scene caption="Top speed sizes power, grade sizes continuous torque, acceleration sizes peak torque">
      {['Top speed → Power', 'Gradeability → Cont. torque', 'Acceleration → Peak torque'].map((s, i) => (
        <g key={s} className={`emdm-cell-in emdm-delay-${i}`}>
          <Block x={70 + i * 260} y="80" w="220" h="70" label={s} stroke={[BLUE, GREEN, AMBER][i]} />
        </g>
      ))}
      <Wire d="M180 150 L400 250" stroke={BLUE} width="1.8" />
      <Wire d="M450 150 L400 250" stroke={GREEN} width="1.8" />
      <Wire d="M720 150 L400 250" stroke={AMBER} width="1.8" />
      <Block x="300" y="250" w="200" h="90" label="Motor spec" stroke={N} />
      <path d="M550 250 L620 250" stroke={RED} strokeWidth="1.8" strokeDasharray="4 4" />
      <M x="660" y="255" size={10} fill={RED}>adhesion ceiling</M>
    </Scene>
  )
}

export function MotorVsEngineFitScene() {
  const rows = [
    ['Torque at zero speed', 'zero — needs clutch', 'full torque'],
    ['Constant power range', 'narrow — 6 gears', 'wide — 1 gear'],
    ['Braking energy', 'lost as heat', 'returned to battery'],
    ['Efficiency map', 'small island', 'broad plateau'],
  ]
  return (
    <Scene caption="Torque from zero, wide constant power, regeneration, broad efficiency — four reasons it fits">
      {rows.map((r, i) => (
        <g key={r[0]} className={`emdm-cell-in emdm-delay-${i}`}>
          <M x="120" y={90 + i * 90} size={12} fill={N} anchor="start">{r[0]}</M>
          <rect x="330" y={65 + i * 90} width="180" height="40" rx="6" fill={SKY} stroke={ROSE} strokeWidth="1.4" />
          <M x="420" y={90 + i * 90} size={10.5} fill={ROSE}>{r[1]}</M>
          <rect x="540" y={65 + i * 90} width="200" height="40" rx="6" fill={WHITE} stroke={GREEN} strokeWidth="1.8" />
          <M x="640" y={90 + i * 90} size={10.5} fill={GREEN}>{r[2]}</M>
        </g>
      ))}
    </Scene>
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
          className={`emdm-flux emdm-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`emdm-current emdm-delay-${i}`}
          marker="url(#emdArrB)"
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
        <g key={t} className={`emdm-cell-in emdm-delay-${i}`}>
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
        <g key={String(p)} className={`emdm-cell-in emdm-delay-${i % 5}`}>
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

/* ── Module 2 — Electric Vehicle Performance ──────────────────────── */

export function EvFunctionalChainScene() {
  const stages = ['Battery', 'Converter', 'Motor', 'Transmission', 'Wheels']
  return (
    <Scene caption="Source, converter, motor, transmission, controller — energy flows both ways">
      {stages.map((s, i) => (
        <g key={s} className={`emdm-cell-in emdm-delay-${i}`}>
          <Block x={40 + i * 155} y="140" w="135" h="60" label={s} stroke={BLUE} />
          {i < 4 ? <Wire d={`M${175 + i * 155} 170 L${195 + i * 155} 170`} stroke={GREEN} marker="url(#emdArrG)" /> : null}
        </g>
      ))}
      {stages.map((s, i) => i < 4 ? <Wire key={`r${i}`} d={`M${195 + i * 155} 195 L${175 + i * 155} 195`} stroke={ROSE} marker="url(#emdArrRo)" /> : null)}
      <M x="450" y="230" size={11} fill={ROSE}>regeneration ←</M>
      <Panel x="300" y="300" w="300" title="Controller" rows={[['commands', 'converter from driver input']]} accent={AMBER} />
    </Scene>
  )
}

export function SingleMotorSimplificationScene() {
  return (
    <Scene caption="Motor, fixed reduction, differential — the clutch and gearbox both fall away">
      <Block x="60" y="80" w="700" h="60" label="Engine + Clutch + Gearbox + Differential" stroke={MUTED} />
      <path d="M300 110 L500 170" stroke={RED} strokeWidth="2.4" />
      <path d="M300 170 L500 110" stroke={RED} strokeWidth="2.4" />
      <Block x="60" y="200" w="700" h="60" label="Motor + Fixed Reduction + Differential" stroke={GREEN} />
      <Panel x="260" y="300" w="340" title="Component count" rows={[['conventional', '4'], ['electric', '3']]} accent={BLUE} />
    </Scene>
  )
}

export function MultiMotorConfigurationsScene() {
  return (
    <Scene caption="One motor per wheel gives torque vectoring, at the price of unsprung mass">
      {['Single + diff', 'Twin, no diff', 'In-wheel'].map((s, i) => (
        <g key={s} className={`emdm-cell-in emdm-delay-${i}`}>
          <Block x={70 + i * 260} y="80" w="220" h="70" label={s} stroke={[BLUE, TEAL, AMBER][i]} />
        </g>
      ))}
      <Bars x="150" y="260" w="560" items={[['single/twin unsprung mass', 30, GREEN], ['in-wheel unsprung mass', 90, ROSE]]} max={90} />
      <M x="450" y="400" size={11} fill={ROSE}>more unsprung mass → worse ride and grip</M>
    </Scene>
  )
}

export function ConstantTorqueRegionScene() {
  return (
    <Scene caption="Below base speed, current limits torque — power climbs linearly to its peak">
      <Axes x="90" y="180" w="660" h="110" yLabel="T" />
      <Curve pts={[[100, 90], [400, 90], [400, 90], [740, 250]]} stroke={BLUE} width="3" />
      <Axes x="90" y="320" w="660" h="110" yLabel="V" />
      <Curve pts={[[100, 300], [400, 220], [400, 220], [740, 220]]} stroke={AMBER} />
      <Axes x="90" y="460" w="660" h="110" yLabel="P" />
      <Curve pts={[[100, 440], [400, 260], [740, 260]]} stroke={GREEN} width="2.6" />
      <path d="M400 60 L400 470" stroke={MUTED} strokeWidth="1.4" strokeDasharray="3 4" />
      <M x="400" y="480" size={11} fill={MUTED}>base speed</M>
    </Scene>
  )
}

export function FieldWeakeningRegionScene() {
  return (
    <Scene caption="Weaken the flux to raise speed at fixed voltage — torque falls, power holds constant">
      <Axes x="90" y="400" w="660" h="330" xLabel="speed" yLabel="torque" />
      <Curve pts={[[100, 130], [400, 130]]} stroke={BLUE} width="3" />
      <Curve pts={[[400, 130], [500, 220], [650, 320], [740, 380]]} stroke={BLUE} width="3" />
      <path d="M400 60 L400 400" stroke={MUTED} strokeWidth="1.2" strokeDasharray="3 4" />
      <M x="400" y="440" size={11} fill={MUTED}>base speed</M>
      <M x="200" y="110" size={10.5} fill={GREEN}>constant torque</M>
      <M x="580" y="200" size={10.5} fill={AMBER}>field weakening — constant power</M>
    </Scene>
  )
}

export function SpeedRatioScene() {
  return (
    <Scene caption="Speed ratio decides the gearbox: large ratio one gear, small ratio second gear or bigger machine">
      <Axes x="90" y="220" w="300" h="150" xLabel="V" yLabel="F" />
      <Curve pts={[[100, 90], [280, 90], [370, 210]]} stroke={ROSE} />
      <M x="240" y="230" size={10} fill={ROSE}>ratio 2 — falls short</M>
      <Axes x="450" y="220" w="300" h="150" xLabel="V" yLabel="F" />
      <Curve pts={[[460, 90], [640, 90], [730, 130]]} stroke={GREEN} />
      <M x="600" y="230" size={10} fill={GREEN}>ratio 5 — encloses envelope</M>
      <Bars x="120" y="330" w="620" items={[['DC', 2, MUTED], ['induction', 3.5, BLUE], ['PM BLDC', 3, TEAL], ['SRM', 6, AMBER]]} max={6} />
    </Scene>
  )
}

export function GearRatioSelectionScene() {
  return (
    <Scene caption="One gear ratio squeezed from both ends — low speed grade, top speed ceiling">
      <Axes x="90" y="400" w="660" h="330" xLabel="V" yLabel="F" />
      <Dot cx="150" cy="90" r="6" fill={AMBER} />
      <M x="150" y="70" size={10} fill={AMBER}>low-speed requirement</M>
      <Dot cx="650" cy="340" r="6" fill={AMBER} />
      <M x="650" y="360" size={10} fill={AMBER}>top-speed requirement</M>
      <Curve pts={[[100, 60], [300, 200], [500, 320], [700, 400]]} stroke={ROSE} dash="4 5" />
      <Curve pts={[[100, 200], [300, 260], [500, 330], [700, 380]]} stroke={GREEN} width="3" />
      <Curve pts={[[100, 360], [300, 370], [500, 380], [700, 390]]} stroke={BLUE} dash="4 5" />
    </Scene>
  )
}

export function OneGearVsTwoGearScene() {
  return (
    <Scene caption="Two gears buy range at the cost of mass and a torque gap in the shift">
      <Axes x="90" y="220" w="300" h="150" xLabel="V" yLabel="F" />
      <Curve pts={[[100, 90], [280, 90], [370, 210]]} stroke={ROSE} />
      <M x="240" y="230" size={10} fill={ROSE}>shortfall shaded</M>
      <Axes x="450" y="220" w="300" h="150" xLabel="V" yLabel="F" />
      <Curve pts={[[460, 90], [560, 90], [620, 160]]} stroke={BLUE} />
      <Curve pts={[[600, 170], [660, 130], [730, 150]]} stroke={TEAL} />
      <Dot cx="615" cy="163" r="6" fill={AMBER} />
      <M x="615" y="145" size={9.5} fill={AMBER}>shift point</M>
      <Panel x="200" y="330" w="500" title="Trade" rows={[['gain', 'gradeability or top speed'], ['cost', 'mass, cost, torque interruption']]} accent={AMBER} />
    </Scene>
  )
}

export function TwoLimitingCasesScene() {
  return (
    <Scene caption="Resistance limited or motor speed limited — the two cases call for opposite remedies">
      <Axes x="90" y="220" w="300" h="150" xLabel="V" yLabel="F" />
      <Curve pts={[[100, 90], [370, 210]]} stroke={BLUE} />
      <Curve pts={[[100, 200], [370, 130]]} stroke={MUTED} />
      <Dot cx="260" cy="163" r="6" fill={GREEN} />
      <M x="200" y="230" size={9.5} fill={GREEN}>resistance limited</M>
      <Axes x="450" y="220" w="300" h="150" xLabel="V" yLabel="F" />
      <Curve pts={[[460, 90], [650, 130]]} stroke={BLUE} />
      <path d="M650 70 L650 210" stroke={RED} strokeWidth="2" strokeDasharray="4 4" />
      <M x="650" y="230" size={9.5} fill={RED}>motor speed limited</M>
      <Panel x="200" y="330" w="500" title="Remedy" rows={[['resistance limited', 'more power / less drag'], ['motor speed limited', 'lower gear ratio']]} accent={AMBER} />
    </Scene>
  )
}

export function TwoPhaseAccelerationScene() {
  return (
    <Scene caption="Constant torque gives a flat phase; constant power softens — the two-phase feel">
      <Axes x="90" y="220" w="660" h="150" xLabel="V" yLabel="F" />
      <Curve pts={[[100, 90], [400, 90], [740, 200]]} stroke={BLUE} width="2.6" />
      <Axes x="90" y="420" w="660" h="150" xLabel="t" yLabel="V" />
      <Curve pts={[[100, 400], [350, 260], [740, 100]]} stroke={GREEN} width="2.6" />
      <path d="M400 60 L400 460" stroke={MUTED} strokeWidth="1.2" strokeDasharray="3 4" />
      <M x="400" y="480" size={10.5} fill={MUTED}>corner speed</M>
    </Scene>
  )
}

export function OperatingPointDensityScene() {
  return (
    <Scene caption="Normal driving uses a small corner of the envelope — efficiency there determines range">
      <rect x="90" y="80" width="660" height="300" fill={SKY} opacity="0.4" stroke={MUTED} strokeWidth="1.6" />
      <ellipse cx="280" cy="120" rx="160" ry="100" fill={GREEN} opacity="0.3" />
      {Array.from({ length: 20 }).map((_, i) => (
        <Dot key={i} cx={230 + (i % 5) * 25} cy={95 + Math.floor(i / 5) * 20} r="4" fill={BLUE} />
      ))}
      <Dot cx="640" cy="340" r="8" fill={ROSE} />
      <M x="640" y="365" size={10.5} fill={ROSE}>rated point</M>
      <M x="280" y="240" size={10.5} fill={GREEN}>drive-cycle cloud</M>
    </Scene>
  )
}

export function EnergyChainRangeScene() {
  const stages = ['Battery', 'Converter', 'Motor', 'Transmission', 'Wheels']
  return (
    <Scene caption="Wheel energy over the product of every efficiency — then range follows">
      {stages.map((s, i) => (
        <g key={s} className={`emdm-cell-in emdm-delay-${i}`}>
          <rect x={60 + i * 145} y="80" width={125 - i * 8} height="70" fill={BLUE} opacity={1 - i * 0.12} />
          <M x={60 + i * 145 + (125 - i * 8) / 2} y="120" size={10.5} fill={WHITE}>{s}</M>
        </g>
      ))}
      <Panel x="220" y="220" w="420" title="Range" rows={[['E overall', '≈ 66–78%'], ['range', 'usable kWh / (Wh/km)']]} accent={GREEN} />
    </Scene>
  )
}

export function DriveCycleComparisonScene() {
  return (
    <Scene caption="Consumption is a property of the cycle as much as the vehicle">
      <Axes x="90" y="200" w="300" h="120" xLabel="t" yLabel="V" />
      <path d="M100 300 L140 180 L160 300 L200 180 L220 300 L260 180 L280 300 L380 300" stroke={BLUE} strokeWidth="2" fill="none" />
      <M x="240" y="330" size={10.5} fill={BLUE}>urban — stop/start</M>
      <Axes x="450" y="200" w="300" h="120" xLabel="t" yLabel="V" />
      <path d="M460 280 L560 100 L700 100 L740 280" stroke={ROSE} strokeWidth="2" fill="none" />
      <M x="600" y="330" size={10.5} fill={ROSE}>highway — sustained</M>
      <Bars x="150" y="380" w="560" items={[['urban consumption', 30, GREEN], ['highway consumption', 65, ROSE]]} max={65} />
    </Scene>
  )
}

export function RegenerationLimitsScene() {
  return (
    <Scene caption="Round trip efficiency, converter rating, battery acceptance — three ceilings on recovery">
      <rect x="150" y="80" width="120" height="300" fill={SKY} />
      <rect x="150" y="200" width="120" height="180" fill={GREEN} />
      <M x="210" y="400" size={10.5} fill={GREEN}>recovered</M>
      <M x="210" y="60" size={10.5} fill={ROSE}>lost</M>
      {['round trip η', 'converter rating', 'battery acceptance'].map((s, i) => (
        <g key={s} className={`emdm-cell-in emdm-delay-${i}`}>
          <path d={`M${330} ${140 + i * 60} L${700} ${140 + i * 60}`} stroke={AMBER} strokeWidth="1.6" strokeDasharray="4 4" />
          <M x="500" y={130 + i * 60} size={10.5} fill={AMBER}>{s}</M>
        </g>
      ))}
    </Scene>
  )
}

export function MassSpiralScene() {
  return (
    <Scene caption="Bigger battery adds mass which adds consumption which needs more battery">
      {['Bigger battery', 'More mass', 'More consumption', 'More battery needed'].map((s, i) => {
        const ang = (i / 4) * 2 * Math.PI - Math.PI / 2
        const cx = 450 + Math.cos(ang) * 220
        const cy = 220 + Math.sin(ang) * 150
        return (
          <g key={s} className={`emdm-cell-in emdm-delay-${i}`}>
            <rect x={cx - 90} y={cy - 24} width="180" height="48" rx="8" fill={WHITE} stroke={BLUE} strokeWidth="1.8" />
            <L x={cx} y={cy + 5} size={11.5}>{s}</L>
          </g>
        )
      })}
      <Axes x="90" y="460" w="300" h="120" xLabel="capacity" yLabel="range" />
      <Curve pts={[[100, 440], [380, 350]]} stroke={MUTED} dash="4 5" />
      <Curve pts={[[100, 440], [250, 400], [380, 390]]} stroke={ROSE} width="2.4" />
    </Scene>
  )
}

export function MachineSelectionScene() {
  const rows = [['Envelope', '✓'], ['Speed ratio', '✓'], ['Efficiency map', '✓'], ['Cost / mass / control', '?']]
  return (
    <Scene caption="Envelope, speed ratio, efficiency map, cost — four checks, machines differ most on the last two">
      {rows.map((r, i) => (
        <g key={r[0]} className={`emdm-cell-in emdm-delay-${i}`}>
          <rect x="150" y={80 + i * 80} width="560" height="60" rx="8" fill={WHITE} stroke={BLUE} strokeWidth="1.8" />
          <M x="450" y={115 + i * 80} size={13} fill={N}>{r[0]}</M>
          <M x="670" y={115 + i * 80} size={14} fill={GREEN}>{r[1]}</M>
        </g>
      ))}
    </Scene>
  )
}

/* ── Module 3 — DC Motor Drives ───────────────────────────────────── */

export function DcCommutationScene() {
  return (
    <Scene caption="The commutator is a mechanical inverter — it reverses conductor current so torque stays one way">
      <circle cx="450" cy="200" r="140" fill="none" stroke={MUTED} strokeWidth="2" />
      <rect x="380" y="50" width="140" height="30" fill={BLUE} opacity="0.3" />
      <M x="450" y="45" size={11} fill={BLUE}>N</M>
      <rect x="380" y="320" width="140" height="30" fill={ROSE} opacity="0.3" />
      <M x="450" y="370" size={11} fill={ROSE}>S</M>
      <Dot cx="450" cy="90" r="8" fill={AMBER} className="hvem-flux" />
      <path d="M450 90 L450 310" stroke={AMBER} strokeWidth="1.6" strokeDasharray="4 5" className="emdm-flux" />
      <Dot cx="450" cy="310" r="8" fill={AMBER} className="hvem-flux" />
      <Panel x="600" y="150" w="180" title="Force" rows={[['F', 'B·I·L'], ['reversal', 'at neutral axis']]} accent={GREEN} />
    </Scene>
  )
}

export function SpeedEquationScene() {
  return (
    <Scene caption="Speed equals voltage minus IR, divided by flux — the three speed control methods are the three symbols">
      <L x="450" y="120" size={22} weight={800}>ω = (V − Iₐ·Rₐ) / (K·φ)</L>
      {['V', 'φ', 'Rₐ'].map((s, i) => (
        <g key={s} className={`emdm-cell-in emdm-delay-${i}`}>
          <circle cx={220 + i * 220} cy="260" r="36" fill={WHITE} stroke={[BLUE, GREEN, AMBER][i]} strokeWidth="2.6" />
          <L x={220 + i * 220} y="268" size={18}>{s}</L>
          <M x={220 + i * 220} y="320" size={10.5} fill={MUTED}>{['voltage control', 'field weakening', 'resistance — wasteful'][i]}</M>
        </g>
      ))}
    </Scene>
  )
}

export function TorqueCurrentLinearityScene() {
  return (
    <Scene caption="Torque is proportional to armature current at fixed flux — command torque, command current">
      <Axes x="90" y="400" w="660" h="330" xLabel="Iₐ" yLabel="T" />
      <Curve pts={[[100, 380], [740, 60]]} stroke={BLUE} width="3" />
      <Curve pts={[[100, 380], [740, 220]]} stroke={TEAL} width="2" />
      <M x="700" y="80" size={10.5} fill={BLUE}>full flux</M>
      <M x="700" y="240" size={10.5} fill={TEAL}>half flux</M>
      <Panel x="120" y="60" w="300" title="Identity" rows={[['E·Iₐ', '= T·ω'], ['electrical', '= mechanical']]} accent={AMBER} />
    </Scene>
  )
}

export function SeparatelyExcitedScene() {
  return (
    <Scene caption="Constant flux gives a nearly flat speed characteristic, with a small droop from armature drop">
      <Axes x="90" y="300" w="660" h="200" xLabel="torque" yLabel="speed" />
      <Curve pts={[[100, 100], [740, 140]]} stroke={BLUE} width="3" />
      <M x="400" y="80" size={11} fill={BLUE}>separately excited — small droop</M>
      <Curve pts={[[100, 100], [740, 380]]} stroke={MUTED} dash="4 5" />
      <M x="600" y="360" size={10.5} fill={MUTED}>series machine (contrast)</M>
    </Scene>
  )
}

export function ArmatureVoltageFamilyScene() {
  return (
    <Scene caption="Vary armature voltage and the characteristic shifts bodily — full torque at any speed, efficiently">
      <Axes x="90" y="400" w="660" h="330" xLabel="torque" yLabel="speed" />
      {[0, 1, 2, 3].map((i) => (
        <Curve key={i} pts={[[100, 380 - i * 80], [740, 340 - i * 80]]} stroke={BLUE} width="2" className="emdm-cell-in" />
      ))}
      <path d="M420 60 L420 400" stroke={AMBER} strokeWidth="1.6" strokeDasharray="4 4" />
      <M x="420" y="440" size={10.5} fill={AMBER}>rated torque</M>
    </Scene>
  )
}

export function FieldWeakeningDcScene() {
  return (
    <Scene caption="Weaken the field above base speed — torque falls, power holds, commutation limits how far">
      <Axes x="90" y="400" w="660" h="330" xLabel="speed" yLabel="torque" />
      {[0, 1, 2].map((i) => (
        <Curve key={i} pts={[[100 + i * 60, 100 + i * 40], [500 + i * 100, 380]]} stroke={[BLUE, TEAL, AMBER][i]} width="2" />
      ))}
      <M x="700" y="80" size={10.5} fill={RED}>commutation limit → speed ratio ≈ 2</M>
    </Scene>
  )
}

export function CombinedControlScene() {
  return (
    <Scene caption="Full field and rising voltage to base speed, then full voltage and falling field above it">
      <Axes x="90" y="180" w="660" h="110" yLabel="V" />
      <Curve pts={[[100, 90], [400, 90], [740, 90]]} stroke={BLUE} width="2.6" />
      <Axes x="90" y="320" w="660" h="110" yLabel="φ" />
      <Curve pts={[[100, 240], [400, 240], [740, 340]]} stroke={GREEN} width="2.6" />
      <path d="M400 60 L400 340" stroke={MUTED} strokeWidth="1.4" strokeDasharray="3 4" />
      <M x="400" y="360" size={10.5} fill={MUTED}>base speed</M>
    </Scene>
  )
}

export function ChopperPrincipleScene() {
  return (
    <Scene caption="Switch fully on or off — the average is supply times duty ratio, almost nothing wasted">
      <Axes x="90" y="200" w="660" h="120" xLabel="t" yLabel="V" />
      <path d="M100 100 L100 320 M100 320 L250 320 L250 100 L400 100 L400 320 L550 320 L550 100 L700 100 L700 320" stroke={BLUE} strokeWidth="2.4" fill="none" />
      <path d="M100 180 L740 180" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" />
      <M x="760" y="185" size={10.5} fill={AMBER}>D·V</M>
      <Bars x="150" y="380" w="560" items={[['chopper loss', 3, GREEN], ['resistor loss (same V_o)', 90, RED]]} max={90} />
    </Scene>
  )
}

export function ConductionModesScene() {
  return (
    <Scene caption="Inductance turns switched voltage into rippled current — if it reaches zero, the simple relation breaks">
      <Axes x="90" y="180" w="660" h="120" xLabel="t" yLabel="I" />
      <path d="M100 160 L200 100 L300 140 L400 90 L500 130 L600 85 L700 125" stroke={BLUE} strokeWidth="2.4" fill="none" />
      <M x="400" y="60" size={10.5} fill={GREEN}>continuous — never touches zero</M>
      <Axes x="90" y="380" w="660" h="120" xLabel="t" yLabel="I" />
      <path d="M100 360 L200 300 L260 360 L400 360 L460 300 L600 360 L700 360" stroke={ROSE} strokeWidth="2.4" fill="none" />
      <M x="400" y="420" size={10.5} fill={ROSE}>discontinuous — touches zero</M>
    </Scene>
  )
}

export function FourQuadrantPlaneScene() {
  const quads = [
    { label: 'Q1 fwd motor', x: 620, y: 150, tone: GREEN },
    { label: 'Q2 fwd brake', x: 280, y: 150, tone: AMBER },
    { label: 'Q3 rev motor', x: 280, y: 350, tone: GREEN },
    { label: 'Q4 rev brake', x: 620, y: 350, tone: AMBER },
  ]
  return (
    <Scene caption="Torque and speed signs give four quadrants — a vehicle needs all four">
      <path d="M450 60 L450 440" stroke={MUTED} strokeWidth="1.6" />
      <path d="M90 250 L780 250" stroke={MUTED} strokeWidth="1.6" />
      {quads.map((q) => (
        <g key={q.label}>
          <rect x={q.x - 100} y={q.y - 40} width="200" height="80" rx="8" fill={q.tone} opacity="0.15" stroke={q.tone} strokeWidth="1.8" />
          <L x={q.x} y={q.y + 5} size={12.5} fill={q.tone}>{q.label}</L>
        </g>
      ))}
    </Scene>
  )
}

export function SingleChopperReverseScene() {
  return (
    <Scene caption="One chopper plus a reversing switch gives two quadrants cheaply — but reversal is slow">
      <Block x="150" y="150" w="180" h="70" label="Chopper" stroke={BLUE} />
      <Block x="450" y="150" w="180" h="70" label="Reversing contactor" stroke={AMBER} />
      <Wire d="M330 185 L450 185" stroke={N} marker="url(#emdArr)" />
      <Axes x="90" y="380" w="660" h="120" xLabel="t" yLabel="I" />
      <path d="M100 300 L300 300 L340 360 L500 360 L540 250 L740 250" stroke={ROSE} strokeWidth="2.4" fill="none" />
      <M x="420" y="400" size={10.5} fill={ROSE}>current-zero pause — tens of ms</M>
    </Scene>
  )
}

export function ClassCChopperScene() {
  return (
    <Scene caption="Two switches, two diodes: bidirectional current at one voltage polarity — motoring and regen, seamlessly">
      <rect x="350" y="80" width="200" height="280" fill="none" stroke={N} strokeWidth="2" />
      <rect x="370" y="100" width="60" height="40" fill={BLUE} opacity="0.3" stroke={BLUE} strokeWidth="1.6" />
      <M x="400" y="125" size={10}>SW1</M>
      <rect x="470" y="100" width="60" height="40" fill="none" stroke={MUTED} strokeWidth="1.4" />
      <M x="500" y="125" size={10} fill={MUTED}>D1</M>
      <rect x="370" y="300" width="60" height="40" fill="none" stroke={MUTED} strokeWidth="1.4" />
      <M x="400" y="325" size={10} fill={MUTED}>D2</M>
      <rect x="470" y="300" width="60" height="40" fill={AMBER} opacity="0.3" stroke={AMBER} strokeWidth="1.6" />
      <M x="500" y="325" size={10}>SW2</M>
      <M x="450" y="60" size={11} fill={GREEN}>motoring ↓ / regen ↑</M>
    </Scene>
  )
}

export function FourQuadrantBridgeScene() {
  return (
    <Scene caption="Four switches in a bridge reverse both voltage and current — all four quadrants electronically">
      <rect x="300" y="80" width="300" height="280" fill="none" stroke={N} strokeWidth="2" />
      {[[330, 100], [530, 100], [330, 300], [530, 300]].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="60" height="40" fill={BLUE} opacity="0.25" stroke={BLUE} strokeWidth="1.6" className={`emdm-cell-in emdm-delay-${i}`} />
      ))}
      <M x="450" y="200" size={12} weight={800}>armature</M>
      <Bars x="150" y="400" w="560" items={[['bipolar ripple', 80, ROSE], ['unipolar ripple', 40, GREEN]]} max={80} />
    </Scene>
  )
}

export function RegenerationBoostScene() {
  return (
    <Scene caption="The chopper boosts the back EMF above battery voltage — regeneration works even at low speed">
      <Src cx="150" cy="200" kind="v" tone={AMBER} label="E (150V)" />
      <Ind x="280" y="200" label="L" />
      <Src cx="500" cy="200" kind="v" tone={BLUE} label="battery (400V)" />
      <Panel x="580" y="120" w="200" title="Boost" rows={[['E + V_L', '> 400 V'], ['current', '→ battery']]} accent={GREEN} />
      <Axes x="90" y="420" w="620" h="70" xLabel="speed" yLabel="regen available" />
      <path d="M100 400 L680 400" stroke={GREEN} strokeWidth="3" />
      <M x="150" y="440" size={10.5} fill={GREEN}>works down to low speed, via boost</M>
    </Scene>
  )
}

export function DcDriveBalanceSheetScene() {
  return (
    <Scene caption="Simple control, but brushes wear, the rotor is hard to cool, and the speed ratio is modest">
      <Card x="80" y="80" w="330" h="280" title="Merits" lines={['T ∝ measurable Iₐ', 'flux & torque decoupled', 'simple control']} accent={GREEN} />
      <Card x="480" y="80" w="330" h="280" title="Limitations" lines={['brush wear', 'commutation limits', 'rotor cooling', 'speed ratio ≈ 2']} accent={RED} />
    </Scene>
  )
}

export function CascadeControlScene() {
  return (
    <Scene caption="Fast inner current loop commands torque; slow outer speed loop commands the current reference">
      <Block x="60" y="150" w="150" h="70" label="Speed loop" stroke={BLUE} />
      <Block x="280" y="150" w="150" h="70" label="Current loop" stroke={GREEN} />
      <Block x="500" y="150" w="150" h="70" label="Chopper + machine" stroke={AMBER} />
      <Wire d="M210 185 L280 185" stroke={N} marker="url(#emdArr)" />
      <Wire d="M430 185 L500 185" stroke={N} marker="url(#emdArr)" />
      <path d="M650 220 Q450 300 210 220" stroke={MUTED} strokeWidth="1.6" fill="none" markerEnd="url(#emdArrM)" />
      <M x="430" y="310" size={10.5} fill={MUTED}>feedback</M>
      <M x="130" y="130" size={10} fill={BLUE}>slow</M>
      <M x="355" y="130" size={10} fill={GREEN}>fast</M>
    </Scene>
  )
}

/* ── Module 4 — Induction Motor Drives ────────────────────────────── */

export function RotatingFieldScene() {
  return (
    <Scene caption="Three phase currents in three displaced windings make a field that rotates at synchronous speed">
      <circle cx="450" cy="220" r="150" fill="none" stroke={MUTED} strokeWidth="2" />
      {[0, 120, 240].map((ang, i) => {
        const rad = (ang * Math.PI) / 180
        return <Dot key={ang} cx={450 + Math.cos(rad) * 150} cy={220 + Math.sin(rad) * 150} r="8" fill={[BLUE, GREEN, AMBER][i]} />
      })}
      <path d="M450 220 L580 160" stroke={ROSE} strokeWidth="3" markerEnd="url(#emdArrRo)" className="emdm-flux" />
      <M x="450" y="420" size={12} fill={MUTED} weight={700}>n_s = 60f / p</M>
      <circle cx="450" cy="220" r="50" fill="none" stroke={N} strokeWidth="2" strokeDasharray="4 4" />
      <M x="450" y="225" size={10} fill={N}>cage rotor</M>
    </Scene>
  )
}

export function SlipMechanismScene() {
  return (
    <Scene caption="Slip is not a loss of speed but the cause of torque — at zero slip there is no torque at all">
      <circle cx="300" cy="220" r="100" fill="none" stroke={BLUE} strokeWidth="2" />
      <path d="M300 220 L380 160" stroke={BLUE} strokeWidth="2.6" markerEnd="url(#emdArrB)" className="emdm-flux" />
      <M x="300" y="120" size={11} fill={BLUE}>field, n_s</M>
      <circle cx="600" cy="220" r="100" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" />
      <path d="M600 220 L660 175" stroke={AMBER} strokeWidth="2.6" markerEnd="url(#emdArrA)" />
      <M x="600" y="120" size={11} fill={AMBER}>rotor, n_r &lt; n_s</M>
      <Panel x="330" y="360" w="240" title="Slip" rows={[['s', '(n_s−n_r)/n_s'], ['s=0', 'no torque']]} accent={RED} />
    </Scene>
  )
}

export function EquivalentCircuitScene() {
  return (
    <Scene caption="Rotor resistance over slip splits into real rotor loss and mechanical output in the ratio s to 1−s">
      <Res x="200" y="200" orient="h" label="Rs" />
      <Ind x="330" y="200" label="Xs" />
      <Ind x="460" y="140" orient="v" label="Xm" />
      <Ind x="580" y="200" label="Xr" />
      <Res x="700" y="200" orient="h" label="Rr/s" />
      <Bars x="150" y="330" w="560" items={[['rotor copper loss (s)', 3, RED], ['mechanical power (1−s)', 97, GREEN]]} max={97} />
    </Scene>
  )
}

export function TorqueSlipCurveScene() {
  return (
    <Scene caption="Stable on the steep low-slip side, unstable past breakdown — a hard ceiling on torque">
      <Axes x="90" y="400" w="660" h="330" xLabel="slip" yLabel="torque" />
      <Curve pts={[[100, 380], [280, 100], [400, 380]]} stroke={BLUE} width="3" />
      <Dot cx="280" cy="100" r="7" fill={RED} />
      <M x="280" y="80" size={10.5} fill={RED}>breakdown torque</M>
      <rect x="100" y="60" width="180" height="340" fill={GREEN} opacity="0.08" />
      <M x="190" y="420" size={10.5} fill={GREEN}>stable</M>
      <rect x="280" y="60" width="120" height="340" fill={RED} opacity="0.08" />
      <M x="340" y="420" size={10.5} fill={RED}>unstable</M>
    </Scene>
  )
}

export function VoltsPerHertzScene() {
  return (
    <Scene caption="Hold volts over hertz constant and the flux stays rated — full torque at any speed">
      <Axes x="90" y="400" w="660" h="330" xLabel="frequency" yLabel="voltage" />
      <Curve pts={[[100, 380], [700, 100]]} stroke={BLUE} width="3" />
      {[[250, 300], [450, 200], [650, 120]].map(([x, y], i) => <Dot key={i} cx={x} cy={y} r="6" fill={AMBER} />)}
      <M x="450" y="60" size={12} fill={MUTED} weight={700}>φ ∝ V/f — constant along the line</M>
    </Scene>
  )
}

export function LowFrequencyBoostScene() {
  return (
    <Scene caption="At low frequency the stator resistance drop eats the flux — boost restores it">
      <Axes x="90" y="400" w="660" h="330" xLabel="frequency" yLabel="voltage" />
      <Curve pts={[[100, 380], [700, 100]]} stroke={MUTED} dash="4 5" />
      <Curve pts={[[100, 330], [200, 300], [700, 100]]} stroke={BLUE} width="3" />
      <M x="180" y="280" size={10} fill={BLUE}>boost near origin</M>
      <Bars x="150" y="60" w="300" items={[['low f: R drop', 60, RED], ['low f: flux', 40, GREEN]]} max={60} />
    </Scene>
  )
}

export function InductionFieldWeakeningScene() {
  return (
    <Scene caption="Above base frequency flux falls automatically — eventually breakdown torque, not current, binds">
      <Axes x="90" y="400" w="660" h="330" xLabel="speed" yLabel="torque" />
      <Curve pts={[[100, 100], [300, 100]]} stroke={BLUE} width="3" />
      <Curve pts={[[300, 100], [500, 220], [650, 320]]} stroke={GREEN} width="3" />
      <Curve pts={[[500, 150], [650, 320], [740, 400]]} stroke={RED} width="2.4" dash="4 4" />
      <M x="200" y="80" size={10} fill={BLUE}>constant torque</M>
      <M x="400" y="200" size={10} fill={GREEN}>constant power</M>
      <M x="700" y="380" size={10} fill={RED}>breakdown binds</M>
    </Scene>
  )
}

export function ScalarControlLimitsScene() {
  return (
    <Scene caption="Scalar control sets magnitude and frequency, not flux position — torque cannot be commanded directly">
      <Axes x="90" y="220" w="660" h="150" xLabel="t" yLabel="T" />
      <Curve pts={[[100, 190], [180, 190], [250, 90], [320, 160], [400, 110], [500, 140], [600, 125], [700, 130]]} stroke={ROSE} width="2.2" />
      <M x="550" y="80" size={10.5} fill={ROSE}>scalar — slow, oscillatory</M>
      <Axes x="90" y="400" w="660" h="150" xLabel="t" yLabel="T" />
      <Curve pts={[[100, 380], [180, 380], [230, 270], [700, 270]]} stroke={GREEN} width="2.6" />
      <M x="550" y="250" size={10.5} fill={GREEN}>field oriented — fast, clean</M>
    </Scene>
  )
}

export function VoltageSourceInverterScene() {
  return (
    <Scene caption="Three legs, six switches, PWM for the sinusoid — the diodes make it four-quadrant for free">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={200 + i * 150} y="80" width="60" height="40" fill={BLUE} opacity="0.3" stroke={BLUE} strokeWidth="1.6" />
          <rect x={200 + i * 150} y="280" width="60" height="40" fill={BLUE} opacity="0.3" stroke={BLUE} strokeWidth="1.6" />
          <Wire d={`M${230 + i * 150} 120 L${230 + i * 150} 280`} stroke={N} width="1.4" />
        </g>
      ))}
      <Axes x="90" y="420" w="660" h="70" xLabel="t" />
      <path d="M100 400 L100 440 L250 440 L250 400 L400 400 L400 440 L550 440 L550 400 L700 400" stroke={AMBER} strokeWidth="1.8" fill="none" />
    </Scene>
  )
}

export function FieldOrientationScene() {
  return (
    <Scene caption="Resolve the current along and across the rotor flux — flux and torque separate exactly as in a DC machine">
      <path d="M450 240 L600 240" stroke={BLUE} strokeWidth="2.4" markerEnd="url(#emdArrB)" />
      <M x="620" y="245" size={11} fill={BLUE}>i_d (flux)</M>
      <path d="M450 240 L450 120" stroke={GREEN} strokeWidth="2.4" markerEnd="url(#emdArrG)" />
      <M x="450" y="100" size={11} fill={GREEN}>i_q (torque)</M>
      <path d="M450 240 L560 160" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" />
      <M x="580" y="150" size={10} fill={AMBER}>iₛ</M>
      <Panel x="180" y="330" w="560" title="Identity" rows={[['T = K·φ_r·i_q', 'same form as DC: T = K·φ·Iₐ']]} accent={TEAL} />
    </Scene>
  )
}

export function TransformationChainScene() {
  return (
    <Scene caption="Three phases become two stationary then two rotating components — the rotation angle is the whole problem">
      <Block x="60" y="150" w="150" h="70" label="ia, ib, ic" stroke={BLUE} />
      <Block x="280" y="150" w="150" h="70" label="Clarke: α,β" stroke={TEAL} />
      <Block x="500" y="150" w="150" h="70" label="Park: d,q" stroke={GREEN} />
      <Wire d="M210 185 L280 185" stroke={N} marker="url(#emdArr)" />
      <Wire d="M430 185 L500 185" stroke={N} marker="url(#emdArr)" />
      <path d="M500 220 L280 220" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#emdArrA)" />
      <M x="390" y="240" size={10.5} fill={AMBER}>θ — flux angle</M>
    </Scene>
  )
}

export function DirectFluxOrientationScene() {
  return (
    <Scene caption="Measure or estimate the flux directly — accurate at speed, collapses near standstill">
      <Card x="80" y="80" w="330" h="120" title="Sensors" lines={['Hall / search coils', 'accurate, fragile']} accent={BLUE} />
      <Card x="480" y="80" w="330" h="120" title="Estimator" lines={['∫(v − iR) dt', 'sensorless']} accent={TEAL} />
      <Axes x="90" y="420" w="660" h="220" xLabel="speed" yLabel="error" />
      <Curve pts={[[740, 400], [400, 390], [200, 300], [100, 70]]} stroke={RED} width="2.6" />
      <M x="150" y="60" size={10.5} fill={RED}>drifts near zero speed</M>
    </Scene>
  )
}

export function IndirectFluxOrientationScene() {
  return (
    <Scene caption="Compute the slip and add it to measured rotor position — works at zero speed, needs the rotor time constant">
      <Block x="60" y="150" w="140" h="60" label="Encoder" stroke={BLUE} />
      <Block x="60" y="260" w="140" h="60" label="Slip calc" stroke={AMBER} />
      <path d="M200 180 L340 210 M200 290 L340 210" stroke={N} strokeWidth="1.8" />
      <circle cx="360" cy="210" r="12" fill={WHITE} stroke={N} strokeWidth="1.8" />
      <M x="360" y="215" size={12}>+</M>
      <Wire d="M372 210 L470 210" stroke={GREEN} marker="url(#emdArrG)" />
      <M x="530" y="205" size={11} fill={GREEN}>θ = ∫ω_flux dt</M>
      <M x="360" y="120" size={10.5} fill={GREEN}>valid at zero speed</M>
      <Panel x="500" y="300" w="260" title="Sensitivity" rows={[['Rr(temp)', 'Tr drifts']]} accent={RED} />
    </Scene>
  )
}

export function VoltageControlFocScene() {
  return (
    <Scene caption="Compute the voltages and add feedforward terms to cancel cross-coupling — simple, but model dependent">
      <Block x="80" y="150" w="160" h="60" label="i_d, i_q ref" stroke={BLUE} />
      <Block x="320" y="150" w="160" h="60" label="v_d, v_q" stroke={GREEN} />
      <Wire d="M240 180 L320 180" stroke={N} marker="url(#emdArr)" />
      <path d="M560 130 L320 130" stroke={AMBER} strokeWidth="1.8" strokeDasharray="4 4" markerEnd="url(#emdArrA)" />
      <M x="450" y="115" size={10} fill={AMBER}>feedforward decoupling (ωL terms)</M>
      <Block x="560" y="150" w="160" h="60" label="3-phase PWM" stroke={TEAL} />
      <Wire d="M480 180 L560 180" stroke={N} marker="url(#emdArr)" />
    </Scene>
  )
}

export function CurrentControlMethodsScene() {
  return (
    <Scene caption="Regulate the current directly — parameter errors matter far less, at the cost of switching quality">
      <Axes x="90" y="220" w="300" h="150" xLabel="t" yLabel="i" />
      <path d="M100 130 Q130 90 160 130 Q190 170 220 130 Q250 90 280 130 Q310 170 380 130" stroke={ROSE} strokeWidth="2" fill="none" />
      <M x="240" y="230" size={10} fill={ROSE}>hysteresis — variable f</M>
      <Axes x="450" y="220" w="300" h="150" xLabel="t" yLabel="i" />
      <path d="M460 150 L520 110 L580 150 L640 110 L700 150 L740 130" stroke={GREEN} strokeWidth="2" fill="none" />
      <M x="600" y="230" size={10} fill={GREEN}>ramp comparison — fixed f</M>
    </Scene>
  )
}

export function InductionDriveSummaryScene() {
  return (
    <Scene caption="Robust, magnet free and wide ranging — but it pays continuously for its own magnetising current">
      <Card x="80" y="80" w="330" h="260" title="Merits" lines={['no brushes, no magnets', 'robust solid rotor', 'wide field weakening', '4-quadrant inverter free']} accent={GREEN} />
      <Card x="480" y="80" w="330" h="260" title="Limitations" lines={['continuous magnetising current', 'rotor copper loss ∝ slip', 'parameter sensitivity', 'usually needs a sensor']} accent={RED} />
    </Scene>
  )
}

/* ── Module 5 — BLDC and SRM Drives ───────────────────────────────── */

export function BldcInversionScene() {
  return (
    <Scene caption="Put the magnets on the rotor, the winding on the stator — electronics does what the commutator did">
      <circle cx="230" cy="220" r="110" fill="none" stroke={MUTED} strokeWidth="2" />
      <M x="230" y="80" size={12} fill={MUTED}>DC: field stator, winding rotor + brushes</M>
      <path d="M180 190 L220 190 L220 250 L180 250" stroke={RED} strokeWidth="2.4" fill="none" />
      <M x="200" y="280" size={10} fill={RED}>brushes</M>
      <circle cx="670" cy="220" r="110" fill="none" stroke={BLUE} strokeWidth="2" />
      <M x="670" y="80" size={12} fill={BLUE}>BLDC: magnets rotor, winding stator</M>
      <rect x="640" y="130" width="60" height="24" fill={AMBER} opacity="0.4" />
      <M x="670" y="110" size={10} fill={AMBER}>inverter + sensor</M>
    </Scene>
  )
}

export function BldcClassificationScene() {
  return (
    <Scene caption="Surface or interior magnets, trapezoidal or sinusoidal drive — four combinations">
      {['Surface + Trap', 'Surface + Sine', 'Interior + Trap', 'Interior + Sine'].map((s, i) => (
        <g key={s} className={`emdm-cell-in emdm-delay-${i}`}>
          <rect x={80 + (i % 2) * 360} y={80 + Math.floor(i / 2) * 160} width="320" height="130" rx="8" fill={i === 3 ? GREEN : WHITE} opacity={i === 3 ? 0.2 : 1} stroke={i === 3 ? GREEN : MUTED} strokeWidth="1.8" />
          <M x={240 + (i % 2) * 360} y={150 + Math.floor(i / 2) * 160} size={13}>{s}</M>
        </g>
      ))}
      <M x="450" y="420" size={11} fill={GREEN} weight={700}>traction usual: interior + sinusoidal</M>
    </Scene>
  )
}

export function MagnetMaterialScene() {
  return (
    <Scene caption="Neodymium gives the highest energy product but weakens with heat and can demagnetise">
      <Bars x="150" y="80" w="560" items={[['ferrite', 20, MUTED], ['SmCo', 60, TEAL], ['NdFeB', 100, ROSE]]} max={100} />
      <Axes x="90" y="420" w="660" h="250" xLabel="H" yLabel="B" />
      <Curve pts={[[100, 100], [400, 350], [600, 400]]} stroke={GREEN} width="2.4" />
      <Curve pts={[[100, 150], [300, 350], [420, 400]]} stroke={RED} width="2.4" dash="4 4" />
      <M x="420" y="380" size={10} fill={RED}>knee moves in when hot</M>
    </Scene>
  )
}

export function BldcPerformanceScene() {
  return (
    <Scene caption="All the current makes torque because the magnets make the flux — best light-load efficiency">
      <Bars x="150" y="80" w="560" items={[['induction: torque', 60, BLUE], ['induction: magnetising', 40, MUTED], ['BLDC: torque', 100, GREEN]]} max={100} />
      <Axes x="90" y="420" w="660" h="250" xLabel="load" yLabel="efficiency" />
      <Curve pts={[[100, 200], [400, 90], [740, 80]]} stroke={GREEN} width="2.6" />
      <Curve pts={[[100, 380], [400, 150], [740, 90]]} stroke={BLUE} width="2" />
      <M x="200" y="180" size={10} fill={GREEN}>BLDC holds up at light load</M>
    </Scene>
  )
}

export function SixStepCommutationScene() {
  return (
    <Scene caption="Three Hall sensors pick one of six sectors; two phases conduct and current sets the torque">
      <circle cx="450" cy="220" r="140" fill="none" stroke={MUTED} strokeWidth="2" />
      {Array.from({ length: 6 }).map((_, i) => {
        const ang = (i / 6) * 2 * Math.PI
        return <path key={i} d={`M450 220 L${450 + Math.cos(ang) * 140} ${220 + Math.sin(ang) * 140}`} stroke={MUTED} strokeWidth="1" strokeDasharray="3 4" />
      })}
      <path d="M450 220 L580 150" stroke={BLUE} strokeWidth="3" markerEnd="url(#emdArrB)" className="emdm-flux" />
      <Axes x="90" y="400" w="660" h="120" xLabel="t" yLabel="torque" />
      <path d="M100 370 L200 340 L200 380 L300 350 L300 390 L400 360 L400 395 L500 370" stroke={ROSE} strokeWidth="2" fill="none" />
      <M x="300" y="420" size={10.5} fill={ROSE}>ripple at each commutation</M>
    </Scene>
  )
}

export function PmFieldWeakeningFaultScene() {
  return (
    <Scene caption="You cannot turn magnets off — a drive fault at speed means uncontrolled generation">
      <Axes x="90" y="400" w="660" h="330" xLabel="speed" yLabel="V" />
      <Curve pts={[[100, 380], [700, 60]]} stroke={AMBER} width="2.6" />
      <path d="M100 200 L740 200" stroke={BLUE} strokeWidth="2" strokeDasharray="4 4" />
      <M x="750" y="195" size={10} fill={BLUE} anchor="start">V_battery</M>
      <Dot cx="480" cy="200" r="7" fill={RED} />
      <Card x="500" y="80" w="260" h="110" title="Above crossover" lines={['drive fails →', 'diodes rectify → uncontrolled charge']} accent={RED} />
    </Scene>
  )
}

export function ObserverStructureScene() {
  return (
    <Scene caption="Run a model beside the machine and correct it until their outputs agree">
      <Block x="80" y="120" w="200" h="70" label="Real machine" stroke={BLUE} />
      <Block x="80" y="260" w="200" h="70" label="Model" stroke={TEAL} />
      <circle cx="380" cy="190" r="16" fill={WHITE} stroke={N} strokeWidth="1.8" />
      <M x="380" y="196" size={13}>Δ</M>
      <path d="M280 155 L370 185 M280 295 L370 195" stroke={N} strokeWidth="1.6" />
      <path d="M396 190 Q450 260 280 295" stroke={AMBER} strokeWidth="1.8" fill="none" markerEnd="url(#emdArrA)" />
      <M x="460" y="240" size={10} fill={AMBER}>correction</M>
      <Axes x="500" y="420" w="240" h="200" xLabel="t" yLabel="θ̂" />
      <Curve pts={[[510, 100], [560, 330], [700, 340]]} stroke={GREEN} />
    </Scene>
  )
}

export function BackEmfZeroCrossingScene() {
  return (
    <Scene caption="Watch the open phase for a back-EMF zero crossing and wait 30° — but it vanishes at low speed">
      <Axes x="90" y="200" w="660" h="120" xLabel="t" yLabel="E" />
      <Wave x="100" y="160" w="640" amp="60" cycles="2" stroke={BLUE} />
      <Dot cx="260" cy="160" r="6" fill={AMBER} />
      <M x="260" y="140" size={10} fill={AMBER}>zero crossing</M>
      <path d="M260 160 L340 160" stroke={RED} strokeWidth="1.6" strokeDasharray="3 4" />
      <M x="340" y="145" size={10} fill={RED}>30° delay</M>
      <Axes x="90" y="420" w="660" h="70" xLabel="speed" yLabel="E amplitude" />
      <Curve pts={[[100, 400], [400, 410], [740, 460]]} stroke={MUTED} />
      <M x="150" y="440" size={10} fill={MUTED}>vanishes near standstill</M>
    </Scene>
  )
}

export function SrmStructureScene() {
  return (
    <Scene caption="Salient poles both sides, and a rotor that is nothing but shaped steel">
      <circle cx="450" cy="220" r="150" fill="none" stroke={MUTED} strokeWidth="2" />
      {Array.from({ length: 6 }).map((_, i) => {
        const ang = (i / 6) * 2 * Math.PI
        return <rect key={i} x={450 + Math.cos(ang) * 130 - 15} y={220 + Math.sin(ang) * 130 - 15} width="30" height="30" fill={BLUE} opacity="0.35" transform={`rotate(${(ang * 180) / Math.PI} ${450 + Math.cos(ang) * 130} ${220 + Math.sin(ang) * 130})`} />
      })}
      <path d="M450 130 L410 170 L450 210 L490 170 Z M450 310 L410 270 L450 230 L490 270 Z" fill={N} opacity="0.4" />
      <M x="450" y="400" size={11} fill={MUTED}>rotor — laminated steel, no windings, no magnets</M>
    </Scene>
  )
}

export function SrmTorqueProductionScene() {
  return (
    <Scene caption="Torque goes as current squared times inductance slope — polarity irrelevant, ripple inherent">
      <Axes x="90" y="200" w="660" h="120" xLabel="θ" yLabel="L" />
      <Curve pts={[[100, 190], [300, 90], [500, 190], [700, 90]]} stroke={BLUE} width="2.4" />
      <M x="200" y="70" size={10} fill={GREEN}>rising: motoring</M>
      <M x="600" y="70" size={10} fill={ROSE}>falling: generating</M>
      <Axes x="90" y="400" w="660" h="120" xLabel="θ" yLabel="T (sum)" />
      <path d="M100 380 L150 320 L200 380 L280 380 L330 320 L380 380 L460 380 L510 320 L560 380" stroke={AMBER} strokeWidth="2" fill="none" />
    </Scene>
  )
}

export function SrmConverterModesScene() {
  return (
    <Scene caption="Two switches per phase, fully independent — chopping at low speed, single pulse at high speed">
      <rect x="200" y="80" width="120" height="200" fill="none" stroke={N} strokeWidth="2" />
      <rect x="220" y="100" width="40" height="30" fill={BLUE} opacity="0.3" />
      <rect x="220" y="230" width="40" height="30" fill={BLUE} opacity="0.3" />
      <M x="360" y="180" size={11}>asymmetric half bridge</M>
      <Axes x="90" y="380" w="300" h="140" xLabel="t" yLabel="I" />
      <path d="M100 350 L130 300 L160 350 L190 300 L220 350 L250 300 L380 300" stroke={ROSE} strokeWidth="2" fill="none" />
      <M x="240" y="410" size={10} fill={ROSE}>chopping — low speed</M>
      <Axes x="450" y="380" w="300" h="140" xLabel="t" yLabel="I" />
      <path d="M460 350 Q560 280 660 350" stroke={GREEN} strokeWidth="2.2" fill="none" />
      <M x="600" y="410" size={10} fill={GREEN}>single pulse — high speed</M>
    </Scene>
  )
}

export function FluxLinkagePositionScene() {
  return (
    <Scene caption="Integrate voltage for flux, measure current, look up the position that fits both">
      <Axes x="90" y="400" w="660" h="330" xLabel="current" yLabel="flux linkage ψ" />
      {[0, 1, 2, 3].map((i) => (
        <Curve key={i} pts={[[100, 380 - i * 20], [740, 100 + i * 70]]} stroke={BLUE} width="1.8" opacity="0.7" />
      ))}
      <Dot cx="450" cy="220" r="8" fill={AMBER} />
      <M x="500" y="200" size={10.5} fill={AMBER}>measured (ψ, i) → θ</M>
    </Scene>
  )
}

export function MutualVoltageSensingScene() {
  return (
    <Scene caption="Read the voltage the active phase induces in an idle one — coupling varies with position">
      <circle cx="450" cy="220" r="130" fill="none" stroke={MUTED} strokeWidth="2" />
      <path d="M450 90 Q550 150 450 350" stroke={BLUE} strokeWidth="2" fill="none" className="emdm-flux" />
      <M x="330" y="150" size={10.5} fill={BLUE}>energised phase flux</M>
      <path d="M450 90 Q380 150 380 220" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" fill="none" />
      <M x="330" y="260" size={10.5} fill={AMBER}>links idle phase</M>
      <Axes x="90" y="420" w="300" h="150" xLabel="θ" yLabel="V_induced" />
      <Curve pts={[[100, 400], [250, 320], [380, 400]]} stroke={GREEN} />
    </Scene>
  )
}

export function ObserverNeuralNetworkScene() {
  return (
    <Scene caption="Observers need a model the nonlinearity makes hard — a trained network learns it instead">
      <Card x="80" y="100" w="330" h="180" title="Observer" lines={['model + correction loop', 'nonlinear iron — hard to model']} accent={AMBER} />
      <Card x="480" y="100" w="330" h="180" title="Neural network" lines={['trained on measured data', 'ψ, i → θ directly']} accent={GREEN} />
      <M x="450" y="340" size={11} fill={GREEN} weight={700}>self-tunes to ageing and variation</M>
    </Scene>
  )
}

export function FourMachineComparisonScene() {
  const rows = [['DC', 'simplest control'], ['Induction', 'robust, no magnets'], ['PM BLDC', 'best efficiency'], ['SRM', 'cheapest, widest range']]
  return (
    <Scene caption="Simplest, most robust, most efficient, cheapest — four machines, four different wins">
      {rows.map((r, i) => (
        <g key={r[0]} className={`emdm-cell-in emdm-delay-${i}`}>
          <rect x="150" y={80 + i * 85} width="560" height="65" rx="8" fill={WHITE} stroke={[MUTED, BLUE, GREEN, AMBER][i]} strokeWidth="1.8" />
          <M x="280" y={118 + i * 85} size={13}>{r[0]}</M>
          <M x="550" y={118 + i * 85} size={11.5} fill={[MUTED, BLUE, GREEN, AMBER][i]}>{r[1]}</M>
        </g>
      ))}
    </Scene>
  )
}

export function CourseIntegrationScene() {
  const stages = ['Requirement', 'Envelope', 'Machine', 'Control']
  return (
    <Scene caption="Requirement, envelope, machine, control — one chain from tyre to transistor">
      {stages.map((s, i) => (
        <g key={s} className={`emdm-cell-in emdm-delay-${i}`}>
          <Block x={60 + i * 190} y="180" w="160" h="70" label={s} stroke={BLUE} />
          {i < 3 ? <Wire d={`M${220 + i * 190} 215 L${250 + i * 190} 215`} stroke={GREEN} marker="url(#emdArrG)" /> : null}
        </g>
      ))}
      <path d="M700 250 Q450 340 140 250" stroke={AMBER} strokeWidth="1.6" strokeDasharray="4 4" fill="none" markerEnd="url(#emdArrA)" />
      <M x="450" y="360" size={10.5} fill={AMBER}>feedback to gearing decision</M>
    </Scene>
  )
}

/* ── Dispatch ────────────────────────────────────────────────────── */

function matchKeyword(blob) {
  if (/history.*hybrid|hybrid.*history/.test(blob)) return HybridHistoryScene
  if (/history|timeline/.test(blob)) return EvHistoryTimelineScene
  if (/force balance/.test(blob)) return VehicleForceBalanceScene
  if (/rolling resistance/.test(blob)) return RollingResistanceScene
  if (/drag/.test(blob)) return DragSquareCubeScene
  if (/grading resistance/.test(blob)) return GradingResistanceScene
  if (/adhesion/.test(blob)) return AdhesionLimitScene
  if (/tractive effort curve/.test(blob)) return TractiveEffortCurvesScene
  if (/ideal.*characteristic|constant power/.test(blob)) return IdealVsRealScene
  if (/maximum speed/.test(blob)) return MaximumSpeedScene
  if (/gradeability/.test(blob)) return GradeabilityScene
  if (/acceleration/.test(blob)) return AccelerationIntegrationScene
  if (/braking.*regen|regen.*braking/.test(blob)) return BrakingRegenerationScene
  if (/brake distribution|braking distribution/.test(blob)) return BrakeDistributionScene
  if (/requirement/.test(blob)) return RequirementAssemblyScene
  if (/motor.*engine.*fit|why electric propulsion/.test(blob)) return MotorVsEngineFitScene
  if (/functional chain/.test(blob)) return EvFunctionalChainScene
  if (/single motor/.test(blob)) return SingleMotorSimplificationScene
  if (/multi.?motor|in-wheel/.test(blob)) return MultiMotorConfigurationsScene
  if (/constant torque region/.test(blob)) return ConstantTorqueRegionScene
  if (/field weakening/.test(blob)) return FieldWeakeningRegionScene
  if (/speed ratio/.test(blob)) return SpeedRatioScene
  if (/gear ratio selection/.test(blob)) return GearRatioSelectionScene
  if (/one.?gear.*two.?gear|two.?gear/.test(blob)) return OneGearVsTwoGearScene
  if (/limiting case/.test(blob)) return TwoLimitingCasesScene
  if (/two.?phase acceleration/.test(blob)) return TwoPhaseAccelerationScene
  if (/operating point density|normal driving/.test(blob)) return OperatingPointDensityScene
  if (/energy chain|energy consumption/.test(blob)) return EnergyChainRangeScene
  if (/drive cycle/.test(blob)) return DriveCycleComparisonScene
  if (/regeneration limit|regenerative braking/.test(blob)) return RegenerationLimitsScene
  if (/mass spiral|battery sizing/.test(blob)) return MassSpiralScene
  if (/machine selection/.test(blob)) return MachineSelectionScene
  if (/commutation|commutator/.test(blob)) return DcCommutationScene
  if (/speed equation/.test(blob)) return SpeedEquationScene
  if (/torque.*current linearity|torque production/.test(blob)) return TorqueCurrentLinearityScene
  if (/separately excited/.test(blob)) return SeparatelyExcitedScene
  if (/armature voltage/.test(blob)) return ArmatureVoltageFamilyScene
  if (/field weakening.*dc|dc.*field weakening/.test(blob)) return FieldWeakeningDcScene
  if (/combined.*control/.test(blob)) return CombinedControlScene
  if (/chopper.*principle/.test(blob)) return ChopperPrincipleScene
  if (/conduction mode/.test(blob)) return ConductionModesScene
  if (/four.?quadrant plane|four quadrants of operation/.test(blob)) return FourQuadrantPlaneScene
  if (/single chopper.*reverse/.test(blob)) return SingleChopperReverseScene
  if (/class c/.test(blob)) return ClassCChopperScene
  if (/four.?quadrant bridge|h bridge/.test(blob)) return FourQuadrantBridgeScene
  if (/regeneration.*boost/.test(blob)) return RegenerationBoostScene
  if (/balance sheet|merits and limitations/.test(blob)) return DcDriveBalanceSheetScene
  if (/cascade control/.test(blob)) return CascadeControlScene
  if (/rotating field/.test(blob)) return RotatingFieldScene
  if (/slip mechanism/.test(blob)) return SlipMechanismScene
  if (/equivalent circuit/.test(blob)) return EquivalentCircuitScene
  if (/torque.?slip curve/.test(blob)) return TorqueSlipCurveScene
  if (/volts per hertz|v\/f principle/.test(blob)) return VoltsPerHertzScene
  if (/low frequency boost/.test(blob)) return LowFrequencyBoostScene
  if (/induction.*field weakening/.test(blob)) return InductionFieldWeakeningScene
  if (/scalar control/.test(blob)) return ScalarControlLimitsScene
  if (/voltage source inverter/.test(blob)) return VoltageSourceInverterScene
  if (/field orientation.*principle/.test(blob)) return FieldOrientationScene
  if (/transformation.*flux position|clarke|park/.test(blob)) return TransformationChainScene
  if (/direct.*flux orientation|direct rotor flux/.test(blob)) return DirectFluxOrientationScene
  if (/indirect.*flux orientation|indirect rotor flux/.test(blob)) return IndirectFluxOrientationScene
  if (/voltage control.*foc|voltage control in the voltage source/.test(blob)) return VoltageControlFocScene
  if (/current control/.test(blob)) return CurrentControlMethodsScene
  if (/induction drive.*complete|induction drive.*summary/.test(blob)) return InductionDriveSummaryScene
  if (/bldc.*inversion|electronic commutation/.test(blob)) return BldcInversionScene
  if (/bldc.*classification/.test(blob)) return BldcClassificationScene
  if (/magnet material/.test(blob)) return MagnetMaterialScene
  if (/bldc performance/.test(blob)) return BldcPerformanceScene
  if (/six.?step/.test(blob)) return SixStepCommutationScene
  if (/pm field weakening|uncontrolled generation/.test(blob)) return PmFieldWeakeningFaultScene
  if (/observer structure|observer.*sensorless/.test(blob)) return ObserverStructureScene
  if (/back emf zero crossing|zero crossing/.test(blob)) return BackEmfZeroCrossingScene
  if (/srm.*structure|switched reluctance.*structure/.test(blob)) return SrmStructureScene
  if (/srm torque|torque production in the switched/.test(blob)) return SrmTorqueProductionScene
  if (/srm converter|converter and modes/.test(blob)) return SrmConverterModesScene
  if (/flux linkage/.test(blob)) return FluxLinkagePositionScene
  if (/mutual.*voltage|mutually induced/.test(blob)) return MutualVoltageSensingScene
  if (/neural network/.test(blob)) return ObserverNeuralNetworkScene
  if (/four machine comparison|comparing the four/.test(blob)) return FourMachineComparisonScene
  if (/course integration|whole course/.test(blob)) return CourseIntegrationScene
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
        <g key={String(st)} className={`emdm-slide-in emdm-delay-${i}`}>
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
      <g className="emdm-emerge">
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
  // Module 1 — introduction and vehicle fundamentals
  'ev-history-timeline': EvHistoryTimelineScene,
  'hybrid-history-and-rationale': HybridHistoryScene,
  'vehicle-force-balance': VehicleForceBalanceScene,
  'rolling-resistance-mechanism': RollingResistanceScene,
  'drag-square-and-cube-law': DragSquareCubeScene,
  'grading-resistance': GradingResistanceScene,
  'adhesion-limit-and-weight-transfer': AdhesionLimitScene,
  'tractive-effort-curves': TractiveEffortCurvesScene,
  'ideal-vs-real-characteristics': IdealVsRealScene,
  'maximum-speed-intersection': MaximumSpeedScene,
  'gradeability-computation': GradeabilityScene,
  'acceleration-integration': AccelerationIntegrationScene,
  'braking-and-regeneration': BrakingRegenerationScene,
  'brake-distribution': BrakeDistributionScene,
  'requirement-assembly': RequirementAssemblyScene,
  'motor-vs-engine-fit': MotorVsEngineFitScene,
  // Module 2 — electric vehicle performance
  'ev-functional-chain': EvFunctionalChainScene,
  'single-motor-simplification': SingleMotorSimplificationScene,
  'multi-motor-configurations': MultiMotorConfigurationsScene,
  'constant-torque-region': ConstantTorqueRegionScene,
  'field-weakening-region': FieldWeakeningRegionScene,
  'speed-ratio-consequences': SpeedRatioScene,
  'gear-ratio-selection': GearRatioSelectionScene,
  'one-gear-vs-two-gear': OneGearVsTwoGearScene,
  'two-limiting-cases': TwoLimitingCasesScene,
  'two-phase-acceleration': TwoPhaseAccelerationScene,
  'operating-point-density': OperatingPointDensityScene,
  'energy-chain-and-range': EnergyChainRangeScene,
  'drive-cycle-comparison': DriveCycleComparisonScene,
  'regeneration-limits': RegenerationLimitsScene,
  'mass-spiral': MassSpiralScene,
  'machine-selection-criteria': MachineSelectionScene,
  // Module 3 — DC motor drives
  'dc-machine-commutation': DcCommutationScene,
  'speed-equation-anatomy': SpeedEquationScene,
  'torque-current-linearity': TorqueCurrentLinearityScene,
  'separately-excited-characteristic': SeparatelyExcitedScene,
  'armature-voltage-family': ArmatureVoltageFamilyScene,
  'field-weakening-dc': FieldWeakeningDcScene,
  'combined-control-strategy': CombinedControlScene,
  'chopper-principle': ChopperPrincipleScene,
  'conduction-modes': ConductionModesScene,
  'four-quadrant-plane': FourQuadrantPlaneScene,
  'single-chopper-reverse-switch': SingleChopperReverseScene,
  'class-c-chopper': ClassCChopperScene,
  'four-quadrant-bridge': FourQuadrantBridgeScene,
  'regeneration-boost-action': RegenerationBoostScene,
  'dc-drive-balance-sheet': DcDriveBalanceSheetScene,
  'cascade-control-structure': CascadeControlScene,
  // Module 4 — induction motor drives
  'rotating-field-formation': RotatingFieldScene,
  'slip-mechanism': SlipMechanismScene,
  'equivalent-circuit-power-split': EquivalentCircuitScene,
  'torque-slip-curve': TorqueSlipCurveScene,
  'volts-per-hertz-principle': VoltsPerHertzScene,
  'low-frequency-boost': LowFrequencyBoostScene,
  'induction-field-weakening': InductionFieldWeakeningScene,
  'scalar-control-limits': ScalarControlLimitsScene,
  'voltage-source-inverter': VoltageSourceInverterScene,
  'field-orientation-principle': FieldOrientationScene,
  'transformation-chain': TransformationChainScene,
  'direct-flux-orientation': DirectFluxOrientationScene,
  'indirect-flux-orientation': IndirectFluxOrientationScene,
  'voltage-control-foc': VoltageControlFocScene,
  'current-control-methods': CurrentControlMethodsScene,
  'induction-drive-summary': InductionDriveSummaryScene,
  // Module 5 — BLDC and SRM drives
  'bldc-inversion': BldcInversionScene,
  'bldc-classification': BldcClassificationScene,
  'magnet-material-comparison': MagnetMaterialScene,
  'bldc-performance': BldcPerformanceScene,
  'six-step-commutation': SixStepCommutationScene,
  'pm-field-weakening-and-fault': PmFieldWeakeningFaultScene,
  'observer-structure': ObserverStructureScene,
  'back-emf-zero-crossing': BackEmfZeroCrossingScene,
  'srm-structure': SrmStructureScene,
  'srm-torque-production': SrmTorqueProductionScene,
  'srm-converter-modes': SrmConverterModesScene,
  'flux-linkage-position-inference': FluxLinkagePositionScene,
  'mutual-voltage-sensing': MutualVoltageSensingScene,
  'observer-and-neural-network': ObserverNeuralNetworkScene,
  'four-machine-comparison': FourMachineComparisonScene,
  'course-integration': CourseIntegrationScene,
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


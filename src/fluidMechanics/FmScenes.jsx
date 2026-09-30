/**
 * FmScenes — VTU BEE613D Electric Motor and Drive Systems for EVs classroom
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
    <div className={`fm-scene ${className}`} aria-label={caption || 'Fluid Mechanics diagram'}>
      <svg viewBox={vb} role="img" className="fm-svg">
        <defs>
          <marker id="fmArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="fmArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="fmArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="fmArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="fmArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="fmArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="fmArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="fmArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="fmArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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
  if (tone === BLUE) return 'fmArrB'
  if (tone === AMBER) return 'fmArrA'
  if (tone === ROSE) return 'fmArrRo'
  if (tone === GREEN) return 'fmArrG'
  if (tone === PURP) return 'fmArrP'
  if (tone === TEAL) return 'fmArrT'
  if (tone === RED) return 'fmArrR'
  if (tone === MUTED) return 'fmArrM'
  return 'fmArr'
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
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#fmArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#fmArr)" />
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

/** Inductor: four half-circle coils over the body of the element. */

/** Independent source: a circle carrying either +/- (voltage) or an arrow
 *  (current). `dep` draws the diamond a dependent source uses instead. */

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
function Bars({ x, y, w, items = [], accent = BLUE, rowH = 34, className = 'fmm-bar-once', max }) {
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
          <g className={`${className} fmm-delay-${i % 5}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
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
          className={`fmm-flux fmm-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`fmm-current fmm-delay-${i}`}
          marker="url(#fmArrB)"
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
        <g key={t} className={`fmm-cell-in fmm-delay-${i}`}>
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
        <g key={String(p)} className={`fmm-cell-in fmm-delay-${i % 5}`}>
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

/* ── FM-specific primitives ──────────────────────────────────────────── */

/* Scene helpers unique to Fluid Mechanics land here. Coerce every numeric
   prop through n() -- including width/length props, not just x and y. */

/** Straight force/velocity arrow in one tone — forces, velocities, pressures. */
function Arr({ x1, y1, x2, y2, tone = N, width = 2.5, className = '', dash, opacity }) {
  return (
    <Wire
      d={`M${n(x1)} ${n(y1)} L${n(x2)} ${n(y2)}`}
      stroke={tone}
      width={n(width)}
      className={className}
      marker={`url(#${markerFor(tone)})`}
      dash={dash}
      opacity={opacity}
    />
  )
}

/** Pipe or nozzle in longitudinal section: bore h1 at inlet, h2 at outlet,
 *  centred on y. Module 2 draws a dozen of these. */
function Pipe({ x, y, w, h1, h2, fill = SKY, stroke = N, width = 2.4 }) {
  const [X, Y, W, A] = [n(x), n(y), n(w), n(h1) / 2]
  const B = h2 == null ? A : n(h2) / 2
  return (
    <g>
      <polygon points={`${X},${Y - A} ${X + W},${Y - B} ${X + W},${Y + B} ${X},${Y + A}`} fill={fill} />
      <Wire d={`M${X} ${Y - A} L${X + W} ${Y - B} M${X} ${Y + A} L${X + W} ${Y + B}`} stroke={stroke} width={n(width)} />
    </g>
  )
}

/* ── Module 1 ────────────────────────────────────────────────────────── */

/** Unit 1 — same small τ on a solid and a fluid: one stops at γ, one never stops. */
export function SolidVersusFluidShearScene() {
  const shears = [[160, 382], [320, 382], [160, 434], [320, 434]]
  return (
    <Scene caption="Same small τ on both: the solid stops at γ, the fluid never stops">
      {/* Solid: skews to a fixed angle and holds */}
      <rect x="40" y="40" width="400" height="232" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
      <L x={64} y={68} anchor="start" fill={AMBER}>SOLID</L>
      <rect x="90" y="222" width="260" height="12" fill={MUTED} />
      <rect x="150" y="122" width="120" height="100" fill="none" stroke={MUTED} strokeWidth="1.6" strokeDasharray="6 5" />
      <path className="fmm-emerge" d="M150 222 L270 222 L300 122 L180 122 Z" fill={AMBER} fillOpacity="0.18" stroke={AMBER} strokeWidth="2.5" />
      <g className="fmm-slide-in">
        <rect x="130" y="110" width="200" height="12" rx="3" fill={N} />
      </g>
      <Arr x1={200} y1={96} x2={280} y2={96} tone={AMBER} />
      <L x={240} y={86} size={13} fill={AMBER}>τ (small)</L>
      <Wire d="M150 222 L150 150" stroke={MUTED} width={1.4} dash="4 4" />
      <Wire d="M150 166 A56 56 0 0 1 166.1 168.4" stroke={AMBER} width={2} />
      <L x={140} y={184} size={13} fill={AMBER} anchor="end">γ fixed</L>
      <L x={240} y={258} size={12.5} fill={MUTED} weight={700}>deforms to γ, then holds</L>

      {/* Fluid: the material line keeps tilting while τ acts */}
      <rect x="460" y="40" width="400" height="232" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
      <L x={484} y={68} anchor="start" fill={BLUE}>FLUID</L>
      <rect x="510" y="122" width="250" height="100" fill={SKY} />
      <rect x="510" y="222" width="250" height="12" fill={MUTED} />
      <rect x="510" y="110" width="250" height="12" rx="3" fill={N} />
      <Wire d="M514 116 L756 116" stroke={WHITE} width={2} className="fmm-current" />
      <Arr x1={600} y1={96} x2={680} y2={96} tone={BLUE} />
      <L x={640} y={86} size={13} fill={BLUE}>τ (same)</L>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={`ml${i}`} className={`fmm-cell-in fmm-delay-${i}`}>
          <Wire d={`M540 222 L${540 + 38 * i} 122`} stroke={i === 5 ? BLUE : MUTED} width={i === 5 ? 2.6 : 1.6} />
        </g>
      ))}
      <circle cx="812" cy="170" r="24" fill={WHITE} stroke={N} strokeWidth="2.2" />
      <g className="fmm-spin" style={{ transformBox: 'view-box', transformOrigin: '812px 170px' }}>
        <Wire d="M812 170 L812 152" stroke={RED} width={2.5} />
      </g>
      <Dot cx={812} cy={170} r={3} />
      <L x={812} y={216} size={13} fill={RED}>t → ∞</L>
      <L x={640} y={258} size={12.5} fill={MUTED} weight={700}>keeps deforming while τ acts</L>

      {/* Consequence: at rest, no shear anywhere */}
      <rect x="40" y="290" width="820" height="186" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2" />
      <L x={64} y={316} anchor="start" size={15} fill={TEAL}>FLUID AT REST</L>
      <rect x="92" y="346" width="296" height="116" fill={SKY} />
      <Wire d="M90 332 L90 464 L390 464 L390 332" stroke={N} width={2.4} />
      {shears.map(([cx, cy], i) => (
        <g key={`sh${i}`}>
          <Arr x1={cx - 26} y1={cy - 6} x2={cx + 26} y2={cy - 6} tone={BLUE} width={2} />
          <Arr x1={cx + 26} y1={cy + 6} x2={cx - 26} y2={cy + 6} tone={BLUE} width={2} />
          <g className={`fmm-cell-in fmm-delay-${i + 2}`}>
            <Wire d={`M${cx - 20} ${cy - 16} L${cx + 20} ${cy + 16} M${cx - 20} ${cy + 16} L${cx + 20} ${cy - 16}`} stroke={RED} width={3} />
          </g>
        </g>
      ))}
      <L x={630} y={372} size={24} fill={TEAL}>at rest means no shear</L>
      <L x={630} y={404} size={14} weight={700}>any τ ≠ 0 would set the fluid moving</L>
      <L x={630} y={432} size={14} fill={MUTED} weight={700}>only normal pressure acts → fluid statics</L>
    </Scene>
  )
}

/** Unit 2 — measured density vs averaging volume: flat, window, then molecular scatter. */
export function ContinuumAveragingVolumeScene() {
  const osc = []
  for (let x = 440; x <= 590; x += 3) {
    const a = (x - 440) / 150
    osc.push([x, 220 - 95 * a * (0.6 * Math.sin(x * 0.41) + 0.4 * Math.sin(x * 1.07))])
  }
  const jit = (i) => 3 * Math.sin(i * 2.3)
  const crowd = []
  for (let r = 0; r < 7; r += 1) for (let c = 0; c < 7; c += 1) crowd.push([c * 11 + jit(r * 7 + c), r * 11 + jit(r * 5 + c + 3)])
  const inset = (y, sq, tone, title, sub) => (
    <g>
      <rect x="630" y={y} width="230" height="100" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      {crowd.map(([dx, dy], i) => (
        <Dot key={`c${y}-${i}`} cx={652 + dx} cy={y + 17 + dy} r={2.6} fill={N} opacity={sq === 80 ? 1 : 0.28} />
      ))}
      <rect x={686 - sq / 2} y={y + 50 - sq / 2} width={sq} height={sq} fill="none" stroke={tone} strokeWidth="2" strokeDasharray="5 4" />
      <L x={795} y={y + 44} size={13} fill={tone}>{title}</L>
      <L x={795} y={y + 66} size={12} fill={MUTED} weight={700}>{sub}</L>
    </g>
  )
  return (
    <Scene caption="Density is a continuum property only while δV holds many molecules">
      <rect className="fmm-emerge fmm-delay-2" x="250" y="112" width="186" height="286" fill={SKY} />
      <Axes x={80} y={400} w={530} h={300} tickLabels={[[165, 'large'], [440, 'δV*']]} yTicks={[[220, 'ρ']]} />
      <L x={92} y={96} anchor="start" size={13} fill={MUTED} weight={700}>measured density ρ</L>
      <L x={345} y={446} size={13} fill={MUTED} weight={700}>averaging volume δV — shrinking →</L>
      <Wire d="M440 112 L440 398" stroke={RED} width={1.6} dash="5 5" />
      <Curve pts={[[82, 220], [440, 220]]} stroke={BLUE} className="fmm-draw" />
      <Curve pts={osc} stroke={RED} width={2.2} className="fmm-draw fmm-delay-3" />
      <L x={343} y={134} size={13} fill={BLUE}>continuum window</L>
      <L x={165} y={200} size={15} fill={N}>①</L>
      <L x={343} y={200} size={15} fill={BLUE}>②</L>
      <L x={520} y={108} size={15} fill={RED}>③</L>
      <L x={515} y={364} size={12} fill={RED} weight={700}>count jumps</L>

      {inset(40, 80, N, '①  large δV', 'ρ = bulk value')}
      {inset(156, 30, BLUE, '②  window', 'still crowded')}
      <rect x="630" y="272" width="230" height="100" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <rect x="664" y="300" width="44" height="44" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="5 4" />
      <Dot cx={676} cy={314} r={2.8} />
      <Dot cx={694} cy={334} r={2.8} />
      <g className="fmm-shift"><Dot cx={696} cy={310} r={2.8} fill={RED} /></g>
      <g className="fmm-shift fmm-delay-4"><Dot cx={642} cy={326} r={2.8} fill={RED} /></g>
      <L x={795} y={316} size={13} fill={RED}>③  δV &lt; δV*</L>
      <L x={795} y={338} size={12} fill={MUTED} weight={700}>molecules in / out</L>

      <Card x={630} y={388} w={230} h={92} title="continuum fails for" accent={RED} linesY={56} lineH={20}
        lines={['rarefied gas at high altitude', 'micro-channels (path ≈ size)']} />
    </Scene>
  )
}

/** Unit 3 — one cubic metre, four density quantities, and the ring between them. */
export function FourDensityWheelScene() {
  const boxes = [
    { x: 117, y: 77, name: 'mass density', f: 'ρ = m / V', u: 'kg/m³ · water 1000', tone: BLUE },
    { x: 583, y: 77, name: 'weight density', f: 'w = ρ g', u: 'N/m³ · water 9810', tone: AMBER },
    { x: 583, y: 345, name: 'specific gravity', f: 'S = ρ / ρw', u: 'no units · water 1', tone: GREEN, beaker: true },
    { x: 117, y: 345, name: 'specific volume', f: 'v = 1 / ρ', u: 'm³/kg · water 0.001', tone: PURP },
  ]
  const arms = [[400, 215, 317, 155], [504, 195, 583, 155], [480, 295, 583, 345], [400, 295, 317, 345]]
  return (
    <Scene caption="One cubic metre of fluid, four ways to state how much is in it">
      <g className="fmm-emerge fmm-delay-6">
        <ellipse cx="450" cy="250" rx="330" ry="190" fill="none" stroke={TEAL} strokeWidth="2" strokeDasharray="8 6" />
      </g>
      {arms.map(([x1, y1, x2, y2], i) => (
        <g key={`arm${i}`} className={`fmm-emerge fmm-delay-${i + 1}`}>
          <Arr x1={x1} y1={y1} x2={x2} y2={y2} tone={boxes[i].tone} width={2.6} />
        </g>
      ))}
      <g className="fmm-emerge">
        <path d="M400 215 L424 195 L504 195 L480 215 Z" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <path d="M480 215 L504 195 L504 275 L480 295 Z" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <rect x="400" y="215" width="80" height="80" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
        <L x={440} y={248} size={16} fill={BLUE}>1 m³</L>
        <M x={440} y={272} size={10.5}>m = 1000 kg</M>
      </g>
      {boxes.map((b, i) => (
        <g key={b.name} className={`fmm-emerge fmm-delay-${i + 1}`}>
          <rect x={b.x} y={b.y} width="200" height="78" rx="10" fill={WHITE} stroke={b.tone} strokeWidth="2.4" />
          {b.beaker ? (
            <g>
              <rect x={b.x + 13} y={b.y + 38} width="24" height="26" fill={SKY} />
              <Wire d={`M${b.x + 12} ${b.y + 24} L${b.x + 12} ${b.y + 64} L${b.x + 38} ${b.y + 64} L${b.x + 38} ${b.y + 24}`} stroke={N} width={1.8} />
            </g>
          ) : null}
          <L x={b.x + (b.beaker ? 112 : 100)} y={b.y + 22} size={13} fill={b.tone}>{b.name}</L>
          <M x={b.x + (b.beaker ? 112 : 100)} y={b.y + 47} size={15}>{b.f}</M>
          <M x={b.x + (b.beaker ? 112 : 100)} y={b.y + 68} size={11} fill={MUTED}>{b.u}</M>
        </g>
      ))}
      <L x={372} y={170} size={13} fill={BLUE}>÷ V</L>
      <L x={560} y={200} size={13} fill={AMBER}>× g</L>
      <g className="fmm-decay-dot" style={{ '--fmm-dx': '56px', '--fmm-dy': '-28px' }}>
        <circle cx="516" cy="189" r="10" fill={AMBER} />
        <M x={516} y={193} size={12} fill={WHITE}>g</M>
      </g>
      <L x={522} y={340} size={13} fill={GREEN}>÷ ρw</L>
      <L x={330} y={300} size={13} fill={PURP}>invert</L>
      <g className="fmm-flip">
        <circle cx="358" cy="320" r="13" fill={WHITE} stroke={PURP} strokeWidth="2" />
        <M x={358} y={324} size={10.5} fill={PURP}>1/x</M>
      </g>
      <g className="fmm-emerge fmm-delay-6">
        <M x={450} y={48} size={12.5} fill={TEAL}>ρ → w : w = ρ g</M>
        <M x={792} y={245} size={12.5} fill={TEAL} anchor="start">w → S :</M>
        <M x={792} y={262} size={12.5} fill={TEAL} anchor="start">÷ 9810</M>
        <M x={450} y={466} size={12.5} fill={TEAL}>S → v : v = 1 / (1000 S)</M>
        <M x={108} y={245} size={12.5} fill={TEAL} anchor="end">v → ρ :</M>
        <M x={108} y={262} size={12.5} fill={TEAL} anchor="end">ρ = 1 / v</M>
      </g>
    </Scene>
  )
}

/** Unit 4 — Couette film: linear profile, no slip at both walls, τ = μ du/dy. */
export function NewtonianShearPlatesScene() {
  const hatch = []
  for (let x = 62; x <= 430; x += 14) hatch.push(`M${x} 404 L${x + 10} 392`)
  return (
    <Scene caption="Shear stress is proportional to the velocity gradient; the constant is μ">
      <rect x="60" y="380" width="380" height="12" fill={MUTED} />
      <Wire d={hatch.join(' ')} stroke={MUTED} width={1.4} />
      <rect x="60" y="150" width="380" height="12" rx="3" fill={N} />
      <Wire d="M64 156 L436 156" stroke={WHITE} width={2} className="fmm-current" />
      <Wire d="M100 162 L100 380" stroke={MUTED} width={1.4} />
      <Wire d="M100 380 L300 162" stroke={BLUE} width={1.6} dash="5 5" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => {
        const y = 380 - i * 33
        const len = ((380 - y) / 218) * 200
        return (
          <g key={`u${i}`} className={`fmm-cell-in fmm-delay-${i}`}>
            {i === 0 ? <Dot cx={100} cy={y - 4} r={3.5} fill={BLUE} /> : <Arr x1={100} y1={y} x2={100 + len} y2={y} tone={BLUE} width={2.2} />}
          </g>
        )
      })}
      <M x={296} y={212} anchor="start" size={13} fill={BLUE}>u(y)</M>
      <Arr x1={320} y1={136} x2={400} y2={136} />
      <L x={410} y={141} anchor="start" size={14}>U</L>
      <L x={180} y={140} size={12} fill={RED} className="fmm-charge">no slip: u = U</L>
      <L x={250} y={420} size={12} fill={RED} className="fmm-charge">no slip: u = 0</L>
      <Wire d="M430 166 L430 376 M424 166 L436 166 M424 376 L436 376" stroke={MUTED} width={1.4} />
      <L x={416} y={280} anchor="end" size={14} fill={MUTED}>h</L>
      <M x={320} y={300} anchor="start" size={12}>du/dy = U/h</M>
      <Arr x1={442} y1={156} x2={492} y2={156} tone={AMBER} width={3} />
      <L x={498} y={161} anchor="start" size={15} fill={AMBER}>F</L>
      <Wire d="M480 166 L480 432" stroke={AMBER} width={1.4} dash="4 4" />
      <rect x="40" y="432" width="460" height="44" rx="10" fill={SKY} stroke={AMBER} strokeWidth="2" />
      <M x={270} y={460} size={14}>τ = F/A = μ du/dy = μ U/h</M>

      <Axes x={560} y={420} w={300} h={300} xLabel="du/dy" yLabel="τ" />
      <Curve pts={[[560, 420], [840, 280]]} stroke={BLUE} className="fmm-draw" />
      <Curve pts={[[560, 420], [720, 140]]} stroke={AMBER} className="fmm-draw fmm-delay-3" />
      <Wire d="M660 370 L760 370 L760 320" stroke={MUTED} width={1.4} dash="4 3" />
      <M x={710} y={388} size={11} fill={MUTED}>Δ(du/dy)</M>
      <M x={768} y={349} size={11} fill={MUTED} anchor="start">Δτ</M>
      <L x={800} y={276} anchor="end" size={13} fill={BLUE}>water μ₁</L>
      <L x={732} y={150} anchor="start" size={13} fill={AMBER}>oil μ₂ &gt; μ₁</L>
      <L x={710} y={106} size={13} fill={N}>slope = μ (dynamic viscosity)</L>
    </Scene>
  )
}

/** Unit 5 — five fluid models on one τ vs du/dy plot, each with a real substance. */
export function RheologicalCurveFamilyScene() {
  const span = (x0, x1, f) => {
    const pts = []
    for (let x = x0; x <= x1; x += 6) pts.push([x, f(x - 90)])
    return pts
  }
  const curves = [
    { key: 'bingham', tone: ROSE, pts: [[90, 330], [540, 110]], tag: [556, 108], delay: 4 },
    { key: 'newton', tone: BLUE, pts: [[90, 440], [570, 160]], tag: [586, 158], delay: 0 },
    { key: 'dilatant', tone: AMBER, pts: span(90, 570, (d) => 440 - 210 * (d / 480) ** 2.2), tag: [586, 228], delay: 2 },
    { key: 'pseudo', tone: GREEN, pts: span(90, 570, (d) => 440 - 140 * (d / 480) ** 0.4), tag: [586, 298], delay: 3 },
  ]
  const rows = [
    { name: 'Bingham plastic', sub: 'toothpaste', tone: ROSE },
    { name: 'Newtonian', sub: 'water', tone: BLUE },
    { name: 'dilatant', sub: 'starch paste', tone: AMBER },
    { name: 'pseudoplastic', sub: 'paint', tone: GREEN },
    { name: 'ideal (μ = 0)', sub: 'vacuum-like limit', tone: PURP },
  ]
  const thumb = (i, cx, cy) => {
    if (i === 0) return <path d={`M${cx - 16} ${cy - 7} L${cx + 8} ${cy - 7} L${cx + 16} ${cy - 3} L${cx + 16} ${cy + 3} L${cx + 8} ${cy + 7} L${cx - 16} ${cy + 7} Z`} fill={WHITE} stroke={ROSE} strokeWidth="2" />
    if (i === 1) return <path d={`M${cx} ${cy - 15} Q${cx + 13} ${cy + 2} ${cx} ${cy + 12} Q${cx - 13} ${cy + 2} ${cx} ${cy - 15} Z`} fill={SKY} stroke={BLUE} strokeWidth="2" />
    if (i === 2) return <path d={`M${cx - 16} ${cy - 4} Q${cx} ${cy + 20} ${cx + 16} ${cy - 4} Z`} fill={CREAM} stroke={AMBER} strokeWidth="2" />
    if (i === 3) return <rect x={cx - 11} y={cy - 12} width="22" height="24" rx="3" fill={GREEN} fillOpacity="0.25" stroke={GREEN} strokeWidth="2" />
    return <circle cx={cx} cy={cy} r="12" fill="none" stroke={PURP} strokeWidth="2" strokeDasharray="4 3" />
  }
  return (
    <Scene caption="τ against du/dy: the shape of the curve names the fluid">
      <Axes x={90} y={440} w={520} h={380} xLabel="rate of deformation du/dy" />
      <L x={100} y={52} anchor="start" size={13} fill={MUTED} weight={700}>shear stress τ</L>
      <Wire d="M90 437 L570 437" stroke={PURP} width={4} dash="10 6" className="fmm-emerge fmm-delay-1" />
      {curves.map((c) => (
        <g key={c.key}>
          <Curve pts={c.pts} stroke={c.tone} width={c.key === 'newton' ? 3.2 : 2.8} className={`fmm-draw fmm-delay-${c.delay}`} />
        </g>
      ))}
      <Wire d="M84 440 L76 440 L76 330 L84 330" stroke={ROSE} width={2} className="fmm-emerge fmm-delay-4" />
      <M x={70} y={390} anchor="end" size={13} fill={ROSE}>τy</M>
      {[...curves.map((c) => c.tag), [586, 424]].map(([tx, ty], i) => {
        const tone = [ROSE, BLUE, AMBER, GREEN, PURP][i]
        return (
          <g key={`tag${i}`}>
            <circle cx={tx} cy={ty} r="10" fill={tone} />
            <L x={tx} y={ty + 5} size={12} fill={WHITE}>{i + 1}</L>
          </g>
        )
      })}
      {rows.map((r, i) => {
        const cy = 90 + i * 80
        return (
          <g key={r.name}>
            <rect x="640" y={cy - 32} width="240" height="64" rx="10" fill={WHITE} stroke={r.tone} strokeWidth="2" />
            <circle cx="662" cy={cy} r="11" fill={r.tone} />
            <L x={662} y={cy + 5} size={12} fill={WHITE}>{i + 1}</L>
            <L x={684} y={cy - 5} anchor="start" size={14} fill={r.tone}>{r.name}</L>
            <L x={684} y={cy + 16} anchor="start" size={12} fill={MUTED} weight={700}>{r.sub}</L>
            <g className={`fmm-cell-in fmm-delay-${5 + (i % 3)}`}>{thumb(i, 848, cy)}</g>
          </g>
        )
      })}
    </Scene>
  )
}

/** Unit 6 — unbalanced surface molecule, then σ·πd = Δp·πd²/4 for a drop and a bubble. */
export function SurfaceTensionBalanceScene() {
  const star = (cx, cy, dirs, len) => dirs.map(([dx, dy]) => [cx + dx * len, cy + dy * len])
  const all = [[1, 0], [0.71, 0.71], [0, 1], [-0.71, 0.71], [-1, 0], [-0.71, -0.71], [0, -1], [0.71, -0.71]]
  const lower = all.slice(0, 5)
  return (
    <Scene caption="The surface pulls inward, so the pressure inside a drop or bubble is higher">
      <rect x="30" y="30" width="300" height="440" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={180} y={58} size={15}>MOLECULES</L>
      <rect x="40" y="150" width="280" height="310" fill={SKY} />
      <Wire d="M40 150 L320 150" stroke={BLUE} width={2.4} />
      <L x={290} y={100} size={12} fill={MUTED} weight={700}>air</L>
      <L x={185} y={132} size={12.5} fill={N}>surface molecule</L>
      {star(185, 170, lower, 40).map(([x2, y2], i) => (
        <Arr key={`s${i}`} x1={185} y1={170} x2={x2} y2={y2} tone={BLUE} width={2} />
      ))}
      <Dot cx={185} cy={170} r={7} fill={N} />
      <g className="fmm-emerge fmm-delay-3">
        <Arr x1={185} y1={180} x2={185} y2={258} tone={RED} width={4.5} />
      </g>
      <L x={200} y={240} anchor="start" size={12.5} fill={RED}>net inward</L>
      <g className="fmm-collapse">
        {star(185, 360, all, 40).map(([x2, y2], i) => (
          <Arr key={`i${i}`} x1={185} y1={360} x2={x2} y2={y2} tone={BLUE} width={2} />
        ))}
      </g>
      <Dot cx={185} cy={360} r={7} fill={N} />
      <L x={185} y={434} size={12.5}>interior: Σ F = 0</L>

      <rect x="345" y="30" width="300" height="440" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={495} y={58} size={15}>DROPLET — one surface</L>
      <path d="M460 140 A80 80 0 0 1 460 300" fill="none" stroke={MUTED} strokeWidth="1.6" strokeDasharray="5 5" />
      <path d="M460 140 A80 80 0 0 0 460 300 Z" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
      <ellipse cx="460" cy="220" rx="20" ry="80" fill={SKY} stroke={BLUE} strokeWidth="2" />
      <g className="fmm-cell-in fmm-delay-2">
        {[180, 205, 230, 255].map((y) => (
          <Arr key={`p${y}`} x1={520} y1={y} x2={466} y2={y} tone={AMBER} width={2.2} />
        ))}
      </g>
      <g className="fmm-cell-in fmm-delay-3">
        <Arr x1={460} y1={140} x2={515} y2={140} tone={ROSE} width={3} />
        <Arr x1={460} y1={300} x2={515} y2={300} tone={ROSE} width={3} />
      </g>
      <M x={524} y={144} anchor="start" size={12} fill={ROSE}>σ around πd</M>
      <M x={556} y={222} anchor="start" size={12} fill={AMBER}>Δp·πd²/4</M>
      <rect x="360" y="340" width="270" height="110" rx="10" fill={SKY} stroke={BLUE} strokeWidth="1.8" />
      <M x={495} y={380} size={14}>σ πd = Δp πd²/4</M>
      <g className="fmm-emerge fmm-delay-4">
        <M x={495} y={420} size={17} fill={GREEN} weight={800}>Δp = 4σ / d</M>
      </g>

      <rect x="660" y="30" width="210" height="440" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={765} y={58} size={14}>BUBBLE — two surfaces</L>
      <path d="M765 144 A56 56 0 0 0 765 256 L765 250 A50 50 0 0 1 765 150 Z" fill={SKY} stroke={BLUE} strokeWidth="2" />
      {[180, 200, 220].map((y) => (
        <Arr key={`bp${y}`} x1={800} y1={y} x2={770} y2={y} tone={AMBER} width={2} />
      ))}
      <Arr x1={765} y1={140} x2={808} y2={140} tone={ROSE} width={2.6} />
      <Arr x1={765} y1={260} x2={808} y2={260} tone={ROSE} width={2.6} />
      <g className="fmm-cell-in fmm-delay-5">
        <Arr x1={765} y1={154} x2={808} y2={154} tone={ROSE} width={2.6} />
        <Arr x1={765} y1={246} x2={808} y2={246} tone={ROSE} width={2.6} />
        <M x={816} y={151} anchor="start" size={12} fill={ROSE}>× 2</M>
      </g>
      <rect x="670" y="340" width="190" height="110" rx="10" fill={SKY} stroke={ROSE} strokeWidth="1.8" />
      <M x={765} y={372} size={12}>2σπd = Δp πd²/4</M>
      <g className="fmm-emerge fmm-delay-6">
        <M x={765} y={404} size={16} fill={GREEN} weight={800}>Δp = 8σ / d</M>
        <L x={765} y={434} size={12} fill={ROSE}>factor doubles</L>
      </g>
    </Scene>
  )
}

/** Unit 7 — water climbs, mercury sinks; free body of the column; h ∝ 1/d. */
export function CapillaryRiseDepressionScene() {
  const hyper = []
  for (let dx = 16; dx <= 190; dx += 6) hyper.push([670 + dx, 380 - 3000 / dx])
  return (
    <Scene caption="Adhesion beats cohesion → rise; cohesion wins → depression; h = 4σ cosθ / ρgd">
      <L x={135} y={60} size={14} fill={BLUE}>water: rises</L>
      <L x={335} y={60} size={14} fill={MUTED}>mercury: falls</L>
      <L x={540} y={60} size={14}>free body</L>
      <L x={770} y={60} size={14}>rise vs bore</L>

      {/* Water */}
      <rect x="50" y="330" width="170" height="110" fill={SKY} />
      <Wire d="M50 310 L50 440 L220 440 L220 310" stroke={N} width={2.2} />
      <g className="fmm-cell-in fmm-delay-1">
        <path d="M121 400 L121 200 Q135 224 149 200 L149 400 Z" fill={SKY} />
        <Wire d="M121 200 Q135 224 149 200" stroke={BLUE} width={2.2} />
      </g>
      <Wire d="M120 150 L120 400 M150 150 L150 400" stroke={N} width={2.4} />
      <Wire d="M100 205 L100 330 M94 205 L106 205 M94 330 L106 330" stroke={MUTED} width={1.4} />
      <L x={92} y={272} anchor="end" size={14} fill={MUTED}>h</L>
      <Wire d="M120 216 A16 16 0 0 0 128 213.9" stroke={GREEN} width={2} />
      <L x={112} y={194} anchor="end" size={12} fill={GREEN}>θ &lt; 90°</L>
      <g className="fmm-emerge fmm-delay-2">
        <Arr x1={150} y1={200} x2={186} y2={200} tone={GREEN} width={2.6} />
        <Arr x1={150} y1={200} x2={142} y2={214} tone={ROSE} width={2} />
      </g>

      {/* Mercury */}
      <rect x="250" y="330" width="170" height="110" fill={MUTED} fillOpacity="0.55" />
      <Wire d="M250 310 L250 440 L420 440 L420 310" stroke={N} width={2.2} />
      <rect x="321" y="329" width="28" height="50" fill={CREAM} />
      <g className="fmm-cell-in fmm-delay-1">
        <path d="M321 400 L321 376 Q335 356 349 376 L349 400 Z" fill={MUTED} fillOpacity="0.55" />
        <Wire d="M321 376 Q335 356 349 376" stroke={N} width={2.2} />
      </g>
      <Wire d="M320 150 L320 400 M350 150 L350 400" stroke={N} width={2.4} />
      <Wire d="M366 330 L366 368 M360 330 L372 330 M360 368 L372 368" stroke={N} width={1.4} />
      <L x={376} y={326} anchor="start" size={14}>h</L>
      <L x={312} y={300} anchor="end" size={12} fill={AMBER}>θ &gt; 90°</L>
      <g className="fmm-emerge fmm-delay-2">
        <Arr x1={320} y1={376} x2={306} y2={376} tone={GREEN} width={2} />
        <Arr x1={320} y1={376} x2={336} y2={408} tone={ROSE} width={2.6} />
      </g>

      <Arr x1={60} y1={462} x2={90} y2={462} tone={GREEN} width={2.4} />
      <L x={96} y={467} anchor="start" size={12} fill={GREEN}>adhesion</L>
      <Arr x1={250} y1={462} x2={280} y2={462} tone={ROSE} width={2.4} />
      <L x={286} y={467} anchor="start" size={12} fill={ROSE}>cohesion</L>

      {/* Free body of the raised water column */}
      <g className="fmm-slide-in fmm-delay-3">
        <rect x="520" y="200" width="40" height="150" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <Arr x1={520} y1={200} x2={510} y2={165} tone={ROSE} width={2.6} />
        <Arr x1={560} y1={200} x2={570} y2={165} tone={ROSE} width={2.6} />
        <Arr x1={540} y1={300} x2={540} y2={390} tone={AMBER} width={3} />
      </g>
      <M x={540} y={150} size={12} fill={ROSE}>σ cosθ · πd</M>
      <M x={540} y={412} size={12} fill={AMBER}>W = ρg (πd²/4) h</M>
      <M x={540} y={448} size={13} fill={GREEN} weight={800}>h = 4σ cosθ / (ρ g d)</M>

      <Axes x={670} y={380} w={200} h={240} xLabel="bore d" yLabel="h" />
      <Curve pts={hyper} stroke={BLUE} className="fmm-draw fmm-delay-5" />
      <L x={800} y={290} size={13} fill={BLUE}>h ∝ 1/d</L>
    </Scene>
  )
}

/** Unit 8 — pressure dips below p_v at the eye, bubbles grow, then collapse and pit the blade. */
export function CavitationPressureTrackScene() {
  const trace = [[60, 320], [120, 330], [170, 360], [210, 395], [250, 412], [300, 412], [340, 398], [370, 380], [420, 340], [500, 310], [640, 290]]
  const pv = (T) => 0.611 * Math.exp((17.27 * T) / (T + 237.3))
  const vp = []
  for (let T = 0; T <= 100; T += 5) vp.push([710 + T * 1.5, 280 - pv(T) * 1.678])
  return (
    <Scene caption="Where local pressure falls below vapour pressure the liquid boils, then implodes">
      {/* Passage in section */}
      <Wire d="M60 80 C200 80 220 120 300 120 L640 70" stroke={N} width={2.6} />
      <Wire d="M60 220 C200 220 220 180 300 180 L640 230" stroke={N} width={2.6} />
      <Wire d="M60 150 C200 150 220 150 300 150 L640 150" stroke={BLUE} width={2} className="fmm-current-slow" opacity={0.5} />
      <Arr x1={70} y1={115} x2={130} y2={115} tone={BLUE} />
      <L x={270} y={94} size={12.5} fill={BLUE}>nucleate &amp; grow</L>
      <L x={400} y={86} size={12.5} fill={RED}>collapse → shock</L>
      {[[225, 138, 2], [250, 162, 3], [275, 136, 4], [305, 160, 5.5], [330, 140, 7]].map(([cx, cy, r], i) => (
        <g key={`b${i}`} className={`fmm-cell-in fmm-delay-${i + 1}`}>
          <circle cx={cx} cy={cy} r={r} fill={WHITE} stroke={BLUE} strokeWidth="1.8" />
        </g>
      ))}
      <g className="fmm-sweep-x" style={{ '--fmm-sweep': '140px' }}>
        <circle cx="215" cy="150" r="5" fill={WHITE} stroke={BLUE} strokeWidth="2" />
      </g>
      <g className="fmm-collapse">
        <circle cx="365" cy="150" r="8" fill={WHITE} stroke={RED} strokeWidth="2" />
      </g>
      <g className="fmm-flux">
        <Wire d="M380 160 L380 150 M388 166 L396 160 M372 166 L364 160 M390 174 L400 174 M370 174 L360 174" stroke={RED} width={2.2} />
      </g>
      {[372, 382, 392, 402, 412].map((x, i) => (
        <g key={`pit${x}`} className={`fmm-cell-in fmm-delay-${4 + (i % 3)}`}>
          <circle cx={x} cy={180 + ((x - 300) * 50) / 340 + 3} r="2.6" fill={N} />
        </g>
      ))}
      <L x={392} y={222} size={12} fill={N}>pitting</L>

      {/* Pressure trace along the same path */}
      <Wire d="M205 232 L205 440 M355 190 L355 440" stroke={MUTED} width={1.2} dash="3 5" />
      <rect x="205" y="390" width="150" height="50" fill={ROSE} fillOpacity="0.12" />
      <Axes x={60} y={440} w={600} h={180} xLabel="flow path →" yLabel="p" tickLabels={[[250, 'suction eye'], [520, 'impeller']]} />
      <Wire d="M60 390 L660 390" stroke={RED} width={2} dash="8 6" />
      <L x={650} y={410} anchor="end" size={12} fill={RED}>vapour pressure p_v</L>
      <Curve pts={trace} stroke={BLUE} className="fmm-draw" />
      <L x={280} y={380} size={12.5} fill={ROSE}>p &lt; p_v</L>

      {/* Inset: p_v rises steeply with T */}
      <rect x="680" y="40" width="200" height="330" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={780} y={66} size={13}>vapour pressure vs T</L>
      <Axes x={710} y={280} w={160} h={180} yLabel="p_v" tickLabels={[[740, '20 °C'], [830, '80 °C']]} />
      <Curve pts={vp} stroke={PURP} className="fmm-draw fmm-delay-6" />
      <Dot cx={740} cy={280 - pv(20) * 1.678} r={4} fill={PURP} />
      <Dot cx={830} cy={280 - pv(80) * 1.678} r={4} fill={PURP} />
      <M x={790} y={330} size={11.5} fill={PURP}>20 °C: p_v ≈ 2.3 kPa</M>
      <M x={790} y={350} size={11.5} fill={PURP}>80 °C: p_v ≈ 47 kPa</M>
      <Card x={680} y={386} w={200} h={90} title="cavitation when" accent={RED} linesY={56} lineH={20}
        lines={['local p falls below p_v', 'collapse erodes metal']} />
    </Scene>
  )
}

/** Unit 9 — a loaded piston barely moves; K spans decades; K sets the pulse speed. */
export function BulkModulusCompressionScene() {
  const cols = [
    { name: 'air', lg: 5, val: '0.1 MPa', tone: AMBER, x: 410 },
    { name: 'oil', lg: 9.18, val: '1.5 GPa', tone: PURP, x: 475 },
    { name: 'water', lg: 9.34, val: '2.2 GPa', tone: BLUE, x: 540 },
    { name: 'steel', lg: 11.2, val: '160 GPa', tone: N, x: 605 },
  ]
  const yOf = (lg) => 420 - (lg - 4) * 35
  return (
    <Scene caption="Liquids hardly compress: K is thousands of times larger than for air">
      {/* Piston on a sealed liquid */}
      <rect x="30" y="30" width="290" height="450" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={175} y={56} size={14}>LIQUID UNDER LOAD</L>
      <rect x="72" y="200" width="96" height="228" fill={SKY} />
      <Wire d="M70 160 L70 430 L170 430 L170 160" stroke={N} width={2.6} />
      <Wire d="M170 340 L236 340 L236 328" stroke={N} width={2.4} />
      {[200, 240, 280, 320, 360, 400].map((y) => (
        <Wire key={`vs${y}`} d={`M58 ${y} L70 ${y}`} stroke={MUTED} width={1.6} />
      ))}
      <M x={54} y={194} anchor="end" size={12} fill={MUTED}>V</M>
      <g className="fmm-decay-dot" style={{ '--fmm-dx': '0px', '--fmm-dy': '3px' }}>
        <rect x="90" y="96" width="60" height="24" rx="4" fill={AMBER} />
        <L x={120} y={113} size={13} fill={WHITE}>F</L>
        <rect x="116" y="120" width="8" height="66" fill={N} />
        <rect x="72" y="186" width="96" height="14" fill={N} />
      </g>
      <circle cx="236" cy="300" r="28" fill={WHITE} stroke={N} strokeWidth="2.2" />
      <g className="fmm-needle" style={{ transformBox: 'view-box', transformOrigin: '236px 300px' }}>
        <Wire d="M236 300 L236 280" stroke={RED} width={2.5} />
      </g>
      <Dot cx={236} cy={300} r={3} />
      <M x={280} y={304} anchor="start" size={12} fill={MUTED}>p ↑</M>
      <g className="fmm-emerge fmm-delay-2">
        <Wire d="M168 193 L208 208" stroke={MUTED} width={1.4} dash="3 3" />
        <circle cx="250" cy="180" r="50" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
        <Wire d="M212 165 L288 165" stroke={MUTED} width={2} dash="5 4" />
        <Wire d="M212 190 L288 190" stroke={BLUE} width={2.6} />
        <M x={250} y={159} size={10.5} fill={MUTED}>before</M>
        <M x={250} y={206} size={10.5} fill={BLUE}>after</M>
        <M x={250} y={124} size={11} fill={BLUE}>zoom × 2000</M>
      </g>
      <M x={250} y={250} size={11.5} fill={BLUE}>ΔV/V ≈ 0.05 %</M>
      <M x={175} y={462} size={14}>K = −dp / (dV/V)</M>

      {/* Log bar chart */}
      <rect x="330" y="30" width="320" height="450" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={490} y={56} size={14}>BULK MODULUS K (log)</L>
      <Axes x={380} y={420} w={255} h={300} yLabel="Pa"
        tickLabels={cols.map((c) => [c.x, c.name])}
        yTicks={[[420, '10⁴'], [350, '10⁶'], [280, '10⁸'], [210, '10¹⁰'], [140, '10¹²']]} />
      {cols.map((c, i) => (
        <g key={c.name}>
          <g className={`fmm-cell-in fmm-delay-${i + 3}`}>
            <rect x={c.x - 18} y={yOf(c.lg)} width="36" height={420 - yOf(c.lg)} rx="4" fill={c.tone} fillOpacity="0.8" />
          </g>
          <M x={c.x} y={yOf(c.lg) - 8} size={11} fill={c.tone}>{c.val}</M>
        </g>
      ))}
      <Wire d="M437 385 L443 385 L443 274 L437 274" stroke={RED} width={1.8} />
      <L x={410} y={300} size={12} fill={RED}>~10⁴×</L>

      {/* Pulse speed */}
      <rect x="660" y="30" width="220" height="450" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={770} y={56} size={14}>PULSE SPEED</L>
      <rect x="675" y="110" width="190" height="30" fill={SKY} stroke={N} strokeWidth="2" />
      <g className="fmm-sweep-x" style={{ '--fmm-sweep': '178px' }}>
        <rect x="676" y="111" width="10" height="28" fill={BLUE} />
      </g>
      <M x={770} y={164} size={12} fill={BLUE}>water c ≈ 1480 m/s</M>
      <rect x="675" y="200" width="190" height="30" fill={CREAM} stroke={N} strokeWidth="2" />
      <g className="fmm-sweep-x" style={{ '--fmm-sweep': '41px' }}>
        <rect x="676" y="201" width="10" height="28" fill={AMBER} />
      </g>
      <M x={770} y={254} size={12} fill={AMBER}>air c ≈ 340 m/s</M>
      <M x={770} y={296} size={16}>c = √(K/ρ)</M>
      <Card x={665} y={320} w={210} h={110} title="incompressible limit" accent={RED} linesY={58} lineH={20}
        lines={['K → ∞ gives c → ∞', 'pulse would arrive', 'instantly']} />
    </Scene>
  )
}

/** Unit 10 — wedge element: area terms ∝ L, weight ∝ L², so p is equal in all directions. */
export function PascalWedgeProofScene() {
  const steps = [[480, 90, 1], [630, 54, 0.45], [770, 20, 0.12]]
  return (
    <Scene caption="Shrink the wedge: the weight term vanishes first, leaving p_x = p_z = p_s">
      {/* The wedge element */}
      <path d="M80 90 L80 330 L330 330 Z" fill={SKY} stroke={N} strokeWidth="2.6" />
      <Arr x1={30} y1={210} x2={76} y2={210} tone={BLUE} width={3} />
      <M x={30} y={190} anchor="start" size={12.5} fill={BLUE}>p_x·dz</M>
      <Arr x1={205} y1={386} x2={205} y2={334} tone={BLUE} width={3} />
      <M x={215} y={380} anchor="start" size={12.5} fill={BLUE}>p_z·dx</M>
      <Arr x1={246.5} y1={166.7} x2={208.5} y2={206.4} tone={BLUE} width={3} />
      <M x={256} y={160} anchor="start" size={12.5} fill={BLUE}>p_s·ds</M>
      <Arr x1={163} y1={250} x2={163} y2={300} tone={PURP} width={3} />
      <M x={172} y={290} anchor="start" size={12} fill={PURP}>W ∝ dx·dz</M>
      <M x={92} y={150} anchor="start" size={12} fill={MUTED}>dz</M>
      <M x={130} y={352} size={12} fill={MUTED}>dx</M>
      <Wire d="M300 330 A30 30 0 0 1 308.4 309.2" stroke={MUTED} width={1.6} />
      <M x={292} y={322} anchor="end" size={12} fill={MUTED}>θ</M>

      {/* The two balances, area terms blue and the volume term purple */}
      <L x={470} y={48} anchor="start" size={13} fill={MUTED} weight={700}>force balance per unit depth</L>
      <g className="fmm-slide-in fmm-delay-1">
        <M x={470} y={76} anchor="start" size={13}>
          Σx: <tspan fill={BLUE}>p_x·dz</tspan> = <tspan fill={BLUE}>p_s·ds·sinθ</tspan> → p_x = p_s
        </M>
      </g>
      <g className="fmm-slide-in fmm-delay-2">
        <M x={470} y={104} anchor="start" size={13}>
          Σz: <tspan fill={BLUE}>p_z·dx</tspan> = <tspan fill={BLUE}>p_s·ds·cosθ</tspan> + <tspan fill={PURP}>ρg·½dx·dz</tspan>
        </M>
      </g>
      <g className="fmm-slide-in fmm-delay-3">
        <M x={470} y={132} anchor="start" size={13}>
          ÷dx: p_z − p_s = <tspan fill={PURP}>½ρg·dz</tspan> → 0
        </M>
      </g>

      {/* Three shrink stages: area bars fall like L, volume bars like L² */}
      <L x={470} y={178} anchor="start" size={13} fill={MUTED} weight={700}>shrink dx, dz → 0</L>
      {steps.map(([x0, Ln, w], i) => (
        <g key={`st${i}`} className={`fmm-cell-in fmm-delay-${i + 3}`}>
          <path d={`M${x0} ${290 - Ln} L${x0} 290 L${x0 + Ln * 1.04} 290 Z`} fill={SKY} stroke={N} strokeWidth="2" />
          <Wire d={`M${x0 + Ln * 0.3} ${290 - Ln * 0.5} L${x0 + Ln * 0.3} ${290 - Ln * 0.2}`} stroke={PURP} width={2} opacity={w} />
          <rect x={x0} y="298" width={Ln * 0.8} height="10" rx="3" fill={BLUE} />
          <rect x={x0} y="318" width={(Ln * Ln) / 112} height="10" rx="3" fill={PURP} opacity={Math.max(w, 0.3)} />
        </g>
      ))}
      <M x={800} y={308} anchor="start" size={11.5} fill={BLUE}>area ∝ L</M>
      <M x={800} y={328} anchor="start" size={11.5} fill={PURP}>vol ∝ L²</M>
      <g className="fmm-emerge fmm-delay-6">
        <rect x="470" y="346" width="400" height="40" rx="10" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <M x={670} y={372} size={15} fill={GREEN} weight={800}>p_x = p_z = p_s at a point</M>
      </g>

      {/* Hydraulic press: one pressure, two forces */}
      <rect x="72" y="422" width="26" height="48" fill={SKY} />
      <rect x="100" y="455" width="150" height="15" fill={SKY} />
      <rect x="252" y="432" width="116" height="38" fill={SKY} />
      <Wire d="M70 410 L70 470 L370 470 L370 410 M100 410 L100 455 L250 455 L250 410" stroke={N} width={2.2} />
      <g className="fmm-decay-dot" style={{ '--fmm-dx': '0px', '--fmm-dy': '6px' }}>
        <rect x="70" y="414" width="30" height="8" fill={N} />
        <Arr x1={85} y1={394} x2={85} y2={412} tone={ROSE} width={3} />
      </g>
      <g className="fmm-decay-dot" style={{ '--fmm-dx': '0px', '--fmm-dy': '-2px' }}>
        <rect x="250" y="424" width="120" height="8" fill={N} />
        <Arr x1={310} y1={422} x2={310} y2={400} tone={GREEN} width={5} />
      </g>
      <M x={104} y={404} anchor="start" size={12} fill={ROSE}>F₁ = p·A₁</M>
      <M x={380} y={414} anchor="start" size={12} fill={GREEN}>F₂ = p·A₂</M>
      <M x={175} y={446} size={12} fill={BLUE}>same p</M>
      <M x={670} y={440} size={18} fill={GREEN} weight={800}>F₂ / F₁ = A₂ / A₁</M>
      <L x={670} y={468} size={12} fill={MUTED} weight={700}>pressure is transmitted undiminished (Pascal)</L>
    </Scene>
  )
}

/** Unit 11 — four shapes, one depth, one reading; the column free body; p rises linearly. */
export function HydrostaticParadoxScene() {
  const vessels = [
    { walls: 'M70 160 L70 380 M100 160 L100 380', fill: '70,180 100,180 100,380 70,380', vx: 85 },
    { walls: 'M150 380 L115 160 M190 380 L225 160', fill: '150,380 190,380 221.8,180 118.2,180', vx: 170 },
    { walls: 'M250 380 L290 160 M350 380 L310 160', fill: '250,380 350,380 313.6,180 286.4,180', vx: 300 },
    { walls: 'M380 380 L380 300 L410 300 L470 220 L470 160 M480 380 L480 300 L440 300 L500 220 L500 160', fill: '380,380 480,380 480,300 440,300 500,220 500,180 470,180 470,220 410,300 380,300', vx: 430 },
  ]
  return (
    <Scene caption="Same depth, same liquid, same pressure — the vessel's shape does not matter">
      {vessels.map((v, i) => (
        <g key={`v${i}`}>
          <g className={`fmm-cell-in fmm-delay-${i}`}>
            <polygon points={v.fill} fill={SKY} />
          </g>
          <Wire d={v.walls} stroke={N} width={2.4} />
          <Wire d={`M${v.vx} 380 L${v.vx} 399`} stroke={N} width={2} />
          <circle cx={v.vx} cy="412" r="13" fill={WHITE} stroke={N} strokeWidth="2" />
          <g className={`fmm-cell-in fmm-delay-${i + 4}`}>
            <Wire d={`M${v.vx} 412 L${v.vx + 8} 404`} stroke={GREEN} width={2.4} />
          </g>
        </g>
      ))}
      <Wire d="M40 380 L520 380" stroke={N} width={3} />
      <Wire d="M50 180 L530 180" stroke={BLUE} width={1.4} dash="6 5" />
      <L x={300} y={132} size={12.5} fill={BLUE}>same free-surface level</L>
      <Wire d="M540 180 L540 380 M534 180 L546 180 M534 380 L546 380" stroke={MUTED} width={1.4} />
      <L x={548} y={284} anchor="start" size={14} fill={MUTED}>h</L>
      <g className="fmm-emerge fmm-delay-6">
        <rect x="40" y="432" width="480" height="30" rx="8" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
        {vessels.map((v) => (
          <M key={`r${v.vx}`} x={v.vx} y={452} size={12} fill={GREEN}>p = ρgh</M>
        ))}
      </g>
      <L x={280} y={484} size={12} fill={GREEN}>identical readings</L>

      {/* Free body of a vertical column */}
      <g className="fmm-slide-in fmm-delay-5">
        <rect x="620" y="190" width="60" height="160" fill={SKY} stroke={BLUE} strokeWidth="2.2" />
        <Arr x1={650} y1={150} x2={650} y2={188} tone={AMBER} width={3} />
        <Arr x1={650} y1={250} x2={650} y2={300} tone={PURP} width={3} />
        <Arr x1={650} y1={400} x2={650} y2={352} tone={AMBER} width={3.4} />
      </g>
      <M x={660} y={160} anchor="start" size={12} fill={AMBER}>p₁A</M>
      <M x={686} y={282} anchor="start" size={12} fill={PURP}>W = ρgAΔh</M>
      <M x={660} y={396} anchor="start" size={12} fill={AMBER}>p₂A</M>
      <M x={650} y={430} size={12}>p₂A = p₁A + ρgAΔh</M>
      <M x={650} y={452} size={12} fill={GREEN}>p₂ − p₁ = ρg Δh</M>

      {/* Pressure against depth */}
      <Arr x1={770} y1={150} x2={872} y2={150} tone={MUTED} width={2.2} />
      <Arr x1={770} y1={150} x2={770} y2={410} tone={MUTED} width={2.2} />
      <L x={866} y={140} anchor="end" size={13} fill={MUTED}>p</L>
      <L x={776} y={428} anchor="start" size={13} fill={MUTED}>depth h</L>
      <Curve pts={[[770, 150], [860, 390]]} stroke={BLUE} className="fmm-draw fmm-delay-6" />
      <L x={800} y={200} anchor="start" size={12} fill={BLUE}>slope = ρg</L>
    </Scene>
  )
}

/** Unit 12 — one axis, two scales: absolute from zero, gauge from the atmospheric line. */
export function PressureDatumLadderScene() {
  const y = (abs) => 470 - abs * 1.176
  const atm = y(101.3)
  const ties = [
    { abs: 321.3, tone: AMBER, left: '321 kPa abs', right: 'tyre: +220 kPa gauge', ly: 96 },
    { abs: 11.3, tone: TEAL, left: '11 kPa abs', right: 'condenser: −90 kPa gauge', ly: 430 },
    { abs: 0, tone: RED, left: '0 kPa abs', right: 'perfect vacuum: −101 kPa gauge', ly: 474 },
  ]
  return (
    <Scene caption="Absolute pressure counts from true zero; gauge counts from the local atmosphere">
      <L x={330} y={50} size={14} fill={BLUE}>ABSOLUTE</L>
      <L x={470} y={50} size={14} fill={GREEN}>GAUGE</L>
      <Wire d="M330 470 L330 66" stroke={BLUE} width={2.6} className="fmm-draw" />
      {[0, 50, 100, 150, 200, 250, 300].map((p) => (
        <g key={`a${p}`}>
          <Wire d={`M322 ${y(p)} L330 ${y(p)}`} stroke={BLUE} width={1.8} />
          <M x={318} y={y(p) + 4} anchor="end" size={11.5} fill={BLUE}>{p}</M>
        </g>
      ))}
      <g className="fmm-slide-in fmm-delay-1">
        <Wire d={`M120 ${atm} L860 ${atm}`} stroke={N} width={4} />
      </g>
      <L x={120} y={atm - 13} anchor="start" size={12} fill={N}>101.3 kPa abs = 0 gauge</L>
      <L x={860} y={atm - 13} anchor="end" size={12} fill={N}>atmospheric — varies with altitude &amp; weather</L>
      <g className="fmm-emerge fmm-delay-2">
        <Wire d="M470 470 L470 66" stroke={GREEN} width={2.6} />
        {[-100, -50, 0, 50, 100, 150, 200].map((g) => (
          <g key={`g${g}`}>
            <Wire d={`M470 ${y(g + 101.3)} L478 ${y(g + 101.3)}`} stroke={GREEN} width={1.8} />
            <M x={482} y={y(g + 101.3) + 4} anchor="start" size={11.5} fill={GREEN}>{g > 0 ? `+${g}` : g}</M>
          </g>
        ))}
        <circle cx="470" cy={atm} r="6" fill={GREEN} />
      </g>
      {ties.map((t, i) => {
        const ty = y(t.abs)
        const lead = Math.abs(t.ly - 4 - ty) > 8
        return (
          <g key={t.right} className={`fmm-cell-in fmm-delay-${i + 3}`}>
            <Wire d={`M330 ${ty} L470 ${ty}`} stroke={t.tone} width={3} />
            <Dot cx={330} cy={ty} r={4.5} fill={t.tone} />
            <Dot cx={470} cy={ty} r={4.5} fill={t.tone} />
            {lead ? <Wire d={`M256 ${t.ly - 4} L326 ${ty} M474 ${ty} L544 ${t.ly - 4}`} stroke={t.tone} width={1.2} dash="3 3" /> : null}
            <M x={250} y={t.ly} anchor="end" size={12.5} fill={t.tone}>{t.left}</M>
            <M x={550} y={t.ly} anchor="start" size={12.5} fill={t.tone}>{t.right}</M>
          </g>
        )
      })}
      <L x={250} y={410} anchor="end" size={12} fill={GREEN} className="fmm-emerge fmm-delay-5">↑ still positive</L>
    </Scene>
  )
}

/** Unit 13 — walk the U-tube from the open surface to A: + going down, − going up. */
export function ManometerWalkScene() {
  const bend = 'M200 340 L200 400 Q200 420 220 420 L320 420 Q340 420 340 400 L340 220'
  const rows = [
    { step: '1', what: 'open surface', tally: 'p = 0 (gauge)', tone: MUTED },
    { step: '2', what: 'down Hg by h₂ ↓', tally: '+ ρm g h₂', tone: GREEN },
    { step: '3', what: 'round bend, level', tally: '+ 0', tone: MUTED },
    { step: '4', what: 'up water by h₁ ↑', tally: '− ρ g h₁', tone: RED },
  ]
  const badge = (x, y, t) => (
    <g>
      <circle cx={x} cy={y} r="11" fill={ROSE} />
      <L x={x} y={y + 5} size={12} fill={WHITE}>{t}</L>
    </g>
  )
  return (
    <Scene caption="Add ρgh going down, subtract going up; equal levels in one liquid are equal pressures">
      <rect x="60" y="120" width="240" height="50" fill={SKY} stroke={N} strokeWidth="2.4" />
      <L x={100} y={108} size={12} fill={MUTED} weight={700}>pipe (water)</L>
      <Wire d="M200 170 L200 400 Q200 420 220 420 L320 420 Q340 420 340 400 L340 150" stroke={N} width={24} />
      <Wire d="M200 170 L200 400 Q200 420 220 420 L320 420 Q340 420 340 400 L340 150" stroke={CREAM} width={18} />
      <Wire d="M200 168 L200 340" stroke={SKY} width={18} />
      <path d={bend} fill="none" stroke={MUTED} strokeOpacity="0.6" strokeWidth="18" />
      <L x={340} y={124} size={12} fill={MUTED} weight={700}>open to air</L>
      <Dot cx={200} cy={145} r={5} />
      <L x={214} y={150} anchor="start" size={13}>A</L>
      <g className="fmm-emerge fmm-delay-1">
        <Wire d="M176 340 L364 340" stroke={N} width={3.5} />
      </g>
      <L x={270} y={390} size={11} fill={N}>equal-p datum</L>
      <Wire d="M400 220 L400 340 M394 220 L406 220 M394 340 L406 340" stroke={MUTED} width={1.4} />
      <M x={410} y={284} anchor="start" size={13} fill={MUTED}>h₂</M>
      <Wire d="M120 145 L120 340 M114 145 L126 145 M114 340 L126 340" stroke={MUTED} width={1.4} />
      <M x={110} y={250} anchor="end" size={13} fill={MUTED}>h₁</M>
      <g className="fmm-cell-in fmm-delay-2"><Wire d="M340 220 L340 340" stroke={ROSE} width={2.6} dash="3 5" /></g>
      <g className="fmm-cell-in fmm-delay-3"><Wire d="M340 340 L340 400 Q340 420 320 420 L220 420 Q200 420 200 400 L200 340" stroke={ROSE} width={2.6} dash="3 5" /></g>
      <g className="fmm-cell-in fmm-delay-4"><Wire d="M200 340 L200 145" stroke={ROSE} width={2.6} dash="3 5" /></g>
      {badge(370, 210, '1')}
      {badge(380, 340, '2')}
      {badge(160, 340, '3')}
      {badge(200, 100, '4')}

      <L x={675} y={56} size={14}>RUNNING TALLY (gauge)</L>
      {rows.map((r, i) => {
        const ry = 70 + i * 52
        return (
          <g key={r.step} className={`fmm-slide-in fmm-delay-${i + 1}`}>
            <rect x="480" y={ry} width="390" height="44" rx="9" fill={WHITE} stroke={r.tone} strokeWidth="2" />
            {badge(502, ry + 22, r.step)}
            <L x={522} y={ry + 27} anchor="start" size={13}>{r.what}</L>
            <M x={860} y={ry + 27} anchor="end" size={14} fill={r.tone} weight={800}>{r.tally}</M>
          </g>
        )
      })}
      <g className="fmm-emerge fmm-delay-5">
        <rect x="480" y="280" width="390" height="44" rx="9" fill={SKY} stroke={GREEN} strokeWidth="2.4" />
        <M x={675} y={308} size={15} fill={GREEN} weight={800}>p_A = ρm g h₂ − ρ g h₁</M>
      </g>

      <rect x="480" y="344" width="390" height="134" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <rect x="500" y="440" width="120" height="26" fill={SKY} stroke={N} strokeWidth="2" />
      <rect x="551" y="385" width="10" height="55" fill={SKY} />
      <Wire d="M550 440 L550 364 M562 440 L562 364" stroke={N} width={2} />
      <Wire d="M576 385 L576 453 M570 385 L582 385 M570 453 L582 453" stroke={MUTED} width={1.4} />
      <M x={588} y={424} anchor="start" size={12} fill={MUTED}>h</M>
      <L x={750} y={380} size={13} fill={TEAL}>piezometer, for contrast</L>
      <M x={750} y={406} size={13}>p = ρ g h</M>
      <L x={750} y={432} size={12} fill={MUTED} weight={700}>one column, read directly</L>
      <L x={750} y={454} size={12} fill={MUTED} weight={700}>liquids only, small p</L>
    </Scene>
  )
}

/** Unit 14 — one Δp read three ways: upright U, inverted U, inclined tube. */
export function DifferentialManometerThreeFormsScene() {
  const tube = (d, fillStroke, key) => (
    <g key={key}>
      <Wire d={d} stroke={N} width={16} />
      <Wire d={d} stroke={fillStroke} width={11} />
    </g>
  )
  return (
    <Scene caption="Same Δp: the inverted U and the inclined tube stretch the reading you have to see">
      {/* Pipe and tappings */}
      <rect x="40" y="240" width="820" height="32" fill={SKY} stroke={N} strokeWidth="2.4" />
      <Wire d="M50 256 L850 256" stroke={BLUE} width={2} className="fmm-current-slow" opacity={0.6} />
      <M x={92} y={232} anchor="end" size={13} fill={BLUE}>p₁</M>
      <M x={812} y={232} anchor="start" size={13} fill={TEAL}>p₂</M>
      <Wire d="M100 240 L100 222 L400 222" stroke={BLUE} width={4} />
      <Wire d="M800 240 L800 208 L500 208" stroke={TEAL} width={4} />
      <Wire d="M100 272 L100 294 L790 294 L790 380" stroke={BLUE} width={4} />
      <Wire d="M800 272 L800 308 L260 308" stroke={TEAL} width={4} />

      {/* Inverted U: air on top, long reading */}
      <g className="fmm-cell-in fmm-delay-2">
        {tube('M400 222 L400 100 Q400 80 420 80 L480 80 Q500 80 500 100 L500 208', CREAM, 'inv')}
        <Wire d="M400 222 L400 110" stroke={SKY} width={11} />
        <Wire d="M500 208 L500 186" stroke={SKY} width={11} />
        <Wire d="M393 110 L407 110 M493 186 L507 186" stroke={BLUE} width={2.4} />
      </g>
      <L x={450} y={40} size={13} fill={GREEN}>inverted U (air)</L>
      <L x={450} y={64} size={11.5} fill={MUTED} weight={700}>air trapped</L>
      <Wire d="M530 110 L530 186 M524 110 L536 110 M524 186 L536 186" stroke={GREEN} width={1.6} />
      <L x={540} y={152} anchor="start" size={12} fill={GREEN}>R₂ long</L>

      {/* Upright U with mercury: short reading */}
      <g className="fmm-cell-in fmm-delay-1">
        {tube('M180 294 L180 410 Q180 430 200 430 L240 430 Q260 430 260 410 L260 308', SKY, 'up')}
        <Wire d="M180 396 L180 410 Q180 430 200 430 L240 430 Q260 430 260 410 L260 384" stroke={MUTED} width={11} />
      </g>
      <Wire d="M290 384 L290 396 M284 384 L296 384 M284 396 L296 396" stroke={ROSE} width={1.6} />
      <L x={300} y={395} anchor="start" size={12} fill={ROSE}>R₁ short</L>
      <L x={220} y={470} size={13} fill={ROSE}>upright U (mercury)</L>

      {/* Inclined tube from a well, 30° */}
      <rect x="760" y="400" width="60" height="32" fill={MUTED} fillOpacity="0.55" />
      <Wire d="M760 380 L760 432 L820 432 L820 380" stroke={N} width={2.4} />
      <g className="fmm-cell-in fmm-delay-3">
        <Wire d="M760 424 L560 308.5" stroke={N} width={12} />
        <Wire d="M760 424 L560 308.5" stroke={SKY} width={8} />
        <Wire d="M760 424 L683.8 380" stroke={MUTED} width={8} />
      </g>
      <M x={660} y={404} size={12} fill={AMBER}>L = 2Δh</M>
      <L x={700} y={470} size={13} fill={AMBER}>inclined tube, 30°</L>

      {/* Magnification triangle */}
      <M x={730} y={56} size={12.5} fill={AMBER}>L = Δh / sin 30° = 2Δh</M>
      <g className="fmm-emerge fmm-delay-5">
        <path d="M640 180 L820 180 L820 76.1 Z" fill={WHITE} stroke={AMBER} strokeWidth="2.2" />
        <Wire d="M680 180 A40 40 0 0 0 674.6 160" stroke={AMBER} width={1.6} />
      </g>
      <L x={688} y={174} anchor="start" size={12} fill={AMBER}>30°</L>
      <L x={690} y={110} size={12} fill={AMBER}>L along tube</L>
      <M x={832} y={132} anchor="start" size={12} fill={AMBER}>Δh</M>

      {/* Sensitivity bars */}
      <L x={50} y={56} anchor="start" size={13} fill={N}>same Δp — reading (mm)</L>
      <Bars x={170} y={76} w={160} items={[['upright U', 10, ROSE], ['inclined', 20, AMBER], ['inverted U', 126, GREEN]]} />
    </Scene>
  )
}

/** Unit 15 — Bourdon C-tube rounds and uncurls, the linkage turns the pointer; diaphragm and bellows. */
export function BourdonTubeScene() {
  const C = [250, 255]
  const pol = (r, deg) => [C[0] + r * Math.cos((deg * Math.PI) / 180), C[1] + r * Math.sin((deg * Math.PI) / 180)]
  const ticks = Array.from({ length: 11 }, (_, k) => 135 + k * 27)
  const teeth = [222, 226, 230, 234, 238, 242, 246, 250].map((a) => {
    const r = (d) => [300 + d * Math.cos((a * Math.PI) / 180), 330 + d * Math.sin((a * Math.PI) / 180)]
    const [a0, a1] = [r(82), r(87)]
    return `M${a0[0].toFixed(1)} ${a0[1].toFixed(1)} L${a1[0].toFixed(1)} ${a1[1].toFixed(1)}`
  })
  const zig = (x0, dir) => {
    const pts = []
    for (let i = 0; i <= 6; i += 1) pts.push(`${i === 0 ? 'M' : 'L'}${x0 + (i % 2 ? dir * 10 : 0)} ${340 - i * 12}`)
    return pts.join(' ')
  }
  const leader = (x1, y1, x2, y2) => <Wire d={`M${x1} ${y1} L${x2} ${y2}`} stroke={MUTED} width={1.1} dash="3 3" />
  return (
    <Scene caption="Pressure rounds the flattened tube, the C uncurls, and the linkage turns the pointer">
      <L x={250} y={62} size={14}>BOURDON GAUGE — case cut away</L>
      <circle cx={C[0]} cy={C[1]} r="150" fill={WHITE} stroke={N} strokeWidth="4" />
      {ticks.map((a, k) => {
        const [p0, p1, pl] = [pol(136, a), pol(146, a), pol(122, a)]
        return (
          <g key={`t${a}`}>
            <Wire d={`M${p0[0].toFixed(1)} ${p0[1].toFixed(1)} L${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`} stroke={N} width={2} />
            <M x={pl[0].toFixed(1)} y={(pl[1] + 4).toFixed(1)} size={10.5} fill={MUTED}>{k}</M>
          </g>
        )
      })}
      <Wire d="M206 331.2 Q206 380 235 385" stroke={N} width={11} />
      <Wire d="M206 331.2 A88 88 0 1 1 326.2 299" stroke={N} width={11} />
      <Wire d="M206 331.2 A88 88 0 1 1 326.2 299" stroke={SKY} width={6} className="fmm-charge" />
      <rect x="225" y="380" width="50" height="38" rx="4" fill={N} />
      <Arr x1={250} y1={470} x2={250} y2={422} tone={AMBER} width={3} />
      <M x={262} y={462} anchor="start" size={12} fill={AMBER}>p</M>
      <g className="fmm-probe" style={{ '--fmm-probe': '6px' }}>
        <Dot cx={326.2} cy={299} r={6} fill={ROSE} />
      </g>
      <Wire d="M326.2 299 L315.7 353.2" stroke={N} width={2.6} />
      <path d="M300 330 L239.1 275.1 A82 82 0 0 1 273.3 252.5 Z" fill={AMBER} fillOpacity="0.25" stroke={AMBER} strokeWidth="2" />
      <Wire d={teeth.join(' ')} stroke={AMBER} width={2} />
      <Wire d="M300 330 L315.7 353.2" stroke={AMBER} width={3} />
      <Dot cx={300} cy={330} r={4} fill={AMBER} />
      <circle cx={C[0]} cy={C[1]} r="10" fill={WHITE} stroke={PURP} strokeWidth="2.4" />
      <g className="fmm-needle" style={{ transformBox: 'view-box', transformOrigin: '250px 255px' }}>
        <Wire d="M250 262 L250 140" stroke={RED} width={3} />
      </g>
      <Dot cx={250} cy={255} r={3.5} fill={RED} />
      {leader(80, 196, 167.3, 224.9)}
      <L x={30} y={192} anchor="start" size={12}>C-tube</L>
      {leader(80, 414, 225, 400)}
      <L x={30} y={410} anchor="start" size={12}>socket</L>
      {leader(406, 146, 254, 172)}
      <L x={410} y={150} anchor="start" size={12} fill={RED}>pointer</L>
      {leader(406, 250, 262, 255)}
      <L x={410} y={254} anchor="start" size={12} fill={PURP}>pinion</L>
      {leader(406, 306, 334, 302)}
      <L x={410} y={310} anchor="start" size={12} fill={ROSE}>tip</L>
      {leader(406, 330, 322, 326)}
      <L x={410} y={334} anchor="start" size={12}>link</L>
      {leader(406, 396, 310, 344)}
      <L x={410} y={400} anchor="start" size={12} fill={AMBER}>quadrant</L>

      {/* Cross-section callout */}
      <rect x="480" y="40" width="400" height="150" rx="10" fill={WHITE} stroke={BLUE} strokeWidth="1.8" />
      <L x={680} y={62} size={13} fill={BLUE}>tube cross-section under pressure</L>
      <ellipse cx="550" cy="115" rx="44" ry="12" fill={SKY} stroke={N} strokeWidth="2.4" />
      <L x={550} y={160} size={12} fill={MUTED} weight={700}>at rest: flat</L>
      <Arr x1={604} y1={115} x2={648} y2={115} tone={AMBER} width={2.6} />
      <ellipse cx="715" cy="115" rx="36" ry="22" fill={SKY} stroke={N} strokeWidth="2.4" className="fmm-emerge fmm-delay-1" />
      <g className="fmm-flux">
        <Arr x1={715} y1={115} x2={737} y2={115} tone={AMBER} width={2} />
        <Arr x1={715} y1={115} x2={693} y2={115} tone={AMBER} width={2} />
        <Arr x1={715} y1={115} x2={715} y2={98} tone={AMBER} width={2} />
        <Arr x1={715} y1={115} x2={715} y2={132} tone={AMBER} width={2} />
      </g>
      <L x={715} y={160} size={12} fill={MUTED} weight={700}>under p: rounds</L>
      <Wire d="M810 150 A40 40 0 0 1 856 96" stroke={ROSE} width={2.6} marker="url(#fmArrRo)" className="fmm-emerge fmm-delay-2" />
      <L x={835} y={176} size={12} fill={ROSE}>C uncurls</L>

      {/* Diaphragm */}
      <rect x="480" y="200" width="195" height="170" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={577} y={222} size={13}>diaphragm</L>
      <Wire d="M505 300 L505 340 L650 340 L650 300" stroke={N} width={2.2} />
      <Wire d="M505 300 L540 300 M615 300 L650 300" stroke={N} width={4} />
      <Wire d="M540 300 L615 300" stroke={MUTED} width={1.6} dash="4 4" />
      <Wire d="M540 300 Q577 262 615 300" stroke={BLUE} width={3} className="fmm-emerge fmm-delay-3" />
      <Arr x1={555} y1={336} x2={555} y2={310} tone={AMBER} width={2} />
      <Arr x1={600} y1={336} x2={600} y2={310} tone={AMBER} width={2} />
      <M x={628} y={330} anchor="start" size={12} fill={AMBER}>p</M>
      <g className="fmm-decay-dot fmm-delay-3" style={{ '--fmm-dx': '0px', '--fmm-dy': '-8px' }}>
        <Arr x1={577} y1={272} x2={577} y2={244} tone={GREEN} width={3} />
      </g>

      {/* Bellows */}
      <rect x="685" y="200" width="195" height="170" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={782} y={222} size={13}>bellows</L>
      <rect x="735" y="340" width="94" height="8" fill={N} />
      <Wire d={`${zig(750, -1)} ${zig(814, 1)}`} stroke={BLUE} width={2.2} />
      <g className="fmm-decay-dot fmm-delay-4" style={{ '--fmm-dx': '0px', '--fmm-dy': '-8px' }}>
        <rect x="740" y="260" width="84" height="8" fill={N} />
        <Arr x1={782} y1={256} x2={782} y2={240} tone={GREEN} width={3} />
      </g>
      <Arr x1={782} y1={366} x2={782} y2={350} tone={AMBER} width={2.4} />
      <M x={796} y={364} anchor="start" size={12} fill={AMBER}>p</M>

      {/* Accuracy vs range */}
      <L x={680} y={396} size={13} fill={N}>accuracy vs range</L>
      <Block x={480} y={410} w={195} h={52} label="manometers" sub="high accuracy · low range" stroke={GREEN} className="fmm-cell-in fmm-delay-5" />
      <Block x={685} y={410} w={195} h={52} label="mechanical gauges" sub="wide range · lower accuracy" stroke={AMBER} className="fmm-cell-in fmm-delay-6" />
    </Scene>
  )
}

/** Unit 16 — pressure prism on an inclined gate: resultant sits below G by I_G sin²θ / (A h̄). */
export function CentreOfPressureGateScene() {
  const d = [0.5, 0.866]
  const nn = [0.866, -0.5]
  const at = (s) => [180 + d[0] * s, 150 + d[1] * s]
  const arrows = [0, 30, 60, 90, 120, 150, 180, 210, 240].map((s) => {
    const [px, py] = at(s)
    const len = 0.35 * (py - 90)
    return { s, px, py, tx: px - nn[0] * len, ty: py - nn[1] * len }
  })
  const [gx, gy] = at(120)
  const [cx, cy] = at(145.4)
  const off = (x, y, k) => [x + nn[0] * k, y + nn[1] * k]
  const [d1, d2] = [off(gx, gy, 34), off(cx, cy, 34)]
  const hyper = []
  for (let x = 552; x <= 840; x += 6) hyper.push([x, 440 - 3000 / (x - 530)])
  return (
    <Scene caption="The pressure prism grows with depth, so its resultant acts below the centroid">
      <rect x="30" y="40" width="440" height="440" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={250} y={66} size={14}>INCLINED GATE, θ = 60°</L>
      <polygon points="40,90 145.4,90 325,400 40,400" fill={SKY} />
      <Wire d="M40 90 L145.4 90" stroke={BLUE} width={2.4} />
      <Wire d="M145.4 90 L180 150 M300 357.8 L325 400" stroke={N} width={2.4} />
      <Wire d="M180 150 L300 357.8" stroke={AMBER} width={7} />
      <Wire d="M180 150 L230 150" stroke={MUTED} width={1.4} dash="4 3" />
      <Wire d="M210 150 A30 30 0 0 1 195 176" stroke={MUTED} width={1.6} />
      <M x={214} y={176} anchor="start" size={11.5} fill={MUTED}>60°</M>
      {arrows.map((a, i) => (
        <g key={`pa${a.s}`} className={`fmm-cell-in fmm-delay-${Math.min(i, 7)}`}>
          <Arr x1={a.tx} y1={a.ty} x2={a.px} y2={a.py} tone={BLUE} width={1.8} opacity={0.75} />
        </g>
      ))}
      <Dot cx={gx} cy={gy} r={5} fill={N} />
      <g className="fmm-emerge fmm-delay-6">
        <Arr x1={cx - nn[0] * 110} y1={cy - nn[1] * 110} x2={cx} y2={cy} tone={RED} width={5} />
        <Dot cx={cx} cy={cy} r={5} fill={RED} />
      </g>
      <M x={120} y={372} size={12.5} fill={RED}>F = ρ g A h̄</M>
      <Wire d={`M${gx} ${gy} L${off(gx, gy, 42).join(' ')} M${cx} ${cy} L${off(cx, cy, 42).join(' ')}`} stroke={MUTED} width={1} dash="2 3" />
      <Wire d={`M${d1.join(' ')} L${d2.join(' ')}`} stroke={PURP} width={2} />
      <L x={d1[0] - 8} y={d1[1] - 14} anchor="end" size={12.5}>G</L>
      <L x={d2[0] + 8} y={d2[1] + 16} anchor="start" size={12.5} fill={RED}>CP</L>
      <M x={(d1[0] + d2[0]) / 2 + 14} y={(d1[1] + d2[1]) / 2 - 6} anchor="start" size={13} fill={PURP}>e</M>
      <M x={250} y={440} size={12.5} fill={PURP}>e = I_G sin²θ / (A h̄)</M>
      <L x={250} y={462} size={12} fill={MUTED} weight={700}>the second-moment term</L>
      <L x={405} y={158} size={12} fill={MUTED} weight={700}>true view</L>
      <rect x="370" y="170" width="70" height="160" fill={WHITE} stroke={AMBER} strokeWidth="2.4" />
      <Dot cx={405} cy={250} r={4.5} fill={N} />
      <Dot cx={405} cy={266.9} r={4.5} fill={RED} />
      <L x={448} y={254} anchor="start" size={12}>G</L>
      <L x={448} y={275} anchor="start" size={12} fill={RED}>CP</L>

      {/* Horizontal gate: uniform prism, e = 0 */}
      <rect x="490" y="40" width="380" height="210" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={680} y={62} size={14}>HORIZONTAL GATE</L>
      <rect x="520" y="80" width="320" height="110" fill={SKY} />
      <Wire d="M520 80 L840 80" stroke={BLUE} width={2.4} />
      <Wire d="M560 190 L800 190" stroke={AMBER} width={7} />
      <g className="fmm-emerge fmm-delay-2">
        {[568, 596, 624, 652, 680, 708, 736, 764, 792].map((x) => (
          <Arr key={`h${x}`} x1={x} y1={130} x2={x} y2={184} tone={BLUE} width={1.8} opacity={0.75} />
        ))}
      </g>
      <g className="fmm-emerge fmm-delay-4">
        <Arr x1={680} y1={196} x2={680} y2={238} tone={RED} width={5} />
      </g>
      <L x={694} y={226} anchor="start" size={12.5} fill={RED}>G = CP, e = 0</L>

      {/* e shrinks with depth */}
      <rect x="490" y="265" width="380" height="215" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <Axes x={530} y={440} w={320} h={150} xLabel="depth of centroid h̄" yLabel="e" />
      <Curve pts={hyper} stroke={PURP} className="fmm-draw fmm-delay-6" />
      <L x={700} y={330} size={12} fill={PURP}>e → 0 as the gate goes deeper</L>
    </Scene>
  )
}


/* ── Module 2 ────────────────────────────────────────────────────────── */

/** Unit 1 — steady is ∂/∂t at a fixed point, uniform is ∂/∂s at a fixed instant: all four cells exist. */
export function SteadyUniformGridScene() {
  const cells = [
    { col: 0, row: 0, taper: false, valve: false },
    { col: 1, row: 0, taper: true, valve: false },
    { col: 0, row: 1, taper: false, valve: true },
    { col: 1, row: 1, taper: true, valve: true },
  ]
  const ship = (x) => (
    <g>
      <path d={`M${x} 400 L${x + 96} 400 L${x + 80} 424 L${x + 14} 424 Z`} fill={N} />
      <rect x={x + 30} y="384" width="34" height="16" fill={MUTED} />
    </g>
  )
  return (
    <Scene caption="Steady tests time at a fixed point; uniform tests space at a fixed instant">
      <L x={195} y={60} size={13} fill={BLUE}>UNIFORM</L>
      <L x={380} y={60} size={13} fill={AMBER}>NON-UNIFORM</L>
      <L x={62} y={137} size={12} fill={GREEN}>STEADY</L>
      <L x={62} y={267} size={12} fill={RED}>UNSTEADY</L>
      {cells.map((c, i) => {
        const X = 105 + c.col * 185
        const Y = 70 + c.row * 130
        const px = X + 16
        const pc = Y + 56
        const h1 = c.taper ? 54 : 40
        const h2 = c.taper ? 24 : 40
        const lens = c.taper ? [22, 46] : [32, 32]
        const grow = c.valve ? 'fmm-bar' : ''
        const vx = px + 12
        return (
          <g key={`cell${i}`}>
            <rect x={X} y={Y} width="180" height="125" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
            <g className={`fmm-cell-in fmm-delay-${i * 2}`}>
              <Pipe x={px} y={pc} w={148} h1={h1} h2={h2} />
              <Wire d={`M${px + 22} ${pc} L${px + 146} ${pc}`} stroke={TEAL} width={1.8} className="fmm-current" />
              {[px + 22, px + 92].map((ax, k) => (
                <g key={`v${ax}`} className={grow} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
                  <Arr x1={ax} y1={Y + 18} x2={ax + lens[k]} y2={Y + 18} tone={BLUE} width={2} />
                </g>
              ))}
              {c.valve ? (
                <g className="fmm-switch" style={{ transformBox: 'view-box', transformOrigin: `${vx}px ${pc}px` }}>
                  <Wire d={`M${vx - 9} ${pc + 15} L${vx + 9} ${pc - 15}`} stroke={RED} width={3.4} />
                </g>
              ) : null}
              <M x={X + 48} y={Y + 110} size={11.5} fill={c.valve ? RED : GREEN}>{c.valve ? '∂V/∂t≠0' : '∂V/∂t=0'}</M>
              <M x={X + 132} y={Y + 110} size={11.5} fill={c.taper ? RED : GREEN}>{c.taper ? '∂V/∂s≠0' : '∂V/∂s=0'}</M>
            </g>
          </g>
        )
      })}

      {/* The two tests: a probe held still, and a probe slid along s */}
      <rect x="490" y="40" width="380" height="290" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <Wire d="M500 188 L860 188" stroke={MUTED} width={1.2} dash="4 4" />
      <L x={506} y={66} anchor="start" size={13} fill={BLUE}>FIXED PROBE · steady? ∂/∂t</L>
      <Pipe x={506} y={125} w={130} h1={36} />
      <Wire d="M510 125 L632 125" stroke={TEAL} width={1.8} className="fmm-current" />
      <Wire d="M570 88 L570 121" stroke={RED} width={2.2} />
      <Dot cx={570} cy={125} r={4.5} fill={RED} />
      <L x={571} y={166} size={11} fill={MUTED} weight={700}>x held fixed</L>
      <Axes x={670} y={170} w={180} h={78} yLabel="V" />
      <L x={858} y={175} anchor="start" size={12} fill={MUTED}>t</L>
      <Curve pts={[[672, 142], [845, 142]]} stroke={GREEN} className="fmm-draw fmm-delay-5" />
      <Curve pts={[[672, 142], [845, 90]]} stroke={RED} className="fmm-draw fmm-delay-6" />
      <L x={845} y={158} anchor="end" size={11.5} fill={GREEN}>steady</L>
      <L x={690} y={106} anchor="start" size={11.5} fill={RED}>unsteady</L>

      <L x={506} y={206} anchor="start" size={13} fill={AMBER}>SLIDING PROBE · uniform? ∂/∂s</L>
      <Pipe x={506} y={268} w={130} h1={46} h2={22} />
      <Wire d="M510 268 L632 268" stroke={TEAL} width={1.8} className="fmm-current" />
      <g className="fmm-probe fmm-delay-5" style={{ '--fmm-probe': '96px' }}>
        <Wire d="M520 228 L520 264" stroke={AMBER} width={2.2} />
        <Dot cx={520} cy={268} r={4.5} fill={AMBER} />
      </g>
      <L x={571} y={312} size={11} fill={MUTED} weight={700}>t held fixed</L>
      <Axes x={670} y={316} w={180} h={80} yLabel="V" />
      <L x={858} y={321} anchor="start" size={12} fill={MUTED}>s</L>
      <Curve pts={[[672, 288], [845, 288]]} stroke={GREEN} className="fmm-draw fmm-delay-6" />
      <Curve pts={[[672, 288], [845, 240]]} stroke={RED} className="fmm-draw fmm-delay-7" />
      <L x={845} y={304} anchor="end" size={11.5} fill={GREEN}>uniform</L>
      <L x={690} y={252} anchor="start" size={11.5} fill={RED}>non-uniform</L>

      {/* Same flow, two observers */}
      <rect x="30" y="342" width="410" height="140" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={366} anchor="start" size={13}>FROM THE SHORE</L>
      <L x={428} y={366} anchor="end" size={12.5} fill={RED}>unsteady at a fixed point</L>
      <rect x="40" y="412" width="390" height="60" fill={SKY} />
      <g className="fmm-sweep-x" style={{ '--fmm-sweep': '230px' }}>{ship(60)}</g>
      <Wire d="M360 380 L360 472" stroke={RED} width={1.6} dash="5 4" />
      <L x={366} y={462} anchor="start" size={11} fill={RED} weight={700}>fixed point</L>
      <L x={50} y={462} anchor="start" size={11} fill={MUTED} weight={700}>water at rest, ship moves</L>

      <g className="fmm-emerge fmm-delay-7">
        <rect x="460" y="342" width="410" height="140" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
        <L x={476} y={366} anchor="start" size={13}>FROM THE DECK</L>
        <L x={858} y={366} anchor="end" size={12.5} fill={GREEN}>steady: same pattern every instant</L>
        <rect x="470" y="412" width="390" height="60" fill={SKY} />
        {[436, 450, 464].map((y) => (
          <Wire key={`st${y}`} d={`M852 ${y} L478 ${y}`} stroke={TEAL} width={1.8} className="fmm-current" />
        ))}
        {ship(590)}
        <L x={852} y={398} anchor="end" size={11} fill={MUTED} weight={700}>water streams past at −V</L>
      </g>
    </Scene>
  )
}

/** Unit 2 — Reynolds' dye thread: straight, wavering, then dispersed as inertia overtakes viscosity. */
export function ReynoldsDyeFilamentScene() {
  const rows = [
    { name: 'LAMINAR', re: 'Re < 2300', note: 'dye stays a single thread', why: 'viscous forces damp any disturbance', tone: GREEN, q: 20, wi: 60, wv: 170 },
    { name: 'TRANSITIONAL', re: '2300 < Re < 4000', note: 'thread wavers, then breaks', why: 'neither force dominates', tone: AMBER, q: 34, wi: 120, wv: 120 },
    { name: 'TURBULENT', re: 'Re > 4000', note: 'dye mixes across the bore', why: 'inertia amplifies disturbances', tone: RED, q: 48, wi: 200, wv: 36 },
  ]
  return (
    <Scene caption="Re = ρVD/μ: inertia over viscous force decides whether the dye thread survives">
      {rows.map((r, i) => {
        const y0 = 30 + i * 148
        const yc = y0 + 46
        const wave = []
        for (let x = 250; x <= 430; x += 4) wave.push([x, yc + ((x - 250) / 180) * 12 * Math.sin((x - 250) / 12)])
        const bits = [[440, -10, 455, 4], [470, 12, 488, -6], [505, -14, 520, 2], [535, 10, 552, -8]]
        return (
          <g key={r.name}>
            <rect x="30" y={y0} width="840" height="140" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
            <Pipe x={90} y={yc} w={470} h1={40} />
            <Arr x1={40} y1={yc} x2={40 + r.q} y2={yc} tone={BLUE} width={2.5} />
            <L x={50} y={yc - 16} size={12} fill={BLUE}>Q</L>
            <Wire d={`M100 ${y0 + 10} L100 ${yc}`} stroke={N} width={2} />
            {i === 0 ? <Curve pts={[[104, yc], [556, yc]]} stroke={ROSE} width={2.6} className="fmm-draw" /> : null}
            {i === 1 ? (
              <g>
                <Curve pts={[[104, yc], [250, yc], ...wave]} stroke={ROSE} width={2.6} className="fmm-draw fmm-delay-2" />
                {bits.map(([xa, ya, xb, yb], k) => (
                  <g key={`b${xa}`} className={`fmm-cell-in fmm-delay-${4 + k}`}>
                    <Curve pts={[[xa, yc + ya], [xb, yc + yb]]} stroke={ROSE} width={2.4} />
                  </g>
                ))}
              </g>
            ) : null}
            {i === 2 ? (
              <g>
                <Curve pts={[[104, yc], [140, yc]]} stroke={ROSE} width={2.6} />
                <g className="fmm-slide-in fmm-delay-5">
                  <polygon points={`140,${yc - 2} 210,${yc - 19} 558,${yc - 19} 558,${yc + 19} 210,${yc + 19} 140,${yc + 2}`} fill={ROSE} fillOpacity="0.28" />
                </g>
                {[[260, -8], [340, 9], [420, -7], [500, 8]].map(([ex, ey]) => (
                  <g key={`e${ex}`} className="fmm-spin" style={{ transformBox: 'view-box', transformOrigin: `${ex}px ${yc + ey}px` }}>
                    <Wire d={`M${ex + 7} ${yc + ey} A7 7 0 1 1 ${ex} ${yc + ey - 7}`} stroke={ROSE} width={1.6} />
                  </g>
                ))}
              </g>
            ) : null}

            {/* Force ratio: inertia grows leftward, viscosity rightward, from a common divider */}
            <g transform="translate(660,0) scale(-1,1)">
              <g className={`fmm-bar fmm-delay-${2 * i}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
                <rect x="330" y={y0 + 96} width={r.wi} height="18" rx="4" fill={AMBER} />
              </g>
            </g>
            <g className={`fmm-bar fmm-delay-${2 * i}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
              <rect x="330" y={y0 + 96} width={r.wv} height="18" rx="4" fill={PURP} />
            </g>
            <Wire d={`M330 ${y0 + 90} L330 ${y0 + 120}`} stroke={N} width={2.2} />
            <L x={330 - r.wi - 8} y={y0 + 110} anchor="end" size={12} fill={AMBER}>inertia</L>
            <L x={330 + r.wv + 8} y={y0 + 110} anchor="start" size={12} fill={PURP}>viscous</L>

            <L x={596} y={y0 + 34} anchor="start" size={16} fill={r.tone}>{r.name}</L>
            <M x={596} y={y0 + 60} anchor="start" size={13.5} fill={r.tone}>{r.re}</M>
            <L x={596} y={y0 + 84} anchor="start" size={12.5} fill={N} weight={700}>{r.note}</L>
            <L x={596} y={y0 + 111} anchor="start" size={12} fill={MUTED} weight={700}>{r.why}</L>
          </g>
        )
      })}
    </Scene>
  )
}

/** Unit 3 — one duct analysed at four levels: each rung down discards terms, cost and accuracy fall together. */
export function DimensionReductionLadderScene() {
  const terms = ['∂ρ/∂t', '∂(ρu)/∂x', '∂(ρv)/∂y', '∂(ρw)/∂z']
  const tx = [322, 414, 514, 614]
  const rungs = [
    { name: '3-D field', tone: BLUE, struck: [], fresh: [], note: 'u, v, w = f(x, y, z, t)  + 3 momentum equations' },
    { name: '2-D plane', tone: TEAL, struck: [3], fresh: [3], note: 'u, v = f(x, y, t): nothing varies in z' },
    { name: '1-D mean velocity', tone: AMBER, struck: [1, 2, 3], fresh: [1, 2], note: '→ ∂(ρA)/∂t + ∂(ρAV̄)/∂s = 0' },
    { name: '1-D incompressible', tone: GREEN, struck: [0, 1, 2, 3], fresh: [0], note: '→ ∂(AV̄)/∂s = 0  ⇒  AV̄ = Q' },
  ]
  const vec3 = [[58, 12, 22, -3], [60, 36, 20, 5], [88, 24, 24, -6], [128, 10, 22, 2], [130, 22, 18, -12], [166, 20, 24, -4], [172, 38, 24, -10], [206, 14, 20, -12]]
  const vec2 = [[58, 12], [58, 36], [110, 12], [150, 24], [150, 12], [196, 8], [196, 30]]
  return (
    <Scene caption="Each rung down trades accuracy for a cheaper equation set">
      {rungs.map((g, i) => {
        const y0 = 30 + i * 110
        const t = y0 + 30
        const b = y0 + 78
        const mid = (t + b) / 2
        return (
          <g key={g.name} className={i ? `fmm-cell-in fmm-delay-${2 * i}` : ''}>
            <rect x="30" y={y0} width="670" height="100" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
            {i === 0 ? (
              <Wire d={`M56 ${t - 10} L162 ${t - 10} Q212 ${t - 10} 262 ${t - 30}`} stroke={MUTED} width={1.4} dash="4 4" />
            ) : null}
            <Wire d={`M44 ${t} L150 ${t} Q200 ${t} 250 ${t - 20} M44 ${b} L160 ${b} Q214 ${b} 262 ${b - 24}`} stroke={N} width={2.4} />
            <rect x="104" y={b - 16} width="14" height="16" fill={MUTED} />
            {i === 0 ? vec3.map(([x, dy, dx, dd]) => (
              <Arr key={`v3${x}-${dy}`} x1={x} y1={t + dy} x2={x + dx} y2={t + dy + dd} tone={BLUE} width={1.2} />
            )) : null}
            {i === 0 ? [[140, 38], [230, 18]].map(([x, dy]) => (
              <g key={`o${x}`}>
                <circle cx={x} cy={t + dy} r="5" fill="none" stroke={BLUE} strokeWidth="1.4" />
                <Dot cx={x} cy={t + dy} r={1.8} fill={BLUE} />
              </g>
            )) : null}
            {i === 1 ? vec2.map(([x, dy]) => (
              <Arr key={`v2${x}-${dy}`} x1={x} y1={t + dy} x2={x + 26} y2={t + dy - (x > 150 ? 8 : 0)} tone={TEAL} width={1.2} />
            )) : null}
            {i >= 2 ? <Arr x1={60} y1={mid} x2={210} y2={mid - 6} tone={g.tone} width={3} /> : null}
            {i >= 2 ? <M x={122} y={mid - 10} size={13} fill={g.tone}>V̄</M> : null}
            {i === 3 ? <M x={200} y={y0 + 96} size={11.5} fill={GREEN}>ρ = const</M> : null}

            <L x={290} y={y0 + 24} anchor="start" size={13.5} fill={g.tone}>{g.name}</L>
            {terms.map((term, k) => {
              const off = g.struck.includes(k)
              const fresh = g.fresh.includes(k)
              const hw = term.length * 3.9
              const y = y0 + 52
              return (
                <g key={term}>
                  <g className={fresh ? 'fmm-delete fmm-delay-3' : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
                    <M x={tx[k]} y={y} size={13} fill={off ? MUTED : N} opacity={off && !fresh ? 0.45 : 1}>{term}</M>
                  </g>
                  {off ? (
                    <g className={fresh ? 'fmm-cell-in fmm-delay-4' : ''}>
                      <Wire d={`M${tx[k] - hw} ${y - 4} L${tx[k] + hw} ${y - 4}`} stroke={RED} width={2} opacity={fresh ? 1 : 0.45} />
                    </g>
                  ) : null}
                </g>
              )
            })}
            {[368, 464, 564].map((x) => <M key={`p${x}`} x={x} y={y0 + 52} size={13} fill={MUTED}>+</M>)}
            <M x={674} y={y0 + 52} size={13} fill={N}>= 0</M>
            {i === 3 ? <rect x="284" y={y0 + 66} width="214" height="22" rx="5" fill="none" stroke={GREEN} strokeWidth="2" /> : null}
            <M x={290} y={y0 + 82} anchor="start" size={12} fill={i >= 2 ? g.tone : MUTED}>{g.note}</M>
          </g>
        )
      })}

      {/* Cost and accuracy fall together down the ladder */}
      <rect x="712" y="30" width="158" height="430" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={752} y={52} size={12.5} fill={AMBER}>cost</L>
      <L x={830} y={52} size={12.5} fill={PURP}>accuracy</L>
      <rect x="744" y="70" width="16" height="370" rx="4" fill={SKY} />
      <rect x="822" y="70" width="16" height="370" rx="4" fill={SKY} />
      <L x={791} y={84} size={10.5} fill={MUTED} weight={700}>high</L>
      <L x={791} y={440} size={10.5} fill={MUTED} weight={700}>low</L>
      {[80, 190, 300, 410].map((y) => (
        <Wire key={`tk${y}`} d={`M740 ${y} L764 ${y} M818 ${y} L842 ${y}`} stroke={MUTED} width={1.4} />
      ))}
      <g className="fmm-decay-dot" style={{ '--fmm-dx': '0px', '--fmm-dy': '330px' }}>
        <rect x="738" y="77" width="28" height="7" rx="2" fill={AMBER} />
      </g>
      <g className="fmm-decay-dot" style={{ '--fmm-dx': '0px', '--fmm-dy': '330px' }}>
        <rect x="816" y="77" width="28" height="7" rx="2" fill={PURP} />
      </g>
    </Scene>
  )
}

/** Unit 4 — forced vortex crosses spin with the flow; free vortex crosses orbit without net spin. */
export function RotationalIrrotationalCrossesScene() {
  const polar = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)]
  const orbits = [
    { r: 55, angles: [45, 225], dur: '2.5s' },
    { r: 95, angles: [0, 90, 180, 270], dur: '7.5s' },
    { r: 128, angles: [135, 315], dur: '13.5s' },
  ]
  /* Spin arrows are two arcs around the cross: same sense = net spin,
     opposite sense = the arms counter-rotate and cancel. */
  const cross = (x, y, cancel) => (
    <g>
      <Wire d={`M${x - 10} ${y} L${x + 10} ${y}`} stroke={ROSE} width={2.6} />
      <Wire d={`M${x} ${y - 10} L${x} ${y + 10}`} stroke={BLUE} width={2.6} />
      <Wire d={`M${x + 5.5} ${y - 15} A16 16 0 0 1 ${x + 15} ${y - 5.5}`} stroke={PURP} width={1.2} marker="url(#fmArrP)" />
      {cancel ? (
        <Wire d={`M${x - 5.5} ${y + 15} A16 16 0 0 0 ${x - 15} ${y + 5.5}`} stroke={TEAL} width={1.2} marker="url(#fmArrT)" />
      ) : (
        <Wire d={`M${x - 5.5} ${y + 15} A16 16 0 0 1 ${x - 15} ${y + 5.5}`} stroke={PURP} width={1.2} marker="url(#fmArrP)" />
      )}
    </g>
  )
  const hyper = []
  for (let x = 545; x <= 815; x += 6) hyper.push([x, 468 - 2100 / (x - 515)])
  return (
    <Scene caption="Rotation is about the element spinning, not about the path it travels">
      {[[225, BLUE, 'FORCED VORTEX · v = ωr'], [675, TEAL, 'FREE VORTEX · v = C / r']].map(([cx, tone, title]) => (
        <g key={title}>
          <L x={cx} y={40} size={14} fill={tone}>{title}</L>
          {[55, 95, 128].map((r) => (
            <circle key={`s${cx}-${r}`} cx={cx} cy={205} r={r} fill="none" stroke={MUTED} strokeWidth="1.3" strokeDasharray="4 5" />
          ))}
          <Dot cx={cx} cy={205} r={4} fill={N} />
        </g>
      ))}

      {/* Forced: one rigid rotation carries every cross round and turns it too */}
      <g className="fmm-spin" style={{ transformBox: 'view-box', transformOrigin: '225px 205px' }}>
        {orbits.flatMap((o) => o.angles.map((a) => {
          const [x, y] = polar(225, 205, o.r, a)
          return <g key={`f${o.r}-${a}`}>{cross(x, y, false)}</g>
        }))}
      </g>

      {/* Free: inner orbits run faster (ω ∝ 1/r²); each cross counter-turns so its arms keep their heading */}
      {orbits.map((o) => (
        <g key={`fr${o.r}`} className="fmm-spin" style={{ transformBox: 'view-box', transformOrigin: '675px 205px', animationDuration: o.dur }}>
          {o.angles.map((a) => {
            const [x, y] = polar(675, 205, o.r, a)
            return (
              <g key={`c${o.r}-${a}`} className="fmm-spin-slow" style={{ transformBox: 'view-box', transformOrigin: `${x}px ${y}px`, animationDuration: o.dur }}>
                {cross(x, y, true)}
              </g>
            )
          })}
        </g>
      ))}

      <L x={225} y={372} size={13} fill={PURP}>arms turn with the radius → rotational, ζ = 2ω</L>
      <L x={675} y={372} size={13} fill={TEAL}>arm spins cancel → irrotational, ζ = 0 (core excepted)</L>

      <g className="fmm-cell-in fmm-delay-6">
        <Axes x={70} y={470} w={300} h={74} yLabel="v" />
        <L x={378} y={474} anchor="start" size={12} fill={MUTED}>r</L>
        <Curve pts={[[72, 468], [360, 402]]} stroke={BLUE} className="fmm-draw fmm-delay-6" />
        <M x={300} y={452} size={12.5} fill={BLUE}>v = ωr</M>
        <Axes x={520} y={470} w={300} h={74} yLabel="v" />
        <L x={828} y={474} anchor="start" size={12} fill={MUTED}>r</L>
        <Curve pts={hyper} stroke={TEAL} className="fmm-draw fmm-delay-7" />
        <M x={720} y={430} size={12.5} fill={TEAL}>v = C / r</M>
      </g>
    </Scene>
  )
}

/** Unit 5 — one reversing crosswind, three different lines; in steady wind they collapse to one. */
export function ThreeLineFamiliesScene() {
  const frames = [200, 368, 536, 704]
  const strips = [
    { y: 30, name: 'STREAMLINES', sub: ['tangent to V at', 'one instant'], tone: BLUE },
    { y: 150, name: 'PATH LINE', sub: ['one particle', 'followed in time'], tone: PURP },
    { y: 270, name: 'STREAK LINE', sub: ['every particle that', 'passed one point'], tone: AMBER },
    { y: 392, name: 'STEADY WIND', sub: ['all three lines', 'coincide'], tone: GREEN },
  ]
  return (
    <Scene caption="In unsteady flow streamline, path line and streak line differ; in steady flow they coincide">
      {strips.map((s) => (
        <g key={s.name}>
          <rect x="30" y={s.y} width="840" height={s.name === 'STEADY WIND' ? 90 : 110} rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
          <L x={42} y={s.y + 30} anchor="start" size={13.5} fill={s.tone}>{s.name}</L>
          <L x={42} y={s.y + 52} anchor="start" size={11} fill={MUTED} weight={700}>{s.sub[0]}</L>
          <L x={42} y={s.y + 68} anchor="start" size={11} fill={MUTED} weight={700}>{s.sub[1]}</L>
        </g>
      ))}
      <Wire d="M527 32 L527 380" stroke={RED} width={1.6} dash="6 5" />
      <L x={527} y={24} size={12} fill={RED}>wind reverses</L>

      {/* Streamlines redrawn at four instants */}
      {frames.map((x0, i) => {
        const up = i < 2
        return (
          <g key={`fr${x0}`} className={`fmm-cell-in fmm-delay-${i}`}>
            <M x={x0 + 75} y={50} size={12} fill={MUTED}>{`t${i + 1}`}</M>
            {[80, 102, 124].map((yc) => (
              <Arr key={`sl${x0}-${yc}`} x1={x0 + 15} y1={yc + (up ? 12 : -12)} x2={x0 + 135} y2={yc + (up ? -12 : 12)} tone={BLUE} width={1.8} />
            ))}
          </g>
        )
      })}

      {/* Path line: the particle released at t1 climbs, then sinks */}
      <Dot cx={200} cy={225} r={5} fill={PURP} />
      <Curve pts={[[200, 225], [527, 175], [860, 225]]} stroke={PURP} width={3} className="fmm-draw fmm-delay-2" />
      <L x={206} y={250} anchor="start" size={11} fill={PURP} weight={700}>released at t1</L>
      <L x={856} y={250} anchor="end" size={11} fill={PURP} weight={700}>there at t4</L>

      {/* Streak line: the chimney's smoke, newest near the stack, oldest far off */}
      <rect x="192" y="300" width="16" height="72" fill={MUTED} />
      <Wire d="M200 300 L480 343 Q527 351 574 343 L860 300" stroke={AMBER} width={3.2} className="fmm-draw fmm-delay-4" />
      <L x={214} y={290} anchor="start" size={11} fill={AMBER} weight={700}>newest smoke</L>
      <L x={856} y={292} anchor="end" size={11} fill={AMBER} weight={700}>oldest smoke = the path-line particle</L>

      {/* Steady wind: the three lines slide onto one another */}
      <rect x="192" y="458" width="16" height="22" fill={MUTED} />
      <g className="fmm-decay-dot fmm-delay-6" style={{ '--fmm-dx': '0px', '--fmm-dy': '14px' }}>
        <Wire d="M200 444 L860 400" stroke={BLUE} width={6} opacity={0.35} />
      </g>
      <g className="fmm-decay-dot fmm-delay-6" style={{ '--fmm-dx': '0px', '--fmm-dy': '-14px' }}>
        <Wire d="M200 472 L860 428" stroke={PURP} width={3.2} />
      </g>
      <Wire d="M200 458 L860 414" stroke={AMBER} width={1.8} dash="7 5" />
    </Scene>
  )
}

/** Unit 6 — nozzle gives convective acceleration only, valve gives local only, the taper-plus-valve gives the sum. */
export function LocalConvectiveScene() {
  const valve = (vx, vy, half) => (
    <g className="fmm-switch" style={{ transformBox: 'view-box', transformOrigin: `${vx}px ${vy}px` }}>
      <Wire d={`M${vx - half * 0.5} ${vy + half * 0.85} L${vx + half * 0.5} ${vy - half * 0.85}`} stroke={RED} width={3.4} />
    </g>
  )
  return (
    <Scene caption="Acceleration of a particle = local (∂V/∂t) + convective (V ∂V/∂s)">
      {/* Left: steady nozzle */}
      <rect x="30" y="30" width="410" height="240" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={54} anchor="start" size={13} fill={BLUE}>STEADY NOZZLE · Q constant</L>
      <Pipe x={50} y={120} w={230} h1={80} h2={30} />
      <Wire d="M190 72 L190 116" stroke={N} width={2} />
      <Dot cx={190} cy={120} r={4.5} fill={N} />
      <g className="fmm-decay-dot" style={{ '--fmm-dx': '220px', '--fmm-dy': '0px' }}>
        <Dot cx={56} cy={120} r={6} fill={BLUE} />
      </g>
      {[[64, 18], [144, 26], [224, 44]].map(([x, len]) => (
        <Arr key={`nz${x}`} x1={x} y1={178} x2={x + len} y2={178} tone={BLUE} width={2} />
      ))}
      <L x={165} y={202} size={11} fill={MUTED} weight={700}>V grows along s</L>
      <Axes x={300} y={160} w={125} h={70} yLabel="V" />
      <L x={430} y={165} anchor="start" size={11.5} fill={MUTED}>t</L>
      <Curve pts={[[302, 118], [420, 118]]} stroke={GREEN} className="fmm-draw fmm-delay-2" />
      <L x={362} y={108} size={11} fill={GREEN} weight={700}>probe: flat</L>
      <g className="fmm-emerge fmm-delay-4">
        <M x={235} y={234} size={13} fill={BLUE}>convective only: a = V ∂V/∂s</M>
        <M x={235} y={256} size={12} fill={MUTED}>∂V/∂t = 0</M>
      </g>

      {/* Right: valve opening in a constant bore */}
      <rect x="460" y="30" width="410" height="240" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={476} y={54} anchor="start" size={13} fill={RED}>VALVE OPENING · constant bore</L>
      <Pipe x={480} y={120} w={230} h1={50} />
      {valve(492, 120, 22)}
      <Wire d="M640 80 L640 116" stroke={N} width={2} />
      <Dot cx={640} cy={120} r={4.5} fill={N} />
      <g className="fmm-decay-dot" style={{ '--fmm-dx': '190px', '--fmm-dy': '0px' }}>
        <Dot cx={510} cy={120} r={6} fill={RED} />
      </g>
      {[494, 574, 654].map((x) => (
        <g key={`vl${x}`} className="fmm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
          <Arr x1={x} y1={178} x2={x + 26} y2={178} tone={RED} width={2} />
        </g>
      ))}
      <L x={595} y={202} size={11} fill={MUTED} weight={700}>same V all along, rising in t</L>
      <Axes x={740} y={160} w={115} h={70} yLabel="V" />
      <L x={862} y={165} anchor="start" size={11.5} fill={MUTED}>t</L>
      <Curve pts={[[742, 150], [850, 98]]} stroke={RED} className="fmm-draw fmm-delay-2" />
      <L x={812} y={152} size={11} fill={RED} weight={700}>probe: rises</L>
      <g className="fmm-emerge fmm-delay-4">
        <M x={665} y={234} size={13} fill={RED}>local only: a = ∂V/∂t</M>
        <M x={665} y={256} size={12} fill={MUTED}>V ∂V/∂s = 0</M>
      </g>

      {/* Combined: taper and opening valve, both terms accumulate */}
      <rect x="30" y="282" width="840" height="200" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={306} anchor="start" size={13} fill={PURP}>TAPER + OPENING VALVE</L>
      <Pipe x={60} y={385} w={300} h1={80} h2={34} />
      {valve(74, 385, 34)}
      <g className="fmm-decay-dot fmm-delay-5" style={{ '--fmm-dx': '270px', '--fmm-dy': '0px' }}>
        <Dot cx={86} cy={385} r={6} fill={PURP} />
      </g>
      {[[100, 18], [190, 28], [280, 46]].map(([x, len]) => (
        <g key={`cb${x}`} className="fmm-bar fmm-delay-5" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
          <Arr x1={x} y1={448} x2={x + len} y2={448} tone={PURP} width={2} />
        </g>
      ))}
      <g className="fmm-slide-in fmm-delay-6">
        <M x={480} y={340} size={17} fill={N}>DV/Dt</M>
        <M x={538} y={340} size={17} fill={N}>=</M>
        <M x={600} y={340} size={17} fill={RED}>∂V/∂t</M>
        <M x={660} y={340} size={17} fill={N}>+</M>
        <M x={736} y={340} size={17} fill={BLUE}>V ∂V/∂s</M>
        <L x={480} y={364} size={11.5} fill={MUTED} weight={700}>total</L>
        <L x={600} y={364} size={11.5} fill={RED} weight={700}>local</L>
        <L x={736} y={364} size={11.5} fill={BLUE} weight={700}>convective</L>
      </g>
      <g className="fmm-bar fmm-delay-6" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
        <rect x="440" y="392" width="120" height="24" rx="4" fill={RED} />
      </g>
      <g className="fmm-bar fmm-delay-7" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
        <rect x="560" y="392" width="200" height="24" rx="4" fill={BLUE} />
      </g>
      <Wire d="M440 428 L440 436 L760 436 L760 428" stroke={N} width={2} />
      <M x={600} y={458} size={13} fill={PURP}>sum = DV/Dt of the particle</M>
    </Scene>
  )
}

/** Unit 7 — mass fluxes through a cubical element: tally out − in, get continuity, strike ∂ρ/∂t, test fields. */
export function ContinuityCubeScene() {
  const eq = [['∂ρ/∂t', 530], ['+', 562], ['∂(ρu)/∂x', 612], ['+', 656], ['∂(ρv)/∂y', 700], ['+', 744], ['∂(ρw)/∂z', 788], ['= 0', 846]]
  return (
    <Scene caption="Net mass outflow from the element equals the loss of mass stored inside it">
      {/* Cube: front face, top face, right face; hidden edges dashed */}
      <Wire d="M110 300 L165 255 L295 255 M165 255 L165 125" stroke={MUTED} width={1.4} dash="4 4" />
      <path d="M110 170 L165 125 L295 125 L240 170 Z" fill={SKY} stroke={N} strokeWidth="2.2" />
      <path d="M240 170 L295 125 L295 255 L240 300 Z" fill={SKY} stroke={N} strokeWidth="2.2" />
      <rect x="110" y="170" width="130" height="130" fill={WHITE} fillOpacity="0.7" stroke={N} strokeWidth="2.4" />

      <g className="fmm-cell-in fmm-delay-0">
        <Arr x1={44} y1={235} x2={104} y2={235} tone={BLUE} />
        <M x={74} y={218} size={11.5} fill={BLUE}>ρu dy dz</M>
      </g>
      <g className="fmm-cell-in fmm-delay-1">
        <Arr x1={300} y1={212} x2={360} y2={212} tone={BLUE} />
        <M x={300} y={196} anchor="start" size={11.5} fill={BLUE}>[ρu + ∂(ρu)/∂x dx] dy dz</M>
      </g>
      <g className="fmm-cell-in fmm-delay-2">
        <Arr x1={210} y1={372} x2={210} y2={304} tone={TEAL} />
        <M x={218} y={360} anchor="start" size={11.5} fill={TEAL}>ρv dx dz</M>
      </g>
      <g className="fmm-cell-in fmm-delay-3">
        <Arr x1={202} y1={140} x2={202} y2={80} tone={TEAL} />
        <M x={214} y={80} anchor="start" size={11.5} fill={TEAL}>[ρv + ∂(ρv)/∂y dy] dx dz</M>
      </g>
      <g className="fmm-cell-in fmm-delay-4">
        <Arr x1={360} y1={104} x2={310} y2={142} tone={PURP} />
        <M x={366} y={100} anchor="start" size={11.5} fill={PURP}>ρw dx dy</M>
      </g>
      <g className="fmm-cell-in fmm-delay-5">
        <Arr x1={150} y1={265} x2={100} y2={306} tone={PURP} />
        <M x={36} y={330} anchor="start" size={11} fill={PURP}>[ρw + ∂(ρw)/∂z dz] dx dy</M>
      </g>
      <L x={230} y={420} size={13} fill={N}>element dx × dy × dz</L>
      <L x={230} y={446} size={12} fill={MUTED} weight={700}>out − in on each pair = the Taylor increment</L>

      <Panel x={480} y={30} w={390} title="LEDGER · out − in, face pair by face pair" mono className="fmm-cell-in fmm-delay-6"
        rows={[['x pair', '∂(ρu)/∂x · dV', BLUE], ['y pair', '∂(ρv)/∂y · dV', TEAL], ['z pair', '∂(ρw)/∂z · dV', PURP], ['storage', '−∂ρ/∂t · dV', RED]]} />

      <g className="fmm-slide-in fmm-delay-7">
        <L x={480} y={198} anchor="start" size={11.5} fill={RED}>incompressible: ρ = const</L>
        {eq.map(([t, x]) => (
          <M key={`eq${x}`} x={x} y={222} size={13} fill={N}>{t}</M>
        ))}
        <g className="fmm-delete fmm-delay-7" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <Wire d="M508 218 L552 218" stroke={RED} width={2.2} />
        </g>
        <rect x="556" y="262" width="238" height="30" rx="6" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <M x={675} y={282} size={14} fill={GREEN}>∂u/∂x + ∂v/∂y + ∂w/∂z = 0</M>
      </g>

      <Card x={480} y={306} w={390} h={176} title="TEST TWO CANDIDATE FIELDS" accent={PURP} className="fmm-cell-in fmm-delay-7">
        <M x={20} y={62} anchor="start" size={12} fill={N}>A:  u = 2x,  v = −2y</M>
        <M x={20} y={84} anchor="start" size={12} fill={MUTED}>∂u/∂x + ∂v/∂y = 2 − 2 = 0</M>
        <M x={20} y={122} anchor="start" size={12} fill={N}>B:  u = x²,  v = y</M>
        <M x={20} y={144} anchor="start" size={12} fill={MUTED}>∂u/∂x + ∂v/∂y = 2x + 1 ≠ 0</M>
        <g className="fmm-emerge fmm-delay-7">
          <L x={300} y={78} anchor="start" size={15} fill={GREEN}>✓ possible</L>
          <L x={300} y={138} anchor="start" size={15} fill={RED}>✗ rejected</L>
        </g>
      </Card>
    </Scene>
  )
}

/** Unit 8 — constant-ψ lines over a bump: the flow between two lines is their difference, wide or narrow. */
export function StreamFunctionContoursScene() {
  const xs = []
  for (let x = 70; x <= 560; x += 10) xs.push(x)
  const ys = (x) => 400 - 120 * Math.exp(-(((x - 300) / 80) ** 2))
  const line = (k) => xs.map((x) => [x, ys(x) + (80 - ys(x)) * (k / 5)])
  const band = [...line(2), ...line(3).reverse()].map(([x, y]) => `${x},${y.toFixed(1)}`).join(' ')
  const ground = [[70, 410], ...xs.map((x) => [x, ys(x)]), [560, 410]].map(([x, y]) => `${x},${y.toFixed(1)}`).join(' ')
  const at = (x, k) => ys(x) + (80 - ys(x)) * (k / 5)
  return (
    <Scene caption="The volume flow between two streamlines is the difference of their ψ values">
      <L x={315} y={50} size={14}>ψ CONTOURS OVER A BUMP</L>
      <polygon points={ground} fill={MUTED} fillOpacity="0.22" />
      <polygon points={band} fill={BLUE} fillOpacity="0.16" className="fmm-cell-in fmm-delay-6" />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <g key={`psi${k}`}>
          <Curve pts={line(k)} stroke={k === 2 || k === 3 ? BLUE : k === 0 ? N : MUTED} width={k === 2 || k === 3 ? 3 : 2} className={`fmm-draw fmm-delay-${k}`} />
          <M x={64} y={at(70, k) + 4} anchor="end" size={12} fill={k === 2 || k === 3 ? BLUE : MUTED}>{`ψ=${k}`}</M>
        </g>
      ))}
      {/* Sections: same q, different V */}
      {[[120, 30, 'wide → V small'], [300, 48, 'narrow → V large']].map(([x, len, note]) => (
        <g key={`sec${x}`}>
          <Wire d={`M${x} ${at(x, 3)} L${x} ${at(x, 2)}`} stroke={AMBER} width={3} />
          <g className="fmm-bar fmm-delay-7" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
            <Arr x1={x + 6} y1={(at(x, 2) + at(x, 3)) / 2} x2={x + 6 + len} y2={(at(x, 2) + at(x, 3)) / 2} tone={AMBER} width={2.4} />
          </g>
          <M x={x} y={436} size={12} fill={BLUE}>q = 3 − 2 = 1 m²/s</M>
          <L x={x} y={456} size={11.5} fill={AMBER} weight={700}>{note}</L>
        </g>
      ))}

      <Card x={590} y={40} w={280} h={440} title="WHY ψ ALWAYS SATISFIES CONTINUITY" accent={PURP}>
        <L x={20} y={62} anchor="start" size={11.5} fill={MUTED} weight={700}>definitions</L>
        <M x={20} y={88} anchor="start" size={13}>u = ∂ψ/∂y</M>
        <M x={20} y={110} anchor="start" size={13}>v = −∂ψ/∂x</M>
        <g className="fmm-slide-in fmm-delay-2">
          <L x={20} y={146} anchor="start" size={11.5} fill={MUTED} weight={700}>substitute into continuity</L>
          <M x={20} y={170} anchor="start" size={13}>∂u/∂x + ∂v/∂y</M>
        </g>
        <g className="fmm-slide-in fmm-delay-4">
          <M x={30} y={206} size={13}>=</M>
          <M x={100} y={206} size={13}>∂²ψ/∂x∂y</M>
          <M x={152} y={206} size={13}>−</M>
          <M x={204} y={206} size={13}>∂²ψ/∂y∂x</M>
        </g>
        <g className="fmm-cell-in fmm-delay-6">
          <Wire d="M68 202 L132 202 M172 202 L236 202" stroke={RED} width={2.2} />
        </g>
        <g className="fmm-emerge fmm-delay-6">
          <rect x="16" y="226" width="200" height="28" rx="6" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
          <M x={116} y={245} size={13} fill={GREEN}>= 0 identically</M>
        </g>
        <L x={20} y={290} anchor="start" size={12} fill={N} weight={700}>so ψ exists for every 2-D</L>
        <L x={20} y={310} anchor="start" size={12} fill={N} weight={700}>incompressible flow</L>
        <L x={20} y={350} anchor="start" size={11.5} fill={MUTED} weight={700}>flow between two lines</L>
        <rect x="16" y="360" width="200" height="30" rx="6" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
        <M x={116} y={380} size={14} fill={BLUE}>q = ψ₂ − ψ₁</M>
        <L x={20} y={418} anchor="start" size={11.5} fill={MUTED} weight={700}>per unit depth, in m²/s</L>
      </Card>
    </Scene>
  )
}

/** Unit 9 — flow past a cylinder: streamlines and equipotentials cross at right angles everywhere. */
export function PotentialStreamNetScene() {
  const a = 50
  const [cx, cy] = [265, 232]
  const S = (X, Y) => [cx + X, cy - Y]
  const vel = (X, Y) => {
    const r4 = (X * X + Y * Y) ** 2
    return [1 - (a * a * (X * X - Y * Y)) / r4, (-2 * a * a * X * Y) / r4]
  }
  const psi = (X, Y) => Y * (1 - (a * a) / (X * X + Y * Y))
  const phi = (X, Y) => X * (1 + (a * a) / (X * X + Y * Y))
  const bisect = (f, lo0, hi0) => {
    let [lo, hi] = [lo0, hi0]
    for (let i = 0; i < 40; i += 1) {
      const m = (lo + hi) / 2
      if (f(m) > 0) hi = m
      else lo = m
    }
    return (lo + hi) / 2
  }
  const stream = (c) => {
    const k = Math.abs(c)
    const pts = []
    for (let X = -205; X <= 205; X += 5) {
      const lo = Math.abs(X) < a ? Math.sqrt(a * a - X * X) + 0.01 : 0.01
      pts.push(S(X, Math.sign(c) * bisect((y) => psi(X, y) - k, lo, 400)))
    }
    return pts
  }
  const equi = (c) => {
    const k = Math.abs(c)
    const runs = [[]]
    for (let Y = -168; Y <= 168; Y += 4) {
      const lo = Math.sqrt(Math.max(0, a * a - Y * Y)) + 0.01
      const g = (x) => phi(x, Y) - k
      const X = g(lo) < 0 ? bisect(g, lo, 400) : null
      if (X == null || X > 208) {
        if (runs[runs.length - 1].length) runs.push([])
      } else runs[runs.length - 1].push(S(Math.sign(c) * X, Y))
    }
    return runs.filter((r) => r.length > 1)
  }
  /* Newton on (φ, ψ) to land a right-angle marker exactly on a drawn crossing */
  const cross = (cs, cp, X0, Y0) => {
    let [X, Y] = [X0, Y0]
    for (let i = 0; i < 20; i += 1) {
      const [u, v] = vel(X, Y)
      const [ep, es, d] = [phi(X, Y) - cp, psi(X, Y) - cs, u * u + v * v]
      X += (-ep * u + es * v) / d
      Y += (-ep * v - es * u) / d
    }
    const [u, v] = vel(X, Y)
    const m = Math.hypot(u, v)
    return { p: S(X, Y), t: [u / m, -v / m] }
  }
  const sq = (p, t, s) => {
    const m = [t[1], -t[0]]
    const q = (k, j) => `${(p[0] + k * s * t[0] + j * s * m[0]).toFixed(1)} ${(p[1] + k * s * t[1] + j * s * m[1]).toFixed(1)}`
    return `M${q(1, 0)} L${q(1, 1)} L${q(0, 1)}`
  }
  const marks = [cross(65, -70, -70, 65), cross(35, 120, 110, 40), cross(-100, 30, 30, -110), cross(-35, -165, -160, -35)]
  const I = marks[0]
  const C = [600, 125]
  const along = (k, v) => [C[0] + k * v[0], C[1] + k * v[1]]
  const nI = [I.t[1], -I.t[0]]
  const rows = [
    ['exists if', '2-D, incompressible', 'irrotational'],
    ['lines', 'streamlines', 'equipotentials'],
    ['u =', '∂ψ/∂y', '∂φ/∂x'],
    ['v =', '−∂ψ/∂x', '∂φ/∂y'],
    ['∇² = 0', 'if irrotational', 'if incompressible'],
  ]
  return (
    <Scene caption="Streamlines and equipotentials form a net of curvilinear squares">
      <L x={265} y={40} size={14}>FLOW PAST A CYLINDER · ψ and φ cross at 90°</L>
      <rect x="40" y="50" width="450" height="364" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <circle cx={cx} cy={cy} r={a} fill={MUTED} fillOpacity="0.35" stroke={N} strokeWidth="2.4" />
      <Wire d={`M60 ${cy} L${cx - a} ${cy} M${cx + a} ${cy} L470 ${cy}`} stroke={BLUE} width={2} className="fmm-draw" />
      {[12, 35, 65, 100, 140].flatMap((c) => [c, -c]).map((c, i) => (
        <Curve key={`ps${c}`} pts={stream(c)} stroke={BLUE} width={2} className={`fmm-draw fmm-delay-${i % 3}`} />
      ))}
      <g className="fmm-cell-in fmm-delay-4">
        <Wire d={`M${cx} ${cy - a} L${cx} 64 M${cx} ${cy + a} L${cx} 400`} stroke={AMBER} width={2} dash="6 5" />
        {[30, 70, 120, 165, 205].flatMap((c) => [c, -c]).flatMap((c) => equi(c).map((run, j) => (
          <Curve key={`ph${c}-${j}`} pts={run} stroke={AMBER} width={2} dash="6 5" />
        )))}
      </g>
      <g className="fmm-emerge fmm-delay-5">
        {marks.map((mk, i) => <Wire key={`ra${i}`} d={sq(mk.p, mk.t, 9)} stroke={RED} width={2} />)}
        <circle cx={I.p[0]} cy={I.p[1]} r="11" fill="none" stroke={PURP} strokeWidth="2" />
      </g>
      <Wire d="M60 436 L100 436" stroke={BLUE} width={2.4} />
      <L x={108} y={440} anchor="start" size={12} fill={BLUE}>streamline ψ = const</L>
      <Wire d="M60 462 L100 462" stroke={AMBER} width={2.4} dash="6 5" />
      <L x={108} y={466} anchor="start" size={12} fill={AMBER}>equipotential φ = const</L>

      {/* Inset: one crossing magnified, ∇φ lies along the streamline */}
      <Wire d={`M${I.p[0] + 11} ${I.p[1]} L510 125`} stroke={PURP} width={1.3} dash="3 4" />
      <g className="fmm-emerge fmm-delay-6">
        <rect x="510" y="30" width="180" height="180" rx="10" fill={WHITE} stroke={PURP} strokeWidth="2" />
        <L x={520} y={48} anchor="start" size={11.5} fill={PURP}>MAGNIFIED</L>
        <Wire d={`M${along(-62, I.t).join(' ')} L${along(62, I.t).join(' ')}`} stroke={BLUE} width={2.4} />
        <Wire d={`M${along(-62, nI).join(' ')} L${along(62, nI).join(' ')}`} stroke={AMBER} width={2.4} dash="6 5" />
        <Wire d={sq(C, I.t, 13)} stroke={RED} width={2} />
        <Arr x1={C[0]} y1={C[1]} x2={along(52, I.t)[0]} y2={along(52, I.t)[1]} tone={PURP} width={2.6} />
        <L x={556} y={160} size={11.5} fill={BLUE}>ψ = const</L>
        <L x={596} y={70} anchor="start" size={11.5} fill={AMBER}>φ = const</L>
        <M x={620} y={148} anchor="start" size={12} fill={PURP}>∇φ = V</M>
      </g>

      <Card x={700} y={30} w={170} h={180} title="EXISTENCE TEST" accent={PURP}>
        <M x={85} y={58} size={13}>V = ∇φ</M>
        <M x={85} y={84} size={13}>ζ = ∇ × V</M>
        <M x={85} y={110} size={13} fill={GREEN}>= ∇ × ∇φ ≡ 0</M>
        <L x={85} y={140} size={11.5} fill={N} weight={700}>so φ exists only</L>
        <L x={85} y={158} size={11.5} fill={N} weight={700}>if the flow is</L>
        <L x={85} y={176} size={11.5} fill={PURP}>irrotational</L>
      </Card>

      <rect x="510" y="222" width="360" height="260" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <rect x="510" y="222" width="360" height="32" rx="10" fill={SKY} />
      <L x={665} y={243} size={12.5} fill={BLUE}>ψ stream function</L>
      <L x={800} y={243} size={12.5} fill={AMBER}>φ potential</L>
      {rows.map(([k, s, p], i) => (
        <g key={k} className={`fmm-slide-in fmm-delay-${i + 3}`}>
          <L x={522} y={282 + i * 38} anchor="start" size={11.5} fill={MUTED}>{k}</L>
          <L x={665} y={282 + i * 38} size={11.5} fill={N} weight={700}>{s}</L>
          <L x={800} y={282 + i * 38} size={11.5} fill={N} weight={700}>{p}</L>
        </g>
      ))}
    </Scene>
  )
}

/** Unit 10 — walk a loop summing V·dl; the total equals the enclosed spin (Stokes), and a core can hide it all. */
export function CirculationLoopScene() {
  const side = (x1, y1, x2, y2, tone, i) => (
    <g className={`fmm-cell-in fmm-delay-${i}`}>
      <Arr x1={x1} y1={y1} x2={x2} y2={y2} tone={tone} width={3} />
    </g>
  )
  return (
    <Scene caption="Circulation round a loop = total vorticity inside it (Stokes)">
      {/* A: shear flow, rotational */}
      <rect x="30" y="30" width="840" height="240" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={56} anchor="start" size={13} fill={BLUE}>SHEAR FLOW · u = u₀ + ky</L>
      {[[100, 60], [125, 50], [150, 40], [175, 30], [200, 20]].map(([y, len]) => (
        <Arr key={`pr${y}`} x1={60} y1={y} x2={60 + len} y2={y} tone={BLUE} width={2} />
      ))}
      <Wire d="M60 92 L60 208" stroke={N} width={1.6} />
      <L x={95} y={232} size={11.5} fill={MUTED} weight={700}>u grows with y</L>

      {/* Tangential components: full on top and bottom, zero on the sides */}
      {[240, 300, 356].map((x) => (
        <g key={`tb${x}`}>
          <Arr x1={x} y1={88} x2={x + 24} y2={88} tone={RED} width={2} />
          <Arr x1={x} y1={212} x2={x + 10} y2={212} tone={GREEN} width={2} />
        </g>
      ))}
      {[[125, 50], [175, 30]].map(([y, len]) => (
        <g key={`sd${y}`}>
          <Arr x1={220 - len / 2} y1={y} x2={220 + len / 2} y2={y} tone={MUTED} width={1.6} />
          <Arr x1={380 - len / 2} y1={y} x2={380 + len / 2} y2={y} tone={MUTED} width={1.6} />
        </g>
      ))}
      {side(220, 200, 380, 200, GREEN, 0)}
      {side(380, 200, 380, 100, MUTED, 1)}
      {side(380, 100, 220, 100, RED, 2)}
      {side(220, 100, 220, 200, MUTED, 3)}
      {[265, 300, 335].flatMap((x) => [145, 165].map((y) => (
        <g key={`vm${x}-${y}`} className="fmm-emerge fmm-delay-5">
          <g className="fmm-spin" style={{ transformBox: 'view-box', transformOrigin: `${x}px ${y}px` }}>
            <circle cx={x} cy={y} r="7" fill="none" stroke={PURP} strokeWidth="1.8" />
            <Wire d={`M${x} ${y} L${x} ${y - 7}`} stroke={PURP} width={1.8} />
          </g>
        </g>
      )))}
      <L x={300} y={250} size={11.5} fill={PURP}>6 spin markers: ζA = −2 × 2 = −4</L>
      <Panel x={470} y={44} w={380} title="LEDGER · Γ = ∮ V·dl, anticlockwise" mono rowH={24} className="fmm-cell-in fmm-delay-4"
        rows={[['bottom →', '+u_b L = +1 × 2 = +2', GREEN], ['right ↑', 'V ⊥ dl → 0', MUTED], ['top ←', '−u_t L = −3 × 2 = −6', RED], ['left ↓', 'V ⊥ dl → 0', MUTED], ['Γ', '= −4 m²/s', N], ['Stokes', '∬ ζ dA = −4 ✓', PURP]]} />
      <g className="fmm-emerge fmm-delay-6">
        <Arr x1={404} y1={156} x2={466} y2={204} tone={PURP} width={2} />
      </g>

      {/* B: uniform flow, irrotational */}
      <rect x="30" y="282" width="415" height="200" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={306} anchor="start" size={13} fill={GREEN}>UNIFORM FLOW · no spin inside</L>
      {[100, 170].map((x) => (
        <g key={`ub${x}`}>
          <Arr x1={x} y1={328} x2={x + 36} y2={328} tone={RED} width={2} />
          <Arr x1={x} y1={442} x2={x + 36} y2={442} tone={GREEN} width={2} />
        </g>
      ))}
      <path d="M80 430 L220 430 L220 340 L80 340 Z" fill="none" stroke={N} strokeWidth="2.4" />
      <Arr x1={100} y1={430} x2={160} y2={430} tone={N} width={2.4} />
      <M x={150} y={390} size={14} fill={GREEN}>ζ = 0</M>
      <g className="fmm-slide-in fmm-delay-6">
        <M x={250} y={344} anchor="start" size={12} fill={GREEN}>bottom  +uL</M>
        <M x={250} y={366} anchor="start" size={12} fill={MUTED}>right    0</M>
        <M x={250} y={388} anchor="start" size={12} fill={RED}>top     −uL</M>
        <M x={250} y={410} anchor="start" size={12} fill={MUTED}>left     0</M>
        <M x={250} y={440} anchor="start" size={14} fill={N}>Γ = 0</M>
      </g>

      {/* C: free vortex, loop around the singular core */}
      <rect x="455" y="282" width="415" height="200" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={471} y={306} anchor="start" size={13} fill={TEAL}>FREE VORTEX · loop round the core</L>
      {[30, 70].map((r) => (
        <circle key={`fv${r}`} cx={560} cy={392} r={r} fill="none" stroke={MUTED} strokeWidth="1.3" strokeDasharray="4 5" />
      ))}
      <g className="fmm-spin-slow" style={{ transformBox: 'view-box', transformOrigin: '560px 392px' }}>
        {[0, 90, 180, 270].map((deg) => (
          <g key={`fa${deg}`} transform={`rotate(${deg} 560 392)`}>
            <Wire d="M590 402 A30 30 0 0 1 590 382" stroke={TEAL} width={2.2} marker="url(#fmArrT)" />
          </g>
        ))}
      </g>
      <path d="M510 342 L610 342 L610 442 L510 442 Z" fill="none" stroke={N} strokeWidth="2.4" className="fmm-cell-in fmm-delay-7" />
      <Dot cx={560} cy={392} r={5} fill={RED} />
      <g className="fmm-slide-in fmm-delay-7">
        <M x={650} y={352} anchor="start" size={13} fill={TEAL}>Γ = ∮ v·dl = C ≠ 0</M>
        <L x={650} y={380} anchor="start" size={12} fill={N} weight={700}>yet ζ = 0 everywhere</L>
        <L x={650} y={400} anchor="start" size={12} fill={N} weight={700}>except at r = 0</L>
        <L x={650} y={432} anchor="start" size={12} fill={RED}>the core carries all of Γ</L>
      </g>
    </Scene>
  )
}

/** Unit 11 — φ into continuity gives Laplace; ψ into vorticity gives Poisson, which is Laplace when ζ = 0. */
export function LaplacePoissonScene() {
  const q = 8
  const O = [700, 424]
  const body = []
  for (let th = Math.PI - 0.03; th > 0.15; th -= 0.05) {
    const r = (q * (Math.PI - th)) / Math.sin(th)
    if (r * Math.cos(th) <= 150) body.push([r * Math.cos(th), r * Math.sin(th)])
  }
  const bodyPts = [...body.map(([X, Y]) => [O[0] + X, O[1] - Y]), ...body.slice().reverse().map(([X, Y]) => [O[0] + X, O[1] + Y])]
  const halfStream = (d, sgn) => {
    const c = q * Math.PI + d
    const pts = []
    for (let X = -90; X <= 150; X += 5) {
      let [lo, hi] = [0.01, 120]
      for (let i = 0; i < 40; i += 1) {
        const m = (lo + hi) / 2
        if (m + q * Math.atan2(m, X) - c > 0) hi = m
        else lo = m
      }
      pts.push([O[0] + X, O[1] - sgn * lo])
    }
    return pts
  }
  const step = (x, y, text, k, tone = N) => (
    <g className={`fmm-slide-in fmm-delay-${k}`}>
      <M x={x} y={y} size={13} fill={tone}>{text}</M>
    </g>
  )
  return (
    <Scene caption="φ obeys Laplace through continuity; ψ obeys Poisson through vorticity, and Laplace once ζ = 0">
      <L x={450} y={40} size={15}>SAME PLANE FLOW, TWO SCALAR FUNCTIONS</L>
      <Card x={30} y={58} w={400} h={200} title="VELOCITY POTENTIAL φ" accent={AMBER}>
        <L x={200} y={50} size={11.5} fill={AMBER}>driven by mass conservation</L>
        {step(200, 78, 'u = ∂φ/∂x,   v = ∂φ/∂y', 1)}
        {step(200, 104, 'into  ∂u/∂x + ∂v/∂y = 0', 2, MUTED)}
        {step(200, 130, '∂²φ/∂x² + ∂²φ/∂y² = 0', 3)}
        <g className="fmm-emerge fmm-delay-4">
          <rect x="110" y="146" width="180" height="34" rx="7" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
          <M x={170} y={169} size={15} fill={GREEN}>∇²φ = 0</M>
          <L x={250} y={169} size={12} fill={GREEN}>Laplace</L>
        </g>
      </Card>
      <Card x={470} y={58} w={400} h={200} title="STREAM FUNCTION ψ" accent={PURP}>
        <L x={200} y={50} size={11.5} fill={PURP}>driven by rotation</L>
        {step(200, 78, 'u = ∂ψ/∂y,   v = −∂ψ/∂x', 1)}
        {step(200, 104, 'into  ζ = ∂v/∂x − ∂u/∂y', 2, MUTED)}
        {step(200, 130, '∂²ψ/∂x² + ∂²ψ/∂y² = −ζ', 3)}
        <g className="fmm-emerge fmm-delay-4">
          <rect x="110" y="146" width="180" height="34" rx="7" fill={WHITE} stroke={PURP} strokeWidth="2.4" />
          <M x={160} y={169} size={15} fill={PURP}>∇²ψ =</M>
          <M x={212} y={169} size={15} fill={RED}>−ζ</M>
          <L x={262} y={169} size={12} fill={PURP}>Poisson</L>
        </g>
      </Card>

      <g className="fmm-cell-in fmm-delay-6">
        <Arr x1={670} y1={240} x2={670} y2={288} tone={RED} width={2.4} />
        <L x={680} y={268} anchor="start" size={12} fill={RED}>ζ = 0 (irrotational)</L>
        <rect x="580" y="290" width="180" height="32" rx="7" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <M x={670} y={311} size={15} fill={GREEN}>∇²ψ = 0</M>
        <Wire d="M580 306 L230 306 L230 242" stroke={GREEN} width={1.8} dash="5 4" marker="url(#fmArrG)" />
        <L x={400} y={298} size={11.5} fill={GREEN}>same Laplace form</L>
      </g>

      {/* Laplace is linear: add solutions */}
      <rect x="30" y="336" width="840" height="146" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={160} y={358} size={12.5} fill={BLUE}>uniform flow</L>
      <L x={440} y={358} size={12.5} fill={TEAL}>source</L>
      <L x={730} y={358} size={12.5} fill={AMBER}>half body</L>
      <g className="fmm-cell-in fmm-delay-5">
        {[390, 412, 434, 456].map((y) => <Arr key={`uf${y}`} x1={70} y1={y} x2={250} y2={y} tone={BLUE} width={2} />)}
      </g>
      <M x={300} y={432} size={26} fill={N}>+</M>
      <g className="fmm-cell-in fmm-delay-6">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const [c, s] = [Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180)]
          return <Arr key={`so${deg}`} x1={440 + 10 * c} y1={424 + 10 * s} x2={440 + 42 * c} y2={424 + 42 * s} tone={TEAL} width={1.8} />
        })}
        <Dot cx={440} cy={424} r={4.5} fill={TEAL} />
      </g>
      <M x={580} y={432} size={26} fill={N}>=</M>
      <g className="fmm-cell-in fmm-delay-7">
        <polygon points={bodyPts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} fill={AMBER} fillOpacity="0.22" stroke={AMBER} strokeWidth="2.2" />
        {[9, 18, 27].flatMap((d) => [1, -1].map((sgn) => (
          <Curve key={`hb${d}${sgn}`} pts={halfStream(d, sgn)} stroke={BLUE} width={1.8} />
        )))}
        <Dot cx={O[0]} cy={O[1]} r={3.5} fill={TEAL} />
        <Dot cx={O[0] - q} cy={O[1]} r={3.5} fill={RED} />
      </g>
    </Scene>
  )
}

/** Unit 12 — seepage net under a dam: confocal ellipses and hyperbolae, squeezed at the toe, counted for q. */
export function FlowNetDamScene() {
  const b = 80
  const [ox, oy] = [450, 200]
  const D = Math.PI / 8
  const Z = (xi, eta) => [ox + b * Math.cosh(xi) * Math.cos(eta), oy + b * Math.sinh(xi) * Math.sin(eta)]
  const streamPts = (xi) => {
    const pts = []
    for (let k = 0; k <= 40; k += 1) pts.push(Z(xi, Math.PI - (k * Math.PI) / 40))
    return pts
  }
  const equiPts = (eta) => {
    const pts = []
    for (let k = 0; k <= 32; k += 1) pts.push(Z((k * 4 * D) / 32, eta))
    return pts
  }
  const arrow = (xi, eta, K = 30) => {
    const [x, y] = Z(xi, eta)
    const d = [Math.cosh(xi) * Math.sin(eta), -Math.sinh(xi) * Math.cos(eta)]
    const m = Math.hypot(d[0], d[1])
    const len = Math.min(56, K / Math.sqrt(Math.sinh(xi) ** 2 + Math.sin(eta) ** 2))
    const [ux, uy] = [d[0] / m, d[1] / m]
    return { x1: x - (ux * len) / 2, y1: y - (uy * len) / 2, x2: x + (ux * len) / 2, y2: y + (uy * len) / 2 }
  }
  const cell = []
  for (let k = 0; k <= 6; k += 1) cell.push(Z(2 * D, 3 * D + (k * D) / 6))
  for (let k = 6; k >= 0; k -= 1) cell.push(Z(3 * D, 3 * D + (k * D) / 6))
  const cc = Z(2.5 * D, 3.5 * D)
  return (
    <Scene caption="Squares in the net: small squares mean fast seepage, and q = k h N_f / N_d">
      <L x={46} y={50} anchor="start" size={14}>SEEPAGE UNDER A DAM</L>
      <rect x="40" y="200" width="640" height="270" fill={AMBER} fillOpacity="0.08" />
      <polygon points="40,90 403.8,90 370,200 40,200" fill={SKY} />
      <polygon points="515,172 680,172 680,200 530,200" fill={SKY} />
      <polygon points="370,200 410,70 460,70 530,200" fill={MUTED} fillOpacity="0.55" stroke={N} strokeWidth="2.4" />
      <Wire d="M40 200 L370 200 M530 200 L680 200" stroke={N} width={2.4} />
      <Wire d="M471 90 L672 90" stroke={MUTED} width={1.3} dash="4 4" />
      <Arr x1={664} y1={100} x2={664} y2={170} tone={N} width={1.6} />
      <M x={654} y={138} anchor="end" size={13} fill={N}>h</M>
      <L x={200} y={140} size={12} fill={MUTED} weight={700}>upstream water</L>

      {/* Outer streamlines first (dam base and the outermost ellipse), then the rest */}
      <Wire d="M370 200 L530 200" stroke={BLUE} width={3.2} className="fmm-draw" />
      <Curve pts={streamPts(4 * D)} stroke={BLUE} width={2.6} className="fmm-draw" />
      {[1, 2, 3].map((j) => (
        <Curve key={`xi${j}`} pts={streamPts(j * D)} stroke={BLUE} width={2} className={`fmm-draw fmm-delay-${j + 1}`} />
      ))}
      <g className="fmm-cell-in fmm-delay-5">
        {[1, 2, 3, 4, 5, 6, 7].map((k) => (
          <Curve key={`eta${k}`} pts={equiPts(k * D)} stroke={AMBER} width={1.8} dash="5 4" />
        ))}
      </g>
      <polygon points={cell.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} fill={PURP} fillOpacity="0.25" className="fmm-emerge fmm-delay-6" />
      {[[0.2, Math.PI / 2], [0.2, 0.45], [0.2, Math.PI - 0.45], [3.5 * D, Math.PI / 2]].map(([xi, eta]) => {
        const a = arrow(xi, eta)
        return <Arr key={`sv${xi}-${eta}`} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} tone={RED} width={2} />
      })}
      <L x={596} y={160} size={11.5} fill={RED}>toe: small, fast</L>
      <L x={450} y={420} size={11.5} fill={RED}>deep: large squares, slow</L>

      {/* Inset: a curvilinear square passes the inscribed-circle test */}
      <Wire d={`M${cc[0].toFixed(1)} ${cc[1].toFixed(1)} L690 140`} stroke={PURP} width={1.3} dash="3 4" />
      <g className="fmm-emerge fmm-delay-6">
        <rect x="690" y="30" width="180" height="200" rx="10" fill={WHITE} stroke={PURP} strokeWidth="2" />
        <L x={780} y={50} size={12} fill={PURP}>ONE CELL, MAGNIFIED</L>
        <path d="M725 85 Q780 78 835 85 Q842 140 835 195 Q780 202 725 195 Q718 140 725 85 Z" fill={PURP} fillOpacity="0.1" stroke={BLUE} strokeWidth="2.2" />
        <circle cx="780" cy="140" r="52" fill="none" stroke={GREEN} strokeWidth="2" />
        {[[725, 85, 1, 1], [835, 85, -1, 1], [835, 195, -1, -1], [725, 195, 1, -1]].map(([x, y, sx, sy]) => (
          <Wire key={`rc${x}${y}`} d={`M${x + 10 * sx} ${y} L${x + 10 * sx} ${y + 10 * sy} L${x} ${y + 10 * sy}`} stroke={RED} width={1.8} />
        ))}
        <L x={780} y={220} size={11} fill={GREEN}>circle touches all four sides</L>
      </g>
      <Panel x={690} y={244} w={180} title="SEEPAGE LEDGER" mono rowH={26} className="fmm-cell-in fmm-delay-7"
        rows={[['channels N_f', '4', BLUE], ['drops N_d', '8', AMBER], ['head loss', 'h', N], ['q = k h N_f/N_d', '', PURP], ['', '= k h / 2', PURP]]} />
    </Scene>
  )
}

/** Unit 13 — Hagen–Poiseuille: parabolic u with u_max = 2V̄, linear τ, and Q falling as R⁴. */
export function PoiseuilleParabolaScene() {
  const para = []
  for (let r = -100; r <= 100; r += 5) para.push([150 + 180 * (1 - (r * r) / 10000), 180 + r])
  const arrows = [[90, 0], [-90, 0], [70, 1], [-70, 1], [45, 2], [-45, 2], [20, 3], [-20, 3], [0, 4]]
  return (
    <Scene caption="Laminar pipe flow: velocity is curved, shear stress is straight, discharge goes as R⁴">
      {/* Velocity profile */}
      <rect x="30" y="30" width="410" height="302" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={54} anchor="start" size={13} fill={BLUE}>VELOCITY u(r) · a curve</L>
      <Wire d="M60 80 L420 80 M60 280 L420 280" stroke={N} width={3} />
      <Wire d="M150 80 L150 280" stroke={MUTED} width={1.4} />
      {arrows.map(([r, k]) => (
        <g key={`pa${r}`} className={`fmm-cell-in fmm-delay-${k}`}>
          <Arr x1={150} y1={180 + r} x2={150 + 180 * (1 - (r * r) / 10000)} y2={180 + r} tone={BLUE} width={2} />
        </g>
      ))}
      <Curve pts={para} stroke={BLUE} width={2.8} className="fmm-draw fmm-delay-5" />
      <Arr x1={80} y1={180} x2={80} y2={83} tone={N} width={1.6} />
      <M x={90} y={136} anchor="start" size={12}>R</M>
      <g className="fmm-emerge fmm-delay-6">
        <Wire d="M240 80 L240 280" stroke={AMBER} width={2.2} dash="6 5" />
        <M x={240} y={72} size={12.5} fill={AMBER}>V̄</M>
        <M x={338} y={184} anchor="start" size={12.5} fill={BLUE}>u_max</M>
        <rect x="160" y="296" width="160" height="28" rx="6" fill={WHITE} stroke={AMBER} strokeWidth="2.4" />
        <M x={240} y={315} size={14} fill={AMBER}>u_max = 2 V̄</M>
      </g>

      {/* Shear stress profile */}
      <rect x="460" y="30" width="410" height="302" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={476} y={54} anchor="start" size={13} fill={PURP}>SHEAR STRESS τ(r) · a straight line</L>
      <Wire d="M480 80 L850 80 M480 280 L850 280" stroke={N} width={3} />
      <Wire d="M480 180 L850 180" stroke={MUTED} width={1.2} dash="8 5" />
      <Wire d="M560 80 L560 280" stroke={MUTED} width={1.4} />
      {[95, 70, 45, 20].flatMap((r) => [r, -r]).map((r, i) => (
        <g key={`ta${r}`} className={`fmm-cell-in fmm-delay-${Math.min(7, 4 + (i >> 1))}`}>
          <Arr x1={560} y1={180 + r} x2={560 + 1.2 * Math.abs(r)} y2={180 + r} tone={PURP} width={2} />
        </g>
      ))}
      <Curve pts={[[674, 85], [560, 180], [674, 275]]} stroke={PURP} width={2.8} className="fmm-draw fmm-delay-6" />
      <L x={540} y={172} anchor="end" size={11.5} fill={PURP}>τ = 0</L>
      <M x={686} y={90} anchor="start" size={12.5} fill={PURP}>τ_w</M>
      <M x={765} y={170} size={13} fill={PURP}>τ = (−dp/dx) r / 2</M>
      <L x={765} y={206} size={11.5} fill={MUTED} weight={700}>linear in r</L>

      {/* Q ∝ R⁴ */}
      <rect x="30" y="344" width="840" height="138" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={368} anchor="start" size={13} fill={N}>SAME dp/dx · Q = πR⁴(−dp/dx) / 8μ</L>
      <M x={856} y={368} anchor="end" size={12} fill={AMBER}>0.75⁴ = 0.32 · 0.5⁴ = 0.0625</M>
      <Bars x={200} y={382} w={520} rowH={30} accent={BLUE} max={1}
        items={[['radius R', 1, BLUE], ['0.75 R', 0.32, TEAL], ['0.5 R', 0.0625, AMBER]]} />
    </Scene>
  )
}

/** Unit 14 — Poiseuille plus Couette: the sum bulges, straightens, or reverses near the fixed wall. */
export function CouettePoiseuilleScene() {
  const prof = (y0, f, step = 0.05) => {
    const pts = []
    for (let e = 0; e <= 1.0001; e += step) pts.push([330 + f(e), y0 + 118 - 96 * e])
    return pts
  }
  const chans = [
    { y0: 30, name: '① POISEUILLE', sub: 'plates fixed, dp/dx < 0', tone: AMBER, eq: ['u = (−dp/dx) y(h − y) / 2μ'] },
    { y0: 180, name: '② COUETTE', sub: 'top plate moves, dp/dx = 0', tone: TEAL, eq: ['u = U y / h'] },
    { y0: 330, name: '③ ① + ②', sub: 'add point by point', tone: PURP, eq: ['u = U y / h', '+ (−dp/dx) y(h − y) / 2μ'] },
  ]
  const G = [300, 0, -300]
  const tones = [GREEN, N, RED]
  const rev = prof(330, (e) => 100 * e - 300 * e * (1 - e), 1 / 30).slice(0, 21)
  return (
    <Scene caption="Adding a pressure gradient to Couette flow bulges, straightens, or reverses the profile">
      {chans.map((c, i) => (
        <g key={c.name}>
          <rect x="30" y={c.y0} width="840" height={i === 2 ? 152 : 140} rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
          <L x={46} y={c.y0 + 50} anchor="start" size={14} fill={c.tone}>{c.name}</L>
          <L x={46} y={c.y0 + 72} anchor="start" size={11.5} fill={MUTED} weight={700}>{c.sub}</L>
          <Wire d={`M240 ${c.y0 + 22} L620 ${c.y0 + 22} M240 ${c.y0 + 118} L620 ${c.y0 + 118}`} stroke={N} width={5} />
          {i > 0 ? <Wire d={`M244 ${c.y0 + 22} L616 ${c.y0 + 22}`} stroke={WHITE} width={2} className="fmm-current" /> : null}
          <Wire d={`M330 ${c.y0 + 22} L330 ${c.y0 + 118}`} stroke={MUTED} width={1.4} />
          {c.eq.map((t, k) => (
            <M key={t} x={755} y={c.y0 + (i === 2 ? 34 : 76) + k * 20} size={12} fill={c.tone}>{t}</M>
          ))}
        </g>
      ))}

      {/* ① parabola, built arrow by arrow */}
      {[0.1, 0.3, 0.5, 0.7, 0.9].map((e, k) => (
        <g key={`p${e}`} className={`fmm-cell-in fmm-delay-${k}`}>
          <Arr x1={330} y1={148 - 96 * e} x2={330 + 400 * e * (1 - e)} y2={148 - 96 * e} tone={AMBER} width={1.8} />
        </g>
      ))}
      <Curve pts={prof(30, (e) => 400 * e * (1 - e))} stroke={AMBER} width={2.6} className="fmm-draw fmm-delay-2" />
      <Arr x1={480} y1={100} x2={600} y2={100} tone={AMBER} width={2.6} />
      <M x={540} y={86} size={12} fill={AMBER}>−dp/dx</M>

      {/* ② straight line */}
      {[0.1, 0.3, 0.5, 0.7, 0.9].map((e, k) => (
        <g key={`c${e}`} className={`fmm-cell-in fmm-delay-${k + 2}`}>
          <Arr x1={330} y1={298 - 96 * e} x2={330 + 100 * e} y2={298 - 96 * e} tone={TEAL} width={1.8} />
        </g>
      ))}
      <Curve pts={[[330, 298], [430, 202]]} stroke={TEAL} width={2.6} className="fmm-draw fmm-delay-4" />
      <Arr x1={470} y1={214} x2={560} y2={214} tone={TEAL} width={2.4} />
      <M x={570} y={218} anchor="start" size={12.5} fill={TEAL}>U</M>

      {/* ③ three slider settings, reversal shaded */}
      <polygon points={[...rev, [330, 448 - 96 * (2 / 3)]].map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')} fill={RED} fillOpacity="0.22" className="fmm-emerge fmm-delay-7" />
      {G.map((g, k) => (
        <Curve key={`s${g}`} pts={prof(330, (e) => 100 * e + g * e * (1 - e))} stroke={tones[k]} width={2.6} className={`fmm-draw fmm-delay-${5 + k}`} />
      ))}
      <Arr x1={500} y1={364} x2={580} y2={364} tone={PURP} width={2.2} />
      <M x={590} y={368} anchor="start" size={12.5} fill={PURP}>U</M>
      <L x={292} y={428} anchor="end" size={11.5} fill={RED}>reversed flow</L>

      <Wire d="M670 420 L840 420" stroke={MUTED} width={4} />
      {[680, 755, 830].map((x, k) => (
        <g key={`tk${x}`}>
          <Wire d={`M${x} 412 L${x} 428`} stroke={tones[k]} width={2.4} />
          <M x={x} y={446} size={11} fill={tones[k]}>{['dp/dx<0', '= 0', 'dp/dx>0'][k]}</M>
          <L x={x} y={466} size={11} fill={tones[k]}>{['favourable', 'zero', 'adverse'][k]}</L>
        </g>
      ))}
      <g className="fmm-probe" style={{ '--fmm-probe': '150px' }}>
        <circle cx="680" cy="420" r="8" fill={WHITE} stroke={PURP} strokeWidth="3" />
      </g>
    </Scene>
  )
}

/** Unit 15 — journal film unrolled into a Couette strip (τ → T → P); footstep pad summed ring by ring. */
export function JournalBearingScene() {
  const ring = (cx, cy, ro, ri) =>
    `M${cx + ro} ${cy} A${ro} ${ro} 0 1 0 ${cx - ro} ${cy} A${ro} ${ro} 0 1 0 ${cx + ro} ${cy} Z` +
    (ri > 0 ? ` M${cx + ri} ${cy} A${ri} ${ri} 0 1 0 ${cx - ri} ${cy} A${ri} ${ri} 0 1 0 ${cx + ri} ${cy} Z` : '')
  return (
    <Scene caption="A thin oil film is Couette flow: unroll it to get τ, then torque and power">
      <rect x="30" y="30" width="530" height="452" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={54} anchor="start" size={14}>JOURNAL BEARING</L>
      <circle cx="130" cy="170" r="80" fill={MUTED} fillOpacity="0.5" stroke={N} strokeWidth="2.2" />
      <circle cx="130" cy="170" r="66" fill={AMBER} fillOpacity="0.4" stroke={N} strokeWidth="1.4" />
      <circle cx="130" cy="170" r="54" fill={WHITE} stroke={N} strokeWidth="2.4" />
      <g className="fmm-spin" style={{ transformBox: 'view-box', transformOrigin: '130px 170px' }}>
        <Wire d="M130 170 L130 122" stroke={RED} width={3} />
      </g>
      <Dot cx={130} cy={170} r={4} fill={N} />
      <L x={130} y={272} size={11.5} fill={MUTED} weight={700}>film t, exaggerated</L>

      <Wire d="M206 126 Q226 92 248 104" stroke={AMBER} width={2} dash="5 4" marker="url(#fmArrA)" />
      <L x={385} y={88} size={11.5} fill={AMBER}>film unrolled: length πD, linear profile</L>
      <g className="fmm-slide-in fmm-delay-1">
        <rect x="250" y="100" width="270" height="50" fill={AMBER} fillOpacity="0.28" />
        <Wire d="M250 100 L520 100" stroke={N} width={3.4} />
        <Wire d="M250 150 L520 150" stroke={N} width={3.4} />
        <Wire d="M252 150 L518 150" stroke={WHITE} width={1.6} className="fmm-current" />
      </g>
      <g className="fmm-cell-in fmm-delay-3">
        {[144, 132, 120, 108].map((y) => (
          <Arr key={`cp${y}`} x1={300} y1={y} x2={300 + 64 * (1 - (150 - y) / 50)} y2={y} tone={RED} width={1.8} />
        ))}
        <Wire d="M364 150 L300 100" stroke={RED} width={2.4} />
        <M x={372} y={147} anchor="start" size={12} fill={RED}>U</M>
      </g>
      <Wire d="M250 162 L520 162 M250 156 L250 168 M520 156 L520 168" stroke={MUTED} width={1.4} />
      <M x={385} y={180} size={12} fill={MUTED}>πD</M>
      <Wire d="M530 100 L530 150" stroke={MUTED} width={1.4} />
      <M x={538} y={130} anchor="start" size={12} fill={MUTED}>t</M>

      {[['τ = μU / t', '① U = πDN / 60'], ['F = τ · πDL', '② T = F · D / 2'], ['P = 2πNT / 60', '③ power lost']].map(([lab, sub], i) => (
        <Block key={lab} x={44 + i * 170} y={296} w={160} h={60} label={lab} sub={sub} mono size={13} stroke={i === 2 ? RED : AMBER}
          className={`fmm-cell-in fmm-delay-${4 + i}`} />
      ))}
      {[204, 374].map((x) => <Arr key={`sa${x}`} x1={x} y1={326} x2={x + 9} y2={326} tone={MUTED} width={1.6} />)}
      <g className="fmm-emerge fmm-delay-7">
        <rect x="120" y="384" width="330" height="36" rx="7" fill={WHITE} stroke={RED} strokeWidth="2.4" />
        <M x={285} y={408} size={14} fill={RED}>P = μπ³D³N²L / (3600 t)</M>
        <M x={285} y={452} size={12.5} fill={MUTED}>T = μπ²D³NL / (120 t)</M>
      </g>

      {/* Footstep bearing: speed grows with radius, so sum ring by ring */}
      <rect x="570" y="30" width="300" height="452" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={586} y={54} anchor="start" size={14}>FOOTSTEP BEARING</L>
      <L x={586} y={76} anchor="start" size={11} fill={MUTED} weight={700}>elevation</L>
      <rect x="680" y="84" width="80" height="76" fill={WHITE} stroke={N} strokeWidth="2.4" />
      <Wire d="M666 108 A54 12 0 0 0 774 108" stroke={RED} width={2} marker="url(#fmArrR)" />
      <rect x="680" y="160" width="80" height="10" fill={AMBER} fillOpacity="0.5" />
      <rect x="640" y="170" width="160" height="18" fill={MUTED} fillOpacity="0.6" stroke={N} strokeWidth="1.8" />
      {[10, 20, 30, 40].flatMap((r) => [720 - r, 720 + r]).map((x) => (
        <Wire key={`et${x}`} d={`M${x} 160 L${x} 170`} stroke={N} width={1.2} />
      ))}
      <Wire d="M720 200 L760 200" stroke={MUTED} width={1.4} />
      <M x={740} y={214} size={12} fill={MUTED}>R</M>
      <L x={586} y={232} anchor="start" size={11} fill={MUTED} weight={700}>plan of the pad</L>
      {[25, 50, 75, 100].map((ro, k) => (
        <path key={`rg${ro}`} d={ring(720, 330, ro, ro - 25)} fillRule="evenodd" fill={k % 2 ? AMBER : RED} fillOpacity={0.12 + 0.06 * k}
          stroke={N} strokeWidth="1.2" className={`fmm-cell-in fmm-delay-${3 + k}`} />
      ))}
      {[12.5, 37.5, 62.5, 87.5].map((r, k) => (
        <g key={`rs${r}`} className={`fmm-cell-in fmm-delay-${3 + k}`}>
          <Arr x1={720} y1={330 - r} x2={720 + 0.64 * r + 8} y2={330 - r} tone={RED} width={1.8} />
          <M x={712} y={334 - r} anchor="end" size={11} fill={N}>{`u${k + 1}`}</M>
        </g>
      ))}
      <g className="fmm-slide-in fmm-delay-7">
        <M x={720} y={454} size={12} fill={N}>T = Σ μ(ωr/t)·2πr dr·r</M>
        <M x={720} y={474} size={12} fill={RED}>= πμωR⁴ / 2t</M>
      </g>
    </Scene>
  )
}

/** Unit 16 — same V̄: laminar peaks at 2V̄, turbulent is blunt; roughness matters only once it pierces δ'. */
export function LaminarTurbulentProfileScene() {
  const lam = []
  const tur = []
  for (let r = -90; r <= 90; r += 3) {
    lam.push([70 + 200 * (1 - (r * r) / 8100), 180 + r])
    tur.push([70 + 122 * ((90 - Math.abs(r)) / 90) ** (1 / 7), 180 + r])
  }
  const inset = (y0, title, tone, band, notes) => (
    <g>
      <rect x="450" y={y0} width="420" height="155" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={466} y={y0 + 22} anchor="start" size={13} fill={tone}>{title}</L>
      <rect x="460" y={y0 + 140 - band} width="200" height={band} fill={tone} fillOpacity="0.16" />
      <Wire d={`M460 ${y0 + 140} L660 ${y0 + 140}`} stroke={N} width={3} />
      <g className="fmm-emerge fmm-delay-5">
        <polygon points={`560,${y0 + 140} 580,${y0 + 104} 600,${y0 + 140}`} fill={N} />
      </g>
      {notes.map(([t, c], k) => (
        <L key={t} x={674} y={y0 + 76 + k * 22} anchor="start" size={12} fill={c} weight={k === 2 ? 800 : 700}>{t}</L>
      ))}
    </g>
  )
  return (
    <Scene caption="Turbulent flow is blunt with a thin sublayer, so wall roughness starts to matter">
      <rect x="30" y="30" width="410" height="320" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={54} anchor="start" size={13}>SAME V̄, TWO PROFILES</L>
      <Wire d="M60 90 L430 90 M60 270 L430 270" stroke={N} width={3} />
      <Wire d="M70 90 L70 270" stroke={MUTED} width={1.4} />
      <Curve pts={lam} stroke={BLUE} width={2.8} className="fmm-draw" />
      <Curve pts={tur} stroke={RED} width={2.8} className="fmm-draw" />
      <Wire d="M170 90 L170 270" stroke={AMBER} width={2} dash="6 5" />
      <M x={170} y={82} size={12.5} fill={AMBER}>V̄</M>
      <g className="fmm-emerge fmm-delay-3">
        <M x={278} y={184} anchor="start" size={12.5} fill={BLUE}>2V̄</M>
        <M x={198} y={172} anchor="start" size={12} fill={RED}>≈1.2V̄</M>
      </g>
      <rect x="392" y="250" width="40" height="22" fill="none" stroke={PURP} strokeWidth="1.8" strokeDasharray="4 3" />
      <Wire d="M432 258 L450 240" stroke={PURP} width={1.4} dash="3 3" />
      <Wire d="M60 300 L96 300" stroke={BLUE} width={2.8} />
      <L x={104} y={304} anchor="start" size={12} fill={BLUE}>laminar: parabola, u_max = 2V̄</L>
      <Wire d="M60 326 L96 326" stroke={RED} width={2.8} />
      <L x={104} y={330} anchor="start" size={12} fill={RED}>turbulent: flat core, steep at the wall</L>

      <g className="fmm-cell-in fmm-delay-4">
        {inset(30, 'LAMINAR · wall magnified', BLUE, 96, [['viscous layer ≫ k', N], ['roughness buried', MUTED], ['f = 64 / Re', BLUE]])}
      </g>
      <g className="fmm-cell-in fmm-delay-5">
        {inset(195, 'TURBULENT · wall magnified', RED, 12, [['sublayer δ′ < k', N], ['roughness protrudes', MUTED], ['f = f(Re, ε/D)', RED]])}
        <M x={470} y={318} anchor="start" size={12} fill={RED}>δ′</M>
        {[[500, 282], [630, 268], [540, 246]].map(([x, y]) => (
          <g key={`ed${x}`} className="fmm-spin" style={{ transformBox: 'view-box', transformOrigin: `${x}px ${y}px` }}>
            <Wire d={`M${x + 9} ${y} A9 9 0 1 1 ${x} ${y - 9}`} stroke={RED} width={1.6} />
          </g>
        ))}
      </g>

      {/* Friction consequence */}
      <g className="fmm-cell-in fmm-delay-6">
        <rect x="30" y="362" width="840" height="120" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
        <Axes x={90} y={470} w={440} h={90} yLabel="log f" />
        <L x={538} y={474} anchor="start" size={11.5} fill={MUTED}>log Re</L>
        <Curve pts={[[100, 386], [236, 452]]} stroke={BLUE} className="fmm-draw fmm-delay-6" />
        <Curve pts={[[250, 422], [380, 440], [520, 452]]} stroke={N} width={2.2} />
        <Curve pts={[[250, 416], [360, 428], [440, 432], [520, 432]]} stroke={RED} width={2.2} />
        <Curve pts={[[250, 400], [330, 404], [520, 404]]} stroke={RED} width={2.2} />
        <M x={538} y={456} anchor="start" size={11} fill={N}>smooth</M>
        <M x={538} y={436} anchor="start" size={11} fill={RED}>ε/D 0.001</M>
        <M x={538} y={408} anchor="start" size={11} fill={RED}>ε/D 0.01</M>
        <L x={130} y={452} size={11} fill={BLUE}>64/Re</L>
        <L x={640} y={400} anchor="start" size={12.5} fill={BLUE}>LAMINAR: f = 64 / Re</L>
        <L x={640} y={420} anchor="start" size={11.5} fill={MUTED} weight={700}>roughness has no effect</L>
        <L x={640} y={448} anchor="start" size={12.5} fill={RED}>TURBULENT: f = f(Re, ε/D)</L>
        <L x={640} y={468} anchor="start" size={11.5} fill={MUTED} weight={700}>roughness matters once k &gt; δ′</L>
      </g>
    </Scene>
  )
}


/* ── Module 3 ────────────────────────────────────────────────────────── */

/** Unit 1 — Control volume around a pipe bend: momentum flux in/out, pressure and reaction forces, two axis ledgers. */
export function ControlVolumeMomentumScene() {
  return (
    <Scene caption="Force = ṁΔV, applied one direction at a time with a fixed sign convention">
      {/* Positive direction arrow at top */}
      <Arr x1={60} y1={28} x2={160} y2={28} tone={BLUE} width={3} />
      <L x={170} y={33} anchor="start" size={14} fill={BLUE}>+x direction</L>
      <Arr x1={350} y1={28} x2={350} y2={78} tone={TEAL} width={3} />
      <L x={372} y={56} anchor="start" size={14} fill={TEAL}>+y direction</L>

      {/* Pipe bend with dashed CV boundary */}
      <Wire d="M60 200 L260 200 Q340 200 340 280 L340 420" stroke={N} width={3} />
      <Wire d="M60 240 L220 240 Q300 240 300 320 L300 420" stroke={N} width={3} />
      <Wire d="M40 160 L280 160 Q380 160 380 280 L380 460 L280 460 L280 340 Q280 220 200 220 L40 220 Z"
        stroke={AMBER} width={2.2} dash="8 6" className="fmm-emerge" />

      {/* Inlet velocity + momentum flux */}
      <g className="fmm-cell-in fmm-delay-1">
        <Arr x1={30} y1={220} x2={100} y2={220} tone={BLUE} width={3} />
        <L x={36} y={244} anchor="end" size={13} fill={BLUE}>V₁</L>
        <M x={8} y={266} anchor="start" size={12} fill={BLUE}>ṁV₁ →</M>
      </g>

      {/* Outlet velocity + momentum flux */}
      <g className="fmm-cell-in fmm-delay-2">
        <Arr x1={320} y1={430} x2={320} y2={470} tone={BLUE} width={3} />
        <L x={392} y={450} anchor="start" size={13} fill={BLUE}>V₂</L>
        <M x={392} y={470} anchor="start" size={12} fill={BLUE}>ṁV₂ ↓</M>
      </g>

      {/* Pressure forces */}
      <g className="fmm-cell-in fmm-delay-3">
        <Arr x1={42} y1={200} x2={90} y2={200} tone={GREEN} width={2.5} />
        <L x={36} y={194} anchor="end" size={12} fill={GREEN}>p₁A₁</L>
        <Arr x1={340} y1={460} x2={340} y2={425} tone={GREEN} width={2.5} />
        <L x={392} y={430} anchor="start" size={13} fill={GREEN}>p₂A₂</L>
      </g>

      {/* Reaction force on CV */}
      <g className="fmm-cell-in fmm-delay-4">
        <Arr x1={220} y1={310} x2={170} y2={310} tone={RED} width={3} />
        <L x={224} y={306} anchor="start" size={12} fill={RED}>Rₓ</L>
        <Arr x1={220} y1={350} x2={220} y2={310} tone={RED} width={3} />
        <L x={224} y={352} anchor="start" size={12} fill={RED}>Rᵧ</L>
      </g>

      {/* x-direction ledger */}
      <Card x={480} y={30} w={400} h={190} title="x-DIRECTION LEDGER" accent={BLUE}>
        <g className="fmm-cell-in fmm-delay-5">
          <M x={200} y={58} size={12} fill={N}>ΣFₓ = ṁ(V₂ₓ − V₁ₓ)</M>
          <M x={16} y={82} anchor="start" size={11} fill={GREEN}>+p₁A₁ →</M>
          <M x={16} y={102} anchor="start" size={11} fill={GREEN}>−p₂A₂ₓ (= 0)</M>
          <M x={16} y={122} anchor="start" size={11} fill={RED}>+Rₓ ← (unknown)</M>
          <Wire d="M14 134 L386 134" stroke={MUTED} width={1.2} />
          <M x={16} y={154} anchor="start" size={12} fill={BLUE}>Rₓ = ṁ(0 − V₁) − p₁A₁</M>
        </g>
      </Card>

      {/* y-direction ledger */}
      <Card x={480} y={240} w={400} h={190} title="y-DIRECTION LEDGER" accent={TEAL}>
        <g className="fmm-cell-in fmm-delay-6">
          <M x={200} y={58} size={12} fill={N}>ΣFᵧ = ṁ(V₂ᵧ − V₁ᵧ)</M>
          <M x={16} y={82} anchor="start" size={11} fill={GREEN}>−p₂A₂ ↓</M>
          <M x={16} y={102} anchor="start" size={11} fill={RED}>+Rᵧ ↑ (unknown)</M>
          <M x={16} y={122} anchor="start" size={11} fill={N}>Weight W ↓</M>
          <Wire d="M14 134 L386 134" stroke={MUTED} width={1.2} />
          <M x={16} y={154} anchor="start" size={12} fill={TEAL}>Rᵧ = ṁV₂ + p₂A₂ + W</M>
        </g>
      </Card>

      {/* CV label */}
      <L x={110} y={150} size={13} fill={AMBER} weight={800}>Control Volume</L>
    </Scene>
  )
}

/** Unit 2 — Jet on fixed plate: normal impact (full momentum destroyed) and inclined impact (reduced by sin θ). */
export function JetOnFixedPlateScene() {
  return (
    <Scene caption="A fixed plate feels ṁV normal or ṁV sin θ inclined, and receives zero power">
      {/* Panel 1: Normal impact */}
      <rect x="30" y="24" width="400" height="340" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={50} anchor="start" size={14} fill={BLUE}>NORMAL IMPACT</L>

      {/* Jet issuing from nozzle */}
      <Pipe x={40} y={170} w={100} h1={50} h2={30} />
      <g className="fmm-current">
        <Arr x1={140} y1={170} x2={240} y2={170} tone={BLUE} width={3} />
      </g>
      <L x={170} y={150} size={12} fill={BLUE}>V</L>

      {/* Plate (vertical) */}
      <rect x="250" y="90" width="12" height="160" rx="3" fill={N} />

      {/* Radial spread */}
      <g className="fmm-cell-in fmm-delay-1">
        <Arr x1={262} y1={110} x2={310} y2={80} tone={MUTED} width={1.8} />
        <Arr x1={262} y1={130} x2={330} y2={120} tone={MUTED} width={1.8} />
        <Arr x1={262} y1={210} x2={330} y2={220} tone={MUTED} width={1.8} />
        <Arr x1={262} y1={230} x2={310} y2={260} tone={MUTED} width={1.8} />
      </g>

      {/* Force arrow on plate */}
      <g className="fmm-emerge fmm-delay-2">
        <Arr x1={330} y1={170} x2={275} y2={170} tone={RED} width={3.5} />
        <L x={340} y={164} anchor="start" size={13} fill={RED}>F = ρAV²</L>
        <M x={340} y={182} anchor="start" size={11} fill={RED}>= ṁV</M>
      </g>

      {/* Momentum annotation */}
      <M x={120} y={290} size={12} fill={N}>axial momentum</M>
      <M x={120} y={308} size={12} fill={N}>fully destroyed</M>

      {/* Panel 2: Inclined impact */}
      <rect x="460" y="24" width="420" height="340" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={476} y={50} anchor="start" size={14} fill={AMBER}>INCLINED IMPACT</L>

      {/* Jet */}
      <g className="fmm-current">
        <Arr x1={470} y1={200} x2={610} y2={200} tone={BLUE} width={3} />
      </g>
      <L x={530} y={188} size={12} fill={BLUE}>V</L>

      {/* Inclined plate */}
      <line x1="620" y1="100" x2="680" y2="290" stroke={N} strokeWidth="8" strokeLinecap="round" />

      {/* Two unequal streams */}
      <g className="fmm-cell-in fmm-delay-3">
        <Arr x1={640} y1={140} x2={590} y2={84} tone={MUTED} width={2.5} />
        <Arr x1={660} y1={250} x2={720} y2={310} tone={MUTED} width={1.5} />
        <L x={574} y={78} size={11} fill={MUTED}>larger stream</L>
        <L x={738} y={316} size={11} fill={MUTED}>smaller</L>
      </g>

      {/* Normal and tangential components */}
      <g className="fmm-cell-in fmm-delay-4">
        <Arr x1={610} y1={200} x2={648} y2={180} tone={TEAL} width={2.5} />
        <L x={664} y={176} anchor="start" size={11} fill={TEAL}>Vₙ = V sin θ</L>
        <Arr x1={610} y1={200} x2={636} y2={220} tone={PURP} width={2} />
        <L x={644} y={232} anchor="start" size={11} fill={PURP}>Vₜ</L>
      </g>

      {/* Angle annotation */}
      <Wire d="M638 200 A28 28 0 0 0 624 186" stroke={AMBER} width={2} />
      <L x={660} y={200} anchor="start" size={12} fill={AMBER}>θ</L>

      {/* Force arrow (shorter than normal case) */}
      <g className="fmm-emerge fmm-delay-5">
        <Arr x1={710} y1={180} x2={665} y2={168} tone={RED} width={3} />
        <L x={716} y={168} anchor="start" size={13} fill={RED}>F = ṁV sin θ</L>
        <L x={716} y={186} anchor="start" size={11} fill={RED}>shorter by sin θ</L>
      </g>

      {/* θ label */}
      <M x={630} y={306} size={12} fill={MUTED}>only normal component destroyed</M>

      {/* Power ledger at bottom */}
      <g className="fmm-cell-in fmm-delay-6">
        <rect x="30" y="380" width="850" height="100" rx="12" fill={WHITE} stroke={RED} strokeWidth="2" />
        <L x={56} y={406} anchor="start" size={14} fill={RED}>POWER LEDGER</L>
        <M x={450} y={440} size={16} fill={RED}>P = F × u = F × 0 = 0  (plate does not move)</M>
        <M x={450} y={464} size={12} fill={MUTED}>No displacement → no work done, however large the force</M>
      </g>
    </Scene>
  )
}

/** Unit 3 — Moving plate: relative velocity shortens with speed; force-velocity-power curves with peak at V/3. */
export function MovingPlatePowerCurveScene() {
  /* Three trolley positions with shrinking relative velocity */
  const trolleys = [
    { tx: 90, u: 0, relLen: 80, label: 'u = 0' },
    { tx: 240, u: 'V/3', relLen: 54, label: 'u = V/3' },
    { tx: 390, u: 'V', relLen: 6, label: 'u ≈ V' },
  ]

  /* Power curve: P = ρA(V-u)²·u, normalised. Peak at u=V/3 */
  const pCurve = []
  const fCurve = []
  const uLine = []
  const axX = 520, axY = 430, axW = 340, axH = 220
  for (let i = 0; i <= 40; i++) {
    const t = i / 40 // u/V ratio 0..1
    const x = axX + t * axW
    const force = (1 - t) * (1 - t) // normalised force
    const power = force * t * 4 * (27 / 4) // normalised so peak = 1
    fCurve.push([x, axY - force * axH])
    pCurve.push([x, axY - Math.min(power, 1) * axH])
    uLine.push([x, axY - t * axH * 0.5])
  }

  return (
    <Scene caption="Force falls as the plate speeds up; power peaks at u = V/3">
      {/* Upper half: three trolley positions */}
      <rect x="30" y="20" width="480" height="190" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={44} anchor="start" size={13}>THREE PLATE SPEEDS</L>

      {trolleys.map(({ tx, relLen, label }, i) => (
        <g key={`tr${i}`} className={`fmm-cell-in fmm-delay-${i}`}>
          {/* Nozzle */}
          <Pipe x={n(tx) - 40} y={130} w={40} h1={30} h2={18} />
          {/* Jet arrow */}
          <Arr x1={n(tx)} y1={130} x2={n(tx) + 80} y2={130} tone={BLUE} width={2} />
          {/* Trolley (plate + wheels) */}
          <rect x={n(tx) + 82} y="108" width="10" height="44" rx="2" fill={N} />
          <rect x={n(tx) + 92} y="118" width="28" height="24" rx="4" fill={SKY} stroke={N} strokeWidth="1.6" />
          <circle cx={n(tx) + 98} cy={146} r={4} fill={MUTED} />
          <circle cx={n(tx) + 114} cy={146} r={4} fill={MUTED} />
          {/* Relative velocity arrow */}
          <Arr x1={n(tx) + 42} y1={100} x2={n(tx) + 42 + n(relLen)} y2={100} tone={AMBER} width={2.5} />
          <L x={n(tx) + 42 + n(relLen) / 2} y={90} size={11} fill={AMBER}>V−u</L>
          {/* Speed label */}
          <M x={n(tx) + 60} y={170} size={12} fill={N}>{label}</M>
        </g>
      ))}
      <L x={270} y={196} size={11} fill={MUTED} weight={700}>relative velocity shortens as plate speeds up</L>

      {/* Lower half: plot area */}
      <Axes x={axX} y={axY} w={axW} h={axH} xLabel="plate speed u" yLabel="F, P" />

      {/* Force curve — falling parabola */}
      <Curve pts={fCurve} stroke={RED} width={2.8} className="fmm-draw" />
      <L x={axX + 30} y={axY - n(axH) - 8} anchor="start" size={12} fill={RED}>Force ∝ (V−u)²</L>

      {/* Power curve — peaks at V/3 */}
      <Curve pts={pCurve} stroke={GREEN} width={2.8} className="fmm-draw fmm-delay-2" />

      {/* u line */}
      <Curve pts={uLine} stroke={MUTED} width={1.8} dash="6 4" />
      <L x={axX + n(axW) + 6} y={axY - n(axH) * 0.5 - 4} anchor="start" size={11} fill={MUTED}>u</L>

      {/* Peak marker at V/3 */}
      <g className="fmm-emerge fmm-delay-4">
        <Wire d={`M${axX + axW / 3} ${axY} L${axX + axW / 3} ${axY - axH * 0.9}`}
          stroke={GREEN} width={1.6} dash="4 4" />
        <Dot cx={axX + axW / 3} cy={axY - axH * 0.9} r={5} fill={GREEN} />
        <L x={axX + axW / 3} y={axY + 18} size={12} fill={GREEN}>V/3</L>
        <L x={axX + axW / 3 + 8} y={axY - axH * 0.9 - 14} anchor="start" size={13} fill={GREEN}>P_max</L>
      </g>

      {/* Tick at V */}
      <Wire d={`M${axX + axW} ${axY - 4} L${axX + axW} ${axY + 4}`} stroke={MUTED} width={2} />
      <M x={axX + axW} y={axY + 18} size={12} fill={MUTED}>V</M>

      {/* Efficiency note */}
      <g className="fmm-cell-in fmm-delay-5">
        <Panel x={32} y={230} w={440} title="MAXIMUM EFFICIENCY" accent={GREEN}
          rows={[
            ['Optimum plate speed', 'u = V / 3', GREEN],
            ['Max power', 'P = 4ρAV³/27', GREEN],
            ['P = 0 at u = 0', 'no displacement', MUTED],
            ['P = 0 at u = V', 'no impact', MUTED],
          ]}
        />
      </g>
    </Scene>
  )
}

/** Unit 4 — Curved vane deflection: four vanes of increasing curvature with momentum triangles and polar plot. */
export function CurvedVaneDeflectionForceScene() {
  const vanes = [
    { label: '0° (flat)', angle: 0, factor: 1, cx: 80 },
    { label: '45°', angle: 45, factor: 1.71, cx: 230 },
    { label: '120°', angle: 120, factor: 1.5, cx: 380 },
    { label: '180°', angle: 180, factor: 2, cx: 530 },
  ]
  /* Polar plot: force factor = 1 + cos(π − θ) = 1 − cos θ ... no wait:
     Axial force component = ṁV(1 + cos θ) where θ is deflection, so factor = 1+cos θ ...
     at 0° (flat plate stopping) factor=1? Actually for a flat plate the jet is stopped, factor=1.
     Deflection 0° = no turn, but a flat plate stops axial momentum => 1.
     Actually: for a vane turning through angle θ, Fx = ṁV(1 - cos θ) if θ is measured from inlet direction.
     Wait: the spec says factor doubles at 180°. Let me re-read:
     "A vane that deflects the jet through an angle produces a force whose axial component is the mass flow rate
      multiplied by the jet velocity multiplied by one plus the cosine of the angle..."
     Hmm, the definition says Fx = ṁV(1 + cos θ) where θ = angle of deflection from original.
     At θ=0 (no turn, flat plate stops it): this gives 2 which is wrong for flat plate.
     Actually for a flat plate the jet is simply stopped, not turned. The formula applies to curved vanes.
     For a flat plate, the jet spreads radially so Fx = ṁV (factor = 1).
     For a hemispherical vane θ=180°: Fx = ṁV(1 + cos 180°) = ṁV(1-1) = 0? That's wrong too.
     
     Let me re-read the definition: "one plus the cosine of the angle through which the flow has been turned 
     from its original direction". At 180° reversal: 1 + cos(180°) = 1 + (-1) = 0, but the spec says force 
     doubles at 180°.
     
     The issue is the sign convention. If the jet comes in at velocity V and leaves at angle θ from the 
     original direction, the change in momentum in the axial direction is:
     ΔVx = V - V cos θ = V(1 - cos θ)
     So Fx = ṁV(1 - cos θ)
     At θ=0 (no deflection): Fx = 0 (pass-through, no force)
     At θ=90° (flat plate/90° turn): Fx = ṁV (factor = 1)
     At θ=180° (reversal): Fx = 2ṁV (factor = 2). ✓
     
     The "flat plate" in the spec stops the jet (all axial momentum destroyed = factor 1), 
     which corresponds to θ=90° in this formula. Good.
  */
  const polarR = 80
  const polarCx = 760
  const polarCy = 260
  const polarPts = []
  for (let deg = 0; deg <= 180; deg += 3) {
    const rad = (deg * Math.PI) / 180
    const f = 1 - Math.cos(rad) // 0 at 0°, 1 at 90°, 2 at 180°
    const r = (f / 2) * polarR
    polarPts.push([polarCx + r * Math.cos(-rad / 2 + Math.PI / 2), polarCy - r * Math.sin(-rad / 2 + Math.PI / 2)])
  }
  // Simpler: just plot factor vs angle in a rectangular inset
  const plotX = 660, plotY = 460, plotW = 210, plotH = 160
  const factorPts = []
  for (let deg = 0; deg <= 180; deg += 3) {
    const rad = (deg * Math.PI) / 180
    const f = 1 - Math.cos(rad)
    factorPts.push([plotX + (deg / 180) * plotW, plotY - (f / 2) * plotH])
  }

  return (
    <Scene caption="Turning the jet through 180° doubles the force: momentum is a vector">
      {/* Four vanes in a row */}
      {vanes.map(({ label, angle, factor, cx }, i) => {
        const vy = 220
        const jetLen = 70
        // Compute exit direction
        const exitRad = (angle * Math.PI) / 180
        const exitDx = Math.cos(exitRad) * 50
        const exitDy = -Math.sin(exitRad) * 50
        return (
          <g key={label} className={`fmm-cell-in fmm-delay-${i}`}>
            {/* Vane outline */}
            <rect x={n(cx) - 10} y={vy - 80} width="130" height="180" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="1.4" />
            <L x={n(cx) + 55} y={vy - 64} size={12} fill={N}>{label}</L>

            {/* Incoming jet */}
            <Arr x1={n(cx)} y1={vy} x2={n(cx) + n(jetLen)} y2={vy} tone={BLUE} width={2.5} />

            {/* Vane surface (arc) */}
            {angle === 0 ? (
              <rect x={n(cx) + n(jetLen) + 4} y={vy - 30} width="8" height="60" rx="2" fill={N} />
            ) : (
              <path
                d={`M${n(cx) + n(jetLen) + 10} ${vy} A${30} ${30} 0 ${angle > 180 ? 1 : 0} 0 ${n(cx) + n(jetLen) + 10 + 30 * Math.sin(exitRad)} ${vy - 30 * (1 - Math.cos(exitRad))}`}
                fill="none" stroke={N} strokeWidth="4" strokeLinecap="round"
              />
            )}

            {/* Exit flow arrow */}
            {angle > 0 && (
              <Arr x1={n(cx) + n(jetLen) + 10} y1={vy} x2={n(cx) + n(jetLen) + 10 + n(exitDx)} y2={vy + n(exitDy)} tone={TEAL} width={2} />
            )}

            {/* Momentum change vector (closing vector) — force arrow */}
            <g className={`fmm-emerge fmm-delay-${i + 2}`}>
              <Arr x1={n(cx) + 20} y1={vy + 46} x2={n(cx) + 20 + factor * 26} y2={vy + 46} tone={RED} width={3} />
              <M x={n(cx) + 20 + factor * 13} y={vy + 70} size={11} fill={RED}>{`${factor.toFixed(factor === 2 || factor === 1 ? 0 : 2)}×`}</M>
            </g>
          </g>
        )
      })}

      {/* Labels */}
      <L x={310} y={24} size={15}>INCREASING VANE CURVATURE →</L>

      {/* Force factor vs deflection plot */}
      <g className="fmm-cell-in fmm-delay-5">
        <rect x={plotX - 20} y={plotY - plotH - 30} width={plotW + 50} height={plotH + 60} rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
        <L x={plotX + plotW / 2} y={plotY - plotH - 14} size={12} fill={N}>FORCE FACTOR</L>
        <Axes x={plotX} y={plotY} w={plotW} h={plotH} xLabel="θ (deg)" yLabel="F / ṁV"
          tickLabels={[[plotX + plotW / 2, '90°'], [plotX + plotW, '180°']]}
          yTicks={[[plotY - plotH / 2, '1'], [plotY - plotH, '2']]} />
        <Curve pts={factorPts} stroke={RED} width={2.8} className="fmm-draw fmm-delay-6" />
        <g className="fmm-emerge fmm-delay-7">
          <Dot cx={plotX + plotW} cy={plotY - plotH} r={5} fill={RED} />
          <L x={plotX + plotW - 14} y={plotY - plotH - 12} size={12} fill={RED} anchor="end">2× at 180°</L>
        </g>
      </g>
    </Scene>
  )
}

/** Unit 5 — Moving curved vane: inlet/outlet velocity triangles, whirl projections, work = u·ΔVw, efficiency peak at u = V/2. */
export function VelocityTrianglesMovingVaneScene() {
  /* Velocity triangle geometry (simplified) */
  const uBlade = 100 // blade velocity horizontal
  const vAbs = 180 // absolute velocity magnitude at inlet
  const alpha1 = 20 // inlet angle (deg from blade direction)
  const a1 = (alpha1 * Math.PI) / 180

  return (
    <Scene caption="Subtract u at inlet, turn the relative velocity, add u at outlet; work = u × ΔVw">
      {/* Vane profile travelling right */}
      <rect x="310" y="128" width="280" height="100" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="1.4" />
      <L x={450} y={150} size={13} fill={N}>CURVED VANE (moving →)</L>
      <path d="M340 200 Q400 160 460 180 Q520 200 560 168" fill="none" stroke={N} strokeWidth="4" strokeLinecap="round" />
      <Arr x1={340} y1={218} x2={400} y2={218} tone={AMBER} width={2.5} />
      <L x={370} y={236} size={12} fill={AMBER}>u (blade)</L>

      {/* Inlet velocity triangle (left) */}
      <g className="fmm-cell-in fmm-delay-0">
        <rect x="30" y="20" width="260" height="210" rx="10" fill={WHITE} stroke={BLUE} strokeWidth="1.8" />
        <L x={160} y={42} size={13} fill={BLUE}>INLET TRIANGLE</L>
        {/* V1 absolute */}
        <Arr x1={60} y1={190} x2={230} y2={80} tone={BLUE} width={3} />
        <L x={120} y={116} size={12} fill={BLUE}>V₁ (abs)</L>
        {/* u blade velocity */}
        <Arr x1={60} y1={190} x2={160} y2={190} tone={AMBER} width={2.5} />
        <L x={110} y={210} size={11} fill={AMBER}>u</L>
        {/* Vr1 relative (closing the triangle) */}
        <Arr x1={160} y1={190} x2={230} y2={80} tone={TEAL} width={2.5} />
        <L x={210} y={146} anchor="start" size={12} fill={TEAL}>Vr₁</L>
        {/* Whirl component projection */}
        <Wire d="M230 80 L230 190" stroke={PURP} width={1.6} dash="5 4" />
        <L x={244} y={140} anchor="start" size={11} fill={PURP}>Vw₁</L>
      </g>

      {/* Outlet velocity triangle (right) */}
      <g className="fmm-cell-in fmm-delay-2">
        <rect x="610" y="20" width="270" height="210" rx="10" fill={WHITE} stroke={TEAL} strokeWidth="1.8" />
        <L x={745} y={42} size={13} fill={TEAL}>OUTLET TRIANGLE</L>
        {/* Vr2 same magnitude, different direction */}
        <Arr x1={780} y1={190} x2={680} y2={80} tone={TEAL} width={2.5} />
        <L x={710} y={118} size={12} fill={TEAL}>Vr₂ = Vr₁</L>
        {/* u blade velocity */}
        <Arr x1={680} y1={190} x2={780} y2={190} tone={AMBER} width={2.5} />
        <L x={730} y={210} size={11} fill={AMBER}>u</L>
        {/* V2 absolute (closing) */}
        <Arr x1={680} y1={80} x2={780} y2={190} tone={BLUE} width={2.5} dash="6 4" />
        <L x={744} y={124} anchor="start" size={11} fill={BLUE}>V₂</L>
        {/* Whirl component */}
        <Wire d="M680 80 L680 190" stroke={PURP} width={1.6} dash="5 4" />
        <L x={666} y={140} anchor="end" size={11} fill={PURP}>Vw₂</L>
      </g>

      {/* Arrow showing Vr preserved across vane */}
      <g className="fmm-emerge fmm-delay-3">
        <Wire d="M290 130 Q450 90 600 130" stroke={TEAL} width={2} dash="6 5" />
        <L x={450} y={100} size={12} fill={TEAL}>|Vr| preserved</L>
      </g>

      {/* Work ledger */}
      <g className="fmm-cell-in fmm-delay-4">
        <Panel x={30} y={256} w={440} title="WORK PER UNIT MASS" accent={GREEN}
          rows={[
            ['W/m = u(Vw₁ − Vw₂)', '', GREEN],
            ['= u × ΔVw', '(Euler turbine eqn)', BLUE],
            ['Power', 'P = ṁ·u·ΔVw', N],
          ]}
        />
      </g>

      {/* Efficiency curve */}
      <g className="fmm-cell-in fmm-delay-5">
        <rect x="510" y="256" width="370" height="220" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
        <L x={695} y={278} size={13} fill={N}>EFFICIENCY vs SPEED RATIO</L>
        <Axes x={540} y={450} w={280} h={150} xLabel="u / V" yLabel="η" 
          tickLabels={[[540 + 140, '0.5'], [540 + 280, '1.0']]}
          yTicks={[[450 - 150, '1.0']]} />
        {(() => {
          const pts = []
          for (let i = 0; i <= 40; i++) {
            const r = i / 40
            const eta = 4 * r * (1 - r) // simplified parabola peaking at 0.5
            pts.push([540 + r * 280, 450 - eta * 150])
          }
          return <Curve pts={pts} stroke={GREEN} width={2.8} className="fmm-draw fmm-delay-6" />
        })()}
        <g className="fmm-emerge fmm-delay-7">
          <Wire d={`M${540 + 140} ${450} L${540 + 140} ${450 - 150}`} stroke={GREEN} width={1.6} dash="4 4" />
          <Dot cx={540 + 140} cy={450 - 150} r={5} fill={GREEN} />
          <L x={540 + 148} y={450 - 150 - 12} anchor="start" size={12} fill={GREEN}>η_max at u = V/2</L>
        </g>
      </g>
    </Scene>
  )
}

/** Unit 6 — Euler equation: cylindrical element along curved streamline, pressure/weight/acceleration balance, derivation strip. */
export function EulerElementForceBalanceScene() {
  /* Curved streamline */
  const slPts = []
  for (let i = 0; i <= 60; i++) {
    const t = i / 60
    slPts.push([60 + t * 420, 360 - 140 * Math.sin(t * Math.PI * 0.85)])
  }
  return (
    <Scene caption="Euler is Newton's 2nd law along a streamline with friction left out">
      {/* Streamline */}
      <Curve pts={slPts} stroke={BLUE} width={2.5} className="fmm-draw" />
      <L x={60} y={380} anchor="start" size={12} fill={BLUE}>streamline</L>
      <Arr x1={350} y1={242} x2={410} y2={258} tone={BLUE} width={2} />
      <L x={418} y={254} anchor="start" size={12} fill={BLUE}>s direction</L>

      {/* Fluid element on the streamline */}
      <g className="fmm-cell-in fmm-delay-1">
        <rect x="180" y="232" width="80" height="40" rx="6" fill={SKY} stroke={N} strokeWidth="2.2"
          transform="rotate(-18 220 252)" />
        <L x={220} y={258} size={11} fill={N}>δm</L>
      </g>

      {/* Pressure on upstream face (larger) */}
      <g className="fmm-cell-in fmm-delay-2">
        <Arr x1={162} y1={248} x2={192} y2={244} tone={GREEN} width={3} />
        <L x={140} y={240} anchor="end" size={12} fill={GREEN}>pA</L>
      </g>

      {/* Pressure on downstream face (smaller) */}
      <g className="fmm-cell-in fmm-delay-2">
        <Arr x1={280} y1={244} x2={258} y2={248} tone={GREEN} width={2.2} />
        <L x={288} y={238} anchor="start" size={12} fill={GREEN}>(p+dp)A</L>
      </g>

      {/* Weight component along streamline */}
      <g className="fmm-cell-in fmm-delay-3">
        <Arr x1={220} y1={274} x2={220} y2={320} tone={RED} width={2.5} />
        <L x={234} y={310} anchor="start" size={12} fill={RED}>W = ρgAds</L>
        {/* Resolved component */}
        <Arr x1={220} y1={274} x2={240} y2={294} tone={AMBER} width={2} dash="5 4" />
        <L x={248} y={288} anchor="start" size={11} fill={AMBER}>W sin θ</L>
      </g>

      {/* θ angle mark */}
      <Wire d="M220 296 A22 22 0 0 1 232 286" stroke={AMBER} width={1.6} />
      <L x={214} y={296} anchor="end" size={11} fill={AMBER}>θ</L>

      {/* Acceleration arrow */}
      <g className="fmm-emerge fmm-delay-4">
        <Arr x1={220} y1={224} x2={260} y2={216} tone={PURP} width={3} />
        <L x={226} y={210} size={12} fill={PURP}>a_s = DV/Dt</L>
        <L x={226} y={196} size={11} fill={MUTED}>= ∂V/∂t + V∂V/∂s</L>
      </g>

      {/* Datum line */}
      <Wire d="M40 420 L500 420" stroke={MUTED} width={1.4} dash="8 5" />
      <L x={504} y={424} anchor="start" size={11} fill={MUTED}>datum z = 0</L>

      {/* Height dimension */}
      <Wire d="M200 420 L200 252" stroke={MUTED} width={1.2} dash="4 4" />
      <L x={190} y={340} anchor="end" size={11} fill={MUTED}>z</L>

      {/* Derivation strip */}
      <g className="fmm-cell-in fmm-delay-5">
        <Card x={510} y={24} w={370} h={330} title="EULER EQUATION DERIVATION" accent={BLUE}>
          <M x={185} y={58} size={12} fill={N}>ΣF_s = ma_s along streamline</M>
          <Wire d="M14 70 L356 70" stroke={MUTED} width={1} />
          <M x={16} y={92} anchor="start" size={11.5} fill={GREEN}>pA − (p+dp)A</M>
          <M x={16} y={112} anchor="start" size={11.5} fill={RED}>− ρgA ds sin θ</M>
          <M x={16} y={132} anchor="start" size={11.5} fill={N}>sin θ = dz/ds</M>
          <M x={16} y={152} anchor="start" size={11.5} fill={PURP}>= ρA ds · (V ∂V/∂s)</M>
          <Wire d="M14 166 L356 166" stroke={MUTED} width={1} />
          <M x={185} y={190} size={14} fill={BLUE}>−dp/ρ − g dz = V dV</M>
          <L x={185} y={214} size={12} fill={BLUE}>Euler equation (differential)</L>
          <Wire d="M14 228 L356 228" stroke={MUTED} width={1} />
          <M x={185} y={250} size={12} fill={N}>Integrate along streamline:</M>
          <M x={185} y={272} size={14} fill={TEAL}>p/ρg + V²/2g + z = const</M>
          <L x={185} y={296} size={12} fill={TEAL}>→ Bernoulli equation</L>
        </Card>
      </g>

      {/* Caution flag */}
      <g className="fmm-emerge fmm-delay-7">
        <rect x="510" y="370" width="370" height="110" rx="10" fill={WHITE} stroke={RED} strokeWidth="2" />
        <L x={526} y={394} anchor="start" size={13} fill={RED}>⚠ VISCOUS TERMS OMITTED</L>
        <L x={526} y={416} anchor="start" size={11.5} fill={N} weight={700}>Valid outside boundary layers only</L>
        <L x={526} y={438} anchor="start" size={11.5} fill={MUTED} weight={700}>Near walls: friction dominates → use</L>
        <L x={526} y={456} anchor="start" size={11.5} fill={MUTED} weight={700}>Navier-Stokes instead of Euler</L>
      </g>
    </Scene>
  )
}

/** Unit 7 — Bernoulli three heads at four stations along a varying pipe; assumption checklist. */
export function BernoulliThreeHeadsScene() {
  /* Four stations along a varying pipe that rises and narrows */
  const stations = [
    { x: 80, pipeH: 60, elev: 0, pH: 100, vH: 20, eH: 10 },
    { x: 240, pipeH: 45, elev: 20, pH: 72, vH: 38, eH: 20 },
    { x: 440, pipeH: 30, elev: 60, pH: 30, vH: 70, eH: 30 },
    { x: 620, pipeH: 25, elev: 40, pH: 58, vH: 42, eH: 30 },
  ]
  const baseY = 380 // bottom of stacked bars
  const scale = 1.5 // scale for bar heights

  return (
    <Scene caption="Bernoulli: p/ρg + V²/2g + z = const along one streamline; check five assumptions first">
      {/* Pipe outline (varying, rising) */}
      <Wire d="M40 340 Q140 340 200 310 Q340 250 440 230 Q560 210 660 240 Q740 260 860 260"
        stroke={N} width={3} />
      <Wire d="M40 370 Q140 370 200 355 Q340 330 440 320 Q560 308 660 330 Q740 345 860 345"
        stroke={N} width={3} />
      <polygon points="40,340 860,260 860,345 40,370" fill={SKY} fillOpacity="0.4" />

      {/* Flow arrows */}
      <g className="fmm-current">
        <Wire d="M80 355 L180 340" stroke={BLUE} width={2} dash="9 9" />
        <Wire d="M280 318 L400 300" stroke={BLUE} width={2} dash="9 9" />
        <Wire d="M520 290 L620 305" stroke={BLUE} width={2} dash="9 9" />
      </g>

      {/* Stacked bars at each station */}
      {stations.map(({ x, pH, vH, eH }, i) => {
        const totalH = pH + vH + eH
        const barBottom = baseY
        return (
          <g key={`st${i}`} className={`fmm-cell-in fmm-delay-${i}`}>
            {/* Elevation head */}
            <rect x={n(x)} y={barBottom - n(eH) * n(scale)} width="40" height={n(eH) * n(scale)} fill={GREEN} fillOpacity="0.6" />
            {/* Velocity head */}
            <rect x={n(x)} y={barBottom - (n(eH) + n(vH)) * n(scale)} width="40" height={n(vH) * n(scale)} fill={BLUE} fillOpacity="0.6" />
            {/* Pressure head */}
            <rect x={n(x)} y={barBottom - n(totalH) * n(scale)} width="40" height={n(pH) * n(scale)} fill={AMBER} fillOpacity="0.6" />
            {/* Station label */}
            <M x={n(x) + 20} y={barBottom + 16} size={11} fill={N}>{`Stn ${i + 1}`}</M>
          </g>
        )
      })}

      {/* Total energy line */}
      <g className="fmm-emerge fmm-delay-4">
        <Wire d={`M${80} ${baseY - 130 * scale} L${660} ${baseY - 130 * scale}`}
          stroke={RED} width={2.5} />
        <L x={670} y={baseY - 130 * scale - 6} anchor="start" size={12} fill={RED}>Total Energy Line</L>
        <L x={670} y={baseY - 130 * scale + 10} anchor="start" size={11} fill={RED}>(constant)</L>
      </g>

      {/* Legend */}
      <rect x="40" y="16" width="260" height="90" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="1.4" />
      <rect x="56" y="30" width="16" height="12" fill={AMBER} fillOpacity="0.6" />
      <L x={80} y={41} anchor="start" size={11} fill={AMBER}>p/ρg  pressure head</L>
      <rect x="56" y="50" width="16" height="12" fill={BLUE} fillOpacity="0.6" />
      <L x={80} y={61} anchor="start" size={11} fill={BLUE}>V²/2g  velocity head</L>
      <rect x="56" y="70" width="16" height="12" fill={GREEN} fillOpacity="0.6" />
      <L x={80} y={81} anchor="start" size={11} fill={GREEN}>z  elevation head</L>

      {/* Assumption checklist */}
      <g className="fmm-cell-in fmm-delay-5">
        <Card x={540} y={16} w={340} h={188} title="FIVE ASSUMPTIONS" accent={TEAL}>
          {['① Steady flow', '② Incompressible fluid', '③ Frictionless (inviscid)',
            '④ Along one streamline', '⑤ No machine (pump/turbine)'].map((txt, i) => (
            <g key={txt}>
              <L x={16} y={56 + i * 28} anchor="start" size={12} fill={N} weight={700}>{txt}</L>
              <L x={320} y={56 + i * 28} anchor="end" size={14} fill={GREEN}>✓</L>
            </g>
          ))}
        </Card>
      </g>

      {/* Shadow: violated assumption */}
      <g className="fmm-emerge fmm-delay-7">
        <rect x="540" y="214" width="340" height="64" rx="8" fill={WHITE} stroke={RED} strokeWidth="2" />
        <L x={556} y={236} anchor="start" size={12} fill={RED}>Any assumption violated?</L>
        <L x={556} y={258} anchor="start" size={11} fill={N} weight={700}>→ TEL slopes down (energy lost)</L>
      </g>

      {/* Annotation: segments trade */}
      <L x={360} y={416} size={12} fill={MUTED} weight={700}>As pipe narrows: V↑, p↓ · As pipe rises: z↑, p↓</L>
    </Scene>
  )
}

/** Unit 8 — Venturimeter: converging cone, throat, diverging cone; pressure trace beneath; abrupt expansion ghost overlay. */
export function VenturiProfilePressureScene() {
  /* Pressure trace points */
  const prPts = []
  const ghostPts = []
  for (let i = 0; i <= 60; i++) {
    const t = i / 60
    const x = 60 + t * 780
    let p
    if (t < 0.3) { // convergence — pressure drops
      p = 100 - (t / 0.3) * 70
    } else if (t < 0.4) { // throat — minimum
      p = 30
    } else { // divergence — gradual recovery
      const tr = (t - 0.4) / 0.6
      p = 30 + tr * 64 // recovers to ~94 (small permanent loss)
    }
    prPts.push([x, 400 - p * 1.5])

    // Ghost: abrupt expansion
    let pg
    if (t < 0.4) {
      pg = p // same convergence
    } else {
      const tr = (t - 0.4) / 0.6
      pg = 30 + tr * 30 // recovers much less
    }
    ghostPts.push([x, 400 - pg * 1.5])
  }

  return (
    <Scene caption="A venturi trades p for V at the throat and recovers most of it in the diffuser">
      {/* Venturimeter cross-section */}
      <Wire d="M60 80 L240 110 L340 130 L360 130 L560 110 L840 84" stroke={N} width={3} />
      <Wire d="M60 170 L240 140 L340 120 L360 120 L560 140 L840 166" stroke={N} width={3} />
      <polygon points="60,80 240,110 340,130 360,130 560,110 840,84 840,166 560,140 360,120 340,120 240,140 60,170"
        fill={SKY} fillOpacity="0.5" />

      {/* Labels on geometry */}
      <L x={150} y={76} size={12} fill={N}>converging cone</L>
      <L x={350} y={106} size={12} fill={RED}>throat</L>
      <L x={620} y={76} size={12} fill={N}>diverging cone (long)</L>

      {/* Flow velocity arrows — shorter at inlet/outlet, longer at throat */}
      <g className="fmm-current">
        <Wire d="M100 125 L180 125" stroke={BLUE} width={2} dash="9 9" />
      </g>
      <g className="fmm-current">
        <Wire d="M310 125 L390 125" stroke={BLUE} width={3} dash="9 9" />
      </g>
      <g className="fmm-current">
        <Wire d="M680 125 L760 125" stroke={BLUE} width={2} dash="9 9" />
      </g>

      {/* Differential manometer */}
      <g className="fmm-cell-in fmm-delay-1">
        <Wire d="M150 170 L150 200 L120 200 L120 240" stroke={MUTED} width={2} />
        <Wire d="M350 150 L350 200 L380 200 L380 240" stroke={MUTED} width={2} />
        <rect x="100" y="240" width="300" height="30" rx="6" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
        <rect x="100" y="250" width="40" height="20" rx="4" fill={AMBER} fillOpacity="0.6" />
        <rect x="360" y="256" width="40" height="14" rx="4" fill={AMBER} fillOpacity="0.6" />
        <L x={250} y={262} size={11} fill={MUTED}>differential manometer</L>
      </g>

      {/* Pressure trace beneath, aligned with geometry */}
      <Axes x={60} y={400} w={780} h={100} xLabel="distance along meter" yLabel="p" />
      <Curve pts={prPts} stroke={BLUE} width={2.8} className="fmm-draw fmm-delay-2" />

      {/* Minimum at throat */}
      <g className="fmm-emerge fmm-delay-3">
        <Wire d="M350 280 L350 400" stroke={RED} width={1.4} dash="4 4" />
        <L x={356} y={356} anchor="start" size={11} fill={RED}>p_min at throat</L>
      </g>

      {/* Permanent loss dimensioned */}
      <g className="fmm-emerge fmm-delay-4">
        <Wire d={`M840 ${400 - 100 * 1.5} L840 ${400 - 94 * 1.5}`} stroke={MUTED} width={1.4} />
        <Arr x1={860} y1={400 - 100 * 1.5} x2={860} y2={400 - 94 * 1.5} tone={MUTED} width={1.5} />
        <L x={864} y={400 - 97 * 1.5} anchor="start" size={10} fill={MUTED}>small loss</L>
        <L x={864} y={400 - 97 * 1.5 + 14} anchor="start" size={10} fill={MUTED}>(2-4%)</L>
      </g>

      {/* Ghost overlay: abrupt expansion */}
      <g className="fmm-emerge fmm-delay-5">
        <Curve pts={ghostPts} stroke={RED} width={2} dash="6 5" opacity="0.55" />
        <L x={620} y={392} size={11} fill={RED}>abrupt expansion (much more loss)</L>
      </g>

      {/* Cd note */}
      <g className="fmm-cell-in fmm-delay-6">
        <rect x="60" y="430" width="340" height="50" rx="8" fill={WHITE} stroke={TEAL} strokeWidth="1.8" />
        <M x={230} y={452} size={13} fill={TEAL}>Cd ≈ 0.98 (most accurate meter)</M>
        <M x={230} y={470} size={11} fill={MUTED}>Q_actual = Cd × Q_ideal</M>
      </g>
    </Scene>
  )
}

/** Unit 9 — Orifice plate: jet contracts past plate to vena contracta, turbulent expansion, pressure trace, comparison table. */
export function OrificeVenaContractaScene() {
  /* Pressure trace */
  const prPts = []
  for (let i = 0; i <= 60; i++) {
    const t = i / 60
    const x = 40 + t * 480
    let p
    if (t < 0.35) p = 90 - (t / 0.35) * 70
    else if (t < 0.45) p = 20 // vena contracta minimum
    else p = 20 + ((t - 0.45) / 0.55) * 28 // partial recovery
    prPts.push([x, 420 - p * 1.5])
  }

  return (
    <Scene caption="An orifice plate measures cheaply and loses six times as much pressure as a venturi">
      {/* Pipe with orifice plate */}
      <Wire d="M40 100 L520 100" stroke={N} width={3} />
      <Wire d="M40 180 L520 180" stroke={N} width={3} />
      <polygon points="40,100 520,100 520,180 40,180" fill={SKY} fillOpacity="0.3" />

      {/* Orifice plate (clamped between flanges) */}
      <rect x="176" y="88" width="8" height="92" rx="1" fill={N} />
      <rect x="160" y="88" width="10" height="92" rx="2" fill={MUTED} /> {/* flange left */}
      <rect x="190" y="88" width="10" height="92" rx="2" fill={MUTED} /> {/* flange right */}
      {/* Opening in plate */}
      <rect x="176" y="120" width="8" height="40" fill={SKY} />

      {/* Jet issuing and contracting to vena contracta */}
      <g className="fmm-cell-in fmm-delay-1">
        <polygon points="184,120 184,160 280,148 280,132" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="1.8" />
        {/* VC mark */}
        <Wire d="M280 128 L280 152" stroke={RED} width={2.5} />
        <L x={286} y={128} anchor="start" size={11} fill={RED}>vena contracta</L>
        {/* Dimensions */}
        <Wire d="M184 170 L280 170 M184 166 L184 174 M280 166 L280 174" stroke={MUTED} width={1.2} />
        <M x={232} y={186} size={10} fill={MUTED}>≈ 0.5d downstream</M>
      </g>

      {/* Turbulent expansion with eddies */}
      <g className="fmm-cell-in fmm-delay-2">
        {[[320, 112], [360, 168], [410, 118], [440, 158]].map(([ex, ey]) => (
          <g key={`ed${ex}${ey}`} className="fmm-spin" style={{ transformBox: 'view-box', transformOrigin: `${ex}px ${ey}px` }}>
            <Wire d={`M${n(ex) + 10} ${ey} A10 10 0 1 1 ${ex} ${n(ey) - 10}`} stroke={AMBER} width={1.6} />
          </g>
        ))}
      </g>

      {/* Pressure trace below */}
      <Axes x={40} y={420} w={480} h={100} xLabel="distance" yLabel="p" />
      <Curve pts={prPts} stroke={BLUE} width={2.8} className="fmm-draw fmm-delay-3" />

      {/* Minimum at VC, not at plate */}
      <g className="fmm-emerge fmm-delay-4">
        <Wire d="M280 192 L280 420" stroke={RED} width={1.4} dash="4 4" />
        <L x={288} y={340} anchor="start" size={10} fill={RED}>min here (at VC)</L>
        <Wire d="M180 192 L180 370" stroke={MUTED} width={1.2} dash="4 4" />
        <L x={146} y={350} anchor="end" size={10} fill={MUTED}>plate</L>
      </g>

      {/* Large permanent loss dimensioned */}
      <g className="fmm-emerge fmm-delay-5">
        <Arr x1={500} y1={420 - 90 * 1.5} x2={500} y2={420 - 48 * 1.5} tone={RED} width={2} />
        <L x={508} y={420 - 68 * 1.5} anchor="start" size={10} fill={RED}>~60% lost</L>
      </g>

      {/* Comparison table */}
      <g className="fmm-cell-in fmm-delay-5">
        <Card x={545} y={24} w={340} h={280} title="ORIFICE vs VENTURI" accent={AMBER}>
          {/* Header row */}
          <M x={120} y={54} size={11} fill={MUTED}>ORIFICE</M>
          <M x={270} y={54} size={11} fill={MUTED}>VENTURI</M>
          <Wire d="M14 64 L326 64" stroke={MUTED} width={1} />
          {/* Rows */}
          {[
            ['Cd', '0.62', '0.98'],
            ['Loss', '~60%', '~4%'],
            ['Cost', 'Very low', 'High'],
            ['Length', 'Nil', 'Long'],
            ['Accuracy', 'Moderate', 'Best'],
          ].map(([param, orif, vent], i) => (
            <g key={param}>
              <M x={16} y={88 + i * 34} anchor="start" size={11.5} fill={N}>{param}</M>
              <M x={120} y={88 + i * 34} size={12} fill={RED}>{orif}</M>
              <M x={270} y={88 + i * 34} size={12} fill={GREEN}>{vent}</M>
            </g>
          ))}
        </Card>
      </g>

      {/* Trade-off note */}
      <g className="fmm-cell-in fmm-delay-7">
        <rect x="545" y="320" width="340" height="60" rx="8" fill={WHITE} stroke={AMBER} strokeWidth="2" />
        <L x={715} y={346} size={13} fill={AMBER}>Trade-off: cheapness vs accuracy</L>
        <L x={715} y={368} size={11} fill={MUTED} weight={700}>Orifice is the workhorse of industry</L>
      </g>
    </Scene>
  )
}

/** Unit 10 — Pitot-static tube: stagnation streamline to nose, static holes, head bar conversion, velocity traverse. */
export function PitotStaticTubeScene() {
  /* Velocity profile points for traverse */
  const profilePts = []
  for (let r = -80; r <= 80; r += 4) {
    const speed = 90 * (1 - (r * r) / 6400) ** (1 / 7)
    profilePts.push([660 + speed, 360 + r])
  }
  return (
    <Scene caption="Stopping the flow converts velocity head into measurable pressure rise">
      {/* Flow lines */}
      {[-40, -20, 0, 20, 40].map((dy) => (
        <g key={`fl${dy}`} className="fmm-current">
          <Wire d={`M30 ${200 + dy} L${dy === 0 ? 200 : 420} ${200 + dy}`}
            stroke={dy === 0 ? BLUE : MUTED} width={dy === 0 ? 2.6 : 1.4} dash="9 9" />
        </g>
      ))}
      <L x={36} y={148} anchor="start" size={12} fill={BLUE}>stagnation streamline</L>

      {/* Pitot-static tube body */}
      <rect x="220" y="130" width="200" height="12" rx="3" fill={MUTED} /> {/* upper stem */}
      <rect x="220" y="210" width="200" height="12" rx="3" fill={MUTED} /> {/* lower stem */}
      {/* Nose (hemispherical) */}
      <path d="M220 130 Q200 175 220 222" fill={N} stroke={N} strokeWidth="2" />
      {/* Forward-facing hole at nose */}
      <Dot cx={206} cy={200} r={4} fill={RED} />
      <L x={174} y={198} anchor="end" size={11} fill={RED}>stagnation tap</L>

      {/* Static holes on sides */}
      {[155, 165, 175].map((y) => (
        <g key={`sh${y}`}>
          <Dot cx={280} cy={y} r={3} fill={GREEN} />
          <Dot cx={280} cy={y + 76} r={3} fill={GREEN} />
        </g>
      ))}
      <L x={298} y={148} anchor="start" size={11} fill={GREEN}>static holes</L>

      {/* Internal passages to manometer */}
      <g className="fmm-cell-in fmm-delay-1">
        <Wire d="M420 136 L440 136 L440 60 L530 60" stroke={RED} width={1.8} />
        <Wire d="M420 216 L460 216 L460 60 L530 60" stroke={GREEN} width={1.8} />
        <L x={444} y={98} anchor="start" size={10} fill={RED}>p₀</L>
        <L x={462} y={110} anchor="start" size={10} fill={GREEN}>p</L>
      </g>

      {/* Differential manometer */}
      <g className="fmm-cell-in fmm-delay-2">
        <rect x="530" y="26" width="100" height="80" rx="6" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
        <rect x="550" y="48" width="16" height="50" rx="3" fill={RED} fillOpacity="0.3" />
        <rect x="594" y="60" width="16" height="38" rx="3" fill={GREEN} fillOpacity="0.3" />
        <Wire d="M550 98 L566 98 L566 86 L594 86 L594 98 L610 98" stroke={MUTED} width={1.4} />
        <L x={580} y={42} size={11} fill={MUTED}>Δh</L>
      </g>

      {/* Head bar conversion at nose */}
      <g className="fmm-cell-in fmm-delay-3">
        <rect x="60" y="268" width="340" height="70" rx="10" fill={WHITE} stroke={BLUE} strokeWidth="1.8" />
        <L x={86} y={290} anchor="start" size={13} fill={BLUE}>HEAD CONVERSION AT STAGNATION</L>
        {/* Velocity head → pressure head */}
        <rect x="80" y="304" width="100" height="18" rx="4" fill={BLUE} fillOpacity="0.4" />
        <L x={130} y={318} size={10} fill={BLUE}>V²/2g</L>
        <L x={190} y={318} size={14} fill={N}>→</L>
        <rect x="206" y="304" width="100" height="18" rx="4" fill={RED} fillOpacity="0.4" />
        <L x={256} y={318} size={10} fill={RED}>Δp/ρg</L>
        <M x={350} y={318} size={12} fill={N} anchor="start">V=0</M>
      </g>

      {/* Bernoulli formula */}
      <g className="fmm-emerge fmm-delay-4">
        <M x={230} y={374} size={14} fill={BLUE}>V = √(2Δp / ρ) = √(2gΔh)</M>
      </g>

      {/* Velocity traverse across pipe */}
      <g className="fmm-cell-in fmm-delay-5">
        <rect x="530" y="130" width="350" height="336" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
        <L x={546} y={154} anchor="start" size={13} fill={N}>VELOCITY TRAVERSE</L>
        {/* Pipe outline */}
        <Wire d="M660 280 L660 440 M850 280 L850 440" stroke={N} width={3} />
        {/* Traverse points */}
        <Curve pts={profilePts} stroke={BLUE} width={2.5} className="fmm-draw fmm-delay-6" />
        {/* Individual traverse dots */}
        {[-80, -60, -40, -20, 0, 20, 40, 60, 80].map((r, i) => {
          const speed = 90 * (1 - (r * r) / 6400) ** (1 / 7)
          return <Dot key={`td${i}`} cx={660 + speed} cy={360 + r} r={3} fill={BLUE} className={`fmm-cell-in fmm-delay-${Math.min(i, 7)}`} />
        })}
        {/* Mean velocity line */}
        <g className="fmm-emerge fmm-delay-7">
          <Wire d="M730 280 L730 440" stroke={AMBER} width={2} dash="6 5" />
          <L x={736} y={462} anchor="start" size={11} fill={AMBER}>V̄ (mean)</L>
        </g>
        <L x={756} y={164} anchor="start" size={11} fill={MUTED} weight={700}>point measurement →</L>
        <L x={756} y={180} anchor="start" size={11} fill={MUTED} weight={700}>traverse needed for Q</L>
      </g>
    </Scene>
  )
}

/** Unit 11 — Orifice jet from tank: Torricelli velocity, vena contracta, three coefficient panels, falling body analogy. */
export function OrificeJetThreeCoefficientsScene() {
  return (
    <Scene caption="Torricelli gives the ideal velocity from head alone; three coefficients correct it">
      {/* Tank */}
      <rect x="40" y="40" width="200" height="360" rx="6" fill={SKY} fillOpacity="0.4" stroke={N} strokeWidth="2.5" />
      {/* Free surface */}
      <Wire d="M44 80 L236 80" stroke={BLUE} width={2.5} />
      <L x={140} y={68} size={12} fill={BLUE}>free surface</L>

      {/* Orifice in side */}
      <rect x="232" y="320" width="10" height="40" fill={N} />
      <rect x="232" y="334" width="10" height="12" fill={SKY} /> {/* opening */}

      {/* Head dimension */}
      <Wire d="M264 80 L264 340 M258 80 L270 80 M258 340 L270 340" stroke={AMBER} width={1.8} />
      <L x={278} y={210} anchor="start" size={14} fill={AMBER}>H</L>

      {/* Jet issuing and contracting */}
      <g className="fmm-cell-in fmm-delay-1">
        <polygon points="242,334 242,346 330,342 330,338" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="1.6" />
        <Wire d="M330 338 L410 338 M330 342 L410 342" stroke={BLUE} width={1.6} />
        {/* Vena contracta mark */}
        <Wire d="M330 332 L330 348" stroke={RED} width={2.5} />
        <L x={330} y={324} size={11} fill={RED}>VC</L>
      </g>

      {/* Orifice and VC dimensions */}
      <g className="fmm-cell-in fmm-delay-2">
        <Wire d="M242 358 L242 378 M242 322 L242 312" stroke={MUTED} width={1.2} />
        <M x={242} y={390} size={11} fill={MUTED}>d (orifice)</M>
        <Wire d="M330 350 L330 370" stroke={RED} width={1.2} />
        <M x={330} y={382} size={11} fill={RED}>d_c (contracted)</M>
      </g>

      {/* Three coefficient panels */}
      <g className="fmm-cell-in fmm-delay-3">
        <Card x={440} y={24} w={210} h={120} title="Cv — VELOCITY" accent={BLUE}>
          <M x={105} y={60} size={12} fill={N}>Cv = V_actual / V_ideal</M>
          <M x={105} y={82} size={14} fill={BLUE}>≈ 0.97</M>
          <L x={105} y={102} size={10} fill={MUTED}>friction slows the jet</L>
        </Card>
      </g>

      <g className="fmm-cell-in fmm-delay-4">
        <Card x={670} y={24} w={210} h={120} title="Cc — CONTRACTION" accent={RED}>
          <M x={105} y={60} size={12} fill={N}>Cc = A_vc / A_orifice</M>
          <M x={105} y={82} size={14} fill={RED}>≈ 0.64</M>
          <L x={105} y={102} size={10} fill={MUTED}>jet narrows past hole</L>
        </Card>
      </g>

      <g className="fmm-cell-in fmm-delay-5">
        <Card x={440} y={162} w={440} h={108} title="Cd — DISCHARGE (= Cv × Cc)" accent={GREEN}>
          <M x={220} y={60} size={14} fill={N}>Cd = Cv × Cc = Q_actual / Q_ideal</M>
          <M x={220} y={86} size={16} fill={GREEN}>≈ 0.97 × 0.64 ≈ 0.62</M>
        </Card>
      </g>

      {/* Falling body analogy */}
      <g className="fmm-cell-in fmm-delay-6">
        <rect x="440" y="290" width="440" height="180" rx="10" fill={WHITE} stroke={TEAL} strokeWidth="1.8" />
        <L x={456} y={314} anchor="start" size={13} fill={TEAL}>TORRICELLI = FREE FALL</L>
        {/* Falling body */}
        <Dot cx={520} cy={328} r={8} fill={N} />
        <Arr x1={520} y1={340} x2={520} y2={420} tone={RED} width={2.5} />
        <L x={534} y={386} anchor="start" size={11} fill={RED}>g</L>
        <Wire d="M490 328 L490 420 M484 328 L496 328 M484 420 L496 420" stroke={AMBER} width={1.4} />
        <L x={478} y={374} anchor="end" size={12} fill={AMBER}>H</L>

        {/* Formula */}
        <M x={700} y={348} size={16} fill={TEAL}>V_ideal = √(2gH)</M>
        <M x={700} y={376} size={13} fill={N}>same velocity as free fall</M>
        <M x={700} y={402} size={13} fill={N}>through the same height H</M>

        {/* Connection */}
        <g className="fmm-emerge fmm-delay-7">
          <Wire d="M540 384 L620 384" stroke={TEAL} width={2} dash="6 4" />
          <L x={700} y={440} size={12} fill={MUTED}>energy conservation: PE → KE</L>
        </g>
      </g>
    </Scene>
  )
}

/** Unit 12 — Rectangular and triangular notches: strips, velocity annotations, log-log discharge plot. */
export function NotchIntegrationStripsScene() {
  return (
    <Scene caption="Rectangular: Q ∝ H^(3/2); V-notch: Q ∝ H^(5/2) — the higher exponent wins at low flow">
      {/* Rectangular notch (left) */}
      <rect x="30" y="24" width="280" height="310" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={170} y={46} size={14} fill={BLUE}>RECTANGULAR NOTCH</L>

      {/* Channel wall */}
      <Wire d="M60 240 L60 100 L260 100 L260 240" stroke={N} width={3} />
      {/* Water level */}
      <Wire d="M60 140 L260 140" stroke={BLUE} width={2} dash="6 4" />
      <polygon points="60,140 260,140 260,240 60,240" fill={SKY} fillOpacity="0.4" />

      {/* Nappe falling */}
      <g className="fmm-current">
        <Wire d="M160 240 L160 290" stroke={BLUE} width={2} dash="9 9" />
      </g>
      <L x={176} y={278} anchor="start" size={10} fill={MUTED}>nappe</L>

      {/* Head dimension */}
      <Wire d="M270 100 L270 140 M266 100 L274 100 M266 140 L274 140" stroke={AMBER} width={1.6} />
      <L x={278} y={122} anchor="start" size={12} fill={AMBER}>H</L>

      {/* Horizontal strips — same width */}
      {[0, 1, 2, 3, 4].map((i) => {
        const sy = 108 + i * 24
        const depth = (i + 1) * 24
        return (
          <g key={`rs${i}`} className={`fmm-cell-in fmm-delay-${Math.min(i, 4)}`}>
            <rect x="68" y={sy} width="184" height="16" fill={BLUE} fillOpacity={0.12 + i * 0.06}
              stroke={BLUE} strokeWidth="1" />
            <M x={264} y={n(sy) + 12} anchor="start" size={10} fill={BLUE}>
              {`v = √(2g·${i + 1}h)`}
            </M>
          </g>
        )
      })}
      <L x={170} y={310} size={12} fill={BLUE}>strips: same width B</L>
      <M x={170} y={328} size={13} fill={BLUE}>Q = ⅔ Cd B √(2g) H^(3/2)</M>

      {/* Triangular (V) notch (right) */}
      <rect x="340" y="24" width="280" height="310" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={480} y={46} size={14} fill={RED}>V-NOTCH (TRIANGULAR)</L>

      {/* Channel wall with V-notch */}
      <Wire d="M370 240 L370 100 L480 200 L590 100 L590 240" stroke={N} width={3} />
      {/* Water level */}
      <Wire d="M412 140 L548 140" stroke={BLUE} width={2} dash="6 4" />
      <polygon points="412,140 548,140 520,200 440,200" fill={SKY} fillOpacity="0.4" />

      {/* Head */}
      <Wire d="M600 100 L600 140 M596 100 L604 100 M596 140 L604 140" stroke={AMBER} width={1.6} />
      <L x={608} y={122} anchor="start" size={12} fill={AMBER}>H</L>

      {/* Nappe */}
      <g className="fmm-current">
        <Wire d="M480 200 L480 290" stroke={BLUE} width={2} dash="9 9" />
      </g>

      {/* Strips — width shrinks towards apex */}
      {[0, 1, 2, 3, 4].map((i) => {
        const sy = 108 + i * 16
        const frac = 1 - (i * 16) / 100
        const halfW = 76 * frac
        return (
          <g key={`vs${i}`} className={`fmm-cell-in fmm-delay-${Math.min(i, 4)}`}>
            <rect x={480 - halfW} y={sy} width={halfW * 2} height="10" fill={RED} fillOpacity={0.12 + i * 0.06}
              stroke={RED} strokeWidth="1" />
          </g>
        )
      })}
      <L x={480} y={310} size={12} fill={RED}>strips: width ∝ depth</L>
      <M x={480} y={328} size={13} fill={RED}>Q = 8/15 Cd tan(θ/2) √(2g) H^(5/2)</M>

      {/* Log-log plot at bottom */}
      <g className="fmm-cell-in fmm-delay-5">
        <rect x="30" y="350" width="850" height="138" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
        <L x={46} y={374} anchor="start" size={13} fill={N}>LOG-LOG PLOT: Q vs H</L>
        <Axes x={100} y={476} w={400} h={96} xLabel="log H" yLabel="log Q" />

        {/* 3/2 slope (rectangular) */}
        <Curve pts={[[100, 476], [500, 376]]} stroke={BLUE} width={2.8} className="fmm-draw fmm-delay-6" />
        <L x={510} y={370} anchor="start" size={12} fill={BLUE}>slope 3/2 (rect)</L>

        {/* 5/2 slope (V-notch) — steeper, diverges at low H */}
        <Curve pts={[[100, 476], [500, 338]]} stroke={RED} width={2.8} className="fmm-draw fmm-delay-7" />
        <L x={510} y={334} anchor="start" size={12} fill={RED}>slope 5/2 (V-notch)</L>

        {/* Divergence at low H */}
        <g className="fmm-emerge fmm-delay-7">
          <Wire d="M140 460 L140 476" stroke={GREEN} width={2} />
          <L x={154} y={468} anchor="start" size={10} fill={GREEN}>V-notch wins at low H</L>
        </g>

        {/* Note */}
        <L x={720} y={420} size={12} fill={MUTED} weight={700}>Higher exponent →</L>
        <L x={720} y={438} size={12} fill={MUTED} weight={700}>more sensitive at</L>
        <L x={720} y={456} size={12} fill={MUTED} weight={700}>small discharges</L>
      </g>
    </Scene>
  )
}

/** Unit 13 — Moody chart: laminar line, critical zone, roughness curves, worked navigation path, Darcy-Weisbach. */
export function MoodyChartNavigationScene() {
  /* Log axes for Moody chart */
  const axX = 50, axY = 390, axW = 540, axH = 300
  /* Laminar line: f = 64/Re, from Re=500 to Re=2300 */
  const lamPts = []
  for (let logRe = 2.7; logRe <= 3.36; logRe += 0.05) {
    const x = axX + ((logRe - 2.5) / 5) * axW
    const f = 64 / Math.pow(10, logRe)
    const logF = Math.log10(f)
    const y = axY - ((logF + 2.5) / 1.5) * axH
    lamPts.push([x, y])
  }
  /* Turbulent curves (simplified) at different roughness */
  const turbCurve = (eps) => {
    const pts = []
    for (let logRe = 3.5; logRe <= 7.5; logRe += 0.1) {
      const Re = Math.pow(10, logRe)
      // Simplified Colebrook: 1/√f ≈ -2 log(eps/3.7 + 2.51/(Re√f))
      // Use iterative approximation
      let f = 0.02
      for (let k = 0; k < 5; k++) {
        f = 1 / Math.pow(-2 * Math.log10(eps / 3.7 + 2.51 / (Re * Math.sqrt(f))), 2)
      }
      const x = axX + ((logRe - 2.5) / 5) * axW
      const logF = Math.log10(f)
      const y = axY - ((logF + 2.5) / 1.5) * axH
      if (y > axY - axH && y < axY) pts.push([x, y])
    }
    return pts
  }

  return (
    <Scene caption="Darcy-Weisbach gives loss from f, and everything difficult is in finding f">
      {/* Chart axes */}
      <Axes x={axX} y={axY} w={axW} h={axH}
        xLabel="log Re"
        yLabel="log f"
        tickLabels={[
          [axX + (0.5 / 5) * axW, '10³'],
          [axX + (1.5 / 5) * axW, '10⁴'],
          [axX + (2.5 / 5) * axW, '10⁵'],
          [axX + (3.5 / 5) * axW, '10⁶'],
          [axX + (4.5 / 5) * axW, '10⁷'],
        ]}
      />

      {/* Laminar line */}
      <Curve pts={lamPts} stroke={BLUE} width={2.8} className="fmm-draw" />
      <L x={lamPts.length > 0 ? lamPts[0][0] + 10 : 70} y={lamPts.length > 0 ? lamPts[0][1] - 10 : 120}
        anchor="start" size={11} fill={BLUE}>f = 64/Re</L>

      {/* Critical zone shaded */}
      <rect x={axX + (0.86 / 5) * axW} y={axY - axH} width={(0.24 / 5) * axW} height={axH}
        fill={RED} fillOpacity="0.1" />
      <L x={axX + (0.98 / 5) * axW} y={axY - axH + 16} size={10} fill={RED}>critical</L>

      {/* Roughness curves */}
      {[
        { eps: 0.00001, label: 'smooth', tone: N },
        { eps: 0.001, label: 'ε/D = 0.001', tone: AMBER },
        { eps: 0.005, label: 'ε/D = 0.005', tone: RED },
        { eps: 0.02, label: 'ε/D = 0.02', tone: RED },
      ].map(({ eps, label, tone }, i) => {
        const pts = turbCurve(eps)
        return (
          <g key={label} className={`fmm-cell-in fmm-delay-${i}`}>
            <Curve pts={pts} stroke={tone} width={2} />
            {pts.length > 2 && (
              <L x={pts[pts.length - 1][0] - 4} y={pts[pts.length - 1][1] - 6}
                anchor="end" size={10} fill={tone}>{label}</L>
            )}
          </g>
        )
      })}

      {/* Worked navigation path */}
      <g className="fmm-emerge fmm-delay-5">
        {/* Entry at Re = 10^5 */}
        <Wire d={`M${axX + (2.5 / 5) * axW} ${axY} L${axX + (2.5 / 5) * axW} ${axY - axH * 0.55}`}
          stroke={GREEN} width={2.5} />
        <Dot cx={axX + (2.5 / 5) * axW} cy={axY} r={5} fill={GREEN} />
        <L x={axX + (2.5 / 5) * axW + 6} y={axY - axH * 0.2} anchor="start" size={11} fill={GREEN}>① enter at Re</L>

        {/* Horizontal to f axis */}
        <Wire d={`M${axX + (2.5 / 5) * axW} ${axY - axH * 0.55} L${axX} ${axY - axH * 0.55}`}
          stroke={GREEN} width={2.5} marker="url(#fmArrG)" />
        <L x={axX + (1.2 / 5) * axW} y={axY - axH * 0.55 - 12} size={11} fill={GREEN}>② read f</L>

        <Dot cx={axX + (2.5 / 5) * axW} cy={axY - axH * 0.55} r={5} fill={GREEN} />
        <Dot cx={axX} cy={axY - axH * 0.55} r={5} fill={GREEN} />
      </g>

      {/* Darcy-Weisbach equation */}
      <g className="fmm-cell-in fmm-delay-6">
        <Card x={610} y={28} w={270} h={150} title="DARCY-WEISBACH" accent={BLUE}>
          <M x={135} y={62} size={16} fill={N}>hf = f · (L/D) · V²/2g</M>
          <Wire d="M14 78 L256 78" stroke={MUTED} width={1} />
          <M x={135} y={100} size={12} fill={BLUE}>f ← from Moody chart</M>
          <L x={135} y={122} size={11} fill={MUTED} weight={700}>loss ∝ V², inversely ∝ D</L>
          <L x={135} y={140} size={11} fill={RED} weight={700}>pipe sizing is dominated by this</L>
        </Card>
      </g>

      {/* Fully rough regime note */}
      <g className="fmm-cell-in fmm-delay-7">
        <rect x="610" y="200" width="270" height="80" rx="8" fill={WHITE} stroke={AMBER} strokeWidth="1.8" />
        <L x={745} y={224} size={12} fill={AMBER}>FULLY ROUGH REGIME</L>
        <L x={745} y={244} size={11} fill={N} weight={700}>Curves flatten → f independent of Re</L>
        <L x={745} y={262} size={11} fill={MUTED} weight={700}>Only roughness matters</L>
      </g>
    </Scene>
  )
}

/** Unit 14 — Minor losses: pipe run with fittings, separation regions, K bars, dominance comparison. */
export function MinorLossFittingsScene() {
  const fittings = [
    { x: 80, w: 40, label: 'Entrance', K: 0.5, color: MUTED },
    { x: 220, w: 50, label: 'Elbow', K: 0.9, color: BLUE },
    { x: 400, w: 60, label: 'Globe valve', K: 10, color: RED },
    { x: 580, w: 50, label: 'Expansion', K: 1.0, color: AMBER },
    { x: 740, w: 40, label: 'Exit', K: 1.0, color: MUTED },
  ]
  const maxK = 10

  return (
    <Scene caption="Minor losses are K × V²/2g at every fitting; in a short run they are not minor at all">
      {/* Pipe run */}
      <Wire d="M40 160 L850 160" stroke={N} width={3} />
      <Wire d="M40 190 L850 190" stroke={N} width={3} />
      <polygon points="40,160 850,160 850,190 40,190" fill={SKY} fillOpacity="0.3" />

      {/* Fittings in section */}
      {fittings.map(({ x, w, label, K, color }, i) => (
        <g key={label} className={`fmm-cell-in fmm-delay-${Math.min(i, 4)}`}>
          {/* Fitting body */}
          <rect x={n(x)} y="148" width={n(w)} height="54" rx="4" fill={WHITE} stroke={color} strokeWidth="2.2" />
          {/* Separation region shaded */}
          <rect x={n(x) + n(w)} y="155" width="24" height="40" rx="3" fill={color} fillOpacity="0.12" />
          {/* Eddies */}
          <g className="fmm-spin" style={{ transformBox: 'view-box', transformOrigin: `${n(x) + n(w) + 12}px 175px` }}>
            <Wire d={`M${n(x) + n(w) + 18} 175 A6 6 0 1 1 ${n(x) + n(w) + 12} 169`} stroke={color} width={1.2} />
          </g>

          {/* K bar above */}
          <rect x={n(x)} y={128 - (K / maxK) * 80} width={n(w)} height={(K / maxK) * 80}
            rx="4" fill={color} fillOpacity="0.5" />
          <M x={n(x) + n(w) / 2} y={122 - (K / maxK) * 80} size={11} fill={color}>K={K}</M>

          {/* Label below */}
          <L x={n(x) + n(w) / 2} y={218} size={10} fill={N}>{label}</L>
        </g>
      ))}

      <L x={450} y={34} size={13} fill={N}>LOSS COEFFICIENT BARS</L>
      <L x={450} y={238} size={11} fill={MUTED} weight={700}>h_minor = K · V²/2g per fitting</L>

      {/* Stacked comparison: short vs long run */}
      <g className="fmm-cell-in fmm-delay-5">
        <rect x="40" y="260" width="400" height="220" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
        <L x={240} y={282} size={13} fill={N}>SHORT RUN (5 m)</L>

        {/* Minor loss bar (dominant) */}
        <rect x="60" y="300" width="280" height="30" rx="6" fill={RED} fillOpacity="0.5" />
        <L x={200} y={320} size={12} fill={RED}>ΣK · V²/2g (minor losses)</L>

        {/* Friction loss bar */}
        <rect x="60" y="340" width="80" height="30" rx="6" fill={BLUE} fillOpacity="0.5" />
        <L x={100} y={360} size={12} fill={BLUE}>f·L/D (friction)</L>

        <L x={240} y={394} size={13} fill={N}>LONG RUN (500 m)</L>

        {/* Minor loss bar (small) */}
        <rect x="60" y="410" width="50" height="30" rx="6" fill={RED} fillOpacity="0.5" />
        <L x={86} y={430} size={10} fill={RED}>minor</L>

        {/* Friction loss bar (dominant) */}
        <rect x="60" y="450" width="340" height="30" rx="6" fill={BLUE} fillOpacity="0.5" />
        <L x={230} y={470} size={12} fill={BLUE}>f·L/D (friction dominates)</L>
      </g>

      {/* Dominance reversal annotation */}
      <g className="fmm-emerge fmm-delay-6">
        <rect x="470" y="260" width="410" height="100" rx="10" fill={WHITE} stroke={AMBER} strokeWidth="2" />
        <L x={675} y={284} size={13} fill={AMBER}>DOMINANCE REVERSAL</L>
        <L x={486} y={310} anchor="start" size={12} fill={N} weight={700}>Short pipes: minor losses &gt; friction</L>
        <L x={486} y={332} anchor="start" size={12} fill={N} weight={700}>Long pipes: friction &gt;&gt; minor losses</L>
        <L x={486} y={350} anchor="start" size={11} fill={MUTED} weight={700}>→ equivalent length method: replace</L>
      </g>

      {/* Equivalent length note */}
      <g className="fmm-cell-in fmm-delay-7">
        <rect x="470" y="376" width="410" height="106" rx="10" fill={WHITE} stroke={TEAL} strokeWidth="1.8" />
        <L x={675} y={398} size={13} fill={TEAL}>EQUIVALENT LENGTH METHOD</L>
        <M x={675} y={424} size={13} fill={N}>L_eq = K·D / f per fitting</M>
        <M x={675} y={450} size={12} fill={MUTED}>Add all L_eq to L_pipe → one Darcy-Weisbach</M>
        <M x={675} y={470} size={12} fill={TEAL}>h_total = f · (L + ΣL_eq) / D · V²/2g</M>
      </g>
    </Scene>
  )
}

/** Unit 15 — Pipes in series and parallel: energy line steps, flow division, circuit analogy. */
export function SeriesParallelNetworkScene() {
  return (
    <Scene caption="Series: common Q, losses add. Parallel: common hf, flows add. Quadratic, not linear.">
      {/* Upper half: series pipes */}
      <rect x="30" y="20" width="840" height="220" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={44} anchor="start" size={14} fill={BLUE}>PIPES IN SERIES</L>

      {/* Three pipes of different diameters joined end to end */}
      <Pipe x={80} y={140} w={200} h1={60} h2={60} />
      <Pipe x={280} y={140} w={180} h1={40} h2={40} />
      <Pipe x={460} y={140} w={200} h1={50} h2={50} />

      {/* Single Q arrow passing through all */}
      <g className="fmm-current">
        <Wire d="M60 140 L680 140" stroke={BLUE} width={2} dash="9 9" />
      </g>
      <L x={370} y={126} size={12} fill={BLUE}>Q (same through all)</L>

      {/* Energy line stepping down at each junction */}
      <g className="fmm-cell-in fmm-delay-1">
        <Curve pts={[[60, 80], [280, 96], [280, 106], [460, 118], [460, 128], [660, 140]]}
          stroke={RED} width={2.5} />
        <L x={580} y={104} anchor="start" size={11} fill={RED}>TEL steps down</L>
      </g>

      {/* Loss bars stacking */}
      <g className="fmm-cell-in fmm-delay-2">
        <rect x="710" y="76" width="30" height="22" rx="3" fill={AMBER} fillOpacity="0.6" />
        <rect x="710" y="98" width="30" height="18" rx="3" fill={TEAL} fillOpacity="0.6" />
        <rect x="710" y="116" width="30" height="24" rx="3" fill={PURP} fillOpacity="0.6" />
        <L x={750} y={92} anchor="start" size={10} fill={AMBER}>hf₁</L>
        <L x={750} y={110} anchor="start" size={10} fill={TEAL}>hf₂</L>
        <L x={750} y={132} anchor="start" size={10} fill={PURP}>hf₃</L>
        <L x={750} y={154} anchor="start" size={11} fill={N} weight={700}>Σhf = hf₁+hf₂+hf₃</L>
      </g>

      {/* Pipe labels */}
      <M x={180} y={186} size={11} fill={MUTED}>D₁ (large)</M>
      <M x={370} y={176} size={11} fill={MUTED}>D₂ (small)</M>
      <M x={560} y={182} size={11} fill={MUTED}>D₃ (medium)</M>

      {/* Series circuit analogy (faint) */}
      <g className="fmm-emerge fmm-delay-3" opacity="0.5">
        <rect x="80" y="200" width="40" height="20" rx="3" fill="none" stroke={MUTED} strokeWidth="1.4" />
        <Wire d="M120 210 L230 210" stroke={MUTED} width={1.2} />
        <rect x="230" y="200" width="40" height="20" rx="3" fill="none" stroke={MUTED} strokeWidth="1.4" />
        <Wire d="M270 210 L380 210" stroke={MUTED} width={1.2} />
        <rect x="380" y="200" width="40" height="20" rx="3" fill="none" stroke={MUTED} strokeWidth="1.4" />
        <L x={490} y={214} anchor="start" size={10} fill={MUTED}>R₁ + R₂ + R₃ (series)</L>
      </g>

      {/* Lower half: parallel pipes */}
      <rect x="30" y="256" width="540" height="230" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
      <L x={46} y={278} anchor="start" size={14} fill={TEAL}>PIPES IN PARALLEL</L>

      {/* Three pipes between same junctions */}
      <Dot cx={100} cy={380} r={8} fill={N} />
      <Dot cx={500} cy={380} r={8} fill={N} />

      {/* Branch 1 (large diameter, large flow) */}
      <Wire d="M108 380 Q300 310 492 380" stroke={N} width={3.5} />
      <g className="fmm-current">
        <Wire d="M150 358 L420 340" stroke={BLUE} width={3} dash="9 9" />
      </g>
      <L x={280} y={320} size={11} fill={N}>D₁ (large) → Q₁ large</L>

      {/* Branch 2 (medium) */}
      <Wire d="M108 380 L492 380" stroke={N} width={2.5} />
      <g className="fmm-current">
        <Wire d="M150 380 L450 380" stroke={BLUE} width={2} dash="9 9" />
      </g>
      <L x={300} y={374} size={11} fill={N}>D₂</L>

      {/* Branch 3 (small) */}
      <Wire d="M108 380 Q300 440 492 380" stroke={N} width={1.8} />
      <g className="fmm-current">
        <Wire d="M150 400 L420 412" stroke={BLUE} width={1.4} dash="9 9" />
      </g>
      <L x={280} y={446} size={11} fill={N}>D₃ (small) → Q₃ small</L>

      {/* Incoming / outgoing Q */}
      <Arr x1={40} y1={380} x2={92} y2={380} tone={BLUE} width={3} />
      <L x={50} y={366} size={12} fill={BLUE}>Q</L>
      <Arr x1={508} y1={380} x2={560} y2={380} tone={BLUE} width={3} />
      <L x={530} y={366} size={12} fill={BLUE}>Q</L>

      {/* Common loss bar */}
      <g className="fmm-cell-in fmm-delay-4">
        <rect x="68" y="464" width="200" height="18" rx="4" fill={TEAL} fillOpacity="0.5" />
        <L x={168} y={478} size={11} fill={TEAL}>hf (same for all branches)</L>
        <M x={300} y={452} size={12} fill={N}>Q = Q₁ + Q₂ + Q₃</M>
        <M x={300} y={472} size={12} fill={TEAL}>hf₁ = hf₂ = hf₃</M>
      </g>

      {/* Parallel circuit analogy */}
      <g className="fmm-cell-in fmm-delay-5">
        <rect x="590" y="256" width="280" height="230" rx="10" fill={WHITE} stroke={PURP} strokeWidth="1.6" />
        <L x={730} y={278} size={13} fill={PURP}>CIRCUIT ANALOGY</L>
        <L x={606} y={304} anchor="start" size={12} fill={N} weight={700}>Voltage ↔ head loss hf</L>
        <L x={606} y={324} anchor="start" size={12} fill={N} weight={700}>Current ↔ discharge Q</L>
        <L x={606} y={344} anchor="start" size={12} fill={N} weight={700}>Resistance ↔ pipe friction</L>
        <Wire d="M606 360 L854 360" stroke={MUTED} width={1} />
        <L x={606} y={382} anchor="start" size={12} fill={RED} weight={800}>⚠ Quadratic, not linear!</L>
        <M x={730} y={408} size={13} fill={N}>hf = R · Q² (not R · Q)</M>
        <L x={606} y={434} anchor="start" size={11} fill={MUTED} weight={700}>Series: same Q, add hf</L>
        <L x={606} y={454} anchor="start" size={11} fill={MUTED} weight={700}>Parallel: same hf, add Q</L>
        <L x={606} y={474} anchor="start" size={11} fill={MUTED} weight={700}>Cannot superpose nonlinear</L>
      </g>
    </Scene>
  )
}

/** Unit 16 — Energy and grade lines through a pipe system with pump, losses, and summit cavitation warning. */
export function EnergyGradeLinesScene() {
  /* System profile points */
  const pipeY = (x) => {
    if (x < 100) return 360
    if (x < 200) return 360 - (x - 100) * 0.1 // gentle rise through pump
    if (x < 400) return 350 - (x - 200) * 0.7 // rise to summit
    if (x < 600) return 210 + (x - 400) * 0.5 // descend from summit
    return 310 + (x - 600) * 0.15 // approach delivery
  }

  return (
    <Scene caption="Add pump/turbine/loss terms to Bernoulli; the grade line warns where p goes negative">
      {/* Supply reservoir */}
      <rect x="20" y="300" width="80" height="120" rx="4" fill={SKY} fillOpacity="0.6" stroke={N} strokeWidth="2.5" />
      <Wire d="M24 320 L96 320" stroke={BLUE} width={2} />
      <L x={60} y={312} size={11} fill={BLUE}>reservoir</L>

      {/* Pipe profile */}
      <Wire d="M100 360 L200 350 L400 210 L600 310 L800 340" stroke={N} width={3} />

      {/* Delivery tank */}
      <rect x="800" y="310" width="80" height="100" rx="4" fill={SKY} fillOpacity="0.6" stroke={N} strokeWidth="2.5" />
      <Wire d="M804 340 L876 340" stroke={BLUE} width={2} />
      <L x={840} y={332} size={11} fill={BLUE}>delivery</L>

      {/* Pump symbol */}
      <g className="fmm-cell-in fmm-delay-0">
        <circle cx={150} cy={355} r={16} fill={WHITE} stroke={GREEN} strokeWidth="2.5" />
        <L x={150} y={360} size={12} fill={GREEN}>P</L>
        <L x={150} y={386} size={11} fill={GREEN}>pump</L>
      </g>

      {/* Total energy line */}
      <g className="fmm-cell-in fmm-delay-1">
        <Curve pts={[
          [60, 310],        // reservoir surface
          [140, 308],       // approach
          [160, 230],       // pump jump (sharp up)
          [260, 216],       // slope down (friction)
          [400, 190],       // summit area
          [500, 200],       // descending pipe
          [600, 256],       // fitting loss step
          [610, 266],       // after fitting
          [800, 310],       // delivery level
        ]} stroke={RED} width={2.8} />
        <L x={420} y={178} anchor="start" size={12} fill={RED}>Total Energy Line (TEL)</L>
      </g>

      {/* Pump jump annotation */}
      <g className="fmm-emerge fmm-delay-2">
        <Arr x1={152} y1={305} x2={152} y2={235} tone={GREEN} width={2.5} />
        <L x={120} y={270} anchor="end" size={11} fill={GREEN}>pump head</L>
      </g>

      {/* Entrance and exit loss steps */}
      <g className="fmm-emerge fmm-delay-3">
        <Wire d="M100 310 L100 320" stroke={AMBER} width={2.5} />
        <L x={104} y={318} anchor="start" size={9} fill={AMBER}>entry loss</L>
        <Wire d="M600 256 L610 266" stroke={AMBER} width={2.5} />
        <L x={616} y={254} anchor="start" size={9} fill={AMBER}>fitting loss</L>
      </g>

      {/* Hydraulic grade line (one V²/2g below TEL) */}
      <g className="fmm-cell-in fmm-delay-3">
        <Curve pts={[
          [60, 320],
          [140, 318],
          [160, 248],
          [260, 234],
          [400, 208],
          [500, 218],
          [600, 274],
          [610, 284],
          [800, 326],
        ]} stroke={BLUE} width={2.5} dash="8 5" />
        <L x={420} y={230} anchor="start" size={12} fill={BLUE}>HGL (= TEL − V²/2g)</L>
      </g>

      {/* V²/2g gap annotation */}
      <g className="fmm-emerge fmm-delay-4">
        <Arr x1={260} y1={234} x2={260} y2={216} tone={PURP} width={1.8} />
        <L x={268} y={228} anchor="start" size={9} fill={PURP}>V²/2g</L>
      </g>

      {/* Summit cavitation warning — HGL dips below pipe */}
      <g className="fmm-cell-in fmm-delay-5">
        {/* Shaded region where HGL < pipe */}
        <polygon points="320,204 420,208 420,210 320,216" fill={RED} fillOpacity="0.2" />
        <rect x="330" y="160" width="140" height="36" rx="6" fill={WHITE} stroke={RED} strokeWidth="2" />
        <L x={400} y={174} size={11} fill={RED}>⚠ SUB-ATMOSPHERIC</L>
        <L x={400} y={190} size={10} fill={RED}>cavitation risk!</L>
        <Wire d="M400 196 L400 206" stroke={RED} width={1.4} dash="3 3" />
      </g>

      {/* Explanation at bottom */}
      <g className="fmm-cell-in fmm-delay-6">
        <rect x="20" y="430" width="860" height="66" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="1.4" />
        <L x={40} y={452} anchor="start" size={12} fill={N} weight={700}>TEL: drops at losses, jumps at pump, drops at turbine</L>
        <L x={40} y={472} anchor="start" size={12} fill={N} weight={700}>HGL: = piezometric head — where it falls below pipe → pressure &lt; 0</L>
        <L x={40} y={488} anchor="start" size={11} fill={MUTED} weight={700}>Modified Bernoulli: p₁/ρg + V₁²/2g + z₁ + hₚ = p₂/ρg + V₂²/2g + z₂ + hf + hₜ</L>
      </g>
    </Scene>
  )
}


/* ── Module 4 ────────────────────────────────────────────────────────── */


/** Unit 5 — Friction and pressure drag trade places across body shapes. */
function FrictionPressureDragScene() {
  const bodies = [
    { x: 120, name: 'aligned plate', cf: '0.004', friction: 86, shape: <rect x="-42" y="-4" width="84" height="8" rx="3" fill={N} /> },
    { x: 320, name: 'aerofoil', cf: '0.02', friction: 58, shape: <path d="M-52 0 Q-10 -20 54 0 Q-10 13 -52 0Z" fill={SKY} stroke={N} strokeWidth="2" /> },
    { x: 520, name: 'sphere', cf: '0.47', friction: 18, shape: <circle r="32" fill={SKY} stroke={N} strokeWidth="2" /> },
    { x: 720, name: 'normal plate', cf: '1.98', friction: 4, shape: <rect x="-5" y="-40" width="10" height="80" rx="2" fill={N} /> },
  ]
  return <Scene caption="Slender bodies: friction drag; bluff bodies: pressure drag">
    <L x="450" y="48" size="15" fill={BLUE}>same free stream U∞ →</L>
    {bodies.map((b, i) => <g key={b.name} className={`fmm-cell-in fmm-delay-${i}`}>
      <g transform={`translate(${b.x},165)`}>{b.shape}
        {[0, 1, 2].map(k => <Arr key={k} x1={b.x - 65 + k * 18} y1={140} x2={b.x - 45 + k * 18} y2={140} tone={BLUE} width="1.4" />)}
      </g>
      <L x={b.x} y="230" size="12" fill={N}>{b.name}</L>
      <L x={b.x} y="252" size="11" fill={MUTED}>tangential τ</L>
      {[0, 1, 2].map(k => <Arr key={k} x1={b.x - 36 + k * 36} y1="195" x2={b.x - 20 + k * 36} y2="195" tone={AMBER} width="1.5" />)}
      <L x={b.x} y="278" size="11" fill={MUTED}>normal p</L>
      <rect x={b.x - 58} y="302" width="116" height="28" rx="5" fill={SKY} />
      <rect x={b.x - 58} y="302" width={b.friction} height="28" rx="5" fill={GREEN} className="fmm-bar" />
      <rect x={b.x - 58 + b.friction} y="302" width={116 - b.friction} height="28" fill={ROSE} className="fmm-bar" />
      <L x={b.x - 58} y="352" size="10" fill={GREEN} anchor="start">friction</L><L x={b.x + 58} y="352" size="10" fill={ROSE} anchor="end">pressure</L>
      <M x={b.x} y="378" size="12" fill={BLUE}>Cᴅ ≈ {b.cf}</M><L x={b.x} y="398" size="10" fill={MUTED}>reference area stated</L>
    </g>)}
  </Scene>
}

/** Unit 6 — Cylinder pressure, separation and vortex wake. */
function CylinderPressureWakeScene() {
  return <Scene caption="Early separation makes the cylinder wake broad and unsteady">
    <L x="185" y="54" size="14" fill={BLUE}>cross flow U∞</L>
    {[80, 130, 180].map(x => <Arr key={x} x1={x} y1="170" x2={x + 36} y2="170" tone={BLUE} width="2" className="fmm-current-slow" />)}
    <circle cx="250" cy="190" r="74" fill={SKY} stroke={N} strokeWidth="3" />
    <Dot cx="176" cy="190" r="5" fill={RED} /><L x="165" y="214" size="10" fill={RED}>stagnation</L>
    <path d="M250 116 Q320 130 324 190 Q320 250 250 264" fill="none" stroke={BLUE} strokeWidth="3" strokeDasharray="7 5" />
    <path d="M250 116 Q302 139 299 190 Q302 241 250 264" fill="none" stroke={ROSE} strokeWidth="4" />
    <L x="330" y="128" size="10" fill={BLUE} anchor="start">ideal Cₚ</L><L x="310" y="270" size="10" fill={ROSE} anchor="start">real Cₚ</L>
    <Dot cx="292" cy="142" r="5" fill={AMBER} /><Dot cx="292" cy="238" r="5" fill={AMBER} />
    <L x="365" y="145" size="10" fill={AMBER} anchor="start">supercritical sep.</L><L x="365" y="238" size="10" fill={AMBER} anchor="start">subcritical sep.</L>
    <path d="M320 148 Q470 120 600 165 L600 215 Q470 260 320 232Z" fill={ROSE} fillOpacity="0.14" />
    {[0, 1, 2, 3].map(i => <circle key={i} cx={385 + i * 54} cy={i % 2 ? 224 : 155} r="16" fill={PURP} fillOpacity="0.55" className={`fmm-pulse fmm-delay-${i}`} />)}
    <L x="470" y="286" size="12" fill={PURP}>alternating vortex street · f = St U∞/D</L>
    <Axes x="650" y="400" w="190" h="135" xLabel="Re" yLabel="Cᴅ" />
    <Curve pts={[[655,270],[720,275],[760,280],[785,330],[830,350]]} stroke={ROSE} width="3" className="fmm-draw" />
    <L x="785" y="316" size="10" fill={ROSE}>drag crisis</L><L x="730" y="250" size="11" fill={N}>Cᴅ vs Re</L>
  </Scene>
}

/** Unit 7 — Sphere drag crisis and why golf balls carry farther. */
function SphereDragDimplesScene() {
  return <Scene caption="Dimples trigger transition early, delay separation, and reduce drag">
    <Axes x="75" y="410" w="470" h="280" xLabel="Re  (log scale)" yLabel="Cᴅ" tickLabels={[[110,'1'],[220,'10³'],[360,'10⁵'],[510,'10⁶']]} />
    <Curve pts={[[82,130],[145,210],[210,265],[300,270],[390,270],[435,345],[530,360]]} stroke={BLUE} width="4" className="fmm-draw" />
    <Curve pts={[[82,130],[145,210],[210,265],[300,270],[350,340],[530,360]]} stroke={PURP} width="3" dash="7 4" className="fmm-draw" />
    <L x="155" y="180" size="11" fill={BLUE}>Stokes: Cᴅ = 24/Re</L><L x="290" y="255" size="11" fill={BLUE}>plateau ≈ 0.47</L><L x="430" y="330" size="11" fill={BLUE}>crisis</L>
    <L x="335" y="365" size="11" fill={PURP}>dimpled: earlier crisis</L>
    {[150, 290, 405, 475].map((x, i) => <g key={x}><circle cx={x} cy={i < 2 ? 265 : 340} r="12" fill={SKY} stroke={N} /><path d={`M${x+12} ${i < 2 ? 258 : 333} Q${x+42} ${i < 2 ? 265 : 340} ${x+12} ${i < 2 ? 272 : 347}`} fill={ROSE} fillOpacity="0.2" /></g>)}
    <g className="fmm-cell-in fmm-delay-2"><circle cx="675" cy="175" r="48" fill={WHITE} stroke={N} strokeWidth="2" />{Array.from({length: 14},(_,i)=><Dot key={i} cx={645+(i%5)*16} cy={145+Math.floor(i/5)*18} r="2.5" fill={BLUE}/>)}</g>
    <circle cx="785" cy="175" r="48" fill={SKY} stroke={N} strokeWidth="2" />
    <L x="675" y="242" size="12" fill={BLUE}>golf ball</L><L x="785" y="242" size="12" fill={MUTED}>smooth ball</L>
    <path d="M650 285 Q730 205 810 330" fill="none" stroke={GREEN} strokeWidth="3" className="fmm-draw" /><path d="M770 285 Q810 250 842 335" fill="none" stroke={MUTED} strokeWidth="3" strokeDasharray="5 4" />
    <L x="730" y="370" size="12" fill={GREEN}>lower drag → longer range</L>
  </Scene>
}

/** Unit 8 — Lift grows, then separation brings stall. */
export function AerofoilLiftStallScene() {
  const states = [{x:95,a:'4°',s:'attached'},{x:270,a:'10°',s:'loaded'},{x:445,a:'15°',s:'trailing-edge sep.'},{x:620,a:'19°',s:'STALL'}]
  return <Scene caption="Lift rises with angle of attack until upper-surface separation causes stall">
    {states.map((q,i)=><g key={q.a} className={`fmm-cell-in fmm-delay-${i}`}>
      <g transform={`translate(${q.x},150) rotate(${i*4-6})`}><path d="M-55 0 Q-10 -19 57 0 Q-10 12 -55 0Z" fill={SKY} stroke={N} strokeWidth="2.2" />
      <path d="M-44 -6 Q0 -32 47 -5" fill="none" stroke={i<2?BLUE:ROSE} strokeWidth="2" strokeDasharray={i<2?'none':'5 3'} />
      {i>1 && <path d="M35 -4 Q82 -27 100 5 Q80 28 35 8Z" fill={ROSE} fillOpacity="0.16" />}</g>
      <L x={q.x} y="220" size="12" fill={i===3?RED:N}>{q.a}</L><L x={q.x} y="239" size="10" fill={i===3?RED:MUTED}>{q.s}</L>
    </g>)}
    <Axes x="90" y="440" w="410" h="160" xLabel="angle α" yLabel="Cₗ" />
    <Curve pts={[[95,400],[180,365],[270,325],[360,295],[430,310],[480,380]]} stroke={BLUE} width="4" className="fmm-draw" />
    <Dot cx="480" cy="380" r="6" fill={RED} className="fmm-pulse" /><L x="480" y="400" size="11" fill={RED}>stall</L>
    <Axes x="570" y="440" w="250" h="160" xLabel="angle α" yLabel="Cᴅ" />
    <Curve pts={[[575,410],[650,405],[710,390],[755,350],[815,285]]} stroke={ROSE} width="4" className="fmm-draw" />
    <L x="690" y="272" size="12" fill={ROSE}>drag rises sharply</L>
  </Scene>
}

/** Unit 9 — Streamlining exchanges pressure drag for wetted-area friction. */
function StreamliningTradeoffScene() {
  const forms = [
    {x:100, wake:70, p:92, f:12, d:'M-5 -38 L5 -38 L5 38 L-5 38Z'}, {x:255,wake:56,p:75,f:22,d:'M0 -38 A38 38 0 1 1 0 38 A38 38 0 1 1 0 -38Z'},
    {x:415,wake:38,p:42,f:38,d:'M-55 0 Q-6 -35 62 0 Q-6 35 -55 0Z'}, {x:575,wake:22,p:20,f:50,d:'M-67 0 Q-4 -34 75 0 Q-4 34 -67 0Z'}, {x:735,wake:12,p:10,f:61,d:'M-78 0 Q-4 -31 82 0 Q-4 31 -78 0Z'}]
  return <Scene caption="An optimum fineness ratio minimizes total drag">
    <L x="450" y="48" size="14" fill={BLUE}>increasing fineness ratio →</L>
    {forms.map((q,i)=><g key={q.x} className={`fmm-cell-in fmm-delay-${i}`}>
      <g transform={`translate(${q.x},140)`}><path d={q.d} fill={SKY} stroke={N} strokeWidth="2" /><path d={`M12 -${q.wake/2} Q${q.wake} 0 12 ${q.wake/2}Z`} fill={ROSE} fillOpacity="0.18" /></g>
      <L x={q.x} y="210" size="10" fill={MUTED}>wake width</L>
      <rect x={q.x-45} y="245" width="90" height="24" fill={SKY} rx="4" /><rect x={q.x-45} y="245" width={q.p*0.78} height="24" fill={ROSE} className="fmm-bar" /><rect x={q.x-45+q.p*0.78} y="245" width={q.f*0.58} height="24" fill={GREEN} className="fmm-bar" />
      <L x={q.x} y="288" size="10" fill={MUTED}>pressure + friction</L>
    </g>)}
    <Axes x="100" y="425" w="640" h="120" xLabel="fineness ratio" yLabel="total drag" />
    <Curve pts={[[110,325],[255,350],[415,370],[575,360],[735,335]]} stroke={BLUE} width="3.5" className="fmm-draw" /><Dot cx="415" cy="370" r="6" fill={GREEN} /><L x="415" y="396" size="11" fill={GREEN}>minimum</L>
    <Card x="755" y="300" w="125" h="108" title="Same drag" accent={PURP} lines={['streamlined strut','= cylinder at','1/10 thickness']} linesY="43" lineH="19" />
  </Scene>
}

/** Unit 10 — Fundamental dimensions assemble derived quantities. */
function DimensionalFormulaBuilderScene() {
  const tiles=[['velocity','LT⁻¹'],['acceleration','LT⁻²'],['force','MLT⁻²'],['pressure','ML⁻¹T⁻²'],['work','ML²T⁻²'],['power','ML²T⁻³'],['density','ML⁻³'],['viscosity','ML⁻¹T⁻¹'],['surface tension','MT⁻²'],['discharge','L³T⁻¹']]
  return <Scene caption="Dimensions are M, L, T combinations; units are merely their measures">
    {[['M',110,420,ROSE],['L',230,420,BLUE],['T',350,420,GREEN]].map(([z,x,y,c])=><Block key={z} x={x} y={y} w="70" h="52" label={z} stroke={c} fill={WHITE} labelFill={c} size="24" className="fmm-pulse" />)}
    {tiles.map((t,i)=>{const x=55+(i%5)*112,y=70+Math.floor(i/5)*132;return <g key={t[0]} className={`fmm-cell-in fmm-delay-${i%5}`}><Wire d={`M145 420 L${x+45} ${y+52}`} stroke={MUTED} width="1" opacity="0.35" /><Block x={x} y={y} w="96" h="58" label={t[0]} sub={t[1]} stroke={i%2?BLUE:PURP} fill={WHITE} size="11" /></g>})}
    <Card x="615" y="310" w="245" h="150" title="Dimension ≠ unit" accent={AMBER} lines={['Force: [F] = MLT⁻²','1 N  ·  1 dyne','1 lbf  ·  1 kgf','all share MLT⁻²']} linesY="48" lineH="25" />
  </Scene>
}

/** Unit 11 — Dimensional homogeneity accepts only balanced equations. */
function HomogeneityBalanceScene() {
  const stamp=(x,y,label,tone)=> <g><rect x={x} y={y} width="94" height="44" rx="7" fill={WHITE} stroke={tone} strokeWidth="2"/><M x={x+47} y={y+19} size="11" fill={N}>{label}</M><M x={x+47} y={y+35} size="10" fill={tone}>[L]</M></g>
  return <Scene caption="Every added term must carry the same dimensions">
    <L x="235" y="48" size="15" fill={GREEN}>Bernoulli: dimensions balance</L>
    <Wire d="M80 205 L400 205" stroke={N} width="5" /><Wire d="M240 205 L240 275" stroke={N} width="5" /><path d="M205 275 L275 275 L240 225Z" fill={MUTED}/>
    {stamp(70,135,'p/ρg',BLUE)}{stamp(190,135,'V²/2g',BLUE)}{stamp(310,135,'z',BLUE)}
    <L x="235" y="312" size="12" fill={GREEN}>✓ all terms have [L]</L>
    <g className="fmm-cell-in fmm-delay-2"><L x="675" y="48" size="15" fill={RED}>Corrupted equation</L><Wire d="M530 225 L830 185" stroke={RED} width="5" /><Wire d="M680 205 L680 275" stroke={N} width="5" /><path d="M645 275 L715 275 L680 225Z" fill={MUTED}/>{stamp(530,135,'p/ρg',BLUE)}{stamp(650,135,'V²',RED)}{stamp(770,135,'z',BLUE)}<L x="680" y="310" size="17" fill={RED}>REJECT: [L²] ≠ [L]</L></g>
    <Card x="190" y="360" w="520" h="95" title="Empirical constants hide dimensions" accent={PURP} lines={['Q = C√h  →  [C] depends on the unit system', 'Use a magnifier: stamp C before trusting the formula.']} linesY="48" lineH="27" />
  </Scene>
}

/** Unit 12 — Rayleigh method: collect M, L, T and solve the exponents. */
function RayleighExponentSolutionScene() {
  return <Scene caption="Three fundamental dimensions provide three exponent equations">
    <Block x="110" y="55" w="680" h="58" label="F = C ρᵃ Vᵇ Dᶜ" sub="unknown exponents:  a   b   c" stroke={BLUE} fill={WHITE} mono size="18" className="fmm-cell-in" />
    <Arr x1="450" y1="122" x2="450" y2="152" tone={BLUE} width="2" />
    <Block x="110" y="160" w="680" h="62" label="MLT⁻² = (ML⁻³)ᵃ (LT⁻¹)ᵇ (L)ᶜ" sub="replace each variable by its dimensions" stroke={PURP} fill={WHITE} mono size="15" className="fmm-cell-in fmm-delay-1" />
    {[['M: 1 = a',130,270,ROSE],['L: 1 = −3a+b+c',365,270,BLUE],['T: −2 = −b',600,270,GREEN]].map(([s,x,y,c],i)=><Block key={s} x={x} y={y} w="180" h="55" label={s} stroke={c} fill={WHITE} mono size="14" className={`fmm-cell-in fmm-delay-${i+2}`} />)}
    <Block x="175" y="355" w="550" h="56" label="a = 1,  b = 2,  c = 2" sub="F = C ρV²D²" stroke={GREEN} fill={WHITE} mono size="18" className="fmm-emerge" />
    <Card x="155" y="430" w="590" h="55" title="Limit" accent={RED} lines={['6 variables → 5 exponents but only M, L, T: use Buckingham Π.']} linesY="43" lineH="18" />
  </Scene>
}

/** Unit 13 — Buckingham Π reduces variables using a valid repeating set. */
function BuckinghamReductionScene() {
  const vars=['Δp','ρ','μ','V','D','g','σ']; const groups=['Π₁ = Δp/ρV²','Π₂ = μ/ρVD','Π₃ = gD/V²','Π₄ = σ/ρV²D']
  return <Scene caption="Seven variables − three dimensions = four Π groups">
    <Card x="55" y="65" w="175" h="250" title="7 variables" accent={BLUE} lines={vars} linesY="48" lineH="27" />
    <Arr x1="245" y1="190" x2="395" y2="190" tone={PURP} width="3" className="fmm-current-slow" /><L x="320" y="164" size="12" fill={PURP}>n − r = 7 − 3</L>
    <Card x="410" y="65" w="245" h="250" title="4 dimensionless groups" accent={GREEN} lines={groups} linesY="48" lineH="45" />
    <Card x="680" y="65" w="175" h="250" title="Repeating set" accent={AMBER} lines={['ρ  ✓ covers M,L,T','V  ✓ independent','D  ✓ independent','Δp  ✕ dependent','μ alone ✕ no M,L,T']} linesY="48" lineH="31" />
    <L x="450" y="365" size="14" fill={N}>First group working: Π₁ = Δp ρᵃVᵇDᶜ</L>
    <Block x="130" y="395" w="640" h="54" label="[Π₁] = 1  →  solve a = −1, b = −2, c = 0  →  Δp/(ρV²)" stroke={PURP} fill={WHITE} mono size="14" className="fmm-emerge" />
  </Scene>
}

/** Unit 14 — Dimensionless groups compare inertia against competing forces. */
function ForceRatioGroupFamilyScene() {
  const arms=[['Re','viscous','ρVD/μ',160,100,BLUE],['Fr','gravity','V/√gL',735,105,GREEN],['Ma','elastic','V/a',735,330,PURP],['We','surface tension','ρV²L/σ',160,340,AMBER],['Eu','pressure','Δp/ρV²',450,440,ROSE]]
  return <Scene caption="A dimensionless group is inertia force divided by a competing force">
    <Block x="350" y="205" w="200" h="80" label="INERTIA FORCE" sub="ρV²L²" stroke={N} fill={SKY} size="18" className="fmm-pulse" />
    {arms.map(([g,force,formula,x,y,c],i)=><g key={g} className={`fmm-cell-in fmm-delay-${i}`}><Wire d={`M450 245 L${x} ${y}`} stroke={c} width="3" marker={`url(#${markerFor(c)})`} /><Block x={x-70} y={y-34} w="140" h="68" label={`${g}: ${force}`} sub={formula} stroke={c} fill={WHITE} size="12" /><L x={x} y={y+55} size="10" fill={c}>{g==='Re'?'pipe':g==='Fr'?'ship wave':g==='Ma'?'nozzle shock':g==='We'?'droplet':'valve'}</L></g>)}
    <L x="450" y="495" size="12" fill={MUTED}>large ratio: competing force may be neglected · small ratio: it matters</L>
  </Scene>
}

/** Unit 15 — Similarity builds from geometry to kinematics to dynamics. */
function ThreeSimilaritiesLadderScene() {
  const rows=[['1  GEOMETRIC','all lengths: Lₘ/Lₚ = λ','same shape at every scale',BLUE],['2  KINEMATIC','velocities: Vₘ/Vₚ = constant','matching streamline patterns',GREEN],['3  DYNAMIC','forces: Fₘ/Fₚ = constant','match Re, Fr, Ma, We …',PURP]]
  return <Scene caption="Dynamic similarity requires kinematic similarity, which requires geometric similarity">
    <Wire d="M75 90 L75 420" stroke={MUTED} width="3" marker="url(#fmArr)" /><L x="48" y="260" size="11" fill={MUTED} anchor="middle">requires</L>
    {rows.map(([title,a,b,c],i)=>{const y=55+i*135;return <g key={title} className={`fmm-cell-in fmm-delay-${i}`}><rect x="115" y={y} width="710" height="105" rx="11" fill={WHITE} stroke={c} strokeWidth="2.3"/><rect x="115" y={y} width="710" height="30" rx="11" fill={c}/><L x="470" y={y+21} size="12.5" fill={WHITE}>{title}</L><path d={`M170 ${y+72} L250 ${y+72} L250 ${y+38} L170 ${y+38}Z`} fill={SKY} stroke={c} strokeWidth="2"/><path d={`M300 ${y+76} L430 ${y+76} L430 ${y+25} L300 ${y+25}Z`} fill={WHITE} stroke={c} strokeWidth="2"/><L x="525" y={y+55} size="14" fill={N} anchor="start">{a}</L><L x="525" y={y+82} size="12" fill={MUTED} anchor="start">{b}</L></g>})}
  </Scene>
}

/** Unit 16 — Ship model test separates and rescales residual resistance. */
function ShipModelFroudeWorkflowScene() {
  const node=(x,y,title,sub,tone,delay)=> <g className={`fmm-cell-in fmm-delay-${delay}`}><Block x={x} y={y} w="175" h="70" label={title} sub={sub} stroke={tone} fill={WHITE} size="13" /></g>
  return <Scene caption="Froude matching scales wave resistance; friction is recalculated at ship Reynolds number">
    {node(45,185,'MODEL in towing tank','Froude-matched speed',BLUE,0)}
    {node(275,70,'measured Rₘ','total resistance',PURP,1)}{node(275,290,'flat-plate friction','at model Re',GREEN,1)}
    {node(505,290,'residual Rᵣₘ','Rₘ − Rfₘ',AMBER,2)}{node(505,70,'scale residual','λ³ force ratio',AMBER,2)}
    {node(720,70,'ship friction Rfₛ','at ship Re',GREEN,3)}{node(720,290,'PREDICTED Rₛ','Rᵣₛ + Rfₛ',ROSE,4)}
    <Arr x1="220" y1="210" x2="270" y2="105" tone={PURP} width="2" /><Arr x1="220" y1="220" x2="270" y2="320" tone={GREEN} width="2" /><Arr x1="450" y1="325" x2="500" y2="325" tone={AMBER} width="2" /><Arr x1="590" y1="290" x2="590" y2="145" tone={AMBER} width="2" /><Arr x1="680" y1="105" x2="715" y2="105" tone={GREEN} width="2" /><Arr x1="810" y1="145" x2="810" y2="285" tone={ROSE} width="2" />
    <Card x="260" y="410" w="390" h="55" title="Scale effect" accent={RED} lines={['Residual extrapolation is the principal uncertainty.']} linesY="43" lineH="18" />
  </Scene>
}

/** Unit 1 — Boundary layer development along a flat plate */
function BoundaryLayerGrowthScene() {
  /* Plate runs from x=80 to x=820, y=340 is the wall surface.
     Boundary layer edge traced above it; velocity profiles at 5 stations. */
  const wall = 340
  const plateL = 80
  const plateR = 820
  const transX = 480 // transition zone centre

  /* BL edge curve: grows parabolically in laminar, jumps in turbulent */
  const blEdge = [
    [80, wall], [140, wall - 12], [200, wall - 22], [280, wall - 36],
    [360, wall - 50], [420, wall - 60], [460, wall - 66],
    /* transition zone */
    [500, wall - 72], [540, wall - 80],
    /* turbulent — steeper growth */
    [580, wall - 92], [640, wall - 112], [700, wall - 130],
    [760, wall - 148], [820, wall - 164]
  ]

  /* Velocity profiles at 5 stations */
  const stations = [
    { x: 160, h: 18, turb: false },
    { x: 280, h: 36, turb: false },
    { x: 420, h: 60, turb: false },
    { x: 600, h: 96, turb: true },
    { x: 760, h: 148, turb: true }
  ]

  function profilePts(sx, sh, isTurb) {
    const pts = []
    const steps = 10
    for (let i = 0; i <= steps; i++) {
      const eta = i / steps
      /* laminar: parabolic u/U = 2η - η²; turbulent: u/U = η^(1/7) */
      const uRatio = isTurb ? Math.pow(eta, 1 / 7) : 2 * eta - eta * eta
      pts.push([sx + uRatio * 40, wall - eta * sh])
    }
    return pts
  }

  return (
    <Scene caption="Boundary layer grows from zero at the leading edge">
      {/* Free-stream arrows above BL */}
      {[120, 240, 400, 560, 720].map((ax, i) => (
        <g key={ax} className={`fmm-cell-in fmm-delay-${Math.min(i, 4)}`}>
          <Arr x1={ax} y1={80} x2={n(ax) + 60} y2={80} tone={BLUE} width={2} />
        </g>
      ))}
      <L x={450} y={68} size={13} fill={BLUE}>U∞ (inviscid, uniform)</L>

      {/* Flat plate */}
      <rect x={plateL} y={wall} width={n(plateR) - n(plateL)} height={6} fill={MUTED} rx="2" />
      <L x={80} y={wall + 26} size={12} fill={N} anchor="start">leading edge</L>

      {/* BL edge curve */}
      <g className="fmm-draw">
        <Curve pts={blEdge} stroke={AMBER} width={2.4} dash="6 4" />
      </g>
      <L x={825} y={n(wall) - 168} size={11} fill={AMBER} anchor="start">δ(x)</L>

      {/* Transition zone hatching */}
      <g className="fmm-cell-in fmm-delay-2">
        <rect x={n(transX) - 30} y={wall - 74} width={60} height={74} fill={PURP} fillOpacity="0.12" />
        {[0, 1, 2, 3, 4, 5].map(i => (
          <line key={i}
            x1={n(transX) - 30 + i * 12} y1={wall}
            x2={n(transX) - 20 + i * 12} y2={wall - 74}
            stroke={PURP} strokeWidth="1" opacity="0.4" />
        ))}
        <L x={transX} y={wall - 82} size={11} fill={PURP}>transition</L>
      </g>

      {/* Region labels */}
      <L x={260} y={wall + 48} size={13} fill={GREEN}>LAMINAR</L>
      <L x={660} y={wall + 48} size={13} fill={RED}>TURBULENT</L>

      {/* Velocity profiles at five stations */}
      {stations.map((st, i) => (
        <g key={st.x} className={`fmm-cell-in fmm-delay-${Math.min(i, 4)}`}>
          {/* baseline at wall */}
          <Wire d={`M${st.x} ${wall} L${st.x} ${wall - st.h}`} stroke={MUTED} width={1} dash="3 3" />
          <Curve pts={profilePts(st.x, st.h, st.turb)} stroke={st.turb ? RED : GREEN} width={2.2} />
          <Dot cx={st.x} cy={wall} r={3} fill={N} />
        </g>
      ))}

      {/* Reynolds number scale along plate */}
      <g className="fmm-cell-in fmm-delay-3">
        <Wire d={`M${plateL} ${wall + 68} L${plateR} ${wall + 68}`} stroke={MUTED} width={1.5} />
        <L x={260} y={wall + 84} size={11} fill={MUTED}>Rex increasing →</L>
        <Wire d={`M${transX} ${wall + 62} L${transX} ${wall + 74}`} stroke={PURP} width={2} />
        <L x={transX} y={wall + 98} size={11} fill={PURP}>Re_cr ≈ 5×10⁵</L>
      </g>
    </Scene>
  )
}

/** Unit 2 — Three boundary layer thicknesses */
function ThreeThicknessesScene() {
  /* Left panel: displacement thickness. Right panel: momentum thickness. */
  const profX = 80   // profile left edge
  const profW = 120  // profile width for freestream
  const wallY = 380  // wall y position
  const blH = 200    // BL height
  const topY = wallY - blH // top of the freestream

  /* Laminar parabolic profile points */
  function blProfile(offsetX) {
    const pts = []
    for (let i = 0; i <= 20; i++) {
      const eta = i / 20
      const u = 2 * eta - eta * eta
      pts.push([n(offsetX) + u * profW, wallY - eta * blH])
    }
    return pts
  }

  return (
    <Scene caption="δ is arbitrary; δ* is what the outer flow sees; θ is what the drag depends on">
      {/* === Left half: displacement thickness === */}
      <g className="fmm-cell-in fmm-delay-0">
        {/* Freestream rectangle */}
        <rect x={profX} y={topY} width={profW} height={blH} fill={SKY} fillOpacity="0.3" stroke={MUTED} strokeWidth="1" strokeDasharray="4 3" />
        {/* BL velocity profile */}
        <Curve pts={blProfile(profX)} stroke={BLUE} width={2.5} />
        {/* Shaded deficit area between freestream and profile */}
        <path
          d={`M${n(profX) + profW} ${topY} L${n(profX) + profW} ${wallY} L${profX} ${wallY} ${blProfile(profX).map(([px, py], i) => `${i === 0 ? 'L' : 'L'}${px} ${py}`).join(' ')} Z`}
          fill={BLUE} fillOpacity="0.15"
        />
        <L x={n(profX) + 60} y={n(topY) - 14} size={12} fill={N}>Velocity profile</L>
        {/* Wall */}
        <rect x={profX} y={wallY} width={profW} height={4} fill={MUTED} />
        {/* 99% marker */}
        <Wire d={`M${profX} ${n(topY) + 2} L${n(profX) + profW + 20} ${n(topY) + 2}`} stroke={MUTED} width={1.2} dash="4 3" />
        <L x={n(profX) + profW + 24} y={n(topY) + 6} size={10} fill={MUTED} anchor="start">u = 0.99U∞ → δ</L>
      </g>

      {/* Displacement thickness rectangle */}
      <g className="fmm-cell-in fmm-delay-1">
        <rect x={260} y={topY} width={36} height={blH} fill={AMBER} fillOpacity="0.25" stroke={AMBER} strokeWidth="2" />
        <Arr x1={260} y1={n(topY) + blH / 2} x2={296} y2={n(topY) + blH / 2} tone={AMBER} width={2} />
        <L x={278} y={n(topY) - 14} size={13} fill={AMBER}>δ*</L>
        <L x={278} y={n(topY) - 30} size={11} fill={N}>displacement</L>
        {/* Arrow showing U∞ × δ* = deficit area */}
        <Wire d="M220 270 Q240 260 258 270" stroke={MUTED} width={1.2} dash="3 3" />
        <L x={240} y={254} size={9} fill={MUTED}>same area</L>
      </g>

      {/* === Right half: momentum thickness === */}
      <g className="fmm-cell-in fmm-delay-2">
        {/* BL profile repeated */}
        <Curve pts={blProfile(380)} stroke={BLUE} width={2.5} />
        <rect x={380} y={wallY} width={profW} height={4} fill={MUTED} />
        {/* Momentum deficit shading — u(U∞-u) area */}
        <path
          d={`M${380 + profW} ${topY} L${380 + profW} ${wallY} L${380} ${wallY} ${blProfile(380).map(([px, py]) => `L${px} ${py}`).join(' ')} Z`}
          fill={GREEN} fillOpacity="0.12"
        />
        <L x={440} y={n(topY) - 14} size={12} fill={N}>u(U∞−u) deficit</L>
      </g>

      {/* Momentum thickness rectangle */}
      <g className="fmm-cell-in fmm-delay-3">
        <rect x={560} y={topY} width={24} height={blH} fill={GREEN} fillOpacity="0.25" stroke={GREEN} strokeWidth="2" />
        <Arr x1={560} y1={n(topY) + blH / 2} x2={584} y2={n(topY) + blH / 2} tone={GREEN} width={2} />
        <L x={572} y={n(topY) - 14} size={13} fill={GREEN}>θ</L>
        <L x={572} y={n(topY) - 30} size={11} fill={N}>momentum</L>
        {/* Note: θ < δ* always */}
        <L x={572} y={n(topY) - 46} size={10} fill={MUTED}>θ &lt; δ* always</L>
      </g>

      {/* Shape factor panel */}
      <g className="fmm-cell-in fmm-delay-4">
        <Card x={660} y={topY - 16} w={210} h={140} title="Shape factor H = δ*/θ" accent={PURP}
          lines={['Laminar (Blasius): H ≈ 2.59', 'Turbulent: H ≈ 1.3–1.4', 'Separation: H ≈ 3.5+']}
          linesY={50} lineH={28} />
      </g>
    </Scene>
  )
}

/** Unit 3 — Momentum integral equation control volume */
function MomentumIntegralCVScene() {
  /* CV box drawn over plate segment between x1 and x2 */
  const cvL = 200
  const cvR = 560
  const wallY = 380
  const cvTop = 160
  const cvW = n(cvR) - n(cvL)
  const cvH = n(wallY) - n(cvTop)

  /* Laminar profile at two stations */
  function profileAt(sx, h) {
    const pts = []
    for (let i = 0; i <= 12; i++) {
      const eta = i / 12
      const u = 2 * eta - eta * eta
      pts.push([sx + u * 36, wallY - eta * h])
    }
    return pts
  }

  return (
    <Scene caption="Assume a profile, substitute, and thickness + drag both fall out">
      {/* Flat plate */}
      <rect x={100} y={wallY} width={560} height={5} fill={MUTED} rx="2" />

      {/* Control volume box */}
      <g className="fmm-cell-in fmm-delay-0">
        <rect x={cvL} y={cvTop} width={cvW} height={cvH} fill={SKY} fillOpacity="0.15" stroke={BLUE} strokeWidth="2.5" strokeDasharray="8 4" rx="4" />
        <L x={n(cvL) + cvW / 2} y={n(cvTop) - 10} size={12} fill={BLUE}>Control Volume</L>
      </g>

      {/* Inlet profile (station 1) */}
      <g className="fmm-cell-in fmm-delay-1">
        <Curve pts={profileAt(cvL, 140)} stroke={GREEN} width={2.5} />
        <Arr x1={n(cvL) - 30} y1={220} x2={cvL} y2={220} tone={GREEN} width={2} />
        <L x={n(cvL) - 34} y={216} size={11} fill={GREEN} anchor="end">ṁ₁</L>
      </g>

      {/* Exit profile (station 2 — thicker) with growth shading */}
      <g className="fmm-cell-in fmm-delay-1">
        <Curve pts={profileAt(cvR, 180)} stroke={AMBER} width={2.5} />
        <Arr x1={cvR} y1={220} x2={n(cvR) + 34} y2={220} tone={AMBER} width={2} />
        <L x={n(cvR) + 38} y={216} size={11} fill={AMBER} anchor="start">ṁ₂</L>
        {/* Growth shading between the two edges */}
        <polygon
          points={`${cvL},${wallY - 140} ${cvR},${wallY - 180} ${cvR},${cvTop} ${cvL},${cvTop}`}
          fill={PURP} fillOpacity="0.08"
        />
      </g>

      {/* Wall shear stress along bottom */}
      <g className="fmm-cell-in fmm-delay-2">
        {[0, 1, 2, 3, 4, 5].map(i => {
          const ax = n(cvL) + 20 + i * 56
          return <Arr key={i} x1={ax} y1={wallY} x2={n(ax) + 30} y2={wallY} tone={RED} width={1.8} />
        })}
        <L x={n(cvL) + cvW / 2} y={wallY + 22} size={12} fill={RED}>τ_w (wall shear stress)</L>
      </g>

      {/* Top inflow to satisfy continuity */}
      <g className="fmm-cell-in fmm-delay-2">
        <Arr x1={n(cvL) + cvW / 2} y1={n(cvTop) - 30} x2={n(cvL) + cvW / 2} y2={cvTop} tone={MUTED} width={2} />
        <L x={n(cvL) + cvW / 2} y={n(cvTop) - 38} size={11} fill={MUTED}>entrainment</L>
      </g>

      {/* Derivation ledger — right panel */}
      <g className="fmm-cell-in fmm-delay-3">
        <Card x={600} y={100} w={280} h={170} title="Momentum Integral" accent={BLUE}
          lines={[
            'τ_w = ρU²∞ dθ/dx',
            'cf = 2 dθ/dx',
            'Assume: u/U = a₀+a₁η+a₂η²',
            'Solve for δ(x), cf(x)'
          ]}
          linesY={50} lineH={30} />
      </g>

      {/* Polynomial substitution result */}
      <g className="fmm-emerge fmm-delay-4">
        <Card x={600} y={290} w={280} h={108} title="Result (parabolic)" accent={GREEN}
          lines={[
            'δ/x = 5.48 / √Rex',
            'cf = 0.730 / √Rex'
          ]}
          linesY={52} lineH={26} foot="Within ~3% of exact (Blasius)" footTone={MUTED} />
      </g>
    </Scene>
  )
}

/** Unit 4 — Boundary layer separation and its control */
export function SeparationProfileScene() {
  /* Curved surface from x=60 to x=540. Crest near x=240. */
  const surfacePts = [
    [60, 380], [120, 340], [180, 310], [240, 300], [300, 310],
    [360, 330], [420, 356], [480, 376], [540, 390]
  ]
  const surfaceD = surfacePts.map(([px, py], i) =>
    `${i === 0 ? 'M' : 'L'}${px} ${py}`
  ).join(' ')

  /* Pressure trace (below surface) */
  const pressurePts = [
    [60, 440], [120, 430], [180, 420], [240, 412],
    [300, 420], [360, 434], [420, 448], [480, 456], [540, 460]
  ]

  /* Six velocity profile stations */
  const profiles = [
    { x: 120, wY: 340, h: 40, status: 'healthy' },
    { x: 200, wY: 308, h: 46, status: 'healthy' },
    { x: 280, wY: 306, h: 42, status: 'thinning' },
    { x: 340, wY: 322, h: 38, status: 'thinning' },
    { x: 400, wY: 348, h: 34, status: 'separation' },
    { x: 460, wY: 370, h: 30, status: 'reversed' }
  ]

  function profilePts(p) {
    const pts = []
    for (let i = 0; i <= 10; i++) {
      const eta = i / 10
      let u
      if (p.status === 'healthy') u = Math.pow(eta, 0.4)
      else if (p.status === 'thinning') u = Math.pow(eta, 0.7)
      else if (p.status === 'separation') u = eta  // linear, du/dy=0 at wall is zero
      else u = -0.3 * Math.sin(Math.PI * eta * 0.5) + eta * 1.1 // reversed near wall
      pts.push([p.x + u * 28, p.wY - eta * p.h])
    }
    return pts
  }

  return (
    <Scene caption="Separation: wall gradient → zero, then reverse flow lifts the layer">
      {/* Curved surface */}
      <Wire d={surfaceD} stroke={N} width={3} />
      {/* Hatching below surface */}
      {surfacePts.filter((_, i) => i < surfacePts.length - 1).map(([px, py], i) => (
        <line key={i} x1={px} y1={n(py) + 3} x2={n(px) + 8} y2={n(py) + 14} stroke={MUTED} strokeWidth="1" opacity="0.4" />
      ))}

      {/* Pressure trace */}
      <g className="fmm-cell-in fmm-delay-0">
        <Curve pts={pressurePts} stroke={TEAL} width={2} dash="5 3" />
        <L x={100} y={456} size={11} fill={TEAL} anchor="start">p(x)</L>
        <L x={170} y={410} size={10} fill={GREEN}>favourable</L>
        <L x={410} y={468} size={10} fill={RED}>adverse ∂p/∂x &gt; 0</L>
      </g>

      {/* Velocity profiles at six stations */}
      {profiles.map((p, i) => {
        const colour = p.status === 'healthy' ? GREEN
          : p.status === 'thinning' ? AMBER
          : p.status === 'separation' ? RED
          : PURP
        return (
          <g key={p.x} className={`fmm-cell-in fmm-delay-${Math.min(i, 4)}`}>
            <Curve pts={profilePts(p)} stroke={colour} width={2} />
            <Dot cx={p.x} cy={p.wY} r={3} fill={colour} />
          </g>
        )
      })}

      {/* Separation point marker */}
      <g className="fmm-emerge fmm-delay-3">
        <L x={400} y={n(348) - 44} size={11} fill={RED}>sep. point</L>
        <L x={400} y={n(348) - 56} size={10} fill={RED}>∂u/∂y|_w = 0</L>
        <Wire d="M400 336 L400 346" stroke={RED} width={1.5} />
      </g>

      {/* Wake region behind separation */}
      <g className="fmm-cell-in fmm-delay-4">
        <path d="M420 350 Q480 340 540 360 L540 396 Q480 400 420 370 Z" fill={RED} fillOpacity="0.1" />
        <L x={490} y={382} size={11} fill={RED}>wake</L>
      </g>

      {/* Control remedies panel — right side */}
      <g className="fmm-cell-in fmm-delay-4">
        <Card x={590} y={60} w={290} h={180} title="Separation Control" accent={BLUE}
          lines={[
            '1. Trip to turbulent → more momentum',
            '2. Streamline → gentler deceleration',
            '3. Suction → remove tired fluid',
            '4. Blowing → re-energise near wall'
          ]}
          linesY={48} lineH={32} />
      </g>

      {/* Flow direction arrows above */}
      {[80, 180, 300].map((ax, i) => (
        <g key={ax} className={`fmm-cell-in fmm-delay-${Math.min(i, 4)}`}>
          <Arr x1={ax} y1={260} x2={n(ax) + 46} y2={260} tone={BLUE} width={2} />
        </g>
      ))}
      <L x={200} y={248} size={12} fill={BLUE}>U∞ →</L>
    </Scene>
  )
}


/* ── Module 5 ────────────────────────────────────────────────────────── */


export function ThermodynamicToolkitPanelScene() {
  const cells = [
    ['perfect gas', 'p = ρRT', 'sound', BLUE], ['enthalpy', 'h = u + pv', 'stagnation T', ROSE],
    ['specific heats', 'cp − cv = R; γ = cp/cv', 'area relation', PURP],
    ['isentropic', 'p/ρᵞ = const; Tρ¹⁻ᵞ = const', 'nozzle', GREEN],
    ['entropy', 'Δs = cp ln(T₂/T₁) − R ln(p₂/p₁)', 'shock', AMBER],
  ]
  return <Scene caption="Thermodynamic toolkit → every later compressible-flow result">
    <L x="42" y="42" anchor="start" size="20" fill={N}>THERMODYNAMIC TOOLKIT</L>
    {cells.map(([name, eq, use, tone], i) => { const y = 66 + i * 79; return <g key={name}>
      <Block x="38" y={y} w="422" h="59" label={name} sub={eq} stroke={tone} fill={WHITE} className={`fmm-cell-in fmm-delay-${i}`} mono />
      <Wire d={`M460 ${y + 29} C540 ${y + 29}, 564 ${y + 29}, 628 ${y + 29}`} stroke={tone} width="2.4" className="fmm-draw" marker={`url(#${markerFor(tone)})`} />
      <Block x="642" y={y + 5} w="205" h="49" label={use} sub="used later" stroke={tone} fill={SKY} className={`fmm-cell-in fmm-delay-${i}`} />
    </g> })}
  </Scene>
}

export function SoundWaveControlVolumeScene() {
  return <Scene caption="Weak pressure wave: a = √(γRT), set by temperature—not pressure">
    <L x="38" y="38" anchor="start" size="19">1. WAVE IN STILL GAS</L>
    <rect x="36" y="58" width="388" height="112" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2" />
    <Wire d="M392 66 L392 162" stroke={ROSE} width="3" className="fmm-wave-shift" />
    <L x="296" y="90" size="14" fill={ROSE}>p + dp, ρ + dρ, T + dT</L><L x="152" y="136" size="14" fill={MUTED}>still gas</L>
    <Wire d="M370 50 L86 50" stroke={BLUE} width="2.5" className="fmm-current-rev" marker="url(#fmArrB)" /><M x="250" y="43" fill={BLUE}>wave speed a</M>
    <L x="478" y="38" anchor="start" size="19">2. WAVE-RIDING CONTROL VOLUME</L>
    <rect x="474" y="58" width="386" height="112" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2" />
    <Wire d="M492 114 L594 114" stroke={TEAL} width="3" className="fmm-current" marker="url(#fmArrT)" /><M x="540" y="98" fill={TEAL}>in: a</M>
    <Wire d="M727 114 L842 114" stroke={TEAL} width="3" className="fmm-current" marker="url(#fmArrT)" /><M x="782" y="98" fill={TEAL}>out: a − du</M>
    <Wire d="M650 65 L650 163" stroke={ROSE} width="3" /><L x="668" y="151" size="12" fill={ROSE} anchor="start">front</L>
    <Block x="52" y="194" w="350" h="72" label="continuity" sub="ρa = (ρ + dρ)(a − du)" stroke={BLUE} fill={WHITE} mono />
    <Block x="498" y="194" w="350" h="72" label="momentum" sub="dp = ρa du" stroke={TEAL} fill={WHITE} mono />
    <Wire d="M402 230 L496 230" stroke={PURP} width="2.5" marker="url(#fmArrP)" className="fmm-draw" /><Block x="296" y="286" w="310" h="52" label="a² = (∂p/∂ρ)s = γRT" stroke={PURP} fill={SKY} mono />
    <L x="38" y="375" anchor="start" size="18">TEMPERATURE DEPENDENCE (air)</L>
    <Axes x="90" y="462" w="720" h="68" xLabel="temperature °C" yLabel="a m/s" tickLabels={[[150,'−50'],[350,'0'],[550,'25'],[750,'50']]} />
    <Curve pts={[[150,447],[350,429],[550,420],[750,409]]} stroke={BLUE} width="3" className="fmm-draw" />
    {[[150,'303'],[350,'331'],[550,'347'],[750,'361']].map(([x,t],i)=><g key={t}><Dot cx={x} cy={447-i*0 + ([0,18,27,38][i])} r="4" fill={BLUE} className="fmm-pulse" /><M x={x} y={392} fill={MUTED}>{i % 2 ? 'p = 0.8 bar' : 'p = 1.4 bar'}</M></g>)}
    <L x="822" y="420" anchor="end" size="12" fill={GREEN}>pressure changes: no effect</L>
  </Scene>
}

export function MachConeFourSpeedsScene() {
  const panels = [['M = 0',110,'stationary'],['M < 1',330,'subsonic'],['M = 1',550,'sonic'],['M > 1',770,'supersonic']]
  return <Scene caption="Mach number controls whether disturbances can reach ahead of a body">
    {panels.map(([mach,cx,kind], i) => <g key={mach}>
      <rect x={cx-95} y="52" width="190" height="350" rx="12" fill={WHITE} stroke={i===3?ROSE:BLUE} strokeWidth="2" />
      <L x={cx} y="80" size="17" fill={i===3?ROSE:N}>{mach}</L><L x={cx} y="101" size="12" fill={MUTED}>{kind}</L>
      {i===0 && [32,58,84].map(r=><circle key={r} cx={cx} cy="230" r={r} fill="none" stroke={BLUE} strokeWidth="2" className="fmm-pulse" />)}
      {i===1 && [[cx-32,48],[cx-5,72],[cx+21,94]].map(([x,r])=><circle key={r} cx={x} cy="230" r={r} fill="none" stroke={TEAL} strokeWidth="2" className="fmm-pulse" />)}
      {i===2 && [40,72,104].map((r,j)=><path key={r} d={`M${cx} ${230-r} A${r} ${r} 0 0 0 ${cx} ${230+r}`} fill="none" stroke={AMBER} strokeWidth="2.3" className="fmm-draw" />)}
      {i===3 && <><path d={`M${cx+35} 230 L${cx-74} 120 M${cx+35} 230 L${cx-74} 340`} stroke={ROSE} strokeWidth="3" fill="none" className="fmm-draw" /><path d={`M${cx-74} 120 L${cx-74} 340 L${cx-94} 340 L${cx-94} 120 Z`} fill={SKY} /><L x={cx-80} y="370" size="11" fill={ROSE}>silence</L><Wire d={`M${cx+35} 230 L${cx-28} 230`} stroke={ROSE} marker="url(#fmArrRo)" /><M x={cx-21} y="216" fill={ROSE}>μ</M></>}
      <Dot cx={i===0?cx:cx+35} cy="230" r="7" fill={N} className="fmm-pulse" /><L x={cx} y="385" size="12" fill={MUTED}>sound pulses</L>
    </g>)}
    <L x="450" y="445" size="17" fill={N}>Mach cone: sin μ = 1/M</L><L x="450" y="474" size="14" fill={MUTED}>Outside the cone, the body’s approach is unknown.</L>
  </Scene>
}

export function AdiabaticVersusIsentropicVennScene() {
  return <Scene caption="Adiabatic includes shocks; only reversible adiabatic flow is isentropic">
    <rect x="45" y="48" width="505" height="300" rx="34" fill={SKY} stroke={AMBER} strokeWidth="3" className="fmm-draw" />
    <L x="75" y="80" anchor="start" size="20" fill={AMBER}>ADIABATIC</L><L x="75" y="105" anchor="start" size="13" fill={MUTED}>T₀ conserved</L>
    <rect x="85" y="128" width="270" height="176" rx="28" fill={WHITE} stroke={GREEN} strokeWidth="3" className="fmm-cell-in" />
    <L x="220" y="160" size="19" fill={GREEN}>ISENTROPIC</L><L x="220" y="184" size="13" fill={MUTED}>T₀ and p₀ conserved</L>
    <path d="M125 244 L210 227 L210 261 Z" fill={SKY} stroke={BLUE} strokeWidth="2" /><Wire d="M118 244 L205 244" stroke={BLUE} className="fmm-current" marker="url(#fmArrB)" /><L x="166" y="285" size="12" fill={BLUE}>smooth nozzle</L>
    <Wire d="M400 232 L400 292" stroke={ROSE} width="5" /><Wire d="M370 260 L430 260" stroke={N} className="fmm-current" marker="url(#fmArr)" /><L x="438" y="285" size="12" fill={ROSE} anchor="start">normal shock</L>
    <rect x="615" y="145" width="218" height="80" rx="12" fill={WHITE} stroke={ROSE} strokeWidth="2" /><Wave x="630" y="185" w="150" amp="10" stroke={ROSE} className="fmm-wave-shift" /><L x="724" y="212" size="12" fill={ROSE}>heated duct (outside)</L>
    <L x="412" y="125" anchor="start" size="14" fill={AMBER}>adiabatic but irreversible</L>
    <L x="55" y="386" anchor="start" size="17">PROPERTY TRACKS ACROSS A SHOCK</L>
    <M x="80" y="423" anchor="start" fill={BLUE}>T₀</M><Curve pts={[[130,418],[420,418],[720,418]]} stroke={BLUE} width="3" className="fmm-draw" /><L x="748" y="423" anchor="start" size="12" fill={BLUE}>flat</L>
    <M x="80" y="468" anchor="start" fill={ROSE}>p₀</M><Curve pts={[[130,463],[420,463],[430,484],[720,484]]} stroke={ROSE} width="3" className="fmm-draw" /><Wire d="M425 403 L425 490" stroke={N} dash="5 5" /><L x="748" y="489" anchor="start" size="12" fill={ROSE}>drops</L>
  </Scene>
}

export function StagnationReferenceStateMapScene() {
  return <Scene caption="Stagnation properties are the fixed isentropic reference state">
    <L x="38" y="38" anchor="start" size="19">VARYING-AREA DUCT: static values vary, total values stay fixed</L>
    <path d="M55 160 L230 160 L340 205 L490 205 L610 145 L850 145 L850 292 L610 292 L490 232 L340 232 L230 277 L55 277 Z" fill={WHITE} stroke={N} strokeWidth="2.5" />
    <Wire d="M75 218 L830 218" stroke={BLUE} width="3" className="fmm-current" marker="url(#fmArrB)" />
    <Curve pts={[[65,120],[850,120]]} stroke={ROSE} width="3" className="fmm-draw" /><L x="840" y="112" anchor="end" size="13" fill={ROSE}>p₀ constant</L>
    <Curve pts={[[65,95],[850,95]]} stroke={AMBER} width="3" className="fmm-draw" /><L x="840" y="87" anchor="end" size="13" fill={AMBER}>T₀ constant</L>
    <Curve pts={[[75,252],[240,240],[410,264],[610,225],[825,250]]} stroke={ROSE} width="3" className="fmm-draw" /><Curve pts={[[75,236],[240,248],[410,220],[610,256],[825,230]]} stroke={AMBER} width="3" className="fmm-draw" />
    {[[180,'M=.3'],[420,'M=1.0'],[690,'M=2.1']].map(([x,label])=><g key={label}><Wire d={`M${x} 120 L${x} 238`} stroke={MUTED} dash="4 5" /><L x={x} y="315" size="12" fill={PURP}>{label}</L><L x={x} y="337" size="11" fill={MUTED}>dynamic gap</L></g>)}
    <L x="55" y="370" anchor="start" size="18">RATIOS AGAINST MACH NUMBER</L><Axes x="105" y="469" w="700" h="76" xLabel="Mach number M" yLabel="total/static" tickLabels={[[105,'0'],[338,'1'],[571,'2'],[805,'3']]} />
    <Curve pts={[[105,462],[338,445],[571,402],[805,365]]} stroke={AMBER} width="3" className="fmm-draw" /><Curve pts={[[105,462],[338,426],[571,371],[805,330]]} stroke={ROSE} width="3" className="fmm-draw" />
    <L x="815" y="334" anchor="start" size="12" fill={ROSE}>p₀/p</L><L x="815" y="367" anchor="start" size="12" fill={AMBER}>T₀/T</L>
  </Scene>
}

export function CriticalRatioNozzleGaugeScene() {
  return <Scene caption="At pb/p₀ = 0.528, the throat becomes sonic and mass flow chokes">
    <L x="45" y="42" anchor="start" size="20">CONVERGING NOZZLE + BACK-PRESSURE GAUGE</L>
    <path d="M48 150 L260 150 L420 205 L420 275 L260 330 L48 330 Z" fill={WHITE} stroke={BLUE} strokeWidth="3" /><Wire d="M70 240 L405 240" stroke={BLUE} width="4" className="fmm-current" marker="url(#fmArrB)" /><L x="330" y="190" size="13" fill={BLUE}>throat</L>
    <circle cx="620" cy="226" r="124" fill={WHITE} stroke={N} strokeWidth="3" /><path d="M520 274 A112 112 0 0 1 720 274" fill="none" stroke={MUTED} strokeWidth="5" />
    <Wire d="M620 226 L548 292" stroke={RED} width="4" className="fmm-needle" /><Dot cx="620" cy="226" r="8" fill={RED} /><M x="620" y="371" size="18" fill={RED}>0.528</M><L x="620" y="400" size="13" fill={MUTED}>critical pb / p₀</L>
    {[[75,'pb/p₀ > .528','subsonic exit',BLUE],[225,'pb/p₀ = .528','M = 1 at throat',RED],[375,'pb/p₀ < .528','flow rate frozen',GREEN]].map(([y,a,b,t])=><g key={a}><rect x="775" y={y} width="108" height="96" rx="10" fill={WHITE} stroke={t} strokeWidth="2" /><L x="829" y={y+28} size="11" fill={t}>{a}</L><L x="829" y={y+52} size="11" fill={N}>{b}</L></g>)}
    <Block x="68" y="412" w="450" h="68" label="critical ratios for air (γ = 1.4)" sub="T*/T₀ = .833     p*/p₀ = .528     ρ*/ρ₀ = .634" stroke={PURP} fill={SKY} mono />
  </Scene>
}

export function AreaVelocitySignReversalScene() {
  const cells = [[65,75,'SUBSONIC','converging','accelerates','NOZZLE','M² − 1 < 0',BLUE],[475,75,'SUBSONIC','diverging','decelerates','DIFFUSER','M² − 1 < 0',TEAL],[65,250,'SUPERSONIC','converging','decelerates','DIFFUSER','M² − 1 > 0',AMBER],[475,250,'SUPERSONIC','diverging','accelerates','NOZZLE','M² − 1 > 0',ROSE]]
  return <Scene caption="Area–velocity relation reverses sign across Mach 1">
    {cells.map(([x,y,reg,shape,act,dev,sign,tone])=><g key={`${reg}-${shape}`}><rect x={x} y={y} width="350" height="145" rx="12" fill={WHITE} stroke={tone} strokeWidth="2" className="fmm-cell-in" /><L x={x+20} y={y+25} anchor="start" size="13" fill={tone}>{reg}</L><M x={x+330} y={y+25} anchor="end" fill={MUTED}>{sign}</M>
      <path d={shape==='converging'?`M${x+38} ${y+56} L${x+160} ${y+80} L${x+280} ${y+56} M${x+38} ${y+112} L${x+160} ${y+88} L${x+280} ${y+112}`:`M${x+38} ${y+80} L${x+160} ${y+56} L${x+280} ${y+80} M${x+38} ${y+88} L${x+160} ${y+112} L${x+280} ${y+88}`} fill="none" stroke={N} strokeWidth="2.5" />
      <Wire d={`M${x+65} ${y+84} L${x+255} ${y+84}`} stroke={tone} width="3" className="fmm-current" marker={`url(#${markerFor(tone)})`} /><L x={x+175} y={y+136} size="12" fill={tone}>{act} → {dev}</L></g>)}
    <path d="M105 455 L320 455 L450 420 L580 455 L795 455 M105 492 L320 492 L450 510 L580 492 L795 492" fill="none" stroke={N} strokeWidth="2.5" /><Curve pts={[[115,477],[330,462],[450,456],[575,436],[785,415]]} stroke={PURP} width="3" className="fmm-draw" /><Wire d="M450 410 L450 510" stroke={RED} dash="5 5" /><L x="450" y="405" size="13" fill={RED}>throat: M = 1</L><M x="715" y="422" fill={PURP}>Mach rises</M>
  </Scene>
}

export function ChokingMassFlowPlateauScene() {
  return <Scene caption="Once the exit is sonic, reducing downstream pressure cannot increase mass flow">
    <L x="35" y="40" anchor="start" size="19">CONVERGING NOZZLE WITH THROTTLE</L><path d="M42 115 L195 115 L338 180 L338 260 L195 325 L42 325 Z" fill={WHITE} stroke={BLUE} strokeWidth="3" /><Wire d="M65 220 L330 220" stroke={BLUE} width="4" className="fmm-current" marker="url(#fmArrB)" /><Wire d="M365 168 L365 272 M340 220 L390 220" stroke={RED} width="4" className="fmm-switch" /><M x="365" y="300" fill={RED}>throttle</M><Block x="50" y="350" w="286" h="62" label="ṁ readout" sub="maximum: frozen after choking" stroke={GREEN} fill={SKY} />
    <L x="465" y="40" anchor="start" size="19">MASS FLOW vs BACK-PRESSURE RATIO</L><Axes x="500" y="410" w="345" h="275" xLabel="pb / p₀  →" yLabel="ṁ" tickLabels={[[500,'0'],[661,'.528'],[845,'1']]} />
    <path d="M500 260 L661 260 L710 278 L785 326 L845 399 L845 410 L500 410 Z" fill={SKY} opacity="0.8" /><Curve pts={[[500,260],[661,260],[710,278],[785,326],[845,399]]} stroke={GREEN} width="4" className="fmm-draw" /><Wire d="M661 245 L661 418" stroke={RED} dash="5 5" /><L x="545" y="245" size="13" fill={GREEN}>CHOKED: plateau</L><M x="661" y="440" fill={RED}>.528</M>
    <Wire d="M420 220 L350 220" stroke={ROSE} width="3" className="fmm-current-rev" marker="url(#fmArrRo)" /><L x="415" y="195" size="12" fill={ROSE}>upstream signal swept back</L>
    <Curve pts={[[42,95],[140,108],[245,142],[338,170]]} stroke={MUTED} dash="5 5" /><Curve pts={[[42,92],[140,105],[245,142],[338,170]]} stroke={BLUE} /><Curve pts={[[42,89],[140,102],[245,142],[338,170]]} stroke={ROSE} /><L x="180" y="80" size="11" fill={MUTED}>last three internal pressure traces coincide</L>
  </Scene>
}

export function CdNozzleOperatingRegimesScene() {
  const traces = [[120,BLUE,'subsonic'],[140,TEAL,'subsonic'],[160,AMBER,'sonic throat'],[180,ROSE,'shock upstream'],[200,PURP,'shock downstream'],[220,GREEN,'design']]
  return <Scene caption="A converging–diverging nozzle passes through six back-pressure regimes">
    <L x="40" y="40" anchor="start" size="20">CONVERGING–DIVERGING NOZZLE</L><path d="M55 94 L280 94 L430 165 L600 94 L842 94 L842 150 L600 150 L430 220 L280 150 L55 150 Z" fill={WHITE} stroke={N} strokeWidth="3" /><Wire d="M72 122 L825 122" stroke={BLUE} width="4" className="fmm-current" marker="url(#fmArrB)" /><Wire d="M430 75 L430 235" stroke={RED} dash="5 5" /><L x="430" y="65" size="13" fill={RED}>sonic throat</L>
    <L x="42" y="276" anchor="start" size="18">SIX PRESSURE TRACES (high back pressure → low back pressure)</L><Axes x="90" y="465" w="655" h="162" xLabel="distance through nozzle" yLabel="p" />
    {traces.map(([y,t,label],i)=><g key={label}><Curve pts={[[95,y],[280,y+12],[430,y+30],[590,y+(i<2?5:36)],[740,y+(i<2?0:48)]]} stroke={t} width="2.8" className={`fmm-draw fmm-delay-${i}`} /><L x="765" y={y+5} anchor="start" size="11" fill={t}>{label}</L>{i===3||i===4?<Wire d={`M${i===3?535:635} ${y+27} L${i===3?535:635} ${y+4}`} stroke={t} width="3" />:null}</g>)}
    <L x="790" y="270" anchor="start" size="13" fill={ROSE}>over-expanded</L><path d="M845 114 L890 88 M845 130 L890 156" stroke={ROSE} strokeWidth="2" /><L x="790" y="310" anchor="start" size="13" fill={GREEN}>under-expanded</L><path d="M845 118 L890 105 M845 126 L890 139" stroke={GREEN} strokeWidth="2" />
  </Scene>
}

export function NormalShockPropertyJumpsScene() {
  const lanes = [['pressure p',GREEN,'up'],['temperature T',AMBER,'up'],['density ρ',PURP,'up'],['velocity V',BLUE,'down'],['Mach M',ROSE,'down'],['stagnation T₀',TEAL,'flat'],['stagnation p₀',RED,'down']]
  return <Scene caption="Across a normal shock: static properties jump, T₀ stays, p₀ is lost">
    <L x="40" y="38" anchor="start" size="20">NORMAL SHOCK: SUPSERSONIC → SUBSONIC</L><path d="M55 70 L850 70 L850 100 L55 100 Z" fill={SKY} stroke={N} strokeWidth="2" /><Wire d="M80 85 L820 85" stroke={BLUE} width="3" className="fmm-current" marker="url(#fmArrB)" /><M x="220" y="62" fill={BLUE}>M₁ &gt; 1</M><M x="680" y="62" fill={ROSE}>M₂ &lt; 1</M><Wire d="M450 52 L450 470" stroke={N} width="5" /><L x="450" y="120" size="13" fill={N}>shock</L>
    {lanes.map(([label,t,kind],i)=>{const y=155+i*43; const after=kind==='up'?y-19:kind==='down'?y+19:y; return <g key={label}><M x="125" y={y+5} anchor="end" fill={t}>{label}</M><Curve pts={[[150,y],[440,y],[460,after],[775,after]]} stroke={t} width="3" className="fmm-draw" /><L x="800" y={after+5} anchor="start" size="11" fill={t}>{kind==='up'?'rises':kind==='down'?'falls':'unchanged'}</L></g>})}
    <circle cx="450" cy="452" r="28" fill={WHITE} stroke={ROSE} strokeWidth="2" /><L x="450" y="449" size="10" fill={ROSE}>~ mean free</L><L x="450" y="462" size="10" fill={ROSE}>path thick</L><Wire d="M478 450 L545 420" stroke={ROSE} marker="url(#fmArrRo)" /><L x="555" y="419" anchor="start" size="12" fill={ROSE}>extremely thin</L>
    <Wire d="M690 470 L690 438" stroke={GREEN} width="3" marker="url(#fmArrG)" /><L x="710" y="446" anchor="start" size="12" fill={GREEN}>entropy ↑ only</L><path d="M680 478 L703 456 M703 478 L680 456" stroke={RED} strokeWidth="3" />
  </Scene>
}

export function ObliqueShockVelocityResolutionScene() {
  return <Scene caption="Only the normal velocity component changes across an oblique shock">
    <L x="42" y="38" anchor="start" size="20">OBLIQUE SHOCK AT A WEDGE</L><path d="M100 330 L420 330 L420 255 Z" fill={SKY} stroke={N} strokeWidth="2.5" /><Wire d="M45 255 L370 255" stroke={BLUE} width="4" className="fmm-current" marker="url(#fmArrB)" /><path d="M100 330 L350 115" stroke={ROSE} strokeWidth="4" className="fmm-draw" /><L x="195" y="166" size="13" fill={ROSE}>oblique shock β</L><Dot cx="265" cy="188" r="5" fill={N} />
    <Wire d="M265 188 L185 238" stroke={BLUE} width="3" marker="url(#fmArrB)" /><Wire d="M265 188 L305 252" stroke={TEAL} width="3" marker="url(#fmArrT)" /><Wire d="M265 188 L228 211" stroke={ROSE} width="3" marker="url(#fmArrRo)" /><path d="M249 196 L257 209 L270 201" fill="none" stroke={N} strokeWidth="2" /><M x="178" y="252" fill={BLUE}>V₁</M><M x="316" y="263" fill={TEAL}>Vt unchanged</M><M x="216" y="205" fill={ROSE}>Vn drops</M>
    <Wire d="M275 194 L340 244" stroke={GREEN} width="3" marker="url(#fmArrG)" /><M x="351" y="255" fill={GREEN}>V₂ turns by θ</M>
    <Axes x="510" y="422" w="330" h="255" xLabel="shock angle β" yLabel="deflection θ" /><Curve pts={[[520,410],[565,366],[620,340],[680,350],[735,390]]} stroke={BLUE} width="3" className="fmm-draw" /><Curve pts={[[520,410],[570,350],[640,318],[710,350],[790,408]]} stroke={ROSE} width="3" className="fmm-draw" /><Dot cx="640" cy="318" r="5" fill={AMBER} className="fmm-pulse" /><L x="646" y="302" anchor="start" size="11" fill={AMBER}>maximum θ</L><L x="775" y="386" size="11" fill={BLUE}>weak</L><L x="734" y="335" size="11" fill={ROSE}>strong</L>
    <path d="M105 444 Q180 370 255 444" fill="none" stroke={ROSE} strokeWidth="3" /><L x="180" y="477" size="12" fill={ROSE}>blunt wedge → detached bow shock</L>
  </Scene>
}

export function ExpansionFanVersusShockAsymmetryScene() {
  return <Scene caption="Compression waves coalesce into a shock; expansion waves spread smoothly">
    <L x="210" y="42" size="20" fill={ROSE}>CONCAVE CORNER: COMPRESSION</L><L x="680" y="42" size="20" fill={GREEN}>CONVEX CORNER: EXPANSION</L>
    <path d="M55 240 L285 240 L375 310 L375 355 L285 285 L55 285 Z" fill={WHITE} stroke={N} strokeWidth="2.5" /><Wire d="M70 262 L260 262" stroke={BLUE} width="3" className="fmm-current" marker="url(#fmArrB)" />
    {[0,1,2,3].map(i=><Wire key={i} d={`M${220+i*20} ${240-i*2} L365 ${170+i*25}`} stroke={ROSE} width="2" className="fmm-draw" />)}<Wire d="M365 170 L365 342" stroke={ROSE} width="4" /><L x="365" y="154" size="13" fill={ROSE}>merged shock; s ↑</L>
    <path d="M520 240 L750 240 L840 170 L840 215 L750 285 L520 285 Z" fill={WHITE} stroke={N} strokeWidth="2.5" /><Wire d="M535 262 L725 262" stroke={BLUE} width="3" className="fmm-current" marker="url(#fmArrB)" />
    {[0,1,2,3].map(i=><Wire key={i} d={`M750 ${240+i*11} L${850} ${142+i*42}`} stroke={GREEN} width="2" className="fmm-draw" />)}<L x="770" y="325" size="13" fill={GREEN}>fan; s = constant</L>
    <L x="55" y="387" anchor="start" size="16">PROPERTY TRACE</L><Curve pts={[[65,434],[285,434],[365,400],[420,400]]} stroke={ROSE} width="3" className="fmm-draw" /><L x="235" y="470" size="12" fill={ROSE}>abrupt jump</L><Curve pts={[[520,434],[630,426],[720,410],[835,370]]} stroke={GREEN} width="3" className="fmm-draw" /><L x="690" y="470" size="12" fill={GREEN}>smooth change</L>
    <Block x="345" y="390" w="210" h="65" label="why compression merges" sub="later wave is warmer → faster" stroke={AMBER} fill={SKY} />
  </Scene>
}

export function ThreeApproachesCoverageMapScene() {
  return <Scene caption="Analytical, experimental, and computational methods cover different territory">
    <L x="44" y="40" anchor="start" size="20">THREE APPROACHES TO FLUID-MECHANICS PROBLEMS</L><Axes x="115" y="440" w="680" h="330" xLabel="geometric complexity →" yLabel="required detail →" />
    <path d="M125 425 Q150 300 330 400 Q310 432 125 425 Z" fill={BLUE} opacity="0.25" stroke={BLUE} strokeWidth="2" /><L x="195" y="370" size="14" fill={BLUE}>analytical</L><L x="195" y="389" size="11" fill={MUTED}>simple, full detail</L>
    <path d="M170 420 Q370 205 765 255 L765 360 Q445 390 170 448 Z" fill={AMBER} opacity="0.24" stroke={AMBER} strokeWidth="2" strokeDasharray="8 6" /><L x="560" y="285" size="14" fill={AMBER}>experimental</L><L x="560" y="304" size="11" fill={MUTED}>instrumented points; gaps</L>
    <path d="M255 425 Q350 150 760 180 L760 415 Q510 450 255 425 Z" fill={GREEN} opacity="0.20" stroke={GREEN} strokeWidth="2" /><L x="560" y="208" size="14" fill={GREEN}>computational</L><L x="560" y="227" size="11" fill={MUTED}>accuracy depends on model</L>
    {[[190,405,'laminar pipe',BLUE],[530,335,'wind-tunnel car',AMBER],[715,225,'engine combustion',GREEN]].map(([x,y,label,t])=><g key={label}><Dot cx={x} cy={y} r="7" fill={t} className="fmm-pulse" /><L x={x+13} y={y+4} anchor="start" size="12" fill={t}>{label}</L></g>)}
  </Scene>
}

export function CfdWorkflowPipelineScene() {
  const steps = [['1','geometry','CAD outline',BLUE],['2','mesh','refine at wall',TEAL],['3','model','turbulence + physics',PURP],['4','discretise','∂ → Δ between cells',AMBER],['5','solve','residual ↓',GREEN],['6','post-process','contours + vectors',ROSE]]
  return <Scene caption="CFD is a validated workflow, not just a solver button">
    <L x="42" y="42" anchor="start" size="20">CFD WORKFLOW</L>{steps.map(([num,name,sub,t],i)=>{const x=32+i*145; return <g key={name}><Block x={x} y="145" w="125" h="105" label={`${num}. ${name}`} sub={sub} stroke={t} fill={WHITE} className={`fmm-cell-in fmm-delay-${i}`} />{i<5?<Wire d={`M${x+125} 198 L${x+143} 198`} stroke={t} width="2.5" marker={`url(#${markerFor(t)})`} className="fmm-flow-arrow" />:null}{i===1?<g><path d={`M${x+25} 220 L${x+98} 170 M${x+25} 205 L${x+105} 236 M${x+45} 157 L${x+45} 240`} stroke={TEAL} strokeWidth="1" /></g>:null}{i===4?<Curve pts={[[x+22,230],[x+45,210],[x+65,200],[x+92,175]]} stroke={GREEN} width="2" />:null}</g>})}
    <Wire d="M830 270 C830 380, 300 380, 250 265" stroke={ROSE} width="2.7" marker="url(#fmArrRo)" className="fmm-feedback" /><L x="505" y="390" size="14" fill={ROSE}>grid convergence</L><Wire d="M805 285 C805 450, 430 450, 405 265" stroke={PURP} width="2.7" marker="url(#fmArrP)" className="fmm-feedback" /><L x="610" y="458" size="14" fill={PURP}>validation against data</L>
  </Scene>
}

export function CfdApplicationsAndCaveatsScene() {
  const apps = ['aircraft wing','turbine blades','combustion chamber','electronics heat sink','ventilated room','weather map','artery flow']; const limits = ['turbulence modelled—not resolved','constants tuned to flows','mesh dependence','boundary-condition sensitivity','separation / transition error','user judgement']
  return <Scene caption="CFD is powerful when its model and result are validated">
    <L x="55" y="42" anchor="start" size="20" fill={GREEN}>APPLICATIONS</L><L x="500" y="42" anchor="start" size="20" fill={ROSE}>LIMITATIONS</L>
    {apps.map((v,i)=><g key={v}><rect x="50" y={65+i*48} width="345" height="38" rx="9" fill={WHITE} stroke={GREEN} strokeWidth="1.8" /><Dot cx="74" cy={84+i*48} r="5" fill={GREEN} className="fmm-pulse" /><L x="91" y={89+i*48} anchor="start" size="14">{v}</L></g>)}
    {limits.map((v,i)=><g key={v}><rect x="495" y={65+i*53} width="350" height="43" rx="9" fill={WHITE} stroke={ROSE} strokeWidth="1.8" /><path d={`M516 ${77+i*53} L526 ${96+i*53} L506 ${96+i*53} Z`} fill={ROSE} /><L x="537" y={91+i*53} anchor="start" size="13">{v}</L></g>)}
    <path d="M145 430 L755 430 L450 478 Z" fill={N} /><path d="M450 430 L450 475" stroke={N} strokeWidth="5" /><rect x="385" y="386" width="130" height="38" rx="7" fill={SKY} stroke={GREEN} strokeWidth="2" className="fmm-pulse" /><L x="450" y="411" size="14" fill={GREEN}>VALIDATED</L><L x="450" y="503" size="13" fill={MUTED}>Validation tips the balance toward trustworthy prediction.</L>
  </Scene>
}

export function CourseAssumptionLadderScene() {
  const rungs = [['Module 1','fluid at rest → hydrostatics','dam gate',BLUE],['Module 2','ideal patterns → flow nets','flow net',TEAL],['Module 3','pressure only → energy','venturi',PURP],['Module 4','no body → lift / drag','aerofoil',AMBER],['Module 5','ρ constant → compressible','nozzle',ROSE]]
  return <Scene caption="Each module discards an assumption and unlocks a new class of problem">
    <L x="55" y="42" anchor="start" size="20">COURSE ASSUMPTION LADDER</L>{rungs.map(([mod,assume,example,t],i)=>{const y=428-i*76; const x=85+i*52; return <g key={mod}><rect x={x} y={y} width={365} height="55" rx="10" fill={WHITE} stroke={t} strokeWidth="2.5" className={`fmm-cell-in fmm-delay-${i}`} /><L x={x+15} y={y+22} anchor="start" size="13" fill={t}>{mod}</L><L x={x+112} y={y+22} anchor="start" size="12" fill={N}>{assume}</L><L x={x+112} y={y+42} anchor="start" size="11" fill={MUTED}>unlocks: {example}</L></g>})}
    <L x="620" y="80" size="18">WHICH RUNG?</L><Block x="560" y="105" w="245" h="44" label="fluid moving?" stroke={BLUE} fill={WHITE} /><Wire d="M682 150 L682 172" stroke={BLUE} marker="url(#fmArrB)" /><Block x="560" y="176" w="245" h="44" label="forces / energy needed?" stroke={PURP} fill={WHITE} /><Wire d="M682 220 L682 242" stroke={PURP} marker="url(#fmArrP)" /><Block x="560" y="246" w="245" h="44" label="body immersed?" stroke={AMBER} fill={WHITE} /><Wire d="M682 290 L682 312" stroke={AMBER} marker="url(#fmArrA)" /><Block x="560" y="316" w="245" h="44" label="Mach > 0.3? → Module 5" stroke={ROSE} fill={SKY} /><Wire d="M805 338 L850 338" stroke={ROSE} marker="url(#fmArrRo)" className="fmm-flow-arrow" />
  </Scene>
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
        <g key={String(st)} className={`fmm-slide-in fmm-delay-${i}`}>
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
      <g className="fmm-emerge">
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
  // Module 1 — Fluid Properties and Fluid Statics
  'solid-versus-fluid-under-shear': SolidVersusFluidShearScene,
  'continuum-averaging-volume': ContinuumAveragingVolumeScene,
  'four-density-quantities-wheel': FourDensityWheelScene,
  'newtonian-shear-law-plates': NewtonianShearPlatesScene,
  'rheological-curve-family': RheologicalCurveFamilyScene,
  'surface-tension-force-balance': SurfaceTensionBalanceScene,
  'capillary-rise-and-depression': CapillaryRiseDepressionScene,
  'cavitation-pressure-track': CavitationPressureTrackScene,
  'bulk-modulus-compression-bar': BulkModulusCompressionScene,
  'pascal-wedge-element-proof': PascalWedgeProofScene,
  'hydrostatic-paradox-vessels': HydrostaticParadoxScene,
  'pressure-datum-ladder': PressureDatumLadderScene,
  'manometer-walk-procedure': ManometerWalkScene,
  'differential-manometer-three-forms': DifferentialManometerThreeFormsScene,
  'bourdon-tube-mechanism': BourdonTubeScene,
  'centre-of-pressure-on-inclined-gate': CentreOfPressureGateScene,
  // Module 2 — Fluid Kinematics and Viscous Flow
  'steady-uniform-two-by-two': SteadyUniformGridScene,
  'reynolds-transition-dye-filament': ReynoldsDyeFilamentScene,
  'dimensionality-reduction-ladder': DimensionReductionLadderScene,
  'rotational-versus-irrotational-crosses': RotationalIrrotationalCrossesScene,
  'three-line-families-unsteady': ThreeLineFamiliesScene,
  'local-convective-nozzle-and-valve': LocalConvectiveScene,
  'continuity-cubical-element-fluxes': ContinuityCubeScene,
  'stream-function-contours-and-flow-rate': StreamFunctionContoursScene,
  'potential-and-stream-orthogonal-net': PotentialStreamNetScene,
  'circulation-loop-and-vorticity-flux': CirculationLoopScene,
  'laplace-poisson-derivation-pair': LaplacePoissonScene,
  'flow-net-under-a-dam': FlowNetDamScene,
  'poiseuille-parabola-and-fourth-power': PoiseuilleParabolaScene,
  'couette-poiseuille-superposition': CouettePoiseuilleScene,
  'journal-bearing-film-unwrapped': JournalBearingScene,
  'laminar-turbulent-profile-and-roughness': LaminarTurbulentProfileScene,
  // Module 3 — Fluid Dynamics
  'control-volume-momentum-balance': ControlVolumeMomentumScene,
  'jet-on-fixed-plate-normal-and-inclined': JetOnFixedPlateScene,
  'moving-plate-power-curve': MovingPlatePowerCurveScene,
  'curved-vane-deflection-force': CurvedVaneDeflectionForceScene,
  'velocity-triangles-moving-vane': VelocityTrianglesMovingVaneScene,
  'euler-element-force-balance': EulerElementForceBalanceScene,
  'bernoulli-three-heads-along-a-pipe': BernoulliThreeHeadsScene,
  'venturi-profile-and-pressure-trace': VenturiProfilePressureScene,
  'orifice-vena-contracta-and-loss': OrificeVenaContractaScene,
  'pitot-static-tube-stagnation-streamline': PitotStaticTubeScene,
  'orifice-jet-and-three-coefficients': OrificeJetThreeCoefficientsScene,
  'notch-integration-strips': NotchIntegrationStripsScene,
  'moody-chart-navigation': MoodyChartNavigationScene,
  'minor-loss-fittings-comparison': MinorLossFittingsScene,
  'series-parallel-network-analogy': SeriesParallelNetworkScene,
  'energy-and-grade-lines-with-siphon': EnergyGradeLinesScene,
  // Module 4 — Flow over Bodies and Dimensional Analysis
  'boundary-layer-growth-along-plate': BoundaryLayerGrowthScene,
  'three-thicknesses-deficit-areas': ThreeThicknessesScene,
  'momentum-integral-control-volume': MomentumIntegralCVScene,
  'separation-profile-sequence': SeparationProfileScene,
  'friction-versus-pressure-drag-split': FrictionPressureDragScene,
  'cylinder-pressure-distribution-and-wake': CylinderPressureWakeScene,
  'sphere-drag-curve-and-dimples': SphereDragDimplesScene,
  'aerofoil-lift-curve-and-stall': AerofoilLiftStallScene,
  'streamlining-drag-tradeoff': StreamliningTradeoffScene,
  'dimensional-formula-builder': DimensionalFormulaBuilderScene,
  'homogeneity-check-balance': HomogeneityBalanceScene,
  'rayleigh-exponent-solution': RayleighExponentSolutionScene,
  'buckingham-reduction-and-repeating-set': BuckinghamReductionScene,
  'force-ratio-group-family': ForceRatioGroupFamilyScene,
  'three-similarities-ladder': ThreeSimilaritiesLadderScene,
  'ship-model-froude-scaling-workflow': ShipModelFroudeWorkflowScene,
  // Module 5 — Compressible Flow and Introduction to CFD
  'thermodynamic-toolkit-panel': ThermodynamicToolkitPanelScene,
  'sound-wave-control-volume': SoundWaveControlVolumeScene,
  'mach-cone-four-speeds': MachConeFourSpeedsScene,
  'adiabatic-versus-isentropic-venn': AdiabaticVersusIsentropicVennScene,
  'stagnation-reference-state-map': StagnationReferenceStateMapScene,
  'critical-ratio-nozzle-gauge': CriticalRatioNozzleGaugeScene,
  'area-velocity-sign-reversal': AreaVelocitySignReversalScene,
  'choking-mass-flow-plateau': ChokingMassFlowPlateauScene,
  'cd-nozzle-operating-regimes': CdNozzleOperatingRegimesScene,
  'normal-shock-property-jumps': NormalShockPropertyJumpsScene,
  'oblique-shock-velocity-resolution': ObliqueShockVelocityResolutionScene,
  'expansion-fan-versus-shock-asymmetry': ExpansionFanVersusShockAsymmetryScene,
  'three-approaches-coverage-map': ThreeApproachesCoverageMapScene,
  'cfd-workflow-pipeline': CfdWorkflowPipelineScene,
  'cfd-applications-and-caveats': CfdApplicationsAndCaveatsScene,
  'course-assumption-ladder': CourseAssumptionLadderScene,
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


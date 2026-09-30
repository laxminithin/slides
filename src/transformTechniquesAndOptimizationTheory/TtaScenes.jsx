/**
 * TtaScenes — VTU BEE613D Electric Motor and Drive Systems for EVs classroom
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
    <div className={`tta-scene ${className}`} aria-label={caption || 'Transform Techniques and Optimization Theory diagram'}>
      <svg viewBox={vb} role="img" className="tta-svg">
        <defs>
          <marker id="ttaArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="ttaArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="ttaArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="ttaArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="ttaArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="ttaArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="ttaArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="ttaArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="ttaArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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
  if (tone === BLUE) return 'ttaArrB'
  if (tone === AMBER) return 'ttaArrA'
  if (tone === ROSE) return 'ttaArrRo'
  if (tone === GREEN) return 'ttaArrG'
  if (tone === PURP) return 'ttaArrP'
  if (tone === TEAL) return 'ttaArrT'
  if (tone === RED) return 'ttaArrR'
  if (tone === MUTED) return 'ttaArrM'
  return 'ttaArr'
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
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#ttaArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#ttaArr)" />
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
function Bars({ x, y, w, items = [], accent = BLUE, rowH = 34, className = 'ttam-bar', max }) {
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
          <g className={`${className} ttam-delay-${i % 5}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
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
          className={`ttam-flux ttam-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`ttam-current ttam-delay-${i}`}
          marker="url(#ttaArrB)"
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
        <g key={t} className={`ttam-cell-in ttam-delay-${i}`}>
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
        <g key={String(p)} className={`ttam-cell-in ttam-delay-${i % 5}`}>
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

/* ── TTA-specific primitives ─────────────────────────────────────────── */

/* Scene helpers unique to Transform Techniques and Optimization Theory land here. Coerce every numeric
   prop through n() -- including width/length props, not just x and y. */


/* ── Module 1 ────────────────────────────────────────────────────────── */

/* __MODULE_1__ */

/* ── Module 2 ────────────────────────────────────────────────────────── */

/* __MODULE_2__ */

/* ── Module 3 ────────────────────────────────────────────────────────── */

/* __MODULE_3__ */

/* ── Module 4 ────────────────────────────────────────────────────────── */

/* __MODULE_4__ */

/* ── Module 5 ────────────────────────────────────────────────────────── */

/* __MODULE_5__ */


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
        <g key={String(st)} className={`ttam-slide-in ttam-delay-${i}`}>
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
      <g className="ttam-emerge">
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


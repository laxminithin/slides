/**
 * MsmScenes — VTU BEE613D Electric Motor and Drive Systems for EVs classroom
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
    <div className={`msm-scene ${className}`} aria-label={caption || 'Materials Science and Metallurgy diagram'}>
      <svg viewBox={vb} role="img" className="msm-svg">
        <defs>
          <marker id="msmArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="msmArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="msmArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="msmArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="msmArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="msmArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="msmArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="msmArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="msmArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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
  if (tone === BLUE) return 'msmArrB'
  if (tone === AMBER) return 'msmArrA'
  if (tone === ROSE) return 'msmArrRo'
  if (tone === GREEN) return 'msmArrG'
  if (tone === PURP) return 'msmArrP'
  if (tone === TEAL) return 'msmArrT'
  if (tone === RED) return 'msmArrR'
  if (tone === MUTED) return 'msmArrM'
  return 'msmArr'
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
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#msmArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#msmArr)" />
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
function Bars({ x, y, w, items = [], accent = BLUE, rowH = 34, className = 'msmm-bar', max }) {
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
          <g className={`${className} msmm-delay-${i % 5}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
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
          className={`msmm-flux msmm-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`msmm-current msmm-delay-${i}`}
          marker="url(#msmArrB)"
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
        <g key={t} className={`msmm-cell-in msmm-delay-${i}`}>
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
        <g key={String(p)} className={`msmm-cell-in msmm-delay-${i % 5}`}>
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

/* ── MSM-specific primitives ─────────────────────────────────────────── */

/* Scene helpers unique to Materials Science and Metallurgy land here. Coerce every numeric
   prop through n() -- including width/length props, not just x and y. */

/** One atom — the unit nearly every scene in this subject is built from.
 *  `sign` draws the ionic charge inside the core. */
function Atom({ cx, cy, r = 12, fill = SKY, stroke = BLUE, sign, className = '', opacity, dash, width = 2 }) {
  const [X, Y, R] = [n(cx), n(cy), n(r)]
  return (
    <g className={className}>
      <circle cx={X} cy={Y} r={R} fill={fill} stroke={stroke} strokeWidth={width} strokeDasharray={dash} opacity={opacity} />
      {sign ? (
        <M x={X} y={Y + R * 0.36} size={R} fill={stroke} weight={800}>
          {sign}
        </M>
      ) : null}
    </g>
  )
}

/** Oblique-projection cube: front square at (x,y) of side s, back face offset
 *  by o up and to the right. Returns [front, back] corner lists so a cell
 *  scene can hang atoms on them. */
function cubeCorners(x, y, s, o) {
  const [X, Y, S, O] = [n(x), n(y), n(s), n(o)]
  const front = [[X, Y], [X + S, Y], [X + S, Y + S], [X, Y + S]]
  return [front, front.map(([px, py]) => [px + O, py - O])]
}


/* ── Module 1 ────────────────────────────────────────────────────────── */

export function StructurePropertyChainScene() {
  const stages = [
    { at: 130, name: 'Processing', a: 'quench from 850 °C', b: 'temper at 550 °C' },
    { at: 340, name: 'Structure', a: 'fine tempered martensite', b: 'sub-micron carbides' },
    { at: 550, name: 'Properties', a: 'strength 1100 MPa', b: 'toughness 60 MPa√m' },
    { at: 760, name: 'Performance', a: 'shaft survives', b: '10⁸ duty cycles' },
  ]
  return (
    <Scene caption="One direction only — the chain is entered at processing or not at all">
      {stages.map((s, i) => (
        <g key={s.name} className={`msmm-cell-in msmm-delay-${i}`}>
          <Block x={s.at - 90} y={66} w={180} h={62} label={s.name} stroke={i === 3 ? GREEN : BLUE} />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <Wire
          key={i}
          d={`M${220 + i * 210} 97 L${248 + i * 210} 97`}
          stroke={BLUE}
          marker="url(#msmArrB)"
          className={`msmm-flow-arrow msmm-delay-${i}`}
        />
      ))}
      <L x={450} y={146} size={11} fill={AMBER} weight={800}>
        worked example — one quenched and tempered steel shaft
      </L>
      {stages.map((s, i) => (
        <g key={`ex-${s.name}`} className={`msmm-cell-in msmm-delay-${i + 1}`}>
          <rect x={s.at - 90} y={152} width={180} height={84} rx={10} fill={WHITE} stroke={MUTED} strokeWidth={1.8} />
          <L x={s.at} y={184} size={11.5} fill={N} weight={700}>
            {s.a}
          </L>
          <M x={s.at} y={210} size={11} fill={MUTED}>
            {s.b}
          </M>
        </g>
      ))}
      {/* The blocked return path: drawn under the chain so the cross and its
          annotation land in empty canvas rather than on the example cards. */}
      <Wire d="M550 244 C550 306 340 306 340 244" stroke={RED} width={2.6} dash="9 7" marker="url(#msmArrR)" className="msmm-pulse" />
      <Wire d="M432 277 L458 303" stroke={RED} width={4} />
      <Wire d="M458 277 L432 303" stroke={RED} width={4} />
      <L x={445} y={344} size={13.5} fill={RED}>
        you cannot specify a property directly
      </L>
      <L x={445} y={372} size={12} fill={MUTED} weight={700}>
        change the structure — which means change the processing
      </L>
      <rect x={60} y={408} width={780} height={58} rx={12} fill={WHITE} stroke={GREEN} strokeWidth={2.4} />
      <L x={450} y={444} size={13.5} fill={N} weight={750}>
        know the property tables and you can select; know the structure and you can change it
      </L>
    </Scene>
  )
}

export function MetallicBondingScene() {
  const cores = []
  for (let c = 0; c < 4; c += 1) {
    for (let r = 0; r < 3; r += 1) cores.push([96 + c * 66, 112 + r * 84])
  }
  const cloud = [
    [70, 86], [132, 150], [186, 96], [248, 148], [300, 92],
    [72, 232], [140, 240], [204, 224], [266, 246], [312, 200],
    [110, 300], [178, 312], [244, 296], [300, 308],
  ]
  return (
    <Scene caption="One structural fact — a shared electron sea — and four properties fall out of it">
      <rect x={40} y={60} width={300} height={270} rx={14} fill={SKY} stroke={BLUE} strokeWidth={2.4} />
      <ellipse cx={190} cy={195} rx={136} ry={118} fill={PURP} opacity={0.12} />
      {cores.map(([cx, cy]) => (
        <Atom key={`${cx}-${cy}`} cx={cx} cy={cy} r={17} sign="+" fill={WHITE} stroke={BLUE} />
      ))}
      {cloud.map(([cx, cy], i) => (
        <Dot key={`e${cx}-${cy}`} cx={cx} cy={cy} r={3.6} fill={PURP} opacity={0.7} className={`msmm-shift msmm-delay-${i % 5}`} />
      ))}
      <L x={190} y={356} size={12.5} fill={BLUE}>
        ion cores in a delocalised electron sea
      </L>

      <Card x={368} y={56} w={250} h={128} title="Electrical conduction" accent={BLUE} lines={['free electrons drift down E']} linesY={110}>
        <Wire d="M24 52 L226 52" stroke={AMBER} width={2.4} marker="url(#msmArrA)" />
        <M x={118} y={42} size={10.5} fill={AMBER}>applied field E</M>
        {[50, 112, 174].map((cx, i) => (
          <Dot key={cx} cx={cx} cy={80} r={5} fill={BLUE} className={`msmm-search msmm-delay-${i}`} />
        ))}
      </Card>

      <Card x={630} y={56} w={250} h={128} title="Thermal conduction" accent={RED} lines={['the same electrons carry heat']} linesY={110}>
        <M x={34} y={46} size={10.5} fill={RED}>hot</M>
        <rect x={22} y={54} width={20} height={32} rx={4} fill={RED} />
        <Wire d="M52 70 L226 70" stroke={RED} width={2.4} marker="url(#msmArrR)" className="msmm-current" />
        {[74, 128, 182].map((cx, i) => (
          <Dot key={cx} cx={cx} cy={92} r={5} fill={BLUE} className={`msmm-search msmm-delay-${i}`} />
        ))}
      </Card>

      <Card x={368} y={200} w={250} h={128} title="Lustre and opacity" accent={AMBER} lines={['light absorbed, then re-emitted']} linesY={110}>
        <Wave x={20} y={62} w={86} amp={9} cycles={2} stroke={AMBER} width={2.2} />
        <rect x={112} y={40} width={10} height={52} rx={3} fill={N} />
        <Wave x={128} y={62} w={86} amp={9} cycles={2} phase={1.6} stroke={AMBER} width={2.2} className="msmm-pulse" />
      </Card>

      <Card x={630} y={200} w={250} h={128} title="Ductility" accent={GREEN} lines={['planes slide, bonds stay whole']} linesY={110}>
        <Wire d="M40 40 L150 40" stroke={AMBER} width={2.2} marker="url(#msmArrA)" />
        <g className="msmm-shift">
          <rect x={24} y={48} width={180} height={14} rx={3} fill={SKY} stroke={BLUE} strokeWidth={1.8} />
        </g>
        {[44, 78, 112, 146, 180].map((bx) => (
          <Wire key={bx} d={`M${bx} 62 L${bx} 76`} stroke={GREEN} width={2} />
        ))}
        <rect x={24} y={76} width={180} height={14} rx={3} fill={SKY} stroke={BLUE} strokeWidth={1.8} />
      </Card>

      <rect x={40} y={382} width={820} height={58} rx={12} fill={WHITE} stroke={PURP} strokeWidth={2.4} />
      <L x={450} y={418} size={13.5} fill={N} weight={750}>
        the electrons belong to the solid, not to an atom — that single fact explains all four
      </L>
    </Scene>
  )
}

export function CeramicBrittlenessScene() {
  const cols = [60, 124, 188, 252, 316]
  const rows = [86, 130, 174, 218]
  return (
    <Scene caption="Directional bonds buy hardness and refractoriness, and cost every route to plastic flow">
      <Wire d="M60 44 L300 44" stroke={AMBER} width={2.6} marker="url(#msmArrA)" />
      <M x={318} y={48} size={12} fill={AMBER} anchor="start">shear τ</M>
      <rect x={36} y={52} width={350} height={230} rx={12} fill={CREAM} stroke={MUTED} strokeWidth={1.8} />
      {/* Upper two rows slide; the lattice below stays put, so like charges
          come to face one another across the parting line. */}
      <g className="msmm-shift">
        {rows.slice(0, 2).map((ry, j) =>
          cols.map((cx, i) => (
            <Atom
              key={`u${cx}-${ry}`}
              cx={cx}
              cy={ry}
              r={13}
              sign={(i + j) % 2 === 0 ? '+' : '–'}
              fill={(i + j) % 2 === 0 ? SKY : WHITE}
              stroke={(i + j) % 2 === 0 ? BLUE : ROSE}
            />
          )),
        )}
      </g>
      {rows.slice(2).map((ry, j) =>
        cols.map((cx, i) => (
          <Atom
            key={`l${cx}-${ry}`}
            cx={cx}
            cy={ry}
            r={13}
            sign={(i + j) % 2 === 0 ? '–' : '+'}
            fill={(i + j) % 2 === 0 ? WHITE : SKY}
            stroke={(i + j) % 2 === 0 ? ROSE : BLUE}
          />
        )),
      )}
      <Wire d="M46 152 L376 152" stroke={RED} width={3} dash="10 7" className="msmm-pulse" />
      <path d="M296 134 L306 150 L322 152 L306 156 L298 172 L292 156 L276 152 L292 148 Z" fill={RED} className="msmm-pulse" />
      <L x={211} y={302} size={12.5} fill={RED}>
        like charges meet — the lattice cleaves instead of slipping
      </L>
      <Card
        x={36}
        y={326}
        w={350}
        h={112}
        title="No mechanism for plastic flow"
        accent={RED}
        lines={['sliding brings like charges adjacent', 'directed bonds must break outright', 'fracture arrives before any yielding']}
        linesY={58}
        lineH={22}
      />

      <Panel
        x={410}
        y={52}
        w={460}
        title="Every ceramic property traces to the bond"
        accent={TEAL}
        rows={[
          ['hardness', 'strong bonds'],
          ['stiffness', 'strong bonds'],
          ['high melting point', 'strong bonds'],
          ['chemical inertness', 'strong bonds'],
          ['brittleness', 'directional bonds', RED],
        ]}
      />
      <L x={515} y={262} size={11.5} fill={BLUE}>specimen A</L>
      <L x={735} y={262} size={11.5} fill={RED}>specimen B</L>
      <rect x={430} y={270} width={170} height={54} rx={5} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
      <path d="M505 270 L515 288 L525 270 Z" fill={RED} />
      <rect x={650} y={270} width={170} height={54} rx={5} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
      <path d="M718 270 L735 312 L752 270 Z" fill={RED} />
      <Bars
        x={520}
        y={348}
        w={280}
        max={400}
        items={[['flaw 20 µm', 340, BLUE], ['flaw 200 µm', 110, RED]]}
      />
      <L x={650} y={440} size={11.5} fill={MUTED} weight={700}>
        identical material — fracture stress (MPa) set by the largest flaw
      </L>
    </Scene>
  )
}

export function PolymerChainScene() {
  const chains = [
    { y: 110, phase: 0, cls: 'msmm-shift' },
    { y: 164, phase: 1.1, cls: '' },
    { y: 214, phase: 2.2, cls: 'msmm-shift msmm-delay-2' },
  ]
  return (
    <Scene caption="Strong along the chain, weak between chains — and the weak direction governs">
      <L x={250} y={38} size={12.5} fill={AMBER}>tensile load</L>
      <Wire d="M200 52 L40 52" stroke={AMBER} width={2.4} marker="url(#msmArrA)" />
      <Wire d="M300 52 L472 52" stroke={AMBER} width={2.4} marker="url(#msmArrA)" />
      <rect x={36} y={74} width={440} height={180} rx={12} fill={CREAM} stroke={MUTED} strokeWidth={1.8} />
      {/* Secondary bonds first, so the covalent backbones paint on top. */}
      {[110, 180, 250, 320, 390].map((bx) => (
        <g key={`sb${bx}`}>
          <Wire d={`M${bx} 122 L${bx} 152`} stroke={MUTED} width={1.8} dash="4 5" />
          <Wire d={`M${bx} 176 L${bx} 202`} stroke={MUTED} width={1.8} dash="4 5" />
        </g>
      ))}
      {chains.map((c) => (
        <g key={c.y} className={c.cls}>
          <Wave x={52} y={c.y} w={400} amp={16} cycles={2.5} phase={c.phase} stroke={BLUE} width={3.4} />
        </g>
      ))}
      <L x={150} y={276} size={12} fill={BLUE}>strong covalent backbone</L>
      <L x={382} y={276} size={12} fill={MUTED} weight={700}>weak secondary bonds</L>

      <L x={680} y={92} size={13} fill={AMBER}>temperature raises, modulus falls</L>
      <rect x={520} y={110} width={320} height={12} rx={6} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
      <Dot cx={560} cy={116} r={11} fill={AMBER} className="msmm-probe" />
      <M x={560} y={142} size={10.5} fill={MUTED}>glassy</M>
      <M x={690} y={142} size={10.5} fill={MUTED}>leathery</M>
      <M x={812} y={142} size={10.5} fill={MUTED}>rubbery</M>
      {/* Pushed right of x=476: the y-axis label is anchored at the axis and a
          plot at x=520 put "modulus" inside the chain box. */}
      <Axes x={540} y={254} w={300} h={86} xLabel="temperature" yLabel="modulus" />
      <Curve
        pts={[[540, 176], [610, 180], [660, 190], [700, 226], [745, 244], [840, 248]]}
        stroke={ROSE}
        className="msmm-draw"
      />

      <Bars
        x={200}
        y={330}
        w={380}
        max={8.5}
        items={[['polymer', 1.2, GREEN], ['ceramic', 3.9, PURP], ['metal', 7.8, BLUE]]}
      />
      <L x={390} y={452} size={12} fill={MUTED} weight={700}>
        density in g/cm³ — the polymer is the lightest by a factor of six
      </L>
      <Card
        x={650}
        y={310}
        w={220}
        h={110}
        title="Why it matters"
        accent={GREEN}
        lines={['the weak bonds set', 'the properties — so', 'temperature does too']}
        linesY={56}
        lineH={22}
      />
    </Scene>
  )
}

export function CompositeAnisotropyScene() {
  const fibres = [70, 96, 122, 148, 174]
  return (
    <Scene caption="Strength per unit mass, bought with direction dependence">
      <L x={240} y={32} size={12.5} fill={AMBER}>load applied along the fibres</L>
      <Wire d="M40 46 L440 46" stroke={AMBER} width={2.6} marker="url(#msmArrA)" />
      <rect x={40} y={56} width={400} height={150} rx={8} fill={SKY} stroke={MUTED} strokeWidth={2} />
      {fibres.map((fy) => (
        <g key={fy}>
          <rect x={60} y={fy} width={360} height={12} rx={4} fill={TEAL} />
          <Wire d={`M52 ${fy - 10} L72 ${fy + 4}`} stroke={AMBER} width={2} marker="url(#msmArrA)" className="msmm-pulse" />
        </g>
      ))}
      <L x={240} y={228} size={11.5} fill={MUTED} weight={700}>
        the matrix shears load into the fibre ends
      </L>

      <L x={705} y={56} size={13} fill={TEAL}>specific strength</L>
      <Bars x={610} y={76} w={210} max={1} items={[['steel', 0.13, N], ['aluminium', 0.19, BLUE], ['composite', 0.85, TEAL]]} />
      <M x={705} y={196} size={11} fill={MUTED}>MN·m per kg</M>

      <rect x={60} y={290} width={150} height={70} rx={6} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
      {[306, 322, 338].map((fy) => (
        <rect key={`a${fy}`} x={70} y={fy} width={130} height={7} rx={3} fill={TEAL} />
      ))}
      <Wire d="M56 325 L28 325" stroke={TEAL} width={2.4} marker="url(#msmArrT)" />
      <Wire d="M214 325 L244 325" stroke={TEAL} width={2.4} marker="url(#msmArrT)" />
      <L x={135} y={382} size={12} fill={TEAL}>loaded along</L>
      <rect x={290} y={290} width={150} height={70} rx={6} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
      {[306, 322, 338].map((fy) => (
        <rect key={`t${fy}`} x={300} y={fy} width={130} height={7} rx={3} fill={ROSE} />
      ))}
      <Wire d="M365 286 L365 262" stroke={ROSE} width={2.4} marker="url(#msmArrRo)" />
      <Wire d="M365 364 L365 388" stroke={ROSE} width={2.4} marker="url(#msmArrRo)" />
      <L x={365} y={406} size={12} fill={ROSE}>loaded across</L>
      <L x={250} y={446} size={13} fill={ROSE}>
        anisotropy — same material, different direction
      </L>

      <Axes x={500} y={450} w={340} h={180} xLabel="strain" yLabel="stress" />
      <Curve pts={[[500, 450], [548, 376], [600, 306], [648, 272]]} stroke={TEAL} width={3} className="msmm-draw" />
      <Dot cx={648} cy={272} r={5} fill={TEAL} />
      <Curve pts={[[500, 450], [566, 428], [640, 410], [706, 400]]} stroke={ROSE} width={3} className="msmm-draw" />
      <Dot cx={706} cy={400} r={5} fill={ROSE} />
      <Wire d="M700 300 L730 300" stroke={TEAL} width={3} />
      <M x={736} y={304} size={11} fill={TEAL} anchor="start">along fibres</M>
      <Wire d="M700 332 L730 332" stroke={ROSE} width={3} />
      <M x={736} y={336} size={11} fill={ROSE} anchor="start">across fibres</M>
    </Scene>
  )
}

export function AdvancedMaterialsScene() {
  return (
    <Scene caption="Four families defined by what they do rather than by how they bond">
      <rect x={36} y={50} width={410} height={200} rx={12} fill={WHITE} stroke={BLUE} strokeWidth={2} />
      <L x={241} y={74} size={14} fill={BLUE}>Semiconductors</L>
      <rect x={66} y={110} width={110} height={16} rx={8} fill={MUTED} />
      <rect x={176} y={110} width={110} height={16} fill={AMBER} />
      <rect x={286} y={110} width={130} height={16} rx={8} fill={BLUE} />
      <M x={121} y={148} size={10.5} fill={MUTED}>insulator</M>
      <M x={231} y={148} size={10.5} fill={AMBER}>semiconductor</M>
      <M x={351} y={148} size={10.5} fill={BLUE}>metal</M>
      <Wire d="M196 176 L340 176" stroke={AMBER} width={2.6} marker="url(#msmArrA)" className="msmm-current" />
      <M x={241} y={200} size={11.5} fill={AMBER}>doping shifts σ along the scale</M>
      <M x={241} y={224} size={10.5} fill={MUTED}>parts per million move it by orders of magnitude</M>

      <rect x={458} y={50} width={410} height={200} rx={12} fill={WHITE} stroke={GREEN} strokeWidth={2} />
      <L x={663} y={74} size={14} fill={GREEN}>Biomaterials</L>
      <rect x={490} y={96} width={180} height={120} rx={44} fill={SKY} stroke={GREEN} strokeWidth={2.2} />
      <rect x={540} y={130} width={80} height={50} rx={6} fill={WHITE} stroke={N} strokeWidth={2.2} className="msmm-flux" />
      <M x={580} y={160} size={11} fill={N}>implant</M>
      <M x={580} y={238} size={10.5} fill={MUTED}>living tissue</M>
      {['non-toxic', 'no rejection', 'corrosion-proof', 'stiffness matched'].map((t, i) => (
        <M key={t} x={694} y={120 + i * 26} size={11.5} fill={GREEN} anchor="start">
          · {t}
        </M>
      ))}

      <rect x={36} y={262} width={410} height={200} rx={12} fill={WHITE} stroke={PURP} strokeWidth={2} />
      <L x={241} y={286} size={14} fill={PURP}>Smart materials</L>
      <M x={131} y={316} size={10.5} fill={AMBER}>deformed</M>
      <Wire d="M66 332 L126 332 L156 356 L196 356" stroke={AMBER} width={4} />
      <Wire d="M131 362 L131 382" stroke={RED} width={2.4} marker="url(#msmArrR)" />
      <M x={150} y={378} size={10} fill={RED} anchor="start">heat</M>
      <Wire d="M66 392 L196 392" stroke={GREEN} width={4} className="msmm-pulse" />
      <M x={131} y={414} size={10.5} fill={GREEN}>shape recovered</M>
      <M x={336} y={306} size={10} fill={MUTED} anchor="start">load</M>
      <Wire d="M305 296 L305 316" stroke={N} width={2.4} marker="url(#msmArr)" />
      <rect x={270} y={320} width={70} height={60} rx={5} fill={SKY} stroke={PURP} strokeWidth={2.2} className="msmm-flux" />
      <Wire d="M340 344 L400 344" stroke={PURP} width={2.4} className="msmm-current" />
      <Dot cx={404} cy={344} r={5} fill={PURP} />
      <M x={305} y={404} size={10.5} fill={PURP}>charge under load</M>

      <rect x={458} y={262} width={410} height={200} rx={12} fill={WHITE} stroke={TEAL} strokeWidth={2} />
      <L x={663} y={286} size={14} fill={TEAL}>Nanomaterials</L>
      <Atom cx={508} cy={360} r={30} fill={SKY} stroke={TEAL} width={5} />
      <Atom cx={570} cy={360} r={18} fill={SKY} stroke={TEAL} width={5} />
      <Atom cx={614} cy={360} r={9} fill={SKY} stroke={TEAL} width={4} className="msmm-flux" />
      <M x={508} y={406} size={10} fill={MUTED}>1 µm</M>
      <M x={570} y={406} size={10} fill={MUTED}>100 nm</M>
      <M x={616} y={406} size={10} fill={MUTED}>10 nm</M>
      <M x={556} y={438} size={10.5} fill={TEAL}>most atoms lie at the surface</M>
      <Axes x={670} y={424} w={180} h={110} xLabel="size" yLabel="surface %" />
      <Curve pts={[[670, 318], [700, 344], [732, 380], [772, 406], [812, 418], [848, 421]]} stroke={TEAL} className="msmm-draw" />
    </Scene>
  )
}

export function UnitCellConceptScene() {
  const glass = [
    [528, 92], [576, 118], [624, 86], [672, 124], [726, 96], [778, 130], [826, 100],
    [512, 158], [566, 186], [612, 152], [668, 192], [722, 160], [772, 196], [822, 164],
    [524, 232], [578, 256], [630, 224], [684, 262], [732, 230], [784, 264], [834, 236],
    [548, 290], [604, 294], [660, 286], [712, 298], [764, 288], [816, 294],
  ]
  const tiles = [[226, 132], [278, 132], [174, 184], [226, 184]]
  return (
    <Scene caption="One repeating cell plus translation is a complete description of the crystal">
      <L x={250} y={44} size={13} fill={BLUE}>crystalline — long range order</L>
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3, 4, 5, 6, 7].map((c) => (
          <Dot key={`x${c}-${r}`} cx={70 + c * 52} cy={80 + r * 52} r={7} fill={BLUE} />
        )),
      )}
      {tiles.map(([tx, ty], i) => (
        <rect
          key={`t${tx}-${ty}`}
          x={tx}
          y={ty}
          width={52}
          height={52}
          fill="none"
          stroke={AMBER}
          strokeWidth={2}
          strokeDasharray="5 4"
          opacity={0.75}
          className={`msmm-cell-in msmm-delay-${i + 1}`}
        />
      ))}
      <rect x={174} y={132} width={52} height={52} fill="none" stroke={AMBER} strokeWidth={3.4} />
      <Wire d="M174 116 L226 116" stroke={AMBER} width={1.8} />
      <Wire d="M174 110 L174 122" stroke={AMBER} width={1.8} />
      <Wire d="M226 110 L226 122" stroke={AMBER} width={1.8} />
      <M x={200} y={106} size={12} fill={AMBER}>a</M>
      <L x={250} y={322} size={12.5} fill={BLUE}>
        the bold cell, translated, regenerates every atom
      </L>

      <L x={685} y={44} size={13} fill={RED}>amorphous — short range order only</L>
      {glass.map(([cx, cy]) => (
        <Dot key={`g${cx}-${cy}`} cx={cx} cy={cy} r={7} fill={MUTED} />
      ))}
      <rect x={640} y={150} width={52} height={52} fill="none" stroke={RED} strokeWidth={2.4} strokeDasharray="5 4" />
      <Wire d="M640 150 L692 202" stroke={RED} width={3.4} />
      <Wire d="M692 150 L640 202" stroke={RED} width={3.4} />
      <L x={685} y={322} size={12.5} fill={RED}>
        no cell repeats — there is nothing to translate
      </L>

      <Card x={40} y={356} w={260} h={96} title="Unit cell" accent={BLUE} lines={['the smallest volume that', 'regenerates the crystal']} linesY={58} lineH={22} />
      <Card x={320} y={356} w={260} h={96} title="Lattice parameter" accent={AMBER} lines={['the edge length a of', 'that cell, in nanometres']} linesY={58} lineH={22} />
      <Card x={600} y={356} w={260} h={96} title="Why it pays" accent={GREEN} lines={['bulk density computed', 'from one cell of atoms']} linesY={58} lineH={22} />
    </Scene>
  )
}

export function BccGeometryScene() {
  const [front, back] = cubeCorners(110, 180, 160, 54)
  const centre = [(front[3][0] + back[1][0]) / 2, (front[3][1] + back[1][1]) / 2]
  const [inF, inB] = cubeCorners(96, 410, 64, 22)
  const inCentre = [(inF[3][0] + inB[1][0]) / 2, (inF[3][1] + inB[1][1]) / 2]
  return (
    <Scene caption="Two atoms per cell, contact along the body diagonal, eight nearest neighbours">
      {front.map(([px, py], i) => (
        <Wire key={`f${i}`} d={`M${px} ${py} L${front[(i + 1) % 4][0]} ${front[(i + 1) % 4][1]}`} stroke={MUTED} width={2} />
      ))}
      {back.map(([px, py], i) => (
        <Wire key={`b${i}`} d={`M${px} ${py} L${back[(i + 1) % 4][0]} ${back[(i + 1) % 4][1]}`} stroke={MUTED} width={2} />
      ))}
      {front.map(([px, py], i) => (
        <Wire key={`c${i}`} d={`M${px} ${py} L${back[i][0]} ${back[i][1]}`} stroke={MUTED} width={2} />
      ))}
      <Wire d={`M${front[3][0]} ${front[3][1]} L${back[1][0]} ${back[1][1]}`} stroke={AMBER} width={3.4} className="msmm-pulse" />
      <g className="msmm-flux">
        {[...front, ...back].map(([px, py], i) => (
          <Atom key={`a${i}`} cx={px} cy={py} r={13} fill={SKY} stroke={BLUE} />
        ))}
        <Atom cx={centre[0]} cy={centre[1]} r={15} fill={AMBER} stroke={AMBER} />
      </g>
      <M x={352} y={168} size={12.5} fill={AMBER} anchor="start">√3 · a = 4R</M>
      <M x={352} y={190} size={11.5} fill={MUTED} anchor="start">a = 4R / √3</M>
      <M x={352} y={212} size={11.5} fill={MUTED} anchor="start">3 atom diameters</M>
      <L x={217} y={384} size={12.5} fill={BLUE}>eight corners and one body centre</L>

      {inF.map(([px, py], i) => (
        <Wire key={`if${i}`} d={`M${px} ${py} L${inF[(i + 1) % 4][0]} ${inF[(i + 1) % 4][1]}`} stroke={MUTED} width={1.4} />
      ))}
      {inB.map(([px, py], i) => (
        <Wire key={`ib${i}`} d={`M${px} ${py} L${inB[(i + 1) % 4][0]} ${inB[(i + 1) % 4][1]}`} stroke={MUTED} width={1.4} />
      ))}
      {inF.map(([px, py], i) => (
        <Wire key={`ic${i}`} d={`M${px} ${py} L${inB[i][0]} ${inB[i][1]}`} stroke={MUTED} width={1.4} />
      ))}
      {[...inF, ...inB].map(([px, py], i) => (
        <Dot key={`in${i}`} cx={px} cy={py} r={7} fill={GREEN} className={`msmm-pulse msmm-delay-${i % 5}`} />
      ))}
      <Dot cx={inCentre[0]} cy={inCentre[1]} r={9} fill={AMBER} />
      <L x={230} y={436} size={12.5} fill={GREEN} anchor="start">coordination number 8</L>
      <M x={230} y={458} size={11} fill={MUTED} anchor="start">it touches all eight corners</M>

      <Panel
        x={470}
        y={56}
        w={390}
        accent={AMBER}
        title="Atoms per cell"
        rows={[['8 corners × 1/8', '= 1'], ['1 body centre × 1', '= 1'], ['total', '= 2', AMBER]]}
      />
      <Card
        x={470}
        y={200}
        w={390}
        h={118}
        title="Geometry"
        accent={BLUE}
        mono
        lines={['atoms touch along the body diagonal', 'body diagonal = √3 · a = 4R', 'so a = 4R/√3 ≈ 2.31 R']}
        linesY={58}
        lineH={22}
      />
      <Card
        x={470}
        y={338}
        w={390}
        h={118}
        title="Who adopts it"
        accent={GREEN}
        lines={['α-iron at room temperature', 'chromium, tungsten, molybdenum', 'packing factor 0.68 — not close packed']}
        linesY={58}
        lineH={22}
      />
    </Scene>
  )
}

export function FccGeometryScene() {
  const [front, back] = cubeCorners(110, 170, 160, 54)
  const faces = [
    [(front[0][0] + front[2][0]) / 2, (front[0][1] + front[2][1]) / 2],
    [(back[0][0] + back[2][0]) / 2, (back[0][1] + back[2][1]) / 2],
    [(front[0][0] + back[1][0]) / 2, (front[0][1] + back[1][1]) / 2],
    [(front[3][0] + back[2][0]) / 2, (front[3][1] + back[2][1]) / 2],
    [(front[0][0] + back[3][0]) / 2, (front[0][1] + back[3][1]) / 2],
    [(front[1][0] + back[2][0]) / 2, (front[1][1] + back[2][1]) / 2],
  ]
  const ring = []
  for (let i = 0; i < 12; i += 1) {
    const a = (i * Math.PI) / 6
    ring.push([140 + Math.cos(a) * 42, 432 + Math.sin(a) * 42])
  }
  return (
    <Scene caption="Four atoms per cell, contact along the face diagonal, twelve neighbours — close packed">
      {front.map(([px, py], i) => (
        <Wire key={`f${i}`} d={`M${px} ${py} L${front[(i + 1) % 4][0]} ${front[(i + 1) % 4][1]}`} stroke={MUTED} width={2} />
      ))}
      {back.map(([px, py], i) => (
        <Wire key={`b${i}`} d={`M${px} ${py} L${back[(i + 1) % 4][0]} ${back[(i + 1) % 4][1]}`} stroke={MUTED} width={2} />
      ))}
      {front.map(([px, py], i) => (
        <Wire key={`c${i}`} d={`M${px} ${py} L${back[i][0]} ${back[i][1]}`} stroke={MUTED} width={2} />
      ))}
      <Wire d={`M${front[0][0]} ${front[0][1]} L${front[2][0]} ${front[2][1]}`} stroke={AMBER} width={3.4} className="msmm-pulse" />
      <g className="msmm-flux">
        {[...front, ...back].map(([px, py], i) => (
          <Atom key={`a${i}`} cx={px} cy={py} r={12} fill={SKY} stroke={BLUE} />
        ))}
        {faces.map(([px, py], i) => (
          <Atom key={`fa${i}`} cx={px} cy={py} r={13} fill={AMBER} stroke={AMBER} />
        ))}
      </g>
      <M x={352} y={168} size={12.5} fill={AMBER} anchor="start">√2 · a = 4R</M>
      <M x={352} y={190} size={11.5} fill={MUTED} anchor="start">a = 2R√2</M>
      <M x={352} y={212} size={11.5} fill={MUTED} anchor="start">face contact only</M>
      <L x={217} y={372} size={12.5} fill={BLUE}>eight corners and six face centres</L>

      <g className="msmm-spin-slow">
        {ring.map(([px, py], i) => (
          <Dot key={`r${i}`} cx={px} cy={py} r={7} fill={GREEN} />
        ))}
      </g>
      <Dot cx={140} cy={432} r={11} fill={AMBER} />
      <L x={224} y={424} size={12.5} fill={GREEN} anchor="start">coordination number 12</L>
      <M x={224} y={446} size={11} fill={MUTED} anchor="start">the maximum for equal spheres</M>

      <Panel
        x={470}
        y={56}
        w={390}
        accent={AMBER}
        title="Atoms per cell"
        rows={[['8 corners × 1/8', '= 1'], ['6 faces × 1/2', '= 3'], ['total', '= 4', AMBER]]}
      />
      <L x={680} y={194} size={12.5} fill={MUTED} weight={700}>coordination number</L>
      <Bars x={580} y={210} w={200} max={13} items={[['simple cubic', 6, MUTED], ['BCC', 8, BLUE], ['FCC and HCP', 12, AMBER]]} />
      <Card
        x={470}
        y={326}
        w={390}
        h={126}
        title="Who adopts it"
        accent={GREEN}
        lines={['aluminium, copper, nickel, silver', 'γ-iron above about 912 °C', 'packing factor 0.74 — close packed']}
        linesY={58}
        lineH={22}
      />
    </Scene>
  )
}

export function HcpStackingScene() {
  const hex = []
  for (let i = 0; i < 6; i += 1) {
    const a = (i * Math.PI) / 3
    hex.push([150 + Math.cos(a) * 52, 282 + Math.sin(a) * 52])
  }
  const layer = (x0, off, y, tone, key) =>
    [0, 1, 2, 3, 4].map((i) => <Atom key={`${key}${i}`} cx={x0 + off + i * 30} cy={y} r={13} fill={SKY} stroke={tone} />)
  return (
    <Scene caption="Identical packing to face-centred cubic — a different stacking, and far less ductility">
      <L x={150} y={62} size={13} fill={TEAL}>hexagonal: A B A B</L>
      {layer(70, 10, 104, TEAL, 'hb2')}
      {layer(70, 0, 136, TEAL, 'ha2')}
      {layer(70, 10, 168, TEAL, 'hb1')}
      {layer(70, 0, 200, TEAL, 'ha1')}
      {['B', 'A', 'B', 'A'].map((t, i) => (
        <M key={`hl${i}`} x={54} y={110 + i * 32} size={12} fill={TEAL} anchor="end" weight={800}>
          {t}
        </M>
      ))}
      <Wire d="M240 104 L240 168" stroke={TEAL} width={2.4} />
      <Wire d="M234 104 L246 104" stroke={TEAL} width={2.4} />
      <Wire d="M234 168 L246 168" stroke={TEAL} width={2.4} />
      <M x={250} y={140} size={11} fill={TEAL} anchor="start">repeat: 2 layers</M>

      <L x={560} y={62} size={13} fill={BLUE}>cubic: A B C A B C</L>
      {layer(480, 0, 104, BLUE, 'ca2')}
      {layer(480, 20, 136, BLUE, 'cc1')}
      {layer(480, 10, 168, BLUE, 'cb1')}
      {layer(480, 0, 200, BLUE, 'ca1')}
      {['A', 'C', 'B', 'A'].map((t, i) => (
        <M key={`cl${i}`} x={464} y={110 + i * 32} size={12} fill={BLUE} anchor="end" weight={800}>
          {t}
        </M>
      ))}
      <Wire d="M660 136 L660 200" stroke={BLUE} width={2.4} />
      <Wire d="M654 136 L666 136" stroke={BLUE} width={2.4} />
      <Wire d="M654 200 L666 200" stroke={BLUE} width={2.4} />
      <M x={670} y={172} size={11} fill={BLUE} anchor="start">repeat: 3 layers</M>

      <Wire d={hex.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${px.toFixed(1)} ${py.toFixed(1)}`).join(' ') + ' Z'} stroke={PURP} width={2.6} />
      {hex.map(([px, py], i) => (
        <Dot key={`hx${i}`} cx={px} cy={py} r={8} fill={PURP} />
      ))}
      <Dot cx={150} cy={282} r={8} fill={AMBER} />
      <L x={150} y={356} size={12} fill={PURP}>basal plane</L>
      <Panel
        x={250}
        y={236}
        w={230}
        accent={PURP}
        title="Atoms in the cell"
        rows={[['12 corners × 1/6', '= 2'], ['2 basal × 1/2', '= 1'], ['3 interior', '= 3'], ['total', '= 6', PURP]]}
      />

      <rect x={520} y={244} width={150} height={100} rx={8} fill={SKY} stroke={BLUE} strokeWidth={2} />
      {[[530, 260, 660, 300], [530, 300, 660, 260], [530, 330, 600, 252], [590, 336, 664, 254]].map(([x1, y1, x2, y2], i) => (
        <Wire key={`fs${i}`} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={BLUE} width={2} opacity={0.8} />
      ))}
      <L x={595} y={364} size={12} fill={BLUE}>cubic: many slip planes</L>
      <rect x={700} y={244} width={150} height={100} rx={8} fill={SKY} stroke={PURP} strokeWidth={2} />
      {[268, 294, 320].map((ly) => (
        <Wire key={`hs${ly}`} d={`M710 ${ly} L840 ${ly}`} stroke={PURP} width={2} opacity={0.8} />
      ))}
      <L x={775} y={364} size={12} fill={PURP}>hexagonal: basal only</L>
      <Bars x={640} y={392} w={180} max={50} items={[['cubic', 45, BLUE], ['hexagonal', 12, PURP]]} />
      <M x={730} y={468} size={11} fill={MUTED}>elongation to failure, %</M>
      <L x={250} y={420} size={12} fill={MUTED} weight={700}>same packing 0.74, same coordination 12</L>
      <L x={250} y={444} size={12} fill={RED}>different stacking, different ductility</L>
    </Scene>
  )
}

export function PackingFactorScene() {
  const cells = [
    { id: 'Sc', at: 150, name: 'simple cubic', r: 55, centre: null, tone: BLUE },
    { id: 'Bcc', at: 450, name: 'body-centred cubic', r: 47.6, centre: true, tone: AMBER },
    { id: 'Fcc', at: 750, name: 'face-centred cubic', r: 38.9, centre: true, tone: GREEN },
  ]
  const calcs = [
    ['1 atom per cell', 'a = 2R', 'V atoms = 1 · (4/3)πR³', 'V cell = 8R³', 'APF = 0.52'],
    ['2 atoms per cell', 'a = 4R/√3', 'V atoms = 2 · (4/3)πR³', 'V cell = 12.32R³', 'APF = 0.68'],
    ['4 atoms per cell', 'a = 2R√2', 'V atoms = 4 · (4/3)πR³', 'V cell = 22.63R³', 'APF = 0.74'],
  ]
  return (
    <Scene caption="Atoms per cell times sphere volume over cell volume — structure alone decides">
      <defs>
        {cells.map((c) => (
          <clipPath key={c.id} id={`msmCell${c.id}`}>
            <rect x={c.at - 55} y={64} width={110} height={110} />
          </clipPath>
        ))}
      </defs>
      {cells.map((c, i) => (
        <g key={c.id}>
          <L x={c.at} y={48} size={13} fill={c.tone}>{c.name}</L>
          {/* Void first, atoms clipped on top — what stays SKY is empty space. */}
          <rect x={c.at - 55} y={64} width={110} height={110} fill={SKY} stroke={N} strokeWidth={2.2} />
          <g clipPath={`url(#msmCell${c.id})`}>
            {[[c.at - 55, 64], [c.at + 55, 64], [c.at + 55, 174], [c.at - 55, 174]].map(([px, py], k) => (
              <circle key={k} cx={px} cy={py} r={c.r} fill={c.tone} opacity={0.85} stroke={N} strokeWidth={1.6} />
            ))}
            {c.centre ? <circle cx={c.at} cy={119} r={c.r} fill={c.tone} opacity={0.85} stroke={N} strokeWidth={1.6} /> : null}
          </g>
          <rect x={c.at - 125} y={200} width={250} height={118} rx={10} fill={WHITE} stroke={MUTED} strokeWidth={1.8} />
          {calcs[i].map((line, k) => (
            <M key={line} x={c.at} y={220 + k * 22} size={11.5} fill={k === 4 ? c.tone : N} weight={k === 4 ? 800 : 700}>
              {line}
            </M>
          ))}
        </g>
      ))}
      <M x={450} y={192} size={10.5} fill={MUTED}>the centre atom sits below this plane</M>
      <L x={588} y={336} size={11.5} fill={GREEN}>0.74 — the maximum for equal spheres</L>
      <Bars x={200} y={352} w={420} max={0.8} items={[['simple cubic', 0.52, MUTED], ['body-centred', 0.68, AMBER], ['face-centred / hcp', 0.74, GREEN]]} />
      <Wire d="M588 344 L588 448" stroke={GREEN} width={2.4} dash="8 6" />
      <L x={450} y={468} size={12.5} fill={MUTED} weight={700}>
        the factor is dimensionless — R cancels, so atomic size never enters
      </L>
    </Scene>
  )
}

export function DensityComputationScene() {
  const steps = [
    ['n × A', 'atoms per cell × g/mol'],
    ['÷ N_A', '6.022 × 10²³ per mol'],
    ['= mass in one cell', 'grams'],
    ['÷ V cell = a³', 'cm³ per cell'],
    ['ρ = n·A / (a³ · N_A)', 'g/cm³'],
  ]
  return (
    <Scene caption="Mass in one cell over the volume of that cell — and the units have to cancel">
      {steps.map(([label, sub], i) => (
        <g key={label} className={`msmm-cell-in msmm-delay-${i}`}>
          <Block
            x={60}
            y={50 + i * 66}
            w={340}
            h={52}
            label={label}
            sub={sub}
            mono
            stroke={i === 4 ? GREEN : BLUE}
            labelFill={i === 4 ? GREEN : N}
          />
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire key={i} d={`M230 ${104 + i * 66} L230 ${116 + i * 66}`} stroke={BLUE} width={2.4} marker="url(#msmArrB)" />
      ))}
      <L x={230} y={392} size={12} fill={GREEN} weight={700}>units cancel to g/cm³ — ×1000 for kg/m³</L>
      <M x={230} y={416} size={11} fill={MUTED}>α-iron: n = 2, A = 55.85, a = 0.287 nm</M>
      <L x={230} y={446} size={14} fill={AMBER}>ρ = 7.87 g/cm³</L>

      <L x={685} y={60} size={13} fill={BLUE}>computed against measured</L>
      <Bars
        x={620}
        y={100}
        w={200}
        max={8.4}
        items={[['computed', 7.87, BLUE], ['sound casting', 7.85, GREEN], ['porous casting', 7.1, RED]]}
      />
      <L x={685} y={206} size={12} fill={RED}>the shortfall is porosity</L>
      <Card
        x={510}
        y={230}
        w={350}
        h={130}
        title="What the comparison tells you"
        accent={TEAL}
        lines={[
          'agreement confirms the assumed structure',
          'measured below computed means porosity',
          'or a large defect population',
          'so the check is genuine, not a formality',
        ]}
        linesY={58}
        lineH={22}
      />
      <L x={685} y={392} size={12} fill={MUTED} weight={700}>same units on both sides — g/cm³</L>
      <L x={685} y={420} size={12.5} fill={GREEN}>structure alone predicts bulk density</L>
    </Scene>
  )
}

export function BraggDiffractionScene() {
  return (
    <Scene caption="Constructive interference only at particular angles — and those angles give the spacings">
      <L x={240} y={40} size={13} fill={BLUE}>reflection from successive planes</L>
      <Wire d="M60 150 L440 150" stroke={N} width={2} />
      <Wire d="M60 210 L440 210" stroke={N} width={2} />
      {[80, 130, 180, 230, 280, 330, 380, 430].map((cx) => (
        <g key={cx}>
          <Dot cx={cx} cy={150} r={6} fill={BLUE} />
          <Dot cx={cx} cy={210} r={6} fill={BLUE} />
        </g>
      ))}
      <Wire d="M446 150 L462 150" stroke={MUTED} width={1.6} />
      <Wire d="M446 210 L462 210" stroke={MUTED} width={1.6} />
      <Wire d="M454 150 L454 210" stroke={MUTED} width={1.8} />
      <M x={458} y={184} size={12} fill={MUTED} anchor="start">d</M>
      <Wire d="M40 60 L140 150" stroke={PURP} width={2.2} marker="url(#msmArrP)" />
      <Wire d="M140 150 L240 60" stroke={PURP} width={2.2} marker="url(#msmArrP)" />
      <Wire d="M106 60 L206 150" stroke={PURP} width={2.2} marker="url(#msmArrP)" />
      <Wire d="M206 150 L273 210 L340 150" stroke={AMBER} width={3.4} className="msmm-pulse" />
      <Wire d="M340 150 L440 60" stroke={PURP} width={2.2} marker="url(#msmArrP)" />
      <M x={70} y={176} size={11.5} fill={MUTED} anchor="start">θ measured from the plane</M>
      <L x={273} y={248} size={12.5} fill={AMBER}>the extra path is 2d sin θ</L>

      <Card x={490} y={54} w={390} h={110} title="in phase — n λ = 2d sin θ" accent={GREEN}>
        <Wave x={22} y={58} w={140} amp={11} cycles={2} stroke={GREEN} width={2} />
        <Wave x={22} y={86} w={140} amp={11} cycles={2} stroke={GREEN} width={2} />
        <M x={180} y={78} size={15} fill={GREEN}>⇒</M>
        <Wave x={200} y={72} w={160} amp={20} cycles={2} stroke={GREEN} width={3} className="msmm-pulse" />
      </Card>
      <Card x={490} y={176} w={390} h={100} title="any other angle — out of phase" accent={RED}>
        <Wave x={22} y={54} w={140} amp={11} cycles={2} stroke={RED} width={2} />
        <Wave x={22} y={80} w={140} amp={11} cycles={2} phase={3.1416} stroke={RED} width={2} />
        <M x={180} y={72} size={15} fill={RED}>⇒</M>
        <Wire d="M200 66 L360 66" stroke={RED} width={3} />
        <M x={280} y={90} size={10.5} fill={RED}>no intensity</M>
      </Card>

      <L x={460} y={310} size={12.5} fill={BLUE}>peaks appear only where the path difference is a whole λ</L>
      <Axes
        x={110}
        y={452}
        w={680}
        h={130}
        xLabel="2θ (degrees)"
        yLabel="intensity"
        tickLabels={[[210, '30'], [370, '45'], [530, '60'], [670, '75']]}
      />
      <Curve
        pts={[
          [110, 452], [200, 450], [210, 330], [220, 450], [360, 448], [370, 368], [380, 448],
          [520, 448], [530, 388], [540, 448], [660, 448], [670, 406], [680, 448], [790, 448],
        ]}
        stroke={BLUE}
        className="msmm-draw"
      />
      <M x={210} y={318} size={11} fill={BLUE}>(110)</M>
      <M x={370} y={356} size={11} fill={BLUE}>(200)</M>
      <M x={530} y={376} size={11} fill={BLUE}>(211)</M>
      <M x={670} y={394} size={11} fill={BLUE}>(220)</M>
    </Scene>
  )
}

export function PointDefectScene() {
  const legend = [
    ['vacancy', 'missing atom, neighbours relax in', RED],
    ['self interstitial', 'a host atom squeezed into a gap', AMBER],
    ['substitutional impurity', 'a foreign atom on a normal site', PURP],
    ['interstitial impurity', 'a foreign atom in a gap', GREEN],
    ['Schottky pair', 'a cation and an anion vacancy', RED],
  ]
  return (
    <Scene caption="Vacancies exist because entropy demands them — and their number climbs exponentially">
      <rect x={40} y={56} width={360} height={280} rx={12} fill={CREAM} stroke={MUTED} strokeWidth={1.8} />
      {[0, 1, 2, 3, 4].map((r) =>
        [0, 1, 2, 3, 4, 5].map((c) => {
          const cx = 70 + c * 56
          const cy = 86 + r * 56
          if (c === 1 && r === 1) return null
          if (c === 5 && r === 1) return null
          return <Atom key={`p${c}-${r}`} cx={cx} cy={cy} r={12} fill={SKY} stroke={BLUE} />
        }),
      )}
      <Atom cx={126} cy={142} r={12} fill={CREAM} stroke={RED} dash="4 4" />
      <Wire d="M86 142 L110 142" stroke={RED} width={2} marker="url(#msmArrR)" />
      <Wire d="M166 142 L142 142" stroke={RED} width={2} marker="url(#msmArrR)" />
      <Wire d="M126 102 L126 126" stroke={RED} width={2} marker="url(#msmArrR)" />
      <Wire d="M126 182 L126 158" stroke={RED} width={2} marker="url(#msmArrR)" />
      <circle cx={266} cy={226} r={42} fill="none" stroke={AMBER} strokeWidth={1.8} strokeDasharray="6 5" opacity={0.7} className="msmm-flux" />
      <Atom cx={266} cy={226} r={10} fill={AMBER} stroke={AMBER} />
      <Atom cx={350} cy={142} r={17} fill={PURP} stroke={PURP} />
      <Atom cx={154} cy={282} r={6} fill={GREEN} stroke={GREEN} />

      {legend.map(([name, note, tone], i) => (
        <g key={name} className={`msmm-cell-in msmm-delay-${i % 5}`}>
          <Dot cx={430} cy={76 + i * 56} r={9} fill={tone} />
          <L x={456} y={81 + i * 56} size={12} fill={tone} anchor="start">
            {name}
          </L>
          <M x={456} y={99 + i * 56} size={10} fill={MUTED} anchor="start">
            {note}
          </M>
        </g>
      ))}

      <L x={161} y={356} size={12} fill={N}>ionic lattice — charge must balance</L>
      {[0, 1].map((r) =>
        [0, 1, 2, 3].map((c) => {
          const cx = 80 + c * 54
          const cy = 380 + r * 48
          const gone = (c === 1 && r === 0) || (c === 2 && r === 1)
          return (
            <Atom
              key={`i${c}-${r}`}
              cx={cx}
              cy={cy}
              r={13}
              sign={gone ? null : (c + r) % 2 === 0 ? '+' : '–'}
              fill={gone ? CREAM : (c + r) % 2 === 0 ? SKY : WHITE}
              stroke={gone ? RED : (c + r) % 2 === 0 ? BLUE : ROSE}
              dash={gone ? '4 4' : undefined}
              className={gone ? 'msmm-pulse' : ''}
            />
          )
        }),
      )}
      <L x={180} y={468} size={11.5} fill={RED}>
        Schottky pair: one cation and one anion vacancy
      </L>
      <Card
        x={330}
        y={346}
        w={290}
        h={112}
        title="Why vacancies must exist"
        accent={GREEN}
        lines={['they raise the configurational entropy', 'free energy falls at any T above 0 K', 'so a finite number is unavoidable']}
        linesY={56}
        lineH={22}
      />

      <L x={760} y={76} size={12.5} fill={AMBER}>vacancy count against temperature</L>
      {/* Axis top pushed to y=150: at h=200 the "N_v / N" label sat 7 units
          from the legend note on the same line of x. */}
      <Axes x={670} y={330} w={200} h={180} xLabel="temperature T" yLabel="N_v / N" />
      <Curve pts={[[670, 326], [710, 322], [750, 310], [790, 284], [830, 224], [866, 156]]} stroke={AMBER} className="msmm-draw" />
      <Card
        x={640}
        y={386}
        w={240}
        h={90}
        title="Read it"
        accent={AMBER}
        mono
        lines={['N_v = N · exp(−Q_v / kT)', 'exponential in T, not linear']}
        linesY={56}
        lineH={22}
      />
    </Scene>
  )
}

export function DislocationMotionScene() {
  return (
    <Scene caption="One row of bonds at a time — which is why metals yield far below theoretical strength">
      <Wire d="M120 38 L280 38" stroke={AMBER} width={2.6} marker="url(#msmArrA)" />
      <M x={292} y={42} size={12} fill={AMBER} anchor="start">τ</M>
      <rect x={40} y={48} width={820} height={212} rx={12} fill={CREAM} stroke={MUTED} strokeWidth={1.8} />
      <L x={190} y={64} size={11.5} fill={AMBER}>extra half plane</L>
      {[86, 136].map((ry) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
          <Atom key={`t${ry}-${i}`} cx={70 + i * 53} cy={ry} r={9} fill={SKY} stroke={BLUE} width={1.6} />
        )),
      )}
      {[196, 246].map((ry) =>
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((i) => (
          <Atom key={`bm${ry}-${i}`} cx={70 + i * 57} cy={ry} r={9} fill={SKY} stroke={BLUE} width={1.6} />
        )),
      )}
      <Wire d="M56 170 L844 170" stroke={MUTED} width={1.8} dash="9 7" />
      <g className="msmm-search">
        <Wire d="M310 78 L310 146" stroke={AMBER} width={4} />
        <M x={310} y={164} size={19} fill={AMBER}>⊥</M>
      </g>
      <Wire d="M830 78 L830 170 L856 170 L856 254" stroke={GREEN} width={3} />
      <L x={280} y={286} size={12} fill={GREEN}>the dislocation emerges, leaving a unit step b</L>
      <Wire d="M780 286 L620 286" stroke={AMBER} width={2.6} marker="url(#msmArrA)" />
      <M x={800} y={290} size={12} fill={AMBER} anchor="start">τ</M>

      <L x={250} y={326} size={12.5} fill={BLUE}>stress needed to shear the crystal</L>
      <Bars x={210} y={346} w={220} max={220} items={[['dislocation glide', 18, GREEN], ['rigid plane slide', 200, RED]] } />
      <L x={250} y={436} size={11.5} fill={RED}>breaking every bond at once needs ~10× the stress</L>
      <L x={250} y={458} size={11.5} fill={MUTED} weight={700}>real metals take the cheaper route</L>

      <L x={690} y={326} size={12.5} fill={PURP}>a ripple, not a whole-body slide</L>
      <Wire d="M520 412 L850 412" stroke={MUTED} width={2} />
      {[540, 580, 620, 700, 740, 780, 820].map((cx) => (
        <Dot key={cx} cx={cx} cy={396} r={11} fill={SKY} stroke={PURP} />
      ))}
      <g className="msmm-search">
        <Dot cx={660} cy={370} r={11} fill={PURP} />
      </g>
      <L x={690} y={444} size={11.5} fill={MUTED} weight={700}>one segment lifts at a time</L>
    </Scene>
  )
}

export function GrainStructureScene() {
  const grains = [
    { d: 'M40 50 L200 50 L230 130 L120 170 L40 140 Z', cx: 130, cy: 104, ang: 20, fill: WHITE },
    { d: 'M200 50 L420 50 L420 120 L300 160 L230 130 Z', cx: 315, cy: 96, ang: -38, fill: SKY },
    { d: 'M40 140 L120 170 L150 250 L40 250 Z', cx: 92, cy: 200, ang: 72, fill: SKY },
    { d: 'M120 170 L230 130 L300 160 L280 250 L150 250 Z', cx: 214, cy: 196, ang: 4, fill: WHITE },
    { d: 'M300 160 L420 120 L420 250 L280 250 Z', cx: 350, cy: 200, ang: 48, fill: SKY },
  ]
  return (
    <Scene caption="Boundaries stop dislocations, so finer grains are stronger and tougher at once">
      <L x={230} y={42} size={12} fill={BLUE}>polycrystal</L>
      {grains.map((g) => (
        <path key={g.d} d={g.d} fill={g.fill} stroke={N} strokeWidth={2.2} />
      ))}
      {grains.map((g) =>
        [-1, 0, 1].map((k) => {
          const a = (g.ang * Math.PI) / 180
          const dx = Math.cos(a) * 17
          const dy = Math.sin(a) * 17
          const px = -Math.sin(a) * 13 * k
          const py = Math.cos(a) * 13 * k
          return (
            <Wire
              key={`${g.cx}-${k}`}
              d={`M${(g.cx + px - dx).toFixed(1)} ${(g.cy + py - dy).toFixed(1)} L${(g.cx + px + dx).toFixed(1)} ${(g.cy + py + dy).toFixed(1)}`}
              stroke={MUTED}
              width={1.8}
              opacity={0.85}
            />
          )
        }),
      )}
      <L x={230} y={272} size={12} fill={BLUE}>one material, one orientation per grain</L>

      <L x={655} y={42} size={12} fill={RED}>the boundary, magnified</L>
      <rect x={450} y={50} width={410} height={200} rx={10} fill={WHITE} stroke={MUTED} strokeWidth={1.8} />
      {[90, 130, 170, 210].map((ry) =>
        [0, 1, 2, 3, 4].map((i) => <Atom key={`gl${ry}-${i}`} cx={480 + i * 40} cy={ry} r={8} fill={SKY} stroke={BLUE} width={1.6} />),
      )}
      {[90, 130, 170, 210].map((ry, j) =>
        [0, 1, 2, 3, 4].map((i) => (
          <Atom key={`gr${ry}-${i}`} cx={674 + i * 36 + j * 8} cy={ry} r={8} fill={WHITE} stroke={PURP} width={1.6} />
        )),
      )}
      <Wire d="M658 70 C648 110 668 150 658 190 L658 230" stroke={RED} width={3.4} />
      <Wire d="M642 118 L642 186" stroke={RED} width={4} />
      <g className="msmm-search">
        <M x={560} y={156} size={19} fill={AMBER}>⊥</M>
      </g>
      <L x={558} y={270} size={11.5} fill={AMBER}>a dislocation glides…</L>
      <L x={762} y={270} size={11.5} fill={RED}>…and stops at the boundary</L>

      <rect x={60} y={300} width={100} height={80} rx={6} fill={WHITE} stroke={N} strokeWidth={1.8} />
      <Wire d="M110 300 L110 380" stroke={N} width={1.6} />
      <Wire d="M60 340 L160 340" stroke={N} width={1.6} />
      <rect x={190} y={300} width={100} height={80} rx={6} fill={WHITE} stroke={N} strokeWidth={1.8} />
      {[210, 230, 250, 270].map((gx) => (
        <Wire key={gx} d={`M${gx} 300 L${gx} 380`} stroke={N} width={1.4} />
      ))}
      {[320, 340, 360].map((gy) => (
        <Wire key={gy} d={`M190 ${gy} L290 ${gy}`} stroke={N} width={1.4} />
      ))}
      <L x={110} y={398} size={11.5} fill={MUTED} weight={700}>coarse grain</L>
      <L x={240} y={398} size={11.5} fill={GREEN} weight={700}>fine grain</L>
      <M x={365} y={296} size={11} fill={MUTED}>yield strength</M>
      <Wire d="M310 380 L425 380" stroke={MUTED} width={2} />
      <rect x={320} y={340} width={30} height={40} rx={3} fill={BLUE} className="msmm-bar" />
      <rect x={382} y={316} width={30} height={64} rx={3} fill={GREEN} className="msmm-bar msmm-delay-2" />
      <M x={335} y={398} size={10.5} fill={BLUE}>coarse</M>
      <M x={397} y={398} size={10.5} fill={GREEN}>fine</M>
      <L x={235} y={428} size={12} fill={GREEN}>finer grains: stronger and tougher</L>
      <L x={235} y={450} size={11} fill={MUTED} weight={700}>the rare strengthening route that does both</L>

      <L x={680} y={292} size={12} fill={PURP}>volume defects</L>
      <rect x={490} y={300} width={380} height={160} rx={12} fill={WHITE} stroke={MUTED} strokeWidth={1.8} />
      {[32, 42].map((rr) => (
        <circle key={rr} cx={570} cy={360} r={rr} fill="none" stroke={RED} strokeWidth={1.6} strokeDasharray="5 5" opacity={0.4} className="msmm-flux" />
      ))}
      <circle cx={570} cy={360} r={22} fill={CREAM} stroke={RED} strokeWidth={2.4} />
      {[36, 48].map((rr) => (
        <circle key={`i${rr}`} cx={762} cy={360} r={rr} fill="none" stroke={PURP} strokeWidth={1.6} strokeDasharray="5 5" opacity={0.4} className="msmm-flux" />
      ))}
      <rect x={740} y={340} width={44} height={40} rx={4} fill={PURP} />
      {/* Clear of the outermost stress ring (bottom y=408), not on it. */}
      <M x={570} y={424} size={11} fill={RED}>pore</M>
      <M x={762} y={424} size={11} fill={PURP}>inclusion</M>
      <M x={666} y={448} size={11} fill={MUTED}>both concentrate stress around them</M>
    </Scene>
  )
}

/* ── Module 2 ────────────────────────────────────────────────────────── */

export function SameCompositionScene() {
  const lamellae = [98, 118, 138, 158, 178, 198, 218]
  const needles = []
  for (let i = 0; i < 9; i += 1) {
    for (let j = 0; j < 6; j += 1) needles.push([336 + i * 28, 104 + j * 22, (i + j) % 2 ? 1 : -1])
  }
  return (
    <Scene caption="Two identical analysis certificates — and two different components">
      <L x={168} y={44} size={12} fill={MUTED} weight={800}>specimen A</L>
      <L x={448} y={44} size={12} fill={MUTED} weight={800}>specimen B</L>
      <g className="msmm-emerge">
        <rect x={36} y={56} width={264} height={26} rx={7} fill={SKY} stroke={BLUE} strokeWidth={2} />
        <rect x={316} y={56} width={264} height={26} rx={7} fill={SKY} stroke={BLUE} strokeWidth={2} />
        <M x={168} y={74} size={12} fill={BLUE} weight={800}>Fe – 0.80 C wt %</M>
        <M x={448} y={74} size={12} fill={BLUE} weight={800}>Fe – 0.80 C wt %</M>
      </g>

      <rect x={36} y={88} width={264} height={150} rx={10} fill={CREAM} stroke={MUTED} strokeWidth={1.8} />
      <g className="msmm-cell-in">
        {lamellae.map((py) => (
          <Wire key={`pl${py}`} d={`M44 ${py} L166 ${py}`} stroke={N} width={5} />
        ))}
        {lamellae.map((py) => (
          <Wire key={`pr${py}`} d={`M172 ${py - 2} L294 ${py + 18}`} stroke={N} width={5} />
        ))}
      </g>
      <rect x={316} y={88} width={264} height={150} rx={10} fill={CREAM} stroke={MUTED} strokeWidth={1.8} />
      <g className="msmm-cell-in msmm-delay-2">
        {needles.map(([nx, ny, dir]) => (
          <Wire key={`nd${nx}-${ny}`} d={`M${nx - 9} ${ny - 9 * dir} L${nx + 9} ${ny + 9 * dir}`} stroke={N} width={1.8} />
        ))}
      </g>
      <L x={168} y={256} size={11.5} fill={BLUE}>coarse pearlite — wide lamellae</L>
      <L x={448} y={256} size={11.5} fill={AMBER}>fine tempered martensite</L>

      {/* Dashed frames painted before the bars they enclose — paint order is
          the only z-index SVG has. */}
      <rect x={36} y={266} width={264} height={80} rx={9} fill="none" stroke={RED} strokeWidth={1.8} strokeDasharray="7 6" />
      <rect x={316} y={266} width={264} height={80} rx={9} fill="none" stroke={RED} strokeWidth={1.8} strokeDasharray="7 6" />
      <Bars x={136} y={276} w={140} max={1600} items={[['σy MPa', 640, BLUE]]} />
      <Bars x={136} y={312} w={140} max={100} items={[['KIc', 42, ROSE]]} />
      <Bars x={416} y={276} w={140} max={1600} items={[['σy MPa', 1480, AMBER]]} />
      <Bars x={416} y={312} w={140} max={100} items={[['KIc', 78, GREEN]]} />
      <L x={308} y={370} size={12.5} fill={RED}>same composition — 2.3× the strength, 1.9× the toughness</L>

      <Card
        x={596}
        y={56}
        w={268}
        h={252}
        title="What microscopy is for"
        accent={TEAL}
        lines={['verify the heat treatment', 'measure the grain size', 'identify phases and fractions', 'diagnose why it failed']}
        linesY={70}
        lineH={28}
        foot="composition analysis answers none of these"
        footTone={MUTED}
      />
      <Card
        x={596}
        y={326}
        w={268}
        h={100}
        title="The failure this prevents"
        accent={RED}
        lines={['the certificate matched', 'the structure did not', 'the shaft broke anyway']}
        linesY={54}
        lineH={20}
      />
      <rect x={36} y={440} width={828} height={52} rx={12} fill={WHITE} stroke={GREEN} strokeWidth={2.4} />
      <L x={450} y={472} size={13.5} fill={N} weight={750}>
        composition does not fix properties — the microstructure does, and only the microscope shows it
      </L>
    </Scene>
  )
}

export function PreparationSequenceScene() {
  const stages = [
    ['1 · section', 'rough, torn surface'],
    ['2 · mount', 'held for handling'],
    ['3 · grind', 'scratches get finer'],
    ['4 · polish', 'mirror — and blank'],
    ['5 · etch', 'the structure appears'],
  ]
  const px = (i) => 36 + i * 170
  return (
    <Scene caption="Four steps make it flat; only the fifth makes it visible">
      {stages.map(([name, note], i) => (
        <g key={name}>
          <L x={px(i) + 77} y={58} size={11.5} fill={i === 4 ? AMBER : BLUE} weight={800}>
            {name}
          </L>
          <rect x={px(i)} y={70} width={154} height={140} rx={10} fill={CREAM} stroke={MUTED} strokeWidth={1.8} />
          <M x={px(i) + 77} y={230} size={10.5} fill={MUTED}>
            {note}
          </M>
        </g>
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire key={`ar${i}`} d={`M${px(i) + 156} 140 L${px(i) + 168} 140`} stroke={BLUE} width={2.2} marker="url(#msmArrB)" className={`msmm-flow-arrow msmm-delay-${i}`} />
      ))}

      {/* 1 — sectioned: a torn, jagged surface */}
      <g className="msmm-cell-in">
        <path d="M48 118 L66 104 L84 120 L104 100 L124 118 L142 106 L142 190 L48 190 Z" fill={SKY} stroke={MUTED} strokeWidth={1.8} />
      </g>
      {/* 2 — mounted in a cylindrical mount */}
      <g className="msmm-cell-in msmm-delay-1">
        <rect x={228} y={112} width={104} height={72} fill={WHITE} stroke={PURP} strokeWidth={2.2} />
        <ellipse cx={280} cy={112} rx={52} ry={13} fill={SKY} stroke={PURP} strokeWidth={2.2} />
        <ellipse cx={280} cy={184} rx={52} ry={13} fill={WHITE} stroke={PURP} strokeWidth={2.2} />
        <rect x={262} y={104} width={36} height={16} rx={2} fill={N} />
      </g>
      {/* 3 — ground through progressively finer abrasives */}
      <g className="msmm-cell-in msmm-delay-2">
        <rect x={386} y={96} width={134} height={94} rx={4} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
        {[0, 1, 2, 3, 4].map((k) => (
          <Wire key={`g1${k}`} d={`M392 ${104 + k * 6} L514 ${104 + k * 6}`} stroke={N} width={2.6} opacity={0.75} />
        ))}
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <Wire key={`g2${k}`} d={`M392 ${140 + k * 5} L514 ${140 + k * 5}`} stroke={N} width={1.6} opacity={0.6} />
        ))}
        {[0, 1, 2, 3, 4, 5, 6].map((k) => (
          <Wire key={`g3${k}`} d={`M392 ${174 + k * 2.4} L514 ${174 + k * 2.4}`} stroke={N} width={0.9} opacity={0.5} />
        ))}
      </g>
      {/* 4 — polished: flat, featureless, reflects uniformly */}
      <g className="msmm-cell-in msmm-delay-3">
        <rect x={556} y={96} width={134} height={94} rx={4} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
        <Wire d="M566 176 L666 106" stroke={WHITE} width={9} opacity={0.9} />
        <M x={623} y={148} size={10.5} fill={MUTED}>nothing to see</M>
      </g>
      {/* 5 — etched: the grain network appears */}
      <g className="msmm-emerge">
        <rect x={726} y={96} width={134} height={94} rx={4} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
        <Wire d="M726 132 L762 118 L800 134 L830 116 L860 126" stroke={N} width={2} />
        <Wire d="M726 168 L758 162 L796 178 L834 164 L860 172" stroke={N} width={2} />
        <Wire d="M762 118 L758 162" stroke={N} width={2} />
        <Wire d="M800 134 L796 178" stroke={N} width={2} />
        <Wire d="M830 116 L834 164" stroke={N} width={2} />
      </g>

      <Card
        x={36}
        y={252}
        w={300}
        h={122}
        title="Caution — sectioning"
        accent={RED}
        lines={['overheating alters the very', 'structure you came to examine', 'cut slowly, flood with coolant']}
        linesY={58}
        lineH={22}
      />

      <L x={625} y={248} size={12} fill={AMBER}>the etch, magnified — attack is preferential</L>
      <rect x={380} y={258} width={490} height={162} rx={10} fill={WHITE} stroke={MUTED} strokeWidth={1.8} />
      <path d="M392 330 L636 330 L652 352 L668 330 L858 330 L858 382 L392 382 Z" fill={SKY} />
      <Wire d="M392 330 L636 330 L652 352 L668 330 L858 330" stroke={N} width={2.4} />
      <Wire d="M470 272 L470 324" stroke={TEAL} width={2.4} marker="url(#msmArrT)" className="msmm-current" />
      <Wire d="M652 272 L652 344" stroke={TEAL} width={2.4} marker="url(#msmArrT)" className="msmm-current" />
      <Wire d="M654 350 L612 306" stroke={RED} width={2.2} marker="url(#msmArrR)" />
      <Wire d="M658 350 L700 306" stroke={RED} width={2.2} marker="url(#msmArrR)" />
      <M x={392} y={298} size={11} fill={TEAL} anchor="start">reagent</M>
      <M x={718} y={300} size={11} fill={RED} anchor="start">grooved boundary</M>
      <M x={652} y={372} size={11} fill={MUTED}>relief is what the eye finally sees</M>
      <M x={398} y={406} size={11} fill={AMBER} anchor="start">flat grain → bright</M>
      <M x={856} y={406} size={11} fill={RED} anchor="end">groove → dark</M>

      <rect x={36} y={436} width={828} height={52} rx={12} fill={WHITE} stroke={GREEN} strokeWidth={2.4} />
      <L x={450} y={468} size={13.5} fill={N} weight={750}>
        a polished surface reflects uniformly and shows nothing — the etch creates the relief
      </L>
    </Scene>
  )
}

export function ResolutionMagnificationScene() {
  const frames = [0, 1, 2]
  const fx = (i) => 36 + i * 148
  const gap = [14, 34, 66]
  const rad = [3.5, 7, 13]
  const blob = [[9, 6], [18, 12], [34, 22]]
  const mags = ['×250', '×1000', '×4000']
  // Eight decades of feature size across 280 px — the same log strip carries
  // wavelengths and the resolution limits they imply.
  const xOf = (nm) => 574 + (Math.log10(nm) + 3) * 35
  return (
    <Scene caption="Magnification enlarges; only resolution separates">
      <L x={254} y={62} size={12} fill={GREEN} weight={800}>resolution sufficient — two features stay two</L>
      {frames.map((i) => (
        <g key={`ok${i}`} className={`msmm-cell-in msmm-delay-${i}`}>
          <rect x={fx(i)} y={74} width={140} height={112} rx={9} fill={WHITE} stroke={GREEN} strokeWidth={2.2} />
          <Dot cx={fx(i) + 70 - gap[i] / 2} cy={124} r={rad[i]} fill={N} />
          <Dot cx={fx(i) + 70 + gap[i] / 2} cy={124} r={rad[i]} fill={N} />
          <M x={fx(i) + 70} y={174} size={11} fill={MUTED}>
            {mags[i]}
          </M>
        </g>
      ))}
      <L x={254} y={214} size={12} fill={RED} weight={800}>resolution insufficient — they were merged at the start</L>
      {frames.map((i) => (
        <g key={`no${i}`} className={`msmm-cell-in msmm-delay-${i + 2}`}>
          <rect x={fx(i)} y={226} width={140} height={112} rx={9} fill={WHITE} stroke={RED} strokeWidth={2.2} />
          <ellipse cx={fx(i) + 70} cy={276} rx={blob[i][0]} ry={blob[i][1]} fill={N} opacity={0.55} />
          <ellipse cx={fx(i) + 70} cy={276} rx={blob[i][0] + 5} ry={blob[i][1] + 4} fill="none" stroke={N} strokeWidth={1.4} strokeDasharray="4 4" opacity={0.35} />
          <M x={fx(i) + 70} y={326} size={11} fill={MUTED}>
            {mags[i]}
          </M>
        </g>
      ))}
      <L x={330} y={362} size={12} fill={RED}>empty magnification — a bigger blur, not more information</L>
      <L x={254} y={388} size={11.5} fill={MUTED} weight={700}>the blur is set at the objective; no later enlargement undoes it</L>

      <L x={712} y={52} size={12} fill={BLUE}>wavelength sets the limit: d ≈ λ / 2</L>
      <Wire d={`M${xOf(0.004)} 106 L${xOf(0.004)} 84`} stroke={PURP} width={2} />
      <M x={xOf(0.004) - 6} y={80} size={10.5} fill={PURP} anchor="start">electrons λ ≈ 4 pm</M>
      <Wire d={`M${xOf(500)} 106 L${xOf(500)} 96`} stroke={AMBER} width={2} />
      <M x={xOf(500) + 8} y={102} size={10.5} fill={AMBER} anchor="end">visible light λ 500 nm</M>
      <Wire d="M574 110 L858 110" stroke={MUTED} width={2.2} marker="url(#msmArr)" />
      {[[0.001, '1 pm'], [0.1, '0.1 nm'], [10, '10 nm'], [1000, '1 µm'], [100000, '100 µm']].map(([v, label]) => (
        <g key={String(label)}>
          <Wire d={`M${xOf(v)} 106 L${xOf(v)} 116`} stroke={MUTED} width={2} />
          <M x={xOf(v)} y={132} size={10} fill={MUTED}>
            {label}
          </M>
        </g>
      ))}
      <Dot cx={xOf(0.004)} cy={110} r={4.5} fill={PURP} className="msmm-pulse" />
      <Dot cx={xOf(500)} cy={110} r={4.5} fill={AMBER} className="msmm-pulse" />

      <Panel
        x={560}
        y={152}
        w={300}
        title="Resolution actually available"
        accent={BLUE}
        rows={[
          ['optical (visible light)', '≈ 200 nm'],
          ['scanning electron', '≈ 2 nm'],
          ['transmission electron', '≈ 0.2 nm', PURP],
        ]}
      />
      <Panel
        x={560}
        y={290}
        w={300}
        title="What has to be resolved"
        accent={TEAL}
        rows={[
          ['dislocation core', '≈ 1 nm', PURP],
          ['fine precipitate', '20 nm', PURP],
          ['pearlite lamella', '300 nm', BLUE],
          ['grain', '30 µm', BLUE],
        ]}
      />
      <L x={710} y={478} size={11.5} fill={MUTED} weight={700}>match the row above to the row below — that is the whole choice</L>
    </Scene>
  )
}

export function OpticalMicroscopePathScene() {
  return (
    <Scene caption="Reflected light through the objective — routine, quick, and limited by λ">
      <L x={242} y={30} size={11} fill={MUTED} weight={700}>image to the eye</L>
      <Block x={196} y={40} w={92} h={34} label="eyepiece" stroke={PURP} />
      <Wire d="M242 138 L242 80" stroke={PURP} width={2.6} marker="url(#msmArrP)" className="msmm-current-slow" />
      <Wire d="M220 142 L262 180" stroke={MUTED} width={3.4} />
      <M x={274} y={152} size={10.5} fill={MUTED} anchor="start">half-mirror</M>
      <Block x={56} y={140} w={84} h={40} label="lamp" stroke={AMBER} />
      <Wire d="M144 160 L212 160" stroke={AMBER} width={2.6} marker="url(#msmArrA)" className="msmm-current" />
      <Wire d="M234 182 L234 240" stroke={AMBER} width={2.6} marker="url(#msmArrA)" className="msmm-current" />
      <path d="M206 244 L278 244 L262 286 L222 286 Z" fill={WHITE} stroke={BLUE} strokeWidth={2.5} />
      <L x={298} y={270} size={12} fill={BLUE} anchor="start">objective</L>
      <Wire d="M234 290 L234 332" stroke={AMBER} width={2.6} marker="url(#msmArrA)" className="msmm-current" />
      <Wire d="M252 332 L252 290" stroke={PURP} width={2.6} marker="url(#msmArrP)" className="msmm-current-slow" />
      <Wire d="M252 242 L252 184" stroke={PURP} width={2.6} marker="url(#msmArrP)" className="msmm-current-slow" />
      <rect x={150} y={336} width={184} height={42} rx={4} fill={SKY} stroke={MUTED} strokeWidth={2} />
      {[186, 242, 298].map((gx) => (
        <path key={gx} d={`M${gx - 7} 336 L${gx} 352 L${gx + 7} 336`} fill="none" stroke={N} strokeWidth={2.2} />
      ))}
      <L x={242} y={398} size={12} fill={MUTED} weight={700}>etched specimen surface</L>
      <L x={242} y={424} size={11.5} fill={RED}>metals are opaque — the light must come back, not through</L>
      <L x={242} y={448} size={11} fill={MUTED} weight={700}>so the objective both illuminates and collects</L>

      <L x={670} y={48} size={12} fill={BLUE}>why the boundary prints dark</L>
      <rect x={470} y={58} width={400} height={196} rx={10} fill={WHITE} stroke={MUTED} strokeWidth={1.8} />
      <path d="M482 190 L636 190 L652 212 L668 190 L858 190 L858 242 L482 242 Z" fill={SKY} />
      <Wire d="M482 190 L636 190 L652 212 L668 190 L858 190" stroke={N} width={2.4} />
      <Wire d="M520 88 L520 184" stroke={AMBER} width={2.2} marker="url(#msmArrA)" />
      <Wire d="M534 184 L534 92" stroke={AMBER} width={2.2} marker="url(#msmArrA)" />
      <M x={548} y={106} size={10.5} fill={AMBER} anchor="start">straight back in → bright</M>
      <Wire d="M652 88 L652 204" stroke={AMBER} width={2.2} marker="url(#msmArrA)" />
      <Wire d="M654 210 L606 162" stroke={RED} width={2.2} marker="url(#msmArrR)" />
      <Wire d="M658 210 L706 162" stroke={RED} width={2.2} marker="url(#msmArrR)" />
      <M x={716} y={168} size={10.5} fill={RED} anchor="start">scattered away → dark</M>
      <M x={652} y={232} size={10.5} fill={MUTED}>flat interiors reflect, grooves do not</M>

      <Panel
        x={470}
        y={272}
        w={400}
        title="Optical microscope — capability"
        accent={BLUE}
        rows={[
          ['useful magnification', '10× – 1500×'],
          ['resolution limit', '≈ 200 nm'],
          ['vacuum needed', 'none', GREEN],
          ['routine use', 'grain size · phases · HT check'],
        ]}
      />
    </Scene>
  )
}

export function SemImagingScene() {
  const pixels = []
  for (let r = 0; r < 7; r += 1) {
    for (let c = 0; c < 10; c += 1) pixels.push([336 + c * 19, 64 + r * 19, ((r * 7 + c * 3) % 5) / 6 + 0.2])
  }
  const facet = (i) => 552 + i * 44
  return (
    <Scene caption="One point at a time — and every point of a rough surface in focus at once">
      <L x={173} y={34} size={11.5} fill={MUTED} weight={700}>electron column</L>
      <Block x={118} y={42} w={110} h={34} label="electron gun" stroke={PURP} size={11} />
      <Wire d="M173 78 L173 126" stroke={PURP} width={2.6} marker="url(#msmArrP)" className="msmm-current" />
      <rect x={136} y={132} width={22} height={28} rx={4} fill={SKY} stroke={TEAL} strokeWidth={2} />
      <rect x={188} y={132} width={22} height={28} rx={4} fill={SKY} stroke={TEAL} strokeWidth={2} />
      <M x={226} y={150} size={10.5} fill={TEAL} anchor="start">scan coils</M>
      <Wire d="M173 166 L112 288" stroke={PURP} width={1.6} dash="5 5" opacity={0.6} />
      <Wire d="M173 166 L258 288" stroke={PURP} width={1.6} dash="5 5" opacity={0.6} />
      <Wire d="M173 166 L173 288" stroke={PURP} width={2.6} marker="url(#msmArrP)" />
      <rect x={100} y={292} width={170} height={44} rx={4} fill={SKY} stroke={MUTED} strokeWidth={2} />
      <Wire d="M110 292 L262 292" stroke={AMBER} width={2} dash="6 5" />
      {/* The sweep distance is a CSS variable, so it rides on a wrapper group —
          Dot takes no style prop. */}
      <g className="msmm-sweep-x" style={{ '--msmm-sweep': '146px' }}>
        <Dot cx={112} cy={292} r={5} fill={AMBER} />
      </g>
      <rect x={252} y={220} width={48} height={30} rx={6} fill={WHITE} stroke={GREEN} strokeWidth={2.2} />
      <M x={276} y={239} size={10} fill={GREEN}>detector</M>
      <Wire d="M204 288 L250 250" stroke={GREEN} width={2.2} marker="url(#msmArrG)" className="msmm-current" />
      <Wire d="M188 288 L244 252" stroke={GREEN} width={1.8} opacity={0.6} />
      <L x={178} y={358} size={11.5} fill={MUTED} weight={700}>specimen — the beam rasters across it</L>
      <Wire d="M302 234 L316 234 L316 138 L328 138" stroke={GREEN} width={2.2} marker="url(#msmArrG)" />
      <M x={310} y={196} size={10} fill={GREEN} anchor="end">signal</M>
      {/* Two short lines: one long line ran under the optical panel at x=330,
          which paints later and would have covered it. */}
      <L x={170} y={382} size={11} fill={AMBER} weight={700}>yield at each point</L>
      <L x={170} y={402} size={11} fill={AMBER} weight={700}>→ brightness of that pixel</L>

      <L x={430} y={48} size={11.5} fill={TEAL} weight={800}>the image builds point by point</L>
      <rect x={330} y={56} width={200} height={150} rx={8} fill={WHITE} stroke={TEAL} strokeWidth={2} />
      {pixels.map(([cx, cy, op], i) => (
        <rect key={`px${cx}-${cy}`} x={cx} y={cy} width={17} height={17} fill={N} opacity={op} className={`msmm-cell-in msmm-delay-${i % 5}`} />
      ))}

      <L x={710} y={48} size={11.5} fill={AMBER} weight={800}>a tilted facet emits more than a flat one</L>
      <rect x={550} y={56} width={320} height={150} rx={8} fill={WHITE} stroke={AMBER} strokeWidth={2} />
      <Wire d="M562 176 L672 176" stroke={N} width={2.6} />
      <Wire d="M700 190 L840 130" stroke={N} width={2.6} />
      <Wire d={`M${facet(1)} 92 L${facet(1)} 170`} stroke={PURP} width={2.2} marker="url(#msmArrP)" />
      <Wire d="M770 92 L770 156" stroke={PURP} width={2.2} marker="url(#msmArrP)" />
      {[0, 1].map((k) => (
        <Wire key={`sf${k}`} d={`M${600 + k * 8} 170 L${586 + k * 22} 138`} stroke={GREEN} width={1.8} marker="url(#msmArrG)" />
      ))}
      {[0, 1, 2, 3].map((k) => (
        <Wire key={`st${k}`} d={`M${772 + k * 4} 154 L${744 + k * 20} 112`} stroke={GREEN} width={1.8} marker="url(#msmArrG)" />
      ))}
      <M x={562} y={196} size={10.5} fill={MUTED} anchor="start">flat → fewer escape</M>
      <M x={858} y={196} size={10.5} fill={GREEN} anchor="end">tilted → more escape</M>

      <L x={430} y={232} size={11.5} fill={RED} weight={800}>optical — one plane in focus</L>
      <rect x={330} y={244} width={200} height={158} rx={8} fill={WHITE} stroke={RED} strokeWidth={2} />
      <Wire d="M340 356 L366 306 L392 372 L420 296 L448 364 L476 312 L520 350" stroke={N} width={7} opacity={0.22} />
      <Wire d="M340 356 L366 306 L392 372 L420 296 L448 364 L476 312 L520 350" stroke={N} width={2.4} opacity={0.35} />
      <rect x={330} y={330} width={200} height={26} fill={GREEN} opacity={0.14} />
      <M x={430} y={324} size={10.5} fill={GREEN}>only this band is sharp</M>
      <M x={430} y={388} size={10.5} fill={RED}>everything else is a blur</M>

      <L x={712} y={232} size={11.5} fill={GREEN} weight={800}>SEM — sharp from peak to valley</L>
      <rect x={552} y={244} width={318} height={158} rx={8} fill={WHITE} stroke={GREEN} strokeWidth={2} />
      <Wire d="M562 356 L600 300 L640 378 L684 292 L726 368 L770 304 L812 360 L860 316" stroke={N} width={2.6} />
      {[600, 684, 770].map((hx, i) => (
        <Wire key={`hl${hx}`} d={`M${hx - 16} ${[312, 304, 316][i]} L${hx + 16} ${[312, 304, 316][i]}`} stroke={GREEN} width={2} opacity={0.7} />
      ))}
      <M x={712} y={388} size={10.5} fill={GREEN}>enormous depth of field — the fracture-surface instrument</M>

      <rect x={36} y={424} width={828} height={48} rx={12} fill={WHITE} stroke={PURP} strokeWidth={2.4} />
      <L x={450} y={454} size={13} fill={N} weight={750}>
        raster a beam, collect the secondary electrons — a few nanometres of resolution and relief you can read
      </L>
    </Scene>
  )
}

export function TemThinFoilScene() {
  const planes = []
  for (let i = -6; i <= 6; i += 1) {
    const x0 = 650 + i * 32
    const b = i === 0 ? 0 : (18 * Math.sign(i)) / Math.abs(i)
    planes.push([x0, b])
  }
  return (
    <Scene caption="Through a foil, not off a surface — the only way to see a dislocation on its own">
      <L x={200} y={32} size={11.5} fill={MUTED} weight={700}>transmission column</L>
      <Block x={145} y={40} w={110} h={32} label="electron gun" stroke={PURP} size={10.5} />
      <Wire d="M200 72 L200 176" stroke={PURP} width={2.6} marker="url(#msmArrP)" className="msmm-current" />
      <rect x={118} y={182} width={164} height={8} rx={2} fill={SKY} stroke={BLUE} strokeWidth={1.8} />
      <M x={292} y={190} size={10.5} fill={BLUE} anchor="start">foil &lt; 100 nm</M>
      <Wire d="M200 194 L200 266" stroke={PURP} width={2.6} marker="url(#msmArrP)" className="msmm-current" />
      <Wire d="M206 194 L246 266" stroke={ROSE} width={2} dash="6 5" marker="url(#msmArrRo)" />
      <M x={262} y={240} size={10} fill={ROSE} anchor="start">diffracted</M>
      <rect x={120} y={272} width={160} height={76} rx={6} fill={WHITE} stroke={MUTED} strokeWidth={2} />
      <Wire d="M140 336 C172 300 198 330 262 292" stroke={N} width={3.4} className="msmm-emerge" />
      <L x={200} y={366} size={11} fill={N} weight={750}>one dislocation → one dark line</L>

      <L x={196} y={392} size={11.5} fill={TEAL} weight={800}>thinning is the hard part</L>
      <rect x={48} y={404} width={80} height={26} rx={2} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
      <rect x={156} y={412} width={80} height={11} rx={2} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
      <rect x={264} y={416} width={80} height={4} rx={1} fill={SKY} stroke={BLUE} strokeWidth={1.6} />
      <Wire d="M132 418 L152 418" stroke={BLUE} width={2} marker="url(#msmArrB)" className="msmm-flow-arrow" />
      <Wire d="M240 418 L260 418" stroke={BLUE} width={2} marker="url(#msmArrB)" className="msmm-flow-arrow msmm-delay-2" />
      <M x={88} y={448} size={10.5} fill={MUTED}>bulk 3 mm</M>
      <M x={196} y={448} size={10.5} fill={MUTED}>dimpled</M>
      <M x={304} y={448} size={10.5} fill={BLUE}>&lt; 100 nm</M>

      <L x={650} y={42} size={12} fill={BLUE} weight={800}>diffraction contrast at a dislocation</L>
      <rect x={430} y={50} width={440} height={230} rx={10} fill={WHITE} stroke={MUTED} strokeWidth={1.8} />
      {planes.map(([x0, b]) => (
        <Wire key={`pl${x0}`} d={`M${x0} 70 C${x0 + b} 110 ${x0 - b} 152 ${x0} 190`} stroke={BLUE} width={1.8} opacity={0.8} />
      ))}
      <circle cx={650} cy={130} r={13} fill={WHITE} />
      <g className="msmm-pulse">
        <M x={650} y={137} size={19} fill={AMBER}>⊥</M>
      </g>
      <M x={856} y={86} size={10.5} fill={PURP} anchor="end">lattice locally bent</M>
      <M x={444} y={86} size={10.5} fill={MUTED} anchor="start">planes unbent here</M>
      <Wire d="M650 196 L650 208" stroke={N} width={2} marker="url(#msmArr)" />
      <rect x={470} y={212} width={360} height={32} rx={5} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
      <Wire d="M650 214 L650 242" stroke={N} width={4.5} className="msmm-emerge" />
      <M x={650} y={264} size={10.5} fill={N}>the beam is diffracted away → that line prints dark</M>

      <Panel
        x={430}
        y={296}
        w={440}
        title="TEM — what it buys and what it costs"
        accent={PURP}
        rows={[
          ['resolution', 'atomic', GREEN],
          ['dislocations imaged', 'individually', GREEN],
          ['specimen preparation', 'difficult', RED],
          ['does the foil represent the bulk', 'not always', RED],
        ]}
      />
    </Scene>
  )
}

export function TechniqueSelectionMapScene() {
  // Seven decades of feature size, 0.1 nm to 1 mm, across 760 px.
  const xOf = (nm) => 80 + (Math.log10(nm) + 1) * 108.6
  const bands = [
    ['TEM', 0.2, 200, PURP, 176, '0.2 nm – 200 nm'],
    ['SEM', 2, 100000, AMBER, 206, '2 nm – 100 µm'],
    ['optical', 200, 1000000, BLUE, 236, '200 nm – 1 mm'],
  ]
  const ticks = [[0.1, '0.1 nm'], [1, '1 nm'], [10, '10 nm'], [100, '100 nm'], [1000, '1 µm'], [10000, '10 µm'], [100000, '100 µm'], [1000000, '1 mm']]
  const features = [
    ['dislocation', 1, PURP, 348],
    ['fine precipitate', 20, PURP, 376],
    ['pearlite lamella', 300, BLUE, 348],
    ['grain', 30000, BLUE, 376],
    ['inclusion', 100000, BLUE, 348],
    ['fracture facet', 500000, AMBER, 376],
  ]
  return (
    <Scene caption="The feature picks the instrument — size first, then surface or interior">
      {[
        ['Optical', BLUE, 50, ['flat section, above ≈ 200 nm', 'grains · phases · inclusions']],
        ['SEM', AMBER, 325, ['rough surfaces, depth of field', 'fracture facets · topography']],
        ['TEM', PURP, 600, ['interior, atomic scale', 'dislocations · fine precipitates']],
      ].map(([title, tone, cx, lines], i) => (
        <Card key={String(title)} x={cx} y={54} w={250} h={96} title={title} accent={tone} lines={lines} linesY={56} lineH={22} className={`msmm-cell-in msmm-delay-${i}`} />
      ))}

      {bands.map(([name, lo, hi, tone, by, range]) => (
        <g key={String(name)}>
          <rect x={xOf(lo)} y={by} width={xOf(hi) - xOf(lo)} height={24} rx={7} fill={tone} opacity={0.9} className="msmm-grow" />
          <M x={xOf(lo) + 10} y={by + 17} size={11} fill={WHITE} anchor="start" weight={800}>
            {name}
          </M>
          <M x={xOf(hi) - 10} y={by + 17} size={10.5} fill={WHITE} anchor="end">
            {range}
          </M>
        </g>
      ))}
      {/* Right of where the TEM band stops, so it does not print on the band. */}
      <M x={452} y={192} size={10} fill={MUTED} anchor="start">overlap — either would serve</M>

      {ticks.map(([v, label]) => (
        <g key={String(label)}>
          <Wire d={`M${xOf(v)} 304 L${xOf(v)} 316`} stroke={MUTED} width={2} />
          <M x={xOf(v)} y={298} size={10} fill={MUTED}>
            {label}
          </M>
        </g>
      ))}
      <Wire d="M80 310 L848 310" stroke={MUTED} width={2.4} marker="url(#msmArr)" />
      <M x={840} y={326} size={10.5} fill={MUTED} anchor="end">feature size — logarithmic</M>
      {features.map(([name, v, tone, ly]) => (
        <g key={String(name)}>
          <Dot cx={xOf(v)} cy={310} r={5} fill={tone} className="msmm-cost-dot" />
          <Wire d={`M${xOf(v)} 314 L${xOf(v)} ${ly - 14}`} stroke={tone} width={1.6} opacity={0.7} />
          <M x={xOf(v)} y={ly} size={10.5} fill={tone} weight={800}>
            {name}
          </M>
        </g>
      ))}

      <rect x={60} y={400} width={780} height={62} rx={12} fill={WHITE} stroke={TEAL} strokeWidth={2.4} />
      <Wire d="M450 400 L450 462" stroke={TEAL} width={2} />
      <L x={255} y={424} size={12} fill={AMBER}>surface imaging</L>
      <L x={255} y={446} size={11} fill={MUTED} weight={700}>SEM · optical on a prepared section</L>
      <L x={645} y={424} size={12} fill={PURP}>interior, through the thickness</L>
      <L x={645} y={446} size={11} fill={MUTED} weight={700}>TEM on a thinned foil</L>
    </Scene>
  )
}

export function GrainSizeMeasurementScene() {
  const fields = [
    [36, 4, 5, '16'],
    [196, 6, 6, '32'],
    [356, 8, 7, '64'],
  ]
  // The crossing dots must sit ON the test line: y = 282 + 0.2889 (x − 46).
  const crossings = [
    [56, 285], [104, 299], [152, 313], [206, 328], [258, 343], [310, 358], [362, 373], [414, 388], [466, 403],
  ]
  return (
    <Scene caption="One step of n doubles the count — a logarithmic acceptance parameter">
      {fields.map(([fx, cells, astm, count]) => (
        <g key={fx}>
          <L x={fx + 75} y={52} size={11.5} fill={astm === 7 ? GREEN : BLUE} weight={800}>{`ASTM n = ${astm}`}</L>
          <rect x={fx} y={62} width={150} height={140} rx={8} fill={WHITE} stroke={MUTED} strokeWidth={2} />
          {Array.from({ length: cells - 1 }, (_, k) => (
            <Wire key={`v${fx}-${k}`} d={`M${fx + ((k + 1) * 150) / cells} 62 L${fx + ((k + 1) * 150) / cells + (k % 2 ? 5 : -5)} 202`} stroke={N} width={1.6} />
          ))}
          {Array.from({ length: cells - 1 }, (_, k) => (
            <Wire key={`h${fx}-${k}`} d={`M${fx} ${62 + ((k + 1) * 140) / cells} L${fx + 150} ${62 + ((k + 1) * 140) / cells + (k % 2 ? -4 : 4)}`} stroke={N} width={1.6} />
          ))}
          <M x={fx + 75} y={220} size={11} fill={N} weight={800}>{`${count} grains / in²`}</M>
        </g>
      ))}
      <M x={191} y={240} size={11} fill={AMBER} weight={800}>×2</M>
      <M x={351} y={240} size={11} fill={AMBER} weight={800}>×2</M>

      <Card
        x={528}
        y={56}
        w={336}
        h={118}
        title="ASTM grain size number"
        accent={BLUE}
        mono
        lines={['N = 2^(n−1)   grains per in² at ×100', 'n → n + 1   doubles N', 'so the scale is logarithmic, not linear']}
        linesY={58}
        lineH={24}
      />

      <L x={271} y={262} size={11.5} fill={TEAL} weight={800}>linear intercept method — count boundary crossings</L>
      <rect x={36} y={272} width={470} height={150} rx={8} fill={WHITE} stroke={TEAL} strokeWidth={2} />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
        <Wire key={`gi${k}`} d={`M${46 + k * 58} 272 L${52 + k * 58} 422`} stroke={N} width={1.4} opacity={0.6} />
      ))}
      {[0, 1, 2].map((k) => (
        <Wire key={`gj${k}`} d={`M36 ${310 + k * 38} L506 ${316 + k * 38}`} stroke={N} width={1.4} opacity={0.6} />
      ))}
      <Wire d="M46 282 L496 412" stroke={AMBER} width={2.4} dash="8 6" className="msmm-pointer" />
      {crossings.map(([cx, cy]) => (
        <Dot key={`cr${cx}`} cx={cx} cy={cy} r={4.5} fill={RED} className="msmm-pulse" />
      ))}
      <M x={496} y={292} size={10.5} fill={RED} anchor="end">9 crossings on this line</M>

      <Axes
        x={578}
        y={380}
        w={250}
        h={140}
        xLabel="ASTM number n"
        yLabel="σy"
        tickLabels={[[598, '4'], [668, '6'], [738, '8'], [808, '10']]}
      />
      <Curve pts={[[578, 368], [628, 342], [678, 318], [728, 296], [778, 276], [828, 258]]} stroke={GREEN} className="msmm-draw" />
      <Dot cx={828} cy={258} r={5} fill={GREEN} className="msmm-cost-dot" />
      <L x={700} y={252} size={11} fill={GREEN} weight={800}>finer grain, higher yield (Hall–Petch)</L>

      <rect x={36} y={436} width={828} height={46} rx={12} fill={WHITE} stroke={GREEN} strokeWidth={2.4} />
      <L x={450} y={465} size={13} fill={N} weight={750}>
        each increment of n doubles the grains per unit area — a small number change is a large refinement
      </L>
    </Scene>
  )
}

export function DiffusionOverviewScene() {
  const segments = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const down = [[68, 100], [156, 136], [244, 108], [332, 142], [400, 120], [112, 150]]
  const back = [[288, 92], [376, 152]]
  return (
    <Scene caption="Random hops, biased by the gradient — the engine under most of practical metallurgy">
      <L x={80} y={62} size={11.5} fill={BLUE} weight={800}>high C</L>
      <L x={440} y={62} size={11.5} fill={MUTED} weight={800}>low C</L>
      {segments.map((i) => (
        <rect key={`sg${i}`} x={40 + i * 44} y={72} width={44} height={100} fill={BLUE} opacity={0.52 - i * 0.05} />
      ))}
      <rect x={40} y={72} width={440} height={100} rx={6} fill="none" stroke={MUTED} strokeWidth={2} />
      <Curve pts={[[40, 86], [150, 104], [260, 128], [370, 148], [480, 160]]} stroke={N} width={2.2} dash="7 5" />
      {down.map(([cx, cy], i) => (
        <Atom key={`dn${cx}`} cx={cx} cy={cy} r={8} fill={BLUE} stroke={BLUE} className={`msmm-shift msmm-delay-${i % 5}`} />
      ))}
      {back.map(([cx, cy], i) => (
        <Atom key={`bk${cx}`} cx={cx} cy={cy} r={8} fill={WHITE} stroke={ROSE} className={`msmm-dequeue msmm-delay-${i + 2}`} />
      ))}
      <Wire d="M60 200 L460 200" stroke={AMBER} width={6} marker="url(#msmArrA)" className="msmm-current" />
      <L x={250} y={226} size={12} fill={AMBER}>net flux J — down the gradient</L>
      <M x={250} y={250} size={10.5} fill={ROSE}>individual hops go both ways; the count does not</M>

      <Card
        x={520}
        y={62}
        w={344}
        h={116}
        title="Why the net flux runs downhill"
        accent={BLUE}
        lines={['a hop picks its direction at random', 'but more atoms sit on the high side', 'so more hops start there than end there']}
        linesY={58}
        lineH={22}
      />
      <Card
        x={520}
        y={194}
        w={344}
        h={92}
        title="A solid is not still"
        accent={AMBER}
        lines={['at temperature every atom vibrates', 'occasionally one has enough to move']}
        linesY={56}
        lineH={22}
      />

      {/* Left of x=520: centred at 450 this ran across the card above it. */}
      <L x={270} y={282} size={12} fill={TEAL} weight={800}>and this is where it earns its keep</L>
      {[
        ['carburising', 'case hardened gear', GREEN],
        ['homogenising', 'segregation evened out', BLUE],
        ['brazing', 'interdiffusion bond', PURP],
        ['transformation', 'atoms redistribute', AMBER],
      ].map(([title, note, tone], i) => (
        <g key={String(title)} className={`msmm-cell-in msmm-delay-${i}`}>
          <rect x={36 + i * 208} y={300} width={196} height={128} rx={10} fill={WHITE} stroke={tone} strokeWidth={2.2} />
          <L x={134 + i * 208} y={320} size={11.5} fill={tone} weight={800}>
            {title}
          </L>
          <M x={134 + i * 208} y={420} size={10} fill={MUTED}>
            {note}
          </M>
        </g>
      ))}
      {/* 1 — carburised gear tooth with a dark case */}
      <path d="M78 402 L92 344 L118 332 L146 344 L160 402 Z" fill={SKY} stroke={BLUE} strokeWidth={2} />
      <path d="M78 402 L92 344 L118 332 L146 344 L160 402" fill="none" stroke={N} strokeWidth={6} opacity={0.55} className="msmm-pulse" />
      {/* 2 — casting segregation being homogenised */}
      <rect x={258} y={342} width={76} height={54} rx={4} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
      {[[274, 356], [304, 374], [318, 352], [286, 384]].map(([cx, cy]) => (
        <Dot key={`sg2${cx}-${cy}`} cx={cx} cy={cy} r={7} fill={N} opacity={0.6} className="msmm-collapse" />
      ))}
      <Wire d="M340 370 L356 370" stroke={BLUE} width={2} marker="url(#msmArrB)" />
      <rect x={360} y={342} width={74} height={54} rx={4} fill={BLUE} opacity={0.22} />
      <rect x={360} y={342} width={74} height={54} rx={4} fill="none" stroke={MUTED} strokeWidth={1.8} />
      {/* 3 — brazed joint with an interdiffusion zone */}
      <rect x={466} y={340} width={68} height={58} rx={3} fill={SKY} stroke={BLUE} strokeWidth={1.8} />
      <rect x={566} y={340} width={68} height={58} rx={3} fill={WHITE} stroke={PURP} strokeWidth={1.8} />
      <rect x={534} y={340} width={32} height={58} fill={PURP} opacity={0.3} className="msmm-charge" />
      {[0, 1, 2].map((k) => (
        <Wire key={`bz${k}`} d={`M${524} ${352 + k * 18} L${576} ${352 + k * 18}`} stroke={PURP} width={1.8} marker="url(#msmArrP)" className={`msmm-current msmm-delay-${k}`} />
      ))}
      {/* 4 — a phase transformation that needs redistribution */}
      <rect x={678} y={340} width={112} height={58} rx={4} fill={CREAM} stroke={AMBER} strokeWidth={1.8} />
      {[0, 1, 2, 3, 4].map((k) => (
        <Wire key={`ph${k}`} d={`M${688 + k * 22} 346 L${688 + k * 22} 392`} stroke={AMBER} width={3.4} opacity={0.75} className={`msmm-pulse msmm-delay-${k}`} />
      ))}
      {[[700, 356], [744, 380], [772, 358]].map(([cx, cy], i) => (
        <Atom key={`ph2${cx}`} cx={cx} cy={cy} r={6} fill={WHITE} stroke={N} className={`msmm-shift msmm-delay-${i}`} />
      ))}

      <L x={450} y={462} size={12.5} fill={N} weight={750}>
        atoms move through apparently rigid solids — and nearly every heat treatment depends on it
      </L>
    </Scene>
  )
}

export function VacancyDiffusionScene() {
  const cols = [70, 126, 182, 238, 294]
  const rows = [82, 136, 190, 244]
  const blue = []
  cols.forEach((cx, i) => rows.forEach((cy, j) => {
    if (!(i === 3 && j === 1) && !(i === 2 && j === 1)) blue.push([cx, cy, i, j])
  }))
  return (
    <Scene caption="Two requirements, both exponential in temperature — hence the ferocious sensitivity">
      {blue.map(([cx, cy]) => (
        <Atom key={`la${cx}-${cy}`} cx={cx} cy={cy} r={17} fill={SKY} stroke={BLUE} />
      ))}
      <Atom cx={238} cy={136} r={17} fill={CREAM} stroke={MUTED} dash="5 4" />
      {/* Labelled by leader from clear canvas: at x=238 the caption landed on
          the atom directly above the vacancy. */}
      <Wire d="M324 104 L256 130" stroke={MUTED} width={1.4} />
      <M x={330} y={108} size={10} fill={MUTED} anchor="start">vacancy</M>
      <g className="msmm-search">
        <Atom cx={182} cy={136} r={17} fill={AMBER} stroke={AMBER} />
      </g>
      <Atom cx={238} cy={136} r={17} fill="none" stroke={AMBER} dash="4 4" opacity={0.7} />
      <Wire d="M204 136 L218 136" stroke={AMBER} width={2.6} marker="url(#msmArrA)" className="msmm-current" />
      <Wire d="M216 168 L200 168" stroke={MUTED} width={2.2} marker="url(#msmArrM)" />
      <L x={190} y={288} size={11.5} fill={AMBER} weight={800}>atom and vacancy exchange places</L>
      {/* Below the lattice: at y=186 this sat across the third row of atoms. */}
      <M x={190} y={310} size={10.5} fill={MUTED}>so the vacancy travels the other way</M>

      <Axes x={70} y={440} w={250} h={116} xLabel="position along the hop" yLabel="energy" />
      <Curve pts={[[70, 402], [110, 396], [150, 366], [195, 340], [240, 366], [280, 396], [320, 402]]} stroke={PURP} className="msmm-draw" />
      <M x={195} y={330} size={10.5} fill={PURP}>saddle point</M>
      <Wire d="M244 398 L244 352" stroke={RED} width={2} marker="url(#msmArrR)" />
      {/* Above the descending limb, not on it. */}
      <M x={254} y={348} size={10.5} fill={RED} anchor="start">Qm — squeeze past</M>

      <Card
        x={380}
        y={56}
        w={232}
        h={150}
        title="1 · a vacancy next door"
        accent={BLUE}
        lines={['vacancy count rises', 'exponentially with T']}
        linesY={118}
        lineH={20}
      >
        <Wire d="M22 96 L212 96" stroke={MUTED} width={1.8} />
        <Wire d="M22 96 L22 44" stroke={MUTED} width={1.8} />
        <Wire d="M22 94 C110 92 160 84 208 48" stroke={BLUE} width={2.6} />
      </Card>
      <Card
        x={632}
        y={56}
        w={232}
        h={150}
        title="2 · energy to squeeze past"
        accent={PURP}
        lines={['mobile fraction rises', 'exponentially with T']}
        linesY={118}
        lineH={20}
      >
        <Wire d="M22 96 L212 96" stroke={MUTED} width={1.8} />
        <Wire d="M22 96 L22 44" stroke={MUTED} width={1.8} />
        <Wire d="M22 94 C110 92 160 84 208 48" stroke={PURP} width={2.6} />
      </Card>
      <L x={622} y={228} size={12} fill={RED} weight={800}>multiply them — steeper than either alone</L>
      <Axes x={430} y={430} w={400} h={170} xLabel="temperature" yLabel="rate" />
      <Curve pts={[[430, 426], [520, 422], [600, 412], [670, 392], [730, 356], [780, 312], [830, 268]]} stroke={BLUE} width={2.4} />
      <Curve pts={[[430, 427], [530, 424], [620, 416], [690, 398], [745, 362], [790, 318], [830, 276]]} stroke={PURP} width={2.4} />
      <Curve pts={[[430, 428], [560, 426], [650, 420], [720, 400], [770, 358], [810, 304], [830, 262]]} stroke={RED} width={3.2} className="msmm-draw" />
      <M x={440} y={286} size={10.5} fill={BLUE} anchor="start">vacancies ∝ exp(−Qv / kT)</M>
      <M x={440} y={306} size={10.5} fill={PURP} anchor="start">mobile fraction ∝ exp(−Qm / kT)</M>
      <M x={440} y={326} size={10.5} fill={RED} anchor="start">product ∝ exp(−(Qv+Qm) / kT)</M>
    </Scene>
  )
}

export function InterstitialDiffusionScene() {
  const hostX = [76, 134, 192, 250, 308, 366, 424]
  const hostY = [104, 176, 248]
  const sites = []
  for (let i = 0; i < 6; i += 1) {
    for (let j = 0; j < 2; j += 1) sites.push([105 + i * 58, 140 + j * 72, i, j])
  }
  const filled = new Set(['1-0', '4-1', '0-1'])
  const xOf = (exp) => 530 + (exp + 22) * 25
  return (
    <Scene caption="One requirement instead of two, and a smaller atom — ten orders of magnitude of difference">
      {hostX.map((cx) => hostY.map((cy) => (
        <Atom key={`h${cx}-${cy}`} cx={cx} cy={cy} r={20} fill={SKY} stroke={BLUE} />
      )))}
      {/* The two hosts the hopping atom must part: dashed ghosts show them
          momentarily displaced. */}
      <Atom cx={192} cy={96} r={20} fill="none" stroke={AMBER} dash="4 4" opacity={0.75} />
      <Atom cx={192} cy={184} r={20} fill="none" stroke={AMBER} dash="4 4" opacity={0.75} />
      {sites.map(([cx, cy, i, j]) => (
        filled.has(`${i}-${j}`)
          ? <Atom key={`s${cx}-${cy}`} cx={cx} cy={cy} r={8} fill={GREEN} stroke={GREEN} />
          : <Atom key={`s${cx}-${cy}`} cx={cx} cy={cy} r={5} fill="none" stroke={MUTED} dash="3 3" opacity={0.65} />
      ))}
      <g className="msmm-shift">
        <Atom cx={163} cy={140} r={8} fill={AMBER} stroke={AMBER} />
      </g>
      <Atom cx={221} cy={140} r={8} fill="none" stroke={AMBER} dash="3 3" />
      <Wire d="M176 128 L208 128" stroke={AMBER} width={2.2} marker="url(#msmArrA)" className="msmm-current" />
      <M x={250} y={70} size={10.5} fill={BLUE}>large host atoms</M>
      <M x={250} y={286} size={10.5} fill={GREEN}>small atoms in the gaps: C, N, H</M>
      <L x={250} y={312} size={11.5} fill={AMBER} weight={800}>it squeezes between two hosts — no vacancy involved</L>

      {[0, 1].map((r) => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => (
        <Atom
          key={`av${r}-${k}`}
          cx={70 + k * 32}
          cy={346 + r * 28}
          r={(r === 0 && k === 2) || (r === 1 && k === 7) || (r === 1 && k === 10) ? 7 : 4.5}
          fill={(r === 0 && k === 2) || (r === 1 && k === 7) || (r === 1 && k === 10) ? GREEN : 'none'}
          stroke={(r === 0 && k === 2) || (r === 1 && k === 7) || (r === 1 && k === 10) ? GREEN : MUTED}
          dash={(r === 0 && k === 2) || (r === 1 && k === 7) || (r === 1 && k === 10) ? undefined : '3 3'}
          opacity={(r === 0 && k === 2) || (r === 1 && k === 7) || (r === 1 && k === 10) ? 1 : 0.6}
        />
      )))}
      <M x={250} y={400} size={10.5} fill={MUTED}>24 sites, 3 atoms — the next site is nearly always free</M>

      <L x={685} y={48} size={12} fill={BLUE} weight={800}>D in iron at 500 °C — logarithmic axis</L>
      <M x={530} y={72} size={10.5} fill={GREEN} anchor="start">carbon — interstitial</M>
      <rect x={530} y={80} width={xOf(-11) - 530} height={26} rx={5} fill={GREEN} className="msmm-bar" />
      <M x={xOf(-11) - 10} y={98} size={10.5} fill={WHITE} anchor="end" weight={800}>10⁻¹¹ m²/s</M>
      <M x={530} y={130} size={10.5} fill={ROSE} anchor="start">nickel — substitutional</M>
      <rect x={530} y={138} width={xOf(-21) - 530} height={26} rx={5} fill={ROSE} className="msmm-bar msmm-delay-2" />
      <M x={xOf(-21) + 10} y={156} size={10.5} fill={ROSE} anchor="start">10⁻²¹ m²/s</M>
      <Wire d="M530 190 L836 190" stroke={MUTED} width={2.2} />
      {[[-22, '10⁻²²'], [-20, '10⁻²⁰'], [-18, '10⁻¹⁸'], [-16, '10⁻¹⁶'], [-14, '10⁻¹⁴'], [-12, '10⁻¹²'], [-10, '10⁻¹⁰']].map(([e, label]) => (
        <g key={`tk${e}`}>
          <Wire d={`M${xOf(e)} 186 L${xOf(e)} 196`} stroke={MUTED} width={2} />
          <M x={xOf(e)} y={212} size={9.5} fill={MUTED}>
            {label}
          </M>
        </g>
      ))}
      <Wire d={`M${xOf(-21)} 240 L${xOf(-11)} 240`} stroke={RED} width={2.4} marker="url(#msmArrR)" />
      <Wire d={`M${xOf(-11)} 240 L${xOf(-21)} 240`} stroke={RED} width={2.4} marker="url(#msmArrR)" />
      <M x={680} y={262} size={11} fill={RED} weight={800}>ten orders of magnitude apart</M>

      <Card
        x={500}
        y={290}
        w={370}
        h={124}
        title="One requirement, not two"
        accent={GREEN}
        lines={['no vacancy needed — sites sit empty', 'only the squeeze energy has to be paid', 'and the atom doing the moving is smaller']}
        linesY={58}
        lineH={22}
      />
      <L x={450} y={448} size={12.5} fill={N} weight={750}>
        carburising works at forging heat; alloying a substitutional element does not
      </L>
    </Scene>
  )
}

export function FicksFirstLawScene() {
  return (
    <Scene caption="Steady state: the profile is drawn once and then simply holds">
      <L x={85} y={66} size={11.5} fill={BLUE} weight={800}>C₁ high</L>
      <M x={185} y={66} size={10.5} fill={MUTED}>membrane</M>
      <L x={285} y={66} size={11.5} fill={MUTED} weight={800}>C₂ low</L>
      <rect x={40} y={78} width={90} height={152} fill={BLUE} opacity={0.45} />
      <rect x={240} y={78} width={90} height={152} fill={BLUE} opacity={0.12} />
      <rect x={40} y={78} width={290} height={152} rx={4} fill="none" stroke={MUTED} strokeWidth={2} />
      <rect x={130} y={78} width={110} height={152} fill={WHITE} stroke={N} strokeWidth={2.4} />
      <Curve pts={[[130, 104], [240, 196]]} stroke={ROSE} width={3} className="msmm-draw" />
      <Dot cx={130} cy={104} r={4.5} fill={ROSE} />
      <Dot cx={240} cy={196} r={4.5} fill={ROSE} />
      {[[150, 140], [172, 156], [196, 172]].map(([cx, cy], i) => (
        <Atom key={`fa${cx}`} cx={cx} cy={cy} r={7} fill={BLUE} stroke={BLUE} className={`msmm-shift msmm-delay-${i}`} />
      ))}
      <Wire d="M136 216 L232 216" stroke={AMBER} width={5} marker="url(#msmArrA)" className="msmm-current" />
      <M x={122} y={220} size={11} fill={AMBER} anchor="end" weight={800}>J</M>
      <Wire d="M130 244 L240 244" stroke={MUTED} width={1.8} marker="url(#msmArrM)" />
      <Wire d="M240 244 L130 244" stroke={MUTED} width={1.8} marker="url(#msmArrM)" />
      <M x={185} y={262} size={10.5} fill={MUTED}>Δx — thickness</M>
      <M x={85} y={250} size={10} fill={BLUE}>held fixed</M>
      <M x={285} y={250} size={10} fill={BLUE}>held fixed</M>

      <g className="msmm-spin">
        <circle cx={390} cy={140} r={28} fill="none" stroke="none" />
        <Wire d="M390 140 L390 118" stroke={AMBER} width={2.6} />
      </g>
      <circle cx={390} cy={140} r={28} fill="none" stroke={MUTED} strokeWidth={2.2} />
      <Dot cx={390} cy={140} r={3.5} fill={MUTED} />
      <M x={390} y={186} size={10.5} fill={MUTED}>t advances</M>
      <M x={390} y={208} size={10.5} fill={GREEN}>profile unchanged</M>

      <L x={565} y={62} size={11.5} fill={MUTED} weight={800}>gentle dC/dx → small J</L>
      <L x={775} y={62} size={11.5} fill={RED} weight={800}>steep dC/dx → large J</L>
      <rect x={470} y={72} width={190} height={150} rx={9} fill={WHITE} stroke={MUTED} strokeWidth={2} />
      <Curve pts={[[484, 100], [646, 138]]} stroke={ROSE} width={2.6} />
      <Wire d="M496 186 L576 186" stroke={AMBER} width={3} marker="url(#msmArrA)" className="msmm-current" />
      <M x={640} y={206} size={10} fill={MUTED} anchor="end">J ∝ dC/dx</M>
      <rect x={680} y={72} width={190} height={150} rx={9} fill={WHITE} stroke={RED} strokeWidth={2} />
      <Curve pts={[[694, 92], [856, 196]]} stroke={ROSE} width={3} className="msmm-draw" />
      <Wire d="M694 186 L854 186" stroke={AMBER} width={6} marker="url(#msmArrA)" className="msmm-current" />
      <M x={850} y={206} size={10} fill={RED} anchor="end">same D, bigger J</M>

      <Card
        x={40}
        y={290}
        w={400}
        h={112}
        title="Steady state"
        accent={GREEN}
        lines={['C at every point is constant in time', 'so the gradient never changes', 'gradient = (C₁ − C₂) / Δx']}
        linesY={58}
        lineH={24}
      />
      <Card
        x={470}
        y={290}
        w={400}
        h={112}
        title="Fick's first law"
        accent={BLUE}
        mono
        lines={['J = − D · dC/dx', 'J in kg per m² per second', 'minus: flux runs against the gradient']}
        linesY={58}
        lineH={24}
      />
      <L x={450} y={440} size={12.5} fill={N} weight={750}>
        flux is proportional to the gradient — double the gradient and you double the flux
      </L>
      <M x={450} y={466} size={10.5} fill={RED}>valid only while nothing changes with time</M>
    </Scene>
  )
}

export function FicksSecondLawScene() {
  const t0 = [[80, 110], [298, 110], [298, 320], [520, 320]]
  const t1 = [[80, 110], [210, 110], [245, 120], [272, 150], [300, 215], [328, 280], [356, 310], [392, 320], [520, 320]]
  const t2 = [[80, 112], [160, 114], [205, 128], [252, 162], [300, 215], [348, 268], [396, 302], [440, 317], [520, 320]]
  const t3 = [[80, 114], [130, 122], [180, 144], [240, 178], [300, 215], [360, 252], [420, 286], [470, 306], [520, 316]]
  return (
    <Scene caption="The rate of change follows the curvature — so every sharp step smooths itself away">
      <Axes
        x={80}
        y={330}
        w={440}
        h={240}
        xLabel="depth x"
        yLabel="C"
        tickLabels={[[392, 't₁'], [440, 't₂'], [470, 't₃']]}
      />
      <Curve pts={t0} stroke={N} width={2.6} dash="7 5" />
      <Curve pts={t1} stroke={BLUE} width={2.6} />
      <Curve pts={t2} stroke={TEAL} width={2.6} />
      <Curve pts={t3} stroke={AMBER} width={3} className="msmm-draw" />
      {[[392, 320], [440, 317], [470, 306]].map(([px, py], i) => (
        <Wire key={`pen${px}`} d={`M${px} ${py} L${px} 326`} stroke={MUTED} width={1.6} dash="4 4" className={`msmm-pulse msmm-delay-${i}`} />
      ))}
      <Dot cx={180} cy={144} r={6} fill={ROSE} className="msmm-cost-dot" />
      <Dot cx={300} cy={215} r={6} fill={PURP} className="msmm-cost-dot" />
      <Dot cx={420} cy={286} r={6} fill={GREEN} className="msmm-cost-dot" />
      <L x={220} y={372} size={11.5} fill={MUTED} weight={700}>penetration advances, each step by less</L>

      <g className="msmm-spin">
        <circle cx={596} cy={106} r={26} fill="none" stroke="none" />
        <Wire d="M596 106 L596 86" stroke={AMBER} width={2.6} />
      </g>
      <circle cx={596} cy={106} r={26} fill="none" stroke={MUTED} strokeWidth={2.2} />
      <Dot cx={596} cy={106} r={3.5} fill={MUTED} />
      <M x={596} y={152} size={10.5} fill={MUTED}>t advances</M>
      {[['t₀ — sharp step', N, 82], ['t₁', BLUE, 104], ['t₂', TEAL, 126], ['t₃', AMBER, 148]].map(([label, tone, ly]) => (
        <g key={String(label)}>
          <Wire d={`M656 ${ly} L688 ${ly}`} stroke={tone} width={3} />
          <M x={696} y={n(ly) + 4} size={10.5} fill={tone} anchor="start">
            {label}
          </M>
        </g>
      ))}

      <Card
        x={550}
        y={176}
        w={320}
        h={128}
        title="Where C changes fastest"
        accent={PURP}
        lines={['convex ⇒ ∂²C/∂x² < 0 ⇒ C falls', 'inflection ⇒ curvature 0 ⇒ C holds', 'concave ⇒ ∂²C/∂x² > 0 ⇒ C rises']}
        linesY={62}
        lineH={24}
      >
        <Dot cx={16} cy={58} r={5} fill={ROSE} />
        <Dot cx={16} cy={82} r={5} fill={PURP} />
        <Dot cx={16} cy={106} r={5} fill={GREEN} />
      </Card>
      <Card
        x={550}
        y={320}
        w={320}
        h={126}
        title="Fick's second law"
        accent={BLUE}
        mono
        lines={['∂C/∂t = D · ∂²C/∂x²', 'rate of change ∝ curvature', 'not the gradient itself']}
        linesY={62}
        lineH={24}
      />
    </Scene>
  )
}

export function ErrorFunctionCaseDepthScene() {
  const profiles = [
    [[70, 76], [110, 150], [150, 204], [190, 230], [240, 240]],
    [[70, 76], [130, 136], [190, 190], [250, 222], [320, 238], [380, 240]],
    [[70, 76], [150, 124], [220, 172], [290, 208], [360, 230], [430, 240]],
    [[70, 76], [170, 116], [250, 160], [330, 196], [400, 222], [450, 236]],
  ]
  const depths = [[176, BLUE], [262, TEAL], [320, PURP], [372, AMBER]]
  const tones = [BLUE, TEAL, PURP, AMBER]
  return (
    <Scene caption="Position and time enter only as x over root Dt — which is why depth costs time squared">
      <Axes
        x={70}
        y={250}
        w={380}
        h={190}
        xLabel="depth x"
        yLabel="C"
        tickLabels={depths.map(([dx], i) => [dx, `d${'₁₂₃₄'[i]}`])}
      />
      <Wire d="M70 216 L452 216" stroke={RED} width={2} dash="8 6" />
      <M x={370} y={124} size={10.5} fill={RED}>case depth criterion</M>
      <M x={370} y={144} size={10.5} fill={RED}>C = 0.4 wt %</M>
      {profiles.map((pts, i) => (
        <Curve key={`pf${i}`} pts={pts} stroke={tones[i]} width={2.6} className={`msmm-draw msmm-delay-${i}`} />
      ))}
      {depths.map(([dx, tone], i) => (
        <g key={`dp${dx}`}>
          <Dot cx={dx} cy={216} r={5} fill={tone} />
          <Wire d={`M${dx} 216 L${dx} 246`} stroke={tone} width={1.6} dash="4 4" className={`msmm-pulse msmm-delay-${i}`} />
        </g>
      ))}
      <L x={180} y={292} size={11} fill={MUTED} weight={700}>the marker advances more slowly each time</L>
      {[['t = 1 h', BLUE, 320], ['t = 4 h', TEAL, 342], ['t = 9 h', PURP, 364], ['t = 16 h', AMBER, 386]].map(([label, tone, ly]) => (
        <g key={String(label)}>
          <Wire d={`M80 ${ly} L112 ${ly}`} stroke={tone} width={3} />
          <M x={120} y={n(ly) + 4} size={10.5} fill={tone} anchor="start">
            {label}
          </M>
        </g>
      ))}
      <rect x={220} y={308} width={230} height={84} rx={10} fill={SKY} stroke={AMBER} strokeWidth={2.2} />
      <M x={335} y={344} size={13.5} fill={AMBER} weight={800}>x / √(D t)</M>
      <M x={335} y={370} size={10.5} fill={MUTED}>fix this group and the profile is fixed</M>

      <Axes
        x={520}
        y={200}
        w={340}
        h={150}
        xLabel="time t"
        yLabel="depth"
        tickLabels={[[558, 't'], [671, '4t']]}
        yTicks={[[150, 'd'], [100, '2d']]}
      />
      <Curve
        pts={[[520, 200], [539, 165], [558, 150], [596, 129], [633, 113], [671, 100], [747, 78], [858, 50]]}
        stroke={GREEN}
        width={3}
        className="msmm-draw"
      />
      <Wire d="M520 150 L558 150" stroke={MUTED} width={1.6} dash="4 4" />
      <Wire d="M558 150 L558 200" stroke={MUTED} width={1.6} dash="4 4" />
      <Wire d="M520 100 L671 100" stroke={MUTED} width={1.6} dash="4 4" />
      <Wire d="M671 100 L671 200" stroke={MUTED} width={1.6} dash="4 4" />
      <Dot cx={558} cy={150} r={5.5} fill={GREEN} />
      <Dot cx={671} cy={100} r={5.5} fill={RED} className="msmm-cost-dot" />
      <L x={730} y={160} size={11.5} fill={RED} weight={800}>double the depth ⇒ four times the time</L>

      <Card
        x={470}
        y={268}
        w={400}
        h={96}
        title="Error function solution"
        accent={BLUE}
        mono
        lines={['(Cs − Cx)/(Cs − C₀) = erf( x / 2√(Dt) )', 'x and t appear only as x / √(Dt)']}
        linesY={58}
        lineH={24}
      />
      <Card
        x={470}
        y={378}
        w={400}
        h={108}
        title="Equivalent cycles — same Dt, same profile"
        accent={GREEN}
        mono
        lines={['900 °C, 4.0 h  →  D·t = 4.0e−11 m²', '925 °C, 2.6 h  →  D·t = 4.0e−11 m²', 'same case depth, less furnace time']}
        linesY={56}
        lineH={22}
      />
    </Scene>
  )
}

export function DiffusionFactorsScene() {
  return (
    <Scene caption="Temperature dominates — then species, then structure, then which path is taken">
      {/* Plot narrowed to x=310 so the key sits beside the lines rather than
          underneath them — at full width the third line ran through it. */}
      <Axes x={70} y={260} w={240} h={200} xLabel="1 / T (K⁻¹)" yLabel="ln D" />
      <Curve pts={[[70, 100], [310, 186]]} stroke={GREEN} width={2.8} className="msmm-draw" />
      <Curve pts={[[70, 130], [310, 240]]} stroke={BLUE} width={2.8} className="msmm-draw msmm-delay-1" />
      <Curve pts={[[70, 150], [310, 252]]} stroke={ROSE} width={2.8} className="msmm-draw msmm-delay-2" />
      <M x={140} y={248} size={10.5} fill={N} weight={800}>slope = − Q / R</M>
      {/* Keys kept short: the comparison panels start at x=440 and paint later,
          so a long key would be covered by one of them. */}
      {[['C in Fe', GREEN, 110], ['Fe self', BLUE, 132], ['Ni in Fe', ROSE, 154]].map(([label, tone, ly]) => (
        <g key={String(label)}>
          <Wire d={`M318 ${ly} L342 ${ly}`} stroke={tone} width={3} />
          <M x={348} y={n(ly) + 4} size={10} fill={tone} anchor="start">
            {label}
          </M>
        </g>
      ))}
      <M x={316} y={182} size={9.5} fill={MUTED} anchor="start">steeper ⇒ larger Q</M>

      <rect x={440} y={56} width={430} height={92} rx={10} fill={WHITE} stroke={GREEN} strokeWidth={2.2} />
      <L x={655} y={76} size={11.5} fill={GREEN} weight={800}>the diffusing species</L>
      <Bars x={610} y={86} w={170} max={100} rowH={32} items={[['interstitial C', 95, GREEN], ['substitutional Ni', 8, ROSE]]} />
      <rect x={440} y={158} width={430} height={92} rx={10} fill={WHITE} stroke={BLUE} strokeWidth={2.2} />
      <L x={655} y={178} size={11.5} fill={BLUE} weight={800}>the host structure</L>
      <Bars x={610} y={188} w={170} max={100} rowH={32} items={[['BCC — open', 70, BLUE], ['FCC — close packed', 26, PURP]]} />
      <rect x={440} y={260} width={430} height={124} rx={10} fill={WHITE} stroke={AMBER} strokeWidth={2.2} />
      <L x={655} y={280} size={11.5} fill={AMBER} weight={800}>the path taken</L>
      <Bars x={610} y={290} w={170} max={100} rowH={32} items={[['surface', 92, AMBER], ['grain boundary', 58, TEAL], ['lattice', 14, BLUE]]} />
      <L x={655} y={410} size={11.5} fill={N} weight={750}>exponential in T, faster for interstitials,</L>
      <L x={655} y={432} size={11.5} fill={N} weight={750}>faster in open structures and along boundaries</L>
      <M x={655} y={458} size={10.5} fill={MUTED}>Q from the slope, D₀ from the intercept</M>

      <L x={240} y={314} size={11.5} fill={PURP} weight={800}>doping silicon — the same law, run deliberately</L>
      <rect x={80} y={380} width={320} height={70} rx={4} fill={SKY} stroke={BLUE} strokeWidth={2} />
      <path d="M180 380 C180 434 280 434 280 380 Z" fill={PURP} opacity={0.28} className="msmm-charge" />
      <rect x={80} y={366} width={100} height={14} rx={2} fill={N} opacity={0.75} />
      <rect x={280} y={366} width={120} height={14} rx={2} fill={N} opacity={0.75} />
      {[200, 230, 260].map((dx, i) => (
        <Wire key={`dp${dx}`} d={`M${dx} 336 L${dx} 372`} stroke={PURP} width={2.2} marker="url(#msmArrP)" className={`msmm-current msmm-delay-${i}`} />
      ))}
      <M x={130} y={360} size={10} fill={MUTED}>mask</M>
      <M x={340} y={360} size={10} fill={MUTED}>mask</M>
      <M x={230} y={472} size={10.5} fill={PURP}>dopant enters only the window, to a controlled depth</M>
    </Scene>
  )
}

export function CycleDesignTradeoffScene() {
  const contourA = [[110, 150], [150, 210], [210, 265], [300, 320], [400, 356], [520, 382]]
  const contourB = [[150, 130], [200, 190], [270, 250], [370, 305], [460, 342], [540, 366]]
  const contourC = [[230, 110], [290, 170], [370, 230], [460, 286], [540, 325]]
  return (
    <Scene caption="Raise the temperature rather than extend the time — until the grain structure objects">
      <L x={320} y={64} size={11.5} fill={RED} weight={800}>grain coarsening — above this line the structure is damaged</L>
      <path d="M90 80 L550 80 L550 118 L90 146 Z" fill={RED} opacity={0.12} />
      {/* Feasible window: hotter than the required contour, cooler than the
          coarsening line. Painted before the contours and the markers. */}
      <path d="M155 142 L200 190 L270 250 L370 305 L460 342 L540 366 L548 368 L548 120 Z" fill={GREEN} opacity={0.15} />
      <Axes
        x={90}
        y={420}
        w={460}
        h={340}
        xLabel="furnace time t (h)"
        yLabel="T (°C)"
        tickLabels={[[150, '2'], [250, '6'], [350, '12'], [450, '20']]}
        yTicks={[[380, '850'], [300, '880'], [220, '910'], [140, '940']]}
      />
      <Wire d="M90 146 L550 118" stroke={RED} width={2.6} dash="9 7" className="msmm-pulse" />
      <Curve pts={contourA} stroke={MUTED} width={2.4} dash="6 5" />
      <Curve pts={contourB} stroke={BLUE} width={3.2} className="msmm-draw" />
      <Curve pts={contourC} stroke={PURP} width={2.4} dash="6 5" />
      {[['0.5 mm case', MUTED, 334], ['1.0 mm — required', BLUE, 356], ['2.0 mm case', PURP, 378], ['feasible window', GREEN, 400]].map(([label, tone, ly]) => (
        <g key={String(label)}>
          <Wire d={`M104 ${ly} L134 ${ly}`} stroke={tone} width={3.4} />
          <M x={142} y={n(ly) + 4} size={10.5} fill={tone} anchor="start">
            {label}
          </M>
        </g>
      ))}
      <Dot cx={470} cy={346} r={12} fill={GREEN} />
      <M x={470} y={351} size={12} fill={WHITE} weight={800}>1</M>
      <Dot cx={186} cy={170} r={12} fill={AMBER} />
      <M x={186} y={175} size={12} fill={WHITE} weight={800}>2</M>

      <Panel
        x={580}
        y={60}
        w={290}
        title="Two cycles, the same 1.0 mm case"
        accent={BLUE}
        rows={[
          ['① 900 °C — slow and safe', '12 h'],
          ['resulting grain size', 'ASTM 8', GREEN],
          ['② 950 °C — fast, near the line', '4 h'],
          ['resulting grain size', 'ASTM 5', RED],
        ]}
      />
      <Card
        x={580}
        y={226}
        w={290}
        h={124}
        title="Why temperature wins"
        accent={BLUE}
        lines={['D is exponential in T', 'but depth only goes as √t', 'so a modest ΔT saves hours']}
        linesY={60}
        lineH={22}
      />
      <Card
        x={580}
        y={366}
        w={290}
        h={104}
        title="Until it does not"
        accent={RED}
        lines={['too hot coarsens the grain', 'strength and toughness fall', 'the cycle is a compromise']}
        linesY={54}
        lineH={22}
      />
    </Scene>
  )
}

/* ── Module 3 ────────────────────────────────────────────────────────── */

export function LoadingModesScene() {
  return (
    <Scene caption="Four modes, one rule — divide by the area the load actually acts on">
      {/* tension — grips pull outward, the dashed outline is the original length */}
      <L x={130} y={70} size={12.5} fill={BLUE}>TENSION</L>
      <rect x={75} y={118} width={118} height={36} rx={4} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
      <rect x={75} y={120} width={110} height={32} rx={4} fill={SKY} stroke={BLUE} strokeWidth={2.4} />
      <g className="msmm-probe" style={{ '--msmm-probe': '-9px' }}>
        <Wire d="M70 136 L44 136" stroke={AMBER} width={3} marker="url(#msmArrA)" />
      </g>
      <g className="msmm-probe" style={{ '--msmm-probe': '9px' }}>
        <Wire d="M198 136 L224 136" stroke={AMBER} width={3} marker="url(#msmArrA)" />
      </g>
      <M x={130} y={176} size={10} fill={MUTED}>elongates</M>
      <M x={130} y={214} size={12.5} fill={N} weight={800}>σ = F / A₀</M>
      <M x={130} y={234} size={10} fill={BLUE}>A₀ normal to F</M>

      {/* compression — the solid body is shorter and fatter than the dashed original */}
      <L x={320} y={70} size={12.5} fill={TEAL}>COMPRESSION</L>
      <rect x={270} y={120} width={110} height={32} rx={4} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
      <rect x={278} y={117} width={94} height={38} rx={4} fill={SKY} stroke={TEAL} strokeWidth={2.4} />
      <g className="msmm-probe" style={{ '--msmm-probe': '8px' }}>
        <Wire d="M244 136 L268 136" stroke={AMBER} width={3} marker="url(#msmArrA)" />
      </g>
      <g className="msmm-probe" style={{ '--msmm-probe': '-8px' }}>
        <Wire d="M406 136 L382 136" stroke={AMBER} width={3} marker="url(#msmArrA)" />
      </g>
      <M x={320} y={176} size={10} fill={MUTED}>shortens</M>
      <M x={320} y={214} size={12.5} fill={N} weight={800}>σ = F / A₀</M>
      <M x={320} y={234} size={10} fill={TEAL}>same normal area</M>

      {/* shear — the upper half slides over the lower one across the shear plane */}
      <L x={510} y={70} size={12.5} fill={PURP}>SHEAR</L>
      <rect x={460} y={144} width={100} height={32} rx={3} fill={SKY} stroke={PURP} strokeWidth={2.4} />
      <g className="msmm-probe" style={{ '--msmm-probe': '11px' }}>
        <rect x={460} y={112} width={100} height={32} rx={3} fill={WHITE} stroke={PURP} strokeWidth={2.4} />
      </g>
      <Wire d="M452 144 L572 144" stroke={ROSE} width={1.8} dash="5 4" />
      <Wire d="M462 104 L544 104" stroke={AMBER} width={3} marker="url(#msmArrA)" className="msmm-current" />
      <Wire d="M558 186 L476 186" stroke={AMBER} width={3} marker="url(#msmArrA)" className="msmm-current" />
      <M x={578} y={132} size={11} fill={ROSE} anchor="start" weight={800}>γ</M>
      <M x={510} y={214} size={12.5} fill={N} weight={800}>τ = F / Aₛ</M>
      <M x={510} y={234} size={10} fill={PURP}>Aₛ in the shear plane</M>

      {/* torsion — the free end turns, and the twist line shows shear everywhere */}
      <L x={702} y={70} size={12.5} fill={ROSE}>TORSION</L>
      {[0, 1, 2].map((i) => (
        <Wire key={`tw${i}`} d={`M638 ${124 + i * 14} L626 ${134 + i * 14}`} stroke={MUTED} width={1.8} />
      ))}
      <Wire d="M638 120 L638 164" stroke={MUTED} width={2.2} />
      <rect x={640} y={126} width={124} height={32} rx={3} fill={SKY} stroke={ROSE} strokeWidth={2.4} />
      <Wave x={642} y={142} w={120} amp={9} cycles={1.5} stroke={PURP} width={2.2} className="msmm-pulse" />
      <ellipse cx={766} cy={142} rx={8} ry={18} fill={WHITE} stroke={ROSE} strokeWidth={2.4} className="msmm-wrap" />
      <Wire d="M708 104 A 34 15 0 0 1 768 110" stroke={ROSE} width={2.6} marker="url(#msmArrRo)" />
      <M x={736} y={92} size={11} fill={ROSE} weight={800}>T</M>
      <M x={702} y={182} size={10} fill={MUTED}>twists about the axis</M>
      <M x={702} y={214} size={12.5} fill={N} weight={800}>τ = T·r / J</M>
      <M x={702} y={234} size={10} fill={ROSE}>shear across the section</M>

      {/* normalisation — two very different specimens, one stress, one response */}
      <rect x={40} y={256} width={470} height={200} rx={12} fill={WHITE} stroke={GREEN} strokeWidth={2.4} />
      <L x={275} y={280} size={12.5} fill={GREEN}>Different size, same stress, same behaviour</L>
      <Wire d="M240 300 L240 404" stroke={MUTED} width={1.6} dash="5 5" />
      <rect x={80} y={310} width={94} height={20} rx={3} fill={SKY} stroke={BLUE} strokeWidth={2.2} />
      <g className="msmm-probe" style={{ '--msmm-probe': '-7px' }}>
        <Wire d="M76 320 L54 320" stroke={AMBER} width={2.6} marker="url(#msmArrA)" />
      </g>
      <g className="msmm-probe" style={{ '--msmm-probe': '7px' }}>
        <Wire d="M178 320 L200 320" stroke={AMBER} width={2.6} marker="url(#msmArrA)" />
      </g>
      <M x={127} y={352} size={10.5} fill={N}>F = 2 kN</M>
      <M x={127} y={370} size={10.5} fill={N}>A₀ = 20 mm²</M>
      <M x={127} y={394} size={11.5} fill={GREEN} weight={800}>σ = 100 MPa</M>
      <rect x={300} y={300} width={140} height={40} rx={4} fill={SKY} stroke={BLUE} strokeWidth={2.2} />
      <g className="msmm-probe" style={{ '--msmm-probe': '-7px' }}>
        <Wire d="M296 320 L274 320" stroke={AMBER} width={2.6} marker="url(#msmArrA)" />
      </g>
      <g className="msmm-probe" style={{ '--msmm-probe': '7px' }}>
        <Wire d="M444 320 L466 320" stroke={AMBER} width={2.6} marker="url(#msmArrA)" />
      </g>
      <M x={370} y={352} size={10.5} fill={N}>F = 20 kN</M>
      <M x={370} y={370} size={10.5} fill={N}>A₀ = 200 mm²</M>
      <M x={370} y={394} size={11.5} fill={GREEN} weight={800}>σ = 100 MPa</M>
      <M x={275} y={430} size={10.5} fill={MUTED}>coupon and component stretch by the same fraction</M>

      <Card
        x={530}
        y={256}
        w={330}
        h={200}
        title="Engineering stress and strain"
        accent={BLUE}
        lines={['σ = F / A₀        ε = Δl / l₀', 'A₀ and l₀ are the ORIGINAL values', 'dividing by them cancels the size', 'so a lab coupon predicts a part']}
        linesY={62}
        lineH={26}
        foot="shear and torsion divide by the shear area instead"
        footTone={AMBER}
      />
    </Scene>
  )
}

export function ElasticRegionAndBondsScene() {
  return (
    <Scene caption="Load and unload retrace one line — the slope is the modulus and processing cannot move it">
      <Axes x={70} y={250} w={300} h={196} xLabel="strain ε" yLabel="σ" />
      <Curve pts={[[70, 250], [300, 110]]} stroke={BLUE} width={3.2} className="msmm-draw" />
      <g className="msmm-decay-dot" style={{ '--msmm-dx': '230px', '--msmm-dy': '-140px' }}>
        <Dot cx={70} cy={250} r={6} fill={AMBER} />
      </g>
      <Wire d="M300 110 L70 250" stroke={GREEN} width={2} marker="url(#msmArrG)" className="msmm-current-rev" />
      <Wire d="M170 189 L240 189" stroke={MUTED} width={1.6} dash="4 4" />
      <Wire d="M240 189 L240 147" stroke={MUTED} width={1.6} dash="4 4" />
      <M x={252} y={172} size={11} fill={BLUE} anchor="start" weight={800}>E = σ / ε</M>
      <M x={318} y={104} size={10.5} fill={AMBER} anchor="start">load</M>
      {/* under the axis, not on it — the elastic line runs through y≈226 here */}
      <M x={92} y={274} size={10.5} fill={GREEN} anchor="start">unload — back to the origin</M>

      <rect x={60} y={300} width={310} height={158} rx={11} fill={WHITE} stroke={PURP} strokeWidth={2.2} />
      <L x={215} y={322} size={12} fill={PURP}>Bonds stretch, none break</L>
      <g className="msmm-flux">
        {[0, 1, 2, 3].map((c) =>
          [0, 1].map((r) => (
            <Atom key={`ea${c}-${r}`} cx={104 + c * 60} cy={358 + r * 52} r={11} fill={SKY} stroke={PURP} />
          )),
        )}
        {[0, 1, 2, 3].map((c) => (
          <Wire key={`eb${c}`} d={`M${104 + c * 60} 369 L${104 + c * 60} 399`} stroke={ROSE} width={2} />
        ))}
        {[0, 1, 2].map((c) => (
          <Wire key={`eh${c}`} d={`M${115 + c * 60} 358 L${153 + c * 60} 358`} stroke={ROSE} width={2} />
        ))}
      </g>
      <M x={215} y={440} size={10.5} fill={GREEN}>recoverable — the lattice springs back</M>

      <Axes x={500} y={250} w={352} h={196} xLabel="strain ε" yLabel="σ" />
      <Curve pts={[[500, 250], [560, 214], [620, 200], [700, 194], [800, 192]]} stroke={TEAL} width={2.8} />
      <Curve pts={[[500, 250], [640, 166], [700, 150], [770, 142], [840, 140]]} stroke={ROSE} width={2.8} className="msmm-draw" />
      <Wire d="M500 250 L560 214" stroke={AMBER} width={6} opacity={0.42} className="msmm-pulse" />
      <Dot cx={560} cy={214} r={5} fill={TEAL} />
      <Dot cx={640} cy={166} r={5} fill={ROSE} />
      <M x={806} y={184} size={10.5} fill={TEAL} anchor="start">soft annealed</M>
      <M x={846} y={132} size={10.5} fill={ROSE} anchor="end">hard quenched</M>
      <M x={572} y={230} size={10.5} fill={AMBER} anchor="start">one slope serves both</M>

      <Card
        x={470}
        y={302}
        w={400}
        h={156}
        title="Hooke's law"
        accent={BLUE}
        lines={['σ = E · ε in the straight region', 'E tracks bonding strength, not defects', 'heat treatment moves the yield point', 'and leaves the elastic slope alone']}
        linesY={62}
        lineH={24}
      />
    </Scene>
  )
}

export function PoissonAndShearScene() {
  return (
    <Scene caption="Stretch it and it thins; twist a block and it leans — two constants fix the third">
      <L x={170} y={76} size={12} fill={BLUE}>AXIAL TENSION</L>
      <rect x={105} y={112} width={130} height={64} rx={4} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
      <rect x={105} y={120} width={148} height={48} rx={4} fill={SKY} stroke={BLUE} strokeWidth={2.4} />
      <g className="msmm-probe" style={{ '--msmm-probe': '-8px' }}>
        <Wire d="M100 144 L74 144" stroke={AMBER} width={2.8} marker="url(#msmArrA)" />
      </g>
      <g className="msmm-probe" style={{ '--msmm-probe': '8px' }}>
        <Wire d="M259 144 L285 144" stroke={AMBER} width={2.8} marker="url(#msmArrA)" />
      </g>
      <Wire d="M180 110 L180 118" stroke={ROSE} width={2.2} marker="url(#msmArrRo)" />
      <Wire d="M180 178 L180 170" stroke={ROSE} width={2.2} marker="url(#msmArrRo)" />
      <Wire d="M105 200 L253 200" stroke={MUTED} width={1.6} marker="url(#msmArrM)" />
      <Wire d="M253 200 L105 200" stroke={MUTED} width={1.6} marker="url(#msmArrM)" />
      <M x={179} y={222} size={10.5} fill={N}>axial  ε = Δl / l₀ = +0.0010</M>
      <M x={179} y={242} size={10.5} fill={ROSE}>lateral  ε_lat = Δd / d₀ = −0.0003</M>
      <M x={179} y={268} size={12.5} fill={PURP} weight={800}>ν = −ε_lat / ε = 0.30</M>
      <M x={179} y={290} size={10} fill={MUTED}>about 0.3 for most metals</M>

      <L x={450} y={76} size={12} fill={PURP}>SHEAR</L>
      <rect x={375} y={120} width={120} height={84} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
      <path d="M375 204 L495 204 L519 120 L399 120 Z" fill={SKY} stroke={PURP} strokeWidth={2.4} />
      <rect x={360} y={204} width={180} height={8} rx={3} fill={WHITE} stroke={MUTED} strokeWidth={1.8} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Wire key={`sh${i}`} d={`M${364 + i * 36} 212 L${356 + i * 36} 222`} stroke={MUTED} width={1.6} />
      ))}
      <g className="msmm-probe" style={{ '--msmm-probe': '12px' }}>
        <Wire d="M402 106 L500 106" stroke={AMBER} width={3} marker="url(#msmArrA)" />
      </g>
      <Wire d="M375 158 A 46 46 0 0 1 390 162" stroke={ROSE} width={2} />
      <M x={368} y={150} size={11.5} fill={ROSE} anchor="end" weight={800}>γ</M>
      <M x={450} y={238} size={10.5} fill={N}>γ = Δx / h, the angular distortion</M>
      <M x={450} y={260} size={12.5} fill={PURP} weight={800}>G = τ / γ</M>
      <M x={450} y={282} size={10} fill={MUTED}>shear stress over shear strain</M>

      <L x={734} y={76} size={12} fill={TEAL}>RELATION</L>
      <Card
        x={598}
        y={94}
        w={272}
        h={174}
        title="Three constants, two free"
        accent={TEAL}
        lines={['E — normal stress / normal strain', 'G — shear stress / shear strain', 'ν — lateral over axial strain', 'G = E / [ 2 (1 + ν) ]']}
        linesY={62}
        lineH={28}
        foot="isotropic: any two give the third"
        footTone={GREEN}
      />

      <rect x={40} y={316} width={820} height={150} rx={12} fill={WHITE} stroke={MUTED} strokeWidth={2} />
      <L x={450} y={340} size={12} fill={N}>Drag ν and G follows — E held at 200 GPa</L>
      <M x={72} y={380} size={11.5} fill={PURP} anchor="end" weight={800}>ν</M>
      <rect x={90} y={372} width={300} height={8} rx={4} fill={SKY} stroke={MUTED} strokeWidth={1.4} />
      {[[90, '0.20'], [240, '0.30'], [390, '0.40']].map(([tx, label]) => (
        <g key={`nu${label}`}>
          <Wire d={`M${tx} 368 L${tx} 384`} stroke={MUTED} width={1.8} />
          <M x={tx} y={402} size={10.5} fill={MUTED}>{label}</M>
        </g>
      ))}
      <g className="msmm-probe" style={{ '--msmm-probe': '150px' }}>
        <Dot cx={240} cy={376} r={10} fill={PURP} stroke={WHITE} />
      </g>
      <M x={700} y={342} size={10.5} fill={MUTED}>G from E / 2(1 + ν), in GPa</M>
      <Bars
        x={560}
        y={356}
        w={200}
        rowH={32}
        items={[['ν = 0.20', 83.3, TEAL], ['ν = 0.30', 76.9, PURP], ['ν = 0.40', 71.4, ROSE]]}
        max={90}
      />
      <M x={450} y={458} size={10.5} fill={GREEN}>only two elastic constants are independent — the third follows</M>
    </Scene>
  )
}

export function TensileCurveAnatomyScene() {
  const curve = [
    [90, 360], [150, 262], [165, 246], [200, 232], [260, 220], [340, 208],
    [420, 200], [480, 194], [520, 192], [570, 200], [630, 216], [700, 240],
  ]
  const area = `M90 360 ${curve.slice(1).map(([px, py]) => `L${px} ${py}`).join(' ')} L700 360 Z`
  const stages = [
    { cx: 120, tone: MUTED, name: 'unloaded' },
    { cx: 262, tone: BLUE, name: 'elastic' },
    { cx: 404, tone: TEAL, name: 'uniform' },
    { cx: 546, tone: AMBER, name: 'necked' },
    { cx: 688, tone: RED, name: 'fractured' },
  ]
  return (
    <Scene caption="One curve, five specimen states, and nearly every property in the syllabus">
      {stages.map((s, i) => (
        <g key={s.name}>
          <Dot cx={s.cx} cy={52} r={9} fill={s.tone} />
          <L x={s.cx} y={57} size={10.5} fill={WHITE}>{i + 1}</L>
          <L x={s.cx} y={124} size={10} fill={s.tone} weight={700}>{s.name}</L>
        </g>
      ))}
      <rect x={96} y={78} width={48} height={24} rx={3} fill={SKY} stroke={MUTED} strokeWidth={2} />
      <rect x={234} y={78} width={56} height={22} rx={3} fill={SKY} stroke={BLUE} strokeWidth={2} />
      <rect x={370} y={80} width={68} height={18} rx={3} fill={SKY} stroke={TEAL} strokeWidth={2} />
      <path
        d="M512 80 L534 80 Q546 82 546 89 Q546 96 534 98 L512 98 Z M580 80 L558 80 Q546 82 546 89 Q546 96 558 98 L580 98 Z"
        fill={SKY}
        stroke={AMBER}
        strokeWidth={2}
      />
      <path d="M650 80 L672 80 Q680 84 678 89 L650 98 Z" fill={SKY} stroke={RED} strokeWidth={2} />
      <path d="M726 80 L704 80 Q696 84 698 89 L726 98 Z" fill={SKY} stroke={RED} strokeWidth={2} className="msmm-probe" style={{ '--msmm-probe': '8px' }} />

      <rect x={90} y={150} width={60} height={210} fill={BLUE} opacity={0.1} />
      <rect x={150} y={150} width={50} height={210} fill={PURP} opacity={0.1} />
      <rect x={200} y={150} width={320} height={210} fill={TEAL} opacity={0.1} />
      <rect x={520} y={150} width={180} height={210} fill={ROSE} opacity={0.12} />
      <path d={area} fill={AMBER} opacity={0.14} />
      <path d="M90 360 L150 262 L165 246 L165 360 Z" fill={GREEN} opacity={0.3} />
      <Axes x={90} y={360} w={720} h={216} xLabel="engineering strain ε" yLabel="σ" />
      <Curve pts={curve} stroke={N} width={3.2} className="msmm-draw" />
      {[[90, 360, MUTED], [262, 220, BLUE], [404, 202, TEAL], [520, 192, AMBER], [700, 240, RED]].map(([px, py, tone], i) => (
        <g key={`st${i}`}>
          <Dot cx={px} cy={py} r={6} fill={tone} className="msmm-cost-dot" />
        </g>
      ))}
      <L x={120} y={168} size={10.5} fill={BLUE} weight={700}>elastic</L>
      <L x={176} y={190} size={10.5} fill={PURP} weight={700}>yielding</L>
      <L x={340} y={168} size={10.5} fill={TEAL} weight={700}>uniform plastic</L>
      <L x={610} y={168} size={10.5} fill={ROSE} weight={700}>necking</L>

      <Wire d="M165 246 L90 246" stroke={PURP} width={1.6} dash="5 4" />
      <M x={186} y={276} size={10.5} fill={PURP} anchor="start">σ_y — yield strength</M>
      <Wire d="M520 192 L90 192" stroke={AMBER} width={1.6} dash="5 4" />
      <M x={536} y={186} size={10.5} fill={AMBER} anchor="start">σ_UTS — tensile strength</M>
      <Wire d="M700 240 L700 360" stroke={RED} width={1.6} dash="5 4" />
      <M x={712} y={344} size={10.5} fill={RED} anchor="start">ε_f — ductility</M>
      <Wire d="M186 330 L150 330" stroke={GREEN} width={1.6} dash="4 4" marker="url(#msmArrG)" />
      <M x={192} y={334} size={10.5} fill={GREEN} anchor="start">resilience — elastic triangle</M>
      <M x={452} y={330} size={10.5} fill={AMBER} anchor="start">toughness — the whole area</M>
      <M x={450} y={430} size={11} fill={N} weight={750}>read the properties off the shape, do not memorise them separately</M>
      <M x={450} y={452} size={10.5} fill={MUTED}>load and extension recorded at a controlled rate over a standard gauge length</M>
    </Scene>
  )
}

export function OffsetYieldConstructionScene() {
  return (
    <Scene caption="Real yielding is gradual, so the 0.2 percent offset construction defines the point">
      <L x={270} y={86} size={11.5} fill={AMBER}>GRADUAL — CONSTRUCTION NEEDED</L>
      <Axes x={80} y={360} w={380} h={260} xLabel="strain ε" yLabel="σ" />
      <Curve pts={[[80, 360], [190, 250], [215, 230], [250, 218], [300, 210], [360, 204], [440, 198]]} stroke={BLUE} width={3} className="msmm-draw" />
      <Wire d="M190 250 L262 178" stroke={MUTED} width={1.8} dash="6 5" />
      {/* both annotations clear the construction lines they name: the offset
          line ends at (290,174) and the curve sits below y≈198 out here */}
      <M x={276} y={160} size={10} fill={MUTED} anchor="start">elastic line extended</M>
      <Wire d="M104 360 L290 174" stroke={AMBER} width={2.2} dash="7 5" />
      <M x={300} y={186} size={10} fill={AMBER} anchor="start">parallel, offset 0.002</M>
      <Dot cx={245} cy={219} r={6.5} fill={AMBER} stroke={WHITE} />
      <Wire d="M245 219 L80 219" stroke={AMBER} width={1.6} dash="5 4" />
      <M x={96} y={205} size={10.5} fill={AMBER} anchor="start">σ_y at 0.2% offset</M>
      <g className="msmm-decay-dot" style={{ '--msmm-dx': '165px', '--msmm-dy': '-141px' }}>
        <Dot cx={80} cy={360} r={5.5} fill={ROSE} />
      </g>
      <Wire d="M245 219 L108 357" stroke={GREEN} width={2} marker="url(#msmArrG)" className="msmm-current-rev" />
      <M x={196} y={312} size={10} fill={GREEN} anchor="start">unload parallel</M>
      <Dot cx={104} cy={360} r={5} fill={GREEN} />
      <Wire d="M80 380 L104 380" stroke={GREEN} width={1.8} marker="url(#msmArrG)" />
      <Wire d="M104 380 L80 380" stroke={GREEN} width={1.8} marker="url(#msmArrG)" />
      <M x={116} y={384} size={10.5} fill={GREEN} anchor="start">0.2% permanent set remains</M>

      <L x={695} y={86} size={11.5} fill={TEAL}>MILD STEEL — SHARP YIELD</L>
      <Axes x={540} y={360} w={310} h={260} xLabel="strain ε" yLabel="σ" />
      <Curve
        pts={[[540, 360], [618, 282], [626, 270], [638, 290], [665, 288], [700, 290], [730, 286], [790, 258], [846, 244]]}
        stroke={TEAL}
        width={3}
        className="msmm-draw"
      />
      <Dot cx={626} cy={270} r={5.5} fill={ROSE} />
      <Dot cx={638} cy={290} r={5.5} fill={TEAL} />
      <M x={636} y={256} size={10.5} fill={ROSE} anchor="start">upper yield point</M>
      <M x={652} y={316} size={10.5} fill={TEAL} anchor="start">lower yield point</M>
      <M x={700} y={344} size={10.5} fill={GREEN}>distinct point — no construction</M>

      <Card
        x={40}
        y={402}
        w={820}
        h={88}
        title="Why the convention exists"
        accent={BLUE}
        lines={['most metals leave the straight line gradually, so no single yield point exists', 'design is based on it — a component that has yielded has changed shape for good']}
        linesY={54}
        lineH={24}
      />
    </Scene>
  )
}

export function NeckingInstabilityScene() {
  const eng = [[70, 330], [112, 252], [160, 224], [230, 202], [300, 190], [350, 184], [400, 196], [440, 214]]
  const tru = [[70, 330], [112, 252], [160, 223], [230, 198], [300, 180], [350, 170], [400, 150], [440, 130]]
  return (
    <Scene caption="The maximum is the instability point — everything after it is the original area lying to you">
      <rect x={80} y={62} width={80} height={20} rx={3} fill={SKY} stroke={TEAL} strokeWidth={2} />
      <path d="M210 60 L242 66 L258 66 L290 60 L290 84 L258 78 L242 78 L210 84 Z" fill={SKY} stroke={AMBER} strokeWidth={2} />
      <path d="M340 58 L368 70 L392 70 L420 58 L420 86 L392 74 L368 74 L340 86 Z" fill={SKY} stroke={RED} strokeWidth={2} />
      <L x={120} y={112} size={10} fill={TEAL} weight={700}>uniform</L>
      <L x={250} y={112} size={10} fill={AMBER} weight={700}>neck starts</L>
      <L x={380} y={112} size={10} fill={RED} weight={700}>heavily necked</L>

      <path
        d="M350 184 L400 196 L440 214 L440 130 L400 150 L350 170 Z"
        fill={PURP}
        opacity={0.16}
      />
      <Axes x={70} y={330} w={380} h={210} xLabel="strain ε" yLabel="σ" />
      <Curve pts={eng} stroke={N} width={3} className="msmm-draw" />
      <Curve pts={tru} stroke={ROSE} width={2.8} dash="8 5" />
      <Dot cx={350} cy={184} r={6.5} fill={AMBER} stroke={WHITE} />
      <Wire d="M350 184 L350 330" stroke={AMBER} width={1.6} dash="5 4" />
      <M x={356} y={318} size={10.5} fill={AMBER} anchor="start">σ_UTS — necking starts here</M>
      <Wire d="M84 136 L112 136" stroke={ROSE} width={2.8} dash="8 5" />
      <M x={118} y={140} size={10} fill={ROSE} anchor="start">true σ keeps rising to fracture</M>
      <Wire d="M84 158 L112 158" stroke={N} width={2.8} />
      <M x={118} y={162} size={10} fill={N} anchor="start">engineering σ falls after the max</M>
      <Wire d="M444 162 L412 170" stroke={PURP} width={1.6} dash="4 4" />
      <M x={450} y={160} size={10} fill={PURP} anchor="start">divergence</M>

      <Axes x={560} y={330} w={280} h={210} xLabel="strain ε" yLabel="rate" />
      <Curve pts={[[560, 170], [620, 192], [700, 230], [780, 266], [840, 290]]} stroke={GREEN} width={2.8} />
      <Curve pts={[[560, 300], [620, 272], [700, 230], [780, 190], [840, 160]]} stroke={RED} width={2.8} className="msmm-draw" />
      <Dot cx={700} cy={230} r={6.5} fill={PURP} stroke={WHITE} className="msmm-cost-dot" />
      <Wire d="M700 230 L700 330" stroke={PURP} width={1.6} dash="5 4" />
      <M x={574} y={152} size={10} fill={GREEN} anchor="start">hardening rate falls</M>
      <M x={836} y={142} size={10} fill={RED} anchor="end">area loss rate grows</M>
      <M x={706} y={320} size={10} fill={PURP} anchor="start">they cross at σ_UTS</M>

      <Card
        x={40}
        y={374}
        w={400}
        h={94}
        title="At the maximum"
        accent={AMBER}
        lines={['hardening no longer offsets the lost area', 'so deformation localises into one neck']}
        linesY={56}
        lineH={24}
      />
      <Card
        x={460}
        y={374}
        w={400}
        h={94}
        title="The falling branch is an artefact"
        accent={PURP}
        lines={['engineering σ still divides by the ORIGINAL area', 'true σ in the shrinking neck goes on rising']}
        linesY={56}
        lineH={24}
      />
    </Scene>
  )
}

export function DuctilityMeasuresScene() {
  return (
    <Scene caption="Two measures — and percent elongation means nothing until the gauge length is quoted">
      <path d="M80 118 L140 118 L172 142 L172 156 L140 180 L80 180 Z" fill={SKY} stroke={BLUE} strokeWidth={2.4} />
      <path d="M252 118 L212 118 L180 142 L180 156 L212 180 L252 180 Z" fill={SKY} stroke={BLUE} strokeWidth={2.4} />
      <Wire d="M176 140 L176 158" stroke={RED} width={2.4} />
      <Wire d="M176 112 L176 138" stroke={MUTED} width={1.4} dash="4 3" />
      <M x={176} y={104} size={10.5} fill={RED} weight={800}>d_f at the neck</M>
      <Wire d="M66 118 L66 180" stroke={MUTED} width={1.6} marker="url(#msmArrM)" />
      <Wire d="M66 180 L66 118" stroke={MUTED} width={1.6} marker="url(#msmArrM)" />
      <M x={56} y={152} size={10.5} fill={MUTED} anchor="end">d₀</M>
      <Wire d="M80 198 L236 198" stroke={MUTED} width={1.6} dash="5 4" />
      <M x={248} y={202} size={10} fill={MUTED} anchor="start">l₀ = 50 mm</M>
      <Wire d="M80 220 L252 220" stroke={GREEN} width={2} marker="url(#msmArrG)" />
      <M x={264} y={224} size={10} fill={GREEN} anchor="start">l_f = 58 mm</M>
      <M x={200} y={250} size={11} fill={GREEN} weight={800}>%EL = (l_f − l₀) / l₀ × 100 = 16%</M>
      <M x={200} y={274} size={11} fill={ROSE} weight={800}>%RA = (A₀ − A_f) / A₀ × 100 = 42%</M>

      <L x={670} y={76} size={11.5} fill={BLUE}>SAME FRACTURE, TWO GAUGE LENGTHS</L>
      <rect x={500} y={96} width={240} height={20} rx={3} fill={SKY} stroke={MUTED} strokeWidth={2} />
      <rect x={602} y={96} width={16} height={20} fill={AMBER} opacity={0.65} />
      <Wire d="M580 92 L580 120" stroke={N} width={1.8} />
      <Wire d="M640 92 L640 120" stroke={N} width={1.8} />
      <Wire d="M580 132 L640 132" stroke={N} width={1.6} marker="url(#msmArr)" />
      <M x={610} y={150} size={10} fill={N}>l₀ = 25 mm</M>
      <M x={756} y={110} size={10.5} fill={ROSE} anchor="start">%EL = 24%</M>
      <rect x={500} y={178} width={240} height={20} rx={3} fill={SKY} stroke={MUTED} strokeWidth={2} />
      <rect x={602} y={178} width={16} height={20} fill={AMBER} opacity={0.65} />
      <Wire d="M520 174 L520 202" stroke={N} width={1.8} />
      <Wire d="M720 174 L720 202" stroke={N} width={1.8} />
      <Wire d="M520 214 L720 214" stroke={N} width={1.6} marker="url(#msmArr)" />
      <M x={620} y={232} size={10} fill={N}>l₀ = 100 mm</M>
      <M x={756} y={192} size={10.5} fill={TEAL} anchor="start">%EL = 9%</M>
      <M x={670} y={262} size={10.5} fill={AMBER}>the amber neck extension is the same length in both</M>

      <L x={230} y={318} size={11.5} fill={N}>FRACTURE SURFACES</L>
      <rect x={60} y={334} width={140} height={36} rx={3} fill={SKY} stroke={RED} strokeWidth={2.2} />
      <Wire d="M200 330 L200 374" stroke={RED} width={3} />
      <M x={118} y={394} size={10.5} fill={RED}>brittle — flat, under 5% EL</M>
      <path d="M240 326 L330 326 L372 344 L372 352 L330 370 L240 370 Z" fill={SKY} stroke={GREEN} strokeWidth={2.2} />
      <Wire d="M376 342 L376 354" stroke={GREEN} width={3} />
      <M x={320} y={394} size={10.5} fill={GREEN}>ductile — necked cup and cone</M>

      <Card
        x={470}
        y={304}
        w={390}
        h={160}
        title="Two measures of ductility"
        accent={BLUE}
        lines={['percent elongation — extension over l₀', 'percent reduction of area — read at the neck', 'under about 5% elongation is called brittle']}
        linesY={58}
        lineH={26}
        foot="a short gauge length inflates %EL — always quote it"
        footTone={RED}
      />
    </Scene>
  )
}

export function ResilienceAreaScene() {
  return (
    <Scene caption="Area under the elastic triangle — high yield with a modest modulus wins">
      <path d="M70 290 L200 140 L200 290 Z" fill={GREEN} opacity={0.3} />
      <Axes x={70} y={290} w={300} h={210} xLabel="strain ε" yLabel="σ" />
      <Curve pts={[[70, 290], [200, 140], [240, 128], [300, 120], [366, 116]]} stroke={BLUE} width={3} className="msmm-draw" />
      <Dot cx={200} cy={140} r={6} fill={GREEN} stroke={WHITE} />
      <Wire d="M200 140 L70 140" stroke={GREEN} width={1.6} dash="5 4" />
      <M x={58} y={216} size={11} fill={GREEN} anchor="end" weight={800}>σ_y</M>
      <Wire d="M70 304 L200 304" stroke={GREEN} width={1.8} marker="url(#msmArrG)" />
      <M x={135} y={322} size={10.5} fill={GREEN}>ε_y</M>
      <M x={124} y={262} size={12} fill={GREEN} weight={800}>U_r</M>
      <M x={240} y={266} size={10} fill={MUTED} anchor="start">stored, then given back on unloading</M>

      <Card
        x={392}
        y={80}
        w={232}
        h={168}
        title="Derivation"
        accent={BLUE}
        mono
        lines={['U_r = ½ · σ_y · ε_y', 'ε_y = σ_y / E', 'U_r = σ_y² / (2E)']}
        linesY={70}
        lineH={34}
        foot="joules per cubic metre"
        footTone={MUTED}
      />

      <path d="M660 284 L740 150 L740 284 Z" fill={GREEN} opacity={0.3} />
      <path d="M660 284 L690 228 L690 284 Z" fill={ROSE} opacity={0.32} />
      <Axes x={660} y={284} w={200} h={204} yLabel="σ" />
      <Curve pts={[[660, 284], [740, 150], [800, 140], [852, 136]]} stroke={GREEN} width={2.8} className="msmm-draw" />
      <Curve pts={[[660, 284], [690, 228], [760, 220], [852, 216]]} stroke={ROSE} width={2.8} />
      <M x={856} y={116} size={10} fill={GREEN} anchor="end">high σ_y, modest E</M>
      <M x={856} y={196} size={10} fill={ROSE} anchor="end">low σ_y, high E</M>
      <M x={790} y={312} size={10.5} fill={MUTED}>strain ε</M>

      <M x={260} y={344} size={10.5} fill={MUTED}>modulus of resilience, MJ per m³</M>
      <Bars
        x={166}
        y={356}
        w={196}
        rowH={34}
        items={[['high σ_y, modest E', 1.9, GREEN], ['low σ_y, high E', 0.6, ROSE]]}
        max={2.2}
      />

      <Card
        x={430}
        y={330}
        w={430}
        h={140}
        title="Choosing a spring material"
        accent={GREEN}
        lines={['want a high yield strength and a modest modulus', 'spring steels are hardened for exactly this reason', 'so resilience is not simply strength']}
        linesY={58}
        lineH={26}
        foot="the bigger triangle stores the most recoverable energy"
        footTone={GREEN}
      />
    </Scene>
  )
}

export function ToughnessRequiresBothScene() {
  return (
    <Scene caption="Neither the strongest nor the most ductile wins — the largest area does">
      <L x={160} y={54} size={11} fill={ROSE}>STRONG BUT BRITTLE</L>
      <path d="M60 250 L150 104 L170 100 L170 250 Z" fill={ROSE} opacity={0.26} />
      <Axes x={60} y={250} w={200} h={180} xLabel="ε" yLabel="σ" />
      <Curve pts={[[60, 250], [150, 104], [170, 100]]} stroke={ROSE} width={2.8} className="msmm-draw" />
      <Wire d="M164 94 L178 108" stroke={RED} width={2.2} />
      <Wire d="M178 94 L164 108" stroke={RED} width={2.2} />
      <M x={196} y={232} size={10} fill={ROSE} anchor="start">tall, narrow</M>

      <L x={420} y={54} size={11} fill={TEAL}>WEAK BUT DUCTILE</L>
      <path d="M320 250 L350 206 L400 196 L470 190 L510 188 L510 250 Z" fill={TEAL} opacity={0.26} />
      <Axes x={320} y={250} w={200} h={180} xLabel="ε" yLabel="σ" />
      <Curve pts={[[320, 250], [350, 206], [400, 196], [470, 190], [510, 188]]} stroke={TEAL} width={2.8} className="msmm-draw" />
      <Wire d="M504 182 L518 196" stroke={RED} width={2.2} />
      <Wire d="M518 182 L504 196" stroke={RED} width={2.2} />
      <M x={400} y={170} size={10} fill={TEAL}>low, wide</M>

      <L x={680} y={54} size={11} fill={GREEN}>TOUGH — BOTH</L>
      <path d="M580 250 L640 148 L700 136 L750 132 L776 138 L776 250 Z" fill={GREEN} opacity={0.3} />
      <Axes x={580} y={250} w={200} h={180} xLabel="ε" yLabel="σ" />
      <Curve pts={[[580, 250], [640, 148], [700, 136], [750, 132], [776, 138]]} stroke={GREEN} width={2.8} className="msmm-draw" />
      <Wire d="M770 132 L784 146" stroke={RED} width={2.2} />
      <Wire d="M784 132 L770 146" stroke={RED} width={2.2} />
      <M x={700} y={214} size={10} fill={GREEN}>reasonable height AND width</M>

      {/* 160 wide, not 180 — the value labels hang off the right end and the
          opaque impact Card at x=378 is painted after them */}
      <Bars
        x={166}
        y={310}
        w={160}
        rowH={32}
        items={[['strong brittle', 0.9, ROSE], ['weak ductile', 1.0, TEAL], ['tough', 2.4, GREEN]]}
        max={2.6}
      />
      <M x={240} y={418} size={10.5} fill={N} weight={800}>area to fracture, relative</M>
      <M x={240} y={440} size={10} fill={RED}>most strengthening removes the width</M>

      <Card
        x={378}
        y={300}
        w={186}
        h={130}
        title="Impact test"
        accent={AMBER}
        lines={['notched bar', 'pendulum strike', 'energy absorbed']}
        linesY={54}
        lineH={24}
      />

      <Dot cx={630} cy={370} r={5} fill={N} />
      <g className="msmm-needle">
        <circle cx={630} cy={370} r={64} fill="none" stroke="none" />
        <Wire d="M630 370 L630 424" stroke={MUTED} width={2.6} />
        <circle cx={630} cy={430} r={11} fill={AMBER} stroke={N} strokeWidth={2} />
      </g>
      <rect x={604} y={446} width={52} height={14} rx={2} fill={SKY} stroke={N} strokeWidth={2} />
      <path d="M626 446 L630 452 L634 446 Z" fill={RED} />
      <M x={630} y={476} size={10} fill={MUTED}>notched specimen</M>
      <Wire d="M720 382 L720 446" stroke={GREEN} width={1.8} marker="url(#msmArrG)" />
      <M x={732} y={404} size={10} fill={GREEN} anchor="start">swing height gives</M>
      <M x={732} y={422} size={10} fill={GREEN} anchor="start">the energy absorbed</M>
    </Scene>
  )
}

export function TrueVsEngineeringScene() {
  const eng = [[70, 330], [120, 250], [170, 222], [250, 200], [330, 186], [390, 180], [450, 192], [510, 214]]
  const tru = [[70, 330], [120, 250], [170, 221], [250, 196], [330, 172], [390, 156], [450, 128], [510, 96]]
  return (
    <Scene caption="Current dimensions, and the curve never turns over — hardening does not stop">
      <path d="M390 180 L450 192 L510 214 L510 96 L450 128 L390 156 Z" fill={PURP} opacity={0.16} />
      <Axes x={70} y={330} w={470} h={250} xLabel="strain" yLabel="σ" />
      <Curve pts={eng} stroke={N} width={3} className="msmm-draw" />
      <Curve pts={tru} stroke={ROSE} width={3} />
      <Dot cx={390} cy={180} r={6} fill={AMBER} stroke={WHITE} />
      <M x={110} y={140} size={10.5} fill={ROSE} anchor="start">true σ = F / Aᵢ — climbs to fracture</M>
      <M x={200} y={300} size={10.5} fill={N} anchor="start">engineering σ = F / A₀ — peaks and falls</M>
      <M x={452} y={248} size={10.5} fill={PURP} anchor="start">divergence</M>
      <M x={398} y={166} size={10} fill={AMBER} anchor="start">necking</M>

      <L x={715} y={68} size={11.5} fill={BLUE}>WHICH AREA IS DIVIDED BY</L>
      <rect x={600} y={84} width={120} height={26} rx={3} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
      <rect x={600} y={84} width={120} height={26} rx={3} fill={SKY} stroke={BLUE} strokeWidth={2.2} />
      <M x={740} y={102} size={10} fill={MUTED} anchor="start">Aᵢ = A₀</M>
      <rect x={600} y={136} width={150} height={26} rx={3} fill="none" stroke={MUTED} strokeWidth={1.6} strokeDasharray="5 4" />
      <rect x={600} y={140} width={150} height={18} rx={3} fill={SKY} stroke={BLUE} strokeWidth={2.2} />
      <M x={766} y={154} size={10} fill={ROSE} anchor="start">Aᵢ &lt; A₀</M>
      <path d="M600 190 L660 190 L684 202 L684 210 L660 222 L600 222 Z" fill={SKY} stroke={BLUE} strokeWidth={2.2} />
      <path d="M760 190 L706 190 L690 202 L690 210 L706 222 L760 222 Z" fill={SKY} stroke={BLUE} strokeWidth={2.2} />
      <M x={678} y={242} size={10} fill={ROSE}>Aᵢ much smaller at the neck</M>
      <M x={715} y={120} size={10} fill={MUTED}>A₀ is the dashed outline throughout</M>

      <Card
        x={560}
        y={256}
        w={310}
        h={122}
        title="Conversion before necking"
        accent={TEAL}
        mono
        lines={['σ_T = σ (1 + ε)', 'ε_T = ln (1 + ε)']}
        linesY={62}
        lineH={30}
        foot="uniform deformation only"
        footTone={RED}
      />
      <Card
        x={40}
        y={392}
        w={820}
        h={76}
        title="Why the true curve matters"
        accent={ROSE}
        lines={['it has no maximum — the material goes on hardening right up to fracture']}
        linesY={58}
      />
    </Scene>
  )
}

export function HardnessTestComparisonScene() {
  return (
    <Scene caption="Press an indenter in and measure the mark — diameter, depth, or diagonal">
      <L x={150} y={58} size={11.5} fill={BLUE}>BRINELL</L>
      <rect x={60} y={150} width={180} height={60} rx={3} fill={SKY} stroke={N} strokeWidth={2.2} />
      <path d="M118 150 A 34 22 0 0 0 182 150" fill={WHITE} stroke={ROSE} strokeWidth={2.2} />
      <circle cx={150} cy={124} r={24} fill={WHITE} stroke={BLUE} strokeWidth={2.4} className="msmm-insert" />
      <Wire d="M118 174 L182 174" stroke={ROSE} width={1.8} marker="url(#msmArrRo)" />
      <Wire d="M182 174 L118 174" stroke={ROSE} width={1.8} marker="url(#msmArrRo)" />
      <M x={150} y={196} size={10.5} fill={ROSE} weight={800}>d</M>
      <M x={150} y={232} size={10.5} fill={N}>indentation diameter, optically</M>
      <M x={150} y={250} size={10} fill={MUTED}>BHN — soft to medium metals</M>

      <L x={400} y={58} size={11.5} fill={TEAL}>ROCKWELL</L>
      <rect x={310} y={150} width={180} height={60} rx={3} fill={SKY} stroke={N} strokeWidth={2.2} />
      <path d="M382 150 L400 180 L418 150 Z" fill={WHITE} stroke={ROSE} strokeWidth={2.2} />
      <path d="M400 106 L420 142 L380 142 Z" fill={WHITE} stroke={TEAL} strokeWidth={2.4} className="msmm-insert" />
      <Wire d="M446 150 L446 180" stroke={ROSE} width={1.8} marker="url(#msmArrRo)" />
      <M x={452} y={170} size={10.5} fill={ROSE} anchor="start" weight={800}>t</M>
      <M x={400} y={232} size={10.5} fill={N}>depth, read by the machine</M>
      <M x={400} y={250} size={10} fill={MUTED}>HRB and HRC — fast shop test</M>

      <L x={650} y={58} size={11.5} fill={PURP}>VICKERS</L>
      <rect x={560} y={150} width={180} height={60} rx={3} fill={SKY} stroke={N} strokeWidth={2.2} />
      <path d="M628 150 L650 180 L672 150 Z" fill={WHITE} stroke={ROSE} strokeWidth={2.2} />
      <path d="M650 96 L672 122 L650 148 L628 122 Z" fill={WHITE} stroke={PURP} strokeWidth={2.4} className="msmm-insert" />
      <Wire d="M628 174 L672 174" stroke={ROSE} width={1.8} marker="url(#msmArrRo)" />
      <Wire d="M672 174 L628 174" stroke={ROSE} width={1.8} marker="url(#msmArrRo)" />
      <M x={650} y={196} size={10.5} fill={ROSE} weight={800}>d₁</M>
      <M x={650} y={232} size={10.5} fill={N}>impression diagonal</M>
      <M x={650} y={250} size={10} fill={MUTED}>HV — very soft to very hard</M>

      <Axes x={90} y={430} w={330} h={140} xLabel="Brinell hardness" yLabel="TS" />
      <Curve pts={[[90, 430], [400, 310]]} stroke={BLUE} width={2.6} className="msmm-draw" />
      {[[140, 414], [200, 384], [260, 352], [320, 332], [370, 316]].map(([px, py], i) => (
        <Dot key={`hd${i}`} cx={px} cy={py} r={4.5} fill={TEAL} />
      ))}
      <M x={196} y={304} size={10.5} fill={BLUE} anchor="start">TS ≈ 3.45 × BHN for steels</M>

      <Card
        x={450}
        y={288}
        w={410}
        h={176}
        title="Why hardness is used"
        accent={GREEN}
        lines={['resistance to localised plastic deformation', 'quick, little preparation, essentially non-destructive', 'and for steels it stands in for tensile strength']}
        linesY={58}
        lineH={26}
        foot="the correlation is empirical and material specific — not a law"
        footTone={RED}
      />
    </Scene>
  )
}

export function GrainAndSoluteStrengtheningScene() {
  return (
    <Scene caption="Boundaries stop dislocations, mismatched solutes drag on them — both only obstruct motion">
      <L x={60} y={70} size={11.5} fill={BLUE} anchor="start">GRAIN BOUNDARY STRENGTHENING</L>
      <M x={468} y={70} size={10} fill={RED} anchor="end">halted at the boundary</M>
      <path d="M70 92 L250 88 L254 236 L74 232 Z" fill={SKY} stroke={MUTED} strokeWidth={2} />
      <path d="M266 88 L450 94 L446 236 L262 236 Z" fill={WHITE} stroke={MUTED} strokeWidth={2} />
      {[112, 146, 206].map((ly) => (
        <Wire key={`lp${ly}`} d={`M80 ${ly} L248 ${ly}`} stroke={MUTED} width={1.6} dash="6 5" />
      ))}
      {[0, 1, 2].map((i) => (
        <Wire key={`rp${i}`} d={`M272 ${100 + i * 42} L444 ${168 + i * 42}`} stroke={MUTED} width={1.6} dash="6 5" />
      ))}
      <Wire d="M258 86 L261 238" stroke={N} width={4.5} />
      <Wire d="M80 180 L250 180" stroke={AMBER} width={2.4} />
      <g className="msmm-probe" style={{ '--msmm-probe': '118px' }}>
        <M x={110} y={186} size={17} fill={ROSE} weight={800}>⊥</M>
      </g>
      <Wire d="M250 162 L250 198" stroke={RED} width={3.4} />
      <Wire d="M400 78 L266 156" stroke={RED} width={1.4} dash="4 4" />
      <M x={150} y={258} size={10.5} fill={N}>grain A — glide plane</M>
      <M x={360} y={258} size={10.5} fill={N}>grain B — planes at another angle</M>

      <L x={690} y={66} size={11.5} fill={TEAL}>HALL-PETCH</L>
      <Axes x={540} y={230} w={300} h={150} xLabel="1 / √d" yLabel="σ_y" />
      <Curve pts={[[540, 220], [840, 110]]} stroke={TEAL} width={2.8} className="msmm-draw" />
      {[[600, 198], [660, 176], [720, 154], [780, 132]].map(([px, py], i) => (
        <Dot key={`hp${i}`} cx={px} cy={py} r={4.5} fill={BLUE} />
      ))}
      <M x={690} y={90} size={11} fill={TEAL} weight={800}>σ_y = σ₀ + k / √d</M>
      <M x={690} y={112} size={10} fill={MUTED}>finer grain, more boundary, higher yield</M>

      <L x={150} y={292} size={11.5} fill={PURP} anchor="start">SOLID SOLUTION STRENGTHENING</L>
      {[0, 1, 2, 3].map((c) =>
        [0, 1, 2].map((r) => (
          <Atom key={`ha${c}-${r}`} cx={90 + c * 64} cy={330 + r * 42} r={13} fill={SKY} stroke={MUTED} />
        )),
      )}
      <circle cx={154} cy={372} r={29} fill="none" stroke={ROSE} strokeWidth={1.8} strokeDasharray="5 4" className="msmm-flux" />
      <Atom cx={154} cy={372} r={19} fill={ROSE} stroke={ROSE} />
      <circle cx={282} cy={330} r={25} fill="none" stroke={TEAL} strokeWidth={1.8} strokeDasharray="5 4" className="msmm-flux" />
      <Atom cx={282} cy={330} r={8} fill={TEAL} stroke={TEAL} />
      <Wire d="M70 452 L300 452" stroke={AMBER} width={2.2} />
      <g className="msmm-probe" style={{ '--msmm-probe': '150px' }}>
        <M x={100} y={458} size={17} fill={PURP} weight={800}>⊥</M>
      </g>
      <M x={316} y={340} size={10} fill={TEAL} anchor="start">smaller solute: tensile field</M>
      <M x={316} y={366} size={10} fill={ROSE} anchor="start">larger solute: compressive field</M>
      <M x={316} y={396} size={10} fill={N} anchor="start">the fields interact with the</M>
      <M x={316} y={416} size={10} fill={N} anchor="start">dislocation's own strain field</M>
      <M x={316} y={444} size={10} fill={PURP} anchor="start">so more stress is needed to pass</M>

      <M x={690} y={296} size={10.5} fill={MUTED}>yield strength increment, MPa</M>
      <Bars
        x={640}
        y={316}
        w={180}
        rowH={38}
        items={[['grain refinement', 120, TEAL], ['solid solution', 90, PURP], ['both together', 210, GREEN]]}
        max={230}
      />
      <M x={690} y={448} size={10} fill={GREEN}>both are used in essentially every commercial alloy</M>
    </Scene>
  )
}

export function ColdWorkAndAnnealingScene() {
  const panels = [46, 214, 382, 550, 718]
  const titles = ['ANNEALED', 'COLD WORKED', 'RECOVERY', 'RECRYSTALLISED', 'GRAIN GROWTH']
  const notes = [
    'equiaxed, few dislocations',
    'elongated, tangled',
    'tangles tidy into walls',
    'new strain-free grains',
    'the new grains coarsen',
  ]
  const tangle = (tx, ty) => `M${tx} ${ty} q 6 -7 12 0 q 6 7 12 0`
  return (
    <Scene caption="Cold work jams dislocations together; recrystallisation wipes the slate clean">
      {panels.map((px, i) => (
        <g key={`pn${px}`}>
          <L x={px + 70} y={68} size={10} fill={i === 3 ? GREEN : N}>{titles[i]}</L>
          <rect x={px} y={76} width={140} height={120} rx={8} fill={WHITE} stroke={MUTED} strokeWidth={2} />
          <M x={px + 70} y={212} size={9.5} fill={MUTED}>{notes[i]}</M>
        </g>
      ))}
      {[0, 1, 2].map((c) =>
        [0, 1].map((r) => (
          <rect key={`g1${c}-${r}`} x={52 + c * 44} y={82 + r * 58} width={40} height={54} rx={7} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
        )),
      )}
      <Wire d={tangle(70, 110)} stroke={ROSE} width={1.6} />
      <Wire d={tangle(140, 160)} stroke={ROSE} width={1.6} />

      {[0, 1, 2, 3].map((r) => (
        <rect key={`g2${r}`} x={220} y={82 + r * 29} width={128} height={25} rx={5} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <Wire key={`t2${i}`} d={tangle(228 + (i % 3) * 38, 92 + Math.floor(i / 3) * 34)} stroke={ROSE} width={1.6} className="msmm-pulse" />
      ))}

      {[0, 1, 2, 3].map((r) => (
        <rect key={`g3${r}`} x={388} y={82 + r * 29} width={128} height={25} rx={5} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
      ))}
      {[0, 1, 2].map((i) => (
        <Wire key={`t3${i}`} d={`M${412 + i * 42} 86 L${412 + i * 42} 190`} stroke={ROSE} width={1.6} dash="5 6" />
      ))}

      {[0, 1].map((r) => (
        <rect key={`g4${r}`} x={556} y={82 + r * 29} width={128} height={25} rx={5} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
      ))}
      {[0, 1, 2].map((c) => (
        <rect
          key={`g4n${c}`}
          x={558 + c * 44}
          y={140}
          width={40}
          height={50}
          rx={7}
          fill={WHITE}
          stroke={GREEN}
          strokeWidth={2}
          className={`msmm-emerge msmm-delay-${c}`}
        />
      ))}
      <Wire d={tangle(596, 92)} stroke={ROSE} width={1.6} />

      <rect x={724} y={82} width={62} height={108} rx={9} fill={WHITE} stroke={GREEN} strokeWidth={2} />
      <rect x={790} y={82} width={62} height={108} rx={9} fill={WHITE} stroke={GREEN} strokeWidth={2} />

      {[[190, 'cold work'], [358, 'heat'], [526, 'nucleate'], [694, 'hold longer']].map(([ax, label]) => (
        <g key={String(label)}>
          <Wire d={`M${ax} 136 L${n(ax) + 20} 136`} stroke={AMBER} width={2.2} marker="url(#msmArrA)" className="msmm-current" />
          <M x={n(ax) + 10} y={234} size={9.5} fill={AMBER}>{label}</M>
        </g>
      ))}

      <Axes
        x={80}
        y={430}
        w={760}
        h={140}
        yLabel="property"
        tickLabels={[[116, 'annealed'], [284, 'cold work'], [452, 'recovery'], [620, 'recryst.'], [788, 'growth']]}
      />
      <Curve pts={[[116, 400], [284, 310], [452, 322], [620, 396], [788, 404]]} stroke={ROSE} width={2.8} className="msmm-draw" />
      <Curve pts={[[116, 310], [284, 404], [452, 392], [620, 312], [788, 306]]} stroke={TEAL} width={2.8} />
      {[[116, 400], [284, 310], [452, 322], [620, 396], [788, 404]].map(([px, py], i) => (
        <Dot key={`sd${i}`} cx={px} cy={py} r={4.5} fill={ROSE} />
      ))}
      {[[116, 310], [284, 404], [452, 392], [620, 312], [788, 306]].map(([px, py], i) => (
        <Dot key={`dd${i}`} cx={px} cy={py} r={4.5} fill={TEAL} />
      ))}
      <M x={800} y={410} size={10} fill={ROSE} anchor="start">strength</M>
      <M x={800} y={300} size={10} fill={TEAL} anchor="start">ductility</M>
      <M x={452} y={286} size={10} fill={GREEN}>recrystallisation restores ductility and undoes the strengthening</M>
    </Scene>
  )
}

export function FatigueSnAndFractureScene() {
  return (
    <Scene caption="Failure below yield after many cycles — and only ferrous alloys get a safe limit">
      <Axes
        x={80}
        y={270}
        w={380}
        h={200}
        yLabel="σ_a"
        tickLabels={[[110, '10³'], [180, '10⁴'], [250, '10⁵'], [320, '10⁶'], [390, '10⁷'], [450, '10⁸']]}
      />
      <M x={268} y={310} size={10} fill={MUTED}>cycles to failure (log scale)</M>
      <Wire d="M80 200 L460 200" stroke={GREEN} width={1.8} dash="6 5" />
      <Curve pts={[[95, 110], [180, 150], [250, 180], [320, 196], [390, 200], [452, 200]]} stroke={GREEN} width={2.8} className="msmm-draw" />
      <Curve pts={[[95, 120], [180, 164], [250, 200], [320, 228], [390, 250], [452, 262]]} stroke={ROSE} width={2.8} dash="8 5" />
      <Wire d="M96 84 L124 84" stroke={GREEN} width={2.8} />
      <M x={130} y={88} size={10} fill={GREEN} anchor="start">ferrous: flattens to a limit</M>
      <Wire d="M96 106 L124 106" stroke={ROSE} width={2.8} dash="8 5" />
      <M x={130} y={110} size={10} fill={ROSE} anchor="start">non-ferrous: goes on falling</M>
      {/* two short lines: the full sentence ran under the falling non-ferrous
          curve, which crosses y≈210 around x=270 */}
      <M x={92} y={216} size={10} fill={GREEN} anchor="start">endurance limit</M>
      <M x={92} y={234} size={10} fill={GREEN} anchor="start">life below it is unlimited</M>

      <L x={680} y={58} size={11.5} fill={N}>FATIGUE FRACTURE SURFACE</L>
      <circle cx={640} cy={150} r={82} fill={WHITE} stroke={N} strokeWidth={2.4} />
      <path d="M722 150 A 82 82 0 0 1 640 232 L640 150 Z" fill={ROSE} opacity={0.2} />
      {[0, 1, 2, 3].map((i) => (
        <Wire key={`hx${i}`} d={`M${660 + i * 16} ${226 - i * 14} L${690 + i * 14} ${196 - i * 12}`} stroke={ROSE} width={1.4} />
      ))}
      {[28, 48, 68, 88].map((r, i) => (
        <Wire key={`bm${r}`} d={`M${582 + r} 92 A ${r} ${r} 0 0 1 582 ${92 + r}`} stroke={BLUE} width={1.8} className={`msmm-pulse msmm-delay-${i}`} />
      ))}
      <Dot cx={582} cy={92} r={6} fill={RED} />
      <Wire d="M560 78 L578 89" stroke={RED} width={1.4} />
      <M x={556} y={74} size={10} fill={RED} anchor="end">initiation at the surface</M>
      <M x={640} y={250} size={10} fill={BLUE}>smooth zone, beach marks</M>
      <M x={640} y={268} size={10} fill={ROSE}>rough final fast fracture</M>

      {['surface finish', 'stress concentration', 'mean stress', 'corrosion'].map((f, i) => (
        <g key={f}>
          <Block x={60} y={300 + i * 40} w={250} h={32} label={f} stroke={AMBER} size={12} />
          <Wire d={`M320 ${316 + i * 40} L356 ${316 + i * 40}`} stroke={AMBER} width={2} marker="url(#msmArrA)" className={`msmm-current msmm-delay-${i}`} />
        </g>
      ))}
      <Axes x={420} y={440} w={420} h={130} />
      <Curve pts={[[430, 340], [560, 362], [700, 376], [830, 380]]} stroke={GREEN} width={2.6} />
      {[16, 32, 48].map((dy, i) => (
        <Curve
          key={`sh${dy}`}
          pts={[[430, 340 + dy], [560, 362 + dy], [700, 376 + dy], [830, 380 + dy]]}
          stroke={RED}
          width={2}
          dash="7 5"
          opacity={0.75}
          className={`msmm-pulse msmm-delay-${i}`}
        />
      ))}
      <M x={630} y={326} size={10} fill={RED}>every factor shifts the whole curve downward</M>
      <M x={430} y={462} size={10} fill={MUTED} anchor="start">cycles</M>
    </Scene>
  )
}

export function CreepCurveStagesScene() {
  return (
    <Scene caption="Three stages — and the steady rate in the middle is the one design uses">
      <rect x={80} y={80} width={120} height={270} fill={BLUE} opacity={0.1} />
      <rect x={200} y={80} width={180} height={270} fill={GREEN} opacity={0.12} />
      <rect x={380} y={80} width={110} height={270} fill={ROSE} opacity={0.12} />
      <Axes x={80} y={350} w={430} h={270} xLabel="time at load" yLabel="strain" />
      <Curve
        pts={[[80, 330], [110, 296], [145, 270], [200, 252], [290, 222], [380, 192], [420, 170], [455, 140], [485, 100]]}
        stroke={N}
        width={3.2}
        className="msmm-draw"
      />
      <Wire d="M200 252 L380 192" stroke={AMBER} width={7} opacity={0.35} className="msmm-pulse" />
      <L x={140} y={98} size={10.5} fill={BLUE} weight={700}>primary</L>
      <L x={290} y={98} size={10.5} fill={GREEN} weight={700}>secondary</L>
      <L x={435} y={98} size={10.5} fill={ROSE} weight={700}>tertiary</L>
      <M x={140} y={120} size={9.5} fill={BLUE}>hardening</M>
      <M x={290} y={120} size={9.5} fill={GREEN}>hardening = recovery</M>
      <M x={435} y={120} size={9.5} fill={ROSE}>internal damage</M>
      <Wire d="M250 235 L320 235" stroke={MUTED} width={1.6} dash="4 4" />
      <Wire d="M320 235 L320 212" stroke={MUTED} width={1.6} dash="4 4" />
      <M x={326} y={226} size={10.5} fill={AMBER} anchor="start">steady state rate dε/dt</M>
      <Wire d="M477 92 L493 108" stroke={RED} width={2.6} />
      <Wire d="M493 92 L477 108" stroke={RED} width={2.6} />
      <M x={492} y={130} size={10} fill={RED} anchor="start">rupture</M>

      <Axes x={580} y={350} w={280} h={270} xLabel="time" yLabel="strain" />
      <Curve pts={[[580, 330], [660, 268], [760, 228], [840, 190]]} stroke={TEAL} width={2.6} />
      <Curve pts={[[580, 330], [630, 254], [700, 206], [750, 150]]} stroke={AMBER} width={2.6} />
      <Curve pts={[[580, 330], [610, 240], [650, 176], [680, 110]]} stroke={RED} width={2.6} className="msmm-draw" />
      {[[840, 190], [750, 150], [680, 110]].map(([px, py], i) => (
        <g key={`rx${i}`}>
          <Wire d={`M${n(px) - 8} ${n(py) - 8} L${n(px) + 8} ${n(py) + 8}`} stroke={RED} width={2.2} />
          <Wire d={`M${n(px) + 8} ${n(py) - 8} L${n(px) - 8} ${n(py) + 8}`} stroke={RED} width={2.2} />
        </g>
      ))}
      <M x={768} y={112} size={10} fill={RED} anchor="start">higher T and σ</M>
      <M x={856} y={138} size={10} fill={MUTED} anchor="end">every stage shortens</M>

      <Card
        x={40}
        y={392}
        w={400}
        h={76}
        title="Why the secondary rate is the design number"
        accent={GREEN}
        lines={['it is constant, and it occupies most of the life']}
        linesY={58}
      />
      <Card
        x={460}
        y={392}
        w={400}
        h={76}
        title="When creep matters"
        accent={AMBER}
        lines={['sustained load above roughly 0.4 of T_melt in kelvin']}
        linesY={58}
      />
    </Scene>
  )
}

export function PropertySelectionByDutyScene() {
  const rows = [
    { c: 90, duty: 'single monotonic load', prop: 'yield strength', sub: 'toughness if notched', test: 'tensile test', tone: BLUE },
    { c: 190, duty: 'repeated loading', prop: 'endurance limit', sub: 'from the S-N curve', test: 'fatigue test', tone: AMBER },
    { c: 290, duty: 'sustained, hot', prop: 'steady creep rate', sub: 'and rupture time', test: 'creep test', tone: ROSE },
    { c: 390, duty: 'stiffness limited', prop: 'modulus E', sub: 'no heat treatment changes it', test: 'elastic part of tensile', tone: TEAL },
  ]
  return (
    <Scene caption="Start from the loading history — the duty picks the property, not the material">
      <L x={450} y={42} size={11.5} fill={N}>START FROM THE LOADING HISTORY, NOT FROM THE MATERIAL</L>
      <Block x={40} y={210} w={150} h={64} label="Loading history" sub="what the duty is" stroke={N} />
      {rows.map((r) => (
        <g key={r.duty}>
          <Wire d={`M190 242 L212 242 L212 ${r.c} L232 ${r.c}`} stroke={r.tone} width={2} marker={`url(#${r.tone === BLUE ? 'msmArrB' : r.tone === AMBER ? 'msmArrA' : r.tone === ROSE ? 'msmArrRo' : 'msmArrT'})`} />
          <Block x={232} y={r.c - 26} w={180} h={52} label={r.duty} stroke={r.tone} size={12} />
          <Wire d={`M414 ${r.c} L450 ${r.c}`} stroke={r.tone} width={2} marker={`url(#${r.tone === BLUE ? 'msmArrB' : r.tone === AMBER ? 'msmArrA' : r.tone === ROSE ? 'msmArrRo' : 'msmArrT'})`} className="msmm-current" />
          <Block x={452} y={r.c - 26} w={196} h={52} label={r.prop} sub={r.sub} stroke={r.tone} fill={SKY} />
          <Wire d={`M650 ${r.c} L668 ${r.c}`} stroke={MUTED} width={1.6} />
          <M x={674} y={r.c + 4} size={10.5} fill={MUTED} anchor="start">{r.test}</M>
        </g>
      ))}
      <rect x={40} y={428} width={820} height={48} rx={10} fill={WHITE} stroke={RED} strokeWidth={2.4} />
      <M x={62} y={457} size={10.5} fill={RED} anchor="start" weight={800}>COMMON ERROR</M>
      <M x={172} y={457} size={10.5} fill={N} anchor="start">a tensile result applied to a cyclic duty — the tensile test never examined that duty</M>
      <Wire d="M818 444 L834 460" stroke={RED} width={3} className="msmm-pulse" />
      <Wire d="M834 444 L818 460" stroke={RED} width={3} className="msmm-pulse" />
    </Scene>
  )
}


/* ── Module 4 ────────────────────────────────────────────────────────── */


export function HumeRotheryConditionsScene() {
  const mixed = [BLUE, TEAL, BLUE, TEAL, BLUE, TEAL]
  return (
    <Scene caption="All four met — one phase everywhere; break one and a solubility limit appears">
      <Card x={30} y={38} w={198} h={196} title="1 · atomic radius" accent={BLUE} className="msmm-cell-in msmm-delay-0" foot="Cu–Ni pass · Cu–Pb fail" footTone={MUTED}>
        <M x={99} y={48} size={10} fill={MUTED}>radii within 15 % of each other</M>
        <Atom cx={46} cy={76} r={13} fill={SKY} stroke={BLUE} />
        <Atom cx={80} cy={76} r={12.5} fill={WHITE} stroke={TEAL} />
        <Wire d="M170 76 L176 83 L188 66" stroke={GREEN} width={3} />
        <M x={70} y={102} size={9.5} fill={N}>Cu 1.28 · Ni 1.25 Å</M>
        <Atom cx={46} cy={134} r={13} fill={SKY} stroke={BLUE} />
        <Atom cx={88} cy={134} r={20} fill={WHITE} stroke={ROSE} />
        <Wire d="M170 126 L184 140" stroke={RED} width={3} />
        <Wire d="M184 126 L170 140" stroke={RED} width={3} />
        <M x={70} y={170} size={9.5} fill={N}>Cu 1.28 · Pb 1.75 Å</M>
      </Card>

      <Card x={244} y={38} w={198} h={196} title="2 · crystal structure" accent={BLUE} className="msmm-cell-in msmm-delay-1" foot="both FCC — condition met" footTone={MUTED}>
        <M x={99} y={48} size={10} fill={MUTED}>the same lattice, both sides</M>
        <rect x={26} y={68} width={44} height={44} rx={4} fill={SKY} stroke={BLUE} strokeWidth={2} />
        <rect x={128} y={68} width={44} height={44} rx={4} fill={WHITE} stroke={TEAL} strokeWidth={2} />
        {[[26, 68], [70, 68], [26, 112], [70, 112]].map(([px, py]) => (
          <circle key={`a${px}-${py}`} cx={px} cy={py} r={5} fill={BLUE} />
        ))}
        {[[128, 68], [172, 68], [128, 112], [172, 112]].map(([px, py]) => (
          <circle key={`b${px}-${py}`} cx={px} cy={py} r={5} fill={TEAL} />
        ))}
        <circle cx={48} cy={90} r={5} fill={BLUE} />
        <circle cx={150} cy={90} r={5} fill={TEAL} />
        <Wire d="M92 92 L98 99 L110 82" stroke={GREEN} width={3} />
        <M x={48} y={132} size={9.5} fill={BLUE}>Cu — FCC</M>
        <M x={150} y={132} size={9.5} fill={TEAL}>Ni — FCC</M>
        <M x={99} y={166} size={9.5} fill={ROSE}>a different lattice limits it</M>
      </Card>

      <Card x={458} y={38} w={198} h={196} title="3 · electronegativity" accent={BLUE} className="msmm-cell-in msmm-delay-2" foot="like values — condition met" footTone={MUTED}>
        <M x={99} y={48} size={10} fill={MUTED}>alike, or a compound forms</M>
        <Wire d="M26 86 L164 86" stroke={MUTED} width={2} />
        <Dot cx={62} cy={86} r={6} fill={BLUE} />
        <Dot cx={72} cy={86} r={6} fill={TEAL} />
        <Wire d="M172 78 L178 85 L190 68" stroke={GREEN} width={3} />
        <M x={67} y={110} size={9.5} fill={N}>Cu 1.90 · Ni 1.91</M>
        <Wire d="M26 136 L164 136" stroke={MUTED} width={2} />
        <Dot cx={38} cy={136} r={6} fill={BLUE} />
        <Dot cx={152} cy={136} r={6} fill={ROSE} />
        <Wire d="M172 130 L186 144" stroke={RED} width={3} />
        <Wire d="M186 130 L172 144" stroke={RED} width={3} />
        <M x={90} y={162} size={9.5} fill={ROSE}>a wide gap gives a compound</M>
      </Card>

      <Card x={672} y={38} w={198} h={196} title="4 · valence" accent={BLUE} className="msmm-cell-in msmm-delay-3" foot="higher valence dissolves less" footTone={MUTED}>
        <M x={99} y={48} size={10} fill={MUTED}>equal valence, or solubility falls</M>
        <M x={70} y={90} size={14} fill={N}>Cu²⁺ and Ni²⁺</M>
        <Wire d="M170 82 L176 89 L188 72" stroke={GREEN} width={3} />
        <M x={70} y={110} size={9.5} fill={GREEN}>equal valence</M>
        <M x={70} y={146} size={14} fill={N}>Cu¹⁺ vs Zn²⁺</M>
        <Wire d="M170 138 L184 152" stroke={RED} width={3} />
        <Wire d="M184 138 L170 152" stroke={RED} width={3} />
        <M x={70} y={166} size={9.5} fill={ROSE}>unequal — limited</M>
      </Card>

      <Card x={30} y={250} w={410} h={222} title="all four satisfied" accent={GREEN} className="msmm-cell-in msmm-delay-4" foot="solute goes in everywhere — no second phase" footTone={GREEN}>
        <rect x={30} y={50} width={350} height={30} rx={8} fill={BLUE} opacity={0.22} stroke={BLUE} strokeWidth={2} />
        <L x={205} y={70} size={12} fill={BLUE}>α — one phase at every composition</L>
        <M x={30} y={100} size={10} fill={MUTED} anchor="start">pure Cu</M>
        <M x={380} y={100} size={10} fill={MUTED} anchor="end">pure Ni</M>
        {mixed.map((tone, i) => (
          <g key={`ok${i}`}>
            <Atom cx={70 + i * 50} cy={140} r={13} fill={tone === BLUE ? SKY : WHITE} stroke={tone} />
            <Atom cx={70 + i * 50} cy={186} r={13} fill={tone === BLUE ? WHITE : SKY} stroke={tone === BLUE ? TEAL : BLUE} />
          </g>
        ))}
      </Card>

      <Card x={460} y={250} w={410} h={222} title="one condition violated" accent={RED} className="msmm-cell-in msmm-delay-4" foot="past the limit a second phase precipitates" footTone={RED}>
        <rect x={30} y={50} width={150} height={30} rx={8} fill={GREEN} opacity={0.2} stroke={GREEN} strokeWidth={2} />
        <rect x={180} y={50} width={200} height={30} rx={8} fill={ROSE} opacity={0.18} stroke={ROSE} strokeWidth={2} />
        <L x={105} y={70} size={12} fill={GREEN}>α</L>
        <L x={280} y={70} size={12} fill={ROSE}>α + β</L>
        <Wire d="M180 46 L180 92" stroke={RED} width={2} dash="5 4" />
        <M x={186} y={42} size={10} fill={RED} anchor="start">solubility limit</M>
        <M x={30} y={100} size={10} fill={MUTED} anchor="start">pure Cu</M>
        <M x={380} y={100} size={10} fill={MUTED} anchor="end">pure Ni</M>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={`lim${i}`}>
            <Atom cx={70 + i * 50} cy={140} r={13} fill={SKY} stroke={BLUE} />
            {i < 3 ? (
              <Atom cx={70 + i * 50} cy={186} r={13} fill={SKY} stroke={BLUE} />
            ) : (
              <Atom cx={70 + i * 50} cy={186} r={16} fill={WHITE} stroke={ROSE} className={`msmm-emerge msmm-delay-${i}`} />
            )}
          </g>
        ))}
      </Card>
    </Scene>
  )
}

export function PhaseAndUnaryDiagramScene() {
  return (
    <Scene caption="A phase is uniform in composition and structure; the diagram maps where each is stable">
      <Card x={30} y={40} w={360} h={200} title="one phase = uniform in composition and structure" accent={BLUE}>
        <rect x={48} y={56} width={92} height={96} rx={6} fill={WHITE} stroke={N} strokeWidth={2.5} />
        <rect x={50} y={96} width={88} height={54} fill={SKY} />
        <rect x={58} y={100} width={22} height={16} rx={3} fill={WHITE} stroke={BLUE} strokeWidth={1.6} className="msmm-pulse" />
        <rect x={86} y={104} width={20} height={14} rx={3} fill={WHITE} stroke={BLUE} strokeWidth={1.6} className="msmm-pulse msmm-delay-1" />
        <rect x={108} y={122} width={18} height={15} rx={3} fill={WHITE} stroke={BLUE} strokeWidth={1.6} className="msmm-pulse msmm-delay-2" />
        <M x={94} y={172} size={10.5} fill={N}>ice + water</M>
        <M x={94} y={188} size={10} fill={BLUE}>2 phases, 1 component</M>
        <rect x={228} y={56} width={92} height={96} rx={6} fill={WHITE} stroke={N} strokeWidth={2.5} />
        <rect x={230} y={96} width={88} height={54} fill={TEAL} opacity={0.3} />
        {[[248, 110], [272, 124], [296, 108], [260, 138], [300, 136]].map(([px, py]) => (
          <circle key={`s${px}`} cx={px} cy={py} r={2.6} fill={TEAL} />
        ))}
        <M x={274} y={172} size={10.5} fill={N}>salt in water</M>
        <M x={274} y={188} size={10} fill={TEAL}>1 phase, 2 components</M>
      </Card>

      <Card
        x={30}
        y={256}
        w={360}
        h={210}
        title="counting components"
        accent={PURP}
        foot="ice and water differ in structure, not composition"
        footTone={MUTED}
        linesY={62}
        lineH={26}
        lines={[
          'one component — unary: pressure vs temperature',
          'two components — binary: temperature vs composition',
          'a boundary line: two phases in equilibrium',
          'the triple point: all three at once',
        ]}
      />

      <path d="M440 430 L600 330 L568 70 L440 70 Z" fill={BLUE} opacity={0.12} />
      <path d="M568 70 L600 330 L830 140 L830 70 Z" fill={ROSE} opacity={0.12} />
      <path d="M440 430 L600 330 L830 140 L860 140 L860 438 L440 438 Z" fill={AMBER} opacity={0.1} />
      <Axes x={440} y={440} w={420} h={380} yLabel="pressure P" />
      <Curve pts={[[440, 432], [500, 392], [550, 358], [600, 330]]} stroke={MUTED} width={2.6} className="msmm-draw" />
      <Curve pts={[[600, 330], [588, 240], [576, 150], [568, 70]]} stroke={N} width={2.6} className="msmm-draw msmm-delay-1" />
      <Curve pts={[[600, 330], [680, 268], [760, 204], [830, 140]]} stroke={N} width={2.6} className="msmm-draw msmm-delay-2" />
      <L x={490} y={180} size={13} fill={BLUE}>SOLID</L>
      <L x={700} y={150} size={13} fill={ROSE}>LIQUID</L>
      <L x={700} y={380} size={13} fill={AMBER}>VAPOUR</L>
      <Dot cx={600} cy={330} r={6} fill={RED} className="msmm-pulse" />
      <M x={612} y={318} size={10} fill={RED} anchor="start">triple point — 3 phases coexist</M>
      <Dot cx={830} cy={140} r={5} fill={MUTED} />
      <M x={824} y={128} size={10} fill={MUTED} anchor="end">critical point</M>
      <Wire d="M520 200 L650 200" stroke={MUTED} width={1.6} dash="5 5" />
      <Dot cx={530} cy={200} r={6} fill={AMBER} className="msmm-probe" />
      <M x={450} y={120} size={10} fill={AMBER} anchor="start">isobaric heating</M>
      <M x={450} y={470} size={10.5} fill={MUTED} anchor="start">a point crossing a boundary changes phase</M>
    </Scene>
  )
}

export function CuNiIsomorphousDiagramScene() {
  const liquidus = [[120, 370], [250, 318], [390, 262], [530, 206], [660, 154], [780, 112]]
  const solidus = [[120, 370], [250, 352], [390, 326], [530, 286], [660, 218], [780, 112]]
  const lens = `M${liquidus.map(([px, py]) => `${px} ${py}`).join(' L')} L${[...solidus].reverse().map(([px, py]) => `${px} ${py}`).join(' L')} Z`
  return (
    <Scene caption="One solid phase at every composition — and alloys melt over a range, not at a point">
      <L x={450} y={52} size={12} fill={MUTED} weight={700}>
        complete solubility in liquid and solid — copper and nickel
      </L>
      <path d="M120 370 L250 318 L390 262 L530 206 L660 154 L780 112 L780 80 L120 80 Z" fill={ROSE} opacity={0.1} />
      <path d="M120 370 L250 352 L390 326 L530 286 L660 218 L780 112 L780 430 L120 430 Z" fill={BLUE} opacity={0.1} />
      <path d={lens} fill={AMBER} opacity={0.18} className="msmm-emerge" />
      <Axes x={120} y={430} w={660} h={350} yLabel="temperature (°C)" tickLabels={[[120, '0'], [780, '100']]} />
      <Curve pts={liquidus} stroke={ROSE} width={3} className="msmm-draw" />
      <Curve pts={solidus} stroke={BLUE} width={3} className="msmm-draw msmm-delay-1" />
      <L x={300} y={180} size={14} fill={ROSE}>L — liquid</L>
      <L x={330} y={400} size={14} fill={BLUE}>α — solid solution</L>
      <L x={400} y={288} size={12} fill={AMBER}>L + α</L>
      <M x={600} y={200} size={11} fill={ROSE} anchor="start">liquidus</M>
      <M x={610} y={272} size={11} fill={BLUE} anchor="start">solidus</M>
      <Dot cx={120} cy={370} r={6} fill={N} />
      <Dot cx={780} cy={112} r={6} fill={N} />
      <M x={132} y={366} size={10.5} fill={N} anchor="start">Cu melts at 1085 °C — one point</M>
      <M x={774} y={106} size={10.5} fill={N} anchor="end">Ni melts at 1455 °C — one point</M>
      <Wire d="M470 100 L470 430" stroke={AMBER} width={2} dash="6 5" />
      <Dot cx={470} cy={230} r={5} fill={ROSE} />
      <Dot cx={470} cy={303} r={5} fill={BLUE} />
      <Wire d="M505 230 L505 303" stroke={AMBER} width={2.2} className="msmm-pulse" />
      <Wire d="M501 234 L505 228 L509 234" stroke={AMBER} width={2.2} />
      <Wire d="M501 299 L505 305 L509 299" stroke={AMBER} width={2.2} />
      <M x={512} y={270} size={10.5} fill={AMBER} anchor="start">melting range</M>
      <M x={470} y={452} size={10.5} fill={AMBER}>53 % Ni</M>
      <M x={450} y={478} size={10.5} fill={MUTED}>composition (wt % Ni)</M>
    </Scene>
  )
}

export function TieLineAndLeverRuleScene() {
  const liquidus = [[110, 140], [250, 180], [368, 230], [460, 272], [540, 315]]
  const solidus = [[110, 140], [196, 250], [300, 292], [430, 320], [540, 315]]
  return (
    <Scene caption="Tie line for compositions, lever rule for amounts — always the opposite arm">
      <path d={`M${liquidus.map(([px, py]) => `${px} ${py}`).join(' L')} L${[...solidus].reverse().map(([px, py]) => `${px} ${py}`).join(' L')} Z`} fill={AMBER} opacity={0.16} />
      <Axes x={110} y={380} w={430} h={300} yLabel="temperature" />
      <Curve pts={liquidus} stroke={ROSE} width={2.8} />
      <Curve pts={solidus} stroke={BLUE} width={2.8} />
      <L x={430} y={170} size={13} fill={ROSE}>liquid</L>
      <L x={180} y={330} size={13} fill={BLUE}>α solid</L>
      <L x={400} y={290} size={11.5} fill={AMBER}>α + L</L>
      <Wire d="M196 250 L368 250" stroke={N} width={2.6} />
      <Wire d="M196 250 L260 250" stroke={ROSE} width={8} opacity={0.45} className="msmm-pulse" />
      <Wire d="M260 250 L368 250" stroke={BLUE} width={8} opacity={0.45} className="msmm-pulse msmm-delay-1" />
      <Dot cx={196} cy={250} r={5} fill={BLUE} />
      <Dot cx={368} cy={250} r={5} fill={ROSE} />
      <Dot cx={260} cy={250} r={6} fill={RED} />
      <Wire d="M196 250 L196 380" stroke={MUTED} width={1.6} dash="5 4" />
      <Wire d="M368 250 L368 380" stroke={MUTED} width={1.6} dash="5 4" />
      <Wire d="M260 250 L260 380" stroke={RED} width={1.6} dash="5 4" />
      <M x={228} y={238} size={10.5} fill={ROSE}>b = 15</M>
      <M x={314} y={272} size={10.5} fill={BLUE}>a = 25</M>
      <M x={196} y={398} size={10.5} fill={BLUE}>Cα 20 %</M>
      <M x={260} y={398} size={10.5} fill={RED}>C₀ 35 %</M>
      <M x={368} y={398} size={10.5} fill={ROSE}>C_L 60 %</M>
      <M x={325} y={424} size={10.5} fill={MUTED}>composition (wt % B)</M>

      <Panel
        x={580}
        y={44}
        w={300}
        title="tie line — the compositions"
        accent={BLUE}
        rowH={26}
        rows={[['α composition Cα', '20 %', BLUE], ['liquid composition C_L', '60 %', ROSE], ['overall C₀', '35 %', RED]]}
      />
      <L x={730} y={172} size={11} fill={MUTED} weight={700}>the arm is always the opposite one</L>
      <Wire d="M600 232 L860 232" stroke={MUTED} width={2} />
      <Wire d="M600 232 L698 232" stroke={ROSE} width={8} opacity={0.5} />
      <Wire d="M698 232 L860 232" stroke={BLUE} width={8} opacity={0.5} />
      <Dot cx={698} cy={232} r={6} fill={RED} />
      <Wire d="M649 222 L760 200" stroke={ROSE} width={2} marker="url(#msmArrRo)" className="msmm-current" />
      <Wire d="M779 222 L690 200" stroke={BLUE} width={2} marker="url(#msmArrB)" className="msmm-current msmm-delay-1" />
      <M x={800} y={192} size={11.5} fill={ROSE} weight={800}>W_L = 0.375</M>
      <M x={648} y={192} size={11.5} fill={BLUE} weight={800}>W_α = 0.625</M>
      <M x={649} y={252} size={10} fill={ROSE}>arm b = 15</M>
      <M x={779} y={252} size={10} fill={BLUE}>arm a = 25</M>
      <M x={698} y={272} size={10} fill={RED}>C₀</M>
      <Panel
        x={580}
        y={300}
        w={300}
        title="mass balance check"
        accent={GREEN}
        rowH={30}
        rows={[['W_α + W_L', '0.625 + 0.375 = 1', GREEN], ['W_α·Cα + W_L·C_L', '0.625(20) + 0.375(60)', N], ['', '= 12.5 + 22.5 = 35 = C₀', GREEN]]}
      />
    </Scene>
  )
}

export function CoringFormationScene() {
  const rings = [66, 54, 42, 30, 18]
  return (
    <Scene caption="Real cooling outruns solid diffusion — grains end up layered, and annealing flattens them">
      <L x={150} y={58} size={12.5} fill={ROSE}>non-equilibrium cooling</L>
      {rings.map((r, i) => (
        <circle
          key={`ring${r}`}
          cx={150}
          cy={150}
          r={r}
          fill={BLUE}
          opacity={0.14 + i * 0.13}
          stroke={BLUE}
          strokeWidth={1.4}
          className={`msmm-emerge msmm-delay-${4 - i}`}
        />
      ))}
      <M x={150} y={232} size={10.5} fill={BLUE}>core formed first — Ni rich</M>
      <M x={150} y={250} size={10.5} fill={ROSE}>rim formed last — Cu rich</M>

      <L x={390} y={58} size={12.5} fill={GREEN}>equilibrium cooling</L>
      <circle cx={390} cy={150} r={66} fill={BLUE} opacity={0.4} stroke={BLUE} strokeWidth={1.8} />
      <M x={390} y={232} size={10.5} fill={GREEN}>one colour throughout</M>
      <M x={390} y={250} size={10.5} fill={MUTED}>diffusion keeps pace</M>

      <Axes x={560} y={250} w={300} h={180} xLabel="position across grain" yLabel="wt % Ni" />
      <Curve pts={[[560, 210], [610, 170], [660, 110], [710, 90], [760, 110], [810, 170], [860, 210]]} stroke={ROSE} width={2.8} className="msmm-draw" />
      <Dot cx={710} cy={90} r={5} fill={ROSE} />
      <M x={720} y={76} size={10.5} fill={ROSE} anchor="start">cored — centre rich</M>
      <Wire d="M600 150 L820 150" stroke={GREEN} width={2.4} dash="7 5" />
      <M x={710} y={170} size={10.5} fill={GREEN}>flat after anneal</M>

      <Card x={40} y={300} w={480} h={176} title="homogenisation anneal" accent={GREEN} foot="diffusion of Module 2, run on purpose" footTone={MUTED}>
        {[40, 30, 20].map((r, i) => (
          <circle key={`c${r}`} cx={70} cy={100} r={r} fill={BLUE} opacity={0.18 + i * 0.18} stroke={BLUE} strokeWidth={1.2} />
        ))}
        <M x={70} y={158} size={10} fill={MUTED}>cored</M>
        <M x={240} y={72} size={10.5} fill={N}>diffusion evens the layers</M>
        <Wire d="M120 100 L360 100" stroke={GREEN} width={2.4} marker="url(#msmArrG)" className="msmm-current-slow" />
        <M x={240} y={136} size={10.5} fill={GREEN}>hold just below the solidus</M>
        <circle cx={410} cy={100} r={40} fill={BLUE} opacity={0.4} stroke={BLUE} strokeWidth={1.6} className="msmm-pulse" />
        <M x={410} y={158} size={10} fill={MUTED}>homogeneous</M>
      </Card>
    </Scene>
  )
}

export function IsomorphousPropertyCurvesScene() {
  const insets = [
    { y: 70, title: '95 % Cu — few foreign atoms', note: 'strain field density: low', foreign: [2] },
    { y: 200, title: '50 Cu – 50 Ni — crowded', note: 'strain field density: highest', foreign: [0, 1, 2, 3, 4] },
    { y: 330, title: '95 % Ni — few foreign atoms', note: 'strain field density: low', foreign: [3] },
  ]
  return (
    <Scene caption="Strength peaks and ductility bottoms where lattice strain is greatest — the middle">
      <Axes x={120} y={230} w={420} h={170} yLabel="tensile strength" />
      <Curve pts={[[120, 190], [540, 160]]} stroke={MUTED} width={2} dash="8 6" />
      <Curve pts={[[120, 190], [180, 150], [250, 112], [330, 90], [410, 104], [480, 130], [540, 160]]} stroke={ROSE} width={3} className="msmm-draw" />
      <Dot cx={330} cy={90} r={5} fill={ROSE} />
      <M x={338} y={78} size={10.5} fill={ROSE} anchor="start">strength maximum</M>
      <M x={470} y={150} size={10} fill={MUTED} anchor="end">straight line between the pure values</M>

      <Axes x={120} y={420} w={420} h={140} yLabel="ductility (% EL)" tickLabels={[[120, '100 Cu'], [330, '50–50'], [540, '100 Ni']]} />
      <Curve pts={[[120, 300], [180, 338], [250, 372], [330, 390], [410, 380], [480, 352], [540, 320]]} stroke={BLUE} width={3} className="msmm-draw msmm-delay-1" />
      <Dot cx={330} cy={390} r={5} fill={BLUE} />
      <M x={176} y={296} size={10.5} fill={BLUE} anchor="start">ductility falls to a minimum</M>
      <Wire d="M330 90 L330 390" stroke={AMBER} width={1.8} dash="6 5" className="msmm-pulse" />
      <M x={336} y={262} size={10.5} fill={AMBER} anchor="start">same composition</M>
      <M x={330} y={466} size={10.5} fill={MUTED}>composition (wt % Ni)</M>

      {insets.map((ins) => (
        <g key={ins.title}>
          <rect x={600} y={ins.y} width={250} height={110} rx={10} fill={WHITE} stroke={MUTED} strokeWidth={1.8} />
          {[0, 1, 2, 3, 4].map((c) => (
            <g key={`${ins.y}-${c}`}>
              <Atom cx={630 + c * 48} cy={ins.y + 42} r={11} fill={SKY} stroke={BLUE} />
              <Atom
                cx={630 + c * 48}
                cy={ins.y + 72}
                r={ins.foreign.includes(c) ? 14 : 11}
                fill={ins.foreign.includes(c) ? WHITE : SKY}
                stroke={ins.foreign.includes(c) ? TEAL : BLUE}
                className={ins.foreign.includes(c) ? `msmm-flux msmm-delay-${c}` : ''}
              />
            </g>
          ))}
          <M x={725} y={ins.y + 16} size={10} fill={N}>{ins.title}</M>
          <M x={725} y={ins.y + 100} size={9.5} fill={ins.foreign.length ? AMBER : MUTED}>{ins.note}</M>
        </g>
      ))}
    </Scene>
  )
}

export function PbSnEutecticDiagramScene() {
  return (
    <Scene caption="Limited solubility gives two solid phases — and liquid survives lowest at the eutectic">
      <path d="M110 93 L200 140 L300 180 L400 214 L494 242 L570 230 L650 212 L730 191 L730 70 L110 70 Z" fill={ROSE} opacity={0.1} />
      <path d="M110 93 L223 242 L110 430 Z" fill={BLUE} opacity={0.16} />
      <path d="M730 191 L716 242 L730 430 Z" fill={TEAL} opacity={0.16} />
      <path d="M223 242 L716 242 L730 430 L110 430 Z" fill={PURP} opacity={0.1} />
      <Axes
        x={110}
        y={430}
        w={620}
        h={360}
        yLabel="temperature (°C)"
        tickLabels={[[110, '0'], [223, '18.3'], [494, '61.9'], [716, '97.8']]}
      />
      <Curve pts={[[110, 93], [200, 140], [300, 180], [400, 214], [494, 242]]} stroke={ROSE} width={3} className="msmm-draw" />
      <Curve pts={[[730, 191], [650, 212], [570, 230], [494, 242]]} stroke={ROSE} width={3} className="msmm-draw msmm-delay-1" />
      <Curve pts={[[110, 93], [170, 170], [205, 215], [223, 242]]} stroke={BLUE} width={2.6} />
      <Curve pts={[[223, 242], [190, 320], [160, 380], [110, 430]]} stroke={BLUE} width={2.6} dash="7 5" />
      <Curve pts={[[730, 191], [722, 220], [716, 242]]} stroke={TEAL} width={2.6} />
      <Curve pts={[[716, 242], [722, 330], [730, 430]]} stroke={TEAL} width={2.6} dash="7 5" />
      <Wire d="M223 242 L716 242" stroke={RED} width={3.2} className="msmm-pulse" />
      <Dot cx={494} cy={242} r={7} fill={RED} className="msmm-pulse" />
      <Wire d="M494 188 L494 234" stroke={RED} width={1.6} dash="4 4" />
      <M x={494} y={180} size={10.5} fill={RED}>eutectic point — 61.9 % Sn, 183 °C</M>
      <L x={400} y={120} size={13} fill={ROSE}>L — liquid</L>
      <L x={270} y={200} size={11.5} fill={N}>α + L</L>
      <L x={680} y={216} size={11.5} fill={N}>β + L</L>
      <L x={450} y={340} size={12.5} fill={PURP}>α + β</L>
      <L x={145} y={340} size={12.5} fill={BLUE}>α</L>
      <Wire d="M752 326 L726 326" stroke={TEAL} width={1.6} marker="url(#msmArrT)" />
      <L x={758} y={330} size={12.5} fill={TEAL} anchor="start">β</L>
      <Wire d="M252 300 L190 300" stroke={MUTED} width={1.6} marker="url(#msmArrM)" />
      <M x={256} y={304} size={10.5} fill={MUTED} anchor="start">solvus: solubility limit</M>
      <M x={740} y={246} size={10.5} fill={RED} anchor="start">eutectic isotherm</M>
      <M x={450} y={472} size={11} fill={N}>L (61.9 % Sn) ⇌ α (18.3 %) + β (97.8 %) at 183 °C</M>
    </Scene>
  )
}

export function EutecticMicrostructuresScene() {
  const lamellae = (tone, x0, y0, w, h, key) =>
    Array.from({ length: Math.floor(n(w) / 16) }, (_, i) => (
      <rect key={`${key}${i}`} x={n(x0) + i * 16} y={n(y0)} width={7} height={n(h)} fill={i % 2 ? tone : BLUE} opacity={0.75} />
    ))
  return (
    <Scene caption="Primary phase first, then the leftover liquid goes eutectic at 183 °C">
      <path d="M70 92 L150 140 L220 190 L274 227 L340 205 L400 181 L400 70 L70 70 Z" fill={ROSE} opacity={0.1} />
      <Axes x={70} y={400} w={330} h={330} yLabel="T (°C)" tickLabels={[[70, 'Pb'], [274, '61.9'], [400, 'Sn']]} />
      <Curve pts={[[70, 92], [150, 140], [220, 190], [274, 227]]} stroke={ROSE} width={2.6} />
      <Curve pts={[[400, 181], [340, 205], [274, 227]]} stroke={ROSE} width={2.6} />
      <Curve pts={[[70, 92], [110, 165], [130, 227]]} stroke={BLUE} width={2.2} />
      <Curve pts={[[130, 227], [105, 320], [92, 400]]} stroke={BLUE} width={2.2} dash="6 4" />
      <Curve pts={[[400, 181], [393, 227], [398, 400]]} stroke={TEAL} width={2.2} dash="6 4" />
      <Wire d="M130 227 L393 227" stroke={RED} width={3} />
      <L x={240} y={132} size={12} fill={ROSE}>L</L>
      <L x={88} y={300} size={11.5} fill={BLUE}>α</L>
      <L x={250} y={330} size={11.5} fill={PURP}>α + β</L>
      <L x={157} y={182} size={10.5} fill={N}>α + L</L>
      <L x={368} y={208} size={10.5} fill={N}>β + L</L>
      {[[200, BLUE, '2'], [274, AMBER, '1'], [330, ROSE, '3']].map(([px, tone, label]) => (
        <g key={String(label)}>
          <Wire d={`M${px} 118 L${px} 258`} stroke={tone} width={2} dash="6 5" marker={`url(#${tone === BLUE ? 'msmArrB' : tone === AMBER ? 'msmArrA' : 'msmArrRo'})`} className="msmm-current-slow" />
          <circle cx={px} cy={104} r={10} fill={tone} />
          <L x={px} y={109} size={12} fill={WHITE}>{label}</L>
        </g>
      ))}
      <Wire d="M200 176 L268 222" stroke={BLUE} width={2.2} marker="url(#msmArrB)" className="msmm-current" />
      <Wire d="M330 208 L280 224" stroke={ROSE} width={2.2} marker="url(#msmArrRo)" className="msmm-current" />
      <M x={70} y={444} size={10.5} fill={MUTED} anchor="start">the leftover liquid slides down the liquidus to 61.9 % Sn</M>

      <Card x={440} y={54} w={430} h={126} title="1 · eutectic 61.9 % Sn — all lamellar" accent={AMBER} foot="fine alternating α and β plates, nothing primary" footTone={MUTED}>
        {lamellae(ROSE, 20, 44, 390, 52, 'eu')}
      </Card>
      <Card x={440} y={192} w={430} h={126} title="2 · hypoeutectic — primary α first" accent={BLUE} foot="primary α grains, eutectic lamellae between them" footTone={MUTED}>
        {lamellae(ROSE, 20, 44, 390, 52, 'hypo')}
        {[[80, 70], [190, 66], [300, 74], [380, 68]].map(([px, py]) => (
          <circle key={`pa${px}`} cx={px} cy={py} r={22} fill={SKY} stroke={BLUE} strokeWidth={2.4} className="msmm-emerge" />
        ))}
      </Card>
      <Card x={440} y={330} w={430} h={126} title="3 · hypereutectic — primary β first" accent={ROSE} foot="primary β grains, eutectic lamellae between them" footTone={MUTED}>
        {lamellae(ROSE, 20, 44, 390, 52, 'hyper')}
        {[[90, 72], [200, 68], [310, 72], [390, 66]].map(([px, py]) => (
          <circle key={`pb${px}`} cx={px} cy={py} r={22} fill={WHITE} stroke={ROSE} strokeWidth={2.4} className="msmm-emerge" />
        ))}
      </Card>
    </Scene>
  )
}

export function FeFe3CDiagramScene() {
  return (
    <Scene caption="Allotropic iron, austenite holding the carbon, and the eutectoid that makes pearlite">
      <path d="M90 78 L150 100 L250 135 L350 165 L449 189 L530 180 L650 166 L650 60 L90 60 Z" fill={ROSE} opacity={0.1} />
      <path d="M140 91 L269 189 L154 307 L92 255 L92 119 Z" fill={AMBER} opacity={0.16} />
      <path d="M154 307 L269 189 L650 189 L650 307 Z" fill={TEAL} opacity={0.12} />
      <path d="M97 307 L650 307 L650 400 L91 400 Z" fill={BLUE} opacity={0.12} />
      <Axes
        x={90}
        y={400}
        w={560}
        h={340}
        yLabel="T (°C)"
        tickLabels={[[90, '0'], [154, '0.76'], [269, '2.14'], [449, '4.3'], [650, '6.7']]}
        yTicks={[[307, '727'], [189, '1147']]}
      />
      <Curve pts={[[90, 78], [150, 100], [250, 135], [350, 165], [449, 189]]} stroke={ROSE} width={2.8} className="msmm-draw" />
      <Curve pts={[[449, 189], [530, 180], [650, 166]]} stroke={ROSE} width={2.8} className="msmm-draw msmm-delay-1" />
      <Curve pts={[[140, 91], [180, 120], [230, 160], [269, 189]]} stroke={MUTED} width={2.4} />
      <Curve pts={[[92, 255], [110, 272], [130, 290], [154, 307]]} stroke={BLUE} width={2.6} />
      <Curve pts={[[154, 307], [190, 268], [230, 224], [269, 189]]} stroke={TEAL} width={2.6} />
      <Curve pts={[[92, 255], [97, 307], [91, 400]]} stroke={BLUE} width={2.2} dash="6 4" />
      <Wire d="M650 166 L650 400" stroke={PURP} width={3} />
      <Wire d="M90 91 L140 91" stroke={MUTED} width={2.6} />
      <Wire d="M269 189 L650 189" stroke={BLUE} width={2.6} />
      <Wire d="M92 307 L650 307" stroke={AMBER} width={3.4} className="msmm-pulse" />
      <L x={200} y={100} size={12} fill={ROSE}>L</L>
      <L x={106} y={104} size={11} fill={MUTED}>δ</L>
      <L x={195} y={200} size={12.5} fill={AMBER}>γ (austenite)</L>
      <L x={400} y={250} size={11.5} fill={TEAL}>γ + Fe₃C</L>
      <L x={350} y={350} size={11.5} fill={BLUE}>α + Fe₃C</L>
      <Wire d="M74 352 L92 340" stroke={BLUE} width={1.6} marker="url(#msmArrB)" />
      <M x={70} y={356} size={10.5} fill={BLUE} anchor="end">α ferrite</M>
      <M x={330} y={130} size={10} fill={MUTED} anchor="start">L + γ</M>
      <Wire d="M336 136 L348 174" stroke={MUTED} width={1.4} />
      <M x={525} y={150} size={10} fill={MUTED} anchor="start">L + Fe₃C</M>
      <Wire d="M545 156 L556 178" stroke={MUTED} width={1.4} />
      <M x={654} y={152} size={10} fill={PURP} anchor="start">Fe₃C</M>
      {[[140, 91, '1', MUTED], [449, 189, '2', BLUE], [154, 307, '3', AMBER]].map(([px, py, label, tone]) => (
        <g key={String(label)}>
          <circle cx={px} cy={py} r={10} fill={tone} />
          <L x={px} y={n(py) + 5} size={12} fill={WHITE}>{label}</L>
        </g>
      ))}
      <M x={370} y={444} size={10.5} fill={MUTED}>carbon content, wt %</M>

      <Card x={666} y={62} w={216} h={74} title="1 · peritectic 1493 °C" accent={MUTED} lines={['L + δ → γ']} linesY={58} />
      <Card x={666} y={150} w={216} h={74} title="2 · eutectic 1147 °C, 4.3 % C" accent={BLUE} lines={['L → γ + Fe₃C']} linesY={58} />
      <Card x={666} y={238} w={216} h={96} title="3 · eutectoid 727 °C, 0.76 % C" accent={AMBER} lines={['γ → α + Fe₃C, i.e. pearlite']} linesY={56} foot="the one every steel turns on" footTone={AMBER} />
      <Card x={666} y={348} w={216} h={124} title="where the carbon fits" accent={PURP}>
        {[[44, 62], [76, 62], [44, 94], [76, 94]].map(([px, py]) => (
          <Atom key={`bcc${px}-${py}`} cx={px} cy={py} r={13} fill={SKY} stroke={BLUE} />
        ))}
        <Dot cx={60} cy={78} r={4} fill={RED} />
        <M x={60} y={114} size={9.5} fill={BLUE}>BCC α — 0.022 %</M>
        {[[140, 62], [172, 62], [140, 94], [172, 94]].map(([px, py]) => (
          <Atom key={`fcc${px}-${py}`} cx={px} cy={py} r={13} fill={WHITE} stroke={TEAL} />
        ))}
        <Dot cx={156} cy={78} r={8} fill={RED} />
        <M x={156} y={114} size={9.5} fill={TEAL}>FCC γ — 2.14 %</M>
      </Card>
    </Scene>
  )
}

export function SteelMicrostructureDevelopmentScene() {
  const plates = (x0, y0, w, h, tone, key, step) =>
    Array.from({ length: Math.floor(n(w) / n(step)) }, (_, i) => (
      <rect key={`${key}${i}`} x={n(x0) + i * n(step)} y={n(y0)} width={n(step) / 2} height={n(h)} fill={i % 2 ? tone : BLUE} opacity={0.7} />
    ))
  return (
    <Scene caption="Proeutectoid phase first, then the rest becomes pearlite at 727 °C">
      <path d="M60 173 L110 215 L165 275 L221 325 L280 280 L340 230 L400 180 L400 100 L60 100 Z" fill={AMBER} opacity={0.14} />
      <path d="M60 325 L400 325 L400 430 L60 430 Z" fill={BLUE} opacity={0.1} />
      <Axes x={60} y={430} w={340} h={330} yLabel="T (°C)" tickLabels={[[60, '0'], [221, '0.76'], [400, '1.6']]} yTicks={[[325, '727 °C']]} />
      <Curve pts={[[60, 173], [110, 215], [165, 275], [221, 325]]} stroke={BLUE} width={2.6} />
      <Curve pts={[[221, 325], [280, 280], [340, 230], [400, 180]]} stroke={PURP} width={2.6} />
      <Wire d="M60 325 L400 325" stroke={AMBER} width={3.4} className="msmm-pulse" />
      <L x={250} y={230} size={12.5} fill={AMBER}>γ austenite</L>
      <L x={130} y={290} size={11} fill={N}>α + γ</L>
      <L x={230} y={390} size={11.5} fill={BLUE}>α + Fe₃C</L>
      <M x={330} y={300} size={10} fill={PURP}>γ + Fe₃C</M>
      {[[150, BLUE, '2'], [221, AMBER, '1'], [300, ROSE, '3']].map(([px, tone, label]) => (
        <g key={String(label)}>
          <Wire d={`M${px} 150 L${px} 350`} stroke={tone} width={2} dash="6 5" marker={`url(#${tone === BLUE ? 'msmArrB' : tone === AMBER ? 'msmArrA' : 'msmArrRo'})`} className="msmm-current-slow" />
          <circle cx={px} cy={136} r={10} fill={tone} />
          <L x={px} y={141} size={12} fill={WHITE}>{label}</L>
        </g>
      ))}
      <Wire d="M152 262 L215 320" stroke={BLUE} width={2.2} marker="url(#msmArrB)" className="msmm-current" />
      <Wire d="M298 262 L228 318" stroke={ROSE} width={2.2} marker="url(#msmArrRo)" className="msmm-current" />
      <M x={230} y={476} size={10.5} fill={MUTED}>carbon content, wt %</M>

      <Card x={420} y={54} w={460} h={132} title="1 · eutectoid 0.76 % C — all pearlite" accent={AMBER} foot="alternating ferrite and cementite plates" footTone={MUTED}>
        {plates(24, 46, 412, 58, PURP, 'eut', 14)}
      </Card>
      <Card x={420} y={196} w={460} h={132} title="2 · hypoeutectoid — proeutectoid ferrite" accent={BLUE} foot="ferrite films at the prior austenite boundaries" footTone={MUTED}>
        {[30, 170, 310].map((gx) => (
          <g key={`hypo${gx}`}>
            {plates(gx + 8, 48, 104, 52, PURP, `p${gx}`, 12)}
            <rect x={gx} y={42} width={120} height={64} rx={10} fill="none" stroke={BLUE} strokeWidth={7} className="msmm-emerge" />
          </g>
        ))}
      </Card>
      <Card x={420} y={338} w={460} h={132} title="3 · hypereutectoid — proeutectoid cementite" accent={ROSE} foot="a brittle cementite network — a ready crack path" footTone={RED}>
        {[30, 170, 310].map((gx) => (
          <g key={`hyper${gx}`}>
            {plates(gx + 8, 48, 104, 52, PURP, `q${gx}`, 12)}
            <rect x={gx} y={42} width={120} height={64} rx={10} fill="none" stroke={ROSE} strokeWidth={7} className="msmm-emerge" />
          </g>
        ))}
      </Card>
    </Scene>
  )
}

export function TwoLeverApplicationsScene() {
  return (
    <Scene caption="Phases need the lever just below 727 °C; microconstituents need it just above">
      <path d="M85 190 L140 232 L195 265 L243 282 L300 238 L345 205 L380 205 L380 120 L85 120 Z" fill={AMBER} opacity={0.14} />
      <path d="M85 282 L380 282 L380 400 L85 400 Z" fill={BLUE} opacity={0.1} />
      <Axes x={80} y={400} w={300} h={280} yLabel="T (°C)" tickLabels={[[85, '0'], [243, '0.76'], [380, '6.7']]} />
      <Curve pts={[[85, 190], [140, 232], [195, 265], [243, 282]]} stroke={BLUE} width={2.6} />
      <Curve pts={[[243, 282], [300, 238], [345, 205]]} stroke={PURP} width={2.6} />
      <Wire d="M85 282 L380 282" stroke={AMBER} width={3.2} />
      <rect x={344} y={388} width={18} height={24} fill={CREAM} />
      <Wire d="M340 390 L350 410" stroke={N} width={2} />
      <Wire d="M350 390 L360 410" stroke={N} width={2} />
      <M x={386} y={278} size={10.5} fill={AMBER} anchor="start">727 °C</M>
      <L x={250} y={180} size={12} fill={AMBER}>γ (austenite)</L>
      <L x={120} y={258} size={11} fill={N}>α + γ</L>
      <L x={250} y={330} size={11.5} fill={BLUE}>α + Fe₃C</L>
      <Wire d="M166 190 L166 360" stroke={RED} width={2} dash="6 5" />
      <M x={166} y={368} size={10.5} fill={RED}>C₀ = 0.4 %</M>
      <Wire d="M85 277 L243 277" stroke={GREEN} width={2.6} />
      <Wire d="M85 290 L380 290" stroke={PURP} width={2.6} />
      {[[85, 277], [166, 277], [243, 277]].map(([px, py]) => (
        <Dot key={`u${px}`} cx={px} cy={py} r={4} fill={GREEN} />
      ))}
      {[[85, 290], [166, 290], [380, 290]].map(([px, py]) => (
        <Dot key={`l${px}`} cx={px} cy={py} r={4} fill={PURP} />
      ))}
      <circle cx={66} cy={272} r={9} fill={GREEN} />
      <L x={66} y={277} size={11} fill={WHITE}>1</L>
      <circle cx={66} cy={296} r={9} fill={PURP} />
      <L x={66} y={301} size={11} fill={WHITE}>2</L>
      <M x={230} y={448} size={10.5} fill={MUTED}>carbon content, wt %</M>

      <Panel
        x={450}
        y={54}
        w={430}
        title="1 · just ABOVE 727 °C — microconstituents"
        accent={GREEN}
        rowH={28}
        rows={[
          ['tie line spans', '0.022 → 0.76 % C'],
          ['proeutectoid α', '(0.76−0.40)/0.738 = 48.8 %', GREEN],
          ['pearlite', '(0.40−0.022)/0.738 = 51.2 %', GREEN],
        ]}
      />
      <Panel
        x={450}
        y={196}
        w={430}
        title="2 · just BELOW 727 °C — phases"
        accent={PURP}
        rowH={28}
        rows={[
          ['tie line spans', '0.022 → 6.70 % C'],
          ['total ferrite α', '(6.70−0.40)/6.678 = 94.3 %', PURP],
          ['total cementite', '(0.40−0.022)/6.678 = 5.7 %', PURP],
        ]}
      />
      <Card
        x={450}
        y={338}
        w={430}
        h={130}
        title="why the two answers differ"
        accent={RED}
        linesY={58}
        lineH={24}
        lines={[
          '48.8 % proeutectoid α is only the ferrite formed above 727 °C',
          '94.3 % total α also counts the ferrite inside the pearlite',
          'microconstituent is not phase — pick the temperature first',
        ]}
      />
    </Scene>
  )
}

export function SteelAndIronClassificationScene() {
  const zones = [
    { x: 75, w: 60, tone: BLUE, name: 'low carbon', value: 'below 0.25 %' },
    { x: 135, w: 105, tone: TEAL, name: 'medium', value: '0.25–0.6 %' },
    { x: 240, w: 240, tone: AMBER, name: 'high carbon', value: '0.6–1.4 %' },
    { x: 520, w: 320, tone: ROSE, name: 'cast irons', value: '2–4 %' },
  ]
  return (
    <Scene caption="Carbon content classifies steel; graphite shape classifies cast iron">
      <M x={265} y={38} size={11} fill={AMBER}>strength rises · ductility and weldability fall</M>
      <Wire d="M60 50 L470 50" stroke={AMBER} width={2.2} marker="url(#msmArrA)" className="msmm-current" />
      {zones.map((z) => (
        <g key={z.name}>
          <rect x={z.x} y={76} width={z.w} height={24} rx={5} fill={z.tone} opacity={0.3} stroke={z.tone} strokeWidth={2} />
          <M x={z.x + z.w / 2} y={118} size={10.5} fill={z.tone} weight={800}>{z.name}</M>
          <M x={z.x + z.w / 2} y={134} size={10} fill={MUTED}>{z.value}</M>
        </g>
      ))}
      <Wire d="M60 88 L840 88" stroke={MUTED} width={1.6} opacity={0.5} />
      <rect x={494} y={76} width={16} height={24} fill={CREAM} />
      <Wire d="M492 78 L500 98" stroke={N} width={2} />
      <Wire d="M502 78 L510 98" stroke={N} width={2} />
      {[[60, '0'], [288, '0.76'], [480, '1.4'], [520, '2'], [840, '4']].map(([px, label]) => (
        <M key={String(label)} x={px} y={68} size={10} fill={MUTED}>{label}</M>
      ))}

      <Card x={40} y={160} w={300} h={140} title="AISI 1045 decoded" accent={BLUE} foot="first two digits: type · last two: carbon in hundredths" footTone={MUTED}>
        <M x={78} y={64} size={24} fill={BLUE} weight={800}>10</M>
        <M x={200} y={64} size={24} fill={AMBER} weight={800}>45</M>
        <M x={78} y={96} size={10.5} fill={BLUE}>plain carbon</M>
        <M x={78} y={112} size={10} fill={MUTED}>no alloy additions</M>
        <M x={200} y={96} size={10.5} fill={AMBER}>0.45 % C</M>
        <M x={200} y={112} size={10} fill={MUTED}>45 hundredths</M>
      </Card>

      <Card x={360} y={160} w={166} h={140} title="grey iron" accent={MUTED} foot="flakes raise stress" footTone={RED}>
        <rect x={16} y={44} width={134} height={62} rx={8} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
        {[[30, 60, 44, 18], [70, 90, 30, -14], [40, 92, 40, -10], [96, 56, 36, 16]].map(([px, py, len, dy]) => (
          <Wire key={`fl${px}-${py}`} d={`M${px} ${py} L${px + len} ${py + dy}`} stroke={N} width={3} />
        ))}
        <M x={83} y={122} size={9.5} fill={N}>sharp graphite flakes</M>
      </Card>
      <Card x={536} y={160} w={166} h={140} title="ductile (SG) iron" accent={GREEN} foot="spheroids do not concentrate" footTone={GREEN}>
        <rect x={16} y={44} width={134} height={62} rx={8} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
        {[[40, 62], [78, 88], [116, 60], [60, 96], [120, 94]].map(([px, py]) => (
          <circle key={`sp${px}-${py}`} cx={px} cy={py} r={8} fill={N} />
        ))}
        <M x={83} y={122} size={9.5} fill={N}>graphite spheroids</M>
      </Card>
      <Card x={712} y={160} w={166} h={140} title="white iron" accent={ROSE} foot="cementite, no graphite" footTone={ROSE}>
        <rect x={16} y={44} width={134} height={62} rx={8} fill={WHITE} stroke={MUTED} strokeWidth={1.6} />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect key={`wc${i}`} x={22 + i * 22} y={48} width={10} height={54} fill={ROSE} opacity={0.55} />
        ))}
        <M x={83} y={122} size={9.5} fill={ROSE}>hard combined carbide</M>
      </Card>

      <L x={340} y={320} size={11.5} fill={MUTED} weight={700}>tensile strength (MPa)</L>
      <Bars x={210} y={336} w={260} rowH={38} items={[['grey', 180, MUTED], ['ductile', 450, GREEN], ['white', 270, ROSE]]} />
      <L x={750} y={320} size={11.5} fill={MUTED} weight={700}>elongation (%)</L>
      <Bars x={660} y={336} w={180} rowH={38} max={20} items={[['grey', 0.6, MUTED], ['ductile', 18, GREEN], ['white', 0, ROSE]]} />
    </Scene>
  )
}

export function CriticalRadiusEnergyScene() {
  return (
    <Scene caption="Surface costs go as r², volume gains as r³ — so a nucleus must pass a critical size">
      <Axes x={90} y={300} w={470} h={220} yLabel="ΔG" />
      <Wire d="M90 300 L90 450" stroke={MUTED} width={2.2} />
      <Curve pts={[[90, 300], [174, 283], [258, 232], [310, 182], [350, 139]]} stroke={ROSE} width={2.6} className="msmm-draw" />
      <Curve pts={[[90, 300], [216, 311], [300, 352], [342, 391], [367, 421]]} stroke={BLUE} width={2.6} className="msmm-draw msmm-delay-1" />
      <Curve
        pts={[[90, 300], [153, 292], [216, 274], [279, 253], [342, 240], [370, 238], [426, 246], [468, 266], [510, 300], [552, 351]]}
        stroke={N}
        width={3.2}
        className="msmm-draw msmm-delay-2"
      />
      <M x={356} y={134} size={10.5} fill={ROSE} anchor="start">surface term, + r²</M>
      <M x={373} y={424} size={10.5} fill={BLUE} anchor="start">volume term, − r³</M>
      <M x={490} y={330} size={10.5} fill={N}>ΔG total</M>
      <Wire d="M490 322 L500 296" stroke={N} width={1.4} />
      <Wire d="M370 238 L370 300" stroke={AMBER} width={1.8} dash="5 4" />
      <Dot cx={370} cy={238} r={6} fill={AMBER} className="msmm-pulse" />
      <M x={370} y={316} size={11} fill={AMBER}>r*</M>
      <Wire d="M390 238 L390 300" stroke={AMBER} width={2} />
      <Wire d="M386 242 L390 236 L394 242" stroke={AMBER} width={2} />
      <Wire d="M386 296 L390 302 L394 296" stroke={AMBER} width={2} />
      <M x={398} y={272} size={10.5} fill={AMBER} anchor="start">ΔG* barrier</M>
      <M x={250} y={466} size={11} fill={MUTED}>embryo radius r</M>

      <Card x={590} y={54} w={290} h={150} title="two embryos, two fates" accent={BLUE} foot="the barrier is a size barrier" footTone={MUTED}>
        <circle cx={70} cy={80} r={24} fill={SKY} stroke={BLUE} strokeWidth={2.4} className="msmm-collapse" />
        <M x={70} y={124} size={10} fill={RED}>r below r* — redissolves</M>
        <circle cx={215} cy={80} r={24} fill={WHITE} stroke={GREEN} strokeWidth={2.4} className="msmm-emerge" />
        <M x={215} y={124} size={10} fill={GREEN}>r above r* — grows</M>
      </Card>
      <Card x={590} y={220} w={290} h={250} title="more undercooling ΔT" accent={AMBER} foot="a larger driving force shrinks r*" footTone={AMBER}>
        <Wire d="M40 190 L270 190" stroke={MUTED} width={2} />
        <Wire d="M40 190 L40 60" stroke={MUTED} width={2} />
        <Curve pts={[[40, 170], [80, 130], [130, 104], [160, 100], [200, 124], [240, 170]]} stroke={ROSE} width={2.4} />
        <Curve pts={[[40, 170], [60, 140], [95, 126], [120, 130], [170, 160], [230, 188]]} stroke={GREEN} width={2.4} />
        <Dot cx={160} cy={100} r={5} fill={ROSE} />
        <Dot cx={95} cy={126} r={5} fill={GREEN} />
        <Wire d="M160 100 L160 190" stroke={ROSE} width={1.4} dash="4 4" />
        <Wire d="M95 126 L95 190" stroke={GREEN} width={1.4} dash="4 4" />
        <Wire d="M155 88 L105 114" stroke={AMBER} width={2} marker="url(#msmArrA)" className="msmm-current" />
        <M x={185} y={88} size={10} fill={AMBER} anchor="start">moves left and down</M>
        <M x={95} y={206} size={10} fill={GREEN}>large ΔT</M>
        <M x={170} y={206} size={10} fill={ROSE}>small ΔT</M>
      </Card>
    </Scene>
  )
}

export function TttDiagramScene() {
  const chips = [
    { y: 112, name: 'coarse pearlite', note: 'wide plates, soft', hold: 135, end: 290, tone: BLUE },
    { y: 192, name: 'fine pearlite', note: 'narrow plates', hold: 215, end: 240, tone: AMBER },
    { y: 282, name: 'bainite', note: 'needles, tough', hold: 305, end: 370, tone: TEAL },
    { y: 382, name: 'martensite', note: 'diffusionless, hard', hold: 405, end: 200, tone: RED },
  ]
  return (
    <Scene caption="C curves with a nose where transformation is fastest — a different product at each hold">
      <Axes
        x={90}
        y={430}
        w={420}
        h={350}
        yLabel="T (°C)"
        tickLabels={[[90, '1 s'], [174, '10'], [258, '10²'], [342, '10³'], [426, '10⁴'], [510, '10⁵']]}
        yTicks={[[117, '727'], [205, '550'], [370, '220 Ms']]}
      />
      <Wire d="M90 117 L510 117" stroke={AMBER} width={2} dash="7 5" />
      <M x={96} y={111} size={10} fill={AMBER} anchor="start">eutectoid 727 °C — austenite above</M>
      <Curve pts={[[190, 118], [150, 145], [126, 178], [120, 205], [134, 240], [170, 285], [230, 330], [300, 362], [310, 370]]} stroke={N} width={2.8} className="msmm-draw" />
      <Curve pts={[[300, 118], [240, 148], [205, 180], [196, 205], [212, 242], [255, 288], [318, 332], [380, 362], [395, 370]]} stroke={MUTED} width={2.6} dash="8 5" className="msmm-draw msmm-delay-1" />
      <Dot cx={120} cy={205} r={6} fill={AMBER} className="msmm-pulse" />
      <Wire d="M250 175 L128 203" stroke={AMBER} width={1.6} marker="url(#msmArrA)" />
      <M x={256} y={172} size={10} fill={AMBER} anchor="start">nose — fastest transformation</M>
      <Wire d="M90 370 L510 370" stroke={RED} width={2.4} />
      <Wire d="M90 410 L510 410" stroke={RED} width={1.8} dash="6 5" />
      <M x={524} y={366} size={10} fill={RED} anchor="end">Ms</M>
      <M x={524} y={406} size={10} fill={RED} anchor="end">Mf</M>
      {chips.map((c) => (
        <g key={c.name}>
          <Wire d={`M96 ${c.hold} L${c.end} ${c.hold}`} stroke={c.tone} width={2.4} marker={`url(#${c.tone === BLUE ? 'msmArrB' : c.tone === AMBER ? 'msmArrA' : c.tone === TEAL ? 'msmArrT' : 'msmArrR'})`} className="msmm-current" />
          <Wire d={`M${c.end} ${c.hold} L530 ${c.hold}`} stroke={c.tone} width={1.4} dash="4 4" opacity={0.7} />
          <rect x={530} y={c.y} width={180} height={46} rx={9} fill={WHITE} stroke={c.tone} strokeWidth={2} />
          {[0, 1, 2, 3].map((i) => (
            <rect key={`${c.name}${i}`} x={538 + i * (c.tone === RED ? 16 : c.tone === BLUE ? 14 : 10)} y={c.y + 10} width={c.tone === BLUE ? 7 : 4} height={26} fill={c.tone} opacity={0.6} transform={c.tone === RED ? `rotate(18 ${538 + i * 16} ${c.y + 23})` : undefined} />
          ))}
          <M x={655} y={c.y + 20} size={11} fill={c.tone} weight={800}>{c.name}</M>
          <M x={655} y={c.y + 36} size={9.5} fill={MUTED}>{c.note}</M>
        </g>
      ))}
      <M x={300} y={474} size={10.5} fill={MUTED}>time, log scale</M>

      <M x={810} y={62} size={10} fill={BLUE}>driving force rises as T falls</M>
      <M x={810} y={78} size={10} fill={TEAL}>diffusion rate falls as T falls</M>
      <Wire d="M740 430 L740 100" stroke={MUTED} width={2} />
      <Wire d="M740 430 L880 430" stroke={MUTED} width={2} />
      <Curve pts={[[742, 117], [778, 160], [806, 205], [840, 270], [862, 340], [872, 430]]} stroke={BLUE} width={2.2} />
      <Curve pts={[[872, 117], [846, 160], [816, 205], [782, 270], [756, 340], [746, 430]]} stroke={TEAL} width={2.2} />
      <Curve pts={[[742, 117], [770, 160], [812, 205], [778, 260], [752, 330], [744, 430]]} stroke={AMBER} width={3} className="msmm-pulse" />
      <Dot cx={812} cy={205} r={5} fill={AMBER} />
      <Wire d="M740 205 L812 205" stroke={AMBER} width={1.4} dash="4 4" />
      <M x={744} y={198} size={9.5} fill={AMBER} anchor="start">nose T</M>
      <M x={810} y={452} size={10} fill={AMBER}>their product peaks at the nose</M>
    </Scene>
  )
}

export function CctAndCoolingRatesScene() {
  return (
    <Scene caption="Miss the nose and you get martensite — then temper it, because untempered martensite is unusable">
      <Axes
        x={90}
        y={400}
        w={440}
        h={320}
        yLabel="T (°C)"
        tickLabels={[[90, '1 s'], [200, '10'], [310, '10²'], [420, '10³'], [530, '10⁴']]}
        yTicks={[[114, '727'], [345, '220 Ms']]}
      />
      <M x={96} y={96} size={10.5} fill={MUTED} anchor="start">CCT curves sit below and right of the TTT curves</M>
      <Wire d="M90 114 L530 114" stroke={AMBER} width={1.8} dash="7 5" />
      <Curve pts={[[200, 120], [150, 155], [126, 190], [120, 210], [140, 250], [190, 295], [260, 330], [310, 345]]} stroke={MUTED} width={2} dash="7 5" opacity={0.45} />
      <Curve pts={[[250, 140], [200, 175], [172, 205], [166, 228], [190, 268], [240, 308], [300, 340], [330, 348]]} stroke={N} width={2.8} className="msmm-draw" />
      <Wire d="M126 190 L166 204" stroke={AMBER} width={2} marker="url(#msmArrA)" className="msmm-current" />
      <Wire d="M90 345 L530 345" stroke={RED} width={2.4} />
      <Curve pts={[[100, 100], [200, 180], [320, 280], [430, 360], [500, 395]]} stroke={TEAL} width={2.6} className="msmm-draw msmm-delay-1" />
      <Curve pts={[[100, 100], [180, 200], [260, 300], [330, 380]]} stroke={BLUE} width={2.6} className="msmm-draw msmm-delay-2" />
      <Curve pts={[[100, 100], [140, 200], [170, 300], [190, 380]]} stroke={RED} width={2.6} className="msmm-draw msmm-delay-3" />
      <M x={196} y={384} size={10} fill={RED} anchor="start">martensite · 65 HRC</M>
      <M x={336} y={384} size={10} fill={BLUE} anchor="start">fine pearlite · 25 HRC</M>
      <M x={526} y={318} size={10} fill={TEAL} anchor="end">coarse pearlite · 15 HRC</M>
      <M x={96} y={442} size={10} fill={MUTED} anchor="start">dashed: isothermal (TTT)</M>
      <M x={300} y={442} size={10} fill={N} anchor="start">solid: continuous cooling (CCT)</M>

      <Card
        x={580}
        y={54}
        w={300}
        h={140}
        title="critical cooling rate"
        accent={RED}
        linesY={58}
        lineH={24}
        lines={['the slowest cool that still misses the nose', 'anything slower picks up pearlite', 'it sets the hardenability of the steel']}
      />
      <Card x={580} y={210} w={300} h={250} title="tempering the martensite" accent={AMBER} foot="hardness traded back for toughness" footTone={MUTED}>
        <Wire d="M40 180 L270 180" stroke={MUTED} width={2} />
        <Wire d="M40 180 L40 60" stroke={MUTED} width={2} />
        <Curve pts={[[40, 72], [90, 88], [150, 112], [210, 136], [265, 156]]} stroke={ROSE} width={2.6} />
        <Curve pts={[[40, 160], [90, 146], [150, 124], [210, 102], [265, 84]]} stroke={GREEN} width={2.6} />
        <M x={265} y={64} size={10} fill={ROSE} anchor="end">hardness falls</M>
        <M x={46} y={58} size={10} fill={GREEN} anchor="start">toughness rises</M>
        <M x={155} y={200} size={10} fill={MUTED}>tempering temperature</M>
      </Card>
    </Scene>
  )
}

export function CompositionPlusHistoryScene() {
  const routes = [
    { x: 34, name: 'annealed', hardness: '15 HRC', note: 'soft, machinable', tone: GREEN, step: 22 },
    { x: 254, name: 'normalised', hardness: '22 HRC', note: 'stronger, tougher', tone: TEAL, step: 12 },
    { x: 474, name: 'quenched', hardness: '62 HRC', note: 'hard but brittle', tone: RED, step: 0 },
    { x: 694, name: 'quenched + tempered', hardness: '45 HRC', note: 'hard and tough', tone: BLUE, step: 0 },
  ]
  return (
    <Scene caption="Composition says what is possible, thermal history says what you get">
      <Block x={60} y={46} w={180} h={54} label="composition" sub="what phases are possible" stroke={BLUE} className="msmm-flow-node" />
      <Block x={60} y={112} w={180} h={54} label="thermal history" sub="which of them you realise" stroke={AMBER} className="msmm-flow-node msmm-delay-1" />
      <Wire d="M240 73 L312 100" stroke={BLUE} width={2.2} marker="url(#msmArrB)" className="msmm-flow-arrow" />
      <Wire d="M240 139 L312 112" stroke={AMBER} width={2.2} marker="url(#msmArrA)" className="msmm-flow-arrow msmm-delay-1" />
      <Block x={320} y={79} w={180} h={54} label="microstructure" sub="phase, amount, scale" stroke={PURP} className="msmm-flow-node msmm-delay-2" />
      <Wire d="M500 106 L552 106" stroke={PURP} width={2.2} marker="url(#msmArrP)" className="msmm-flow-arrow msmm-delay-2" />
      <Block x={560} y={79} w={180} h={54} label="properties" sub="strength, toughness" stroke={GREEN} className="msmm-flow-node msmm-delay-3" />
      <Card x={760} y={46} w={120} h={120} title="on the drawing" accent={N} linesY={52} lineH={20} mono lines={['AISI 1045', 'harden and', 'temper to', '45 HRC']} />

      <Block x={300} y={190} w={300} h={44} label="one composition — 0.45 % C steel" stroke={N} size={13} />
      {routes.map((r) => (
        <g key={r.name}>
          <Wire d={`M450 234 L${r.x + 92} 266`} stroke={r.tone} width={1.8} marker={`url(#${r.tone === GREEN ? 'msmArrG' : r.tone === TEAL ? 'msmArrT' : r.tone === RED ? 'msmArrR' : 'msmArrB'})`} />
          <Card x={r.x} y={270} w={184} h={180} title={r.name} accent={r.tone} className="msmm-cell-in">
            <rect x={20} y={44} width={144} height={64} rx={8} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
            {r.step
              ? Array.from({ length: Math.floor(140 / r.step) }, (_, i) => (
                  <rect key={`pl${i}`} x={24 + i * r.step} y={48} width={r.step / 2} height={56} fill={PURP} opacity={0.6} />
                ))
              : [0, 1, 2, 3, 4, 5].map((i) => (
                  <Wire key={`nd${i}`} d={`M${28 + i * 22} 102 L${48 + i * 22} 50`} stroke={r.tone} width={2.6} />
                ))}
            {r.name === 'quenched + tempered'
              ? [[46, 68], [86, 88], [126, 64], [66, 96]].map(([px, py]) => <circle key={`cb${px}`} cx={px} cy={py} r={4} fill={N} />)
              : null}
            <M x={92} y={138} size={20} fill={r.tone} weight={800}>{r.hardness}</M>
            <M x={92} y={160} size={10.5} fill={MUTED}>{r.note}</M>
          </Card>
        </g>
      ))}
      <M x={450} y={468} size={11} fill={AMBER}>one steel, 15 to 62 HRC — the heat treatment picks the number</M>
    </Scene>
  )
}


/* ── Module 5 ────────────────────────────────────────────────────────── */

export function CompositeClassificationTreeScene() {
  const cols = [
    { x: 28, cx: 148, title: 'particle reinforced', tone: AMBER, note: 'dispersed phase roughly equiaxed' },
    { x: 330, cx: 450, title: 'fibre reinforced', tone: PURP, note: 'large length to diameter ratio' },
    { x: 632, cx: 752, title: 'structural', tone: TEAL, note: 'the arrangement makes the property' },
  ]
  const gravel = [[46, 62], [82, 78], [122, 58], [158, 80], [190, 60]]
  return (
    <Scene caption="Matrix plus dispersed phase — the geometry of what is dispersed names the class">
      <Block x={350} y={36} w={200} h={40} label="COMPOSITES" stroke={N} size={15} className="msmm-emerge" />
      {cols.map((c, i) => (
        <Wire key={`root-${c.title}`} d={`M450 76 L${c.cx} 110`} stroke={c.tone} width={2.2} className={`msmm-fade-in msmm-delay-${i}`} />
      ))}

      <Card x={28} y={110} w={240} h={108} title="particle reinforced" accent={AMBER} className="msmm-cell-in">
        <rect x={16} y={38} width={208} height={60} rx={6} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
        {gravel.map(([px, py]) => (
          <circle key={`pg${px}`} cx={16 + px} cy={38 + py - 30} r={11} fill={AMBER} opacity={0.85} />
        ))}
        {[[30, 20], [70, 34], [110, 18], [150, 36], [186, 22], [96, 52], [56, 52]].map(([px, py]) => (
          <circle key={`ps${px}-${py}`} cx={16 + px} cy={38 + py} r={4} fill={AMBER} opacity={0.5} />
        ))}
      </Card>
      <Card x={330} y={110} w={240} h={108} title="fibre reinforced" accent={PURP} className="msmm-cell-in msmm-delay-1">
        <rect x={16} y={38} width={208} height={60} rx={6} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
        {[48, 59, 70, 81, 92].map((fy) => (
          <Wire key={`fb${fy}`} d={`M26 ${fy} L214 ${fy}`} stroke={PURP} width={4} />
        ))}
      </Card>
      <Card x={632} y={110} w={240} h={108} title="structural" accent={TEAL} className="msmm-cell-in msmm-delay-2">
        {[0, 1, 2, 3].map((k) => (
          <rect key={`ly${k}`} x={16} y={38 + k * 15} width={96} height={13} rx={2} fill={k % 2 ? SKY : WHITE} stroke={TEAL} strokeWidth={1.6} />
        ))}
        <rect x={128} y={38} width={96} height={10} fill={N} />
        <rect x={128} y={48} width={96} height={40} fill={WHITE} stroke={MUTED} strokeWidth={1.4} />
        {[0, 1, 2, 3, 4, 5].map((k) => (
          <Wire key={`hc${k}`} d={`M${132 + k * 15} 88 L${139 + k * 15} 48 L${146 + k * 15} 88`} stroke={AMBER} width={1.6} />
        ))}
        <rect x={128} y={88} width={96} height={10} fill={N} />
      </Card>

      {cols.map((c) => (
        <g key={`sub-${c.title}`}>
          <Wire d={`M${c.cx} 218 L${c.x + 58} 240`} stroke={c.tone} width={1.8} />
          <Wire d={`M${c.cx} 218 L${c.x + 183} 240`} stroke={c.tone} width={1.8} />
          <Wire d={`M${c.x + 58} 284 L${c.x + 58} 306`} stroke={MUTED} width={1.6} dash="4 4" />
          <Wire d={`M${c.x + 183} 284 L${c.x + 183} 306`} stroke={MUTED} width={1.6} dash="4 4" />
        </g>
      ))}

      <Block x={28} y={240} w={115} h={44} label="large particle" sub="load sharing" stroke={AMBER} size={11} className="msmm-slide-in" />
      <Block x={153} y={240} w={115} h={44} label="dispersion" sub="blocks slip" stroke={AMBER} size={11} className="msmm-slide-in msmm-delay-1" />
      <Block x={330} y={240} w={115} h={44} label="by length" sub="short vs continuous" stroke={PURP} size={11} className="msmm-slide-in msmm-delay-2" />
      <Block x={455} y={240} w={115} h={44} label="by orientation" sub="aligned vs random" stroke={PURP} size={11} className="msmm-slide-in msmm-delay-3" />
      <Block x={632} y={240} w={115} h={44} label="laminar" sub="plies at angles" stroke={TEAL} size={11} className="msmm-slide-in msmm-delay-4" />
      <Block x={757} y={240} w={115} h={44} label="sandwich" sub="faces + core" stroke={TEAL} size={11} className="msmm-slide-in msmm-delay-5" />

      <Block x={28} y={306} w={115} h={36} label="concrete" fill={SKY} stroke={MUTED} size={11} className="msmm-fade-in msmm-delay-1" />
      <Block x={153} y={306} w={115} h={36} label="ODS alloy" fill={SKY} stroke={MUTED} size={11} className="msmm-fade-in msmm-delay-2" />
      <Block x={330} y={306} w={115} h={36} label="chopped GFRP" fill={SKY} stroke={MUTED} size={11} className="msmm-fade-in msmm-delay-3" />
      <Block x={455} y={306} w={115} h={36} label="CFRP ply" fill={SKY} stroke={MUTED} size={11} className="msmm-fade-in msmm-delay-4" />
      <Block x={632} y={306} w={115} h={36} label="plywood" fill={SKY} stroke={MUTED} size={11} className="msmm-fade-in msmm-delay-5" />
      <Block x={757} y={306} w={115} h={36} label="honeycomb panel" fill={SKY} stroke={MUTED} size={10.5} className="msmm-fade-in msmm-delay-6" />

      <Card x={170} y={362} w={560} h={100} title="the two roles every composite plays" accent={N} className="msmm-fade-in msmm-delay-7">
        <rect x={40} y={44} width={26} height={24} rx={4} fill={SKY} stroke={MUTED} strokeWidth={1.8} />
        <L x={80} y={61} size={11.5} fill={N} anchor="start" weight={700}>matrix — continuous, binds the phases, transfers load into them</L>
        <rect x={40} y={76} width={26} height={24} rx={4} fill={AMBER} stroke={MUTED} strokeWidth={1.8} />
        <L x={80} y={93} size={11.5} fill={N} anchor="start" weight={700}>dispersed phase — its geometry is what the classification is built on</L>
      </Card>
    </Scene>
  )
}

export function LargeParticleCompositesScene() {
  const bigStones = [[86, 136], [178, 118], [268, 148], [124, 200], [232, 206], [312, 192]]
  const sand = [[62, 176], [148, 160], [206, 142], [296, 118], [330, 152], [92, 226], [188, 236], [268, 240], [58, 120], [340, 220]]
  const wcGrains = [[448, 130], [512, 118], [578, 136], [640, 122], [470, 186], [534, 172], [600, 190], [656, 176], [444, 228], [520, 226], [596, 232], [652, 222]]
  return (
    <Scene caption="Hard particles restrain the paste around them — and the modulus sits between two computable bounds">
      <L x={40} y={62} size={12.5} fill={N} anchor="start">concrete — graded gravel and sand in cement paste</L>
      {[120, 200, 280].map((lx, i) => (
        <Wire key={`ld${lx}`} d={`M${lx} 68 L${lx} 86`} stroke={BLUE} width={2.6} marker="url(#msmArrB)" className={`msmm-charge msmm-delay-${i}`} />
      ))}
      <rect x="40" y="88" width="320" height="156" rx="8" fill={SKY} stroke={MUTED} strokeWidth="2.2" />
      {bigStones.map(([px, py]) => (
        <circle key={`bs${px}-${py}`} cx={px} cy={py} r={18} fill={AMBER} stroke={N} strokeWidth={1.4} opacity={0.9} />
      ))}
      {sand.map(([px, py]) => (
        <circle key={`sd${px}-${py}`} cx={px} cy={py} r={6} fill={AMBER} opacity={0.55} />
      ))}
      {bigStones.slice(0, 3).map(([px, py], i) => (
        <Wire key={`tr${px}`} d={`M${px} ${py - 30} L${px} ${py - 20}`} stroke={BLUE} width={2.4} marker="url(#msmArrB)" className={`msmm-charge msmm-delay-${i}`} />
      ))}
      <Wire d="M124 200 m-30 0 a30 30 0 0 0 60 0" stroke={RED} width={2} dash="5 4" className="msmm-pulse" />
      <Wire d="M232 206 m-30 0 a30 30 0 0 0 60 0" stroke={RED} width={2} dash="5 4" className="msmm-pulse msmm-delay-2" />
      <L x={200} y={262} size={11} fill={N}>load goes into the stones; the paste between them cannot deform freely</L>

      <L x={540} y={62} size={12.5} fill={N}>cermet — WC grains in a cobalt binder</L>
      <path d="M400 244 L400 108 L424 88 L680 88 L680 244 Z" fill={WHITE} stroke={N} strokeWidth="2.4" />
      <path d="M400 244 L400 108 L424 88 L680 88 L680 244 Z" fill={TEAL} opacity="0.12" />
      {wcGrains.map(([px, py]) => (
        <path key={`wc${px}-${py}`} d={`M${px} ${py - 15} L${px + 17} ${py} L${px} ${py + 15} L${px - 17} ${py} Z`} fill={PURP} opacity={0.85} stroke={N} strokeWidth={1.2} />
      ))}
      <L x={540} y={262} size={11} fill={N}>carbide grains cut; the cobalt between them stops the tip shattering</L>
      <Card
        x={700}
        y={88}
        w={180}
        h={156}
        title="property combination"
        accent={PURP}
        linesY={54}
        lineH={22}
        lines={['WC grains — hardness', 'Co binder — toughness', 'neither alone will cut', 'tool tips, dies, rock bits']}
      />

      <Axes
        x={110}
        y={440}
        w={400}
        h={150}
        xLabel="particle volume fraction"
        yLabel="E (modulus)"
        tickLabels={[[110, '0'], [510, '1.0']]}
      />
      <Curve pts={[[110, 420], [510, 300]]} stroke={BLUE} width={2.8} className="msmm-draw" />
      <Curve pts={[[110, 420], [190, 404], [270, 382], [350, 356], [430, 330], [510, 300]]} stroke={TEAL} width={2.8} className="msmm-draw msmm-delay-2" />
      <Curve pts={[[110, 420], [190, 398], [270, 370], [350, 342], [430, 318], [510, 300]]} stroke={AMBER} width={3} dash="7 5" className="msmm-draw msmm-delay-4" />
      <Dot cx={270} cy={370} r={5} fill={AMBER} className="msmm-cost-dot" />

      <Card x={530} y={296} w={350} h={134} title="rule of mixtures bounds" accent={N}>
        <Wire d="M16 52 L54 52" stroke={BLUE} width={3} />
        <M x={62} y={56} size={10.5} fill={BLUE} anchor="start">upper: Ec = Em·Vm + Ep·Vp</M>
        <Wire d="M16 84 L54 84" stroke={TEAL} width={3} />
        <M x={62} y={88} size={10.5} fill={TEAL} anchor="start">lower: 1/Ec = Vm/Em + Vp/Ep</M>
        <Wire d="M16 116 L54 116" stroke={AMBER} width={3} dash="6 4" />
        <M x={62} y={120} size={10.5} fill={AMBER} anchor="start">real concrete lands between</M>
      </Card>
    </Scene>
  )
}

export function DispersionStrengtheningScene() {
  const pinned = [90, 150, 210, 270, 330, 390]
  const bow = pinned
    .map((px, i) => (i === 0 ? `M50 170 L${px} 170` : `Q${(pinned[i - 1] + px) / 2} 210 ${px} 170`))
    .join(' ')
  return (
    <Scene caption="Too small to carry load — they block dislocations, and unlike precipitates they survive the heat">
      <L x={235} y={56} size={12.5} fill={N}>fine oxide particles obstruct dislocation glide</L>
      <rect x="40" y="66" width="390" height="200" rx="10" fill={SKY} stroke={MUTED} strokeWidth="2.2" />
      <Wire d="M210 124 L270 124" stroke={N} width={1.8} />
      <Wire d="M210 118 L210 130" stroke={N} width={1.8} />
      <Wire d="M270 118 L270 130" stroke={N} width={1.8} />
      <M x={240} y={112} size={11.5} fill={N} weight={800}>λ — interparticle spacing</M>
      {pinned.map((px) => (
        <Dot key={`pp${px}`} cx={px} cy={170} r={5.5} fill={PURP} />
      ))}
      <Wire d={`${bow} L420 170`} stroke={ROSE} width={3} className="msmm-charge" />
      {[70, 150, 230, 310].map((ax, i) => (
        <Wire key={`sh${ax}`} d={`M${ax} 236 L${ax + 52} 236`} stroke={AMBER} width={2.2} marker="url(#msmArrA)" className={`msmm-current msmm-delay-${i}`} />
      ))}
      <M x={235} y={258} size={10.5} fill={AMBER}>applied shear bows the line; smaller λ demands more of it</M>

      <Card x={460} y={66} w={420} h={182} title="precipitation hardened — held at temperature" accent={ROSE} foot="precipitates coarsen, then dissolve — the strength goes" footTone={ROSE}>
        {[0, 1, 2].map((k) => (
          <rect key={`pr${k}`} x={20 + k * 134} y={44} width={120} height={86} rx={6} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
        ))}
        {[3.5, 7, 12].map((r, k) =>
          (k === 0 ? [[30, 30], [62, 54], [92, 26], [46, 74], [86, 70], [70, 44]] : k === 1 ? [[34, 34], [74, 62], [96, 30]] : [[52, 48]]).map(([px, py]) => (
            <circle key={`pc${k}-${px}-${py}`} cx={20 + k * 134 + px} cy={44 + py} r={r} fill={ROSE} opacity={0.75} />
          )),
        )}
        {['as aged', 'hours hot', 'longer still'].map((t, k) => (
          <M key={t} x={80 + k * 134} y={148} size={10.5} fill={MUTED}>{t}</M>
        ))}
      </Card>

      <Card x={460} y={262} w={420} h={196} title="dispersion strengthened — held at temperature" accent={TEAL} foot="stable oxides neither dissolve nor coarsen — the strength stays" footTone={TEAL}>
        {[0, 1, 2].map((k) => (
          <rect key={`ds${k}`} x={20 + k * 134} y={44} width={120} height={86} rx={6} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
        ))}
        {[0, 1, 2].map((k) =>
          [[30, 30], [62, 54], [92, 26], [46, 74], [86, 70], [70, 44], [104, 60]].map(([px, py]) => (
            <circle key={`dc${k}-${px}-${py}`} cx={20 + k * 134 + px} cy={44 + py} r={3.5} fill={TEAL} opacity={0.85} />
          )),
        )}
        {['as made', 'hours hot', 'longer still'].map((t, k) => (
          <M key={`d${t}`} x={80 + k * 134} y={148} size={10.5} fill={MUTED}>{t}</M>
        ))}
      </Card>

      <Axes x={90} y={440} w={330} h={150} xLabel="time at temperature" yLabel="strength" tickLabels={[[90, '0'], [255, 'hours']]} />
      <Curve pts={[[90, 310], [180, 313], [270, 317], [360, 320], [420, 322]]} stroke={TEAL} width={3} className="msmm-draw" />
      <Curve pts={[[90, 302], [160, 318], [230, 352], [300, 390], [360, 410], [420, 420]]} stroke={ROSE} width={3} className="msmm-draw msmm-delay-2" />
      <M x={410} y={298} size={10.5} fill={TEAL} anchor="end">oxide dispersion holds</M>
      <M x={100} y={400} size={10.5} fill={ROSE} anchor="start">precipitates fade</M>
    </Scene>
  )
}

export function CriticalFibreLengthScene() {
  const cases = [
    { x: 20, f0: 120, f1: 180, tone: ROSE, title: 'l < lc — pull-out', peak: 300, lines: ['shear never builds σ to σf', 'the fibre slides out whole', 'its strength is never used'] },
    { x: 310, f0: 370, f1: 510, tone: AMBER, title: 'l = lc — just breaks', peak: 250, lines: ['the centre just reaches σf', 'the minimum useful length', 'lc = σf · d / (2 · τc)'] },
    { x: 600, f0: 615, f1: 845, tone: GREEN, title: 'l ≫ lc — efficient', peak: 250, lines: ['at σf over most of its length', 'effectively a continuous fibre', 'load carried, not wasted'] },
  ]
  return (
    <Scene caption="Shear builds the stress along the fibre — below the critical length it pulls out instead of breaking">
      {cases.map((c, ci) => {
        const mid = (c.f0 + c.f1) / 2
        const shear = []
        for (let sx = c.f0 + 12; sx < c.f1 - 12; sx += 26) shear.push(sx)
        return (
          <g key={c.title}>
            <L x={c.x + 130} y={60} size={12.5} fill={c.tone}>{c.title}</L>
            <rect x={c.x} y="70" width="260" height="70" rx="8" fill={SKY} stroke={MUTED} strokeWidth="2" />
            <Wire d={`M${c.x + 46} 82 L${c.x + 8} 82`} stroke={BLUE} width={2.4} marker="url(#msmArrB)" className="msmm-charge" />
            <Wire d={`M${c.x + 214} 82 L${c.x + 252} 82`} stroke={BLUE} width={2.4} marker="url(#msmArrB)" className="msmm-charge" />
            <rect x={c.f0} y="96" width={c.f1 - c.f0} height="18" rx="4" fill={c.tone} stroke={N} strokeWidth={1.4} />
            {shear.map((sx) => (
              <g key={`sa${sx}`}>
                <Wire d={`M${sx} 90 L${sx + (sx < mid ? 14 : -14)} 90`} stroke={AMBER} width={1.8} marker="url(#msmArrA)" className="msmm-current" />
                <Wire d={`M${sx} 124 L${sx + (sx < mid ? 14 : -14)} 124`} stroke={AMBER} width={1.8} marker="url(#msmArrA)" className="msmm-current" />
              </g>
            ))}
            <Wire d={`M${c.f0 - 10} 330 L${c.f1 + 10} 330`} stroke={MUTED} width={2} />
            <Wire d={`M${c.f0 - 10} 330 L${c.f0 - 10} 244`} stroke={MUTED} width={2} />
            <Curve
              pts={ci === 2
                ? [[c.f0, 330], [c.f0 + 50, c.peak], [c.f1 - 50, c.peak], [c.f1, 330]]
                : [[c.f0, 330], [mid, c.peak], [c.f1, 330]]}
              stroke={c.tone}
              width={3}
              className={`msmm-draw msmm-delay-${ci}`}
            />
            <Card x={c.x} y={346} w={270} h={120} title={c.title} accent={c.tone} lines={c.lines} linesY={56} lineH={22} className={`msmm-fade-in msmm-delay-${ci}`} />
          </g>
        )
      })}
      <Wire d="M30 250 L870 250" stroke={RED} width={2} dash="8 5" />
      <M x={35} y={240} size={11} fill={RED} anchor="start">σf — the stress at which the fibre itself breaks · profiles drawn beneath each fibre</M>
    </Scene>
  )
}

export function OrientationAndFractionScene() {
  const cols = [
    { x: 30, title: 'aligned', tone: PURP, rx: 128, ry: 22, note: 'strongest along, weakest across' },
    { x: 320, title: 'cross-plied 0/90', tone: TEAL, rx: 86, ry: 74, note: 'two good directions, squarer' },
    { x: 610, title: 'random in plane', tone: AMBER, rx: 62, ry: 58, note: 'same everywhere, lower everywhere' },
  ]
  const fibres = {
    aligned: [0, 1, 2, 3, 4].map((i) => [40, 60 + i * 15, 240, 60 + i * 15]),
    cross: [0, 1, 2].map((i) => [330, 62 + i * 22, 530, 62 + i * 22]).concat([0, 1, 2].map((i) => [370 + i * 55, 52, 370 + i * 55, 118])),
    random: [[622, 58, 700, 104], [648, 112, 742, 56], [690, 50, 726, 118], [620, 96, 716, 70], [672, 120, 762, 84]],
  }
  return (
    <Scene caption="Aligned fibres buy one superb direction — randomness trades the peak for uniformity">
      {cols.map((c, i) => (
        <g key={c.title} className={`msmm-cell-in msmm-delay-${i}`}>
          <rect x={c.x} y={40} width={260} height={92} rx={8} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
          <L x={c.x + 130} y={24} size={13} fill={c.tone}>{c.title}</L>
        </g>
      ))}
      {fibres.aligned.map(([x1, y1, x2, y2], i) => (
        <Wire key={`a${i}`} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={PURP} width={3} />
      ))}
      {fibres.cross.map(([x1, y1, x2, y2], i) => (
        <Wire key={`c${i}`} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={TEAL} width={3} />
      ))}
      {fibres.random.map(([x1, y1, x2, y2], i) => (
        <Wire key={`r${i}`} d={`M${x1} ${y1} L${x2} ${y2}`} stroke={AMBER} width={3} />
      ))}

      {cols.map((c, i) => (
        <g key={`polar-${c.title}`} className={`msmm-grow msmm-delay-${i + 1}`}>
          <Wire d={`M${c.x + 130} ${330} L${c.x + 130} ${190}`} stroke={MUTED} width={1.4} dash="4 4" />
          <Wire d={`M${c.x + 20} ${260} L${c.x + 240} ${260}`} stroke={MUTED} width={1.4} dash="4 4" />
          <ellipse cx={c.x + 130} cy={260} rx={c.rx} ry={c.ry} fill="none" stroke={c.tone} strokeWidth={2.8} />
          <M x={c.x + 130} y={352} size={11} fill={MUTED}>{c.note}</M>
        </g>
      ))}
      <M x={30} y={180} size={11.5} fill={MUTED} anchor="start">stiffness plotted by direction — distance from centre is the property along that direction</M>

      <Panel
        x={210}
        y={390}
        w={480}
        title="Volume fraction sets the ceiling, orientation decides who gets it"
        rows={[['Vf up', 'every direction gains — until wetting fails'], ['aligned', 'Ec ≈ Ef·Vf along, ≈ Em across']]}
        accent={GREEN}
      />
    </Scene>
  )
}

export function IsostrainDerivationScene() {
  return (
    <Scene caption="Loaded along the fibres both phases stretch together — so the stiff phase takes the load">
      <rect x={90} y={70} width={280} height={190} rx={6} fill={SKY} stroke={MUTED} strokeWidth={2} />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={110 + i * 68} y={70} width={26} height={190} fill={PURP} opacity={0.8} className={`msmm-fade-in msmm-delay-${i}`} />
      ))}
      <M x={230} y={56} size={12} fill={MUTED}>fibre and matrix side by side, load along the fibres</M>

      <Wire d="M230 30 L230 66" stroke={RED} width={3} marker="url(#msmArrR)" />
      <Wire d="M230 300 L230 264" stroke={RED} width={3} marker="url(#msmArrR)" />

      <Wire d="M64 70 L64 260" stroke={GREEN} width={2.2} marker="url(#msmArrG)" />
      <M x={40} y={168} size={12} fill={GREEN} anchor="start">Δl</M>
      <M x={230} y={286} size={12.5} fill={GREEN} weight={800}>same Δl over the same l → εf = εm = εc</M>

      <Bars
        x={430}
        y={92}
        w={410}
        accent={PURP}
        max={100}
        items={[['fibre carries', 88], ['matrix carries', 12]]}
      />
      <M x={430} y={72} size={11.5} fill={MUTED} anchor="start">load split for Ef/Em ≈ 60, Vf = 0.5</M>

      <Panel
        x={430}
        y={200}
        w={410}
        title="Rule of mixtures — upper bound"
        rows={[['equal strain', 'Pc = Pf + Pm'], ['divide by A·ε', 'Ec = Ef·Vf + Em·Vm'], ['load share', 'Pf/Pm = (Ef·Vf)/(Em·Vm)']]}
        accent={PURP}
        mono
      />
      <M x={635} y={420} size={12} fill={AMBER} weight={700}>the stiffer phase dominates because it must stretch the same amount</M>
    </Scene>
  )
}

export function IsostressDerivationScene() {
  return (
    <Scene caption="Loaded across the fibres the load passes through both — so the soft phase sets the stiffness">
      <rect x={96} y={78} width={270} height={168} rx={6} fill={SKY} stroke={MUTED} strokeWidth={2} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={96} y={100 + i * 52} width={270} height={20} fill={PURP} opacity={0.8} className={`msmm-fade-in msmm-delay-${i}`} />
      ))}
      <Wire d="M40 162 L92 162" stroke={RED} width={3} marker="url(#msmArrR)" />
      <Wire d="M424 162 L372 162" stroke={RED} width={3} marker="url(#msmArrR)" />
      <M x={230} y={64} size={12} fill={MUTED}>load crosses every layer in turn</M>
      <M x={230} y={268} size={12.5} fill={GREEN} weight={800}>one load through both → σf = σm = σc</M>

      <Wire d="M96 296 L152 296" stroke={PURP} width={3} />
      <M x={124} y={288} size={10.5} fill={PURP}>δf small</M>
      <Wire d="M160 296 L340 296" stroke={AMBER} width={3} />
      <M x={250} y={288} size={10.5} fill={AMBER}>δm large</M>
      <M x={230} y={320} size={11.5} fill={MUTED}>extensions add: δc = δf + δm</M>

      <Panel
        x={470}
        y={78}
        w={380}
        title="Inverse rule of mixtures — lower bound"
        rows={[['equal stress', 'δc = δf + δm'], ['strains add', 'εc = Vf·εf + Vm·εm'], ['divide by σ', '1/Ec = Vf/Ef + Vm/Em']]}
        accent={TEAL}
        mono
      />
      <Card
        x={470}
        y={250}
        w={380}
        h={112}
        title="Why the two bounds differ so much"
        lines={['axial: stiffnesses add — fibre wins', 'transverse: compliances add — matrix wins']}
        accent={AMBER}
        foot="a unidirectional laminate is strongly anisotropic"
        footTone={RED}
      />
      <M x={660} y={400} size={11.5} fill={MUTED}>real composites sit between the two bounds</M>
    </Scene>
  )
}

export function LaminateAndSandwichScene() {
  const plies = [
    { y: 62, angle: '0°', tone: PURP, dx: 0 },
    { y: 104, angle: '+45°', tone: TEAL, dx: 14 },
    { y: 146, angle: '90°', tone: AMBER, dx: 28 },
    { y: 188, angle: '−45°', tone: GREEN, dx: 42 },
  ]
  return (
    <Scene caption="Stack the plies at angles and the panel stops caring which way you load it">
      {plies.map((p, i) => (
        <g key={p.angle} className={`msmm-slide-in msmm-delay-${i}`}>
          <rect x={60 + p.dx} y={p.y} width={210} height={30} rx={4} fill={WHITE} stroke={p.tone} strokeWidth={2.2} />
          {[0, 1, 2, 3, 4, 5].map((k) => (
            <Wire key={k} d={`M${70 + p.dx + k * 34} ${p.y + 4} L${70 + p.dx + k * 34 + (i === 0 ? 0 : i === 2 ? 0 : i === 1 ? 20 : -20)} ${p.y + 26}`} stroke={p.tone} width={1.6} />
          ))}
          <M x={296 + p.dx} y={p.y + 20} size={11.5} fill={p.tone} anchor="start">{p.angle}</M>
        </g>
      ))}
      <M x={165} y={48} size={12} fill={MUTED}>exploded laminate</M>

      <Wire d="M400 150 L452 150" stroke={N} width={2.4} marker="url(#msmArr)" />
      <ellipse cx={560} cy={150} rx={78} ry={62} fill="none" stroke={N} strokeWidth={2.8} className="msmm-grow" />
      <ellipse cx={560} cy={150} rx={104} ry={18} fill="none" stroke={PURP} strokeWidth={1.8} strokeDasharray="5 4" opacity={0.7} />
      <M x={560} y={236} size={11.5} fill={N}>laminate stiffness by direction</M>
      <M x={560} y={252} size={10.5} fill={PURP}>dashed: one 0° ply alone</M>

      <rect x={676} y={96} width={190} height={14} fill={N} className="msmm-fade-in" />
      <rect x={676} y={110} width={190} height={56} fill={SKY} stroke={MUTED} strokeWidth={1.6} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${684 + i * 32} 166 L${700 + i * 32} 110 L${716 + i * 32} 166`} fill="none" stroke={TEAL} strokeWidth={1.6} />
      ))}
      <rect x={676} y={166} width={190} height={14} fill={N} />
      <M x={771} y={80} size={12} fill={MUTED}>sandwich panel</M>
      <M x={771} y={200} size={11} fill={TEAL}>light core only has to hold the faces apart</M>

      <Panel
        x={200}
        y={306}
        w={500}
        title="Structural composites — geometry is the property"
        rows={[['laminate', 'ply angles cancel each other’s weak direction'], ['sandwich', 'separation raises I; stiffness per unit mass soars']]}
        accent={TEAL}
      />
      <M x={450} y={428} size={12} fill={AMBER} weight={700}>neither changes the material — only where it is put</M>
    </Scene>
  )
}

export function CeramicGeneralBehaviourScene() {
  return (
    <Scene caption="One strong directional bond explains both the virtues and the single fatal weakness">
      <Block x={330} y={34} w={240} h={40} label="ionic + covalent bonding" stroke={N} size={13} className="msmm-emerge" />
      <Wire d="M400 74 L250 110" stroke={GREEN} width={2.2} />
      <Wire d="M500 74 L650 110" stroke={RED} width={2.2} />

      <Card
        x={40}
        y={110}
        w={380}
        h={158}
        title="strength of the bond gives"
        lines={['hard — resists indentation', 'stiff — high elastic modulus', 'high melting point', 'chemically inert, wear resistant']}
        accent={GREEN}
        linesY={58}
        lineH={24}
      />
      <Card
        x={480}
        y={110}
        w={380}
        h={158}
        title="direction of the bond gives"
        lines={['no slip systems — cannot yield', 'brittle — fails without warning', 'flaw sensitive — strength is scattered', 'weak in tension, strong in compression']}
        accent={RED}
        linesY={58}
        lineH={24}
      />

      <rect x={120} y={306} width={70} height={110} rx={4} fill={SKY} stroke={GREEN} strokeWidth={2.4} />
      <Wire d="M155 286 L155 302" stroke={GREEN} width={3} marker="url(#msmArrG)" />
      <Wire d="M155 440 L155 424" stroke={GREEN} width={3} marker="url(#msmArrG)" />
      <M x={155} y={462} size={12} fill={GREEN} weight={800}>compression: cracks close</M>

      <rect x={420} y={306} width={70} height={110} rx={4} fill={SKY} stroke={RED} strokeWidth={2.4} />
      <path d="M420 350 L448 344 L462 360 L490 352" fill="none" stroke={RED} strokeWidth={2.6} className="msmm-pulse" />
      <Wire d="M455 300 L455 284" stroke={RED} width={3} marker="url(#msmArrR)" />
      <Wire d="M455 422 L455 438" stroke={RED} width={3} marker="url(#msmArrR)" />
      <M x={455} y={462} size={12} fill={RED} weight={800}>tension: one flaw runs</M>

      <Panel
        x={600}
        y={300}
        w={270}
        title="Design consequence"
        rows={[['use in', 'compression'], ['rate by', 'a statistical strength'], ['never by', 'a single test value']]}
        accent={AMBER}
      />
    </Scene>
  )
}

export function GlassStructureAndTemperingScene() {
  const net = [[80, 120], [128, 96], [176, 124], [222, 98], [104, 164], [152, 176], [200, 160], [248, 140]]
  const lat = [0, 1, 2, 3].flatMap((r) => [0, 1, 2, 3].map((c) => [316 + c * 42, 96 + r * 30]))
  return (
    <Scene caption="Break enough network links and the melt stays soft long enough to shape">
      {net.map(([x, y], i) => (
        <Atom key={`n${i}`} cx={x} cy={y} r={9} fill={SKY} stroke={TEAL} className={`msmm-fade-in msmm-delay-${i % 6}`} />
      ))}
      {[[80, 120, 128, 96], [128, 96, 176, 124], [176, 124, 222, 98], [80, 120, 104, 164], [104, 164, 152, 176], [152, 176, 200, 160], [200, 160, 248, 140], [176, 124, 200, 160]].map(([a, b, c, d], i) => (
        <Wire key={`l${i}`} d={`M${a} ${b} L${c} ${d}`} stroke={TEAL} width={1.8} />
      ))}
      <M x={164} y={72} size={12} fill={TEAL}>glass — network, no repeat</M>

      {lat.map(([x, y], i) => (
        <Atom key={`c${i}`} cx={x} cy={y} r={8} fill={WHITE} stroke={MUTED} width={1.6} />
      ))}
      <M x={380} y={72} size={12} fill={MUTED}>crystal — same motif repeating</M>

      <Atom cx={140} cy={210} r={10} fill={AMBER} stroke={AMBER} sign="+" className="msmm-pulse" />
      <M x={252} y={214} size={11.5} fill={AMBER} anchor="end">modifier ion cuts a link</M>
      <M x={164} y={238} size={11} fill={MUTED}>fewer links → flows at a lower temperature</M>

      <Axes x={540} y={300} w={310} h={210} xLabel="temperature" yLabel="viscosity" tickLabels={[[640, 'working'], [760, 'melting']]} />
      <Curve pts={[[545, 100], [590, 140], [640, 196], [700, 244], [780, 282], [845, 294]]} stroke={ROSE} width={3} className="msmm-draw" />
      <Wire d="M640 300 L640 196" stroke={MUTED} width={1.4} dash="4 4" />
      <M x={556} y={118} size={11} fill={ROSE} anchor="start">rigid</M>
      <M x={806} y={272} size={11} fill={ROSE} anchor="end">pourable</M>

      <Card
        x={40}
        y={288}
        w={440}
        h={148}
        title="Thermal tempering — a deliberate stress pattern"
        lines={['chill the surfaces: they set first and hard', 'the interior cools later and pulls them inward', 'surface ends in compression, core in tension']}
        accent={GREEN}
        foot="a crack must overcome the surface compression before it can start"
        footTone={GREEN}
        linesY={56}
        lineH={22}
      />
    </Scene>
  )
}

export function ClayFiringAndRefractoriesScene() {
  const steps = [
    { x: 34, title: '1 · wet', tone: BLUE, note: 'water films let platelets slide — it can be shaped' },
    { x: 246, title: '2 · dried', tone: AMBER, note: 'water leaves, platelets close up, the body shrinks' },
    { x: 458, title: '3 · fired', tone: RED, note: 'a glassy phase forms and flows between particles' },
  ]
  return (
    <Scene caption="Water makes it formable, fire makes it permanent — and each stage shrinks it">
      {steps.map((s, i) => (
        <g key={s.title} className={`msmm-cell-in msmm-delay-${i}`}>
          <rect x={s.x} y={54} width={190} height={120} rx={8} fill={CREAM} stroke={s.tone} strokeWidth={2.2} />
          <L x={s.x + 95} y={42} size={12.5} fill={s.tone}>{s.title}</L>
          {[0, 1, 2, 3, 4].map((k) => (
            <rect
              key={k}
              x={s.x + 22 + (k % 3) * 52 + (i === 0 ? k * 2 : 0)}
              y={78 + Math.floor(k / 3) * 44 + (i === 2 ? 2 : 0)}
              width={44}
              height={9}
              rx={2}
              fill={i === 2 ? ROSE : MUTED}
              opacity={0.85}
            />
          ))}
          {i === 2
            ? [0, 1, 2].map((k) => (
                <rect key={`g${k}`} x={s.x + 26 + k * 52} y={92} width={40} height={26} rx={3} fill={AMBER} opacity={0.3} />
              ))
            : null}
          <M x={s.x + 95} y={194} size={10.5} fill={MUTED}>{s.note}</M>
        </g>
      ))}
      {[0, 1].map((i) => (
        <Wire key={i} d={`M${228 + i * 212} 114 L${240 + i * 212} 114`} stroke={N} width={2.4} marker="url(#msmArr)" />
      ))}

      <Panel
        x={666}
        y={54}
        w={200}
        title="Refractory duty"
        rows={[['fireclay', 'general, cheap'], ['silica', 'acid slags'], ['basic', 'basic slags'], ['insulating', 'holds heat in']]}
        accent={TEAL}
      />

      <Card
        x={120}
        y={246}
        w={660}
        h={170}
        title="What the fired body has to survive"
        lines={[
          'load at temperature — it must not slump under its own weight',
          'thermal shock — a steep gradient sets up a tensile surface stress',
          'slag attack — the lining must not be the acid or base its slag will eat',
        ]}
        accent={AMBER}
        foot="porosity is the trade: more pores insulate better and spall less, but carry less load"
        footTone={RED}
        linesY={62}
        lineH={26}
      />
    </Scene>
  )
}

export function AbrasivesAndCementSettingScene() {
  const cycle = [
    { x: 60, label: 'sharp', tone: GREEN, pts: '0,34 18,0 36,34' },
    { x: 180, label: 'blunted', tone: AMBER, pts: '0,34 8,6 28,6 36,34' },
    { x: 300, label: 'fractures', tone: RED, pts: '0,34 12,10 20,22 36,34' },
  ]
  return (
    <Scene caption="An abrasive that never broke would stop cutting — friability is the feature">
      {cycle.map((c, i) => (
        <g key={c.label} className={`msmm-cell-in msmm-delay-${i}`} transform={`translate(${c.x},70)`}>
          <polygon points={c.pts} fill={SKY} stroke={c.tone} strokeWidth={2.4} />
          <M x={18} y={56} size={11.5} fill={c.tone}>{c.label}</M>
        </g>
      ))}
      <rect x={40} y={112} width={340} height={16} fill={MUTED} opacity={0.35} />
      <M x={210} y={146} size={11} fill={MUTED}>workpiece</M>
      {[0, 1].map((i) => (
        <Wire key={i} d={`M${112 + i * 120} 86 L${168 + i * 120} 86`} stroke={N} width={2.2} marker="url(#msmArr)" />
      ))}
      <path d="M356 60 Q 400 20 70 34" fill="none" stroke={GREEN} strokeWidth={2.2} strokeDasharray="6 4" markerEnd="url(#msmArrG)" className="msmm-fade-in" />
      <M x={214} y={26} size={11.5} fill={GREEN} weight={700}>a fresh edge is exposed — self-sharpening</M>

      <Panel
        x={40}
        y={186}
        w={340}
        title="Choosing an abrasive"
        rows={[['must be', 'harder than the work'], ['must be', 'tough enough not to crumble'], ['bond', 'holds the grain, then lets go']]}
        accent={PURP}
      />

      <M x={640} y={38} size={12.5} fill={MUTED} weight={800}>cement: setting is a chemical reaction, not drying</M>
      {[0, 1, 2].map((i) => (
        <g key={i} className={`msmm-fade-in msmm-delay-${i + 1}`}>
          <rect x={440 + i * 150} y={62} width={126} height={104} rx={8} fill={SKY} stroke={TEAL} strokeWidth={1.8} />
          {[0, 1, 2].map((k) => (
            <circle key={k} cx={470 + i * 150 + k * 32} cy={96 + (k % 2) * 34} r={13 - i * 1.5} fill={WHITE} stroke={N} strokeWidth={1.8} />
          ))}
          {i > 0
            ? [0, 1].map((k) => (
                <circle key={`h${k}`} cx={486 + i * 150 + k * 32} cy={113} r={7 + i * 5} fill={AMBER} opacity={0.35} />
              ))
            : null}
          <M x={503 + i * 150} y={186} size={10.5} fill={MUTED}>{['particles in water', 'products grow out', 'interlock and stiffen'][i]}</M>
        </g>
      ))}

      <Card
        x={440}
        y={212}
        w={420}
        h={124}
        title="Why cement is used in compression"
        lines={['hydration products interlock — good in compression', 'the paste is weak and flaw-ridden in tension']}
        accent={RED}
        foot="hence reinforcement: steel takes every tensile stress"
        footTone={RED}
        linesY={58}
        lineH={22}
      />
      <M x={450} y={378} size={11.5} fill={MUTED} anchor="start">more water makes it workable now and weaker forever — the excess leaves pores behind</M>
    </Scene>
  )
}

export function TgAndTmFactorsScene() {
  const factors = [
    ['chain stiffness', 'rings, double bonds → both up'],
    ['side groups', 'bulky or polar → both up'],
    ['cross-linking', 'raises Tg, removes Tm'],
    ['molecular weight', 'longer chains → higher Tm'],
    ['branching', 'blocks packing → lowers Tm'],
  ]
  return (
    <Scene caption="Two transitions, not one melting point — and the same five features move both">
      <Axes
        x={60}
        y={300}
        w={380}
        h={230}
        xLabel="temperature"
        yLabel="modulus"
        tickLabels={[[186, 'Tg'], [356, 'Tm']]}
      />
      <Curve
        pts={[[64, 96], [150, 100], [186, 108], [206, 168], [240, 212], [320, 220], [356, 232], [386, 284], [432, 296]]}
        stroke={PURP}
        width={3.2}
        className="msmm-draw"
      />
      <Wire d="M186 300 L186 108" stroke={MUTED} width={1.4} dash="4 4" />
      <Wire d="M356 300 L356 232" stroke={MUTED} width={1.4} dash="4 4" />
      <M x={116} y={86} size={11} fill={PURP}>glassy</M>
      <M x={280} y={204} size={11} fill={PURP}>rubbery plateau</M>
      {/* Below the axis label row: Axes puts "temperature" at y+34 anchored to
          the right end, which is exactly where "crystals melt" used to sit. */}
      <M x={186} y={358} size={11.5} fill={AMBER} weight={800}>chains start moving</M>
      <M x={356} y={358} size={11.5} fill={RED} weight={800}>crystals melt</M>

      <M x={468} y={48} size={12} fill={MUTED} anchor="start">what raises them</M>
      {factors.map(([name, effect], i) => (
        <g key={name} className={`msmm-slide-in msmm-delay-${i}`}>
          <rect x={468} y={60 + i * 62} width={392} height={50} rx={8} fill={WHITE} stroke={TEAL} strokeWidth={1.8} />
          <M x={484} y={82 + i * 62} size={12} fill={N} anchor="start" weight={800}>{name}</M>
          <M x={484} y={100 + i * 62} size={11} fill={MUTED} anchor="start">{effect}</M>
        </g>
      ))}
      <M x={250} y={398} size={11.5} fill={MUTED}>amorphous polymers have Tg only — there is nothing crystalline to melt</M>
      <M x={250} y={424} size={12} fill={GREEN} weight={700}>service temperature must sit clear of whichever transition matters</M>
    </Scene>
  )
}

export function ThermoplasticVsThermosetScene() {
  const chain = (x, y, tone, i) => (
    <path
      key={`${x}-${y}-${i}`}
      d={`M${x} ${y} q 18 -16 36 0 q 18 16 36 0 q 18 -16 36 0`}
      fill="none"
      stroke={tone}
      strokeWidth={2.6}
    />
  )
  return (
    <Scene caption="Whether heat is reversible comes down to one question: are the chains tied together?">
      <rect x={40} y={56} width={380} height={170} rx={10} fill={SKY} stroke={BLUE} strokeWidth={2.2} />
      <L x={230} y={44} size={13} fill={BLUE}>thermoplastic — separate chains</L>
      {[0, 1, 2, 3].map((i) => chain(70 + (i % 2) * 20, 92 + i * 34, BLUE, i))}
      {[0, 1, 2].map((i) => (
        <M key={`s${i}`} x={300} y={106 + i * 34} size={10.5} fill={MUTED} anchor="start">⋯ secondary only</M>
      ))}

      <rect x={480} y={56} width={380} height={170} rx={10} fill={CREAM} stroke={RED} strokeWidth={2.2} />
      <L x={670} y={44} size={13} fill={RED}>thermoset — one tied network</L>
      {[0, 1, 2, 3].map((i) => chain(510 + (i % 2) * 20, 92 + i * 34, RED, i))}
      {[0, 1, 2].map((i) =>
        [0, 1, 2].map((k) => (
          <Wire key={`x${i}-${k}`} d={`M${540 + k * 72} ${100 + i * 34} L${540 + k * 72} ${124 + i * 34}`} stroke={N} width={2.4} />
        )),
      )}
      <M x={670} y={244} size={10.5} fill={N}>vertical bars are primary cross-links</M>

      <Wire d="M230 244 L230 290" stroke={AMBER} width={3} marker="url(#msmArrA)" />
      <Wire d="M670 266 L670 290" stroke={AMBER} width={3} marker="url(#msmArrA)" />
      <M x={450} y={266} size={12.5} fill={AMBER} weight={800}>heat</M>

      <Card
        x={40}
        y={300}
        w={380}
        h={140}
        title="chains disentangle and slide"
        lines={['softens, flows, can be moulded again', 'remelt and remould — scrap is a feedstock']}
        accent={GREEN}
        foot="reversible: no bond had to break"
        footTone={GREEN}
        linesY={58}
        lineH={22}
      />
      <Card
        x={480}
        y={300}
        w={380}
        h={140}
        title="the network has nothing to slide"
        lines={['holds its shape and stiffness, then chars', 'shaped once, at the moment it is cured']}
        accent={RED}
        foot="irreversible: softening would mean breaking bonds"
        footTone={RED}
        linesY={58}
        lineH={22}
      />
    </Scene>
  )
}

export function ElastomerAndFibreChainsScene() {
  return (
    <Scene caption="Rubber stretches because coils straighten — and returns because cross-links forbid sliding">
      <rect x={40} y={54} width={250} height={150} rx={10} fill={CREAM} stroke={GREEN} strokeWidth={2.2} />
      <L x={165} y={42} size={12.5} fill={GREEN}>unloaded — random coils</L>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M60 ${86 + i * 44} c 14 -20 28 20 42 0 c 14 -20 28 20 42 0 c 14 -20 28 20 42 0 c 14 -20 28 20 42 0`}
          fill="none"
          stroke={GREEN}
          strokeWidth={2.4}
        />
      ))}
      {[0, 1].map((i) => (
        <Dot key={`c${i}`} cx={124 + i * 84} cy={108 + i * 44} r={5} fill={RED} />
      ))}

      <Wire d="M306 130 L360 130" stroke={AMBER} width={3} marker="url(#msmArrA)" />
      <M x={333} y={116} size={11} fill={AMBER}>load</M>

      <rect x={376} y={54} width={330} height={150} rx={10} fill={SKY} stroke={GREEN} strokeWidth={2.2} />
      <L x={541} y={42} size={12.5} fill={GREEN}>loaded — coils pulled straight</L>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M392 ${86 + i * 44} l 298 0`} fill="none" stroke={GREEN} strokeWidth={2.4} />
      ))}
      {[0, 1].map((i) => (
        <Dot key={`c2${i}`} cx={470 + i * 140} cy={86 + i * 44} r={5} fill={RED} />
      ))}
      <M x={541} y={224} size={11} fill={RED}>red cross-links never let a chain slip past its neighbour</M>

      <path d="M690 240 Q 420 272 300 214" fill="none" stroke={GREEN} strokeWidth={2} strokeDasharray="6 4" markerEnd="url(#msmArrG)" />
      <M x={500} y={266} size={11.5} fill={GREEN} weight={700}>release: it recoils completely — strains of several hundred percent, fully recovered</M>

      <Panel
        x={40}
        y={300}
        w={390}
        title="Vulcanisation sets how far it can go"
        rows={[['few S links', 'soft, very extensible'], ['more S links', 'stiffer, less extensible'], ['too many', 'a hard thermoset, not a rubber']]}
        accent={AMBER}
      />
      <Card
        x={470}
        y={300}
        w={390}
        h={148}
        title="Fibres want the opposite"
        lines={['chains aligned along the axis, highly crystalline', 'high molecular weight and strong secondary bonds']}
        accent={PURP}
        foot="same molecules, opposite arrangement, opposite property"
        footTone={PURP}
        linesY={60}
        lineH={22}
      />
    </Scene>
  )
}

export function FourFamiliesSelectionScene() {
  const zones = [
    { cx: 300, cy: 140, rx: 96, ry: 44, label: 'metals', tone: BLUE },
    { cx: 196, cy: 226, rx: 78, ry: 40, label: 'polymers', tone: PURP },
    { cx: 336, cy: 232, rx: 66, ry: 36, label: 'ceramics', tone: TEAL },
    { cx: 262, cy: 96, rx: 62, ry: 30, label: 'composites', tone: AMBER },
  ]
  return (
    <Scene caption="Pick the family from the property you must have per unit of mass you can afford">
      <Axes x={120} y={300} w={330} h={250} xLabel="density" yLabel="strength" />
      {zones.map((z, i) => (
        <g key={z.label} className={`msmm-grow msmm-delay-${i}`}>
          <ellipse cx={z.cx} cy={z.cy} rx={z.rx} ry={z.ry} fill={z.tone} opacity={0.16} stroke={z.tone} strokeWidth={2.2} />
          <M x={z.cx} y={z.cy + 4} size={12} fill={z.tone} weight={800}>{z.label}</M>
        </g>
      ))}
      <Wire d="M130 292 L432 96" stroke={RED} width={2} dash="7 5" />
      <M x={432} y={84} size={11} fill={RED} anchor="end">strength per unit mass rises this way</M>

      <Panel
        x={500}
        y={54}
        w={360}
        title="Governing requirement → family"
        rows={[
          ['light and stiff', 'composite'],
          ['tough, formable, conductive', 'metal'],
          ['hot, hard, inert', 'ceramic'],
          ['cheap, light, insulating', 'polymer'],
          ['cyclic loading', 'metal or composite'],
        ]}
        accent={GREEN}
      />

      <Card
        x={500}
        y={270}
        w={360}
        h={170}
        title="The four questions worth asking first"
        lines={['what must it not do — the failure that ends it', 'how hot does it get in service', 'how is it going to be made', 'what does a kilogram of it cost']}
        accent={AMBER}
        linesY={58}
        lineH={26}
      />
      <M x={285} y={400} size={12} fill={MUTED}>no family wins outright —</M>
      <M x={285} y={424} size={12.5} fill={N} weight={800}>the requirement picks the family, not the other way round</M>
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
        <g key={String(st)} className={`msmm-slide-in msmm-delay-${i}`}>
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
      <g className="msmm-emerge">
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
  // Module 1 — Introduction, Crystalline Solids and Defects in Crystals
  'structure-property-chain': StructurePropertyChainScene,
  'metallic-bonding-consequences': MetallicBondingScene,
  'ceramic-bonding-and-brittleness': CeramicBrittlenessScene,
  'polymer-chain-structure': PolymerChainScene,
  'composite-structure-and-anisotropy': CompositeAnisotropyScene,
  'advanced-materials-families': AdvancedMaterialsScene,
  'unit-cell-concept': UnitCellConceptScene,
  'bcc-geometry': BccGeometryScene,
  'fcc-geometry': FccGeometryScene,
  'hcp-stacking': HcpStackingScene,
  'packing-factor-comparison': PackingFactorScene,
  'density-computation': DensityComputationScene,
  'bragg-diffraction': BraggDiffractionScene,
  'point-defect-types': PointDefectScene,
  'dislocation-motion': DislocationMotionScene,
  'grain-structure-and-defects': GrainStructureScene,
  // Module 2 — Microscopic Examination and Diffusion
  'same-composition-different-structure': SameCompositionScene,
  'preparation-sequence': PreparationSequenceScene,
  'resolution-vs-magnification': ResolutionMagnificationScene,
  'optical-microscope-path': OpticalMicroscopePathScene,
  'sem-imaging': SemImagingScene,
  'tem-thin-foil': TemThinFoilScene,
  'technique-selection-map': TechniqueSelectionMapScene,
  'grain-size-measurement': GrainSizeMeasurementScene,
  'diffusion-overview': DiffusionOverviewScene,
  'vacancy-diffusion-mechanism': VacancyDiffusionScene,
  'interstitial-diffusion': InterstitialDiffusionScene,
  'ficks-first-law': FicksFirstLawScene,
  'ficks-second-law-evolution': FicksSecondLawScene,
  'error-function-case-depth': ErrorFunctionCaseDepthScene,
  'diffusion-factors': DiffusionFactorsScene,
  'cycle-design-tradeoff': CycleDesignTradeoffScene,
  // Module 3 — Mechanical Properties of Metals
  'loading-modes': LoadingModesScene,
  'elastic-region-and-bonds': ElasticRegionAndBondsScene,
  'poisson-and-shear': PoissonAndShearScene,
  'tensile-curve-anatomy': TensileCurveAnatomyScene,
  'offset-yield-construction': OffsetYieldConstructionScene,
  'necking-instability': NeckingInstabilityScene,
  'ductility-measures': DuctilityMeasuresScene,
  'resilience-area': ResilienceAreaScene,
  'toughness-requires-both': ToughnessRequiresBothScene,
  'true-vs-engineering': TrueVsEngineeringScene,
  'hardness-test-comparison': HardnessTestComparisonScene,
  'grain-and-solute-strengthening': GrainAndSoluteStrengtheningScene,
  'cold-work-and-annealing': ColdWorkAndAnnealingScene,
  'fatigue-sn-and-fracture': FatigueSnAndFractureScene,
  'creep-curve-stages': CreepCurveStagesScene,
  'property-selection-by-duty': PropertySelectionByDutyScene,
  // Module 4 — Phase Diagrams and Phase Transformations
  'hume-rothery-conditions': HumeRotheryConditionsScene,
  'phase-and-unary-diagram': PhaseAndUnaryDiagramScene,
  'cu-ni-isomorphous-diagram': CuNiIsomorphousDiagramScene,
  'tie-line-and-lever-rule': TieLineAndLeverRuleScene,
  'coring-formation': CoringFormationScene,
  'isomorphous-property-curves': IsomorphousPropertyCurvesScene,
  'pb-sn-eutectic-diagram': PbSnEutecticDiagramScene,
  'eutectic-microstructures': EutecticMicrostructuresScene,
  'fe-fe3c-diagram': FeFe3CDiagramScene,
  'steel-microstructure-development': SteelMicrostructureDevelopmentScene,
  'two-lever-applications': TwoLeverApplicationsScene,
  'steel-and-iron-classification': SteelAndIronClassificationScene,
  'critical-radius-energy': CriticalRadiusEnergyScene,
  'ttt-diagram': TttDiagramScene,
  'cct-and-cooling-rates': CctAndCoolingRatesScene,
  'composition-plus-history': CompositionPlusHistoryScene,
  // Module 5 — Composites, Ceramics and Polymers
  'composite-classification-tree': CompositeClassificationTreeScene,
  'large-particle-composites': LargeParticleCompositesScene,
  'dispersion-strengthening': DispersionStrengtheningScene,
  'critical-fibre-length': CriticalFibreLengthScene,
  'orientation-and-fraction': OrientationAndFractionScene,
  'isostrain-derivation': IsostrainDerivationScene,
  'isostress-derivation': IsostressDerivationScene,
  'laminate-and-sandwich': LaminateAndSandwichScene,
  'ceramic-general-behaviour': CeramicGeneralBehaviourScene,
  'glass-structure-and-tempering': GlassStructureAndTemperingScene,
  'clay-firing-and-refractories': ClayFiringAndRefractoriesScene,
  'abrasives-and-cement-setting': AbrasivesAndCementSettingScene,
  'tg-and-tm-factors': TgAndTmFactorsScene,
  'thermoplastic-vs-thermoset': ThermoplasticVsThermosetScene,
  'elastomer-and-fibre-chains': ElastomerAndFibreChainsScene,
  'four-families-selection': FourFamiliesSelectionScene,
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


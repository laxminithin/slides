/**
 * AeaScenes — VTU BEE613D Electric Motor and Drive Systems for EVs classroom
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
    <div className={`aea-scene ${className}`} aria-label={caption || 'Analog Electronics and Linear Integrated Circuits diagram'}>
      <svg viewBox={vb} role="img" className="aea-svg">
        <defs>
          <marker id="aeaArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="aeaArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="aeaArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="aeaArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="aeaArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="aeaArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="aeaArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="aeaArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="aeaArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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
  if (tone === BLUE) return 'aeaArrB'
  if (tone === AMBER) return 'aeaArrA'
  if (tone === ROSE) return 'aeaArrRo'
  if (tone === GREEN) return 'aeaArrG'
  if (tone === PURP) return 'aeaArrP'
  if (tone === TEAL) return 'aeaArrT'
  if (tone === RED) return 'aeaArrR'
  if (tone === MUTED) return 'aeaArrM'
  return 'aeaArr'
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
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#aeaArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#aeaArr)" />
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
          className={`aeam-flux aeam-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`aeam-current aeam-delay-${i}`}
          marker="url(#aeaArrB)"
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
        <g key={t} className={`aeam-cell-in aeam-delay-${i}`}>
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
        <g key={String(p)} className={`aeam-cell-in aeam-delay-${i % 5}`}>
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

/* ── AEA-specific primitives ─────────────────────────────────────────── */

/* Scene helpers unique to Analog Electronics and Linear Integrated Circuits land here. Coerce every numeric
   prop through n() -- including width/length props, not just x and y. */


/* ── Module 1 ────────────────────────────────────────────────────────── */

export function M1BaseBiasAcEquivalentScene() {
  return (
    <Scene caption="Base Biased Amplifier: DC to AC Equivalent">
      <Card x="40" y="40" w="380" h="420" title="DC Schematic" />
      <L x="230" y="80" size="14" weight="800">VCC</L>
      <Wire d="M230 90 L230 120 L150 120 L150 160" stroke={BLUE} />
      <Wire d="M230 120 L310 120 L310 160" stroke={BLUE} />
      <Res x="150" y="196" orient="v" label="RB" />
      <Res x="310" y="196" orient="v" label="RC" />
      
      <Wire d="M230 265 L230 315" stroke={BLUE} width="4" />
      <Wire d="M150 290 L230 290" stroke={BLUE} />
      <Wire d="M230 275 L260 250 L310 250 L310 232" stroke={BLUE} />
      <Wire d="M230 305 L260 330 L260 390" stroke={BLUE} />
      <Wire d="M150 232 L150 290" stroke={BLUE} />
      
      <Wire d="M220 390 L260 390 M230 396 L250 396 M235 402 L245 402" stroke={N} />
      
      <g className="aeam-delete">
        <Wire d="M90 290 L135 290" stroke={BLUE} />
        <Wire d="M135 275 L135 305" stroke={BLUE} />
        <Wire d="M143 275 L143 305" stroke={BLUE} />
        <Wire d="M143 290 L150 290" stroke={BLUE} />
        <L x="120" y="270" size="12">C1</L>
      </g>
      
      <g className="aeam-delete">
        <Wire d="M310 250 L330 250" stroke={BLUE} />
        <Wire d="M330 235 L330 265" stroke={BLUE} />
        <Wire d="M338 235 L338 265" stroke={BLUE} />
        <Wire d="M338 250 L380 250" stroke={BLUE} />
        <L x="350" y="230" size="12">C2</L>
      </g>

      <Card x="460" y="40" w="400" h="420" title="AC Equivalent Circuit" />
      <Wire d="M490 380 L830 380" stroke={N} width="3" />
      <Res x="530" y="220" orient="v" label="RB" />
      <Res x="790" y="220" orient="v" label="RC" />
      <Block x="610" y="170" w="100" h="100" label="BJT AC Model" stroke={BLUE} />
      
      <Wire d="M530 256 L530 380" stroke={BLUE} />
      <Wire d="M790 256 L790 380" stroke={BLUE} />
      <Wire d="M530 184 L530 130 L610 130" stroke={BLUE} />
      <Wire d="M790 184 L790 130 L710 130" stroke={BLUE} />
      <Wire d="M660 270 L660 380" stroke={BLUE} />
      
      <L x="660" y="440" size="16" fill={BLUE} className="aeam-shift">Short DC sources & capacitors</L>
    </Scene>
  )
}

export function M1EmitterBiasAcModelScene() {
  return (
    <Scene caption="Emitter Biased Amplifier AC Model">
      <Card x="40" y="40" w="380" h="450" title="DC Circuit with CE Bypass" />
      <L x="230" y="80" size="14" weight="800">VCC</L>
      <Wire d="M230 90 L230 120 L150 120 L150 160" stroke={BLUE} />
      <Wire d="M230 120 L310 120 L310 160" stroke={BLUE} />
      <Res x="150" y="196" orient="v" label="RB" />
      <Res x="310" y="196" orient="v" label="RC" />
      
      <Wire d="M230 265 L230 315" stroke={BLUE} width="4" />
      <Wire d="M150 232 L150 290 L230 290" stroke={BLUE} />
      <Wire d="M310 232 L310 250 L260 250 L260 275 L230 275" stroke={BLUE} />
      <Wire d="M230 305 L260 330 L260 350" stroke={BLUE} />
      
      <Res x="260" y="386" orient="v" label="RE" className="aeam-delete" />
      
      <g className="aeam-pulse">
        <Wire d="M260 340 L340 340 L340 370" stroke={BLUE} />
        <Wire d="M330 370 L350 370" stroke={BLUE} />
        <Wire d="M330 378 L350 378" stroke={BLUE} />
        <Wire d="M340 378 L340 430" stroke={BLUE} />
        <L x="370" y="375" size="12">CE</L>
      </g>
      
      <Wire d="M260 422 L340 422" stroke={BLUE} />
      <Wire d="M250 430 L270 430 M255 435 L265 435 M258 440 L262 440" stroke={N} />
      <Wire d="M260 422 L260 430" stroke={N} />
      
      <Card x="460" y="40" w="400" h="450" title="AC Equivalent Circuit" />
      <Wire d="M490 380 L830 380" stroke={N} width="3" />
      <Res x="530" y="220" orient="v" label="RB" />
      <Res x="790" y="220" orient="v" label="RC" />
      <Block x="610" y="170" w="100" h="100" label="BJT AC Model" stroke={BLUE} />
      
      <Wire d="M530 256 L530 380" stroke={BLUE} />
      <Wire d="M790 256 L790 380" stroke={BLUE} />
      <Wire d="M530 184 L530 130 L610 130" stroke={BLUE} />
      <Wire d="M790 184 L790 130 L710 130" stroke={BLUE} />
      <Wire d="M660 270 L660 380" stroke={BLUE} />
      
      <L x="660" y="440" size="14" fill={BLUE}>Emitter bypass capacitor acts as an AC short</L>
    </Scene>
  )
}

export function M1SmallSignalCurveScene() {
  const curvePts = [
    [100, 400], [150, 395], [200, 380], [240, 350], [280, 300], [320, 220], [360, 100]
  ]
  return (
    <Scene caption="Small Signal vs Large Signal Operation">
      <Axes x="100" y="400" w="650" h="350" xLabel="VBE" yLabel="IC" />
      <Curve pts={curvePts} stroke={BLUE} width="3" />
      <Dot cx="280" cy="300" r="6" fill={ROSE} />
      <L x="300" y="300" fill={ROSE}>Q-point</L>
      
      <Wire d="M220 420 L360 140" stroke={TEAL} dash="6 6" />
      
      <g className="aeam-pulse">
        <Wave x="260" y="420" w="40" amp="15" cycles="1" stroke={GREEN} />
        <Wire d="M260 420 L260 340" stroke={MUTED} dash="4 4" />
        <Wire d="M300 420 L300 260" stroke={MUTED} dash="4 4" />
        <Wire d="M260 340 L60 340" stroke={MUTED} dash="4 4" />
        <Wire d="M300 260 L60 260" stroke={MUTED} dash="4 4" />
        <path d="M 60 340 Q 30 320 60 300 T 60 260" fill="none" stroke={GREEN} strokeWidth="2.5" />
      </g>
      
      <g className="aeam-delete">
        <Wave x="200" y="460" w="160" amp="30" cycles="1" stroke={AMBER} />
        <Wire d="M200 460 L200 380" stroke={MUTED} dash="4 4" />
        <Wire d="M360 460 L360 100" stroke={MUTED} dash="4 4" />
        <Wire d="M200 380 L60 380" stroke={MUTED} dash="4 4" />
        <Wire d="M360 100 L60 100" stroke={MUTED} dash="4 4" />
        <path d="M 60 380 Q -20 310 60 240 T 60 100" fill="none" stroke={AMBER} strokeWidth="2.5" />
      </g>
      
      <L x="600" y="150" size="15" fill={GREEN}>Small Signal: Linear, no distortion</L>
      <L x="600" y="180" size="15" fill={AMBER}>Large Signal: Hits curve, gets distorted</L>
    </Scene>
  )
}

export function M1BetaComparisonGraphScene() {
  const curvePts = [[100, 400], [200, 360], [300, 310], [400, 240], [500, 150]]
  return (
    <Scene caption="AC Beta vs DC Beta">
      <Axes x="100" y="400" w="600" h="300" xLabel="IB" yLabel="IC" />
      <Curve pts={curvePts} stroke={N} width="3" />
      <Dot cx="300" cy="310" r="6" fill={ROSE} />
      <L x="290" y="300" fill={ROSE}>Q</L>
      
      <g className="aeam-shift">
        <Wire d="M100 400 L300 310" stroke={BLUE} width="2" />
        <L x="240" y="440" size="14" fill={BLUE} anchor="start">DC Beta (hFE) = IC/IB</L>
      </g>
      
      <g className="aeam-pulse">
        <Wire d="M200 370 L400 250" stroke={TEAL} width="2" />
        <Wire d="M280 322 L320 322 L320 298" stroke={TEAL} width="2" />
        <L x="300" y="335" size="12" fill={TEAL}>ΔIB</L>
        <L x="330" y="310" size="12" fill={TEAL} anchor="start">ΔIC</L>
        <L x="420" y="240" size="14" fill={TEAL} anchor="start">AC Beta (hfe) = ΔIC / ΔIB</L>
      </g>
    </Scene>
  )
}

export function M1ReDerivationBlockScene() {
  return (
    <Scene caption="AC Resistance of The Emitter Diode">
      <Card x="250" y="40" w="400" h="200" title="Base-Emitter Junction" />
      <g className="aeam-pulse">
        <Wire d="M400 120 L450 150 L400 180 Z" fill={WHITE} stroke={BLUE} width="2" />
        <Wire d="M450 120 L450 180" stroke={BLUE} width="3" />
        <Wire d="M300 150 L400 150" stroke={BLUE} />
        <Wire d="M450 150 L600 150" stroke={BLUE} />
        <Wire d="M470 130 L550 130" stroke={RED} marker="url(#aeaArrR)" />
        <L x="510" y="120" fill={RED}>IE (DC)</L>
      </g>
      <Wave x="310" y="180" w="60" amp="15" cycles="1" stroke={GREEN} />
      <L x="340" y="210" fill={GREEN}>v_be (AC)</L>
      
      <g className="aeam-shift">
        <Card x="250" y="260" w="400" h="200" title="Dynamic Resistance Formula" />
        <M x="350" y="370" size="24" fill={N}>r_e' = </M>
        <rect x="420" y="340" width="80" height="30" fill={AMBER} opacity="0.3" rx="4" />
        <M x="460" y="360" size="24" fill={AMBER}>26mV</M>
        <Wire d="M420 370 L500 370" stroke={N} width="2" />
        <M x="460" y="390" size="24" fill={RED}>IE</M>
        
        <Wire d="M460 340 L460 300" stroke={AMBER} dash="4 4" />
        <L x="460" y="290" fill={AMBER}>Thermal Voltage at Room Temp</L>
      </g>
    </Scene>
  )
}

export function M1TwoModelsCompareScene() {
  return (
    <Scene caption="Two Transistor Models: r_e vs h-parameter">
      <Card x="40" y="40" w="380" h="300" title="Common-Emitter r_e Model" />
      <L x="90" y="120" size="14">Base</L>
      <L x="360" y="120" size="14">Collector</L>
      <L x="230" y="280" size="14">Emitter</L>
      
      <Wire d="M90 140 L160 140 L160 160" stroke={BLUE} />
      <Res x="160" y="196" orient="v" label="β * r_e'" tone={BLUE} />
      <Wire d="M160 232 L160 260 L310 260 L310 232" stroke={BLUE} />
      <Wire d="M310 140 L360 140" stroke={BLUE} />
      <Src cx="310" cy="180" r="15" kind="i" label="β * ib" dep={true} tone={BLUE} />
      <Wire d="M310 140 L310 165" stroke={BLUE} />
      <Wire d="M310 195 L310 232" stroke={BLUE} />
      <Wire d="M235 260 L235 290" stroke={BLUE} />
      
      <g className="aeam-shift">
        <Card x="480" y="40" w="380" h="300" title="Common-Emitter h-parameter Model" />
        <L x="530" y="120" size="14">Base</L>
        <L x="800" y="120" size="14">Collector</L>
        <L x="670" y="280" size="14">Emitter</L>
        
        <Wire d="M530 140 L550 140" stroke={BLUE} />
        <Res x="586" y="140" orient="h" label="h_ie" tone={BLUE} />
        <Wire d="M622 140 L650 140 L650 180" stroke={BLUE} />
        <Src cx="650" cy="195" r="15" kind="v" label="h_re * v_ce" dep={true} tone={BLUE} labelSide="right" />
        <Wire d="M650 210 L650 260 L780 260 L780 232" stroke={BLUE} />
        <Wire d="M780 140 L800 140" stroke={BLUE} />
        <Src cx="780" cy="180" r="15" kind="i" label="h_fe * ib" dep={true} tone={BLUE} />
        <Wire d="M780 140 L780 165" stroke={BLUE} />
        <Wire d="M780 195 L780 232" stroke={BLUE} />
        <Res x="710" y="196" orient="v" label="1 / h_oe" tone={BLUE} />
        <Wire d="M710 140 L710 160" stroke={BLUE} />
        <Wire d="M710 140 L780 140" stroke={BLUE} />
        <Wire d="M710 232 L710 260" stroke={BLUE} />
        <Wire d="M670 260 L670 290" stroke={BLUE} />
        
        <Wire d="M190 196 Q400 100 586 120" stroke={GREEN} dash="4 4" />
        <Wire d="M340 180 Q550 100 780 160" stroke={GREEN} dash="4 4" />
      </g>
    </Scene>
  )
}

export function M1AmplifierBlockModelScene() {
  return (
    <Scene caption="Analyzing Amplifier: Block Model">
      <g className="aeam-delete">
        <Card x="40" y="40" w="400" h="400" title="Complex AC Equivalent Circuit" />
        <Res x="150" y="200" orient="v" label="RB" />
        <Res x="250" y="200" orient="v" label="r_e'" />
        <Src cx="350" cy="200" r="15" kind="i" label="β*ib" dep={true} />
        <Res x="350" y="300" orient="v" label="RC" />
      </g>
      <g className="aeam-insert">
        <Card x="200" y="40" w="500" h="400" title="Three-Component Block Model" />
        <Wire d="M220 180 L280 180 L280 220" stroke={BLUE} />
        <Res x="280" y="256" orient="v" label="Zin" />
        <Wire d="M280 292 L280 340 L220 340" stroke={BLUE} />
        
        <Wire d="M680 180 L620 180 L620 220" stroke={BLUE} />
        <Res x="620" y="256" orient="v" label="Zout" />
        <Wire d="M620 292 L620 310" stroke={BLUE} />
        <Src cx="620" cy="325" r="15" kind="v" label="Av * Vin" dep={true} />
        <Wire d="M620 340 L680 340" stroke={BLUE} />
        
        <Block x="250" y="150" w="400" h="220" stroke={BLUE} dash="6 6" fill="transparent" />
        
        <Res x="740" y="256" orient="v" label="RL" />
        <Wire d="M680 180 L740 180 L740 220" stroke={N} />
        <Wire d="M680 340 L740 340 L740 292" stroke={N} />
      </g>
    </Scene>
  )
}

export function M1VoltageGainDerivationScene() {
  return (
    <Scene caption="Voltage Amplifiers: Voltage Gain">
      <Card x="40" y="40" w="820" h="200" title="Amplifier Path" />
      <Wave x="100" y="140" w="100" amp="30" cycles="1" stroke={BLUE} />
      <L x="150" y="180" fill={BLUE}>v_in</L>
      
      <Wire d="M220 140 L350 140" stroke={BLUE} marker="url(#aeaArrB)" />
      
      <Block x="370" y="100" w="160" h="80" label="Transistor (β)" stroke={BLUE} />
      
      <Wire d="M550 140 L680 140" stroke={BLUE} marker="url(#aeaArrB)" />
      
      <Wave x="700" y="140" w="100" amp="50" cycles="1" phase="3.14" stroke={RED} />
      <L x="750" y="200" fill={RED}>v_out</L>
      
      <g className="aeam-shift">
        <Card x="40" y="260" w="820" h="150" title="Mathematical Derivation" />
        <M x="150" y="340" size="16">v_in</M>
        <Wire d="M180 335 L240 335" stroke={N} marker="url(#aeaArr)" />
        <M x="330" y="340" size="16">i_b = v_in / (β*r_e')</M>
        <Wire d="M430 335 L490 335" stroke={N} marker="url(#aeaArr)" />
        <M x="560" y="340" size="16">i_c = β * i_b</M>
        <Wire d="M620 335 L680 335" stroke={N} marker="url(#aeaArr)" />
        <M x="750" y="340" size="16">v_out = -i_c * r_c</M>
      </g>
      
      <g className="aeam-pulse">
        <M x="450" y="450" size="24" fill={GREEN}>Av = -r_c / r_e'</M>
      </g>
    </Scene>
  )
}

export function M1CascadeGainBlocksScene() {
  return (
    <Scene caption="Multistage Amplifiers: Cascade Gain">
      <Block x="150" y="150" w="200" h="150" label="" stroke={BLUE} />
      <L x="250" y="130" size="16">Stage 1</L>
      <Block x="500" y="150" w="200" h="150" label="" stroke={BLUE} />
      <L x="600" y="130" size="16">Stage 2</L>
      
      <M x="200" y="225">A1</M>
      <M x="280" y="225">Zout1</M>
      <M x="540" y="225">Zin2</M>
      <M x="650" y="225">A2</M>
      
      <Wire d="M220 220 L250 220" stroke={BLUE} />
      <Wire d="M310 220 L510 220" stroke={BLUE} />
      <Wire d="M570 220 L620 220" stroke={BLUE} />
      <Wire d="M150 220 L180 220" stroke={BLUE} />
      <Wire d="M670 220 L700 220" stroke={BLUE} />
      
      <Wire d="M250 200 L310 200 L310 240 L250 240 Z" fill={WHITE} stroke={BLUE} />
      <Wire d="M510 200 L570 200 L570 240 L510 240 Z" fill={WHITE} stroke={BLUE} />
      <Wire d="M180 240 L220 240 L200 180 Z" fill={WHITE} stroke={BLUE} width="2" />
      <Wire d="M630 240 L670 240 L650 180 Z" fill={WHITE} stroke={BLUE} width="2" />
      
      <g className="aeam-pulse">
        <Wire d="M50 220 L150 220" stroke={GREEN} width="3" marker="url(#aeaArrG)" />
        <L x="100" y="200" fill={GREEN}>1mV</L>
        <Wire d="M700 220 L800 220" stroke={GREEN} width="3" marker="url(#aeaArrG)" />
      </g>
      
      <g className="aeam-shift">
        <Wire d="M240 190 L320 190 L320 250 L240 250 Z" fill="none" stroke={RED} dash="4 4" />
        <Wire d="M500 190 L580 190 L580 250 L500 250 Z" fill="none" stroke={RED} dash="4 4" />
        <Wire d="M280 190 Q410 80 540 190" stroke={RED} dash="4 4" marker="url(#aeaArrR)" />
        <L x="410" y="70" fill={RED}>Voltage Divider (Loading Effect)</L>
        
        <M x="425" y="380" size="24" fill={BLUE}>A_total = A1 * A2</M>
      </g>
    </Scene>
  )
}

export function M1CcAmplifierSchematicScene() {
  return (
    <Scene caption="CC Amplifier (Emitter Follower)">
      <Card x="250" y="40" w="400" h="350" title="Common-Collector Circuit" />
      <L x="450" y="90" size="14" weight="800">VCC (AC Ground)</L>
      <Wire d="M450 100 L450 140" stroke={BLUE} />
      
      <Wire d="M430 175 L430 225" stroke={BLUE} width="4" />
      <Wire d="M380 200 L430 200" stroke={BLUE} />
      <Wire d="M430 185 L450 165 L450 140" stroke={BLUE} />
      <Wire d="M430 215 L450 235 L450 270" stroke={BLUE} />
      
      <Wire d="M300 200 L380 200" stroke={BLUE} />
      <L x="300" y="190" fill={BLUE} anchor="end">Vin</L>
      
      <Wire d="M450 270 L550 270" stroke={BLUE} />
      <L x="560" y="270" fill={BLUE} anchor="start">Vout</L>
      
      <Res x="450" y="306" orient="v" label="RE" />
      <Wire d="M450 342 L450 360" stroke={N} />
      <Wire d="M440 360 L460 360 M445 365 L455 365 M448 370 L452 370" stroke={N} />
      
      <g className="aeam-pulse">
        <Wave x="200" y="200" w="80" amp="20" cycles="1" stroke={GREEN} />
        <L x="240" y="170" fill={GREEN}>1V</L>
        <Wave x="600" y="270" w="80" amp="19.8" cycles="1" stroke={GREEN} />
        <L x="640" y="240" fill={GREEN}>0.99V</L>
        <L x="450" y="420" size="20" fill={GREEN}>Av ≈ 1, no phase shift</L>
      </g>
    </Scene>
  )
}

export function M1OutputImpedanceCompareScene() {
  return (
    <Scene caption="Output Impedance: CE vs CC">
      <Card x="40" y="40" w="380" h="400" title="CE Output Model" />
      <Src cx="150" cy="180" r="20" kind="v" label="Av*Vin" />
      <Wire d="M150 140 L150 160" stroke={BLUE} />
      <Res x="150" y="104" orient="v" label="Large Zout" />
      <Wire d="M150 68 L150 50 L300 50" stroke={BLUE} />
      <Wire d="M150 200 L150 350 L300 350" stroke={BLUE} />
      
      <g className="aeam-insert">
        <Wire d="M300 50 L300 134" stroke={N} />
        <Res x="300" y="170" orient="v" label="Heavy RL" />
        <Wire d="M300 206 L300 350" stroke={N} />
        <L x="350" y="170" fill={RED}>Voltage Drops!</L>
        <Wire d="M280 180 L280 200 L270 190 M280 200 L290 190" stroke={RED} width="2" />
      </g>
      
      <Card x="460" y="40" w="400" h="400" title="CC Output Model" />
      <Src cx="570" cy="180" r="20" kind="v" label="1*Vin" />
      <Wire d="M570 140 L570 160" stroke={BLUE} />
      <Wire d="M570 140 L570 120 L560 115 L580 105 L560 95 L580 85 L570 80 L570 50 L720 50" stroke={BLUE} width="2" />
      <L x="530" y="100" fill={BLUE}>Tiny Zout</L>
      <Wire d="M570 200 L570 350 L720 350" stroke={BLUE} />
      
      <g className="aeam-insert">
        <Wire d="M720 50 L720 134" stroke={N} />
        <Res x="720" y="170" orient="v" label="Heavy RL" />
        <Wire d="M720 206 L720 350" stroke={N} />
        <L x="770" y="170" fill={GREEN}>Voltage Stable</L>
      </g>
    </Scene>
  )
}

export function M1CeCcCascadeScene() {
  return (
    <Scene caption="Cascading CE and CC Amplifiers">
      <Block x="150" y="150" w="200" h="120" label="CE Stage" sub="High Av, High Zout" stroke={BLUE} />
      <Block x="450" y="150" w="200" h="120" label="CC Stage" sub="Av=1, Low Zout" stroke={BLUE} />
      
      <Wire d="M350 210 L450 210" stroke={BLUE} />
      <Wire d="M650 210 L750 210" stroke={BLUE} />
      
      <Wire d="M750 190 L770 190 L790 170 L790 250 L770 230 L750 230 Z" fill={WHITE} stroke={N} width="2" />
      <L x="770" y="270" size="12">Speaker (8Ω)</L>
      
      <g className="aeam-pulse">
        <Wave x="50" y="210" w="80" amp="10" cycles="1" stroke={GREEN} width="2" />
        <Wave x="360" y="210" w="80" amp="40" cycles="1" stroke={AMBER} width="2" />
        <L x="400" y="160" fill={AMBER}>Voltage Boost</L>
        <Wave x="660" y="210" w="80" amp="40" cycles="1" stroke={RED} width="6" />
        <L x="700" y="160" fill={RED}>Current Boost</L>
      </g>
    </Scene>
  )
}

export function M1DarlingtonPairDiagramScene() {
  return (
    <Scene caption="Darlington Pair">
      <rect x="150" y="80" width="280" height="290" fill={SKY} stroke={BLUE} strokeDasharray="6 6" />
      
      <Wire d="M200 120 L200 180" stroke={BLUE} width="4" />
      <Wire d="M100 150 L200 150" stroke={BLUE} />
      <Wire d="M200 130 L250 100 L250 50" stroke={BLUE} />
      <Wire d="M200 170 L250 200 L250 250 L300 250" stroke={BLUE} />
      
      <Wire d="M300 220 L300 280" stroke={BLUE} width="4" />
      <Wire d="M300 230 L350 200 L350 50" stroke={BLUE} />
      <Wire d="M300 270 L350 300 L350 350 L460 350" stroke={BLUE} />
      
      <Wire d="M250 50 L460 50" stroke={BLUE} />
      
      <L x="80" y="155" size="14">Base</L>
      <L x="480" y="55" size="14" anchor="start">Collector</L>
      <L x="480" y="355" size="14" anchor="start">Emitter</L>
      
      <g className="aeam-shift">
        <M x="630" y="150" size="24" fill={RED}>Total β = β1 × β2</M>
      </g>
      
      <g className="aeam-pulse">
        <Wire d="M180 160 L180 200 L280 200 L280 260 L330 260 L330 310" stroke={GREEN} dash="4 4" />
        <M x="630" y="250" size="20" fill={GREEN}>VBE(total) = VBE1 + VBE2 ≈ 1.4V</M>
      </g>
    </Scene>
  )
}

export function M1SeriesRegulatorCircuitScene() {
  return (
    <Scene caption="Series Transistor Voltage Regulator">
      <Wire d="M100 150 L200 150" stroke={BLUE} />
      <L x="100" y="140" size="14">Vin (Raw DC)</L>
      
      <Wire d="M100 380 L500 380" stroke={N} />
      <Wire d="M150 380 L150 395 M140 395 L160 395 M145 400 L155 400" stroke={N} />
      
      <Wire d="M200 150 L200 200" stroke={BLUE} />
      <Res x="200" y="236" orient="v" label="R" />
      <Wire d="M200 272 L300 272" stroke={BLUE} />
      
      <Wire d="M200 272 L200 320" stroke={BLUE} />
      <Wire d="M180 340 L220 340 L200 320 Z" fill={WHITE} stroke={BLUE} width="2" />
      <Wire d="M180 320 L220 320 M180 320 L180 315 M220 320 L220 325" stroke={BLUE} width="2" />
      <Wire d="M200 340 L200 380" stroke={BLUE} />
      <L x="160" y="340">Zener</L>
      
      <Wire d="M300 242 L300 302" stroke={BLUE} width="4" />
      <Wire d="M300 257 L350 220 L350 150 L200 150" stroke={BLUE} />
      <Wire d="M300 287 L350 320 L500 320" stroke={BLUE} />
      
      <Res x="450" y="350" orient="v" label="Load" />
      
      <L x="510" y="325" size="14" anchor="start">Vout</L>
      
      <g className="aeam-pulse">
        <Wire d="M80 120 L120 100 L160 120" stroke={RED} width="2" fill="none" />
        <L x="120" y="90" fill={RED}>Input Spike</L>
        
        <Dot cx="200" cy="272" r="6" fill={GREEN} />
        <L x="220" y="290" fill={GREEN} anchor="start">Base Steady</L>
        
        <Wire d="M370 160 L370 310" stroke={RED} />
        <Wire d="M370 160 L365 170 M370 160 L375 170" stroke={RED} />
        <Wire d="M370 310 L365 300 M370 310 L375 300" stroke={RED} />
        <L x="380" y="240" fill={RED} anchor="start">VCE absorbs spike</L>
        
        <Wire d="M510 320 L580 320" stroke={GREEN} width="2" />
        <L x="550" y="310" fill={GREEN}>Perfectly Flat</L>
      </g>
    </Scene>
  )
}

export function M1CommonBaseCircuitScene() {
  return (
    <Scene caption="The Common-Base Amplifier">
      <Wire d="M300 220 L300 280" stroke={BLUE} width="4" />
      <Wire d="M300 250 L300 320" stroke={BLUE} />
      <Wire d="M290 320 L310 320 M295 325 L305 325 M298 330 L302 330" stroke={N} />
      
      <Wire d="M300 270 L250 270" stroke={BLUE} />
      <Wire d="M300 230 L350 230" stroke={BLUE} />
      
      <Res x="214" y="270" orient="h" label="RE" />
      <Wire d="M178 270 L140 270" stroke={BLUE} />
      <L x="130" y="275">Vin</L>
      
      <Res x="350" y="194" orient="v" label="RC" />
      <Wire d="M350 158 L350 130" stroke={BLUE} />
      <L x="350" y="120" weight="800">VCC</L>
      
      <Wire d="M350 230 L450 230" stroke={BLUE} />
      <L x="460" y="235">Vout</L>
      
      <g className="aeam-pulse">
        <Wave x="60" y="270" w="60" amp="10" cycles="1" stroke={GREEN} />
        <L x="90" y="240" fill={GREEN}>10mV</L>
        
        <Wave x="500" y="230" w="80" amp="40" cycles="1" stroke={GREEN} />
        <L x="540" y="290" fill={GREEN}>1V (Non-inverted)</L>
        
        <L x="300" y="420" size="20" fill={GREEN}>Low Zin, High Av, No Phase Shift</L>
      </g>
    </Scene>
  )
}

/* ── Module 2 ────────────────────────────────────────────────────────── */

export function M2Mosfet({ x, y, tone = '#152430', className = '', label }) {
  const X = Number(x)
  const Y = Number(y)
  return (
    <g transform={`translate(${X},${Y})`} className={className}>
      <path d="M -25 0 L -6 0" fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M -6 -16 L -6 16" fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 2 -16 L 2 -6 M 2 -4 L 2 4 M 2 6 L 2 16" fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 2 -12 L 15 -12 L 15 -30" fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 2 12 L 15 12 L 15 30" fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 2 0 L 15 0 L 15 12" fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 15 22 L 19 16 L 11 16 Z" fill={tone} />
      {label && <text x="30" y="0" textAnchor="middle" fontSize="13" fontWeight="700" fill={tone} fontFamily="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace">{label}</text>}
    </g>
  )
}

export function M2FixedVgsScene() {
  const pts1 = []
  for(let vgs = 2; vgs <= 5.5; vgs += 0.1) {
    pts1.push([150 + vgs * 100, 450 - 0.5 * Math.pow(vgs - 2, 2) * 40])
  }
  const pts2 = []
  for(let vgs = 1.5; vgs <= 5; vgs += 0.1) {
    pts2.push([150 + vgs * 100, 450 - 0.55 * Math.pow(vgs - 1.5, 2) * 40])
  }
  return (
    <Scene caption="Manufacturing spread causes huge drain current variations with fixed VGS bias">
      <Axes x={150} y={450} w={600} h={350} xLabel="VGS" yLabel="ID" />
      <g className="aeam-fade-in"><Curve pts={pts1} stroke={BLUE} /></g>
      <g className="aeam-fade-in aeam-delay-2">
        <Wire d="M 550 450 L 550 370 L 150 370" dash="6 4" stroke={BLUE} />
        <Dot cx={550} cy={370} fill={BLUE} />
        <M x={550} y={470} fill={BLUE}>VGS(fix)</M>
        <M x={120} y={375} fill={BLUE}>ID1</M>
      </g>
      <g className="aeam-fade-in aeam-delay-4">
        <Curve pts={pts2} stroke={AMBER} />
        <Wire d="M 550 370 L 550 312.5 L 150 312.5" dash="6 4" stroke={AMBER} />
        <Dot cx={550} cy={312.5} fill={AMBER} />
        <M x={120} y={317.5} fill={AMBER}>ID2</M>
      </g>
      <g className="aeam-fade-in aeam-delay-1"><M x={700} y={230} fill={BLUE} anchor="start">Device 1</M></g>
      <g className="aeam-fade-in aeam-delay-5"><M x={650} y={150} fill={AMBER} anchor="start">Device 2</M></g>
    </Scene>
  )
}

export function M2VoltageDividerScene() {
  return (
    <Scene caption="Source degeneration provides negative feedback against ID variations">
      <Wire d="M 270 120 L 440 120" stroke={N} />
      <M x={355} y={110} fill={N}>VDD</M>
      <Wire d="M 270 380 L 440 380" stroke={N} />
      <path d="M 340 380 L 370 380 L 355 400 Z" fill={N} />
      <Res x={300} y={185} len={130} orient="v" label="R1" />
      <Res x={300} y={315} len={130} orient="v" label="R2" />
      <Wire d="M 300 250 L 375 250" stroke={N} />
      <Dot cx={300} cy={250} />
      <M x={280} y={250}>VG</M>
      <Res x={415} y={170} len={100} orient="v" label="RD" />
      <Res x={415} y={330} len={100} orient="v" label="RS" />
      <M2Mosfet x={400} y={250} />
      <Dot cx={415} cy={280} />
      <M x={440} y={285}>VS</M>
      <g className="aeam-fade-in aeam-delay-2">
        <Wire d="M 450 170 L 450 140" stroke={RED} marker="url(#aeaArrR)" />
        <M x={465} y={160} fill={RED}>ID UP</M>
      </g>
      <g className="aeam-fade-in aeam-delay-3">
        <Wire d="M 450 330 L 450 300" stroke={RED} marker="url(#aeaArrR)" />
        <M x={485} y={320} fill={RED}>VS UP</M>
      </g>
      <g className="aeam-fade-in aeam-delay-4">
        <Wire d="M 340 270 L 340 290" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x={340} y={305} fill={BLUE}>VGS DOWN</M>
      </g>
      <g className="aeam-fade-in aeam-delay-5">
        <Wire d="M 475 200 L 475 220" stroke={GREEN} marker="url(#aeaArrG)" />
        <M x={495} y={215} fill={GREEN}>ID DOWN</M>
      </g>
    </Scene>
  )
}

export function M2DrainGateFeedbackScene() {
  return (
    <Scene caption="Drain-to-gate feedback resistor forces VGS = VDS, ensuring saturation">
      <Wire d="M 440 120 L 490 120" stroke={N} />
      <M x={465} y={110} fill={N}>VDD</M>
      <Res x={465} y={185} len={130} orient="v" label="RD" />
      <M2Mosfet x={450} y={280} />
      <Wire d="M 465 310 L 465 360" stroke={N} />
      <path d="M 450 360 L 480 360 L 465 380 Z" fill={N} />
      <Dot cx={465} cy={250} />
      <Wire d="M 465 250 L 465 210 L 420 210" stroke={N} />
      <Res x={380} y={210} len={80} orient="h" label="RG" />
      <Wire d="M 340 210 L 300 210 L 300 280 L 425 280" stroke={N} />
      <Dot cx={300} cy={280} />
      <M x={485} y={260}>VD</M>
      <M x={280} y={285}>VG</M>
      <g className="aeam-fade-in aeam-delay-2">
        <Wire d="M 320 210 L 350 210" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x={335} y={195} fill={BLUE}>IG = 0</M>
      </g>
      <g className="aeam-fade-in aeam-delay-4">
        <Wire d="M 380 230 L 380 260 L 400 260" stroke={RED} marker="url(#aeaArrR)" />
        <M x={430} y={265} fill={RED}>VRG = 0</M>
      </g>
      <g className="aeam-fade-in aeam-delay-6">
        <Wire d="M 465 250 L 465 210 L 420 210" stroke={AMBER} width={6} opacity={0.4} />
        <Wire d="M 340 210 L 300 210 L 300 280 L 425 280" stroke={AMBER} width={6} opacity={0.4} />
        <M x={380} y={150} fill={AMBER}>VG = VD</M>
        <M x={380} y={170} fill={AMBER}>(VGS = VDS)</M>
      </g>
    </Scene>
  )
}

export function M2SmallSignalSuperpositionScene() {
  const pts = []
  for(let vgs = 2; vgs <= 6.5; vgs += 0.1) {
    pts.push([300 + vgs * 50, 400 - 0.5 * Math.pow(vgs - 2, 2) * 40])
  }
  return (
    <Scene caption="A small AC signal rides on top of the DC Q-point, moving along the linear tangent">
      <Axes x={300} y={400} w={400} h={300} xLabel="vGS" yLabel="iD" />
      <Curve pts={pts} stroke={N} />
      <g className="aeam-fade-in aeam-delay-1">
        <Wire d="M 500 400 L 500 320 L 300 320" dash="4 4" stroke={MUTED} />
        <Dot cx={500} cy={320} fill={BLUE} r={6} />
        <M x={535} y={315} fill={BLUE}>Q-point</M>
        <M x={500} y={420} fill={MUTED}>VGS_Q</M>
        <M x={260} y={325} fill={MUTED}>ID_Q</M>
      </g>
      <g className="aeam-fade-in aeam-delay-3">
        <Wire d="M 400 480 L 600 160" stroke={AMBER} dash="4 4" />
        <M x={620} y={150} fill={AMBER}>Tangent (gm)</M>
      </g>
      <g className="aeam-fade-in aeam-delay-5">
        <g transform="translate(500, 420) rotate(90)">
          <Wave x={0} y={0} w={80} amp={20} cycles={1.5} stroke={GREEN} />
        </g>
        <M x={460} y={480} fill={GREEN}>v_gs(t)</M>
        <g transform="translate(280, 320) rotate(180)">
          <Wave x={0} y={0} w={120} amp={40} cycles={1.5} stroke={RED} />
        </g>
        <M x={130} y={325} fill={RED}>i_d(t)</M>
        <Wire d="M 520 420 L 520 288 L 280 288" dash="2 2" stroke={MUTED} opacity={0.5} />
        <Wire d="M 480 420 L 480 352 L 280 352" dash="2 2" stroke={MUTED} opacity={0.5} />
      </g>
    </Scene>
  )
}

export function M2DrainCurrentExpansionScene() {
  return (
    <Scene caption="Discarding the squared small-signal term linearizes the amplifier">
      <Block x={150} y={120} w={600} h={300} stroke={BLUE} />
      <g className="aeam-fade-in aeam-delay-1">
        <M x={450} y={170} size={18}>i_D = k(VGS + v_gs - Vt)^2</M>
      </g>
      <g className="aeam-fade-in aeam-delay-2">
        <M x={450} y={220} size={18}>i_D = k((VGS - Vt) + v_gs)^2</M>
      </g>
      <g className="aeam-fade-in aeam-delay-3">
        <M x={450} y={270} size={18}>i_D = k(VGS - Vt)^2 + 2k(VGS - Vt)v_gs + k(v_gs)^2</M>
      </g>
      <g className="aeam-fade-in aeam-delay-5">
        <Wire d="M 640 255 L 700 285" stroke={RED} width={3} />
        <Wire d="M 640 285 L 700 255" stroke={RED} width={3} />
        <M x={670} y={315} fill={RED} size={13}>negligible for small signals</M>
      </g>
      <g className="aeam-fade-in aeam-delay-6">
        <rect x="420" y="245" width="210" height="36" fill="none" stroke={GREEN} strokeWidth="2" rx="6" />
        <M x={525} y={315} fill={GREEN} size={13}>Linear AC term (gm * v_gs)</M>
      </g>
    </Scene>
  )
}

export function M2VoltageGainWaveformsScene() {
  return (
    <Scene caption="Common-source voltage gain is inherently negative (180 deg phase shift)">
      <g className="aeam-fade-in">
        <Wire d="M 230 100 L 300 100" stroke={N} />
        <M x={265} y={90}>VDD</M>
        <Res x={265} y={185} len={130} orient="v" label="RD" />
        <M2Mosfet x={250} y={280} />
        <Wire d="M 265 310 L 265 400" stroke={N} />
        <Wire d="M 120 400 L 300 400" stroke={N} />
        <path d="M 250 400 L 280 400 L 265 420 Z" fill={N} />
        <Src cx={150} cy={340} r={21} kind="v" label="v_gs" labelSide="left" />
        <Wire d="M 150 319 L 150 280 L 225 280" stroke={N} />
        <Wire d="M 150 361 L 150 400" stroke={N} />
        <Dot cx={265} cy={250} />
        <M x={295} y={250} fill={BLUE}>v_ds</M>
      </g>
      <g className="aeam-fade-in aeam-delay-2">
        <Axes x={500} y={200} w={300} h={100} yLabel="v_gs" />
        <Wave x={500} y={150} w={250} amp={30} cycles={2} phase={0} stroke={GREEN} className="aeam-draw" />
      </g>
      <g className="aeam-fade-in aeam-delay-2">
        <Axes x={500} y={400} w={300} h={150} yLabel="v_ds" />
        <Wave x={500} y={325} w={250} amp={75} cycles={2} phase={Math.PI} stroke={RED} className="aeam-draw" />
      </g>
    </Scene>
  )
}

export function M2HybridPiEquivalentScene() {
  return (
    <Scene caption="The small-signal model replaces the physical device with linear equivalents">
      <style>{`
        @keyframes m2FadeOut { to { opacity: 0.15; filter: grayscale(1); } }
        .m2-fade-out { animation: m2FadeOut 1s 1.5s forwards ease-in-out; }
      `}</style>
      <g className="m2-fade-out">
        <M2Mosfet x={250} y={260} />
        <M x={210} y={260}>G</M>
        <M x={265} y={215}>D</M>
        <M x={265} y={305}>S</M>
      </g>
      <g className="aeam-fade-in aeam-delay-3">
        <Wire d="M 450 200 L 520 200" stroke={N} />
        <Dot cx={450} cy={200} fill={N} />
        <M x={430} y={200}>G</M>
        <Wire d="M 520 320 L 780 320" stroke={N} />
        <Dot cx={520} cy={320} fill={N} />
        <M x={520} y={345}>S</M>
        <Wire d="M 520 220 L 520 300" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x={500} y={265} fill={BLUE}>v_gs</M>
        <M x={520} y={215} fill={BLUE}>+</M>
        <M x={520} y={315} fill={BLUE}>-</M>
      </g>
      <g className="aeam-fade-in aeam-delay-4">
        <Src cx={650} cy={260} r={24} kind="i" dep={true} tone={RED} />
        <M x={600} y={265} fill={RED}>gm*v_gs</M>
        <Wire d="M 650 200 L 650 236" stroke={N} />
        <Wire d="M 650 284 L 650 320" stroke={N} />
        <Wire d="M 650 200 L 750 200" stroke={N} />
        <Dot cx={750} cy={200} />
        <M x={770} y={200}>D</M>
      </g>
      <g className="aeam-fade-in aeam-delay-5">
        <Res x={750} y={260} len={120} orient="v" label="ro" />
      </g>
    </Scene>
  )
}

export function M2TransconductanceSlopeScene() {
  const pts = []
  for(let vgs = 2; vgs <= 6; vgs += 0.1) {
    pts.push([200 + vgs * 70, 350 - 0.5 * Math.pow(vgs - 2, 2) * 40])
  }
  return (
    <Scene caption="Transconductance (gm) is the slope of the transfer characteristic at the Q-point">
      <Axes x={200} y={350} w={500} h={250} xLabel="VGS" yLabel="ID" />
      <g className="aeam-fade-in">
        <Curve pts={pts} stroke={BLUE} />
        <Wire d="M 550 350 L 550 170 L 200 170" dash="4 4" stroke={MUTED} />
        <Dot cx={550} cy={170} fill={BLUE} />
        <M x={550} y={370}>VGS_Q</M>
        <M x={160} y={175}>ID_Q</M>
      </g>
      <g className="aeam-fade-in aeam-delay-2">
        <Wire d="M 440 358 L 600 84.5" stroke={AMBER} width={3} />
        <M x={620} y={75} fill={AMBER} anchor="start">gm = d(ID) / d(VGS)</M>
      </g>
      <g className="aeam-fade-in aeam-delay-4">
        <Block x={200} y={400} w={500} h={100} stroke={MUTED} />
        <M x={450} y={430} size={15}>gm = k_n'(W/L)(VGS - Vth)</M>
      </g>
      <g className="aeam-fade-in aeam-delay-5">
        <M x={450} y={455} size={15}>gm = sqrt(2 k_n'(W/L) ID)</M>
      </g>
      <g className="aeam-fade-in aeam-delay-6">
        <M x={450} y={480} size={15}>gm = 2 ID / (VGS - Vth)</M>
      </g>
    </Scene>
  )
}

export function M2TModelCircuitScene() {
  return (
    <Scene caption="The T-model simplifies analysis when a source resistor is present">
      <g className="aeam-fade-in">
        <Wire d="M 300 200 L 500 200" stroke={N} />
        <M x={280} y={200}>G</M>
        <M x={520} y={200}>D</M>
        <Wire d="M 300 350 L 500 350" stroke={N} />
        <M x={400} y={375}>S</M>
      </g>
      <g className="aeam-fade-in aeam-delay-2">
        <Res x={300} y={275} len={150} orient="v" label="1/gm" />
      </g>
      <g className="aeam-fade-in aeam-delay-3">
        <Src cx={500} cy={275} r={24} kind="i" dep={true} tone={RED} />
        <M x={570} y={280} fill={RED}>i = gm*v_gs</M>
      </g>
      <g className="aeam-fade-in aeam-delay-4">
        <M x={400} y={150} fill={BLUE}>i(1/gm) = dependent source current</M>
        <Wire d="M 380 160 L 320 230" stroke={BLUE} marker="url(#aeaArrB)" />
      </g>
    </Scene>
  )
}

export function M2AmplifierTopologyScene() {
  return (
    <Scene caption="The three fundamental MOSFET amplifier topologies">
      <g className="aeam-fade-in">
        <M2Mosfet x={200} y={250} />
        <M2Mosfet x={450} y={250} />
        <M2Mosfet x={700} y={250} />
      </g>
      <g className="aeam-slide-in aeam-delay-2">
        <Wire d="M 215 280 L 215 320" stroke={N} />
        <path d="M 200 320 L 230 320 L 215 340 Z" fill={N} />
      </g>
      <g className="aeam-slide-in aeam-delay-3">
        <Wire d="M 175 250 L 140 250 L 140 320" stroke={N} />
        <path d="M 125 320 L 155 320 L 140 340 Z" fill={N} />
      </g>
      <g className="aeam-slide-in aeam-delay-4">
        <Wire d="M 715 220 L 715 180" stroke={N} />
        <path d="M 700 180 L 730 180 L 715 160 Z" fill={N} />
        <M x={745} y={170}>AC Gnd</M>
      </g>
      <g className="aeam-fade-in aeam-delay-6">
        <M x={140} y={250} fill={GREEN}>IN</M>
        <M x={250} y={200} fill={RED}>OUT</M>
        <L x={200} y={380} size={15} weight={700} fill={BLUE}>Common Source</L>
        <M x={450} y={310} fill={GREEN}>IN</M>
        <M x={500} y={200} fill={RED}>OUT</M>
        <L x={450} y={380} size={15} weight={700} fill={BLUE}>Common Gate</L>
        <M x={640} y={250} fill={GREEN}>IN</M>
        <M x={750} y={300} fill={RED}>OUT</M>
        <L x={700} y={380} size={15} weight={700} fill={BLUE}>Common Drain</L>
      </g>
    </Scene>
  )
}

export function M2AmplifierBlackBoxScene() {
  return (
    <Scene caption="The Thevenin equivalent abstracts the amplifier into Rin, Rout, and open-circuit gain">
      <g className="aeam-fade-in">
        <rect x={350} y={150} width={300} height={200} fill="none" stroke={N} strokeWidth={3} strokeDasharray="8 4" rx={8} />
        <L x={500} y={135} size={16} fill={N}>Amplifier</L>
        <Dot cx={350} cy={200} />
        <Dot cx={350} cy={300} />
        <Dot cx={650} cy={200} />
        <Dot cx={650} cy={300} />
      </g>
      <g className="aeam-fade-in aeam-delay-2">
        <Src cx={150} cy={250} r={21} kind="v" label="v_sig" labelSide="left" />
        <Wire d="M 150 229 L 150 200 L 210 200" stroke={N} />
        <Res x={250} y={200} len={80} orient="h" label="R_sig" />
        <Wire d="M 290 200 L 350 200" stroke={N} />
        <Wire d="M 150 271 L 150 300 L 350 300" stroke={N} />
        <path d="M 250 300 L 250 330 M 235 330 L 265 330 M 242 336 L 258 336 M 246 342 L 254 342" stroke={N} strokeWidth={2} fill="none" />
        <Wire d="M 650 200 L 750 200" stroke={N} />
        <Wire d="M 650 300 L 750 300" stroke={N} />
        <Res x={750} y={250} len={100} orient="v" label="RL" />
      </g>
      <g className="aeam-fade-in aeam-delay-4">
        <Wire d="M 350 200 L 400 200" stroke={BLUE} />
        <Wire d="M 350 300 L 400 300" stroke={BLUE} />
        <Res x={400} y={250} len={100} orient="v" label="Rin" tone={BLUE} />
        <M x={380} y={250} fill={BLUE}>v_i</M>
        <Wire d="M 400 300 L 650 300" stroke={BLUE} />
        <Wire d="M 520 300 L 520 224" stroke={BLUE} />
        <Src cx={520} cy={200} r={24} kind="v" dep={true} tone={BLUE} />
        <M x={520} y={160} fill={BLUE}>Avo * v_i</M>
        <Res x={590} y={200} len={80} orient="h" label="Rout" tone={BLUE} />
        <Wire d="M 630 200 L 650 200" stroke={BLUE} />
      </g>
    </Scene>
  )
}

export function M2CSAmplifierBasicScene() {
  return (
    <Scene caption="The basic Common Source amplifier offers high voltage gain and infinite input resistance">
      <g className="aeam-fade-in">
        <Wire d="M 150 120 L 250 120" stroke={N} />
        <M x={200} y={110}>VDD</M>
        <Res x={215} y={185} len={130} orient="v" label="RD" />
        <M2Mosfet x={200} y={280} />
        <Wire d="M 215 310 L 215 360" stroke={N} />
        <path d="M 200 360 L 230 360 L 215 380 Z" fill={N} />
        <Wire d="M 175 280 L 140 280" stroke={N} />
        <Dot cx={140} cy={280} />
        <M x={120} y={285}>v_i</M>
        <Dot cx={215} cy={250} />
        <Wire d="M 215 250 L 260 250" stroke={N} />
        <Dot cx={260} cy={250} />
        <M x={280} y={250}>v_out</M>
      </g>
      <g className="aeam-fade-in aeam-delay-2">
        <Wire d="M 500 200 L 550 200" stroke={BLUE} />
        <Dot cx={500} cy={200} fill={BLUE} />
        <M x={480} y={200} fill={BLUE}>v_i</M>
        <Wire d="M 500 350 L 800 350" stroke={BLUE} />
        <path d="M 650 350 L 680 350 L 665 370 Z" fill={BLUE} />
        <Wire d="M 550 220 L 550 330" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x={530} y={275} fill={BLUE}>v_gs</M>
        <Src cx={650} cy={275} r={24} kind="i" dep={true} tone={RED} />
        <M x={585} y={280} fill={RED}>gm*v_gs</M>
        <Wire d="M 650 200 L 650 251" stroke={BLUE} />
        <Wire d="M 650 299 L 650 350" stroke={BLUE} />
        <Wire d="M 650 200 L 800 200" stroke={BLUE} />
        <Res x={720} y={275} len={150} orient="v" label="ro" tone={BLUE} />
        <Res x={800} y={275} len={150} orient="v" label="RD" tone={BLUE} />
        <Dot cx={800} cy={200} fill={BLUE} />
        <Wire d="M 800 200 L 840 200" stroke={BLUE} />
        <Dot cx={840} cy={200} fill={BLUE} />
        <M x={865} y={200} fill={BLUE}>v_out</M>
      </g>
      <g className="aeam-fade-in aeam-delay-4">
        <Block x={450} y={100} w={100} h={40} stroke={GREEN} fill={WHITE} />
        <M x={500} y={125} fill={GREEN}>Rin = infinity</M>
        <Wire d="M 500 140 L 525 190" stroke={GREEN} marker="url(#aeaArrG)" />
      </g>
    </Scene>
  )
}

export function M2CSDegenerationScene() {
  return (
    <Scene caption="Source degeneration trades voltage gain for linearity and stability">
      <g className="aeam-fade-in" transform="translate(0, -40)">
        <Wire d="M 150 250 L 400 250" stroke={N} />
        <Dot cx={150} cy={250} />
        <M x={130} y={250}>v_i</M>
        <Wire d="M 550 100 L 650 100" stroke={N} />
        <M x={600} y={90}>VDD (AC Gnd)</M>
        <Res x={600} y={175} len={150} orient="v" label="RD" />
        <Dot cx={600} cy={250} />
        <M x={620} y={250}>v_out</M>
        <Src cx={500} cy={250} r={24} kind="i" dep={true} tone={RED} />
        <Wire d="M 400 250 L 476 250" stroke={N} />
        <Wire d="M 524 250 L 600 250" stroke={N} />
        <M x={500} y={210} fill={RED}>gm*v_gs</M>
        <Dot cx={400} cy={250} />
        <Res x={400} y={300} len={100} orient="v" label="1/gm" />
        <Dot cx={400} cy={350} />
        <M x={425} y={350}>S</M>
        <Res x={400} y={400} len={100} orient="v" label="RS" />
        <Wire d="M 400 450 L 400 480" stroke={N} />
        <path d="M 385 480 L 415 480 L 400 500 Z" fill={N} />
      </g>
      <g className="aeam-fade-in aeam-delay-2" transform="translate(0, -40)">
        <rect x={360} y={260} width={80} height={180} fill="none" stroke={AMBER} strokeWidth={3} rx={12} strokeDasharray="6 4" />
        <M x={290} y={350} fill={AMBER}>Series</M>
      </g>
      <g className="aeam-fade-in aeam-delay-4" transform="translate(0, -40)">
        <Block x={700} y={350} w={150} h={80} stroke={BLUE} />
        <M x={775} y={375} fill={BLUE}>RS</M>
        <Wire d="M 725 390 L 825 390" stroke={BLUE} />
        <M x={775} y={410} fill={BLUE}>1/gm + RS</M>
        <M x={680} y={390} fill={BLUE}>Gain ~</M>
      </g>
    </Scene>
  )
}

export function M2CGInputResistanceScene() {
  return (
    <Scene caption="Common Gate amplifier has very low input resistance (1/gm)">
      <g className="aeam-fade-in">
        <Wire d="M 320 60 L 380 60" stroke={N} />
        <M x={350} y={50}>VDD (AC Gnd)</M>
        <Res x={350} y={110} len={100} orient="v" label="RD" />
        <Dot cx={350} cy={160} />
        <M x={370} y={160}>D</M>
        <Src cx={350} cy={205} r={24} kind="i" dep={true} tone={RED} />
        <Wire d="M 350 160 L 350 181" stroke={N} />
        <Wire d="M 350 229 L 350 250" stroke={N} />
        <M x={410} y={205} fill={RED}>gm*v_gs</M>
        <Dot cx={350} cy={250} />
        <M x={370} y={240}>S</M>
        <Res x={275} y={250} len={100} orient="h" label="1/gm" />
        <Wire d="M 325 250 L 350 250" stroke={N} />
        <Wire d="M 225 250 L 200 250 L 200 280" stroke={N} />
        <path d="M 185 280 L 215 280 L 200 300 Z" fill={N} />
        <M x={180} y={250}>G</M>
        <Res x={350} y={325} len={100} orient="v" label="R_sig" />
        <Wire d="M 350 250 L 350 275" stroke={N} />
        <Src cx={350} cy={425} r={21} kind="v" label="v_sig" labelSide="left" />
        <Wire d="M 350 375 L 350 404" stroke={N} />
        <Wire d="M 350 446 L 350 480" stroke={N} />
        <path d="M 335 480 L 365 480 L 350 500 Z" fill={N} />
      </g>
      <g className="aeam-fade-in aeam-delay-2">
        <path d="M 430 260 C 430 250 450 240 460 250 C 470 260 450 270 430 260 Z" fill="none" stroke={BLUE} strokeWidth={2} />
        <circle cx={445} cy={255} r={3} fill={BLUE} />
        <Wire d="M 430 255 L 370 255" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x={460} y={280} fill={BLUE}>Rin</M>
      </g>
      <g className="aeam-fade-in aeam-delay-4">
        <Wire d="M 360 255 L 225 255 L 225 280" dash="4 4" stroke={RED} marker="url(#aeaArrR)" />
        <M x={275} y={225} fill={RED}>Rin = 1/gm</M>
      </g>
    </Scene>
  )
}

export function M2CGVoltageGainScene() {
  return (
    <Scene caption="Common Gate amplifier provides non-inverting voltage gain">
      <g className="aeam-fade-in">
        <Wire d="M 320 80 L 380 80" stroke={N} />
        <M x={350} y={70}>VDD</M>
        <Res x={350} y={155} len={130} orient="v" label="RD" />
        <Dot cx={350} cy={220} />
        <M x={380} y={220}>v_drain</M>
        <Src cx={350} cy={280} r={24} kind="i" dep={true} tone={N} />
        <Wire d="M 350 220 L 350 256" stroke={N} />
        <Wire d="M 350 304 L 350 340" stroke={N} />
        <M x={430} y={280}>i = gm*v_i</M>
        <Dot cx={350} cy={340} />
        <M x={380} y={340}>v_i (Source)</M>
        <Res x={250} y={340} len={100} orient="h" label="1/gm" />
        <Wire d="M 300 340 L 350 340" stroke={N} />
        <Wire d="M 200 340 L 150 340 L 150 380" stroke={N} />
        <path d="M 135 380 L 165 380 L 150 400 Z" fill={N} />
        <M x={150} y={330}>G</M>
        <Wire d="M 350 340 L 350 400" stroke={N} />
        <Dot cx={350} cy={400} />
        <M x={380} y={400}>IN</M>
      </g>
      <g className="aeam-fade-in aeam-delay-2">
        <Wire d="M 420 400 L 420 370" stroke={GREEN} marker="url(#aeaArrG)" />
        <M x={450} y={385} fill={GREEN}>v_i UP</M>
      </g>
      <g className="aeam-fade-in aeam-delay-3">
        <Wire d="M 250 370 L 250 390" stroke={AMBER} marker="url(#aeaArrA)" />
        <M x={250} y={410} fill={AMBER}>v_gs DOWN</M>
      </g>
      <g className="aeam-fade-in aeam-delay-4">
        <Wire d="M 320 280 L 320 300" stroke={AMBER} marker="url(#aeaArrA)" />
        <M x={290} y={290} fill={AMBER}>i DOWN</M>
      </g>
      <g className="aeam-fade-in aeam-delay-5">
        <Wire d="M 320 155 L 320 175" stroke={AMBER} marker="url(#aeaArrA)" />
        <M x={280} y={165} fill={AMBER}>v_RD DOWN</M>
      </g>
      <g className="aeam-fade-in aeam-delay-6">
        <Wire d="M 420 220 L 420 190" stroke={GREEN} marker="url(#aeaArrG)" />
        <M x={460} y={205} fill={GREEN}>v_drain UP</M>
      </g>
    </Scene>
  )
}

export function M2SourceFollowerScene() {
  return (
    <Scene caption="The Source Follower acts as a voltage buffer to drive heavy loads">
      <style>{`
        @keyframes m2FadeOut2 { to { opacity: 0; visibility: hidden; } }
        .m2-disappear { animation: m2FadeOut2 0.5s 5s forwards ease-in-out; }
      `}</style>
      <g className="aeam-fade-in">
        <Src cx={100} cy={300} r={24} kind="v" label="v_sig" labelSide="left" />
        <Wire d="M 100 276 L 100 220 L 140 220" stroke={N} />
        <Res x={190} y={220} len={100} orient="h" label="R_sig (Huge)" />
        <Wire d="M 100 324 L 100 400 L 250 400" stroke={N} />
        <Wire d="M 700 220 L 760 220 L 760 270" stroke={N} />
        <Res x={760} y={320} len={100} orient="v" label="RL (Tiny)" />
        <Wire d="M 760 370 L 760 400 L 650 400" stroke={N} />
      </g>
      <g className="aeam-fade-in aeam-delay-2 m2-disappear">
        <Wire d="M 240 220 L 700 220" stroke={RED} dash="8 4" />
        <Wire d="M 250 400 L 650 400" stroke={RED} dash="8 4" />
        <Wire d="M 450 180 L 490 220" stroke={RED} width={4} />
        <Wire d="M 490 180 L 450 220" stroke={RED} width={4} />
        <M x={470} y={250} fill={RED}>v_load ~ 0</M>
      </g>
      <g className="aeam-fade-in aeam-delay-6">
        <Block x={350} y={150} w={200} h={180} stroke={BLUE} fill={CREAM} />
        <L x={450} y={180} fill={BLUE}>Source Follower</L>
        <M x={380} y={230} fill={BLUE}>Rin = infinity</M>
        <M x={520} y={280} fill={BLUE}>Rout = 1/gm</M>
        <M x={450} y={310} fill={BLUE}>Gain ~ 1</M>
        <Wire d="M 240 220 L 350 220" stroke={GREEN} width={3} />
        <Wire d="M 550 220 L 700 220" stroke={GREEN} width={3} />
        <Wire d="M 250 400 L 650 400" stroke={GREEN} width={3} />
        <Wire d="M 720 180 L 730 200 L 750 160" stroke={GREEN} width={4} />
        <M x={630} y={160} fill={GREEN}>v_load ~ v_sig</M>
      </g>
    </Scene>
  )
}

/* ── Module 3 ────────────────────────────────────────────────────────── */

export function M3FeedbackTopologyMatrixScene() {
  return (
    <Scene caption="Four negative-feedback topologies">
      <g className="aeam-insert">
        <L x="340" y="90" fill={BLUE} weight="700">Voltage Sampling</L>
        <L x="640" y="90" fill={BLUE} weight="700">Current Sampling</L>
        <L x="140" y="190" fill={AMBER} weight="700" anchor="end">Series Mixing</L>
        <L x="140" y="370" fill={AMBER} weight="700" anchor="end">Shunt Mixing</L>
      </g>

      <g className="aeam-insert" style={{ animationDelay: '0.2s' }}>
        <Block x="250" y="140" w="180" h="100" label="VCVS" sub="Voltage-Series" />
        <svg x="270" y="180" width="20" height="20" viewBox="-10 -10 20 20" overflow="visible">
          <circle cx="0" cy="0" r="10" fill="none" stroke={N} strokeWidth="1.5" />
          <L x="-6" y="0" size="10">+</L>
          <L x="0" y="12" size="10">-</L>
        </svg>
        <svg x="390" y="182" width="16" height="16" viewBox="-8 -8 16 16" overflow="visible">
          <circle cx="0" cy="0" r="8" fill="none" stroke={MUTED} strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill={MUTED} />
        </svg>
        
        <Wire d="M 340 240 L 340 270" marker="url(#aeaArr)" />
        <M x="340" y="290">A_v = V_o/V_s</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Block x="550" y="140" w="180" h="100" label="ICVS" sub="Current-Series" />
        <svg x="570" y="180" width="20" height="20" viewBox="-10 -10 20 20" overflow="visible">
          <circle cx="0" cy="0" r="10" fill="none" stroke={N} strokeWidth="1.5" />
          <L x="-6" y="0" size="10">+</L>
          <L x="0" y="12" size="10">-</L>
        </svg>
        <svg x="690" y="182" width="16" height="16" viewBox="-8 -8 16 16" overflow="visible">
          <circle cx="0" cy="0" r="8" fill="none" stroke={MUTED} strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill={MUTED} />
        </svg>

        <Wire d="M 640 240 L 640 270" marker="url(#aeaArr)" />
        <M x="640" y="290">A_i = I_o/I_s</M> 
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.6s' }}>
        <Block x="250" y="320" w="180" h="100" label="VCIS" sub="Voltage-Shunt" />
        <svg x="270" y="360" width="20" height="20" viewBox="-10 -10 20 20" overflow="visible">
          <circle cx="0" cy="0" r="10" fill="none" stroke={N} strokeWidth="1.5" />
          <L x="-6" y="0" size="10">+</L>
          <L x="0" y="12" size="10">-</L>
        </svg>
        <svg x="390" y="362" width="16" height="16" viewBox="-8 -8 16 16" overflow="visible">
          <circle cx="0" cy="0" r="8" fill="none" stroke={MUTED} strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill={MUTED} />
        </svg>

        <Wire d="M 340 420 L 340 450" marker="url(#aeaArr)" />
        <M x="340" y="470">G_m = I_o/V_s</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Block x="550" y="320" w="180" h="100" label="ICIS" sub="Current-Shunt" />
        <svg x="570" y="360" width="20" height="20" viewBox="-10 -10 20 20" overflow="visible">
          <circle cx="0" cy="0" r="10" fill="none" stroke={N} strokeWidth="1.5" />
          <L x="-6" y="0" size="10">+</L>
          <L x="0" y="12" size="10">-</L>
        </svg>
        <svg x="690" y="362" width="16" height="16" viewBox="-8 -8 16 16" overflow="visible">
          <circle cx="0" cy="0" r="8" fill="none" stroke={MUTED} strokeWidth="1.5" />
          <circle cx="0" cy="0" r="3" fill={MUTED} />
        </svg>

        <Wire d="M 640 420 L 640 450" marker="url(#aeaArr)" />
        <M x="640" y="470">R_m = V_o/I_s</M>
      </g>
    </Scene>
  )
}

export function M3FeedbackResistanceCompassScene() {
  return (
    <Scene caption="Feedback effects on gain and resistances">
      <g className="aeam-insert">
        <Block x="350" y="200" w="200" h="120" label="Feedback Amplifier" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.3s' }}>
        <L x="230" y="220" anchor="end" fill={AMBER} weight="700">Series Mixing</L>
        <Wire d="M 250 230 L 250 200" marker="url(#aeaArrA)" stroke={AMBER} />
        <M x="290" y="220" fill={AMBER}>R_in ↑</M>

        <L x="230" y="320" anchor="end" fill={AMBER} weight="700">Shunt Mixing</L>
        <Wire d="M 250 290 L 250 320" marker="url(#aeaArrA)" stroke={AMBER} />
        <M x="290" y="310" fill={AMBER}>R_in ↓</M>
      </g>

      <g className="aeam-insert" style={{ animationDelay: '0.6s' }}>
        <L x="670" y="220" anchor="start" fill={BLUE} weight="700">Voltage Sampling</L>
        <Wire d="M 650 200 L 650 230" marker="url(#aeaArrB)" stroke={BLUE} />
        <M x="610" y="220" fill={BLUE}>R_out ↓</M>

        <L x="670" y="320" anchor="start" fill={BLUE} weight="700">Current Sampling</L>
        <Wire d="M 650 320 L 650 290" marker="url(#aeaArrB)" stroke={BLUE} />
        <M x="610" y="310" fill={BLUE}>R_out ↑</M>
      </g>

      <g className="aeam-insert" style={{ animationDelay: '0.9s' }}>
        <circle cx="450" cy="110" r="40" fill="none" stroke={PURP} strokeWidth="2.5" />
        <M x="450" y="115" size="18" fill={PURP}>Aβ</M>
        <L x="450" y="170" fill={PURP} size="14">Loop Gain</L>
      </g>
    </Scene>
  )
}

export function M3VcvsClosedLoopBlockScene() {
  return (
    <Scene caption="VCVS voltage gain">
      <g className="aeam-traverse">
        <M x="150" y="265">v_s</M>
        <Wire d="M 170 260 L 230 260" marker="url(#aeaArr)" />
        
        <circle cx="250" cy="260" r="20" fill="none" stroke={N} strokeWidth="2.5" />
        <M x="235" y="250" size="10">+</M>
        <M x="250" y="275" size="10">-</M>

        <Wire d="M 270 260 L 350 260" marker="url(#aeaArr)" />
        <M x="310" y="250">v_i</M>
        
        <Block x="350" y="220" w="120" h="80" label="A_v" mono />
        
        <Wire d="M 470 260 L 650 260" marker="url(#aeaArr)" />
        <M x="670" y="265">v_o</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Block x="350" y="360" w="120" h="80" label="β" mono stroke={BLUE} labelFill={BLUE} />
      </g>
      
      <g className="aeam-rewire" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 560 260 L 560 400 L 470 400" marker="url(#aeaArrB)" stroke={BLUE} />
        <Wire d="M 350 400 L 250 400 L 250 280" marker="url(#aeaArrB)" stroke={BLUE} />
        <M x="300" y="390" fill={BLUE}>v_f</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Block x="300" y="80" w="220" h="60" label="A_vf = A_v / (1 + A_v β)" mono stroke={PURP} labelFill={PURP} />
      </g>
    </Scene>
  )
}

export function M3VcvsDesensitivityChainScene() {
  return (
    <Scene caption="Other VCVS equations and benefits">
      <g className="aeam-insert">
        <Block x="150" y="220" w="160" h="80" label="D = 1 + A_v β" mono stroke={PURP} labelFill={PURP} />
      </g>
      
      <g className="aeam-shift" style={{ animationDelay: '0.3s' }}>
        <Wire d="M 310 240 L 450 160" marker="url(#aeaArr)" stroke={MUTED} />
        <Block x="450" y="120" w="280" h="60" label="Gain variation ÷ D" stroke={AMBER} labelFill={AMBER} />
      </g>
      
      <g className="aeam-shift" style={{ animationDelay: '0.6s' }}>
        <Wire d="M 310 260 L 450 260" marker="url(#aeaArr)" stroke={MUTED} />
        <Block x="450" y="230" w="280" h="60" label="Distortion ÷ D" stroke={BLUE} labelFill={BLUE} />
      </g>
      
      <g className="aeam-shift" style={{ animationDelay: '0.9s' }}>
        <Wire d="M 310 280 L 450 360" marker="url(#aeaArr)" stroke={MUTED} />
        <Block x="450" y="340" w="280" h="60" label="Bandwidth expanded" stroke={GREEN} labelFill={GREEN} />
      </g>
    </Scene>
  )
}

export function M3IcvsLoopScene() {
  return (
    <Scene caption="ICVS current-amplifier feedback">
      <g className="aeam-traverse">
        <M x="150" y="265">i_s</M>
        <Wire d="M 170 260 L 230 260" marker="url(#aeaArr)" />
        
        <circle cx="250" cy="260" r="20" fill="none" stroke={N} strokeWidth="2.5" />
        <M x="235" y="250" size="10">+</M>
        <M x="250" y="275" size="10">-</M>

        <Wire d="M 270 260 L 350 260" marker="url(#aeaArr)" />
        
        <Block x="350" y="220" w="120" h="80" label="A_i" mono />
        
        <Wire d="M 470 260 L 530 260" marker="url(#aeaArr)" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <rect x="530" y="245" width="40" height="30" fill="none" stroke={MUTED} strokeWidth="2" rx="4" />
        <circle cx="550" cy="260" r="4" fill={MUTED} />
        
        <Wire d="M 570 260 L 650 260" marker="url(#aeaArr)" />
        <M x="670" y="265">i_o</M>
      </g>
      
      <g className="aeam-rewire" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 550 275 L 550 400 L 250 400 L 250 280" marker="url(#aeaArrB)" stroke={BLUE} />
        <M x="400" y="390" fill={BLUE}>v_f</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Block x="300" y="80" w="220" h="60" label="A_if = A_i / (1 + A_i β)" mono stroke={PURP} labelFill={PURP} />
      </g>
    </Scene>
  )
}

export function M3VcisTransconductanceMapScene() {
  return (
    <Scene caption="VCIS transconductance amplifier">
      <g className="aeam-traverse">
        <M x="150" y="265">v_s</M>
        <Wire d="M 170 260 L 250 260" marker="url(#aeaArr)" />
        <Dot cx="250" cy="260" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Wire d="M 250 260 L 350 260" marker="url(#aeaArr)" />
        <Block x="350" y="220" w="120" h="80" label="G_m" mono />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 470 260 L 530 260" marker="url(#aeaArr)" />
        <rect x="530" y="245" width="40" height="30" fill="none" stroke={MUTED} strokeWidth="2" rx="4" />
        <circle cx="550" cy="260" r="4" fill={MUTED} />
        
        <Wire d="M 570 260 L 650 260" marker="url(#aeaArr)" />
        <M x="670" y="265">i_o</M>
      </g>
      
      <g className="aeam-rewire" style={{ animationDelay: '1.2s' }}>
        <Wire d="M 550 275 L 550 400 L 250 400 L 250 260" marker="url(#aeaArrB)" stroke={BLUE} />
        <M x="400" y="390" fill={BLUE}>i_f</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.6s' }}>
        <Block x="300" y="80" w="220" h="60" label="G_mf = i_o / v_s" mono stroke={PURP} labelFill={PURP} />
      </g>
    </Scene>
  )
}

export function M3IcisTransimpedanceBlockScene() {
  return (
    <Scene caption="ICIS transresistance amplifier">
      <g className="aeam-traverse">
        <M x="150" y="265">i_s</M>
        <Wire d="M 170 260 L 250 260" marker="url(#aeaArr)" />
        <Dot cx="250" cy="260" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Wire d="M 250 260 L 350 260" marker="url(#aeaArr)" />
        <Block x="350" y="220" w="120" h="80" label="R_m" mono />
        <Wire d="M 470 260 L 650 260" marker="url(#aeaArr)" />
        <M x="670" y="265">v_o</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Dot cx="550" cy="260" />
        <Block x="490" y="360" w="120" h="80" label="Divider" mono stroke={BLUE} labelFill={BLUE} />
        <Wire d="M 550 260 L 550 360" marker="url(#aeaArrB)" stroke={BLUE} />
        <Wire d="M 490 400 L 250 400 L 250 260" marker="url(#aeaArrB)" stroke={BLUE} />
        <M x="370" y="390" fill={BLUE}>i_f</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Block x="300" y="80" w="220" h="60" label="R_mf = v_o / i_s" mono stroke={PURP} labelFill={PURP} />
      </g>
    </Scene>
  )
}

export function M3BarkhausenLoopScene() {
  return (
    <Scene caption="Theory of sinusoidal oscillation">
      <g className="aeam-insert">
        <Block x="350" y="150" w="120" h="80" label="Amplifier A" />
        <Block x="350" y="310" w="120" h="80" label="Network β" stroke={BLUE} labelFill={BLUE} />
        
        <Wire d="M 470 190 L 550 190 L 550 350 L 470 350" marker="url(#aeaArr)" />
        <Wire d="M 350 350 L 250 350 L 250 190 L 350 190" marker="url(#aeaArr)" />
      </g>

      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Block x="450" y="60" w="160" h="40" label="∠Aβ = 0° at f₀" mono stroke={PURP} labelFill={PURP} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Block x="250" y="60" w="140" h="40" label="|Aβ| = 1" mono stroke={PURP} labelFill={PURP} />
      </g>
      
      <g className="aeam-shift" style={{ animationDelay: '1.2s' }}>
        <Curve pts={[[120, 190], [130, 175], [140, 195], [150, 185], [160, 190]]} stroke={MUTED} width="2" />
        <Wire d="M 165 190 L 250 190" marker="url(#aeaArrM)" stroke={MUTED} />
        <L x="160" y="215" fill={MUTED} size="13">Noise</L>
        
        <Wire d="M 550 190 L 610 190" marker="url(#aeaArr)" stroke={N} />
        <Wave x="610" y="190" w="120" amp="25" cycles="2.5" stroke={BLUE} />
      </g>
    </Scene>
  )
}

function Cap({ x, y, orient = 'h', label, className = '' }) {
  const [X, Y] = [Number(x), Number(y)]
  return (
    <g className={className}>
      <g transform={`translate(${X},${Y}) ${orient === 'v' ? 'rotate(90)' : ''}`}>
        <path d="M -24 0 L -4 0 M -4 -12 L -4 12 M 4 -12 L 4 12 M 4 0 L 24 0" fill="none" stroke={N} strokeWidth="2.5" />
      </g>
      {label ? <M x={orient === 'v' ? X - 18 : X} y={orient === 'v' ? Y + 4 : Y - 20} anchor={orient === 'v' ? 'end' : 'middle'}>{label}</M> : null}
    </g>
  )
}

export function M3OscillatorAmplitudeTrajectoryScene() {
  const risePts = [
    [100, 399], [120, 398], [140, 395], [160, 390], [180, 380], 
    [200, 360], [220, 330], [240, 290], [260, 240], [280, 210], [320, 200]
  ]
  const platPts = [[320, 200], [420, 200]]
  
  return (
    <Scene caption="Oscillator startup and amplitude control">
      <Axes x="100" y="400" w="320" h="280" xLabel="time" yLabel="Amplitude" />
      <Axes x="550" y="400" w="220" h="280" xLabel="time" yLabel="|Aβ|" yTicks={[[250, '1.0'], [150, '1.2']]} />
      
      <g className="aeam-insert">
        <Curve pts={[[80, 400], [85, 395], [90, 402], [95, 397], [100, 399]]} stroke={MUTED} width="1.5" />
      </g>
      
      <g className="aeam-traverse" style={{ animationDelay: '0.4s' }}>
        <Curve pts={risePts} stroke={AMBER} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 320 280 L 320 220" marker="url(#aeaArr)" stroke={ROSE} />
        <L x="320" y="300" fill={ROSE}>limiter engages</L>
        
        <Curve pts={[[550, 150], [600, 150], [650, 250], [750, 250]]} stroke={ROSE} />
      </g>
      
      <g className="aeam-traverse" style={{ animationDelay: '1.2s' }}>
        <Curve pts={platPts} stroke={BLUE} />
      </g>
    </Scene>
  )
}

export function M3WienBridgeLayoutScene() {
  return (
    <Scene caption="Wien-bridge oscillator">
      <g className="aeam-insert">
        <Block x="450" y="200" w="140" h="80" label="Non-inverting Amp" />
        <M x="395" y="185" size="10">+</M>
        <M x="395" y="225" size="10">-</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Wire d="M 520 200 L 600 200 L 600 80 L 500 80" />
        <Res x="450" y="80" len="100" label="R" />
        <Wire d="M 400 80 L 374 80" />
        <Cap x="350" y="80" label="C" />
        <Wire d="M 326 80 L 300 80 L 300 180 L 380 180" />
        <Dot cx="300" cy="180" />
        
        <Wire d="M 300 180 L 250 180 L 250 240" />
        <Res x="250" y="280" len="80" orient="v" label="R" />
        
        <Wire d="M 300 180 L 300 256" />
        <Cap x="300" y="280" orient="v" label="C" />
        <Wire d="M 300 304 L 300 330" />
        
        <Wire d="M 230 320 L 320 320" width="3" />
        <Wire d="M 250 320 L 250 330" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 380 220 L 380 280 L 410 280" />
        <Res x="450" y="280" len="80" label="Rf" />
        <Wire d="M 490 280 L 550 280 L 550 200 L 520 200" />
        <Dot cx="550" cy="200" />
        
        <Wire d="M 380 280 L 380 320" />
        <Res x="380" y="360" len="80" orient="v" label="R1" />
        <Wire d="M 360 400 L 400 400" width="3" />
        <Wire d="M 380 400 L 380 410" />
        <Dot cx="380" cy="280" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Block x="720" y="100" w="180" h="50" label="β = 1/3 at f₀" mono stroke={PURP} labelFill={PURP} />
        <Block x="720" y="170" w="180" h="50" label="f₀ = 1 / (2πRC)" mono stroke={PURP} labelFill={PURP} />
        <Block x="720" y="240" w="180" h="50" label="Gain ≥ 3" mono stroke={AMBER} labelFill={AMBER} />
      </g>
    </Scene>
  )
}

export function M3RcPhaseShiftChainScene() {
  return (
    <Scene caption="RC phase-shift oscillator">
      <g className="aeam-insert">
        <Block x="450" y="150" w="140" h="80" label="Inverting Amp" sub="180° shift" />
        <M x="395" y="150" size="10">-</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Wire d="M 520 150 L 550 150 L 550 250 L 494 250" />
        <Cap x="470" y="250" label="C" />
        <Wire d="M 446 250 L 420 250" />
        <Res x="420" y="290" len="80" orient="v" label="R" />
        <Wire d="M 400 330 L 440 330" width="3" />
        <Dot cx="420" cy="250" />
        <M x="445" y="220" fill={BLUE} size="12">~ 60°</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 420 250 L 394 250" />
        <Cap x="370" y="250" label="C" />
        <Wire d="M 346 250 L 320 250" />
        <Res x="320" y="290" len="80" orient="v" label="R" />
        <Wire d="M 300 330 L 340 330" width="3" />
        <Dot cx="320" cy="250" />
        <M x="345" y="220" fill={BLUE} size="12">~ 60°</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Wire d="M 320 250 L 294 250" />
        <Cap x="270" y="250" label="C" />
        <Wire d="M 246 250 L 220 250" />
        <Res x="220" y="290" len="80" orient="v" label="R" />
        <Wire d="M 200 330 L 240 330" width="3" />
        <Dot cx="220" cy="250" />
        <M x="245" y="220" fill={BLUE} size="12">~ 60°</M>
        
        <Wire d="M 220 250 L 220 150 L 380 150" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.6s' }}>
        <Block x="700" y="120" w="180" h="50" label="f₀ ≈ 1 / (2πRC√6)" mono stroke={PURP} labelFill={PURP} />
        <Block x="700" y="190" w="180" h="50" label="Gain A ≥ 29" mono stroke={AMBER} labelFill={AMBER} />
      </g>
    </Scene>
  )
}

export function M3ColpittsTankScene() {
  return (
    <Scene caption="Colpitts oscillator">
      <g className="aeam-insert">
        <Wire d="M 300 150 L 450 150" />
        <Wire d="M 300 350 L 450 350 L 450 370" />
        <Wire d="M 430 370 L 470 370" width="3" />
        
        <Ind x="300" y="250" len="200" orient="v" label="L" />
        
        <Wire d="M 450 150 L 450 176" />
        <Cap x="450" y="200" orient="v" label="C1" />
        <Wire d="M 450 224 L 450 276" />
        <Cap x="450" y="300" orient="v" label="C2" />
        <Wire d="M 450 324 L 450 350" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Dot cx="450" cy="250" />
        <Wire d="M 450 250 L 550 250" marker="url(#aeaArr)" />
        <L x="500" y="235" fill={MUTED} size="12">Feedback Tap</L>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Block x="620" y="250" w="140" h="80" label="Active Device" />
        <Wire d="M 690 250 L 730 250 L 730 100 L 380 100 L 380 150" marker="url(#aeaArrB)" stroke={BLUE} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Block x="375" y="440" w="220" h="50" label="C_eq = (C1·C2)/(C1+C2)" mono stroke={PURP} labelFill={PURP} />
        <Block x="630" y="440" w="220" h="50" label="f₀ = 1 / (2π√(L·C_eq))" mono stroke={PURP} labelFill={PURP} />
      </g>
    </Scene>
  )
}

function Xtal({ x, y, label, className = '' }) {
  const [X, Y] = [Number(x), Number(y)]
  return (
    <g transform={`translate(${X},${Y})`} className={className}>
      <path d="M -20 0 L -10 0 M -10 -15 L -10 15 M 10 -15 L 10 15 M 10 0 L 20 0" fill="none" stroke={N} strokeWidth="2.5" />
      <rect x="-6" y="-12" width="12" height="24" fill="none" stroke={N} strokeWidth="2" />
      {label ? <M x="0" y="26">{label}</M> : null}
    </g>
  )
}

export function M3HartleyTankScene() {
  return (
    <Scene caption="Hartley oscillator">
      <g className="aeam-insert">
        <Wire d="M 300 150 L 450 150" />
        <Wire d="M 300 350 L 450 350 L 450 370" />
        <Wire d="M 430 370 L 470 370" width="3" />
        
        <Wire d="M 300 150 L 300 226" />
        <Cap x="300" y="250" orient="v" label="C" />
        <Wire d="M 300 274 L 300 350" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Ind x="450" y="200" len="100" orient="v" label="L1" />
        <Ind x="450" y="300" len="100" orient="v" label="L2" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 470 200 Q 520 250 470 300" marker="url(#aeaArr)" stroke={AMBER} />
        <M x="510" y="270" fill={AMBER}>M</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Dot cx="450" cy="250" />
        <Wire d="M 450 250 L 550 250" marker="url(#aeaArr)" />
        <L x="500" y="235" fill={MUTED} size="12">Feedback Tap</L>
        
        <Block x="620" y="250" w="140" h="80" label="Active Device" />
        <Wire d="M 690 250 L 730 250 L 730 100 L 380 100 L 380 150" marker="url(#aeaArrB)" stroke={BLUE} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.6s' }}>
        <Block x="375" y="440" w="220" h="50" label="L_eq = L1 + L2 + 2M" mono stroke={PURP} labelFill={PURP} />
        <Block x="630" y="440" w="220" h="50" label="f₀ = 1 / (2π√(L_eq·C))" mono stroke={PURP} labelFill={PURP} />
      </g>
    </Scene>
  )
}

export function M3CrystalEquivalentAndLoopScene() {
  return (
    <Scene caption="Crystal oscillator">
      <g className="aeam-insert">
        <Block x="200" y="150" w="120" h="60" label="Amplifier" />
        <Wire d="M 260 150 L 320 150 L 320 250 L 220 250" />
        <Xtal x="200" y="250" />
        <Wire d="M 180 250 L 80 250 L 80 150 L 140 150" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Wire d="M 500 150 L 600 150" />
        <Wire d="M 500 350 L 600 350" />
        <Wire d="M 470 150 L 500 150" />
        <Wire d="M 470 350 L 500 350" />
        
        <Wire d="M 500 150 L 500 226" />
        <Cap x="500" y="250" orient="v" label="C0" />
        <Wire d="M 500 274 L 500 350" />
        
        <Wire d="M 600 150 L 600 170" />
        <Res x="600" y="190" len="40" orient="v" label="Rm" />
        <Wire d="M 600 210 L 600 220" />
        <Ind x="600" y="250" len="60" orient="v" label="Lm" />
        <Wire d="M 600 280 L 600 296" />
        <Cap x="600" y="320" orient="v" label="Cm" />
        <Wire d="M 600 344 L 600 350" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Axes x="450" y="480" w="250" h="100" xLabel="f" yLabel="Response" />
        <Curve pts={[[450,478], [530,478], [550,475], [565,390], [570,390], [585,475], [600,478], [700,478]]} stroke={BLUE} width="2.5" />
        <L x="575" y="375" fill={BLUE}>High Q</L>
        <L x="575" y="500" fill={MUTED} size="12">Extremely stable</L>
      </g>
    </Scene>
  )
}

export function M3555MonostableTimelineScene() {
  return (
    <Scene caption="555 timer monostable operation">
      <rect x="250" y="60" width="400" height="200" fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="6 4" rx="8" />
      <L x="600" y="80" fill={MUTED} size="12">555 IC</L>
      
      <M x="200" y="95">Trigger</M>
      <Wire d="M 230 90 L 290 90" />
      
      <M x="200" y="195">Threshold</M>
      <Wire d="M 230 190 L 290 190" />
      
      <Wire d="M 270 190 L 270 230 L 580 230 L 580 200" />
      <M x="270" y="245">External R-C</M>

      <Block x="340" y="90" w="100" h="40" label="Trig Comp" sub="1/3 Vcc" />
      <Block x="340" y="190" w="100" h="40" label="Thres Comp" sub="2/3 Vcc" />
      <Block x="470" y="140" w="80" h="100" label="SR Latch" />
      <Block x="580" y="180" w="80" h="40" label="Discharge" />
      
      <Wire d="M 390 90 L 450 90 L 450 120 L 430 120" />
      <Wire d="M 390 190 L 450 190 L 450 160 L 430 160" />
      
      <Wire d="M 510 120 L 680 120" />
      <M x="700" y="125">OUT</M>
      
      <Wire d="M 510 160 L 580 160" />

      <Axes x="150" y="350" w="600" h="50" xLabel="" yLabel="Trig" />
      <Axes x="150" y="420" w="600" h="50" xLabel="" yLabel="Cap" yTicks={[[380, '2/3Vcc']]} />
      <Axes x="150" y="490" w="600" h="50" xLabel="time" yLabel="Out" />
      
      <g className="aeam-traverse">
        <Curve pts={[[150, 310], [220, 310], [230, 340], [240, 310], [750, 310]]} stroke={BLUE} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Curve pts={[[150, 490], [230, 490], [230, 450], [530, 450]]} stroke={ROSE} />
      </g>
      
      <g className="aeam-traverse" style={{ animationDelay: '0.8s' }}>
        <Curve pts={[[150, 420], [230, 420], [330, 405], [430, 390], [530, 380]]} stroke={AMBER} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Curve pts={[[530, 380], [535, 420], [750, 420]]} stroke={AMBER} />
        <Curve pts={[[530, 450], [530, 490], [750, 490]]} stroke={ROSE} />
        <M x="380" y="440" fill={MUTED}>T = 1.1RC</M>
      </g>
    </Scene>
  )
}

export function M3555AstableChargeDischargeScene() {
  const capPts = [[450, 260], [520, 180], [560, 260], [630, 180], [670, 260], [740, 180]]
  const outPts = [[450, 340], [450, 300], [520, 300], [520, 340], [560, 340], [560, 300], [630, 300], [630, 340], [670, 340], [670, 300], [740, 300]]
  
  return (
    <Scene caption="555 timer astable operation">
      <g className="aeam-insert">
        <M x="150" y="60">V_CC</M>
        <Wire d="M 150 70 L 150 90" />
        <Res x="150" y="130" len="80" orient="v" label="R_A" />
        <Dot cx="150" cy="170" />
        <Res x="150" y="210" len="80" orient="v" label="R_B" />
        <Dot cx="150" cy="250" />
        <Wire d="M 150 250 L 150 266" />
        <Cap x="150" y="290" orient="v" label="C" />
        <Wire d="M 150 314 L 150 340" />
        <Wire d="M 130 340 L 170 340" width="3" />
        
        <Block x="300" y="210" w="120" h="100" label="555 Timer" />
        <Wire d="M 150 170 L 240 170" />
        <L x="270" y="174" size="11">Disch</L>
        <Wire d="M 150 250 L 240 250" />
        <L x="270" y="254" size="11">Th/Tr</L>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Axes x="450" y="260" w="300" h="100" xLabel="time" yLabel="v_C" yTicks={[[180, '2/3'], [260, '1/3']]} />
        <Axes x="450" y="340" w="300" h="50" xLabel="" yLabel="Out" />
      </g>
      
      <g className="aeam-traverse" style={{ animationDelay: '0.8s' }}>
        <Curve pts={capPts} stroke={BLUE} width="2.5" />
        <Curve pts={outPts} stroke={ROSE} width="2.5" />
        <Wire d="M 110 90 L 110 250" marker="url(#aeaArrB)" stroke={BLUE} />
        <L x="80" y="170" fill={BLUE}>Charge</L>
      </g>
      
      <g className="aeam-traverse" style={{ animationDelay: '1.2s' }}>
        <Wire d="M 180 250 L 180 170" marker="url(#aeaArrRo)" stroke={ROSE} />
        <L x="220" y="210" fill={ROSE}>Discharge</L>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.6s' }}>
        <Block x="300" y="440" w="220" h="40" label="t_H = 0.693(R_A+R_B)C" mono stroke={PURP} labelFill={PURP} />
        <Block x="550" y="440" w="220" h="40" label="t_L = 0.693(R_B)C" mono stroke={PURP} labelFill={PURP} />
      </g>
    </Scene>
  )
}

/* ── Module 4 ────────────────────────────────────────────────────────── */

export function M4PowerBudgetMeterScene() {
  return (
    <Scene caption="Power-amplifier terms: power, gain, efficiency and distortion">
      <g className="aeam-insert">
        <Block x="150" y="150" w="120" h="100" label="DC Supply" sub="P_dc" />
        <Block x="390" y="150" w="120" h="100" label="Amplifier" />
        <Block x="630" y="150" w="120" h="100" label="Load RL" sub="P_o" />
      </g>
      
      <g className="aeam-traverse" style={{ animationDelay: '0.4s' }}>
        <Wire d="M 270 200 L 390 200" marker="url(#aeaArrB)" stroke={BLUE} width="4" />
        <Wire d="M 510 200 L 630 200" marker="url(#aeaArrG)" stroke={GREEN} width="4" />
        <Wave x="650" y="280" w="80" amp="20" cycles="1" stroke={GREEN} />
      </g>

      <g className="aeam-descend" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 450 250 L 450 330" marker="url(#aeaArrR)" stroke={RED} width="4" />
        <L x="500" y="300" fill={RED}>Heat</L>
      </g>

      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Card x="250" y="360" w="180" h="100" title="Efficiency" accent={BLUE}>
          <M x="90" y="70" size="18">η = P_o / P_dc</M>
        </Card>
        
        <Card x="470" y="360" w="180" h="100" title="Distortion" accent={AMBER}>
          <Wave x="20" y="70" w="140" amp="15" cycles="1" stroke={AMBER} />
          <Wire d="M 20 70 L 55 35 L 90 70 L 125 90 L 160 70" stroke={RED} dash="4 4" />
        </Card>
      </g>
    </Scene>
  )
}

export function M4DualLoadlinePlaneScene() {
  return (
    <Scene caption="DC and AC load lines: locating the usable swing">
      <g className="aeam-insert">
        <Axes x="150" y="450" w="600" h="350" xLabel="V_CE" yLabel="I_C" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.3s' }}>
        <M x="140" y="90" anchor="end">V_CC / R_dc</M>
        <M x="700" y="470" anchor="middle">V_CC</M>
        <Wire d="M 150 100 L 700 450" stroke={MUTED} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.6s' }}>
        <Dot cx="400" cy="259" r="6" fill={BLUE} />
        <M x="415" y="250" fill={BLUE} size="16">Q</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.9s' }}>
        <Wire d="M 250 50 L 550 450" stroke={BLUE} width="3" />
        <L x="260" y="40" fill={BLUE}>Saturation</L>
        <L x="560" y="470" fill={BLUE}>Cutoff</L>
      </g>
      
      <g className="aeam-shift" style={{ animationDelay: '1.2s' }}>
        <Wire d="M 300 117 L 300 450" stroke={MUTED} dash="6 6" />
        <Wire d="M 500 383 L 500 450" stroke={MUTED} dash="6 6" />
        <Wire d="M 150 117 L 300 117" stroke={MUTED} dash="6 6" />
        <Wire d="M 150 383 L 500 383" stroke={MUTED} dash="6 6" />
      </g>
    </Scene>
  )
}

export function M4ClassACentredSwingScene() {
  return (
    <Scene caption="Class A operation: linear conduction and heat">
      <g className="aeam-insert">
        <Wire d="M 100 150 L 600 150" stroke={MUTED} dash="8 4" />
        <M x="80" y="155" fill={MUTED}>I_CQ</M>
        <Wave x="200" y="150" w="300" amp="80" cycles="1" stroke={BLUE} width="3" />
        <L x="350" y="50" fill={BLUE}>360° Conduction</L>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Axes x="200" y="450" w="300" h="150" xLabel="V_CE" yLabel="I_C" />
        <Wire d="M 200 300 L 500 450" stroke={MUTED} width="2" />
        <Dot cx="350" cy="375" r="5" fill={BLUE} />
        <M x="365" y="370" fill={BLUE}>Q</M>
        
        <Wire d="M 350 375 L 275 337.5" marker="url(#aeaArrB)" stroke={BLUE} />
        <Wire d="M 350 375 L 425 412.5" marker="url(#aeaArrB)" stroke={BLUE} />
        <M x="260" y="330" fill={BLUE}>Q_1</M>
        <M x="440" y="420" fill={BLUE}>Q_2</M>
        
        <M x="200" y="290">Saturation</M>
        <M x="500" y="470">Cutoff</M>
      </g>
      
      <g className="aeam-descend" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 650 350 L 650 420" marker="url(#aeaArrR)" stroke={RED} width="4" />
        <Wire d="M 670 360 L 670 410" marker="url(#aeaArrR)" stroke={RED} width="3" />
        <Wire d="M 630 360 L 630 410" marker="url(#aeaArrR)" stroke={RED} width="3" />
        <L x="650" y="440" fill={RED}>Idle P_dc (Heat)</L>
      </g>
    </Scene>
  )
}

export function M4ClassBHalfwaveHandoffScene() {
  return (
    <Scene caption="Class B operation: half-cycle conduction and crossover">
      <g className="aeam-insert">
        <Axes x="100" y="260" w="150" h="100" />
        <Wave x="100" y="260" w="150" amp="80" cycles="1" stroke={MUTED} opacity="0.4" />
        <Wave x="100" y="260" w="75" amp="80" cycles="0.5" stroke={BLUE} width="3" />
        <L x="175" y="150" fill={BLUE}>Input</L>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Axes x="350" y="260" w="150" h="100" />
        <Wave x="350" y="260" w="75" amp="80" cycles="0.5" stroke={GREEN} width="3" />
        <L x="425" y="150" fill={GREEN}>180° Conduction</L>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Axes x="600" y="260" w="150" h="100" />
        <Curve pts={[[600,260], [610,210], [630,180], [650,210], [660,260], [690,260], [700,310], [720,340], [740,310], [750,260]]} stroke={GREEN} width="3" />
        <L x="675" y="150">Pair Output</L>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Card x="550" y="320" w="250" h="140" title="Crossover Distortion" accent={RED}>
          <Wire d="M 20 70 L 230 70" stroke={MUTED} />
          <Wire d="M 125 30 L 125 110" stroke={MUTED} />
          <Wire d="M 20 120 L 105 70 L 145 70 L 230 20" stroke={RED} width="3" />
          <M x="125" y="130" fill={RED}>Dead band</M>
        </Card>
      </g>
    </Scene>
  )
}

export function M4ComplementaryEmitterFollowerScene() {
  return (
    <Scene caption="Class B push-pull emitter follower">
      <g className="aeam-insert">
        <Wire d="M 350 50 L 450 50" stroke={MUTED} />
        <M x="400" y="40">+V_CC</M>
        <Wire d="M 400 50 L 400 100" stroke={MUTED} />
        
        <Dot cx="400" cy="140" r="18" fill="none" stroke={N} />
        <Wire d="M 382 140 L 418 140" stroke={N} />
        <Wire d="M 400 100 L 400 122 L 418 140" stroke={N} />
        <Wire d="M 400 180 L 400 158 L 418 140" marker="url(#aeaArr)" stroke={N} />
        
        <Dot cx="400" cy="260" r="18" fill="none" stroke={N} />
        <Wire d="M 382 260 L 418 260" stroke={N} />
        <Wire d="M 400 220 L 400 242 L 418 260" marker="url(#aeaArr)" stroke={N} />
        <Wire d="M 400 300 L 400 278 L 418 260" stroke={N} />

        <Wire d="M 400 300 L 400 350" stroke={MUTED} />
        <Wire d="M 350 350 L 450 350" stroke={MUTED} />
        <M x="400" y="370">-V_CC</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.3s' }}>
        <Wire d="M 400 180 L 400 220" stroke={MUTED} />
        <Dot cx="400" cy="200" r="4" fill={N} />
        <Wire d="M 400 200 L 500 200 L 500 250" stroke={MUTED} />
        <Res x="500" y="286" orient="v" label="R_L" tone={N} />
        <Wire d="M 500 322 L 500 360" stroke={MUTED} />
        <Wire d="M 480 360 L 520 360" stroke={MUTED} />
        <Wire d="M 490 365 L 510 365" stroke={MUTED} />
        <Wire d="M 495 370 L 505 370" stroke={MUTED} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.6s' }}>
        <Block x="200" y="180" w="100" h="40" label="~2V_BE" mono />
        <Wire d="M 250 180 L 250 140 L 382 140" stroke={MUTED} />
        <Wire d="M 250 220 L 250 260 L 382 260" stroke={MUTED} />
        <Wire d="M 100 200 L 200 200" stroke={MUTED} />
        <Dot cx="250" cy="200" r="4" fill={N} />
        <M x="80" y="205">v_in</M>
      </g>
      
      <g className="aeam-traverse" style={{ animationDelay: '0.9s' }}>
        <Wire d="M 360 80 L 360 180 L 460 180" marker="url(#aeaArrB)" stroke={BLUE} width="3" />
        <M x="340" y="120" fill={BLUE}>i_src</M>
      </g>
      
      <g className="aeam-traverse" style={{ animationDelay: '1.2s' }}>
        <Wire d="M 460 220 L 360 220 L 360 320" marker="url(#aeaArrA)" stroke={AMBER} width="3" />
        <M x="340" y="280" fill={AMBER}>i_snk</M>
      </g>
    </Scene>
  )
}

export function M4ClassCResonantRecoveryScene() {
  return (
    <Scene caption="Class C operation: pulsed current and tuned recovery">
      <g className="aeam-insert">
        <Axes x="50" y="250" w="100" h="100" />
        <Wave x="50" y="250" w="100" amp="80" cycles="1" stroke={MUTED} />
        <L x="100" y="140" fill={MUTED}>Input</L>
        
        <Axes x="250" y="250" w="150" h="100" />
        <Wire d="M 250 250 L 285 250 L 300 170 L 315 250 L 385 250" stroke={BLUE} width="3" />
        <L x="325" y="140" fill={BLUE}>&lt; 180°</L>
        <Wire d="M 275 160 L 275 150 L 375 150 L 375 160" stroke={BLUE} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Res x="500" y="150" orient="v" len="50" label="R_L" tone={N} />
        <Ind x="550" y="150" orient="v" len="50" label="L" tone={PURP} />
        <Wire d="M 600 125 L 600 175" stroke={N} width="2" />
        <Wire d="M 620 125 L 620 175" stroke={N} width="2" />
        <L x="610" y="110" fill={N}>C</L>
        
        <Wire d="M 500 125 L 610 125" stroke={MUTED} />
        <Wire d="M 500 175 L 610 175" stroke={MUTED} />
        
        <Axes x="450" y="400" w="200" h="100" />
        <Wave x="450" y="400" w="200" amp="80" cycles="2" stroke={GREEN} width="3" />
        <L x="550" y="290" fill={GREEN}>Recovered Sine</L>
      </g>
      
      <g className="aeam-wrap" style={{ animationDelay: '0.8s' }}>
        <path d="M 540 140 A 25 25 0 1 1 580 140" fill="none" stroke={PURP} width="2" />
        <Wire d="M 577 135 L 580 140 L 585 138" stroke={PURP} width="2" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Card x="680" y="100" w="200" h="150" title="Spectrum">
          <Axes x="20" y="100" w="160" h="80" />
          <Wire d="M 50 100 L 50 40" stroke={GREEN} width="4" />
          <M x="50" y="115" size="10">f_0</M>
          <Wire d="M 90 100 L 90 60" stroke={MUTED} width="4" opacity="0.4" />
          <M x="90" y="115" size="10">2f_0</M>
          <Wire d="M 130 100 L 130 80" stroke={MUTED} width="4" opacity="0.4" />
          <M x="130" y="115" size="10">3f_0</M>
        </Card>
      </g>
    </Scene>
  )
}

export function M4FourIdealResponsePanelsScene() {
  return (
    <Scene caption="Ideal active-filter responses">
      <g className="aeam-insert">
        <Block x="100" y="80" w="320" h="200" />
        <rect x="120" y="120" width="120" height="120" fill={GREEN} opacity="0.3" />
        <rect x="240" y="120" width="160" height="120" fill={MUTED} opacity="0.1" />
        <Axes x="120" y="240" w="280" h="120" xLabel="f" yLabel="|H|" />
        <Wire d="M 120 120 L 240 120 L 240 240 L 400 240" stroke={BLUE} width="3" />
        <L x="260" y="110" weight="700">Low-Pass</L>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.3s' }}>
        <Block x="480" y="80" w="320" h="200" />
        <rect x="500" y="120" width="120" height="120" fill={MUTED} opacity="0.1" />
        <rect x="620" y="120" width="160" height="120" fill={GREEN} opacity="0.3" />
        <Axes x="500" y="240" w="280" h="120" xLabel="f" yLabel="|H|" />
        <Wire d="M 500 240 L 620 240 L 620 120 L 780 120" stroke={BLUE} width="3" />
        <L x="640" y="110" weight="700">High-Pass</L>
      </g>

      <g className="aeam-insert" style={{ animationDelay: '0.6s' }}>
        <Block x="100" y="300" w="320" h="200" />
        <rect x="120" y="340" width="80" height="120" fill={MUTED} opacity="0.1" />
        <rect x="200" y="340" width="120" height="120" fill={GREEN} opacity="0.3" />
        <rect x="320" y="340" width="80" height="120" fill={MUTED} opacity="0.1" />
        <Axes x="120" y="460" w="280" h="120" xLabel="f" yLabel="|H|" />
        <Wire d="M 120 460 L 200 460 L 200 340 L 320 340 L 320 460 L 400 460" stroke={BLUE} width="3" />
        <L x="260" y="330" weight="700">Band-Pass</L>
      </g>

      <g className="aeam-insert" style={{ animationDelay: '0.9s' }}>
        <Block x="480" y="300" w="320" h="200" />
        <rect x="500" y="340" width="80" height="120" fill={GREEN} opacity="0.3" />
        <rect x="580" y="340" width="120" height="120" fill={MUTED} opacity="0.1" />
        <rect x="700" y="340" width="80" height="120" fill={GREEN} opacity="0.3" />
        <Axes x="500" y="460" w="280" h="120" xLabel="f" yLabel="|H|" />
        <Wire d="M 500 340 L 580 340 L 580 460 L 700 460 L 700 340 L 780 340" stroke={BLUE} width="3" />
        <L x="640" y="330" weight="700">Band-Stop</L>
      </g>

      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <M x="240" y="260" size="11">f_c</M>
        <M x="620" y="260" size="11">f_c</M>
        <M x="200" y="480" size="11">f_L</M>
        <M x="320" y="480" size="11">f_H</M>
        <M x="580" y="480" size="11">f_L</M>
        <M x="700" y="480" size="11">f_H</M>
      </g>
    </Scene>
  )
}

export function M4BufferedRcLowpassScene() {
  return (
    <Scene caption="First-order low-pass active stage">
      <g className="aeam-insert">
        <M x="80" y="155">v_in</M>
        <Wire d="M 100 150 L 150 150" stroke={MUTED} />
        <Res x="186" y="150" len="72" label="R" tone={N} />
        <Wire d="M 222 150 L 300 150" stroke={MUTED} />
        <Dot cx="300" cy="150" r="4" fill={N} />
        
        <Wire d="M 300 150 L 300 190" stroke={MUTED} />
        <Wire d="M 285 190 L 315 190" stroke={N} width="3" />
        <Wire d="M 285 205 L 315 205" stroke={N} width="3" />
        <Wire d="M 300 205 L 300 240" stroke={MUTED} />
        <M x="330" y="202">C</M>
        <Wire d="M 280 240 L 320 240" stroke={MUTED} />
        <Wire d="M 290 245 L 310 245" stroke={MUTED} />
        <Wire d="M 295 250 L 305 250" stroke={MUTED} />
        
        <Wire d="M 300 150 L 400 150" stroke={MUTED} />
        <path d="M 400 100 L 500 150 L 400 200 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <M x="415" y="140" size="10" fill={BLUE}>+</M>
        <M x="415" y="170" size="10" fill={BLUE}>-</M>
        <Wire d="M 400 170 L 370 170 L 370 230 L 530 230 L 530 150" stroke={MUTED} />
        <Wire d="M 500 150 L 580 150" stroke={MUTED} />
        <Dot cx="530" cy="150" r="4" fill={N} />
        <M x="600" y="155">v_out</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Axes x="200" y="450" w="500" h="150" xLabel="f (log)" yLabel="|H| (dB)" />
        <Curve pts={[[200,320], [400,320], [650,420]]} stroke={GREEN} width="3" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 400 320 L 400 450" stroke={MUTED} dash="4 4" />
        <M x="400" y="470" fill={MUTED}>f_c</M>
        <L x="550" y="360" fill={GREEN}>-20 dB/decade</L>
      </g>
    </Scene>
  )
}

export function M4BufferedRcHighpassScene() {
  return (
    <Scene caption="First-order high-pass active stage">
      <g className="aeam-insert">
        <M x="80" y="155">v_in</M>
        <Wire d="M 100 150 L 185 150" stroke={MUTED} />
        
        <Wire d="M 185 135 L 185 165" stroke={N} width="3" />
        <Wire d="M 205 135 L 205 165" stroke={N} width="3" />
        <M x="195" y="125">C</M>
        
        <Wire d="M 205 150 L 300 150" stroke={MUTED} />
        <Dot cx="300" cy="150" r="4" fill={N} />
        
        <Wire d="M 300 150 L 300 180" stroke={MUTED} />
        <Res x="300" y="216" orient="v" len="72" label="R" tone={N} />
        <Wire d="M 300 252 L 300 290" stroke={MUTED} />
        <Wire d="M 280 290 L 320 290" stroke={MUTED} />
        <Wire d="M 290 295 L 310 295" stroke={MUTED} />
        <Wire d="M 295 300 L 305 300" stroke={MUTED} />
        
        <Wire d="M 300 150 L 400 150" stroke={MUTED} />
        <path d="M 400 100 L 500 150 L 400 200 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <M x="415" y="140" size="10" fill={BLUE}>+</M>
        <M x="415" y="170" size="10" fill={BLUE}>-</M>
        <Wire d="M 400 170 L 370 170 L 370 230 L 530 230 L 530 150" stroke={MUTED} />
        <Wire d="M 500 150 L 580 150" stroke={MUTED} />
        <Dot cx="530" cy="150" r="4" fill={N} />
        <M x="600" y="155">v_out</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Axes x="200" y="450" w="500" h="150" xLabel="f (log)" yLabel="|H| (dB)" />
        <Curve pts={[[200,450], [400,320], [650,320]]} stroke={GREEN} width="3" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 400 320 L 400 450" stroke={MUTED} dash="4 4" />
        <M x="400" y="470" fill={MUTED}>f_c</M>
        <L x="270" y="380" fill={GREEN}>+20 dB/decade</L>
      </g>
    </Scene>
  )
}

export function M4UnitySallenKeyLowpassScene() {
  return (
    <Scene caption="VCVS unity-gain second-order low-pass filter">
      <g className="aeam-insert">
        <M x="80" y="155">v_in</M>
        <Wire d="M 100 150 L 130 150" stroke={MUTED} />
        <Res x="166" y="150" len="72" label="R_1" tone={N} />
        <Wire d="M 202 150 L 230 150" stroke={MUTED} />
        
        <Dot cx="230" cy="150" r="4" fill={N} />
        <M x="230" y="130" fill={BLUE}>A</M>
        
        <Wire d="M 230 150 L 260 150" stroke={MUTED} />
        <Res x="296" y="150" len="72" label="R_2" tone={N} />
        <Wire d="M 332 150 L 360 150" stroke={MUTED} />
        
        <Dot cx="360" cy="150" r="4" fill={N} />
        <M x="360" y="130" fill={BLUE}>B</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Wire d="M 230 150 L 230 80 L 330 80" stroke={MUTED} />
        <Wire d="M 330 65 L 330 95" stroke={N} width="3" />
        <Wire d="M 350 65 L 350 95" stroke={N} width="3" />
        <M x="340" y="55">C_1</M>
        <Wire d="M 350 80 L 530 80 L 530 150" stroke={MUTED} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 360 150 L 360 210" stroke={MUTED} />
        <Wire d="M 345 210 L 375 210" stroke={N} width="3" />
        <Wire d="M 345 230 L 375 230" stroke={N} width="3" />
        <M x="390" y="225">C_2</M>
        <Wire d="M 360 230 L 360 270" stroke={MUTED} />
        <Wire d="M 340 270 L 380 270" stroke={MUTED} />
        <Wire d="M 350 275 L 370 275" stroke={MUTED} />
        <Wire d="M 355 280 L 365 280" stroke={MUTED} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Wire d="M 360 150 L 400 150" stroke={MUTED} />
        <path d="M 400 100 L 500 150 L 400 200 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <M x="415" y="140" size="10" fill={BLUE}>+</M>
        <M x="415" y="170" size="10" fill={BLUE}>-</M>
        <Wire d="M 400 170 L 370 170 L 370 230 L 530 230 L 530 150" stroke={MUTED} />
        <Wire d="M 500 150 L 600 150" stroke={MUTED} />
        <Dot cx="530" cy="150" r="4" fill={N} />
        <M x="620" y="155">v_out</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.6s' }}>
        <Axes x="200" y="480" w="500" h="150" xLabel="f (log)" yLabel="|H| (dB)" />
        <Curve pts={[[200,350], [400,350], [600,470]]} stroke={GREEN} width="3" />
        <Wire d="M 400 350 L 400 480" stroke={MUTED} dash="4 4" />
        <M x="400" y="500" fill={MUTED}>f_c</M>
        <L x="530" y="410" fill={GREEN}>-40 dB/decade</L>
      </g>
    </Scene>
  )
}

export function M4EqualComponentQControlScene() {
  return (
    <Scene caption="VCVS equal-component low-pass design">
      <g className="aeam-insert">
        <M x="50" y="205">v_in</M>
        <Wire d="M 70 200 L 100 200" stroke={MUTED} />
        <Res x="136" y="200" len="72" label="R" tone={N} />
        <Wire d="M 172 200 L 200 200" stroke={MUTED} />
        <Dot cx="200" cy="200" r="4" fill={N} />
        
        <Wire d="M 200 200 L 230 200" stroke={MUTED} />
        <Res x="266" y="200" len="72" label="R" tone={N} />
        <Wire d="M 302 200 L 330 200" stroke={MUTED} />
        
        <Wire d="M 200 200 L 200 130 L 260 130" stroke={MUTED} />
        <Wire d="M 260 115 L 260 145" stroke={N} width="3" />
        <Wire d="M 280 115 L 280 145" stroke={N} width="3" />
        <M x="270" y="105">C</M>
        <Wire d="M 280 130 L 460 130 L 460 200" stroke={MUTED} />
        
        <Wire d="M 330 200 L 330 260" stroke={MUTED} />
        <Wire d="M 315 260 L 345 260" stroke={N} width="3" />
        <Wire d="M 315 280 L 345 280" stroke={N} width="3" />
        <M x="360" y="275">C</M>
        <Wire d="M 330 280 L 330 320" stroke={MUTED} />
        <Wire d="M 310 320 L 350 320" stroke={MUTED} />
        <Wire d="M 320 325 L 340 325" stroke={MUTED} />
        <Wire d="M 325 330 L 335 330" stroke={MUTED} />
        
        <Wire d="M 330 200 L 370 200" stroke={MUTED} />
        <path d="M 370 150 L 470 200 L 370 250 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <M x="385" y="190" size="10" fill={BLUE}>+</M>
        <M x="385" y="220" size="10" fill={BLUE}>-</M>
        
        <Wire d="M 470 200 L 530 200" stroke={MUTED} />
        <Dot cx="460" cy="200" r="4" fill={N} />
        <M x="550" y="205">v_out</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Wire d="M 370 220 L 340 220 L 340 370 L 350 370" stroke={MUTED} />
        <Dot cx="340" cy="316" r="4" fill={N} />
        <Wire d="M 340 316 L 300 316" stroke={MUTED} />
        <Res x="264" y="316" len="72" label="R_g" tone={N} />
        <Wire d="M 228 316 L 228 340" stroke={MUTED} />
        <Wire d="M 208 340 L 248 340" stroke={MUTED} />
        <Wire d="M 218 345 L 238 345" stroke={MUTED} />
        <Wire d="M 223 350 L 233 350" stroke={MUTED} />
        
        <Res x="386" y="370" len="72" label="R_f" tone={N} />
        <Wire d="M 422 370 L 460 370 L 460 200" stroke={MUTED} />
        
        <Block x="350" y="420" w="160" h="50" label="K = 1 + R_f / R_g" mono stroke={BLUE} labelFill={BLUE} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <M x="720" y="130" size="20">Q = 1 / (3 - K)</M>
        
        <Wire d="M 620 220 L 820 220" stroke={MUTED} width="4" />
        <M x="620" y="245">K=1</M>
        <M x="820" y="245">K=3</M>
        <M x="620" y="195">Q=0.5</M>
        <M x="820" y="195">Q=∞</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Dot cx="678" cy="220" r="7" fill={AMBER} />
        <Wire d="M 678 220 L 678 280" stroke={AMBER} dash="4 4" />
        <Card x="588" y="280" w="180" h="90" title="Butterworth" accent={AMBER} mono>
          <M x="90" y="50" fill={N}>K ≈ 1.586</M>
          <M x="90" y="75" fill={N}>Q = 0.707</M>
        </Card>
      </g>
    </Scene>
  )
}

export function M4VcvsHighpassSwapScene() {
  return (
    <Scene caption="VCVS high-pass filter response and topology">
      <g className="aeam-insert">
        <Block x="100" y="40" w="300" h="90" label="Low-Pass" stroke={BLUE} />
        <Res x="170" y="85" len="60" label="Series R" tone={N} />
        <M x="280" y="70">Shunt C</M>
        <Wire d="M 280 85 L 280 115" stroke={N} width="2" />
        <Wire d="M 270 95 L 290 95" stroke={N} width="2" />
        <Wire d="M 270 105 L 290 105" stroke={N} width="2" />
        
        <Block x="450" y="40" w="300" h="90" label="High-Pass" stroke={GREEN} />
        <M x="520" y="70">Series C</M>
        <Wire d="M 490 85 L 550 85" stroke={N} width="2" />
        <Wire d="M 515 75 L 515 95" stroke={N} width="2" />
        <Wire d="M 525 75 L 525 95" stroke={N} width="2" />
        <Res x="630" y="85" len="60" label="Shunt R" tone={N} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <M x="50" y="275">v_in</M>
        <Wire d="M 70 270 L 120 270" stroke={MUTED} />
        
        <Wire d="M 120 255 L 120 285" stroke={N} width="3" />
        <Wire d="M 140 255 L 140 285" stroke={N} width="3" />
        <M x="130" y="245">C_1</M>
        <Wire d="M 140 270 L 200 270" stroke={MUTED} />
        <Dot cx="200" cy="270" r="4" fill={N} />
        
        <Wire d="M 200 270 L 230 270" stroke={MUTED} />
        <Wire d="M 230 255 L 230 285" stroke={N} width="3" />
        <Wire d="M 250 255 L 250 285" stroke={N} width="3" />
        <M x="240" y="245">C_2</M>
        <Wire d="M 250 270 L 330 270" stroke={MUTED} />
        
        <Wire d="M 200 270 L 200 180 L 250 180" stroke={MUTED} />
        <Res x="286" y="180" len="72" label="R_1" tone={N} />
        <Wire d="M 322 180 L 480 180 L 480 270" stroke={MUTED} />
        
        <Wire d="M 330 270 L 330 310" stroke={MUTED} />
        <Res x="330" y="346" orient="v" len="72" label="R_2" tone={N} />
        <Wire d="M 330 382 L 330 420" stroke={MUTED} />
        <Wire d="M 310 420 L 350 420" stroke={MUTED} />
        <Wire d="M 320 425 L 340 425" stroke={MUTED} />
        <Wire d="M 325 430 L 335 430" stroke={MUTED} />
        
        <Wire d="M 330 270 L 360 270" stroke={MUTED} />
        <path d="M 360 220 L 460 270 L 360 320 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <M x="375" y="260" size="10" fill={BLUE}>+</M>
        <M x="375" y="290" size="10" fill={BLUE}>-</M>
        
        <Wire d="M 460 270 L 510 270" stroke={MUTED} />
        <Dot cx="480" cy="270" r="4" fill={N} />
        <M x="530" y="275">v_out</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 360 290 L 330 290 L 330 400 L 350 400" stroke={MUTED} />
        <Block x="350" y="380" w="40" h="40" label="K" mono stroke={BLUE} labelFill={BLUE} />
        <Wire d="M 390 400 L 480 400 L 480 270" stroke={MUTED} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Axes x="560" y="440" w="300" h="200" xLabel="f (log)" yLabel="|H| (dB)" />
        <Curve pts={[[560,440], [700,280], [850,280]]} stroke={GREEN} width="3" />
        <Wire d="M 700 280 L 700 440" stroke={MUTED} dash="4 4" />
        <M x="700" y="460" fill={MUTED}>f_c</M>
        <L x="610" y="330" fill={GREEN}>+40 dB/dec</L>
        <M x="830" y="265" fill={BLUE}>K</M>
      </g>
    </Scene>
  )
}

export function M4HighpassNormalizedCheckScene() {
  return (
    <Scene caption="VCVS high-pass gain check at frequency">
      <g className="aeam-insert">
        <Axes x="100" y="300" w="350" h="200" xLabel="f (Hz)" yLabel="|H|" />
        <Curve pts={[[100,300], [200, 200], [300, 150], [450, 150]]} stroke={BLUE} width="3" />
        
        <Dot cx="200" cy="200" r="5" fill={BLUE} />
        <Wire d="M 200 200 L 200 300" stroke={MUTED} dash="4 4" />
        <M x="200" y="320" size="12">1k</M>
        
        <Dot cx="250" cy="180" r="5" fill={GREEN} />
        <Wire d="M 250 180 L 250 300" stroke={MUTED} dash="4 4" />
        <M x="250" y="320" size="12">2k (f_0)</M>
        
        <Dot cx="400" cy="150" r="5" fill={PURP} />
        <Wire d="M 400 150 L 400 300" stroke={MUTED} dash="4 4" />
        <M x="400" y="320" size="12">10k</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Block x="500" y="80" w="300" h="60" label="x = f / f_0" mono />
        <Block x="500" y="160" w="300" h="60" label="|H| / K = x^2 / √((1 - x^2)^2 + (x/Q)^2)" mono stroke={GREEN} labelFill={GREEN} size="12" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Panel x="100" y="360" w="700" title="High-Pass Gain (Q = 0.707)" mono rows={[
          ['f = 1 kHz (x = 0.5)', '|H|/K = 0.31', MUTED],
          ['f = 2 kHz (x = 1.0)', '|H|/K = 0.707 (-3 dB)', GREEN],
          ['f = 10 kHz (x = 5.0)', '|H|/K = 0.99', PURP]
        ]} />
      </g>
    </Scene>
  )
}

export function M4MfbBandpassSpecMapScene() {
  return (
    <Scene caption="MFB band-pass filter: centre frequency, bandwidth and Q">
      <g className="aeam-insert">
        <M x="50" y="255">v_in</M>
        <Wire d="M 80 250 L 100 250" stroke={MUTED} />
        <Res x="136" y="250" len="72" label="R_1" tone={N} />
        <Wire d="M 172 250 L 200 250" stroke={MUTED} />
        <Dot cx="200" cy="250" r="4" fill={N} />
        
        <Wire d="M 200 250 L 200 300" stroke={MUTED} />
        <Wire d="M 185 300 L 215 300" stroke={N} width="3" />
        <Wire d="M 185 320 L 215 320" stroke={N} width="3" />
        <M x="230" y="315">C_1</M>
        <Wire d="M 200 320 L 200 360" stroke={MUTED} />
        <Wire d="M 180 360 L 220 360" stroke={MUTED} />
        <Wire d="M 190 365 L 210 365" stroke={MUTED} />
        <Wire d="M 195 370 L 205 370" stroke={MUTED} />
        
        <Wire d="M 200 250 L 250 250" stroke={MUTED} />
        <Wire d="M 250 235 L 250 265" stroke={N} width="3" />
        <Wire d="M 270 235 L 270 265" stroke={N} width="3" />
        <M x="260" y="225">C_2</M>
        <Wire d="M 270 250 L 320 250" stroke={MUTED} />
        
        <Dot cx="320" cy="250" r="4" fill={N} />
        
        <Wire d="M 320 250 L 350 250" stroke={MUTED} />
        <Wire d="M 320 290 L 350 290" stroke={MUTED} />
        <Wire d="M 300 290 L 320 290" stroke={MUTED} />
        <Wire d="M 280 290 L 320 290" stroke={MUTED} />
        <Wire d="M 300 285 L 320 285" stroke={MUTED} />
        <Wire d="M 300 330 L 300 290" stroke={MUTED} />
        <Wire d="M 280 330 L 320 330" stroke={MUTED} />
        <Wire d="M 290 335 L 310 335" stroke={MUTED} />
        <Wire d="M 295 340 L 305 340" stroke={MUTED} />
        
        <path d="M 350 200 L 450 270 L 350 340 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <M x="365" y="240" size="10" fill={BLUE}>-</M>
        <M x="365" y="300" size="10" fill={BLUE}>+</M>
        
        <Wire d="M 450 270 L 500 270" stroke={MUTED} />
        <Dot cx="470" cy="270" r="4" fill={N} />
        <M x="520" y="275">v_out</M>
        
        <Wire d="M 200 250 L 200 150 L 250 150" stroke={MUTED} />
        <Res x="286" y="150" len="72" label="R_2" tone={N} />
        <Wire d="M 322 150 L 470 150 L 470 270" stroke={MUTED} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Axes x="550" y="350" w="300" h="200" xLabel="f" yLabel="|H|" />
        <Curve pts={[[550,350], [600, 320], [650, 200], [700, 160], [750, 200], [800, 320], [850, 350]]} stroke={GREEN} width="3" />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 550 200 L 850 200" stroke={MUTED} dash="4 4" />
        <M x="520" y="205">-3 dB</M>
        
        <Wire d="M 650 200 L 650 350" stroke={MUTED} dash="4 4" />
        <M x="650" y="370">f_L</M>
        
        <Wire d="M 750 200 L 750 350" stroke={MUTED} dash="4 4" />
        <M x="750" y="370">f_H</M>
        
        <Wire d="M 700 160 L 700 350" stroke={MUTED} dash="4 4" />
        <M x="700" y="370">f_0</M>
        
        <Wire d="M 650 390 L 650 400 L 750 400 L 750 390" stroke={BLUE} width="2" />
        <M x="700" y="420" fill={BLUE}>BW = f_H - f_L</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Block x="600" y="50" w="150" h="50" label="Q = f_0 / BW" mono stroke={PURP} labelFill={PURP} />
      </g>
    </Scene>
  )
}

export function M4BandpassEdgeVerificationScene() {
  return (
    <Scene caption="MFB band-pass design check using target edges">
      <g className="aeam-insert">
        <Axes x="100" y="250" w="700" h="200" />
        <Curve pts={[[100,250], [300, 150], [400, 60], [450, 40], [500, 60], [600, 150], [800, 250]]} stroke={MUTED} width="3" dash="6 6" />
        <L x="450" y="25" fill={MUTED}>Target</L>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Curve pts={[[100,250], [320, 150], [430, 60], [480, 40], [530, 60], [640, 150], [800, 250]]} stroke={BLUE} width="3" />
        <L x="480" y="25" fill={BLUE}>Measured</L>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 100 80 L 800 80" stroke={MUTED} dash="4 4" />
        <M x="70" y="85">-3 dB</M>
        
        <Wire d="M 370 40 L 370 250" stroke={MUTED} width="2" />
        <M x="370" y="270" fill={MUTED}>950 Hz</M>
        
        <Wire d="M 530 40 L 530 250" stroke={MUTED} width="2" />
        <M x="530" y="270" fill={MUTED}>1050 Hz</M>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Panel x="250" y="320" w="400" title="Edge Verification" mono rows={[
          ['f_L (Target 950 Hz)', '970 Hz', RED],
          ['f_H (Target 1050 Hz)', '1090 Hz', RED],
          ['BW (Target 100 Hz)', '120 Hz', RED],
          ['f_0 (Target 998 Hz)', '1028 Hz', MUTED],
          ['Q (Target 10.0)', '8.6', MUTED]
        ]} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.6s' }}>
        <Block x="670" y="420" w="80" h="30" label="FAIL" stroke={RED} labelFill={RED} />
      </g>
    </Scene>
  )
}

export function M4NotchCancellationResponseScene() {
  return (
    <Scene caption="Band-stop filters: rejecting an unwanted band">
      <g className="aeam-insert">
        <M x="80" y="105">v_in</M>
        <Wire d="M 100 100 L 150 100" stroke={MUTED} />
        
        <Wire d="M 150 100 L 150 60 L 200 60" stroke={MUTED} />
        <Block x="200" y="40" w="120" h="40" label="Low-Pass" stroke={BLUE} />
        
        <Wire d="M 150 100 L 150 140 L 200 140" stroke={MUTED} />
        <Block x="200" y="120" w="120" h="40" label="High-Pass" stroke={GREEN} />
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '0.4s' }}>
        <Wire d="M 320 60 L 400 60 L 400 90" stroke={MUTED} />
        <Wire d="M 320 140 L 400 140 L 400 110" stroke={MUTED} />
        
        <path d="M 400 60 L 500 100 L 400 140 Z" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
        <M x="415" y="90" size="14" fill={PURP}>+</M>
        <M x="415" y="125" size="14" fill={PURP}>+</M>
        
        <Wire d="M 500 100 L 580 100" stroke={MUTED} />
        <M x="610" y="105">v_out</M>
      </g>
      
      <g className="aeam-traverse" style={{ animationDelay: '0.8s' }}>
        <Wire d="M 340 50 L 380 50" marker="url(#aeaArrB)" stroke={BLUE} width="3" />
        <Wire d="M 340 150 L 380 150" marker="url(#aeaArrG)" stroke={GREEN} width="3" />
        <M x="360" y="35" fill={BLUE}>+V(f_0)</M>
        <M x="360" y="170" fill={GREEN}>-V(f_0)</M>
        <L x="480" y="170" fill={PURP}>Cancellation at f_0</L>
      </g>
      
      <g className="aeam-insert" style={{ animationDelay: '1.2s' }}>
        <Axes x="100" y="450" w="700" h="200" xLabel="f" yLabel="|H|" />
        <Curve pts={[[100,280], [350, 280], [420, 290], [440, 320], [450, 440], [460, 320], [480, 290], [550, 280], [800, 280]]} stroke={BLUE} width="3" />
        
        <Wire d="M 100 300 L 800 300" stroke={MUTED} dash="4 4" />
        <M x="80" y="305">-3 dB</M>
        
        <Wire d="M 430 300 L 430 450" stroke={MUTED} dash="4 4" />
        <M x="410" y="470">f_L</M>
        
        <Wire d="M 470 300 L 470 450" stroke={MUTED} dash="4 4" />
        <M x="490" y="470">f_H</M>
        
        <M x="450" y="470" fill={BLUE}>f_0</M>
      </g>
    </Scene>
  )
}

/* ── Module 5 ────────────────────────────────────────────────────────── */

export function M5OpAmp({ x, y, tone = BLUE, label, flip = false, className = '' }) {
  const X = n(x)
  const Y = n(y)
  const top = flip ? '+' : '−'
  const bot = flip ? '−' : '+'
  return (
    <g transform={`translate(${X},${Y})`} className={className}>
      <path d="M -30 -30 L 30 0 L -30 30 Z" fill={WHITE} stroke={tone} strokeWidth="2.5" strokeLinejoin="round" />
      <text x="-16" y="-8" textAnchor="middle" fontSize="14" fontWeight="800" fill={tone} fontFamily="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace">{top}</text>
      <text x="-16" y="16" textAnchor="middle" fontSize="14" fontWeight="800" fill={tone} fontFamily="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace">{bot}</text>
      {label && <text x="0" y="4" textAnchor="middle" fontSize="12" fontWeight="700" fill={MUTED} fontFamily="system-ui,sans-serif">{label}</text>}
    </g>
  )
}

export function M5Diode({ x, y, tone = BLUE, label, orient = 'h', className = '' }) {
  const X = n(x)
  const Y = n(y)
  const rot = orient === 'v' ? 'rotate(90)' : orient === 'h-rev' ? 'rotate(180)' : orient === 'v-rev' ? 'rotate(-90)' : ''
  return (
    <g transform={`translate(${X},${Y})`} className={className}>
      <g transform={rot}>
        <path d="M -15 0 L -8 0 M 8 0 L 15 0" fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M -8 -10 L 8 0 L -8 10 Z" fill={WHITE} stroke={tone} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 8 -10 L 8 10" fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {label && <text x="0" y="-18" textAnchor="middle" fontSize="13" fontWeight="800" fill={tone} fontFamily="ui-monospace,SFMono-Regular,Menlo,Consolas,monospace">{label}</text>}
    </g>
  )
}

export function M5Switch({ x, y, tone = BLUE, state = 0, className = '' }) {
  const X = n(x)
  const Y = n(y)
  const dy = state === 0 ? -16 : 16
  return (
    <g transform={`translate(${X},${Y})`} className={className}>
      <circle cx="-16" cy="-16" r="3" fill={WHITE} stroke={tone} strokeWidth="2" />
      <circle cx="-16" cy="16" r="3" fill={WHITE} stroke={tone} strokeWidth="2" />
      <circle cx="16" cy="0" r="3" fill={WHITE} stroke={tone} strokeWidth="2" />
      <path d={`M -13 ${dy} L 13 0`} fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  )
}

export function M5SwitchV({ x, y, tone = BLUE, state = 0, className = '' }) {
  const X = n(x)
  const Y = n(y)
  const dx = state === 0 ? -16 : 16
  return (
    <g transform={`translate(${X},${Y})`} className={className}>
      <circle cx="-16" cy="16" r="3" fill={WHITE} stroke={tone} strokeWidth="2" />
      <circle cx="16" cy="16" r="3" fill={WHITE} stroke={tone} strokeWidth="2" />
      <circle cx="0" cy="-16" r="3" fill={WHITE} stroke={tone} strokeWidth="2" />
      <path d={`M 0 -13 L ${dx} 13`} fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  )
}

export function M5Ground({ x, y, tone = N }) {
  const X = n(x)
  const Y = n(y)
  return (
    <g transform={`translate(${X},${Y})`}>
      <path d="M -12 0 L 12 0 M -8 5 L 8 5 M -4 10 L 4 10" fill="none" stroke={tone} strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}

export function M5WeightedDacCircuitScene() {
  return (
    <Scene caption="Weighted Resistor DAC">
      <g className="aeam-cell-in aeam-delay-0">
        <M5OpAmp x="600" y="240" label="Summing Amp" />
        <Wire d="M 570 255 L 570 290" stroke={BLUE} />
        <M5Ground x="570" y="290" />
        <Wire d="M 630 240 L 700 240" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="720" y="244" size="14" fill={BLUE}>V_out</M>
        
        {/* Feedback */}
        <Wire d="M 570 225 L 570 140 L 584 140" stroke={BLUE} />
        <Res x="620" y="140" label="RF" len="72" />
        <Wire d="M 656 140 L 680 140 L 680 240 L 630 240" stroke={BLUE} />
      </g>
      
      <g className="aeam-cell-in aeam-delay-1">
        <Dot cx="570" cy="225" r="4" fill={BLUE} />
        <Wire d="M 570 225 L 450 225 L 450 120" stroke={BLUE} />
        <Wire d="M 450 225 L 450 300" stroke={BLUE} />
        <L x="490" y="215" size="13" fill={RED}>Virtual Ground (0V)</L>
      </g>
      
      <g className="aeam-cell-in aeam-delay-2">
        {/* Buses */}
        <Wire d="M 150 104 L 150 316" stroke={N} width="3" />
        <M x="150" y="90" size="14" weight="800">V_REF</M>
        
        <Wire d="M 120 136 L 120 316" stroke={N} width="3" />
        <M5Ground x="120" y="316" tone={N} />

        {/* Branches */}
        {[ 
          { y: 120, label: '8R', bit: 'b0 (LSB)', state: 1 },
          { y: 180, label: '4R', bit: 'b1', state: 0 },
          { y: 240, label: '2R', bit: 'b2', state: 1 },
          { y: 300, label: 'R', bit: 'b3 (MSB)', state: 0 }
        ].map((b, i) => (
          <g key={i}>
            <Wire d={`M 150 ${b.y - 16} L 184 ${b.y - 16}`} stroke={N} />
            <Dot cx="150" cy={b.y - 16} r="3" />
            <Wire d={`M 120 ${b.y + 16} L 184 ${b.y + 16}`} stroke={N} />
            <Dot cx="120" cy={b.y + 16} r="3" />
            
            <M5Switch x="200" y={b.y} state={b.state} className="aeam-swap" />
            <M x="200" y={b.y - 30} size="12" fill={BLUE}>{b.bit}</M>
            
            <Wire d={`M 216 ${b.y} L 264 ${b.y}`} stroke={BLUE} />
            <Res x="300" y={b.y} label={b.label} len="72" />
            <Wire d={`M 336 ${b.y} L 450 ${b.y}`} stroke={BLUE} />
            <Dot cx="450" cy={b.y} r="3" fill={BLUE} />
          </g>
        ))}
      </g>
    </Scene>
  )
}

export function M5ResistorSpreadChartScene() {
  const bars = [
    { bit: 'b7 (MSB)', val: 'R', h: 3 },
    { bit: 'b6', val: '2R', h: 6 },
    { bit: 'b5', val: '4R', h: 12 },
    { bit: 'b4', val: '8R', h: 24 },
    { bit: 'b3', val: '16R', h: 48 },
    { bit: 'b2', val: '32R', h: 96 },
    { bit: 'b1', val: '64R', h: 192 },
    { bit: 'b0 (LSB)', val: '128R', h: 320 }
  ]
  return (
    <Scene caption="Resistor Spread in Weighted DAC">
      <Axes x="120" y="440" w="650" h="360" xLabel="Bit (MSB to LSB)" yLabel="Resistance (Ω)" />
      {bars.map((b, i) => {
        const x = 160 + i * 80
        const delay = `aeam-delay-${i}`
        return (
          <g key={i} className={`aeam-cell-in ${delay}`}>
            <rect x={x - 20} y={440 - b.h} width="40" height={b.h} fill={BLUE} rx="4" />
            <M x={x} y={460} size="12" fill={MUTED}>{b.bit}</M>
            <M x={x} y={430 - b.h} size="12" fill={N}>{b.val}</M>
          </g>
        )
      })}
      
      <g className="aeam-cell-in aeam-delay-4">
        <Wire d="M 600 70 L 700 70 L 720 110" stroke={RED} marker="url(#aeaArrR)" />
        <Block x="360" y="40" w="240" h="60" label="Susceptible to Errors" sub="Noise & tolerance overshadow LSB" stroke={RED} />
      </g>
    </Scene>
  )
}

export function M5R2RLadderNodeScene() {
  return (
    <Scene caption="R-2R Ladder Node Impedance">
      <Wire d="M 400 100 L 400 200" stroke={BLUE} marker="url(#aeaArrB)" />
      <M x="410" y="140" size="14" fill={BLUE}>I_in</M>
      
      {/* The node */}
      <Dot cx="400" cy="200" r="5" />
      
      {/* Down path */}
      <Wire d="M 400 200 L 400 240" stroke={N} />
      <Res x="400" y="276" len="72" orient="v" label="2R" />
      <Wire d="M 400 312 L 400 350" stroke={N} />
      <M5Ground x="400" y="350" />
      
      {/* Right path */}
      <g className="aeam-cell-in aeam-delay-1">
        <Wire d="M 400 200 L 464 200" stroke={N} />
        <Res x="500" y="200" len="72" label="R" />
        <Wire d="M 536 200 L 600 200" stroke={N} />
      </g>
      
      {/* Next stage equivalent */}
      <g className="aeam-cell-in aeam-delay-2">
        <Dot cx="600" cy="200" r="5" />
        <Wire d="M 600 200 L 600 240" stroke={N} />
        <Res x="600" y="276" len="72" orient="v" label="2R" tone={MUTED} />
        <Wire d="M 600 312 L 600 350" stroke={N} />
        <M5Ground x="600" y="350" tone={MUTED} />
        
        <rect x="560" y="230" width="80" height="150" fill="none" stroke={MUTED} strokeDasharray="6 4" rx="8" />
        <L x="640" y="300" size="12" fill={MUTED} anchor="start">Next stage</L>
        <L x="640" y="320" size="12" fill={MUTED} anchor="start">equivalent</L>
      </g>
      
      {/* Equations */}
      <g className="aeam-cell-in aeam-delay-3">
        <Wire d="M 460 170 L 490 170 L 490 190" stroke={RED} marker="url(#aeaArrR)" fill="none" />
        <M x="490" y="150" size="14" fill={RED}>R + (2R || 2R) = 2R</M>
        
        <Wire d="M 360 170 L 390 170 L 390 190" stroke={GREEN} marker="url(#aeaArrG)" fill="none" />
        <M x="360" y="150" size="14" fill={GREEN} anchor="end">2R || 2R(right) = R</M>
        
        <Block x="60" y="200" w="240" h="100" label="Node Analysis" sub="Impedance looking down = 2R. Looking right = 2R. Total = R." />
      </g>
    </Scene>
  )
}

export function M5R2ROpampCircuitScene() {
  return (
    <Scene caption="R-2R DAC Implementation">
      {/* Op-amp and Feedback */}
      <g className="aeam-cell-in aeam-delay-2">
        <M5OpAmp x="720" y="200" label="Summing Amp" />
        <Wire d="M 690 215 L 690 250" stroke={BLUE} />
        <M5Ground x="690" y="250" />
        <Wire d="M 750 200 L 800 200" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="820" y="204" size="14" fill={BLUE}>V_out</M>
        
        <Wire d="M 690 185 L 690 120 L 704 120" stroke={BLUE} />
        <Res x="740" y="120" label="RF" len="72" />
        <Wire d="M 776 120 L 780 120 L 780 200 L 750 200" stroke={BLUE} />
      </g>

      <g className="aeam-cell-in aeam-delay-0">
        {/* R-2R Ladder and Switches */}
        {/* Termination */}
        <Wire d="M 250 200 L 150 200 L 150 236" stroke={N} />
        <Res x="150" y="272" len="72" orient="v" label="2R" />
        <Wire d="M 150 308 L 150 324" stroke={N} />
        <M5Ground x="150" y="324" />

        {/* Nodes and R branches */}
        {[
          { x: 250, label: 'b0 (LSB)', state: 1 },
          { x: 350, label: 'b1', state: 0 },
          { x: 450, label: 'b2', state: 1 },
          { x: 550, label: 'b3 (MSB)', state: 0 }
        ].map((node, i) => (
          <g key={i}>
            <Dot cx={node.x} cy="200" r="4" />
            {i < 3 && (
              <g>
                <Wire d={`M ${node.x} 200 L ${node.x + 14} 200`} stroke={N} />
                <Res x={node.x + 50} y="200" label="R" len="72" />
                <Wire d={`M ${node.x + 86} 200 L ${node.x + 100} 200`} stroke={N} />
              </g>
            )}
            
            {/* 2R Branch to Switch */}
            <Wire d={`M ${node.x} 200 L ${node.x} 236`} stroke={N} />
            <Res x={node.x} y="272" len="72" orient="v" label="2R" />
            <Wire d={`M ${node.x} 308 L ${node.x} 324`} stroke={N} />
            
            <M5SwitchV x={node.x} y="340" state={node.state} className="aeam-swap" />
            <M x={node.x} y="380" size="12" fill={BLUE}>{node.label}</M>
            
            <Wire d={`M ${node.x - 16} 356 L ${node.x - 16} 400`} stroke={N} />
            <Dot cx={node.x - 16} cy="400" r="3" />
            <Wire d={`M ${node.x + 16} 356 L ${node.x + 16} 430`} stroke={N} />
            <Dot cx={node.x + 16} cy="430" r="3" />
          </g>
        ))}
        
        {/* Connection to Op-Amp */}
        <Wire d="M 550 200 L 690 200 L 690 185" stroke={N} />
      </g>
      
      {/* Buses */}
      <g className="aeam-cell-in aeam-delay-1">
        <Wire d="M 200 400 L 600 400" stroke={N} width="3" />
        <M x="160" y="404" size="14" weight="800">V_REF</M>
        
        <Wire d="M 200 430 L 600 430" stroke={N} width="3" />
        <M5Ground x="180" y="430" />
      </g>
      
      {/* Current Arrows */}
      <g className="aeam-cell-in aeam-delay-3">
        <Wire d="M 334 390 L 334 360 L 350 330 L 350 310" stroke={AMBER} marker="url(#aeaArrA)" width="3" />
        <Wire d="M 534 390 L 534 360 L 550 330 L 550 310" stroke={AMBER} marker="url(#aeaArrA)" width="3" />
        <Wire d="M 600 190 L 650 190" stroke={AMBER} marker="url(#aeaArrA)" width="3" />
      </g>
    </Scene>
  )
}

export function M5DigitalRampBlockScene() {
  return (
    <Scene caption="Digital Ramp ADC Block Diagram">
      <g className="aeam-cell-in aeam-delay-0">
        <Block x="420" y="190" w="90" h="60" label="Binary" sub="Counter" />
        <Block x="560" y="190" w="80" h="60" label="DAC" />
        {/* N-bit bus */}
        <Wire d="M 510 210 L 560 210" stroke={BLUE} width="3" />
        <Wire d="M 510 230 L 560 230" stroke={BLUE} width="3" />
        <M x="535" y="200" size="12" fill={BLUE}>n bits</M>
      </g>
      
      <g className="aeam-cell-in aeam-delay-1">
        <Wire d="M 640 220 L 680 220 L 680 100 L 150 100 L 150 205 L 170 205" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="660" y="120" size="14" fill={BLUE}>V_DAC</M>
      </g>
      
      <g className="aeam-cell-in aeam-delay-2">
        <M5OpAmp x="200" y="220" label="Comparator" />
        <Wire d="M 100 235 L 170 235" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="100" y="225" size="14" fill={BLUE}>V_in</M>
      </g>
      
      <g className="aeam-cell-in aeam-delay-3">
        <Block x="300" y="200" w="60" h="40" label="AND" />
        <Wire d="M 230 220 L 265 220 L 265 210 L 300 210" stroke={BLUE} marker="url(#aeaArrB)" />
        
        <Block x="180" y="300" w="70" h="40" label="Clock" />
        <Wire d="M 250 320 L 265 320 L 265 230 L 300 230" stroke={BLUE} marker="url(#aeaArrB)" />
        
        <Wire d="M 360 220 L 420 220" stroke={BLUE} marker="url(#aeaArrB)" />
      </g>
    </Scene>
  )
}

export function M5RampTimingDiagramScene() {
  const steps1 = "M 100 220 L 110 220 L 110 210 L 120 210 L 120 200 L 130 200 L 130 190 L 140 190 L 140 180 L 150 180 L 150 170 L 160 170 L 160 160 L 170 160"
  const steps2 = "M 480 220 L 490 220 L 490 210 L 500 210 L 500 200 L 510 200 L 510 190 L 520 190 L 520 180 L 530 180 L 530 170 L 540 170 L 540 160 L 550 160 L 550 150 L 560 150 L 560 140 L 570 140 L 570 130 L 580 130 L 580 120 L 590 120"
  return (
    <Scene caption="Digital Ramp ADC Conversion Time">
      <Axes x="100" y="220" w="300" h="140" xLabel="Time" yLabel="Voltage" />
      <Wire d="M 100 160 L 350 160" stroke={MUTED} dash="6 4" />
      <L x="360" y="164" size="13" fill={MUTED} anchor="start">V_in1 (Low)</L>
      
      <g className="aeam-cell-in aeam-delay-0">
        <Wire d={steps1} stroke={BLUE} width="2.5" />
        <Wire d="M 100 240 L 160 240" stroke={RED} marker="url(#aeaArrR)" />
        <L x="130" y="260" size="12" fill={RED}>Conversion Time 1</L>
      </g>

      <Axes x="480" y="220" w="300" h="140" xLabel="Time" yLabel="Voltage" />
      <Wire d="M 480 120 L 730 120" stroke={MUTED} dash="6 4" />
      <L x="740" y="124" size="13" fill={MUTED} anchor="start">V_in2 (High)</L>
      
      <g className="aeam-cell-in aeam-delay-2">
        <Wire d={steps2} stroke={BLUE} width="2.5" />
        <Wire d="M 480 240 L 580 240" stroke={RED} marker="url(#aeaArrR)" />
        <L x="530" y="260" size="12" fill={RED}>Conversion Time 2</L>
      </g>
    </Scene>
  )
}

export function M5SarBinaryTreeScene() {
  return (
    <Scene caption="SAR Binary Search Tree">
      <g className="aeam-cell-in aeam-delay-0">
        <Block x="425" y="40" w="50" h="30" label="100" />
        <L x="450" y="30" size="12" fill={MUTED}>Start (MSB=1)</L>
      </g>
      
      <g className="aeam-cell-in aeam-delay-1">
        <Wire d="M 440 70 L 325 140" stroke={N} />
        <M x="360" y="100" size="11" fill={RED}>V_DAC &gt; V_in</M>
        <Block x="300" y="140" w="50" h="30" label="010" />
        
        <Wire d="M 460 70 L 575 140" stroke={N} />
        <M x="540" y="100" size="11" fill={GREEN}>V_DAC &lt; V_in</M>
        <Block x="550" y="140" w="50" h="30" label="110" />
      </g>
      
      <g className="aeam-cell-in aeam-delay-2">
        <Wire d="M 315 170 L 225 240" stroke={N} />
        <Block x="200" y="240" w="50" h="30" label="001" />
        <Wire d="M 335 170 L 375 240" stroke={N} />
        <Block x="350" y="240" w="50" h="30" label="011" />
        
        <Wire d="M 565 170 L 525 240" stroke={N} />
        <Block x="500" y="240" w="50" h="30" label="101" />
        <Wire d="M 585 170 L 675 240" stroke={N} />
        <Block x="650" y="240" w="50" h="30" label="111" />
      </g>
      
      {/* Leaves */}
      <g className="aeam-cell-in aeam-delay-3">
        <Wire d="M 215 270 L 175 340" stroke={N} />
        <Block x="150" y="340" w="50" h="30" label="000" />
        <Wire d="M 235 270 L 275 340" stroke={N} />
        <Block x="250" y="340" w="50" h="30" label="001" />
        
        <Wire d="M 365 270 L 325 340" stroke={N} />
        <Block x="300" y="340" w="50" h="30" label="010" />
        <Wire d="M 385 270 L 425 340" stroke={N} />
        <Block x="400" y="340" w="50" h="30" label="011" />
        
        <Wire d="M 515 270 L 475 340" stroke={N} />
        <Block x="450" y="340" w="50" h="30" label="100" />
        <Wire d="M 535 270 L 575 340" stroke={N} />
        <Block x="550" y="340" w="50" h="30" label="101" />
        
        <Wire d="M 665 270 L 625 340" stroke={N} />
        <Block x="600" y="340" w="50" h="30" label="110" />
        <Wire d="M 685 270 L 725 340" stroke={N} />
        <Block x="700" y="340" w="50" h="30" label="111" />
      </g>
      
      {/* Animated Path */}
      <Wire d="M 460 70 L 575 140 M 565 170 L 525 240 M 535 270 L 575 340" stroke={BLUE} width="4" className="aeam-traverse" opacity="0.8" />
    </Scene>
  )
}

export function M5SarAdcHardwareScene() {
  return (
    <Scene caption="SAR ADC Hardware Diagram">
      <g className="aeam-cell-in aeam-delay-0">
        <Block x="100" y="200" w="80" h="50" label="Sample" sub="& Hold" />
        <Wire d="M 40 225 L 100 225" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="50" y="215" size="14" fill={BLUE}>V_in</M>
      </g>
      
      <g className="aeam-cell-in aeam-delay-2">
        <M5OpAmp x="270" y="220" label="Comparator" />
        <Wire d="M 180 225 L 210 225 L 210 235 L 240 235" stroke={BLUE} marker="url(#aeaArrB)" />
        <Wire d="M 300 220 L 380 220" stroke={BLUE} marker="url(#aeaArrB)" />
      </g>
      
      <g className="aeam-cell-in aeam-delay-1">
        <Block x="380" y="185" w="100" h="70" label="SAR Logic" />
        <Block x="580" y="190" w="80" h="60" label="DAC" />
        <Wire d="M 480 210 L 580 210" stroke={BLUE} marker="url(#aeaArrB)" width="3" />
        <Wire d="M 480 230 L 580 230" stroke={BLUE} marker="url(#aeaArrB)" width="3" />
        <M x="530" y="200" size="12" fill={BLUE}>n bits</M>
        
        <Block x="390" y="300" w="80" h="40" label="Clock" />
        <Wire d="M 430 300 L 430 255" stroke={BLUE} marker="url(#aeaArrB)" />
        
        <Wire d="M 660 220 L 700 220 L 700 100 L 220 100 L 220 205 L 240 205" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="680" y="120" size="14" fill={BLUE}>V_DAC</M>
      </g>
    </Scene>
  )
}

export function M5SaturatingHwrCircuitScene() {
  return (
    <Scene caption="Saturating Precision Half-Wave Rectifier">
      <g className="aeam-cell-in aeam-delay-0">
        <M5OpAmp x="250" y="250" />
        <Wire d="M 150 265 L 220 265" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="150" y="255" size="14" fill={BLUE}>V_in</M>
        
        <Wire d="M 280 250 L 315 250" stroke={BLUE} />
        <M5Diode x="330" y="250" label="D1" tone={BLUE} />
        <Wire d="M 345 250 L 410 250" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="430" y="254" size="14" fill={BLUE}>V_out</M>
        
        <Dot cx="380" cy="250" r="4" fill={BLUE} />
        <Wire d="M 380 250 L 380 320" stroke={N} />
        <Res x="380" y="356" orient="v" label="R_L" />
        <Wire d="M 380 392 L 380 410" stroke={N} />
        <M5Ground x="380" y="410" />
      </g>
      
      <g className="aeam-cell-in aeam-delay-1">
        <Wire d="M 380 250 L 380 160 L 220 160 L 220 235" stroke={RED} width="3" className="aeam-rewire" />
        <Block x="450" y="140" w="220" h="50" label="Feedback Path" sub="Closes only when D1 is ON" stroke={RED} />
        <Wire d="M 450 160 L 380 160" stroke={RED} marker="url(#aeaArrR)" />
      </g>
    </Scene>
  )
}

export function M5NonSaturatingHwrScene() {
  return (
    <Scene caption="Non-Saturating Precision HWR">
      <g className="aeam-cell-in aeam-delay-0">
        <M5OpAmp x="250" y="250" />
        <Wire d="M 220 265 L 220 300" stroke={N} />
        <M5Ground x="220" y="300" />
        
        <Wire d="M 50 235 L 84 235" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="50" y="225" size="14" fill={BLUE}>V_in</M>
        <Res x="120" y="235" label="R1" />
        <Wire d="M 156 235 L 220 235" stroke={BLUE} />
        <Dot cx="180" cy="235" r="4" />
      </g>
      
      <g className="aeam-cell-in aeam-delay-2">
        <Wire d="M 280 250 L 315 250" stroke={N} />
        <M5Diode x="330" y="250" label="D2" />
        <Wire d="M 345 250 L 400 250" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="420" y="254" size="14" fill={BLUE}>V_out</M>
        <Dot cx="380" cy="250" r="4" />
        
        <Wire d="M 380 250 L 380 120 L 316 120" stroke={N} />
        <Res x="280" y="120" label="R2" />
        <Wire d="M 244 120 L 180 120 L 180 180" stroke={N} />
      </g>
      
      <g className="aeam-cell-in aeam-delay-3">
        <Dot cx="280" cy="250" r="4" />
        <Wire d="M 280 250 L 280 180 L 245 180" stroke={RED} />
        <M5Diode x="230" y="180" orient="h-rev" label="D1" tone={RED} />
        <Wire d="M 215 180 L 180 180 L 180 235" stroke={RED} />
        <Block x="450" y="140" w="220" h="60" label="Clamping Diode (D1)" sub="Prevents op-amp saturation" stroke={RED} />
        <Wire d="M 450 170 L 230 170" stroke={RED} marker="url(#aeaArrR)" />
      </g>
    </Scene>
  )
}

export function M5FwrBlockDiagramScene() {
  return (
    <Scene caption="Precision Full-Wave Rectifier Block Diagram">
      <g className="aeam-cell-in aeam-delay-0">
        <Wire d="M 100 230 L 160 230" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="100" y="220" size="14" fill={BLUE}>V_in</M>
        <Dot cx="160" cy="230" r="4" />
      </g>
      
      <g className="aeam-cell-in aeam-delay-1">
        <Wire d="M 160 230 L 160 150 L 220 150" stroke={N} />
        <Block x="300" y="150" w="160" h="70" label="Inverting HWR" sub="Gain = -1" />
        <Wire d="M 380 150 L 430 150" stroke={N} />
        <M x="410" y="140" size="13" fill={BLUE}>V_HWR</M>
        
        <Wave x="440" y="130" w="40" amp="15" cycles="1" />
      </g>
      
      <g className="aeam-cell-in aeam-delay-2">
        <Wire d="M 160 230 L 160 310 L 460 310 L 460 270" stroke={N} />
        <Wire d="M 430 150 L 460 150 L 460 230" stroke={N} />
        
        <Block x="550" y="250" w="180" h="80" label="Summing Amplifier" sub="V_in: -1, V_HWR: -2" />
        <Wire d="M 640 250 L 700 250" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="720" y="254" size="14" fill={BLUE}>V_out</M>
        
        <Wave x="740" y="230" w="40" amp="15" cycles="2" phase="0" />
      </g>
    </Scene>
  )
}

export function M5FwrSchematicMathScene() {
  return (
    <Scene caption="FWR Schematic and Gain Math">
      <g className="aeam-cell-in aeam-delay-0">
        <M x="50" y="155" size="14" fill={BLUE}>V_in</M>
        <Wire d="M 50 165 L 144 165" stroke={BLUE} marker="url(#aeaArrB)" />
        <Dot cx="100" cy="165" r="4" />
        
        {/* Stage 1: HWR */}
        <Res x="180" y="165" label="R" />
        <Wire d="M 216 165 L 270 165" stroke={N} />
        <M5OpAmp x="300" y="180" />
        <Wire d="M 270 195 L 270 220" stroke={N} />
        <M5Ground x="270" y="220" />
        
        <Wire d="M 330 180 L 355 180" stroke={N} />
        <M5Diode x="370" y="180" label="D2" />
        <Wire d="M 385 180 L 420 180" stroke={N} />
        <Dot cx="420" cy="180" r="4" />
        <M x="420" y="160" size="13" fill={BLUE}>V_A</M>
        
        <Wire d="M 420 180 L 420 100 L 336 100" stroke={N} />
        <Res x="300" y="100" label="R" />
        <Wire d="M 264 100 L 240 100 L 240 165" stroke={N} />
        <Dot cx="240" cy="165" r="4" />
        
        <Wire d="M 330 180 L 330 140 L 315 140" stroke={N} />
        <Dot cx="330" cy="180" r="4" />
        <M5Diode x="300" y="140" orient="h-rev" label="D1" />
        <Wire d="M 285 140 L 240 140" stroke={N} />
      </g>
      
      <g className="aeam-cell-in aeam-delay-2">
        {/* Stage 2: Summer */}
        <Wire d="M 420 180 L 464 180" stroke={N} />
        <Res x="500" y="180" label="R/2" />
        <Wire d="M 536 180 L 580 180 L 580 235" stroke={N} />
        
        <Wire d="M 100 165 L 100 300 L 464 300" stroke={N} />
        <Res x="500" y="300" label="R" />
        <Wire d="M 536 300 L 580 300 L 580 235" stroke={N} />
        <Dot cx="580" cy="235" r="4" />
        
        <Wire d="M 580 235 L 620 235" stroke={N} />
        <M5OpAmp x="650" y="250" />
        <Wire d="M 620 265 L 620 300" stroke={N} />
        <M5Ground x="620" y="300" />
        <Wire d="M 680 250 L 740 250" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="760" y="254" size="14" fill={BLUE}>V_out</M>
        
        <Wire d="M 700 250 L 700 120 L 636 120" stroke={N} />
        <Dot cx="700" cy="250" r="4" />
        <Res x="600" y="120" label="R" />
        <Wire d="M 564 120 L 540 120 L 540 235" stroke={N} />
      </g>
      
      <g className="aeam-cell-in aeam-delay-3">
        <Block x="400" y="420" w="300" h="70" label="Op-Amp 2 Gain Equations" sub="V_out = -(R/R)*V_in - (R/(R/2))*V_A" />
        <L x="400" y="475" size="14" fill={RED} weight="800">Gain(V_in) = -1</L>
        <L x="400" y="495" size="14" fill={RED} weight="800">Gain(V_A) = -2</L>
      </g>
    </Scene>
  )
}

export function M5Npn({ x, y, tone = N, className = '' }) {
  const X = n(x)
  const Y = n(y)
  return (
    <g transform={`translate(${X},${Y})`} className={className}>
      <path d="M -20 0 L -5 0" stroke={tone} strokeWidth="2.5" />
      <path d="M -5 -15 L -5 15" stroke={tone} strokeWidth="3" />
      <path d="M -5 -5 L 10 -20 M -5 5 L 10 20" stroke={tone} strokeWidth="2.5" fill="none" />
      <path d="M 5 18 L 10 20 L 10 14 Z" fill={tone} />
    </g>
  )
}

export function M5Zener({ x, y, tone = BLUE, orient = 'v', className = '' }) {
  const X = n(x)
  const Y = n(y)
  const rot = orient === 'v' ? 'rotate(90)' : ''
  return (
    <g transform={`translate(${X},${Y})`} className={className}>
      <g transform={rot}>
        <path d="M -15 0 L -8 0 M 8 0 L 15 0" fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M -8 -10 L 8 0 L -8 10 Z" fill={WHITE} stroke={tone} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M 8 -10 L 8 10" fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 8 -10 L 12 -10 M 8 10 L 4 10" fill="none" stroke={tone} strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </g>
  )
}

export function M5ZeroCrossingWaveformScene() {
  return (
    <Scene caption="Zero Crossing Detector Waveforms">
      <Axes x="100" y="140" w="650" h="80" xLabel="Time" yLabel="V_in" />
      
      <g className="aeam-cell-in aeam-delay-0">
        <Wave x="100" y="140" w="600" amp="50" cycles="2" />
      </g>
      
      <g className="aeam-cell-in aeam-delay-1">
        {[100, 250, 400, 550, 700].map((x, i) => (
          <Wire key={i} d={`M ${x} 140 L ${x} 400`} stroke={MUTED} dash="4 4" />
        ))}
      </g>

      <Axes x="100" y="340" w="650" h="100" xLabel="Time" yLabel="V_out" />
      
      <g className="aeam-cell-in aeam-delay-2">
        <Wire d="M 100 290 L 250 290 L 250 390 L 400 390 L 400 290 L 550 290 L 550 390 L 700 390" stroke={RED} width="3" />
        <M x="80" y="295" size="12" fill={RED}>+V_sat</M>
        <M x="80" y="395" size="12" fill={RED}>-V_sat</M>
      </g>
    </Scene>
  )
}

export function M5InvertingSchmittTransferScene() {
  return (
    <Scene caption="Inverting Schmitt Trigger Hysteresis">
      <g className="aeam-cell-in aeam-delay-0">
        <Axes x="150" y="250" w="550" h="200" origin="center" xLabel="V_in" yLabel="V_out" />
        <M x="500" y="270" size="12" fill={MUTED}>+UTP</M>
        <M x="300" y="270" size="12" fill={MUTED}>-LTP</M>
        <M x="410" y="155" size="12" fill={MUTED}>+V_sat</M>
        <M x="410" y="345" size="12" fill={MUTED}>-V_sat</M>
        
        <Wire d="M 300 245 L 300 255 M 500 245 L 500 255" stroke={MUTED} width="2" />
        <Wire d="M 395 150 L 405 150 M 395 350 L 405 350" stroke={MUTED} width="2" />
      </g>
      
      <g className="aeam-cell-in aeam-delay-1">
        {/* Increasing Path */}
        <Wire d="M 150 150 L 500 150 L 500 350 L 650 350" stroke={BLUE} width="3" />
        <Wire d="M 250 150 L 280 150" stroke={BLUE} marker="url(#aeaArrB)" width="3" />
        <Wire d="M 500 200 L 500 250" stroke={BLUE} marker="url(#aeaArrB)" width="3" />
        <Wire d="M 550 350 L 580 350" stroke={BLUE} marker="url(#aeaArrB)" width="3" />
      </g>
      
      <g className="aeam-cell-in aeam-delay-2">
        {/* Decreasing Path */}
        <Wire d="M 650 350 L 300 350 L 300 150 L 150 150" stroke={RED} width="3" />
        <Wire d="M 550 350 L 520 350" stroke={RED} marker="url(#aeaArrR)" width="3" />
        <Wire d="M 300 300 L 300 250" stroke={RED} marker="url(#aeaArrR)" width="3" />
        <Wire d="M 250 150 L 220 150" stroke={RED} marker="url(#aeaArrR)" width="3" />
      </g>
    </Scene>
  )
}

export function M5NonInvertingSchmittScene() {
  return (
    <Scene caption="Non-Inverting Schmitt Trigger">
      <g className="aeam-cell-in aeam-delay-0">
        <M5OpAmp x="400" y="250" />
        <Wire d="M 370 235 L 370 200" stroke={N} />
        <M5Ground x="370" y="200" />
        
        <Wire d="M 150 265 L 184 265" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="150" y="255" size="14" fill={BLUE}>V_in</M>
        <Res x="220" y="265" label="R1" />
        <Wire d="M 256 265 L 370 265" stroke={N} />
        <Dot cx="320" cy="265" r="4" />
        
        <Wire d="M 430 250 L 520 250" stroke={BLUE} marker="url(#aeaArrB)" />
        <M x="540" y="254" size="14" fill={BLUE}>V_out</M>
        <Dot cx="470" cy="250" r="4" />
        
        <Wire d="M 470 250 L 470 350 L 406 350" stroke={N} />
        <Res x="370" y="350" label="R2" />
        <Wire d="M 334 350 L 320 350 L 320 265" stroke={N} />
      </g>
      
      <g className="aeam-cell-in aeam-delay-2">
        <Wire d="M 180 280 L 260 280 L 260 270" stroke={RED} marker="url(#aeaArrR)" fill="none" />
        <M x="220" y="300" size="12" fill={RED}>Input term</M>
        
        <Wire d="M 450 365 L 320 365 L 320 300" stroke={RED} marker="url(#aeaArrR)" fill="none" />
        <M x="390" y="380" size="12" fill={RED}>Feedback term</M>
      </g>
    </Scene>
  )
}

export function M5LinearRegulatorBlockScene() {
  return (
    <Scene caption="Op-Amp Series Voltage Regulator">
      <g className="aeam-cell-in aeam-delay-0">
        <Wire d="M 100 120 L 460 120" stroke={N} width="3" />
        <Wire d="M 80 120 L 100 120" stroke={BLUE} marker="url(#aeaArrB)" width="3" />
        <M x="100" y="100" size="14" fill={BLUE}>Unregulated V_in</M>
        <Dot cx="200" cy="120" r="4" />
        
        <Wire d="M 200 120 L 200 144" stroke={N} />
        <Res x="200" y="180" orient="v" label="R_s" />
        <Wire d="M 200 216 L 200 250" stroke={N} />
        <Dot cx="200" cy="250" r="4" />
        <M5Zener x="200" y="270" orient="v" label="V_ref" tone={AMBER} />
        <Wire d="M 200 285 L 200 320" stroke={N} />
        <M5Ground x="200" y="320" />
      </g>
      
      <g className="aeam-cell-in aeam-delay-1">
        <M5OpAmp x="350" y="250" label="Error Amp" />
        <Wire d="M 200 250 L 320 250 L 320 265" stroke={AMBER} />
        
        <M5Npn x="460" y="180" label="Series Pass" />
        <Wire d="M 460 120 L 460 160" stroke={N} />
        <Wire d="M 380 250 L 410 250 L 410 180 L 440 180" stroke={BLUE} marker="url(#aeaArrB)" />
      </g>
      
      <g className="aeam-cell-in aeam-delay-2">
        <Wire d="M 470 200 L 650 200" stroke={BLUE} marker="url(#aeaArrB)" width="3" />
        <M x="670" y="204" size="14" fill={BLUE}>Regulated V_out</M>
        <Dot cx="550" cy="200" r="4" />
        
        <Wire d="M 550 200 L 550 232" stroke={N} />
        <Res x="550" y="268" orient="v" label="R1" />
        <Wire d="M 550 304 L 550 320" stroke={N} />
        <Dot cx="550" cy="320" r="4" />
        <Res x="550" y="356" orient="v" label="R2" />
        <Wire d="M 550 392 L 550 420" stroke={N} />
        <M5Ground x="550" y="420" />
        
        <Wire d="M 550 320 L 290 320 L 290 235 L 320 235" stroke={RED} className="aeam-rewire" width="2.5" />
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
        <g key={String(st)} className={`aeam-slide-in aeam-delay-${i}`}>
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
      <g className="aeam-emerge">
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
  // Module 3 — Negative Feedback
  'hartley-tank': M3HartleyTankScene,
  'crystal-equivalent-and-loop': M3CrystalEquivalentAndLoopScene,
  '555-monostable-timeline': M3555MonostableTimelineScene,
  '555-astable-charge-discharge': M3555AstableChargeDischargeScene,
  'oscillator-amplitude-trajectory': M3OscillatorAmplitudeTrajectoryScene,
  'wien-bridge-layout': M3WienBridgeLayoutScene,
  'rc-phase-shift-chain': M3RcPhaseShiftChainScene,
  'colpitts-tank': M3ColpittsTankScene,
  'feedback-topology-matrix': M3FeedbackTopologyMatrixScene,
  'feedback-resistance-compass': M3FeedbackResistanceCompassScene,
  'vcvs-closed-loop-block': M3VcvsClosedLoopBlockScene,
  'vcvs-desensitivity-chain': M3VcvsDesensitivityChainScene,
  'icvs-loop': M3IcvsLoopScene,
  'vcis-transconductance-map': M3VcisTransconductanceMapScene,
  'icis-transimpedance-block': M3IcisTransimpedanceBlockScene,
  'barkhausen-loop': M3BarkhausenLoopScene,
  // Module 1 — BJT AC Models
  'base-bias-ac-equivalent': M1BaseBiasAcEquivalentScene,
  'emitter-bias-ac-model': M1EmitterBiasAcModelScene,
  'small-signal-curve': M1SmallSignalCurveScene,
  'beta-comparison-graph': M1BetaComparisonGraphScene,
  're-derivation-block': M1ReDerivationBlockScene,
  'two-models-compare': M1TwoModelsCompareScene,
  'amplifier-block-model': M1AmplifierBlockModelScene,
  'voltage-gain-derivation': M1VoltageGainDerivationScene,
  'cascade-gain-blocks': M1CascadeGainBlocksScene,
  'cc-amplifier-schematic': M1CcAmplifierSchematicScene,
  'output-impedance-compare': M1OutputImpedanceCompareScene,
  'ce-cc-cascade': M1CeCcCascadeScene,
  'darlington-pair-diagram': M1DarlingtonPairDiagramScene,
  'series-regulator-circuit': M1SeriesRegulatorCircuitScene,
  'common-base-circuit': M1CommonBaseCircuitScene,
  // Module 2 — MOSFET Biasing in MOS Amplifier Circuits
  'fixed-vgs-transfer-curve': M2FixedVgsScene,
  'voltage-divider-bias-circuit': M2VoltageDividerScene,
  'drain-gate-feedback-circuit': M2DrainGateFeedbackScene,
  'small-signal-superposition-curve': M2SmallSignalSuperpositionScene,
  'drain-current-expansion-math': M2DrainCurrentExpansionScene,
  'voltage-gain-waveforms': M2VoltageGainWaveformsScene,
  'hybrid-pi-equivalent-circuit': M2HybridPiEquivalentScene,
  'transconductance-slope-graph': M2TransconductanceSlopeScene,
  't-model-circuit': M2TModelCircuitScene,
  'amplifier-topology-grid': M2AmplifierTopologyScene,
  'amplifier-black-box-model': M2AmplifierBlackBoxScene,
  'cs-amplifier-basic': M2CSAmplifierBasicScene,
  'cs-degeneration-model': M2CSDegenerationScene,
  'cg-input-resistance': M2CGInputResistanceScene,
  'cg-voltage-gain': M2CGVoltageGainScene,
  'source-follower-buffer': M2SourceFollowerScene,
  // Module 5 — Linear Op-amp Circuits
  'zero-crossing-waveform': M5ZeroCrossingWaveformScene,
  'inverting-schmitt-transfer': M5InvertingSchmittTransferScene,
  'non-inverting-schmitt': M5NonInvertingSchmittScene,
  'linear-regulator-block': M5LinearRegulatorBlockScene,
  'saturating-hwr-circuit': M5SaturatingHwrCircuitScene,
  'non-saturating-hwr': M5NonSaturatingHwrScene,
  'fwr-block-diagram': M5FwrBlockDiagramScene,
  'fwr-schematic-math': M5FwrSchematicMathScene,
  'digital-ramp-block': M5DigitalRampBlockScene,
  'ramp-timing-diagram': M5RampTimingDiagramScene,
  'sar-binary-tree': M5SarBinaryTreeScene,
  'sar-adc-hardware': M5SarAdcHardwareScene,
  'weighted-dac-circuit': M5WeightedDacCircuitScene,
  'resistor-spread-chart': M5ResistorSpreadChartScene,
  'r2r-ladder-node': M5R2RLadderNodeScene,
  'r2r-opamp-circuit': M5R2ROpampCircuitScene,
  // Module 4 — Power Amplifiers
  'power-budget-meter': M4PowerBudgetMeterScene,
  'dual-loadline-plane': M4DualLoadlinePlaneScene,
  'class-a-centred-swing': M4ClassACentredSwingScene,
  'class-b-halfwave-handoff': M4ClassBHalfwaveHandoffScene,
  'complementary-emitter-follower': M4ComplementaryEmitterFollowerScene,
  'class-c-resonant-recovery': M4ClassCResonantRecoveryScene,
  'four-ideal-response-panels': M4FourIdealResponsePanelsScene,
  'buffered-rc-lowpass': M4BufferedRcLowpassScene,
  'buffered-rc-highpass': M4BufferedRcHighpassScene,
  'unity-sallen-key-lowpass': M4UnitySallenKeyLowpassScene,
  'equal-component-q-control': M4EqualComponentQControlScene,
  'vcvs-highpass-swap': M4VcvsHighpassSwapScene,
  'highpass-normalized-check': M4HighpassNormalizedCheckScene,
  'mfb-bandpass-spec-map': M4MfbBandpassSpecMapScene,
  'bandpass-edge-verification': M4BandpassEdgeVerificationScene,
  'notch-cancellation-response': M4NotchCancellationResponseScene,
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


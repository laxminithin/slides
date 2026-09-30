/**
 * AimScenes — VTU BEE613D Electric Motor and Drive Systems for EVs classroom
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
    <div className={`aim-scene ${className}`} aria-label={caption || 'Automation in Manufacturing diagram'}>
      <svg viewBox={vb} role="img" className="aim-svg">
        <defs>
          <marker id="aimArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="aimArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="aimArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="aimArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="aimArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="aimArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="aimArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="aimArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="aimArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#aimArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#aimArr)" />
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
/* function Src({ cx, cy, r = 21, kind = 'v', label, tone = BLUE, className = '', dep = false, labelDy = 0, labelSide = 'left' }) {
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
function Bars({ x, y, w, items = [], accent = BLUE, rowH = 34, className = 'aimm-bar', max }) {
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
          <g className={`${className} aimm-delay-${i % 5}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
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
          className={`aimm-flux aimm-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`aimm-current aimm-delay-${i}`}
          marker="url(#aimArrB)"
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
        <g key={t} className={`aimm-cell-in aimm-delay-${i}`}>
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
        <g key={String(p)} className={`aimm-cell-in aimm-delay-${i % 5}`}>
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

/* ── AIM-specific primitives ─────────────────────────────────────────── */

/* Scene helpers unique to Automation in Manufacturing land here. Coerce every numeric
   prop through n() -- including width/length props, not just x and y. */


/* ── Module 1 ────────────────────────────────────────────────────────── */

export function M1ProductionSystemTwoHalvesScene() {
  return (
    <Scene caption="A production system divides into physical facilities and information support systems">
      <g className="aimm-insert">
        <rect x="40" y="60" width="820" height="380" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="3" />
        <L x="450" y="420" size={18} fill={BLUE} weight={800}>PRODUCTION SYSTEM</L>
        <path d="M450 60 L450 440" stroke={BLUE} strokeWidth="2" strokeDasharray="8 6" />
      </g>
      
      <g className="aimm-insert aimm-delay-1">
        <L x="245" y="90" size={16} fill={N} weight={800}>Facilities</L>
        <Block x="70" y="140" w="110" h="60" label="Milling" sub="Workstation" stroke={MUTED} fill={SKY} />
        <Block x="260" y="140" w="110" h="60" label="Turning" sub="Workstation" stroke={MUTED} fill={SKY} />
        <Block x="70" y="260" w="110" h="60" label="Assembly" sub="Workstation" stroke={MUTED} fill={SKY} />
        <Block x="260" y="260" w="110" h="60" label="Inspection" sub="Station" stroke={MUTED} fill={SKY} />
        <Wire d="M180 170 L260 170" stroke={MUTED} marker="url(#aimArrM)" />
        <Wire d="M315 200 L315 260" stroke={MUTED} marker="url(#aimArrM)" />
        <Wire d="M260 290 L180 290" stroke={MUTED} marker="url(#aimArrM)" />
        <circle cx="60" cy="170" r="6" fill={AMBER} />
        <circle cx="380" cy="170" r="6" fill={AMBER} />
        <circle cx="60" cy="290" r="6" fill={AMBER} />
      </g>

      <g className="aimm-insert aimm-delay-2">
        <L x="655" y="90" size={16} fill={N} weight={800}>Manufacturing Support Systems</L>
        <Block x="580" y="120" w="140" h="50" label="Product Design" stroke={TEAL} fill={WHITE} />
        <Block x="660" y="210" w="140" h="50" label="Process Planning" stroke={TEAL} fill={WHITE} />
        <Block x="660" y="300" w="140" h="50" label="Production Control" stroke={TEAL} fill={WHITE} />
        <Block x="500" y="260" w="130" h="50" label="Quality Control" stroke={TEAL} fill={WHITE} />
        
        <Wire d="M650 170 L650 190 L730 190 L730 210" stroke={TEAL} marker="url(#aimArrT)" />
        <Wire d="M730 260 L730 300" stroke={TEAL} marker="url(#aimArrT)" />
        <Wire d="M660 325 L565 325 L565 310" stroke={TEAL} marker="url(#aimArrT)" />
        <Wire d="M565 260 L565 200 L660 200" stroke={TEAL} marker="url(#aimArrT)" />
        
        <L x="735" y="185" size={12} fill={TEAL} anchor="start">Drawings</L>
        <L x="740" y="280" size={12} fill={TEAL} anchor="start">Route sheet</L>
        <L x="625" y="340" size={12} fill={TEAL}>Shop orders</L>
        <L x="615" y="195" size={12} fill={TEAL} anchor="end">Instructions</L>
      </g>

      <g className="aimm-descend">
        <Block x="360" y="5" w="180" h="40" label="AUTOMATION" stroke={AMBER} fill={WHITE} />
        <Wire d="M410 45 L245 45 L245 75" stroke={AMBER} width="3" marker="url(#aimArrA)" />
        <Wire d="M490 45 L655 45 L655 75" stroke={AMBER} width="3" marker="url(#aimArrA)" />
        <L x="245" y="40" size={13} fill={AMBER} weight={800}>Automated machinery</L>
        <L x="655" y="40" size={13} fill={AMBER} weight={800}>Computerised systems</L>
      </g>
    </Scene>
  )
}

export function M1QuantityVarietyLayoutMapScene() {
  return (
    <Scene caption="Quantity and variety together determine the layout and the appropriate automation">
      <Axes x="80" y="460" w="760" h="380" xLabel="Annual Production Quantity (log)" yLabel="Product Variety" tickLabels={[[80, '1'], [200, '10'], [320, '100'], [440, '1K'], [560, '10K'], [680, '100K'], [800, '1M']]} />
      
      <g className="aimm-insert">
        <rect x="80" y="80" width="240" height="180" fill={SKY} opacity="0.3" stroke={BLUE} strokeWidth="2" />
        <L x="200" y="105" size={15} fill={BLUE} weight={800}>JOB SHOP</L>
        <L x="200" y="125" size={13} fill={BLUE} weight={700}>Process Layout</L>
        <rect x="120" y="140" width="24" height="24" rx="4" fill={WHITE} stroke={MUTED} />
        <rect x="160" y="150" width="24" height="24" rx="4" fill={WHITE} stroke={MUTED} />
        <rect x="130" y="190" width="24" height="24" rx="4" fill={WHITE} stroke={MUTED} />
        <rect x="180" y="210" width="24" height="24" rx="4" fill={WHITE} stroke={MUTED} />
        <rect x="230" y="140" width="24" height="24" rx="4" fill={WHITE} stroke={MUTED} />
        <rect x="250" y="190" width="24" height="24" rx="4" fill={WHITE} stroke={MUTED} />
        <Wire d="M100 152 L120 152 M144 152 L160 162 M184 162 L250 202 M274 202 L290 202" stroke={MUTED} width="1.5" marker="url(#aimArrM)" />
        <Wire d="M100 202 L130 202 M154 202 L180 222 M204 222 L230 152 L250 152" stroke={MUTED} width="1.5" dash="3 2" marker="url(#aimArrM)" />
      </g>

      <g className="aimm-insert aimm-delay-1">
        <rect x="320" y="180" width="200" height="160" fill={GREEN} opacity="0.15" stroke={GREEN} strokeWidth="2" />
        <L x="420" y="205" size={15} fill={GREEN} weight={800}>BATCH &amp; CELLULAR</L>
        <L x="420" y="225" size={13} fill={GREEN} weight={700}>Cellular Layout</L>
        <rect x="370" y="250" width="24" height="24" rx="4" fill={WHITE} stroke={GREEN} />
        <rect x="410" y="250" width="24" height="24" rx="4" fill={WHITE} stroke={GREEN} />
        <rect x="450" y="250" width="24" height="24" rx="4" fill={WHITE} stroke={GREEN} />
        <rect x="370" y="290" width="24" height="24" rx="4" fill={WHITE} stroke={GREEN} />
        <rect x="450" y="290" width="24" height="24" rx="4" fill={WHITE} stroke={GREEN} />
        <Wire d="M350 302 L370 302 M382 290 L382 274 M394 262 L410 262 M434 262 L450 262 M462 274 L462 290 M474 302 L490 302" stroke={GREEN} width="1.5" marker="url(#aimArrG)" />
      </g>

      <g className="aimm-insert aimm-delay-2">
        <rect x="520" y="300" width="300" height="140" fill={AMBER} opacity="0.15" stroke={AMBER} strokeWidth="2" />
        <L x="670" y="325" size={15} fill={AMBER} weight={800}>MASS PRODUCTION</L>
        <L x="670" y="345" size={13} fill={AMBER} weight={700}>Product Layout</L>
        <rect x="560" y="380" width="24" height="24" rx="4" fill={WHITE} stroke={AMBER} />
        <rect x="620" y="380" width="24" height="24" rx="4" fill={WHITE} stroke={AMBER} />
        <rect x="680" y="380" width="24" height="24" rx="4" fill={WHITE} stroke={AMBER} />
        <rect x="740" y="380" width="24" height="24" rx="4" fill={WHITE} stroke={AMBER} />
        <Wire d="M530 392 L560 392" stroke={AMBER} width="2" marker="url(#aimArrA)" />
        <Wire d="M584 392 L620 392" stroke={AMBER} width="2" marker="url(#aimArrA)" />
        <Wire d="M644 392 L680 392" stroke={AMBER} width="2" marker="url(#aimArrA)" />
        <Wire d="M704 392 L740 392" stroke={AMBER} width="2" marker="url(#aimArrA)" />
        <Wire d="M764 392 L790 392" stroke={AMBER} width="2" marker="url(#aimArrA)" />
      </g>

      <g className="aimm-slide-in aimm-delay-3">
        <Wire d="M180 500 L760 500" stroke={ROSE} width="3" marker="url(#aimArrRo)" />
        <L x="180" y="490" size={13} fill={ROSE} weight={800} anchor="start">Stand-alone NC</L>
        <L x="420" y="490" size={13} fill={ROSE} weight={800}>Flexible Manufacturing</L>
        <L x="760" y="490" size={13} fill={ROSE} weight={800} anchor="end">Fixed Transfer Lines</L>
      </g>
    </Scene>
  )
}

export function M1SupportSystemInformationCycleScene() {
  return (
    <Scene caption="Support systems form an information cycle, and each stage can be computerised">
      <g className="aimm-insert">
        <Block x="380" y="60" w="140" h="60" label="Business" sub="Functions" stroke={MUTED} />
        <L x="300" y="65" size={12} fill={BLUE} weight={700}>Customer Order</L>
        <Wire d="M220 70 L380 70" stroke={BLUE} width="2" marker="url(#aimArrB)" />
      </g>
      
      <g className="aimm-insert aimm-delay-1">
        <Block x="660" y="140" w="140" h="60" label="Product" sub="Design" stroke={MUTED} />
        <Wire d="M520 90 L730 90 L730 140" stroke={MUTED} marker="url(#aimArrM)" />
      </g>
      
      <g className="aimm-insert aimm-delay-2">
        <Block x="660" y="320" w="140" h="60" label="Manufacturing" sub="Planning" stroke={MUTED} />
        <Wire d="M730 200 L730 320" stroke={MUTED} marker="url(#aimArrM)" />
        <L x="740" y="260" size={12} fill={N} anchor="start">Drawing &amp; BOM</L>
      </g>

      <g className="aimm-insert aimm-delay-3">
        <Block x="240" y="320" w="140" h="60" label="Manufacturing" sub="Control" stroke={MUTED} />
        <Wire d="M660 350 L380 350" stroke={MUTED} marker="url(#aimArrM)" />
        <L x="520" y="340" size={12} fill={N}>Route sheet &amp; Schedule</L>
      </g>

      <g className="aimm-insert aimm-delay-4">
        <Block x="140" y="140" w="140" h="60" label="Factory" sub="Operations" stroke={MUTED} />
        <Wire d="M310 320 L310 200" stroke={MUTED} marker="url(#aimArrM)" />
        <L x="320" y="260" size={12} fill={N} anchor="start">Shop orders</L>
        
        <Wire d="M210 140 L210 90 L380 90" stroke={MUTED} marker="url(#aimArrM)" />
        <L x="295" y="85" size={12} fill={N}>Completed work</L>

        <Wire d="M280 170 L480 170 L480 350 L660 350" stroke={TEAL} width="2" marker="url(#aimArrT)" />
        <L x="490" y="220" size={12} fill={TEAL} anchor="start">Actual Data Return</L>
      </g>

      <g className="aimm-pulse">
        <rect x="375" y="45" width="150" height="95" rx="8" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" />
        <L x="450" y="130" size={12} fill={AMBER} weight={800}>Order Entry</L>

        <rect x="655" y="125" width="150" height="95" rx="8" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" />
        <L x="730" y="210" size={12} fill={AMBER} weight={800}>CAD</L>

        <rect x="655" y="305" width="150" height="95" rx="8" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" />
        <L x="730" y="390" size={12} fill={AMBER} weight={800}>CAPP &amp; MRP</L>

        <rect x="235" y="305" width="150" height="95" rx="8" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" />
        <L x="310" y="390" size={12} fill={AMBER} weight={800}>Shop Floor Control</L>

        <rect x="135" y="125" width="150" height="95" rx="8" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" />
        <L x="210" y="210" size={12} fill={AMBER} weight={800}>Factory Data Collection</L>
      </g>
    </Scene>
  )
}

export function M1ThreeAutomationTypesComparisonScene() {
  return (
    <Scene caption="Fixed, programmable and flexible automation differ in how the sequence is changed">
      <Card x="40" y="50" w="250" h="300" title="Fixed Automation" accent={BLUE}>
        <g transform="translate(125, 100)">
          <rect x="-80" y="-20" width="30" height="30" rx="4" fill={SKY} stroke={BLUE} />
          <rect x="-30" y="-20" width="30" height="30" rx="4" fill={SKY} stroke={BLUE} />
          <rect x="20" y="-20" width="30" height="30" rx="4" fill={SKY} stroke={BLUE} />
          <Wire d="M-100 -5 L100 -5" stroke={BLUE} width="3" marker="url(#aimArrB)" />
        </g>
        <L x="125" y="160" size={12} fill={N} weight={700}>Hard-wired sequence</L>
        <L x="125" y="200" size={13} fill={N} weight={800}>Output Rate: VERY HIGH</L>
        <L x="125" y="230" size={13} fill={ROSE} weight={800}>Changeover: REBUILD</L>
      </Card>

      <Card x="325" y="50" w="250" h="300" title="Programmable Automation" accent={TEAL}>
        <g transform="translate(125, 100)">
          <rect x="-40" y="-30" width="50" height="50" rx="6" fill={WHITE} stroke={TEAL} strokeWidth="2" />
          <rect x="20" y="-10" width="30" height="30" rx="4" fill={WHITE} stroke={TEAL} />
          <circle cx="35" cy="5" r="5" fill={TEAL} />
          <Wire d="M-60 -5 L-40 -5" stroke={TEAL} width="2" marker="url(#aimArrT)" />
          <Wire d="M10 -5 L20 -5" stroke={TEAL} width="2" marker="url(#aimArrT)" />
        </g>
        <L x="125" y="160" size={12} fill={N} weight={700}>Program tape swapped</L>
        <L x="125" y="200" size={13} fill={N} weight={800}>Output Rate: MODERATE</L>
        <L x="125" y="230" size={13} fill={AMBER} weight={800}>Changeover: LOST TIME</L>
      </Card>

      <Card x="610" y="50" w="250" h="300" title="Flexible Automation" accent={GREEN}>
        <g transform="translate(125, 100)">
          <rect x="-60" y="-30" width="30" height="30" rx="4" fill={WHITE} stroke={GREEN} />
          <rect x="30" y="-30" width="30" height="30" rx="4" fill={WHITE} stroke={GREEN} />
          <rect x="-15" y="10" width="30" height="20" rx="4" fill={GREEN} opacity="0.3" />
          <Wire d="M-30 -15 L30 -15" stroke={GREEN} width="2" marker="url(#aimArrG)" />
          <Wire d="M0 -15 L0 10" stroke={GREEN} width="2" marker="url(#aimArrG)" />
        </g>
        <L x="125" y="160" size={12} fill={N} weight={700}>Mixed sequence, AGV flow</L>
        <L x="125" y="200" size={13} fill={N} weight={800}>Output Rate: MOD-HIGH</L>
        <L x="125" y="230" size={13} fill={GREEN} weight={800}>Changeover: ZERO</L>
      </Card>

      <g className="aimm-insert">
        <Wire d="M40 400 L860 400" stroke={MUTED} width="3" marker="url(#aimArrM)" />
        <L x="860" y="420" size={13} fill={MUTED} weight={700} anchor="end">Production Volume</L>
        
        <path d="M165 370 L165 390 L450 390" stroke={TEAL} width="2" fill="none" markerEnd="url(#aimArrT)" />
        <path d="M450 380 L450 390 L735 390" stroke={GREEN} width="2" fill="none" markerEnd="url(#aimArrG)" />
        <path d="M735 370 L735 390 L850 390" stroke={BLUE} width="2" fill="none" markerEnd="url(#aimArrB)" />
      </g>
    </Scene>
  )
}

export function M1WhenNotToAutomateBalanceScene() {
  return (
    <Scene caption="People remain the right answer for variety and judgement; a good design assigns each task accordingly">
      {/* Balance */}
      <g className="aimm-wrap">
        <Wire d="M250 180 L650 180" stroke={N} width="4" />
        <Wire d="M250 180 L230 220 M250 180 L270 220" stroke={MUTED} width="2" />
        <Wire d="M650 180 L630 220 M650 180 L670 220" stroke={MUTED} width="2" />
        <path d="M210 220 L290 220" stroke={BLUE} strokeWidth="4" />
        <path d="M610 220 L690 220" stroke={GREEN} strokeWidth="4" />
        
        <g transform="translate(250, 160)">
          <L x="0" y="-10" size={12} fill={BLUE} weight={700}>High Volume</L>
          <L x="0" y="-25" size={12} fill={BLUE} weight={700}>Repetitive Task</L>
          <L x="0" y="-40" size={12} fill={BLUE} weight={700}>Hazardous Env.</L>
          <L x="0" y="-55" size={12} fill={BLUE} weight={700}>Consistent Quality</L>
        </g>

        <g transform="translate(650, 160)">
          <L x="0" y="-10" size={12} fill={GREEN} weight={700}>High Variety</L>
          <L x="0" y="-25" size={12} fill={GREEN} weight={700}>Requires Judgement</L>
          <L x="0" y="-40" size={12} fill={GREEN} weight={700}>Dexterity</L>
          <L x="0" y="-55" size={12} fill={GREEN} weight={700}>Short Product Life</L>
        </g>
      </g>
      <path d="M450 180 L435 220 L465 220 Z" fill={N} />
      <L x="250" y="240" size={15} fill={BLUE} weight={800}>AUTOMATION</L>
      <L x="650" y="240" size={15} fill={GREEN} weight={800}>MANUAL LABOUR</L>

      {/* Volume slider */}
      <Wire d="M350 280 L550 280" stroke={MUTED} width="2" />
      <circle cx="450" cy="280" r="8" fill={AMBER} className="aimm-shift" />
      <L x="450" y="300" size={12} fill={N}>Production Volume</L>

      {/* Hybrid Cell */}
      <g className="aimm-insert aimm-delay-2">
        <rect x="250" y="340" width="400" height="120" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="2" strokeDasharray="6 4" />
        <L x="450" y="360" size={16} fill={N} weight={800}>Hybrid Workcell</L>
        
        <Block x="300" y="375" w="100" h="60" label="Robot" sub="Load / Unload" fill={SKY} stroke={BLUE} />
        <L x="350" y="450" size={12} fill={BLUE}>Best for repetition</L>
        
        <Block x="500" y="375" w="100" h="60" label="Person" sub="Inspect &amp; Assemble" fill={CREAM} stroke={GREEN} />
        <L x="550" y="450" size={12} fill={GREEN}>Best for judgement</L>

        <Wire d="M400 405 L500 405" stroke={N} marker="url(#aimArr)" />
      </g>
    </Scene>
  )
}

export function M1USAPrincipleThreeStepsScene() {
  return (
    <Scene caption="Understand, then simplify, then automate: automating an unsimplified process makes waste permanent">
      <Card x="40" y="50" w="250" h="280" title="1. Understand" accent={MUTED}>
        <g transform="translate(125, 60)">
          {[...Array(4)].map((_, r) => [...Array(3)].map((_, c) => (
             <rect key={`u-${r}-${c}`} x={-40 + c*30} y={r*30} width="20" height="20" fill={SKY} stroke={MUTED} />
          )))}
          <circle cx="45" cy="40" r="15" fill="none" stroke={AMBER} strokeWidth="2" />
          <L x="65" y="45" size={12} fill={AMBER} anchor="start">Inspect</L>
          <Wire d="M10 80 L-20 80 L-20 20" stroke={RED} marker="url(#aimArrR)" />
          <L x="-25" y="50" size={10} fill={RED} anchor="end">Rework</L>
        </g>
        <L x="125" y="200" size={12} fill={N} weight={700}>12 steps including rework</L>
        <L x="125" y="220" size={12} fill={N} weight={700}>and repeated inspections</L>
      </Card>

      <Card x="325" y="50" w="250" h="280" title="2. Simplify" accent={BLUE}>
        <g transform="translate(125, 60)">
          {[...Array(4)].map((_, r) => [...Array(3)].map((_, c) => {
             const keep = (r===0||(r===1&&c===1)||(r===2&&c!==1)||(r===3&&c===2));
             return <rect key={`s-${r}-${c}`} x={-40 + c*30} y={r*30} width="20" height="20" fill={keep ? BLUE : SKY} stroke={keep ? BLUE : MUTED} />
          }))}
        </g>
        <L x="125" y="200" size={12} fill={BLUE} weight={700}>Reduced to 7 steps</L>
        <L x="125" y="220" size={12} fill={MUTED} weight={700}>Eliminated • Combined • Resequenced</L>
      </Card>

      <Card x="610" y="50" w="250" h="280" title="3. Automate" accent={GREEN}>
        <g transform="translate(125, 60)">
          {[...Array(4)].map((_, r) => [...Array(3)].map((_, c) => {
             const keep = (r===0||(r===1&&c===1)||(r===2&&c!==1)||(r===3&&c===2));
             return keep ? (
               <g key={`a-${r}-${c}`}>
                 <rect x={-40 + c*30} y={r*30} width="20" height="20" fill={GREEN} stroke={TEAL} />
                 <circle cx={-30 + c*30} cy={10 + r*30} r="4" fill={WHITE} />
               </g>
             ) : null
          }))}
        </g>
        <L x="125" y="200" size={12} fill={GREEN} weight={700}>7 automated steps</L>
        <L x="125" y="220" size={12} fill={TEAL} weight={700}>Equipment effectively applied</L>
      </Card>

      <g className="aimm-insert aimm-delay-3">
        <Wire d="M165 330 L165 420 L360 420" stroke={RED} width="2" dash="6 4" marker="url(#aimArrR)" />
        <Block x="360" y="390" w="180" h="60" label="Ghost Shortcut" sub="Automating waste" fill={CREAM} stroke={RED} />
        <L x="450" y="475" size={12} fill={RED}>Produces 12 automated steps (expensive &amp; inflexible)</L>
      </g>
    </Scene>
  )
}

export function M1TenStrategiesChecklistScene() {
  const strategies = [
    "Specialisation of operations",
    "Combined operations",
    "Simultaneous operations",
    "Integration of operations",
    "Increased flexibility",
    "Improved material handling",
    "On-line inspection",
    "Process control and optimisation",
    "Plant operations control",
    "Computer integrated manufacturing"
  ];
  return (
    <Scene caption="Ten strategies form a checklist for improvement, applied together rather than as alternatives">
      <rect x="40" y="40" width="460" height="440" rx="12" fill="none" stroke={TEAL} strokeWidth="3" className="aimm-pulse" />
      <L x="270" y="30" size={14} fill={TEAL} weight={800} className="aimm-pulse">COMPUTER INTEGRATED MANUFACTURING</L>
      
      {strategies.map((strat, i) => (
        <g key={strat} transform={`translate(60, ${60 + i * 36})`} className={`aimm-slide-in aimm-delay-${i % 5}`}>
          <rect x="0" y="0" width="24" height="24" rx="4" fill={WHITE} stroke={BLUE} strokeWidth="2" />
          <path d="M6 12 L10 16 L18 8" stroke={BLUE} strokeWidth="3" fill="none" />
          <L x="36" y="16" size={14} fill={N} anchor="start" weight={700}>{i+1}. {strat}</L>
        </g>
      ))}

      <Panel x="530" y="60" w="320" title="Worked Example: Machining" accent={BLUE} 
        rows={[
          ['Original Time', '14.0 min', N],
          ['Combined Ops', '-3.0 min', GREEN],
          ['Simultaneous', '-2.5 min', GREEN],
          ['Handling', '-1.5 min', GREEN],
          ['Final Time', '7.0 min', BLUE]
        ]}
      />
      <g className="aimm-insert aimm-delay-4">
        <Bars x="540" y="270" w="300" max={14} items={[
          ['Original', 14.0, MUTED],
          ['Improved', 7.0, GREEN]
        ]} />
      </g>
    </Scene>
  )
}

export function M1MigrationThreePhasesTimelineScene() {
  const S_CURVE = [
    [100, 240], [200, 230], [300, 200], [400, 140], [500, 90], [600, 70], [700, 60], [800, 60]
  ];
  return (
    <Scene caption="Plan the three phases in advance so the factory follows demand without rebuilding from scratch">
      <Curve pts={S_CURVE} stroke={TEAL} width={4} className="aimm-traverse" />
      <L x="750" y="45" size={14} fill={TEAL} weight={800}>Product Demand</L>

      <Wire d="M80 260 L820 260" stroke={MUTED} width="3" marker="url(#aimArrM)" />
      <L x="820" y="280" size={13} fill={MUTED} anchor="end">Time</L>

      <g className="aimm-insert aimm-delay-1">
        <rect x="120" y="280" width="180" height="120" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <L x="210" y="305" size={15} fill={BLUE} weight={800}>PHASE 1</L>
        <L x="210" y="325" size={13} fill={N} weight={700}>Manual Stations</L>
        <L x="210" y="350" size={11} fill={MUTED}>Universal machines</L>
        <L x="210" y="365" size={11} fill={MUTED}>Rapid setup</L>
        <L x="210" y="380" size={11} fill={MUTED}>Design change tolerant</L>
      </g>

      <Wire d="M300 340 L340 340" stroke={BLUE} width="2" marker="url(#aimArrB)" className="aimm-shift" />
      <L x="320" y="330" size={10} fill={BLUE}>Equip</L>

      <g className="aimm-insert aimm-delay-2">
        <rect x="340" y="280" width="180" height="120" rx="8" fill={CREAM} stroke={AMBER} strokeWidth="2" />
        <L x="430" y="305" size={15} fill={AMBER} weight={800}>PHASE 2</L>
        <L x="430" y="325" size={13} fill={N} weight={700}>Automated Cells</L>
        <L x="430" y="350" size={11} fill={MUTED}>Operating separately</L>
        <L x="430" y="365" size={11} fill={MUTED}>Manual loading</L>
      </g>

      <Wire d="M520 340 L560 340" stroke={AMBER} width="2" marker="url(#aimArrA)" className="aimm-shift" />
      <L x="540" y="330" size={10} fill={AMBER}>Equip</L>

      <g className="aimm-insert aimm-delay-3">
        <rect x="560" y="280" width="180" height="120" rx="8" fill={CREAM} stroke={GREEN} strokeWidth="2" />
        <L x="650" y="305" size={15} fill={GREEN} weight={800}>PHASE 3</L>
        <L x="650" y="325" size={13} fill={N} weight={700}>Integrated System</L>
        <L x="650" y="350" size={11} fill={MUTED}>Automated transfer</L>
        <L x="650" y="365" size={11} fill={MUTED}>High volume plateau</L>
      </g>

      <g className="aimm-descend aimm-delay-4">
        <Wire d="M210 400 L210 460 L500 460" stroke={RED} dash="6 4" marker="url(#aimArrR)" />
        <L x="350" y="450" size={12} fill={RED}>Full automation at launch</L>
        <path d="M510 450 L530 470 M530 450 L510 470" stroke={RED} strokeWidth="3" />
        <L x="520" y="485" size={12} fill={RED}>Design change / Write-off</L>
      </g>
    </Scene>
  )
}

export function M1OperationsClassificationTreeScene() {
  return (
    <Scene caption="Processing changes one material, assembly joins several, and the classification decides what automation applies">
      <Block x="375" y="40" w="150" h="40" label="Manufacturing Ops" stroke={BLUE} />
      <Wire d="M450 80 L450 110 L220 110 L220 130" stroke={BLUE} width="2" marker="url(#aimArrB)" />
      <Wire d="M450 80 L450 110 L680 110 L680 130" stroke={BLUE} width="2" marker="url(#aimArrB)" />

      <g className="aimm-insert aimm-delay-1">
        <Block x="145" y="130" w="150" h="40" label="Processing Ops" fill={SKY} stroke={BLUE} />
        
        <Wire d="M220 170 L220 200 L120 200 L120 220" stroke={MUTED} width="2" />
        <Wire d="M220 170 L220 220" stroke={MUTED} width="2" />
        <Wire d="M220 170 L220 200 L320 200 L320 220" stroke={MUTED} width="2" />
        
        <L x="120" y="240" size={13} fill={N} weight={700}>Shaping</L>
        <L x="120" y="265" size={12} fill={MUTED}>• Solidification</L>
        <L x="120" y="285" size={12} fill={MUTED}>• Particulate</L>
        <L x="120" y="305" size={12} fill={MUTED}>• Deformation</L>
        <L x="120" y="325" size={12} fill={MUTED}>• Material Removal</L>
        
        <L x="220" y="240" size={13} fill={N} weight={700}>Property Enhancing</L>
        <L x="220" y="265" size={12} fill={MUTED}>• Heat Treatment</L>

        <L x="320" y="240" size={13} fill={N} weight={700}>Surface Processing</L>
        <L x="320" y="265" size={12} fill={MUTED}>• Cleaning</L>
        <L x="320" y="285" size={12} fill={MUTED}>• Coating / Painting</L>
      </g>

      <g className="aimm-insert aimm-delay-2">
        <Block x="605" y="130" w="150" h="40" label="Assembly Ops" fill={CREAM} stroke={AMBER} />
        
        <Wire d="M680 170 L680 200 L580 200 L580 220" stroke={MUTED} width="2" />
        <Wire d="M680 170 L680 200 L780 200 L780 220" stroke={MUTED} width="2" />
        
        <L x="580" y="240" size={13} fill={N} weight={700}>Permanent Joining</L>
        <L x="580" y="265" size={12} fill={MUTED}>• Welding</L>
        <L x="580" y="285" size={12} fill={MUTED}>• Brazing &amp; Soldering</L>
        <L x="580" y="305" size={12} fill={MUTED}>• Adhesive Bonding</L>
        
        <L x="780" y="240" size={13} fill={N} weight={700}>Mechanical Fastening</L>
        <L x="780" y="265" size={12} fill={MUTED}>• Threaded fasteners</L>
        <L x="780" y="285" size={12} fill={MUTED}>• Permanent methods</L>
      </g>

      <g className="aimm-slide-in aimm-delay-3">
        <rect x="50" y="360" width="800" height="120" rx="8" fill={WHITE} stroke={MUTED} strokeDasharray="4 4" />
        <L x="450" y="380" size={14} fill={MUTED} weight={800}>AUTOMATION APPLICATION</L>
        
        <Block x="70" y="395" w="220" h="60" label="Shaping Ops" sub="Most highly automated (CNC)" stroke={BLUE} fill={SKY} />
        <Block x="340" y="395" w="220" h="60" label="Processing Ops" sub="Easier to automate than assembly" stroke={GREEN} fill={CREAM} />
        <Block x="610" y="395" w="220" h="60" label="Assembly Ops" sub="Difficult; often remains manual" stroke={RED} fill={CREAM} />
      </g>
    </Scene>
  )
}

export function M1HardVersusSoftVarietyScene() {
  return (
    <Scene caption="Hard variety needs different lines and soft variety can share one">
      <Card x="40" y="40" w="390" h="360" title="Hard Variety" accent={AMBER}>
        <g transform="translate(40, 70)">
          <Block x="0" y="0" w="140" h="50" label="Saloon Car" stroke={MUTED} fill={WHITE} />
          <Block x="170" y="0" w="140" h="50" label="Heavy Truck" stroke={MUTED} fill={WHITE} />
          <Bars x="0" y="70" w="310" max={100} items={[['Shared Parts', 5, AMBER]]} rowH={24} />
          
          <L x="155" y="160" size={13} fill={N} weight={700}>Requires separate production lines</L>
          <Wire d="M0 190 L310 190" stroke={AMBER} width="3" markerEnd="url(#aimArrA)" />
          <rect x="40" y="180" width="20" height="20" fill={WHITE} stroke={AMBER} />
          <rect x="120" y="180" width="20" height="20" fill={WHITE} stroke={AMBER} />
          
          <Wire d="M0 240 L310 240" stroke={RED} width="3" markerEnd="url(#aimArrR)" />
          <circle cx="50" cy="240" r="12" fill={WHITE} stroke={RED} strokeWidth="2" />
          <circle cx="160" cy="240" r="12" fill={WHITE} stroke={RED} strokeWidth="2" />
        </g>
      </Card>

      <Card x="470" y="40" w="390" h="360" title="Soft Variety" accent={BLUE}>
        <g transform="translate(40, 70)">
          <Block x="0" y="0" w="140" h="50" label="Base Trim" stroke={MUTED} fill={WHITE} />
          <Block x="170" y="0" w="140" h="50" label="Luxury Trim" stroke={MUTED} fill={WHITE} />
          <Bars x="0" y="70" w="310" max={100} items={[['Shared Parts', 90, BLUE]]} rowH={24} />
          
          <L x="155" y="160" size={13} fill={N} weight={700}>Can share a single mixed-model line</L>
          <Wire d="M0 215 L310 215" stroke={BLUE} width="3" markerEnd="url(#aimArrB)" />
          <rect x="40" y="205" width="20" height="20" fill={WHITE} stroke={BLUE} />
          <circle cx="100" cy="215" r="12" fill={WHITE} stroke={TEAL} strokeWidth="2" />
          <rect x="160" y="205" width="20" height="20" fill={WHITE} stroke={BLUE} />
          <circle cx="220" cy="215" r="12" fill={WHITE} stroke={TEAL} strokeWidth="2" />
        </g>
      </Card>

      <g className="aimm-insert aimm-delay-3">
        <Block x="200" y="430" w="500" h="60" label="Total Variety Indicator" sub="Both cases have exactly 2 models, but the required investment differs entirely" stroke={GREEN} fill={CREAM} />
      </g>
    </Scene>
  )
}

export function M1CycleTimeAndBatchSizeScene() {
  const S_CURVE = [
    [120, 360], [160, 280], [220, 230], [320, 190], [450, 160], [600, 140], [800, 130]
  ];
  const INV_CURVE = [
    [120, 420], [800, 160]
  ];
  const TOTAL_CURVE = [
    [120, 310], [160, 240], [220, 190], [320, 160], [450, 150], [600, 170], [800, 210]
  ];

  return (
    <Scene caption="Setup time spread over a batch is what makes large batches look cheap and small batches look expensive">
      {/* Timeline */}
      <g className="aimm-insert">
        <L x="80" y="40" size={13} fill={N} weight={800} anchor="start">Batch Timeline</L>
        <rect x="80" y="55" width="60" height="30" fill={ROSE} opacity="0.8" />
        <L x="110" y="75" size={11} fill={WHITE} weight={700}>Setup</L>
        
        <rect x="142" y="55" width="120" height="30" fill={BLUE} opacity="0.8" />
        <L x="202" y="75" size={11} fill={WHITE} weight={700}>Cycle 1</L>
        
        <rect x="264" y="55" width="120" height="30" fill={BLUE} opacity="0.8" />
        <L x="324" y="75" size={11} fill={WHITE} weight={700}>Cycle 2</L>
        
        <rect x="386" y="55" width="120" height="30" fill={BLUE} opacity="0.8" />
        <L x="446" y="75" size={11} fill={WHITE} weight={700}>Cycle 3</L>

        <path d="M142 95 L142 105 L262 105 L262 95" fill="none" stroke={MUTED} />
        <L x="202" y="120" size={11} fill={MUTED}>Processing + Handling</L>
      </g>

      <Axes x="80" y="460" w="760" h="300" xLabel="Batch Quantity (Q)" yLabel="Time / Cost" tickLabels={[[80, '0']]} />
      <Wire d="M80 430 L840 430" stroke={MUTED} dash="4 4" width="2" />
      <L x="840" y="420" size={12} fill={MUTED} anchor="end">Base Cycle Time Limit</L>

      <g className="aimm-traverse aimm-delay-1">
        <Curve pts={S_CURVE} stroke={BLUE} width="3" />
        <L x="320" y="180" size={12} fill={BLUE} weight={700}>Average Production Time per Piece</L>
        
        <Dot cx="160" cy="280" r="5" fill={BLUE} />
        <L x="175" y="275" size={11} fill={BLUE} anchor="start">Small Q: Expensive</L>
        
        <Dot cx="320" cy="190" r="5" fill={BLUE} />
        <L x="335" y="185" size={11} fill={BLUE} anchor="start">Mid Q</L>

        <Dot cx="600" cy="140" r="5" fill={BLUE} />
        <L x="615" y="135" size={11} fill={BLUE} anchor="start">Large Q: Gains plateau</L>
      </g>

      <g className="aimm-traverse aimm-delay-2">
        <Curve pts={INV_CURVE} stroke={AMBER} width="3" />
        <L x="700" y="220" size={12} fill={AMBER} weight={700}>Inventory Cost</L>
      </g>

      <g className="aimm-traverse aimm-delay-3">
        <Curve pts={TOTAL_CURVE} stroke={GREEN} width="4" />
        <L x="450" y="135" size={13} fill={GREEN} weight={800}>Total Minimum</L>
        <Dot cx="450" cy="150" r="6" fill={GREEN} />
        <Wire d="M450 150 L450 460" stroke={GREEN} width="2" dash="4 4" />
      </g>
    </Scene>
  )
}

export function M1CapacityUtilisationAvailabilityBarsScene() {
  return (
    <Scene caption="Capacity is what the plant could do, utilisation is what it does, availability is what equipment allows">
      <g className="aimm-insert">
        <L x="160" y="50" size={14} fill={N} weight={800}>Theoretical Capacity</L>
        <rect x="120" y="80" width="80" height="400" fill={BLUE} opacity="0.1" />
        <rect x="120" y="80" width="80" height="400" fill="none" stroke={BLUE} strokeWidth="2" />
      </g>

      <g className="aimm-insert aimm-delay-1">
        <rect x="120" y="80" width="80" height="60" fill={ROSE} />
        <Wire d="M200 110 L250 110" stroke={ROSE} marker="url(#aimArrRo)" />
        <L x="260" y="105" size={13} fill={ROSE} anchor="start" weight={800}>Breakdowns &amp; Maintenance</L>
        <L x="260" y="125" size={12} fill={MUTED} anchor="start">Availability = (MTBF) / (MTBF + MTTR)</L>
      </g>

      <g className="aimm-insert aimm-delay-2">
        <rect x="120" y="140" width="80" height="70" fill={AMBER} />
        <Wire d="M200 175 L250 175" stroke={AMBER} marker="url(#aimArrA)" />
        <L x="260" y="170" size={13} fill={AMBER} anchor="start" weight={800}>Lack of Work / Idle Time</L>
        <L x="260" y="190" size={12} fill={MUTED} anchor="start">Utilisation = Actual Output / Capacity</L>
      </g>

      <g className="aimm-insert aimm-delay-3">
        <rect x="120" y="210" width="80" height="50" fill={MUTED} />
        <Wire d="M200 235 L250 235" stroke={MUTED} marker="url(#aimArrM)" />
        <L x="260" y="230" size={13} fill={MUTED} anchor="start" weight={800}>Setup &amp; Changeover</L>
      </g>

      <g className="aimm-insert aimm-delay-4">
        <rect x="120" y="260" width="80" height="220" fill={GREEN} />
        <Wire d="M200 370 L250 370" stroke={GREEN} marker="url(#aimArrG)" />
        <L x="260" y="375" size={16} fill={GREEN} anchor="start" weight={800}>Actual Output</L>
      </g>

      <g className="aimm-insert aimm-delay-5">
        <Block x="520" y="120" w="320" h="280" stroke={TEAL} fill={WHITE} />
        <L x="680" y="150" size={14} fill={TEAL} weight={800}>Manufacturing Lead Time &amp; WIP</L>
        
        <rect x="560" y="180" width="60" height="60" rx="4" fill={SKY} stroke={BLUE} />
        <L x="590" y="215" size={14} fill={BLUE} weight={700}>M1</L>
        
        <rect x="740" y="180" width="60" height="60" rx="4" fill={SKY} stroke={BLUE} />
        <L x="770" y="215" size={14} fill={BLUE} weight={700}>M2</L>
        
        <Wire d="M620 210 L740 210" stroke={MUTED} />
        <rect x="640" y="195" width="15" height="15" fill={AMBER} />
        <rect x="665" y="195" width="15" height="15" fill={AMBER} />
        <rect x="690" y="195" width="15" height="15" fill={AMBER} />
        <L x="675" y="185" size={11} fill={AMBER}>Queue (WIP)</L>

        <rect x="560" y="320" width="40" height="20" fill={GREEN} />
        <L x="580" y="310" size={10} fill={GREEN}>Process</L>
        
        <rect x="600" y="320" width="140" height="20" fill={AMBER} />
        <L x="670" y="310" size={10} fill={AMBER}>Non-Operation (Wait) Time</L>
        
        <rect x="740" y="320" width="40" height="20" fill={GREEN} />
        <L x="760" y="310" size={10} fill={GREEN}>Process</L>
        
        <path d="M560 350 L560 360 L780 360 L780 350" fill="none" stroke={TEAL} />
        <L x="670" y="375" size={12} fill={TEAL} weight={700}>Manufacturing Lead Time</L>
      </g>
    </Scene>
  )
}

export function M1CostPerPieceBuildupScene() {
  return (
    <Scene caption="Express labour and equipment as hourly rates with overheads, and compare totals rather than single components">
      <g className="aimm-insert">
        <L x="250" y="100" size={15} fill={N} weight={800}>Manual Total</L>
        <L x="250" y="120" size={24} fill={RED} weight={800}>$24.00</L>
        
        {/* Tooling */}
        <rect x="200" y="160" width="100" height="10" fill={AMBER} />
        <L x="190" y="170" size={12} fill={AMBER} anchor="end">Tooling</L>
        
        {/* Equip OH */}
        <rect x="200" y="170" width="100" height="20" fill={SKY} />
        <L x="190" y="185" size={12} fill={BLUE} anchor="end">Equip Overhead</L>
        
        {/* Equip */}
        <rect x="200" y="190" width="100" height="30" fill={BLUE} />
        <L x="190" y="210" size={12} fill={BLUE} anchor="end">Equipment Rate</L>
        
        {/* Lab OH */}
        <rect x="200" y="220" width="100" height="60" fill={TEAL} />
        <L x="190" y="255" size={12} fill={TEAL} anchor="end">Labour Overhead</L>
        
        {/* D.Labour */}
        <rect x="200" y="280" width="100" height="80" fill={GREEN} />
        <L x="190" y="325" size={12} fill={GREEN} anchor="end">Direct Labour</L>
        
        {/* Material */}
        <rect x="200" y="360" width="100" height="40" fill={MUTED} />
        <L x="190" y="385" size={12} fill={MUTED} anchor="end">Material</L>
      </g>

      <g className="aimm-insert aimm-delay-1">
        <L x="450" y="100" size={15} fill={N} weight={800}>Automated Total</L>
        <L x="450" y="120" size={24} fill={GREEN} weight={800}>$22.00</L>
        
        {/* Tooling */}
        <rect x="400" y="180" width="100" height="15" fill={AMBER} />
        <L x="510" y="192" size={12} fill={AMBER} anchor="start">Tooling (grows)</L>
        
        {/* Equip OH */}
        <rect x="400" y="195" width="100" height="50" fill={SKY} />
        <L x="510" y="225" size={12} fill={BLUE} anchor="start">Equip OH (grows)</L>
        
        {/* Equip */}
        <rect x="400" y="245" width="100" height="80" fill={BLUE} />
        <L x="510" y="290" size={12} fill={BLUE} anchor="start">Equip Rate (grows)</L>
        
        {/* Lab OH */}
        <rect x="400" y="325" width="100" height="15" fill={TEAL} />
        <L x="510" y="337" size={12} fill={TEAL} anchor="start">Lab OH (shrinks)</L>
        
        {/* D.Labour */}
        <rect x="400" y="340" width="100" height="20" fill={GREEN} />
        <L x="510" y="355" size={12} fill={GREEN} anchor="start">Dir. Lab (shrinks)</L>
        
        {/* Material */}
        <rect x="400" y="360" width="100" height="40" fill={MUTED} />
        <L x="510" y="385" size={12} fill={MUTED} anchor="start">Material (constant)</L>
      </g>

      <g className="aimm-traverse aimm-delay-2">
        <Wire d="M200 440 L500 440" stroke={MUTED} width="3" marker="url(#aimArrM)" />
        <L x="500" y="460" size={12} fill={MUTED} anchor="end">Production Volume</L>
        
        <circle cx="450" cy="440" r="8" fill={GREEN} />
        <L x="450" y="425" size={12} fill={GREEN}>Above Break-even</L>
        <Wire d="M450 440 L450 400" stroke={GREEN} dash="4 4" />
      </g>
    </Scene>
  )
}

export function M1WorkedProblemMethodScene() {
  return (
    <Scene caption="Choose the model, fix the units, substitute, then sanity check the answer against something you already know">
      <Card x="30" y="60" w="190" h="300" title="1. Given Data" accent={MUTED}>
        <g transform="translate(95, 90)">
          <M x="0" y="0" size={14} fill={N}>Q = 100 pieces</M>
          <M x="0" y="40" size={14} fill={N}>Tc = 2.5 min</M>
          <M x="0" y="80" size={14} fill={N}>Tsu = 2.0 hr</M>
          
          <g className="aimm-slide-in aimm-delay-1">
            <Wire d="M0 100 L0 120" stroke={TEAL} markerEnd="url(#aimArrT)" />
            <rect x="-60" y="130" width="120" height="30" rx="4" fill={CREAM} stroke={TEAL} />
            <M x="0" y="150" size={14} fill={TEAL}>120 min</M>
            <L x="0" y="180" size={11} fill={TEAL}>Unit Consistency!</L>
          </g>
        </g>
      </Card>

      <Card x="240" y="60" w="190" h="300" title="2. Select Model" accent={BLUE}>
        <g transform="translate(95, 120)">
          <M x="0" y="-30" size={14} fill={BLUE}>Tb = Tsu + Q*Tc</M>
          <L x="0" y="-10" size={11} fill={BLUE}>Matches given variables</L>
          
          <g className="aimm-slide-in aimm-delay-2">
            <M x="0" y="30" size={14} fill={MUTED}>Tp = Tb / Q</M>
            <Wire d="M-40 25 L40 25" stroke={RED} width="2" />
            
            <M x="0" y="70" size={14} fill={MUTED}>Rp = 60 / Tp</M>
            <Wire d="M-40 65 L40 65" stroke={RED} width="2" />
          </g>
        </g>
      </Card>

      <Card x="450" y="60" w="190" h="300" title="3. Substitute" accent={AMBER}>
        <g transform="translate(95, 120)">
          <g className="aimm-slide-in aimm-delay-3">
            <M x="0" y="-30" size={14} fill={N}>Tb = 120 + 100*2.5</M>
            <M x="0" y="10" size={14} fill={N}>Tb = 120 + 250</M>
            <rect x="-60" y="40" width="120" height="30" rx="4" fill={CREAM} stroke={AMBER} />
            <M x="0" y="60" size={14} fill={AMBER} weight={800}>Tb = 370 min</M>
          </g>
        </g>
      </Card>

      <Card x="660" y="60" w="190" h="300" title="4. Sanity Check" accent={GREEN}>
        <g transform="translate(95, 100)">
          <g className="aimm-slide-in aimm-delay-4">
            <M x="0" y="0" size={13} fill={N}>Tp = 370 / 100</M>
            <M x="0" y="20" size={13} fill={N}>Tp = 3.7 min</M>
            
            <L x="0" y="60" size={12} fill={MUTED}>Must be larger than cycle time</L>
            <M x="0" y="90" size={14} fill={N}>3.7 min &gt; 2.5 min</M>
            
            <rect x="-50" y="110" width="100" height="30" rx="4" fill={CREAM} stroke={GREEN} />
            <L x="0" y="130" size={14} fill={GREEN} weight={800}>PASSES</L>
          </g>
        </g>
      </Card>
    </Scene>
  )
}

export function M1BreakEvenComparisonScene() {
  return (
    <Scene caption="Manual and automated cost lines cross at a break-even quantity, deciding which is cheaper">
      <Axes x="80" y="440" w="480" h="340" xLabel="Annual Quantity (Q)" yLabel="Total Cost ($)" tickLabels={[[80, '0']]} />
      
      <g className="aimm-traverse">
        <Wire d="M100 420 L480 135" stroke={RED} width="3" />
        <L x="480" y="125" size={13} fill={RED} weight={800} anchor="end">Manual Method</L>
        <L x="120" y="420" size={11} fill={RED} anchor="start">Low Fixed Cost</L>
        <L x="120" y="435" size={11} fill={RED} anchor="start">High Variable Rate</L>
      </g>

      <g className="aimm-traverse aimm-delay-1">
        <Wire d="M100 230 L480 135" stroke={BLUE} width="3" />
        <L x="480" y="155" size={13} fill={BLUE} weight={800} anchor="start">Automated Method</L>
        <L x="120" y="220" size={11} fill={BLUE} anchor="start">High Fixed Cost</L>
        <L x="120" y="235" size={11} fill={BLUE} anchor="start">Low Variable Rate</L>
      </g>

      <g className="aimm-insert aimm-delay-2">
        <Dot cx="480" cy="135" r="6" fill={MUTED} />
        <Wire d="M480 135 L480 440" stroke={MUTED} dash="4 4" width="2" />
        <L x="480" y="460" size={13} fill={MUTED} weight={800}>Break-even (Qbe)</L>
      </g>

      <g className="aimm-slide-in aimm-delay-3">
        {/* Straddling band */}
        <rect x="440" y="430" width="80" height="20" fill={AMBER} opacity="0.3" />
        <Dot cx="480" cy="440" r="4" fill={AMBER} />
        <L x="430" y="475" size={11} fill={AMBER} anchor="end">Uncertainty band straddles</L>

        {/* Clear win band */}
        <rect x="520" y="430" width="60" height="20" fill={GREEN} opacity="0.4" />
        <Dot cx="550" cy="440" r="4" fill={GREEN} />
        <L x="550" y="475" size={11} fill={GREEN} anchor="start">Clearly beyond Qbe</L>
      </g>

      <g className="aimm-insert aimm-delay-4">
        <Panel x="600" y="100" w="260" title="Payback Justification" accent={GREEN} 
          rows={[
            ['Capital Cost', '$120,000', N],
            ['Annual Saving', '$40,000', BLUE],
            ['Payback Period', '3.0 years', GREEN]
          ]}
        />
      </g>
    </Scene>
  )
}

export function M1ModuleOneDecisionChainScene() {
  return (
    <Scene caption="Establish the system, classify the work, choose people or machines, identify the change, then compute if it pays">
      <g className="aimm-insert">
        <Block x="80" y="60" w="300" h="50" label="1. What is the system?" sub="Facilities &amp; Support Division" stroke={BLUE} fill={WHITE} />
      </g>
      <Wire d="M230 110 L230 140" stroke={BLUE} marker="url(#aimArrB)" className="aimm-insert aimm-delay-1" />
      
      <g className="aimm-insert aimm-delay-1">
        <Block x="80" y="140" w="300" h="50" label="2. What kind of system?" sub="Quantity &amp; Variety Layout Map" stroke={BLUE} fill={WHITE} />
      </g>
      <Wire d="M230 190 L230 220" stroke={BLUE} marker="url(#aimArrB)" className="aimm-insert aimm-delay-2" />
      
      <g className="aimm-insert aimm-delay-2">
        <Block x="80" y="220" w="300" h="50" label="3. Who should do this work?" sub="Manual Labour vs Automation" stroke={BLUE} fill={WHITE} />
      </g>
      <Wire d="M230 270 L230 300" stroke={BLUE} marker="url(#aimArrB)" className="aimm-insert aimm-delay-3" />
      
      <g className="aimm-insert aimm-delay-3">
        <Block x="80" y="300" w="300" h="50" label="4. What should change?" sub="USA Principle &amp; 10 Strategies" stroke={BLUE} fill={WHITE} />
      </g>
      <Wire d="M230 350 L230 380" stroke={BLUE} marker="url(#aimArrB)" className="aimm-insert aimm-delay-4" />
      
      <g className="aimm-insert aimm-delay-4">
        <Block x="80" y="380" w="300" h="50" label="5. Does it pay?" sub="Cost Models &amp; Break-even" stroke={BLUE} fill={WHITE} />
      </g>

      <g className="aimm-shift aimm-delay-5">
        <Block x="480" y="60" w="280" h="40" label="Module 3: Planning &amp; Handling" stroke={MUTED} fill={SKY} />
        <Wire d="M480 80 L380 80" stroke={MUTED} width="2" marker="url(#aimArrM)" />
        
        <Block x="480" y="125" w="280" h="40" label="Module 2: Assembly &amp; Line Balancing" stroke={MUTED} fill={SKY} />
        <Wire d="M480 145 L380 145" stroke={MUTED} width="2" marker="url(#aimArrM)" />
        
        <Block x="480" y="305" w="280" h="40" label="Module 4: Inspection" stroke={MUTED} fill={SKY} />
        <Wire d="M480 325 L380 325" stroke={MUTED} width="2" marker="url(#aimArrM)" />
        
        <Block x="480" y="390" w="280" h="40" label="Module 5: Additive Manufacturing" stroke={MUTED} fill={SKY} />
        <Wire d="M480 410 L380 410" stroke={MUTED} width="2" marker="url(#aimArrM)" />
        <Wire d="M550 390 L550 165 L380 165" stroke={MUTED} width="2" marker="url(#aimArrM)" />
      </g>
    </Scene>
  )
}

/* ── Module 2 ────────────────────────────────────────────────────────── */

export function M2AssemblyLinePacedScene() {
  return (
    <Scene caption="A six-station assembly line paced by its slowest station">
      <Wire d="M 40 300 L 860 300" stroke={MUTED} width="4" />
      {[1, 2, 3, 4, 5, 6].map(i => (
        <Block key={i} x={-60 + i * 130} y={280} w={100} h={40} label={`Station ${i}`} stroke={BLUE} />
      ))}
      <Wire d="M 40 180 L 860 180" stroke={RED} width="2" dash="4 4" />
      <L x="80" y="170" size="14" fill={RED}>Cycle Time (Tc)</L>
      {[25, 35, 60, 40, 20, 50].map((h, i) => (
        <g key={i}>
          <rect x={-30 + (i + 1) * 130} y={260 - h} width="40" height={h} fill={i === 2 ? RED : SKY} stroke={i === 2 ? RED : BLUE} />
          {i === 2 ? <L x={-10 + (i + 1) * 130} y={260 - h - 10} size="13" fill={RED}>Bottleneck</L> : null}
        </g>
      ))}
      <g className="aimm-shift">
        <Block x={40} y={285} w={30} h={30} fill={AMBER} stroke={AMBER} />
      </g>
      <Panel x="660" y="50" w="180" title="Production Rate" rows={[['Rate', '1 / Tc', RED]]} />
    </Scene>
  )
}

export function M2RepositioningPacingScene() {
  return (
    <Scene caption="Repositioning losses and pacing variants">
      <Wire d="M 100 130 L 800 130" stroke={MUTED} width="4" />
      <Block x="300" y="110" w="60" h="40" label="Unit" stroke={BLUE} />
      <Block x="500" y="110" w="60" h="40" label="Unit" stroke={BLUE} />
      <Wire d="M 450 90 L 350 90" stroke={AMBER} width="3" marker="url(#aimArrA)" />
      <L x="400" y="75" size="14" fill={AMBER}>Walk upstream</L>

      <L x="100" y="210" size="14" fill={N} anchor="start">Cycle Time (Tc)</L>
      <rect x="250" y="190" width="400" height="30" fill={SKY} stroke={BLUE} />
      <rect x="250" y="190" width="300" height="30" fill={GREEN} />
      <rect x="550" y="190" width="100" height="30" fill={AMBER} />
      <L x="400" y="210" size="14" fill={WHITE}>Service Time (Ts)</L>
      <L x="600" y="210" size="14" fill={N}>Reposition</L>

      <Card x="100" y="280" w="220" h="180" title="Rigid Pacing" accent={RED}>
        <rect x="130" y="360" width="160" height="40" fill={SKY} stroke={RED} />
        <Wire d="M 290 350 L 290 410" stroke={RED} width="3" />
        <L x="210" y="420" size="13" fill={RED}>Hard Stop at Tc</L>
      </Card>
      
      <Card x="340" y="280" w="220" h="180" title="Pacing with Margin" accent={BLUE}>
        <rect x="370" y="360" width="160" height="40" fill={SKY} stroke={BLUE} />
        <rect x="490" y="360" width="60" height="40" fill={CREAM} stroke={MUTED} dash="4 4" />
        <Wire d="M 530 350 L 530 410" stroke={BLUE} width="3" />
        <L x="450" y="420" size="13" fill={BLUE}>Tolerance Zone</L>
      </Card>

      <Card x="580" y="280" w="220" h="180" title="Unpaced Line" accent={GREEN}>
        <Block x="600" y="360" w="50" h="40" label="U1" stroke={GREEN} />
        <Block x="660" y="360" w="50" h="40" label="U2" stroke={GREEN} />
        <Block x="720" y="360" w="50" h="40" label="U3" stroke={GREEN} />
        <L x="690" y="420" size="13" fill={GREEN}>Buffer</L>
      </Card>
    </Scene>
  )
}

export function M2PrecedenceDiagramScene() {
  return (
    <Scene caption="Precedence diagram and balance delay">
      <g transform="translate(40, 100)">
        <Dot cx="50" cy="150" r="24" fill={SKY} stroke={BLUE} />
        <L x="50" y="156" size="15">1</L>
        <Dot cx="150" cy="80" r="24" fill={SKY} stroke={BLUE} />
        <L x="150" y="86" size="15">2</L>
        <Dot cx="150" cy="220" r="24" fill={SKY} stroke={BLUE} />
        <L x="150" y="226" size="15">3</L>
        <Dot cx="250" cy="150" r="24" fill={SKY} stroke={BLUE} />
        <L x="250" y="156" size="15">4</L>
        <Wire d="M 70 140 L 130 95" marker="url(#aimArrB)" />
        <Wire d="M 70 160 L 130 205" marker="url(#aimArrB)" />
        <Wire d="M 170 95 L 230 140" marker="url(#aimArrB)" />
        <Wire d="M 170 205 L 230 160" marker="url(#aimArrB)" />
      </g>
      
      <g transform="translate(380, 80)">
        <L x="120" y="20" size="16" fill={N}>6 Stations (High Delay)</L>
        <Wire d="M 0 50 L 260 50" stroke={RED} dash="4 4" width="2" />
        <L x="270" y="55" size="13" fill={RED} anchor="start">Service Time</L>
        {[40, 80, 30, 90, 45, 20].map((h, i) => (
          <g key={i}>
            <rect x={i*40 + 10} y={300 - h} width="30" height={h} fill={SKY} stroke={BLUE} />
            <rect x={i*40 + 10} y={50} width="30" height={250 - h} fill={CREAM} stroke={MUTED} dash="2 2" />
          </g>
        ))}
        <L x="120" y="330" size="14" fill={MUTED}>Balance Delay Shaded</L>
      </g>

      <g transform="translate(700, 80)">
        <L x="100" y="20" size="16" fill={N}>5 Stations (Better)</L>
        <Wire d="M 0 50 L 220 50" stroke={RED} dash="4 4" width="2" />
        {[70, 80, 120, 90, 45].map((h, i) => (
          <g key={i}>
            <rect x={i*40 + 10} y={300 - h} width="30" height={h} fill={SKY} stroke={BLUE} />
            <rect x={i*40 + 10} y={50} width="30" height={250 - h} fill={CREAM} stroke={MUTED} dash="2 2" />
          </g>
        ))}
        <L x="100" y="330" size="14" fill={MUTED}>Lower Delay</L>
      </g>
    </Scene>
  )
}

export function M2LargestCandidateScene() {
  return (
    <Scene caption="The largest candidate rule walkthrough">
      <Panel x="80" y="80" w="220" title="Task List" rows={[
        ['Task 3', '8.0', N],
        ['Task 1', '6.0', MUTED],
        ['Task 4', '5.5', MUTED],
        ['Task 2', '4.0', MUTED],
        ['Task 5', '2.5', MUTED]
      ]} />
      
      <g className="aimm-descend">
        <Wire d="M 320 120 L 360 120" stroke={AMBER} width="3" marker="url(#aimArrA)" />
      </g>

      <g transform="translate(450, 100)">
        <Wire d="M 0 0 L 320 0" stroke={RED} dash="4 4" width="2" />
        <L x="330" y="5" size="13" fill={RED} anchor="start">Service Time</L>
        
        <rect x="20" y="120" width="80" height="180" fill={SKY} stroke={BLUE} />
        <L x="60" y="210" size="15">T1 + T2</L>
        <L x="60" y="320" size="14" fill={N}>S1</L>
        
        <rect x="120" y="60" width="80" height="240" fill={SKY} stroke={BLUE} />
        <L x="160" y="180" size="15">T3</L>
        <L x="160" y="320" size="14" fill={N}>S2</L>

        <rect x="220" y="160" width="80" height="140" fill={SKY} stroke={BLUE} />
        <L x="260" y="230" size="15">T4 + T5</L>
        <L x="260" y="320" size="14" fill={N}>S3</L>
      </g>
    </Scene>
  )
}

export function M2KilbridgeColumnScene() {
  return (
    <Scene caption="The Kilbridge and Wester method">
      <g transform="translate(60, 60)">
        <L x="120" y="0" size="16">Precedence Columns</L>
        <Wire d="M 50 30 L 50 250" stroke={MUTED} dash="4 4" />
        <Wire d="M 150 30 L 150 250" stroke={MUTED} dash="4 4" />
        <Wire d="M 250 30 L 250 250" stroke={MUTED} dash="4 4" />
        
        <Dot cx="50" cy="80" r="24" fill={SKY} stroke={BLUE} />
        <L x="50" y="86" size="14">I</L>
        <Dot cx="50" cy="180" r="24" fill={SKY} stroke={BLUE} />
        <L x="50" y="186" size="14">II</L>
        
        <Dot cx="150" cy="130" r="24" fill={SKY} stroke={BLUE} />
        <L x="150" y="136" size="14">III</L>
        
        <Dot cx="250" cy="130" r="24" fill={SKY} stroke={BLUE} />
        <L x="250" y="136" size="14">IV</L>
        
        <Wire d="M 74 80 L 126 120" marker="url(#aimArrB)" />
        <Wire d="M 74 180 L 126 140" marker="url(#aimArrB)" />
        <Wire d="M 174 130 L 226 130" marker="url(#aimArrB)" />
      </g>

      <g transform="translate(450, 100)">
        <Wire d="M 0 0 L 320 0" stroke={RED} dash="4 4" width="2" />
        <L x="330" y="5" size="13" fill={RED} anchor="start">Service Time</L>
        
        <g className="aimm-shift">
          <Wire d="M 40 -30 L 40 -10" stroke={AMBER} width="3" marker="url(#aimArrA)" />
          <L x="40" y="-40" size="12" fill={AMBER}>Current Column</L>
        </g>
        
        <rect x="20" y="100" width="80" height="200" fill={SKY} stroke={BLUE} />
        <L x="60" y="200" size="15">Col 1</L>
        <L x="60" y="320" size="14" fill={N}>S1</L>
        
        <rect x="120" y="140" width="80" height="160" fill={SKY} stroke={BLUE} />
        <L x="160" y="220" size="15">Col 2</L>
        <L x="160" y="320" size="14" fill={N}>S2</L>

        <rect x="220" y="180" width="80" height="120" fill={CREAM} stroke={MUTED} dash="4 4" />
        <L x="260" y="240" size="15" fill={MUTED}>Col 3</L>
        <L x="260" y="320" size="14" fill={N}>S3</L>
      </g>
    </Scene>
  )
}

export function M2PositionalWeightScene() {
  return (
    <Scene caption="The ranked positional weights method">
      <g transform="translate(40, 60)">
        <Wire d="M 74 120 L 126 120" marker="url(#aimArrA)" stroke={AMBER} width="3" />
        <Wire d="M 174 120 L 226 120" marker="url(#aimArrA)" stroke={AMBER} width="3" />
        
        <Dot cx="50" cy="120" r="24" fill={WHITE} stroke={AMBER} opacity="1" />
        <L x="50" y="126" size="14" fill={AMBER}>T1</L>
        <L x="50" y="80" size="12" fill={MUTED}>5</L>
        
        <Dot cx="150" cy="120" r="24" fill={AMBER} stroke={AMBER} />
        <L x="150" y="126" size="14" fill={WHITE}>T2</L>
        <L x="150" y="80" size="12" fill={MUTED}>8</L>
        
        <Dot cx="250" cy="120" r="24" fill={AMBER} stroke={AMBER} />
        <L x="250" y="126" size="14" fill={WHITE}>T3</L>
        <L x="250" y="80" size="12" fill={MUTED}>4</L>

        <L x="50" y="180" size="14" fill={AMBER}>Weight = 5 + 8 + 4 = 17</L>
      </g>

      <Panel x="360" y="40" w="220" title="Ranked Table" rows={[
        ['T1', '17', AMBER],
        ['T2', '12', MUTED],
        ['T3', '4', MUTED]
      ]} />
      
      <Card x="620" y="40" w="240" h="180" title="Comparison" accent={BLUE}>
        <L x="740" y="100" size="14" fill={N}>Largest Candidate: 6 Stns</L>
        <L x="740" y="130" size="14" fill={AMBER} weight="800">RPW Method: 5 Stns</L>
        <L x="740" y="180" size="12" fill={MUTED}>RPW sees chain structure</L>
      </Card>
    </Scene>
  )
}

export function M2ThreeMethodsScene() {
  return (
    <Scene caption="Comparing the three heuristics">
      <L x="450" y="40" size="16">Same Precedence Diagram</L>
      <Wire d="M 450 60 L 450 90" stroke={MUTED} marker="url(#aimArr)" />
      
      <Wire d="M 450 90 L 150 90" stroke={MUTED} />
      <Wire d="M 450 90 L 750 90" stroke={MUTED} />
      <Wire d="M 150 90 L 150 120" stroke={MUTED} marker="url(#aimArr)" />
      <Wire d="M 450 90 L 450 120" stroke={MUTED} marker="url(#aimArr)" />
      <Wire d="M 750 90 L 750 120" stroke={MUTED} marker="url(#aimArr)" />

      <Card x="50" y="130" w="200" h="150" title="Largest Candidate" accent={BLUE}>
        <L x="150" y="180" size="13" fill={MUTED}>Uses: Task Times</L>
        <L x="150" y="210" size="16" fill={N}>6 Stations</L>
        <L x="150" y="240" size="14" fill={N}>Eff: 82%</L>
      </Card>
      
      <Card x="350" y="130" w="200" h="150" title="Kilbridge & Wester" accent={AMBER}>
        <L x="450" y="180" size="13" fill={MUTED}>Uses: Structure</L>
        <L x="450" y="210" size="16" fill={N}>5 Stations</L>
        <L x="450" y="240" size="14" fill={AMBER} weight="800">Eff: 95% (Best)</L>
      </Card>

      <Card x="650" y="130" w="200" h="150" title="Ranked Pos. Weight" accent={BLUE}>
        <L x="750" y="180" size="13" fill={MUTED}>Uses: Chain Length</L>
        <L x="750" y="210" size="16" fill={N}>6 Stations</L>
        <L x="750" y="240" size="14" fill={N}>Eff: 82%</L>
      </Card>

      <Panel x="250" y="320" w="400" title="Cost of One Extra Station" accent={RED} rows={[
        ['Labour cost per hour', '$30', N],
        ['Hours per year', '4000', N],
        ['Annual recurring cost', '$120,000', RED]
      ]} />
    </Scene>
  )
}

export function M2ComputerisedSearchScene() {
  return (
    <Scene caption="Computerised balancing search">
      <g transform="translate(60, 60)">
        <Axes x="0" y="350" w="400" h="300" xLabel="Trial Number" yLabel="Station Count" />
        <Dot cx="80" cy="250" r="4" fill={MUTED} />
        <Dot cx="120" cy="180" r="4" fill={MUTED} />
        <Dot cx="160" cy="220" r="4" fill={MUTED} />
        <Dot cx="200" cy="140" r="4" fill={MUTED} />
        <Dot cx="240" cy="200" r="4" fill={MUTED} />
        <Dot cx="280" cy="110" r="5" fill={AMBER} />
        <Dot cx="320" cy="150" r="4" fill={MUTED} />
        
        <Curve pts={[[0, 250], [120, 180], [200, 140], [280, 110], [380, 110]]} stroke={BLUE} width="2" />
        <L x="330" y="90" size="14" fill={BLUE}>Best so far</L>
      </g>
      
      <Card x="550" y="80" w="280" h="280" title="Practical Constraints" accent={GREEN}>
        <rect x="580" y="140" width="220" height="40" fill={SKY} rx="8" />
        <L x="690" y="160" size="14" fill={N}>Tasks tied to same station</L>
        
        <rect x="580" y="190" width="220" height="40" fill={SKY} rx="8" />
        <L x="690" y="210" size="14" fill={N}>Incompatible tasks</L>

        <rect x="580" y="240" width="220" height="40" fill={SKY} rx="8" />
        <L x="690" y="260" size="14" fill={N}>Zoning restrictions</L>

        <rect x="580" y="290" width="220" height="40" fill={SKY} rx="8" />
        <L x="690" y="310" size="14" fill={N}>Fixture sharing</L>
      </Card>
    </Scene>
  )
}

export function M2DesignForAssemblyScene() {
  return (
    <Scene caption="Design for automated assembly">
      <Card x="50" y="50" w="300" h="300" title="Before" accent={RED}>
        <g transform="translate(150, 180)">
          <rect x="-40" y="0" width="80" height="30" fill={SKY} stroke={BLUE} />
          <rect x="-30" y="-30" width="60" height="30" fill={CREAM} stroke={MUTED} />
          <rect x="-10" y="-60" width="20" height="30" fill={SKY} stroke={BLUE} />
          
          <rect x="-50" y="-10" width="10" height="10" fill={MUTED} />
          <rect x="40" y="-10" width="10" height="10" fill={MUTED} />
          <Wire d="M -60 -5 L -80 -5" stroke={RED} marker="url(#aimArrR)" />
          <Wire d="M 50 -5 L 70 -5" stroke={RED} marker="url(#aimArrR)" />
          
          <Wire d="M 0 -70 L 0 -100" stroke={RED} marker="url(#aimArrR)" />
        </g>
        <L x="150" y="270" size="13" fill={RED}>11 Parts, Multiple Directions</L>
      </Card>
      
      <Card x="400" y="50" w="300" h="300" title="After" accent={GREEN}>
        <g transform="translate(150, 180)">
          <rect x="-40" y="0" width="80" height="30" fill={SKY} stroke={GREEN} />
          <rect x="-30" y="-30" width="60" height="30" fill={CREAM} stroke={GREEN} />
          <path d="M -40 0 L -45 -10 L -35 -10 Z" fill={GREEN} />
          <path d="M 40 0 L 45 -10 L 35 -10 Z" fill={GREEN} />
          
          <Wire d="M 0 -40 L 0 -80" stroke={GREEN} marker="url(#aimArrG)" />
        </g>
        <L x="150" y="270" size="13" fill={GREEN}>6 Parts, Top-Down Only</L>
        <L x="150" y="290" size="12" fill={GREEN}>Snap fits, self-locating</L>
      </Card>
      
      <Panel x="250" y="380" w="400" title="Comparison" accent={BLUE} rows={[
        ['Part Count', '11 vs 6', N],
        ['Feeders Required', '8 vs 3', GREEN],
        ['Est. Jam Rate', 'High vs Low', GREEN]
      ]} />
    </Scene>
  )
}

export function M2FourConfigurationsScene() {
  return (
    <Scene caption="Four automated assembly configurations">
      <Card x="40" y="50" w="180" h="200" title="Dial Indexing" accent={BLUE}>
        <circle cx="90" cy="120" r="50" fill={SKY} stroke={BLUE} />
        {[0, 60, 120, 180, 240, 300].map(angle => (
          <g key={angle} transform={`translate(90, 120) rotate(${angle}) translate(0, -50)`}>
            <rect x="-10" y="-10" width="20" height="20" fill={CREAM} stroke={MUTED} />
          </g>
        ))}
        <Wire d="M 90 90 A 30 30 0 0 1 120 120" stroke={AMBER} width="3" marker="url(#aimArrA)" />
      </Card>

      <Card x="240" y="50" w="180" h="200" title="In-Line" accent={BLUE}>
        <Wire d="M 20 120 L 160 120" stroke={MUTED} width="4" />
        {[1,2,3,4].map(i => (
          <rect key={i} x={i*32} y="110" width="20" height="20" fill={SKY} stroke={BLUE} />
        ))}
        <L x="90" y="160" size="12" fill={MUTED}>Synchronous Transfer</L>
      </Card>

      <Card x="440" y="50" w="180" h="200" title="Carousel" accent={BLUE}>
        <rect x="30" y="80" width="120" height="80" rx="40" fill="none" stroke={MUTED} strokeWidth="4" />
        <rect x="50" y="70" width="20" height="20" fill={SKY} stroke={BLUE} />
        <rect x="110" y="70" width="20" height="20" fill={SKY} stroke={BLUE} />
        <rect x="80" y="150" width="20" height="20" fill={SKY} stroke={BLUE} />
        <L x="90" y="125" size="12" fill={N}>Closed Loop</L>
      </Card>

      <Card x="640" y="50" w="180" h="200" title="Single Station" accent={AMBER}>
        <rect x="70" y="100" width="40" height="40" fill={SKY} stroke={AMBER} />
        <Wire d="M 90 70 L 90 90" stroke={MUTED} marker="url(#aimArr)" />
        <Wire d="M 60 120 L 40 120" stroke={MUTED} marker="url(#aimArr)" />
        <L x="90" y="170" size="12" fill={MUTED}>Multi-function</L>
      </Card>
      
      <Panel x="150" y="280" w="600" title="Characteristics" rows={[
        ['Dial Indexing', 'Fast, compact, limited stations', N],
        ['In-Line', 'Scales to many stations', N],
        ['Carousel', 'Combines features, return path', N],
        ['Single Station', 'Slowest, cheapest, most flexible', AMBER]
      ]} />
    </Scene>
  )
}

export function M2PartsDeliveryScene() {
  return (
    <Scene caption="Parts delivery at workstations">
      <Wire d="M 450 60 L 450 450" stroke={BLUE} width="4" />
      
      <Block x="400" y="60" w="100" h="60" label="Hopper" stroke={BLUE} />
      <L x="530" y="90" size="13" fill={N} anchor="start">Randomly oriented bulk parts</L>
      <L x="370" y="90" size="12" fill={RED} anchor="end">Jam: Bridging</L>

      <Block x="400" y="140" w="100" h="60" label="Feeder" stroke={BLUE} />
      <L x="530" y="170" size="13" fill={N} anchor="start">Extracts parts singly</L>
      <L x="370" y="170" size="12" fill={RED} anchor="end">Jam: Tangling</L>

      <Block x="400" y="220" w="100" h="60" label="Selector & Orientor" stroke={BLUE} />
      <L x="530" y="250" size="13" fill={N} anchor="start">Rejects or rotates parts</L>
      <L x="370" y="250" size="12" fill={RED} anchor="end">Jam: Wedging</L>

      <Block x="400" y="300" w="100" h="60" label="Feed Track" stroke={BLUE} />
      <L x="530" y="330" size="13" fill={N} anchor="start">Moves and buffers queue</L>
      <L x="370" y="330" size="12" fill={RED} anchor="end">Jam: Overlap</L>

      <Block x="400" y="380" w="100" h="60" label="Placement" stroke={BLUE} />
      <L x="530" y="410" size="13" fill={N} anchor="start">Positions for assembly</L>
      <L x="370" y="410" size="12" fill={RED} anchor="end">Jam: Misalignment</L>

      <g className="aimm-descend">
        <Dot cx="450" cy="120" r="6" fill={AMBER} />
        <Dot cx="450" cy="200" r="6" fill={AMBER} />
        <Dot cx="450" cy="280" r="6" fill={AMBER} />
        <Dot cx="450" cy="360" r="6" fill={AMBER} />
      </g>
    </Scene>
  )
}

export function M2BowlFeederScene() {
  return (
    <Scene caption="Vibratory bowl feeder cutaway">
      <path d="M 200 100 L 200 400 A 250 50 0 0 0 700 400 L 700 100" fill="none" stroke={MUTED} strokeWidth="4" />
      <path d="M 200 100 A 250 50 0 0 1 700 100" fill="none" stroke={MUTED} strokeWidth="4" />
      
      <Wave x="200" y="250" w="500" amp="80" cycles="1.5" stroke={BLUE} width="8" />
      <L x="450" y="420" size="14" fill={N}>Helical Track up inner wall</L>
      <L x="450" y="440" size="12" fill={AMBER}>Bowl vibrates to climb parts</L>

      <Card x="50" y="80" w="180" h="280" title="Orientation Devices" accent={BLUE}>
        <L x="140" y="140" size="13" fill={N} anchor="end">1. Wiper blade</L>
        <L x="140" y="180" size="13" fill={N} anchor="end">2. Pressure break</L>
        <L x="140" y="220" size="13" fill={N} anchor="end">3. Narrow section</L>
        <L x="140" y="260" size="13" fill={N} anchor="end">4. Cut-out</L>
      </Card>
      
      <Wire d="M 180 135 L 260 180" stroke={RED} width="2" marker="url(#aimArrR)" />
      <Wire d="M 180 175 L 340 240" stroke={RED} width="2" marker="url(#aimArrR)" />
      <Wire d="M 180 215 L 500 320" stroke={RED} width="2" marker="url(#aimArrR)" />
      
      <L x="750" y="100" size="14" fill={BLUE} anchor="start">Escapement</L>
      <Wire d="M 740 100 L 710 100" stroke={BLUE} marker="url(#aimArrB)" />
      
      <g className="aimm-pulse">
        <Dot cx="300" cy="200" r="8" fill={RED} />
        <Wire d="M 300 210 L 300 280" stroke={RED} marker="url(#aimArrR)" />
        <L x="300" y="300" size="12" fill={RED}>Wrong part falls back</L>
      </g>
    </Scene>
  )
}

export function M2SingleStationCycleScene() {
  return (
    <Scene caption="Analysis of single station assembly machines">
      <L x="100" y="40" size="14" fill={N} anchor="start">Ideal Cycle</L>
      <g transform="translate(100, 60)">
        <rect x="0" y="0" width="80" height="30" fill={SKY} stroke={BLUE} />
        <L x="40" y="20" size="12">Load</L>
        
        <rect x="80" y="0" width="240" height="30" fill={CREAM} stroke={MUTED} />
        <L x="200" y="20" size="12" fill={N}>4 Operations</L>
        
        <rect x="320" y="0" width="80" height="30" fill={SKY} stroke={BLUE} />
        <L x="360" y="20" size="12">Unload</L>
      </g>
      
      <L x="100" y="130" size="14" fill={N} anchor="start">Expected Cycle</L>
      <g transform="translate(100, 150)">
        <rect x="0" y="0" width="400" height="30" fill={SKY} stroke={BLUE} />
        <L x="200" y="20" size="12">Ideal Cycle</L>
        
        <rect x="400" y="0" width="120" height="30" fill={CREAM} stroke={RED} dash="4 4" />
        <L x="460" y="20" size="12" fill={RED}>Expected Jam Time</L>
      </g>
      
      <Panel x="650" y="40" w="200" title="Expected Jam" rows={[
        ['Defect Rate (q)', '2%', N],
        ['Jam Prob (m)', '0.5', N],
        ['Clear Time (Td)', '2.0', N],
        ['Operations (n)', '4', N],
        ['Jam = q*m*Td*n', '0.08', RED]
      ]} />
      
      <g transform="translate(160, 240)">
        <Axes x="0" y="220" w="400" h="180" xLabel="Operations (n)" yLabel="Actual Cycle Time" />
        <Curve pts={[[0, 220], [100, 190], [200, 150], [300, 90], [400, 10]]} stroke={RED} width="3" />
        <L x="30" y="25" size="12" fill={RED} anchor="start">q = 2% (Rises faster than linear)</L>
        
        <Curve pts={[[0, 220], [100, 200], [200, 180], [300, 160], [400, 140]]} stroke={BLUE} width="2" />
        <L x="380" y="155" size="12" fill={BLUE}>q = 0.5%</L>
      </g>
    </Scene>
  )
}

export function M2MultiStationJamScene() {
  return (
    <Scene caption="Multi-station jam propagation">
      <L x="450" y="30" size="16">Six-Station In-Line Transfer</L>
      <Wire d="M 100 80 L 800 80" stroke={MUTED} width="4" />
      {[1,2,3,4,5,6].map(i => (
        <Block key={i} x={50 + i * 100} y={50} w={60} h={60} label={`S${i}`} stroke={i === 4 ? RED : MUTED} fill={i === 4 ? CREAM : SKY} />
      ))}
      <L x="480" y="130" size="14" fill={RED}>Jam halts entire line</L>
      <Wire d="M 480 110 L 480 50" stroke={RED} width="3" marker="url(#aimArrR)" />

      <Card x="100" y="180" w="300" h="180" title="Defect Causes Jam" accent={RED}>
        <L x="250" y="230" size="14" fill={N}>Line stops</L>
        <L x="250" y="260" size="14" fill={RED}>Production lost (Td)</L>
        <L x="250" y="290" size="14" fill={N}>Yield unaffected</L>
      </Card>
      
      <Card x="500" y="180" w="300" h="180" title="Defect Passes Through" accent={AMBER}>
        <L x="650" y="230" size="14" fill={N}>Line keeps running</L>
        <L x="650" y="260" size="14" fill={N}>No downtime</L>
        <L x="650" y="290" size="14" fill={AMBER} weight="800">Defective product at end (Yield drops)</L>
      </Card>

      <g transform="translate(100, 400)">
        <rect x="0" y="0" width="300" height="30" fill={SKY} stroke={BLUE} />
        <L x="150" y="20" size="13">Ideal Cycle (Max Ts + Tr)</L>
        
        <rect x="300" y="0" width="200" height="30" fill={CREAM} stroke={RED} dash="4 4" />
        <L x="400" y="20" size="13" fill={RED}>Expected Downtime per Cycle</L>
      </g>
    </Scene>
  )
}

export function M2BufferDecouplingScene() {
  return (
    <Scene caption="Storage buffers and partial automation">
      <L x="80" y="30" size="15" fill={N} anchor="start">Rigid Coupling (Jam at S3)</L>
      <Wire d="M 80 70 L 800 70" stroke={MUTED} width="4" />
      {[1,2,3,4,5,6].map(i => (
        <Block key={i} x={20 + i * 110} y={40} w={60} h={60} label={`S${i}`} stroke={i === 3 ? RED : MUTED} fill={CREAM} labelFill={MUTED} />
      ))}
      <L x="360" y="120" size="13" fill={RED}>All stations halt</L>
      
      <L x="80" y="160" size="15" fill={N} anchor="start">Buffered Line (Jam at S3)</L>
      <Wire d="M 80 200 L 800 200" stroke={MUTED} width="4" />
      {[1,2,3,4,5,6].map(i => (
        <g key={i}>
          <Block x={20 + i * 110} y={170} w={60} h={60} label={`S${i}`} stroke={i === 3 ? RED : BLUE} fill={i === 3 ? CREAM : SKY} />
          {i < 6 && <Dot cx={105 + i * 110} cy={200} r="12" fill={AMBER} />}
        </g>
      ))}
      <L x="360" y="250" size="13" fill={BLUE}>Upstream runs into buffer, downstream draws from buffer</L>
      
      <Panel x="600" y="280" w="240" title="Effective Rate" accent={GREEN} rows={[
        ['Rigid Line', 'Low', MUTED],
        ['Buffered', 'Higher', GREEN]
      ]} />
      
      <Card x="80" y="320" w="480" h="160" title="Partial Automation (Hybrid Line)" accent={BLUE}>
        <g transform="translate(120, 390)">
          <rect x="0" y="0" width="80" height="40" fill={SKY} stroke={BLUE} />
          <L x="40" y="25" size="12">Auto S1</L>
          <rect x="90" y="0" width="80" height="40" fill={CREAM} stroke={MUTED} />
          <L x="130" y="25" size="12" fill={MUTED}>Manual S2</L>
          <rect x="180" y="0" width="80" height="40" fill={SKY} stroke={BLUE} />
          <L x="220" y="25" size="12">Auto S3</L>
          <rect x="270" y="0" width="80" height="40" fill={CREAM} stroke={MUTED} />
          <L x="310" y="25" size="12" fill={MUTED}>Manual S4</L>
        </g>
        <L x="320" y="460" size="13" fill={N}>Manual stations handle tasks that resist automation</L>
      </Card>
    </Scene>
  )
}

export function M2SynthesisScene() {
  return (
    <Scene caption="Module 2 in perspective">
      <Block x="450" y="100" w="160" h="60" label="CYCLE TIME" stroke={BLUE} />
      <Wire d="M 450 130 L 250 100" stroke={BLUE} marker="url(#aimArrB)" />
      <L x="220" y="105" size="14" fill={N} anchor="end">Number of Stations</L>
      
      <Wire d="M 450 130 L 250 160" stroke={BLUE} marker="url(#aimArrB)" />
      <L x="220" y="165" size="14" fill={N} anchor="end">Task Assignment</L>

      <Wire d="M 610 130 L 700 130" stroke={BLUE} marker="url(#aimArrB)" />
      <L x="720" y="135" size="14" fill={N} anchor="start">Feeder Rate</L>
      
      <Block x="450" y="300" w="160" h="60" label="PART QUALITY" stroke={RED} />
      <Wire d="M 450 330 L 300 280" stroke={RED} marker="url(#aimArrR)" />
      <L x="280" y="285" size="14" fill={N} anchor="end">Jam Rate</L>

      <Wire d="M 450 330 L 300 380" stroke={RED} marker="url(#aimArrR)" />
      <L x="280" y="385" size="14" fill={N} anchor="end">Downtime</L>
      
      <Wire d="M 610 330 L 700 330" stroke={RED} marker="url(#aimArrR)" />
      <L x="720" y="335" size="14" fill={N} anchor="start">Yield</L>
      
      <Wire d="M 750 310 Q 750 220 620 130" stroke={AMBER} width="3" dash="4 4" marker="url(#aimArrA)" />
      <L x="760" y="220" size="13" fill={AMBER}>Quality limits Effective Rate</L>

      <Card x="250" y="420" w="400" h="80" title="The Automation Difference" accent={MUTED}>
        <L x="450" y="460" size="13" fill={MUTED}>Manual: worker discards bad part & continues</L>
        <L x="450" y="480" size="13" fill={RED} weight="800">Automated: bad part jams and stops the machine</L>
      </Card>
      
      <L x="800" y="450" size="14" fill={BLUE}>To Module 3 ➔</L>
      <L x="800" y="480" size="14" fill={BLUE}>To Module 4 ➔</L>
    </Scene>
  )
}

/* ── Module 3 ────────────────────────────────────────────────────────── */

export function M3DesignToRouteSheetScene() {
  return (
    <Scene>
      {/* Part drawing */}
      <Card x="50" y="80" w="140" h="120" title="Part Drawing" accent={BLUE}>
        <Wire d="M 90 120 L 150 120 L 150 160 L 90 160 Z" stroke={N} width="2" />
        <Wire d="M 120 120 L 120 160" stroke={MUTED} dash="4 4" />
      </Card>
      <Wire d="M 190 140 L 230 140" stroke={MUTED} marker="url(#aimArr)" />

      {/* Planner */}
      <Block x="240" y="110" w="100" h="60" label="Planner" stroke={N} fill={SKY} />

      {/* Reference stacks */}
      <Card x="150" y="240" w="130" h="90" title="Machine Data" accent={MUTED} />
      <Card x="290" y="240" w="130" h="90" title="Tooling" accent={MUTED} />
      <Card x="430" y="240" w="130" h="90" title="Time Data" accent={MUTED} />
      <Wire d="M 215 240 L 260 170" stroke={MUTED} marker="url(#aimArr)" dash="4 4" className="aimm-rewire" />
      <Wire d="M 355 240 L 290 170" stroke={MUTED} marker="url(#aimArr)" dash="4 4" className="aimm-rewire aimm-delay-1" />
      <Wire d="M 495 240 L 320 170" stroke={MUTED} marker="url(#aimArr)" dash="4 4" className="aimm-rewire aimm-delay-2" />

      {/* Route sheet */}
      <Wire d="M 340 140 L 380 140" stroke={MUTED} marker="url(#aimArr)" />
      <Panel x="390" y="50" w="240" title="Route Sheet" rows={[
        ['Op 1', 'Turn', N],
        ['Op 2', 'Drill', N],
        ['Op 3', 'Mill', N]
      ]} accent={TEAL} />

      {/* Consistency problem */}
      <L x="300" y="335" size="16" fill={ROSE}>Inconsistency between planners</L>
      <Wire d="M 300 345 L 210 360" stroke={ROSE} marker="url(#aimArrRo)" />
      <Wire d="M 300 345 L 400 360" stroke={ROSE} marker="url(#aimArrRo)" />

      <Panel x="60" y="360" w="220" title="Planner A" rows={[
        ['Op 3', 'CNC Mill', N],
        ['Op 4', 'Inspect', N],
        ['Time', '12 mins', N]
      ]} accent={MUTED} />
      <Panel x="320" y="360" w="220" title="Planner B" rows={[
        ['Op 3', 'Manual Mill', ROSE],
        ['Op 4', 'Deburr', ROSE],
        ['Time', '18 mins', ROSE]
      ]} accent={MUTED} />
      <L x="450" y="510" size="15" fill={MUTED} weight="700">Process planning translates design into a route sheet</L>
    </Scene>
  )
}

export function M3VariantCappRetrievalFlowScene() {
  return (
    <Scene caption="Retrieval CAPP uses GT codes to find and edit standard family plans">
      {/* Flow top */}
      <Block x="40" y="80" w="100" h="60" label="New Part" stroke={BLUE} />
      <Wire d="M 140 110 L 170 110" stroke={MUTED} marker="url(#aimArr)" />
      
      <Block x="180" y="80" w="120" h="60" label="Coding" stroke={N} fill={SKY} />
      <L x="240" y="160" size="16" fill={PURP} weight="800" className="aimm-pulse">GT: 4210-99</L>
      <Wire d="M 300 110 L 330 110" stroke={MUTED} marker="url(#aimArr)" />

      {/* Family DB */}
      <Card x="340" y="60" w="160" h="140" title="Family Database" accent={MUTED}>
        <Block x="10" y="40" w="140" h="25" label="Family 4210" stroke={PURP} className="aimm-shift" />
        <Block x="10" y="70" w="140" h="25" label="Family 4220" stroke={MUTED} />
        <Block x="10" y="100" w="140" h="25" label="Family 4230" stroke={MUTED} />
      </Card>
      <Wire d="M 500 110 L 530 110" stroke={MUTED} marker="url(#aimArr)" />

      {/* Standard Plan */}
      <Panel x="540" y="30" w="150" title="Std Plan" rows={[
        ['Op 10', 'Turn', N],
        ['Op 20', 'Drill', N]
      ]} accent={TEAL} className="aimm-insert" />
      <Wire d="M 690 110 L 720 110" stroke={MUTED} marker="url(#aimArr)" />

      {/* Editing */}
      <Block x="730" y="80" w="120" h="60" label="Editing" stroke={AMBER} />
      <Wire d="M 790 140 L 790 170" stroke={MUTED} marker="url(#aimArr)" />
      <Panel x="690" y="180" w="180" title="Final Route Sheet" rows={[
        ['Op 10', 'Turn', N],
        ['Op 20', 'Drill (5mm)', AMBER],
        ['Op 30', 'Tap', AMBER]
      ]} accent={GREEN} />

      {/* Side panel */}
      <Card x="40" y="250" w="240" h="120" title="Part Family Concept" accent={PURP}>
        <Dot cx="60" cy="70" r="15" fill={SKY} stroke={PURP} />
        <Dot cx="120" cy="70" r="12" fill={SKY} stroke={PURP} />
        <Dot cx="180" cy="70" r="18" fill={SKY} stroke={PURP} />
        <L x="120" y="105" size="12" fill={MUTED}>Similar geometries share plans</L>
      </Card>

      {/* Time comparison */}
      <Card x="340" y="250" w="320" h="120" title="Planning Time Comparison" accent={N}>
        <Bars x="10" y="45" w="200" items={[
          ['Manual', 100, ROSE],
          ['Retrieval', 15, TEAL]
        ]} max="100" rowH="30" />
      </Card>
    </Scene>
  )
}

export function M3GenerativeCappDerivationScene() {
  return (
    <Scene caption="Generative CAPP derives the plan directly from part features and decision logic">
      {/* Part Model -> Features */}
      <Card x="40" y="60" w="150" h="200" title="Part Model" accent={BLUE}>
        <L x="75" y="90" size="14" fill={N}>3D CAD Data</L>
        <Wire d="M 40 120 L 110 120 L 110 170 Z" stroke={BLUE} width="2" />
      </Card>
      <Wire d="M 190 160 L 220 160" stroke={MUTED} marker="url(#aimArr)" />
      <Panel x="230" y="60" w="160" title="Features" rows={[
        ['Bore', 'Tol 0.01', N],
        ['Keyway', 'Ra 1.6', N],
        ['Flat', 'Tol 0.05', N]
      ]} accent={PURP} className="aimm-insert" />

      {/* DB and Match */}
      <Wire d="M 390 160 L 420 160" stroke={MUTED} marker="url(#aimArr)" />
      <Card x="430" y="60" w="200" h="200" title="Capability Database" accent={MUTED}>
        <Block x="10" y="40" w="180" h="40" label="Boring" sub="Tol: 0.005, Ra: 0.8" stroke={TEAL} className="aimm-pulse" />
        <Block x="10" y="90" w="180" h="40" label="Milling" sub="Tol: 0.02, Ra: 1.6" stroke={TEAL} />
        <Block x="10" y="140" w="180" h="40" label="Broaching" sub="Tol: 0.01, Ra: 1.6" stroke={TEAL} />
      </Card>

      {/* Decision logic -> Sequence */}
      <Wire d="M 530 260 L 530 290" stroke={MUTED} marker="url(#aimArr)" />
      <Block x="450" y="300" w="160" h="60" label="Decision Logic" sub="Datum constraints" stroke={AMBER} />
      <Wire d="M 450 330 L 420 330" stroke={MUTED} marker="url(#aimArr)" />
      <Panel x="230" y="300" w="180" title="Derived Sequence" rows={[
        ['10', 'Mill Flat', N],
        ['20', 'Bore', N],
        ['30', 'Broach Keyway', N]
      ]} accent={GREEN} className="aimm-shift" />

      {/* Knowledge Capture */}
      <Card x="680" y="60" w="180" h="200" title="Knowledge Capture" foot="The bottleneck" footTone={ROSE} accent={ROSE}>
        <L x="90" y="60" size="12" fill={MUTED}>Eliciting expert rules:</L>
        <L x="90" y="90" size="12" fill={N} weight="700">IF feature = bore</L>
        <L x="90" y="110" size="12" fill={N} weight="700">AND tol &lt; 0.02</L>
        <L x="90" y="130" size="12" fill={N} weight="700">THEN process = bore</L>
      </Card>
    </Scene>
  )
}

export function M3CappBenefitsAndDownstreamScene() {
  return (
    <Scene caption="CAPP benefits include consistency, speed, and seamless integration with downstream systems">
      {/* Benefit blocks */}
      <Card x="40" y="60" w="220" h="110" title="Consistency" accent={TEAL}>
        <L x="110" y="60" size="13" fill={MUTED}>Similar plans for similar parts</L>
        <Wire d="M 60 80 L 160 80" stroke={TEAL} width="2" className="aimm-traverse" />
      </Card>
      <Card x="40" y="190" w="220" h="110" title="Speed" accent={GREEN}>
        <L x="110" y="60" size="13" fill={MUTED}>Shorter planning time</L>
        <Bars x="20" y="75" w="180" items={[['Time', 20, GREEN]]} max="100" rowH="20" />
      </Card>
      <Card x="40" y="320" w="220" h="110" title="Integration" accent={BLUE}>
        <L x="110" y="60" size="13" fill={MUTED}>Computer readable format</L>
        <M x="110" y="85" size="14" fill={BLUE} className="aimm-pulse">&lt;PLAN ID="421"/&gt;</M>
      </Card>

      {/* Integration routing */}
      <Wire d="M 260 375 L 340 375" stroke={BLUE} />
      <Wire d="M 340 100 L 340 375" stroke={BLUE} />
      
      <Wire d="M 340 100 L 400 100" stroke={BLUE} marker="url(#aimArrB)" className="aimm-rewire" />
      <Wire d="M 340 190 L 400 190" stroke={BLUE} marker="url(#aimArrB)" className="aimm-rewire aimm-delay-1" />
      <Wire d="M 340 280 L 400 280" stroke={BLUE} marker="url(#aimArrB)" className="aimm-rewire aimm-delay-2" />
      <Wire d="M 340 375 L 400 375" stroke={BLUE} marker="url(#aimArrB)" className="aimm-rewire aimm-delay-3" />

      {/* Downstream */}
      <Block x="410" y="70" w="180" h="60" label="Scheduling" stroke={MUTED} />
      <Block x="410" y="160" w="180" h="60" label="MRP" stroke={MUTED} />
      <Block x="410" y="250" w="180" h="60" label="Cost Estimation" stroke={MUTED} />
      <Block x="410" y="345" w="180" h="60" label="NC Programming" stroke={MUTED} />

      {/* Contrast panel */}
      <Card x="620" y="120" w="240" h="180" title="Manual Contrast" accent={ROSE}>
        <L x="120" y="55" size="13" fill={MUTED}>Data re-typed 4 times</L>
        <L x="120" y="90" size="12" fill={N}>Sys 1: Op 20, 15 min</L>
        <L x="120" y="115" size="12" fill={N}>Sys 2: Op 20, 15 min</L>
        <L x="120" y="140" size="14" fill={ROSE} weight="800" className="aimm-pulse">Sys 3: Op 20, 51 min</L>
        <L x="120" y="165" size="12" fill={N}>Sys 4: Op 20, 15 min</L>
      </Card>
    </Scene>
  )
}

export function M3MrpThreeInputsScene() {
  return (
    <Scene caption="MRP calculates dependent demand using the schedule, BOM and inventory records">
      {/* Inputs */}
      <Panel x="40" y="40" w="220" title="Master Schedule" rows={[
        ['Week 1', '50 units', N],
        ['Week 2', '75 units', N],
        ['Week 3', '60 units', N]
      ]} accent={TEAL} className="aimm-shift" />
      <Wire d="M 260 90 L 330 200" stroke={MUTED} marker="url(#aimArr)" />

      <Card x="40" y="190" w="220" h="120" title="Bill of Materials" accent={PURP} className="aimm-shift aimm-delay-1">
        <L x="110" y="55" size="13" fill={N} weight="800">Product A</L>
        <Wire d="M 110 60 L 110 75" stroke={MUTED} />
        <Wire d="M 60 75 L 160 75" stroke={MUTED} />
        <Wire d="M 60 75 L 60 90" stroke={MUTED} />
        <Wire d="M 160 75 L 160 90" stroke={MUTED} />
        <L x="60" y="105" size="12" fill={N}>Assy B (2)</L>
        <L x="160" y="105" size="12" fill={N}>Part C (1)</L>
      </Card>
      <Wire d="M 260 230 L 330 230" stroke={MUTED} marker="url(#aimArr)" />

      <Panel x="40" y="330" w="220" title="Inventory Records" rows={[
        ['Assy B', 'On Hand: 40', N],
        ['Lead Time', '2 Weeks', N]
      ]} accent={BLUE} className="aimm-shift aimm-delay-2" />
      <Wire d="M 260 380 L 330 260" stroke={MUTED} marker="url(#aimArr)" />

      {/* Central block */}
      <Block x="340" y="190" w="140" h="80" label="MRP" sub="Calculation Engine" stroke={N} fill={SKY} />
      <Wire d="M 480 230 L 530 230" stroke={MUTED} marker="url(#aimArr)" />

      {/* Output */}
      <Panel x="540" y="180" w="200" title="Planned Orders" rows={[
        ['Assy B', 'Order 60', GREEN],
        ['Release', 'Week 1', GREEN]
      ]} accent={GREEN} className="aimm-insert" />

      {/* Distinction Panel */}
      <Card x="540" y="310" w="280" h="150" title="Independent vs Dependent" accent={ROSE} className="aimm-insert aimm-delay-1">
        <L x="140" y="55" size="12" fill={N} weight="800">Independent Demand (Forecast)</L>
        <Curve pts={[[20, 80], [60, 70], [100, 85], [140, 65], [180, 80], [220, 60], [260, 75]]} stroke={ROSE} />
        <Wire d="M 20 60 L 260 60" stroke={ROSE} width="1" dash="4 4" opacity="0.4" />
        <Wire d="M 20 100 L 260 100" stroke={ROSE} width="1" dash="4 4" opacity="0.4" />
        <L x="140" y="115" size="12" fill={N} weight="800">Dependent Demand (Calculated)</L>
        <Wire d="M 20 135 L 60 135 L 60 125 L 100 125 L 100 140 L 140 140 L 140 130 L 180 130 L 180 145 L 220 145 L 220 125 L 260 125" stroke={GREEN} width="2" />
      </Card>
    </Scene>
  )
}

export function M3MrpTimePhasedRecordScene() {
  return (
    <Scene caption="The calculation offsets requirements backward by the lead time to plan order releases">
      <Card x="40" y="30" w="800" h="220" title="Parent Item: Assy B (Lead Time: 2 Weeks)" accent={TEAL}>
        <M x="200" y="60" size="12" fill={MUTED}>Week</M>
        {[1, 2, 3, 4, 5, 6].map(w => <M key={w} x={200 + w*70} y="60" size="12" fill={N}>{w}</M>)}
        
        <M x="200" y="85" size="12" fill={MUTED} anchor="end">Gross Requirements</M>
        <M x="410" y="85" size="12" fill={N} className="aimm-insert">100</M>
        <M x="550" y="85" size="12" fill={N} className="aimm-insert">150</M>

        <M x="200" y="110" size="12" fill={MUTED} anchor="end">Scheduled Receipts</M>
        <M x="270" y="110" size="12" fill={N} className="aimm-insert">50</M>

        <M x="200" y="135" size="12" fill={MUTED} anchor="end">Projected On Hand (Stock: 20)</M>
        <M x="270" y="135" size="12" fill={N} className="aimm-insert aimm-delay-1">70</M>
        <M x="340" y="135" size="12" fill={N} className="aimm-insert aimm-delay-1">70</M>
        <M x="410" y="135" size="12" fill={ROSE} className="aimm-insert aimm-delay-1">-30</M>

        <M x="200" y="160" size="12" fill={MUTED} anchor="end">Net Requirements</M>
        <M x="410" y="160" size="12" fill={ROSE} className="aimm-insert aimm-delay-2">30</M>
        <M x="550" y="160" size="12" fill={ROSE} className="aimm-insert aimm-delay-2">150</M>

        <M x="200" y="185" size="12" fill={MUTED} anchor="end">Planned Order Receipt</M>
        <M x="410" y="185" size="12" fill={GREEN} className="aimm-insert aimm-delay-2">30</M>
        <M x="550" y="185" size="12" fill={GREEN} className="aimm-insert aimm-delay-2">150</M>

        <M x="200" y="210" size="12" fill={MUTED} anchor="end">Planned Order Release</M>
        <M x="270" y="210" size="12" fill={BLUE} weight="800" className="aimm-insert aimm-delay-3">30</M>
        <M x="410" y="210" size="12" fill={BLUE} weight="800" className="aimm-insert aimm-delay-3">150</M>

        <Wire d="M 390 185 L 290 205" stroke={BLUE} marker="url(#aimArrB)" className="aimm-rewire aimm-delay-3" />
        <Wire d="M 530 185 L 430 205" stroke={BLUE} marker="url(#aimArrB)" className="aimm-rewire aimm-delay-3" />
      </Card>

      <Wire d="M 270 260 L 270 290" stroke={BLUE} marker="url(#aimArrB)" className="aimm-descend" />

      <Card x="40" y="300" w="800" h="140" title="Component: Part C" accent={PURP}>
        <M x="200" y="60" size="12" fill={MUTED}>Week</M>
        {[1, 2, 3, 4, 5, 6].map(w => <M key={w} x={200 + w*70} y="60" size="12" fill={N}>{w}</M>)}
        
        <M x="200" y="85" size="12" fill={MUTED} anchor="end">Gross Requirements</M>
        <M x="270" y="85" size="12" fill={BLUE} weight="800" className="aimm-insert aimm-delay-4">30</M>
        <M x="410" y="85" size="12" fill={BLUE} weight="800" className="aimm-insert aimm-delay-4">150</M>
      </Card>
    </Scene>
  )
}

export function M3MrpOutputsFanScene() {
  return (
    <Scene caption="Planned order releases are the main output, but action messages keep the system usable">
      {/* Central block */}
      <Block x="40" y="160" w="120" h="100" label="MRP" sub="Engine" stroke={N} fill={SKY} />

      {/* 5 streams */}
      <Wire d="M 160 210 L 220 70 L 250 70" stroke={BLUE} marker="url(#aimArrB)" className="aimm-rewire" />
      <Card x="260" y="30" w="220" h="70" title="Planned Orders" accent={BLUE}>
        <L x="110" y="55" size="12" fill={N}>To purchasing and shop</L>
      </Card>

      <Wire d="M 160 210 L 220 140 L 250 140" stroke={AMBER} marker="url(#aimArrA)" className="aimm-rewire aimm-delay-1" />
      <Card x="260" y="110" w="220" h="70" title="Rescheduling" accent={AMBER}>
        <L x="110" y="55" size="12" fill={MUTED}>Pull in / Push out</L>
      </Card>

      <Wire d="M 160 210 L 250 210" stroke={ROSE} marker="url(#aimArrRo)" className="aimm-rewire aimm-delay-2" />
      <Card x="260" y="190" w="220" h="70" title="Cancellation" accent={ROSE}>
        <L x="110" y="55" size="12" fill={MUTED} className="aimm-delete">Remove order</L>
      </Card>

      <Wire d="M 160 210 L 220 280 L 250 280" stroke={RED} marker="url(#aimArrR)" className="aimm-rewire aimm-delay-3" />
      <Panel x="260" y="270" w="220" title="Exception Reports" rows={[
        ['Order 99', 'Late by 2 weeks', RED]
      ]} accent={RED} />

      <Wire d="M 160 210 L 220 370 L 250 370" stroke={TEAL} marker="url(#aimArrT)" className="aimm-rewire aimm-delay-4" />
      <Card x="260" y="340" w="220" h="140" title="Capacity Planning" accent={TEAL}>
        <L x="110" y="50" size="12" fill={MUTED}>Load vs Available</L>
        <Bars x="20" y="60" w="180" items={[
          ['Wk1', 80, TEAL],
          ['Wk2', 110, ROSE],
          ['Wk3', 90, TEAL]
        ]} max="120" rowH="20" />
      </Card>

      {/* Benefits */}
      <Card x="600" y="120" w="250" h="160" title="MRP Benefits" accent={GREEN} className="aimm-insert aimm-delay-4">
        <L x="125" y="60" size="14" fill={N} weight="800">Inventory Reduction</L>
        <L x="125" y="100" size="14" fill={N} weight="800">Fewer Shortages</L>
        <L x="125" y="140" size="14" fill={N} weight="800">Better Delivery</L>
      </Card>
      
      <Wire d="M 500 65 L 725 65 L 725 110" stroke={BLUE} marker="url(#aimArrB)" dash="4 4" opacity="0.4" />
      <Wire d="M 500 145 L 590 145" stroke={AMBER} marker="url(#aimArrA)" dash="4 4" opacity="0.4" />
    </Scene>
  )
}

export function M3AgvThreeTypesScene() {
  return (
    <Scene caption="AGVs match their form to the distance, load size and required automation">
      {/* Factory Plan */}
      <Block x="40" y="40" w="820" h="300" label="" stroke={MUTED} fill={SKY} opacity="0.2" />
      <Block x="60" y="60" w="120" h="60" label="Goods Inward" stroke={N} fill={WHITE} />
      <Block x="720" y="60" w="120" h="60" label="Distant Store" stroke={N} fill={WHITE} />
      
      <Block x="60" y="220" w="100" h="60" label="Manual Load" stroke={N} fill={WHITE} />
      <Block x="350" y="220" w="100" h="60" label="Dispatch" stroke={N} fill={WHITE} />

      <Block x="500" y="180" w="120" h="50" label="CNC Cell A" stroke={N} fill={WHITE} />
      <Block x="700" y="180" w="120" h="50" label="CNC Cell B" stroke={N} fill={WHITE} />

      {/* Driverless Train */}
      <Wire d="M 120 120 L 120 150 L 780 150 L 780 120" stroke={MUTED} dash="4 4" width="2" />
      <g className="aimm-traverse">
        <Block x="200" y="140" w="40" h="20" label="" stroke={TEAL} fill={TEAL} />
        <Block x="150" y="140" w="40" h="20" label="" stroke={N} fill={WHITE} />
        <Block x="100" y="140" w="40" h="20" label="" stroke={N} fill={WHITE} />
        <Block x="50" y="140" w="40" h="20" label="" stroke={N} fill={WHITE} />
      </g>
      <L x="450" y="135" size="13" fill={TEAL} weight="800">Driverless Train (Large quantities, long routes)</L>

      {/* Pallet Truck */}
      <Wire d="M 110 280 L 110 310 L 400 310 L 400 280" stroke={MUTED} dash="4 4" width="2" />
      <g className="aimm-shift">
        <Block x="200" y="300" w="30" h="20" label="" stroke={BLUE} fill={BLUE} />
      </g>
      <L x="250" y="335" size="13" fill={BLUE} weight="800">Pallet Truck (Manually loaded, auto dispatch)</L>

      {/* Unit Load Carrier */}
      <Wire d="M 560 230 L 560 270 L 760 270 L 760 230" stroke={MUTED} dash="4 4" width="2" />
      <g className="aimm-shift aimm-delay-2">
        <Block x="620" y="260" w="20" h="20" label="" stroke={ROSE} fill={ROSE} />
      </g>
      <L x="660" y="305" size="13" fill={ROSE} weight="800">Unit Load Carrier (FMS, auto transfer)</L>

      {/* Selection strip */}
      <Card x="150" y="360" w="600" h="100" title="Selection Map" accent={N}>
        <M x="150" y="55" size="12" fill={MUTED}>Long Dist / Bulk</M>
        <L x="150" y="75" size="14" fill={TEAL} weight="800" className="aimm-insert">Driverless Train</L>

        <M x="300" y="55" size="12" fill={MUTED}>Palletised</M>
        <L x="300" y="75" size="14" fill={BLUE} weight="800" className="aimm-insert aimm-delay-1">Pallet Truck</L>

        <M x="450" y="55" size="12" fill={MUTED}>Single Load / Auto</M>
        <L x="450" y="75" size="14" fill={ROSE} weight="800" className="aimm-insert aimm-delay-2">Unit Load Carrier</L>
      </Card>
    </Scene>
  )
}

export function M3GuidanceTechnologiesComparisonScene() {
  return (
    <Scene caption="Vehicle guidance relies on either floor infrastructure or on-board intelligence">
      {/* Imbedded wire */}
      <Card x="40" y="40" w="500" h="100" title="Imbedded Wire" accent={TEAL}>
        <Wire d="M 30 65 L 470 65" stroke={TEAL} width="3" />
        <Dot cx="250" cy="65" r="10" fill={BLUE} className="aimm-traverse" />
        <L x="30" y="45" size="12" fill={MUTED} anchor="start">Reliable, difficult to change</L>
        <L x="470" y="45" size="12" fill={TEAL} anchor="end">Frequency signal</L>
      </Card>

      {/* Painted strip */}
      <Card x="40" y="160" w="500" h="100" title="Painted Strip" accent={AMBER}>
        <Wire d="M 30 65 L 200 65" stroke={AMBER} width="6" />
        <Wire d="M 230 65 L 470 65" stroke={AMBER} width="6" />
        <Dot cx="250" cy="65" r="10" fill={BLUE} className="aimm-search" />
        <L x="30" y="45" size="12" fill={MUTED} anchor="start">Cheap, easily rerouted</L>
        <L x="215" y="85" size="12" fill={ROSE}>Worn patch disrupts tracking</L>
      </Card>

      {/* Self guided */}
      <Card x="40" y="280" w="500" h="100" title="Self Guided (Dead Reckoning)" accent={PURP}>
        <Wire d="M 30 65 L 470 65" stroke={MUTED} width="2" dash="4 4" />
        <Dot cx="100" cy="90" r="4" fill={PURP} />
        <Dot cx="250" cy="30" r="4" fill={PURP} />
        <Dot cx="400" cy="90" r="4" fill={PURP} />
        <Wire d="M 250 65 L 250 35" stroke={PURP} dash="2 2" width="1" className="aimm-pulse" />
        <Dot cx="250" cy="65" r="10" fill={BLUE} className="aimm-traverse" />
        <L x="30" y="45" size="12" fill={MUTED} anchor="start">No floor prep needed, uses reflectors</L>
      </Card>

      {/* Routing panel */}
      <Card x="560" y="40" w="280" h="340" title="Junction Routing" accent={N}>
        <M x="140" y="55" size="13" fill={MUTED}>Frequency Select</M>
        <Wire d="M 140 70 L 140 120" stroke={TEAL} width="3" />
        <Wire d="M 140 120 L 90 160" stroke={TEAL} width="3" />
        <Wire d="M 140 120 L 190 160" stroke={GREEN} width="3" />
        <Dot cx="140" cy="90" r="8" fill={BLUE} className="aimm-traverse" />
        <L x="90" y="180" size="11" fill={TEAL}>f1</L>
        <L x="190" y="180" size="11" fill={GREEN}>f2</L>
        
        <M x="140" y="215" size="13" fill={MUTED}>Path Switch Select</M>
        <Wire d="M 140 230 L 140 280" stroke={MUTED} width="3" />
        <Wire d="M 140 280 L 90 320" stroke={MUTED} width="3" />
        <Wire d="M 140 280 L 190 320" stroke={MUTED} width="3" dash="4 4" opacity="0.4" />
        <Block x="130" y="270" w="20" h="20" label="" stroke={AMBER} fill={AMBER} className="aimm-pulse" />
        <Dot cx="120" cy="295" r="8" fill={BLUE} className="aimm-shift" />
      </Card>
    </Scene>
  )
}

export function M3RobotAnatomyLabelledScene() {
  return (
    <Scene caption="A typical industrial robot has three joints for position and three for orientation">
      {/* Main Robot */}
      <Card x="40" y="40" w="500" h="440" title="Jointed Arm Robot (6 DOF)" accent={BLUE}>
        <M x="430" y="50" size="16" fill={BLUE} weight="800" className="aimm-insert">DOF: 6</M>

        <g transform="translate(180, 360)">
          {/* Base */}
          <Block x="-40" y="0" w="80" h="30" label="Base" stroke={N} fill={SKY} />
          
          {/* J1 (Rotational) */}
          <Dot cx="0" cy="-20" r="15" fill={WHITE} stroke={N} className="aimm-insert aimm-delay-1" />
          <L x="-40" y="-15" size="12" fill={N} anchor="end">Body (Rotational)</L>

          {/* Link 1 & J2 */}
          <Wire d="M 0 -35 L 0 -120" stroke={MUTED} width="16" />
          <Dot cx="0" cy="-120" r="15" fill={WHITE} stroke={N} className="aimm-insert aimm-delay-2" />
          <L x="-40" y="-115" size="12" fill={N} anchor="end">Shoulder (Rotational)</L>

          {/* Link 2 & J3 */}
          <Wire d="M 0 -120 L 100 -200" stroke={MUTED} width="12" />
          <Dot cx="100" cy="-200" r="12" fill={WHITE} stroke={N} className="aimm-insert aimm-delay-3" />
          <L x="60" y="-210" size="12" fill={N} anchor="end">Elbow (Rotational)</L>

          {/* Link 3 to Wrist */}
          <Wire d="M 100 -200 L 200 -200" stroke={MUTED} width="8" />
          <Block x="200" y="-210" w="30" h="20" label="" stroke={AMBER} fill={AMBER} className="aimm-insert aimm-delay-4" />
          <L x="215" y="-220" size="12" fill={AMBER}>Wrist (Roll, Pitch, Yaw)</L>

          {/* End Effector */}
          <Wire d="M 230 -200 L 260 -200" stroke={N} width="4" />
          <Wire d="M 260 -210 L 260 -190" stroke={N} width="2" />
          <L x="270" y="-195" size="12" fill={RED} anchor="start">End Effector</L>
        </g>
      </Card>

      {/* Contrast Panel */}
      <Card x="560" y="40" w="300" h="220" title="4-Joint Limitation" accent={ROSE}>
        <L x="150" y="55" size="12" fill={MUTED}>Missing orientation freedoms</L>
        <g transform="translate(150, 180)">
          <Wire d="M -80 0 L -80 -60 L 0 -100 L 60 -100" stroke={MUTED} width="6" />
          <Dot cx="60" cy="-100" r="6" fill={ROSE} />
          <Wire d="M 60 -100 L 90 -100" stroke={RED} width="3" />
          <Block x="80" y="-80" w="40" h="40" label="Part" stroke={TEAL} fill={WHITE} />
          <Wire d="M 90 -80 L 100 -60" stroke={RED} marker="url(#aimArrR)" className="aimm-pulse" />
          <L x="80" y="-120" size="11" fill={ROSE}>Cannot angle down to part</L>
        </g>
      </Card>
    </Scene>
  )
}

export function M3FiveRobotConfigurationsScene() {
  return (
    <Scene caption="Robot configurations are defined by their joint types and dictate the workspace shape">
      {/* 1. Polar */}
      <Card x="20" y="60" w="160" h="300" title="Polar" accent={BLUE}>
        <Dot cx="80" cy="130" r="45" fill={SKY} opacity="0.6" stroke={BLUE} className="aimm-allocate" />
        <Wire d="M 80 180 L 80 130 L 110 100" stroke={N} width="4" />
        <Dot cx="80" cy="130" r="6" fill={WHITE} stroke={N} />
        <M x="80" y="210" size="12" fill={MUTED}>Workspace: Sphere</M>
        <L x="80" y="240" size="13" fill={BLUE} weight="700">Machine Tending</L>
      </Card>

      {/* 2. Cylindrical */}
      <Card x="190" y="60" w="160" h="300" title="Cylindrical" accent={TEAL}>
        <Block x="40" y="80" w="80" h="100" label="" stroke={TEAL} fill={SKY} opacity="0.6" className="aimm-allocate" />
        <Wire d="M 80 180 L 80 100 L 110 100" stroke={N} width="4" />
        <Dot cx="80" cy="180" r="6" fill={WHITE} stroke={N} />
        <M x="80" y="210" size="12" fill={MUTED}>Workspace: Cylinder</M>
        <L x="80" y="240" size="13" fill={TEAL} weight="700">Palletising</L>
      </Card>

      {/* 3. Cartesian */}
      <Card x="360" y="60" w="160" h="300" title="Cartesian" accent={GREEN}>
        <Block x="40" y="80" w="80" h="80" label="" stroke={GREEN} fill={SKY} opacity="0.6" className="aimm-allocate" />
        <Wire d="M 50 160 L 50 100 L 100 100 L 100 130" stroke={N} width="4" />
        <M x="80" y="210" size="12" fill={MUTED}>Workspace: Box</M>
        <L x="80" y="240" size="13" fill={GREEN} weight="700">Assembly, Routing</L>
      </Card>

      {/* 4. Jointed Arm */}
      <Card x="530" y="60" w="160" h="300" title="Jointed Arm" accent={AMBER}>
        <path d="M 40 180 C 20 80, 140 60, 120 150 Z" fill={SKY} stroke={AMBER} opacity="0.6" transform="translate(530,60)" className="aimm-allocate" />
        <Wire d="M 80 180 L 80 140 L 110 110 L 90 90" stroke={N} width="4" />
        <Dot cx="80" cy="140" r="5" fill={WHITE} stroke={N} />
        <Dot cx="110" cy="110" r="5" fill={WHITE} stroke={N} />
        <M x="80" y="210" size="12" fill={MUTED}>Workspace: Irregular</M>
        <L x="80" y="240" size="13" fill={AMBER} weight="700">Welding, Painting</L>
      </Card>

      {/* 5. SCARA */}
      <Card x="700" y="60" w="160" h="300" title="SCARA" accent={PURP}>
        <Block x="30" y="110" w="100" h="40" label="" stroke={PURP} fill={SKY} opacity="0.6" className="aimm-allocate" />
        <Wire d="M 60 180 L 60 130 L 100 130 L 100 150" stroke={N} width="4" />
        <Dot cx="60" cy="130" r="5" fill={WHITE} stroke={N} />
        <M x="80" y="210" size="12" fill={MUTED}>Workspace: Annulus</M>
        <L x="80" y="240" size="13" fill={PURP} weight="700">Vertical Assembly</L>
        <L x="80" y="260" size="11" fill={PURP}>Vertically stiff</L>
        <L x="80" y="275" size="11" fill={PURP}>Horizontally compliant</L>
      </Card>
    </Scene>
  )
}

export function M3ControlHierarchyFourLevelsScene() {
  return (
    <Scene caption="Control systems advance from fixed stops to intelligent sensor-driven behaviour">
      {/* Background ladder structure */}
      {[1, 2, 3, 4].map(i => (
        <Wire key={i} d={`M 40 ${100 * i} L 860 ${100 * i}`} stroke={MUTED} width="1" opacity="0.2" />
      ))}

      {/* Rung 1: Limited Sequence */}
      <L x="60" y="60" size="14" fill={N} weight="800" anchor="start">1. Limited Sequence Control</L>
      <L x="60" y="80" size="12" fill={MUTED} anchor="start">End stops, no servo</L>
      <Block x="300" y="40" w="20" h="40" label="" stroke={ROSE} fill={ROSE} />
      <Block x="500" y="40" w="20" h="40" label="" stroke={ROSE} fill={ROSE} />
      <Wire d="M 320 60 L 500 60" stroke={N} width="4" className="aimm-traverse" />
      <L x="700" y="60" size="13" fill={BLUE} anchor="start">App: Simple transfer</L>
      <L x="700" y="80" size="12" fill={GREEN} anchor="start">$ Low Cost</L>

      {/* Rung 2: Point to Point */}
      <L x="60" y="160" size="14" fill={N} weight="800" anchor="start">2. Point to Point (Playback)</L>
      <L x="60" y="180" size="12" fill={MUTED} anchor="start">Taught positions, unspecified path</L>
      <Dot cx="320" cy="160" r="6" fill={BLUE} />
      <Dot cx="400" cy="140" r="6" fill={BLUE} />
      <Dot cx="480" cy="170" r="6" fill={BLUE} />
      <Curve pts={[[320, 160], [400, 140], [480, 170]]} stroke={BLUE} width="2" dash="4 4" className="aimm-insert" />
      <L x="700" y="160" size="13" fill={BLUE} anchor="start">App: Spot welding, loading</L>
      <L x="700" y="180" size="12" fill={GREEN} anchor="start">$$ Medium Cost</L>

      {/* Rung 3: Continuous Path */}
      <L x="60" y="260" size="14" fill={N} weight="800" anchor="start">3. Continuous Path (Playback)</L>
      <L x="60" y="280" size="12" fill={MUTED} anchor="start">Dense points, precise path</L>
      <Curve pts={[[300, 260], [330, 250], [360, 270], [400, 260], [450, 250], [500, 270]]} stroke={TEAL} width="4" className="aimm-insert aimm-delay-1" />
      <L x="700" y="260" size="13" fill={BLUE} anchor="start">App: Arc welding, spray painting</L>
      <L x="700" y="280" size="12" fill={GREEN} anchor="start">$$$ High Cost</L>

      {/* Rung 4: Intelligent Control */}
      <L x="60" y="360" size="14" fill={N} weight="800" anchor="start">4. Intelligent Control</L>
      <L x="60" y="380" size="12" fill={MUTED} anchor="start">Sensor reaction, adaptive</L>
      <Block x="450" y="360" w="40" h="20" label="Part" stroke={MUTED} fill={SKY} className="aimm-shift" />
      <Wire d="M 300 360 L 400 360" stroke={AMBER} width="4" />
      <Wire d="M 400 360 L 450 360" stroke={AMBER} width="4" marker="url(#aimArrA)" className="aimm-rewire aimm-delay-2" />
      <Dot cx="400" cy="360" r="12" fill={WHITE} stroke={AMBER} />
      <L x="400" y="340" size="11" fill={AMBER}>Sensor adjusts</L>
      <L x="700" y="360" size="13" fill={BLUE} anchor="start">App: Assembly, varying environments</L>
      <L x="700" y="380" size="12" fill={GREEN} anchor="start">$$$$ Premium Cost</L>
    </Scene>
  )
}

export function M3AccuracyVersusRepeatabilityTargetsScene() {
  return (
    <Scene caption="Repeatability matters more than accuracy for tasks that are taught by guiding the arm">
      {/* Target 1: Good repeatability, poor accuracy */}
      <Card x="40" y="40" w="240" h="300" title="Taught Task (Acceptable)" accent={GREEN}>
        <Dot cx="120" cy="140" r="60" fill="none" stroke={MUTED} />
        <Dot cx="120" cy="140" r="40" fill="none" stroke={MUTED} />
        <Dot cx="120" cy="140" r="20" fill="none" stroke={MUTED} />
        <Dot cx="120" cy="140" r="3" fill={N} />
        <L x="120" y="70" size="11" fill={MUTED}>Commanded Center</L>

        <g className="aimm-insert">
          <Dot cx="160" cy="110" r="4" fill={GREEN} />
          <Dot cx="163" cy="105" r="4" fill={GREEN} />
          <Dot cx="157" cy="113" r="4" fill={GREEN} />
          <Dot cx="165" cy="112" r="4" fill={GREEN} />
          <Dot cx="160" cy="118" r="4" fill={GREEN} />
        </g>
        
        <L x="120" y="240" size="13" fill={GREEN} weight="800">Good Repeatability</L>
        <L x="120" y="260" size="13" fill={ROSE}>Poor Accuracy</L>
        <L x="120" y="280" size="11" fill={MUTED}>Systematic errors repeat</L>
      </Card>

      {/* Target 2: Good accuracy, poor repeatability */}
      <Card x="300" y="40" w="240" h="300" title="Production (Useless)" accent={ROSE}>
        <Dot cx="120" cy="140" r="60" fill="none" stroke={MUTED} />
        <Dot cx="120" cy="140" r="40" fill="none" stroke={MUTED} />
        <Dot cx="120" cy="140" r="20" fill="none" stroke={MUTED} />
        <Dot cx="120" cy="140" r="3" fill={N} />
        
        <g className="aimm-insert aimm-delay-1">
          <Dot cx="125" cy="130" r="4" fill={ROSE} />
          <Dot cx="100" cy="145" r="4" fill={ROSE} />
          <Dot cx="135" cy="160" r="4" fill={ROSE} />
          <Dot cx="140" cy="110" r="4" fill={ROSE} />
          <Dot cx="90" cy="120" r="4" fill={ROSE} />
        </g>

        <L x="120" y="240" size="13" fill={GREEN}>Good Accuracy (Mean)</L>
        <L x="120" y="260" size="13" fill={ROSE} weight="800">Poor Repeatability</L>
        <L x="120" y="280" size="11" fill={MUTED}>Scattered unpredictable</L>
      </Card>

      {/* Resolution Ladder */}
      <Card x="560" y="40" w="300" h="180" title="Control Resolution" accent={TEAL}>
        <L x="150" y="55" size="12" fill={MUTED}>Smallest commandable increment</L>
        
        <Wire d="M 50 140 L 100 140 L 100 110 L 150 110 L 150 80 L 200 80" stroke={TEAL} width="2" />
        
        <Dot cx="125" cy="95" r="5" fill={ROSE} />
        <L x="125" y="85" size="11" fill={ROSE}>Commanded point</L>
        
        <Wire d="M 125 95 L 125 110" stroke={RED} marker="url(#aimArrR)" className="aimm-shift" />
        <Dot cx="125" cy="110" r="6" fill={GREEN} />
        <L x="125" y="125" size="11" fill={GREEN}>Forced to step</L>
      </Card>

      {/* Spec Panel */}
      <Panel x="560" y="230" w="300" title="Typical Industrial Spec" rows={[
        ['Control Resolution', '0.02 mm', N],
        ['Accuracy', '±0.50 mm', ROSE],
        ['Repeatability', '±0.05 mm', GREEN]
      ]} accent={MUTED} />
    </Scene>
  )
}

export function M3EndEffectorAndSensorFamiliesScene() {
  return (
    <Scene caption="End effectors perform the work while sensors detect the expected and the unexpected">
      {/* Left: End Effectors */}
      <Card x="20" y="40" w="420" h="440" title="End Effectors (Work)" accent={BLUE}>
        {/* Mech Gripper */}
        <Block x="30" y="60" w="160" h="60" label="Mechanical Gripper" sub="For distinct parts" stroke={BLUE} />
        <Wire d="M 110 120 L 90 140" stroke={N} width="4" />
        <Wire d="M 110 120 L 130 140" stroke={N} width="4" />
        <Dot cx="110" cy="150" r="12" fill={SKY} stroke={BLUE} className="aimm-allocate" />

        {/* Vacuum */}
        <Block x="230" y="60" w="160" h="60" label="Vacuum Cup" sub="For flat sheets" stroke={BLUE} />
        <Wire d="M 310 120 L 290 130 L 330 130 Z" stroke={N} fill={WHITE} />
        <Wire d="M 280 140 L 340 140" stroke={TEAL} width="4" className="aimm-allocate" />

        {/* Magnet */}
        <Block x="30" y="240" w="160" h="60" label="Magnetic Gripper" sub="For ferrous plates" stroke={BLUE} />
        <Wire d="M 100 300 L 100 320 L 120 320 L 120 300" stroke={N} width="8" fill="none" />
        <Wire d="M 90 325 L 130 325" stroke={MUTED} width="6" className="aimm-allocate" />

        {/* Tools */}
        <Block x="230" y="240" w="160" h="60" label="Tools" sub="Process execution" stroke={BLUE} />
        <Wire d="M 310 300 L 310 330" stroke={N} width="4" />
        <Dot cx="310" cy="335" r="4" fill={AMBER} className="aimm-pulse" />
      </Card>

      {/* Right: Sensors */}
      <Card x="460" y="40" w="420" h="440" title="Sensors (Information)" accent={PURP}>
        {/* Tactile */}
        <Block x="30" y="60" w="160" h="60" label="Tactile Pad" sub="Contact and force" stroke={PURP} />
        <Wire d="M 110 120 L 110 150" stroke={N} width="4" />
        <Block x="100" y="145" w="20" h="10" label="" stroke={PURP} fill={PURP} />
        <Dot cx="110" cy="170" r="12" fill={SKY} stroke={BLUE} className="aimm-shift" />
        <L x="150" y="150" size="11" fill={PURP} className="aimm-pulse">Force detected</L>

        {/* Proximity */}
        <Block x="230" y="60" w="160" h="60" label="Proximity Sensor" sub="Surface approach" stroke={PURP} />
        <Wire d="M 310 120 L 310 140" stroke={N} width="4" />
        <Wire d="M 310 145 L 310 170" stroke={PURP} width="2" dash="4 4" className="aimm-search" />
        <Wire d="M 280 180 L 340 180" stroke={MUTED} width="4" />

        {/* Vision */}
        <Block x="30" y="240" w="160" h="60" label="Camera / Vision" sub="Part location" stroke={PURP} />
        <Block x="100" y="300" w="20" h="15" label="" stroke={N} fill={WHITE} />
        <Wire d="M 90 320 L 130 320" stroke={PURP} width="2" dash="4 4" className="aimm-allocate" />
        <Dot cx="110" cy="340" r="10" fill={GREEN} />

        {/* Encoders */}
        <Block x="230" y="240" w="160" h="60" label="Joint Encoders" sub="Robot position" stroke={PURP} />
        <Wire d="M 290 310 L 330 330" stroke={MUTED} width="8" />
        <Dot cx="310" cy="320" r="8" fill={WHITE} stroke={PURP} className="aimm-pulse" />
        <L x="310" y="345" size="11" fill={PURP}>Internal state</L>
      </Card>
    </Scene>
  )
}

export function M3FourApplicationFamiliesScene() {
  return (
    <Scene caption="Robot applications range from simple handling to highly demanding assembly tasks">
      {/* 4 Cells */}
      <Card x="20" y="40" w="200" h="240" title="Material Handling" accent={BLUE}>
        <Wire d="M 100 120 L 100 150 L 50 150" stroke={N} width="4" className="aimm-wrap" />
        <Block x="40" y="145" w="20" h="10" label="" stroke={BLUE} fill={SKY} />
        <Wire d="M 30 170 L 70 170" stroke={MUTED} width="4" />
        <L x="100" y="200" size="12" fill={N} weight="800">Transfer & Load</L>
        <L x="100" y="220" size="11" fill={MUTED}>Easiest, largest category</L>
      </Card>

      <Card x="240" y="40" w="200" h="240" title="Processing" accent={AMBER}>
        <Wire d="M 100 120 L 100 150 L 70 160" stroke={N} width="4" className="aimm-traverse" />
        <Dot cx="60" cy="165" r="4" fill={AMBER} className="aimm-pulse" />
        <Wire d="M 40 170 L 100 170" stroke={MUTED} width="8" />
        <L x="100" y="200" size="12" fill={N} weight="800">Welding & Spraying</L>
        <L x="100" y="220" size="11" fill={MUTED}>Requires continuous path</L>
      </Card>

      <Card x="460" y="40" w="200" h="240" title="Assembly" accent={ROSE}>
        <Wire d="M 100 120 L 100 160" stroke={N} width="4" className="aimm-insert" />
        <Block x="90" y="160" w="20" h="10" label="" stroke={ROSE} fill={WHITE} />
        <Block x="80" y="175" w="40" h="15" label="" stroke={MUTED} fill={WHITE} />
        <Dot cx="100" cy="140" r="4" fill={PURP} className="aimm-pulse" />
        <L x="100" y="200" size="12" fill={N} weight="800">Insertions</L>
        <L x="100" y="220" size="11" fill={MUTED}>Needs force control</L>
      </Card>

      <Card x="680" y="40" w="200" h="240" title="Inspection" accent={TEAL}>
        <Wire d="M 100 120 L 100 150 L 80 150" stroke={N} width="4" className="aimm-search" />
        <Dot cx="75" cy="150" r="4" fill={TEAL} />
        <Block x="60" y="170" w="40" h="20" label="" stroke={MUTED} fill={SKY} />
        <L x="100" y="200" size="12" fill={N} weight="800">Checking Dimensions</L>
        <L x="100" y="220" size="11" fill={MUTED}>Probes & Vision</L>
      </Card>

      {/* Difficulty Gradient */}
      <L x="120" y="320" size="14" fill={MUTED} weight="800" anchor="center">Easiest</L>
      <Wire d="M 160 315 L 740 315" stroke={MUTED} width="4" marker="url(#aimArr)" />
      <L x="780" y="320" size="14" fill={ROSE} weight="800" anchor="center">Hardest</L>

      {/* Requirement Strips */}
      <Panel x="20" y="350" w="200" title="" rowH="20" rows={[
        ['Control', 'PTP', BLUE],
        ['Sensors', 'Minimal', N]
      ]} accent={BLUE} />
      <Panel x="240" y="350" w="200" title="" rowH="20" rows={[
        ['Control', 'Cont. Path', AMBER],
        ['Sensors', 'Internal', N]
      ]} accent={AMBER} />
      <Panel x="460" y="350" w="200" title="" rowH="20" rows={[
        ['Control', 'Intelligent', ROSE],
        ['Sensors', 'Tactile/Force', PURP]
      ]} accent={ROSE} />
      <Panel x="680" y="350" w="200" title="" rowH="20" rows={[
        ['Control', 'PTP/CP', TEAL],
        ['Sensors', 'Vision/Probe', PURP]
      ]} accent={TEAL} />
    </Scene>
  )
}

export function M3ModuleThreeChainScene() {
  return (
    <Scene caption="The chain links planning to execution; if information breaks, downstream action fails">
      {/* 4 Blocks */}
      <Block x="80" y="160" w="140" h="80" label="CAPP" sub="How to make" stroke={TEAL} fill={WHITE} />
      <Block x="280" y="160" w="140" h="80" label="MRP" sub="When to order" stroke={GREEN} fill={WHITE} />
      <Block x="480" y="160" w="140" h="80" label="AGVS" sub="Move material" stroke={BLUE} fill={WHITE} />
      <Block x="680" y="160" w="140" h="80" label="Robotics" sub="Handle material" stroke={AMBER} fill={WHITE} />

      {/* Info Track (Above) */}
      <Wire d="M 50 100 L 850 100" stroke={MUTED} width="2" dash="4 4" />
      <Wire d="M 150 160 L 150 100" stroke={TEAL} marker="url(#aimArrT)" className="aimm-shift" />
      <L x="210" y="90" size="12" fill={TEAL} weight="800">Route Sheet</L>
      
      <Wire d="M 350 100 L 350 160" stroke={GREEN} marker="url(#aimArrG)" className="aimm-shift aimm-delay-1" />
      <Wire d="M 350 160 L 350 100" stroke={GREEN} marker="url(#aimArrG)" className="aimm-shift aimm-delay-1" />
      <L x="410" y="90" size="12" fill={GREEN} weight="800">Planned Orders</L>

      <Wire d="M 550 100 L 550 160" stroke={BLUE} marker="url(#aimArrB)" className="aimm-shift aimm-delay-2" />
      <Wire d="M 750 100 L 750 160" stroke={AMBER} marker="url(#aimArrA)" className="aimm-shift aimm-delay-3" />

      {/* Material Track (Below) */}
      <Wire d="M 50 300 L 850 300" stroke={N} width="4" />
      <Wire d="M 550 160 L 550 300" stroke={BLUE} marker="url(#aimArrB)" className="aimm-descend" />
      <Block x="400" y="290" w="40" h="20" label="" stroke={BLUE} fill={SKY} className="aimm-traverse" />
      
      <Wire d="M 750 160 L 750 300" stroke={AMBER} marker="url(#aimArrA)" className="aimm-descend aimm-delay-1" />
      <Dot cx="750" cy="280" r="10" fill={AMBER} stroke={WHITE} className="aimm-pulse" />

      {/* Breaks in info track */}
      <g className="aimm-pulse">
        <Wire d="M 230 80 L 250 120" stroke={RED} width="4" />
        <Wire d="M 230 120 L 250 80" stroke={RED} width="4" />
      </g>
      <L x="240" y="60" size="12" fill={RED} weight="800">Break: Wrong lead times</L>

      <g className="aimm-pulse aimm-delay-2">
        <Wire d="M 430 80 L 450 120" stroke={RED} width="4" />
        <Wire d="M 430 120 L 450 80" stroke={RED} width="4" />
      </g>
      <L x="440" y="60" size="12" fill={RED} weight="800">Break: Move wrong work</L>
    </Scene>
  )
}

/* ── Module 4 ────────────────────────────────────────────────────────── */

export function M4InspectionPurposeScene() {
  return (
    <Scene caption="Where to inspect: sorting, preventing waste, and process control">
      <Card x="50" y="50" w="800" h="420" title="Inspection Placement" foot="Value added rises along the sequence">
        <Wire d="M100 150 L800 150" stroke={MUTED} />
        {/* Operations */}
        <Block x="80" y="125" w="60" h="50" label="Op 1" stroke={MUTED} />
        <Block x="200" y="125" w="60" h="50" label="Op 2" sub="Critical" stroke={BLUE} />
        <Block x="360" y="125" w="60" h="50" label="Op 3" stroke={MUTED} />
        <Block x="500" y="125" w="60" h="50" label="Op 4" sub="Expensive" stroke={ROSE} />
        <Block x="660" y="125" w="60" h="50" label="Op 5" stroke={MUTED} />

        {/* Inspection Points */}
        {/* IP1: Process Control */}
        <Block x="280" y="130" w="40" h="40" label="INSP" fill={CREAM} stroke={AMBER} className="aimm-pulse" />
        <Wire d="M300 130 L300 80 L230 80 L230 125" stroke={AMBER} marker="url(#aimArrA)" />
        <L x="265" y="70" size="12" fill={AMBER}>Process control</L>

        {/* IP2: Prevent Waste */}
        <Block x="440" y="130" w="40" h="40" label="INSP" fill={CREAM} stroke={AMBER} className="aimm-pulse aimm-delay-1" />
        <Wire d="M460 170 L460 210" stroke={AMBER} marker="url(#aimArrA)" dash="4 4" />
        <L x="460" y="225" size="12" fill={AMBER}>Prevent waste</L>

        {/* IP3: Sorting Only */}
        <Block x="740" y="130" w="40" h="40" label="INSP" fill={CREAM} stroke={AMBER} className="aimm-pulse aimm-delay-2" />
        <Wire d="M760 170 L760 210" stroke={AMBER} marker="url(#aimArrA)" />
        <L x="760" y="225" size="12" fill={AMBER}>Sorting only</L>

        {/* Cost Strip */}
        <Axes x="80" y="380" w="660" h="100" yLabel="Cost" />
        <rect x="110" y="360" width="30" height="20" fill={SKY} />
        <rect x="230" y="340" width="30" height="40" fill={SKY} />
        <rect x="390" y="320" width="30" height="60" fill={SKY} />
        <rect x="530" y="290" width="30" height="90" fill={ROSE} />
        <rect x="690" y="260" width="30" height="120" fill={SKY} />
        
        <L x="125" y="395" size="11">Op 1</L>
        <L x="245" y="395" size="11">Op 2</L>
        <L x="405" y="395" size="11">Op 3</L>
        <L x="545" y="395" size="11">Op 4</L>
        <L x="705" y="395" size="11">Op 5</L>
      </Card>
    </Scene>
  )
}

export function M4SamplingVersusHundredScene() {
  return (
    <Scene caption="Manual, sampling, and automated inspection regimes">
      <Card x="20" y="30" w="270" h="280" title="Manual 100%" accent={ROSE}>
        <Axes x="50" y="140" w="180" h="60" yLabel="Detect %" xLabel="Time" />
        <Curve pts={[[50, 80], [100, 85], [150, 110], [200, 130], [230, 135]]} stroke={ROSE} className="aimm-wave" />
        <L x="140" y="165" size="11" fill={ROSE}>Fatigue drops detection</L>
        <Block x="85" y="190" w="100" h="40" label="Escapes: 14" stroke={ROSE} fill={CREAM} />
      </Card>
      
      <Card x="310" y="30" w="270" h="280" title="Sampling" accent={AMBER}>
        <Wire d="M330 140 L560 140" stroke={MUTED} />
        <Block x="360" y="120" w="40" h="40" label="Sample" size="10" stroke={AMBER} />
        <Block x="450" y="120" w="40" h="40" label="Skip" size="11" stroke={MUTED} dash="4 4" />
        <Block x="520" y="120" w="40" h="40" label="Skip" size="11" stroke={MUTED} dash="4 4" />
        <L x="445" y="200" size="12" fill={AMBER}>Risk of passing defective</L>
        <Block x="385" y="220" w="100" h="40" label="Escapes: 32" stroke={AMBER} fill={CREAM} />
      </Card>

      <Card x="600" y="30" w="270" h="280" title="Automated 100%" accent={TEAL}>
        <Axes x="630" y="140" w="180" h="60" yLabel="Detect %" xLabel="Time" />
        <Curve pts={[[630, 80], [700, 80], [770, 80], [810, 80]]} stroke={TEAL} />
        <L x="720" y="165" size="11" fill={TEAL}>Consistent detection</L>
        <Block x="685" y="190" w="100" h="40" label="Escapes: 0" stroke={TEAL} fill={CREAM} />
        <L x="720" y="250" size="11" fill={MUTED}>Negligible marginal cost</L>
      </Card>

      <Panel x="150" y="340" w="600" title="Comparison" accent={MUTED} rows={[
        ['Manual 100%', 'High cost, medium escapes', ROSE],
        ['Sampling', 'Low cost, high escapes', AMBER],
        ['Automated 100%', 'High capital, low marginal, zero escapes', TEAL]
      ]} />
    </Scene>
  )
}

export function M4AutomatedDataStreamScene() {
  const pts = []
  const contrastPts = []
  for (let i = 0; i < 20; i++) {
    let drift = i * 2
    let y = 140 - drift
    if (i > 14) y = 140 - ((i - 14) * 0.5)
    pts.push([60 + i * 15, y])
    
    let y2 = 140 - i * 3
    contrastPts.push([480 + i * 15, y2])
  }

  return (
    <Scene caption="The data stream from automated inspection reveals drift before tolerance is breached">
      <Card x="30" y="40" w="380" h="260" title="Automated: Data Stream" accent={TEAL}>
        <Axes x="60" y="250" w="320" h="180" yLabel="Dim" xLabel="Unit" />
        <Wire d="M60 80 L380 80" stroke={RED} width="1.5" dash="4 4" />
        <Wire d="M60 220 L380 220" stroke={RED} width="1.5" dash="4 4" />
        <Wire d="M60 100 L380 100" stroke={AMBER} width="1.5" dash="2 2" />
        <Wire d="M60 200 L380 200" stroke={AMBER} width="1.5" dash="2 2" />
        <Curve pts={pts} stroke={TEAL} className="aimm-traverse" />
        <Dot cx="270" cy="112" r="4" fill={AMBER} className="aimm-pulse" />
        <L x="270" y="90" size="11" fill={AMBER}>Control limit breached</L>
      </Card>

      <Card x="430" y="40" w="380" h="260" title="Manual: Sorting Only" accent={ROSE}>
        <Axes x="460" y="250" w="320" h="180" yLabel="Dim" xLabel="Unit" />
        <Wire d="M460 80 L780 80" stroke={RED} width="1.5" dash="4 4" />
        <Wire d="M460 220 L780 220" stroke={RED} width="1.5" dash="4 4" />
        <Curve pts={contrastPts} stroke={ROSE} className="aimm-traverse" />
        <Dot cx="735" cy="80" r="4" fill={RED} className="aimm-pulse" />
        <L x="680" y="65" size="11" fill={RED}>Defect detected</L>
        <L x="630" y="95" size="11" fill={MUTED}>Borderline parts shipped</L>
      </Card>

      <Panel x="250" y="320" w="400" title="Automated Benefits" accent={BLUE} rows={[
        ['Consistency', 'Independent of operator', MUTED],
        ['Speed', '100% inspection possible', MUTED],
        ['Data Capture', 'Process control via trend analysis', TEAL]
      ]} />
    </Scene>
  )
}

export function M4ThreeInspectionTimingsScene() {
  return (
    <Scene caption="Timing of inspection determines what can be corrected">
      <Wire d="M100 250 L800 250" stroke={MUTED} width="3" marker="url(#aimArr)" />
      
      <Block x="120" y="225" w="100" h="50" label="Machining" stroke={BLUE} />
      
      {/* On-line In-process */}
      <Block x="145" y="150" w="50" h="40" label="In-proc" stroke={TEAL} size="11" />
      <Wire d="M170 190 L170 225" stroke={TEAL} marker="url(#aimArrT)" />
      <Wire d="M170 150 L170 110 L280 110" stroke={TEAL} marker="url(#aimArrT)" />
      <L x="230" y="100" size="11" fill={TEAL}>Correct mid-cut</L>
      <Block x="130" y="320" w="80" h="30" label="At risk: 0" stroke={TEAL} />

      {/* On-line Post-process */}
      <Block x="300" y="225" w="60" h="50" label="Post-proc" stroke={AMBER} size="11" />
      <Wire d="M330 225 L330 180 L170 180 L170 225" stroke={AMBER} marker="url(#aimArrA)" />
      <L x="250" y="170" size="11" fill={AMBER}>Correct next part</L>
      <Block x="290" y="320" w="80" h="30" label="At risk: 1" stroke={AMBER} />

      {/* Off-line */}
      <Block x="650" y="225" w="80" h="50" label="Off-line" stroke={ROSE} size="11" />
      <Wire d="M690 225 L690 140 L170 140 L170 225" stroke={ROSE} dash="4 4" marker="url(#aimArrRo)" />
      <L x="500" y="130" size="11" fill={ROSE}>Delayed feedback (sort batch)</L>
      
      {/* Queue */}
      <Block x="450" y="235" w="30" h="30" fill={SKY} stroke={SKY} />
      <Block x="490" y="235" w="30" h="30" fill={SKY} stroke={SKY} />
      <Block x="530" y="235" w="30" h="30" fill={SKY} stroke={SKY} />
      <Block x="570" y="235" w="30" h="30" fill={SKY} stroke={SKY} />
      <L x="510" y="280" size="11" fill={MUTED}>Uninspected queue</L>

      <Block x="650" y="320" w="80" h="30" label="At risk: >10" stroke={ROSE} />

      <Panel x="250" y="390" w="400" title="Feedback Action" accent={BLUE} rows={[
        ['In-process', 'Compensates current part', TEAL],
        ['Post-process', 'Corrects subsequent parts', AMBER],
        ['Off-line', 'Sorts completed batch', ROSE]
      ]} />
    </Scene>
  )
}

export function M4ContactVersusNoncontactScene() {
  const compPts = [[0,50], [40, 20], [80, 25], [120, 60], [160, 40], [200, 50]]
  const ptCloud = []
  for(let i=0; i<40; i++) ptCloud.push(<Dot key={i} cx={480 + i*5} cy={230 - Math.sin(i/3)*20 + Math.random()*4} r="1.5" fill={TEAL} opacity="0.6" />)

  return (
    <Scene caption="Contact versus non-contact inspection methods">
      <Card x="50" y="20" w="380" h="220" title="Contact (Touch Probe)" accent={BLUE}>
        <g transform="translate(90, 80)">
          <Curve pts={compPts} stroke={MUTED} width="4" />
          {/* Probe */}
          <Wire d="M80 -40 L80 20" stroke={BLUE} width="4" />
          <Dot cx="80" cy="25" r="4" fill={ROSE} className="aimm-descend" />
          {/* Discrete points */}
          <Dot cx="40" cy="20" r="3" fill={BLUE} className="aimm-pulse" />
          <Dot cx="80" cy="25" r="3" fill={BLUE} className="aimm-pulse aimm-delay-1" />
          <Dot cx="120" cy="60" r="3" fill={BLUE} className="aimm-pulse aimm-delay-2" />
        </g>
        <Block x="140" y="160" w="100" h="40" label="Points: 5" stroke={BLUE} />
        <Block x="250" y="160" w="100" h="40" label="Time: 2.4s" stroke={BLUE} />
      </Card>

      <Card x="450" y="20" w="380" h="220" title="Non-contact (Laser Scanner)" accent={TEAL}>
        <g transform="translate(490, 80)">
          <Curve pts={compPts} stroke={MUTED} width="4" />
          {/* Laser sweep */}
          <Wire d="M100 -40 L60 20" stroke={TEAL} width="2" dash="4 4" className="aimm-shift" />
          <Wire d="M100 -40 L140 20" stroke={TEAL} width="2" dash="4 4" className="aimm-shift" />
          {/* Point cloud */}
          {ptCloud}
        </g>
        <Block x="540" y="160" w="100" h="40" label="Points: 4000" stroke={TEAL} />
        <Block x="650" y="160" w="100" h="40" label="Time: 0.1s" stroke={TEAL} />
      </Card>

      <Panel x="150" y="260" w="600" title="Method Suitability" accent={MUTED} rows={[
        ['Accuracy', 'Contact: Highest | Non-contact: Good', BLUE],
        ['Speed & Density', 'Contact: Low | Non-contact: High', TEAL],
        ['Soft/Hot parts', 'Contact: No | Non-contact: Yes', TEAL],
        ['Surface sensitivity', 'Contact: Insensitive | Non-contact: Sensitive', BLUE]
      ]} />
    </Scene>
  )
}

export function M4CMMConfigurationsScene() {
  return (
    <Scene caption="Coordinate measuring machine structures trade rigidity for access">
      <Card x="30" y="30" w="400" h="200" title="Bridge Type" accent={BLUE}>
        <rect x="150" y="140" width="100" height="20" fill={MUTED} />
        <rect x="140" y="80" width="10" height="60" fill={BLUE} />
        <rect x="250" y="80" width="10" height="60" fill={BLUE} />
        <rect x="140" y="70" width="120" height="10" fill={BLUE} />
        <rect x="195" y="70" width="10" height="50" fill={BLUE} className="aimm-descend" />
        <Dot cx="200" cy="120" r="3" fill={ROSE} className="aimm-descend" />
        <L x="300" y="100" size="12" fill={BLUE}>Common compromise</L>
      </Card>

      <Card x="450" y="30" w="400" h="200" title="Cantilever Type" accent={AMBER}>
        <rect x="120" y="140" width="100" height="20" fill={MUTED} />
        <rect x="110" y="70" width="20" height="90" fill={AMBER} />
        <rect x="110" y="70" width="90" height="15" fill={AMBER} />
        <rect x="180" y="70" width="10" height="50" fill={AMBER} className="aimm-descend" />
        <Dot cx="185" cy="120" r="3" fill={ROSE} className="aimm-descend" />
        <Wire d="M210 70 L210 90" stroke={RED} marker="url(#aimArrR)" />
        <L x="270" y="85" size="11" fill={RED}>Deflection limit</L>
        <L x="270" y="110" size="11" fill={AMBER}>Excellent access</L>
      </Card>

      <Card x="30" y="240" w="400" h="200" title="Gantry Type" accent={TEAL}>
        <rect x="100" y="170" width="200" height="20" fill={MUTED} />
        <rect x="90" y="80" width="20" height="110" fill={TEAL} />
        <rect x="290" y="80" width="20" height="110" fill={TEAL} />
        <rect x="90" y="60" width="220" height="20" fill={TEAL} />
        <rect x="190" y="60" width="20" height="70" fill={TEAL} className="aimm-traverse" />
        <rect x="150" y="130" width="100" height="40" fill={SKY} />
        <L x="330" y="120" size="12" fill={TEAL}>Very large parts</L>
      </Card>

      <Card x="450" y="240" w="400" h="200" title="Horizontal Arm" accent={PURP}>
        <rect x="100" y="160" width="150" height="20" fill={MUTED} />
        <rect x="80" y="80" width="20" height="100" fill={PURP} />
        <rect x="80" y="120" width="100" height="15" fill={PURP} className="aimm-shift" />
        <Dot cx="180" cy="127" r="3" fill={ROSE} className="aimm-shift" />
        <rect x="200" y="100" width="10" height="60" fill={SKY} />
        <L x="280" y="120" size="12" fill={PURP}>Car body panels</L>
      </Card>
    </Scene>
  )
}

export function M4CMMAlignmentScene() {
  return (
    <Scene caption="Alignment establishes the part coordinate system; calibration measures the probe">
      <Card x="40" y="40" w="400" h="440" title="1. Alignment & Calibration" accent={BLUE}>
        <rect x="60" y="350" width="280" height="20" fill={MUTED} />
        <Axes x="80" y="340" w="80" h="80" xLabel="Machine X" yLabel="Machine Y" />
        
        <g transform="translate(200, 250) rotate(-15)">
          <rect x="0" y="0" width="100" height="60" fill={SKY} stroke={BLUE} strokeWidth="2" />
          <Axes x="0" y="60" w="60" h="60" xLabel="Part X" yLabel="Part Y" />
          <Dot cx="20" cy="20" r="3" fill={ROSE} className="aimm-pulse" />
          <Dot cx="80" cy="20" r="3" fill={ROSE} className="aimm-pulse aimm-delay-1" />
          <Dot cx="50" cy="40" r="3" fill={ROSE} className="aimm-pulse aimm-delay-2" />
        </g>
        <L x="200" y="140" size="12" fill={BLUE}>Datum Alignment: probed features fix part origin</L>

        <Dot cx="310" cy="320" r="15" fill={CREAM} stroke={MUTED} />
        <Dot cx="310" cy="305" r="3" fill={ROSE} />
        <Dot cx="295" cy="320" r="3" fill={ROSE} />
        <Dot cx="325" cy="320" r="3" fill={ROSE} />
        <L x="310" y="280" size="11" fill={MUTED}>Calibrate</L>
      </Card>

      <Card x="460" y="40" w="400" h="440" title="2. Program Execution" accent={TEAL}>
        <rect x="60" y="350" width="280" height="20" fill={MUTED} />
        
        <g transform="translate(160, 250) rotate(10)">
          <rect x="0" y="0" width="100" height="60" fill={SKY} stroke={TEAL} strokeWidth="2" />
          <Axes x="0" y="60" w="60" h="60" xLabel="Part X" yLabel="Part Y" />
          <Wire d="M20 20 L80 20 L50 40 Z" stroke={TEAL} dash="2 2" className="aimm-traverse" />
          <Dot cx="20" cy="20" r="3" fill={TEAL} />
          <Dot cx="80" cy="20" r="3" fill={TEAL} />
          <Dot cx="50" cy="40" r="3" fill={TEAL} />
        </g>
        <L x="200" y="160" size="12" fill={TEAL}>Same program runs correctly on new orientation</L>
        <Block x="100" y="200" w="200" h="50" label="Execute Program" stroke={TEAL} />
      </Card>
    </Scene>
  )
}

export function M4CMMSoftwareFittingScene() {
  const circPts = []
  for (let i = 0; i < 8; i++) {
    let angle = (i * Math.PI) / 4
    circPts.push(<Dot key={`c${i}`} cx={150 + Math.cos(angle)*40} cy={150 + Math.sin(angle)*40 + (Math.random()*4 - 2)} r="3" fill={BLUE} />)
  }

  const flatPts = []
  for (let i = 0; i < 6; i++) {
    flatPts.push(<Dot key={`f${i}`} cx={150 + i*20 - 50} cy={150 + (Math.random()*6 - 3)} r="3" fill={TEAL} />)
  }

  return (
    <Scene caption="Software fits geometric elements to point coordinates to evaluate tolerances">
      <Card x="40" y="40" w="280" h="240" title="Circle Fit" accent={BLUE}>
        <circle cx="150" cy="150" r="40" fill="none" stroke={BLUE} strokeWidth="2" className="aimm-pulse" />
        {circPts}
        <Dot cx="150" cy="150" r="3" fill={ROSE} />
        <L x="150" y="100" size="11" fill={BLUE}>Computed centre & dia</L>
        <L x="150" y="210" size="11" fill={MUTED}>Residuals = Roundness</L>
      </Card>

      <Card x="340" y="40" w="280" h="240" title="Plane Fit" accent={TEAL}>
        <Wire d="M100 150 L220 150" stroke={TEAL} width="2" className="aimm-pulse" />
        {flatPts}
        <L x="160" y="120" size="11" fill={TEAL}>Best fit plane</L>
        <L x="160" y="190" size="11" fill={MUTED}>Residuals = Flatness</L>
      </Card>

      <Panel x="640" y="40" w="240" title="Manual Limits" accent={ROSE} rows={[
        ['Diameter', 'Easy', MUTED],
        ['Flatness', 'Hard', AMBER],
        ['Cylindricity', 'Unobtainable', ROSE],
        ['True Position', 'Unobtainable', ROSE]
      ]} />

      <Card x="200" y="300" w="500" h="180" title="Position Tolerance Evaluation" accent={PURP}>
        <Axes x="100" y="140" w="200" h="100" xLabel="Datum A" yLabel="Datum B" />
        <Dot cx="200" cy="80" r="4" fill={PURP} />
        <Wire d="M100 80 L200 80" stroke={PURP} dash="2 2" />
        <Wire d="M200 140 L200 80" stroke={PURP} dash="2 2" />
        <L x="250" y="70" size="12" fill={PURP}>Fitted centre vs Datums</L>
      </Card>
    </Scene>
  )
}

export function M4FlexibleInspectionCellScene() {
  return (
    <Scene caption="A flexible inspection system handles mixed batches without manual changeover">
      <Block x="300" y="50" w="200" h="180" label="CMM" stroke={BLUE} size="16" />
      <rect x="360" y="100" width="80" height="80" fill={SKY} />
      
      <Card x="550" y="50" w="200" h="150" title="Program Library" accent={TEAL}>
        <Block x="20" y="40" w="160" h="25" label="Prog A (Active)" stroke={TEAL} className="aimm-pulse" />
        <Block x="20" y="75" w="160" h="25" label="Prog B" stroke={MUTED} />
        <Block x="20" y="110" w="160" h="25" label="Prog C" stroke={MUTED} />
      </Card>

      <Wire d="M100 280 L800 280" stroke={MUTED} width="6" />
      <Wire d="M100 320 L800 320" stroke={MUTED} width="6" />
      <L x="450" y="340" size="12" fill={MUTED}>Pallet Conveyor</L>

      <Block x="200" y="240" w="60" h="35" label="RFID" stroke={AMBER} />
      <Wire d="M230 275 L230 290" stroke={AMBER} dash="2 2" className="aimm-pulse" />

      <rect x="250" y="285" width="30" height="30" fill={TEAL} className="aimm-shift" />
      <circle cx="350" cy="300" r="15" fill={ROSE} className="aimm-shift" />
      <polygon points="450,285 480,285 465,315" fill={PURP} className="aimm-shift" />

      <Wire d="M400 230 L400 280" stroke={BLUE} width="4" marker="url(#aimArrB)" className="aimm-traverse" />
      <L x="410" y="250" size="11" fill={BLUE}>Auto Load</L>

      <Panel x="150" y="380" w="600" title="Throughput Comparison" accent={MUTED} rows={[
        ['Manual CMM', 'Wait for setup -> Find fixture -> Load program', ROSE],
        ['Flexible Cell', 'Auto ID -> Retrieve program -> Measure -> Return', TEAL]
      ]} />
    </Scene>
  )
}

export function M4MachineProbeUsesScene() {
  return (
    <Scene caption="Spindle probes turn the machine tool into a measuring instrument">
      <Card x="20" y="20" w="270" h="220" title="1. Part Location" accent={BLUE}>
        <rect x="80" y="80" width="100" height="60" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <Wire d="M130 40 L130 80" stroke={BLUE} width="2" className="aimm-descend" />
        <Dot cx="130" cy="80" r="3" fill={ROSE} className="aimm-pulse" />
        <Axes x="60" y="170" w="50" h="50" xLabel="Prog" yLabel="" />
        <Axes x="70" y="160" w="50" h="50" xLabel="Actual" yLabel="" />
        <L x="135" y="190" size="11" fill={BLUE}>Datum offset updates</L>
      </Card>

      <Card x="310" y="20" w="270" h="220" title="2. Tool Setting" accent={TEAL}>
        <rect x="110" y="140" width="30" height="40" fill={MUTED} />
        <Dot cx="125" cy="140" r="3" fill={ROSE} />
        <Wire d="M125 70 L125 140" stroke={TEAL} width="4" className="aimm-descend" />
        <L x="125" y="60" size="11" fill={TEAL}>Tool</L>
        <Block x="20" y="180" w="230" h="25" label="Offset Table: len=120.4" stroke={TEAL} />
      </Card>

      <Card x="600" y="20" w="270" h="220" title="3. In-cycle Gauging" accent={PURP}>
        <circle cx="135" cy="130" r="40" fill="none" stroke={PURP} strokeWidth="6" />
        <circle cx="135" cy="130" r="42" fill="none" stroke={MUTED} strokeWidth="2" dash="4 4" />
        <Wire d="M135 70 L135 90" stroke={PURP} width="2" className="aimm-descend" />
        <Dot cx="135" cy="90" r="3" fill={ROSE} />
        <L x="135" y="190" size="11" fill={PURP}>Measure rough bore</L>
        <L x="135" y="205" size="11" fill={PURP}>Adjust finish pass</L>
      </Card>

      <Card x="150" y="270" w="600" h="120" title="Caution" accent={RED} footTone={RED} foot="A machine geometry error affects both the cut and the measurement equally">
        <L x="300" y="70" size="14" fill={RED} weight="700">Measurement is made on the same machine that made the cut</L>
      </Card>
    </Scene>
  )
}

export function M4VisionLightingScene() {
  return (
    <Scene caption="Lighting determines whether features appear as clear differences in brightness">
      <Card x="20" y="40" w="200" h="380" title="Front Lighting" accent={BLUE}>
        <rect x="60" y="60" width="80" height="80" fill={MUTED} rx="10" />
        <rect x="110" y="100" width="40" height="40" fill={N} rx="10" />
        <L x="100" y="170" size="11" fill={BLUE}>Surface detail visible</L>
        <L x="100" y="185" size="11" fill={ROSE}>Shadows confuse outline</L>
        
        <Axes x="40" y="300" w="120" h="60" xLabel="Bright" yLabel="Pixels" />
        <Curve pts={[[40, 290], [80, 250], [100, 270], [140, 260], [160, 295]]} stroke={BLUE} />
        <L x="100" y="325" size="10" fill={BLUE}>Smeared histogram</L>
      </Card>

      <Card x="240" y="40" w="200" h="380" title="Back Lighting" accent={TEAL}>
        <rect x="60" y="60" width="80" height="80" fill={N} rx="10" />
        <L x="100" y="170" size="11" fill={TEAL}>Clean silhouette</L>
        <L x="100" y="185" size="11" fill={TEAL}>Outline unambiguous</L>
        
        <Axes x="40" y="300" w="120" h="60" xLabel="Bright" yLabel="Pixels" />
        <Curve pts={[[40, 295], [60, 240], [80, 295], [120, 295], [140, 240], [160, 295]]} stroke={TEAL} />
        <Wire d="M100 230 L100 300" stroke={RED} dash="2 2" />
        <L x="100" y="325" size="10" fill={TEAL}>Two clean peaks (Easy)</L>
      </Card>

      <Card x="460" y="40" w="200" h="380" title="Structured Light" accent={PURP}>
        <rect x="60" y="60" width="80" height="80" fill={MUTED} rx="10" />
        <Wire d="M60 80 Q100 100 140 80" stroke={CREAM} width="2" />
        <Wire d="M60 100 Q100 120 140 100" stroke={CREAM} width="2" />
        <Wire d="M60 120 Q100 140 140 120" stroke={CREAM} width="2" />
        <L x="100" y="170" size="11" fill={PURP}>Stripes bend over surface</L>
        <L x="100" y="185" size="11" fill={PURP}>Reveals 3D shape</L>
        
        <Axes x="40" y="300" w="120" h="60" />
        <Curve pts={[[40, 295], [80, 250], [100, 295]]} stroke={PURP} />
      </Card>

      <Card x="680" y="40" w="200" h="380" title="Strobe Lighting" accent={AMBER}>
        <rect x="30" y="60" width="80" height="80" fill={SKY} rx="10" />
        <rect x="40" y="60" width="80" height="80" fill={SKY} rx="10" />
        <rect x="50" y="60" width="80" height="80" fill={BLUE} rx="10" />
        <L x="100" y="170" size="11" fill={AMBER}>Freezes motion</L>
        <L x="100" y="185" size="11" fill={AMBER}>Removes blur</L>
        
        <Axes x="40" y="300" w="120" h="60" />
        <Curve pts={[[40, 295], [80, 250], [140, 295]]} stroke={AMBER} />
      </Card>
    </Scene>
  )
}

export function M4VisionPipelineScene() {
  return (
    <Scene caption="Machine vision extracts features from pixels to interpret a scene">
      <Wire d="M120 180 L780 180" stroke={MUTED} width="4" />

      <Block x="40" y="150" w="120" h="60" label="Threshold" stroke={BLUE} />
      <Axes x="60" y="130" w="80" h="40" />
      <Curve pts={[[60, 125], [80, 95], [100, 125], [120, 100], [140, 125]]} stroke={MUTED} />
      <Wire d="M100 90 L100 130" stroke={RED} dash="2 2" />
      <L x="100" y="80" size="10" fill={BLUE}>Binarise</L>
      
      <Block x="220" y="150" w="120" h="60" label="Segmentation" stroke={TEAL} />
      <rect x="240" y="80" width="80" height="50" fill={CREAM} stroke={MUTED} />
      <circle cx="260" cy="105" r="10" fill={TEAL} />
      <rect x="290" y="95" width="20" height="20" fill={PURP} />
      <L x="280" y="70" size="10" fill={TEAL}>Group connected pixels</L>

      <Block x="400" y="150" w="120" h="60" label="Feature Extract" stroke={PURP} />
      <Card x="390" y="40" w="140" h="90" title="Features" accent={PURP} linesY="40" lineH="15" lines={[
        'Area: 314',
        'Perimeter: 62',
        'Centroid: 24,18',
        'Holes: 0'
      ]} />

      <Block x="580" y="150" w="120" h="60" label="Interpretation" stroke={AMBER} />
      <Card x="570" y="40" w="140" h="90" title="Verdict" accent={AMBER} linesY="45" lineH="20" lines={[
        'Region 1: Correct',
        'Region 2: Reject'
      ]} />

      <Card x="250" y="300" w="400" h="150" title="Failure Case: Poor Lighting" accent={ROSE}>
        <rect x="50" y="50" width="80" height="80" fill={CREAM} stroke={MUTED} />
        <circle cx="90" cy="90" r="20" fill={N} />
        <rect x="90" y="70" width="40" height="40" fill={N} />
        <L x="250" y="80" size="12" fill={ROSE}>Threshold merges object with shadow</L>
        <L x="250" y="100" size="12" fill={ROSE}>Extracted area is completely wrong</L>
      </Card>
    </Scene>
  )
}


export function M4OpticalMethodsScene() {
  return (
    <Scene caption="Optical methods measure dimensions and shape without contact">
      <Card x="30" y="30" w="400" h="200" title="Scanning Laser" accent={BLUE}>
        <rect x="150" y="100" width="100" height="40" fill={MUTED} />
        <Wire d="M150 70 L250 70" stroke={RED} width="2" className="aimm-descend" />
        <rect x="150" y="160" width="100" height="10" fill={N} />
        <L x="120" y="70" size="11" fill={RED}>Laser sweep</L>
        <L x="120" y="170" size="11" fill={MUTED}>Detector</L>
        <L x="300" y="125" size="11" fill={BLUE}>Diameter from shadow time</L>
      </Card>

      <Card x="450" y="30" w="400" h="200" title="Laser Triangulation" accent={TEAL}>
        <rect x="100" y="140" width="200" height="20" fill={MUTED} />
        <Wire d="M150 70 L150 140" stroke={RED} width="2" />
        <Wire d="M150 140 L250 70" stroke={RED} width="2" dash="2 2" />
        <rect x="240" y="60" width="20" height="10" fill={N} transform="rotate(-35, 250, 70)" />
        <Dot cx="150" cy="140" r="3" fill={ROSE} />
        <Wire d="M150 130 L230 74" stroke={RED} dash="4 4" className="aimm-pulse" />
        <L x="150" y="60" size="11" fill={TEAL}>Laser</L>
        <L x="300" y="48" size="11" fill={TEAL}>Sensor measures shift</L>
      </Card>

      <Card x="30" y="240" w="400" h="200" title="Photogrammetry" accent={PURP}>
        <rect x="150" y="140" width="100" height="20" fill={MUTED} />
        <Dot cx="200" cy="140" r="3" fill={ROSE} />
        <rect x="80" y="70" width="30" height="20" fill={N} />
        <rect x="290" y="70" width="30" height="20" fill={N} />
        <Wire d="M95 80 L200 140" stroke={PURP} width="2" />
        <Wire d="M305 80 L200 140" stroke={PURP} width="2" />
        <L x="200" y="60" size="11" fill={PURP}>Cameras compute intersection</L>
      </Card>

      <Card x="450" y="240" w="400" h="200" title="Optical Comparator" accent={AMBER}>
        <rect x="120" y="60" width="160" height="120" fill={CREAM} stroke={MUTED} />
        <path d="M160 100 L200 100 L200 140 L240 140 L240 180 L160 180 Z" fill={N} />
        <path d="M155 95 L205 95 L205 135 L245 135 L245 185 L155 185 Z" fill="none" stroke={AMBER} width="2" dash="4 4" />
        <L x="280" y="100" size="11" fill={AMBER}>Overlay for comparison</L>
      </Card>
    </Scene>
  )
}

export function M4NonOpticalMethodsScene() {
  return (
    <Scene caption="Non-optical methods use sound, radiation, or fields to see beneath the surface">
      <Card x="30" y="30" w="400" h="200" title="Optical (Surface Only)" accent={MUTED}>
        <rect x="100" y="80" width="200" height="80" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <Wire d="M200 100 L200 140 L220 140 L220 100 Z" stroke={CREAM} width="1" dash="2 2" />
        <Wire d="M200 50 L200 80" stroke={AMBER} marker="url(#aimArrA)" />
        <L x="300" y="120" size="14" fill={RED} weight="700">Void undetected</L>
      </Card>

      <Card x="450" y="30" w="400" h="200" title="Ultrasonic Testing" accent={BLUE}>
        <rect x="50" y="60" width="100" height="100" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <circle cx="100" cy="110" r="10" fill={WHITE} />
        <rect x="85" y="40" width="30" height="20" fill={N} />
        <Wire d="M100 60 L100 100" stroke={BLUE} width="2" className="aimm-traverse" />
        
        <Axes x="180" y="140" w="180" h="80" xLabel="Time" yLabel="Amp" />
        <Curve pts={[[180, 140], [190, 60], [200, 140], [240, 140], [250, 100], [260, 140], [330, 140], [340, 80], [350, 140]]} stroke={BLUE} />
        <L x="250" y="90" size="11" fill={BLUE}>Flaw echo</L>
      </Card>

      <Card x="30" y="240" w="400" h="200" title="X-Ray (Radiography)" accent={PURP}>
        <rect x="150" y="80" width="100" height="80" fill={MUTED} />
        <circle cx="200" cy="120" r="15" fill={CREAM} />
        <Wire d="M200 50 L200 80" stroke={PURP} width="2" dash="4 4" className="aimm-descend" />
        <Wire d="M170 50 L170 80" stroke={PURP} width="2" dash="4 4" className="aimm-descend" />
        <Wire d="M230 50 L230 80" stroke={PURP} width="2" dash="4 4" className="aimm-descend" />
        <L x="300" y="120" size="11" fill={PURP}>Void shows lighter</L>
      </Card>

      <Card x="450" y="240" w="400" h="200" title="Eddy Current" accent={TEAL}>
        <rect x="100" y="120" width="200" height="60" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <Wire d="M200 120 L200 150" stroke={BLUE} width="2" />
        <Ind x="150" y="100" len="40" tone={N} />
        <circle cx="150" cy="140" r="15" fill="none" stroke={TEAL} dash="4 4" className="aimm-pulse" />
        <circle cx="200" cy="140" r="15" fill="none" stroke={RED} dash="4 4" className="aimm-pulse" />
        <L x="270" y="100" size="11" fill={RED}>Crack disturbs current</L>
      </Card>
    </Scene>
  )
}

export function M4ShopFloorControlLoopScene() {
  return (
    <Scene caption="Shop floor control relies on accurate data collection to close the loop">
      <Card x="40" y="40" w="400" h="380" title="Closed Loop (Working)" accent={BLUE}>
        <Block x="140" y="60" w="120" h="50" label="Order Release" stroke={BLUE} />
        <Block x="240" y="180" w="120" h="50" label="Order Scheduling" stroke={BLUE} />
        <Block x="40" y="180" w="120" h="50" label="Order Progress" stroke={BLUE} />
        
        <Wire d="M200 110 L280 180" stroke={BLUE} marker="url(#aimArrB)" className="aimm-traverse" />
        <Wire d="M240 205 L160 205" stroke={BLUE} marker="url(#aimArrB)" className="aimm-traverse" />
        <Wire d="M80 180 L160 110" stroke={BLUE} marker="url(#aimArrB)" className="aimm-traverse" />
        
        <L x="300" y="140" size="10" fill={BLUE}>Shop packets</L>
        <L x="200" y="225" size="10" fill={BLUE}>Dispatch lists (Priority)</L>
        <L x="80" y="140" size="10" fill={BLUE}>Completions & Data</L>

        <L x="200" y="300" size="12" fill={TEAL} weight="700">Priorities update accurately</L>
      </Card>

      <Card x="460" y="40" w="400" h="380" title="Broken Loop (Data Cut)" accent={RED}>
        <Block x="140" y="60" w="120" h="50" label="Order Release" stroke={RED} />
        <Block x="240" y="180" w="120" h="50" label="Order Scheduling" stroke={RED} />
        <Block x="40" y="180" w="120" h="50" label="Order Progress" stroke={RED} />
        
        <Wire d="M200 110 L280 180" stroke={RED} marker="url(#aimArrR)" />
        <Wire d="M240 205 L160 205" stroke={RED} marker="url(#aimArrR)" />
        <Wire d="M120 140 L160 110" stroke={MUTED} dash="4 4" />
        <L x="100" y="160" size="16" fill={RED} weight="800">X</L>
        
        <L x="300" y="140" size="10" fill={RED}>Blind packets</L>
        <L x="200" y="225" size="10" fill={RED}>Original plan list</L>
        <L x="100" y="130" size="10" fill={RED}>No feedback</L>
        
        <Block x="100" y="280" w="200" h="60" label="Plan vs Reality Divergence" stroke={RED} fill={CREAM} />
        <Wire d="M120 320 L280 290" stroke={RED} width="3" marker="url(#aimArrR)" />
      </Card>
    </Scene>
  )
}

export function M4IdentificationTechnologiesScene() {
  return (
    <Scene caption="Automatic identification removes manual keying and its errors">
      <Card x="30" y="30" w="270" h="220" title="Bar Code" accent={BLUE}>
        <rect x="80" y="80" width="110" height="50" fill={WHITE} stroke={MUTED} />
        <rect x="90" y="90" width="5" height="30" fill={N} />
        <rect x="100" y="90" width="2" height="30" fill={N} />
        <rect x="110" y="90" width="8" height="30" fill={N} />
        <rect x="125" y="90" width="5" height="30" fill={N} />
        <rect x="140" y="90" width="3" height="30" fill={N} />
        <rect x="150" y="90" width="10" height="30" fill={N} />
        <rect x="170" y="90" width="4" height="30" fill={N} />
        <Wire d="M135 60 L135 150" stroke={RED} width="2" className="aimm-shift" />
        <L x="135" y="170" size="11" fill={BLUE}>Data: "PART123" (Short)</L>
        <L x="135" y="190" size="11" fill={ROSE}>Requires Line of Sight</L>
      </Card>

      <Card x="310" y="30" w="270" h="220" title="RFID" accent={PURP}>
        <rect x="60" y="80" width="150" height="60" fill={SKY} stroke={BLUE} strokeWidth="2" dash="4 4" />
        <L x="135" y="100" size="11" fill={MUTED}>Opaque container</L>
        <rect x="120" y="110" width="30" height="20" fill={CREAM} stroke={PURP} />
        <circle cx="135" cy="120" r="3" fill={PURP} />
        <Wire d="M80 120 Q100 100 120 120" stroke={PURP} width="2" className="aimm-wave" />
        <Wire d="M150 120 Q170 140 190 120" stroke={PURP} width="2" className="aimm-wave" />
        <L x="135" y="170" size="11" fill={PURP}>Data: "HIST: OP1 OP2"</L>
        <L x="135" y="190" size="11" fill={TEAL}>No LOS, Rewritable</L>
      </Card>

      <Card x="600" y="30" w="270" h="220" title="2D Code (QR)" accent={TEAL}>
        <rect x="110" y="70" width="50" height="50" fill={WHITE} stroke={MUTED} />
        <rect x="115" y="75" width="10" height="10" fill={N} />
        <rect x="145" y="75" width="10" height="10" fill={N} />
        <rect x="115" y="105" width="10" height="10" fill={N} />
        <rect x="130" y="90" width="5" height="5" fill={N} />
        <rect x="140" y="100" width="5" height="5" fill={ROSE} className="aimm-pulse" />
        <L x="135" y="150" size="11" fill={TEAL}>Data: "LOT456, 2026-10, Insp:OK"</L>
        <L x="135" y="170" size="11" fill={TEAL}>High capacity</L>
        <L x="135" y="190" size="11" fill={TEAL}>Error correction survives damage</L>
      </Card>

      <Panel x="150" y="270" w="600" title="Comparison" accent={MUTED} rows={[
        ['Bar Code', 'Low cost | Low capacity | LOS required | Read-only', BLUE],
        ['RFID', 'High cost | Medium capacity | No LOS | Rewritable', PURP],
        ['2D Code', 'Low cost | High capacity | LOS required | Read-only', TEAL]
      ]} />
    </Scene>
  )
}

/* ── Module 5 ────────────────────────────────────────────────────────── */

export function M5LayerByLayerBuildPrincipleScene() {
  return (
    <Scene caption="Additive manufacturing builds without part-specific tooling, making geometric complexity free">
      {/* 3D Model Slicing on the left */}
      <g className="aimm-insert">
        <Block x="80" y="40" w="180" h="40" label="Digital Model" stroke={BLUE} fill={SKY} />
        <Wire d="M170 80 L170 120" stroke={MUTED} marker="url(#aimArrM)" />
        <L x="180" y="105" size={12} fill={MUTED} anchor="start">Sliced into cross-sections</L>
        {/* Fanned out slices */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} className={`aimm-shift aimm-delay-${i}`}>
            <path d={`M80 ${130 + i * 25} L180 ${140 + i * 25} L260 ${130 + i * 25} L160 ${120 + i * 25} Z`} fill="none" stroke={BLUE} strokeWidth="1.5" />
          </g>
        ))}
        <L x="170" y="270" size={13} fill={BLUE} weight={700}>2D Outlines</L>
      </g>

      {/* Building on the right */}
      <g className="aimm-insert aimm-delay-1">
        <Wire d="M280 180 L360 180" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        <L x="320" y="170" size={12} fill={BLUE} anchor="middle">Layer deposition</L>
        
        {/* Stacked layers */}
        {[4, 3, 2, 1, 0].map((i) => (
          <g key={`stack-${i}`} className={`aimm-descend aimm-delay-${i}`}>
            <path d={`M400 ${170 - i * 15} L500 ${180 - i * 15} L580 ${170 - i * 15} L480 ${160 - i * 15} Z`} fill={SKY} stroke={BLUE} strokeWidth="1.5" opacity="0.8" />
          </g>
        ))}
        <rect x="380" y="210" width="220" height="15" rx="3" fill={MUTED} />
        <Wire d="M490 230 L490 260" stroke={MUTED} width="3" marker="url(#aimArrM)" />
        <L x="500" y="250" size={12} fill={MUTED} anchor="start">Platform lowers</L>
      </g>

      {/* Tooling comparison strip */}
      <g className="aimm-insert aimm-delay-2">
        <rect x="40" y="320" width="820" height="70" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="100" y="360" size={14} fill={N} weight={800}>TOOLING:</L>
        
        <Block x="180" y="335" w="120" h="40" label="Casting" sub="Requires Mould" stroke={MUTED} labelFill={N} />
        <Block x="320" y="335" w="120" h="40" label="Forming" sub="Requires Die" stroke={MUTED} labelFill={N} />
        <Block x="460" y="335" w="120" h="40" label="Machining" sub="Requires Fixture" stroke={MUTED} labelFill={N} />
        <Block x="600" y="335" w="120" h="40" label="Additive" sub="Zero Tooling" stroke={GREEN} fill={CREAM} labelFill={GREEN} />
      </g>

      {/* Complexity indicator */}
      <g className="aimm-insert aimm-delay-3">
        <rect x="40" y="400" width="820" height="90" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="100" y="430" size={13} fill={N} weight={700}>Equal Volume:</L>
        
        <Block x="180" y="415" w="90" h="60" label="Simple Cube" stroke={MUTED} />
        <Block x="290" y="415" w="90" h="60" label="Lattice" stroke={BLUE} />
        
        <Wire d="M400 445 L460 445" stroke={MUTED} marker="url(#aimArrM)" />
        
        <L x="600" y="440" size={14} fill={GREEN} weight={800}>SAME BUILD TIME</L>
        <L x="600" y="460" size={12} fill={N}>Build time depends on volume, not complexity</L>
      </g>
    </Scene>
  )
}

export function M5EightStepProcessChainScene() {
  return (
    <Scene caption="The generic additive manufacturing process chain">
      <L x="450" y="40" size={16} fill={BLUE} weight={800}>EIGHT-STEP PROCESS CHAIN</L>

      {/* Top row: 1 to 4 */}
      <g className="aimm-insert">
        <Block x="50" y="80" w="160" h="70" label="1. CAD Model" sub="Create 3D design" stroke={BLUE} />
        <Wire d="M210 115 L240 115" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        
        <Block x="240" y="80" w="160" h="70" label="2. Conversion" sub="Export to STL/AMF" stroke={BLUE} />
        <Wire d="M400 115 L430 115" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        
        <Block x="430" y="80" w="160" h="70" label="3. Transfer" sub="Position &amp; Orient" stroke={BLUE} />
        <Wire d="M590 115 L620 115" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        
        <Block x="620" y="80" w="160" h="70" label="4. Setup" sub="Build parameters" stroke={BLUE} />
        <Wire d="M700 150 L700 180 L130 180 L130 210" stroke={BLUE} width="2" marker="url(#aimArrB)" />
      </g>

      {/* Bottom row: 5 to 8 */}
      <g className="aimm-insert aimm-delay-1">
        <Block x="50" y="210" w="160" h="70" label="5. Build" sub="Automated layerwise" stroke={GREEN} fill={CREAM} />
        <Wire d="M210 245 L240 245" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        
        <Block x="240" y="210" w="160" h="70" label="6. Removal" sub="Take from machine" stroke={BLUE} />
        <Wire d="M400 245 L430 245" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        
        <Block x="430" y="210" w="160" h="70" label="7. Post-Process" sub="Support removal/finish" stroke={BLUE} />
        <Wire d="M590 245 L620 245" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        
        <Block x="620" y="210" w="160" h="70" label="8. Application" sub="Part in use" stroke={BLUE} />
      </g>

      {/* Human attention bar */}
      <g className="aimm-insert aimm-delay-2">
        <rect x="50" y="340" width="730" height="120" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="415" y="370" size={14} fill={N} weight={700}>HUMAN ATTENTION REQUIRED</L>
        
        <Axes x="70" y="440" w="690" h="60" origin="left" />
        <Curve pts={[[70, 390], [130, 390], [210, 410], [430, 420], [620, 420], [700, 440]]} stroke={AMBER} width="3" />
        
        {/* Area under curve for attention */}
        <path d="M70 440 L70 390 L130 390 L210 410 L240 435 L260 440 L50 440 Z" fill={AMBER} opacity="0.2" className="aimm-pulse" />
        <path d="M240 440 L260 410 L300 390 L400 390 L430 420 L450 440 Z" fill={AMBER} opacity="0.2" className="aimm-pulse" transform="translate(190, 0)" />
        
        <L x="130" y="460" size={12} fill={AMBER} weight={800}>HIGH</L>
        <L x="320" y="460" size={12} fill={GREEN} weight={800}>NEAR ZERO</L>
        <L x="510" y="460" size={12} fill={AMBER} weight={800}>HIGH</L>
      </g>
    </Scene>
  )
}

export function M5AdditiveSubtractiveComparisonScene() {
  return (
    <Scene caption="Machining is limited by access, additive by volume">
      {/* Top half: Access limits */}
      <L x="450" y="35" size={15} fill={BLUE} weight={800}>COMPLEXITY AND TOOL ACCESS</L>
      
      <Card x="60" y="50" w="360" h="160" title="Subtractive (Machining)" accent={RED}>
        <g transform="translate(0, 40)">
          <path d="M60 20 L60 100 L120 100 L120 70 L140 70 L140 100 L200 100 L200 20 Z" fill={WHITE} stroke={N} strokeWidth="2" />
          {/* Tool trying to reach cavity */}
          <path d="M130 -20 L130 30" stroke={MUTED} strokeWidth="4" />
          <path d="M125 30 L135 30 L130 40 Z" fill={RED} />
          <L x="260" y="40" size={12} fill={RED} weight={700}>Tool cannot reach</L>
          <L x="260" y="55" size={12} fill={RED} weight={700}>internal lattice.</L>
          <L x="260" y="70" size={12} fill={N}>Part must be split.</L>
        </g>
      </Card>

      <Card x="480" y="50" w="360" h="160" title="Additive Manufacturing" accent={GREEN}>
        <g transform="translate(0, 40)">
          {/* Same part, built in layers */}
          {[0, 1, 2, 3].map(i => (
            <rect key={i} x="60" y={80 - i*20} width="140" height="20" fill={SKY} stroke={BLUE} strokeWidth="1" opacity="0.6" />
          ))}
          <path d="M120 70 L140 70 L140 100 L120 100 Z" fill={WHITE} stroke={N} />
          <L x="260" y="40" size={12} fill={GREEN} weight={700}>Built in one piece.</L>
          <L x="260" y="55" size={12} fill={N}>Internal features</L>
          <L x="260" y="70" size={12} fill={N}>present no access limit.</L>
        </g>
      </Card>

      {/* Bottom half: Volume and properties */}
      <L x="450" y="245" size={15} fill={BLUE} weight={800}>VOLUME AND PROPERTIES</L>
      
      <g className="aimm-insert aimm-delay-1">
        <rect x="60" y="260" width="360" height="180" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="240" y="290" size={14} fill={N} weight={700}>Large Plain Shaft</L>
        <rect x="90" y="310" width="300" height="40" fill={CREAM} stroke={N} strokeWidth="2" />
        
        <L x="130" y="380" size={12} fill={N}>Machined:</L>
        <rect x="200" y="370" width="40" height="15" fill={GREEN} />
        <L x="250" y="380" size={12} fill={GREEN} anchor="start" weight={700}>Minutes (Low Cost)</L>
        
        <L x="130" y="410" size={12} fill={N}>Additive:</L>
        <rect x="200" y="400" width="120" height="15" fill={RED} />
        <L x="330" y="410" size={12} fill={RED} anchor="start" weight={700}>Hours (High Cost)</L>
      </g>

      <g className="aimm-insert aimm-delay-2">
        <Panel x="480" y="260" w="360" title="Property Comparison" rowH="26" accent={BLUE} rows={[
          ['Surface Finish', 'Machining far superior', RED],
          ['Dimensional Accuracy', 'Machining far superior', RED],
          ['Material Range', 'Machining wider range', RED],
          ['Geometric Complexity', 'Additive far superior', GREEN],
          ['Large Volumes', 'Machining faster', RED]
        ]} />
      </g>
    </Scene>
  )
}

export function M5TessellationAndChordHeightScene() {
  return (
    <Scene caption="Tessellation trades chord height against file size, and the resulting mesh can contain errors">
      {/* Left half: Tessellation refinement */}
      <L x="250" y="40" size={15} fill={BLUE} weight={800}>TESSELLATION &amp; CHORD HEIGHT</L>
      
      <g className="aimm-insert">
        {/* Coarse */}
        <Curve pts={[[60, 100], [100, 70], [160, 70], [200, 100]]} stroke={MUTED} width="2" />
        <Wire d="M60 100 L130 75 L200 100" stroke={BLUE} width="2" />
        <Wire d="M130 65 L130 75" stroke={RED} width="2" />
        <L x="130" y="55" size={11} fill={RED}>Large error</L>
        <L x="130" y="125" size={12} fill={N} weight={700}>Coarse Mesh</L>
        <L x="130" y="145" size={11} fill={MUTED}>Visible faceting</L>
        <L x="130" y="160" size={11} fill={GREEN}>Small file size</L>
      </g>

      <g className="aimm-insert aimm-delay-1">
        {/* Medium */}
        <Curve pts={[[220, 100], [260, 70], [320, 70], [360, 100]]} stroke={MUTED} width="2" />
        <Wire d="M220 100 L250 82 L290 70 L330 82 L360 100" stroke={BLUE} width="2" />
        <L x="290" y="125" size={12} fill={N} weight={700}>Medium Mesh</L>
        <L x="290" y="145" size={11} fill={MUTED}>Reduced error</L>
        <L x="290" y="160" size={11} fill={MUTED}>Medium file size</L>
      </g>

      <g className="aimm-insert aimm-delay-2">
        {/* Fine */}
        <Curve pts={[[380, 100], [420, 70], [480, 70], [520, 100]]} stroke={MUTED} width="2" />
        <Wire d="M380 100 L400 87 L420 76 L440 71 L460 71 L480 76 L500 87 L520 100" stroke={BLUE} width="2" />
        <L x="450" y="125" size={12} fill={N} weight={700}>Fine Mesh</L>
        <L x="450" y="145" size={11} fill={GREEN}>Smooth surface</L>
        <L x="450" y="160" size={11} fill={RED}>Enormous file</L>
      </g>

      {/* Right half: File Errors */}
      <L x="700" y="40" size={15} fill={BLUE} weight={800}>COMMON MESH ERRORS</L>
      
      <g className="aimm-insert aimm-delay-3">
        <Card x="550" y="60" w="300" h="420" title="STL File Errors" accent={RED}>
          <g transform="translate(150, 90)">
            <L x="-100" y="0" size={12} fill={N} weight={700} anchor="start">1. Gap between facets</L>
            <path d="M30 -10 L60 -10 L45 15 Z" fill="none" stroke={BLUE} strokeWidth="2" />
            <path d="M65 -10 L95 -10 L80 15 Z" fill="none" stroke={BLUE} strokeWidth="2" />
            <L x="-80" y="20" size={11} fill={RED} anchor="start">Causes missing contour in slice</L>
            <Wire d="M-130 35 L130 35" stroke={MUTED} opacity="0.3" />
          </g>
          
          <g transform="translate(150, 190)">
            <L x="-100" y="0" size={12} fill={N} weight={700} anchor="start">2. Inverted Normal</L>
            <path d="M30 -10 L60 -10 L45 15 Z" fill={SKY} stroke={BLUE} strokeWidth="2" />
            <Wire d="M45 2 L45 -20" stroke={BLUE} marker="url(#aimArrB)" />
            <path d="M65 -10 L95 -10 L80 15 Z" fill={ROSE} stroke={RED} strokeWidth="2" />
            <Wire d="M80 2 L80 20" stroke={RED} marker="url(#aimArrR)" />
            <L x="-80" y="25" size={11} fill={RED} anchor="start">Points inward, confuses slicing</L>
            <Wire d="M-130 40 L130 40" stroke={MUTED} opacity="0.3" />
          </g>

          <g transform="translate(150, 290)">
            <L x="-100" y="0" size={12} fill={N} weight={700} anchor="start">3. Overlapping facets</L>
            <path d="M30 -10 L70 -10 L50 20 Z" fill="none" stroke={BLUE} strokeWidth="2" />
            <path d="M50 -10 L90 -10 L70 20 Z" fill="none" stroke={RED} strokeWidth="2" />
            <L x="-80" y="25" size={11} fill={RED} anchor="start">Causes ambiguous boundary</L>
          </g>
        </Card>
      </g>
      
      {/* Faceted part example */}
      <g className="aimm-insert aimm-delay-1">
         <rect x="60" y="220" width="460" height="260" rx="8" fill={WHITE} stroke={MUTED} />
         <L x="290" y="250" size={14} fill={N} weight={700}>Effect of Chord Height Tolerance on Part Quality</L>
         {/* Curve and straight lines approximation */}
         <Curve pts={[[100, 380], [150, 280], [290, 280], [340, 380]]} stroke={MUTED} width="2" opacity="0.5" />
         <Wire d="M100 380 L140 310 L290 285 L340 380" stroke={BLUE} width="3" />
         <Wire d="M140 310 L150 280" stroke={RED} width="2" />
         <L x="130" y="295" size={11} fill={RED} anchor="end">Deviation</L>
         <L x="290" y="420" size={12} fill={MUTED}>The file carries only geometry. Units and materials are lost.</L>
      </g>
    </Scene>
  )
}


export function M5SlicingLayerThicknessStaircaseScene() {
  return (
    <Scene caption="Layer thickness and build orientation control the staircase error and the build time">
      <L x="450" y="35" size={15} fill={BLUE} weight={800}>SLICING &amp; LAYER THICKNESS</L>
      
      {/* Three layer thicknesses */}
      <g className="aimm-insert">
        {/* Coarse */}
        <Curve pts={[[60, 200], [200, 100]]} stroke={MUTED} width="2" />
        {[0, 1, 2, 3, 4].map(i => (
           <rect key={`c-${i}`} x={60 + i*28} y={180 - i*20} width="28" height="20" fill={SKY} stroke={BLUE} strokeWidth="1" />
        ))}
        <L x="130" y="220" size={13} fill={N} weight={700}>Thick Layers</L>
        <L x="130" y="240" size={11} fill={RED}>Large staircase error</L>
        <rect x="90" y="250" width="80" height="15" fill={GREEN} />
        <L x="130" y="280" size={11} fill={GREEN}>Short Build Time</L>
      </g>

      <g className="aimm-insert aimm-delay-1">
        {/* Medium */}
        <Curve pts={[[260, 200], [400, 100]]} stroke={MUTED} width="2" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
           <rect key={`m-${i}`} x={260 + i*14} y={190 - i*10} width="14" height="10" fill={SKY} stroke={BLUE} strokeWidth="1" />
        ))}
        <L x="330" y="220" size={13} fill={N} weight={700}>Medium Layers</L>
        <rect x="290" y="250" width="120" height="15" fill={AMBER} />
        <L x="330" y="280" size={11} fill={N}>Medium Build Time</L>
      </g>

      <g className="aimm-insert aimm-delay-2">
        {/* Fine */}
        <Curve pts={[[460, 200], [600, 100]]} stroke={MUTED} width="2" />
        {[...Array(20)].map((_, i) => (
           <rect key={`f-${i}`} x={460 + i*7} y={195 - i*5} width="7" height="5" fill={SKY} stroke={BLUE} strokeWidth="0.5" />
        ))}
        <L x="530" y="220" size={13} fill={N} weight={700}>Thin Layers</L>
        <L x="530" y="240" size={11} fill={GREEN}>Small staircase error</L>
        <rect x="490" y="250" width="160" height="15" fill={RED} />
        <L x="530" y="280" size={11} fill={RED}>Long Build Time</L>
      </g>

      <g className="aimm-insert aimm-delay-3">
        {/* Angle dependence plot */}
        <rect x="660" y="70" width="200" height="180" fill={WHITE} stroke={MUTED} />
        <Axes x="680" y="230" w="160" h="140" xLabel="Surface Angle" yLabel="Error" origin="left" />
        <Curve pts={[[680, 90], [720, 140], [780, 210], [840, 230]]} stroke={RED} width="3" className="aimm-pointer" />
        <L x="760" y="100" size={11} fill={RED}>Worse on shallow slopes</L>
      </g>

      <L x="450" y="325" size={15} fill={BLUE} weight={800}>BUILD ORIENTATION AND SUPPORTS</L>

      <g className="aimm-insert aimm-delay-4">
        {/* Horizontal orientation */}
        <Card x="150" y="340" w="280" h="160" title="Orientation A (Shallow Slope)" accent={MUTED}>
          <g transform="translate(140, 80)">
             <Curve pts={[[-60, 20], [60, 0]]} stroke={N} width="2" />
             <rect x="-60" y="0" width="120" height="10" fill={SKY} stroke={BLUE} />
             <rect x="-60" y="10" width="100" height="10" fill={SKY} stroke={BLUE} />
             {/* Supports */}
             <rect x="40" y="10" width="20" height="40" fill={AMBER} opacity="0.3" stroke={AMBER} />
             <rect x="60" y="0" width="20" height="50" fill={AMBER} opacity="0.3" stroke={AMBER} />
             <L x="-80" y="10" size={11} fill={RED} anchor="end">Wide steps</L>
             <L x="100" y="30" size={11} fill={AMBER} anchor="start">Supports needed</L>
          </g>
        </Card>

        {/* Vertical orientation */}
        <Card x="470" y="340" w="280" h="160" title="Orientation B (Steep Slope)" accent={GREEN}>
           <g transform="translate(140, 90)">
             <Curve pts={[[-10, 40], [10, -40]]} stroke={N} width="2" />
             {[...Array(8)].map((_, i) => (
                <rect key={`vo-${i}`} x={-30} y={30 - i*10} width={20 + i*2.5} height="10" fill={SKY} stroke={BLUE} />
             ))}
             {/* Supports - fewer */}
             <rect x="-40" y="40" width="10" height="10" fill={AMBER} opacity="0.3" stroke={AMBER} />
             <L x="-50" y="0" size={11} fill={GREEN} anchor="end">Fine steps</L>
             <L x="30" y="45" size={11} fill={GREEN} anchor="start">Minimal supports</L>
           </g>
        </Card>
      </g>
    </Scene>
  )
}

export function M5SixProcessFamiliesScene() {
  return (
    <Scene caption="Six process families distinguished by how each layer is formed">
      <L x="450" y="35" size={16} fill={BLUE} weight={800}>ADDITIVE PROCESS FAMILIES</L>

      {/* Row 1 */}
      <g className="aimm-insert">
        <Block x="40" y="60" w="260" h="190" label="" stroke={MUTED} />
        <L x="170" y="80" size={14} fill={BLUE} weight={800}>Photopolymerisation</L>
        <rect x="70" y="110" width="100" height="60" fill={SKY} opacity="0.3" stroke={BLUE} />
        <Wire d="M120 70 L120 110" stroke={RED} width="2" marker="url(#aimArrR)" />
        <L x="140" y="95" size={11} fill={RED} anchor="start">Laser</L>
        <rect x="80" y="130" width="80" height="10" fill={BLUE} />
        <Wire d="M120 150 L120 180" stroke={MUTED} marker="url(#aimArrM)" />
        <L x="170" y="210" size={11} fill={N}>Resin vat, laser cures layer</L>
        <L x="170" y="230" size={11} fill={MUTED}>Materials: Polymers</L>
      </g>

      <g className="aimm-insert aimm-delay-1">
        <Block x="320" y="60" w="260" h="190" label="" stroke={MUTED} />
        <L x="450" y="80" size={14} fill={BLUE} weight={800}>Powder Bed Fusion</L>
        <rect x="350" y="120" width="100" height="50" fill={CREAM} stroke={MUTED} />
        <Wire d="M370 70 L400 120" stroke={RED} width="2" marker="url(#aimArrR)" />
        <L x="390" y="90" size={11} fill={RED} anchor="start">Beam melts powder</L>
        <circle cx="350" cy="115" r="5" fill={N} />
        <Wire d="M350 115 L380 115" stroke={N} marker="url(#aimArr)" />
        <L x="340" y="105" size={11} fill={N} anchor="end">Recoater</L>
        <rect x="370" y="130" width="60" height="10" fill={GREEN} />
        <L x="450" y="210" size={11} fill={N}>Powder layer melted selectively</L>
        <L x="450" y="230" size={11} fill={MUTED}>Materials: Metals, Polymers</L>
      </g>

      <g className="aimm-insert aimm-delay-2">
        <Block x="600" y="60" w="260" h="190" label="" stroke={MUTED} />
        <L x="730" y="80" size={14} fill={BLUE} weight={800}>Extrusion</L>
        <path d="M710 100 L750 100 L740 140 L720 140 Z" fill={WHITE} stroke={N} />
        <Wire d="M730 140 L730 150" stroke={AMBER} width="3" />
        <rect x="680" y="150" width="100" height="10" fill={AMBER} />
        <L x="770" y="120" size={11} fill={N}>Heated Nozzle</L>
        <L x="730" y="210" size={11} fill={N}>Bead laid in a raster</L>
        <L x="730" y="230" size={11} fill={MUTED}>Materials: Thermoplastics</L>
      </g>

      {/* Row 2 */}
      <g className="aimm-insert aimm-delay-3">
        <Block x="40" y="270" w="260" h="190" label="" stroke={MUTED} />
        <L x="170" y="290" size={14} fill={BLUE} weight={800}>Printing</L>
        <rect x="130" y="310" width="80" height="20" fill={WHITE} stroke={N} />
        <circle cx="150" cy="340" r="2" fill={BLUE} />
        <circle cx="170" cy="345" r="2" fill={BLUE} />
        <circle cx="190" cy="335" r="2" fill={BLUE} />
        <rect x="100" y="360" width="140" height="40" fill={CREAM} stroke={MUTED} />
        <L x="170" y="420" size={11} fill={N}>Droplets of binder on powder</L>
        <L x="170" y="440" size={11} fill={MUTED}>Materials: Sand, Ceramics, Metal</L>
      </g>

      <g className="aimm-insert aimm-delay-4">
        <Block x="320" y="270" w="260" h="190" label="" stroke={MUTED} />
        <L x="450" y="290" size={14} fill={BLUE} weight={800}>Sheet Lamination</L>
        <rect x="380" y="360" width="140" height="30" fill={SKY} stroke={BLUE} />
        <Wire d="M380 340 L520 340" stroke={BLUE} width="2" />
        <circle cx="450" cy="335" r="15" fill={WHITE} stroke={N} />
        <Wire d="M470 335 L500 335" stroke={N} marker="url(#aimArr)" />
        <L x="450" y="420" size={11} fill={N}>Sheets bonded and cut</L>
        <L x="450" y="440" size={11} fill={MUTED}>Materials: Paper, Metal, Polymer</L>
      </g>

      <g className="aimm-insert aimm-delay-5">
        <Block x="600" y="270" w="260" h="190" label="" stroke={MUTED} />
        <L x="730" y="290" size={14} fill={BLUE} weight={800}>Beam Deposition</L>
        <path d="M710 310 L750 310 L740 340 L720 340 Z" fill={WHITE} stroke={N} />
        <Wire d="M730 300 L730 310" stroke={RED} width="2" marker="url(#aimArrR)" />
        <Wire d="M690 320 L725 345" stroke={MUTED} width="2" />
        <path d="M710 350 A20 10 0 0 0 750 350 Z" fill={AMBER} />
        <rect x="680" y="350" width="100" height="20" fill={MUTED} />
        <L x="730" y="420" size={11} fill={N}>Wire/powder fed into melt pool</L>
        <L x="730" y="440" size={11} fill={MUTED}>Materials: Metals</L>
      </g>

      {/* Comparison axis below */}
      <g className="aimm-insert aimm-delay-6">
        <Wire d="M80 490 L820 490" stroke={MUTED} width="3" marker="url(#aimArrM)" />
        <L x="450" y="510" size={12} fill={MUTED} weight={700}>Comparison: Accuracy vs Speed depends heavily on family chosen, none dominates.</L>
      </g>
    </Scene>
  )
}

export function M5AdvantagesWithConsolidationExampleScene() {
  return (
    <Scene caption="No tooling enables costless complexity and part consolidation">
      <L x="450" y="35" size={15} fill={BLUE} weight={800}>PART CONSOLIDATION</L>
      
      {/* Assembly vs Consolidated */}
      <g className="aimm-insert">
        <rect x="60" y="50" width="380" height="210" fill={WHITE} stroke={MUTED} rx="8" />
        <L x="250" y="70" size={13} fill={N} weight={700}>Conventional Assembly</L>
        <g transform="translate(180, 110)" className="aimm-shift">
           <rect x="0" y="0" width="40" height="40" fill={SKY} stroke={BLUE} />
           <rect x="50" y="0" width="40" height="40" fill={CREAM} stroke={MUTED} />
           <rect x="25" y="-30" width="40" height="20" fill={WHITE} stroke={RED} />
           <Wire d="M45 -10 L45 0" stroke={RED} marker="url(#aimArrR)" />
           {/* Fasteners */}
           <circle cx="10" cy="-10" r="3" fill={N} />
           <circle cx="80" cy="-10" r="3" fill={N} />
           <Wire d="M10 -7 L10 5" stroke={N} />
           <Wire d="M80 -7 L80 5" stroke={N} />
        </g>
        <Bars x="90" y="160" w="200" rowH="20" items={[
          ['Part Count', 9, MUTED],
          ['Fasteners', 14, MUTED],
          ['Leak Paths', 4, RED],
        ]} max={15} />
      </g>

      <g className="aimm-insert aimm-delay-1">
        <rect x="460" y="50" width="380" height="210" fill={WHITE} stroke={GREEN} rx="8" />
        <L x="650" y="70" size={13} fill={GREEN} weight={700}>Additively Consolidated</L>
        <g transform="translate(600, 90)">
           <path d="M0 0 L90 0 L90 40 L50 40 L50 20 L0 20 Z" fill={SKY} stroke={GREEN} strokeWidth="2" />
        </g>
        <Bars x="490" y="160" w="200" rowH="20" items={[
          ['Part Count', 1, GREEN],
          ['Fasteners', 0, GREEN],
          ['Leak Paths', 0, GREEN],
        ]} max={15} />
      </g>

      <L x="450" y="295" size={15} fill={BLUE} weight={800}>CUSTOMISATION AND LEAD TIME</L>

      {/* Customisation batch */}
      <g className="aimm-insert aimm-delay-2">
        <Card x="60" y="310" w="380" h="180" title="Mass Customisation" accent={BLUE}>
           <g transform="translate(190, 80)">
             {/* Batch of different parts */}
             {[0, 1, 2, 3, 4].map(i => (
                <rect key={`p1-${i}`} x={-150 + i*60} y="-10" width="30" height={20 + (i%3)*5} fill={SKY} stroke={BLUE} />
             ))}
             <L x="0" y="45" size={11} fill={N}>Batch of entirely different designs</L>
             
             <rect x="-100" y="60" width="200" height="15" fill={GREEN} />
             <L x="0" y="90" size={12} fill={GREEN} weight={700}>Cost per part is flat (No tooling cost to amortise)</L>
           </g>
        </Card>
      </g>

      {/* Lead time */}
      <g className="aimm-insert aimm-delay-3">
        <Card x="460" y="310" w="380" h="180" title="Lead Time to First Part" accent={BLUE}>
           <g transform="translate(190, 80)">
             <L x="-160" y="0" size={12} fill={N} anchor="start">Conventional</L>
             <rect x="-70" y="-10" width="220" height="15" fill={RED} />
             <L x="160" y="0" size={12} fill={RED} anchor="start" weight={700}>Weeks (Tooling)</L>
             
             <L x="-160" y="40" size={12} fill={N} anchor="start">Additive</L>
             <rect x="-70" y="30" width="40" height="15" fill={GREEN} />
             <L x="-20" y="40" size={12} fill={GREEN} anchor="start" weight={700}>Hours (Build only)</L>
           </g>
        </Card>
      </g>
    </Scene>
  )
}

export function M5LimitationsWithCrossoverScene() {
  return (
    <Scene caption="Limitations of additive manufacturing form strict design constraints">
      {/* Cost crossover */}
      <g className="aimm-insert">
        <rect x="40" y="40" width="400" height="240" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="240" y="70" size={14} fill={N} weight={800}>ECONOMIES OF SCALE</L>
        <Axes x="80" y="240" w="320" h="140" xLabel="Quantity" yLabel="Cost per Part" origin="left" />
        
        {/* Additive Curve - Flat */}
        <Curve pts={[[80, 200], [200, 195], [400, 190]]} stroke={GREEN} width="3" />
        <L x="410" y="190" size={12} fill={GREEN} anchor="start" weight={700}>Additive</L>
        
        {/* Conventional Curve - Steep drop */}
        <Curve pts={[[80, 100], [120, 140], [200, 195], [300, 230], [400, 235]]} stroke={RED} width="3" />
        <L x="410" y="235" size={12} fill={RED} anchor="start" weight={700}>Conventional</L>
        
        {/* Crossover point */}
        <circle cx="200" cy="195" r="5" fill={N} />
        <Wire d="M200 195 L200 240" stroke={MUTED} dash="4 2" />
        <L x="200" y="260" size={11} fill={N}>Break-even Quantity</L>
      </g>

      {/* Anisotropy */}
      <g className="aimm-insert aimm-delay-1">
        <rect x="460" y="40" width="400" height="240" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="660" y="70" size={14} fill={N} weight={800}>ANISOTROPY (WEAKER ACROSS LAYERS)</L>
        
        <g transform="translate(560, 140)">
          {/* Vertical layers (Strong) */}
          <rect x="-40" y="-30" width="20" height="60" fill={SKY} stroke={BLUE} />
          <Wire d="M-30 -30 L-30 30" stroke={BLUE} />
          <Wire d="M-30 -50 L-30 -30" stroke={GREEN} width="2" marker="url(#aimArrG)" />
          <Wire d="M-30 50 L-30 30" stroke={GREEN} width="2" markerEnd="url(#aimArrG)" />
          <L x="-30" y="70" size={11} fill={GREEN}>Stronger</L>
          
          {/* Horizontal layers (Weak) */}
          <rect x="40" y="-30" width="20" height="60" fill={SKY} stroke={BLUE} />
          <Wire d="M40 0 L60 0" stroke={BLUE} />
          <Wire d="M50 -50 L50 -30" stroke={RED} width="2" marker="url(#aimArrR)" />
          <Wire d="M50 50 L50 30" stroke={RED} width="2" markerEnd="url(#aimArrR)" />
          {/* Fracture */}
          <path d="M35 0 L65 0" stroke={RED} width="3" className="aimm-pulse" />
          <L x="50" y="70" size={11} fill={RED}>Fracture between layers</L>
        </g>
      </g>

      {/* Surface Finish */}
      <g className="aimm-insert aimm-delay-2">
        <rect x="40" y="300" width="400" height="180" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="240" y="330" size={14} fill={N} weight={800}>SURFACE FINISH</L>
        
        <Curve pts={[[80, 400], [120, 370], [160, 420], [200, 380]]} stroke={RED} width="2" />
        <L x="140" y="440" size={11} fill={RED}>As-built (Rough)</L>
        
        <Curve pts={[[260, 400], [280, 395], [300, 405], [320, 395], [360, 400]]} stroke={GREEN} width="2" />
        <L x="310" y="440" size={11} fill={GREEN}>Machined (Smooth)</L>
      </g>

      {/* Build Volume Limit */}
      <g className="aimm-insert aimm-delay-3">
        <rect x="460" y="300" width="400" height="180" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="660" y="330" size={14} fill={N} weight={800}>BUILD VOLUME LIMIT</L>
        
        <rect x="560" y="370" width="100" height="80" fill="none" stroke={MUTED} strokeDasharray="4 2" />
        <L x="610" y="360" size={11} fill={MUTED}>Machine Chamber</L>
        
        {/* Split part */}
        <rect x="520" y="390" width="80" height="30" fill={SKY} stroke={BLUE} />
        <rect x="620" y="390" width="80" height="30" fill={SKY} stroke={BLUE} />
        <Wire d="M605 380 L615 390 L605 400" stroke={RED} width="2" />
        <L x="610" y="440" size={11} fill={RED}>Oversized parts must be split &amp; joined</L>
      </g>
    </Scene>
  )
}

export function M5SelectionFunnelScene() {
  return (
    <Scene caption="Applying constraints in order of how much they eliminate reduces wasted effort">
      <L x="250" y="35" size={15} fill={BLUE} weight={800}>CORRECT ORDER (MATERIAL FIRST)</L>
      
      <g className="aimm-insert">
        {/* Main funnel */}
        <path d="M100 80 L400 80 L350 140 L350 200 L300 260 L300 320 L270 380 L270 440 L230 500 L150 500 Z" fill={SKY} stroke={BLUE} strokeWidth="2" opacity="0.3" />
        
        {/* Stages */}
        <rect x="50" y="80" width="100" height="30" rx="4" fill={WHITE} stroke={MUTED} />
        <L x="100" y="100" size={12} fill={N} weight={700}>6 Families In</L>
        
        <rect x="50" y="140" width="100" height="30" rx="4" fill={WHITE} stroke={MUTED} />
        <L x="100" y="160" size={12} fill={N} weight={700}>Material</L>
        
        <rect x="50" y="200" width="100" height="30" rx="4" fill={WHITE} stroke={MUTED} />
        <L x="100" y="220" size={12} fill={N} weight={700}>Accuracy</L>
        
        <rect x="50" y="260" width="100" height="30" rx="4" fill={WHITE} stroke={MUTED} />
        <L x="100" y="280" size={12} fill={N} weight={700}>Size</L>
        
        <rect x="50" y="320" width="100" height="30" rx="4" fill={WHITE} stroke={MUTED} />
        <L x="100" y="340" size={12} fill={N} weight={700}>Quantity</L>
        
        <rect x="50" y="380" width="100" height="30" rx="4" fill={WHITE} stroke={MUTED} />
        <L x="100" y="400" size={12} fill={N} weight={700}>Cost</L>
      </g>

      {/* Eliminations */}
      <g className="aimm-insert aimm-delay-1">
        <Wire d="M350 140 L450 170" stroke={RED} width="2" marker="url(#aimArrR)" />
        <L x="460" y="175" size={11} fill={RED} anchor="start">4 rejected (Wrong material)</L>
      </g>
      <g className="aimm-insert aimm-delay-2">
        <Wire d="M300 200 L400 230" stroke={RED} width="2" marker="url(#aimArrR)" />
        <L x="410" y="235" size={11} fill={RED} anchor="start">1 rejected (Too rough)</L>
      </g>
      <g className="aimm-insert aimm-delay-3">
        <L x="310" y="295" size={11} fill={GREEN} anchor="start">Both pass size limit</L>
      </g>
      <g className="aimm-insert aimm-delay-4">
        <L x="280" y="355" size={11} fill={N} anchor="start">Quantity favours one</L>
      </g>
      <g className="aimm-insert aimm-delay-5">
        <Wire d="M250 440 L250 480" stroke={GREEN} width="3" marker="url(#aimArrG)" />
        <L x="270" y="490" size={12} fill={GREEN} anchor="start" weight={800}>1 SELECTED</L>
        <L x="270" y="505" size={11} fill={N} anchor="start">Cost compared on viable options only</L>
      </g>

      <L x="700" y="35" size={15} fill={RED} weight={800}>REVERSED FUNNEL (WASTED WORK)</L>
      
      <g className="aimm-insert aimm-delay-6">
        <path d="M550 80 L850 80 L820 140 L820 200 L790 260 L790 320 L740 380 L740 440 L700 500 L600 500 Z" fill={ROSE} stroke={RED} strokeWidth="2" opacity="0.1" />
        
        <rect x="560" y="140" width="100" height="30" rx="4" fill={WHITE} stroke={RED} />
        <L x="610" y="160" size={12} fill={RED} weight={700}>Cost First</L>
        <L x="830" y="160" size={11} fill={RED} anchor="start">6 options costed</L>
        
        <rect x="560" y="380" width="100" height="30" rx="4" fill={WHITE} stroke={MUTED} />
        <L x="610" y="400" size={12} fill={N} weight={700}>Material Last</L>
        <Wire d="M740 380 L840 410" stroke={RED} width="2" marker="url(#aimArrR)" />
        <L x="850" y="415" size={11} fill={RED} anchor="start">4 rejected anyway</L>
        
        <L x="700" y="240" size={12} fill={RED} weight={700}>Huge effort wasted pricing</L>
        <L x="700" y="260" size={12} fill={RED} weight={700}>processes that cannot</L>
        <L x="700" y="280" size={12} fill={RED} weight={700}>make the part at all</L>
      </g>
    </Scene>
  )
}

export function M5DesignForAmAvoidAndExploitScene() {
  return (
    <Scene caption="Design for additive manufacturing: avoid what cannot be built, exploit where material can be placed">
      <L x="250" y="40" size={16} fill={RED} weight={800}>AVOID</L>
      <L x="650" y="40" size={16} fill={GREEN} weight={800}>EXPLOIT</L>

      {/* AVOID: Overhangs */}
      <g className="aimm-insert aimm-delay-1">
        <rect x="60" y="60" width="380" height="180" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="250" y="80" size={13} fill={RED} weight={700}>Overhangs Below Process Limit</L>
        
        {/* Unsupported collapses */}
        <g transform="translate(140, 150)">
          <path d="M-60 40 L-60 -20 L-40 -20 L-40 20 L20 20 Z" fill={SKY} stroke={BLUE} />
          {/* Collapsing layers */}
          {[0, 1, 2].map(i => (
             <rect key={`c-${i}`} x={-40 + i*15} y="20 + i*10" width="20" height="10" fill={SKY} stroke={BLUE} className="aimm-delete" />
          ))}
          <L x="-20" y="65" size={11} fill={RED}>Fails during build</L>
        </g>

        {/* Supported */}
        <g transform="translate(320, 150)">
          <path d="M-60 40 L-60 -20 L-40 -20 L-40 20 L20 20 L20 40 Z" fill={SKY} stroke={BLUE} />
          <rect x="-40" y="40" width="60" height="40" fill={AMBER} opacity="0.3" stroke={AMBER} />
          <L x="-10" y="60" size={11} fill={AMBER}>Consumes material</L>
          <L x="-10" y="75" size={11} fill={AMBER}>Requires removal</L>
        </g>
      </g>

      {/* AVOID: Trapped Powder */}
      <g className="aimm-insert aimm-delay-2">
        <rect x="60" y="260" width="380" height="200" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="250" y="280" size={13} fill={RED} weight={700}>Enclosed Cavities</L>
        
        <g transform="translate(160, 360)">
          <path d="M-50 -40 L50 -40 L50 40 L-50 40 Z M-30 -20 L-30 20 L30 20 L30 -20 Z" fill={SKY} stroke={BLUE} fillRule="evenodd" />
          <rect x="-30" y="-20" width="60" height="40" fill={CREAM} />
          <L x="0" y="5" size={11} fill={N}>Trapped unfused powder</L>
        </g>

        <g transform="translate(340, 360)">
          {/* With drain holes */}
          <path d="M-50 -40 L50 -40 L50 40 L-50 40 Z M-30 -20 L-30 20 L30 20 L30 -20 Z" fill={SKY} stroke={BLUE} fillRule="evenodd" />
          <rect x="-30" y="-20" width="60" height="40" fill={WHITE} />
          {/* Drain holes */}
          <rect x="-10" y="20" width="20" height="20" fill={WHITE} />
          <rect x="-10" y="-40" width="20" height="20" fill={WHITE} />
          <Wire d="M0 10 L0 50" stroke={MUTED} marker="url(#aimArrM)" />
          <L x="0" y="65" size={11} fill={GREEN}>Drain holes allow escape</L>
        </g>
      </g>

      {/* EXPLOIT: Topology Optimisation & Lattices */}
      <g className="aimm-insert aimm-delay-3">
        <rect x="460" y="60" width="380" height="400" rx="8" fill={WHITE} stroke={GREEN} strokeWidth="2" />
        <L x="650" y="90" size={14} fill={GREEN} weight={800}>FREE COMPLEXITY</L>
        
        {/* Topology opt */}
        <L x="650" y="130" size={13} fill={N} weight={700}>Topology Optimisation</L>
        <g transform="translate(550, 180)">
          <rect x="-40" y="-30" width="80" height="60" fill={SKY} stroke={BLUE} />
          <L x="0" y="45" size={11} fill={MUTED}>Solid Bracket</L>
        </g>
        <Wire d="M610 180 L660 180" stroke={GREEN} width="2" marker="url(#aimArrG)" />
        <g transform="translate(720, 180)">
          {/* Organic shape */}
          <path d="M-40 -30 Q0 -30 40 -30 Q20 0 40 30 Q0 30 -40 30 Q-20 0 -40 -30 Z" fill={SKY} stroke={GREEN} strokeWidth="2" className="aimm-pulse" />
          <L x="0" y="45" size={11} fill={GREEN}>Organic Load Path</L>
        </g>

        {/* Lattices */}
        <L x="650" y="270" size={13} fill={N} weight={700}>Lattice Structures</L>
        <g transform="translate(550, 340)">
          <rect x="-40" y="-40" width="80" height="80" fill={SKY} stroke={BLUE} />
          <L x="0" y="55" size={11} fill={MUTED}>Solid Block (Mass: 100%)</L>
        </g>
        <Wire d="M610 340 L660 340" stroke={GREEN} width="2" marker="url(#aimArrG)" />
        <g transform="translate(720, 340)">
          <rect x="-40" y="-40" width="80" height="80" fill="none" stroke={GREEN} strokeWidth="2" />
          {/* Lattice inner lines */}
          <Wire d="M-40 -40 L40 40 M-40 40 L40 -40 M0 -40 L0 40 M-40 0 L40 0" stroke={GREEN} width="1.5" />
          <L x="0" y="55" size={11} fill={GREEN}>Lattice (Mass: 30%)</L>
          <L x="0" y="70" size={11} fill={GREEN}>Similar Stiffness</L>
        </g>
      </g>
    </Scene>
  )
}

export function M5HybridManufacturingSequenceScene() {
  return (
    <Scene caption="Direct digital manufacturing relies on hybrid sequences to achieve critical tolerances">
      <L x="450" y="35" size={15} fill={BLUE} weight={800}>HYBRID MANUFACTURING SEQUENCE</L>
      
      {/* Sequence of making a complex part with tight bores */}
      <g className="aimm-insert">
        <rect x="40" y="60" width="820" height="180" rx="8" fill={WHITE} stroke={MUTED} />
        
        <L x="200" y="90" size={13} fill={N} weight={700}>1. Additive Step (Near Net Shape)</L>
        <g transform="translate(200, 160)">
          {/* Rough stepped shape */}
          {[...Array(6)].map((_, i) => (
            <rect key={`a-${i}`} x={-60 + i*5} y={-30 + i*10} width={120 - i*10} height="10" fill={SKY} stroke={BLUE} strokeWidth="1" />
          ))}
          {/* Internal complex channel */}
          <path d="M-30 0 C0 -20 0 40 30 20" fill="none" stroke={WHITE} strokeWidth="6" />
          <L x="0" y="55" size={11} fill={BLUE}>Complex internal channel formed</L>
          <L x="0" y="70" size={11} fill={MUTED}>Rough surfaces, no tight tolerances</L>
        </g>

        <Wire d="M400 160 L500 160" stroke={GREEN} width="3" marker="url(#aimArrG)" />

        <L x="700" y="90" size={13} fill={N} weight={700}>2. Subtractive Step (Machining)</L>
        <g transform="translate(700, 160)">
          <path d="M-60 -30 L60 -30 L60 30 L-60 30 Z" fill={SKY} stroke={GREEN} strokeWidth="2" />
          <path d="M-30 0 C0 -20 0 40 30 20" fill="none" stroke={WHITE} strokeWidth="6" />
          <rect x="-40" y="-15" width="20" height="30" fill={WHITE} stroke={GREEN} />
          <rect x="20" y="-15" width="20" height="30" fill={WHITE} stroke={GREEN} />
          <L x="0" y="55" size={11} fill={GREEN}>Bearing bores cut to tolerance</L>
          <L x="0" y="70" size={11} fill={GREEN}>Mating faces smoothed</L>
        </g>
      </g>

      {/* Repair scenario */}
      <L x="450" y="275" size={15} fill={BLUE} weight={800}>HYBRID REPAIR</L>

      <g className="aimm-insert aimm-delay-2">
        <rect x="40" y="290" width="820" height="120" rx="8" fill={WHITE} stroke={MUTED} />
        
        <g transform="translate(180, 360)">
          {/* Worn blade */}
          <path d="M-30 30 L-20 -30 C0 -40 20 -20 30 30 Z" fill={CREAM} stroke={MUTED} />
          <path d="M-20 -30 C0 -50 20 -50 30 -30" fill="none" stroke={RED} strokeDasharray="4 2" />
          <L x="0" y="45" size={11} fill={RED}>Worn Turbine Blade Tip</L>
        </g>
        
        <Wire d="M280 340 L340 340" stroke={MUTED} marker="url(#aimArrM)" />
        
        <g transform="translate(450, 360)">
          <path d="M-30 30 L-20 -30 C0 -40 20 -20 30 30 Z" fill={CREAM} stroke={MUTED} />
          <path d="M-20 -30 C0 -55 20 -55 30 -30 Z" fill={AMBER} opacity="0.6" />
          <L x="0" y="45" size={11} fill={AMBER}>Beam Deposition builds new material</L>
        </g>

        <Wire d="M570 340 L630 340" stroke={MUTED} marker="url(#aimArrM)" />

        <g transform="translate(730, 360)">
          <path d="M-30 30 L-20 -30 C0 -50 20 -50 30 30 Z" fill={CREAM} stroke={GREEN} strokeWidth="2" />
          <L x="0" y="45" size={11} fill={GREEN}>Machined back to original profile</L>
        </g>
      </g>

      {/* Capability table */}
      <g className="aimm-insert aimm-delay-3">
         <Panel x="250" y="425" w="400" title="Hybrid Division of Labour" rowH="22" accent={BLUE} rows={[
           ['Additive Step Provides:', 'Complex Geometry, New Material', BLUE],
           ['Machining Step Provides:', 'Accuracy, Surface Finish', GREEN]
         ]} />
      </g>
    </Scene>
  )
}

export function M5DigitalThreadAndTrendsScene() {
  return (
    <Scene caption="One digital model driving design, manufacture and inspection connects recent trends">
      {/* Central Model */}
      <g className="aimm-pulse">
        <Block x="380" y="210" w="140" h="100" label="SINGLE" sub="DIGITAL MODEL" stroke={BLUE} fill={SKY} />
        <L x="450" y="270" size={11} fill={BLUE}>(Digital Thread)</L>
      </g>

      {/* Threads radiating */}
      <g className="aimm-insert aimm-delay-1">
        <Wire d="M450 210 L450 140" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        <L x="450" y="125" size={12} fill={N} weight={700}>Design Analysis</L>

        <Wire d="M520 235 L590 200" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        <L x="610" y="195" size={12} fill={N} weight={700} anchor="start">Additive Build Prep</L>

        <Wire d="M520 285 L590 320" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        <L x="610" y="330" size={12} fill={N} weight={700} anchor="start">Inspection (CMM)</L>

        <Wire d="M450 310 L450 380" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        <L x="450" y="400" size={12} fill={N} weight={700}>Process Planning</L>

        <Wire d="M380 260 L310 260" stroke={BLUE} width="2" marker="url(#aimArrB)" />
        <L x="290" y="265" size={12} fill={N} weight={700} anchor="end">NC Programming</L>
      </g>

      {/* 4 Trends Panels */}
      <g className="aimm-insert aimm-delay-2">
        <Card x="40" y="40" w="240" h="120" title="Mass Customisation" accent={AMBER}>
          <g transform="translate(120, 80)">
             <L x="0" y="-10" size={12} fill={N}>Batch of unique parts</L>
             <L x="0" y="10" size={12} fill={N}>Flat cost per unit</L>
             <L x="0" y="30" size={11} fill={AMBER} weight={700}>Enabled by tool-less AM</L>
          </g>
        </Card>
        <Wire d="M280 100 L380 220" stroke={AMBER} dash="4 2" />
      </g>

      <g className="aimm-insert aimm-delay-3">
        <Card x="620" y="40" w="240" h="120" title="Distributed Manufacturing" accent={GREEN}>
          <g transform="translate(120, 80)">
             <L x="0" y="-10" size={12} fill={N}>Send the model via network,</L>
             <L x="0" y="10" size={12} fill={N}>not the part via ship</L>
             <L x="0" y="30" size={11} fill={GREEN} weight={700}>Made possible by digital thread</L>
          </g>
        </Card>
        <Wire d="M620 100 L520 220" stroke={GREEN} dash="4 2" />
      </g>

      <g className="aimm-insert aimm-delay-4">
        <Card x="40" y="360" w="240" h="120" title="Sustainability" accent={TEAL}>
          <g transform="translate(120, 80)">
             <L x="0" y="-10" size={12} fill={N}>High material utilisation</L>
             <L x="0" y="10" size={12} fill={N}>Repair instead of scrap</L>
             <L x="0" y="30" size={11} fill={TEAL} weight={700}>Optimised geometries</L>
          </g>
        </Card>
        <Wire d="M280 420 L380 300" stroke={TEAL} dash="4 2" />
      </g>

      <g className="aimm-insert aimm-delay-5">
        <Card x="620" y="360" w="240" h="120" title="Data Driven Manufacturing" accent={PURP}>
          <g transform="translate(120, 80)">
             <L x="0" y="-10" size={12} fill={N}>Measurement data</L>
             <L x="0" y="10" size={12} fill={N}>returns to central model</L>
             <L x="0" y="30" size={11} fill={PURP} weight={700}>Closed loop feedback</L>
          </g>
        </Card>
        {/* Returning data wire */}
        <Wire d="M620 420 L520 300" stroke={PURP} width="3" marker="url(#aimArrP)" dash="6 4" />
      </g>
    </Scene>
  )
}

export function M5LightsOutConditionsAndObstaclesScene() {
  return (
    <Scene caption="The fully automated factory runs unattended for periods, rather than indefinitely">
      <L x="450" y="35" size={15} fill={BLUE} weight={800}>UNATTENDED OPERATION ("LIGHTS OUT")</L>

      {/* The Factory */}
      <g className="aimm-insert">
        <rect x="40" y="60" width="380" height="240" rx="8" fill={N} stroke={MUTED} />
        <L x="230" y="90" size={16} fill={WHITE} weight={800}>FACTORY OVERNIGHT</L>
        <L x="230" y="110" size={12} fill={SKY}>Running with no human intervention</L>

        <rect x="60" y="130" width="340" height="150" rx="4" fill={WHITE} opacity="0.1" />
        <L x="230" y="150" size={11} fill={WHITE} weight={700}>REQUIRED CONDITIONS</L>
        <g transform="translate(140, 180)">
          {['Stable product design', 'Controlled material input', 'Fully specified tasks', 'No judgement required', 'Every exception anticipated'].map((t, i) => (
             <L key={t} x="0" y={i*20} size={11} fill={GREEN} anchor="start">✓ {t}</L>
          ))}
        </g>
      </g>

      {/* Obstacles */}
      <L x="650" y="65" size={13} fill={N} weight={700}>What Ends the Unattended Period</L>
      
      <g className="aimm-insert aimm-delay-1">
        <Card x="450" y="80" w="190" h="105" title="Material Variation" accent={RED} linesY="50" lineH="15" foot="Requires Human" footTone={RED}>
           <L x="95" y="45" size={11} fill={N}>Unexpected variation</L>
           <L x="95" y="60" size={11} fill={N}>jams a feeder</L>
        </Card>
      </g>
      <g className="aimm-insert aimm-delay-2">
        <Card x="670" y="80" w="190" h="105" title="Tool Breakage" accent={RED} linesY="50" lineH="15" foot="Requires Judgement" footTone={RED}>
           <L x="95" y="45" size={11} fill={N}>Unpredictable wear</L>
           <L x="95" y="60" size={11} fill={N}>halts the line</L>
        </Card>
      </g>
      <g className="aimm-insert aimm-delay-3">
        <Card x="450" y="195" w="190" h="105" title="Part Orientation" accent={RED} linesY="50" lineH="15" foot="Requires Dexterity" footTone={RED}>
           <L x="95" y="45" size={11} fill={N}>Part arrives flipped</L>
           <L x="95" y="60" size={11} fill={N}>Automation cannot adapt</L>
        </Card>
      </g>
      <g className="aimm-insert aimm-delay-4">
        <Card x="670" y="195" w="190" h="105" title="Complex Fault" accent={RED} linesY="50" lineH="15" foot="Requires Diagnosis" footTone={RED}>
           <L x="95" y="45" size={11} fill={N}>Sensor reads out of range</L>
           <L x="95" y="60" size={11} fill={N}>for unknown reason</L>
        </Card>
      </g>

      {/* Duration bar */}
      <g className="aimm-insert aimm-delay-5">
        <rect x="40" y="320" width="820" height="90" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="100" y="350" size={12} fill={N} weight={700}>UNATTENDED DURATION</L>
        
        <rect x="100" y="370" width="600" height="20" fill={SKY} />
        <rect x="100" y="370" width="400" height="20" fill={GREEN} />
        
        <Wire d="M500 370 L500 405" stroke={RED} width="3" marker="url(#aimArrR)" />
        <L x="510" y="400" size={11} fill={RED} anchor="start" weight={700}>First unanticipated exception occurs (System stops)</L>
        
        <L x="450" y="435" size={13} fill={N} weight={700}>Conclusion: A fully automated factory runs unattended for periods, rather than indefinitely.</L>
      </g>
    </Scene>
  )
}

export function M5ChangingWorkContentScene() {
  return (
    <Scene caption="Automation changes work content, replacing direct operation with higher-skilled tasks">
      <L x="450" y="35" size={15} fill={BLUE} weight={800}>WORKFORCE COMPOSITION SHIFT</L>
      
      {/* Before */}
      <g className="aimm-insert">
        <rect x="100" y="70" width="160" height="240" fill={WHITE} stroke={MUTED} />
        <L x="180" y="90" size={13} fill={N} weight={700}>Before Automation</L>
        
        <rect x="120" y="110" width="120" height="150" fill={SKY} stroke={BLUE} />
        <L x="180" y="185" size={12} fill={N} weight={700}>Direct Operation</L>
        
        <rect x="120" y="260" width="120" height="15" fill={CREAM} stroke={MUTED} />
        <L x="180" y="271" size={10} fill={MUTED}>Maint.</L>
        
        <rect x="120" y="275" width="120" height="15" fill={CREAM} stroke={MUTED} />
        <L x="180" y="286" size={10} fill={MUTED}>Superv.</L>

        <L x="180" y="330" size={12} fill={N}>Total Headcount: High</L>
        <L x="180" y="350" size={12} fill={N}>Skill Level: Moderate</L>
      </g>

      {/* After */}
      <g className="aimm-insert aimm-delay-1">
        <rect x="540" y="70" width="160" height="200" fill={WHITE} stroke={MUTED} />
        <L x="620" y="90" size={13} fill={N} weight={700}>After Automation</L>
        
        <rect x="560" y="110" width="120" height="25" fill={SKY} stroke={BLUE} />
        <L x="620" y="127" size={11} fill={N} weight={700}>Operation</L>

        <rect x="560" y="135" width="120" height="35" fill={CREAM} stroke={AMBER} />
        <L x="620" y="157" size={11} fill={N} weight={700}>Exception Hndl.</L>

        <rect x="560" y="170" width="120" height="35" fill={CREAM} stroke={TEAL} />
        <L x="620" y="192" size={11} fill={N} weight={700}>Maintenance</L>

        <rect x="560" y="205" width="120" height="30" fill={CREAM} stroke={GREEN} />
        <L x="620" y="224" size={11} fill={N} weight={700}>Programming</L>
        
        <rect x="560" y="235" width="120" height="25" fill={CREAM} stroke={PURP} />
        <L x="620" y="252" size={11} fill={N} weight={700}>Diagnosis</L>

        <L x="620" y="290" size={12} fill={N}>Total Headcount: Lower</L>
        <L x="620" y="310" size={12} fill={GREEN} weight={800}>Skill Level: Higher</L>
      </g>

      {/* Arrows tracing the shift */}
      <g className="aimm-insert aimm-delay-2">
        <Wire d="M260 160 L540 125" stroke={BLUE} width="2" marker="url(#aimArrB)" opacity="0.4" />
        <Wire d="M260 265 L540 190" stroke={TEAL} width="2" marker="url(#aimArrT)" />
        <Wire d="M260 280 L540 245" stroke={PURP} width="2" marker="url(#aimArrP)" />
      </g>

      {/* Training implication panel */}
      <g className="aimm-insert aimm-delay-3">
        <rect x="100" y="380" width="600" height="110" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="400" y="405" size={13} fill={N} weight={800}>TRAINING IMPLICATIONS OF NEW ROLES</L>
        
        <g transform="translate(120, 430)">
          <L x="0" y="0" size={11} fill={AMBER} weight={700} anchor="start">Exception Handling:</L>
          <L x="120" y="0" size={11} fill={N} anchor="start">Requires deep system understanding, not just task repetition.</L>
          
          <L x="0" y="20" size={11} fill={TEAL} weight={700} anchor="start">Maintenance:</L>
          <L x="120" y="20" size={11} fill={N} anchor="start">Downtime is vastly more expensive; requires multidisciplinary skill.</L>
          
          <L x="0" y="40" size={11} fill={GREEN} weight={700} anchor="start">Programming:</L>
          <L x="120" y="40" size={11} fill={N} anchor="start">Entirely new capability required to set up the automated line.</L>
        </g>
      </g>
    </Scene>
  )
}

export function M5AggregateAgainstIndividualScene() {
  return (
    <Scene caption="Automation raises aggregate productivity, but the skills transition falls on individuals">
      {/* Aggregate Chart */}
      <L x="250" y="35" size={15} fill={BLUE} weight={800}>AGGREGATE VIEW (MACRO)</L>
      
      <g className="aimm-insert">
        <rect x="40" y="50" width="400" height="240" rx="8" fill={WHITE} stroke={MUTED} />
        <Axes x="80" y="250" w="320" h="160" xLabel="Time (Decades)" yLabel="Index" origin="left" />
        
        {/* Output rising */}
        <Curve pts={[[80, 210], [200, 180], [300, 140], [380, 100]]} stroke={GREEN} width="3" />
        <L x="390" y="100" size={11} fill={GREEN} anchor="start" weight={700}>Output</L>
        
        {/* Employment falling */}
        <Curve pts={[[80, 210], [200, 220], [300, 235], [380, 240]]} stroke={RED} width="3" />
        <L x="390" y="240" size={11} fill={RED} anchor="start" weight={700}>Employment</L>
        
        {/* Divergence shaded */}
        <path d="M80 210 L200 180 L300 140 L380 100 L380 240 L300 235 L200 220 Z" fill={GREEN} opacity="0.1" />
        <L x="230" y="160" size={12} fill={GREEN} weight={800}>PRODUCTIVITY GROWTH</L>
        <L x="230" y="175" size={11} fill={MUTED}>(Output per worker rises)</L>
      </g>

      {/* Individual Chart */}
      <L x="650" y="35" size={15} fill={BLUE} weight={800}>INDIVIDUAL VIEW (MICRO)</L>

      <g className="aimm-insert aimm-delay-1">
        <rect x="460" y="50" width="400" height="240" rx="8" fill={WHITE} stroke={MUTED} />
        
        <Block x="490" y="80" w="130" h="60" label="Displaced Worker" sub="Manual Skills" stroke={RED} />
        <Block x="710" y="80" w="130" h="60" label="New Vacancy" sub="Programming Skills" stroke={GREEN} />
        
        <Wire d="M555 140 L555 180 L665 180 L665 210" stroke={RED} marker="url(#aimArrR)" />
        <Wire d="M775 140 L775 180 L665 180 L665 210" stroke={GREEN} marker="url(#aimArrG)" />
        
        <rect x="585" y="210" width="160" height="40" rx="4" fill={CREAM} stroke={AMBER} />
        <L x="665" y="235" size={12} fill={AMBER} weight={800}>THE TRANSITION PROBLEM</L>
        
        <L x="665" y="270" size={11} fill={N}>The workers displaced and the workers</L>
        <L x="665" y="285" size={11} fill={N}>hired are frequently not the same people.</L>
      </g>

      {/* Policy panel */}
      <g className="aimm-insert aimm-delay-2">
        <rect x="150" y="320" width="600" height="150" rx="8" fill={WHITE} stroke={MUTED} />
        <L x="450" y="350" size={14} fill={N} weight={800}>POLICY RESPONSES TO THE TRANSITION</L>
        
        <g transform="translate(180, 380)">
          <L x="0" y="0" size={12} fill={BLUE} weight={700} anchor="start">Retraining:</L>
          <L x="120" y="0" size={12} fill={N} anchor="start">Equips individuals for new roles, but difficult mid-career.</L>
          
          <L x="0" y="25" size={12} fill={BLUE} weight={700} anchor="start">Phased Introduction:</L>
          <L x="120" y="25" size={12} fill={N} anchor="start">Allows natural attrition to handle employment drops.</L>
          
          <L x="0" y="50" size={12} fill={BLUE} weight={700} anchor="start">Redeployment:</L>
          <L x="120" y="50" size={12} fill={N} anchor="start">Moving workers within the firm to unaffected departments.</L>
        </g>
        <L x="450" y="455" size={12} fill={RED} weight={700}>Regardless of policy, the transition burden falls heavily on the individual.</L>
      </g>
    </Scene>
  )
}

export function M5CourseSynthesisMapScene() {
  return (
    <Scene caption="The same discipline applies throughout, and reducing variation is worth more than adding capability">
      {/* Central Discipline Block */}
      <g className="aimm-insert">
        <rect x="340" y="160" width="220" height="200" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="3" />
        <L x="450" y="195" size={14} fill={BLUE} weight={800}>THE COURSE DISCIPLINE</L>
        <rect x="350" y="210" width="200" height="140" rx="6" fill={SKY} />
        <L x="450" y="240" size={12} fill={N} weight={700}>1. Understand the system</L>
        <L x="450" y="270" size={12} fill={N} weight={700}>2. Simplify before automating</L>
        <L x="450" y="300" size={12} fill={N} weight={700}>3. Allocate (People vs Machine)</L>
        <L x="450" y="330" size={12} fill={N} weight={700}>4. Compute (Does it pay?)</L>
      </g>

      {/* Technology Blocks */}
      <g className="aimm-insert aimm-delay-1">
        <Block x="450" y="40" w="160" h="50" label="Mod 1: Quality" stroke={MUTED} />
        <Wire d="M450 90 L450 160" stroke={BLUE} width="2" markerEnd="url(#aimArrB)" />
        <L x="460" y="130" size={11} fill={BLUE} anchor="start">Is the process stable?</L>
      </g>

      <g className="aimm-insert aimm-delay-2">
        <Block x="740" y="160" w="160" h="50" label="Mod 2: Assembly" stroke={MUTED} />
        <Wire d="M740 185 L560 185" stroke={BLUE} width="2" markerEnd="url(#aimArrB)" />
        <L x="650" y="175" size={11} fill={BLUE}>Can it be simplified?</L>
      </g>

      <g className="aimm-insert aimm-delay-3">
        <Block x="740" y="310" w="160" h="50" label="Mod 3: Robotics" stroke={MUTED} />
        <Wire d="M740 335 L560 335" stroke={BLUE} width="2" markerEnd="url(#aimArrB)" />
        <L x="650" y="325" size={11} fill={BLUE}>Does it need judgement?</L>
      </g>

      <g className="aimm-insert aimm-delay-4">
        <Block x="450" y="430" w="160" h="50" label="Mod 4: CNC &amp; CMM" stroke={MUTED} />
        <Wire d="M450 430 L450 360" stroke={BLUE} width="2" markerEnd="url(#aimArrB)" />
        <L x="460" y="390" size={11} fill={BLUE} anchor="start">Is it flexible enough?</L>
      </g>

      <g className="aimm-insert aimm-delay-5">
        <Block x="160" y="235" w="160" h="50" label="Mod 5: Additive Mfg" stroke={MUTED} />
        <Wire d="M160 260 L340 260" stroke={BLUE} width="2" markerEnd="url(#aimArrB)" />
        <L x="250" y="250" size={11} fill={BLUE}>Are there economies of scale?</L>
      </g>

      {/* Variation Layer */}
      <g className="aimm-insert aimm-delay-6">
        <path d="M450 90 Q650 140 740 210 T740 310 Q650 400 450 430 Q250 400 160 285 Q250 140 450 90" fill="none" stroke={RED} strokeWidth="3" strokeDasharray="6 4" opacity="0.6" className="aimm-pulse" />
        
        <rect x="580" y="60" width="140" height="30" fill={WHITE} stroke={RED} />
        <L x="650" y="78" size={10} fill={RED}>Assumption behind sampling</L>
        
        <rect x="800" y="230" width="90" height="30" fill={WHITE} stroke={RED} />
        <L x="845" y="248" size={10} fill={RED}>Jams assembly</L>
        
        <rect x="740" y="390" width="110" height="30" fill={WHITE} stroke={RED} />
        <L x="795" y="408" size={10} fill={RED}>Exception for robot</L>
        
        <rect x="230" y="410" width="110" height="30" fill={WHITE} stroke={RED} />
        <L x="285" y="428" size={10} fill={RED}>Drift inspection catches</L>
        
        <rect x="130" y="160" width="150" height="30" fill={WHITE} stroke={RED} />
        <L x="205" y="178" size={10} fill={RED}>Ends unattended operation</L>
        
        <L x="450" y="110" size={12} fill={RED} weight={800}>THE RECURRING OBSTACLE: UNANTICIPATED VARIATION</L>
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
        <g key={String(st)} className={`aimm-slide-in aimm-delay-${i}`}>
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
      <g className="aimm-emerge">
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
  // Module 2 — Line Balancing and Automated Assembly Systems
  'assembly-line-paced-by-slowest': M2AssemblyLinePacedScene,
  'repositioning-and-pacing': M2RepositioningPacingScene,
  'precedence-diagram-and-balance-delay': M2PrecedenceDiagramScene,
  'largest-candidate-walkthrough': M2LargestCandidateScene,
  'kilbridge-column-construction': M2KilbridgeColumnScene,
  'positional-weight-computation': M2PositionalWeightScene,
  'three-methods-same-problem': M2ThreeMethodsScene,
  'computerised-balancing-search': M2ComputerisedSearchScene,
  'design-for-assembly-before-after': M2DesignForAssemblyScene,
  'four-assembly-configurations': M2FourConfigurationsScene,
  'parts-delivery-five-elements': M2PartsDeliveryScene,
  'vibratory-bowl-feeder-cutaway': M2BowlFeederScene,
  'single-station-cycle-with-jams': M2SingleStationCycleScene,
  'multi-station-jam-propagation': M2MultiStationJamScene,
  'buffer-decoupling-effect': M2BufferDecouplingScene,
  'module-two-synthesis': M2SynthesisScene,
  // Module 3 — Computerised Manufacture Planning, AGVS and Industrial Robotics
  'design-to-route-sheet': M3DesignToRouteSheetScene,
  'variant-capp-retrieval-flow': M3VariantCappRetrievalFlowScene,
  'generative-capp-derivation': M3GenerativeCappDerivationScene,
  'capp-benefits-and-downstream': M3CappBenefitsAndDownstreamScene,
  'mrp-three-inputs': M3MrpThreeInputsScene,
  'mrp-time-phased-record': M3MrpTimePhasedRecordScene,
  'mrp-outputs-fan': M3MrpOutputsFanScene,
  'agv-three-types': M3AgvThreeTypesScene,
  'guidance-technologies-comparison': M3GuidanceTechnologiesComparisonScene,
  'robot-anatomy-labelled': M3RobotAnatomyLabelledScene,
  'five-robot-configurations': M3FiveRobotConfigurationsScene,
  'control-hierarchy-four-levels': M3ControlHierarchyFourLevelsScene,
  'accuracy-versus-repeatability-targets': M3AccuracyVersusRepeatabilityTargetsScene,
  'end-effector-and-sensor-families': M3EndEffectorAndSensorFamiliesScene,
  'four-application-families': M3FourApplicationFamiliesScene,
  'module-three-chain': M3ModuleThreeChainScene,
  // Module 1 — Production Systems, Automation and Manufacturing Operations
  'production-system-two-halves': M1ProductionSystemTwoHalvesScene,
  'quantity-variety-layout-map': M1QuantityVarietyLayoutMapScene,
  'support-system-information-cycle': M1SupportSystemInformationCycleScene,
  'three-automation-types-comparison': M1ThreeAutomationTypesComparisonScene,
  'when-not-to-automate-balance': M1WhenNotToAutomateBalanceScene,
  'usa-principle-three-steps': M1USAPrincipleThreeStepsScene,
  'ten-strategies-checklist': M1TenStrategiesChecklistScene,
  'migration-three-phases-timeline': M1MigrationThreePhasesTimelineScene,
  'operations-classification-tree': M1OperationsClassificationTreeScene,
  'hard-versus-soft-variety': M1HardVersusSoftVarietyScene,
  'cycle-time-and-batch-size': M1CycleTimeAndBatchSizeScene,
  'capacity-utilisation-availability-bars': M1CapacityUtilisationAvailabilityBarsScene,
  'cost-per-piece-buildup': M1CostPerPieceBuildupScene,
  'worked-problem-method': M1WorkedProblemMethodScene,
  'break-even-comparison': M1BreakEvenComparisonScene,
  'module-one-decision-chain': M1ModuleOneDecisionChainScene,
  // Module 4 — Inspection Technologies and Shop Floor Control
  'inspection-purpose-and-placement': M4InspectionPurposeScene,
  'sampling-versus-hundred-percent': M4SamplingVersusHundredScene,
  'automated-inspection-data-stream': M4AutomatedDataStreamScene,
  'three-inspection-timings': M4ThreeInspectionTimingsScene,
  'contact-versus-noncontact-comparison': M4ContactVersusNoncontactScene,
  'cmm-configurations': M4CMMConfigurationsScene,
  'cmm-alignment-and-program': M4CMMAlignmentScene,
  'cmm-software-fitting': M4CMMSoftwareFittingScene,
  'flexible-inspection-cell': M4FlexibleInspectionCellScene,
  'machine-probe-three-uses': M4MachineProbeUsesScene,
  'vision-lighting-arrangements': M4VisionLightingScene,
  'vision-processing-pipeline': M4VisionPipelineScene,
  'optical-methods-four': M4OpticalMethodsScene,
  'non-optical-methods-subsurface': M4NonOpticalMethodsScene,
  'shop-floor-control-loop': M4ShopFloorControlLoopScene,
  'identification-technologies-compared': M4IdentificationTechnologiesScene,
  // Module 5 — Additive Manufacturing Systems and the Future Automated Factory
  'layer-by-layer-build-principle': M5LayerByLayerBuildPrincipleScene,
  'eight-step-process-chain': M5EightStepProcessChainScene,
  'additive-subtractive-comparison': M5AdditiveSubtractiveComparisonScene,
  'tessellation-and-chord-height': M5TessellationAndChordHeightScene,
  'slicing-layer-thickness-staircase': M5SlicingLayerThicknessStaircaseScene,
  'six-process-families': M5SixProcessFamiliesScene,
  'advantages-with-consolidation-example': M5AdvantagesWithConsolidationExampleScene,
  'limitations-with-crossover': M5LimitationsWithCrossoverScene,
  'selection-funnel': M5SelectionFunnelScene,
  'design-for-am-avoid-and-exploit': M5DesignForAmAvoidAndExploitScene,
  'hybrid-manufacturing-sequence': M5HybridManufacturingSequenceScene,
  'digital-thread-and-trends': M5DigitalThreadAndTrendsScene,
  'lights-out-conditions-and-obstacles': M5LightsOutConditionsAndObstaclesScene,
  'changing-work-content': M5ChangingWorkContentScene,
  'aggregate-against-individual': M5AggregateAgainstIndividualScene,
  'course-synthesis-map': M5CourseSynthesisMapScene,
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

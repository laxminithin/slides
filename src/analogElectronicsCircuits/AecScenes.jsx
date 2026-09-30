/**
 * AecScenes — VTU 1BEE302 Analog Electronics Circuits classroom SVG visuals.
 *
 * Every scene animates something the syllabus asks students to reproduce with
 * a pencil: a depletion region widening under reverse bias, a Q-point sliding
 * along a load line as beta changes, a Bode plot breaking at a pole, a
 * Miller capacitance swelling by (1 + A). Motion carries meaning — nothing
 * here moves purely for decoration.
 *
 * Phase 1 wrote one `visualSpec` paragraph per unit; VISUAL_MAP at the end of
 * this file binds each of the 80 `visual` ids to the scene that realises it.
 */

/* Role names, not colour names: SIG is the small signal, BIAS is the DC
   operating point, COOL is the frequency-response ground and GOLD is the
   device parameter under discussion. */
const N = '#241b2e'
const SIG = '#7e22ce'
const ROSE = '#be123c'
const GOLD = '#ca8a04'
const BIAS = '#ea580c'
const GREEN = '#059669'
const COOL = '#0891b2'
const RED = '#dc2626'
const MUTED = '#6b6076'
const CREAM = '#fffcf9'
const SKY = '#f4e9fd'
const WHITE = '#ffffff'
const MONO = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace'

export const PALETTE = { N, SIG, ROSE, GOLD, BIAS, GREEN, COOL, RED, MUTED, CREAM, SKY }

/* JSX attributes arrive as strings when written `y="200"`, and `"200" + 11`
   is "20011", not 211 — which silently throws geometry off the canvas. Every
   helper below that does arithmetic on a coordinate prop coerces first. */
const n = (v) => Number(v)

/* ── Shell ──────────────────────────────────────────────────────── */

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`aec-scene ${className}`} aria-label={caption || 'Analog Electronics Circuits diagram'}>
      <svg viewBox={vb} role="img" className="aec-svg">
        <defs>
          <marker id="aecArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="aecArrS" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={SIG} />
          </marker>
          <marker id="aecArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BIAS} />
          </marker>
          <marker id="aecArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="aecArrGr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="aecArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GOLD} />
          </marker>
          <marker id="aecArrC" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={COOL} />
          </marker>
          <marker id="aecArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="aecArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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
  if (tone === SIG) return 'aecArrS'
  if (tone === BIAS) return 'aecArrB'
  if (tone === ROSE) return 'aecArrRo'
  if (tone === GREEN) return 'aecArrGr'
  if (tone === GOLD) return 'aecArrG'
  if (tone === COOL) return 'aecArrC'
  if (tone === RED) return 'aecArrR'
  if (tone === MUTED) return 'aecArrM'
  return 'aecArr'
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
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#aecArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#aecArr)" />
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
function Curve({ pts = [], stroke = SIG, width = 2.8, className = '', dash, opacity }) {
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

function Wave({ x, y, w, amp, cycles = 3, phase = 0, stroke = SIG, width = 2.4, className = '', dash, opacity }) {
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
function Block({ x, y, w, h, label, sub, stroke = SIG, fill = WHITE, className = '', labelFill = N, mono = false, size }) {
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
function Ind({ x, y, len = 72, orient = 'h', label, tone = GOLD, className = '', labelSide = 'up' }) {
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
function Cap({ x, y, len = 60, orient = 'h', label, tone = COOL, className = '', plate = 20, labelSide = 'up' }) {
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
function Src({ cx, cy, r = 21, kind = 'v', label, tone = SIG, className = '', dep = false, labelDy = 0, labelSide = 'left' }) {
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
      <path d={`M${half ? C : C - R} ${Y} L${C + R + 8} ${Y}`} stroke={tone} strokeWidth="2.2" markerEnd="url(#aecArr)" fill="none" />
      <path d={`M${C} ${Y + R} L${C} ${Y - R - 8}`} stroke={tone} strokeWidth="2.2" markerEnd="url(#aecArr)" fill="none" />
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
function Phasor({ ox, oy, ang = 0, len = 90, label, tone = SIG, className = '', width = 3, labelGap = 16, dash }) {
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

/** Labelled key/value panel — the numbers a worked example turns on. */
function Panel({ x, y, w = 250, title, rows = [], accent = SIG, className = '', mono = false, rowH = 27 }) {
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
function Card({ x, y, w, h, title, lines = [], accent = SIG, className = '', mono = false, foot, footTone = RED, children, linesY = 54, lineH = 19 }) {
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
function Bars({ x, y, w, items = [], accent = SIG, rowH = 34, className = 'aecm-bar', max }) {
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
          <g className={`${className} aecm-delay-${i % 5}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
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
  const beats = ['Rectify', 'Bias', 'Amplify', 'Feed back', 'Switch']
  return (
    <Scene caption={question || 'From the p-n junction to a working amplifier'}>
      <rect x="40" y="36" width="820" height="410" rx="16" fill={WHITE} stroke={SIG} strokeWidth="3" />
      <L x="450" y="104" size={18} fill={SIG}>{`MODULE ${module} · VTU 1BEE302`}</L>
      <L x="450" y="162" size={25}>
        {title || `Module ${module}`}
      </L>
      <L x="450" y="208" size={14.5} fill={MUTED} weight={700}>
        {question || 'Bias it first; only then does the gain mean anything'}
      </L>
      {beats.map((t, i) => (
        <Block
          key={t}
          x={70 + i * 154}
          y={264}
          w={134}
          h={68}
          label={t}
          stroke={i === module - 1 ? BIAS : SIG}
          className={`aecm-flux aecm-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={SIG}
          className={`aecm-current aecm-delay-${i}`}
          marker="url(#aecArrS)"
        />
      ))}
      {hours ? <L x="450" y="396" size={14} fill={MUTED} weight={700}>{`${hours} teaching hours`}</L> : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Redraw the stage from memory — DC bias first, then the small-signal model">
      <L x="450" y="86" size={19} fill={SIG}>{`MODULE ${module} COMPLETE`}</L>
      <L x="450" y="140" size={24}>
        {title || 'Module complete'}
      </L>
      {['Draw the DC circuit and find the Q-point', 'Check the device is in the right region', 'Redraw as the small-signal model', 'Compute gain, Zin and Zout', 'Sanity-check against the supply rail'].map((t, i) => (
        <g key={t} className={`aecm-cell-in aecm-delay-${i}`}>
          <Block x={64} y={190 + i * 52} w={772} h={44} label={t} stroke={i % 2 ? GREEN : SIG} />
        </g>
      ))}
    </Scene>
  )
}

export function ConceptBoard({ title = 'Concept', points = [] }) {
  const rows = points.slice(0, 6)
  return (
    <Scene caption="Key terms for this unit">
      <Block x="60" y="52" w="780" h="58" label={title} stroke={SIG} />
      {rows.map((p, i) => (
        <g key={String(p)} className={`aecm-cell-in aecm-delay-${i % 5}`}>
          <rect x="60" y={134 + i * 58} width="780" height="46" rx="9" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="92" cy={157 + i * 58} r="8" fill={i % 2 ? BIAS : SIG} />
          <L x="118" y={163 + i * 58} size={16} anchor="start">
            {String(p)}
          </L>
        </g>
      ))}
    </Scene>
  )
}

/* ── Generic multi-purpose layouts ──────────────────────────────── */

export function PipelineScene({ steps = [], title = 'Procedure', accent = SIG }) {
  const rows = steps.slice(0, 5)
  return (
    <Scene caption={`${title} — in this order, every time`}>
      <Wire d="M450 74 L450 440" stroke={MUTED} width="3" dash="9 8" />
      {rows.map((step, i) => (
        <g key={String(step)} className={`aecm-slide-in aecm-delay-${i}`}>
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
              style={{ font: '600 13.5px/1.28 system-ui,sans-serif', color: '#241b2e', display: 'flex', alignItems: 'center', height: '100%' }}
            >
              {String(step)}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

export function TwoCaseScene({ left, right, caption = 'Two cases, two different answers', leftTone = SIG, rightTone = BIAS }) {
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
        <g key={String(p)} className={`aecm-cell-in aecm-delay-${i}`}>
          <circle cx="92" cy={156 + i * 56} r="7" fill={leftTone} />
          <foreignObject x="112" y={134 + i * 56} width="316" height="46">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13.5px/1.3 system-ui,sans-serif', color: '#241b2e' }}>
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
        <g key={String(p)} className={`aecm-cell-in aecm-delay-${i}`}>
          <circle cx="492" cy={156 + i * 56} r="7" fill={rightTone} />
          <foreignObject x="512" y={134 + i * 56} width="316" height="46">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13.5px/1.3 system-ui,sans-serif', color: '#241b2e' }}>
              {String(p)}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

/** Three cards on a common baseline — the shape half the Phase-1 specs ask for. */
export function CardTriadScene({ caption, cards = [], tones = [SIG, BIAS, GOLD] }) {
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
          className={`aecm-slide-in aecm-delay-${i}`}
          mono={c.mono}
        />
      ))}
    </Scene>
  )
}

/** A vertical comparison ladder — rows of label / value / verdict. */
export function LadderScene({ caption, title = 'Comparison', rows = [], accent = SIG }) {
  return (
    <Scene caption={caption}>
      <rect x="56" y="58" width="788" height="40" rx="10" fill={accent} />
      <L x="450" y="85" size={14.5} fill={WHITE}>
        {title}
      </L>
      {rows.slice(0, 6).map((row, i) => {
        const [label, value, note, tone] = row
        return (
          <g key={`${label}-${i}`} className={`aecm-cell-in aecm-delay-${i % 5}`}>
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

/* ── Semiconductor devices ──────────────────────────────────────── */

/** Diode drawn anode-to-cathode along +x (rotate with `rot` for other
 *  orientations). `kind` swaps in the Zener bend or the LED arrows. */
function Diode({ x, y, len = 66, rot = 0, label, tone = SIG, kind = 'pn', className = '' }) {
  const [X, Y, Ln] = [n(x), n(y), n(len)]
  const h = 13
  const bar = kind === 'zener' ? `M${-3} ${-h} L${9} ${-h} M${9} ${-h} L${9} ${h} M${9} ${h} L${-3} ${h}` : `M9 ${-h} L9 ${h}`
  return (
    <g transform={`translate(${X},${Y}) rotate(${n(rot)})`}>
      <g className={className}>
        <path d={`M${-Ln / 2} 0 L${-10} 0`} stroke={tone} strokeWidth="2.6" fill="none" />
        <path d={`M${-10} ${-h} L9 0 L${-10} ${h} Z`} fill={tone} fillOpacity="0.18" stroke={tone} strokeWidth="2.6" strokeLinejoin="round" />
        <path d={bar} stroke={tone} strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d={`M9 0 L${Ln / 2} 0`} stroke={tone} strokeWidth="2.6" fill="none" />
        {kind === 'led' ? (
          <g>
            <path d="M2 -20 L14 -32" stroke={tone} strokeWidth="2" markerEnd={`url(#${markerFor(tone)})`} fill="none" />
            <path d="M12 -18 L24 -30" stroke={tone} strokeWidth="2" markerEnd={`url(#${markerFor(tone)})`} fill="none" />
          </g>
        ) : null}
      </g>
      {label ? (
        <M x={0} y={kind === 'led' ? 34 : -22} size={12} fill={tone} weight={800}>
          {label}
        </M>
      ) : null}
    </g>
  )
}

/**
 * Bipolar transistor. `kind` is 'npn' or 'pnp'; the only visual difference is
 * which way the emitter arrow points, and that is the whole exam question.
 * Terminals: base at (cx − 34, cy), collector (cx + 22, cy − 40), emitter
 * (cx + 22, cy + 40).
 */
function Bjt({ cx, cy, kind = 'npn', label = 'Q1', tone = N, className = '', ring = true }) {
  const [C, Y] = [n(cx), n(cy)]
  // The emitter arrowhead is drawn explicitly: an SVG marker scales with the
  // stroke width, and at 2.8 that produced a 25px triangle on a 34px symbol.
  const arrow = `M${C + 6} ${Y + 18} L${C + 22} ${Y + 40}`
  const head = kind === 'npn'
    ? `M${C + 22} ${Y + 40} L${C + 10} ${Y + 34} L${C + 17} ${Y + 26} Z`
    : `M${C + 6} ${Y + 18} L${C + 18} ${Y + 24} L${C + 11} ${Y + 32} Z`
  return (
    <g>
      <g className={className}>
        {ring ? <circle cx={C} cy={Y} r="34" fill={WHITE} stroke={tone} strokeWidth="2.2" opacity="0.85" /> : null}
        <path d={`M${C - 34} ${Y} L${C - 6} ${Y}`} stroke={tone} strokeWidth="2.8" fill="none" />
        <path d={`M${C - 6} ${Y - 22} L${C - 6} ${Y + 22}`} stroke={tone} strokeWidth="3.4" fill="none" strokeLinecap="round" />
        <path d={`M${C - 6} ${Y - 18} L${C + 22} ${Y - 40}`} stroke={tone} strokeWidth="2.8" fill="none" />
        <path d={arrow} stroke={tone} strokeWidth="2.8" fill="none" />
        <path d={head} fill={tone} stroke={tone} strokeWidth="1.6" strokeLinejoin="round" />
      </g>
      <M x={C + 44} y={Y + 4} size={11.5} fill={tone} anchor="start" weight={800}>
        {label}
      </M>
      <M x={C - 44} y={Y - 8} size={10} fill={MUTED} anchor="end">
        B
      </M>
      <M x={C + 32} y={Y - 42} size={10} fill={MUTED} anchor="start">
        C
      </M>
      <M x={C + 32} y={Y + 50} size={10} fill={MUTED} anchor="start">
        E
      </M>
    </g>
  )
}

/**
 * Field-effect transistor. `kind` is 'jfet', 'demos' (depletion MOSFET, solid
 * channel) or 'emos' (enhancement MOSFET, broken channel). `p` flips the gate
 * arrow for p-channel. Terminals: gate (cx − 40, cy), drain (cx + 24, cy − 42),
 * source (cx + 24, cy + 42).
 */
function Fet({ cx, cy, kind = 'jfet', p = false, label = 'M1', tone = N, className = '' }) {
  const [C, Y] = [n(cx), n(cy)]
  const channel = kind === 'emos'
    ? `M${C - 4} ${Y - 34} L${C - 4} ${Y - 14} M${C - 4} ${Y - 8} L${C - 4} ${Y + 8} M${C - 4} ${Y + 14} L${C - 4} ${Y + 34}`
    : `M${C - 4} ${Y - 34} L${C - 4} ${Y + 34}`
  const gateArrow = kind === 'jfet'
    ? (p ? `M${C - 22} ${Y} L${C - 40} ${Y}` : `M${C - 40} ${Y} L${C - 22} ${Y}`)
    : (p ? `M${C - 30} ${Y} L${C - 12} ${Y}` : `M${C - 12} ${Y} L${C - 30} ${Y}`)
  return (
    <g>
      <g className={className}>
        <path d={channel} stroke={tone} strokeWidth="3.4" fill="none" strokeLinecap="round" />
        {kind === 'jfet' ? (
          <path d={`M${C - 40} ${Y} L${C - 6} ${Y}`} stroke={tone} strokeWidth="2.8" fill="none" />
        ) : (
          <g>
            <path d={`M${C - 16} ${Y - 34} L${C - 16} ${Y + 34}`} stroke={tone} strokeWidth="2.8" fill="none" />
            <path d={`M${C - 40} ${Y} L${C - 16} ${Y}`} stroke={tone} strokeWidth="2.8" fill="none" />
          </g>
        )}
        <path d={gateArrow} stroke={tone} strokeWidth="2.6" fill="none" markerEnd={`url(#${markerFor(tone)})`} />
        <path d={`M${C - 4} ${Y - 28} L${C + 24} ${Y - 28} L${C + 24} ${Y - 42}`} stroke={tone} strokeWidth="2.8" fill="none" />
        <path d={`M${C - 4} ${Y + 28} L${C + 24} ${Y + 28} L${C + 24} ${Y + 42}`} stroke={tone} strokeWidth="2.8" fill="none" />
      </g>
      <M x={C + 44} y={Y + 4} size={11.5} fill={tone} anchor="start" weight={800}>
        {label}
      </M>
      <M x={C - 46} y={Y - 8} size={10} fill={MUTED} anchor="end">
        G
      </M>
      <M x={C + 32} y={Y - 46} size={10} fill={MUTED} anchor="start">
        D
      </M>
      <M x={C + 32} y={Y + 54} size={10} fill={MUTED} anchor="start">
        S
      </M>
    </g>
  )
}

/** Centre-tapped or plain transformer, drawn with its core rules. */
function Xformer({ cx, cy, h = 90, tone = COOL, className = '', tap = false }) {
  const [C, Y, H] = [n(cx), n(cy), n(h)]
  const coil = (x, dir) => {
    const parts = [`M${x} ${Y - H / 2}`]
    const r = H / 8
    for (let i = 0; i < 4; i += 1) {
      parts.push(`A${r} ${r} 0 0 ${dir} ${x} ${(Y - H / 2 + (i + 1) * 2 * r).toFixed(1)}`)
    }
    return parts.join(' ')
  }
  return (
    <g className={className}>
      <path d={coil(C - 14, 1)} fill="none" stroke={tone} strokeWidth="2.6" />
      <path d={coil(C + 14, 0)} fill="none" stroke={tone} strokeWidth="2.6" />
      <path d={`M${C - 4} ${Y - H / 2 - 4} L${C - 4} ${Y + H / 2 + 4} M${C + 4} ${Y - H / 2 - 4} L${C + 4} ${Y + H / 2 + 4}`} stroke={MUTED} strokeWidth="2.2" />
      {tap ? <path d={`M${C + 14} ${Y} L${C + 46} ${Y}`} stroke={tone} strokeWidth="2.4" fill="none" /> : null}
    </g>
  )
}

/** An op-amp triangle, used only where the syllabus draws a block amplifier. */
function AmpTri({ cx, cy, w = 90, h = 76, label = 'A', tone = SIG, className = '' }) {
  const [C, Y, W, H] = [n(cx), n(cy), n(w), n(h)]
  return (
    <g className={className}>
      <path d={`M${C - W / 2} ${Y - H / 2} L${C + W / 2} ${Y} L${C - W / 2} ${Y + H / 2} Z`} fill={WHITE} stroke={tone} strokeWidth="2.6" strokeLinejoin="round" />
      <M x={C - W / 6} y={Y + 6} size={15} fill={tone} weight={800}>
        {label}
      </M>
    </g>
  )
}

/**
 * A straight DC load line across an output-characteristic plot, with the
 * Q-point marked on it. `box` is [x, y, w, h] with y the VCE axis baseline.
 */
function LoadLine({ box, qx = 0.5, tone = BIAS, label = 'Q', className = '', showQ = true }) {
  const [X, Y, W, H] = box.map(n)
  return (
    <g>
      <Wire d={`M${X} ${Y - H} L${X + W} ${Y}`} stroke={tone} width="3" className={className} />
      <M x={X + W - 8} y={Y - 12} size={10.5} fill={tone} anchor="end" weight={800}>
        VCC
      </M>
      <M x={X + 10} y={Y - H - 8} size={10.5} fill={tone} anchor="start" weight={800}>
        VCC/RC
      </M>
      {showQ ? (
        <g className="aecm-pop">
          <Dot cx={X + W * qx} cy={Y - H * (1 - qx)} r="8" fill={tone} />
          <M x={X + W * qx + 14} y={Y - H * (1 - qx) - 8} size={11.5} fill={tone} anchor="start" weight={800}>
            {label}
          </M>
        </g>
      ) : null}
    </g>
  )
}

/** Output characteristic family: `n` curves of IC against VCE, each flattening
 *  after the knee. This is the backdrop every load line is drawn on. */
function OutputFamily({ x, y, w, h, count = 5, tone = MUTED, knee = 0.12 }) {
  const [X, Y, W, H] = [n(x), n(y), n(w), n(h)]
  return (
    <g>
      {Array.from({ length: count }, (_, k) => {
        const lvl = ((k + 1) / count) * H * 0.88
        const pts = []
        for (let i = 0; i <= 40; i += 1) {
          const t = i / 40
          const rise = Math.min(1, t / knee)
          pts.push([X + t * W, Y - lvl * rise * (1 + 0.08 * t)])
        }
        return <Curve key={k} pts={pts} stroke={tone} width="2" opacity="0.72" />
      })}
    </g>
  )
}

/* ── Module 1 — diodes, their circuits, and the BJT ─────────────── */

export function DopingLatticeScene() {
  const lattice = (ox, oy, tone) =>
    Array.from({ length: 9 }, (_, k) => {
      const r = Math.floor(k / 3)
      const c = k % 3
      return <circle key={k} cx={ox + c * 58} cy={oy + r * 58} r="11" fill={WHITE} stroke={tone} strokeWidth="2" />
    })
  const bonds = (ox, oy, tone) => (
    <g>
      {[0, 1, 2].map((r) => (
        <Wire key={`h${r}`} d={`M${ox + 11} ${oy + r * 58} L${ox + 105} ${oy + r * 58}`} stroke={tone} width="1.8" opacity="0.55" />
      ))}
      {[0, 1, 2].map((c) => (
        <Wire key={`v${c}`} d={`M${ox + c * 58} ${oy + 11} L${ox + c * 58} ${oy + 105}`} stroke={tone} width="1.8" opacity="0.55" />
      ))}
    </g>
  )
  return (
    <Scene caption="One impurity atom in ten million decides what the whole crystal does">
      {[
        ['intrinsic', 'broken bond → one pair', MUTED, 58],
        ['n-type', 'donor · majority: electrons', SIG, 358],
        ['p-type', 'acceptor · majority: holes', ROSE, 658],
      ].map(([title, note, tone, x], i) => (
        <g key={title} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={x - 12} y="70" width="208" height="256" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={x + 92} y="98" size={12.5} fill={tone} weight={800}>
            {title}
          </M>
          {bonds(x + 36, 140, MUTED)}
          {lattice(x + 36, 140, MUTED)}
          <M x={x + 92} y="308" size={10.5} fill={MUTED}>
            {note}
          </M>
        </g>
      ))}
      <g className="aecm-pop">
        <circle cx="94" cy="198" r="7" fill={SIG} />
        <circle cx="152" cy="256" r="7" fill="none" stroke={ROSE} strokeWidth="2.4" />
        <M x="94" y="182" size={9.5} fill={SIG} weight={800}>e⁻</M>
        <M x="152" y="278" size={9.5} fill={ROSE} weight={800}>h⁺</M>
      </g>
      <g className="aecm-pop aecm-delay-2">
        <circle cx="452" cy="198" r="13" fill={SIG} fillOpacity="0.2" stroke={SIG} strokeWidth="2.4" />
        <M x="452" y="203" size={10} fill={SIG} weight={800}>P</M>
        <circle cx="500" cy="176" r="7" fill={SIG} className="aecm-orbit" />
      </g>
      <g className="aecm-pop aecm-delay-3">
        <circle cx="752" cy="198" r="13" fill={ROSE} fillOpacity="0.2" stroke={ROSE} strokeWidth="2.4" />
        <M x="752" y="203" size={10} fill={ROSE} weight={800}>B</M>
        <circle cx="800" cy="176" r="8" fill="none" stroke={ROSE} strokeWidth="2.6" strokeDasharray="3 3" />
      </g>
      <g className="aecm-emerge">
        <rect x="200" y="356" width="500" height="50" rx="11" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="450" y="386" size={12.5} fill={GOLD} weight={800}>
          typical doping: 1 impurity atom in 10 000 000
        </M>
      </g>
    </Scene>
  )
}

export function JunctionBiasScene() {
  const junction = (y, depW, tone, tag, note, arrow) => (
    <g>
      <rect x="120" y={y - 34} width={190 - depW / 2} height="68" rx="6" fill={ROSE} fillOpacity="0.12" stroke={ROSE} strokeWidth="2" />
      <rect x={310 + depW / 2} y={y - 34} width={190 - depW / 2} height="68" rx="6" fill={SIG} fillOpacity="0.12" stroke={SIG} strokeWidth="2" />
      <rect x={310 - depW / 2} y={y - 34} width={depW} height="68" fill={MUTED} fillOpacity="0.3" stroke={MUTED} strokeWidth="1.8" />
      <M x="190" y={y - 8} size={12} fill={ROSE} weight={800}>p</M>
      <M x="430" y={y - 8} size={12} fill={SIG} weight={800}>n</M>
      {/* Only the drawn width carries the meaning — printing the pixel count
          told the student nothing. */}
      <M x={310} y={y - 44} size={9.5} fill={MUTED} weight={800}>
        depletion region
      </M>
      <M x="104" y={y + 1} size={11.5} fill={tone} anchor="end" weight={800}>
        {tag}
      </M>
      {arrow ? (
        <g className={arrow.cls}>
          <Wire d={arrow.d} stroke={arrow.tone} width={arrow.w} marker={`url(#${markerFor(arrow.tone)})`} />
        </g>
      ) : null}
      <M x={310} y={y + 52} size={10} fill={MUTED}>
        {note}
      </M>
    </g>
  )
  return (
    <Scene caption="Forward bias narrows the depletion region; reverse bias widens it. Everything follows from that">
      <g className="aecm-cell-in">
        {junction(108, 56, N, 'no bias', 'barrier ≈ 0.7 V · no net current', null)}
      </g>
      <g className="aecm-cell-in aecm-delay-2">
        {junction(232, 22, GREEN, 'forward', 'depletion narrowed · milliamps flow', {
          d: 'M170 250 L440 250',
          tone: GREEN,
          w: '3.4',
          cls: 'aecm-current aecm-delay-2',
        })}
      </g>
      <g className="aecm-cell-in aecm-delay-4">
        {junction(356, 96, RED, 'reverse', 'depletion widened · only Is, microamps', {
          d: 'M440 374 L170 374',
          tone: RED,
          w: '1.6',
          cls: 'aecm-current-slow aecm-delay-4',
        })}
      </g>

      <Card
        x="600"
        y="108"
        w="252"
        h="122"
        title="the one number to memorise"
        accent={GOLD}
        mono
        lines={['silicon barrier ≈ 0.7 V', 'germanium ≈ 0.3 V']}
        linesY={62}
        lineH={26}
        className="aecm-slide-in aecm-delay-3"
      />
      <Card
        x="600"
        y="252"
        w="252"
        h="156"
        title="what bias actually moves"
        accent={COOL}
        lines={['forward: barrier reduced', 'reverse: barrier reinforced', 'width ∝ √(barrier)']}
        linesY={62}
        lineH={28}
        className="aecm-slide-in aecm-delay-4"
      />
    </Scene>
  )
}

export function DiodeModelsScene() {
  const curve = []
  for (let i = 0; i <= 60; i += 1) {
    const v = (i / 60) * 1.05
    const ii = Math.max(0, 62 * (Math.exp((v - 0.7) * 11) - 0.03))
    curve.push([120 + v * 300, 320 - Math.min(210, ii)])
  }
  return (
    <Scene caption="Three resistances, three models — and the exam tells you which one it wants">
      <Axes x="120" y="320" w="330" h="250" xLabel="V" yLabel="I" />
      <Curve pts={curve} stroke={SIG} width="3.2" className="aecm-draw" />
      <Dot cx="345" cy="176" r="7" fill={N} />
      <Wire d="M120 320 L345 176" stroke={GOLD} width="2.4" dash="6 5" className="aecm-draw aecm-delay-1" />
      <M x="188" y="242" size={10.5} fill={GOLD} anchor="end" weight={800}>
        DC: V/I
      </M>
      <Wire d="M312 232 L382 128" stroke={BIAS} width="2.8" className="aecm-draw aecm-delay-2" />
      <M x="404" y="140" size={10.5} fill={BIAS} anchor="start" weight={800}>
        AC: 26 mV / IQ
      </M>
      <Wire d="M282 288 L410 104" stroke={COOL} width="2.2" dash="5 4" className="aecm-draw aecm-delay-3" />
      <M x="250" y="112" size={10.5} fill={COOL} anchor="start" weight={800}>
        average AC, over a swing
      </M>

      {[
        ['ideal switch', 'breaks at 0 V', GREEN, 0],
        ['constant drop', 'breaks at 0.7 V', SIG, 1],
        ['piecewise linear', '0.7 V then slope rd', COOL, 2],
      ].map(([title, note, tone, i]) => (
        <g key={title} className={`aecm-slide-in aecm-delay-${i}`}>
          <rect x="516" y={64 + i * 122} width="332" height="108" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="600" y={90 + i * 122} size={11.5} fill={tone} weight={800}>
            {title}
          </M>
          <Diode x="600" y={130 + i * 122} len="74" tone={tone} />
          {/* Idealised characteristic: flat to the break, then vertical (ideal
              and constant-drop) or sloped (piecewise linear). */}
          <Wire d={`M700 ${152 + i * 122} L836 ${152 + i * 122}`} stroke={MUTED} width="1.6" />
          <Wire d={`M700 ${152 + i * 122} L${i === 0 ? 720 : 762} ${152 + i * 122}`} stroke={tone} width="3" />
          <Wire
            d={`M${i === 0 ? 720 : 762} ${152 + i * 122} L${i === 2 ? 812 : i === 0 ? 720 : 762} ${96 + i * 122}`}
            stroke={tone}
            width="3"
          />
          <M x="768" y={172 + i * 122} size={10} fill={MUTED}>
            {note}
          </M>
        </g>
      ))}
      <M x="450" y="404" size={11.5} fill={MUTED} weight={800}>
        choose the simplest model the question tolerates
      </M>
    </Scene>
  )
}

export function ReverseRecoveryScene() {
  return (
    <Scene caption="The diode conducts backwards until the stored charge is gone — that interval is trr">
      <Wire d="M90 240 L800 240" stroke={MUTED} width="1.8" />
      <Wire d="M90 380 L90 110" stroke={MUTED} width="1.8" marker="url(#aecArr)" />
      <M x="78" y="112" size={11} fill={MUTED} anchor="end" weight={800}>
        i
      </M>
      <Wire d="M90 160 L360 160" stroke={GREEN} width="3.4" className="aecm-draw" />
      <M x="220" y="146" size={11} fill={GREEN} weight={800}>
        steady forward current
      </M>
      <Wire d="M360 160 L360 352" stroke={RED} width="3.4" className="aecm-draw aecm-delay-1" />
      <Wire d="M360 352 L470 352 L520 246 L800 240" stroke={RED} width="3.4" className="aecm-draw aecm-delay-2" />
      <path d="M360 240 L360 352 L470 352 L520 246 Z" fill={RED} fillOpacity="0.16" className="aecm-fade-in aecm-delay-2" />
      <M x="436" y="326" size={10.5} fill={RED} weight={800}>
        stored charge swept out
      </M>
      <Wire d="M360 100 L360 150" stroke={MUTED} width="1.6" dash="4 4" />
      <M x="360" y="92" size={10} fill={MUTED} weight={800}>
        switch instant
      </M>
      <g className="aecm-emerge">
        <path d="M360 400 L360 410 M360 405 L520 405 M520 400 L520 410" stroke={GOLD} strokeWidth="2.4" fill="none" />
        <M x="440" y="428" size={11.5} fill={GOLD} weight={800}>
          trr = ts + tt
        </M>
        <M x="412" y="392" size={9.5} fill={MUTED}>ts</M>
        <M x="496" y="392" size={9.5} fill={MUTED}>tt</M>
      </g>
      <Panel
        x="600"
        y="88"
        w="252"
        title="trr in practice"
        rows={[['general purpose', '2 µs'], ['fast recovery', '50 ns'], ['Schottky', '≈ 0']]}
        accent={COOL}
        className="aecm-slide-in aecm-delay-3"
      />
      <M x="726" y="216" size={10} fill={MUTED}>
        trr is what caps the switching frequency
      </M>
    </Scene>
  )
}

export function HalfWaveScene() {
  return (
    <Scene caption="Half the cycle does nothing at all — which is exactly why the average is only 0.318 Vm">
      <Wire d="M90 130 L600 130" stroke={MUTED} width="1.4" opacity="0.6" />
      <Wave x="90" y="130" w="510" amp="46" cycles={2} stroke={SIG} width="3" className="aecm-draw" />
      <M x="70" y="134" size={10.5} fill={SIG} anchor="end" weight={800}>
        vin
      </M>

      {[0, 1].map((k) => (
        <rect key={k} x={90 + k * 255} y="196" width="127" height="44" rx="6" fill={GREEN} fillOpacity="0.22" stroke={GREEN} strokeWidth="2" className={`aecm-cell-in aecm-delay-${k}`} />
      ))}
      <M x="70" y="222" size={10.5} fill={GREEN} anchor="end" weight={800}>
        on?
      </M>
      <M x="153" y="224" size={10} fill={GREEN} weight={800}>conducting</M>
      <M x="408" y="224" size={10} fill={GREEN} weight={800}>conducting</M>
      <M x="281" y="224" size={10} fill={MUTED}>off</M>
      <M x="536" y="224" size={10} fill={MUTED}>off</M>

      <Wire d="M90 366 L600 366" stroke={MUTED} width="1.4" opacity="0.6" />
      <Curve
        pts={Array.from({ length: 121 }, (_, i) => {
          const t = i / 120
          const s = Math.sin(2 * Math.PI * 2 * t)
          return [90 + t * 510, 366 - 76 * Math.max(0, s)]
        })}
        stroke={BIAS}
        width="3.2"
        className="aecm-draw aecm-delay-2"
      />
      <Wire d="M90 342 L600 342" stroke={ROSE} width="2" dash="6 5" className="aecm-sweep-x" />
      <M x="594" y="334" size={10.5} fill={ROSE} anchor="end" weight={800}>
        average = 0.318 Vm
      </M>
      <M x="70" y="370" size={10.5} fill={BIAS} anchor="end" weight={800}>
        vout
      </M>

      <Panel
        x="640"
        y="112"
        w="212"
        title="the four numbers"
        rows={[['Vdc', '0.318 Vm'], ['Vrms', '0.5 Vm'], ['ripple f', 'f supply'], ['PIV', 'Vm']]}
        accent={GOLD}
        className="aecm-slide-in aecm-delay-3"
      />
      <M x="746" y="290" size={10} fill={MUTED}>
        ripple at the supply frequency
      </M>
      <M x="746" y="310" size={10} fill={MUTED}>
        is the hardest kind to filter
      </M>
    </Scene>
  )
}

export function BridgeVsCentreTapScene() {
  return (
    <Scene caption="Four diodes and no centre tap, or two diodes and half the secondary wasted">
      <rect x="40" y="58" width="390" height="220" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="235" y="82" size={12} fill={SIG} weight={800}>
        bridge · 4 diodes
      </M>
      <Xformer cx="86" cy="176" h="80" tone={COOL} />
      <Wire d="M100 140 L160 140 M100 212 L160 212" stroke={N} width="2.2" />
      <Diode x="200" y="118" len="60" rot={-40} tone={SIG} />
      <Diode x="200" y="234" len="60" rot={40} tone={SIG} />
      <Diode x="300" y="118" len="60" rot={40} tone={SIG} />
      <Diode x="300" y="234" len="60" rot={-40} tone={SIG} />
      <Wire d="M160 140 L160 176 L160 212 M250 84 L250 96 M250 256 L250 268" stroke={N} width="2.2" />
      <Wire d="M172 106 L232 106 M172 246 L232 246 M268 106 L328 106 M268 246 L328 246" stroke={MUTED} width="1.8" opacity="0.5" />
      <Res x="392" y="176" len="70" orient="v" label="RL" tone={N} />
      <Wire d="M340 140 L392 140 M392 212 L340 212 M392 140 L392 141 M392 211 L392 212" stroke={N} width="2.2" />
      <g className="aecm-current">
        <Wire d="M170 132 L236 108" stroke={GREEN} width="3.4" marker="url(#aecArrGr)" />
        <Wire d="M266 108 L334 132" stroke={GREEN} width="3.4" marker="url(#aecArrGr)" />
      </g>
      <g className="aecm-current-rev aecm-delay-2">
        <Wire d="M334 220 L266 244" stroke={BIAS} width="3.4" marker="url(#aecArrB)" />
        <Wire d="M236 244 L170 220" stroke={BIAS} width="3.4" marker="url(#aecArrB)" />
      </g>

      <rect x="452" y="58" width="390" height="220" rx="12" fill={WHITE} stroke={BIAS} strokeWidth="2.3" />
      <M x="647" y="82" size={12} fill={BIAS} weight={800}>
        centre-tap · 2 diodes
      </M>
      <Xformer cx="510" cy="176" h="104" tone={COOL} tap />
      <Wire d="M524 128 L584 128 M524 224 L584 224 M556 176 L556 254 L800 254" stroke={N} width="2.2" />
      <Diode x="622" y="128" len="66" tone={BIAS} />
      <Diode x="622" y="224" len="66" tone={BIAS} />
      <Wire d="M655 128 L740 128 L740 176 M655 224 L740 224 L740 176" stroke={N} width="2.2" />
      <Res x="800" y="200" len="70" orient="v" label="RL" tone={N} />
      <Wire d="M740 176 L800 176 L800 165 M800 235 L800 254" stroke={N} width="2.2" />
      <g className="aecm-current">
        <Wire d="M580 118 L664 118" stroke={GREEN} width="3.4" marker="url(#aecArrGr)" />
      </g>
      <g className="aecm-current-rev aecm-delay-2">
        <Wire d="M580 236 L664 236" stroke={BIAS} width="3.4" marker="url(#aecArrB)" />
      </g>

      <rect x="40" y="298" width="802" height="30" rx="8" fill={N} />
      {['', 'diodes', 'in the path', 'PIV', 'transformer use'].map((h, i) => (
        <M key={h || i} x={110 + i * 170} y="319" size={10.5} fill={WHITE} weight={800}>
          {h}
        </M>
      ))}
      {[
        ['bridge', '4', '2', 'Vm', 'full', [false, false, true, true], SIG],
        ['centre-tap', '2', '1', '2 Vm', 'half', [true, true, false, false], BIAS],
      ].map(([name, a, b, c, d, good, tone], r) => (
        <g key={name} className={`aecm-cell-in aecm-delay-${r}`}>
          <rect x="40" y={334 + r * 46} width="802" height="38" rx="8" fill={WHITE} stroke={tone} strokeWidth="2" />
          <M x="110" y={358 + r * 46} size={11.5} fill={tone} weight={800}>
            {name}
          </M>
          {[a, b, c, d].map((v, i) => (
            <g key={i}>
              {good[i] ? (
                <rect x={228 + i * 170} y={338 + r * 46} width="110" height="30" rx="7" fill={GREEN} fillOpacity="0.18" />
              ) : null}
              <M x={280 + i * 170} y={358 + r * 46} size={11} fill={good[i] ? GREEN : N} weight={good[i] ? 800 : 700}>
                {v}
              </M>
            </g>
          ))}
        </g>
      ))}
      <M x="450" y="446" size={10.5} fill={MUTED} weight={800}>
        both give ripple at twice the supply frequency
      </M>
    </Scene>
  )
}

export function ClipperTypesScene() {
  const cases = [
    ['series, unbiased', 0, 0, SIG],
    ['series, biased', 1, 0.35, BIAS],
    ['shunt, unbiased', 0, 0, COOL],
    ['shunt, biased', 1, -0.35, GOLD],
  ]
  return (
    <Scene caption="Every clipper is the same transfer curve with the break point moved">
      {cases.map(([title, biased, brk, tone], i) => {
        const x = 40 + (i % 2) * 420
        const y = 62 + Math.floor(i / 2) * 156
        const bpx = 300 + brk * 60
        return (
          <g key={title} className={`aecm-cell-in aecm-delay-${i}`}>
            <rect x={x} y={y} width="404" height="142" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.2" />
            <M x={x + 100} y={y + 24} size={11} fill={tone} weight={800}>
              {title}
            </M>
            {i < 2 ? (
              <g>
                <Diode x={x + 92} y={y + 74} len="62" tone={tone} />
                <Res x={x + 160} y={y + 100} len="44" orient="v" tone={N} />
                <Wire d={`M${x + 30} ${y + 74} L${x + 61} ${y + 74} M${x + 123} ${y + 74} L${x + 160} ${y + 74} L${x + 160} ${y + 78}`} stroke={N} width="2.1" />
                <Wire d={`M${x + 160} ${y + 122} L${x + 160} ${y + 128} L${x + 30} ${y + 128} L${x + 30} ${y + 74}`} stroke={N} width="2.1" />
              </g>
            ) : (
              <g>
                <Res x={x + 92} y={y + 66} len="56" tone={N} />
                <Diode x={x + 160} y={y + 100} len="52" rot={90} tone={tone} />
                <Wire d={`M${x + 30} ${y + 66} L${x + 64} ${y + 66} M${x + 120} ${y + 66} L${x + 160} ${y + 66} L${x + 160} ${y + 74}`} stroke={N} width="2.1" />
                <Wire d={`M${x + 160} ${y + 126} L${x + 160} ${y + 132} L${x + 30} ${y + 132} L${x + 30} ${y + 66}`} stroke={N} width="2.1" />
              </g>
            )}
            {biased ? <M x={x + 190} y={y + 106} size={9.5} fill={tone} anchor="start" weight={800}>+V</M> : null}
            <Wire d={`M${x + 240} ${y + 120} L${x + 386} ${y + 120}`} stroke={MUTED} width="1.6" />
            <Wire d={`M${x + 300} ${y + 130} L${x + 300} ${y + 32}`} stroke={MUTED} width="1.6" />
            <Wire
              d={`M${x + 250} ${y + 120} L${x + bpx} ${y + 120} L${x + 380} ${y + 120 - (380 - bpx) * 0.55}`}
              stroke={tone}
              width="2.8"
            />
            <Dot cx={x + bpx} cy={y + 120} r="5" fill={ROSE} />
            <M x={x + bpx} y={y + 136} size={9} fill={ROSE} weight={800}>
              {biased ? 'V + 0.7' : '0.7 V'}
            </M>
            <M x={x + 352} y={y + 40} size={9} fill={MUTED}>
              vout vs vin
            </M>
          </g>
        )
      })}
      <Wire d="M90 400 L400 400" stroke={MUTED} width="1.4" opacity="0.6" />
      <Wave x="90" y="400" w="310" amp="34" cycles={1} stroke={SIG} width="2.6" className="aecm-draw aecm-delay-2" />
      <M x="70" y="404" size={10} fill={SIG} anchor="end" weight={800}>
        in
      </M>
      {[
        [0, GREEN],
        [1, BIAS],
      ].map(([k, tone]) => (
        <g key={k} className={`aecm-draw aecm-delay-${k + 3}`}>
          <Wire d={`M${460 + k * 200} 400 L${640 + k * 200} 400`} stroke={MUTED} width="1.4" opacity="0.6" />
          <Curve
            pts={Array.from({ length: 61 }, (_, i) => {
              const t = i / 60
              const s = 34 * Math.sin(2 * Math.PI * t)
              const cl = k === 0 ? Math.max(s, 0) : Math.min(s, 14)
              return [460 + k * 200 + t * 180, 400 - cl]
            })}
            stroke={tone}
            width="2.6"
          />
        </g>
      ))}
      <M x="450" y="446" size={10.5} fill={MUTED} weight={800}>
        the break point is always the bias plus one diode drop
      </M>
    </Scene>
  )
}

export function ClamperShiftScene() {
  return (
    <Scene caption="The capacitor charges to Vm once, then holds the whole waveform above the axis">
      <rect x="44" y="62" width="330" height="206" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Cap x="150" y="120" len="72" label="C" tone={COOL} />
      <Wire d="M76 120 L114 120 M186 120 L260 120" stroke={N} width="2.2" />
      <Diode x="260" y="180" len="62" rot={-90} tone={SIG} />
      <Res x="330" y="180" len="62" orient="v" label="RL" tone={N} />
      <Wire d="M260 120 L330 120 L330 149 M260 149 L260 120 M260 211 L260 240 L330 240 L330 211 M76 120 L76 240 L260 240" stroke={N} width="2.2" />
      <g className="aecm-charge">
        <M x="150" y="96" size={11} fill={COOL} weight={800}>
          charges to Vm
        </M>
      </g>
      <M x="209" y="292" size={10.5} fill={MUTED}>
        after the first cycle it just sits there
      </M>

      <Wire d="M440 160 L840 160" stroke={MUTED} width="1.4" opacity="0.6" />
      <Wave x="440" y="160" w="400" amp="48" cycles={2} stroke={SIG} width="2.8" className="aecm-draw" />
      <M x="424" y="164" size={10.5} fill={SIG} anchor="end" weight={800}>
        vin
      </M>

      <Wire d="M440 400 L840 400" stroke={MUTED} width="1.4" opacity="0.6" />
      <Wave x="440" y="352" w="400" amp="48" cycles={2} stroke={BIAS} width="2.8" className="aecm-draw aecm-delay-2" />
      <M x="424" y="356" size={10.5} fill={BIAS} anchor="end" weight={800}>
        vout
      </M>
      <g className="aecm-emerge">
        <Wire d="M470 208 L470 296" stroke={ROSE} width="3" marker="url(#aecArrRo)" />
        <M x="486" y="258" size={11} fill={ROSE} anchor="start" weight={800}>
          shifted by Vm
        </M>
      </g>
      <M x="640" y="428" size={10.5} fill={GREEN} weight={800}>
        peak-to-peak unchanged
      </M>

      <g className="aecm-slide-in aecm-delay-4">
        <rect x="44" y="312" width="330" height="106" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.3" />
        <M x="209" y="338" size={11} fill={RED} weight={800}>
          the condition: RC ≫ T
        </M>
        <Wire d="M76 390 L342 390" stroke={MUTED} width="1.4" opacity="0.5" />
        <Curve
          pts={Array.from({ length: 61 }, (_, i) => {
            const t = i / 60
            return [76 + t * 266, 390 - 26 * Math.sin(2 * Math.PI * 2 * t) - 22 * Math.exp(-2 * t) + 4]
          })}
          stroke={RED}
          width="2.4"
        />
        <M x="209" y="412" size={9.5} fill={RED} weight={800}>
          too small and the top droops
        </M>
      </g>
    </Scene>
  )
}

export function ZenerRegulatorScene() {
  const fwd = []
  for (let i = 0; i <= 40; i += 1) {
    const v = (i / 40) * 1.0
    fwd.push([420 + v * 90, 220 - Math.min(140, 48 * (Math.exp((v - 0.7) * 11) - 0.03))])
  }
  return (
    <Scene caption="Below the knee it is a diode; past it, a voltage reference with a small slope">
      <Plane cx="420" cy="220" r="170" xLabel="V" yLabel="I" />
      <Curve pts={fwd} stroke={SIG} width="3" className="aecm-draw" />
      <Curve
        pts={[[250, 222], [292, 224], [296, 230], [298, 260], [300, 340], [302, 380]]}
        stroke={ROSE}
        width="3.2"
        className="aecm-draw aecm-delay-2"
      />
      <M x="264" y="204" size={10.5} fill={ROSE} anchor="end" weight={800}>
        −VZ
      </M>
      <g className="aecm-pop aecm-delay-3">
        <rect x="76" y="290" width="150" height="110" rx="10" fill={WHITE} stroke={ROSE} strokeWidth="2.4" />
        <Wire d="M96 306 L206 384" stroke={ROSE} width="3" />
        <M x="151" y="314" size={9.5} fill={ROSE} weight={800}>
          slope = rz
        </M>
        <M x="151" y="396" size={9} fill={MUTED}>
          magnified
        </M>
        <Wire d="M240 300 L226 330" stroke={MUTED} width="1.4" dash="4 4" />
      </g>

      <rect x="600" y="62" width="252" height="216" rx="12" fill={WHITE} stroke={COOL} strokeWidth="2.3" />
      <M x="726" y="88" size={11.5} fill={COOL} weight={800}>
        shunt regulator
      </M>
      <Res x="680" y="122" len="80" label="Rs" tone={N} />
      <Wire d="M624 122 L640 122 M720 122 L790 122" stroke={N} width="2.2" />
      <Diode x="726" y="182" len="56" rot={-90} tone={ROSE} label="" />
      <Res x="790" y="182" len="56" orient="v" label="RL" tone={N} />
      <Wire d="M726 122 L790 122 M726 154 L726 122 M726 210 L726 240 L790 240 L790 210 M624 122 L624 240 L726 240" stroke={N} width="2.2" />
      <M x="656" y="106" size={10} fill={GREEN} weight={800}>IS</M>
      <M x="702" y="182" size={10} fill={BIAS} anchor="end" weight={800}>IZ</M>
      <M x="812" y="182" size={10} fill={SIG} anchor="start" weight={800}>IL</M>
      <M x="726" y="266" size={10.5} fill={MUTED}>
        IS = IZ + IL
      </M>

      <g className="aecm-slide-in aecm-delay-4">
        <rect x="600" y="298" width="252" height="54" rx="10" fill={SKY} stroke={GREEN} strokeWidth="2.2" />
        <M x="726" y="320" size={10.5} fill={GREEN} weight={800}>
          at max load: IZ ≥ IZmin
        </M>
        <M x="726" y="340" size={9.5} fill={MUTED}>
          or regulation collapses
        </M>
        <rect x="600" y="362" width="252" height="54" rx="10" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2.2" />
        <M x="726" y="384" size={10.5} fill={RED} weight={800}>
          at no load: VZ·IZ ≤ Pmax
        </M>
        <M x="726" y="404" size={9.5} fill={MUTED}>
          or the Zener cooks
        </M>
      </g>
    </Scene>
  )
}

export function SeriesShuntLedScene() {
  return (
    <Scene caption="The shunt burns most at no load; the series burns in proportion to it">
      <rect x="40" y="58" width="340" height="176" rx="12" fill={WHITE} stroke={ROSE} strokeWidth="2.3" />
      <M x="210" y="82" size={11.5} fill={ROSE} weight={800}>
        shunt regulator
      </M>
      <Res x="140" y="124" len="76" label="Rs" tone={N} />
      <Diode x="212" y="176" len="56" rot={-90} tone={ROSE} />
      <Res x="300" y="176" len="56" orient="v" label="RL" tone={N} />
      <Wire d="M70 124 L102 124 M178 124 L300 124 M212 148 L212 124 M212 204 L212 216 L300 216 L300 204 M300 124 L300 148 M70 124 L70 216 L212 216" stroke={N} width="2.1" />
      <Bars x="188" y="248" w="120" items={[['no load', 3, RED], ['full load', 1, GREEN]]} rowH={34} max={3} />

      <rect x="40" y="330" width="340" height="118" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <M x="210" y="354" size={11.5} fill={GREEN} weight={800}>
        series regulator
      </M>
      <Bjt cx="182" cy="404" kind="npn" label="pass" tone={N} ring={false} />
      <Wire d="M70 364 L204 364 M204 446 L300 446" stroke={N} width="2.1" />
      <AmpTri cx="128" cy="418" w="54" h="44" label="err" tone={COOL} />
      <Wire d="M155 418 L148 418" stroke={N} width="2" />
      <M x="300" y="404" size={9.5} fill={MUTED} anchor="start">
        dissipation ∝ load
      </M>

      <rect x="416" y="58" width="426" height="390" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="629" y="84" size={12} fill={SIG} weight={800}>
        the LED and its series resistor
      </M>
      <Diode x="520" y="140" len="72" kind="led" tone={SIG} />
      <Res x="640" y="140" len="76" label="R" tone={N} />
      <Wire d="M556 140 L602 140 M678 140 L760 140" stroke={N} width="2.2" />
      {[
        ['red', '1.8 V', '#dc2626'],
        ['yellow', '2.1 V', '#ca8a04'],
        ['green', '2.2 V', '#059669'],
        ['blue', '3.4 V', '#2563eb'],
      ].map(([c, v, hex], i) => (
        <g key={c} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x="448" y={200 + i * 44} width="362" height="36" rx="8" fill={WHITE} stroke={hex} strokeWidth="2" />
          <circle cx="474" cy={218 + i * 44} r="8" fill={hex} />
          <M x="520" y={223 + i * 44} size={11} fill={N} anchor="start">
            {c}
          </M>
          <M x="780" y={223 + i * 44} size={11.5} fill={hex} anchor="end" weight={800}>
            {v}
          </M>
        </g>
      ))}
      <g className="aecm-emerge">
        <rect x="448" y="386" width="362" height="46" rx="10" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="629" y="415" size={13} fill={GOLD} weight={800}>
          R = (Vsupply − Vf) / If
        </M>
      </g>
    </Scene>
  )
}

export function BjtCarrierFlowScene() {
  return (
    <Scene caption="A thin, lightly doped base is the entire trick — without it there is no gain">
      <rect x="80" y="110" width="180" height="180" rx="8" fill={SIG} fillOpacity="0.14" stroke={SIG} strokeWidth="2.4" />
      <rect x="260" y="110" width="44" height="180" fill={ROSE} fillOpacity="0.18" stroke={ROSE} strokeWidth="2.4" />
      <rect x="304" y="110" width="250" height="180" rx="8" fill={SIG} fillOpacity="0.1" stroke={SIG} strokeWidth="2.4" />
      <M x="170" y="96" size={11.5} fill={SIG} weight={800}>
        emitter · n⁺⁺
      </M>
      <M x="282" y="96" size={10} fill={ROSE} weight={800}>
        base
      </M>
      <M x="256" y="330" size={10} fill={ROSE} anchor="end" weight={800}>
        p, thin, light
      </M>
      <M x="430" y="96" size={11.5} fill={SIG} weight={800}>
        collector · n, large
      </M>
      {[0, 1, 2, 3, 4].map((i) => (
        <Wire
          key={i}
          d={`M120 ${138 + i * 32} L520 ${138 + i * 32}`}
          stroke={GREEN}
          width="2.6"
          marker="url(#aecArrGr)"
          className={`aecm-current aecm-delay-${i}`}
        />
      ))}
      <Wire d="M282 138 L282 344" stroke={BIAS} width="2.6" marker="url(#aecArrB)" className="aecm-current aecm-delay-3" />
      <M x="296" y="344" size={10} fill={BIAS} anchor="start" weight={800}>
        recombination = IB
      </M>
      <g className="aecm-emerge">
        <rect x="120" y="366" width="300" height="42" rx="10" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.3" />
        <M x="270" y="393" size={12} fill={GREEN} weight={800}>
          ≈ 99% reach the collector
        </M>
      </g>

      <g className="aecm-slide-in aecm-delay-4">
        <rect x="600" y="110" width="250" height="220" rx="12" fill={RED} fillOpacity="0.08" stroke={RED} strokeWidth="2.4" />
        <M x="725" y="136" size={11} fill={RED} weight={800}>
          make the base thick instead
        </M>
        <rect x="620" y="160" width="60" height="120" rx="6" fill={SIG} fillOpacity="0.14" stroke={SIG} strokeWidth="2" />
        <rect x="680" y="160" width="86" height="120" fill={ROSE} fillOpacity="0.2" stroke={ROSE} strokeWidth="2" />
        <rect x="766" y="160" width="64" height="120" rx="6" fill={SIG} fillOpacity="0.1" stroke={SIG} strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <Wire key={i} d={`M634 ${188 + i * 36} L${740} ${188 + i * 36}`} stroke={RED} width="2.4" marker="url(#aecArrR)" />
        ))}
        <M x="725" y="306" size={10.5} fill={RED} weight={800}>
          two diodes back to back, no gain
        </M>
      </g>
      <Card
        x="600"
        y="348"
        w="250"
        h="76"
        title="the definitions that follow"
        accent={GOLD}
        mono
        lines={['α = IC/IE   β = IC/IB']}
        linesY={56}
        className="aecm-slide-in aecm-delay-4"
      />
    </Scene>
  )
}

export function AlphaBetaScene() {
  const pts = []
  for (let i = 0; i <= 60; i += 1) {
    const a = 0.95 + (i / 60) * 0.048
    const beta = a / (1 - a)
    pts.push([110 + (i / 60) * 320, 380 - Math.min(280, beta * 1.05)])
  }
  // A deterministic spread: real parts scatter, but a screenshot must not.
  const spread = Array.from({ length: 20 }, (_, i) => 100 + ((i * 97) % 200))
  return (
    <Scene caption="α creeping from 0.98 to 0.995 quadruples β — so never let the design depend on β">
      <Axes x="110" y="380" w="340" h="300" xLabel="α" yLabel="β" tickLabels={[[110, '0.95'], [270, '0.975'], [430, '0.999']]} />
      <Curve pts={pts} stroke={SIG} width="3.2" className="aecm-draw" />
      {[
        [0.98, 49],
        [0.99, 99],
        [0.995, 199],
      ].map(([a, b], i) => {
        const x = 110 + ((a - 0.95) / 0.048) * 320
        const y = 380 - Math.min(280, b * 1.05)
        return (
          <g key={a} className={`aecm-pop aecm-delay-${i}`}>
            <Dot cx={x.toFixed(1)} cy={y.toFixed(1)} r="7" fill={BIAS} />
            <M x={(x - 10).toFixed(1)} y={(y + 4).toFixed(1)} size={10.5} fill={BIAS} anchor="end" weight={800}>
              {`α ${a} → β ${b}`}
            </M>
          </g>
        )
      })}

      <rect x="510" y="66" width="340" height="252" rx="12" fill={WHITE} stroke={COOL} strokeWidth="2.3" />
      <M x="680" y="92" size={11.5} fill={COOL} weight={800}>
        twenty parts, one batch
      </M>
      <Wire d="M540 288 L830 288" stroke={MUTED} width="1.8" />
      <Wire d="M540 288 L540 112" stroke={MUTED} width="1.8" />
      <Wire d="M540 246 L830 246" stroke={GREEN} width="1.8" dash="5 4" />
      <M x="534" y="250" size={9.5} fill={GREEN} anchor="end">100</M>
      <Wire d="M540 134 L830 134" stroke={RED} width="1.8" dash="5 4" />
      <M x="534" y="138" size={9.5} fill={RED} anchor="end">300</M>
      {spread.map((b, i) => (
        <Dot key={i} cx={556 + i * 14} cy={(288 - (b - 60) * 0.7).toFixed(1)} r="5" fill={SIG} className={`aecm-cell-in aecm-delay-${i % 5}`} />
      ))}
      <M x="680" y="308" size={10} fill={MUTED}>
        β from 100 to 300, same part number
      </M>

      <g className="aecm-emerge">
        <rect x="510" y="338" width="340" height="84" rx="12" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2.6" />
        <L x="680" y="368" size={13} fill={RED}>
          the design rule for Module 2
        </L>
        <M x="680" y="396" size={11.5} fill={N}>
          never let the Q-point depend on β
        </M>
      </g>
    </Scene>
  )
}

export function CommonBaseScene() {
  return (
    <Scene caption="Gain just under one, but the best high-frequency behaviour of the three">
      <rect x="40" y="62" width="250" height="230" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="165" y="86" size={11.5} fill={SIG} weight={800}>
        common base
      </M>
      <Bjt cx="168" cy="184" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M134 184 L134 250 L262 250" stroke={N} width="2.2" />
      <Gnd x="134" y="250" tone={N} />
      <Wire d="M190 144 L232 144 L232 110" stroke={N} width="2.2" />
      <Wire d="M190 224 L70 224 L70 110" stroke={N} width="2.2" />
      <M x="70" y="102" size={10} fill={BIAS} weight={800}>IE in</M>
      <M x="232" y="102" size={10} fill={GREEN} weight={800}>IC out</M>

      <rect x="304" y="62" width="250" height="230" rx="12" fill={WHITE} stroke={BIAS} strokeWidth="2.3" />
      <M x="429" y="86" size={11} fill={BIAS} weight={800}>
        input: IE vs VEB
      </M>
      <Axes x="336" y="262" w="190" h="150" xLabel="VEB" yLabel="IE" />
      {[0, 1, 2].map((k) => (
        <Curve
          key={k}
          pts={Array.from({ length: 41 }, (_, i) => {
            const v = (i / 40) * 1.0
            return [336 + v * 170, 262 - Math.min(140, 40 * (Math.exp((v - 0.68 + k * 0.012) * 11) - 0.03))]
          })}
          stroke={BIAS}
          width="2.4"
          className={`aecm-draw aecm-delay-${k}`}
        />
      ))}
      <M x="470" y="128" size={9.5} fill={MUTED}>
        VCB barely matters
      </M>

      <rect x="568" y="62" width="282" height="230" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <M x="709" y="86" size={11} fill={GREEN} weight={800}>
        output: IC vs VCB
      </M>
      <Axes x="610" y="262" w="210" h="150" xLabel="VCB" yLabel="IC" />
      {[1, 2, 3, 4].map((k) => (
        <g key={k} className={`aecm-draw aecm-delay-${k % 5}`}>
          <Curve
            pts={[[594, 262 - k * 30], [610, 262 - k * 30], [820, 262 - k * 30 - 3]]}
            stroke={GREEN}
            width="2.4"
          />
          <M x="830" y={266 - k * 30} size={9} fill={GREEN} anchor="start" weight={800}>
            {`IE${k}`}
          </M>
        </g>
      ))}
      <M x="596" y="288" size={9} fill={MUTED} anchor="end">
        still conducting at VCB = 0
      </M>

      {[
        ['current gain', 'α, just under 1', BIAS],
        ['input impedance', 'low — tens of ohms', SIG],
        ['output impedance', 'high — hundreds of kΩ', GREEN],
        ['frequency response', 'best of the three', COOL],
      ].map(([k, v, tone], i) => (
        <g key={k} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={40 + i * 206} y="326" width="194" height="76" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x={137 + i * 206} y="354" size={10.5} fill={MUTED} weight={800}>
            {k}
          </M>
          <M x={137 + i * 206} y="380" size={11.5} fill={tone} weight={800}>
            {v}
          </M>
        </g>
      ))}
      <M x="450" y="438" size={10.5} fill={MUTED} weight={800}>
        no current gain, but it is the configuration RF designers reach for
      </M>
    </Scene>
  )
}

export function CommonEmitterFamilyScene() {
  return (
    <Scene caption="The workhorse: current gain, voltage gain, and a 180° inversion you must not forget">
      {/* The panel stops at y = 242 so the Early-voltage extrapolations, which
          converge down and to the left, pass underneath it rather than through. */}
      <rect x="40" y="62" width="236" height="180" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="158" y="84" size={11.5} fill={SIG} weight={800}>
        common emitter
      </M>
      <Bjt cx="160" cy="166" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M182 206 L182 216" stroke={N} width="2.2" />
      <Gnd x="182" y="216" tone={N} />
      <Wire d="M126 166 L72 166 L72 116" stroke={N} width="2.2" />
      <Wire d="M182 126 L238 126 L238 116" stroke={N} width="2.2" />
      <M x="72" y="108" size={10} fill={BIAS} weight={800}>IB in</M>
      <M x="238" y="108" size={10} fill={GREEN} weight={800}>IC out</M>

      <Axes x="340" y="330" w="440" h="250" xLabel="VCE" yLabel="IC" />
      <rect x="340" y="96" width="46" height="234" fill={BIAS} fillOpacity="0.16" className="aecm-fade-in" />
      <M x="362" y="352" size={9.5} fill={BIAS} weight={800}>sat</M>
      <rect x="386" y="96" width="394" height="216" fill={GREEN} fillOpacity="0.09" className="aecm-fade-in aecm-delay-1" />
      <M x="580" y="112" size={10.5} fill={GREEN} weight={800}>active region</M>
      <rect x="340" y="312" width="440" height="18" fill={MUTED} fillOpacity="0.22" className="aecm-fade-in aecm-delay-2" />
      <M x="620" y="326" size={9.5} fill={MUTED} weight={800}>cut-off</M>
      <OutputFamily x="340" y="330" w="440" h="230" count={5} tone={N} knee={0.1} />
      {[1, 2, 3, 4, 5].map((k) => (
        <M key={k} x="790" y={336 - k * 40.5} size={9} fill={N} anchor="start" weight={800}>
          {`IB${k}`}
        </M>
      ))}
      <g className="aecm-draw aecm-delay-3">
        {[1, 3, 5].map((k) => (
          <Wire key={k} d={`M386 ${330 - k * 40.5} L200 340`} stroke={ROSE} width="1.6" dash="5 4" />
        ))}
        <Dot cx="200" cy="340" r="6" fill={ROSE} />
        <M x="200" y="362" size={10} fill={ROSE} weight={800}>
          −VA, Early voltage
        </M>
      </g>

      <Wire d="M370 424 L540 424" stroke={MUTED} width="1.3" opacity="0.6" />
      <Wave x="370" y="424" w="170" amp="24" cycles={1} stroke={SIG} width="2.4" className="aecm-draw aecm-delay-2" />
      <M x="455" y="392" size={9.5} fill={SIG} weight={800}>
        input
      </M>
      <Wire d="M556 424 L586 424" stroke={MUTED} width="2.2" marker="url(#aecArrM)" />
      <Wire d="M600 424 L770 424" stroke={MUTED} width="1.3" opacity="0.6" />
      <Wave x="600" y="424" w="170" amp="24" cycles={1} phase={Math.PI} stroke={BIAS} width="2.4" className="aecm-draw aecm-delay-3" />
      <M x="685" y="392" size={9.5} fill={ROSE} weight={800}>
        output inverted
      </M>
    </Scene>
  )
}

export function EmitterFollowerScene() {
  return (
    <Scene caption="No voltage gain at all — its whole job is to change impedance">
      <rect x="320" y="120" width="260" height="196" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.4" />
      <Bjt cx="424" cy="196" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M446 156 L520 156 L520 132" stroke={N} width="2.2" />
      <M x="520" y="124" size={9.5} fill={MUTED}>+VCC</M>
      <Wire d="M390 196 L344 196" stroke={N} width="2.2" />
      <Res x="446" y="268" len="50" orient="v" label="RE" tone={N} />
      <Wire d="M446 236 L446 243 M446 293 L446 306" stroke={N} width="2.2" />
      <Wire d="M446 262 L556 262" stroke={N} width="2.2" />
      <M x="472" y="242" size={9.5} fill={GREEN} anchor="start" weight={800}>out</M>

      <Block x="60" y="168" w="150" h="76" label="source" sub="high Rs" stroke={BIAS} className="aecm-slide-in" />
      <Wire d="M210 206 L320 206" stroke={BIAS} width="2.6" marker="url(#aecArrB)" className="aecm-flow-arrow" />
      <M x="266" y="190" size={10} fill={BIAS} weight={800}>
        Rin = (β+1)(re + RE)
      </M>
      <M x="266" y="228" size={9.5} fill={MUTED}>
        high — barely loads the source
      </M>

      <Block x="690" y="168" w="150" h="76" label="load" sub="low RL" stroke={GREEN} className="aecm-slide-in aecm-delay-2" />
      <Wire d="M580 206 L690 206" stroke={GREEN} width="2.6" marker="url(#aecArrGr)" className="aecm-flow-arrow aecm-delay-2" />
      <M x="634" y="190" size={10} fill={GREEN} weight={800}>
        Rout = re + Rs/(β+1)
      </M>
      <M x="634" y="228" size={9.5} fill={MUTED}>
        low — drives it comfortably
      </M>

      <Wire d="M320 72 L580 72" stroke={MUTED} width="1.4" opacity="0.6" />
      <Wave x="320" y="72" w="260" amp="26" cycles={1.5} stroke={SIG} width="3" className="aecm-draw" />
      <Wave x="320" y="72" w="260" amp="23" cycles={1.5} stroke={GREEN} width="2.2" dash="5 4" className="aecm-draw aecm-delay-2" />
      <M x="596" y="76" size={10} fill={MUTED} anchor="start">
        gain just under 1, no inversion
      </M>

      <g className="aecm-cell-in aecm-delay-3">
        <rect x="60" y="342" width="360" height="94" rx="12" fill={RED} fillOpacity="0.08" stroke={RED} strokeWidth="2.2" />
        <M x="240" y="366" size={10.5} fill={RED} weight={800}>
          source straight into the load
        </M>
        <Wave x="90" y="404" w="300" amp="10" cycles={2} stroke={RED} width="2.4" />
        <M x="240" y="428" size={9.5} fill={RED} weight={800}>
          most of the signal lost in Rs
        </M>
      </g>
      <g className="aecm-cell-in aecm-delay-4">
        <rect x="480" y="342" width="360" height="94" rx="12" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="2.2" />
        <M x="660" y="366" size={10.5} fill={GREEN} weight={800}>
          source through the follower
        </M>
        <Wave x="510" y="404" w="300" amp="24" cycles={2} stroke={GREEN} width="2.4" />
        <M x="660" y="430" size={9.5} fill={GREEN} weight={800}>
          nearly all of it delivered
        </M>
      </g>
    </Scene>
  )
}

export function ThreeRegionsScene() {
  return (
    <Scene caption="Amplifier: sit in the middle. Switch: cross the middle as fast as you can">
      <Axes x="120" y="360" w="470" h="270" xLabel="VCE" yLabel="IC" />
      <rect x="120" y="112" width="48" height="248" fill={BIAS} fillOpacity="0.2" className="aecm-fade-in" />
      <M x="144" y="382" size={10} fill={BIAS} weight={800}>sat</M>
      <rect x="168" y="112" width="422" height="228" fill={GREEN} fillOpacity="0.1" className="aecm-fade-in aecm-delay-1" />
      <rect x="120" y="340" width="470" height="20" fill={MUTED} fillOpacity="0.24" className="aecm-fade-in aecm-delay-2" />
      <M x="420" y="356" size={9.5} fill={MUTED} weight={800}>cut-off</M>
      <OutputFamily x="120" y="360" w="470" h="248" count={5} tone={N} knee={0.1} />
      <LoadLine box={[120, 360, 470, 248]} qx={0.5} tone={ROSE} label="Q · amplifier" className="aecm-draw aecm-delay-3" />
      <g className="aecm-flux">
        <Dot cx="144" cy="128" r="7" fill={BIAS} />
        <Dot cx="578" cy="352" r="7" fill={MUTED} />
        <Wire d="M154 138 L568 344" stroke={COOL} width="2.4" dash="6 5" marker="url(#aecArrC)" />
      </g>
      <M x="396" y="196" size={10} fill={COOL} weight={800}>
        a switch crosses this quickly
      </M>

      {[
        ['saturation', 'both junctions forward', 'closed switch', BIAS],
        ['active', 'BE forward, BC reverse', 'controlled source', GREEN],
        ['cut-off', 'both junctions reverse', 'open switch', MUTED],
      ].map(([name, bias, model, tone], i) => (
        <g key={name} className={`aecm-slide-in aecm-delay-${i}`}>
          <rect x="626" y={96 + i * 116} width="226" height="102" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="739" y={120 + i * 116} size={11.5} fill={tone} weight={800}>
            {name}
          </M>
          <M x="739" y={148 + i * 116} size={10} fill={N}>
            {bias}
          </M>
          <M x="739" y={176 + i * 116} size={11} fill={tone} weight={800}>
            {model}
          </M>
        </g>
      ))}
      <M x="739" y="444" size={10.5} fill={MUTED} weight={800}>
        the region is decided by the two junction biases, nothing else
      </M>
    </Scene>
  )
}

/* ── Module 2 — biasing the BJT and small-signal analysis ──────── */

export function QPointSwingScene() {
  return (
    <Scene caption="Bias too high and the positive peak clips; too low and the negative peak does">
      <Axes x="110" y="374" w="380" h="280" xLabel="VCE" yLabel="IC" />
      <OutputFamily x="110" y="374" w="380" h="258" count={5} tone={N} knee={0.1} />
      <LoadLine box={[110, 374, 380, 258]} qx={0.5} tone={ROSE} label="" showQ={false} className="aecm-draw" />
      {[
        [0.16, BIAS, 'near saturation'],
        [0.5, GREEN, 'mid-line'],
        [0.86, BIAS, 'near cut-off'],
      ].map(([q, tone, note], i) => (
        <g key={note} className={`aecm-pop aecm-delay-${i}`}>
          <Dot cx={(110 + 380 * q).toFixed(1)} cy={(374 - 258 * (1 - q)).toFixed(1)} r="8" fill={tone} />
          <M x={(110 + 380 * q).toFixed(1)} y={(374 - 258 * (1 - q) - 16).toFixed(1)} size={9.5} fill={tone} weight={800}>
            {note}
          </M>
        </g>
      ))}

      {[
        ['clipped on the positive peak', BIAS, 'top'],
        ['clean', GREEN, 'none'],
        ['clipped on the negative peak', BIAS, 'bottom'],
      ].map(([lab, tone, clip], i) => (
        <g key={lab} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x="540" y={70 + i * 118} width="310" height="102" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <Wire d={`M566 ${124 + i * 118} L826 ${124 + i * 118}`} stroke={MUTED} width="1.3" opacity="0.6" />
          <Curve
            pts={Array.from({ length: 81 }, (_, k) => {
              const t = k / 80
              let v = 34 * Math.sin(2 * Math.PI * 1.5 * t)
              if (clip === 'top') v = Math.min(v, 15)
              if (clip === 'bottom') v = Math.max(v, -15)
              return [566 + t * 260, 124 + i * 118 - v]
            })}
            stroke={tone}
            width="2.6"
          />
          <M x="696" y={162 + i * 118} size={10.5} fill={tone} weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <g className="aecm-emerge">
        <rect x="110" y="412" width="380" height="42" rx="10" fill={SKY} stroke={COOL} strokeWidth="2.2" />
        <M x="300" y="439" size={11} fill={COOL} weight={800}>
          IC × VCE is dissipated even with no signal
        </M>
      </g>
    </Scene>
  )
}

export function LoadLineConstructionScene() {
  return (
    <Scene caption="Two intercepts, one straight line — and the Q-point is wherever it meets your IB curve">
      <Axes x="120" y="400" w="500" h="300" xLabel="VCE" yLabel="IC" />
      <OutputFamily x="120" y="400" w="500" h="280" count={5} tone={N} knee={0.1} />
      <g className="aecm-pop">
        <Dot cx="600" cy="400" r="7" fill={ROSE} />
        <M x="600" y="426" size={10.5} fill={ROSE} weight={800}>
          VCE = VCC
        </M>
        <Dot cx="120" cy="128" r="7" fill={ROSE} />
        <M x="136" y="120" size={10.5} fill={ROSE} anchor="start" weight={800}>
          IC = VCC / (RC + RE)
        </M>
      </g>
      <Wire d="M120 128 L600 400" stroke={ROSE} width="3.2" className="aecm-draw aecm-delay-1" />
      <Wire d="M120 214 L420 400" stroke={MUTED} width="2.2" dash="6 5" className="aecm-draw aecm-delay-3" />
      <M x="230" y="332" size={9.5} fill={MUTED} anchor="end">
        smaller RC tilts the line
      </M>

      <g className="aecm-emerge">
        <circle cx="360" cy="264" r="15" fill="none" stroke={GREEN} strokeWidth="3" />
        <Dot cx="360" cy="264" r="7" fill={GREEN} />
        <Wire d="M360 264 L360 400" stroke={GREEN} width="1.8" dash="5 4" />
        <Wire d="M360 264 L120 264" stroke={GREEN} width="1.8" dash="5 4" />
        <M x="360" y="426" size={11} fill={GREEN} weight={800}>
          VCEQ
        </M>
        <M x="110" y="268" size={11} fill={GREEN} anchor="end" weight={800}>
          ICQ
        </M>
        <M x="386" y="250" size={11} fill={GREEN} anchor="start" weight={800}>
          Q-point
        </M>
      </g>

      <Card
        x="650"
        y="96"
        w="200"
        h="140"
        title="the two intercepts"
        accent={SIG}
        mono
        lines={['IC = 0 → VCE = VCC', '', 'VCE = 0 → IC =', 'VCC/(RC+RE)']}
        linesY={58}
        lineH={22}
        className="aecm-slide-in aecm-delay-2"
      />
      <Card
        x="650"
        y="256"
        w="200"
        h="130"
        title="what moves it"
        accent={BIAS}
        lines={['RC, RE tilt the line', 'IB slides Q along it']}
        linesY={62}
        lineH={28}
        className="aecm-slide-in aecm-delay-4"
      />
    </Scene>
  )
}

export function FixedBiasSpreadScene() {
  return (
    <Scene caption="One resistor sets IB, and β — which you do not control — sets everything else">
      <rect x="40" y="70" width="330" height="290" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="205" y="96" size="11.5" fill={SIG} weight={800}>
        fixed bias
      </M>
      <Wire d="M110 130 L300 130" stroke={N} width="2.2" />
      <M x="70" y="134" size={10} fill={MUTED} anchor="start">+VCC</M>
      <Res x="110" y="180" len="64" orient="v" label="RB" tone={BIAS} />
      <Res x="300" y="180" len="64" orient="v" label="RC" tone={N} />
      <Wire d="M110 130 L110 148 M110 212 L110 240 M300 130 L300 148 M300 212 L300 240" stroke={N} width="2.2" />
      <Bjt cx="200" cy="264" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M110 240 L110 264 L166 264 M222 224 L300 224 L300 240 M222 304 L222 326 L110 326" stroke={N} width="2.2" />
      <Gnd x="222" y="326" tone={N} />
      <g className="aecm-current">
        <Wire d="M110 152 L110 236" stroke={BIAS} width="4" marker="url(#aecArrB)" />
      </g>
      <M x="88" y="200" size={10} fill={BIAS} anchor="end" weight={800}>
        IB fixed
      </M>

      <Axes x="430" y="390" w="400" h="290" xLabel="VCE" yLabel="IC" />
      <OutputFamily x="430" y="390" w="400" h="270" count={5} tone={N} knee={0.1} />
      <Wire d="M430 130 L820 390" stroke={ROSE} width="3" className="aecm-draw" />
      <rect x="430" y="120" width="400" height="62" fill={BIAS} fillOpacity="0.18" className="aecm-fade-in aecm-delay-2" />
      <M x="620" y="112" size={10} fill={BIAS} weight={800}>saturation</M>
      {[
        [0.18, 'β = 300', RED],
        [0.5, 'β = 200', GREEN],
        [0.84, 'β = 100', RED],
      ].map(([q, lab, tone], i) => (
        <g key={lab} className={`aecm-pop aecm-delay-${i}`}>
          <Dot cx={(430 + 390 * q).toFixed(1)} cy={(390 - 260 * (1 - q)).toFixed(1)} r="8" fill={tone} />
          <M x={(430 + 390 * q + 14).toFixed(1)} y={(390 - 260 * (1 - q) + 4).toFixed(1)} size={10} fill={tone} anchor="start" weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <M x="630" y="428" size={11} fill={MUTED} weight={800}>
        same circuit, three devices from the same batch
      </M>
      <M x="205" y="386" size={10.5} fill={RED} weight={800}>
        only the middle one is usable
      </M>
    </Scene>
  )
}

export function EmitterBiasLoopScene() {
  // Supply allocation stacked left to right, so each segment needs the sum of
  // the widths before it.
  const alloc = [['IC·RC', 0.36, SIG], ['VCE', 0.46, GREEN], ['VE', 0.18, BIAS]]
  let cursor = 440
  const bars = alloc.map(([lab, frac, tone]) => {
    const seg = { lab, tone, x: cursor, w: 400 * frac }
    cursor += seg.w
    return seg
  })
  return (
    <Scene caption="RE turns a rise in IC into a fall in IB — the circuit corrects itself">
      <rect x="40" y="66" width="340" height="300" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Wire d="M110 116 L310 116" stroke={N} width="2.2" />
      <M x="70" y="120" size={10} fill={MUTED} anchor="start">+VCC</M>
      <Res x="110" y="162" len="58" orient="v" label="RB" tone={N} />
      <Res x="310" y="162" len="58" orient="v" label="RC" tone={N} />
      <Wire d="M110 116 L110 133 M110 191 L110 216 M310 116 L310 133 M310 191 L310 210" stroke={N} width="2.2" />
      <Bjt cx="210" cy="240" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M110 216 L110 240 L176 240 M232 200 L310 200 L310 210 M232 280 L232 298" stroke={N} width="2.2" />
      <Res x="232" y="322" len="48" orient="v" label="RE" tone={BIAS} />
      <Wire d="M232 346 L232 352" stroke={N} width="2.2" />
      <Gnd x="232" y="352" tone={N} />
      <g className="aecm-feedback">
        <Wire d="M256 322 L300 322 L300 268 L246 252" stroke={ROSE} width="2.6" dash="6 5" marker="url(#aecArrRo)" />
      </g>

      {['IC ↑', 'VE ↑', 'VBE ↓', 'IB ↓', 'IC ↓'].map((step, i) => (
        <g key={step} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={420 + i * 86} y="120" width="76" height="52" rx="10" fill={WHITE} stroke={i === 4 ? GREEN : ROSE} strokeWidth="2.3" />
          <M x={458 + i * 86} y="151" size={12.5} fill={i === 4 ? GREEN : ROSE} weight={800}>
            {step}
          </M>
          {i < 4 ? (
            <Wire d={`M${496 + i * 86} 146 L${506 + i * 86} 146`} stroke={MUTED} width="2.2" marker="url(#aecArrM)" />
          ) : null}
        </g>
      ))}
      <M x="640" y="196" size={10.5} fill={MUTED} weight={800}>
        negative feedback, acting on the DC operating point
      </M>

      <M x="640" y="248" size={11} fill={N} weight={800}>
        where the supply goes
      </M>
      {bars.map((b, i) => (
        <g key={b.lab} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={b.x} y="268" width={b.w} height="44" rx="8" fill={b.tone} fillOpacity="0.2" stroke={b.tone} strokeWidth="2.2" />
          <M x={b.x + b.w / 2} y="296" size={11} fill={b.tone} weight={800}>
            {b.lab}
          </M>
        </g>
      ))}
      <M x="640" y="334" size={10.5} fill={BIAS} weight={800}>
        the RE drop is swing you no longer have
      </M>
      <Card
        x="440"
        y="356"
        w="400"
        h="74"
        title="the trade"
        accent={GOLD}
        lines={['more RE → steadier Q-point, less output swing']}
        linesY={54}
        className="aecm-slide-in aecm-delay-4"
      />
    </Scene>
  )
}

export function DividerBiasChainScene() {
  return (
    <Scene caption="The divider fixes VB, RE fixes IE, and β never gets a vote">
      <rect x="40" y="66" width="320" height="330" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Wire d="M110 112 L300 112" stroke={N} width="2.2" />
      <M x="70" y="116" size={10} fill={MUTED} anchor="start">+VCC</M>
      <Res x="110" y="156" len="54" orient="v" label="R1" tone={COOL} />
      <Res x="110" y="290" len="54" orient="v" label="R2" tone={COOL} />
      <Res x="300" y="156" len="54" orient="v" label="RC" tone={N} />
      <Wire d="M110 112 L110 129 M110 183 L110 216 M110 263 L110 216 M110 317 L110 348 M300 112 L300 129 M300 183 L300 206" stroke={N} width="2.2" />
      <Dot cx="110" cy="216" r="6" fill={COOL} />
      <Bjt cx="204" cy="236" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M110 216 L170 216 M226 196 L300 196 L300 206 M226 276 L226 300" stroke={N} width="2.2" />
      <Res x="226" y="324" len="48" orient="v" label="RE" tone={BIAS} />
      <Wire d="M226 348 L226 352 M110 348 L226 348" stroke={N} width="2.2" />
      <Gnd x="226" y="352" tone={N} />
      <M x="128" y="210" size={10} fill={COOL} anchor="start" weight={800}>VB</M>

      {[
        'VB = VCC · R2/(R1+R2)',
        'VE = VB − 0.7',
        'IE = VE / RE',
        'IC ≈ IE',
      ].map((step, i) => (
        <g key={step} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x="410" y={72 + i * 76} width="330" height="54" rx="11" fill={WHITE} stroke={COOL} strokeWidth="2.3" />
          <M x="575" y={105 + i * 76} size={13} fill={N} weight={800}>
            {step}
          </M>
          {i < 3 ? (
            <Wire d={`M575 ${126 + i * 76} L575 ${142 + i * 76}`} stroke={MUTED} width="2.2" marker="url(#aecArrM)" />
          ) : null}
        </g>
      ))}
      <g className="aecm-pop aecm-delay-4">
        <rect x="762" y="176" width="90" height="90" rx="45" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="3" />
        <M x="807" y="214" size={11} fill={GREEN} weight={800}>β appears</M>
        <M x="807" y="234" size={11} fill={GREEN} weight={800}>nowhere</M>
      </g>
      <g className="aecm-slide-in aecm-delay-4">
        <rect x="410" y="382" width="442" height="52" rx="11" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="631" y="404" size={11} fill={GOLD} weight={800}>
          valid while the divider current ≥ 10 × IB
        </M>
        <M x="631" y="424" size={9.5} fill={MUTED}>
          otherwise the base loads the divider and VB sags
        </M>
      </g>
    </Scene>
  )
}

export function ExactVsApproxScene() {
  return (
    <Scene caption="The approximation is not a guess — it has a stated condition, and you can check it">
      <rect x="40" y="66" width="286" height="224" rx="12" fill={WHITE} stroke={COOL} strokeWidth="2.3" />
      <M x="183" y="92" size={11} fill={COOL} weight={800}>
        Thevenin the divider
      </M>
      <Src cx="94" cy="196" kind="v" label="VTH" tone={COOL} r="19" />
      <Wire d="M94 177 L94 140 L140 140" stroke={N} width="2.2" />
      <Res x="196" y="140" len="90" label="RTH" tone={COOL} />
      <Wire d="M242 140 L290 140 M94 215 L94 252 L290 252" stroke={N} width="2.2" />
      <M x="183" y="278" size={9.5} fill={MUTED}>
        RTH = R1 ∥ R2 · VTH = VCC R2/(R1+R2)
      </M>

      <rect x="346" y="66" width="288" height="224" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="490" y="92" size={11} fill={SIG} weight={800}>
        the base loop
      </M>
      <M x="490" y="150" size={13} fill={N} weight={800}>
        VTH = IB·RTH + 0.7
      </M>
      <M x="490" y="184" size={13} fill={N} weight={800}>
        + IE·RE
      </M>
      <g className="aecm-pulse">
        <rect x="392" y="206" width="196" height="38" rx="8" fill={BIAS} fillOpacity="0.18" stroke={BIAS} strokeWidth="2.2" />
        <M x="490" y="230" size={12} fill={BIAS} weight={800}>
          (β+1)·RE term
        </M>
      </g>
      <M x="490" y="268" size={9.5} fill={MUTED}>
        drop it and RTH stops mattering
      </M>

      {[
        ['stiff divider', '(β+1)RE = 40 RTH', 1.0, 0.99, GREEN],
        ['marginal', '(β+1)RE = 10 RTH', 1.0, 0.91, BIAS],
        ['soft divider', '(β+1)RE = 2 RTH', 1.0, 0.62, RED],
      ].map(([lab, ratio, ex, ap, tone], i) => (
        <g key={lab} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={40 + i * 274} y="306" width="256" height="128" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={168 + i * 274} y="330" size={11} fill={tone} weight={800}>
            {lab}
          </M>
          <Bars x={128 + i * 274} y={344} w={110} items={[['exact', ex, MUTED], ['approx', ap, tone]]} rowH={30} max={1} />
          <M x={168 + i * 274} y="424" size={9.5} fill={MUTED}>
            {ratio}
          </M>
        </g>
      ))}
      <g className="aecm-emerge">
        <rect x="654" y="66" width="198" height="224" rx="12" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.6" />
        <M x="753" y="112" size={11} fill={GREEN} weight={800}>
          the rule
        </M>
        <M x="753" y="164" size={14} fill={N} weight={800}>
          (β+1)RE
        </M>
        <M x="753" y="192" size={14} fill={N} weight={800}>
          ≥ 10 · RTH
        </M>
        <M x="753" y="238" size={9.5} fill={MUTED}>
          check it, then approximate
        </M>
      </g>
    </Scene>
  )
}

export function CollectorFeedbackScene() {
  return (
    <Scene caption="Feeding back from the collector stabilises the bias — and eats the gain unless you split RB">
      <rect x="40" y="66" width="330" height="310" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Wire d="M300 112 L300 130" stroke={N} width="2.2" />
      <M x="300" y="104" size={10} fill={MUTED}>+VCC</M>
      <Res x="300" y="162" len="58" orient="v" label="RC" tone={N} />
      <Wire d="M300 191 L300 218" stroke={N} width="2.2" />
      <Dot cx="300" cy="218" r="6" fill={ROSE} />
      <Bjt cx="200" cy="258" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M222 218 L300 218 M222 298 L222 328 L110 328" stroke={N} width="2.2" />
      <Gnd x="222" y="328" tone={N} />
      <g className="aecm-feedback">
        <Wire d="M300 218 L300 258 L306 258" stroke={ROSE} width="4" />
      </g>
      <Wire d="M166 258 L110 258 L110 328" stroke={N} width="2.2" />
      <Res x="280" y="258" len="56" label="RB" tone={ROSE} />
      <Wire d="M252 258 L232 258" stroke={ROSE} width="3" />
      <M x="205" y="360" size={10} fill={ROSE} weight={800}>
        RB runs from the collector, not the supply
      </M>

      {['IC ↑', 'VC ↓', 'IB ↓', 'IC ↓'].map((step, i) => (
        <g key={step} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={420 + i * 108} y="82" width="92" height="52" rx="10" fill={WHITE} stroke={i === 3 ? GREEN : ROSE} strokeWidth="2.3" />
          <M x={466 + i * 108} y="113" size={13} fill={i === 3 ? GREEN : ROSE} weight={800}>
            {step}
          </M>
          {i < 3 ? (
            <Wire d={`M${512 + i * 108} 108 L${526 + i * 108} 108`} stroke={MUTED} width="2.2" marker="url(#aecArrM)" />
          ) : null}
        </g>
      ))}

      <g className="aecm-slide-in aecm-delay-3">
        <rect x="420" y="166" width="432" height="140" rx="12" fill={RED} fillOpacity="0.08" stroke={RED} strokeWidth="2.4" />
        <M x="636" y="192" size={11} fill={RED} weight={800}>
          the same path feeds the signal back
        </M>
        <Wire d="M452 250 L560 250" stroke={MUTED} width="1.4" opacity="0.6" />
        <Wave x="452" y="250" w="108" amp="26" cycles={1} stroke={SIG} width="2.4" />
        <M x="506" y="284" size={9.5} fill={SIG} weight={800}>at the base</M>
        <Wire d="M580 250 L592 250" stroke={MUTED} width="2" marker="url(#aecArrM)" />
        <Wire d="M612 250 L820 250" stroke={MUTED} width="1.4" opacity="0.6" />
        <Wave x="612" y="250" w="208" amp="12" cycles={2} stroke={RED} width="2.4" />
        <M x="716" y="284" size={9.5} fill={RED} weight={800}>partly cancelled</M>
      </g>
      <g className="aecm-emerge">
        <rect x="420" y="326" width="432" height="60" rx="12" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="2.4" />
        <M x="636" y="352" size={11.5} fill={GREEN} weight={800}>
          split RB into two halves and decouple the midpoint
        </M>
        <M x="636" y="372" size={10} fill={MUTED}>
          DC feedback kept, AC feedback shunted to ground
        </M>
      </g>
    </Scene>
  )
}

export function BiasDesignFlowScene() {
  const steps = [
    'specify ICQ and VCEQ',
    'allocate VE ≈ 0.1 VCC',
    'RE = VE / IE',
    'RC from the VCE allocation',
    'divider current = 10 IB → R1, R2',
    'snap to E12 values',
  ]
  return (
    <Scene caption="Design forwards, then re-analyse as built — at β min and β max">
      {steps.map((t, i) => (
        <g key={t} className={`aecm-cell-in aecm-delay-${i % 5}`}>
          <rect x="60" y={64 + i * 58} width="452" height="46" rx="11" fill={WHITE} stroke={SIG} strokeWidth="2.2" />
          <M x="86" y={92 + i * 58} size={11} fill={SIG} anchor="start" weight={800}>
            {i + 1}
          </M>
          <M x="300" y={92 + i * 58} size={12} fill={N}>
            {t}
          </M>
          <Wire d={`M286 ${110 + i * 58} L286 ${122 + i * 58}`} stroke={MUTED} width="2" marker="url(#aecArrM)" />
        </g>
      ))}
      <g className="aecm-pulse">
        <rect x="60" y="412" width="452" height="50" rx="11" fill={BIAS} fillOpacity="0.14" stroke={BIAS} strokeWidth="2.8" />
        <M x="286" y="442" size={12} fill={BIAS} weight={800}>
          re-analyse as built, at β min and β max
        </M>
      </g>
      <g className="aecm-feedback">
        <Wire d="M512 437 L556 437 L556 324 L512 324" stroke={BIAS} width="2.4" dash="6 5" marker="url(#aecArrB)" />
      </g>
      <M x="572" y="382" size={9.5} fill={BIAS} anchor="start" weight={800}>
        adjust if Q moved
      </M>

      <M x="736" y="90" size={11.5} fill={N} weight={800}>
        where VCC goes
      </M>
      {[
        ['IC·RC', 0.4, SIG, 0],
        ['VCE', 0.5, GREEN, 0.4],
        ['VE', 0.1, BIAS, 0.9],
      ].map(([lab, frac, tone, off], i) => (
        <g key={lab} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x="660" y={116 + off * 300} width="180" height={300 * frac} rx="9" fill={tone} fillOpacity="0.2" stroke={tone} strokeWidth="2.3" />
          <M x="750" y={116 + off * 300 + (300 * frac) / 2 + 5} size={12} fill={tone} weight={800}>
            {`${lab} · ${Math.round(frac * 100)}%`}
          </M>
        </g>
      ))}
      <M x="750" y="440" size={9.5} fill={MUTED}>
        a workable starting allocation
      </M>
    </Scene>
  )
}

export function TemperatureMechanismsScene() {
  return (
    <Scene caption="Three separate mechanisms, and every one of them pushes IC the same way">
      {[
        ['VBE', '0.7 → 0.6 V', '−2 mV per °C', SIG, 'down'],
        ['ICO', '×32 over the range', 'doubles every 10 °C', BIAS, 'up'],
        ['β', '+25% over the range', '+0.5% per °C', COOL, 'up'],
      ].map(([sym, change, slope, tone, dir], i) => (
        <g key={sym} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={44 + i * 274} y="62" width="256" height="182" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={172 + i * 274} y="88" size={12.5} fill={tone} weight={800}>
            {sym}
          </M>
          <Wire d={`M${76 + i * 274} 204 L${272 + i * 274} 204`} stroke={MUTED} width="1.6" />
          <Wire d={`M${76 + i * 274} 204 L${76 + i * 274} 106`} stroke={MUTED} width="1.6" />
          <Curve
            pts={Array.from({ length: 31 }, (_, k) => {
              const t = k / 30
              const v = dir === 'down' ? 1 - t : i === 1 ? t ** 2 : t
              return [76 + i * 274 + t * 190, 204 - 26 - 62 * v]
            })}
            stroke={tone}
            width="2.8"
          />
          <M x={172 + i * 274} y="224" size={10} fill={MUTED}>
            25 °C → 75 °C
          </M>
          <M x={172 + i * 274} y="128" size={10} fill={tone} weight={800}>
            {change}
          </M>
          <M x={172 + i * 274} y="146" size={9.5} fill={MUTED}>
            {slope}
          </M>
          <Wire d={`M${172 + i * 274} 254 L${172 + i * 274} 316`} stroke={RED} width="2.8" marker="url(#aecArrR)" className="aecm-flow-arrow" />
        </g>
      ))}
      <g className="aecm-emerge">
        <rect x="290" y="326" width="320" height="64" rx="12" fill={RED} fillOpacity="0.12" stroke={RED} strokeWidth="3" />
        <L x="450" y="366" size={17} fill={RED}>
          IC rises
        </L>
      </g>
      <M x="450" y="428" size={11.5} fill={MUTED} weight={800}>
        all three act in the same direction — nothing cancels
      </M>
    </Scene>
  )
}

export function ThermalRunawayScene() {
  const nodes = [
    ['IC rises', 450, 108],
    ['dissipation rises', 690, 236],
    ['junction T rises', 450, 364],
    ['VBE ↓ and β ↑', 210, 236],
  ]
  return (
    <Scene caption="It is a loop with gain — break it electrically, thermally, or watch the device fail">
      <circle cx="450" cy="236" r="128" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="8 7" opacity="0.5" />
      {nodes.map(([t, cx, cy], i) => (
        <g key={t} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={cx - 92} y={cy - 26} width="184" height="52" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.4" />
          <M x={cx} y={cy + 5} size={11.5} fill={RED} weight={800}>
            {t}
          </M>
        </g>
      ))}
      <g className="aecm-spin-slow" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <Wire d="M544 128 L600 212" stroke={RED} width="2.8" marker="url(#aecArrR)" />
        <Wire d="M624 292 L540 348" stroke={RED} width="2.8" marker="url(#aecArrR)" />
        <Wire d="M360 348 L278 292" stroke={RED} width="2.8" marker="url(#aecArrR)" />
        <Wire d="M282 190 L358 128" stroke={RED} width="2.8" marker="url(#aecArrR)" />
      </g>
      <g className="aecm-pop aecm-delay-3">
        <rect x="222" y="118" width="128" height="40" rx="9" fill={GREEN} fillOpacity="0.16" stroke={GREEN} strokeWidth="2.3" />
        <M x="286" y="143" size={9.5} fill={GREEN} weight={800}>
          RE opposes it
        </M>
      </g>
      <g className="aecm-pop aecm-delay-4">
        <rect x="548" y="318" width="146" height="40" rx="9" fill={COOL} fillOpacity="0.16" stroke={COOL} strokeWidth="2.3" />
        <M x="621" y="343" size={9.5} fill={COOL} weight={800}>
          heat sink lowers θ
        </M>
      </g>

      <g className="aecm-cell-in aecm-delay-2">
        <rect x="40" y="376" width="300" height="76" rx="11" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="2.2" />
        <Wire d={RisePath(66, 438, 248, 44, 5)} stroke={GREEN} width="2.6" />
        <M x="190" y="398" size={10} fill={GREEN} weight={800}>
          loop gain &lt; 1: settles
        </M>
      </g>
      <g className="aecm-cell-in aecm-delay-3">
        <rect x="560" y="376" width="300" height="76" rx="11" fill={RED} fillOpacity="0.08" stroke={RED} strokeWidth="2.2" />
        <Curve
          pts={Array.from({ length: 41 }, (_, i) => {
            const t = i / 40
            return [586 + t * 248, 444 - Math.min(62, 3 * Math.exp(3.2 * t))]
          })}
          stroke={RED}
          width="2.6"
        />
        <M x="710" y="398" size={10} fill={RED} weight={800}>
          loop gain &gt; 1: runs away
        </M>
      </g>
    </Scene>
  )
}

export function StabilityFactorScene() {
  const groups = [
    ['fixed', [1, 0.94, 0.98], RED],
    ['emitter', [0.62, 0.58, 0.6], BIAS],
    ['collector fb', [0.5, 0.46, 0.48], BIAS],
    ['divider', [0.18, 0.16, 0.17], GREEN],
  ]
  return (
    <Scene caption="On a log scale the fixed-bias bars tower over everything — that is the whole argument">
      <Wire d="M110 380 L780 380" stroke={MUTED} width="2" />
      <Wire d="M110 380 L110 96" stroke={MUTED} width="2" marker="url(#aecArr)" />
      <M x="100" y="92" size={10.5} fill={MUTED} anchor="end" weight={800}>
        S (log)
      </M>
      <Wire d="M110 360 L780 360" stroke={GREEN} width="1.8" dash="6 5" />
      <M x="786" y="356" size={10} fill={GREEN} anchor="start" weight={800}>
        ideal: S = 1
      </M>
      {groups.map(([name, vals, tone], g) =>
        vals.map((v, k) => (
          <g key={`${name}${k}`} className={`aecm-bar aecm-delay-${g}`} style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}>
            <rect
              x={140 + g * 168 + k * 38}
              y={(360 - v * 250).toFixed(1)}
              width="30"
              height={(v * 250).toFixed(1)}
              rx="5"
              fill={tone}
              fillOpacity={0.35 + k * 0.22}
              stroke={tone}
              strokeWidth="1.8"
            />
          </g>
        )),
      )}
      {groups.map(([name, , tone], g) => (
        <M key={name} x={197 + g * 168} y="402" size={11} fill={tone} weight={800}>
          {name}
        </M>
      ))}
      {['S(ICO)', 'S(VBE)', 'S(β)'].map((lab, k) => (
        <g key={lab} className="aecm-fade-in">
          <rect x={560 + k * 100} y="110" width="88" height="24" rx="6" fill={MUTED} fillOpacity={0.18 + k * 0.16} />
          <M x={604 + k * 100} y="127" size={9.5} fill={N} weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <Card
        x="120"
        y="410"
        w="660"
        h="56"
        title="the three definitions"
        accent={COOL}
        mono
        lines={['S(ICO) = ∂IC/∂ICO    S(VBE) = ∂IC/∂VBE    S(β) = ∂IC/∂β']}
        linesY={48}
        className="aecm-emerge"
      />
    </Scene>
  )
}

export function DcAcEquivalentsScene() {
  return (
    <Scene caption="Two circuits from one schematic — and they answer completely different questions">
      {[
        ['the schematic', SIG, 'full'],
        ['DC equivalent', BIAS, 'dc'],
        ['AC equivalent', GREEN, 'ac'],
      ].map(([title, tone, mode], i) => {
        const x = 40 + i * 274
        return (
          <g key={title} className={`aecm-cell-in aecm-delay-${i}`}>
            <rect x={x} y="62" width="256" height="300" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
            <rect x={x} y="62" width="256" height="28" rx="12" fill={tone} />
            <L x={x + 128} y="82" size={11.5} fill={WHITE}>
              {title}
            </L>
            {mode === 'ac' ? (
              <g>
                <Wire d={`M${x + 24} 116 L${x + 232} 116`} stroke={GREEN} width="4.4" />
                <M x={x + 128} y="108" size={9} fill={GREEN} weight={800}>
                  VCC collapses to ground
                </M>
              </g>
            ) : (
              <Wire d={`M${x + 40} 116 L${x + 216} 116`} stroke={N} width="2.2" />
            )}
            <Res x={x + 60} y="152" len="46" orient="v" label="R1" tone={N} />
            <Res x={x + 60} y="252" len="46" orient="v" label="R2" tone={N} />
            <Res x={x + 208} y="152" len="46" orient="v" label="RC" tone={N} />
            <Wire d={`M${x + 60} 116 L${x + 60} 129 M${x + 60} 175 L${x + 60} 202 M${x + 60} 229 L${x + 60} 202 M${x + 60} 275 L${x + 60} 320 M${x + 208} 116 L${x + 208} 129 M${x + 208} 175 L${x + 208} 198`} stroke={N} width="2" />
            <Bjt cx={x + 136} cy="222" kind="npn" label="" tone={N} ring={false} />
            <Wire d={`M${x + 60} 202 L${x + 102} 202 M${x + 158} 182 L${x + 208} 182`} stroke={N} width="2" />
            {mode === 'ac' ? (
              <Wire d={`M${x + 158} 262 L${x + 158} 320 L${x + 60} 320`} stroke={GREEN} width="3.2" />
            ) : (
              <g>
                <Res x={x + 158} y="286" len="42" orient="v" label="RE" tone={N} />
                <Wire d={`M${x + 158} 262 L${x + 158} 265 M${x + 158} 307 L${x + 158} 320 L${x + 60} 320`} stroke={N} width="2" />
              </g>
            )}
            {mode === 'dc' ? (
              <g className="aecm-pulse">
                <rect x={x + 88} y="192" width="16" height="22" rx="4" fill={MUTED} fillOpacity="0.4" stroke={MUTED} strokeWidth="1.8" />
                <rect x={x + 202} y="172" width="16" height="22" rx="4" fill={MUTED} fillOpacity="0.4" stroke={MUTED} strokeWidth="1.8" />
                <M x={x + 128} y="348" size={9.5} fill={BIAS} weight={800}>
                  capacitors open
                </M>
              </g>
            ) : null}
            {mode === 'ac' ? (
              <M x={x + 128} y="348" size={9.5} fill={GREEN} weight={800}>
                capacitors short, RE bypassed away
              </M>
            ) : null}
            {mode === 'full' ? (
              <M x={x + 128} y="348" size={9.5} fill={MUTED}>
                coupling and bypass capacitors present
              </M>
            ) : null}
          </g>
        )
      })}
      <g className="aecm-emerge">
        <rect x="190" y="388" width="520" height="52" rx="12" fill={SKY} stroke={COOL} strokeWidth="2.4" />
        <M x="450" y="419" size={13} fill={COOL} weight={800}>
          total response = DC bias + AC signal
        </M>
      </g>
    </Scene>
  )
}

export function ReModelScene() {
  return (
    <Scene caption="Swap the transistor for two elements and the amplifier becomes a resistor problem">
      <g className="aecm-emerge">
        <rect x="250" y="56" width="400" height="40" rx="10" fill={GOLD} fillOpacity="0.14" stroke={GOLD} strokeWidth="2.4" />
        <M x="450" y="82" size={14} fill={GOLD} weight={800}>
          re = 26 mV / IE(mA)
        </M>
      </g>

      <rect x="40" y="114" width="240" height="180" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Bjt cx="120" cy="204" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M188 204 L224 204" stroke={SIG} width="2.6" marker="url(#aecArrS)" className="aecm-flow-arrow" />
      <M x="252" y="208" size={11} fill={SIG} weight={800}>
        →
      </M>

      <rect x="300" y="114" width="300" height="180" rx="12" fill={WHITE} stroke={COOL} strokeWidth="2.3" />
      <M x="450" y="138" size={11} fill={COOL} weight={800}>
        the re model
      </M>
      <Res x="360" y="212" len="60" orient="v" label="β·re" tone={COOL} />
      <Wire d="M330 182 L360 182 M360 242 L330 242 L330 182" stroke={N} width="2.2" />
      <Src cx="500" cy="212" kind="i" tone={BIAS} dep r="26" />
      <M x="538" y="216" size={11} fill={BIAS} anchor="start" weight={800}>
        β·ib
      </M>
      <Wire d="M500 186 L500 162 L580 162 M500 238 L500 264 L580 264" stroke={N} width="2.2" />
      <M x="450" y="284" size={9.5} fill={MUTED}>
        one resistor in, one current source out
      </M>

      {[
        ['Zi = R1 ∥ R2 ∥ β·re', SIG],
        ['Av = − (RC ∥ RL) / re', BIAS],
        ['Zo = RC', GREEN],
      ].map(([r, tone], i) => (
        <g key={r} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x="620" y={126 + i * 62} width="232" height="50" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.4" />
          <M x="736" y={157 + i * 62} size={12.5} fill={tone} weight={800}>
            {r}
          </M>
        </g>
      ))}

      <g className="aecm-slide-in aecm-delay-4">
        <rect x="40" y="322" width="812" height="106" rx="12" fill={SKY} stroke={COOL} strokeWidth="2.3" />
        <M x="446" y="350" size={11.5} fill={COOL} weight={800}>
          the minus sign in Av is the 180° inversion, not an algebra slip
        </M>
        <Wire d="M110 400 L380 400" stroke={MUTED} width="1.3" opacity="0.6" />
        <Wave x="110" y="400" w="270" amp="20" cycles={1} stroke={SIG} width="2.4" />
        <Wire d="M500 400 L820 400" stroke={MUTED} width="1.3" opacity="0.6" />
        <Wave x="500" y="400" w="320" amp="20" cycles={1} phase={Math.PI} stroke={BIAS} width="2.4" />
        <Wire d="M410 400 L470 400" stroke={MUTED} width="2" marker="url(#aecArrM)" />
      </g>
    </Scene>
  )
}

export function ThreeConfigsScene() {
  const cfg = [
    ['common emitter', 'Zi ≈ βre', 'Av large, inverting', SIG, 0.5],
    ['common base', 'Zi ≈ re', 'Av large, non-inverting', BIAS, 0.05],
    ['common collector', 'Zi ≈ β(re+RE)', 'Av ≈ 1', GREEN, 0.95],
  ]
  return (
    <Scene caption="Same three elements; only where you attach input and output changes">
      {cfg.map(([name, zi, av, tone], i) => (
        <g key={name} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={40 + i * 274} y="62" width="256" height="256" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={40 + i * 274} y="62" width="256" height="28" rx="12" fill={tone} />
          <L x={168 + i * 274} y="82" size={11} fill={WHITE}>
            {name}
          </L>
          <Res x={100 + i * 274} y="176" len="56" orient="v" label="βre" tone={MUTED} />
          <Src cx={222 + i * 274} cy="176" kind="i" tone={MUTED} dep r="20" />
          <Res x={222 + i * 274} y="262" len="48" orient="v" label="RC" tone={MUTED} />
          <Wire
            d={`M${100 + i * 274} 148 L${100 + i * 274} 120 L${222 + i * 274} 120 L${222 + i * 274} 156 M${100 + i * 274} 204 L${100 + i * 274} 232 L${222 + i * 274} 232 L${222 + i * 274} 196 M${222 + i * 274} 232 L${222 + i * 274} 238 M${222 + i * 274} 286 L${222 + i * 274} 296`}
            stroke={MUTED}
            width="2"
          />
          <g className="aecm-pulse">
            <circle cx={100 + i * 274} cy={i === 1 ? 232 : 120} r="9" fill="none" stroke={tone} strokeWidth="3" />
            <circle cx={222 + i * 274} cy={i === 2 ? 232 : 120} r="9" fill="none" stroke={tone} strokeWidth="3" />
          </g>
          <M x={168 + i * 274} y="266" size={10.5} fill={tone} weight={800}>
            {zi}
          </M>
          <M x={168 + i * 274} y="288" size={10} fill={MUTED}>
            {av}
          </M>
        </g>
      ))}
      <Wire d="M110 400 L820 400" stroke={MUTED} width="2" marker="url(#aecArr)" />
      <L x="810" y="434" size={11.5} fill={MUTED} weight={700} anchor="end">
        input impedance (log)
      </L>
      {cfg.map(([name, , , tone, pos], i) => (
        <g key={`m${name}`} className={`aecm-pop aecm-delay-${i}`}>
          <Dot cx={(110 + 700 * pos).toFixed(1)} cy="400" r="8" fill={tone} />
          <M x={(110 + 700 * pos).toFixed(1)} y="382" size={9.5} fill={tone} weight={800}>
            {name.replace('common ', 'C')}
          </M>
        </g>
      ))}
      <M x="140" y="368" size={9.5} fill={MUTED} anchor="start">tens of Ω</M>
      <M x="800" y="368" size={9.5} fill={MUTED} anchor="end">hundreds of kΩ</M>
    </Scene>
  )
}

export function HybridPiScene() {
  return (
    <Scene caption="The h parameters are what the datasheet prints; hybrid π is what works above midband">
      <rect x="40" y="62" width="380" height="216" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="230" y="88" size={11.5} fill={SIG} weight={800}>
        h-parameter two-port
      </M>
      <Block x="150" y="132" w="160" h="88" label="h" stroke={SIG} />
      <Wire d="M86 154 L150 154 M86 198 L150 198 M310 154 L374 154 M310 198 L374 198" stroke={N} width="2.2" />
      <M x="120" y="146" size={9} fill={MUTED}>hie</M>
      <M x="120" y="218" size={9} fill={MUTED}>hre</M>
      <M x="344" y="146" size={9} fill={MUTED}>hfe</M>
      <M x="344" y="218" size={9} fill={MUTED}>hoe</M>
      <M x="230" y="254" size={9.5} fill={MUTED}>
        measured at a stated IC and VCE
      </M>

      <Panel
        x="40"
        y="292"
        w="380"
        title="datasheet extract"
        rows={[['hie', '1.4 kΩ'], ['hfe', '180'], ['hre', '1.6 × 10⁻⁴'], ['hoe', '18 µS']]}
        accent={MUTED}
        className="aecm-slide-in aecm-delay-2"
        rowH={26}
      />

      <rect x="450" y="62" width="402" height="216" rx="12" fill={WHITE} stroke={COOL} strokeWidth="2.3" />
      <M x="651" y="88" size={11.5} fill={COOL} weight={800}>
        hybrid π
      </M>
      <Res x="520" y="176" len="60" orient="v" label="rπ" tone={COOL} />
      <Wire d="M486 146 L520 146 M520 206 L486 206 L486 146" stroke={N} width="2.2" />
      <Src cx="650" cy="176" kind="i" tone={BIAS} dep r="24" />
      <M x="650" y="228" size={10} fill={BIAS} weight={800}>gm·vπ</M>
      <Res x="740" y="176" len="60" orient="v" label="ro" tone={MUTED} />
      <Wire d="M650 152 L650 128 L816 128 M650 200 L650 228 M650 240 L816 240 M740 146 L740 128 M740 206 L740 240" stroke={N} width="2.2" />
      <g className="aecm-pulse">
        <Cap x="590" y="176" len="52" orient="v" label="Cπ" tone={ROSE} />
        <Cap x="700" y="128" len="52" label="Cμ" tone={ROSE} />
      </g>
      <Wire d="M590 146 L590 150 M590 202 L590 206 M590 146 L520 146 M590 206 L520 206" stroke={N} width="1.8" />

      <g className="aecm-slide-in aecm-delay-3">
        <rect x="450" y="292" width="402" height="56" rx="11" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="651" y="326" size={12.5} fill={GOLD} weight={800}>
          hfe = β · hie = β·re · gm = IC / 26 mV
        </M>
      </g>
      <Wire d="M470 412 L836 412" stroke={MUTED} width="2" marker="url(#aecArr)" />
      <rect x="470" y="386" width="180" height="20" rx="6" fill={GREEN} fillOpacity="0.22" />
      <M x="560" y="400" size={9} fill={GREEN} weight={800}>both work</M>
      <rect x="650" y="386" width="170" height="20" rx="6" fill={ROSE} fillOpacity="0.22" />
      <M x="735" y="400" size={9} fill={ROSE} weight={800}>hybrid π only</M>
      <M x="651" y="440" size={9.5} fill={MUTED}>
        the two capacitances are the whole difference
      </M>
    </Scene>
  )
}

export function BiasGainTradeoffScene() {
  return (
    <Scene caption="re links the DC half to the AC half — that is why the two cannot be designed separately">
      <Axes x="110" y="390" w="440" h="300" xLabel="bias current IC" yLabel="" />
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const t = i / 40
          return [110 + t * 420, 390 - 240 * Math.sqrt(t)]
        })}
        stroke={GREEN}
        width="3.2"
        className="aecm-draw"
      />
      <M x="470" y="150" size={10.5} fill={GREEN} anchor="end" weight={800}>
        gain ∝ 1/re ∝ IC
      </M>
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const t = i / 40
          return [110 + t * 420, 150 + 240 * t]
        })}
        stroke={BIAS}
        width="3.2"
        className="aecm-draw aecm-delay-2"
      />
      <M x="470" y="372" size={10.5} fill={BIAS} anchor="end" weight={800}>
        available swing falls
      </M>
      <g className="aecm-pop aecm-delay-3">
        <Dot cx="296" cy="246" r="9" fill={ROSE} />
        <Wire d="M296 246 L296 390" stroke={ROSE} width="1.8" dash="5 4" />
        <M x="296" y="226" size={11} fill={ROSE} weight={800}>
          practical compromise
        </M>
      </g>

      {[
        ['DC circuit', 'find IE', SIG],
        ['re from IE', '26 mV / IE', ROSE],
        ['AC circuit', 'model inserted', COOL],
        ['gain, Zi, Zo', 'the answer', GREEN],
      ].map(([t, sub, tone], i) => (
        <g key={t} className={i === 1 ? 'aecm-pulse' : `aecm-cell-in aecm-delay-${i}`}>
          <rect x="600" y={78 + i * 88} width="252" height="66" rx="12" fill={WHITE} stroke={tone} strokeWidth={i === 1 ? 3.2 : 2.3} />
          <M x="726" y={106 + i * 88} size={12} fill={tone} weight={800}>
            {t}
          </M>
          <M x="726" y={128 + i * 88} size={10} fill={MUTED}>
            {sub}
          </M>
          {i < 3 ? (
            <Wire d={`M726 ${144 + i * 88} L726 ${162 + i * 88}`} stroke={MUTED} width="2.2" marker="url(#aecArrM)" />
          ) : null}
        </g>
      ))}
      <M x="726" y="452" size={10} fill={MUTED} weight={800}>
        step 2 is the bridge between the halves
      </M>
    </Scene>
  )
}

/* ── Module 3 — gain, frequency response and multistage ─────────── */

/**
 * Exact band-pass magnitude in dB across a log frequency axis, for a single
 * low corner and a single high corner given in decades. `nLow`/`nHigh` are the
 * number of coincident poles at each end, which is what a cascade produces.
 */
function bandPts(x0, w, base, dbPerPx, midDb, dLow, dHigh, nLow = 1, nHigh = 1, decades = 7, steps = 140) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const d = (decades * i) / steps
    const rLow = 10 ** (d - dLow)
    const rHigh = 10 ** (d - dHigh)
    const mag =
      (rLow / Math.sqrt(1 + rLow * rLow)) ** nLow * (1 / Math.sqrt(1 + rHigh * rHigh)) ** nHigh
    const db = midDb + 20 * Math.log10(Math.max(mag, 1e-6))
    pts.push([x0 + (d / decades) * w, base - db * dbPerPx])
  }
  return pts
}

export function SourceLoadingScene() {
  return (
    <Scene caption="The amplifier never sees Vs — it sees whatever the divider leaves">
      <Src cx="90" cy="150" kind="v" label="Vs" tone={SIG} r="22" />
      <Wire d="M90 128 L90 100 L160 100" stroke={N} width="2.4" />
      <Res x="222" y="100" len="106" label="Rs" tone={BIAS} />
      <Wire d="M275 100 L360 100" stroke={N} width="2.4" />
      <Dot cx="360" cy="100" r="6" fill={COOL} />
      <Res x="360" y="164" len="68" orient="v" label="Zi" tone={COOL} />
      <Wire d="M360 100 L360 130 M360 198 L360 226 M90 172 L90 226 L360 226" stroke={N} width="2.4" />
      <M x="378" y="94" size={11} fill={COOL} anchor="start" weight={800}>
        Vi
      </M>
      <g className="aecm-emerge">
        <path d="M160 64 L160 54 M160 59 L360 59 M360 64 L360 54" stroke={ROSE} strokeWidth="2.2" fill="none" />
        <M x="260" y="44" size={12} fill={ROSE} weight={800}>
          Vi/Vs = Zi/(Zi + Rs)
        </M>
      </g>
      <AmpTri cx="480" cy="150" w="96" h="84" label="Av" tone={SIG} className="aecm-cell-in aecm-delay-2" />
      <Wire d="M400 150 L432 150 M528 150 L600 150" stroke={N} width="2.4" marker="url(#aecArr)" />
      <M x="616" y="154" size={11.5} fill={GREEN} anchor="start" weight={800}>
        Vo
      </M>

      {[
        ['Rs = 0.1 Zi', 0.91, GREEN],
        ['Rs = Zi', 0.5, BIAS],
        ['Rs = 10 Zi', 0.09, RED],
      ].map(([lab, frac, tone], i) => (
        <g key={lab} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={60 + i * 272} y="278" width="252" height="102" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={186 + i * 272} y="304" size={11} fill={tone} weight={800}>
            {lab}
          </M>
          <rect x={92 + i * 272} y="320" width="188" height="24" rx="7" fill={SKY} />
          <g className="aecm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
            <rect x={92 + i * 272} y="320" width={188 * frac} height="24" rx="7" fill={tone} />
          </g>
          <M x={186 + i * 272} y="366" size={12} fill={tone} weight={800}>
            {`${Math.round(frac * 100)}% survives`}
          </M>
        </g>
      ))}
      <M x="450" y="424" size={11} fill={MUTED} weight={800}>
        this loss happens before the amplifier does anything at all
      </M>
    </Scene>
  )
}

export function LoadParallelScene() {
  return (
    <Scene caption="RL parallels RC, and it is that parallel value the gain is proportional to">
      <Wire d="M240 90 L240 128" stroke={N} width="2.4" />
      <M x="240" y="80" size="10" fill={MUTED}>AC ground</M>
      <Res x="240" y="164" len="64" orient="v" label="RC" tone={SIG} />
      <Wire d="M240 196 L240 232" stroke={N} width="2.4" />
      <Dot cx="240" cy="232" r="7" fill={N} />
      <Res x="240" y="290" len="64" orient="v" label="RL" tone={BIAS} />
      <Wire d="M240 232 L240 258 M240 322 L240 356" stroke={N} width="2.4" />
      <Gnd x="240" y="356" tone={N} />
      <Wire d="M240 232 L170 232" stroke={N} width="2.4" />
      <M x="158" y="236" size={10.5} fill={MUTED} anchor="end">
        collector
      </M>
      <g className="aecm-emerge">
        <path d="M312 132 L322 132 M317 132 L317 322 M312 322 L322 322" stroke={ROSE} strokeWidth="2.2" fill="none" />
        <M x="334" y="232" size={11.5} fill={ROSE} anchor="start" weight={800}>
          AC load = RC ∥ RL
        </M>
      </g>

      {[
        ['RL = 10 RC', 0.91, GREEN],
        ['RL = RC', 0.5, BIAS],
        ['RL = 0.1 RC', 0.09, RED],
      ].map(([lab, frac, tone], i) => (
        <g key={lab} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x="540" y={70 + i * 88} width="310" height="72" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x="606" y={100 + i * 88} size={10.5} fill={tone} anchor="start" weight={800}>
            {lab}
          </M>
          <rect x="606" y={112 + i * 88} width="186" height="18" rx="6" fill={SKY} />
          <g className="aecm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
            <rect x="606" y={112 + i * 88} width={186 * frac} height="18" rx="6" fill={tone} />
          </g>
          <M x="820" y={126 + i * 88} size={11} fill={tone} anchor="end" weight={800}>
            {`${Math.round(frac * 100)}%`}
          </M>
        </g>
      ))}
      <M x="695" y="358" size={10.5} fill={MUTED} weight={800}>
        gain, as a fraction of the unloaded value
      </M>

      <g className="aecm-slide-in aecm-delay-4">
        <Block x="540" y="384" w="120" h="58" label="stage 1" stroke={SIG} />
        <Block x="730" y="384" w="120" h="58" label="stage 2" stroke={COOL} />
        <Wire d="M660 413 L730 413" stroke={BIAS} width="2.6" marker="url(#aecArrB)" className="aecm-flow-arrow" />
        <M x="695" y="400" size={9} fill={BIAS} weight={800}>
          Zi₂ is the load on stage 1
        </M>
      </g>
    </Scene>
  )
}

export function TwoPortChainScene() {
  return (
    <Scene caption="Each junction takes its cut — the overall gain is always below the product">
      <Src cx="60" cy="176" kind="v" label="Vs" tone={SIG} r="17" />
      <Res x="120" y="150" len="52" label="Rs" tone={BIAS} />
      <Wire d="M60 159 L60 150 L94 150 M146 150 L172 150" stroke={N} width="2.1" />
      {[0, 1, 2].map((i) => (
        <g key={i} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={172 + i * 224} y="106" width="200" height="132" rx="12" fill={WHITE} stroke={[SIG, COOL, GREEN][i]} strokeWidth="2.3" />
          <Res x={206 + i * 224} y="150" len="44" orient="v" label="Zi" tone={MUTED} />
          <Wire d={`M${172 + i * 224} 150 L${206 + i * 224} 150 M${206 + i * 224} 172 L${206 + i * 224} 212 L${172 + i * 224} 212`} stroke={N} width="2" />
          <Src cx={286 + i * 224} cy="168" kind="v" tone={[SIG, COOL, GREEN][i]} dep r="18" />
          <Res x={338 + i * 224} y="150" len="40" label="Zo" tone={MUTED} />
          <Wire d={`M${286 + i * 224} 150 L${318 + i * 224} 150 M${358 + i * 224} 150 L${372 + i * 224} 150 M${286 + i * 224} 186 L${286 + i * 224} 212 L${372 + i * 224} 212`} stroke={N} width="2" />
          <M x={272 + i * 224} y="130" size={9} fill={[SIG, COOL, GREEN][i]} anchor="end" weight={800}>
            Avnl·Vi
          </M>
          <M x={272 + i * 224} y="256" size={10.5} fill={[SIG, COOL, GREEN][i]} weight={800}>
            {`stage ${i + 1}`}
          </M>
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={`j${i}`} className={`aecm-pop aecm-delay-${i + 2}`}>
          <M x={384 + i * 224} y="96" size={9} fill={ROSE} weight={800}>
            Zi₂/(Zo₁+Zi₂)
          </M>
          <Wire d={`M${372 + i * 224} 150 L${396 + i * 224} 150`} stroke={ROSE} width="2.4" />
        </g>
      ))}
      <M x="160" y="96" size={9} fill={ROSE} anchor="end" weight={800}>
        Zi₁/(Rs+Zi₁)
      </M>

      {[
        ['Avnl₁ × Avnl₂ × Avnl₃', '= 1000', MUTED],
        ['× source divider', '× 0.83', ROSE],
        ['× two interstage dividers', '× 0.72', ROSE],
        ['overall', '= 598', GREEN],
      ].map(([lab, val, tone], i) => (
        <g key={lab} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x="140" y={292 + i * 42} width="620" height="34" rx="8" fill={WHITE} stroke={tone} strokeWidth={i === 3 ? 2.8 : 1.9} />
          <M x="164" y={314 + i * 42} size={11} fill={N} anchor="start">
            {lab}
          </M>
          <M x="736" y={314 + i * 42} size={11.5} fill={tone} anchor="end" weight={800}>
            {val}
          </M>
        </g>
      ))}
    </Scene>
  )
}

export function DecibelLadderScene() {
  const rungs = [
    ['1', '0 dB'],
    ['1.414', '3 dB'],
    ['2', '6 dB'],
    ['10', '20 dB'],
    ['100', '40 dB'],
    ['1000', '60 dB'],
  ]
  return (
    <Scene caption="Decibels turn the cascade multiplication into an addition — that is the only reason they exist">
      <Wire d="M240 398 L240 82" stroke={MUTED} width="2.4" />
      {rungs.map(([ratio, db], i) => (
        <g key={db} className={`aecm-cell-in aecm-delay-${i % 5}`}>
          <Wire d={`M200 ${378 - i * 58} L280 ${378 - i * 58}`} stroke={SIG} width="2.6" />
          <M x="188" y={382 - i * 58} size={12} fill={N} anchor="end" weight={800}>
            {ratio}
          </M>
          <M x="292" y={382 - i * 58} size={12} fill={SIG} anchor="start" weight={800}>
            {db}
          </M>
        </g>
      ))}
      <M x="188" y="62" size={10} fill={MUTED} anchor="end" weight={800}>
        voltage ratio
      </M>
      <M x="292" y="62" size={10} fill={SIG} anchor="start" weight={800}>
        decibels
      </M>

      {['20 dB', '26 dB', '14 dB'].map((g, i) => (
        <g key={g} className={`aecm-cell-in aecm-delay-${i}`}>
          <Block x={440 + i * 124} y={110} w={100} h={62} label={g} stroke={COOL} />
          {i < 2 ? (
            <M x={556 + i * 124} y="146" size={17} fill={N} weight={800}>
              +
            </M>
          ) : null}
        </g>
      ))}
      <g className="aecm-emerge">
        <M x="812" y="146" size={17} fill={N} weight={800}>=</M>
        <rect x="440" y="196" width="408" height="46" rx="11" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.6" />
        <M x="644" y="226" size={15} fill={GREEN} weight={800}>
          60 dB total
        </M>
      </g>
      <M x="644" y="272" size={12} fill={MUTED} weight={700}>
        10 × 20 × 5 = 1000
      </M>

      <Card
        x="440"
        y="298"
        w="408"
        h="112"
        title="the two formulae, and why they differ"
        accent={GOLD}
        lines={['voltage: 20 log₁₀(V₂/V₁)', 'power: 10 log₁₀(P₂/P₁)', 'the 2 comes from P ∝ V²']}
        linesY={58}
        lineH={22}
        className="aecm-slide-in aecm-delay-3"
      />
    </Scene>
  )
}

export function BodeAnatomyScene() {
  const x0 = 110
  const w = 660
  const base = 400
  return (
    <Scene caption="Two straight lines and one corner each — the smooth curve only matters within 3 dB of them">
      <Wire d={`M${x0} ${base} L${x0 + w + 20} ${base}`} stroke={MUTED} width="2.2" marker="url(#aecArr)" />
      <Wire d={`M${x0} ${base} L${x0} 86`} stroke={MUTED} width="2.2" marker="url(#aecArr)" />
      <L x={x0 + w} y={base + 34} size={12} fill={MUTED} weight={700} anchor="end">
        frequency (log)
      </L>
      <L x={x0 - 10} y="78" size={12} fill={MUTED} weight={700} anchor="end">
        gain (dB)
      </L>
      <Wire d={`M${x0 + 190} 150 L${x0 + 470} 150`} stroke={SIG} width="3.4" className="aecm-draw" />
      <Wire d={`M${x0 + 190} 150 L${x0 + 20} 320`} stroke={SIG} width="2.6" dash="7 5" className="aecm-draw aecm-delay-1" />
      <Wire d={`M${x0 + 470} 150 L${x0 + 640} 320`} stroke={SIG} width="2.6" dash="7 5" className="aecm-draw aecm-delay-1" />
      <M x={x0 + 70} y="272" size={10} fill={SIG} weight={800}>
        +20 dB/decade
      </M>
      <M x={x0 + 590} y="272" size={10} fill={SIG} weight={800}>
        −20 dB/decade
      </M>
      <Curve pts={bandPts(x0, w, base, 4.2, 60, 1.7, 5.2)} stroke={BIAS} width="3" className="aecm-draw aecm-delay-3" />
      <Wire d={`M${x0} 163 L${x0 + w} 163`} stroke={ROSE} width="2" dash="6 5" className="aecm-sweep-x" />
      <M x={x0 + w} y="155" size={10} fill={ROSE} anchor="end" weight={800}>
        3 dB below midband
      </M>
      {[
        [x0 + 190, 'fL'],
        [x0 + 470, 'fH'],
      ].map(([x, lab], i) => (
        <g key={lab} className={`aecm-pop aecm-delay-${i}`}>
          <Wire d={`M${x} 150 L${x} ${base}`} stroke={ROSE} width="1.8" dash="5 4" />
          <M x={x} y={base + 20} size={12} fill={ROSE} weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <g className="aecm-emerge">
        <path
          d={`M${x0 + 190} ${base + 40} L${x0 + 190} ${base + 50} M${x0 + 190} ${base + 45} L${x0 + 470} ${base + 45} M${x0 + 470} ${base + 40} L${x0 + 470} ${base + 50}`}
          stroke={GREEN}
          strokeWidth="2.4"
          fill="none"
        />
        <M x={x0 + 330} y={base + 66} size={12.5} fill={GREEN} weight={800}>
          bandwidth = fH − fL
        </M>
      </g>
      <M x={x0 + 330} y="112" size={10.5} fill={MUTED} weight={800}>
        asymptotes are straight lines on log axes
      </M>
    </Scene>
  )
}

export function CouplingPoleScene() {
  return (
    <Scene caption="The capacitor sees Rs + Zi, and that product is the corner — nothing else enters">
      <Src cx="70" cy="180" kind="v" label="Vs" tone={SIG} r="18" />
      <Wire d="M70 162 L70 130 L130 130" stroke={N} width="2.3" />
      <Res x="180" y="130" len="86" label="Rs" tone={BIAS} />
      <Wire d="M223 130 L266 130" stroke={N} width="2.3" />
      <Cap x="300" y="130" len="62" label="C" tone={ROSE} />
      <Wire d="M331 130 L380 130" stroke={N} width="2.3" />
      <Res x="380" y="192" len="64" orient="v" label="Zi" tone={COOL} />
      <Wire d="M380 130 L380 160 M380 224 L380 258 M70 198 L70 258 L380 258" stroke={N} width="2.3" />
      <g className="aecm-emerge">
        <path d="M130 84 L130 74 M130 79 L380 79 M380 84 L380 74" stroke={GREEN} strokeWidth="2.2" fill="none" />
        <M x="255" y="64" size={11.5} fill={GREEN} weight={800}>
          R = Rs + Zi, what C sees
        </M>
      </g>

      <Wire d="M500 380 L840 380" stroke={MUTED} width="2" marker="url(#aecArr)" />
      <Wire d="M500 380 L500 110" stroke={MUTED} width="2" />
      <L x="830" y="414" size={11} fill={MUTED} weight={700} anchor="end">
        frequency (log)
      </L>
      {[
        [0.9, 'C small', RED],
        [1.7, 'C medium', BIAS],
        [2.6, 'C large', GREEN],
      ].map(([d, lab, tone], i) => (
        <g key={lab} className={`aecm-draw aecm-delay-${i}`}>
          <Curve pts={bandPts(500, 330, 380, 4.4, 52, d, 9, 1, 1, 5, 100)} stroke={tone} width="2.6" />
          <M x={(500 + (d / 5) * 330).toFixed(1)} y={128 + i * 22} size={9.5} fill={tone} anchor="start" weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <M x="670" y="96" size={10.5} fill={MUTED} weight={800}>
        bigger C, lower corner
      </M>
      <M x="560" y="356" size={9.5} fill={MUTED} anchor="start">
        +20 dB/decade below the corner
      </M>

      <Card
        x="60"
        y="296"
        w="380"
        h="130"
        title="two things students get wrong"
        accent={RED}
        lines={['f = 1/(2π(Rs+Zi)C), not 1/(2πZiC)', 'an electrolytic is polarised — check', 'the DC voltage across it has the right sign']}
        linesY={62}
        lineH={22}
        className="aecm-slide-in aecm-delay-4"
      />
    </Scene>
  )
}

export function BypassShelfScene() {
  return (
    <Scene caption="The bypass pole usually dominates, because the resistance it sees is tiny">
      <rect x="40" y="70" width="360" height="230" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Bjt cx="150" cy="140" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M172 180 L172 208" stroke={N} width="2.3" />
      <Res x="172" y="238" len="54" orient="v" label="RE" tone={BIAS} />
      <Wire d="M172 265 L172 282" stroke={N} width="2.3" />
      <Gnd x="172" y="282" tone={N} />
      <Cap x="284" y="238" len="54" orient="v" label="CE" tone={ROSE} />
      <Wire d="M284 208 L284 211 M284 265 L284 282 L172 282 M172 208 L284 208" stroke={N} width="2.3" />
      <g className="aecm-pulse">
        <rect x="60" y="326" width="340" height="96" rx="11" fill={ROSE} fillOpacity="0.1" stroke={ROSE} strokeWidth="2.4" />
        <M x="230" y="352" size={10.5} fill={ROSE} weight={800}>
          what CE sees
        </M>
        <M x="230" y="380" size={13} fill={N} weight={800}>
          RE ∥ (re + Rs/β)
        </M>
        <M x="230" y="404" size={9.5} fill={MUTED}>
          often a few ohms — so the corner sits high
        </M>
      </g>

      <Wire d="M450 380 L850 380" stroke={MUTED} width="2" marker="url(#aecArr)" />
      <Wire d="M450 380 L450 96" stroke={MUTED} width="2" />
      <L x="840" y="414" size={11} fill={MUTED} weight={700} anchor="end">
        frequency (log)
      </L>
      <Wire d="M660 130 L840 130" stroke={SIG} width="3.2" className="aecm-draw" />
      <M x="756" y="118" size={10} fill={SIG} weight={800}>
        bypassed gain
      </M>
      <rect x="450" y="248" width="210" height="10" fill={BIAS} fillOpacity="0.4" className="aecm-fade-in aecm-delay-2" />
      <Wire d="M470 252 L560 252" stroke={BIAS} width="3.2" className="aecm-draw aecm-delay-2" />
      <M x="516" y="238" size={10} fill={BIAS} weight={800}>
        the shelf: unbypassed gain
      </M>
      <Wire d="M560 252 L660 130" stroke={SIG} width="3" className="aecm-draw aecm-delay-3" />
      <Wire d="M450 322 L470 252" stroke={MUTED} width="2.4" dash="6 5" className="aecm-draw aecm-delay-4" />
      {[
        [470, 'coupling pole', MUTED],
        [610, 'bypass pole', ROSE],
      ].map(([x, lab, tone], i) => (
        <g key={lab} className={`aecm-pop aecm-delay-${i}`}>
          <Wire d={`M${x} 380 L${x} ${i === 0 ? 260 : 196}`} stroke={tone} width="1.8" dash="5 4" />
          <M x={x} y="400" size={9.5} fill={tone} weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <M x="650" y="426" size={10} fill={MUTED} weight={800}>
        whichever corner is highest is the one that sets fL
      </M>
    </Scene>
  )
}

export function MillerMultiplicationScene() {
  return (
    <Scene caption="A 2 pF capacitor behaving like 202 pF, purely because of the gain across it">
      <rect x="40" y="74" width="366" height="240" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <AmpTri cx="220" cy="212" w="120" h="104" label="−Av" tone={SIG} />
      <Wire d="M100 212 L160 212 M280 212 L346 212" stroke={N} width="2.3" />
      <Wire d="M130 212 L130 130 L330 130 L330 212" stroke={ROSE} width="2.3" />
      <Cap x="230" y="130" len="58" label="Cf = 2 pF" tone={ROSE} />
      <M x="100" y="252" size={10.5} fill={SIG} anchor="start" weight={800}>
        +v
      </M>
      <M x="346" y="252" size={10.5} fill={BIAS} anchor="end" weight={800}>
        −Av·v
      </M>
      <g className="aecm-emerge">
        <M x="223" y="96" size={11} fill={ROSE} weight={800}>
          across Cf: v(1 + Av)
        </M>
      </g>

      <Wire d="M424 194 L484 194" stroke={GOLD} width="3.2" marker="url(#aecArrG)" className="aecm-flow-arrow" />

      <rect x="500" y="74" width="352" height="240" rx="12" fill={WHITE} stroke={COOL} strokeWidth="2.3" />
      <AmpTri cx="712" cy="212" w="110" h="96" label="−Av" tone={COOL} />
      <Wire d="M552 212 L657 212 M767 212 L826 212" stroke={N} width="2.3" />
      <g className="aecm-grow" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <Cap x="600" y="262" len="96" orient="v" plate="46" label="" tone={RED} />
      </g>
      <Wire d="M600 212 L600 218 M600 306 L600 318 L826 318 L826 212" stroke={N} width="2.3" />
      <M x="600" y="130" size={11.5} fill={RED} weight={800}>
        CM = Cf(1 + |Av|)
      </M>
      <M x="600" y="152" size={10} fill={MUTED}>
        at the input, where it hurts
      </M>

      <g className="aecm-cell-in aecm-delay-3">
        <rect x="40" y="334" width="400" height="92" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.4" />
        <M x="140" y="368" size={14} fill={N} weight={800}>
          2 pF
        </M>
        <Wire d="M186 362 L256 362" stroke={RED} width="2.6" marker="url(#aecArrR)" />
        <M x="221" y="348" size={9.5} fill={RED} weight={800}>
          Av = 100
        </M>
        <M x="336" y="368" size={17} fill={RED} weight={800}>
          202 pF
        </M>
        <M x="240" y="404" size={10} fill={MUTED}>
          a hundredfold, and it lands at the input node
        </M>
      </g>
      <g className="aecm-slide-in aecm-delay-4">
        <rect x="464" y="334" width="388" height="92" rx="12" fill={BIAS} fillOpacity="0.1" stroke={BIAS} strokeWidth="2.4" />
        <Wire d="M500 396 L820 396" stroke={MUTED} width="1.8" marker="url(#aecArrM)" />
        <Dot cx="780" cy="396" r="7" fill={MUTED} />
        <Dot cx="576" cy="396" r="8" fill={BIAS} />
        <Wire d="M770 380 L588 380" stroke={BIAS} width="2.6" marker="url(#aecArrB)" />
        <M x="658" y="368" size={10} fill={BIAS} weight={800}>
          fH drops sharply
        </M>
        <M x="660" y="416" size={9.5} fill={MUTED}>
          the price of the voltage gain you asked for
        </M>
      </g>
    </Scene>
  )
}

export function HighFreqPolesScene() {
  return (
    <Scene caption="Two poles at the high end, and only the lower one matters">
      <rect x="40" y="66" width="400" height="280" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Bjt cx="240" cy="190" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M206 190 L120 190 M262 150 L360 150 M262 230 L262 288 L120 288" stroke={N} width="2.2" />
      <Gnd x="262" y="288" tone={N} />
      <Res x="360" y="112" len="46" orient="v" label="RC" tone={MUTED} />
      <Wire d="M360 150 L360 135 M360 89 L360 82" stroke={N} width="2.2" />
      <g className="aecm-pulse">
        <rect x="88" y="152" width="112" height="76" rx="10" fill={ROSE} fillOpacity="0.16" stroke={ROSE} strokeWidth="2.3" />
        <M x="144" y="178" size={9.5} fill={ROSE} weight={800}>
          Cbe + CM
        </M>
        <M x="144" y="200" size={9} fill={MUTED}>
          against
        </M>
        <M x="144" y="218" size={9} fill={MUTED}>
          Rs ∥ Rbias
        </M>
      </g>
      <g className="aecm-pulse aecm-delay-2">
        <rect x="324" y="176" width="104" height="76" rx="10" fill={COOL} fillOpacity="0.16" stroke={COOL} strokeWidth="2.3" />
        <M x="376" y="202" size={9.5} fill={COOL} weight={800}>
          Cce + wiring
        </M>
        <M x="376" y="224" size={9} fill={MUTED}>
          against
        </M>
        <M x="376" y="242" size={9} fill={MUTED}>
          RC ∥ RL
        </M>
      </g>

      <Wire d="M500 320 L850 320" stroke={MUTED} width="2" marker="url(#aecArr)" />
      <Wire d="M500 320 L500 88" stroke={MUTED} width="2" />
      <L x="840" y="352" size={11} fill={MUTED} weight={700} anchor="end">
        frequency (log)
      </L>
      <Wire d="M500 120 L660 120" stroke={SIG} width="3.2" className="aecm-draw" />
      <Wire d="M660 120 L760 200" stroke={SIG} width="2.8" className="aecm-draw aecm-delay-1" />
      <Wire d="M760 200 L840 316" stroke={SIG} width="2.8" className="aecm-draw aecm-delay-2" />
      <g className="aecm-pop aecm-delay-2">
        <circle cx="660" cy="120" r="14" fill="none" stroke={ROSE} strokeWidth="3" />
        <M x="660" y="96" size={10} fill={ROSE} weight={800}>
          this one sets fH
        </M>
      </g>
      <Dot cx="760" cy="200" r="6" fill={COOL} />
      <M x="778" y="192" size={9.5} fill={COOL} anchor="start">
        the output pole
      </M>

      <g className="aecm-slide-in aecm-delay-4">
        <rect x="40" y="368" width="400" height="66" rx="11" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.3" />
        <M x="240" y="394" size={10.5} fill={GREEN} weight={800}>
          low-frequency poles
        </M>
        <M x="240" y="416" size={10} fill={MUTED}>
          you fix them: choose bigger capacitors
        </M>
        <rect x="464" y="368" width="388" height="66" rx="11" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.3" />
        <M x="658" y="394" size={10.5} fill={RED} weight={800}>
          high-frequency poles
        </M>
        <M x="658" y="416" size={10} fill={MUTED}>
          the device and the layout fix them, not you
        </M>
      </g>
    </Scene>
  )
}

export function GainBandwidthScene() {
  return (
    <Scene caption="The product is a constant — buying gain spends bandwidth, at a fixed exchange rate">
      <Wire d="M120 400 L820 400" stroke={MUTED} width="2.2" marker="url(#aecArr)" />
      <Wire d="M120 400 L120 80" stroke={MUTED} width="2.2" marker="url(#aecArr)" />
      <L x="810" y="434" size={12} fill={MUTED} weight={700} anchor="end">
        bandwidth (log)
      </L>
      <L x="110" y="72" size={12} fill={MUTED} weight={700} anchor="end">
        gain (log)
      </L>
      <path d="M120 400 L780 400 L780 130 Z" fill={RED} fillOpacity="0.07" className="aecm-fade-in aecm-delay-3" />
      <M x="620" y="352" size={10.5} fill={RED} weight={800}>
        unattainable with this device
      </M>
      <Wire d="M150 130 L780 380" stroke={SIG} width="3.2" className="aecm-draw" />
      <Wire d="M150 92 L780 342" stroke={MUTED} width="2.4" dash="7 5" className="aecm-draw aecm-delay-4" />
      <M x="560" y="196" size={10} fill={MUTED} weight={800}>
        a device with higher fT
      </M>
      {[
        [0.12, 'gain 200 · BW 5 MHz', BIAS],
        [0.5, 'gain 45 · BW 22 MHz', GREEN],
        [0.86, 'gain 10 · BW 100 MHz', COOL],
      ].map(([t, lab, tone], i) => {
        const x = 150 + t * 630
        const y = 130 + t * 250
        return (
          <g key={lab} className={`aecm-pop aecm-delay-${i}`}>
            <Dot cx={x.toFixed(1)} cy={y.toFixed(1)} r="8" fill={tone} />
            <M x={(x + 14).toFixed(1)} y={(y - 12).toFixed(1)} size={10} fill={tone} anchor="start" weight={800}>
              {lab}
            </M>
          </g>
        )
      })}
      <M x="300" y="120" size={11} fill={SIG} weight={800}>
        constant gain-bandwidth product
      </M>
      <Card
        x="120"
        y="416"
        w="700"
        h="50"
        title="the invariant"
        accent={GOLD}
        mono
        lines={['Av × BW = fT at every point on the line']}
        linesY={42}
        className="aecm-emerge"
      />
    </Scene>
  )
}

export function StageAnalysisChainScene() {
  const panels = [
    ['DC path', 'ICQ = 2 mA', SIG, 'ICQ'],
    ['re from IE', 're = 13 Ω', ROSE, 're'],
    ['AC circuit', 'supplies grounded', COOL, 'Av'],
    ['midband', 'Av = −180', GREEN, 'CM'],
    ['poles', 'fL 84 Hz · fH 410 kHz', BIAS, ''],
  ]
  return (
    <Scene caption="Five passes over the same circuit; each one hands the next a single number">
      {panels.map(([title, val, tone, pass], i) => (
        <g key={title} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={30 + i * 172} y="80" width="152" height="188" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={30 + i * 172} y="80" width="152" height="26" rx="12" fill={tone} />
          <M x={106 + i * 172} y="98" size={10} fill={WHITE} weight={800}>
            {title}
          </M>
          <Bjt cx={100 + i * 172} cy="170" kind="npn" label="" tone={i === 2 ? COOL : MUTED} ring={false} />
          <M x={106 + i * 172} y="248" size={10} fill={tone} weight={800}>
            {val}
          </M>
          {pass ? (
            <g>
              <Wire d={`M${182 + i * 172} 174 L${202 + i * 172} 174`} stroke={tone} width="2.6" marker={`url(#${markerFor(tone)})`} className="aecm-flow-arrow" />
              <M x={192 + i * 172} y="162" size={9} fill={tone} weight={800}>
                {pass}
              </M>
            </g>
          ) : null}
        </g>
      ))}
      <Panel
        x="230"
        y="296"
        w="440"
        title="the stage, fully specified"
        rows={[['midband gain', '−180 (45 dB)'], ['Zi · Zo', '1.1 kΩ · 3.3 kΩ'], ['fL · fH', '84 Hz · 410 kHz'], ['bandwidth', '410 kHz']]}
        accent={GREEN}
        className="aecm-slide-in aecm-delay-4"
        rowH={28}
      />
    </Scene>
  )
}

export function CascadeBandwidthScene() {
  return (
    <Scene caption="Gains multiply, bandwidth shrinks — and the shrinkage is a fixed factor per stage">
      {[0, 1, 2].map((i) => (
        <g key={i} className={`aecm-cell-in aecm-delay-${i}`}>
          <Block x={72 + i * 200} y={70} w={140} h={64} label={`Av${i + 1} = 20`} stroke={[SIG, COOL, GREEN][i]} />
          {i < 2 ? (
            <g>
              <Wire d={`M${212 + i * 200} 102 L${272 + i * 200} 102`} stroke={BIAS} width="2.6" marker="url(#aecArrB)" />
              <M x={242 + i * 200} y="90" size={9} fill={BIAS} weight={800}>
                loading
              </M>
            </g>
          ) : null}
        </g>
      ))}
      <g className="aecm-emerge">
        <rect x="620" y="70" width="230" height="64" rx="11" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="2.6" />
        <M x="735" y="96" size={12} fill={GREEN} weight={800}>
          20 × 20 × 20 = 8000
        </M>
        <M x="735" y="120" size={11} fill={GREEN} weight={800}>
          26 + 26 + 26 = 78 dB
        </M>
      </g>

      <Wire d="M110 400 L830 400" stroke={MUTED} width="2" marker="url(#aecArr)" />
      <Wire d="M110 400 L110 160" stroke={MUTED} width="2" />
      <L x="820" y="434" size={11.5} fill={MUTED} weight={700} anchor="end">
        frequency (log)
      </L>
      {[
        [1, 26, 1.0, SIG],
        [2, 52, 0.64, COOL],
        [3, 78, 0.51, GREEN],
      ].map(([n2, mid, shrink, tone], i) => (
        <g key={n2} className={`aecm-draw aecm-delay-${i}`}>
          <Curve pts={bandPts(110, 700, 400, 2.2, mid, 0.6, 5.0 + Math.log10(shrink), n2, n2, 6, 120)} stroke={tone} width="2.8" />
          <M x="820" y={408 - mid * 2.2} size={9.5} fill={tone} anchor="end" weight={800}>
            {`${n2} stage${n2 > 1 ? 's' : ''} · shrink ${shrink.toFixed(2)}`}
          </M>
        </g>
      ))}
      <M x="470" y="180" size={10.5} fill={MUTED} weight={800}>
        higher midband, earlier corner — every time
      </M>
    </Scene>
  )
}

export function CascodeScene() {
  return (
    <Scene caption="Keep the gain, move it to the upper transistor, and the Miller capacitance disappears">
      <rect x="40" y="66" width="380" height="330" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.3" />
      <M x="230" y="92" size={11.5} fill={RED} weight={800}>
        plain common emitter
      </M>
      <Bjt cx="220" cy="230" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M186 230 L120 230 M242 190 L330 190 L330 140 M242 270 L242 322 L120 322" stroke={N} width="2.2" />
      <Gnd x="242" y="322" tone={N} />
      <Wire d="M150 230 L150 140 L330 140" stroke={ROSE} width="2.2" />
      <g className="aecm-grow" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <Cap x="240" y="140" len="62" label="Cbc × (1+Av)" tone={RED} plate="34" />
      </g>
      <M x="230" y="352" size={10} fill={RED} weight={800}>
        the whole gain sits across it
      </M>
      <Wire d="M100 380 L390 380" stroke={MUTED} width="1.8" marker="url(#aecArrM)" />
      <Dot cx="160" cy="380" r="8" fill={RED} />
      <M x="160" y="400" size={9.5} fill={RED} weight={800}>
        fH low
      </M>

      <rect x="470" y="66" width="382" height="330" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <M x="661" y="92" size={11.5} fill={GREEN} weight={800}>
        cascode
      </M>
      <Bjt cx="640" cy="290" kind="npn" label="CE" tone={N} ring={false} />
      <Bjt cx="640" cy="164" kind="npn" label="CB" tone={N} ring={false} />
      <Wire d="M606 290 L530 290 M662 250 L662 204 M606 164 L540 164 M662 124 L760 124 L760 96 M662 330 L662 366 L530 366" stroke={N} width="2.2" />
      <Gnd x="662" y="366" tone={N} />
      {/* In the clear gap above CB and right of its base wire: centred on the
          transistor it crossed the emitter lead, and the earlier x=524
          position ran left past the panel edge into the other diagram. */}
      <M x="700" y="142" size={9.5} fill={MUTED} anchor="start">
        held at a fixed bias
      </M>
      <g className="aecm-pulse">
        <rect x="676" y="216" width="146" height="42" rx="9" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.2" />
        <M x="749" y="242" size={10} fill={GREEN} weight={800}>
          load on CE = re, Av ≈ 1
        </M>
      </g>
      <Cap x="580" y="228" len="50" orient="v" label="" tone={GREEN} plate="16" />
      <M x="556" y="232" size={9} fill={GREEN} anchor="end" weight={800}>
        Cbc × 2
      </M>
      <Wire d="M520 380 L840 380" stroke={MUTED} width="1.8" marker="url(#aecArrM)" />
      <Dot cx="790" cy="380" r="8" fill={GREEN} />
      <M x="790" y="400" size={9.5} fill={GREEN} weight={800}>
        fH much higher
      </M>

      <M x="450" y="446" size={11} fill={MUTED} weight={800}>
        same total gain, very different bandwidth
      </M>
    </Scene>
  )
}

export function DarlingtonScene() {
  return (
    <Scene caption="Two transistors wired as one: enormous β, and two base-emitter drops to pay for it">
      <rect x="40" y="66" width="340" height="270" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" strokeDasharray="8 6" />
      <M x="210" y="92" size={11} fill={SIG} weight={800}>
        behaves as one transistor
      </M>
      <Bjt cx="150" cy="170" kind="npn" label="Q1" tone={N} ring={false} />
      <Bjt cx="250" cy="248" kind="npn" label="Q2" tone={N} ring={false} />
      <Wire d="M172 210 L216 210 L216 248" stroke={BIAS} width="3" className="aecm-pulse" />
      <Wire d="M116 170 L70 170 M172 130 L316 130 L316 208 M272 208 L316 208 M272 288 L272 314 L70 314" stroke={N} width="2.2" />
      <Gnd x="272" y="314" tone={N} />

      <Wire d="M404 200 L456 200" stroke={GOLD} width="3.2" marker="url(#aecArrG)" className="aecm-flow-arrow" />

      <rect x="476" y="66" width="376" height="270" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <M x="664" y="92" size={11} fill={GREEN} weight={800}>
        the composite device
      </M>
      <Bjt cx="600" cy="200" kind="npn" label="" tone={GREEN} ring />
      <Wire d="M566 200 L510 200 M622 160 L720 160 M622 240 L720 240" stroke={N} width="2.2" />
      {[
        ['β = β₁ · β₂', 130],
        ['VBE = 1.4 V', 160],
        ['VCE(sat) higher', 190],
        ['switches slower', 220],
      ].map(([t, y], i) => (
        <M key={t} x="746" y={y + 38} size={11} fill={i === 0 ? GREEN : BIAS} anchor="start" weight={800} className={`aecm-cell-in aecm-delay-${i}`}>
          {t}
        </M>
      ))}

      <rect x="40" y="356" width="812" height="28" rx="8" fill={N} />
      {['property', 'single', 'Darlington'].map((h, i) => (
        <M key={h} x={160 + i * 280} y="376" size={10.5} fill={WHITE} weight={800}>
          {h}
        </M>
      ))}
      {[
        ['current gain', '180', '32 000', GREEN],
        ['base-emitter drop', '0.7 V', '1.4 V', BIAS],
      ].map(([p, a, b, tone], i) => (
        <g key={p} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x="40" y={390 + i * 36} width="812" height="30" rx="7" fill={WHITE} stroke={tone} strokeWidth="1.9" />
          <M x="160" y={410 + i * 36} size={10.5} fill={N}>
            {p}
          </M>
          <M x="440" y={410 + i * 36} size={10.5} fill={MUTED}>
            {a}
          </M>
          <M x="720" y={410 + i * 36} size={10.5} fill={tone} weight={800}>
            {b}
          </M>
        </g>
      ))}
    </Scene>
  )
}

export function ConfigSelectionScene() {
  const leaves = [
    ['high source impedance', 'follower or Darlington', GREEN],
    ['gain beyond one stage', 'cascade · watch BW', BIAS],
    ['bandwidth at high gain', 'cascode', COOL],
    ['low load impedance', 'output follower', SIG],
  ]
  return (
    <Scene caption="Most real designs use three of these in a row, each solving a different problem">
      <g className="aecm-emerge">
        <rect x="316" y="56" width="268" height="46" rx="12" fill={N} />
        <L x="450" y="85" size="13" fill={WHITE}>
          what is the binding constraint?
        </L>
      </g>
      {leaves.map(([q, dest, tone], i) => (
        <g key={q} className={`aecm-slide-in aecm-delay-${i}`}>
          <Wire d={`M450 102 L${110 + i * 226} 136 L${110 + i * 226} 152`} stroke={MUTED} width="2" dash="6 5" opacity="0.6" />
          <rect x={30 + i * 226} y="152" width="160" height="94" rx="11" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth="2.3" />
          <foreignObject x={40 + i * 226} y="160" width="140" height="38">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11px/1.2 system-ui,sans-serif', color: '#6b6076', textAlign: 'center' }}>
              {q}
            </div>
          </foreignObject>
          <M x={110 + i * 226} y="226" size={10.5} fill={tone} weight={800}>
            {dest}
          </M>
        </g>
      ))}

      <rect x="60" y="284" width="780" height="140" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.2" />
      {[
        ['follower', 'solves the source impedance', GREEN],
        ['cascode', 'solves gain × bandwidth', COOL],
        ['follower', 'solves the load impedance', SIG],
      ].map(([name, why, tone], i) => (
        <g key={`${name}${i}`} className={`aecm-cell-in aecm-delay-${i}`}>
          <Block x={96 + i * 250} y={314} w={190} h={64} label={name} stroke={tone} />
          <M x={191 + i * 250} y="398" size={9.5} fill={tone} weight={800}>
            {why}
          </M>
          {i < 2 ? (
            <Wire d={`M${286 + i * 250} 346 L${346 + i * 250} 346`} stroke={MUTED} width="2.4" marker="url(#aecArrM)" />
          ) : null}
        </g>
      ))}
      <M x="450" y="306" size={10} fill={MUTED} weight={800}>
        most designs use several
      </M>
    </Scene>
  )
}

export function FullBodeAssemblyScene() {
  const x0 = 110
  const w = 680
  const base = 400
  return (
    <Scene caption="Find every pole, circle the dominant one at each end, and the sketch draws itself">
      <Wire d={`M${x0} ${base} L${x0 + w + 20} ${base}`} stroke={MUTED} width="2.2" marker="url(#aecArr)" />
      <Wire d={`M${x0} ${base} L${x0} 86`} stroke={MUTED} width="2.2" marker="url(#aecArr)" />
      <L x={x0 + w} y={base + 34} size={12} fill={MUTED} weight={700} anchor="end">
        frequency (log)
      </L>
      <Wire d={`M${x0 + 200} 148 L${x0 + 470} 148`} stroke={SIG} width="3.4" className="aecm-draw" />
      <M x={x0 + 335} y="132" size={10.5} fill={SIG} weight={800}>
        midband, 45 dB
      </M>
      {[
        [x0 + 80, '12 Hz', false],
        [x0 + 140, '38 Hz', false],
        [x0 + 200, '84 Hz', true],
      ].map(([x, lab, dom], i) => (
        <g key={lab} className={`aecm-pop aecm-delay-${i}`}>
          <Dot cx={x} cy={base} r={dom ? 8 : 6} fill={dom ? ROSE : MUTED} />
          <M x={x} y={base + 20} size={9.5} fill={dom ? ROSE : MUTED} weight={800}>
            {lab}
          </M>
          {dom ? <circle cx={x} cy={base} r="15" fill="none" stroke={ROSE} strokeWidth="2.6" /> : null}
        </g>
      ))}
      <M x={x0 + 140} y={base + 44} size={9.5} fill={ROSE} weight={800}>
        highest one sets fL
      </M>
      {[
        [x0 + 470, '410 kHz', true],
        [x0 + 570, '2.2 MHz', false],
      ].map(([x, lab, dom], i) => (
        <g key={lab} className={`aecm-pop aecm-delay-${i + 2}`}>
          <Dot cx={x} cy={base} r={dom ? 8 : 6} fill={dom ? ROSE : MUTED} />
          <M x={x} y={base + 20} size={9.5} fill={dom ? ROSE : MUTED} weight={800}>
            {lab}
          </M>
          {dom ? <circle cx={x} cy={base} r="15" fill="none" stroke={ROSE} strokeWidth="2.6" /> : null}
        </g>
      ))}
      <M x={x0 + 570} y={base + 44} size={9.5} fill={ROSE} weight={800}>
        lowest one sets fH
      </M>
      <Wire d={`M${x0 + 200} 148 L${x0 + 30} 318`} stroke={SIG} width="2.4" dash="7 5" className="aecm-draw aecm-delay-3" />
      <Wire d={`M${x0 + 470} 148 L${x0 + 650} 328`} stroke={SIG} width="2.4" dash="7 5" className="aecm-draw aecm-delay-3" />
      <Curve pts={bandPts(x0, w, base, 4.4, 45, 1.9, 5.0)} stroke={BIAS} width="3" className="aecm-draw aecm-delay-4" />
      <g className="aecm-emerge">
        <Dot cx={x0 + 200} cy="161" r="6" fill={GREEN} />
        <Wire d={`M${x0 + 240} 196 L${x0 + 210} 168`} stroke={GREEN} width="1.8" />
        <rect x={x0 + 230} y="198" width="196" height="46" rx="10" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
        <M x={x0 + 328} y="220" size={9.5} fill={GREEN} weight={800}>
          check one point directly
        </M>
        <M x={x0 + 328} y="236" size={9.5} fill={GREEN} weight={800}>
          42 dB at 84 Hz ✓
        </M>
      </g>
    </Scene>
  )
}

/* ── Module 4 — feedback, oscillators and power stages ─────────── */

export function FeedbackBlockScene() {
  return (
    <Scene caption="Sample the output, mix it at the input — the two choices name the topology">
      <Wire d="M60 180 L146 180" stroke={N} width="2.6" marker="url(#aecArr)" />
      <M x="60" y="164" size={11} fill={N} anchor="start" weight={800}>
        Vs
      </M>
      <g className="aecm-pulse">
        <circle cx="170" cy="180" r="24" fill={WHITE} stroke={ROSE} strokeWidth="2.8" />
        <M x="158" y="172" size={13} fill={ROSE} weight={800}>+</M>
        <M x="170" y="200" size={13} fill={ROSE} weight={800}>−</M>
      </g>
      <Wire d="M194 180 L268 180" stroke={N} width="2.6" marker="url(#aecArr)" />
      <M x="231" y="164" size={10} fill={ROSE} weight={800}>
        error signal
      </M>
      <AmpTri cx="330" cy="180" w="110" h="96" label="A" tone={SIG} className="aecm-cell-in aecm-delay-1" />
      <Wire d="M386 180 L600 180" stroke={N} width="2.6" marker="url(#aecArr)" />
      <Dot cx="520" cy="180" r="6" fill={N} />
      <Block x="600" y="148" w="120" h="64" label="load" stroke={MUTED} className="aecm-cell-in aecm-delay-2" />
      <Wire d="M520 180 L520 292 L406 292" stroke={COOL} width="2.6" className="aecm-flow-arrow aecm-delay-2" />
      <Block x="266" y="262" w="140" h="60" label="β" stroke={COOL} className="aecm-cell-in aecm-delay-2" />
      <Wire d="M266 292 L170 292 L170 204" stroke={COOL} width="2.6" marker="url(#aecArrC)" className="aecm-flow-arrow aecm-delay-3" />
      <g className="aecm-emerge">
        <rect x="290" y="336" width="180" height="34" rx="9" fill={GOLD} fillOpacity="0.16" stroke={GOLD} strokeWidth="2.2" />
        <M x="380" y="358" size={12} fill={GOLD} weight={800}>
          loop gain T = Aβ
        </M>
      </g>

      <g className="aecm-slide-in aecm-delay-3">
        <rect x="560" y="246" width="292" height="92" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
        <M x="706" y="270" size={10.5} fill={GREEN} weight={800}>
          sample the output
        </M>
        <M x="640" y="298" size={10.5} fill={N}>
          voltage across
        </M>
        <M x="640" y="320" size={10.5} fill={N}>
          current through
        </M>
        <Wire d="M760 294 L800 294" stroke={GREEN} width="4" />
        <Wire d="M760 316 L800 316" stroke={GREEN} width="2" marker="url(#aecArrGr)" />
      </g>
      <g className="aecm-slide-in aecm-delay-4">
        <rect x="60" y="364" width="292" height="92" rx="12" fill={WHITE} stroke={BIAS} strokeWidth="2.3" />
        <M x="206" y="388" size={10.5} fill={BIAS} weight={800}>
          mix at the input
        </M>
        <M x="146" y="416" size={10.5} fill={N}>
          in series
        </M>
        <M x="146" y="438" size={10.5} fill={N}>
          in shunt
        </M>
        <Wire d="M244 412 L300 412" stroke={BIAS} width="3" />
        <Wire d="M272 428 L272 448 M244 438 L300 438" stroke={BIAS} width="3" />
      </g>
    </Scene>
  )
}

export function FourTopologiesScene() {
  const cells = [
    ['voltage-series', 'Zi ↑  Zo ↓', 'emitter follower · non-inverting op-amp', GREEN, true],
    ['voltage-shunt', 'Zi ↓  Zo ↓', 'collector feedback · transimpedance', COOL, false],
    ['current-series', 'Zi ↑  Zo ↑', 'unbypassed RE', BIAS, false],
    ['current-shunt', 'Zi ↓  Zo ↑', 'current mirror loops', SIG, false],
  ]
  return (
    <Scene caption="Series raises Zi, shunt lowers it; voltage sampling lowers Zo, current sampling raises it">
      <M x="450" y="62" size={11} fill={MUTED} weight={800}>
        mixing at the input →
      </M>
      <M x="52" y="250" size={11} fill={MUTED} anchor="start" weight={800}>
        ↓ sampling
      </M>
      {cells.map(([name, imp, use, tone, star], i) => {
        const x = 120 + (i % 2) * 380
        const y = 82 + Math.floor(i / 2) * 168
        return (
          <g key={name} className={`aecm-cell-in aecm-delay-${i}`}>
            <rect x={x} y={y} width="348" height="152" rx="12" fill={star ? tone : WHITE} fillOpacity={star ? 0.1 : 1} stroke={tone} strokeWidth={star ? 3.2 : 2.3} />
            <M x={x + 174} y={y + 28} size={12} fill={tone} weight={800}>
              {name}
            </M>
            <AmpTri cx={x + 92} cy={y + 84} w="72" h="60" label="A" tone={tone} />
            <Wire d={`M${x + 32} ${y + 84} L${x + 56} ${y + 84} M${x + 128} ${y + 84} L${x + 180} ${y + 84}`} stroke={MUTED} width="2" />
            <Wire d={`M${x + 160} ${y + 84} L${x + 160} ${y + 126} L${x + 48} ${y + 126} L${x + 48} ${y + 84}`} stroke={COOL} width="2.2" />
            <M x={x + 262} y={y + 76} size={13} fill={tone} weight={800}>
              {imp}
            </M>
            <M x={x + 262} y={y + 112} size={9} fill={MUTED}>
              {use.split(' · ')[0]}
            </M>
            <M x={x + 262} y={y + 130} size={9} fill={MUTED}>
              {use.split(' · ')[1] || ''}
            </M>
          </g>
        )
      })}
      <g className="aecm-emerge">
        <rect x="120" y="418" width="728" height="42" rx="10" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="484" y="445" size={12} fill={GOLD} weight={800}>
          series up, shunt down at the input · voltage down, current up at the output
        </M>
      </g>
    </Scene>
  )
}

export function DesensitivityScene() {
  return (
    <Scene caption="Feedback divides the gain by 1 + T — and divides the uncertainty by exactly the same factor">
      <rect x="60" y="76" width="300" height="300" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.4" />
      <M x="210" y="104" size={12} fill={RED} weight={800}>
        open loop
      </M>
      <rect x="110" y="140" width="66" height="200" rx="8" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="2.2" className="aecm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }} />
      <M x="143" y="364" size={11} fill={RED} weight={800}>
        A = 1000
      </M>
      <rect x="230" y="140" width="80" height="200" rx="8" fill={RED} fillOpacity="0.32" className="aecm-fade-in aecm-delay-2" />
      <M x="270" y="248" size={12} fill={RED} weight={800}>
        ±50%
      </M>
      <M x="270" y="364" size={10} fill={MUTED}>
        spread
      </M>

      {[196, 244].map((y, i) => (
        <g key={y} className={`aecm-flow-arrow aecm-delay-${i}`}>
          <Wire d={`M380 ${y} L470 ${y}`} stroke={GOLD} width="3" marker="url(#aecArrG)" />
        </g>
      ))}
      <M x="425" y="182" size={10} fill={GOLD} weight={800}>
        ÷ 101
      </M>
      <M x="425" y="286" size={10} fill={GOLD} weight={800}>
        ÷ 101
      </M>

      <rect x="490" y="76" width="300" height="300" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <M x="640" y="104" size={12} fill={GREEN} weight={800}>
        closed loop, T = 100
      </M>
      <rect x="540" y="318" width="66" height="22" rx="6" fill={GREEN} fillOpacity="0.28" stroke={GREEN} strokeWidth="2.2" className="aecm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }} />
      <M x="573" y="364" size={11} fill={GREEN} weight={800}>
        Af = 9.9
      </M>
      <rect x="660" y="332" width="80" height="8" rx="4" fill={GREEN} fillOpacity="0.5" className="aecm-fade-in aecm-delay-3" />
      <M x="700" y="316" size={12} fill={GREEN} weight={800}>
        ±0.5%
      </M>
      <M x="700" y="364" size={10} fill={MUTED}>
        spread
      </M>

      <Card
        x="180"
        y="392"
        w="540"
        h="58"
        title="the same factor, both times"
        accent={COOL}
        mono
        lines={['dAf/Af = (1/(1+T)) · dA/A']}
        linesY={48}
        className="aecm-emerge"
      />
    </Scene>
  )
}

export function FeedbackBandwidthScene() {
  return (
    <Scene caption="Bandwidth bought with gain — but nothing can be done about noise at the input">
      <Wire d="M70 330 L450 330" stroke={MUTED} width="2" marker="url(#aecArr)" />
      <Wire d="M70 330 L70 96" stroke={MUTED} width="2" />
      <L x="440" y="362" size={11} fill={MUTED} weight={700} anchor="end">
        frequency (log)
      </L>
      <Curve pts={bandPts(70, 370, 330, 2.0, 100, -1, 1.6, 1, 1, 6, 120)} stroke={RED} width="3" className="aecm-draw" />
      <Curve pts={bandPts(70, 370, 330, 2.0, 60, -1, 3.6, 1, 1, 6, 120)} stroke={GREEN} width="3" className="aecm-draw aecm-delay-2" />
      <M x="200" y="118" size={10} fill={RED} weight={800}>
        open loop
      </M>
      <M x="230" y="208" size={10} fill={GREEN} weight={800}>
        closed loop
      </M>
      <g className="aecm-pop aecm-delay-3">
        <Dot cx="426" cy="330" r="7" fill={GOLD} />
        <M x="416" y="312" size={9.5} fill={GOLD} anchor="end" weight={800}>
          same unity-gain point
        </M>
      </g>
      <M x="256" y="382" size={10.5} fill={MUTED} weight={800}>
        gain-bandwidth product unchanged
      </M>

      <g className="aecm-cell-in aecm-delay-2">
        <rect x="490" y="76" width="362" height="168" rx="12" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="2.4" />
        <M x="671" y="102" size={11} fill={GREEN} weight={800}>
          distortion made inside the loop
        </M>
        <AmpTri cx="596" cy="164" w="74" h="64" label="A" tone={GREEN} />
        <Wire d="M520 164 L558 164 M634 164 L800 164" stroke={N} width="2.2" />
        <Src cx="700" cy="164" kind="v" tone={RED} r="15" />
        <Wire d="M760 164 L760 216 L556 216 L556 178" stroke={COOL} width="2.2" marker="url(#aecArrC)" className="aecm-flow-arrow" />
        <M x="812" y="168" size={14} fill={GREEN} anchor="start" weight={800}>
          ✓
        </M>
        <M x="671" y="236" size={9.5} fill={MUTED}>
          the loop sees it and corrects it
        </M>
      </g>
      <g className="aecm-cell-in aecm-delay-4">
        <rect x="490" y="264" width="362" height="168" rx="12" fill={RED} fillOpacity="0.08" stroke={RED} strokeWidth="2.4" />
        <M x="671" y="290" size={11} fill={RED} weight={800}>
          noise arriving at the input
        </M>
        <Src cx="540" cy="352" kind="v" tone={RED} r="15" />
        <AmpTri cx="640" cy="352" w="74" h="64" label="A" tone={MUTED} />
        <Wire d="M556 352 L602 352 M678 352 L800 352" stroke={N} width="2.2" />
        <M x="812" y="356" size={14} fill={RED} anchor="start" weight={800}>
          ✗
        </M>
        <M x="671" y="416" size={9.5} fill={MUTED}>
          indistinguishable from signal — feedback cannot help
        </M>
      </g>
    </Scene>
  )
}

export function PracticalFeedbackScene() {
  const panels = [
    ['unbypassed RE', 'current-series', 'gain ↓, Zi ↑, Zo ↑', BIAS],
    ['collector feedback', 'voltage-shunt', 'gain ↓, Zi ↓, Zo ↓', COOL],
    ['two stages, divider', 'voltage-series', 'β = R1/(R1+R2)', GREEN],
  ]
  return (
    <Scene caption="You have already built all three of these — they just did not have names yet">
      {panels.map(([title, topo, effect, tone], i) => (
        <g key={title} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={30 + i * 286} y="66" width="266" height="292" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={30 + i * 286} y="66" width="266" height="28" rx="12" fill={tone} />
          <L x={163 + i * 286} y="86" size={11} fill={WHITE}>
            {title}
          </L>
          <Bjt cx={110 + i * 286} cy="180" kind="npn" label="" tone={N} ring={false} />
          <Wire d={`M${76 + i * 286} 180 L${52 + i * 286} 180 M${132 + i * 286} 140 L${252 + i * 286} 140`} stroke={N} width="2.1" />
          {i === 0 ? (
            <g>
              <Res x={132 + i * 286} y="252" len="44" orient="v" label="RE" tone={tone} />
              <Wire d={`M${132 + i * 286} 220 L${132 + i * 286} 230 M${132 + i * 286} 274 L${132 + i * 286} 292`} stroke={tone} width="3.4" />
              <Gnd x={132 + i * 286} y="292" tone={N} />
            </g>
          ) : null}
          {i === 1 ? (
            <Wire d={`M${252 + i * 286} 140 L${252 + i * 286} 180 L${76 + i * 286} 180`} stroke={tone} width="3.4" />
          ) : null}
          {i === 2 ? (
            <g>
              <Bjt cx={210 + i * 286} cy="240" kind="npn" label="" tone={N} ring={false} />
              <Wire d={`M${132 + i * 286} 140 L${176 + i * 286} 240`} stroke={N} width="2.1" />
              <Wire d={`M${232 + i * 286} 280 L${232 + i * 286} 306 L${52 + i * 286} 306 L${52 + i * 286} 200`} stroke={tone} width="3.4" />
              <Res x={140 + i * 286} y="306" len="44" label="R1" tone={tone} />
            </g>
          ) : null}
          <M x={163 + i * 286} y="330" size={11} fill={tone} weight={800}>
            {topo}
          </M>
          <M x={163 + i * 286} y="350" size={9.5} fill={MUTED}>
            {effect}
          </M>
        </g>
      ))}
      <g className="aecm-emerge">
        <rect x="120" y="386" width="660" height="52" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="450" y="418" size={12} fill={GOLD} weight={800}>
          identify the sample and the mix, and the topology names itself
        </M>
      </g>
    </Scene>
  )
}

export function PhaseMarginScene() {
  const x0 = 120
  const w = 520
  return (
    <Scene caption="Two margins, read off the same frequency axis — and 45° is the number to aim for">
      <Wire d={`M${x0} 220 L${x0 + w + 16} 220`} stroke={MUTED} width="2" marker="url(#aecArr)" />
      <Wire d={`M${x0} 220 L${x0} 76`} stroke={MUTED} width="2" />
      <M x={x0 - 10} y="224" size={10} fill={MUTED} anchor="end" weight={800}>
        0 dB
      </M>
      <Curve
        pts={Array.from({ length: 61 }, (_, i) => {
          const t = i / 60
          return [x0 + t * w, 100 + 190 * t]
        })}
        stroke={SIG}
        width="3"
        className="aecm-draw"
      />
      <Dot cx={(x0 + w * 0.632).toFixed(1)} cy="220" r="7" fill={ROSE} />
      <M x={(x0 + w * 0.632).toFixed(1)} y="200" size={9.5} fill={ROSE} weight={800}>
        unity gain
      </M>

      <Wire d={`M${x0} 440 L${x0 + w + 16} 440`} stroke={MUTED} width="2" marker="url(#aecArr)" />
      <Wire d={`M${x0} 440 L${x0} 266`} stroke={MUTED} width="2" />
      <L x={x0 + w} y="470" size={11} fill={MUTED} weight={700} anchor="end">
        frequency (log)
      </L>
      <Wire d={`M${x0} 400 L${x0 + w} 400`} stroke={RED} width="2" dash="6 5" />
      <M x={x0 + w + 8} y="404" size={10} fill={RED} anchor="start" weight={800}>
        −180°
      </M>
      <Curve
        pts={Array.from({ length: 61 }, (_, i) => {
          const t = i / 60
          return [x0 + t * w, 282 + 150 / (1 + Math.exp(-(t - 0.55) * 9))]
        })}
        stroke={COOL}
        width="3"
        className="aecm-draw aecm-delay-2"
      />
      <Wire d={`M${(x0 + w * 0.632).toFixed(1)} 220 L${(x0 + w * 0.632).toFixed(1)} 380`} stroke={ROSE} width="1.8" dash="5 4" className="aecm-draw aecm-delay-3" />
      <g className="aecm-emerge">
        <path
          d={`M${(x0 + w * 0.632 + 16).toFixed(1)} 370 L${(x0 + w * 0.632 + 26).toFixed(1)} 370 M${(x0 + w * 0.632 + 21).toFixed(1)} 370 L${(x0 + w * 0.632 + 21).toFixed(1)} 400 M${(x0 + w * 0.632 + 16).toFixed(1)} 400 L${(x0 + w * 0.632 + 26).toFixed(1)} 400`}
          stroke={GREEN}
          strokeWidth="2.4"
          fill="none"
        />
        <M x={(x0 + w * 0.632 + 34).toFixed(1)} y="390" size={10} fill={GREEN} anchor="start" weight={800}>
          phase margin
        </M>
      </g>
      <Wire d={`M${(x0 + w * 0.78).toFixed(1)} 400 L${(x0 + w * 0.78).toFixed(1)} 180`} stroke={BIAS} width="1.8" dash="5 4" className="aecm-draw aecm-delay-4" />
      <g className="aecm-emerge">
        <path
          d={`M${(x0 + w * 0.78 + 16).toFixed(1)} 220 L${(x0 + w * 0.78 + 26).toFixed(1)} 220 M${(x0 + w * 0.78 + 21).toFixed(1)} 220 L${(x0 + w * 0.78 + 21).toFixed(1)} 247 M${(x0 + w * 0.78 + 16).toFixed(1)} 247 L${(x0 + w * 0.78 + 26).toFixed(1)} 247`}
          stroke={BIAS}
          strokeWidth="2.4"
          fill="none"
        />
        <M x={(x0 + w * 0.78 + 34).toFixed(1)} y="238" size={10} fill={BIAS} anchor="start" weight={800}>
          gain margin
        </M>
      </g>
      <Card
        x="672"
        y="88"
        w="180"
        h="130"
        title="stability"
        accent={GREEN}
        lines={['aim for ≥ 45° of', 'phase margin', 'below 0: oscillates']}
        linesY={58}
        lineH={24}
        className="aecm-slide-in aecm-delay-4"
      />
    </Scene>
  )
}

export function BarkhausenScene() {
  return (
    <Scene caption="Unity loop gain and zero total phase — miss either and there is no oscillation">
      <AmpTri cx="200" cy="140" w="104" h="90" label="A" tone={SIG} className="aecm-cell-in" />
      <Wire d="M148 140 L120 140 L120 234 L280 234" stroke={N} width="2.4" />
      <Wire d="M252 140 L330 140 L330 234" stroke={N} width="2.4" />
      <Block x="280" y="204" w="100" h="60" label="β(f)" stroke={COOL} className="aecm-cell-in aecm-delay-1" />
      <Wire d="M380 234 L410 234 L410 140 L360 140" stroke={COOL} width="2.4" marker="url(#aecArrC)" className="aecm-flow-arrow" />
      <M x="250" y="284" size={10} fill={COOL} weight={800}>
        frequency-selective
      </M>

      {[
        ['|Aβ| = 1', GREEN],
        ['∠Aβ = 0° or 360n°', GOLD],
      ].map(([t, tone], i) => (
        <g key={t} className={`aecm-pop aecm-delay-${i}`}>
          <rect x="60" y={314 + i * 62} width="360" height="50" rx="11" fill={tone} fillOpacity="0.14" stroke={tone} strokeWidth="2.6" />
          <M x="240" y={346 + i * 62} size={15} fill={tone} weight={800}>
            {t}
          </M>
        </g>
      ))}

      <Wire d="M470 180 L850 180" stroke={MUTED} width="1.8" />
      <Wire d="M470 240 L470 90" stroke={MUTED} width="1.8" />
      <Curve
        pts={Array.from({ length: 61 }, (_, i) => {
          const t = i / 60
          return [470 + t * 370, 180 - 70 * Math.tanh((0.5 - t) * 5)]
        })}
        stroke={COOL}
        width="2.8"
        className="aecm-draw aecm-delay-2"
      />
      <Dot cx="655" cy="180" r="7" fill={ROSE} />
      <M x="655" y="212" size={10} fill={ROSE} weight={800}>
        f₀, phase = 0
      </M>
      <M x="470" y="82" size={10} fill={MUTED} anchor="start" weight={800}>
        loop phase
      </M>

      <Wire d="M470 336 L850 336" stroke={MUTED} width="1.8" />
      <Wire d="M470 286 L850 286" stroke={GREEN} width="1.8" dash="5 4" />
      <M x="850" y="278" size={9.5} fill={GREEN} anchor="end" weight={800}>
        |Aβ| = 1
      </M>
      <Curve
        pts={Array.from({ length: 61 }, (_, i) => {
          const t = i / 60
          return [470 + t * 370, 336 - 62 * Math.exp(-((t - 0.5) ** 2) / 0.012)]
        })}
        stroke={SIG}
        width="2.8"
        className="aecm-draw aecm-delay-3"
      />
      <M x="470" y="366" size={10} fill={MUTED} anchor="start" weight={800}>
        loop gain
      </M>

      <g className="aecm-draw aecm-delay-4">
        <Wire d="M470 440 L850 440" stroke={MUTED} width="1.4" opacity="0.6" />
        <Curve
          pts={Array.from({ length: 121 }, (_, i) => {
            const t = i / 120
            const env = Math.min(1, 0.06 * Math.exp(4.4 * t))
            return [470 + t * 370, 440 - 30 * env * Math.sin(2 * Math.PI * 9 * t)]
          })}
          stroke={GREEN}
          width="2.2"
        />
        <M x="660" y="412" size={9} fill={GREEN} weight={800}>
          start above 1, then an amplitude-dependent element pulls it back
        </M>
      </g>
    </Scene>
  )
}

export function PhaseShiftLadderScene() {
  return (
    <Scene caption="Three sections, sixty degrees each — because one section can never reach ninety">
      <AmpTri cx="140" cy="150" w="104" h="92" label="−A" tone={SIG} className="aecm-cell-in" />
      <Wire d="M88 150 L60 150 L60 268 L700 268" stroke={N} width="2.4" />
      <Wire d="M192 150 L240 150" stroke={N} width="2.4" />
      {[0, 1, 2].map((i) => (
        <g key={i} className={`aecm-cell-in aecm-delay-${i}`}>
          <Cap x={280 + i * 150} y="150" len="62" label="C" tone={ROSE} />
          <Res x={340 + i * 150} y="206" len="46" orient="v" label="R" tone={COOL} />
          <Wire d={`M${311 + i * 150} 150 L${390 + i * 150} 150 M${340 + i * 150} 150 L${340 + i * 150} 183 M${340 + i * 150} 229 L${340 + i * 150} 268`} stroke={N} width="2.2" />
          <M x={340 + i * 150} y="116" size={11} fill={GOLD} weight={800}>
            +60°
          </M>
        </g>
      ))}
      <Wire d="M700 150 L740 150 L740 92 L112 92 L112 118" stroke={COOL} width="2.4" marker="url(#aecArrC)" className="aecm-flow-arrow aecm-delay-3" />
      <M x="420" y="82" size={10.5} fill={COOL} weight={800}>
        180° from the ladder + 180° from the inverting amplifier = 360°
      </M>

      <Plane cx="180" cy="366" r="76" xLabel="" yLabel="" tone={MUTED} />
      {[60, 120, 180].map((a, i) => (
        <Phasor key={a} ox="180" oy="366" ang={a} len={68} label="" tone={[SIG, COOL, GOLD][i]} className={`aecm-draw aecm-delay-${i}`} />
      ))}
      <M x="180" y="458" size={10} fill={MUTED}>
        three contributions, adding
      </M>

      {[
        ['f = 1 / (2π R C √6)', GREEN],
        ['A ≥ 29', BIAS],
      ].map(([t, tone], i) => (
        <g key={t} className={`aecm-pop aecm-delay-${i + 2}`}>
          <rect x="330" y={314 + i * 66} width="320" height="52" rx="11" fill={tone} fillOpacity="0.14" stroke={tone} strokeWidth="2.6" />
          <M x="490" y={347 + i * 66} size={15} fill={tone} weight={800}>
            {t}
          </M>
        </g>
      ))}
      <M x="750" y="348" size={10} fill={MUTED} weight={800}>
        one RC section
      </M>
      <M x="750" y="368" size={10} fill={MUTED} weight={800}>
        approaches 90°
      </M>
      <M x="750" y="388" size={10} fill={RED} weight={800}>
        but never reaches it
      </M>
    </Scene>
  )
}

export function WienBridgeScene() {
  return (
    <Scene caption="Attenuation of exactly one third at f₀, so the amplifier must supply exactly three">
      <rect x="40" y="66" width="286" height="248" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="183" y="92" size={11} fill={SIG} weight={800}>
        the lead-lag network
      </M>
      <Res x="126" y="132" len="52" label="R" tone={COOL} />
      <Cap x="196" y="132" len="50" label="C" tone={ROSE} />
      <Wire d="M74 132 L100 132 M152 132 L171 132 M221 132 L262 132" stroke={N} width="2.2" />
      <Res x="262" y="196" len="46" orient="v" label="R" tone={COOL} />
      <Wire d="M262 132 L262 173 M262 219 L262 274 L74 274 L74 132" stroke={N} width="2.2" />
      <Cap x="206" y="196" len="46" orient="v" label="C" tone={ROSE} />
      <Wire d="M206 173 L206 132 M206 219 L206 274" stroke={N} width="2.2" />
      <M x="183" y="300" size={9.5} fill={MUTED}>
        series arm above, parallel arm below
      </M>

      <Wire d="M380 200 L820 200" stroke={MUTED} width="1.8" />
      <Wire d="M380 230 L380 96" stroke={MUTED} width="1.8" />
      <Curve
        pts={Array.from({ length: 81 }, (_, i) => {
          const t = i / 80
          const r = 10 ** ((t - 0.5) * 2.4)
          return [380 + t * 430, 200 - 96 / Math.sqrt(9 + (r - 1 / r) ** 2) * 3]
        })}
        stroke={COOL}
        width="2.8"
        className="aecm-draw"
      />
      <Dot cx="595" cy="104" r="7" fill={ROSE} />
      <M x="612" y="100" size={10} fill={ROSE} anchor="start" weight={800}>
        peaks at ⅓
      </M>
      <M x="380" y="88" size={10} fill={MUTED} anchor="start" weight={800}>
        attenuation
      </M>

      <Wire d="M380 336 L820 336" stroke={MUTED} width="1.8" />
      <Curve
        pts={Array.from({ length: 81 }, (_, i) => {
          const t = i / 80
          const r = 10 ** ((t - 0.5) * 2.4)
          return [380 + t * 430, 336 + 52 * Math.atan(r - 1 / r) / 1.4]
        })}
        stroke={SIG}
        width="2.8"
        className="aecm-draw aecm-delay-2"
      />
      <Dot cx="595" cy="336" r="7" fill={ROSE} />
      <Wire d="M595 104 L595 336" stroke={ROSE} width="1.6" dash="5 4" />
      <M x="595" y="366" size={10} fill={ROSE} weight={800}>
        f₀ = 1/(2πRC)
      </M>
      <M x="380" y="392" size={10} fill={MUTED} anchor="start" weight={800}>
        phase, through zero at the same point
      </M>

      <g className="aecm-slide-in aecm-delay-4">
        <rect x="40" y="336" width="286" height="106" rx="12" fill={WHITE} stroke={GOLD} strokeWidth="2.4" />
        <M x="183" y="360" size={10.5} fill={GOLD} weight={800}>
          the lamp keeps A at exactly 3
        </M>
        <circle cx="96" cy="404" r="16" fill={GOLD} fillOpacity="0.3" stroke={GOLD} strokeWidth="2.4" className="aecm-pulse" />
        <M x="200" y="398" size={9.5} fill={MUTED} anchor="start">
          warms up → resistance rises
        </M>
        <M x="200" y="418" size={9.5} fill={MUTED} anchor="start">
          → gain pulled back
        </M>
      </g>
      <M x="595" y="424" size={10} fill={RED} weight={800}>
        A &lt; 3: dies · A &gt; 3: clips
      </M>
    </Scene>
  )
}

export function HartleyColpittsScene() {
  return (
    <Scene caption="Tap the coil or tap the capacitors — the same tank, two ways of taking a fraction">
      <rect x="40" y="66" width="390" height="288" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="235" y="92" size={12} fill={SIG} weight={800}>
        Hartley — tapped inductor
      </M>
      <Ind x="160" y="150" len="90" label="L1" tone={COOL} />
      <Ind x="300" y="150" len="90" label="L2" tone={COOL} />
      <Wire d="M205 150 L255 150 M115 150 L80 150 L80 260 M345 150 L390 150 L390 260" stroke={N} width="2.2" />
      <Cap x="235" y="260" len="120" label="C" tone={ROSE} />
      <Wire d="M80 260 L175 260 M295 260 L390 260" stroke={N} width="2.2" />
      <Dot cx="230" cy="150" r="7" fill={GOLD} className="aecm-pulse" />
      <Wire d="M230 150 L230 200 L300 200" stroke={GOLD} width="2" marker="url(#aecArrG)" />
      <M x="318" y="204" size={10} fill={GOLD} anchor="start" weight={800}>
        β = L1/L2
      </M>
      <M x="235" y="316" size={11.5} fill={N} weight={800}>
        f = 1 / (2π√((L1+L2)C))
      </M>

      <rect x="470" y="66" width="390" height="288" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <M x="665" y="92" size={12} fill={GREEN} weight={800}>
        Colpitts — tapped capacitors
      </M>
      <Ind x="665" y="150" len="140" label="L" tone={COOL} />
      <Wire d="M595 150 L510 150 L510 260 M735 150 L820 150 L820 260" stroke={N} width="2.2" />
      <Cap x="590" y="260" len="100" label="C1" tone={ROSE} />
      <Cap x="740" y="260" len="100" label="C2" tone={ROSE} />
      <Wire d="M510 260 L545 260 M635 260 L695 260 M785 260 L820 260" stroke={N} width="2.2" />
      <Dot cx="665" cy="260" r="7" fill={GOLD} className="aecm-pulse" />
      <Wire d="M665 260 L665 306 L740 306" stroke={GOLD} width="2" marker="url(#aecArrG)" />
      <M x="756" y="310" size={10} fill={GOLD} anchor="start" weight={800}>
        β = C2/C1
      </M>
      <M x="665" y="316" size={11.5} fill={N} weight={800}>
        f = 1 / (2π√(L·Cseries))
      </M>

      <g className="aecm-emerge">
        <rect x="140" y="380" width="620" height="58" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="450" y="406" size={11.5} fill={GOLD} weight={800}>
          Colpitts wins above a few MHz
        </M>
        <M x="450" y="426" size={10} fill={MUTED}>
          capacitors are more predictable than a tapped coil
        </M>
      </g>
    </Scene>
  )
}

export function CrystalStabilityScene() {
  return (
    <Scene caption="An equivalent inductance in henries and a resistance in ohms: Q in the hundreds of thousands">
      <rect x="40" y="66" width="286" height="250" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="183" y="92" size={11} fill={SIG} weight={800}>
        the equivalent circuit
      </M>
      <Ind x="122" y="150" len="52" label="L" tone={COOL} />
      <Cap x="186" y="150" len="48" label="C" tone={ROSE} />
      <Res x="250" y="150" len="52" label="R" tone={BIAS} />
      <Wire d="M74 150 L96 150 M148 150 L162 150 M210 150 L224 150 M276 150 L296 150" stroke={N} width="2.2" />
      <Cap x="186" y="226" len="120" label="C₀" tone={MUTED} />
      <Wire d="M74 150 L74 226 L126 226 M246 226 L296 226 L296 150" stroke={N} width="2.2" />
      <Panel
        x="46"
        y="264"
        w="274"
        title="typical values"
        rows={[['L', '3 H'], ['C', '0.03 pF'], ['R', '40 Ω'], ['Q', '≈ 250 000']]}
        accent={GOLD}
        className="aecm-slide-in aecm-delay-2"
        rowH={24}
      />

      <Wire d="M380 300 L830 300" stroke={MUTED} width="2" marker="url(#aecArr)" />
      <Wire d="M380 300 L380 96" stroke={MUTED} width="2" />
      <L x="820" y="332" size={11} fill={MUTED} weight={700} anchor="end">
        frequency
      </L>
      <Curve
        pts={Array.from({ length: 121 }, (_, i) => {
          const t = i / 120
          const fs = 0.44
          const fp = 0.56
          const z = Math.abs(((t - fs) * (t - fs) + 0.0004) / ((t - fp) * (t - fp) + 0.0002))
          return [380 + t * 440, 300 - Math.min(190, 24 * Math.log10(1 + z * 40))]
        })}
        stroke={SIG}
        width="2.8"
        className="aecm-draw"
      />
      <rect x="573" y="110" width="54" height="190" fill={GOLD} fillOpacity="0.16" className="aecm-fade-in aecm-delay-2" />
      <M x="600" y="100" size={9.5} fill={GOLD} weight={800}>
        the usable region
      </M>
      <M x="600" y="326" size={9} fill={MUTED}>
        a few hundred ppm wide
      </M>

      <Bars
        x="500"
        y="360"
        w="220"
        items={[['RC', 30, RED], ['LC', 8, BIAS], ['crystal', 1, GREEN]]}
        rowH={32}
        max={30}
      />
      <M x="610" y="462" size={9.5} fill={MUTED}>
        drift over temperature, relative
      </M>
    </Scene>
  )
}

export function ConductionAngleScene() {
  const classes = [
    ['Class A', '360°', '25–50%', GREEN, 1],
    ['Class AB', '> 180°', '≈ 60%', COOL, 0.58],
    ['Class B', '180°', '78.5%', BIAS, 0.5],
    ['Class C', '≈ 90°', '> 90%', RED, 0.25],
  ]
  return (
    <Scene caption="Conduct less of the cycle and the efficiency climbs — and so does the distortion">
      {classes.map(([name, ang, eff, tone, frac], i) => (
        <g key={name} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={30 + i * 212} y="62" width="196" height="286" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={128 + i * 212} y="88" size={12} fill={tone} weight={800}>
            {name}
          </M>
          <Wire d={`M${52 + i * 212} 152 L${204 + i * 212} 152`} stroke={MUTED} width="1.3" opacity="0.6" />
          <Wave x={52 + i * 212} y="152" w="152" amp="30" cycles={1} stroke={MUTED} width="2" />
          <Wire d={`M${52 + i * 212} 268 L${204 + i * 212} 268`} stroke={MUTED} width="1.3" opacity="0.6" />
          <path
            d={(() => {
              const pts = []
              for (let k = 0; k <= 60; k += 1) {
                const t = k / 60
                const s = Math.sin(2 * Math.PI * t)
                const cut = frac === 1 ? -1 : 1 - 2 * frac
                const v = s > cut ? (s - cut) / (1 - cut) : 0
                pts.push(`${k === 0 ? 'M' : 'L'}${(52 + i * 212 + t * 152).toFixed(1)} ${(268 - 56 * v).toFixed(1)}`)
              }
              return `${pts.join(' ')} L${204 + i * 212} 268 L${52 + i * 212} 268 Z`
            })()}
            fill={tone}
            fillOpacity="0.24"
            stroke={tone}
            strokeWidth="2.4"
          />
          <M x={128 + i * 212} y="306" size={12} fill={tone} weight={800}>
            {ang}
          </M>
          <M x={128 + i * 212} y="330" size={11} fill={N} weight={800}>
            {eff}
          </M>
        </g>
      ))}
      <Wire d="M60 390 L840 390" stroke={GREEN} width="3" marker="url(#aecArrGr)" className="aecm-flow-arrow" />
      <M x="450" y="378" size={11} fill={GREEN} weight={800}>
        efficiency rises →
      </M>
      <Wire d="M60 432 L840 432" stroke={RED} width="3" marker="url(#aecArrR)" className="aecm-flow-arrow aecm-delay-2" />
      <M x="450" y="454" size={11} fill={RED} weight={800}>
        linearity falls →
      </M>
    </Scene>
  )
}

export function ClassATwoWaysScene() {
  return (
    <Scene caption="The transformer removes the DC drop across the load, and that doubles the efficiency">
      <rect x="40" y="66" width="390" height="250" rx="12" fill={WHITE} stroke={BIAS} strokeWidth="2.3" />
      <M x="235" y="92" size={11.5} fill={BIAS} weight={800}>
        direct-coupled
      </M>
      <Wire d="M260 120 L260 134" stroke={N} width="2.2" />
      <M x="260" y="112" size={9.5} fill={MUTED}>+VCC</M>
      <Res x="260" y="168" len="54" orient="v" label="RL" tone={BIAS} />
      <Wire d="M260 195 L260 220" stroke={N} width="2.2" />
      <Bjt cx="180" cy="240" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M202 200 L260 200 M146 240 L96 240 M202 280 L202 296 L96 296" stroke={N} width="2.2" />
      <Gnd x="202" y="296" tone={N} />
      <g className="aecm-current">
        <Wire d="M320 150 L320 210" stroke={RED} width="2.4" marker="url(#aecArrR)" />
      </g>
      <M x="320" y="232" size={9.5} fill={RED} weight={800}>
        DC in the load
      </M>
      <rect x="66" y="330" width="340" height="30" rx="7" fill={RED} fillOpacity="0.2" stroke={RED} strokeWidth="2" className="aecm-cell-in" />
      <M x="236" y="351" size={10} fill={RED} weight={800}>
        half the supply lost as DC drop
      </M>
      <M x="236" y="386" size={14} fill={BIAS} weight={800}>
        η ≈ 25%
      </M>

      <rect x="470" y="66" width="390" height="250" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <M x="665" y="92" size={11.5} fill={GREEN} weight={800}>
        transformer-coupled
      </M>
      <Wire d="M660 120 L660 138" stroke={N} width="2.2" />
      <M x="660" y="112" size={9.5} fill={MUTED}>+VCC</M>
      <Xformer cx="660" cy="192" h="80" tone={COOL} className="aecm-cell-in aecm-delay-2" />
      <Wire d="M646 152 L646 138 M646 232 L646 250 M674 152 L740 152 M674 232 L740 232" stroke={N} width="2.2" />
      <Res x="740" y="192" len="50" orient="v" label="RL" tone={GREEN} />
      <Wire d="M740 152 L740 167 M740 217 L740 232" stroke={N} width="2.2" />
      <Bjt cx="570" cy="254" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M592 214 L646 214 M536 254 L500 254 M592 294 L592 300 L500 300" stroke={N} width="2.2" />
      <Gnd x="592" y="300" tone={N} />
      <M x="665" y="340" size={10} fill={GREEN} weight={800}>
        almost no DC resistance in the primary
      </M>
      <M x="665" y="362" size={10} fill={GREEN} weight={800}>
        so the collector swings to nearly 2 VCC
      </M>
      <M x="665" y="392" size={14} fill={GREEN} weight={800}>
        η ≈ 50%
      </M>

      <g className="aecm-emerge">
        <rect x="290" y="416" width="320" height="42" rx="10" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="450" y="444" size={13} fill={GOLD} weight={800}>
          R′ = n² · RL
        </M>
      </g>
    </Scene>
  )
}

export function CrossoverDistortionScene() {
  return (
    <Scene caption="Neither device conducts until the input passes 0.7 V — and the gap is right where the ear is listening">
      <rect x="40" y="66" width="340" height="300" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="210" y="92" size={11.5} fill={SIG} weight={800}>
        complementary pair
      </M>
      <Wire d="M170 120 L170 136" stroke={N} width="2.2" />
      <M x="170" y="112" size={9.5} fill={MUTED}>+VCC</M>
      <Bjt cx="170" cy="176" kind="npn" label="npn" tone={GREEN} ring={false} />
      <Bjt cx="170" cy="286" kind="pnp" label="pnp" tone={BIAS} ring={false} />
      <Wire d="M192 136 L192 216 M192 246 L192 344 M136 176 L96 176 L96 286 M136 286 L96 286" stroke={N} width="2.2" />
      <Wire d="M192 231 L300 231" stroke={N} width="2.2" />
      <Res x="300" y="278" len="50" orient="v" label="RL" tone={N} />
      <Wire d="M300 231 L300 253 M300 303 L300 344 L192 344" stroke={N} width="2.2" />
      <Gnd x="246" y="344" tone={N} />
      <g className="aecm-current">
        <Wire d="M216 152 L216 220" stroke={GREEN} width="3" marker="url(#aecArrGr)" />
      </g>
      <g className="aecm-current-rev aecm-delay-2">
        <Wire d="M216 310 L216 244" stroke={BIAS} width="3" marker="url(#aecArrB)" />
      </g>

      <Wire d="M440 154 L850 154" stroke={MUTED} width="1.4" opacity="0.6" />
      <Wave x="440" y="154" w="410" amp="52" cycles={2} stroke={SIG} width="2.8" className="aecm-draw" />
      <M x="424" y="158" size={10} fill={SIG} anchor="end" weight={800}>
        in
      </M>

      <Wire d="M440 300 L850 300" stroke={MUTED} width="1.4" opacity="0.6" />
      <Curve
        pts={Array.from({ length: 201 }, (_, i) => {
          const t = i / 200
          const s = Math.sin(2 * Math.PI * 2 * t)
          const dead = 0.22
          const v = Math.abs(s) < dead ? 0 : s > 0 ? s - dead : s + dead
          return [440 + t * 410, 300 - 52 * v]
        })}
        stroke={BIAS}
        width="2.8"
        className="aecm-draw aecm-delay-2"
      />
      <M x="424" y="304" size={10} fill={BIAS} anchor="end" weight={800}>
        out
      </M>
      {[543, 748].map((x, i) => (
        <g key={x} className={`aecm-pulse aecm-delay-${i}`}>
          <circle cx={x} cy="300" r="20" fill={RED} fillOpacity="0.14" stroke={RED} strokeWidth="2.4" />
        </g>
      ))}
      <g className="aecm-emerge">
        <rect x="560" y="352" width="290" height="94" rx="12" fill={RED} fillOpacity="0.08" stroke={RED} strokeWidth="2.4" />
        <Wire d="M584 400 L826 400" stroke={MUTED} width="1.4" opacity="0.6" />
        <Wire d="M584 372 L676 400 L734 400 L826 428" stroke={RED} width="3" />
        <M x="705" y="374" size={9.5} fill={RED} weight={800}>
          the dead band, magnified
        </M>
        <M x="705" y="438" size={9} fill={MUTED}>
          worst at low levels, where it is most audible
        </M>
      </g>
    </Scene>
  )
}

export function ClassAbAndCScene() {
  return (
    <Scene caption="A little quiescent current buys back linearity; a tuned tank buys back the missing cycle">
      <rect x="40" y="66" width="390" height="368" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <M x="235" y="92" size={12} fill={GREEN} weight={800}>
        Class AB · η ≈ 60%
      </M>
      <Bjt cx="150" cy="168" kind="npn" label="" tone={N} ring={false} />
      <Bjt cx="150" cy="274" kind="pnp" label="" tone={N} ring={false} />
      <Wire d="M172 128 L172 118 M172 208 L172 236 M172 314 L172 330 M116 168 L92 168 M116 274 L92 274" stroke={N} width="2.2" />
      <g className="aecm-pulse">
        <Diode x="92" y="196" len="46" rot={90} tone={GOLD} />
        <Diode x="92" y="246" len="46" rot={90} tone={GOLD} />
      </g>
      <Wire d="M92 168 L92 173 M92 219 L92 223 M92 269 L92 274" stroke={N} width="2.2" />
      <M x="70" y="224" size={9.5} fill={GOLD} anchor="end" weight={800}>
        bias
      </M>
      <Wire d="M172 222 L282 222" stroke={N} width="2.2" />
      <Res x="282" y="268" len="50" orient="v" label="RL" tone={N} />
      <Wire d="M282 222 L282 243 M282 293 L282 330 L172 330" stroke={N} width="2.2" />
      <Gnd x="228" y="330" tone={N} />
      <Wire d="M66 404 L406 404" stroke={MUTED} width="1.4" opacity="0.6" />
      <Wave x="66" y="404" w="340" amp="26" cycles={2} stroke={GREEN} width="2.6" className="aecm-draw aecm-delay-2" />
      <rect x="150" y="386" width="36" height="36" rx="8" fill={GREEN} fillOpacity="0.2" className="aecm-fade-in aecm-delay-3" />
      <M x="236" y="374" size={9.5} fill={GREEN} weight={800}>
        small IQ removes the dead band
      </M>

      <rect x="470" y="66" width="390" height="368" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.3" />
      <M x="665" y="92" size={12} fill={RED} weight={800}>
        Class C · η &gt; 90%
      </M>
      <Bjt cx="570" cy="200" kind="npn" label="" tone={N} ring={false} />
      <Wire d="M536 200 L500 200 M592 160 L660 160 M592 240 L592 270 L500 270" stroke={N} width="2.2" />
      <Gnd x="592" y="270" tone={N} />
      <M x="500" y="232" size={9} fill={RED} anchor="start">
        biased beyond cut-off
      </M>
      <Ind x="700" y="128" len="60" orient="v" label="L" tone={COOL} />
      <Cap x="770" y="128" len="60" orient="v" label="C" tone={ROSE} />
      <Wire d="M660 160 L700 160 M700 98 L770 98 M700 158 L700 160 M770 158 L770 160 M700 160 L820 160" stroke={N} width="2.2" />
      <M x="750" y="86" size={9.5} fill={COOL} weight={800}>
        tuned tank
      </M>
      <Wire d="M500 350 L640 350" stroke={MUTED} width="1.4" opacity="0.6" />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${520 + i * 44} 350 L${528 + i * 44} 306 L${536 + i * 44} 350 Z`}
          fill={RED}
          fillOpacity="0.28"
          stroke={RED}
          strokeWidth="2.2"
          className={`aecm-cell-in aecm-delay-${i}`}
        />
      ))}
      <M x="570" y="374" size={9.5} fill={RED} weight={800}>
        narrow pulses in
      </M>
      <Wire d="M660 350 L690 350" stroke={MUTED} width="2.2" marker="url(#aecArrM)" />
      <Wire d="M700 350 L840 350" stroke={MUTED} width="1.4" opacity="0.6" />
      <Wave x="700" y="350" w="140" amp="24" cycles={2} stroke={GREEN} width="2.6" className="aecm-draw aecm-delay-3" />
      <M x="770" y="374" size={9.5} fill={GREEN} weight={800}>
        clean sine out
      </M>
      <M x="665" y="410" size={10} fill={MUTED}>
        the tank fills in the cycle the device never conducted
      </M>
    </Scene>
  )
}

export function PowerStageDesignScene() {
  const steps = [
    ['required Po and distortion', SIG],
    ['choose the class', COOL],
    ['supply from the swing into RL', GREEN],
    ['device current and voltage ratings', ROSE],
    ['heat sink from worst-case dissipation', BIAS],
  ]
  return (
    <Scene caption="The worst case for a Class B stage is not full output — it is about 63% of it">
      {steps.map(([t, tone], i) => (
        <g key={t} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x="50" y={70 + i * 74} width="390" height="54" rx="11" fill={WHITE} stroke={tone} strokeWidth={i === 4 ? 3 : 2.2} fillOpacity={i === 4 ? 0.1 : 1} />
          <M x="245" y={103 + i * 74} size={12} fill={i === 4 ? tone : N}>
            {t}
          </M>
          {i < 4 ? (
            <Wire d={`M245 ${124 + i * 74} L245 ${142 + i * 74}`} stroke={MUTED} width="2.2" marker="url(#aecArrM)" />
          ) : null}
        </g>
      ))}

      <Wire d="M520 400 L850 400" stroke={MUTED} width="2" marker="url(#aecArr)" />
      <Wire d="M520 400 L520 110" stroke={MUTED} width="2" />
      <L x="840" y="434" size={11} fill={MUTED} weight={700} anchor="end">
        output power
      </L>
      <L x="510" y="102" size={11} fill={MUTED} weight={700} anchor="end">
        device dissipation
      </L>
      <Curve
        pts={Array.from({ length: 61 }, (_, i) => {
          const t = i / 60
          const pd = Math.max(0, 2 * Math.sqrt(t) - Math.PI * t / 2)
          return [520 + t * 310, 400 - 300 * pd]
        })}
        stroke={BIAS}
        width="3.2"
        className="aecm-draw aecm-delay-3"
      />
      <g className="aecm-pop aecm-delay-4">
        <circle cx="715" cy="205" r="15" fill="none" stroke={RED} strokeWidth="3" />
        <M x="715" y="184" size={10} fill={RED} weight={800}>
          peak at 63%
        </M>
      </g>
      <Dot cx="830" cy="278" r="7" fill={MUTED} />
      <M x="826" y="262" size={9.5} fill={MUTED} anchor="end">
        full output is lower
      </M>
      <M x="686" y="430" size={10} fill={MUTED} weight={800}>
        size the heat sink for the peak, not the maximum
      </M>
    </Scene>
  )
}

/* ── Module 5 — field effect transistors ────────────────────────── */

/** Shockley transfer parabola ID = IDSS(1 − VGS/VP)², sampled onto a plot box
 *  whose x axis runs from VP (left) to 0 (right). */
function shockleyPts(x0, w, base, h, idssFrac = 1, steps = 60) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    pts.push([x0 + t * w, base - h * idssFrac * t * t])
  }
  return pts
}

export function FetVsBjtScene() {
  const rows = [
    ['control', 'current (IB)', 'voltage (VGS)', 1],
    ['carriers', 'both', 'majority only', 1],
    ['input impedance', 'kΩ', 'MΩ — often GΩ', 1],
    ['gain parameter', 'β (unitless)', 'gm (siemens)', -1],
    ['with temperature', 'IC runs away', 'ID falls — self-limiting', 1],
    ['noise', 'lower at low Rs', 'lower at high Rs', 0],
  ]
  return (
    <Scene caption="Different shape, not better or worse — they fail in opposite directions">
      <Bjt cx="150" cy="130" kind="npn" label="BJT" tone={N} ring />
      <g className="aecm-current">
        <Wire d="M76 130 L110 130" stroke={RED} width="5" marker="url(#aecArrR)" />
      </g>
      <M x="150" y="196" size={10} fill={RED} weight={800}>
        IB flows · microamps
      </M>

      <Fet cx="520" cy="130" kind="jfet" label="JFET" tone={N} className="aecm-cell-in aecm-delay-1" />
      <Wire d="M444 130 L476 130" stroke={GREEN} width="2" dash="5 4" />
      <g className="aecm-pulse">
        <path d="M452 118 L470 142 M470 118 L452 142" stroke={RED} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      </g>
      <M x="520" y="196" size={10} fill={GREEN} weight={800}>
        IG ≈ 0 · picoamps
      </M>

      <rect x="60" y="222" width="790" height="28" rx="8" fill={N} />
      {['', 'BJT', 'FET'].map((h, i) => (
        <M key={h || i} x={190 + i * 260} y="242" size={10.5} fill={WHITE} weight={800}>
          {h}
        </M>
      ))}
      {rows.map(([prop, a, b, fav], i) => (
        <g key={prop} className={`aecm-cell-in aecm-delay-${i % 5}`}>
          <rect x="60" y={256 + i * 34} width="790" height="28" rx="7" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
          <M x="190" y={275 + i * 34} size={10.5} fill={N}>
            {prop}
          </M>
          {fav === -1 ? <rect x="356" y={258 + i * 34} width="176" height="24" rx="6" fill={GREEN} fillOpacity="0.16" /> : null}
          {fav === 1 ? <rect x="616" y={258 + i * 34} width="176" height="24" rx="6" fill={GREEN} fillOpacity="0.16" /> : null}
          <M x="450" y={275 + i * 34} size={10} fill={fav === -1 ? GREEN : MUTED} weight={fav === -1 ? 800 : 700}>
            {a}
          </M>
          <M x="710" y={275 + i * 34} size={10} fill={fav === 1 ? GREEN : MUTED} weight={fav === 1 ? 800 : 700}>
            {b}
          </M>
        </g>
      ))}
      <M x="450" y="474" size={10.5} fill={MUTED} weight={800}>
        pick the one whose weakness your circuit can absorb
      </M>
    </Scene>
  )
}

export function JfetChannelPinchScene() {
  const section = (y, dep, arrow, tag, tone) => (
    <g>
      <rect x="140" y={y - 44} width="420" height="88" rx="6" fill={SIG} fillOpacity="0.08" stroke={MUTED} strokeWidth="2" />
      <rect x="220" y={y - 44} width="260" height={dep} rx="4" fill={ROSE} fillOpacity="0.26" stroke={ROSE} strokeWidth="1.8" />
      <rect x="220" y={y + 44 - dep} width="260" height={dep} rx="4" fill={ROSE} fillOpacity="0.26" stroke={ROSE} strokeWidth="1.8" />
      <M x="120" y={y + 5} size={10} fill={MUTED} anchor="end">
        S
      </M>
      <M x="578" y={y + 5} size={10} fill={MUTED} anchor="start">
        D
      </M>
      <M x="350" y={y - 54} size={10} fill={ROSE} weight={800}>
        p gate
      </M>
      {arrow > 0 ? (
        <Wire d={`M170 ${y} L530 ${y}`} stroke={GREEN} width={arrow} marker="url(#aecArrGr)" className="aecm-current" />
      ) : null}
      <M x="640" y={y + 5} size={11} fill={tone} anchor="start" weight={800}>
        {tag}
      </M>
    </g>
  )
  return (
    <Scene caption="The gate never conducts — it just squeezes the channel shut with its depletion regions">
      <g className="aecm-cell-in">{section(110, 14, 6, 'VGS = 0 · wide open', GREEN)}</g>
      <g className="aecm-cell-in aecm-delay-2">{section(240, 30, 3, 'VGS negative · narrowed', BIAS)}</g>
      <g className="aecm-cell-in aecm-delay-4">{section(370, 44, 0, 'VGS = VP · pinched off, ID = 0', RED)}</g>
      <g className="aecm-emerge">
        <rect x="140" y="434" width="620" height="40" rx="10" fill={SKY} stroke={COOL} strokeWidth="2.2" />
        <M x="450" y="459" size={11.5} fill={COOL} weight={800}>
          the gate junction is always reverse biased, so no gate current flows
        </M>
      </g>
    </Scene>
  )
}

export function JfetCharacteristicsScene() {
  return (
    <Scene caption="One parabola on the right, one family on the left — and every question uses both">
      <Axes x="80" y="350" w="340" h="250" xLabel="VDS" yLabel="ID" />
      <rect x="80" y="110" width="60" height="240" fill={BIAS} fillOpacity="0.16" className="aecm-fade-in" />
      <M x="110" y="374" size={9.5} fill={BIAS} weight={800}>ohmic</M>
      <rect x="140" y="110" width="280" height="240" fill={GREEN} fillOpacity="0.09" className="aecm-fade-in aecm-delay-1" />
      <M x="290" y="126" size={10} fill={GREEN} weight={800}>saturation</M>
      <OutputFamily x="80" y="350" w="340" h="230" count={4} tone={SIG} knee={0.16} />
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const t = i / 40
          return [80 + t * 180, 350 - 230 * (t * 1.28) ** 2]
        })}
        stroke={ROSE}
        width="2.4"
        dash="6 5"
        className="aecm-draw aecm-delay-2"
      />
      <M x="240" y="168" size={9.5} fill={ROSE} weight={800}>
        the boundary
      </M>

      <Axes x="500" y="350" w="300" h="250" xLabel="VGS" yLabel="ID" />
      <M x="500" y="374" size={10} fill={MUTED}>VP</M>
      <M x="800" y="374" size={10} fill={MUTED}>0</M>
      <Curve pts={shockleyPts(500, 300, 350, 230)} stroke={SIG} width="3.2" className="aecm-draw aecm-delay-2" />
      <M x="806" y="116" size={10} fill={SIG} anchor="start" weight={800}>
        IDSS
      </M>
      {[0.45, 0.68, 0.9].map((t, i) => (
        <g key={t} className={`aecm-pop aecm-delay-${i}`}>
          <Dot cx={(500 + t * 300).toFixed(1)} cy={(350 - 230 * t * t).toFixed(1)} r="6" fill={GOLD} />
          <Wire d={`M${(500 + t * 300).toFixed(1)} ${(350 - 230 * t * t).toFixed(1)} L${430} ${(350 - 230 * t * t).toFixed(1)}`} stroke={GOLD} width="1.5" dash="4 4" />
        </g>
      ))}
      <Card
        x="500"
        y="392"
        w="300"
        h="62"
        title="Shockley"
        accent={GOLD}
        mono
        lines={['ID = IDSS(1 − VGS/VP)²']}
        linesY={50}
        className="aecm-slide-in aecm-delay-4"
      />
    </Scene>
  )
}

export function MosfetCrossSectionsScene() {
  const stack = (x, y, channel, tag, tone) => (
    <g>
      <rect x={x} y={y + 54} width="300" height="60" rx="6" fill={MUTED} fillOpacity="0.14" stroke={MUTED} strokeWidth="1.8" />
      <M x={x + 150} y={y + 104} size={9.5} fill={MUTED}>
        substrate
      </M>
      <rect x={x} y={y + 42} width="300" height="12" fill={GOLD} fillOpacity="0.4" stroke={GOLD} strokeWidth="1.6" />
      <rect x={x + 80} y={y + 28} width="140" height="14" rx="3" fill={N} />
      <M x={x + 150} y={y + 22} size={9.5} fill={N} weight={800}>
        gate
      </M>
      <rect x={x + 10} y={y + 54} width="60" height="24" rx="3" fill={SIG} fillOpacity="0.3" stroke={SIG} strokeWidth="1.6" />
      <rect x={x + 230} y={y + 54} width="60" height="24" rx="3" fill={SIG} fillOpacity="0.3" stroke={SIG} strokeWidth="1.6" />
      <M x={x + 40} y={y + 70} size={9} fill={SIG} weight={800}>S</M>
      <M x={x + 260} y={y + 70} size={9} fill={SIG} weight={800}>D</M>
      {channel ? (
        <rect x={x + 70} y={y + 54} width="160" height="10" rx="3" fill={GREEN} fillOpacity="0.55" stroke={GREEN} strokeWidth="1.6" className={channel === 'induced' ? 'aecm-grow' : ''} />
      ) : null}
      <M x={x + 150} y={y + 136} size={10} fill={tone} weight={800}>
        {tag}
      </M>
    </g>
  )
  return (
    <Scene caption="The oxide is what makes the gate current zero — for either polarity, in both types">
      <g className="aecm-cell-in">{stack(60, 76, 'implanted', 'channel exists at rest · normally on', GREEN)}</g>
      <M x="210" y="66" size={12} fill={GREEN} weight={800}>
        depletion type
      </M>
      <g className="aecm-cell-in aecm-delay-2">{stack(500, 76, null, 'no channel at rest · normally off', BIAS)}</g>
      <M x="650" y="66" size={12} fill={BIAS} weight={800}>
        enhancement type
      </M>
      <g className="aecm-cell-in aecm-delay-4">{stack(500, 260, 'induced', 'positive gate induces the channel', GREEN)}</g>
      <g className="aecm-current aecm-delay-4">
        <Wire d="M650 250 L650 282" stroke={SIG} width="3" marker="url(#aecArrS)" />
      </g>
      <M x="668" y="266" size={9.5} fill={SIG} anchor="start" weight={800}>
        VGS &gt; VT
      </M>

      <g className="aecm-pop aecm-delay-3">
        <Wire d="M260 200 L260 300 L420 300" stroke={GOLD} width="2" dash="5 4" marker="url(#aecArrG)" />
        <rect x="60" y="308" width="360" height="78" rx="12" fill={GOLD} fillOpacity="0.12" stroke={GOLD} strokeWidth="2.4" />
        <M x="240" y="336" size={11} fill={GOLD} weight={800}>
          the oxide layer
        </M>
        <M x="240" y="360" size={10} fill={N}>
          an insulator — gate current is zero
        </M>
        <M x="240" y="378" size={10} fill={N}>
          for either polarity of VGS
        </M>
      </g>
      <M x="240" y="424" size={10.5} fill={MUTED} weight={800}>
        which is why a depletion MOSFET can be driven positive as well as negative
      </M>
    </Scene>
  )
}

export function FourMosfetSymbolsScene() {
  const cells = [
    ['n-channel depletion', 'demos', false, GREEN],
    ['p-channel depletion', 'demos', true, COOL],
    ['n-channel enhancement', 'emos', false, BIAS],
    ['p-channel enhancement', 'emos', true, SIG],
  ]
  return (
    <Scene caption="Broken line means enhancement; the arrow direction names the channel">
      {cells.map(([name, kind, p, tone], i) => {
        const x = 130 + (i % 2) * 420
        const y = 130 + Math.floor(i / 2) * 176
        return (
          <g key={name} className={`aecm-cell-in aecm-delay-${i}`}>
            <rect x={x - 96} y={y - 76} width="384" height="152" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
            <M x={x + 96} y={y - 52} size={11} fill={tone} weight={800}>
              {name}
            </M>
            <Fet cx={x} cy={y + 10} kind={kind} p={p} label="" tone={N} />
            <g className="aecm-pulse">
              <circle cx={x - 4} cy={y + 10} r="20" fill="none" stroke={tone} strokeWidth="2" strokeDasharray="4 4" />
              <circle cx={x - 26} cy={y + 10} r="14" fill="none" stroke={GOLD} strokeWidth="2" strokeDasharray="4 4" />
            </g>
            <Wire d={`M${x + 120} ${y + 46} L${x + 252} ${y + 46}`} stroke={MUTED} width="1.6" />
            <Wire d={`M${x + 186} ${y + 46} L${x + 186} ${y - 26}`} stroke={MUTED} width="1.6" />
            <Curve
              pts={Array.from({ length: 31 }, (_, k) => {
                const t = k / 30
                const px = p ? x + 186 - t * 62 : x + 186 + t * 62
                return [px, y + 46 - 62 * t * t]
              })}
              stroke={tone}
              width="2.4"
            />
            <M x={x + 186} y={y + 64} size={9} fill={MUTED}>
              {kind === 'emos' ? 'VT' : 'VP'}
            </M>
          </g>
        )
      })}
      <g className="aecm-emerge">
        <rect x="120" y="428" width="660" height="40" rx="10" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="450" y="453" size={11.5} fill={GOLD} weight={800}>
          broken line = enhancement · continuous = depletion · arrow inward = n-channel
        </M>
      </g>
    </Scene>
  )
}

export function FetFixedBiasScene() {
  return (
    <Scene caption="IG is zero, so the megohm resistor drops nothing — and the device spread goes uncorrected">
      <rect x="40" y="70" width="360" height="290" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Fet cx="250" cy="186" kind="jfet" label="" tone={N} />
      <Wire d="M274 144 L274 112 L340 112" stroke={N} width="2.2" />
      <Wire d="M274 228 L274 300 L130 300" stroke={N} width="2.2" />
      <Gnd x="274" y="300" tone={N} />
      <Res x="160" y="186" len="80" label="RG 1 MΩ" tone={COOL} />
      <Wire d="M200 186 L210 186 M120 186 L100 186 L100 240" stroke={N} width="2.2" />
      <Src cx="100" cy="266" kind="v" label="−VGG" tone={BIAS} r="22" />
      <Wire d="M100 288 L100 300 L130 300" stroke={N} width="2.2" />
      <g className="aecm-emerge">
        <rect x="64" y="322" width="312" height="30" rx="8" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.2" />
        <M x="220" y="343" size={11} fill={GREEN} weight={800}>
          IG = 0 ⇒ VGS = −VGG exactly
        </M>
      </g>

      <Axes x="480" y="380" w="340" h="290" xLabel="VGS" yLabel="ID" />
      <M x="480" y="404" size={10} fill={MUTED}>VP</M>
      <M x="820" y="404" size={10} fill={MUTED}>0</M>
      {[
        [1.0, 'IDSS max', RED],
        [0.68, 'typical', GREEN],
        [0.42, 'IDSS min', RED],
      ].map(([f, lab, tone], i) => (
        <g key={lab} className={`aecm-draw aecm-delay-${i}`}>
          <Curve pts={shockleyPts(480, 340, 380, 260, f)} stroke={tone} width="2.6" opacity={i === 1 ? 1 : 0.72} />
          <M x="826" y={(380 - 260 * f + 4).toFixed(1)} size={9} fill={tone} anchor="start" weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <Wire d="M684 120 L684 380" stroke={GOLD} width="2.6" dash="6 5" className="aecm-draw aecm-delay-3" />
      <M x="684" y="404" size={10} fill={GOLD} weight={800}>
        fixed VGS
      </M>
      {[1.0, 0.68, 0.42].map((f, i) => (
        <Dot key={f} cx="684" cy={(380 - 260 * f * 0.36).toFixed(1)} r="7" fill={GOLD} className={`aecm-pop aecm-delay-${i}`} />
      ))}
      <M x="650" y="440" size={10.5} fill={MUTED} weight={800}>
        same bias voltage, three very different currents
      </M>
    </Scene>
  )
}

export function SelfBiasGraphicalScene() {
  return (
    <Scene caption="One straight line through the origin, and the intersection is the answer">
      <rect x="40" y="70" width="360" height="300" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Fet cx="240" cy="176" kind="jfet" label="" tone={N} />
      <Wire d="M264 134 L264 106 L340 106" stroke={N} width="2.2" />
      <Wire d="M264 218 L264 244" stroke={N} width="2.2" />
      <Res x="264" y="272" len="52" orient="v" label="RS" tone={BIAS} />
      <Wire d="M264 298 L264 330 L120 330" stroke={N} width="2.2" />
      <Gnd x="264" y="330" tone={N} />
      <Res x="140" y="176" len="70" orient="v" label="RG" tone={COOL} />
      <Wire d="M200 176 L140 176 M140 141 L140 176 M140 211 L140 330" stroke={N} width="2.2" />
      <g className="aecm-emerge">
        <rect x="64" y="342" width="312" height="30" rx="8" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.2" />
        <M x="220" y="363" size={11.5} fill={GREEN} weight={800}>
          VGS = −ID · RS
        </M>
      </g>

      <Axes x="480" y="380" w="340" h="290" xLabel="VGS" yLabel="ID" />
      <M x="480" y="404" size={10} fill={MUTED}>VP</M>
      <M x="820" y="404" size={10} fill={MUTED}>0</M>
      {[1.0, 0.68, 0.42].map((f, i) => (
        <Curve key={f} pts={shockleyPts(480, 340, 380, 260, f)} stroke={i === 1 ? SIG : MUTED} width={i === 1 ? 3 : 2} opacity={i === 1 ? 1 : 0.5} className={`aecm-draw aecm-delay-${i}`} />
      ))}
      <Wire d="M820 380 L560 148" stroke={BIAS} width="3" className="aecm-draw aecm-delay-3" />
      <M x="592" y="140" size={10} fill={BIAS} anchor="start" weight={800}>
        slope −1/RS, from the origin
      </M>
      {[
        [0.7, 1.0],
        [0.62, 0.68],
        [0.52, 0.42],
      ].map(([t, f], i) => (
        <Dot key={f} cx={(480 + t * 340).toFixed(1)} cy={(380 - 260 * f * t * t).toFixed(1)} r={i === 1 ? 8 : 6} fill={i === 1 ? GOLD : MUTED} className={`aecm-pop aecm-delay-${i}`} />
      ))}
      <M x="650" y="440" size={10.5} fill={GREEN} weight={800}>
        spread already reduced by the self-correction
      </M>
    </Scene>
  )
}

export function FetDividerBiasScene() {
  return (
    <Scene caption="The divider is never loaded, so megohms are free — and the bias line lifts off the origin">
      <rect x="40" y="66" width="340" height="300" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Fet cx="250" cy="178" kind="jfet" label="" tone={N} />
      <Wire d="M274 136 L274 104 L340 104" stroke={N} width="2.2" />
      <Wire d="M274 220 L274 246" stroke={N} width="2.2" />
      <Res x="274" y="274" len="52" orient="v" label="RS" tone={BIAS} />
      <Wire d="M274 300 L274 330 L112 330" stroke={N} width="2.2" />
      <Gnd x="274" y="330" tone={N} />
      <Res x="112" y="140" len="56" orient="v" label="R1" tone={COOL} />
      <Res x="112" y="262" len="56" orient="v" label="R2" tone={COOL} />
      <Wire d="M112 104 L112 112 M112 168 L112 200 M112 234 L112 200 M112 290 L112 330 M112 104 L340 104" stroke={N} width="2.2" />
      <Dot cx="112" cy="200" r="6" fill={COOL} />
      <Wire d="M112 200 L210 200" stroke={N} width="2.2" />
      <M x="130" y="192" size={10} fill={COOL} anchor="start" weight={800}>
        VG
      </M>
      <M x="210" y="358" size={10} fill={GREEN} weight={800}>
        VGS = VG − ID·RS
      </M>

      <Axes x="450" y="330" w="360" h="240" xLabel="VGS" yLabel="ID" />
      {[1.0, 0.68, 0.42].map((f, i) => (
        <Curve key={f} pts={shockleyPts(450, 360, 330, 210, f)} stroke={i === 1 ? SIG : MUTED} width={i === 1 ? 3 : 2} opacity={i === 1 ? 1 : 0.5} className={`aecm-draw aecm-delay-${i}`} />
      ))}
      <Wire d="M836 292 L530 152" stroke={BIAS} width="3" className="aecm-draw aecm-delay-3" />
      <M x="836" y="278" size={9.5} fill={BIAS} anchor="end" weight={800}>
        intercept at VG
      </M>
      {[
        [0.82, 1.0],
        [0.79, 0.68],
        [0.75, 0.42],
      ].map(([t, f], i) => (
        <Dot key={f} cx={(450 + t * 360).toFixed(1)} cy={(330 - 210 * f * t * t).toFixed(1)} r={i === 1 ? 8 : 6} fill={i === 1 ? GOLD : MUTED} className={`aecm-pop aecm-delay-${i}`} />
      ))}
      <M x="630" y="360" size={10} fill={GREEN} weight={800}>
        the three intersections are now close together
      </M>

      <Bars
        x="540"
        y="392"
        w="200"
        items={[['fixed', 3, RED], ['self', 1.6, BIAS], ['divider', 0.7, GREEN]]}
        rowH={28}
        max={3}
      />
      <M x="640" y="474" size={9.5} fill={MUTED}>
        spread in ID
      </M>
    </Scene>
  )
}

export function GmSlopeScene() {
  return (
    <Scene caption="gm is the slope of the transfer curve — so it falls as you bias towards pinch-off">
      <Axes x="70" y="360" w="360" h="270" xLabel="VGS" yLabel="ID" />
      <M x="70" y="384" size={10} fill={MUTED}>VP</M>
      <M x="430" y="384" size={10} fill={MUTED}>0</M>
      <Curve pts={shockleyPts(70, 360, 360, 250)} stroke={SIG} width="3.2" className="aecm-draw" />
      {[
        [0.9, 'gm high', GREEN],
        [0.6, 'gm medium', BIAS],
        [0.3, 'gm low', RED],
      ].map(([t, lab, tone], i) => {
        const x = 70 + t * 360
        const y = 360 - 250 * t * t
        const slope = (2 * 250 * t) / 360
        return (
          <g key={lab} className={`aecm-pop aecm-delay-${i}`}>
            <Dot cx={x.toFixed(1)} cy={y.toFixed(1)} r="6" fill={tone} />
            <Wire
              d={`M${(x - 60).toFixed(1)} ${(y + 60 * slope).toFixed(1)} L${(x + 50).toFixed(1)} ${(y - 50 * slope).toFixed(1)}`}
              stroke={tone}
              width="2.4"
            />
            <M x={(x + 58).toFixed(1)} y={(y - 50 * slope - 6).toFixed(1)} size={9.5} fill={tone} anchor="start" weight={800}>
              {lab}
            </M>
          </g>
        )
      })}
      <Card
        x="70"
        y="398"
        w="360"
        h="58"
        title="the transconductance"
        accent={GOLD}
        mono
        lines={['gm = gmo(1 − VGS/VP)']}
        linesY={48}
        className="aecm-slide-in aecm-delay-3"
      />

      <rect x="486" y="90" width="366" height="230" rx="12" fill={WHITE} stroke={COOL} strokeWidth="2.3" />
      <M x="669" y="116" size={11.5} fill={COOL} weight={800}>
        the small-signal model
      </M>
      <Wire d="M520 160 L560 160 M520 264 L560 264" stroke={N} width="2.2" />
      <M x="580" y="216" size={22} fill={GREEN} weight={800}>
        ∞
      </M>
      <M x="580" y="246" size={9} fill={GREEN}>
        open gate
      </M>
      <Src cx="700" cy="212" kind="i" tone={BIAS} dep r="24" />
      <M x="700" y="264" size={10.5} fill={BIAS} weight={800}>
        gm·vgs
      </M>
      <Res x="800" y="212" len="56" orient="v" label="rd" tone={MUTED} />
      <Wire d="M700 188 L700 160 L820 160 M700 236 L700 290 L820 290 M800 184 L800 160 M800 240 L800 290" stroke={N} width="2.2" />

      <g className="aecm-slide-in aecm-delay-4">
        <rect x="486" y="344" width="366" height="82" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="669" y="374" size={10.5} fill={N}>
          BJT: the base draws current, the gain is β
        </M>
        <M x="669" y="402" size={10.5} fill={N}>
          FET: the gate draws none, the gain is gm
        </M>
      </g>
    </Scene>
  )
}

export function CommonSourceStageScene() {
  return (
    <Scene caption="Lower gain than a bipolar stage, and an input impedance three decades higher">
      <rect x="40" y="66" width="330" height="290" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Fet cx="230" cy="168" kind="jfet" label="" tone={N} />
      <Res x="254" y="112" len="46" orient="v" label="RD" tone={N} />
      <Wire d="M254 126 L254 135 M254 89 L254 80 M254 210 L254 245" stroke={N} width="2.2" />
      <Res x="254" y="266" len="42" orient="v" label="RS" tone={MUTED} />
      <Wire d="M254 288 L254 316 L110 316" stroke={N} width="2.2" />
      <Gnd x="254" y="316" tone={N} />
      <Cap x="312" y="266" len="42" orient="v" label="" tone={ROSE} />
      <Wire d="M312 240 L312 246 M312 286 L312 316 L254 316 M254 240 L312 240" stroke={N} width="2.2" />
      <g className="aecm-pulse">
        <Res x="130" y="168" len="72" orient="v" label="RG" tone={GREEN} />
      </g>
      <Wire d="M190 168 L130 168 M130 132 L130 168 M130 204 L130 316" stroke={N} width="2.2" />
      <M x="130" y="368" size={10.5} fill={GREEN} weight={800}>
        Zi = RG, megohms
      </M>

      {[
        ['Zi = RG', GREEN],
        ['Av = −gm(RD ∥ RL)', BIAS],
        ['Zo = RD ∥ rd', COOL],
      ].map(([r, tone], i) => (
        <g key={r} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x="410" y={76 + i * 62} width="300" height="50" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.4" />
          <M x="560" y={107 + i * 62} size={12.5} fill={tone} weight={800}>
            {r}
          </M>
        </g>
      ))}

      <M x="560" y="290" size={10.5} fill={MUTED} weight={800}>
        against an equivalent bipolar stage
      </M>
      <Bars x="500" y="304" w="180" items={[['FET |Av|', 12, SIG], ['BJT |Av|', 180, MUTED]]} rowH={30} max={180} />
      <Bars x="500" y="376" w="180" items={[['FET Zi', 100, SIG], ['BJT Zi', 1.1, MUTED]]} rowH={30} max={100} />
      <M x="590" y="446" size={9.5} fill={MUTED}>
        MΩ and kΩ, on their own scales
      </M>

      <g className="aecm-slide-in aecm-delay-4">
        <rect x="740" y="290" width="112" height="112" rx="11" fill={WHITE} stroke={ROSE} strokeWidth="2.2" />
        <M x="796" y="314" size={9.5} fill={ROSE} weight={800}>
          unbypassed
        </M>
        <M x="796" y="348" size={10} fill={N}>
          Av =
        </M>
        <M x="796" y="370" size={10} fill={N}>
          −gmRD
        </M>
        <M x="796" y="390" size={10} fill={N}>
          / (1+gmRS)
        </M>
      </g>
    </Scene>
  )
}

export function FetThreeConfigsScene() {
  const cfg = [
    ['common source', 'Zi = RG', 'Av = −gm·RD', 'inverted', SIG, 0.9],
    ['common drain', 'Zi = RG', 'Av ≈ 1', 'in phase', GREEN, 0.92],
    ['common gate', 'Zi = 1/gm', 'Av = gm·RD', 'in phase', BIAS, 0.06],
  ]
  return (
    <Scene caption="The source follower is the standard FET buffer: megohms in, hundreds of ohms out">
      {cfg.map(([name, zi, av, ph, tone], i) => (
        <g key={name} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={30 + i * 286} y="62" width="266" height="264" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={30 + i * 286} y="62" width="266" height="28" rx="12" fill={tone} />
          <L x={163 + i * 286} y="82" size={11.5} fill={WHITE}>
            {name}
          </L>
          <Fet cx={150 + i * 286} cy="170" kind="jfet" label="" tone={N} />
          <Wire d={`M${174 + i * 286} 128 L${174 + i * 286} 110 L${256 + i * 286} 110 M${174 + i * 286} 212 L${174 + i * 286} 242 L${70 + i * 286} 242 M${110 + i * 286} 170 L${70 + i * 286} 170`} stroke={N} width="2.1" />
          <g className="aecm-pulse">
            <circle cx={(i === 2 ? 174 : 70) + i * 286} cy={i === 2 ? 242 : 170} r="9" fill="none" stroke={tone} strokeWidth="3" />
            <circle cx={(i === 1 ? 174 : 256) + i * 286} cy={i === 1 ? 242 : 110} r="9" fill="none" stroke={tone} strokeWidth="3" />
          </g>
          <M x={163 + i * 286} y="278" size={11} fill={tone} weight={800}>
            {zi}
          </M>
          <M x={163 + i * 286} y="298" size={10.5} fill={N}>
            {av}
          </M>
          <M x={163 + i * 286} y="316" size={9.5} fill={MUTED}>
            {ph}
          </M>
        </g>
      ))}
      <Wire d="M110 380 L820 380" stroke={MUTED} width="2" marker="url(#aecArr)" />
      <L x="810" y="412" size={11} fill={MUTED} weight={700} anchor="end">
        input impedance (log)
      </L>
      {cfg.map(([name, , , , tone, pos], i) => (
        <g key={`m${name}`} className={`aecm-pop aecm-delay-${i}`}>
          <Dot cx={(110 + 700 * pos).toFixed(1)} cy="380" r="8" fill={tone} />
          <M x={(110 + 700 * pos).toFixed(1)} y={i === 1 ? 348 : 362} size={9.5} fill={tone} weight={800}>
            {name.replace('common ', 'C')}
          </M>
        </g>
      ))}
      <M x="150" y="440" size={9.5} fill={MUTED} anchor="start">
        a few hundred Ω
      </M>
      <M x="800" y="440" size={9.5} fill={MUTED} anchor="end">
        megohms
      </M>
    </Scene>
  )
}

export function MosfetAnalysisFlowScene() {
  return (
    <Scene caption="Drain feedback forces VGS = VDS, which guarantees the device is in saturation">
      <rect x="40" y="66" width="286" height="290" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <Fet cx="200" cy="184" kind="emos" label="" tone={N} />
      <Res x="224" y="118" len="52" orient="v" label="RD" tone={N} />
      <Wire d="M224 142 L224 160 M224 92 L224 82 M224 226 L224 302 L110 302" stroke={N} width="2.2" />
      <Gnd x="224" y="302" tone={N} />
      <Res x="140" y="144" len="60" label="RG" tone={COOL} />
      <Wire d="M160 184 L110 184 M110 184 L110 144 M170 144 L224 144" stroke={COOL} width="2.6" />
      <g className="aecm-emerge">
        <rect x="62" y="316" width="242" height="30" rx="8" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.2" />
        <M x="183" y="337" size={11} fill={GREEN} weight={800}>
          IG = 0 ⇒ VGS = VDS
        </M>
      </g>
      <M x="183" y="380" size={10} fill={MUTED}>
        and VDS &gt; VGS − VT is exactly saturation
      </M>

      {[
        ['extract k from a datasheet point', SIG],
        ['solve the DC circuit', COOL],
        ['gm = 2k(VGS − VT)', GOLD],
        ['AC model and gain', GREEN],
      ].map(([t, tone], i) => (
        <g key={t} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x="356" y={80 + i * 84} width="270" height="58" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="491" y={115 + i * 84} size={11.5} fill={tone} weight={800}>
            {t}
          </M>
          {i < 3 ? (
            <Wire d={`M491 ${138 + i * 84} L491 ${160 + i * 84}`} stroke={MUTED} width="2.2" marker="url(#aecArrM)" />
          ) : null}
        </g>
      ))}

      <Axes x="670" y="360" w="180" h="250" xLabel="VGS" yLabel="ID" />
      <Wire d="M716 360 L716 130" stroke={ROSE} width="1.8" dash="5 4" />
      <M x="716" y="384" size={10} fill={ROSE} weight={800}>
        VT
      </M>
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const t = i / 40
          return [716 + t * 130, 360 - 230 * t * t]
        })}
        stroke={SIG}
        width="3"
        className="aecm-draw aecm-delay-3"
      />
      <g className="aecm-pop aecm-delay-4">
        <Dot cx="807" cy="247" r="7" fill={GOLD} />
        <Wire d="M770 300 L844 194" stroke={GOLD} width="2.2" />
        <M x="820" y="176" size={9.5} fill={GOLD} anchor="end" weight={800}>
          slope = gm
        </M>
      </g>
    </Scene>
  )
}

export function FetSwitchScene() {
  return (
    <Scene caption="In the ohmic region it is a resistor you can set; fully on it is a very small one">
      <rect x="40" y="66" width="280" height="270" rx="12" fill={WHITE} stroke={SIG} strokeWidth="2.3" />
      <M x="180" y="92" size={11} fill={SIG} weight={800}>
        the ohmic region, magnified
      </M>
      <Wire d="M76 300 L300 300" stroke={MUTED} width="1.8" marker="url(#aecArrM)" />
      <Wire d="M76 300 L76 116" stroke={MUTED} width="1.8" />
      {[
        [0.9, '200 Ω', GREEN],
        [0.55, '600 Ω', BIAS],
        [0.25, '2 kΩ', RED],
      ].map(([s, lab, tone], i) => (
        <g key={lab} className={`aecm-draw aecm-delay-${i}`}>
          <Wire d={`M76 300 L${(76 + 200).toFixed(1)} ${(300 - 170 * s).toFixed(1)}`} stroke={tone} width="2.6" />
          <M x="288" y={(300 - 170 * s + 4).toFixed(1)} size={9.5} fill={tone} anchor="end" weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <M x="180" y="322" size={9.5} fill={MUTED}>
        slope set by VGS
      </M>

      <rect x="344" y="66" width="230" height="270" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <M x="459" y="92" size={11} fill={GREEN} weight={800}>
        as a power switch
      </M>
      <Fet cx="440" cy="196" kind="emos" label="" tone={N} />
      <Res x="464" y="140" len="46" orient="v" label="load" tone={N} />
      <Wire d="M464 164 L464 176 M464 114 L464 104 M464 238 L464 296 L392 296" stroke={N} width="2.2" />
      <Gnd x="464" y="296" tone={N} />
      <g className="aecm-emerge">
        <rect x="362" y="248" width="194" height="60" rx="10" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="2.3" />
        <M x="459" y="272" size={10.5} fill={GREEN} weight={800}>
          RDS(on) = 20 mΩ
        </M>
        <M x="459" y="294" size={10.5} fill={N} weight={800}>
          10 A ⇒ only 2 W
        </M>
      </g>

      <rect x="598" y="66" width="254" height="270" rx="12" fill={WHITE} stroke={COOL} strokeWidth="2.3" />
      <M x="725" y="92" size={11} fill={COOL} weight={800}>
        paralleling
      </M>
      <Fet cx="670" cy="176" kind="emos" label="" tone={N} />
      <Fet cx="790" cy="176" kind="emos" label="" tone={N} />
      <Wire d="M694 134 L694 118 L814 118 M694 218 L694 240 L814 240 M814 134 L814 118 M814 218 L814 240" stroke={N} width="2" />
      <g className="aecm-pulse">
        <circle cx="790" cy="130" r="11" fill={RED} fillOpacity="0.3" stroke={RED} strokeWidth="2.2" />
      </g>
      <Wire d="M814 176 L784 176" stroke={RED} width="2.4" marker="url(#aecArrR)" />
      <M x="725" y="270" size={9.5} fill={GREEN} weight={800}>
        hotter ⇒ less current
      </M>
      <M x="725" y="290" size={9.5} fill={GREEN} weight={800}>
        they share automatically
      </M>
      <M x="725" y="316" size={9} fill={RED}>
        a BJT pair does the opposite
      </M>

      <g className="aecm-slide-in aecm-delay-4">
        <rect x="140" y="366" width="620" height="60" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="450" y="392" size={11.5} fill={GOLD} weight={800}>
          negative temperature coefficient on RDS(on)
        </M>
        <M x="450" y="412" size={10} fill={MUTED}>
          which is why every power stage since the 1980s uses MOSFETs
        </M>
      </g>
    </Scene>
  )
}

export function DeviceSelectionScene() {
  const rows = [
    ['high source impedance', '✗ loads it', '✓ MΩ input', false],
    ['maximum gain per stage', '✓ β is large', '✗ gm is small', true],
    ['power switching', '✗ current hogging', '✓ shares, low RDS(on)', false],
    ['low noise, low source R', '✓ lower rbb noise', '✗', true],
    ['low noise, high source R', '✗ base current noise', '✓ no gate current', false],
  ]
  return (
    <Scene caption="The question is never which device is better — it is which one this stage needs">
      <rect x="40" y="62" width="790" height="28" rx="8" fill={N} />
      {['requirement', 'BJT', 'FET'].map((h, i) => (
        <M key={h} x={180 + i * 260} y="82" size={10.5} fill={WHITE} weight={800}>
          {h}
        </M>
      ))}
      {rows.map(([req, a, b, bjtWins], i) => (
        <g key={req} className={`aecm-cell-in aecm-delay-${i % 5}`}>
          <rect x="40" y={98 + i * 40} width="790" height="34" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="1.7" />
          <M x="180" y={120 + i * 40} size={10.5} fill={N}>
            {req}
          </M>
          {bjtWins ? <rect x="340" y={101 + i * 40} width="180" height="28" rx="6" fill={GREEN} fillOpacity="0.14" /> : null}
          {!bjtWins ? <rect x="600" y={101 + i * 40} width="180" height="28" rx="6" fill={GREEN} fillOpacity="0.14" /> : null}
          <M x="430" y={120 + i * 40} size={10} fill={bjtWins ? GREEN : MUTED} weight={bjtWins ? 800 : 700}>
            {a}
          </M>
          <M x="690" y={120 + i * 40} size={10} fill={bjtWins ? MUTED : GREEN} weight={bjtWins ? 700 : 800}>
            {b}
          </M>
        </g>
      ))}

      {[
        ['FET input', 'high source impedance', SIG],
        ['BJT gain stages', 'gain per stage', BIAS],
        ['MOSFET output', 'power switching', GREEN],
      ].map(([name, why, tone], i) => (
        <g key={name} className={`aecm-cell-in aecm-delay-${i}`}>
          <Block x={100 + i * 250} y={324} w={200} h={62} label={name} stroke={tone} />
          <M x={200 + i * 250} y="404" size={9.5} fill={tone} weight={800}>
            {why}
          </M>
          {i < 2 ? (
            <Wire d={`M${300 + i * 250} 355 L${350 + i * 250} 355`} stroke={MUTED} width="2.4" marker="url(#aecArrM)" />
          ) : null}
        </g>
      ))}
      <M x="450" y="446" size={10.5} fill={MUTED} weight={800}>
        one signal chain, three different answers
      </M>
    </Scene>
  )
}

export function FetStageCompleteScene() {
  const panels = [
    ['DC circuit', 'quadratic, not linear', SIG],
    ['gm from the Q-point', 'gm, not re', ROSE],
    ['AC circuit', 'open gate, not βre', COOL],
    ['gain and impedances', 'same', GREEN],
    ['Bode sketch', 'same', BIAS],
  ]
  return (
    <Scene caption="The method is the same as the bipolar stage; only two of the five boxes changed">
      {panels.map(([title, , tone], i) => (
        <g key={title} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={26 + i * 172} y="72" width="154" height="156" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={26 + i * 172} y="72" width="154" height="26" rx="12" fill={tone} />
          <M x={103 + i * 172} y="90" size={9.5} fill={WHITE} weight={800}>
            {title}
          </M>
          <Fet cx={96 + i * 172} cy="162" kind="jfet" label="" tone={i < 3 ? tone : MUTED} />
          {i < 4 ? (
            <Wire d={`M${180 + i * 172} 150 L${198 + i * 172} 150`} stroke={MUTED} width="2.2" marker="url(#aecArrM)" />
          ) : null}
        </g>
      ))}
      {panels.map(([title, diff], i) => (
        <g key={`d${title}`} className={`aecm-cell-in aecm-delay-${i}`}>
          <rect x={26 + i * 172} y="244" width="154" height="92" rx="11" fill={MUTED} fillOpacity="0.1" stroke={MUTED} strokeWidth="1.8" />
          <Bjt cx={96 + i * 172} cy="284" kind="npn" label="" tone={MUTED} ring={false} />
          <M x={103 + i * 172} y="324" size={9} fill={MUTED}>
            bipolar version
          </M>
          <rect
            x={26 + i * 172}
            y="348"
            width="154"
            height="30"
            rx="8"
            fill={diff === 'same' ? GREEN : ROSE}
            fillOpacity="0.14"
            stroke={diff === 'same' ? GREEN : ROSE}
            strokeWidth="2"
          />
          <M x={103 + i * 172} y="368" size={9} fill={diff === 'same' ? GREEN : ROSE} weight={800}>
            {diff}
          </M>
        </g>
      ))}
      <g className="aecm-emerge">
        <rect x="120" y="402" width="660" height="50" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.4" />
        <M x="450" y="432" size={13} fill={GOLD} weight={800}>
          the method is the same; only two boxes changed
        </M>
      </g>
    </Scene>
  )
}

export function FetDesignBackwardsScene() {
  const steps = [
    ['required gain', SIG],
    ['required gm = |Av|/RD', COOL],
    ['required ID from gm', GOLD],
    ['bias resistors from the square law', GREEN],
  ]
  return (
    <Scene caption="Work right to left: the specification is the starting point, not the answer">
      {steps.map(([t, tone], i) => {
        const x = 600 - i * 148
        return (
          <g key={t} className={`aecm-cell-in aecm-delay-${i}`}>
            <rect x={x - 66} y="104" width="140" height="104" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
            <foreignObject x={x - 56} y="118" width="120" height="76">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '750 11px/1.25 system-ui,sans-serif', color: '#241b2e', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center', textAlign: 'center' }}>
                {t}
              </div>
            </foreignObject>
            {i < 3 ? (
              <Wire d={`M${x - 74} 156 L${x - 90} 156`} stroke={MUTED} width="2.4" marker="url(#aecArrM)" />
            ) : null}
          </g>
        )
      })}
      <g className="aecm-feedback">
        <Wire d="M170 208 L170 254 L674 254 L674 208" stroke={ROSE} width="2.4" dash="6 5" marker="url(#aecArrRo)" />
      </g>
      <M x="422" y="276" size={10.5} fill={ROSE} weight={800}>
        check at IDSS min and IDSS max
      </M>

      <Axes x="300" y="450" w="300" h="140" xLabel="VGS" yLabel="ID" />
      <rect x="300" y="352" width="300" height="52" fill={GREEN} fillOpacity="0.14" className="aecm-fade-in aecm-delay-3" />
      <Curve pts={shockleyPts(300, 300, 450, 140)} stroke={SIG} width="2.8" className="aecm-draw aecm-delay-3" />
      <g className="aecm-pop aecm-delay-4">
        <Dot cx="480" cy="399" r="8" fill={GOLD} />
      </g>
      <M x="640" y="372" size={10} fill={GREEN} anchor="start" weight={800}>
        between ¼ and ½ IDSS
      </M>
      <M x="640" y="392" size={9.5} fill={MUTED} anchor="start">
        the usual compromise
      </M>
    </Scene>
  )
}

/* ── Binding: Phase-1 `visual` id → the scene that realises it ──── */

const VISUAL_MAP = {
  // Module 1 — diodes, their circuits, and the BJT
  'doping-lattice-comparison': DopingLatticeScene,
  'junction-bias-states': JunctionBiasScene,
  'three-resistances-and-models': DiodeModelsScene,
  'reverse-recovery-waveform': ReverseRecoveryScene,
  'half-wave-waveforms': HalfWaveScene,
  'bridge-versus-centre-tap': BridgeVsCentreTapScene,
  'clipper-types-and-transfer': ClipperTypesScene,
  'clamper-level-shift': ClamperShiftScene,
  'zener-characteristic-and-regulator': ZenerRegulatorScene,
  'series-shunt-led-comparison': SeriesShuntLedScene,
  'bjt-carrier-flow': BjtCarrierFlowScene,
  'alpha-beta-sensitivity': AlphaBetaScene,
  'common-base-characteristics': CommonBaseScene,
  'common-emitter-output-family': CommonEmitterFamilyScene,
  'emitter-follower-impedance-transform': EmitterFollowerScene,
  'three-regions-map': ThreeRegionsScene,

  // Module 2 — biasing and small-signal analysis
  'q-point-swing-limits': QPointSwingScene,
  'load-line-construction': LoadLineConstructionScene,
  'fixed-bias-beta-spread': FixedBiasSpreadScene,
  'emitter-bias-feedback-loop': EmitterBiasLoopScene,
  'divider-bias-chain': DividerBiasChainScene,
  'exact-versus-approximate': ExactVsApproxScene,
  'collector-feedback-action': CollectorFeedbackScene,
  'bias-design-flow': BiasDesignFlowScene,
  'three-temperature-mechanisms': TemperatureMechanismsScene,
  'thermal-runaway-loop': ThermalRunawayScene,
  'stability-factor-comparison': StabilityFactorScene,
  'dc-and-ac-equivalents': DcAcEquivalentsScene,
  're-model-substitution': ReModelScene,
  'three-configurations-one-model': ThreeConfigsScene,
  'h-parameter-and-hybrid-pi': HybridPiScene,
  'bias-gain-tradeoff': BiasGainTradeoffScene,

  // Module 3 — gain, frequency response and multistage
  'source-loading-divider': SourceLoadingScene,
  'load-parallel-reduction': LoadParallelScene,
  'amplifier-two-port-chain': TwoPortChainScene,
  'decibel-conversion-ladder': DecibelLadderScene,
  'bode-plot-anatomy': BodeAnatomyScene,
  'coupling-capacitor-pole': CouplingPoleScene,
  'bypass-pole-and-shelf': BypassShelfScene,
  'miller-multiplication': MillerMultiplicationScene,
  'high-frequency-two-poles': HighFreqPolesScene,
  'gain-bandwidth-hyperbola': GainBandwidthScene,
  'complete-stage-analysis-chain': StageAnalysisChainScene,
  'cascade-gain-and-bandwidth': CascadeBandwidthScene,
  'cascode-miller-defeat': CascodeScene,
  'darlington-composite': DarlingtonScene,
  'configuration-selection-tree': ConfigSelectionScene,
  'full-bode-assembly': FullBodeAssemblyScene,

  // Module 4 — feedback, oscillators and power stages
  'feedback-block-diagram': FeedbackBlockScene,
  'four-topologies-matrix': FourTopologiesScene,
  'desensitivity-comparison': DesensitivityScene,
  'feedback-bandwidth-distortion': FeedbackBandwidthScene,
  'practical-feedback-examples': PracticalFeedbackScene,
  'phase-margin-bode': PhaseMarginScene,
  'barkhausen-two-conditions': BarkhausenScene,
  'phase-shift-ladder': PhaseShiftLadderScene,
  'wien-bridge-network': WienBridgeScene,
  'hartley-colpitts-pair': HartleyColpittsScene,
  'crystal-equivalent-and-stability': CrystalStabilityScene,
  'conduction-angle-classes': ConductionAngleScene,
  'class-a-two-arrangements': ClassATwoWaysScene,
  'crossover-distortion-waveform': CrossoverDistortionScene,
  'class-ab-and-c': ClassAbAndCScene,
  'power-stage-design-flow': PowerStageDesignScene,

  // Module 5 — field effect transistors
  'fet-versus-bjt-comparison': FetVsBjtScene,
  'jfet-channel-pinch': JfetChannelPinchScene,
  'jfet-characteristics-pair': JfetCharacteristicsScene,
  'mosfet-types-cross-sections': MosfetCrossSectionsScene,
  'four-mosfet-symbols': FourMosfetSymbolsScene,
  'fet-fixed-bias-spread': FetFixedBiasScene,
  'self-bias-graphical-solution': SelfBiasGraphicalScene,
  'fet-divider-bias-stability': FetDividerBiasScene,
  'gm-slope-and-model': GmSlopeScene,
  'common-source-stage': CommonSourceStageScene,
  'fet-three-configurations': FetThreeConfigsScene,
  'mosfet-analysis-flow': MosfetAnalysisFlowScene,
  'fet-switch-and-resistance': FetSwitchScene,
  'device-selection-matrix': DeviceSelectionScene,
  'fet-stage-complete-analysis': FetStageCompleteScene,
  'fet-design-backwards': FetDesignBackwardsScene,
}

/** Fallback for a unit whose `visual` id is not in the map: match on the words
 *  the topic and terms actually use. Narrow patterns first. */
function matchKeyword(blob) {
  if (/doping|intrinsic|lattice|n-?type|p-?type/.test(blob)) return DopingLatticeScene
  if (/depletion region|barrier potential|p-?n junction/.test(blob)) return JunctionBiasScene
  if (/reverse recovery|junction capacitance/.test(blob)) return ReverseRecoveryScene
  if (/half.?wave/.test(blob)) return HalfWaveScene
  if (/full.?wave|bridge|centre.?tap|center.?tap/.test(blob)) return BridgeVsCentreTapScene
  if (/clipper/.test(blob)) return ClipperTypesScene
  if (/clamper/.test(blob)) return ClamperShiftScene
  if (/zener|regulat/.test(blob)) return ZenerRegulatorScene
  if (/\bled\b|light emitting/.test(blob)) return SeriesShuntLedScene
  if (/diode model|equivalent circuit|resistance level/.test(blob)) return DiodeModelsScene
  if (/alpha|beta spread/.test(blob)) return AlphaBetaScene
  if (/common base/.test(blob)) return CommonBaseScene
  if (/common collector|emitter follower/.test(blob)) return EmitterFollowerScene
  if (/common emitter characteristic|early voltage/.test(blob)) return CommonEmitterFamilyScene
  if (/saturation|cut.?off|operating region/.test(blob)) return ThreeRegionsScene
  if (/transistor action|carrier flow|construction/.test(blob)) return BjtCarrierFlowScene
  if (/load line/.test(blob)) return LoadLineConstructionScene
  if (/fixed bias/.test(blob)) return FixedBiasSpreadScene
  if (/emitter bias/.test(blob)) return EmitterBiasLoopScene
  if (/divider bias|voltage.?divider/.test(blob)) return DividerBiasChainScene
  if (/collector feedback|voltage feedback bias/.test(blob)) return CollectorFeedbackScene
  if (/stability factor/.test(blob)) return StabilityFactorScene
  if (/thermal runaway/.test(blob)) return ThermalRunawayScene
  if (/temperature/.test(blob)) return TemperatureMechanismsScene
  if (/\bre model\b|re model/.test(blob)) return ReModelScene
  if (/hybrid|h.?parameter/.test(blob)) return HybridPiScene
  if (/q.?point|quiescent/.test(blob)) return QPointSwingScene
  if (/decibel|\bdb\b/.test(blob)) return DecibelLadderScene
  if (/miller/.test(blob)) return MillerMultiplicationScene
  if (/cascode/.test(blob)) return CascodeScene
  if (/darlington/.test(blob)) return DarlingtonScene
  if (/cascade|multistage/.test(blob)) return CascadeBandwidthScene
  if (/gain.?bandwidth|transition frequency/.test(blob)) return GainBandwidthScene
  if (/coupling capacitor/.test(blob)) return CouplingPoleScene
  if (/bypass/.test(blob)) return BypassShelfScene
  if (/high.?frequency/.test(blob)) return HighFreqPolesScene
  if (/bode|frequency response/.test(blob)) return BodeAnatomyScene
  if (/source resistance/.test(blob)) return SourceLoadingScene
  if (/load resistance/.test(blob)) return LoadParallelScene
  if (/barkhausen/.test(blob)) return BarkhausenScene
  if (/phase shift oscillator|rc phase/.test(blob)) return PhaseShiftLadderScene
  if (/wien/.test(blob)) return WienBridgeScene
  if (/hartley|colpitts|tuned oscillator/.test(blob)) return HartleyColpittsScene
  if (/crystal/.test(blob)) return CrystalStabilityScene
  if (/phase margin|gain margin/.test(blob)) return PhaseMarginScene
  if (/topolog/.test(blob)) return FourTopologiesScene
  if (/desensitiv/.test(blob)) return DesensitivityScene
  if (/feedback/.test(blob)) return FeedbackBlockScene
  if (/crossover/.test(blob)) return CrossoverDistortionScene
  if (/class ab|class c\b/.test(blob)) return ClassAbAndCScene
  if (/class a\b|transformer.?coupled/.test(blob)) return ClassATwoWaysScene
  if (/conduction angle|power amplifier class/.test(blob)) return ConductionAngleScene
  if (/heat sink|power stage/.test(blob)) return PowerStageDesignScene
  if (/jfet.*pinch|pinch.?off/.test(blob)) return JfetChannelPinchScene
  if (/shockley|transfer characteristic/.test(blob)) return JfetCharacteristicsScene
  if (/mosfet symbol|enhancement|depletion type/.test(blob)) return FourMosfetSymbolsScene
  if (/transconductance|\bgm\b/.test(blob)) return GmSlopeScene
  if (/common source/.test(blob)) return CommonSourceStageScene
  if (/common drain|common gate|source follower/.test(blob)) return FetThreeConfigsScene
  if (/switch|rds/.test(blob)) return FetSwitchScene
  if (/mosfet/.test(blob)) return MosfetCrossSectionsScene
  if (/\bfet\b|field effect/.test(blob)) return FetVsBjtScene
  if (/\bbjt\b|bipolar/.test(blob)) return FetVsBjtScene
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
      <rect x="56" y="54" width="788" height={62 + shift} rx="12" fill={SKY} stroke={SIG} strokeWidth="2.4" />
      <L x="92" y="80" size={12.5} fill={SIG} anchor="start">
        GIVEN
      </L>
      <foreignObject x="92" y="82" width="716" height={30 + shift}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#241b2e' }}>
          {dryRun?.input || '—'}
        </div>
      </foreignObject>
      {steps.map((st, i) => (
        <g key={String(st)} className={`aecm-slide-in aecm-delay-${i}`}>
          <rect x="56" y={130 + shift + i * pitch} width="788" height={stepH} rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="90" cy={130 + shift + i * pitch + stepH / 2} r="13" fill={BIAS} />
          <L x="90" y={136 + shift + i * pitch + stepH / 2} size={13} fill={WHITE}>
            {i + 1}
          </L>
          <foreignObject x="114" y={138 + shift + i * pitch} width="716" height={stepH - 14}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#241b2e', display: 'flex', alignItems: 'center', height: '100%' }}
            >
              {String(st)}
            </div>
          </foreignObject>
        </g>
      ))}
      <g className="aecm-emerge">
        <rect x="56" y={top} width="788" height={resultH} rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <L x="92" y={top + 24} size={12.5} fill={GREEN} anchor="start">
          RESULT
        </L>
        <foreignObject x="92" y={top + 26} width="716" height={resultH - 30}>
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '750 13px/1.2 system-ui,sans-serif', color: '#059669' }}>
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

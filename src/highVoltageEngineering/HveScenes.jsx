/**
 * HveScenes — VTU BEE515A High Voltage Engineering classroom SVG visuals.
 *
 * Every scene animates something the syllabus asks students to reproduce with
 * a pencil: an electron avalanche multiplying across a gap, a Paschen curve
 * bending back up at low pd, a Marx generator firing stage by stage, a sphere
 * gap sparking at its measured breakdown voltage. Motion carries meaning —
 * nothing here moves purely for decoration.
 *
 * Phase 1 wrote one `visualSpec` paragraph per unit; VISUAL_MAP at the end of
 * this file binds each of the 74 `visual` ids to the scene that realises it.
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
    <div className={`hve-scene ${className}`} aria-label={caption || 'High Voltage Engineering diagram'}>
      <svg viewBox={vb} role="img" className="hve-svg">
        <defs>
          <marker id="hveArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="hveArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="hveArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="hveArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="hveArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="hveArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="hveArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="hveArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="hveArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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
  if (tone === BLUE) return 'hveArrB'
  if (tone === AMBER) return 'hveArrA'
  if (tone === ROSE) return 'hveArrRo'
  if (tone === GREEN) return 'hveArrG'
  if (tone === PURP) return 'hveArrP'
  if (tone === TEAL) return 'hveArrT'
  if (tone === RED) return 'hveArrR'
  if (tone === MUTED) return 'hveArrM'
  return 'hveArr'
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
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#hveArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#hveArr)" />
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
      <path d={`M${half ? C : C - R} ${Y} L${C + R + 8} ${Y}`} stroke={tone} strokeWidth="2.2" markerEnd="url(#hveArr)" fill="none" />
      <path d={`M${C} ${Y + R} L${C} ${Y - R - 8}`} stroke={tone} strokeWidth="2.2" markerEnd="url(#hveArr)" fill="none" />
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
function Bars({ x, y, w, items = [], accent = BLUE, rowH = 34, className = 'hvem-bar', max }) {
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
          <g className={`${className} hvem-delay-${i % 5}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
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
  const beats = ['Break', 'Generate', 'Measure', 'Protect', 'Test']
  return (
    <Scene caption={question || 'Insulation holds, and then at a threshold it fails catastrophically'}>
      <rect x="40" y="36" width="820" height="410" rx="16" fill={WHITE} stroke={BLUE} strokeWidth="3" />
      <L x="450" y="104" size={18} fill={BLUE}>{`MODULE ${module} · VTU BEE515A`}</L>
      <L x="450" y="162" size={25}>
        {title || `Module ${module}`}
      </L>
      <L x="450" y="208" size={14.5} fill={MUTED} weight={700}>
        {question || 'What happens in the instant insulation stops insulating'}
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
          className={`hvem-flux hvem-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`hvem-current hvem-delay-${i}`}
          marker="url(#hveArrB)"
        />
      ))}
      {hours ? <L x="450" y="396" size={14} fill={MUTED} weight={700}>{`${hours} teaching hours`}</L> : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Redraw the mechanism from memory — then name the threshold before quoting a number">
      <L x="450" y="86" size={19} fill={BLUE}>{`MODULE ${module} COMPLETE`}</L>
      <L x="450" y="140" size={24}>
        {title || 'Module complete'}
      </L>
      {['Draw and label the apparatus', 'Name the breakdown mechanism', 'State the threshold, not a slope', 'Mark every field line direction', 'Check the units on the answer'].map((t, i) => (
        <g key={t} className={`hvem-cell-in hvem-delay-${i}`}>
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
        <g key={String(p)} className={`hvem-cell-in hvem-delay-${i % 5}`}>
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

/* ── HVE-specific primitives ────────────────────────────────────── */

/** Point/sphere/plane electrode with radiating field lines, crowding severity
 *  set by `crowd` (0 = uniform, 1 = severe). Used by every gap-geometry scene. */
function Electrode({ x, y, shape = 'plate', crowd = 0, tone = BLUE, label }) {
  const [X, Y] = [n(x), n(y)]
  const lineCount = 5
  const lines = []
  for (let i = 0; i < lineCount; i += 1) {
    const spread = -60 + (i * 120) / (lineCount - 1)
    const bend = crowd * spread * 0.35
    lines.push(
      <path
        key={i}
        d={`M${X} ${Y} Q${X + bend} ${Y + 55} ${X + spread} ${Y + 110}`}
        fill="none"
        stroke={tone}
        strokeWidth={2 - crowd * 0.6}
        opacity={0.55 + crowd * 0.15}
        markerEnd={`url(#${markerFor(tone)})`}
      />,
    )
  }
  return (
    <g>
      {shape === 'plate' ? <rect x={X - 60} y={Y - 10} width="120" height="10" rx="3" fill={tone} /> : null}
      {shape === 'sphere' ? <circle cx={X} cy={Y} r="16" fill={tone} /> : null}
      {shape === 'point' ? <path d={`M${X - 5} ${Y - 20} L${X + 5} ${Y - 20} L${X} ${Y} Z`} fill={tone} /> : null}
      {lines}
      {label ? <L x={X} y={Y - 26} size={12} fill={tone} weight={800}>{label}</L> : null}
    </g>
  )
}

/** One free electron with a short motion trail — the avalanche unit. */
function Electron({ cx, cy, className = '', tone = BLUE }) {
  return <circle cx={n(cx)} cy={n(cy)} r="5" fill={tone} className={className} />
}

/* ── Module 1 — Conduction and Breakdown in Dielectrics ─────────── */

export function FieldStressScene() {
  const geoms = [
    { shape: 'plate', crowd: 0, eta: '1.0', peak: 40 },
    { shape: 'sphere', crowd: 0.5, eta: '0.7', peak: 90 },
    { shape: 'point', crowd: 1, eta: '0.1', peak: 160 },
  ]
  return (
    <Scene caption="Same voltage, same gap — peak stress decided entirely by electrode shape">
      {geoms.map((g, i) => {
        const cx = 180 + i * 280
        return (
          <g key={g.shape} className={`hvem-cell-in hvem-delay-${i}`}>
            <rect x={cx - 90} y="50" width="180" height="150" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
            <Electrode x={cx} y="70" shape={g.shape} crowd={g.crowd} tone={i === 2 ? ROSE : BLUE} />
            <rect x={cx - 60} y="182" width="120" height="8" fill={N} />
            <L x={cx} y="222" size={13} weight={800}>{g.shape === 'plate' ? 'parallel plates' : g.shape === 'sphere' ? 'sphere–plane' : 'point–plane'}</L>
            {/* Baselined at 380 rather than 310: the tallest bar used to rise
                to y=150 and paint straight over the caption row at y=222. */}
            <rect x={cx - 18} y={380 - g.peak * 0.875} width="36" height={g.peak * 0.875} rx="4" fill={i === 2 ? ROSE : BLUE} className="hvem-flux" />
            <M x={cx} y="400" size={12} fill={MUTED}>η = {g.eta}</M>
            <M x={cx} y="416" size={11} fill={MUTED}>peak stress</M>
          </g>
        )
      })}
      <L x="450" y="462" size={13} fill={MUTED} weight={700}>Design against E_max, never against E_av</L>
    </Scene>
  )
}

export function DielectricComparisonScene() {
  const cols = [
    { label: 'Gas', strength: 30, heal: true, cool: false, support: false },
    { label: 'Liquid', strength: 60, heal: false, cool: true, support: false },
    { label: 'Solid', strength: 150, heal: false, cool: false, support: true },
    { label: 'Composite', strength: 90, heal: false, cool: true, support: true },
  ]
  return (
    <Scene caption="Composite fails at the interface — the weak layer takes the higher stress">
      {cols.map((c, i) => {
        const cx = 130 + i * 165
        return (
          <g key={c.label} className={`hvem-cell-in hvem-delay-${i}`}>
            <L x={cx} y="60" size={14}>{c.label}</L>
            <rect x={cx - 22} y={330 - c.strength} width="44" height={c.strength} rx="5" fill={c.label === 'Composite' ? ROSE : BLUE} />
            <M x={cx} y="346" size={11} fill={MUTED}>strength</M>
            {[['heal', c.heal], ['cool', c.cool], ['support', c.support]].map(([k, v], j) => (
              <M key={k} x={cx} y={380 + j * 20} size={11.5} fill={v ? GREEN : MUTED}>{v ? '✓' : '✗'} {k}</M>
            ))}
          </g>
        )
      })}
      <rect x="60" y="440" width="780" height="16" fill={SKY} />
      <rect x="440" y="440" width="10" height="16" fill={RED} className="hvem-flux" />
      <M x="450" y="470" size={12} fill={RED} weight={800}>interface — the weak point</M>
    </Scene>
  )
}

export function GasInsulationScene() {
  const air = [[80, 350], [220, 300], [360, 230], [500, 150], [620, 90]]
  const sf6 = [[80, 300], [220, 190], [360, 90], [500, 40], [620, 10]]
  return (
    <Scene caption="Strength rises with pressure; a gas gap recovers, a solid never does">
      <Axes x="70" y="380" w="580" h="330" xLabel="pressure" yLabel="strength" tickLabels={[[220, ''], [500, '']]} />
      <Curve pts={air} stroke={BLUE} />
      <Curve pts={sf6} stroke={PURP} />
      <M x="640" y="95" size={12} fill={PURP} anchor="start">SF6 (~2.5× air)</M>
      <M x="640" y="155" size={12} fill={BLUE} anchor="start">air</M>
      <g className="hvem-cell-in hvem-delay-2">
        <Card x="60" y="60" w="330" h="90" title="Gas gap after flashover" lines={['arc extinguishes', 'gap recovers full strength']} accent={GREEN} />
      </g>
      <g className="hvem-cell-in hvem-delay-3">
        <Card x="410" y="60" w="330" h="90" title="Solid after breakdown" lines={['permanently punctured', 'never recovers']} accent={RED} />
      </g>
    </Scene>
  )
}

export function CollisionTypesScene() {
  const panels = [
    { label: 'Elastic', drop: 6, note: 'direction changes, energy ~ 0' },
    { label: 'Excitation', drop: 40, note: 'molecule raised, glows' },
    { label: 'Ionisation', drop: 70, note: 'second electron freed' },
  ]
  return (
    <Scene caption="Only the ionising collision multiplies the carrier population">
      {panels.map((p, i) => {
        const cx = 160 + i * 260
        return (
          <g key={p.label} className={`hvem-cell-in hvem-delay-${i}`}>
            <L x={cx} y="60" size={14}>{p.label}</L>
            <Electron cx={cx - 80} cy="120" className="hvem-flux" />
            <circle cx={cx} cy="120" r="14" fill={i === 2 ? AMBER : SKY} stroke={MUTED} strokeWidth="1.6" />
            {i === 2 ? <Electron cx={cx + 40} cy="150" tone={ROSE} className="hvem-flux" /> : null}
            <rect x={cx - 16} y={220} width="32" height="90" fill={SKY} />
            <rect x={cx - 16} y={310 - p.drop} width="32" height={p.drop} fill={BLUE} />
            <M x={cx} y="330" size={11} fill={MUTED}>{p.note}</M>
            {i === 2 ? <M x={cx} y="346" size={12} fill={ROSE} weight={800}>count: 1 → 2</M> : null}
          </g>
        )
      })}
    </Scene>
  )
}

export function MobilityContrastScene() {
  return (
    <Scene caption="Electrons cross in nanoseconds; ions are frozen on that timescale">
      <path d="M100 100 L100 260" stroke={N} strokeWidth="4" />
      <path d="M760 100 L760 260" stroke={N} strokeWidth="4" />
      <Electron cx="120" cy="150" className="hvem-current" tone={BLUE} />
      <Electron cx="120" cy="200" className="hvem-current" tone={BLUE} />
      <Dot cx="130" cy="175" r="6" fill={ROSE} className="hvem-flux" />
      <M x="430" y="90" size={12} fill={BLUE}>electrons: ~67 ns transit</M>
      <M x="430" y="285" size={12} fill={ROSE}>ions: ~17 µs transit</M>
      <Bars x="120" y="330" w="560" items={[['electron mobility', 500, BLUE], ['ion mobility', 2, ROSE]]} />
      <L x="450" y="420" size={12.5} fill={MUTED} weight={700}>ratio ≈ 250 — ions act as a fixed space charge</L>
    </Scene>
  )
}

export function AvalancheGrowthScene() {
  const stages = [1, 2, 4, 8]
  return (
    <Scene caption="One electron becomes two becomes four — alpha counts ionisations per cm">
      {stages.map((count, i) => {
        const x = 120 + i * 170
        return (
          <g key={i} className={`hvem-cell-in hvem-delay-${i}`}>
            {Array.from({ length: count }).map((_, j) => (
              <Electron key={j} cx={x} cy={120 + (j - (count - 1) / 2) * 18} tone={BLUE} />
            ))}
            <M x={x} y="200" size={12} fill={MUTED}>n = {count}</M>
          </g>
        )
      })}
      <Axes x="90" y="380" w="660" h="140" xLabel="distance" yLabel="log(n)" />
      <Curve pts={[[100, 370], [300, 320], [500, 250], [700, 150]]} stroke={AMBER} />
      <M x="620" y="270" size={12} fill={AMBER}>slope = α</M>
    </Scene>
  )
}

export function TownsendCurrentGrowthScene() {
  return (
    <Scene caption="Log current against gap is a straight line — its slope is alpha">
      <g className="hvem-cell-in hvem-delay-0">
        <Card x="50" y="50" w="360" h="150" title="UV-illuminated cathode" lines={['variable supply', 'sensitive ammeter']} accent={BLUE} />
      </g>
      <Axes x="470" y="200" w="330" h="150" xLabel="V" yLabel="I" />
      <Curve pts={[[480, 200], [560, 195], [620, 150], [680, 60], [750, 20]]} stroke={BLUE} />
      <M x="700" y="180" size={11} fill={MUTED}>saturation</M>
      <Axes x="470" y="420" w="330" h="150" xLabel="gap d" yLabel="ln(I)" />
      <Curve pts={[[480, 420], [780, 300]]} stroke={AMBER} />
      <M x="640" y="330" size={12} fill={AMBER}>slope = α, intercept = ln(I₀)</M>
    </Scene>
  )
}

export function SecondaryProcessScene() {
  return (
    <Scene caption="Gamma closes the loop — positive ions bombard the cathode and regenerate electrons">
      <path d="M150 260 L650 260" stroke={BLUE} strokeWidth="3" markerEnd="url(#hveArrB)" className="hvem-current" />
      <L x="400" y="240" size={13} fill={BLUE}>avalanche →</L>
      <path d="M650 280 Q400 380 150 280" stroke={ROSE} strokeWidth="2.6" fill="none" markerEnd="url(#hveArrRo)" className="hvem-flux" />
      <L x="400" y="400" size={13} fill={ROSE}>ions drift back →</L>
      <Electron cx="150" cy="260" tone={BLUE} />
      <circle cx="650" cy="260" r="7" fill={ROSE} />
      <Panel x="300" y="60" w="300" title="Modified current growth" rows={[['I₀·exp(αd)', ''], ['÷ [1 − γ(exp(αd) − 1)]', 'denom → 0 = breakdown']]} accent={AMBER} />
    </Scene>
  )
}

export function TownsendCriterionScene() {
  const cases = [
    { label: 'gain < 1', trend: 'decays', tone: GREEN },
    { label: 'gain = 1', trend: 'self-sustains', tone: AMBER },
    { label: 'gain > 1', trend: 'runaway', tone: ROSE },
  ]
  return (
    <Scene caption="Each avalanche must launch exactly one successor — unity loop gain is breakdown">
      {cases.map((c, i) => {
        const cx = 160 + i * 260
        return (
          <g key={c.label} className={`hvem-cell-in hvem-delay-${i}`}>
            <L x={cx} y="60" size={14} fill={c.tone}>{c.label}</L>
            {[0, 1, 2].map((k) => (
              <circle key={k} cx={cx - 40 + k * 40} cy="130" r={i === 0 ? 10 - k * 3 : i === 1 ? 8 : 6 + k * 5} fill={c.tone} opacity={0.8 - k * 0.15} />
            ))}
            <Axes x={cx - 90} y="280" w="180" h="100" />
            <Curve
              pts={
                i === 0
                  ? [[cx - 90, 300], [cx, 340], [cx + 90, 355]]
                  : i === 1
                  ? [[cx - 90, 320], [cx, 320], [cx + 90, 320]]
                  : [[cx - 90, 320], [cx, 260], [cx + 90, 190]]
              }
              stroke={c.tone}
            />
            <M x={cx} y="310" size={11} fill={c.tone}>{c.trend}</M>
          </g>
        )
      })}
      <L x="450" y="420" size={13} fill={MUTED} weight={700}>γ[exp(αd) − 1] = 1</L>
    </Scene>
  )
}

export function AttachmentScene() {
  return (
    <Scene caption="Attachment eats electrons out of the avalanche — SF6 exploits it">
      {[0, 1].map((row) => {
        const y = 100 + row * 150
        const gas = row === 0 ? 'air' : 'SF6'
        const tone = row === 0 ? BLUE : PURP
        return (
          <g key={gas}>
            <L x="90" y={y - 20} size={13} fill={tone} anchor="start">{gas}</L>
            {Array.from({ length: 6 }).map((_, i) => (
              <Electron
                key={i}
                cx={150 + i * 100}
                cy={row === 1 && i > 2 ? y + (i % 2 ? 20 : -20) : y}
                tone={row === 1 && i > 3 ? ROSE : tone}
                className="hvem-flux"
              />
            ))}
          </g>
        )
      })}
      <Bars x="120" y="330" w="560" items={[['α (air)', 30, BLUE], ['α − η (air)', 30, GREEN], ['α (SF6)', 30, PURP], ['α − η (SF6)', -15, ROSE]]} max={30} />
    </Scene>
  )
}

export function TimeLagsScene() {
  return (
    <Scene caption="Waiting for the first electron is random — that lets a gap survive a short impulse">
      <path d="M80 150 L780 150" stroke={MUTED} strokeWidth="2" />
      <rect x="120" y="130" width="220" height="40" rx="6" fill={SKY} className="hvem-cell-in hvem-delay-0" />
      <M x="230" y="120" size={12} fill={MUTED}>statistical lag (scatters)</M>
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M120 ${140 + i * 4} L${300 + i * 40} ${140 + i * 4}`} stroke={MUTED} strokeWidth="1" opacity="0.4" strokeDasharray="3 5" />
      ))}
      <rect x="340" y="130" width="90" height="40" rx="6" fill={AMBER} opacity="0.3" className="hvem-cell-in hvem-delay-1" />
      <M x="385" y="120" size={12} fill={AMBER}>formative lag</M>
      <Dot cx="430" cy="150" r="8" fill={ROSE} className="hvem-flux" />
      <Axes x="90" y="380" w="660" h="150" xLabel="time to breakdown" yLabel="V" />
      <Curve pts={[[100, 260], [300, 320], [500, 370], [700, 400]]} stroke={BLUE} />
      <M x="200" y="240" size={12} fill={BLUE}>impulse ratio &gt; 1</M>
    </Scene>
  )
}

export function PaschenCurveScene() {
  const pts = [[100, 200], [200, 300], [300, 360], [370, 380], [440, 360], [560, 260], [700, 130]]
  return (
    <Scene caption="Only pd matters — the curve has a minimum, and partial vacuum is the worst case">
      <Axes x="80" y="400" w="660" h="330" xLabel="p·d (log)" yLabel="V breakdown" />
      <Curve pts={pts} stroke={BLUE} width="3.2" />
      <Dot cx="370" cy="380" r="7" fill={ROSE} />
      <M x="370" y="350" size={11.5} fill={ROSE}>minimum, few hundred V</M>
      <M x="150" y="180" size={11.5} fill={MUTED} anchor="start">too few molecules</M>
      <M x="500" y="220" size={11.5} fill={MUTED} anchor="start">collisions too frequent</M>
      <g className="hvem-cell-in hvem-delay-2">
        <Card x="560" y="60" w="220" h="90" title="Similarity" lines={['1 atm × 1 mm', '= 0.5 atm × 2 mm']} accent={TEAL} />
      </g>
    </Scene>
  )
}

export function CoronaScene() {
  return (
    <Scene caption="A partial discharge confined near the conductor — never bridges the gap">
      <circle cx="200" cy="150" r="18" fill={N} />
      <circle cx="200" cy="150" r="30" fill={AMBER} opacity="0.35" className="hvem-flux" />
      <circle cx="200" cy="150" r="42" fill={AMBER} opacity="0.15" className="hvem-flux" />
      <path d="M100 300 L780 300" stroke={MUTED} strokeWidth="3" />
      <Axes x="450" y="120" w="300" h="100" xLabel="distance" yLabel="field" />
      <Curve pts={[[460, 40], [520, 120], [620, 200], [740, 210]]} stroke={ROSE} />
      <path d="M460 100 L740 100" stroke={MUTED} strokeWidth="1.4" strokeDasharray="4 5" />
      <M x="750" y="95" size={10.5} fill={MUTED} anchor="end">air strength</M>
      <Card x="80" y="360" w="700" h="120" title="Consequences" lines={['power loss · audible hiss · radio interference · ozone']} accent={AMBER} />
    </Scene>
  )
}

export function LiquidPurificationScene() {
  const stages = ['Filtration', 'Vacuum drying', 'Degassing']
  const bars = [25, 40, 60, 70]
  return (
    <Scene caption="Purity dominates liquid strength — particles, moisture and gas each need removal">
      {stages.map((s, i) => (
        <g key={s} className={`hvem-cell-in hvem-delay-${i}`}>
          <Block x={70 + i * 250} y="60" w="220" h="60" label={s} stroke={BLUE} />
        </g>
      ))}
      <Bars x="120" y="180" w="560" items={bars.map((v, i) => [['start', 'stage 1', 'stage 2', 'final'][i], v, i === 3 ? GREEN : BLUE])} max={70} />
      <path d="M700 220 Q760 280 700 330" stroke={RED} strokeWidth="2.4" fill="none" markerEnd="url(#hveArrR)" />
      <M x="770" y="280" size={11} fill={RED}>service contamination</M>
    </Scene>
  )
}

export function LiquidBreakdownScene() {
  return (
    <Scene caption="Particles bridge, bubbles fail first, bigger stressed volumes hide more weak spots">
      <g className="hvem-cell-in hvem-delay-0">
        <L x="150" y="60" size={13}>Suspended particle</L>
        {[0, 1, 2, 3].map((i) => <Dot key={i} cx={90 + i * 40} cy="120" r="5" fill={AMBER} />)}
        <path d="M90 120 L230 120" stroke={AMBER} strokeWidth="1.4" strokeDasharray="2 4" />
      </g>
      <g className="hvem-cell-in hvem-delay-1">
        <L x="450" y="60" size={13}>Bubble</L>
        <ellipse cx="450" cy="130" rx="14" ry="34" fill="none" stroke={TEAL} strokeWidth="2.4" />
        <Dot cx="450" cy="130" r="4" fill={ROSE} className="hvem-flux" />
      </g>
      <g className="hvem-cell-in hvem-delay-2">
        <L x="720" y="60" size={13}>Stressed volume</L>
        <rect x="660" y="90" width="60" height="90" fill={SKY} />
        <rect x="760" y="70" width="90" height="130" fill={SKY} />
        <Dot cx="800" cy="160" r="6" fill={ROSE} />
      </g>
      <Axes x="80" y="400" w="660" h="200" xLabel="stressed volume" yLabel="strength" />
      <Curve pts={[[100, 260], [400, 330], [700, 390]]} stroke={BLUE} />
    </Scene>
  )
}

export function SolidBreakdownScene() {
  const regions = [
    { label: 'Intrinsic', x: 100, w: 180, tone: GREEN },
    { label: 'Electromechanical', x: 280, w: 220, tone: AMBER },
    { label: 'Thermal', x: 500, w: 260, tone: ROSE },
  ]
  return (
    <Scene caption="Mechanism follows the timescale — microseconds give intrinsic, years give thermal">
      <path d="M80 300 L780 300" stroke={MUTED} strokeWidth="2" markerEnd="url(#hveArr)" />
      <M x="770" y="320" size={11} fill={MUTED} anchor="end">time (log)</M>
      {regions.map((r, i) => (
        <g key={r.label} className={`hvem-cell-in hvem-delay-${i}`}>
          <rect x={r.x} y="260" width={r.w} height="40" fill={r.tone} opacity="0.18" />
          <L x={r.x + r.w / 2} y="250" size={12} fill={r.tone}>{r.label}</L>
        </g>
      ))}
      <Curve pts={[[100, 100], [280, 150], [500, 230], [760, 280]]} stroke={N} width="3" />
      <M x="120" y="90" size={11} fill={N} anchor="start">highest strength</M>
    </Scene>
  )
}

/* ── Module 2 — Generation of High Voltages and Currents ─────────── */

export function HvdcSourceScene() {
  const stages = ['Mains', 'Transformer', 'Rectifier', 'Smoothing']
  return (
    <Scene caption="Voltage, current and ripple specified together — current sets the topology">
      {stages.map((s, i) => (
        <g key={s} className={`hvem-cell-in hvem-delay-${i}`}>
          <Block x={40 + i * 190} y="80" w="160" h="60" label={s} stroke={BLUE} />
          {i < 3 ? <Wire d={`M${200 + i * 190} 110 L${230 + i * 190} 110`} stroke={BLUE} marker="url(#hveArrB)" /> : null}
        </g>
      ))}
      <Card x="60" y="220" w="330" h="110" title="Leakage" lines={['milliamperes', 'clean output']} accent={GREEN} />
      <Card x="420" y="220" w="330" h="110" title="Flashover" lines={['large current', 'output collapses']} accent={RED} />
      {/* Sat at y=60 and covered the "Smoothing" block entirely — that stage
          spans x610-770 and the panel x620-800. Moved to the free band. */}
      <Panel x="620" y="348" w="180" title="Spec" rows={[['V', '200 kV'], ['I', '5 mA'], ['ripple', '<3%']]} accent={AMBER} />
    </Scene>
  )
}

export function HalfWaveHvdcScene() {
  return (
    <Scene caption="Output is the transformer peak — but the rectifier sees twice it">
      <Src cx="120" cy="150" kind="v" tone={BLUE} label="~" />
      <Wire d="M141 150 L220 150" stroke={N} marker="url(#hveArr)" />
      <path d="M220 130 L260 170 M220 170 L260 130" stroke={AMBER} strokeWidth="2.6" />
      <Cap x="330" y="150" orient="v" label="C" tone={TEAL} />
      <Gnd x="330" y="210" />
      <Axes x="90" y="420" w="660" h="120" xLabel="t" />
      <Wave x="90" y="350" w="220" amp="40" cycles="2" stroke={MUTED} />
      <Curve pts={[[320, 320], [360, 300], [400, 305], [460, 300], [500, 305], [560, 300]]} stroke={BLUE} />
      <Curve pts={[[590, 260], [630, 420], [660, 260], [700, 420], [740, 260]]} stroke={ROSE} />
      <M x="720" y="240" size={11} fill={ROSE}>PIV = 2·V_peak</M>
    </Scene>
  )
}

export function VoltageDoublerScene() {
  return (
    <Scene caption="Charge a capacitor to the peak, then put the source in series with it">
      <g className="hvem-cell-in hvem-delay-0">
        <L x="220" y="60" size={13}>Half cycle 1</L>
        <Cap x="220" y="140" orient="h" label="C1 → V" tone={TEAL} />
        <M x="220" y="180" size={11} fill={MUTED}>coupling capacitor charges</M>
      </g>
      <g className="hvem-cell-in hvem-delay-1">
        <L x="620" y="60" size={13}>Half cycle 2</L>
        <Cap x="560" y="140" orient="h" label="C1" tone={TEAL} />
        <Cap x="680" y="140" orient="h" label="C2 → 2V" tone={AMBER} />
        <M x="620" y="180" size={11} fill={MUTED}>sources add in series</M>
      </g>
      <Panel x="330" y="260" w="240" title="Node ladder" rows={[['node A', '0'], ['node B', 'V'], ['output', '2V']]} accent={BLUE} />
    </Scene>
  )
}

export function CockcroftWaltonScene() {
  const stages = 4
  return (
    <Scene caption="Two capacitor columns and a rectifier ladder — output is 2nV">
      {Array.from({ length: stages }).map((_, i) => {
        const y = 380 - i * 80
        return (
          <g key={i} className={`hvem-cell-in hvem-delay-${i}`}>
            <Cap x="260" y={y} orient="h" tone={TEAL} />
            <Cap x="560" y={y} orient="h" tone={AMBER} />
            <Wire d={`M300 ${y} L520 ${y - 40}`} stroke={MUTED} width="1.6" />
            <M x="640" y={y} size={11} fill={MUTED}>{2 * (i + 1)}V</M>
          </g>
        )
      })}
      <M x="450" y="60" size={13} fill={BLUE} weight={800}>output = 2nV_peak</M>
      <M x="450" y="440" size={11} fill={MUTED}>never more than 2V across any component</M>
    </Scene>
  )
}

export function MultiplierRippleScene() {
  return (
    <Scene caption="Ripple grows as the square of the stage count — raising frequency is the cheap cure">
      <Bars x="120" y="70" w="560" items={[['stage 1', 40, ROSE], ['stage 2', 28, AMBER], ['stage 3', 18, BLUE], ['stage 4', 8, TEAL]]} max={40} />
      <Axes x="90" y="420" w="300" h="140" xLabel="t · 50 Hz" />
      <Wave x="90" y="380" w="280" amp="35" cycles="3" stroke={ROSE} />
      <Axes x="470" y="420" w="300" h="140" xLabel="t · 1 kHz" />
      <Wave x="470" y="400" w="280" amp="12" cycles="3" stroke={GREEN} />
      <M x="450" y="330" size={12.5} fill={MUTED} weight={700}>dV ∝ I·n² / (f·C)</M>
    </Scene>
  )
}

export function OptimumStageScene() {
  return (
    <Scene caption="Gain is linear, loss is cubic — there is a genuine optimum stage count">
      <Axes x="80" y="400" w="680" h="330" xLabel="stages n" yLabel="output" />
      <Curve pts={[[90, 380], [300, 260], [500, 140], [740, 20]]} stroke={BLUE} dash="4 5" />
      <Curve pts={[[90, 380], [300, 350], [500, 260], [740, 30]]} stroke={ROSE} dash="4 5" />
      <Curve pts={[[90, 380], [250, 260], [400, 190], [500, 200], [650, 320], [740, 390]]} stroke={GREEN} width="3.2" />
      <Dot cx="400" cy="190" r="7" fill={AMBER} />
      <M x="400" y="170" size={12} fill={AMBER}>optimum n</M>
      <M x="720" y="40" size={11} fill={BLUE} anchor="end">no-load (linear)</M>
      <M x="720" y="60" size={11} fill={ROSE} anchor="end">drop (cubic)</M>
    </Scene>
  )
}

export function VanDeGraaffScene() {
  return (
    <Scene caption="Charge carried mechanically into a hollow terminal — very high voltage, tiny current">
      <circle cx="450" cy="120" r="90" fill="none" stroke={BLUE} strokeWidth="3" />
      <path d="M450 60 L450 350" stroke={MUTED} strokeWidth="2" strokeDasharray="3 5" />
      <rect x="440" y="200" width="20" height="150" fill={SKY} className="hvem-current" />
      <Dot cx="450" cy="330" r="6" fill={AMBER} className="hvem-current" />
      <Dot cx="450" cy="280" r="6" fill={AMBER} className="hvem-current" />
      <Dot cx="450" cy="230" r="6" fill={AMBER} className="hvem-current" />
      <L x="450" y="380" size={12} fill={MUTED}>corona spray</L>
      <M x="560" y="120" size={13} fill={BLUE} anchor="start">V climbing…</M>
      <Panel x="620" y="200" w="170" title="Limit" rows={[['I', 'µA, not mA'], ['V limit', 'gas breakdown']]} accent={AMBER} />
    </Scene>
  )
}

export function CascadeTransformerScene() {
  const units = [{ label: 'top', w: 3 }, { label: 'mid', w: 5 }, { label: 'bottom', w: 8 }]
  return (
    <Scene caption="Stack tanks at rising potential — but the bottom unit carries everything">
      {units.map((u, i) => (
        <g key={u.label} className={`hvem-cell-in hvem-delay-${i}`}>
          <Block x="330" y={80 + i * 110} w="240" h="70" label={`${u.label} tank`} stroke={BLUE} />
          <rect x="600" y={100 + i * 110} width={u.w * 14} height="20" fill={AMBER} />
          <M x={600 + u.w * 14 + 10} y={115 + i * 110} size={11} fill={AMBER} anchor="start">{u.w}× power</M>
        </g>
      ))}
      <M x="450" y="420" size={12} fill={MUTED}>each unit insulates only its own stage voltage</M>
    </Scene>
  )
}

export function ResonantTestScene() {
  return (
    <Scene caption="Tune out the capacitance and Q multiplies your voltage — flashover self-extinguishes">
      <Src cx="110" cy="150" kind="v" tone={BLUE} />
      <Ind x="230" y="150" len="90" label="L" />
      <Cap x="360" y="150" label="C (test object)" tone={TEAL} />
      <Plane cx="600" cy="200" r="90" />
      <Phasor ox="600" oy="200" ang="90" len="80" tone={BLUE} label="X_L" />
      <Phasor ox="600" oy="200" ang="270" len="80" tone={ROSE} label="X_C" />
      <Axes x="90" y="420" w="300" h="130" xLabel="tuning" yLabel="V" />
      <Curve pts={[[100, 400], [200, 350], [230, 300], [250, 300], [270, 350], [380, 400]]} stroke={AMBER} />
      <M x="240" y="290" size={11} fill={AMBER}>Q ≈ 40+</M>
    </Scene>
  )
}

export function TeslaCoilScene() {
  return (
    <Scene caption="Two tuned air-cored circuits exchanging energy — high voltage, but kilohertz">
      <Bars x="120" y="80" w="560" items={[['primary', 90, BLUE], ['secondary', 30, AMBER]]} max={100} />
      <Axes x="90" y="420" w="660" h="150" xLabel="cycles" />
      <Curve pts={[[100, 330], [180, 260], [260, 380], [340, 240], [420, 400], [500, 220], [580, 410], [660, 200]]} stroke={PURP} />
      <M x="450" y="200" size={12} fill={PURP}>beating envelope — energy exchanging</M>
      <M x="450" y="60" size={11.5} fill={MUTED} weight={700}>tens to hundreds of kHz — not power frequency</M>
    </Scene>
  )
}

export function StandardImpulseWaveScene() {
  const pts = [[90, 400], [200, 280], [260, 90], [400, 200], [600, 320], [760, 380]]
  return (
    <Scene caption="Front from the 30/90% construction, tail to the half-value point">
      <Axes x="80" y="420" w="680" h="360" xLabel="t (µs)" yLabel="V" />
      <Curve pts={pts} stroke={BLUE} width="3.2" />
      <Dot cx="200" cy="280" r="6" fill={AMBER} />
      <Dot cx="260" cy="90" r="6" fill={AMBER} />
      <path d="M140 340 L320 40" stroke={AMBER} strokeWidth="1.6" strokeDasharray="4 5" />
      <M x="230" y="200" size={11} fill={AMBER}>30–90% line</M>
      <M x="150" y="420" size={11} fill={MUTED}>virtual origin</M>
      <path d="M400 200 L400 420" stroke={MUTED} strokeWidth="1.2" strokeDasharray="3 5" />
      <M x="400" y="440" size={11} fill={MUTED}>T2 (half value)</M>
      <Panel x="600" y="60" w="180" title="Tolerance" rows={[['T1', '±30%'], ['T2', '±20%'], ['peak', '±3%']]} accent={MUTED} />
    </Scene>
  )
}

export function ImpulseGeneratorCircuitScene() {
  return (
    <Scene caption="One resistor sets the front, one drains the tail — efficiency is always below one">
      <Cap x="150" y="150" orient="v" label="C1" tone={TEAL} />
      <Res x="270" y="150" label="R1" />
      <Cap x="400" y="150" orient="v" label="C2" tone={AMBER} />
      <Res x="150" y="260" orient="h" label="R2" />
      <Gnd x="400" y="220" />
      <Axes x="480" y="400" w="280" h="300" xLabel="t" />
      <Curve pts={[[490, 380], [560, 150], [620, 200], [700, 320], [760, 370]]} stroke={BLUE} />
      <M x="620" y="130" size={11} fill={BLUE}>front ← R1,C2</M>
      <M x="700" y="360" size={11} fill={ROSE}>tail ← R2,C1</M>
      <Panel x="80" y="330" w="280" title="Efficiency" rows={[['η', 'V_peak / V_charge'], ['~', 'C1/(C1+C2)']]} accent={AMBER} />
    </Scene>
  )
}

export function DoubleExponentialScene() {
  return (
    <Scene caption="The output is a difference of two exponentials — widely separated, tunable apart">
      <Axes x="90" y="170" w="660" h="100" yLabel="slow" />
      <Curve pts={[[100, 100], [300, 130], [500, 150], [750, 160]]} stroke={GREEN} />
      <Axes x="90" y="300" w="660" h="100" yLabel="fast" />
      <Curve pts={[[100, 210], [140, 280], [220, 295], [400, 298]]} stroke={ROSE} />
      <Axes x="90" y="430" w="660" h="100" yLabel="v(t)" />
      <Curve pts={[[100, 420], [160, 350], [220, 340], [400, 400], [750, 425]]} stroke={BLUE} width="3" />
      <M x="450" y="60" size={12.5} fill={MUTED} weight={700}>v(t) = K[exp(−αt) − exp(−βt)]</M>
    </Scene>
  )
}

export function WaveShapeControlScene() {
  return (
    <Scene caption="Series resistance sets the front, discharge resistance sets the tail">
      <L x="220" y="60" size={13}>Front (R1)</L>
      <rect x="120" y="90" width="200" height="14" rx="7" fill={SKY} />
      <circle cx="260" cy="97" r="10" fill={BLUE} className="hvem-flux" />
      <Curve pts={[[120, 220], [200, 120], [320, 200]]} stroke={BLUE} />
      <L x="640" y="60" size={13}>Tail (R2)</L>
      <rect x="540" y="90" width="200" height="14" rx="7" fill={SKY} />
      <circle cx="620" cy="97" r="10" fill={AMBER} className="hvem-flux" />
      <Curve pts={[[540, 150], [640, 130], [740, 260]]} stroke={AMBER} />
      <Card x="260" y="300" w="380" h="120" title="New test object" lines={['front lengthens on its own', 'reset R1 for every object']} accent={RED} />
    </Scene>
  )
}

export function MarxGeneratorScene() {
  const stages = 4
  return (
    <Scene caption="Charge in parallel, fire one gap, the cascade puts every stage in series">
      <L x="220" y="50" size={13}>Charging (parallel)</L>
      {Array.from({ length: stages }).map((_, i) => (
        <Cap key={i} x={120 + i * 100} y="120" orient="v" tone={TEAL} className="hvem-cell-in" />
      ))}
      <L x="220" y="230" size={13}>Discharge (series)</L>
      {Array.from({ length: stages }).map((_, i) => (
        <g key={i} className={`hvem-cell-in hvem-delay-${i}`}>
          <Cap x={120 + i * 100} y="300" orient="v" tone={AMBER} />
          {i < stages - 1 ? <Wire d={`M${140 + i * 100} 300 L${150 + i * 100} 300`} stroke={AMBER} /> : null}
        </g>
      ))}
      <M x="450" y="400" size={13} fill={AMBER} weight={800}>output ≈ η · n · V_stage</M>
    </Scene>
  )
}

export function ImpulseCurrentCircuitScene() {
  return (
    <Scene caption="Kiloamperes in microseconds — inductance dominates, so minimise the loop">
      <rect x="150" y="100" width="280" height="140" fill="none" stroke={RED} strokeWidth="2" strokeDasharray="4 5" />
      <M x="290" y="90" size={11} fill={RED}>minimise loop area</M>
      <Cap x="200" y="170" orient="v" tone={TEAL} />
      <Ind x="380" y="170" orient="v" label="L" />
      <Axes x="480" y="400" w="280" h="300" xLabel="t (µs)" />
      <Curve pts={[[490, 380], [560, 100], [620, 200], [700, 320], [760, 370]]} stroke={BLUE} width="3" />
      <M x="560" y="80" size={11} fill={BLUE}>8/20 µs</M>
      <Bars x="90" y="330" w="330" items={[['under-damped', 30, ROSE], ['critical', 70, GREEN], ['over-damped', 45, AMBER]]} max={70} />
    </Scene>
  )
}

/* ── Module 3 — Measurement of High Voltages and Currents ────────── */

export function SeriesResistanceMicroammeterScene() {
  return (
    <Scene caption="A huge series resistance and a microammeter — heat, flashover and corona are the hard parts">
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x="230" y={50 + i * 45} width="60" height="35" rx="4" fill={WHITE} stroke={BLUE} strokeWidth="1.6" className={`hvem-cell-in hvem-delay-${i % 5}`} />
      ))}
      <Meter cx="260" cy="380" kind="A" reading="µA" />
      <Wire d="M260 320 L260 360" stroke={BLUE} />
      <Card x="420" y="60" w="330" h="90" title="Self-heating" lines={['temperature coefficient shifts R']} accent={AMBER} />
      <Card x="420" y="170" w="330" h="90" title="Flashover" lines={['column length sets withstand']} accent={RED} />
      <Card x="420" y="280" w="330" h="90" title="Corona leakage" lines={['grading ring suppresses it']} accent={TEAL} />
    </Scene>
  )
}

export function ResistanceDividerScene() {
  return (
    <Scene caption="Ratio is set by both arms — the instrument must not load the low arm">
      <Res x="250" y="120" orient="v" len="140" label="R1 (HV arm)" />
      <Res x="250" y="280" orient="v" len="80" label="R2" />
      <Meter cx="480" cy="280" kind="V" tone={GREEN} />
      <Wire d="M280 280 L440 280" stroke={GREEN} />
      <Gnd x="250" y="330" />
      <Axes x="560" y="380" w="200" h="260" xLabel="Rm ↓" yLabel="error %" />
      <Curve pts={[[570, 100], [650, 250], [740, 370]]} stroke={ROSE} />
      <Panel x="80" y="60" w="280" title="Rule" rows={[['Rm ≥ 1000·R2', 'for ~0.1% error']]} accent={BLUE} />
    </Scene>
  )
}

export function GeneratingVoltmeterScene() {
  return (
    <Scene caption="Rotate a shield to modulate capacitance — proportional current, no resistive load at all">
      <rect x="360" y="60" width="180" height="20" fill={BLUE} />
      <M x="450" y="50" size={12} fill={BLUE}>HV plate</M>
      <g className="hvem-flux" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <rect x="380" y="180" width="140" height="14" rx="4" fill={MUTED} opacity="0.7" />
      </g>
      <M x="450" y="165" size={11} fill={MUTED}>rotating earthed vane</M>
      <rect x="400" y="260" width="100" height="16" fill={GREEN} />
      <M x="450" y="300" size={11} fill={GREEN}>sensing electrode</M>
      <Axes x="90" y="440" w="300" h="120" xLabel="t" yLabel="C" />
      <Wave x="90" y="380" w="280" amp="30" cycles="3" stroke={BLUE} />
      <Axes x="470" y="440" w="280" h="120" xLabel="t" yLabel="i = V dC/dt" />
      <Wave x="470" y="380" w="260" amp="30" cycles="3" phase="1.57" stroke={AMBER} />
    </Scene>
  )
}

export function StrayCapacitanceScene() {
  return (
    <Scene caption="Stray capacitance bleeds current off the column — the meter reads low, worse at higher frequency">
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={i}>
          <rect x="380" y={60 + i * 60} width="60" height="45" rx="4" fill={WHITE} stroke={MUTED} strokeWidth="1.4" />
          <path d="M440 82 L560 82" stroke={MUTED} strokeWidth="1.2" strokeDasharray="3 4" opacity="0.6" />
          <Wire d={`M410 ${100 + i * 60} L410 ${60 + i * 60}`} stroke={BLUE} width={3 - i * 0.4} marker="url(#hveArrB)" />
        </g>
      ))}
      <Meter cx="410" cy="400" kind="A" reading="reads low" tone={ROSE} />
      <M x="640" y="90" size={12} fill={MUTED}>stray C to earth</M>
    </Scene>
  )
}

export function SeriesCapacitanceVoltmeterScene() {
  return (
    <Scene caption="A standard capacitor passes a lossless current — but harmonics are over-weighted">
      <Cap x="200" y="150" orient="v" label="C (gas standard)" tone={TEAL} />
      <Meter cx="200" cy="280" kind="A" tone={GREEN} />
      <Plane cx="560" cy="180" r="90" />
      <Phasor ox="560" oy="180" ang="0" len="80" tone={BLUE} label="V" />
      <Phasor ox="560" oy="180" ang="90" len="80" tone={AMBER} label="I" />
      <M x="560" y="300" size={11} fill={MUTED}>P = 0 (pure reactance)</M>
      <Bars x="120" y="380" w="620" items={[['fundamental', 100, BLUE], ['3rd harmonic (5%)', 15, ROSE], ['5th harmonic (2%)', 10, ROSE]]} max={100} />
    </Scene>
  )
}

export function CapacitiveDividerStraysScene() {
  return (
    <Scene caption="Two capacitors give a lossless, frequency-independent ratio — if you screen away the strays">
      <Cap x="250" y="120" orient="v" label="C1 (HV)" tone={AMBER} />
      <path d="M180 100 L180 200" stroke={ROSE} strokeWidth="1.4" strokeDasharray="3 4" />
      <M x="150" y="150" size={10.5} fill={ROSE}>stray</M>
      <Cap x="250" y="260" orient="v" label="C2 (low V)" tone={TEAL} />
      <Meter cx="450" cy="260" kind="V" tone={GREEN} />
      <rect x="180" y="70" width="160" height="160" rx="10" fill="none" stroke={GREEN} strokeWidth="2.4" strokeDasharray="6 4" className="hvem-cell-in hvem-delay-2" />
      <M x="450" y="80" size={12} fill={GREEN}>earthed guard screen</M>
      <Panel x="560" y="130" w="180" title="Ratio" rows={[['nominal', '1000'], ['with 5pF stray', '952']]} accent={AMBER} />
    </Scene>
  )
}

export function CvtScene() {
  return (
    <Scene caption="Capacitive divider + tuning reactor + transformer — ratio and burden capability together">
      <path d="M80 60 L780 60" stroke={N} strokeWidth="3" />
      <M x="120" y="45" size={12}>transmission line</M>
      <Cap x="200" y="140" orient="v" tone={AMBER} />
      <Cap x="200" y="220" orient="v" tone={AMBER} />
      <Ind x="360" y="180" len="90" label="tuning L" />
      <Block x="470" y="150" w="120" h="60" label="Transformer" stroke={BLUE} />
      <Wire d="M590 180 L680 180" stroke={GREEN} marker="url(#hveArrG)" />
      <M x="720" y="175" size={11} fill={GREEN}>relays/meters</M>
      <Wire d="M240 140 L730 100" stroke={PURP} width="1.8" dash="3 4" />
      <M x="700" y="90" size={11} fill={PURP}>carrier coupling</M>
      <Card x="80" y="330" w="700" h="90" title="Warning" lines={['ferroresonance — damping circuit required']} accent={RED} />
    </Scene>
  )
}

export function ElectrostaticVoltmeterScene() {
  return (
    <Scene caption="Force between plates goes as V² — true RMS with no current drawn at all">
      <rect x="200" y="120" width="20" height="160" fill={BLUE} />
      <rect x="320" y="140" width="20" height="120" fill={MUTED} className="hvem-flux" />
      <Wire d="M220 200 L320 200" stroke={AMBER} width="2.4" marker="url(#hveArrA)" />
      <Wire d="M220 220 L320 220" stroke={AMBER} width="1.8" marker="url(#hveArrA)" />
      <Axes x="450" y="380" w="280" h="300" xLabel="deflection" yLabel="V" />
      <Curve pts={[[460, 370], [520, 320], [580, 220], [650, 80], [720, 20]]} stroke={GREEN} width="3" />
      <M x="600" y="360" size={11} fill={GREEN}>crowded low end</M>
      <Meter cx="200" cy="340" kind="A" reading="0" tone={MUTED} />
    </Scene>
  )
}

export function ChubbFortescueScene() {
  return (
    <Scene caption="Mean rectified charging current gives the true peak — what insulation actually cares about">
      <Cap x="200" y="150" orient="v" tone={TEAL} />
      <path d="M200 200 L200 240 M180 230 L220 230 M180 250 L220 250" stroke={AMBER} strokeWidth="2.2" />
      <Meter cx="200" cy="310" kind="A" tone={GREEN} />
      <Axes x="380" y="200" w="380" h="140" xLabel="t" />
      <Wave x="390" y="160" w="360" amp="40" cycles="2" stroke={MUTED} />
      <Axes x="380" y="400" w="380" h="140" xLabel="t" />
      <path d="M390 380 Q460 300 530 380 L530 380 Q600 300 670 380 L670 380 Q740 300 760 380" fill={AMBER} opacity="0.3" stroke={AMBER} strokeWidth="2" />
      <M x="570" y="440" size={11} fill={AMBER}>charge/cycle = C·2V_peak</M>
    </Scene>
  )
}

export function SphereGapArrangementScene() {
  return (
    <Scene caption="Two spheres, a known spacing, and a spark — the reference for direct, alternating and impulse alike">
      <circle cx="300" cy="180" r="42" fill="none" stroke={BLUE} strokeWidth="3" />
      <circle cx="500" cy="180" r="42" fill="none" stroke={BLUE} strokeWidth="3" />
      <path d="M342 180 L458 180" stroke={ROSE} strokeWidth="1.4" strokeDasharray="4 4" />
      <M x="400" y="165" size={12} fill={ROSE}>gap spacing</M>
      <path d="M420 170 L440 180 L420 190" stroke={AMBER} strokeWidth="2.4" className="hvem-flux" fill="none" />
      <Res x="250" y="280" orient="h" label="protective R" />
      <Panel x="560" y="80" w="200" title="Table extract" rows={[['5 cm', '140 kV'], ['10 cm', '270 kV']]} accent={TEAL} />
      <M x="450" y="380" size={11.5} fill={MUTED} weight={700}>valid only up to ~0.5 × sphere diameter</M>
    </Scene>
  )
}

export function SphereGapInfluencesScene() {
  const items = [
    { label: 'Air density', tone: BLUE },
    { label: 'Humidity', tone: TEAL },
    { label: 'Surface', tone: AMBER },
    { label: 'Proximity', tone: PURP },
    { label: 'Irradiation', tone: GREEN },
  ]
  return (
    <Scene caption="Correct for air density always; watch humidity, surface condition, proximity, irradiation">
      <circle cx="450" cy="240" r="30" fill="none" stroke={N} strokeWidth="2.4" />
      {items.map((it, i) => {
        const ang = (i / items.length) * 2 * Math.PI - Math.PI / 2
        const cx = 450 + Math.cos(ang) * 220
        const cy = 240 + Math.sin(ang) * 150
        return (
          <g key={it.label} className={`hvem-cell-in hvem-delay-${i}`}>
            <Wire d={`M450 240 L${cx} ${cy}`} stroke={it.tone} width="1.6" dash="3 4" />
            <rect x={cx - 60} y={cy - 22} width="120" height="44" rx="8" fill={WHITE} stroke={it.tone} strokeWidth="1.8" />
            <L x={cx} y={cy + 5} size={11.5} fill={it.tone}>{it.label}</L>
          </g>
        )
      })}
    </Scene>
  )
}

export function ImpulseResistiveDividerScene() {
  return (
    <Scene caption="Low resistance for speed, high resistance for low loading — the impulse divider compromises">
      <Axes x="90" y="380" w="660" h="320" xLabel="t" yLabel="V" />
      <Curve pts={[[100, 360], [180, 100], [260, 130], [400, 250], [600, 340], [740, 360]]} stroke={N} width="3" />
      <Curve pts={[[100, 360], [220, 160], [320, 160], [450, 260], [600, 340], [740, 360]]} stroke={ROSE} dash="4 5" />
      <Curve pts={[[100, 360], [185, 105], [265, 135], [405, 252], [600, 340], [740, 360]]} stroke={GREEN} />
      <M x="620" y="110" size={11} fill={ROSE}>high R — rounded front</M>
      <M x="500" y="290" size={11} fill={GREEN}>low R — tracks true wave</M>
    </Scene>
  )
}

export function CableMatchingScene() {
  return (
    <Scene caption="At impulse speeds the measuring cable is a transmission line — match it or see ringing">
      <Cap x="150" y="150" orient="v" tone={AMBER} />
      <path d="M170 150 L650 150" stroke={MUTED} strokeWidth="6" opacity="0.3" />
      <M x="400" y="130" size={11} fill={MUTED}>coaxial cable</M>
      <rect x="660" y="110" width="80" height="80" fill="none" stroke={N} strokeWidth="2" />
      <M x="700" y="210" size={11}>scope</M>
      <Axes x="90" y="330" w="300" h="140" xLabel="t" />
      <Curve pts={[[100, 300], [140, 200], [170, 260], [200, 220], [230, 270], [260, 240], [380, 280]]} stroke={ROSE} />
      <M x="240" y="320" size={10.5} fill={ROSE}>unmatched — ringing</M>
      <Axes x="450" y="330" w="300" h="140" xLabel="t" />
      <Curve pts={[[460, 300], [520, 200], [600, 250], [740, 280]]} stroke={GREEN} />
      <M x="600" y="320" size={10.5} fill={GREEN}>matched — clean</M>
    </Scene>
  )
}

export function MixedDividerScene() {
  const cases = [
    { label: 'Under-compensated', pts: [[100, 300], [160, 280], [260, 220], [380, 210]], tone: AMBER },
    { label: 'Correct', pts: [[100, 300], [140, 210], [260, 210], [380, 210]], tone: GREEN },
    { label: 'Over-compensated', pts: [[100, 300], [140, 150], [200, 230], [260, 210], [380, 210]], tone: ROSE },
  ]
  return (
    <Scene caption="Match the time constants of the two arms and the response is flat from DC upward">
      {cases.map((c, i) => (
        <g key={c.label} className={`hvem-cell-in hvem-delay-${i}`}>
          <Axes x={80 + i * 250} y="380" w="210" h="150" />
          <Curve pts={c.pts.map(([x, y]) => [x + i * 250 - 100, y])} stroke={c.tone} width="2.6" />
          <M x={185 + i * 250} y="420" size={11} fill={c.tone}>{c.label}</M>
        </g>
      ))}
      <M x="450" y="60" size={12.5} fill={MUTED} weight={700}>R1·C1 = R2·C2</M>
    </Scene>
  )
}

export function ImpulsePeakVoltmeterScene() {
  return (
    <Scene caption="Charge a capacitor to the crest and hold it — the whole design is the discharge time constant">
      <path d="M150 220 L200 220 L210 200 L220 220 L280 220" stroke={AMBER} strokeWidth="2.4" fill="none" />
      <Cap x="340" y="220" orient="v" label="hold C" tone={TEAL} />
      <Meter cx="480" cy="220" kind="V" tone={GREEN} />
      <Axes x="90" y="400" w="660" h="280" xLabel="t" yLabel="V" />
      <Curve pts={[[100, 380], [160, 100], [300, 100], [500, 260], [740, 380]]} stroke={ROSE} />
      <Curve pts={[[100, 380], [160, 100], [740, 105]]} stroke={GREEN} />
      <Curve pts={[[100, 380], [160, 100], [740, 95]]} stroke={AMBER} dash="4 4" />
      <M x="600" y="240" size={11} fill={ROSE}>too short — droops</M>
      <M x="600" y="80" size={11} fill={GREEN}>correct — holds flat</M>
    </Scene>
  )
}

export function CurrentMeasurementMethodsScene() {
  const rows = [['shunt', '✓', '✓', '✓', '✗'], ['Rogowski', '✗', '✓', '✓', '✓'], ['Hall', '✓', '✓', '✓', '✓'], ['magnetic link', '✗', '✗', 'peak', '✓']]
  return (
    <Scene caption="Shunt for impulses, Rogowski for isolation, Hall for direct current, link for unattended lightning">
      <path d="M80 120 L780 120" stroke={N} strokeWidth="6" />
      <M x="420" y="100" size={12}>conductor under test</M>
      {['Shunt', 'Rogowski', 'Hall', 'Link'].map((s, i) => (
        <g key={s} className={`hvem-cell-in hvem-delay-${i}`}>
          <rect x={100 + i * 170} y="160" width="140" height="60" rx="8" fill={WHITE} stroke={BLUE} strokeWidth="1.8" />
          <L x={170 + i * 170} y="196" size={13}>{s}</L>
        </g>
      ))}
      <Card x="80" y="260" w="700" h="200" title="Capability (DC / AC / impulse / isolated)" lines={rows.map((r) => r.join('   '))} accent={TEAL} />
    </Scene>
  )
}

/* ── Module 4 — Overvoltages in Power Systems and Protection ─────── */

export function OvervoltageClassificationScene() {
  const bands = [
    { label: 'Lightning', x: 100, w: 60, h: 260, tone: ROSE },
    { label: 'Switching', x: 300, w: 100, h: 160, tone: AMBER },
    { label: 'Temporary', x: 550, w: 180, h: 90, tone: BLUE },
  ]
  return (
    <Scene caption="Bigger and briefer, or smaller and longer — both dangerous as duration lengthens">
      <path d="M80 380 L780 380" stroke={MUTED} strokeWidth="2" markerEnd="url(#hveArr)" />
      <M x="770" y="400" size={11} fill={MUTED} anchor="end">duration (log)</M>
      {bands.map((b, i) => (
        <g key={b.label} className={`hvem-cell-in hvem-delay-${i}`}>
          <rect x={b.x} y={380 - b.h} width={b.w} height={b.h} fill={b.tone} opacity="0.65" />
          <L x={b.x + b.w / 2} y={370 - b.h} size={12} fill={b.tone}>{b.label}</L>
        </g>
      ))}
      <Curve pts={[[90, 60], [300, 140], [550, 280], [770, 350]]} stroke={N} width="2.6" dash="4 5" />
      <M x="200" y="50" size={11} fill={N}>insulation withstand</M>
    </Scene>
  )
}

export function CloudChargeSeparationScene() {
  return (
    <Scene caption="Updraughts sort charge by weight: positive top, negative base, induced positive on ground">
      <path d="M200 80 Q450 40 700 80 Q650 160 450 170 Q250 160 200 80 Z" fill={SKY} stroke={MUTED} strokeWidth="1.6" />
      {['+', '+', '+'].map((s, i) => <L key={`t${i}`} x={350 + i * 100} y="100" size={18} fill={ROSE}>{s}</L>)}
      {['−', '−', '−', '−'].map((s, i) => <L key={`b${i}`} x={320 + i * 90} y="220" size={18} fill={BLUE}>{s}</L>)}
      <path d="M450 250 L450 380" stroke={MUTED} strokeWidth="1.6" strokeDasharray="4 5" className="hvem-flux" />
      <path d="M80 400 L780 400" stroke={N} strokeWidth="3" />
      {['+', '+', '+', '+', '+'].map((s, i) => <L key={`g${i}`} x={330 + i * 60} y="392" size={15} fill={ROSE}>{s}</L>)}
      <M x="450" y="430" size={11.5} fill={MUTED}>induced positive charge tracks the cloud</M>
    </Scene>
  )
}

export function LightningStrokeSequenceScene() {
  return (
    <Scene caption="Stepped leader descends, streamer rises to meet it, the return stroke carries the current up">
      <path d="M300 60 L280 130 L320 160 L260 230 L300 280" stroke={MUTED} strokeWidth="2" fill="none" className="hvem-slide-in" />
      <M x="230" y="150" size={11} fill={MUTED}>stepped leader</M>
      <path d="M500 400 L500 300" stroke={AMBER} strokeWidth="2" fill="none" markerEnd="url(#hveArrA)" className="hvem-flux" />
      <rect x="480" y="400" width="40" height="20" fill={N} />
      <M x="500" y="430" size={11} fill={AMBER}>upward streamer</M>
      <Dot cx="380" cy="280" r="8" fill={ROSE} className="hvem-flux" />
      <M x="380" y="260" size={11} fill={ROSE}>attachment</M>
      <path d="M380 280 L380 90" stroke={ROSE} strokeWidth="4" markerEnd="url(#hveArrRo)" className="hvem-current" />
      <M x="450" y="150" size={12} fill={ROSE} weight={800}>return stroke ↑</M>
      <Axes x="560" y="380" w="200" h="200" xLabel="t" yLabel="I" />
      <Curve pts={[[570, 370], [610, 100], [700, 200], [750, 300]]} stroke={ROSE} />
    </Scene>
  )
}

export function LightningEquivalentCircuitScene() {
  return (
    <Scene caption="Model it as a current source — the current is fixed, the voltage is whatever the impedance makes it">
      <Src cx="150" cy="180" kind="i" tone={ROSE} label="i(t)" />
      <Ind x="150" y="280" orient="v" label="Z_channel" tone={MUTED} />
      <Res x="400" y="180" orient="v" label="R_footing" />
      <Wire d="M170 180 L380 180" stroke={N} />
      <Panel x="500" y="100" w="240" title="Two cases" rows={[['R = 10 Ω', '300 kV'], ['R = 40 Ω', '1200 kV']]} accent={AMBER} />
      <M x="450" y="380" size={12} fill={MUTED} weight={700}>same current, very different voltage</M>
    </Scene>
  )
}

export function DirectStrokeTravellingWavesScene() {
  return (
    <Scene caption="Half the current each way into a few hundred ohms — always megavolts">
      <path d="M80 200 L780 200" stroke={N} strokeWidth="3" />
      <Dot cx="430" cy="200" r="8" fill={ROSE} className="hvem-flux" />
      <path d="M430 200 L250 200" stroke={BLUE} strokeWidth="2.6" markerEnd="url(#hveArrB)" className="hvem-current" />
      <path d="M430 200 L610 200" stroke={BLUE} strokeWidth="2.6" markerEnd="url(#hveArrB)" className="hvem-current" />
      <M x="330" y="185" size={11} fill={BLUE}>I/2</M>
      <M x="530" y="185" size={11} fill={BLUE}>I/2</M>
      <Bars x="150" y="300" w="560" items={[['line insulation withstand', 15, GREEN], ['stroke voltage', 100, ROSE]]} max={100} />
      <M x="450" y="60" size={13} fill={ROSE} weight={800}>V = (I/2)·Z_line ≈ 3.5 MV</M>
    </Scene>
  )
}

export function InducedOvervoltageScene() {
  return (
    <Scene caption="Nearby strokes release bound charge — small for transmission, dominant for distribution">
      <path d="M400 60 L380 120 L410 150 L360 220" stroke={MUTED} strokeWidth="2" fill="none" />
      <path d="M80 260 L780 260" stroke={N} strokeWidth="3" />
      {['+', '+', '+'].map((s, i) => <L key={i} x={330 + i * 70} y="250" size={15} fill={ROSE}>{s}</L>)}
      <M x="600" y="240" size={11} fill={ROSE}>bound charge</M>
      <path d="M400 260 L250 260" stroke={AMBER} strokeWidth="2.4" markerEnd="url(#hveArrA)" className="hvem-current" />
      <path d="M400 260 L550 260" stroke={AMBER} strokeWidth="2.4" markerEnd="url(#hveArrA)" className="hvem-current" />
      <Bars x="150" y="330" w="560" items={[['transmission BIL', 100, GREEN], ['induced surge', 15, AMBER], ['distribution BIL', 10, RED]]} max={100} />
    </Scene>
  )
}

export function LoadRejectionScene() {
  return (
    <Scene caption="Lose the load and both speed and excitation are too high — voltage rises for seconds">
      <Axes x="90" y="150" w="660" h="90" yLabel="torque" />
      <Curve pts={[[100, 90], [300, 90], [320, 160], [760, 160]]} stroke={ROSE} />
      <Axes x="90" y="280" w="660" h="90" yLabel="speed" />
      <Curve pts={[[100, 260], [300, 260], [500, 200], [760, 220]]} stroke={AMBER} />
      <Axes x="90" y="410" w="660" h="90" yLabel="V" />
      <Curve pts={[[100, 390], [300, 390], [500, 330], [760, 350]]} stroke={BLUE} />
      <M x="500" y="180" size={11} fill={GREEN}>AVR + governor respond (seconds)</M>
    </Scene>
  )
}

export function FerrantiEffectScene() {
  return (
    <Scene caption="Leading charging current lifts the far end instead of dropping it — worse as length²">
      <path d="M100 250 L780 250" stroke={N} strokeWidth="3" />
      {[0, 1, 2, 3, 4, 5].map((i) => <Cap key={i} x={180 + i * 110} y="290" orient="v" tone={TEAL} />)}
      <Axes x="100" y="200" w="660" h="120" yLabel="V" />
      <Curve pts={[[110, 170], [780, 90]]} stroke={ROSE} width="3" />
      <M x="130" y="150" size={11} fill={MUTED}>sending</M>
      <M x="740" y="80" size={11} fill={ROSE}>receiving (higher!)</M>
      <Phasor ox="450" oy="420" ang="90" len="60" tone={AMBER} label="I (leads V)" />
    </Scene>
  )
}

export function SwitchingSurgeControlScene() {
  return (
    <Scene caption="Reflection doubles it, trapped charge worsens it — pre-insertion and point-on-wave tame it">
      <Axes x="90" y="380" w="660" h="300" xLabel="t" yLabel="p.u." />
      <Curve pts={[[100, 360], [200, 200], [350, 60], [500, 60], [650, 60]]} stroke={ROSE} />
      <Curve pts={[[100, 360], [200, 280], [350, 220], [500, 220], [650, 220]]} stroke={GREEN} />
      <M x="600" y="50" size={11} fill={ROSE}>uncontrolled: ~3 p.u.</M>
      <M x="600" y="210" size={11} fill={GREEN}>pre-insertion R: ~1.5 p.u.</M>
      <Panel x="80" y="60" w="260" title="Design note" rows={[['> 300 kV', 'switching dominates']]} accent={AMBER} />
    </Scene>
  )
}

export function ShieldingAngleScene() {
  return (
    <Scene caption="Smaller shielding angle, fewer strokes get past — negative angle for tall towers">
      <path d="M450 60 L450 200" stroke={N} strokeWidth="4" />
      <circle cx="450" cy="55" r="6" fill={N} />
      <path d="M450 60 L560 200" stroke={AMBER} strokeWidth="2" strokeDasharray="4 4" />
      <path d="M450 90 A60 60 0 0 1 490 130" fill="none" stroke={AMBER} strokeWidth="1.6" />
      <M x="500" y="105" size={11} fill={AMBER}>shielding angle</M>
      <circle cx="560" cy="200" r="8" fill={BLUE} />
      <path d="M300 350 L450 200 L600 350" fill={SKY} opacity="0.5" />
      <M x="450" y="380" size={11.5} fill={GREEN}>protected zone</M>
      <Dot cx="620" cy="120" r="5" fill={ROSE} className="hvem-flux" />
      <path d="M620 120 L560 200" stroke={ROSE} strokeWidth="1.6" markerEnd="url(#hveArrRo)" />
      <M x="660" y="110" size={10.5} fill={ROSE}>shielding failure</M>
    </Scene>
  )
}

export function FootingResistanceScene() {
  return (
    <Scene caption="Footing resistance × stroke current is the tower top voltage — lowering it is the main lever">
      <Block x="380" y="60" w="100" h="100" label="Tower" stroke={BLUE} />
      <path d="M430 160 L430 260" stroke={N} strokeWidth="4" />
      {[1, 2, 3].map((r) => (
        <circle key={r} cx="430" cy="260" r={r * 35} fill="none" stroke={TEAL} strokeWidth="1.4" opacity={0.5 - r * 0.1} />
      ))}
      <Panel x="560" y="120" w="200" title="Tower top V" rows={[['R = 60 Ω', '1500 kV'], ['R = 15 Ω', '375 kV']]} accent={AMBER} />
    </Scene>
  )
}

export function CounterpoiseScene() {
  return (
    <Scene caption="Buried horizontal conductors for rocky soil — but a long one is a surge impedance at first">
      <Block x="410" y="60" w="80" h="60" label="Tower" stroke={BLUE} />
      {[-60, -20, 20, 60].map((dx, i) => (
        <Wire key={i} d={`M450 120 L${450 + dx * 3} 250`} stroke={TEAL} width="2.2" className={`hvem-cell-in hvem-delay-${i}`} />
      ))}
      <Axes x="480" y="420" w="260" h="160" xLabel="t" yLabel="Z seen" />
      <Curve pts={[[490, 280], [560, 280], [620, 380], [730, 390]]} stroke={ROSE} />
      <M x="620" y="260" size={10.5} fill={ROSE}>surge Z → settles to R</M>
    </Scene>
  )
}

export function BackFlashoverScene() {
  return (
    <Scene caption="The tower flashes to the line, not the line to the tower — reverse direction">
      <Block x="380" y="60" w="100" h="140" label="Tower" stroke={ROSE} />
      <path d="M380 90 L200 90" stroke={N} strokeWidth="3" />
      <M x="150" y="75" size={12}>phase conductor</M>
      <path d="M380 100 L210 90" stroke={ROSE} strokeWidth="2.6" markerEnd="url(#hveArrRo)" className="hvem-flux" />
      <M x="280" y="70" size={10.5} fill={ROSE}>reverse flashover</M>
      <path d="M430 200 L430 280" stroke={N} strokeWidth="4" />
      <Panel x="540" y="100" w="200" title="Critical current" rows={[['20 Ω', '50 kA'], ['50 Ω', '20 kA']]} accent={AMBER} />
    </Scene>
  )
}

export function ProtectorTubeScene() {
  return (
    <Scene caption="The arc makes its own quenching gas by eroding the tube — cheap but consumable">
      <rect x="300" y="150" width="200" height="40" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="2" />
      <path d="M270 170 L300 170" stroke={AMBER} strokeWidth="2.4" />
      <path d="M500 170 L560 150 L560 190 Z" fill={AMBER} opacity="0.5" className="hvem-flux" />
      <M x="600" y="170" size={11} fill={AMBER}>gas jet</M>
      <Axes x="90" y="380" w="660" h="200" xLabel="t" yLabel="I" />
      <Curve pts={[[100, 280], [300, 100], [500, 280], [600, 380]]} stroke={BLUE} />
      <Dot cx="600" cy="380" r="6" fill={RED} />
      <M x="620" y="360" size={10.5} fill={RED}>quenched at zero</M>
      <Panel x="80" y="60" w="260" title="Rated range" rows={[['min', '500 A'], ['max', '5 kA']]} accent={MUTED} />
    </Scene>
  )
}

export function ArresterNonlinearityScene() {
  return (
    <Scene caption="Metal oxide is nonlinear enough to need no gap — residual voltage is what apparatus sees">
      <Axes x="90" y="400" w="660" h="330" xLabel="I (log)" yLabel="V (log)" />
      <Curve pts={[[100, 380], [400, 200], [700, 30]]} stroke={MUTED} dash="4 5" />
      <Curve pts={[[100, 380], [400, 300], [600, 200], [700, 50]]} stroke={AMBER} />
      <Curve pts={[[100, 370], [500, 360], [560, 200], [600, 60], [700, 40]]} stroke={GREEN} width="3" />
      <Dot cx="500" cy="360" r="6" fill={GREEN} />
      <M x="450" y="340" size={10} fill={GREEN}>mA</M>
      <Dot cx="600" cy="60" r="6" fill={GREEN} />
      <M x="640" y="50" size={10} fill={GREEN}>kA</M>
      <M x="680" y="20" size={11} fill={GREEN} anchor="end">metal oxide</M>
      <M x="680" y="45" size={11} fill={AMBER} anchor="end">silicon carbide</M>
    </Scene>
  )
}

export function InsulationCoordinationScene() {
  const layers = ['Ground wire', 'Low R footing', 'Arrester', 'Transformer']
  return (
    <Scene caption="Layer the defences — choose deliberately where a failure happens, in air not iron">
      {layers.map((l, i) => (
        <g key={l} className={`hvem-cell-in hvem-delay-${i}`}>
          <Block x={60 + i * 190} y="80" w="160" h="60" label={l} stroke={i === 3 ? RED : BLUE} />
          {i < 3 ? <Wire d={`M${220 + i * 190} 110 L${250 + i * 190} 110`} stroke={BLUE} marker="url(#hveArrB)" /> : null}
        </g>
      ))}
      <Axes x="90" y="380" w="660" h="220" xLabel="layer" yLabel="surge" />
      <Curve pts={[[100, 100], [280, 180], [460, 260], [640, 340]]} stroke={ROSE} width="3" />
      <M x="450" y="420" size={12} fill={MUTED} weight={700}>fail in air, not in iron</M>
    </Scene>
  )
}

/* ── Module 5 — Non-Destructive Testing and HV Testing of Apparatus ── */

export function NdtTrendingScene() {
  return (
    <Scene caption="Measure without damaging, then trend the result — the change matters more than the value">
      <Axes x="90" y="380" w="660" h="300" xLabel="year" yLabel="loss factor %" />
      <Curve pts={[[120, 340], [280, 310], [440, 270], [600, 190], [720, 100]]} stroke={BLUE} width="3" />
      {[[120, 340], [280, 310], [440, 270], [600, 190]].map(([x, y], i) => <Dot key={i} cx={x} cy={y} r="6" fill={BLUE} />)}
      <path d="M90 130 L750 130" stroke={RED} strokeWidth="1.6" strokeDasharray="4 5" />
      <M x="760" y="125" size={11} fill={RED} anchor="start">limit</M>
      <Dot cx="720" cy="100" r="7" fill={AMBER} className="hvem-flux" />
      <M x="680" y="80" size={11} fill={AMBER}>intervene here</M>
    </Scene>
  )
}

export function LossAnglePhasorScene() {
  return (
    <Scene caption="Shortfall from a perfect 90° is the loss angle — its tangent is a size-independent quality measure">
      <Plane cx="450" cy="240" r="140" />
      <Phasor ox="450" oy="240" ang="90" len="130" tone={MUTED} dash="4 5" label="ideal I" />
      <Phasor ox="450" oy="240" ang="78" len="130" tone={BLUE} label="actual I" />
      <path d="M450 130 A20 20 0 0 0 440 145" fill="none" stroke={AMBER} strokeWidth="2" />
      <M x="480" y="130" size={12} fill={AMBER}>δ</M>
      <Panel x="600" y="150" w="180" title="C ∥ R" rows={[['tan δ', 'I_R / I_C'], ['P', 'V²ωC·tanδ']]} accent={TEAL} />
    </Scene>
  )
}

export function ScheringBridgeScene() {
  return (
    <Scene caption="Null-balance against a loss-free standard — every adjustable part sits at earth potential">
      <rect x="150" y="60" width="600" height="110" fill={ROSE} opacity="0.1" />
      <M x="200" y="80" size={11} fill={ROSE}>high voltage</M>
      <rect x="150" y="170" width="600" height="140" fill={GREEN} opacity="0.08" />
      <M x="200" y="300" size={11} fill={GREEN}>earth potential</M>
      <Cap x="300" y="130" orient="h" label="Cx" tone={AMBER} />
      <Cap x="550" y="130" orient="h" label="Cs" tone={TEAL} />
      <Res x="300" y="240" orient="h" label="R3" />
      <Cap x="550" y="240" orient="h" label="R4∥C4" tone={PURP} />
      <Meter cx="450" cy="185" kind="V" reading="null" tone={GREEN} />
      <Panel x="80" y="360" w="700" title="At balance" rows={[['Cx = Cs·(R4/R3)', ''], ['tan δ = ωR4C4', '']]} accent={AMBER} />
    </Scene>
  )
}

export function LossTangentVsFrequencyScene() {
  return (
    <Scene caption="Sweep the frequency and loss mechanisms separate — conduction falls, polarisation peaks">
      <Axes x="90" y="400" w="660" h="330" xLabel="frequency (log)" yLabel="tan δ" />
      <Curve pts={[[100, 150], [300, 280], [500, 350], [740, 380]]} stroke={BLUE} />
      <Curve pts={[[100, 380], [300, 370], [420, 150], [540, 370], [740, 380]]} stroke={ROSE} />
      <M x="150" y="130" size={11} fill={BLUE}>conduction (moisture)</M>
      <M x="420" y="130" size={11} fill={ROSE}>polarisation (ageing)</M>
    </Scene>
  )
}

export function TransformerRatioArmScene() {
  return (
    <Scene caption="Turns ratio sets the ratio, ampere-turns cancel — stray capacitance barely matters">
      <rect x="350" y="100" width="200" height="200" rx="12" fill="none" stroke={BLUE} strokeWidth="2.6" />
      <M x="450" y="90" size={12} fill={BLUE}>tightly coupled windings</M>
      <path d="M300 150 L350 150" stroke={AMBER} strokeWidth="2.4" markerEnd="url(#hveArrA)" />
      <path d="M300 250 L350 250" stroke={TEAL} strokeWidth="2.4" markerEnd="url(#hveArrT)" />
      <Meter cx="620" cy="200" kind="V" reading="null" tone={GREEN} />
      <Bars x="120" y="360" w="620" items={[['Schering + 3pF stray', 100, ROSE], ['ratio arm + 3pF stray', 5, GREEN]]} max={100} />
    </Scene>
  )
}

export function PartialDischargeProgressionScene() {
  return (
    <Scene caption="A void discharges long before the bulk — each discharge makes the void bigger">
      <rect x="150" y="100" width="600" height="200" fill={SKY} stroke={MUTED} strokeWidth="1.6" />
      <ellipse cx="450" cy="200" rx="20" ry="16" fill="none" stroke={ROSE} strokeWidth="2.4" className="hvem-flux" />
      <M x="450" y="330" size={11.5} fill={MUTED}>void — 4× the bulk stress, discharges repeatedly</M>
      <path d="M470 200 Q520 180 560 150 M470 210 Q530 230 580 260" stroke={AMBER} strokeWidth="1.6" fill="none" className="hvem-slide-in" />
      <M x="600" y="140" size={10.5} fill={AMBER}>treeing</M>
      <Axes x="90" y="420" w="660" h="70" xLabel="t" />
      <Bars x="120" y="360" w="200" items={[['pulses', 60, ROSE]]} max={60} />
    </Scene>
  )
}

export function StraightDetectionScene() {
  return (
    <Scene caption="A coupling capacitor and detection impedance turn each discharge into a measurable pulse">
      <Block x="150" y="140" w="140" h="80" label="Test object" stroke={BLUE} />
      <Cap x="380" y="180" orient="v" label="coupling C" tone={TEAL} />
      <Res x="480" y="180" orient="v" label="Zdet" />
      <Wire d="M290 180 L360 180" stroke={N} />
      <Wire d="M400 180 L460 180" stroke={N} />
      <Axes x="560" y="360" w="180" h="180" xLabel="t" yLabel="pulse" />
      <path d="M570 400 L600 400 L610 320 L620 400 L740 400" stroke={AMBER} strokeWidth="2.2" fill="none" />
      <Panel x="80" y="330" w="420" title="Calibration" rows={[['50 pC → 20 mV', '2.5 pC/mV'], ['test object 32 mV', '80 pC apparent']]} accent={AMBER} />
    </Scene>
  )
}

export function BalancedDetectionScene() {
  return (
    <Scene caption="Put a twin in the other arm: interference hits both and cancels, discharge hits one and shows">
      <Block x="150" y="100" w="140" h="70" label="Test object" stroke={ROSE} />
      <Block x="150" y="220" w="140" h="70" label="Discharge-free twin" stroke={GREEN} />
      <Meter cx="450" cy="185" kind="V" reading="Δ" tone={AMBER} />
      <Wire d="M290 135 L420 175" stroke={N} />
      <Wire d="M290 255 L420 195" stroke={N} />
      <path d="M80 60 L780 60" stroke={PURP} strokeWidth="1.6" strokeDasharray="4 5" />
      <M x="720" y="50" size={10.5} fill={PURP}>external interference</M>
      <Bars x="500" y="330" w="230" items={[['straight (noise)', 100, ROSE], ['balanced (clean)', 12, GREEN]]} max={100} />
    </Scene>
  )
}

export function PdInterpretationScene() {
  return (
    <Scene caption="Inception, extinction and phase pattern together identify the defect — magnitude alone does not">
      <Axes x="90" y="200" w="660" h="120" xLabel="t" yLabel="V" />
      <Curve pts={[[100, 300], [300, 100], [450, 100], [700, 300]]} stroke={BLUE} />
      <Dot cx="250" cy="150" r="6" fill={GREEN} />
      <M x="220" y="130" size={10.5} fill={GREEN}>inception</M>
      <Dot cx="550" cy="180" r="6" fill={RED} />
      <M x="580" y="200" size={10.5} fill={RED}>extinction</M>
      {['internal void', 'surface', 'corona'].map((s, i) => (
        <g key={s} className={`hvem-cell-in hvem-delay-${i}`}>
          <Wave x={100 + i * 220} y="380" w="180" amp="20" cycles="1" stroke={MUTED} />
          <M x={190 + i * 220} y="440" size={11} fill={MUTED}>{s}</M>
        </g>
      ))}
    </Scene>
  )
}

export function InsulatorTestSuiteScene() {
  return (
    <Scene caption="Wet and polluted conditions govern outdoor insulators — must flash over externally, never puncture">
      <Bars x="150" y="80" w="560" items={[['dry', 120, GREEN], ['wet', 75, AMBER], ['polluted', 55, ROSE]]} max={120} />
      <Card x="120" y="280" w="320" h="140" title="External flashover" lines={['self-restoring', 'acceptable']} accent={GREEN} />
      <Card x="480" y="280" w="320" h="140" title="Internal puncture" lines={['permanent', 'outright rejection']} accent={RED} />
    </Scene>
  )
}

export function BushingConstructionScene() {
  return (
    <Scene caption="Concentric foils grade the field — the test tap measures loss tangent without dismantling">
      <path d="M250 60 L250 400" stroke={N} strokeWidth="8" />
      {[1, 2, 3, 4].map((r) => (
        <rect key={r} x={270 + r * 30} y={130 - r * 12} width="14" height={260 + r * 24} fill="none" stroke={TEAL} strokeWidth="1.4" className={`hvem-cell-in hvem-delay-${r}`} />
      ))}
      <M x="450" y="50" size={11} fill={TEAL}>concentric grading foils</M>
      <Dot cx="450" cy="260" r="7" fill={AMBER} />
      <Wire d="M450 260 L620 260" stroke={AMBER} width="2" />
      <M x="660" y="265" size={11} fill={AMBER}>test tap → bridge</M>
    </Scene>
  )
}

export function SyntheticBreakerScene() {
  return (
    <Scene caption="Current and recovery voltage from separate circuits, combined in sequence">
      <Block x="120" y="100" w="180" h="70" label="High current circuit" stroke={BLUE} />
      <Block x="120" y="220" w="180" h="70" label="High voltage circuit" stroke={AMBER} />
      <Block x="500" y="160" w="160" h="70" label="Breaker under test" stroke={N} />
      <Wire d="M300 135 L500 180" stroke={BLUE} marker="url(#hveArrB)" />
      <Wire d="M300 255 L500 210" stroke={AMBER} marker="url(#hveArrA)" />
      <Axes x="90" y="420" w="660" h="70" xLabel="t" />
      <Curve pts={[[100, 400], [350, 460], [400, 400]]} stroke={BLUE} />
      <Curve pts={[[400, 400], [500, 350], [650, 340]]} stroke={AMBER} />
      <M x="400" y="470" size={10.5} fill={MUTED}>current zero → recovery V rises</M>
    </Scene>
  )
}

export function CableTestingScene() {
  return (
    <Scene caption="Huge capacitance forces low-frequency testing — pulse reflections locate the fault">
      <path d="M100 200 L780 200" stroke={N} strokeWidth="6" />
      {Array.from({ length: 8 }).map((_, i) => <Cap key={i} x={150 + i * 90} y="240" orient="v" tone={TEAL} />)}
      <Bars x="150" y="300" w="560" items={[['50 Hz', 100, ROSE], ['0.1 Hz', 2, GREEN]]} max={100} />
      <Dot cx="420" cy="200" r="7" fill={AMBER} className="hvem-flux" />
      <path d="M420 200 L150 200" stroke={AMBER} width="1.6" strokeDasharray="3 4" markerEnd="url(#hveArrA)" />
      <path d="M420 200 L730 200" stroke={AMBER} width="1.6" strokeDasharray="3 4" markerEnd="url(#hveArrA)" />
      <M x="420" y="180" size={10.5} fill={AMBER}>defect — timed reflections locate it</M>
    </Scene>
  )
}

export function TransformerImpulseSequenceScene() {
  const shots = ['70% reduced', 'full', 'full', 'chopped', '70% reduced']
  return (
    <Scene caption="Compare the first and last reduced waves — any difference means the transformer changed">
      {shots.map((s, i) => (
        <g key={i} className={`hvem-cell-in hvem-delay-${i}`}>
          <rect x={70 + i * 145} y="60" width="120" height="60" rx="6" fill={i === 3 ? AMBER : SKY} stroke={MUTED} strokeWidth="1.4" />
          <M x={130 + i * 145} y="95" size={10.5}>{s}</M>
        </g>
      ))}
      <Axes x="90" y="380" w="300" h="200" xLabel="t" yLabel="I neutral" />
      <Curve pts={[[100, 360], [200, 200], [380, 360]]} stroke={GREEN} />
      <Axes x="450" y="380" w="300" h="200" xLabel="t" yLabel="I neutral" />
      <Curve pts={[[460, 360], [560, 200], [660, 260], [740, 360]]} stroke={RED} />
      <M x="240" y="420" size={10.5} fill={GREEN}>shots 1 &amp; 5 match — pass</M>
      <M x="600" y="420" size={10.5} fill={RED}>diverge — fault</M>
    </Scene>
  )
}

export function ArresterTestSuiteScene() {
  return (
    <Scene caption="Residual voltage says what it lets through; duty and pressure relief say how it fails">
      {['Residual V', 'Operating duty', 'Ageing', 'Pressure relief'].map((s, i) => (
        <g key={s} className={`hvem-cell-in hvem-delay-${i}`}>
          <rect x={80 + i * 175} y="80" width="150" height="90" rx="8" fill={WHITE} stroke={BLUE} strokeWidth="1.8" />
          <L x={155 + i * 175} y="130" size={12.5}>{s}</L>
        </g>
      ))}
      <Axes x="90" y="380" w="300" h="200" xLabel="t" yLabel="temp" />
      <Curve pts={[[100, 350], [250, 200], [380, 220]]} stroke={GREEN} />
      <Curve pts={[[100, 350], [250, 200], [380, 80]]} stroke={RED} dash="4 5" />
      <M x="200" y="420" size={10.5} fill={GREEN}>pass — settles</M>
      <M x="300" y="70" size={10.5} fill={RED}>fail — runaway</M>
    </Scene>
  )
}

export function TestPhilosophyLifecycleScene() {
  const stages = [
    { label: 'Type test', sub: 'design, samples, destructive', tone: RED },
    { label: 'Routine test', sub: 'every unit, non-damaging', tone: BLUE },
    { label: 'Condition test', sub: 'service life, non-destructive', tone: GREEN },
  ]
  return (
    <Scene caption="Type tests qualify a design once, routine checks every unit, condition tests run for a lifetime">
      <path d="M90 240 L780 240" stroke={MUTED} strokeWidth="2" markerEnd="url(#hveArr)" />
      {stages.map((s, i) => (
        <g key={s.label} className={`hvem-cell-in hvem-delay-${i}`}>
          <Dot cx={200 + i * 220} cy="240" r="9" fill={s.tone} />
          <L x={200 + i * 220} y="200" size={13} fill={s.tone}>{s.label}</L>
          <M x={200 + i * 220} y="280" size={10.5} fill={MUTED}>{s.sub}</M>
        </g>
      ))}
      <Curve pts={[[620, 240], [660, 220], [700, 190], [740, 150]]} stroke={GREEN} width="2.4" />
      <M x="740" y="130" size={10.5} fill={GREEN}>trend rising</M>
    </Scene>
  )
}

/* ── Dispatch ────────────────────────────────────────────────────── */

function matchKeyword(blob) {
  if (/paschen/.test(blob)) return PaschenCurveScene
  if (/corona/.test(blob)) return CoronaScene
  if (/avalanche/.test(blob)) return AvalancheGrowthScene
  if (/townsend.*criterion/.test(blob)) return TownsendCriterionScene
  if (/townsend|current growth/.test(blob)) return TownsendCurrentGrowthScene
  if (/secondary|gamma|feedback/.test(blob)) return SecondaryProcessScene
  if (/electronegative|attachment/.test(blob)) return AttachmentScene
  if (/time lag/.test(blob)) return TimeLagsScene
  if (/mobility/.test(blob)) return MobilityContrastScene
  if (/collision/.test(blob)) return CollisionTypesScene
  if (/gas.*insulat/.test(blob)) return GasInsulationScene
  if (/liquid.*purif/.test(blob)) return LiquidPurificationScene
  if (/liquid.*breakdown/.test(blob)) return LiquidBreakdownScene
  if (/solid.*breakdown/.test(blob)) return SolidBreakdownScene
  if (/field stress/.test(blob)) return FieldStressScene
  if (/dielectric compar/.test(blob)) return DielectricComparisonScene
  if (/cockcroft/.test(blob)) return CockcroftWaltonScene
  if (/marx/.test(blob)) return MarxGeneratorScene
  if (/tesla/.test(blob)) return TeslaCoilScene
  if (/van de graaff/.test(blob)) return VanDeGraaffScene
  if (/cascade transformer/.test(blob)) return CascadeTransformerScene
  if (/resonant/.test(blob)) return ResonantTestScene
  if (/doubler/.test(blob)) return VoltageDoublerScene
  if (/optimum stage/.test(blob)) return OptimumStageScene
  if (/ripple/.test(blob)) return MultiplierRippleScene
  if (/half.wave/.test(blob)) return HalfWaveHvdcScene
  if (/impulse current/.test(blob)) return ImpulseCurrentCircuitScene
  if (/double exponential/.test(blob)) return DoubleExponentialScene
  if (/wave shape/.test(blob)) return WaveShapeControlScene
  if (/impulse generator/.test(blob)) return ImpulseGeneratorCircuitScene
  if (/standard impulse/.test(blob)) return StandardImpulseWaveScene
  if (/hvdc source|source requirement/.test(blob)) return HvdcSourceScene
  if (/sphere gap.*influenc|influenc.*sphere/.test(blob)) return SphereGapInfluencesScene
  if (/sphere gap/.test(blob)) return SphereGapArrangementScene
  if (/chubb/.test(blob)) return ChubbFortescueScene
  if (/electrostatic voltmeter/.test(blob)) return ElectrostaticVoltmeterScene
  if (/capacitance voltage transformer|\bcvt\b/.test(blob)) return CvtScene
  if (/mixed divider|compensat/.test(blob)) return MixedDividerScene
  if (/cable.*match|transmission line/.test(blob)) return CableMatchingScene
  if (/impulse.*resistive divider|resistive divider.*impulse/.test(blob)) return ImpulseResistiveDividerScene
  if (/impulse peak/.test(blob)) return ImpulsePeakVoltmeterScene
  if (/current measurement|shunt|rogowski|hall generator|magnetic link/.test(blob)) return CurrentMeasurementMethodsScene
  if (/capacitive divider.*stray|stray.*capacitive divider/.test(blob)) return CapacitiveDividerStraysScene
  if (/series capacitance voltmeter/.test(blob)) return SeriesCapacitanceVoltmeterScene
  if (/stray capacitance/.test(blob)) return StrayCapacitanceScene
  if (/generating voltmeter/.test(blob)) return GeneratingVoltmeterScene
  if (/resistance.*divider/.test(blob)) return ResistanceDividerScene
  if (/series resistance microammeter/.test(blob)) return SeriesResistanceMicroammeterScene
  if (/back flashover/.test(blob)) return BackFlashoverScene
  if (/counterpoise/.test(blob)) return CounterpoiseScene
  if (/footing resistance|ground rod/.test(blob)) return FootingResistanceScene
  if (/shielding angle/.test(blob)) return ShieldingAngleScene
  if (/switching surge|switching overvoltage/.test(blob)) return SwitchingSurgeControlScene
  if (/ferranti/.test(blob)) return FerrantiEffectScene
  if (/load rejection/.test(blob)) return LoadRejectionScene
  if (/induced overvoltage|indirect stroke/.test(blob)) return InducedOvervoltageScene
  if (/direct stroke/.test(blob)) return DirectStrokeTravellingWavesScene
  if (/lightning.*equivalent|equivalent circuit/.test(blob)) return LightningEquivalentCircuitScene
  if (/stroke sequence|stepped leader|return stroke/.test(blob)) return LightningStrokeSequenceScene
  if (/cloud|charge separation/.test(blob)) return CloudChargeSeparationScene
  if (/overvoltage classification/.test(blob)) return OvervoltageClassificationScene
  if (/protector tube|expulsion/.test(blob)) return ProtectorTubeScene
  if (/arrester|nonlinear/.test(blob)) return ArresterNonlinearityScene
  if (/insulation coordination/.test(blob)) return InsulationCoordinationScene
  if (/test.?philosophy|lifecycle/.test(blob)) return TestPhilosophyLifecycleScene
  if (/arrester test/.test(blob)) return ArresterTestSuiteScene
  if (/transformer impulse/.test(blob)) return TransformerImpulseSequenceScene
  if (/cable test/.test(blob)) return CableTestingScene
  if (/synthetic.*breaker|circuit breaker test/.test(blob)) return SyntheticBreakerScene
  if (/bushing/.test(blob)) return BushingConstructionScene
  if (/insulator test/.test(blob)) return InsulatorTestSuiteScene
  if (/pd interpretation|inception.*extinction/.test(blob)) return PdInterpretationScene
  if (/balanced detection/.test(blob)) return BalancedDetectionScene
  if (/straight detection/.test(blob)) return StraightDetectionScene
  if (/partial discharge/.test(blob)) return PartialDischargeProgressionScene
  if (/transformer ratio arm/.test(blob)) return TransformerRatioArmScene
  if (/loss tangent.*frequency|frequency.*loss tangent/.test(blob)) return LossTangentVsFrequencyScene
  if (/schering/.test(blob)) return ScheringBridgeScene
  if (/loss angle/.test(blob)) return LossAnglePhasorScene
  if (/ndt|trending|non-destructive/.test(blob)) return NdtTrendingScene
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
        <g key={String(st)} className={`hvem-slide-in hvem-delay-${i}`}>
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
      <g className="hvem-emerge">
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
  // Module 1 — conduction and breakdown in dielectrics
  'field-stress-concentration': FieldStressScene,
  'dielectric-comparison': DielectricComparisonScene,
  'gas-insulation-properties': GasInsulationScene,
  'collision-types': CollisionTypesScene,
  'mobility-contrast': MobilityContrastScene,
  'avalanche-growth': AvalancheGrowthScene,
  'townsend-current-growth': TownsendCurrentGrowthScene,
  'secondary-process-feedback': SecondaryProcessScene,
  'townsend-criterion': TownsendCriterionScene,
  'attachment-in-electronegative-gas': AttachmentScene,
  'time-lags': TimeLagsScene,
  'paschen-curve': PaschenCurveScene,
  'corona-on-a-conductor': CoronaScene,
  'liquid-purification-stages': LiquidPurificationScene,
  'liquid-breakdown-mechanisms': LiquidBreakdownScene,
  'solid-breakdown-mechanisms': SolidBreakdownScene,
  // Module 2 — generation of high voltages and currents
  'hvdc-source-requirements': HvdcSourceScene,
  'half-wave-hvdc': HalfWaveHvdcScene,
  'voltage-doubler-operation': VoltageDoublerScene,
  'cockcroft-walton-ladder': CockcroftWaltonScene,
  'multiplier-ripple': MultiplierRippleScene,
  'optimum-stage-count': OptimumStageScene,
  'van-de-graaff-operation': VanDeGraaffScene,
  'cascade-transformer-stack': CascadeTransformerScene,
  'resonant-test-set': ResonantTestScene,
  'tesla-coil-energy-exchange': TeslaCoilScene,
  'standard-impulse-wave': StandardImpulseWaveScene,
  'impulse-generator-circuit': ImpulseGeneratorCircuitScene,
  'double-exponential-decomposition': DoubleExponentialScene,
  'wave-shape-control': WaveShapeControlScene,
  'marx-generator-firing': MarxGeneratorScene,
  'impulse-current-circuit': ImpulseCurrentCircuitScene,
  // Module 3 — measurement of high voltages and currents
  'series-resistance-microammeter': SeriesResistanceMicroammeterScene,
  'resistance-divider-loading': ResistanceDividerScene,
  'generating-voltmeter': GeneratingVoltmeterScene,
  'stray-capacitance-error': StrayCapacitanceScene,
  'series-capacitance-voltmeter': SeriesCapacitanceVoltmeterScene,
  'capacitive-divider-with-strays': CapacitiveDividerStraysScene,
  'capacitance-voltage-transformer': CvtScene,
  'electrostatic-voltmeter': ElectrostaticVoltmeterScene,
  'chubb-fortescue-circuit': ChubbFortescueScene,
  'sphere-gap-arrangement': SphereGapArrangementScene,
  'sphere-gap-influences': SphereGapInfluencesScene,
  'impulse-resistive-divider-tradeoff': ImpulseResistiveDividerScene,
  'capacitive-divider-cable-matching': CableMatchingScene,
  'mixed-divider-compensation': MixedDividerScene,
  'impulse-peak-voltmeter': ImpulsePeakVoltmeterScene,
  'current-measurement-methods': CurrentMeasurementMethodsScene,
  // Module 4 — overvoltages in power systems and protection
  'overvoltage-classification': OvervoltageClassificationScene,
  'cloud-charge-separation': CloudChargeSeparationScene,
  'lightning-stroke-sequence': LightningStrokeSequenceScene,
  'lightning-equivalent-circuit': LightningEquivalentCircuitScene,
  'direct-stroke-travelling-waves': DirectStrokeTravellingWavesScene,
  'induced-overvoltage-mechanism': InducedOvervoltageScene,
  'load-rejection-response': LoadRejectionScene,
  'ferranti-effect': FerrantiEffectScene,
  'switching-surge-control': SwitchingSurgeControlScene,
  'shielding-angle': ShieldingAngleScene,
  'footing-resistance-and-rods': FootingResistanceScene,
  'counterpoise-arrangements': CounterpoiseScene,
  'back-flashover-mechanism': BackFlashoverScene,
  'protector-tube-operation': ProtectorTubeScene,
  'arrester-nonlinearity': ArresterNonlinearityScene,
  'insulation-coordination-layers': InsulationCoordinationScene,
  // Module 5 — non-destructive testing and HV testing of apparatus
  'ndt-trending': NdtTrendingScene,
  'loss-angle-phasor': LossAnglePhasorScene,
  'schering-bridge': ScheringBridgeScene,
  'loss-tangent-vs-frequency': LossTangentVsFrequencyScene,
  'transformer-ratio-arm-bridge': TransformerRatioArmScene,
  'partial-discharge-progression': PartialDischargeProgressionScene,
  'straight-detection-circuit': StraightDetectionScene,
  'balanced-detection': BalancedDetectionScene,
  'pd-interpretation': PdInterpretationScene,
  'insulator-test-suite': InsulatorTestSuiteScene,
  'bushing-construction-and-test': BushingConstructionScene,
  'synthetic-breaker-testing': SyntheticBreakerScene,
  'cable-testing-methods': CableTestingScene,
  'transformer-impulse-sequence': TransformerImpulseSequenceScene,
  'arrester-test-suite': ArresterTestSuiteScene,
  'test-philosophy-lifecycle': TestPhilosophyLifecycleScene,
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


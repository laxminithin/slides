/**
 * DcScenes — VTU BEC503 Digital Communication classroom SVG visuals.
 *
 * Every scene animates a mechanism the syllabus asks students to reproduce:
 * a spectrum sliding down to baseband, a noise cloud pushing a constellation
 * point across a decision boundary, a syndrome pointing at a column of H, a
 * survivor path pruning the trellis. Motion carries meaning — nothing here
 * moves purely for decoration.
 *
 * Phase 1 wrote one `visualSpec` paragraph per unit; VISUAL_MAP at the end of
 * this file binds each of the 80 `visual` ids to the scene that realises it.
 */

const N = '#0b1e2d'
const BLUE = '#0369a1'
const ROSE = '#be123c'
const PURP = '#6d28d9'
const AMBER = '#b45309'
const GREEN = '#047857'
const INDIGO = '#4338ca'
const RED = '#b91c1c'
const MUTED = '#4a5d72'
const CREAM = '#fffcf6'
const SKY = '#e4f1fa'
const WHITE = '#ffffff'
const MONO = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace'

export const PALETTE = { N, BLUE, ROSE, PURP, AMBER, GREEN, INDIGO, RED, MUTED, CREAM, SKY }

/* JSX attributes arrive as strings when written `y="200"`, and `"200" + 11`
   is "20011", not 211 — which silently throws geometry off the canvas. Every
   helper below that does arithmetic on a coordinate prop coerces first. */
const n = (v) => Number(v)

/* ── Shell ──────────────────────────────────────────────────────── */

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`dc-scene ${className}`} aria-label={caption || 'Digital Communication diagram'}>
      <svg viewBox={vb} role="img" className="dc-svg">
        <defs>
          <marker id="dcArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="dcArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="dcArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="dcArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="dcArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="dcArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="dcArrI" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={INDIGO} />
          </marker>
          <marker id="dcArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
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

/** Monospace label — formulas, bit strings, polynomial coefficients. */
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
 * Axes for a frequency or time plot. `origin="center"` puts f = 0 in the
 * middle, which is what every two-sided spectrum in Module 1 needs.
 */
function Axes({ x, y, w, h, xLabel, yLabel, origin = 'left', tickLabels = [] }) {
  const [X, Y, W, H] = [n(x), n(y), n(w), n(h)]
  const zero = origin === 'center' ? X + W / 2 : X
  return (
    <g>
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#dcArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#dcArr)" />
      {/* Anchored at the end, not centred: a long label ("E_b/N₀ (dB)")
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
    </g>
  )
}

/**
 * One spectral lobe: a smooth bump of half-width `hw` sitting at `cx`, grown
 * up from the baseline. `invert` draws it below the axis, which is how the
 * Hilbert term cancels the negative-frequency half in unit 4.
 */
function Lobe({ cx, base, hw, h, fill = BLUE, stroke, className = '', label, labelFill, invert = false, opacity = 0.24 }) {
  const [C, B, HW, H] = [n(cx), n(base), n(hw), n(h)]
  const top = invert ? B + H : B - H
  const d = `M${C - HW} ${B} C${C - HW * 0.42} ${top - (invert ? -6 : 6)}, ${C + HW * 0.42} ${top - (invert ? -6 : 6)}, ${C + HW} ${B} Z`
  return (
    <g className={className}>
      <path d={d} fill={fill} fillOpacity={opacity} stroke={stroke || fill} strokeWidth="2.4" strokeLinejoin="round" />
      {label ? (
        <L x={C} y={invert ? B + H + 20 : top - 10} size={12} fill={labelFill || stroke || fill} weight={800}>
          {label}
        </L>
      ) : null}
    </g>
  )
}

function sinePath(x0, y0, w, amp, cycles = 2, phase = 0, steps = 110) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const x = x0 + t * w
    const y = y0 - amp * Math.sin(2 * Math.PI * cycles * t + phase)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

/** A carrier riding inside a slow amplitude outline — the picture of a
 *  bandpass signal and its envelope. */
function modulatedPath(x0, y0, w, amp, cycles = 9, envCycles = 1, steps = 200) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const env = 0.45 + 0.55 * Math.abs(Math.sin(Math.PI * envCycles * t + 0.4))
    const x = x0 + t * w
    const y = y0 - amp * env * Math.sin(2 * Math.PI * cycles * t)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

function envelopePath(x0, y0, w, amp, envCycles = 1, steps = 120) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const env = 0.45 + 0.55 * Math.abs(Math.sin(Math.PI * envCycles * t + 0.4))
    pts.push(`${i === 0 ? 'M' : 'L'}${(x0 + t * w).toFixed(1)} ${(y0 - amp * env).toFixed(1)}`)
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

/** A polyline through explicit points — Q-function tails, BER waterfalls,
 *  entropy curves, capacity plots. */
function Curve({ pts = [], stroke = BLUE, width = 2.8, className = '', dash, opacity }) {
  if (!pts.length) return null
  const d = pts.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${n(px).toFixed(1)} ${n(py).toFixed(1)}`).join(' ')
  return <Wire d={d} stroke={stroke} width={width} className={className} dash={dash} opacity={opacity} />
}

/** Gaussian bell, used for the AWGN density and every error-probability tail. */
function Bell({ cx, base, w, h, stroke = MUTED, fill, className = '', opacity = 0.16, steps = 60 }) {
  const [C, B, W, H] = [n(cx), n(base), n(w), n(h)]
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = -3 + (6 * i) / steps
    const x = C + (t * W) / 6
    const y = B - H * Math.exp(-(t * t) / 2)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return (
    <g className={className}>
      <path d={`${pts.join(' ')} L${C + W / 2} ${B} L${C - W / 2} ${B} Z`} fill={fill || stroke} fillOpacity={fill ? opacity : 0.1} stroke={stroke} strokeWidth="2.3" />
    </g>
  )
}

/** The shaded area of a Gaussian beyond a threshold — literally the Q function.
 *  `side="left"` shades the other tail, which is the one that matters when the
 *  question is "given +√Eb was sent, how often does noise carry it below 0". */
function BellTail({ cx, base, w, h, from, fill = ROSE, className = '', opacity = 0.34, steps = 40, side = 'right' }) {
  const [C, B, W, H, F] = [n(cx), n(base), n(w), n(h), n(from)]
  const tCut = ((F - C) * 6) / W
  const [t0, t1] = side === 'left' ? [-3, Math.min(tCut, 3)] : [Math.max(tCut, -3), 3]
  if (t1 <= t0) return null
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = t0 + ((t1 - t0) * i) / steps
    const x = C + (t * W) / 6
    const y = B - H * Math.exp(-(t * t) / 2)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  const xStart = C + (t0 * W) / 6
  const xEnd = C + (t1 * W) / 6
  return (
    <g className={className}>
      <path d={`M${xStart.toFixed(1)} ${B} ${pts.join(' ').replace(/^M/, 'L')} L${xEnd.toFixed(1)} ${B} Z`} fill={fill} fillOpacity={opacity} stroke="none" />
    </g>
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

function Mult({ cx, cy, r = 17, stroke = AMBER, className = '' }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  const k = R * 0.5
  return (
    <g transform={`translate(${C},${Y})`}>
      <g className={className}>
        <circle r={R} fill={WHITE} stroke={stroke} strokeWidth="2.5" />
        <path d={`M${-k} ${-k} L${k} ${k} M${k} ${-k} L${-k} ${k}`} stroke={stroke} strokeWidth="2.6" strokeLinecap="round" />
      </g>
    </g>
  )
}

function Sum({ cx, cy, r = 17, stroke = GREEN, className = '', sign = '+' }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  return (
    <g transform={`translate(${C},${Y})`}>
      <g className={className}>
        <circle r={R} fill={WHITE} stroke={stroke} strokeWidth="2.5" />
        <L x={0} y={R * 0.36} size={R * 1.15} fill={stroke}>
          {sign}
        </L>
      </g>
    </g>
  )
}

function Integ({ x, y, w = 66, h = 52, stroke = PURP, className = '', limits = '0 → T' }) {
  const [W, H] = [n(w), n(h)]
  return (
    <g transform={`translate(${n(x)},${n(y)})`}>
      <g className={className}>
        <rect width={W} height={H} rx="9" fill={WHITE} stroke={stroke} strokeWidth="2.5" />
        <text x={W / 2} y={H / 2 + 10} textAnchor="middle" fontSize="26" fontWeight="700" fill={stroke} fontFamily="Georgia,serif">
          ∫
        </text>
        <M x={W / 2} y={H + 15} size={10.5} fill={MUTED}>
          {limits}
        </M>
      </g>
    </g>
  )
}

/** Sampling switch: a hinged arm over two contacts, closed at t = T. */
function Sampler({ x, y, stroke = ROSE, className = '', label = 't = T' }) {
  const [X, Y] = [n(x), n(y)]
  return (
    <g transform={`translate(${X},${Y})`}>
      <circle cx={0} cy={0} r="4" fill={stroke} />
      <circle cx={34} cy={0} r="4" fill={stroke} />
      <g className={className} style={{ transformBox: 'fill-box', transformOrigin: '0% 100%' }}>
        <path d="M0 0 L32 -14" stroke={stroke} strokeWidth="2.8" strokeLinecap="round" fill="none" />
      </g>
      <M x={17} y={26} size={10.5} fill={stroke}>
        {label}
      </M>
    </g>
  )
}

/** Signal-space plane: two orthonormal axes with the origin at (cx, cy). */
function Plane({ cx, cy, r, xLabel = 'φ₁', yLabel = 'φ₂', grid = false, tone = MUTED }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  return (
    <g>
      {grid
        ? [-0.5, 0.5].flatMap((f) => [
            <path key={`h${f}`} d={`M${C - R} ${Y + f * R} L${C + R} ${Y + f * R}`} stroke={tone} strokeWidth="1" opacity="0.28" strokeDasharray="4 6" />,
            <path key={`v${f}`} d={`M${C + f * R} ${Y - R} L${C + f * R} ${Y + R}`} stroke={tone} strokeWidth="1" opacity="0.28" strokeDasharray="4 6" />,
          ])
        : null}
      <path d={`M${C - R} ${Y} L${C + R + 8} ${Y}`} stroke={tone} strokeWidth="2.2" markerEnd="url(#dcArr)" fill="none" />
      <path d={`M${C} ${Y + R} L${C} ${Y - R - 8}`} stroke={tone} strokeWidth="2.2" markerEnd="url(#dcArr)" fill="none" />
      <L x={C + R + 16} y={Y + 18} size={13} fill={tone} weight={700}>
        {xLabel}
      </L>
      <L x={C - 16} y={Y - R - 12} size={13} fill={tone} weight={700} anchor="end">
        {yLabel}
      </L>
    </g>
  )
}

/** One constellation point, optionally with its vector from the origin. */
function Pt({ cx, cy, r = 9, fill = BLUE, label, labelDy = -16, className = '', vector, ox, oy, vectorTone }) {
  const [C, Y] = [n(cx), n(cy)]
  return (
    <g>
      {vector ? (
        <Wire d={`M${n(ox)} ${n(oy)} L${C} ${Y}`} stroke={vectorTone || fill} width="2.2" marker={`url(#${markerFor(vectorTone || fill)})`} className={className} />
      ) : null}
      <circle cx={C} cy={Y} r={n(r)} fill={fill} className={className} />
      {label ? (
        <M x={C} y={Y + n(labelDy)} size={12} fill={fill}>
          {label}
        </M>
      ) : null}
    </g>
  )
}

function markerFor(tone) {
  if (tone === BLUE) return 'dcArrB'
  if (tone === AMBER) return 'dcArrA'
  if (tone === ROSE) return 'dcArrRo'
  if (tone === GREEN) return 'dcArrG'
  if (tone === PURP) return 'dcArrP'
  if (tone === INDIGO) return 'dcArrI'
  if (tone === RED) return 'dcArrR'
  return 'dcArr'
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

/** A titled card with body lines — the "three assumptions" style callout. */
function Card({ x, y, w, h, title, lines = [], accent = BLUE, className = '', mono = false, foot, footTone = RED, children, linesY = 54 }) {
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
          <T key={`${line}-${i}`} x={W / 2} y={n(linesY) + i * 19} size={11.5} fill={N} weight={650}>
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

/** A row of bit cells — message blocks, codewords, received vectors. `mark`
 *  flips one cell into the error tone so a single flipped bit is visible. */
function Bits({ x, y, bits = [], cw = 32, h = 32, accent = BLUE, className = '', label, mark = -1, markTone = RED, size = 14 }) {
  const [X, Y, CW, H] = [n(x), n(y), n(cw), n(h)]
  return (
    <g>
      {label ? (
        <M x={X - 10} y={Y + H / 2 + 5} size={12.5} fill={accent} anchor="end" weight={800}>
          {label}
        </M>
      ) : null}
      {bits.map((b, i) => {
        const hot = i === mark
        return (
          <g key={`${i}-${b}`} className={hot ? className : ''}>
            <rect
              x={X + i * CW}
              y={Y}
              width={CW - 3}
              height={H}
              rx="6"
              fill={hot ? markTone : WHITE}
              fillOpacity={hot ? 0.16 : 1}
              stroke={hot ? markTone : accent}
              strokeWidth={hot ? 2.6 : 1.8}
            />
            <M x={X + i * CW + (CW - 3) / 2} y={Y + H / 2 + 5} size={size} fill={hot ? markTone : N} weight={800}>
              {String(b)}
            </M>
          </g>
        )
      })}
    </g>
  )
}

/** A matrix with bracket rules. `mark` highlights one column, which is what
 *  syndrome decoding actually points at. */
function Matrix({ x, y, name, rows = [], cell = 26, accent = INDIGO, className = '', mark = -1, size = 12.5, markTone = ROSE }) {
  const [X, Y, C] = [n(x), n(y), n(cell)]
  const cols = rows[0] ? rows[0].length : 0
  const w = cols * C
  const h = rows.length * C
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        {name ? (
          <M x={-16} y={h / 2 + 5} size={14} fill={accent} anchor="end" weight={800}>
            {name}
          </M>
        ) : null}
        <path d={`M-6 -6 L-12 -6 L-12 ${h + 6} L-6 ${h + 6}`} fill="none" stroke={accent} strokeWidth="2.4" />
        <path d={`M${w + 6} -6 L${w + 12} -6 L${w + 12} ${h + 6} L${w + 6} ${h + 6}`} fill="none" stroke={accent} strokeWidth="2.4" />
        {mark >= 0 ? <rect x={mark * C - 2} y={-6} width={C} height={h + 12} rx="5" fill={markTone} fillOpacity="0.16" stroke={markTone} strokeWidth="2" /> : null}
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

/** A tapped shift register: `stages` memory cells, `taps` marking which cells
 *  feed the modulo-2 adder. This is the encoder of Modules 4 and 5. */
function Register({ x, y, stages = 3, values = [], accent = PURP, className = '', cw = 52, label }) {
  const [X, Y, CW] = [n(x), n(y), n(cw)]
  return (
    <g>
      {label ? (
        <L x={X + (stages * CW) / 2} y={Y - 14} size={12.5} fill={accent} weight={800}>
          {label}
        </L>
      ) : null}
      {Array.from({ length: stages }, (_, i) => (
        <g key={i} className={className ? `${className} dcm-delay-${i % 5}` : ''}>
          <rect x={X + i * CW} y={Y} width={CW - 4} height="44" rx="8" fill={WHITE} stroke={accent} strokeWidth="2.4" />
          <M x={X + i * CW + (CW - 4) / 2} y={Y + 28} size={15} fill={N} weight={800}>
            {values[i] != null ? String(values[i]) : '·'}
          </M>
        </g>
      ))}
      {Array.from({ length: stages - 1 }, (_, i) => (
        <Wire key={`a${i}`} d={`M${X + i * CW + CW - 4} ${Y + 22} L${X + (i + 1) * CW - 2} ${Y + 22}`} stroke={accent} width="2.2" marker={`url(#${markerFor(accent)})`} />
      ))}
    </g>
  )
}

/**
 * Trellis lattice. `edges` are `[stage, fromState, toState, tone, className,
 * dash]`; states are numbered from the top. Used for the code trellis, the
 * Viterbi survivors and the traceback.
 */
function Trellis({ x, y, w, h, states = 4, stages = 5, edges = [], stateLabels = [], stageLabels = [], nodeTone = N, dotR = 6 }) {
  const [X, Y, W, H] = [n(x), n(y), n(w), n(h)]
  const dx = stages > 1 ? W / (stages - 1) : W
  const dy = states > 1 ? H / (states - 1) : H
  const px = (s) => X + s * dx
  const py = (s) => Y + s * dy
  return (
    <g>
      {stateLabels.map((lab, i) => (
        <M key={lab} x={X - 14} y={py(i) + 5} size={11.5} fill={MUTED} anchor="end" weight={800}>
          {lab}
        </M>
      ))}
      {stageLabels.map((lab, i) => (
        <M key={`${lab}-${i}`} x={px(i)} y={Y + H + 26} size={11.5} fill={MUTED} weight={700}>
          {lab}
        </M>
      ))}
      {edges.map(([st, from, to, tone, cls, dash], i) => (
        <Wire
          key={`${st}-${from}-${to}-${i}`}
          d={`M${px(st)} ${py(from)} L${px(st + 1)} ${py(to)}`}
          stroke={tone || MUTED}
          width={tone && tone !== MUTED ? 3 : 1.8}
          className={cls || ''}
          dash={dash}
          opacity={tone ? 1 : 0.55}
        />
      ))}
      {Array.from({ length: stages }, (_, s) =>
        Array.from({ length: states }, (_, k) => <circle key={`${s}-${k}`} cx={px(s)} cy={py(k)} r={dotR} fill={nodeTone} />),
      )}
    </g>
  )
}

/** Complete binary tree laid out by depth — the code tree and the prefix-code
 *  budget both need it. `marks` tints particular nodes by "d:i" key. */
function BinTree({ x, y, w, h, levels = 3, marks = {}, labels = {}, edgeLabels = {}, tone = MUTED, r = 11 }) {
  const [X, Y, W, H] = [n(x), n(y), n(w), n(h)]
  const dy = levels > 1 ? H / (levels - 1) : H
  const px = (d, i) => X + (W * (2 * i + 1)) / (2 * 2 ** d)
  const nodes = []
  const edges = []
  for (let d = 0; d < levels; d += 1) {
    for (let i = 0; i < 2 ** d; i += 1) {
      nodes.push([d, i])
      if (d + 1 < levels) {
        edges.push([d, i, 0])
        edges.push([d, i, 1])
      }
    }
  }
  return (
    <g>
      {edges.map(([d, i, b]) => {
        const key = `${d + 1}:${i * 2 + b}`
        const mark = marks[key]
        return (
          <g key={`e${d}-${i}-${b}`}>
            <Wire
              d={`M${px(d, i)} ${Y + d * dy} L${px(d + 1, i * 2 + b)} ${Y + (d + 1) * dy}`}
              stroke={mark || tone}
              width={mark ? 3 : 1.8}
              opacity={mark ? 1 : 0.5}
            />
            {edgeLabels[key] ? (
              <M
                x={(px(d, i) + px(d + 1, i * 2 + b)) / 2 + (b ? 10 : -10)}
                y={Y + (d + 0.5) * dy}
                size={10.5}
                fill={mark || MUTED}
                weight={800}
              >
                {edgeLabels[key]}
              </M>
            ) : null}
          </g>
        )
      })}
      {nodes.map(([d, i]) => {
        const key = `${d}:${i}`
        const mark = marks[key]
        return (
          <g key={`n${key}`}>
            <circle cx={px(d, i)} cy={Y + d * dy} r={mark ? n(r) + 2 : n(r)} fill={mark ? mark : WHITE} stroke={mark || tone} strokeWidth="2.4" />
            {labels[key] ? (
              <M x={px(d, i)} y={Y + d * dy + (d === levels - 1 ? 28 : -18)} size={11} fill={mark || N} weight={800}>
                {labels[key]}
              </M>
            ) : null}
          </g>
        )
      })}
    </g>
  )
}

/** Horizontal bars — symbol probabilities, code lengths, Kraft budget. */
function Bars({ x, y, w, items = [], accent = BLUE, rowH = 34, className = 'dcm-bar', max }) {
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
          <g className={`${className} dcm-delay-${i % 5}`} style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
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
  const beats = ['Represent', 'Modulate', 'Bound', 'Protect', 'Decode']
  return (
    <Scene caption={question || 'One channel, one bit, one decision'}>
      <rect x="40" y="36" width="820" height="410" rx="16" fill={WHITE} stroke={BLUE} strokeWidth="3" />
      <L x="450" y="104" size={18} fill={BLUE}>{`MODULE ${module} · VTU BEC503`}</L>
      <L x="450" y="162" size={25}>
        {title || `Module ${module}`}
      </L>
      <L x="450" y="208" size={14.5} fill={MUTED} weight={700}>
        {question || 'Watch the bits survive the noise'}
      </L>
      {beats.map((t, i) => (
        <Block
          key={t}
          x={70 + i * 154}
          y={264}
          w={134}
          h={68}
          label={t}
          stroke={i === module - 1 ? ROSE : BLUE}
          className={`dcm-flux dcm-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`dcm-current dcm-delay-${i}`}
          marker="url(#dcArrB)"
        />
      ))}
      {hours ? (
        <L x="450" y="396" size={14} fill={MUTED} weight={700}>{`${hours} teaching hours`}</L>
      ) : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Redraw the diagram from memory — then attempt the PYQs">
      <L x="450" y="86" size={19} fill={BLUE}>{`MODULE ${module} COMPLETE`}</L>
      <L x="450" y="140" size={24}>
        {title || 'Module complete'}
      </L>
      {['Draw the signal space', 'Mark the minimum distance', 'Write the noise variance', 'Form the decision rule', 'Sanity-check the units'].map((t, i) => (
        <g key={t} className={`dcm-cell-in dcm-delay-${i}`}>
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
        <g key={String(p)} className={`dcm-cell-in dcm-delay-${i % 5}`}>
          <rect x="60" y={134 + i * 58} width="780" height="46" rx="9" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="92" cy={157 + i * 58} r="8" fill={i % 2 ? ROSE : BLUE} />
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
        <g key={String(step)} className={`dcm-slide-in dcm-delay-${i}`}>
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
              style={{ font: '600 13.5px/1.28 system-ui,sans-serif', color: '#0b1e2d', display: 'flex', alignItems: 'center', height: '100%' }}
            >
              {String(step)}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

export function TwoCaseScene({ left, right, caption = 'Two cases, two different answers', leftTone = BLUE, rightTone = ROSE }) {
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
        <g key={String(p)} className={`dcm-cell-in dcm-delay-${i}`}>
          <circle cx="92" cy={156 + i * 56} r="7" fill={leftTone} />
          <foreignObject x="112" y={134 + i * 56} width="316" height="46">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13.5px/1.3 system-ui,sans-serif', color: '#0b1e2d' }}>
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
        <g key={String(p)} className={`dcm-cell-in dcm-delay-${i}`}>
          <circle cx="492" cy={156 + i * 56} r="7" fill={rightTone} />
          <foreignObject x="512" y={134 + i * 56} width="316" height="46">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13.5px/1.3 system-ui,sans-serif', color: '#0b1e2d' }}>
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
          className={`dcm-slide-in dcm-delay-${i}`}
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
          <g key={`${label}-${i}`} className={`dcm-cell-in dcm-delay-${i % 5}`}>
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

/* ── Module 1 — bandpass representation and the optimum receiver ── */

export function BandpassShiftScene() {
  return (
    <Scene caption="Same information, about 1200× fewer samples for a 2.4 GHz carrier">
      <L x="450" y="52" size={13} fill={MUTED} weight={700}>
        bandpass spectrum — everything sits around ±f_c
      </L>
      <Axes x="70" y="200" w="770" h="120" xLabel="f" origin="center" tickLabels={[[255, '−f_c'], [455, '0'], [655, '+f_c']]} />
      <Lobe cx="255" base="200" hw="58" h="86" fill={BLUE} label="negative-frequency image" className="dcm-cell-in" />
      <Lobe cx="655" base="200" hw="58" h="86" fill={BLUE} label="positive-frequency band" className="dcm-cell-in dcm-delay-1" />
      <M x="255" y="176" size={11} fill={BLUE}>
        2W
      </M>
      <M x="655" y="176" size={11} fill={BLUE}>
        2W
      </M>

      <Wire d="M655 214 C625 268, 545 288, 472 308" stroke={ROSE} width="2.8" marker="url(#dcArrRo)" className="dcm-draw" />
      <L x="596" y="268" size={12} fill={ROSE} weight={800}>
        translate by −f_c
      </L>

      <Axes x="70" y="380" w="770" h="86" origin="center" tickLabels={[[455, '0']]} />
      <Lobe cx="455" base="380" hw="58" h="70" fill={GREEN} label="complex lowpass equivalent" className="dcm-emerge" />

      <rect x="70" y="404" width="352" height="36" rx="9" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="2.2" className="dcm-slide-in dcm-delay-2" />
      <M x="246" y="427" size={12.5} fill={AMBER} weight={800}>
        bandpass: fs &gt; 2(f_c + W)
      </M>
      <rect x="488" y="404" width="352" height="36" rx="9" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="2.2" className="dcm-slide-in dcm-delay-4" />
      <M x="664" y="427" size={12.5} fill={GREEN} weight={800}>
        lowpass: fs &gt; 2W
      </M>
    </Scene>
  )
}

export function HilbertResponseScene() {
  return (
    <Scene caption="Magnitude untouched, phase turned by a quarter cycle — a 90° phase shifter">
      <L x="310" y="54" size={12.5} fill={GREEN} weight={800}>
        |H(f)| = 1 — magnitude unchanged
      </L>
      <Axes x="60" y="180" w="500" h="96" xLabel="f" origin="center" tickLabels={[[310, '0']]} />
      <Wire d="M70 110 L556 110" stroke={GREEN} width="3.2" className="dcm-draw" />
      <M x="92" y="100" size={11.5} fill={GREEN} anchor="start">
        1
      </M>

      <L x="310" y="252" size={12.5} fill={PURP} weight={800}>
        arg H(f) = −j·sgn(f)
      </L>
      <Wire d="M60 350 L566 350" stroke={MUTED} width="2.2" marker="url(#dcArr)" />
      <Wire d="M310 288 L310 420" stroke={MUTED} width="2.2" />
      <Wire d="M72 300 L302 300" stroke={PURP} width="3.2" className="dcm-slide-in" />
      <Wire d="M318 400 L556 400" stroke={PURP} width="3.2" className="dcm-slide-in dcm-delay-2" />
      <circle cx="306" cy="300" r="5.5" fill={CREAM} stroke={PURP} strokeWidth="2.4" className="dcm-flux dcm-delay-4" />
      <circle cx="314" cy="400" r="5.5" fill={CREAM} stroke={PURP} strokeWidth="2.4" className="dcm-flux dcm-delay-4" />
      <M x="80" y="292" size={11} fill={PURP} anchor="start">
        +90°
      </M>
      <M x="548" y="418" size={11} fill={PURP} anchor="end">
        −90°
      </M>
      <M x="322" y="344" size={11} fill={MUTED} anchor="start">
        f
      </M>

      <rect x="600" y="86" width="260" height="304" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.3" />
      <rect x="600" y="86" width="260" height="30" rx="12" fill={BLUE} />
      <L x="730" y="107" size={12.5} fill={WHITE}>
        cos becomes sin
      </L>
      <Wave x="620" y="180" w="220" amp="34" cycles={1.5} stroke={BLUE} className="" />
      <M x="730" y="230" size={11.5} fill={BLUE}>
        cos(2πf₀t)
      </M>
      <g className="dcm-probe" style={{ '--dcm-probe': '37px' }}>
        <Wave x="620" y="310" w="220" amp="34" cycles={1.5} phase={-Math.PI / 2} stroke={ROSE} dash="7 6" />
      </g>
      <M x="730" y="362" size={11.5} fill={ROSE}>
        sin(2πf₀t)
      </M>
    </Scene>
  )
}

export function HilbertPropsScene() {
  return (
    <Scene caption="Three properties, three reasons the analytic signal works at all">
      <Card x="44" y="74" w="258" h="336" title="Energy" accent={BLUE} className="dcm-slide-in" lines={['E{g} = E{ĝ}', 'the shift moves no energy']} linesY={300}>
        <Lobe cx="72" base="190" hw="40" h="66" fill={BLUE} />
        <Lobe cx="192" base="190" hw="40" h="66" fill={BLUE} />
        <L x={132} y={172} size={22} fill={MUTED}>
          =
        </L>
        <Wire d="M36 190 L228 190" stroke={MUTED} width="1.8" />
        <M x={72} y={214} size={11} fill={MUTED}>
          |G(f)|
        </M>
        <M x={192} y={214} size={11} fill={MUTED}>
          |Ĝ(f)|
        </M>
      </Card>

      <Card x="322" y="74" w="258" h="336" title="Orthogonality" accent={AMBER} className="dcm-slide-in dcm-delay-2" lines={['∫ g(t) ĝ(t) dt = 0', 'the lobes cancel exactly']} linesY={300}>
        <Wire d="M26 190 L232 190" stroke={MUTED} width="1.8" />
        <Wave x={26} y={190} w={206} amp={48} cycles={1} stroke={BLUE} />
        <Wave x={26} y={190} w={206} amp={48} cycles={1} phase={-Math.PI / 2} stroke={ROSE} dash="6 5" />
        <g className="dcm-collapse">
          <rect x={52} y={146} width={52} height={44} fill={GREEN} fillOpacity="0.3" />
          <rect x={155} y={190} width={52} height={44} fill={RED} fillOpacity="0.3" />
        </g>
        <M x={78} y={136} size={11} fill={GREEN} weight={800}>
          +
        </M>
        <M x={181} y={250} size={11} fill={RED} weight={800}>
          −
        </M>
      </Card>

      <Card x="600" y="74" w="258" h="336" title="Double transform" accent={PURP} className="dcm-slide-in dcm-delay-4" lines={['ĝ̂(t) = −g(t)', 'two shifts make an inversion']} linesY={300}>
        <M x={44} y={126} size={13} fill={N} weight={800}>
          g
        </M>
        <M x={128} y={126} size={13} fill={PURP} weight={800}>
          ĝ
        </M>
        <M x={216} y={126} size={13} fill={RED} weight={800}>
          −g
        </M>
        <Wire d="M62 120 Q95 96, 112 118" stroke={PURP} width="2.2" marker="url(#dcArrP)" className="dcm-draw" />
        <Wire d="M146 120 Q182 96, 200 118" stroke={RED} width="2.2" marker="url(#dcArrR)" className="dcm-draw dcm-delay-2" />
        <Wire d="M26 214 L232 214" stroke={MUTED} width="1.8" />
        <g className="dcm-flip">
          <Wave x={26} y={214} w={206} amp={44} cycles={1} stroke={RED} />
        </g>
        <M x={129} y={274} size={11} fill={RED}>
          flipped copy of the original
        </M>
      </Card>
    </Scene>
  )
}

export function PreEnvelopeScene() {
  return (
    <Scene caption="The negative-frequency half annihilates; what is left is one-sided and twice as tall">
      <Wire d="M450 66 L450 470" stroke={MUTED} width="1.6" dash="6 7" />

      <L x="70" y="128" size={13} fill={MUTED} anchor="start" weight={700}>
        G(f)
      </L>
      <Wire d="M110 150 L830 150" stroke={MUTED} width="1.8" />
      <Lobe cx="300" base="150" hw="50" h="62" fill={BLUE} className="dcm-cell-in" />
      <Lobe cx="600" base="150" hw="50" h="62" fill={BLUE} className="dcm-cell-in" />
      <L x="740" y="122" size={11.5} fill={MUTED} weight={700}>
        real signal, conjugate symmetric
      </L>

      <L x="70" y="252" size={20} fill={MUTED} anchor="start">
        +
      </L>
      <L x="70" y="288" size={13} fill={MUTED} anchor="start" weight={700}>
        j·Ĝ(f)
      </L>
      <Wire d="M110 288 L830 288" stroke={MUTED} width="1.8" />
      <Lobe cx="600" base="288" hw="50" h="62" fill={PURP} className="dcm-cell-in dcm-delay-2" />
      <Lobe cx="300" base="288" hw="50" h="62" fill={PURP} invert className="dcm-cell-in dcm-delay-2" />
      <L x="740" y="260" size={11.5} fill={PURP} weight={700}>
        j times the Hilbert transform
      </L>

      <L x="70" y="392" size={20} fill={MUTED} anchor="start">
        =
      </L>
      <L x="70" y="428" size={13} fill={MUTED} anchor="start" weight={700}>
        G₊(f)
      </L>
      <Wire d="M110 428 L830 428" stroke={MUTED} width="1.8" />
      <g className="dcm-collapse">
        <Lobe cx="300" base="428" hw="50" h="44" fill={RED} />
      </g>
      <M x="300" y="452" size={11} fill={RED} weight={800}>
        cancels to zero
      </M>
      <Lobe cx="600" base="428" hw="50" h="112" fill={GREEN} className="dcm-emerge dcm-delay-3" />
      <L x="756" y="336" size={11.5} fill={GREEN} weight={800}>
        pre-envelope, one-sided
      </L>
      <M x="600" y="304" size={11} fill={GREEN} weight={800}>
        2G(f)
      </M>
    </Scene>
  )
}

export function ComplexEnvelopeScene() {
  return (
    <Scene caption="Multiply by e^(−j2πf_c t) and the band slides to baseband — the carrier is gone, the envelope is not">
      <Axes x="56" y="196" w="300" h="110" xLabel="f" origin="center" tickLabels={[[206, '0'], [306, 'f_c']]} />
      <Lobe cx="306" base="196" hw="42" h="84" fill={BLUE} label="pre-envelope" className="dcm-cell-in" />

      <Block x="382" y="148" w="136" h="52" label="× e^(−j2πf_c t)" stroke={AMBER} mono size={12} className="dcm-charge" />

      <Axes x="544" y="196" w="300" h="110" xLabel="f" origin="center" tickLabels={[[694, '0']]} />
      <Lobe cx="694" base="196" hw="42" h="84" fill={GREEN} label="complex envelope, baseband" className="dcm-emerge dcm-delay-2" />
      <g className="dcm-sweep-x" style={{ '--dcm-sweep': '388px' }}>
        <Lobe cx="306" base="196" hw="42" h="84" fill={ROSE} opacity={0.18} />
      </g>

      <Wire d="M62 296 L840 296" stroke={MUTED} width="1.6" dash="5 7" />
      <L x="70" y="322" size={12.5} fill={MUTED} anchor="start" weight={700}>
        time domain
      </L>

      <Wire d={modulatedPath(70, 400, 420, 58, 12, 1)} stroke={MUTED} width="1.8" opacity="0.45" />
      <Wire d={envelopePath(70, 400, 420, 58, 1)} stroke={AMBER} width="2.8" className="dcm-draw" />
      <M x="280" y="472" size={11.5} fill={MUTED}>
        fast carrier inside a slow outline
      </M>

      <Wire d="M508 400 L552 400" stroke={GREEN} width="2.4" marker="url(#dcArrG)" />
      <Wire d={envelopePath(570, 400, 264, 58, 1)} stroke={GREEN} width="3" className="dcm-draw dcm-delay-2" />
      <M x="702" y="472" size={11.5} fill={GREEN} weight={800}>
        |g̃(t)| — the envelope alone
      </M>
    </Scene>
  )
}

export function IqModulatorScene() {
  return (
    <Scene caption="Two real baseband signals ride one carrier because cos and sin are orthogonal">
      <Wire d="M56 150 L281 150" stroke={BLUE} width="2.5" marker="url(#dcArrB)" className="dcm-current" />
      <M x="120" y="136" size={12.5} fill={BLUE} anchor="start" weight={800}>
        g_I(t)
      </M>
      <Wire d="M56 300 L281 300" stroke={PURP} width="2.5" marker="url(#dcArrP)" className="dcm-current dcm-delay-1" />
      <M x="120" y="286" size={12.5} fill={PURP} anchor="start" weight={800}>
        g_Q(t)
      </M>

      <Mult cx="300" cy="150" className="dcm-flux" />
      <Mult cx="300" cy="300" className="dcm-flux dcm-delay-2" />

      <Block x="150" y="418" w="124" h="44" label="cos(2πf_c t)" stroke={AMBER} mono size={11.5} />
      <Block x="300" y="418" w="96" h="44" label="−90°" stroke={ROSE} className="dcm-charge" />

      <Wire d="M210 418 L210 96 L300 96 L300 133" stroke={AMBER} width="2.2" marker="url(#dcArrA)" className="dcm-current-slow" />
      <Wire d="M274 440 L296 440" stroke={AMBER} width="2.2" marker="url(#dcArrA)" />
      <Wire d="M348 418 L348 362 L300 362 L300 317" stroke={ROSE} width="2.2" marker="url(#dcArrRo)" className="dcm-current-slow dcm-delay-2" />
      <M x="410" y="372" size={11.5} fill={ROSE} anchor="start" weight={800}>
        −sin(2πf_c t)
      </M>

      <Wire d="M317 150 L430 150 L430 206" stroke={BLUE} width="2.4" marker="url(#dcArrB)" />
      <Wire d="M317 300 L430 300 L430 244" stroke={PURP} width="2.4" marker="url(#dcArrP)" />
      <Sum cx="430" cy="225" className="dcm-flux dcm-delay-3" />
      <Wire d="M447 225 L566 225" stroke={GREEN} width="2.8" marker="url(#dcArrG)" className="dcm-current dcm-delay-3" />
      <M x="506" y="208" size={12} fill={GREEN} weight={800}>
        g(t)
      </M>
      <M x="506" y="250" size={11} fill={MUTED}>
        bandpass
      </M>

      <rect x="604" y="62" width="250" height="220" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2" />
      <Plane cx="694" cy="194" r="76" xLabel="I" yLabel="Q" />
      <Wire d="M694 194 L748 140" stroke={GREEN} width="3" marker="url(#dcArrG)" className="dcm-draw" />
      <path d="M718 194 A24 24 0 0 0 711 177" fill="none" stroke={MUTED} strokeWidth="1.8" />
      <M x="736" y="188" size={11} fill={MUTED}>
        90°
      </M>
      <L x="729" y="84" size={11.5} fill={MUTED} weight={700}>
        I and Q are perpendicular
      </L>
    </Scene>
  )
}

export function PolarFormScene() {
  return (
    <Scene caption="Rectangular for the hardware, polar for the physics — the same point either way">
      <Plane cx="300" cy="226" r="118" xLabel="I = g_I" yLabel="Q = g_Q" grid />
      <Wire d="M396 154 L396 226" stroke={MUTED} width="1.7" dash="5 6" />
      <Wire d="M396 154 L300 154" stroke={MUTED} width="1.7" dash="5 6" />
      <M x="396" y="248" size={11.5} fill={MUTED}>
        g_I
      </M>
      <M x="286" y="150" size={11.5} fill={MUTED} anchor="end">
        g_Q
      </M>
      <Wire d="M300 226 L396 154" stroke={ROSE} width="3.2" marker="url(#dcArrRo)" className="dcm-draw" />
      <M x="330" y="176" size={12.5} fill={ROSE} weight={800}>
        a(t)
      </M>
      <path d="M346 226 A46 46 0 0 0 334 195" fill="none" stroke={AMBER} strokeWidth="2.4" className="dcm-draw dcm-delay-2" />
      <M x="362" y="210" size={12} fill={AMBER} weight={800}>
        φ(t)
      </M>
      <Dot cx="396" cy="154" r="7" fill={ROSE} />
      <M x="414" y="142" size={11.5} fill={ROSE} anchor="start" weight={800}>
        P
      </M>

      <rect x="490" y="86" width="360" height="72" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.3" className="dcm-slide-in" />
      <M x="670" y="116" size={12.5} fill={BLUE} weight={800}>
        a = √(g_I² + g_Q²)
      </M>
      <M x="670" y="140" size={12.5} fill={BLUE} weight={800}>
        φ = atan2(g_Q, g_I)
      </M>

      <rect x="490" y="178" width="360" height="72" rx="11" fill={WHITE} stroke={GREEN} strokeWidth="2.3" className="dcm-slide-in dcm-delay-2" />
      <M x="670" y="208" size={12.5} fill={GREEN} weight={800}>
        g_I = a cos φ
      </M>
      <M x="670" y="232" size={12.5} fill={GREEN} weight={800}>
        g_Q = a sin φ
      </M>

      <Wire d="M70 416 L840 416" stroke={MUTED} width="1.6" dash="5 7" />
      <Wire d={modulatedPath(80, 416, 750, 36, 20, 1.4)} stroke={MUTED} width="1.6" opacity="0.5" />
      <Wire d={envelopePath(80, 416, 750, 36, 1.4)} stroke={ROSE} width="2.8" className="dcm-draw dcm-delay-3" />
      <M x="450" y="478" size={11.5} fill={ROSE} weight={800}>
        a(t) is the outline you actually see on a scope
      </M>
    </Scene>
  )
}

export function AwgnModelScene() {
  return (
    <Scene caption="Three assumptions — each one is an approximation with a named failure mode">
      <Wire d="M64 136 L326 136" stroke={BLUE} width="2.6" marker="url(#dcArrB)" className="dcm-current" />
      <M x="150" y="120" size={12.5} fill={BLUE} anchor="start" weight={800}>
        s(t)
      </M>
      <rect x="330" y="82" width="240" height="108" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.4" />
      <L x="450" y="104" size={12} fill={MUTED} weight={700}>
        AWGN channel
      </L>
      <Sum cx="450" cy="136" r="19" className="dcm-flux" />
      <Wire d="M450 238 L450 160" stroke={ROSE} width="2.6" marker="url(#dcArrRo)" className="dcm-current dcm-delay-1" />
      <M x="470" y="220" size={12.5} fill={ROSE} anchor="start" weight={800}>
        w(t)
      </M>
      <Wire d="M574 136 L830 136" stroke={GREEN} width="2.6" marker="url(#dcArrG)" className="dcm-current dcm-delay-2" />
      <M x="700" y="120" size={12.5} fill={GREEN} weight={800}>
        x(t) = s(t) + w(t)
      </M>

      <Card x="44" y="262" w="258" h="180" title="Additive" accent={BLUE} className="dcm-slide-in dcm-delay-1" lines={['noise independent of s(t)']} linesY={148} foot="fails: interference">
        <Sum cx={129} cy={86} r={24} stroke={BLUE} className="dcm-charge" />
        <Wire d="M62 86 L100 86" stroke={BLUE} width="2.2" marker="url(#dcArrB)" />
        <Wire d="M129 128 L129 114" stroke={ROSE} width="2.2" marker="url(#dcArrRo)" />
        <Wire d="M158 86 L196 86" stroke={GREEN} width="2.2" marker="url(#dcArrG)" />
      </Card>

      <Card x="322" y="262" w="258" h="180" title="White" accent={AMBER} className="dcm-slide-in dcm-delay-2" lines={['uncorrelated samples']} linesY={148} foot="fails: coloured noise">
        <Wire d="M30 116 L228 116" stroke={MUTED} width="1.8" />
        <Wire d="M30 76 L228 76" stroke={AMBER} width="3" className="dcm-draw" />
        <M x={60} y={66} size={11} fill={AMBER} anchor="start" weight={800}>
          N₀/2
        </M>
        <M x={216} y={134} size={11} fill={MUTED} anchor="end">
          f
        </M>
      </Card>

      <Card x="600" y="262" w="258" h="180" title="Gaussian" accent={PURP} className="dcm-slide-in dcm-delay-3" lines={['central limit theorem']} linesY={148} foot="fails: impulsive noise">
        <Wire d="M30 118 L228 118" stroke={MUTED} width="1.8" />
        <Bell cx={129} base={118} w={168} h={68} stroke={PURP} fill={PURP} className="dcm-emerge" />
      </Card>
    </Scene>
  )
}

export function SignalSpaceScene() {
  return (
    <Scene caption="Distance in this plane is the energy of the difference waveform">
      <L x="180" y="62" size={12.5} fill={MUTED} weight={700}>
        three waveforms
      </L>
      {[
        ['s₁(t)', 130, BLUE, 1],
        ['s₂(t)', 240, AMBER, 2],
        ['s₃(t)', 350, PURP, 3],
      ].map(([label, y, tone, cycles], i) => (
        <g key={String(label)} className={`dcm-cell-in dcm-delay-${i}`}>
          <Wire d={`M70 ${y} L290 ${y}`} stroke={MUTED} width="1.5" dash="4 6" />
          <Wave x="70" y={y} w="220" amp="32" cycles={cycles} stroke={tone} />
          <M x="60" y={y + 5} size={12} fill={tone} anchor="end" weight={800}>
            {label}
          </M>
        </g>
      ))}

      <Wire d="M312 240 L404 240" stroke={GREEN} width="3.4" marker="url(#dcArrG)" className="dcm-current" />
      <L x="358" y="222" size={11.5} fill={GREEN} weight={800}>
        project onto
      </L>
      <L x="358" y="266" size={11.5} fill={GREEN} weight={800}>
        the basis
      </L>

      <Plane cx="640" cy="266" r="150" />
      <Pt cx="712" cy="198" r="9" fill={BLUE} label="s₁" labelDy={-16} vector ox="640" oy="266" className="dcm-cell-in dcm-delay-1" />
      <Pt cx="560" cy="176" r="9" fill={AMBER} label="s₂" labelDy={-16} vector ox="640" oy="266" className="dcm-cell-in dcm-delay-3" />
      <Pt cx="706" cy="356" r="9" fill={PURP} label="s₃" labelDy={22} vector ox="640" oy="266" className="dcm-cell-in dcm-delay-4" />
      <Wire d="M560 176 L560 266" stroke={AMBER} width="1.6" dash="5 6" />
      <Wire d="M560 176 L640 176" stroke={AMBER} width="1.6" dash="5 6" />
      <M x="544" y="298" size={11} fill={AMBER}>
        s₂₁
      </M>
      <M x="660" y="170" size={11} fill={AMBER} anchor="start">
        s₂₂
      </M>
      <L x="640" y="448" size={11.5} fill={MUTED} weight={700}>
        a continuous waveform is now a point
      </L>
    </Scene>
  )
}

export function GramSchmidtScene() {
  return (
    <Scene caption="If the residual g₂ is zero, s₂ added no new dimension">
      {['1 · normalise s₁', '2 · subtract the projection', '3 · normalise the residual'].map((t, i) => (
        <L key={t} x={168 + i * 282} y={66} size={12.5} fill={[BLUE, AMBER, GREEN][i]} weight={800}>
          {t}
        </L>
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x={40 + i * 282} y={80} width="262" height="330" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
      ))}

      <Wire d="M96 372 L272 372" stroke={MUTED} width="1.8" />
      <Wire d="M96 372 L96 116" stroke={MUTED} width="1.8" />
      <Wire d="M96 372 L248 250" stroke={BLUE} width="3" marker="url(#dcArrB)" className="dcm-draw" />
      <M x="208" y="238" size={12} fill={BLUE} weight={800}>
        s₁
      </M>
      <Wire d="M96 372 L172 311" stroke={GREEN} width="3.4" marker="url(#dcArrG)" className="dcm-draw dcm-delay-2" />
      <M x="140" y="344" size={11.5} fill={GREEN} weight={800}>
        φ₁
      </M>
      <M x="171" y="396" size={11} fill={MUTED}>
        φ₁ = s₁ / ‖s₁‖
      </M>

      <Wire d="M378 372 L554 372" stroke={MUTED} width="1.8" />
      <Wire d="M378 372 L378 116" stroke={MUTED} width="1.8" />
      <Wire d="M378 372 L530 250" stroke={MUTED} width="2.2" opacity="0.5" />
      <M x="512" y="240" size={11} fill={MUTED}>
        φ₁
      </M>
      <Wire d="M378 372 L470 168" stroke={AMBER} width="3" marker="url(#dcArrA)" className="dcm-draw" />
      <M x="444" y="158" size={12} fill={AMBER} weight={800}>
        s₂
      </M>
      <Wire d="M470 168 L494 288" stroke={MUTED} width="1.8" dash="5 6" />
      <M x="516" y="238" size={10.5} fill={MUTED} anchor="start">
        proj
      </M>
      <Wire d="M494 288 L470 168" stroke={ROSE} width="3.2" marker="url(#dcArrRo)" className="dcm-draw dcm-delay-3" />
      <M x="436" y="236" size={11.5} fill={ROSE} weight={800}>
        g₂ = s₂ − proj
      </M>

      <Wire d="M660 372 L836 372" stroke={MUTED} width="1.8" />
      <Wire d="M660 372 L660 116" stroke={MUTED} width="1.8" />
      <Wire d="M660 372 L784 372" stroke={GREEN} width="3.4" marker="url(#dcArrG)" className="dcm-draw" />
      <M x="730" y="396" size={11.5} fill={GREEN} weight={800}>
        φ₁
      </M>
      <Wire d="M660 372 L660 248" stroke={PURP} width="3.4" marker="url(#dcArrP)" className="dcm-draw dcm-delay-2" />
      <M x="684" y="286" size={11.5} fill={PURP} anchor="start" weight={800}>
        φ₂
      </M>
      <path d="M660 354 L678 354 L678 372" fill="none" stroke={RED} strokeWidth="2.4" className="dcm-flux dcm-delay-4" />
      <M x="750" y="176" size={11} fill={MUTED}>
        φ₂ ⟂ φ₁, unit length
      </M>
    </Scene>
  )
}

export function ConstellationEnergyScene() {
  const pts = [
    [290, 160],
    [470, 160],
    [290, 340],
    [470, 340],
  ]
  return (
    <Scene caption="An error happens when noise pushes a point across a boundary">
      <rect x="200" y="90" width="180" height="160" fill={BLUE} fillOpacity="0.07" className="dcm-fade-in" />
      <rect x="380" y="90" width="180" height="160" fill={AMBER} fillOpacity="0.07" className="dcm-fade-in dcm-delay-1" />
      <rect x="200" y="250" width="180" height="160" fill={PURP} fillOpacity="0.07" className="dcm-fade-in dcm-delay-2" />
      <rect x="380" y="250" width="180" height="160" fill={GREEN} fillOpacity="0.07" className="dcm-fade-in dcm-delay-3" />
      <Plane cx="380" cy="250" r="160" />
      <Wire d="M380 100 L380 400" stroke={MUTED} width="1.6" dash="6 7" />
      <Wire d="M212 250 L548 250" stroke={MUTED} width="1.6" dash="6 7" />
      {pts.map(([px, py], i) => (
        <Pt key={`${px}-${py}`} cx={px} cy={py} r="10" fill={i === 1 ? ROSE : BLUE} vector ox="380" oy="250" vectorTone={i === 1 ? ROSE : BLUE} className={`dcm-cell-in dcm-delay-${i}`} />
      ))}
      <M x="456" y="196" size={12.5} fill={ROSE} weight={800}>
        √E
      </M>
      {/* Drawn along the real edge between two adjacent points, clear of the
          10px markers at either end. */}
      <g className="dcm-flux dcm-delay-4">
        <Wire d="M304 160 L456 160" stroke={AMBER} width="3" marker="url(#dcArrA)" />
        <Wire d="M456 160 L304 160" stroke={AMBER} width="3" marker="url(#dcArrA)" />
      </g>
      <M x="380" y="144" size={12.5} fill={AMBER} weight={800}>
        d_min
      </M>

      <Panel
        x="606"
        y="126"
        w="252"
        title="What the picture fixes"
        accent={BLUE}
        className="dcm-slide-in dcm-delay-3"
        rows={[
          ['average energy', 'mean r²'],
          ['nearest neighbours', 'd_min'],
          ['error probability', '≈ Q(d/2σ)', ROSE],
          ['decision regions', '4 quadrants'],
          ['dimensions used', '2', GREEN],
        ]}
      />
      <L x="732" y="330" size={11.5} fill={MUTED} weight={700}>
        d_min, not the energy, sets
      </L>
      <L x="732" y="352" size={11.5} fill={MUTED} weight={700}>
        how often you make a mistake
      </L>
    </Scene>
  )
}

export function VectorChannelScene() {
  const rows = [116, 196, 276, 356]
  return (
    <Scene caption="Orthogonal basis + white noise ⇒ uncorrelated ⇒ independent, because the noise is Gaussian">
      <Wire d="M56 236 L140 236" stroke={BLUE} width="2.8" marker="url(#dcArrB)" className="dcm-current" />
      <M x="94" y="220" size={12} fill={BLUE} weight={800}>
        x(t)
      </M>
      {rows.map((y, i) => (
        <g key={y}>
          <Wire d={`M140 236 L140 ${y} L196 ${y}`} stroke={BLUE} width="2" marker="url(#dcArrB)" opacity="0.75" />
          <Mult cx="214" cy={y} r="15" className={`dcm-flux dcm-delay-${i}`} />
          <Wire d={`M214 ${y + 34} L214 ${y + 17}`} stroke={AMBER} width="2" marker="url(#dcArrA)" />
          <M x="214" y={y + 48} size={10.5} fill={AMBER} weight={800}>
            {`φ${i + 1}(t)`}
          </M>
          <Wire d={`M229 ${y} L262 ${y}`} stroke={PURP} width="2" marker="url(#dcArrP)" />
          <Integ x="264" y={y - 22} w="58" h="44" limits="0→T" className={`dcm-charge dcm-delay-${i}`} />
          <Wire d={`M322 ${y} L392 ${y}`} stroke={GREEN} width="2.2" marker="url(#dcArrG)" className={`dcm-current dcm-delay-${i}`} />
          <M x="358" y={y - 8} size={11} fill={GREEN} weight={800}>
            {`x${i + 1}`}
          </M>
          <Wire d={`M474 ${y} L560 ${y}`} stroke={MUTED} width="1.6" dash="4 6" />
          <Bell cx="640" base={y + 30} w="140" h="46" stroke={MUTED} fill={BLUE} className={`dcm-emerge dcm-delay-${i}`} />
          <M x="640" y={y + 46} size={10} fill={MUTED}>
            {`s${i + 1} ± noise`}
          </M>
        </g>
      ))}
      <rect x="394" y="94" width="80" height="326" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
      <L x="434" y="240" size={12.5} fill={GREEN} weight={800}>
        x
      </L>
      <L x="434" y="262" size={10.5} fill={MUTED} weight={700}>
        vector
      </L>
      <Tag x="648" y="58" text="σ² = N₀/2 on every axis" tone={ROSE} w="210" className="dcm-flux" />
      <L x="640" y="448" size={11.5} fill={MUTED} weight={700}>
        every bell is the same width — that is what &ldquo;white&rdquo; buys you
      </L>
    </Scene>
  )
}

export function SufficientStatScene() {
  return (
    <Scene caption="x is a sufficient statistic — the discarded part carries nothing about which signal was sent">
      <L x="336" y="82" size={13} fill={MUTED} weight={700}>
        received waveform x(t)
      </L>
      <rect x="70" y="104" width="532" height="232" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.4" />
      <rect x="70" y="104" width="186" height="232" rx="12" fill={GREEN} fillOpacity="0.16" className="dcm-fade-in" />
      <rect x="256" y="104" width="346" height="232" fill={MUTED} fillOpacity="0.12" className="dcm-fade-in dcm-delay-2" />
      <Wire d="M256 104 L256 336" stroke={N} width="2.6" className="dcm-draw" />

      <L x="163" y="196" size={12} fill={GREEN} weight={800}>
        projection onto
      </L>
      <M x="163" y="220" size={11.5} fill={GREEN} weight={800}>
        span{'{'}φ₁..φ_N{'}'}
      </M>
      <L x="163" y="246" size={11} fill={GREEN} weight={700}>
        signal + noise
      </L>

      <L x="430" y="204" size={12} fill={MUTED} weight={800}>
        residual: noise only
      </L>
      <L x="430" y="228" size={11} fill={MUTED} weight={700}>
        independent of which s_i was sent
      </L>

      <Wire d="M163 350 L163 392 L688 392 L688 300" stroke={GREEN} width="2.6" marker="url(#dcArrG)" className="dcm-current" />
      <Block x="618" y="234" w="140" h="66" label="decision" stroke={GREEN} className="dcm-flux dcm-delay-2" />
      <Wire d="M602 152 L744 152" stroke={MUTED} width="2.2" marker="url(#dcArr)" dash="7 6" />
      <circle cx="776" cy="152" r="26" fill={WHITE} stroke={RED} strokeWidth="2.6" />
      <path d="M758 134 L794 170 M794 134 L758 170" stroke={RED} strokeWidth="2.8" strokeLinecap="round" className="dcm-flux dcm-delay-3" />
      <L x="776" y="204" size={11.5} fill={RED} weight={800}>
        discard — no loss
      </L>
      <Tag x="70" y="428" text="N numbers replace a waveform" tone={BLUE} w="230" className="dcm-slide-in dcm-delay-4" />
    </Scene>
  )
}

export function MlDecisionScene() {
  const pts = [
    ['s₁', 410, 174],
    ['s₂', 250, 174],
    ['s₃', 250, 330],
    ['s₄', 410, 330],
  ]
  return (
    <Scene caption="Choose the signal with the smallest ‖x − s_i‖ — equal priors make ML the whole rule">
      <rect x="330" y="86" width="182" height="164" fill={BLUE} fillOpacity="0.08" />
      <rect x="148" y="86" width="182" height="164" fill={AMBER} fillOpacity="0.08" />
      <rect x="148" y="250" width="182" height="164" fill={PURP} fillOpacity="0.08" />
      <rect x="330" y="250" width="182" height="164" fill={GREEN} fillOpacity="0.08" />
      <Plane cx="330" cy="250" r="166" />
      <Wire d="M330 92 L330 408" stroke={N} width="2.2" className="dcm-draw" />
      <Wire d="M160 250 L500 250" stroke={N} width="2.2" className="dcm-draw dcm-delay-2" />
      {[['Z₁', 470, 112], ['Z₂', 190, 112], ['Z₃', 190, 396], ['Z₄', 470, 396]].map(([z, zx, zy]) => (
        <M key={String(z)} x={zx} y={zy} size={12.5} fill={MUTED} weight={800}>
          {z}
        </M>
      ))}
      {pts.map(([label, px, py]) => (
        <Pt key={String(label)} cx={px} cy={py} r="10" fill={BLUE} label={String(label)} labelDy={-18} />
      ))}
      <Wire d="M284 210 L410 174" stroke={MUTED} width="1.6" dash="5 6" />
      <Wire d="M284 210 L250 330" stroke={MUTED} width="1.6" dash="5 6" />
      <Wire d="M284 210 L410 330" stroke={MUTED} width="1.6" dash="5 6" />
      <Wire d="M284 210 L250 174" stroke={ROSE} width="3.4" className="dcm-flux dcm-delay-3" />
      <Dot cx="284" cy="210" r="8" fill={ROSE} className="dcm-cell-in dcm-delay-2" />
      <M x="284" y="234" size={12} fill={ROSE} weight={800}>
        x
      </M>

      <Panel
        x="566"
        y="120"
        w="292"
        title="‖x − s_i‖²"
        accent={ROSE}
        mono
        className="dcm-slide-in dcm-delay-4"
        rows={[
          ['s₁', '17.2'],
          ['s₂', '2.4', GREEN],
          ['s₃', '15.6'],
          ['s₄', '25.9'],
        ]}
      />
      <Tag x="606" y="272" text="smallest wins → decide s₂" tone={GREEN} w="212" className="dcm-flux dcm-delay-5" />
      <L x="712" y="348" size={11.5} fill={MUTED} weight={700}>
        the bisectors do not move —
      </L>
      <L x="712" y="370" size={11.5} fill={MUTED} weight={700}>
        only the received point does
      </L>
    </Scene>
  )
}

export function CorrelationReceiverScene() {
  const rows = [122, 242, 362]
  return (
    <Scene caption="One correlator per basis function — every branch integrates over exactly one symbol">
      <Wire d="M52 242 L108 242" stroke={BLUE} width="2.8" marker="url(#dcArrB)" className="dcm-current" />
      <M x="80" y="226" size={12} fill={BLUE} weight={800}>
        x(t)
      </M>
      {rows.map((y, i) => (
        <g key={y}>
          <Wire d={`M108 242 L108 ${y} L166 ${y}`} stroke={BLUE} width="2" marker="url(#dcArrB)" opacity="0.8" />
          <Mult cx="184" cy={y} r="16" className={`dcm-flux dcm-delay-${i}`} />
          <Wire d={`M184 ${y + 38} L184 ${y + 18}`} stroke={AMBER} width="2" marker="url(#dcArrA)" />
          <M x="184" y={y + 52} size={10.5} fill={AMBER} weight={800}>
            {`φ${i + 1}(t)`}
          </M>
          <Wire d={`M200 ${y} L236 ${y}`} stroke={PURP} width="2" marker="url(#dcArrP)" />
          <Integ x="238" y={y - 24} w="62" h="48" limits="0→T" className={`dcm-charge dcm-delay-${i}`} />
          <Wire d={`M300 ${y} L340 ${y}`} stroke={MUTED} width="2" />
          <Sampler x="342" y={y} className={`dcm-switch dcm-delay-${i}`} />
          <Wire d={`M376 ${y} L436 ${y}`} stroke={GREEN} width="2.2" marker="url(#dcArrG)" className={`dcm-current dcm-delay-${i}`} />
          <M x="408" y={y - 8} size={11} fill={GREEN} weight={800}>
            {`x${i + 1}`}
          </M>
        </g>
      ))}
      <rect x="440" y="150" width="226" height="184" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
      <L x="553" y="222" size={12.5} fill={GREEN} weight={800}>
        compute ‖x − s_i‖
      </L>
      <L x="553" y="250" size={12.5} fill={GREEN} weight={800}>
        choose the minimum
      </L>
      <Wire d="M666 242 L812 242" stroke={GREEN} width="2.8" marker="url(#dcArrG)" className="dcm-current dcm-delay-3" />
      <M x="740" y="224" size={12} fill={GREEN} weight={800}>
        decision
      </M>
      <rect x="678" y="366" width="200" height="72" rx="10" fill={WHITE} stroke={RED} strokeWidth="2.4" strokeDasharray="7 6" className="dcm-flux dcm-delay-4" />
      <L x="778" y="394" size={11} fill={RED} weight={800}>
        reset every T —
      </L>
      <L x="778" y="416" size={11} fill={RED} weight={800}>
        otherwise symbols smear
      </L>
      <Wire d="M676 390 L306 372" stroke={RED} width="1.8" dash="6 6" marker="url(#dcArrR)" />
    </Scene>
  )
}

export function MatchedFilterScene() {
  return (
    <Scene caption="Two circuits, one number — the matched filter sampled at T is the correlator output">
      <M x="60" y="134" size={12} fill={BLUE} anchor="start" weight={800}>
        x(t)
      </M>
      <Wire d="M56 150 L142 150" stroke={BLUE} width="2.4" marker="url(#dcArrB)" className="dcm-current" />
      <Mult cx="160" cy="150" r="16" className="dcm-flux" />
      <Wire d="M160 188 L160 168" stroke={AMBER} width="2" marker="url(#dcArrA)" />
      <M x="160" y="204" size={10.5} fill={AMBER} weight={800}>
        φ(t)
      </M>
      <Wire d="M176 150 L206 150" stroke={PURP} width="2" marker="url(#dcArrP)" />
      <Integ x="208" y="126" w="60" h="48" limits="0→T" className="dcm-charge" />
      <Wire d="M268 150 L300 150" stroke={MUTED} width="2" />
      <Sampler x="302" y="150" className="dcm-switch" />
      <Wire d="M336 150 L392 150" stroke={GREEN} width="2.2" marker="url(#dcArrG)" />
      <M x="368" y="136" size={11.5} fill={GREEN} weight={800}>
        x₁
      </M>
      <Tag x="56" y="74" text="CORRELATOR" tone={BLUE} w="124" />

      <M x="60" y="292" size={12} fill={BLUE} anchor="start" weight={800}>
        x(t)
      </M>
      <Wire d="M56 308 L140 308" stroke={BLUE} width="2.4" marker="url(#dcArrB)" className="dcm-current dcm-delay-2" />
      <Block x="142" y="282" w="158" h="52" label="h(t) = φ(T − t)" stroke={PURP} mono size={12} className="dcm-charge dcm-delay-2" />
      <Wire d="M300 308 L332 308" stroke={MUTED} width="2" />
      <Sampler x="334" y="308" className="dcm-switch dcm-delay-2" />
      <Wire d="M368 308 L392 308" stroke={GREEN} width="2.2" marker="url(#dcArrG)" />
      <M x="380" y="294" size={11.5} fill={GREEN} weight={800}>
        x₁
      </M>
      <Tag x="56" y="232" text="MATCHED FILTER" tone={PURP} w="150" />

      <L x="424" y="238" size={38} fill={GREEN} className="dcm-flux dcm-delay-3">
        =
      </L>

      <Axes x="482" y="424" w="376" h="216" xLabel="t" yLabel="output" origin="left" tickLabels={[[700, 'T']]} />
      <Curve pts={[[490, 424], [700, 232], [858, 424]]} stroke={ROSE} width="3.2" className="dcm-draw" />
      <Wire d="M700 424 L700 232" stroke={MUTED} width="1.8" dash="6 6" />
      <Dot cx="700" cy="232" r="7" fill={ROSE} className="dcm-flux dcm-delay-4" />
      <M x="700" y="216" size={11.5} fill={ROSE} weight={800}>
        peak SNR = 2E/N₀
      </M>

      <rect x="482" y="86" width="376" height="112" rx="11" fill={WHITE} stroke={MUTED} strokeWidth="2" />
      <Wave x="502" y="146" w="150" amp="30" cycles={1} stroke={BLUE} />
      <M x="577" y="184" size={10.5} fill={BLUE}>
        φ(t)
      </M>
      <g className="dcm-flip">
        <Wave x="692" y="146" w="150" amp="30" cycles={1} stroke={PURP} />
      </g>
      <M x="767" y="184" size={10.5} fill={PURP}>
        φ(T − t) — time reversed
      </M>
    </Scene>
  )
}

/* ── Module 2 — digital modulation ──────────────────────────────── */

export function QFunctionScene() {
  return (
    <Scene caption="Every error probability in this module is the area of a Gaussian tail">
      <Wire d="M62 340 L470 340" stroke={MUTED} width="2.2" marker="url(#dcArr)" />
      <Bell cx="240" base="340" w="330" h="200" stroke={BLUE} fill={BLUE} className="dcm-emerge" />
      <BellTail cx="240" base="340" w="330" h="200" from="318" fill={ROSE} className="dcm-fade-in dcm-delay-1" />
      <BellTail cx="240" base="340" w="330" h="200" from="352" fill={GREEN} opacity={0.5} className="dcm-fade-in dcm-delay-3" />
      <Wire d="M318 340 L318 190" stroke={ROSE} width="2.4" className="dcm-slide-in dcm-delay-1" />
      <Wire d="M352 340 L352 214" stroke={GREEN} width="2.4" dash="6 5" className="dcm-slide-in dcm-delay-3" />
      <M x="318" y="176" size={12} fill={ROSE} weight={800}>
        x
      </M>
      <M x="358" y="200" size={12} fill={GREEN} anchor="start" weight={800}>
        x′
      </M>
      <M x="384" y="306" size={12.5} fill={ROSE} anchor="start" weight={800}>
        Q(x)
      </M>
      <g className="dcm-flux dcm-delay-4">
        <Wire d="M320 372 L350 372" stroke={AMBER} width="2.4" marker="url(#dcArrA)" />
        <Wire d="M350 372 L320 372" stroke={AMBER} width="2.4" marker="url(#dcArrA)" />
      </g>
      <M x="336" y="398" size={11.5} fill={AMBER} weight={800}>
        1 dB more E_b/N₀
      </M>

      <Axes x="530" y="410" w="320" h="290" xLabel="argument" yLabel="log₁₀ Q" origin="left" />
      <Curve pts={[[540, 150], [840, 396]]} stroke={PURP} width="3" className="dcm-cost-curve" />
      <Dot cx="640" cy="232" r="7" fill={ROSE} className="dcm-cost-dot dcm-delay-1" />
      <Dot cx="674" cy="260" r="7" fill={GREEN} className="dcm-cost-dot dcm-delay-3" />
      <L x="690" y="120" size={11.5} fill={MUTED} weight={700}>
        roughly one decade
      </L>
      <L x="690" y="142" size={11.5} fill={MUTED} weight={700}>
        per unit of argument
      </L>
    </Scene>
  )
}

export function BpskConstellationScene() {
  return (
    <Scene caption="Two antipodal points, one basis function — the whole scheme is a sign">
      <Wire d="M62 196 L412 196" stroke={MUTED} width="2.2" marker="url(#dcArr)" />
      <M x="404" y="220" size={12} fill={MUTED}>
        φ₁
      </M>
      <Dot cx="150" cy="196" r="10" fill={BLUE} className="dcm-cell-in" />
      <Dot cx="330" cy="196" r="10" fill={BLUE} className="dcm-cell-in" />
      <M x="150" y="230" size={11.5} fill={BLUE} weight={800}>
        −√E_b
      </M>
      <M x="330" y="230" size={11.5} fill={BLUE} weight={800}>
        +√E_b
      </M>
      <g className="dcm-flux dcm-delay-1">
        <Wire d="M162 158 L318 158" stroke={AMBER} width="2.6" marker="url(#dcArrA)" />
        <Wire d="M318 158 L162 158" stroke={AMBER} width="2.6" marker="url(#dcArrA)" />
      </g>
      <M x="240" y="140" size={12.5} fill={AMBER} weight={800}>
        d = 2√E_b
      </M>
      <Wire d="M240 108 L240 254" stroke={RED} width="2.2" dash="6 6" className="dcm-slide-in dcm-delay-2" />
      <M x="252" y="272" size={11} fill={RED} anchor="start" weight={800}>
        decide by sign
      </M>

      <Wire d="M452 152 L534 152" stroke={BLUE} width="2.4" marker="url(#dcArrB)" className="dcm-current" />
      <M x="492" y="136" size={11} fill={BLUE} weight={800}>
        binary data
      </M>
      <Block x="536" y="128" w="118" h="48" label="NRZ ±1" stroke={BLUE} className="dcm-cell-in dcm-delay-1" />
      <Wire d="M654 152 L700 152" stroke={BLUE} width="2.2" marker="url(#dcArrB)" />
      <Mult cx="718" cy="152" className="dcm-flux dcm-delay-2" />
      <Wire d="M718 214 L718 169" stroke={AMBER} width="2.2" marker="url(#dcArrA)" />
      <Block x="628" y="216" w="180" h="44" label="√(2/T_b)·cos(2πf_c t)" stroke={AMBER} mono size={11} />
      <Wire d="M735 152 L866 152" stroke={GREEN} width="2.6" marker="url(#dcArrG)" className="dcm-current dcm-delay-2" />
      <M x="800" y="136" size={11.5} fill={GREEN} weight={800}>
        BPSK
      </M>

      <Wire d="M62 384 L866 384" stroke={MUTED} width="1.5" dash="5 7" />
      <Wire d={sinePath(66, 384, 366, 44, 5)} stroke={BLUE} width="2.4" />
      <Wire d={sinePath(432, 384, 366, 44, 5, Math.PI)} stroke={PURP} width="2.4" />
      <circle cx="432" cy="384" r="30" fill="none" stroke={RED} strokeWidth="2.8" className="dcm-flux dcm-delay-3" />
      <M x="432" y="444" size={11.5} fill={RED} weight={800}>
        180° phase reversal at the bit boundary
      </M>
    </Scene>
  )
}

export function BpskErrorScene() {
  return (
    <Scene caption="σ = √(N₀/2) per dimension, so the tail is Q(√(2E_b/N₀)) — nothing else enters">
      <Wire d="M62 330 L520 330" stroke={MUTED} width="2.2" marker="url(#dcArr)" />
      <Bell cx="200" base="330" w="300" h="150" stroke={BLUE} fill={BLUE} className="dcm-emerge" />
      <Bell cx="372" base="330" w="300" h="150" stroke={PURP} fill={PURP} className="dcm-emerge dcm-delay-1" />
      <BellTail cx="372" base="330" w="300" h="150" from="286" side="left" fill={RED} className="dcm-fade-in dcm-delay-3" />
      <Wire d="M286 350 L286 156" stroke={RED} width="2.4" dash="6 6" className="dcm-slide-in dcm-delay-2" />
      <M x="286" y="142" size={11.5} fill={RED} weight={800}>
        threshold 0
      </M>
      <Dot cx="200" cy="330" r="8" fill={BLUE} />
      <Dot cx="372" cy="330" r="8" fill={PURP} />
      <M x="200" y="358" size={11.5} fill={BLUE} weight={800}>
        −√E_b
      </M>
      <M x="372" y="358" size={11.5} fill={PURP} weight={800}>
        +√E_b
      </M>
      <g className="dcm-flux dcm-delay-4">
        <Wire d="M296 388 L364 388" stroke={AMBER} width="2.4" marker="url(#dcArrA)" />
        <Wire d="M364 388 L296 388" stroke={AMBER} width="2.4" marker="url(#dcArrA)" />
      </g>
      <M x="330" y="412" size={11.5} fill={AMBER} weight={800}>
        √E_b
      </M>
      <M x="180" y="440" size={11.5} fill={MUTED} anchor="start" weight={800}>
        σ = √(N₀/2)
      </M>
      <M x="66" y="200" size={11} fill={RED} anchor="start" weight={800}>
        P(error | 1 sent)
      </M>

      <Panel
        x="560"
        y="128"
        w="298"
        title="P_b = Q(√(2E_b/N₀))"
        accent={GREEN}
        mono
        className="dcm-slide-in dcm-delay-3"
        rows={[
          ['E_b/N₀ = 7 dB', '7.7e−4'],
          ['E_b/N₀ = 9.6 dB', '1.0e−5', GREEN],
          ['E_b/N₀ = 12 dB', '9.0e−9'],
        ]}
      />
      <L x="709" y="278" size={11.5} fill={MUTED} weight={700}>
        2.6 dB buys three decades —
      </L>
      <L x="709" y="300" size={11.5} fill={MUTED} weight={700}>
        that is the waterfall in one line
      </L>
    </Scene>
  )
}

export function QpskGrayScene() {
  const pts = [
    ['00', 385, 165],
    ['01', 215, 165],
    ['11', 215, 335],
    ['10', 385, 335],
  ]
  return (
    <Scene caption="Gray labelling: adjacent symbols differ in one bit, so one symbol error costs one bit">
      <Plane cx="300" cy="250" r="168" xLabel="I" yLabel="Q" />
      <circle cx="300" cy="250" r="120" fill="none" stroke={MUTED} strokeWidth="1.8" strokeDasharray="6 7" />
      <Wire d="M300 92 L300 408" stroke={RED} width="1.6" dash="5 7" />
      <Wire d="M142 250 L458 250" stroke={RED} width="1.6" dash="5 7" />
      {pts.map(([label, px, py], i) => (
        <Pt key={String(label)} cx={px} cy={py} r="11" fill={BLUE} label={String(label)} labelDy={py < 250 ? -20 : 26} className={`dcm-cell-in dcm-delay-${i}`} />
      ))}
      <Wire d="M215 165 L385 165" stroke={GREEN} width="2.6" className="dcm-draw" />
      <Wire d="M215 335 L385 335" stroke={GREEN} width="2.6" className="dcm-draw dcm-delay-2" />
      <Wire d="M215 165 L215 335" stroke={GREEN} width="2.6" className="dcm-draw dcm-delay-1" />
      <Wire d="M385 165 L385 335" stroke={GREEN} width="2.6" className="dcm-draw dcm-delay-3" />
      <M x="300" y="156" size={10.5} fill={GREEN} weight={800}>
        1 bit differs
      </M>
      <Wire d="M215 165 L385 335" stroke={MUTED} width="1.6" dash="5 6" opacity="0.6" />
      <Wire d="M385 165 L215 335" stroke={MUTED} width="1.6" dash="5 6" opacity="0.6" />
      <M x="300" y="272" size={10.5} fill={MUTED}>
        2 bits differ — unlikely
      </M>

      <Panel
        x="560"
        y="120"
        w="298"
        title="Bit errors per symbol error"
        accent={AMBER}
        className="dcm-slide-in dcm-delay-4"
        rows={[
          ['Gray 00 01 11 10', '1', GREEN],
          ['natural 00 01 10 11', '1 or 2', RED],
          ['BER ≈ SER / log₂M', 'Gray only', GREEN],
          ['same points, same P_e', 'relabel only'],
        ]}
      />
      <L x="709" y="288" size={11.5} fill={MUTED} weight={700}>
        Gray mapping changes no geometry —
      </L>
      <L x="709" y="310" size={11.5} fill={MUTED} weight={700}>
        only which bits pay for a slip
      </L>
    </Scene>
  )
}

export function QpskPairScene() {
  return (
    <Scene caption="The demodulator is the modulator run backwards — and the two branches decide independently">
      <Wire d="M450 88 L450 434" stroke={MUTED} width="1.8" dash="7 7" />
      <L x="450" y="74" size={12} fill={MUTED} weight={800}>
        exact inverse
      </L>

      <Tag x="52" y="100" text="MODULATOR" tone={BLUE} w="124" />
      <Wire d="M52 250 L94 250" stroke={BLUE} width="2.4" marker="url(#dcArrB)" className="dcm-current" />
      <Block x="96" y="226" w="66" h="48" label="S/P" stroke={BLUE} />
      <Wire d="M162 238 L206 170" stroke={BLUE} width="2" marker="url(#dcArrB)" />
      <Wire d="M162 262 L206 330" stroke={PURP} width="2" marker="url(#dcArrP)" />
      <Mult cx="224" cy="170" r="15" className="dcm-flux" />
      <Mult cx="224" cy="330" r="15" className="dcm-flux dcm-delay-2" />
      <M x="224" y="204" size={10} fill={AMBER} weight={800}>
        cos
      </M>
      <M x="224" y="308" size={10} fill={ROSE} weight={800}>
        −sin
      </M>
      <Wire d="M239 170 L326 170 L326 236" stroke={BLUE} width="2" marker="url(#dcArrB)" />
      <Wire d="M239 330 L326 330 L326 264" stroke={PURP} width="2" marker="url(#dcArrP)" />
      <Sum cx="326" cy="250" r="15" className="dcm-flux dcm-delay-3" />
      <Wire d="M341 250 L414 250" stroke={GREEN} width="2.4" marker="url(#dcArrG)" className="dcm-current dcm-delay-3" />
      <M x="380" y="234" size={11} fill={GREEN} weight={800}>
        QPSK
      </M>

      <Tag x="724" y="100" text="DEMODULATOR" tone={GREEN} w="134" />
      <Wire d="M486 250 L520 250" stroke={BLUE} width="2.4" marker="url(#dcArrB)" className="dcm-current dcm-delay-1" />
      <M x="503" y="234" size={11} fill={BLUE} weight={800}>
        r(t)
      </M>
      <Wire d="M520 250 L520 170 L546 170" stroke={BLUE} width="2" marker="url(#dcArrB)" />
      <Wire d="M520 250 L520 330 L546 330" stroke={PURP} width="2" marker="url(#dcArrP)" />
      <Mult cx="564" cy="170" r="15" className="dcm-flux dcm-delay-1" />
      <Mult cx="564" cy="330" r="15" className="dcm-flux dcm-delay-3" />
      <M x="564" y="204" size={10} fill={AMBER} weight={800}>
        cos
      </M>
      <M x="564" y="308" size={10} fill={ROSE} weight={800}>
        −sin
      </M>
      <Integ x="590" y="146" w="52" h="48" limits="0→T" className="dcm-charge dcm-delay-1" />
      <Integ x="590" y="306" w="52" h="48" limits="0→T" className="dcm-charge dcm-delay-3" />
      <Block x="656" y="148" w="60" h="44" label="sign" stroke={RED} className="dcm-flux dcm-delay-4" />
      <Block x="656" y="308" w="60" h="44" label="sign" stroke={RED} className="dcm-flux dcm-delay-4" />
      <Wire d="M716 170 L756 170 L756 236" stroke={RED} width="2" marker="url(#dcArrR)" />
      <Wire d="M716 330 L756 330 L756 264" stroke={RED} width="2" marker="url(#dcArrR)" />
      <Block x="756" y="226" w="66" h="48" label="P/S" stroke={GREEN} />
      <Wire d="M822 250 L866 250" stroke={GREEN} width="2.4" marker="url(#dcArrG)" className="dcm-current dcm-delay-4" />
      <M x="844" y="234" size={11} fill={GREEN} weight={800}>
        data
      </M>
      <L x="450" y="466" size={11.5} fill={MUTED} weight={700}>
        two independent BPSK links sharing one carrier — P_b is unchanged, the rate doubles
      </L>
    </Scene>
  )
}

export function MpskWedgeScene() {
  const cx = 276
  const cy = 250
  const R = 136
  const pt = (k, m, r) => [cx + r * Math.cos((2 * Math.PI * k) / m), cy - r * Math.sin((2 * Math.PI * k) / m)]
  const wedge = (k) => {
    const a0 = (2 * Math.PI * (k - 0.5)) / 8
    const a1 = (2 * Math.PI * (k + 0.5)) / 8
    const p0 = [cx + R * Math.cos(a0), cy - R * Math.sin(a0)]
    const p1 = [cx + R * Math.cos(a1), cy - R * Math.sin(a1)]
    return `M${cx} ${cy} L${p0[0].toFixed(1)} ${p0[1].toFixed(1)} A${R} ${R} 0 0 0 ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} Z`
  }
  const i0 = pt(0, 8, 110)
  const i1 = pt(1, 8, 110)
  return (
    <Scene caption="Double M and the chord shrinks by about half — that is the whole M-ary PSK story">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
        <path key={k} d={wedge(k)} fill={k % 2 ? BLUE : AMBER} fillOpacity="0.07" className={`dcm-fade-in dcm-delay-${k % 5}`} />
      ))}
      <circle cx={cx} cy={cy} r={110} fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="6 7" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
        const [bx, by] = pt(k + 0.5, 8, R)
        return <Wire key={`b${k}`} d={`M${cx} ${cy} L${bx.toFixed(1)} ${by.toFixed(1)}`} stroke={RED} width="1.6" dash="5 6" opacity="0.7" />
      })}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
        const [px, py] = pt(k, 8, 110)
        return <Dot key={`p${k}`} cx={px.toFixed(1)} cy={py.toFixed(1)} r="8" fill={BLUE} className={`dcm-cell-in dcm-delay-${k % 5}`} />
      })}
      <Wire d={`M${i0[0].toFixed(1)} ${i0[1].toFixed(1)} L${i1[0].toFixed(1)} ${i1[1].toFixed(1)}`} stroke={GREEN} width="4" className="dcm-flux dcm-delay-3" />
      <M x="404" y="176" size={12} fill={GREEN} anchor="start" weight={800}>
        d_min = 2√E·sin(π/M)
      </M>
      <M x={cx} y={cy + 190} size={11.5} fill={MUTED} weight={800}>
        M = 8 — eight wedges
      </M>

      <rect x="600" y="98" width="272" height="216" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2" />
      <circle cx="736" cy="210" r="72" fill="none" stroke={MUTED} strokeWidth="1.8" strokeDasharray="6 7" />
      {[0, 1, 2, 3].map((k) => {
        const px = 736 + 72 * Math.cos((Math.PI * k) / 2 + Math.PI / 4)
        const py = 210 - 72 * Math.sin((Math.PI * k) / 2 + Math.PI / 4)
        return <Dot key={`q${k}`} cx={px.toFixed(1)} cy={py.toFixed(1)} r="7" fill={PURP} />
      })}
      <Wire d="M786.9 159.1 L685.1 159.1" stroke={GREEN} width="4" className="dcm-flux dcm-delay-4" />
      <L x="736" y="120" size={11.5} fill={MUTED} weight={800}>
        M = 4 — same radius, longer chord
      </L>
      <Panel
        x="600"
        y="330"
        w="272"
        title="Cost of packing the circle"
        accent={ROSE}
        mono
        className="dcm-slide-in dcm-delay-4"
        rows={[
          ['M = 4', 'd = 1.41√E'],
          ['M = 8', 'd = 0.77√E'],
          ['M = 16', 'd = 0.39√E', RED],
        ]}
      />
    </Scene>
  )
}

export function PowerBandwidthScene() {
  const pts = [
    ['BPSK', 268, 380, 1],
    ['QPSK', 268, 316, 2],
    ['8-PSK', 372, 252, 3],
    ['16-PSK', 508, 188, 4],
    ['32-PSK', 660, 124, 5],
  ]
  return (
    <Scene caption="Past QPSK every extra bit per symbol is bought with power — the curve only bends right">
      <Axes x="120" y="420" w="720" h="340" xLabel="E_b/N₀ for P_b = 10⁻⁵ (dB)" yLabel="bit/s/Hz" origin="left" />
      <rect x="120" y="82" width="46" height="338" fill={RED} fillOpacity="0.1" className="dcm-fade-in" />
      <Wire d="M166 420 L166 82" stroke={RED} width="2.4" dash="6 6" className="dcm-slide-in" />
      <M x="182" y="102" size={11} fill={RED} anchor="start" weight={800}>
        Shannon bound −1.6 dB
      </M>
      <Curve pts={pts.map(([, px, py]) => [px, py])} stroke={BLUE} width="3" className="dcm-cost-curve dcm-delay-2" />
      {pts.map(([label, px, py], i) => (
        <g key={String(label)}>
          <Dot cx={px} cy={py} r="8" fill={BLUE} className={`dcm-cost-dot dcm-delay-${i}`} />
          <M x={Number(px) + 14} y={Number(py) - 10} size={11.5} fill={BLUE} anchor="start" weight={800}>
            {String(label)}
          </M>
        </g>
      ))}
      {[
        ['+0 dB', 268, 348, GREEN],
        ['+3.6 dB', 320, 284, AMBER],
        ['+4.5 dB', 440, 220, RED],
      ].map(([label, lx, ly, tone]) => (
        <M key={String(label)} x={lx} y={ly} size={11} fill={tone} anchor="end" weight={800}>
          {String(label)}
        </M>
      ))}
      <Tag x="640" y="356" text="bandwidth cheap → stay at QPSK" tone={GREEN} w="216" className="dcm-slide-in dcm-delay-4" />
      <Tag x="640" y="396" text="bandwidth scarce → pay in dB" tone={ROSE} w="216" className="dcm-slide-in dcm-delay-5" />
    </Scene>
  )
}

export function QamPackingScene() {
  const lattice = []
  for (let r = 0; r < 4; r += 1) for (let c = 0; c < 4; c += 1) lattice.push([560 + (c - 1.5) * 56, 232 + (r - 1.5) * 56])
  return (
    <Scene caption="16 points, same average energy — the lattice uses the interior, the circle does not">
      <Plane cx="210" cy="232" r="132" xLabel="I" yLabel="Q" />
      <circle cx="210" cy="232" r="104" fill="none" stroke={MUTED} strokeWidth="1.8" strokeDasharray="6 7" />
      {Array.from({ length: 16 }, (_, k) => {
        const a = (2 * Math.PI * k) / 16
        return <Dot key={k} cx={(210 + 104 * Math.cos(a)).toFixed(1)} cy={(232 - 104 * Math.sin(a)).toFixed(1)} r="6" fill={ROSE} className={`dcm-cell-in dcm-delay-${k % 5}`} />
      })}
      <Wire d="M314 232 L305.8 191.8" stroke={GREEN} width="4" className="dcm-flux dcm-delay-2" />
      <M x="210" y="392" size={11.5} fill={ROSE} weight={800}>
        16-PSK — d = 0.39√E
      </M>

      <Plane cx="560" cy="232" r="132" xLabel="I" yLabel="Q" />
      {lattice.map(([px, py], k) => (
        <Dot key={k} cx={px.toFixed(1)} cy={py.toFixed(1)} r="6" fill={BLUE} className={`dcm-cell-in dcm-delay-${k % 5}`} />
      ))}
      <Wire d="M476 148 L532 148" stroke={GREEN} width="4" className="dcm-flux dcm-delay-3" />
      <M x="560" y="392" size={11.5} fill={BLUE} weight={800}>
        16-QAM — d = 0.63√E
      </M>

      <Bars
        x="300"
        y="418"
        w="260"
        rowH={32}
        max={0.7}
        items={[
          ['16-PSK', 0.39, ROSE],
          ['16-QAM', 0.63, BLUE],
        ]}
      />
      <M x="640" y="440" size={11.5} fill={GREEN} anchor="start" weight={800}>
        +4.2 dB
      </M>

      <rect x="708" y="96" width="176" height="104" rx="11" fill={WHITE} stroke={RED} strokeWidth="2.4" className="dcm-slide-in dcm-delay-4" />
      <L x="796" y="124" size={11.5} fill={RED} weight={800}>
        envelope varies
      </L>
      <M x="796" y="150" size={11.5} fill={RED} weight={800}>
        PAPR 2.55
      </M>
      <L x="796" y="176" size={11} fill={RED} weight={700}>
        back off the amplifier
      </L>
    </Scene>
  )
}

export function QamPskCrossoverScene() {
  const xs = { 4: 180, 8: 320, 16: 460, 32: 600, 64: 740 }
  const y = (db) => 400 - (db - 9.6) * 14.5
  const psk = [
    [xs[4], y(9.6)],
    [xs[8], y(13.0)],
    [xs[16], y(17.5)],
    [xs[32], y(22.4)],
    [xs[64], y(27.5)],
  ]
  const qam = [
    [xs[4], y(9.6)],
    [xs[8], y(10.8)],
    [xs[16], y(13.4)],
    [xs[32], y(15.6)],
    [xs[64], y(17.8)],
  ]
  return (
    <Scene caption="QAM wins by more and more as M grows — until the amplifier back-off is subtracted">
      <Axes x="120" y="420" w="720" h="352" xLabel="M (log scale)" yLabel="E_b/N₀ for 10⁻⁵ (dB)" origin="left" tickLabels={[[180, '4'], [320, '8'], [460, '16'], [600, '32'], [740, '64']]} />
      <Curve pts={qam.map(([px, py]) => [px, py - 29])} stroke={GREEN} width="8" opacity="0.16" className="dcm-fade-in dcm-delay-4" />
      <Curve pts={psk} stroke={ROSE} width="3.2" className="dcm-cost-curve" />
      <Curve pts={qam} stroke={BLUE} width="3.2" className="dcm-cost-curve dcm-delay-2" />
      {psk.map(([px, py], i) => (
        <Dot key={`p${i}`} cx={px} cy={py.toFixed(1)} r="6" fill={ROSE} />
      ))}
      {qam.map(([px, py], i) => (
        <Dot key={`q${i}`} cx={px} cy={py.toFixed(1)} r="6" fill={BLUE} />
      ))}
      <M x="770" y={y(27.5).toFixed(1)} size={11.5} fill={ROSE} anchor="start" weight={800}>
        PSK
      </M>
      <M x="770" y={y(17.8).toFixed(1)} size={11.5} fill={BLUE} anchor="start" weight={800}>
        QAM
      </M>
      <circle cx={xs[4]} cy={y(9.6)} r="14" fill="none" stroke={AMBER} strokeWidth="2.6" className="dcm-flux dcm-delay-3" />
      <M x="196" y="386" size={11} fill={AMBER} anchor="start" weight={800}>
        M = 4: identical constellation
      </M>
      <g className="dcm-flux dcm-delay-4">
        <Wire d={`M478 ${y(17.5).toFixed(1)} L478 ${y(13.4).toFixed(1)}`} stroke={AMBER} width="2.4" marker="url(#dcArrA)" />
        <Wire d={`M478 ${y(13.4).toFixed(1)} L478 ${y(17.5).toFixed(1)}`} stroke={AMBER} width="2.4" marker="url(#dcArrA)" />
      </g>
      <M x="492" y={y(15.4).toFixed(1)} size={11} fill={AMBER} anchor="start" weight={800}>
        4.2 dB
      </M>
      <g className="dcm-flux dcm-delay-5">
        <Wire d={`M758 ${y(27.5).toFixed(1)} L758 ${y(17.8).toFixed(1)}`} stroke={GREEN} width="2.4" marker="url(#dcArrG)" />
        <Wire d={`M758 ${y(17.8).toFixed(1)} L758 ${y(27.5).toFixed(1)}`} stroke={GREEN} width="2.4" marker="url(#dcArrG)" />
      </g>
      <M x="772" y={y(22.6).toFixed(1)} size={11} fill={GREEN} anchor="start" weight={800}>
        9.7 dB
      </M>
      <M x="300" y="118" size={11.5} fill={MUTED} anchor="start" weight={700}>
        shaded band = the advantage you give back to amplifier back-off
      </M>
    </Scene>
  )
}

export function BfskGeometryScene() {
  return (
    <Scene caption="Orthogonal beats nothing, antipodal beats orthogonal — the gap is exactly 3 dB">
      <Plane cx="280" cy="246" r="146" xLabel="φ₁ (f₁)" yLabel="φ₂ (f₂)" />
      <path d="M280 226 L300 226 L300 246" fill="none" stroke={RED} strokeWidth="2.4" className="dcm-flux dcm-delay-3" />
      <Dot cx="386" cy="246" r="10" fill={BLUE} className="dcm-cell-in" />
      <Dot cx="280" cy="140" r="10" fill={BLUE} className="dcm-cell-in dcm-delay-1" />
      <Wire d="M280 140 L386 246" stroke={GREEN} width="3.6" className="dcm-draw dcm-delay-2" />
      <M x="356" y="176" size={11.5} fill={GREEN} anchor="start" weight={800}>
        d = √(2E_b)
      </M>
      <Dot cx="174" cy="300" r="8" fill={MUTED} opacity="0.55" />
      <Dot cx="386" cy="300" r="8" fill={MUTED} opacity="0.55" />
      <Wire d="M174 300 L386 300" stroke={ROSE} width="3" dash="7 6" opacity="0.75" className="dcm-draw dcm-delay-4" />
      <M x="280" y="326" size={11} fill={ROSE} weight={800}>
        BPSK for comparison: d = 2√E_b
      </M>

      <Panel
        x="560"
        y="110"
        w="298"
        title="Orthogonal vs antipodal"
        accent={GREEN}
        mono
        className="dcm-slide-in dcm-delay-3"
        rows={[
          ['BFSK d²', '2E_b'],
          ['BPSK d²', '4E_b', GREEN],
          ['ratio', '2 → 3 dB', ROSE],
          ['BFSK P_b', 'Q(√(E_b/N₀))'],
          ['BPSK P_b', 'Q(√(2E_b/N₀))'],
        ]}
      />

      <Wire d="M62 444 L866 444" stroke={MUTED} width="1.5" dash="5 7" />
      <Wire d={sinePath(66, 444, 200, 26, 3)} stroke={BLUE} width="2.2" />
      <Wire d={sinePath(266, 444, 200, 26, 6)} stroke={PURP} width="2.2" />
      <Wire d={sinePath(466, 444, 200, 26, 3)} stroke={BLUE} width="2.2" />
      <Wire d={sinePath(666, 444, 200, 26, 6)} stroke={PURP} width="2.2" />
      {[266, 466, 666].map((bx) => (
        <Wire key={bx} d={`M${bx} 410 L${bx} 478`} stroke={RED} width="1.6" dash="4 5" />
      ))}
    </Scene>
  )
}

export function BfskDetectorScene() {
  return (
    <Scene caption="Subtracting two independent branches doubles the variance — that is the other half of the 3 dB">
      <Wire d="M52 250 L104 250" stroke={BLUE} width="2.6" marker="url(#dcArrB)" className="dcm-current" />
      <M x="78" y="234" size={11.5} fill={BLUE} weight={800}>
        r(t)
      </M>
      {[
        [150, 'φ₁ = cos(2πf₁t)', AMBER, 0],
        [350, 'φ₂ = cos(2πf₂t)', ROSE, 2],
      ].map(([y, label, tone, d]) => (
        <g key={String(label)}>
          <Wire d={`M104 250 L104 ${y} L150 ${y}`} stroke={BLUE} width="2" marker="url(#dcArrB)" opacity="0.8" />
          <Mult cx="168" cy={y} r="15" className={`dcm-flux dcm-delay-${d}`} />
          <Wire d={`M168 ${Number(y) + 36} L168 ${Number(y) + 17}`} stroke={tone} width="2" marker={`url(#${markerFor(tone)})`} />
          <M x="168" y={Number(y) + 52} size={10} fill={tone} weight={800}>
            {String(label)}
          </M>
          <Wire d={`M183 ${y} L212 ${y}`} stroke={PURP} width="2" marker="url(#dcArrP)" />
          <Integ x="214" y={Number(y) - 24} w="54" h="48" limits="0→T_b" className={`dcm-charge dcm-delay-${d}`} />
          <Wire d={`M268 ${y} L300 ${y}`} stroke={MUTED} width="2" />
          <Sampler x="302" y={y} label="t = T_b" className={`dcm-switch dcm-delay-${d}`} />
          <Wire d={`M336 ${y} L390 ${y} L390 ${Number(y) < 250 ? 232 : 268}`} stroke={GREEN} width="2.2" marker="url(#dcArrG)" />
        </g>
      ))}
      <Sum cx="390" cy="250" r="17" sign="−" stroke={ROSE} className="dcm-flux dcm-delay-3" />
      <M x="390" y="292" size={10.5} fill={ROSE} weight={800}>
        x₁ − x₂
      </M>
      <Wire d="M407 250 L438 250" stroke={ROSE} width="2.2" marker="url(#dcArrRo)" />
      <Block x="440" y="226" w="82" h="48" label="≷ 0" stroke={RED} className="dcm-flux dcm-delay-4" />
      <Wire d="M522 250 L570 250" stroke={GREEN} width="2.4" marker="url(#dcArrG)" className="dcm-current dcm-delay-4" />
      <M x="546" y="234" size={10.5} fill={GREEN} weight={800}>
        decision
      </M>

      <Wire d="M590 392 L872 392" stroke={MUTED} width="2" marker="url(#dcArr)" />
      <Bell cx="656" base="392" w="150" h="112" stroke={PURP} fill={PURP} className="dcm-emerge dcm-delay-3" />
      <Bell cx="800" base="392" w="150" h="112" stroke={BLUE} fill={BLUE} className="dcm-emerge dcm-delay-3" />
      <BellTail cx="800" base="392" w="150" h="112" from="728" side="left" fill={RED} className="dcm-fade-in dcm-delay-5" />
      <Wire d="M728 404 L728 254" stroke={RED} width="2.2" dash="6 6" />
      <M x="656" y="418" size={10.5} fill={PURP} weight={800}>
        −√E_b
      </M>
      <M x="800" y="418" size={10.5} fill={BLUE} weight={800}>
        +√E_b
      </M>
      <M x="731" y="240" size={11} fill={RED} weight={800}>
        variance N₀, not N₀/2
      </M>
    </Scene>
  )
}

export function BerWaterfallScene() {
  const yOf = (e) => 110 + (e - 1) * 38
  const xOf = (db) => 112 + db * 47
  const base = [
    [0.0, 1],
    [4.3, 2],
    [6.8, 3],
    [8.4, 4],
    [9.6, 5],
    [10.5, 6],
    [11.3, 7],
    [12.0, 8],
  ]
  const shift = (d) => base.map(([db, e]) => [xOf(db + d), yOf(e)])
  const schemes = [
    ['BPSK / QPSK', 0, BLUE],
    ['DPSK', 0.9, PURP],
    ['coherent BFSK', 3.0, AMBER],
    ['noncoherent BFSK', 4.0, ROSE],
  ]
  return (
    <Scene caption="One chart, four schemes — every horizontal gap is the price of a weaker receiver">
      <Axes x="112" y="400" w="740" h="300" xLabel="E_b/N₀ (dB)" yLabel="BER" origin="left" tickLabels={[[xOf(0), '0'], [xOf(5), '5'], [xOf(10), '10'], [xOf(15), '15']]} />
      {[1, 2, 3, 4, 5, 6, 7, 8].map((e) => (
        <g key={e}>
          <Wire d={`M112 ${yOf(e)} L852 ${yOf(e)}`} stroke={MUTED} width="1" dash="3 7" opacity="0.4" />
          <M x="104" y={yOf(e) + 4} size={10} fill={MUTED} anchor="end">
            {`10⁻${e}`}
          </M>
        </g>
      ))}
      <Wire d={`M112 ${yOf(5)} L852 ${yOf(5)}`} stroke={RED} width="2" dash="7 6" className="dcm-slide-in dcm-delay-4" />
      {schemes.map(([label, d, tone], i) => (
        <g key={String(label)}>
          <Curve pts={shift(Number(d))} stroke={tone} width="3" className={`dcm-cost-curve dcm-delay-${i}`} />
          <Dot cx={xOf(9.6 + Number(d)).toFixed(1)} cy={yOf(5)} r="7" fill={tone} className={`dcm-cost-dot dcm-delay-${i}`} />
          <rect x="132" y={300 + i * 24} width="14" height="4" rx="2" fill={tone} />
          <L x="154" y={308 + i * 24} size={11.5} fill={tone} anchor="start" weight={800}>
            {String(label)}
          </L>
          <M x={xOf(9.6 + Number(d)).toFixed(1)} y={yOf(5) - 14} size={10} fill={tone} weight={800}>
            {`${(9.6 + Number(d)).toFixed(1)} dB`}
          </M>
        </g>
      ))}
      <M x="640" y="106" size={11} fill={MUTED} anchor="start" weight={700}>
        read across at 10⁻⁵:
      </M>
      <M x="640" y="128" size={11} fill={MUTED} anchor="start" weight={700}>
        DPSK +0.9, BFSK +3, noncoh +4 dB
      </M>
    </Scene>
  )
}

export function NoncoherentEnvelopeScene() {
  return (
    <Scene caption="Compare lengths, ignore angles — that is exactly what giving up the phase reference costs and buys">
      <Wire d="M52 240 L104 240" stroke={BLUE} width="2.6" marker="url(#dcArrB)" className="dcm-current" />
      <M x="78" y="224" size={11.5} fill={BLUE} weight={800}>
        r(t)
      </M>
      {[
        [150, 'cos(2πf₁t)', AMBER, 'x_I', 0],
        [330, 'sin(2πf₁t)', ROSE, 'x_Q', 2],
      ].map(([y, carrier, tone, out, d]) => (
        <g key={String(carrier)}>
          <Wire d={`M104 240 L104 ${y} L150 ${y}`} stroke={BLUE} width="2" marker="url(#dcArrB)" opacity="0.8" />
          <Mult cx="168" cy={y} r="15" className={`dcm-flux dcm-delay-${d}`} />
          <Wire d={`M168 ${Number(y) + 36} L168 ${Number(y) + 17}`} stroke={tone} width="2" marker={`url(#${markerFor(tone)})`} />
          <M x="168" y={Number(y) + 52} size={10} fill={tone} weight={800}>
            {String(carrier)}
          </M>
          <Integ x="196" y={Number(y) - 24} w="54" h="48" limits="0→T_b" className={`dcm-charge dcm-delay-${d}`} />
          <Wire d={`M250 ${y} L286 ${y}`} stroke={MUTED} width="2" />
          <Sampler x="288" y={y} label="t = T_b" className={`dcm-switch dcm-delay-${d}`} />
          <Wire d={`M322 ${y} L400 ${y} L400 ${Number(y) < 240 ? 204 : 276}`} stroke={GREEN} width="2.2" marker="url(#dcArrG)" />
          <M x="348" y={Number(y) - 10} size={10.5} fill={GREEN} weight={800}>
            {String(out)}
          </M>
        </g>
      ))}
      <Block x="336" y="204" w="140" h="72" label="√(x_I² + x_Q²)" stroke={GREEN} mono size={12} className="dcm-charge dcm-delay-3" />
      <Wire d="M476 240 L536 240" stroke={GREEN} width="2.6" marker="url(#dcArrG)" className="dcm-current dcm-delay-3" />
      <M x="506" y="224" size={10.5} fill={GREEN} weight={800}>
        envelope
      </M>

      <circle cx="700" cy="250" r="118" fill="none" stroke={MUTED} strokeWidth="1.8" strokeDasharray="6 7" />
      <Dot cx="700" cy="250" r="5" fill={MUTED} />
      {[22, 74, 148, 212, 290].map((a, i) => {
        const rad = (a * Math.PI) / 180
        return (
          <Wire
            key={a}
            d={`M700 250 L${(700 + 118 * Math.cos(rad)).toFixed(1)} ${(250 - 118 * Math.sin(rad)).toFixed(1)}`}
            stroke={MUTED}
            width="2"
            opacity="0.4"
            className={`dcm-fade-in dcm-delay-${i}`}
          />
        )
      })}
      <Wire d="M700 250 L802 191" stroke={ROSE} width="3.4" marker="url(#dcArrRo)" className="dcm-draw dcm-delay-4" />
      <M x="700" y="398" size={11.5} fill={ROSE} weight={800}>
        phase unknown, length is not
      </M>
      <M x="700" y="118" size={11} fill={MUTED} weight={700}>
        every ghost is equally likely
      </M>
    </Scene>
  )
}

export function NoncoherentBfskScene() {
  return (
    <Scene caption="No phase reference, no subtraction — two envelopes and one comparison">
      {[
        ['phase reference', 'needed', 'not needed'],
        ['P_b', 'Q(√(E_b/N₀))', '½ exp(−E_b/2N₀)'],
        ['tone separation', '1/(2T_b)', '1/T_b'],
      ].map((row, i) => (
        <g key={row[0]} className={`dcm-cell-in dcm-delay-${i}`}>
          <rect x="60" y={58 + i * 44} width="780" height="38" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="1.7" />
          <L x="76" y={83 + i * 44} size={12} anchor="start" weight={800}>
            {row[0]}
          </L>
          <M x="500" y={83 + i * 44} size={12} fill={BLUE} weight={800}>
            {row[1]}
          </M>
          <M x="770" y={83 + i * 44} size={12} fill={ROSE} weight={800}>
            {row[2]}
          </M>
        </g>
      ))}
      <L x="500" y="44" size={11} fill={BLUE} weight={800}>
        coherent
      </L>
      <L x="770" y="44" size={11} fill={ROSE} weight={800}>
        noncoherent
      </L>

      <Wire d="M56 330 L116 330" stroke={BLUE} width="2.6" marker="url(#dcArrB)" className="dcm-current" />
      <M x="86" y="314" size={11.5} fill={BLUE} weight={800}>
        r(t)
      </M>
      {[
        [262, 'BPF at f₁', AMBER, 0],
        [398, 'BPF at f₂', PURP, 2],
      ].map(([y, label, tone, d]) => (
        <g key={String(label)}>
          <Wire d={`M116 330 L116 ${y} L152 ${y}`} stroke={BLUE} width="2" marker="url(#dcArrB)" opacity="0.8" />
          <Block x="154" y={Number(y) - 24} w="118" h="48" label={String(label)} stroke={tone} className={`dcm-charge dcm-delay-${d}`} />
          <Wire d={`M272 ${y} L304 ${y}`} stroke={tone} width="2" marker={`url(#${markerFor(tone)})`} />
          <Block x="306" y={Number(y) - 24} w="136" h="48" label="envelope detector" stroke={GREEN} size={11} className={`dcm-charge dcm-delay-${Number(d) + 1}`} />
          <Wire d={`M442 ${y} L478 ${y}`} stroke={GREEN} width="2" />
          <Sampler x="480" y={y} label="t = T_b" className={`dcm-switch dcm-delay-${d}`} />
          <Wire d={`M514 ${y} L578 ${y} L578 ${Number(y) < 330 ? 312 : 348}`} stroke={GREEN} width="2.2" marker="url(#dcArrG)" />
        </g>
      ))}
      <Block x="578" y="306" w="78" h="48" label={'>'} stroke={RED} size={20} className="dcm-flux dcm-delay-4" />
      <Wire d="M656 330 L800 330" stroke={GREEN} width="2.6" marker="url(#dcArrG)" className="dcm-current dcm-delay-4" />
      <M x="728" y="314" size={11} fill={GREEN} weight={800}>
        decision
      </M>
      <M x="728" y="360" size={11} fill={MUTED} weight={700}>
        costs ≈1 dB, saves the PLL
      </M>
    </Scene>
  )
}

export function DpskScene() {
  const rows = [
    ['1', 'keep phase', '0°', '0°', false],
    ['0', 'flip phase', '0°', '180°', true],
    ['0', 'flip phase', '180°', '0°', true],
    ['1', 'keep phase', '0°', '0°', false],
    ['1', 'keep phase', '0°', '0°', false],
  ]
  return (
    <Scene caption="The reference is the previous symbol — no oscillator to lock, but two bits die per slip">
      {['bit', 'rule', 'previous', 'transmitted'].map((h, i) => (
        <M key={h} x={96 + i * 118} y={76} size={11.5} fill={MUTED} weight={800}>
          {h}
        </M>
      ))}
      {rows.map((r, i) => (
        <g key={i} className={`dcm-cell-in dcm-delay-${i % 5}`}>
          <rect x="56" y={88 + i * 34} width="472" height="30" rx="7" fill={r[4] ? ROSE : WHITE} fillOpacity={r[4] ? 0.12 : 1} stroke={r[4] ? ROSE : MUTED} strokeWidth={r[4] ? 2.2 : 1.6} />
          {[0, 1, 2, 3].map((c) => (
            <M key={c} x={96 + c * 118} y={108 + i * 34} size={11.5} fill={r[4] ? ROSE : N} weight={c === 3 ? 800 : 650}>
              {String(r[c])}
            </M>
          ))}
        </g>
      ))}

      <rect x="560" y="72" width="300" height="180" rx="12" fill={WHITE} stroke={AMBER} strokeWidth="2.3" className="dcm-slide-in dcm-delay-3" />
      <L x="710" y="102" size={12.5} fill={AMBER} weight={800}>
        What you trade
      </L>
      {['no carrier phase recovery', 'no PLL, no acquisition time', '≈0.9 dB worse than BPSK', 'one symbol error corrupts two bits'].map((t, i) => (
        <L key={t} x="710" y={132 + i * 28} size={11.5} fill={i === 3 ? RED : N} weight={700}>
          {t}
        </L>
      ))}

      <Wire d="M56 352 L118 352" stroke={BLUE} width="2.6" marker="url(#dcArrB)" className="dcm-current" />
      <M x="88" y="336" size={11} fill={BLUE} weight={800}>
        r(t)
      </M>
      <Wire d="M118 352 L228 352" stroke={BLUE} width="2.2" marker="url(#dcArrB)" />
      <Wire d="M132 352 L132 428 L166 428" stroke={PURP} width="2.2" marker="url(#dcArrP)" />
      <Block x="168" y="406" w="112" h="44" label="delay T_b" stroke={PURP} className="dcm-charge dcm-delay-2" />
      <Wire d="M280 428 L316 428 L316 386" stroke={PURP} width="2.2" marker="url(#dcArrP)" />
      <Mult cx="246" cy="352" r="16" className="dcm-flux dcm-delay-1" />
      <Wire d="M316 386 L246 386 L246 368" stroke={PURP} width="2.2" marker="url(#dcArrP)" />
      <Wire d="M262 352 L296 352" stroke={MUTED} width="2" />
      <Integ x="298" y="328" w="56" h="48" limits="0→T_b" className="dcm-charge dcm-delay-2" />
      <Wire d="M354 352 L388 352" stroke={MUTED} width="2" />
      <Block x="390" y="328" w="78" h="48" label="≷ 0" stroke={RED} className="dcm-flux dcm-delay-3" />
      <Wire d="M468 352 L520 352" stroke={GREEN} width="2.4" marker="url(#dcArrG)" className="dcm-current dcm-delay-3" />
      <M x="494" y="336" size={10.5} fill={GREEN} weight={800}>
        bit
      </M>

      <rect x="560" y="366" width="300" height="76" rx="11" fill={WHITE} stroke={RED} strokeWidth="2.4" strokeDasharray="7 6" className="dcm-flux dcm-delay-4" />
      <L x="710" y="394" size={11.5} fill={RED} weight={800}>
        the reference is a noisy symbol,
      </L>
      <L x="710" y="418" size={11.5} fill={RED} weight={800}>
        not a clean oscillator
      </L>
      <Wire d="M556 404 L284 418" stroke={RED} width="1.8" dash="6 6" marker="url(#dcArrR)" />
    </Scene>
  )
}

export function SchemeTreeScene() {
  return (
    <Scene caption="Add 1 to 2 dB of implementation loss to every leaf before you promise a link budget">
      <Block x="368" y="50" w="168" h="42" label="choose modulation" stroke={N} size={12.5} className="dcm-flux" />
      <Wire d="M452 92 L452 120" stroke={MUTED} width="2" marker="url(#dcArr)" />
      <Block x="362" y="120" w="180" h="42" label="bandwidth limited?" stroke={AMBER} size={12} className="dcm-cell-in" />
      <Wire d="M362 141 L240 141 L240 186" stroke={GREEN} width="2" marker="url(#dcArrG)" />
      <Wire d="M542 141 L672 141 L672 186" stroke={BLUE} width="2" marker="url(#dcArrB)" />
      <M x="300" y="132" size={11} fill={GREEN} weight={800}>
        yes
      </M>
      <M x="608" y="132" size={11} fill={BLUE} weight={800}>
        no
      </M>

      <Block x="152" y="186" w="176" h="42" label="amplifier linear?" stroke={AMBER} size={12} className="dcm-cell-in dcm-delay-1" />
      <Wire d="M176 228 L176 272" stroke={MUTED} width="2" marker="url(#dcArr)" />
      <Wire d="M304 228 L304 272" stroke={MUTED} width="2" marker="url(#dcArr)" />
      <Block x="56" y="272" w="152" h="52" label="high-order QAM" sub="13.4 dB · 4 b/s/Hz" stroke={GREEN} size={12} className="dcm-cell-in dcm-delay-3" />
      <Block x="228" y="272" w="152" h="52" label="high-order PSK" sub="17.5 dB · 4 b/s/Hz" stroke={ROSE} size={12} className="dcm-cell-in dcm-delay-3" />

      <Block x="584" y="186" w="176" h="42" label="phase reference?" stroke={AMBER} size={12} className="dcm-cell-in dcm-delay-2" />
      <Wire d="M612 228 L612 272" stroke={MUTED} width="2" marker="url(#dcArr)" />
      <Wire d="M732 228 L732 272" stroke={MUTED} width="2" marker="url(#dcArr)" />
      <Block x="540" y="272" w="144" h="52" label="QPSK" sub="9.6 dB · 2 b/s/Hz" stroke={GREEN} size={12} className="dcm-cell-in dcm-delay-4" />
      <Block x="700" y="272" w="168" h="42" label="bandwidth to spare?" stroke={AMBER} size={11.5} className="dcm-cell-in dcm-delay-4" />
      <Wire d="M736 314 L736 358" stroke={MUTED} width="2" marker="url(#dcArr)" />
      <Wire d="M836 314 L836 358" stroke={MUTED} width="2" marker="url(#dcArr)" />
      <Block x="600" y="358" w="164" h="52" label="noncoherent BFSK" sub="13.4 dB · 0.5 b/s/Hz" stroke={PURP} size={11.5} className="dcm-cell-in dcm-delay-5" />
      <Block x="780" y="358" w="104" h="52" label="DPSK" sub="10.5 dB · 1 b/s/Hz" stroke={BLUE} size={12} className="dcm-cell-in dcm-delay-5" />

      <rect x="56" y="430" width="788" height="40" rx="10" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2.2" className="dcm-slide-in dcm-delay-5" />
      <L x="450" y="456" size={12} fill={RED} weight={800}>
        every figure above is theoretical — add 1–2 dB implementation loss before you size the amplifier
      </L>
    </Scene>
  )
}

/* ── Module 3 — information theory ──────────────────────────────── */

const log2 = (v) => Math.log(v) / Math.LN2
const Hb = (p) => (p <= 0 || p >= 1 ? 0 : -p * log2(p) - (1 - p) * log2(1 - p))

export function SelfInformationScene() {
  const pts = []
  for (let i = 0; i <= 60; i += 1) {
    const p = 0.035 + (0.965 * i) / 60
    pts.push([110 + p * 370, 400 - log2(1 / p) * 50])
  }
  return (
    <Scene caption="Information is surprise: certainty carries none, and the rare event carries the most">
      <Axes x="110" y="400" w="400" h="330" xLabel="p" yLabel="I = log₂(1/p)" origin="left" tickLabels={[[295, '0.5'], [480, '1']]} />
      <Curve pts={pts} stroke={BLUE} width="3.2" className="dcm-cost-curve" />
      <Wire d="M124 400 L124 90" stroke={RED} width="2" dash="6 6" className="dcm-slide-in dcm-delay-3" />
      <M x="138" y="108" size={11} fill={RED} anchor="start" weight={800}>
        rare event — unbounded information
      </M>
      <Dot cx="295" cy="350" r="8" fill={AMBER} className="dcm-cost-dot dcm-delay-1" />
      <M x="310" y="336" size={11.5} fill={AMBER} anchor="start" weight={800}>
        (0.5, 1 bit)
      </M>
      <Dot cx="480" cy="400" r="9" fill={GREEN} className="dcm-cost-dot dcm-delay-2" />
      <M x="470" y="426" size={11} fill={GREEN} anchor="end" weight={800}>
        certain event — no information
      </M>

      <rect x="556" y="118" width="304" height="238" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.3" className="dcm-slide-in dcm-delay-3" />
      <L x="708" y="146" size={12.5} fill={PURP} weight={800}>
        Information adds
      </L>
      {[
        ['p = 1/4', 'I = 2 bits', 182, BLUE],
        ['p = 1/8', 'I = 3 bits', 234, AMBER],
        ['p = 1/32', 'I = 5 bits', 306, GREEN],
      ].map(([a, b, y, tone]) => (
        <g key={String(a)}>
          <M x="596" y={y} size={12} fill={tone} anchor="start" weight={800}>
            {String(a)}
          </M>
          <M x="828" y={y} size={12} fill={tone} anchor="end" weight={800}>
            {String(b)}
          </M>
        </g>
      ))}
      <L x="578" y="268" size={18} fill={MUTED} anchor="start">
        +
      </L>
      <Wire d="M580 280 L836 280" stroke={MUTED} width="1.8" />
      <L x="578" y="312" size={18} fill={MUTED} anchor="start">
        =
      </L>
      <M x="708" y="338" size={11} fill={MUTED}>
        independent events multiply, information adds
      </M>
    </Scene>
  )
}

export function BinaryEntropyScene() {
  const pts = []
  for (let i = 0; i <= 80; i += 1) {
    const p = i / 80
    pts.push([110 + p * 380, 400 - Hb(p) * 280])
  }
  const pies = [
    ['p = 0.5', 0.5, '1.000', 588],
    ['p = 0.1', 0.1, '0.469', 700],
    ['p = 0.01', 0.01, '0.081', 812],
  ]
  return (
    <Scene caption="Entropy peaks when you know least — a fair coin, one bit, nothing more">
      <Axes x="110" y="400" w="410" h="320" xLabel="p" yLabel="H(p) bits" origin="left" tickLabels={[[110, '0'], [300, '0.5'], [490, '1']]} />
      <Curve pts={pts} stroke={BLUE} width="3.2" className="dcm-cost-curve" />
      <Wire d="M110 120 L300 120" stroke={MUTED} width="1.4" dash="5 6" />
      <Dot cx="300" cy="120" r="9" fill={AMBER} className="dcm-cost-dot dcm-delay-2" />
      <M x="316" y="110" size={11.5} fill={AMBER} anchor="start" weight={800}>
        maximum uncertainty — 1 bit
      </M>
      <Dot cx="110" cy="400" r="8" fill={GREEN} className="dcm-cost-dot dcm-delay-3" />
      <Dot cx="490" cy="400" r="8" fill={GREEN} className="dcm-cost-dot dcm-delay-3" />
      <M x="300" y="432" size={11} fill={GREEN} weight={800}>
        both ends: no uncertainty at all
      </M>

      {pies.map(([label, p, h, cx], i) => {
        const a = 2 * Math.PI * Number(p)
        const ex = Number(cx) + 44 * Math.sin(a)
        const ey = 176 - 44 * Math.cos(a)
        const large = a > Math.PI ? 1 : 0
        return (
          <g key={String(label)} className={`dcm-cell-in dcm-delay-${i}`}>
            <circle cx={cx} cy="176" r="44" fill={SKY} stroke={MUTED} strokeWidth="2" />
            <path d={`M${cx} 176 L${cx} 132 A44 44 0 ${large} 1 ${ex.toFixed(1)} ${ey.toFixed(1)} Z`} fill={BLUE} fillOpacity="0.55" stroke={BLUE} strokeWidth="2" />
            <M x={cx} y="242" size={11.5} fill={MUTED} weight={800}>
              {String(label)}
            </M>
            <M x={cx} y="264" size={12.5} fill={BLUE} weight={800}>
              {`${h} bits`}
            </M>
          </g>
        )
      })}
      <L x="700" y="104" size={11.5} fill={MUTED} weight={700}>
        the same alphabet, three different priors
      </L>
    </Scene>
  )
}

export function SourceExtensionScene() {
  const bars = [
    [1, '2.000', 140],
    [2, '1.875', 262],
    [3, '1.833', 384],
    [4, '1.813', 506],
  ]
  const yOf = (v) => 380 - (v - 1.75) * 400
  return (
    <Scene caption="Waste per symbol falls like 1/n — and the alphabet you must tabulate grows like Kⁿ">
      {[
        ['singles', 'K = 4', 90, 22],
        ['pairs', 'K² = 16', 150, 44],
        ['triples', 'K³ = 64', 210, 66],
      ].map(([label, size, y, cw], i) => (
        <g key={String(label)} className={`dcm-cell-in dcm-delay-${i}`}>
          <M x="126" y={Number(y) + 4} size={11} fill={MUTED} anchor="end" weight={800}>
            {String(label)}
          </M>
          {Array.from({ length: Math.floor(264 / Number(cw)) }, (_, k) => (
            <rect key={k} x={136 + k * Number(cw)} y={Number(y) - 13} width={Number(cw) - 4} height="26" rx="5" fill={WHITE} stroke={[BLUE, AMBER, PURP][i]} strokeWidth="2" />
          ))}
          <M x="430" y={Number(y) + 4} size={11.5} fill={[BLUE, AMBER, PURP][i]} anchor="start" weight={800}>
            {String(size)}
          </M>
        </g>
      ))}

      <Axes x="110" y="430" w="470" h="200" xLabel="n (symbols per block)" yLabel="L̄/n" origin="left" tickLabels={bars.map(([k, , x]) => [Number(x) + 38, String(k)])} />
      <Wire d="M110 380 L580 380" stroke={GREEN} width="2.6" dash="7 6" className="dcm-slide-in" />
      <M x="596" y="384" size={11.5} fill={GREEN} anchor="start" weight={800}>
        H(X) = 1.75
      </M>
      {bars.map(([k, v, x], i) => (
        <g key={String(k)} className={`dcm-cell-in dcm-delay-${i}`}>
          <rect x={x} y={yOf(Number(v))} width="76" height={430 - yOf(Number(v))} rx="5" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="2.2" />
          <rect x={x} y={yOf(Number(v))} width="76" height={380 - yOf(Number(v))} fill={ROSE} fillOpacity="0.4" />
          <M x={Number(x) + 38} y={yOf(Number(v)) - 10} size={11.5} fill={BLUE} weight={800}>
            {String(v)}
          </M>
        </g>
      ))}
      <M x="700" y="438" size={11} fill={ROSE} weight={800}>
        shaded = waste above the entropy
      </M>
      <Tag x="640" y="270" text="n = 4 → within 0.06 bits" tone={GREEN} w="216" className="dcm-slide-in dcm-delay-4" />
      <Tag x="640" y="312" text="but 256 codewords to store" tone={ROSE} w="216" className="dcm-slide-in dcm-delay-5" />
    </Scene>
  )
}

export function SourceCodingBoundsScene() {
  return (
    <Scene caption="An existence result with teeth: below H(X) nothing works, within one bit something always does">
      <rect x="90" y="196" width="240" height="112" fill={RED} fillOpacity="0.14" className="dcm-fade-in dcm-delay-1" />
      <rect x="330" y="196" width="280" height="112" fill={GREEN} fillOpacity="0.14" className="dcm-fade-in dcm-delay-3" />
      <Wire d="M90 252 L846 252" stroke={MUTED} width="2.4" marker="url(#dcArr)" />
      <M x="826" y="286" size={12} fill={MUTED}>
        L̄ (bits/symbol)
      </M>
      <Wire d="M330 168 L330 336" stroke={N} width="3.4" className="dcm-slide-in" />
      <M x="330" y="152" size={13} fill={N} weight={800}>
        H(X)
      </M>
      <Wire d="M610 180 L610 324" stroke={MUTED} width="2.4" dash="7 6" className="dcm-slide-in dcm-delay-2" />
      <M x="610" y="164" size={12.5} fill={MUTED} weight={800}>
        H(X) + 1
      </M>
      <L x="210" y="228" size={12} fill={RED} weight={800}>
        impossible
      </L>
      <L x="210" y="252" size={11} fill={RED} weight={700}>
        no uniquely decodable code
      </L>
      <L x="470" y="228" size={12} fill={GREEN} weight={800}>
        where every good code lives
      </L>
      <L x="470" y="252" size={11} fill={GREEN} weight={700}>
        always achievable
      </L>

      <Dot cx="392" cy="252" r="10" fill={BLUE} className="dcm-cost-dot dcm-delay-4" />
      <M x="392" y="378" size={12} fill={BLUE} weight={800}>
        Huffman
      </M>
      <Wire d="M392 366 L392 268" stroke={BLUE} width="2" />
      <Wire d="M386 306 L338 306" stroke={BLUE} width="2.4" marker="url(#dcArrB)" className="dcm-current dcm-delay-4" />
      <M x="392" y="404" size={11} fill={MUTED} weight={700}>
        closes as 1/n with block coding
      </M>
      <Tag x="650" y="360" text="the theorem names no code" tone={ROSE} w="212" className="dcm-slide-in dcm-delay-5" />
    </Scene>
  )
}

export function PrefixKraftScene() {
  const marks = { '1:0': GREEN, '2:2': BLUE, '3:6': AMBER, '3:7': PURP }
  const labels = { '1:0': '0', '2:2': '10', '3:6': '110', '3:7': '111' }
  const edgeLabels = { '1:0': '0', '1:1': '1', '2:2': '0', '2:3': '1', '3:6': '0', '3:7': '1' }
  const segs = [
    ['0', 130, GREEN],
    ['10', 65, BLUE],
    ['110', 32, AMBER],
    ['111', 33, PURP],
  ]
  let acc = 390
  return (
    <Scene caption="Kraft sum = 1: the tree is full and there is no room for a fifth codeword">
      <BinTree x="60" y="112" w="440" h="240" levels={4} marks={marks} labels={labels} edgeLabels={edgeLabels} r={10} />
      <M x="280" y="90" size={11.5} fill={MUTED} weight={700}>
        left = 0, right = 1 · solid nodes are codewords
      </M>

      <rect x="640" y="130" width="96" height="260" rx="6" fill={WHITE} stroke={MUTED} strokeWidth="2.2" />
      {segs.map(([label, h, tone], i) => {
        acc -= Number(h)
        return (
          <g key={String(label)} className={`dcm-cell-in dcm-delay-${i}`}>
            <rect x="640" y={acc} width="96" height={h} fill={tone} fillOpacity="0.28" stroke={tone} strokeWidth="2" />
            <M x="688" y={acc + Number(h) / 2 + 5} size={11.5} fill={tone} weight={800}>
              {String(label)}
            </M>
            <M x="752" y={acc + Number(h) / 2 + 5} size={10.5} fill={MUTED} anchor="start" weight={700}>
              {`2⁻${i === 0 ? 1 : i === 1 ? 2 : 3}`}
            </M>
          </g>
        )
      })}
      <M x="688" y="118" size={11.5} fill={GREEN} weight={800}>
        budget = 1, exactly spent
      </M>
      <g className="dcm-flux dcm-delay-5">
        <rect x="640" y="76" width="96" height="30" rx="5" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2" strokeDasharray="5 5" />
        <path d="M640 76 L736 106 M736 76 L640 106" stroke={RED} strokeWidth="2.2" />
      </g>
      <M x="752" y="96" size={10.5} fill={RED} anchor="start" weight={800}>
        no room for a fifth
      </M>
      <M x="688" y="420" size={11} fill={MUTED} weight={700}>
        ½ + ¼ + ⅛ + ⅛ = 1
      </M>
    </Scene>
  )
}

export function HuffmanMergeScene() {
  return (
    <Scene caption="Merge the two smallest, repeat — the rarest symbol necessarily ends up deepest">
      {[
        ['0.4', 120, BLUE],
        ['0.3', 216, AMBER],
        ['0.2', 312, PURP],
        ['0.1', 408, ROSE],
      ].map(([p, x, tone], i) => (
        <g key={String(p)} className={`dcm-cell-in dcm-delay-${i}`}>
          <rect x={Number(x) - 30} y="388" width="60" height="38" rx="8" fill={WHITE} stroke={tone} strokeWidth="2.4" />
          <M x={x} y="413" size={13} fill={tone} weight={800}>
            {String(p)}
          </M>
          <M x={x} y="446" size={11} fill={MUTED} weight={700}>
            {`s${i + 1}`}
          </M>
        </g>
      ))}
      <Wire d="M312 388 L360 330" stroke={PURP} width="2.4" className="dcm-draw dcm-delay-1" />
      <Wire d="M408 388 L360 330" stroke={ROSE} width="2.4" className="dcm-draw dcm-delay-1" />
      <circle cx="360" cy="318" r="20" fill={WHITE} stroke={N} strokeWidth="2.4" />
      <M x="360" y="323" size={12} fill={N} weight={800}>
        0.3
      </M>
      <M x="322" y="358" size={10.5} fill={PURP} weight={800}>
        0
      </M>
      <M x="398" y="358" size={10.5} fill={ROSE} weight={800}>
        1
      </M>
      <circle cx="446" cy="318" r="13" fill={AMBER} className="dcm-flux dcm-delay-1" />
      <M x="446" y="323" size={11} fill={WHITE} weight={800}>
        1
      </M>

      <Wire d="M216 388 L282 250" stroke={AMBER} width="2.4" className="dcm-draw dcm-delay-2" />
      <Wire d="M360 298 L282 250" stroke={N} width="2.4" className="dcm-draw dcm-delay-2" />
      <circle cx="282" cy="238" r="20" fill={WHITE} stroke={N} strokeWidth="2.4" />
      <M x="282" y="243" size={12} fill={N} weight={800}>
        0.6
      </M>
      <M x="238" y="310" size={10.5} fill={AMBER} weight={800}>
        0
      </M>
      <M x="336" y="278" size={10.5} fill={N} weight={800}>
        1
      </M>
      <circle cx="368" cy="238" r="13" fill={AMBER} className="dcm-flux dcm-delay-2" />
      <M x="368" y="243" size={11} fill={WHITE} weight={800}>
        2
      </M>

      <Wire d="M120 388 L204 166" stroke={BLUE} width="2.4" className="dcm-draw dcm-delay-3" />
      <Wire d="M282 218 L204 166" stroke={N} width="2.4" className="dcm-draw dcm-delay-3" />
      <circle cx="204" cy="152" r="22" fill={GREEN} stroke={GREEN} strokeWidth="2.4" />
      <M x="204" y="157" size={12} fill={WHITE} weight={800}>
        1.0
      </M>
      <M x="146" y="270" size={10.5} fill={BLUE} weight={800}>
        0
      </M>
      <M x="262" y="188" size={10.5} fill={N} weight={800}>
        1
      </M>
      <circle cx="290" cy="152" r="13" fill={AMBER} className="dcm-flux dcm-delay-3" />
      <M x="290" y="157" size={11} fill={WHITE} weight={800}>
        3
      </M>

      <Panel
        x="536"
        y="104"
        w="322"
        title="symbol · p · code · length"
        accent={BLUE}
        mono
        rowH={30}
        className="dcm-slide-in dcm-delay-4"
        rows={[
          ['s₁  0.4', '0      1'],
          ['s₂  0.3', '10     2'],
          ['s₃  0.2', '110    3'],
          ['s₄  0.1', '111    3'],
          ['L̄ = 1.9 bits', 'H = 1.846', GREEN],
        ]}
      />
      <M x="697" y="316" size={11} fill={MUTED} weight={700}>
        efficiency 97.2% — the gap is the integer constraint
      </M>
    </Scene>
  )
}

export function LempelZivScene() {
  const tape = '0 1 0 1 1 0 1 0 1 0 0 1'.split(' ')
  const rows = [
    ['1', '0', '(0, 0)', BLUE],
    ['2', '1', '(0, 1)', AMBER],
    ['3', '01', '(1, 1)', PURP],
    ['4', '10', '(2, 0)', GREEN],
  ]
  return (
    <Scene caption="Huffman needs the statistics in advance; Lempel-Ziv learns them from the data as it goes">
      <M x="60" y="86" size={11.5} fill={MUTED} anchor="start" weight={800}>
        input tape
      </M>
      {tape.map((b, i) => (
        <g key={i}>
          <rect x={70 + i * 34} y="100" width="30" height="34" rx="6" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <M x={85 + i * 34} y="123" size={14} weight={800}>
            {b}
          </M>
        </g>
      ))}
      <g className="dcm-search">
        <path d="M76 146 L90 146 L83 158 Z" fill={RED} />
      </g>
      {[
        [0, 1, BLUE],
        [1, 1, AMBER],
        [2, 2, PURP],
        [4, 2, GREEN],
      ].map(([start, len, tone], i) => (
        <rect
          key={i}
          x={68 + Number(start) * 34}
          y="96"
          width={Number(len) * 34 - 2}
          height="42"
          rx="7"
          fill="none"
          stroke={tone}
          strokeWidth="2.6"
          className={`dcm-cell-in dcm-delay-${i}`}
        />
      ))}

      <rect x="60" y="180" width="430" height="34" rx="7" fill={INDIGO} />
      {['index', 'phrase', 'encoding'].map((h, i) => (
        <L key={h} x={116 + i * 148} y="203" size={11.5} fill={WHITE} weight={800}>
          {h}
        </L>
      ))}
      {rows.map(([idx, phrase, enc, tone], i) => (
        <g key={String(idx)} className={`dcm-cell-in dcm-delay-${i}`}>
          <rect x="60" y={218 + i * 40} width="430" height="36" rx="7" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          {[idx, phrase, enc].map((c, j) => (
            <M key={j} x={116 + j * 148} y={242 + i * 40} size={12.5} fill={tone} weight={800}>
              {String(c)}
            </M>
          ))}
        </g>
      ))}

      <Card
        x="540"
        y="180"
        w="320"
        h="126"
        title="Huffman"
        accent={ROSE}
        className="dcm-slide-in dcm-delay-3"
        lines={['needs p_k before you start', 'ignores repetition entirely', 'optimal for a known memoryless source']}
        linesY={58}
      />
      <Card
        x="540"
        y="322"
        w="320"
        h="126"
        title="Lempel-Ziv"
        accent={GREEN}
        className="dcm-slide-in dcm-delay-4"
        lines={['learns the dictionary from the data', 'repetition becomes a short pointer', 'asymptotically optimal, no prior needed']}
        linesY={58}
      />
      <M x="275" y="400" size={11} fill={MUTED} weight={700}>
        every new phrase = an old phrase + one bit
      </M>
      <M x="275" y="424" size={11} fill={MUTED} weight={700}>
        so the dictionary never needs sending
      </M>
    </Scene>
  )
}

export function CodeVarianceScene() {
  return (
    <Scene caption="Same mean length, very different buffer — the tie-break in Huffman is not cosmetic">
      <Card x="44" y="66" w="390" h="250" title="Balanced tie-break · lengths 2 2 2 3 3" accent={GREEN} className="dcm-slide-in">
        <circle cx={195} cy={56} r={9} fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
        {[
          [125, 96],
          [265, 96],
        ].map(([x, y]) => (
          <g key={x}>
            <Wire d={`M195 56 L${x} ${y}`} stroke={GREEN} width="2" />
            <circle cx={x} cy={y} r={9} fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
          </g>
        ))}
        {[
          [85, 140],
          [165, 140],
          [225, 140],
          [305, 140],
        ].map(([x, y], i) => (
          <g key={x}>
            <Wire d={`M${i < 2 ? 125 : 265} 96 L${x} ${y}`} stroke={GREEN} width="2" />
            {/* only the first depth-2 node keeps splitting: lengths 2, 2, 2, 3, 3 */}
            <circle cx={x} cy={y} r={9} fill={i === 0 ? WHITE : GREEN} stroke={GREEN} strokeWidth="2.2" />
          </g>
        ))}
        {[
          [55, 184],
          [115, 184],
        ].map(([x, y]) => (
          <g key={x}>
            <Wire d={`M85 140 L${x} ${y}`} stroke={GREEN} width="2" />
            <circle cx={x} cy={y} r={8} fill={GREEN} />
          </g>
        ))}
        <M x={195} y={216} size={12} fill={GREEN} weight={800}>
          L̄ = 2.2 · variance 0.16
        </M>
      </Card>

      <Card x="466" y="66" w="390" h="250" title="Skewed tie-break · lengths 1 2 3 4 4" accent={AMBER} className="dcm-slide-in dcm-delay-2">
        <circle cx={80} cy={56} r={9} fill={WHITE} stroke={AMBER} strokeWidth="2.2" />
        {[
          [46, 96, true],
          [130, 96, false],
        ].map(([x, y, leaf]) => (
          <g key={x}>
            <Wire d={`M80 56 L${x} ${y}`} stroke={AMBER} width="2" />
            <circle cx={x} cy={y} r={9} fill={leaf ? AMBER : WHITE} stroke={AMBER} strokeWidth="2.2" />
          </g>
        ))}
        {[
          [96, 136, true],
          [182, 136, false],
        ].map(([x, y, leaf]) => (
          <g key={x}>
            <Wire d={`M130 96 L${x} ${y}`} stroke={AMBER} width="2" />
            <circle cx={x} cy={y} r={9} fill={leaf ? AMBER : WHITE} stroke={AMBER} strokeWidth="2.2" />
          </g>
        ))}
        {[
          [148, 176, true],
          [236, 176, false],
        ].map(([x, y, leaf]) => (
          <g key={x}>
            <Wire d={`M182 136 L${x} ${y}`} stroke={AMBER} width="2" />
            <circle cx={x} cy={y} r={9} fill={leaf ? AMBER : WHITE} stroke={AMBER} strokeWidth="2.2" />
          </g>
        ))}
        {[
          [202, 212],
          [290, 212],
        ].map(([x, y]) => (
          <g key={x}>
            <Wire d={`M236 176 L${x} ${y}`} stroke={AMBER} width="2" />
            <circle cx={x} cy={y} r={8} fill={AMBER} />
          </g>
        ))}
        <M x={195} y={238} size={12} fill={AMBER} weight={800}>
          L̄ = 2.2 · variance 1.36
        </M>
      </Card>

      <M x="240" y="348" size={11.5} fill={MUTED} weight={800}>
        buffer occupancy feeding a fixed-rate channel
      </M>
      <rect x="120" y="366" width="240" height="72" rx="8" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
      <rect x="120" y="406" width="240" height="32" rx="8" fill={GREEN} fillOpacity="0.4" className="dcm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} />
      <M x="240" y="460" size={11} fill={GREEN} weight={800}>
        shallow queue
      </M>
      <rect x="540" y="366" width="240" height="72" rx="8" fill={WHITE} stroke={AMBER} strokeWidth="2.2" />
      <rect x="540" y="372" width="240" height="66" rx="8" fill={AMBER} fillOpacity="0.45" className="dcm-bar dcm-delay-2" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} />
      <M x="660" y="460" size={11} fill={AMBER} weight={800}>
        deep queue — overflow risk
      </M>
    </Scene>
  )
}

export function DmcGraphScene() {
  return (
    <Scene caption="The matrix is physics; the input distribution is the only thing you get to choose">
      <Dot cx="180" cy="150" r="13" fill={BLUE} />
      <Dot cx="180" cy="290" r="13" fill={BLUE} />
      <Dot cx="440" cy="150" r="13" fill={GREEN} />
      <Dot cx="440" cy="290" r="13" fill={GREEN} />
      <M x="150" y="156" size={13} fill={BLUE} anchor="end" weight={800}>
        x₁
      </M>
      <M x="150" y="296" size={13} fill={BLUE} anchor="end" weight={800}>
        x₂
      </M>
      <M x="470" y="156" size={13} fill={GREEN} anchor="start" weight={800}>
        y₁
      </M>
      <M x="470" y="296" size={13} fill={GREEN} anchor="start" weight={800}>
        y₂
      </M>
      <Wire d="M196 150 L424 150" stroke={N} width="3.4" marker="url(#dcArr)" className="dcm-current" />
      <Wire d="M196 290 L424 290" stroke={N} width="3.4" marker="url(#dcArr)" className="dcm-current" />
      <Wire d="M194 160 L426 280" stroke={RED} width="1.8" marker="url(#dcArrR)" className="dcm-current-slow dcm-delay-2" />
      <Wire d="M194 280 L426 160" stroke={RED} width="1.8" marker="url(#dcArrR)" className="dcm-current-slow dcm-delay-2" />
      <M x="310" y="138" size={11.5} fill={N} weight={800}>
        1 − p
      </M>
      <M x="310" y="310" size={11.5} fill={N} weight={800}>
        1 − p
      </M>
      <M x="256" y="206" size={11.5} fill={RED} weight={800}>
        p
      </M>
      <M x="366" y="250" size={11.5} fill={RED} weight={800}>
        p
      </M>

      <Matrix x="216" y="352" name="P(y|x) =" rows={[['1−p', 'p'], ['p', '1−p']]} cell={62} accent={INDIGO} className="dcm-cell-in dcm-delay-3" size={12.5} />
      <M x="420" y="416" size={11} fill={MUTED} anchor="start" weight={700}>
        every row sums to 1
      </M>

      <Card
        x="562"
        y="96"
        w="296"
        h="146"
        title="Fixed by physics"
        accent={MUTED}
        className="dcm-slide-in dcm-delay-3"
        lines={['the transition matrix P(y|x)', 'you measure it, you do not pick it']}
        linesY={62}
      />
      <Wire d="M710 246 L710 278" stroke={GREEN} width="2.4" marker="url(#dcArrG)" />
      <Card
        x="562"
        y="280"
        w="296"
        h="146"
        title="Chosen by you"
        accent={GREEN}
        className="dcm-slide-in dcm-delay-4"
        lines={['the input distribution p(x)', 'C = max over p(x) of I(X;Y)']}
        linesY={62}
      />
    </Scene>
  )
}

export function BscBecScene() {
  const xOf = (p) => 110 + p * 1360
  const yOf = (c) => 440 - c * 150
  const bec = []
  const bsc = []
  for (let i = 0; i <= 50; i += 1) {
    const p = (0.5 * i) / 50
    bec.push([xOf(p), yOf(1 - p)])
    bsc.push([xOf(p), yOf(1 - Hb(p))])
  }
  return (
    <Scene caption="Erasure tells you where it failed; symmetric error does not — and that is worth a lot of capacity">
      <M x="180" y="60" size={12} fill={ROSE} weight={800}>
        BSC — the bit flips
      </M>
      <Dot cx="110" cy="96" r="9" fill={BLUE} />
      <Dot cx="110" cy="172" r="9" fill={BLUE} />
      <Dot cx="270" cy="96" r="9" fill={GREEN} />
      <Dot cx="270" cy="172" r="9" fill={GREEN} />
      <Wire d="M122 96 L256 96" stroke={N} width="2.8" marker="url(#dcArr)" />
      <Wire d="M122 172 L256 172" stroke={N} width="2.8" marker="url(#dcArr)" />
      <Wire d="M120 104 L258 164" stroke={RED} width="1.8" marker="url(#dcArrR)" className="dcm-current-slow" />
      <Wire d="M120 164 L258 104" stroke={RED} width="1.8" marker="url(#dcArrR)" className="dcm-current-slow" />
      <M x="190" y="142" size={11} fill={RED} weight={800}>
        p
      </M>

      <M x="560" y="60" size={12} fill={AMBER} weight={800}>
        BEC — the bit vanishes
      </M>
      <Dot cx="490" cy="96" r="9" fill={BLUE} />
      <Dot cx="490" cy="172" r="9" fill={BLUE} />
      <Dot cx="650" cy="96" r="9" fill={GREEN} />
      <Dot cx="650" cy="172" r="9" fill={GREEN} />
      <circle cx="650" cy="134" r="14" fill={WHITE} stroke={AMBER} strokeWidth="2.4" />
      <M x="650" y="139" size={13} fill={AMBER} weight={800}>
        ?
      </M>
      <Wire d="M502 96 L636 96" stroke={N} width="2.8" marker="url(#dcArr)" />
      <Wire d="M502 172 L636 172" stroke={N} width="2.8" marker="url(#dcArr)" />
      <Wire d="M500 104 L632 126" stroke={AMBER} width="1.8" marker="url(#dcArrA)" className="dcm-current-slow dcm-delay-2" />
      <Wire d="M500 164 L632 142" stroke={AMBER} width="1.8" marker="url(#dcArrA)" className="dcm-current-slow dcm-delay-2" />
      <M x="566" y="122" size={11} fill={AMBER} weight={800}>
        ε
      </M>
      <M x="700" y="139" size={11} fill={AMBER} anchor="start" weight={700}>
        erasure — no crossing arrows
      </M>

      <Axes x="110" y="440" w="720" h="200" xLabel="disturbance probability" yLabel="capacity (bits)" origin="left" tickLabels={[[xOf(0), '0'], [xOf(0.1), '0.1'], [xOf(0.25), '0.25'], [xOf(0.5), '0.5']]} />
      <Curve pts={bec} stroke={AMBER} width="3.2" className="dcm-cost-curve dcm-delay-1" />
      <Curve pts={bsc} stroke={ROSE} width="3.2" className="dcm-cost-curve dcm-delay-3" />
      <M x="700" y="332" size={11.5} fill={AMBER} anchor="start" weight={800}>
        BEC: 1 − ε
      </M>
      <M x="700" y="422" size={11.5} fill={ROSE} anchor="start" weight={800}>
        BSC: 1 − H(p)
      </M>
      <g className="dcm-flux dcm-delay-5">
        <Wire d={`M${xOf(0.1)} ${yOf(0.9).toFixed(1)} L${xOf(0.1)} ${yOf(0.531).toFixed(1)}`} stroke={N} width="2.4" marker="url(#dcArr)" />
        <Wire d={`M${xOf(0.1)} ${yOf(0.531).toFixed(1)} L${xOf(0.1)} ${yOf(0.9).toFixed(1)}`} stroke={N} width="2.4" marker="url(#dcArr)" />
      </g>
      <M x={xOf(0.1) + 12} y={yOf(0.72).toFixed(1)} size={11} fill={N} anchor="start" weight={800}>
        0.900 vs 0.531
      </M>
    </Scene>
  )
}

export function MutualInfoVennScene() {
  return (
    <Scene caption="I(X;Y) is the overlap: what survives the channel, measured in bits">
      <circle cx="330" cy="222" r="140" fill={BLUE} fillOpacity="0.14" stroke={BLUE} strokeWidth="2.8" className="dcm-emerge" />
      <circle cx="486" cy="222" r="140" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.8" className="dcm-emerge dcm-delay-1" />
      <path
        d="M408 105.7 A140 140 0 0 1 408 338.3 A140 140 0 0 1 408 105.7 Z"
        fill={PURP}
        fillOpacity="0.4"
        stroke={PURP}
        strokeWidth="2.6"
        className="dcm-flux dcm-delay-2"
      />
      <M x="408" y="210" size={13.5} fill={PURP} weight={800}>
        I(X;Y)
      </M>
      <M x="408" y="234" size={10.5} fill={PURP} weight={700}>
        what gets through
      </M>
      <M x="246" y="216" size={12.5} fill={BLUE} weight={800}>
        H(X|Y)
      </M>
      <M x="246" y="238" size={10} fill={BLUE} weight={700}>
        equivocation
      </M>
      <M x="572" y="216" size={12.5} fill={GREEN} weight={800}>
        H(Y|X)
      </M>
      <M x="572" y="238" size={10} fill={GREEN} weight={700}>
        noise added
      </M>
      <M x="256" y="86" size={12.5} fill={BLUE} weight={800}>
        H(X)
      </M>
      <M x="562" y="86" size={12.5} fill={GREEN} weight={800}>
        H(Y)
      </M>
      <Wire d="M190 388 L626 388" stroke={MUTED} width="2.2" />
      <Wire d="M190 388 L190 376 M626 388 L626 376" stroke={MUTED} width="2.2" />
      <M x="408" y="412" size={12} fill={MUTED} weight={800}>
        H(X, Y)
      </M>

      <rect x="676" y="96" width="180" height="140" rx="11" fill={WHITE} stroke={GREEN} strokeWidth="2.2" className="dcm-slide-in dcm-delay-3" />
      <circle cx="766" cy="158" r="40" fill={GREEN} fillOpacity="0.28" stroke={GREEN} strokeWidth="2.4" />
      <M x="766" y="220" size={11} fill={GREEN} weight={800}>
        noiseless: I = H(X)
      </M>
      <rect x="676" y="256" width="180" height="140" rx="11" fill={WHITE} stroke={RED} strokeWidth="2.2" className="dcm-slide-in dcm-delay-4" />
      <circle cx="730" cy="316" r="34" fill={RED} fillOpacity="0.18" stroke={RED} strokeWidth="2.2" />
      <circle cx="808" cy="316" r="34" fill={RED} fillOpacity="0.18" stroke={RED} strokeWidth="2.2" />
      <M x="766" y="380" size={11} fill={RED} weight={800}>
        useless: I = 0
      </M>
    </Scene>
  )
}

export function DataProcessingScene() {
  return (
    <Scene caption="Processing can repackage information; it can never create it">
      <Block x="96" y="212" w="110" h="62" label="X" stroke={BLUE} size={20} className="dcm-flux" />
      <Wire d="M206 243 L286 243" stroke={MUTED} width="2.4" marker="url(#dcArr)" className="dcm-current" />
      <M x="246" y="228" size={11} fill={MUTED} weight={800}>
        channel
      </M>
      <Block x="288" y="212" w="110" h="62" label="Y" stroke={AMBER} size={20} className="dcm-flux dcm-delay-1" />
      <Wire d="M398 243 L478 243" stroke={MUTED} width="2.4" marker="url(#dcArr)" className="dcm-current dcm-delay-1" />
      <M x="438" y="228" size={11} fill={MUTED} weight={800}>
        processing
      </M>
      <Block x="480" y="212" w="110" h="62" label="Z" stroke={PURP} size={20} className="dcm-flux dcm-delay-2" />

      <Wire d="M151 176 L343 176" stroke={AMBER} width="2.4" className="dcm-draw" />
      <Wire d="M151 176 L151 190 M343 176 L343 190" stroke={AMBER} width="2.4" />
      <M x="247" y="162" size={12} fill={AMBER} weight={800}>
        I(X;Y)
      </M>
      <Wire d="M151 122 L535 122" stroke={PURP} width="2.4" className="dcm-draw dcm-delay-2" />
      <Wire d="M151 122 L151 136 M535 122 L535 136" stroke={PURP} width="2.4" />
      <M x="343" y="108" size={12} fill={PURP} weight={800}>
        I(X;Z)
      </M>
      <M x="612" y="126" size={16} fill={RED} anchor="start" weight={800} className="dcm-flux dcm-delay-3">
        I(X;Z) ≤ I(X;Y)
      </M>

      <Axes x="620" y="426" w="240" h="200" xLabel="p(x=0)" yLabel="I(X;Y)" origin="left" />
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const p = i / 40
          return [620 + p * 220, 426 - Hb(p) * 150]
        })}
        stroke={BLUE}
        width="3"
        className="dcm-cost-curve dcm-delay-3"
      />
      <Dot cx="730" cy="276" r="8" fill={GREEN} className="dcm-cost-dot dcm-delay-4" />
      <M x="730" y="262" size={11} fill={GREEN} weight={800}>
        capacity
      </M>
      <M x="740" y="464" size={11} fill={MUTED} weight={700}>
        concave — one maximum, no local traps
      </M>
      <Tag x="96" y="330" text="no processing recovers a lost bit" tone={RED} w="250" className="dcm-slide-in dcm-delay-4" />
      <M x="96" y="392" size={11} fill={MUTED} anchor="start" weight={700}>
        error-control coding adds redundancy BEFORE the channel —
      </M>
      <M x="96" y="416" size={11} fill={MUTED} anchor="start" weight={700}>
        that is why it is not forbidden by this inequality
      </M>
    </Scene>
  )
}

export function CapacityMaxScene() {
  const sym = Array.from({ length: 41 }, (_, i) => {
    const p = i / 40
    return [130 + p * 420, 420 - (Hb(p) * 0.531) * 300]
  })
  const asym = Array.from({ length: 41 }, (_, i) => {
    const p = i / 40
    const v = Math.max(0, Hb(p) * 0.44 * (1 - 0.55 * (p - 0.3)))
    return [130 + p * 420, 420 - v * 300]
  })
  return (
    <Scene caption="Capacity is a maximisation over the one thing you control — and it is only uniform when the channel is symmetric">
      <Axes x="130" y="420" w="450" h="330" xLabel="p(x = 0)" yLabel="I(X;Y) bits" origin="left" tickLabels={[[130, '0'], [340, '0.5'], [550, '1']]} />
      <Curve pts={sym} stroke={BLUE} width="3.2" className="dcm-cost-curve" />
      <Curve pts={asym} stroke={ROSE} width="3" dash="8 6" className="dcm-cost-curve dcm-delay-2" />
      <Wire d="M130 261 L340 261" stroke={MUTED} width="1.4" dash="5 6" />
      <Dot cx="340" cy="261" r="9" fill={BLUE} className="dcm-cost-dot dcm-delay-1" />
      <M x="356" y="250" size={11.5} fill={BLUE} anchor="start" weight={800}>
        C = 0.531 bits at p = 0.5
      </M>
      <Dot cx="306" cy="299" r="8" fill={ROSE} className="dcm-cost-dot dcm-delay-3" />
      <M x="290" y="286" size={11} fill={ROSE} anchor="end" weight={800}>
        peak off-centre
      </M>
      <M x="270" y="452" size={11} fill={ROSE} weight={700}>
        asymmetric channel — optimal input is not uniform
      </M>

      <Card
        x="620"
        y="130"
        w="238"
        h="128"
        title="Fixed"
        accent={MUTED}
        className="dcm-slide-in dcm-delay-3"
        lines={['the channel matrix', 'set by the physics']}
        linesY={62}
      />
      <Card
        x="620"
        y="286"
        w="238"
        h="128"
        title="Yours to choose"
        accent={GREEN}
        className="dcm-slide-in dcm-delay-4"
        lines={['the input distribution', 'the maximisation variable']}
        linesY={62}
      />
    </Scene>
  )
}

export function CodingThresholdScene() {
  const decay = (k, floor) =>
    Array.from({ length: 41 }, (_, i) => {
      const t = i / 40
      return [120 + t * 300, 240 - (floor + (1 - floor) * Math.exp(-k * t)) * 150]
    })
  return (
    <Scene caption="An existence proof: it says good codes are common, and names none of them">
      <M x="270" y="80" size={11.5} fill={MUTED} weight={800}>
        error probability vs block length
      </M>
      <Axes x="120" y="240" w="330" h="150" xLabel="block length n" yLabel="P_e" origin="left" />
      <Curve pts={decay(4.2, 0.0)} stroke={GREEN} width="3" className="dcm-cost-curve" />
      <Curve pts={decay(1.9, 0.0)} stroke={BLUE} width="3" className="dcm-cost-curve dcm-delay-1" />
      <Curve pts={decay(3.0, 0.42)} stroke={RED} width="3" className="dcm-cost-curve dcm-delay-2" />
      <M x="462" y="118" size={11} fill={GREEN} anchor="start" weight={800}>
        R = 0.5C
      </M>
      <M x="462" y="146" size={11} fill={BLUE} anchor="start" weight={800}>
        R = 0.9C
      </M>
      <M x="462" y="200" size={11} fill={RED} anchor="start" weight={800}>
        R = 1.1C — floor, never zero
      </M>

      <rect x="90" y="330" width="380" height="88" fill={GREEN} fillOpacity="0.14" className="dcm-fade-in dcm-delay-2" />
      <rect x="470" y="330" width="376" height="88" fill={RED} fillOpacity="0.14" className="dcm-fade-in dcm-delay-3" />
      <Wire d="M90 374 L858 374" stroke={MUTED} width="2.4" marker="url(#dcArr)" />
      <M x="836" y="440" size={11.5} fill={MUTED}>
        rate R
      </M>
      <Wire d="M470 310 L470 438" stroke={N} width="3.6" className="dcm-slide-in dcm-delay-1" />
      <M x="470" y="300" size={13} fill={N} weight={800}>
        C
      </M>
      <L x="280" y="356" size={11.5} fill={GREEN} weight={800}>
        R &lt; C: P_e → 0 with long enough blocks
      </L>
      <L x="658" y="356" size={11.5} fill={RED} weight={800}>
        R &gt; C: P_e bounded away from zero
      </L>
      <M x="280" y="404" size={11} fill={GREEN} weight={700}>
        pay in delay and decoder complexity
      </M>
      <M x="658" y="404" size={11} fill={RED} weight={700}>
        no block length, no code, ever
      </M>
    </Scene>
  )
}

export function ShannonHartleyScene() {
  const snrPts = Array.from({ length: 41 }, (_, i) => {
    const db = -5 + (i * 30) / 40
    const snr = 10 ** (db / 10)
    return [498 + ((db + 5) / 30) * 330, 400 - log2(1 + snr) * 34]
  })
  return (
    <Scene caption="Spectrum is the scarce resource; power gives you logarithms">
      <M x="248" y="72" size={12} fill={BLUE} weight={800}>
        C against bandwidth, SNR fixed
      </M>
      <Axes x="70" y="400" w="350" h="300" xLabel="B (Hz)" yLabel="C (bit/s)" origin="left" />
      <Curve pts={[[78, 396], [400, 124]]} stroke={BLUE} width="3.2" className="dcm-cost-curve" />
      <Wire d="M170 400 L170 318" stroke={MUTED} width="1.4" dash="5 6" />
      <Wire d="M270 400 L270 234" stroke={MUTED} width="1.4" dash="5 6" />
      <Dot cx="170" cy="318" r="7" fill={AMBER} className="dcm-cost-dot dcm-delay-1" />
      <Dot cx="270" cy="234" r="7" fill={AMBER} className="dcm-cost-dot dcm-delay-2" />
      <M x="190" y="286" size={11} fill={AMBER} anchor="start" weight={800}>
        double B → double C
      </M>
      <M x="248" y="440" size={11} fill={BLUE} weight={700}>
        linear in B
      </M>

      <M x="662" y="72" size={12} fill={ROSE} weight={800}>
        C against SNR, bandwidth fixed
      </M>
      <Axes x="498" y="400" w="350" h="300" xLabel="S/N (dB)" yLabel="C (bit/s)" origin="left" />
      <Curve pts={snrPts} stroke={ROSE} width="3.2" className="dcm-cost-curve dcm-delay-2" />
      <Wire d="M630 400 L630 312" stroke={MUTED} width="1.4" dash="5 6" />
      <Wire d="M663 400 L663 282" stroke={MUTED} width="1.4" dash="5 6" />
      <Dot cx="630" cy="312" r="7" fill={AMBER} className="dcm-cost-dot dcm-delay-3" />
      <Dot cx="663" cy="282" r="7" fill={AMBER} className="dcm-cost-dot dcm-delay-4" />
      <M x="690" y="268" size={11} fill={AMBER} anchor="start" weight={800}>
        double S → +1 bit/Hz
      </M>
      <M x="662" y="440" size={11} fill={ROSE} weight={700}>
        logarithmic in S/N
      </M>

      <rect x="70" y="456" width="778" height="34" rx="9" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.2" className="dcm-slide-in dcm-delay-5" />
      <M x="459" y="478" size={11.5} fill={GREEN} weight={800}>
        C = B·log₂(1 + S/N) — buy bandwidth if you can, buy power only if you must
      </M>
    </Scene>
  )
}

export function ShannonLimitScene() {
  const xOf = (db) => 110 + ((db + 2) / 17) * 700
  const yOf = (eta) => 420 - (log2(eta) + 3.33) * 48
  const bound = []
  for (let i = 0; i <= 60; i += 1) {
    const eta = 0.11 * 1.075 ** i
    if (eta > 8) break
    const ebn0 = (10 * Math.log(((2 ** eta - 1) / eta)) / Math.LN10)
    bound.push([xOf(ebn0), yOf(eta)])
  }
  return (
    <Scene caption="Every uncoded scheme sits far to the right of the boundary — the gap is what coding is for">
      <Axes x="110" y="420" w="720" h="340" xLabel="E_b/N₀ (dB)" yLabel="bit/s/Hz" origin="left" tickLabels={[[xOf(-1.59), '−1.6'], [xOf(5), '5'], [xOf(10), '10'], [xOf(15), '15']]} />
      {/* Everything above-left of the capacity boundary is unreachable, so the
          shading follows the curve rather than a bounding box. */}
      <path
        d={`M${bound.map(([px, py]) => `${px.toFixed(1)} ${py.toFixed(1)}`).join(' L')} L110 ${bound[bound.length - 1][1].toFixed(1)} L110 ${bound[0][1].toFixed(1)} Z`}
        fill={RED}
        fillOpacity="0.1"
        className="dcm-fade-in dcm-delay-2"
      />
      <Curve pts={bound} stroke={N} width="3.2" className="dcm-cost-curve" />
      <Wire d={`M${xOf(-1.59).toFixed(1)} 420 L${xOf(-1.59).toFixed(1)} 92`} stroke={RED} width="3.4" className="dcm-slide-in dcm-delay-1" />
      <M x="146" y="112" size={12} fill={RED} anchor="start" weight={800}>
        Shannon limit −1.59 dB
      </M>
      <M x="216" y="158" size={11.5} fill={RED} anchor="start" weight={800}>
        impossible — no code exists here
      </M>
      {[
        ['uncoded BPSK', 9.6, 1, ROSE],
        ['uncoded QPSK', 9.6, 2, AMBER],
        ['uncoded 16-QAM', 13.4, 4, PURP],
        ['turbo coded', 0.7, 1, GREEN],
      ].map(([label, db, eta, tone], i) => (
        <g key={String(label)}>
          <Dot cx={xOf(Number(db)).toFixed(1)} cy={yOf(Number(eta)).toFixed(1)} r="8" fill={tone} className={`dcm-cost-dot dcm-delay-${i}`} />
          <M
            x={xOf(Number(db)) + 14}
            y={yOf(Number(eta)) - 10}
            size={11}
            fill={tone}
            anchor="start"
            weight={800}
          >
            {String(label)}
          </M>
        </g>
      ))}
      <g className="dcm-flux dcm-delay-5">
        <Wire d={`M${(xOf(9.6) - 10).toFixed(1)} ${(yOf(1) + 22).toFixed(1)} L${(xOf(-1.59) + 10).toFixed(1)} ${(yOf(1) + 22).toFixed(1)}`} stroke={GREEN} width="2.6" marker="url(#dcArrG)" />
      </g>
      <M x={((xOf(9.6) + xOf(-1.59)) / 2).toFixed(1)} y={(yOf(1) + 44).toFixed(1)} size={11.5} fill={GREEN} weight={800}>
        11.2 dB of coding gain still on the table
      </M>
    </Scene>
  )
}

/* ── Module 4 — linear block and cyclic codes ───────────────────── */

export function FecArqScene() {
  return (
    <Scene caption="FEC pays bandwidth up front; ARQ pays latency only when something breaks">
      <Tag x="56" y="66" text="FEC" tone={GREEN} w="70" />
      <Wire d="M56 150 L846 150" stroke={MUTED} width="1.6" dash="5 7" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} className={`dcm-cell-in dcm-delay-${i % 5}`}>
          <rect x={140 + i * 118} y="124" width="104" height="52" rx="8" fill={WHITE} stroke={i === 3 ? RED : GREEN} strokeWidth="2.4" />
          <rect x={140 + i * 118 + 74} y="124" width="30" height="52" rx="8" fill={GREEN} fillOpacity="0.22" />
          <M x={140 + i * 118 + 37} y="156" size={11.5} fill={i === 3 ? RED : N} weight={800}>
            {i === 3 ? 'bad' : 'data'}
          </M>
        </g>
      ))}
      <M x="826" y="112" size={10.5} fill={GREEN} anchor="end" weight={800}>
        shaded tail = parity, always sent
      </M>
      <g className="dcm-flux dcm-delay-4">
        <circle cx="546" cy="150" r="19" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <path d="M537 150 L544 158 L556 142" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
      </g>
      <M x="546" y="198" size={11} fill={GREEN} weight={800}>
        repaired in place — stream never stops
      </M>

      <Tag x="56" y="248" text="ARQ" tone={ROSE} w="70" />
      <Wire d="M56 330 L846 330" stroke={MUTED} width="1.6" dash="5 7" />
      {[0, 1, 2].map((i) => (
        <g key={i} className={`dcm-cell-in dcm-delay-${i}`}>
          <rect x={140 + i * 118} y="304" width="104" height="52" rx="8" fill={WHITE} stroke={i === 2 ? RED : BLUE} strokeWidth="2.4" />
          <M x={140 + i * 118 + 37} y="336" size={11.5} fill={i === 2 ? RED : N} weight={800}>
            {i === 2 ? 'bad' : 'data'}
          </M>
        </g>
      ))}
      <path d="M368 304 L400 336 M400 304 L368 336" stroke={RED} strokeWidth="3" strokeLinecap="round" className="dcm-flux dcm-delay-2" />
      <Wire d="M384 360 C384 420, 200 420, 200 364" stroke={ROSE} width="2.4" marker="url(#dcArrRo)" dash="7 6" className="dcm-current-slow dcm-delay-3" />
      <M x="292" y="414" size={10.5} fill={ROSE} weight={800}>
        feedback channel
      </M>
      <rect x="404" y="304" width="176" height="52" rx="8" fill={RED} fillOpacity="0.08" stroke={RED} strokeWidth="2" strokeDasharray="6 6" />
      <M x="492" y="336" size={11} fill={RED} weight={800}>
        round-trip delay
      </M>
      <g className="dcm-cell-in dcm-delay-5">
        <rect x="594" y="304" width="104" height="52" rx="8" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <M x="646" y="336" size={11.5} fill={GREEN} weight={800}>
          resent
        </M>
      </g>

      <Panel
        x="620"
        y="392"
        w="238"
        title="FEC vs ARQ"
        accent={INDIGO}
        rowH={24}
        className="dcm-slide-in dcm-delay-5"
        rows={[
          ['return path', 'no / yes'],
          ['delay', 'fixed / variable'],
          ['bandwidth', 'always / on error'],
        ]}
      />
    </Scene>
  )
}

export function LinearSubspaceScene() {
  const cw = new Set([0, 3, 5, 6, 9, 10, 12, 15, 17, 18, 20, 23, 24, 27, 29, 30])
  return (
    <Scene caption="The codewords form a subspace — that single fact buys the matrix encoder and the syndrome table">
      {Array.from({ length: 32 }, (_, i) => {
        const r = Math.floor(i / 8)
        const c = i % 8
        const hot = cw.has(i)
        return (
          <rect
            key={i}
            x={70 + c * 54}
            y={110 + r * 54}
            width="46"
            height="46"
            rx="7"
            fill={hot ? GREEN : MUTED}
            fillOpacity={hot ? 0.28 : 0.08}
            stroke={hot ? GREEN : MUTED}
            strokeWidth={hot ? 2.4 : 1.2}
            className={hot ? `dcm-cell-in dcm-delay-${i % 5}` : ''}
          />
        )
      })}
      <M x="286" y="90" size={11.5} fill={MUTED} weight={700}>
        all 2ⁿ n-tuples · the 2ᵏ codewords are green
      </M>
      <circle cx="93" cy="133" r="26" fill="none" stroke={ROSE} strokeWidth="2.6" className="dcm-flux dcm-delay-3" />
      <M x="93" y="356" size={10.5} fill={ROSE} weight={800}>
        all-zero word
      </M>
      <Wire d="M93 344 L93 162" stroke={ROSE} width="1.6" dash="5 6" />
      <g className="dcm-flux dcm-delay-4">
        <rect x="124" y="218" width="46" height="46" rx="7" fill="none" stroke={AMBER} strokeWidth="3" />
        <rect x="286" y="218" width="46" height="46" rx="7" fill="none" stroke={AMBER} strokeWidth="3" />
        <rect x="394" y="272" width="46" height="46" rx="7" fill="none" stroke={AMBER} strokeWidth="3" />
      </g>
      <M x="228" y="247" size={16} fill={AMBER} weight={800}>
        +
      </M>
      <M x="358" y="247" size={16} fill={AMBER} weight={800}>
        =
      </M>
      <Wire d="M378 250 L398 268" stroke={AMBER} width="2.2" marker="url(#dcArrA)" />
      <M x="286" y="408" size={11} fill={AMBER} weight={800}>
        the sum of two codewords is a codeword
      </M>

      <Card
        x="560"
        y="110"
        w="298"
        h="230"
        title="What linearity buys"
        accent={BLUE}
        className="dcm-slide-in dcm-delay-4"
        lines={['encoder is one matrix multiply', 'd_min = minimum non-zero weight', 'syndrome depends only on the error', 'never on which codeword was sent']}
        linesY={80}
      />
    </Scene>
  )
}

export function GeneratorMatrixScene() {
  const rows = [
    ['1', '0', '0', '0', '1', '1', '0'],
    ['0', '1', '0', '0', '0', '1', '1'],
    ['0', '0', '1', '0', '1', '1', '1'],
    ['0', '0', '0', '1', '1', '0', '1'],
  ]
  return (
    <Scene caption="A codeword is the XOR of the generator rows the message selects — nothing more">
      <Bits x="60" y="96" bits={['1', '0', '1', '1']} cw={34} h={34} accent={BLUE} label="m =" className="dcm-cell-in" />
      <M x="216" y="120" size={18} fill={MUTED}>
        ×
      </M>
      <Matrix x="266" y="72" name="G =" rows={rows} cell={30} accent={INDIGO} className="dcm-cell-in dcm-delay-1" />
      <M x="510" y="120" size={18} fill={MUTED}>
        =
      </M>
      <Bits x="546" y="96" bits={['1', '0', '1', '1', '0', '0', '1']} cw={34} h={34} accent={GREEN} className="dcm-cell-in dcm-delay-3" />
      <M x="660" y="80" size={11} fill={GREEN} weight={800}>
        c = m·G
      </M>

      {[0, 2, 3].map((r, i) => (
        <g key={r} className={`dcm-flux dcm-delay-${i}`}>
          <rect x="260" y={66 + r * 30} width="216" height="30" rx="5" fill={[BLUE, PURP, ROSE][i]} fillOpacity="0.16" />
          <Wire d={`M${77 + r * 34} 148 L${77 + r * 34} 168 L252 ${87 + r * 30}`} stroke={[BLUE, PURP, ROSE][i]} width="2" marker={`url(#${markerFor([BLUE, PURP, ROSE][i])})`} />
        </g>
      ))}
      <M x="368" y="240" size={11.5} fill={MUTED} weight={800}>
        rows 1, 3 and 4 are selected — XOR them
      </M>

      <rect x="60" y="276" width="796" height="192" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" className="dcm-slide-in dcm-delay-4" />
      <L x="458" y="302" size={12.5} fill={GREEN} weight={800}>
        Systematic form: G = [ I | P ]
      </L>
      <Matrix x="292" y="320" rows={rows} cell={26} accent={GREEN} size={12} />
      <rect x="286" y="314" width="116" height="116" rx="6" fill="none" stroke={GREEN} strokeWidth="2.8" strokeDasharray="6 5" className="dcm-flux dcm-delay-5" />
      <M x="344" y="452" size={10.5} fill={GREEN} weight={800}>
        identity — message appears verbatim
      </M>
      <M x="560" y="452" size={10.5} fill={INDIGO} weight={800}>
        P — the parity half
      </M>
    </Scene>
  )
}

export function GhDualityScene() {
  const G = [
    ['1', '0', '0', '0', '1', '1', '0'],
    ['0', '1', '0', '0', '0', '1', '1'],
    ['0', '0', '1', '0', '1', '1', '1'],
    ['0', '0', '0', '1', '1', '0', '1'],
  ]
  const H = [
    ['1', '0', '1', '1', '1', '0', '0'],
    ['1', '1', '1', '0', '0', '1', '0'],
    ['0', '1', '1', '1', '0', '0', '1'],
  ]
  return (
    <Scene caption="G builds, H tests — and the same P block appears in both, transposed">
      <Matrix x="92" y="76" name="G" rows={G} cell={26} accent={BLUE} className="dcm-cell-in" size={11.5} />
      <M x="182" y="62" size={10.5} fill={BLUE} weight={700}>
        builds codewords · k × n
      </M>
      <Wire d="M290 130 L368 130" stroke={BLUE} width="2.4" marker="url(#dcArrB)" className="dcm-current" />
      <Bits x="374" y="112" bits={['1', '0', '1', '1', '0', '0', '1']} cw={26} h={30} accent={GREEN} size={11} className="dcm-cell-in dcm-delay-1" />
      <Wire d="M560 130 L636 130" stroke={GREEN} width="2.4" marker="url(#dcArrG)" className="dcm-current dcm-delay-1" />
      <Block x="640" y="102" w="120" h="60" label="Hᵀ" stroke={PURP} mono size={18} className="dcm-charge dcm-delay-2" />
      <M x="700" y="88" size={10.5} fill={PURP} weight={700}>
        tests · (n−k) × n
      </M>
      <Wire d="M700 162 L700 202" stroke={PURP} width="2.4" marker="url(#dcArrP)" />
      <Tag x="652" y="206" text="s = 0" tone={GREEN} w="96" className="dcm-flux dcm-delay-3" />

      <rect x="290" y="196" width="238" height="48" rx="10" fill={AMBER} fillOpacity="0.12" stroke={AMBER} strokeWidth="2.6" className="dcm-flux dcm-delay-3" />
      <M x="409" y="226" size={15} fill={AMBER} weight={800}>
        G · Hᵀ = 0
      </M>

      <M x="150" y="292" size={12} fill={MUTED} anchor="start" weight={800}>
        Systematic pair
      </M>
      <M x="122" y="330" size={13} fill={BLUE} anchor="end" weight={800}>
        G =
      </M>
      <rect x="130" y="312" width="118" height="30" rx="5" fill={MUTED} fillOpacity="0.14" stroke={MUTED} strokeWidth="2" />
      <M x="189" y="332" size={12} fill={MUTED} weight={800}>
        I (4×4)
      </M>
      <rect x="252" y="312" width="118" height="30" rx="5" fill={ROSE} fillOpacity="0.2" stroke={ROSE} strokeWidth="2.4" className="dcm-flux dcm-delay-4" />
      <M x="311" y="332" size={12} fill={ROSE} weight={800}>
        P (4×3)
      </M>

      <M x="122" y="424" size={13} fill={PURP} anchor="end" weight={800}>
        H =
      </M>
      <rect x="130" y="406" width="118" height="30" rx="5" fill={ROSE} fillOpacity="0.2" stroke={ROSE} strokeWidth="2.4" className="dcm-flux dcm-delay-4" />
      <M x="189" y="426" size={12} fill={ROSE} weight={800}>
        Pᵀ (3×4)
      </M>
      <rect x="252" y="406" width="118" height="30" rx="5" fill={MUTED} fillOpacity="0.14" stroke={MUTED} strokeWidth="2" />
      <M x="311" y="426" size={12} fill={MUTED} weight={800}>
        I (3×3)
      </M>
      <Wire d="M311 346 C388 360, 388 388, 311 402" stroke={ROSE} width="2.4" marker="url(#dcArrRo)" className="dcm-draw dcm-delay-5" />
      <M x="412" y="378" size={11} fill={ROSE} anchor="start" weight={800}>
        transpose
      </M>

      <Matrix x="560" y="300" name="H" rows={H} cell={26} accent={PURP} className="dcm-cell-in dcm-delay-4" size={11.5} />
      <M x="650" y="420" size={10.5} fill={MUTED} weight={700}>
        every column is distinct and non-zero
      </M>
    </Scene>
  )
}

export function SystematicLayoutScene() {
  return (
    <Scene caption="The message is copied, not computed — the encoder only has to build n − k parity bits">
      {Array.from({ length: 7 }, (_, i) => (
        <g key={i} className={`dcm-cell-in dcm-delay-${i % 5}`}>
          <rect
            x={96 + i * 74}
            y="118"
            width="66"
            height="56"
            rx="9"
            fill={i < 4 ? GREEN : BLUE}
            fillOpacity="0.18"
            stroke={i < 4 ? GREEN : BLUE}
            strokeWidth="2.6"
          />
          <M x={129 + i * 74} y="153" size={15} fill={i < 4 ? GREEN : BLUE} weight={800}>
            {i < 4 ? `m${i + 1}` : `p${i - 3}`}
          </M>
        </g>
      ))}
      <Wire d="M96 100 L458 100" stroke={GREEN} width="2.4" />
      <Wire d="M96 100 L96 112 M458 100 L458 112" stroke={GREEN} width="2.4" />
      <M x="277" y="88" size={11.5} fill={GREEN} weight={800}>
        message — copied verbatim
      </M>
      <Wire d="M466 100 L614 100" stroke={BLUE} width="2.4" />
      <Wire d="M466 100 L466 112 M614 100 L614 112" stroke={BLUE} width="2.4" />
      <M x="540" y="88" size={11.5} fill={BLUE} weight={800}>
        parity — computed
      </M>

      {[
        [0, 4, 216],
        [2, 5, 260],
        [3, 6, 304],
      ].map(([from, to, y], i) => (
        <g key={i} className={`dcm-draw dcm-delay-${i}`}>
          <Wire d={`M${129 + Number(from) * 74} 178 L${129 + Number(from) * 74} ${y} L${129 + Number(to) * 74} ${y} L${129 + Number(to) * 74} 178`} stroke={[PURP, AMBER, ROSE][i]} width="2.2" marker={`url(#${markerFor([PURP, AMBER, ROSE][i])})`} />
          <circle cx={(129 + Number(from) * 74 + 129 + Number(to) * 74) / 2} cy={y} r="12" fill={WHITE} stroke={[PURP, AMBER, ROSE][i]} strokeWidth="2.2" />
          <M x={(129 + Number(from) * 74 + 129 + Number(to) * 74) / 2} y={Number(y) + 5} size={13} fill={[PURP, AMBER, ROSE][i]} weight={800}>
            ⊕
          </M>
        </g>
      ))}
      <M x="277" y="340" size={11} fill={MUTED} weight={700}>
        each parity bit is the XOR of a fixed subset of message bits
      </M>

      <Card x="96" y="366" w="342" h="98" title="Non-systematic" accent={ROSE} className="dcm-slide-in dcm-delay-3" lines={['compute all n = 7 output bits', 'and search to recover the message']} linesY={58} />
      <Card x="474" y="366" w="342" h="98" title="Systematic" accent={GREEN} className="dcm-slide-in dcm-delay-4" lines={['compute only n − k = 3 parity bits', 'message is already there to read off']} linesY={58} />
      <Tag x="650" y="212" text="distance properties identical" tone={MUTED} w="208" className="dcm-slide-in dcm-delay-5" />
    </Scene>
  )
}

export function SyndromeIndependenceScene() {
  const tracks = [
    ['c₁ = 1011001', 'r₁ = 1001001', 118, BLUE],
    ['c₂ = 0101101', 'r₂ = 0111101', 208, AMBER],
    ['c₃ = 1110010', 'r₃ = 1100010', 298, PURP],
  ]
  return (
    <Scene caption="Same error, same syndrome, whatever was sent — that is why a lookup table can replace a search">
      {tracks.map(([c, r, y, tone]) => (
        <g key={String(c)} className="dcm-cell-in">
          <M x="64" y={Number(y) + 5} size={12.5} fill={tone} anchor="start" weight={800}>
            {String(c)}
          </M>
          <Wire d={`M212 ${y} L268 ${y}`} stroke={tone} width="2.2" marker={`url(#${markerFor(tone)})`} />
          <circle cx="286" cy={y} r="16" fill={WHITE} stroke={RED} strokeWidth="2.4" />
          <M x="286" y={Number(y) + 6} size={15} fill={RED} weight={800}>
            ⊕
          </M>
          <Wire d={`M304 ${y} L362 ${y}`} stroke={tone} width="2.2" marker={`url(#${markerFor(tone)})`} />
          <M x="368" y={Number(y) + 5} size={12.5} fill={tone} anchor="start" weight={800}>
            {String(r)}
          </M>
          <Wire d={`M516 ${y} L582 208`} stroke={tone} width="2" marker={`url(#${markerFor(tone)})`} className="dcm-current" />
        </g>
      ))}
      <Wire d="M286 366 L286 322" stroke={RED} width="2.4" marker="url(#dcArrR)" className="dcm-current dcm-delay-2" />
      <M x="286" y="390" size={12} fill={RED} weight={800}>
        e = 0010000
      </M>

      <Block x="584" y="178" w="94" h="60" label="Hᵀ" stroke={PURP} mono size={16} className="dcm-charge dcm-delay-3" />
      <Wire d="M678 208 L730 208" stroke={GREEN} width="2.6" marker="url(#dcArrG)" className="dcm-current dcm-delay-3" />
      <circle cx="790" cy="208" r="42" fill={WHITE} stroke={GREEN} strokeWidth="3" className="dcm-flux dcm-delay-4" />
      <M x="790" y="204" size={13} fill={GREEN} weight={800}>
        s = 011
      </M>
      <M x="790" y="224" size={9.5} fill={MUTED} weight={700}>
        one value
      </M>

      <rect x="56" y="420" width="380" height="42" rx="9" fill={WHITE} stroke={RED} strokeWidth="2.2" className="dcm-slide-in dcm-delay-4" />
      <M x="246" y="446" size={12} fill={RED} weight={800}>
        2ᵏ = 16 codewords to search
      </M>
      <Wire d="M76 441 L416 441" stroke={RED} width="2.4" className="dcm-draw dcm-delay-5" />
      <rect x="464" y="420" width="380" height="42" rx="9" fill={WHITE} stroke={GREEN} strokeWidth="2.4" className="dcm-slide-in dcm-delay-5" />
      <M x="654" y="446" size={12} fill={GREEN} weight={800}>
        2ⁿ⁻ᵏ = 8 syndromes to look up
      </M>
    </Scene>
  )
}

export function DistanceWeightScene() {
  const a = ['1', '0', '1', '1', '0', '0', '1']
  const b = ['1', '1', '1', '0', '0', '1', '1']
  const x = a.map((v, i) => (v === b[i] ? '0' : '1'))
  return (
    <Scene caption="Distance between any two codewords is the weight of a third — so weights alone give d_min">
      <M x="88" y="118" size={12} fill={MUTED} anchor="start" weight={800}>
        compare two codewords
      </M>
      {[a, b].map((word, r) => (
        <g key={r}>
          {word.map((v, i) => {
            const diff = a[i] !== b[i]
            return (
              <g key={i} className={diff ? `dcm-cell-in dcm-delay-${i % 5}` : ''}>
                <rect x={88 + i * 42} y={136 + r * 46} width="36" height="38" rx="6" fill={diff ? RED : WHITE} fillOpacity={diff ? 0.16 : 1} stroke={diff ? RED : MUTED} strokeWidth={diff ? 2.5 : 1.7} />
                <M x={106 + i * 42} y={161 + r * 46} size={14} fill={diff ? RED : N} weight={800}>
                  {v}
                </M>
              </g>
            )
          })}
        </g>
      ))}
      <M x="235" y="260" size={13} fill={RED} weight={800}>
        distance = 3
      </M>

      <M x="418" y="200" size={20} fill={MUTED}>
        =
      </M>

      <M x="490" y="118" size={12} fill={MUTED} anchor="start" weight={800}>
        weigh their XOR
      </M>
      {x.map((v, i) => (
        <g key={i} className={v === '1' ? `dcm-cell-in dcm-delay-${i % 5}` : ''}>
          <rect x={490 + i * 42} y="160" width="36" height="38" rx="6" fill={v === '1' ? RED : WHITE} fillOpacity={v === '1' ? 0.16 : 1} stroke={v === '1' ? RED : MUTED} strokeWidth={v === '1' ? 2.5 : 1.7} />
          <M x={508 + i * 42} y="185" size={14} fill={v === '1' ? RED : N} weight={800}>
            {v}
          </M>
        </g>
      ))}
      <M x="637" y="232" size={13} fill={RED} weight={800}>
        weight = 3
      </M>

      <Panel
        x="88"
        y="292"
        w="330"
        title="non-zero codeword weights"
        accent={INDIGO}
        mono
        rowH={26}
        className="dcm-slide-in dcm-delay-3"
        rows={[
          ['1011001', '4'],
          ['0101101', '4'],
          ['1110010', '4'],
          ['1101000', '3', GREEN],
        ]}
      />
      <Tag x="240" y="454" text="d_min = 3" tone={GREEN} w="120" className="dcm-flux dcm-delay-5" />

      <Card
        x="470"
        y="292"
        w="388"
        h="150"
        title="Why this is not a detail"
        accent={GREEN}
        className="dcm-slide-in dcm-delay-4"
        lines={['pairs: 2ᵏ choose 2 = 120 comparisons', 'weights: 2ᵏ − 1 = 15 lookups', 'identical answer, an order of magnitude less work']}
        linesY={68}
      />
    </Scene>
  )
}

export function DecodingSpheresScene() {
  return (
    <Scene caption="d_min = 5 buys correct-2, or correct-1 and detect-3, or detect-4 — you pick one row">
      <circle cx="250" cy="200" r="96" fill={BLUE} fillOpacity="0.1" stroke={BLUE} strokeWidth="2.4" strokeDasharray="7 6" className="dcm-emerge" />
      <circle cx="590" cy="200" r="96" fill={PURP} fillOpacity="0.1" stroke={PURP} strokeWidth="2.4" strokeDasharray="7 6" className="dcm-emerge dcm-delay-1" />
      <Dot cx="250" cy="200" r="11" fill={BLUE} />
      <Dot cx="590" cy="200" r="11" fill={PURP} />
      <M x="250" y="232" size={12} fill={BLUE} weight={800}>
        c₁
      </M>
      <M x="590" y="232" size={12} fill={PURP} weight={800}>
        c₂
      </M>
      <g className="dcm-flux dcm-delay-2">
        <Wire d="M262 174 L578 174" stroke={N} width="2.4" marker="url(#dcArr)" />
        <Wire d="M578 174 L262 174" stroke={N} width="2.4" marker="url(#dcArr)" />
      </g>
      <M x="420" y="160" size={12.5} fill={N} weight={800}>
        d_min = 5
      </M>
      <M x="170" y="118" size={11} fill={BLUE} weight={800}>
        t = 2
      </M>
      <rect x="346" y="188" width="148" height="24" rx="6" fill={AMBER} fillOpacity="0.16" stroke={AMBER} strokeWidth="2" />
      <M x="420" y="205" size={10.5} fill={AMBER} weight={800}>
        unused distance
      </M>

      <Dot cx="304" cy="250" r="8" fill={GREEN} className="dcm-cell-in dcm-delay-3" />
      <Wire d="M298 244 L262 208" stroke={GREEN} width="2.6" marker="url(#dcArrG)" className="dcm-current dcm-delay-3" />
      <M x="318" y="272" size={10.5} fill={GREEN} anchor="start" weight={800}>
        inside a sphere → corrected
      </M>
      <Dot cx="420" cy="262" r="8" fill={RED} className="dcm-cell-in dcm-delay-4" />
      <M x="420" y="292" size={15} fill={RED} weight={800}>
        ?
      </M>
      <M x="420" y="316" size={10.5} fill={RED} weight={800}>
        in the gap → detected, not correctable
      </M>

      <Panel
        x="690"
        y="110"
        w="168"
        title="pick one row"
        accent={INDIGO}
        mono
        rowH={28}
        className="dcm-slide-in dcm-delay-4"
        rows={[
          ['correct 2', 'detect 2'],
          ['correct 1', 'detect 3'],
          ['correct 0', 'detect 4'],
        ]}
      />
      <M x="450" y="378" size={11.5} fill={MUTED} weight={700}>
        t = ⌊(d_min − 1)/2⌋ for correction · d_min − 1 for detection alone
      </M>
      <M x="450" y="404" size={11} fill={MUTED} weight={700}>
        the decoder must be told which trade it is making — the code does not decide
      </M>
    </Scene>
  )
}

export function StandardArrayScene() {
  const top = ['0000000', '1011001', '0101101', '1110100']
  const cosets = [
    ['1000000', '0011001', '1101101', '0110100', '110'],
    ['0100000', '1111001', '0001101', '1010100', '011'],
    ['0010000', '1001001', '0111101', '1100100', '111'],
  ]
  return (
    <Scene caption="Find the coset, read its leader, subtract — the whole decoder is one lookup">
      <rect x="56" y="82" width="640" height="34" rx="7" fill={INDIGO} />
      {top.map((c, i) => (
        <M key={c} x={136 + i * 160} y="105" size={12} fill={WHITE} weight={800}>
          {c}
        </M>
      ))}
      <M x="770" y="105" size={12} fill={INDIGO} weight={800}>
        syndrome
      </M>
      {cosets.map((row, r) => (
        <g key={row[4]} className={`dcm-cell-in dcm-delay-${r}`}>
          {row.slice(0, 4).map((w, i) => (
            <g key={w}>
              <rect
                x={56 + i * 160}
                y={124 + r * 52}
                width="156"
                height="44"
                rx="7"
                fill={i === 0 ? AMBER : WHITE}
                fillOpacity={i === 0 ? 0.16 : 1}
                stroke={i === 0 ? AMBER : MUTED}
                strokeWidth={i === 0 ? 2.4 : 1.6}
              />
              <M x={136 + i * 160} y={151 + r * 52} size={12} fill={i === 0 ? AMBER : N} weight={i === 0 ? 800 : 650}>
                {w}
              </M>
            </g>
          ))}
          <rect x="716" y={124 + r * 52} width="128" height="44" rx="7" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="2.2" />
          <M x="780" y={151 + r * 52} size={12.5} fill={GREEN} weight={800}>
            {row[4]}
          </M>
        </g>
      ))}
      <M x="136" y="308" size={11} fill={AMBER} weight={800}>
        coset leaders
      </M>
      <M x="780" y="308" size={11} fill={GREEN} weight={800}>
        constant along the row
      </M>

      <circle cx="456" cy="250" r="26" fill="none" stroke={ROSE} strokeWidth="3" className="dcm-flux dcm-delay-3" />
      <Wire d="M428 250 L216 250" stroke={ROSE} width="2.6" marker="url(#dcArrRo)" className="dcm-current dcm-delay-4" />
      <Wire d="M456 222 L456 122" stroke={GREEN} width="2.6" marker="url(#dcArrG)" className="dcm-current dcm-delay-5" />
      <M x="380" y="350" size={11.5} fill={ROSE} weight={800}>
        received word
      </M>
      <Wire d="M420 340 L450 278" stroke={ROSE} width="1.6" dash="5 5" />

      <rect x="56" y="386" width="788" height="76" rx="11" fill={WHITE} stroke={INDIGO} strokeWidth="2.3" className="dcm-slide-in dcm-delay-5" />
      <M x="450" y="414" size={12} fill={INDIGO} weight={800}>
        1 · syndrome selects the row   2 · leader is the assumed error   3 · XOR it off
      </M>
      <M x="450" y="442" size={11} fill={MUTED} weight={700}>
        the array is the proof; the syndrome table is what you actually build
      </M>
    </Scene>
  )
}

export function HammingSyndromeScene() {
  const H = [
    ['0', '0', '0', '1', '1', '1', '1'],
    ['0', '1', '1', '0', '0', '1', '1'],
    ['1', '0', '1', '0', '1', '0', '1'],
  ]
  const cols = ['001', '010', '011', '100', '101', '110', '111']
  return (
    <Scene caption="Order the columns as binary counting and the syndrome is the address of the bad bit">
      {cols.map((c, i) => (
        <M key={c} x={231 + i * 54} y="84" size={11} fill={i === 4 ? ROSE : MUTED} weight={800}>
          {c}
        </M>
      ))}
      <Matrix x="204" y="96" name="H =" rows={H} cell={54} accent={INDIGO} mark={4} markTone={ROSE} className="dcm-cell-in" size={13} />

      <Bits x="204" y="290" bits={['1', '0', '1', '1', '1', '0', '1']} cw={54} h={44} accent={BLUE} label="r =" mark={4} markTone={RED} className="dcm-flux dcm-delay-1" size={15} />
      <M x="420" y="360" size={11} fill={RED} weight={800}>
        bit 5 flipped in the channel
      </M>

      <Wire d="M584 312 L640 312" stroke={BLUE} width="2.4" marker="url(#dcArrB)" className="dcm-current dcm-delay-2" />
      <Block x="642" y="288" w="108" h="48" label="s = r·Hᵀ" stroke={PURP} mono size={11.5} className="dcm-charge dcm-delay-2" />
      <Wire d="M750 312 L796 312" stroke={PURP} width="2.4" marker="url(#dcArrP)" />
      <Tag x="792" y="298" text="s = 101" tone={ROSE} w="66" className="dcm-flux dcm-delay-3" />
      <Wire d="M824 296 C824 200, 620 142, 447 136" stroke={ROSE} width="3" marker="url(#dcArrRo)" dash="8 6" className="dcm-current dcm-delay-4" />
      <Wire d="M447 260 L447 284" stroke={GREEN} width="3" marker="url(#dcArrG)" className="dcm-current dcm-delay-5" />

      <Card
        x="56"
        y="386"
        w="788"
        h="82"
        title="Perfect code — nothing wasted"
        accent={GREEN}
        className="dcm-slide-in dcm-delay-5"
        lines={['2³ = 8 syndromes: 1 says “no error”, the other 7 name the 7 bit positions exactly', 'so the spheres of radius 1 tile the whole space with no gap left over']}
        linesY={54}
      />
    </Scene>
  )
}

export function CyclicShiftScene() {
  const bits = ['1', '0', '1', '1', '0', '0', '1']
  const cx = 250
  const cy = 236
  const R = 118
  return (
    <Scene caption="A cyclic shift is multiplication by x, reduced modulo xⁿ − 1 — nothing else is going on">
      <circle cx={cx} cy={cy} r={R} fill="none" stroke={MUTED} strokeWidth="1.8" strokeDasharray="6 7" />
      {bits.map((b, i) => {
        const a = (2 * Math.PI * i) / 7 - Math.PI / 2
        const px = cx + R * Math.cos(a)
        const py = cy + R * Math.sin(a)
        return (
          <g key={i} className={`dcm-cell-in dcm-delay-${i % 5}`}>
            <circle cx={px.toFixed(1)} cy={py.toFixed(1)} r="20" fill={i === 6 ? AMBER : WHITE} fillOpacity={i === 6 ? 0.22 : 1} stroke={i === 6 ? AMBER : BLUE} strokeWidth="2.4" />
            <M x={px.toFixed(1)} y={(py + 5).toFixed(1)} size={14} fill={i === 6 ? AMBER : N} weight={800}>
              {b}
            </M>
          </g>
        )
      })}
      <path d={`M${cx + 64} ${cy - 56} A84 84 0 0 1 ${cx + 76} ${cy + 38}`} fill="none" stroke={ROSE} strokeWidth="3" markerEnd="url(#dcArrRo)" className="dcm-draw dcm-delay-2" />
      <M x={cx} y={cy + 6} size={11.5} fill={ROSE} weight={800}>
        rotate by one
      </M>
      <M x={cx} y={cy + 172} size={11} fill={AMBER} weight={800}>
        the top bit wraps back in at the bottom
      </M>

      <M x="440" y="132" size={13} fill={BLUE} anchor="start" weight={800}>
        c(x) = 1 + x² + x³ + x⁶
      </M>
      <Wire d="M440 152 L836 152" stroke={MUTED} width="1.6" />
      <M x="440" y="196" size={13} fill={PURP} anchor="start" weight={800}>
        x·c(x) = x + x³ + x⁴ + x⁷
      </M>
      <M x="440" y="240" size={13} fill={AMBER} anchor="start" weight={800}>
        x⁷ ≡ 1 (mod x⁷ − 1)
      </M>
      <M x="440" y="284" size={13} fill={GREEN} anchor="start" weight={800}>
        = 1 + x + x³ + x⁴
      </M>
      <Tag x="440" y="304" text="the shifted codeword" tone={GREEN} w="192" className="dcm-flux dcm-delay-4" />

      <Card
        x="440"
        y="356"
        w="418"
        h="108"
        title="What cyclic structure saves"
        accent={INDIGO}
        className="dcm-slide-in dcm-delay-5"
        lines={['linear block code: store a k × n generator matrix', 'cyclic code: store one polynomial of degree n − k']}
        linesY={58}
      />
    </Scene>
  )
}

export function FactorX7Scene() {
  return (
    <Scene caption="Every factor of x⁷ − 1 is a legal generator — the degree you pick is the parity you pay">
      <rect x="352" y="60" width="196" height="46" rx="10" fill={WHITE} stroke={N} strokeWidth="2.6" className="dcm-flux" />
      <M x="450" y="90" size={15} weight={800}>
        x⁷ − 1
      </M>
      {[
        ['x + 1', 150, BLUE],
        ['x³ + x + 1', 420, AMBER],
        ['x³ + x² + 1', 690, PURP],
      ].map(([f, x, tone], i) => (
        <g key={String(f)} className={`dcm-cell-in dcm-delay-${i}`}>
          <Wire d={`M450 106 L${x} 150`} stroke={tone} width="2.4" marker={`url(#${markerFor(tone)})`} />
          <rect x={Number(x) - 84} y="152" width="168" height="44" rx="9" fill={WHITE} stroke={tone} strokeWidth="2.5" />
          <M x={x} y="180" size={13} fill={tone} weight={800}>
            {String(f)}
          </M>
        </g>
      ))}
      <M x="450" y="222" size={11} fill={MUTED} weight={700}>
        three irreducible factors over GF(2)
      </M>

      <rect x="56" y="244" width="788" height="34" rx="7" fill={INDIGO} />
      {['g(x)', 'degree', 'k', 'rate', 'd_min'].map((h, i) => (
        <L key={h} x={126 + i * 172} y="267" size={11.5} fill={WHITE} weight={800}>
          {h}
        </L>
      ))}
      {[
        ['x + 1', '1', '6', '6/7', '2', false],
        ['x³ + x + 1', '3', '4', '4/7', '3', true],
        ['(x+1)(x³+x+1)', '4', '3', '3/7', '4', false],
        ['x⁷ − 1', '7', '0', '—', '—', false],
      ].map((row, r) => (
        <g key={row[0]} className={`dcm-cell-in dcm-delay-${r}`}>
          <rect
            x="56"
            y={286 + r * 44}
            width="788"
            height="38"
            rx="7"
            fill={row[5] ? GREEN : WHITE}
            fillOpacity={row[5] ? 0.14 : 1}
            stroke={row[5] ? GREEN : MUTED}
            strokeWidth={row[5] ? 2.5 : 1.6}
          />
          {row.slice(0, 5).map((c, i) => (
            <M key={i} x={126 + i * 172} y={311 + r * 44} size={12} fill={row[5] ? GREEN : N} weight={row[5] ? 800 : 650}>
              {String(c)}
            </M>
          ))}
        </g>
      ))}
      <M x="770" y="468" size={11} fill={GREEN} anchor="end" weight={800}>
        the highlighted row is the (7,4) Hamming code
      </M>
      <Wire d="M420 198 L240 326" stroke={GREEN} width="2" dash="6 6" marker="url(#dcArrG)" className="dcm-current dcm-delay-4" />
    </Scene>
  )
}

export function GhPolynomialScene() {
  const G = [
    ['1', '1', '0', '1', '0', '0', '0'],
    ['0', '1', '1', '0', '1', '0', '0'],
    ['0', '0', '1', '1', '0', '1', '0'],
    ['0', '0', '0', '1', '1', '0', '1'],
  ]
  const H = [
    ['1', '0', '1', '1', '1', '0', '0'],
    ['0', '1', '0', '1', '1', '1', '0'],
    ['0', '0', '1', '0', '1', '1', '1'],
  ]
  return (
    <Scene caption="Both matrices are one polynomial written down repeatedly, each row shifted one place right">
      <M x="60" y="72" size={12.5} fill={MUTED} anchor="start" weight={800}>
        x⁷ − 1 = g(x) · h(x)
      </M>
      <M x="86" y="108" size={13} fill={AMBER} anchor="start" weight={800}>
        g(x) = 1 + x + x³
      </M>
      <M x="330" y="108" size={13} fill={MUTED} anchor="start" weight={800}>
        ×
      </M>
      <M x="368" y="108" size={13} fill={PURP} anchor="start" weight={800}>
        h(x) = 1 + x + x² + x⁴
      </M>
      <M x="660" y="108" size={13} fill={MUTED} anchor="start" weight={800}>
        = x⁷ − 1
      </M>
      <Wire d="M60 124 L844 124" stroke={MUTED} width="1.6" />

      <M x="60" y="160" size={12} fill={AMBER} anchor="start" weight={800}>
        G — each row is g(x), shifted
      </M>
      <Matrix x="120" y="176" name="G" rows={G} cell={34} accent={AMBER} className="dcm-cell-in dcm-delay-1" size={13} />
      {[0, 1, 2, 3].map((r) => (
        <Wire key={r} d={`M${110 + r * 34} ${186 + r * 34} L${110 + r * 34} ${208 + r * 34}`} stroke={AMBER} width="2" opacity="0.5" />
      ))}
      <M x="196" y="336" size={10.5} fill={AMBER} weight={700}>
        the diagonal band is the shift
      </M>

      <M x="500" y="160" size={12} fill={PURP} anchor="start" weight={800}>
        H — each row is the reciprocal of h(x)
      </M>
      <Matrix x="560" y="176" name="H" rows={H} cell={34} accent={PURP} className="dcm-cell-in dcm-delay-3" size={13} />
      <M x="620" y="320" size={10.5} fill={PURP} weight={700}>
        reciprocal = reverse the coefficient order
      </M>

      <Card
        x="56"
        y="368"
        w="788"
        h="96"
        title="Why the reciprocal, not h(x) itself"
        accent={INDIGO}
        className="dcm-slide-in dcm-delay-4"
        lines={['c(x)·h(x) ≡ 0 pairs the LOW coefficients of c with the HIGH coefficients of h', 'writing h backwards is what lines those products up into a matrix row']}
        linesY={54}
      />
    </Scene>
  )
}

export function CyclicEncoderScene() {
  const table = [
    ['1', '1 1 0'],
    ['0', '0 1 1'],
    ['1', '0 0 1'],
    ['1', '0 1 0'],
    ['—', '1 0 0'],
    ['—', '0 1 0'],
    ['—', '0 0 1'],
  ]
  return (
    <Scene caption="g(x) = 1 + x + x³ — the taps are the coefficients, and the feedback does the division">
      <Wire d="M62 148 L138 148" stroke={BLUE} width="2.4" marker="url(#dcArrB)" className="dcm-current" />
      <M x="96" y="132" size={11} fill={BLUE} weight={800}>
        message
      </M>
      {/* g(x) = 1 + x + x3: an adder wherever a coefficient is 1, so one at the
          input and one after the first stage; none after the second stage,
          because the x2 coefficient is 0. */}
      <circle cx="160" cy="148" r="16" fill={WHITE} stroke={RED} strokeWidth="2.4" />
      <M x="160" y="154" size={15} fill={RED} weight={800}>
        ⊕
      </M>
      <Wire d="M176 148 L188 148" stroke={N} width="2.2" />
      {[
        ['b₀', 190],
        ['b₁', 350],
        ['b₂', 480],
      ].map(([label, x], i) => (
        <g key={String(label)} className={`dcm-flux dcm-delay-${i}`}>
          <rect x={x} y="124" width="104" height="48" rx="9" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
          <M x={Number(x) + 52} y="154" size={15} fill={N} weight={800}>
            {String(label)}
          </M>
        </g>
      ))}
      <Wire d="M294 148 L304 148" stroke={N} width="2.2" />
      <circle cx="320" cy="148" r="16" fill={WHITE} stroke={RED} strokeWidth="2.4" />
      <M x="320" y="154" size={15} fill={RED} weight={800}>
        ⊕
      </M>
      <Wire d="M336 148 L350 148" stroke={N} width="2.2" marker="url(#dcArr)" />
      <Wire d="M454 148 L480 148" stroke={N} width="2.2" marker="url(#dcArr)" />
      <Wire d="M584 148 L620 148" stroke={N} width="2.2" />
      <M x="337" y="110" size={11} fill={PURP} weight={800}>
        three-stage shift register
      </M>

      <Wire d="M620 148 L620 236 L320 236 L320 164" stroke={ROSE} width="2.4" marker="url(#dcArrRo)" dash="8 6" className="dcm-current-slow dcm-delay-2" />
      <Wire d="M320 236 L160 236 L160 164" stroke={ROSE} width="2.2" marker="url(#dcArrRo)" dash="8 6" className="dcm-current-slow dcm-delay-3" />
      <M x="470" y="258" size={10.5} fill={ROSE} weight={800}>
        feedback — the taps of g(x)
      </M>

      <Sampler x="640" y="148" label="switch" className="dcm-switch dcm-delay-4" />
      <Wire d="M674 148 L720 148" stroke={GREEN} width="2.4" marker="url(#dcArrG)" />
      <M x="700" y="118" size={10.5} fill={GREEN} anchor="start" weight={800}>
        cycles 1–4: message
      </M>
      <M x="700" y="190" size={10.5} fill={AMBER} anchor="start" weight={800}>
        cycles 5–7: parity
      </M>

      <rect x="60" y="286" width="300" height="30" rx="7" fill={INDIGO} />
      <M x="130" y="307" size={11.5} fill={WHITE} weight={800}>
        input
      </M>
      <M x="278" y="307" size={11.5} fill={WHITE} weight={800}>
        register
      </M>
      {table.map((row, i) => (
        <g key={i} className={`dcm-cell-in dcm-delay-${i % 5}`}>
          <rect x="60" y={320 + i * 22} width="300" height="20" rx="5" fill={i >= 4 ? AMBER : WHITE} fillOpacity={i >= 4 ? 0.16 : 1} stroke={i >= 4 ? AMBER : MUTED} strokeWidth={i >= 4 ? 2 : 1.4} />
          <M x="130" y={335 + i * 22} size={11} fill={i >= 4 ? AMBER : N} weight={700}>
            {row[0]}
          </M>
          <M x="278" y={335 + i * 22} size={11} fill={i >= 4 ? AMBER : N} weight={800}>
            {row[1]}
          </M>
        </g>
      ))}
      <M x="210" y="276" size={11} fill={MUTED} weight={700}>
        register contents after each clock
      </M>

      <Card
        x="404"
        y="286"
        w="454"
        h="186"
        title="Why a shift register is the whole encoder"
        accent={GREEN}
        className="dcm-slide-in dcm-delay-5"
        lines={[
          'dividing by g(x) is repeated shift-and-XOR',
          'the register holds the running remainder',
          'after k clocks the remainder IS the parity',
          'n − k flip-flops and a few XOR gates, no matrix',
        ]}
        linesY={70}
      />
    </Scene>
  )
}

export function CyclicSyndromeScene() {
  const steps = [
    ['1 0 1 1 0 0 1', 'received r(x)'],
    ['1 0 1 1 0 0 0', 'subtract g·x³'],
    ['0 0 0 0 0 0 1', 'after XOR'],
    ['0 0 0 0 0 0 1', 'degree < 3 — stop'],
  ]
  return (
    <Scene caption="The remainder after dividing by g(x) is the syndrome — and the register computes it for free">
      <M x="80" y="84" size={12} fill={MUTED} anchor="start" weight={800}>
        long division by g(x) = 1 0 1 1
      </M>
      {steps.map(([bits, note], i) => (
        <g key={String(note)} className={`dcm-cell-in dcm-delay-${i}`}>
          <M x="96" y={128 + i * 52} size={15} fill={i === 3 ? GREEN : N} anchor="start" weight={800}>
            {bits}
          </M>
          <M x="300" y={128 + i * 52} size={11} fill={i === 3 ? GREEN : MUTED} anchor="start" weight={700}>
            {note}
          </M>
          {i < 3 ? <Wire d={`M92 ${142 + i * 52} L288 ${142 + i * 52}`} stroke={MUTED} width="1.4" opacity="0.5" /> : null}
        </g>
      ))}
      <rect x="84" y="266" width="206" height="40" rx="8" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.8" className="dcm-flux dcm-delay-4" />
      <M x="187" y="292" size={14} fill={GREEN} weight={800}>
        s = 0 0 1
      </M>
      <M x="187" y="330" size={11} fill={GREEN} weight={800}>
        the syndrome
      </M>

      <Wire d="M300 286 L392 286" stroke={ROSE} width="2.6" marker="url(#dcArrRo)" className="dcm-current dcm-delay-5" />
      <M x="346" y="270" size={10.5} fill={ROSE} weight={800}>
        identical
      </M>
      <M x="612" y="84" size={12} fill={MUTED} weight={800}>
        the same number, from the register
      </M>
      <Register x="420" y="150" stages={3} values={['0', '0', '1']} accent={PURP} cw={90} className="dcm-flux dcm-delay-4" />
      <rect x="596" y="144" width="94" height="56" rx="9" fill="none" stroke={GREEN} strokeWidth="3" strokeDasharray="6 5" className="dcm-flux dcm-delay-5" />
      <M x="550" y="238" size={11} fill={MUTED} weight={700}>
        register contents after the last clock
      </M>
      <Wire d="M420 268 L688 268" stroke={MUTED} width="1.6" dash="5 6" />

      <Card
        x="392"
        y="300"
        w="466"
        h="150"
        title="Why this matters for bursts"
        accent={INDIGO}
        className="dcm-slide-in dcm-delay-5"
        lines={[
          'a burst confined to n − k bits cannot be a multiple of g(x)',
          'so the remainder is non-zero and the burst is always caught',
          'that is the entire argument behind every CRC in use',
        ]}
        linesY={68}
      />
    </Scene>
  )
}

export function CrcBurstScene() {
  return (
    <Scene caption="A burst no longer than the FCS is always caught; a random pattern slips through 1 time in 2³²">
      <rect x="60" y="96" width="620" height="52" rx="9" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      <rect x="560" y="96" width="120" height="52" rx="9" fill={BLUE} fillOpacity="0.2" stroke={BLUE} strokeWidth="2.5" />
      <M x="310" y="128" size={12.5} fill={BLUE} weight={800}>
        frame payload
      </M>
      <M x="620" y="128" size={11.5} fill={BLUE} weight={800}>
        FCS 32 bits
      </M>
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={188 + i * 11} y="100" width="8" height="44" rx="2" fill={RED} fillOpacity="0.6" className={`dcm-cell-in dcm-delay-${i % 5}`} />
      ))}
      <Wire d="M188 82 L408 82" stroke={RED} width="2.4" />
      <Wire d="M188 82 L188 94 M408 82 L408 94" stroke={RED} width="2.4" />
      <M x="298" y="70" size={11} fill={RED} weight={800}>
        burst length 20 ≤ n − k = 32 — always detected
      </M>

      <rect x="60" y="192" width="620" height="52" rx="9" fill={WHITE} stroke={MUTED} strokeWidth="2" />
      {[40, 150, 260, 330, 470, 590].map((x, i) => (
        <rect key={x} x={60 + x} y="196" width="8" height="44" rx="2" fill={RED} fillOpacity="0.6" className={`dcm-cell-in dcm-delay-${i % 5}`} />
      ))}
      <M x="370" y="272" size={11} fill={MUTED} weight={800}>
        scattered random pattern — missed with probability 2⁻³²
      </M>

      <Wire d="M60 332 L152 332" stroke={BLUE} width="2.4" marker="url(#dcArrB)" className="dcm-current dcm-delay-2" />
      <M x="106" y="316" size={10.5} fill={BLUE} weight={800}>
        received frame
      </M>
      <Block x="154" y="308" w="142" h="48" label="÷ g(x)" stroke={PURP} mono size={13} className="dcm-charge dcm-delay-2" />
      <Wire d="M296 332 L352 332" stroke={PURP} width="2.4" marker="url(#dcArrP)" />
      <M x="324" y="316" size={10} fill={PURP} weight={800}>
        remainder
      </M>
      <Wire d="M352 332 L400 300" stroke={GREEN} width="2.4" marker="url(#dcArrG)" />
      <Wire d="M352 332 L400 368" stroke={RED} width="2.4" marker="url(#dcArrR)" />
      <Tag x="406" y="286" text="0 → accept" tone={GREEN} w="128" className="dcm-flux dcm-delay-3" />
      <Tag x="406" y="354" text="≠ 0 → discard" tone={RED} w="128" className="dcm-flux dcm-delay-4" />

      <Panel
        x="590"
        y="292"
        w="268"
        title="standard generators"
        accent={INDIGO}
        mono
        rowH={26}
        className="dcm-slide-in dcm-delay-5"
        rows={[
          ['CRC-16', 'degree 16'],
          ['CRC-CCITT', 'degree 16'],
          ['CRC-32', 'degree 32', GREEN],
        ]}
      />
      <M x="724" y="424" size={10.5} fill={MUTED} weight={700}>
        detection only — CRC never repairs
      </M>
    </Scene>
  )
}

/* ── Module 5 — convolutional codes ─────────────────────────────── */

/** State (s₁ s₂) holds the last two inputs; a new bit u shifts in on the left.
 *  Index order is 00, 01, 10, 11 so it matches the trellis row labels. */
const CONV_STATES = ['00', '01', '10', '11']

function convNext(state, u) {
  const s1 = state >> 1
  return (u << 1) | s1
}

export function ConvEncoderScene() {
  return (
    <Scene caption="Two bits out for every bit in, and the output depends on the two bits before it">
      <Wire d="M56 250 L150 250" stroke={BLUE} width="2.6" marker="url(#dcArrB)" className="dcm-current" />
      <M x="100" y="234" size={11.5} fill={BLUE} weight={800}>
        u
      </M>
      <Dot cx="150" cy="250" r="5" fill={N} />
      {[
        ['s₁', 170],
        ['s₂', 300],
      ].map(([label, x], i) => (
        <g key={String(label)} className={`dcm-flux dcm-delay-${i}`}>
          <rect x={x} y="226" width="96" height="48" rx="9" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
          <M x={Number(x) + 48} y="256" size={15} fill={N} weight={800}>
            {String(label)}
          </M>
        </g>
      ))}
      <Wire d="M150 250 L170 250" stroke={N} width="2.2" />
      <Wire d="M266 250 L300 250" stroke={N} width="2.2" marker="url(#dcArr)" />
      <Wire d="M396 250 L412 250" stroke={N} width="2.2" />
      <Dot cx="282" cy="250" r="5" fill={N} />
      <Dot cx="412" cy="250" r="5" fill={N} />

      <Wire d="M150 140 L454 140" stroke={GREEN} width="2.2" className="dcm-draw" />
      {[150, 282, 412].map((x) => (
        <Wire key={x} d={`M${x} 250 L${x} 140`} stroke={GREEN} width="2" className="dcm-draw" />
      ))}
      <circle cx="470" cy="140" r="16" fill={WHITE} stroke={GREEN} strokeWidth="2.5" />
      <M x="470" y="146" size={15} fill={GREEN} weight={800}>
        ⊕
      </M>
      <M x="300" y="126" size={11} fill={GREEN} weight={800}>
        g₁ = 111
      </M>

      <Wire d="M150 360 L454 360" stroke={ROSE} width="2.2" className="dcm-draw dcm-delay-2" />
      {[150, 412].map((x) => (
        <Wire key={x} d={`M${x} 250 L${x} 360`} stroke={ROSE} width="2" className="dcm-draw dcm-delay-2" />
      ))}
      <circle cx="470" cy="360" r="16" fill={WHITE} stroke={ROSE} strokeWidth="2.5" />
      <M x="470" y="366" size={15} fill={ROSE} weight={800}>
        ⊕
      </M>
      <M x="300" y="384" size={11} fill={ROSE} weight={800}>
        g₂ = 101
      </M>

      <Wire d="M486 140 L556 140 L556 224" stroke={GREEN} width="2.2" marker="url(#dcArrG)" />
      <Wire d="M486 360 L556 360 L556 276" stroke={ROSE} width="2.2" marker="url(#dcArrRo)" />
      <rect x="556" y="224" width="86" height="52" rx="9" fill={WHITE} stroke={AMBER} strokeWidth="2.6" className="dcm-charge dcm-delay-3" />
      <L x="599" y="246" size={10.5} fill={AMBER} weight={800}>
        commutator
      </L>
      <g className="dcm-needle dcm-delay-3" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <Wire d="M582 264 L616 264" stroke={AMBER} width="2.6" />
      </g>
      <Wire d="M642 250 L742 250" stroke={N} width="2.8" marker="url(#dcArr)" className="dcm-current dcm-delay-3" />
      <M x="756" y="244" size={11} fill={N} anchor="start" weight={800}>
        v₁v₂ v₁v₂ …
      </M>
      <M x="756" y="268" size={10.5} fill={MUTED} anchor="start" weight={700}>
        rate 1/2
      </M>

      <Card x="56" y="404" w="388" h="62" title="Block code" accent={MUTED} className="dcm-slide-in dcm-delay-4" lines={['fixed n, a boundary the receiver must find']} linesY={52} />
      <Card x="460" y="404" w="388" h="62" title="Convolutional code" accent={GREEN} className="dcm-slide-in dcm-delay-5" lines={['continuous stream, memory M = 2, no frame']} linesY={52} />
    </Scene>
  )
}

export function ConstraintCostScene() {
  const xOf = (k) => 110 + ((k - 3) / 7) * 430
  const gain = [
    [3, 3.0],
    [4, 3.9],
    [5, 4.6],
    [6, 5.1],
    [7, 5.4],
    [8, 5.7],
    [9, 5.9],
    [10, 6.0],
  ]
  const states = [3, 4, 5, 6, 7, 8, 9, 10].map((k) => [k, k - 1])
  return (
    <Scene caption="Coding gain flattens, decoder cost doubles — which is why K = 7 has been the industry answer for decades">
      <Axes x="110" y="400" w="450" h="310" xLabel="constraint length K" origin="left" tickLabels={[[xOf(3), '3'], [xOf(5), '5'], [xOf(7), '7'], [xOf(10), '10']]} />
      <rect x={xOf(5)} y="96" width={xOf(9) - xOf(5)} height="304" fill={GREEN} fillOpacity="0.1" className="dcm-fade-in dcm-delay-3" />
      <M x={(xOf(5) + xOf(9)) / 2} y="118" size={11} fill={GREEN} weight={800}>
        practical range
      </M>
      <Curve pts={gain.map(([k, g]) => [xOf(k), 400 - (g / 7) * 280])} stroke={BLUE} width="3.2" className="dcm-cost-curve" />
      <Curve pts={states.map(([k, v]) => [xOf(k), 400 - (v / 10) * 280])} stroke={ROSE} width="3.2" className="dcm-cost-curve dcm-delay-2" />
      <M x="130" y="268" size={11.5} fill={BLUE} anchor="start" weight={800}>
        coding gain (dB)
      </M>
      <M x="130" y="366" size={11.5} fill={ROSE} anchor="start" weight={800}>
        decoder states (log₂)
      </M>
      <M x="572" y="160" size={11} fill={ROSE} anchor="start" weight={800}>
        512
      </M>
      <M x="572" y="184" size={11} fill={BLUE} anchor="start" weight={800}>
        6.0 dB
      </M>

      <Panel
        x="590"
        y="228"
        w="268"
        title="K · states · generators (octal)"
        accent={INDIGO}
        mono
        rowH={28}
        className="dcm-slide-in dcm-delay-4"
        rows={[
          ['K = 3', '4 · (7, 5)', GREEN],
          ['K = 7', '64 · (171, 133)'],
          ['K = 9', '256 · (753, 561)'],
        ]}
      />
      <M x="724" y="366" size={11} fill={MUTED} weight={700}>
        every +1 in K doubles the
      </M>
      <M x="724" y="388" size={11} fill={MUTED} weight={700}>
        decoder and buys ~0.3 dB
      </M>
    </Scene>
  )
}

export function ImpulsePolynomialScene() {
  return (
    <Scene caption="Feed in a single 1 and read the taps straight off the output — that is the generator polynomial">
      <Bits x="140" y="86" bits={['1', '0', '0', '0', '0']} cw={46} h={40} accent={N} label="u =" size={15} className="dcm-flux" />
      <M x="230" y="148" size={11} fill={MUTED} weight={700}>
        one impulse in
      </M>
      <Bits x="140" y="182" bits={['1', '1', '1', '0', '0']} cw={46} h={40} accent={GREEN} label="v₁ =" size={15} className="dcm-cell-in dcm-delay-1" />
      <Bits x="140" y="248" bits={['1', '0', '1', '0', '0']} cw={46} h={40} accent={ROSE} label="v₂ =" size={15} className="dcm-cell-in dcm-delay-2" />
      <M x="230" y="314" size={11} fill={MUTED} weight={700}>
        two impulse responses out
      </M>

      <Wire d="M390 234 L466 234" stroke={AMBER} width="2.8" marker="url(#dcArrA)" className="dcm-current dcm-delay-2" />
      <M x="428" y="216" size={10.5} fill={AMBER} weight={800}>
        read as
      </M>
      <M x="428" y="260" size={10.5} fill={AMBER} weight={800}>
        polynomial
      </M>

      <M x="492" y="202" size={14} fill={GREEN} anchor="start" weight={800}>
        g₁(D) = 1 + D + D²
      </M>
      <M x="492" y="264" size={14} fill={ROSE} anchor="start" weight={800}>
        g₂(D) = 1 + D²
      </M>
      <M x="492" y="304" size={10.5} fill={MUTED} anchor="start" weight={700}>
        D is a delay, not a frequency variable
      </M>

      <rect x="56" y="352" width="788" height="112" rx="12" fill={WHITE} stroke={INDIGO} strokeWidth="2.3" className="dcm-slide-in dcm-delay-4" />
      <L x="450" y="380" size={12.5} fill={INDIGO} weight={800}>
        The encoder in one line
      </L>
      <M x="450" y="414" size={17} fill={N} weight={800}>
        V(D) = U(D) · G(D)
      </M>
      <M x="450" y="444" size={11.5} fill={MUTED} weight={700}>
        G(D) = [ 1 + D + D²    1 + D² ] — convolution in time is multiplication in D
      </M>
    </Scene>
  )
}

export function TimeDomainTableScene() {
  const rows = [
    ['1', '1', '00', '11', '10', false],
    ['2', '0', '10', '10', '01', false],
    ['3', '1', '01', '00', '10', false],
    ['4', '1', '10', '01', '11', false],
    ['5', '0', '11', '01', '01', true],
    ['6', '0', '01', '11', '00', true],
  ]
  return (
    <Scene caption="Flushing the register costs two extra steps — on a short message that is a real rate loss">
      <rect x="56" y="72" width="620" height="34" rx="7" fill={INDIGO} />
      {['t', 'input', 'state before', 'output', 'state after'].map((h, i) => (
        <L key={h} x={104 + i * 130} y="95" size={11.5} fill={WHITE} weight={800}>
          {h}
        </L>
      ))}
      {rows.map((r, i) => (
        <g key={r[0]} className={`dcm-cell-in dcm-delay-${i % 5}`}>
          <rect
            x="56"
            y={114 + i * 46}
            width="620"
            height="40"
            rx="7"
            fill={r[5] ? AMBER : WHITE}
            fillOpacity={r[5] ? 0.16 : 1}
            stroke={r[5] ? AMBER : MUTED}
            strokeWidth={r[5] ? 2.4 : 1.6}
          />
          {r.slice(0, 5).map((c, j) => (
            <M key={j} x={104 + j * 130} y={140 + i * 46} size={13} fill={r[5] ? AMBER : j === 3 ? GREEN : N} weight={j === 3 || j === 4 ? 800 : 650}>
              {String(c)}
            </M>
          ))}
        </g>
      ))}
      <M x="744" y="266" size={11} fill={AMBER} weight={800}>
        tail bits
      </M>
      <M x="744" y="288" size={11} fill={AMBER} weight={800}>
        flush to 00
      </M>
      <g className="dcm-flux dcm-delay-5">
        <circle cx="744" cy="360" r="20" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <path d="M735 360 L742 368 L754 352" fill="none" stroke={GREEN} strokeWidth="3" strokeLinecap="round" />
      </g>
      <M x="744" y="400" size={10.5} fill={GREEN} weight={800}>
        back at the zero state
      </M>

      <rect x="56" y="404" width="620" height="60" rx="10" fill={ROSE} fillOpacity="0.1" stroke={ROSE} strokeWidth="2.3" className="dcm-slide-in dcm-delay-5" />
      <M x="366" y="430" size={12.5} fill={ROSE} weight={800}>
        4 information bits in · 12 transmitted bits out
      </M>
      <M x="366" y="454" size={12} fill={ROSE} weight={800}>
        effective rate 1/3, not the nominal 1/2
      </M>
    </Scene>
  )
}

export function CodeTreeScene() {
  const edgeLabels = {
    '1:0': '00',
    '1:1': '11',
    '2:0': '00',
    '2:1': '11',
    '2:2': '10',
    '2:3': '01',
  }
  const marks = { '3:1': PURP, '3:4': PURP, '3:3': AMBER, '3:6': AMBER }
  return (
    <Scene caption="Identical states carry identical futures — the tree redraws the same subtree over and over">
      <BinTree x="70" y="96" w="470" h="228" levels={4} marks={marks} edgeLabels={edgeLabels} r={9} />
      <M x="305" y="78" size={11} fill={MUTED} weight={700}>
        upper branch = input 0, lower = input 1
      </M>
      {/* Depth-3 node centres, from the same layout BinTree uses. */}
      <Wire d="M158 348 L334 348" stroke={PURP} width="2" dash="6 6" className="dcm-draw dcm-delay-3" />
      <Wire d="M276 366 L452 366" stroke={AMBER} width="2" dash="6 6" className="dcm-draw dcm-delay-4" />
      <M x="305" y="396" size={11} fill={PURP} weight={800}>
        same state ⇒ identical subtrees from here on
      </M>

      <Axes x="600" y="400" w="248" h="280" xLabel="depth L" yLabel="nodes" origin="left" />
      {[
        ['2', 1, 20],
        ['4', 2, 60],
        ['8', 3, 130],
        ['16', 4, 260],
      ].map(([label, i, h], k) => (
        <g key={String(label)} className={`dcm-cell-in dcm-delay-${k}`}>
          <rect x={606 + Number(i) * 52} y={400 - Number(h)} width="38" height={h} rx="5" fill={ROSE} fillOpacity="0.3" stroke={ROSE} strokeWidth="2" />
          <M x={625 + Number(i) * 52} y={392 - Number(h)} size={11} fill={ROSE} weight={800}>
            {String(label)}
          </M>
        </g>
      ))}
      <Tag x="620" y="88" text="2^L — unusable" tone={RED} w="160" className="dcm-flux dcm-delay-5" />
      <M x="724" y="440" size={11} fill={MUTED} weight={700}>
        the tree doubles every step
      </M>
    </Scene>
  )
}

export function TrellisWidthScene() {
  const edges = []
  for (let st = 0; st < 5; st += 1) {
    const live = st === 0 ? [0] : st === 1 ? [0, 2] : [0, 1, 2, 3]
    for (const from of live) {
      for (const u of [0, 1]) {
        edges.push([st, from, convNext(from, u), u ? PURP : BLUE, '', u ? '7 5' : undefined])
      }
    }
  }
  return (
    <Scene caption="After the register fills, the trellis never gets wider — that single fact is what makes Viterbi possible">
      <Trellis
        x="120"
        y="150"
        w="520"
        h="210"
        states={4}
        stages={6}
        edges={edges}
        stateLabels={CONV_STATES}
        stageLabels={['t=0', 't=1', 't=2', 't=3', 't=4', 't=5']}
      />
      <M x="164" y="140" size={10.5} fill={BLUE} weight={800}>
        00
      </M>
      <M x="150" y="246" size={10.5} fill={PURP} weight={800}>
        11
      </M>
      <M x="272" y="140" size={10.5} fill={BLUE} weight={800}>
        00
      </M>
      <M x="302" y="248" size={10.5} fill={PURP} weight={800}>
        10
      </M>
      <Wire d="M328 118 L640 118" stroke={GREEN} width="2.4" className="dcm-draw dcm-delay-3" />
      <Wire d="M328 118 L328 130 M640 118 L640 130" stroke={GREEN} width="2.4" />
      <M x="484" y="106" size={11.5} fill={GREEN} weight={800}>
        steady state — width 4 forever
      </M>
      <M x="380" y="404" size={11} fill={MUTED} weight={700}>
        solid = input 0 · dashed = input 1
      </M>

      <Axes x="700" y="400" w="150" h="280" origin="left" />
      <rect x="716" y="380" width="44" height="20" rx="4" fill={GREEN} fillOpacity="0.35" stroke={GREEN} strokeWidth="2" className="dcm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} />
      <M x="738" y="420" size={10.5} fill={GREEN} weight={800}>
        trellis
      </M>
      <rect x="782" y="128" width="44" height="272" rx="4" fill={ROSE} fillOpacity="0.28" stroke={ROSE} strokeWidth="2" className="dcm-bar dcm-delay-2" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} />
      <M x="804" y="420" size={10.5} fill={ROSE} weight={800}>
        tree
      </M>
      <M x="778" y="112" size={10} fill={ROSE} anchor="start" weight={800}>
        ↑
      </M>
    </Scene>
  )
}

export function StateDiagramScene() {
  return (
    <Scene caption="Split the zero state into a source and a sink and the diagram enumerates every way to leave and come back">
      <circle cx="120" cy="250" r="30" fill={WHITE} stroke={N} strokeWidth="2.6" className="dcm-flux" />
      <M x="120" y="256" size={13} weight={800}>
        00
      </M>
      <M x="120" y="304" size={10.5} fill={MUTED} weight={700}>
        source
      </M>
      <circle cx="560" cy="250" r="30" fill={WHITE} stroke={N} strokeWidth="2.6" className="dcm-flux dcm-delay-2" />
      <M x="560" y="256" size={13} weight={800}>
        00
      </M>
      <M x="560" y="304" size={10.5} fill={MUTED} weight={700}>
        sink
      </M>
      <circle cx="286" cy="140" r="30" fill={WHITE} stroke={PURP} strokeWidth="2.6" className="dcm-cell-in dcm-delay-1" />
      <M x="286" y="146" size={13} fill={PURP} weight={800}>
        10
      </M>
      <circle cx="286" cy="360" r="30" fill={WHITE} stroke={AMBER} strokeWidth="2.6" className="dcm-cell-in dcm-delay-2" />
      <M x="286" y="366" size={13} fill={AMBER} weight={800}>
        01
      </M>
      <circle cx="430" cy="250" r="30" fill={WHITE} stroke={ROSE} strokeWidth="2.6" className="dcm-cell-in dcm-delay-3" />
      <M x="430" y="256" size={13} fill={ROSE} weight={800}>
        11
      </M>

      <Wire d="M146 236 L258 152" stroke={PURP} width="2.4" marker="url(#dcArrP)" className="dcm-draw dcm-delay-1" />
      <M x="186" y="182" size={11.5} fill={PURP} weight={800}>
        D²
      </M>
      <Wire d="M312 156 L406 232" stroke={ROSE} width="2.4" marker="url(#dcArrRo)" className="dcm-draw dcm-delay-2" />
      <M x="374" y="184" size={11.5} fill={ROSE} weight={800}>
        D
      </M>
      <Wire d="M308 164 L296 328" stroke={AMBER} width="2.4" marker="url(#dcArrA)" className="dcm-draw dcm-delay-2" />
      <M x="326" y="252" size={11.5} fill={AMBER} weight={800}>
        D
      </M>
      <Wire d="M424 280 L300 344" stroke={AMBER} width="2.4" marker="url(#dcArrA)" className="dcm-draw dcm-delay-3" />
      <M x="380" y="326" size={11.5} fill={AMBER} weight={800}>
        D
      </M>
      <Wire d="M314 348 L534 264" stroke={GREEN} width="2.4" marker="url(#dcArrG)" className="dcm-draw dcm-delay-4" />
      <M x="440" y="326" size={11.5} fill={GREEN} weight={800}>
        D²
      </M>
      <path d="M452 224 A28 28 0 1 1 452 276" fill="none" stroke={ROSE} strokeWidth="2.2" markerEnd="url(#dcArrRo)" />
      <M x="504" y="216" size={11} fill={ROSE} weight={800}>
        D
      </M>
      <path d="M96 232 A26 26 0 1 0 96 268" fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="5 5" opacity="0.5" />
      <M x="52" y="222" size={10} fill={MUTED} anchor="start" weight={700}>
        self-loop removed
      </M>

      <rect x="620" y="140" width="238" height="240" rx="12" fill={WHITE} stroke={INDIGO} strokeWidth="2.3" className="dcm-slide-in dcm-delay-4" />
      <L x="739" y="168" size={12} fill={INDIGO} weight={800}>
        Transfer function
      </L>
      <M x="739" y="216" size={16} fill={N} weight={800}>
        T(D) = D⁵ / (1 − 2D)
      </M>
      <Wire d="M644 240 L834 240" stroke={MUTED} width="1.5" />
      <M x="739" y="274" size={13} fill={MUTED} weight={800}>
        = D⁵ + 2D⁶ + 4D⁷ + …
      </M>
      <rect x="660" y="298" width="86" height="34" rx="8" fill={GREEN} fillOpacity="0.16" stroke={GREEN} strokeWidth="2.6" className="dcm-flux dcm-delay-5" />
      <M x="703" y="321" size={13} fill={GREEN} weight={800}>
        D⁵
      </M>
      <M x="800" y="321" size={12} fill={GREEN} weight={800}>
        d_free = 5
      </M>
      <M x="739" y="360" size={10.5} fill={MUTED} weight={700}>
        the lowest power is the free distance
      </M>
    </Scene>
  )
}

export function RscEncoderScene() {
  return (
    <Scene caption="Feed the parity back and the impulse response never dies — which is exactly what turbo codes need">
      <Wire d="M56 214 L128 214" stroke={BLUE} width="2.6" marker="url(#dcArrB)" className="dcm-current" />
      <M x="92" y="198" size={11} fill={BLUE} weight={800}>
        u
      </M>
      <Dot cx="104" cy="214" r="5" fill={BLUE} />
      <Wire d="M104 214 L104 120 L470 120" stroke={GREEN} width="2.6" marker="url(#dcArrG)" className="dcm-current dcm-delay-1" />
      <M x="300" y="106" size={11} fill={GREEN} weight={800}>
        systematic output — the message, unchanged
      </M>

      <circle cx="150" cy="214" r="16" fill={WHITE} stroke={RED} strokeWidth="2.5" className="dcm-flux dcm-delay-2" />
      <M x="150" y="220" size={15} fill={RED} weight={800}>
        ⊕
      </M>
      <Wire d="M166 214 L190 214" stroke={N} width="2.2" />
      {[
        ['s₁', 192],
        ['s₂', 312],
      ].map(([label, x], i) => (
        <g key={String(label)} className={`dcm-flux dcm-delay-${i}`}>
          <rect x={x} y="190" width="92" height="48" rx="9" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
          <M x={Number(x) + 46} y="220" size={15} fill={N} weight={800}>
            {String(label)}
          </M>
        </g>
      ))}
      <Wire d="M284 214 L312 214" stroke={N} width="2.2" marker="url(#dcArr)" />
      <Dot cx="298" cy="214" r="5" fill={N} />
      <Dot cx="418" cy="214" r="5" fill={N} />
      <Wire d="M404 214 L418 214" stroke={N} width="2.2" />

      <Wire d="M298 238 L298 302 L418 302" stroke={ROSE} width="2.2" className="dcm-draw dcm-delay-2" />
      <Wire d="M418 214 L418 302" stroke={ROSE} width="2.2" className="dcm-draw dcm-delay-2" />
      <circle cx="446" cy="302" r="16" fill={WHITE} stroke={ROSE} strokeWidth="2.5" />
      <M x="446" y="308" size={15} fill={ROSE} weight={800}>
        ⊕
      </M>
      <Wire d="M462 302 L520 302" stroke={ROSE} width="2.6" marker="url(#dcArrRo)" className="dcm-current dcm-delay-3" />
      <M x="486" y="332" size={11} fill={ROSE} weight={800}>
        parity
      </M>

      <Wire d="M418 214 L418 164 L150 164 L150 198" stroke={AMBER} width="3.4" marker="url(#dcArrA)" className="dcm-current-slow dcm-delay-3" />
      <M x="284" y="154" size={11.5} fill={AMBER} weight={800}>
        feedback — this is what makes it recursive
      </M>

      <M x="70" y="384" size={11.5} fill={MUTED} anchor="start" weight={800}>
        impulse response
      </M>
      <Bits x="70" y="402" bits={['1', '1', '1', '0', '0', '0', '0', '0']} cw={34} h={30} accent={MUTED} size={12} />
      <M x="368" y="422" size={10.5} fill={MUTED} anchor="start" weight={700}>
        non-recursive: finite, dies out
      </M>
      <Bits x="70" y="444" bits={['1', '1', '0', '1', '1', '0', '1', '1']} cw={34} h={30} accent={AMBER} size={12} />
      <M x="368" y="464" size={10.5} fill={AMBER} anchor="start" weight={700}>
        recursive: 1101101… never dies
      </M>
      <M x="348" y="464" size={13} fill={AMBER} weight={800}>
        …
      </M>
    </Scene>
  )
}

export function FreeDistanceScene() {
  const zero = [0, 1, 2, 3, 4, 5, 6, 7].map((st) => [st, 0, 0, MUTED, '', undefined])
  const diverge = [
    [1, 0, 2, ROSE, 'dcm-draw dcm-delay-1', undefined],
    [2, 2, 1, ROSE, 'dcm-draw dcm-delay-2', undefined],
    [3, 1, 0, ROSE, 'dcm-draw dcm-delay-3', undefined],
  ]
  return (
    <Scene caption="Diverge, wander, remerge — the lightest such loop weighs 5, and that number sets the coding gain">
      <Trellis
        x="110"
        y="130"
        w="620"
        h="190"
        states={4}
        stages={9}
        edges={[...zero, ...diverge]}
        stateLabels={CONV_STATES}
        dotR={5}
      />
      <Wire d="M110 130 L730 130" stroke={N} width="4" className="dcm-draw" />
      <M x="420" y="118" size={11} fill={N} weight={800}>
        the all-zero path
      </M>
      {[
        ['2', 226, 190],
        ['1', 304, 244],
        ['2', 381, 176],
      ].map(([w, x, y], i) => (
        <M key={i} x={x} y={y} size={12} fill={ROSE} weight={800}>
          {String(w)}
        </M>
      ))}
      <M x="420" y="292" size={11.5} fill={ROSE} anchor="start" weight={800}>
        running weight: 2 → 3 → 5
      </M>
      <circle cx="420" cy="130" r="16" fill="none" stroke={GREEN} strokeWidth="3" className="dcm-flux dcm-delay-4" />
      <M x="420" y="104" size={10.5} fill={GREEN} weight={800}>
        remerge
      </M>
      <rect x="452" y="316" width="130" height="36" rx="9" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.6" className="dcm-flux dcm-delay-5" />
      <M x="517" y="340" size={14} fill={GREEN} weight={800}>
        d_free = 5
      </M>

      <Panel
        x="600"
        y="352"
        w="258"
        title="asymptotic coding gain"
        accent={INDIGO}
        mono
        rowH={26}
        className="dcm-slide-in dcm-delay-5"
        rows={[
          ['hard decision', '≈ 4.0 dB'],
          ['soft decision', '≈ 7.0 dB', GREEN],
        ]}
      />
      <M x="290" y="400" size={11} fill={MUTED} anchor="start" weight={700}>
        d_free counts the output bits on the loop, not the input bits
      </M>
      <M x="290" y="424" size={11} fill={MUTED} anchor="start" weight={700}>
        so a longer detour is not automatically a heavier one
      </M>
    </Scene>
  )
}

export function MlseSearchScene() {
  const faint = []
  for (let st = 0; st < 5; st += 1) {
    for (let from = 0; from < 4; from += 1) {
      for (const u of [0, 1]) faint.push([st, from, convNext(from, u), MUTED, '', undefined])
    }
  }
  const survivors = [
    [0, 0, 0, GREEN, 'dcm-draw', undefined],
    [1, 0, 2, GREEN, 'dcm-draw dcm-delay-1', undefined],
    [2, 2, 1, BLUE, 'dcm-draw dcm-delay-2', undefined],
    [3, 1, 0, PURP, 'dcm-draw dcm-delay-3', undefined],
    [1, 0, 0, ROSE, 'dcm-draw dcm-delay-2', undefined],
  ]
  return (
    <Scene caption="Both panels return the same sequence — one of them finishes before the heat death of the universe">
      <M x="216" y="76" size={12} fill={ROSE} weight={800}>
        enumerate every path
      </M>
      <Trellis x="70" y="130" w="300" h="180" states={4} stages={6} edges={faint} stateLabels={CONV_STATES} dotR={4} />
      <Tag x="112" y="340" text="2^L candidates" tone={RED} w="180" className="dcm-flux dcm-delay-2" />
      <g className="dcm-flux dcm-delay-3">
        <circle cx="216" cy="412" r="26" fill={WHITE} stroke={RED} strokeWidth="2.6" />
        <Wire d="M216 396 L216 412 L228 420" stroke={RED} width="2.4" />
        <path d="M194 390 L238 434" stroke={RED} strokeWidth="3" strokeLinecap="round" />
      </g>
      <M x="216" y="460" size={11} fill={RED} weight={800}>
        intractable
      </M>

      <Wire d="M400 220 L470 220" stroke={N} width="2.4" />
      <Wire d="M400 220 L400 240 M470 220 L470 240" stroke={N} width="2.4" />
      <M x="435" y="208" size={11.5} fill={N} weight={800}>
        same answer
      </M>

      <M x="646" y="76" size={12} fill={GREEN} weight={800}>
        keep one survivor per state
      </M>
      <Trellis x="500" y="130" w="300" h="180" states={4} stages={6} edges={survivors} stateLabels={CONV_STATES} dotR={4} />
      <Tag x="542" y="340" text="2^M survivors per step" tone={GREEN} w="216" className="dcm-flux dcm-delay-4" />
      <g className="dcm-flux dcm-delay-5">
        <circle cx="646" cy="412" r="26" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <Wire d="M646 396 L646 412 L658 420" stroke={GREEN} width="2.4" />
      </g>
      <M x="646" y="460" size={11} fill={GREEN} weight={800}>
        linear in L
      </M>
    </Scene>
  )
}

export function AcsUnitScene() {
  return (
    <Scene caption="The discarded path can never recover: any continuation is at least as good on the survivor">
      <Dot cx="120" cy="140" r="11" fill={BLUE} />
      <Dot cx="120" cy="340" r="11" fill={PURP} />
      <Dot cx="640" cy="240" r="13" fill={GREEN} />
      <M x="120" y="112" size={11.5} fill={BLUE} weight={800}>
        state A
      </M>
      <M x="120" y="372" size={11.5} fill={PURP} weight={800}>
        state B
      </M>
      <M x="640" y="212" size={11.5} fill={GREEN} weight={800}>
        new state
      </M>

      <Wire d="M132 146 L218 172" stroke={BLUE} width="3.4" marker="url(#dcArrB)" className="dcm-current" />
      <M x="160" y="146" size={11} fill={BLUE} anchor="start" weight={800}>
        path 12 + branch 1
      </M>
      <Wire d="M132 334 L218 308" stroke={PURP} width="2.6" marker="url(#dcArrP)" className="dcm-current dcm-delay-1" />
      <M x="160" y="342" size={11} fill={PURP} anchor="start" weight={800}>
        path 9 + branch 5
      </M>

      <Block x="228" y="150" w="96" h="48" label="ADD" stroke={BLUE} className="dcm-charge" />
      <Block x="228" y="286" w="96" h="48" label="ADD" stroke={PURP} className="dcm-charge dcm-delay-1" />
      <M x="276" y="222" size={13} fill={BLUE} weight={800}>
        13
      </M>
      <M x="276" y="276" size={13} fill={PURP} weight={800}>
        14
      </M>
      <Wire d="M324 174 L384 218" stroke={BLUE} width="2.4" marker="url(#dcArrB)" />
      <Wire d="M324 310 L384 266" stroke={PURP} width="2.4" marker="url(#dcArrP)" />
      <Block x="386" y="212" w="110" h="56" label="COMPARE" stroke={AMBER} size={12} className="dcm-flux dcm-delay-2" />
      <Wire d="M496 240 L532 240" stroke={AMBER} width="2.4" marker="url(#dcArrA)" />
      <Block x="534" y="212" w="94" h="56" label="SELECT" stroke={GREEN} size={12} className="dcm-flux dcm-delay-3" />
      <Wire d="M628 240 L740 240" stroke={GREEN} width="3" marker="url(#dcArrG)" className="dcm-current dcm-delay-3" />
      <Tag x="744" y="226" text="metric 13" tone={GREEN} w="112" className="dcm-flux dcm-delay-4" />

      <g className="dcm-flux dcm-delay-4">
        <Wire d="M132 334 L218 308" stroke={MUTED} width="3" opacity="0.5" />
        <path d="M140 336 L212 310" stroke={RED} strokeWidth="2.6" strokeLinecap="round" />
      </g>
      <M x="188" y="398" size={11} fill={RED} anchor="start" weight={800}>
        loser struck through — never revisited
      </M>

      <Card
        x="56"
        y="414"
        w="788"
        h="58"
        title="Cost per state, per step"
        accent={INDIGO}
        className="dcm-slide-in dcm-delay-5"
        lines={['one add-compare-select per state, forever — independent of how long the message is']}
        linesY={48}
      />
    </Scene>
  )
}

export function ViterbiWorkedScene() {
  /* The survivor path is the state sequence for message 1 0 1 1 plus two tail
     bits: 00 -> 10 -> 01 -> 10 -> 11 -> 01 -> 00, the same run the time-domain
     table encodes. The faint branches are the ones that lost their compare. */
  const survivors = [
    [0, 0, 2, GREEN, 'dcm-draw', undefined],
    [0, 0, 0, MUTED, '', undefined],
    [1, 2, 1, GREEN, 'dcm-draw dcm-delay-1', undefined],
    [1, 2, 3, MUTED, '', undefined],
    [1, 0, 0, MUTED, '', undefined],
    [2, 1, 2, GREEN, 'dcm-draw dcm-delay-2', undefined],
    [2, 1, 0, MUTED, '', undefined],
    [2, 3, 1, MUTED, '', undefined],
    [3, 2, 3, GREEN, 'dcm-draw dcm-delay-3', undefined],
    [3, 2, 1, MUTED, '', undefined],
    [3, 0, 0, MUTED, '', undefined],
    [4, 3, 1, GREEN, 'dcm-draw dcm-delay-4', undefined],
    [4, 1, 0, MUTED, '', undefined],
    [5, 1, 0, GREEN, 'dcm-draw dcm-delay-5', undefined],
    [5, 3, 1, MUTED, '', undefined],
  ]
  const rx = ['11', '10', '01', '01', '01', '11']
  const metrics = [
    [1, 0, '0'],
    [1, 2, '0'],
    [2, 0, '1'],
    [2, 1, '0'],
    [2, 2, '2'],
    [2, 3, '1'],
    [3, 1, '1'],
    [3, 2, '1'],
    [4, 1, '2'],
    [4, 3, '1'],
    [5, 0, '2'],
    [5, 1, '1'],
    [6, 0, '1'],
  ]
  return (
    <Scene caption="One corrupted pair at t2, and the surviving path still reads the message back correctly">
      <M x="70" y="92" size={11} fill={MUTED} anchor="start" weight={700}>
        received
      </M>
      {rx.map((pair, i) => (
        <g key={i}>
          <M x={149 + i * 90} y="92" size={13} fill={i === 2 ? RED : N} weight={800}>
            {pair}
          </M>
          {i === 2 ? <circle cx={149 + i * 90} cy="87" r="19" fill="none" stroke={RED} strokeWidth="2.6" className="dcm-flux" /> : null}
        </g>
      ))}
      <M x="329" y="122" size={10} fill={RED} weight={800}>
        one bit flipped here
      </M>

      <Trellis
        x="104"
        y="164"
        w="540"
        h="180"
        states={4}
        stages={7}
        edges={survivors}
        stateLabels={CONV_STATES}
        stageLabels={['t0', 't1', 't2', 't3', 't4', 't5', 't6']}
        dotR={6}
      />
      {metrics.map(([st, state, m], i) => (
        <M key={i} x={104 + Number(st) * 90} y={158 + Number(state) * 60} size={10.5} fill={GREEN} weight={800}>
          {String(m)}
        </M>
      ))}

      <Bits x="140" y="396" bits={['1', '0', '1', '1', '0', '0']} cw={90} h={34} accent={GREEN} label="decoded" size={15} className="dcm-flux dcm-delay-5" />
      <M x="410" y="456" size={11} fill={GREEN} weight={800}>
        traceback from the terminal 00 state, right to left — the last two bits are the flush
      </M>
      <M x="740" y="120" size={10.5} fill={MUTED} weight={700}>
        faint = lost its compare
      </M>
      <M x="740" y="142" size={10.5} fill={GREEN} weight={800}>
        green = survivor
      </M>
    </Scene>
  )
}

export function TracebackDepthScene() {
  const paths = [
    [GREEN, [0, 2, 1, 0, 0, 2, 1, 0, 0, 2, 1, 0]],
    [BLUE, [0, 2, 1, 0, 0, 2, 1, 2, 1, 0, 0, 2]],
    [PURP, [0, 2, 1, 0, 0, 2, 3, 1, 0, 2, 3, 1]],
    [ROSE, [0, 2, 1, 0, 0, 2, 1, 2, 3, 1, 2, 3]],
  ]
  const edges = paths.flatMap(([tone, seq], k) =>
    seq.slice(0, -1).map((from, st) => [st, from, seq[st + 1], tone, `dcm-draw dcm-delay-${k}`, undefined]),
  )
  return (
    <Scene caption="Survivors always agree about the distant past — so the oldest bit can be released without waiting for the end">
      <Trellis
        x="80"
        y="150"
        w="720"
        h="190"
        states={4}
        stages={12}
        edges={edges}
        stateLabels={CONV_STATES}
        dotR={4}
      />
      <Wire d="M406 118 L406 372" stroke={RED} width="2.6" dash="7 6" className="dcm-slide-in dcm-delay-4" />
      <M x="406" y="106" size={11.5} fill={RED} weight={800}>
        merge depth
      </M>
      <g className="dcm-flux dcm-delay-5">
        <Wire d="M414 396 L800 396" stroke={AMBER} width="2.4" marker="url(#dcArrA)" />
        <Wire d="M800 396 L414 396" stroke={AMBER} width="2.4" marker="url(#dcArrA)" />
      </g>
      <M x="606" y="420" size={11.5} fill={AMBER} weight={800}>
        truncation depth ≈ 5K
      </M>
      <Wire d="M80 150 L56 150" stroke={GREEN} width="2.8" marker="url(#dcArrG)" className="dcm-current dcm-delay-5" />
      <M x="112" y="128" size={11} fill={GREEN} anchor="start" weight={800}>
        safe to output
      </M>
      <M x="200" y="420" size={11} fill={GREEN} weight={800}>
        all four survivors agree here
      </M>
      <M x="700" y="128" size={11} fill={MUTED} weight={700}>
        four distinct survivors
      </M>
      <M x="450" y="462" size={11} fill={MUTED} weight={700}>
        truncating shorter than ≈5K loses performance; truncating longer only adds latency
      </M>
    </Scene>
  )
}

export function HardSoftScene() {
  return (
    <Scene caption="Telling the decoder how confident each sample was is worth about 2 dB — for three wires instead of one">
      <M x="60" y="80" size={11.5} fill={ROSE} anchor="start" weight={800}>
        hard decision — one threshold
      </M>
      <rect x="60" y="96" width="190" height="52" rx="8" fill={BLUE} fillOpacity="0.14" stroke={BLUE} strokeWidth="2.2" />
      <rect x="250" y="96" width="190" height="52" rx="8" fill={PURP} fillOpacity="0.14" stroke={PURP} strokeWidth="2.2" />
      <M x="155" y="128" size={14} fill={BLUE} weight={800}>
        0
      </M>
      <M x="345" y="128" size={14} fill={PURP} weight={800}>
        1
      </M>
      <Wire d="M250 84 L250 160" stroke={RED} width="2.4" dash="6 5" />
      <Dot cx="266" cy="122" r="8" fill={RED} className="dcm-flux dcm-delay-1" />
      <M x="290" y="176" size={11} fill={RED} anchor="start" weight={800}>
        barely past the threshold — counted as certain
      </M>

      <M x="60" y="232" size={11.5} fill={GREEN} anchor="start" weight={800}>
        soft decision — eight bands
      </M>
      {Array.from({ length: 8 }, (_, i) => (
        <g key={i} className={`dcm-cell-in dcm-delay-${i % 5}`}>
          <rect x={60 + i * 47.5} y="248" width="45" height="52" rx="6" fill={i < 4 ? BLUE : PURP} fillOpacity={0.06 + Math.abs(3.5 - i) * 0.05} stroke={MUTED} strokeWidth="1.6" />
          <M x={82 + i * 47.5} y="280" size={11} fill={MUTED} weight={700}>
            {i}
          </M>
        </g>
      ))}
      <Wire d="M250 236 L250 312" stroke={RED} width="2.4" dash="6 5" />
      <Dot cx="266" cy="274" r="8" fill={RED} className="dcm-flux dcm-delay-3" />
      <M x="290" y="328" size={11} fill={GREEN} anchor="start" weight={800}>
        lands in band 4 — counted as doubtful
      </M>

      <Axes x="520" y="400" w="330" h="300" xLabel="E_b/N₀" yLabel="BER" origin="left" />
      <Curve pts={[[556, 118], [600, 180], [656, 260], [720, 344], [790, 396]]} stroke={GREEN} width="3" className="dcm-cost-curve dcm-delay-2" />
      <Curve pts={[[620, 118], [664, 180], [720, 260], [784, 344], [846, 396]]} stroke={ROSE} width="3" className="dcm-cost-curve dcm-delay-3" />
      <M x="548" y="106" size={11} fill={GREEN} anchor="start" weight={800}>
        soft
      </M>
      <M x="626" y="106" size={11} fill={ROSE} anchor="start" weight={800}>
        hard
      </M>
      <g className="dcm-flux dcm-delay-5">
        <Wire d="M660 260 L716 260" stroke={AMBER} width="2.4" marker="url(#dcArrA)" />
        <Wire d="M716 260 L660 260" stroke={AMBER} width="2.4" marker="url(#dcArrA)" />
      </g>
      <M x="688" y="244" size={11} fill={AMBER} weight={800}>
        ≈2 dB
      </M>

      <rect x="60" y="416" width="420" height="48" rx="10" fill={INDIGO} fillOpacity="0.1" stroke={INDIGO} strokeWidth="2.3" className="dcm-slide-in dcm-delay-5" />
      <M x="270" y="446" size={11.5} fill={INDIGO} weight={800}>
        1-bit bus becomes 3 bits; the adders widen; that is all it costs
      </M>
    </Scene>
  )
}

export function CodingChainScene() {
  const tx = [
    ['data', 56, 80, BLUE],
    ['RS encoder', 148, 122, PURP],
    ['interleaver', 282, 122, AMBER],
    ['conv K=7 R=½', 416, 140, GREEN],
    ['puncture → ¾', 568, 128, ROSE],
    ['modulator', 708, 108, N],
  ]
  const rx = [
    ['demod', 56, 96, N],
    ['depuncture', 164, 124, ROSE],
    ['Viterbi', 300, 104, GREEN],
    ['deinterleaver', 416, 136, AMBER],
    ['RS decoder', 564, 124, PURP],
    ['data', 700, 80, BLUE],
  ]
  return (
    <Scene caption="Interleaving turns a burst into scattered singles, which is the only kind of error Viterbi is good at">
      {[26, 78, 130].map((x, i) => (
        <rect key={x} x={296 + x} y="60" width="14" height="14" rx="3" fill={RED} fillOpacity="0.7" className={`dcm-cell-in dcm-delay-${i}`} />
      ))}
      <Wire d="M340 84 L348 112" stroke={RED} width="1.8" marker="url(#dcArrR)" />
      {[10, 62, 96, 150, 196].map((x, i) => (
        <rect key={x} x={296 + x} y="94" width="9" height="9" rx="2" fill={RED} fillOpacity="0.55" className={`dcm-cell-in dcm-delay-${i % 5}`} />
      ))}
      <M x="248" y="72" size={10} fill={RED} anchor="end" weight={800}>
        burst in
      </M>
      <M x="248" y="102" size={10} fill={RED} anchor="end" weight={800}>
        spread out
      </M>

      {tx.map(([label, x, w, tone], i) => (
        <g key={String(label)} className={`dcm-cell-in dcm-delay-${i % 5}`}>
          <Block x={x} y="130" w={w} h="46" label={String(label)} stroke={tone} size={11} />
          {i < tx.length - 1 ? (
            <Wire d={`M${Number(x) + Number(w)} 153 L${Number(tx[i + 1][1])} 153`} stroke={MUTED} width="2" marker="url(#dcArr)" />
          ) : null}
        </g>
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <rect x={572 + (i % 3) * 38} y={196 + Math.floor(i / 3) * 30} width="34" height="26" rx="4" fill={WHITE} stroke={ROSE} strokeWidth="1.8" />
          {i === 1 || i === 5 ? (
            <path
              d={`M${574 + (i % 3) * 38} ${198 + Math.floor(i / 3) * 30} L${604 + (i % 3) * 38} ${220 + Math.floor(i / 3) * 30} M${604 + (i % 3) * 38} ${198 + Math.floor(i / 3) * 30} L${574 + (i % 3) * 38} ${220 + Math.floor(i / 3) * 30}`}
              stroke={RED}
              strokeWidth="2.2"
              className={`dcm-flux dcm-delay-${i}`}
            />
          ) : null}
        </g>
      ))}
      <M x="700" y="228" size={10} fill={ROSE} anchor="start" weight={700}>
        crossed cells are deleted
      </M>

      <path
        d="M330 286 C310 262, 340 244, 366 254 C378 234, 420 234, 432 254 C462 246, 486 268, 470 288 Z"
        fill={SKY}
        stroke={MUTED}
        strokeWidth="2.2"
        className="dcm-flux dcm-delay-3"
      />
      <M x="400" y="278" size={11.5} fill={MUTED} weight={800}>
        channel
      </M>
      <Wire d="M816 176 L816 250 L478 272" stroke={MUTED} width="2.2" marker="url(#dcArr)" />
      <Wire d="M330 278 L60 300 L60 328" stroke={MUTED} width="2.2" marker="url(#dcArr)" />

      {rx.map(([label, x, w, tone], i) => (
        <g key={String(label)} className={`dcm-cell-in dcm-delay-${i % 5}`}>
          <Block x={x} y="330" w={w} h="46" label={String(label)} stroke={tone} size={11} />
          {i < rx.length - 1 ? (
            <Wire d={`M${Number(x) + Number(w)} 353 L${Number(rx[i + 1][1])} 353`} stroke={MUTED} width="2" marker="url(#dcArr)" />
          ) : null}
        </g>
      ))}
      <M x="450" y="416" size={11} fill={MUTED} weight={700}>
        the receive chain is the transmit chain in reverse — every block has an exact inverse
      </M>
      <M x="450" y="444" size={11} fill={GREEN} weight={800}>
        puncturing trades d_free for rate without touching the decoder
      </M>
    </Scene>
  )
}

export function BlockVsConvScene() {
  const rows = [
    ['frame alignment', 'required', 'not required', 'right'],
    ['burst errors', 'natural fit', 'needs interleaving', 'left'],
    ['soft decision', 'awkward', 'natural fit', 'right'],
    ['decoder cost', 'algebraic, cheap', '2^M states per step', 'left'],
    ['failure mode', 'detected, flagged', 'silent wrong bits', 'left'],
    ['typical use', 'storage, CRC, RS', 'wireless, deep space', ''],
  ]
  return (
    <Scene caption="They fail differently, which is exactly why real systems concatenate them">
      <rect x="56" y="62" width="788" height="34" rx="7" fill={INDIGO} />
      <L x="210" y="85" size={11.5} fill={WHITE} weight={800}>
        block codes
      </L>
      <L x="660" y="85" size={11.5} fill={WHITE} weight={800}>
        convolutional codes
      </L>
      {rows.map(([label, a, b, fav], i) => (
        <g key={String(label)} className={`dcm-cell-in dcm-delay-${i % 5}`}>
          <rect x="56" y={104 + i * 44} width="788" height="38" rx="7" fill={WHITE} stroke={MUTED} strokeWidth="1.5" />
          <M x="70" y={129 + i * 44} size={11.5} fill={MUTED} anchor="start" weight={800}>
            {String(label)}
          </M>
          <rect
            x="290"
            y={106 + i * 44}
            width="250"
            height="34"
            rx="6"
            fill={fav === 'left' ? GREEN : 'none'}
            fillOpacity={fav === 'left' ? 0.16 : 0}
            stroke={fav === 'left' ? GREEN : 'none'}
            strokeWidth="2"
          />
          <M x="415" y={129 + i * 44} size={11.5} fill={fav === 'left' ? GREEN : N} weight={fav === 'left' ? 800 : 650}>
            {String(a)}
          </M>
          <rect
            x="570"
            y={106 + i * 44}
            width="262"
            height="34"
            rx="6"
            fill={fav === 'right' ? GREEN : 'none'}
            fillOpacity={fav === 'right' ? 0.16 : 0}
            stroke={fav === 'right' ? GREEN : 'none'}
            strokeWidth="2"
          />
          <M x="701" y={129 + i * 44} size={11.5} fill={fav === 'right' ? GREEN : N} weight={fav === 'right' ? 800 : 650}>
            {String(b)}
          </M>
        </g>
      ))}

      {[
        ['RS encoder', 120, 120, PURP],
        ['conv encoder', 268, 132, GREEN],
        ['Viterbi', 428, 104, GREEN],
        ['RS decoder', 560, 124, PURP],
      ].map(([label, x, w, tone], i) => (
        <g key={String(label)} className={`dcm-cell-in dcm-delay-${i}`}>
          <Block x={x} y="384" w={w} h="42" label={String(label)} stroke={tone} size={11} />
          {i < 3 ? <Wire d={`M${Number(x) + Number(w)} 405 L${Number(x) + Number(w) + 28} 405`} stroke={MUTED} width="2" marker="url(#dcArr)" /> : null}
        </g>
      ))}
      <Wire d="M120 448 L684 448" stroke={INDIGO} width="2.4" />
      <Wire d="M120 448 L120 436 M684 448 L684 436" stroke={INDIGO} width="2.4" />
      <M x="402" y="470" size={11} fill={INDIGO} weight={800}>
        concatenated: the outer RS cleans up what the inner Viterbi gets wrong
      </M>
    </Scene>
  )
}

/* ── Visual binding ─────────────────────────────────────────────── */

const VISUAL_MAP = {
  /* Module 1 */
  'bandpass-to-lowpass-shift': BandpassShiftScene,
  'hilbert-phase-response': HilbertResponseScene,
  'hilbert-properties-triad': HilbertPropsScene,
  'pre-envelope-spectrum-cancellation': PreEnvelopeScene,
  'complex-envelope-translation': ComplexEnvelopeScene,
  'iq-modulator-blockchain': IqModulatorScene,
  'polar-rectangular-duality': PolarFormScene,
  'awgn-three-assumptions': AwgnModelScene,
  'signal-space-projection': SignalSpaceScene,
  'gram-schmidt-two-step': GramSchmidtScene,
  'constellation-energy-distance': ConstellationEnergyScene,
  'continuous-to-vector-channel': VectorChannelScene,
  'sufficient-statistic-partition': SufficientStatScene,
  'ml-decision-regions': MlDecisionScene,
  'correlation-receiver-bank': CorrelationReceiverScene,
  'matched-filter-vs-correlator': MatchedFilterScene,

  /* Module 2 */
  'q-function-tail-area': QFunctionScene,
  'bpsk-constellation-and-modulator': BpskConstellationScene,
  'bpsk-error-integration': BpskErrorScene,
  'qpsk-gray-constellation': QpskGrayScene,
  'qpsk-modulator-demodulator-pair': QpskPairScene,
  'mpsk-wedge-regions': MpskWedgeScene,
  'mpsk-power-bandwidth-plane': PowerBandwidthScene,
  'qam-versus-psk-packing': QamPackingScene,
  'qam-psk-crossover-chart': QamPskCrossoverScene,
  'bfsk-orthogonal-geometry': BfskGeometryScene,
  'bfsk-difference-detector': BfskDetectorScene,
  'ber-waterfall-comparison': BerWaterfallScene,
  'noncoherent-envelope-detector': NoncoherentEnvelopeScene,
  'noncoherent-bfsk-receiver': NoncoherentBfskScene,
  'dpsk-encode-and-detect': DpskScene,
  'scheme-selection-decision-tree': SchemeTreeScene,

  /* Module 3 */
  'self-information-curve': SelfInformationScene,
  'binary-entropy-function': BinaryEntropyScene,
  'source-extension-amortisation': SourceExtensionScene,
  'source-coding-bounds': SourceCodingBoundsScene,
  'prefix-code-tree-budget': PrefixKraftScene,
  'huffman-merge-tree': HuffmanMergeScene,
  'lempel-ziv-dictionary-build': LempelZivScene,
  'efficiency-and-variance': CodeVarianceScene,
  'dmc-transition-graph': DmcGraphScene,
  'bsc-versus-bec': BscBecScene,
  'mutual-information-venn': MutualInfoVennScene,
  'data-processing-chain': DataProcessingScene,
  'capacity-maximisation': CapacityMaxScene,
  'coding-theorem-threshold': CodingThresholdScene,
  'shannon-hartley-surface': ShannonHartleyScene,
  'shannon-limit-plane': ShannonLimitScene,

  /* Module 4 */
  'fec-versus-arq-timeline': FecArqScene,
  'linear-code-subspace': LinearSubspaceScene,
  'generator-matrix-encoding': GeneratorMatrixScene,
  'g-and-h-duality': GhDualityScene,
  'systematic-codeword-layout': SystematicLayoutScene,
  'syndrome-independence': SyndromeIndependenceScene,
  'distance-equals-weight': DistanceWeightScene,
  'decoding-spheres': DecodingSpheresScene,
  'standard-array-cosets': StandardArrayScene,
  'hamming-syndrome-address': HammingSyndromeScene,
  'cyclic-shift-as-multiplication': CyclicShiftScene,
  'factoring-x7-minus-1': FactorX7Scene,
  'g-h-polynomial-matrices': GhPolynomialScene,
  'cyclic-shift-register-encoder': CyclicEncoderScene,
  'cyclic-syndrome-worked': CyclicSyndromeScene,
  'crc-frame-and-burst': CrcBurstScene,

  /* Module 5 */
  'convolutional-encoder-structure': ConvEncoderScene,
  'constraint-length-cost-curve': ConstraintCostScene,
  'impulse-response-to-polynomial': ImpulsePolynomialScene,
  'time-domain-encoding-table': TimeDomainTableScene,
  'code-tree-repetition': CodeTreeScene,
  'trellis-constant-width': TrellisWidthScene,
  'state-diagram-transfer-function': StateDiagramScene,
  'rsc-feedback-encoder': RscEncoderScene,
  'free-distance-error-event': FreeDistanceScene,
  'mlse-search-space': MlseSearchScene,
  'add-compare-select-unit': AcsUnitScene,
  'viterbi-worked-trellis': ViterbiWorkedScene,
  'traceback-merging-depth': TracebackDepthScene,
  'hard-soft-quantisation': HardSoftScene,
  'coding-chain-deployment': CodingChainScene,
  'block-vs-convolutional-matrix': BlockVsConvScene,
}

function matchKeyword(blob) {
  if (/hilbert/.test(blob)) return HilbertResponseScene
  if (/pre-?envelope|analytic signal/.test(blob)) return PreEnvelopeScene
  if (/complex envelope|lowpass equivalent/.test(blob)) return ComplexEnvelopeScene
  if (/in-?phase|quadrature|canonical/.test(blob)) return IqModulatorScene
  if (/gram.?schmidt|orthonormal basis/.test(blob)) return GramSchmidtScene
  if (/matched filter/.test(blob)) return MatchedFilterScene
  if (/correlation receiver|correlator/.test(blob)) return CorrelationReceiverScene
  if (/decision region|maximum likelihood/.test(blob)) return MlDecisionScene
  if (/constellation|signal space/.test(blob)) return ConstellationEnergyScene
  if (/\bawgn\b|white gaussian/.test(blob)) return AwgnModelScene
  if (/q function|error probability/.test(blob)) return QFunctionScene
  if (/\bqpsk\b/.test(blob)) return QpskGrayScene
  if (/\bbpsk\b/.test(blob)) return BpskConstellationScene
  if (/\bqam\b/.test(blob)) return QamPackingScene
  if (/m-?ary psk|\bpsk\b/.test(blob)) return MpskWedgeScene
  if (/noncoherent|envelope detect/.test(blob)) return NoncoherentEnvelopeScene
  if (/\bdpsk\b|differential/.test(blob)) return DpskScene
  if (/\bbfsk\b|frequency.?shift/.test(blob)) return BfskGeometryScene
  if (/bit error rate|waterfall/.test(blob)) return BerWaterfallScene
  if (/entropy/.test(blob)) return BinaryEntropyScene
  if (/self.?information|surprise/.test(blob)) return SelfInformationScene
  if (/huffman/.test(blob)) return HuffmanMergeScene
  if (/lempel|dictionary/.test(blob)) return LempelZivScene
  if (/prefix|kraft/.test(blob)) return PrefixKraftScene
  if (/source coding/.test(blob)) return SourceCodingBoundsScene
  if (/mutual information/.test(blob)) return MutualInfoVennScene
  if (/capacity/.test(blob)) return CapacityMaxScene
  if (/shannon/.test(blob)) return ShannonLimitScene
  if (/channel coding theorem/.test(blob)) return CodingThresholdScene
  if (/discrete memoryless|transition matrix/.test(blob)) return DmcGraphScene
  if (/erasure|symmetric channel/.test(blob)) return BscBecScene
  if (/\barq\b|repeat request/.test(blob)) return FecArqScene
  if (/generator matrix/.test(blob)) return GeneratorMatrixScene
  if (/parity check/.test(blob)) return GhDualityScene
  if (/syndrome/.test(blob)) return SyndromeIndependenceScene
  if (/hamming/.test(blob)) return HammingSyndromeScene
  if (/standard array|coset/.test(blob)) return StandardArrayScene
  if (/minimum distance|minimum weight/.test(blob)) return DistanceWeightScene
  if (/\bcrc\b|cyclic redundancy/.test(blob)) return CrcBurstScene
  if (/generator polynomial|factor/.test(blob)) return FactorX7Scene
  if (/shift register/.test(blob)) return CyclicEncoderScene
  if (/cyclic/.test(blob)) return CyclicShiftScene
  if (/linear block/.test(blob)) return LinearSubspaceScene
  if (/viterbi|add.?compare.?select/.test(blob)) return ViterbiWorkedScene
  if (/trellis/.test(blob)) return TrellisWidthScene
  if (/state diagram|transfer function/.test(blob)) return StateDiagramScene
  if (/free distance|coding gain/.test(blob)) return FreeDistanceScene
  if (/traceback|truncation/.test(blob)) return TracebackDepthScene
  if (/hard.*soft|quantis/.test(blob)) return HardSoftScene
  if (/recursive systematic|\brsc\b/.test(blob)) return RscEncoderScene
  if (/constraint length/.test(blob)) return ConstraintCostScene
  if (/convolutional/.test(blob)) return ConvEncoderScene
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
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#0b1e2d' }}>
          {dryRun?.input || '—'}
        </div>
      </foreignObject>
      {steps.map((st, i) => (
        <g key={String(st)} className={`dcm-slide-in dcm-delay-${i}`}>
          <rect x="56" y={130 + shift + i * pitch} width="788" height={stepH} rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="90" cy={130 + shift + i * pitch + stepH / 2} r="13" fill={ROSE} />
          <L x="90" y={136 + shift + i * pitch + stepH / 2} size={13} fill={WHITE}>
            {i + 1}
          </L>
          <foreignObject x="114" y={138 + shift + i * pitch} width="716" height={stepH - 14}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#0b1e2d', display: 'flex', alignItems: 'center', height: '100%' }}
            >
              {String(st)}
            </div>
          </foreignObject>
        </g>
      ))}
      <g className="dcm-emerge">
        <rect x="56" y={top} width="788" height={resultH} rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <L x="92" y={top + 24} size={12.5} fill={GREEN} anchor="start">
          RESULT
        </L>
        <foreignObject x="92" y={top + 26} width="716" height={resultH - 30}>
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '750 13px/1.2 system-ui,sans-serif', color: '#047857' }}>
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

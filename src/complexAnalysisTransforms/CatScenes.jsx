/**
 * CatScenes — VTU 1BMATEE301 Complex Analysis, Transform Techniques and
 * Optimization classroom SVG visuals.
 *
 * Every scene animates something the syllabus asks students to reproduce with
 * a pencil: a grid bending under a conformal map, a contour deforming past a
 * pole, partial sums overshooting at a jump, a simplex tableau pivoting to the
 * next vertex. Motion carries meaning — nothing here moves for decoration.
 *
 * Phase 1 wrote one `visualSpec` paragraph per unit; VISUAL_MAP at the end of
 * this file binds each of the 80 `visual` ids to the scene that realises it.
 */

/* Role names, not colour names: FN is the function or curve under discussion,
   OP is the operation being performed on it, DOM is the domain or region it
   lives in, and GOLD marks the quantity the question actually asks for. */
const N = '#1e1b3a'
const FN = '#4338ca'
const ROSE = '#be123c'
const GOLD = '#b45309'
const OP = '#db2777'
const GREEN = '#0d9488'
const DOM = '#0284c7'
const RED = '#dc2626'
const MUTED = '#5b5b7a'
const CREAM = '#fdfcff'
const SKY = '#e8e6fb'
const WHITE = '#ffffff'
const MONO = 'ui-monospace,SFMono-Regular,Menlo,Consolas,monospace'

export const PALETTE = { N, FN, ROSE, GOLD, OP, GREEN, DOM, RED, MUTED, CREAM, SKY }

/* JSX attributes arrive as strings when written `y="200"`, and `"200" + 11`
   is "20011", not 211 — which silently throws geometry off the canvas. Every
   helper below that does arithmetic on a coordinate prop coerces first. */
const n = (v) => Number(v)

/* ── Shell ──────────────────────────────────────────────────────── */

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`cat-scene ${className}`} aria-label={caption || 'Complex Analysis and Transforms diagram'}>
      <svg viewBox={vb} role="img" className="cat-svg">
        <defs>
          <marker id="catArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="catArrF" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={FN} />
          </marker>
          <marker id="catArrO" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={OP} />
          </marker>
          <marker id="catArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="catArrGr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="catArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GOLD} />
          </marker>
          <marker id="catArrD" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={DOM} />
          </marker>
          <marker id="catArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="catArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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
  if (tone === FN) return 'catArrF'
  if (tone === OP) return 'catArrO'
  if (tone === ROSE) return 'catArrRo'
  if (tone === GREEN) return 'catArrGr'
  if (tone === GOLD) return 'catArrG'
  if (tone === DOM) return 'catArrD'
  if (tone === RED) return 'catArrR'
  if (tone === MUTED) return 'catArrM'
  return 'catArr'
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

/** A polyline through explicit points — every response curve in the course. */
function Curve({ pts = [], stroke = FN, width = 2.8, className = '', dash, opacity }) {
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

function Wave({ x, y, w, amp, cycles = 3, phase = 0, stroke = FN, width = 2.4, className = '', dash, opacity }) {
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
function Block({ x, y, w, h, label, sub, stroke = FN, fill = WHITE, className = '', labelFill = N, mono = false, size }) {
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
      <path d={`M${half ? C : C - R} ${Y} L${C + R + 8} ${Y}`} stroke={tone} strokeWidth="2.2" markerEnd="url(#catArr)" fill="none" />
      <path d={`M${C} ${Y + R} L${C} ${Y - R - 8}`} stroke={tone} strokeWidth="2.2" markerEnd="url(#catArr)" fill="none" />
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
function Phasor({ ox, oy, ang = 0, len = 90, label, tone = FN, className = '', width = 3, labelGap = 16, dash }) {
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

/** A titled card with body lines — the "three conditions" style callout. */
function Card({ x, y, w, h, title, lines = [], accent = FN, className = '', mono = false, foot, footTone = RED, children, linesY = 54, lineH = 19 }) {
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

/* ── Mathematics primitives ─────────────────────────────────────── */

/** Gaussian bell over a baseline — the normal density of Module 4, and the
 *  shape every sampling-distribution argument ends at. */
function Bell({ cx, base, w, h, stroke = FN, fill, className = '', opacity = 0.16, steps = 72 }) {
  const [C, B, W, H] = [n(cx), n(base), n(w), n(h)]
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = -3 + (6 * i) / steps
    pts.push(`${i === 0 ? 'M' : 'L'}${(C + (t * W) / 6).toFixed(1)} ${(B - H * Math.exp(-(t * t) / 2)).toFixed(1)}`)
  }
  return (
    <g className={className}>
      <path
        d={`${pts.join(' ')} L${C + W / 2} ${B} L${C - W / 2} ${B} Z`}
        fill={fill || stroke}
        fillOpacity={fill ? opacity : 0.1}
        stroke={stroke}
        strokeWidth="2.6"
      />
    </g>
  )
}

/** The shaded tail of a Gaussian beyond a cut — a p-value, a rejection region,
 *  or the α/2 either side of a confidence interval. */
function BellTail({ cx, base, w, h, from, fill = ROSE, className = '', opacity = 0.36, steps = 40, side = 'right' }) {
  const [C, B, W, H, F] = [n(cx), n(base), n(w), n(h), n(from)]
  const tCut = ((F - C) * 6) / W
  const [t0, t1] = side === 'left' ? [-3, Math.min(tCut, 3)] : [Math.max(tCut, -3), 3]
  if (t1 <= t0) return null
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = t0 + ((t1 - t0) * i) / steps
    pts.push(`${i === 0 ? 'M' : 'L'}${(C + (t * W) / 6).toFixed(1)} ${(B - H * Math.exp(-(t * t) / 2)).toFixed(1)}`)
  }
  return (
    <g className={className}>
      <path
        d={`M${(C + (t0 * W) / 6).toFixed(1)} ${B} ${pts.join(' ').replace(/^M/, 'L')} L${(C + (t1 * W) / 6).toFixed(1)} ${B} Z`}
        fill={fill}
        fillOpacity={opacity}
        stroke="none"
      />
    </g>
  )
}

/** Unit circle on the z-plane, with the region of convergence shaded outside
 *  or inside it. Module 3 lives on this picture. */
function UnitCircle({ cx, cy, r = 90, roc = 'outside', tone = DOM, className = '', label = '|z| = 1' }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  return (
    <g>
      {roc === 'outside' ? (
        <path
          d={`M${C - R * 2.1} ${Y - R * 2.1} L${C + R * 2.1} ${Y - R * 2.1} L${C + R * 2.1} ${Y + R * 2.1} L${C - R * 2.1} ${Y + R * 2.1} Z M${C} ${Y - R} A${R} ${R} 0 1 0 ${C} ${Y + R} A${R} ${R} 0 1 0 ${C} ${Y - R} Z`}
          fill={GREEN}
          fillOpacity="0.1"
          fillRule="evenodd"
        />
      ) : (
        <circle cx={C} cy={Y} r={R} fill={GREEN} fillOpacity="0.12" />
      )}
      <circle cx={C} cy={Y} r={R} fill="none" stroke={tone} strokeWidth="2.6" strokeDasharray="7 5" className={className} />
      <M x={C} y={Y - R - 10} size={11} fill={tone} weight={800}>
        {label}
      </M>
    </g>
  )
}

/** A pole (cross) or a zero (circle) on a plane. */
function PoleMark({ cx, cy, kind = 'pole', tone = OP, r = 9, className = '' }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  if (kind === 'zero') {
    return <circle cx={C} cy={Y} r={R} fill="none" stroke={tone} strokeWidth="2.8" className={className} />
  }
  return (
    <path
      d={`M${C - R} ${Y - R} L${C + R} ${Y + R} M${C + R} ${Y - R} L${C - R} ${Y + R}`}
      stroke={tone}
      strokeWidth="3.2"
      strokeLinecap="round"
      fill="none"
      className={className}
    />
  )
}

/**
 * A square grid drawn through a map w = f(z). `warp` receives (u, v) in
 * [-1, 1]² and returns the mapped pair, so the identity map draws a plain grid
 * and anything else draws its image.
 */
function MappedGrid({ cx, cy, r = 130, lines = 5, warp, tone = FN, className = '', opacity = 0.85 }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  const f = warp || ((u, v) => [u, v])
  const paths = []
  const steps = 26
  for (let k = 0; k < lines; k += 1) {
    const v0 = -1 + (2 * k) / (lines - 1)
    const row = []
    const col = []
    for (let i = 0; i <= steps; i += 1) {
      const t = -1 + (2 * i) / steps
      const [ru, rv] = f(t, v0)
      const [cu, cv] = f(v0, t)
      row.push(`${i === 0 ? 'M' : 'L'}${(C + ru * R).toFixed(1)} ${(Y - rv * R).toFixed(1)}`)
      col.push(`${i === 0 ? 'M' : 'L'}${(C + cu * R).toFixed(1)} ${(Y - cv * R).toFixed(1)}`)
    }
    paths.push(row.join(' '), col.join(' '))
  }
  return (
    <g className={className} opacity={opacity}>
      {paths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={tone} strokeWidth="1.6" />
      ))}
    </g>
  )
}

/** A closed contour with a direction arrow on it — the integration path. */
function Contour({ cx, cy, r = 100, tone = OP, className = '', label, dash }) {
  const [C, Y, R] = [n(cx), n(cy), n(r)]
  return (
    <g>
      <circle cx={C} cy={Y} r={R} fill="none" stroke={tone} strokeWidth="3" strokeDasharray={dash} className={className} />
      {/* Drawn thinner than the contour itself: an SVG marker scales with the
          stroke width, so a 3-wide tick produced a 30px arrowhead. */}
      <path
        d={`M${C + R} ${Y - 6} L${C + R} ${Y + 6}`}
        stroke={tone}
        strokeWidth="2"
        markerEnd={`url(#${markerFor(tone)})`}
        fill="none"
      />
      {label ? (
        <M x={C} y={Y - R - 12} size={11} fill={tone} weight={800}>
          {label}
        </M>
      ) : null}
    </g>
  )
}

/** A filled polygon — the feasible region of a linear programme, or any
 *  region the question asks you to shade. */
function Region({ pts = [], tone = GREEN, className = '', opacity = 0.16, label, labelAt }) {
  if (!pts.length) return null
  const d = `${pts.map(([px, py], i) => `${i === 0 ? 'M' : 'L'}${n(px)} ${n(py)}`).join(' ')} Z`
  return (
    <g className={className}>
      <path d={d} fill={tone} fillOpacity={opacity} stroke={tone} strokeWidth="2.6" strokeLinejoin="round" />
      {label && labelAt ? (
        <M x={n(labelAt[0])} y={n(labelAt[1])} size={11.5} fill={tone} weight={800}>
          {label}
        </M>
      ) : null}
    </g>
  )
}

/** A vertical bar chart — probability mass functions and histograms. */
function Columns({ x, y, w, items = [], accent = FN, max, className = 'catm-bar', labelSize = 10 }) {
  const [X, Y, W] = [n(x), n(y), n(w)]
  const top = max || Math.max(...items.map(([, v]) => Number(v) || 0), 1)
  const bw = W / items.length
  return (
    <g>
      {items.map(([label, value, tone], i) => (
        <g key={`${label}-${i}`}>
          <g className={`${className} catm-delay-${i % 5}`} style={{ transformBox: 'fill-box', transformOrigin: 'bottom center' }}>
            <rect
              x={X + i * bw + 4}
              y={Y - ((Number(value) || 0) / top) * 150}
              width={bw - 8}
              height={((Number(value) || 0) / top) * 150}
              rx="4"
              fill={tone || accent}
              fillOpacity="0.28"
              stroke={tone || accent}
              strokeWidth="2"
            />
          </g>
          <M x={X + i * bw + bw / 2} y={Y + 18} size={labelSize} fill={MUTED} weight={700}>
            {label}
          </M>
        </g>
      ))}
    </g>
  )
}

/* ── Module openers / closers / fallbacks ───────────────────────── */

export function ModuleHero({ module = 1, title, question, hours }) {
  const beats = ['Analyse', 'Decompose', 'Transform', 'Infer', 'Optimise']
  return (
    <Scene caption={question || 'The mathematics the rest of the degree runs on'}>
      <rect x="40" y="36" width="820" height="410" rx="16" fill={WHITE} stroke={FN} strokeWidth="3" />
      <L x="450" y="104" size={18} fill={FN}>{`MODULE ${module} · VTU 1BMATEE301`}</L>
      <L x="450" y="162" size={25}>
        {title || `Module ${module}`}
      </L>
      <L x="450" y="208" size={14.5} fill={MUTED} weight={700}>
        {question || 'State the conditions, then apply the theorem'}
      </L>
      {beats.map((t, i) => (
        <Block
          key={t}
          x={70 + i * 154}
          y={264}
          w={134}
          h={68}
          label={t}
          stroke={i === module - 1 ? OP : FN}
          className={`catm-flux catm-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={FN}
          className={`catm-current catm-delay-${i}`}
          marker="url(#catArrF)"
        />
      ))}
      {hours ? <L x="450" y="396" size={14} fill={MUTED} weight={700}>{`${hours} teaching hours`}</L> : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Name the theorem, then check its conditions — in that order, every time">
      <L x="450" y="86" size={19} fill={FN}>{`MODULE ${module} COMPLETE`}</L>
      <L x="450" y="140" size={24}>
        {title || 'Module complete'}
      </L>
      {['Name the method the question wants', 'Check its conditions actually hold', 'Sketch the region or the curve', 'Do the algebra, showing the step', 'Sanity-check the answer against a limit'].map((t, i) => (
        <g key={t} className={`catm-cell-in catm-delay-${i}`}>
          <Block x={64} y={190 + i * 52} w={772} h={44} label={t} stroke={i % 2 ? GREEN : FN} />
        </g>
      ))}
    </Scene>
  )
}

export function ConceptBoard({ title = 'Concept', points = [] }) {
  const rows = points.slice(0, 6)
  return (
    <Scene caption="Key terms for this unit">
      <Block x="60" y="52" w="780" h="58" label={title} stroke={FN} />
      {rows.map((p, i) => (
        <g key={String(p)} className={`catm-cell-in catm-delay-${i % 5}`}>
          <rect x="60" y={134 + i * 58} width="780" height="46" rx="9" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="92" cy={157 + i * 58} r="8" fill={i % 2 ? OP : FN} />
          <L x="118" y={163 + i * 58} size={16} anchor="start">
            {String(p)}
          </L>
        </g>
      ))}
    </Scene>
  )
}

/* ── Generic multi-purpose layouts ──────────────────────────────── */

export function PipelineScene({ steps = [], title = 'Procedure', accent = FN }) {
  const rows = steps.slice(0, 5)
  return (
    <Scene caption={`${title} — in this order, every time`}>
      <Wire d="M450 74 L450 440" stroke={MUTED} width="3" dash="9 8" />
      {rows.map((step, i) => (
        <g key={String(step)} className={`catm-slide-in catm-delay-${i}`}>
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
              style={{ font: '600 13.5px/1.28 system-ui,sans-serif', color: '#1e1b3a', display: 'flex', alignItems: 'center', height: '100%' }}
            >
              {String(step)}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

export function TwoCaseScene({ left, right, caption = 'Two cases, two different answers', leftTone = FN, rightTone = OP }) {
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
        <g key={String(p)} className={`catm-cell-in catm-delay-${i}`}>
          <circle cx="92" cy={156 + i * 56} r="7" fill={leftTone} />
          <foreignObject x="112" y={134 + i * 56} width="316" height="46">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13.5px/1.3 system-ui,sans-serif', color: '#1e1b3a' }}>
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
        <g key={String(p)} className={`catm-cell-in catm-delay-${i}`}>
          <circle cx="492" cy={156 + i * 56} r="7" fill={rightTone} />
          <foreignObject x="512" y={134 + i * 56} width="316" height="46">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13.5px/1.3 system-ui,sans-serif', color: '#1e1b3a' }}>
              {String(p)}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

/** Three cards on a common baseline — the shape half the Phase-1 specs ask for. */
export function CardTriadScene({ caption, cards = [], tones = [FN, OP, GOLD] }) {
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
          className={`catm-slide-in catm-delay-${i}`}
          mono={c.mono}
        />
      ))}
    </Scene>
  )
}

/** A vertical comparison ladder — rows of label / value / verdict. */
export function LadderScene({ caption, title = 'Comparison', rows = [], accent = FN }) {
  return (
    <Scene caption={caption}>
      <rect x="56" y="58" width="788" height="40" rx="10" fill={accent} />
      <L x="450" y="85" size={14.5} fill={WHITE}>
        {title}
      </L>
      {rows.slice(0, 6).map((row, i) => {
        const [label, value, note, tone] = row
        return (
          <g key={`${label}-${i}`} className={`catm-cell-in catm-delay-${i % 5}`}>
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


/* ── Module 1 — complex analysis ────────────────────────────────── */

export function ComplexMappingGridScene() {
  return (
    <Scene caption="Straight lines become confocal parabolas — and the angles between them survive">
      <rect x="40" y="60" width="330" height="290" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.3" />
      <M x="205" y="84" size={12} fill={FN} weight={800}>
        z-plane
      </M>
      <Plane cx="205" cy="228" r="104" xLabel="x" yLabel="iy" tone={MUTED} />
      <MappedGrid cx="205" cy="228" r="96" lines={5} tone={FN} className="catm-draw" />

      <Wire d="M396 214 L466 214" stroke={OP} width="2.4" marker="url(#catArrO)" className="catm-flow-arrow" />
      <M x="431" y="198" size={12} fill={OP} weight={800}>
        w = z²
      </M>

      <rect x="496" y="60" width="330" height="290" rx="12" fill={WHITE} stroke={OP} strokeWidth="2.3" />
      <M x="661" y="84" size={12} fill={OP} weight={800}>
        w-plane
      </M>
      <Plane cx="661" cy="228" r="104" xLabel="u" yLabel="iv" tone={MUTED} />
      <MappedGrid
        cx="661"
        cy="228"
        r="52"
        lines={5}
        warp={(u, v) => [u * u - v * v, 2 * u * v]}
        tone={OP}
        className="catm-draw catm-delay-2"
      />

      {[
        ['u = x² − y²', 200, FN],
        ['v = 2xy', 620, OP],
      ].map(([t, x, tone], i) => (
        <g key={t} className={`catm-cell-in catm-delay-${i}`}>
          <Wire d={`M${x} 366 L${x} 388`} stroke={tone} width="1.8" dash="5 4" />
          <rect x={x - 120} y="390" width="240" height="46" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={x} y={420} size={14} fill={tone} weight={800}>
            {t}
          </M>
        </g>
      ))}
    </Scene>
  )
}

export function PathIndependenceScene() {
  /* Arrows point INWARD at the limit point, and each one is drawn as an
     explicit segment: a negative-length phasor put its arrowhead on top of the
     plane's own axis arrowheads and read as two heads per axis. */
  const approach = (cx, cy, ang, tone, cls) => {
    const rad = (ang * Math.PI) / 180
    const from = [cx + 104 * Math.cos(rad), cy - 104 * Math.sin(rad)]
    const to = [cx + 26 * Math.cos(rad), cy - 26 * Math.sin(rad)]
    return (
      <Wire
        key={`${cx}-${ang}`}
        d={`M${from[0].toFixed(1)} ${from[1].toFixed(1)} L${to[0].toFixed(1)} ${to[1].toFixed(1)}`}
        stroke={tone}
        width="2.4"
        marker={`url(#${markerFor(tone)})`}
        className={cls}
      />
    )
  }
  return (
    <Scene caption="A real derivative has two directions to agree on; a complex one has infinitely many">
      <rect x="40" y="62" width="380" height="330" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <M x="230" y="88" size={12} fill={GREEN} weight={800}>
        differentiable: every direction agrees
      </M>
      <Plane cx="230" cy="240" r="118" xLabel="" yLabel="" tone={MUTED} />
      {[0, 72, 144, 216, 288].map((a, i) => approach(230, 240, a, GREEN, `catm-draw catm-delay-${i}`))}
      <Dot cx="230" cy="240" r="8" fill={N} className="catm-pop" />
      <M x="230" y="374" size={12} fill={GREEN} weight={800}>
        all five quotients → 2 + 3i
      </M>

      <rect x="452" y="62" width="380" height="330" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.4" />
      <M x="642" y="88" size={12} fill={RED} weight={800}>
        not differentiable
      </M>
      <Plane cx="642" cy="240" r="118" xLabel="" yLabel="" tone={MUTED} />
      {approach(642, 240, 0, RED, 'catm-draw')}
      {approach(642, 240, 90, OP, 'catm-draw catm-delay-2')}
      <Dot cx="642" cy="240" r="8" fill={N} />
      <M x="756" y="228" size={11} fill={RED} weight={800}>
        along x: 1
      </M>
      <M x="642" y="124" size={11} fill={OP} weight={800}>
        along y: −1
      </M>
      <g className="catm-pulse">
        <M x="642" y="374" size={15} fill={RED} weight={800}>
          1 ≠ −1
        </M>
      </g>

      <g className="catm-emerge">
        <rect x="140" y="414" width="620" height="48" rx="11" fill={SKY} stroke={FN} strokeWidth="2.3" />
        <M x="300" y="444" size={11.5} fill={MUTED} weight={800}>
          real: left and right
        </M>
        <M x="620" y="444" size={11.5} fill={FN} weight={800}>
          complex: every direction at once
        </M>
      </g>
    </Scene>
  )
}

export function CauchyRiemannScene() {
  return (
    <Scene caption="Take the limit two ways, match real and imaginary parts, and there they are">
      {[
        ['along the real axis', 'f′(z) = ∂u/∂x + i ∂v/∂x', FN, 96],
        ['along the imaginary axis', 'f′(z) = ∂v/∂y − i ∂u/∂y', DOM, 190],
      ].map(([tag, eq, tone, y], i) => (
        <g key={tag} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="60" y={y} width="480" height="66" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="80" y={y + 24} size={10} fill={tone} anchor="start" weight={800}>
            {tag}
          </M>
          <M x="300" y={y + 50} size={15} fill={N} weight={800}>
            {eq}
          </M>
        </g>
      ))}
      <g className="catm-pulse">
        <M x="300" y="296" size={22} fill={OP} weight={800}>
          =
        </M>
      </g>
      {[
        ['∂u/∂x = ∂v/∂y', GREEN],
        ['∂u/∂y = −∂v/∂x', GREEN],
      ].map(([eq, tone], i) => (
        <g key={eq} className={`catm-pop catm-delay-${i + 2}`}>
          <rect x={60 + i * 250} y="322" width="230" height="56" rx="12" fill={tone} fillOpacity="0.12" stroke={tone} strokeWidth="3" />
          <M x={175 + i * 250} y="357" size={14} fill={tone} weight={800}>
            {eq}
          </M>
        </g>
      ))}

      <Card
        x="580"
        y="96"
        w="272"
        h="160"
        title="necessary, and when sufficient"
        accent={ROSE}
        lines={['the equations always hold', 'where f is differentiable', '', 'they are enough only if the', 'partials are continuous too']}
        linesY={56}
        lineH={21}
        className="catm-slide-in catm-delay-3"
      />
      <g className="catm-slide-in catm-delay-4">
        <rect x="580" y="280" width="272" height="98" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.3" />
        <M x="646" y="320" size={16} fill={FN} weight={800}>
          u
        </M>
        <M x="786" y="320" size={16} fill={OP} weight={800}>
          v
        </M>
        <Wire d="M668 312 L764 312" stroke={MUTED} width="2.2" marker="url(#catArrM)" className="catm-flow-arrow" />
        <Wire d="M764 330 L668 330" stroke={MUTED} width="2.2" marker="url(#catArrM)" className="catm-flow-arrow catm-delay-2" />
        <M x="716" y="360" size={10} fill={MUTED}>
          either almost determines the other
        </M>
      </g>
      <M x="300" y="414" size={10.5} fill={MUTED} weight={800}>
        a constant of integration is all that is left over
      </M>
    </Scene>
  )
}

export function PolarCrScene() {
  return (
    <Scene caption="Match the coordinate system to the function and the working shrinks to two lines">
      <g className="catm-cell-in">
        <rect x="40" y="76" width="300" height="94" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.4" />
        <M x="190" y="102" size={10.5} fill={FN} weight={800}>
          Cartesian
        </M>
        <M x="190" y="130" size={13} fill={N} weight={800}>
          uₓ = v_y
        </M>
        <M x="190" y="154" size={13} fill={N} weight={800}>
          u_y = −vₓ
        </M>
      </g>
      <Wire d="M360 124 L440 124" stroke={OP} width="3.2" marker="url(#catArrO)" className="catm-flow-arrow" />
      <M x="400" y="108" size={9.5} fill={OP} weight={800}>
        x = r cos θ
      </M>
      <M x="400" y="152" size={9.5} fill={OP} weight={800}>
        y = r sin θ
      </M>
      <g className="catm-cell-in catm-delay-2">
        <rect x="460" y="76" width="320" height="94" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.4" />
        <M x="620" y="102" size={10.5} fill={DOM} weight={800}>
          polar
        </M>
        <M x="620" y="130" size={13} fill={N} weight={800}>
          u_r = (1/r)·v_θ
        </M>
        <M x="620" y="154" size={13} fill={N} weight={800}>
          v_r = −(1/r)·u_θ
        </M>
        <g className="catm-pulse">
          <circle cx="668" cy="126" r="20" fill="none" stroke={GOLD} strokeWidth="2.2" strokeDasharray="4 4" />
          <circle cx="672" cy="150" r="20" fill="none" stroke={GOLD} strokeWidth="2.2" strokeDasharray="4 4" />
        </g>
      </g>

      {[
        ['z²', 'Cartesian', 'u = x²−y², v = 2xy — two lines', GREEN, 'log z', 'polar in Cartesian: a mess', OP],
        ['log z', 'polar', 'u = ln r, v = θ — two lines', GREEN, 'z²', 'Cartesian in polar: a mess', OP],
      ].map(([fn, sys, good, gtone, bad, badNote, btone], i) => (
        <g key={fn} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={40 + i * 400} y="206" width="380" height="88" rx="12" fill={gtone} fillOpacity="0.1" stroke={gtone} strokeWidth="2.4" />
          <M x={230 + i * 400} y="232" size={11.5} fill={gtone} weight={800}>
            {`${fn} in ${sys} form`}
          </M>
          <M x={230 + i * 400} y="262" size={11} fill={N}>
            {good}
          </M>
          <M x={230 + i * 400} y="282" size={9.5} fill={GREEN} weight={800}>
            ✓ short
          </M>
          <rect x={40 + i * 400} y="306" width="380" height="76" rx="12" fill={btone} fillOpacity="0.08" stroke={btone} strokeWidth="2.2" />
          <M x={230 + i * 400} y="332" size={10.5} fill={btone} weight={800}>
            {`${bad} the other way round`}
          </M>
          <M x={230 + i * 400} y="356" size={10} fill={MUTED}>
            {badNote}
          </M>
          <Wire d={`M${100 + i * 400} 344 L${360 + i * 400} 344`} stroke={btone} width="2.4" className="catm-emerge" />
        </g>
      ))}
      <g className="catm-emerge">
        <rect x="240" y="402" width="420" height="46" rx="11" fill={SKY} stroke={GOLD} strokeWidth="2.4" />
        <M x="450" y="431" size={12.5} fill={GOLD} weight={800}>
          match the coordinate system to the function
        </M>
      </g>
    </Scene>
  )
}

export function OrthogonalCurvesScene() {
  // u = x² − y² = c gives one family of hyperbolas; v = 2xy = k gives the other.
  const hyper = (c, sign) => {
    const pts = []
    for (let i = 0; i <= 40; i += 1) {
      const t = -1.4 + (2.8 * i) / 40
      const x = t
      const y = sign === 'u' ? Math.sign(t) * Math.sqrt(Math.max(0, t * t - c)) : c / (2 * (t || 0.001))
      if (!Number.isFinite(y) || Math.abs(y) > 1.5) continue
      pts.push([240 + x * 110, 218 - y * 110])
    }
    return pts
  }
  return (
    <Scene caption="Equipotentials and flux lines are the same two families, with different names">
      <Plane cx="240" cy="218" r="150" xLabel="x" yLabel="iy" tone={MUTED} />
      {[0.25, 0.7, 1.2].flatMap((c) => [
        <Curve key={`u${c}`} pts={hyper(c, 'u')} stroke={FN} width="2.4" className="catm-draw" />,
        <Curve key={`un${c}`} pts={hyper(c, 'u').map(([px, py]) => [px, 436 - py])} stroke={FN} width="2.4" className="catm-draw" />,
      ])}
      {[0.4, 0.9, 1.6, -0.4, -0.9, -1.6].map((k) => (
        <Curve key={`v${k}`} pts={hyper(k, 'v')} stroke={OP} width="2.4" className="catm-draw catm-delay-2" />
      ))}
      {[[176, 154], [304, 154], [176, 282], [304, 282]].map(([px, py], i) => (
        <g key={i} className={`catm-pop catm-delay-${i}`}>
          <rect x={px - 7} y={py - 7} width="14" height="14" fill="none" stroke={GREEN} strokeWidth="2.4" />
        </g>
      ))}
      <M x="240" y="394" size={11} fill={MUTED} weight={800}>
        every crossing is a right angle
      </M>

      <g className="catm-slide-in catm-delay-3">
        <rect x="440" y="60" width="410" height="150" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.3" />
        <M x="645" y="86" size={11.5} fill={DOM} weight={800}>
          the field reading
        </M>
        <Dot cx="520" cy="150" r="9" fill={OP} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <Phasor key={a} ox="520" oy="150" ang={a} len={44} label="" tone={OP} width="1.8" />
        ))}
        {[30, 56].map((r) => (
          <circle key={r} cx="520" cy="150" r={r} fill="none" stroke={FN} strokeWidth="2" />
        ))}
        <M x="700" y="132" size={11} fill={FN} anchor="start" weight={800}>
          u = const → equipotentials
        </M>
        <M x="700" y="176" size={11} fill={OP} anchor="start" weight={800}>
          v = const → flux lines
        </M>
      </g>

      {[
        ['uₓ = v_y and u_y = −vₓ', FN],
        ['differentiate again and add', DOM],
        ['∇²u = 0 and ∇²v = 0', GREEN],
      ].map(([t, tone], i) => (
        <g key={t} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="440" y={238 + i * 66} width="410" height="52" rx="11" fill={WHITE} stroke={tone} strokeWidth={i === 2 ? 3 : 2.2} />
          <M x="645" y={271 + i * 66} size={12.5} fill={i === 2 ? tone : N} weight={800}>
            {t}
          </M>
          {i < 2 ? (
            <Wire d={`M645 ${290 + i * 66} L645 ${304 + i * 66}`} stroke={MUTED} width="2" marker="url(#catArrM)" />
          ) : null}
        </g>
      ))}
      <M x="645" y="446" size={10} fill={MUTED} weight={800}>
        both parts are harmonic — that is not an extra assumption, it follows
      </M>
    </Scene>
  )
}

export function MilneThomsonScene() {
  const steps = [
    ['given u(x, y)', 'compute uₓ and u_y', FN],
    ['form f′(z)', 'f′ = uₓ − i·u_y, still in x and y', DOM],
    ['substitute', 'y = 0 and x = z', OP],
    ['integrate', 'f(z) = ∫f′(z) dz + C', GREEN],
  ]
  return (
    <Scene caption="One substitution collapses two variables into one — that is the whole trick">
      {steps.map(([title, body, tone], i) => (
        <g key={title} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="50" y={68 + i * 98} width="480" height="78" rx="12" fill={WHITE} stroke={tone} strokeWidth={i === 2 ? 3 : 2.3} />
          <M x="76" y={96 + i * 98} size={10.5} fill={tone} anchor="start" weight={800}>
            {`${i + 1} · ${title}`}
          </M>
          <M x="290" y={128 + i * 98} size={13} fill={N} weight={800}>
            {body}
          </M>
          {i < 3 ? (
            <Wire d={`M290 ${146 + i * 98} L290 ${166 + i * 98}`} stroke={MUTED} width="2.2" marker="url(#catArrM)" />
          ) : null}
        </g>
      ))}
      <g className="catm-pulse">
        <rect x="200" y={68 + 2 * 98 + 42} width="180" height="30" rx="7" fill={OP} fillOpacity="0.18" stroke={OP} strokeWidth="2.2" />
      </g>
      <M x="290" y="330" size={9.5} fill={OP} weight={800}>
        every y term vanishes, every x becomes z
      </M>

      <g className="catm-slide-in catm-delay-4">
        <rect x="570" y="68" width="282" height="368" rx="12" fill={OP} fillOpacity="0.07" stroke={OP} strokeWidth="2.4" />
        <M x="711" y="96" size={11} fill={OP} weight={800}>
          the alternative route
        </M>
        {[
          'integrate uₓ = v_y in y',
          'differentiate the result in x',
          'match against u_y = −vₓ',
          'solve for the unknown function',
          'assemble f = u + iv',
          'rewrite u + iv in terms of z',
        ].map((t, i) => (
          <g key={t}>
            <rect x="590" y={120 + i * 50} width="242" height="38" rx="9" fill={WHITE} stroke={OP} strokeWidth="1.9" />
            <foreignObject x="600" y={126 + i * 50} width="222" height="28">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 10.5px/1.2 system-ui,sans-serif', color: '#1e1b3a', display: 'flex', alignItems: 'center', height: '100%' }}>
                {t}
              </div>
            </foreignObject>
          </g>
        ))}
        <M x="711" y="428" size={10} fill={OP} weight={800}>
          correct, and six steps longer
        </M>
      </g>
    </Scene>
  )
}

export function ComplexPotentialScene() {
  return (
    <Scene caption="One complex derivative replaces the gradient of a two-component vector field">
      <Plane cx="250" cy="240" r="170" xLabel="x" yLabel="iy" tone={MUTED} />
      <Dot cx="250" cy="240" r="10" fill={OP} className="catm-pulse" />
      {[40, 74, 110, 148].map((r, i) => (
        <circle key={r} cx="250" cy="240" r={r} fill="none" stroke={FN} strokeWidth="2.2" className={`catm-draw catm-delay-${i % 5}`} />
      ))}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
        <Phasor key={a} ox="250" oy="240" ang={a} len={166} label="" tone={OP} width="1.8" className={`catm-draw catm-delay-${i % 5}`} />
      ))}
      {[[286, 204], [214, 204], [286, 276], [214, 276]].map(([px, py], i) => (
        <rect key={i} x={px - 6} y={py - 6} width="12" height="12" fill="none" stroke={GREEN} strokeWidth="2.2" className="catm-pop" />
      ))}
      <M x="250" y="436" size={10.5} fill={MUTED} weight={800}>
        a line charge: equipotentials are circles, flux lines are radii
      </M>

      {[
        ['complex potential', 'w = u + iv', FN],
        ['read the parts', 'u = potential · v = flux function', DOM],
        ['the field itself', 'E = −conj(dw/dz)', GREEN],
      ].map(([title, body, tone], i) => (
        <g key={title} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="480" y={84 + i * 100} width="372" height="78" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="666" y={112 + i * 100} size={10.5} fill={tone} weight={800}>
            {title}
          </M>
          <M x="666" y={144 + i * 100} size={14} fill={N} weight={800}>
            {body}
          </M>
          {i < 2 ? (
            <Wire d={`M666 ${162 + i * 100} L666 ${182 + i * 100}`} stroke={MUTED} width="2.2" marker="url(#catArrM)" />
          ) : null}
        </g>
      ))}
      <g className="catm-emerge">
        <rect x="480" y="392" width="372" height="58" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.4" />
        <M x="666" y="418" size={11} fill={GOLD} weight={800}>
          one complex differentiation
        </M>
        <M x="666" y="438" size={10} fill={MUTED}>
          instead of a two-component gradient
        </M>
      </g>
    </Scene>
  )
}

export function ContourParametrisationScene() {
  return (
    <Scene caption="Parametrise, substitute dz = z′(t) dt, and it is an ordinary real integral again">
      <Plane cx="260" cy="212" r="150" xLabel="x" yLabel="iy" tone={MUTED} />
      <Dot cx="150" cy="212" r="8" fill={N} />
      <Dot cx="370" cy="212" r="8" fill={N} />
      <M x="150" y="238" size={10.5} fill={MUTED} weight={800}>
        z = −1
      </M>
      <M x="370" y="238" size={10.5} fill={MUTED} weight={800}>
        z = 1
      </M>
      <Wire d="M150 212 L370 212" stroke={FN} width="3.2" marker="url(#catArrF)" className="catm-draw" />
      <M x="260" y="200" size={10.5} fill={FN} weight={800}>
        C₁
      </M>
      <Wire d="M150 212 A110 110 0 0 1 370 212" stroke={OP} width="3.2" marker="url(#catArrO)" className="catm-draw catm-delay-2" />
      <M x="260" y="92" size={10.5} fill={OP} weight={800}>
        C₂
      </M>

      {[
        ['C₁', 'z(t) = t, t ∈ [−1, 1]', 'dz = dt', '∫ = 2', FN],
        ['C₂', 'z(t) = e^(it), t ∈ [π, 0]', 'dz = i·e^(it) dt', '∫ = −2 + iπ', OP],
      ].map(([name, par, dz, res, tone], i) => (
        <g key={name} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="460" y={70 + i * 148} width="392" height="128" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="486" y={96 + i * 148} size={11.5} fill={tone} anchor="start" weight={800}>
            {name}
          </M>
          <M x="656" y={124 + i * 148} size={12} fill={N}>
            {par}
          </M>
          <M x="656" y={148 + i * 148} size={12} fill={N}>
            {dz}
          </M>
          <rect x="600" y={160 + i * 148} width="180" height="30" rx="8" fill={OP} fillOpacity="0.14" stroke={OP} strokeWidth="2.2" />
          <M x="690" y={181 + i * 148} size={12.5} fill={OP} weight={800}>
            {res}
          </M>
        </g>
      ))}
      <g className="catm-pulse">
        <rect x="460" y="372" width="392" height="46" rx="11" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2.4" />
        <M x="656" y="401" size={12} fill={RED} weight={800}>
          different answers ⇒ the integrand is not analytic
        </M>
      </g>
      <g className="catm-slide-in catm-delay-4">
        <rect x="60" y="392" width="330" height="60" rx="11" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
        <M x="225" y="416" size="10.5" fill={GREEN} weight={800}>
          reverse the path
        </M>
        <M x="225" y="438" size={10.5} fill={N} weight={800}>
          and the integral changes sign
        </M>
      </g>
    </Scene>
  )
}

export function CauchyTheoremScene() {
  return (
    <Scene caption="Deform the contour as freely as you like — as long as you never cross a singularity">
      <rect x="36" y="66" width="272" height="280" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <circle cx="172" cy="206" r="108" fill={GREEN} fillOpacity="0.1" />
      <Contour cx="172" cy="206" r="66" tone={FN} className="catm-draw" />
      <M x="172" y="92" size={10.5} fill={GREEN} weight={800}>
        analytic everywhere inside
      </M>
      <g className="catm-emerge">
        <rect x="88" y="296" width="168" height="36" rx="9" fill={GREEN} fillOpacity="0.16" stroke={GREEN} strokeWidth="2.4" />
        <M x="172" y="320" size={13} fill={GREEN} weight={800}>
          ∮ f dz = 0
        </M>
      </g>

      <rect x="324" y="66" width="272" height="280" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.3" />
      <M x="460" y="92" size={10.5} fill={DOM} weight={800}>
        path independence follows
      </M>
      <Dot cx="376" cy="230" r="7" fill={N} />
      <Dot cx="544" cy="230" r="7" fill={N} />
      <Wire d="M376 230 L544 230" stroke={FN} width="2.8" className="catm-draw" />
      <Wire d="M376 230 A84 84 0 0 1 544 230" stroke={OP} width="2.8" className="catm-draw catm-delay-2" />
      <M x="460" y="296" size={16} fill={DOM} weight={800}>
        ∫₁ = ∫₂
      </M>

      <rect x="612" y="66" width="252" height="280" rx="12" fill={WHITE} stroke={ROSE} strokeWidth="2.3" />
      <M x="738" y="92" size={10.5} fill={ROSE} weight={800}>
        deform, but never across
      </M>
      <PoleMark cx="738" cy="212" kind="pole" tone={RED} r="11" className="catm-pulse" />
      <Contour cx="738" cy="212" r="94" tone={MUTED} dash="6 5" />
      <Contour cx="738" cy="212" r="46" tone={OP} className="catm-draw catm-delay-2" />
      <g className="catm-flow-arrow catm-delay-3">
        <Wire d="M820 250 L778 234" stroke={OP} width="2.2" dash="5 4" marker="url(#catArrO)" />
      </g>
      <M x="738" y="326" size={10} fill={ROSE} weight={800}>
        the value does not change
      </M>

      <g className="catm-slide-in catm-delay-4">
        <rect x="140" y="376" width="620" height="72" rx="12" fill={SKY} stroke={FN} strokeWidth="2.3" />
        <M x="450" y="404" size={12} fill={FN} weight={800}>
          the condition that does the work: simply connected, and analytic on and inside
        </M>
        <M x="450" y="430" size={10.5} fill={MUTED}>
          drop either half and the theorem says nothing at all
        </M>
      </g>
    </Scene>
  )
}

export function IntegralFormulaScene() {
  return (
    <Scene caption="The boundary values determine the value at every interior point — and only interior points">
      <Contour cx="230" cy="216" r="140" tone={FN} className="catm-draw" label="C" />
      <Dot cx="248" cy="232" r="9" fill={OP} className="catm-pop" />
      <M x="266" y="256" size={12} fill={OP} anchor="start" weight={800}>
        a
      </M>
      {/* Five, stopping 46px short: seven arrowheads meeting at one point
          rendered as a single unreadable blob. */}
      {[25, 95, 165, 235, 305].map((ang, i) => {
        const rad = (ang * Math.PI) / 180
        const bx = 230 + 138 * Math.cos(rad)
        const by = 216 - 138 * Math.sin(rad)
        return (
          <Wire
            key={ang}
            d={`M${bx.toFixed(1)} ${by.toFixed(1)} L${(248 - 46 * Math.cos(rad)).toFixed(1)} ${(232 + 46 * Math.sin(rad)).toFixed(1)}`}
            stroke={DOM}
            width="1.5"
            marker="url(#catArrD)"
            className={`catm-flow-arrow catm-delay-${i % 5}`}
          />
        )
      })}
      <M x="230" y="396" size={10.5} fill={DOM} weight={800}>
        the boundary values determine f(a)
      </M>

      <g className="catm-emerge">
        <rect x="440" y="76" width="412" height="74" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.6" />
        <M x="646" y="122" size={17} fill={N} weight={800}>
          ∮_C f(z)/(z − a) dz = 2πi·f(a)
        </M>
      </g>
      {[
        ['the integrand', 'a pole of order 1 at z = a', FN],
        ['evaluate', 'f at that pole, nothing else', DOM],
        ['multiply', 'by 2πi and stop', GREEN],
      ].map(([tag, body, tone], i) => (
        <g key={tag} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="440" y={170 + i * 72} width="412" height="58" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x="466" y={196 + i * 72} size={10} fill={tone} anchor="start" weight={800}>
            {tag}
          </M>
          <M x="466" y={216 + i * 72} size={11.5} fill={N} anchor="start">
            {body}
          </M>
        </g>
      ))}
      <g className="catm-pulse">
        <rect x="440" y="392" width="412" height="56" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.4" />
        <M x="646" y="416" size={11.5} fill={RED} weight={800}>
          a must lie INSIDE C
        </M>
        <M x="646" y="438" size={10} fill={MUTED}>
          outside, Cauchy theorem applies and the integral is zero
        </M>
      </g>
    </Scene>
  )
}

export function PoleContourStrategyScene() {
  return (
    <Scene caption="Count the poles inside first — the method follows from the count, not from the integrand">
      <Contour cx="230" cy="204" r="130" tone={FN} className="catm-draw" label="C" />
      {[
        [190, 170, true],
        [268, 240, true],
        [78, 110, false],
        [376, 300, false],
      ].map(([px, py, inside], i) => (
        <g key={i} className={`catm-pop catm-delay-${i}`}>
          <PoleMark cx={px} cy={py} kind="pole" tone={inside ? GREEN : MUTED} r="10" />
          <M x={px} y={py + 26} size={11} fill={inside ? GREEN : MUTED} weight={800}>
            {inside ? '✓' : '✗'}
          </M>
        </g>
      ))}
      <M x="230" y="368" size={10.5} fill={MUTED} weight={800}>
        two inside, two outside
      </M>

      {[
        ['none inside', 'the integral is zero', GREEN],
        ['exactly one', 'apply the formula directly', FN],
        ['two or more', 'partial fractions, then each', DOM],
        ['a repeated pole', 'use the derivative form', OP],
      ].map(([q, a, tone], i) => (
        <g key={q} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="450" y={66 + i * 64} width="400" height="52" rx="11" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x="540" y={97 + i * 64} size={11} fill={tone} weight={800}>
            {q}
          </M>
          <M x="716" y={97 + i * 64} size={11} fill={N}>
            {a}
          </M>
        </g>
      ))}

      <g className="catm-slide-in catm-delay-4">
        <rect x="450" y="334" width="400" height="120" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="650" y="360" size={10.5} fill={GOLD} weight={800}>
          two poles, worked
        </M>
        <M x="650" y="388" size={11.5} fill={N} weight={800}>
          1/((z−1)(z−2)) = 1/(z−2) − 1/(z−1)
        </M>
        <M x="650" y="414" size={11.5} fill={N} weight={800}>
          = 2πi·(1) − 2πi·(1)
        </M>
        <M x="650" y="440" size={12.5} fill={GREEN} weight={800}>
          = 0
        </M>
      </g>
    </Scene>
  )
}

export function RigidityContrastScene() {
  return (
    <Scene caption="A real function can be changed locally; an analytic one cannot be changed anywhere">
      <rect x="40" y="62" width="380" height="300" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.3" />
      <M x="230" y="88" size={12} fill={MUTED} weight={800}>
        real functions
      </M>
      <Wire d="M76 168 L384 168" stroke={MUTED} width="1.4" opacity="0.5" />
      <Wire d="M76 190 L200 190 L320 122 L384 122" stroke={ROSE} width="2.8" className="catm-draw" />
      <Dot cx="200" cy="190" r="6" fill={RED} />
      <M x="230" y="212" size={9.5} fill={RED} weight={800}>
        differentiable once, a corner in the next derivative
      </M>
      <Wire d="M76 320 L384 320" stroke={MUTED} width="1.4" opacity="0.5" />
      <Curve
        pts={Array.from({ length: 61 }, (_, i) => {
          const t = -1 + (2 * i) / 60
          const v = Math.abs(t) < 1 ? Math.exp(-1 / (1 - t * t)) : 0
          return [230 + t * 140, 320 - 120 * v]
        })}
        stroke={OP}
        width="2.8"
        className="catm-draw catm-delay-2"
      />
      <M x="230" y="346" size={9.5} fill={OP} weight={800}>
        change it here and nothing else is affected
      </M>

      <rect x="452" y="62" width="380" height="300" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <M x="642" y="88" size={12} fill={GREEN} weight={800}>
        analytic functions
      </M>
      <circle cx="642" cy="230" r="118" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="2.4" />
      <Wire d="M560 145 A118 118 0 0 1 642 112" stroke={OP} width="5" className="catm-pulse" />
      {/* Fanned down into the disc: pointing outwards they left the panel
          through its top border. */}
      {[-30, -55, -80, -105, -130].map((a, i) => (
        <Phasor key={a} ox="604" oy="132" ang={a} len={92} label="" tone={GREEN} width="1.8" className={`catm-draw catm-delay-${i % 5}`} />
      ))}
      <M x="642" y="374" size={10} fill={GREEN} weight={800}>
        values on any arc determine every value in the region
      </M>

      {['infinitely differentiable', 'equals its Taylor series', 'determined by an arc'].map((prop, i) => (
        <g key={prop} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={40 + i * 274} y="388" width="256" height="62" rx="11" fill={WHITE} stroke={MUTED} strokeWidth="1.9" />
          <foreignObject x={52 + i * 274} y="394" width="160" height="50">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11px/1.2 system-ui,sans-serif', color: '#5b5b7a', display: 'flex', alignItems: 'center', height: '100%' }}>
              {prop}
            </div>
          </foreignObject>
          <M x={228 + i * 274} y="426" size={14} fill={RED} weight={800}>
            ✗
          </M>
          <M x={272 + i * 274} y="426" size={14} fill={GREEN} weight={800}>
            ✓
          </M>
        </g>
      ))}
    </Scene>
  )
}

export function AnalyticityCatalogueScene() {
  const rows = [
    ['polynomials', 'everywhere', '—', 'none'],
    ['eᶻ, sin z, cos z', 'everywhere', '—', 'none'],
    ['1/z', 'z ≠ 0', 'the origin', 'point'],
    ['log z', 'off the cut', 'a ray from 0', 'ray'],
    ['conj(z)', 'nowhere', 'everywhere', 'all'],
  ]
  return (
    <Scene caption="Five functions worth knowing by heart, and the shape of what each one excludes">
      <rect x="40" y="62" width="620" height="30" rx="8" fill={N} />
      {['function', 'analytic where', 'and not where'].map((h, i) => (
        <M key={h} x={140 + i * 200} y="83" size={10.5} fill={WHITE} weight={800}>
          {h}
        </M>
      ))}
      {rows.map(([fn, ok, bad, shape], i) => (
        <g key={fn} className={`catm-cell-in catm-delay-${i % 5}`}>
          <rect x="40" y={100 + i * 62} width="620" height="54" rx="10" fill={WHITE} stroke={shape === 'none' ? GREEN : ROSE} strokeWidth="2.1" />
          <M x="140" y={132 + i * 62} size={12} fill={N} weight={800}>
            {fn}
          </M>
          <M x="340" y={132 + i * 62} size={11} fill={GREEN}>
            {ok}
          </M>
          <M x="540" y={132 + i * 62} size={11} fill={shape === 'none' ? MUTED : RED}>
            {bad}
          </M>
          <circle cx="620" cy={127 + i * 62} r="19" fill={shape === 'all' ? RED : GREEN} fillOpacity="0.14" stroke={shape === 'all' ? RED : GREEN} strokeWidth="1.8" />
          {shape === 'point' ? <Dot cx="620" cy={127 + i * 62} r="5" fill={RED} /> : null}
          {shape === 'ray' ? <Wire d={`M620 ${127 + i * 62} L639 ${127 + i * 62}`} stroke={RED} width="3" /> : null}
        </g>
      ))}

      <Card
        x="688"
        y="100"
        w="164"
        h="212"
        title="the three-step test"
        accent={FN}
        lines={['1 · are uₓ, u_y, vₓ, v_y', 'continuous?', '', '2 · do the CR', 'equations hold?', '', '3 · name the excluded', 'set explicitly']}
        linesY={56}
        lineH={20}
        className="catm-slide-in catm-delay-3"
      />
      <M x="350" y="440" size={10.5} fill={MUTED} weight={800}>
        conj(z) satisfies neither CR equation anywhere — it is the standard counterexample
      </M>
    </Scene>
  )
}

export function IntegralMethodSelectorScene() {
  return (
    <Scene caption="Two questions decide the method; the integrand only decides the arithmetic">
      <g className="catm-emerge">
        <rect x="316" y="56" width="268" height="44" rx="12" fill={N} />
        <L x="450" y="84" size={13} fill={WHITE}>
          is the contour closed?
        </L>
      </g>
      <Wire d="M380 100 L190 140" stroke={MUTED} width="2" dash="6 5" />
      <Wire d="M520 100 L620 140" stroke={MUTED} width="2" dash="6 5" />
      <M x="270" y="118" size={10} fill={MUTED} weight={800}>no</M>
      <M x="590" y="118" size={10} fill={MUTED} weight={800}>yes</M>

      <g className="catm-cell-in">
        <rect x="60" y="146" width="262" height="72" rx="12" fill={ROSE} fillOpacity="0.1" stroke={ROSE} strokeWidth="2.3" />
        <M x="191" y="180" size={12} fill={ROSE} weight={800}>
          parametrise directly
        </M>
        <rect x="100" y="192" width="182" height="12" rx="6" fill={SKY} />
        <rect x="100" y="192" width="170" height="12" rx="6" fill={ROSE} className="catm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} />
      </g>

      <g className="catm-emerge catm-delay-1">
        <rect x="490" y="146" width="330" height="44" rx="12" fill={N} />
        <L x="655" y="174" size={12.5} fill={WHITE}>
          any singularities inside?
        </L>
      </g>
      <Wire d="M560 190 L470 230" stroke={MUTED} width="2" dash="6 5" />
      <Wire d="M740 190 L760 230" stroke={MUTED} width="2" dash="6 5" />
      <g className="catm-cell-in catm-delay-2">
        <rect x="360" y="236" width="240" height="88" rx="12" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.3" />
        <M x="480" y="268" size={11.5} fill={GREEN} weight={800}>
          Cauchy theorem
        </M>
        <M x="480" y="290" size={12.5} fill={GREEN} weight={800}>
          ∮ = 0
        </M>
        <rect x="400" y="300" width="160" height="12" rx="6" fill={SKY} />
        <rect x="400" y="300" width="28" height="12" rx="6" fill={GREEN} className="catm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} />
      </g>
      <g className="catm-cell-in catm-delay-3">
        <rect x="620" y="236" width="240" height="88" rx="12" fill={FN} fillOpacity="0.1" stroke={FN} strokeWidth="2.3" />
        <M x="740" y="268" size={11.5} fill={FN} weight={800}>
          integral formula
        </M>
        <M x="740" y="290" size={10} fill={MUTED}>
          partial fractions if several
        </M>
        <rect x="660" y="300" width="160" height="12" rx="6" fill={SKY} />
        <rect x="660" y="300" width="70" height="12" rx="6" fill={FN} className="catm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }} />
      </g>

      {[
        ['open arc', 'parametrise', ROSE],
        ['circle, no pole inside', 'theorem, = 0', GREEN],
        ['circle, pole inside', 'formula, = 2πi f(a)', FN],
      ].map(([c, m, tone], i) => (
        <g key={c} className={`catm-slide-in catm-delay-${i}`}>
          <rect x={60 + i * 274} y="356" width="256" height="82" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x={188 + i * 274} y="384" size={10.5} fill={MUTED} weight={800}>
            {c}
          </M>
          <M x={188 + i * 274} y="412" size={11.5} fill={tone} weight={800}>
            {m}
          </M>
        </g>
      ))}
      <M x="450" y="462" size={10} fill={MUTED} weight={800}>
        same integrand, three contours, three methods
      </M>
    </Scene>
  )
}

export function ApplicationsWebScene() {
  const apps = [
    ['phasors', 'complex arithmetic', '1BEE303 Module 1', FN, 120, 110],
    ['impedance', 'a complex number', '1BEE303 Module 1', DOM, 760, 110],
    ['H(s)', 'poles are singularities', '1BEE303 Module 4', OP, 770, 300],
    ['field problems', 'the complex potential', 'this module', GREEN, 110, 300],
    ['conformal mapping', 'analyticity preserves angles', 'field solving', GOLD, 450, 404],
  ]
  return (
    <Scene caption="The same mathematics under five different names, in four different courses">
      <g className="catm-emerge">
        <circle cx="450" cy="222" r="72" fill={N} />
        <L x="450" y="214" size={13} fill={WHITE}>
          complex
        </L>
        <L x="450" y="236" size={13} fill={WHITE}>
          analysis
        </L>
      </g>
      {apps.map(([name, what, where, tone, cx, cy], i) => (
        <g key={name} className={`catm-slide-in catm-delay-${i % 5}`}>
          <Wire
            d={`M450 222 L${cx < 450 ? cx + 100 : cx > 500 ? cx - 100 : cx} ${cy < 222 ? cy + 30 : cy > 260 ? cy - 30 : cy}`}
            stroke={MUTED}
            width="2"
            dash="6 5"
            opacity="0.55"
          />
          <rect x={cx - 100} y={cy - 40} width="200" height="80" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={cx} y={cy - 14} size={11.5} fill={tone} weight={800}>
            {name}
          </M>
          <M x={cx} y={cy + 8} size={10} fill={N}>
            {what}
          </M>
          <M x={cx} y={cy + 28} size={9} fill={MUTED}>
            {where}
          </M>
        </g>
      ))}
      <M x="450" y="472" size={10.5} fill={MUTED} weight={800}>
        the same mathematics under five different names
      </M>
    </Scene>
  )
}

export function ComplexProblemFlowScene() {
  const panels = [
    ['given u(x, y)', 'a harmonic candidate', FN, 'harmonic'],
    ['verify ∇²u = 0', 'a tick, or stop here', GREEN, 'justified'],
    ['Milne-Thomson', 'reconstruct f(z)', OP, 'f(z)'],
    ['find the singularities', 'where is f not analytic', DOM, 'the poles'],
    ['choose and evaluate', 'theorem or formula', GOLD, ''],
  ]
  return (
    <Scene caption="Each panel hands the next exactly one thing — and the last one hands you the mark">
      {panels.map(([title, sub, tone, pass], i) => (
        <g key={title} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={26 + i * 172} y="96" width="154" height="168" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x={26 + i * 172} y="96" width="154" height="28" rx="12" fill={tone} />
          <foreignObject x={32 + i * 172} y="98" width="142" height="26">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '800 9.5px/1.15 system-ui,sans-serif', color: '#fff', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              {`${i + 1} · ${title}`}
            </div>
          </foreignObject>
          <foreignObject x={36 + i * 172} y="140" width="134" height="80">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11px/1.25 system-ui,sans-serif', color: '#1e1b3a', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center', textAlign: 'center' }}>
              {sub}
            </div>
          </foreignObject>
          {i === 1 ? <M x={103 + i * 172} y="244" size={16} fill={GREEN} weight={800}>✓</M> : null}
          {pass ? (
            <g>
              <Wire d={`M${180 + i * 172} 180 L${198 + i * 172} 180`} stroke={tone} width="2.4" marker={`url(#${markerFor(tone)})`} className="catm-flow-arrow" />
              <M x={189 + i * 172} y="168" size={8.5} fill={tone} weight={800}>
                {pass}
              </M>
            </g>
          ) : null}
        </g>
      ))}
      <g className="catm-emerge">
        <rect x="240" y="312" width="420" height="88" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="3.2" />
        <M x="450" y="344" size={11} fill={GREEN} weight={800}>
          the answer
        </M>
        <M x="450" y="378" size={16} fill={N} weight={800}>
          ∮_C f(z) dz = 2πi·f(a)
        </M>
      </g>
      <M x="450" y="436" size={10.5} fill={MUTED} weight={800}>
        skip step 2 and the reconstruction in step 3 is not justified
      </M>
    </Scene>
  )
}

/* ── Module 2 — Fourier series ──────────────────────────────────── */

/** Partial sum of the square-wave Fourier series, sampled onto a plot box.
 *  `terms` counts the odd harmonics included, so 1, 3, 7, 15 are the four
 *  pictures the syllabus asks for. */
function squarePartial(x0, w, base, amp, terms, cycles = 2, steps = 400) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    let v = 0
    for (let k = 1; k <= terms; k += 2) {
      v += Math.sin(2 * Math.PI * cycles * k * t) / k
    }
    pts.push([x0 + t * w, base - amp * (4 / Math.PI) * v])
  }
  return pts
}

export function SinusoidThroughSystemScene() {
  return (
    <Scene caption="A sinusoid is the only waveform an LTI system gives back unchanged in shape">
      <Wire d="M60 110 L170 110" stroke={MUTED} width="1.3" opacity="0.5" />
      <Wave x="60" y="110" w="110" amp="28" cycles={1.5} stroke={FN} width="2.6" className="catm-draw" />
      <Block x="200" y="78" w="120" h="64" label="LTI system" stroke={MUTED} />
      <Wire d="M170 110 L200 110 M320 110 L350 110" stroke={N} width="2.2" marker="url(#catArr)" />
      <Wire d="M350 110 L500 110" stroke={MUTED} width="1.3" opacity="0.5" />
      <Wave x="350" y="110" w="150" amp="18" cycles={1.5} phase={0.9} stroke={GREEN} width="2.6" className="catm-draw catm-delay-2" />
      <g className="catm-emerge">
        <path d="M350 152 L350 162 M350 157 L450 157 M450 152 L450 162" stroke={GREEN} strokeWidth="2.2" fill="none" />
        <M x="400" y="178" size={10} fill={GREEN} weight={800}>
          same period
        </M>
      </g>
      <M x="560" y="114" size={11.5} fill={GREEN} anchor="start" weight={800}>
        shape preserved
      </M>

      <Wire d="M60 268 L170 268" stroke={MUTED} width="1.3" opacity="0.5" />
      <Curve
        pts={Array.from({ length: 121 }, (_, i) => {
          const t = i / 120
          return [60 + t * 110, 268 - 28 * Math.sign(Math.sin(2 * Math.PI * 1.5 * t) || 1)]
        })}
        stroke={OP}
        width="2.6"
        className="catm-draw catm-delay-2"
      />
      <Block x="200" y="236" w="120" h="64" label="LTI system" stroke={MUTED} />
      <Wire d="M170 268 L200 268 M320 268 L350 268" stroke={N} width="2.2" marker="url(#catArr)" />
      <Wire d="M350 268 L500 268" stroke={MUTED} width="1.3" opacity="0.5" />
      <Curve pts={squarePartial(350, 150, 268, 22, 3, 1.5)} stroke={RED} width="2.6" className="catm-draw catm-delay-3" />
      <M x="560" y="272" size={11.5} fill={RED} anchor="start" weight={800}>
        shape not preserved
      </M>

      {[1, 3, 5].map((k, i) => (
        <g key={k} className={`catm-cell-in catm-delay-${i}`}>
          <Wire d={`M640 ${110 + i * 56} L820 ${110 + i * 56}`} stroke={MUTED} width="1.2" opacity="0.4" />
          <Wave x="640" y={110 + i * 56} w="180" amp={34 / k} cycles={1.5 * k} stroke={FN} width="2" />
          <M x="628" y={114 + i * 56} size={9.5} fill={FN} anchor="end" weight={800}>
            {`h${k}`}
          </M>
        </g>
      ))}
      <g className="catm-emerge">
        <Wire d="M730 292 L730 320" stroke={OP} width="2.4" marker="url(#catArrO)" />
        <rect x="620" y="330" width="220" height="92" rx="12" fill={SKY} stroke={OP} strokeWidth="2.4" />
        <M x="730" y="356" size={10.5} fill={OP} weight={800}>
          each one passes through
        </M>
        <M x="730" y="378" size={10.5} fill={OP} weight={800}>
          separately, then they add
        </M>
        <M x="730" y="404" size={10} fill={MUTED}>
          that is the whole reason for the series
        </M>
      </g>
    </Scene>
  )
}

export function HarmonicFamilyScene() {
  return (
    <Scene caption="Every harmonic returns to its starting value at the same instant — that is what makes the sum periodic">
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k} className={`catm-draw catm-delay-${k}`}>
          <Wire d={`M120 ${92 + k * 70} L560 ${92 + k * 70}`} stroke={MUTED} width="1.2" opacity="0.45" />
          {k === 0 ? (
            <Wire d="M120 74 L560 74" stroke={FN} width="2.6" />
          ) : (
            <Wave x="120" y={92 + k * 70} w="440" amp="26" cycles={k} stroke={FN} width="2.6" phase={Math.PI / 2} />
          )}
          <M x="108" y={96 + k * 70} size={10} fill={FN} anchor="end" weight={800}>
            {k === 0 ? 'a₀' : `${k}f`}
          </M>
          <M x="576" y={96 + k * 70} size={9.5} fill={MUTED} anchor="start">
            {k === 0 ? 'constant' : `${k} cycle${k > 1 ? 's' : ''}`}
          </M>
        </g>
      ))}
      {[120, 340, 560].map((x) => (
        <Wire key={x} d={`M${x} 60 L${x} 384`} stroke={ROSE} width="1.6" dash="5 5" opacity="0.7" />
      ))}
      <M x="340" y="406" size={10.5} fill={ROSE} weight={800}>
        one fundamental period
      </M>

      <g className="catm-slide-in catm-delay-4">
        <rect x="620" y="86" width="230" height="298" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
        <M x="735" y="112" size={11} fill={GREEN} weight={800}>
          adding the first three
        </M>
        {[1, 2, 3].map((n2, i) => (
          <g key={n2}>
            <Wire d={`M644 ${176 + i * 80} L826 ${176 + i * 80}`} stroke={MUTED} width="1.2" opacity="0.4" />
            <Curve
              pts={Array.from({ length: 121 }, (_, j) => {
                const t = j / 120
                let v = 0
                for (let k = 1; k <= n2; k += 1) v += Math.cos(2 * Math.PI * k * t) / k
                return [644 + t * 182, 176 + i * 80 - 20 * v]
              })}
              stroke={GREEN}
              width="2.4"
            />
            <M x="735" y={208 + i * 80} size={9} fill={MUTED}>
              {`${n2} term${n2 > 1 ? 's' : ''}`}
            </M>
          </g>
        ))}
      </g>
    </Scene>
  )
}

export function OrthogonalityScene() {
  return (
    <Scene caption="Multiply by one harmonic, integrate, and every other term is annihilated">
      <g className="catm-cell-in">
        <rect x="50" y="72" width="800" height="52" rx="11" fill={WHITE} stroke={MUTED} strokeWidth="2" />
        <M x="450" y="104" size={13} fill={N}>
          f(x) = a₀/2 + a₁cos x + a₂cos 2x + a₃cos 3x + b₁sin x + b₂sin 2x + …
        </M>
      </g>
      <g className="catm-pulse">
        <rect x="270" y="142" width="360" height="42" rx="10" fill={OP} fillOpacity="0.14" stroke={OP} strokeWidth="2.6" />
        <M x="450" y="169" size={12.5} fill={OP} weight={800}>
          × cos(2x), then ∫ over one period
        </M>
      </g>
      <Wire d="M450 186 L450 208" stroke={MUTED} width="2.2" marker="url(#catArrM)" />

      {[
        ['a₀/2', true],
        ['a₁cos x', true],
        ['a₂cos 2x', false],
        ['a₃cos 3x', true],
        ['b₁sin x', true],
        ['b₂sin 2x', true],
      ].map(([term, dies], i) => (
        <g key={term} className={`catm-cell-in catm-delay-${i % 5}`}>
          <rect
            x={50 + i * 134}
            y="220"
            width="124"
            height="72"
            rx="11"
            fill={dies ? MUTED : GREEN}
            fillOpacity={dies ? 0.08 : 0.14}
            stroke={dies ? MUTED : GREEN}
            strokeWidth={dies ? 1.8 : 3}
          />
          <M x={112 + i * 134} y="252" size={11} fill={dies ? MUTED : GREEN} weight={800}>
            {term}
          </M>
          <M x={112 + i * 134} y="278" size={12} fill={dies ? MUTED : GREEN} weight={800}>
            {dies ? '= 0' : '= π·a₂'}
          </M>
        </g>
      ))}

      <g className="catm-slide-in catm-delay-3">
        <rect x="50" y="312" width="380" height="136" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.3" />
        <M x="240" y="336" size={10.5} fill={FN} weight={800}>
          why they die: cos x · cos 2x over a period
        </M>
        <Wire d="M76 400 L404 400" stroke={MUTED} width="1.4" />
        <path
          d={(() => {
            const pts = []
            for (let i = 0; i <= 120; i += 1) {
              const t = i / 120
              pts.push(`${i === 0 ? 'M' : 'L'}${(76 + t * 328).toFixed(1)} ${(400 - 34 * Math.cos(2 * Math.PI * t) * Math.cos(4 * Math.PI * t)).toFixed(1)}`)
            }
            return `${pts.join(' ')} L404 400 L76 400 Z`
          })()}
          fill={OP}
          fillOpacity="0.2"
          stroke={OP}
          strokeWidth="2.4"
        />
        <M x="240" y="432" size={10} fill={OP} weight={800}>
          positive and negative areas cancel exactly
        </M>
      </g>
      <Card
        x="470"
        y="312"
        w="380"
        h="136"
        title="the property, stated"
        accent={GREEN}
        mono
        lines={['∫ cos(mx)·cos(nx) dx = 0   m ≠ n', '∫ sin(mx)·sin(nx) dx = 0   m ≠ n', '∫ cos(mx)·sin(nx) dx = 0   always']}
        linesY={62}
        lineH={26}
        className="catm-slide-in catm-delay-4"
      />
    </Scene>
  )
}

export function EulerFormulaeScene() {
  const lanes = [
    ['a₀', 'integrate the series directly', 'every harmonic integrates to 0', 'a₀ = (1/π)∫ f dx', FN],
    ['aₙ', 'multiply by cos(nx) first', 'all but the aₙ term collapse', 'aₙ = (1/π)∫ f·cos(nx) dx', DOM],
    ['bₙ', 'multiply by sin(nx) first', 'all but the bₙ term collapse', 'bₙ = (1/π)∫ f·sin(nx) dx', OP],
  ]
  return (
    <Scene caption="The same argument, three times over — only the multiplier changes">
      {lanes.map(([name, step1, step2, result, tone], i) => (
        <g key={name} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="40" y={68 + i * 122} width="812" height="106" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <circle cx="86" cy={121 + i * 122} r="24" fill={tone} />
          <M x="86" y={127 + i * 122} size={14} fill={WHITE} weight={800}>
            {name}
          </M>
          <rect x="132" y={94 + i * 122} width="216" height="54" rx="10" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth="1.9" />
          <foreignObject x="142" y={100 + i * 122} width="196" height="42">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11px/1.2 system-ui,sans-serif', color: '#1e1b3a', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              {step1}
            </div>
          </foreignObject>
          <Wire d={`M356 ${121 + i * 122} L378 ${121 + i * 122}`} stroke={MUTED} width="2.2" marker="url(#catArrM)" />
          <rect x="386" y={94 + i * 122} width="216" height="54" rx="10" fill={MUTED} fillOpacity="0.08" stroke={MUTED} strokeWidth="1.8" />
          <foreignObject x="396" y={100 + i * 122} width="196" height="42">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11px/1.2 system-ui,sans-serif', color: '#5b5b7a', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              {step2}
            </div>
          </foreignObject>
          <Wire d={`M610 ${121 + i * 122} L632 ${121 + i * 122}`} stroke={MUTED} width="2.2" marker="url(#catArrM)" />
          <rect x="640" y={94 + i * 122} width="194" height="54" rx="10" fill={tone} fillOpacity="0.14" stroke={tone} strokeWidth="2.8" />
          <M x="737" y={127 + i * 122} size={11.5} fill={tone} weight={800}>
            {result}
          </M>
        </g>
      ))}
      <g className="catm-emerge">
        <rect x="200" y="436" width="500" height="34" rx="9" fill={SKY} stroke={GOLD} strokeWidth="2.2" />
        <M x="450" y="459" size={11.5} fill={GOLD} weight={800}>
          orthogonality does all the work in every lane
        </M>
      </g>
    </Scene>
  )
}

export function DirichletMidpointScene() {
  return (
    <Scene caption="At a jump the series converges to the midpoint — whatever value you assigned there">
      {[
        ['single-valued, finite', true],
        ['finitely many maxima and minima', true],
        ['finitely many discontinuities', true],
        ['sin(1/x) near zero', false],
      ].map(([cond, ok], i) => (
        <g key={cond} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="40" y={70 + i * 88} width="368" height="74" rx="11" fill={WHITE} stroke={ok ? GREEN : RED} strokeWidth="2.2" />
          <M x="70" y={104 + i * 88} size={16} fill={ok ? GREEN : RED} anchor="start" weight={800}>
            {ok ? '✓' : '✗'}
          </M>
          <foreignObject x="96" y={82 + i * 88} width="200" height="50">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11px/1.2 system-ui,sans-serif', color: '#1e1b3a', display: 'flex', alignItems: 'center', height: '100%' }}>
              {cond}
            </div>
          </foreignObject>
          <Wire d={`M306 ${120 + i * 88} L392 ${120 + i * 88}`} stroke={MUTED} width="1.2" opacity="0.5" />
          {i === 0 ? <Wave x="306" y={110 + i * 88} w="86" amp="14" cycles={1} stroke={GREEN} width="2" /> : null}
          {i === 1 ? <Wire d={`M306 ${126 + i * 88} L330 ${100 + i * 88} L356 ${130 + i * 88} L392 ${106 + i * 88}`} stroke={GREEN} width="2" /> : null}
          {i === 2 ? <Wire d={`M306 ${128 + i * 88} L344 ${128 + i * 88} L344 ${100 + i * 88} L392 ${100 + i * 88}`} stroke={GREEN} width="2" /> : null}
          {i === 3 ? (
            <Curve
              pts={Array.from({ length: 80 }, (_, k) => {
                const t = 0.04 + (k / 80) * 0.96
                return [306 + t * 86, 114 + i * 88 - 16 * Math.sin(1 / t)]
              })}
              stroke={RED}
              width="1.8"
            />
          ) : null}
        </g>
      ))}

      <Wire d="M470 260 L840 260" stroke={MUTED} width="1.4" opacity="0.5" />
      <Wire d="M470 180 L640 180" stroke={FN} width="3.2" className="catm-draw" />
      <Wire d="M640 340 L840 340" stroke={FN} width="3.2" className="catm-draw" />
      <Dot cx="640" cy="180" r="8" fill={DOM} className="catm-pop" />
      <Dot cx="640" cy="340" r="8" fill={DOM} className="catm-pop catm-delay-1" />
      <M x="628" y="168" size={10} fill={DOM} anchor="end" weight={800}>
        f(x⁻)
      </M>
      <M x="654" y="360" size={10} fill={DOM} anchor="start" weight={800}>
        f(x⁺)
      </M>
      <g className="catm-emerge">
        <Dot cx="640" cy="260" r="10" fill={GREEN} />
        <M x="668" y="256" size={11.5} fill={GREEN} anchor="start" weight={800}>
          the series converges here
        </M>
        <path d="M600 180 L590 180 M595 180 L595 340 M600 340 L590 340" stroke={GREEN} strokeWidth="2.2" fill="none" />
        <M x="580" y="264" size={10} fill={GREEN} anchor="end" weight={800}>
          midpoint
        </M>
      </g>
      <M x="655" y="404" size={10.5} fill={MUTED} weight={800}>
        it does not care what value you assign at the jump
      </M>
      <M x="655" y="428" size={10} fill={MUTED}>
        which is a free check: evaluate the series there and compare
      </M>
    </Scene>
  )
}

export function PartialSumsScene() {
  return (
    <Scene caption="Adding terms narrows the error everywhere except at the jumps, where it never shrinks">
      <Wire d="M60 238 L560 238" stroke={MUTED} width="1.3" opacity="0.45" />
      <Curve
        pts={Array.from({ length: 401 }, (_, i) => {
          const t = i / 400
          return [60 + t * 500, 238 - 96 * Math.sign(Math.sin(2 * Math.PI * 2 * t) || 1)]
        })}
        stroke={MUTED}
        width="2.2"
        opacity="0.45"
      />
      {[
        [1, 0.3],
        [3, 0.5],
        [7, 0.75],
        [15, 1],
      ].map(([terms, op], i) => (
        <Curve
          key={terms}
          pts={squarePartial(60, 500, 238, 96, terms)}
          stroke={FN}
          width="2.4"
          opacity={op}
          className={`catm-draw catm-delay-${i}`}
        />
      ))}
      {[1, 3, 7, 15].map((terms, i) => (
        <M key={terms} x={80 + i * 128} y="376" size={10} fill={FN} weight={800}>
          {`${terms} term${terms > 1 ? 's' : ''}`}
        </M>
      ))}
      <g className="catm-pulse">
        <circle cx="185" cy="132" r="22" fill="none" stroke={RED} strokeWidth="2.6" />
        <Wire d="M212 124 L300 96" stroke={RED} width="2" marker="url(#catArrR)" />
        <M x="312" y="92" size={10.5} fill={RED} anchor="start" weight={800}>
          the overshoot does not shrink
        </M>
      </g>

      <Wire d="M620 380 L850 380" stroke={MUTED} width="1.8" />
      <Wire d="M620 380 L620 110" stroke={MUTED} width="1.8" />
      <Columns
        x="620"
        y="380"
        w="230"
        items={[['1', 1, FN], ['2', 0, MUTED], ['3', 0.333, FN], ['4', 0, MUTED], ['5', 0.2, FN], ['6', 0, MUTED], ['7', 0.143, FN]]}
        max={1}
      />
      <M x="735" y="98" size={10.5} fill={FN} weight={800}>
        amplitudes fall as 1/n
      </M>
      <M x="735" y="424" size={10} fill={MUTED} weight={800}>
        odd harmonics only — the even ones are exactly zero
      </M>
    </Scene>
  )
}

export function GibbsDetailScene() {
  return (
    <Scene caption="Nine percent, at every term count — the spike narrows but never gets shorter">
      <Wire d="M70 330 L500 330" stroke={MUTED} width="1.3" opacity="0.45" />
      <Wire d="M70 250 L285 250 L285 120 L500 120" stroke={MUTED} width="2.4" opacity="0.5" />
      <Wire d="M70 108 L500 108" stroke={RED} width="2" dash="6 5" className="catm-sweep-x" />
      <M x="496" y="98" size={10.5} fill={RED} anchor="end" weight={800}>
        +9% of the jump
      </M>
      {[
        [9, 0.35, 74],
        [25, 0.62, 44],
        [61, 1, 24],
      ].map(([terms, op, spread], i) => (
        <g key={terms} className={`catm-draw catm-delay-${i}`}>
          <Curve
            pts={Array.from({ length: 161 }, (_, k) => {
              const t = -1 + (2 * k) / 160
              const x = 285 + t * 200
              // A ringing approximation: the envelope is fixed, the wavelength
              // shrinks with the term count. That is exactly the Gibbs picture.
              const ring = Math.exp(-Math.abs(t) * 420 / spread) * Math.cos((t * 900) / spread)
              const step = t < 0 ? 250 : 120
              return [x, step - (t < 0 ? -1 : 1) * 62 * ring]
            })}
            stroke={FN}
            width="2.2"
            opacity={op}
          />
          <M x={110 + i * 130} y="362" size={9.5} fill={FN} weight={800}>
            {`${terms} terms`}
          </M>
        </g>
      ))}
      <M x="285" y="392" size={10.5} fill={MUTED} weight={800}>
        constant height, shrinking width
      </M>

      <g className="catm-slide-in catm-delay-3">
        <rect x="556" y="86" width="300" height="330" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.3" />
        <M x="706" y="112" size={11} fill={DOM} weight={800}>
          splitting the integral
        </M>
        <Wire d="M584 176 L828 176" stroke={MUTED} width="1.8" />
        {[584, 666, 748, 828].map((x, i) => (
          <g key={x}>
            <Wire d={`M${x} 166 L${x} 186`} stroke={ROSE} width="2.2" />
            <M x={x} y="204" size={9} fill={ROSE} weight={800}>
              {['−π', 'a', 'b', 'π'][i]}
            </M>
          </g>
        ))}
        {[
          ['−π to a', 'f₁(x)', FN],
          ['a to b', 'f₂(x)', OP],
          ['b to π', 'f₃(x)', DOM],
        ].map(([range, expr, tone], i) => (
          <g key={range}>
            <rect x="580" y={232 + i * 56} width="252" height="44" rx="9" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth="2" />
            <M x="646" y={259 + i * 56} size={10.5} fill={tone} weight={800}>
              {range}
            </M>
            <M x="776" y={259 + i * 56} size={11} fill={N}>
              {expr}
            </M>
          </g>
        ))}
        <M x="706" y="412" size={9.5} fill={MUTED}>
          one integral per piece, then add them
        </M>
      </g>
    </Scene>
  )
}

export function PeriodScalingScene() {
  return (
    <Scene caption="One substitution, two changes: π becomes L, and nx becomes nπx/L">
      <Wire d="M80 132 L500 132" stroke={MUTED} width="2.2" />
      {[80, 290, 500].map((x, i) => (
        <g key={x}>
          <Wire d={`M${x} 122 L${x} 142`} stroke={FN} width="2.4" />
          <M x={x} y="114" size={10.5} fill={FN} weight={800}>
            {['−π', '0', 'π'][i]}
          </M>
        </g>
      ))}
      <Wire d="M80 254 L500 254" stroke={MUTED} width="2.2" />
      {[80, 290, 500].map((x, i) => (
        <g key={`b${x}`}>
          <Wire d={`M${x} 244 L${x} 264`} stroke={DOM} width="2.4" />
          <M x={x} y="286" size={10.5} fill={DOM} weight={800}>
            {['−L', '0', 'L'][i]}
          </M>
        </g>
      ))}
      {[80, 185, 290, 395, 500].map((x, i) => (
        <Wire key={`c${x}`} d={`M${x} 146 L${x} 240`} stroke={MUTED} width="1.5" dash="5 5" opacity="0.6" className={`catm-draw catm-delay-${i % 5}`} />
      ))}
      <M x="290" y="182" size={11} fill={OP} weight={800}>
        x ↦ πx/L
      </M>

      {[
        ['standard', 'a₀ = (1/π)∫₋π^π f dx', 'aₙ = (1/π)∫ f·cos(nx) dx', FN],
        ['general', 'a₀ = (1/L)∫₋L^L f dx', 'aₙ = (1/L)∫ f·cos(nπx/L) dx', DOM],
      ].map(([tag, f1, f2, tone], i) => (
        <g key={tag} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={40 + i * 420} y="312" width="400" height="106" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={240 + i * 420} y="338" size={10.5} fill={tone} weight={800}>
            {tag}
          </M>
          <M x={240 + i * 420} y="370" size={11.5} fill={N}>
            {f1}
          </M>
          <M x={240 + i * 420} y="398" size={11.5} fill={N}>
            {f2}
          </M>
        </g>
      ))}

      <g className="catm-slide-in catm-delay-3">
        <rect x="560" y="70" width="292" height="210" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="706" y="98" size={11} fill={GOLD} weight={800}>
          a mains example
        </M>
        {[
          ['period', '20 ms'],
          ['so L', '10 ms'],
          ['fundamental', '50 Hz'],
          ['2nd, 3rd', '100, 150 Hz'],
        ].map(([k, v], i) => (
          <g key={k}>
            <M x="590" y={136 + i * 34} size={11} fill={MUTED} anchor="start">
              {k}
            </M>
            <M x="822" y={136 + i * 34} size={11.5} fill={N} anchor="end" weight={800}>
              {v}
            </M>
          </g>
        ))}
      </g>
      <M x="450" y="446" size={10.5} fill={MUTED} weight={800}>
        nothing else in the method changes at all
      </M>
    </Scene>
  )
}

export function EvenSymmetryScene() {
  return (
    <Scene caption="Even symmetry kills every sine coefficient — half the work, before you integrate anything">
      <Wire d="M60 150 L440 150" stroke={MUTED} width="1.3" opacity="0.5" />
      <Wire d="M250 70 L250 230" stroke={ROSE} width="2" dash="6 5" />
      <Curve
        pts={Array.from({ length: 81 }, (_, i) => {
          const t = -1 + (2 * i) / 80
          return [250 + t * 190, 150 - 62 * (1 - t * t)]
        })}
        stroke={FN}
        width="3"
        className="catm-draw"
      />
      <M x="250" y="252" size={11} fill={ROSE} weight={800}>
        f(−x) = f(x)
      </M>

      {[
        ['f(x)·cos(nx)', 'both halves add', GREEN, 1],
        ['f(x)·sin(nx)', 'the halves cancel', RED, -1],
      ].map(([title, note, tone, sign], i) => (
        <g key={title} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={40 + i * 216} y="288" width="200" height="158" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={140 + i * 216} y="314" size={10.5} fill={tone} weight={800}>
            {title}
          </M>
          <Wire d={`M${64 + i * 216} 386 L${216 + i * 216} 386`} stroke={MUTED} width="1.3" />
          <path
            d={(() => {
              const pts = []
              for (let k = 0; k <= 80; k += 1) {
                const t = -1 + (2 * k) / 80
                const f = 1 - t * t
                const h = sign > 0 ? Math.cos(3 * Math.PI * t) : Math.sin(3 * Math.PI * t)
                pts.push(`${k === 0 ? 'M' : 'L'}${(140 + i * 216 + t * 76).toFixed(1)} ${(386 - 40 * f * h).toFixed(1)}`)
              }
              return `${pts.join(' ')} L${216 + i * 216} 386 L${64 + i * 216} 386 Z`
            })()}
            fill={tone}
            fillOpacity="0.22"
            stroke={tone}
            strokeWidth="2.2"
          />
          <M x={140 + i * 216} y="428" size={10} fill={tone} weight={800}>
            {note}
          </M>
        </g>
      ))}
      <g className="catm-pop catm-delay-2">
        <rect x="256" y="336" width="184" height="42" rx="10" fill={RED} fillOpacity="0.14" stroke={RED} strokeWidth="2.6" />
        <M x="348" y="364" size={14} fill={RED} weight={800}>
          bₙ = 0
        </M>
      </g>

      <Card
        x="500"
        y="88"
        w="352"
        h="180"
        title="what it saves you"
        accent={GREEN}
        lines={['integrals needed: 3 → 2', 'integration range: full → half', 'then double the result', '', 'and the series is a cosine series']}
        linesY={60}
        lineH={24}
        className="catm-slide-in catm-delay-3"
      />
      <Card
        x="500"
        y="296"
        w="352"
        h="150"
        title="check the symmetry first"
        accent={GOLD}
        lines={['it takes ten seconds', 'and it halves the integration', 'that follows']}
        linesY={58}
        lineH={26}
        className="catm-slide-in catm-delay-4"
      />
    </Scene>
  )
}

export function OddSymmetryScene() {
  return (
    <Scene caption="Odd symmetry kills every cosine coefficient — including a₀, which is the mean">
      <Wire d="M60 150 L440 150" stroke={MUTED} width="1.3" opacity="0.5" />
      <Dot cx="250" cy="150" r="7" fill={ROSE} className="catm-spin-slow" />
      <Curve
        pts={Array.from({ length: 81 }, (_, i) => {
          const t = -1 + (2 * i) / 80
          return [250 + t * 190, 150 - 62 * t]
        })}
        stroke={FN}
        width="3"
        className="catm-draw"
      />
      <M x="250" y="252" size={11} fill={ROSE} weight={800}>
        f(−x) = −f(x)
      </M>
      <M x="250" y="274" size={10} fill={MUTED}>
        rotate 180° about the origin and it maps onto itself
      </M>

      {[
        ['f(x)·sin(nx)', 'both halves add', GREEN, 1],
        ['f(x)·cos(nx)', 'the halves cancel', RED, -1],
      ].map(([title, note, tone, sign], i) => (
        <g key={title} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={40 + i * 216} y="300" width="200" height="150" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={140 + i * 216} y="326" size={10.5} fill={tone} weight={800}>
            {title}
          </M>
          <Wire d={`M${64 + i * 216} 394 L${216 + i * 216} 394`} stroke={MUTED} width="1.3" />
          <path
            d={(() => {
              const pts = []
              for (let k = 0; k <= 80; k += 1) {
                const t = -1 + (2 * k) / 80
                const h = sign > 0 ? Math.sin(3 * Math.PI * t) : Math.cos(3 * Math.PI * t)
                pts.push(`${k === 0 ? 'M' : 'L'}${(140 + i * 216 + t * 76).toFixed(1)} ${(394 - 38 * t * h).toFixed(1)}`)
              }
              return `${pts.join(' ')} L${216 + i * 216} 394 L${64 + i * 216} 394 Z`
            })()}
            fill={tone}
            fillOpacity="0.22"
            stroke={tone}
            strokeWidth="2.2"
          />
          <M x={140 + i * 216} y="434" size={10} fill={tone} weight={800}>
            {note}
          </M>
        </g>
      ))}
      <g className="catm-pop catm-delay-2">
        <rect x="256" y="346" width="184" height="42" rx="10" fill={RED} fillOpacity="0.14" stroke={RED} strokeWidth="2.6" />
        <M x="348" y="374" size={13} fill={RED} weight={800}>
          aₙ = 0, a₀ = 0
        </M>
      </g>

      <Card
        x="500"
        y="88"
        w="352"
        h="164"
        title="a₀ = 0 means zero mean"
        accent={DOM}
        lines={['which is exactly what odd', 'symmetry demands: as much', 'area below the axis as above']}
        linesY={60}
        lineH={24}
        className="catm-slide-in catm-delay-3"
      />
      <Card
        x="500"
        y="280"
        w="352"
        h="170"
        title="the two symmetries, side by side"
        accent={GOLD}
        lines={['even → cosine series, bₙ = 0', 'odd  → sine series, aₙ = 0', '', 'neither → compute all three']}
        linesY={62}
        lineH={26}
        className="catm-slide-in catm-delay-4"
      />
    </Scene>
  )
}

export function EvenExtensionScene() {
  return (
    <Scene caption="You are free to invent the other half — so invent the half that kills the most coefficients">
      <Wire d="M60 240 L840 240" stroke={MUTED} width="1.4" opacity="0.5" />
      <Wire d="M450 90 L450 330" stroke={MUTED} width="1.4" opacity="0.5" />
      {[-2, -1, 0, 1].map((k) => (
        <Curve
          key={k}
          pts={Array.from({ length: 41 }, (_, i) => {
            const t = i / 40
            return [450 + k * 190 + t * 190, 240 - 92 * Math.sin((Math.PI * t) / 2)]
          })}
          stroke={k === 0 ? FN : MUTED}
          width={k === 0 ? 3.4 : 2}
          opacity={k === 0 ? 1 : 0.4}
          className={k === 0 ? 'catm-draw' : 'catm-draw catm-delay-3'}
        />
      ))}
      {[-1, -2, 1].map((k) => (
        <Curve
          key={`m${k}`}
          pts={Array.from({ length: 41 }, (_, i) => {
            const t = i / 40
            return [450 + k * 190 + 190 - t * 190, 240 - 92 * Math.sin((Math.PI * t) / 2)]
          })}
          stroke={k === -1 ? OP : MUTED}
          width={k === -1 ? 3 : 2}
          opacity={k === -1 ? 1 : 0.4}
          dash={k === -1 ? '7 5' : undefined}
          className="catm-draw catm-delay-2"
        />
      ))}
      <g className="catm-emerge">
        <path d="M450 356 L450 366 M450 361 L640 361 M640 356 L640 366" stroke={GREEN} strokeWidth="2.4" fill="none" />
        <M x="545" y="384" size={11} fill={GREEN} weight={800}>
          only this part is required to be correct
        </M>
      </g>
      <M x="545" y="112" size={10.5} fill={FN} weight={800}>
        given on 0 to L
      </M>
      <M x="355" y="112" size={10.5} fill={OP} weight={800}>
        mirrored
      </M>
      <Wire d="M420 150 L380 150" stroke={OP} width="2.6" marker="url(#catArrO)" className="catm-flow-arrow" />

      <g className="catm-slide-in catm-delay-4">
        <rect x="60" y="404" width="380" height="58" rx="11" fill={SKY} stroke={DOM} strokeWidth="2.3" />
        <M x="250" y="428" size={10.5} fill={DOM} weight={800}>
          the slope is zero at both ends
        </M>
        <M x="250" y="450" size={10} fill={MUTED}>
          which is exactly an insulated boundary
        </M>
      </g>
      <g className="catm-slide-in catm-delay-4">
        <rect x="470" y="404" width="380" height="58" rx="11" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.3" />
        <M x="660" y="428" size={10.5} fill={GREEN} weight={800}>
          the extension is even, so bₙ = 0
        </M>
        <M x="660" y="450" size={10} fill={MUTED}>
          a half-range cosine series
        </M>
      </g>
    </Scene>
  )
}

export function SineVsCosineExtensionScene() {
  return (
    <Scene caption="Two extensions of the same half, and the boundary condition decides which one you want">
      {[
        ['even extension → cosine series', 'zero slope at the ends', 'insulated bar end', GREEN, 1],
        ['odd extension → sine series', 'zero value at the ends', 'grounded or clamped end', OP, -1],
      ].map(([title, end, phys, tone, sign], i) => (
        <g key={title} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={40 + i * 420} y="66" width="400" height="230" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={240 + i * 420} y="92" size={11} fill={tone} weight={800}>
            {title}
          </M>
          <Wire d={`M${70 + i * 420} 190 L${410 + i * 420} 190`} stroke={MUTED} width="1.3" opacity="0.5" />
          <Wire d={`M${240 + i * 420} 120 L${240 + i * 420} 250`} stroke={MUTED} width="1.3" opacity="0.5" />
          <Curve
            pts={Array.from({ length: 41 }, (_, k) => {
              const t = k / 40
              return [240 + i * 420 + t * 160, 190 - 62 * Math.sin((Math.PI * t) / 2)]
            })}
            stroke={tone}
            width="3"
          />
          <Curve
            pts={Array.from({ length: 41 }, (_, k) => {
              const t = k / 40
              return [240 + i * 420 - t * 160, 190 - sign * 62 * Math.sin((Math.PI * t) / 2)]
            })}
            stroke={tone}
            width="2.6"
            dash="6 5"
          />
          {sign > 0 ? (
            <g>
              <Wire d={`M${64 + i * 420} 128 L${104 + i * 420} 128`} stroke={GREEN} width="2.6" />
              <Wire d={`M${376 + i * 420} 128 L${416 + i * 420} 128`} stroke={GREEN} width="2.6" />
            </g>
          ) : (
            <g>
              <Dot cx={80 + i * 420} cy="190" r="7" fill={OP} />
              <Dot cx={400 + i * 420} cy="190" r="7" fill={OP} />
            </g>
          )}
          <M x={240 + i * 420} y="266" size={10.5} fill={tone} weight={800}>
            {end}
          </M>
          <M x={240 + i * 420} y="286" size={9.5} fill={MUTED}>
            {phys}
          </M>
        </g>
      ))}

      {[
        ['cosine coefficients', [1, 0.25, 0.111, 0.062, 0.04], GREEN],
        ['sine coefficients', [1, 0.5, 0.333, 0.25, 0.2], OP],
      ].map(([title, vals, tone], i) => (
        <g key={title} className={`catm-cell-in catm-delay-${i + 2}`}>
          <rect x={40 + i * 420} y="318" width="400" height="140" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x={240 + i * 420} y="342" size={10.5} fill={tone} weight={800}>
            {title}
          </M>
          <Wire d={`M${90 + i * 420} 430 L${400 + i * 420} 430`} stroke={MUTED} width="1.6" />
          <Columns x={90 + i * 420} y={430} w={300} items={vals.map((v, k) => [String(k + 1), v, tone])} max={1} />
        </g>
      ))}
      <M x="450" y="308" size={10} fill={MUTED} weight={800}>
        the continuous extension converges faster — that is the reason to prefer it
      </M>
    </Scene>
  )
}

export function HarmonicAnalysisTableScene() {
  const rows = [
    ['0', '0°', '2.3'],
    ['1', '30°', '3.8'],
    ['2', '60°', '4.1'],
    ['3', '90°', '3.2'],
    ['4', '120°', '1.4'],
    ['5', '150°', '0.2'],
  ]
  return (
    <Scene caption="No formula for f — just twelve numbers, a table, and two means doubled">
      <rect x="40" y="62" width="480" height="28" rx="8" fill={N} />
      {['i', 'θ', 'y', 'y·cos θ', 'y·sin θ'].map((h, i) => (
        <M key={h} x={84 + i * 104} y="82" size={10.5} fill={WHITE} weight={800}>
          {h}
        </M>
      ))}
      {rows.map(([i2, th, y], i) => {
        const ang = (Number(th) * Math.PI) / 180
        return (
          <g key={i2} className={`catm-cell-in catm-delay-${i % 5}`}>
            <rect x="40" y={96 + i * 38} width="480" height="32" rx="7" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
            <M x="84" y={117 + i * 38} size={10.5} fill={MUTED}>
              {i2}
            </M>
            <M x="188" y={117 + i * 38} size={10.5} fill={N}>
              {th}
            </M>
            <M x="292" y={117 + i * 38} size={10.5} fill={FN} weight={800}>
              {y}
            </M>
            <M x="396" y={117 + i * 38} size={10.5} fill={DOM}>
              {(Number(y) * Math.cos(ang)).toFixed(2)}
            </M>
            <M x="500" y={117 + i * 38} size={10.5} fill={OP}>
              {(Number(y) * Math.sin(ang)).toFixed(2)}
            </M>
          </g>
        )
      })}
      <M x="280" y="346" size={10} fill={MUTED}>
        … twelve rows in all
      </M>
      {[
        ['mean × 2 = a₁', 396, DOM],
        ['mean × 2 = b₁', 500, OP],
      ].map(([lab, x, tone], i) => (
        <g key={lab} className={`catm-cell-in catm-delay-${i}`}>
          <Wire d={`M${x} 352 L${x} 376`} stroke={tone} width="2.2" marker={`url(#${markerFor(tone)})`} />
          <rect x={x - 76} y="382" width="152" height="40" rx="10" fill={tone} fillOpacity="0.12" stroke={tone} strokeWidth="2.4" />
          <M x={x} y="407" size={10.5} fill={tone} weight={800}>
            {lab}
          </M>
        </g>
      ))}

      <Wire d="M580 320 L850 320" stroke={MUTED} width="1.8" />
      <Wire d="M580 320 L580 96" stroke={MUTED} width="1.8" />
      {rows.map(([, , y], i) => (
        <Dot key={i} cx={580 + i * 44} cy={320 - Number(y) * 44} r="6" fill={FN} className={`catm-pop catm-delay-${i % 5}`} />
      ))}
      <Curve
        pts={Array.from({ length: 61 }, (_, i) => {
          const t = i / 60
          const th = t * Math.PI
          const v = 2.5 + 1.6 * Math.cos(th - 1.1) + 0.4 * Math.cos(2 * th - 0.4)
          return [580 + t * 264, 320 - v * 44]
        })}
        stroke={GREEN}
        width="2.8"
        className="catm-draw catm-delay-3"
      />
      <M x="715" y="352" size={10.5} fill={GREEN} weight={800}>
        reconstruction from three harmonics
      </M>
      <g className="catm-emerge">
        <rect x="580" y="376" width="270" height="52" rx="11" fill={ROSE} fillOpacity="0.1" stroke={ROSE} strokeWidth="2.3" />
        <M x="715" y="398" size={10.5} fill={ROSE} weight={800}>
          12 samples resolve at most
        </M>
        <M x="715" y="418" size={10.5} fill={ROSE} weight={800}>
          the sixth harmonic
        </M>
      </g>
    </Scene>
  )
}

export function SpectrumDiagnosisScene() {
  const cases = [
    ['square wave', [1, 0, 0.333, 0, 0.2, 0, 0.143], 'odd harmonics, 1/n → a jump', FN],
    ['triangle wave', [1, 0, 0.111, 0, 0.04, 0, 0.02], 'odd harmonics, 1/n² → corners only', DOM],
    ['rectified sine', [1, 0.42, 0.08, 0.17, 0.05, 0.09, 0.03], 'even ones too → no half-wave symmetry', OP],
  ]
  return (
    <Scene caption="Read the spectrum backwards: what is missing tells you the symmetry, how fast it falls tells you the smoothness">
      {cases.map(([name, bars, diag, tone], i) => (
        <g key={name} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="40" y={62 + i * 126} width="560" height="114" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="118" y={88 + i * 126} size={10.5} fill={tone} weight={800}>
            {name}
          </M>
          <Wire d={`M64 ${134 + i * 126} L200 ${134 + i * 126}`} stroke={MUTED} width="1.2" opacity="0.4" />
          {i === 0 ? (
            <Curve
              pts={Array.from({ length: 121 }, (_, k) => {
                const t = k / 120
                return [64 + t * 136, 134 + i * 126 - 26 * Math.sign(Math.sin(2 * Math.PI * 2 * t) || 1)]
              })}
              stroke={tone}
              width="2.2"
            />
          ) : null}
          {i === 1 ? (
            <Curve
              pts={Array.from({ length: 121 }, (_, k) => {
                const t = k / 120
                return [64 + t * 136, 134 + i * 126 - 26 * (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * 2 * t))]
              })}
              stroke={tone}
              width="2.2"
            />
          ) : null}
          {i === 2 ? (
            <Curve
              pts={Array.from({ length: 121 }, (_, k) => {
                const t = k / 120
                return [64 + t * 136, 134 + i * 126 - 26 * Math.abs(Math.sin(2 * Math.PI * 2 * t))]
              })}
              stroke={tone}
              width="2.2"
            />
          ) : null}
          <Wire d={`M240 ${150 + i * 126} L440 ${150 + i * 126}`} stroke={MUTED} width="1.5" />
          <Columns x={240} y={150 + i * 126} w={200} items={bars.map((v, k) => [String(k + 1), v * 0.62, tone])} max={1} labelSize={8} />
          <M x="516" y={128 + i * 126} size={9.5} fill={tone} weight={800}>
            {diag.split(' → ')[0]}
          </M>
          <M x="516" y={148 + i * 126} size={9.5} fill={MUTED}>
            {diag.split(' → ')[1]}
          </M>
        </g>
      ))}
      <Card
        x="628"
        y="88"
        w="226"
        h="230"
        title="total harmonic distortion"
        accent={GOLD}
        mono
        lines={['THD = √(Σₙ≥₂ Vₙ²) / V₁', '', 'square wave:', '√(1/9 + 1/25 + …)', '= 0.483', '= 48.3%']}
        linesY={58}
        lineH={24}
        className="catm-slide-in catm-delay-3"
      />
      <M x="450" y="464" size={10.5} fill={MUTED} weight={800}>
        the faster the coefficients fall, the smoother the waveform was
      </M>
    </Scene>
  )
}

export function ExpansionProcedureScene() {
  const steps = [
    ['check Dirichlet', 'or the series means nothing', FN],
    ['test symmetry', 'even? odd? neither?', DOM],
    ['evaluate what survives', 'only the live coefficients', OP],
    ['assemble the series', 'write it out', GREEN],
    ['verify at a known point', 'a jump gives a free check', ROSE],
    ['interpret the spectrum', 'what does it say about f', GOLD],
  ]
  return (
    <Scene caption="Six steps, and step two decides how much of step three you actually have to do">
      {steps.map(([title, sub, tone], i) => (
        <g key={title} className={`catm-cell-in catm-delay-${i % 5}`}>
          <rect x="50" y={64 + i * 64} width="440" height="52" rx="11" fill={WHITE} stroke={tone} strokeWidth={i === 1 || i === 4 ? 3 : 2.2} />
          <M x="76" y={95 + i * 64} size={11} fill={tone} anchor="start" weight={800}>
            {i + 1}
          </M>
          <M x="230" y={95 + i * 64} size={11.5} fill={N}>
            {title}
          </M>
          <M x="412" y={95 + i * 64} size={9.5} fill={MUTED}>
            {sub}
          </M>
          {i < 5 ? (
            <Wire d={`M270 ${116 + i * 64} L270 ${128 + i * 64}`} stroke={MUTED} width="2" marker="url(#catArrM)" />
          ) : null}
        </g>
      ))}

      <g className="catm-slide-in catm-delay-2">
        <Wire d="M490 154 L540 154" stroke={DOM} width="2.4" marker="url(#catArrD)" />
        <rect x="548" y="96" width="304" height="116" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.3" />
        <M x="700" y="122" size={10.5} fill={DOM} weight={800}>
          what dies, and when
        </M>
        <M x="700" y="152" size={11} fill={GREEN} weight={800}>
          even → all bₙ = 0
        </M>
        <M x="700" y="178" size={11} fill={OP} weight={800}>
          odd → all aₙ = 0, and a₀ = 0
        </M>
        <M x="700" y="200" size={9.5} fill={MUTED}>
          neither → all three families survive
        </M>
      </g>
      <g className="catm-slide-in catm-delay-4">
        <Wire d="M490 346 L540 346" stroke={ROSE} width="2.4" marker="url(#catArrRo)" />
        <rect x="548" y="288" width="304" height="116" rx="12" fill={ROSE} fillOpacity="0.09" stroke={ROSE} strokeWidth="2.4" />
        <M x="700" y="314" size={10.5} fill={ROSE} weight={800}>
          the free check
        </M>
        <M x="700" y="344" size={10.5} fill={N}>
          evaluate the series at a jump
        </M>
        <M x="700" y="366" size={10.5} fill={N}>
          it must give the midpoint
        </M>
        <M x="700" y="392" size={9.5} fill={MUTED}>
          if it does not, a coefficient is wrong
        </M>
      </g>
    </Scene>
  )
}

export function ElectricalApplicationsScene() {
  return (
    <Scene caption="Three places a Fourier spectrum decides an engineering answer">
      <rect x="36" y="62" width="272" height="380" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.3" />
      <M x="172" y="88" size={11} fill={FN} weight={800}>
        rectifier ripple
      </M>
      <Wire d="M62 172 L282 172" stroke={MUTED} width="1.3" opacity="0.45" />
      <Curve
        pts={Array.from({ length: 121 }, (_, i) => {
          const t = i / 120
          return [62 + t * 220, 172 - 44 * Math.abs(Math.sin(2 * Math.PI * 2 * t))]
        })}
        stroke={FN}
        width="2.4"
        className="catm-draw"
      />
      <Wire d="M76 320 L278 320" stroke={MUTED} width="1.5" />
      <Columns x={76} y={320} w={202} items={[['dc', 0.64, MUTED], ['2f', 0.42, RED], ['4f', 0.09, FN], ['6f', 0.04, FN]]} max={0.7} labelSize={9} />
      <M x="172" y="368" size={9.5} fill={RED} weight={800}>
        this one sets the filter
      </M>
      <M x="172" y="410" size={9.5} fill={MUTED}>
        size C for the 2f component
      </M>

      <rect x="316" y="62" width="272" height="380" rx="12" fill={WHITE} stroke={OP} strokeWidth="2.3" />
      <M x="452" y="88" size={11} fill={OP} weight={800}>
        power quality
      </M>
      <Wire d="M342 172 L562 172" stroke={MUTED} width="1.3" opacity="0.45" />
      <Curve
        pts={Array.from({ length: 201 }, (_, i) => {
          const t = i / 200
          return [342 + t * 220, 172 - 36 * (Math.sin(2 * Math.PI * t) + 0.22 * Math.sin(10 * Math.PI * t))]
        })}
        stroke={OP}
        width="2.4"
        className="catm-draw catm-delay-2"
      />
      <Wire d="M356 320 L558 320" stroke={MUTED} width="1.5" />
      <Columns x={356} y={320} w={202} items={[['1', 0.66, MUTED], ['3', 0.12, OP], ['5', 0.3, RED], ['7', 0.08, OP]]} max={0.7} labelSize={9} />
      <Wire d="M356 274 L558 274" stroke={RED} width="2" dash="6 5" />
      <M x="452" y="266" size={9} fill={RED} weight={800}>
        standards limit
      </M>
      <M x="452" y="368" size={9.5} fill={RED} weight={800}>
        the 5th exceeds it
      </M>
      <M x="452" y="410" size={9.5} fill={MUTED}>
        a fine, not an inconvenience
      </M>

      <rect x="596" y="62" width="268" height="380" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.3" />
      <M x="730" y="88" size={11} fill={DOM} weight={800}>
        the neutral current
      </M>
      {[0, 1, 2].map((k) => (
        <g key={k} className={`catm-draw catm-delay-${k}`}>
          <Wire d={`M620 ${148 + k * 56} L840 ${148 + k * 56}`} stroke={MUTED} width="1.2" opacity="0.4" />
          <Wave x="620" y={148 + k * 56} w="220" amp="16" cycles={1} phase={(-2 * Math.PI * k) / 3} stroke={DOM} width="1.8" />
          <Wave x="620" y={148 + k * 56} w="220" amp="9" cycles={3} phase={-2 * Math.PI * k} stroke={RED} width="2" />
        </g>
      ))}
      <M x="730" y="336" size={9.5} fill={RED} weight={800}>
        every third harmonic is in phase
      </M>
      <Wire d="M620 388 L840 388" stroke={MUTED} width="1.2" opacity="0.4" />
      <Wave x="620" y="388" w="220" amp="27" cycles={3} stroke={RED} width="3" className="catm-draw catm-delay-3" />
      <M x="730" y="426" size={9.5} fill={RED} weight={800}>
        the neutral can carry more than a phase
      </M>
    </Scene>
  )
}

/* ── Module 3 — Fourier and Z transforms ────────────────────────── */

/** A stem plot: the sampled sequence every Z-transform picture starts from. */
function Stems({ x, y, w, values = [], tone = FN, className = '', dotR = 5, scale = 1, labels }) {
  const [X, Y, W] = [n(x), n(y), n(w)]
  const dx = values.length > 1 ? W / (values.length - 1) : W
  return (
    <g>
      {values.map((v, i) => (
        <g key={i} className={className ? `${className} catm-delay-${i % 5}` : ''}>
          <Wire d={`M${(X + i * dx).toFixed(1)} ${Y} L${(X + i * dx).toFixed(1)} ${(Y - v * scale).toFixed(1)}`} stroke={tone} width="2.4" />
          <Dot cx={(X + i * dx).toFixed(1)} cy={(Y - v * scale).toFixed(1)} r={dotR} fill={tone} />
          {labels ? (
            <M x={(X + i * dx).toFixed(1)} y={Y + 18} size={9} fill={MUTED}>
              {labels[i]}
            </M>
          ) : null}
        </g>
      ))}
    </g>
  )
}

export function SeriesToIntegralScene() {
  const cases = [
    ['period T', 3, 5],
    ['period 2T', 5, 9],
    ['period 4T', 9, 17],
    ['period → ∞', 0, 0],
  ]
  return (
    <Scene caption="Stretch the period and the spectral lines crowd together until they become a curve">
      {cases.map(([tag, reps, lines], i) => {
        const x = 40 + i * 212
        return (
          <g key={tag} className={`catm-cell-in catm-delay-${i}`}>
            <rect x={x} y="66" width="194" height="330" rx="12" fill={WHITE} stroke={i === 3 ? GREEN : FN} strokeWidth="2.3" />
            <M x={x + 97} y="92" size={10.5} fill={i === 3 ? GREEN : FN} weight={800}>
              {tag}
            </M>
            <Wire d={`M${x + 18} 176 L${x + 176} 176`} stroke={MUTED} width="1.2" opacity="0.45" />
            {(reps === 0 ? [0] : Array.from({ length: reps }, (_, k) => k - (reps - 1) / 2)).map((k) => {
              // Fewer repetitions means they sit further apart — that is the
              // whole point of the picture.
              const gap = reps === 3 ? 44 : reps === 5 ? 30 : 18
              const cxk = x + 97 + k * gap
              return (
                <Wire
                  key={k}
                  d={`M${(cxk - 8).toFixed(1)} 176 L${(cxk - 8).toFixed(1)} 132 L${(cxk + 8).toFixed(1)} 132 L${(cxk + 8).toFixed(1)} 176`}
                  stroke={FN}
                  width="2.2"
                />
              )
            })}
            <M x={x + 97} y="200" size={9} fill={MUTED}>
              time
            </M>
            <Wire d={`M${x + 18} 350 L${x + 176} 350`} stroke={MUTED} width="1.5" />
            <Curve
              pts={Array.from({ length: 61 }, (_, k) => {
                const t = -1 + (2 * k) / 60
                const sinc = t === 0 ? 1 : Math.sin(Math.PI * 3 * t) / (Math.PI * 3 * t)
                return [x + 97 + t * 78, 350 - 100 * Math.abs(sinc)]
              })}
              stroke={i === 3 ? GREEN : MUTED}
              width={i === 3 ? 3 : 1.8}
              opacity={i === 3 ? 1 : 0.4}
              dash={i === 3 ? undefined : '4 4'}
            />
            {lines > 0
              ? Array.from({ length: lines }, (_, k) => {
                  const t = -1 + (2 * k) / (lines - 1)
                  const sinc = t === 0 ? 1 : Math.sin(Math.PI * 3 * t) / (Math.PI * 3 * t)
                  return (
                    <Wire
                      key={k}
                      d={`M${(x + 97 + t * 78).toFixed(1)} 350 L${(x + 97 + t * 78).toFixed(1)} ${(350 - 100 * Math.abs(sinc)).toFixed(1)}`}
                      stroke={FN}
                      width="2.2"
                    />
                  )
                })
              : null}
            <M x={x + 97} y="374" size={9} fill={MUTED}>
              frequency
            </M>
            {i === 3 ? (
              <M x={x + 97} y="392" size={9.5} fill={GREEN} weight={800}>
                spectral density
              </M>
            ) : null}
          </g>
        )
      })}
      <g className="catm-emerge">
        <rect x="140" y="414" width="620" height="46" rx="11" fill={SKY} stroke={GOLD} strokeWidth="2.4" />
        <M x="450" y="443" size={12.5} fill={GOLD} weight={800}>
          Σ over discrete n  →  ∫ over continuous ω
        </M>
      </g>
    </Scene>
  )
}

export function IntegralTheoremScene() {
  const rows = [
    ['e^(−a|t|)', true, 'decays'],
    ['a rectangular pulse', true, 'zero outside'],
    ['a Gaussian', true, 'decays fast'],
    ['a constant', false, 'never decays'],
    ['sin(ωt)', false, 'never decays'],
    ['the unit step', false, 'never decays'],
  ]
  return (
    <Scene caption="Absolute integrability is the price of admission — without it the integral simply does not exist">
      <rect x="40" y="62" width="420" height="28" rx="8" fill={N} />
      <M x="160" y="82" size={10.5} fill={WHITE} weight={800}>
        function
      </M>
      <M x="330" y="82" size={10.5} fill={WHITE} weight={800}>
        ∫|f| dt finite?
      </M>
      {rows.map(([fn, ok, why], i) => (
        <g key={fn} className={`catm-cell-in catm-delay-${i % 5}`}>
          <rect x="40" y={96 + i * 46} width="420" height="40" rx="8" fill={WHITE} stroke={ok ? GREEN : RED} strokeWidth="2" />
          <M x="160" y={121 + i * 46} size={11} fill={N}>
            {fn}
          </M>
          <M x="300" y={121 + i * 46} size={14} fill={ok ? GREEN : RED} weight={800}>
            {ok ? '✓' : '✗'}
          </M>
          <M x="400" y={121 + i * 46} size={9.5} fill={MUTED}>
            {why}
          </M>
        </g>
      ))}

      <Card
        x="490"
        y="62"
        w="362"
        h="176"
        title="the theorem, with its hypotheses"
        accent={FN}
        lines={['f is piecewise smooth on every', 'finite interval', '', 'and ∫|f| dt over all t is finite', '', 'then the integral representation holds']}
        linesY={56}
        lineH={21}
        className="catm-slide-in catm-delay-3"
      />

      <Wire d="M520 336 L840 336" stroke={MUTED} width="1.4" opacity="0.5" />
      <Wire d="M520 296 L680 296" stroke={FN} width="3" className="catm-draw catm-delay-3" />
      <Wire d="M680 376 L840 376" stroke={FN} width="3" className="catm-draw catm-delay-3" />
      <Dot cx="680" cy="296" r="7" fill={DOM} />
      <Dot cx="680" cy="376" r="7" fill={DOM} />
      <g className="catm-emerge">
        <Dot cx="680" cy="336" r="9" fill={GREEN} />
        <M x="700" y="332" size={10.5} fill={GREEN} anchor="start" weight={800}>
          the midpoint again
        </M>
      </g>
      <M x="680" y="420" size={10} fill={MUTED} weight={800}>
        the integral behaves at a jump exactly as the series did
      </M>
    </Scene>
  )
}

export function TransformPairSymmetryScene() {
  return (
    <Scene caption="Two integrals that differ in one sign and one constant — and textbooks disagree about the constant">
      <g className="catm-cell-in">
        <rect x="40" y="88" width="356" height="120" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.6" />
        <M x="218" y="114" size={10.5} fill={FN} weight={800}>
          forward
        </M>
        <M x="218" y="158" size={15} fill={N} weight={800}>
          F(ω) = ∫ f(t)·e^(−iωt) dt
        </M>
        <g className="catm-pulse">
          <circle cx="278" cy="152" r="15" fill="none" stroke={OP} strokeWidth="2.6" />
        </g>
      </g>
      <g className="catm-flow-arrow">
        <Wire d="M414 128 L490 128" stroke={MUTED} width="3" marker="url(#catArrM)" />
        <Wire d="M490 168 L414 168" stroke={MUTED} width="3" marker="url(#catArrM)" />
      </g>
      <g className="catm-cell-in catm-delay-2">
        <rect x="504" y="88" width="356" height="120" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.6" />
        <M x="682" y="114" size={10.5} fill={DOM} weight={800}>
          inverse
        </M>
        <M x="682" y="158" size={14} fill={N} weight={800}>
          f(t) = (1/2π)∫ F(ω)·e^(+iωt) dω
        </M>
        <g className="catm-pulse">
          <circle cx="758" cy="152" r="15" fill="none" stroke={OP} strokeWidth="2.6" />
          <circle cx="610" cy="154" r="34" fill="none" stroke={GOLD} strokeWidth="2.6" strokeDasharray="5 4" />
        </g>
      </g>
      <M x="450" y="232" size={10.5} fill={OP} weight={800}>
        the sign of the exponent is the only structural difference
      </M>

      <rect x="120" y="272" width="660" height="30" rx="8" fill={N} />
      {['convention', 'forward', 'inverse'].map((h, i) => (
        <M key={h} x={230 + i * 220} y="293" size={10.5} fill={WHITE} weight={800}>
          {h}
        </M>
      ))}
      {[
        ['engineering', '1', '1/2π'],
        ['symmetric', '1/√(2π)', '1/√(2π)'],
        ['some texts', '1/2π', '1'],
      ].map(([name, f, inv], i) => (
        <g key={name} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="120" y={308 + i * 44} width="660" height="38" rx="8" fill={WHITE} stroke={GOLD} strokeWidth="2" />
          <M x="230" y={332 + i * 44} size={11} fill={N}>
            {name}
          </M>
          <M x="450" y={332 + i * 44} size={11.5} fill={GOLD} weight={800}>
            {f}
          </M>
          <M x="670" y={332 + i * 44} size={11.5} fill={GOLD} weight={800}>
            {inv}
          </M>
        </g>
      ))}
      <g className="catm-pulse">
        <M x="450" y="464" size={11} fill={RED} weight={800}>
          state which convention you are using, or the marks are lost
        </M>
      </g>
    </Scene>
  )
}

export function SineCosineTransformScene() {
  return (
    <Scene caption="Only defined on the half line, so you choose the extension — and the extension chooses the transform">
      <rect x="40" y="62" width="380" height="140" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <M x="230" y="86" size={10.5} fill={GREEN} weight={800}>
        even extension → cosine transform
      </M>
      <Wire d="M70 168 L390 168" stroke={MUTED} width="1.3" opacity="0.5" />
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const t = i / 40
          return [230 + t * 150, 168 - 54 * Math.exp(-2.4 * t)]
        })}
        stroke={GREEN}
        width="3"
        className="catm-draw"
      />
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const t = i / 40
          return [230 - t * 150, 168 - 54 * Math.exp(-2.4 * t)]
        })}
        stroke={GREEN}
        width="2.6"
        dash="6 5"
        className="catm-draw catm-delay-2"
      />

      <rect x="40" y="220" width="380" height="140" rx="12" fill={WHITE} stroke={OP} strokeWidth="2.3" />
      <M x="230" y="244" size={10.5} fill={OP} weight={800}>
        odd extension → sine transform
      </M>
      <Wire d="M70 322 L390 322" stroke={MUTED} width="1.3" opacity="0.5" />
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const t = i / 40
          return [230 + t * 150, 322 - 54 * Math.exp(-2.4 * t)]
        })}
        stroke={OP}
        width="3"
        className="catm-draw catm-delay-1"
      />
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const t = i / 40
          return [230 - t * 150, 322 + 54 * Math.exp(-2.4 * t)]
        })}
        stroke={OP}
        width="2.6"
        dash="6 5"
        className="catm-draw catm-delay-3"
      />

      {[
        ['Fc(ω) = ∫₀^∞ f(t)·cos(ωt) dt', 'a real integral, half line only', GREEN, 104],
        ['Fs(ω) = ∫₀^∞ f(t)·sin(ωt) dt', 'a real integral, half line only', OP, 262],
      ].map(([f, note, tone, y]) => (
        <g key={f} className="catm-cell-in catm-delay-2">
          <rect x="460" y={y} width="392" height="76" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.4" />
          <M x="656" y={y + 34} size={13.5} fill={N} weight={800}>
            {f}
          </M>
          <M x="656" y={y + 58} size={9.5} fill={MUTED}>
            {note}
          </M>
        </g>
      ))}

      <g className="catm-slide-in catm-delay-4">
        <rect x="460" y="366" width="392" height="88" rx="12" fill={SKY} stroke={DOM} strokeWidth="2.3" />
        <M x="656" y="392" size={10.5} fill={DOM} weight={800}>
          the boundary condition decides
        </M>
        <M x="560" y="420" size={10} fill={GREEN} weight={800}>
          zero slope → cosine
        </M>
        <M x="760" y="420" size={10} fill={OP} weight={800}>
          zero value → sine
        </M>
        <M x="656" y="442" size={9} fill={MUTED}>
          the same rule as the half-range series in Module 2
        </M>
      </g>
      <M x="230" y="392" size={10} fill={MUTED} weight={800}>
        the given data occupies only t &gt; 0 in both cases
      </M>
    </Scene>
  )
}

export function TransformPropertiesScene() {
  const rows = [
    ['linearity', 'a·f + b·g', 'a·F + b·G', FN],
    ['time shift', 'f(t − t₀)', 'e^(−iωt₀)·F(ω) — phase only', DOM],
    ['scaling', 'f(at)', '(1/|a|)·F(ω/a) — narrower ⇒ wider', OP],
    ['modulation', 'f(t)·e^(iω₀t)', 'F(ω − ω₀) — the spectrum slides', GOLD],
    ['differentiation', 'df/dt', 'iω·F(ω) — highs emphasised', GREEN],
  ]
  return (
    <Scene caption="Five rules, and four of them are the reason anyone uses the transform at all">
      {rows.map(([name, time, freq, tone], i) => (
        <g key={name} className={`catm-cell-in catm-delay-${i % 5}`}>
          <rect x="40" y={66 + i * 78} width="812" height="66" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <M x="110" y={104 + i * 78} size={11} fill={tone} weight={800}>
            {name}
          </M>
          <rect x="184" y={78 + i * 78} width="150" height="42" rx="9" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth="1.8" />
          <M x="259" y={104 + i * 78} size={11.5} fill={N}>
            {time}
          </M>
          <Wire d={`M342 ${99 + i * 78} L370 ${99 + i * 78}`} stroke={MUTED} width="2.2" marker="url(#catArrM)" />
          <M x="356" y={86 + i * 78} size={8.5} fill={MUTED} weight={800}>
            ℱ
          </M>
          <rect x="378" y={78 + i * 78} width="300" height="42" rx="9" fill={WHITE} stroke={tone} strokeWidth="1.8" />
          <M x="528" y={104 + i * 78} size={11} fill={N}>
            {freq}
          </M>
          <Wire d={`M700 ${110 + i * 78} L836 ${110 + i * 78}`} stroke={MUTED} width="1.2" opacity="0.4" />
          {i === 2 ? (
            <g>
              <Curve
                pts={Array.from({ length: 41 }, (_, k) => {
                  const t = -1 + (2 * k) / 40
                  return [768 + t * 62, 110 + i * 78 - 28 * Math.exp(-6 * t * t)]
                })}
                stroke={MUTED}
                width="1.8"
                opacity="0.5"
              />
              <Curve
                pts={Array.from({ length: 41 }, (_, k) => {
                  const t = -1 + (2 * k) / 40
                  return [768 + t * 62, 110 + i * 78 - 28 * Math.exp(-1.5 * t * t)]
                })}
                stroke={tone}
                width="2.4"
              />
            </g>
          ) : (
            <Curve
              pts={Array.from({ length: 41 }, (_, k) => {
                const t = -1 + (2 * k) / 40
                const shift = i === 3 ? 0.4 : 0
                const w = i === 4 ? Math.abs(t) * 28 : 28
                return [768 + t * 62, 110 + i * 78 - w * Math.exp(-5 * (t - shift) * (t - shift))]
              })}
              stroke={tone}
              width="2.4"
            />
          )}
        </g>
      ))}
      <M x="768" y="464" size={9.5} fill={MUTED} weight={800}>
        what happens to the spectrum
      </M>
    </Scene>
  )
}

export function StandardPairsScene() {
  const pairs = [
    ['rectangular pulse', 'sinc', 'rect', 'sinc', FN],
    ['two-sided e^(−a|t|)', 'Lorentzian 2a/(a²+ω²)', 'exp', 'lorentz', DOM],
    ['Gaussian', 'Gaussian', 'gauss', 'gauss', GREEN],
    ['impulse δ(t)', 'the constant 1', 'delta', 'flat', OP],
  ]
  const draw = (kind, cx, cy, tone) => {
    if (kind === 'rect') {
      return <Wire d={`M${cx - 70} ${cy} L${cx - 26} ${cy} L${cx - 26} ${cy - 40} L${cx + 26} ${cy - 40} L${cx + 26} ${cy} L${cx + 70} ${cy}`} stroke={tone} width="2.6" />
    }
    if (kind === 'sinc') {
      return (
        <Curve
          pts={Array.from({ length: 81 }, (_, k) => {
            const t = -1 + (2 * k) / 80
            const u = t * 9
            return [cx + t * 70, cy - 40 * (u === 0 ? 1 : Math.sin(u) / u)]
          })}
          stroke={tone}
          width="2.4"
        />
      )
    }
    if (kind === 'exp') {
      return (
        <Curve
          pts={Array.from({ length: 81 }, (_, k) => {
            const t = -1 + (2 * k) / 80
            return [cx + t * 70, cy - 40 * Math.exp(-3 * Math.abs(t))]
          })}
          stroke={tone}
          width="2.4"
        />
      )
    }
    if (kind === 'lorentz') {
      return (
        <Curve
          pts={Array.from({ length: 81 }, (_, k) => {
            const t = -1 + (2 * k) / 80
            return [cx + t * 70, cy - 40 / (1 + 12 * t * t)]
          })}
          stroke={tone}
          width="2.4"
        />
      )
    }
    if (kind === 'gauss') {
      return (
        <Curve
          pts={Array.from({ length: 81 }, (_, k) => {
            const t = -1 + (2 * k) / 80
            return [cx + t * 70, cy - 40 * Math.exp(-6 * t * t)]
          })}
          stroke={tone}
          width="2.4"
        />
      )
    }
    if (kind === 'delta') {
      return <Wire d={`M${cx} ${cy} L${cx} ${cy - 44}`} stroke={tone} width="3.4" marker={`url(#${markerFor(tone)})`} />
    }
    return <Wire d={`M${cx - 70} ${cy - 26} L${cx + 70} ${cy - 26}`} stroke={tone} width="2.6" />
  }
  return (
    <Scene caption="Four pairs worth memorising — and one of them transforms into its own shape">
      {pairs.map(([left, right, lk, rk, tone], i) => (
        <g key={left} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="40" y={62 + i * 100} width="612" height="88" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.2" />
          <Wire d={`M100 ${128 + i * 100} L240 ${128 + i * 100}`} stroke={MUTED} width="1.2" opacity="0.4" />
          {draw(lk, 170, 128 + i * 100, tone)}
          <M x="170" y={148 + i * 100} size={9} fill={MUTED}>
            {left}
          </M>
          <Wire d={`M262 ${118 + i * 100} L318 ${118 + i * 100}`} stroke={OP} width="2.6" marker="url(#catArrO)" className="catm-flow-arrow" />
          <M x="290" y={106 + i * 100} size={9} fill={OP} weight={800}>
            ℱ
          </M>
          <Wire d={`M400 ${128 + i * 100} L540 ${128 + i * 100}`} stroke={MUTED} width="1.2" opacity="0.4" />
          {draw(rk, 470, 128 + i * 100, tone)}
          <M x="470" y={148 + i * 100} size={9} fill={MUTED}>
            {right}
          </M>
          <M x="596" y={132 + i * 100} size={10} fill={tone} weight={800}>
            {['narrow ↔ wide', 'decay ↔ tails', 'self-dual', 'point ↔ all'][i]}
          </M>
        </g>
      ))}
      <g className="catm-pulse">
        <rect x="676" y="248" width="180" height="102" rx="12" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="2.6" />
        <M x="766" y="278" size={10.5} fill={GREEN} weight={800}>
          the Gaussian
        </M>
        <M x="766" y="304" size={10} fill={N}>
          the only common function
        </M>
        <M x="766" y="324" size={10} fill={N}>
          that keeps its own shape
        </M>
      </g>
      <M x="450" y="472" size={10} fill={MUTED} weight={800}>
        the narrower the pulse, the wider the spectrum — always
      </M>
    </Scene>
  )
}

export function ParsevalScene() {
  return (
    <Scene caption="The same energy, counted two ways — which is what a spectrum analyser is actually showing you">
      <Wire d="M450 92 L450 130" stroke={N} width="3" />
      <Dot cx="450" cy="88" r="8" fill={N} />
      <Wire d="M170 130 L730 130" stroke={N} width="3.4" className="catm-flip" />
      <Wire d="M170 130 L170 166 M730 130 L730 166" stroke={N} width="2.4" />

      <rect x="60" y="170" width="300" height="180" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.4" />
      <M x="210" y="196" size={10.5} fill={FN} weight={800}>
        |f(t)|²
      </M>
      <Wire d="M92 316 L328 316" stroke={MUTED} width="1.4" />
      <path
        d={(() => {
          const pts = []
          for (let i = 0; i <= 60; i += 1) {
            const t = -1 + (2 * i) / 60
            pts.push(`${i === 0 ? 'M' : 'L'}${(210 + t * 112).toFixed(1)} ${(316 - 88 * Math.exp(-4 * t * t)).toFixed(1)}`)
          }
          return `${pts.join(' ')} L322 316 L98 316 Z`
        })()}
        fill={FN}
        fillOpacity="0.22"
        stroke={FN}
        strokeWidth="2.6"
        className="catm-draw"
      />
      <M x="210" y="338" size={10} fill={MUTED}>
        area = total energy
      </M>

      <rect x="540" y="170" width="300" height="180" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.4" />
      <M x="690" y="196" size={10.5} fill={DOM} weight={800}>
        |F(ω)|²
      </M>
      <Wire d="M572 316 L808 316" stroke={MUTED} width="1.4" />
      <path
        d={(() => {
          const pts = []
          for (let i = 0; i <= 60; i += 1) {
            const t = -1 + (2 * i) / 60
            pts.push(`${i === 0 ? 'M' : 'L'}${(690 + t * 112).toFixed(1)} ${(316 - 60 * Math.exp(-1.6 * t * t)).toFixed(1)}`)
          }
          return `${pts.join(' ')} L802 316 L578 316 Z`
        })()}
        fill={DOM}
        fillOpacity="0.22"
        stroke={DOM}
        strokeWidth="2.6"
        className="catm-draw catm-delay-2"
      />
      <M x="690" y="338" size={10} fill={MUTED}>
        area = the same energy
      </M>

      <g className="catm-emerge">
        <rect x="230" y="370" width="440" height="52" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.6" />
        <M x="450" y="402" size={15} fill={N} weight={800}>
          ∫|f(t)|² dt = (1/2π)∫|F(ω)|² dω
        </M>
        <g className="catm-pulse">
          <circle cx="536" cy="396" r="22" fill="none" stroke={GOLD} strokeWidth="2.4" strokeDasharray="5 4" />
        </g>
      </g>
      <M x="450" y="446" size={10} fill={MUTED} weight={800}>
        the constant depends on your convention — the equality does not
      </M>
    </Scene>
  )
}

export function TransformSolveInvertScene() {
  return (
    <Scene caption="Never solve the differential equation — go round it">
      <Block x="60" y="86" w="200" h="72" label="differential equation" stroke={FN} className="catm-cell-in" />
      <Block x="640" y="86" w="200" h="72" label="the solution" stroke={GREEN} className="catm-cell-in catm-delay-4" />
      <Wire d="M260 122 L640 122" stroke={MUTED} width="2.6" marker="url(#catArrM)" />
      <g className="catm-pulse">
        <rect x="380" y="98" width="160" height="48" rx="10" fill={RED} fillOpacity="0.14" stroke={RED} strokeWidth="3" />
        <M x="460" y="128" size={12} fill={RED} weight={800}>
          hard
        </M>
      </g>

      <Wire d="M160 158 L160 232" stroke={OP} width="3" marker="url(#catArrO)" className="catm-flow-arrow" />
      <M x="146" y="200" size={10.5} fill={OP} anchor="end" weight={800}>
        ℱ
      </M>
      <Block x="60" y="236" w="200" h="72" label="algebraic equation" stroke={OP} className="catm-cell-in catm-delay-1" />
      <Wire d="M260 272 L640 272" stroke={GREEN} width="3" marker="url(#catArrGr)" className="catm-flow-arrow catm-delay-2" />
      <g className="catm-emerge">
        <rect x="390" y="248" width="140" height="48" rx="10" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.6" />
        <M x="460" y="278" size={11.5} fill={GREEN} weight={800}>
          just divide
        </M>
      </g>
      <Block x="640" y="236" w="200" h="72" label="X(ω) found" stroke={GOLD} className="catm-cell-in catm-delay-3" />
      <Wire d="M740 236 L740 162" stroke={GOLD} width="3" marker="url(#catArrG)" className="catm-flow-arrow catm-delay-3" />
      <M x="754" y="200" size={10.5} fill={GOLD} anchor="start" weight={800}>
        ℱ⁻¹
      </M>

      <g className="catm-slide-in catm-delay-4">
        <rect x="60" y="342" width="780" height="112" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.3" />
        <M x="450" y="368" size={10.5} fill={DOM} weight={800}>
          and the same trick turns convolution into multiplication
        </M>
        <M x="250" y="406" size={13} fill={N} weight={800}>
          (f ∗ g)(t)
        </M>
        <Wire d="M330 400 L420 400" stroke={DOM} width="2.6" marker="url(#catArrD)" className="catm-flow-arrow" />
        <M x="375" y="388" size={9} fill={DOM} weight={800}>
          ℱ
        </M>
        <M x="560" y="406" size={13} fill={N} weight={800}>
          F(ω)·G(ω)
        </M>
        <M x="450" y="436" size={9.5} fill={MUTED}>
          an integral becomes a product — that is the whole value of the frequency domain
        </M>
      </g>
    </Scene>
  )
}

export function ZTransformDefinitionScene() {
  return (
    <Scene caption="Sample the waveform, then sum the samples against powers of z⁻¹ — that is all it is">
      <Wire d="M60 200 L400 200" stroke={MUTED} width="1.3" opacity="0.5" />
      <Curve
        pts={Array.from({ length: 121 }, (_, i) => {
          const t = i / 120
          return [60 + t * 330, 200 - 64 * Math.exp(-1.6 * t) * Math.cos(2 * Math.PI * 1.2 * t)]
        })}
        stroke={MUTED}
        width="2.2"
        className="catm-draw"
      />
      <Stems
        x="60"
        y="200"
        w="330"
        values={[1, 0.34, -0.42, -0.3, 0.08, 0.2, 0.06]}
        scale={64}
        tone={FN}
        className="catm-cell-in"
        labels={['x0', 'x1', 'x2', 'x3', 'x4', 'x5', 'x6']}
      />
      <M x="225" y="248" size={10} fill={MUTED} weight={800}>
        the samples are the whole input from here on
      </M>

      <g className="catm-cell-in catm-delay-2">
        <rect x="440" y="80" width="412" height="96" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.6" />
        <M x="646" y="126" size={15} fill={N} weight={800}>
          X(z) = Σₙ₌₀^∞ xₙ·z⁻ⁿ
        </M>
        <M x="646" y="154" size={11} fill={MUTED}>
          = x₀ + x₁z⁻¹ + x₂z⁻² + x₃z⁻³ + …
        </M>
      </g>
      {[0, 1, 2].map((k) => (
        <Wire
          key={k}
          d={`M${540 + k * 62} 176 L${115 + k * 55} 192`}
          stroke={FN}
          width="1.5"
          dash="4 4"
          opacity="0.6"
          className={`catm-draw catm-delay-${k}`}
        />
      ))}

      <UnitCircle cx="560" cy="326" r="76" roc="outside" tone={DOM} className="catm-draw catm-delay-3" />
      <Plane cx="560" cy="326" r="100" xLabel="Re z" yLabel="Im z" tone={MUTED} />
      <M x="560" y="446" size={10} fill={GREEN} weight={800}>
        region of convergence
      </M>

      <g className="catm-slide-in catm-delay-4">
        <rect x="690" y="264" width="166" height="150" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="773" y="292" size={10.5} fill={GOLD} weight={800}>
          Laplace
        </M>
        <M x="773" y="314" size={9.5} fill={N}>
          continuous signals
        </M>
        <M x="773" y="332" size={9.5} fill={N}>
          differential equations
        </M>
        <Wire d="M710 348 L836 348" stroke={GOLD} width="1.6" />
        <M x="773" y="372" size={10.5} fill={GOLD} weight={800}>
          Z
        </M>
        <M x="773" y="392" size={9.5} fill={N}>
          sampled sequences
        </M>
        <M x="773" y="410" size={9.5} fill={N}>
          difference equations
        </M>
      </g>
    </Scene>
  )
}

export function ZTransformTableScene() {
  const rows = [
    ['δₙ', [1, 0, 0, 0, 0], '1', 'all z', false],
    ['1 (unit step)', [1, 1, 1, 1, 1], 'z/(z−1)', '|z| > 1', false],
    ['aⁿ', [1, 0.66, 0.44, 0.29, 0.19], 'z/(z−a)', '|z| > |a|', true],
    ['n', [0, 0.25, 0.5, 0.75, 1], 'z/(z−1)²', '|z| > 1', false],
    ['sin(nω)', [0, 0.85, 0.9, 0.1, -0.8], 'z·sinω/(z²−2z cosω+1)', '|z| > 1', false],
  ]
  return (
    <Scene caption="Five pairs, and the geometric one is the one you will use in nine questions out of ten">
      <rect x="40" y="60" width="812" height="28" rx="8" fill={N} />
      {['sequence', 'X(z)', 'ROC'].map((h, i) => (
        <M key={h} x={[180, 500, 740][i]} y="80" size={10.5} fill={WHITE} weight={800}>
          {h}
        </M>
      ))}
      {rows.map(([name, vals, xz, roc, star], i) => (
        <g key={name} className={`catm-cell-in catm-delay-${i % 5}`}>
          <rect
            x="40"
            y={96 + i * 70}
            width="812"
            height="62"
            rx="10"
            fill={star ? GREEN : WHITE}
            fillOpacity={star ? 0.08 : 1}
            stroke={star ? GREEN : MUTED}
            strokeWidth={star ? 3 : 1.8}
          />
          <M x="100" y={132 + i * 70} size={11} fill={N} anchor="start" weight={800}>
            {name}
          </M>
          <Wire d={`M232 ${146 + i * 70} L344 ${146 + i * 70}`} stroke={MUTED} width="1.2" opacity="0.5" />
          <Stems x="238" y={146 + i * 70} w="100" values={vals} scale={34} tone={star ? GREEN : FN} dotR={4} />
          <M x="500" y={132 + i * 70} size={11.5} fill={N}>
            {xz}
          </M>
          <M x="740" y={132 + i * 70} size={11} fill={DOM} weight={800}>
            {roc}
          </M>
          <circle cx="812" cy={127 + i * 70} r="18" fill="none" stroke={DOM} strokeWidth="1.8" strokeDasharray="4 4" />
          <PoleMark cx="806" cy={127 + i * 70} kind="pole" tone={OP} r="5" />
        </g>
      ))}
      <g className="catm-emerge">
        <rect x="200" y="452" width="500" height="26" rx="8" fill={MUTED} fillOpacity="0.1" />
        <M x="450" y="470" size={9.5} fill={MUTED}>
          prescribed to TB1 (Grewal), not supplied — no page numbers claimed
        </M>
      </g>
    </Scene>
  )
}

export function DampingShiftingScene() {
  return (
    <Scene caption="Damping pulls the poles inward; delay multiplies by z⁻ᵏ — and advancing costs you correction terms">
      <M x="80" y="76" size={11.5} fill={FN} anchor="start" weight={800}>
        damping: xₙ → aⁿ·xₙ
      </M>
      <Wire d="M70 176 L330 176" stroke={MUTED} width="1.3" opacity="0.5" />
      <Stems x="80" y="176" w="240" values={[1, 1, 1, 1, 1, 1, 1]} scale={54} tone={MUTED} dotR={4} />
      <Stems
        x="80"
        y="176"
        w="240"
        values={[1, 0.7, 0.49, 0.34, 0.24, 0.17, 0.12]}
        scale={54}
        tone={FN}
        className="catm-cell-in"
      />
      <M x="200" y="206" size={10} fill={FN} weight={800}>
        a = 0.7
      </M>

      <UnitCircle cx="480" cy="152" r="62" roc="outside" tone={DOM} label="" />
      <Plane cx="480" cy="152" r="82" xLabel="" yLabel="" tone={MUTED} />
      <PoleMark cx="542" cy="152" kind="pole" tone={MUTED} r="8" />
      <g className="catm-shift" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <PoleMark cx="524" cy="152" kind="pole" tone={OP} r="8" />
      </g>
      <M x="480" y="248" size={10} fill={OP} weight={800}>
        poles slide in by the factor a
      </M>
      <g className="catm-pop">
        <rect x="608" y="112" width="244" height="80" rx="12" fill={FN} fillOpacity="0.1" stroke={FN} strokeWidth="2.6" />
        <M x="730" y="148" size={13} fill={N} weight={800}>
          Z{'{aⁿxₙ}'} = X(z/a)
        </M>
        <M x="730" y="172" size={9.5} fill={MUTED}>
          the whole plane rescales
        </M>
      </g>

      <Wire d="M40 274 L860 274" stroke={MUTED} width="1.5" dash="6 6" />

      <M x="80" y="306" size={11.5} fill={OP} anchor="start" weight={800}>
        shifting: xₙ → xₙ₋₂
      </M>
      <Wire d="M70 394 L390 394" stroke={MUTED} width="1.3" opacity="0.5" />
      <Stems x="80" y="394" w="240" values={[1, 0.7, 0.49, 0.34, 0.24, 0.17, 0.12]} scale={48} tone={MUTED} dotR={4} />
      <g className="catm-shift" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <Stems x="160" y="394" w="240" values={[1, 0.7, 0.49, 0.34, 0.24, 0.17, 0.12]} scale={48} tone={OP} />
      </g>
      <g className="catm-emerge">
        <path d="M80 428 L80 438 M80 433 L160 433 M160 428 L160 438" stroke={ROSE} strokeWidth="2.2" fill="none" />
        <M x="120" y="456" size={10} fill={ROSE} weight={800}>
          2 samples
        </M>
      </g>
      <g className="catm-pop catm-delay-2">
        <rect x="440" y="316" width="246" height="72" rx="12" fill={OP} fillOpacity="0.1" stroke={OP} strokeWidth="2.6" />
        <M x="563" y="360" size={14} fill={N} weight={800}>
          Z{'{xₙ₋₂}'} = z⁻²·X(z)
        </M>
      </g>
      <g className="catm-pulse">
        <rect x="440" y="400" width="412" height="62" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.4" />
        <M x="646" y="424" size={10.5} fill={RED} weight={800}>
          advancing is not symmetric
        </M>
        <M x="646" y="446" size={10} fill={MUTED}>
          Z{'{xₙ₊₂}'} = z²X(z) − z²x₀ − z·x₁ — the samples pushed off the start
        </M>
      </g>
      <g className="catm-slide-in catm-delay-3">
        <rect x="700" y="316" width="152" height="72" rx="12" fill={WHITE} stroke={GOLD} strokeWidth="2.3" />
        <M x="776" y="344" size={10} fill={GOLD} weight={800}>
          delay is free
        </M>
        <M x="776" y="368" size={9.5} fill={MUTED}>
          advance is not
        </M>
      </g>
    </Scene>
  )
}

export function ZLimitTheoremsScene() {
  return (
    <Scene caption="Two limits, two free checks — but the final value one has a condition you must verify">
      <UnitCircle cx="200" cy="220" r="96" roc="inside" tone={DOM} />
      <Plane cx="200" cy="220" r="126" xLabel="Re z" yLabel="Im z" tone={MUTED} />
      <g className="catm-pop">
        <PoleMark cx="152" cy="192" kind="pole" tone={GREEN} r="9" />
        <PoleMark cx="238" cy="262" kind="pole" tone={GREEN} r="9" />
      </g>
      <g className="catm-pop catm-delay-2">
        <PoleMark cx="308" cy="160" kind="pole" tone={RED} r="9" />
      </g>
      <M x="200" y="368" size={10} fill={GREEN} weight={800}>
        inside: final value theorem valid
      </M>
      <M x="200" y="390" size={10} fill={RED} weight={800}>
        outside or on the circle: it is not
      </M>

      {[
        ['initial value', 'x₀ = lim_{z→∞} X(z)', GREEN, 96],
        ['final value', 'x∞ = lim_{z→1} (z−1)X(z)', DOM, 212],
      ].map(([tag, expr, tone, y]) => (
        <g key={tag} className="catm-cell-in catm-delay-1">
          <rect x="380" y={y} width="290" height="86" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.5" />
          <M x="525" y={y + 26} size={10.5} fill={tone} weight={800}>
            {tag}
          </M>
          <M x="525" y={y + 58} size={12.5} fill={N} weight={800}>
            {expr}
          </M>
        </g>
      ))}

      <Wire d="M700 300 L860 300" stroke={MUTED} width="1.3" opacity="0.5" />
      <Stems x="708" y="300" w="140" values={[1, 0.74, 0.58, 0.5, 0.46, 0.44, 0.43]} scale={90} tone={FN} className="catm-cell-in catm-delay-2" />
      <g className="catm-pop catm-delay-3">
        <circle cx="708" cy="210" r="14" fill="none" stroke={GREEN} strokeWidth="2.6" />
        <Wire d="M694 200 L676 154" stroke={GREEN} width="1.6" dash="4 4" />
      </g>
      <Wire d="M700 262 L860 262" stroke={DOM} width="2" dash="6 5" className="catm-sweep-x" />
      <Wire d="M700 262 L676 276" stroke={DOM} width="1.6" dash="4 4" />
      <M x="780" y="330" size={10} fill={MUTED}>
        the sequence, for comparison
      </M>

      <g className="catm-pulse">
        <rect x="380" y="360" width="470" height="62" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.4" />
        <M x="615" y="384" size={10.5} fill={RED} weight={800}>
          check the poles before you use the final value theorem
        </M>
        <M x="615" y="406" size={10} fill={MUTED}>
          a pole on or outside the unit circle and the limit is meaningless
        </M>
      </g>
    </Scene>
  )
}

export function InverseZMethodsScene() {
  return (
    <Scene caption="Partial fractions for a closed form; long division when you only need the first few terms">
      <rect x="36" y="62" width="400" height="330" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.3" />
      <M x="236" y="88" size={11.5} fill={FN} weight={800}>
        partial fractions
      </M>
      {[
        'divide X(z) by z first',
        'split into A/(z−a) + B/(z−b)',
        'multiply each back by z',
        'invert term by term',
      ].map((t, i) => (
        <g key={t} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="60" y={106 + i * 52} width="352" height="42" rx="10" fill={WHITE} stroke={FN} strokeWidth="1.9" />
          <M x="80" y={132 + i * 52} size={10.5} fill={FN} anchor="start" weight={800}>
            {i + 1}
          </M>
          <M x="250" y={132 + i * 52} size={11} fill={N}>
            {t}
          </M>
        </g>
      ))}
      <Wire d="M60 336 L412 336" stroke={MUTED} width="1.3" opacity="0.5" />
      <Stems x="80" y="336" w="180" values={[1, 0.62, 0.4, 0.26, 0.17, 0.11]} scale={44} tone={GREEN} className="catm-cell-in catm-delay-4" />
      <M x="290" y="340" size={10} fill={GREEN} anchor="start" weight={800}>
        A·aⁿ + B·bⁿ
      </M>
      <M x="236" y="374" size={9.5} fill={MUTED}>
        a closed form, valid for every n
      </M>

      <rect x="464" y="62" width="400" height="330" rx="12" fill={WHITE} stroke={OP} strokeWidth="2.3" />
      <M x="664" y="88" size={11.5} fill={OP} weight={800}>
        long division
      </M>
      <M x="664" y="126" size={12} fill={N} weight={800}>
        X(z) = z / (z − 0.6)
      </M>
      <Wire d="M520 142 L808 142" stroke={MUTED} width="1.6" />
      {['1', '+ 0.6 z⁻¹', '+ 0.36 z⁻²', '+ 0.216 z⁻³'].map((term, i) => (
        <g key={term} className={`catm-cell-in catm-delay-${i}`}>
          <M x={540 + i * 82} y="172" size={11} fill={OP} anchor="start" weight={800}>
            {term}
          </M>
          <circle cx={560 + i * 82} cy="166" r="18" fill="none" stroke={OP} strokeWidth="1.8" strokeDasharray="4 4" />
          <Wire d={`M${560 + i * 82} 186 L${540 + i * 62} 250`} stroke={OP} width="1.5" dash="4 4" />
        </g>
      ))}
      <Wire d="M500 300 L830 300" stroke={MUTED} width="1.3" opacity="0.5" />
      <Stems x="540" y="300" w="186" values={[1, 0.6, 0.36, 0.216]} scale={50} tone={OP} className="catm-cell-in catm-delay-3" labels={['x₀', 'x₁', 'x₂', 'x₃']} />
      <M x="664" y="356" size={9.5} fill={MUTED}>
        the coefficients ARE the sequence
      </M>
      <M x="664" y="378" size={9.5} fill={RED} weight={800}>
        but you never get a general term
      </M>

      <g className="catm-emerge">
        <rect x="220" y="410" width="460" height="46" rx="11" fill={SKY} stroke={GOLD} strokeWidth="2.4" />
        <M x="450" y="439" size={11.5} fill={GOLD} weight={800}>
          which one depends on what the question asks for
        </M>
      </g>
    </Scene>
  )
}

export function DifferenceEquationScene() {
  const steps = [
    ['the difference equation', 'xₙ₊₂ − 3xₙ₊₁ + 2xₙ = 0', FN],
    ['transform it', 'z²X − z²x₀ − zx₁ − 3(zX − zx₀) + 2X = 0', OP],
    ['solve for X(z)', 'X(z) = (…)/(z² − 3z + 2)', DOM],
    ['invert', 'xₙ = A·1ⁿ + B·2ⁿ', GREEN],
  ]
  return (
    <Scene caption="Exactly the Laplace method, with sequences instead of functions and delays instead of derivatives">
      {steps.map(([title, body, tone], i) => (
        <g key={title} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="40" y={70 + i * 86} width="520" height="70" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="66" y={94 + i * 86} size={10} fill={tone} anchor="start" weight={800}>
            {`${i + 1} · ${title}`}
          </M>
          <M x="300" y={124 + i * 86} size={11.5} fill={N} weight={800}>
            {body}
          </M>
          {i < 3 ? (
            <Wire d={`M300 ${140 + i * 86} L300 ${156 + i * 86}`} stroke={MUTED} width="2.2" marker="url(#catArrM)" />
          ) : null}
        </g>
      ))}
      <g className="catm-pulse">
        <rect x="120" y={70 + 86 + 32} width="230" height="30" rx="7" fill={ROSE} fillOpacity="0.16" stroke={ROSE} strokeWidth="2.2" />
      </g>
      <M x="300" y="228" size={9} fill={ROSE} weight={800}>
        the initial conditions arrive as terms
      </M>
      <Wire d="M60 420 L540 420" stroke={MUTED} width="1.3" opacity="0.5" />
      <Stems x="90" y="420" w="300" values={[1, 1.5, 2.5, 4.5, 8.5]} scale={12} tone={GREEN} className="catm-cell-in catm-delay-4" labels={['x₀', 'x₁', 'x₂', 'x₃', 'x₄']} />

      <rect x="596" y="70" width="256" height="328" rx="12" fill={MUTED} fillOpacity="0.07" stroke={MUTED} strokeWidth="2.2" />
      <M x="724" y="96" size={10.5} fill={MUTED} weight={800}>
        the Laplace counterpart
      </M>
      {[
        'y″ − 3y′ + 2y = 0',
        's²Y − sy(0) − y′(0) − …',
        'Y(s) = (…)/(s² − 3s + 2)',
        'y(t) = A·eᵗ + B·e²ᵗ',
      ].map((t, i) => (
        <g key={t} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="616" y={118 + i * 70} width="216" height="54" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <foreignObject x="626" y={126 + i * 70} width="196" height="40">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 10.5px/1.2 system-ui,sans-serif', color: '#5b5b7a', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
              {t}
            </div>
          </foreignObject>
        </g>
      ))}
      <M x="724" y="418" size={9.5} fill={MUTED} weight={800}>
        step for step, the same argument
      </M>
    </Scene>
  )
}

export function ThreeTransformsScene() {
  return (
    <Scene caption="One plane, one line of it, and its image under z = e^(sT) — three transforms, one picture">
      <rect x="36" y="66" width="262" height="300" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.3" />
      <M x="167" y="92" size={11} fill={FN} weight={800}>
        Laplace
      </M>
      <rect x="60" y="118" width="107" height="226" fill={GREEN} fillOpacity="0.12" />
      <Plane cx="167" cy="232" r="104" xLabel="σ" yLabel="jω" tone={MUTED} />
      <M x="110" y="140" size={9.5} fill={GREEN} weight={800}>
        stable
      </M>
      <M x="167" y="362" size={9.5} fill={MUTED}>
        continuous signals
      </M>

      <rect x="318" y="66" width="262" height="300" rx="12" fill={WHITE} stroke={OP} strokeWidth="2.3" />
      <M x="449" y="92" size={11} fill={OP} weight={800}>
        Fourier
      </M>
      <Plane cx="449" cy="232" r="104" xLabel="σ" yLabel="jω" tone={MUTED} />
      <g className="catm-pulse">
        <Wire d="M449 128 L449 336" stroke={OP} width="7" opacity="0.4" />
      </g>
      <M x="449" y="118" size={9.5} fill={OP} weight={800}>
        s = jω
      </M>
      <M x="449" y="362" size={9.5} fill={MUTED}>
        one line of the same plane
      </M>

      <rect x="600" y="66" width="262" height="300" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.3" />
      <M x="731" y="92" size={11} fill={DOM} weight={800}>
        Z
      </M>
      <UnitCircle cx="731" cy="232" r="72" roc="inside" tone={DOM} label="" />
      <Plane cx="731" cy="232" r="104" xLabel="Re z" yLabel="Im z" tone={MUTED} />
      <M x="731" y="238" size={9.5} fill={GREEN} weight={800}>
        stable
      </M>
      <M x="731" y="362" size={9.5} fill={MUTED}>
        sampled sequences
      </M>

      <g className="catm-flow-arrow">
        <Wire d="M167 386 L560 410 L731 386" stroke={GOLD} width="2.8" dash="7 5" marker="url(#catArrG)" />
      </g>
      <M x="450" y="434" size={11} fill={GOLD} weight={800}>
        z = e^(sT): the left half-plane maps into the unit disc
      </M>
      <M x="450" y="458" size={9.5} fill={MUTED}>
        which is why the stability regions look different but say the same thing
      </M>
    </Scene>
  )
}

export function TransformSelectionScene() {
  const cells = [
    ['periodic', 'continuous', 'Fourier series', FN],
    ['non-periodic', 'continuous', 'Fourier transform', DOM],
    ['initial-value', 'continuous', 'Laplace', OP],
    ['any', 'sampled', 'Z', GREEN],
  ]
  return (
    <Scene caption="Two questions pick the transform; after that the procedure is identical in all four cases">
      <M x="450" y="62" size={10.5} fill={MUTED} weight={800}>
        what kind of signal? →
      </M>
      {cells.map(([kind, sig, name, tone], i) => (
        <g key={name} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={40 + i * 212} y="82" width="194" height="124" rx="12" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth="2.4" />
          <M x={137 + i * 212} y="110" size={9.5} fill={MUTED} weight={800}>
            {kind}
          </M>
          <M x={137 + i * 212} y="130" size={9.5} fill={MUTED} weight={800}>
            {sig}
          </M>
          <M x={137 + i * 212} y="168" size={12.5} fill={tone} weight={800}>
            {name}
          </M>
        </g>
      ))}

      {['transform', 'solve algebraically', 'invert'].map((t, i) => (
        <g key={t} className={`catm-cell-in catm-delay-${i}`}>
          <Block x={100 + i * 250} y={244} w={200} h={62} label={t} stroke={GOLD} />
          {i < 2 ? (
            <Wire d={`M${300 + i * 250} 275 L${350 + i * 250} 275`} stroke={MUTED} width="2.4" marker="url(#catArrM)" />
          ) : null}
        </g>
      ))}
      <M x="450" y="230" size={10} fill={GOLD} weight={800}>
        then the same three steps, whichever one you picked
      </M>

      <g className="catm-slide-in catm-delay-4">
        <rect x="100" y="334" width="700" height="112" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <M x="450" y="360" size={10.5} fill={GREEN} weight={800}>
          and each one comes with its own free check
        </M>
        {[
          ['Fourier series', 'midpoint at a jump'],
          ['Fourier transform', 'Parseval'],
          ['Laplace', 'IVT and FVT'],
          ['Z', 'IVT and FVT'],
        ].map(([w, check], i) => (
          <g key={w}>
            <M x={200 + i * 168} y="392" size={9.5} fill={MUTED} weight={800}>
              {w}
            </M>
            <M x={200 + i * 168} y="416" size={10} fill={GREEN} weight={800}>
              {check}
            </M>
          </g>
        ))}
      </g>
    </Scene>
  )
}

/* ── Module 4 — probability, distributions and sampling ─────────── */

export function ProbabilityFoundationsScene() {
  return (
    <Scene caption="Three axioms, one conditional, and one product rule — everything else in the module is built on these">
      <rect x="50" y="76" width="380" height="220" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.4" />
      <M x="70" y="100" size={10} fill={MUTED} anchor="start" weight={800}>
        S
      </M>
      <circle cx="196" cy="190" r="92" fill={FN} fillOpacity="0.14" stroke={FN} strokeWidth="2.4" className="catm-draw" />
      <circle cx="288" cy="190" r="92" fill={DOM} fillOpacity="0.14" stroke={DOM} strokeWidth="2.4" className="catm-draw catm-delay-1" />
      <path
        d="M242 116 A92 92 0 0 0 242 264 A92 92 0 0 0 242 116 Z"
        fill={OP}
        fillOpacity="0.3"
        className="catm-fade-in catm-delay-2"
      />
      <M x="146" y="196" size={13} fill={FN} weight={800}>A</M>
      <M x="338" y="196" size={13} fill={DOM} weight={800}>B</M>
      <M x="242" y="316" size={10} fill={OP} weight={800}>
        A ∩ B
      </M>

      {[
        ['0 ≤ P(A) ≤ 1', GREEN],
        ['P(S) = 1', GREEN],
        ['disjoint ⇒ P adds', GREEN],
      ].map(([ax, tone], i) => (
        <g key={ax} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="470" y={76 + i * 66} width="382" height="54" rx="11" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth="2.2" />
          <M x="661" y={109 + i * 66} size={12.5} fill={N} weight={800}>
            {ax}
          </M>
        </g>
      ))}

      <g className="catm-slide-in catm-delay-3">
        <rect x="470" y="286" width="382" height="86" rx="12" fill={WHITE} stroke={OP} strokeWidth="2.4" />
        <M x="661" y="312" size={10.5} fill={OP} weight={800}>
          conditional: shrink the sample space to B
        </M>
        <M x="661" y="348" size={14} fill={N} weight={800}>
          P(A|B) = P(A ∩ B) / P(B)
        </M>
      </g>
      <g className="catm-slide-in catm-delay-4">
        <rect x="470" y="386" width="382" height="72" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.4" />
        <M x="560" y="412" size={10.5} fill={DOM} weight={800}>
          independent?
        </M>
        <M x="560" y="438" size={11} fill={N}>
          P(A∩B) = P(A)P(B)
        </M>
        <M x="770" y="412" size={14} fill={GREEN} weight={800}>
          ✓ two dice
        </M>
        <M x="770" y="438" size={14} fill={RED} weight={800}>
          ✗ two cards, no replacement
        </M>
      </g>
      <M x="242" y="342" size={10} fill={MUTED} weight={800}>
        everything outside B is irrelevant once B is given
      </M>
    </Scene>
  )
}

export function DiscreteVsContinuousScene() {
  return (
    <Scene caption="Sum against integrate — and in the continuous case a single value has probability exactly zero">
      <rect x="40" y="62" width="392" height="330" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.3" />
      <M x="236" y="88" size={12} fill={FN} weight={800}>
        discrete
      </M>
      <Wire d="M76 300 L400 300" stroke={MUTED} width="1.6" />
      <Stems
        x="106"
        y="300"
        w="264"
        values={[0.1, 0.22, 0.3, 0.22, 0.12, 0.04]}
        scale={560}
        tone={FN}
        className="catm-cell-in"
        labels={['0', '1', '2', '3', '4', '5']}
      />
      <M x="236" y="344" size={11} fill={FN} weight={800}>
        P(X = 2) = 0.30
      </M>
      <M x="236" y="368" size={10} fill={MUTED}>
        the heights sum to exactly 1
      </M>

      <rect x="468" y="62" width="392" height="330" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.3" />
      <M x="664" y="88" size={12} fill={DOM} weight={800}>
        continuous
      </M>
      <Wire d="M504 300 L828 300" stroke={MUTED} width="1.6" />
      <Bell cx="664" base="300" w="280" h="160" stroke={DOM} className="catm-draw" />
      <path
        d={(() => {
          const pts = []
          for (let i = 0; i <= 40; i += 1) {
            const t = -0.4 + (1.6 * i) / 40
            pts.push(`${i === 0 ? 'M' : 'L'}${(664 + (t * 280) / 6).toFixed(1)} ${(300 - 160 * Math.exp(-(t * t) / 2)).toFixed(1)}`)
          }
          return `${pts.join(' ')} L${(664 + (1.2 * 280) / 6).toFixed(1)} 300 L${(664 - (0.4 * 280) / 6).toFixed(1)} 300 Z`
        })()}
        fill={DOM}
        fillOpacity="0.3"
        className="catm-fade-in catm-delay-2"
      />
      <M x="700" y="256" size={10.5} fill={DOM} weight={800}>
        P(a &lt; X &lt; b)
      </M>
      <g className="catm-pulse">
        <Wire d="M736 300 L736 190" stroke={RED} width="2.4" dash="5 4" />
        <M x="748" y="180" size={10} fill={RED} anchor="start" weight={800}>
          P(X = c) = 0
        </M>
      </g>
      <M x="664" y="344" size={10} fill={MUTED}>
        the total area is exactly 1
      </M>

      <g className="catm-emerge">
        <rect x="200" y="412" width="500" height="46" rx="11" fill={SKY} stroke={GOLD} strokeWidth="2.4" />
        <M x="330" y="441" size={13} fill={FN} weight={800}>
          Σ
        </M>
        <M x="450" y="441" size={11} fill={MUTED} weight={800}>
          becomes
        </M>
        <M x="570" y="441" size={13} fill={DOM} weight={800}>
          ∫
        </M>
      </g>
    </Scene>
  )
}

export function CdfScene() {
  return (
    <Scene caption="The cumulative function is the running area — read it forwards for a probability, backwards for a percentile">
      <Wire d="M60 200 L420 200" stroke={MUTED} width="1.6" />
      <Bell cx="240" base="200" w="300" h="110" stroke={FN} className="catm-draw" />
      <path
        d={(() => {
          const pts = []
          for (let i = 0; i <= 40; i += 1) {
            const t = -3 + (3.6 * i) / 40
            pts.push(`${i === 0 ? 'M' : 'L'}${(240 + (t * 300) / 6).toFixed(1)} ${(200 - 110 * Math.exp(-(t * t) / 2)).toFixed(1)}`)
          }
          return `${pts.join(' ')} L270 200 L90 200 Z`
        })()}
        fill={FN}
        fillOpacity="0.28"
        className="catm-fade-in catm-delay-2"
      />
      <M x="180" y="166" size={10} fill={FN} weight={800}>
        area
      </M>

      <Wire d="M60 400 L420 400" stroke={MUTED} width="1.6" />
      <Wire d="M60 400 L60 250" stroke={MUTED} width="1.6" />
      <Curve
        pts={Array.from({ length: 61 }, (_, i) => {
          const t = -3 + (6 * i) / 60
          // The logistic is a close-enough stand-in for the normal CDF here.
          return [240 + (t * 300) / 6, 400 - 132 / (1 + Math.exp(-1.7 * t))]
        })}
        stroke={DOM}
        width="3"
        className="catm-draw catm-delay-1"
      />
      <Wire d="M270 120 L270 400" stroke={ROSE} width="2" dash="6 5" className="catm-draw catm-delay-2" />
      <g className="catm-emerge">
        <Dot cx="270" cy="317" r="7" fill={ROSE} />
        <path d="M290 317 L300 317 M295 317 L295 400 M290 400 L300 400" stroke={ROSE} strokeWidth="2.2" fill="none" />
        <M x="312" y="362" size={10} fill={ROSE} anchor="start" weight={800}>
          same number
        </M>
      </g>
      <M x="240" y="434" size={10} fill={DOM} weight={800}>
        F(x) = the shaded area to the left
      </M>

      <Wire d="M490 200 L840 200" stroke={MUTED} width="1.6" />
      <Stems x="530" y="200" w="270" values={[0.2, 0.3, 0.28, 0.16, 0.06]} scale={300} tone={FN} className="catm-cell-in catm-delay-2" />
      <Wire d="M490 400 L840 400" stroke={MUTED} width="1.6" />
      {[0.2, 0.5, 0.78, 0.94, 1].map((v, i) => (
        <g key={v} className={`catm-cell-in catm-delay-${i % 5}`}>
          <Wire d={`M${530 + i * 67.5} ${400 - v * 130} L${597.5 + i * 67.5} ${400 - v * 130}`} stroke={DOM} width="3" />
          {i < 4 ? (
            <Wire d={`M${597.5 + i * 67.5} ${400 - v * 130} L${597.5 + i * 67.5} ${400 - [0.5, 0.78, 0.94, 1][i] * 130}`} stroke={DOM} width="1.8" dash="4 3" />
          ) : null}
        </g>
      ))}
      <M x="665" y="434" size={10} fill={DOM} weight={800}>
        each jump equals the stem above it
      </M>
      <g className="catm-flow-arrow">
        <Wire d="M100 282 L200 282" stroke={GOLD} width="2.4" marker="url(#catArrG)" />
        <Wire d="M200 268 L100 268" stroke={GOLD} width="2.4" marker="url(#catArrG)" />
      </g>
      <M x="150" y="252" size={9} fill={GOLD} weight={800}>
        probability ↔ percentile
      </M>
    </Scene>
  )
}

export function ExpectationSpreadScene() {
  return (
    <Scene caption="The mean is where it balances; the variance is how far it typically sits from there">
      <Wire d="M70 264 L500 264" stroke={MUTED} width="1.6" />
      <Bell cx="285" base="264" w="360" h="150" stroke={FN} fill={FN} className="catm-draw" />
      <Wire d="M285 264 L285 92" stroke={ROSE} width="2.8" className="catm-draw catm-delay-1" />
      <M x="285" y="82" size={11} fill={ROSE} weight={800}>
        μ
      </M>
      <g className="catm-emerge">
        <Wire d="M225 208 L345 208" stroke={GOLD} width="2.4" marker="url(#catArrG)" />
        <Wire d="M345 208 L225 208" stroke={GOLD} width="2.4" marker="url(#catArrG)" />
        <M x="285" y="196" size={10.5} fill={GOLD} weight={800}>
          ±σ
        </M>
      </g>
      <Wire d="M285 292 L285 306" stroke={N} width="2.4" />
      <path d="M285 306 L306 340 L264 340 Z" fill={N} />
      <Wire d="M110 340 L460 340" stroke={N} width="3.4" className="catm-flip" />
      <M x="285" y="372" size={10.5} fill={MUTED} weight={800}>
        expectation is the balance point
      </M>

      <g className="catm-cell-in catm-delay-2">
        <rect x="540" y="86" width="312" height="140" rx="12" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.4" />
        <M x="696" y="114" size={14} fill={GREEN} weight={800}>
          ✓
        </M>
        <M x="696" y="148" size={12.5} fill={N} weight={800}>
          E[X + Y] = E[X] + E[Y]
        </M>
        <M x="696" y="180" size={10} fill={MUTED}>
          always — independence is not required
        </M>
        <M x="696" y="204" size={10} fill={MUTED}>
          and that is unusual enough to be worth remembering
        </M>
      </g>
      <g className="catm-cell-in catm-delay-3">
        <rect x="540" y="246" width="312" height="200" rx="12" fill={ROSE} fillOpacity="0.09" stroke={ROSE} strokeWidth="2.4" />
        <M x="696" y="274" size={14} fill={ROSE} weight={800}>
          ⚠
        </M>
        <M x="696" y="308" size={12} fill={N} weight={800}>
          Var[X + Y] = Var[X] + Var[Y]
        </M>
        <M x="696" y="332" size={10.5} fill={ROSE} weight={800}>
          only if X and Y are independent
        </M>
        <Wire d="M576 356 L816 356" stroke={ROSE} width="1.6" />
        <M x="696" y="382" size={10.5} fill={N}>
          take Y = X: Var[2X] = 4·Var[X]
        </M>
        <M x="696" y="406" size={10.5} fill={RED} weight={800}>
          not 2·Var[X]
        </M>
        <M x="696" y="430" size={9.5} fill={MUTED}>
          the most common slip in the whole module
        </M>
      </g>
    </Scene>
  )
}

export function BinomialStructureScene() {
  return (
    <Scene caption="The combination factor counts the paths; the powers of p and q price each one">
      <Dot cx="80" cy="220" r="7" fill={N} />
      {[0, 1, 2].map((lvl) =>
        Array.from({ length: 2 ** lvl }, (_, k) => {
          const y0 = 220 + (k - (2 ** lvl - 1) / 2) * (200 / 2 ** lvl)
          const dy = 200 / 2 ** (lvl + 1)
          return (
            <g key={`${lvl}-${k}`} className={`catm-draw catm-delay-${lvl}`}>
              <Wire d={`M${80 + lvl * 110} ${y0.toFixed(1)} L${190 + lvl * 110} ${(y0 - dy / 2).toFixed(1)}`} stroke={GREEN} width="2" />
              <Wire d={`M${80 + lvl * 110} ${y0.toFixed(1)} L${190 + lvl * 110} ${(y0 + dy / 2).toFixed(1)}`} stroke={RED} width="2" />
            </g>
          )
        }),
      )}
      {Array.from({ length: 8 }, (_, k) => {
        const y = 220 + (k - 3.5) * 25
        const successes = [3, 2, 2, 1, 2, 1, 1, 0][k]
        const two = successes === 2
        return (
          <g key={k} className={`catm-pop catm-delay-${k % 5}`}>
            <Dot cx="410" cy={y} r={two ? 7 : 5} fill={two ? OP : MUTED} />
            <M x="424" y={y + 4} size={9} fill={two ? OP : MUTED} anchor="start" weight={two ? 800 : 700}>
              {`p${successes}q${3 - successes}`}
            </M>
          </g>
        )
      })}
      <g className="catm-emerge">
        <rect x="70" y="342" width="420" height="52" rx="11" fill={OP} fillOpacity="0.12" stroke={OP} strokeWidth="2.6" />
        <M x="280" y="374" size={12.5} fill={OP} weight={800}>
          3 paths with exactly 2 successes = C(3,2)
        </M>
      </g>

      {[
        ['p = 0.5, symmetric', [0.01, 0.04, 0.12, 0.21, 0.25, 0.21, 0.12, 0.04], FN],
        ['p = 0.2, skewed', [0.11, 0.27, 0.3, 0.2, 0.09, 0.03, 0.01, 0], DOM],
      ].map(([title, bars, tone], i) => (
        <g key={title} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="530" y={70 + i * 150} width="322" height="134" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="691" y={94 + i * 150} size={10.5} fill={tone} weight={800}>
            {title}
          </M>
          <Wire d={`M556 ${180 + i * 150} L826 ${180 + i * 150}`} stroke={MUTED} width="1.5" />
          <Columns x={556} y={180 + i * 150} w={270} items={bars.map((v, k) => [String(k), v * 0.34, tone])} max={0.25} labelSize={8} />
        </g>
      ))}

      {[
        ['trials independent', 'drawing cards without replacement breaks it', RED],
        ['p constant', 'a machine that wears during the run breaks it', RED],
      ].map(([cond, counter, tone], i) => (
        <g key={cond} className={`catm-slide-in catm-delay-${i + 3}`}>
          <rect x="530" y={378 + i * 44} width="322" height="38" rx="9" fill={WHITE} stroke={tone} strokeWidth="2" />
          <M x="560" y={402 + i * 44} size={10} fill={tone} anchor="start" weight={800}>
            {cond}
          </M>
          <M x="836" y={402 + i * 44} size={8.5} fill={MUTED} anchor="end">
            {counter}
          </M>
        </g>
      ))}
    </Scene>
  )
}

export function PoissonLimitScene() {
  return (
    <Scene caption="Hold the mean fixed, let n grow and p shrink, and the binomial becomes the Poisson">
      {[
        ['n = 10, p = 0.2', [0.107, 0.268, 0.302, 0.201, 0.088, 0.026], FN],
        ['n = 100, p = 0.02', [0.133, 0.271, 0.273, 0.182, 0.09, 0.035], FN],
        ['n = 1000, p = 0.002', [0.135, 0.271, 0.271, 0.181, 0.09, 0.036], FN],
        ['Poisson, λ = 2', [0.135, 0.271, 0.271, 0.18, 0.09, 0.036], GREEN],
      ].map(([title, bars, tone], i) => (
        <g key={title} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={30 + i * 214} y="68" width="196" height="200" rx="12" fill={WHITE} stroke={tone} strokeWidth={i === 3 ? 3.2 : 2.3} />
          <M x={128 + i * 214} y="92" size={9.5} fill={tone} weight={800}>
            {title}
          </M>
          <Wire d={`M${52 + i * 214} 236 L${204 + i * 214} 236`} stroke={MUTED} width="1.5" />
          <Columns x={52 + i * 214} y={236} w={152} items={bars.map((v, k) => [String(k), v, tone])} max={0.32} labelSize={8} />
          <Wire d={`M${128 + i * 214} 84 L${128 + i * 214} 76`} stroke={ROSE} width="2" />
        </g>
      ))}
      <Wire d="M226 168 L244 168 M440 168 L458 168 M654 168 L672 168" stroke={MUTED} width="2.4" marker="url(#catArrM)" className="catm-flow-arrow" />
      <M x="450" y="292" size={10.5} fill={ROSE} weight={800}>
        the mean stays at 2 the whole way across
      </M>

      <g className="catm-slide-in catm-delay-4">
        <rect x="120" y="318" width="660" height="140" rx="12" fill={WHITE} stroke={GOLD} strokeWidth="2.4" />
        <M x="450" y="344" size={11} fill={GOLD} weight={800}>
          the Poisson signature: mean = variance
        </M>
        <rect x="160" y="362" width="280" height="76" rx="10" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.2" />
        <M x="300" y="388" size={11} fill={N}>
          sample mean 3.1, variance 3.0
        </M>
        <M x="300" y="416" size={12} fill={GREEN} weight={800}>
          ✓ Poisson is plausible
        </M>
        <rect x="460" y="362" width="280" height="76" rx="10" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.2" />
        <M x="600" y="388" size={11} fill={N}>
          sample mean 3.1, variance 12
        </M>
        <M x="600" y="416" size={12} fill={RED} weight={800}>
          ✗ over-dispersed, not Poisson
        </M>
      </g>
    </Scene>
  )
}

export function NormalShapeScene() {
  return (
    <Scene caption="Two parameters: one slides it, one widens it — and no elementary antiderivative, which is why the tables exist">
      <Wire d="M60 330 L680 330" stroke={MUTED} width="1.6" />
      <Bell cx="300" base="330" w="300" h="200" stroke={FN} fill={FN} className="catm-draw" />
      <Bell cx="470" base="330" w="300" h="200" stroke={OP} className="catm-draw catm-delay-2" />
      <Bell cx="300" base="330" w="480" h="125" stroke={DOM} className="catm-draw catm-delay-3" />
      <M x="470" y="112" size={10} fill={OP} anchor="start" weight={800}>
        μ changed
      </M>
      <M x="126" y="222" size={10} fill={DOM} anchor="start" weight={800}>
        σ changed
      </M>

      {[
        [1, '68%', 0.72],
        [2, '95%', 0.5],
        [3, '99.7%', 0.3],
      ].map(([k, pc, op], i) => (
        <g key={pc} className={`catm-fade-in catm-delay-${i}`}>
          <rect x={300 - k * 50} y={330 - 200 * Math.exp(-(k * k) / 2)} width={k * 100} height={200 * Math.exp(-(k * k) / 2)} fill={GREEN} fillOpacity={0.07} />
          <Wire d={`M${300 - k * 50} 330 L${300 - k * 50} ${(330 - 200 * Math.exp(-(k * k) / 2)).toFixed(1)}`} stroke={GREEN} width="1.8" dash="4 4" opacity={op} />
          <Wire d={`M${300 + k * 50} 330 L${300 + k * 50} ${(330 - 200 * Math.exp(-(k * k) / 2)).toFixed(1)}`} stroke={GREEN} width="1.8" dash="4 4" opacity={op} />
          <M x={300 + k * 50 - 18} y={352 + i * 22} size={10} fill={GREEN} weight={800}>
            {pc}
          </M>
        </g>
      ))}
      <M x="300" y="422" size={10} fill={MUTED} weight={800}>
        within 1, 2 and 3 standard deviations
      </M>

      <Card
        x="700"
        y="96"
        w="152"
        h="150"
        title="the density"
        accent={FN}
        mono
        lines={['(1/σ√2π)', '·e^(−(x−μ)²/2σ²)']}
        linesY={60}
        lineH={26}
        className="catm-slide-in catm-delay-3"
      />
      <g className="catm-pulse">
        <rect x="700" y="266" width="152" height="140" rx="12" fill={ROSE} fillOpacity="0.09" stroke={ROSE} strokeWidth="2.4" />
        <M x="776" y="296" size={10.5} fill={ROSE} weight={800}>
          no elementary
        </M>
        <M x="776" y="318" size={10.5} fill={ROSE} weight={800}>
          antiderivative
        </M>
        <M x="776" y="352" size={10} fill={N}>
          hence the tables
        </M>
        <M x="776" y="378" size={10} fill={N}>
          and the z-score
        </M>
      </g>
    </Scene>
  )
}

export function StandardisationScene() {
  return (
    <Scene caption="One table serves every normal distribution — because every one of them standardises to this curve">
      <Wire d="M60 268 L380 268" stroke={MUTED} width="1.6" />
      <Bell cx="220" base="268" w="270" h="150" stroke={FN} className="catm-draw" />
      <path
        d={(() => {
          const pts = []
          for (let i = 0; i <= 30; i += 1) {
            const t = 1.2 + (1.8 * i) / 30
            pts.push(`${i === 0 ? 'M' : 'L'}${(220 + (t * 270) / 6).toFixed(1)} ${(268 - 150 * Math.exp(-(t * t) / 2)).toFixed(1)}`)
          }
          return `${pts.join(' ')} L355 268 L274 268 Z`
        })()}
        fill={OP}
        fillOpacity="0.3"
        className="catm-fade-in catm-delay-2"
      />
      <Wire d="M220 268 L220 128" stroke={ROSE} width="2" dash="5 4" />
      <Wire d="M274 268 L274 194" stroke={OP} width="2.4" />
      <M x="220" y="292" size={10} fill={ROSE} weight={800}>
        μ = 50
      </M>
      <M x="274" y="292" size={10} fill={OP} weight={800}>
        x = 56
      </M>
      <g className="catm-emerge">
        <path d="M220 316 L220 326 M220 321 L274 321 M274 316 L274 326" stroke={GOLD} strokeWidth="2.2" fill="none" />
        <M x="247" y="344" size={9.5} fill={GOLD} weight={800}>
          6 units
        </M>
      </g>

      <Wire d="M404 220 L474 220" stroke={GOLD} width="3" marker="url(#catArrG)" className="catm-flow-arrow" />
      <M x="439" y="200" size={10.5} fill={GOLD} weight={800}>
        z = (x − μ)/σ
      </M>
      <M x="439" y="248" size={10} fill={GOLD} weight={800}>
        = 6/4 = 1.5
      </M>

      <Wire d="M500 268 L820 268" stroke={MUTED} width="1.6" />
      <Bell cx="660" base="268" w="270" h="150" stroke={DOM} className="catm-draw catm-delay-2" />
      <path
        d={(() => {
          const pts = []
          for (let i = 0; i <= 30; i += 1) {
            const t = 1.5 + (1.5 * i) / 30
            pts.push(`${i === 0 ? 'M' : 'L'}${(660 + (t * 270) / 6).toFixed(1)} ${(268 - 150 * Math.exp(-(t * t) / 2)).toFixed(1)}`)
          }
          return `${pts.join(' ')} L795 268 L727 268 Z`
        })()}
        fill={OP}
        fillOpacity="0.3"
        className="catm-fade-in catm-delay-3"
      />
      <M x="660" y="292" size={10} fill={ROSE} weight={800}>
        0
      </M>
      <M x="727" y="292" size={10} fill={OP} weight={800}>
        z = 1.5
      </M>
      <M x="660" y="320" size={10} fill={DOM} weight={800}>
        the same shaded area
      </M>

      <g className="catm-cell-in catm-delay-3">
        <rect x="60" y="368" width="360" height="94" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.2" />
        <M x="240" y="390" size={10} fill={MUTED} weight={800}>
          table extract
        </M>
        {['z', '.00', '.05'].map((h, i) => (
          <M key={h} x={116 + i * 96} y="412" size={9.5} fill={MUTED} weight={800}>
            {h}
          </M>
        ))}
        {[['1.4', '.9192', '.9265'], ['1.5', '.9332', '.9394']].map((row, r) =>
          row.map((v, c) => (
            <M key={`${r}${c}`} x={116 + c * 96} y={434 + r * 20} size={9.5} fill={r === 1 && c === 1 ? OP : N} weight={r === 1 && c === 1 ? 800 : 700}>
              {v}
            </M>
          )),
        )}
        <g className="catm-pulse">
          <circle cx="212" cy="450" r="18" fill="none" stroke={OP} strokeWidth="2.4" />
        </g>
      </g>
      <g className="catm-slide-in catm-delay-4">
        <rect x="460" y="368" width="392" height="94" rx="12" fill={SKY} stroke={DOM} strokeWidth="2.3" />
        <M x="656" y="392" size={10.5} fill={DOM} weight={800}>
          the tables only list positive z
        </M>
        <M x="656" y="418" size={11} fill={N}>
          Φ(−z) = 1 − Φ(z)
        </M>
        <M x="656" y="444" size={9.5} fill={MUTED}>
          use symmetry; do not look for a negative row
        </M>
      </g>
    </Scene>
  )
}

export function ExponentialScene() {
  return (
    <Scene caption="Memoryless: a component that has already survived an hour is exactly as good as a new one">
      <Wire d="M60 300 L420 300" stroke={MUTED} width="1.6" />
      <path
        d={(() => {
          const pts = []
          for (let i = 0; i <= 60; i += 1) {
            const t = i / 60
            pts.push(`${i === 0 ? 'M' : 'L'}${(70 + t * 330).toFixed(1)} ${(300 - 170 * Math.exp(-3.2 * t)).toFixed(1)}`)
          }
          return pts.join(' ')
        })()}
        fill="none"
        stroke={FN}
        strokeWidth="3"
        className="catm-draw"
      />
      <Wire d="M173 300 L173 178" stroke={ROSE} width="2.2" dash="5 4" />
      <M x="173" y="324" size={10} fill={ROSE} weight={800}>
        mean = 1/λ
      </M>
      <path
        d={(() => {
          const pts = []
          for (let i = 0; i <= 40; i += 1) {
            const t = 0.31 + (0.69 * i) / 40
            pts.push(`${i === 0 ? 'M' : 'L'}${(70 + t * 330).toFixed(1)} ${(300 - 170 * Math.exp(-3.2 * t)).toFixed(1)}`)
          }
          return `${pts.join(' ')} L400 300 L173 300 Z`
        })()}
        fill={OP}
        fillOpacity="0.28"
        className="catm-fade-in catm-delay-2"
      />
      <M x="290" y="268" size={10.5} fill={OP} weight={800}>
        P(X &gt; mean) = e⁻¹ = 0.368
      </M>

      <rect x="470" y="70" width="382" height="212" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.3" />
      <M x="661" y="96" size={10.5} fill={DOM} weight={800}>
        it has already survived a time t
      </M>
      <Wire d="M500 160 L600 160" stroke={MUTED} width="3" />
      <Wire d="M600 160 L820 160" stroke={DOM} width="3" />
      <g className="catm-emerge">
        <path d="M500 182 L500 192 M500 187 L600 187 M600 182 L600 192" stroke={ROSE} strokeWidth="2.2" fill="none" />
        <M x="550" y="208" size={9.5} fill={ROSE} weight={800}>
          elapsed t
        </M>
      </g>
      <path
        d={(() => {
          const pts = []
          for (let i = 0; i <= 40; i += 1) {
            const tt = i / 40
            pts.push(`${i === 0 ? 'M' : 'L'}${(604 + tt * 210).toFixed(1)} ${(262 - 68 * Math.exp(-3.2 * tt)).toFixed(1)}`)
          }
          return pts.join(' ')
        })()}
        fill="none"
        stroke={DOM}
        strokeWidth="2.6"
        className="catm-draw catm-delay-2"
      />
      <path
        d={(() => {
          const pts = []
          for (let i = 0; i <= 40; i += 1) {
            const tt = i / 40
            pts.push(`${i === 0 ? 'M' : 'L'}${(604 + tt * 210).toFixed(1)} ${(262 - 68 * Math.exp(-3.2 * tt)).toFixed(1)}`)
          }
          return pts.join(' ')
        })()}
        fill="none"
        stroke={GREEN}
        strokeWidth="2.6"
        strokeDasharray="6 5"
        className="catm-draw catm-delay-4"
      />
      <M x="710" y="282" size={9.5} fill={GREEN} weight={800}>
        identical to a brand-new one
      </M>

      <g className="catm-slide-in catm-delay-3">
        <rect x="60" y="360" width="382" height="94" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="251" y="386" size={10.5} fill={GOLD} weight={800}>
          the Poisson partner
        </M>
        <M x="160" y="414" size={10.5} fill={FN} weight={800}>
          Poisson counts events
        </M>
        <M x="350" y="414" size={10.5} fill={DOM} weight={800}>
          exponential times the gaps
        </M>
        <M x="251" y="440" size={9.5} fill={MUTED}>
          the same process, described two ways
        </M>
      </g>
      <g className="catm-pulse">
        <rect x="470" y="360" width="382" height="94" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.4" />
        <M x="661" y="390" size={10.5} fill={RED} weight={800}>
          real components do age
        </M>
        <M x="661" y="416" size={10} fill={N}>
          this models constant-hazard failure only
        </M>
        <M x="661" y="440" size={9.5} fill={MUTED}>
          a bearing wearing out is not exponential
        </M>
      </g>
    </Scene>
  )
}

export function SamplingDistributionScene() {
  return (
    <Scene caption="Four times the sample for twice the precision — that is the whole cost structure of statistics">
      <Wire d="M60 172 L440 172" stroke={MUTED} width="1.6" />
      <Bell cx="250" base="172" w="340" h="86" stroke={MUTED} fill={MUTED} opacity="0.2" className="catm-draw" />
      <M x="250" y="74" size={10.5} fill={MUTED} weight={800}>
        the population — wide
      </M>
      {[-2, -0.8, 0.4, 1.6].map((t, i) => (
        <g key={t} className={`catm-pop catm-delay-${i}`}>
          <Dot cx={250 + t * 56} cy="172" r="5" fill={OP} />
          <Wire d={`M${250 + t * 56} 178 L${250 + t * 12} 244`} stroke={OP} width="1.5" dash="4 4" />
        </g>
      ))}
      <Wire d="M60 252 L440 252" stroke={MUTED} width="1.6" />
      <Bell cx="250" base="252" w="130" h="80" stroke={GREEN} fill={GREEN} className="catm-draw catm-delay-3" />
      <M x="250" y="290" size={10.5} fill={GREEN} weight={800}>
        the sample means — narrow
      </M>
      <M x="250" y="312" size={9.5} fill={MUTED}>
        centred on exactly the same μ
      </M>

      <Wire d="M500 300 L850 300" stroke={MUTED} width="1.6" />
      {[
        [4, 150, MUTED],
        [16, 75, DOM],
        [64, 38, GREEN],
      ].map(([n2, w, tone], i) => (
        <g key={n2} className={`catm-draw catm-delay-${i}`}>
          <Bell cx="676" base="300" w={w} h={60 + i * 45} stroke={tone} />
          <M x={676 + w / 2 + 10} y={244 - i * 42} size={9.5} fill={tone} anchor="start" weight={800}>
            {`n = ${n2}`}
          </M>
        </g>
      ))}
      <M x="676" y="326" size={10} fill={MUTED} weight={800}>
        each one half the width of the last
      </M>

      <g className="catm-emerge">
        <rect x="500" y="80" width="350" height="76" rx="12" fill={WHITE} stroke={GOLD} strokeWidth="2.6" />
        <M x="675" y="124" size={15} fill={N} weight={800}>
          SE = σ / √n
        </M>
      </g>
      <g className="catm-slide-in catm-delay-4">
        <rect x="60" y="358" width="790" height="94" rx="12" fill={ROSE} fillOpacity="0.09" stroke={ROSE} strokeWidth="2.4" />
        <M x="455" y="386" size={11.5} fill={ROSE} weight={800}>
          the square root is the expensive part
        </M>
        <M x="455" y="414" size={11} fill={N}>
          halving the standard error costs four times the sample
        </M>
        <M x="455" y="438" size={9.5} fill={MUTED}>
          which is why every real study argues about sample size before anything else
        </M>
      </g>
    </Scene>
  )
}

export function CentralLimitScene() {
  const shapes = ['uniform', 'skewed', 'bimodal']
  const sizes = [1, 2, 5, 30]
  return (
    <Scene caption="Whatever the population looks like, the mean of enough of them is normal">
      {shapes.map((shape, r) =>
        sizes.map((n2, c) => {
          const cx = 210 + c * 170
          const cy = 128 + r * 118
          const conv = Math.min(1, (c * c) / (r === 1 ? 12 : 6))
          return (
            <g key={`${shape}${n2}`} className={`catm-cell-in catm-delay-${(r + c) % 5}`}>
              <rect x={cx - 74} y={cy - 48} width="148" height="96" rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.6" />
              <Wire d={`M${cx - 60} ${cy + 32} L${cx + 60} ${cy + 32}`} stroke={MUTED} width="1.2" opacity="0.5" />
              <Curve
                pts={Array.from({ length: 41 }, (_, i) => {
                  const t = -1 + (2 * i) / 40
                  const bell = Math.exp(-6 * t * t)
                  let base
                  if (r === 0) base = Math.abs(t) < 0.85 ? 1 : 0
                  else if (r === 1) base = t < -0.85 ? 0 : Math.exp(-3 * (t + 0.85))
                  else base = Math.exp(-40 * (t + 0.45) ** 2) + Math.exp(-40 * (t - 0.45) ** 2)
                  const v = base * (1 - conv) + bell * conv
                  return [cx + t * 60, cy + 32 - 56 * Math.min(1, v)]
                })}
                stroke={c === 3 ? GREEN : FN}
                width={c === 3 ? 2.6 : 2.2}
              />
            </g>
          )
        }),
      )}
      {shapes.map((shape, r) => (
        <M key={shape} x="108" y={132 + r * 118} size={10.5} fill={MUTED} anchor="end" weight={800}>
          {shape}
        </M>
      ))}
      {sizes.map((n2, c) => (
        <M key={n2} x={210 + c * 170} y="66" size={10.5} fill={MUTED} weight={800}>
          {`n = ${n2}`}
        </M>
      ))}
      <M x="720" y="66" size={10} fill={GREEN} anchor="start" weight={800}>
        all bell-shaped
      </M>
      <M x="108" y="252" size={9} fill={ROSE} anchor="end">
        slowest
      </M>

      <g className="catm-slide-in catm-delay-4">
        <rect x="60" y="392" width="392" height="70" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="256" y="418" size={10.5} fill={GOLD} weight={800}>
          the rule of thumb
        </M>
        <M x="256" y="444" size={10.5} fill={N}>
          about 30 for moderate skew, fewer if nearly symmetric
        </M>
      </g>
      <g className="catm-pulse">
        <rect x="480" y="392" width="372" height="70" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.4" />
        <M x="666" y="418" size={10.5} fill={RED} weight={800}>
          finite variance is required
        </M>
        <M x="666" y="444" size={10} fill={MUTED}>
          heavy-tailed populations never converge
        </M>
      </g>
    </Scene>
  )
}

export function HypothesisFrameworkScene() {
  return (
    <Scene caption="Failing to reject is not accepting — the test never had the power to prove the null">
      <Wire d="M60 320 L520 320" stroke={MUTED} width="1.6" />
      <Bell cx="290" base="320" w="400" h="190" stroke={FN} className="catm-draw" />
      <BellTail cx="290" base="320" w="400" h="190" from="290" side="right" fill={ROSE} className="catm-fade-in catm-delay-2" />
      <BellTail cx="290" base="320" w="400" h="190" from="290" side="left" fill={ROSE} className="catm-fade-in catm-delay-2" />
      {/* Only the tails beyond ±1.96σ are critical; redraw the body clean. */}
      <path
        d={(() => {
          const pts = []
          for (let i = 0; i <= 60; i += 1) {
            const t = -1.96 + (3.92 * i) / 60
            pts.push(`${i === 0 ? 'M' : 'L'}${(290 + (t * 400) / 6).toFixed(1)} ${(320 - 190 * Math.exp(-(t * t) / 2)).toFixed(1)}`)
          }
          return `${pts.join(' ')} L421 320 L159 320 Z`
        })()}
        fill={CREAM}
        stroke={FN}
        strokeWidth="2.6"
      />
      <M x="112" y="290" size={9.5} fill={ROSE} weight={800}>
        α/2
      </M>
      <M x="470" y="290" size={9.5} fill={ROSE} weight={800}>
        α/2
      </M>
      <g className="catm-pop catm-delay-3">
        <Dot cx="470" cy="320" r="8" fill={RED} />
        <M x="470" y="348" size={10.5} fill={RED} weight={800}>
          reject H₀
        </M>
      </g>
      <g className="catm-pop catm-delay-4">
        <Dot cx="310" cy="320" r="8" fill={GREEN} />
        <M x="310" y="348" size={10.5} fill={GREEN} weight={800}>
          fail to reject
        </M>
        <M x="310" y="374" size={10} fill={RED} weight={800}>
          accept H₀
        </M>
        <Wire d="M270 370 L350 370" stroke={RED} width="2.4" className="catm-emerge" />
      </g>
      <M x="290" y="410" size={9.5} fill={MUTED}>
        absence of evidence is not evidence of absence
      </M>

      {[
        'state H₀ and H₁',
        'choose α',
        'compute the test statistic',
        'compare against the critical value',
        'state the conclusion in context',
      ].map((t, i) => (
        <g key={t} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="560" y={76 + i * 74} width="292" height="58" rx="11" fill={WHITE} stroke={FN} strokeWidth={i === 4 ? 3 : 2.2} />
          <M x="586" y={111 + i * 74} size={11} fill={FN} anchor="start" weight={800}>
            {i + 1}
          </M>
          <foreignObject x="612" y={84 + i * 74} width="226" height="42">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11px/1.2 system-ui,sans-serif', color: '#1e1b3a', display: 'flex', alignItems: 'center', height: '100%' }}>
              {t}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

export function ErrorTypesScene() {
  return (
    <Scene caption="Move the line and the two errors trade against each other — only more data shrinks both">
      <Wire d="M60 320 L620 320" stroke={MUTED} width="1.6" />
      <Bell cx="250" base="320" w="300" h="170" stroke={FN} className="catm-draw" />
      <Bell cx="430" base="320" w="300" h="170" stroke={OP} className="catm-draw catm-delay-1" />
      <M x="250" y="126" size={10.5} fill={FN} weight={800}>
        under H₀
      </M>
      <M x="430" y="126" size={10.5} fill={OP} weight={800}>
        under H₁
      </M>
      <Wire d="M340 320 L340 108" stroke={ROSE} width="3" className="catm-draw catm-delay-2" />
      <M x="340" y="98" size={10} fill={ROSE} weight={800}>
        critical value
      </M>
      <BellTail cx="250" base="320" w="300" h="170" from="340" side="right" fill={RED} className="catm-fade-in catm-delay-3" />
      <BellTail cx="430" base="320" w="300" h="170" from="340" side="left" fill={GOLD} className="catm-fade-in catm-delay-3" />
      <M x="392" y="300" size={10} fill={RED} weight={800}>
        α
      </M>
      <M x="300" y="300" size={10} fill={GOLD} weight={800}>
        β
      </M>
      <M x="510" y="234" size={10} fill={GREEN} weight={800}>
        power = 1 − β
      </M>
      <g className="catm-shift" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <Wire d="M340 340 L340 360" stroke={ROSE} width="3" />
        <path d="M330 360 L350 360 L340 374 Z" fill={ROSE} />
      </g>
      <M x="340" y="396" size={9.5} fill={ROSE} weight={800}>
        slide it: one area grows as the other shrinks
      </M>
      <M x="340" y="420" size={9.5} fill={GREEN} weight={800}>
        raise n and both shrink together
      </M>

      <rect x="660" y="84" width="192" height="28" rx="8" fill={N} />
      <M x="756" y="104" size={10} fill={WHITE} weight={800}>
        the four outcomes
      </M>
      {[
        ['H₀ true, reject', 'Type I · α', RED],
        ['H₀ true, keep', 'correct', GREEN],
        ['H₀ false, reject', 'correct · power', GREEN],
        ['H₀ false, keep', 'Type II · β', GOLD],
      ].map(([sit, verdict, tone], i) => (
        <g key={sit} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="660" y={124 + i * 66} width="192" height="54" rx="10" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth="2.2" />
          <M x="756" y={146 + i * 66} size={9.5} fill={MUTED} weight={800}>
            {sit}
          </M>
          <M x="756" y={168 + i * 66} size={11} fill={tone} weight={800}>
            {verdict}
          </M>
        </g>
      ))}
      <M x="756" y="416" size={9.5} fill={MUTED}>
        α is chosen; β follows from the effect size and n
      </M>
    </Scene>
  )
}

export function ZVersusTScene() {
  return (
    <Scene caption="σ known or estimated — that single question decides which table you open">
      <Wire d="M60 340 L620 340" stroke={MUTED} width="1.6" />
      {[
        [1, 0.72, 'ν = 2 · 4.30', RED],
        [0.86, 0.85, 'ν = 5 · 2.57', GOLD],
        [0.98, 0.97, 'ν = 30 · 2.04', DOM],
      ].map(([peak, sharp, lab, tone], i) => (
        <g key={lab} className={`catm-draw catm-delay-${i}`}>
          <Curve
            pts={Array.from({ length: 81 }, (_, k) => {
              const t = -3 + (6 * k) / 80
              // Heavier tails at low ν: a fatter exponent does the job visually.
              const v = peak * Math.exp(-(Math.abs(t) ** (1 + sharp)) / 2)
              return [340 + (t * 480) / 6, 340 - 200 * v]
            })}
            stroke={tone}
            width="2.4"
          />
          <M x="600" y={168 + i * 24} size={9.5} fill={tone} anchor="end" weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <Curve
        pts={Array.from({ length: 81 }, (_, k) => {
          const t = -3 + (6 * k) / 80
          return [340 + (t * 480) / 6, 340 - 200 * Math.exp(-(t * t) / 2)]
        })}
        stroke={N}
        width="3.2"
        className="catm-draw catm-delay-3"
      />
      <M x="600" y="240" size={9.5} fill={N} anchor="end" weight={800}>
        normal · 1.96
      </M>
      <M x="340" y="372" size={10} fill={MUTED} weight={800}>
        the t curves have heavier tails, so their critical values are larger
      </M>

      <g className="catm-slide-in catm-delay-4">
        <rect x="660" y="120" width="192" height="220" rx="12" fill={WHITE} stroke={GOLD} strokeWidth="2.6" />
        <M x="756" y="150" size={11} fill={GOLD} weight={800}>
          which test?
        </M>
        <rect x="680" y="172" width="152" height="70" rx="10" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.2" />
        <M x="756" y="196" size={10.5} fill={GREEN} weight={800}>
          σ known
        </M>
        <M x="756" y="222" size={13} fill={N} weight={800}>
          z
        </M>
        <rect x="680" y="254" width="152" height="70" rx="10" fill={DOM} fillOpacity="0.1" stroke={DOM} strokeWidth="2.2" />
        <M x="756" y="278" size={10.5} fill={DOM} weight={800}>
          σ estimated
        </M>
        <M x="756" y="304" size={12} fill={N} weight={800}>
          t, ν = n − 1
        </M>
      </g>
      <g className="catm-emerge">
        <rect x="140" y="404" width="620" height="46" rx="11" fill={SKY} stroke={ROSE} strokeWidth="2.3" />
        <M x="450" y="433" size={11} fill={ROSE} weight={800}>
          by ν = 30 the difference is 2.04 against 1.96 — which is why people stop caring
        </M>
      </g>
    </Scene>
  )
}

export function ConfidenceIntervalScene() {
  // A deterministic scatter: a screenshot must not change between runs.
  const offsets = [0.1, -0.5, 0.3, 0.8, -0.2, 0.55, -0.7, 0.15, -0.35, 0.62, -0.05, 0.42, -0.6, 0.25, 1.35, -0.28, 0.5, -0.45, 0.2, -0.15]
  return (
    <Scene caption="The interval is random, not the mean — nineteen times in twenty it happens to contain it">
      <Wire d="M300 76 L300 420" stroke={ROSE} width="3" className="catm-draw" />
      <M x="300" y="64" size={10.5} fill={ROSE} weight={800}>
        the true μ
      </M>
      {offsets.map((o, i) => {
        const cx = 300 + o * 78
        const miss = Math.abs(o) > 1
        return (
          <g key={i} className={`catm-cell-in catm-delay-${i % 5}`}>
            <Wire d={`M${(cx - 62).toFixed(1)} ${84 + i * 17} L${(cx + 62).toFixed(1)} ${84 + i * 17}`} stroke={miss ? RED : GREEN} width="3" />
            <Dot cx={cx.toFixed(1)} cy={84 + i * 17} r="3.6" fill={miss ? RED : GREEN} />
          </g>
        )
      })}
      <g className="catm-emerge">
        <rect x="60" y="428" width="420" height="34" rx="9" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="2.3" />
        <M x="270" y="451" size={11.5} fill={GREEN} weight={800}>
          19 of 20 contain the true value
        </M>
      </g>

      <g className="catm-cell-in catm-delay-2">
        <rect x="520" y="86" width="332" height="150" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.4" />
        <M x="686" y="112" size={10.5} fill={FN} weight={800}>
          how it is built
        </M>
        <M x="686" y="150" size={14} fill={N} weight={800}>
          x̄ ± t · (s/√n)
        </M>
        {[
          ['x̄', 'the estimate', 600],
          ['t', 'the confidence', 676],
          ['s/√n', 'the standard error', 760],
        ].map(([sym, what, x], i) => (
          <g key={sym}>
            <Wire d={`M${x} 160 L${x} ${182 + i * 16}`} stroke={MUTED} width="1.4" dash="3 3" />
            <M x={x} y={196 + i * 16} size={8.5} fill={MUTED} weight={800}>
              {what}
            </M>
          </g>
        ))}
      </g>

      <g className="catm-slide-in catm-delay-4">
        <rect x="520" y="256" width="332" height="150" rx="12" fill={WHITE} stroke={GOLD} strokeWidth="2.3" />
        <M x="686" y="282" size={10.5} fill={GOLD} weight={800}>
          more confidence costs width
        </M>
        {[
          ['90%', 54, GREEN],
          ['95%', 74, GOLD],
          ['99%', 106, RED],
        ].map(([lab, w, tone], i) => (
          <g key={lab}>
            <Wire d={`M${686 - w} ${316 + i * 30} L${686 + w} ${316 + i * 30}`} stroke={tone} width="3.4" />
            <M x="556" y={320 + i * 30} size={10} fill={tone} weight={800}>
              {lab}
            </M>
          </g>
        ))}
        <M x="686" y="392" size={9.5} fill={MUTED}>
          a 100% interval would say nothing at all
        </M>
      </g>
    </Scene>
  )
}

export function ChiSquareScene() {
  const obs = [18, 26, 22, 14, 12, 8]
  const exp = [16.7, 16.7, 16.7, 16.7, 16.7, 16.7]
  return (
    <Scene caption="Square the differences, divide by what you expected, add them up — that is the whole statistic">
      <Wire d="M60 240 L340 240" stroke={MUTED} width="1.6" />
      <Columns x={60} y={240} w={280} items={obs.map((v, i) => [String(i + 1), v * 0.052, FN])} max={1.6} labelSize={9} />
      {exp.map((v, i) => (
        <Wire
          key={i}
          d={`M${64 + i * 46.7} ${240 - v * 0.052 * 150} L${102 + i * 46.7} ${240 - v * 0.052 * 150}`}
          stroke={OP}
          width="2.6"
          dash="5 4"
          className={`catm-draw catm-delay-${i % 5}`}
        />
      ))}
      <M x="200" y="76" size={10.5} fill={FN} weight={800}>
        observed
      </M>
      <M x="200" y="96" size={10.5} fill={OP} weight={800}>
        expected, dashed
      </M>
      <M x="200" y="278" size={9.5} fill={MUTED}>
        six categories
      </M>

      <rect x="380" y="70" width="330" height="26" rx="7" fill={N} />
      {['O', 'E', '(O−E)²/E'].map((h, i) => (
        <M key={h} x={430 + i * 110} y="88" size={9.5} fill={WHITE} weight={800}>
          {h}
        </M>
      ))}
      {obs.map((o, i) => (
        <g key={i} className={`catm-cell-in catm-delay-${i % 5}`}>
          <rect x="380" y={102 + i * 34} width="330" height="28" rx="6" fill={WHITE} stroke={MUTED} strokeWidth="1.5" />
          <M x="430" y={121 + i * 34} size={10} fill={N}>
            {o}
          </M>
          <M x="540" y={121 + i * 34} size={10} fill={MUTED}>
            16.7
          </M>
          <M x="650" y={121 + i * 34} size={10} fill={DOM} weight={800}>
            {(((o - 16.7) ** 2) / 16.7).toFixed(2)}
          </M>
        </g>
      ))}
      <g className="catm-emerge">
        <rect x="380" y="308" width="330" height="36" rx="8" fill={DOM} fillOpacity="0.14" stroke={DOM} strokeWidth="2.6" />
        <M x="470" y="332" size={10.5} fill={DOM} weight={800}>
          χ² =
        </M>
        <M x="650" y="332" size={12.5} fill={DOM} weight={800}>
          {obs.reduce((a, o) => a + ((o - 16.7) ** 2) / 16.7, 0).toFixed(2)}
        </M>
      </g>

      <Wire d="M740 300 L860 300" stroke={MUTED} width="1.6" />
      <Curve
        pts={Array.from({ length: 61 }, (_, i) => {
          const t = 0.02 + (i / 60) * 3
          // A χ² shape with 5 degrees of freedom, scaled to the box.
          return [740 + (t / 3) * 116, 300 - 120 * (t ** 1.5 * Math.exp(-t * 1.5))]
        })}
        stroke={FN}
        width="2.6"
        className="catm-draw catm-delay-3"
      />
      <Wire d="M822 300 L822 226" stroke={ROSE} width="2" dash="4 4" />
      <M x="822" y="320" size={9} fill={ROSE} weight={800}>
        χ²crit
      </M>
      <M x="800" y="212" size={9} fill={MUTED} anchor="end">
        upper tail
      </M>
      <g className="catm-slide-in catm-delay-4">
        <rect x="730" y="346" width="130" height="104" rx="11" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="795" y="372" size={9.5} fill={GOLD} weight={800}>
          degrees of
        </M>
        <M x="795" y="390" size={9.5} fill={GOLD} weight={800}>
          freedom
        </M>
        <M x="795" y="416" size={9.5} fill={N}>
          categories − 1
        </M>
        <M x="795" y="436" size={9.5} fill={N}>
          − estimated params
        </M>
      </g>
    </Scene>
  )
}

/* ── Module 5 — linear programming ──────────────────────────────── */

/** A simplex tableau drawn as a labelled grid. `mark` boxes one cell, `col`
 *  highlights the entering column and `row` the leaving row. */
function Tableau({ x, y, cols = [], rows = [], basis = [], obj = [], cw = 62, rh = 30, accent = FN, mark, col = -1, row = -1, className = '' }) {
  const [X, Y, CW, RH] = [n(x), n(y), n(cw), n(rh)]
  const w = cols.length * CW
  return (
    <g transform={`translate(${X},${Y})`}>
      <g className={className}>
        {col >= 0 ? <rect x={col * CW} y={-4} width={CW} height={(rows.length + 1) * RH + 30} rx="6" fill={OP} fillOpacity="0.14" /> : null}
        {row >= 0 ? <rect x={-2} y={RH * (row + 1) - RH / 2 + 8} width={w + 4} height={RH} rx="6" fill={DOM} fillOpacity="0.14" /> : null}
        {cols.map((c, i) => (
          <M key={c} x={i * CW + CW / 2} y={8} size={10} fill={accent} weight={800}>
            {c}
          </M>
        ))}
        <Wire d={`M0 18 L${w} 18`} stroke={accent} width="2" />
        {rows.map((r, ri) => (
          <g key={ri}>
            <M x={-14} y={RH * (ri + 1) + 12} size={9.5} fill={MUTED} anchor="end" weight={800}>
              {basis[ri] || ''}
            </M>
            {r.map((v, ci) => (
              <M key={ci} x={ci * CW + CW / 2} y={RH * (ri + 1) + 12} size={10.5} fill={N}>
                {String(v)}
              </M>
            ))}
          </g>
        ))}
        <Wire d={`M0 ${RH * (rows.length + 1) - 4} L${w} ${RH * (rows.length + 1) - 4}`} stroke={accent} width="2" />
        {obj.map((v, ci) => (
          <M key={ci} x={ci * CW + CW / 2} y={RH * (rows.length + 1) + 18} size={10.5} fill={Number(v) < 0 ? RED : MUTED} weight={Number(v) < 0 ? 800 : 700}>
            {String(v)}
          </M>
        ))}
        <M x={-14} y={RH * (rows.length + 1) + 18} size={9.5} fill={MUTED} anchor="end" weight={800}>
          z
        </M>
        {mark ? (
          <rect x={mark[1] * CW + 6} y={RH * (mark[0] + 1) - 6} width={CW - 12} height="24" rx="5" fill="none" stroke={ROSE} strokeWidth="2.6" />
        ) : null}
      </g>
    </g>
  )
}

export function OptimizationAnatomyScene() {
  return (
    <Scene caption="Unconstrained, the gradient vanishes at the optimum; constrained, it usually does not">
      {[
        ['decision variables', 'x₁, x₂ ≥ 0', FN],
        ['objective', 'maximise 3x₁ + 5x₂', OP],
        ['constraints', 'x₁ ≤ 4, 2x₂ ≤ 12, 3x₁+2x₂ ≤ 18', DOM],
      ].map(([tag, body, tone], i) => (
        <g key={tag} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="40" y={72 + i * 92} width="400" height="76" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x="66" y={98 + i * 92} size={10} fill={tone} anchor="start" weight={800}>
            {tag}
          </M>
          <M x="240" y={130 + i * 92} size={12.5} fill={N} weight={800}>
            {body}
          </M>
        </g>
      ))}
      <Wire d="M470 190 L520 190" stroke={GOLD} width="3" marker="url(#catArrG)" className="catm-flow-arrow" />
      <Plane cx="670" cy="192" r="116" xLabel="x₁" yLabel="x₂" tone={MUTED} half />
      <Region
        pts={[[670, 192], [774, 192], [774, 130], [726, 100], [670, 100]]}
        tone={GREEN}
        className="catm-fade-in catm-delay-2"
        label="feasible"
        labelAt={[716, 156]}
      />

      <rect x="40" y="356" width="400" height="106" rx="12" fill={WHITE} stroke={MUTED} strokeWidth="2.2" />
      <M x="240" y="380" size={10} fill={MUTED} weight={800}>
        unconstrained
      </M>
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const t = -1 + (2 * i) / 40
          return [240 + t * 150, 440 - 48 * (1 - t * t)]
        })}
        stroke={FN}
        width="2.6"
        className="catm-draw catm-delay-3"
      />
      <Wire d="M190 392 L290 392" stroke={GREEN} width="2.6" />
      <M x="330" y="424" size={9} fill={GREEN} anchor="start" weight={800}>
        flat tangent
      </M>

      <rect x="470" y="356" width="382" height="106" rx="12" fill={WHITE} stroke={GOLD} strokeWidth="2.2" />
      <M x="661" y="380" size={10} fill={GOLD} weight={800}>
        constrained
      </M>
      <Curve
        pts={Array.from({ length: 41 }, (_, i) => {
          const t = -1 + (2 * i) / 40
          return [661 + t * 150, 440 - 48 * (1 - t * t)]
        })}
        stroke={FN}
        width="2.6"
        opacity="0.4"
        className="catm-draw catm-delay-3"
      />
      <Wire d="M736 368 L736 452" stroke={ROSE} width="2.6" />
      <Dot cx="736" cy="416" r="7" fill={GOLD} className="catm-pop" />
      <Phasor ox="736" oy="416" ang={125} len={38} label="" tone={GOLD} width="2.4" />
      <M x="790" y="400" size={9} fill={GOLD} anchor="start" weight={800}>
        gradient ≠ 0
      </M>
    </Scene>
  )
}

export function FormulationWorkflowScene() {
  const rows = [
    ['machine time is limited to 240 hours', '4x₁ + 2x₂ ≤ 240', FN],
    ['at least 50 units must be produced', 'x₁ + x₂ ≥ 50', DOM],
    ['you cannot make a negative quantity', 'x₁, x₂ ≥ 0', GREEN],
    ['maximise the total profit', 'max 3x₁ + 5x₂', OP],
  ]
  return (
    <Scene caption="The translation is mechanical — and the units check is the only thing that catches a wrong one">
      <rect x="40" y="62" width="812" height="28" rx="8" fill={N} />
      <M x="240" y="82" size={10.5} fill={WHITE} weight={800}>
        what the problem says
      </M>
      <M x="660" y="82" size={10.5} fill={WHITE} weight={800}>
        what you write
      </M>
      {rows.map(([plain, math, tone], i) => (
        <g key={plain} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="40" y={100 + i * 74} width="380" height="60" rx="11" fill={WHITE} stroke={MUTED} strokeWidth="1.9" />
          <foreignObject x="56" y={108 + i * 74} width="348" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 11.5px/1.2 system-ui,sans-serif', color: '#5b5b7a', display: 'flex', alignItems: 'center', height: '100%' }}>
              {plain}
            </div>
          </foreignObject>
          <Wire d={`M430 ${130 + i * 74} L462 ${130 + i * 74}`} stroke={tone} width="2.4" marker={`url(#${markerFor(tone)})`} className="catm-flow-arrow" />
          <rect x="472" y={100 + i * 74} width="380" height="60" rx="11" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth="2.3" />
          <M x="662" y={136 + i * 74} size={13} fill={N} weight={800}>
            {math}
          </M>
        </g>
      ))}

      <g className="catm-emerge">
        <rect x="140" y="410" width="620" height="54" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.4" />
        <M x="290" y="432" size={10.5} fill={GOLD} weight={800}>
          hours/unit × units
        </M>
        <M x="450" y="432" size={12} fill={N} weight={800}>
          =
        </M>
        <M x="600" y="432" size={10.5} fill={GOLD} weight={800}>
          hours
        </M>
        <M x="450" y="454" size={9.5} fill={GREEN} weight={800}>
          ✓ both sides carry the same units — the constraint is well formed
        </M>
      </g>
    </Scene>
  )
}

export function LinearityAssumptionsScene() {
  const cards = [
    ['proportionality', 'cost per unit is constant', 'bulk discounts break it', FN],
    ['additivity', 'activities just add up', 'shared setup breaks it', DOM],
    ['divisibility', 'fractional answers allowed', 'whole aircraft break it', OP],
    ['certainty', 'coefficients are known', 'uncertain demand breaks it', GOLD],
  ]
  return (
    <Scene caption="Four assumptions, and every one of them is what makes the feasible region convex">
      {cards.map(([name, ok, bad, tone], i) => (
        <g key={name} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={30 + i * 214} y="62" width="196" height="212" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <M x={128 + i * 214} y="88" size={11} fill={tone} weight={800}>
            {name}
          </M>
          <Wire d={`M${52 + i * 214} 188 L${204 + i * 214} 188`} stroke={MUTED} width="1.3" opacity="0.5" />
          <Wire d={`M${52 + i * 214} 188 L${204 + i * 214} ${i === 0 ? 122 : 130}`} stroke={GREEN} width="2.6" />
          <Curve
            pts={Array.from({ length: 21 }, (_, k) => {
              const t = k / 20
              const v = i === 0 ? Math.sqrt(t) : i === 1 ? t * t : i === 2 ? Math.floor(t * 4) / 4 : t
              return [52 + i * 214 + t * 152, 188 - 58 * v]
            })}
            stroke={RED}
            width="2.2"
            dash="5 4"
          />
          <M x={128 + i * 214} y="214" size={9.5} fill={GREEN} weight={800}>
            {ok}
          </M>
          <M x={128 + i * 214} y="238" size={9} fill={RED}>
            {bad}
          </M>
        </g>
      ))}

      <rect x="60" y="298" width="380" height="164" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <M x="250" y="324" size={10.5} fill={GREEN} weight={800}>
        convex: one optimum, and it is global
      </M>
      <Region pts={[[120, 430], [220, 356], [330, 364], [380, 430]]} tone={GREEN} className="catm-fade-in catm-delay-2" />
      <Dot cx="330" cy="364" r="8" fill={GREEN} className="catm-pop" />
      <M x="410" y="360" size={14} fill={GREEN} anchor="end" weight={800}>
        ✓
      </M>

      <rect x="470" y="298" width="382" height="164" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.4" />
      <M x="661" y="324" size={10.5} fill={RED} weight={800}>
        non-convex: several local optima
      </M>
      <Region pts={[[520, 430], [580, 358], [640, 412], [700, 350], [800, 430]]} tone={RED} className="catm-fade-in catm-delay-3" opacity={0.12} />
      <Dot cx="580" cy="358" r="7" fill={RED} className="catm-pop" />
      <Dot cx="700" cy="350" r="7" fill={RED} className="catm-pop catm-delay-2" />
      <M x="820" y="360" size={14} fill={RED} anchor="end" weight={800}>
        ✗
      </M>
    </Scene>
  )
}

export function FormConversionScene() {
  const rows = [
    ['min z', 'max (−z)', 'remember to negate the answer back', FN],
    ['a₁x₁ + a₂x₂ ≥ b', '−a₁x₁ − a₂x₂ ≤ −b', 'the inequality flips with the sign', DOM],
    ['… ≤ −b', 'multiply the row by −1', 'a negative RHS is not allowed', OP],
    ['x unrestricted', 'x = x⁺ − x⁻, both ≥ 0', 'one variable becomes two', GOLD],
  ]
  return (
    <Scene caption="Four mechanical moves that put any linear programme into the one form the simplex expects">
      {rows.map(([before, after, warn, tone], i) => (
        <g key={before} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="40" y={78 + i * 96} width="812" height="80" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.3" />
          <rect x="64" y={94 + i * 96} width="300" height="48" rx="10" fill={MUTED} fillOpacity="0.08" stroke={MUTED} strokeWidth="1.8" />
          <M x="214" y={124 + i * 96} size={12.5} fill={N} weight={800}>
            {before}
          </M>
          <Wire d={`M376 ${118 + i * 96} L420 ${118 + i * 96}`} stroke={tone} width="2.6" marker={`url(#${markerFor(tone)})`} className="catm-flow-arrow" />
          <rect x="432" y={94 + i * 96} width="300" height="48" rx="10" fill={tone} fillOpacity="0.12" stroke={tone} strokeWidth="2.2" />
          <M x="582" y={124 + i * 96} size={12.5} fill={N} weight={800}>
            {after}
          </M>
          <g className="catm-pulse">
            <rect x="748" y={98 + i * 96} width="88" height="40" rx="9" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2" />
            <M x="792" y={116 + i * 96} size={11} fill={RED} weight={800}>
              ⚠
            </M>
          </g>
          <foreignObject x="744" y={118 + i * 96} width="96" height="30">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 7.5px/1.1 system-ui,sans-serif', color: '#dc2626', textAlign: 'center' }}>
              {warn}
            </div>
          </foreignObject>
        </g>
      ))}
      <M x="450" y="474" size={10} fill={MUTED} weight={800}>
        do all four before you draw a single tableau
      </M>
    </Scene>
  )
}

export function FeasibleRegionScene() {
  return (
    <Scene caption="Each constraint cuts a half-plane away; what survives all of them is the feasible region">
      <Wire d="M120 400 L500 400" stroke={MUTED} width="2.2" marker="url(#catArr)" />
      <Wire d="M120 400 L120 90" stroke={MUTED} width="2.2" marker="url(#catArr)" />
      <M x="490" y="428" size={10.5} fill={MUTED} anchor="end" weight={800}>
        x₁
      </M>
      <M x="110" y="86" size={10.5} fill={MUTED} anchor="end" weight={800}>
        x₂
      </M>
      {/* Origin (120, 400), 35 px per x₁ and 30 px per x₂, so every vertex below
          is the exact intersection the constraints give. */}
      {[
        ['x₁ ≤ 4', [[260, 400], [260, 100]], FN],
        ['2x₂ ≤ 12', [[120, 220], [460, 220]], DOM],
        ['3x₁ + 2x₂ ≤ 18', [[120, 130], [330, 400]], OP],
      ].map(([lab, seg, tone], i) => (
        <g key={lab} className={`catm-draw catm-delay-${i}`}>
          <Wire d={`M${seg[0][0]} ${seg[0][1]} L${seg[1][0]} ${seg[1][1]}`} stroke={tone} width="2.8" />
          <M x={seg[1][0] + (i === 0 ? 0 : 10)} y={seg[1][1] - 8} size={9.5} fill={tone} anchor={i === 0 ? 'middle' : 'start'} weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <Region
        pts={[[120, 400], [260, 400], [260, 310], [190, 220], [120, 220]]}
        tone={GREEN}
        className="catm-fade-in catm-delay-3"
      />
      {[[120, 400, 'A'], [260, 400, 'B'], [260, 310, 'C'], [190, 220, 'D'], [120, 220, 'E']].map(([px, py, lab], i) => (
        <g key={lab} className={`catm-pop catm-delay-${i % 5}`}>
          <Dot cx={px} cy={py} r="7" fill={GREEN} />
          <M x={px - 16} y={py - 10} size={10} fill={GREEN} weight={800}>
            {lab}
          </M>
        </g>
      ))}
      <g className="catm-pulse">
        <circle cx="120" cy="400" r="14" fill="none" stroke={ROSE} strokeWidth="2.2" />
        <M x="98" y="432" size={9} fill={ROSE} anchor="end" weight={800}>
          test point ✓
        </M>
      </g>

      <rect x="560" y="76" width="292" height="176" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <M x="706" y="102" size={10.5} fill={GREEN} weight={800}>
        convex
      </M>
      <Region pts={[[600, 220], [660, 136], [760, 146], [810, 220]]} tone={GREEN} className="catm-fade-in catm-delay-4" />
      <Wire d="M624 206 L790 172" stroke={N} width="2.4" className="catm-draw catm-delay-4" />
      <Dot cx="624" cy="206" r="5" fill={N} />
      <Dot cx="790" cy="172" r="5" fill={N} />
      <M x="706" y="240" size={9.5} fill={GREEN} weight={800}>
        the whole segment stays inside
      </M>

      <rect x="560" y="272" width="292" height="176" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.4" />
      <M x="706" y="298" size={10.5} fill={RED} weight={800}>
        not convex — impossible here
      </M>
      <Region pts={[[600, 420], [650, 336], [706, 396], [762, 330], [810, 420]]} tone={RED} opacity={0.12} className="catm-fade-in catm-delay-4" />
      <Wire d="M642 372 L768 366" stroke={RED} width="2.4" dash="5 4" />
      <M x="706" y="440" size={9.5} fill={RED} weight={800}>
        linear constraints cannot produce this
      </M>
    </Scene>
  )
}

export function CornerPointScene() {
  /* Origin (100, 400), 35 px per x₁ and 30 px per x₂. For z = 3x₁ + 5x₂ held
     constant, x₂ falls as x₁ rises, so on screen the objective line slopes
     DOWN to the right — it was drawn sloping up, and therefore last touched an
     edge instead of the optimal vertex. */
  const yOf = (c, x) => 400 - 6 * c + 0.5143 * (x - 100)
  const verts = [
    ['A (0,0)', 0, 100, 400],
    ['B (4,0)', 12, 240, 400],
    ['C (4,3)', 27, 240, 310],
    ['D (2,6)', 36, 170, 220],
    ['E (0,6)', 30, 100, 220],
  ]
  return (
    <Scene caption="Slide the objective line outwards; the last point it touches is the answer">
      <Wire d="M100 400 L470 400" stroke={MUTED} width="2.2" marker="url(#catArr)" />
      <Wire d="M100 400 L100 130" stroke={MUTED} width="2.2" marker="url(#catArr)" />
      <M x="460" y="424" size={10.5} fill={MUTED} anchor="end" weight={800}>
        x₁
      </M>
      <M x="90" y="126" size={10.5} fill={MUTED} anchor="end" weight={800}>
        x₂
      </M>
      <Region pts={[[100, 400], [240, 400], [240, 310], [170, 220], [100, 220]]} tone={GREEN} className="catm-fade-in" />
      {verts.map(([lab, , px, py], i) => (
        <g key={lab} className={`catm-pop catm-delay-${i % 5}`}>
          <Dot cx={px} cy={py} r="7" fill={i === 3 ? OP : GREEN} />
          <M x={px - 16} y={py - 10} size={10} fill={i === 3 ? OP : GREEN} weight={800}>
            {lab[0]}
          </M>
        </g>
      ))}
      {[22, 28, 32, 36].map((c, k) => (
        <Wire
          key={c}
          d={`M90 ${yOf(c, 90).toFixed(1)} L300 ${yOf(c, 300).toFixed(1)}`}
          stroke={c === 36 ? OP : MUTED}
          width={c === 36 ? 3 : 1.8}
          dash={c === 36 ? undefined : '6 5'}
          opacity={c === 36 ? 1 : 0.5}
          className={`catm-draw catm-delay-${k}`}
        />
      ))}
      <M x="316" y="290" size={10} fill={OP} anchor="start" weight={800}>
        the objective line,
      </M>
      <M x="316" y="308" size={10} fill={OP} anchor="start" weight={800}>
        sliding out
      </M>

      <rect x="500" y="70" width="352" height="28" rx="8" fill={N} />
      <M x="600" y="90" size={10.5} fill={WHITE} weight={800}>
        vertex
      </M>
      <M x="760" y="90" size={10.5} fill={WHITE} weight={800}>
        z = 3x₁ + 5x₂
      </M>
      {verts.map(([name, z], i) => (
        <g key={name} className={`catm-cell-in catm-delay-${i % 5}`}>
          <rect
            x="500"
            y={106 + i * 44}
            width="352"
            height="36"
            rx="8"
            fill={i === 3 ? OP : WHITE}
            fillOpacity={i === 3 ? 0.14 : 1}
            stroke={i === 3 ? OP : MUTED}
            strokeWidth={i === 3 ? 3 : 1.7}
          />
          <M x="600" y={130 + i * 44} size={11} fill={N}>
            {name}
          </M>
          <M x="760" y={130 + i * 44} size={11.5} fill={i === 3 ? OP : MUTED} weight={i === 3 ? 800 : 700}>
            {z}
          </M>
        </g>
      ))}
      <g className="catm-emerge">
        <rect x="500" y="336" width="352" height="46" rx="11" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="2.6" />
        <M x="676" y="365" size={12.5} fill={GREEN} weight={800}>
          maximum 36 at D = (2, 6)
        </M>
      </g>
      <g className="catm-slide-in catm-delay-4">
        <rect x="500" y="396" width="352" height="66" rx="11" fill={WHITE} stroke={GOLD} strokeWidth="2.3" />
        <M x="676" y="420" size={10} fill={GOLD} weight={800}>
          if the line ends parallel to an edge
        </M>
        <M x="676" y="444" size={10} fill={N}>
          every point on that edge is optimal
        </M>
      </g>
    </Scene>
  )
}

export function LpSpecialCasesScene() {
  return (
    <Scene caption="Three failures, and only one of them is a mathematical problem — the other two are modelling problems">
      {[
        ['infeasible', 'the constraints contradict each other', RED],
        ['unbounded', 'z grows without limit', OP],
        ['multiple optima', 'a whole edge is optimal', GREEN],
      ].map(([name, note, tone], i) => (
        <g key={name} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={30 + i * 286} y="66" width="268" height="300" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.4" />
          <M x={164 + i * 286} y="92" size={12} fill={tone} weight={800}>
            {name}
          </M>
          <Wire d={`M${62 + i * 286} 320 L${272 + i * 286} 320`} stroke={MUTED} width="1.8" marker="url(#catArrM)" />
          <Wire d={`M${62 + i * 286} 320 L${62 + i * 286} 122`} stroke={MUTED} width="1.8" marker="url(#catArrM)" />
          {i === 0 ? (
            <g>
              <Region pts={[[62 + i * 286, 320], [130 + i * 286, 320], [62 + i * 286, 250]]} tone={FN} opacity={0.18} />
              <Region pts={[[200 + i * 286, 180], [272 + i * 286, 180], [272 + i * 286, 250]]} tone={DOM} opacity={0.18} />
              <g className="catm-pulse">
                <M x={164 + i * 286} y="250" size={18} fill={RED} weight={800}>
                  ∅
                </M>
              </g>
            </g>
          ) : null}
          {i === 1 ? (
            <g>
              <Region pts={[[120 + i * 286, 320], [272 + i * 286, 320], [272 + i * 286, 130], [160 + i * 286, 250]]} tone={OP} opacity={0.14} />
              {[0, 1, 2].map((k) => (
                <Wire
                  key={k}
                  d={`M${110 + i * 286 + k * 44} 320 L${200 + i * 286 + k * 44} 180`}
                  stroke={OP}
                  width={k === 2 ? 2.8 : 1.8}
                  dash={k === 2 ? undefined : '5 4'}
                  opacity={k === 2 ? 1 : 0.5}
                  className={`catm-draw catm-delay-${k}`}
                />
              ))}
              <Wire d={`M${240 + i * 286} 160 L${276 + i * 286} 128`} stroke={OP} width="2.4" marker="url(#catArrO)" className="catm-flow-arrow" />
            </g>
          ) : null}
          {i === 2 ? (
            <g>
              <Region pts={[[62 + i * 286, 320], [200 + i * 286, 320], [200 + i * 286, 230], [120 + i * 286, 170], [62 + i * 286, 170]]} tone={GREEN} />
              <Wire d={`M${120 + i * 286} 170 L${200 + i * 286} 230`} stroke={GREEN} width="6" className="catm-pulse" />
              <Dot cx={120 + i * 286} cy="170" r="7" fill={GREEN} />
              <Dot cx={200 + i * 286} cy="230" r="7" fill={GREEN} />
            </g>
          ) : null}
          <M x={164 + i * 286} y="348" size={9.5} fill={tone} weight={800}>
            {note}
          </M>
        </g>
      ))}
      {[
        'go back and check the constraints — you have written two that cannot both hold',
        'a real problem is never unbounded: a constraint is missing',
        'pick between them on a secondary criterion the model did not capture',
      ].map((t, i) => (
        <g key={t} className={`catm-slide-in catm-delay-${i}`}>
          <rect x={30 + i * 286} y="386" width="268" height="72" rx="11" fill={[RED, OP, GREEN][i]} fillOpacity="0.09" stroke={[RED, OP, GREEN][i]} strokeWidth="2.2" />
          <foreignObject x={46 + i * 286} y="394" width="236" height="56">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '700 10px/1.25 system-ui,sans-serif', color: '#1e1b3a', display: 'flex', alignItems: 'center', height: '100%', justifyContent: 'center', textAlign: 'center' }}>
              {t}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

export function SlackSurplusScene() {
  return (
    <Scene caption="The slack is not bookkeeping — it is the amount of the resource you did not use">
      <rect x="40" y="70" width="812" height="170" rx="12" fill={WHITE} stroke={FN} strokeWidth="2.3" />
      <M x="446" y="96" size={11} fill={FN} weight={800}>
        a resource limit: 4x₁ + 2x₂ ≤ 240 hours
      </M>
      <rect x="80" y="120" width="730" height="46" rx="9" fill={SKY} stroke={FN} strokeWidth="2" />
      <g className="catm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
        <rect x="80" y="120" width="560" height="46" rx="9" fill={FN} fillOpacity="0.3" stroke={FN} strokeWidth="2" />
      </g>
      <M x="360" y="149" size={11.5} fill={FN} weight={800}>
        used: 184 hours
      </M>
      <M x="725" y="149" size={11.5} fill={GREEN} weight={800}>
        slack: 56
      </M>
      <M x="446" y="200" size={13} fill={N} weight={800}>
        4x₁ + 2x₂ + s₁ = 240,  s₁ ≥ 0
      </M>
      <M x="446" y="224" size={9.5} fill={MUTED}>
        the inequality has become an equation, which is what the simplex needs
      </M>

      <rect x="40" y="258" width="812" height="170" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.3" />
      <M x="446" y="284" size={11} fill={DOM} weight={800}>
        a minimum requirement: x₁ + x₂ ≥ 50 units
      </M>
      <rect x="80" y="308" width="730" height="46" rx="9" fill={SKY} stroke={DOM} strokeWidth="2" />
      <g className="catm-bar" style={{ transformBox: 'fill-box', transformOrigin: 'left center' }}>
        <rect x="80" y="308" width="640" height="46" rx="9" fill={DOM} fillOpacity="0.3" stroke={DOM} strokeWidth="2" />
      </g>
      <Wire d="M540 300 L540 362" stroke={ROSE} width="2.8" />
      <M x="540" y="292" size={9.5} fill={ROSE} weight={800}>
        the minimum, 50
      </M>
      <M x="630" y="337" size={11} fill={OP} weight={800}>
        surplus: 14
      </M>
      <M x="446" y="388" size={13} fill={N} weight={800}>
        x₁ + x₂ − s₂ = 50,  s₂ ≥ 0
      </M>
      <M x="446" y="412" size={9.5} fill={MUTED}>
        subtracted, not added — and it gives no identity column, which is why Big-M exists
      </M>

      <g className="catm-emerge">
        <rect x="240" y="444" width="420" height="30" rx="9" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.3" />
        <M x="450" y="465" size={11} fill={GREEN} weight={800}>
          slack = 0 means the resource is fully used — the constraint binds
        </M>
      </g>
    </Scene>
  )
}

export function BasisVertexScene() {
  const rows = [
    ['A (0,0)', 'x₁ = 0, x₂ = 0', 's₁ s₂ s₃'],
    ['B (4,0)', 'x₂ = 0, s₁ = 0', 'x₁ s₂ s₃'],
    ['C (4,3)', 's₁ = 0, s₃ = 0', 'x₁ x₂ s₂'],
    ['D (2,6)', 's₂ = 0, s₃ = 0', 'x₁ x₂ s₁'],
  ]
  return (
    <Scene caption="Setting a non-basic variable to zero IS the statement that you are on that constraint boundary">
      <Wire d="M90 380 L430 380" stroke={MUTED} width="2.2" marker="url(#catArr)" />
      <Wire d="M90 380 L90 110" stroke={MUTED} width="2.2" marker="url(#catArr)" />
      {/* Origin (90, 380), 34 px per x₁ and 28.3 px per x₂ — the same scale the
          vertex table below is read against. */}
      <Region pts={[[90, 380], [226, 380], [226, 295], [158, 210], [90, 210]]} tone={GREEN} className="catm-fade-in" />
      {[[90, 380, 'A'], [226, 380, 'B'], [226, 295, 'C'], [158, 210, 'D']].map(([px, py, lab], i) => (
        <g key={lab} className={`catm-pop catm-delay-${i}`}>
          <Dot cx={px} cy={py} r="8" fill={GREEN} />
          <M x={px - 18} y={py - 10} size={11} fill={GREEN} weight={800}>
            {lab}
          </M>
          <Wire d={`M${px + 12} ${py} L${470} ${126 + i * 76}`} stroke={MUTED} width="1.4" dash="4 4" opacity="0.5" />
        </g>
      ))}
      <g className="catm-pulse">
        <Wire d="M226 295 L158 210" stroke={OP} width="5" />
      </g>
      <M x="196" y="288" size={9.5} fill={OP} weight={800}>
        adjacent vertices share an edge
      </M>

      <rect x="480" y="76" width="372" height="28" rx="8" fill={N} />
      <M x="556" y="96" size={10} fill={WHITE} weight={800}>
        vertex
      </M>
      <M x="680" y="96" size={10} fill={WHITE} weight={800}>
        zero here
      </M>
      <M x="806" y="96" size={10} fill={WHITE} weight={800}>
        basic
      </M>
      {rows.map(([name, zero, basic], i) => (
        <g key={name} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="480" y={112 + i * 76} width="372" height="62" rx="10" fill={WHITE} stroke={GREEN} strokeWidth="2" />
          <M x="556" y={148 + i * 76} size={11} fill={N} weight={800}>
            {name}
          </M>
          <M x="680" y={148 + i * 76} size={10} fill={RED}>
            {zero}
          </M>
          <M x="806" y={148 + i * 76} size={10} fill={GREEN} weight={800}>
            {basic}
          </M>
        </g>
      ))}
      <g className="catm-flow-arrow">
        <Wire d="M462 268 L462 344" stroke={OP} width="2.6" marker="url(#catArrO)" />
      </g>
      <M x="196" y="428" size={10} fill={MUTED} weight={800}>
        the simplex walks from one row of this table to the next
      </M>
    </Scene>
  )
}

export function InitialTableauScene() {
  return (
    <Scene caption="The slack columns are already an identity matrix — which is why the origin is a free starting vertex">
      <Tableau
        x="180"
        y="110"
        cw="80"
        rh="42"
        cols={['x₁', 'x₂', 's₁', 's₂', 's₃', 'RHS']}
        rows={[
          [1, 0, 1, 0, 0, 4],
          [0, 2, 0, 1, 0, 12],
          [3, 2, 0, 0, 1, 18],
        ]}
        basis={['s₁', 's₂', 's₃']}
        obj={[-3, -5, 0, 0, 0, 0]}
        accent={FN}
        className="catm-cell-in"
      />
      <g className="catm-pulse">
        <rect x="336" y="128" width="240" height="132" rx="8" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="2.6" />
        <M x="456" y="286" size={10.5} fill={GREEN} weight={800}>
          the starting basis
        </M>
      </g>
      <M x="150" y="104" size={9.5} fill={MUTED} anchor="end" weight={800}>
        basis
      </M>
      <M x="640" y="104" size={9.5} fill={MUTED} anchor="start" weight={800}>
        the b column
      </M>

      <g className="catm-slide-in catm-delay-3">
        <rect x="140" y="322" width="620" height="60" rx="12" fill={RED} fillOpacity="0.09" stroke={RED} strokeWidth="2.4" />
        <M x="450" y="348" size={11.5} fill={RED} weight={800}>
          negative entries in the z row mean improvement is still available
        </M>
        <M x="450" y="370" size={10} fill={MUTED}>
          −3 and −5 here, so the origin is not optimal
        </M>
      </g>
      <g className="catm-emerge">
        <rect x="140" y="396" width="620" height="54" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.3" />
        <M x="450" y="420" size={10.5} fill={GOLD} weight={800}>
          read the current solution straight off
        </M>
        <M x="450" y="442" size={11} fill={N} weight={800}>
          x₁ = x₂ = 0, s₁ = 4, s₂ = 12, s₃ = 18, z = 0
        </M>
      </g>
    </Scene>
  )
}

export function PivotSelectionScene() {
  return (
    <Scene caption="Most negative picks the column; smallest valid ratio picks the row — and zero or negative denominators are excluded">
      <Tableau
        x="120"
        y="96"
        cw="66"
        rh="40"
        cols={['x₁', 'x₂', 's₁', 's₂', 's₃', 'RHS']}
        rows={[
          [1, 0, 1, 0, 0, 4],
          [0, 2, 0, 1, 0, 12],
          [3, 2, 0, 0, 1, 18],
        ]}
        basis={['s₁', 's₂', 's₃']}
        obj={[-3, -5, 0, 0, 0, 0]}
        accent={FN}
        col={1}
        row={1}
        mark={[1, 1]}
        className="catm-cell-in"
      />
      <g className="catm-pulse">
        <circle cx="219" cy="286" r="18" fill="none" stroke={OP} strokeWidth="2.8" />
      </g>
      <M x="186" y="322" size={9.5} fill={OP} weight={800}>
        most negative
      </M>

      {[
        ['4 ÷ 0', 'excluded: zero denominator', RED],
        ['12 ÷ 2 = 6', 'smallest valid ratio', GREEN],
        ['18 ÷ 2 = 9', 'larger', MUTED],
      ].map(([calc, note, tone], i) => (
        <g key={calc} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="540" y={110 + i * 48} width="312" height="40" rx="9" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth={i === 1 ? 2.8 : 1.9} />
          <M x="614" y={135 + i * 48} size={11} fill={N} weight={800}>
            {calc}
          </M>
          <M x="770" y={135 + i * 48} size={9} fill={tone} weight={800}>
            {note}
          </M>
          {i === 0 ? <Wire d="M564 130 L680 130" stroke={RED} width="2.2" /> : null}
        </g>
      ))}

      <Wire d="M100 380 L400 380" stroke={MUTED} width="2" marker="url(#catArr)" />
      <Wire d="M100 380 L100 210" stroke={MUTED} width="2" marker="url(#catArr)" />
      <Region pts={[[100, 380], [200, 380], [200, 300], [160, 268], [100, 268]]} tone={GREEN} className="catm-fade-in catm-delay-2" />
      <Dot cx="100" cy="380" r="7" fill={MUTED} />
      <Dot cx="100" cy="268" r="8" fill={OP} className="catm-pop catm-delay-3" />
      <g className="catm-flow-arrow catm-delay-3">
        <Wire d="M100 370 L100 280" stroke={OP} width="3.4" marker="url(#catArrO)" />
      </g>
      <M x="250" y="326" size={9.5} fill={OP} anchor="start" weight={800}>
        the move along an edge
      </M>
      <M x="250" y="348" size={9} fill={MUTED} anchor="start">
        to the vertex where s₂ becomes binding
      </M>

      <g className="catm-emerge">
        <rect x="540" y="272" width="312" height="60" rx="11" fill={ROSE} fillOpacity="0.1" stroke={ROSE} strokeWidth="2.6" />
        <M x="696" y="298" size={10.5} fill={ROSE} weight={800}>
          the pivot element
        </M>
        <M x="696" y="320" size={11} fill={N}>
          row 2, column x₂ — the value 2
        </M>
      </g>
      <g className="catm-slide-in catm-delay-4">
        <rect x="540" y="348" width="312" height="80" rx="11" fill={WHITE} stroke={GOLD} strokeWidth="2.3" />
        <M x="696" y="374" size={10} fill={GOLD} weight={800}>
          why exclude them
        </M>
        <M x="696" y="398" size={9.5} fill={N}>
          a zero or negative denominator means
        </M>
        <M x="696" y="418" size={9.5} fill={N}>
          that constraint never becomes binding
        </M>
      </g>
    </Scene>
  )
}

export function PivotTerminateScene() {
  return (
    <Scene caption="Each pivot is one step along an edge; no negative entry left means you have arrived">
      {[
        ['initial', [[1, 0, 1, 0, 0, 4], [0, 2, 0, 1, 0, 12], [3, 2, 0, 0, 1, 18]], ['s₁', 's₂', 's₃'], [-3, -5, 0, 0, 0, 0], FN, 0],
        ['after one pivot', [[1, 0, 1, 0, 0, 4], [0, 1, 0, 0.5, 0, 6], [3, 0, 0, -1, 1, 6]], ['s₁', 'x₂', 's₃'], [-3, 0, 0, 2.5, 0, 30], OP, 1],
        ['optimal', [[0, 0, 1, 0.33, -0.33, 2], [0, 1, 0, 0.5, 0, 6], [1, 0, 0, -0.33, 0.33, 2]], ['s₁', 'x₂', 'x₁'], [0, 0, 0, 1.5, 1, 36], GREEN, 2],
      ].map(([tag, rows, basis, obj, tone, i]) => (
        <g key={tag} className={`catm-cell-in catm-delay-${i}`}>
          <rect x={26 + i * 292} y="62" width="272" height="214" rx="12" fill={WHITE} stroke={tone} strokeWidth={i === 2 ? 3.2 : 2.3} />
          <M x={162 + i * 292} y="88" size={10.5} fill={tone} weight={800}>
            {tag}
          </M>
          <Tableau
            x={82 + i * 292}
            y="106"
            cw="34"
            rh="30"
            cols={['x₁', 'x₂', 's₁', 's₂', 's₃', 'b']}
            rows={rows}
            basis={basis}
            obj={obj}
            accent={tone}
            mark={i < 2 ? [i === 0 ? 1 : 2, i === 0 ? 1 : 0] : undefined}
          />
        </g>
      ))}
      {[0, 1].map((i) => (
        <Wire key={i} d={`M${300 + i * 292} 168 L${316 + i * 292} 168`} stroke={MUTED} width="2.4" marker="url(#catArrM)" className="catm-flow-arrow" />
      ))}

      {[0, 1, 2].map((i) => (
        <g key={i} className={`catm-cell-in catm-delay-${i}`}>
          <Wire d={`M${60 + i * 292} 380 L${260 + i * 292} 380`} stroke={MUTED} width="1.6" />
          <Wire d={`M${60 + i * 292} 380 L${60 + i * 292} 300`} stroke={MUTED} width="1.6" />
          <Region
            pts={[[60 + i * 292, 380], [136 + i * 292, 380], [136 + i * 292, 340], [104 + i * 292, 316], [60 + i * 292, 316]]}
            tone={GREEN}
          />
          <Dot
            cx={[60, 60, 104][i] + i * 292}
            cy={[380, 316, 316][i]}
            r="8"
            fill={[MUTED, OP, GREEN][i]}
            className="catm-pop"
          />
          <M x={162 + i * 292} y="406" size={9.5} fill={[MUTED, OP, GREEN][i]} weight={800}>
            {['z = 0 at the origin', 'z = 30 at (0,6)', 'z = 36 at (2,6)'][i]}
          </M>
        </g>
      ))}
      <g className="catm-emerge">
        <rect x="240" y="428" width="420" height="36" rx="10" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.6" />
        <M x="450" y="452" size={11.5} fill={GREEN} weight={800}>
          no negative entries in the z row ⇒ optimal
        </M>
      </g>
    </Scene>
  )
}

export function BigMScene() {
  return (
    <Scene caption="An artificial variable buys you a starting basis; the penalty M makes sure you give it back">
      {[
        ['the constraint', '3x₁ + 2x₂ ≥ 18', MUTED, ''],
        ['subtract a surplus', '3x₁ + 2x₂ − s = 18', OP, 'but −1 gives no identity column'],
        ['add an artificial', '3x₁ + 2x₂ − s + A = 18', GREEN, 'and now it does'],
        ['penalise it', 'max z = 3x₁ + 5x₂ − M·A', ROSE, 'M larger than every other coefficient'],
      ].map(([tag, body, tone, note], i) => (
        <g key={tag} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="40" y={70 + i * 86} width="470" height="72" rx="12" fill={WHITE} stroke={tone} strokeWidth={i === 3 ? 3 : 2.3} />
          <M x="66" y={94 + i * 86} size={10} fill={tone} anchor="start" weight={800}>
            {tag}
          </M>
          <M x="275" y={122 + i * 86} size={13} fill={N} weight={800}>
            {body}
          </M>
          {note ? (
            <M x="486" y={100 + i * 86} size={8.5} fill={tone} anchor="end" weight={800}>
              {note}
            </M>
          ) : null}
          {i < 3 ? (
            <Wire d={`M275 ${142 + i * 86} L275 ${156 + i * 86}`} stroke={MUTED} width="2" marker="url(#catArrM)" />
          ) : null}
        </g>
      ))}

      <Wire d="M560 320 L850 320" stroke={MUTED} width="1.8" marker="url(#catArrM)" />
      <Wire d="M560 320 L560 110" stroke={MUTED} width="1.8" />
      <M x="550" y="106" size={9.5} fill={MUTED} anchor="end" weight={800}>
        A
      </M>
      <Curve
        pts={[[560, 140], [630, 200], [700, 262], [770, 320]]}
        stroke={GREEN}
        width="3"
        className="catm-draw catm-delay-2"
      />
      <Dot cx="770" cy="320" r="8" fill={GREEN} className="catm-pop catm-delay-3" />
      <Curve
        pts={[[700, 262], [770, 250], [840, 246]]}
        stroke={RED}
        width="3"
        dash="6 5"
        className="catm-draw catm-delay-3"
      />
      <Dot cx="840" cy="246" r="8" fill={RED} className="catm-pop catm-delay-4" />
      <M x="700" y="350" size={9.5} fill={MUTED} weight={800}>
        iterations
      </M>

      <g className="catm-cell-in catm-delay-3">
        <rect x="560" y="372" width="140" height="80" rx="11" fill={GREEN} fillOpacity="0.12" stroke={GREEN} strokeWidth="2.4" />
        <M x="630" y="398" size={10.5} fill={GREEN} weight={800}>
          A reaches 0
        </M>
        <M x="630" y="422" size={10} fill={N}>
          feasible —
        </M>
        <M x="630" y="440" size={10} fill={N}>
          keep going
        </M>
      </g>
      <g className="catm-cell-in catm-delay-4">
        <rect x="712" y="372" width="140" height="80" rx="11" fill={RED} fillOpacity="0.1" stroke={RED} strokeWidth="2.4" />
        <M x="782" y="398" size={10.5} fill={RED} weight={800}>
          A stays &gt; 0
        </M>
        <M x="782" y="422" size={10} fill={N}>
          the original
        </M>
        <M x="782" y="440" size={10} fill={N}>
          problem is infeasible
        </M>
      </g>
    </Scene>
  )
}

export function DegeneracyCyclingScene() {
  return (
    <Scene caption="Three lines through one vertex, a tie in the ratio test, and in principle you can loop forever">
      <Wire d="M90 350 L400 350" stroke={MUTED} width="2" marker="url(#catArr)" />
      <Wire d="M90 350 L90 110" stroke={MUTED} width="2" marker="url(#catArr)" />
      <Region pts={[[90, 350], [250, 350], [250, 200], [90, 200]]} tone={GREEN} className="catm-fade-in" />
      {[
        [[90, 200], [400, 200]],
        [[250, 110], [250, 350]],
        [[130, 120], [340, 330]],
      ].map(([a, b], i) => (
        <Wire key={i} d={`M${a[0]} ${a[1]} L${b[0]} ${b[1]}`} stroke={[FN, DOM, OP][i]} width="2.6" className={`catm-draw catm-delay-${i}`} />
      ))}
      <g className="catm-pulse">
        <circle cx="250" cy="200" r="18" fill="none" stroke={RED} strokeWidth="3" />
      </g>
      <M x="286" y="176" size={10} fill={RED} anchor="start" weight={800}>
        three boundaries, two needed
      </M>
      <M x="245" y="390" size={10.5} fill={RED} weight={800}>
        degenerate vertex
      </M>

      <Tableau
        x="500"
        y="96"
        cw="58"
        rh="34"
        cols={['x₁', 'x₂', 's₁', 's₂', 'b']}
        rows={[
          [1, 1, 1, 0, 6],
          [2, 1, 0, 1, 12],
        ]}
        basis={['s₁', 's₂']}
        obj={[-4, -3, 0, 0, 0]}
        accent={DOM}
        col={0}
        className="catm-cell-in catm-delay-2"
      />
      {[
        ['6 ÷ 1 = 6', 168],
        ['12 ÷ 2 = 6', 202],
      ].map(([r, y], i) => (
        <g key={r} className={`catm-pop catm-delay-${i + 2}`}>
          <M x="828" y={y} size={10.5} fill={OP} anchor="end" weight={800}>
            {r}
          </M>
          <circle cx="792" cy={y - 4} r="16" fill="none" stroke={OP} strokeWidth="2.4" />
        </g>
      ))}
      <M x="676" y="238" size={10} fill={OP} weight={800}>
        a tie — and one of them will leave at zero
      </M>

      <g className="catm-cell-in catm-delay-3">
        <rect x="470" y="264" width="382" height="72" rx="11" fill={WHITE} stroke={ROSE} strokeWidth="2.3" />
        <M x="661" y="290" size={10.5} fill={ROSE} weight={800}>
          the next tableau
        </M>
        <M x="661" y="314" size={10.5} fill={N}>
          a basic variable equal to zero, and z unchanged
        </M>
      </g>

      <g className="catm-spin-slow" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        {[0, 1, 2, 3].map((k) => {
          const ang = (k * Math.PI) / 2
          return (
            <Dot key={k} cx={(180 + 52 * Math.cos(ang)).toFixed(1)} cy={(432 - 34 * Math.sin(ang)).toFixed(1)} r="7" fill={MUTED} />
          )
        })}
      </g>
      <circle cx="180" cy="432" r="46" fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="6 5" />
      <M x="180" y="398" size={9} fill={MUTED} weight={800}>
        basis 1 → 2 → 3 → 4 → 1
      </M>
      <g className="catm-emerge">
        <rect x="270" y="404" width="300" height="56" rx="11" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.6" />
        <M x="420" y="428" size={10.5} fill={GREEN} weight={800}>
          the anti-cycling rule
        </M>
        <M x="420" y="450" size={10.5} fill={N}>
          break ties by lowest index
        </M>
      </g>
      <M x="700" y="424" size={9.5} fill={MUTED} weight={800}>
        cycling is rare in practice
      </M>
      <M x="700" y="446" size={9.5} fill={MUTED}>
        but it is not impossible, which is why the rule exists
      </M>
    </Scene>
  )
}

export function SolutionInterpretationScene() {
  return (
    <Scene caption="The optimum is three numbers and a list of which constraints bind — anything less is an incomplete answer">
      <g className="catm-cell-in">
        <rect x="40" y="70" width="330" height="140" rx="12" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.8" />
        <M x="205" y="98" size={10.5} fill={GREEN} weight={800}>
          the optimal solution
        </M>
        <M x="205" y="134" size={15} fill={N} weight={800}>
          x₁ = 2, x₂ = 6
        </M>
        <M x="205" y="172" size={17} fill={GREEN} weight={800}>
          z = 36
        </M>
      </g>

      <rect x="400" y="70" width="452" height="28" rx="8" fill={N} />
      {['constraint', 'slack', 'status'].map((h, i) => (
        <M key={h} x={[490, 660, 790][i]} y="90" size={10} fill={WHITE} weight={800}>
          {h}
        </M>
      ))}
      {[
        ['x₁ ≤ 4', '2', 'slack', MUTED],
        ['2x₂ ≤ 12', '0', 'binding', ROSE],
        ['3x₁+2x₂ ≤ 18', '0', 'binding', ROSE],
      ].map(([c, s2, status, tone], i) => (
        <g key={c} className={`catm-cell-in catm-delay-${i}`}>
          <rect x="400" y={106 + i * 46} width="452" height="38" rx="8" fill={tone} fillOpacity="0.1" stroke={tone} strokeWidth="2" />
          <M x="490" y={130 + i * 46} size={10.5} fill={N}>
            {c}
          </M>
          <M x="660" y={130 + i * 46} size={11} fill={tone} weight={800}>
            {s2}
          </M>
          <M x="790" y={130 + i * 46} size={10.5} fill={tone} weight={800}>
            {status}
          </M>
        </g>
      ))}

      <g className="catm-slide-in catm-delay-3">
        <rect x="40" y="248" width="812" height="94" rx="12" fill={WHITE} stroke={DOM} strokeWidth="2.3" />
        <M x="446" y="274" size={10.5} fill={DOM} weight={800}>
          substitute back — every line must check out
        </M>
        {[
          ['3(2) + 5(6) = 36', 200],
          ['2 ≤ 4', 420],
          ['2(6) = 12 ≤ 12', 600],
          ['3(2)+2(6) = 18 ≤ 18', 790],
        ].map(([chk, x], i) => (
          <g key={chk}>
            <M x={x} y="308" size={10} fill={N} anchor={i === 3 ? 'end' : 'middle'}>
              {chk}
            </M>
            <M x={x} y="330" size={12} fill={GREEN} anchor={i === 3 ? 'end' : 'middle'} weight={800}>
              ✓
            </M>
          </g>
        ))}
      </g>
      <g className="catm-emerge">
        <rect x="140" y="364" width="620" height="94" rx="12" fill={SKY} stroke={GOLD} strokeWidth="2.4" />
        <M x="450" y="390" size={10.5} fill={GOLD} weight={800}>
          a complete answer states all three
        </M>
        {['the variable values', 'the objective value', 'which constraints bind'].map((t, i) => (
          <M key={t} x={250 + i * 200} y="424" size={10} fill={N} weight={800}>
            {t}
          </M>
        ))}
        <M x="450" y="448" size={9.5} fill={MUTED}>
          the binding ones are where more resource would actually buy you something
        </M>
      </g>
    </Scene>
  )
}

export function MethodSelectionScene() {
  return (
    <Scene caption="Two variables or many, and whether any constraint points the wrong way — that is the whole decision">
      <g className="catm-emerge">
        <rect x="336" y="60" width="228" height="44" rx="12" fill={N} />
        <L x="450" y="88" size="12.5" fill={WHITE}>
          how many variables?
        </L>
      </g>
      <Wire d="M400 104 L200 146" stroke={MUTED} width="2" dash="6 5" />
      <Wire d="M500 104 L620 146" stroke={MUTED} width="2" dash="6 5" />
      <M x="266" y="126" size={10} fill={MUTED} weight={800}>
        two
      </M>
      <M x="592" y="126" size={10} fill={MUTED} weight={800}>
        more
      </M>

      <g className="catm-cell-in">
        <rect x="70" y="150" width="260" height="76" rx="12" fill={GREEN} fillOpacity="0.1" stroke={GREEN} strokeWidth="2.4" />
        <M x="200" y="180" size={12.5} fill={GREEN} weight={800}>
          graphical method
        </M>
        <M x="200" y="204" size={9.5} fill={MUTED}>
          draw it and read the vertex
        </M>
      </g>
      <g className="catm-cell-in catm-delay-1">
        <rect x="500" y="150" width="260" height="76" rx="12" fill={FN} fillOpacity="0.1" stroke={FN} strokeWidth="2.4" />
        <M x="630" y="180" size={12.5} fill={FN} weight={800}>
          simplex
        </M>
        <M x="630" y="204" size={9.5} fill={MUTED}>
          tableau, pivot, repeat
        </M>
      </g>
      <Wire d="M630 226 L630 262" stroke={MUTED} width="2" dash="6 5" />
      <g className="catm-emerge catm-delay-2">
        <rect x="470" y="266" width="320" height="42" rx="11" fill={N} />
        <M x="630" y="293" size={11} fill={WHITE} weight={800}>
          any ≥ or = constraint?
        </M>
      </g>
      <Wire d="M630 308 L630 336" stroke={MUTED} width="2" dash="6 5" />
      <g className="catm-cell-in catm-delay-3">
        <rect x="500" y="340" width="260" height="68" rx="12" fill={ROSE} fillOpacity="0.1" stroke={ROSE} strokeWidth="2.4" />
        <M x="630" y="368" size={12} fill={ROSE} weight={800}>
          Big-M
        </M>
        <M x="630" y="392" size={9.5} fill={MUTED}>
          artificial variables first
        </M>
      </g>

      {[
        ['indivisible quantities', 'integer programming'],
        ['uncertain coefficients', 'sensitivity analysis'],
        ['nonlinear relationships', 'nonlinear programming'],
      ].map(([fail, fix], i) => (
        <g key={fail} className={`catm-slide-in catm-delay-${i}`}>
          <rect x="60" y={252 + i * 70} width="380" height="58" rx="11" fill={WHITE} stroke={GOLD} strokeWidth="2.2" />
          <M x="164" y={278 + i * 70} size={9.5} fill={MUTED} weight={800}>
            {fail}
          </M>
          <Wire d={`M262 ${278 + i * 70} L296 ${278 + i * 70}`} stroke={GOLD} width="2" marker="url(#catArrG)" />
          <M x="374" y={278 + i * 70} size={10} fill={GOLD} weight={800}>
            {fix}
          </M>
          <M x="250" y={300 + i * 70} size={8.5} fill={MUTED}>
            {['LP gives 2.3 aircraft', 'LP assumes exact prices', 'LP assumes straight lines'][i]}
          </M>
        </g>
      ))}
      <M x="250" y="230" size={10} fill={GOLD} weight={800}>
        where the model, not the method, runs out
      </M>
    </Scene>
  )
}

/* ── Binding: Phase-1 `visual` id → the scene that realises it ──── */

const VISUAL_MAP = {
  // Module 1 — complex analysis
  'complex-mapping-grid': ComplexMappingGridScene,
  'path-independence-requirement': PathIndependenceScene,
  'cauchy-riemann-derivation': CauchyRiemannScene,
  'polar-cr-transformation': PolarCrScene,
  'orthogonal-level-curves': OrthogonalCurvesScene,
  'milne-thomson-steps': MilneThomsonScene,
  'complex-potential-field': ComplexPotentialScene,
  'contour-parametrisation': ContourParametrisationScene,
  'cauchy-theorem-deformation': CauchyTheoremScene,
  'integral-formula-mechanism': IntegralFormulaScene,
  'pole-contour-strategy': PoleContourStrategyScene,
  'rigidity-contrast': RigidityContrastScene,
  'analyticity-catalogue': AnalyticityCatalogueScene,
  'integral-method-selector': IntegralMethodSelectorScene,
  'applications-web': ApplicationsWebScene,
  'end-to-end-problem-flow': ComplexProblemFlowScene,

  // Module 2 — Fourier series
  'sinusoid-through-system': SinusoidThroughSystemScene,
  'harmonic-family': HarmonicFamilyScene,
  'orthogonality-annihilation': OrthogonalityScene,
  'euler-formulae-derivation': EulerFormulaeScene,
  'dirichlet-and-midpoint': DirichletMidpointScene,
  'partial-sums-convergence': PartialSumsScene,
  'gibbs-overshoot-detail': GibbsDetailScene,
  'period-scaling-substitution': PeriodScalingScene,
  'even-symmetry-saving': EvenSymmetryScene,
  'odd-symmetry-saving': OddSymmetryScene,
  'even-extension-construction': EvenExtensionScene,
  'sine-versus-cosine-extension': SineVsCosineExtensionScene,
  'harmonic-analysis-table': HarmonicAnalysisTableScene,
  'spectrum-diagnosis': SpectrumDiagnosisScene,
  'expansion-procedure-flow': ExpansionProcedureScene,
  'electrical-applications-panel': ElectricalApplicationsScene,

  // Module 3 — Fourier and Z transforms
  'series-to-integral-limit': SeriesToIntegralScene,
  'integral-theorem-conditions': IntegralTheoremScene,
  'transform-pair-symmetry': TransformPairSymmetryScene,
  'sine-cosine-transform-pair': SineCosineTransformScene,
  'transform-properties-grid': TransformPropertiesScene,
  'standard-transform-pairs': StandardPairsScene,
  'parseval-energy-balance': ParsevalScene,
  'transform-solve-invert': TransformSolveInvertScene,
  'z-transform-definition': ZTransformDefinitionScene,
  'z-transform-table': ZTransformTableScene,
  'damping-and-shifting': DampingShiftingScene,
  'z-limit-theorems': ZLimitTheoremsScene,
  'inverse-z-methods': InverseZMethodsScene,
  'difference-equation-solution': DifferenceEquationScene,
  'three-transforms-comparison': ThreeTransformsScene,
  'transform-selection-matrix': TransformSelectionScene,

  // Module 4 — probability, distributions and sampling
  'probability-foundations': ProbabilityFoundationsScene,
  'discrete-vs-continuous': DiscreteVsContinuousScene,
  'cdf-forward-and-back': CdfScene,
  'expectation-and-spread': ExpectationSpreadScene,
  'binomial-structure': BinomialStructureScene,
  'poisson-as-binomial-limit': PoissonLimitScene,
  'normal-shape-and-parameters': NormalShapeScene,
  'standardisation-mapping': StandardisationScene,
  'exponential-and-memorylessness': ExponentialScene,
  'sampling-distribution-and-n': SamplingDistributionScene,
  'central-limit-convergence': CentralLimitScene,
  'hypothesis-test-framework': HypothesisFrameworkScene,
  'error-types-and-power': ErrorTypesScene,
  'z-versus-t': ZVersusTScene,
  'confidence-interval-meaning': ConfidenceIntervalScene,
  'chi-square-goodness-of-fit': ChiSquareScene,

  // Module 5 — linear programming
  'optimization-anatomy': OptimizationAnatomyScene,
  'formulation-workflow': FormulationWorkflowScene,
  'linearity-assumptions': LinearityAssumptionsScene,
  'form-conversion-moves': FormConversionScene,
  'feasible-region-construction': FeasibleRegionScene,
  'corner-point-and-sliding-line': CornerPointScene,
  'lp-special-cases': LpSpecialCasesScene,
  'slack-and-surplus': SlackSurplusScene,
  'basis-vertex-correspondence': BasisVertexScene,
  'initial-tableau-anatomy': InitialTableauScene,
  'pivot-selection': PivotSelectionScene,
  'pivot-and-terminate': PivotTerminateScene,
  'big-m-mechanism': BigMScene,
  'degeneracy-and-cycling': DegeneracyCyclingScene,
  'solution-interpretation': SolutionInterpretationScene,
  'method-selection-and-limits': MethodSelectionScene,
}

/** Fallback for a unit whose `visual` id is not in the map: match on the words
 *  the topic and terms actually use. Narrow patterns first. */
function matchKeyword(blob) {
  if (/cauchy.?riemann/.test(blob)) return CauchyRiemannScene
  if (/milne/.test(blob)) return MilneThomsonScene
  if (/cauchy integral formula/.test(blob)) return IntegralFormulaScene
  if (/cauchy integral theorem|cauchy theorem/.test(blob)) return CauchyTheoremScene
  if (/harmonic function|orthogonal/.test(blob)) return OrthogonalCurvesScene
  if (/conformal|mapping/.test(blob)) return ComplexMappingGridScene
  if (/contour|line integral/.test(blob)) return ContourParametrisationScene
  if (/analytic/.test(blob)) return AnalyticityCatalogueScene
  if (/complex potential|electric flux/.test(blob)) return ComplexPotentialScene
  if (/gibbs/.test(blob)) return GibbsDetailScene
  if (/dirichlet/.test(blob)) return DirichletMidpointScene
  if (/orthogonality/.test(blob)) return OrthogonalityScene
  if (/euler formulae|fourier coefficient/.test(blob)) return EulerFormulaeScene
  if (/half.?range|extension/.test(blob)) return EvenExtensionScene
  if (/even function/.test(blob)) return EvenSymmetryScene
  if (/odd function/.test(blob)) return OddSymmetryScene
  if (/harmonic analysis|practical harmonic/.test(blob)) return HarmonicAnalysisTableScene
  if (/spectrum|\bthd\b/.test(blob)) return SpectrumDiagnosisScene
  if (/change of interval|arbitrary period/.test(blob)) return PeriodScalingScene
  if (/fourier series/.test(blob)) return PartialSumsScene
  if (/parseval/.test(blob)) return ParsevalScene
  if (/sine transform|cosine transform/.test(blob)) return SineCosineTransformScene
  if (/fourier integral/.test(blob)) return SeriesToIntegralScene
  if (/inverse z|partial fraction/.test(blob)) return InverseZMethodsScene
  if (/difference equation/.test(blob)) return DifferenceEquationScene
  if (/damping|shifting/.test(blob)) return DampingShiftingScene
  if (/initial value|final value/.test(blob)) return ZLimitTheoremsScene
  if (/z-?transform/.test(blob)) return ZTransformDefinitionScene
  if (/fourier transform|transform pair/.test(blob)) return TransformPairSymmetryScene
  if (/probability|sample space/.test(blob)) return ProbabilityFoundationsScene
  if (/random variable/.test(blob)) return DiscreteVsContinuousScene
  if (/cumulative|distribution function/.test(blob)) return CdfScene
  if (/expectation|variance|mean/.test(blob)) return ExpectationSpreadScene
  if (/binomial/.test(blob)) return BinomialStructureScene
  if (/poisson/.test(blob)) return PoissonLimitScene
  if (/standardis|z.?score/.test(blob)) return StandardisationScene
  if (/normal/.test(blob)) return NormalShapeScene
  if (/exponential distribution|memoryless/.test(blob)) return ExponentialScene
  if (/central limit/.test(blob)) return CentralLimitScene
  if (/sampling distribution|standard error/.test(blob)) return SamplingDistributionScene
  if (/type i|type ii|power/.test(blob)) return ErrorTypesScene
  if (/confidence interval/.test(blob)) return ConfidenceIntervalScene
  if (/chi.?square/.test(blob)) return ChiSquareScene
  if (/t-?test|z-?test/.test(blob)) return ZVersusTScene
  if (/hypothesis/.test(blob)) return HypothesisFrameworkScene
  if (/simplex|tableau|pivot/.test(blob)) return PivotSelectionScene
  if (/big.?m|artificial variable/.test(blob)) return BigMScene
  if (/degenerac|cycling/.test(blob)) return DegeneracyCyclingScene
  if (/slack|surplus/.test(blob)) return SlackSurplusScene
  if (/graphical|feasible region/.test(blob)) return FeasibleRegionScene
  if (/canonical|standard form/.test(blob)) return FormConversionScene
  if (/formulat/.test(blob)) return FormulationWorkflowScene
  if (/linear programming|\blpp\b/.test(blob)) return LinearityAssumptionsScene
  if (/optimis|optimiz/.test(blob)) return OptimizationAnatomyScene
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
      <rect x="56" y="54" width="788" height={62 + shift} rx="12" fill={SKY} stroke={FN} strokeWidth="2.4" />
      <L x="92" y="80" size={12.5} fill={FN} anchor="start">
        GIVEN
      </L>
      <foreignObject x="92" y="82" width="716" height={30 + shift}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#1e1b3a' }}>
          {dryRun?.input || '—'}
        </div>
      </foreignObject>
      {steps.map((st, i) => (
        <g key={String(st)} className={`catm-slide-in catm-delay-${i}`}>
          <rect x="56" y={130 + shift + i * pitch} width="788" height={stepH} rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="90" cy={130 + shift + i * pitch + stepH / 2} r="13" fill={OP} />
          <L x="90" y={136 + shift + i * pitch + stepH / 2} size={13} fill={WHITE}>
            {i + 1}
          </L>
          <foreignObject x="114" y={138 + shift + i * pitch} width="716" height={stepH - 14}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#1e1b3a', display: 'flex', alignItems: 'center', height: '100%' }}
            >
              {String(st)}
            </div>
          </foreignObject>
        </g>
      ))}
      <g className="catm-emerge">
        <rect x="56" y={top} width="788" height={resultH} rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <L x="92" y={top + 24} size={12.5} fill={GREEN} anchor="start">
          RESULT
        </L>
        <foreignObject x="92" y={top + 26} width="716" height={resultH - 30}>
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '750 13px/1.2 system-ui,sans-serif', color: '#0d9488' }}>
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

/**
 * DsdScenes — VTU BEE613D Electric Motor and Drive Systems for EVs classroom
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

/* Worked-trace copy comes from curriculum data as raw LaTeX-ish snippets
   (e.g. \Sigma); render them as the actual glyph so students don't see code. */
const texGlyph = (s) => String(s ?? '').replace(/\\Sigma/g, 'Σ')

/* ── Shell ──────────────────────────────────────────────────────── */

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`dsd-scene ${className}`} aria-label={caption || 'Digital System Design Using Verilog diagram'}>
      <svg viewBox={vb} role="img" className="dsd-svg">
        <defs>
          <marker id="dsdArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="dsdArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="dsdArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="dsdArrRo" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={ROSE} />
          </marker>
          <marker id="dsdArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
          </marker>
          <marker id="dsdArrP" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={PURP} />
          </marker>
          <marker id="dsdArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="dsdArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="dsdArrM" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
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
      <path d={`M${X} ${Y} L${X + W} ${Y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#dsdArr)" />
      <path d={`M${zero} ${Y} L${zero} ${Y - H}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#dsdArr)" />
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
          className={`dsdm-flux dsdm-delay-${i}`}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <Wire
          key={i}
          d={`M${204 + i * 154} 298 L${224 + i * 154} 298`}
          stroke={BLUE}
          className={`dsdm-current dsdm-delay-${i}`}
          marker="url(#dsdArrB)"
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
        <g key={t} className={`dsdm-cell-in dsdm-delay-${i}`}>
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
        <g key={String(p)} className={`dsdm-cell-in dsdm-delay-${i % 5}`}>
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

/* ── DSD-specific primitives ─────────────────────────────────────────── */

/* Scene helpers unique to Digital System Design Using Verilog land here. Coerce every numeric
   prop through n() -- including width/length props, not just x and y. */


/* ── Module 1 ────────────────────────────────────────────────────────── */

/* ── Module 1  Principles of Combinational Logic ─────────────────── */

/* Reveal sequencing. An inline delay, because dsdm-delay-0..4 are declared
   before the reveal keyframes and lose to their `animation` shorthand. */
const m1d = (s) => ({ animationDelay: `${s}s` })

/* Gate symbol drawn from its left-middle point (x, y). Several module-1
   scenes draw AND/OR schematics, so the outline lives here. All props pass
   through n() first — size props included. */
function M1Gate({ x, y, w = 44, h = 40, kind = 'and', stroke = N, fill = WHITE, className = '' }) {
  const [X, Y, W, H] = [n(x), n(y), n(w), n(h)]
  const d = kind === 'or'
    ? `M${X} ${Y - H / 2} Q${X + W * 0.62} ${Y - H / 2} ${X + W} ${Y} Q${X + W * 0.62} ${Y + H / 2} ${X} ${Y + H / 2} Q${X + W * 0.28} ${Y} ${X} ${Y - H / 2} Z`
    : `M${X} ${Y - H / 2} L${X + W / 2} ${Y - H / 2} A${W / 2} ${H / 2} 0 0 1 ${X + W / 2} ${Y + H / 2} L${X} ${Y + H / 2} Z`
  return <path d={d} fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" className={className} />
}

/* y of input pin i (0-based) of a k-input gate centred on y with height h. */
const m1Pin = (y, h, k, i) => n(y) - n(h) / 2 + (n(h) * (i + 1)) / (k + 1)

/* Karnaugh-map grid with Gray-coded labels, drawn from its top-left cell
   corner (x, y). Most module-1 scenes are K-maps, so the grid lives here.
   `children` paint above the white background but below the grid lines and
   entries — that is where group loops and highlights belong. `cells[r][c]`
   holds an entry; `showIdx` prints the minterm number in each corner. */
function M1Kmap({ x, y, cell = 80, rows = ['0', '1'], cols = ['00', '01', '11', '10'], rowVar = 'A', colVar = 'BC', cells = [], showIdx = false, colTones = [], tone = BLUE, className = '', labelClass = '', labelDelay = 0, valueSize = 20, children }) {
  const [X, Y, C, VS] = [n(x), n(y), n(cell), n(valueSize)]
  const W = C * cols.length
  const H = C * rows.length
  const ink = (v) => (v === '1' ? N : v === 'X' ? PURP : MUTED)
  return (
    <g>
      <g className={className}>
        <rect x={X} y={Y} width={W} height={H} fill={WHITE} />
      </g>
      {children}
      <g className={className}>
        <rect x={X} y={Y} width={W} height={H} fill="none" stroke={tone} strokeWidth="2.6" />
        {cols.slice(1).map((_, c) => (
          <path key={`c${c}`} d={`M${X + (c + 1) * C} ${Y} L${X + (c + 1) * C} ${Y + H}`} stroke={tone} strokeWidth="1.4" />
        ))}
        {rows.slice(1).map((_, r) => (
          <path key={`r${r}`} d={`M${X} ${Y + (r + 1) * C} L${X + W} ${Y + (r + 1) * C}`} stroke={tone} strokeWidth="1.4" />
        ))}
        {showIdx ? rows.map((rb, r) => cols.map((cb, c) => (
          <M key={`i${r}${c}`} x={X + c * C + 7} y={Y + r * C + 15} size={10} fill={MUTED} anchor="start" weight={600}>
            {parseInt(rb + cb, 2)}
          </M>
        ))) : null}
        {cells.map((row, r) => row.map((v, c) => (v === '' || v == null ? null : (
          <M key={`v${r}${c}`} x={X + (c + 0.5) * C} y={Y + (r + 0.5) * C + VS * 0.35} size={VS} fill={ink(v)} weight={800}>
            {v}
          </M>
        ))))}
      </g>
      <g className={labelClass} style={m1d(labelDelay)}>
        <path d={`M${X - 40} ${Y - 36} L${X} ${Y}`} stroke={MUTED} strokeWidth="1.6" />
        <M x={X - 24} y={Y - 2} size={13} fill={MUTED} anchor="end">{rowVar}</M>
        <M x={X - 10} y={Y - 26} size={13} fill={MUTED} anchor="end">{colVar}</M>
        {cols.map((t, c) => (
          <M key={`cl${c}`} x={X + (c + 0.5) * C} y={Y - 12} size={13} fill={colTones[c] || N}>{t}</M>
        ))}
        {rows.map((t, r) => (
          <M key={`rl${r}`} x={X - 14} y={Y + (r + 0.5) * C + 5} size={13} anchor="end">{t}</M>
        ))}
      </g>
    </g>
  )
}

/* Centre of K-map cell (r, c) — for loops and highlights drawn as children. */
const m1Cell = (x, y, cell, r, c) => [n(x) + (c + 0.5) * n(cell), n(y) + (r + 0.5) * n(cell)]

export function M1CombBlockScene() {
  const ins = [['A', 160], ['B', 210], ['C', 260], ['N', 350]]
  const outs = [['F1', 170], ['F2', 230], ['Fm', 350]]
  return (
    <Scene caption="n inputs in, m outputs out — nothing stored, nothing fed back">
      <Block x="300" y="110" w="300" h="280" label="Combinational Logic Circuit" sub="gates only · no memory" size={16} className="dsdm-emerge" />
      <L x="200" y="134" size={13} fill={BLUE}>n input variables</L>
      {ins.map(([t, y], i) => (
        <g key={t} className="dsdm-slide-in" style={m1d(0.9 + i * 0.18)}>
          <Wire d={`M110 ${y} L292 ${y}`} stroke={BLUE} width={2.8} marker="url(#dsdArrB)" />
          <M x="96" y={y + 5} size={15} fill={BLUE} anchor="end">{t}</M>
        </g>
      ))}
      <L x="200" y="312" size={20} fill={BLUE}>⋮</L>
      <L x="700" y="144" size={13} fill={GREEN}>m output variables</L>
      {outs.map(([t, y], i) => (
        <g key={t} className="dsdm-slide-in" style={m1d(2.0 + i * 0.18)}>
          <Wire d={`M600 ${y} L784 ${y}`} stroke={GREEN} width={2.8} marker="url(#dsdArrG)" />
          <M x="800" y={y + 5} size={15} fill={GREEN} anchor="start">{t}</M>
        </g>
      ))}
      <L x="700" y="298" size={20} fill={GREEN}>⋮</L>
      <g className="dsdm-slide-in" style={m1d(2.8)}>
        <M x="450" y="440" size={16} fill={N}>F(t) = f( A(t), B(t), …, N(t) )  — present inputs only</M>
      </g>
    </Scene>
  )
}

export function M1AnalysisFlowScene() {
  const rows = ['000', '001', '010', '011', '100', '101', '110', '111']
  const f = (r) => ((r[0] === '1' && r[1] === '1') || r[2] === '1' ? '1' : '0')
  return (
    <Scene caption="Analysis: start from the given schematic, end with a truth table">
      <Card x="40" y="130" w="230" h="230" title="1 · Logic Diagram" accent={BLUE} className="dsdm-emerge">
        <Wire d="M30 90 L74 90" width={2} />
        <Wire d="M30 110 L74 110" width={2} />
        <M1Gate x="70" y="100" w="44" h="40" />
        <Wire d="M114 100 L128 100 L128 122.7 L146 122.7" width={2} />
        <Wire d="M30 137.3 L146 137.3" width={2} />
        <M1Gate x="140" y="130" w="46" h="44" kind="or" />
        <Wire d="M186 130 L208 130" width={2} />
        <M x="22" y="94" size={12} anchor="end">A</M>
        <M x="22" y="114" size={12} anchor="end">B</M>
        <M x="22" y="141" size={12} anchor="end">C</M>
        <M x="214" y="134" size={12} anchor="start">F</M>
        <L x="115" y="200" size={11} fill={MUTED} weight={700}>given schematic</L>
      </Card>
      <g className="dsdm-slide-in" style={m1d(0.9)}>
        <Wire d="M276 245 L326 245" width={4} marker="url(#dsdArr)" />
        <L x="300" y="228" size={11} fill={MUTED} weight={700}>write</L>
      </g>
      <g className="dsdm-emerge" style={m1d(1.3)}>
      <Card x="335" y="130" w="230" h="230" title="2 · Boolean Equations" accent={PURP}>
        <M x="115" y="96" size={17} fill={PURP}>F = A·B + C</M>
        <M x="115" y="140" size={11.5} fill={MUTED}>AND output → A·B</M>
        <M x="115" y="164" size={11.5} fill={MUTED}>OR output → A·B + C</M>
        <L x="115" y="204" size={11} fill={MUTED} weight={700}>gate by gate, input to output</L>
      </Card>
      </g>
      <g className="dsdm-slide-in" style={m1d(2.0)}>
        <Wire d="M571 245 L621 245" width={4} marker="url(#dsdArr)" />
        <L x="597" y="228" size={11} fill={MUTED} weight={700}>tabulate</L>
      </g>
      <g className="dsdm-emerge" style={m1d(2.3)}>
      <Card x="630" y="130" w="230" h="230" title="3 · Truth Table" accent={GREEN}>
        <Wire d="M158 42 L158 218" stroke={MUTED} width={1.5} />
        <M x="50" y="56" size={12} fill={MUTED}>A</M>
        <M x="90" y="56" size={12} fill={MUTED}>B</M>
        <M x="130" y="56" size={12} fill={MUTED}>C</M>
        <M x="190" y="56" size={12} fill={GREEN}>F</M>
        {rows.map((r, i) => (
          <g key={r} className="dsdm-cell-in" style={m1d(2.6 + i * 0.12)}>
            <M x="50" y={78 + i * 18} size={12}>{r[0]}</M>
            <M x="90" y={78 + i * 18} size={12}>{r[1]}</M>
            <M x="130" y={78 + i * 18} size={12}>{r[2]}</M>
            <M x="190" y={78 + i * 18} size={12} fill={f(r) === '1' ? GREEN : MUTED}>{f(r)}</M>
          </g>
        ))}
      </Card>
      </g>
      <L x="450" y="420" size={14} fill={MUTED} weight={700}>Every input combination is checked — the table is the verified behaviour</L>
    </Scene>
  )
}

export function M1FormsCompareScene() {
  return (
    <Scene caption="Same function, same truth table — the standard form needs half the gate inputs">
      <Card x="30" y="40" w="410" h="420" title="Canonical Form — every term has A, B and C" accent={ROSE} className="dsdm-emerge">
        <M x="205" y="68" size={15} fill={ROSE}>F = A'B'C + A'BC + AB'C</M>
        {[["A'·B'·C", 130], ["A'·B·C", 210], ["A·B'·C", 290]].map(([t, y]) => (
          <g key={t}>
            {[0, 1, 2].map((i) => (
              <Wire key={i} d={`M112 ${m1Pin(y, 48, 3, i)} L154 ${m1Pin(y, 48, 3, i)}`} width={1.8} />
            ))}
            <M1Gate x="150" y={y} w="50" h="48" stroke={ROSE} />
            <M x="104" y={y + 4} size={12} anchor="end">{t}</M>
          </g>
        ))}
        <Wire d="M200 130 L240 130 L240 195 L274 195" width={1.8} />
        <Wire d="M200 210 L274 210" width={1.8} />
        <Wire d="M200 290 L240 290 L240 225 L274 225" width={1.8} />
        <M1Gate x="270" y="210" w="56" h="60" kind="or" stroke={ROSE} />
        <Wire d="M326 210 L356 210" width={1.8} />
        <M x="364" y="214" size={13} anchor="start">F</M>
        <M x="205" y="366" size={12} fill={N}>3 AND (3-input) + 1 OR (3-input)</M>
        <M x="205" y="394" size={14} fill={ROSE}>12 gate inputs</M>
      </Card>
      <g className="dsdm-slide-in" style={m1d(1.6)}>
      <Card x="460" y="40" w="410" h="420" title="Standard Form — terms may drop variables" accent={GREEN}>
        <M x="205" y="68" size={15} fill={GREEN}>F = A'C + B'C</M>
        {[["A'·C", 160], ["B'·C", 260]].map(([t, y]) => (
          <g key={t}>
            {[0, 1].map((i) => (
              <Wire key={i} d={`M112 ${m1Pin(y, 44, 2, i)} L154 ${m1Pin(y, 44, 2, i)}`} width={1.8} />
            ))}
            <M1Gate x="150" y={y} w="50" h="44" stroke={GREEN} />
            <M x="104" y={y + 4} size={12} anchor="end">{t}</M>
          </g>
        ))}
        <Wire d="M200 160 L240 160 L240 191.3 L274 191.3" width={1.8} />
        <Wire d="M200 260 L240 260 L240 228.7 L274 228.7" width={1.8} />
        <M1Gate x="270" y="210" w="56" h="56" kind="or" stroke={GREEN} />
        <Wire d="M326 210 L356 210" width={1.8} />
        <M x="364" y="214" size={13} anchor="start">F</M>
        <M x="205" y="366" size={12} fill={N}>2 AND (2-input) + 1 OR (2-input)</M>
        <M x="205" y="394" size={14} fill={GREEN}>6 gate inputs</M>
      </Card>
      </g>
    </Scene>
  )
}

export function M1MintermTableScene() {
  const fOut = [0, 0, 0, 1, 0, 1, 0, 0]
  const top = (i) => 84 + i * 40
  return (
    <Scene caption="Sum of minterms: one AND term per row where F = 1, then OR them">
      <rect x="60" y="44" width="300" height="354" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
      <Wire d="M60 80 L360 80" stroke={MUTED} width={1.5} />
      <Wire d="M280 44 L280 398" stroke={MUTED} width={1.5} />
      {[3, 5].map((i) => (
        <rect key={i} x="62" y={top(i) - 2} width="296" height="36" fill={AMBER} opacity="0.2" className="dsdm-cell-in" style={m1d(1.3)} />
      ))}
      {['row', 'A', 'B', 'C', 'F'].map((t, j) => (
        <M key={t} x={[95, 150, 200, 250, 320][j]} y="68" size={13} fill={MUTED}>{t}</M>
      ))}
      {fOut.map((v, i) => {
        const b = i.toString(2).padStart(3, '0')
        return (
          <g key={i} className="dsdm-cell-in" style={m1d(i * 0.1)}>
            <M x="95" y={top(i) + 23} size={13} fill={MUTED}>{`m${i}`}</M>
            {[0, 1, 2].map((k) => (
              <M key={k} x={150 + k * 50} y={top(i) + 23} size={14}>{b[k]}</M>
            ))}
            <M x="320" y={top(i) + 23} size={15} fill={v ? AMBER : MUTED}>{v}</M>
          </g>
        )
      })}
      <L x="640" y="112" size={14} fill={N}>1 → variable as is,  0 → complemented</L>
      {[[3, "A'·B·C", 'row 011 → m3'], [5, "A·B'·C", 'row 101 → m5']].map(([i, t, s], k) => (
        <g key={i}>
          <g className="dsdm-slide-in" style={m1d(1.9 + k * 0.4)}>
            <Wire d={`M364 ${top(i) + 17} L444 ${top(i) + 17}`} stroke={AMBER} width={2.4} marker="url(#dsdArrA)" />
          </g>
          <g className="dsdm-emerge" style={m1d(2.1 + k * 0.4)}>
            <Block x="450" y={top(i) - 11} w="240" h="56" label={t} sub={s} mono size={17} stroke={AMBER} />
          </g>
        </g>
      ))}
      <g className="dsdm-slide-in" style={m1d(3.0)}>
        <M x="450" y="452" size={18} fill={N}>F = m3 + m5 = A'BC + AB'C = Σm(3, 5)</M>
      </g>
    </Scene>
  )
}

export function M1MaxtermTableScene() {
  const fOut = [0, 1, 1, 1, 1, 1, 0, 1]
  const top = (i) => 84 + i * 40
  return (
    <Scene caption="Product of maxterms: one OR term per row where F = 0, then AND them">
      <rect x="60" y="44" width="300" height="354" rx="8" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
      <Wire d="M60 80 L360 80" stroke={MUTED} width={1.5} />
      <Wire d="M280 44 L280 398" stroke={MUTED} width={1.5} />
      {[0, 6].map((i) => (
        <rect key={i} x="62" y={top(i) - 2} width="296" height="36" fill={BLUE} opacity="0.16" className="dsdm-cell-in" style={m1d(1.3)} />
      ))}
      {['row', 'A', 'B', 'C', 'F'].map((t, j) => (
        <M key={t} x={[95, 150, 200, 250, 320][j]} y="68" size={13} fill={MUTED}>{t}</M>
      ))}
      {fOut.map((v, i) => {
        const b = i.toString(2).padStart(3, '0')
        return (
          <g key={i} className="dsdm-cell-in" style={m1d(i * 0.1)}>
            <M x="95" y={top(i) + 23} size={13} fill={MUTED}>{`M${i}`}</M>
            {[0, 1, 2].map((k) => (
              <M key={k} x={150 + k * 50} y={top(i) + 23} size={14}>{b[k]}</M>
            ))}
            <M x="320" y={top(i) + 23} size={15} fill={v ? MUTED : BLUE}>{v}</M>
          </g>
        )
      })}
      {[[0, '(A + B + C)', 'row 000 → M0'], [6, "(A' + B' + C)", 'row 110 → M6']].map(([i, t, s], k) => (
        <g key={i}>
          <g className="dsdm-slide-in" style={m1d(1.9 + k * 0.4)}>
            <Wire d={`M364 ${top(i) + 17} L444 ${top(i) + 17}`} stroke={BLUE} width={2.4} marker="url(#dsdArrB)" />
          </g>
          <g className="dsdm-emerge" style={m1d(2.1 + k * 0.4)}>
            <Block x="450" y={top(i) - 11} w="260" h="56" label={t} sub={s} mono size={17} stroke={BLUE} />
          </g>
        </g>
      ))}
      <L x="640" y="222" size={14} fill={N}>0 → variable as is,  1 → complemented</L>
      <L x="640" y="248" size={12.5} fill={MUTED} weight={700}>(the inverse of the minterm rule)</L>
      <g className="dsdm-slide-in" style={m1d(3.0)}>
        <M x="450" y="452" size={18} fill={N}>F = M0 · M6 = (A+B+C)(A'+B'+C) = ΠM(0, 6)</M>
      </g>
    </Scene>
  )
}

export function M1DesignFlowScene() {
  const boxes = [
    [340, 50, ['Word', 'Specification'], BLUE, 'text'],
    [620, 210, ['Truth', 'Table'], GREEN, 'grid'],
    [340, 370, ['Simplified', 'Equations'], PURP, 'math'],
    [60, 210, ['Logic', 'Diagram'], AMBER, 'gate'],
  ]
  const icon = (bx, by, kind, tone) => {
    if (kind === 'text') return [26, 38, 50].map((dy, i) => <path key={i} d={`M${bx + 20} ${by + dy} L${bx + (i === 2 ? 46 : 60)} ${by + dy}`} stroke={tone} strokeWidth="3" strokeLinecap="round" />)
    if (kind === 'grid') return [0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={bx + 18 + c * 14} y={by + 20 + r * 14} width="12" height="12" fill={(r + c) % 2 ? tone : WHITE} stroke={tone} strokeWidth="1.5" />))
    if (kind === 'math') return <M x={bx + 40} y={by + 48} size={20} fill={tone}>F=</M>
    return <M1Gate x={bx + 20} y={by + 40} w="34" h="30" stroke={tone} />
  }
  const arrows = [
    ['M562 90 Q730 90 730 204', 'tabulate', 742, 130, 'start', BLUE, 'dsdArrB'],
    ['M730 292 Q730 410 566 410', 'minimise (K-map)', 742, 426, 'start', GREEN, 'dsdArrG'],
    ['M338 410 Q170 410 170 296', 'draw gates', 158, 426, 'end', PURP, 'dsdArrP'],
  ]
  return (
    <Scene caption="Design runs forward: intent → truth table → minimal equations → schematic">
      {boxes.map(([bx, by, [a, b], tone, kind], i) => (
        <g key={a} className="dsdm-emerge" style={m1d(i * 1.1)}>
          <rect x={bx} y={by} width="220" height="80" rx="12" fill={WHITE} stroke={tone} strokeWidth="2.6" />
          {icon(bx, by, kind, tone)}
          <L x={bx + 142} y={by + 36} size={15} fill={tone}>{a}</L>
          <L x={bx + 142} y={by + 57} size={15} fill={tone}>{b}</L>
        </g>
      ))}
      {arrows.map(([d, t, lx, ly, anchor, tone, mk], i) => (
        <g key={t} className="dsdm-slide-in" style={m1d(0.6 + i * 1.1)}>
          <Wire d={d} stroke={tone} width={3.2} marker={`url(#${mk})`} />
          <L x={lx} y={ly} size={12.5} fill={tone} anchor={anchor}>{t}</L>
        </g>
      ))}
      <g className="dsdm-slide-in" style={m1d(3.9)}>
        <Wire d="M170 206 Q170 90 334 90" stroke={MUTED} width={2.2} dash="8 7" marker="url(#dsdArrM)" />
        <L x="158" y="112" size={12} fill={MUTED} anchor="end">verify vs spec</L>
      </g>
      <L x="450" y="242" size={18} fill={N}>DESIGN</L>
      <L x="450" y="266" size={12.5} fill={MUTED} weight={700}>forward engineering</L>
    </Scene>
  )
}

export function M1Kmap3Scene() {
  const [X, Y, C] = [230, 120, 100]
  const names = [['m0', 'm1', 'm3', 'm2'], ['m4', 'm5', 'm7', 'm6']]
  return (
    <Scene caption="3-variable K-map: columns run in Gray code, so neighbours differ in one bit">
      <M1Kmap x={X} y={Y} cell={C} cells={names} valueSize={18} className="dsdm-emerge" labelClass="dsdm-cell-in" labelDelay={1} colTones={[N, N, ROSE, ROSE]} rowVar="A" colVar="BC">
        <rect x={X + C} y={Y} width={2 * C} height={2 * C} fill={ROSE} opacity="0.12" className="dsdm-cell-in" style={m1d(2.2)} />
      </M1Kmap>
      <g className="dsdm-slide-in" style={m1d(2.5)}>
        <Wire d={`M450 ${Y + 2 * C + 28} L450 ${Y + 2 * C + 8}`} stroke={ROSE} width={2.6} marker="url(#dsdArrRo)" />
      </g>
      <g className="dsdm-emerge" style={m1d(2.7)}>
        <Block x="345" y={Y + 2 * C + 30} w="210" h="60" label="Differ by only C" sub="01 → 11 : B stays 1, C flips" stroke={ROSE} size={14} />
      </g>
      <g className="dsdm-cell-in" style={m1d(1.6)}>
        <L x="770" y="112" size={12.5} fill={ROSE}>11 before 10:</L>
        <L x="770" y="132" size={12.5} fill={ROSE}>the Gray-code swap</L>
      </g>
      <M x="450" y="452" size={13} fill={MUTED}>00 → 01 → 11 → 10 → (00)  — one bit changes at every step, wrap included</M>
    </Scene>
  )
}

export function M1Kmap4WrapScene() {
  const [X, Y, C] = [290, 110, 80]
  const vals = [['1', '0', '0', '1'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['1', '0', '0', '1']]
  const wraps = [
    'M300 108 L300 74 Q300 62 312 62 L588 62 Q600 62 600 74 L600 104',
    'M612 128 L640 128 Q654 128 654 142 L654 398 Q654 412 640 412 L616 412',
    'M600 432 L600 456 Q600 468 588 468 L312 468 Q300 468 300 456 L300 436',
    'M288 412 L236 412 Q222 412 222 398 L222 142 Q222 128 236 128 L284 128',
  ]
  const corners = [
    'M284 186 L352 186 Q364 186 364 174 L364 104',
    'M616 186 L568 186 Q556 186 556 174 L556 104',
    'M284 346 L352 346 Q364 346 364 358 L364 436',
    'M616 346 L568 346 Q556 346 556 358 L556 436',
  ]
  return (
    <Scene caption="Edges wrap: top meets bottom, left meets right — the four corners are one group">
      <M1Kmap x={X} y={Y} cell={C} rows={['00', '01', '11', '10']} rowVar="AB" colVar="CD" showIdx className="dsdm-emerge">
        {[[0, 0], [0, 3], [3, 0], [3, 3]].map(([r, c]) => {
          const [cx, cy] = m1Cell(X, Y, C, r, c)
          return <rect key={`${r}${c}`} x={cx - C / 2} y={cy - C / 2} width={C} height={C} fill={GREEN} opacity="0.14" className="dsdm-cell-in" style={m1d(0.9)} />
        })}
      </M1Kmap>
      {vals.map((row, r) => row.map((v, c) => {
        const [cx, cy] = m1Cell(X, Y, C, r, c)
        return <M key={`${r}${c}`} x={cx} y={cy + 7} size={20} fill={v === '1' ? N : MUTED} className="dsdm-cell-in" style={m1d(v === '1' ? 1.0 : 0.5)}>{v}</M>
      }))}
      {wraps.map((d, i) => (
        <g key={i} className="dsdm-slide-in" style={m1d(1.8 + i * 0.35)}>
          <Wire d={d} stroke={AMBER} width={2.4} marker="url(#dsdArrA)" className="dsdm-pointer" />
        </g>
      ))}
      {corners.map((d, i) => (
        <g key={i} className="dsdm-emerge" style={m1d(3.4)}>
          <Wire d={d} stroke={GREEN} width={3.4} />
        </g>
      ))}
      <g className="dsdm-slide-in" style={m1d(3.8)}>
        <L x="775" y="190" size={13} fill={N}>m0, m2, m8, m10</L>
        <L x="775" y="212" size={13} fill={N}>form one group of 4</L>
        <M x="775" y="262" size={24} fill={GREEN}>F = B'D'</M>
        <L x="775" y="312" size={11.5} fill={MUTED} weight={700}>B = 0 and D = 0</L>
        <L x="775" y="330" size={11.5} fill={MUTED} weight={700}>in all four corners</L>
      </g>
      <g className="dsdm-slide-in" style={m1d(2.2)}>
        <L x="110" y="244" size={12} fill={AMBER} weight={700}>top ↔ bottom</L>
        <L x="110" y="264" size={12} fill={AMBER} weight={700}>left ↔ right</L>
        <L x="110" y="284" size={12} fill={AMBER} weight={700}>are neighbours</L>
      </g>
    </Scene>
  )
}

export function M1KmapPosScene() {
  const [X, Y, C] = [130, 130, 100]
  const vals = [['0', '1', '1', '0'], ['1', '1', '1', '0']]
  return (
    <Scene caption="POS from a K-map: loop the 0s to get F', then DeMorgan flips it into F">
      <M1Kmap x={X} y={Y} cell={C} showIdx className="dsdm-emerge" rowVar="A" colVar="BC">
        <rect x="444" y="144" width="74" height="172" rx="30" fill="none" stroke={BLUE} strokeWidth="3.2" className="dsdm-emerge" style={m1d(1.8)} />
      </M1Kmap>
      {vals.map((row, r) => row.map((v, c) => {
        const [cx, cy] = m1Cell(X, Y, C, r, c)
        return <M key={`${r}${c}`} x={cx} y={cy + 8} size={v === '0' ? 24 : 18} fill={v === '0' ? BLUE : MUTED} className="dsdm-cell-in" style={m1d(0.5 + (r * 4 + c) * 0.06)}>{v}</M>
      }))}
      <g className="dsdm-emerge" style={m1d(1.4)}>
        <Wire d="M124 158 L178 158 Q204 158 204 184 L204 190 Q204 216 178 216 L124 216" stroke={TEAL} width={3.2} />
        <Wire d="M536 158 L482 158 Q456 158 456 184 L456 190 Q456 216 482 216 L536 216" stroke={TEAL} width={3.2} />
      </g>
      <g className="dsdm-slide-in" style={m1d(2.0)}>
        <M x="330" y="372" size={13} fill={TEAL}>m0, m2 (wrap-around) → A'C'</M>
        <M x="330" y="396" size={13} fill={BLUE}>m2, m6 (column BC = 10) → BC'</M>
      </g>
      <g className="dsdm-emerge" style={m1d(2.5)}>
        <Block x="580" y="130" w="290" h="64" label="F' = A'C' + BC'" sub="SOP of the zeros" mono size={18} stroke={BLUE} />
      </g>
      <g className="dsdm-slide-in" style={m1d(3.0)}>
        <Wire d="M725 202 L725 286" stroke={AMBER} width={5} marker="url(#dsdArrA)" />
        <L x="742" y="240" size={14} fill={AMBER} anchor="start">DeMorgan's</L>
        <L x="742" y="258" size={11} fill={MUTED} anchor="start" weight={700}>complement both sides</L>
      </g>
      <g className="dsdm-emerge" style={m1d(3.4)}>
        <Block x="580" y="296" w="290" h="64" label="F = (A + C)(B' + C)" sub="minimal product of sums" mono size={18} stroke={GREEN} labelFill={GREEN} />
      </g>
    </Scene>
  )
}

export function M1KmapDontCareScene() {
  const [X, Y, C] = [200, 110, 80]
  const vals = [['1', '0', '0', '1'], ['0', '0', '0', '0'], ['0', '0', '0', '0'], ['X', '0', '0', 'X']]
  const optimal = [
    'M194 186 L262 186 Q278 186 278 170 L278 104',
    'M526 186 L458 186 Q442 186 442 170 L442 104',
    'M194 346 L262 346 Q278 346 278 362 L278 436',
    'M526 346 L458 346 Q442 346 442 362 L442 436',
  ]
  return (
    <Scene caption="Don't-cares are wildcards: read an X as 1 when it makes a group bigger">
      <M1Kmap x={X} y={Y} cell={C} rows={['00', '01', '11', '10']} rowVar="AB" colVar="CD" cells={vals} showIdx className="dsdm-emerge">
        {[3].map((r) => [0, 3].map((c) => {
          const [cx, cy] = m1Cell(X, Y, C, r, c)
          return <rect key={`${r}${c}`} x={cx - C / 2} y={cy - C / 2} width={C} height={C} fill={PURP} opacity="0.14" className="dsdm-cell-in" style={m1d(2.8)} />
        }))}
      </M1Kmap>
      <g className="dsdm-slide-in" style={m1d(0.8)}>
        <Wire d="M194 132 L248 132 Q270 132 270 154 Q270 176 248 176 L194 176" stroke={ROSE} width={2.6} dash="7 5" />
        <Wire d="M526 132 L472 132 Q450 132 450 154 Q450 176 472 176 L526 176" stroke={ROSE} width={2.6} dash="7 5" />
      </g>
      {optimal.map((d, i) => (
        <g key={i} className="dsdm-emerge" style={m1d(2.9)}>
          <Wire d={d} stroke={GREEN} width={3.6} />
        </g>
      ))}
      <g className="dsdm-slide-in" style={m1d(1.1)}>
        <L x="720" y="136" size={13} fill={ROSE}>Frame 1 · ignore the Xs</L>
        <M x="720" y="180" size={20} fill={ROSE}>F = A'B'D'</M>
        <L x="720" y="206" size={12} fill={MUTED} weight={700}>sub-optimal: pair only, 3 literals</L>
      </g>
      <g className="dsdm-emerge" style={m1d(2.4)}>
        <path d="M650 173 L790 173" stroke={RED} strokeWidth="3.4" strokeLinecap="round" />
      </g>
      <g className="dsdm-slide-in" style={m1d(3.3)}>
        <L x="720" y="286" size={13} fill={GREEN}>Frame 2 · treat X as 1</L>
        <M x="720" y="334" size={24} fill={GREEN}>F = B'D'</M>
        <L x="720" y="360" size={12} fill={MUTED} weight={700}>optimal: group of 4, 2 literals</L>
      </g>
      <M x="360" y="466" size={12.5} fill={PURP}>X at m8, m10 — inputs that never occur, output unspecified</M>
    </Scene>
  )
}

export function M1KmapVsTabularScene() {
  const gray = ['000', '001', '011', '010', '110', '111', '101', '100']
  const ones = [[0, 1], [0, 6], [1, 3], [1, 4], [2, 0], [2, 7], [3, 2], [3, 5], [4, 1], [4, 6], [5, 3], [5, 7], [6, 0], [6, 4], [7, 2], [7, 5]]
  const cells = gray.map((_, r) => gray.map((__, c) => (ones.some(([a, b]) => a === r && b === c) ? '1' : '')))
  const qs = [[1, 1], [3, 6], [5, 1], [6, 6]]
  const lines = [
    ['$ qm --minimise F', SKY],
    ['Step 1: sort minterms by number of 1s', WHITE],
    ['  #1s = 0 :  0000', SKY],
    ['  #1s = 1 :  0001  0100  1000', SKY],
    ['  #1s = 2 :  0101  1001  1100', SKY],
    ['  #1s = 3 :  1101', SKY],
    ['Step 2: merge pairs 1 bit apart', WHITE],
    ['  000-  0-00  -000  -001  ...', SKY],
    ['Step 3: prime implicant chart', WHITE],
    ['→ minimal cover found', CREAM],
  ]
  return (
    <Scene caption="Past 4–5 variables the eye fails; the tabular method just keeps working">
      <L x="240" y="40" size={15} fill={ROSE}>6 variables → 64 cells</L>
      <M1Kmap x="80" y="100" cell="40" rows={gray} cols={gray} rowVar="ABC" colVar="DEF" cells={cells} valueSize={15} tone={MUTED} className="dsdm-emerge" />
      {qs.map(([r, c], i) => {
        const [cx, cy] = m1Cell(80, 100, 40, r, c)
        return (
          <g key={i} className="dsdm-cell-in" style={m1d(0.8 + i * 0.2)}>
            <M x={cx} y={cy + 9} size={24} fill={ROSE} className="dsdm-swap">?</M>
          </g>
        )
      })}
      <L x="240" y="448" size={12.5} fill={ROSE} weight={700}>which cells are adjacent? which groups are prime?</L>
      <g className="dsdm-slide-in" style={m1d(1.4)}>
        <Wire d="M410 260 L470 260" stroke={N} width={4} marker="url(#dsdArr)" />
        <L x="440" y="244" size={11} fill={MUTED} weight={700}>automate</L>
      </g>
      <g className="dsdm-emerge" style={m1d(1.6)}>
        <rect x="480" y="80" width="390" height="350" rx="12" fill={N} />
        <rect x="480" y="80" width="390" height="30" rx="12" fill={MUTED} />
        <L x="675" y="100" size={12.5} fill={WHITE}>tabular method (Quine–McCluskey)</L>
      </g>
      {lines.map(([t, tone], i) => (
        <g key={i} className="dsdm-cell-in" style={m1d(2.0 + i * 0.2)}>
          <M x="498" y={140 + i * 28} size={13} fill={tone} anchor="start">{t}</M>
        </g>
      ))}
      <L x="675" y="40" size={15} fill={GREEN}>any n: step-by-step, programmable</L>
    </Scene>
  )
}

export function M1QmStep1Scene() {
  const rows0 = [['m0', '0000', 160, true], ['m2', '0010', 212, true], ['m8', '1000', 244, true], ['m5', '0101', 296, false]]
  return (
    <Scene caption="QM step 1: compare adjacent groups; terms one bit apart merge, leftovers are prime">
      <Card x="60" y="70" w="250" h="340" title="Column 0 · minterms" accent={BLUE} className="dsdm-emerge" />
      <Card x="390" y="70" w="250" h="340" title="Column 1 · merged pairs" accent={PURP} className="dsdm-emerge" />
      <M x="84" y="126" size={11} fill={MUTED} anchor="start">#1s</M>
      <M x="185" y="126" size={11} fill={MUTED}>term</M>
      <M x="84" y="164" size={11} fill={MUTED} anchor="start">0</M>
      <M x="84" y="230" size={11} fill={MUTED} anchor="start">1</M>
      <M x="84" y="300" size={11} fill={MUTED} anchor="start">2</M>
      <path d="M70 182 L300 182 M70 266 L300 266" stroke={MUTED} strokeWidth="1.2" strokeDasharray="4 4" />
      {rows0.map(([m, b, y, merged], i) => (
        <g key={m} className="dsdm-cell-in" style={m1d(0.4 + i * 0.15)}>
          <M x="150" y={y} size={14} fill={N}>{m}</M>
          <M x="215" y={y} size={14} fill={BLUE}>{b}</M>
          {merged ? <M x="282" y={y} size={14} fill={GREEN} className="dsdm-cell-in" style={m1d(2.4)}>✓</M> : null}
        </g>
      ))}
      <g className="dsdm-slide-in" style={m1d(1.3)}>
        <Wire d="M314 156 L386 182" stroke={BLUE} width={2} marker="url(#dsdArrB)" />
        <Wire d="M314 208 L386 186" stroke={BLUE} width={2} marker="url(#dsdArrB)" />
      </g>
      <g className="dsdm-slide-in" style={m1d(1.8)}>
        <Wire d="M314 160 L386 228" stroke={PURP} width={2} marker="url(#dsdArrP)" />
        <Wire d="M314 244 L386 236" stroke={PURP} width={2} marker="url(#dsdArrP)" />
      </g>
      <M x="515" y="126" size={11} fill={MUTED}>pair · pattern</M>
      <g className="dsdm-cell-in" style={m1d(1.6)}>
        <M x="515" y="190" size={14} fill={N}>m0,2  00<tspan fill={AMBER}>-</tspan>0</M>
      </g>
      <g className="dsdm-cell-in" style={m1d(2.1)}>
        <M x="515" y="240" size={14} fill={N}>m0,8  <tspan fill={AMBER}>-</tspan>000</M>
      </g>
      <L x="515" y="330" size={11} fill={MUTED} weight={700}>dashes in different places →</L>
      <L x="515" y="348" size={11} fill={MUTED} weight={700}>no further merge</L>
      <g className="dsdm-emerge" style={m1d(2.8)}>
        <ellipse cx="515" cy="185" rx="112" ry="18" fill="none" stroke={RED} strokeWidth="2.6" />
        <ellipse cx="515" cy="235" rx="112" ry="18" fill="none" stroke={RED} strokeWidth="2.6" />
        <ellipse cx="200" cy="291" rx="95" ry="18" fill="none" stroke={RED} strokeWidth="2.6" />
        <L x="185" y="340" size={11.5} fill={RED} weight={700}>m5: no neighbour one bit away</L>
      </g>
      <g className="dsdm-emerge" style={m1d(3.2)}>
        <Block x="668" y="180" w="206" h="64" label="Prime Implicants" sub="00-0,  -000,  0101" stroke={RED} labelFill={RED} size={15} />
        <Wire d="M666 200 L632 188" stroke={RED} width={2} marker="url(#dsdArrR)" />
        <Wire d="M666 226 L632 234" stroke={RED} width={2} marker="url(#dsdArrR)" />
      </g>
      <L x="350" y="446" size={12.5} fill={MUTED} weight={700}>differing bit → dash ( - ) ;  ✓ = term was used in a merge</L>
    </Scene>
  )
}

export function M1QmChartScene() {
  const cols = ['m0', 'm2', 'm5', 'm8']
  const pis = [['PI_1', '00-0', [0, 1]], ['PI_2', '0101', [2]], ['PI_3', '-000', [0, 3]]]
  const cx = (c) => 375 + c * 110
  const cy = (r) => 175 + r * 70
  return (
    <Scene caption="Prime implicant chart: a column with a single X names an essential prime implicant">
      <g className="dsdm-emerge">
        <rect x="120" y="90" width="640" height="260" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
      </g>
      <g className="dsdm-cell-in" style={m1d(2.6)}>
        <rect x="122" y="212" width="636" height="66" fill={GREEN} opacity="0.16" />
      </g>
      <g className="dsdm-cell-in" style={m1d(1.8)}>
        <g className="dsdm-charge">
          <rect x="542" y="92" width="106" height="256" fill={AMBER} opacity="0.18" />
        </g>
      </g>
      <g className="dsdm-emerge">
        <path d="M120 140 L760 140 M120 210 L760 210 M120 280 L760 280 M320 90 L320 350 M430 90 L430 350 M540 90 L540 350 M650 90 L650 350" stroke={BLUE} strokeWidth="1.4" />
        {cols.map((t, c) => <M key={t} x={cx(c)} y="122" size={15} fill={c === 2 ? AMBER : N}>{t}</M>)}
        {pis.map(([p, b], r) => (
          <g key={p}>
            <M x="175" y={cy(r) + 5} size={14} fill={r === 1 ? GREEN : N}>{p}</M>
            <M x="265" y={cy(r) + 5} size={14} fill={MUTED}>{b}</M>
          </g>
        ))}
      </g>
      {pis.map(([p, , cover], r) => cover.map((c, k) => (
        <g key={`${p}${c}`} className="dsdm-cell-in" style={m1d(0.8 + r * 0.3 + k * 0.1)}>
          <M x={cx(c)} y={cy(r) + 8} size={24} fill={N}>X</M>
        </g>
      )))}
      <g className="dsdm-emerge" style={m1d(2.2)}>
        <circle cx={cx(2)} cy={cy(1)} r="25" fill="none" stroke={AMBER} strokeWidth="3.4" />
      </g>
      <g className="dsdm-emerge" style={m1d(3.4)}>
        <circle cx={cx(1)} cy={cy(0)} r="23" fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="5 4" />
        <circle cx={cx(3)} cy={cy(2)} r="23" fill="none" stroke={MUTED} strokeWidth="2" strokeDasharray="5 4" />
      </g>
      <g className="dsdm-slide-in" style={m1d(2.9)}>
        <L x="62" y="228" size={15} fill={GREEN}>Essential!</L>
        <Wire d="M16 246 L112 246" stroke={GREEN} width={3.2} marker="url(#dsdArrG)" />
      </g>
      <g className="dsdm-slide-in" style={m1d(3.2)}>
        <L x="440" y="400" size={15} fill={N}>m5 has one X → PI_2 must appear in every cover</L>
        <L x="440" y="428" size={12} fill={MUTED} weight={700}>m2 and m8 are single-X columns too (dashed): PI_1, PI_3 also essential</L>
        <M x="440" y="456" size={14} fill={GREEN}>F = PI_1 + PI_2 + PI_3 = A'B'D' + A'BC'D + B'C'D'</M>
      </g>
    </Scene>
  )
}

export function M1QmCyclicScene() {
  const cols = ['m1', 'm3', 'm5']
  const rows = [['Row A', [0, 1]], ['Row B', [0, 1, 2]], ['Row C', [2]]]
  const cx = (c) => 400 + c * 140
  const cy = (r) => 165 + r * 70
  return (
    <Scene caption="Cyclic chart: no column has a single X, so drop rows that another row dominates">
      <L x="450" y="56" size={14} fill={MUTED}>Reduced chart — every column still has two Xs</L>
      <g className="dsdm-emerge">
        <rect x="150" y="80" width="600" height="260" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <path d="M150 130 L750 130 M150 200 L750 200 M150 270 L750 270 M330 80 L330 340 M470 80 L470 340 M610 80 L610 340" stroke={BLUE} strokeWidth="1.4" />
        {cols.map((t, c) => <M key={t} x={cx(c)} y="112" size={15}>{t}</M>)}
        {rows.map(([t], r) => <L key={t} x="240" y={cy(r) + 5} size={15}>{t}</L>)}
      </g>
      {rows.map(([t, cover], r) => cover.map((c) => (
        <g key={`${t}${c}`} className="dsdm-cell-in" style={m1d(0.6 + r * 0.25)}>
          <M x={cx(c)} y={cy(r) + 8} size={24}>X</M>
        </g>
      )))}
      <g className="dsdm-emerge" style={m1d(1.6)}>
        <rect x="142" y="124" width="616" height="152" rx="10" fill="none" stroke={PURP} strokeWidth="2.6" strokeDasharray="9 6" />
      </g>
      <g className="dsdm-slide-in" style={m1d(1.9)}>
        <L x="450" y="376" size={15} fill={PURP}>Row B dominates Row A: B covers m1, m3 — and m5 as well</L>
      </g>
      <g className="dsdm-emerge" style={m1d(2.6)}>
        <path d="M156 160 L744 160" stroke={RED} strokeWidth="4" strokeLinecap="round" />
        <L x="80" y="171" size={15} fill={RED}>✗ drop</L>
      </g>
      <g className="dsdm-slide-in" style={m1d(3.2)}>
        <L x="450" y="410" size={14} fill={GREEN}>A gone → m1 and m3 now have one X → Row B is selected</L>
        <L x="450" y="438" size={12} fill={MUTED} weight={700}>no dominance left? Petrick's method enumerates the remaining covers</L>
      </g>
    </Scene>
  )
}

export function M1MethodsScaleScene() {
  /* The swinging group is mirrored so the stock dsdm-wrap swing (clockwise
     first) reads as the left pan tipping down first. Drawing x = 900 − visual
     x inside it; every shape there is symmetric, so nothing reads backwards. */
  const fx = (v) => 900 - v
  const tray = (vx) => `M${fx(vx) - 70} 250 L${fx(vx) + 70} 250 Q${fx(vx)} 276 ${fx(vx) - 70} 250 Z`
  return (
    <Scene caption="K-maps and Quine–McCluskey reach the same minimum — they balance, not compete">
      <L x="450" y="40" size={15} fill={N}>Same goal: the minimal standard form</L>
      <path d="M450 150 L450 392" stroke={N} strokeWidth="5" strokeLinecap="round" />
      <path d="M390 404 L450 382 L510 404 Z" fill={MUTED} />
      <g transform="matrix(-1 0 0 1 900 0)">
        <g className="dsdm-wrap" style={m1d(1.6)}>
          <rect x="440" y="37" width="20" height="226" fill="none" />
          <path d="M190 150 L710 150" stroke={N} strokeWidth="6" strokeLinecap="round" />
          {[190, 710].map((vx) => (
            <g key={vx}>
              <path d={`M${fx(vx)} 150 L${fx(vx) - 70} 250 M${fx(vx)} 150 L${fx(vx) + 70} 250`} stroke={MUTED} strokeWidth="1.8" />
              <path d={tray(vx)} fill={SKY} stroke={N} strokeWidth="2.4" />
            </g>
          ))}
          <g className="dsdm-emerge" style={m1d(0.3)}>
            {[[165, 234], [177, 226], [171, 238], [160, 224]].map(([vx, y], i) => (
              <circle key={i} cx={fx(vx)} cy={y} r="10" fill={WHITE} stroke={PURP} strokeWidth="2.2" />
            ))}
            <rect x={fx(230)} y="218" width="30" height="30" fill={WHITE} stroke={BLUE} strokeWidth="1.6" />
            <path d={`M${fx(230) + 7.5} 218 L${fx(230) + 7.5} 248 M${fx(230) + 15} 218 L${fx(230) + 15} 248 M${fx(230) + 22.5} 218 L${fx(230) + 22.5} 248 M${fx(230)} 225.5 L${fx(230) + 30} 225.5 M${fx(230)} 233 L${fx(230) + 30} 233 M${fx(230)} 240.5 L${fx(230) + 30} 240.5`} stroke={BLUE} strokeWidth="1" />
            <rect x={fx(230)} y="218" width="15" height="7.5" fill={BLUE} opacity="0.5" />
          </g>
          <g className="dsdm-emerge" style={m1d(1.4)}>
            <rect x={fx(708)} y="216" width="34" height="30" rx="3" fill={N} />
            <path d={`M${fx(708) - 5} 223 L${fx(708)} 223 M${fx(708) - 5} 231 L${fx(708)} 231 M${fx(708) - 5} 239 L${fx(708)} 239 M${fx(708) + 34} 223 L${fx(708) + 39} 223 M${fx(708) + 34} 231 L${fx(708) + 39} 231 M${fx(708) + 34} 239 L${fx(708) + 39} 239`} stroke={N} strokeWidth="2" />
            {[222, 230, 238, 246].map((y, i) => (
              <path key={y} d={`M${fx(750)} ${y} L${fx(750) + (i % 2 ? 22 : 30)} ${y}`} stroke={TEAL} strokeWidth="3" strokeLinecap="round" />
            ))}
          </g>
        </g>
      </g>
      <circle cx="450" cy="150" r="7" fill={N} />
      <g className="dsdm-slide-in" style={m1d(0.4)}>
        <Card x="40" y="372" w="300" h="106" title="Karnaugh map · human" accent={PURP} lines={['Fast, intuitive, visual', 'Max 4–5 variables', 'Hand design of small blocks']} />
      </g>
      <g className="dsdm-slide-in" style={m1d(1.4)}>
        <Card x="560" y="372" w="300" h="106" title="Quine–McCluskey · machine" accent={TEAL} lines={['Algorithmic, slow for humans', 'Any number of variables', 'Runs inside CAD synthesis tools']} />
      </g>
    </Scene>
  )
}

export function M1QmDontCareScene() {
  const terms = [['1', 'm2', '0010', 144, false], ['', 'm4', '0100', 172, false], ['', 'm8', '1000', 200, true], ['2', 'm6', '0110', 248, true]]
  return (
    <Scene caption="QM with don't-cares: Xs join the merging in step 1, then leave the chart in step 2">
      <Card x="30" y="60" w="390" h="380" title="Step 1 · Grouping — Xs act as 1s" accent={PURP} className="dsdm-emerge" />
      <Card x="480" y="60" w="390" h="380" title="Step 2 · Chart — Xs dropped" accent={GREEN} className="dsdm-emerge" />
      <M x="56" y="116" size={11} fill={MUTED} anchor="start">#1s</M>
      <path d="M44 220 L406 220" stroke={MUTED} strokeWidth="1.2" strokeDasharray="4 4" />
      {terms.map(([g, m, b, y, dc]) => (
        <g key={m}>
          <M x="62" y={y} size={12} fill={MUTED} anchor="start">{g}</M>
          <M x="130" y={y} size={14} fill={dc ? PURP : N}>{dc ? `${m} X` : m}</M>
          <M x="210" y={y} size={14} fill={dc ? PURP : BLUE}>{b}</M>
        </g>
      ))}
      <Wire d="M250 140 L288 152" stroke={TEAL} width={2} marker="url(#dsdArrT)" className="dsdm-flow-arrow" />
      <Wire d="M250 242 L288 160" stroke={TEAL} width={2} marker="url(#dsdArrT)" className="dsdm-flow-arrow" />
      <Wire d="M250 168 L288 222" stroke={BLUE} width={2} marker="url(#dsdArrB)" className="dsdm-flow-arrow" />
      <Wire d="M250 248 L288 230" stroke={BLUE} width={2} marker="url(#dsdArrB)" className="dsdm-flow-arrow" />
      <g className="dsdm-cell-in" style={m1d(1.0)}>
        <M x="345" y="160" size={13} fill={TEAL}>0-10</M>
        <M x="345" y="178" size={10.5} fill={MUTED}>m2 + m6</M>
        <M x="345" y="230" size={13} fill={BLUE}>01-0</M>
        <M x="345" y="248" size={10.5} fill={MUTED}>m4 + m6</M>
      </g>
      <L x="225" y="300" size={11.5} fill={MUTED} weight={700}>m6 (an X) lets both m2 and m4 merge</L>
      <L x="225" y="322" size={11.5} fill={MUTED} weight={700}>m8 (an X) finds no partner: its term covers no real 1</L>
      <L x="225" y="376" size={12} fill={PURP}>Step 1: don't-cares build bigger implicants</L>
      <g className="dsdm-slide-in" style={m1d(1.8)}>
        <Wire d="M424 120 L474 120" stroke={N} width={3.4} marker="url(#dsdArr)" />
        <L x="449" y="106" size={11} fill={MUTED} weight={700}>PIs</L>
      </g>
      {['m2', 'm4', 'm6', 'm8'].map((t, i) => (
        <g key={t} opacity={i > 1 ? 0.45 : 1}>
          <rect x={540 + i * 72} y="106" width="54" height="28" rx="6" fill={WHITE} stroke={i > 1 ? PURP : GREEN} strokeWidth="2" strokeDasharray={i > 1 ? '5 4' : undefined} />
          <M x={567 + i * 72} y="125" size={13} fill={i > 1 ? PURP : N}>{t}</M>
        </g>
      ))}
      <g className="dsdm-emerge" style={m1d(2.4)}>
        <path d="M680 138 L740 102 M752 138 L812 102" stroke={RED} strokeWidth="3" strokeLinecap="round" />
        <L x="746" y="160" size={13} fill={RED}>Don't-cares excluded!</L>
      </g>
      <g className="dsdm-emerge" style={m1d(2.8)}>
        <rect x="520" y="190" width="320" height="180" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
        <path d="M520 230 L840 230 M520 300 L840 300 M680 190 L680 370 M760 190 L760 370" stroke={GREEN} strokeWidth="1.4" />
        <M x="720" y="216" size={14}>m2</M>
        <M x="800" y="216" size={14}>m4</M>
        <M x="600" y="270" size={13} fill={TEAL}>0-10 (2,6)</M>
        <M x="600" y="340" size={13} fill={BLUE}>01-0 (4,6)</M>
        <M x="720" y="273" size={22}>X</M>
        <M x="800" y="343" size={22}>X</M>
      </g>
      <g className="dsdm-slide-in" style={m1d(3.3)}>
        <M x="675" y="412" size={13} fill={GREEN}>F = A'CD' + A'BD'</M>
      </g>
    </Scene>
  )
}

/* ── Module 2 ────────────────────────────────────────────────────────── */

export function M2HalfToFullAdderBuildScene() {
  return (
    <Scene caption="A full adder built from two half adders and an OR gate">
      <g className="dsdm-pulse">
        <Block x="150" y="80" w="90" h="90" label="HA1" sub="Half Adder" />
        <Wire d="M 80 110 L 150 110" marker="url(#dsdArr)" />
        <M x="70" y="114" anchor="end">A</M>
        <Wire d="M 80 150 L 150 150" marker="url(#dsdArr)" />
        <M x="70" y="154" anchor="end">B</M>
      </g>
      
      <g className="dsdm-fade-in dsdm-delay-0">
        <Block x="360" y="80" w="90" h="90" label="HA2" sub="Half Adder" />
        {/* P from HA1 to HA2 */}
        <Wire d="M 240 110 L 360 110" marker="url(#dsdArrB)" stroke={BLUE} />
        <M x="300" y="100" fill={BLUE}>P = A ⊕ B</M>
        
        {/* Cin to HA2 */}
        <Wire d="M 405 40 L 405 80" marker="url(#dsdArr)" />
        <M x="405" y="32" anchor="middle">Cin</M>
      </g>
      
      <g className="dsdm-fade-in dsdm-delay-1">
        <Block x="540" y="130" w="70" h="60" label="OR" />
        {/* G from HA1 to OR */}
        <Wire d="M 240 150 L 300 150 L 300 180 L 520 180 L 520 170 L 540 170" marker="url(#dsdArrA)" stroke={AMBER} />
        <M x="270" y="142" fill={AMBER}>G = AB</M>
        
        {/* P*Cin from HA2 to OR */}
        <Wire d="M 450 150 L 540 150" marker="url(#dsdArrA)" stroke={AMBER} />
        <M x="495" y="142" fill={AMBER}>P·Cin</M>
        
        {/* Cout from OR */}
        <Wire d="M 610 160 L 680 160" marker="url(#dsdArrA)" stroke={AMBER} />
        <M x="690" y="164" fill={AMBER} anchor="start" weight={800}>Cout</M>
      </g>
      
      {/* S from HA2 */}
      <g className="dsdm-fade-in dsdm-delay-2">
        <Wire d="M 450 110 L 680 110" marker="url(#dsdArrB)" stroke={BLUE} />
        <M x="690" y="114" fill={BLUE} anchor="start" weight={800}>Sum (S)</M>
      </g>

      <g className="dsdm-fade-in dsdm-delay-3">
        <Panel
          x="120" y="220" w="180" rowH="20" title="HA1 Truth Table"
          rows={[
            ['A B', 'P G', MUTED],
            ['0 0', '0 0', N],
            ['0 1', '1 0', N],
            ['1 0', '1 0', N],
            ['1 1', '0 1', N]
          ]}
          mono={true}
        />
      </g>

      <g className="dsdm-fade-in dsdm-delay-4">
        <Panel
          x="350" y="220" w="280" rowH="20" title="Full Adder Truth Table"
          rows={[
            ['A B Cin', 'Cout S', MUTED],
            ['0 0  0', ' 0   0', N],
            ['0 0  1', ' 0   1', BLUE],
            ['0 1  0', ' 0   1', N],
            ['0 1  1', ' 1   0', N],
            ['1 0  0', ' 0   1', N],
            ['1 0  1', ' 1   0', N],
            ['1 1  0', ' 1   0', N],
            ['1 1  1', ' 1   1', N]
          ]}
          mono={true}
        />
      </g>
    </Scene>
  )
}

export function M2RippleCarryChain4BitScene() {
  return (
    <Scene caption="A 4-bit binary parallel adder with ripple-carry delay">
      <g className="dsdm-fade-in dsdm-delay-0">
        {[3, 2, 1, 0].map(i => {
          const x = 120 + (3 - i) * 140
          return (
            <g key={i}>
              <Block x={x} y="150" w="100" h="100" label={`FA${i}`} sub="Full Adder" />
              {/* Inputs */}
              <Wire d={`M ${x + 30} 90 L ${x + 30} 150`} marker="url(#dsdArr)" />
              <M x={x + 30} y="82">A_{i}</M>
              <Wire d={`M ${x + 70} 90 L ${x + 70} 150`} marker="url(#dsdArr)" />
              <M x={x + 70} y="82">B_{i}</M>
              {/* Sum Output */}
              <Wire d={`M ${x + 50} 250 L ${x + 50} 310`} marker="url(#dsdArr)" />
              <M x={x + 50} y="325">S_{i}</M>
            </g>
          )
        })}
      </g>
      
      {/* Carry Chain */}
      <g className="dsdm-fade-in dsdm-delay-1">
        <Wire d="M 740 200 L 680 200" marker="url(#dsdArr)" stroke={AMBER} />
        <M x="750" y="204" anchor="start" fill={AMBER}>C0</M>
        
        <Wire d="M 540 200 L 480 200" marker="url(#dsdArr)" stroke={AMBER} />
        <M x="510" y="190" fill={AMBER}>C1</M>
        
        <Wire d="M 400 200 L 340 200" marker="url(#dsdArr)" stroke={AMBER} />
        <M x="370" y="190" fill={AMBER}>C2</M>
        
        <Wire d="M 260 200 L 200 200" marker="url(#dsdArr)" stroke={AMBER} />
        <M x="230" y="190" fill={AMBER}>C3</M>
        
        <Wire d="M 120 200 L 60 200" marker="url(#dsdArr)" stroke={AMBER} />
        <M x="50" y="204" anchor="end" fill={AMBER}>C4</M>
        <L x="20" y="226" anchor="start" size="12" fill={MUTED}>carry out</L>
      </g>
      
      {/* Timing Ruler */}
      <g className="dsdm-pulse">
        <Wire d="M 100 400 L 700 400" />
        <M x="700" y="420">0</M>
        <Wire d="M 700 395 L 700 405" />
        <M x="510" y="420">2</M>
        <Wire d="M 510 395 L 510 405" />
        <M x="370" y="420">4</M>
        <Wire d="M 370 395 L 370 405" />
        <M x="230" y="420">6</M>
        <Wire d="M 230 395 L 230 405" />
        <M x="90" y="420">8 gate levels</M>
        <Wire d="M 90 395 L 90 405" />
      </g>
    </Scene>
  )
}

export function M2PgLookaheadBlockScene() {
  return (
    <Scene caption="Carry look-ahead: generating carriers directly to remove ripple delay">
      {/* P/G cells */}
      <g className="dsdm-fade-in dsdm-delay-0">
        {[3, 2, 1, 0].map(i => {
          const x = 120 + (3 - i) * 140
          return (
            <g key={i}>
              <Block x={x} y="60" w="100" h="70" label={`P${i} / G${i}`} />
              <Wire d={`M ${x + 30} 20 L ${x + 30} 60`} />
              <M x={x + 30} y="10">A_{i}</M>
              <Wire d={`M ${x + 70} 20 L ${x + 70} 60`} />
              <M x={x + 70} y="10">B_{i}</M>
              {/* Outputs to CLA */}
              <Wire d={`M ${x + 50} 130 L ${x + 50} 180`} marker="url(#dsdArr)" stroke={BLUE} />
            </g>
          )
        })}
        <L x="390" y="150" fill={BLUE} size="12">P_i = A_i ⊕ B_i, G_i = A_i B_i</L>
      </g>
      
      {/* CLA Generator */}
      <g className="dsdm-fade-in dsdm-delay-1">
        <Block x="100" y="180" w="540" h="80" label="Look-ahead carry generator" />
        <Wire d="M 700 220 L 640 220" marker="url(#dsdArr)" />
        <M x="710" y="224" anchor="start">C0</M>
        
        {/* Carry Outputs */}
        {[3, 2, 1, 0].map(i => {
          const x = 120 + (3 - i) * 140 + 50
          return (
            <g key={i}>
              <Wire d={`M ${x} 260 L ${x} 310`} marker="url(#dsdArr)" stroke={AMBER} />
              <M x={x + 20} y="285" fill={AMBER}>C{i+1}</M>
            </g>
          )
        })}
      </g>
      
      {/* XOR row */}
      <g className="dsdm-pulse">
        {[3, 2, 1, 0].map(i => {
          const x = 120 + (3 - i) * 140
          return (
            <g key={i}>
              <Block x={x + 10} y="310" w="80" h="60" label="XOR" />
              {/* P to XOR bypassing CLA */}
              <Wire d={`M ${x + 15} 130 L ${x + 15} 310`} stroke={BLUE} opacity="0.4" />
              <Wire d={`M ${x + 50} 370 L ${x + 50} 420`} marker="url(#dsdArr)" />
              <M x={x + 50} y="435">S_{i}</M>
            </g>
          )
        })}
      </g>
      
      {/* Carry Equations */}
      <g className="dsdm-fade-in dsdm-delay-2">
        <Card x="670" y="270" w="210" h="180" title="Carry Equations" accent={AMBER} mono={true}>
          <M x="105" y="70" fill={AMBER}>C1 = G0 + P0 C0</M>
          <M x="105" y="100" fill={AMBER}>C2 = G1 + P1 G0 + P1 P0 C0</M>
          <M x="105" y="130" fill={AMBER}>C3 = G2 + P2 G1 + ...</M>
          <M x="105" y="160" fill={AMBER}>C4 = G3 + P3 G2 + ...</M>
        </Card>
      </g>
    </Scene>
  )
}

export function M2XorModeAdderSubtractorScene() {
  return (
    <Scene caption="Binary adder-subtractor with XOR mode control">
      <g className="dsdm-fade-in dsdm-delay-0">
        <Wire d="M 80 30 L 800 30" stroke={ROSE} />
        <M x="810" y="34" fill={ROSE} anchor="start">M (Mode)</M>
        <L x="892" y="54" size="12" fill={MUTED} anchor="end">0: Add, 1: Sub</L>
        
        {/* Bend M to C0 */}
        <Wire d="M 750 30 L 750 250 L 690 250" marker="url(#dsdArrRo)" stroke={ROSE} />
        <M x="710" y="240" fill={ROSE}>C0</M>
      </g>
      
      <g className="dsdm-fade-in dsdm-delay-1">
        {[3, 2, 1, 0].map(i => {
          const x = 160 + (3 - i) * 130
          return (
            <g key={i}>
              <Block x={x} y="200" w="90" h="90" label={`FA${i}`} sub="Full Adder" />
              {/* XOR gate above */}
              <Block x={x + 30} y="100" w="50" h="50" label="XOR" />
              {/* M to XOR */}
              <Wire d={`M ${x + 65} 30 L ${x + 65} 100`} stroke={ROSE} marker="url(#dsdArrRo)" />
              {/* B to XOR */}
              <Wire d={`M ${x + 40} 60 L ${x + 40} 100`} />
              <M x={x + 40} y="54">B_{i}</M>
              {/* XOR out to FA B pin */}
              <Wire d={`M ${x + 55} 150 L ${x + 55} 200`} marker="url(#dsdArr)" />
              {/* A directly to FA */}
              <Wire d={`M ${x + 20} 60 L ${x + 20} 200`} marker="url(#dsdArr)" />
              <M x={x + 20} y="54">A_{i}</M>
              {/* Sum Output */}
              <Wire d={`M ${x + 45} 290 L ${x + 45} 340`} marker="url(#dsdArr)" />
              <M x={x + 45} y="355">S_{i}</M>
            </g>
          )
        })}
        {/* Carries between FA */}
        <Wire d="M 550 250 L 510 250" marker="url(#dsdArr)" />
        <Wire d="M 420 250 L 380 250" marker="url(#dsdArr)" />
        <Wire d="M 290 250 L 250 250" marker="url(#dsdArr)" />
      </g>
      
      {/* V Overflow Gate */}
      <g className="dsdm-pulse">
        <Wire d="M 160 230 L 100 230 L 100 290 L 120 290" marker="url(#dsdArr)" />
        <M x="110" y="220">C4</M>
        <Wire d="M 290 250 L 270 250 L 270 310 L 120 310" marker="url(#dsdArr)" opacity="0.4" />
        <M x="280" y="280" fill={MUTED}>C3</M>
        <Block x="30" y="280" w="90" h="50" label="XOR" />
        <Wire d="M 75 330 L 75 362" marker="url(#dsdArr)" />
        <M x="75" y="382" fill={RED} weight={800}>V</M>
        <L x="75" y="400" size="12" fill={MUTED}>Overflow</L>
      </g>
    </Scene>
  )
}

export function M2BcdCorrectionNumberLineScene() {
  return (
    <Scene caption="BCD correction: skipping the six unused binary codes">
      <g className="dsdm-fade-in dsdm-delay-0">
        <Wire d="M 40 240 L 860 240" marker="url(#dsdArr)" width="3" />
        {/* Ticks 0 to 19 */}
        {Array.from({ length: 20 }).map((_, i) => {
          const x = 60 + i * 40
          let fill = GREEN
          if (i >= 10 && i <= 15) fill = AMBER
          if (i >= 16) fill = RED
          
          return (
            <g key={i}>
              <Wire d={`M ${x} 230 L ${x} 250`} stroke={fill} width="3" />
              <M x={x} y="270" size="13" fill={fill}>{i}</M>
              {/* 5-bit binary vertical */}
              <M x={x} y="325" size="10" fill={MUTED}>
                {i.toString(2).padStart(5, '0')}
              </M>
            </g>
          )
        })}
      </g>
      
      {/* Regions */}
      <g className="dsdm-pulse">
        <rect x="50" y="225" width="370" height="30" fill={GREEN} opacity="0.1" rx="4" />
        <L x="240" y="360" fill={GREEN} size="14">valid BCD, no correction (0-9)</L>
        
        <rect x="450" y="225" width="230" height="30" fill={AMBER} opacity="0.1" rx="4" />
        <M x="565" y="360" fill={AMBER} size="14">Z8·Z4 or Z8·Z2 = 1</M>
        
        <rect x="690" y="225" width="150" height="30" fill={RED} opacity="0.1" rx="4" />
        <M x="765" y="360" fill={RED} size="14">K = 1</M>
      </g>
      
      {/* Correction jumps */}
      <g className="dsdm-fade-in dsdm-delay-1">
        {/* Just draw a few +6 arrows for 10->16, 11->17, etc */}
        {[10, 11, 12, 13].map(i => {
          const x1 = 60 + i * 40
          const x2 = 60 + (i + 6) * 40
          const mx = (x1 + x2) / 2
          return (
            <g key={i}>
              <path d={`M ${x1} 220 Q ${mx} 160 ${x2} 220`} fill="none" stroke={MUTED} strokeWidth="1.5" markerEnd="url(#dsdArr)" strokeDasharray="4 2" />
              <M x={mx} y="170" size="11" fill={MUTED}>+6</M>
            </g>
          )
        })}
      </g>
      
      {/* Equation */}
      <g className="dsdm-fade-in dsdm-delay-2">
        <M x="450" y="420" size="22">C = K + Z8·Z4 + Z8·Z2</M>
        <Wire d="M 405 435 L 420 435" stroke={RED} width="3" />
        <Wire d="M 450 435 L 595 435" stroke={AMBER} width="3" />
      </g>
    </Scene>
  )
}

export function M2BcdAdderTwoStageScene() {
  return (
    <Scene caption="BCD adder: binary sum followed by conditional +6 correction">
      {/* Adder 1 */}
      <g className="dsdm-fade-in dsdm-delay-0">
        <Block x="350" y="60" w="200" h="80" label="Adder 1 (Binary)" />
        <Wire d="M 400 20 L 400 60" marker="url(#dsdArr)" />
        <M x="400" y="10">Augend</M>
        <Wire d="M 500 20 L 500 60" marker="url(#dsdArr)" />
        <M x="500" y="10">Addend</M>
        <Wire d="M 620 100 L 550 100" marker="url(#dsdArr)" />
        <M x="630" y="104" anchor="start">Carry in</M>
        
        {/* K output */}
        <Wire d="M 350 100 L 250 100 L 250 250" marker="url(#dsdArr)" stroke={RED} />
        <M x="240" y="110" fill={RED}>K</M>
        
        {/* Z outputs */}
        <Wire d="M 400 140 L 400 200" stroke={AMBER} />
        <M x="415" y="170" fill={AMBER}>Z8</M>
        <Wire d="M 430 140 L 430 200" stroke={AMBER} />
        <M x="445" y="170" fill={AMBER}>Z4</M>
        <Wire d="M 460 140 L 460 200" stroke={AMBER} />
        <M x="475" y="170" fill={AMBER}>Z2</M>
        <Wire d="M 500 140 L 500 350" />
        <M x="515" y="170">Z1</M>
      </g>
      
      {/* Detector */}
      <g className="dsdm-fade-in dsdm-delay-1">
        {/* Gates for Z8Z4, Z8Z2 */}
        <Block x="350" y="210" w="60" h="40" label="AND" size="11" />
        <Block x="430" y="210" w="60" h="40" label="AND" size="11" />
        <Wire d="M 400 200 L 370 200 L 370 210" marker="url(#dsdArr)" />
        <Wire d="M 430 200 L 390 200 L 390 210" marker="url(#dsdArr)" />
        <Wire d="M 400 200 L 450 200 L 450 210" marker="url(#dsdArr)" />
        <Wire d="M 460 200 L 470 200 L 470 210" marker="url(#dsdArr)" />
        
        {/* OR for C */}
        <Block x="300" y="280" w="80" h="50" label="OR" size="12" />
        <Wire d="M 250 250 L 310 250 L 310 280" marker="url(#dsdArr)" />
        <Wire d="M 380 250 L 340 250 L 340 280" marker="url(#dsdArr)" />
        <Wire d="M 460 250 L 370 250 L 370 280" marker="url(#dsdArr)" />
        
        {/* Output carry */}
        <Wire d="M 300 305 L 150 305" marker="url(#dsdArr)" stroke={BLUE} width="3" />
        <M x="140" y="309" fill={BLUE} anchor="end">Output carry (C)</M>
      </g>
      
      {/* Adder 2 */}
      <g className="dsdm-fade-in dsdm-delay-2">
        <Block x="350" y="350" w="200" h="80" label="Adder 2 (Correction)" />
        {/* A inputs from Z */}
        <Wire d="M 400 200 L 400 350" marker="url(#dsdArr)" opacity="0.4" />
        <Wire d="M 430 200 L 430 350" marker="url(#dsdArr)" opacity="0.4" />
        <Wire d="M 460 200 L 460 350" marker="url(#dsdArr)" opacity="0.4" />
        <Wire d="M 500 200 L 500 350" marker="url(#dsdArr)" />
        
        {/* B inputs = 0 C C 0 */}
        <Wire d="M 340 305 L 430 305 L 430 350" marker="url(#dsdArr)" stroke={BLUE} />
        <Wire d="M 430 305 L 460 305 L 460 350" marker="url(#dsdArr)" stroke={BLUE} />
        <M x="390" y="340">0</M>
        <M x="420" y="340" fill={BLUE}>C</M>
        <M x="470" y="340" fill={BLUE}>C</M>
        <M x="520" y="340">0</M>
        
        {/* Outputs */}
        <Wire d="M 400 430 L 400 480" marker="url(#dsdArr)" />
        <M x="400" y="495">S8</M>
        <Wire d="M 430 430 L 430 480" marker="url(#dsdArr)" />
        <M x="430" y="495">S4</M>
        <Wire d="M 460 430 L 460 480" marker="url(#dsdArr)" />
        <M x="460" y="495">S2</M>
        <Wire d="M 500 430 L 500 480" marker="url(#dsdArr)" />
        <M x="500" y="495">S1</M>
        
        {/* Ignored carry */}
        <Wire d="M 350 390 L 290 390" />
        <M x="280" y="394" fill={MUTED}>x ignored</M>
      </g>
    </Scene>
  )
}

export function M2MsbFirstComparatorLadderScene() {
  return (
    <Scene caption="Magnitude comparator: equality chain resolving MSB-first">
      {/* Registers */}
      <g className="dsdm-fade-in dsdm-delay-0">
        <Block x="200" y="80" w="400" h="40" label="A (top)" />
        <Block x="200" y="140" w="400" h="40" label="B (bottom)" />
        {[3, 2, 1, 0].map(i => {
          const x = 250 + (3 - i) * 100
          return (
            <g key={i}>
              <M x={x} y="70">A{i}</M>
              <M x={x} y="195">B{i}</M>
              <Wire d={`M ${x - 15} 120 L ${x - 15} 220`} />
              <Wire d={`M ${x + 15} 180 L ${x + 15} 220`} />
              {/* XNOR */}
              <Block x={x - 25} y="220" w="50" h="40" label="XNOR" size="11" />
              <M x={x + 35} y="245">x{i}</M>
              <Wire d={`M ${x} 260 L ${x} 290`} marker="url(#dsdArr)" />
            </g>
          )
        })}
      </g>
      
      {/* Decision ladder */}
      <g className="dsdm-pulse">
        <Wire d="M 120 310 L 220 310" marker="url(#dsdArr)" />
        <M x="110" y="314" anchor="end">Start</M>
        {[3, 2, 1, 0].map(i => {
          const x = 250 + (3 - i) * 100
          return (
            <g key={i}>
              {/* Diamond */}
              <path d={`M ${x} 290 L ${x + 30} 310 L ${x} 330 L ${x - 30} 310 Z`} fill={WHITE} stroke={BLUE} strokeWidth="2" />
              <M x={x} y="315" fill={BLUE} size="11">x{i}=1?</M>
              {/* Yes path */}
              <Wire d={`M ${x + 30} 310 L ${x + 70} 310`} marker="url(#dsdArrG)" stroke={GREEN} />
              <M x={x + 50} y="305" fill={GREEN} size="10">yes</M>
              {/* No path */}
              <Wire d={`M ${x} 330 L ${x} 380`} marker="url(#dsdArrA)" stroke={AMBER} />
              <M x={x + 15} y="360" fill={AMBER} size="10">no</M>
            </g>
          )
        })}
        
        {/* A=B */}
        <Block x="670" y="290" w="80" h="40" label="A = B" fill={GREEN} labelFill={WHITE} />
        
        {/* A>B and A<B */}
        <Wire d="M 250 380 L 150 380 L 150 420" marker="url(#dsdArrA)" stroke={AMBER} />
        <Wire d="M 350 380 L 150 380" stroke={AMBER} />
        <Block x="110" y="420" w="80" h="40" label="A > B" fill={AMBER} labelFill={WHITE} />
        <L x="150" y="410" size="11" fill={MUTED}>If A_i = 1</L>
        
        <Wire d="M 550 380 L 450 380 L 450 420" marker="url(#dsdArrA)" stroke={AMBER} />
        <Wire d="M 450 380 L 250 380" stroke={AMBER} />
        <Block x="410" y="420" w="80" h="40" label="A < B" fill={AMBER} labelFill={WHITE} />
        <L x="450" y="410" size="11" fill={MUTED}>If B_i = 1</L>
      </g>
    </Scene>
  )
}

export function M2DecoderExpansion4To16Scene() {
  return (
    <Scene caption="Decoder expansion: building a 4-to-16 from two 3-to-8 blocks">
      <g className="dsdm-fade-in dsdm-delay-0">
        <M x="100" y="120" size="18">x, y, z</M>
        <Wire d="M 140 115 L 200 115" stroke={BLUE} width="3" />
        <Wire d="M 170 115 L 170 315 L 200 315" stroke={BLUE} width="3" />
        
        <Block x="200" y="80" w="120" h="140" label="3-to-8" sub="Decoder (Top)" />
        <Block x="200" y="280" w="120" h="140" label="3-to-8" sub="Decoder (Bottom)" />
        
        {/* Enable w */}
        <M x="100" y="160" size="18" fill={AMBER}>w</M>
        <Wire d="M 140 155 L 200 155" stroke={AMBER} marker="url(#dsdArrA)" />
        <M x="180" y="145" fill={AMBER} size="11">En</M>
        
        <Wire d="M 150 155 L 150 250 L 170 250" stroke={AMBER} />
        <Block x="170" y="240" w="20" h="20" label="NOT" size="8" />
        <Wire d="M 190 250 L 190 355 L 200 355" stroke={AMBER} marker="url(#dsdArrA)" />
        <M x="180" y="345" fill={AMBER} size="11">En</M>
      </g>
      
      {/* Outputs */}
      <g className="dsdm-pulse">
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          return (
            <g key={`top-${i}`}>
              <Wire d={`M 320 ${95 + i * 15} L 400 ${95 + i * 15}`} />
              <M x="415" y={100 + i * 15} size="12" anchor="start">D{8 + i}</M>
            </g>
          )
        })}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          return (
            <g key={`bot-${i}`}>
              <Wire d={`M 320 ${295 + i * 15} L 400 ${295 + i * 15}`} />
              <M x="415" y={300 + i * 15} size="12" anchor="start">D{i}</M>
            </g>
          )
        })}
      </g>
      
      <g className="dsdm-fade-in dsdm-delay-1">
        <Panel
          x="550" y="180" w="220" rowH="24" title="Enable Logic"
          rows={[
            ['w = 0', 'Bottom enabled', BLUE],
            ['w = 1', 'Top enabled', AMBER]
          ]}
        />
      </g>
    </Scene>
  )
}

function M2MuxTrap({ x, y, w, h, label, invert = false, className = '' }) {
  const [X, Y, W, H] = [n(x), n(y), n(w), n(h)]
  const points = invert
    ? `${X},${Y} ${X + W},${Y + H * 0.2} ${X + W},${Y + H * 0.8} ${X},${Y + H}`
    : `${X},${Y + H * 0.2} ${X + W},${Y} ${X + W},${Y + H} ${X},${Y + H * 0.8}`
  return (
    <g className={className}>
      <polygon points={points} fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      {label ? <L x={X + W / 2} y={Y + H / 2 + 5} size="14">{label}</L> : null}
    </g>
  )
}

export function M2DecoderFullAdderWiringScene() {
  return (
    <Scene caption="Implementing a full adder with a 3-to-8 decoder and two OR gates">
      {/* Inputs */}
      <g className="dsdm-fade-in dsdm-delay-0">
        <M x="200" y="200" size="18">x, y, z</M>
        <Wire d="M 230 195 L 300 195" stroke={BLUE} width="3" marker="url(#dsdArrB)" />
        <M x="280" y="185">A2 A1 A0</M>
      </g>
      
      {/* Decoder */}
      <g className="dsdm-pulse">
        <Block x="300" y="100" w="120" h="200" label="3-to-8" sub="Decoder" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
          return (
            <g key={i}>
              <Wire d={`M 420 ${115 + i * 22} L 470 ${115 + i * 22}`} />
              <M x="440" y={110 + i * 22}>{i}</M>
            </g>
          )
        })}
      </g>
      
      {/* S output OR gate */}
      <g className="dsdm-fade-in dsdm-delay-1">
        <Block x="600" y="120" w="70" h="50" label="OR" />
        <M x="700" y="150" fill={BLUE} size="16">S</M>
        <Wire d="M 670 145 L 690 145" marker="url(#dsdArrB)" stroke={BLUE} />
        
        {/* Minterms 1, 2, 4, 7 to S */}
        <Wire d="M 470 137 L 540 137 L 540 130 L 600 130" marker="url(#dsdArr)" />
        <Wire d="M 470 159 L 550 159 L 550 140 L 600 140" marker="url(#dsdArr)" />
        <Wire d="M 470 203 L 550 203 L 550 150 L 600 150" marker="url(#dsdArr)" />
        <Wire d="M 470 269 L 570 269 L 570 160 L 600 160" marker="url(#dsdArr)" />
      </g>
      
      {/* C output OR gate */}
      <g className="dsdm-fade-in dsdm-delay-2">
        <Block x="600" y="240" w="70" h="50" label="OR" />
        <M x="700" y="270" fill={AMBER} size="16">C</M>
        <Wire d="M 670 265 L 690 265" marker="url(#dsdArrA)" stroke={AMBER} />
        
        {/* Minterms 3, 5, 6, 7 to C */}
        <Wire d="M 470 181 L 540 181 L 540 250 L 600 250" marker="url(#dsdArr)" />
        <Wire d="M 470 225 L 530 225 L 530 260 L 600 260" marker="url(#dsdArr)" />
        <Wire d="M 470 247 L 520 247 L 520 270 L 600 270" marker="url(#dsdArr)" />
        <Wire d="M 570 269 L 570 280 L 600 280" marker="url(#dsdArr)" />
        <circle cx="570" cy="269" r="4" fill={N} />
      </g>
      
      {/* Demux relabel */}
      <g className="dsdm-fade-in dsdm-delay-3">
        <Block x="300" y="360" w="120" h="100" label="1-to-8" sub="Demux" opacity="0.6" stroke={MUTED} />
        <M x="200" y="410" size="14" fill={MUTED}>Data in</M>
        <Wire d="M 260 405 L 300 405" marker="url(#dsdArrM)" stroke={MUTED} opacity="0.6" />
        <M x="360" y="480" size="14" fill={MUTED}>address</M>
        <Wire d="M 360 460 L 360 460" stroke={MUTED} opacity="0.6" />
        <M x="500" y="410" size="14" fill={MUTED}>destinations</M>
      </g>
    </Scene>
  )
}

export function M2PriorityEncoderMaskScene() {
  return (
    <Scene caption="Priority encoder: higher inputs mask out lower ones">
      {/* Inputs D3-D0 */}
      <g className="dsdm-fade-in dsdm-delay-0">
        {[3, 2, 1, 0].map(i => {
          const y = 80 + (3 - i) * 60
          return (
            <g key={i}>
              <M x="100" y={y + 5} size="16">D{i}</M>
              <circle cx="130" cy={y} r="10" fill={i === 2 || i === 1 ? BLUE : MUTED} />
              <Wire d={`M 140 ${y} L 200 ${y}`} />
            </g>
          )
        })}
      </g>
      
      {/* Masks */}
      <g className="dsdm-descend">
        {/* D2 masks D1, D0 */}
        <rect x="180" y="145" width="200" height="120" fill={BLUE} opacity="0.15" />
        <M x="280" y="200" fill={BLUE}>D2 masks D1, D0</M>
        
        {/* D3 masks D2, D1, D0 if it were active */}
        <rect x="160" y="85" width="220" height="180" fill={MUTED} opacity="0.05" />
      </g>
      
      {/* Outputs */}
      <g className="dsdm-pulse">
        <Block x="450" y="120" w="60" h="60" label="x" size="20" />
        <Block x="530" y="120" w="60" h="60" label="y" size="20" />
        <Block x="610" y="120" w="60" h="60" label="V" size="20" fill={BLUE} labelFill={WHITE} />
        <M x="480" y="200">1</M>
        <M x="560" y="200">0</M>
        <M x="640" y="200" fill={BLUE}>1</M>
      </g>
      
      <g className="dsdm-fade-in dsdm-delay-1">
        <Panel
          x="300" y="300" w="400" rowH="30" title="When D2 and D1 are both active:"
          rows={[
            ['Plain encoder says:', 'D2 OR D1 = 11 (False D3)', RED],
            ['Priority encoder says:', 'D2 wins = 10 (Valid=1)', BLUE]
          ]}
        />
      </g>
    </Scene>
  )
}

export function M2MuxAndOrSelectorScene() {
  return (
    <Scene caption="Multiplexer inside: a decoder driving an AND-OR selector">
      {/* Left panel: 4-to-1 mux opened */}
      <g className="dsdm-fade-in dsdm-delay-0">
        <M2MuxTrap x="60" y="80" w="80" h="200" label="4x1" />
        <M x="40" y="115">I0</M>
        <M x="40" y="165">I1</M>
        <M x="40" y="215">I2</M>
        <M x="40" y="265">I3</M>
        <Wire d="M 40 110 L 60 110" />
        <Wire d="M 40 160 L 60 160" />
        <Wire d="M 40 210 L 60 210" />
        <Wire d="M 40 260 L 60 260" />
        <M x="100" y="305">S1 S0</M>
        <Wire d="M 100 290 L 100 270" marker="url(#dsdArr)" />
        <Wire d="M 140 180 L 170 180" marker="url(#dsdArr)" />
        
        {/* Gate view */}
        <rect x="180" y="60" width="260" height="260" fill="none" stroke={MUTED} strokeDasharray="4 4" rx="8" />
        <L x="310" y="50" size="14" fill={MUTED}>Inside the Mux</L>
        
        <Block x="200" y="280" w="80" h="40" label="Decoder" size="11" sub="2-to-4" />
        <M x="240" y="335">S1 S0</M>
        <Wire d="M 240 320 L 240 320" />
        
        {[0, 1, 2, 3].map(i => {
          const y = 80 + i * 50
          return (
            <g key={i}>
              <Block x="300" y={y} w="50" h="40" label="AND" size="11" />
              <Wire d={`M 280 ${y + 10} L 300 ${y + 10}`} />
              <M x="260" y={y + 15}>I{i}</M>
              <Wire d={`M 260 ${y + 30} L 300 ${y + 30}`} />
            </g>
          )
        })}
        
        <Block x="380" y="150" w="50" h="80" label="OR" size="12" />
        {[0, 1, 2, 3].map(i => {
          const y = 80 + i * 50
          return <Wire key={`w-${i}`} d={`M 350 ${y + 20} L 380 ${170 + i * 10}`} />
        })}
        
        <Wire d="M 430 190 L 480 190" marker="url(#dsdArrB)" stroke={BLUE} width="3" />
        <M x="490" y="195" fill={BLUE} size="16">Y</M>
      </g>
      
      {/* Highlighting path for I2 (code 10) */}
      <g className="dsdm-pulse">
        <Wire d="M 280 230 L 300 230" stroke={AMBER} width="3" />
        <Wire d="M 260 210 L 280 210" stroke={AMBER} width="3" />
        <Wire d="M 350 200 L 380 190" stroke={AMBER} width="3" />
        <rect x="295" y="175" width="60" height="50" fill={AMBER} opacity="0.2" rx="6" />
      </g>
      
      {/* Right panel: quad 2-to-1 */}
      <g className="dsdm-fade-in dsdm-delay-1">
        <rect x="520" y="60" width="340" height="260" fill="none" stroke={MUTED} strokeDasharray="4 4" rx="8" />
        <L x="690" y="50" size="14" fill={MUTED}>Quad 2-to-1 Mux</L>
        
        {[1, 2, 3, 4].map(i => {
          const y = 80 + (i - 1) * 45
          return (
            <g key={i}>
              <M2MuxTrap x="620" y={y} w="40" h="40" label="" />
              <M x="590" y={y + 15}>A{i}</M>
              <M x="590" y={y + 35}>B{i}</M>
              <Wire d={`M 660 ${y + 20} L 700 ${y + 20}`} />
              <M x="710" y={y + 25}>Y{i}</M>
            </g>
          )
        })}
        <Wire d="M 640 260 L 640 280" />
        <M x="640" y="295">S</M>
        <Wire d="M 670 260 L 670 280" />
        <M x="670" y="295">E</M>
        
        <Panel
          x="620" y="340" w="240" rowH="20" title="Function Table"
          rows={[
            ['E S', 'Y ', MUTED],
            ['1 X', '0 ', N],
            ['0 0', 'A ', BLUE],
            ['0 1', 'B ', BLUE]
          ]}
        />
      </g>
    </Scene>
  )
}

export function M2MuxImplementationTableScene() {
  // F(A,B,C) = Σ(2,3,5,6): columns I0..I3 are AB = 00..11, rows split on C
  const cols = [
    { h: 'I0', ab: '00', top: 0, bot: 1, hit: [], data: '0', rule: 'neither' },
    { h: 'I1', ab: '01', top: 2, bot: 3, hit: [0, 1], data: '1', rule: 'both' },
    { h: 'I2', ab: '10', top: 4, bot: 5, hit: [1], data: 'C', rule: 'lower only' },
    { h: 'I3', ab: '11', top: 6, bot: 7, hit: [0], data: "C'", rule: 'upper only' },
  ]
  const cx = (i) => 180 + i * 70
  const rowY = [166, 210]
  const pinY = [165, 205, 245, 285]
  const t = (s) => ({ animationDelay: `${s}s` })
  return (
    <Scene caption="Implementing F(A,B,C) = Σ(2,3,5,6) with a 4-to-1 multiplexer">
      <g className="dsdm-fade-in">
        <rect x="60" y="100" width="360" height="176" fill={WHITE} stroke={MUTED} rx="6" />
        <Wire d="M 60 144 L 420 144" stroke={MUTED} width="1.5" />
        <Wire d="M 60 188 L 420 188" stroke={MUTED} width="1" />
        <Wire d="M 60 232 L 420 232" stroke={MUTED} width="1.5" />
        <Wire d="M 145 100 L 145 276" stroke={MUTED} width="1.5" />
        <M x="102" y="170">C = 0</M>
        <M x="102" y="214">C = 1</M>
        <M x="102" y="258" fill={BLUE}>data</M>
        {cols.map((c, i) => (
          <g key={c.h}>
            <M x={cx(i)} y="120" size="14">{c.h}</M>
            <M x={cx(i)} y="137" size="10" fill={MUTED}>AB={c.ab}</M>
            <M x={cx(i)} y={rowY[0] + 5} size="15">{c.top}</M>
            <M x={cx(i)} y={rowY[1] + 5} size="15">{c.bot}</M>
          </g>
        ))}
      </g>
      {cols.flatMap((c, i) => c.hit.map((r) => (
        <circle key={`${i}-${r}`} className="dsdm-fade-in" style={t(0.8 + i * 0.4 + r * 0.2)}
          cx={cx(i)} cy={rowY[r]} r="15" fill="none" stroke={AMBER} strokeWidth="2.5" />
      )))}
      {cols.map((c, i) => (
        <g key={c.rule} className="dsdm-fade-in" style={t(2.4 + i * 0.5)}>
          <M x={cx(i)} y="260" size="16" fill={BLUE} weight={800}>{c.data}</M>
          <M x={cx(i)} y="298" size="10" fill={AMBER}>{c.rule}</M>
        </g>
      ))}
      <L x="240" y="330" size="12" fill={MUTED} weight={600}>rule: circled row(s) in a column set its data input</L>

      <g className="dsdm-fade-in" style={t(4.4)}>
        <M2MuxTrap x="580" y="100" w="100" h="250" label="4-to-1" />
        {cols.map((c, i) => <M key={c.h} x="590" y={pinY[i] + 4} size="11" anchor="start" fill={MUTED}>{c.h}</M>)}
        <Wire d="M 630 400 L 630 330" marker="url(#dsdArr)" />
        <M x="630" y="420">S1 = A, S0 = B</M>
        <Wire d="M 680 225 L 750 225" marker="url(#dsdArrB)" stroke={BLUE} width="3" />
        <M x="766" y="230" fill={BLUE} size="16">F</M>
      </g>
      {cols.map((c, i) => (
        <g key={c.ab} className="dsdm-fade-in" style={t(4.8 + i * 0.4)}>
          {i < 3 ? (
            <>
              <Wire d={`M 530 ${pinY[i]} L 580 ${pinY[i]}`} marker="url(#dsdArrB)" stroke={BLUE} />
              <M x="520" y={pinY[i] + 5} anchor="end" fill={BLUE} size="15">{c.data}</M>
            </>
          ) : (
            <>
              <M x="462" y={pinY[i] + 5} anchor="end" fill={BLUE} size="15">C</M>
              <Wire d={`M 468 ${pinY[i]} L 492 ${pinY[i]}`} stroke={BLUE} />
              <Block x="492" y={pinY[i] - 12} w="40" h="24" label="NOT" size="9" />
              <Wire d={`M 532 ${pinY[i]} L 580 ${pinY[i]}`} marker="url(#dsdArrB)" stroke={BLUE} />
              <M x="556" y={pinY[i] - 8} size="11" fill={BLUE}>C'</M>
            </>
          )}
        </g>
      ))}
    </Scene>
  )
}

export function M2MuxTree16to1Scene() {
  return (
    <Scene caption="Building a 16-to-1 multiplexer using a tree of 4-to-1 blocks">
      {/* Level 1 */}
      <g className="dsdm-fade-in dsdm-delay-0">
        <L x="180" y="430" size="14" fill={MUTED}>Level 1</L>
        {[0, 1, 2, 3].map(i => {
          const y = 40 + i * 100
          return (
            <g key={i}>
              <M2MuxTrap x="140" y={y} w="80" h="80" label={`M${i}`} />
              <M x="98" y={y + 15}>I{i * 4}</M>
              <M x="98" y={y + 35}>I{i * 4 + 1}</M>
              <M x="98" y={y + 55}>I{i * 4 + 2}</M>
              <M x="98" y={y + 75}>I{i * 4 + 3}</M>

              <Wire d={`M 140 ${y + 10} L 120 ${y + 10}`} />
              <Wire d={`M 140 ${y + 30} L 120 ${y + 30}`} />
              <Wire d={`M 140 ${y + 50} L 120 ${y + 50}`} />
              <Wire d={`M 140 ${y + 70} L 120 ${y + 70}`} />
            </g>
          )
        })}
      </g>

      {/* S1 S0 bus — routed beside the mux bodies and into each mux's bottom
          slanted edge, instead of straight through the M0-M3 labels */}
      <g className="dsdm-pulse">
        <Wire d="M 235 470 L 235 120" stroke={BLUE} width="3" />
        <Wire d="M 235 120 L 220 120" stroke={BLUE} width="3" />
        <Wire d="M 235 220 L 220 220" stroke={BLUE} width="3" />
        <Wire d="M 235 320 L 220 320" stroke={BLUE} width="3" />
        <Wire d="M 235 420 L 220 420" stroke={BLUE} width="3" />
        <M x="235" y="486" fill={BLUE}>S1 S0</M>
      </g>

      {/* Level 2 */}
      <g className="dsdm-fade-in dsdm-delay-1">
        <M2MuxTrap x="380" y="140" w="80" h="200" label="" />
        <L x="420" y="430" size="14" fill={MUTED}>Level 2</L>

        {/* Wires from L1 to L2 */}
        <Wire d="M 220 80 L 320 80 L 320 180 L 380 180" />
        <Wire d="M 220 180 L 300 180 L 300 220 L 380 220" />
        <Wire d="M 220 280 L 300 280 L 300 260 L 380 260" />
        <Wire d="M 220 380 L 320 380 L 320 300 L 380 300" />
        
        {/* Output */}
        <Wire d="M 460 240 L 520 240" marker="url(#dsdArrB)" stroke={BLUE} width="3" />
        <M x="530" y="245" fill={BLUE} size="16">Y</M>
        
        {/* S3 S2 */}
        <Wire d="M 420 340 L 420 360" />
        <M x="420" y="375">S3 S2</M>
      </g>
      
      {/* Select 1110 path highlighting */}
      <g className="dsdm-pulse">
        <rect x="560" y="80" width="180" height="40" rx="8" fill={AMBER} opacity="0.1" />
        <M x="650" y="105" fill={AMBER}>Select = 1110</M>
        <M x="650" y="130" fill={AMBER} size="11">S3,S2=11 (M3) ; S1,S0=10 (I2)</M>
        
        {/* I2, I6, I10, I14 highlight — dots sit on the stub itself, clear of the I-labels */}
        <circle cx="130" cy="50" r="4" fill={AMBER} />
        <circle cx="130" cy="150" r="4" fill={AMBER} />
        <circle cx="130" cy="250" r="4" fill={AMBER} />
        <circle cx="130" cy="350" r="4" fill={AMBER} /> {/* This is I14 in M3 */}

        {/* Path runs straight from the input stub to M3's output edge, not through the M3 label at box centre */}
        <Wire d="M 120 350 L 140 350 L 220 380" stroke={AMBER} width="3" />
        <Wire d="M 220 380 L 320 380 L 320 300 L 380 300 L 420 240 L 460 240" stroke={AMBER} width="3" />
      </g>
    </Scene>
  )
}

export function M2PromFuseMap4x8Scene() {
  return (
    <Scene caption="PROM: fixed AND array (decoder) and programmable OR array">
      {/* Decoder */}
      <g className="dsdm-fade-in dsdm-delay-0">
        <M x="50" y="140" size="16">A1</M>
        <M x="50" y="180" size="16">A0</M>
        <Wire d="M 80 135 L 140 135" />
        <Wire d="M 80 175 L 140 175" />
        
        <Block x="140" y="100" w="100" h="120" label="2-to-4" sub="Decoder" />
        <L x="190" y="240" size="12" fill={BLUE} weight="700">Fixed AND array</L>
        
        {/* Solid dots to represent fixed array inside decoder */}
        <circle cx="160" cy="130" r="3" fill={BLUE} />
        <circle cx="160" cy="170" r="3" fill={BLUE} />
        
        {/* Word lines */}
        {[0, 1, 2, 3].map(i => (
          <g key={i}>
            <Wire d={`M 240 ${120 + i * 25} L 600 ${120 + i * 25}`} stroke={i === 2 ? AMBER : N} width={i === 2 ? "3" : "1"} />
            <M x="260" y={115 + i * 25} fill={i === 2 ? AMBER : MUTED}>m{i}</M>
          </g>
        ))}
      </g>
      
      {/* OR array */}
      <g className="dsdm-pulse">
        <L x="450" y="80" size="12" fill={ROSE} weight="700">Programmable OR array</L>
        {[7, 6, 5, 4, 3, 2, 1, 0].map(i => {
          const x = 330 + (7 - i) * 35
          return (
            <g key={i}>
              <Wire d={`M ${x} 100 L ${x} 260`} />
              <Block x={x - 10} y="260" w="20" h="30" label="OR" size="8" />
              <Wire d={`M ${x} 290 L ${x} 330`} stroke={i === 1 || i === 3 || i === 4 || i === 6 ? AMBER : N} width={i === 1 || i === 3 || i === 4 || i === 6 ? "3" : "1"} />
              <M x={x} y="345">D{i}</M>
            </g>
          )
        })}
        
        {/* Crossings for m2 (0101 1010) -> D6, D4, D3, D1 are 1s */}
        {[6, 4, 3, 1].map(d => {
          const x = 330 + (7 - d) * 35
          return (
            <g key={`x2-${d}`}>
              <M x={x} y="175" fill={ROSE} size="14">x</M>
              <circle cx={x} cy="170" r="4" fill={AMBER} opacity="0.6" />
            </g>
          )
        })}
        
        {/* Some dummy x for other m lines */}
        <M x="330" y="125" fill={ROSE} size="14">x</M>
        <M x="365" y="125" fill={ROSE} size="14">x</M>
        
        <M x="540" y="150" fill={ROSE} size="14">x</M>
        <M x="575" y="150" fill={ROSE} size="14">x</M>
        
        <M x="435" y="200" fill={ROSE} size="14">x</M>
        <M x="470" y="200" fill={ROSE} size="14">x</M>
      </g>
      
      {/* Table */}
      <g className="dsdm-fade-in dsdm-delay-1">
        <Panel
          x="650" y="100" w="200" rowH="24" title="ROM Truth Table"
          rows={[
            ['A1 A0', 'D7...D0', MUTED],
            ['0  0 ', '11000000', N],
            ['0  1 ', '00000011', N],
            ['1  0 ', '01011010', AMBER],
            ['1  1 ', '00001100', N]
          ]}
          mono={true}
        />
      </g>
    </Scene>
  )
}

export function M2PlaSharedProductsScene() {
  return (
    <Scene caption="PLA: both arrays programmable to share product terms">
      {/* Inputs */}
      <g className="dsdm-fade-in dsdm-delay-0">
        {['A', 'B', 'C'].map((label, i) => {
          const x = 120 + i * 80
          return (
            <g key={i}>
              <M x={x + 15} y="40">{label}</M>
              <Wire d={`M ${x} 60 L ${x} 300`} />
              <M x={x} y="315">{label}</M>
              <Block x={x + 15} y="60" w="30" h="20" label="NOT" size="7" />
              <Wire d={`M ${x + 30} 80 L ${x + 30} 300`} />
              <M x={x + 30} y="315">{label}'</M>
              <Wire d={`M ${x} 70 L ${x + 15} 70`} />
            </g>
          )
        })}
      </g>
      
      {/* Product Lines (AND array) */}
      <g className="dsdm-pulse">
        <L x="180" y="360" size="12" fill={BLUE} weight="700">Programmable AND array</L>
        
        {/* P1 = A B */}
        <Wire d="M 80 120 L 400 120" />
        <Block x="400" y="100" w="40" h="40" label="AND" size="10" />
        <M x="460" y="125">P1</M>
        <M x="120" y="125" fill={ROSE}>x</M>
        <M x="200" y="125" fill={ROSE}>x</M>
        
        {/* P2 = A C */}
        <Wire d="M 80 180 L 400 180" />
        <Block x="400" y="160" w="40" h="40" label="AND" size="10" />
        <M x="460" y="185">P2</M>
        <M x="120" y="185" fill={ROSE}>x</M>
        <M x="280" y="185" fill={ROSE}>x</M>
        
        {/* P3 = B C */}
        <Wire d="M 80 240 L 400 240" />
        <Block x="400" y="220" w="40" h="40" label="AND" size="10" />
        <M x="460" y="245">P3</M>
        <M x="200" y="245" fill={ROSE}>x</M>
        <M x="280" y="245" fill={ROSE}>x</M>
      </g>
      
      {/* Output Lines (OR array) */}
      <g className="dsdm-fade-in dsdm-delay-1">
        <L x="540" y="360" size="12" fill={ROSE} weight="700">Programmable OR array</L>
        
        <Wire d="M 520 80 L 520 280" />
        <Block x="500" y="280" w="40" h="40" label="OR" size="10" />
        <M x="520" y="340" fill={BLUE} size="16">F1</M>
        
        <Wire d="M 580 80 L 580 280" />
        <Block x="560" y="280" w="40" h="40" label="OR" size="10" />
        <M x="580" y="340" fill={BLUE} size="16">F2</M>
        
        {/* Connections */}
        <M x="520" y="125" fill={ROSE}>x</M>
        <M x="520" y="185" fill={ROSE}>x</M>
        <M x="520" y="245" fill={ROSE}>x</M>
        
        <M x="580" y="125" fill={ROSE}>x</M>
        <M x="580" y="185" fill={ROSE}>x</M>
        
        {/* Highlight shared products */}
        <circle cx="520" cy="120" r="14" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="580" cy="120" r="14" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="520" cy="180" r="14" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="4 2" />
        <circle cx="580" cy="180" r="14" fill="none" stroke={AMBER} strokeWidth="2" strokeDasharray="4 2" />
        <M x="720" y="150" fill={AMBER}>P1 and P2 shared</M>
      </g>
      
      {/* Ghosted PROM stack */}
      <g className="dsdm-fade-in dsdm-delay-2" opacity="0.15">
        <Block x="740" y="200" w="120" h="140" label="PROM" sub="8 word stack" />
        <M x="800" y="360">All 8 minterms</M>
      </g>
    </Scene>
  )
}

export function M2PldArrayComparisonScene() {
  return (
    <Scene caption="Comparing the three simple PLDs: which array is programmable?">
      {[
        { title: 'PROM', x: 80, and: 'fixed', or: 'prog', dots: true },
        { title: 'PLA', x: 340, and: 'prog', or: 'prog', dots: false },
        { title: 'PAL', x: 600, and: 'prog', or: 'fixed', dots: false }
      ].map((p, i) => (
        <g key={i} className={`dsdm-delay-${i}`}>
          <Block x={p.x} y="40" w="220" h="40" label={p.title} fill={BLUE} labelFill={WHITE} />
          
          {/* AND Array */}
          <rect x={p.x} y="90" width="220" height="120" fill="none" stroke={MUTED} rx="4" />
          <L x={p.x + 110} y="110" size="11" fill={MUTED}>AND Array</L>
          <Wire d={`M ${p.x + 60} 120 L ${p.x + 60} 200`} />
          <Wire d={`M ${p.x + 160} 120 L ${p.x + 160} 200`} />
          <Wire d={`M ${p.x + 20} 150 L ${p.x + 200} 150`} />
          <Wire d={`M ${p.x + 20} 180 L ${p.x + 200} 180`} />
          
          {p.and === 'fixed' ? (
            <>
              <circle cx={p.x + 60} cy="150" r="4" fill={N} />
              <circle cx={p.x + 160} cy="180" r="4" fill={N} />
            </>
          ) : (
            <>
              <M x={p.x + 60} y="155" fill={ROSE} size="14">x</M>
              <M x={p.x + 160} y="185" fill={ROSE} size="14">x</M>
            </>
          )}
          
          {/* OR Array */}
          <rect x={p.x} y="220" width="220" height="120" fill="none" stroke={MUTED} rx="4" />
          <L x={p.x + 110} y="240" size="11" fill={MUTED}>OR Array</L>
          <Wire d={`M ${p.x + 60} 250 L ${p.x + 60} 330`} />
          <Wire d={`M ${p.x + 160} 250 L ${p.x + 160} 330`} />
          <Wire d={`M ${p.x + 20} 280 L ${p.x + 200} 280`} />
          <Wire d={`M ${p.x + 20} 310 L ${p.x + 200} 310`} />
          
          {p.or === 'fixed' ? (
            <>
              <circle cx={p.x + 60} cy="280" r="4" fill={N} />
              <circle cx={p.x + 160} cy="310" r="4" fill={N} />
            </>
          ) : (
            <>
              <M x={p.x + 60} y="285" fill={ROSE} size="14">x</M>
              <M x={p.x + 160} y="315" fill={ROSE} size="14">x</M>
            </>
          )}
          
          {/* Properties Strip */}
          <Panel
            x={p.x} y="360" w="220" rowH="24" title=""
            rows={[
              ['AND array', p.and === 'fixed' ? 'Fixed' : 'Programmable', p.and === 'fixed' ? MUTED : ROSE],
              ['OR array', p.or === 'fixed' ? 'Fixed' : 'Programmable', p.or === 'fixed' ? MUTED : ROSE],
              ['Share products?', p.title === 'PLA' ? 'Yes' : 'No', p.title === 'PLA' ? AMBER : N]
            ]}
          />
        </g>
      ))}
    </Scene>
  )
}

/* ── Module 3 ────────────────────────────────────────────────────────── */

/* Module 3 reveal sequencing — inline delay, same reason as m1d. */
const m3d = (s) => ({ animationDelay: `${s}s` })

export function M3HdlFlowScene() {
  const boxes = [
    ['Design', 'Requirements'],
    ['Block', 'Diagram'],
    ['Verilog', 'Coding'],
    ['Simulation /', 'Verification'],
    ['Synthesis', ''],
    ['Place +', 'Route'],
    ['Timing', 'Verification'],
  ]
  const bx = (i) => 20 + i * 122
  const delay = (i) => (i < 4 ? 0.5 + i * 0.3 : 1.9 + (i - 4) * 0.3)
  return (
    <Scene caption="HDL design flow: fix it in the front-end, where a change is only a text edit">
      <g className="dsdm-emerge" style={m3d(0)}>
        <path d="M497 120 L497 330" stroke={MUTED} strokeWidth="2.2" strokeDasharray="8 7" fill="none" />
      </g>
      <g className="dsdm-fade-in" style={m3d(0.2)}>
        <path d="M24 172 L24 164 L482 164 L482 172" fill="none" stroke={BLUE} strokeWidth="2" />
        <L x="253" y="150" size={18} fill={BLUE}>Front-end</L>
        <path d="M512 172 L512 164 L848 164 L848 172" fill="none" stroke={TEAL} strokeWidth="2" />
        <L x="680" y="150" size={18} fill={TEAL}>Back-end</L>
      </g>
      {boxes.map(([a, b], i) => {
        const x = bx(i)
        const tone = i < 4 ? BLUE : TEAL
        return (
          <g key={a} className="dsdm-slide-in" style={m3d(delay(i))}>
            {i > 0 && i !== 4 ? <Wire d={`M${x - 20} 230 L${x - 3} 230`} stroke={tone} width={2.2} marker={`url(#${i < 4 ? 'dsdArrB' : 'dsdArrT'})`} /> : null}
            {i === 4 ? <Wire d={`M${x - 20} 230 L${x - 3} 230`} stroke={MUTED} width={2.2} marker="url(#dsdArrM)" /> : null}
            <rect x={x} y="190" width="100" height="80" rx="12" fill={i === 2 ? SKY : WHITE} stroke={tone} strokeWidth="2.5" />
            <M x={x + 12} y="207" size={11} fill={MUTED} anchor="start">{i + 1}</M>
            <L x={x + 50} y={b ? 229 : 237} size={13} fill={N}>{a}</L>
            {b ? <L x={x + 50} y="247" size={13} fill={N}>{b}</L> : null}
          </g>
        )
      })}
      <g className="dsdm-fade-in" style={m3d(3.1)}>
        <Wire d="M802 272 C802 400 314 400 314 280" stroke={RED} width={3} marker="url(#dsdArrR)" className="dsdm-feedback" />
        <L x="558" y="400" size={15} fill={RED}>Cost of late fixes increases exponentially</L>
        <L x="558" y="424" size={12.5} fill={MUTED} weight={700}>a timing failure forces re-coding, re-simulation and re-synthesis</L>
      </g>
    </Scene>
  )
}

export function M3ModuleSkeletonScene() {
  const regions = [
    { y: 40, h: 50, tone: MUTED, fill: WHITE, lines: ['`timescale 1ns/100ps'], label: 'Compiler directive' },
    { y: 100, h: 44, tone: BLUE, fill: SKY, lines: ['module D_ff('], label: 'Module name' },
    { y: 150, h: 96, tone: GREEN, fill: GREEN, op: 0.1, lines: ['  input  wire clk,', '  input  wire d,', '  output reg  q);'], label: 'Port list' },
    { y: 252, h: 120, tone: AMBER, fill: AMBER, op: 0.1, lines: ['  always @(posedge clk)', '  begin', '    q = d;', '  end'], label: 'Module body' },
    { y: 378, h: 44, tone: BLUE, fill: SKY, lines: ['endmodule'], label: 'Module end' },
  ]
  return (
    <Scene caption="Every Verilog module has the same five-part skeleton">
      {regions.map((r, i) => {
        const top = r.y + r.h / 2 - ((r.lines.length - 1) * 22) / 2 + 5
        return (
          <g key={r.label} className="dsdm-cell-in" style={m3d(0.2 + i * 0.4)}>
            <rect x="80" y={r.y} width="460" height={r.h} rx="8" fill={r.fill} fillOpacity={r.op} stroke={r.tone} strokeWidth="2.3" />
            {r.lines.map((ln, j) => (
              <M key={ln} x="100" y={top + j * 22} size={16} anchor="start" fill={N}>{ln}</M>
            ))}
          </g>
        )
      })}
      {regions.map((r, i) => (
        <g key={`b-${r.label}`} className="dsdm-slide-in" style={m3d(2.4 + i * 0.25)}>
          <path d={`M552 ${r.y + 4} L562 ${r.y + 4} L562 ${r.y + r.h - 4} L552 ${r.y + r.h - 4}`} fill="none" stroke={r.tone} strokeWidth="2.2" />
          <path d={`M562 ${r.y + r.h / 2} L580 ${r.y + r.h / 2}`} stroke={r.tone} strokeWidth="2.2" />
          <L x="588" y={r.y + r.h / 2 + 6} size={16} anchor="start" fill={r.tone}>{r.label}</L>
        </g>
      ))}
      <L x="310" y="456" size={13} fill={MUTED} weight={700}>The name and port list are all the outside world sees; the body stays hidden</L>
    </Scene>
  )
}

export function M3AbstractionPyramidScene() {
  // Apex (360,40), base y=440 from x=130 to 590; bands split at y=173 and y=306.
  return (
    <Scene caption="Three abstraction levels: higher up means less detail and more portability">
      <g className="dsdm-emerge" style={m3d(0.2)}>
        <path d="M207 306 L513 306 L590 440 L130 440 Z" fill={GREEN} fillOpacity="0.14" stroke={GREEN} strokeWidth="2.4" />
        <L x="360" y="382" size={17} fill={N}>Gate / Switch Level</L>
      </g>
      <g className="dsdm-slide-in" style={m3d(0.5)}>
        <path d="M562 375 L604 375" stroke={MUTED} strokeWidth="1.8" strokeDasharray="4 4" />
        <path d="M612 365 L622 365 M612 385 L622 385" stroke={N} strokeWidth="2" />
        <M1Gate x="622" y="375" w="36" h="30" />
        <path d="M658 375 L668 375" stroke={N} strokeWidth="2" />
        <L x="680" y="380" size={13} anchor="start" fill={GREEN}>Describes specific gates</L>
      </g>

      <g className="dsdm-emerge" style={m3d(0.9)}>
        <path d="M284 173 L436 173 L513 306 L207 306 Z" fill={BLUE} fillOpacity="0.12" stroke={BLUE} strokeWidth="2.4" />
        <L x="360" y="236" size={18} fill={N}>RTL</L>
        <L x="360" y="260" size={13} fill={N} weight={700}>Register-Transfer Level</L>
      </g>
      <g className="dsdm-slide-in" style={m3d(1.2)}>
        <path d="M482 245 L604 245" stroke={MUTED} strokeWidth="1.8" strokeDasharray="4 4" />
        <rect x="610" y="233" width="20" height="24" rx="3" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <Wire d="M630 245 L644 245" stroke={BLUE} width={2} marker="url(#dsdArrB)" />
        <rect x="648" y="233" width="20" height="24" rx="3" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <L x="680" y="241" size={13} anchor="start" fill={BLUE}>Describes data operations</L>
        <L x="680" y="259" size={13} anchor="start" fill={BLUE}>between registers</L>
      </g>

      <g className="dsdm-emerge" style={m3d(1.6)}>
        <path d="M360 40 L436 173 L284 173 Z" fill={PURP} fillOpacity="0.12" stroke={PURP} strokeWidth="2.4" />
        <L x="360" y="138" size={15} fill={N}>Behavioral</L>
        <L x="360" y="158" size={15} fill={N}>Level</L>
      </g>
      <g className="dsdm-slide-in" style={m3d(1.9)}>
        <path d="M418 125 L604 125" stroke={MUTED} strokeWidth="1.8" strokeDasharray="4 4" />
        <rect x="624" y="88" width="30" height="14" rx="7" fill={WHITE} stroke={PURP} strokeWidth="1.8" />
        <path d="M639 102 L639 110" stroke={PURP} strokeWidth="1.8" />
        <path d="M639 110 L654 125 L639 140 L624 125 Z" fill={WHITE} stroke={PURP} strokeWidth="1.8" />
        <path d="M639 140 L639 148" stroke={PURP} strokeWidth="1.8" />
        <rect x="626" y="148" width="26" height="12" rx="2" fill={WHITE} stroke={PURP} strokeWidth="1.8" />
        <L x="680" y="121" size={13} anchor="start" fill={PURP}>Describes circuit</L>
        <L x="680" y="139" size={13} anchor="start" fill={PURP}>behavior algorithmically</L>
      </g>

      <g className="dsdm-fade-in" style={m3d(2.5)}>
        <Wire d="M62 420 L62 90" stroke={MUTED} width={2.4} marker="url(#dsdArrM)" />
        <L x="62" y="440" size={13} fill={AMBER}>More detail,</L>
        <L x="62" y="458" size={13} fill={AMBER}>less portable</L>
        <L x="62" y="54" size={13} fill={TEAL}>Less detail,</L>
        <L x="62" y="72" size={13} fill={TEAL}>more portable</L>
      </g>
    </Scene>
  )
}

export function M3PortDirectionScene() {
  const ins = [['input wire a', 130], ['input wire b', 190], ['input wire sel', 250]]
  return (
    <Scene caption="Port directions: inputs flow in, outputs flow out, inout goes both ways">
      <g className="dsdm-fade-in" style={m3d(0)}>
        <rect x="300" y="36" width="14" height="14" rx="3" fill={GREEN} />
        <L x="320" y="48" size={13} anchor="start" fill={GREEN}>input</L>
        <rect x="400" y="36" width="14" height="14" rx="3" fill={RED} />
        <L x="420" y="48" size={13} anchor="start" fill={RED}>output</L>
        <rect x="510" y="36" width="14" height="14" rx="3" fill={PURP} />
        <L x="530" y="48" size={13} anchor="start" fill={PURP}>inout</L>
      </g>
      <g className="dsdm-emerge" style={m3d(0.2)}>
        <rect x="330" y="90" width="240" height="200" rx="12" fill={WHITE} stroke={N} strokeWidth="2.6" />
        <M x="450" y="184" size={18} fill={N} weight={800}>module mux2to1</M>
        <M x="450" y="212" size={13} fill={MUTED}>y = sel ? b : a</M>
      </g>
      {ins.map(([label, y], i) => (
        <g key={label} className="dsdm-slide-in" style={m3d(0.9 + i * 0.3)}>
          <Wire d={`M150 ${y} L326 ${y}`} stroke={GREEN} width={2.8} marker="url(#dsdArrG)" />
          <M x="140" y={y + 5} size={14} anchor="end" fill={GREEN} weight={800}>{label}</M>
        </g>
      ))}
      <g className="dsdm-slide-in" style={m3d(2.0)}>
        <Wire d="M570 190 L736 190" stroke={RED} width={2.8} marker="url(#dsdArrR)" />
        <M x="748" y="195" size={14} anchor="start" fill={RED} weight={800}>output wire y</M>
      </g>
      <g className="dsdm-emerge" style={m3d(2.7)}>
        <rect x="380" y="355" width="140" height="70" rx="10" fill={WHITE} stroke={PURP} strokeWidth="2.4" />
        <M x="450" y="395" size={14} fill={N} weight={800}>module bus_io</M>
        <Wire d="M610 390 L700 390" stroke={PURP} width={2.8} marker="url(#dsdArrP)" />
        <Wire d="M610 390 L526 390" stroke={PURP} width={2.8} marker="url(#dsdArrP)" />
        <M x="712" y="395" size={14} anchor="start" fill={PURP} weight={800}>inout wire data</M>
        <L x="450" y="452" size={12.5} fill={MUTED} weight={700}>inout: the same pin drives the bus or reads it (tri-state data line)</L>
      </g>
    </Scene>
  )
}

export function M3VectorBitsScene() {
  const bx = (i) => 194 + i * 64
  return (
    <Scene caption="Vectors are numbered MSB to LSB; select bits by index, and mind the widths">
      <g className="dsdm-cell-in" style={m3d(0.2)}>
        <M x="180" y="126" size={15} anchor="end" fill={N} weight={800}>wire [7:0] data</M>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <g key={i}>
            <rect x={bx(i)} y="90" width="64" height="60" fill={WHITE} stroke={N} strokeWidth="2.2" />
            <M x={bx(i) + 32} y="128" size={22} fill={N} weight={800}>{7 - i}</M>
          </g>
        ))}
      </g>
      <g className="dsdm-fade-in" style={m3d(0.9)}>
        <L x="226" y="78" size={14} fill={AMBER}>MSB</L>
        <L x="674" y="78" size={14} fill={AMBER}>LSB</L>
      </g>
      <g className="dsdm-cell-in" style={m3d(1.5)}>
        <rect x="322" y="90" width="256" height="60" fill={BLUE} fillOpacity="0.16" stroke={BLUE} strokeWidth="3" />
        <path d="M326 160 L326 170 L574 170 L574 160 M450 170 L450 178" fill="none" stroke={BLUE} strokeWidth="2.4" />
        <L x="450" y="198" size={14} fill={BLUE}>data[5:2] — part-select</L>
      </g>
      <g className="dsdm-slide-in" style={m3d(2.1)}>
        <rect x="453" y="93" width="58" height="54" fill="none" stroke={ROSE} strokeWidth="3" />
        <Wire d="M482 40 L482 86" stroke={ROSE} width={2.6} marker="url(#dsdArrRo)" />
        <L x="482" y="30" size={14} fill={ROSE}>data[3] — bit-select</L>
      </g>
      <g className="dsdm-cell-in" style={m3d(2.7)}>
        <M x="436" y="356" size={15} anchor="end" fill={N} weight={800}>wire [3:0] nibble</M>
        {[0, 1, 2, 3].map((j) => (
          <g key={j}>
            <rect x={450 + j * 64} y="320" width="64" height="60" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
            <M x={482 + j * 64} y="358" size={22} fill={GREEN} weight={800}>{3 - j}</M>
          </g>
        ))}
        {[0, 1, 2, 3].map((j) => (
          <Wire key={`a${j}`} d={`M${482 + j * 64} 214 L${482 + j * 64} 314`} stroke={GREEN} width={2} dash="5 5" marker="url(#dsdArrG)" />
        ))}
        <M x="578" y="420" size={14} fill={N}>assign nibble = data;  // keeps data[3:0]</M>
      </g>
      <g className="dsdm-emerge" style={m3d(3.3)}>
        <path d="M246 226 L274 254 M274 226 L246 254" stroke={RED} strokeWidth="5" strokeLinecap="round" />
        <L x="260" y="282" size={14} fill={RED}>Width mismatch:</L>
        <L x="260" y="302" size={13} fill={RED} weight={700}>8 bits → 4 bits truncates upper 4</L>
      </g>
    </Scene>
  )
}

export function M3LogicRelTableScene() {
  const logical = [
    ['!', '(NOT) Returns 1 if operand is 0', "!4'b0101 = 0"],
    ['&&', '(AND) Returns 1 if both non-zero', "4'b0001 && 4'b1001 = 1"],
    ['||', '(OR) Returns 1 if either non-zero', "4'b0000 || 4'b1001 = 1"],
  ]
  const rel = [
    ['==', 'Equal', "3'b101 == 3'b110 -> 0"],
    ['!=', 'Not equal', "3'b101 != 3'b110 -> 1"],
    ['>', 'Greater', "4'b1010 > 4'b1001 -> 1"],
    ['<', 'Less', "4'b1001 < 4'b1010 -> 1"],
    ['>=', 'Greater/equal', "4'b1010 >= 4'b1010 -> 1"],
    ['<=', 'Less/equal', "4'b1010 <= 4'b1001 -> 0"],
  ]
  return (
    <Scene caption="Logical and relational operators both collapse to a single bit: 1 (true) or 0 (false)">
      <g className="dsdm-cell-in" style={m3d(0.1)}>
        <rect x="20" y="50" width="370" height="232" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.3" />
        <rect x="20" y="50" width="370" height="34" rx="11" fill={BLUE} />
        <L x="205" y="73" size={15} fill={WHITE}>Logical Operators</L>
      </g>
      {logical.map(([op, desc, ex], i) => {
        const y0 = 90 + i * 64
        return (
          <g key={op} className="dsdm-cell-in" style={m3d(0.6 + i * 0.45)}>
            <rect x="28" y={y0} width="354" height="56" rx="7" fill={i % 2 ? WHITE : SKY} />
            <M x="56" y={y0 + 36} size={20} fill={BLUE} weight={800}>{op}</M>
            <L x="96" y={y0 + 23} size={13} anchor="start" fill={N} weight={700}>{desc}</L>
            <M x="96" y={y0 + 44} size={13} anchor="start" fill={TEAL}>{ex}</M>
          </g>
        )
      })}
      <g className="dsdm-fade-in" style={m3d(2.0)}>
        <L x="205" y="316" size={13} fill={MUTED} weight={700}>Any non-zero vector counts as TRUE,</L>
        <L x="205" y="336" size={13} fill={MUTED} weight={700}>so the answer is always one bit</L>
      </g>

      <g className="dsdm-cell-in" style={m3d(2.4)}>
        <rect x="410" y="50" width="470" height="330" rx="11" fill={WHITE} stroke={PURP} strokeWidth="2.3" />
        <rect x="410" y="50" width="470" height="34" rx="11" fill={PURP} />
        <L x="645" y="73" size={15} fill={WHITE}>Relational Operators</L>
      </g>
      {rel.map(([op, name, ex], i) => {
        const y0 = 90 + i * 47
        return (
          <g key={op} className="dsdm-cell-in" style={m3d(2.9 + i * 0.35)}>
            <rect x="418" y={y0} width="454" height="41" rx="7" fill={i % 2 ? WHITE : SKY} />
            <M x="450" y={y0 + 27} size={18} fill={PURP} weight={800}>{op}</M>
            <L x="490" y={y0 + 26} size={13} anchor="start" fill={N} weight={700}>{name}</L>
            <M x="614" y={y0 + 26} size={13} anchor="start" fill={TEAL}>{ex}</M>
          </g>
        )
      })}
      <g className="dsdm-fade-in" style={m3d(5.2)}>
        <L x="450" y="428" size={13} fill={MUTED} weight={700}>Operands of unequal width are zero-extended before comparing</L>
        <L x="450" y="452" size={13} fill={AMBER} weight={700}>In an expression, &lt;= means "less or equal"; as a statement it is a non-blocking assignment</L>
      </g>
    </Scene>
  )
}

export function M3BitwiseTraceScene() {
  const col = (c) => 360 + c * 44
  const box = (x, y, v, tone = N, fill = WHITE) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="40" height="28" rx="5" fill={fill} stroke={tone} strokeWidth="2" />
      <M x={x + 20} y={y + 20} size={16} fill={tone} weight={800}>{v}</M>
    </g>
  )
  const ops = [
    { y: 26, expr: "4'b0101 & 4'b1001", op: '&', a: [0, 1, 0, 1], b: [1, 0, 0, 1], r: [0, 0, 0, 1], note: 'AND: both bits must be 1', tone: BLUE, t0: 0.2 },
    { y: 176, expr: "4'b0101 | 4'b1001", op: '|', a: [0, 1, 0, 1], b: [1, 0, 0, 1], r: [1, 1, 0, 1], note: 'OR: either bit must be 1', tone: PURP, t0: 2.2 },
  ]
  return (
    <Scene caption="Bitwise operators work column by column; shifts move every bit together">
      {ops.map((o) => (
        <g key={o.op}>
          <g className="dsdm-fade-in" style={m3d(o.t0)}>
            <M x="40" y={o.y + 62} size={16} anchor="start" fill={o.tone} weight={800}>{o.expr}</M>
            {o.a.map((v, c) => box(col(c), o.y, v))}
            <M x="342" y={o.y + 55} size={16} fill={o.tone} weight={800}>{o.op}</M>
            {o.b.map((v, c) => box(col(c), o.y + 34, v))}
            <M x="342" y={o.y + 125} size={16} fill={o.tone} weight={800}>=</M>
          </g>
          {o.r.map((v, c) => (
            <g key={c} className="dsdm-cell-in" style={m3d(o.t0 + 0.5 + c * 0.35)}>
              <Wire d={`M${col(c) + 20} ${o.y + 66} L${col(c) + 20} ${o.y + 100}`} stroke={v ? GREEN : MUTED} width={2.2} marker={v ? 'url(#dsdArrG)' : 'url(#dsdArrM)'} />
              {box(col(c), o.y + 104, v, v ? GREEN : MUTED, v ? SKY : WHITE)}
            </g>
          ))}
          <g className="dsdm-fade-in" style={m3d(o.t0 + 1.9)}>
            <L x="580" y={o.y + 72} size={14} anchor="start" fill={o.tone}>{o.note}</L>
          </g>
        </g>
      ))}
      <path d="M30 166 L870 166 M30 316 L870 316" stroke={MUTED} strokeWidth="1.2" strokeDasharray="4 6" />
      <g className="dsdm-fade-in" style={m3d(4.2)}>
        <M x="40" y="390" size={16} anchor="start" fill={AMBER} weight={800}>{"4'b0001 << 3"}</M>
        {[0, 0, 0, 1].map((v, c) => box(col(c), 330, v, v ? AMBER : N))}
        <M x="342" y="350" size={13} fill={MUTED} anchor="end">in</M>
        {[null, 0, 0, 0].map((v, c) => (v === null ? (
          <rect key={c} x={col(c)} y="424" width="40" height="28" rx="5" fill={WHITE} stroke={N} strokeWidth="2" />
        ) : box(col(c), 424, v, GREEN)))}
        <M x="342" y="444" size={13} fill={MUTED} anchor="end">out</M>
        <Wire d="M512 362 C512 398 380 390 380 420" stroke={AMBER} width={2.2} dash="6 5" marker="url(#dsdArrA)" />
        <L x="580" y="402" size={14} anchor="start" fill={AMBER}>Left shift by 3: multiply by 8</L>
        <L x="580" y="424" size={12.5} anchor="start" fill={MUTED} weight={700}>1 becomes 8; zeros fill from the right</L>
      </g>
      <g className="dsdm-fade-in" style={m3d(4.2)}>
        <g className="dsdm-sweep-x" style={{ '--dsdm-sweep': '-132px', animationDelay: '4.6s' }}>
          <rect x={col(3)} y="424" width="40" height="28" rx="5" fill={WHITE} />
          <rect x={col(3)} y="424" width="40" height="28" rx="5" fill={AMBER} fillOpacity="0.18" stroke={AMBER} strokeWidth="2.4" />
          <M x={col(3) + 20} y="444" size={16} fill={AMBER} weight={800}>1</M>
        </g>
      </g>
    </Scene>
  )
}

export function M3SpecialOpsScene() {
  return (
    <Scene caption="Arithmetic adds, concatenation joins, the conditional operator selects — each maps to hardware">
      <g className="dsdm-cell-in" style={m3d(0.2)}>
        <Card x="20" y="40" w="270" h="400" title="Arithmetic" accent={BLUE}>
          <M x="135" y="62" size={18} fill={BLUE} weight={800}>a + b</M>
          <M x="76" y="100" size={13} anchor="start" fill={MUTED}>a =</M>
          <M x="184" y="100" size={16} anchor="end" fill={N}>0011</M>
          <M x="76" y="126" size={13} anchor="start" fill={MUTED}>b = +</M>
          <M x="184" y="126" size={16} anchor="end" fill={N}>0101</M>
          <path d="M96 136 L188 136" stroke={N} strokeWidth="2" />
          <M x="76" y="160" size={13} anchor="start" fill={MUTED}>y =</M>
          <M x="184" y="160" size={16} anchor="end" fill={GREEN} weight={800}>1000</M>
          <M x="135" y="188" size={12} fill={MUTED}>3 + 5 = 8</M>
          <Wire d="M115 210 L115 236" stroke={N} width={2} marker="url(#dsdArr)" />
          <Wire d="M155 210 L155 236" stroke={N} width={2} marker="url(#dsdArr)" />
          <M x="104" y="224" size={12} anchor="end" fill={N}>a</M>
          <M x="166" y="224" size={12} anchor="start" fill={N}>b</M>
          <path d="M85 240 L185 240 L165 300 L105 300 Z" fill={SKY} stroke={BLUE} strokeWidth="2.4" strokeLinejoin="round" />
          <M x="135" y="278" size={22} fill={BLUE} weight={800}>+</M>
          <Wire d="M135 300 L135 330" stroke={GREEN} width={2.2} marker="url(#dsdArrG)" />
          <M x="146" y="324" size={12} anchor="start" fill={GREEN}>y[3:0]</M>
          <L x="135" y="366" size={12.5} fill={MUTED} weight={700}>4-bit adder inferred</L>
          <L x="135" y="386" size={12.5} fill={MUTED} weight={700}>by the + operator</L>
        </Card>
      </g>

      <g className="dsdm-cell-in" style={m3d(1.4)}>
        <Card x="315" y="40" w="270" h="400" title="Concatenation" accent={AMBER}>
          <M x="135" y="62" size={16} fill={AMBER} weight={800}>{"{4'b0101, 3'b110}"}</M>
          <rect x="18" y="80" width="104" height="36" rx="7" fill={WHITE} stroke={BLUE} strokeWidth="2.3" />
          <M x="70" y="104" size={15} fill={BLUE} weight={800}>{"4'b0101"}</M>
          <rect x="152" y="80" width="100" height="36" rx="7" fill={WHITE} stroke={AMBER} strokeWidth="2.3" />
          <M x="202" y="104" size={15} fill={AMBER} weight={800}>{"3'b110"}</M>
          <rect x="30" y="196" width="210" height="44" rx="8" fill={SKY} stroke={N} strokeWidth="2.5" />
          <M x="135" y="224" size={17} fill={N} weight={800}>
            {"7'b"}
            <tspan fill={BLUE}>0101</tspan>
            <tspan fill={AMBER}>110</tspan>
          </M>
          <L x="135" y="272" size={13} fill={N} weight={700}>4 bits + 3 bits = 7 bits</L>
          <L x="135" y="304" size={12.5} fill={MUTED} weight={700}>The left operand becomes</L>
          <L x="135" y="322" size={12.5} fill={MUTED} weight={700}>the most significant bits</L>
          <L x="135" y="358" size={12.5} fill={MUTED} weight={700}>No gates: just wires</L>
          <L x="135" y="376" size={12.5} fill={MUTED} weight={700}>laid side by side</L>
        </Card>
      </g>
      <g className="dsdm-fade-in" style={m3d(1.9)}>
        <Wire d="M385 157 L420 232" stroke={BLUE} width={2.4} marker="url(#dsdArrB)" className="dsdm-current-slow" />
        <Wire d="M517 157 L480 232" stroke={AMBER} width={2.4} marker="url(#dsdArrA)" className="dsdm-current-slow" />
      </g>

      <g className="dsdm-cell-in" style={m3d(2.6)}>
        <Card x="610" y="40" w="270" h="400" title="Conditional" accent={PURP}>
          <M x="135" y="62" size={15} fill={PURP} weight={800}>y = sel ? b : a;</M>
          <path d="M135 76 L180 104 L135 132 L90 104 Z" fill={WHITE} stroke={PURP} strokeWidth="2.4" />
          <M x="135" y="109" size={14} fill={N} weight={800}>sel?</M>
          <Wire d="M90 104 L50 104 L50 150" stroke={N} width={2.2} marker="url(#dsdArr)" />
          <Wire d="M180 104 L220 104 L220 150" stroke={N} width={2.2} marker="url(#dsdArr)" />
          <M x="50" y="170" size={14} fill={N} weight={800}>0: a</M>
          <M x="220" y="170" size={14} fill={N} weight={800}>1: b</M>
          <Wire d="M50 180 L50 196 L220 196 M220 180 L220 196" stroke={N} width={2.2} />
          <Wire d="M135 196 L135 214" stroke={N} width={2.2} marker="url(#dsdArr)" />
          <M x="135" y="236" size={15} fill={GREEN} weight={800}>y</M>
          <path d="M100 262 L150 280 L150 350 L100 368 Z" fill={SKY} stroke={PURP} strokeWidth="2.4" strokeLinejoin="round" />
          <M x="112" y="298" size={12} anchor="start" fill={N}>0</M>
          <M x="112" y="342" size={12} anchor="start" fill={N}>1</M>
          <path d="M60 294 L100 294 M60 338 L100 338 M150 315 L186 315 M125 360 L125 384" stroke={N} strokeWidth="2.2" />
          <M x="54" y="298" size={13} anchor="end" fill={N}>a</M>
          <M x="54" y="342" size={13} anchor="end" fill={N}>b</M>
          <M x="194" y="320" size={13} anchor="start" fill={GREEN} weight={800}>y</M>
          <M x="134" y="386" size={12} anchor="start" fill={PURP}>sel</M>
          <L x="222" y="276" size={12} fill={MUTED} weight={700}>2:1 MUX</L>
        </Card>
      </g>
    </Scene>
  )
}

export function M3FourValueScene() {
  const tone = { 0: BLUE, 1: RED, x: AMBER, z: MUTED }
  const cards = [
    ['0', 'Logic Low', 240, 18],
    ['1', 'Logic High', 460, 18],
    ['x', 'Unknown', 240, 84],
    ['z', 'High-Z / Floating', 460, 84],
  ]
  const vals = ['0', '1', 'x', 'z']
  const and = (a, b) => (a === '0' || b === '0' ? '0' : a === '1' && b === '1' ? '1' : 'x')
  return (
    <Scene caption="Verilog nets carry four values; an AND gate resolves them as shown">
      {cards.map(([v, label, x, y], i) => (
        <g key={v} className="dsdm-emerge" style={m3d(0.2 + i * 0.35)}>
          <rect x={x} y={y} width="200" height="58" rx="10" fill={WHITE} stroke={tone[v]} strokeWidth="2.6" />
          <M x={x + 36} y={y + 42} size={34} fill={tone[v]} weight={800}>{v}</M>
          <L x={x + 70} y={y + 35} size={15} anchor="start" fill={N}>{label}</L>
        </g>
      ))}
      <g className="dsdm-cell-in" style={m3d(1.8)}>
        <rect x="225" y="165" width="90" height="50" fill={N} />
        <M x="270" y="197" size={18} fill={WHITE} weight={800}>&amp;</M>
        {vals.map((v, c) => (
          <g key={v}>
            <rect x={315 + c * 90} y="165" width="90" height="50" fill={SKY} stroke={N} strokeWidth="1.5" />
            <M x={360 + c * 90} y="198" size={20} fill={tone[v]} weight={800}>{v}</M>
          </g>
        ))}
      </g>
      {vals.map((a, r) => (
        <g key={a} className="dsdm-cell-in" style={m3d(2.2 + r * 0.4)}>
          <rect x="225" y={215 + r * 50} width="90" height="50" fill={SKY} stroke={N} strokeWidth="1.5" />
          <M x="270" y={248 + r * 50} size={20} fill={tone[a]} weight={800}>{a}</M>
          {vals.map((b, c) => {
            const v = and(a, b)
            return (
              <g key={b}>
                <rect x={315 + c * 90} y={215 + r * 50} width="90" height="50" fill={WHITE} stroke={N} strokeWidth="1.5" />
                <rect x={318 + c * 90} y={218 + r * 50} width="84" height="44" fill={tone[v]} fillOpacity="0.1" />
                <M x={360 + c * 90} y={248 + r * 50} size={20} fill={tone[v]} weight={800}>{v}</M>
              </g>
            )
          })}
        </g>
      ))}
      <g className="dsdm-fade-in" style={m3d(4.0)}>
        <L x="700" y="244" size={13} anchor="start" fill={BLUE}>0 &amp; anything = 0</L>
        <L x="700" y="294" size={13} anchor="start" fill={AMBER}>1 &amp; x = x: result</L>
        <L x="700" y="312" size={13} anchor="start" fill={AMBER}>cannot be known</L>
        <L x="700" y="362" size={13} anchor="start" fill={MUTED}>z at a gate input</L>
        <L x="700" y="380" size={13} anchor="start" fill={MUTED}>behaves like x</L>
      </g>
    </Scene>
  )
}

export function M3NumberFormatScene() {
  // Each segment is its own text at a computed x, so the arrows land on the
  // right characters whatever the monospace font's advance width turns out to be.
  const cw = 31
  const x0 = 264
  const seg = [
    ['8', 0, BLUE],
    ["'b", 1, GREEN],
    ['0110', 3, RED],
    ['_', 7, MUTED],
    ['1100', 8, RED],
  ]
  const rows = [
    ["4'hF", '4 bits, hex F = 1111'],
    ["16'hFF", '16 bits, hex 00FF'],
    ["5'b11", '5 bits, binary 00011'],
    ["-3'b101", "3 bits, negative (stored as 2's complement)"],
    ["4'b1x0z", '4 bits with x and z'],
  ]
  return (
    <Scene caption="A sized literal reads as size, base, then value">
      <g className="dsdm-emerge" style={m3d(0.2)}>
        {seg.map(([t, at, c]) => (
          <rect key={`r${at}`} x={x0 + at * cw - 2} y="88" width={t.length * cw + 4} height="56" rx="6" fill={c} fillOpacity="0.12" />
        ))}
        {seg.map(([t, at, c]) => (
          <M key={at} x={x0 + at * cw} y="132" size={52} anchor="start" fill={c} weight={800}>{t}</M>
        ))}
      </g>
      <g className="dsdm-fade-in" style={m3d(0.9)}>
        <Wire d="M170 64 L272 90" stroke={BLUE} width={2.2} marker="url(#dsdArrB)" />
        <L x="150" y="58" size={15} fill={BLUE}>Size: 8 bits</L>
      </g>
      <g className="dsdm-fade-in" style={m3d(1.3)}>
        <Wire d="M345 46 L326 84" stroke={GREEN} width={2.2} marker="url(#dsdArrG)" />
        <L x="375" y="40" size={15} fill={GREEN}>Base: binary</L>
      </g>
      <g className="dsdm-fade-in" style={m3d(1.7)}>
        <Wire d="M560 64 L505 88" stroke={MUTED} width={2.2} marker="url(#dsdArrM)" />
        <L x="650" y="58" size={14} fill={MUTED}>Readability separator (ignored)</L>
      </g>
      <g className="dsdm-fade-in" style={m3d(2.1)}>
        <path d={`M${x0 + 3 * cw} 150 L${x0 + 3 * cw} 158 L${x0 + 12 * cw} 158 L${x0 + 12 * cw} 150`} fill="none" stroke={RED} strokeWidth="2.4" />
        <L x={x0 + 7.5 * cw} y="182" size={15} fill={RED}>Value: 108 decimal</L>
      </g>
      {rows.map(([lit, meaning], i) => (
        <g key={lit} className="dsdm-cell-in" style={m3d(2.8 + i * 0.4)}>
          <rect x="150" y={206 + i * 46} width="600" height="40" rx="8" fill={i % 2 ? WHITE : SKY} stroke={MUTED} strokeWidth="1" />
          <M x="176" y={232 + i * 46} size={18} anchor="start" fill={N} weight={800}>{lit}</M>
          <L x="340" y={231 + i * 46} size={14} anchor="start" fill={N} weight={700}>{meaning}</L>
        </g>
      ))}
    </Scene>
  )
}

export function M3WireAnalogyScene() {
  const nets = [
    ['wire', 'plain net'],
    ['wand', 'wired-AND'],
    ['wor', 'wired-OR'],
    ['tri', 'tri-state bus'],
    ['supply0', 'constant 0 (GND)'],
    ['supply1', 'constant 1 (VDD)'],
  ]
  return (
    <Scene caption="A wire is a connection that something must continuously drive">
      <g className="dsdm-cell-in" style={m3d(0.2)}>
        <rect x="20" y="36" width="410" height="170" rx="12" fill={GREEN} fillOpacity="0.08" stroke={GREEN} strokeWidth="2" />
        <L x="225" y="62" size={15} fill={GREEN}>Physical wire on PCB</L>
        <path d="M34 113 L60 113 M34 127 L60 127 M280 127 L300 127 M344 120 L376 120" stroke={N} strokeWidth="2.2" />
        <M1Gate x="60" y="120" w="44" h="40" />
        <M1Gate x="300" y="120" w="44" h="40" kind="or" />
        <path d="M104 120 L180 120 L200 113 L302 113" fill="none" stroke={AMBER} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
        <Wire d="M110 120 L180 120 L200 113 L290 113" stroke={AMBER} width={2.4} marker="url(#dsdArrA)" className="dsdm-current" />
        <circle cx="104" cy="120" r="5" fill={AMBER} />
        <circle cx="300" cy="113" r="5" fill={AMBER} />
        <L x="200" y="156" size={12.5} fill={AMBER} weight={700}>copper trace carries the driven value</L>
        <M x="384" y="124" size={12} anchor="start" fill={N}>out</M>
      </g>
      <g className="dsdm-slide-in" style={m3d(0.9)}>
        <rect x="470" y="50" width="400" height="140" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.3" />
        <M x="500" y="100" size={18} anchor="start" fill={BLUE} weight={800}>wire y;</M>
        <M x="500" y="150" size={18} anchor="start" fill={N} weight={800}>assign y = a &amp; b;</M>
      </g>
      <g className="dsdm-fade-in" style={m3d(1.5)}>
        <Wire d="M690 144 C770 144 770 94 590 94" stroke={ROSE} width={2.4} marker="url(#dsdArrRo)" />
        <L x="768" y="126" size={14} anchor="start" fill={ROSE}>Driver</L>
      </g>
      <g className="dsdm-emerge" style={m3d(2.2)}>
        <circle cx="70" cy="262" r="24" fill="none" stroke={RED} strokeWidth="4.5" />
        <path d="M53 245 L87 279" stroke={RED} strokeWidth="4.5" />
        <M x="112" y="256" size={16} anchor="start" fill={N} weight={800}>always @(*) begin y = a; end</M>
        <L x="112" y="284" size={14} anchor="start" fill={RED}>ERROR: wire cannot be on LHS in always block</L>
        <L x="560" y="270" size={13} anchor="start" fill={GREEN}>Fix: declare reg y; or keep assign</L>
      </g>
      <g className="dsdm-fade-in" style={m3d(3.0)}>
        <L x="30" y="330" size={14} anchor="start" fill={N}>Net variants</L>
        {nets.map(([kw, meaning], i) => (
          <g key={kw}>
            <rect x={30 + i * 140} y="342" width="140" height="34" fill={SKY} stroke={BLUE} strokeWidth="1.5" />
            <M x={100 + i * 140} y="365" size={16} fill={BLUE} weight={800}>{kw}</M>
            <rect x={30 + i * 140} y="376" width="140" height="40" fill={WHITE} stroke={BLUE} strokeWidth="1.5" />
            <L x={100 + i * 140} y="401" size={12.5} fill={N} weight={700}>{meaning}</L>
          </g>
        ))}
      </g>
    </Scene>
  )
}

export function M3RegContextScene() {
  const cols = [
    {
      x: 30, title: 'Combinational (no flip-flop)', tone: GREEN, sens: '@(*)', body: '  y = a & b;', decl: ' y;',
      note: 'y follows a and b immediately', t0: 0.2,
    },
    {
      x: 470, title: 'Sequential (flip-flop inferred)', tone: PURP, sens: '@(posedge clk)', body: '  q <= d;', decl: ' q;',
      note: 'q changes only on the rising clk edge', t0: 1.8,
    },
  ]
  return (
    <Scene caption="reg does not mean register: the sensitivity list decides the hardware">
      {cols.map((c) => (
        <g key={c.title} className="dsdm-slide-in" style={m3d(c.t0)}>
          <L x={c.x + 200} y="46" size={16} fill={c.tone}>{c.title}</L>
          <rect x={c.x} y="60" width="400" height="118" rx="10" fill={WHITE} stroke={c.tone} strokeWidth="2.3" />
          <rect x={c.x + 16} y="70" width="36" height="24" rx="4" fill={AMBER} fillOpacity="0.2" stroke={AMBER} strokeWidth="1.5" />
          <M x={c.x + 20} y="88" size={16} anchor="start" fill={N} weight={800}>
            <tspan fill={AMBER}>reg</tspan>
            {c.decl}
          </M>
          <M x={c.x + 20} y="116" size={16} anchor="start" fill={N} weight={800}>
            {'always '}
            <tspan fill={c.tone}>{c.sens}</tspan>
            {' begin'}
          </M>
          <M x={c.x + 20} y="142" size={16} anchor="start" fill={N} weight={800}>{c.body}</M>
          <M x={c.x + 20} y="166" size={16} anchor="start" fill={N} weight={800}>end</M>
          <Wire d={`M${c.x + 200} 182 L${c.x + 200} 212`} stroke={c.tone} width={2.6} marker={`url(#${c.tone === GREEN ? 'dsdArrG' : 'dsdArrP'})`} />
          <L x={c.x + 200} y="350" size={13} fill={MUTED} weight={700}>{c.note}</L>
        </g>
      ))}
      <g className="dsdm-slide-in" style={m3d(0.7)}>
        <path d="M140 257 L200 257 M140 283 L200 283 M260 270 L310 270" stroke={N} strokeWidth="2.4" />
        <M x="132" y="261" size={14} anchor="end" fill={N}>a</M>
        <M x="132" y="287" size={14} anchor="end" fill={N}>b</M>
        <M1Gate x="200" y="270" w="60" h="52" stroke={GREEN} />
        <M x="318" y="275" size={14} anchor="start" fill={GREEN} weight={800}>y</M>
        <L x="230" y="320" size={12} fill={MUTED} weight={700}>AND gate</L>
      </g>
      <g className="dsdm-slide-in" style={m3d(2.3)}>
        <rect x="630" y="222" width="80" height="100" rx="6" fill={WHITE} stroke={PURP} strokeWidth="2.5" />
        <path d="M630 290 L644 300 L630 310" fill="none" stroke={PURP} strokeWidth="2.2" />
        <M x="642" y="252" size={14} anchor="start" fill={N} weight={800}>D</M>
        <M x="698" y="252" size={14} anchor="end" fill={N} weight={800}>Q</M>
        <path d="M590 247 L630 247 M590 300 L630 300 M710 247 L750 247" stroke={N} strokeWidth="2.4" />
        <M x="582" y="251" size={14} anchor="end" fill={N}>d</M>
        <M x="582" y="304" size={14} anchor="end" fill={N}>clk</M>
        <M x="758" y="252" size={14} anchor="start" fill={PURP} weight={800}>q</M>
        <L x="780" y="300" size={12} fill={MUTED} weight={700}>D flip-flop</L>
      </g>
      <g className="dsdm-fade-in" style={m3d(3.2)}>
        <path d="M30 372 L870 372" stroke={N} strokeWidth="2" />
        <L x="450" y="404" size={15} fill={N}>Both use reg type, but the sensitivity list determines</L>
        <L x="450" y="428" size={15} fill={N}>whether the hardware is combinational or sequential</L>
      </g>
    </Scene>
  )
}

export function M3VarTypesScene() {
  const colX = [45, 145, 235, 455, 705, 855]
  const head = ['Type', 'Size', 'Signed', 'Use Case', 'Synthesizable']
  const rows = [
    ['wire', 'N bits', 'No', 'Physical connections', 'Yes'],
    ['reg', 'N bits', 'Optional (signed keyword)', 'Storage in always blocks', 'Yes'],
    ['integer', '32 bits', "Yes (2's complement)", 'Loop counters, arithmetic', 'Limited'],
    ['real', '64 bits', 'Yes (IEEE 754)', 'Analog modelling', 'No'],
    ['time', '64 bits', 'No (unsigned)', 'Simulation timestamps', 'No'],
  ]
  const synthTone = { Yes: GREEN, Limited: AMBER, No: RED }
  const cx = (c) => (colX[c] + colX[c + 1]) / 2
  return (
    <Scene caption="Only wire and reg map straight to hardware; the rest serve simulation">
      <g className="dsdm-cell-in" style={m3d(0.1)}>
        <rect x="45" y="30" width="810" height="34" rx="6" fill={BLUE} />
        {head.map((h, c) => (
          <L key={h} x={cx(c)} y="53" size={14} fill={WHITE}>{h}</L>
        ))}
      </g>
      {rows.map((r, i) => (
        <g key={r[0]} className="dsdm-cell-in" style={m3d(0.5 + i * 0.35)}>
          <rect x="45" y={64 + i * 40} width="810" height="40" fill={i % 2 ? WHITE : SKY} stroke={MUTED} strokeWidth="0.8" />
          <M x={cx(0)} y={90 + i * 40} size={15} fill={BLUE} weight={800}>{r[0]}</M>
          <L x={cx(1)} y={89 + i * 40} size={13} fill={N} weight={700}>{r[1]}</L>
          <L x={cx(2)} y={89 + i * 40} size={13} fill={N} weight={700}>{r[2]}</L>
          <L x={cx(3)} y={89 + i * 40} size={13} fill={N} weight={700}>{r[3]}</L>
          <L x={cx(4)} y={89 + i * 40} size={14} fill={synthTone[r[4]]}>{r[4]}</L>
        </g>
      ))}
      <g className="dsdm-cell-in" style={m3d(2.6)}>
        <M x="50" y="306" size={16} anchor="start" fill={N} weight={800}>integer grades [1:20];</M>
        <L x="850" y="306" size={12.5} anchor="end" fill={MUTED} weight={700}>20 elements, each a 32-bit integer</L>
        {Array.from({ length: 20 }, (_, i) => (
          <g key={i}>
            <rect x={50 + i * 40} y="324" width="40" height="40" fill={i === 4 ? SKY : WHITE} stroke={N} strokeWidth="1.6" />
            <M x={70 + i * 40} y="349" size={13} fill={N}>{i + 1}</M>
          </g>
        ))}
      </g>
      <g className="dsdm-slide-in" style={m3d(3.3)}>
        <rect x="211" y="325" width="38" height="38" fill="none" stroke={ROSE} strokeWidth="3" />
        <Wire d="M230 400 L230 370" stroke={ROSE} width={2.4} marker="url(#dsdArrRo)" />
        <M x="230" y="420" size={14} fill={ROSE} weight={800}>grades[5]</M>
        <L x="230" y="440" size={12} fill={MUTED} weight={700}>one whole element per index</L>
      </g>
    </Scene>
  )
}

export function M3DataflowVsGateScene() {
  return (
    <Scene caption="One circuit, two descriptions: explicit gates, or a single continuous assignment">
      <L x="210" y="48" size={18} fill={BLUE}>Gate-Level</L>
      <L x="690" y="48" size={18} fill={TEAL}>Dataflow</L>
      <rect x="20" y="64" width="380" height="310" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2" />
      <rect x="500" y="64" width="380" height="310" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2" />

      <g className="dsdm-slide-in" style={m3d(0.2)}>
        <path d="M70 131 L110 131 M70 149 L110 149 M160 140 L205 140 L205 176 L258 176" fill="none" stroke={N} strokeWidth="2.4" />
        <M x="62" y="135" size={14} anchor="end" fill={N}>a</M>
        <M x="62" y="153" size={14} anchor="end" fill={N}>b</M>
        <M1Gate x="110" y="140" w="50" h="56" />
        <M x="182" y="130" size={12} fill={BLUE}>a&amp;b</M>
      </g>
      <g className="dsdm-slide-in" style={m3d(0.7)}>
        <path d="M70 250 L110 250 M160 250 L225 250 L225 214 L258 214" fill="none" stroke={N} strokeWidth="2.4" />
        <M x="62" y="254" size={14} anchor="end" fill={N}>c</M>
        <path d="M110 232 L148 250 L110 268 Z" fill={WHITE} stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="154" cy="250" r="5" fill={WHITE} stroke={N} strokeWidth="2.2" />
        <M x="192" y="270" size={12} fill={BLUE}>~c</M>
      </g>
      <g className="dsdm-slide-in" style={m3d(1.2)}>
        <path d="M306 195 L350 195" stroke={N} strokeWidth="2.4" />
        <M1Gate x="250" y="195" w="56" h="56" kind="or" />
        <M x="358" y="200" size={15} anchor="start" fill={GREEN} weight={800}>y</M>
      </g>

      <g className="dsdm-slide-in" style={m3d(1.8)}>
        <Wire d="M410 150 L488 150" stroke={TEAL} width={2.8} marker="url(#dsdArrT)" />
        <L x="450" y="216" size={36} fill={N}>=</L>
        <L x="450" y="244" size={12} fill={MUTED} weight={700}>Same circuit,</L>
        <L x="450" y="260" size={12} fill={MUTED} weight={700}>different</L>
        <L x="450" y="276" size={12} fill={MUTED} weight={700}>abstraction</L>
      </g>
      <g className="dsdm-cell-in" style={m3d(2.2)}>
        <rect x="520" y="160" width="340" height="60" rx="8" fill={SKY} stroke={TEAL} strokeWidth="2.2" />
        <M x="690" y="197" size={17} fill={N} weight={800}>assign y = (a &amp; b) | (~c);</M>
        <M x="690" y="270" size={13} fill={MUTED}>&amp;  →  AND gate</M>
        <M x="690" y="296" size={13} fill={MUTED}>|  →  OR gate</M>
        <M x="690" y="322" size={13} fill={MUTED}>~  →  NOT gate</M>
      </g>
      <g className="dsdm-fade-in" style={m3d(3.0)}>
        <rect x="90" y="400" width="720" height="48" rx="10" fill={WHITE} stroke={TEAL} strokeWidth="2.2" />
        <L x="450" y="430" size={14} fill={TEAL}>Dataflow highlights: concurrent execution, no explicit gates, synthesis-friendly</L>
      </g>
    </Scene>
  )
}

export function M3FullAdderWiresScene() {
  // XOR = OR outline plus a second back curve 8 units behind it.
  const xorBack = (x, y, h) => `M${x - 8} ${y - h / 2} Q${x - 8 + 56 * 0.28} ${y} ${x - 8} ${y + h / 2}`
  const tag = (x, y, w, text, tone) => (
    <g>
      <rect x={x} y={y} width={w} height="22" rx="5" fill={WHITE} stroke={tone} strokeWidth="2" />
      <M x={x + w / 2} y={y + 16} size={12.5} fill={tone} weight={800}>{text}</M>
    </g>
  )
  return (
    <Scene caption="Internal wires p, g and cp name the nets between gates, exactly as the code does">
      <g className="dsdm-slide-in" style={m3d(0.2)}>
        <path d="M40 90 L144 90 M50 90 L50 390 L150 390 M70 110 L144 110 M90 110 L90 370 L150 370 M40 40 L290 40 L290 270 L330 270 M290 160 L324 160" fill="none" stroke={GREEN} strokeWidth="2.4" strokeLinejoin="round" />
        <Dot cx="50" cy="90" r="4" fill={GREEN} />
        <Dot cx="90" cy="110" r="4" fill={GREEN} />
        <Dot cx="290" cy="160" r="4" fill={GREEN} />
        <M x="36" y="94" size={14} anchor="end" fill={GREEN} weight={800}>a</M>
        <M x="64" y="114" size={14} anchor="end" fill={GREEN} weight={800}>b</M>
        <M x="36" y="44" size={14} anchor="end" fill={GREEN} weight={800}>cin</M>
      </g>
      <g className="dsdm-fade-in" style={m3d(0.9)}>
        <path d="M200 100 L250 100 L250 290 L330 290 M250 140 L284 140 A6 6 0 0 1 296 140 L324 140 M200 380 L430 380 L430 340 L476 340 M380 280 L420 280 L420 320 L476 320" fill="none" stroke={BLUE} strokeWidth="2.4" strokeLinejoin="round" />
        <Dot cx="250" cy="140" r="4" fill={BLUE} />
      </g>
      <g className="dsdm-slide-in" style={m3d(0.2)}>
        <path d={xorBack(150, 100, 60)} fill="none" stroke={N} strokeWidth="2.5" />
        <M1Gate x="150" y="100" w="50" h="60" kind="or" />
        <M1Gate x="150" y="380" w="50" h="60" />
        <path d={xorBack(330, 150, 60)} fill="none" stroke={N} strokeWidth="2.5" />
        <M1Gate x="330" y="150" w="50" h="60" kind="or" />
        <M1Gate x="330" y="280" w="50" h="60" />
        <M1Gate x="470" y="330" w="56" h="60" kind="or" />
      </g>
      <g className="dsdm-emerge" style={m3d(1.1)}>{tag(206, 64, 60, 'wire p', BLUE)}</g>
      <g className="dsdm-emerge" style={m3d(1.4)}>{tag(290, 390, 60, 'wire g', BLUE)}</g>
      <g className="dsdm-emerge" style={m3d(1.7)}>{tag(426, 250, 66, 'wire cp', BLUE)}</g>
      <g className="dsdm-slide-in" style={m3d(2.2)}>
        <path d="M380 150 L556 150 M526 330 L556 330" fill="none" stroke={RED} strokeWidth="2.6" />
        {tag(562, 139, 50, 'sum', RED)}
        {tag(562, 319, 56, 'cout', RED)}
      </g>
      <g className="dsdm-slide-in" style={m3d(2.9)}>
        <Panel
          x="640" y="70" w="245" title="Verilog" accent={BLUE} mono rowH={30}
          rows={[
            ['wire p, g, cp;', null, BLUE],
            'assign p = a ^ b;',
            'assign g = a & b;',
            'assign cp = cin & p;',
            ['assign sum = p ^ cin;', null, RED],
            ['assign cout = g | cp;', null, RED],
          ]}
        />
      </g>
    </Scene>
  )
}

export function M3AssignDelayScene() {
  const tx = (t) => 150 + 22 * t
  const sig = [
    ['a', 5, 150, BLUE, 0.8],
    ['b', 10, 230, PURP, 1.2],
    ['y', 15, 310, GREEN, 1.6],
  ]
  return (
    <Scene caption="assign #5 holds every output change back by 5 time units">
      <g className="dsdm-fade-in" style={m3d(0.2)}>
        <M x="450" y="56" size={22} fill={N} weight={800}>
          {'assign '}
          <tspan fill={AMBER}>#5</tspan>
          {' y = a & b;'}
        </M>
      </g>
      <path d={`M${tx(10)} 264 L${tx(10)} 350 M${tx(15)} 264 L${tx(15)} 350`} stroke={MUTED} strokeWidth="1.4" strokeDasharray="4 5" />
      <Wire d="M150 350 L836 350" stroke={MUTED} width={2.2} marker="url(#dsdArrM)" />
      {[0, 5, 10, 15, 20, 25, 30].map((t) => (
        <g key={t}>
          <path d={`M${tx(t)} 345 L${tx(t)} 355`} stroke={MUTED} strokeWidth="2" />
          <M x={tx(t)} y="374" size={12} fill={MUTED}>{`${t}ns`}</M>
        </g>
      ))}
      <M x="846" y="355" size={13} anchor="start" fill={MUTED}>t</M>
      {sig.map(([name, t, low, tone, d]) => (
        <g key={name}>
          <M x="120" y={low - 10} size={18} anchor="end" fill={tone} weight={800}>{name}</M>
          <path d={`M150 ${low} L${tx(t)} ${low} L${tx(t)} ${low - 30} L${tx(30)} ${low - 30}`} fill="none" stroke={tone} strokeWidth="3" strokeLinejoin="round" className="dsdm-draw" style={m3d(d)} />
        </g>
      ))}
      <Wire d={`M150 310 L${tx(10)} 310 L${tx(10)} 280 L${tx(15)} 280`} stroke={MUTED} width={2} dash="6 5" />
      <M x={(tx(10) + tx(15)) / 2} y="299" size={11} fill={MUTED}>zero-delay y</M>
      <g className="dsdm-fade-in" style={m3d(3.0)}>
        <L x={tx(10) - 6} y="190" size={12.5} anchor="end" fill={PURP}>b rises at 10ns</L>
        <L x={tx(15) + 8} y="334" size={12.5} anchor="start" fill={GREEN}>y rises at 15ns</L>
        <Wire d={`M${tx(10) + 2} 256 L${tx(15) - 4} 256`} stroke={AMBER} width={2.6} marker="url(#dsdArrA)" />
        <L x={(tx(10) + tx(15)) / 2} y="246" size={13} fill={AMBER}>#5 propagation delay</L>
      </g>
      <g className="dsdm-fade-in" style={m3d(3.6)}>
        <L x="450" y="416" size={15} fill={N}>Without #5, y would rise at 10ns (zero delay)</L>
        <L x="450" y="440" size={12.5} fill={MUTED} weight={700}>The delay is for simulation only; synthesis ignores it</L>
      </g>
    </Scene>
  )
}

export function M3DataflowTemplateScene() {
  const bands = [
    { y: 30, h: 40, tone: MUTED, fill: WHITE, lines: ['`timescale 1ns/100ps'], label: 'Section 1: Compiler directive' },
    { y: 76, h: 60, tone: GREEN, fill: GREEN, op: 0.1, lines: ['module prime_detect(input wire [3:0] N,', '                    output wire F);'], label: 'Section 2: Port list' },
    { y: 142, h: 40, tone: BLUE, fill: SKY, lines: ['  wire t0, t1, t2, t3;'], label: 'Section 3: Internal wires' },
    {
      y: 188, h: 150, tone: AMBER, fill: AMBER, op: 0.1,
      lines: [
        '  assign t0 = ~N[3] & N[0];',
        '  assign t1 = ~N[3] & ~N[2] & N[1];',
        '  assign t2 = ~N[2] & N[1] & N[0];',
        '  assign t3 = N[2] & ~N[1] & N[0];',
        '  assign F  = t0 | t1 | t2 | t3;',
      ],
      label: 'Section 4: Concurrent assigns',
    },
    { y: 344, h: 36, tone: GREEN, fill: GREEN, op: 0.1, lines: ['endmodule'] },
  ]
  return (
    <Scene caption="A pure dataflow module: directive, ports, internal wires, concurrent assigns">
      {bands.map((b, i) => {
        const top = b.y + b.h / 2 - ((b.lines.length - 1) * 22) / 2 + 5
        const mid = b.y + b.h / 2
        return (
          <g key={b.lines[0]} className="dsdm-cell-in" style={m3d(0.2 + i * 0.4)}>
            <rect x="40" y={b.y} width="520" height={b.h} rx="6" fill={b.fill} fillOpacity={b.op} stroke={b.tone} strokeWidth="2.2" />
            {b.lines.map((ln, j) => (
              <M key={ln} x="56" y={top + j * 22} size={14} anchor="start" fill={N}>{ln}</M>
            ))}
            {b.label ? (
              <>
                <path d={`M568 ${b.y + 4} L576 ${b.y + 4} L576 ${b.y + b.h - 4} L568 ${b.y + b.h - 4} M576 ${mid} L590 ${mid}`} fill="none" stroke={b.tone} strokeWidth="2" />
                <L x="596" y={mid + 5} size={14} anchor="start" fill={b.tone}>{b.label}</L>
              </>
            ) : null}
          </g>
        )
      })}
      <g className="dsdm-fade-in" style={m3d(2.4)}>
        <rect x="596" y="360" width="284" height="92" rx="10" fill={WHITE} stroke={RED} strokeWidth="2.2" />
        <L x="612" y="388" size={14} anchor="start" fill={RED}>Pure dataflow module:</L>
        <L x="612" y="410" size={13} anchor="start" fill={N} weight={700}>no always, no initial,</L>
        <L x="612" y="430" size={13} anchor="start" fill={N} weight={700}>no reg — only wires and assigns</L>
      </g>
      {bands.filter((b) => b.label).map((b, i) => (
        <g key={`c${b.label}`} className="dsdm-emerge" style={m3d(3.0 + i * 0.3)}>
          <path d={`M852 ${b.y + b.h / 2} L859 ${b.y + b.h / 2 + 7} L872 ${b.y + b.h / 2 - 8}`} fill="none" stroke={GREEN} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}
    </Scene>
  )
}

/* ── Module 4 ────────────────────────────────────────────────────────── */


export function M4CrossCoupledNorLatchScene() {
  return (
    <Scene caption="Cross-coupled NOR Latch">
      {/* Top NOR gate (R input) */}
      <g transform="translate(400, 140)">
        <path d="M0,0 Q15,0 30,15 Q15,30 0,30 Q10,15 0,0" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <circle cx="34" cy="15" r="4" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>
      {/* Bottom NOR gate (S input) */}
      <g transform="translate(400, 240)">
        <path d="M0,0 Q15,0 30,15 Q15,30 0,30 Q10,15 0,0" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <circle cx="34" cy="15" r="4" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>

      {/* R Input */}
      <Wire d="M 300 148 L 400 148" />
      <L x="280" y="152" fill={BLUE}>R</L>
      {/* S Input */}
      <Wire d="M 300 268 L 400 268" />
      <L x="280" y="272" fill={BLUE}>S</L>

      {/* Q Output */}
      <Wire d="M 438 155 L 530 155" />
      <L x="550" y="159" fill={BLUE}>Q</L>
      <Dot cx="460" cy="155" r="4" fill={BLUE} />
      
      {/* Q' Output */}
      <Wire d="M 438 255 L 530 255" />
      <L x="550" y="259" fill={BLUE}>Q'</L>
      <Dot cx="450" cy="255" r="4" fill={BLUE} />

      {/* Feedback Q -> S side (bottom gate input 2) */}
      <Wire d="M 460 155 L 460 210 L 380 210 L 380 252 L 400 252" />
      <Wire d="M 460 155 L 460 210 L 380 210 L 380 252 L 400 252" stroke={AMBER} className="dsdm-traverse" width="3" />

      {/* Feedback Q' -> R side (top gate input 2) */}
      <Wire d="M 450 255 L 450 200 L 390 200 L 390 162 L 400 162" />
      <Wire d="M 450 255 L 450 200 L 390 200 L 390 162 L 400 162" stroke={AMBER} className="dsdm-traverse" width="3" />
    </Scene>
  )
}

export function M4TimingWaveformDiagramScene() {
  return (
    <Scene caption="Timing Considerations: Setup and Hold Times">
      <L x="80" y="125" fill={BLUE} anchor="end">Clock</L>
      <Wire d="M 100 150 L 350 150 L 350 90 L 600 90 L 600 150 L 800 150" stroke={BLUE} width="3" />
      
      <L x="80" y="225" fill={N} anchor="end">Data</L>
      <Wire d="M 100 250 L 250 250 L 250 190 L 800 190" stroke={N} width="3" />
      
      <L x="80" y="325" fill={ROSE} anchor="end">Output</L>
      <Wire d="M 100 350 L 430 350 L 430 290 L 800 290" stroke={ROSE} width="3" />

      {/* Setup and hold regions */}
      <rect x="290" y="70" width="60" height="200" fill={SKY} opacity="0.6" />
      <rect x="350" y="70" width="40" height="200" fill={AMBER} opacity="0.2" />

      {/* Active edge dashed line */}
      <Wire d="M 350 70 L 350 380" stroke={MUTED} dash="6 6" width="2" />

      {/* Labels for Setup and Hold */}
      <Wire d="M 290 60 L 350 60" stroke={MUTED} marker="url(#dsdArrM)" width="2" />
      <Wire d="M 350 60 L 290 60" stroke={MUTED} marker="url(#dsdArrM)" width="2" />
      <M x="320" y="50" size="12" fill={MUTED}>ts</M>

      <Wire d="M 350 60 L 390 60" stroke={MUTED} marker="url(#dsdArrM)" width="2" />
      <Wire d="M 390 60 L 350 60" stroke={MUTED} marker="url(#dsdArrM)" width="2" />
      <M x="370" y="50" size="12" fill={MUTED}>th</M>

      {/* Propagation Delay tp */}
      <Wire d="M 350 380 L 430 380" stroke={MUTED} marker="url(#dsdArrM)" width="2" />
      <Wire d="M 430 380 L 350 380" stroke={MUTED} marker="url(#dsdArrM)" width="2" />
      <M x="390" y="370" size="12" fill={MUTED}>tp</M>
      
      <Wire d="M 430 290 L 430 380" stroke={MUTED} dash="4 4" width="1" />
    </Scene>
  )
}

export function M4ClockedSrLogicScene() {
  return (
    <Scene caption="Clocked SR Flip-Flop">
      {/* Top AND Gate (R, Clk) */}
      <g transform="translate(250, 140)">
        <path d="M0,0 L15,0 A15,15 0 0,1 15,30 L0,30 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>
      {/* Bottom AND Gate (S, Clk) */}
      <g transform="translate(250, 240)">
        <path d="M0,0 L15,0 A15,15 0 0,1 15,30 L0,30 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>

      {/* R input to top AND */}
      <Wire d="M 180 148 L 250 148" />
      <L x="160" y="152" fill={BLUE}>R</L>
      {/* S input to bottom AND */}
      <Wire d="M 180 268 L 250 268" />
      <L x="160" y="272" fill={BLUE}>S</L>
      {/* Clock input */}
      <Wire d="M 180 208 L 220 208 L 220 162 L 250 162" />
      <Wire d="M 220 208 L 220 252 L 250 252" />
      <Dot cx="220" cy="208" r="4" fill={N} />
      <L x="150" y="212" fill={MUTED}>CLK</L>

      {/* Outputs of AND gates to NOR latch */}
      <Wire d="M 280 155 L 400 155" />
      <Wire d="M 280 255 L 400 255" />

      {/* Top NOR gate */}
      <g transform="translate(400, 140)">
        <path d="M0,0 Q15,0 30,15 Q15,30 0,30 Q10,15 0,0" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <circle cx="34" cy="15" r="4" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>
      {/* Bottom NOR gate */}
      <g transform="translate(400, 240)">
        <path d="M0,0 Q15,0 30,15 Q15,30 0,30 Q10,15 0,0" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <circle cx="34" cy="15" r="4" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>
      
      {/* NOR Outputs */}
      <Wire d="M 438 155 L 530 155" />
      <L x="550" y="159" fill={BLUE}>Q</L>
      <Dot cx="460" cy="155" r="4" fill={BLUE} />
      
      <Wire d="M 438 255 L 530 255" />
      <L x="550" y="259" fill={BLUE}>Q'</L>
      <Dot cx="450" cy="255" r="4" fill={BLUE} />

      {/* NOR Feedback */}
      <Wire d="M 460 155 L 460 210 L 380 210 L 380 252 L 400 252" />
      <Wire d="M 450 255 L 450 200 L 390 200 L 390 162 L 400 162" />
    </Scene>
  )
}

export function M4JkFeedbackLogicScene() {
  return (
    <Scene caption="JK Flip-Flop Feedback Logic">
      {/* Top AND Gate (K, Clk, Q) */}
      <g transform="translate(250, 140)">
        <path d="M0,0 L15,0 A15,15 0 0,1 15,30 L0,30 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>
      {/* Bottom AND Gate (J, Clk, Q') */}
      <g transform="translate(250, 240)">
        <path d="M0,0 L15,0 A15,15 0 0,1 15,30 L0,30 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>

      {/* Inputs to Top AND */}
      <Wire d="M 180 145 L 250 145" />
      <L x="160" y="149" fill={BLUE}>K</L>
      <Wire d="M 180 155 L 220 155 L 220 208" /> {/* Clk */}
      
      {/* Inputs to Bottom AND */}
      <Wire d="M 180 265 L 250 265" />
      <L x="160" y="269" fill={BLUE}>J</L>
      <Wire d="M 220 208 L 220 255 L 250 255" /> {/* Clk */}
      
      <Wire d="M 150 208 L 220 208" />
      <Dot cx="220" cy="208" r="4" fill={N} />
      <L x="120" y="212" fill={MUTED}>CLK</L>

      {/* Outputs of AND gates to NOR latch */}
      <Wire d="M 280 155 L 400 155" />
      <Wire d="M 280 255 L 400 255" />

      {/* Top NOR gate */}
      <g transform="translate(400, 140)">
        <path d="M0,0 Q15,0 30,15 Q15,30 0,30 Q10,15 0,0" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <circle cx="34" cy="15" r="4" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>
      {/* Bottom NOR gate */}
      <g transform="translate(400, 240)">
        <path d="M0,0 Q15,0 30,15 Q15,30 0,30 Q10,15 0,0" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <circle cx="34" cy="15" r="4" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>
      
      {/* NOR Outputs */}
      <Wire d="M 438 155 L 530 155" />
      <L x="550" y="159" fill={BLUE}>Q</L>
      <Dot cx="460" cy="155" r="4" fill={BLUE} />
      <Dot cx="480" cy="155" r="4" fill={BLUE} /> {/* For JK Feedback */}
      
      <Wire d="M 438 255 L 530 255" />
      <L x="550" y="259" fill={BLUE}>Q'</L>
      <Dot cx="450" cy="255" r="4" fill={BLUE} />
      <Dot cx="490" cy="255" r="4" fill={BLUE} /> {/* For JK Feedback */}

      {/* NOR Feedback */}
      <Wire d="M 460 155 L 460 210 L 380 210 L 380 252 L 400 252" />
      <Wire d="M 450 255 L 450 200 L 390 200 L 390 162 L 400 162" />

      {/* JK Feedback from Q to K AND gate */}
      <Wire d="M 480 155 L 480 90 L 230 90 L 230 165 L 250 165" stroke={AMBER} />
      <Wire d="M 480 155 L 480 90 L 230 90 L 230 165 L 250 165" stroke={AMBER} className="dsdm-traverse" width="3" />

      {/* JK Feedback from Q' to J AND gate */}
      <Wire d="M 490 255 L 490 320 L 230 320 L 230 245 L 250 245" stroke={AMBER} />
      <Wire d="M 490 255 L 490 320 L 230 320 L 230 245 L 250 245" stroke={AMBER} className="dsdm-traverse" width="3" />
    </Scene>
  )
}

export function M4MasterSlaveBlockDiagramScene() {
  return (
    <Scene caption="Master-Slave JK Flip-Flop">
      <Block x="250" y="200" w="140" h="90" label="Master Latch" stroke={BLUE} fill={WHITE} />
      <Block x="500" y="200" w="140" h="90" label="Slave Latch" stroke={BLUE} fill={WHITE} />

      {/* Data In */}
      <Wire d="M 150 245 L 250 245" />
      <L x="110" y="249" fill={BLUE}>Input</L>
      <Wire d="M 150 245 L 250 245" stroke={AMBER} className="dsdm-traverse" width="3" />

      {/* Master to Slave */}
      <Wire d="M 390 245 L 500 245" />
      <Wire d="M 390 245 L 500 245" stroke={AMBER} className="dsdm-traverse dsdm-delay-2" width="3" />

      {/* Output */}
      <Wire d="M 640 245 L 720 245" />
      <L x="750" y="249" fill={BLUE}>Output</L>

      {/* Clock Line */}
      <Wire d="M 150 330 L 200 330 L 200 270 L 250 270" />
      <L x="110" y="334" fill={MUTED}>CLK</L>
      <Dot cx="200" cy="330" r="4" fill={N} />

      {/* To Inverter */}
      <Wire d="M 200 330 L 440 330" />
      
      {/* Inverter Symbol */}
      <g transform="translate(440, 315)">
        <path d="M0,5 L0,25 L15,15 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
        <circle cx="19" cy="15" r="4" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>

      {/* After Inverter to Slave Enable */}
      <Wire d="M 463 330 L 480 330 L 480 270 L 500 270" />
    </Scene>
  )
}

export function M4CharacteristicEquationsTableScene() {
  const rowY = [160, 240, 340, 440]
  return (
    <Scene caption="Characteristic Equations of Flip-Flops">
      {/* Headers */}
      <L x="120" y="100" fill={MUTED}>Name</L>
      <L x="240" y="100" fill={MUTED}>Symbol</L>
      <L x="450" y="100" fill={MUTED}>Truth Table</L>
      <L x="720" y="100" fill={MUTED}>Characteristic Equation</L>
      <Wire d="M 80 120 L 820 120" stroke={MUTED} width="1" />

      {/* D Flip Flop */}
      <g>
        <L x="120" y={rowY[0]} fill={BLUE}>D</L>
        <rect x="220" y={rowY[0]-20} width="40" height="40" fill="none" stroke={N} />
        <M x="230" y={rowY[0]-6} size="10">D</M>
        <M x="250" y={rowY[0]-6} size="10">Q</M>
        
        <M x="450" y={rowY[0]-10} size="12">D=0 → Q+=0</M>
        <M x="450" y={rowY[0]+10} size="12">D=1 → Q+=1</M>

        <M x="720" y={rowY[0]} size="16" fill={ROSE}>Q+ = D</M>
      </g>
      <Wire d="M 80 190 L 820 190" stroke={MUTED} width="1" opacity="0.3" />

      {/* T Flip Flop */}
      <g>
        <L x="120" y={rowY[1]} fill={BLUE}>T</L>
        <rect x="220" y={rowY[1]-20} width="40" height="40" fill="none" stroke={N} />
        <M x="230" y={rowY[1]-6} size="10">T</M>
        <M x="250" y={rowY[1]-6} size="10">Q</M>
        
        <M x="450" y={rowY[1]-10} size="12">T=0 → Q+=Q</M>
        <M x="450" y={rowY[1]+10} size="12">T=1 → Q+=Q'</M>

        <M x="720" y={rowY[1]} size="16" fill={ROSE}>Q+ = T ⊕ Q</M>
      </g>
      <Wire d="M 80 270 L 820 270" stroke={MUTED} width="1" opacity="0.3" />

      {/* JK Flip Flop */}
      <g>
        <L x="120" y={rowY[2]} fill={BLUE}>JK</L>
        <rect x="220" y={rowY[2]-20} width="40" height="40" fill="none" stroke={N} />
        <M x="230" y={rowY[2]-10} size="10">J</M>
        <M x="230" y={rowY[2]+10} size="10">K</M>
        <M x="250" y={rowY[2]-6} size="10">Q</M>
        
        <M x="450" y={rowY[2]-25} size="12">0 0 → Q</M>
        <M x="450" y={rowY[2]-5} size="12">0 1 → 0</M>
        <M x="450" y={rowY[2]+15} size="12">1 0 → 1</M>
        <M x="450" y={rowY[2]+35} size="12">1 1 → Q'</M>

        <M x="720" y={rowY[2]} size="16" fill={ROSE}>Q+ = JQ' + K'Q</M>
      </g>
      <Wire d="M 80 390 L 820 390" stroke={MUTED} width="1" opacity="0.3" />

      {/* SR Flip Flop */}
      <g>
        <L x="120" y={rowY[3]} fill={BLUE}>SR</L>
        <rect x="220" y={rowY[3]-20} width="40" height="40" fill="none" stroke={N} />
        <M x="230" y={rowY[3]-10} size="10">S</M>
        <M x="230" y={rowY[3]+10} size="10">R</M>
        <M x="250" y={rowY[3]-6} size="10">Q</M>
        
        <M x="450" y={rowY[3]-25} size="12">0 0 → Q</M>
        <M x="450" y={rowY[3]-5} size="12">0 1 → 0</M>
        <M x="450" y={rowY[3]+15} size="12">1 0 → 1</M>
        <M x="450" y={rowY[3]+35} size="12" fill={RED}>1 1 → ?</M>

        <M x="720" y={rowY[3]-10} size="16" fill={ROSE}>Q+ = S + R'Q</M>
        <M x="720" y={rowY[3]+15} size="12" fill={RED}>(SR = 0)</M>
      </g>
    </Scene>
  )
}

export function M4FourBitParallelRegisterScene() {
  const ffs = [80, 170, 260, 350]
  return (
    <Scene caption="4-Bit Parallel Register">
      {/* Common Clock */}
      <Wire d="M 200 450 L 380 450" />
      <L x="170" y="454" fill={MUTED}>CLK</L>
      <Wire d="M 380 450 L 380 110" />

      {ffs.map((y, i) => (
        <g key={i}>
          <Block x="400" y={y} w="80" h="60" label={`D${i}`} stroke={BLUE} fill={WHITE} />
          {/* Data In */}
          <Wire d={`M 250 ${y + 20} L 400 ${y + 20}`} />
          <L x="230" y={y + 24} fill={BLUE}>{`D${i}`}</L>
          <Wire d={`M 250 ${y + 20} L 400 ${y + 20}`} stroke={AMBER} className="dsdm-traverse" width="3" />
          
          {/* Clock In */}
          <Wire d={`M 380 ${y + 50} L 400 ${y + 50}`} />
          <Dot cx="380" cy={y + 50} r="3" fill={N} />
          {/* Clock triangle inside FF */}
          <path d={`M 400 ${y + 45} L 410 ${y + 50} L 400 ${y + 55}`} fill="none" stroke={MUTED} strokeWidth="1.5" />

          {/* Data Out */}
          <Wire d={`M 480 ${y + 20} L 630 ${y + 20}`} />
          <L x="650" y={y + 24} fill={BLUE}>{`Q${i}`}</L>
          <Wire d={`M 480 ${y + 20} L 630 ${y + 20}`} stroke={AMBER} className="dsdm-traverse dsdm-delay-1" width="3" />
        </g>
      ))}
    </Scene>
  )
}

export function M4FourBitShiftRegisterScene() {
  const ffs = [150, 300, 450, 600]
  return (
    <Scene caption="4-Bit Shift Register (SISO / SIPO)">
      {/* Common Clock Line along the bottom */}
      <Wire d="M 100 350 L 640 350" />
      <L x="70" y="354" fill={MUTED}>CLK</L>

      {/* Serial Data Input to first FF */}
      <Wire d="M 50 230 L 150 230" />
      <L x="50" y="220" fill={BLUE}>Serial In</L>
      <Wire d="M 50 230 L 150 230" stroke={AMBER} className="dsdm-traverse" width="3" />

      {ffs.map((x, i) => (
        <g key={i}>
          <Block x={x} y="200" w="80" h="100" label={`FF${i}`} stroke={BLUE} fill={WHITE} />
          <M x={x + 15} y="235" size="11">D</M>
          <M x={x + 65} y="235" size="11">Q</M>

          {/* Clock In */}
          <Wire d={`M ${x + 40} 350 L ${x + 40} 300`} />
          <Dot cx={x + 40} cy="350" r="3" fill={N} />
          {/* Clock triangle */}
          <path d={`M ${x + 35} 300 L ${x + 40} 290 L ${x + 45} 300`} fill="none" stroke={MUTED} strokeWidth="1.5" />

          {/* Data Connection to Next FF or Out */}
          {i < 3 ? (
            <g>
              <Wire d={`M ${x + 80} 230 L ${x + 150} 230`} />
              <Wire d={`M ${x + 80} 230 L ${x + 150} 230`} stroke={AMBER} className={`dsdm-traverse dsdm-delay-${i+1}`} width="3" />
            </g>
          ) : (
            <g>
              <Wire d={`M ${x + 80} 230 L ${x + 150} 230`} />
              <Wire d={`M ${x + 80} 230 L ${x + 150} 230`} stroke={AMBER} className="dsdm-traverse dsdm-delay-4" width="3" />
              <L x={x + 190} y="234" fill={BLUE}>Serial Out</L>
            </g>
          )}

          {/* Parallel Output (Optional but standard for SIPO) */}
          <Wire d={`M ${x + 80} 230 L ${x + 100} 230 L ${x + 100} 150`} />
          <L x={x + 100} y="140" fill={BLUE}>{`Q${i}`}</L>
          <Dot cx={x + 100} cy="230" r="3" fill={N} />
        </g>
      ))}
    </Scene>
  )
}

export function M4ThreeBitRippleCounterScene() {
  const ffs = [200, 400, 600]
  return (
    <Scene caption="3-Bit Binary Ripple Counter (Asynchronous)">
      {/* T inputs tied to 1 */}
      <Wire d="M 120 150 L 650 150" />
      <L x="90" y="154" fill={BLUE}>Logic 1</L>
      
      {/* External Clock to FF0 */}
      <Wire d="M 120 290 L 200 290" />
      <L x="90" y="294" fill={MUTED}>CLK</L>

      {ffs.map((x, i) => (
        <g key={i}>
          <Block x={x} y="200" w="100" h="120" label={`FF${i}`} stroke={BLUE} fill={WHITE} />
          <M x={x + 15} y="235" size="11">T</M>
          <M x={x + 85} y="235" size="11">Q</M>
          <M x={x + 85} y="295" size="11">Q'</M>

          {/* T to Logic 1 */}
          <Wire d={`M ${x + 50} 150 L ${x + 50} 230 L ${x} 230`} />
          <Dot cx={x + 50} cy="150" r="3" fill={N} />

          {/* Clock triangle */}
          <path d={`M ${x} 280 L ${x + 10} 290 L ${x} 300`} fill="none" stroke={MUTED} strokeWidth="1.5" />
          <circle cx={x - 4} cy="290" r="4" fill="none" stroke={MUTED} strokeWidth="1.5" /> 

          {/* Q Output connecting to next CLK */}
          {i < 2 ? (
            <Wire d={`M ${x + 100} 230 L ${x + 150} 230 L ${x + 150} 290 L ${x + 200} 290`} stroke={AMBER} />
          ) : null}

          {/* Q Output (to display) */}
          <Wire d={`M ${x + 100} 230 L ${x + 130} 230 L ${x + 130} 100`} stroke={BLUE} />
          <L x={x + 130} y="90" fill={BLUE}>{`Q${i}`}</L>
          <Dot cx={x + 100} cy="230" r="3" fill={N} />
        </g>
      ))}

      {/* Ripple Animation Effects */}
      <Wire d="M 120 290 L 200 290" stroke={AMBER} className="dsdm-pulse" width="3" />
      <Wire d="M 300 230 L 350 230 L 350 290 L 400 290" stroke={AMBER} className="dsdm-pulse dsdm-delay-1" width="3" />
      <Wire d="M 500 230 L 550 230 L 550 290 L 600 290" stroke={AMBER} className="dsdm-pulse dsdm-delay-2" width="3" />
    </Scene>
  )
}

export function M4FourBitSyncCounterScene() {
  const ffs = [100, 280, 460, 640]
  return (
    <Scene caption="4-Bit Synchronous Binary Counter">
      <Wire d="M 50 360 L 680 360" />
      <L x="30" y="364" fill={MUTED}>CLK</L>

      <Wire d="M 50 230 L 100 230" />
      <L x="30" y="234" fill={BLUE}>1</L>

      {ffs.map((x, i) => (
        <g key={i}>
          <Block x={x} y="200" w="80" h="120" label={`FF${i}`} stroke={BLUE} fill={WHITE} />
          <M x={x + 15} y="235" size="11">T</M>
          <M x={x + 65} y="235" size="11">Q</M>

          <Wire d={`M ${x + 40} 360 L ${x + 40} 320`} />
          <Dot cx={x + 40} cy="360" r="3" fill={N} />
          <path d={`M ${x + 35} 320 L ${x + 40} 310 L ${x + 45} 320`} fill="none" stroke={MUTED} strokeWidth="1.5" />

          <Wire d={`M ${x + 80} 230 L ${x + 120} 230 L ${x + 120} 120`} />
          <L x={x + 120} y="110" fill={BLUE}>{`Q${i}`}</L>
          <Dot cx={x + 80} cy="230" r="3" fill={N} />
        </g>
      ))}

      {/* FF1 T = Q0 */}
      <Wire d="M 180 230 L 280 230" />
      
      {/* AND1 (FF2 T) */}
      <g transform="translate(400, 160)">
        <path d="M0,0 L15,0 A15,15 0 0,1 15,30 L0,30 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>
      <Wire d="M 220 230 L 220 170 L 400 170" />
      <Dot cx="220" cy="230" r="3" fill={N} />
      <Wire d="M 360 230 L 380 230 L 380 185 L 400 185" />
      <Dot cx="360" cy="230" r="3" fill={N} />
      <Wire d="M 430 175 L 445 175 L 445 230 L 460 230" />

      {/* AND2 (FF3 T) */}
      <g transform="translate(580, 160)">
        <path d="M0,0 L15,0 A15,15 0 0,1 15,30 L0,30 Z" fill={WHITE} stroke={BLUE} strokeWidth="2.5" />
      </g>
      <Wire d="M 445 175 L 580 170" />
      <Dot cx="445" cy="175" r="3" fill={N} />
      <Wire d="M 540 230 L 560 230 L 560 185 L 580 185" />
      <Dot cx="540" cy="230" r="3" fill={N} />
      <Wire d="M 610 175 L 625 175 L 625 230 L 640 230" />
    </Scene>
  )
}

export function M4FourBitRingCounterScene() {
  const ffs = [150, 300, 450, 600]
  return (
    <Scene caption="4-Bit Ring Counter">
      <Wire d="M 100 350 L 640 350" />
      <L x="70" y="354" fill={MUTED}>CLK</L>

      {ffs.map((x, i) => (
        <g key={i}>
          <Block x={x} y="200" w="80" h="100" label={`FF${i}`} stroke={BLUE} fill={WHITE} />
          <M x={x + 15} y="235" size="11">D</M>
          <M x={x + 65} y="235" size="11">Q</M>

          <Wire d={`M ${x + 40} 350 L ${x + 40} 300`} />
          <Dot cx={x + 40} cy="350" r="3" fill={N} />
          <path d={`M ${x + 35} 300 L ${x + 40} 290 L ${x + 45} 300`} fill="none" stroke={MUTED} strokeWidth="1.5" />

          {i < 3 ? (
            <Wire d={`M ${x + 80} 230 L ${x + 150} 230`} />
          ) : null}

          {/* Q outputs for display */}
          <Wire d={`M ${x + 80} 230 L ${x + 100} 230 L ${x + 100} 420`} />
          <L x={x + 100} y="440" fill={BLUE}>{`Q${i}`}</L>
          <Dot cx={x + 100} cy="230" r="3" fill={N} />
        </g>
      ))}

      {/* Ring Feedback */}
      <Wire d="M 680 230 L 720 230 L 720 120 L 120 120 L 120 230 L 150 230" stroke={ROSE} width="2.5" />
      <Wire d="M 680 230 L 720 230 L 720 120 L 120 120 L 120 230 L 150 230" stroke={ROSE} className="dsdm-traverse" width="3" />
      <L x="420" y="110" fill={ROSE}>Ring Feedback</L>
    </Scene>
  )
}

export function M4FourBitJohnsonCounterScene() {
  const ffs = [150, 300, 450, 600]
  return (
    <Scene caption="4-Bit Johnson Counter (Twisted Ring)">
      <Wire d="M 100 350 L 640 350" />
      <L x="70" y="354" fill={MUTED}>CLK</L>

      {ffs.map((x, i) => (
        <g key={i}>
          <Block x={x} y="200" w="80" h="100" label={`FF${i}`} stroke={BLUE} fill={WHITE} />
          <M x={x + 15} y="235" size="11">D</M>
          <M x={x + 65} y="235" size="11">Q</M>
          {i === 3 ? <M x={x + 65} y="275" size="11">Q'</M> : null}

          <Wire d={`M ${x + 40} 350 L ${x + 40} 300`} />
          <Dot cx={x + 40} cy="350" r="3" fill={N} />
          <path d={`M ${x + 35} 300 L ${x + 40} 290 L ${x + 45} 300`} fill="none" stroke={MUTED} strokeWidth="1.5" />

          {i < 3 ? (
            <Wire d={`M ${x + 80} 230 L ${x + 150} 230`} />
          ) : null}

          <Wire d={`M ${x + 80} 230 L ${x + 100} 230 L ${x + 100} 420`} />
          <L x={x + 100} y="440" fill={BLUE}>{`Q${i}`}</L>
          <Dot cx={x + 100} cy="230" r="3" fill={N} />
        </g>
      ))}

      {/* Twisted Feedback from Q3' */}
      <Wire d="M 680 275 L 720 275 L 720 120 L 120 120 L 120 230 L 150 230" stroke={PURP} width="2.5" />
      <Wire d="M 680 275 L 720 275 L 720 120 L 120 120 L 120 230 L 150 230" stroke={PURP} className="dsdm-traverse" width="3" />
      <L x="420" y="110" fill={PURP}>Twisted Feedback (Q' to D)</L>
    </Scene>
  )
}

export function M4CounterDesignFlowScene() {
  return (
    <Scene caption="Design Flow of Synchronous Mod-n Counters">
      <Card x="50" y="200" w="160" h="120" title="State Diagram" lines={["Define sequence", "of states", "(Bubbles & Arrows)"]} accent={BLUE} />
      <Wire d="M 210 260 L 260 260" marker="url(#dsdArrM)" />
      
      <Card x="260" y="200" w="160" h="120" title="State Table" lines={["Current State", "↓", "Next State"]} accent={TEAL} />
      <Wire d="M 420 260 L 470 260" marker="url(#dsdArrM)" />
      
      <Card x="470" y="200" w="160" h="120" title="Excitation Table" lines={["Transition", "↓", "Required Inputs"]} accent={AMBER} />
      <Wire d="M 630 260 L 680 260" marker="url(#dsdArrM)" />
      
      <Card x="680" y="200" w="160" h="120" title="Hardware" lines={["Combinational Gates", "feeding into", "Flip-Flops"]} accent={ROSE} />
    </Scene>
  )
}

export function M4SrExcitationKmapScene() {
  return (
    <Scene caption="Design using SR Flip-Flops">
      {/* Left: SR Excitation Table */}
      <Panel x="100" y="120" w="220" title="SR Excitation" rows={[
        ["0 → 0", "S=0, R=X"],
        ["0 → 1", "S=1, R=0", BLUE],
        ["1 → 0", "S=0, R=1"],
        ["1 → 1", "S=X, R=0"]
      ]} />
      
      <Wire d="M 330 220 L 420 180" stroke={AMBER} dash="6 6" marker="url(#dsdArrA)" />
      <Wire d="M 330 220 L 420 340" stroke={AMBER} dash="6 6" marker="url(#dsdArrA)" />

      {/* Right: S K-map */}
      <g transform="translate(450, 100)">
        <L x="60" y="-15" fill={N}>S Map</L>
        <rect x="0" y="0" width="120" height="120" fill="none" stroke={MUTED} strokeWidth="2" />
        <Wire d="M 60 0 L 60 120" stroke={MUTED} />
        <Wire d="M 0 60 L 120 60" stroke={MUTED} />
        <M x="30" y="35" size="20">0</M>
        <M x="90" y="35" size="20" fill={BLUE} className="dsdm-pulse">1</M>
        <M x="30" y="95" size="20">0</M>
        <M x="90" y="95" size="20">X</M>
      </g>

      {/* Right: R K-map */}
      <g transform="translate(450, 280)">
        <L x="60" y="-15" fill={N}>R Map</L>
        <rect x="0" y="0" width="120" height="120" fill="none" stroke={MUTED} strokeWidth="2" />
        <Wire d="M 60 0 L 60 120" stroke={MUTED} />
        <Wire d="M 0 60 L 120 60" stroke={MUTED} />
        <M x="30" y="35" size="20">X</M>
        <M x="90" y="35" size="20" fill={BLUE} className="dsdm-pulse">0</M>
        <M x="30" y="95" size="20">1</M>
        <M x="90" y="95" size="20">0</M>
      </g>
    </Scene>
  )
}

export function M4JkExcitationKmapScene() {
  return (
    <Scene caption="Design using JK Flip-Flops">
      {/* Left: JK Excitation Table */}
      <Panel x="100" y="120" w="220" title="JK Excitation" rows={[
        ["0 → 0", "J=0, K=X"],
        ["0 → 1", "J=1, K=X", BLUE],
        ["1 → 0", "J=X, K=1"],
        ["1 → 1", "J=X, K=0"]
      ]} />
      
      <Wire d="M 330 220 L 420 180" stroke={AMBER} dash="6 6" marker="url(#dsdArrA)" />
      <Wire d="M 330 220 L 420 340" stroke={AMBER} dash="6 6" marker="url(#dsdArrA)" />

      {/* Right: J K-map */}
      <g transform="translate(450, 100)">
        <L x="60" y="-15" fill={N}>J Map</L>
        <rect x="0" y="0" width="120" height="120" fill="none" stroke={MUTED} strokeWidth="2" />
        <Wire d="M 60 0 L 60 120" stroke={MUTED} />
        <Wire d="M 0 60 L 120 60" stroke={MUTED} />
        <M x="30" y="35" size="20">0</M>
        <M x="90" y="35" size="20" fill={BLUE} className="dsdm-pulse">1</M>
        <M x="30" y="95" size="20">X</M>
        <M x="90" y="95" size="20">X</M>
      </g>

      {/* Right: K K-map */}
      <g transform="translate(450, 280)">
        <L x="60" y="-15" fill={N}>K Map</L>
        <rect x="0" y="0" width="120" height="120" fill="none" stroke={MUTED} strokeWidth="2" />
        <Wire d="M 60 0 L 60 120" stroke={MUTED} />
        <Wire d="M 0 60 L 120 60" stroke={MUTED} />
        <M x="30" y="35" size="20">X</M>
        <M x="90" y="35" size="20" fill={BLUE} className="dsdm-pulse">X</M>
        <M x="30" y="95" size="20">0</M>
        <M x="90" y="95" size="20">1</M>
      </g>
    </Scene>
  )
}

export function M4DtExcitationComparisonScene() {
  return (
    <Scene caption="Design using D and T Flip-Flops">
      {/* Left: D Flip Flop */}
      <L x="200" y="80" size="18" fill={BLUE}>D Flip-Flop (Direct Mapping)</L>
      <Panel x="60" y="120" w="180" title="Next State (Q+)" rows={[
        ["State 0", "0", BLUE],
        ["State 1", "1"],
        ["State 2", "1"],
        ["State 3", "0"]
      ]} />
      <Wire d="M 250 200 L 300 200" stroke={MUTED} marker="url(#dsdArrM)" />
      <g transform="translate(320, 120)">
        <L x="60" y="-15" fill={N}>D Map</L>
        <rect x="0" y="0" width="120" height="120" fill="none" stroke={MUTED} strokeWidth="2" />
        <Wire d="M 60 0 L 60 120" stroke={MUTED} />
        <Wire d="M 0 60 L 120 60" stroke={MUTED} />
        <M x="30" y="35" size="20" fill={BLUE}>0</M>
        <M x="90" y="35" size="20">1</M>
        <M x="30" y="95" size="20">1</M>
        <M x="90" y="95" size="20">0</M>
      </g>

      <Wire d="M 470 120 L 470 340" stroke={MUTED} width="2" dash="8 8" opacity="0.4" />

      {/* Right: T Flip Flop */}
      <L x="680" y="80" size="18" fill={TEAL}>T Flip-Flop (XOR Mapping)</L>
      <Panel x="500" y="120" w="180" title="T = Q ⊕ Q+" rows={[
        ["0 ⊕ 0", "0"],
        ["0 ⊕ 1", "1", TEAL],
        ["1 ⊕ 1", "0"],
        ["1 ⊕ 0", "1"]
      ]} />
      <Wire d="M 690 200 L 740 200" stroke={MUTED} marker="url(#dsdArrM)" />
      <g transform="translate(760, 120)">
        <L x="60" y="-15" fill={N}>T Map</L>
        <rect x="0" y="0" width="120" height="120" fill="none" stroke={MUTED} strokeWidth="2" />
        <Wire d="M 60 0 L 60 120" stroke={MUTED} />
        <Wire d="M 0 60 L 120 60" stroke={MUTED} />
        <M x="30" y="35" size="20">0</M>
        <M x="90" y="35" size="20" fill={TEAL} className="dsdm-pulse">1</M>
        <M x="30" y="95" size="20">0</M>
        <M x="90" y="95" size="20">1</M>
      </g>
    </Scene>
  )
}

/* ── Module 5 ────────────────────────────────────────────────────────── */

export function M5AbstractionLevelLadderScene() {
  return (
    <Scene caption="Levels of abstraction in Verilog: from gate-level to behavioral">
      {/* Background container */}
      <rect x="250" y="80" width="400" height="360" rx="10" fill={WHITE} stroke={BLUE} strokeWidth="2" opacity="0.1" />

      {/* Gate / switch level — static (not dsdm-insert): that animation's
          periodic opacity/scale dip was making this box's text faint, small
          and mis-scaled whenever a screenshot landed mid-cycle */}
      <g>
        <Block x="270" y="340" w="360" h="80" label="Gate / switch level" sub="and g1(y,a,b);" stroke={BLUE} fill={SKY} />
        {/* Small AND gate drawing, held clear of the label's right edge */}
        <path d="M 540 370 L 550 370 A 10 10 0 0 1 550 390 L 540 390 Z" fill="none" stroke={BLUE} strokeWidth="2" />
        <Wire d="M 530 374 L 540 374 M 530 386 L 540 386 M 560 380 L 570 380" stroke={BLUE} />
      </g>

      {/* RTL level — label sits at the top of the box, register icons in
          their own row below it, so neither covers the other. */}
      <g>
        <Block x="270" y="210" w="360" h="100" stroke={PURP} fill={SKY} />
        <L x="450" y="232" size={13} fill={N}>Register-transfer level</L>
        <L x="450" y="248" size={11} fill={MUTED} weight={700}>assign / data moves between registers</L>
        <rect x="360" y="268" width="40" height="30" rx="4" fill={WHITE} stroke={PURP} strokeWidth="2" />
        <rect x="500" y="268" width="40" height="30" rx="4" fill={WHITE} stroke={PURP} strokeWidth="2" />
        <Wire d="M 400 283 L 496 283" stroke={PURP} marker="url(#dsdArrP)" />
        <M x="450" y="278" size="10" fill={PURP}>data</M>
      </g>

      {/* Behavioral level */}
      <g>
        <Block x="270" y="100" w="360" h="80" label="Behavioral level" sub="always @(posedge clk) q = d;" stroke={AMBER} fill={SKY} />
      </g>

      {/* Left arrow (more abstract) */}
      <g className="dsdm-traverse">
        <Wire d="M 220 400 L 220 120" stroke={TEAL} width="3" marker="url(#dsdArrT)" />
        <g transform="translate(200, 260) rotate(-90)">
          <L x="0" y="0" size="13" fill={TEAL}>more abstract, less implementation specific</L>
        </g>
      </g>

      {/* Right arrow (more control) */}
      <g className="dsdm-traverse">
        <Wire d="M 680 120 L 680 400" stroke={RED} width="3" marker="url(#dsdArrR)" />
        <g transform="translate(700, 260) rotate(90)">
          <L x="0" y="0" size="13" fill={RED}>more designer control over gates</L>
        </g>
      </g>

      {/* D flip-flop to the right */}
      <g className="dsdm-pulse">
        <Block x="740" y="100" w="60" h="80" stroke={N} fill={WHITE} />
        <M x="750" y="130" size="12" fill={N} anchor="start">d</M>
        <M x="750" y="160" size="12" fill={N} anchor="start">clk</M>
        <M x="790" y="130" size="12" fill={N} anchor="end">q</M>
        <path d="M 740 155 L 750 160 L 740 165" fill="none" stroke={N} strokeWidth="2" />
        <Wire d="M 630 140 L 736 140" stroke={AMBER} dash="6 4" marker="url(#dsdArrA)" />
      </g>
    </Scene>
  )
}

export function M5ModuleBodyBlockMapScene() {
  return (
    <Scene caption="Structure of a behavioral module: parallel blocks">
      <Block x="150" y="60" w="600" h="400" label="module example (...)" labelFill={BLUE} stroke={BLUE} fill={CREAM} />
      
      {/* Ports */}
      <g className="dsdm-insert">
        <Wire d="M 100 120 L 146 120" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="90" y="124" size="12" fill={BLUE} anchor="end">Ain</M>
        <Wire d="M 100 160 L 146 160" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="90" y="164" size="12" fill={BLUE} anchor="end">Bin</M>

        <Wire d="M 750 120 L 796 120" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="806" y="124" size="12" fill={BLUE} anchor="start">Cout</M>
        <Wire d="M 750 160 L 796 160" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="806" y="164" size="12" fill={BLUE} anchor="start">ps</M>
      </g>

      {/* Declarations */}
      <g className="dsdm-shift">
        <Block x="180" y="90" w="540" h="40" label="declarations: reg, integer i, count" size="12" stroke={MUTED} fill={WHITE} mono />
      </g>

      {/* Blocks */}
      <g className="dsdm-insert">
        {/* Initial */}
        <Block x="180" y="160" w="160" h="80" label="initial" sub="runs once at t = 0" stroke={PURP} fill={WHITE} mono />
        <path d="M 230 185 A 12 12 0 1 1 230 205 L 235 200 M 225 180 L 265 210 M 265 180 L 225 210" fill="none" stroke={RED} strokeWidth="2" />

        {/* Always */}
        <Block x="370" y="160" w="160" h="80" label="always" sub="repeats forever" stroke={AMBER} fill={WHITE} mono />
        <path d="M 440 185 A 12 12 0 1 1 440 205 L 445 200" fill="none" stroke={AMBER} strokeWidth="2" />

        {/* Assign */}
        <Block x="560" y="160" w="160" h="80" label="assign" sub="continuous" stroke={TEAL} fill={WHITE} mono />
        <Wire d="M 610 195 L 670 195" stroke={TEAL} width="2" marker="url(#dsdArrT)" />
      </g>

      {/* Timelines */}
      <g className="dsdm-traverse">
        {/* Initial timeline */}
        <Wire d="M 260 280 L 260 280" stroke={PURP} width="4" />
        <Dot cx="260" cy="280" r="5" fill={PURP} />
        <L x="260" y="300" size="12" fill={PURP}>stops at t=0</L>

        {/* Always timeline */}
        <Wire d="M 450 280 L 700 280" stroke={AMBER} width="4" marker="url(#dsdArrA)" />
        <L x="450" y="300" size="12" fill={AMBER}>t → ∞</L>

        {/* Assign timeline */}
        <Wire d="M 640 280 L 700 280" stroke={TEAL} width="4" marker="url(#dsdArrT)" />
        <L x="640" y="300" size="12" fill={TEAL}>t → ∞</L>
      </g>
    </Scene>
  )
}

export function M5SensitivityTriggerTimelineScene() {
  return (
    <Scene caption="Event control: sensitivity lists, posedge/negedge and @(*)">
      <Card x="150" y="40" w="280" h="70" title="incomplete list" accent={RED} mono footTone={RED}>
        <M x="140" y="55" size="13" fill={N}>always @(a) y = a & b;</M>
      </Card>
      
      <Card x="470" y="40" w="280" h="70" title="complete list" accent={GREEN} mono footTone={GREEN}>
        <M x="140" y="55" size="13" fill={N}>always @(*) y = a & b;</M>
      </Card>

      <Axes x="150" y="240" w="600" h="100" origin="left" />
      <M x="120" y="160" size="14" fill={BLUE}>a</M>
      <Wire d="M 150 180 L 250 180 L 250 140 L 450 140 L 450 180 L 750 180" stroke={BLUE} width="3" />
      
      <M x="120" y="220" size="14" fill={PURP}>b</M>
      <Wire d="M 150 240 L 350 240 L 350 200 L 750 200" stroke={PURP} width="3" />
      
      {/* Wake icons for a */}
      <g className="dsdm-pulse">
        <path d="M 245 130 L 240 145 L 250 145 L 245 160" fill="none" stroke={RED} strokeWidth="2" />
        <path d="M 445 130 L 440 145 L 450 145 L 445 160" fill="none" stroke={RED} strokeWidth="2" />
      </g>
      {/* Wake icons for a and b */}
      <g className="dsdm-pulse">
        <path d="M 255 130 L 250 145 L 260 145 L 255 160" fill="none" stroke={GREEN} strokeWidth="2" />
        <path d="M 355 190 L 350 205 L 360 205 L 355 220" fill="none" stroke={GREEN} strokeWidth="2" />
        <path d="M 455 130 L 450 145 L 460 145 L 455 160" fill="none" stroke={GREEN} strokeWidth="2" />
      </g>

      <Axes x="150" y="360" w="600" h="60" origin="left" />
      <M x="120" y="320" size="14" fill={RED}>y (incomplete)</M>
      {/* a=0 b=0 -> 0; a=1 b=0 (wakes, y=0); a=1 b=1 (no wake, stays 0); a=0 b=1 (wakes, y=0) */}
      <Wire d="M 150 360 L 750 360" stroke={RED} width="3" />

      <Axes x="150" y="460" w="600" h="60" origin="left" />
      <M x="120" y="420" size="14" fill={GREEN}>y (complete)</M>
      {/* a=0 b=0 -> 0; a=1 b=0 -> 0; a=1 b=1 -> 1 (wakes at b); a=0 b=1 -> 0 */}
      <Wire d="M 150 460 L 350 460 L 350 410 L 450 410 L 450 460 L 750 460" stroke={GREEN} width="3" />

      {/* Disagreement bracket */}
      <g className="dsdm-insert">
        <Wire d="M 350 380 L 350 390 L 450 390 L 450 380" stroke={RED} width="2" />
        <L x="400" y="405" size="12" fill={RED}>disagree</L>
      </g>
    </Scene>
  )
}

export function M5AssignmentTargetSorterScene() {
  return (
    <Scene caption="The procedural variable assignment statement and its legal targets">
      <Block x="360" y="80" w="180" h="60" label="target = expression;" mono stroke={BLUE} fill={WHITE} />
      
      {/* Funnel */}
      <g className="dsdm-descend">
        <path d="M 220 50 L 320 50 L 290 100 L 250 100 Z" fill={SKY} stroke={BLUE} strokeWidth="2" />
        <M x="270" y="40" size="11" fill={BLUE}>RHS evaluated now</M>
        <Wire d="M 310 110 L 340 110" stroke={BLUE} width="2" marker="url(#dsdArrB)" />
      </g>
      
      {/* Bins */}
      <Panel x="580" y="40" w="240" title="legal LHS in always/initial" accent={GREEN} className="dsdm-insert"
        rows={[
          ['reg [3:0] q', '', GREEN],
          ['integer count', '', GREEN],
          ['real x', '', GREEN],
          ['time t', '', GREEN]
        ]} />
        
      <Panel x="580" y="240" w="240" title="illegal LHS" accent={RED} className="dsdm-insert"
        rows={[
          ['wire y', '', RED],
          ['input a', '', RED]
        ]} />
      
      {/* Truncation drawing */}
      <g className="dsdm-shift" transform="translate(180, 260)">
        <L x="120" y="10" size="13" fill={MUTED}>4-bit register</L>
        <Block x="0" y="20" w="240" h="50" stroke={MUTED} fill={WHITE} />
        <path d="M 60 20 L 60 70 M 120 20 L 120 70 M 180 20 L 180 70" stroke={MUTED} strokeWidth="2" />
        
        <M x="30" y="50" size="16" fill={N}>0</M>
        <M x="90" y="50" size="16" fill={N}>0</M>
        <M x="150" y="50" size="16" fill={N}>1</M>
        <M x="210" y="50" size="16" fill={N}>0</M>
        
        {/* Falling bit */}
        <g className="dsdm-descend" transform="translate(-40, 50)">
          <M x="0" y="0" size="16" fill={RED}>1</M>
          <L x="0" y="20" size="11" fill={RED}>truncated</L>
        </g>
        <Wire d="M -20 -10 L -20 10" stroke={RED} width="2" marker="url(#dsdArrR)" />
        <M x="-20" y="-20" size="14" fill={RED}>1 0010</M>
      </g>
    </Scene>
  )
}

export function M5BlockingVsNonblockingHardwareScene() {
  return (
    <Scene caption="Blocking (=) versus non-blocking (<=) assignment">
      {/* Left panel */}
      <Card x="50" y="40" w="380" h="360" title="Blocking =" accent={RED} mono footTone={RED}>
        <M x="190" y="60" size="14" fill={N}>q1 = a; q2 = q1; out = q2;</M>
        
        {/* Hardware drawing */}
        <g className="dsdm-insert">
          <Block x="160" y="100" w="60" h="80" label="D  Q" size="14" stroke={RED} fill={WHITE} />
          <path d="M 160 160 L 170 165 L 160 170" fill="none" stroke={RED} strokeWidth="2" />
          <Wire d="M 120 120 L 160 120" stroke={RED} marker="url(#dsdArrR)" />
          <M x="110" y="124" size="14" fill={RED}>a</M>
          <Wire d="M 120 165 L 160 165" stroke={MUTED} />
          <M x="110" y="169" size="12" fill={MUTED}>clk</M>
          
          <Wire d="M 220 120 L 260 120 M 240 120 L 240 90 L 260 90 M 240 120 L 240 150 L 260 150" stroke={RED} marker="url(#dsdArrR)" />
          <M x="270" y="94" size="12" fill={RED} anchor="start">q1</M>
          <M x="270" y="124" size="12" fill={RED} anchor="start">q2</M>
          <M x="270" y="154" size="12" fill={RED} anchor="start">out</M>
        </g>
        
        {/* Table */}
        <g className="dsdm-shift" transform="translate(40, 220)">
          <L x="150" y="10" size="13" fill={MUTED}>Edge 1  Edge 2  Edge 3</L>
          <L x="40" y="30" size="12" fill={N}>q1</L>
          <M x="120" y="30" size="12" fill={RED}>a1</M><M x="180" y="30" size="12" fill={RED}>a2</M><M x="240" y="30" size="12" fill={RED}>a3</M>
          <L x="40" y="50" size="12" fill={N}>q2</L>
          <M x="120" y="50" size="12" fill={RED}>a1</M><M x="180" y="50" size="12" fill={RED}>a2</M><M x="240" y="50" size="12" fill={RED}>a3</M>
          <L x="40" y="70" size="12" fill={N}>out</L>
          <M x="120" y="70" size="12" fill={RED}>a1</M><M x="180" y="70" size="12" fill={RED}>a2</M><M x="240" y="70" size="12" fill={RED}>a3</M>
        </g>
      </Card>
      
      {/* Right panel */}
      <Card x="470" y="40" w="380" h="360" title="Non-blocking <=" accent={GREEN} mono footTone={GREEN}>
        <M x="190" y="60" size="14" fill={N}>q1 &lt;= a; q2 &lt;= q1; out &lt;= q2;</M>
        
        {/* Hardware drawing */}
        <g className="dsdm-insert">
          <Block x="60" y="100" w="60" h="80" label="D  Q" size="14" stroke={GREEN} fill={WHITE} />
          <path d="M 60 160 L 70 165 L 60 170" fill="none" stroke={GREEN} strokeWidth="2" />
          <Wire d="M 20 120 L 60 120" stroke={GREEN} marker="url(#dsdArrG)" />
          <M x="10" y="124" size="14" fill={GREEN}>a</M>
          
          <Block x="160" y="100" w="60" h="80" label="D  Q" size="14" stroke={GREEN} fill={WHITE} />
          <path d="M 160 160 L 170 165 L 160 170" fill="none" stroke={GREEN} strokeWidth="2" />
          <Wire d="M 120 120 L 160 120" stroke={GREEN} marker="url(#dsdArrG)" />
          <M x="140" y="110" size="11" fill={GREEN}>q1</M>
          
          <Block x="260" y="100" w="60" h="80" label="D  Q" size="14" stroke={GREEN} fill={WHITE} />
          <path d="M 260 160 L 270 165 L 260 170" fill="none" stroke={GREEN} strokeWidth="2" />
          <Wire d="M 220 120 L 260 120" stroke={GREEN} marker="url(#dsdArrG)" />
          <M x="240" y="110" size="11" fill={GREEN}>q2</M>
          
          <Wire d="M 320 120 L 360 120" stroke={GREEN} marker="url(#dsdArrG)" />
          <M x="370" y="124" size="12" fill={GREEN} anchor="start">out</M>
          
          <Wire d="M 30 165 L 60 165 M 40 165 L 40 190 L 270 190 M 140 190 L 140 165 L 160 165 M 240 190 L 240 165 L 260 165" stroke={MUTED} />
          <M x="20" y="169" size="12" fill={MUTED}>clk</M>
        </g>
        
        {/* Table */}
        <g className="dsdm-shift" transform="translate(40, 220)">
          <L x="150" y="10" size="13" fill={MUTED}>Edge 1  Edge 2  Edge 3</L>
          <L x="40" y="30" size="12" fill={N}>q1</L>
          <M x="120" y="30" size="12" fill={GREEN}>a1</M><M x="180" y="30" size="12" fill={GREEN}>a2</M><M x="240" y="30" size="12" fill={GREEN}>a3</M>
          <L x="40" y="50" size="12" fill={N}>q2</L>
          <M x="120" y="50" size="12" fill={MUTED}>-</M><M x="180" y="50" size="12" fill={GREEN}>a1</M><M x="240" y="50" size="12" fill={GREEN}>a2</M>
          <L x="40" y="70" size="12" fill={N}>out</L>
          <M x="120" y="70" size="12" fill={MUTED}>-</M><M x="180" y="70" size="12" fill={MUTED}>-</M><M x="240" y="70" size="12" fill={GREEN}>a1</M>
        </g>
      </Card>
    </Scene>
  )
}

export function M5IfChainMuxCascadeScene() {
  return (
    <Scene caption="Sequential statements: if-else chain as priority logic">
      <Card x="50" y="80" w="320" h="200" title="Code" accent={BLUE} mono footTone={BLUE}>
        <M x="20" y="60" size="13" fill={N} anchor="start">if (in[3]) y=3;</M>
        <M x="20" y="90" size="13" fill={N} anchor="start">else if (in[2]) y=2;</M>
        <M x="20" y="120" size="13" fill={N} anchor="start">else if (in[1]) y=1;</M>
        <M x="20" y="150" size="13" fill={N} anchor="start">else y=0;</M>
      </Card>

      {/* Mux cascade right to left */}
      <g className="dsdm-insert">
        {/* Right-most MUX for in[3] */}
        <path d="M 680 120 L 740 140 L 740 220 L 680 240 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <M x="690" y="150" size="12" fill={N}>1</M>
        <M x="690" y="210" size="12" fill={N}>0</M>
        <M x="710" y="250" size="12" fill={BLUE}>in[3]</M>
        <Wire d="M 640 145 L 680 145" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="630" y="150" size="12" fill={BLUE}>3</M>
        <Wire d="M 740 180 L 780 180" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="790" y="184" size="14" fill={BLUE}>y</M>

        {/* Middle MUX for in[2] */}
        <path d="M 540 160 L 600 180 L 600 260 L 540 280 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <M x="550" y="190" size="12" fill={N}>1</M>
        <M x="550" y="250" size="12" fill={N}>0</M>
        <M x="570" y="290" size="12" fill={BLUE}>in[2]</M>
        <Wire d="M 500 185 L 540 185" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="490" y="190" size="12" fill={BLUE}>2</M>
        <Wire d="M 600 220 L 620 220 L 620 215 L 680 215" stroke={BLUE} marker="url(#dsdArrB)" />

        {/* Left-most MUX for in[1] */}
        <path d="M 400 200 L 460 220 L 460 300 L 400 320 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <M x="410" y="230" size="12" fill={N}>1</M>
        <M x="410" y="290" size="12" fill={N}>0</M>
        <M x="430" y="330" size="12" fill={BLUE}>in[1]</M>
        <Wire d="M 360 225 L 400 225" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="350" y="230" size="12" fill={BLUE}>1</M>
        <Wire d="M 360 295 L 400 295" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="350" y="300" size="12" fill={BLUE}>0</M>
        <Wire d="M 460 260 L 480 260 L 480 255 L 540 255" stroke={BLUE} marker="url(#dsdArrB)" />
      </g>

      {/* Priority arrows */}
      <g className="dsdm-traverse">
        <Wire d="M 680 60 L 710 100" stroke={AMBER} dash="6 4" marker="url(#dsdArrA)" />
        <L x="680" y="45" size="12" fill={AMBER}>highest priority, shortest path</L>

        <Wire d="M 460 400 L 430 350" stroke={AMBER} dash="6 4" marker="url(#dsdArrA)" />
        <L x="460" y="420" size="12" fill={AMBER}>lowest priority, longest path</L>
      </g>
    </Scene>
  )
}

export function M5CaseDecoderDispatchScene() {
  return (
    <Scene caption="The case statement: parallel equality checks">
      <M x="80" y="250" size="14" fill={PURP}>op</M>
      <Wire d="M 100 245 L 140 245" stroke={PURP} width="3" marker="url(#dsdArrP)" />
      
      {/* Decoder box */}
      <g className="dsdm-insert">
        <path d="M 140 200 L 220 140 L 220 350 L 140 290 Z" fill={WHITE} stroke={PURP} strokeWidth="2" />
        <L x="180" y="250" size="14" fill={PURP} weight="700">case (op)</L>
      </g>
      
      <M x="60" y="60" size="14" fill={BLUE}>a = 0110</M>
      <M x="60" y="90" size="14" fill={BLUE}>b = 0011</M>

      {/* Operation boxes and fan-out */}
      <g className="dsdm-shift">
        <Wire d="M 220 180 L 300 120 L 340 120" stroke={PURP} marker="url(#dsdArrP)" />
        <Block x="340" y="100" w="160" h="40" label="2'b00: y = a + b" size="13" stroke={BLUE} fill={WHITE} mono />
        
        <Wire d="M 220 210 L 300 180 L 340 180" stroke={PURP} marker="url(#dsdArrP)" />
        <Block x="340" y="160" w="160" h="40" label="2'b01: y = a - b" size="13" stroke={BLUE} fill={WHITE} mono />
        
        <Wire d="M 220 240 L 300 240 L 340 240" stroke={PURP} marker="url(#dsdArrP)" />
        <Block x="340" y="220" w="160" h="40" label="2'b10: y = a & b" size="13" stroke={BLUE} fill={WHITE} mono />
        
        <Wire d="M 220 270 L 300 300 L 340 300" stroke={PURP} marker="url(#dsdArrP)" />
        <Block x="340" y="280" w="160" h="40" label="2'b11: y = a | b" size="13" stroke={BLUE} fill={WHITE} mono />
        
        <Wire d="M 220 300 L 300 380 L 340 380" stroke={MUTED} marker="url(#dsdArrM)" />
        <L x="300" y="340" size="11" fill={MUTED}>default (x or z in op)</L>
        <Block x="340" y="360" w="160" h="40" label="y = 4'bxxxx" size="13" stroke={MUTED} fill={WHITE} mono />
      </g>

      {/* Output Wide MUX */}
      <g className="dsdm-insert">
        <path d="M 600 80 L 660 120 L 660 380 L 600 420 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <M x="630" y="250" size="14" fill={BLUE}>MUX</M>
        <Wire d="M 500 120 L 600 120" stroke={BLUE} />
        <Wire d="M 500 180 L 600 180" stroke={BLUE} />
        <Wire d="M 500 240 L 600 240" stroke={BLUE} />
        <Wire d="M 500 300 L 600 300" stroke={BLUE} />
        <Wire d="M 500 380 L 600 380" stroke={MUTED} />
        <Wire d="M 660 250 L 720 250" stroke={BLUE} width="3" marker="url(#dsdArrB)" />
        <M x="740" y="254" size="14" fill={BLUE}>y[3:0]</M>
      </g>
    </Scene>
  )
}

export function M5MissingElseLatchScene() {
  return (
    <Scene caption="Incomplete if and case: sequential statements infer latches">
      <L x="250" y="50" size="16" fill={RED} weight="800">Incomplete</L>
      <Card x="100" y="70" w="300" h="80" title="" accent={RED} mono>
        <M x="250" y="110" size="13" fill={N}>always @(*) if (en) q = d;</M>
      </Card>
      
      <L x="650" y="50" size="16" fill={GREEN} weight="800">Complete</L>
      <Card x="500" y="70" w="300" h="80" title="" accent={GREEN} mono>
        <M x="650" y="110" size="13" fill={N}>always @(*) begin q=1'b0; if(en) q=d; end</M>
      </Card>

      {/* Latch left */}
      <g className="dsdm-insert">
        <Block x="180" y="180" w="100" h="80" label="D latch" size="14" stroke={RED} fill={WHITE} />
        <M x="195" y="205" size="12" fill={N}>D</M>
        <M x="195" y="245" size="12" fill={N}>G</M>
        <M x="265" y="205" size="12" fill={N}>Q</M>
        <Wire d="M 140 200 L 180 200" stroke={N} />
        <M x="130" y="204" size="12" fill={N}>d</M>
        <Wire d="M 140 240 L 180 240" stroke={N} />
        <M x="130" y="244" size="12" fill={N}>en</M>
        <Wire d="M 280 200 L 320 200" stroke={RED} />
        <M x="330" y="204" size="12" fill={RED}>q</M>
        {/* Warning triangle */}
        <path d="M 230 140 L 245 170 L 215 170 Z" fill={AMBER} />
        <M x="230" y="165" size="16" fill={WHITE}>!</M>
        <L x="230" y="125" size="12" fill={AMBER}>latch inferred</L>
      </g>

      {/* AND gate right */}
      <g className="dsdm-insert">
        <path d="M 580 180 L 610 180 A 40 40 0 0 1 610 260 L 580 260 Z" fill={WHITE} stroke={GREEN} strokeWidth="2" />
        <Wire d="M 540 200 L 580 200" stroke={N} />
        <M x="530" y="204" size="12" fill={N}>d</M>
        <Wire d="M 540 240 L 580 240" stroke={N} />
        <M x="530" y="244" size="12" fill={N}>en</M>
        <Wire d="M 650 220 L 690 220" stroke={GREEN} />
        <M x="700" y="224" size="12" fill={GREEN}>q</M>
      </g>

      {/* Timing strip */}
      <Axes x="100" y="320" w="700" h="0" origin="left" />
      <M x="70" y="340" size="14" fill={N}>en</M>
      <Wire d="M 100 360 L 200 360 L 200 330 L 400 330 L 400 360 L 600 360 L 600 330 L 800 330" stroke={N} width="2" />
      <M x="70" y="380" size="14" fill={N}>d</M>
      <Wire d="M 100 390 L 150 390 L 150 370 L 250 370 L 250 390 L 350 390 L 350 370 L 450 370 L 450 390 L 800 390" stroke={N} width="2" />

      <M x="70" y="430" size="14" fill={RED}>q (latch)</M>
      {/* latch inferred q: follows d when en=1, holds when en=0 */}
      <Wire d="M 100 440 L 200 440 L 200 420 L 250 420 L 250 440 L 450 440 L 450 420 L 800 420" stroke={RED} width="3" />
      
      <M x="70" y="470" size="14" fill={GREEN}>q (AND)</M>
      {/* AND q: en & d */}
      <Wire d="M 100 480 L 200 480 L 200 460 L 250 460 L 250 480 L 600 480 L 600 460 L 800 460" stroke={GREEN} width="3" />
    </Scene>
  )
}

export function M5ForLoopUnrollChainScene() {
  const data = [0, 1, 0, 0, 1, 1, 0, 1] // matching 1011_0010 right-to-left
  const sums = [0, 1, 1, 1, 2, 3, 3, 4]
  return (
    <Scene caption="Loop statements: for loop and loop unrolling">
      <Block x="200" y="40" w="500" h="60" label="for (i=0; i<8; i=i+1) ones = ones + data[i];" mono stroke={BLUE} fill={WHITE} />
      
      <g className="dsdm-insert">
        <Wire d="M 450 100 L 450 160" stroke={AMBER} width="3" marker="url(#dsdArrA)" />
        <L x="460" y="130" size="13" fill={AMBER} anchor="start">unroll</L>
      </g>
      
      <M x="30" y="255" size="14" fill={N}>0</M>
      <Wire d="M 50 250 L 90 250" stroke={N} />
      
      {/* 8 adders left to right */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <g key={i} className="dsdm-insert">
          {/* Adder circle */}
          <Dot cx={110 + i * 80} cy="250" r="16" fill={WHITE} stroke={BLUE} />
          <M x={110 + i * 80} y="255" size="16" fill={BLUE}>+</M>
          
          {/* Vertical input data[i] */}
          <Wire d={`M ${110 + i * 80} 190 L ${110 + i * 80} 234`} stroke={BLUE} marker="url(#dsdArrB)" />
          <M x={110 + i * 80} y="180" size="11" fill={BLUE}>d[{i}]={data[i]}</M>
          
          {/* Running sum wire */}
          <Wire d={`M ${126 + i * 80} 250 L ${190 + i * 80} 250`} stroke={N} marker="url(#dsdArr)" />
          
          {/* Tag for running sum */}
          <Card x={125 + i * 80} y="270" w="24" h="24" title="" accent={PURP} mono>
            <M x={137 + i * 80} y="287" size="12" fill={PURP}>{sums[i]}</M>
          </Card>
        </g>
      ))}
      <M x="810" y="255" size="14" fill={GREEN}>ones=4</M>
    </Scene>
  )
}

export function M5LoopFamilyComparisonStripScene() {
  return (
    <Scene caption="Loop statements: while, repeat and forever">
      {/* Lane 1: while */}
      <g className="dsdm-insert">
        <L x="150" y="50" size="16" fill={BLUE} weight="800">while (cond)</L>
        <path d="M 150 90 L 190 120 L 150 150 L 110 120 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <M x="150" y="125" size="12" fill={BLUE}>cond?</M>
        <Wire d="M 190 120 L 220 120 L 220 220 L 150 220 L 150 260" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="240" y="170" size="12" fill={BLUE}>true</M>
        <Block x="110" y="260" w="80" h="60" label="body" size="14" stroke={BLUE} fill={WHITE} />
        <Wire d="M 110 290 L 80 290 L 80 80 L 150 80 L 150 90" stroke={BLUE} marker="url(#dsdArrB)" />
        <Wire d="M 150 150 L 150 360" stroke={MUTED} marker="url(#dsdArrM)" />
        <M x="160" y="340" size="12" fill={MUTED} anchor="start">false</M>
      </g>
      
      {/* Lane 2: repeat */}
      <g className="dsdm-insert">
        <L x="450" y="50" size="16" fill={AMBER} weight="800">repeat (n)</L>
        <Block x="410" y="160" w="80" h="60" label="body" size="14" stroke={AMBER} fill={WHITE} />
        <Wire d="M 450 90 L 450 160" stroke={AMBER} marker="url(#dsdArrA)" />
        <Wire d="M 450 220 L 450 260 L 380 260 L 380 120 L 450 120" stroke={AMBER} marker="url(#dsdArrA)" />
        <Card x="510" y="170" w="40" h="40" title="" accent={AMBER} mono>
          <M x="530" y="195" size="12" fill={AMBER}>n=3</M>
        </Card>
        <L x="560" y="195" size="12" fill={AMBER} anchor="start">3, 2, 1, 0</L>
        <Wire d="M 450 260 L 450 360" stroke={MUTED} marker="url(#dsdArrM)" />
        <M x="460" y="340" size="12" fill={MUTED} anchor="start">at 0</M>
      </g>

      {/* Lane 3: forever */}
      <g className="dsdm-insert">
        <L x="750" y="50" size="16" fill={PURP} weight="800">forever</L>
        <Block x="710" y="160" w="80" h="60" label="body" size="14" stroke={PURP} fill={WHITE} />
        <Wire d="M 750 90 L 750 160" stroke={PURP} marker="url(#dsdArrP)" />
        <Wire d="M 750 220 L 750 260 L 680 260 L 680 120 L 750 120" stroke={PURP} marker="url(#dsdArrP)" />
        {/* Clock icon */}
        <Dot cx="830" cy="190" r="16" fill={WHITE} stroke={PURP} />
        <Wire d="M 830 190 L 830 180 M 830 190 L 838 190" stroke={PURP} width="2" />
        <L x="830" y="220" size="11" fill={PURP}>needs # or @ inside</L>
      </g>

      {/* Footer bar */}
      <g className="dsdm-insert">
        <rect x="50" y="400" width="800" height="40" rx="6" fill={SKY} />
        <L x="450" y="425" size="14" fill={N} weight="700">synthesizable only with a constant iteration count</L>
        {/* ticks and cross */}
        <M x="150" y="460" size="18" fill={GREEN}>✓ (constant bound only)</M>
        <M x="450" y="460" size="18" fill={GREEN}>✓</M>
        <M x="750" y="460" size="18" fill={RED}>✗</M>
      </g>
    </Scene>
  )
}

export function M5NestedSelectTreeScene() {
  return (
    <Scene caption="Behavioral multiplexers: 2:1 and 4:1 MUX with if-else and ? :">
      {/* MUX Symbol */}
      <g className="dsdm-insert">
        <path d="M 120 100 L 220 120 L 220 320 L 120 340 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <M x="170" y="225" size="16" fill={BLUE}>4:1 MUX</M>
        
        <Wire d="M 60 140 L 120 140" stroke={BLUE} />
        <M x="50" y="145" size="14" fill={BLUE}>i0</M>
        <Wire d="M 60 200 L 120 200" stroke={BLUE} />
        <M x="50" y="205" size="14" fill={BLUE}>i1</M>
        <Wire d="M 60 260 L 120 260" stroke={BLUE} />
        <M x="50" y="265" size="14" fill={BLUE}>i2</M>
        <Wire d="M 60 320 L 120 320" stroke={BLUE} />
        <M x="50" y="325" size="14" fill={BLUE}>i3</M>

        <Wire d="M 170 380 L 170 330" stroke={TEAL} marker="url(#dsdArrT)" />
        <M x="170" y="400" size="14" fill={TEAL}>s[1:0]</M>

        <Wire d="M 220 220 L 280 220" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="290" y="225" size="14" fill={BLUE}>y</M>
      </g>

      {/* Decision Tree */}
      <g className="dsdm-insert">
        {/* Root diamond */}
        <path d="M 550 50 L 600 80 L 550 110 L 500 80 Z" fill={WHITE} stroke={TEAL} strokeWidth="2" />
        <M x="550" y="85" size="14" fill={TEAL}>s[1]?</M>
        
        {/* Branch 0 */}
        <Wire d="M 500 80 L 450 110" stroke={TEAL} />
        <M x="465" y="90" size="12" fill={TEAL}>0</M>
        <path d="M 450 110 L 500 140 L 450 170 L 400 140 Z" fill={WHITE} stroke={TEAL} strokeWidth="2" />
        <M x="450" y="145" size="14" fill={TEAL}>s[0]?</M>
        <Wire d="M 400 140 L 370 180" stroke={TEAL} />
        <M x="375" y="155" size="12" fill={TEAL}>0</M>
        <M x="370" y="200" size="14" fill={BLUE}>i0</M>
        <Wire d="M 500 140 L 530 180" stroke={TEAL} />
        <M x="525" y="155" size="12" fill={TEAL}>1</M>
        <M x="530" y="200" size="14" fill={BLUE}>i1</M>
        
        {/* Branch 1 */}
        <Wire d="M 600 80 L 650 110" stroke={TEAL} />
        <M x="635" y="90" size="12" fill={TEAL}>1</M>
        <path d="M 650 110 L 700 140 L 650 170 L 600 140 Z" fill={WHITE} stroke={TEAL} strokeWidth="2" />
        <M x="650" y="145" size="14" fill={TEAL}>s[0]?</M>
        <Wire d="M 600 140 L 570 180" stroke={TEAL} />
        <M x="575" y="155" size="12" fill={TEAL}>0</M>
        <M x="570" y="200" size="14" fill={BLUE}>i2</M>
        <Wire d="M 700 140 L 730 180" stroke={TEAL} />
        <M x="725" y="155" size="12" fill={TEAL}>1</M>
        <M x="730" y="200" size="14" fill={BLUE}>i3</M>
      </g>
      
      {/* Highlight path s=10 */}
      <g className="dsdm-pulse">
        <Wire d="M 600 80 L 650 110" stroke={AMBER} width="4" />
        <Wire d="M 600 140 L 570 180" stroke={AMBER} width="4" />
        <M x="570" y="200" size="14" fill={AMBER}>i2</M>
      </g>

      <Block x="360" y="320" w="450" h="50" label="y = s[1] ? (s[0] ? i3 : i2) : (s[0] ? i1 : i0);" mono stroke={PURP} fill={WHITE} />
    </Scene>
  )
}

export function M5BusMuxCaseTableScene() {
  return (
    <Scene caption="Bus-wide 4:1 MUX with case and 8:1 MUX by indexing">
      {/* Bus inputs */}
      <g className="dsdm-insert">
        <Wire d="M 60 100 L 140 100" stroke={BLUE} width="5" marker="url(#dsdArrB)" />
        <M x="50" y="105" size="13" fill={BLUE}>a=4'hA</M>
        <Wire d="M 60 160 L 140 160" stroke={BLUE} width="5" marker="url(#dsdArrB)" />
        <M x="50" y="165" size="13" fill={BLUE}>b=4'h3</M>
        <Wire d="M 60 220 L 140 220" stroke={AMBER} width="5" marker="url(#dsdArrA)" />
        <M x="50" y="225" size="13" fill={AMBER}>c=4'h5</M>
        <Wire d="M 60 280 L 140 280" stroke={BLUE} width="5" marker="url(#dsdArrB)" />
        <M x="50" y="285" size="13" fill={BLUE}>d=4'hF</M>

        {/* Tall MUX Trapezoid */}
        <path d="M 140 60 L 220 90 L 220 290 L 140 320 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <Wire d="M 180 370 L 180 310" stroke={TEAL} width="3" marker="url(#dsdArrT)" />
        <M x="180" y="390" size="14" fill={TEAL}>sel=2'b10</M>
        
        <Wire d="M 220 190 L 300 190" stroke={AMBER} width="5" marker="url(#dsdArrA)" />
        <M x="310" y="195" size="14" fill={AMBER}>y (c)</M>
      </g>

      {/* Case table */}
      <Panel x="420" y="60" w="240" title="case (sel)" accent={PURP} mono className="dsdm-insert"
        rows={[
          ['2\'b00', 'a', BLUE],
          ['2\'b01', 'b', BLUE],
          ['2\'b10', 'c', AMBER],
          ['2\'b11', 'd', BLUE],
          ['default', '4\'hx', MUTED]
        ]} />
        
      {/* Highlight row 10 */}
      <g className="dsdm-pulse">
        <rect x="422" y="148" width="236" height="24" fill={AMBER} opacity="0.2" />
      </g>

      {/* Bottom strip: 8:1 MUX by indexing */}
      <g className="dsdm-shift" transform="translate(150, 420)">
        <L x="260" y="0" size="14" fill={N} weight="700">8-bit register d[7:0] = 1010_0110</L>
        <Block x="20" y="20" w="480" h="40" stroke={N} fill={WHITE} />
        {[1, 2, 3, 4, 5, 6, 7].map(i => (
          <Wire key={i} d={`M ${20 + i * 60} 20 L ${20 + i * 60} 60`} stroke={N} width="2" />
        ))}
        {/* Values: 1010_0110. Indices 7 to 0 */}
        {['1','0','1','0','0','1','1','0'].map((val, i) => (
          <g key={i}>
            <M x={50 + i * 60} y="45" size="16" fill={i === 2 ? AMBER : N}>{val}</M>
            <M x={50 + i * 60} y="15" size="11" fill={MUTED}>{7 - i}</M>
          </g>
        ))}
        {/* Pointer at index 5 (which is the third cell from left: i=2) */}
        <g className="dsdm-insert">
          <Wire d="M 170 85 L 170 65" stroke={TEAL} width="3" marker="url(#dsdArrT)" />
          <M x="170" y="100" size="13" fill={TEAL}>sel = 5</M>
          <M x="550" y="45" size="14" fill={AMBER}>y = d[sel] (1)</M>
        </g>
      </g>
    </Scene>
  )
}

export function M5XorGateNetlistScene() {
  return (
    <Scene caption="Structural description: a textual schematic of gates and wires">
      <M x="50" y="110" size="14" fill={BLUE}>a</M>
      <M x="50" y="210" size="14" fill={BLUE}>b</M>
      <M x="410" y="150" size="14" fill={BLUE}>y</M>

      {/* Inputs and outputs — static (not dsdm-insert): the periodic opacity
          dip of that animation was making the whole schematic hard to read */}
      <g>
        <Wire d="M 70 110 L 100 110 M 70 210 L 100 210" stroke={BLUE} width="3" />
        <Wire d="M 370 150 L 390 150" stroke={BLUE} width="3" />
      </g>

      {/* NOT gates */}
      <g>
        <path d="M 100 95 L 130 110 L 100 125 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <Dot cx="134" cy="110" r="4" fill={WHITE} stroke={BLUE} />
        <path d="M 100 195 L 130 210 L 100 225 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <Dot cx="134" cy="210" r="4" fill={WHITE} stroke={BLUE} />
      </g>

      {/* AND gates */}
      <g>
        <path d="M 200 80 L 220 80 A 20 20 0 0 1 220 120 L 200 120 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        <path d="M 200 180 L 220 180 A 20 20 0 0 1 220 220 L 200 220 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        {/* Connections to AND */}
        <Wire d="M 138 110 L 170 110 L 170 90 L 200 90" stroke={TEAL} />
        <Wire d="M 80 210 L 80 160 L 180 160 L 180 110 L 200 110" stroke={BLUE} />
        <Wire d="M 80 110 L 80 140 L 190 140 L 190 190 L 200 190" stroke={BLUE} />
        <Wire d="M 138 210 L 170 210 L 170 210 L 200 210" stroke={TEAL} />
      </g>

      {/* OR gate */}
      <g>
        <path d="M 320 120 Q 330 150 320 180 Q 350 180 370 150 Q 350 120 320 120 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" />
        {/* Connections to OR */}
        <Wire d="M 240 100 L 280 100 L 280 135 L 325 135" stroke={PURP} />
        <Wire d="M 240 200 L 280 200 L 280 165 L 325 165" stroke={PURP} />
      </g>

      {/* Code labels — one row per gate. The g1 and n1 leaders bend up over
          y=50, clear above every gate body (gates sit in y 80-220), instead
          of cutting through g3's OR body and the w1 wire on their way to the
          label column. */}
      <g>
        <M x="560" y="90" size="13" fill={PURP} anchor="start">and g1 (w1, an, b);</M>
        <M x="560" y="120" size="13" fill={TEAL} anchor="start">not n1 (an, a);</M>
        <M x="560" y="150" size="13" fill={AMBER} anchor="start">or g3 (y, w1, w2);</M>
        <M x="560" y="180" size="13" fill={PURP} anchor="start">and g2 (w2, a, bn);</M>
        <M x="560" y="210" size="13" fill={TEAL} anchor="start">not n2 (bn, b);</M>
        <Wire d="M 220 100 L 220 50 L 550 50 L 550 85" stroke={PURP} width="1" dash="4 4" />
        <Wire d="M 120 110 L 150 40 L 550 40 L 550 115" stroke={TEAL} width="1" dash="4 4" />
        <Wire d="M 350 150 L 400 172 L 550 145" stroke={AMBER} width="1" dash="4 4" />
        <Wire d="M 220 200 L 550 175" stroke={PURP} width="1" dash="4 4" />
        <Wire d="M 120 210 L 550 205" stroke={TEAL} width="1" dash="4 4" />
      </g>

      {/* Internal wire labels */}
      <g className="dsdm-pulse">
        <M x="155" y="100" size="12" fill={TEAL}>an</M>
        <M x="155" y="200" size="12" fill={TEAL}>bn</M>
        <M x="260" y="78" size="12" fill={PURP}>w1</M>
        <M x="260" y="190" size="12" fill={PURP}>w2</M>
      </g>
    </Scene>
  )
}

export function M5MuxHierarchyInstancesScene() {
  return (
    <Scene caption="Structural description: modules, instances and port connections">
      <Block x="100" y="140" w="500" h="300" label="mux4_struct" size="16" stroke={BLUE} fill={CREAM} labelFill={BLUE} />
      
      {/* Tree diagram */}
      <g className="dsdm-insert">
        <M x="350" y="60" size="14" fill={N}>mux4_struct</M>
        <Wire d="M 350 70 L 350 100" stroke={N} />
        <Wire d="M 250 100 L 450 100" stroke={N} />
        <Wire d="M 250 100 L 250 120 M 350 100 L 350 120 M 450 100 L 450 120" stroke={N} marker="url(#dsdArr)" />
        <M x="250" y="130" size="12" fill={BLUE}>M0 (mux2)</M>
        <M x="350" y="130" size="12" fill={BLUE}>M1 (mux2)</M>
        <M x="450" y="130" size="12" fill={BLUE}>M2 (mux2)</M>
      </g>

      {/* Inputs to top module */}
      <g className="dsdm-insert">
        <Wire d="M 50 200 L 100 200" stroke={BLUE} />
        <M x="40" y="205" size="14" fill={BLUE}>i0</M>
        <Wire d="M 50 240 L 100 240" stroke={BLUE} />
        <M x="40" y="245" size="14" fill={BLUE}>i1</M>
        <Wire d="M 50 320 L 100 320" stroke={BLUE} />
        <M x="40" y="325" size="14" fill={BLUE}>i2</M>
        <Wire d="M 50 360 L 100 360" stroke={BLUE} />
        <M x="40" y="365" size="14" fill={BLUE}>i3</M>
        
        <Wire d="M 120 480 L 120 440" stroke={TEAL} marker="url(#dsdArrT)" />
        <M x="120" y="495" size="14" fill={TEAL}>s[1:0]</M>
      </g>

      {/* M0 and M1 */}
      <g className="dsdm-insert">
        <Block x="150" y="180" w="100" h="80" label="mux2" sub="M0" stroke={BLUE} fill={WHITE} />
        <Wire d="M 100 200 L 150 200" stroke={BLUE} />
        <Wire d="M 100 240 L 150 240" stroke={BLUE} />
        <Wire d="M 120 440 L 170 440 L 170 260" stroke={TEAL} />
        <M x="180" y="255" size="11" fill={TEAL}>s[0]</M>

        <Block x="150" y="300" w="100" h="80" label="mux2" sub="M1" stroke={BLUE} fill={WHITE} />
        <Wire d="M 100 320 L 150 320" stroke={BLUE} />
        <Wire d="M 100 360 L 150 360" stroke={BLUE} />
        <Wire d="M 170 440 L 170 380" stroke={TEAL} />
        <M x="180" y="375" size="11" fill={TEAL}>s[0]</M>
      </g>

      {/* Internal wires */}
      <g className="dsdm-shift">
        <Wire d="M 250 220 L 350 220 L 350 260 L 380 260" stroke={PURP} width="3" marker="url(#dsdArrP)" />
        <M x="300" y="210" size="12" fill={PURP}>m0</M>
        
        <Wire d="M 250 340 L 350 340 L 350 300 L 380 300" stroke={PURP} width="3" marker="url(#dsdArrP)" />
        <M x="300" y="355" size="12" fill={PURP}>m1</M>
        
        <L x="300" y="165" size="13" fill={PURP}>declared: wire m0, m1;</L>
      </g>

      {/* M2 and output */}
      <g className="dsdm-insert">
        <Block x="380" y="240" w="100" h="80" label="mux2" sub="M2" stroke={BLUE} fill={WHITE} />
        <Wire d="M 120 460 L 400 460 L 400 320" stroke={TEAL} />
        <M x="410" y="315" size="11" fill={TEAL}>s[1]</M>
        
        <Wire d="M 480 280 L 630 280" stroke={BLUE} width="3" marker="url(#dsdArrB)" />
        <M x="640" y="285" size="14" fill={BLUE}>y</M>
      </g>
    </Scene>
  )
}

export function M5FullAdderFromHalfAddersScene() {
  const table = [
    ['0','0','0','0','0'],
    ['0','0','1','0','1'],
    ['0','1','0','0','1'],
    ['0','1','1','1','0'],
    ['1','0','0','0','1'],
    ['1','0','1','1','0'],
    ['1','1','0','1','0'],
    ['1','1','1','1','1']
  ]
  return (
    <Scene caption="Structural full adder built from two half adders">
      {/* HA1 */}
      <g className="dsdm-insert">
        <Block x="140" y="100" w="120" h="100" label="HA1" sub="XOR, AND" stroke={BLUE} fill={WHITE} />
        <Wire d="M 100 130 L 140 130" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="90" y="135" size="14" fill={BLUE}>A</M>
        <Wire d="M 100 170 L 140 170" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="90" y="175" size="14" fill={BLUE}>B</M>
      </g>

      {/* Internal wires from HA1 */}
      <g className="dsdm-shift">
        <Wire d="M 260 150 L 320 150" stroke={PURP} marker="url(#dsdArrP)" />
        <M x="290" y="140" size="12" fill={PURP}>s1</M>
        
        <Wire d="M 200 200 L 200 300 L 320 300" stroke={TEAL} marker="url(#dsdArrT)" />
        <M x="215" y="285" size="12" fill={TEAL}>c1</M>
      </g>

      {/* HA2 */}
      <g className="dsdm-insert">
        <Block x="320" y="120" w="120" h="100" label="HA2" sub="XOR, AND" stroke={BLUE} fill={WHITE} />
        <Wire d="M 280 190 L 320 190" stroke={BLUE} marker="url(#dsdArrB)" />
        <M x="270" y="195" size="14" fill={BLUE}>CI</M>
        
        <Wire d="M 440 170 L 500 170" stroke={BLUE} width="3" marker="url(#dsdArrB)" />
        <M x="510" y="175" size="14" fill={BLUE}>S</M>
        
        <Wire d="M 380 220 L 380 280" stroke={TEAL} marker="url(#dsdArrT)" />
        <M x="395" y="260" size="12" fill={TEAL}>c2</M>
      </g>

      {/* OR Gate and CO */}
      <g className="dsdm-insert">
        <path d="M 320 280 Q 330 300 320 320 Q 350 320 370 300 Q 350 280 320 280 Z" fill={WHITE} stroke={BLUE} strokeWidth="2" transform="translate(40, -10)" />
        <Wire d="M 390 290 L 500 290" stroke={BLUE} width="3" marker="url(#dsdArrB)" />
        <M x="510" y="295" size="14" fill={BLUE}>CO</M>
      </g>

      {/* Truth Table */}
      <g className="dsdm-insert" transform="translate(600, 80)">
        <L x="100" y="0" size="13" fill={MUTED}>Truth Table</L>
        <Block x="0" y="10" w="200" h="220" stroke={BLUE} fill={WHITE} />
        <M x="20" y="30" size="12" fill={N} weight="800">CI</M>
        <M x="60" y="30" size="12" fill={N} weight="800">A</M>
        <M x="100" y="30" size="12" fill={N} weight="800">B</M>
        <M x="140" y="30" size="12" fill={N} weight="800">CO</M>
        <M x="180" y="30" size="12" fill={N} weight="800">S</M>
        <Wire d="M 0 40 L 200 40" stroke={BLUE} />
        
        {table.map((row, i) => (
          <g key={i} className={`dsdm-pulse dsdm-delay-${i % 5}`}>
            <M x="20" y={60 + i * 20} size="12" fill={N}>{row[0]}</M>
            <M x="60" y={60 + i * 20} size="12" fill={N}>{row[1]}</M>
            <M x="100" y={60 + i * 20} size="12" fill={N}>{row[2]}</M>
            <M x="140" y={60 + i * 20} size="12" fill={BLUE}>{row[3]}</M>
            <M x="180" y={60 + i * 20} size="12" fill={BLUE}>{row[4]}</M>
          </g>
        ))}
      </g>
    </Scene>
  )
}

export function M5FourBitRippleChainScene() {
  return (
    <Scene caption="Structural description of a 4-bit ripple carry adder">
      {/* 4 Full Adders: FA3, FA2, FA1, FA0 (left to right visual, index 3 to 0) */}
      <g className="dsdm-insert">
        {[3, 2, 1, 0].map((idx, i) => (
          <Block key={idx} x={150 + i * 140} y="160" w="100" h="100" label={`FA${idx}`} sub="full_adder" stroke={BLUE} fill={WHITE} />
        ))}
      </g>

      {/* Carry chain (right to left) */}
      <g className="dsdm-traverse">
        <Wire d="M 720 210 L 670 210" stroke={PURP} marker="url(#dsdArrP)" />
        <M x="695" y="200" size="12" fill={PURP}>ci=0</M>
        
        <Wire d="M 570 210 L 530 210" stroke={PURP} marker="url(#dsdArrP)" />
        <M x="550" y="200" size="12" fill={PURP}>c1</M>
        
        <Wire d="M 430 210 L 390 210" stroke={PURP} marker="url(#dsdArrP)" />
        <M x="410" y="200" size="12" fill={PURP}>c2</M>
        
        <Wire d="M 290 210 L 250 210" stroke={PURP} marker="url(#dsdArrP)" />
        <M x="270" y="200" size="12" fill={PURP}>c3</M>
        
        <Wire d="M 150 210 L 80 210" stroke={PURP} width="3" marker="url(#dsdArrP)" />
        <L x="100" y="195" size="12" fill={PURP} anchor="end">carry out / overflow</L>
        <M x="100" y="225" size="13" fill={PURP} anchor="end">co</M>
      </g>

      {/* Operands A=1011 B=0110 */}
      <g className="dsdm-insert">
        {[{a:1,b:0}, {a:0,b:1}, {a:1,b:1}, {a:1,b:0}].map((op, i) => {
          const x = 150 + i * 140;
          return (
            <g key={i}>
              <Wire d={`M ${x + 30} 120 L ${x + 30} 160`} stroke={BLUE} marker="url(#dsdArrB)" />
              <M x={x + 30} y="110" size="12" fill={BLUE}>a[{3-i}]={op.a}</M>
              <Wire d={`M ${x + 70} 120 L ${x + 70} 160`} stroke={BLUE} marker="url(#dsdArrB)" />
              <M x={x + 70} y="110" size="12" fill={BLUE}>b[{3-i}]={op.b}</M>
            </g>
          )
        })}
      </g>

      {/* Sums and Carry values */}
      {/* 
        A = 1011
        B = 0110
        ci= 0000
        -------
        S = 0001 (with carries)
        c0=0. a0=1, b0=0 -> s0=1, c1=0
        c1=0. a1=1, b1=1 -> s1=0, c2=1
        c2=1. a2=0, b2=1 -> s2=0, c3=1
        c3=1. a3=1, b3=0 -> s3=0, co=1
        Result: co=1, S=0001
      */}
      <g className="dsdm-descend">
        {[{s:0,c:1}, {s:0,c:1}, {s:0,c:1}, {s:1,c:0}].map((res, i) => {
          const x = 150 + i * 140;
          return (
            <g key={i}>
              <Wire d={`M ${x + 50} 260 L ${x + 50} 300`} stroke={GREEN} width="3" marker="url(#dsdArrG)" />
              <M x={x + 50} y="315" size="13" fill={GREEN}>s[{3-i}]={res.s}</M>
            </g>
          )
        })}
        {/* Carries updated during evaluate */}
        <M x="550" y="225" size="12" fill={PURP}>0</M>
        <M x="410" y="225" size="12" fill={PURP}>1</M>
        <M x="270" y="225" size="12" fill={PURP}>1</M>
        <M x="100" y="240" size="14" fill={GREEN} anchor="end">= 1</M>
      </g>

      {/* Timing Ruler */}
      <Axes x="150" y="360" w="600" h="0" origin="left" />
      <L x="130" y="364" size="12" fill={MUTED}>Time</L>
      <M x="600" y="380" size="11" fill={MUTED}>3tp (FA0)</M>
      <M x="460" y="380" size="11" fill={MUTED}>+2tp</M>
      <M x="320" y="380" size="11" fill={MUTED}>+2tp</M>
      <M x="180" y="380" size="11" fill={MUTED}>+2tp</M>
      <Wire d="M 600 355 L 600 365 M 460 355 L 460 365 M 320 355 L 320 365 M 180 355 L 180 365" stroke={MUTED} />
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
  // The caption sits at y=504; the RESULT card's bottom edge is pinned 30px
  // above it so a tall step list can never push the card through the text.
  const captionClear = 474
  const resultLines = Math.min(2, Math.max(1, Math.ceil(String(dryRun?.result || '').length / 100)))
  const resultH = 64 + (resultLines - 1) * 28
  const top = captionClear - resultH
  const pitch = Math.min(58, (top - 6 - (136 + shift)) / Math.max(1, steps.length))
  const stepH = Math.min(50, pitch - 6)
  return (
    <Scene caption={`Worked trace — ${topic || 'this unit'}`}>
      <rect x="56" y="54" width="788" height={62 + shift} rx="12" fill={SKY} stroke={BLUE} strokeWidth="2.4" />
      <L x="92" y="80" size={12.5} fill={BLUE} anchor="start">
        GIVEN
      </L>
      <foreignObject x="92" y="82" width="716" height={30 + shift}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#152430' }}>
          {dryRun?.input ? texGlyph(dryRun.input) : '—'}
        </div>
      </foreignObject>
      {steps.map((st, i) => (
        <g key={String(st)} className={`dsdm-slide-in dsdm-delay-${i}`}>
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
              {texGlyph(st)}
            </div>
          </foreignObject>
        </g>
      ))}
      <g className="dsdm-emerge">
        <rect x="56" y={top} width="788" height={resultH} rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <L x="92" y={top + 24} size={12.5} fill={GREEN} anchor="start">
          RESULT
        </L>
        <foreignObject x="92" y={top + 26} width="716" height={resultH - 30}>
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '750 13px/1.2 system-ui,sans-serif', color: '#15803d' }}>
            {dryRun?.result ? texGlyph(dryRun.result) : '—'}
          </div>
        </foreignObject>
      </g>
    </Scene>
  )
}

const VISUAL_MAP = {
  // Module 1 — Principles of Combinational Logic
  'combinational-block-diagram': M1CombBlockScene,
  'combinational-analysis-flow': M1AnalysisFlowScene,
  'forms-comparison-scale': M1FormsCompareScene,
  'minterm-generation-table': M1MintermTableScene,
  'maxterm-generation-table': M1MaxtermTableScene,
  'combinational-design-flow': M1DesignFlowScene,
  'kmap-3var-layout': M1Kmap3Scene,
  'kmap-4var-wraparound': M1Kmap4WrapScene,
  'kmap-pos-grouping': M1KmapPosScene,
  'kmap-dontcare-grouping': M1KmapDontCareScene,
  'kmap-vs-tabular-scale': M1KmapVsTabularScene,
  'qm-tabulation-step1': M1QmStep1Scene,
  'qm-implicant-chart': M1QmChartScene,
  'qm-cyclic-chart-dominance': M1QmCyclicScene,
  'minimization-comparison-scale': M1MethodsScaleScene,
  'qm-dontcare-process': M1QmDontCareScene,
  // Module 2 — Logic Design with MSI Components and Programmable Logic Devices
  'half-to-full-adder-build': M2HalfToFullAdderBuildScene,
  'ripple-carry-chain-4bit': M2RippleCarryChain4BitScene,
  'pg-lookahead-block': M2PgLookaheadBlockScene,
  'xor-mode-adder-subtractor': M2XorModeAdderSubtractorScene,
  'bcd-correction-number-line': M2BcdCorrectionNumberLineScene,
  'bcd-adder-two-stage': M2BcdAdderTwoStageScene,
  'msb-first-comparator-ladder': M2MsbFirstComparatorLadderScene,
  'decoder-expansion-4to16': M2DecoderExpansion4To16Scene,
  'decoder-full-adder-wiring': M2DecoderFullAdderWiringScene,
  'priority-encoder-mask': M2PriorityEncoderMaskScene,
  'mux-and-or-selector': M2MuxAndOrSelectorScene,
  'mux-implementation-table': M2MuxImplementationTableScene,
  'mux-tree-16to1': M2MuxTree16to1Scene,
  'prom-fuse-map-4x8': M2PromFuseMap4x8Scene,
  'pla-shared-products': M2PlaSharedProductsScene,
  'pld-array-comparison': M2PldArrayComparisonScene,
  // Module 4 — Flip-Flops and its Applications
  'cross-coupled-nor-latch': M4CrossCoupledNorLatchScene,
  'timing-waveform-diagram': M4TimingWaveformDiagramScene,
  'clocked-sr-logic': M4ClockedSrLogicScene,
  'jk-feedback-logic': M4JkFeedbackLogicScene,
  'master-slave-block-diagram': M4MasterSlaveBlockDiagramScene,
  'characteristic-equations-table': M4CharacteristicEquationsTableScene,
  '4-bit-parallel-register': M4FourBitParallelRegisterScene,
  '4-bit-shift-register': M4FourBitShiftRegisterScene,
  '3-bit-ripple-counter': M4ThreeBitRippleCounterScene,
  '4-bit-sync-counter': M4FourBitSyncCounterScene,
  '4-bit-ring-counter': M4FourBitRingCounterScene,
  '4-bit-johnson-counter': M4FourBitJohnsonCounterScene,
  'counter-design-flow': M4CounterDesignFlowScene,
  'sr-excitation-kmap': M4SrExcitationKmapScene,
  'jk-excitation-kmap': M4JkExcitationKmapScene,
  'd-t-excitation-comparison': M4DtExcitationComparisonScene,
  // Module 3 — Introduction to Verilog
  'hdl-design-flow-pipeline': M3HdlFlowScene,
  'module-skeleton-anatomy': M3ModuleSkeletonScene,
  'abstraction-level-pyramid': M3AbstractionPyramidScene,
  'port-direction-block-diagram': M3PortDirectionScene,
  'vector-bit-layout': M3VectorBitsScene,
  'logical-relational-operator-table': M3LogicRelTableScene,
  'bitwise-operation-trace': M3BitwiseTraceScene,
  'special-operators-triptych': M3SpecialOpsScene,
  'four-value-truth-table': M3FourValueScene,
  'number-format-breakdown': M3NumberFormatScene,
  'wire-vs-conductor-analogy': M3WireAnalogyScene,
  'reg-assignment-context': M3RegContextScene,
  'variable-types-comparison-table': M3VarTypesScene,
  'dataflow-vs-gate-level-comparison': M3DataflowVsGateScene,
  'internal-wire-full-adder-schematic': M3FullAdderWiresScene,
  'assign-timing-waveform': M3AssignDelayScene,
  'dataflow-module-template-4-sections': M3DataflowTemplateScene,
  // Module 5 — Verilog Behavioral Description
  'abstraction-level-ladder': M5AbstractionLevelLadderScene,
  'module-body-block-map': M5ModuleBodyBlockMapScene,
  'sensitivity-trigger-timeline': M5SensitivityTriggerTimelineScene,
  'assignment-target-sorter': M5AssignmentTargetSorterScene,
  'blocking-vs-nonblocking-hardware': M5BlockingVsNonblockingHardwareScene,
  'if-chain-mux-cascade': M5IfChainMuxCascadeScene,
  'case-decoder-dispatch': M5CaseDecoderDispatchScene,
  'missing-else-latch': M5MissingElseLatchScene,
  'for-loop-unroll-chain': M5ForLoopUnrollChainScene,
  'loop-family-comparison-strip': M5LoopFamilyComparisonStripScene,
  'nested-select-tree': M5NestedSelectTreeScene,
  'bus-mux-case-table': M5BusMuxCaseTableScene,
  'xor-gate-netlist': M5XorGateNetlistScene,
  'mux-hierarchy-instances': M5MuxHierarchyInstancesScene,
  'full-adder-from-half-adders': M5FullAdderFromHalfAddersScene,
  'four-bit-ripple-chain': M5FourBitRippleChainScene,
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


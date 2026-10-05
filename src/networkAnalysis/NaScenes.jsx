/**
 * NaScenes — VTU BEC303 Network Analysis classroom SVG visuals.
 *
 * Every scene animates a mechanism the syllabus asks students to reproduce:
 * current marching round a loop, a phasor turning, a capacitor voltage that
 * refuses to jump, a pole sliding toward the jω axis. Motion carries meaning —
 * nothing here moves purely for decoration.
 *
 * Phase 1 wrote one `visualSpec` paragraph per unit; VISUAL_MAP below binds
 * each of the 80 `visual` ids to the scene that realises it.
 */

const N = '#0e1c2e'
const BLUE = '#1d4ed8'
const AMBER = '#c2410c'
const PURP = '#7c3aed'
const TEAL = '#0f766e'
const GREEN = '#15803d'
const RED = '#b91c1c'
const MUTED = '#4f6076'
const CREAM = '#fffbf2'
const SKY = '#e8f0ff'
const WHITE = '#ffffff'

export const PALETTE = { N, BLUE, AMBER, PURP, TEAL, GREEN, RED, MUTED, CREAM, SKY }

/* ── Shell ──────────────────────────────────────────────────────── */

export function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`na-scene ${className}`} aria-label={caption || 'Network Analysis diagram'}>
      <svg viewBox={vb} role="img" className="na-svg">
        <defs>
          <marker id="naArr" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={N} />
          </marker>
          <marker id="naArrB" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={BLUE} />
          </marker>
          <marker id="naArrA" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={AMBER} />
          </marker>
          <marker id="naArrT" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={TEAL} />
          </marker>
          <marker id="naArrR" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={RED} />
          </marker>
          <marker id="naArrG" markerWidth="10" markerHeight="10" refX="8" refY="4" orient="auto">
            <path d="M0 0 L9 4 L0 8 Z" fill={GREEN} />
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
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      fill={fill}
      fontFamily="system-ui,sans-serif"
      className={className}
    >
      {children}
    </text>
  )
}

/* A CSS `transform` animation replaces the SVG `transform` attribute on the
   same element, so anything positioned with translate() keeps the animation
   on an inner group. Applies to every symbol helper below. */
function Box({ x, y, w, h, label, sub, fill = WHITE, stroke = BLUE, className = '', labelFill = N }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <g className={className}>
        <rect width={w} height={h} rx="10" fill={fill} stroke={stroke} strokeWidth="2.5" />
        {label ? (
          <L x={w / 2} y={h / 2 + (sub ? -2 : 6)} size={sub ? 14 : 15} fill={labelFill}>
            {label}
          </L>
        ) : null}
        {sub ? (
          <L x={w / 2} y={h / 2 + 18} size={11.5} fill={MUTED} weight={700}>
            {sub}
          </L>
        ) : null}
      </g>
    </g>
  )
}

function Wire({ d, stroke = N, width = 2.6, className = '', marker, dash }) {
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
    />
  )
}

function Dot({ cx, cy, r = 5, fill = N, className = '' }) {
  return <circle cx={cx} cy={cy} r={r} fill={fill} className={className} />
}

/* JSX attributes arrive as strings when written `cy="200"`, and `"200" + 11`
   is "20011", not 211 — which silently threw geometry off the canvas. Every
   helper that does arithmetic on a coordinate coerces first. */
const n = (v) => Number(v)

/* ── Circuit element symbols ────────────────────────────────────── */

function Res({ x, y, label, stroke = N, className = '', sub }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <g className={className}>
      <path
        d="M0 0 L10 0 l5 -9 l10 18 l10 -18 l10 18 l5 -9 L60 0"
        fill="none"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      {label ? <L x={30} y={-16} size={14} fill={stroke}>{label}</L> : null}
      {sub ? <L x={30} y={28} size={12} fill={MUTED} weight={700}>{sub}</L> : null}
      </g>
    </g>
  )
}

function Cap({ x, y, label, stroke = TEAL, className = '' }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <g className={className}>
        <path d="M0 0 L24 0 M24 -14 L24 14 M36 -14 L36 14 M36 0 L60 0" fill="none" stroke={stroke} strokeWidth="2.6" />
        {label ? <L x={30} y={-22} size={14} fill={stroke}>{label}</L> : null}
      </g>
    </g>
  )
}

function Ind({ x, y, label, stroke = PURP, className = '' }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <g className={className}>
        <path
          d="M0 0 L12 0 a6 6 0 0 1 12 0 a6 6 0 0 1 12 0 a6 6 0 0 1 12 0 L60 0"
          fill="none"
          stroke={stroke}
          strokeWidth="2.6"
        />
        {label ? <L x={30} y={-18} size={14} fill={stroke}>{label}</L> : null}
      </g>
    </g>
  )
}

function SrcV({ cx, cy, r = 20, label, stroke = BLUE, className = '' }) {
  const [x, y, rr] = [n(cx), n(cy), n(r)]
  return (
    <g className={className}>
      <circle cx={x} cy={y} r={rr} fill={WHITE} stroke={stroke} strokeWidth="2.6" />
      <L x={x} y={y - 4} size={14} fill={stroke}>+</L>
      <L x={x} y={y + 13} size={14} fill={stroke}>−</L>
      {label ? <L x={x} y={y + rr + 20} size={13} fill={stroke}>{label}</L> : null}
    </g>
  )
}

function SrcI({ cx, cy, r = 20, label, stroke = AMBER, className = '' }) {
  const [x, y, rr] = [n(cx), n(cy), n(r)]
  return (
    <g className={className}>
      <circle cx={x} cy={y} r={rr} fill={WHITE} stroke={stroke} strokeWidth="2.6" />
      <path d={`M${x} ${y + 11} L${x} ${y - 11}`} stroke={stroke} strokeWidth="2.6" markerEnd="url(#naArrA)" />
      {label ? <L x={x} y={y + rr + 20} size={13} fill={stroke}>{label}</L> : null}
    </g>
  )
}

function DepSrc({ cx, cy, r = 20, label, stroke = PURP, className = '', inner = 'μv' }) {
  const [x, y, rr] = [n(cx), n(cy), n(r)]
  return (
    <g className={className}>
      <path
        d={`M${x} ${y - rr} L${x + rr} ${y} L${x} ${y + rr} L${x - rr} ${y} Z`}
        fill={WHITE}
        stroke={stroke}
        strokeWidth="2.6"
      />
      <L x={x} y={y + 5} size={12} fill={stroke}>{inner}</L>
      {label ? <L x={x} y={y + rr + 20} size={13} fill={stroke}>{label}</L> : null}
    </g>
  )
}

function Ground({ x: gx, y: gy, stroke = N }) {
  const [x, y] = [n(gx), n(gy)]
  return (
    <g>
      <path d={`M${x} ${y} L${x} ${y + 12}`} stroke={stroke} strokeWidth="2.6" />
      <path d={`M${x - 14} ${y + 12} L${x + 14} ${y + 12}`} stroke={stroke} strokeWidth="2.8" />
      <path d={`M${x - 9} ${y + 18} L${x + 9} ${y + 18}`} stroke={stroke} strokeWidth="2.4" />
      <path d={`M${x - 4} ${y + 24} L${x + 4} ${y + 24}`} stroke={stroke} strokeWidth="2" />
    </g>
  )
}

function Axes({ x: ax, y: ay, w: aw, h: ah, xLabel, yLabel }) {
  const [x, y, w, h] = [n(ax), n(ay), n(aw), n(ah)]
  return (
    <g>
      <path d={`M${x} ${y - h} L${x} ${y} L${x + w} ${y}`} fill="none" stroke={MUTED} strokeWidth="2.2" markerEnd="url(#naArr)" />
      {xLabel ? <L x={x + w - 6} y={y + 22} size={13} fill={MUTED} weight={700}>{xLabel}</L> : null}
      {yLabel ? <L x={x - 8} y={y - h - 8} size={13} fill={MUTED} weight={700} anchor="end">{yLabel}</L> : null}
    </g>
  )
}

/* ── Path generators ────────────────────────────────────────────── */

function sinePath(x0, y0, w, amp, cycles = 2, phase = 0, steps = 90) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const x = x0 + t * w
    const y = y0 - amp * Math.sin(2 * Math.PI * cycles * t + phase)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

function expPath(x0, y0, w, amp, rising = false, k = 3.2, steps = 60) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const f = rising ? 1 - Math.exp(-k * t) : Math.exp(-k * t)
    const x = x0 + t * w
    const y = y0 - amp * f
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

function dampedPath(x0, y0, w, amp, alpha, omega, steps = 120) {
  const pts = []
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps
    const y = y0 - amp * Math.exp(-alpha * t) * Math.cos(omega * t)
    pts.push(`${i === 0 ? 'M' : 'L'}${(x0 + t * w).toFixed(1)} ${y.toFixed(1)}`)
  }
  return pts.join(' ')
}

/* ── Module openers / closers ───────────────────────────────────── */

export function ModuleHero({ module = 1, title, question, hours }) {
  const beats = ['Model', 'Law', 'Method', 'Solve', 'Check']
  return (
    <Scene caption={question || 'One network, one systematic method'}>
      <rect x="40" y="36" width="820" height="410" rx="16" fill={WHITE} stroke={BLUE} strokeWidth="3" />
      <L x="450" y="104" size={18} fill={BLUE}>{`MODULE ${module} · VTU BEC303`}</L>
      <L x="450" y="162" size={25}>{title || `Module ${module}`}</L>
      <L x="450" y="208" size={14.5} fill={MUTED} weight={700}>
        {question || 'Watch the network solve itself'}
      </L>
      {beats.map((t, i) => (
        <Box key={t} x={70 + i * 154} y={264} w={134} h={68} label={t} className={`nam-flux nam-delay-${i}`} />
      ))}
      <Wire d="M204 298 L224 298" stroke={BLUE} className="nam-current" marker="url(#naArrB)" />
      <Wire d="M358 298 L378 298" stroke={BLUE} className="nam-current nam-delay-1" marker="url(#naArrB)" />
      <Wire d="M512 298 L532 298" stroke={BLUE} className="nam-current nam-delay-2" marker="url(#naArrB)" />
      <Wire d="M666 298 L686 298" stroke={BLUE} className="nam-current nam-delay-3" marker="url(#naArrB)" />
      {hours ? <L x="450" y="396" size={14} fill={MUTED} weight={700}>{`${hours} teaching hours`}</L> : null}
    </Scene>
  )
}

export function ModuleOutro({ module = 1, title }) {
  return (
    <Scene caption="Redraw the circuit from memory — then attempt the PYQs">
      <L x="450" y="86" size={19} fill={BLUE}>{`MODULE ${module} COMPLETE`}</L>
      <L x="450" y="140" size={24}>{title || 'Module complete'}</L>
      {['Draw it', 'Mark directions', 'Count equations', 'Solve', 'Sanity-check'].map((t, i) => (
        <g key={t} className={`nam-cell-in nam-delay-${i}`}>
          <Box x={64} y={190 + i * 52} w={772} h={44} label={t} stroke={i % 2 ? TEAL : BLUE} />
        </g>
      ))}
    </Scene>
  )
}

export function ConceptBoard({ title = 'Concept', points = [] }) {
  const rows = points.slice(0, 6)
  return (
    <Scene caption="Key terms for this unit">
      <Box x="60" y="52" w="780" h="58" label={title} stroke={BLUE} />
      {rows.map((p, i) => (
        <g key={String(p)} className={`nam-cell-in nam-delay-${i % 5}`}>
          <rect x="60" y={134 + i * 58} width="780" height="46" rx="9" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="92" cy={157 + i * 58} r="8" fill={i % 2 ? AMBER : BLUE} />
          <L x="118" y={163 + i * 58} size={16} anchor="start">{String(p)}</L>
        </g>
      ))}
    </Scene>
  )
}

/* ── Module 1 — models, laws, systematic methods ────────────────── */

export function ModelMapScene() {
  return (
    <Scene caption="The schematic is a claim about the hardware, not the hardware">
      <rect x="44" y="60" width="360" height="330" rx="14" fill={SKY} stroke={MUTED} strokeWidth="2" />
      <L x="224" y="92" size={16} fill={MUTED}>Physical hardware</L>
      <rect x="96" y="124" width="150" height="46" rx="20" fill="#d9c3a5" stroke={N} strokeWidth="2" className="nam-flux" />
      <L x="171" y="153" size={13}>resistor body</L>
      <path d="M96 216 q75 -26 150 0" fill="none" stroke="#b08968" strokeWidth="6" strokeLinecap="round" />
      <L x="171" y="248" size={13} fill={MUTED} weight={700}>copper wire</L>
      <rect x="96" y="286" width="150" height="58" rx="10" fill="#cbd5e1" stroke={N} strokeWidth="2" className="nam-flux nam-delay-2" />
      <L x="171" y="320" size={13}>battery cell</L>
      <L x="300" y="150" size={12} fill={MUTED} weight={700}>lead L</L>
      <L x="300" y="222" size={12} fill={MUTED} weight={700}>stray C</L>
      <L x="300" y="320" size={12} fill={MUTED} weight={700}>thermal drift</L>

      <Wire d="M414 226 L486 226" stroke={AMBER} width="3.4" className="nam-current" marker="url(#naArrA)" />
      <L x="450" y="196" size={12.5} fill={AMBER} weight={800}>modelling</L>
      <L x="450" y="260" size={11.5} fill={MUTED} weight={700}>part ≪ λ</L>

      <rect x="496" y="60" width="360" height="330" rx="14" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
      <L x="676" y="92" size={16} fill={BLUE}>Lumped model</L>
      <Res x="588" y="148" label="R" />
      <Wire d="M556 216 L796 216" stroke={N} />
      <L x="676" y="248" size={13} fill={MUTED} weight={700}>ideal conductor — no drop</L>
      <SrcV cx="676" cy="318" label="V" />
      <L x="676" y="418" size={13} fill={MUTED} weight={700}>finite equations · unique solution</L>
    </Scene>
  )
}

export function SourceTaxonomyScene() {
  const dep = [
    ['VCVS', 'μ · v_x'],
    ['VCCS', 'g · v_x'],
    ['CCVS', 'r · i_x'],
    ['CCCS', 'β · i_x'],
  ]
  return (
    <Scene caption="Circles are independent, diamonds are dependent — find the controlling variable first">
      <L x="140" y="58" size={15} fill={MUTED}>INDEPENDENT</L>
      <rect x="60" y="72" width="360" height="150" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
      <SrcV cx="150" cy="140" r="30" className="nam-flux" />
      <L x="150" y="206" size={13} fill={MUTED} weight={700}>V fixed, I free</L>
      <SrcI cx="330" cy="140" r="30" className="nam-flux nam-delay-2" />
      <L x="330" y="206" size={13} fill={MUTED} weight={700}>I fixed, V free</L>

      <Wire d="M450 74 L450 430" stroke={MUTED} dash="8 7" />
      <L x="686" y="58" size={15} fill={MUTED}>DEPENDENT</L>
      <rect x="478" y="72" width="382" height="150" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.2" />
      {dep.map(([name, gain], i) => (
        <g key={name} className={`nam-emerge nam-delay-${i}`}>
          <DepSrc cx={545 + (i % 2) * 190} cy={112 + Math.floor(i / 2) * 78} r="26" inner={gain} />
          <L x={545 + (i % 2) * 190} y={112 + Math.floor(i / 2) * 78 + 46} size={12.5} fill={PURP}>{name}</L>
        </g>
      ))}
      <rect x="60" y="256" width="800" height="164" rx="12" fill={SKY} stroke={BLUE} strokeWidth="1.8" />
      <L x="460" y="288" size={15} fill={BLUE}>Why dependent sources matter</L>
      <L x="460" y="324" size={14} fill={N} weight={700}>Passive elements can only divide.</L>
      <L x="460" y="354" size={14} fill={N} weight={700}>A dependent source is how gain enters a linear network.</L>
      <L x="460" y="390" size={13.5} fill={MUTED} weight={700}>Transistor and op-amp models are built from them.</L>
    </Scene>
  )
}

/**
 * visualSpec: five branches at one node (three in, two out) with the equation
 * beneath, then a dashed boundary drawn round a two-node cluster where only
 * the crossing branches count and the interior branch greys out.
 */
export function KclScene() {
  const inArrows = [
    { d: 'M60 96 L188 214', label: 'i₁ = 4 A', lx: 92, ly: 88 },
    { d: 'M40 210 L182 228', label: 'i₂ = 3 A', lx: 72, ly: 196 },
    { d: 'M60 330 L188 244', label: 'i₃ = 2 A', lx: 92, ly: 350 },
  ]
  const outArrows = [
    { d: 'M212 214 L332 106', label: 'i₄ = 6 A', lx: 320, ly: 92 },
    { d: 'M212 244 L332 330', label: 'i₅ = 3 A', lx: 320, ly: 352 },
  ]
  return (
    <Scene caption="A lumped node stores no charge — and neither does any closed boundary you draw">
      {inArrows.map((a, i) => (
        <g key={a.label}>
          <Wire d={a.d} stroke={BLUE} width="3" className={`nam-current nam-delay-${i}`} marker="url(#naArrB)" />
          <L x={a.lx} y={a.ly} size={13} fill={BLUE}>{a.label}</L>
        </g>
      ))}
      {outArrows.map((a, i) => (
        <g key={a.label}>
          <Wire d={a.d} stroke={AMBER} width="3" className={`nam-current nam-delay-${i + 3}`} marker="url(#naArrA)" />
          <L x={a.lx} y={a.ly} size={13} fill={AMBER}>{a.label}</L>
        </g>
      ))}
      <Dot cx="200" cy="229" r="10" />
      <L x="200" y="272" size={13} fill={MUTED} weight={700}>one node</L>
      <g className="nam-cell-in nam-delay-3">
        <rect x="44" y="384" width="330" height="56" rx="11" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <L x="209" y="418" size={16} fill={GREEN}>4 + 3 + 2 = 6 + 3 ✓</L>
      </g>

      <Wire d="M414 60 L414 448" stroke={MUTED} dash="7 7" width="1.6" />

      <ellipse cx="660" cy="222" rx="176" ry="112" fill={SKY} stroke={BLUE} strokeWidth="2.6" strokeDasharray="10 8" className="nam-flux" />
      <L x="660" y="94" size={13.5} fill={BLUE}>closed boundary — two nodes inside</L>
      <Dot cx="590" cy="222" r="9" />
      <Dot cx="730" cy="222" r="9" />
      {/* Interior branch: equal and opposite across the boundary, so it cancels. */}
      <Wire d="M599 222 L721 222" stroke={MUTED} width="3" dash="6 6" />
      <L x="660" y="250" size={12} fill={MUTED} weight={700}>interior — cancels</L>
      <Wire d="M470 150 L560 200" stroke={BLUE} width="3" className="nam-current" marker="url(#naArrB)" />
      <L x="492" y="136" size={12.5} fill={BLUE}>i_a</L>
      <Wire d="M470 300 L560 244" stroke={BLUE} width="3" className="nam-current nam-delay-2" marker="url(#naArrB)" />
      <L x="492" y="322" size={12.5} fill={BLUE}>i_b</L>
      <Wire d="M760 222 L856 222" stroke={AMBER} width="3" className="nam-current nam-delay-1" marker="url(#naArrA)" />
      <L x="812" y="204" size={12.5} fill={AMBER}>i_c</L>
      <g className="nam-cell-in nam-delay-4">
        <rect x="474" y="384" width="374" height="56" rx="11" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
        <L x="661" y="418" size={16} fill={GREEN}>i_a + i_b = i_c — only crossings count</L>
      </g>
    </Scene>
  )
}

export function KvlScene() {
  const stops = [
    { x: 250, y: 130, t: '−10 V', c: BLUE },
    { x: 650, y: 130, t: '+4 V', c: AMBER },
    { x: 650, y: 330, t: '+6 V', c: AMBER },
    { x: 250, y: 330, t: '0 V', c: GREEN },
  ]
  return (
    <Scene caption="Walk the loop once, add every rise and drop, return to zero">
      <Wire d="M250 130 L650 130 L650 330 L250 330 Z" stroke={N} width="2.8" />
      <SrcV cx="250" cy="230" r="26" label="10 V" />
      <Res x="420" y="130" label="R₁ · 4 V" />
      <Res x="420" y="330" label="R₂ · 6 V" />
      <circle cx="250" cy="130" r="11" fill={AMBER} className="nam-ring" />
      {stops.map((s, i) => (
        <g key={s.t} className={`nam-charge nam-delay-${i}`}>
          <Dot cx={s.x} cy={s.y} r="7" fill={s.c} />
          <L x={s.x} y={s.y - 18} size={13} fill={s.c}>{s.t}</L>
        </g>
      ))}
      <Wire d="M300 92 A 220 130 0 0 1 600 92" stroke={PURP} width="2.4" className="nam-current" marker="url(#naArrA)" dash="10 8" />
      <L x="450" y="72" size={13.5} fill={PURP}>walk direction (sign convention fixed once)</L>
      <rect x="150" y="392" width="600" height="74" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <L x="450" y="424" size={18} fill={GREEN}>−10 + 4 + 6 = 0 ✓</L>
      <L x="450" y="452" size={13} fill={MUTED} weight={700}>A non-zero sum means a sign error, not a new physics</L>
    </Scene>
  )
}

export function NodalMatrixScene({ title = 'Nodal analysis', domain = 'G', unknown = 'v' }) {
  const cells = [
    [`${domain}₁₁`, `−${domain}₁₂`, `−${domain}₁₃`],
    [`−${domain}₂₁`, `${domain}₂₂`, `−${domain}₂₃`],
    [`−${domain}₃₁`, `−${domain}₃₂`, `${domain}₃₃`],
  ]
  return (
    <Scene caption={`${title}: one equation per non-reference node, written by inspection`}>
      <L x="220" y="62" size={16} fill={BLUE}>Circuit</L>
      <Wire d="M96 140 L344 140 M96 250 L344 250 M96 360 L344 360" stroke={MUTED} width="2" />
      {[140, 250, 360].map((y, i) => (
        <g key={y}>
          <Dot cx={160 + i * 40} cy={y} r="8" fill={BLUE} className={`nam-charge nam-delay-${i}`} />
          <L x={160 + i * 40} y={y - 16} size={13} fill={BLUE}>{`${unknown}${i + 1}`}</L>
        </g>
      ))}
      <Ground x="220" y="392" />
      <L x="220" y="440" size={13} fill={MUTED} weight={700}>reference node chosen first</L>

      <Wire d="M368 250 L432 250" stroke={AMBER} width="3.2" className="nam-current" marker="url(#naArrA)" />
      <L x="400" y="226" size={12.5} fill={AMBER} weight={800}>by inspection</L>

      <L x="676" y="62" size={16} fill={TEAL}>Matrix</L>
      {cells.map((row, r) =>
        row.map((c, k) => (
          <g key={`${r}-${k}`} className={`nam-cell-in nam-delay-${(r + k) % 5}`}>
            <rect x={472 + k * 76} y={96 + r * 74} width="68" height="60" rx="8" fill={WHITE} stroke={r === k ? TEAL : MUTED} strokeWidth={r === k ? 2.6 : 1.8} />
            <L x={472 + k * 76 + 34} y={96 + r * 74 + 36} size={14} fill={r === k ? TEAL : MUTED}>{c}</L>
          </g>
        )),
      )}
      {[0, 1, 2].map((r) => (
        <g key={`u${r}`}>
          <rect x="712" y={96 + r * 74} width="52" height="60" rx="8" fill={SKY} stroke={BLUE} strokeWidth="2" />
          <L x="738" y={96 + r * 74 + 36} size={14} fill={BLUE}>{`${unknown}${r + 1}`}</L>
          <L x="782" y={96 + r * 74 + 36} size={16} fill={MUTED}>=</L>
          <rect x="798" y={96 + r * 74} width="52" height="60" rx="8" fill={WHITE} stroke={AMBER} strokeWidth="2" />
          <L x="824" y={96 + r * 74 + 36} size={14} fill={AMBER}>{`i${r + 1}`}</L>
        </g>
      ))}
      <L x="676" y="392" size={14} fill={N} weight={800}>Diagonal = sum at the node. Off-diagonal = shared, negative.</L>
      <L x="676" y="424" size={13} fill={MUTED} weight={700}>3 non-reference nodes → exactly 3 equations</L>
    </Scene>
  )
}

export function SupernodeScene() {
  return (
    <Scene caption="A floating source blocks the standard step — enclose it and the count is preserved">
      <Wire d="M150 170 L750 170 M150 170 L150 360 M750 170 L750 360" stroke={N} width="2.6" />
      <Wire d="M150 360 L750 360" stroke={N} width="2.6" />
      <Dot cx="330" cy="170" r="9" fill={BLUE} />
      <L x="330" y="146" size={14} fill={BLUE}>v₁</L>
      <Dot cx="570" cy="170" r="9" fill={BLUE} />
      <L x="570" y="146" size={14} fill={BLUE}>v₂</L>
      <SrcV cx="450" cy="170" r="24" label="v₁ − v₂ = 12 V" />
      <ellipse cx="450" cy="170" rx="176" ry="72" fill="none" stroke={AMBER} strokeWidth="3" strokeDasharray="10 8" className="nam-flux" />
      <L x="450" y="82" size={15} fill={AMBER}>SUPERNODE boundary</L>
      <Res x="180" y="264" label="R₁" />
      <Res x="420" y="264" label="R₂" />
      <Res x="660" y="264" label="R₃" />
      <Ground x="450" y="366" />
      <rect x="120" y="416" width="320" height="64" rx="11" fill={WHITE} stroke={GREEN} strokeWidth="2.2" className="nam-cell-in" />
      <L x="280" y="442" size={14} fill={GREEN}>1 KCL on the bubble</L>
      <L x="280" y="466" size={12.5} fill={MUTED} weight={700}>currents leaving the whole enclosure</L>
      <rect x="460" y="416" width="320" height="64" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.2" className="nam-cell-in nam-delay-2" />
      <L x="620" y="442" size={14} fill={BLUE}>+ 1 constraint v₁ − v₂ = 12</L>
      <L x="620" y="466" size={12.5} fill={MUTED} weight={700}>two unknowns, still two equations</L>
    </Scene>
  )
}

export function MeshScene() {
  return (
    <Scene caption="Mesh currents are variables, not measurements — the shared branch carries the difference">
      <Wire d="M140 120 L760 120 L760 380 L140 380 Z" stroke={N} width="2.6" />
      <Wire d="M450 120 L450 380" stroke={N} width="2.6" />
      <circle cx="295" cy="250" r="66" fill="none" stroke={BLUE} strokeWidth="3" strokeDasharray="12 9" className="nam-current-slow" />
      <L x="295" y="256" size={18} fill={BLUE}>i₁ ↻</L>
      <circle cx="605" cy="250" r="66" fill="none" stroke={AMBER} strokeWidth="3" strokeDasharray="12 9" className="nam-current-slow nam-delay-2" />
      <L x="605" y="256" size={18} fill={AMBER}>i₂ ↻</L>
      <Res x="420" y="250" label="R_shared" stroke={PURP} />
      <SrcV cx="140" cy="250" r="22" label="V_s" />
      <Res x="230" y="120" label="R₁" />
      <Res x="540" y="120" label="R₂" />
      <rect x="150" y="416" width="600" height="68" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.6" className="nam-cell-in" />
      <L x="450" y="446" size="18" fill={PURP}>current through R_shared = i₁ − i₂</L>
      <L x="450" y="472" size={13} fill={MUTED} weight={700}>Planar circuit, 2 meshes → exactly 2 equations</L>
    </Scene>
  )
}

export function SupermeshScene() {
  return (
    <Scene caption="A current source on a shared branch removes an equation — merge the meshes to replace it">
      <Wire d="M140 120 L760 120 L760 380 L140 380 Z" stroke={N} width="2.6" />
      <Wire d="M450 120 L450 200 M450 300 L450 380" stroke={N} width="2.6" />
      <SrcI cx="450" cy="250" r="26" label="i₂ − i₁ = 5 A" />
      <g className="nam-merge-l">
        <circle cx="295" cy="250" r="58" fill="none" stroke={BLUE} strokeWidth="2.6" strokeDasharray="10 8" />
        <L x="295" y="256" size={16} fill={BLUE}>i₁</L>
      </g>
      <g className="nam-merge-r">
        <circle cx="605" cy="250" r="58" fill="none" stroke={AMBER} strokeWidth="2.6" strokeDasharray="10 8" />
        <L x="605" y="256" size={16} fill={AMBER}>i₂</L>
      </g>
      <ellipse cx="450" cy="250" rx="272" ry="112" fill="none" stroke={GREEN} strokeWidth="3.2" strokeDasharray="12 9" className="nam-flux nam-delay-2" />
      <L x="450" y="118" size={15} fill={GREEN}>SUPERMESH — walk around the source</L>
      <rect x="120" y="418" width="320" height="62" rx="11" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
      <L x="280" y="444" size={14} fill={GREEN}>1 KVL round the merged loop</L>
      <L x="280" y="468" size={12.5} fill={MUTED} weight={700}>the source voltage is never needed</L>
      <rect x="460" y="418" width="320" height="62" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.2" />
      <L x="620" y="444" size={14} fill={BLUE}>+ 1 constraint i₂ − i₁ = 5</L>
      <L x="620" y="468" size={12.5} fill={MUTED} weight={700}>equation count restored</L>
    </Scene>
  )
}

export function DependentChainScene() {
  const steps = [
    ['Write the equation set', 'treat the dependent source as if it were independent'],
    ['Find the controlling variable', 'v_x or i_x — circle it in the schematic'],
    ['Express it in chosen variables', 'v_x = v₂ − v₃, i_x = i₁ − i₂'],
    ['Substitute and eliminate', 'no extra unknown survives'],
  ]
  return (
    <Scene caption="A dependent source adds an unknown and a constraint — they cancel">
      <DepSrc cx="170" cy="120" r="42" inner="4·v_x" />
      <L x="170" y="192" size={14} fill={PURP}>dependent source</L>
      <Wire d="M226 120 L300 120" stroke={PURP} width="3" className="nam-current" marker="url(#naArrA)" />
      {steps.map(([t, s], i) => (
        <g key={t} className={`nam-slide-in nam-delay-${i}`}>
          <rect x="320" y={72 + i * 92} width="540" height="72" rx="11" fill={WHITE} stroke={i === 3 ? GREEN : BLUE} strokeWidth="2.3" />
          <circle cx="356" cy={108 + i * 92} r="16" fill={i === 3 ? GREEN : BLUE} />
          <L x="356" y={114 + i * 92} size={15} fill={WHITE}>{i + 1}</L>
          <L x="384" y={102 + i * 92} size={15} anchor="start">{t}</L>
          <L x="384" y={126 + i * 92} size={12.5} anchor="start" fill={MUTED} weight={700}>{s}</L>
        </g>
      ))}
      <rect x="56" y="244" width="228" height="196" rx="12" fill={SKY} stroke={MUTED} strokeWidth="1.8" />
      <L x="170" y="278" size={14} fill={MUTED}>Equation count</L>
      <L x="170" y="322" size={15} fill={N}>+1 unknown</L>
      <L x="170" y="356" size={15} fill={N}>+1 constraint</L>
      <Wire d="M96 378 L244 378" stroke={MUTED} />
      <L x="170" y="410" size={17} fill={GREEN}>net 0</L>
    </Scene>
  )
}

export function SourceTransformScene() {
  return (
    <Scene caption="Equivalent at the terminals only — anything inside the box is lost">
      <rect x="56" y="96" width="344" height="256" rx="14" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
      <L x="228" y="130" size={16} fill={BLUE}>Practical voltage source</L>
      <SrcV cx="148" cy="240" r="30" />
      <Res x="212" y="200" label="R_s" />
      <Wire d="M148 210 L148 200 L212 200 M272 200 L344 200 M148 270 L148 312 L344 312" stroke={N} />
      <Dot cx="344" cy="200" r="6" />
      <Dot cx="344" cy="312" r="6" />
      <L x="228" y="332" size={13} fill={MUTED} weight={700}>v_s = i_s · R_s</L>

      <g className="nam-flip">
        <Wire d="M414 224 L486 224" stroke={AMBER} width="3.6" className="nam-current" marker="url(#naArrA)" />
      </g>
      <L x="450" y="196" size={13} fill={AMBER} weight={800}>transform</L>
      <L x="450" y="260" size={12} fill={MUTED} weight={700}>same R, R stays</L>

      <rect x="500" y="96" width="344" height="256" rx="14" fill={WHITE} stroke={AMBER} strokeWidth="2.4" />
      <L x="672" y="130" size={16} fill={AMBER}>Practical current source</L>
      <SrcI cx="592" cy="240" r="30" />
      <Wire d="M592 210 L592 186 L700 186 M592 270 L592 312 L788 312 M700 186 L788 186" stroke={N} />
      <Res x="700" y="248" label="R_s" />
      <Wire d="M730 186 L730 248 M730 308 L730 312" stroke={N} />
      <Dot cx="788" cy="186" r="6" />
      <Dot cx="788" cy="312" r="6" />

      <rect x="120" y="396" width="660" height="74" rx="12" fill={SKY} stroke={RED} strokeWidth="2.4" />
      <L x="450" y="426" size={15} fill={RED}>Internal power is NOT preserved</L>
      <L x="450" y="454" size={13} fill={MUTED} weight={700}>Never transform a source you were asked to find the power in</L>
    </Scene>
  )
}

export function DeltaWyeScene() {
  return (
    <Scene caption="Structure changes, terminal behaviour does not">
      <L x="210" y="74" size={17} fill={BLUE}>Δ (delta / π)</L>
      <Wire d="M210 120 L84 340 L336 340 Z" stroke={N} width="2.8" />
      <L x="132" y="238" size={14} fill={BLUE}>R_ab</L>
      <L x="292" y="238" size={14} fill={BLUE}>R_ca</L>
      <L x="210" y="366" size={14} fill={BLUE}>R_bc</L>
      <Dot cx="210" cy="120" r="8" />
      <Dot cx="84" cy="340" r="8" />
      <Dot cx="336" cy="340" r="8" />

      <g className="nam-flip">
        <Wire d="M394 236 L506 236" stroke={AMBER} width="3.6" className="nam-current" marker="url(#naArrA)" />
      </g>
      <L x="450" y="208" size={13} fill={AMBER} weight={800}>equivalent</L>
      <L x="450" y="272" size={12} fill={MUTED} weight={700}>at a, b, c only</L>

      <L x="690" y="74" size={17} fill={TEAL}>Y (wye / T)</L>
      <Wire d="M690 120 L690 236 M690 236 L564 340 M690 236 L816 340" stroke={N} width="2.8" />
      <Dot cx="690" cy="236" r="9" fill={TEAL} className="nam-flux" />
      <Dot cx="690" cy="120" r="8" />
      <Dot cx="564" cy="340" r="8" />
      <Dot cx="816" cy="340" r="8" />
      <L x="722" y="184" size={14} fill={TEAL}>R_a</L>
      <L x="600" y="306" size={14} fill={TEAL}>R_b</L>
      <L x="790" y="306" size={14} fill={TEAL}>R_c</L>
      <L x="690" y="380" size={12.5} fill={MUTED} weight={700}>a star point appears that has no counterpart in Δ</L>

      <rect x="110" y="410" width="680" height="62" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
      <L x="450" y="440" size={16} fill={GREEN}>R_a = (R_ab · R_ca) / (R_ab + R_bc + R_ca)</L>
      <L x="450" y="464" size={12.5} fill={MUTED} weight={700}>product of the two Δ resistors touching that terminal, over the sum of all three</L>
    </Scene>
  )
}

export function SinusoidScene({ lanes = 1, caption = 'Amplitude, frequency, phase — three numbers fix the waveform' }) {
  if (lanes > 1) {
    const rows = [
      { c: BLUE, cyc: 1, label: 'ω₁ — solve alone' },
      { c: AMBER, cyc: 2, label: 'ω₂ — solve alone' },
      { c: TEAL, cyc: 3, label: 'DC — solve alone' },
    ]
    return (
      <Scene caption="Different frequencies never share a phasor diagram — one lane each, add in the time domain">
        {rows.map((r, i) => (
          <g key={r.label}>
            <rect x="60" y={68 + i * 128} width="780" height="108" rx="12" fill={WHITE} stroke={r.c} strokeWidth="2.2" />
            <L x="140" y={100 + i * 128} size={13.5} fill={r.c} anchor="start">{r.label}</L>
            <g className="nam-wave-shift">
              <path d={sinePath(120, 138 + i * 128, 900, 26, r.cyc === 3 ? 0.001 : r.cyc * 2)} fill="none" stroke={r.c} strokeWidth="2.8" />
            </g>
          </g>
        ))}
        <rect x="60" y="452" width="780" height="46" rx="10" fill={SKY} stroke={RED} strokeWidth="2" />
        <L x="450" y="481" size={14} fill={RED}>Adding phasors of different ω is meaningless — add the time functions</L>
      </Scene>
    )
  }
  return (
    <Scene caption={caption}>
      <Axes x="90" y="300" w="720" h="200" xLabel="t" yLabel="v(t)" />
      <g className="nam-wave-shift">
        <path d={sinePath(90, 300, 1080, 92, 3)} fill="none" stroke={BLUE} strokeWidth="3.2" />
      </g>
      <Wire d="M90 208 L810 208" stroke={AMBER} dash="7 7" width="2" />
      <L x="848" y="212" size={14} fill={AMBER} anchor="end">V_m</L>
      <Wire d="M258 300 L498 300" stroke={TEAL} width="3.4" marker="url(#naArrT)" />
      <L x="378" y="336" size={14} fill={TEAL}>T = 1/f = 2π/ω</L>
      <Wire d="M90 380 L150 380" stroke={PURP} width="3.4" marker="url(#naArrA)" />
      <L x="180" y="386" size={14} fill={PURP} anchor="start">φ — shifts the whole wave left/right</L>
      <rect x="120" y="416" width="660" height="56" rx="11" fill={WHITE} stroke={N} strokeWidth="2.2" />
      <L x="450" y="452" size={18}>v(t) = V_m · cos(ωt + φ)</L>
    </Scene>
  )
}

export function PhasorScene({ showDetour = false }) {
  return (
    <Scene caption={showDetour ? 'The complex detour: solve once in ℂ, keep the real part' : 'A phasor is the frozen amplitude-and-phase of a rotating vector'}>
      <circle cx="248" cy="246" r="150" fill={WHITE} stroke={MUTED} strokeWidth="2" strokeDasharray="6 7" />
      <Wire d="M88 246 L408 246" stroke={MUTED} width="1.8" />
      <Wire d="M248 396 L248 86" stroke={MUTED} width="1.8" />
      <L x="416" y="242" size={13} fill={MUTED} anchor="start">Re</L>
      <L x="248" y="76" size={13} fill={MUTED}>Im</L>
      <g className="nam-spin" style={{ transformOrigin: '248px 246px' }}>
        <Wire d="M248 246 L378 176" stroke={BLUE} width="4" marker="url(#naArrB)" />
        <circle cx="378" cy="176" r="7" fill={BLUE} />
      </g>
      <L x="248" y="430" size={14} fill={BLUE}>V = V_m∠φ   rotating at ω</L>

      <Axes x="470" y="300" w="360" h="170" xLabel="t" />
      <g className="nam-wave-shift">
        <path d={sinePath(470, 300, 540, 76, 3)} fill="none" stroke={AMBER} strokeWidth="3" />
      </g>
      <L x="650" y="112" size={15} fill={AMBER}>projection on Re = v(t)</L>
      <Wire d="M414 200 L462 232" stroke={AMBER} width="2.6" className="nam-current" marker="url(#naArrA)" dash="8 6" />
      {showDetour ? (
        <>
          <rect x="470" y="352" width="368" height="104" rx="11" fill={SKY} stroke={TEAL} strokeWidth="2.2" />
          <L x="654" y="382" size={14} fill={TEAL}>Differential equation in t</L>
          <L x="654" y="410" size={14} fill={N}>→ algebraic equation in ℂ</L>
          <L x="654" y="438" size={12.5} fill={MUTED} weight={700}>take Re{'{ }'} at the very end, never in the middle</L>
        </>
      ) : (
        <>
          <rect x="470" y="372" width="368" height="80" rx="11" fill={WHITE} stroke={GREEN} strokeWidth="2.2" />
          <L x="654" y="404" size={15} fill={GREEN}>ω is dropped, not forgotten</L>
          <L x="654" y="432" size={12.5} fill={MUTED} weight={700}>every phasor in one diagram shares the same ω</L>
        </>
      )}
    </Scene>
  )
}

export function ImpedanceTriangleScene() {
  return (
    <Scene caption="Z = R + jX — the triangle is the whole of AC element behaviour">
      <Wire d="M170 360 L560 360" stroke={BLUE} width="4" />
      <L x="365" y="392" size={16} fill={BLUE}>R (resistance)</L>
      <Wire d="M560 360 L560 170" stroke={PURP} width="4" className="nam-charge" />
      <L x="606" y="268" size={16} fill={PURP} anchor="start">X (reactance)</L>
      <Wire d="M170 360 L560 170" stroke={AMBER} width="4.4" />
      <L x="320" y="238" size={17} fill={AMBER}>|Z|</L>
      <path d="M230 360 A 60 60 0 0 0 218 330" fill="none" stroke={N} strokeWidth="2.4" />
      <L x="256" y="330" size={15}>θ</L>
      <rect x="640" y="86" width="216" height="158" rx="12" fill={WHITE} stroke={TEAL} strokeWidth="2.2" />
      <L x="748" y="118" size={14} fill={TEAL}>Element reactances</L>
      <L x="748" y="152" size={14} fill={N}>R → X = 0</L>
      <L x="748" y="184" size={14} fill={PURP}>L → X = +ωL</L>
      <L x="748" y="216" size={14} fill={TEAL}>C → X = −1/ωC</L>
      <rect x="120" y="424" width="660" height="56" rx="11" fill={SKY} stroke={RED} strokeWidth="2.2" />
      <L x="450" y="459" size={14.5} fill={RED}>Y = 1/Z is a complex reciprocal — never invert R and X separately</L>
    </Scene>
  )
}

export function DcAcOverlayScene() {
  const rows = [
    ['Resistance R', 'Impedance Z'],
    ['Conductance G', 'Admittance Y'],
    ['Real numbers', 'Complex numbers'],
    ['Same KCL / KVL', 'Same KCL / KVL'],
    ['Same matrix build', 'Same matrix build'],
  ]
  return (
    <Scene caption="The machinery does not change — only the arithmetic does">
      <rect x="60" y="62" width="368" height="46" rx="10" fill={BLUE} />
      <L x="244" y="93" size={16} fill={WHITE}>DC network</L>
      <rect x="472" y="62" width="368" height="46" rx="10" fill={AMBER} />
      <L x="656" y="93" size={16} fill={WHITE}>AC network (phasor)</L>
      {rows.map(([a, b], i) => (
        <g key={a + b} className={`nam-cell-in nam-delay-${i % 5}`}>
          <rect x="60" y={124 + i * 62} width="368" height="50" rx="9" fill={WHITE} stroke={BLUE} strokeWidth="1.9" />
          <L x="244" y={155 + i * 62} size={14.5} fill={N}>{a}</L>
          <Wire d={`M436 ${149 + i * 62} L464 ${149 + i * 62}`} stroke={MUTED} width="2.4" marker="url(#naArr)" />
          <rect x="472" y={124 + i * 62} width="368" height="50" rx="9" fill={i > 2 ? SKY : WHITE} stroke={AMBER} strokeWidth="1.9" />
          <L x="656" y={155 + i * 62} size={14.5} fill={N}>{b}</L>
        </g>
      ))}
      <L x="450" y="466" size={14} fill={GREEN} weight={800}>If you can write the DC matrix, you can write the AC one</L>
    </Scene>
  )
}

/* ── Module 2 — theorems ────────────────────────────────────────── */

export function LinearityScene() {
  return (
    <Scene caption="Homogeneity and additivity — every theorem in this module rests on both">
      <rect x="70" y="80" width="350" height="290" rx="14" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
      <L x="245" y="118" size={17} fill={BLUE}>Homogeneity</L>
      <L x="245" y="164" size={16}>f(k·x) = k·f(x)</L>
      <Wire d="M120 220 L200 220" stroke={BLUE} width="3" className="nam-current" marker="url(#naArrB)" />
      <L x="160" y="204" size={13} fill={MUTED} weight={700}>×2 in</L>
      <Box x="210" y="196" w="70" h="48" label="net" stroke={BLUE} />
      <Wire d="M290 220 L372 220" stroke={BLUE} width="3" className="nam-current nam-delay-1" marker="url(#naArrB)" />
      <L x="332" y="204" size={13} fill={MUTED} weight={700}>×2 out</L>
      <L x="245" y="300" size={13.5} fill={MUTED} weight={700}>Double every source, double every response</L>
      <L x="245" y="334" size={13} fill={RED} weight={800}>Power does not obey this — it is quadratic</L>

      <rect x="480" y="80" width="350" height="290" rx="14" fill={WHITE} stroke={AMBER} strokeWidth="2.6" />
      <L x="655" y="118" size={17} fill={AMBER}>Additivity</L>
      <L x="655" y="164" size={16}>f(x₁ + x₂) = f(x₁) + f(x₂)</L>
      <Wire d="M520 206 L596 206" stroke={AMBER} width="3" className="nam-current" marker="url(#naArrA)" />
      <Wire d="M520 244 L596 244" stroke={AMBER} width="3" className="nam-current nam-delay-2" marker="url(#naArrA)" />
      <Box x="606" y="192" w="70" h="66" label="net" stroke={AMBER} />
      <Wire d="M686 226 L784 226" stroke={AMBER} width="3" className="nam-current nam-delay-1" marker="url(#naArrA)" />
      <L x="655" y="300" size={13.5} fill={MUTED} weight={700}>Sources act independently, responses add</L>
      <L x="655" y="334" size={13} fill={GREEN} weight={800}>This is superposition, stated in advance</L>

      <rect x="150" y="400" width="600" height="60" rx="12" fill={SKY} stroke={N} strokeWidth="2.2" />
      <L x="450" y="436" size={15}>A circuit is linear only if every element is linear — no diodes, no saturation</L>
    </Scene>
  )
}

export function SuperpositionScene({ power = false }) {
  if (power) {
    return (
      <Scene caption="Power is quadratic — the cross term is exactly what superposition throws away">
        <rect x="70" y="80" width="760" height="120" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.3" />
        <L x="450" y="126" size={17} fill={BLUE}>i = i₁ + i₂     (currents DO superpose)</L>
        <L x="450" y="166" size={13.5} fill={MUTED} weight={700}>each found with the other source deactivated</L>
        <rect x="70" y="228" width="760" height="150" rx="12" fill={SKY} stroke={RED} strokeWidth="2.8" />
        <L x="450" y="272" size={19} fill={N}>p = i²R = (i₁ + i₂)²R</L>
        <L x="450" y="316" size={19}>
          <tspan fill={BLUE}>i₁²R</tspan>
          <tspan fill={N}> + </tspan>
          <tspan fill={BLUE}>i₂²R</tspan>
          <tspan fill={N}> + </tspan>
          <tspan fill={RED} className="nam-charge">2i₁i₂R</tspan>
        </L>
        <L x="450" y="354" size={14} fill={RED} weight={800}>the cross term is never zero in general</L>
        <rect x="150" y="406" width="600" height="62" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.3" />
        <L x="450" y="436" size={15} fill={GREEN}>Correct route: superpose the current first, then square once</L>
        <L x="450" y="460" size={12.5} fill={MUTED} weight={700}>Adding per-source powers is the single most common exam error here</L>
      </Scene>
    )
  }
  return (
    <Scene caption="Split the problem by source, solve each simple circuit, add the responses">
      <Box x="60" y="82" w="230" h="130" label="Full circuit" sub="V_s and I_s both active" stroke={N} />
      <Wire d="M300 148 L360 108" stroke={BLUE} width="3" className="nam-current" marker="url(#naArrB)" />
      <Wire d="M300 148 L360 254" stroke={AMBER} width="3" className="nam-current nam-delay-2" marker="url(#naArrA)" />
      <Box x="368" y="66" w="230" h="116" label="Only V_s active" sub="I_s → open circuit" stroke={BLUE} />
      <Box x="368" y="212" w="230" h="116" label="Only I_s active" sub="V_s → short circuit" stroke={AMBER} />
      <Wire d="M606 124 L676 186" stroke={BLUE} width="3" className="nam-current nam-delay-1" marker="url(#naArrB)" />
      <Wire d="M606 270 L676 208" stroke={AMBER} width="3" className="nam-current nam-delay-3" marker="url(#naArrA)" />
      <g className="nam-emerge">
        <Box x="686" y="140" w="160" h="116" label="i = i′ + i″" stroke={GREEN} />
      </g>
      <rect x="60" y="368" width="780" height="100" rx="12" fill={SKY} stroke={MUTED} strokeWidth="2" />
      <L x="450" y="400" size={14.5} fill={N}>Worth it when sources are few and each sub-circuit collapses to a divider.</L>
      <L x="450" y="430" size={14.5} fill={RED}>Never deactivate a dependent source — it stays in every sub-circuit.</L>
      <L x="450" y="458" size={13} fill={MUTED} weight={700}>n sources → n sub-circuits; the cost grows linearly, the arithmetic shrinks</L>
    </Scene>
  )
}

export function DeactivationScene({ rows, title = 'Deactivation lookup' }) {
  const data = rows || [
    ['Independent voltage source', 'Replace with a SHORT', 'v = 0 with any current', GREEN],
    ['Independent current source', 'Replace with an OPEN', 'i = 0 with any voltage', GREEN],
    ['Dependent source', 'LEAVE IT IN PLACE', 'its control still exists', RED],
    ['Resistor / L / C', 'Untouched', 'passive elements never deactivate', MUTED],
  ]
  return (
    <Scene caption={`${title} — the rule that makes or breaks the answer`}>
      <rect x="56" y="60" width="788" height="46" rx="9" fill={N} />
      <L x="200" y="90" size={14} fill={WHITE}>Element</L>
      <L x="480" y="90" size={14} fill={WHITE}>Action</L>
      <L x="730" y="90" size={14} fill={WHITE}>Why</L>
      {data.map(([el, act, why, c], i) => (
        <g key={el} className={`nam-slide-in nam-delay-${i}`}>
          <rect x="56" y={118 + i * 78} width="788" height="66" rx="9" fill={WHITE} stroke={c} strokeWidth="2.3" />
          <L x="200" y={156 + i * 78} size={14} fill={N}>{el}</L>
          <L x="480" y={156 + i * 78} size={14.5} fill={c}>{act}</L>
          <L x="730" y={156 + i * 78} size={12.5} fill={MUTED} weight={700}>{why}</L>
        </g>
      ))}
      <L x="450" y="466" size={14} fill={RED} weight={800}>Deactivating a dependent source is the fastest way to a wrong R_th</L>
    </Scene>
  )
}

export function ReciprocityScene({ mode = 'swap' }) {
  if (mode === 'grid') {
    const cells = [
      ['Reciprocal', 'z₁₂ = z₂₁', GREEN],
      ['Symmetric', 'z₁₁ = z₂₂', BLUE],
      ['Reciprocal, not symmetric', 'unequal halves', AMBER],
      ['Symmetric, not reciprocal', 'needs an active element', RED],
    ]
    return (
      <Scene caption="Reciprocity and symmetry are different claims — check each separately">
        {cells.map(([t, f, c], i) => (
          <g key={t} className={`nam-cell-in nam-delay-${i}`}>
            <rect x={60 + (i % 2) * 400} y={76 + Math.floor(i / 2) * 190} width="380" height="168" rx="13" fill={WHITE} stroke={c} strokeWidth="2.6" />
            <L x={250 + (i % 2) * 400} y={124 + Math.floor(i / 2) * 190} size={16} fill={c}>{t}</L>
            <L x={250 + (i % 2) * 400} y={176 + Math.floor(i / 2) * 190} size={20} fill={N}>{f}</L>
            <L x={250 + (i % 2) * 400} y={214 + Math.floor(i / 2) * 190} size={12.5} fill={MUTED} weight={700}>
              {i === 0 ? 'true for every passive linear network' : i === 1 ? 'the network looks the same from both ports' : i === 2 ? 'a T with unequal arms' : 'only with a controlled source inside'}
            </L>
          </g>
        ))}
        <L x="450" y="484" size={13.5} fill={MUTED} weight={800}>Symmetry implies reciprocity for passive networks; the reverse does not hold</L>
      </Scene>
    )
  }
  if (mode === 'panels') {
    return (
      <Scene caption="One controlled source is enough to destroy reciprocity">
        <rect x="60" y="76" width="370" height="300" rx="14" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <L x="245" y="112" size={17} fill={GREEN}>Reciprocal</L>
        <Res x="120" y="188" label="R₁" />
        <Res x="240" y="188" label="R₂" />
        <Wire d="M100 188 L120 188 M180 188 L240 188 M300 188 L380 188" stroke={N} />
        <L x="245" y="258" size={13.5} fill={MUTED} weight={700}>R, L, C, ideal transformers only</L>
        <Wire d="M110 310 L380 310" stroke={GREEN} width="3" className="nam-current" marker="url(#naArrG)" />
        <L x="245" y="346" size={14} fill={GREEN}>swap source and meter → same reading</L>

        <rect x="470" y="76" width="370" height="300" rx="14" fill={WHITE} stroke={RED} strokeWidth="2.6" />
        <L x="655" y="112" size={17} fill={RED}>Non-reciprocal</L>
        <DepSrc cx="600" cy="196" r="30" inner="g·v_x" />
        <Res x="680" y="196" label="R" />
        <L x="655" y="258" size={13.5} fill={MUTED} weight={700}>transistor model, op-amp, gyrator, circulator</L>
        <Wire d="M520 310 L790 310" stroke={RED} width="3" className="nam-current" marker="url(#naArrR)" />
        <L x="655" y="346" size={14} fill={RED}>swap → different reading</L>

        <rect x="150" y="404" width="600" height="60" rx="12" fill={SKY} stroke={N} strokeWidth="2.2" />
        <L x="450" y="440" size={14.5}>Check the element list before invoking reciprocity — do not check the answer</L>
      </Scene>
    )
  }
  return (
    <Scene caption="Excite at 1, measure at 2 — then swap. Passive linear networks give the same number.">
      <rect x="120" y="70" width="660" height="150" rx="14" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
      <L x="200" y="102" size={14} fill={BLUE} anchor="start">Experiment A</L>
      <SrcV cx="200" cy="158" r="26" label="V" />
      <Box x="368" y="122" w="164" h="72" label="passive N" stroke={N} />
      <Wire d="M226 158 L368 158" stroke={BLUE} width="3" className="nam-current" marker="url(#naArrB)" />
      <Wire d="M532 158 L672 158" stroke={BLUE} width="3" className="nam-current nam-delay-1" marker="url(#naArrB)" />
      <circle cx="700" cy="158" r="26" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
      <L x="700" y="164" size={14} fill={GREEN}>A</L>
      <L x="700" y="206" size={13} fill={GREEN}>reads I</L>

      <rect x="120" y="250" width="660" height="150" rx="14" fill={WHITE} stroke={AMBER} strokeWidth="2.4" />
      <L x="200" y="282" size={14} fill={AMBER} anchor="start">Experiment B — swapped</L>
      <circle cx="200" cy="338" r="26" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
      <L x="200" y="344" size={14} fill={GREEN}>A</L>
      <L x="200" y="386" size={13} fill={GREEN}>reads I</L>
      <Box x="368" y="302" w="164" h="72" label="passive N" stroke={N} />
      <Wire d="M368 338 L226 338" stroke={AMBER} width="3" className="nam-current-rev" marker="url(#naArrA)" />
      <Wire d="M672 338 L532 338" stroke={AMBER} width="3" className="nam-current-rev nam-delay-1" marker="url(#naArrA)" />
      <SrcV cx="700" cy="338" r="26" label="V" stroke={AMBER} />
      <g className="nam-charge">
        <L x="450" y="452" size={17} fill={GREEN}>same excitation, same response — the transfer ratio is unchanged</L>
      </g>
    </Scene>
  )
}

export function GateChecklistScene({ items, title = 'Conditions' }) {
  const rows = items || [
    ['Linear elements only', 'no diodes, no saturation'],
    ['Passive — no dependent sources', 'a controlled source breaks it'],
    ['Bilateral elements', 'same behaviour both directions'],
    ['Single excitation at a time', 'one source, one response'],
  ]
  return (
    <Scene caption={`${title} — all gates must open before the theorem may be used`}>
      <Wire d="M56 250 L820 250" stroke={MUTED} width="3" dash="10 8" />
      <circle cx="56" cy="250" r="14" fill={BLUE} className="nam-charge" />
      {rows.map(([t, s], i) => (
        <g key={t} className={`nam-emerge nam-delay-${i}`}>
          <rect x={92 + i * 190} y="132" width="170" height="106" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
          <L x={177 + i * 190} y="172" size={14} fill={GREEN}>{`GATE ${i + 1}`}</L>
          <L x={177 + i * 190} y="202" size={13} fill={N}>{t}</L>
          <L x={177 + i * 190} y="292" size={12} fill={MUTED} weight={700}>{s}</L>
          <Wire d={`M${177 + i * 190} 238 L${177 + i * 190} 250`} stroke={GREEN} width="2.4" />
        </g>
      ))}
      <g className="nam-emerge nam-delay-4">
        <rect x="280" y="360" width="340" height="82" rx="13" fill={SKY} stroke={GREEN} strokeWidth="2.8" />
        <L x="450" y="396" size={16} fill={GREEN}>Theorem is safe to apply</L>
        <L x="450" y="424" size={12.5} fill={MUTED} weight={700}>one failed gate voids the result silently</L>
      </g>
    </Scene>
  )
}

export function TheveninScene({ duality = false }) {
  return (
    <Scene caption={duality ? 'The same two numbers, arranged two ways' : 'Everything left of the terminals collapses to one source and one resistance'}>
      <g className={duality ? '' : 'nam-collapse'} style={{ transformOrigin: '230px 230px' }}>
        <rect x="60" y="110" width="340" height="240" rx="14" fill={WHITE} stroke={MUTED} strokeWidth="2.2" strokeDasharray="9 7" />
        <L x="230" y="146" size={15} fill={MUTED}>any linear network</L>
        <SrcV cx="120" cy="230" r="22" />
        <Res x="170" y="198" label="R₁" />
        <Res x="260" y="264" label="R₂" />
        <SrcI cx="340" cy="200" r="20" />
      </g>
      <Wire d="M414 230 L486 230" stroke={AMBER} width="3.4" className="nam-current" marker="url(#naArrA)" />
      <L x="450" y="204" size={13} fill={AMBER} weight={800}>equivalent</L>

      <g className="nam-emerge">
        <rect x="500" y="80" width="352" height="150" rx="13" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <L x="676" y="112" size={15} fill={BLUE}>Thévenin</L>
        <SrcV cx="566" cy="172" r="22" label="V_th" />
        <Res x="620" y="172" label="R_th" />
        <Wire d="M588 172 L620 172 M680 172 L820 172" stroke={N} />
        <Dot cx="820" cy="172" r="6" />
      </g>
      <g className="nam-emerge nam-delay-2">
        <rect x="500" y="250" width="352" height="150" rx="13" fill={WHITE} stroke={AMBER} strokeWidth="2.6" />
        <L x="676" y="282" size={15} fill={AMBER}>Norton</L>
        <SrcI cx="566" cy="342" r="22" label="I_N" />
        <Res x="640" y="342" label="R_N = R_th" />
        <Wire d="M566 320 L566 306 L700 306 M700 306 L700 342 M700 400 L820 400" stroke={N} />
        <Dot cx="820" cy="400" r="6" />
      </g>
      <rect x="60" y="400" width="400" height="74" rx="12" fill={SKY} stroke={GREEN} strokeWidth="2.3" />
      <L x="260" y="430" size={15} fill={GREEN}>V_th = I_N · R_th</L>
      <L x="260" y="458" size={12.5} fill={MUTED} weight={700}>Equivalent at the terminals only — internal power differs</L>
    </Scene>
  )
}

export function RthRoutesScene() {
  const routes = [
    ['Deactivate and reduce', 'no dependent sources present', 'series/parallel arithmetic only', GREEN],
    ['Open-circuit / short-circuit', 'R_th = V_oc / I_sc', 'works whenever both are finite', BLUE],
    ['Test source', 'apply 1 V, measure I → R_th = 1/I', 'the only route when V_oc = 0', AMBER],
  ]
  return (
    <Scene caption="Three routes to R_th — the circuit decides which is legal, not preference">
      {routes.map(([t, f, w, c], i) => (
        <g key={t} className={`nam-cell-in nam-delay-${i}`}>
          <rect x="58" y={70 + i * 132} width="784" height="116" rx="13" fill={WHITE} stroke={c} strokeWidth="2.6" />
          <circle cx="112" cy={128 + i * 132} r="24" fill={c} />
          <L x="112" y={135 + i * 132} size={18} fill={WHITE}>{i + 1}</L>
          <L x="160" y={112 + i * 132} size={16} fill={c} anchor="start">{t}</L>
          <L x="160" y={144 + i * 132} size={15} fill={N} anchor="start">{f}</L>
          <L x="160" y={170 + i * 132} size={12.5} fill={MUTED} anchor="start" weight={700}>{w}</L>
        </g>
      ))}
      <rect x="58" y="466" width="784" height="36" rx="9" fill={SKY} stroke={RED} strokeWidth="2" />
      <L x="450" y="491" size={13.5} fill={RED}>With a dependent source present, route 1 is simply wrong</L>
    </Scene>
  )
}

export function MaxPowerScene({ regimes = false }) {
  if (regimes) {
    const cards = [
      ['Power transfer', 'R_L = R_th', 'audio output, RF, antennas', AMBER],
      ['Voltage transfer', 'R_L ≫ R_th', 'sensors, measurement, op-amp inputs', BLUE],
      ['Efficiency', 'R_L ≫ R_th', 'power distribution — 50% is unacceptable', GREEN],
    ]
    return (
      <Scene caption="Matching is a design choice — maximum power is rarely the goal">
        {cards.map(([t, cond, use, c], i) => (
          <g key={t} className={`nam-cell-in nam-delay-${i}`}>
            <rect x={56 + i * 268} y="80" width="252" height="300" rx="14" fill={WHITE} stroke={c} strokeWidth="2.8" />
            <L x={182 + i * 268} y="124" size={17} fill={c}>{t}</L>
            <L x={182 + i * 268} y="196" size={20} fill={N}>{cond}</L>
            <rect x={90 + i * 268} y="228" width="184" height="6" rx="3" fill={c} className="nam-charge" />
            <L x={182 + i * 268} y="288" size={13} fill={MUTED} weight={700}>{use}</L>
            <L x={182 + i * 268} y="348" size={13.5} fill={c}>{i === 0 ? 'η = 50%' : i === 1 ? 'no loading error' : 'η → 100%'}</L>
          </g>
        ))}
        <rect x="150" y="410" width="600" height="60" rx="12" fill={SKY} stroke={N} strokeWidth="2.2" />
        <L x="450" y="446" size={14.5}>Ask what is scarce — power, accuracy or energy cost — then match accordingly</L>
      </Scene>
    )
  }
  /* visualSpec: log axis 0.1..10, power curve peaking at ratio 1, flatness
     bands at 0.5 and 2 annotated ~89% of p_max, plus a dashed efficiency
     curve rising 0..100% and crossing 50% exactly at the power peak. */
  const X0 = 110
  const W = 700
  const Y0 = 372
  const Hpx = 250
  // Log ratio axis: 0.1 -> 10, so ratio 1 lands at the midpoint.
  const px = (ratio) => X0 + ((Math.log10(ratio) + 1) / 2) * W
  const power = []
  const eff = []
  for (let i = 0; i <= 120; i += 1) {
    const ratio = Math.pow(10, -1 + (i / 120) * 2)
    const p = (4 * ratio) / Math.pow(1 + ratio, 2) // normalised: 1 at ratio 1
    const e = ratio / (1 + ratio) // efficiency, 0.5 at ratio 1
    power.push(`${i === 0 ? 'M' : 'L'}${px(ratio).toFixed(1)} ${(Y0 - p * Hpx).toFixed(1)}`)
    eff.push(`${i === 0 ? 'M' : 'L'}${px(ratio).toFixed(1)} ${(Y0 - e * Hpx).toFixed(1)}`)
  }
  const peak = px(1)
  return (
    <Scene caption="The peak is broad — and it is exactly where efficiency is only 50%">
      <Axes x={X0} y={Y0} w={W} h={Hpx + 40} xLabel="R_L / R_th  (log)" yLabel="P_L" />
      {/* Flatness bands: half and double the matched value still deliver ~89%. */}
      {[0.5, 2].map((ratio) => (
        <g key={ratio} className="nam-cell-in nam-delay-3">
          <rect x={px(ratio) - 14} y={Y0 - Hpx} width="28" height={Hpx} fill={AMBER} opacity="0.12" />
          <L x={px(ratio)} y={Y0 - Hpx - 8} size={11.5} fill={AMBER} weight={800}>≈89%</L>
          <L x={px(ratio)} y={Y0 + 20} size={12} fill={MUTED} weight={700}>{ratio}</L>
        </g>
      ))}
      <path d={power.join(' ')} fill="none" stroke={BLUE} strokeWidth="3.4" className="nam-draw" />
      {/* nam-draw would overwrite stroke-dasharray, and the spec wants this one
          dashed to read as the reference curve — fade it in instead. */}
      <path d={eff.join(' ')} fill="none" stroke={TEAL} strokeWidth="2.8" strokeDasharray="9 7" className="nam-cell-in nam-delay-2" />
      <Wire d={`M${peak} ${Y0} L${peak} ${Y0 - Hpx - 12}`} stroke={AMBER} dash="8 7" width="2.4" />
      <L x={peak} y={Y0 - Hpx - 30} size={14} fill={AMBER}>p_max = V_th²/4R_th</L>
      <circle cx={peak} cy={Y0 - Hpx} r="9" fill={AMBER} className="nam-flux" />
      <L x={peak} y={Y0 + 20} size={12} fill={MUTED} weight={700}>1</L>
      <circle cx={peak} cy={Y0 - Hpx / 2} r="8" fill={TEAL} className="nam-flux nam-delay-2" />
      <g className="nam-cell-in nam-delay-4">
        <Wire d={`M${peak + 12} ${Y0 - Hpx / 2} L${peak + 118} ${Y0 - Hpx / 2 + 34}`} stroke={TEAL} width="2.2" marker="url(#naArrT)" />
        <L x={peak + 208} y={Y0 - Hpx / 2 + 42} size={13} fill={TEAL}>matched: 50% efficient</L>
      </g>
      <L x="796" y={Y0 - Hpx + 4} size={12.5} fill={TEAL} weight={800} anchor="end">η → 100%</L>
      <rect x="140" y="424" width="620" height="54" rx="11" fill={SKY} stroke={RED} strokeWidth="2.2" />
      <L x="450" y="457" size={14} fill={RED}>For AC: Z_L = Z_th* (conjugate) — not simply |Z_L| = |Z_th|</L>
    </Scene>
  )
}

export function TheoremBridgeScene() {
  const rows = ['Superposition', 'Thévenin', 'Norton', 'Maximum power', 'Reciprocity']
  return (
    <Scene caption="Every theorem crosses the bridge — R becomes Z, arithmetic becomes complex">
      <rect x="50" y="76" width="250" height="330" rx="14" fill={WHITE} stroke={BLUE} strokeWidth="2.4" />
      <L x="175" y="110" size={16} fill={BLUE}>DC form</L>
      <rect x="600" y="76" width="250" height="330" rx="14" fill={WHITE} stroke={TEAL} strokeWidth="2.4" />
      <L x="725" y="110" size={16} fill={TEAL}>Phasor form</L>
      <Wire d="M300 136 L600 136 M300 136 L600 136" stroke={MUTED} width="1.6" />
      {rows.map((r, i) => (
        <g key={r} className={`nam-cell-in nam-delay-${i % 5}`}>
          <L x="175" y={162 + i * 52} size={14}>{r}</L>
          <L x="725" y={162 + i * 52} size={14} fill={TEAL}>{r}</L>
          <Wire d={`M312 ${157 + i * 52} L588 ${157 + i * 52}`} stroke={AMBER} width="2.4" className="nam-current" marker="url(#naArrA)" dash="8 7" />
        </g>
      ))}
      <rect x="240" y="418" width="420" height="58" rx="12" fill={SKY} stroke={RED} strokeWidth="2.3" />
      <L x="450" y="444" size={14} fill={RED}>Max power becomes a CONJUGATE match</L>
      <L x="450" y="468" size={12.5} fill={MUTED} weight={700}>every source in one phasor problem must share one ω</L>
    </Scene>
  )
}

export function DecisionTreeScene({ root = 'What is asked?', branches }) {
  const rows = branches || [
    ['One element, many loads?', 'Thévenin / Norton', BLUE],
    ['Several independent sources?', 'Superposition', AMBER],
    ['Load resistance to choose?', 'Maximum power transfer', GREEN],
    ['Whole network response?', 'Nodal or mesh — no theorem', PURP],
  ]
  return (
    <Scene caption="Pick the method from the question, not from habit">
      <rect x="300" y="52" width="300" height="60" rx="13" fill={N} className="nam-flux" />
      <L x="450" y="90" size={16} fill={WHITE}>{root}</L>
      {rows.map(([q, a, c], i) => (
        <g key={q} className={`nam-slide-in nam-delay-${i}`}>
          <Wire d={`M450 112 L450 ${150 + i * 88} L${i % 2 === 0 ? 250 : 650} ${150 + i * 88}`} stroke={c} width="2.2" dash="7 6" />
          <rect x={i % 2 === 0 ? 56 : 500} y={124 + i * 88} width="390" height="64" rx="11" fill={WHITE} stroke={c} strokeWidth="2.4" />
          <L x={i % 2 === 0 ? 251 : 695} y={150 + i * 88} size={13.5} fill={MUTED} weight={700}>{q}</L>
          <L x={i % 2 === 0 ? 251 : 695} y={175 + i * 88} size={15} fill={c}>{a}</L>
        </g>
      ))}
      <L x="450" y="492" size={13.5} fill={MUTED} weight={800}>A theorem that does not shorten the work is the wrong theorem</L>
    </Scene>
  )
}

export function VerifyChecksScene() {
  const checks = [
    ['Limiting cases', 'R_L → 0 and R_L → ∞ give values you can predict', BLUE],
    ['Power balance', 'Σ power delivered = Σ power absorbed', GREEN],
    ['An independent second method', 'nodal result must match the theorem result', AMBER],
  ]
  return (
    <Scene caption="Three cheap checks that catch almost every sign error">
      {checks.map(([t, s, c], i) => (
        <g key={t} className={`nam-emerge nam-delay-${i}`}>
          <rect x="56" y={86 + i * 130} width="788" height="108" rx="13" fill={WHITE} stroke={c} strokeWidth="2.6" />
          <circle cx="116" cy={140 + i * 130} r="26" fill={c} className="nam-flux" />
          <L x="116" y={148 + i * 130} size={20} fill={WHITE}>✓</L>
          <L x="164" y={130 + i * 130} size={16.5} fill={c} anchor="start">{t}</L>
          <L x="164" y={162 + i * 130} size={13.5} fill={MUTED} anchor="start" weight={700}>{s}</L>
        </g>
      ))}
      <L x="450" y="492" size={13.5} fill={N} weight={800}>A result that survives all three is worth defending in the viva</L>
    </Scene>
  )
}

/* ── Module 3 — transients ──────────────────────────────────────── */

export function ContinuityScene({ kind = 'C' }) {
  const isC = kind === 'C'
  const c = isC ? TEAL : PURP
  return (
    <Scene caption={isC ? 'Capacitor voltage cannot jump — finite current forbids it' : 'Inductor current cannot jump — finite voltage forbids it'}>
      <rect x="56" y="66" width="380" height="180" rx="13" fill={WHITE} stroke={c} strokeWidth="2.5" />
      <L x="246" y="98" size={16} fill={c}>{isC ? 'Capacitor' : 'Inductor'}</L>
      {isC ? <Cap x="180" y="160" label="C" /> : <Ind x="180" y="160" label="L" />}
      <L x="246" y="212" size={17} fill={N}>{isC ? 'i = C · dv/dt' : 'v = L · di/dt'}</L>

      <rect x="56" y="266" width="380" height="182" rx="13" fill={SKY} stroke={MUTED} strokeWidth="2" />
      <L x="246" y="298" size={15} fill={MUTED}>Stored energy</L>
      <L x="246" y="348" size={21} fill={N}>{isC ? 'w = ½ C v²' : 'w = ½ L i²'}</L>
      <L x="246" y="392" size={13.5} fill={MUTED} weight={700}>{isC ? 'energy lives in the electric field' : 'energy lives in the magnetic field'}</L>
      <L x="246" y="424" size={13} fill={GREEN} weight={800}>energy cannot change instantaneously</L>

      <rect x="470" y="66" width="374" height="382" rx="13" fill={WHITE} stroke={c} strokeWidth="2.5" />
      <L x="657" y="100" size={15} fill={c}>{isC ? 'v(0⁻) = v(0⁺)' : 'i(0⁻) = i(0⁺)'}</L>
      <Axes x="510" y="356" w="300" h="210" xLabel="t" yLabel={isC ? 'v' : 'i'} />
      <path d={expPath(510, 356, 290, 170, true)} fill="none" stroke={c} strokeWidth="3.2" className="nam-draw" />
      <Wire d="M580 356 L580 160" stroke={AMBER} dash="7 6" width="2" />
      <L x="580" y="142" size={13} fill={AMBER}>t = 0</L>
      <circle cx="580" cy="300" r="8" fill={AMBER} className="nam-flux" />
      <L x="657" y="404" size={13} fill={MUTED} weight={700}>continuous through the switching instant</L>
      <L x="657" y="430" size={12.5} fill={RED} weight={800}>{isC ? 'the CURRENT may jump' : 'the VOLTAGE may jump'}</L>
    </Scene>
  )
}

export function SwitchEquivScene() {
  const rows = [
    ['Capacitor at t = 0⁺, uncharged', 'SHORT circuit', TEAL],
    ['Capacitor at t = ∞ (DC)', 'OPEN circuit', TEAL],
    ['Inductor at t = 0⁺, no current', 'OPEN circuit', PURP],
    ['Inductor at t = ∞ (DC)', 'SHORT circuit', PURP],
    ['Charged C at t = 0⁺', 'voltage source V₀', AMBER],
    ['Energised L at t = 0⁺', 'current source I₀', AMBER],
  ]
  return (
    <Scene caption="Six substitutions that turn a transient problem into two resistive problems">
      {rows.map(([t, eq, c], i) => (
        <g key={t} className={`nam-cell-in nam-delay-${i % 5}`}>
          <rect x="56" y={62 + i * 70} width="480" height="58" rx="9" fill={WHITE} stroke={c} strokeWidth="2.2" />
          <L x="296" y={98 + i * 70} size={14.5} fill={N}>{t}</L>
          <Wire d={`M544 ${91 + i * 70} L580 ${91 + i * 70}`} stroke={MUTED} width="2.4" marker="url(#naArr)" />
          <rect x="590" y={62 + i * 70} width="254" height="58" rx="9" fill={SKY} stroke={c} strokeWidth="2.4" />
          <L x="717" y={98 + i * 70} size={15} fill={c}>{eq}</L>
        </g>
      ))}
    </Scene>
  )
}

export function PipelineScene({ steps = [], title = 'Procedure', accent = BLUE }) {
  const rows = steps.slice(0, 5)
  return (
    <Scene caption={`${title} — in this order, every time`}>
      <Wire d="M450 74 L450 440" stroke={MUTED} width="3" dash="9 8" />
      {rows.map((s, i) => (
        <g key={String(s)} className={`nam-slide-in nam-delay-${i}`}>
          <circle cx="450" cy={104 + i * 84} r="22" fill={i === rows.length - 1 ? GREEN : accent} />
          <L x="450" y={111 + i * 84} size={16} fill={WHITE}>{i + 1}</L>
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
              style={{
                font: '600 13.5px/1.28 system-ui,sans-serif',
                color: '#0e1c2e',
                display: 'flex',
                alignItems: 'center',
                height: '100%',
              }}
            >
              {String(s)}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

export function TwoCaseScene({ left, right, caption = 'Two cases, two different answers' }) {
  const l = left || { title: 'Case A', points: [] }
  const r = right || { title: 'Case B', points: [] }
  return (
    <Scene caption={caption}>
      <rect x="56" y="66" width="388" height="366" rx="14" fill={WHITE} stroke={BLUE} strokeWidth="2.7" />
      <rect x="56" y="66" width="388" height="52" rx="14" fill={BLUE} />
      <L x="250" y="100" size={16} fill={WHITE}>{l.title}</L>
      {(l.points || []).slice(0, 5).map((p, i) => (
        <g key={String(p)} className={`nam-cell-in nam-delay-${i}`}>
          <circle cx="92" cy={156 + i * 56} r="7" fill={BLUE} />
          <foreignObject x="112" y={134 + i * 56} width="316" height="46">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13.5px/1.3 system-ui,sans-serif', color: '#0e1c2e' }}>
              {String(p)}
            </div>
          </foreignObject>
        </g>
      ))}
      <rect x="456" y="66" width="388" height="366" rx="14" fill={WHITE} stroke={AMBER} strokeWidth="2.7" />
      <rect x="456" y="66" width="388" height="52" rx="14" fill={AMBER} />
      <L x="650" y="100" size={16} fill={WHITE}>{r.title}</L>
      {(r.points || []).slice(0, 5).map((p, i) => (
        <g key={String(p)} className={`nam-cell-in nam-delay-${i}`}>
          <circle cx="492" cy={156 + i * 56} r="7" fill={AMBER} />
          <foreignObject x="512" y={134 + i * 56} width="316" height="46">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13.5px/1.3 system-ui,sans-serif', color: '#0e1c2e' }}>
              {String(p)}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

export function DecayScene({ rising = false, label = 'RL', showThreshold = false, showForced = false }) {
  const c = rising ? TEAL : PURP
  return (
    <Scene caption={showForced ? 'Complete response = natural (dies) + forced (survives)' : `One time constant τ — after 5τ the transient is gone (<1%)`}>
      <Axes x="96" y="378" w="700" h="300" xLabel="t" yLabel={rising ? 'v(t)' : 'i(t)'} />
      {showForced ? (
        <>
          <path d={expPath(96, 378, 660, 110)} fill="none" stroke={PURP} strokeWidth="2.8" strokeDasharray="8 6" />
          <L x="240" y="250" size={13} fill={PURP}>natural — decays</L>
          <Wire d="M96 268 L796 268" stroke={TEAL} width="2.8" dash="8 6" />
          <L x="700" y="252" size={13} fill={TEAL}>forced — survives</L>
          <path d={expPath(96, 268, 660, -110, true)} fill="none" stroke={AMBER} strokeWidth="3.4" className="nam-draw" />
          <L x="470" y="150" size={14} fill={AMBER}>sum = what the meter reads</L>
        </>
      ) : (
        <>
          <path d={expPath(96, 378, 660, 250, rising)} fill="none" stroke={c} strokeWidth="3.6" className="nam-draw" />
          <circle
            cx="96"
            cy={rising ? 378 : 128}
            r="8"
            fill={AMBER}
            className="nam-decay-dot"
            style={{ '--nam-dx': '640px', '--nam-dy': rising ? '-230px' : '230px' }}
          />
        </>
      )}
      {[1, 2, 3, 5].map((k) => (
        <g key={k}>
          <Wire d={`M${96 + k * 122} 378 L${96 + k * 122} 348`} stroke={MUTED} width="1.8" />
          <L x={96 + k * 122} y={400} size={12.5} fill={MUTED} weight={700}>{`${k}τ`}</L>
        </g>
      ))}
      {showThreshold ? (
        <>
          <Wire d="M96 228 L796 228" stroke={RED} dash="8 6" width="2.4" />
          <L x="820" y="224" size={13} fill={RED} anchor="end">V_threshold</L>
          <circle cx="330" cy="228" r="8" fill={RED} className="nam-flux" />
          <L x="330" y="204" size={13} fill={RED}>t_delay = τ·ln(...)</L>
        </>
      ) : null}
      <rect x="120" y="424" width="660" height="56" rx="11" fill={WHITE} stroke={c} strokeWidth="2.4" />
      <L x="450" y="459" size={17} fill={c}>{label === 'RL' ? 'τ = L / R' : 'τ = R · C'}</L>
    </Scene>
  )
}

export function ExponentialPropsScene() {
  const props = [
    ['Initial slope', 'the tangent at t=0 hits zero at exactly t = τ', BLUE],
    ['Fixed fraction', 'every τ removes the same 63.2% of what is left', AMBER],
    ['Practical end', 'after 5τ less than 1% remains — call it settled', GREEN],
  ]
  return (
    <Scene caption="Three properties that let you read a scope trace without algebra">
      <Axes x="80" y="300" w="380" h="220" xLabel="t" />
      <path d={expPath(80, 300, 360, 190)} fill="none" stroke={PURP} strokeWidth="3.4" className="nam-draw" />
      <Wire d="M80 110 L188 300" stroke={AMBER} width="2.4" dash="7 6" />
      <L x="188" y="326" size={13} fill={AMBER}>τ</L>
      <circle cx="188" cy="230" r="7" fill={AMBER} className="nam-flux" />
      <L x="270" y="200" size={13} fill={MUTED} weight={700}>0.368 × initial</L>
      {props.map(([t, s, c], i) => (
        <g key={t} className={`nam-cell-in nam-delay-${i}`}>
          <rect x="492" y={76 + i * 122} width="352" height="102" rx="12" fill={WHITE} stroke={c} strokeWidth="2.5" />
          <L x="668" y={112 + i * 122} size={15.5} fill={c}>{t}</L>
          <foreignObject x="512" y={122 + i * 122} width="312" height="48">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13px/1.3 system-ui,sans-serif', color: '#4f6076', textAlign: 'center' }}>
              {s}
            </div>
          </foreignObject>
        </g>
      ))}
      <L x="270" y="440" size={14} fill={N} weight={800}>τ is read off the curve, not computed from it</L>
    </Scene>
  )
}

export function StepPulseScene({ synthesis = false }) {
  return (
    <Scene caption={synthesis ? 'Any switched waveform = a sum of shifted steps and ramps' : 'u(t) is a switch written as algebra'}>
      <Axes x="80" y="200" w="350" h="130" xLabel="t" yLabel="u(t)" />
      <Wire d="M80 200 L200 200 L200 100 L420 100" stroke={BLUE} width="3.4" className="nam-draw" />
      <L x="200" y="226" size={13} fill={MUTED} weight={700}>t = 0</L>
      <L x="330" y="82" size={13.5} fill={BLUE}>u(t)</L>

      <Axes x="480" y="200" w="350" h="130" xLabel="t" yLabel="" />
      <Wire d="M480 200 L560 200 L560 100 L680 100 L680 200 L820 200" stroke={AMBER} width="3.4" className="nam-draw" />
      <L x="620" y="82" size={13.5} fill={AMBER}>u(t−a) − u(t−b)</L>
      <L x="620" y="226" size={12.5} fill={MUTED} weight={700}>a rectangular pulse, built from two steps</L>

      <rect x="56" y="272" width="788" height="200" rx="13" fill={WHITE} stroke={GREEN} strokeWidth="2.5" />
      <L x="450" y="306" size={16} fill={GREEN}>{synthesis ? 'Synthesis recipe' : 'Why bother'}</L>
      {(synthesis
        ? ['Identify every breakpoint in the waveform', 'At each breakpoint, add the change in slope as a shifted ramp', 'Add the change in level as a shifted step', 'Verify by evaluating between breakpoints']
        : ['Switching becomes multiplication, not a separate circuit', 'The source expression is valid for all t, so one solution covers all intervals', 'Laplace transforms of shifted steps are immediate', 'Impulse δ(t) is the derivative of u(t)']
      ).map((s, i) => (
        <g key={s} className={`nam-slide-in nam-delay-${i}`}>
          <circle cx="94" cy={344 + i * 34} r="6" fill={GREEN} />
          <L x="114" y={350 + i * 34} size={13.5} anchor="start">{s}</L>
        </g>
      ))}
    </Scene>
  )
}

export function DampingScene({ pair = false }) {
  if (pair) {
    return (
      <Scene caption="Critically damped is the fastest approach with no overshoot — underdamped is faster but rings">
        <Axes x="90" y="380" w="720" h="300" xLabel="t" yLabel="v(t)" />
        <Wire d="M90 200 L810 200" stroke={MUTED} dash="6 6" width="1.8" />
        <L x="836" y="196" size={12.5} fill={MUTED} anchor="end">final value</L>
        <path d={dampedPath(90, 200, 700, -170, 4.6, 0.1)} fill="none" stroke={GREEN} strokeWidth="3.4" className="nam-draw" />
        <L x="330" y="152" size={14} fill={GREEN}>critically damped — α = ω₀</L>
        <path d={dampedPath(90, 200, 700, -170, 2.2, 17)} fill="none" stroke={AMBER} strokeWidth="3.2" className="nam-draw nam-delay-2" />
        <L x="600" y="132" size={14} fill={AMBER}>underdamped — α &lt; ω₀</L>
        <circle cx="222" cy="120" r="8" fill={AMBER} className="nam-ring" />
        <rect x="120" y="416" width="660" height="60" rx="12" fill={SKY} stroke={N} strokeWidth="2.2" />
        <L x="450" y="446" size={14.5}>ω_d = √(ω₀² − α²) — the ringing frequency, always below ω₀</L>
        <L x="450" y="470" size={12.5} fill={MUTED} weight={700}>Critical damping is a single point, never reached exactly in hardware</L>
      </Scene>
    )
  }
  const cases = [
    ['Overdamped', 'α > ω₀', 'two real roots — no oscillation', BLUE],
    ['Critically damped', 'α = ω₀', 'repeated root — fastest, no overshoot', GREEN],
    ['Underdamped', 'α < ω₀', 'complex pair — rings at ω_d', AMBER],
  ]
  return (
    <Scene caption="One comparison — α against ω₀ — decides the entire shape of the response">
      <Axes x="70" y="300" w="440" h="230" xLabel="t" />
      <Wire d="M70 150 L510 150" stroke={MUTED} dash="6 6" width="1.6" />
      <path d={dampedPath(70, 150, 430, -120, 7, 0.1)} fill="none" stroke={BLUE} strokeWidth="3" className="nam-draw" />
      <path d={dampedPath(70, 150, 430, -120, 4.4, 0.1)} fill="none" stroke={GREEN} strokeWidth="3" className="nam-draw nam-delay-1" />
      <path d={dampedPath(70, 150, 430, -120, 1.9, 18)} fill="none" stroke={AMBER} strokeWidth="3" className="nam-draw nam-delay-2" />
      {cases.map(([t, cond, why, c], i) => (
        <g key={t} className={`nam-cell-in nam-delay-${i}`}>
          <rect x="540" y={72 + i * 116} width="304" height="98" rx="12" fill={WHITE} stroke={c} strokeWidth="2.6" />
          <L x="692" y={104 + i * 116} size={15.5} fill={c}>{t}</L>
          <L x="692" y={134 + i * 116} size={17} fill={N}>{cond}</L>
          <L x="692" y={158 + i * 116} size={12} fill={MUTED} weight={700}>{why}</L>
        </g>
      ))}
      <rect x="70" y="374" width="440" height="102" rx="12" fill={SKY} stroke={PURP} strokeWidth="2.3" />
      <L x="290" y="406" size={14.5} fill={PURP}>parallel RLC:  α = 1 / 2RC</L>
      <L x="290" y="436" size={14.5} fill={PURP}>series RLC:  α = R / 2L</L>
      <L x="290" y="464" size={12.5} fill={RED} weight={800}>the two formulas are not interchangeable</L>
    </Scene>
  )
}

export function AcSwitchScene() {
  return (
    <Scene caption="Where on the cycle you close the switch changes the transient, not the steady state">
      <Axes x="80" y="260" w="740" h="180" xLabel="t" />
      <path d={sinePath(80, 260, 740, 100, 3)} fill="none" stroke={TEAL} strokeWidth="2.6" strokeDasharray="7 6" />
      <L x="700" y="146" size={13} fill={TEAL}>steady state — same for every switching angle</L>
      <g className="nam-switch" style={{ transformOrigin: '200px 260px' }}>
        <Wire d="M200 260 L250 232" stroke={AMBER} width="3.4" />
      </g>
      <Dot cx="200" cy="260" r="7" fill={AMBER} />
      <L x="200" y="300" size={13} fill={AMBER}>switch closes at ωt = θ</L>
      <path d={expPath(200, 260, 420, 80)} fill="none" stroke={PURP} strokeWidth="3" className="nam-draw" />
      <L x="420" y="204" size={13} fill={PURP}>DC offset transient — depends on θ</L>
      <rect x="56" y="330" width="392" height="144" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <L x="252" y="362" size={15} fill={GREEN}>Worst case</L>
      <L x="252" y="398" size={14} fill={N}>closing at the zero crossing of the</L>
      <L x="252" y="424" size={14} fill={N}>steady-state current → largest offset</L>
      <L x="252" y="456" size={12.5} fill={MUTED} weight={700}>this is why transformers inrush</L>
      <rect x="464" y="330" width="380" height="144" rx="12" fill={SKY} stroke={PURP} strokeWidth="2.4" />
      <L x="654" y="362" size={15} fill={PURP}>Lossless LC</L>
      <L x="654" y="398" size={14} fill={N}>R = 0 → α = 0 → nothing decays</L>
      <L x="654" y="424" size={14} fill={N}>oscillation continues forever</L>
      <L x="654" y="456" size={12.5} fill={MUTED} weight={700}>the ideal limit no hardware reaches</L>
    </Scene>
  )
}

export function SequentialIntervalsScene() {
  const ivs = [
    ['t < 0', 'steady state before any switching', BLUE],
    ['0 < t < t₁', 'first transient — find IC at 0⁺', AMBER],
    ['t₁ < t < t₂', 'second transient — IC is the END of interval 1', PURP],
    ['t > t₂', 'final steady state', GREEN],
  ]
  return (
    <Scene caption="Each interval hands its final value to the next as an initial condition">
      <Wire d="M60 128 L840 128" stroke={N} width="3" />
      {[248, 448, 648].map((x, i) => (
        <g key={x}>
          <Wire d={`M${x} 106 L${x} 150`} stroke={AMBER} width="3" />
          <L x={x} y={96} size={13} fill={AMBER}>{`t${i + 1 <= 2 ? i + 1 : '₃'}`}</L>
        </g>
      ))}
      {ivs.map(([t, s, c], i) => (
        <g key={t} className={`nam-slide-in nam-delay-${i}`}>
          <rect x={60 + i * 200} y="176" width="180" height="120" rx="12" fill={WHITE} stroke={c} strokeWidth="2.6" />
          <L x={150 + i * 200} y="212" size={15} fill={c}>{t}</L>
          <foreignObject x={74 + i * 200} y="224" width="152" height="66">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 12.5px/1.3 system-ui,sans-serif', color: '#4f6076', textAlign: 'center' }}>
              {s}
            </div>
          </foreignObject>
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <Wire key={i} d={`M${240 + i * 200} 236 L${262 + i * 200} 236`} stroke={MUTED} width="2.4" marker="url(#naArr)" />
      ))}
      <rect x="120" y="340" width="660" height="126" rx="12" fill={SKY} stroke={GREEN} strokeWidth="2.4" />
      <L x="450" y="374" size={15.5} fill={GREEN}>The only rule you need</L>
      <L x="450" y="410" size={15} fill={N}>v_C and i_L are continuous ACROSS every switching instant</L>
      <L x="450" y="444" size={13} fill={RED} weight={800}>Re-deriving the IC from the source instead of from the previous interval is the classic error</L>
    </Scene>
  )
}

/* ── Module 4 — Laplace ─────────────────────────────────────────── */

export function LaplaceAnatomyScene() {
  return (
    <Scene caption="Multiply by a decaying probe, integrate away time — what is left is a function of s">
      <rect x="120" y="96" width="660" height="128" rx="14" fill={WHITE} stroke={TEAL} strokeWidth="2.8" />
      <L x="450" y="172" size={34} fill={N}>F(s) = ∫₀^∞ f(t) · e^(−st) dt</L>
      <g className="nam-charge">
        <Wire d="M268 232 L268 276" stroke={BLUE} width="2.4" marker="url(#naArrB)" />
      </g>
      <L x="268" y="300" size={13.5} fill={BLUE}>the signal</L>
      <g className="nam-charge nam-delay-2">
        <Wire d="M470 232 L470 276" stroke={AMBER} width="2.4" marker="url(#naArrA)" />
      </g>
      <L x="470" y="300" size={13.5} fill={AMBER}>the probe — e^(−st)</L>
      <g className="nam-charge nam-delay-3">
        <Wire d="M640 232 L640 276" stroke={PURP} width="2.4" marker="url(#naArrA)" />
      </g>
      <L x="640" y="300" size={13.5} fill={PURP}>time is integrated out</L>

      <rect x="56" y="330" width="380" height="144" rx="12" fill={SKY} stroke={MUTED} strokeWidth="2.2" />
      <L x="246" y="362" size={15} fill={MUTED}>Lower limit 0⁻, not 0</L>
      <L x="246" y="398" size={13.5} fill={N} weight={700}>so an impulse at the origin is captured</L>
      <L x="246" y="430" size={13.5} fill={N} weight={700}>and initial conditions enter automatically</L>
      <L x="246" y="460" size={12.5} fill={MUTED} weight={700}>this is why it beats classical solving</L>

      <rect x="464" y="330" width="380" height="144" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.4" />
      <L x="654" y="362" size={15} fill={GREEN}>s = σ + jω</L>
      <L x="654" y="398" size={13.5} fill={N} weight={700}>σ controls growth/decay</L>
      <L x="654" y="430" size={13.5} fill={N} weight={700}>ω controls oscillation</L>
      <L x="654" y="460" size={12.5} fill={MUTED} weight={700}>convergence needs Re(s) large enough</L>
    </Scene>
  )
}

export function TransformLadderScene({ rows, title = 'Transform pairs' }) {
  const data = rows || [
    ['δ(t)', '1'],
    ['u(t)', '1/s'],
    ['t·u(t)', '1/s²'],
    ['e^(−at)·u(t)', '1/(s+a)'],
    ['cos(ωt)·u(t)', 's/(s²+ω²)'],
    ['sin(ωt)·u(t)', 'ω/(s²+ω²)'],
  ]
  return (
    <Scene caption={`${title} — each rung is built from the one below, not memorised alone`}>
      <rect x="56" y="58" width="360" height="44" rx="9" fill={PURP} />
      <L x="236" y="88" size={15} fill={WHITE}>time domain f(t)</L>
      <rect x="484" y="58" width="360" height="44" rx="9" fill={TEAL} />
      <L x="664" y="88" size={15} fill={WHITE}>s domain F(s)</L>
      {data.map(([a, b], i) => (
        <g key={a} className={`nam-slide-in nam-delay-${i % 5}`}>
          <rect x="56" y={116 + i * 62} width="360" height="50" rx="9" fill={WHITE} stroke={PURP} strokeWidth="2" />
          <L x="236" y={148 + i * 62} size={16} fill={N}>{a}</L>
          <Wire d={`M424 ${141 + i * 62} L476 ${141 + i * 62}`} stroke={AMBER} width="2.6" className="nam-current" marker="url(#naArrA)" dash="8 6" />
          <rect x="484" y={116 + i * 62} width="360" height="50" rx="9" fill={WHITE} stroke={TEAL} strokeWidth="2" />
          <L x="664" y={148 + i * 62} size={16} fill={N}>{b}</L>
        </g>
      ))}
    </Scene>
  )
}

export function PartialFractionScene() {
  return (
    <Scene caption="Split the rational function into terms the table already knows">
      <rect x="180" y="72" width="540" height="88" rx="13" fill={WHITE} stroke={TEAL} strokeWidth="2.8" />
      <L x="450" y="126" size={24} fill={N}>F(s) = (2s + 10) / (s² + 3s + 2)</L>
      <Wire d="M450 168 L450 206" stroke={AMBER} width="3" className="nam-current" marker="url(#naArrA)" />
      <L x="560" y="194" size={12.5} fill={AMBER} weight={800}>factor the denominator</L>
      <rect x="180" y="214" width="540" height="72" rx="12" fill={SKY} stroke={MUTED} strokeWidth="2" />
      <L x="450" y="260" size={21} fill={N}>= (2s + 10) / ((s+1)(s+2))</L>
      <Wire d="M380 294 L260 332" stroke={BLUE} width="2.6" className="nam-current" marker="url(#naArrB)" />
      <Wire d="M520 294 L640 332" stroke={PURP} width="2.6" className="nam-current nam-delay-2" marker="url(#naArrA)" />
      <g className="nam-emerge">
        <rect x="112" y="340" width="300" height="76" rx="12" fill={WHITE} stroke={BLUE} strokeWidth="2.6" />
        <L x="262" y="384" size={20} fill={BLUE}>A / (s + 1)</L>
      </g>
      <g className="nam-emerge nam-delay-2">
        <rect x="488" y="340" width="300" height="76" rx="12" fill={WHITE} stroke={PURP} strokeWidth="2.6" />
        <L x="638" y="384" size={20} fill={PURP}>B / (s + 2)</L>
      </g>
      <L x="450" y="456" size={14} fill={RED} weight={800}>Degree of numerator ≥ denominator? Divide first — the table has no entry for that.</L>
      <L x="450" y="482" size={13} fill={MUTED} weight={700}>Repeated roots need 1/(s+a) AND 1/(s+a)²; complex roots stay as a pair</L>
    </Scene>
  )
}

export function TheoremConsoleScene({ rows, title = 'Basic theorems' }) {
  const data = rows || [
    ['Linearity', 'a·f + b·g  ↔  a·F + b·G', BLUE],
    ['Time shift', 'f(t−a)·u(t−a)  ↔  e^(−as)·F(s)', AMBER],
    ['Frequency shift', 'e^(−at)·f(t)  ↔  F(s+a)', PURP],
    ['Differentiation', "f′(t)  ↔  s·F(s) − f(0⁻)", TEAL],
    ['Integration', '∫f  ↔  F(s)/s', GREEN],
  ]
  return (
    <Scene caption={`${title} — the reason you never integrate twice`}>
      {data.map(([t, f, c], i) => (
        <g key={t} className={`nam-cell-in nam-delay-${i % 5}`}>
          <rect x="56" y={64 + i * 84} width="788" height="70" rx="12" fill={WHITE} stroke={c} strokeWidth="2.5" />
          <rect x="56" y={64 + i * 84} width="216" height="70" rx="12" fill={c} />
          <L x="164" y={106 + i * 84} size={15} fill={WHITE}>{t}</L>
          <L x="560" y={107 + i * 84} size={18} fill={N}>{f}</L>
        </g>
      ))}
      <L x="450" y="492" size={13.5} fill={RED} weight={800}>The −f(0⁻) term in differentiation IS the initial condition — dropping it is the usual error</L>
    </Scene>
  )
}

export function ValueGaugeScene() {
  return (
    <Scene caption="Two limits you can read without inverting anything">
      <rect x="60" y="76" width="380" height="330" rx="15" fill={WHITE} stroke={BLUE} strokeWidth="2.8" />
      <L x="250" y="114" size={17} fill={BLUE}>Initial value</L>
      <path d="M130 300 A 120 120 0 0 1 370 300" fill="none" stroke={SKY} strokeWidth="18" strokeLinecap="round" />
      <g className="nam-needle" style={{ transformOrigin: '250px 300px' }}>
        <Wire d="M250 300 L250 200" stroke={BLUE} width="5" />
      </g>
      <Dot cx="250" cy="300" r="9" fill={BLUE} />
      <L x="250" y="348" size={19} fill={N}>f(0⁺) = lim s·F(s)</L>
      <L x="250" y="376" size={13.5} fill={MUTED} weight={700}>as s → ∞</L>

      <rect x="460" y="76" width="380" height="330" rx="15" fill={WHITE} stroke={GREEN} strokeWidth="2.8" />
      <L x="650" y="114" size={17} fill={GREEN}>Final value</L>
      <path d="M530 300 A 120 120 0 0 1 770 300" fill="none" stroke={SKY} strokeWidth="18" strokeLinecap="round" />
      <g className="nam-needle nam-delay-2" style={{ transformOrigin: '650px 300px' }}>
        <Wire d="M650 300 L650 200" stroke={GREEN} width="5" />
      </g>
      <Dot cx="650" cy="300" r="9" fill={GREEN} />
      <L x="650" y="348" size={19} fill={N}>f(∞) = lim s·F(s)</L>
      <L x="650" y="376" size={13.5} fill={MUTED} weight={700}>as s → 0</L>
      <rect x="150" y="428" width="600" height="52" rx="11" fill={SKY} stroke={RED} strokeWidth="2.4" />
      <L x="450" y="460" size={14} fill={RED}>Final value is valid ONLY if every pole is in the left half-plane (or one at origin)</L>
    </Scene>
  )
}

export function ImpedanceGeneralScene() {
  const rows = [
    ['Resistor', 'R', 'R', BLUE],
    ['Inductor', 'jωL', 'sL', PURP],
    ['Capacitor', '1/jωC', '1/sC', TEAL],
  ]
  return (
    <Scene caption="Phasor impedance was the s = jω special case all along">
      <rect x="56" y="62" width="256" height="46" rx="9" fill={N} />
      <L x="184" y="92" size={14.5} fill={WHITE}>Element</L>
      <rect x="324" y="62" width="256" height="46" rx="9" fill={AMBER} />
      <L x="452" y="92" size={14.5} fill={WHITE}>Phasor (jω)</L>
      <rect x="592" y="62" width="252" height="46" rx="9" fill={TEAL} />
      <L x="718" y="92" size={14.5} fill={WHITE}>s domain</L>
      {rows.map(([e, p, s, c], i) => (
        <g key={e} className={`nam-cell-in nam-delay-${i}`}>
          <rect x="56" y={122 + i * 82} width="256" height="70" rx="9" fill={WHITE} stroke={c} strokeWidth="2.3" />
          <L x="184" y={164 + i * 82} size={15}>{e}</L>
          <rect x="324" y={122 + i * 82} width="256" height="70" rx="9" fill={WHITE} stroke={c} strokeWidth="2.3" />
          <L x="452" y={165 + i * 82} size={18} fill={AMBER}>{p}</L>
          <Wire d={`M588 ${157 + i * 82} L592 ${157 + i * 82}`} stroke={MUTED} width="2" />
          <rect x="592" y={122 + i * 82} width="252" height="70" rx="9" fill={SKY} stroke={c} strokeWidth="2.6" />
          <L x="718" y={165 + i * 82} size={18} fill={TEAL}>{s}</L>
        </g>
      ))}
      <rect x="56" y="378" width="788" height="102" rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.5" />
      <L x="450" y="412" size={16} fill={GREEN}>Series and parallel combination rules carry over unchanged</L>
      <L x="450" y="444" size={14.5} fill={N}>Z_series = ΣZ(s)    ·    1/Z_parallel = Σ1/Z(s)</L>
      <L x="450" y="470" size={12.5} fill={MUTED} weight={700}>Substituting s = jω recovers every phasor result from Module 1</L>
    </Scene>
  )
}

export function IcSourceScene() {
  return (
    <Scene caption="Initial conditions become sources — no separate boundary step survives">
      <rect x="56" y="70" width="388" height="180" rx="13" fill={WHITE} stroke={PURP} strokeWidth="2.6" />
      <L x="250" y="102" size={16} fill={PURP}>Inductor with i(0⁻) = I₀</L>
      <Ind x="120" y="164" label="sL" />
      <Wire d="M180 164 L240 164" stroke={N} />
      <SrcV cx="286" cy="164" r="24" label="L·I₀" stroke={PURP} />
      <L x="250" y="230" size={13} fill={MUTED} weight={700}>a series voltage source, polarity with i</L>

      <rect x="56" y="270" width="388" height="180" rx="13" fill={WHITE} stroke={TEAL} strokeWidth="2.6" />
      <L x="250" y="302" size={16} fill={TEAL}>Capacitor with v(0⁻) = V₀</L>
      <Cap x="120" y="364" label="1/sC" />
      <Wire d="M180 364 L240 364" stroke={N} />
      <SrcV cx="286" cy="364" r="24" label="V₀/s" stroke={TEAL} />
      <L x="250" y="430" size={13} fill={MUTED} weight={700}>a series source — or I = C·V₀ in parallel</L>

      <rect x="472" y="70" width="372" height="380" rx="13" fill={SKY} stroke={GREEN} strokeWidth="2.6" />
      <L x="658" y="106" size={16} fill={GREEN}>What this buys you</L>
      {[
        'Write one s-domain circuit, solve once',
        'No separate 0⁺ evaluation step',
        'Natural and forced response appear together',
        'Nodal / mesh work unchanged on the new circuit',
        'Sign errors become visible as a wrong final value',
      ].map((t, i) => (
        <g key={t} className={`nam-slide-in nam-delay-${i}`}>
          <circle cx="504" cy={156 + i * 58} r="7" fill={GREEN} />
          <foreignObject x="522" y={134 + i * 58} width="306" height="48">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13.5px/1.3 system-ui,sans-serif', color: '#0e1c2e' }}>
              {t}
            </div>
          </foreignObject>
        </g>
      ))}
    </Scene>
  )
}

export function PoleZeroScene({ mode = 'map' }) {
  // Conjugate pair in the LEFT half-plane — a decaying response. The drift
  // carries them toward the jω axis: closer means slower decay, longer ringing.
  const poles = [
    { x: 190, y: 180 },
    { x: 190, y: 320 },
  ]
  return (
    <Scene caption={mode === 'atlas' ? 'Where the pole sits IS the shape of the natural response' : 'Pole position fixes decay rate and ringing frequency'}>
      <rect x="56" y="62" width="404" height="378" rx="13" fill={WHITE} stroke={MUTED} strokeWidth="2" />
      <Wire d="M76 250 L440 250" stroke={MUTED} width="2" marker="url(#naArr)" />
      <Wire d="M258 428 L258 78" stroke={MUTED} width="2" marker="url(#naArr)" />
      <L x="446" y="244" size={13} fill={MUTED} anchor="end">σ</L>
      <L x="258" y="70" size={13} fill={MUTED}>jω</L>
      <rect x="76" y="78" width="182" height="350" fill={GREEN} opacity="0.07" />
      <L x="150" y="106" size={12.5} fill={GREEN} weight={800}>stable half</L>
      <L x="360" y="106" size={12.5} fill={RED} weight={800}>unstable half</L>
      {poles.map((p, i) => (
        <g key={i} className="nam-pole-drift" style={{ '--nam-px': '56px' }}>
          <path d={`M${p.x - 9} ${p.y - 9} L${p.x + 9} ${p.y + 9} M${p.x + 9} ${p.y - 9} L${p.x - 9} ${p.y + 9}`} stroke={RED} strokeWidth="3.4" />
        </g>
      ))}
      <L x="190" y="356" size={12.5} fill={RED} weight={700}>conjugate pole pair</L>
      <circle cx="112" cy="250" r="10" fill="none" stroke={BLUE} strokeWidth="3" />
      <L x="112" y="282" size={12.5} fill={BLUE} weight={700}>zero</L>
      <Wire d="M258 250 L190 180" stroke={AMBER} width="2.4" dash="6 5" />
      <L x="196" y="146" size={12.5} fill={AMBER} weight={700}>|distance| = ω₀</L>

      <Axes x="500" y="360" w="330" h="250" xLabel="t" />
      {mode === 'atlas' ? (
        <>
          <path d={dampedPath(500, 220, 320, -90, 1.4, 20)} fill="none" stroke={RED} strokeWidth="3" className="nam-draw" />
          <L x="666" y="110" size={13.5} fill={RED}>pole near jω axis → long ringing</L>
          <path d={expPath(500, 360, 320, 120)} fill="none" stroke={GREEN} strokeWidth="3" className="nam-draw nam-delay-2" />
          <L x="700" y="300" size={13} fill={GREEN}>pole far left → fast decay</L>
        </>
      ) : (
        <>
          <path d={dampedPath(500, 250, 320, -110, 2.4, 16)} fill="none" stroke={AMBER} strokeWidth="3.2" className="nam-draw" />
          <L x="666" y="122" size={13.5} fill={AMBER}>Re(pole) → envelope e^(σt)</L>
          <L x="666" y="418" size={13.5} fill={PURP}>Im(pole) → ringing frequency ω_d</L>
        </>
      )}
      <L x="666" y="462" size={13} fill={MUTED} weight={800}>Zeros shape the amplitude; poles alone set the natural terms</L>
    </Scene>
  )
}

export function ThreeResponsesScene() {
  return (
    <Scene caption="Impulse → step → ramp: each is the integral of the one before">
      {[
        ['Impulse δ(t)', 'h(t)', BLUE, 0],
        ['Step u(t)', '∫h dt', AMBER, 1],
        ['Ramp t·u(t)', '∫∫h dt', GREEN, 2],
      ].map(([t, f, c, i]) => (
        <g key={t} className={`nam-cell-in nam-delay-${i}`}>
          <rect x="56" y={66 + i * 134} width="240" height="118" rx="12" fill={WHITE} stroke={c} strokeWidth="2.6" />
          <L x="176" y={112 + i * 134} size={16} fill={c}>{t}</L>
          <L x="176" y={148 + i * 134} size={18} fill={N}>{f}</L>
          {i < 2 ? (
            <Wire d={`M176 ${184 + i * 134} L176 ${200 + i * 134}`} stroke={MUTED} width="2.4" marker="url(#naArr)" />
          ) : null}
        </g>
      ))}
      <L x="176" y="484" size={13} fill={MUTED} weight={800}>integrate downward, differentiate upward</L>
      <Axes x="350" y="150" w="480" h="90" />
      <Wire d="M400 150 L400 70" stroke={BLUE} width="4" marker="url(#naArrB)" />
      <path d={dampedPath(400, 150, 420, -50, 3, 14)} fill="none" stroke={BLUE} strokeWidth="2.8" className="nam-draw" />
      <Axes x="350" y="284" w="480" h="90" />
      <path d={expPath(400, 284, 420, 70, true)} fill="none" stroke={AMBER} strokeWidth="2.8" className="nam-draw nam-delay-1" />
      <Axes x="350" y="418" w="480" h="90" />
      <Wire d="M400 418 L790 336" stroke={GREEN} width="2.8" className="nam-draw nam-delay-2" />
    </Scene>
  )
}

export function ConvolutionScene() {
  return (
    <Scene caption="Flip one signal, slide it across, integrate the overlap at every shift">
      <L x="170" y="70" size={15} fill={BLUE}>x(τ)</L>
      <Axes x="70" y="160" w="220" h="90" />
      <Wire d="M110 160 L110 100 L200 100 L200 160" stroke={BLUE} width="3" />
      <L x="640" y="70" size={15} fill={AMBER}>h(t − τ) — flipped, then shifted</L>
      <Axes x="470" y="160" w="360" h="90" />
      <g className="nam-flip" style={{ transformOrigin: '600px 130px' }}>
        <Wire d="M540 160 L540 104 L660 130 L660 160" stroke={AMBER} width="3" />
      </g>
      <Wire d="M470 200 L830 200" stroke={MUTED} dash="6 6" width="1.6" />
      <g className="nam-sweep-x" style={{ '--nam-sweep': '250px' }}>
        <Wire d="M500 84 L500 232" stroke={PURP} width="2.6" />
        <L x="500" y="72" size={12.5} fill={PURP}>t</L>
      </g>

      <rect x="70" y="256" width="760" height="120" rx="13" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
      <L x="450" y="308" size={24} fill={N}>y(t) = ∫₀^t x(τ) · h(t − τ) dτ</L>
      <L x="450" y="346" size={13.5} fill={MUTED} weight={700}>the shaded overlap area, plotted against t</L>

      <rect x="70" y="396" width="760" height="82" rx="12" fill={SKY} stroke={TEAL} strokeWidth="2.4" />
      <L x="450" y="428" size={16} fill={TEAL}>In the s-domain this whole operation is Y(s) = X(s)·H(s)</L>
      <L x="450" y="458" size={13} fill={MUTED} weight={700}>which is exactly why engineers transform instead of convolving</L>
    </Scene>
  )
}

export function SynthesisScene() {
  const steps = [
    'Start from the required H(s)',
    'Check realisability — poles in the left half-plane, proper degree',
    'Choose a topology the form can be realised in',
    'Match coefficients to element values',
    'Verify by analysing the synthesised network forward',
  ]
  return (
    <Scene caption="Synthesis is analysis run backwards — and the answer is not unique">
      <rect x="56" y="62" width="360" height="66" rx="12" fill={TEAL} />
      <L x="236" y="104" size={17} fill={WHITE}>Specified H(s)</L>
      <Wire d="M236 132 L236 172" stroke={AMBER} width="3" className="nam-current" marker="url(#naArrA)" />
      {steps.slice(1).map((s, i) => (
        <g key={s} className={`nam-slide-in nam-delay-${i}`}>
          <rect x="56" y={180 + i * 74} width="360" height="62" rx="11" fill={WHITE} stroke={BLUE} strokeWidth="2.3" />
          <foreignObject x="72" y={190 + i * 74} width="330" height="46">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13px/1.28 system-ui,sans-serif', color: '#0e1c2e', display: 'flex', alignItems: 'center', height: '100%' }}>
              {s}
            </div>
          </foreignObject>
        </g>
      ))}
      <rect x="456" y="62" width="388" height="412" rx="13" fill={SKY} stroke={GREEN} strokeWidth="2.6" />
      <L x="650" y="98" size={16} fill={GREEN}>Many networks, one H(s)</L>
      <g className="nam-cell-in">
        <Res x="512" y="180" label="R" />
        <Cap x="612" y="180" label="C" />
        <L x="650" y="220" size={13} fill={MUTED} weight={700}>RC realisation</L>
      </g>
      <g className="nam-cell-in nam-delay-2">
        <Ind x="512" y="300" label="L" />
        <Res x="612" y="300" label="R" />
        <L x="650" y="340" size={13} fill={MUTED} weight={700}>RL realisation</L>
      </g>
      <L x="650" y="400" size={14} fill={N} weight={800}>Identical transfer function</L>
      <L x="650" y="432" size={13} fill={MUTED} weight={700}>Cost, tolerance and component count decide</L>
    </Scene>
  )
}

/* ── Module 5 — two-port networks ───────────────────────────────── */

export function OnePortScene() {
  return (
    <Scene caption="One port = one terminal pair with equal and opposite current — that is the whole condition">
      <rect x="240" y="120" width="300" height="220" rx="14" fill={WHITE} stroke={BLUE} strokeWidth="2.8" />
      <L x="390" y="236" size={18} fill={BLUE}>linear network</L>
      <Wire d="M140 170 L240 170" stroke={AMBER} width="3.4" className="nam-current" marker="url(#naArrA)" />
      <L x="188" y="150" size={14} fill={AMBER}>I</L>
      <Wire d="M240 290 L140 290" stroke={AMBER} width="3.4" className="nam-current-rev" marker="url(#naArrA)" />
      <L x="188" y="316" size={14} fill={AMBER}>I</L>
      <Dot cx="140" cy="170" r="7" />
      <Dot cx="140" cy="290" r="7" />
      <Wire d="M108 170 L108 290" stroke={BLUE} width="2.4" dash="7 6" />
      <L x="76" y="236" size={14} fill={BLUE}>V</L>
      <rect x="576" y="120" width="268" height="220" rx="13" fill={SKY} stroke={TEAL} strokeWidth="2.5" />
      <L x="710" y="164" size={15} fill={TEAL}>Driving-point impedance</L>
      <L x="710" y="220" size={26} fill={N}>Z(s) = V / I</L>
      <L x="710" y="266" size={13} fill={MUTED} weight={700}>one complex number per frequency</L>
      <L x="710" y="300" size={13} fill={MUTED} weight={700}>tells you nothing about the inside</L>
      <rect x="140" y="378" width="704" height="96" rx="12" fill={WHITE} stroke={RED} strokeWidth="2.4" />
      <L x="492" y="412" size={15} fill={RED}>If the two currents differ, it is not a port</L>
      <L x="492" y="444" size={13.5} fill={MUTED} weight={700}>A third connection to the outside world breaks the port condition silently</L>
    </Scene>
  )
}

export function TwoPortScene({ param = 'box' }) {
  const spec = {
    box: { title: 'Two-port black box', eq: ['V₁, I₁', 'V₂, I₂'], note: 'Four terminal quantities; two equations relate them — so four parameters suffice.', c: BLUE },
    y: { title: 'y parameters — short-circuit admittances', eq: ['I₁ = y₁₁V₁ + y₁₂V₂', 'I₂ = y₂₁V₁ + y₂₂V₂'], note: 'Each y is measured with the OTHER port SHORTED.', c: AMBER },
    z: { title: 'z parameters — open-circuit impedances', eq: ['V₁ = z₁₁I₁ + z₁₂I₂', 'V₂ = z₂₁I₁ + z₂₂I₂'], note: 'Each z is measured with the OTHER port OPEN.', c: TEAL },
    h: { title: 'h parameters — hybrid', eq: ['V₁ = h₁₁I₁ + h₁₂V₂', 'I₂ = h₂₁I₁ + h₂₂V₂'], note: 'Mixed units — h₁₁ in Ω, h₂₂ in S, h₁₂ and h₂₁ dimensionless. This is the transistor set.', c: PURP },
    abcd: { title: 'ABCD — transmission parameters', eq: ['V₁ = A·V₂ − B·I₂', 'I₁ = C·V₂ − D·I₂'], note: 'Note the minus signs: I₂ is defined leaving the network, so cascades multiply cleanly.', c: GREEN },
  }[param] || {}
  return (
    <Scene caption={spec.note}>
      <L x="450" y="58" size={17} fill={spec.c}>{spec.title}</L>
      <rect x="320" y="120" width="260" height="190" rx="14" fill={WHITE} stroke={spec.c} strokeWidth="3" />
      <L x="450" y="222" size={17} fill={spec.c}>N</L>
      <Wire d="M170 164 L320 164" stroke={BLUE} width="3.2" className="nam-current" marker="url(#naArrB)" />
      <L x="244" y="146" size={14} fill={BLUE}>I₁</L>
      <Wire d="M320 266 L170 266" stroke={BLUE} width="3.2" className="nam-current-rev" />
      <Dot cx="170" cy="164" r="7" />
      <Dot cx="170" cy="266" r="7" />
      <Wire d="M138 164 L138 266" stroke={BLUE} width="2.2" dash="6 6" />
      <L x="110" y="220" size={14} fill={BLUE}>V₁</L>
      <Wire d="M580 164 L730 164" stroke={AMBER} width="3.2" className="nam-current" marker="url(#naArrA)" />
      <L x="656" y="146" size={14} fill={AMBER}>I₂</L>
      <Wire d="M730 266 L580 266" stroke={AMBER} width="3.2" className="nam-current-rev" />
      <Dot cx="730" cy="164" r="7" />
      <Dot cx="730" cy="266" r="7" />
      <Wire d="M762 164 L762 266" stroke={AMBER} width="2.2" dash="6 6" />
      <L x="792" y="220" size={14} fill={AMBER}>V₂</L>
      {param === 'y' ? (
        <>
          <Wire d="M730 164 L730 266" stroke={RED} width="4" className="nam-charge" />
          <L x="730" y="300" size={13} fill={RED}>port 2 shorted</L>
        </>
      ) : null}
      {param === 'z' ? (
        <>
          <circle cx="730" cy="215" r="14" fill="none" stroke={RED} strokeWidth="3.4" className="nam-charge" />
          <L x="730" y="300" size={13} fill={RED}>port 2 open</L>
        </>
      ) : null}
      {(spec.eq || []).map((e, i) => (
        <g key={e} className={`nam-cell-in nam-delay-${i}`}>
          <rect x="140" y={350 + i * 64} width="620" height="54" rx="11" fill={SKY} stroke={spec.c} strokeWidth="2.3" />
          <L x="450" y={385 + i * 64} size={19} fill={N}>{e}</L>
        </g>
      ))}
    </Scene>
  )
}

export function PiTModelScene() {
  return (
    <Scene caption="Every y set has a π circuit; every z set has a T circuit — the parameters ARE the elements">
      <L x="240" y="66" size={16} fill={AMBER}>π model ← y parameters</L>
      <Wire d="M90 200 L400 200 M90 330 L400 330" stroke={N} width="2.6" />
      <Res x="215" y="200" label="−y₁₂" stroke={AMBER} />
      <Wire d="M140 200 L140 330 M350 200 L350 330" stroke={N} width="2.4" />
      <Res x="110" y="252" label="y₁₁+y₁₂" stroke={AMBER} />
      <Res x="320" y="252" label="y₂₂+y₁₂" stroke={AMBER} />
      <Dot cx="90" cy="200" r="6" />
      <Dot cx="400" cy="200" r="6" />

      <L x="660" y="66" size={16} fill={TEAL}>T model ← z parameters</L>
      <Wire d="M510 200 L820 200 M510 330 L820 330" stroke={N} width="2.6" />
      <Res x="540" y="200" label="z₁₁−z₁₂" stroke={TEAL} />
      <Res x="730" y="200" label="z₂₂−z₁₂" stroke={TEAL} />
      <Wire d="M665 200 L665 254" stroke={N} width="2.4" />
      <Res x="635" y="284" label="z₁₂" stroke={TEAL} />
      <Dot cx="665" cy="200" r="7" fill={TEAL} className="nam-flux" />

      <rect x="110" y="386" width="680" height="88" rx="12" fill={SKY} stroke={GREEN} strokeWidth="2.5" />
      <L x="450" y="418" size={15} fill={GREEN}>Only valid for reciprocal networks — three elements cannot encode four independent numbers</L>
      <L x="450" y="450" size={13} fill={MUTED} weight={700}>A non-reciprocal two-port needs a controlled source in the model</L>
    </Scene>
  )
}

/**
 * visualSpec: three boxes in signal order with their own matrices, brackets
 * grouping them into one equivalent, a struck-through "H₁×H₂×H₃ ignores
 * loading" panel, and a ladder strip of alternating series/shunt matrices.
 */
export function CascadeScene() {
  const hues = [BLUE, AMBER, TEAL]
  return (
    <Scene caption="Cascade = ordered matrix product; multiplying transfer functions ignores loading">
      {[0, 1, 2].map((i) => (
        <g key={i} className={`nam-cell-in nam-delay-${i}`}>
          <rect x={96 + i * 176} y="62" width="146" height="104" rx="12" fill={WHITE} stroke={hues[i]} strokeWidth="2.8" />
          <L x={169 + i * 176} y="106" size={16} fill={hues[i]}>{`N${i + 1}`}</L>
          <L x={169 + i * 176} y="136" size={13} fill={MUTED} weight={700}>{`[T${i + 1}]`}</L>
        </g>
      ))}
      <Wire d="M44 114 L96 114" stroke={N} width="3" className="nam-current" marker="url(#naArr)" />
      <Wire d="M242 114 L272 114" stroke={N} width="3" className="nam-current nam-delay-1" marker="url(#naArr)" />
      <Wire d="M418 114 L448 114" stroke={N} width="3" className="nam-current nam-delay-2" marker="url(#naArr)" />
      <Wire d="M594 114 L640 114" stroke={N} width="3" className="nam-current nam-delay-3" marker="url(#naArr)" />
      {/* Bracket sweeping the three stages into one equivalent two-port. */}
      <Wire d="M96 180 L96 194 L594 194 L594 180" stroke={GREEN} width="2.4" />
      <Wire d="M345 194 L345 210" stroke={GREEN} width="2.4" marker="url(#naArrG)" />
      <g className="nam-emerge nam-delay-3">
        <rect x="186" y="214" width="320" height="62" rx="12" fill={SKY} stroke={GREEN} strokeWidth="2.6" />
        <L x="346" y="253" size={20} fill={N}>[T] = [T₁]·[T₂]·[T₃]</L>
      </g>

      <rect x="640" y="62" width="216" height="214" rx="13" fill="#fdf1f1" stroke={RED} strokeWidth="2.6" />
      <L x="748" y="92" size={14} fill={RED}>The naive route</L>
      <L x="748" y="140" size={18} fill={MUTED}>H₁ × H₂ × H₃</L>
      <Wire d="M664 134 L832 146" stroke={RED} width="3" className="nam-charge" />
      <L x="748" y="182" size={12.5} fill={RED} weight={800}>ignores loading</L>
      <L x="748" y="212" size={12} fill={MUTED} weight={700}>each stage loads the one</L>
      <L x="748" y="234" size={12} fill={MUTED} weight={700}>before it — the gains</L>
      <L x="748" y="256" size={12} fill={MUTED} weight={700}>are not independent</L>

      <L x="450" y="308" size={13.5} fill={MUTED} weight={800}>A ladder is just alternating series and shunt matrices</L>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className={`nam-slide-in nam-delay-${i}`}>
          <rect x={112 + i * 178} y="326" width="158" height="72" rx="11" fill={WHITE} stroke={i % 2 ? PURP : TEAL} strokeWidth="2.4" />
          <L x={191 + i * 178} y="352" size={12} fill={i % 2 ? PURP : TEAL} weight={800}>{i % 2 ? 'shunt Y' : 'series Z'}</L>
          <L x={191 + i * 178} y="380" size={15} fill={N}>{i % 2 ? '[[1,0],[Y,1]]' : '[[1,Z],[0,1]]'}</L>
        </g>
      ))}
      <L x="450" y="438" size={13.5} fill={RED} weight={800}>Matrix multiplication does not commute — reversing the order is a different network</L>
      <L x="450" y="464" size={12.5} fill={MUTED} weight={700}>The −I₂ sign convention is exactly what makes the product work</L>
    </Scene>
  )
}

export function ZinScene({ output = false }) {
  const c = output ? AMBER : BLUE
  return (
    <Scene caption={output ? 'Z_out looks back from port 2 and depends on the SOURCE impedance' : 'Z_in looks into port 1 and depends on the LOAD'}>
      <rect x="330" y="140" width="240" height="180" rx="14" fill={WHITE} stroke={TEAL} strokeWidth="2.8" />
      <L x="450" y="238" size={17} fill={TEAL}>[z] or [ABCD]</L>
      {output ? (
        <>
          <Res x="200" y="230" label="Z_S" stroke={MUTED} />
          <Wire d="M260 230 L330 230" stroke={MUTED} width="2.6" />
          <Wire d="M570 230 L760 230" stroke={AMBER} width="3.2" className="nam-current-rev" marker="url(#naArrA)" />
          <L x="700" y="200" size={16} fill={AMBER}>Z_out ←</L>
        </>
      ) : (
        <>
          <Wire d="M140 230 L330 230" stroke={BLUE} width="3.2" className="nam-current" marker="url(#naArrB)" />
          <L x="210" y="200" size={16} fill={BLUE}>→ Z_in</L>
          <Wire d="M570 230 L660 230" stroke={MUTED} width="2.6" />
          <Res x="660" y="230" label="Z_L" stroke={MUTED} />
        </>
      )}
      <g className="nam-probe" style={{ '--nam-probe': output ? '-90px' : '90px' }}>
        <circle cx={output ? 700 : 200} cy="230" r="10" fill={c} opacity="0.5" />
      </g>
      <rect x="120" y="356" width="660" height="118" rx="12" fill={SKY} stroke={c} strokeWidth="2.6" />
      <L x="450" y="392" size={19} fill={N}>
        {output ? 'Z_out = z₂₂ − z₁₂z₂₁/(z₁₁ + Z_S)' : 'Z_in = z₁₁ − z₁₂z₂₁/(z₂₂ + Z_L)'}
      </L>
      <L x="450" y="428" size={14} fill={N} weight={700}>
        {output ? 'Z_S → ∞ gives z₂₂ − 0; Z_S → 0 gives the loaded value' : 'Z_L → ∞ gives z₁₁; Z_L → 0 gives the fully loaded value'}
      </L>
      <L x="450" y="458" size={13} fill={RED} weight={800}>Quoting z₁₁ as "the input impedance" without stating the load is the standard mistake</L>
    </Scene>
  )
}

export function ParamSelectorScene({ hub = false }) {
  const rows = [
    ['z', 'series–series connections, T models', TEAL],
    ['y', 'parallel–parallel connections, π models', AMBER],
    ['h', 'transistor small-signal, mixed terminations', PURP],
    ['ABCD', 'cascades, transmission lines, filters', GREEN],
  ]
  return (
    <Scene caption={hub ? 'Convert through the matrix, never elementwise' : 'Some sets do not exist for some networks — that is why there are six'}>
      <circle cx="450" cy="230" r="72" fill={N} className="nam-flux" />
      <L x="450" y="224" size={15} fill={WHITE}>{hub ? 'convert' : 'choose'}</L>
      <L x="450" y="248" size={12.5} fill={SKY} weight={700}>{hub ? 'via matrix' : 'by task'}</L>
      {rows.map(([p, use, c], i) => {
        const pos = [
          { x: 96, y: 86 },
          { x: 560, y: 86 },
          { x: 96, y: 300 },
          { x: 560, y: 300 },
        ][i]
        return (
          <g key={p} className={`nam-emerge nam-delay-${i}`}>
            <rect x={pos.x} y={pos.y} width="244" height="98" rx="13" fill={WHITE} stroke={c} strokeWidth="2.8" />
            <L x={pos.x + 122} y={pos.y + 40} size={19} fill={c}>{p}</L>
            <foreignObject x={pos.x + 14} y={pos.y + 52} width="216" height="40">
              <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 12.5px/1.25 system-ui,sans-serif', color: '#4f6076', textAlign: 'center' }}>
                {use}
              </div>
            </foreignObject>
            <Wire
              d={`M${pos.x + (i % 2 === 0 ? 244 : 0)} ${pos.y + 49} L${i % 2 === 0 ? 378 : 522} 230`}
              stroke={c}
              width="2.2"
              dash="7 6"
              className="nam-current"
            />
          </g>
        )
      })}
      <rect x="150" y="428" width="600" height="56" rx="11" fill={SKY} stroke={RED} strokeWidth="2.3" />
      <L x="450" y="462" size={14} fill={RED}>Check the determinant before converting — a zero divisor means that set does not exist</L>
    </Scene>
  )
}

export function MeasurementRealityScene() {
  const rows = [
    ['A "short" has inductance', 'lead L raises the measured y at high f', AMBER],
    ['An "open" has capacitance', 'stray C lowers the measured z at high f', TEAL],
    ['Instruments load the port', 'the meter is part of the circuit', PURP],
    ['Use the ABCD route instead', 'cascade a known network, back out the unknown', GREEN],
  ]
  return (
    <Scene caption="The ideal terminations of the definitions do not exist in a lab">
      {rows.map(([t, s, c], i) => (
        <g key={t} className={`nam-slide-in nam-delay-${i}`}>
          <rect x="56" y={72 + i * 100} width="788" height="84" rx="12" fill={WHITE} stroke={c} strokeWidth="2.6" />
          <circle cx="112" cy={114 + i * 100} r="20" fill={c} />
          <L x="112" y={121 + i * 100} size={16} fill={WHITE}>{i + 1}</L>
          <L x="156" y={106 + i * 100} size={15.5} fill={c} anchor="start">{t}</L>
          <L x="156" y={134 + i * 100} size={13} fill={MUTED} anchor="start" weight={700}>{s}</L>
        </g>
      ))}
      <L x="450" y="492" size={13.5} fill={N} weight={800}>Quote the frequency with every parameter — a two-port number without one is meaningless</L>
    </Scene>
  )
}

export function TerminatedDashboardScene() {
  const tiles = [
    ['Z_in', 'depends on Z_L', BLUE],
    ['Z_out', 'depends on Z_S', AMBER],
    ['A_v = V₂/V₁', 'depends on both', PURP],
    ['A_i = I₂/I₁', 'depends on both', TEAL],
    ['P_L', 'peaks when Z_L = Z_out*', GREEN],
  ]
  return (
    <Scene caption="Nothing here is a property of the two-port alone — every number needs its terminations stated">
      <SrcV cx="90" cy="130" r="22" label="V_S" />
      <Res x="140" y="130" label="Z_S" stroke={MUTED} />
      <rect x="230" y="84" width="180" height="92" rx="12" fill={WHITE} stroke={N} strokeWidth="2.8" />
      <L x="320" y="136" size={15}>two-port</L>
      <Res x="440" y="130" label="Z_L" stroke={MUTED} />
      <Wire d="M200 130 L230 130 M410 130 L440 130" stroke={N} width="2.6" className="nam-current" />
      {tiles.map(([t, s, c], i) => (
        <g key={t} className={`nam-cell-in nam-delay-${i}`}>
          <rect x={56 + (i % 3) * 268} y={216 + Math.floor(i / 3) * 140} width="252" height="122" rx="13" fill={WHITE} stroke={c} strokeWidth="2.8" />
          <L x={182 + (i % 3) * 268} y={266 + Math.floor(i / 3) * 140} size={21} fill={c}>{t}</L>
          <foreignObject x={70 + (i % 3) * 268} y={280 + Math.floor(i / 3) * 140} width="224" height="48">
            <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 12.5px/1.25 system-ui,sans-serif', color: '#4f6076', textAlign: 'center' }}>
              {s}
            </div>
          </foreignObject>
        </g>
      ))}
      <rect x="592" y="216" width="252" height="122" rx="13" fill={SKY} stroke={MUTED} strokeWidth="2.2" />
      <L x="718" y="262" size={14} fill={MUTED}>Module 2 returns</L>
      <L x="718" y="296" size={13.5} fill={N} weight={700}>conjugate match for</L>
      <L x="718" y="320" size={13.5} fill={N} weight={700}>maximum power</L>
    </Scene>
  )
}

/* ── VISUAL_MAP + beatVisual ────────────────────────────────────── */

const VISUAL_MAP = {
  /* Module 1 */
  'hardware-to-model-map': ModelMapScene,
  'source-taxonomy-grid': SourceTaxonomyScene,
  'kcl-boundary-bubble': KclScene,
  'kvl-loop-walk': KvlScene,
  'nodal-matrix-build': () => <NodalMatrixScene title="Nodal analysis" domain="G" unknown="v" />,
  'supernode-bubble': SupernodeScene,
  'mesh-current-overlap': MeshScene,
  'supermesh-merge': SupermeshScene,
  'dependent-substitution-chain': DependentChainScene,
  'source-transform-seesaw': SourceTransformScene,
  'delta-wye-morph': DeltaWyeScene,
  'sinusoid-three-parameters': () => <SinusoidScene />,
  'complex-forcing-detour': () => <PhasorScene showDetour />,
  'phasor-rotating-arrow': () => <PhasorScene />,
  'impedance-triangle-sweep': ImpedanceTriangleScene,
  'dc-to-ac-overlay': DcAcOverlayScene,

  /* Module 2 */
  'linearity-two-pillars': LinearityScene,
  'superposition-split-merge': () => <SuperpositionScene />,
  'deactivation-lookup': () => <DeactivationScene />,
  'multi-frequency-lanes': () => <SinusoidScene lanes={3} />,
  'power-cross-term': () => <SuperpositionScene power />,
  'reciprocity-swap': () => <ReciprocityScene mode="swap" />,
  'reciprocity-checklist-gate': () => <GateChecklistScene title="Conditions for reciprocity" />,
  'reciprocal-vs-not-panels': () => <ReciprocityScene mode="panels" />,
  'thevenin-collapse': () => <TheveninScene />,
  'rth-three-routes': RthRoutesScene,
  'thevenin-norton-duality': () => <TheveninScene duality />,
  'max-power-curve': () => <MaxPowerScene />,
  'matching-regimes-triptych': () => <MaxPowerScene regimes />,
  'theorem-transfer-bridge': TheoremBridgeScene,
  'theorem-decision-tree': () => <DecisionTreeScene />,
  'verification-three-checks': VerifyChecksScene,

  /* Module 3 */
  'capacitor-continuity-panel': () => <ContinuityScene kind="C" />,
  'inductor-continuity-panel': () => <ContinuityScene kind="L" />,
  'switching-equivalents-table': SwitchEquivScene,
  'initial-conditions-pipeline': () => (
    <PipelineScene
      title="Evaluating initial conditions"
      accent={PURP}
      steps={[
        'Solve the t < 0 circuit in steady state — L short, C open',
        'Record v_C(0⁻) and i_L(0⁻) only; every other quantity may jump',
        'Redraw at t = 0⁺ with C as a V₀ source and L as an I₀ source',
        'Solve that resistive circuit for every other 0⁺ quantity',
        'Differentiate the element relations for the slopes if needed',
      ]}
    />
  ),
  'final-condition-two-cases': () => (
    <TwoCaseScene
      caption="Final conditions exist only if the circuit settles"
      left={{
        title: 'DC source — settles',
        points: [
          'All derivatives go to zero',
          'Inductor → short circuit',
          'Capacitor → open circuit',
          'Solve one resistive circuit',
          'Use this to check your transient solution',
        ],
      }}
      right={{
        title: 'AC source — never settles',
        points: [
          'The circuit reaches sinusoidal steady state, not a constant',
          '"Final value" means the steady-state phasor solution',
          'Use Module 1 phasor analysis for it',
          'The final-value theorem does not apply',
          'Undamped LC has no final value at all',
        ],
      }}
    />
  ),
  'rl-decay-tau': () => <DecayScene label="RL" />,
  'exponential-properties-triple': ExponentialPropsScene,
  'rc-rl-duality-mirror': () => <DecayScene label="RC" rising />,
  'step-pulse-construction': () => <StepPulseScene />,
  'natural-plus-forced-stack': () => <DecayScene label="RL" showForced />,
  'rc-delay-threshold': () => <DecayScene label="RC" rising showThreshold />,
  'sequential-intervals-chain': SequentialIntervalsScene,
  'damping-three-cases': () => <DampingScene />,
  'critical-vs-underdamped-overlay': () => <DampingScene pair />,
  'series-parallel-alpha-contrast': () => (
    <TwoCaseScene
      caption="The damping coefficient is not the same formula in both topologies"
      left={{
        title: 'Parallel RLC',
        points: ['α = 1 / (2RC)', 'ω₀ = 1/√(LC)', 'Larger R → LESS damping', 'Node voltage is the natural variable', 'KCL at the single node'],
      }}
      right={{
        title: 'Series RLC',
        points: ['α = R / (2L)', 'ω₀ = 1/√(LC)', 'Larger R → MORE damping', 'Loop current is the natural variable', 'KVL round the single loop'],
      }}
    />
  ),
  'ac-switching-angle': AcSwitchScene,

  /* Module 4 */
  'laplace-integral-anatomy': LaplaceAnatomyScene,
  'transform-table-ladder': () => <TransformLadderScene />,
  'partial-fraction-splitter': PartialFractionScene,
  'five-theorems-console': () => <TheoremConsoleScene />,
  'value-theorems-gauges': ValueGaugeScene,
  'impedance-generalisation-ladder': ImpedanceGeneralScene,
  'initial-condition-source-models': IcSourceScene,
  's-domain-nodal-matrix': () => <NodalMatrixScene title="s-domain nodal analysis" domain="Y" unknown="V" />,
  's-domain-theorem-carry': () => (
    <TheoremConsoleScene
      title="Theorems in the s-domain"
      rows={[
        ['Superposition', 'responses add, in s as in t', BLUE],
        ['Thévenin', 'V_th(s) and Z_th(s) — both functions of s', AMBER],
        ['Norton', 'I_N(s) = V_th(s)/Z_th(s)', PURP],
        ['Max power', 'conjugate match at each frequency', TEAL],
        ['Initial conditions', 'already inside as sources', GREEN],
      ]}
    />
  ),
  'pole-zero-map-to-response': () => <PoleZeroScene mode="map" />,
  'three-responses-integration-chain': ThreeResponsesScene,
  'waveform-synthesis-decomposition': () => <StepPulseScene synthesis />,
  'convolution-flip-slide': ConvolutionScene,
  'pole-distance-dual-reading': () => <PoleZeroScene mode="map" />,
  's-plane-response-atlas': () => <PoleZeroScene mode="atlas" />,
  'synthesis-reverse-map': SynthesisScene,

  /* Module 5 */
  'one-port-condition': OnePortScene,
  'two-port-black-box': () => <TwoPortScene param="box" />,
  'y-parameter-measurement': () => <TwoPortScene param="y" />,
  'y-to-pi-mapping': PiTModelScene,
  'z-parameter-and-t-model': () => <TwoPortScene param="z" />,
  'z-y-inverse-with-failure': () => (
    <TwoCaseScene
      caption="[y] = [z]⁻¹ — when the inverse exists"
      left={{
        title: 'When both exist',
        points: ['[y] = [z]⁻¹ exactly', 'Invert the MATRIX, not each element', 'det[z] ≠ 0 is the condition', 'Cross terms pick up a minus sign', 'Check by multiplying back to I'],
      }}
      right={{
        title: 'When one fails',
        points: ['A series impedance alone has no [y]', 'A shunt admittance alone has no [z]', 'det = 0 is the warning', 'ABCD or h still exists', 'Existence is a property of the network'],
      }}
    />
  ),
  'h-parameter-transistor-link': () => <TwoPortScene param="h" />,
  'parameter-set-selector': () => <ParamSelectorScene />,
  'abcd-definition-and-signs': () => <TwoPortScene param="abcd" />,
  'abcd-cascade-chain': CascadeScene,
  'reciprocity-vs-symmetry-grid': () => <ReciprocityScene mode="grid" />,
  'zin-reflection-path': () => <ZinScene />,
  'zout-mirror-of-zin': () => <ZinScene output />,
  'measurement-reality-check': MeasurementRealityScene,
  'conversion-hub': () => <ParamSelectorScene hub />,
  'terminated-performance-dashboard': TerminatedDashboardScene,
}

function matchKeyword(blob) {
  if (/supernode/.test(blob)) return SupernodeScene
  if (/supermesh/.test(blob)) return SupermeshScene
  if (/\bkcl\b|current law/.test(blob)) return KclScene
  if (/\bkvl\b|voltage law/.test(blob)) return KvlScene
  if (/mesh/.test(blob)) return MeshScene
  if (/nodal|node analysis/.test(blob)) return () => <NodalMatrixScene />
  if (/delta.?wye|star.?delta/.test(blob)) return DeltaWyeScene
  if (/source transform/.test(blob)) return SourceTransformScene
  if (/phasor|complex forcing/.test(blob)) return () => <PhasorScene />
  if (/sinusoid|frequency|waveform/.test(blob)) return () => <SinusoidScene />
  if (/impedance triangle|admittance/.test(blob)) return ImpedanceTriangleScene
  if (/superposition/.test(blob)) return () => <SuperpositionScene />
  if (/th[ée]venin|norton/.test(blob)) return () => <TheveninScene />
  if (/maximum power|matching/.test(blob)) return () => <MaxPowerScene />
  if (/reciprocit/.test(blob)) return () => <ReciprocityScene mode="swap" />
  if (/capacitor/.test(blob)) return () => <ContinuityScene kind="C" />
  if (/inductor/.test(blob)) return () => <ContinuityScene kind="L" />
  if (/damping|rlc/.test(blob)) return () => <DampingScene />
  if (/time constant|transient|source.?free/.test(blob)) return () => <DecayScene />
  if (/unit.?step|impulse|ramp/.test(blob)) return () => <StepPulseScene />
  if (/laplace|transform/.test(blob)) return LaplaceAnatomyScene
  if (/partial fraction/.test(blob)) return PartialFractionScene
  if (/pole|zero|s.?plane|transfer function/.test(blob)) return () => <PoleZeroScene />
  if (/convolution/.test(blob)) return ConvolutionScene
  if (/cascade|abcd|transmission/.test(blob)) return CascadeScene
  if (/two.?port|parameter/.test(blob)) return () => <TwoPortScene param="box" />
  if (/input impedance|output impedance/.test(blob)) return () => <ZinScene />
  return null
}

/** The worked trace for a unit: given → steps → result, with the mistake
 *  that ruins it called out. Built from the unit's own dry run, so no two
 *  units produce the same board. */
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
      <L x="92" y="80" size={12.5} fill={BLUE} anchor="start">GIVEN</L>
      <foreignObject x="92" y="82" width="716" height={30 + shift}>
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#0e1c2e' }}>
          {dryRun?.input || '—'}
        </div>
      </foreignObject>
      {steps.map((st, i) => (
        <g key={String(st)} className={`nam-slide-in nam-delay-${i}`}>
          <rect x="56" y={130 + shift + i * pitch} width="788" height={stepH} rx="10" fill={WHITE} stroke={MUTED} strokeWidth="1.8" />
          <circle cx="90" cy={130 + shift + i * pitch + stepH / 2} r="13" fill={AMBER} />
          <L x="90" y={136 + shift + i * pitch + stepH / 2} size={13} fill={WHITE}>{i + 1}</L>
          <foreignObject x="114" y={138 + shift + i * pitch} width="716" height={stepH - 14}>
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ font: '650 13px/1.25 system-ui,sans-serif', color: '#0e1c2e', display: 'flex', alignItems: 'center', height: '100%' }}
            >
              {String(st)}
            </div>
          </foreignObject>
        </g>
      ))}
      <g className="nam-emerge">
        <rect x="56" y={top} width="788" height={resultH} rx="12" fill={WHITE} stroke={GREEN} strokeWidth="2.6" />
        <L x="92" y={top + 24} size={12.5} fill={GREEN} anchor="start">RESULT</L>
        <foreignObject x="92" y={top + 26} width="716" height={resultH - 30}>
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: '750 13px/1.2 system-ui,sans-serif', color: '#15803d' }}>
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
 * circuit diagram. Beat 2 pairs the written procedure with the worked trace
 * built from the unit's own `dryRun`. Beat 3 returns to the circuit so the
 * numbers on its left have something to point at.
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

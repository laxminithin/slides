import { useId } from 'react'

export const DL = {
  ivory: '#fffcf7',
  cream: '#f7f3eb',
  graphite: '#1e293b',
  muted: '#64748b',
  blue: '#2563eb',
  violet: '#7c3aed',
  purple: '#7c3aed',
  magenta: '#c026d3',
  teal: '#0d9488',
  amber: '#d97706',
  red: '#dc2626',
  green: '#15803d',
  indigo: '#4338ca',
}

const ANIM = {
  flow: 'dl-anim-flow',
  pulse: 'dl-anim-pulse',
  rise: 'dl-anim-rise',
  scan: 'dl-anim-scan',
  drift: 'dl-anim-drift',
  glow: 'dl-anim-glow',
}

const toneColor = (tone, fallback = DL.blue) => DL[tone] || tone || fallback
const cleanId = (id) => `dlv-${id.replace(/:/g, '')}`
const clamp01 = (value) => Math.max(0, Math.min(1, Number(value) || 0))
const pct = (value) => `${Math.round(clamp01(value) * 100)}%`
const fmt = (value, digits = 2) => Number(value || 0).toFixed(digits)

export function depthOffset(i = 1) {
  return { dx: i * 8, dy: i * 7 }
}

export function Scene({ children, title, viewBox = '0 0 640 400', label }) {
  const id = cleanId(useId())
  const ariaLabel = label || title || 'Living deep learning visual'

  return (
    <svg className="dl-scene" viewBox={viewBox} role="img" aria-label={ariaLabel}>
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id={`${id}-paper`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" stopOpacity="0.98" />
          <stop offset="1" stopColor={DL.cream} stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id={`${id}-flow`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor={DL.blue} />
          <stop offset="0.5" stopColor={DL.teal} />
          <stop offset="1" stopColor={DL.violet} />
        </linearGradient>
        <linearGradient id={`${id}-backprop`} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor={DL.red} />
          <stop offset="1" stopColor={DL.violet} />
        </linearGradient>
        <radialGradient id={`${id}-halo`}>
          <stop stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="0.35" stopColor={DL.teal} stopOpacity="0.28" />
          <stop offset="1" stopColor={DL.teal} stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="10" stdDeviation="8" floodColor={DL.graphite} floodOpacity="0.14" />
        </filter>
        <filter id={`${id}-lift`} x="-35%" y="-35%" width="170%" height="180%">
          <feDropShadow dx="8" dy="10" stdDeviation="7" floodColor={DL.graphite} floodOpacity="0.12" />
        </filter>
        <filter id={`${id}-glow`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="640" height="400" rx="30" fill={DL.cream} />
      <circle cx="552" cy="54" r="128" fill={DL.blue} opacity="0.055" />
      <circle cx="80" cy="348" r="126" fill={DL.amber} opacity="0.055" />
      <path d="M0 328 C120 296 198 360 318 322 S518 282 640 318 V400 H0z" fill="#ffffff" opacity="0.48" />
      <g
        style={{
          '--dl-paper': `url(#${id}-paper)`,
          '--dl-flow-gradient': `url(#${id}-flow)`,
          '--dl-backprop-gradient': `url(#${id}-backprop)`,
          '--dl-halo': `url(#${id}-halo)`,
          '--dl-shadow': `url(#${id}-shadow)`,
          '--dl-lift': `url(#${id}-lift)`,
          '--dl-soft-glow': `url(#${id}-glow)`,
        }}
      >
        {children}
      </g>
    </svg>
  )
}

export function Title({ children }) {
  return (
    <text x="32" y="42" fill={DL.graphite} fontSize="24" fontWeight="900" letterSpacing="-0.02em">
      {children}
    </text>
  )
}

export function Label({ x, y, children, size = 16, fill = DL.graphite, anchor = 'middle' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontWeight="800">
      {children}
    </text>
  )
}

function SubLabel({ x, y, children, size = 13, anchor = 'middle' }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fill={DL.muted} fontSize={size} fontWeight="700">
      {children}
    </text>
  )
}

function ArrowHead({ x, y, angle, color }) {
  const p1 = `${x},${y}`
  const p2 = `${x - 13 * Math.cos(angle - 0.5)},${y - 13 * Math.sin(angle - 0.5)}`
  const p3 = `${x - 13 * Math.cos(angle + 0.5)},${y - 13 * Math.sin(angle + 0.5)}`
  return <polygon points={`${p1} ${p2} ${p3}`} fill={color} />
}

export function ArrowFlow({ x1, y1, x2, y2, color = DL.blue, dashed = false, reverse = false }) {
  const sx = reverse ? x2 : x1
  const sy = reverse ? y2 : y1
  const ex = reverse ? x1 : x2
  const ey = reverse ? y1 : y2
  const angle = Math.atan2(ey - sy, ex - sx)

  return (
    <g className={ANIM.flow}>
      <line x1={sx} y1={sy} x2={ex} y2={ey} stroke={color} strokeWidth="4" strokeLinecap="round" strokeDasharray={dashed ? '10 9' : undefined} opacity="0.88" />
      <ArrowHead x={ex} y={ey} angle={angle} color={color} />
    </g>
  )
}

export function WeightedEdge({ x1, y1, x2, y2, weight, active = false, reverse = false }) {
  const color = active ? DL.violet : '#cbd5e1'
  const midX = (x1 + x2) / 2
  const midY = (y1 + y2) / 2 - 8
  const width = active ? 4.5 : Math.max(1.8, Math.min(5, Math.abs(Number(weight) || 1) * 2.2))

  return (
    <g className={active ? ANIM.flow : undefined}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={width} strokeLinecap="round" opacity={active ? 0.9 : 0.62} />
      {reverse ? <ArrowHead x={x1} y={y1} angle={Math.atan2(y1 - y2, x1 - x2)} color={color} /> : null}
      {weight !== undefined ? (
        <g style={{ filter: 'var(--dl-shadow)' }}>
          <rect x={midX - 22} y={midY - 15} width="44" height="24" rx="12" fill="#fff" stroke={DL.violet} strokeOpacity="0.25" />
          <Label x={midX} y={midY + 3} size={13} fill={DL.violet}>{weight}</Label>
        </g>
      ) : null}
    </g>
  )
}

export function ActivationPulse({ path, color = DL.teal }) {
  return (
    <g>
      <path d={path} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeDasharray="9 10" opacity="0.28" />
      <circle r="7" fill={color} className={ANIM.glow} style={{ filter: 'var(--dl-soft-glow)' }}>
        <animateMotion dur="2.2s" repeatCount="indefinite" path={path} />
      </circle>
    </g>
  )
}

export function Neuron({ x, y, r = 22, label, active = false, tone = 'teal' }) {
  const color = toneColor(tone, DL.teal)
  return (
    <g className={active ? ANIM.pulse : undefined}>
      <circle cx={x + 5} cy={y + 7} r={r} fill={DL.graphite} opacity="0.08" />
      <circle cx={x} cy={y} r={r + 12} fill={active ? 'var(--dl-halo)' : color} opacity={active ? 1 : 0.09} />
      <circle cx={x} cy={y} r={r} fill="#fff" stroke={color} strokeWidth="4" style={{ filter: 'var(--dl-shadow)' }} />
      <circle cx={x - r * 0.32} cy={y - r * 0.32} r={r * 0.25} fill="#fff" opacity="0.85" />
      {label ? <Label x={x} y={y + 5} size={Math.max(14, Math.min(20, r * 0.62))} fill={color}>{label}</Label> : null}
    </g>
  )
}

export function LayerPlane({ x, y, w, h, depth = 2, label, tone = 'blue', nodes = [] }) {
  const color = toneColor(tone, DL.blue)
  return (
    <g className={ANIM.rise}>
      {Array.from({ length: depth }, (_, i) => {
        const { dx, dy } = depthOffset(depth - i)
        return <rect key={i} x={x + dx} y={y + dy} width={w} height={h} rx="20" fill={color} opacity={0.055 + i * 0.025} stroke={color} strokeOpacity="0.14" />
      })}
      <rect x={x} y={y} width={w} height={h} rx="20" fill="var(--dl-paper)" stroke={color} strokeOpacity="0.36" strokeWidth="2" style={{ filter: 'var(--dl-lift)' }} />
      <rect x={x + 14} y={y + 14} width={w - 28} height="7" rx="4" fill={color} opacity="0.24" />
      {label ? <Label x={x + w / 2} y={y + 42} fill={color} size={18}>{label}</Label> : null}
      {nodes.map((node, i) => (
        <Neuron key={node.id || `${node.x}-${node.y}-${i}`} x={x + (node.x ?? w / 2)} y={y + (node.y ?? 72 + i * 44)} r={node.r || 14} label={node.label} active={node.active} tone={node.tone || tone} />
      ))}
    </g>
  )
}

export function TensorBlock({ x, y, rows = 4, cols = 5, highlight = [], label }) {
  const cell = 24
  const hot = new Set(highlight)
  return (
    <g className={ANIM.rise} style={{ filter: 'var(--dl-shadow)' }}>
      {Array.from({ length: 3 }, (_, layer) => {
        const { dx, dy } = depthOffset(2 - layer)
        return (
          <g key={layer} opacity={layer === 2 ? 1 : 0.5}>
            {Array.from({ length: rows * cols }, (_, i) => {
              const r = Math.floor(i / cols)
              const c = i % cols
              const on = hot.has(i) || hot.has(`${r},${c}`)
              return <rect key={i} x={x + dx + c * cell} y={y + dy + r * cell} width={cell - 4} height={cell - 4} rx="5" fill={on ? DL.blue : '#fff'} stroke={on ? DL.blue : '#dbe4ef'} strokeWidth="2" opacity={on ? 0.82 : 0.96} />
            })}
          </g>
        )
      })}
      {label ? <Label x={x + (cols * cell) / 2 + 8} y={y + rows * cell + 34} size={16} fill={DL.blue}>{label}</Label> : null}
    </g>
  )
}

export function FeatureMap({ x, y, size = 34, values = [], label }) {
  const rows = values.length || 4
  const cols = values[0]?.length || 4
  return (
    <g className={ANIM.drift} style={{ filter: 'var(--dl-shadow)' }}>
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols)
        const c = i % cols
        const v = clamp01(values[r]?.[c] ?? (i % 5) / 4)
        return <rect key={i} x={x + c * size} y={y + r * size} width={size - 4} height={size - 4} rx="7" fill={DL.teal} opacity={0.12 + v * 0.72} stroke="#fff" strokeWidth="2" />
      })}
      {label ? <Label x={x + (cols * size) / 2 - 2} y={y + rows * size + 28} fill={DL.teal}>{label}</Label> : null}
    </g>
  )
}

export function KernelWindow({ x, y, size = 32, values = [], label }) {
  const rows = values.length || 3
  const cols = values[0]?.length || 3
  return (
    <g className={ANIM.scan} style={{ filter: 'var(--dl-lift)' }}>
      <rect x={x - 8} y={y - 8} width={cols * size + 12} height={rows * size + 12} rx="12" fill="#fff" stroke={DL.violet} strokeWidth="3" opacity="0.96" />
      {Array.from({ length: rows * cols }, (_, i) => {
        const r = Math.floor(i / cols)
        const c = i % cols
        const v = values[r]?.[c] ?? (r === c ? 1 : 0)
        return (
          <g key={i}>
            <rect x={x + c * size} y={y + r * size} width={size - 3} height={size - 3} rx="5" fill={Number(v) >= 0 ? DL.violet : DL.red} opacity={0.18 + Math.min(0.55, Math.abs(Number(v) || 0) * 0.4)} />
            <Label x={x + c * size + size / 2 - 2} y={y + r * size + size / 2 + 5} size={13} fill={DL.graphite}>{v}</Label>
          </g>
        )
      })}
      {label ? <Label x={x + (cols * size) / 2 - 2} y={y + rows * size + 28} fill={DL.violet}>{label}</Label> : null}
    </g>
  )
}

export function GradientPacket({ x, y, label = 'grad', strength = 0.7 }) {
  const s = 28 + clamp01(strength) * 24
  return (
    <g className={ANIM.flow} style={{ filter: 'var(--dl-shadow)' }}>
      <path d={`M${x - s / 2} ${y} L${x} ${y - s / 2} L${x + s / 2} ${y} L${x} ${y + s / 2} Z`} fill="var(--dl-backprop-gradient)" opacity="0.86" />
      <circle cx={x} cy={y} r={s * 0.22} fill="#fff" opacity="0.22" />
      <Label x={x} y={y + 5} size={14} fill="#fff">{label}</Label>
    </g>
  )
}

export function LossMeter({ x, y, value = 0.5, target = 0.1 }) {
  const v = clamp01(value)
  const t = clamp01(target)
  const h = 104
  return (
    <g style={{ filter: 'var(--dl-shadow)' }}>
      <rect x={x} y={y} width="90" height="146" rx="18" fill="var(--dl-paper)" stroke={DL.red} strokeOpacity="0.32" strokeWidth="2" />
      <Label x={x + 45} y={y + 26} size={16} fill={DL.red}>Loss</Label>
      <rect x={x + 28} y={y + 36} width="34" height={h} rx="12" fill="#fee2e2" />
      <rect x={x + 28} y={y + 36 + h * (1 - v)} width="34" height={h * v} rx="12" fill={DL.red} className={ANIM.rise} />
      <line x1={x + 22} y1={y + 36 + h * (1 - t)} x2={x + 68} y2={y + 36 + h * (1 - t)} stroke={DL.green} strokeWidth="4" strokeLinecap="round" />
      <SubLabel x={x + 45} y={y + 164}>{pct(v)}</SubLabel>
    </g>
  )
}

export function WeightUpdater({ x, y, before = 0.42, after = 0.68 }) {
  return (
    <g style={{ filter: 'var(--dl-shadow)' }}>
      <rect x={x} y={y} width="176" height="74" rx="18" fill="var(--dl-paper)" stroke={DL.violet} strokeOpacity="0.34" strokeWidth="2" />
      <Label x={x + 88} y={y + 24} size={16} fill={DL.violet}>Weight update</Label>
      <Label x={x + 44} y={y + 54} size={18} fill={DL.muted}>{before}</Label>
      <ArrowFlow x1={x + 72} y1={y + 49} x2={x + 105} y2={y + 49} color={DL.teal} />
      <Label x={x + 136} y={y + 54} size={18} fill={DL.violet}>{after}</Label>
    </g>
  )
}

export function OptimizationPoint({ x, y, trail = [] }) {
  const points = trail.length ? trail : [[x - 92, y - 34], [x - 64, y - 12], [x - 34, y - 24], [x, y]]
  const d = points.map(([px, py], i) => `${i ? 'L' : 'M'}${px} ${py}`).join(' ')
  return (
    <g>
      <path d={d} fill="none" stroke={DL.amber} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="10 8" className={ANIM.flow} />
      {points.slice(0, -1).map(([px, py], i) => <circle key={`${px}-${py}-${i}`} cx={px} cy={py} r="5" fill={DL.amber} opacity={0.35 + i * 0.12} />)}
      <circle cx={x} cy={y} r="14" fill={DL.amber} stroke="#fff" strokeWidth="4" className={ANIM.pulse} style={{ filter: 'var(--dl-shadow)' }} />
      <Label x={x} y={y + 35} fill={DL.amber}>minimum</Label>
    </g>
  )
}

export function SequenceToken({ x, y, text, active = false }) {
  return (
    <g className={active ? ANIM.pulse : undefined} style={{ filter: 'var(--dl-shadow)' }}>
      <rect x={x} y={y} width="76" height="48" rx="16" fill={active ? DL.indigo : '#fff'} stroke={DL.indigo} strokeOpacity="0.38" strokeWidth="2" />
      <Label x={x + 38} y={y + 30} size={16} fill={active ? '#fff' : DL.indigo}>{text}</Label>
    </g>
  )
}

export function HiddenState({ x, y, value = 'h', fading = false }) {
  return (
    <g className={fading ? ANIM.drift : ANIM.glow} opacity={fading ? 0.52 : 1}>
      <ellipse cx={x + 8} cy={y + 10} rx="46" ry="27" fill={DL.indigo} opacity="0.12" />
      <ellipse cx={x} cy={y} rx="46" ry="27" fill="#fff" stroke={DL.indigo} strokeWidth="3" style={{ filter: 'var(--dl-shadow)' }} />
      <Label x={x} y={y + 6} size={20} fill={DL.indigo}>{value}</Label>
    </g>
  )
}

export function PredictionPanel({ x, y, probs = [], predicted }) {
  const items = probs.length ? probs : [{ label: 'A', value: 0.68 }, { label: 'B', value: 0.22 }, { label: 'C', value: 0.1 }]
  const winner = predicted ?? items.reduce((best, item) => (item.value > best.value ? item : best), items[0])?.label
  return (
    <g style={{ filter: 'var(--dl-shadow)' }}>
      <rect x={x} y={y} width="198" height={50 + items.length * 32} rx="20" fill="var(--dl-paper)" stroke={DL.green} strokeOpacity="0.28" strokeWidth="2" />
      <Label x={x + 99} y={y + 28} size={17} fill={DL.green}>Prediction</Label>
      {items.map((item, i) => {
        const value = clamp01(item.value)
        const yy = y + 50 + i * 32
        const active = item.label === winner
        return (
          <g key={item.label || i}>
            <Label x={x + 25} y={yy + 17} size={14} fill={active ? DL.green : DL.muted}>{item.label}</Label>
            <rect x={x + 50} y={yy + 5} width="112" height="14" rx="7" fill="#e2e8f0" />
            <rect x={x + 50} y={yy + 5} width={112 * value} height="14" rx="7" fill={active ? DL.green : DL.blue} className={active ? ANIM.rise : undefined} />
            <SubLabel x={x + 176} y={yy + 17} size={12}>{pct(value)}</SubLabel>
          </g>
        )
      })}
    </g>
  )
}

export function TrainingEpoch({ x, y, epoch = 1, loss = 0.35 }) {
  const v = clamp01(loss)
  return (
    <g className={ANIM.rise} style={{ filter: 'var(--dl-shadow)' }}>
      <rect x={x} y={y} width="164" height="72" rx="18" fill="var(--dl-paper)" stroke={DL.teal} strokeOpacity="0.32" strokeWidth="2" />
      <Label x={x + 48} y={y + 28} size={16} fill={DL.teal}>Epoch</Label>
      <Label x={x + 118} y={y + 30} size={22} fill={DL.graphite}>{epoch}</Label>
      <rect x={x + 20} y={y + 46} width="124" height="10" rx="5" fill="#e2e8f0" />
      <rect x={x + 20} y={y + 46} width={124 * (1 - v)} height="10" rx="5" fill={DL.teal} />
      <SubLabel x={x + 82} y={y + 88}>loss {fmt(loss)}</SubLabel>
    </g>
  )
}

export function SoftCard({ x, y, w, h, title, children }) {
  return (
    <g className={ANIM.rise} style={{ filter: 'var(--dl-shadow)' }}>
      <rect x={x + 7} y={y + 8} width={w} height={h} rx="20" fill={DL.graphite} opacity="0.08" />
      <rect x={x} y={y} width={w} height={h} rx="20" fill="var(--dl-paper)" stroke={DL.blue} strokeOpacity="0.22" strokeWidth="2" />
      {title ? <Label x={x + 20} y={y + 30} size={17} fill={DL.graphite} anchor="start">{title}</Label> : null}
      {children}
    </g>
  )
}

export function FormulaStrip({ x, y, text }) {
  return (
    <g style={{ filter: 'var(--dl-shadow)' }}>
      <rect x={x} y={y} width={Math.max(180, String(text || '').length * 12 + 34)} height="48" rx="16" fill="#fff" stroke={DL.indigo} strokeOpacity="0.28" strokeWidth="2" />
      <text x={x + 18} y={y + 31} fill={DL.indigo} fontSize="18" fontWeight="850" fontFamily="IBM Plex Mono, SFMono-Regular, ui-monospace, monospace">
        {text}
      </text>
    </g>
  )
}

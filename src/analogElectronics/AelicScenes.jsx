/**
 * AelicScenes — premium Analog Electronics classroom SVG visuals.
 * Cream/navy theme; CSS hooks: aev-pulse, aev-flow, aev-glow, aev-draw, aev-wave.
 */
const N = '#102033'
const BLUE = '#2563eb'
const RED = '#dc2626'
const AMBER = '#d97706'
const PURP = '#7c3aed'
const GREEN = '#16a34a'
const CREAM = '#fffaf0'
const SKY = '#eaf2ff'
const MUTED = '#526079'
export const AE = { N, BLUE, RED, AMBER, PURP, GREEN, CREAM, SKY, MUTED }

function Scene({ caption, children, vb = '0 0 900 520', className = '' }) {
  return (
    <div className={`ae-scene ${className}`} aria-label={caption || 'Analog electronics diagram'}>
      <svg viewBox={vb} role="img" className="ae-svg">
        <rect width="100%" height="100%" fill={CREAM} rx="8" />
        {children}
        {caption ? (
          <text x="450" y="502" textAnchor="middle" fontSize="16" fontWeight="700" fill={MUTED}>{caption}</text>
        ) : null}
      </svg>
    </div>
  )
}

export function L({ x, y, children, size = 18, fill = N, anchor = 'middle' }) {
  return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight="800" fill={fill} fontFamily="system-ui,sans-serif">{children}</text>
}

export function Wire({ x1, y1, x2, y2, color = N, w = 3, className = '', dash }) {
  return <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={w} strokeLinecap="round" strokeDasharray={dash} className={className} />
}

export function Resistor({ x, y, orient = 'v', label, color = N }) {
  const zig = orient === 'v'
    ? `M${x} ${y} l6 10 -12 12 12 12 -12 12 12 12 -6 10`
    : `M${x} ${y} l10 6 12 -12 12 12 12 -12 12 12 10 -6`
  return (
    <g className="ae-resistor">
      <path d={zig} fill="none" stroke={color} strokeWidth="3" strokeLinejoin="round" />
      {label ? <L x={orient === 'v' ? x + 28 : x + 40} y={orient === 'v' ? y + 40 : y - 14} size={17} fill={MUTED} anchor="start">{label}</L> : null}
    </g>
  )
}

export function Cap({ x, y, orient = 'v', label, color = N }) {
  if (orient === 'v') {
    return (
      <g>
        <line x1={x - 14} y1={y} x2={x + 14} y2={y} stroke={color} strokeWidth="3.5" />
        <line x1={x - 14} y1={y + 10} x2={x + 14} y2={y + 10} stroke={color} strokeWidth="3.5" />
        {label ? <L x={x + 26} y={y + 10} size={16} fill={MUTED} anchor="start">{label}</L> : null}
      </g>
    )
  }
  return (
    <g>
      <line x1={x} y1={y - 14} x2={x} y2={y + 14} stroke={color} strokeWidth="3.5" />
      <line x1={x + 10} y1={y - 14} x2={x + 10} y2={y + 14} stroke={color} strokeWidth="3.5" />
      {label ? <L x={x + 5} y={y - 22} size={16} fill={MUTED}>{label}</L> : null}
    </g>
  )
}

export function NPN({ cx, cy, scale = 1, label = 'Q' }) {
  const s = scale
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`} className="ae-npn">
      <circle r="38" fill={SKY} stroke={N} strokeWidth="3" />
      <line x1="-38" y1="0" x2="-8" y2="0" stroke={N} strokeWidth="3.5" />
      <line x1="-8" y1="-22" x2="-8" y2="22" stroke={N} strokeWidth="4" />
      <line x1="-8" y1="-14" x2="28" y2="-32" stroke={N} strokeWidth="3.5" />
      <line x1="-8" y1="14" x2="28" y2="32" stroke={N} strokeWidth="3.5" />
      <polygon points="18,22 28,32 14,30" fill={N} />
      <L x={0} y={58} size={16} fill={MUTED}>{label}</L>
      <L x={36} y={-28} size={14} fill={MUTED} anchor="start">C</L>
      <L x={-52} y={6} size={14} fill={MUTED} anchor="end">B</L>
      <L x={36} y={38} size={14} fill={MUTED} anchor="start">E</L>
    </g>
  )
}

export function PNP({ cx, cy, scale = 1, label = 'Q' }) {
  const s = scale
  return (
    <g transform={`translate(${cx},${cy}) scale(${s})`} className="ae-pnp">
      <circle r="38" fill="#fff5db" stroke={N} strokeWidth="3" />
      <line x1="-38" y1="0" x2="-8" y2="0" stroke={N} strokeWidth="3.5" />
      <line x1="-8" y1="-22" x2="-8" y2="22" stroke={N} strokeWidth="4" />
      <line x1="-8" y1="-14" x2="28" y2="-32" stroke={N} strokeWidth="3.5" />
      <line x1="-8" y1="14" x2="28" y2="32" stroke={N} strokeWidth="3.5" />
      <polygon points="-2,-8 -8,-14 2,-18" fill={N} />
      <L x={0} y={58} size={16} fill={MUTED}>{label}</L>
    </g>
  )
}

export function MOSFET({ cx, cy, scale = 1, label = 'M' }) {
  return (
    <g transform={`translate(${cx},${cy}) scale(${scale})`} className="ae-mosfet">
      <rect x="-42" y="-48" width="84" height="96" rx="10" fill={SKY} stroke={N} strokeWidth="2.5" opacity="0.55" />
      <line x1="-48" y1="0" x2="-18" y2="0" stroke={N} strokeWidth="3.5" />
      <line x1="-18" y1="-28" x2="-18" y2="28" stroke={N} strokeWidth="4" />
      <line x1="-10" y1="-28" x2="-10" y2="28" stroke={N} strokeWidth="3" />
      <line x1="-10" y1="-22" x2="28" y2="-22" stroke={N} strokeWidth="3.5" />
      <line x1="-10" y1="0" x2="28" y2="0" stroke={N} strokeWidth="3.5" />
      <line x1="-10" y1="22" x2="28" y2="22" stroke={N} strokeWidth="3.5" />
      <line x1="28" y1="-40" x2="28" y2="-22" stroke={N} strokeWidth="3.5" />
      <line x1="28" y1="22" x2="28" y2="40" stroke={N} strokeWidth="3.5" />
      <L x={0} y={62} size={16} fill={MUTED}>{label}</L>
      <L x={-58} y={6} size={14} fill={MUTED} anchor="end">G</L>
      <L x={40} y={-28} size={14} fill={MUTED} anchor="start">D</L>
      <L x={40} y={38} size={14} fill={MUTED} anchor="start">S</L>
    </g>
  )
}

export function OpAmp({ cx, cy, w = 120, h = 90, label = 'OA' }) {
  const pts = `${cx - w / 2},${cy - h / 2} ${cx + w / 2},${cy} ${cx - w / 2},${cy + h / 2}`
  return (
    <g className="ae-opamp">
      <polygon points={pts} fill={SKY} stroke={N} strokeWidth="3" />
      <L x={cx - w / 2 + 18} y={cy - 18} size={20} fill={N} anchor="start">−</L>
      <L x={cx - w / 2 + 18} y={cy + 28} size={20} fill={N} anchor="start">+</L>
      <L x={cx + 8} y={cy + 6} size={15} fill={MUTED}>{label}</L>
    </g>
  )
}

export function WavePath({ d, color = BLUE, w = 3, className = 'aev-wave', style }) {
  return <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" className={className} style={style} />
}

function CurrentDots({ points, color = RED, className = 'aev-dot' }) {
  return points.map(([x, y], i) => (
    <circle key={i} cx={x} cy={y} r="5.5" fill={color} className={className} style={{ animationDelay: `${i * 0.22}s` }} />
  ))
}

export function sinePts(x0, y0, amp, cycles, steps = 48, len = 160) {
  const pts = []
  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    pts.push(`${x0 + t * len},${y0 - Math.sin(t * Math.PI * 2 * cycles) * amp}`)
  }
  return `M${pts.join(' L')}`
}

/* ─── 1. BJT amplifier ─────────────────────────────────────────── */
export function BjtAmplifier({ bias = 'base', showAc = true, caption, mode }) {
  const emitterBias = bias === 'emitter' || mode === 'emitter'
  return (
    <Scene caption={caption || (emitterBias ? 'Emitter-biased CE amplifier' : 'Base-biased CE amplifier')}>
      <L x="450" y="36" size={22} fill={N}>Common-Emitter Amplifier</L>
      <Wire x1="420" y1="60" x2="420" y2="90" />
      <L x="420" y="54" size={18} fill={N}>VCC</L>
      <Resistor x={420} y={90} label="RC" />
      <Wire x1="420" y1="168" x2="420" y2="200" color={RED} className="aev-flow" />
      <NPN cx={420} cy={250} />
      <Wire x1="448" y1="218" x2="448" y2="200" />
      <Wire x1="448" y1="200" x2="420" y2="200" />
      <Wire x1="448" y1="282" x2="448" y2="320" />
      <Resistor x={448} y={320} label="RE" />
      <Wire x1="448" y1="398" x2="448" y2="430" />
      <Wire x1="400" y1="430" x2="496" y2="430" />
      <L x="448" y="458" size={16} fill={MUTED}>GND</L>
      {emitterBias ? (
        <>
          <Wire x1="180" y1="250" x2="280" y2="250" />
          <Resistor x={180} y={180} label="R1" />
          <Wire x1="180" y1="100" x2="180" y2="180" />
          <Wire x1="180" y1="100" x2="420" y2="100" dash="6 6" color={MUTED} />
          <Resistor x={180} y={270} label="R2" />
          <Wire x1="180" y1="348" x2="180" y2="430" />
          <Wire x1="180" y1="430" x2="400" y2="430" />
          <Cap x={300} y={244} orient="h" label="Cin" />
          <Wire x1="80" y1="250" x2="300" y2="250" color={BLUE} className={showAc ? 'aev-flow' : ''} />
          <L x="70" y="246" size={18} fill={BLUE} anchor="end">Vin</L>
        </>
      ) : (
        <>
          <Wire x1="200" y1="250" x2="382" y2="250" />
          <Resistor x={200} y={140} label="RB" />
          <Wire x1="200" y1="80" x2="200" y2="140" />
          <Wire x1="200" y1="80" x2="420" y2="80" dash="6 6" color={MUTED} />
          <Cap x={280} y={244} orient="h" label="Cin" />
          <Wire x1="80" y1="250" x2="280" y2="250" color={BLUE} className={showAc ? 'aev-flow' : ''} />
          <L x="70" y="246" size={18} fill={BLUE} anchor="end">Vin</L>
        </>
      )}
      <Cap x={520} y={194} orient="h" label="Cout" />
      <Wire x1="420" y1="200" x2="520" y2="200" />
      <Wire x1="530" y1="200" x2="720" y2="200" color={BLUE} className={showAc ? 'aev-flow' : ''} />
      <L x="740" y="206" size={18} fill={BLUE} anchor="start">Vout</L>
      {showAc && (
        <>
          <WavePath d={sinePts(90, 200, 14, 2, 32, 70)} color={BLUE} w={2.5} />
          <WavePath d={sinePts(740, 160, 28, 2, 32, 90)} color={GREEN} w={2.5} />
          <L x="785" y="130" size={15} fill={GREEN}>−Av·vin</L>
        </>
      )}
      <CurrentDots points={[[420, 110], [420, 150], [420, 190], [448, 300], [448, 360]]} />
      <L x="560" y="280" size={16} fill={AMBER} className="aev-glow">Q-point active</L>
    </Scene>
  )
}

/* ─── 2–9 BJT family ───────────────────────────────────────────── */
export function SmallSignalRide({ caption }) {
  return (
    <Scene caption={caption || 'Small AC rides on DC bias'}>
      <L x="450" y="40" size={22}>DC bias + small-signal ride</L>
      <Wire x1="80" y1="280" x2="820" y2="280" color={MUTED} w={2} dash="4 8" />
      <L x="70" y="276" size={16} fill={AMBER} anchor="end">VBIAS</L>
      <WavePath d={`M100 280 ${Array.from({ length: 40 }, (_, i) => {
        const x = 100 + i * 18
        const y = 280 - Math.sin(i * 0.45) * 22
        return `L${x} ${y}`
      }).join(' ')}`} color={BLUE} w={3.5} />
      <circle cx="450" cy="280" r="10" fill={AMBER} className="aev-pulse" />
      <L x="450" y="310" size={17} fill={AMBER}>Q</L>
      <L x="200" y="220" size={16} fill={BLUE}>small vsig</L>
      <L x="700" y="360" size={16} fill={MUTED}>stay in linear region</L>
    </Scene>
  )
}

export function RePrimeViz({ caption }) {
  return (
    <Scene caption={caption || "re′ ≈ 25 mV / IE"}>
      <L x="450" y="40" size={22}>Emitter diode AC resistance</L>
      <L x="220" y="160" size={28} fill={RED}>IE</L>
      <path d="M280 160 H380" stroke={N} strokeWidth="3" markerEnd="url(#aeArr)" className="aev-draw" />
      <defs>
        <marker id="aeArr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M0 0 L10 5 L0 10 Z" fill={N} />
        </marker>
      </defs>
      <rect x="400" y="120" width="200" height="80" rx="12" fill={SKY} stroke={PURP} strokeWidth="3" className="aev-glow" />
      <L x="500" y="168" size={24} fill={PURP}>re′ = 25mV/IE</L>
      <L x="220" y="320" size={18} fill={MUTED}>larger IE</L>
      <path d="M280 300 C360 300 420 220 500 200" fill="none" stroke={AMBER} strokeWidth="4" className="aev-flow" />
      <L x="560" y="200" size={18} fill={AMBER} anchor="start">smaller re′</L>
      <WavePath d="M650 280 Q700 220 750 280 Q800 340 850 280" color={BLUE} w={3} />
      <L x="750" y="360" size={16} fill={BLUE}>inverse relation</L>
    </Scene>
  )
}

export function BjtRModel({ caption }) {
  // Input port (B–E) on the left, controlled source + output port (C–E) on the right.
  const railY = 420
  return (
    <Scene caption={caption || "r′e small-signal model"}>
      <L x="450" y="46" size={26}>Two-port r′e small-signal model</L>
      {/* input port */}
      <L x="70" y="150" size={22} fill={BLUE} anchor="start">ib →</L>
      <Wire x1="70" y1="180" x2="200" y2="180" color={BLUE} w={4} className="aev-flow" />
      <L x="150" y="150" size={18} fill={MUTED} anchor="start">B</L>
      <Resistor x={200} y={140} orient="h" label="βac·re′  (= rπ)" color={AMBER} />
      <Wire x1="340" y1="180" x2="420" y2="180" color={BLUE} w={4} />
      <Wire x1="420" y1="180" x2="420" y2={railY} w={3.5} />
      {/* controlled current source (diamond) */}
      <g className="aev-pulse">
        <polygon points="620,120 700,220 620,320 540,220" fill="#fff5db" stroke={RED} strokeWidth="3.5" />
        <path d="M620 175 v90 M620 175 l-10 16 M620 175 l10 16" stroke={RED} strokeWidth="3" fill="none" />
      </g>
      <L x="620" y="360" size={22} fill={RED}>β·ib</L>
      <L x="620" y="388" size={16} fill={MUTED}>= gm·vbe</L>
      {/* output port */}
      <Wire x1="620" y1="120" x2="620" y2="80" color={GREEN} w={4} />
      <Wire x1="620" y1="80" x2="820" y2="80" color={GREEN} w={4} className="aev-flow" />
      <L x="835" y="86" size={22} fill={GREEN} anchor="start">ic</L>
      <Resistor x={780} y={120} label="ro" />
      <Wire x1="780" y1="198" x2="780" y2={railY} />
      <Wire x1="620" y1="320" x2="620" y2={railY} w={3.5} />
      {/* common emitter rail */}
      <Wire x1="420" y1={railY} x2="820" y2={railY} w={3.5} />
      <L x="405" y={railY + 6} size={18} fill={MUTED} anchor="end">E</L>
      <L x="245" y="450" size={17} fill={MUTED} anchor="start">rin(base) = βac·re′</L>
    </Scene>
  )
}

export function AmpGainPhase({ caption }) {
  return (
    <Scene caption={caption || 'CE gain: larger & inverted'}>
      <L x="450" y="40" size={22}>Voltage gain and phase</L>
      <L x="200" y="100" size={18} fill={BLUE}>vin</L>
      <WavePath d={sinePts(100, 220, 28, 2.5, 40, 200)} color={BLUE} w={3.5} />
      <path d="M340 220 H420" stroke={N} strokeWidth="3" />
      <rect x="420" y="170" width="100" height="100" rx="12" fill={SKY} stroke={N} strokeWidth="3">
        <title>CE</title>
      </rect>
      <L x="470" y="230" size={22}>CE</L>
      <path d="M520 220 H580" stroke={N} strokeWidth="3" />
      <L x="720" y="100" size={18} fill={GREEN}>vout = −Av·vin</L>
      <WavePath d={sinePts(580, 220, 70, 2.5, 40, 220)} color={GREEN} w={3.5} />
      <L x="450" y="400" size={18} fill={PURP} className="aev-glow">180° phase inversion</L>
    </Scene>
  )
}

export function MultistageCascade({ caption }) {
  return (
    <Scene caption={caption || 'Cascaded CE stages'}>
      <L x="450" y="40" size={22}>Multistage cascade</L>
      {[180, 480].map((x, i) => (
        <g key={i}>
          <rect x={x} y="140" width="200" height="220" rx="14" fill={SKY} stroke={N} strokeWidth="3" />
          <L x={x + 100} y="180" size={20}>CE {i + 1}</L>
          <NPN cx={x + 100} cy={280} scale={0.7} label={`Q${i + 1}`} />
          <L x={x + 100} y="390" size={16} fill={MUTED}>{`Av${i + 1}`}</L>
        </g>
      ))}
      <path d="M380 250 H480" stroke={AMBER} strokeWidth="4" className="aev-flow" markerEnd="url(#aeArr2)" />
      <defs>
        <marker id="aeArr2" markerWidth="12" markerHeight="12" refX="10" refY="6" orient="auto">
          <path d="M0 0 L12 6 L0 12 Z" fill={AMBER} />
        </marker>
      </defs>
      <L x="430" y="230" size={16} fill={AMBER}>loading</L>
      <L x="80" y="256" size={18} fill={BLUE} anchor="start">Vin</L>
      <Wire x1="100" y1="250" x2="180" y2="250" color={BLUE} className="aev-flow" />
      <Wire x1="680" y1="250" x2="800" y2="250" color={GREEN} className="aev-flow" />
      <L x="820" y="256" size={18} fill={GREEN} anchor="start">Vout</L>
      <L x="450" y="440" size={18} fill={PURP}>Av,total ≈ Av1 × Av2 (loaded)</L>
    </Scene>
  )
}

export function EmitterFollower({ caption }) {
  return (
    <Scene caption={caption || 'Common-collector buffer'}>
      <L x="450" y="40" size={22}>Emitter follower (CC)</L>
      <Wire x1="450" y1="70" x2="450" y2="110" />
      <L x="450" y="64" size={18}>VCC</L>
      <NPN cx={450} cy={180} />
      <Wire x1="100" y1="180" x2="412" y2="180" color={BLUE} className="aev-flow" />
      <L x="80" y="176" size={18} fill={BLUE} anchor="end">Vin</L>
      <Wire x1="478" y1="212" x2="478" y2="280" />
      <Resistor x={478} y={280} label="RE" />
      <Wire x1="478" y1="358" x2="478" y2="400" />
      <Wire x1="478" y1="250" x2="700" y2="250" color={GREEN} className="aev-flow" />
      <L x="720" y="256" size={18} fill={GREEN} anchor="start">Vout ≈ Vin</L>
      <L x="700" y="320" size={17} fill={AMBER} className="aev-pulse">low Zout</L>
      <L x="200" y="320" size={16} fill={MUTED}>unity voltage gain · power buffer</L>
    </Scene>
  )
}

export function DarlingtonPair({ caption }) {
  return (
    <Scene caption={caption || 'Darlington compound β'}>
      <L x="450" y="40" size={22}>Darlington pair</L>
      <NPN cx={320} cy={220} label="Q1" />
      <NPN cx={520} cy={280} label="Q2" />
      <Wire x1="348" y1="252" x2="482" y2="280" color={RED} className="aev-flow" />
      <Wire x1="120" y1="220" x2="282" y2="220" color={BLUE} className="aev-flow" />
      <L x="100" y="216" size={18} fill={BLUE} anchor="end">ib</L>
      <Wire x1="548" y1="312" x2="548" y2="400" color={GREEN} className="aev-flow" />
      <L x="570" y="380" size={18} fill={GREEN} anchor="start">ie ≈ β² ib</L>
      <rect x="640" y="160" width="180" height="80" rx="12" fill="#fff5db" stroke={PURP} strokeWidth="3" className="aev-glow" />
      <L x="730" y="208" size={22} fill={PURP}>βD ≈ β1·β2</L>
    </Scene>
  )
}

export function CommonBase({ caption }) {
  return (
    <Scene caption={caption || 'Common-base: low Zin'}>
      <L x="450" y="40" size={22}>Common-base stage</L>
      <Wire x1="450" y1="70" x2="450" y2="110" />
      <Resistor x={450} y={110} label="RC" />
      <Wire x1="450" y1="188" x2="450" y2="210" />
      <NPN cx={450} cy={260} />
      <Wire x1="450" y1="210" x2="478" y2="228" />
      <Wire x1="380" y1="260" x2="280" y2="260" />
      <Wire x1="280" y1="260" x2="280" y2="400" color={AMBER} />
      <L x="280" y="420" size={16} fill={AMBER}>B → AC ground</L>
      <Wire x1="120" y1="320" x2="478" y2="292" color={BLUE} className="aev-flow" />
      <L x="100" y="316" size={18} fill={BLUE} anchor="end">Vin (E)</L>
      <Wire x1="450" y1="188" x2="700" y2="188" color={GREEN} className="aev-flow" />
      <L x="720" y="194" size={18} fill={GREEN} anchor="start">Vout</L>
      <L x="200" y="200" size={17} fill={RED} className="aev-pulse">low Zin</L>
    </Scene>
  )
}

/* ─── 10. MOSFET family ────────────────────────────────────────── */
export function MosfetAmp({ kind = 'cs', caption, mode }) {
  const k = mode || kind
  const titles = {
    vgs: 'Gate-source bias', divider: 'Voltage-divider bias', feedback: 'Drain-gate feedback',
    cs: 'Common-source amp', cg: 'Common-gate amp', follower: 'Source follower',
    loadline: 'MOSFET load line', gm: 'gm = ΔID/ΔVGS', smallsignal: 'Small-signal model', gain: 'CS voltage gain',
  }
  if (k === 'loadline') {
    return (
      <Scene caption={caption || titles.loadline}>
        <L x="450" y="36" size={22}>{titles.loadline}</L>
        <Wire x1="120" y1="420" x2="780" y2="420" /><Wire x1="120" y1="420" x2="120" y2="80" />
        <L x="100" y="70" size={16} fill={MUTED} anchor="end">ID</L>
        <L x="800" y="440" size={16} fill={MUTED}>VDS</L>
        <line x1="160" y1="120" x2="700" y2="400" stroke={RED} strokeWidth="3" className="aev-draw" />
        <circle cx="420" cy="260" r="10" fill={AMBER} className="aev-pulse" />
        <L x="440" y="250" size={17} fill={AMBER} anchor="start">Q</L>
        <L x="500" y="160" size={16} fill={MUTED}>saturation region</L>
      </Scene>
    )
  }
  if (k === 'gm') {
    return (
      <Scene caption={caption || titles.gm}>
        <L x="450" y="36" size={22}>Transconductance slope</L>
        <Wire x1="140" y1="400" x2="780" y2="400" /><Wire x1="140" y1="400" x2="140" y2="90" />
        <L x="120" y="80" size={16} fill={MUTED} anchor="end">ID</L>
        <L x="800" y="420" size={16} fill={MUTED}>VGS</L>
        <path d="M200 380 Q360 340 480 220 T720 120" fill="none" stroke={BLUE} strokeWidth="4" className="aev-draw" />
        <line x1="420" y1="280" x2="560" y2="180" stroke={AMBER} strokeWidth="3" className="aev-glow" />
        <L x="560" y="170" size={18} fill={AMBER} anchor="start">gm</L>
      </Scene>
    )
  }
  if (k === 'smallsignal') {
    return (
      <Scene caption={caption || titles.smallsignal}>
        <L x="450" y="36" size={22}>MOS small-signal model</L>
        <L x="100" y="200" size={18} fill={BLUE} anchor="start">vgs</L>
        <Wire x1="150" y1="200" x2="280" y2="200" color={BLUE} />
        <L x="280" y="160" size={16} fill={MUTED}>G</L>
        <rect x="400" y="140" width="180" height="120" rx="12" fill="#fff5db" stroke={RED} strokeWidth="3" className="aev-pulse" />
        <L x="490" y="200" size={22} fill={RED}>gm·vgs</L>
        <L x="490" y="230" size={15} fill={MUTED}>controlled source</L>
        <Wire x1="580" y1="200" x2="720" y2="200" color={GREEN} className="aev-flow" />
        <Resistor x={720} y={160} label="ro" />
        <L x="800" y="206" size={18} fill={GREEN} anchor="start">id</L>
      </Scene>
    )
  }
  if (k === 'gain') {
    return (
      <Scene caption={caption || titles.gain}>
        <L x="450" y="40" size={22}>Av ≈ −gm·RD</L>
        <WavePath d={sinePts(80, 240, 20, 2, 32, 160)} color={BLUE} w={3} />
        <MOSFET cx={400} cy={240} />
        <Resistor x={428} y={80} label="RD" />
        <WavePath d={sinePts(560, 200, 55, 2, 32, 200)} color={GREEN} w={3} />
        <L x="450" y="400" size={18} fill={PURP}>inverted · gain set by gm and RD</L>
      </Scene>
    )
  }
  const showRs = k === 'cs' || k === 'follower' || k === 'divider'
  const showDivider = k === 'divider' || k === 'vgs'
  const feedback = k === 'feedback'
  const cg = k === 'cg'
  const foll = k === 'follower'
  return (
    <Scene caption={caption || titles[k] || 'MOSFET amplifier'}>
      <L x="450" y="36" size={22}>{titles[k] || 'MOSFET amp'}</L>
      <Wire x1="480" y1="60" x2="480" y2="95" />
      <L x="480" y="54" size={17}>VDD</L>
      {!foll && <Resistor x={480} y={95} label="RD" />}
      <Wire x1="480" y1={foll ? 95 : 173} x2="480" y2="200" color={RED} className="aev-flow" />
      <MOSFET cx={480} cy={260} />
      <Wire x1="508" y1="220" x2="508" y2="200" /><Wire x1="508" y1="200" x2="480" y2="200" />
      {showRs && (
        <>
          <Wire x1="508" y1="300" x2="508" y2="340" />
          <Resistor x={508} y={340} label="RS" />
          <Wire x1="508" y1="418" x2="508" y2="450" />
        </>
      )}
      {!showRs && <Wire x1="508" y1="300" x2="508" y2="450" />}
      <Wire x1="460" y1="450" x2="556" y2="450" />
      {showDivider && (
        <>
          <Resistor x={280} y={120} label="R1" />
          <Resistor x={280} y={280} label="R2" />
          <Wire x1="280" y1="200" x2="432" y2="260" />
        </>
      )}
      {feedback && (
        <>
          <Resistor x={360} y={140} orient="h" label="Rf" color={PURP} />
          <Wire x1="340" y1="200" x2="432" y2="260" color={PURP} className="aev-flow" />
        </>
      )}
      {cg ? (
        <>
          <Wire x1="120" y1="320" x2="508" y2="300" color={BLUE} className="aev-flow" />
          <L x="100" y="316" size={17} fill={BLUE} anchor="end">Vin (S)</L>
          <Wire x1="432" y1="260" x2="300" y2="260" color={AMBER} />
          <L x="280" y="256" size={16} fill={AMBER} anchor="end">G AC gnd</L>
        </>
      ) : (
        <>
          <Wire x1="120" y1="260" x2="432" y2="260" color={BLUE} className={foll ? '' : 'aev-flow'} />
          <L x="100" y="256" size={17} fill={BLUE} anchor="end">Vin</L>
        </>
      )}
      {foll ? (
        <>
          <Wire x1="508" y1="340" x2="700" y2="340" color={GREEN} className="aev-flow" />
          <L x="720" y="346" size={17} fill={GREEN} anchor="start">Vout ≈ Vin</L>
        </>
      ) : (
        <>
          <Wire x1="480" y1="200" x2="700" y2="200" color={GREEN} className="aev-flow" />
          <L x="720" y="206" size={17} fill={GREEN} anchor="start">Vout</L>
        </>
      )}
      <CurrentDots points={[[480, 130], [480, 180], [508, 380]]} color={RED} />
      <L x="620" y="300" size={15} fill={AMBER} className="aev-glow">gm·vgs</L>
    </Scene>
  )
}

/* ─── 11–18 Feedback / oscillators / 555 ───────────────────────── */
export function FeedbackFour({ caption }) {
  const cells = [
    ['Voltage series', 'series-shunt', 'sampling V · mixing series'],
    ['Voltage shunt', 'shunt-shunt', 'sampling V · mixing shunt'],
    ['Current series', 'series-series', 'sampling I · mixing series'],
    ['Current shunt', 'shunt-series', 'sampling I · mixing shunt'],
  ]
  return (
    <Scene caption={caption || 'Four negative-feedback topologies'}>
      <L x="450" y="36" size={20}>Sampling × Mixing</L>
      {cells.map(([t, , sub], i) => {
        const x = 60 + (i % 2) * 420
        const y = 70 + Math.floor(i / 2) * 200
        return (
          <g key={t} className="aev-pulse" style={{ animationDelay: `${i * 0.12}s` }}>
            <rect x={x} y={y} width="380" height="170" rx="14" fill={i % 2 ? SKY : '#fff5db'} stroke={PURP} strokeWidth="2.5" />
            <L x={x + 190} y={y + 60} size={20} fill={PURP}>{t}</L>
            <L x={x + 190} y={y + 100} size={15} fill={MUTED}>{sub}</L>
          </g>
        )
      })}
    </Scene>
  )
}

export function VcvsLoop({ caption }) {
  return (
    <Scene caption={caption || 'Voltage-series (VCVS) feedback'}>
      <L x="450" y="40" size={22}>Voltage-controlled voltage source</L>
      <OpAmp cx={400} cy={240} />
      <Wire x1="100" y1="270" x2="340" y2="270" color={BLUE} className="aev-flow" />
      <L x="80" y="266" size={17} fill={BLUE} anchor="end">Vin</L>
      <Wire x1="460" y1="240" x2="700" y2="240" color={GREEN} className="aev-flow" />
      <L x="720" y="246" size={17} fill={GREEN} anchor="start">Vout</L>
      <path d="M620 240 V360 H280 V270" fill="none" stroke={PURP} strokeWidth="3.5" className="aev-flow" />
      <Resistor x={450} y={340} orient="h" label="β" color={PURP} />
      <L x="450" y="420" size={17} fill={PURP} className="aev-glow">feedback factor β</L>
    </Scene>
  )
}

export function OscillatorBuild({ caption }) {
  return (
    <Scene caption={caption || 'Noise → amp → feedback → sine'}>
      <L x="450" y="36" size={20}>Building an oscillator</L>
      {[
        [80, 'noise', MUTED],
        [260, 'amp', BLUE],
        [440, 'β path', PURP],
        [620, 'growing sine', GREEN],
      ].map(([x, lab, c], i) => (
        <g key={lab}>
          <rect x={x} y="160" width="140" height="100" rx="12" fill={SKY} stroke={c} strokeWidth="3" className="aev-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          <L x={x + 70} y="220" size={17} fill={c}>{lab}</L>
          {i < 3 && <path d={`M${x + 140} 210 H${x + 180}`} stroke={N} strokeWidth="3" className="aev-flow" />}
        </g>
      ))}
      <WavePath d={sinePts(620, 360, 8 + 20, 3, 40, 200)} color={GREEN} w={3} className="aev-wave" />
      <L x="450" y="440" size={16} fill={AMBER}>Barkhausen: |Aβ| ≥ 1, ∠Aβ = 0°</L>
    </Scene>
  )
}

export function WeinBridge({ caption }) {
  return (
    <Scene caption={caption || 'Wien-bridge lead-lag network'}>
      <L x="450" y="36" size={22}>Wien bridge</L>
      <OpAmp cx={520} cy={240} />
      <Cap x={180} y={180} orient="h" label="C" />
      <Resistor x={260} y={160} orient="h" label="R" />
      <Wire x1="100" y1="200" x2="180" y2="200" color={PURP} className="aev-flow" />
      <Wire x1="340" y1="200" x2="460" y2="220" color={PURP} />
      <Resistor x={220} y={240} label="R" />
      <Cap x={220} y={320} label="C" />
      <Wire x1="220" y1="390" x2="220" y2="420" />
      <Wire x1="580" y1="240" x2="780" y2="240" color={GREEN} className="aev-flow" />
      <WavePath d={sinePts(650, 320, 30, 2, 32, 160)} color={GREEN} w={2.5} />
      <L x="450" y="460" size={16} fill={MUTED}>f = 1 / (2πRC)</L>
    </Scene>
  )
}

export function RcPhaseShift({ caption }) {
  return (
    <Scene caption={caption || 'RC phase-shift oscillator'}>
      <L x="450" y="36" size={20}>Three RC sections + inverter</L>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Resistor x={140 + i * 160} y={160} orient="h" label="R" />
          <Cap x={200 + i * 160} y={220} label="C" />
          <Wire x1={140 + i * 160} y1={200} x2={260 + i * 160} y2={200} color={PURP} className="aev-flow" />
        </g>
      ))}
      <OpAmp cx={700} cy={240} w={100} h={80} />
      <Wire x1="580" y1="200" x2="650" y2="220" />
      <Wire x1="750" y1="240" x2="820" y2="240" color={GREEN} />
      <L x="450" y="400" size={17} fill={PURP}>≈ 60° × 3 = 180° + amp inversion</L>
    </Scene>
  )
}

export function ColpittsTank({ caption }) {
  return (
    <Scene caption={caption || 'Colpitts capacitive divider'}>
      <L x="450" y="36" size={22}>Colpitts tank</L>
      <path d="M300 120 Q320 160 300 200 Q280 240 300 280 Q320 320 300 360" fill="none" stroke={N} strokeWidth="3.5" className="aev-wave" />
      <L x="260" y="240" size={18} fill={MUTED} anchor="end">L</L>
      <Cap x={420} y={160} label="C1" />
      <Cap x={420} y={280} label="C2" />
      <Wire x1="300" y1="120" x2="420" y2="160" /><Wire x1="300" y1="360" x2="420" y2="290" />
      <Wire x1="420" y1="170" x2="420" y2="280" color={AMBER} className="aev-flow" />
      <L x="500" y="230" size={17} fill={AMBER} anchor="start">capacitive tap</L>
      <rect x="600" y="180" width="160" height="100" rx="12" fill={SKY} stroke={BLUE} strokeWidth="3" className="aev-pulse" />
      <L x="680" y="240" size={18} fill={BLUE}>amp</L>
    </Scene>
  )
}

export function HartleyTank({ caption }) {
  return (
    <Scene caption={caption || 'Hartley inductive divider'}>
      <L x="450" y="36" size={22}>Hartley tank</L>
      <path d="M280 140 Q300 170 280 200 Q260 230 280 260" fill="none" stroke={N} strokeWidth="3.5" />
      <path d="M280 270 Q300 300 280 330 Q260 360 280 390" fill="none" stroke={N} strokeWidth="3.5" />
      <L x="240" y="200" size={16} fill={MUTED} anchor="end">L1</L>
      <L x="240" y="340" size={16} fill={MUTED} anchor="end">L2</L>
      <Cap x={420} y={240} label="C" />
      <Wire x1="280" y1="140" x2="420" y2="240" /><Wire x1="280" y1="390" x2="420" y2="250" />
      <Wire x1="280" y1="265" x2="360" y2="265" color={AMBER} className="aev-flow" />
      <L x="500" y="230" size={17} fill={AMBER} anchor="start">inductive tap</L>
      <rect x="600" y="180" width="160" height="100" rx="12" fill={SKY} stroke={GREEN} strokeWidth="3" className="aev-pulse" />
      <L x="680" y="240" size={18} fill={GREEN}>amp</L>
    </Scene>
  )
}

export function CrystalClock({ caption }) {
  return (
    <Scene caption={caption || 'Crystal oscillator'}>
      <L x="450" y="40" size={22}>Quartz crystal clock</L>
      <rect x="160" y="180" width="120" height="120" rx="10" fill={SKY} stroke={BLUE} strokeWidth="3" className="aev-pulse" />
      <L x="220" y="250" size={18} fill={BLUE}>amp</L>
      <rect x="380" y="200" width="140" height="80" rx="8" fill="#fff5db" stroke={AMBER} strokeWidth="3" className="aev-glow" />
      <L x="450" y="248" size={20} fill={AMBER}>XTAL</L>
      <Wire x1="280" y1="240" x2="380" y2="240" color={PURP} className="aev-flow" />
      <Wire x1="520" y1="240" x2="620" y2="240" color={PURP} className="aev-flow" />
      <Wire x1="620" y1="240" x2="620" y2="160" color={PURP} />
      <path d="M620 160 H220 V180" stroke={PURP} strokeWidth="3" fill="none" className="aev-flow" />
      <WavePath d={sinePts(680, 240, 35, 4, 40, 160)} color={GREEN} w={3} />
      <L x="760" y="300" size={16} fill={GREEN}>stable f</L>
    </Scene>
  )
}

export function Timer555({ mode = 'astable', caption }) {
  const mono = mode === 'mono'
  return (
    <Scene caption={caption || (mono ? '555 monostable' : '555 astable')}>
      <L x="450" y="36" size={22}>555 Timer — {mono ? 'one-shot' : 'astable'}</L>
      <rect x="300" y="120" width="280" height="220" rx="16" fill={SKY} stroke={N} strokeWidth="3" />
      <L x="440" y="160" size={28} fill={N}>555</L>
      <L x="340" y="220" size={15} fill={MUTED} anchor="start">TRIG</L>
      <L x="340" y="260" size={15} fill={MUTED} anchor="start">THR</L>
      <L x="340" y="300" size={15} fill={MUTED} anchor="start">DIS</L>
      <L x="540" y="260" size={15} fill={GREEN} anchor="start">OUT</L>
      <Resistor x={200} y={160} label="R" />
      <Cap x={200} y={280} label="C" />
      <Wire x1="200" y1="240" x2="300" y2="260" color={AMBER} className="aev-flow" />
      <Wire x1="580" y1="240" x2="720" y2="240" color={GREEN} className="aev-flow" />
      {mono ? (
        <path d="M720 280 H760 V200 H800 V280 H840" fill="none" stroke={GREEN} strokeWidth="3" className="aev-draw" />
      ) : (
        <path d="M720 280 V200 H760 V280 H800 V200 H840 V280" fill="none" stroke={GREEN} strokeWidth="3" className="aev-wave" />
      )}
      <L x="780" y="320" size={15} fill={GREEN}>{mono ? 'pulse' : 'square'}</L>
    </Scene>
  )
}

/* ─── 19–22 Power & filters ────────────────────────────────────── */
export function LoadLineDual({ caption }) {
  return (
    <Scene caption={caption || 'DC and AC load lines'}>
      <L x="450" y="36" size={22}>IC–VCE dual load lines</L>
      <Wire x1="120" y1="420" x2="820" y2="420" /><Wire x1="120" y1="420" x2="120" y2="70" />
      <L x="100" y="60" size={16} fill={MUTED} anchor="end">IC</L>
      <L x="840" y="440" size={16} fill={MUTED}>VCE</L>
      <line x1="160" y1="100" x2="760" y2="400" stroke={RED} strokeWidth="3" className="aev-draw" />
      <L x="500" y="120" size={16} fill={RED}>DC load line</L>
      <line x1="200" y1="160" x2="700" y2="380" stroke={BLUE} strokeWidth="3" strokeDasharray="8 6" className="aev-draw" />
      <L x="620" y="200" size={16} fill={BLUE}>AC load line</L>
      <circle cx="420" cy="270" r="11" fill={AMBER} className="aev-pulse" />
      <L x="440" y="260" size={18} fill={AMBER} anchor="start">Q</L>
    </Scene>
  )
}

export function ClassConduction({ cls = 'A', caption }) {
  const map = { A: 360, B: 180, C: 90 }
  const ang = map[cls] || 360
  const r = 90
  const sweep = ang >= 360 ? 359.9 : ang
  const rad = (sweep * Math.PI) / 180
  const x2 = 300 + r * Math.sin(rad)
  const y2 = 260 - r * Math.cos(rad)
  const large = sweep > 180 ? 1 : 0
  return (
    <Scene caption={caption || `Class ${cls} conduction`}>
      <L x="450" y="36" size={22}>Class {cls} — conduction angle</L>
      <circle cx="300" cy="260" r={r} fill={SKY} stroke={N} strokeWidth="2" />
      <path d={`M300 ${260 - r} A${r} ${r} 0 ${large} 1 ${x2} ${y2} L300 260 Z`} fill={cls === 'A' ? GREEN : cls === 'B' ? AMBER : RED} opacity="0.55" className="aev-pulse" />
      <L x="300" y="400" size={17} fill={MUTED}>{ang}°</L>
      <WavePath d={sinePts(480, 260, 60, 2, 48, 320)} color={BLUE} w={3} />
      <L x="640" y="160" size={16} fill={N}>device ON</L>
      <rect x="500" y="380" width={cls === 'A' ? 280 : cls === 'B' ? 140 : 70} height="16" rx="4" fill={GREEN} className="aev-glow" />
      <L x="640" y="420" size={15} fill={MUTED}>conduction window</L>
    </Scene>
  )
}

export function PushPullFollowers({ caption }) {
  return (
    <Scene caption={caption || 'Complementary push-pull'}>
      <L x="450" y="36" size={22}>NPN / PNP push-pull</L>
      <NPN cx={400} cy={160} label="NPN" scale={0.85} />
      <PNP cx={400} cy={320} label="PNP" scale={0.85} />
      <Wire x1="120" y1="240" x2="362" y2="160" color={BLUE} />
      <Wire x1="120" y1="240" x2="362" y2="320" color={BLUE} className="aev-flow" />
      <L x="100" y="236" size={17} fill={BLUE} anchor="end">Vin</L>
      <Wire x1="428" y1="192" x2="600" y2="240" color={GREEN} className="aev-flow" />
      <Wire x1="428" y1="352" x2="600" y2="240" color={GREEN} className="aev-flow" />
      <L x="620" y="246" size={18} fill={GREEN} anchor="start">Vout</L>
      <L x="700" y="160" size={16} fill={AMBER}>push (+)</L>
      <L x="700" y="340" size={16} fill={PURP}>pull (−)</L>
    </Scene>
  )
}

export function FilterResponse({ type = 'lp', caption, mode }) {
  const t = mode || type
  const curves = {
    lp: 'M120 120 H280 Q360 120 420 260 T700 380',
    hp: 'M120 380 Q280 380 360 200 T700 120',
    bp: 'M120 360 Q280 340 360 140 T500 140 T700 360',
    bs: 'M120 140 Q280 140 340 140 T420 340 T500 140 T700 140',
    ideal: 'M120 140 H400 V380 H700',
    first: 'M120 120 H250 Q320 120 400 250 T700 380',
    vcvs: 'M120 140 H300 Q380 140 450 220 T700 360',
    mfb: 'M120 360 Q250 350 340 160 T520 160 T700 360',
  }
  const labels = {
    lp: 'Low-pass', hp: 'High-pass', bp: 'Band-pass', bs: 'Band-stop',
    ideal: 'Ideal brick-wall', first: '1st-order roll-off', vcvs: 'VCVS Sallen-Key', mfb: 'Multiple-feedback',
  }
  return (
    <Scene caption={caption || labels[t] || 'Filter response'}>
      <L x="450" y="36" size={22}>{labels[t] || 'H(jω)'}</L>
      <Wire x1="100" y1="400" x2="780" y2="400" /><Wire x1="100" y1="400" x2="100" y2="80" />
      <L x="80" y="70" size={15} fill={MUTED} anchor="end">|H|</L>
      <L x="800" y="420" size={15} fill={MUTED}>ω</L>
      <path d={curves[t] || curves.lp} fill="none" stroke={BLUE} strokeWidth="4" className="aev-draw" />
      {(t === 'vcvs' || t === 'mfb') && (
        <g>
          <OpAmp cx={720} cy={200} w={90} h={70} />
          <L x="720" y="280" size={14} fill={MUTED}>{t.toUpperCase()}</L>
        </g>
      )}
    </Scene>
  )
}

/* ─── 23–29 DAC / ADC / op-amp apps ────────────────────────────── */
export function DacWeighted({ caption }) {
  return (
    <Scene caption={caption || 'Binary-weighted DAC'}>
      <L x="450" y="36" size={22}>Weighted resistor DAC</L>
      {['R', '2R', '4R', '8R'].map((lab, i) => (
        <g key={lab}>
          <L x="80" y={140 + i * 70} size={16} fill={BLUE} anchor="end">{`b${3 - i}`}</L>
          <Resistor x={140} y={120 + i * 70} orient="h" label={lab} />
          <Wire x1="260" y1={140 + i * 70} x2="360" y2="260" color={AMBER} className="aev-flow" />
        </g>
      ))}
      <OpAmp cx={500} cy={260} />
      <Wire x1="560" y1="260" x2="720" y2="260" color={GREEN} className="aev-flow" />
      <L x="740" y="266" size={17} fill={GREEN} anchor="start">Vout</L>
      <path d="M560 260 V160 H440 V220" fill="none" stroke={PURP} strokeWidth="2.5" />
      <Resistor x={480} y={140} orient="h" label="Rf" color={PURP} />
    </Scene>
  )
}

export function DacR2R({ caption }) {
  return (
    <Scene caption={caption || 'R–2R ladder DAC'}>
      <L x="450" y="36" size={22}>R–2R ladder</L>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <Resistor x={120 + i * 140} y={180} orient="h" label="R" />
          <Resistor x={180 + i * 140} y={220} label="2R" />
          <Wire x1={180 + i * 140} y1={300} x2={180 + i * 140} y2={340} />
          <L x={180 + i * 140} y={360} size={15} fill={BLUE}>{`b${i}`}</L>
        </g>
      ))}
      <OpAmp cx={720} cy={200} w={100} h={80} />
      <Wire x1="680" y1="200" x2="670" y2="200" color={GREEN} />
      <L x="820" y="206" size={17} fill={GREEN} anchor="start">Vout</L>
    </Scene>
  )
}

export function AdcConcept({ kind = 'idea', caption, mode }) {
  const k = mode || kind
  if (k === 'ramp') {
    return (
      <Scene caption={caption || 'Counter-ramp ADC'}>
        <L x="450" y="36" size={22}>Ramp / counter ADC</L>
        <path d="M120 360 L200 360 L700 120" fill="none" stroke={AMBER} strokeWidth="3" className="aev-draw" />
        <Wire x1="120" y1="200" x2="700" y2="200" color={BLUE} dash="6 6" />
        <L x="140" y="190" size={16} fill={BLUE}>Vin</L>
        <circle cx="520" cy="200" r="10" fill={GREEN} className="aev-pulse" />
        <L x="540" y="190" size={16} fill={GREEN} anchor="start">match → latch</L>
        <L x="450" y="420" size={16} fill={MUTED}>DAC ramp climbs until comparator trips</L>
      </Scene>
    )
  }
  if (k === 'sar') {
    return (
      <Scene caption={caption || 'SAR binary search'}>
        <L x="450" y="36" size={22}>Successive approximation</L>
        {[1, 0.5, 0.25, 0.125].map((bit, i) => (
          <g key={i}>
            <rect x={140 + i * 170} y={180} width={140} height={80} rx="10" fill={i % 2 ? SKY : '#fff5db'} stroke={PURP} strokeWidth="2.5" className="aev-pulse" style={{ animationDelay: `${i * 0.18}s` }} />
            <L x={210 + i * 170} y={228} size={18} fill={PURP}>{`bit ${3 - i}`}</L>
          </g>
        ))}
        <L x="450" y="360" size={17} fill={MUTED}>MSB → LSB binary search toward Vin</L>
      </Scene>
    )
  }
  return (
    <Scene caption={caption || 'Sampling & quantization'}>
      <L x="450" y="36" size={22}>ADC idea</L>
      <WavePath d={sinePts(80, 260, 70, 1.5, 48, 320)} color={BLUE} w={3} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i}>
          <line x1={120 + i * 55} y1={260 - Math.sin(i * 0.9) * 70} x2={120 + i * 55} y2="400" stroke={AMBER} strokeWidth="2" dash="4 4" />
          <circle cx={120 + i * 55} cy={260 - Math.sin(i * 0.9) * 70} r="7" fill={AMBER} className="aev-pulse" />
          <rect x={500 + i * 40} y={200 - (i % 4) * 20} width="32" height={80 + (i % 4) * 20} fill={GREEN} opacity="0.7" />
        </g>
      ))}
      <L x="200" y="440" size={16} fill={AMBER}>sample</L>
      <L x="620" y="440" size={16} fill={GREEN}>quantize</L>
    </Scene>
  )
}

export function PrecisionRectifier({ caption }) {
  return (
    <Scene caption={caption || 'Precision half-wave rectifier'}>
      <L x="450" y="36" size={22}>Super diode (precision HWR)</L>
      <WavePath d={sinePts(60, 240, 18, 2, 32, 140)} color={BLUE} w={2.5} />
      <L x="100" y="180" size={15} fill={BLUE}>mV in</L>
      <OpAmp cx={360} cy={240} />
      <path d="M420 240 L460 220 L500 240" fill="none" stroke={N} strokeWidth="3" />
      <polygon points="460,210 480,240 460,240" fill={AMBER} />
      <L x="490" y="200" size={15} fill={AMBER}>D</L>
      <Wire x1="500" y1="240" x2="700" y2="240" color={GREEN} className="aev-flow" />
      <path d="M700 240 Q740 240 760 200 Q780 160 820 200" fill="none" stroke={GREEN} strokeWidth="3" className="aev-wave" />
      <L x="780" y="280" size={15} fill={GREEN}>rectified</L>
    </Scene>
  )
}

export function ZeroCrossDet({ caption }) {
  return (
    <Scene caption={caption || 'Zero-crossing detector'}>
      <L x="450" y="36" size={22}>ZCD → ±sat square</L>
      <WavePath d={sinePts(80, 240, 60, 2, 48, 280)} color={BLUE} w={3} />
      <OpAmp cx={480} cy={240} w={100} h={80} />
      <Wire x1="360" y1="240" x2="430" y2="240" />
      <path d="M530 240 H580 V160 H640 V320 H700 V160 H760" fill="none" stroke={GREEN} strokeWidth="3.5" className="aev-wave" />
      <L x="200" y="400" size={16} fill={BLUE}>sine in</L>
      <L x="680" y="400" size={16} fill={GREEN}>square at zero crossings</L>
    </Scene>
  )
}

export function SchmittHysteresis({ caption }) {
  return (
    <Scene caption={caption || 'Schmitt trigger hysteresis'}>
      <L x="450" y="36" size={22}>Hysteresis loop</L>
      <path d="M200 320 H400 V160 H600 V320 Z" fill="none" stroke={PURP} strokeWidth="3.5" className="aev-draw" />
      <L x="400" y="360" size={16} fill={AMBER}>VLT</L>
      <L x="600" y="140" size={16} fill={AMBER}>VUT</L>
      <WavePath d={`M120 400 ${Array.from({ length: 30 }, (_, i) => `L${120 + i * 8},${400 - Math.sin(i * 0.8) * 12 - ((i % 5) - 2) * 2}`).join(' ')}`} color={BLUE} w={2} />
      <L x="200" y="440" size={14} fill={BLUE}>noisy in</L>
      <path d="M700 360 V200 H760 V360 H820 V200" fill="none" stroke={GREEN} strokeWidth="3" className="aev-wave" />
      <L x="760" y="400" size={14} fill={GREEN}>clean out</L>
    </Scene>
  )
}

export function RegulatorBlock({ caption }) {
  return (
    <Scene caption={caption || 'Series voltage regulator'}>
      <L x="450" y="36" size={22}>Linear regulator loop</L>
      <rect x="80" y="180" width="120" height="80" rx="10" fill={SKY} stroke={N} strokeWidth="2.5" />
      <L x="140" y="228" size={18}>Vin</L>
      <path d="M200 220 H280" stroke={N} strokeWidth="3" className="aev-flow" />
      <rect x="280" y="170" width="160" height="100" rx="12" fill="#fff5db" stroke={AMBER} strokeWidth="3" className="aev-pulse" />
      <L x="360" y="228" size={18} fill={AMBER}>pass</L>
      <path d="M440 220 H560" stroke={N} strokeWidth="3" />
      <rect x="560" y="180" width="120" height="80" rx="10" fill="#eaf8ef" stroke={GREEN} strokeWidth="2.5" />
      <L x="620" y="228" size={18} fill={GREEN}>Vout</L>
      <path d="M620 260 V360 H360 V270" fill="none" stroke={PURP} strokeWidth="3" className="aev-flow" />
      <rect x="300" y="340" width="120" height="50" rx="8" fill={SKY} stroke={PURP} strokeWidth="2" />
      <L x="360" y="372" size={15} fill={PURP}>ref + err</L>
    </Scene>
  )
}

export function OpAmpTriangle({ feedback = true, inverting = true, caption }) {
  return (
    <Scene caption={caption || 'Ideal op-amp'}>
      <L x="450" y="36" size={22}>Ideal operational amplifier</L>
      <OpAmp cx={450} cy={240} w={160} h={120} label="∞" />
      <Wire x1="120" y1={inverting ? 200 : 280} x2="370" y2={inverting ? 200 : 280} color={BLUE} className="aev-flow" />
      <L x="100" y={inverting ? 196 : 276} size={17} fill={BLUE} anchor="end">{inverting ? '− in' : '+ in'}</L>
      <Wire x1="120" y1={inverting ? 280 : 200} x2="370" y2={inverting ? 280 : 200} />
      <Wire x1="530" y1="240" x2="760" y2="240" color={GREEN} className="aev-flow" />
      <L x="780" y="246" size={17} fill={GREEN} anchor="start">out</L>
      {feedback && (
        <>
          <path d="M680 240 V140 H300 V200" fill="none" stroke={PURP} strokeWidth="3" className="aev-flow" />
          <Resistor x={480} y={120} orient="h" label="Rf" color={PURP} />
        </>
      )}
      <L x="200" y="400" size={15} fill={MUTED} anchor="start">Av → ∞ · Zin → ∞ · Zout → 0</L>
    </Scene>
  )
}

/* ─── 30. Module heroes ────────────────────────────────────────── */
export function ModuleHero({ module = 1, caption, title, question, hours }) {
  const themes = {
    1: { title: 'BJT AC Models and Voltage Amplifiers', hue: BLUE, icon: 'bjt' },
    2: { title: 'MOSFET Biasing, Small Signal Models, and Amplifier Configurations', hue: AMBER, icon: 'mos' },
    3: { title: 'Negative Feedback, Oscillators, and 555 Timer', hue: PURP, icon: 'osc' },
    4: { title: 'Power Amplifiers and Active Filters', hue: RED, icon: 'pwr' },
    5: { title: 'Linear and Nonlinear Op-Amp Applications and DC Regulators', hue: GREEN, icon: 'oa' },
  }
  const t = themes[module] || themes[1]
  const headline = title || t.title
  return (
    <Scene caption={caption || null} className="ae-hero">
      <defs>
        <radialGradient id={`aeHero${module}`} cx="50%" cy="38%" r="62%">
          <stop offset="0%" stopColor={SKY} />
          <stop offset="100%" stopColor={CREAM} />
        </radialGradient>
      </defs>
      <rect width="900" height="520" fill={`url(#aeHero${module})`} rx="8" />
      <L x="450" y="48" size={18} fill={t.hue}>{`MODULE ${module}${hours ? `  ·  ${hours} teaching hours` : ''}`}</L>
      <circle cx="450" cy="200" r="110" fill="none" stroke={t.hue} strokeWidth="3" opacity="0.35" className="aev-pulse" />
      <circle cx="450" cy="200" r="64" fill={SKY} stroke={t.hue} strokeWidth="4" className="aev-glow" />
      {t.icon === 'bjt' && <NPN cx={450} cy={200} scale={0.9} label="" />}
      {t.icon === 'mos' && <MOSFET cx={450} cy={200} scale={0.95} label="" />}
      {t.icon === 'osc' && <WavePath d={sinePts(370, 200, 40, 2, 40, 160)} color={t.hue} w={4} />}
      {t.icon === 'pwr' && <WavePath d={sinePts(370, 200, 50, 1.5, 40, 160)} color={t.hue} w={4} />}
      {t.icon === 'oa' && <OpAmp cx={450} cy={200} w={130} h={100} />}
      <foreignObject x="80" y="320" width="740" height="170">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: 'center', fontFamily: 'Plus Jakarta Sans, Source Sans 3, sans-serif' }}>
          <div style={{ fontSize: '34px', fontWeight: 700, color: '#102033', lineHeight: 1.2 }}>{headline}</div>
          {question ? (
            <div style={{ marginTop: '14px', fontSize: '20px', color: '#475569', lineHeight: 1.35 }}>{question}</div>
          ) : null}
        </div>
      </foreignObject>
    </Scene>
  )
}

/* ─── 30b. ModuleOutro — closer: the module's arc, completed ───── */
export function ModuleOutro({ module = 1, story = [], title }) {
  const hues = { 1: BLUE, 2: RED, 3: AMBER, 4: PURP, 5: GREEN }
  const hue = hues[module] || BLUE
  const beats = story.length ? story : ['Bias', 'Signal', 'Model', 'Gain', 'Apply']
  const n = beats.length
  const x0 = 90
  const x1 = 810
  const step = n > 1 ? (x1 - x0) / (n - 1) : 0
  const y = 250
  return (
    <Scene caption={null} className="ae-outro">
      <defs>
        <linearGradient id={`aeOut${module}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={hue} stopOpacity="0.25" />
          <stop offset="100%" stopColor={GREEN} stopOpacity="0.25" />
        </linearGradient>
      </defs>
      <rect width="900" height="520" fill={CREAM} rx="8" />
      <L x="450" y="80" size={22} fill={hue}>{`MODULE ${module} — COMPLETE`}</L>
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={`url(#aeOut${module})`} strokeWidth="10" strokeLinecap="round" />
      <line x1={x0} y1={y} x2={x1} y2={y} stroke={GREEN} strokeWidth="3" strokeDasharray="10 12" className="aev-flow" />
      {beats.map((b, i) => {
        const x = x0 + i * step
        return (
          <g key={b}>
            <circle cx={x} cy={y} r="16" fill="#fff" stroke={GREEN} strokeWidth="3.5" className="aev-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
            <path d={`M${x - 7} ${y} l5 6 l9 -11`} stroke={GREEN} strokeWidth="3" fill="none" />
            <L x={x} y={i % 2 ? y + 52 : y - 34} size={17} fill={N}>{b}</L>
          </g>
        )
      })}
      <foreignObject x="120" y="330" width="660" height="150">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ textAlign: 'center', fontFamily: 'Plus Jakarta Sans, Source Sans 3, sans-serif' }}>
          <div style={{ fontSize: '30px', fontWeight: 700, color: '#102033', lineHeight: 1.2 }}>{title}</div>
          <div style={{ marginTop: '12px', fontSize: '18px', color: '#16a34a', fontWeight: 700 }}>Every syllabus line mapped · circuits first, then math, then meaning.</div>
        </div>
      </foreignObject>
    </Scene>
  )
}

/* ─── 31. pickVisual ───────────────────────────────────────────── */
const VISUAL_MAP = {
  'bjt-base-bias': () => <BjtAmplifier bias="base" />,
  'bjt-emitter-bias': () => <BjtAmplifier bias="emitter" />,
  'small-signal-ride': () => <SmallSignalRide />,
  're-prime': () => <RePrimeViz />,
  'bjt-r-model': () => <BjtRModel />,
  'amp-gain-phase': () => <AmpGainPhase />,
  multistage: () => <MultistageCascade />,
  'emitter-follower': () => <EmitterFollower />,
  darlington: () => <DarlingtonPair />,
  'common-base': () => <CommonBase />,
  'mos-vgs': () => <MosfetAmp kind="vgs" />,
  'mos-vg-divider': () => <MosfetAmp kind="divider" />,
  'mos-dg-feedback': () => <MosfetAmp kind="feedback" />,
  'mos-loadline': () => <MosfetAmp kind="loadline" />,
  'mos-gain': () => <MosfetAmp kind="gain" />,
  'mos-small-signal': () => <MosfetAmp kind="smallsignal" />,
  'gm-slope': () => <MosfetAmp kind="gm" />,
  'mos-cs': () => <MosfetAmp kind="cs" />,
  'mos-cg': () => <MosfetAmp kind="cg" />,
  'mos-follower': () => <MosfetAmp kind="follower" />,
  'feedback-four': () => <FeedbackFour />,
  vcvs: () => <VcvsLoop />,
  'feedback-converters': () => <FeedbackFour />,
  'osc-build': () => <OscillatorBuild />,
  wein: () => <WeinBridge />,
  'rc-phase': () => <RcPhaseShift />,
  colpitts: () => <ColpittsTank />,
  hartley: () => <HartleyTank />,
  crystal: () => <CrystalClock />,
  timer555: () => <Timer555 mode="astable" />,
  'power-terms': () => <LoadLineDual />,
  'two-loadlines': () => <LoadLineDual />,
  'class-a': () => <ClassConduction cls="A" />,
  'class-b': () => <ClassConduction cls="B" />,
  'push-pull': () => <PushPullFollowers />,
  'class-c': () => <ClassConduction cls="C" />,
  'filter-ideal': () => <FilterResponse type="ideal" />,
  'filter-first': () => <FilterResponse type="first" />,
  'filter-vcvs': () => <FilterResponse type="vcvs" />,
  'filter-mfb': () => <FilterResponse type="mfb" />,
  'dac-weighted': () => <DacWeighted />,
  'dac-r2r': () => <DacR2R />,
  'adc-idea': () => <AdcConcept kind="idea" />,
  'adc-ramp': () => <AdcConcept kind="ramp" />,
  'adc-sar': () => <AdcConcept kind="sar" />,
  'precision-rect': () => <PrecisionRectifier />,
  'signal-process': () => <PrecisionRectifier />,
  zcd: () => <ZeroCrossDet />,
  schmitt: () => <SchmittHysteresis />,
  regulator: () => <RegulatorBlock />,
}

export function pickVisual(visualKey) {
  const factory = VISUAL_MAP[visualKey]
  if (!factory) return null
  return factory()
}

/* ─── 32. DeviceView — concept close-up (a distinct camera per topic) ── */
function ConceptGlyph({ kind, hue }) {
  const cx = 450
  const cy = 250
  switch (kind) {
    case 'npn': return <NPN cx={cx} cy={cy} scale={2.1} label="" />
    case 'pnp': return <PNP cx={cx} cy={cy} scale={2.1} label="" />
    case 'mosfet': return <MOSFET cx={cx} cy={cy} scale={2.0} label="" />
    case 'opamp': return <OpAmp cx={cx} cy={cy} w={240} h={180} label="∞" />
    case 'ride': // small AC riding a DC bias
      return (
        <g>
          <Wire x1="180" y1={cy} x2="720" y2={cy} color={AMBER} w={2.5} dash="6 10" />
          <L x="165" y={cy + 6} size={17} fill={AMBER} anchor="end">VQ</L>
          <WavePath d={sinePts(200, cy, 44, 3, 60, 480)} color={BLUE} w={4} />
          <circle cx="450" cy={cy} r="11" fill={AMBER} className="aev-pulse" />
          <L x="450" y={cy + 40} size={18} fill={AMBER}>Q</L>
        </g>
      )
    case 're-prime': // re' shrinks as IE grows
      return (
        <g>
          <L x="230" y={cy - 10} size={30} fill={RED}>IE ↑</L>
          <path d="M300 250 H430" stroke={N} strokeWidth="4" markerEnd="url(#cgArr)" />
          <defs><marker id="cgArr" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill={N} /></marker></defs>
          <rect x="450" y="210" width="220" height="80" rx="14" fill="#fff5db" stroke={PURP} strokeWidth="3.5" className="aev-glow" />
          <L x="560" y="258" size={24} fill={PURP}>re′ = 25mV/IE</L>
        </g>
      )
    case 'model': // two-port box
      return (
        <g>
          <rect x="300" y="180" width="300" height="140" rx="16" fill={SKY} stroke={N} strokeWidth="3.5" />
          <L x="450" y="240" size={26} fill={N}>rπ · β·ib</L>
          <L x="450" y="278" size={16} fill={MUTED}>small-signal two-port</L>
          <Wire x1="200" y1="215" x2="300" y2="215" color={BLUE} w={4} className="aev-flow" />
          <Wire x1="600" y1="215" x2="700" y2="215" color={GREEN} w={4} className="aev-flow" />
        </g>
      )
    case 'gain': // small in, big out
      return (
        <g>
          <WavePath d={sinePts(150, cy, 26, 2, 40, 200)} color={BLUE} w={3.5} />
          <path d="M380 250 H470" stroke={N} strokeWidth="4" markerEnd="url(#cgArr2)" />
          <defs><marker id="cgArr2" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill={N} /></marker></defs>
          <WavePath d={sinePts(490, cy, 78, 2, 40, 250)} color={GREEN} w={4} />
          <L x="600" y={cy + 120} size={18} fill={PURP}>×Av</L>
        </g>
      )
    case 'cascade': // two blocks
      return (
        <g>
          {[300, 500].map((x, i) => (
            <g key={i}>
              <rect x={x} y="200" width="120" height="100" rx="14" fill={SKY} stroke={hue} strokeWidth="3.5" className="aev-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
              <L x={x + 60} y="258" size={20} fill={hue}>A{i + 1}</L>
            </g>
          ))}
          <path d="M420 250 H500" stroke={AMBER} strokeWidth="4" className="aev-flow" />
          <Wire x1="220" y1="250" x2="300" y2="250" color={BLUE} w={4} className="aev-flow" />
          <Wire x1="620" y1="250" x2="700" y2="250" color={GREEN} w={4} className="aev-flow" />
        </g>
      )
    case 'sum-loop': { // amplifier + summing junction + feedback
      return (
        <g>
          <Wire x1="150" y1="220" x2="235" y2="220" color={BLUE} w={4} className="aev-flow" />
          <circle cx="260" cy="220" r="26" fill="#fff" stroke={N} strokeWidth="3" />
          <L x="260" y="228" size={24} fill={N}>Σ</L>
          <Wire x1="286" y1="220" x2="360" y2="220" color={N} w={3.5} />
          <rect x="360" y="180" width="150" height="90" rx="14" fill={SKY} stroke={hue} strokeWidth="3.5" />
          <L x="435" y="232" size={22} fill={hue}>A</L>
          <Wire x1="510" y1="220" x2="720" y2="220" color={GREEN} w={4} className="aev-flow" />
          <path d="M640 220 V330 H435 V330" stroke={PURP} strokeWidth="3.5" fill="none" className="aev-flow" />
          <rect x="360" y="305" width="150" height="52" rx="10" fill="#fff" stroke={PURP} strokeWidth="3" />
          <L x="435" y="338" size="20" fill={PURP}>β</L>
        </g>
      )
    }
    case 'tank': return <LcTankGlyph cx={cx} cy={cy} hue={hue} />
    case 'timer': return <TimerChipGlyph cx={cx} cy={cy} />
    case 'response': { // |H| bell / pass band
      return (
        <g>
          <Wire x1="180" y1="330" x2="740" y2="330" color={MUTED} w={2} />
          <Wire x1="200" y1="360" x2="200" y2="140" color={MUTED} w={2} />
          <path d="M200 320 Q380 320 450 180 Q520 320 700 320" fill="none" stroke={hue} strokeWidth="5" className="aev-draw" />
          <L x="450" y="150" size={17} fill={hue}>|H(jω)|</L>
        </g>
      )
    }
    case 'ladder': { // binary-weighted resistors
      return (
        <g>
          {['R', '2R', '4R', '8R'].map((lab, i) => (
            <g key={lab}>
              <L x="230" y={165 + i * 52} size={16} fill={BLUE} anchor="end">b{3 - i}</L>
              <path d={`M250 ${160 + i * 52} h60 l6 -8 l12 16 l12 -16 l12 16 l8 -8 h20`} fill="none" stroke={N} strokeWidth="3" />
              <L x="330" y={148 + i * 52} size={14} fill={MUTED}>{lab}</L>
              <Wire x1="380" y1={160 + i * 52} x2="470" y2="250" color={AMBER} w={2.5} className="aev-flow" />
            </g>
          ))}
          <circle cx="480" cy="250" r="10" fill={N} />
          <L x="520" y="256" size={18} fill={GREEN} anchor="start">→ Vout</L>
        </g>
      )
    }
    case 'r2r': { // R-2R ladder
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <path d={`M${210 + i * 110} 210 h44 l6 -7 l10 14 l10 -14 l10 14 l6 -7 h4`} fill="none" stroke={N} strokeWidth="3" />
              <path d={`M${254 + i * 110} 214 v56`} stroke={N} strokeWidth="3" />
              <L x={254 + i * 110} y="292" size={14} fill={BLUE}>b{i}</L>
            </g>
          ))}
          <L x="450" y="150" size={18} fill={N}>R · 2R ladder</L>
        </g>
      )
    }
    case 'sampler': { // sine + sample sticks + staircase
      return (
        <g>
          <WavePath d={sinePts(160, cy, 60, 1.5, 48, 300)} color={BLUE} w={3.5} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <line x1={190 + i * 60} y1={cy - Math.sin(i * 0.9) * 60} x2={190 + i * 60} y2="360" stroke={AMBER} strokeWidth="2" strokeDasharray="4 5" />
              <circle cx={190 + i * 60} cy={cy - Math.sin(i * 0.9) * 60} r="7" fill={AMBER} className="aev-pulse" />
            </g>
          ))}
          {[0, 1, 2, 3, 4].map((i) => <rect key={`b${i}`} x={520 + i * 40} y={210 - (i % 3) * 22} width="32" height={90 + (i % 3) * 22} fill={GREEN} opacity="0.75" />)}
          <L x="290" y="400" size={16} fill={AMBER}>sample</L>
          <L x="620" y="400" size={16} fill={GREEN}>quantize</L>
        </g>
      )
    }
    case 'sar': { // MSB→LSB register
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x={210 + i * 120} y="205" width="100" height="90" rx="12" fill={i % 2 ? SKY : '#fff5db'} stroke={PURP} strokeWidth="3" className="aev-pulse" style={{ animationDelay: `${i * 0.18}s` }} />
              <L x={260 + i * 120} y="258" size={18} fill={PURP}>bit{3 - i}</L>
            </g>
          ))}
          <L x="450" y="160" size={18} fill={N}>MSB → LSB search</L>
        </g>
      )
    }
    case 'ramp-cmp': { // ramp meets level
      return (
        <g>
          <Wire x1="180" y1="200" x2="720" y2="200" color={BLUE} w={2.5} dash="6 8" />
          <L x="200" y="188" size={16} fill={BLUE}>Vin</L>
          <path d="M180 340 L260 340 L680 150" fill="none" stroke={AMBER} strokeWidth="4" className="aev-draw" />
          <circle cx="520" cy="200" r="11" fill={GREEN} className="aev-pulse" />
          <L x="545" y="192" size={16} fill={GREEN} anchor="start">match → latch</L>
        </g>
      )
    }
    case 'superdiode': { // op-amp + diode
      return (
        <g>
          <OpAmp cx={400} cy={cy} w={170} h={130} label="" />
          <path d={`M490 ${cy} L560 ${cy - 26} L630 ${cy}`} fill="none" stroke={N} strokeWidth="4" />
          <polygon points={`560,${cy - 40} 588,${cy} 560,${cy}`} fill={AMBER} />
          <L x="590" y={cy - 46} size={16} fill={AMBER}>D</L>
          <Wire x1="630" y1={cy} x2="720" y2={cy} color={GREEN} w={4} className="aev-flow" />
          <L x="300" y="150" size={16} fill={MUTED}>ideal diode drop ≈ 0</L>
        </g>
      )
    }
    case 'comparator': { // op-amp comparator at zero
      return (
        <g>
          <OpAmp cx={430} cy={cy} w={200} h={150} label="" />
          <Wire x1="180" y1={cy - 30} x2="330" y2={cy - 30} color={BLUE} w={4} className="aev-flow" />
          <Wire x1="180" y1={cy + 30} x2="330" y2={cy + 30} color={MUTED} w={3} dash="6 6" />
          <L x="165" y={cy + 36} size={16} fill={MUTED} anchor="end">0 V</L>
          <Wire x1="530" y1={cy} x2="720" y2={cy} color={GREEN} w={4} className="aev-flow" />
          <L x="620" y={cy - 40} size={16} fill={GREEN}>±Vsat</L>
        </g>
      )
    }
    case 'hysteresis': { // hysteresis loop
      return (
        <g>
          <path d="M250 330 H430 V180 H620 V330 Z" fill="none" stroke={PURP} strokeWidth="5" className="aev-draw" />
          <L x="430" y="360" size={17} fill={AMBER}>VLT</L>
          <L x="620" y="160" size={17} fill={AMBER}>VUT</L>
          <path d="M430 330 H620" stroke={PURP} strokeWidth="1.5" strokeDasharray="4 6" />
        </g>
      )
    }
    case 'regulator': { // Vin -> REG -> stable Vout
      return (
        <g>
          <rect x="170" y="205" width="110" height="90" rx="12" fill="#eef4ff" stroke={N} strokeWidth="3" />
          <L x="225" y="258" size="20" fill={N}>Vin~</L>
          <path d="M280 250 H360" stroke={N} strokeWidth="3.5" className="aev-flow" />
          <rect x="360" y="195" width="150" height="110" rx="14" fill="#fff5db" stroke={AMBER} strokeWidth="3.5" className="aev-glow" />
          <L x="435" y="258" size="22" fill={AMBER}>REG</L>
          <path d="M510 250 H590" stroke={N} strokeWidth="3.5" />
          <rect x="590" y="205" width="140" height="90" rx="12" fill="#eafaf0" stroke={GREEN} strokeWidth="3" />
          <L x="660" y="252" size="18" fill={GREEN}>Vout</L>
          <line x1="600" y1="285" x2="720" y2="285" stroke={GREEN} strokeWidth="3" />
        </g>
      )
    }
    default: return <OpAmp cx={cx} cy={cy} w={240} h={180} label="∞" />
  }
}

function LcTankGlyph({ cx, cy, hue }) {
  return (
    <g>
      <path d={`M${cx - 60} ${cy - 60} q22 20 0 40 q-22 20 0 40 q22 20 0 40`} fill="none" stroke={N} strokeWidth="4" className="aev-pulse" />
      <L x={cx - 92} y={cy + 6} size={16} fill={MUTED} anchor="end">L</L>
      <line x1={cx + 40} y1={cy - 24} x2={cx + 40} y2={cy - 8} stroke={N} strokeWidth="4" />
      <line x1={cx + 24} y1={cy - 4} x2={cx + 56} y2={cy - 4} stroke={N} strokeWidth="4" />
      <L x={cx + 70} y={cy - 2} size={16} fill={MUTED} anchor="start">C</L>
      <circle cx={cx} cy={cy} r="94" fill="none" stroke={hue} strokeWidth="3" opacity="0.28" className="aev-glow" />
    </g>
  )
}

function TimerChipGlyph({ cx, cy }) {
  return (
    <g>
      <rect x={cx - 74} y={cy - 74} width="148" height="148" rx="16" fill={SKY} stroke={N} strokeWidth="3.5" />
      <L x={cx} y={cy + 8} size={40} fill={N}>555</L>
      {[-44, -12, 20].map((dy, i) => <line key={`l${i}`} x1={cx - 74} y1={cy + dy} x2={cx - 92} y2={cy + dy} stroke={N} strokeWidth="3" />)}
      {[-44, -12, 20].map((dy, i) => <line key={`r${i}`} x1={cx + 74} y1={cy + dy} x2={cx + 92} y2={cy + dy} stroke={N} strokeWidth="3" />)}
    </g>
  )
}

export function DeviceView({ device = 'npn', title, subtitle, hue = BLUE }) {
  return (
    <Scene caption={null} className="ae-device">
      <defs>
        <radialGradient id="aeDev" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor={CREAM} />
        </radialGradient>
      </defs>
      <rect width="900" height="520" fill="url(#aeDev)" rx="8" />
      {title ? <L x="450" y="64" size={26} fill={N}>{title}</L> : null}
      <circle cx="450" cy="250" r="164" fill="none" stroke={hue} strokeWidth="3" opacity="0.16" className="aev-pulse" />
      <ConceptGlyph kind={device} hue={hue} />
      {subtitle ? <L x="450" y="476" size={19} fill={MUTED}>{subtitle}</L> : null}
    </Scene>
  )
}

/* ─── 33. ResultWave — waveform-first result panel (IN vs OUT) ──── */
export function ResultWave({ kind = 'gain', caption, hue = GREEN }) {
  const inY = 150
  const outY = 370
  const axis = (
    <>
      <Wire x1="70" y1={inY} x2="850" y2={inY} color={MUTED} w={1.5} dash="4 8" />
      <Wire x1="70" y1={outY} x2="850" y2={outY} color={MUTED} w={1.5} dash="4 8" />
      <L x="60" y={inY - 46} size={16} fill={BLUE} anchor="start">INPUT</L>
      <L x="60" y={outY - 60} size={16} fill={hue} anchor="start">OUTPUT</L>
    </>
  )
  let out = null
  let cap = caption
  if (kind === 'gain') {
    out = <><WavePath d={sinePts(120, outY, 92, 2.2, 60, 640)} color={hue} w={4} className="aev-draw" style={{ '--aev-len': 1400 }} />
      <L x="470" y={outY + 118} size={17} fill={PURP}>larger · inverted (−Av)</L></>
    cap = cap || 'Gain: output larger and inverted'
  } else if (kind === 'rect') {
    const humps = Array.from({ length: 3 }, (_, i) => `M${140 + i * 230} ${outY} q57 -80 115 0`).join(' ')
    out = <><path d={humps} fill="none" stroke={hue} strokeWidth="4" className="aev-draw" style={{ '--aev-len': 1600 }} />
      <L x="470" y={outY + 110} size={17} fill={hue}>only positive half survives</L></>
    cap = cap || 'Precision rectification'
  } else if (kind === 'clip') {
    out = <><path d={`M120 ${outY} C220 ${outY - 150} 300 ${outY - 84} 400 ${outY - 84} C500 ${outY - 84} 500 ${outY - 84} 560 ${outY - 84} C660 ${outY - 84} 700 ${outY + 150} 800 ${outY + 84} C860 ${outY + 84} 840 ${outY + 84} 850 ${outY + 84}`} fill="none" stroke={RED} strokeWidth="4" className="aev-draw" style={{ '--aev-len': 1800 }} />
      <L x="470" y={outY + 118} size={17} fill={RED}>peaks clipped at saturation</L></>
    cap = cap || 'Overdrive → clipping'
  } else if (kind === 'timing') {
    out = <><path d={`M120 ${outY + 70} L200 ${outY + 70} L200 ${outY - 70} L340 ${outY - 70} L340 ${outY + 70} L480 ${outY + 70} L480 ${outY - 70} L620 ${outY - 70} L620 ${outY + 70} L760 ${outY + 70} L760 ${outY - 70} L850 ${outY - 70}`} fill="none" stroke={hue} strokeWidth="4" className="aev-draw" style={{ '--aev-len': 2600 }} />
      <L x="470" y={outY + 118} size={17} fill={hue}>square output toggles with C</L></>
    cap = cap || 'Capacitor ramp → square output'
  } else if (kind === 'steps') {
    const st = Array.from({ length: 8 }, (_, i) => `${i === 0 ? 'M' : 'L'}${120 + i * 92} ${outY + 70 - i * 18} L${120 + (i + 1) * 92} ${outY + 70 - i * 18}`).join(' ')
    out = <><path d={st} fill="none" stroke={hue} strokeWidth="4" className="aev-draw" style={{ '--aev-len': 2400 }} />
      <L x="470" y={outY + 116} size={17} fill={hue}>quantized staircase (2ⁿ levels)</L></>
    cap = cap || 'Digital code → analog steps'
  } else if (kind === 'osc') {
    out = <><g className="aev-osc"><WavePath d={sinePts(120, outY, 96, 3.4, 90, 720)} color={hue} w={4} /></g>
      <L x="470" y={outY + 120} size={17} fill={AMBER}>amplitude builds, then holds</L></>
    cap = cap || 'Startup → sustained oscillation'
  } else if (kind === 'square') {
    out = <><path d={`M120 ${outY + 70} L260 ${outY + 70} L260 ${outY - 70} L470 ${outY - 70} L470 ${outY + 70} L680 ${outY + 70} L680 ${outY - 70} L850 ${outY - 70}`} fill="none" stroke={hue} strokeWidth="4" className="aev-draw" style={{ '--aev-len': 2200 }} />
      <L x="470" y={outY + 118} size={17} fill={hue}>±saturation at each zero crossing</L></>
    cap = cap || 'Comparator → polarity square wave'
  } else {
    out = <WavePath d={sinePts(120, outY, 70, 2.2, 60, 640)} color={hue} w={4} className="aev-wave" />
  }
  return (
    <Scene caption={cap}>
      {axis}
      <WavePath d={sinePts(120, inY, 40, 2.2, 60, 640)} color={BLUE} w={3.5} className="aev-wave" />
      {out}
    </Scene>
  )
}

/* ─── 34. beatVisual — 4 distinct cameras per topic ─────────────── */
const DEVICE_BY_KEY = {
  'bjt-base-bias': 'npn', 'bjt-emitter-bias': 'npn', 'small-signal-ride': 'ride', 're-prime': 're-prime',
  'bjt-r-model': 'model', 'amp-gain-phase': 'gain', multistage: 'cascade', 'emitter-follower': 'npn',
  darlington: 'cascade', 'common-base': 'npn',
  'mos-vgs': 'mosfet', 'mos-vg-divider': 'mosfet', 'mos-dg-feedback': 'sum-loop', 'mos-loadline': 'mosfet',
  'mos-gain': 'gain', 'mos-small-signal': 'model', 'gm-slope': 'gain', 'mos-cs': 'mosfet',
  'mos-cg': 'mosfet', 'mos-follower': 'gain',
  'feedback-four': 'sum-loop', vcvs: 'gain', 'feedback-converters': 'model',
  'osc-build': 'sum-loop', wein: 'response', 'rc-phase': 'model', colpitts: 'tank', hartley: 'tank', crystal: 'response',
  timer555: 'timer',
  'power-terms': 'gain', 'two-loadlines': 'npn', 'class-a': 'npn', 'class-b': 'npn', 'push-pull': 'pnp', 'class-c': 'tank',
  'filter-ideal': 'response', 'filter-first': 'opamp', 'filter-vcvs': 'sum-loop', 'filter-mfb': 'response',
  'dac-weighted': 'ladder', 'dac-r2r': 'r2r', 'adc-idea': 'sampler', 'adc-ramp': 'ramp-cmp', 'adc-sar': 'sar',
  'precision-rect': 'superdiode', 'signal-process': 'opamp', zcd: 'comparator', schmitt: 'hysteresis', regulator: 'regulator',
}

// analysis (beat 2) + example (beat 3) scenes per key — chosen to differ from the primary circuit.
const ANALYSIS_BY_KEY = {
  'bjt-base-bias': () => <BjtRModel />, 'bjt-emitter-bias': () => <RePrimeViz />, 'small-signal-ride': () => <BjtRModel />,
  're-prime': () => <BjtRModel />, 'bjt-r-model': () => <RePrimeViz />, 'amp-gain-phase': () => <BjtRModel />,
  multistage: () => <AmpGainPhase />, 'emitter-follower': () => <BjtRModel />, darlington: () => <RegulatorBlock />,
  'common-base': () => <BjtRModel />,
  'mos-vgs': () => <MosfetAmp kind="loadline" />, 'mos-vg-divider': () => <MosfetAmp kind="loadline" />,
  'mos-dg-feedback': () => <MosfetAmp kind="smallsignal" />, 'mos-loadline': () => <MosfetAmp kind="gm" />,
  'mos-gain': () => <MosfetAmp kind="smallsignal" />, 'mos-small-signal': () => <MosfetAmp kind="gm" />,
  'gm-slope': () => <MosfetAmp kind="loadline" />, 'mos-cs': () => <MosfetAmp kind="smallsignal" />,
  'mos-cg': () => <MosfetAmp kind="smallsignal" />, 'mos-follower': () => <MosfetAmp kind="smallsignal" />,
  'feedback-four': () => <VcvsLoop />, vcvs: () => <OpAmpTriangle />, 'feedback-converters': () => <VcvsLoop />,
  'osc-build': () => <RcPhaseShift />, wein: () => <OscillatorBuild />, 'rc-phase': () => <OscillatorBuild />,
  colpitts: () => <OscillatorBuild />, hartley: () => <OscillatorBuild />, crystal: () => <OscillatorBuild />,
  timer555: () => <Timer555 mode="mono" />,
  'power-terms': () => <LoadLineDual />, 'two-loadlines': () => <ClassConduction cls="A" />,
  'class-a': () => <LoadLineDual />, 'class-b': () => <PushPullFollowers />, 'push-pull': () => <LoadLineDual />,
  'class-c': () => <LoadLineDual />,
  'filter-ideal': () => <FilterResponse type="first" />, 'filter-first': () => <FilterResponse type="ideal" />,
  'filter-vcvs': () => <FilterResponse type="mfb" />, 'filter-mfb': () => <FilterResponse type="vcvs" />,
  'dac-weighted': () => <DacR2R />, 'dac-r2r': () => <DacWeighted />, 'adc-idea': () => <AdcConcept kind="sar" />,
  'adc-ramp': () => <AdcConcept kind="sar" />, 'adc-sar': () => <AdcConcept kind="ramp" />,
  'precision-rect': () => <OpAmpTriangle />, 'signal-process': () => <OpAmpTriangle />, zcd: () => <OpAmpTriangle />,
  schmitt: () => <OpAmpTriangle />, regulator: () => <OpAmpTriangle />,
}

const EXAMPLE_BY_KEY = {
  'bjt-base-bias': () => <AmpGainPhase />, 'bjt-emitter-bias': () => <AmpGainPhase />, 'small-signal-ride': () => <ResultWave kind="gain" />,
  're-prime': () => <AmpGainPhase />, 'bjt-r-model': () => <AmpGainPhase />, 'amp-gain-phase': () => <ResultWave kind="gain" />,
  multistage: () => <ResultWave kind="gain" />, 'emitter-follower': () => <ResultWave kind="gain" hue="#16a34a" />,
  darlington: () => <EmitterFollower />, 'common-base': () => <ResultWave kind="gain" />,
  'mos-vgs': () => <MosfetAmp kind="gm" />, 'mos-vg-divider': () => <MosfetAmp kind="gm" />,
  'mos-dg-feedback': () => <MosfetAmp kind="gain" />, 'mos-loadline': () => <ResultWave kind="clip" />,
  'mos-gain': () => <ResultWave kind="gain" />, 'mos-small-signal': () => <MosfetAmp kind="gain" />,
  'gm-slope': () => <MosfetAmp kind="gain" />, 'mos-cs': () => <ResultWave kind="gain" />,
  'mos-cg': () => <ResultWave kind="gain" />, 'mos-follower': () => <ResultWave kind="gain" hue="#16a34a" />,
  'feedback-four': () => <ResultWave kind="gain" />, vcvs: () => <ResultWave kind="gain" />, 'feedback-converters': () => <OpAmpTriangle />,
  'osc-build': () => <ResultWave kind="osc" />, wein: () => <ResultWave kind="osc" />, 'rc-phase': () => <ResultWave kind="osc" />,
  colpitts: () => <ResultWave kind="osc" />, hartley: () => <ResultWave kind="osc" />, crystal: () => <ResultWave kind="osc" />,
  timer555: () => <ResultWave kind="timing" />,
  'power-terms': () => <ClassConduction cls="A" />, 'two-loadlines': () => <ResultWave kind="clip" />,
  'class-a': () => <ResultWave kind="gain" />, 'class-b': () => <ResultWave kind="clip" />, 'push-pull': () => <ResultWave kind="gain" />,
  'class-c': () => <ResultWave kind="clip" />,
  'filter-ideal': () => <ResultWave kind="osc" hue="#0d9488" />, 'filter-first': () => <ResultWave kind="osc" hue="#0d9488" />,
  'filter-vcvs': () => <ResultWave kind="osc" hue="#0d9488" />, 'filter-mfb': () => <ResultWave kind="osc" hue="#0d9488" />,
  'dac-weighted': () => <ResultWave kind="steps" />, 'dac-r2r': () => <ResultWave kind="steps" />,
  'adc-idea': () => <ResultWave kind="steps" />, 'adc-ramp': () => <ResultWave kind="timing" />, 'adc-sar': () => <ResultWave kind="steps" />,
  'precision-rect': () => <ResultWave kind="rect" />, 'signal-process': () => <ResultWave kind="rect" />, zcd: () => <ResultWave kind="square" />,
  schmitt: () => <SchmittHysteresis />, regulator: () => <ResultWave kind="timing" hue="#16a34a" />,
}

const DEVICE_TITLE = {
  npn: ['NPN transistor', 'base current controls collector current'],
  pnp: ['PNP transistor', 'complementary polarity for the pull half'],
  mosfet: ['MOSFET', 'gate field controls the channel'],
  opamp: ['Operational amplifier', 'Av → ∞ · Zin → ∞ · Zout → 0'],
  ride: ['Small signal on a bias', 'a tiny AC wiggle rides the DC operating point'],
  're-prime': ['Emitter diode resistance', "re′ sets the gain scale, and shrinks as IE rises"],
  model: ['Small-signal model', 'device → resistances + a controlled source'],
  gain: ['Voltage gain', 'a small input becomes a larger output'],
  cascade: ['Cascaded stages', 'stage gains multiply through the chain'],
  'sum-loop': ['Feedback loop', 'output is sampled and returned to the input'],
  tank: ['LC resonant tank', 'stores and returns energy each cycle'],
  timer: ['555 timer IC', 'comparators + SR latch set the timing'],
  response: ['Frequency response', 'the circuit passes some bands, rejects others'],
  ladder: ['Binary-weighted DAC', 'each bit adds a weighted current'],
  r2r: ['R–2R ladder DAC', 'only two resistor values, easy to scale'],
  sampler: ['Sample & quantize', 'analog is sampled, then rounded to levels'],
  'ramp-cmp': ['Ramp / counter ADC', 'a ramp climbs until it matches the input'],
  sar: ['Successive approximation', 'MSB→LSB binary search toward Vin'],
  superdiode: ['Precision rectifier', 'feedback hides the diode drop'],
  comparator: ['Comparator', 'output slams to ±Vsat about a reference'],
  hysteresis: ['Schmitt hysteresis', 'two thresholds reject noisy chatter'],
  regulator: ['Voltage regulator', 'holds Vout steady as Vin and load change'],
}

const HUE_BY_KIND = {
  mosfet: AMBER, pnp: RED, tank: PURP, timer: PURP, 'sum-loop': PURP, hysteresis: PURP,
  response: '#0d9488', opamp: GREEN, superdiode: GREEN, comparator: GREEN, regulator: GREEN,
  ladder: GREEN, r2r: GREEN, sampler: GREEN, 'ramp-cmp': AMBER, sar: PURP,
}

/**
 * Return one of four distinct cameras for a topic, by beat index:
 *  0 concept (device close-up) · 1 circuit (working) · 2 analysis (model/graph) · 3 example (result/waveform)
 */
export function beatVisual(unit, beat) {
  const key = unit?.visual
  if (!key) return null
  if (beat === 1) return pickVisual(key)
  if (beat === 2) return (ANALYSIS_BY_KEY[key] || (() => pickVisual(key)))()
  if (beat === 3) return (EXAMPLE_BY_KEY[key] || (() => pickVisual(key)))()
  const dev = DEVICE_BY_KEY[key] || 'npn'
  const [t, s] = DEVICE_TITLE[dev] || []
  const hue = HUE_BY_KIND[dev] || BLUE
  return <DeviceView device={dev} title={t} subtitle={s} hue={hue} />
}

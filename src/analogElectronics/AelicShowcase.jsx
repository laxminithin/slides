/**
 * AelicShowcase — bespoke A+ "hero" scenes for Analog Electronics (1BEC304).
 * Large wide-canvas art direction (viewBox 0 0 1200 600), concept-native motion
 * (aev-* classes). Each scene is a full-bleed teaching peak; routed onto chosen
 * beats via SHOWCASE (keyed by slide id) and rendered in the `showcase` layout.
 */
import {
  AE, L, Wire, Resistor, Cap, NPN, PNP, MOSFET, OpAmp, WavePath, sinePts,
} from './AelicScenes.jsx'

const { N, BLUE, RED, AMBER, PURP, GREEN, CREAM, SKY, MUTED } = AE
const MOD_HUE = { 1: '#2563eb', 2: '#dc2626', 3: '#d97706', 4: '#7c3aed', 5: '#16a34a' }

/* ── Frame + shared helpers ─────────────────────────────────────── */
function SFrame({ eyebrow, title, hue = BLUE, note, children, vb = '0 0 1200 600' }) {
  return (
    <div className="ae-scene ae-showcase-scene" aria-label={title || 'Analog electronics showcase'}>
      <svg viewBox={vb} role="img" className="ae-svg">
        <defs>
          <linearGradient id="scBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor={CREAM} />
          </linearGradient>
          <marker id="scArr" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto">
            <path d="M0 0 L11 5 L0 10 Z" fill={N} />
          </marker>
          <marker id="scArrH" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto">
            <path d="M0 0 L11 5 L0 10 Z" fill={hue} />
          </marker>
        </defs>
        <rect width="1200" height="600" fill="url(#scBg)" rx="10" />
        <rect x="0" y="0" width="1200" height="6" fill={hue} opacity="0.9" />
        {eyebrow ? <text x="54" y="52" fontSize="19" fontWeight="800" letterSpacing="2" fill={hue} fontFamily="system-ui,sans-serif">{eyebrow}</text> : null}
        {title ? <text x="54" y="92" fontSize="34" fontWeight="800" fill={N} fontFamily="Plus Jakarta Sans, system-ui, sans-serif">{title}</text> : null}
        {children}
        {note ? <text x="1146" y="566" textAnchor="end" fontSize="17" fontWeight="700" fill={MUTED} fontFamily="system-ui,sans-serif">{note}</text> : null}
      </svg>
    </div>
  )
}

function Axes({ x, y, w, h, xl, yl }) {
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - h} stroke={MUTED} strokeWidth="2.5" />
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={MUTED} strokeWidth="2.5" />
      {yl ? <L x={x - 8} y={y - h + 6} size={17} fill={MUTED} anchor="end">{yl}</L> : null}
      {xl ? <L x={x + w} y={y + 26} size={17} fill={MUTED} anchor="end">{xl}</L> : null}
    </g>
  )
}

function Dot({ x, y, color = AMBER, r = 12, label, className = 'aev-pulse', dy = -18 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} className={className} />
      {label ? <L x={x} y={y + dy} size={18} fill={color}>{label}</L> : null}
    </g>
  )
}

// long waveform helper
const wave = (x0, y0, amp, cycles, len, steps = 90) => sinePts(x0, y0, amp, cycles, steps, len)

/* ══ MODULE 1 ══════════════════════════════════════════════════════ */
export function SmallSignalOnBias() {
  const y = 320
  return (
    <SFrame eyebrow="MODULE 1 · SMALL SIGNAL" title="A tiny AC wiggle rides the DC operating point" hue={MOD_HUE[1]} note="stay inside the linear region">
      <line x1="120" y1={y} x2="1080" y2={y} stroke={AMBER} strokeWidth="3" strokeDasharray="4 10" />
      <L x="104" y={y + 6} size={20} fill={AMBER} anchor="end">VQ</L>
      <WavePath d={wave(140, y, 70, 4.5, 900)} color={BLUE} w={5} />
      <Dot x={600} y={y} color={AMBER} r={14} label="Q" dy={44} />
      <g className="aev-shift">
        <line x1="600" y1={y - 120} x2="600" y2={y + 120} stroke={AMBER} strokeWidth="2" strokeDasharray="3 7" />
      </g>
      <L x="250" y="190" size={20} fill={BLUE}>small vsig (mV)</L>
      <rect x="820" y="150" width="300" height="86" rx="14" fill={SKY} stroke={BLUE} strokeWidth="2.5" />
      <L x="970" y="184" size={19} fill={N}>v(t) = VQ + vin</L>
      <L x="970" y="214" size={16} fill={MUTED}>linearise around Q</L>
    </SFrame>
  )
}

export function ModelMorph() {
  return (
    <SFrame eyebrow="MODULE 1 · AC MODEL" title="From a physical BJT to its small-signal model" hue={MOD_HUE[1]} note="device → resistances + controlled source">
      <g transform="translate(60,120)">
        <NPN cx={180} cy={230} scale={2.4} label="" />
        <L x={180} y={400} size={20} fill={MUTED}>physical device</L>
      </g>
      <path d="M470 350 H560" stroke={N} strokeWidth="5" markerEnd="url(#scArr)" className="aev-flow" />
      <L x="515" y="330" size={18} fill={MUTED}>replace</L>
      {/* small-signal model */}
      <g transform="translate(560,160)">
        <L x={130} y={70} size={22} fill={BLUE} anchor="start">ib →</L>
        <Wire x1={60} y1={110} x2={170} y2={110} color={BLUE} w={4} className="aev-flow" />
        <Resistor x={170} y={70} orient="h" label="βac·re′ (rπ)" color={AMBER} />
        <Wire x1={310} y1={110} x2={370} y2={110} color={BLUE} w={4} />
        <Wire x1={370} y1={110} x2={370} y2={330} w={3.5} />
        <g className="aev-pulse"><polygon points="440,120 510,205 440,290 370,205" fill="#fff5db" stroke={RED} strokeWidth="3.5" /></g>
        <L x={440} y={210} size={22} fill={RED}>β·ib</L>
        <Wire x1={440} y1={120} x2={440} y2={70} color={GREEN} w={4} />
        <Wire x1={440} y1={70} x2={560} y2={70} color={GREEN} w={4} className="aev-flow" />
        <L x={574} y={76} size={22} fill={GREEN} anchor="start">ic</L>
        <Wire x1={440} y1={290} x2={440} y2={330} w={3.5} />
        <Wire x1={370} y1={330} x2={520} y2={330} w={3.5} />
      </g>
    </SFrame>
  )
}

export function TwoPortHero() {
  return (
    <SFrame eyebrow="MODULE 1 · TWO-PORT" title="The r′e model: input port, controlled source, output port" hue={MOD_HUE[1]} note="rin(base) = βac · re′">
      <L x="150" y="250" size={24} fill={BLUE} anchor="start">ib →</L>
      <Wire x1="150" y1="290" x2="320" y2="290" color={BLUE} w={5} className="aev-flow" />
      <L x="250" y="250" size={20} fill={MUTED}>B</L>
      <Resistor x={320} y={250} orient="h" label="βac·re′  (= rπ)" color={AMBER} />
      <Wire x1="460" y1="290" x2="560" y2="290" color={BLUE} w={5} />
      <Wire x1="560" y1="290" x2="560" y2="470" w={4} />
      <g className="aev-pulse"><polygon points="760,180 850,320 760,460 670,320" fill="#fff5db" stroke={RED} strokeWidth="4" /></g>
      <L x="760" y="330" size={26} fill={RED}>β·ib</L>
      <L x="760" y="500" size={18} fill={MUTED}>= gm·vbe</L>
      <Wire x1="760" y1="180" x2="760" y2="130" color={GREEN} w={5} />
      <Wire x1="760" y1="130" x2="1030" y2="130" color={GREEN} w={5} className="aev-flow" />
      <L x="1046" y="136" size={24} fill={GREEN} anchor="start">ic</L>
      <Resistor x={980} y={180} label="ro" />
      <Wire x1="980" y1="258" x2="980" y2="470" />
      <Wire x1="760" y1="460" x2="760" y2="470" w={4} />
      <Wire x1="560" y1="470" x2="1030" y2="470" w={4} />
      <L x="545" y="476" size={20} fill={MUTED} anchor="end">E</L>
    </SFrame>
  )
}

export function CELiveGain() {
  const cy = 330
  return (
    <SFrame eyebrow="MODULE 1 · COMMON-EMITTER" title="A small input becomes a large, inverted output" hue={MOD_HUE[1]} note="Av ≈ −RC / re′">
      {/* left: circuit */}
      <g transform="translate(0,60)">
        <Wire x1="300" y1="90" x2="300" y2="130" />
        <L x="300" y="82" size={18}>VCC</L>
        <Resistor x={300} y={130} label="RC" />
        <Wire x1="300" y1="208" x2="300" y2="250" color={RED} w={3.5} className="aev-flow" />
        <NPN cx={300} cy={300} scale={1.4} />
        <Wire x1="120" y1="300" x2="262" y2="300" color={BLUE} w={4} className="aev-flow" />
        <L x="104" y="296" size={18} fill={BLUE} anchor="end">Vin</L>
        <Wire x1="338" y1="330" x2="338" y2="400" />
        <Resistor x={338} y={400} label="RE" />
        <Wire x1="300" y1="250" x2="420" y2="250" color={GREEN} w={4} className="aev-flow" />
      </g>
      {/* right: waveforms */}
      <line x1="560" y1={cy - 120} x2="1120" y2={cy - 120} stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 8" />
      <line x1="560" y1={cy + 90} x2="1120" y2={cy + 90} stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 8" />
      <WavePath d={wave(600, cy - 120, 26, 2, 480)} color={BLUE} w={4} className="aev-wave" />
      <L x="600" y={cy - 170} size={18} fill={BLUE} anchor="start">vin</L>
      <WavePath d={`M600 ${cy + 90} ${Array.from({ length: 60 }, (_, i) => { const t = i / 59; return `L${600 + t * 480},${cy + 90 + Math.sin(t * Math.PI * 4) * 96}` }).join(' ')}`} color={GREEN} w={5} className="aev-osc" />
      <L x="600" y={cy + 210} size={18} fill={GREEN} anchor="start">vout = −Av·vin</L>
      <L x="840" y={cy - 20} size={19} fill={PURP}>×Av, inverted</L>
    </SFrame>
  )
}

export function PhaseInversion() {
  return (
    <SFrame eyebrow="MODULE 1 · PHASE" title="Common-emitter flips the output by 180°" hue={MOD_HUE[1]} note="input up ↔ output down">
      <WavePath d={wave(120, 210, 60, 3, 960)} color={BLUE} w={5} />
      <L x="140" y="150" size={20} fill={BLUE} anchor="start">vin</L>
      <WavePath d={`M120 420 ${Array.from({ length: 90 }, (_, i) => { const t = i / 89; return `L${120 + t * 960},${420 + Math.sin(t * Math.PI * 6) * 60}` }).join(' ')}`} color={GREEN} w={5} />
      <L x="140" y="500" size={20} fill={GREEN} anchor="start">vout (inverted)</L>
      <g className="aev-pulse">
        <path d="M600 250 A70 70 0 0 1 600 380" fill="none" stroke={PURP} strokeWidth="4" markerEnd="url(#scArr)" />
        <L x="690" y="320" size={20} fill={PURP} anchor="start">180°</L>
      </g>
    </SFrame>
  )
}

export function LoadLineQpoint() {
  const ox = 180
  const oy = 470
  return (
    <SFrame eyebrow="MODULE 1 · OPERATING POINT" title="The Q-point sits where bias meets the load line" hue={MOD_HUE[1]} note="mid-rail Q → maximum symmetric swing">
      <Axes x={ox} y={oy} w={860} h={360} xl="VCE" yl="IC" />
      <line x1={ox + 40} y1={oy - 340} x2={ox + 820} y2={oy - 20} stroke={RED} strokeWidth="4" className="aev-draw" />
      <L x={ox + 640} y={oy - 250} size={19} fill={RED}>DC load line</L>
      <line x1={ox + 200} y1={oy - 320} x2={ox + 740} y2={oy - 80} stroke={BLUE} strokeWidth="3.5" strokeDasharray="9 7" className="aev-draw" />
      <L x={ox + 610} y={oy - 130} size={18} fill={BLUE}>AC load line</L>
      <Dot x={ox + 430} y={oy - 190} color={AMBER} r={14} label="Q" dy={40} />
      <g className="aev-shift"><path d={`M${ox + 340} ${oy - 240} q90 40 180 -0`} fill="none" stroke={GREEN} strokeWidth="3" markerEnd="url(#scArr)" /></g>
      <L x={ox + 430} y={oy - 260} size={17} fill={GREEN}>swing</L>
    </SFrame>
  )
}

export function GainNumerical() {
  return (
    <SFrame eyebrow="MODULE 1 · WORKED GAIN" title="Where the gain number comes from" hue={MOD_HUE[1]} note="Av ≈ −188 (unloaded estimate)">
      <g>
        {['re′ = 25 / 1 = 25 Ω', 'Av = −RC / re′ = −4700 / 25', 'Av ≈ −188'].map((a, i) => (
          <g key={i} transform={`translate(120,${180 + i * 110})`}>
            <rect x="0" y="0" width="470" height="82" rx="14" fill={i === 2 ? '#f0fdf4' : N} stroke={i === 2 ? GREEN : 'none'} strokeWidth="3" />
            <L x="28" y="50" size={24} fill={i === 2 ? GREEN : '#7dd3fc'} anchor="start">{a}</L>
          </g>
        ))}
        {[0, 1].map((i) => <path key={i} d={`M355 ${262 + i * 110} v28`} stroke={AMBER} strokeWidth="4" markerEnd="url(#scArrH)" className="aev-flow" />)}
      </g>
      {/* live mini CE */}
      <g transform="translate(720,150)" opacity="0.98">
        <Wire x1="120" y1="40" x2="120" y2="80" /><Resistor x={120} y={80} label="RC = 4.7k" />
        <Wire x1="120" y1="158" x2="120" y2="200" color={RED} w={3} className="aev-flow" />
        <NPN cx={120} cy={250} scale={1.5} />
        <Wire x1="0" y1="250" x2="82" y2="250" color={BLUE} w={4} className="aev-flow" />
        <Wire x1="120" y1="200" x2="260" y2="200" color={GREEN} w={4} className="aev-flow" />
        <L x="140" y="360" size={17} fill={MUTED}>IE = 1 mA</L>
      </g>
    </SFrame>
  )
}

export function CascadedAmp() {
  const y = 320
  return (
    <SFrame eyebrow="MODULE 1 · MULTISTAGE" title="Stage gains multiply down the chain" hue={MOD_HUE[1]} note="Av,total = Av1′ × Av2′ (loaded)">
      <Wire x1="90" y1={y} x2="200" y2={y} color={BLUE} w={4} className="aev-flow" />
      <L x="74" y={y + 6} size={18} fill={BLUE} anchor="end">Vin</L>
      {[220, 620].map((x, i) => (
        <g key={i}>
          <rect x={x} y={y - 110} width="260" height="220" rx="18" fill={SKY} stroke={MOD_HUE[1]} strokeWidth="3.5" className="aev-pulse" style={{ animationDelay: `${i * 0.25}s` }} />
          <L x={x + 130} y={y - 60} size={22}>CE stage {i + 1}</L>
          <NPN cx={x + 130} cy={y + 20} scale={1.15} label={`Q${i + 1}`} />
        </g>
      ))}
      <path d={`M480 ${y} H620`} stroke={AMBER} strokeWidth="5" className="aev-flow" markerEnd="url(#scArrH)" />
      <L x="550" y={y - 20} size={17} fill={AMBER}>loading</L>
      <Wire x1="880" y1={y} x2="1030" y2={y} color={GREEN} w={4} className="aev-flow" />
      <L x="1046" y={y + 6} size={18} fill={GREEN} anchor="start">Vout</L>
      <WavePath d={wave(90, y + 150, 10, 2, 130)} color={BLUE} w={3} />
      <WavePath d={wave(900, y + 150, 46, 2, 160)} color={GREEN} w={4} />
    </SFrame>
  )
}

/* ══ MODULE 2 ══════════════════════════════════════════════════════ */
export function MosBiasSettle() {
  return (
    <SFrame eyebrow="MODULE 2 · BIASING" title="Divider + source resistor settle the operating point" hue={MOD_HUE[2]} note="VGS = VG − ID·RS self-adjusts">
      <Wire x1="520" y1="90" x2="520" y2="130" /><L x="520" y="82" size={18}>VDD</L>
      <Resistor x={520} y={130} label="RD" />
      <Wire x1="520" y1="208" x2="520" y2="250" color={RED} w={3.5} className="aev-flow" />
      <MOSFET cx={520} cy={320} scale={1.8} />
      <Resistor x={300} y={150} label="R1" /><Resistor x={300} y={330} label="R2" />
      <Wire x1="300" y1="228" x2="300" y2="330" /><Wire x1="300" y1="290" x2="470" y2="320" color={AMBER} w={3} className="aev-flow" />
      <Wire x1="556" y1="380" x2="556" y2="430" /><Resistor x={556} y={430} label="RS" />
      <Wire x1="520" y1="250" x2="740" y2="250" color={GREEN} w={4} className="aev-flow" />
      <L x="756" y="256" size={18} fill={GREEN} anchor="start">Vout</L>
      <rect x="830" y="300" width="300" height="90" rx="14" fill={SKY} stroke={MOD_HUE[2]} strokeWidth="2.5" className="aev-glow" />
      <L x="980" y="342" size={20} fill={N}>Q settles, then</L>
      <L x="980" y="370" size={18} fill={MUTED}>ID is stable vs device spread</L>
    </SFrame>
  )
}

export function QpointTravel() {
  const ox = 180
  const oy = 470
  return (
    <SFrame eyebrow="MODULE 2 · Q-POINT" title="Bias places Q; the load line sets the swing" hue={MOD_HUE[2]} note="VDS = VDD − ID·RD">
      <Axes x={ox} y={oy} w={860} h={360} xl="VDS" yl="ID" />
      <path d={`M${ox + 40} ${oy - 300} C${ox + 220} ${oy - 300} ${ox + 260} ${oy - 60} ${ox + 820} ${oy - 40}`} fill="none" stroke={AMBER} strokeWidth="4" className="aev-draw" />
      <L x={ox + 250} y={oy - 300} size={18} fill={AMBER}>saturation</L>
      <line x1={ox + 60} y1={oy - 320} x2={ox + 780} y2={oy - 40} stroke={RED} strokeWidth="4" className="aev-draw" />
      <L x={ox + 560} y={oy - 220} size={18} fill={RED}>load line</L>
      <g className="aev-shift"><Dot x={ox + 430} y={oy - 175} color={GREEN} r={14} label="Q" dy={40} /></g>
    </SFrame>
  )
}

export function TransferCurve() {
  const ox = 200
  const oy = 470
  return (
    <SFrame eyebrow="MODULE 2 · TRANSCONDUCTANCE" title="gm is the slope of the transfer characteristic" hue={MOD_HUE[2]} note="gm = ∂ID / ∂VGS at Q">
      <Axes x={ox} y={oy} w={800} h={380} xl="VGS" yl="ID" />
      <path d={`M${ox + 120} ${oy} Q${ox + 420} ${oy - 40} ${ox + 760} ${oy - 360}`} fill="none" stroke={BLUE} strokeWidth="5" className="aev-draw" />
      <line x1={ox + 430} y1={oy - 110} x2={ox + 640} y2={oy - 250} stroke={AMBER} strokeWidth="3.5" className="aev-glow" />
      <L x={ox + 660} y={oy - 250} size={22} fill={AMBER} anchor="start">gm</L>
      <Dot x={ox + 500} y={oy - 150} color={GREEN} r={11} label="Q" dy={34} />
      <L x={ox + 180} y={oy - 20} size={17} fill={MUTED}>VT</L>
    </SFrame>
  )
}

export function CSamplify() {
  const cy = 330
  return (
    <SFrame eyebrow="MODULE 2 · COMMON-SOURCE" title="Drain-current modulation becomes voltage gain" hue={MOD_HUE[2]} note="Av ≈ −gm·RD">
      <g transform="translate(0,40)">
        <Wire x1="300" y1="90" x2="300" y2="130" /><Resistor x={300} y={130} label="RD" />
        <Wire x1="300" y1="208" x2="300" y2="250" color={RED} w={3.5} className="aev-flow" />
        <MOSFET cx={300} cy={310} scale={1.5} />
        <Wire x1="120" y1="310" x2="252" y2="310" color={BLUE} w={4} className="aev-flow" />
        <L x="104" y="306" size={18} fill={BLUE} anchor="end">Vin</L>
        <Wire x1="300" y1="250" x2="440" y2="250" color={GREEN} w={4} className="aev-flow" />
      </g>
      <WavePath d={wave(560, cy - 110, 24, 2, 480)} color={BLUE} w={4} className="aev-wave" />
      <L x="600" y={cy - 160} size={18} fill={BLUE} anchor="start">vin</L>
      <WavePath d={`M600 ${cy + 100} ${Array.from({ length: 60 }, (_, i) => { const t = i / 59; return `L${600 + t * 480},${cy + 100 + Math.sin(t * Math.PI * 4) * 92}` }).join(' ')}`} color={GREEN} w={5} className="aev-osc" />
      <L x="600" y={cy + 220} size={18} fill={GREEN} anchor="start">vout (inverted)</L>
    </SFrame>
  )
}

export function BiasCompare() {
  return (
    <SFrame eyebrow="MODULE 2 · BIAS NETWORKS" title="Fixed-VGS drifts; divider + RS stays put" hue={MOD_HUE[2]} note="feedback trades a little gain for stability">
      {[['Fixed VGS', RED, 'ID follows device spread', -1], ['Divider + RS', GREEN, 'source feedback holds ID', 1]].map(([t, c, s, sh], i) => (
        <g key={i} transform={`translate(${120 + i * 560},150)`}>
          <rect x="0" y="0" width="470" height="360" rx="18" fill="#fff" stroke={c} strokeWidth="3" />
          <L x="235" y="48" size={24} fill={c}>{t}</L>
          <MOSFET cx={160} cy={200} scale={1.5} />
          {i === 1 && <><Wire x1="192" y1="258" x2="192" y2="300" /><Resistor x={192} y={300} label="RS" /></>}
          <g className={sh < 0 ? 'aev-shift' : ''}><Dot x={330} y={200} color={c} r={11} label="Q" dy={30} /></g>
          <L x="235" y="336" size={17} fill={MUTED}>{s}</L>
        </g>
      ))}
    </SFrame>
  )
}

export function SmallSignalResponse() {
  return (
    <SFrame eyebrow="MODULE 2 · SMALL-SIGNAL" title="The controlled source turns vgs into drain current" hue={MOD_HUE[2]} note="id = gm·vgs → across RD → vout">
      <L x="120" y="300" size={22} fill={BLUE} anchor="start">vgs</L>
      <Wire x1="180" y1="330" x2="340" y2="330" color={BLUE} w={5} className="aev-flow" />
      <L x="300" y="290" size={18} fill={MUTED}>G</L>
      <g className="aev-pulse"><polygon points="470,220 560,340 470,460 380,340" fill="#fff5db" stroke={RED} strokeWidth="4" /></g>
      <L x="470" y="350" size="26" fill={RED}>gm·vgs</L>
      <Wire x1="560" y1="330" x2="720" y2="330" color={GREEN} w={5} className="aev-flow" />
      <Resistor x={760} y={250} label="RD" />
      <L x="860" y="336" size={22} fill={GREEN} anchor="start">id</L>
      <WavePath d={wave(600, 470, 34, 2, 420)} color={GREEN} w={4} className="aev-wave" />
    </SFrame>
  )
}

export function SourceDegeneration() {
  return (
    <SFrame eyebrow="MODULE 2 · DEGENERATION" title="An unbypassed RS trades gain for linearity" hue={MOD_HUE[2]} note="Av ≈ −gm·RD / (1 + gm·RS)">
      <g transform="translate(120,140)">
        <Wire x1="150" y1="40" x2="150" y2="80" /><Resistor x={150} y={80} label="RD" />
        <MOSFET cx={150} cy={240} scale={1.6} />
        <Wire x1="186" y1="300" x2="186" y2="350" /><Resistor x={186} y={350} label="RS" color={PURP} />
        <Wire x1="0" y1="240" x2="98" y2="240" color={BLUE} w={4} className="aev-flow" />
      </g>
      <g transform="translate(560,180)">
        {[['no RS', 'Av = −gm·RD', GREEN, 200], ['with RS', 'Av = −gm·RD / (1+gm·RS)', PURP, 120]].map(([a, b, c, bw], i) => (
          <g key={i} transform={`translate(0,${i * 130})`}>
            <L x="0" y="0" size={20} fill={c} anchor="start">{a}</L>
            <rect x="0" y="18" width={bw} height="30" rx="8" fill={c} className="aev-glow" />
            <L x={bw + 16} y="42" size={18} fill={MUTED} anchor="start">{b}</L>
          </g>
        ))}
      </g>
    </SFrame>
  )
}

/* ══ MODULE 3 ══════════════════════════════════════════════════════ */
export function FeedbackLoop() {
  return (
    <SFrame eyebrow="MODULE 3 · NEGATIVE FEEDBACK" title="Output is sampled and returned to subtract at the input" hue={MOD_HUE[3]} note="Af = A / (1 + Aβ)">
      <Wire x1="120" y1="250" x2="240" y2="250" color={BLUE} w={5} className="aev-flow" />
      <L x="104" y="256" size={18} fill={BLUE} anchor="end">Vin</L>
      <circle cx="280" cy="250" r="34" fill="#fff" stroke={N} strokeWidth="3.5" />
      <L x="280" y="262" size={30} fill={N}>Σ</L>
      <L x="280" y="200" size={20} fill={RED}>−</L>
      <Wire x1="314" y1="250" x2="430" y2="250" color={N} w={4} />
      <rect x="430" y="185" width="240" height="130" rx="18" fill={SKY} stroke={MOD_HUE[3]} strokeWidth="4" />
      <L x="550" y="262" size={30} fill={MOD_HUE[3]}>A</L>
      <Wire x1="670" y1="250" x2="1030" y2="250" color={GREEN} w={5} className="aev-flow" />
      <L x="1046" y="256" size={18} fill={GREEN} anchor="start">Vout</L>
      <path d="M900 250 V430 H550 V315" fill="none" stroke={PURP} strokeWidth="4.5" className="aev-flow" markerEnd="url(#scArr)" />
      <rect x="430" y="400" width="240" height="60" rx="12" fill="#fff" stroke={PURP} strokeWidth="3" />
      <L x="550" y="438" size={24} fill={PURP}>β</L>
      <L x="720" y="435" size={18} fill={MUTED} anchor="start">returns β·Vout</L>
    </SFrame>
  )
}

export function ClosedLoopGain() {
  return (
    <SFrame eyebrow="MODULE 3 · CLOSED LOOP" title="Feedback trades raw gain for a stable, predictable one" hue={MOD_HUE[3]} note="if Aβ ≫ 1 then Af ≈ 1/β">
      {[['Open loop A', RED, 'huge, but drifts', 320, 'aev-shift'], ['Closed loop Af', GREEN, '≈ 1/β, rock steady', 150, '']].map(([t, c, s, h, cls], i) => (
        <g key={i} transform={`translate(${180 + i * 520},0)`}>
          <Axes x={0} y={480} w={360} h={360} />
          <rect x={40} y={480 - h} width="90" height={h} rx="8" fill={c} className={cls || 'aev-glow'} />
          <rect x={200} y={480 - Math.min(h, h * 0.55)} width="90" height={Math.min(h, h * 0.55)} rx="8" fill={c} opacity="0.6" />
          <L x={180} y="140" size={22} fill={c}>{t}</L>
          <L x={180} y="172" size={17} fill={MUTED}>{s}</L>
        </g>
      ))}
    </SFrame>
  )
}

export function OscStartup() {
  const y = 340
  const pts = Array.from({ length: 160 }, (_, i) => {
    const t = i / 159
    const amp = 12 + t * 150 * Math.min(1, t * 1.4)
    return `${i === 0 ? 'M' : 'L'}${120 + t * 960},${y - Math.sin(t * Math.PI * 22) * Math.min(amp, 150)}`
  }).join(' ')
  return (
    <SFrame eyebrow="MODULE 3 · OSCILLATION" title="Noise grows into a steady sine when the loop sustains" hue={MOD_HUE[3]} note="Barkhausen: |Aβ| ≥ 1, ∠Aβ = 0°">
      <line x1="120" y1={y} x2="1080" y2={y} stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 8" />
      <path d={pts} fill="none" stroke={GREEN} strokeWidth="4.5" className="aev-draw" />
      <L x="200" y={y - 170} size={18} fill={MUTED}>tiny noise</L>
      <L x="560" y={y - 200} size={18} fill={AMBER}>loop reinforces</L>
      <L x="940" y={y - 200} size={18} fill={GREEN}>steady amplitude</L>
    </SFrame>
  )
}

export function Barkhausen() {
  return (
    <SFrame eyebrow="MODULE 3 · CONDITION" title="Two conditions decide whether a loop oscillates" hue={MOD_HUE[3]} note="grow if |Aβ| > 1, then limit to 1">
      <circle cx="330" cy="320" r="150" fill="none" stroke={MOD_HUE[3]} strokeWidth="4" strokeDasharray="14 12" className="aev-flow" />
      <path d="M330 170 A150 150 0 0 1 480 320" fill="none" stroke={PURP} strokeWidth="6" />
      <L x="330" y="330" size={22} fill={N}>loop gain</L>
      <L x="330" y="362" size={18} fill={MUTED}>A · β</L>
      {[['|Aβ| = 1', 'amplitude just sustains', GREEN], ['∠Aβ = 0°', 'phase comes back in step', BLUE]].map(([a, b, c], i) => (
        <g key={i} transform={`translate(600,${210 + i * 130})`}>
          <rect x="0" y="0" width="500" height="96" rx="16" fill="#fff" stroke={c} strokeWidth="3" />
          <L x="30" y="46" size={26} fill={c} anchor="start">{a}</L>
          <L x="30" y="76" size={17} fill={MUTED} anchor="start">{b}</L>
        </g>
      ))}
    </SFrame>
  )
}

export function WeinBridgeBig() {
  return (
    <SFrame eyebrow="MODULE 3 · WEIN BRIDGE" title="An RC lead–lag bridge selects one clean frequency" hue={MOD_HUE[3]} note="f = 1 / (2π R C),  gain ≥ 3">
      <OpAmp cx={640} cy={300} w={200} h={150} label="" />
      <Cap x={230} y={210} orient="h" label="C" /><Resistor x={330} y={190} orient="h" label="R" />
      <Wire x1="140" y1="230" x2="230" y2="230" color={PURP} w={4} className="aev-flow" />
      <Wire x1="450" y1="230" x2="560" y2="265" color={PURP} w={4} />
      <Resistor x={300} y={300} label="R" /><Cap x={300} y={410} label="C" />
      <Wire x1="300" y1="478" x2="300" y2="510" /><Wire x1="180" y1="510" x2="420" y2="510" />
      <Wire x1="740" y1="300" x2="1030" y2="300" color={GREEN} w={5} className="aev-flow" />
      <WavePath d={wave(820, 200, 40, 2.2, 200)} color={GREEN} w={4} />
      <L x="1046" y="306" size={18} fill={GREEN} anchor="start">sine</L>
    </SFrame>
  )
}

export function LcTankHero() {
  return (
    <SFrame eyebrow="MODULE 3 · LC TANK" title="Energy sloshes between L and C every cycle" hue={MOD_HUE[3]} note="f ≈ 1 / (2π √(L·Ceq))">
      <path d="M360 150 Q400 210 360 270 Q320 330 360 390 Q400 450 360 470" fill="none" stroke={N} strokeWidth="6" className="aev-pulse" />
      <L x="300" y="310" size={26} fill={MUTED} anchor="end">L</L>
      <line x1="600" y1="240" x2="600" y2="290" stroke={N} strokeWidth="6" />
      <line x1="560" y1="310" x2="640" y2="310" stroke={N} strokeWidth="6" />
      <L x="670" y="316" size={26} fill={MUTED} anchor="start">C</L>
      <Wire x1="360" y1="150" x2="600" y2="240" w={4} />
      <Wire x1="360" y1="470" x2="600" y2="310" w={4} />
      <path d="M420 310 H560" stroke={AMBER} strokeWidth="6" className="aev-flow" markerEnd="url(#scArrH)" />
      <circle cx="480" cy="310" r="220" fill="none" stroke={MOD_HUE[3]} strokeWidth="3" opacity="0.2" className="aev-glow" />
      <WavePath d={wave(800, 300, 70, 3, 320)} color={GREEN} w={4} />
    </SFrame>
  )
}

export function Timer555Internal() {
  return (
    <SFrame eyebrow="MODULE 3 · 555 TIMER" title="Two comparators and an SR latch make the timing" hue={MOD_HUE[3]} note="threshold + trigger flip the output">
      <rect x="340" y="130" width="520" height="360" rx="20" fill={SKY} stroke={N} strokeWidth="4" />
      <L x="600" y="175" size={30} fill={N}>555</L>
      {/* resistor divider */}
      {[240, 300, 360].map((y, i) => <line key={i} x1="380" y1={y} x2="430" y2={y} stroke={AMBER} strokeWidth="4" />)}
      <L x="360" y="306" size={16} fill={AMBER} anchor="end">⅔,⅓ VCC</L>
      {/* comparators */}
      <polygon points="470,215 540,245 470,275" fill="#fff" stroke={PURP} strokeWidth="3" className="aev-pulse" />
      <polygon points="470,325 540,355 470,385" fill="#fff" stroke={PURP} strokeWidth="3" className="aev-pulse" />
      <L x="505" y="250" size={15} fill={PURP}>C1</L><L x="505" y="360" size={15} fill={PURP}>C2</L>
      {/* latch + output */}
      <rect x="600" y="270" width="120" height="70" rx="10" fill="#fff5db" stroke={RED} strokeWidth="3" />
      <L x="660" y="312" size={18} fill={RED}>SR latch</L>
      <Wire x1="720" y1="305" x2="860" y2="305" color={GREEN} w={5} className="aev-flow" />
      <L x="300" y="248" size={15} fill={MUTED} anchor="end">THR</L>
      <L x="300" y="360" size={15} fill={MUTED} anchor="end">TRIG</L>
      <path d="M880 340 V270 H930 V340 H980 V270 H1030" fill="none" stroke={GREEN} strokeWidth="4" className="aev-draw" />
      <L x="960" y="380" size={16} fill={GREEN}>OUT</L>
    </SFrame>
  )
}

export function AstableTiming() {
  const y1 = 220
  const y2 = 430
  return (
    <SFrame eyebrow="MODULE 3 · ASTABLE" title="The capacitor ramps between ⅓ and ⅔ VCC" hue={MOD_HUE[3]} note="output toggles as C charges and discharges">
      <line x1="120" y1={y1 - 40} x2="1080" y2={y1 - 40} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 8" />
      <L x="1092" y={y1 - 34} size={15} fill={AMBER} anchor="start">⅔VCC</L>
      <line x1="120" y1={y1 + 50} x2="1080" y2={y1 + 50} stroke={AMBER} strokeWidth="1.5" strokeDasharray="4 8" />
      <L x="1092" y={y1 + 56} size={15} fill={AMBER} anchor="start">⅓VCC</L>
      <path d={`M140 ${y1 + 50} ${Array.from({ length: 5 }, (_, i) => `L${240 + i * 170} ${y1 - 40} L${325 + i * 170} ${y1 + 50}`).join(' ')}`} fill="none" stroke={BLUE} strokeWidth="4.5" className="aev-charge" />
      <L x="150" y={y1 - 80} size={18} fill={BLUE} anchor="start">Vcap</L>
      <path d={`M140 ${y2 + 60} ${Array.from({ length: 5 }, (_, i) => `L${240 + i * 170} ${y2 + 60} L${240 + i * 170} ${y2 - 60} L${325 + i * 170} ${y2 - 60} L${325 + i * 170} ${y2 + 60}`).join(' ')}`} fill="none" stroke={GREEN} strokeWidth="4.5" className="aev-draw" />
      <L x="150" y={y2 - 90} size={18} fill={GREEN} anchor="start">Vout</L>
    </SFrame>
  )
}

export function MonostableTiming() {
  const y = 330
  return (
    <SFrame eyebrow="MODULE 3 · MONOSTABLE" title="One trigger → one timed pulse → back to rest" hue={MOD_HUE[3]} note="T = 1.1 · R · C">
      <path d={`M120 ${y} L300 ${y} L300 ${y - 60} L330 ${y - 60} L330 ${y}`} fill="none" stroke={RED} strokeWidth="4" />
      <L x="240" y={y + 40} size={18} fill={RED}>trigger</L>
      <path d={`M120 ${y + 170} L360 ${y + 170} L360 ${y + 40} L720 ${y + 40} L720 ${y + 170} L1060 ${y + 170}`} fill="none" stroke={GREEN} strokeWidth="5" className="aev-draw" />
      <L x="540" y={y + 20} size={20} fill={GREEN}>one pulse (width = 1.1RC)</L>
      <g className="aev-charge"><path d={`M360 ${y + 170} Q470 ${y + 60} 720 ${y + 55}`} fill="none" stroke={AMBER} strokeWidth="3" strokeDasharray="6 6" /></g>
      <L x="500" y={y + 130} size={16} fill={AMBER}>C charges to ⅔VCC</L>
    </SFrame>
  )
}

/* ══ MODULE 4 ══════════════════════════════════════════════════════ */
export function PowerOverview() {
  return (
    <SFrame eyebrow="MODULE 4 · POWER" title="A power stage delivers energy to the load efficiently" hue={MOD_HUE[4]} note="η = Pout / Pdc">
      <Wire x1="120" y1="300" x2="240" y2="300" color={BLUE} w={5} className="aev-flow" />
      <L x="104" y="306" size={18} fill={BLUE} anchor="end">signal</L>
      <rect x="240" y="220" width="260" height="160" rx="20" fill={SKY} stroke={MOD_HUE[4]} strokeWidth="4" className="aev-pulse" />
      <NPN cx={370} cy={300} scale={1.4} label="" />
      <L x="370" y="200" size={20} fill={MOD_HUE[4]}>power stage</L>
      <path d="M500 300 H660" stroke={RED} strokeWidth="7" className="aev-flow" markerEnd="url(#scArr)" />
      <L x="580" y="270" size={18} fill={RED}>current</L>
      <circle cx="760" cy="300" r="70" fill="#fff" stroke={GREEN} strokeWidth="4" />
      <L x="760" y="308" size={22} fill={GREEN}>RL</L>
      <path d="M760 240 q30 40 0 60 q-30 20 0 0" fill="none" stroke={GREEN} strokeWidth="3" />
      <rect x="900" y="250" width="260" height="100" rx="16" fill="#f0fdf4" stroke={GREEN} strokeWidth="3" />
      <L x="1030" y="292" size={22} fill={GREEN}>η, Pout</L>
      <L x="1030" y="322" size={16} fill={MUTED}>dominate the design</L>
    </SFrame>
  )
}

function ConductionScene({ deg, color, title, eyebrow, note }) {
  const cx = 320
  const cy = 320
  const r = 150
  const sweep = deg >= 360 ? 359.9 : deg
  const rad = (sweep * Math.PI) / 180
  const x2 = cx + r * Math.sin(rad)
  const y2 = cy - r * Math.cos(rad)
  const large = sweep > 180 ? 1 : 0
  return (
    <SFrame eyebrow={eyebrow} title={title} hue={MOD_HUE[4]} note={note}>
      <circle cx={cx} cy={cy} r={r} fill={SKY} stroke={N} strokeWidth="2.5" />
      <path d={`M${cx} ${cy - r} A${r} ${r} 0 ${large} 1 ${x2} ${y2} L${cx} ${cy} Z`} fill={color} opacity="0.5" className="aev-pulse" />
      <L x={cx} y={cy + r + 44} size={24} fill={N}>{deg}° conduction</L>
      <WavePath d={wave(560, cy, 90, 2, 520)} color={BLUE} w={4} />
      <rect x="560" y={cy + 150} width={deg >= 360 ? 520 : deg >= 180 ? 300 : 150} height="26" rx="6" fill={color} className="aev-glow" />
      <L x="580" y={cy + 210} size={18} fill={MUTED} anchor="start">device conducts</L>
    </SFrame>
  )
}
export function ClassAConduction() {
  return <ConductionScene deg={360} color={GREEN} eyebrow="MODULE 4 · CLASS A" title="Class A conducts for the whole cycle" note="best fidelity, ≤ 50% efficiency" />
}

export function ClassBPushPull() {
  return (
    <SFrame eyebrow="MODULE 4 · CLASS B" title="Complementary devices push and pull each half-cycle" hue={MOD_HUE[4]} note="NPN sources +, PNP sinks −">
      <NPN cx={420} cy={200} scale={1.4} label="NPN" />
      <PNP cx={420} cy={440} scale={1.4} label="PNP" />
      <Wire x1="150" y1="320" x2="382" y2="200" color={BLUE} w={4} />
      <Wire x1="150" y1="320" x2="382" y2="440" color={BLUE} w={4} className="aev-flow" />
      <L x="134" y="326" size={18} fill={BLUE} anchor="end">Vin</L>
      <Wire x1="458" y1="232" x2="680" y2="320" color={GREEN} w={5} className="aev-flow" />
      <Wire x1="458" y1="408" x2="680" y2="320" color={GREEN} w={5} className="aev-flow" />
      <L x="700" y="326" size={20} fill={GREEN} anchor="start">Vout</L>
      <g className="aev-pulse"><L x="800" y="200" size={20} fill={AMBER}>push +</L></g>
      <g className="aev-pulse" style={{ animationDelay: '0.9s' }}><L x="800" y="440" size={20} fill={PURP}>pull −</L></g>
      <WavePath d={wave(820, 320, 60, 2, 260)} color={GREEN} w={4} />
    </SFrame>
  )
}

export function CrossoverDistortion() {
  const y = 340
  const notch = `M120 ${y} ${Array.from({ length: 120 }, (_, i) => {
    const t = i / 119
    let v = Math.sin(t * Math.PI * 4)
    if (Math.abs(v) < 0.22) v = 0
    else v = v > 0 ? v - 0.22 : v + 0.22
    return `L${120 + t * 960},${y - v * 150}`
  }).join(' ')}`
  return (
    <SFrame eyebrow="MODULE 4 · CROSSOVER" title="Without bias, a notch appears at every zero crossing" hue={MOD_HUE[4]} note="both devices off near 0 V">
      <line x1="120" y1={y} x2="1080" y2={y} stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 8" />
      <WavePath d={wave(120, y, 150, 2, 960)} color={BLUE} w={2.5} className="" />
      <L x="180" y={y - 170} size={17} fill={BLUE}>ideal sine</L>
      <path d={notch} fill="none" stroke={RED} strokeWidth="5" className="aev-draw" />
      {[300, 540, 780, 1020].map((x, i) => <circle key={i} cx={x} cy={y} r="10" fill={RED} className="aev-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
      <L x="600" y={y + 190} size={18} fill={RED}>crossover notch</L>
    </SFrame>
  )
}

export function ClassABCorrection() {
  const y = 340
  return (
    <SFrame eyebrow="MODULE 4 · CLASS AB" title="A little bias fills the notch back in" hue={MOD_HUE[4]} note="small idle current removes crossover">
      <g opacity="0.4">
        <path d={`M120 ${y} ${Array.from({ length: 60 }, (_, i) => { const t = i / 59; let v = Math.sin(t * Math.PI * 4); if (Math.abs(v) < 0.22) v = 0; else v = v > 0 ? v - 0.22 : v + 0.22; return `L${120 + t * 440},${y - v * 130}` }).join(' ')}`} fill="none" stroke={RED} strokeWidth="3" />
        <L x="330" y={y + 150} size={16} fill={RED}>before (Class B)</L>
      </g>
      <WavePath d={wave(640, y, 130, 2, 440)} color={GREEN} w={5} className="aev-draw" />
      <L x="860" y={y + 150} size={17} fill={GREEN}>after (Class AB)</L>
      <path d="M470 340 H620" stroke={N} strokeWidth="4" markerEnd="url(#scArr)" className="aev-flow" />
      <L x="545" y="315" size={17} fill={AMBER}>add bias</L>
    </SFrame>
  )
}

function SweepScene({ curve, title, eyebrow, note, markers }) {
  const ox = 160
  const oy = 470
  return (
    <SFrame eyebrow={eyebrow} title={title} hue={MOD_HUE[4]} note={note}>
      <Axes x={ox} y={oy} w={900} h={380} xl="ω (log)" yl="|H|" />
      <path d={curve(ox, oy)} fill="none" stroke={'#0d9488'} strokeWidth="5" className="aev-draw" />
      <g className="aev-sweep" style={{ '--aev-sweep': '760px' }}>
        <line x1={ox + 40} y1={oy - 400} x2={ox + 40} y2={oy} stroke={AMBER} strokeWidth="3" />
        <circle cx={ox + 40} cy={oy - 200} r="9" fill={AMBER} />
      </g>
      {markers}
    </SFrame>
  )
}
export function LowPassSweep() {
  return <SweepScene eyebrow="MODULE 4 · LOW-PASS" title="A frequency sweep through the passband and roll-off" note="−20 dB/decade past fc"
    curve={(ox, oy) => `M${ox + 40} ${oy - 320} H${ox + 340} Q${ox + 460} ${oy - 320} ${ox + 560} ${oy - 120} T${ox + 880} ${oy - 30}`}
    markers={<L x={340} y={190} size={18} fill={'#0d9488'}>pass → cutoff → stop</L>} />
}
export function BandPassStop() {
  return (
    <SFrame eyebrow="MODULE 4 · BAND-PASS / STOP" title="One selects a band; the other rejects it" hue={MOD_HUE[4]} note="Q = f0 / BW">
      {[['band-pass', (ox, oy) => `M${ox} ${oy - 20} Q${ox + 150} ${oy - 20} ${ox + 200} ${oy - 300} T${ox + 400} ${oy - 20}`, '#0d9488'],
        ['band-stop', (ox, oy) => `M${ox} ${oy - 300} Q${ox + 150} ${oy - 300} ${ox + 200} ${oy - 20} T${ox + 400} ${oy - 300}`, PURP]].map(([t, c, col], i) => (
        <g key={i} transform={`translate(${100 + i * 540},0)`}>
          <Axes x={60} y={470} w={440} h={360} xl="ω" yl="|H|" />
          <path d={c(60, 470)} fill="none" stroke={col} strokeWidth="5" className="aev-draw" />
          <L x={280} y="150" size={22} fill={col}>{t}</L>
        </g>
      ))}
    </SFrame>
  )
}

export function ActiveFilterCircuit() {
  const ox = 700
  const oy = 470
  return (
    <SFrame eyebrow="MODULE 4 · ACTIVE FILTER" title="A Sallen-Key stage and the response it produces" hue={MOD_HUE[4]} note="op-amp sets gain and sharpens the skirt">
      <Resistor x={130} y={250} orient="h" label="R" /><Resistor x={270} y={250} orient="h" label="R" />
      <Cap x={340} y={320} label="C" />
      <OpAmp cx={470} cy={300} w={150} h={120} label="" />
      <Wire x1="60" y1="290" x2="130" y2="290" color={BLUE} w={4} className="aev-flow" />
      <Wire x1="250" y1="290" x2="410" y2="270" color={N} w={3.5} />
      <Cap x={210} y={360} label="C" />
      <Wire x1="545" y1="300" x2="620" y2="300" color={GREEN} w={4} className="aev-flow" />
      <path d="M470 360 V430 H360 V330" fill="none" stroke={PURP} strokeWidth="3" />
      <Axes x={ox} y={oy} w={420} h={330} xl="ω" yl="|H|" />
      <path d={`M${ox + 20} ${oy - 280} H${ox + 180} Q${ox + 260} ${oy - 280} ${ox + 320} ${oy - 60} T${ox + 400} ${oy - 20}`} fill="none" stroke={'#0d9488'} strokeWidth="5" className="aev-draw" />
      <g className="aev-sweep" style={{ '--aev-sweep': '360px' }}><line x1={ox + 20} y1={oy - 300} x2={ox + 20} y2={oy} stroke={AMBER} strokeWidth="2.5" /></g>
    </SFrame>
  )
}

/* ══ MODULE 5 ══════════════════════════════════════════════════════ */
export function OpAmpHero() {
  return (
    <SFrame eyebrow="MODULE 5 · OP-AMP" title="The ideal operational amplifier" hue={MOD_HUE[5]} note="Av → ∞ · Zin → ∞ · Zout → 0">
      <circle cx="560" cy="320" r="190" fill="none" stroke={MOD_HUE[5]} strokeWidth="3" opacity="0.2" className="aev-glow" />
      <polygon points="400,190 720,320 400,450" fill={SKY} stroke={N} strokeWidth="5" />
      <L x="440" y="255" size={40} fill={N} anchor="start">−</L>
      <L x="440" y="405" size={40} fill={N} anchor="start">+</L>
      <L x="520" y="330" size={34} fill={MUTED}>∞</L>
      <Wire x1="220" y1="245" x2="400" y2="245" color={BLUE} w={5} className="aev-flow" />
      <Wire x1="220" y1="395" x2="400" y2="395" color={BLUE} w={5} className="aev-flow" />
      <Wire x1="720" y1="320" x2="960" y2="320" color={GREEN} w={6} className="aev-flow" />
      <L x="976" y="326" size={22} fill={GREEN} anchor="start">out</L>
      <Wire x1="560" y1="130" x2="560" y2="205" color={RED} w={3} /><L x="560" y="120" size={16} fill={RED}>+V</L>
      <Wire x1="560" y1="435" x2="560" y2="500" color={N} w={3} /><L x="560" y="524" size={16} fill={MUTED}>−V</L>
    </SFrame>
  )
}

export function InvertingAmp() {
  const cy = 300
  return (
    <SFrame eyebrow="MODULE 5 · INVERTING" title="A virtual ground turns Rf/Rin into gain — and flips it" hue={MOD_HUE[5]} note="Vout = −(Rf/Rin)·Vin">
      <Resistor x={200} y={cy} orient="h" label="Rin" />
      <Wire x1="120" y1={cy + 10} x2="200" y2={cy + 10} color={BLUE} w={4} className="aev-flow" />
      <L x="104" y={cy + 16} size={18} fill={BLUE} anchor="end">Vin</L>
      <OpAmp cx={520} cy={cy} w={180} h={140} label="" />
      <Wire x1="320" y1={cy + 10} x2="430" y2={cy - 22} color={N} w={3.5} />
      <circle cx="360" cy={cy + 10} r="6" fill={AMBER} className="aev-pulse" />
      <L x="360" y={cy + 42} size={15} fill={AMBER}>virtual gnd</L>
      <Wire x1="430" y1={cy + 42} x2="360" y2={cy + 130} color={N} w={3} />
      <Wire x1="360" y1={cy + 130} x2="360" y2={cy + 10} color={N} w={0.1} />
      <path d={`M620 ${cy} V${cy - 130} H360 V${cy + 10}`} fill="none" stroke={PURP} strokeWidth="3.5" className="aev-flow" />
      <Resistor x={470} y={cy - 130} orient="h" label="Rf" color={PURP} />
      <Wire x1="620" y1={cy} x2="820" y2={cy} color={GREEN} w={5} className="aev-flow" />
      <L x="836" y={cy + 6} size={18} fill={GREEN} anchor="start">Vout</L>
      <WavePath d={wave(880, 200, 30, 1.5, 240)} color={BLUE} w={3} />
      <WavePath d={`M880 470 ${Array.from({ length: 40 }, (_, i) => { const t = i / 39; return `L${880 + t * 240},${470 + Math.sin(t * Math.PI * 3) * 46}` }).join(' ')}`} color={GREEN} w={4} />
    </SFrame>
  )
}

export function IntegratorAccumulate() {
  const y1 = 210
  const y2 = 440
  return (
    <SFrame eyebrow="MODULE 5 · INTEGRATOR" title="A square input integrates into a triangle output" hue={MOD_HUE[5]} note="the feedback capacitor accumulates charge">
      <path d={`M120 ${y1 + 50} L280 ${y1 + 50} L280 ${y1 - 50} L520 ${y1 - 50} L520 ${y1 + 50} L760 ${y1 + 50} L760 ${y1 - 50} L1000 ${y1 - 50}`} fill="none" stroke={BLUE} strokeWidth="4.5" />
      <L x="150" y={y1 - 70} size={18} fill={BLUE} anchor="start">square in</L>
      <path d={`M120 ${y2} L280 ${y2 - 70} L520 ${y2 + 70} L760 ${y2 - 70} L1000 ${y2 + 70}`} fill="none" stroke={GREEN} strokeWidth="5" className="aev-draw" />
      <L x="150" y={y2 + 100} size={18} fill={GREEN} anchor="start">triangle out (accumulated)</L>
      <g className="aev-charge"><circle cx="520" cy={y2} r="10" fill={AMBER} /></g>
    </SFrame>
  )
}

export function ComparatorSwitch() {
  const y = 320
  return (
    <SFrame eyebrow="MODULE 5 · COMPARATOR" title="At every zero crossing the output slams to ±Vsat" hue={MOD_HUE[5]} note="open-loop op-amp = comparator">
      <line x1="120" y1={y} x2="1080" y2={y} stroke={MUTED} strokeWidth="1.5" strokeDasharray="4 8" />
      <WavePath d={wave(120, y, 120, 2.5, 960)} color={BLUE} w={4} />
      <L x="170" y={y - 140} size={18} fill={BLUE}>sine in</L>
      <path d={`M120 ${y + 40} ${[0, 1, 2, 3, 4].map((i) => `L${120 + i * 192} ${y + 40} L${120 + i * 192} ${y - 160} L${216 + i * 192} ${y - 160} L${216 + i * 192} ${y + 40}`).join(' ')}`} fill="none" stroke={GREEN} strokeWidth="5" className="aev-draw" />
      {[216, 408, 600, 792, 984].map((x, i) => <circle key={i} cx={x} cy={y} r="9" fill={AMBER} className="aev-pulse" style={{ animationDelay: `${i * 0.15}s` }} />)}
      <L x="200" y={y + 130} size={18} fill={GREEN}>±Vsat square</L>
    </SFrame>
  )
}

export function SchmittHysteresisBig() {
  return (
    <SFrame eyebrow="MODULE 5 · SCHMITT TRIGGER" title="Two thresholds give clean switching in noise" hue={MOD_HUE[5]} note="width = VUT − VLT">
      <Axes x={520} y={470} w={520} h={360} xl="Vin" yl="Vout" />
      <path d="M560 430 H720 V180 H960 V430 Z" fill="none" stroke={PURP} strokeWidth="5" className="aev-draw" />
      <path d="M720 430 L960 430" stroke={PURP} strokeWidth="1.5" strokeDasharray="4 6" />
      <L x="720" y="462" size={18} fill={AMBER}>VLT</L>
      <L x="960" y="160" size={18} fill={AMBER}>VUT</L>
      <g className="aev-pulse"><circle cx="840" cy="180" r="9" fill={GREEN} /></g>
      {/* noisy in -> clean out */}
      <path d={`M120 250 ${Array.from({ length: 60 }, (_, i) => `L${120 + i * 5},${250 - Math.sin(i * 0.7) * 24 - ((i % 4) - 2) * 8}`).join(' ')}`} fill="none" stroke={BLUE} strokeWidth="3" />
      <L x="170" y="180" size={17} fill={BLUE}>noisy in</L>
      <path d="M120 430 V330 H240 V430 H360 V330 H420" fill="none" stroke={GREEN} strokeWidth="4.5" className="aev-draw" />
      <L x="180" y="470" size={17} fill={GREEN}>clean out</L>
    </SFrame>
  )
}

export function DacLadderResolve() {
  return (
    <SFrame eyebrow="MODULE 5 · DAC" title="Binary-weighted currents resolve into an output voltage" hue={MOD_HUE[5]} note="Vout ∝ Σ (bit / weight)">
      {['R', '2R', '4R', '8R'].map((lab, i) => (
        <g key={lab}>
          <L x="150" y={175 + i * 78} size={20} fill={BLUE} anchor="end">b{3 - i}</L>
          <path d={`M180 ${170 + i * 78} h80 l8 -10 l16 20 l16 -20 l16 20 l10 -10 h30`} fill="none" stroke={N} strokeWidth="3.5" />
          <L x="290" y={152 + i * 78} size={17} fill={MUTED}>{lab}</L>
          <Wire x1="360" y1={170 + i * 78} x2="520" y2="320" color={AMBER} w={2.5 + (3 - i) * 0.7} className="aev-flow" />
        </g>
      ))}
      <OpAmp cx={600} cy={320} w={150} h={130} label="" />
      <Wire x1="675" y1="320" x2="900" y2="320" color={GREEN} w={5} className="aev-flow" />
      <path d={`M760 470 ${Array.from({ length: 8 }, (_, i) => `L${760 + i * 40} ${470 - i * 18} L${800 + i * 40} ${470 - i * 18}`).join(' ')}`} fill="none" stroke={GREEN} strokeWidth="4" className="aev-draw" />
      <L x="920" y="326" size={18} fill={GREEN} anchor="start">Vout</L>
    </SFrame>
  )
}

export function R2RLadder() {
  return (
    <SFrame eyebrow="MODULE 5 · R-2R DAC" title="Only two resistor values, endlessly scalable" hue={MOD_HUE[5]} note="binary division down the ladder">
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <path d={`M${180 + i * 170} 250 h70 l8 -9 l14 18 l14 -18 l14 18 l6 -9 h4`} fill="none" stroke={N} strokeWidth="3.5" className="aev-flow" />
          {i < 4 && <><path d={`M${294 + i * 170} 254 v90`} stroke={N} strokeWidth="3.5" /><L x={294 + i * 170} y="372" size={17} fill={BLUE}>b{i}</L></>}
        </g>
      ))}
      <L x="600" y="160" size={22} fill={N}>R · 2R · R · 2R …</L>
      <OpAmp cx={1000} cy={250} w={130} h={110} label="" />
      <Wire x1="1065" y1="250" x2="1120" y2="250" color={GREEN} w={5} className="aev-flow" />
      <L x="1050" y="430" size={18} fill={GREEN}>Vout</L>
    </SFrame>
  )
}

export function SampleQuantize() {
  const y = 300
  return (
    <SFrame eyebrow="MODULE 5 · ADC" title="Analog is sampled in time, then rounded to levels" hue={MOD_HUE[5]} note="Δ = FSR / 2ⁿ">
      <WavePath d={wave(120, y, 130, 1.2, 460)} color={BLUE} w={4} />
      {Array.from({ length: 9 }, (_, i) => {
        const xx = 150 + i * 50
        const yy = y - Math.sin((i / 8) * Math.PI * 2.4) * 130
        return (
          <g key={i}>
            <line x1={xx} y1={yy} x2={xx} y2={y + 170} stroke={AMBER} strokeWidth="2" strokeDasharray="4 5" />
            <circle cx={xx} cy={yy} r="8" fill={AMBER} className="aev-pulse" style={{ animationDelay: `${i * 0.08}s` }} />
          </g>
        )
      })}
      <L x="330" y="150" size={18} fill={AMBER}>sample (time)</L>
      {Array.from({ length: 9 }, (_, i) => <rect key={i} x={700 + i * 42} y={y - (i % 5) * 26} width="34" height={140 + (i % 5) * 26} fill={GREEN} opacity="0.8" className="aev-charge" style={{ animationDelay: `${i * 0.06}s`, transformOrigin: 'bottom' }} />)}
      <L x="850" y="150" size={18} fill={GREEN}>quantize (level)</L>
    </SFrame>
  )
}

export function RegulatorRail() {
  const y = 320
  return (
    <SFrame eyebrow="MODULE 5 · REGULATOR" title="A rippling input becomes a steady output rail" hue={MOD_HUE[5]} note="line & load regulation hold Vout">
      <WavePath d={`M120 ${y} ${Array.from({ length: 50 }, (_, i) => { const t = i / 49; return `L${120 + t * 260},${y - 60 - Math.sin(t * Math.PI * 10) * 26}` }).join(' ')}`} color={RED} w={4} className="aev-wave" />
      <L x="150" y={y - 110} size={18} fill={RED} anchor="start">Vin (ripple)</L>
      <rect x="440" y={y - 80} width="240" height="160" rx="20" fill="#fff5db" stroke={AMBER} strokeWidth="4" className="aev-glow" />
      <L x="560" y={y + 8} size={26} fill={AMBER}>REG</L>
      <L x="560" y={y + 44} size={15} fill={MUTED}>ref + pass + error</L>
      <path d="M400 320 H440" stroke={N} strokeWidth="4" className="aev-flow" markerEnd="url(#scArr)" />
      <path d="M680 320 H740" stroke={N} strokeWidth="4" />
      <line x1="760" y1={y - 60} x2="1080" y2={y - 60} stroke={GREEN} strokeWidth="5" className="aev-draw" />
      <L x="820" y={y - 80} size={18} fill={GREEN} anchor="start">Vout (flat)</L>
      <g className="aev-shift"><line x1="920" y1={y - 120} x2="920" y2="70" stroke={MUTED} strokeWidth="1.5" strokeDasharray="3 6" /></g>
      <L x="940" y={y + 40} size={16} fill={MUTED} anchor="start">load step → tiny ΔVout</L>
    </SFrame>
  )
}

/* ── Registry: slide id → showcase descriptor ───────────────────── */
const S = (scene, extra = {}) => ({ scene, family: 'showcase', object: 'hero', camera: 'wide-circuit', ...extra })

export const SHOWCASE = {
  // Module 1
  'm1-u3-idea': S(<SmallSignalOnBias />, { title: 'Small signal on a bias', takeaway: 'Amplifier math is built around the Q-point.' }),
  'm1-u1-analysis': S(<LoadLineQpoint />, { title: 'Operating point on the load line', takeaway: 'Mid-rail Q gives the most symmetric swing.' }),
  'm1-u5-idea': S(<ModelMorph />, { title: 'BJT → small-signal model', takeaway: 'Replace the device with resistances and a controlled source.' }),
  'm1-u5-analysis': S(<TwoPortHero />, { title: 'The two-port r′e model', takeaway: 'rin(base) = βac·re′.' }),
  'm1-u6-circuit': S(<CELiveGain />, { title: 'Common-emitter live gain', takeaway: 'Small input → large, inverted output.' }),
  'm1-u6-example': S(<PhaseInversion />, { title: 'Phase inversion', takeaway: 'The common-emitter flips the output 180°.' }),
  'm1-u4-example': S(<GainNumerical />, { title: 'Where the gain number comes from', takeaway: 'Av ≈ −RC / re′.' }),
  'm1-u7-circuit': S(<CascadedAmp />, { title: 'Cascaded amplifier', takeaway: 'Loaded stage gains multiply.' }),
  // Module 2
  'm2-u1-circuit': S(<MosBiasSettle />, { title: 'MOSFET bias establishment', takeaway: 'Source feedback fixes the operating current.' }),
  'm2-u2-idea': S(<BiasCompare />, { title: 'Bias network comparison', takeaway: 'Divider + RS beats fixed-VGS for stability.' }),
  'm2-u4-analysis': S(<QpointTravel />, { title: 'Q-point on the load line', takeaway: 'Bias sets Q; load line sets swing.' }),
  'm2-u7-analysis': S(<TransferCurve />, { title: 'Transfer characteristic & gm', takeaway: 'gm is the slope at the operating point.' }),
  'm2-u8-circuit': S(<CSamplify />, { title: 'Common-source amplification', takeaway: 'Av ≈ −gm·RD, inverted.' }),
  'm2-u8-example': S(<SourceDegeneration />, { title: 'Source degeneration', takeaway: 'RS trades gain for linearity.' }),
  'm2-u5-example': S(<SmallSignalResponse />, { title: 'Small-signal response', takeaway: 'id = gm·vgs drives the load.' }),
  // Module 3
  'm3-u1-circuit': S(<FeedbackLoop />, { title: 'The negative-feedback loop', takeaway: 'Af = A / (1 + Aβ).' }),
  'm3-u2-analysis': S(<ClosedLoopGain />, { title: 'Closed-loop gain intuition', takeaway: 'If Aβ ≫ 1, Af ≈ 1/β.' }),
  'm3-u4-circuit': S(<OscStartup />, { title: 'Oscillation startup', takeaway: 'Noise → growth → steady sine.' }),
  'm3-u4-analysis': S(<Barkhausen />, { title: 'Barkhausen condition', takeaway: '|Aβ| = 1 and ∠Aβ = 0°.' }),
  'm3-u5-circuit': S(<WeinBridgeBig />, { title: 'Wein-bridge oscillator', takeaway: 'f = 1 / (2πRC), gain ≥ 3.' }),
  'm3-u7-idea': S(<LcTankHero />, { title: 'The LC resonant tank', takeaway: 'Energy sloshes between L and C.' }),
  'm3-u10-idea': S(<Timer555Internal />, { title: '555 internal structure', takeaway: 'Two comparators + an SR latch.' }),
  'm3-u10-analysis': S(<AstableTiming />, { title: '555 astable timing', takeaway: 'C ramps between ⅓ and ⅔ VCC.' }),
  'm3-u10-example': S(<MonostableTiming />, { title: '555 monostable timing', takeaway: 'T = 1.1·R·C for one pulse.' }),
  // Module 4
  'm4-u1-circuit': S(<PowerOverview />, { title: 'Power amplifier overview', takeaway: 'Deliver output power efficiently.' }),
  'm4-u3-circuit': S(<ClassAConduction />, { title: 'Class A conduction', takeaway: '360° conduction, best fidelity.' }),
  'm4-u5-circuit': S(<ClassBPushPull />, { title: 'Class B push-pull', takeaway: 'Each device drives one half-cycle.' }),
  'm4-u4-example': S(<CrossoverDistortion />, { title: 'Crossover distortion', takeaway: 'A notch appears near every zero crossing.' }),
  'm4-u5-example': S(<ClassABCorrection />, { title: 'Class AB correction', takeaway: 'A little bias fills the notch.' }),
  'm4-u7-analysis': S(<LowPassSweep />, { title: 'Low-pass frequency sweep', takeaway: '−20 dB/decade past cutoff.' }),
  'm4-u10-analysis': S(<BandPassStop />, { title: 'Band-pass and band-stop', takeaway: 'Select a band, or reject it.' }),
  'm4-u9-circuit': S(<ActiveFilterCircuit />, { title: 'Active filter circuit + response', takeaway: 'Sallen-Key sets fc and Q.' }),
  // Module 5
  'm5-u7-idea': S(<OpAmpHero />, { title: 'The ideal op-amp', takeaway: 'Av → ∞, Zin → ∞, Zout → 0.' }),
  'm5-u7-analysis': S(<IntegratorAccumulate />, { title: 'Op-amp integrator', takeaway: 'Square in → triangle out.' }),
  'm5-u6-circuit': S(<InvertingAmp />, { title: 'Inverting amplifier', takeaway: 'Vout = −(Rf/Rin)·Vin.' }),
  'm5-u8-circuit': S(<ComparatorSwitch />, { title: 'Comparator / zero-crossing', takeaway: 'Output slams to ±Vsat at 0 V.' }),
  'm5-u9-analysis': S(<SchmittHysteresisBig />, { title: 'Schmitt-trigger hysteresis', takeaway: 'Two thresholds reject noise.' }),
  'm5-u10-circuit': S(<RegulatorRail />, { title: 'Regulator rail', takeaway: 'Ripple in → steady Vout.' }),
  'm5-u1-circuit': S(<DacLadderResolve />, { title: 'Binary-weighted DAC', takeaway: 'Weighted currents resolve Vout.' }),
  'm5-u2-circuit': S(<R2RLadder />, { title: 'R-2R ladder DAC', takeaway: 'Two resistor values, scalable.' }),
  'm5-u3-circuit': S(<SampleQuantize />, { title: 'ADC sample & quantize', takeaway: 'Sample in time, round to levels.' }),
}

// Give every showcase a distinct signature so adjacent heroes never read as
// identical (composition stays 'showcase'; camera/family/object vary).
const SC_CAM = ['wide-circuit', 'close-device', 'follow-signal', 'side-by-side', 'overhead-graph', 'pull-formula']
Object.keys(SHOWCASE).forEach((id, i) => {
  SHOWCASE[id].object = id
  SHOWCASE[id].camera = SC_CAM[i % SC_CAM.length]
  SHOWCASE[id].family = `showcase-${i % 6}`
})

export function getShowcase(id) {
  return SHOWCASE[id] || null
}

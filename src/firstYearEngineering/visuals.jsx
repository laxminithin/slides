import { GraphAnimator, ProcessAnimator, WaveformAnimator } from '../firstYearFoundation'

function Frame({ label, children, className = '' }) {
  return (
    <svg className={`eng-svg ${className}`} viewBox="0 0 920 480" role="img" aria-label={label}>
      <rect className="eng-canvas" width="920" height="480" rx="18" />
      {children}
    </svg>
  )
}

function Current({ d, delay = '0s' }) {
  return <path className="eng-current" style={{ animationDelay: delay }} d={d} />
}

export function SeriesParallelCircuit() {
  return (
    <Frame label="Series-parallel DC circuit with labelled current paths">
      <text x="36" y="42">V = 12 V</text>
      <text x="780" y="42">source + load</text>
      <g className="eng-source">
        <line x1="80" y1="120" x2="80" y2="360" />
        <line x1="58" y1="150" x2="58" y2="330" />
        <text x="28" y="108">+</text>
        <text x="28" y="392">-</text>
      </g>
      <path className="eng-wire active" d="M80 180 H210" />
      <polyline className="eng-resistor" points="210,180 225,150 255,210 285,150 315,210 330,180" />
      <text x="240" y="132">R1 series</text>
      <path className="eng-wire active" d="M330 180 H430 V120 H620" />
      <path className="eng-wire active" d="M430 180 V250 H620" />
      <polyline className="eng-resistor" points="620,120 635,95 665,145 695,95 725,145 740,120" />
      <polyline className="eng-resistor" points="620,250 635,225 665,275 695,225 725,275 740,250" />
      <text x="640" y="78">R2 branch</text>
      <text x="640" y="312">R3 branch</text>
      <path className="eng-wire" d="M740 120 H800 V360 H80" />
      <path className="eng-wire" d="M740 250 H800" />
      <circle className="eng-node" cx="430" cy="180" r="8" />
      <circle className="eng-node" cx="800" cy="180" r="8" />
      <text x="402" y="168">node A</text>
      <text x="812" y="168">node B</text>
      <Current d="M90 180 H330 H430 V120 H740 H800 V360 H90" />
      <Current d="M430 180 V250 H740" delay=".4s" />
      <text x="36" y="408">I source splits at node A into the R2 and R3 branches.</text>
      <text x="36" y="442">The branches recombine at node B and return to the source.</text>
    </Frame>
  )
}

export function KirchhoffCircuit() {
  return (
    <Frame label="KCL at a node and KVL around a loop">
      <path className="eng-wire active" d="M140 240 H320" />
      <path className="eng-wire active" d="M320 240 H520" />
      <path className="eng-wire" d="M520 240 H760 V360 H140 V240" />
      <circle className="eng-node" cx="320" cy="240" r="10" />
      <text x="292" y="214">node N</text>
      <polyline className="eng-resistor" points="360,240 375,210 405,270 435,210 465,270 480,240" />
      <g className="eng-source"><line x1="140" y1="190" x2="140" y2="290" /><line x1="118" y1="210" x2="118" y2="270" /></g>
      <text x="150" y="176">V</text>
      <text x="168" y="228">I in</text>
      <text x="390" y="188">I1</text>
      <text x="560" y="228">I2</text>
      <text x="250" y="392">loop: sum V = 0</text>
      <Current d="M150 240 H760 V350 H150" />
      <text x="300" y="70">KCL: I_in = I1 + I2 at node N</text>
      <text x="300" y="108">KVL: V - I1 R - I2 R_load = 0 around the loop</text>
    </Frame>
  )
}

export function CapacitorCircuit() {
  return (
    <Frame label="Parallel-plate capacitor charging with polarity">
      <g className="eng-source"><line x1="110" y1="150" x2="110" y2="330" /><line x1="88" y1="175" x2="88" y2="305" /><text x="40" y="140">+</text><text x="44" y="360">-</text></g>
      <path className="eng-wire active" d="M110 190 H360" />
      <path className="eng-wire" d="M110 290 H360" />
      <line className="eng-plate" x1="360" y1="150" x2="360" y2="230" />
      <line className="eng-plate" x1="400" y1="150" x2="400" y2="230" />
      <text x="348" y="136">+</text>
      <text x="392" y="136">-</text>
      <text x="336" y="268">plates</text>
      <path className="eng-field" d="M368 170 H392" />
      <path className="eng-field" d="M368 190 H392" />
      <path className="eng-field" d="M368 210 H392" />
      <text x="470" y="188">E field</text>
      <text x="470" y="230">C = eps A / d</text>
      <text x="470" y="272">energy = 1/2 C V^2</text>
      <Current d="M120 190 H360" />
      <text x="120" y="430">Charging current stops when plate voltage equals source voltage</text>
    </Frame>
  )
}

export function InductionScene() {
  return (
    <Frame label="Faraday induction with flux change and induced emf">
      <rect className="eng-coil" x="180" y="140" width="220" height="180" rx="18" />
      <path className="eng-flux" d="M290 80 V140" />
      <path className="eng-flux" d="M290 320 V400" />
      <text x="248" y="68">flux Phi</text>
      <circle className="eng-meter" cx="620" cy="230" r="70" />
      <path className="eng-wire active" d="M400 170 H620" />
      <path className="eng-wire" d="M400 290 H620" />
      <text x="590" y="234">emf</text>
      <text x="460" y="120">e = - dPhi/dt</text>
      <text x="460" y="360">Lenz: induced current opposes the flux change</text>
      <Current d="M410 170 H590" />
    </Frame>
  )
}

export function AcRlCircuit() {
  return (
    <Frame label="Series R-L AC circuit with current and voltage polarity">
      <g className="eng-source ac"><circle cx="110" cy="240" r="42" /><path d="M86 240 C96 214 124 214 134 240 C144 266 172 266" /></g>
      <text x="78" y="176">v(t)</text>
      <path className="eng-wire active" d="M152 240 H280" />
      <polyline className="eng-resistor" points="280,240 295,210 325,270 355,210 385,270 400,240" />
      <text x="318" y="186">R</text>
      <path className="eng-wire active" d="M400 240 H500" />
      <path className="eng-inductor" d="M500 240 C515 210 535 210 550 240 C565 270 585 270 600 240 C615 210 635 210 650 240" />
      <text x="560" y="186">L</text>
      <path className="eng-wire" d="M650 240 H790 V360 H110 V282" />
      <text x="250" y="430">i lags v in an inductive circuit; VL leads I by 90 degrees</text>
      <Current d="M160 240 H790 V350 H120" />
    </Frame>
  )
}

export function ThreePhaseScene() {
  return (
    <Frame label="Star and delta three-phase connections">
      <polygon className="eng-star" points="210,240 140,140 280,140" />
      <circle className="eng-node" cx="210" cy="240" r="8" />
      <text x="186" y="276">N</text>
      <text x="128" y="122">R</text>
      <text x="268" y="122">Y</text>
      <text x="198" y="318">B</text>
      <text x="150" y="360">star: VL = sqrt(3) Vph</text>
      <polygon className="eng-delta" points="620,140 740,240 620,340" />
      <text x="600" y="122">R</text>
      <text x="752" y="246">Y</text>
      <text x="600" y="370">B</text>
      <text x="560" y="410">delta: IL = sqrt(3) Iph</text>
      <text x="380" y="70">phase sequence R-Y-B</text>
    </Frame>
  )
}

export function WiringScene() {
  return (
    <Frame label="Two-way switching of a lamp with live and return">
      <text x="40" y="50">live</text>
      <path className="eng-wire live" d="M80 80 H200" />
      <rect className="eng-switch" x="200" y="55" width="90" height="50" rx="8" />
      <text x="214" y="86">SW1</text>
      <path className="eng-wire active" d="M290 80 H430" />
      <path className="eng-wire" d="M290 120 H430" />
      <rect className="eng-switch" x="430" y="55" width="90" height="50" rx="8" />
      <text x="444" y="86">SW2</text>
      <path className="eng-wire live" d="M520 80 H680" />
      <circle className="eng-lamp" cx="740" cy="160" r="46" />
      <text x="718" y="166">lamp</text>
      <path className="eng-wire" d="M680 80 V160 H786" />
      <path className="eng-wire" d="M694 160 H80 V400 H740 V206" />
      <text x="40" y="430">neutral / earth return</text>
      <Current d="M90 80 H680 V160 H786" />
    </Frame>
  )
}

export function TransformerScene() {
  return (
    <Frame label="Transformer energy conversion from primary to secondary">
      <rect className="eng-core" x="340" y="110" width="240" height="260" rx="12" />
      <path className="eng-coil" d="M300 150 C250 170 250 210 300 230 C250 250 250 290 300 310" />
      <path className="eng-coil secondary" d="M620 150 C670 170 670 210 620 230 C670 250 670 290 620 310" />
      <text x="120" y="160">input AC</text>
      <text x="120" y="204">Np turns</text>
      <text x="700" y="160">output AC</text>
      <text x="700" y="204">Ns turns</text>
      <text x="372" y="250">flux coupling</text>
      <text x="300" y="430">Es / Ep = Ns / Np</text>
      <Current d="M140 180 H300" />
      <Current d="M620 180 H800" delay=".5s" />
    </Frame>
  )
}

export function MachineScene() {
  return (
    <Frame label="Electrical to mechanical energy conversion in a DC machine">
      <circle className="eng-stator" cx="300" cy="240" r="130" />
      <circle className="eng-rotor" cx="300" cy="240" r="78" />
      <path className="eng-field" d="M300 120 V160" />
      <path className="eng-field" d="M300 320 V360" />
      <rect className="eng-shaft" x="378" y="226" width="180" height="28" rx="8" />
      <polygon className="eng-load" points="560,210 640,240 560,270" />
      <text x="250" y="70">field</text>
      <text x="270" y="246">armature</text>
      <text x="580" y="196">torque</text>
      <text x="460" y="430">input electrical energy to field/coupling to mechanical output</text>
      <Current d="M80 240 H170" />
    </Frame>
  )
}

export function DiodeScene({ reverse = false }) {
  return (
    <Frame label={reverse ? 'Reverse-biased diode blocking current' : 'Forward-biased diode conducting current'}>
      <g className="eng-source"><line x1="90" y1="150" x2="90" y2="330" /><line x1="68" y1="175" x2="68" y2="305" /></g>
      <path className="eng-wire active" d="M90 190 H250" />
      <polygon className="eng-diode" points="250,140 250,240 340,190" />
      <line className="eng-diode-bar" x1="340" y1="140" x2="340" y2="240" />
      <text x="256" y="126">anode</text>
      <text x="348" y="126">cathode</text>
      <path className={reverse ? 'eng-wire' : 'eng-wire active'} d="M340 190 H760 V330 H90" />
      <text x="430" y="176">{reverse ? 'blocking' : 'conducting'}</text>
      <text x="430" y="220">{reverse ? 'applied polarity reverse' : 'applied polarity forward'}</text>
      {!reverse && <Current d="M100 190 H760 V320 H100" />}
      <text x="140" y="430">{reverse ? 'No closed current path; output remains off' : 'Current path exists; load receives output'}</text>
    </Frame>
  )
}

export function RectifierScene({ mode = 'half' }) {
  const full = mode === 'full'
  return (
    <Frame label={full ? 'Full-wave bridge rectifier current path' : 'Half-wave rectifier current path'}>
      <g className="eng-source ac"><circle cx="110" cy="230" r="36" /><path d="M88 230 C96 210 124 210 132 230 C140 250 168 250" /></g>
      {full ? (
        <>
          <polygon className="eng-diode" points="280,110 280,170 340,140" />
          <polygon className="eng-diode" points="280,290 280,350 340,320" />
          <polygon className="eng-diode" points="430,110 430,170 490,140" />
          <polygon className="eng-diode" points="430,290 430,350 490,320" />
          <path className="eng-wire active" d="M146 230 H250 V140 H280" />
          <path className="eng-wire active" d="M340 140 H430" />
          <path className="eng-wire active" d="M490 140 H620 V230 H700" />
          <rect className="eng-load" x="700" y="190" width="110" height="80" rx="10" />
          <text x="724" y="236">load</text>
          <Current d="M150 230 H250 V140 H490 H620 V230 H700" />
        </>
      ) : (
        <>
          <polygon className="eng-diode" points="280,180 280,280 360,230" />
          <line className="eng-diode-bar" x1="360" y1="180" x2="360" y2="280" />
          <path className="eng-wire active" d="M146 230 H280" />
          <path className="eng-wire active" d="M360 230 H700" />
          <rect className="eng-load" x="700" y="190" width="110" height="80" rx="10" />
          <text x="724" y="236">load</text>
          <Current d="M150 230 H700" />
        </>
      )}
      <text x="250" y="430">{full ? 'Both half-cycles reach the load through alternate diodes' : 'Only the forward half-cycle reaches the load'}</text>
    </Frame>
  )
}

export function FilterScene() {
  return (
    <Frame label="Capacitor filter smoothing rectifier output">
      <path className="eng-wire active" d="M80 200 H260" />
      <polygon className="eng-diode" points="260,150 260,250 330,200" />
      <line className="eng-diode-bar" x1="330" y1="150" x2="330" y2="250" />
      <path className="eng-wire active" d="M330 200 H520" />
      <line className="eng-plate" x1="520" y1="150" x2="520" y2="250" />
      <line className="eng-plate" x1="560" y1="150" x2="560" y2="250" />
      <text x="508" y="136">C</text>
      <path className="eng-wire active" d="M560 200 H760" />
      <rect className="eng-load" x="760" y="160" width="100" height="80" rx="10" />
      <text x="784" y="206">RL</text>
      <text x="80" y="430">pulsating input to capacitor stores charge to smoother DC output</text>
      <Current d="M90 200 H760" />
    </Frame>
  )
}

export function TransistorScene() {
  return (
    <Frame label="NPN BJT with base, collector and emitter currents">
      <circle className="eng-device" cx="360" cy="240" r="92" />
      <line className="eng-terminal" x1="160" y1="240" x2="280" y2="240" />
      <line className="eng-terminal" x1="360" y1="80" x2="360" y2="160" />
      <line className="eng-terminal" x1="360" y1="320" x2="360" y2="400" />
      <text x="120" y="228">B</text>
      <text x="348" y="64">C</text>
      <text x="348" y="430">E</text>
      <text x="500" y="140">Ic</text>
      <text x="500" y="240">Ib small input</text>
      <text x="500" y="340">Ie = Ib + Ic</text>
      <text x="500" y="390">active bias: larger output current</text>
      <Current d="M170 240 H280" />
      <Current d="M360 90 V160" delay=".3s" />
    </Frame>
  )
}

export function OpAmpScene() {
  return (
    <Frame label="Inverting op-amp with input, feedback and output">
      <polygon className="eng-opamp" points="300,120 300,360 560,240" />
      <text x="318" y="210">-</text>
      <text x="318" y="300">+</text>
      <path className="eng-wire active" d="M80 180 H180" />
      <polyline className="eng-resistor" points="180,180 195,155 220,205 245,155 270,205 300,180" />
      <text x="200" y="132">Rin</text>
      <path className="eng-wire" d="M430 120 H430 80" />
      <polyline className="eng-resistor" points="430,120 445,95 470,145 495,95 520,145 560,120" />
      <text x="470" y="82">Rf</text>
      <path className="eng-wire active" d="M560 240 H780" />
      <text x="80" y="164">vin</text>
      <text x="790" y="236">vout</text>
      <text x="620" y="300">Av = - Rf / Rin</text>
      <text x="140" y="430">small input to op-amp action with feedback to larger inverted output</text>
      <Current d="M90 180 H300" />
    </Frame>
  )
}

export function LogicScene() {
  return (
    <Frame label="AND gate with inputs, active row and output">
      <path className="eng-gate" d="M220 140 H360 Q470 240 360 340 H220 Z" />
      <text x="250" y="250">AND</text>
      <path className="eng-wire active" d="M80 180 H220" />
      <path className="eng-wire active" d="M80 300 H220" />
      <path className="eng-wire active" d="M454 240 H700" />
      <text x="40" y="174">A=1</text>
      <text x="40" y="294">B=1</text>
      <text x="720" y="236">Y=1</text>
      <text x="520" y="140">truth: only 11 to 1</text>
      <text x="140" y="430">Boolean Y = A B matches the gate and the active truth-table row</text>
    </Frame>
  )
}

export function AdderScene() {
  return (
    <Frame label="Half adder connected to a full adder">
      <rect className="eng-block" x="80" y="150" width="220" height="160" rx="14" />
      <text x="130" y="240">Half adder</text>
      <text x="100" y="130">A B</text>
      <rect className="eng-block" x="400" y="150" width="220" height="160" rx="14" />
      <text x="450" y="240">Full adder</text>
      <text x="420" y="130">Cin, A, B</text>
      <path className="eng-wire active" d="M300 230 H400" />
      <text x="700" y="210">Sum</text>
      <text x="700" y="260">Cout</text>
      <path className="eng-wire active" d="M620 210 H690" />
      <path className="eng-wire active" d="M620 260 H690" />
      <text x="140" y="430">Inputs to combinational logic to Sum and carry</text>
    </Frame>
  )
}

export function OscillatorScene() {
  return (
    <Frame label="Oscillator loop: amplifier plus feedback network">
      <rect className="eng-block" x="180" y="160" width="220" height="140" rx="14" />
      <text x="230" y="240">Amplifier</text>
      <rect className="eng-block" x="520" y="160" width="220" height="140" rx="14" />
      <text x="548" y="240">Feedback</text>
      <path className="eng-wire active" d="M400 230 H520" />
      <path className="eng-wire" d="M630 160 V90 H290 V160" />
      <text x="300" y="70">Barkhausen: loop gain = 1, phase 0 or 360</text>
      <text x="140" y="430">Positive feedback sustains a periodic waveform</text>
      <Current d="M410 230 H510" />
    </Frame>
  )
}

export function ModulationScene() {
  return (
    <Frame label="Amplitude modulation: carrier, message and AM waveform">
      <path className="eng-wave carrier" d="M60 140 C120 80 180 200 240 140 C300 80 360 200 420 140 C480 80 540 200 600 140" />
      <path className="eng-wave message" d="M60 280 C180 230 300 330 420 280 C540 230 660 330 780 280" />
      <path className="eng-wave am" d="M60 400 C120 340 180 340 240 400 C300 460 360 460 420 400 C480 340 540 340 600 400" />
      <text x="620" y="120">carrier</text>
      <text x="790" y="284">message</text>
      <text x="620" y="430">AM envelope</text>
    </Frame>
  )
}

export function EmbeddedScene() {
  return (
    <Frame label="Embedded system: sensor, microcontroller, actuator">
      <rect className="eng-block" x="70" y="170" width="180" height="130" rx="14" />
      <text x="118" y="244">Sensor</text>
      <rect className="eng-block" x="360" y="150" width="220" height="170" rx="14" />
      <text x="400" y="240">Microcontroller</text>
      <rect className="eng-block" x="680" y="170" width="180" height="130" rx="14" />
      <text x="724" y="244">Actuator</text>
      <path className="eng-wire active" d="M250 235 H360" />
      <path className="eng-wire active" d="M580 235 H680" />
      <text x="140" y="430">sense to compute to act, unlike a general-purpose computer loop</text>
    </Frame>
  )
}

export function PowerSupplyScene() {
  return (
    <Frame label="Power-supply chain from AC to regulated DC">
      {['AC in', 'Rectifier', 'Filter', 'Regulator', 'DC out'].map((label, i) => (
        <g key={label}>
          <rect className="eng-block" x={50 + i * 170} y="170" width="150" height="120" rx="12" />
          <text x={70 + i * 170} y="240">{label}</text>
          {i < 4 && <path className="eng-wire active" d={`M${200 + i * 170} 230 H${220 + i * 170}`} />}
        </g>
      ))}
      <text x="140" y="430">Each block changes the waveform until a usable DC load voltage remains</text>
    </Frame>
  )
}

export function FreeBodyScene() {
  return (
    <Frame label="Free-body diagram with applied force, reaction and moment">
      <rect className="eng-body" x="340" y="160" width="240" height="140" rx="12" />
      <path className="eng-force" d="M220 230 H340" />
      <polygon className="eng-arrow" points="340,216 370,230 340,244" />
      <text x="150" y="214">F applied</text>
      <path className="eng-force reaction" d="M580 230 H740" />
      <polygon className="eng-arrow" points="710,216 740,230 710,244" />
      <text x="640" y="214">R reaction</text>
      <path className="eng-moment" d="M460 140 A40 40 0 0 1 520 110" />
      <text x="530" y="108">M</text>
      <line className="eng-support" x1="300" y1="360" x2="620" y2="360" />
      <text x="140" y="430">Object, applied force, reaction, direction and moment stay visible</text>
    </Frame>
  )
}

export function BeamScene() {
  return (
    <Frame label="Simply supported beam with load path to support reactions">
      <line className="eng-beam" x1="140" y1="240" x2="780" y2="240" />
      <polygon className="eng-support" points="160,240 130,310 190,310" />
      <rect className="eng-support" x="740" y="240" width="28" height="70" />
      <path className="eng-force" d="M460 80 V230" />
      <polygon className="eng-arrow" points="446,210 460,240 474,210" />
      <text x="474" y="120">W</text>
      <text x="130" y="350">RA</text>
      <text x="730" y="350">RB</text>
      <text x="300" y="430">load to member to support reactions RA and RB</text>
    </Frame>
  )
}

export function FrictionScene() {
  return (
    <Frame label="Block on an incline with friction and normal reaction">
      <polygon className="eng-plane" points="80,400 820,400 820,220" />
      <rect className="eng-body" x="430" y="210" width="150" height="90" transform="rotate(-14 505 255)" />
      <path className="eng-force" d="M500 180 V210" />
      <text x="514" y="170">W</text>
      <path className="eng-force reaction" d="M470 300 L430 340" />
      <text x="360" y="360">N</text>
      <path className="eng-force" d="M560 270 L620 250" />
      <text x="630" y="246">F friction</text>
      <text x="140" y="80">angle of repose when impending motion begins</text>
    </Frame>
  )
}

export function CentroidScene() {
  return (
    <Frame label="Centroid of a composite lamina">
      <rect className="eng-area" x="180" y="120" width="280" height="220" />
      <circle className="eng-area alt" cx="620" cy="230" r="90" />
      <circle className="eng-centroid" cx="320" cy="230" r="8" />
      <circle className="eng-centroid" cx="620" cy="230" r="8" />
      <circle className="eng-centroid main" cx="470" cy="230" r="10" />
      <text x="300" y="110">A1</text>
      <text x="600" y="120">A2</text>
      <text x="450" y="210">G</text>
      <text x="200" y="430">x_bar = sum Ai xi / sum Ai</text>
    </Frame>
  )
}

export function BuildingScene() {
  return (
    <Frame label="Building load path from slab to foundation">
      <rect className="eng-slab" x="200" y="80" width="520" height="36" />
      <rect className="eng-beam-member" x="220" y="116" width="480" height="24" />
      <rect className="eng-column" x="240" y="140" width="36" height="220" />
      <rect className="eng-column" x="644" y="140" width="36" height="220" />
      <rect className="eng-foundation" x="200" y="360" width="120" height="40" />
      <rect className="eng-foundation" x="600" y="360" width="120" height="40" />
      <text x="420" y="70">slab / floor load</text>
      <text x="400" y="430">load to slab to beam to column to foundation</text>
      <path className="eng-force" d="M460 40 V80" />
    </Frame>
  )
}

export function GreenBuildingScene() {
  return (
    <Frame label="Green material selection and rating path">
      {['AAC / bamboo', 'Recycled plastic', 'IGBC / LEED', 'GRIHA rating'].map((label, i) => (
        <g key={label}>
          <rect className="eng-block" x={70 + i * 210} y="170" width="190" height="120" rx="12" />
          <text x={90 + i * 210} y="238">{label}</text>
        </g>
      ))}
      <text x="140" y="430">material choice to durability/sustainability to rating points</text>
    </Frame>
  )
}

export function EngineScene() {
  return (
    <Frame label="Four-stroke engine process">
      {['Intake', 'Compression', 'Power', 'Exhaust'].map((label, i) => (
        <g key={label}>
          <rect className="eng-cylinder" x={80 + i * 210} y="110" width="170" height="220" rx="12" />
          <rect className={`eng-piston stroke-${i}`} x={100 + i * 210} y={i % 2 ? 150 : 230} width="130" height="50" rx="8" />
          <text x={120 + i * 210} y="360">{label}</text>
        </g>
      ))}
      <text x="140" y="430">piston motion converts gas pressure into crankshaft work</text>
    </Frame>
  )
}

export function LatheScene() {
  return (
    <Frame label="Lathe turning: workpiece rotation and tool feed">
      <rect className="eng-lathe" x="80" y="180" width="520" height="70" rx="10" />
      <circle className="eng-chuck" cx="160" cy="215" r="48" />
      <rect className="eng-work" x="200" y="198" width="320" height="34" rx="8" />
      <rect className="eng-tool" x="360" y="270" width="90" height="28" rx="6" />
      <text x="140" y="140">work rotates</text>
      <text x="360" y="330">tool feed</text>
      <text x="140" y="430">rotation + feed produces the turned surface</text>
    </Frame>
  )
}

export function GearScene() {
  return (
    <Frame label="Simple gear train with velocity ratio">
      <circle className="eng-gear" cx="280" cy="240" r="90" />
      <circle className="eng-gear" cx="520" cy="240" r="60" />
      <text x="250" y="246">T1</text>
      <text x="500" y="246">T2</text>
      <text x="640" y="180">VR = T2 / T1 = N1 / N2</text>
      <text x="140" y="430">driver rotation to mesh to driven rotation in opposite sense</text>
    </Frame>
  )
}

export function BeltScene() {
  return (
    <Frame label="Open belt drive transferring rotation">
      <circle className="eng-pulley" cx="240" cy="240" r="80" />
      <circle className="eng-pulley" cx="640" cy="240" r="50" />
      <path className="eng-belt" d="M240 160 H640" />
      <path className="eng-belt" d="M240 320 H640" />
      <text x="210" y="120">driver</text>
      <text x="610" y="120">driven</text>
      <text x="140" y="430">input pulley motion to belt tension to output pulley motion</text>
    </Frame>
  )
}

export function RobotScene() {
  return (
    <Frame label="Robot anatomy: base, links, joints and end effector">
      <rect className="eng-base" x="400" y="360" width="120" height="40" rx="8" />
      <line className="eng-link" x1="460" y1="360" x2="460" y2="230" />
      <line className="eng-link" x1="460" y1="230" x2="600" y2="150" />
      <circle className="eng-joint" cx="460" cy="360" r="12" />
      <circle className="eng-joint" cx="460" cy="230" r="12" />
      <circle className="eng-joint" cx="600" cy="150" r="12" />
      <rect className="eng-tool" x="590" y="90" width="60" height="28" rx="6" />
      <text x="120" y="150">joints + links = DOF</text>
      <text x="120" y="430">base to links to joints to end-effector payload</text>
    </Frame>
  )
}

export function CncScene() {
  return (
    <Frame label="CNC from CAD model to machine motion">
      {['CAD model', 'CAM toolpath', 'Controller', 'Machine motion'].map((label, i) => (
        <g key={label}>
          <rect className="eng-block" x={60 + i * 220} y="170" width="190" height="120" rx="12" />
          <text x={80 + i * 220} y="240">{label}</text>
        </g>
      ))}
      <text x="140" y="430">program data becomes axis motion and a finished part</text>
    </Frame>
  )
}

export function MaterialProcessScene() {
  return (
    <Frame label="Material and joining process stages">
      {['Base metal', 'Heat/filler', 'Weld pool', 'Joint'].map((label, i) => (
        <g key={label}>
          <rect className="eng-block" x={70 + i * 210} y="170" width="180" height="120" rx="12" />
          <text x={90 + i * 210} y="240">{label}</text>
        </g>
      ))}
      <text x="140" y="430">raw pieces to joining operation to finished assembly</text>
    </Frame>
  )
}

export function VehicleScene() {
  return (
    <Frame label="Vehicle systems: steering, brake, gear and power">
      <rect className="eng-body" x="200" y="160" width="520" height="140" rx="30" />
      <circle className="eng-wheel" cx="280" cy="330" r="36" />
      <circle className="eng-wheel" cx="640" cy="330" r="36" />
      <text x="390" y="220">steering / brake / gear</text>
      <text x="360" y="260">power steering assist</text>
      <text x="140" y="80">mechanical principles solve a mobility problem</text>
    </Frame>
  )
}

export function PumpTurbineScene() {
  return (
    <Frame label="Pelton turbine and centrifugal pump energy conversion">
      <circle className="eng-runner" cx="260" cy="240" r="100" />
      <path className="eng-jet" d="M80 240 H160" />
      <text x="90" y="220">water jet</text>
      <text x="210" y="246">Pelton</text>
      <circle className="eng-impeller" cx="660" cy="240" r="100" />
      <path className="eng-flow" d="M660 240 H820" />
      <text x="620" y="120">pump</text>
      <text x="140" y="430">fluid energy and mechanical rotation convert both ways</text>
    </Frame>
  )
}

export function ProjectionScene() {
  return (
    <Frame label="Orthographic projection of a point on HP and VP" className="eng-cad">
      <line className="eng-xy" x1="80" y1="240" x2="840" y2="240" />
      <text x="850" y="246">XY</text>
      <circle className="eng-point" cx="400" cy="140" r="8" />
      <text x="414" y="132">P (VP)</text>
      <circle className="eng-point" cx="400" cy="340" r="8" />
      <text x="414" y="360">P (HP)</text>
      <line className="eng-projector" x1="400" y1="140" x2="400" y2="340" />
      <text x="140" y="80">front view above XY, top view below XY</text>
      <text x="140" y="430">projectors meet the reference planes to create views</text>
    </Frame>
  )
}

export function SolidProjectionScene() {
  return (
    <Frame label="Orthographic views of a right regular prism" className="eng-cad">
      <polygon className="eng-solid" points="180,120 320,90 320,230 180,260" />
      <polygon className="eng-solid" points="320,90 430,140 430,280 320,230" />
      <rect className="eng-view" x="560" y="80" width="160" height="120" />
      <rect className="eng-view" x="560" y="230" width="160" height="90" />
      <text x="590" y="70">front</text>
      <text x="600" y="350">top</text>
      <text x="140" y="430">3D solid to HP/VP projectors to 2D views</text>
    </Frame>
  )
}

export function SectionScene() {
  return (
    <Frame label="Section plane cutting a cone and true shape" className="eng-cad">
      <polygon className="eng-solid" points="260,80 140,340 380,340" />
      <line className="eng-section" x1="160" y1="200" x2="380" y2="230" />
      <ellipse className="eng-true" cx="640" cy="230" rx="110" ry="50" />
      <text x="160" y="70">section plane</text>
      <text x="580" y="160">true shape</text>
      <text x="140" y="430">cutting plane to apparent cut to true-shape view</text>
    </Frame>
  )
}

export function IsometricScene() {
  return (
    <Frame label="Isometric view of a cube and a step block" className="eng-cad">
      <polygon className="eng-iso" points="220,240 320,190 420,240 320,290" />
      <polygon className="eng-iso" points="220,240 220,330 320,380 320,290" />
      <polygon className="eng-iso" points="320,290 320,380 420,330 420,240" />
      <polygon className="eng-iso step" points="560,260 680,210 800,260 680,310" />
      <polygon className="eng-iso step" points="560,260 560,320 680,370 680,310" />
      <text x="260" y="150">cube</text>
      <text x="650" y="180">step block</text>
      <text x="140" y="430">isometric scale keeps 120 degree axes readable</text>
    </Frame>
  )
}

export function CadApplicationScene({ stream = 'cv' }) {
  const labels = {
    cv: ['foundation', 'column', 'beam', 'slab', 'stair'],
    ee: ['switch', 'socket', 'panel', 'UPS', 'circuit'],
    ece: ['fiber', 'antenna', 'PCB box', 'heat sink', 'enclosure'],
    me: ['machine part', 'material', 'sheet metal', 'duct', 'render'],
    cs: ['wired net', 'wireless', 'router', 'RPi/Arduino', 'STL'],
  }[stream] || ['component', 'assembly', 'view', 'detail', 'drawing']
  return (
    <Frame label={`Stream-specific CAD application for ${stream}`}>
      {labels.map((label, i) => (
        <g key={label}>
          <rect className="eng-block" x={50 + i * 174} y="160" width="158" height="130" rx="12" />
          <text x={70 + i * 174} y="236">{label}</text>
        </g>
      ))}
      <text x="140" y="430">Shared drawing language, stream-specific engineering object</text>
    </Frame>
  )
}

export function AircraftScene() {
  return (
    <Frame label="Aircraft axes, control surfaces and major parts">
      <ellipse className="eng-fuse" cx="420" cy="240" rx="260" ry="46" />
      <polygon className="eng-wing" points="200,240 420,210 640,240 420,270" />
      <polygon className="eng-tail" points="640,240 760,180 760,300" />
      <text x="400" y="140">pitch / roll / yaw</text>
      <text x="180" y="200">wing</text>
      <text x="680" y="160">tail</text>
      <text x="140" y="430">control surfaces change motion about the aircraft axes</text>
    </Frame>
  )
}

export function LiftDragScene() {
  return (
    <Frame label="Airfoil with lift, drag and pressure distribution">
      <path className="eng-airfoil" d="M140 250 C260 180 520 180 760 250 C520 270 260 270 140 250" />
      <path className="eng-force" d="M450 250 V120" />
      <text x="464" y="130">L lift</text>
      <path className="eng-force" d="M450 250 H600" />
      <text x="610" y="246">D drag</text>
      <text x="160" y="160">low pressure above</text>
      <text x="160" y="360">higher pressure below</text>
      <text x="140" y="430">Bernoulli + pressure distribution produce lift</text>
    </Frame>
  )
}

export function JetScene() {
  return (
    <Frame label="Turbojet: intake, compressor, combustor, turbine, nozzle">
      {['Intake', 'Compressor', 'Burner', 'Turbine', 'Nozzle'].map((label, i) => (
        <g key={label}>
          <rect className="eng-block" x={40 + i * 176} y="160" width="160" height="130" rx="12" />
          <text x={60 + i * 176} y="236">{label}</text>
        </g>
      ))}
      <text x="140" y="430">air + fuel energy to turbine work to high-speed jet thrust</text>
    </Frame>
  )
}

export function FlightScene() {
  return (
    <Frame label="Forces in flight: lift, weight, thrust and drag">
      <ellipse className="eng-fuse" cx="460" cy="240" rx="180" ry="36" />
      <path className="eng-force" d="M460 240 V120" /><text x="474" y="130">Lift</text>
      <path className="eng-force" d="M460 240 V360" /><text x="474" y="380">Weight</text>
      <path className="eng-force" d="M460 240 H300" /><text x="210" y="236">Drag</text>
      <path className="eng-force" d="M460 240 H620" /><text x="630" y="236">Thrust</text>
      <text x="140" y="430">steady flight when lift=weight and thrust=drag</text>
    </Frame>
  )
}

export function TruthTableVisual({ rows = [['0', '0', '0'], ['0', '1', '0'], ['1', '0', '0'], ['1', '1', '1']], active = 3 }) {
  return (
    <table className="eng-truth" data-slide-content="true">
      <thead><tr><th>A</th><th>B</th><th>Y</th></tr></thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={row.join('')} className={index === active ? 'active' : ''} style={{ '--i': index }}>
            {row.map((cell) => <td key={`${row.join('-')}-${cell}`}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function OperationSequence({ steps }) {
  return (
    <ol className="eng-sequence" data-slide-content="true">
      {steps.map((step, index) => (
        <li key={step.title} style={{ '--i': index }}>
          <strong>{step.title}</strong>
          <span>{step.detail}</span>
        </li>
      ))}
    </ol>
  )
}

export function EngineeringVisual({ kind, module }) {
  if (kind === 'seriesParallel') return <SeriesParallelCircuit />
  if (kind === 'kirchhoff') return <KirchhoffCircuit />
  if (kind === 'capacitor') return <CapacitorCircuit />
  if (kind === 'induction') return <InductionScene />
  if (kind === 'acrl') return <AcRlCircuit />
  if (kind === 'threephase') return <ThreePhaseScene />
  if (kind === 'wiring') return <WiringScene />
  if (kind === 'transformer') return <TransformerScene />
  if (kind === 'machine') return <MachineScene />
  if (kind === 'diode') return <DiodeScene />
  if (kind === 'diodeReverse') return <DiodeScene reverse />
  if (kind === 'rectifierHalf') return <RectifierScene mode="half" />
  if (kind === 'rectifierFull') return <RectifierScene mode="full" />
  if (kind === 'filter') return <FilterScene />
  if (kind === 'transistor') return <TransistorScene />
  if (kind === 'opamp') return <OpAmpScene />
  if (kind === 'logic') return <LogicScene />
  if (kind === 'adder') return <AdderScene />
  if (kind === 'oscillator') return <OscillatorScene />
  if (kind === 'modulation') return <ModulationScene />
  if (kind === 'embedded') return <EmbeddedScene />
  if (kind === 'psu') return <PowerSupplyScene />
  if (kind === 'fbd') return <FreeBodyScene />
  if (kind === 'beam') return <BeamScene />
  if (kind === 'friction') return <FrictionScene />
  if (kind === 'centroid') return <CentroidScene />
  if (kind === 'building') return <BuildingScene />
  if (kind === 'green') return <GreenBuildingScene />
  if (kind === 'engine') return <EngineScene />
  if (kind === 'lathe') return <LatheScene />
  if (kind === 'gear') return <GearScene />
  if (kind === 'belt') return <BeltScene />
  if (kind === 'robot') return <RobotScene />
  if (kind === 'cnc') return <CncScene />
  if (kind === 'material') return <MaterialProcessScene />
  if (kind === 'vehicle') return <VehicleScene />
  if (kind === 'pump') return <PumpTurbineScene />
  if (kind === 'projection') return <ProjectionScene />
  if (kind === 'solid') return <SolidProjectionScene />
  if (kind === 'section') return <SectionScene />
  if (kind === 'isometric') return <IsometricScene />
  if (kind === 'cadCv') return <CadApplicationScene stream="cv" />
  if (kind === 'cadEe') return <CadApplicationScene stream="ee" />
  if (kind === 'cadEce') return <CadApplicationScene stream="ece" />
  if (kind === 'cadMe') return <CadApplicationScene stream="me" />
  if (kind === 'cadCs') return <CadApplicationScene stream="cs" />
  if (kind === 'aircraft') return <AircraftScene />
  if (kind === 'lift') return <LiftDragScene />
  if (kind === 'jet') return <JetScene />
  if (kind === 'flight') return <FlightScene />
  if (kind === 'waveform') return <WaveformAnimator />
  if (kind === 'graph') {
    return (
      <GraphAnimator
        domain={[0, 6]}
        range={[0, 8]}
        xLabel={module.graphX || 'input'}
        yLabel={module.graphY || 'response'}
        curves={[{ label: 'response', color: '#d97706', fn: (x) => 1.2 + 1.1 * x - 0.08 * x * x }]}
        points={[{ label: 'operating point', xy: [3.2, 4.1] }]}
        highlight={module.graphNote || 'Read axes, operating region and slope before quoting a formula.'}
      />
    )
  }
  return <ProcessAnimator steps={(module.process || []).map((step) => ({ title: step, detail: 'Connect this stage to the final engineering state.' }))} />
}

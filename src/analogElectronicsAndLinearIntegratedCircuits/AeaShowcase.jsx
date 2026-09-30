/** Full-bleed showcase layouts for Analog Electronics and Linear Integrated Circuits. Two per module. */
import {
  M1TwoModelsCompareScene,
  M1DarlingtonPairDiagramScene,
  M2HybridPiEquivalentScene,
  M2AmplifierTopologyScene,
  M3BarkhausenLoopScene,
  M3555AstableChargeDischargeScene,
  M4DualLoadlinePlaneScene,
  M4FourIdealResponsePanelsScene,
  M5R2RLadderNodeScene,
  M5SarBinaryTreeScene
} from './AeaScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="aea-showcase-scene">{scene}</div>,
  }
}

const SHOWCASE = {
  'm1-u6-ops': wrap(
    'Two Transistor Models',
    <M1TwoModelsCompareScene />,
    'The r_e model is easier for quick intuition of amplifier behavior, while the h-parameter model is standardized by manufacturers on data sheets.',
    'side-by-side',
    'aea-transistor',
    'models',
  ),
  'm1-u13-ops': wrap(
    'Darlington Connections',
    <M1DarlingtonPairDiagramScene />,
    'A Darlington pair acts as a single transistor with a massive current gain (β1 * β2), but requires twice the base voltage to turn on.',
    'close-element',
    'aea-darlington',
    'transistor',
  ),
  'm2-u7-ops': wrap(
    'Small Signal Equivalent Circuit Models',
    <M2HybridPiEquivalentScene />,
    'The small-signal model turns a non-linear physical device into a simple set of linear, ideal circuit elements that can be analyzed using basic node and mesh equations.',
    'overhead-board',
    'aea-small-signal',
    'hybrid-pi',
  ),
  'm2-u10-ops': wrap(
    'MOSFET Amplifier Configurations',
    <M2AmplifierTopologyScene />,
    'The terminal that is grounded for AC signals names the configuration and dictates whether the circuit will act as a voltage amplifier, a current buffer, or a voltage buffer.',
    'wide-bench',
    'aea-topology',
    'mosfet',
  ),
  'm3-u8-ops': wrap(
    'Theory of sinusoidal oscillation',
    <M3BarkhausenLoopScene />,
    'A sinusoid persists only when the feedback loop returns the right amplitude in the right phase.',
    'overhead-board',
    'aea-oscillator',
    'loop',
  ),
  'm3-u16-ops': wrap(
    '555 timer astable operation',
    <M3555AstableChargeDischargeScene />,
    'The astable 555 is a threshold-controlled RC oscillator whose two resistor paths set frequency and duty cycle.',
    'side-by-side',
    'aea-555',
    'timer',
  ),
  'm4-u2-ops': wrap(
    'DC and AC load lines: locating the usable swing',
    <M4DualLoadlinePlaneScene />,
    'Bias sets the centre of motion; the ac load line sets how far the signal can move before clipping.',
    'overhead-board',
    'aea-loadline',
    'plane',
  ),
  'm4-u7-ops': wrap(
    'Ideal active-filter responses',
    <M4FourIdealResponsePanelsScene />,
    'Filter names describe which frequencies survive; cutoff boundaries define the transition to rejection.',
    'wide-bench',
    'aea-filters',
    'response',
  ),
  'm5-u3-ops': wrap(
    'R-2R DAC: Ladder Network Principle',
    <M5R2RLadderNodeScene />,
    'An R-2R ladder achieves binary-weighted current division using only two resistor values, making it highly suitable for monolithic IC fabrication.',
    'close-element',
    'aea-dac',
    'ladder',
  ),
  'm5-u7-ops': wrap(
    'Successive Approximation ADC: Search Algorithm',
    <M5SarBinaryTreeScene />,
    "By treating conversion as a binary search, a Successive Approximation ADC completes its task in exactly 'n' clock cycles for an n-bit resolution, regardless of the input voltage.",
    'side-by-side',
    'aea-adc',
    'sar',
  ),
}

export function getShowcase(id) {
  return SHOWCASE[id] || null
}

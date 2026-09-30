/**
 * AecShowcase — full-bleed hero scenes for 1BEE302 Analog Electronics Circuits.
 *
 * Keyed by slide id (`mN-uK-ops`). buildSlides swaps the normal split layout
 * for a showcase whenever a unit's "watch" beat is registered here, so each
 * module gets two slides where the mechanism fills the stage.
 */
import {
  JunctionBiasScene,
  BridgeVsCentreTapScene,
  FixedBiasSpreadScene,
  ThermalRunawayScene,
  BodeAnatomyScene,
  MillerMultiplicationScene,
  BarkhausenScene,
  CrossoverDistortionScene,
  JfetChannelPinchScene,
  SelfBiasGraphicalScene,
} from './AecScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="aec-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u2-ops': wrap(
    'The junction under bias — the whole subject starts here',
    <JunctionBiasScene />,
    'Forward bias narrows the depletion region and current flows; reverse bias widens it and only leakage does.',
    'close-device',
    'aec-junction-bias',
    'junction',
  ),
  'm1-u6-ops': wrap(
    'Bridge against centre-tap — four diodes or half a transformer',
    <BridgeVsCentreTapScene />,
    'The bridge halves the PIV and uses the whole secondary; the centre-tap halves the diodes in the path.',
    'wide-stage',
    'aec-waveform-shape',
    'rectifier',
  ),
  'm2-u3-ops': wrap(
    'Fixed bias and the β spread — one circuit, three Q-points',
    <FixedBiasSpreadScene />,
    'β varies three to one across a single batch, and fixed bias hands the Q-point straight to it.',
    'pull-response',
    'aec-load-line-walk',
    'bias-spread',
  ),
  'm2-u10-ops': wrap(
    'Thermal runaway — a loop with gain, in the physical world',
    <ThermalRunawayScene />,
    'Break it electrically with RE or thermally with a heat sink. Loop gain above one and the device is lost.',
    'overhead-board',
    'aec-thermal-drift',
    'runaway',
  ),
  'm3-u5-ops': wrap(
    'The Bode plot — two straight lines and a corner at each end',
    <BodeAnatomyScene />,
    'The asymptotes are exact on log axes; the real curve only departs from them, by 3 dB, at the corners.',
    'wide-stage',
    'aec-bode-sweep',
    'bode',
  ),
  'm3-u8-ops': wrap(
    'The Miller effect — 2 pF behaving like 202 pF',
    <MillerMultiplicationScene />,
    'The capacitance at the input is multiplied by (1 + |Av|). That is the price of the gain you asked for.',
    'close-device',
    'aec-miller-split',
    'miller',
  ),
  'm4-u7-ops': wrap(
    'Barkhausen — unity loop gain and zero total phase',
    <BarkhausenScene />,
    'Start slightly above unity so noise can grow, then let an amplitude-dependent element pull it back to exactly one.',
    'follow-signal',
    'aec-oscillate-start',
    'oscillator',
  ),
  'm4-u14-ops': wrap(
    'Crossover distortion — the dead band where nobody conducts',
    <CrossoverDistortionScene />,
    'Neither device turns on until the input passes about 0.7 V, and the gap is worst exactly where the ear is most sensitive.',
    'follow-signal',
    'aec-conduction-angle',
    'crossover',
  ),
  'm5-u2-ops': wrap(
    'Pinching the channel shut — control without a control current',
    <JfetChannelPinchScene />,
    'The gate junction is reverse biased at all times, so the depletion regions squeeze the channel and nothing flows into the gate.',
    'close-device',
    'aec-channel-pinch',
    'jfet',
  ),
  'm5-u7-ops': wrap(
    'Self bias — where the line meets the parabola',
    <SelfBiasGraphicalScene />,
    'One straight line of slope −1/RS through the origin, and its intersection with the transfer curve is the Q-point.',
    'pull-response',
    'aec-transfer-curve',
    'self-bias',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}

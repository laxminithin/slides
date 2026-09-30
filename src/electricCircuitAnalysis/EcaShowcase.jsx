/**
 * EcaShowcase — full-bleed hero scenes for 1BEE303 Electric Circuit Analysis.
 *
 * Keyed by slide id (`mN-uK-ops`). buildSlides swaps the normal split layout
 * for a showcase whenever a unit's "watch" beat is registered here, so each
 * module gets two slides where the mechanism fills the stage.
 */
import {
  MeshMatrixAssemblyScene,
  SupernodeScene,
  TheveninBlackBoxScene,
  MaxPowerCurveScene,
  SeriesRlcSweepScene,
  TauGeometryScene,
  PoleWaveformMapScene,
  CoverUpResidueScene,
  NeutralShiftScene,
  AbcdCascadeScene,
} from './EcaScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="eca-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u10-ops': wrap(
    'The mesh matrix — assembled straight off the drawing',
    <MeshMatrixAssemblyScene />,
    'Diagonal is the resistance round that mesh; off-diagonal is the shared branch, negated. The shared current is i₁ − i₂.',
    'overhead-board',
    'eca-matrix-assemble',
    'mesh-matrix',
  ),
  'm1-u14-ops': wrap(
    'The supernode surface — swallowing the source you cannot measure',
    <SupernodeScene />,
    'Draw a surface round both nodes and the unknown source current never crosses it. The constraint row buys back the equation.',
    'pull-network',
    'eca-node-sum',
    'supernode',
  ),
  'm2-u7-ops': wrap(
    'Thevenin — a whole network reduced to two numbers',
    <TheveninBlackBoxScene />,
    'Equivalent outside the terminals only. Internal power is different, and that is not a defect of the theorem.',
    'wide-bench',
    'eca-equivalent-collapse',
    'thevenin',
  ),
  'm2-u11-ops': wrap(
    'Maximum power against efficiency — two different goals',
    <MaxPowerCurveScene />,
    'At RL = Rth the power peaks and the efficiency is only 50%. A receiver matches; a grid never does.',
    'side-by-side',
    'eca-power-balance',
    'max-power',
  ),
  'm3-u1-ops': wrap(
    'The reactance sweep — where the circuit turns resistive',
    <SeriesRlcSweepScene />,
    'XL climbs, XC falls, and at the one frequency where they cancel the supply sees nothing but R.',
    'follow-current',
    'eca-impedance-sweep',
    'resonance',
  ),
  'm3-u15-ops': wrap(
    'The tangent construction — reading τ straight off the curve',
    <TauGeometryScene />,
    'The initial tangent meets the asymptote at exactly one τ. After five, the transient is 99.3% done.',
    'close-element',
    'eca-transient-settle',
    'time-constant',
  ),
  'm4-u4-ops': wrap(
    'Pole position and waveform — the same fact, twice',
    <PoleWaveformMapScene />,
    'Further left is faster decay; higher up is faster oscillation; right of the axis is a circuit that runs away.',
    'pull-network',
    'eca-pole-place',
    's-plane',
  ),
  'm4-u11-ops': wrap(
    'Cover-up residues — the inverse transform without algebra',
    <CoverUpResidueScene />,
    'Cover the factor, evaluate at its own pole, and the residue drops out. Each term is one exponential.',
    'overhead-board',
    'eca-residue-split',
    'residue',
  ),
  'm5-u4-ops': wrap(
    'The neutral shift — why the lightly loaded phase burns out',
    <NeutralShiftScene />,
    'Lose the neutral and the load star point moves. The phase drawing least current is the one that sees 268 V.',
    'pull-network',
    'eca-neutral-shift',
    'neutral-shift',
  ),
  'm5-u12-ops': wrap(
    'ABCD in cascade — why parameters beat schematics',
    <AbcdCascadeScene />,
    'Characterise each section once, then multiply. The order is the signal flow, because matrices do not commute.',
    'side-by-side',
    'eca-cascade-chain',
    'abcd',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}

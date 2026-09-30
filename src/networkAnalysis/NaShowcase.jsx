/**
 * NaShowcase — full-bleed hero scenes for BEC303 Network Analysis.
 *
 * Keyed by slide id (`mN-uK-ops`). buildSlides swaps the normal split layout
 * for a showcase whenever a unit's "watch" beat is registered here, so each
 * module gets two slides where the mechanism fills the stage.
 */
import {
  MeshScene,
  PhasorScene,
  TheveninScene,
  MaxPowerScene,
  DecayScene,
  DampingScene,
  PoleZeroScene,
  ConvolutionScene,
  TwoPortScene,
  CascadeScene,
} from './NaScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="na-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u7-ops': wrap(
    'Mesh currents — the shared branch carries the difference',
    <MeshScene />,
    'A mesh current is a variable, not a measurement. The ammeter in R_shared reads i₁ − i₂.',
    'overhead-loop',
    'na-mesh-loop',
    'mesh',
  ),
  'm1-u14-ops': wrap(
    'The phasor — one rotation, one waveform',
    <PhasorScene />,
    'Freeze the rotating vector at t = 0 and you have the phasor; its projection is v(t).',
    'follow-rotation',
    'na-phasor-spin',
    'phasor',
  ),
  'm2-u9-ops': wrap(
    'Thévenin — a whole network collapses to two numbers',
    <TheveninScene />,
    'V_th and R_th describe the network at its terminals only — internal power is not preserved.',
    'pull-collapse',
    'na-collapse',
    'thevenin',
  ),
  'm2-u12-ops': wrap(
    'Maximum power transfer — the peak is flat',
    <MaxPowerScene />,
    'P_max = V_th²/4R_th at R_L = R_th, and the efficiency there is only 50%.',
    'wide-curve',
    'na-power-curve',
    'max-power',
  ),
  'm3-u6-ops': wrap(
    'The source-free RL circuit — one time constant',
    <DecayScene label="RL" />,
    'τ = L/R. The initial tangent hits zero at t = τ, and after 5τ the transient is gone.',
    'follow-decay',
    'na-decay',
    'time-constant',
  ),
  'm3-u13-ops': wrap(
    'Damping — one comparison decides the whole shape',
    <DampingScene />,
    'Compare α with ω₀: overdamped, critically damped or underdamped. Nothing else changes the form.',
    'side-by-side',
    'na-damping',
    'rlc',
  ),
  'm4-u10-ops': wrap(
    'Poles and zeros — the map that is the response',
    <PoleZeroScene mode="map" />,
    'Re(pole) sets the decay envelope, Im(pole) sets the ringing. Right half-plane means unstable.',
    'wide-plane',
    'na-pole-map',
    's-plane',
  ),
  'm4-u13-ops': wrap(
    'Convolution — flip, slide, integrate the overlap',
    <ConvolutionScene />,
    'y(t) = ∫x(τ)h(t−τ)dτ in time is just Y(s) = X(s)H(s) in s — which is why we transform.',
    'follow-slide',
    'na-convolve',
    'convolution',
  ),
  'm5-u2-ops': wrap(
    'The two-port — four terminal quantities, two equations',
    <TwoPortScene param="box" />,
    'V₁, I₁, V₂, I₂ with two relations between them: four parameters describe the box completely.',
    'wide-box',
    'na-two-port',
    'two-port',
  ),
  'm5-u10-ops': wrap(
    'Cascading with ABCD — matrices multiply in signal order',
    <CascadeScene />,
    '[T] = [T₁][T₂][T₃]. The product does not commute, and the −I₂ convention is what makes it work.',
    'follow-chain',
    'na-cascade',
    'abcd',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}

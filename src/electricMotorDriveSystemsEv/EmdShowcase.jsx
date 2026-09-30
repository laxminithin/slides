/**
 * EmdShowcase — full-bleed hero scenes for BEE613D Electric Motor and Drive
 * Systems for Electric Vehicles.
 *
 * Keyed by slide id (`mN-uK-ops`). buildSlides swaps the normal split layout
 * for a showcase whenever a unit's "watch" beat is registered here.
 */
import {
  DragSquareCubeScene,
  BrakingRegenerationScene,
  FieldWeakeningRegionScene,
  DriveCycleComparisonScene,
  DcCommutationScene,
  RegenerationBoostScene,
  RotatingFieldScene,
  FieldOrientationScene,
  SrmStructureScene,
  SrmTorqueProductionScene,
} from './EmdScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="emd-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u5-ops': wrap(
    'Force goes as speed squared, power as speed cubed',
    <DragSquareCubeScene />,
    'Double the speed: four times the force, eight times the power — why fast is expensive.',
    'side-by-side',
    'emd-cube-law',
    'drag',
  ),
  'm1-u13-ops': wrap(
    'Adhesion caps deceleration — stopping distance goes as speed squared',
    <BrakingRegenerationScene />,
    'More powerful brakes do not shorten the stop; only tyre adhesion sets the limit.',
    'pull-network',
    'emd-braking-square',
    'braking',
  ),
  'm2-u5-ops': wrap(
    'Weaken the flux to raise speed at fixed voltage',
    <FieldWeakeningRegionScene />,
    'Torque falls as speed rises; the product — power — holds constant.',
    'overhead-board',
    'emd-field-weaken',
    'field-weakening',
  ),
  'm2-u13-ops': wrap(
    'Consumption is a property of the cycle as much as the vehicle',
    <DriveCycleComparisonScene />,
    'An EV does better in town, a petrol car better on the highway — the reversal follows from regeneration.',
    'side-by-side',
    'emd-cycle-compare',
    'drive-cycle',
  ),
  'm3-u1-ops': wrap(
    'The commutator — a mechanical inverter',
    <DcCommutationScene />,
    'It reverses conductor current at the neutral axis so torque stays one way, all in hardware.',
    'close-element',
    'emd-commutator',
    'commutation',
  ),
  'm3-u14-ops': wrap(
    'The chopper as a boost converter — regeneration down to low speed',
    <RegenerationBoostScene />,
    'The inductance voltage stacks on the back EMF, forcing current into the battery even when E is small.',
    'overhead-board',
    'emd-boost-regen',
    'regeneration',
  ),
  'm4-u1-ops': wrap(
    'The rotating field — the whole basis of the induction machine',
    <RotatingFieldScene />,
    'Balanced three-phase currents in three displaced windings make a field that rotates at synchronous speed.',
    'wide-bench',
    'emd-rotating-field',
    'induction',
  ),
  'm4-u10-ops': wrap(
    'Field orientation — an induction machine that thinks like a DC machine',
    <FieldOrientationScene />,
    'Resolve the current along and across the rotor flux, and torque and flux decouple exactly as in a DC machine.',
    'close-element',
    'emd-field-orient',
    'foc',
  ),
  'm5-u9-ops': wrap(
    'The switched reluctance rotor — nothing but shaped steel',
    <SrmStructureScene />,
    'No windings, no magnets, no conductors — the cheapest, most robust rotor of any machine type.',
    'wide-bench',
    'emd-srm-rotor',
    'srm',
  ),
  'm5-u10-ops': wrap(
    'Torque from reluctance alone — current squared times the inductance slope',
    <SrmTorqueProductionScene />,
    'Current polarity is irrelevant; torque comes only while the inductance is changing.',
    'overhead-board',
    'emd-srm-torque',
    'reluctance-torque',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}

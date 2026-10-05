/**
 * HveShowcase — full-bleed hero scenes for BEE515A High Voltage Engineering.
 *
 * Keyed by slide id (`mN-uK-ops`). buildSlides swaps the normal split layout
 * for a showcase whenever a unit's "watch" beat is registered here, so each
 * module gets two slides where the mechanism fills the stage.
 */
import {
  AvalancheGrowthScene,
  PaschenCurveScene,
  CockcroftWaltonScene,
  MarxGeneratorScene,
  SphereGapArrangementScene,
  ElectrostaticVoltmeterScene,
  LightningStrokeSequenceScene,
  BackFlashoverScene,
  ScheringBridgeScene,
  PartialDischargeProgressionScene,
} from './HveScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="hve-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u6-ops': wrap(
    'The avalanche — one electron becomes thousands',
    <AvalancheGrowthScene />,
    'Alpha counts ionisations per centimetre; the population grows exponentially with distance.',
    'close-element',
    'hve-avalanche-multiply',
    'avalanche',
  ),
  'm1-u12-ops': wrap(
    'The Paschen curve — why partial vacuum is the worst insulator',
    <PaschenCurveScene />,
    'Only the pressure-distance product matters, and the curve has a minimum.',
    'side-by-side',
    'hve-paschen-sweep',
    'paschen-curve',
  ),
  'm2-u4-ops': wrap(
    'The Cockcroft-Walton ladder — megavolts, no part stressed above 2V',
    <CockcroftWaltonScene />,
    'Two capacitor columns and a rectifier ladder stack doublers into a lossless multiplier.',
    'overhead-board',
    'hve-cw-ladder',
    'cockcroft-walton',
  ),
  'm2-u15-ops': wrap(
    'The Marx generator firing — parallel charge, series discharge',
    <MarxGeneratorScene />,
    'Trigger one gap and the cascade overvolts every stage above it in under a microsecond.',
    'pull-network',
    'hve-marx-cascade',
    'marx-generator',
  ),
  'm3-u10-ops': wrap(
    'The sphere gap — measuring voltage by breaking down',
    <SphereGapArrangementScene />,
    'The one method common to direct, alternating and impulse voltage — the absolute reference.',
    'wide-bench',
    'hve-sphere-spark',
    'sphere-gap',
  ),
  'm3-u8-ops': wrap(
    'The electrostatic voltmeter — force goes as V squared',
    <ElectrostaticVoltmeterScene />,
    'True RMS regardless of waveform, and no current drawn from the source at all.',
    'close-element',
    'hve-force-square-law',
    'electrostatic-voltmeter',
  ),
  'm4-u3-ops': wrap(
    'The lightning stroke sequence — leader down, streamer up, return stroke carries the current',
    <LightningStrokeSequenceScene />,
    'The bright flash you see travels upward from the ground, not down from the cloud.',
    'wide-bench',
    'hve-stroke-sequence',
    'lightning-stroke',
  ),
  'm4-u13-ops': wrap(
    'Back flashover — the tower strikes the line, not the line the tower',
    <BackFlashoverScene />,
    'Footing resistance sets the critical current — the failure mode peculiar to a shielded line.',
    'pull-network',
    'hve-reverse-arc',
    'back-flashover',
  ),
  'm5-u3-ops': wrap(
    'The Schering bridge — null balance at earth potential',
    <ScheringBridgeScene />,
    'A loss-free standard capacitor and two low-voltage arms turn a fraction-of-a-degree angle into two easy readings.',
    'overhead-board',
    'hve-bridge-null',
    'schering-bridge',
  ),
  'm5-u6-ops': wrap(
    'A void, discharging long before the bulk ever would',
    <PartialDischargeProgressionScene />,
    'Each discharge erodes the void a little more — cumulative, accelerating, and why the test exists.',
    'close-element',
    'hve-void-erosion',
    'partial-discharge',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}

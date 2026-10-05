/** Full-bleed showcase layouts for Fluid Mechanics. Two per module. */
import {
  CapillaryRiseDepressionScene,
  CentreOfPressureGateScene,
  ReynoldsDyeFilamentScene,
  FlowNetDamScene,
  VelocityTrianglesMovingVaneScene,
  EnergyGradeLinesScene,
  SeparationProfileScene,
  AerofoilLiftStallScene,
  CdNozzleOperatingRegimesScene,
  NormalShockPropertyJumpsScene,
} from './FmScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return { title, camera, family, object, takeaway, scene: <div className="fm-showcase-scene">{scene}</div> }
}

const SHOWCASE = {
  'm1-u7-ops': wrap('Capillarity: surface tension lifting a liquid column', <CapillaryRiseDepressionScene />, 'A wetting liquid rises and a non-wetting liquid falls until surface-tension force balances the column weight.', 'side-by-side', 'fm-capillarity', 'capillary-tubes'),
  'm1-u16-ops': wrap('Hydrostatic force acts below the centroid', <CentreOfPressureGateScene />, 'Pressure grows with depth, so the resultant on an inclined gate passes through the centre of pressure, below its centroid.', 'overhead-board', 'fm-centre-pressure', 'inclined-gate'),
  'm2-u2-ops': wrap('Reynolds number makes a dye filament reveal transition', <ReynoldsDyeFilamentScene />, 'The same dye line stays orderly in laminar flow and disperses once turbulent mixing takes over.', 'wide-bench', 'fm-reynolds-transition', 'dye-filament'),
  'm2-u12-ops': wrap('A flow net turns seepage below a dam into geometry', <FlowNetDamScene />, 'Every curvilinear square tracks equal head loss and equal discharge, making uplift and seepage measurable by drawing.', 'overhead-board', 'fm-flow-net', 'dam-seepage'),
  'm3-u5-ops': wrap('Velocity triangles expose where a moving vane gets work', <VelocityTrianglesMovingVaneScene />, 'Blade speed changes the relative jet velocity; the whirl component difference is the work transferred.', 'close-element', 'fm-moving-vane', 'velocity-triangles'),
  'm3-u16-ops': wrap('Energy and hydraulic grade lines tell the whole pipe story', <EnergyGradeLinesScene />, 'Losses lower both lines, a pump raises them, and the gap to the pipe records pressure head.', 'wide-bench', 'fm-energy-grade', 'pipeline-profile'),
  'm4-u4-ops': wrap('Separation begins when the wall flow reverses', <SeparationProfileScene />, 'An adverse pressure gradient slows the near-wall fluid to zero, then reverses it into a separated wake.', 'side-by-side', 'fm-separation', 'boundary-layer'),
  'm4-u8-ops': wrap('Lift rises until separation causes an aerofoil to stall', <AerofoilLiftStallScene />, 'Increasing angle of attack initially raises lift; upper-surface separation then brings the abrupt loss called stall.', 'wide-bench', 'fm-aerofoil-stall', 'aerofoil'),
  'm5-u9-ops': wrap('One nozzle geometry, six operating regimes', <CdNozzleOperatingRegimesScene />, 'Back pressure decides whether the nozzle diffuses, chokes, contains a normal shock, or expands cleanly to supersonic flow.', 'overhead-board', 'fm-cd-nozzle', 'de-laval-nozzle'),
  'm5-u10-ops': wrap('A normal shock trades velocity for pressure irreversibly', <NormalShockPropertyJumpsScene />, 'Across the thin shock, flow becomes subsonic: pressure rises, stagnation pressure falls, and entropy can only increase.', 'close-element', 'fm-normal-shock', 'shock-jump'),
}

export function getShowcase(id) {
  return SHOWCASE[id] || null
}

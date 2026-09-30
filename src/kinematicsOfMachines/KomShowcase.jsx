/** Full-bleed showcase layouts for Kinematics of Machines. Two per module. */
import {
  M1InversionGalleryScene,
  M1DoubleSliderScene,
  M2VelPolygonScene,
  M2CentrodeScene,
  M3CouplerCurveAtlasScene,
  M3FreeBodyIsolationSequenceScene,
  M4TurningMomentDiagramScene,
  M4DynamicAnalysisIntegrationScene,
  M5GearFamilyScene,
  M5EpicyclicTabularScene
} from './KomScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="kom-showcase-scene">{scene}</div>,
  }
}

const SHOWCASE = {
  'm1-u10-ops': wrap(
    'The four-bar chain and its inversions',
    <M1InversionGalleryScene />,
    'Four links, four pins, and the four lengths decide whether each side link rotates fully or merely rocks.',
    'side-by-side',
    'kom-four-bar',
    'inversions',
  ),
  'm1-u15-ops': wrap(
    'The double slider-crank chain',
    <M1DoubleSliderScene />,
    'Two sliders and two pins give an ellipse drawer, a perfect harmonic motion generator and a coupling for offset shafts, all from one chain.',
    'wide-bench',
    'kom-double-slider',
    'inversions',
  ),
  'm2-u3-ops': wrap(
    'Velocity polygons',
    <M2VelPolygonScene />,
    'Draw every absolute velocity from one pole and every relative velocity appears automatically as the line between the corresponding tips.',
    'side-by-side',
    'kom-vel-polygon',
    'polygon',
  ),
  'm2-u12-ops': wrap(
    'Centrodes',
    <M2CentrodeScene />,
    'The instantaneous centre traces two curves, and rolling one on the other without slipping reproduces the motion exactly.',
    'overhead-board',
    'kom-centrode',
    'rolling',
  ),
  'm3-u6-ops': wrap(
    'Coupler curves',
    <M3CouplerCurveAtlasScene />,
    'Move the tracing point on the coupler and the path changes completely, which is how one simple linkage produces straight lines, dwells and figure of eight motions.',
    'wide-bench',
    'kom-coupler',
    'curves',
  ),
  'm3-u8-ops': wrap(
    'Free-body diagrams and conditions for equilibrium',
    <M3FreeBodyIsolationSequenceScene />,
    'Isolate one link, replace every connection by its force, and three equilibrium equations determine at most three unknowns.',
    'pull-network',
    'kom-free-body',
    'equilibrium',
  ),
  'm4-u10-ops': wrap(
    'Turning moment diagrams',
    <M4TurningMomentDiagramScene />,
    'Plot torque against crank angle, draw the mean line, and the areas between them are the energy a flywheel has to store.',
    'overhead-board',
    'kom-turning-moment',
    'diagram',
  ),
  'm4-u16-ops': wrap(
    'Putting the dynamic analysis together',
    <M4DynamicAnalysisIntegrationScene />,
    'The analysis runs kinematics to inertia to forces to torque to flywheel, and the square law on speed is what ties every design decision together.',
    'pull-network',
    'kom-dynamic-integration',
    'map',
  ),
  'm5-u1-ops': wrap(
    'Classification of gears',
    <M5GearFamilyScene />,
    'The relative position of the two shafts decides the gear type, and the gear type then decides the smoothness, the thrust and the efficiency.',
    'wide-bench',
    'kom-gear-family',
    'gears',
  ),
  'm5-u15-ops': wrap(
    'Epicyclic gear trains and their analysis',
    <M5EpicyclicTabularScene />,
    'Lock everything and turn the arm, then hold the arm and turn the gears, then add the two motions, and any epicyclic train resolves.',
    'side-by-side',
    'kom-epicyclic',
    'tabular',
  ),
}

export function getShowcase(id) {
  return SHOWCASE[id] || null
}

/**
 * CgShowcase — wide hero teaching scenes for BCS504 Computer Graphics.
 * Keyed by slide id (`mN-uK-ops`) for buildSlides showcase layout.
 */
import {
  GraphicsPipelineScene,
  ConcatOrderScene,
  PhongScene,
  DdaScene,
  BresenhamScene,
  MidpointCircleScene,
  PALETTE,
} from './CgScenes.jsx'

const { BLUE, AMBER, PURP, GREEN, RED } = PALETTE

function wrap(title, hue, scene, takeaway, camera = 'wide-process', family = 'cg-pipeline', object = 'pipeline') {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="cg-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u9-ops': wrap(
    'Graphics pipeline — Model to Fragment',
    BLUE,
    <GraphicsPipelineScene />,
    'Trace Model → World → View → Projection → Clip → Raster → Fragment on every exam diagram.',
    'follow-flow',
    'cg-pipeline',
    'pipeline',
  ),
  'm3-u9-ops': wrap(
    'Transform order — R→T vs T→R',
    AMBER,
    <ConcatOrderScene />,
    'Same matrices, different order → different final pose. Always state multiplication order.',
    'side-by-side',
    'cg-concat-order',
    'transforms',
  ),
  'm4-u6-ops': wrap(
    'Phong — ambient + diffuse + specular',
    PURP,
    <PhongScene />,
    'I = kaIa + kd(N·L)Id + ks(R·V)^n Is — move the light and watch the highlight.',
    'close-process',
    'cg-phong',
    'lighting',
  ),
  'm5-u10-ops': wrap(
    'DDA — pixels light along the line',
    GREEN,
    <DdaScene />,
    'Increment x,y by dx/steps and dy/steps, then round to the nearest pixel.',
    'overhead-board',
    'cg-dda',
    'dda',
  ),
  'm5-u11-ops': wrap(
    'Bresenham — decision parameter p',
    RED,
    <BresenhamScene />,
    'Integer p chooses East vs North-East; no floating multiply in the inner loop.',
    'follow-flow',
    'cg-bresenham',
    'bresenham',
  ),
  'm5-u15-ops': wrap(
    'Midpoint circle — 8-way symmetry',
    BLUE,
    <MidpointCircleScene />,
    'Compute one octant with the midpoint test, then plot all eight symmetric pixels.',
    'overhead-board',
    'cg-midpoint-circle',
    'circle',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}

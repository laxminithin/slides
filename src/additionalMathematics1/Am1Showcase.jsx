/**
 * Am1Showcase — full-bleed hero scenes for 1BMATDIP310 Additional
 * Mathematics-1.
 *
 * Keyed by slide id (`mN-uK-ops`). buildSlides swaps the normal split layout
 * for a showcase whenever a unit's "watch" beat is registered here.
 */
import {
  M1PolarGalleryScene,
  M1LemniscateTraceScene,
  M2GridSquareToParallelogramScene,
  M2PlaneCollapsesToCurveScene,
  M3TwinParabolaAreaScene,
  M3CardioidOutsideCircleScene,
  M4DivergenceSourceSinkScene,
  M4CurlPaddleWheelScene,
  M5TraceDetScene,
  M5EigenDirectionsScene,
} from './Am1Scenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="am1-showcase-scene">{scene}</div>,
  }
}

const SHOWCASE = {
  'm1-u3-ops': wrap(
    'Six curves, one habit: read |r|, the zeros of r, and where r < 0 first',
    <M1PolarGalleryScene />,
    'A cardioid, two roses, a lemniscate, a limaçon and a spiral — every one plotted from three facts, not a table of points.',
    'wide-bench',
    'am1-polar-gallery',
    'polar-curves',
  ),
  'm1-u4-ops': wrap(
    'A checklist turns into a figure-eight',
    <M1LemniscateTraceScene />,
    'Symmetry, limits and the pole halve the work before a single point is plotted.',
    'side-by-side',
    'am1-lemniscate-trace',
    'curve-tracing',
  ),
  'm2-u10-ops': wrap(
    'The Jacobian is a local area scale factor',
    <M2GridSquareToParallelogramScene />,
    'A tiny square in the xy-plane lands as a parallelogram 40 times larger in the uv-plane — that 40 is |J|.',
    'side-by-side',
    'am1-jacobian-area',
    'jacobian',
  ),
  'm2-u13-ops': wrap(
    'A zero Jacobian collapses a plane onto a curve',
    <M2PlaneCollapsesToCurveScene />,
    'Every shaded cell in the xy-plane flattens onto the same curve u = tan v — the signature of functional dependence.',
    'side-by-side',
    'am1-functional-dependence',
    'jacobian',
  ),
  'm3-u15-ops': wrap(
    'Area between two parabolas, swept strip by strip',
    <M3TwinParabolaAreaScene />,
    'The lens between y² = 4ax and x² = 4ay integrates to a clean 16a²/3.',
    'overhead-board',
    'am1-twin-parabola-area',
    'double-integral',
  ),
  'm3-u16-ops': wrap(
    'The crescent outside the circle, inside the cardioid',
    <M3CardioidOutsideCircleScene />,
    'Polar area is just ½∫r²dθ — swept as a stack of thin circular wedges, doubled by symmetry.',
    'overhead-board',
    'am1-cardioid-area',
    'polar-area',
  ),
  'm4-u8-ops': wrap(
    'Divergence: source, sink, or neither',
    <M4DivergenceSourceSinkScene />,
    'Arrows radiating out, arrows converging in, or a field that only shears — divergence tells them apart with one number.',
    'wide-bench',
    'am1-divergence',
    'vector-calculus',
  ),
  'm4-u9-ops': wrap(
    'Curl is what spins the paddle wheel',
    <M4CurlPaddleWheelScene />,
    'A shear flow — fast at the bottom, slow at the top — sets an imaginary paddle wheel turning; curl is its axis and speed.',
    'close-element',
    'am1-curl',
    'vector-calculus',
  ),
  'm5-u15-ops': wrap(
    'The characteristic equation, read straight off the matrix',
    <M5TraceDetScene />,
    'λ² − (trace)λ + det = 0 for any 2×2 matrix — no determinant expansion needed once trace and det are known.',
    'close-element',
    'am1-trace-det',
    'eigenvalues',
  ),
  'm5-u16-ops': wrap(
    'Eigenvectors are the directions a matrix refuses to turn',
    <M5EigenDirectionsScene />,
    'Every other vector on the plane gets rotated; only the two eigen-lines are simply stretched.',
    'wide-bench',
    'am1-eigen-directions',
    'eigenvectors',
  ),
}

export function getShowcase(id) {
  return SHOWCASE[id] || null
}

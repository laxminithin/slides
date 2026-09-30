/**
 * CatShowcase — full-bleed hero scenes for 1BMATEE301.
 *
 * Keyed by slide id (`mN-uK-ops`). buildSlides swaps the normal split layout
 * for a showcase whenever a unit's "watch" beat is registered here, so each
 * module gets two slides where the mechanism fills the stage.
 */
import {
  ComplexMappingGridScene,
  IntegralFormulaScene,
  PartialSumsScene,
  EulerFormulaeScene,
  SeriesToIntegralScene,
  ThreeTransformsScene,
  CentralLimitScene,
  ConfidenceIntervalScene,
  CornerPointScene,
  PivotSelectionScene,
} from './CatScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="cat-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u1-ops': wrap(
    'w = z² — a grid becoming confocal parabolas',
    <ComplexMappingGridScene />,
    'Straight lines bend into parabolas, but every angle between them survives. That is what analytic means, geometrically.',
    'pull-plane',
    'cat-plane-map',
    'mapping',
  ),
  'm1-u10-ops': wrap(
    'The integral formula — the boundary determines the interior',
    <IntegralFormulaScene />,
    'Know f on the contour and you know f at every point inside it. No real function behaves remotely like this.',
    'wide-page',
    'cat-contour-walk',
    'integral-formula',
  ),
  'm2-u4-ops': wrap(
    'Euler formulae — one argument, run three times',
    <EulerFormulaeScene />,
    'Multiply by the harmonic you want, integrate, and orthogonality annihilates everything else. Only the multiplier changes.',
    'overhead-board',
    'cat-coefficient-extract',
    'coefficients',
  ),
  'm2-u6-ops': wrap(
    'Partial sums — and the overshoot that never shrinks',
    <PartialSumsScene />,
    'Fifteen terms gets you close everywhere except at the jump, where the 9% spike narrows but never gets shorter.',
    'follow-curve',
    'cat-harmonic-stack',
    'partial-sums',
  ),
  'm3-u1-ops': wrap(
    'Series to integral — the lines crowd into a curve',
    <SeriesToIntegralScene />,
    'Stretch the period and the discrete spectrum fills in. The Fourier integral is the limit of the Fourier series, nothing more.',
    'wide-page',
    'cat-spectrum-spread',
    'spectral-density',
  ),
  'm3-u15-ops': wrap(
    'Three transforms, one plane',
    <ThreeTransformsScene />,
    'Laplace owns the plane, Fourier owns its imaginary axis, and z = e^(sT) maps the stable half into the unit disc.',
    'pull-plane',
    'cat-pole-place',
    's-plane',
  ),
  'm4-u11-ops': wrap(
    'The central limit theorem — every row converges',
    <CentralLimitScene />,
    'Uniform, skewed or bimodal, the mean of enough of them is normal. The skewed one just takes longer.',
    'overhead-board',
    'cat-sample-scatter',
    'clt',
  ),
  'm4-u15-ops': wrap(
    'What a 95% interval actually claims',
    <ConfidenceIntervalScene />,
    'The interval is random and the mean is fixed. Nineteen of twenty of these happened to catch it; one did not.',
    'close-symbol',
    'cat-estimate-narrow',
    'confidence',
  ),
  'm5-u6-ops': wrap(
    'Sliding the objective line to the last vertex',
    <CornerPointScene />,
    'The optimum of a linear programme is always at a corner — so there are only ever finitely many candidates.',
    'pull-plane',
    'cat-vertex-hop',
    'corner-point',
  ),
  'm5-u11-ops': wrap(
    'Choosing the pivot — column, then row',
    <PivotSelectionScene />,
    'Most negative entry picks the column; smallest valid ratio picks the row. Zero and negative denominators are excluded.',
    'overhead-board',
    'cat-pivot-swap',
    'pivot',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}

/**
 * MsmShowcase — full-bleed hero scenes for 1BME302 Materials Science and
 * Metallurgy.
 *
 * Keyed by slide id (`mN-uK-ops`). buildSlides swaps the normal split layout
 * for a showcase whenever a unit's "watch" beat is registered here. Two per
 * module: the beat where the diagram, not the prose, is the lesson.
 */
import {
  MetallicBondingScene,
  DislocationMotionScene,
  VacancyDiffusionScene,
  ErrorFunctionCaseDepthScene,
  TensileCurveAnatomyScene,
  FatigueSnAndFractureScene,
  FeFe3CDiagramScene,
  TttDiagramScene,
  CriticalFibreLengthScene,
  TgAndTmFactorsScene,
} from './MsmScenes.jsx'

function wrap(title, scene, takeaway, camera, family, object) {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="msm-showcase-scene">{scene}</div>,
  }
}

const SHOWCASE = {
  'm1-u2-ops': wrap(
    'A sea of free electrons explains every metallic property at once',
    <MetallicBondingScene />,
    'Non-directional bonding is why metals conduct, shine, and deform instead of shattering.',
    'close-element',
    'msm-electron-sea',
    'metallic-bond',
  ),
  'm1-u15-ops': wrap(
    'A dislocation moves a plane one row at a time, not all at once',
    <DislocationMotionScene />,
    'The caterpillar, not the carpet: this is why real metals yield far below their theoretical strength.',
    'side-by-side',
    'msm-slip-step',
    'dislocation',
  ),
  'm2-u10-ops': wrap(
    'Atoms move by trading places with holes, and holes multiply with temperature',
    <VacancyDiffusionScene />,
    'Diffusion needs a vacancy next door and enough energy to jump into it — both rise steeply with heat.',
    'close-element',
    'msm-vacancy-hop',
    'diffusion',
  ),
  'm2-u14-ops': wrap(
    'Case depth follows the square root of time — never the time itself',
    <ErrorFunctionCaseDepthScene />,
    'Four times the hours buys twice the depth. That single curve sets every carburising schedule.',
    'overhead-board',
    'msm-case-depth',
    'error-function',
  ),
  'm3-u4-ops': wrap(
    'One curve carries every mechanical property the part will ever have',
    <TensileCurveAnatomyScene />,
    'Slope, first departure, peak and area each name a different property — read them in order.',
    'wide-bench',
    'msm-tensile-read',
    'stress-strain',
  ),
  'm3-u14-ops': wrap(
    'Failure below the yield stress, given enough cycles',
    <FatigueSnAndFractureScene />,
    'Steel has a limit it can live under forever; aluminium has none — it only has a life.',
    'side-by-side',
    'msm-sn-curve',
    'fatigue',
  ),
  'm4-u9-ops': wrap(
    'The one diagram every heat treatment in steel is read from',
    <FeFe3CDiagramScene />,
    'Eutectoid, hypo- and hyper-: composition alone fixes which phases appear on slow cooling.',
    'overhead-board',
    'msm-phase-field',
    'fe-fe3c',
  ),
  'm4-u14-ops': wrap(
    'Same steel, same temperature — the clock decides the microstructure',
    <TttDiagramScene />,
    'Miss the nose and you get martensite; touch it and you get pearlite. Time is the variable.',
    'wide-bench',
    'msm-ttt-nose',
    'ttt',
  ),
  'm5-u4-ops': wrap(
    'Below the critical length a fibre pulls out instead of carrying load',
    <CriticalFibreLengthScene />,
    'The matrix needs a minimum embedded length to load the fibre to its own fracture stress.',
    'side-by-side',
    'msm-fibre-stress',
    'critical-length',
  ),
  'm5-u13-ops': wrap(
    'Polymers have two transitions, and service temperature must clear both',
    <TgAndTmFactorsScene />,
    'Stiffness falls off a cliff at Tg long before anything melts — that is usually the real limit.',
    'overhead-board',
    'msm-modulus-drop',
    'tg-tm',
  ),
}

export function getShowcase(id) {
  return SHOWCASE[id] || null
}

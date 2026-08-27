/**
 * SeShowcase — wide hero teaching scenes for BCS501.
 * Keyed by slide id for buildSlides showcase layout.
 */
import {
  WaterfallScene,
  IncrementalScene,
  UnifiedProcessScene,
  RequirementsCycleScene,
  UseCaseScene,
  AgileLoopScene,
  XpPipelineScene,
  ProcessFlowScene,
  ConcurrentScene,
  EvolutionaryScene,
  StakeholderMapScene,
  RiskMatrixScene,
  CostBenefitScene,
  EstimateDecomposeScene,
  QualityGateScene,
  MythBustScene,
  SE,
} from './SeScenes.jsx'

const { BLUE, AMBER, PURP, TEAL, GREEN, RED } = SE

function wrap(title, hue, scene, takeaway, camera = 'wide-process', family = 'process-flow', object = 'process') {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="se-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  'm1-u4-ops': wrap('Software process — flow + feedback', BLUE, <ProcessFlowScene mode="umbrella" />, 'Framework activities plus umbrella activities and feedback.', 'flow', 'process-flow', 'process'),
  'm1-u6-ops': wrap('Software myths — myth paired with reality', RED, <MythBustScene />, 'Exam answers always state myth AND reality.', 'split', 'myth-bust', 'myth'),
  'm1-u9-ops': wrap('Waterfall — cascade & cost of late change', AMBER, <WaterfallScene showCost />, 'Late change in Waterfall is expensive — draw the cost ramp.', 'cascade', 'waterfall-cascade', 'waterfall'),
  'm1-u10-ops': wrap('Incremental — product grows in planned slices', BLUE, <IncrementalScene />, 'Core first, then Feature 1 → 2 → 3 with early user value.', 'growth', 'incremental-grow', 'increment'),
  'm1-u11-ops': wrap('Evolutionary — cycles reduce uncertainty', PURP, <EvolutionaryScene />, 'Each spiral/prototype loop buys knowledge.', 'orbit', 'evolutionary-cycle', 'spiral'),
  'm1-u12-ops': wrap('Concurrent — many activity states at once', TEAL, <ConcurrentScene />, 'Real projects are concurrent state machines.', 'parallel', 'concurrent-states', 'states'),
  'm1-u14-ops': wrap('Unified Process — overlapping disciplines', GREEN, <UnifiedProcessScene />, 'Inception → Elaboration → Construction → Transition with humps.', 'hump', 'up-phases', 'up'),
  'm2-u1-ops': wrap('Requirements engineering cycle', TEAL, <RequirementsCycleScene />, 'Inception through management is a living cycle.', 'orbit', 'requirements-cycle', 're'),
  'm2-u4-ops': wrap('Use cases — actor, action, system response', BLUE, <UseCaseScene />, 'Animate the interaction path, then add extensions.', 'path', 'usecase-path', 'usecase'),
  'm3-u3-ops': wrap('Agile process — backlog moves through the board', AMBER, <AgileLoopScene />, 'Short iterations with demo and retrospective.', 'board', 'agile-loop', 'backlog'),
  'm3-u4-ops': wrap('XP pipeline — story to small release', PURP, <XpPipelineScene />, 'Story → Plan → Pair → Test → Integrate → Release.', 'pipeline', 'xp-pipeline', 'xp'),
  'm4-u6-ops': wrap('Stakeholder map — manage closely', AMBER, <StakeholderMapScene />, 'High power × high interest needs active engagement.', 'map', 'stakeholder-map', 'stakeholders'),
  'm4-u14-ops': wrap('Cost–benefit evaluation', GREEN, <CostBenefitScene />, 'Payback when cumulative benefit overtakes cost.', 'bars', 'cost-benefit', 'cashflow'),
  'm4-u15-ops': wrap('Risk matrix — probability × impact', RED, <RiskMatrixScene />, 'Score, plot, assign mitigation owners.', 'matrix', 'risk-matrix', 'risk'),
  'm5-u1-ops': wrap('Quality gates on the plan', TEAL, <QualityGateScene />, 'Quality is scheduled — not left to the final week.', 'gates', 'quality-gate', 'quality'),
  'm5-u7-ops': wrap('Estimation by decomposition', BLUE, <EstimateDecomposeScene />, 'Break work, sum parts, add contingency — give a range.', 'tree', 'estimate-decompose', 'estimate'),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}

/**
 * Presentation Engine V7.0 — API Freeze
 *
 * The cinematic engine is FEATURE COMPLETE.
 * These interfaces are stable platform contracts.
 *
 * Rules:
 * - Prefer additive changes over breaking changes.
 * - No new framework features unless they solve a demonstrated
 *   problem across multiple subjects.
 * - Engine changes must prove against the International Business
 *   showcase before platform-wide rollout.
 *
 * Investment model: ~20% engine (bugs, perf, a11y, tooling, docs)
 *                   ~80% content (teaching quality).
 */

export const ENGINE_VERSION = '7.0'
export const ENGINE_STATUS = 'stable'
export const ENGINE_API_FROZEN = true

/**
 * Stable contracts. Do not rename, remove, or change signatures
 * without a documented migration path.
 */
export const STABLE_CONTRACTS = Object.freeze({
  sceneLifecycle: {
    id: 'scene-lifecycle',
    surface: ['PresentationEngine', 'useLivingEngine', 'FilmContinuity', 'REVEAL_BEATS'],
    rule: 'Slide enter → reveal beats → focus → dwell → soft cut remains the canonical lifecycle.',
  },
  motionLibrary: {
    id: 'motion-library',
    surface: ['MOTION', 'CAMERA', 'CHOREO', 'RHYTHM', 'motionRoleForScene', 'resolveCamera'],
    rule: 'One motion language. Additive roles only; no parallel vocabularies.',
  },
  timelineEngine: {
    id: 'timeline-engine',
    surface: ['sceneBeatSchedule', 'sceneBeatVars', 'formatTimeline', 'SCENE_DURATION_BOUNDS'],
    rule: 'Establish → focus → narrative → climax → settle is the beat contract.',
  },
  adaptiveEngine: {
    id: 'adaptive-engine',
    surface: ['resolveMotionBudget', 'motionDurationScale'],
    rule: 'Budget ids and duration scale mapping are stable; new budgets may be additive.',
  },
  teachingModes: {
    id: 'teaching-modes',
    surface: ['LIVING_MODES', 'TeachingControls', 'loadLivingMode', 'saveLivingMode'],
    rule: 'student | lecturer | revision identities are frozen.',
  },
  revisionMode: {
    id: 'revision-mode',
    surface: ['LIVING_MODES.REVISION', 'compressed motion budget', 'decorative mute'],
    rule: 'Revision remains compressed concept → keywords → memory.',
  },
  analyticsInterface: {
    id: 'analytics-interface',
    surface: [
      'trackSlideEnter',
      'trackSlideDwell',
      'trackReplay',
      'trackSkip',
      'trackPause',
      'trackModuleComplete',
      'getInsights',
      'getRecommendations',
    ],
    rule: 'Local-only analytics. Event names are stable; recommendation payloads may grow additively.',
  },
  subjectPluginContract: {
    id: 'subject-plugin-contract',
    surface: [
      'createSubjectManifest',
      'createSubjectPlugin',
      'resolveEngineCapabilities',
      'validateAgainstShowcase',
      'SUBJECT_PLUGIN_CONTRACT',
      'SUBJECT_SDK_PROVIDES',
    ],
    rule: 'Subjects supply identity + content + film meta. Engine supplies behavior.',
  },
  designTokens: {
    id: 'design-tokens',
    surface: [
      '--motion-*',
      '--scene-*',
      '--space-*',
      '--shadow-*',
      '--surface*',
      '--highlight*',
      '--hero-tier-*-scale',
    ],
    rule: 'Token names are stable. New tokens may be added; existing names must keep meaning.',
  },
  qaInterface: {
    id: 'qa-interface',
    surface: ['auditAnimationSequence', 'scenesFromSlides', 'QA_SEVERITY', 'validateContentRelease'],
    rule: 'QA codes may grow additively; existing codes keep severity semantics.',
  },
})

export const STABLE_CONTRACT_IDS = Object.freeze(
  Object.values(STABLE_CONTRACTS).map((item) => item.id),
)

/** Guard for tooling / docs — returns freeze metadata. */
export function getEngineLock() {
  return {
    version: ENGINE_VERSION,
    status: ENGINE_STATUS,
    frozen: ENGINE_API_FROZEN,
    contracts: STABLE_CONTRACT_IDS,
    showcaseId: 'international-business',
    investment: { engine: 0.2, content: 0.8 },
    principle:
      'Ask how to teach with the engine we have — not what new engine feature to build.',
  }
}

/**
 * Soft runtime assert for developers who accidentally request breaking changes.
 * Additive expansions are allowed; removals and renames are not.
 */
export function assertAdditiveChange({ removes = [], renames = [] } = {}) {
  if (!ENGINE_API_FROZEN) return { ok: true }
  if (removes.length || renames.length) {
    return {
      ok: false,
      message:
        'Engine API is frozen (V7). Removals/renames require a migration RFC. Prefer additive APIs.',
      removes,
      renames,
    }
  }
  return { ok: true }
}

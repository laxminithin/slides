export {
  WOW_BUDGET,
  SOFT_TRANSITIONS,
  resolveSoftTransition,
  planWowBudget,
  createVisualMemory,
  resolveCallback,
  motifStage,
  chapterArc,
} from './engine.js'

export { FilmContinuity } from './FilmContinuity.jsx'

export {
  LIVING_MODES,
  REVEAL_BEATS,
  loadLivingMode,
  saveLivingMode,
  hasVisitedSlide,
  markSlideVisited,
  getVisitCount,
  focusDelayMs,
  suggestedDwellMs,
} from './modes.js'

export { resolveMotionBudget, motionDurationScale } from './adaptive.js'

export {
  trackSlideEnter,
  trackSlideDwell,
  trackReplay,
  trackSkip,
  trackPause,
  trackModuleComplete,
  getInsights,
  getRecommendations,
} from './analytics.js'

export {
  rememberMotif,
  getChapterMotifs,
  getSubjectMotifs,
} from './memory.js'

export { PresentationEngine, useLivingEngine } from './PresentationEngine.jsx'
export { TeachingControls } from './TeachingControls.jsx'
export { MemoryAnchor, ChapterMemoryMap } from './MemoryAnchor.jsx'

export {
  MOTION,
  MOTION_IDS,
  CAMERA,
  CAMERAS,
  CHOREO,
  CHOREOS,
  CAMERA_BY_CHOREO,
  RHYTHM,
  motionRoleForScene,
  describeMotion,
  resolveCamera,
} from './motion.js'

export {
  DEFAULT_BEAT_SCHEDULE,
  SCENE_DURATION_BOUNDS,
  sceneBeatSchedule,
  sceneBeatVars,
  formatTimeline,
  sceneDurationSeconds,
} from './timeline.js'

export {
  HERO_TIERS,
  HERO_TIER_META,
  resolveHeroTier,
  isElevatedHero,
  heroIntensity,
  heroFocusDelayMs,
  heroSuggestedDwellMs,
} from './hero.js'

export {
  SHOWCASE_SUBJECT_ID,
  SUBJECT_PLUGIN_CONTRACT,
  PLATFORM_RULES,
  resolveEngineCapabilities,
  createSubjectPlugin,
  validateAgainstShowcase,
} from './plugins.js'

export {
  QA_SEVERITY,
  auditAnimationSequence,
  scenesFromSlides,
} from './qa.js'

export {
  createPerfMonitor,
  countActiveAnimations,
  prefersReducedMotion,
  observeLayoutShifts,
  persistPerfSample,
} from './perf.js'

export { DebugPanel } from './DebugPanel.jsx'

/* V7.0 — platform lockdown surface */
export {
  ENGINE_VERSION,
  ENGINE_STATUS,
  ENGINE_API_FROZEN,
  STABLE_CONTRACTS,
  STABLE_CONTRACT_IDS,
  getEngineLock,
  assertAdditiveChange,
} from './stable.js'

export {
  SUBJECT_SDK_REQUIRES,
  SUBJECT_SDK_PROVIDES,
  SUBJECT_IDENTITY_PROMPT,
  createSubjectManifest,
  manifestToRegistryEntry,
  validateSubjectIdentity,
  getSubjectSdkOverview,
} from './sdk.js'

export {
  CONTENT_QUALITY_CHECKLIST,
  CONTENT_REVIEW_WORKFLOW,
  validateContentRelease,
} from './quality.js'

export { internationalBusinessShowcaseManifest } from './showcase.ib.js'

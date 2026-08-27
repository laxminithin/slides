/**
 * Presentation Engine V6 — Central Motion Library
 *
 * One motion language for every subject. Avoid inventing parallel animations
 * that communicate the same idea. Prefer these roles and their documented purpose.
 */

/** Motion roles — documented purpose for QA and authoring. */
export const MOTION = {
  ENTER: {
    id: 'enter',
    purpose: 'Scene arrival — establish presence without stealing attention.',
  },
  EXIT: {
    id: 'exit',
    purpose: 'Graceful leave so the next scene does not slam into place.',
  },
  REVEAL: {
    id: 'reveal',
    purpose: 'Progressive disclosure of content beats (lecturer or auto).',
  },
  FOCUS: {
    id: 'focus',
    purpose: 'Guide attention to the primary teaching target.',
  },
  EMPHASIS: {
    id: 'emphasis',
    purpose: 'Short pulse on a keyword, node, or decision — never continuous.',
  },
  TRANSITION: {
    id: 'transition',
    purpose: 'Soft cut between scenes (carry / morph / callback / rest).',
  },
  HERO: {
    id: 'hero',
    purpose: 'Elevated cinematic gravity for tiered hero moments.',
  },
  AMBIENT: {
    id: 'ambient',
    purpose: 'Living atmosphere that never competes with narrative content.',
  },
  CALLBACK: {
    id: 'callback',
    purpose: 'Sparse echo of an earlier motif to reinforce memory.',
  },
  MEMORY: {
    id: 'memory',
    purpose: 'Anchor a visual identity so students recognize concepts later.',
  },
  FINALE: {
    id: 'finale',
    purpose: 'Course-defining close — maximum intentional quality, used once.',
  },
}

export const MOTION_IDS = Object.values(MOTION).map((item) => item.id)

/** Shared camera vocabulary — subtle, premium, never aggressive. */
export const CAMERA = {
  SLOW_PUSH: 'slow-push',
  PULL_BACK: 'pull-back',
  LATERAL_DRIFT: 'lateral-drift',
  PERSPECTIVE: 'perspective',
  FOCUS_ZOOM: 'focus-zoom',
  PARALLAX: 'parallax',
  MAP_PAN: 'map-pan',
  ORB_ROTATE: 'orb-rotate',
  SOFT_BREATHE: 'soft-breathe',
  FOCUS_SHIFT: 'focus-shift',
}

export const CAMERAS = Object.values(CAMERA)

/** Shared choreography intents — one signature language per teaching intent. */
export const CHOREO = {
  TIMELINE: 'timeline',
  WORLD: 'world',
  BOARDROOM: 'boardroom',
  DECISION: 'decision',
  BLUEPRINT: 'blueprint',
  GROWTH: 'growth',
  DOCUMENTARY: 'documentary',
  COMPARISON: 'comparison',
  PROCESS: 'process',
  ORG: 'org',
  PULSE: 'pulse',
  STORY: 'story',
}

export const CHOREOS = Object.values(CHOREO)

/** Default camera by choreography. */
export const CAMERA_BY_CHOREO = {
  [CHOREO.TIMELINE]: CAMERA.LATERAL_DRIFT,
  [CHOREO.WORLD]: CAMERA.MAP_PAN,
  [CHOREO.BOARDROOM]: CAMERA.PULL_BACK,
  [CHOREO.DECISION]: CAMERA.FOCUS_ZOOM,
  [CHOREO.BLUEPRINT]: CAMERA.PERSPECTIVE,
  [CHOREO.GROWTH]: CAMERA.SLOW_PUSH,
  [CHOREO.DOCUMENTARY]: CAMERA.PARALLAX,
  [CHOREO.COMPARISON]: CAMERA.FOCUS_SHIFT,
  [CHOREO.PROCESS]: CAMERA.LATERAL_DRIFT,
  [CHOREO.ORG]: CAMERA.ORB_ROTATE,
  [CHOREO.PULSE]: CAMERA.SOFT_BREATHE,
  [CHOREO.STORY]: CAMERA.SLOW_PUSH,
}

/** Classroom rhythm labels — intentional pacing, not decoration. */
export const RHYTHM = [
  'fast',
  'quiet',
  'medium',
  'dramatic',
  'minimal',
  'wow',
  'executive',
  'reflective',
]

/** Map rhythm → motion role for inspectors / QA. */
export function motionRoleForScene({
  finale = false,
  hero = false,
  quiet = false,
  callback = false,
  transition = false,
  ambient = false,
} = {}) {
  if (finale) return MOTION.FINALE.id
  if (callback) return MOTION.CALLBACK.id
  if (hero) return MOTION.HERO.id
  if (quiet) return MOTION.FOCUS.id
  if (transition) return MOTION.TRANSITION.id
  if (ambient) return MOTION.AMBIENT.id
  return MOTION.ENTER.id
}

export function describeMotion(id) {
  return Object.values(MOTION).find((item) => item.id === id) || null
}

/**
 * Prefer one camera per idea. Returns preferred camera for choreo + modifiers.
 */
export function resolveCamera({
  choreo,
  hero = false,
  rhythm = 'medium',
  moduleNumber = 1,
  heroCameras = null,
} = {}) {
  if (hero) {
    const map = heroCameras || {
      1: CAMERA.MAP_PAN,
      2: CAMERA.PARALLAX,
      3: CAMERA.PERSPECTIVE,
      4: CAMERA.ORB_ROTATE,
      5: CAMERA.SLOW_PUSH,
      6: CAMERA.SOFT_BREATHE,
    }
    return map[moduleNumber] || CAMERA.SLOW_PUSH
  }
  if (rhythm === 'reflective' || rhythm === 'quiet') return CAMERA.PULL_BACK
  if (rhythm === 'fast') return CAMERA.FOCUS_SHIFT
  if (rhythm === 'executive') return CAMERA.SLOW_PUSH
  return CAMERA_BY_CHOREO[choreo] || CAMERA.SLOW_PUSH
}

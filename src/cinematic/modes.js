/**
 * Living Presentation Engine — adaptive modes (V6).
 *
 * student   → self-paced, animations auto-run
 * lecturer  → stepped reveal, wait for click (classroom)
 * revision  → compressed: concept → keywords → memory map
 *
 * Revisit detection shortens motion without changing content.
 * Hero tiers adjust focus / dwell without changing academic content.
 */

import { heroFocusDelayMs, heroSuggestedDwellMs, resolveHeroTier } from './hero'

export const LIVING_MODES = {
  STUDENT: 'student',
  LECTURER: 'lecturer',
  REVISION: 'revision',
}

export const REVEAL_BEATS = ['establish', 'focus', 'narrative', 'climax', 'settle']

const VISITS_KEY = 'apx:living:visits:v1'
const MODE_KEY = 'apx:living:mode:v1'

function readJson(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* best-effort */
  }
}

export function loadLivingMode() {
  const mode = readJson(MODE_KEY, LIVING_MODES.STUDENT)
  return Object.values(LIVING_MODES).includes(mode) ? mode : LIVING_MODES.STUDENT
}

export function saveLivingMode(mode) {
  if (!Object.values(LIVING_MODES).includes(mode)) return
  writeJson(MODE_KEY, mode)
}

export function slideVisitKey(subjectId, moduleId, slideId) {
  return `${subjectId}::${moduleId}::${slideId}`
}

export function hasVisitedSlide(subjectId, moduleId, slideId) {
  const visits = readJson(VISITS_KEY, {})
  return Boolean(visits[slideVisitKey(subjectId, moduleId, slideId)])
}

export function markSlideVisited(subjectId, moduleId, slideId) {
  if (!subjectId || !moduleId || !slideId) return
  const visits = readJson(VISITS_KEY, {})
  const key = slideVisitKey(subjectId, moduleId, slideId)
  const now = Date.now()
  const existing = visits[key]
  visits[key] = {
    count: (existing?.count || 0) + 1,
    firstAt: existing?.firstAt || now,
    lastAt: now,
  }
  writeJson(VISITS_KEY, visits)
  return visits[key]
}

export function getVisitCount(subjectId, moduleId, slideId) {
  const visits = readJson(VISITS_KEY, {})
  return visits[slideVisitKey(subjectId, moduleId, slideId)]?.count || 0
}

/** Focus delay by scene character — intelligent pauses. */
export function focusDelayMs({
  hero = false,
  quiet = false,
  finale = false,
  revision = false,
  heroTier = null,
} = {}) {
  const tier = resolveHeroTier({ finale, hero, heroTier })
  return heroFocusDelayMs(tier, { quiet, revision })
}

/** Suggested teaching dwell (ms) for analytics / auto-advance hints. */
export function suggestedDwellMs({
  hero = false,
  quiet = false,
  finale = false,
  longForm = false,
  heroTier = null,
} = {}) {
  const tier = resolveHeroTier({ finale, hero, heroTier })
  return heroSuggestedDwellMs(tier, { quiet, longForm })
}

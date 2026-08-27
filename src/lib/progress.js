/**
 * Lightweight learning-progress store for the Learning Universe.
 *
 * Persists to localStorage so "Continue Learning" survives across sessions,
 * complementing App.jsx's existing per-tab sessionStorage slide memory.
 *
 * Shape (v1):
 *   {
 *     last: { subjectId, moduleId, slideIndex, updatedAt },
 *     modules: { "subjectId::moduleId": { furthest, total, updatedAt } }
 *   }
 *
 * Everything is defensive: storage can be disabled/full, so all access is
 * wrapped and failures degrade to "no progress yet".
 */

const KEY = 'apx:progress:v1'

function read() {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return { last: null, modules: {} }
    const parsed = JSON.parse(raw)
    return { last: parsed.last || null, modules: parsed.modules || {} }
  } catch {
    return { last: null, modules: {} }
  }
}

function write(state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable — progress is best-effort */
  }
}

const moduleKey = (subjectId, moduleId) => `${subjectId}::${moduleId}`

/** Record that the learner is on a given slide of a module. */
export function recordProgress(subjectId, moduleId, slideIndex, total) {
  if (!subjectId || !moduleId) return
  const state = read()
  const now = Date.now()
  state.last = { subjectId, moduleId, slideIndex, updatedAt: now }
  const key = moduleKey(subjectId, moduleId)
  const existing = state.modules[key] || { furthest: 0, total: total || 0 }
  state.modules[key] = {
    furthest: Math.max(existing.furthest || 0, slideIndex || 0),
    total: total || existing.total || 0,
    updatedAt: now,
  }
  write(state)
}

/** The most recently visited { subjectId, moduleId, slideIndex } or null. */
export function getLastVisited() {
  return read().last
}

/** Per-module progress { furthest, total } or null. */
export function getModuleProgress(subjectId, moduleId) {
  const state = read()
  return state.modules[moduleKey(subjectId, moduleId)] || null
}

/** Completion percent (0–100) for a subject, weighted across its modules. */
export function getSubjectProgress(subject) {
  const state = read()
  let seen = 0
  let total = 0
  for (const module of subject.modules) {
    const moduleTotal = module.slides?.length || 0
    total += moduleTotal
    const record = state.modules[moduleKey(subject.id, module.id)]
    if (record) {
      // furthest slide reached counts as (furthest + 1) lessons seen
      seen += Math.min(moduleTotal, (record.furthest || 0) + 1)
    }
  }
  if (!total) return 0
  return Math.round((seen / total) * 100)
}

/** True once a module's furthest slide reaches its final slide. */
export function isModuleComplete(subjectId, moduleId, total) {
  const record = getModuleProgress(subjectId, moduleId)
  if (!record || !total) return false
  return (record.furthest || 0) >= total - 1
}

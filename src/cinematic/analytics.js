/**
 * Learning Analytics Engine — evidence for future course improvement.
 * Local-only, privacy-preserving aggregates. No network.
 */

const KEY = 'apx:analytics:v1'

function read() {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return { slides: {}, sessions: [], modules: {} }
    const parsed = JSON.parse(raw)
    return {
      slides: parsed.slides || {},
      sessions: Array.isArray(parsed.sessions) ? parsed.sessions.slice(-40) : [],
      modules: parsed.modules || {},
    }
  } catch {
    return { slides: {}, sessions: [], modules: {} }
  }
}

function write(state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* best-effort */
  }
}

const slideKey = (subjectId, moduleId, slideId) => `${subjectId}::${moduleId}::${slideId}`
const moduleKey = (subjectId, moduleId) => `${subjectId}::${moduleId}`

function bumpSlide(state, subjectId, moduleId, slideId, patch) {
  const key = slideKey(subjectId, moduleId, slideId)
  const current = state.slides[key] || {
    views: 0,
    revisits: 0,
    replays: 0,
    dwellMs: 0,
    dwellSamples: 0,
    skips: 0,
    pauses: 0,
    lastAt: 0,
  }
  state.slides[key] = { ...current, ...patch, lastAt: Date.now() }
}

export function trackSlideEnter(subjectId, moduleId, slideId, { revisit = false } = {}) {
  if (!subjectId || !moduleId || !slideId) return
  const state = read()
  const key = slideKey(subjectId, moduleId, slideId)
  const current = state.slides[key]
  bumpSlide(state, subjectId, moduleId, slideId, {
    views: (current?.views || 0) + 1,
    revisits: (current?.revisits || 0) + (revisit ? 1 : 0),
  })
  const mk = moduleKey(subjectId, moduleId)
  const mod = state.modules[mk] || { enters: 0, totalDwellMs: 0, completedAt: null }
  state.modules[mk] = { ...mod, enters: (mod.enters || 0) + 1 }
  write(state)
}

export function trackSlideDwell(subjectId, moduleId, slideId, dwellMs) {
  if (!subjectId || !moduleId || !slideId || !(dwellMs > 0)) return
  const state = read()
  const key = slideKey(subjectId, moduleId, slideId)
  const current = state.slides[key] || { views: 0, revisits: 0, replays: 0, dwellMs: 0, dwellSamples: 0, skips: 0, pauses: 0 }
  const samples = (current.dwellSamples || 0) + 1
  bumpSlide(state, subjectId, moduleId, slideId, {
    dwellMs: (current.dwellMs || 0) + dwellMs,
    dwellSamples: samples,
  })
  const mk = moduleKey(subjectId, moduleId)
  const mod = state.modules[mk] || { enters: 0, totalDwellMs: 0, completedAt: null }
  state.modules[mk] = { ...mod, totalDwellMs: (mod.totalDwellMs || 0) + dwellMs }
  write(state)
}

export function trackReplay(subjectId, moduleId, slideId) {
  if (!subjectId || !moduleId || !slideId) return
  const state = read()
  const key = slideKey(subjectId, moduleId, slideId)
  const current = state.slides[key]
  bumpSlide(state, subjectId, moduleId, slideId, { replays: (current?.replays || 0) + 1 })
  write(state)
}

export function trackSkip(subjectId, moduleId, slideId) {
  if (!subjectId || !moduleId || !slideId) return
  const state = read()
  const key = slideKey(subjectId, moduleId, slideId)
  const current = state.slides[key]
  bumpSlide(state, subjectId, moduleId, slideId, { skips: (current?.skips || 0) + 1 })
  write(state)
}

export function trackPause(subjectId, moduleId, slideId) {
  if (!subjectId || !moduleId || !slideId) return
  const state = read()
  const key = slideKey(subjectId, moduleId, slideId)
  const current = state.slides[key]
  bumpSlide(state, subjectId, moduleId, slideId, { pauses: (current?.pauses || 0) + 1 })
  write(state)
}

export function trackModuleComplete(subjectId, moduleId) {
  if (!subjectId || !moduleId) return
  const state = read()
  const mk = moduleKey(subjectId, moduleId)
  const mod = state.modules[mk] || { enters: 0, totalDwellMs: 0, completedAt: null }
  state.modules[mk] = { ...mod, completedAt: Date.now() }
  state.sessions.push({ subjectId, moduleId, completedAt: Date.now() })
  write(state)
}

/** Top revisited / long-dwell slides for a subject (evidence-driven summary). */
export function getInsights(subjectId, limit = 8) {
  const state = read()
  const rows = Object.entries(state.slides)
    .filter(([key]) => key.startsWith(`${subjectId}::`))
    .map(([key, value]) => {
      const [, moduleId, ...rest] = key.split('::')
      const avgDwell = value.dwellSamples ? value.dwellMs / value.dwellSamples : 0
      return {
        key,
        moduleId,
        slideId: rest.join('::'),
        views: value.views || 0,
        revisits: value.revisits || 0,
        replays: value.replays || 0,
        avgDwellMs: Math.round(avgDwell),
        skips: value.skips || 0,
        pauses: value.pauses || 0,
      }
    })

  const mostRevisited = [...rows].sort((a, b) => b.revisits - a.revisits || b.views - a.views).slice(0, limit)
  const longestPauses = [...rows].sort((a, b) => b.avgDwellMs - a.avgDwellMs).slice(0, limit)
  const mostReplayed = [...rows].sort((a, b) => b.replays - a.replays).slice(0, limit)
  const mostSkipped = [...rows].sort((a, b) => b.skips - a.skips).slice(0, limit)

  const moduleRows = Object.entries(state.modules)
    .filter(([key]) => key.startsWith(`${subjectId}::`))
    .map(([key, value]) => {
      const moduleId = key.split('::')[1]
      return {
        moduleId,
        enters: value.enters || 0,
        totalDwellMs: value.totalDwellMs || 0,
        completedAt: value.completedAt || null,
        avgDwellPerEnter: value.enters ? Math.round((value.totalDwellMs || 0) / value.enters) : 0,
      }
    })
    .sort((a, b) => b.avgDwellPerEnter - a.avgDwellPerEnter)

  return {
    mostRevisited,
    longestPauses,
    mostReplayed,
    mostSkipped,
    longestChapters: moduleRows.slice(0, limit),
    moduleStats: state.modules,
  }
}

/**
 * Turn analytics into actionable content recommendations (V7).
 * These are guidance for authors — not automated mutations.
 */
export function getRecommendations(subjectId, { limit = 6 } = {}) {
  const insights = getInsights(subjectId, Math.max(limit, 8))
  const recommendations = []

  for (const row of insights.mostRevisited.slice(0, limit)) {
    if (row.revisits < 2) continue
    recommendations.push({
      type: 'high-revisit',
      severity: row.revisits >= 4 ? 'high' : 'medium',
      moduleId: row.moduleId,
      slideId: row.slideId,
      evidence: `${row.revisits} revisits · ${row.views} views`,
      recommendation: 'Students return here often — clarify the concept, add a memory anchor, or split dense content.',
    })
  }

  for (const row of insights.longestPauses.slice(0, limit)) {
    if (row.avgDwellMs < 14000) continue
    recommendations.push({
      type: 'long-dwell',
      severity: row.avgDwellMs >= 22000 ? 'high' : 'medium',
      moduleId: row.moduleId,
      slideId: row.slideId,
      evidence: `avg dwell ${Math.round(row.avgDwellMs / 1000)}s`,
      recommendation: 'Long pauses suggest cognitive load — add a diagram cue, reduce line density, or insert a quiet beat before this slide.',
    })
  }

  for (const row of insights.mostSkipped.slice(0, limit)) {
    if (row.skips < 2 || row.views < 2) continue
    const skipRate = row.skips / Math.max(1, row.views)
    if (skipRate < 0.35) continue
    recommendations.push({
      type: 'commonly-skipped',
      severity: skipRate >= 0.6 ? 'high' : 'medium',
      moduleId: row.moduleId,
      slideId: row.slideId,
      evidence: `${row.skips} skips / ${row.views} views`,
      recommendation: 'Often skipped — check if the scene is redundant, too long, or needs a clearer teaching hook.',
    })
  }

  for (const row of insights.mostReplayed.slice(0, Math.min(3, limit))) {
    if (row.replays < 2) continue
    recommendations.push({
      type: 'strong-engagement',
      severity: 'info',
      moduleId: row.moduleId,
      slideId: row.slideId,
      evidence: `${row.replays} replays`,
      recommendation: 'Strong replay engagement — protect this as a hero/moment candidate and consider echoing it as a callback later.',
    })
  }

  for (const chapter of insights.longestChapters.slice(0, 3)) {
    if (chapter.avgDwellPerEnter < 180000) continue // ~3 min avg session chunk
    recommendations.push({
      type: 'long-chapter',
      severity: 'medium',
      moduleId: chapter.moduleId,
      slideId: null,
      evidence: `avg ${Math.round(chapter.avgDwellPerEnter / 60000)} min per enter`,
      recommendation: 'Chapter runs long — add quiet rests, tighten middle clusters, or split an overloaded sequence.',
    })
  }

  // Deduplicate by type+slide
  const seen = new Set()
  const unique = []
  for (const item of recommendations) {
    const key = `${item.type}::${item.moduleId}::${item.slideId || ''}`
    if (seen.has(key)) continue
    seen.add(key)
    unique.push(item)
  }

  return {
    subjectId,
    generatedAt: Date.now(),
    count: unique.length,
    recommendations: unique.slice(0, limit * 2),
    insights,
  }
}

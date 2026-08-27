/**
 * Visual Memory Engine — motifs students have already met.
 * Chapter summaries reuse these instead of introducing new graphics.
 */

const KEY = 'apx:living:memory:v1'

function read() {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return { subjects: {} }
    const parsed = JSON.parse(raw)
    return { subjects: parsed.subjects || {} }
  } catch {
    return { subjects: {} }
  }
}

function write(state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* best-effort */
  }
}

const moduleKey = (subjectId, moduleId) => `${subjectId}::${moduleId}`

/** Record that a visual identity appeared on this module path. */
export function rememberMotif(subjectId, moduleId, identity, meta = {}) {
  if (!subjectId || !moduleId || !identity) return
  const state = read()
  const sub = state.subjects[subjectId] || { motifs: {}, chapters: {} }
  const motif = sub.motifs[identity] || { count: 0, firstModule: moduleId, label: meta.label || identity }
  motif.count += 1
  motif.lastModule = moduleId
  motif.label = meta.label || motif.label
  motif.symbol = meta.symbol || motif.symbol || identity
  sub.motifs[identity] = motif

  const chKey = moduleKey(subjectId, moduleId)
  const chapter = sub.chapters[chKey] || { identities: [] }
  if (!chapter.identities.includes(identity)) chapter.identities.push(identity)
  sub.chapters[chKey] = chapter

  state.subjects[subjectId] = sub
  write(state)
}

/** Top motifs for a chapter — used to build memory-map summaries. */
export function getChapterMotifs(subjectId, moduleId, limit = 5) {
  const state = read()
  const sub = state.subjects[subjectId]
  if (!sub) return []
  const chapter = sub.chapters[moduleKey(subjectId, moduleId)]
  const ids = chapter?.identities || []
  return ids
    .map((id) => ({ identity: id, ...(sub.motifs[id] || { count: 1, label: id }) }))
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, limit)
}

/** Course-wide top motifs. */
export function getSubjectMotifs(subjectId, limit = 8) {
  const state = read()
  const sub = state.subjects[subjectId]
  if (!sub?.motifs) return []
  return Object.entries(sub.motifs)
    .map(([identity, meta]) => ({ identity, ...meta }))
    .sort((a, b) => (b.count || 0) - (a.count || 0))
    .slice(0, limit)
}

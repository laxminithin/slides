// Shared First Year source-depth label policy.
// Internal PPTX mapping strings may live in metadata / QA only — never in student-facing slides.

export const INTERNAL_BLOCK_LABEL_RE = /(?:final\s+pptx\s+teaching\s+block|pptx\s+teaching\s+block|pptx\s+teaching\s+depth|pptx\s+depth\s+block|source\s+teaching\s+block|finalized\s+pptx\s+slides|pptx\s+slides\s+\d|source\s+slides?\s+\d|teaching\s+block\s+\d+(?:\s*[-–]\s*\d+)?|source\s+block\s+\d+|pptx\s+block|depth\s+block|final\s+block(?:\s+\d)?|final\s+source\s+section|teaching\s+source\s+section|pptx\s+source\s+content|source\s+teaching\s+section)/i

export const SEMANTIC_PLACEHOLDER_RE = /(?:final\s+source\s+section|teaching\s+source\s+section|pptx\s+source\s+content|source\s+depth\s+(?:block|slide|section)|grouped\s+teaching\s+scene|placeholder\s+teaching|topic\s+pending|content\s+block\s+\d+|teaching\s+block\s+\d+)/i

export const SOURCE_RANGE_LABEL_RE = /(?:pptx\s+slides?\s+\d+(?:\s*[-–]\s*\d+)?|source\s+slides?\s+\d+(?:\s*[-–]\s*\d+)?|slides?\s+\d+\s*[-–]\s*\d+\s+of\s+\d+|block\s+\d+\s*[-–]\s*\d+)/i

export const INTERNAL_ACTION_RE = /^(?:ADD |EXPAND(?: EQUATION)?$|CIRCUIT VISUAL|WAVEFORM|STRUCTURAL DIAGRAM|MECHANISM|PROCESS|SCENARIO|TIMELINE|LANGUAGE|PROJECT STAGE)/

export const KIND_LABELS = {
  code: 'Code execution',
  algorithm: 'Algorithm',
  memory: 'Memory',
  circuit: 'Circuit',
  waveform: 'Waveform',
  mechanism: 'Mechanism',
  process: 'Process',
  derivation: 'Derivation',
  example: 'Worked example',
  visual: 'Visual',
  application: 'Application',
  scenario: 'Scenario',
  timeline: 'Timeline',
  language: 'Language',
  project: 'Project stage',
  lab: 'Experiment',
  explanation: 'Concept',
  source: 'Concept',
  math: 'Mathematics',
  science: 'Science',
}

function clean(text) {
  return String(text || '').replace(/\s+/g, ' ').replace(/[•●]/g, '').trim()
}

export function isInternalTeachingLabel(text) {
  const value = clean(text)
  if (!value) return false
  if (INTERNAL_BLOCK_LABEL_RE.test(value)) return true
  if (SEMANTIC_PLACEHOLDER_RE.test(value)) return true
  if (/^source teaching block\s+\d+$/i.test(value)) return true
  if (/^final pptx teaching block\s+\d+(?:\s*[-–]\s*\d+)?$/i.test(value)) return true
  if (/^pptx slides\s+\d+(?:\s*[-–]\s*\d+)?$/i.test(value)) return true
  return false
}

export function scanTextForPlaceholderLeak(text) {
  const value = String(text || '')
  if (!value.trim()) return null
  if (INTERNAL_BLOCK_LABEL_RE.test(value)) return 'internal-block-label'
  if (SEMANTIC_PLACEHOLDER_RE.test(value)) return 'semantic-placeholder'
  if (SOURCE_RANGE_LABEL_RE.test(value) && /pptx|source\s+slide|teaching\s+block/i.test(value)) return 'source-range-label'
  return null
}

export function parseSourceRange(range) {
  const text = String(range || '')
  const match = text.match(/(\d+)\s*[-–]\s*(\d+)/)
  if (match) {
    const start = Number(match[1])
    const end = Number(match[2])
    const slides = []
    for (let n = start; n <= end; n += 1) slides.push(n)
    return slides
  }
  const single = text.match(/(\d+)/)
  return single ? [Number(single[1])] : []
}

export function clipTeachingTitle(text, max = 88) {
  const value = clean(text)
    .replace(/\(\s*\d+\s*hours?\s+of\s+pedagogy\s*\)(?:\s*\d+)?/gi, '')
    .replace(/\(\s*\d+\s*hours?\s+theory(?:\s*\+\s*\d+\s*hours?\s+tutorials?)?\s*\)/gi, '')
    .replace(/\.{2,}$/, '')
    .replace(/[,:;]+$/, '')
    .replace(/\s+of\s+\d+\s+source slides$/i, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
  if (!value) return ''
  if (/hours?\s+of\s+pedagogy/i.test(value) && value.replace(/hours?[^a-z\u0C80-\u0CFF]+/gi, '').trim().length < 12) return ''
  if (value.length <= max) return value
  const cut = value.slice(0, max)
  const at = Math.max(cut.lastIndexOf(':'), cut.lastIndexOf(','), cut.lastIndexOf(' —'), cut.lastIndexOf(' - '))
  if (at >= 36) return cut.slice(0, at).trim()
  const space = cut.lastIndexOf(' ')
  return (space > 24 ? cut.slice(0, space) : cut).trim()
}

export function kindLabel(kind, action) {
  if (KIND_LABELS[kind]) return KIND_LABELS[kind]
  if (INTERNAL_ACTION_RE.test(String(action || ''))) return KIND_LABELS.explanation
  const cleaned = clean(action)
  if (!cleaned || isInternalTeachingLabel(cleaned) || INTERNAL_ACTION_RE.test(cleaned)) return KIND_LABELS.explanation
  return cleaned
}

export function studentFacingTitle(block) {
  const title = clean(block?.title)
  if (title && !isInternalTeachingLabel(title) && !INTERNAL_ACTION_RE.test(title)) return clipTeachingTitle(title)
  for (const point of block?.points || []) {
    const line = clean(point)
    if (line.length < 12 || isInternalTeachingLabel(line)) continue
    return clipTeachingTitle(line)
  }
  return ''
}

export function studentFacingSubtitle(block) {
  const title = studentFacingTitle(block)
  const kind = kindLabel(block?.kind, block?.action)
  const explanation = clean(block?.explanation)
  if (explanation.length >= 18 && !isInternalTeachingLabel(explanation) && explanation.toLowerCase() !== title.toLowerCase()) {
    return clipTeachingTitle(explanation, 140)
  }
  for (const point of block?.points || []) {
    const line = clean(point)
    if (line.length < 18 || isInternalTeachingLabel(line)) continue
    if (clipTeachingTitle(line) === title) continue
    if (line.toLowerCase() === title.toLowerCase()) continue
    return clipTeachingTitle(line, 120)
  }
  return kind
}

export function studentFacingTakeaway(block) {
  const title = studentFacingTitle(block)
  const kind = kindLabel(block?.kind, block?.action)
  const specific = (block?.points || []).map(clean).find((line) => (
    line.length >= 28 && !isInternalTeachingLabel(line) && line !== title
  ))
  if (specific) return specific
  const explanation = clean(block?.explanation)
  if (explanation.length >= 28 && !isInternalTeachingLabel(explanation)) return explanation
  if (title) return `${kind}: ${title}`
  return kind
}

export function sourceSlideMetadata(block, sourceDepth) {
  return {
    sourcePptxSlides: parseSourceRange(block?.range),
    sourceBlockId: block?.sourceBlockId || block?.range || '',
    sourcePptx: sourceDepth?.sourcePptx || null,
    textbookSections: sourceDepth?.textbookSections || null,
  }
}

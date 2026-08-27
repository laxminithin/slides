/**
 * Presentation Typography Engine (V3.3)
 * -----------------------------------------------------------------------------
 * Platform typography system for lecture slides. Today it owns adaptive slide
 * titles (semantic wrapping, editorial measure, fit scaling, header geometry
 * signals). Evolving surface — kickers, subtitles, card headings, table
 * headings, diagram labels, legends, and footer text should migrate here so
 * every subject shares one typography contract alongside the Legibility and
 * Composition engines.
 *
 * Title quality gates (enforced by auditors):
 *   - No clipping / ellipsis / overflow
 *   - Font >= TITLE_MIN_PX (projector / last-bench readable)
 *   - Title lines <= TITLE_MAX_LINES
 *   - Header <= HEADER_MAX_SHARE of slide height
 *   - Body  >= BODY_MIN_SHARE of slide height
 *   - Semantic wraps preferred over arbitrary HTML wrapping
 */

export const TITLE_MIN_PX = 34
export const TITLE_MAX_LINES = 3
export const TITLE_FIT_STEP = 0.03
export const HEADER_MAX_SHARE = 0.22
export const BODY_MIN_SHARE = 0.78

/** Editorial title measure by slide kind (percentage of header copy width). */
export const TITLE_MEASURE_BY_KIND = {
  hero: 70,
  teaching: 62,
  standard: 62,
  compare: 55,
  timeline: 75,
}

const AFTER_BREAKS = [
  { priority: 1, re: /:\s+/g, keep: true },
  { priority: 2, re: /\s+[—–]\s+/g, keep: false },
  { priority: 2, re: /\s+-\s+/g, keep: false },
]

const BEFORE_WORDS = [
  { priority: 3, word: 'using' },
  { priority: 4, word: 'through' },
  { priority: 5, word: 'with' },
  { priority: 6, word: 'for' },
  { priority: 7, word: 'by' },
]

/**
 * Map slide composition / layout metadata → typography kind.
 * @param {{ composition?: string, layout?: string, section?: string, compare?: unknown, flow?: unknown, hideTitle?: boolean }} slide
 */
export function resolveTitleKind(slide = {}) {
  const raw = String(slide.composition || slide.layout || '').toLowerCase()
  const section = String(slide.section || '').toLowerCase()

  if (/hero|title-slide|opening|title_scene|title-scene/.test(raw) || /opening/.test(section)) {
    return 'hero'
  }
  if (/compare|versus|\bvs\b|table|two-col|split/.test(raw) || slide.compare) {
    return 'compare'
  }
  if (/timeline|flow|process|journey|pipeline|path|sequence/.test(raw) || slide.flow) {
    return 'timeline'
  }
  if (/teach|standard|definition|cards|quiet|dashboard|visual|exploded|reverse|architecture|memory/.test(raw)) {
    return 'teaching'
  }
  if (slide.layout === 'hero') return 'hero'
  if (slide.layout === 'compare' || slide.layout === 'table') return 'compare'
  if (slide.layout === 'flow' || slide.layout === 'timeline') return 'timeline'
  return 'teaching'
}

export function titleMeasureForKind(kind) {
  return TITLE_MEASURE_BY_KIND[kind] ?? TITLE_MEASURE_BY_KIND.teaching
}

function normalizeTitle(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

/**
 * Detect an editorial lead phrase: consecutive title-case / acronym tokens at
 * the start of the title (e.g. "Big Data Analytics" before "converts…").
 * Priority sits between dash (2) and "using" (3).
 */
function leadPhraseBreak(source) {
  const words = source.split(' ')
  if (words.length < 4) return null
  let count = 0
  for (let i = 0; i < Math.min(words.length - 2, 5); i += 1) {
    const w = words[i]
    const titleLike = /^[A-Z0-9][\w'’\-]*$/.test(w) && /[A-Z]/.test(w[0])
    const shortAllCaps = /^[A-Z0-9]{2,}$/.test(w)
    if (titleLike || shortAllCaps) {
      count = i + 1
      continue
    }
    break
  }
  if (count < 2 || count > 5) return null
  const lead = words.slice(0, count).join(' ')
  if (lead.length < 8 || lead.length > 42) return null
  // Next token should start the clause (usually lowercase verb / connector)
  const next = words[count]
  if (!next || /^[A-Z]/.test(next)) return null
  return { index: lead.length + 1, priority: 2.5, reason: 'lead-phrase' }
}

/**
 * Collect candidate break offsets (index = start of the *next* line).
 * Lower priority number = stronger semantic signal.
 */
export function findSemanticBreakCandidates(text) {
  const source = normalizeTitle(text)
  const candidates = []
  const seen = new Set()

  const push = (index, priority, reason) => {
    if (index <= 0 || index >= source.length) return
    // Never break mid-word
    if (source[index] !== ' ' && source[index - 1] !== ' ' && !/[—–:\-]/.test(source[index - 1])) {
      // allow if we snapped to a space
      const snapped = source.lastIndexOf(' ', index)
      if (snapped <= 0) return
      index = snapped + 1
    }
    while (index < source.length && source[index] === ' ') index += 1
    if (index <= 0 || index >= source.length) return
    const key = `${index}:${priority}`
    if (seen.has(key)) return
    seen.add(key)
    candidates.push({ index, priority, reason })
  }

  for (const rule of AFTER_BREAKS) {
    rule.re.lastIndex = 0
    let match
    while ((match = rule.re.exec(source)) !== null) {
      push(match.index + match[0].length, rule.priority, rule.keep ? 'after-colon' : 'after-dash')
    }
  }

  const lead = leadPhraseBreak(source)
  if (lead) candidates.push(lead)

  for (const rule of BEFORE_WORDS) {
    const re = new RegExp(`\\b${rule.word}\\b`, 'gi')
    let match
    while ((match = re.exec(source)) !== null) {
      // Prefer breaking before the connector, but only when it is not the first word
      if (match.index === 0) continue
      push(match.index, rule.priority, `before:${rule.word}`)
    }
  }

  // Word boundaries as lowest-priority fallbacks (priority 8)
  for (let i = 0; i < source.length; i += 1) {
    if (source[i] === ' ') push(i + 1, 8, 'word')
  }

  return candidates.sort((a, b) => a.priority - b.priority || a.index - b.index)
}

function idealBreakScore(index, length, priority) {
  const ratio = index / length
  // Prefer breaks in the middle third; penalize edge extremes
  const balance = 1 - Math.abs(ratio - 0.5) * 2
  const priorityWeight = (9 - priority) / 8
  return priorityWeight * 2 + balance
}

function pickBreak(candidates, length, { minRatio = 0.22, maxRatio = 0.78 } = {}) {
  const inWindow = candidates.filter((c) => {
    const r = c.index / length
    return r >= minRatio && r <= maxRatio
  })
  const pool = inWindow.length ? inWindow : candidates
  let best = null
  let bestScore = -Infinity
  for (const c of pool) {
    const score = idealBreakScore(c.index, length, c.priority)
    if (score > bestScore) {
      bestScore = score
      best = c
    }
  }
  return best
}

/**
 * Plan 1–3 lines preferring semantic boundaries.
 * Without a semantic signal, returns a single line — the fit loop decides
 * whether balanced word-wrapping is needed after measuring the live box.
 * Pass targetLines > 1 to force a balanced fallback of that depth.
 */
export function planTitleLines(text, { maxLines = TITLE_MAX_LINES, targetLines } = {}) {
  const source = normalizeTitle(text)
  if (!source) return []
  if (maxLines <= 1 || targetLines === 1) return [source]

  const candidates = findSemanticBreakCandidates(source)

  // Prefer a single strong semantic / lead-phrase break → 2 lines
  const primary = pickBreak(
    candidates.filter((c) => c.priority <= 7.5),
    source.length,
  )

  if (!primary) {
    // No semantic connectors — only word-balance when the fit engine asks
    // for more than one line after a live overflow measurement.
    if (targetLines && targetLines > 1) return balancedWordLines(source, Math.min(targetLines, maxLines))
    return [source]
  }

  const left = source.slice(0, primary.index).trim()
  const right = source.slice(primary.index).trim()
  const want = targetLines || (right.length < 42 ? 2 : Math.min(3, maxLines))

  if (want <= 2 || maxLines === 2 || right.length < 42) {
    return [left, right].filter(Boolean)
  }

  // Try a second semantic break on the remainder for a 3-line title
  const secondCandidates = findSemanticBreakCandidates(right).filter((c) => c.priority <= 7.5)
  const second = pickBreak(secondCandidates, right.length, { minRatio: 0.28, maxRatio: 0.72 })
  if (second && maxLines >= 3) {
    return [
      left,
      right.slice(0, second.index).trim(),
      right.slice(second.index).trim(),
    ].filter(Boolean)
  }

  // If the right side is still long and we allow 3 lines, word-balance it
  if (maxLines >= 3 && right.length > 52) {
    const [a, b] = balancedWordLines(right, 2)
    return [left, a, b].filter(Boolean)
  }

  return [left, right].filter(Boolean)
}

function balancedWordLines(text, maxLines) {
  const words = normalizeTitle(text).split(' ')
  if (words.length <= 1 || maxLines <= 1) return [normalizeTitle(text)]

  if (maxLines === 2) {
    const total = words.reduce((n, w) => n + w.length, 0) + (words.length - 1)
    let best = 1
    let bestScore = Infinity
    for (let i = 1; i < words.length; i += 1) {
      const left = words.slice(0, i).join(' ').length
      const right = total - left - 1
      const score = Math.abs(left - right)
      if (score < bestScore) {
        bestScore = score
        best = i
      }
    }
    return [words.slice(0, best).join(' '), words.slice(best).join(' ')]
  }

  // 3-way: aim for equal thirds
  const target = Math.ceil(words.length / 3)
  const a = words.slice(0, target)
  const b = words.slice(target, target * 2)
  const c = words.slice(target * 2)
  return [a.join(' '), b.join(' '), c.join(' ')].filter(Boolean)
}

function lineCountFromBox(el) {
  const cs = getComputedStyle(el)
  const lineH = parseFloat(cs.lineHeight)
  if (!Number.isFinite(lineH) || lineH <= 0) return 1
  return Math.max(1, Math.round(el.scrollHeight / lineH))
}

function measuredFontPx(el) {
  return parseFloat(getComputedStyle(el).fontSize) || 0
}

/**
 * Fit a title element: semantic line plan → measure → scale within projector floor.
 * Sets:
 *   - textContent with \\n breaks (requires white-space: pre-line)
 *   - --title-fit
 *   - data-lines
 * Returns measurement summary for auditors / callers.
 */
export function fitSlideTitle(el, text, {
  maxLines = TITLE_MAX_LINES,
  minPx = TITLE_MIN_PX,
} = {}) {
  if (!el) return null

  const source = normalizeTitle(text)
  if (!source) {
    el.textContent = ''
    el.style.setProperty('--title-fit', '1')
    el.dataset.lines = '1'
    return { lines: 0, fit: 1, fontPx: 0, planned: [] }
  }

  const applyPlan = (lines) => {
    el.textContent = lines.join('\n')
  }

  // Start from a semantic plan (or a single line) at full scale.
  el.style.setProperty('--title-fit', '1')
  let planned = planTitleLines(source, { maxLines })
  applyPlan(planned)
  el.dataset.lines = String(Math.min(maxLines, Math.max(1, planned.length)))

  const naturalPx = measuredFontPx(el)
  const floor = naturalPx > 0 ? Math.min(1, Number((minPx / naturalPx).toFixed(3))) : 0.72

  // Title elements have no max-height — "overflow" means too many soft-wrapped
  // lines or horizontal clip, not scrollHeight > clientHeight.
  const overflows = () => {
    const lines = lineCountFromBox(el)
    const clippedX = el.scrollWidth - el.clientWidth > 1
    return lines > maxLines || clippedX
  }

  // Soft-wrap past the engineered plan → deepen breaks one line at a time
  // (never jump straight to a 3-way split from a soft-wrap count).
  let deepenGuard = 0
  while (
    (lineCountFromBox(el) > planned.length || el.scrollWidth - el.clientWidth > 1)
    && planned.length < maxLines
    && deepenGuard < 4
  ) {
    const target = planned.length + 1
    planned = planTitleLines(source, { maxLines, targetLines: target })
    applyPlan(planned)
    el.dataset.lines = String(Math.min(maxLines, Math.max(1, planned.length)))
    deepenGuard += 1
  }

  // Last resort before scaling: force balanced word lines at max depth
  if (overflows()) {
    planned = balancedWordLines(source, maxLines)
    applyPlan(planned)
    el.dataset.lines = String(Math.min(maxLines, Math.max(1, planned.length)))
  }

  let fit = 1
  let guard = 0
  while (overflows() && fit > floor + 0.0001 && guard < 28) {
    fit = Math.max(floor, Number((fit - TITLE_FIT_STEP).toFixed(3)))
    el.style.setProperty('--title-fit', String(fit))
    guard += 1
  }

  // Final line count after fit
  const lines = Math.min(maxLines, Math.max(1, lineCountFromBox(el)))
  el.dataset.lines = String(lines)

  // Stamp intended line plan count for CSS header geometry (may differ from
  // measured if font metrics round oddly — prefer measured).
  const usedSemantic = planned.length > 1 && planned.join(' ') === source
    && findSemanticBreakCandidates(source).some((c) => c.priority <= 7.5
      && planned.some((line, i) => {
        if (i === 0) return false
        const idx = source.indexOf(line)
        return idx === c.index || Math.abs(idx - c.index) <= 1
      }))

  return {
    lines,
    fit,
    fontPx: measuredFontPx(el),
    planned,
    floor,
    semantic: usedSemantic,
  }
}

/**
 * Apply frame-level typography signals used by CSS + auditors.
 * @param {HTMLElement | null} frame  .slide-frame
 * @param {{ kind: string, lines: number }} opts
 */
export function applyFrameTypography(frame, { kind, lines } = {}) {
  if (!frame) return
  if (kind) {
    frame.dataset.titleKind = kind
  }
  if (lines != null) {
    frame.dataset.titleLines = String(Math.max(1, Math.min(TITLE_MAX_LINES, lines)))
  }
}

/**
 * Runtime / CI typography quality checks for the shell title + chrome ratio.
 * Returns finding objects (kind is an uppercase gate code when failing a
 * typography gate; legacy kinds title-clip / title-lines remain for overflow).
 */
export function auditPresentationTypography(root) {
  if (!root) return []
  const findings = []
  const frame = root.classList?.contains('slide-frame') ? root : root.querySelector?.('.slide-frame')
  const titleEl = root.querySelector?.('.slide-title') || (root.classList?.contains('slide-title') ? root : null)
  const header = root.querySelector?.('.slide-header')
  const body = root.querySelector?.('.slide-body')
  const frameEl = frame || root

  if (titleEl) {
    const cs = getComputedStyle(titleEl)
    const sw = titleEl.scrollWidth
    const cw = titleEl.clientWidth
    const sh = titleEl.scrollHeight
    const ch = titleEl.clientHeight
    const lineH = parseFloat(cs.lineHeight) || 1
    const lines = Math.max(1, Math.round(sh / lineH))
    const fontPx = parseFloat(cs.fontSize) || 0
    const ellipsis = cs.textOverflow === 'ellipsis'
      && cs.overflow !== 'visible'
      && cs.overflowX !== 'visible'

    if (sw - cw > 1 || sh - ch > 1 || ellipsis) {
      findings.push({
        kind: 'title-clip',
        code: 'TITLE_CLIPPED',
        selector: '.slide-title',
        overflowX: Math.max(0, sw - cw),
        overflowY: Math.max(0, sh - ch),
        lines,
        ellipsis,
      })
    }

    if (fontPx > 0 && fontPx < TITLE_MIN_PX - 0.5) {
      findings.push({
        kind: 'TITLE_TOO_SMALL',
        code: 'TITLE_TOO_SMALL',
        selector: '.slide-title',
        fontPx: Math.round(fontPx * 10) / 10,
        minimum: TITLE_MIN_PX,
        lines,
      })
    }

    if (lines > TITLE_MAX_LINES) {
      findings.push({
        kind: 'TITLE_TOO_MANY_LINES',
        code: 'TITLE_TOO_MANY_LINES',
        selector: '.slide-title',
        lines,
        maximum: TITLE_MAX_LINES,
      })
    } else if (lines > 2 && !findings.some((f) => f.kind === 'title-clip')) {
      // Soft authoring note — fully visible 3-line titles are allowed but logged
      findings.push({
        kind: 'title-lines',
        code: 'TITLE_THREE_LINES',
        selector: '.slide-title',
        lines,
        soft: true,
      })
    }

    // Semantic wrapping signal: engineered breaks use \\n / pre-line.
    // If the engine stamped data-semantic="0" treat as soft advisory.
    if (titleEl.dataset.semantic === '0' && lines > 1) {
      findings.push({
        kind: 'TITLE_WRAP_ARBITRARY',
        code: 'TITLE_WRAP_ARBITRARY',
        selector: '.slide-title',
        soft: true,
        lines,
      })
    }
  }

  if (header && frameEl) {
    const frameH = frameEl.getBoundingClientRect().height || 1
    const headerH = header.getBoundingClientRect().height
    const share = headerH / frameH
    if (share > HEADER_MAX_SHARE + 0.005) {
      findings.push({
        kind: 'HEADER_TOO_TALL',
        code: 'HEADER_TOO_TALL',
        selector: '.slide-header',
        headerPx: Math.round(headerH),
        framePx: Math.round(frameH),
        share: Math.round(share * 1000) / 10,
        maximum: HEADER_MAX_SHARE * 100,
      })
    }
  }

  if (body && frameEl) {
    const frameH = frameEl.getBoundingClientRect().height || 1
    const footer = root.querySelector?.('.slide-footer')
    const footerH = footer?.getBoundingClientRect().height || 0
    // Body ownership is measured against the teaching stage (frame minus footer
    // chrome). Footer is reserved chrome; it must not make healthy layouts fail.
    const usable = Math.max(1, frameH - footerH)
    const bodyH = body.getBoundingClientRect().height
    const share = bodyH / usable
    if (share < BODY_MIN_SHARE - 0.005) {
      findings.push({
        kind: 'BODY_TOO_SMALL',
        code: 'BODY_TOO_SMALL',
        selector: '.slide-body',
        bodyPx: Math.round(bodyH),
        framePx: Math.round(frameH),
        usablePx: Math.round(usable),
        share: Math.round(share * 1000) / 10,
        minimum: BODY_MIN_SHARE * 100,
      })
    }
  }

  return findings
}

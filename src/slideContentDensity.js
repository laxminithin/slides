/**
 * Presentation Platform V3.2 — Global Sparse-Slide Intelligence Engine
 * -----------------------------------------------------------------------------
 * Runtime content-density classifier. Measures rendered academic content and
 * writes data-content-density (+ supporting signals) onto .slide-frame so CSS
 * can enlarge / optically center sparse teaching composition.
 *
 * Categories: sparse | light | normal | dense | very-dense
 *
 * Conservatism rules:
 *  - Never shrink below the V3.0 projector baseline (dense/very-dense → scale 1)
 *  - Major living visuals / diagrams suppress aggressive upscale
 *  - Hero / intentional compositions are left alone
 *  - Complex bespoke layouts: classify + flag only via audit; CSS stays mild
 */

export const CONTENT_DENSITY = Object.freeze({
  SPARSE: 'sparse',
  LIGHT: 'light',
  NORMAL: 'normal',
  DENSE: 'dense',
  VERY_DENSE: 'very-dense',
})

/** Body typography scale tokens consumed by slideSparseV32.css */
export const BODY_SCALE_BY_DENSITY = Object.freeze({
  sparse: 1.28,
  light: 1.14,
  normal: 1,
  dense: 1,
  'very-dense': 1,
})

const DECORATIVE_SELECTOR =
  '[data-slide-decorative="true"],[data-overflow-allow="true"],.laser-dot,.annotation-layer,.slide-overflow-overlay'

const CARD_SELECTOR =
  'article,.card,[class*="card"],[class*="Card"],.definition-block,.takeaway,.key-statement,.bda-takeaway,.ib-takeaway,.callout,.visual-panel'

const MAJOR_VISUAL_SELECTOR = [
  'svg',
  'canvas',
  'img',
  '[data-living-visual]',
  '.hv-svg',
  '.tv-svg',
  '.gv-svg',
  '.pv-svg',
  '.ins-viz',
  '.toc-visual',
  '.bda-visual',
  '.layout-visual',
  '.process-path',
  '.cn-osi-lab',
  '.cn-switching-lab',
  '.automata',
  '.dbms-cinema',
  '[class*="timeline"]',
  '[class*="architecture"]',
].join(',')

const HERO_COMPOSITION_RE = /hero|title-slide|title_scene|title-scene|opening|finale/
const COMPLEX_LAYOUT_RE =
  /dashboard|exploded|architecture|memory|cinema|lab|board|matrix|accordion|journey|pipeline|mapreduce|warehouse|flow-row/

/**
 * Collect structural + geometric signals for a slide body.
 * @param {HTMLElement} body
 */
export function measureContentDensitySignals(body) {
  if (!body) return null
  const stage = body.getBoundingClientRect()
  const stageH = stage.height
  const stageW = stage.width
  if (stageH < 10 || stageW < 10) return { error: 'tiny-stage' }

  const isDeco = (el) =>
    !el ||
    el.closest?.(DECORATIVE_SELECTOR) ||
    el.classList?.contains('laser-dot') ||
    el.classList?.contains('annotation-layer')

  let textChars = 0
  let paragraphCount = 0
  let bulletCount = 0
  let headingCount = 0
  let cardCount = 0
  let visualCount = 0
  let majorVisualArea = 0
  const ink = []

  body.querySelectorAll('*').forEach((el) => {
    if (isDeco(el)) return
    const cs = getComputedStyle(el)
    if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < 0.06) return

    const tag = el.tagName.toLowerCase()
    if (tag === 'p') paragraphCount += 1
    if (tag === 'li') bulletCount += 1
    if (/^h[1-6]$/.test(tag)) headingCount += 1

    let ownText = ''
    el.childNodes.forEach((n) => {
      if (n.nodeType === 3) ownText += n.textContent || ''
    })
    const trimmed = ownText.trim()
    if (trimmed) textChars += trimmed.length

    const r = el.getBoundingClientRect()
    if (r.width < 4 || r.height < 4) return

    const isVisual =
      tag === 'svg' ||
      tag === 'img' ||
      tag === 'canvas' ||
      el.matches?.(MAJOR_VISUAL_SELECTOR)

    if (isVisual) {
      visualCount += 1
      const area = Math.max(0, Math.min(r.right, stage.right) - Math.max(r.left, stage.left))
        * Math.max(0, Math.min(r.bottom, stage.bottom) - Math.max(r.top, stage.top))
      if (area > stageH * stageW * 0.08) majorVisualArea += area
    }

    let hasInk = Boolean(trimmed) || isVisual
    if (!hasInk) return
    if (r.width * r.height < 180 && !isVisual) return

    const l = Math.max(r.left, stage.left)
    const t = Math.max(r.top, stage.top)
    const ri = Math.min(r.right, stage.right)
    const b = Math.min(r.bottom, stage.bottom)
    if (ri > l && b > t) ink.push({ l, t, r: ri, b, a: (ri - l) * (b - t) })
  })

  body.querySelectorAll(CARD_SELECTOR).forEach((el) => {
    if (isDeco(el)) return
    const cs = getComputedStyle(el)
    if (cs.display === 'none') return
    const r = el.getBoundingClientRect()
    if (r.width * r.height < stageH * stageW * 0.035) return
    cardCount += 1
  })

  let emptyCards = 0
  body.querySelectorAll(CARD_SELECTOR).forEach((el) => {
    if (isDeco(el)) return
    const cs = getComputedStyle(el)
    if (cs.display === 'none') return
    const r = el.getBoundingClientRect()
    if (r.width * r.height < stageH * stageW * 0.07) return
    let iT = 1e9
    let iB = -1e9
    let found = false
    el.querySelectorAll('*').forEach((ch) => {
      const ccs = getComputedStyle(ch)
      if (ccs.display === 'none' || +ccs.opacity < 0.06) return
      const cr = ch.getBoundingClientRect()
      if (cr.width < 4 || cr.height < 4) return
      let t = ''
      ch.childNodes.forEach((n) => {
        if (n.nodeType === 3) t += n.textContent || ''
      })
      const tg = ch.tagName.toLowerCase()
      if (t.trim() || tg === 'svg' || tg === 'img' || tg === 'canvas') {
        found = true
        iT = Math.min(iT, cr.top)
        iB = Math.max(iB, cr.bottom)
      }
    })
    const ratio = found ? (iB - iT) / r.height : 0
    if (ratio < 0.42) emptyCards += 1
  })

  let occupancy = 0
  let fillV = 0
  let cogY = 0.5
  let topGap = 0
  let bottomGap = 0
  let lowerFill = 0
  let contentHeight = 0

  if (ink.length) {
    let uT = 1e9
    let uB = -1e9
    let aSum = 0
    let wY = 0
    ink.forEach((x) => {
      uT = Math.min(uT, x.t)
      uB = Math.max(uB, x.b)
      aSum += x.a
      wY += ((x.t + x.b) / 2) * x.a
    })
    cogY = (wY / aSum - stage.top) / stageH
    fillV = (uB - uT) / stageH
    contentHeight = uB - uT
    topGap = (uT - stage.top) / stageH
    bottomGap = (stage.bottom - uB) / stageH

    const cols = 24
    const rows = 14
    const cell = new Uint8Array(cols * rows)
    ink.forEach((x) => {
      const c0 = Math.floor(((x.l - stage.left) / stageW) * cols)
      const c1 = Math.ceil(((x.r - stage.left) / stageW) * cols)
      const r0 = Math.floor(((x.t - stage.top) / stageH) * rows)
      const r1 = Math.ceil(((x.b - stage.top) / stageH) * rows)
      for (let r = Math.max(0, r0); r < Math.min(rows, r1); r += 1) {
        for (let c = Math.max(0, c0); c < Math.min(cols, c1); c += 1) {
          cell[r * cols + c] = 1
        }
      }
    })
    let occ = 0
    for (let i = 0; i < cell.length; i += 1) occ += cell[i]
    occupancy = occ / cell.length
    let lo = 0
    let loT = 0
    for (let r = Math.floor(rows / 2); r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        loT += 1
        if (cell[r * cols + c]) lo += 1
      }
    }
    lowerFill = lo / loT
  }

  const visualOccupancy = Math.min(1, majorVisualArea / (stageH * stageW || 1))
  const majorVisual = visualOccupancy >= 0.22 || (visualCount >= 1 && visualOccupancy >= 0.14 && textChars < 220)

  return {
    textChars,
    paragraphCount,
    bulletCount,
    headingCount,
    cardCount,
    visualCount,
    emptyCards,
    occupancy: +occupancy.toFixed(3),
    fillV: +fillV.toFixed(3),
    cogY: +cogY.toFixed(3),
    topGap: +topGap.toFixed(3),
    bottomGap: +bottomGap.toFixed(3),
    lowerFill: +lowerFill.toFixed(3),
    contentHeight: Math.round(contentHeight),
    bodyHeight: Math.round(stageH),
    whitespaceRatio: +(1 - occupancy).toFixed(3),
    visualOccupancy: +visualOccupancy.toFixed(3),
    majorVisual,
  }
}

/**
 * Infer sparse template kind for CSS auto-fix.
 * @param {HTMLElement} body
 * @param {ReturnType<typeof measureContentDensitySignals>} signals
 */
export function inferSparseKind(body, signals) {
  if (!body || !signals) return 'mixed'
  const hasDef = Boolean(body.querySelector('.definition-block, .bda-definition'))
  const hasTakeaway = Boolean(body.querySelector('.takeaway, .bda-takeaway, .ib-takeaway, .key-statement'))
  const hasBullets = signals.bulletCount > 0
  const hasStat = Boolean(
    body.querySelector(
      '.slide-role-metric, [class*="metric"], [class*="stat"], [class*="speedup"], [data-stat], .ib-exec-metrics',
    ),
  )
  const hasNumberAnchor = /\b\d+(\.\d+)?\s*[×x%]\b|\b\d+(\.\d+)?×/.test(body.textContent || '')

  if (signals.majorVisual) return 'visual'
  if (hasStat || (hasNumberAnchor && signals.textChars < 180)) return 'stat'
  if (hasDef && signals.bulletCount <= 1 && signals.textChars < 320) return 'definition'
  if (hasTakeaway && signals.bulletCount <= 2 && signals.cardCount <= 2 && signals.textChars < 280) {
    return 'takeaway'
  }
  if (hasBullets && signals.bulletCount <= 4 && signals.cardCount <= 2 && signals.textChars < 420) {
    return 'bullets'
  }
  if (signals.cardCount >= 1 && signals.cardCount <= 3 && signals.textChars < 360) return 'card'
  return 'mixed'
}

/**
 * Classify density from multi-signal measurement. Conservative on dense / visual.
 * @param {ReturnType<typeof measureContentDensitySignals>} signals
 * @param {{ composition?: string, titleKind?: string, heroTier?: string, locked?: boolean }} meta
 */
export function classifyContentDensity(signals, meta = {}) {
  if (!signals || signals.error) return CONTENT_DENSITY.NORMAL

  const composition = String(meta.composition || '').toLowerCase()
  const titleKind = String(meta.titleKind || '').toLowerCase()
  const heroTier = String(meta.heroTier || 'none').toLowerCase()

  if (meta.locked) return CONTENT_DENSITY.NORMAL
  if (titleKind === 'hero' || HERO_COMPOSITION_RE.test(composition)) return CONTENT_DENSITY.NORMAL
  if (heroTier && heroTier !== 'none') return CONTENT_DENSITY.NORMAL

  const {
    textChars,
    paragraphCount,
    bulletCount,
    cardCount,
    occupancy,
    fillV,
    majorVisual,
    emptyCards,
  } = signals

  // Structural lightness
  const structurallySparse =
    textChars <= 160 &&
    bulletCount <= 2 &&
    paragraphCount <= 2 &&
    cardCount <= 2 &&
    !majorVisual

  const structurallyLight =
    textChars <= 320 &&
    bulletCount <= 4 &&
    paragraphCount <= 4 &&
    cardCount <= 4

  const structurallyDense =
    textChars >= 900 ||
    bulletCount >= 10 ||
    paragraphCount >= 8 ||
    cardCount >= 8 ||
    (occupancy >= 0.78 && fillV >= 0.82)

  const structurallyVeryDense =
    textChars >= 1400 ||
    bulletCount >= 14 ||
    occupancy >= 0.88 ||
    fillV >= 0.92

  // Occupancy bands (from prompt)
  let band = CONTENT_DENSITY.NORMAL
  if (occupancy < 0.32 || fillV < 0.35) band = CONTENT_DENSITY.SPARSE
  else if (occupancy < 0.48 || fillV < 0.5) band = CONTENT_DENSITY.LIGHT
  else if (occupancy < 0.75 && fillV < 0.75) band = CONTENT_DENSITY.NORMAL
  else if (occupancy < 0.9 && fillV < 0.9) band = CONTENT_DENSITY.DENSE
  else band = CONTENT_DENSITY.VERY_DENSE

  // Fuse structural + geometric. Require agreement for sparse upscale.
  let density = band
  if (structurallyVeryDense || band === CONTENT_DENSITY.VERY_DENSE) {
    density = CONTENT_DENSITY.VERY_DENSE
  } else if (structurallyDense || band === CONTENT_DENSITY.DENSE) {
    density = CONTENT_DENSITY.DENSE
  } else if (band === CONTENT_DENSITY.SPARSE && structurallySparse) {
    density = CONTENT_DENSITY.SPARSE
  } else if (band === CONTENT_DENSITY.SPARSE && structurallyLight && emptyCards > 0) {
    // Sparse geometry + empty large cards → still treat as sparse for card fix
    density = CONTENT_DENSITY.SPARSE
  } else if (band === CONTENT_DENSITY.SPARSE) {
    // Occupancy alone says sparse but structure is richer → demote to light
    density = structurallyLight ? CONTENT_DENSITY.LIGHT : CONTENT_DENSITY.NORMAL
  } else if (band === CONTENT_DENSITY.LIGHT && structurallyLight) {
    density = CONTENT_DENSITY.LIGHT
  } else if (band === CONTENT_DENSITY.LIGHT && !structurallyLight) {
    density = CONTENT_DENSITY.NORMAL
  }

  // Visual-aware: a big SVG / living diagram is NOT sparse teaching copy.
  if (majorVisual) {
    if (density === CONTENT_DENSITY.SPARSE) density = CONTENT_DENSITY.LIGHT
    if (density === CONTENT_DENSITY.LIGHT && (textChars > 260 || bulletCount > 4)) {
      density = CONTENT_DENSITY.NORMAL
    }
  }

  // Complex custom layouts: never force sparse auto-composition (flag-only path)
  if (COMPLEX_LAYOUT_RE.test(composition) && density === CONTENT_DENSITY.SPARSE) {
    density = CONTENT_DENSITY.LIGHT
  }

  return density
}

/**
 * Audit findings for sparse composition defects.
 * @param {ReturnType<typeof measureContentDensitySignals>} signals
 * @param {string} density
 */
export function sparseAuditFindings(signals, density) {
  if (!signals || signals.error) return []
  const findings = []
  const isSparseBand = density === CONTENT_DENSITY.SPARSE || density === CONTENT_DENSITY.LIGHT

  if (isSparseBand && signals.occupancy < 0.35 && signals.cogY < 0.3) {
    findings.push('SPARSE_TOP_HEAVY')
  }
  if (
    density === CONTENT_DENSITY.SPARSE &&
    signals.occupancy < 0.3 &&
    signals.bottomGap > 0.4 &&
    signals.cogY < 0.38
  ) {
    findings.push('SPARSE_CENTER_UNUSED')
  }
  if (signals.emptyCards > 0 && isSparseBand) {
    findings.push('SPARSE_CARD_EMPTY')
  }
  // Text-too-small / number-too-small are confirmed by CSS post-fix audits
  // using measured font metrics when available on the frame dataset.
  return findings
}

function readLock(frame) {
  if (!frame) return false
  if (frame.getAttribute('data-sparse-lock') === 'true') return true
  if (frame.getAttribute('data-content-density-lock') === 'true') return true
  return false
}

/**
 * Apply density classification to a slide frame.
 * Temporarily clears scale so measurement is not biased by a prior sparse pass.
 *
 * @param {HTMLElement | null} frame
 * @param {{ composition?: string, titleKind?: string, heroTier?: string, forced?: string }} [options]
 */
export function applyContentDensity(frame, options = {}) {
  if (!frame || typeof document === 'undefined') return null
  const body = frame.querySelector('.slide-body')
  if (!body) return null

  if (options.forced) {
    const density = options.forced
    writeDensity(frame, density, null, {
      majorVisual: false,
      sparseKind: 'mixed',
      findings: [],
    })
    return { density, signals: null }
  }

  const locked = readLock(frame)
  // Neutralize previous scale for unbiased measurement
  const prevDensity = frame.getAttribute('data-content-density')
  const prevVisual = frame.getAttribute('data-density-visual')
  const prevKind = frame.getAttribute('data-sparse-kind')
  const prevScale = frame.style.getPropertyValue('--body-scale')

  frame.removeAttribute('data-content-density')
  frame.removeAttribute('data-density-visual')
  frame.removeAttribute('data-sparse-kind')
  frame.style.setProperty('--body-scale', '1')

  // Force layout flush before measuring
  void frame.offsetHeight

  const signals = measureContentDensitySignals(body)
  const density = classifyContentDensity(signals, {
    composition: options.composition || frame.getAttribute('data-composition') || '',
    titleKind: options.titleKind || frame.getAttribute('data-title-kind') || '',
    heroTier: options.heroTier || frame.getAttribute('data-hero-tier') || 'none',
    locked,
  })

  const sparseKind = inferSparseKind(body, signals)
  const findings = sparseAuditFindings(signals, density)

  writeDensity(frame, density, signals, {
    majorVisual: Boolean(signals?.majorVisual),
    sparseKind,
    findings,
  })

  // Restore measurement cleanup is unnecessary — writeDensity sets final attrs.
  // Keep prev values only if measurement failed.
  if (signals?.error) {
    if (prevDensity) frame.setAttribute('data-content-density', prevDensity)
    else frame.removeAttribute('data-content-density')
    if (prevVisual) frame.setAttribute('data-density-visual', prevVisual)
    if (prevKind) frame.setAttribute('data-sparse-kind', prevKind)
    if (prevScale) frame.style.setProperty('--body-scale', prevScale)
    else frame.style.removeProperty('--body-scale')
  }

  return { density, signals, sparseKind, findings }
}

function writeDensity(frame, density, signals, extra) {
  const scale = BODY_SCALE_BY_DENSITY[density] ?? 1
  frame.setAttribute('data-content-density', density)
  frame.style.setProperty('--body-scale', String(scale))

  if (extra.majorVisual) frame.setAttribute('data-density-visual', 'major')
  else frame.removeAttribute('data-density-visual')

  if (density === CONTENT_DENSITY.SPARSE || density === CONTENT_DENSITY.LIGHT) {
    frame.setAttribute('data-sparse-kind', extra.sparseKind || 'mixed')
  } else {
    frame.removeAttribute('data-sparse-kind')
  }

  if (signals) {
    frame.dataset.densityOccupancy = String(signals.occupancy)
    frame.dataset.densityFill = String(signals.fillV)
    frame.dataset.densityCog = String(signals.cogY)
  }

  if (extra.findings?.length) {
    frame.dataset.sparseFindings = extra.findings.join(',')
  } else {
    delete frame.dataset.sparseFindings
  }
}

/**
 * React-friendly helper: classify after paint / resize.
 * @param {HTMLElement | null} frame
 * @param {object} [options]
 */
export function scheduleContentDensity(frame, options = {}) {
  if (!frame) return () => {}
  let raf = 0
  let timer = 0
  const run = () => {
    cancelAnimationFrame(raf)
    clearTimeout(timer)
    raf = requestAnimationFrame(() => {
      // Allow subject CSS / living visuals a brief settle
      timer = window.setTimeout(() => applyContentDensity(frame, options), 32)
    })
  }
  run()
  return () => {
    cancelAnimationFrame(raf)
    clearTimeout(timer)
  }
}

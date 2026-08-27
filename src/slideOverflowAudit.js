/**
 * Development-only global slide overflow + typography auditor.
 * Checks scroll overflow, content escaping the slide safe stage, and
 * Presentation Typography Engine quality gates (title clip/size/lines,
 * header/body share). Silent in production builds. Optional red overlay:
 *   localStorage.setItem('slideOverflowDebug', '1')
 */

import { auditPresentationTypography } from './presentationTypography'

const STAGE_SELECTORS = [
  '.slide-body',
]

const CONTENT_HINT_SELECTORS = [
  '[data-slide-content]',
  '.ib-chapter',
  '.ib-title-scene',
  '.ib-story-panel',
  '.ib-boardroom-stage',
  '.ib-card-grid',
  '.ib-matrix',
  '.ib-finance',
  '.bda-canvas',
  '.bda-title-slide',
  '.bda-card-row',
  '.bda-warehouse',
  '.ins-teaching-frame',
  '.toc-board',
  '.pc-m3-body',
  '.pc-m4-body',
  '.pc-m5-body',
  '.dbms-cinema',
  '.dbms-board',
  '.layout-two',
  '.layout-compare',
  '.title-hero',
  '.process-path',
  '.m5-accordion',
]

const CLIP_SELECTORS = 'h1, h2, h3, p, strong, li, table, pre, code, .takeaway, .ib-takeaway, .bda-takeaway, [data-slide-content]'

const OVERLAY_CLASS = 'slide-overflow-overlay'
const EPSILON = 2

function isDebugOverlayEnabled() {
  try {
    return window.localStorage.getItem('slideOverflowDebug') === '1'
  } catch {
    return false
  }
}

function labelFor(el) {
  if (el.dataset?.slideContent !== undefined) return '[data-slide-content]'
  const cls = el.className?.toString?.().trim()
  if (cls) return `.${cls.split(/\s+/).slice(0, 3).join('.')}`
  return el.tagName.toLowerCase()
}

function measureScrollOverflow(el) {
  const overflowX = el.scrollWidth - el.clientWidth
  const overflowY = el.scrollHeight - el.clientHeight
  if (overflowX <= EPSILON && overflowY <= EPSILON) return null
  return {
    kind: 'scroll',
    selector: labelFor(el),
    overflowX: Math.max(0, overflowX),
    overflowY: Math.max(0, overflowY),
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth,
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
  }
}

function isDecorative(el) {
  if (!el) return true
  if (el.dataset?.slideDecorative === 'true') return true
  if (el.dataset?.overflowAllow === 'true') return true
  if (el.classList?.contains('laser-dot')) return true
  if (el.classList?.contains('annotation-layer')) return true
  if (el.classList?.contains(OVERLAY_CLASS)) return true
  if (el.classList?.contains('slide-visual-clip')) return true
  return false
}

function isVisible(el) {
  const style = getComputedStyle(el)
  if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false
  const r = el.getBoundingClientRect()
  return r.width > 1 && r.height > 1
}

function measureBoundsOverflow(el, safeRect) {
  if (isDecorative(el) || !isVisible(el)) return null
  const r = el.getBoundingClientRect()
  const topDelta = safeRect.top - r.top
  const leftDelta = safeRect.left - r.left
  const rightDelta = r.right - safeRect.right
  const bottomDelta = r.bottom - safeRect.bottom
  if (
    topDelta <= EPSILON
    && leftDelta <= EPSILON
    && rightDelta <= EPSILON
    && bottomDelta <= EPSILON
  ) {
    return null
  }
  return {
    kind: 'bounds',
    selector: labelFor(el),
    top: Math.max(0, Math.round(topDelta)),
    left: Math.max(0, Math.round(leftDelta)),
    right: Math.max(0, Math.round(rightDelta)),
    bottom: Math.max(0, Math.round(bottomDelta)),
  }
}

function clearOverlay(frame) {
  frame.querySelectorAll(`.${OVERLAY_CLASS}`).forEach((node) => node.remove())
}

function paintOverlay(frame, findings) {
  clearOverlay(frame)
  if (!findings.length || !isDebugOverlayEnabled()) return

  const overlay = document.createElement('div')
  overlay.className = OVERLAY_CLASS
  overlay.setAttribute('data-slide-decorative', 'true')

  const frameRect = frame.getBoundingClientRect()
  findings.forEach((hit) => {
    if (!hit.rect) return
    const box = document.createElement('div')
    box.className = 'so-box'
    box.style.left = `${hit.rect.left - frameRect.left}px`
    box.style.top = `${hit.rect.top - frameRect.top}px`
    box.style.width = `${hit.rect.width}px`
    box.style.height = `${hit.rect.height}px`

    const label = document.createElement('div')
    label.className = 'so-label'
    const amount = hit.overflowY || hit.bottom || hit.overflowX || hit.right || 0
    const dir = hit.overflowY || hit.bottom ? '↓' : hit.overflowX || hit.right ? '→' : '!'
    label.textContent = `${dir}${amount}px ${hit.selector}`
    box.appendChild(label)
    overlay.appendChild(box)
  })

  frame.appendChild(overlay)
}

/**
 * @param {object} opts
 * @param {string} [opts.subjectId]
 * @param {string} [opts.moduleLabel]
 * @param {string} [opts.slideId]
 * @param {string} [opts.slideTitle]
 * @param {Element} opts.root  .slide-frame element
 * @returns {object[]}
 */
export function auditSlideOverflow({
  subjectId,
  moduleLabel,
  slideId,
  slideTitle,
  root,
} = {}) {
  if (!import.meta.env.DEV || !root) return []

  const findings = []
  const seen = new Set()

  const push = (hit, el) => {
    if (!hit) return
    const key = `${hit.kind}:${hit.selector}:${hit.overflowY || 0}:${hit.bottom || 0}:${hit.overflowX || 0}`
    if (seen.has(key)) return
    seen.add(key)
    if (el) {
      const r = el.getBoundingClientRect()
      hit.rect = { left: r.left, top: r.top, width: r.width, height: r.height }
    }
    findings.push(hit)
  }

  // scroll overflow false positives from animating transforms are common;
  // still report significant ones. Bounds are higher signal.
  const SCROLL_FAIL = 8

  for (const selector of STAGE_SELECTORS) {
    root.querySelectorAll(selector).forEach((el) => {
      const hit = measureScrollOverflow(el)
      if (!hit) return
      if ((hit.overflowX || 0) < SCROLL_FAIL && (hit.overflowY || 0) < SCROLL_FAIL) return
      push(hit, el)
    })
  }

  for (const selector of CONTENT_HINT_SELECTORS) {
    root.querySelectorAll(selector).forEach((el) => {
      push(measureScrollOverflow(el), el)
    })
  }

  const body = root.querySelector('.slide-body')
  if (body) {
    const safeRect = body.getBoundingClientRect()
    body.querySelectorAll(CLIP_SELECTORS).forEach((node) => {
      // Skip nested text nodes inside decorative blobs
      if (node.closest('[data-slide-decorative="true"], [data-overflow-allow="true"]')) return
      push(measureBoundsOverflow(node, safeRect), node)
    })
  }

  // Presentation Typography Engine quality gates (V3.3):
  // clip / ellipsis / TITLE_TOO_SMALL / TITLE_TOO_MANY_LINES /
  // HEADER_TOO_TALL / BODY_TOO_SMALL / soft title-lines notes.
  for (const hit of auditPresentationTypography(root)) {
    if (hit.soft) {
      findings.push(hit)
      continue
    }
    const el = hit.selector ? root.querySelector(hit.selector) : null
    push(hit, el)
  }

  paintOverlay(root, findings)

  if (findings.length) {
    const vp = `${window.innerWidth}x${window.innerHeight}`
    // eslint-disable-next-line no-console
    console.groupCollapsed(
      `[SLIDE OVERFLOW] Subject: ${subjectId || '?'} · ${moduleLabel || 'Module'} · ${slideId || 'slide'} · ${slideTitle || ''} · ${vp}`.trim(),
    )
    findings.forEach((f) => {
      if (f.kind === 'scroll') {
        // eslint-disable-next-line no-console
        console.warn(
          `${f.selector}\n  scrollHeight: ${f.scrollHeight} / clientHeight: ${f.clientHeight} (+${f.overflowY}px)\n  scrollWidth: ${f.scrollWidth} / clientWidth: ${f.clientWidth} (+${f.overflowX}px)`,
        )
      } else if (f.kind === 'title-clip') {
        // eslint-disable-next-line no-console
        console.warn(
          `.slide-title CLIPPED → lines:${f.lines} overflowX:${f.overflowX} overflowY:${f.overflowY}${f.ellipsis ? ' ellipsis' : ''}`,
        )
      } else if (f.kind === 'TITLE_TOO_SMALL') {
        // eslint-disable-next-line no-console
        console.warn(
          `TITLE_TOO_SMALL → ${f.fontPx}px < ${f.minimum}px projector floor (lines:${f.lines})`,
        )
      } else if (f.kind === 'HEADER_TOO_TALL') {
        // eslint-disable-next-line no-console
        console.warn(
          `HEADER_TOO_TALL → ${f.share}% of slide (>${f.maximum}%) · ${f.headerPx}px / ${f.framePx}px`,
        )
      } else if (f.kind === 'BODY_TOO_SMALL') {
        // eslint-disable-next-line no-console
        console.warn(
          `BODY_TOO_SMALL → ${f.share}% of slide (<${f.minimum}%) · ${f.bodyPx}px / ${f.framePx}px`,
        )
      } else if (f.kind === 'TITLE_TOO_MANY_LINES') {
        // eslint-disable-next-line no-console
        console.warn(
          `TITLE_TOO_MANY_LINES → ${f.lines} lines (max ${f.maximum})`,
        )
      } else if (f.soft) {
        // eslint-disable-next-line no-console
        console.info(`[typography soft] ${f.code || f.kind}`, f)
      } else {
        // eslint-disable-next-line no-console
        console.warn(
          `${f.selector}\n  outside stage → top:${f.top} left:${f.left} right:${f.right} bottom:${f.bottom}`,
        )
      }
    })
    // eslint-disable-next-line no-console
    console.groupEnd()
  } else {
    clearOverlay(root)
  }

  return findings
}

/** Back-compat alias used by older IB call sites */
export function auditIbSlideOverflow(opts) {
  return auditSlideOverflow({
    subjectId: 'international-business',
    ...opts,
  })
}

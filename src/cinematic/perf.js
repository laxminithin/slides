/**
 * Presentation Engine V6 — Performance Monitor
 *
 * Measures animation smoothness on modest classroom hardware:
 * FPS, dropped frames, animation duration, layout/paint proxies,
 * memory (when available), active animations, transition time.
 */

const PERF_KEY = 'apx:engine:perf:v1'

function now() {
  return typeof performance !== 'undefined' ? performance.now() : Date.now()
}

export function createPerfMonitor({ sampleMs = 1000 } = {}) {
  let raf = 0
  let running = false
  let frames = 0
  let lastSample = now()
  let lastFrame = now()
  let fps = 60
  let dropped = 0
  let transitionStart = 0
  let lastTransitionMs = 0
  let slideEnterAt = 0
  const samples = []

  function tick(ts) {
    if (!running) return
    frames += 1
    const delta = ts - lastFrame
    lastFrame = ts
    // Treat >22ms frame (~45fps) as a soft drop on classroom projectors
    if (delta > 22) dropped += 1

    if (ts - lastSample >= sampleMs) {
      fps = Math.round((frames * 1000) / (ts - lastSample))
      frames = 0
      lastSample = ts
      samples.push({ t: Date.now(), fps, dropped })
      if (samples.length > 120) samples.shift()
    }
    raf = requestAnimationFrame(tick)
  }

  return {
    start() {
      if (running) return
      running = true
      frames = 0
      dropped = 0
      lastSample = now()
      lastFrame = now()
      raf = requestAnimationFrame(tick)
    },
    stop() {
      running = false
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    },
    markSlideEnter() {
      slideEnterAt = now()
    },
    markTransitionStart() {
      transitionStart = now()
    },
    markTransitionEnd() {
      if (transitionStart) {
        lastTransitionMs = Math.round(now() - transitionStart)
        transitionStart = 0
      }
    },
    snapshot(root) {
      const animCount = countActiveAnimations(root)
      const memory = readMemory()
      const elapsedOnSlide = slideEnterAt ? Math.round(now() - slideEnterAt) : 0
      return {
        fps,
        droppedFrames: dropped,
        activeAnimations: animCount,
        transitionMs: lastTransitionMs,
        slideElapsedMs: elapsedOnSlide,
        memoryMB: memory,
        longTasks: readLongTaskCount(),
        samples: samples.slice(-20),
        reducedMotion: prefersReducedMotion(),
      }
    },
  }
}

export function countActiveAnimations(root = typeof document !== 'undefined' ? document : null) {
  if (!root || typeof root.getAnimations !== 'function') {
    // Fallback: count CSS animation-name ≠ none under living scenes
    try {
      const nodes = (root || document).querySelectorAll('.ib-scene *, .film-continuity *, .living-engine *')
      let count = 0
      nodes.forEach((node) => {
        const style = window.getComputedStyle(node)
        if (style.animationName && style.animationName !== 'none') count += 1
      })
      return count
    } catch {
      return 0
    }
  }
  try {
    return root.getAnimations({ subtree: true }).filter((a) => a.playState === 'running').length
  } catch {
    return 0
  }
}

function readMemory() {
  try {
    const mem = performance.memory
    if (!mem) return null
    return Math.round((mem.usedJSHeapSize / (1024 * 1024)) * 10) / 10
  } catch {
    return null
  }
}

function readLongTaskCount() {
  try {
    const entries = performance.getEntriesByType?.('longtask') || []
    return entries.length
  } catch {
    return 0
  }
}

export function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/** Rough layout thrash proxy — PerformanceObserver when available. */
export function observeLayoutShifts(callback) {
  if (typeof PerformanceObserver === 'undefined') return () => {}
  try {
    const observer = new PerformanceObserver((list) => {
      let shift = 0
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) shift += entry.value || 0
      }
      if (shift > 0) callback?.(shift)
    })
    observer.observe({ type: 'layout-shift', buffered: true })
    return () => observer.disconnect()
  } catch {
    return () => {}
  }
}

export function persistPerfSample(sample) {
  try {
    const prev = JSON.parse(window.localStorage.getItem(PERF_KEY) || '[]')
    const next = [...prev, { ...sample, at: Date.now() }].slice(-40)
    window.localStorage.setItem(PERF_KEY, JSON.stringify(next))
  } catch {
    /* best-effort */
  }
}

import { useEffect, useMemo, useState } from 'react'
import { getInsights, getRecommendations } from './analytics'
import { HERO_TIER_META } from './hero'
import { describeMotion, motionRoleForScene } from './motion'
import { createPerfMonitor, observeLayoutShifts, prefersReducedMotion } from './perf'
import { useLivingEngine } from './PresentationEngine'
import { auditAnimationSequence, scenesFromSlides } from './qa'
import { formatTimeline, sceneBeatSchedule } from './timeline'
import { ENGINE_VERSION } from './stable'

function debugEnabled() {
  if (typeof window === 'undefined') return false
  if (import.meta.env.DEV) {
    const params = new URLSearchParams(window.location.hash.split('?')[1] || window.location.search)
    if (params.get('debug') === '0') return false
    if (params.get('debug') === '1') return true
    try {
      if (window.localStorage.getItem('apx:engine:debug') === '0') return false
      if (window.localStorage.getItem('apx:engine:debug') === '1') return true
    } catch {
      /* ignore */
    }
    return true
  }
  try {
    return window.localStorage.getItem('apx:engine:debug') === '1'
  } catch {
    return false
  }
}

/**
 * Engine Debug Panel — presentation inspector (dev / ?debug=1).
 * Shows scene, beat, motion, camera, focus, memory, callback, adaptive, a11y, analytics, timeline, perf, QA.
 */
export function DebugPanel({
  visible: visibleProp,
  subjectId,
  moduleId,
  slide,
  slideIndex = 0,
  slides = [],
  film = {},
}) {
  const living = useLivingEngine()
  const [open, setOpen] = useState(true)
  const [tab, setTab] = useState('inspect')
  const [perf, setPerf] = useState(null)
  const [layoutShift, setLayoutShift] = useState(0)
  const enabled = visibleProp ?? debugEnabled()

  const schedule = useMemo(
    () => sceneBeatSchedule(film.lineCount || 4, film.pace || (film.quiet ? 'minimal' : 'medium')),
    [film.lineCount, film.pace, film.quiet],
  )
  const timeline = useMemo(() => formatTimeline(schedule), [schedule])

  const motionMode = motionRoleForScene({
    finale: Boolean(film.finale),
    hero: Boolean(film.hero || film.heroTier && film.heroTier !== 'none'),
    quiet: Boolean(film.quiet),
    callback: Boolean(film.callback),
  })
  const motionMeta = describeMotion(motionMode)
  const tierMeta = HERO_TIER_META[film.heroTier || (film.finale ? '1' : film.hero ? '2' : 'none')]

  const qa = useMemo(() => auditAnimationSequence(scenesFromSlides(slides)), [slides])
  const insights = useMemo(
    () => (subjectId ? getInsights(subjectId) : null),
    [subjectId],
  )
  const recommendations = useMemo(
    () => (subjectId ? getRecommendations(subjectId, { limit: 5 }) : null),
    [subjectId],
  )

  useEffect(() => {
    if (!enabled || !living.enabled) return undefined
    const monitor = createPerfMonitor()
    monitor.start()
    monitor.markSlideEnter()
    monitor.markTransitionStart()
    const stopShift = observeLayoutShifts((v) => setLayoutShift((n) => n + v))
    const timer = window.setInterval(() => {
      const root = document.querySelector('.deck.living-engine') || document.body
      monitor.markTransitionEnd()
      setPerf(monitor.snapshot(root))
    }, 1000)
    return () => {
      window.clearInterval(timer)
      stopShift()
      monitor.stop()
    }
  }, [enabled, living.enabled, slide?.id])

  if (!enabled || !living.enabled) return null

  return (
    <aside className={`engine-debug${open ? ' is-open' : ''}`} aria-label="Presentation engine inspector">
      <header className="engine-debug-header">
        <button type="button" className="engine-debug-toggle" onClick={() => setOpen((v) => !v)}>
          {open ? '▼' : '▲'} Engine V{ENGINE_VERSION}
        </button>
        <nav className="engine-debug-tabs" hidden={!open}>
          {['inspect', 'timeline', 'perf', 'qa', 'insights'].map((id) => (
            <button key={id} type="button" className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
              {id}
            </button>
          ))}
        </nav>
      </header>

      {open && tab === 'inspect' && (
        <dl className="engine-debug-grid">
          <DebugRow label="Scene" value={slide?.id || '—'} />
          <DebugRow label="Index" value={`${slideIndex + 1} / ${slides.length || '—'}`} />
          <DebugRow label="Beat" value={`${living.revealStep} · ${living.revealBeat}`} />
          <DebugRow label="Motion Mode" value={`${motionMode}${motionMeta ? ` — ${motionMeta.purpose}` : ''}`} />
          <DebugRow label="Camera" value={film.camera || extractFromNotes(slide?.notes, 1) || '—'} />
          <DebugRow label="Focus Target" value={film.focus || extractFocus(slide?.notes) || '—'} />
          <DebugRow label="Hero Tier" value={tierMeta ? `${tierMeta.label} · ${tierMeta.purpose}` : '—'} />
          <DebugRow label="Memory Anchor" value={film.identity || film.identityLabel || '—'} />
          <DebugRow label="Callback" value={film.callback || '—'} />
          <DebugRow label="Transition" value={film.transition || '—'} />
          <DebugRow label="Adaptive Mode" value={`${living.motionBudget} ×${Number(living.durationScale).toFixed(2)}`} />
          <DebugRow label="Teaching Mode" value={living.livingMode} />
          <DebugRow label="Reduced Motion" value={prefersReducedMotion() ? 'on' : 'off'} />
          <DebugRow label="Focus Active" value={living.focusActive ? 'yes' : 'no'} />
          <DebugRow label="Revisit" value={living.revisit ? `yes (${living.visitCount})` : 'no'} />
          <DebugRow
            label="Analytics"
            value={insights
              ? `rev ${insights.mostRevisited?.[0]?.revisits || 0} · dwell ${Math.round((insights.longestPauses?.[0]?.avgDwellMs || 0) / 1000)}s`
              : '—'}
          />
          <DebugRow label="Module" value={`${subjectId}/${moduleId}`} />
        </dl>
      )}

      {open && tab === 'timeline' && (
        <div className="engine-debug-timeline">
          <p className="engine-debug-hint">Beat schedule for this slide</p>
          <ol>
            {timeline.map((row) => (
              <li key={row.beat} data-active={living.revealBeat === row.beat ? 'true' : 'false'}>
                <span className="t-at">{row.at.toFixed(1)}</span>
                <span className="t-label">{row.label}</span>
                <span className="t-bar" style={{ '--t': `${Math.min(100, (row.at / schedule.settle) * 100)}%` }} />
              </li>
            ))}
          </ol>
          <p className="engine-debug-hint">Settle · {schedule.settle.toFixed(1)}s · stagger {schedule.stagger.toFixed(2)}s</p>
        </div>
      )}

      {open && tab === 'perf' && (
        <dl className="engine-debug-grid">
          <DebugRow label="FPS" value={perf?.fps ?? '…'} />
          <DebugRow label="Dropped frames" value={perf?.droppedFrames ?? '…'} />
          <DebugRow label="Active animations" value={perf?.activeAnimations ?? '…'} />
          <DebugRow label="Transition ms" value={perf?.transitionMs ?? '…'} />
          <DebugRow label="Slide elapsed" value={perf ? `${Math.round(perf.slideElapsedMs / 1000)}s` : '…'} />
          <DebugRow label="Memory MB" value={perf?.memoryMB ?? 'n/a'} />
          <DebugRow label="Layout shift Σ" value={layoutShift.toFixed(3)} />
          <DebugRow label="Long tasks" value={perf?.longTasks ?? 0} />
          <DebugRow label="Reduced motion" value={perf?.reducedMotion ? 'on' : 'off'} />
        </dl>
      )}

      {open && tab === 'qa' && (
        <div className="engine-debug-qa">
          <p className={`engine-debug-hint ${qa.ok ? 'ok' : 'bad'}`}>
            {qa.ok ? 'No blocking animation regressions' : 'Blocking issues detected'}
            {' · '}
            {qa.findings.length} finding{qa.findings.length === 1 ? '' : 's'}
          </p>
          <ul>
            {qa.findings.length === 0 && <li className="ok">Sequence looks balanced.</li>}
            {qa.findings.slice(0, 12).map((finding, i) => (
              <li key={`${finding.code}-${i}`} data-sev={finding.severity}>
                <strong>{finding.code}</strong> {finding.message}
              </li>
            ))}
          </ul>
        </div>
      )}

      {open && tab === 'insights' && (
        <div className="engine-debug-qa">
          <p className="engine-debug-hint">Content recommendations from local analytics</p>
          <ul>
            {(recommendations?.recommendations || []).length === 0 && (
              <li className="ok">No recommendations yet — teach with the deck to gather signal.</li>
            )}
            {(recommendations?.recommendations || []).slice(0, 8).map((item, i) => (
              <li key={`${item.type}-${i}`} data-sev={item.severity === 'info' ? 'info' : item.severity === 'high' ? 'error' : 'warn'}>
                <strong>{item.type}</strong>
                {item.slideId ? ` · ${item.slideId}` : item.moduleId ? ` · ${item.moduleId}` : ''}
                {' — '}
                {item.recommendation}
                <em style={{ display: 'block', opacity: 0.75 }}>{item.evidence}</em>
              </li>
            ))}
          </ul>
          {insights?.longestChapters?.[0] && (
            <p className="engine-debug-hint">
              Longest chapter signal: {insights.longestChapters[0].moduleId}
              {' · '}
              {Math.round((insights.longestChapters[0].avgDwellPerEnter || 0) / 1000)}s avg
            </p>
          )}
        </div>
      )}
    </aside>
  )
}

function DebugRow({ label, value }) {
  return (
    <>
      <dt>{label}</dt>
      <dd title={String(value)}>{String(value)}</dd>
    </>
  )
}

function extractFromNotes(notes, cameraSlot = 1) {
  if (!notes) return null
  const parts = notes.replace(/^Scene\s+/, '').split('/')
  return parts[cameraSlot] || null
}

function extractFocus(notes) {
  if (!notes) return null
  const parts = notes.replace(/^Scene\s+/, '').split('/')
  return parts[3] || null
}

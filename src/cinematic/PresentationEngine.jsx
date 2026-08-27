import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { resolveMotionBudget, motionDurationScale } from './adaptive'
import {
  trackModuleComplete,
  trackPause,
  trackReplay,
  trackSkip,
  trackSlideDwell,
  trackSlideEnter,
} from './analytics'
import { rememberMotif, getChapterMotifs } from './memory'
import {
  focusDelayMs,
  getVisitCount,
  hasVisitedSlide,
  LIVING_MODES,
  loadLivingMode,
  markSlideVisited,
  REVEAL_BEATS,
  saveLivingMode,
  suggestedDwellMs,
} from './modes'

const LivingContext = createContext(null)

export function useLivingEngine() {
  const ctx = useContext(LivingContext)
  if (!ctx) {
    return {
      enabled: false,
      livingMode: LIVING_MODES.STUDENT,
      setLivingMode: () => {},
      revisit: false,
      focusActive: false,
      revealStep: REVEAL_BEATS.length - 1,
      advanceReveal: () => {},
      resetReveal: () => {},
      showFinal: () => {},
      paused: false,
      togglePause: () => {},
      slowMotion: false,
      toggleSlowMotion: () => {},
      hideDecorative: false,
      toggleDecorative: () => {},
      replay: () => {},
      motionBudget: 'balanced',
      durationScale: 1,
      chapterMotifs: [],
      controls: null,
    }
  }
  return ctx
}

/**
 * Presentation Engine provider — adaptive intelligence for any subject deck.
 * Subject identity (colors, diagrams) stays local; living behavior is shared.
 */
export function PresentationEngine({
  enabled = true,
  subjectId,
  moduleId,
  slide,
  slideIndex = 0,
  totalSlides = 1,
  film = {},
  onReplay,
  children,
}) {
  const [livingMode, setLivingModeState] = useState(() => (enabled ? loadLivingMode() : LIVING_MODES.STUDENT))
  const [focusActive, setFocusActive] = useState(false)
  const [revealStep, setRevealStep] = useState(REVEAL_BEATS.length - 1)
  const [paused, setPaused] = useState(false)
  const [slowMotion, setSlowMotion] = useState(false)
  const [hideDecorative, setHideDecorative] = useState(false)
  const [revisit, setRevisit] = useState(false)
  const [visitTick, setVisitTick] = useState(0)
  const enterAtRef = useRef(Date.now())
  const slideId = slide?.id

  const motionBudget = resolveMotionBudget({
    longForm: Boolean(film.longForm),
    lineCount: film.lineCount || 0,
    hasDiagram: film.hasDiagram !== false,
    quiet: Boolean(film.quiet),
    hero: Boolean(film.hero || film.finale),
    heroTier: film.heroTier,
    revision: livingMode === LIVING_MODES.REVISION,
    revisit: revisit && livingMode !== LIVING_MODES.LECTURER,
  })

  let durationScale = motionDurationScale(motionBudget)
  if (slowMotion) durationScale *= 1.85
  if (paused) durationScale = 0

  const chapterMotifs = useMemo(
    () => (enabled ? getChapterMotifs(subjectId, moduleId, 5) : []),
    [enabled, subjectId, moduleId, visitTick, slideId],
  )

  const setLivingMode = useCallback((mode) => {
    setLivingModeState(mode)
    saveLivingMode(mode)
  }, [])

  const resetReveal = useCallback(() => {
    if (livingMode === LIVING_MODES.LECTURER) {
      setRevealStep(0)
    } else {
      setRevealStep(REVEAL_BEATS.length - 1)
    }
  }, [livingMode])

  const advanceReveal = useCallback(() => {
    setRevealStep((step) => Math.min(REVEAL_BEATS.length - 1, step + 1))
  }, [])

  const showFinal = useCallback(() => {
    setRevealStep(REVEAL_BEATS.length - 1)
    setFocusActive(false)
    trackSkip(subjectId, moduleId, slideId)
  }, [subjectId, moduleId, slideId])

  const togglePause = useCallback(() => {
    setPaused((value) => {
      const next = !value
      if (next) trackPause(subjectId, moduleId, slideId)
      return next
    })
  }, [subjectId, moduleId, slideId])

  const replay = useCallback(() => {
    setFocusActive(false)
    setPaused(false)
    resetReveal()
    trackReplay(subjectId, moduleId, slideId)
    onReplay?.()
  }, [onReplay, resetReveal, subjectId, moduleId, slideId])

  // Enter slide — visits + analytics + motifs (stable on slideId only)
  useEffect(() => {
    if (!enabled || !slideId) return undefined
    enterAtRef.current = Date.now()
    setFocusActive(false)
    setPaused(false)

    const already = hasVisitedSlide(subjectId, moduleId, slideId)
    setRevisit(already)
    trackSlideEnter(subjectId, moduleId, slideId, { revisit: already })
    markSlideVisited(subjectId, moduleId, slideId)
    setVisitTick((n) => n + 1)

    if (film.identity) {
      rememberMotif(subjectId, moduleId, film.identity, {
        label: film.identityLabel || film.identity,
        symbol: film.symbol,
      })
    }

    if (slideIndex >= totalSlides - 1) {
      trackModuleComplete(subjectId, moduleId)
    }

    return () => {
      const dwell = Date.now() - enterAtRef.current
      trackSlideDwell(subjectId, moduleId, slideId, dwell)
    }
  }, [enabled, slideId, subjectId, moduleId, slideIndex, totalSlides, film.identity, film.identityLabel, film.symbol])

  // Lecturer vs auto reveal defaults when mode changes
  useEffect(() => {
    if (!enabled) return
    if (livingMode === LIVING_MODES.LECTURER) setRevealStep(0)
    else setRevealStep(REVEAL_BEATS.length - 1)
  }, [enabled, livingMode, slideId])

  // Focus mode — intelligent pause → guide attention
  useEffect(() => {
    if (!enabled || !slideId || livingMode === LIVING_MODES.LECTURER || paused) {
      setFocusActive(false)
      return undefined
    }
    const delay = focusDelayMs({
      hero: Boolean(film.hero || film.finale),
      quiet: Boolean(film.quiet),
      finale: Boolean(film.finale),
      revision: livingMode === LIVING_MODES.REVISION,
      heroTier: film.heroTier,
    })
    const timer = window.setTimeout(() => setFocusActive(true), delay)
    return () => window.clearTimeout(timer)
  }, [enabled, slideId, livingMode, paused, film.hero, film.quiet, film.finale, film.heroTier])

  const value = useMemo(() => ({
    enabled,
    livingMode,
    setLivingMode,
    revisit,
    visitCount: slideId ? getVisitCount(subjectId, moduleId, slideId) : 0,
    focusActive,
    revealStep,
    revealBeat: REVEAL_BEATS[revealStep] || 'settle',
    advanceReveal,
    resetReveal,
    showFinal,
    paused,
    togglePause,
    slowMotion,
    toggleSlowMotion: () => setSlowMotion((v) => !v),
    hideDecorative,
    toggleDecorative: () => setHideDecorative((v) => !v),
    replay,
    motionBudget,
    durationScale,
    chapterMotifs,
    suggestedDwell: suggestedDwellMs({
      hero: Boolean(film.hero || film.finale),
      quiet: Boolean(film.quiet),
      finale: Boolean(film.finale),
      longForm: Boolean(film.longForm),
      heroTier: film.heroTier,
    }),
    film,
  }), [
    enabled, livingMode, setLivingMode, revisit, slideId, subjectId, moduleId,
    focusActive, revealStep, advanceReveal, resetReveal, showFinal, paused,
    togglePause, slowMotion, hideDecorative, replay, motionBudget, durationScale,
    chapterMotifs, film,
  ])

  return (
    <LivingContext.Provider value={value}>
      {children}
    </LivingContext.Provider>
  )
}

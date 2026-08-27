/**
 * Reusable cinematic learning engine — platform Final Cut primitives.
 *
 * Subject decks keep their own identities (color, motifs, content).
 * This module only provides: wow budget, soft transitions, continuity,
 * visual memory IDs, callbacks, and chapter-arc pacing helpers.
 */

export const WOW_BUDGET = {
  /** Target spacing between hero / elevated moments */
  heroMinGap: 4,
  heroMaxGap: 6,
  /** Quiet reflection after a major concept cluster / hero */
  quietAfterHero: true,
  quietEveryCluster: 9,
  signaturePerChapter: 1,
  modulePayoff: true,
  courseFinale: true,
}

/** Soft film transition vocabulary — never a hard cut when avoidable. */
export const SOFT_TRANSITIONS = {
  CARRY: 'soft-carry',
  RESOLVE: 'resolve-carry',
  MORPH: 'motif-morph',
  CALLBACK: 'callback-echo',
  QUIET_REST: 'quiet-rest',
  CHAPTER_SEAM: 'chapter-seam',
  FINALE_BLOOM: 'finale-bloom',
  HARD: 'hard-cut',
}

/**
 * Recommend a soft transition so scenes resolve into each other.
 * Prefer soft-carry / resolve / morph. Hard cuts only for quiet rests.
 */
export function resolveSoftTransition({
  previousChoreo,
  choreo,
  continuity = false,
  quiet = false,
  finale = false,
  chapterClose = false,
  callback = null,
  bridgeType = null,
}) {
  if (finale) return SOFT_TRANSITIONS.FINALE_BLOOM
  if (chapterClose) return SOFT_TRANSITIONS.CHAPTER_SEAM
  if (quiet) return SOFT_TRANSITIONS.QUIET_REST
  if (callback) return SOFT_TRANSITIONS.CALLBACK
  if (bridgeType) return bridgeType
  if (continuity && previousChoreo && choreo) return SOFT_TRANSITIONS.MORPH
  if (previousChoreo && choreo && previousChoreo !== choreo) return SOFT_TRANSITIONS.RESOLVE
  if (previousChoreo) return SOFT_TRANSITIONS.CARRY
  return SOFT_TRANSITIONS.CARRY
}

/**
 * Enforce wow budget: heroes spaced 4–6 slides; force quiet after heroes;
 * suppress consecutive wow; plant quiet after concept clusters.
 */
export function planWowBudget({
  slideIndex,
  heroPlanned = false,
  previousRhythm = null,
  previousWasHero = false,
  slidesSinceHero = 99,
  clusterBoundary = false,
}) {
  let hero = false
  let wow = false
  let quiet = false
  let rhythmOverride = null

  if (heroPlanned) {
    // Planned chapter heroes always land — spacing only governs automatic peaks.
    hero = true
    wow = true
    rhythmOverride = 'wow'
  } else if (!hero && slidesSinceHero >= WOW_BUDGET.heroMaxGap && slideIndex > 0 && slideIndex % 5 === 0) {
    wow = true
    rhythmOverride = previousRhythm === 'dramatic' ? 'executive' : 'dramatic'
  }

  if (WOW_BUDGET.quietAfterHero && previousWasHero && !heroPlanned) {
    quiet = true
    wow = false
    hero = false
    rhythmOverride = 'quiet'
  } else if (clusterBoundary || (slideIndex > 0 && slideIndex % WOW_BUDGET.quietEveryCluster === 0 && !hero && !heroPlanned)) {
    quiet = true
    rhythmOverride = previousRhythm === 'reflective' ? 'minimal' : 'reflective'
  }

  if (previousRhythm === 'wow' && rhythmOverride === 'wow' && !heroPlanned) {
    rhythmOverride = 'dramatic'
    hero = false
  }

  return { hero, wow, quiet, rhythmOverride }
}

/** Register a visual identity students can recognize across chapters. */
export function createVisualMemory(entries) {
  return { ...entries }
}

/**
 * Resolve a callback memory — returns identity key when this slide
 * should echo an earlier chapter motif.
 */
export function resolveCallback(callbacks = [], { moduleNumber, text = '', title = '' } = {}) {
  const head = String(title || text.split('\n')[0] || '').trim()
  for (const item of callbacks) {
    if (item.module != null && item.module !== moduleNumber) continue
    if (item.when && !item.when.test(head)) continue
    return {
      recall: item.recall,
      fromModule: item.fromModule,
      label: item.label || item.recall,
    }
  }
  return null
}

/** Evolving motif stage for a recurring symbol family. */
export function motifStage(family, moduleNumber) {
  const stages = {
    route: {
      1: 'trade-route',
      2: 'market-climate',
      3: 'theory-path',
      4: 'institution-link',
      5: 'expansion-path',
      6: 'global-ops',
    },
    company: {
      1: 'local-vision',
      2: 'climate-aware',
      3: 'strategy-formed',
      4: 'rule-bound',
      5: 'multinational',
      6: 'global-enterprise',
    },
  }
  return stages[family]?.[moduleNumber] || family
}

export function chapterArc(moduleNumber, arcs) {
  return arcs?.[moduleNumber] || null
}

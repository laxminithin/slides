/**
 * Presentation Engine V7 — Subject Plug-in Contract
 *
 * API frozen. Prefer createSubjectManifest() from the Subject SDK.
 * International Business remains the showcase / quality bar.
 */

export const SHOWCASE_SUBJECT_ID = 'international-business'

/** Fields a cinematic subject plug-in should supply. */
export const SUBJECT_PLUGIN_CONTRACT = {
  identity: {
    required: ['id', 'title', 'accent'],
    optional: ['shortTitle', 'description', 'program'],
  },
  theme: {
    required: [],
    optional: ['cssModules', 'colorTokens', 'typography'],
  },
  modules: {
    required: ['modules'],
    optional: ['moduleFlow', 'keyAreas'],
  },
  visualMotifs: {
    required: [],
    optional: ['motifs', 'ambientByModule', 'symbolFamilies'],
  },
  heroScenes: {
    required: [],
    optional: ['moduleHeroes', 'chapterOpeners', 'chapterPayoffs', 'courseFinale'],
  },
  diagrams: {
    required: [],
    optional: ['components', 'visualModes'],
  },
  film: {
    required: [],
    optional: ['chapterArc', 'callbacks', 'visualMemory', 'transitions'],
  },
  memory: {
    required: [],
    optional: ['anchors', 'motifStages'],
  },
}

/**
 * Normalize engine capabilities from a subject registry entry.
 * Prefer subject.engine; fall back to showcase / chapter heuristics.
 */
export function resolveEngineCapabilities(subject) {
  const engine = subject?.engine || {}
  const isShowcase = subject?.id === SHOWCASE_SUBJECT_ID || Boolean(engine.showcase)
  return {
    living: engine.living !== false,
    cinematicFilm: Boolean(engine.cinematicFilm ?? isShowcase),
    chapterIntro: Boolean(engine.chapterIntro ?? (isShowcase && subject?.modules?.some((m) => m.chapter))),
    memoryAnchors: Boolean(engine.memoryAnchors ?? isShowcase),
    filmContinuity: Boolean(engine.filmContinuity ?? engine.cinematicFilm ?? isShowcase),
    showcase: isShowcase,
    qualityBar: engine.qualityBar || (isShowcase ? 'reference' : 'aspirational'),
    version: engine.version || '7.0',
  }
}

/**
 * Create a validated subject plug-in descriptor for authors / tooling.
 */
export function createSubjectPlugin(definition = {}) {
  const {
    id,
    title,
    accent,
    theme = {},
    motifs = {},
    heroes = {},
    film = {},
    memory = {},
    diagrams = {},
    engine = {},
  } = definition

  if (!id || !title || !accent) {
    throw new Error('Subject plug-in requires id, title, and accent.')
  }

  return {
    identity: { id, title, accent, shortTitle: definition.shortTitle, description: definition.description, program: definition.program },
    theme,
    motifs,
    heroes,
    film,
    memory,
    diagrams,
    engine: {
      living: true,
      cinematicFilm: true,
      chapterIntro: true,
      memoryAnchors: true,
      filmContinuity: true,
      version: '7.0',
      ...engine,
    },
  }
}

/**
 * Lightweight checklist for “does this subject reach the IB quality bar?”
 * Returns { ok, missing, warnings }.
 */
export function validateAgainstShowcase(subject, slidesByModule = {}) {
  const missing = []
  const warnings = []
  const caps = resolveEngineCapabilities(subject)

  if (!subject?.modules?.length) missing.push('modules')
  if (!caps.cinematicFilm) warnings.push('cinematicFilm disabled — will not inherit film continuity')
  if (!subject?.modules?.some((m) => m.chapter)) warnings.push('no chapter metadata (emotion / motif / payoff framing)')

  let hasHero = false
  let hasFinale = false
  let hasCallback = false
  let hasIdentity = false
  let hasQuiet = false

  for (const mod of subject?.modules || []) {
    const slides = slidesByModule[mod.id] || mod.slides || []
    for (const slide of slides) {
      const film = slide?.film || {}
      if (film.hero || film.finale || film.heroTier === '1' || film.heroTier === '2') hasHero = true
      if (film.finale) hasFinale = true
      if (film.callback) hasCallback = true
      if (film.identity) hasIdentity = true
      if (film.quiet) hasQuiet = true
    }
  }

  if (!hasHero) missing.push('heroScenes')
  if (!hasIdentity) warnings.push('no visual memory identities')
  if (!hasCallback) warnings.push('no film callbacks')
  if (!hasQuiet) warnings.push('no quiet reflection scenes')
  if (subject?.modules?.length >= 2 && !hasFinale) warnings.push('multi-module subject without course finale')

  return {
    ok: missing.length === 0,
    missing,
    warnings,
    showcaseId: SHOWCASE_SUBJECT_ID,
    message: missing.length === 0
      ? `Meets minimum plug-in contract. Compare polish against ${SHOWCASE_SUBJECT_ID}.`
      : `Missing required cinematic assets: ${missing.join(', ')}`,
  }
}

/** Platform non-negotiable rules (documented for tooling + humans). */
export const PLATFORM_RULES = [
  'No static walls of text.',
  'Every lesson has a narrative.',
  'Every module has signature hero moments.',
  'Every subject defines visual motifs.',
  'Every chapter ends with a payoff.',
  'Every course ends with a finale.',
  'Motion always reinforces learning.',
  'Accessibility is preserved (prefers-reduced-motion honored).',
]

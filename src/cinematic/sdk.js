/**
 * Presentation Engine V7.0 — Subject SDK
 *
 * A new subject should require ONLY a manifest of academic/visual identity.
 * Everything listed in SUBJECT_SDK_PROVIDES comes from the engine automatically.
 *
 * Do not duplicate engine logic inside subject slide files.
 */

import { ENGINE_VERSION } from './stable'
import {
  SHOWCASE_SUBJECT_ID,
  PLATFORM_RULES,
  createSubjectPlugin,
  resolveEngineCapabilities,
  validateAgainstShowcase,
} from './plugins'

/** What authors MUST supply. */
export const SUBJECT_SDK_REQUIRES = Object.freeze([
  'manifest', // id, title, accent, description, program
  'theme', // color palette + optional typography + CSS module refs
  'visualMotifs', // recurring symbols / ambient language
  'moduleMetadata', // modules with chapter emotion / motif / quote
  'heroScenes', // planned tier-2 peaks + one tier-1 finale
  'filmMetadata', // per-slide film fields when cinematic
  'memoryAnchors', // visual memory identities
  'callbacks', // sparse cross-chapter echoes
  'diagrams', // custom teaching visuals when needed
])

/** What the engine AUTOMATICALLY provides — do not rebuild these. */
export const SUBJECT_SDK_PROVIDES = Object.freeze([
  'courseLanding',
  'chapterLanding',
  'cinematicFlow',
  'motionLanguage',
  'timelineBeats',
  'adaptiveBehavior',
  'teachingModes',
  'revisionMode',
  'analytics',
  'insightsRecommendations',
  'animationQa',
  'overflowQa',
  'visualRegression',
  'accessibility',
  'completionFlow',
  'filmContinuity',
  'memoryAnchorComponents',
  'debugInspector',
  'performanceMonitor',
])

/**
 * Subject identity questions every subject must answer before shipping.
 * No two subjects should feel interchangeable.
 */
export const SUBJECT_IDENTITY_PROMPT = Object.freeze([
  'What is the emotional tone?',
  'What is the central visual metaphor?',
  'What are the recurring motifs?',
  'What are the hero scenes?',
  'What is the final payoff?',
  'What should students remember visually?',
])

/**
 * Create a Subject Manifest — the primary SDK entry point for authors.
 *
 * @example
 * createSubjectManifest({
 *   id: 'my-course',
 *   title: 'My Course',
 *   accent: 'my-course',
 *   theme: { palette: { accent: '#1a4', highlight: '#c9a' } },
 *   identity: {
 *     tone: 'curious expedition',
 *     metaphor: 'map of discovery',
 *     motifs: ['path', 'node'],
 *     finaleRemember: 'the connected system',
 *   },
 *   modules: [...],
 * })
 */
export function createSubjectManifest(definition = {}) {
  const {
    id,
    title,
    accent,
    shortTitle,
    description,
    program,
    theme = {},
    identity = {},
    motifs = {},
    heroes = {},
    film = {},
    memory = {},
    diagrams = {},
    modules = [],
    keyAreas = [],
    moduleFlow = [],
    engine = {},
  } = definition

  if (!id || !title || !accent) {
    throw new Error('Subject SDK: manifest requires id, title, and accent.')
  }

  const plugin = createSubjectPlugin({
    id,
    title,
    accent,
    shortTitle,
    description,
    program,
    theme,
    motifs,
    heroes,
    film,
    memory,
    diagrams,
    engine: {
      version: ENGINE_VERSION,
      living: true,
      cinematicFilm: engine.cinematicFilm !== false,
      chapterIntro: engine.chapterIntro !== false,
      memoryAnchors: engine.memoryAnchors !== false,
      filmContinuity: engine.filmContinuity !== false,
      qualityBar: engine.qualityBar || 'aspirational',
      showcase: Boolean(engine.showcase),
      ...engine,
    },
  })

  const manifest = {
    sdkVersion: ENGINE_VERSION,
    ...plugin.identity,
    keyAreas,
    moduleFlow,
    modules,
    theme: plugin.theme,
    identity: {
      tone: identity.tone || null,
      metaphor: identity.metaphor || null,
      motifs: identity.motifs || motifs.list || [],
      heroScenes: identity.heroScenes || heroes.list || [],
      finale: identity.finale || heroes.courseFinale || null,
      rememberVisually: identity.rememberVisually || identity.finaleRemember || null,
      answered: SUBJECT_IDENTITY_PROMPT.map((question) => ({
        question,
        answered: Boolean(
          (question.includes('emotional') && identity.tone)
          || (question.includes('metaphor') && identity.metaphor)
          || (question.includes('recurring') && (identity.motifs?.length || motifs.list?.length))
          || (question.includes('hero') && (identity.heroScenes?.length || heroes.list?.length || heroes.moduleHeroes))
          || (question.includes('payoff') && (identity.finale || heroes.courseFinale))
          || (question.includes('remember') && (identity.rememberVisually || identity.finaleRemember)),
        ),
      })),
    },
    motifs: plugin.motifs,
    heroes: plugin.heroes,
    film: plugin.film,
    memory: plugin.memory,
    diagrams: plugin.diagrams,
    engine: plugin.engine,
    provides: SUBJECT_SDK_PROVIDES,
    requires: SUBJECT_SDK_REQUIRES,
    platformRules: PLATFORM_RULES,
  }

  return manifest
}

/** Convert a manifest into a subjects.jsx-compatible registry entry. */
export function manifestToRegistryEntry(manifest) {
  if (!manifest?.id) throw new Error('Subject SDK: missing manifest id')
  return {
    id: manifest.id,
    number: manifest.number,
    title: manifest.title,
    shortTitle: manifest.shortTitle || manifest.title,
    description: manifest.description,
    accent: manifest.accent,
    keyAreas: manifest.keyAreas || [],
    moduleFlow: manifest.moduleFlow || [],
    program: manifest.program,
    engine: manifest.engine,
    modules: manifest.modules || [],
  }
}

/** Validate identity completeness for shipping. */
export function validateSubjectIdentity(manifestOrIdentity) {
  const identity = manifestOrIdentity?.identity || manifestOrIdentity || {}
  const missing = []
  if (!identity.tone) missing.push('emotional tone')
  if (!identity.metaphor) missing.push('central visual metaphor')
  if (!identity.motifs?.length) missing.push('recurring motifs')
  if (!identity.heroScenes?.length) missing.push('hero scenes')
  if (!identity.finale) missing.push('final payoff')
  if (!identity.rememberVisually && !identity.finaleRemember) missing.push('visual memory takeaway')

  return {
    ok: missing.length === 0,
    missing,
    message: missing.length
      ? `Subject identity incomplete: ${missing.join(', ')}`
      : 'Subject identity complete — distinctiveness check passed.',
    showcaseId: SHOWCASE_SUBJECT_ID,
  }
}

export function getSubjectSdkOverview() {
  return {
    version: ENGINE_VERSION,
    requires: SUBJECT_SDK_REQUIRES,
    provides: SUBJECT_SDK_PROVIDES,
    identityPrompt: SUBJECT_IDENTITY_PROMPT,
    showcaseId: SHOWCASE_SUBJECT_ID,
    resolveEngineCapabilities,
    validateAgainstShowcase,
  }
}

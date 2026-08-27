/**
 * Presentation Engine V6 — Animation QA
 *
 * Detect cinematic regressions before they reach classroom users:
 * - duplicate consecutive motion
 * - duplicate hero sequence
 * - overuse of one camera movement
 * - excessive simultaneous motion
 * - scene duration outliers
 * - callback frequency
 * - pacing imbalance
 */

import { CAMERAS } from './motion'
import { HERO_TIERS } from './hero'
import { SCENE_DURATION_BOUNDS, sceneBeatSchedule, sceneDurationSeconds } from './timeline'

export const QA_SEVERITY = {
  INFO: 'info',
  WARN: 'warn',
  ERROR: 'error',
}

/**
 * Audit a flat list of film/scene metadata for one module (or course).
 * Each item: { id, camera, choreo, rhythm, hero, heroTier, quiet, finale, callback, lineCount, pace }
 */
export function auditAnimationSequence(scenes = []) {
  const findings = []
  if (!scenes.length) return { ok: true, findings: [] }

  let consecutiveSameCamera = 1
  let consecutiveHero = 0
  let callbackCount = 0
  let heroCount = 0
  let quietCount = 0
  let wowish = 0
  const cameraCounts = Object.fromEntries(CAMERAS.map((c) => [c, 0]))

  scenes.forEach((scene, index) => {
    const prev = scenes[index - 1]
    const camera = scene.camera || 'slow-push'
    const tier = scene.heroTier || (scene.finale ? HERO_TIERS.TIER_1 : scene.hero ? HERO_TIERS.TIER_2 : HERO_TIERS.NONE)
    const elevated = Boolean(scene.finale || scene.hero || tier === HERO_TIERS.TIER_1 || tier === HERO_TIERS.TIER_2)

    if (cameraCounts[camera] != null) cameraCounts[camera] += 1
    else cameraCounts[camera] = 1

    if (scene.callback) callbackCount += 1
    if (elevated) {
      heroCount += 1
      consecutiveHero += 1
    } else {
      consecutiveHero = 0
    }
    if (scene.quiet) quietCount += 1
    if (scene.rhythm === 'wow' || elevated) wowish += 1

    if (prev && prev.camera && scene.camera && prev.camera === camera) {
      consecutiveSameCamera += 1
      if (consecutiveSameCamera >= 5) {
        findings.push({
          severity: QA_SEVERITY.WARN,
          code: 'camera-overuse',
          slideId: scene.id,
          index,
          message: `Camera "${camera}" repeated ${consecutiveSameCamera} consecutive scenes.`,
        })
      }
    } else {
      consecutiveSameCamera = 1
    }

    if (
      prev
      && prev.choreo
      && scene.choreo
      && prev.camera
      && scene.camera
      && prev.choreo === scene.choreo
      && prev.rhythm === scene.rhythm
      && prev.camera === scene.camera
    ) {
      findings.push({
        severity: QA_SEVERITY.WARN,
        code: 'duplicate-motion',
        slideId: scene.id,
        index,
        message: `Duplicate consecutive motion (${scene.choreo}/${scene.camera}/${scene.rhythm}).`,
      })
    }

    if (
      consecutiveHero >= 2
      && elevated
      && prev
      && (prev.hero || prev.finale || prev.heroTier === HERO_TIERS.TIER_1 || prev.heroTier === HERO_TIERS.TIER_2)
      && !scene.chapterOpener
      && !prev.chapterPayoff
    ) {
      // Structural opener→content peak is intentional; consecutive content heroes are not.
      const bothContentHeroes = !prev.chapterOpener && !scene.chapterPayoff && !prev.finale
      if (bothContentHeroes) {
        findings.push({
          severity: QA_SEVERITY.ERROR,
          code: 'duplicate-hero',
          slideId: scene.id,
          index,
          message: 'Back-to-back hero sequences dilute cinematic gravity.',
        })
      }
    }

    const schedule = sceneBeatSchedule(scene.lineCount || 4, scene.pace || (scene.quiet ? 'minimal' : 'medium'))
    const duration = sceneDurationSeconds(schedule)
    const max = scene.finale
      ? SCENE_DURATION_BOUNDS.finaleMax
      : elevated
        ? SCENE_DURATION_BOUNDS.heroMax
        : SCENE_DURATION_BOUNDS.typicalMax
    const min = scene.quiet ? SCENE_DURATION_BOUNDS.quietMin : SCENE_DURATION_BOUNDS.min

    if (duration < min) {
      findings.push({
        severity: QA_SEVERITY.WARN,
        code: 'duration-short',
        slideId: scene.id,
        index,
        message: `Scene settle at ${duration.toFixed(1)}s is below ${min}s.`,
      })
    }
    if (duration > max) {
      findings.push({
        severity: QA_SEVERITY.WARN,
        code: 'duration-outlier',
        slideId: scene.id,
        index,
        message: `Scene settle at ${duration.toFixed(1)}s exceeds ${max}s for this tier.`,
      })
    }

    // Simultaneous motion — ignore ambient-by-default; require stacked teaching signals
    const simultaneous = [
      scene.hero || elevated,
      scene.callback,
      scene.continuity,
      scene.wow && !elevated,
    ].filter(Boolean).length
    if (simultaneous >= 3 && !scene.finale) {
      findings.push({
        severity: QA_SEVERITY.WARN,
        code: 'excessive-motion',
        slideId: scene.id,
        index,
        message: 'Too many simultaneous motion layers; dampen continuity or secondary roles.',
      })
    }
  })

  const n = scenes.length
  if (n >= 8) {
    const callbackRate = callbackCount / n
    if (callbackRate > 0.22) {
      findings.push({
        severity: QA_SEVERITY.WARN,
        code: 'callback-frequency',
        message: `Callbacks on ${(callbackRate * 100).toFixed(0)}% of scenes — keep echoes sparse.`,
      })
    }

    const heroRate = heroCount / n
    if (heroRate > 0.28) {
      findings.push({
        severity: QA_SEVERITY.WARN,
        code: 'hero-overuse',
        message: `Hero elevation on ${(heroRate * 100).toFixed(0)}% of scenes — tier down supporting moments.`,
      })
    }

    const quietRate = quietCount / n
    if (quietRate < 0.06) {
      findings.push({
        severity: QA_SEVERITY.INFO,
        code: 'pacing-imbalance',
        message: 'Few quiet scenes — consider reflective rests after clusters.',
      })
    }
    if (wowish / n > 0.45) {
      findings.push({
        severity: QA_SEVERITY.WARN,
        code: 'pacing-imbalance',
        message: 'Too much wow density — cinematic peaks need valleys.',
      })
    }

    const dominant = Object.entries(cameraCounts).sort((a, b) => b[1] - a[1])[0]
    if (dominant && dominant[1] / n > 0.4) {
      findings.push({
        severity: QA_SEVERITY.INFO,
        code: 'camera-bias',
        message: `Camera "${dominant[0]}" used on ${Math.round((dominant[1] / n) * 100)}% of scenes.`,
      })
    }
  }

  const errors = findings.filter((f) => f.severity === QA_SEVERITY.ERROR)
  return {
    ok: errors.length === 0,
    findings,
    summary: {
      scenes: n,
      heroes: heroCount,
      callbacks: callbackCount,
      quiet: quietCount,
      cameras: cameraCounts,
    },
  }
}

/** Extract audit rows from built slides (film + notes heuristics). */
export function scenesFromSlides(slides = []) {
  return slides.map((slide) => {
    const film = slide.film || {}
    const notes = slide.notes || ''
    const cameraMatch = notes.match(/Scene [^/]+\/([^/]+)\//)
    const choreoMatch = notes.match(/Scene ([^/]+)\//)
    return {
      id: slide.id,
      camera: film.camera || cameraMatch?.[1],
      choreo: film.choreo || choreoMatch?.[1],
      rhythm: film.rhythm,
      pace: film.pace,
      hero: Boolean(film.hero || film.finale),
      heroTier: film.heroTier,
      quiet: Boolean(film.quiet),
      finale: Boolean(film.finale),
      callback: film.callback,
      continuity: Boolean(film.continuity),
      ambient: film.ambient !== false,
      wow: Boolean(film.wow || film.hero),
      lineCount: film.lineCount || 4,
      chapterOpener: Boolean(film.chapterOpener),
      chapterPayoff: Boolean(film.chapterPayoff),
    }
  })
}

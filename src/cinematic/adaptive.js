/**
 * Adaptive Motion Engine — the scene decides how much motion it needs.
 * Text-heavy slides get guided motion; diagram-heavy slides stay quieter.
 */

export function resolveMotionBudget({
  longForm = false,
  lineCount = 0,
  hasDiagram = true,
  quiet = false,
  hero = false,
  heroTier = null,
  revision = false,
  revisit = false,
} = {}) {
  if (revision) return 'compressed'
  if (quiet) return 'minimal'
  if (revisit) return 'compact'
  if (heroTier === '1' || (hero && heroTier !== '3')) return 'cinematic'
  if (heroTier === '3' || hero) return 'guided'

  const textHeavy = longForm || lineCount >= 8
  const diagramHeavy = hasDiagram && !textHeavy && lineCount <= 4

  if (textHeavy) return 'guided'
  if (diagramHeavy) return 'restrained'
  return 'balanced'
}

/** CSS duration scale relative to full cinematic (1 = normal). */
export function motionDurationScale(budget) {
  const map = {
    cinematic: 1,
    guided: 1.05,
    balanced: 1,
    restrained: 0.72,
    compact: 0.42,
    compressed: 0.28,
    minimal: 0.55,
  }
  return map[budget] || 1
}

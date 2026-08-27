/**
 * Presentation Engine V7.0 — Content Quality Gate
 *
 * A subject is complete only if it passes every category.
 * Use validateContentRelease() before shipping.
 */

import { auditAnimationSequence, scenesFromSlides } from './qa'
import { validateAgainstShowcase } from './plugins'
import { validateSubjectIdentity } from './sdk'
import { ENGINE_VERSION } from './stable'

/** Release checklist categories — all must pass. */
export const CONTENT_QUALITY_CHECKLIST = Object.freeze({
  academic: [
    '100% source parity',
    'no missing concepts',
    'no missing examples',
    'no missing diagrams',
    'no omitted tables',
    'syllabus complete',
  ],
  visual: [
    'no overflow',
    'no clipped text',
    'no empty layouts',
    'no placeholder graphics',
    'no stretched illustrations',
  ],
  motion: [
    'no repeated scene patterns',
    'hero distribution balanced',
    'pacing balanced',
    'callbacks meaningful',
    'memory anchors consistent',
  ],
  performance: [
    'build clean',
    'QA clean',
    'acceptable animation performance',
    'no layout instability',
  ],
})

/** Standard production pipeline for every new subject. */
export const CONTENT_REVIEW_WORKFLOW = Object.freeze([
  { step: 1, id: 'import', label: 'Import source material' },
  { step: 2, id: 'parity', label: 'Verify content parity' },
  { step: 3, id: 'layouts', label: 'Build layouts' },
  { step: 4, id: 'diagrams', label: 'Add diagrams' },
  { step: 5, id: 'cinematic', label: 'Configure cinematic metadata' },
  { step: 6, id: 'auto-qa', label: 'Run automated QA' },
  { step: 7, id: 'teaching-review', label: 'Manual teaching review' },
  { step: 8, id: 'performance-review', label: 'Performance review' },
  { step: 9, id: 'polish', label: 'Final polish' },
  { step: 10, id: 'release', label: 'Release' },
])

/**
 * Automated portion of the release gate.
 * Manual academic/visual items still require human attestation.
 *
 * @param {object} options
 * @param {object} options.subject - registry subject
 * @param {object} [options.manifest] - optional SDK manifest for identity
 * @param {object} [options.manual] - { academic: bool, visual: bool, teachingReview: bool, performanceReview: bool }
 * @param {object} [options.animationQa] - precomputed audit result
 */
export function validateContentRelease({
  subject,
  manifest = null,
  manual = {},
  animationQa = null,
} = {}) {
  const categories = {
    academic: { ok: Boolean(manual.academic), automated: false, items: CONTENT_QUALITY_CHECKLIST.academic },
    visual: { ok: Boolean(manual.visual), automated: false, items: CONTENT_QUALITY_CHECKLIST.visual },
    motion: { ok: false, automated: true, items: CONTENT_QUALITY_CHECKLIST.motion, findings: [] },
    performance: {
      ok: Boolean(manual.performanceReview),
      automated: false,
      items: CONTENT_QUALITY_CHECKLIST.performance,
    },
  }

  const showcase = validateAgainstShowcase(subject)
  const identity = validateSubjectIdentity(manifest || {
    identity: subject?.identity || subject?.program?.identity || {},
  })

  const slides = (subject?.modules || []).flatMap((m) => m.slides || [])
  const qa = animationQa || auditAnimationSequence(scenesFromSlides(slides))
  const motionErrors = qa.findings.filter((f) => f.severity === 'error')
  categories.motion.ok = qa.ok && showcase.ok
  categories.motion.findings = qa.findings
  categories.motion.showcase = showcase
  categories.motion.identity = identity

  if (!manual.teachingReview) {
    categories.academic.note = 'Requires manual teaching review attestation'
  }
  if (!manual.visual) {
    categories.visual.note = 'Requires overflow QA + visual review attestation'
  }

  const blocking = []
  if (!categories.academic.ok) blocking.push('academic (manual attestation required)')
  if (!categories.visual.ok) blocking.push('visual (manual attestation required)')
  if (!categories.motion.ok) blocking.push('motion')
  if (!categories.performance.ok) blocking.push('performance (manual attestation required)')
  if (!identity.ok && manifest) blocking.push(`identity: ${identity.missing.join(', ')}`)

  return {
    ok: blocking.length === 0,
    engineVersion: ENGINE_VERSION,
    workflow: CONTENT_REVIEW_WORKFLOW,
    checklist: CONTENT_QUALITY_CHECKLIST,
    categories,
    showcase,
    identity,
    animationQa: { ok: qa.ok, summary: qa.summary, findings: qa.findings },
    blocking,
    message: blocking.length === 0
      ? 'Subject passes content quality gate — ready for release review.'
      : `Not release-ready: ${blocking.join('; ')}`,
  }
}

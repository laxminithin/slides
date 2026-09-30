import './am1.css'
import { auditSignatures } from './Am1Kit.jsx'
import { buildAm1ModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './Am1Scenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as AM1_COURSE, MODULES as AM1_MODULES }

export const am1Module1Slides = buildAm1ModuleSlides(1)
export const am1Module2Slides = buildAm1ModuleSlides(2)
export const am1Module3Slides = buildAm1ModuleSlides(3)
export const am1Module4Slides = buildAm1ModuleSlides(4)
export const am1Module5Slides = buildAm1ModuleSlides(5)

export const AM1_SIGNATURE_AUDIT = {
  1: auditSignatures(am1Module1Slides),
  2: auditSignatures(am1Module2Slides),
  3: auditSignatures(am1Module3Slides),
  4: auditSignatures(am1Module4Slides),
  5: auditSignatures(am1Module5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(AM1_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[AM1 uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[AM1 visual coverage]', Object.fromEntries(gaps))
}

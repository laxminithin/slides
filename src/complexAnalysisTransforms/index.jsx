import './cat.css'
import { auditSignatures } from './CatKit.jsx'
import { buildCatModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './CatScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as CAT_COURSE, MODULES as CAT_MODULES }

export const catModule1Slides = buildCatModuleSlides(1)
export const catModule2Slides = buildCatModuleSlides(2)
export const catModule3Slides = buildCatModuleSlides(3)
export const catModule4Slides = buildCatModuleSlides(4)
export const catModule5Slides = buildCatModuleSlides(5)

export const CAT_SIGNATURE_AUDIT = {
  1: auditSignatures(catModule1Slides),
  2: auditSignatures(catModule2Slides),
  3: auditSignatures(catModule3Slides),
  4: auditSignatures(catModule4Slides),
  5: auditSignatures(catModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(CAT_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[CAT uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[CAT visual coverage]', Object.fromEntries(gaps))
}

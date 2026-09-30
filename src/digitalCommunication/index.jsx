import './dc.css'
import { auditSignatures } from './DcKit.jsx'
import { buildDcModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './DcScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as DC_COURSE, MODULES as DC_MODULES }

export const dcModule1Slides = buildDcModuleSlides(1)
export const dcModule2Slides = buildDcModuleSlides(2)
export const dcModule3Slides = buildDcModuleSlides(3)
export const dcModule4Slides = buildDcModuleSlides(4)
export const dcModule5Slides = buildDcModuleSlides(5)

export const DC_SIGNATURE_AUDIT = {
  1: auditSignatures(dcModule1Slides),
  2: auditSignatures(dcModule2Slides),
  3: auditSignatures(dcModule3Slides),
  4: auditSignatures(dcModule4Slides),
  5: auditSignatures(dcModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(DC_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[DC uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[DC visual coverage]', Object.fromEntries(gaps))
}

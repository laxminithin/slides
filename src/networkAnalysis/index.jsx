import './na.css'
import { auditSignatures } from './NaKit.jsx'
import { buildNaModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './NaScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as NA_COURSE, MODULES as NA_MODULES }

export const naModule1Slides = buildNaModuleSlides(1)
export const naModule2Slides = buildNaModuleSlides(2)
export const naModule3Slides = buildNaModuleSlides(3)
export const naModule4Slides = buildNaModuleSlides(4)
export const naModule5Slides = buildNaModuleSlides(5)

export const NA_SIGNATURE_AUDIT = {
  1: auditSignatures(naModule1Slides),
  2: auditSignatures(naModule2Slides),
  3: auditSignatures(naModule3Slides),
  4: auditSignatures(naModule4Slides),
  5: auditSignatures(naModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(NA_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[NA uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[NA visual coverage]', Object.fromEntries(gaps))
}

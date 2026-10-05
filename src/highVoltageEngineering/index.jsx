import './hve.css'
import { auditSignatures } from './HveKit.jsx'
import { buildHveModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './HveScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as HVE_COURSE, MODULES as HVE_MODULES }

export const hveModule1Slides = buildHveModuleSlides(1)
export const hveModule2Slides = buildHveModuleSlides(2)
export const hveModule3Slides = buildHveModuleSlides(3)
export const hveModule4Slides = buildHveModuleSlides(4)
export const hveModule5Slides = buildHveModuleSlides(5)

export const HVE_SIGNATURE_AUDIT = {
  1: auditSignatures(hveModule1Slides),
  2: auditSignatures(hveModule2Slides),
  3: auditSignatures(hveModule3Slides),
  4: auditSignatures(hveModule4Slides),
  5: auditSignatures(hveModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(HVE_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[HVE uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[HVE visual coverage]', Object.fromEntries(gaps))
}

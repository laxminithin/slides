import './dsd.css'
import { auditSignatures } from './DsdKit.jsx'
import { buildDsdModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './DsdScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as DSD_COURSE, MODULES as DSD_MODULES }

export const dsdModule1Slides = buildDsdModuleSlides(1)
export const dsdModule2Slides = buildDsdModuleSlides(2)
export const dsdModule3Slides = buildDsdModuleSlides(3)
export const dsdModule4Slides = buildDsdModuleSlides(4)
export const dsdModule5Slides = buildDsdModuleSlides(5)

export const DSD_SIGNATURE_AUDIT = {
  1: auditSignatures(dsdModule1Slides),
  2: auditSignatures(dsdModule2Slides),
  3: auditSignatures(dsdModule3Slides),
  4: auditSignatures(dsdModule4Slides),
  5: auditSignatures(dsdModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(DSD_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[DSD uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[DSD visual coverage]', Object.fromEntries(gaps))
}

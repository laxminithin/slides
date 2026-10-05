import './fm.css'
import { auditSignatures } from './FmKit.jsx'
import { buildFmModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './FmScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as FM_COURSE, MODULES as FM_MODULES }

export const fmModule1Slides = buildFmModuleSlides(1)
export const fmModule2Slides = buildFmModuleSlides(2)
export const fmModule3Slides = buildFmModuleSlides(3)
export const fmModule4Slides = buildFmModuleSlides(4)
export const fmModule5Slides = buildFmModuleSlides(5)

export const FM_SIGNATURE_AUDIT = {
  1: auditSignatures(fmModule1Slides),
  2: auditSignatures(fmModule2Slides),
  3: auditSignatures(fmModule3Slides),
  4: auditSignatures(fmModule4Slides),
  5: auditSignatures(fmModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(FM_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[FM uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[FM visual coverage]', Object.fromEntries(gaps))
}

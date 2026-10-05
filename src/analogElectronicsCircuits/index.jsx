import './aec.css'
import { auditSignatures } from './AecKit.jsx'
import { buildAecModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './AecScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as AEC_COURSE, MODULES as AEC_MODULES }

export const aecModule1Slides = buildAecModuleSlides(1)
export const aecModule2Slides = buildAecModuleSlides(2)
export const aecModule3Slides = buildAecModuleSlides(3)
export const aecModule4Slides = buildAecModuleSlides(4)
export const aecModule5Slides = buildAecModuleSlides(5)

export const AEC_SIGNATURE_AUDIT = {
  1: auditSignatures(aecModule1Slides),
  2: auditSignatures(aecModule2Slides),
  3: auditSignatures(aecModule3Slides),
  4: auditSignatures(aecModule4Slides),
  5: auditSignatures(aecModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(AEC_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[AEC uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[AEC visual coverage]', Object.fromEntries(gaps))
}

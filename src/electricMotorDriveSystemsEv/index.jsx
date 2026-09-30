import './emd.css'
import { auditSignatures } from './EmdKit.jsx'
import { buildEmdModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './EmdScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as EMD_COURSE, MODULES as EMD_MODULES }

export const emdModule1Slides = buildEmdModuleSlides(1)
export const emdModule2Slides = buildEmdModuleSlides(2)
export const emdModule3Slides = buildEmdModuleSlides(3)
export const emdModule4Slides = buildEmdModuleSlides(4)
export const emdModule5Slides = buildEmdModuleSlides(5)

export const EMD_SIGNATURE_AUDIT = {
  1: auditSignatures(emdModule1Slides),
  2: auditSignatures(emdModule2Slides),
  3: auditSignatures(emdModule3Slides),
  4: auditSignatures(emdModule4Slides),
  5: auditSignatures(emdModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(EMD_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[EMD uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[EMD visual coverage]', Object.fromEntries(gaps))
}

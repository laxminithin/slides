import './aim.css'
import { auditSignatures } from './AimKit.jsx'
import { buildAimModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './AimScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as AIM_COURSE, MODULES as AIM_MODULES }

export const aimModule1Slides = buildAimModuleSlides(1)
export const aimModule2Slides = buildAimModuleSlides(2)
export const aimModule3Slides = buildAimModuleSlides(3)
export const aimModule4Slides = buildAimModuleSlides(4)
export const aimModule5Slides = buildAimModuleSlides(5)

export const AIM_SIGNATURE_AUDIT = {
  1: auditSignatures(aimModule1Slides),
  2: auditSignatures(aimModule2Slides),
  3: auditSignatures(aimModule3Slides),
  4: auditSignatures(aimModule4Slides),
  5: auditSignatures(aimModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(AIM_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[AIM uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[AIM visual coverage]', Object.fromEntries(gaps))
}

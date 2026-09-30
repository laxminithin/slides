import './msm.css'
import { auditSignatures } from './MsmKit.jsx'
import { buildMsmModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './MsmScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as MSM_COURSE, MODULES as MSM_MODULES }

export const msmModule1Slides = buildMsmModuleSlides(1)
export const msmModule2Slides = buildMsmModuleSlides(2)
export const msmModule3Slides = buildMsmModuleSlides(3)
export const msmModule4Slides = buildMsmModuleSlides(4)
export const msmModule5Slides = buildMsmModuleSlides(5)

export const MSM_SIGNATURE_AUDIT = {
  1: auditSignatures(msmModule1Slides),
  2: auditSignatures(msmModule2Slides),
  3: auditSignatures(msmModule3Slides),
  4: auditSignatures(msmModule4Slides),
  5: auditSignatures(msmModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(MSM_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[MSM uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[MSM visual coverage]', Object.fromEntries(gaps))
}

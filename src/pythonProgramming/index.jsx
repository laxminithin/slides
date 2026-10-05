import './py.css'
import { auditSignatures } from './PyKit.jsx'
import { buildPyModuleSlides } from './buildSlides.jsx'
import { visualCoverage } from './PyScenes.jsx'
import { COURSE, MODULES } from './curriculum.js'

export { COURSE as PY_COURSE, MODULES as PY_MODULES }

export const pyModule1Slides = buildPyModuleSlides(1)
export const pyModule2Slides = buildPyModuleSlides(2)
export const pyModule3Slides = buildPyModuleSlides(3)
export const pyModule4Slides = buildPyModuleSlides(4)
export const pyModule5Slides = buildPyModuleSlides(5)

export const PY_SIGNATURE_AUDIT = {
  1: auditSignatures(pyModule1Slides),
  2: auditSignatures(pyModule2Slides),
  3: auditSignatures(pyModule3Slides),
  4: auditSignatures(pyModule4Slides),
  5: auditSignatures(pyModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(PY_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[PY uniqueness]', Object.fromEntries(bad))

  // Any unit falling back to the generic term board is a gap worth seeing.
  const gaps = MODULES.map((m) => [m.n, visualCoverage(m.units)]).filter(([, c]) => c.mapped < c.total)
  if (gaps.length) console.warn('[PY visual coverage]', Object.fromEntries(gaps))
}

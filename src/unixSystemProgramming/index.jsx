import './unix.css'
import { auditSignatures } from './UnixKit.jsx'
import { buildUnixModuleSlides } from './buildSlides.jsx'

export const unixModule1Slides = buildUnixModuleSlides(1)
export const unixModule2Slides = buildUnixModuleSlides(2)
export const unixModule3Slides = buildUnixModuleSlides(3)
export const unixModule4Slides = buildUnixModuleSlides(4)
export const unixModule5Slides = buildUnixModuleSlides(5)

export const UNIX_SIGNATURE_AUDIT = {
  1: auditSignatures(unixModule1Slides),
  2: auditSignatures(unixModule2Slides),
  3: auditSignatures(unixModule3Slides),
  4: auditSignatures(unixModule4Slides),
  5: auditSignatures(unixModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(UNIX_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length || a.familyRuns.length,
  )
  if (bad.length) console.warn('[USP uniqueness]', Object.fromEntries(bad))
}

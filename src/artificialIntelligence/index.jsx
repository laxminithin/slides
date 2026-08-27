import './ai.css'
import { auditSignatures } from './AiKit.jsx'
import { aiModule1Slides } from './module1.jsx'
import { aiModule2Slides } from './module2.jsx'
import { aiModule3Slides } from './module3.jsx'
import { aiModule4Slides } from './module4.jsx'
import { aiModule5Slides } from './module5.jsx'

export {
  aiModule1Slides,
  aiModule2Slides,
  aiModule3Slides,
  aiModule4Slides,
  aiModule5Slides,
}

export const AI_SIGNATURE_AUDIT = {
  1: auditSignatures(aiModule1Slides),
  2: auditSignatures(aiModule2Slides),
  3: auditSignatures(aiModule3Slides),
  4: auditSignatures(aiModule4Slides),
  5: auditSignatures(aiModule5Slides),
}

if (import.meta.env?.DEV) {
  const bad = Object.entries(AI_SIGNATURE_AUDIT).filter(
    ([, a]) => a.identicalPairs.length || a.threeSlideFails.length,
  )
  if (bad.length) {
    console.warn('[AI uniqueness]', Object.fromEntries(bad))
  }
}

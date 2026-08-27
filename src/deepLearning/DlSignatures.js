/**
 * Deep Learning V2.0 — Visual Signatures
 * One signature per slide ID. Uniqueness enforced on
 * (family, mode, composition, camera, action).
 */
import signatures from './data/dlSignatures.json' with { type: 'json' }

export const DL_VISUAL_SIGNATURES = signatures

export function getDlSignature(slideId) {
  return DL_VISUAL_SIGNATURES[slideId] || null
}

export function signatureTuple(sig) {
  if (!sig) return null
  return [sig.family, sig.mode, sig.composition, sig.camera, sig.action]
}

/** Soft composition key for 3-slide window checks */
export function compositionKey(sig) {
  if (!sig) return null
  return `${sig.family}|${sig.mode}|${sig.composition}`
}

export function auditRepetition(slideIds) {
  const fails = []
  const pairs = []
  for (let i = 0; i < slideIds.length - 1; i += 1) {
    const a = getDlSignature(slideIds[i])
    const b = getDlSignature(slideIds[i + 1])
    if (JSON.stringify(signatureTuple(a)) === JSON.stringify(signatureTuple(b))) {
      pairs.push([slideIds[i], slideIds[i + 1]])
    }
  }
  for (let i = 0; i < slideIds.length - 2; i += 1) {
    const a = compositionKey(getDlSignature(slideIds[i]))
    const b = compositionKey(getDlSignature(slideIds[i + 1]))
    const c = compositionKey(getDlSignature(slideIds[i + 2]))
    if (a && a === b && b === c) fails.push([slideIds[i], slideIds[i + 1], slideIds[i + 2]])
  }
  return { threeSlideFails: fails, identicalPairs: pairs }
}

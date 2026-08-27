import { isInternalTeachingLabel, studentFacingTitle } from './firstYearSourceLabels.js'

const GENERIC_BLOCK_RE = /(^\d+\.\s*)?(concept structure|application, confusion, exam view|why this topic matters)|explains one necessary part of|every major syllabus topic is expanded through purpose|a complete answer defines the topic, shows the mechanism|teaching journey for the module|concept \+ mechanism \+ worked explanation|when a problem asks students to explain, compute, design, compare, or justify|becomes teachable when students see the problem, algorithm, code fragment|pasting code without explaining data flow, control flow|module concept map|define using the syllabus context and one example|prepare a labeled board version for exams|labeled example and exam-ready conclusion|no repository-verified vtu previous-year/i

const PROCESS_ONLY_RE = /^(input\/source|component role|circuit\/system law|waveform\/output|physical setup|observable quantity|governing law|graph\/equation|engineering meaning)$/i

export function isGenericSourceBlock(block) {
  const title = String(block?.title || '')
  const blob = `${title}\n${block?.explanation || ''}\n${(block?.points || []).join('\n')}`
  if (/^\d+\.\s*(concept structure|application, confusion, exam view)$/i.test(title.trim())) return true
  const points = block?.points || []
  if (points.length && points.every((point) => PROCESS_ONLY_RE.test(String(point).trim()))) return true
  const specific = points.filter((point) => {
    const line = String(point || '')
    if (line.length < 28) return false
    if (GENERIC_BLOCK_RE.test(line)) return false
    if (PROCESS_ONLY_RE.test(line.trim())) return false
    if (isInternalTeachingLabel(line)) return false
    return true
  })
  if (cleanEnough(block?.explanation) && specific.length) return false
  return (GENERIC_BLOCK_RE.test(blob) && specific.length === 0) || (!title && specific.length === 0)
}

function cleanEnough(text) {
  return String(text || '').replace(/\s+/g, ' ').trim().length >= 24
}

export function usableSourceBlocks(sourceDepth) {
  return (sourceDepth?.blocks || []).filter((block) => {
    if (isGenericSourceBlock(block)) return false
    return Boolean(studentFacingTitle(block))
  })
}

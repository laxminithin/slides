import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const REPORT = path.join(ROOT, 'FIRST_YEAR_PPTX_DEPTH_FINALIZATION_REPORT.json')
const OUT = path.join(ROOT, 'src', 'firstYearDepthContent.js')

const phaseCodes = new Set([
  '1BMATC101', '1BMATC201', '1BMATE101', '1BMATE201', '1BMATM101', '1BMATM201', '1BMATS101', '1BMATS201',
  '1BCHEC102/202', '1BCHEE102/202', '1BCHEM102/202', '1BEBT105/205', '1BECHE105/205',
  '1BPHEC102/202', '1BPHEE102/102', '1BPHYC102/202', '1BPHYM102/202', '1BPHYS102/202', '1BSSA105/205',
  '1BAIA103/203', '1BEIT105/205', '1BESC104E', '1BPLC105B/205B', '1BPLC205E/105E',
  '1BBEE105/205', '1BCEDC103/203', '1BCEDE103/203', '1BCEDEC103/203', '1BCEDM103/203', '1BCEDS103/203',
  '1BCIV105/205', '1BEAE105/205', '1BECE105/205', '1BEME105/205',
  '1BESC104A/204A', '1BESC104B/204B', '1BESC104C/204C', '1BESC104D/204D',
  '1BBEEL107', '1BECEL107', '1BEMEL105', '1BENGL106', '1BICO107/207', '1BIDTL158',
  '1BKBK109', '1BKSK109', '1BMEML107/207', '1BPOPL107/207', '1BPRJ258', '1BSKS106/206',
])

const skip = new Set([
  'module', 'module 1', 'module 2', 'module 3', 'module 4', 'module 5',
  'problem', 'foundation', 'mechanism', 'worked example', 'application',
  'physical setup', 'observable quantity', 'governing law', 'graph/equation',
  'engineering meaning', 'classroom explanation', 'check question', 'part',
  'syllabus topic', 'treatment', 'define input', 'write algorithm',
  'official syllabus topic map', 'key terms before detailed teaching',
  'common mistake', 'common mistakes and corrections', 'input', 'output',
  'exam view', 'exam takeaway', 'motivation', 'variables', 'decision/loop',
  'input explains one necessary part', 'teaching journey for the module',
  'state update', 'key definitions', 'practice questions', 'note on pyqs',
  'important formulae / diagrams / algorithms',
  'textbook and source mapping', 'prescribed source', 'pptx treatment',
  'expanded in topic teaching cluster', 'concept', 'example', 'recap',
  'draw setup', 'mark variables', 'apply law', 'compute value', 'interpret physically',
  'draw block/circuit', 'mark current/signal path', 'apply relation', 'calculate/compare',
  'read waveform', 'lecturer writes', 'student checks', 'known information',
  'intermediate working', 'meaning of result', 'step', 'aim', 'setup', 'procedure',
  'observe', 'viva', 'theory', 'tools and setup', 'observation table', 'result',
  'input/source', 'component role', 'circuit/system law', 'waveform/output',
  'model/geometry', 'working principle', 'state design task', 'draw/label model',
  'apply rule', 'work a small case', 'check feasibility', 'problem',
  'formula or theorem', 'substitution', 'interpretation', 'required result', 'given data',
])

const CHROME_RE = new RegExp([
  '^slide\\s*\\d+$', '^page\\s*\\d+$', '^\\d+\\/\\d+$',
  '^1b[a-z0-9]+(?:\\/\\d+)?(?:\\s*\\|\\s*(?:module|experiment|unit|stage)\\s*\\d+)?$',
  'depth pass:', 'source basis:', 'no local prescribed textbook',
  'official syllabus topic map', '^what is given\\?$',
  '^how does this step change the result\\?$',
  '^\\d+\\.\\s*why this topic matters$', '^why this topic matters$',
  'define using the syllabus context and one example',
  'prepare a labeled board version for exams and classroom explanation',
  'with a labeled example and exam-ready conclusion',
  '^state update$', '^key definitions$', '^important formulae / diagrams / algorithms$',
  '^practice questions$', '^note on pyqs$',
  'no repository-verified vtu previous-year question source',
  '^1\\. explain .+ with a labeled example', '^module concept map$',
  'when a problem asks students to explain, compute, design, compare, or justify',
  'pasting code without explaining data flow, control flow',
  'becomes teachable when students see the problem, algorithm, code fragment',
  'problem or need\\s+core ideas\\s+mechanism',
  'use diagrams, units, intermediate steps, or scenario context',
  'naming components without explaining their effect on voltage, current, signal, or power',
  'leaving the diagram, assumptions, units, or construction sequence unlabeled',
  'jumping from theorem to answer without showing conditions',
  'memorizing the final formula without identifying what changes',
  'listing uses without explaining the structure-property',
  'the method gives a dependable way to translate',
  'connect the idea to the module',
  'writing abstract definitions without a situation, example, or professional consequence',
  '^\\d+\\.\\s*concept structure$', '^concept structure$',
  '^\\d+\\.\\s*application, confusion, exam view$', '^application, confusion, exam view$',
  '^board-work expansion:',
  'explains one necessary part of',
  'every major syllabus topic is expanded through purpose',
  'teaching journey for the module',
  'a complete answer defines the topic, shows the mechanism',
  'students should be able to define, connect, and a',
  '^concept \\+ mechanism \\+ worked explanation',
  'topics are scoped to the o',
  'source teaching block', 'final pptx teaching block',
  'pptx teaching depth', 'pptx depth block',
  '^prescribed source$', '^pptx treatment$', '^expanded in topic teaching cluster$',
  'chapter \\d+\\s*\\(', '^\\d[\\d.\\-,\\s]*\\)\\s*,\\s*chapter',
  'number of hours:', '^textbook \\d+:',
  'hours of pedagogy', 'hours theory', 'hours tutorials',
  '^tools and setup$', '^algorithm / circuit / setup$',
  '^observation table$', '^common errors$', '^precautions$',
].join('|'), 'i')

const SCAFFOLD_HEADING_RE = /^(?:\d+\.\s*)?(concept structure|application, confusion, exam view|why this topic matters|worked teaching sequence|module concept map|key definitions|practice questions|note on pyqs|important formulae(?: \/ diagrams \/ algorithms)?|textbook and source mapping|official syllabus topic map|teaching journey for the module|key terms before detailed teaching|common mistakes and corrections|tools and setup|algorithm \/ circuit \/ setup)$/i

const GENERIC_TAIL_RE = /\s*(?:when a problem asks students to explain, compute, design, compare, or justify a result\.?|becomes teachable when students see the problem, algorithm, code fragment, dry run, and output together\.?|is best understood by tracing signal\/current path, component role, waveform, and result\.?|connect the idea to the module problem before definitions\.?|students should be able to say what changes, what is measured, and why the result matters\.?)$/i

const PROCESS_CHROME = /trace variables|map trace to code|predict output|lecturer writes|student checks|draw block\/circuit|mark current\/signal path|apply relation|calculate\/compare|read waveform|known information|draw setup|mark variables|apply law|compute value|interpret physically|input\/source|component role|circuit\/system law|waveform\/output/

function clean(text) {
  return String(text || '')
    .replace(/\s+/g, ' ')
    .replace(/[•●]/g, '')
    .replace(/\u0000/g, '')
    .trim()
}

function repairSourceTypos(text) {
  return clean(text)
    .replace(/\bC circuits:/g, 'DC circuits:')
    .replace(/\bBroadneing\b/g, 'Broadening')
    .replace(/\bCoulombs law\b/gi, "Coulomb's law")
    .replace(/\bNerns['’]t\b/g, 'Nernst')
    .replace(/\bsignifi-\s*cance\b/gi, 'significance')
    .replace(/\bKnowledge -Based\b/g, 'Knowledge-Based')
}

const HOURS_BANNER_RE = /\(\s*\d+\s*hours?\s+of\s+pedagogy\s*\)(?:\s*\d+)?|\(\s*\d+\s*hours?\s+theory(?:\s*\+\s*\d+\s*hours?\s+tutorials?)?\s*\)|\d+\s*hours?\s+theory(?:\s*\+\s*\d+\s*hours?\s+tutorials?)?/gi

function isHoursChrome(text) {
  const t = clean(text)
  if (!t) return true
  if (/hours?\s+of\s+pedagogy/i.test(t) && t.replace(HOURS_BANNER_RE, '').replace(/\d+/g, '').trim().length < 8) return true
  if (/^\d+\s*hours?\s+(theory|tutorial|pedagogy)/i.test(t)) return true
  return false
}

function stripHoursBanner(text) {
  const original = repairSourceTypos(text)
  const afterParen = original.match(/hours?[^)]*\)\s+([A-Za-z\u0C80-\u0CFF].+)$/i)
  if (afterParen && afterParen[1].trim().length >= 8 && !isHoursChrome(afterParen[1])) {
    return clean(afterParen[1])
  }
  const stripped = original
    .replace(/\(\s*\d+\s*hours?\s+of\s+pedagogy\s*\)(?:\s*\d+)?/gi, ' ')
    .replace(/\(\s*\d+\s*hours?\s+theory[^)]*\)?/gi, ' ')
    .replace(/\d+\s*hours?\s+theory(?:\s*\+\s*\d+(?:\s*hours?\s+tutorials?)?)?/gi, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/[()+\-–]+$/g, '')
    .trim()
  if (isHoursChrome(stripped) || stripped.length < 8) return ''
  return stripped
}

function meaningful(text) {
  const t = clean(text)
  if (t.length < 8) return false
  if (skip.has(t.toLowerCase())) return false
  if (CHROME_RE.test(t)) return false
  if (/^->+$/.test(t)) return false
  return true
}

function splitParts(text) {
  const source = repairSourceTypos(text).replace(/\.{2,}$/, '').trim()
  if (!source) return []
  const parts = []
  let buf = ''
  let depth = 0
  for (const ch of source) {
    if (ch === '(') depth += 1
    if (ch === ')') depth = Math.max(0, depth - 1)
    if ((ch === ',' || ch === ';') && depth === 0) {
      const part = clean(buf).replace(/^and\s+/i, '')
      if (part.length >= 8 && !skip.has(part.toLowerCase()) && !SCAFFOLD_HEADING_RE.test(part)) parts.push(part)
      buf = ''
    } else {
      buf += ch
    }
  }
  const last = clean(buf).replace(/^and\s+/i, '')
  if (last.length >= 8 && !skip.has(last.toLowerCase()) && !SCAFFOLD_HEADING_RE.test(last)) parts.push(last)
  return parts
}

function clipAtWord(text, max = 72) {
  const t = repairSourceTypos(text).replace(/\.{2,}$/, '').replace(/[,:;]+$/, '').trim()
  if (!t) return ''
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  const at = Math.max(cut.lastIndexOf(' —'), cut.lastIndexOf(':'), cut.lastIndexOf(','), cut.lastIndexOf(' - '))
  if (at >= 28) return cut.slice(0, at).trim()
  const space = cut.lastIndexOf(' ')
  return (space > 24 ? cut.slice(0, space) : cut).trim()
}

function readableTitle(heading, max = 72) {
  let text = stripHoursBanner(heading)
    .replace(/^board-work expansion:\s*/i, '')
    .replace(/^use\s+/i, '')
    .replace(/\s+when a problem asks.*$/i, '')
    .replace(/\s*Textbook-\d+:.*$/i, '')
    .replace(/\s*Chapter-\s*\d+.*$/i, '')
    .replace(/\.{2,}$/, '')
    .trim()
  if (!text || isHoursChrome(text)) return ''
  const colon = text.indexOf(':')
  if (colon > 2 && colon < 64) {
    const left = text.slice(0, colon).trim()
    let rest = text.slice(colon + 1).trim()
    if (rest.toLowerCase().startsWith(left.toLowerCase())) {
      rest = rest.slice(left.length).replace(/^[\s,:\-—]+/, '')
    }
    const parts = splitParts(rest.length >= 8 ? rest : text)
    if (parts.length) {
      const pair = parts.slice(0, 2)
      const joined = pair.join(' — ')
      if (joined.length <= max) return joined
      return clipAtWord(parts[0], max)
    }
    if (rest.length >= 12 && rest.length <= max) return rest
    if (left.length >= 12) return clipAtWord(left, max)
  }
  const andApp = text.match(/^(.*?)(?:\s+and its application.*)$/i)
  if (andApp && andApp[1].length >= 16) return clipAtWord(andApp[1], max)
  return clipAtWord(text, max)
}

function isChromeHeading(line, subjectTitle = '') {
  const t = clean(line)
  if (!t) return true
  if (isHoursChrome(t)) return true
  const subject = clean(subjectTitle)
  if (subject) {
    const s = subject.toLowerCase()
    const n = t.toLowerCase()
    if (n === s) return true
    if (s.startsWith(n) && n.length >= Math.min(18, s.length - 2)) return true
    if (n.startsWith(s.replace(/[()]+$/g, '').trim()) && n.length <= s.length + 8) return true
  }
  if (/^1b[a-z0-9]+(?:\/[a-z0-9]+)?(?:\s*\|)/i.test(t)) return true
  if (/^(module|experiment|unit|stage)\s+\d+$/i.test(t)) return true
  return false
}

function dropIncompleteTail(text) {
  return clean(text)
    .replace(/\.{2,}$/, '')
    .replace(/\s+and it$/i, ' and its application')
    .replace(/\s+and its$/i, ' and its application')
    .replace(/\s+[A-Za-z]{1,3}$/g, '')
    .replace(/\s+(and|of|the|to|for|its)$/i, '')
    .trim()
}

function headingOf(slide, subjectTitle = '') {
  const lines = (slide.lines || []).map(repairSourceTypos)
  const candidates = []
  for (const line of lines) {
    if (!/[A-Za-z\u0C80-\u0CFF]/.test(line)) continue
    if (skip.has(line.toLowerCase())) continue
    const normalized = stripHoursBanner(line)
    if (!normalized) continue
    if (isChromeHeading(normalized, subjectTitle)) continue
    if (isHoursChrome(normalized)) continue
    if (CHROME_RE.test(normalized) && !/^board-work expansion:/i.test(normalized)) continue
    if (SCAFFOLD_HEADING_RE.test(normalized)) continue
    if (/chapter\s+\d+/i.test(normalized) && /textbook|prescribed|\d-\d/.test(normalized.toLowerCase())) continue
    if (/connects an engineering model|becomes teachable when|students should be able to say what changes|connect the idea to the module|is best understood by tracing/i.test(normalized)) continue
    if (normalized.length >= 8) candidates.push(normalized)
  }
  const titled = candidates.filter((line) => line.length <= 110)
  const pool = titled.length ? titled : candidates
  const scored = [...pool].sort((a, b) => {
    const score = (line) => {
      let n = Math.min(line.length, 80)
      if (/matters because|connect the idea|students should be able|professional communication and ethics/i.test(line)) n -= 400
      if (subjectTitle && line.toLowerCase().startsWith(clean(subjectTitle).toLowerCase().slice(0, 16))) n -= 400
      return n
    }
    return score(b) - score(a)
  })
  return dropIncompleteTail(scored[0] || '')
}

function classifySlide(slide) {
  const heading = (slide.lines || []).find((line) => /[A-Za-z\u0C80-\u0CFF]/.test(line) && line.length >= 3 && !/^\d+\/\d+$/.test(line) && !/^1b[a-z0-9]/i.test(line)) || ''
  const h = clean(heading)
  if (/^module\s+\d+$/i.test(h) || /^experiment\s+\d+$/i.test(h) || /^stage\s+\d+$/i.test(h)) return 'opener'
  if (/teaching journey for the module/i.test(h)) return 'chrome'
  if (/official syllabus topic map/i.test(h)) return 'topic-map'
  if (/textbook and source mapping/i.test(h)) return 'chrome'
  if (/key terms before detailed teaching/i.test(h)) return 'chrome'
  if (/^practice questions$/i.test(h)) return 'chrome'
  if (/note on pyqs/i.test(h)) return 'chrome'
  if (/common mistakes and corrections/i.test(h)) return 'chrome'
  if (/important formulae/i.test(h)) return 'chrome'
  if (/^key definitions$/i.test(h)) return 'chrome'
  if (/module concept map/i.test(h)) return 'chrome'
  if (/why this topic matters/i.test(h)) return 'topic-why'
  if (/concept structure/i.test(h)) return 'topic-attach'
  if (/worked teaching sequence/i.test(h)) return 'topic-attach'
  if (/application, confusion, exam view/i.test(h)) return 'topic-exam'
  if (/board-work expansion:/i.test(h)) return 'topic-board'
  if (/^aim$/i.test(h)) return 'lab-aim'
  if (/^theory$/i.test(h)) return 'lab-theory'
  if (/tools and setup/i.test(h)) return 'lab-attach'
  if (/^procedure$/i.test(h)) return 'lab-attach'
  if (/algorithm \/ circuit \/ setup|observation table|^result$|^viva$|^recap$/i.test(h)) return 'lab-attach'
  return 'content'
}

function extractTopicMap(slides) {
  const map = slides.find((slide) => classifySlide(slide) === 'topic-map')
  if (!map) return []
  const topics = []
  for (const raw of map.lines || []) {
    const line = repairSourceTypos(raw)
    if (!meaningful(line)) continue
    if (isHoursChrome(line)) continue
    if (SCAFFOLD_HEADING_RE.test(line)) continue
    if (/^(syllabus topic|treatment|#|\d+)$/i.test(line)) continue
    if (/concept \+ mechanism/i.test(line)) continue
    if (/chapter\s+\d+/i.test(line)) continue
    if (line.length < 12) continue
    topics.push(line.replace(/\.{2,}$/, '').trim())
  }
  return topics
}

function topicFromSlide(slide, kind, subjectTitle = '') {
  const lines = (slide.lines || []).map(repairSourceTypos)
  const heading = headingOf(slide, subjectTitle)
  if (kind === 'topic-board') {
    const board = lines.find((line) => /board-work expansion:/i.test(line))
    if (board) {
      const extracted = dropIncompleteTail(stripHoursBanner(board.replace(/^board-work expansion:\s*/i, '')))
      if (extracted && !isHoursChrome(extracted)) {
        return extracted.length >= heading.length ? extracted : heading || extracted
      }
    }
  }
  if (heading.length >= 8) return heading
  if (kind === 'lab-aim' || kind === 'lab-theory' || kind === 'opener') {
    const long = lines.find((line) => line.length >= 40 && !CHROME_RE.test(line) && !/subject:|code:|depth pass/i.test(line) && !isChromeHeading(line, subjectTitle))
    if (long) return dropIncompleteTail(long)
  }
  const useLine = lines.find((line) => /^use\s+.+\s+when a problem asks/i.test(line))
  if (useLine) {
    return dropIncompleteTail(useLine.replace(/^use\s+/i, '').replace(/\s+when a problem asks.*$/i, ''))
  }
  const visualise = lines.find((line) => /physical behaviour behind/i.test(line))
  if (visualise) {
    const match = visualise.match(/behind\s+(.+?)\s+before using/i)
    if (match) return dropIncompleteTail(match[1])
  }
  return heading
}

function similarTopic(a, b) {
  const left = dropIncompleteTail(a).toLowerCase().slice(0, 28)
  const right = dropIncompleteTail(b).toLowerCase().slice(0, 28)
  return left.length >= 12 && right.length >= 12 && (left.startsWith(right.slice(0, 16)) || right.startsWith(left.slice(0, 16)))
}

function clusterSlides(slides, subjectTitle = '') {
  const clusters = []
  let current = null
  const startNew = (slide, kind, topicHint) => {
    current = {
      kind,
      topic: topicHint || topicFromSlide(slide, kind, subjectTitle),
      slides: [slide],
    }
    clusters.push(current)
  }
  for (const slide of slides) {
    const kind = classifySlide(slide)
    if (kind === 'chrome' || kind === 'opener' || kind === 'topic-map') continue
    if (kind === 'topic-board') {
      const topic = topicFromSlide(slide, kind, subjectTitle)
      const existing = clusters.find((cluster) => similarTopic(cluster.topic, topic))
      if (existing) existing.slides.push(slide)
      continue
    }
    if (kind === 'topic-why' || kind === 'lab-aim') {
      startNew(slide, kind, topicFromSlide(slide, kind, subjectTitle))
      continue
    }
    if (kind === 'lab-theory' && (!current || !String(current.kind).startsWith('lab'))) {
      startNew(slide, 'lab-theory', topicFromSlide(slide, kind, subjectTitle))
      continue
    }
    if (current && (kind.startsWith('topic-') || kind.startsWith('lab-') || kind === 'content')) {
      if (kind === 'content' && current.kind.startsWith('lab') && current.slides.length >= 4) {
        startNew(slide, 'content', topicFromSlide(slide, kind, subjectTitle))
        continue
      }
      current.slides.push(slide)
      const nextTopic = topicFromSlide(slide, kind, subjectTitle)
      if (!current.topic || (nextTopic && nextTopic.length > current.topic.length && similarTopic(current.topic, nextTopic))) {
        current.topic = nextTopic || current.topic
      }
      continue
    }
    if (kind === 'content') {
      const topic = topicFromSlide(slide, kind, subjectTitle)
      if (!topic || isChromeHeading(topic, subjectTitle)) continue
      startNew(slide, 'content', topic)
    }
  }
  return clusters.filter((cluster) => cluster.topic && cluster.slides.length)
}

function uniqueLines(lines) {
  const out = []
  for (const raw of lines) {
    const line = repairSourceTypos(raw).replace(/\.{2,}$/, '').trim()
    if (!line) continue
    const lower = line.toLowerCase()
    if (out.some((item) => item.toLowerCase() === lower)) continue
    if (out.some((item) => item.toLowerCase().startsWith(lower) && item.length > line.length + 8)) continue
    const shorter = out.findIndex((item) => lower.startsWith(item.toLowerCase()) && line.length > item.length + 8)
    if (shorter >= 0) {
      out[shorter] = line
      continue
    }
    out.push(line)
  }
  return out
}

function parenthetical(text) {
  const match = String(text || '').match(/\(([^)]{8,80})\)/)
  if (!match) return ''
  const value = clean(match[1])
  if (isHoursChrome(value) || /hours?\s+(of\s+pedagogy|theory|tutorial)/i.test(value)) return ''
  return value
}

function actionFor(text, family) {
  const lower = text.toLowerCase()
  if (/\b(printf|scanf|int main|def |python|program\b|for\s*\(|while\s*\(|pointer|dictionary|dry run)\b/.test(lower)) {
    return 'ADD CODE EXECUTION'
  }
  if (/algorithm|heuristic search|best-first|flowchart/.test(lower)) return 'ADD ALGORITHM TRACE'
  if (/\b(stack|heap|memory address|dereference)\b/.test(lower)) return 'ADD MEMORY VISUAL'
  if (/circuit|ohm|kirchhoff|current|voltage|polarity|diode|rectifier|transistor|op-amp|truth table/.test(lower)) {
    return family === 'engineering' ? 'CIRCUIT VISUAL' : 'ADD VISUAL'
  }
  if (/waveform|phasor|sinusoid|rms|frequency|phase|modulation|filter/.test(lower)) {
    return family === 'engineering' ? 'WAVEFORM' : 'ADD VISUAL'
  }
  if (/force|moment|friction|centroid|inertia|beam|reaction|free body|load path/.test(lower)) {
    return family === 'engineering' ? 'STRUCTURAL DIAGRAM' : 'ADD VISUAL'
  }
  if (/mechanism|gear|belt|lathe|engine|turbine|robot|projection|isometric|orthographic/.test(lower)) {
    return family === 'engineering' ? 'MECHANISM' : 'ADD ANIMATION'
  }
  if (/derive|derivation|prove|proof|schrodinger|schrödinger|laplace|interpolation/.test(lower)) {
    return family === 'math' ? 'ADD DERIVATION' : 'EXPAND EQUATION'
  }
  if (/example|numerical|evaluate|calculate/.test(lower) && family === 'math') return 'ADD EXAMPLE'
  if (/apparatus|experiment|procedure|observation/.test(lower) && family === 'remaining') return 'ADD APPARATUS'
  if (/dialogue|role play|interview|email|group discussion|etiquette|resume/.test(lower)) return 'SCENARIO'
  if (/constitution|preamble|fundamental right|directive principle|parliament|amendment/.test(lower)) return 'TIMELINE'
  if (/kannada|vachana|pronoun|tense|vocabulary|poem|prose|passage/.test(lower) || /[\u0C80-\u0CFF]/.test(text)) return 'LANGUAGE'
  if (/project|prototype|pitch|empathize|ideate|deliverable/.test(lower)) return 'PROJECT STAGE'
  if (/application|spectral lines|uses of|engineering meaning/.test(lower)) return 'ADD APPLICATION'
  return 'EXPAND'
}

function kindFor(action) {
  if (/CODE/.test(action)) return 'code'
  if (/ALGORITHM/.test(action)) return 'algorithm'
  if (/MEMORY/.test(action)) return 'memory'
  if (/CIRCUIT/.test(action)) return 'circuit'
  if (/WAVEFORM/.test(action)) return 'waveform'
  if (/STRUCTURAL|MECHANISM/.test(action)) return 'mechanism'
  if (/PROCESS/.test(action)) return 'process'
  if (/DERIVATION|EQUATION/.test(action)) return 'derivation'
  if (/EXAMPLE|NUMERICAL/.test(action)) return 'example'
  if (/VISUAL|APPARATUS|ANIMATION/.test(action)) return 'visual'
  if (/APPLICATION/.test(action)) return 'application'
  if (/SCENARIO/.test(action)) return 'scenario'
  if (/TIMELINE/.test(action)) return 'timeline'
  if (/LANGUAGE/.test(action)) return 'language'
  if (/PROJECT/.test(action)) return 'project'
  if (/APPARATUS|PROCEDURE/.test(action)) return 'lab'
  return 'explanation'
}

function buildTeaching(cluster, family, subjectTitle) {
  const heading = dropIncompleteTail(repairSourceTypos(cluster.topic))
  if (!heading || /source teaching block|final pptx teaching block/i.test(heading)) return []
  if (isChromeHeading(heading, subjectTitle) || isHoursChrome(heading)) return []
  const title = readableTitle(heading)
  if (!title || isChromeHeading(title, subjectTitle) || isHoursChrome(title)) return []
  const parts = splitParts(heading)
    .map((part) => part.replace(/^\d+\.\s*/, ''))
    .filter((part) => {
      const n = part.toLowerCase()
      if (n === title.toLowerCase()) return false
      if (subjectTitle && n === clean(subjectTitle).toLowerCase()) return false
      if (PROCESS_CHROME.test(n)) return false
      return part.length >= 8
    })
  const app = parenthetical(heading)
  const clusterText = cluster.slides.flatMap((slide) => slide.lines).map(repairSourceTypos).join('\n')
  const visualize = /physical behaviour behind/i.test(clusterText)
  const exam = /complete answer defines the topic/i.test(clusterText) || /application, confusion, exam view/i.test(clusterText)
  const lab = String(cluster.kind).startsWith('lab') || family === 'remaining' && /experiment/i.test(clusterText)

  const explanation = parts.length >= 2
    ? `${title} covers ${parts.slice(0, 3).join(', ')}${parts.length > 3 ? ', and the other named ideas in this heading' : ''}.`
    : app
      ? `${title} is taught together with its named application: ${app}.`
      : visualize
        ? `Visualize the physical behaviour behind ${title} before using an equation, then interpret what changed.`
        : lab
          ? `${title} is the experiment task. Keep aim, setup, procedure, observation and result as one sequence.`
          : `${title} is a named syllabus topic in this module and must be explained with its own setup, relation and interpretation.`

  const points = []
  const push = (line) => {
    const value = clean(line)
    if (value.length < 12) return
    if (isHoursChrome(value) || /hours?\s+of\s+pedagogy|\d+\s*hours?\s+theory/i.test(value)) return
    if (points.some((item) => item.toLowerCase() === value.toLowerCase())) return
    if (points.length >= 6) return
    points.push(value.length > 220 ? `${value.slice(0, 217)}...` : value)
  }

  if (lab) {
    push(heading.length > 24 ? heading : title)
    push(`Aim: state the measurable outcome for ${title} before touching apparatus or code.`)
    push(`Theory on this board stays attached to ${title}; do not replace the experiment sequence with a loose topic card.`)
    push(`Record the observation that verifies ${title}, then write the result in the same units as the aim.`)
  } else {
    for (const part of parts.slice(0, 5)) {
      push(`${part} is a required idea inside ${title}.`)
    }
    if (app && !points.some((item) => item.toLowerCase().includes(app.toLowerCase().slice(0, 18)))) {
      push(`Named application in this topic: ${app}.`)
    }
    if (visualize) {
      push(`Visualize the physical behaviour behind ${title} before using its equation.`)
    }
    if (exam) {
      push(`A complete answer defines ${title}, shows the working, includes a labeled example, and states the interpretation.`)
    }
    if (cluster.kind === 'topic-board') {
      push(`Board work for ${title}: mark the given, apply the relation named in the topic, then interpret the result.`)
    }
  }

  if (!points.length) push(`${title} must be taught as a named syllabus idea, not as a heading only.`)

  const sourceSlides = uniqueLines(cluster.slides.map((slide) => String(slide.slide))).map(Number).filter(Number.isFinite)
  sourceSlides.sort((a, b) => a - b)
  const action = actionFor([title, heading, ...parts, ...points].join(' '), family)
  const base = {
    sourceHeading: heading,
    explanation,
    action,
    kind: lab ? 'lab' : kindFor(action),
    sourceSlides,
    range: sourceSlides.length === 1 ? String(sourceSlides[0]) : `${sourceSlides[0]}-${sourceSlides.at(-1)}`,
    sourceBlockId: sourceSlides.length === 1 ? String(sourceSlides[0]) : `${sourceSlides[0]}-${sourceSlides.at(-1)}`,
  }

  if (parts.length > 4 && !lab) {
    const first = parts.slice(0, Math.ceil(parts.length / 2))
    const second = parts.slice(Math.ceil(parts.length / 2))
    const make = (slice, index) => {
      const sliceTitle = readableTitle(slice[0]) || title
      const slicePoints = []
      const add = (line) => {
        const value = clean(line)
        if (value.length >= 12 && slicePoints.length < 6) slicePoints.push(value)
      }
      for (const part of slice) add(`${part} is a required idea inside ${title}.`)
      add(explanation)
      if (exam) add(`A complete answer defines ${title}, shows the working, includes a labeled example, and states the interpretation.`)
      return {
        ...base,
        title: clipAtWord(sliceTitle, 72),
        explanation: `${sliceTitle} is one teaching scene split from ${title}.`,
        points: uniqueLines(slicePoints).slice(0, 6),
        splitReason: 'compound-heading',
        splitIndex: index,
      }
    }
    return [make(first, 1), make(second, 2)]
  }

  return [{
    ...base,
    title,
    points: uniqueLines(points).slice(0, 6),
  }]
}

function coverMissingTopics() {
  return []
}

async function readSlides(pptx) {
  const inspect = `${pptx}.inspect.ndjson`
  let raw
  try {
    raw = await fs.readFile(inspect, 'utf8')
  } catch (error) {
    if (error.code === 'ENOENT') return null
    throw error
  }
  const slides = new Map()
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue
    let row
    try {
      row = JSON.parse(line)
    } catch {
      continue
    }
    if (row.kind === 'slide' && Number.isFinite(row.slide)) {
      slides.set(row.slide, slides.get(row.slide) || [])
      continue
    }
    if (row.kind === 'textbox' && Number.isFinite(row.slide) && clean(row.text)) {
      const list = slides.get(row.slide) || []
      const text = repairSourceTypos(row.text)
      if (!list.some((item) => item.toLowerCase() === text.toLowerCase())) list.push(text)
      slides.set(row.slide, list)
    }
  }
  return [...slides.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([slide, lines]) => ({ slide, lines: lines.slice(0, 28) }))
}

function buildBlocks(slides, family, subjectTitle = '') {
  const topics = extractTopicMap(slides)
  const clusters = clusterSlides(slides, subjectTitle)
  const blocks = []
  const seen = new Set()
  const seenRanges = new Set()
  for (const cluster of clusters) {
    for (const block of buildTeaching(cluster, family, subjectTitle)) {
      const sig = `${block.title}::${block.points.slice(0, 3).join('|')}`.toLowerCase()
      if (seen.has(sig)) continue
      const rangeKey = (block.sourceSlides || []).join(',')
      if (rangeKey && seenRanges.has(rangeKey) && !block.splitReason) continue
      seen.add(sig)
      if (rangeKey) seenRanges.add(rangeKey)
      blocks.push(block)
    }
  }
  for (const block of coverMissingTopics(topics, blocks, family, subjectTitle)) {
    const sig = `${block.title}::${block.points.slice(0, 3).join('|')}`.toLowerCase()
    if (seen.has(sig)) continue
    seen.add(sig)
    blocks.push(block)
  }
  return blocks
}

const report = JSON.parse(await fs.readFile(REPORT, 'utf8'))
const modules = {}
for (const row of report.moduleRows) {
  if (!phaseCodes.has(row.code)) continue
  const match = row.module.match(/(\d+)/)
  if (!match) continue
  const moduleNumber = Number(match[1])
  const family = /^1BMAT/.test(row.code)
    ? 'math'
    : /1BAIA|1BEIT|1BESC104E|1BPLC/.test(row.code)
      ? 'programming'
      : /1BBEE|1BCED|1BCIV|1BEAE|1BECE|1BEME|1BESC104A|1BESC104B|1BESC104C|1BESC104D/.test(row.code)
        ? 'engineering'
        : /1BBEEL|1BECEL|1BEMEL|1BENGL|1BICO|1BIDTL|1BKBK|1BKSK|1BMEML|1BPOPL|1BPRJ|1BSKS/.test(row.code)
          ? 'remaining'
          : 'science'
  const slides = await readSlides(row.pptx)
  if (!slides) continue
  modules[`${row.code}|${moduleNumber}`] = {
    subject: row.subject,
    code: row.code,
    module: row.module,
    pptxSlides: row.after,
    previousPptxSlides: row.before,
    pptxSlidesAdded: row.added,
    sourcePptx: path.relative(ROOT, row.pptx),
    textbookSections: row.textbookSections,
    family,
    blocks: buildBlocks(slides, family, row.subject),
  }
}

const header = `// Generated by scripts/build-first-year-depth-content.mjs from finalized PPTX inspection files.\n// Do not hand-edit teaching blocks here; regenerate from First_Year_PPTX/*.inspect.ndjson.\n\n`
await fs.writeFile(OUT, `${header}export const firstYearDepthModules = ${JSON.stringify(modules, null, 2)}\n`)
console.log(JSON.stringify({ out: OUT, modules: Object.keys(modules).length, blocks: Object.values(modules).reduce((sum, item) => sum + item.blocks.length, 0) }, null, 2))

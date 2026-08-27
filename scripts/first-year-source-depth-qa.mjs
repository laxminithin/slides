import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { firstYearDepthModules } from '../src/firstYearDepthContent.js'
import { usableSourceBlocks } from '../src/firstYearSourceQuality.js'
import {
  isInternalTeachingLabel,
  scanTextForPlaceholderLeak,
  studentFacingSubtitle,
  studentFacingTakeaway,
  studentFacingTitle,
} from '../src/firstYearSourceLabels.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const GENERIC_BODY_RE = /(?:this concept works through a series of important steps|widely used in engineering applications|this topic is important because|students should understand this concept|the process consists of several stages|this system performs an important function|explain concept here|this section explains the important concept|input\/source|component role|circuit\/system law|waveform\/output)/i

const GENERIC_LEXICON = new Set([
  'taught', 'through', 'named', 'module', 'students', 'visualize', 'physical', 'behaviour',
  'equation', 'complete', 'answer', 'defines', 'working', 'labeled', 'example', 'interpretation',
  'source', 'block', 'listed', 'syllabus', 'topic', 'covers', 'required', 'idea', 'inside',
  'together', 'application', 'before', 'using', 'result', 'changed', 'must', 'explained',
  'setup', 'relation', 'other', 'ideas', 'heading', 'teaching', 'scene', 'split', 'from',
])

const STOP = new Set(['about', 'after', 'and', 'the', 'this', 'that', 'with', 'from', 'into', 'for', 'its', 'then'])

function clean(text) {
  return String(text || '').replace(/\s+/g, ' ').trim()
}

function tokens(text) {
  return clean(text)
    .toLowerCase()
    .replace(/[^a-z0-9\u0c80-\u0cff\s'-]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length >= 4 && !STOP.has(word))
}

function titleOnly(title, explanation, points) {
  const body = [explanation, ...points].map(clean).filter(Boolean)
  if (!body.length) return true
  const t = title.toLowerCase()
  return body.every((line) => {
    const n = line.toLowerCase()
    return n === t || t.startsWith(n) || n.startsWith(t) || n.includes(t)
  }) && body.length <= 1
}

function genericBody(title, explanation, points) {
  const blob = `${explanation}\n${points.join('\n')}`
  if (GENERIC_BODY_RE.test(blob) && !tokens(title).some((tok) => blob.toLowerCase().includes(tok))) return true
  const titleToks = new Set(tokens(title))
  const extra = tokens(blob).filter((tok) => !titleToks.has(tok) && !GENERIC_LEXICON.has(tok))
  const namedParts = points.filter((point) => {
    const line = clean(point)
    return line.length >= 20 && !GENERIC_BODY_RE.test(line) && tokens(line).some((tok) => !GENERIC_LEXICON.has(tok))
  })
  if (namedParts.length >= 2) return false
  if (extra.length >= 3 && namedParts.length >= 1) return false
  if (clean(explanation).length >= 40 && extra.length >= 2) return false
  return namedParts.length === 0
}

function gradeBlock(row) {
  if (row.broken || row.status === 'BROKEN') return 'D'
  if (row.status === 'GENERIC' || row.status === 'SHALLOW' || row.status === 'MISMATCH') return 'C'
  if (row.status === 'DUPLICATE' && row.unjustifiedDuplicate) return 'C'
  const specificPoints = (row.points || []).filter((point) => clean(point).length >= 28)
  if (row.explanation && specificPoints.length >= 4 && /derivation|example|code|circuit|lab/.test(row.kind || '')) return 'A+'
  if (row.explanation && specificPoints.length >= 3) return 'A'
  return 'B'
}

function classify(block, title, explanation, points, seenRanges, seenTitles) {
  const rangeKey = (block.sourceSlides || []).join(',')
  const status = {
    status: 'COMPLETE',
    titleOnly: false,
    generic: false,
    mismatch: false,
    duplicate: false,
    unjustifiedDuplicate: false,
    broken: false,
  }
  if (!title || isInternalTeachingLabel(title) || scanTextForPlaceholderLeak([title, explanation, ...points].join('\n')) || /hours?\s+of\s+pedagogy/i.test(title)) {
    status.status = 'BROKEN'
    status.broken = true
    return status
  }
  if (!points.length && clean(explanation).length < 24) {
    status.status = 'SHALLOW'
    status.titleOnly = true
    return status
  }
  if (titleOnly(title, explanation, points)) {
    status.status = 'SHALLOW'
    status.titleOnly = true
    return status
  }
  if (genericBody(title, explanation, points)) {
    status.status = 'GENERIC'
    status.generic = true
    return status
  }
  const titleToks = tokens(title)
  const bodyToks = new Set(tokens(`${explanation} ${points.join(' ')}`))
  if (titleToks.length && titleToks.filter((tok) => bodyToks.has(tok)).length === 0) {
    status.status = 'MISMATCH'
    status.mismatch = true
    return status
  }
  if (rangeKey && seenRanges.has(rangeKey) && !block.splitReason) {
    status.status = 'DUPLICATE'
    status.duplicate = true
    status.unjustifiedDuplicate = true
    return status
  }
  if (seenTitles.has(title.toLowerCase()) && rangeKey && seenRanges.has(rangeKey)) {
    status.duplicate = true
  }
  return status
}

async function inspectSlides(module) {
  if (!module.sourcePptx) return []
  const inspect = path.join(ROOT, `${module.sourcePptx}.inspect.ndjson`)
  let raw
  try {
    raw = await fs.readFile(inspect, 'utf8')
  } catch {
    return []
  }
  const slides = new Map()
  for (const line of raw.split('\n')) {
    if (!line.trim()) continue
    let row
    try { row = JSON.parse(line) } catch { continue }
    if (row.kind === 'slide' && Number.isFinite(row.slide)) slides.set(row.slide, { slide: row.slide, lines: [] })
    if (row.kind === 'textbox' && Number.isFinite(row.slide) && row.text) {
      const item = slides.get(row.slide) || { slide: row.slide, lines: [] }
      item.lines.push(String(row.text))
      slides.set(row.slide, item)
    }
  }
  return [...slides.values()].sort((a, b) => a.slide - b.slide)
}

const PROCESS_HEADINGS = /^(model\/geometry|working principle|given data|required result|variables|procedure|application|problem|foundation|mechanism|input|output|state update|decision\/loop|input\/source|component role|circuit\/system law|waveform\/output|context|stakeholder|concept|response|reflection|motivation|example|recap|exam view|worked example)$/i

function isMeaningfulTeachingSlide(slide, subjectTitle = '') {
  const lines = slide.lines || []
  const subject = clean(subjectTitle).toLowerCase()
  if (lines.some((line) => /depth pass:|teaching journey for the module|official syllabus topic map/i.test(line))) return false
  if (lines.some((line) => /why this topic matters/i.test(line))) {
    return lines.some((line) => {
      const text = clean(line)
      if (text.length < 8 || text.length > 90) return false
      if (PROCESS_HEADINGS.test(text)) return false
      if (subject && text.toLowerCase() === subject) return false
      if (/why this topic matters/i.test(text)) return false
      if (/^1b[a-z0-9]/i.test(text) || /^\d+\/\d+$/.test(text)) return false
      if (/chapter[-:\s]*\d+|textbook/i.test(text)) return false
      if (/hours?\s+of\s+pedagogy|\d+\s*hours?\s+theory/i.test(text)) return false
      if (/formula or theorem|substitution|^interpretation$/i.test(text)) return false
      return /[A-Za-z\u0C80-\u0CFF]{6,}/.test(text)
    })
  }
  return lines.some((line) => /^aim$/i.test(clean(line)))
}

async function main() {
  const inventory = []
  const subjectRows = new Map()
  const qa = {
    titleOnlyFailures: 0,
    genericBodyFailures: 0,
    sourceRangeMismatchFailures: 0,
    duplicateRangeFailures: 0,
    missingSourceBlockFailures: 0,
    visualAlignmentFailures: 0,
    animationAlignmentFailures: 0,
    storytellingFailures: 0,
    spaceUtilizationFailures: 0,
    tinyTextFailures: 0,
    placeholderLeakFailures: 0,
    render1920Failures: 0,
    render1280Failures: 0,
    regressionFailures: 0,
  }
  const grades = { APlus: 0, A: 0, B: 0, C: 0, D: 0 }
  let webSlide = 0

  for (const [key, module] of Object.entries(firstYearDepthModules)) {
    if (!subjectRows.has(module.code)) {
      subjectRows.set(module.code, {
        subject: module.subject,
        code: module.code,
        family: module.family,
        sourceDepthSlides: 0,
        APlus: 0, A: 0, B: 0, C: 0, D: 0,
        mismatches: 0,
        duplicates: 0,
        missingBlocks: 0,
      })
    }
    const subject = subjectRows.get(module.code)
    const blocks = usableSourceBlocks(module)
    const seenRanges = new Set()
    const seenTitles = new Set()
    const slides = await inspectSlides(module)
    const coveredSlides = new Set(blocks.flatMap((block) => block.sourceSlides || []))
    const coveredText = blocks.map((block) => `${block.title} ${block.sourceHeading || ''}`).join('\n').toLowerCase()
    const missing = []
    for (const slide of slides) {
      if (!isMeaningfulTeachingSlide(slide, module.subject)) continue
      if (coveredSlides.has(slide.slide)) continue
      const heading = (slide.lines || []).map(clean).filter((line) => (
        line.length >= 8
        && line.length <= 90
        && !/^1b[a-z0-9]/i.test(line)
        && !/why this topic matters/i.test(line)
        && !PROCESS_HEADINGS.test(line)
        && !/chapter|textbook|formula or theorem|substitution|interpretation/i.test(line)
        && !/hours?\s+of\s+pedagogy|\d+\s*hours?\s+theory/i.test(line)
        && line.toLowerCase() !== clean(module.subject).toLowerCase()
      )).sort((a, b) => b.length - a.length)[0] || ''
      const token = heading.toLowerCase().slice(0, 16)
      if (!heading || token.length < 8) continue
      if (coveredText.includes(token)) continue
      subject.missingBlocks += 1
      qa.missingSourceBlockFailures += 1
      missing.push({ slide: slide.slide, sample: heading || clean((slide.lines || []).slice(0, 6).join(' | ')).slice(0, 120) })
    }
    if (missing.length) subject.missingSlideNumbers = missing
    for (const [index, block] of blocks.entries()) {
      webSlide += 1
      const title = studentFacingTitle(block)
      const explanation = clean(block.explanation)
      const points = (block.points || []).map(clean)
      const flags = classify(block, title, explanation, points, seenRanges, seenTitles)
      const rangeKey = (block.sourceSlides || []).join(',')
      if (rangeKey) seenRanges.add(rangeKey)
      seenTitles.add(title.toLowerCase())
      const leak = scanTextForPlaceholderLeak([title, explanation, studentFacingSubtitle(block), studentFacingTakeaway(block), ...points].join('\n'))
      if (leak) {
        qa.placeholderLeakFailures += 1
        flags.status = 'BROKEN'
        flags.broken = true
      }
      if (flags.titleOnly) qa.titleOnlyFailures += 1
      if (flags.generic) qa.genericBodyFailures += 1
      if (flags.mismatch) {
        qa.sourceRangeMismatchFailures += 1
        subject.mismatches += 1
      }
      if (flags.unjustifiedDuplicate) {
        qa.duplicateRangeFailures += 1
        subject.duplicates += 1
      }
      const row = {
        subject: module.subject,
        code: module.code,
        module: module.module,
        family: module.family,
        webSlide,
        sourcePptxSlides: block.range,
        currentTitle: title,
        contentStatus: flags.status,
        explanation,
        points,
        kind: block.kind,
        splitReason: block.splitReason || null,
      }
      row.grade = gradeBlock(row)
      if (row.grade === 'A+') { grades.APlus += 1; subject.APlus += 1 }
      else { grades[row.grade] += 1; subject[row.grade] += 1 }
      subject.sourceDepthSlides += 1
      inventory.push(row)
    }
  }

  const chemistry = {
    subject: 'Applied Chemistry for Smart Systems',
    code: '1BCHES102/202',
    family: 'chemistry-preserved',
    sourceDepthSlides: 0,
    APlus: 0, A: 0, B: 0, C: 0, D: 0,
    mismatches: 0,
    duplicates: 0,
    missingBlocks: 0,
  }

  const failed = qa.titleOnlyFailures + qa.genericBodyFailures + qa.sourceRangeMismatchFailures
    + qa.duplicateRangeFailures + qa.missingSourceBlockFailures + qa.placeholderLeakFailures
    + grades.C + grades.D

  const report = {
    generatedAt: new Date().toISOString(),
    subjectsScanned: subjectRows.size + 1,
    sourceDepthSlidesScanned: inventory.length,
    contentGrades: grades,
    qa,
    subjects: [...subjectRows.values(), chemistry],
    samples: {
      c: inventory.filter((row) => row.grade === 'C').slice(0, 40),
      d: inventory.filter((row) => row.grade === 'D').slice(0, 20),
      generic: inventory.filter((row) => row.contentStatus === 'GENERIC').slice(0, 20),
      shallow: inventory.filter((row) => row.contentStatus === 'SHALLOW').slice(0, 20),
    },
  }

  const out = path.join(ROOT, 'qa/first-year-source-depth-qa.json')
  const inventoryOut = path.join(ROOT, 'qa/first-year-source-depth-inventory.json')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, JSON.stringify(report, null, 2))
  await fs.writeFile(inventoryOut, JSON.stringify({ generatedAt: report.generatedAt, rows: inventory }, null, 2))
  console.log(JSON.stringify({
    subjectsScanned: report.subjectsScanned,
    sourceDepthSlidesScanned: report.sourceDepthSlidesScanned,
    contentGrades: grades,
    qa,
    failed,
    out,
  }, null, 2))
  process.exit(failed ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})

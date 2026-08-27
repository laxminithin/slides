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
const GENERIC_RE = /(is taught as a working mechanism|this concept helps students|this topic is important because|the process consists of several stages|this system performs an important function|students should understand this concept|explain concept here|add example here|insert diagram|lorem ipsum|\btbd\b|\btodo\b|placeholder teaching|this section explains the important concept)/i
const TEMPLATE_RE = /Final PPTX teaching block \$\{|Source Teaching Block \$\{|title=["']PPTX depth block["']|title=["']PPTX teaching depth["']|PPTX slides \{range\}|`Final PPTX teaching block/

async function walkFiles(dir, predicate) {
  const out = []
  async function walk(current) {
    let entries = []
    try { entries = await fs.readdir(current, { withFileTypes: true }) } catch { return }
    for (const entry of entries) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) await walk(full)
      else if (predicate(entry.name)) out.push(full)
    }
  }
  await walk(dir)
  return out
}

async function scanSourceTemplates() {
  const files = await walkFiles(path.join(ROOT, 'src'), (name) => /\.(js|jsx)$/.test(name) && /firstYear|chemistry/.test(name))
  files.push(path.join(ROOT, 'scripts/build-first-year-depth-content.mjs'))
  const hits = []
  for (const file of files) {
    if (/firstYearDepthContent\.js$|firstYearSourceLabels\.js$/.test(file)) continue
    const text = await fs.readFile(file, 'utf8')
    if (TEMPLATE_RE.test(text)) {
      const line = text.split('\n').find((row) => TEMPLATE_RE.test(row))
      hits.push({ file: path.relative(ROOT, file), sample: (line || '').trim().slice(0, 180) })
    }
  }
  return hits
}

function normalize(text) {
  return String(text || '').replace(/\s+/g, ' ').trim().toLowerCase()
}

async function main() {
  const leaks = []
  const generic = []
  const missingTitle = []
  const consecutive = []
  const depthLabels = []
  const subjectRows = []
  const subjects = new Map()

  for (const [key, module] of Object.entries(firstYearDepthModules)) {
    const blocks = usableSourceBlocks(module)
    if (!subjects.has(module.code)) {
      subjects.set(module.code, {
        subject: module.subject,
        code: module.code,
        family: module.family,
        modules: 0,
        slides: 0,
        leaks: 0,
      })
    }
    const row = subjects.get(module.code)
    row.modules += 1
    let previous = ''
    for (const [index, block] of blocks.entries()) {
      const title = studentFacingTitle(block)
      const subtitle = studentFacingSubtitle(block)
      const takeaway = studentFacingTakeaway(block)
      const text = [title, subtitle, takeaway, ...(block.points || [])].join('\n')
      row.slides += 1
      const kind = scanTextForPlaceholderLeak(text) || (isInternalTeachingLabel(title) ? 'internal-block-label' : null)
      if (kind) {
        leaks.push({ key, code: module.code, module: module.module, slide: index + 1, range: block.range, kind, title, sample: text.replace(/\s+/g, ' ').slice(0, 180) })
        row.leaks += 1
      }
      if (!title) missingTitle.push({ key, code: module.code, range: block.range })
      if (GENERIC_RE.test(title) || GENERIC_RE.test(takeaway)) generic.push({ key, code: module.code, title })
      const sig = normalize(`${title}|${takeaway}`)
      if (sig && sig === previous) consecutive.push({ key, title })
      previous = sig
    }
    for (const block of module.blocks || []) {
      if (isInternalTeachingLabel(block.title) || scanTextForPlaceholderLeak(block.title)) {
        depthLabels.push({ key, code: module.code, range: block.range, title: block.title })
      }
    }
  }

  const templateHits = await scanSourceTemplates()
  const chemistryDir = path.join(ROOT, 'src/chemistry')
  const chemistryFiles = await walkFiles(chemistryDir, (name) => /\.(js|jsx)$/.test(name))
  let chemistryLeaks = 0
  for (const file of chemistryFiles) {
    const text = await fs.readFile(file, 'utf8')
    if (scanTextForPlaceholderLeak(text) && /Final PPTX teaching block|Source teaching block|PPTX slides \d/.test(text)) chemistryLeaks += 1
  }

  subjectRows.push(...[...subjects.values()].map((row) => ({
    subject: row.subject,
    code: row.code,
    family: row.family,
    modules: row.modules,
    sourceSlides: row.slides,
    internalBlockLabels: row.leaks,
  })))

  const report = {
    generatedAt: new Date().toISOString(),
    subjectsScanned: subjectRows.length + 1,
    chemistryPreservedLeaks: chemistryLeaks,
    modulesSegmentsScanned: subjectRows.reduce((sum, row) => sum + row.modules, 0),
    sourceSlidesScanned: subjectRows.reduce((sum, row) => sum + row.sourceSlides, 0),
    placeholderLeakFailures: leaks.length,
    semanticPlaceholderFailures: leaks.filter((row) => row.kind === 'semantic-placeholder').length,
    genericReplacementFailures: generic.length,
    missingTitleFailures: missingTitle.length,
    depthInternalTitles: depthLabels.length,
    structuralDuplicates: consecutive.length,
    sourceTemplateLeaks: templateHits.length,
    leaks: leaks.slice(0, 80),
    depthLabelSamples: depthLabels.slice(0, 40),
    genericSamples: generic.slice(0, 40),
    duplicateSamples: consecutive.slice(0, 40),
    templateHits,
    subjects: subjectRows,
  }

  const out = path.join(ROOT, 'qa/first-year-placeholder-leak-qa.json')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, JSON.stringify(report, null, 2))
  const failed = leaks.length + generic.length + missingTitle.length + depthLabels.length + templateHits.length + chemistryLeaks
  console.log(JSON.stringify({
    subjectsScanned: report.subjectsScanned,
    sourceSlidesScanned: report.sourceSlidesScanned,
    placeholderLeakFailures: report.placeholderLeakFailures,
    genericReplacementFailures: report.genericReplacementFailures,
    missingTitleFailures: report.missingTitleFailures,
    depthInternalTitles: report.depthInternalTitles,
    structuralDuplicates: report.structuralDuplicates,
    sourceTemplateLeaks: report.sourceTemplateLeaks,
    chemistryPreservedLeaks: chemistryLeaks,
    out,
  }, null, 2))
  process.exit(failed ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})

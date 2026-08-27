import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { firstYearDepthModules } from '../src/firstYearDepthContent.js'
import { usableSourceBlocks } from '../src/firstYearSourceQuality.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SYLLABUS = path.join(ROOT, 'public/syllabus/1st Year Syllabus')
const PPTX = path.join(ROOT, 'First_Year_PPTX')
const GENERIC_RE = /(is taught as a working mechanism|this concept helps students|this topic is important because|the process consists of several stages|this system performs an important function|students should understand this concept|start with why the module|explain concept here|add example here|module learning objectives|insert diagram|example here|lorem ipsum|\btbd\b|\btodo\b|question placeholders|explains one necessary part of|every major syllabus topic is expanded through purpose|\d+\.\s*concept structure|application, confusion, exam view)/i

function normalize(text) {
  return String(text || '').replace(/\s+/g, ' ').trim().toLowerCase()
}

async function exists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

function walkPoints() {
  const blocks = []
  for (const [key, module] of Object.entries(firstYearDepthModules)) {
    for (const block of usableSourceBlocks(module)) {
      blocks.push({
        key,
        code: module.code,
        title: block.title,
        action: block.action,
        range: block.range,
        points: block.points || [],
        text: (block.points || []).join(' | '),
      })
    }
  }
  return blocks
}

async function main() {
  const inventory = JSON.parse(await fs.readFile(path.join(ROOT, 'qa/first-year-phase8-inventory.json'), 'utf8'))
  const syllabusFiles = new Set((await fs.readdir(SYLLABUS)).filter((name) => name.endsWith('.pdf')))
  const pptxFolders = new Set((await fs.readdir(PPTX)).filter((name) => !name.includes('.')))
  const identity = []
  const missingSyllabus = []
  const missingPptx = []

  for (const subject of inventory.subjectsDetail) {
    const codeHead = subject.code.split('/')[0]
    const syllabusGuesses = [
      `${codeHead}.pdf`,
      `${subject.code.replaceAll('/', '_')}.pdf`,
      `${subject.code}.pdf`,
    ]
    const syllabusHit = syllabusGuesses.find((name) => syllabusFiles.has(name))
    const pptxHit = [...pptxFolders].find((folder) => folder.includes(codeHead) || (subject.pptxFolder && folder === path.basename(subject.pptxFolder)))
    const row = {
      id: subject.id,
      title: subject.title,
      code: subject.code,
      family: subject.family,
      identity: 'PASS',
      syllabusFile: syllabusHit || null,
      pptxFolder: pptxHit || subject.pptxFolder || null,
    }
    if (!syllabusHit) {
      row.identity = 'WRONG SYLLABUS'
      missingSyllabus.push(row)
    }
    if (!pptxHit && subject.family !== 'chemistry-preserved') {
      const chem = pptxFolders.has('Applied_Chemistry_for_Smart_Systems_1BCHES102_202')
      if (subject.id === 'chemistry' && chem) row.pptxFolder = 'Applied_Chemistry_for_Smart_Systems_1BCHES102_202'
      else {
        row.identity = row.identity === 'PASS' ? 'WRONG SOURCE' : row.identity
        missingPptx.push(row)
      }
    }
    identity.push(row)
  }

  const blocks = walkPoints()
  const generic = []
  for (const block of blocks) {
    if (GENERIC_RE.test(block.text) || GENERIC_RE.test(block.title)) generic.push({ code: block.code, title: block.title, sample: block.text.slice(0, 160) })
  }

  const sourceGeneric = []
  const families = ['firstYearMath', 'firstYearScience', 'firstYearProgramming', 'firstYearEngineering', 'firstYearRemaining', 'firstYearFoundation', 'chemistry']
  for (const family of families) {
    const dir = path.join(ROOT, 'src', family)
    let files = []
    try {
      files = (await fs.readdir(dir, { recursive: true })).filter((name) => /\.(js|jsx|json)$/.test(name))
    } catch {
      continue
    }
    for (const file of files) {
      const text = await fs.readFile(path.join(dir, file), 'utf8')
      if (GENERIC_RE.test(text)) {
        const line = text.split('\n').find((row) => GENERIC_RE.test(row))
        sourceGeneric.push({ family, file, sample: (line || '').trim().slice(0, 180) })
      }
    }
  }

  const byHash = new Map()
  for (const block of blocks) {
    const hash = normalize(block.text)
    if (hash.length < 80) continue
    if (!byHash.has(hash)) byHash.set(hash, [])
    byHash.get(hash).push(block)
  }
  const CAED = new Set(['1BCEDC103/203', '1BCEDE103/203', '1BCEDEC103/203', '1BCEDM103/203', '1BCEDS103/203'])
  const duplicateBlocks = [...byHash.values()]
    .filter((group) => {
      if (group.length < 2) return false
      const codes = new Set(group.map((item) => item.code))
      return codes.size > 1
    })
    .map((group) => ({
      codes: [...new Set(group.map((item) => item.code))],
      count: group.length,
      title: group[0].title,
      sample: group[0].text.slice(0, 180),
      justifiedCaed: group.every((item) => CAED.has(item.code)),
    }))
  const unjustifiedDuplicateBlocks = duplicateBlocks.filter((row) => !row.justifiedCaed)

  const consecutiveIdentical = []
  const byModule = new Map()
  for (const block of blocks) {
    if (!byModule.has(block.key)) byModule.set(block.key, [])
    byModule.get(block.key).push(block)
  }
  for (const [key, list] of byModule) {
    for (let i = 1; i < list.length; i += 1) {
      if (normalize(list[i].text) && normalize(list[i].text) === normalize(list[i - 1].text)) {
        consecutiveIdentical.push({ key, title: list[i].title })
      }
    }
  }

  const compression = []
  for (const subject of inventory.subjectsDetail) {
    for (const segment of subject.segments) {
      if (!segment.depthSlides || !segment.slides) continue
      const ratio = segment.slides / segment.depthSlides
      if (segment.depthSlides >= 30 && ratio < 0.45) {
        compression.push({
          subject: subject.title,
          code: subject.code,
          segment: segment.id,
          pptx: segment.depthSlides,
          web: segment.slides,
          ratio: Number(ratio.toFixed(2)),
        })
      }
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    inventory: { subjects: inventory.subjects, segments: inventory.segments, webSlides: inventory.webSlides },
    identity: {
      pass: identity.filter((row) => row.identity === 'PASS').length,
      failures: identity.filter((row) => row.identity !== 'PASS'),
      missingSyllabus,
      missingPptx,
    },
    genericScaffolding: generic,
    placeholderLeaks: blocks.filter((block) => /(?:final\s+pptx\s+teaching\s+block|pptx\s+teaching\s+block|source\s+teaching\s+block|finalized\s+pptx\s+slides|pptx\s+slides\s+\d|teaching\s+block\s+\d+(?:\s*[-–]\s*\d+)?|final\s+source\s+section|teaching\s+source\s+section|pptx\s+source\s+content)/i.test(`${block.title}\n${block.text}`)),
    sourceGenericScaffolding: sourceGeneric,
    unjustifiedDuplicateBlocks,
    justifiedCaedDuplicateBlocks: duplicateBlocks.filter((row) => row.justifiedCaed).length,
    consecutiveIdenticalSourceBlocks: consecutiveIdentical,
    suspiciousCompression: compression,
    syllabusPdfCount: syllabusFiles.size,
    pptxFolderCount: pptxFolders.size,
  }
  const out = path.join(ROOT, 'qa/first-year-phase8-static-audit.json')
  await fs.writeFile(out, JSON.stringify(report, null, 2))
  console.log(JSON.stringify({
    identityPass: report.identity.pass,
    identityFailures: report.identity.failures.length,
    generic: generic.length,
    placeholderLeaks: report.placeholderLeaks.length,
    sourceGeneric: sourceGeneric.length,
    duplicateBlockGroups: duplicateBlocks.length,
    consecutiveIdentical: consecutiveIdentical.length,
    compressionOutliers: compression.length,
    out,
  }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})

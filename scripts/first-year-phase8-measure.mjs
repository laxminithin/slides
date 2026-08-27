import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { firstYearDepthModules } from '../src/firstYearDepthContent.js'
import { usableSourceBlocks } from '../src/firstYearSourceQuality.js'
import { scienceSubjectModules } from '../src/firstYearScience/moduleMap.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PPTX = path.join(ROOT, 'First_Year_PPTX')
const SYLLABUS = path.join(ROOT, 'public/syllabus/1st Year Syllabus')
const DEPTH_JSON = path.join(ROOT, 'FIRST_YEAR_PPTX_DEPTH_FINALIZATION_REPORT.json')
const OUT_DIR = path.join(ROOT, 'qa')
const GENERIC_RE = /(is taught as a working mechanism|this concept helps students|this topic is important because|the process consists of several stages|this system performs an important function|students should understand this concept|this topic is useful|performs an important role|has several applications|start with why the module|explain this concept|explain concept here|add example here|module learning objectives|insert diagram|example here|lorem ipsum|\btbd\b|\btodo\b|placeholder teaching|question placeholders|explains one necessary part of|every major syllabus topic is expanded through purpose|\d+\.\s*concept structure|application, confusion, exam view)/i
const PLACEHOLDER_RE = /\b(TBD|TODO|FIXME|lorem ipsum|insert diagram|add example here|explain this concept|example here|module learning|start with why)\b/i
const CHROME_RE = /(official syllabus topic map|classroom explanation|is taught as a working mechanism|^1b[a-z0-9]+(?:\/\d+)?\s*\|\s*module\s*\d+$)/i

const catalog = [
  ['differential-calculus-linear-algebra-1bmatc101', 'Differential Calculus and Linear Algebra', '1BMATC101', 'Theory', 'math', 'A - MATHEMATICS', 'module', 5, 8],
  ['differential-calculus-numerical-methods-1bmatc201', 'Differential Calculus and Numerical Methods', '1BMATC201', 'Theory', 'math', 'A - MATHEMATICS', 'module', 5, 8],
  ['differential-calculus-linear-algebra-1bmate101', 'Differential Calculus & Linear Algebra', '1BMATE101', 'Theory', 'math', 'A - MATHEMATICS', 'module', 5, 8],
  ['calculus-laplace-transforms-numerical-techniques-1bmate201', 'Calculus, Laplace Transforms and Numerical Techniques', '1BMATE201', 'Theory', 'math', 'A - MATHEMATICS', 'module', 5, 8],
  ['differential-calculus-linear-algebra-1bmatm101', 'Differential Calculus and Linear Algebra', '1BMATM101', 'Theory', 'math', 'A - MATHEMATICS', 'module', 5, 8],
  ['multivariable-calculus-numerical-methods-1bmatm201', 'Multivariable Calculus and Numerical Methods', '1BMATM201', 'Theory', 'math', 'A - MATHEMATICS', 'module', 5, 8],
  ['calculus-linear-algebra-1bmats101', 'CALCULUS AND LINEAR ALGEBRA', '1BMATS101', 'Theory', 'math', 'A - MATHEMATICS', 'module', 5, 8],
  ['numerical-methods-1bmats201', 'NUMERICAL METHODS', '1BMATS201', 'Theory', 'math', 'A - MATHEMATICS', 'module', 5, 8],
  ['applied-chemistry-sustainable-structures-1bchec102-202', 'Applied Chemistry for Sustainable Structures and Material Design', '1BCHEC102/202', 'Theory', 'science', 'C - CHEMISTRY / MATERIAL SCIENCE', 'module', 5, null],
  ['applied-chemistry-emerging-electronics-1bchee102-202', 'Applied Chemistry for Emerging Electronics and Futuristic Devices', '1BCHEE102/202', 'Theory', 'science', 'C - CHEMISTRY / MATERIAL SCIENCE', 'module', 5, null],
  ['applied-chemistry-metal-protection-energy-1bchem102-202', 'Applied Chemistry for Advanced Metal Protection and Sustainable Energy Systems', '1BCHEM102/202', 'Theory', 'science', 'C - CHEMISTRY / MATERIAL SCIENCE', 'module', 5, null],
  ['elements-biotechnology-biomimetics-1bebt105-205', 'Elements of Biotechnology and Biomimetics', '1BEBT105/205', 'Theory', 'science', 'C - CHEMISTRY / MATERIAL SCIENCE', 'module', 5, null],
  ['elements-chemical-engineering-1beche105-205', 'Elements of Chemical Engineering', '1BECHE105/205', 'Theory', 'science', 'C - CHEMISTRY / MATERIAL SCIENCE', 'module', 5, null],
  ['quantum-physics-electronic-sensors-1bphec102-202', 'QUANTUM PHYSICS AND ELECTRONIC SENSORS', '1BPHEC102/202', 'Theory', 'science', 'B - PHYSICS / PHYSICAL SCIENCE', 'module', 5, null],
  ['electrical-engineering-materials-1bphee102-102', 'ELECTRICAL ENGINEERING MATERIALS', '1BPHEE102/102', 'Theory', 'science', 'B - PHYSICS / PHYSICAL SCIENCE', 'module', 5, null],
  ['physics-sustainable-structural-systems-1bphyc102-202', 'PHYSICS FOR SUSTAINABLE STRUCTURAL SYSTEMS', '1BPHYC102/202', 'Theory', 'science', 'B - PHYSICS / PHYSICAL SCIENCE', 'module', 5, null],
  ['physics-of-materials-1bphym102-202', 'PHYSICS OF MATERIALS', '1BPHYM102/202', 'Theory', 'science', 'B - PHYSICS / PHYSICAL SCIENCE', 'module', 5, null],
  ['quantum-physics-applications-1bphys102-202', 'QUANTUM PHYSICS AND APPLICATIONS', '1BPHYS102/202', 'Theory', 'science', 'B - PHYSICS / PHYSICAL SCIENCE', 'module', 5, null],
  ['principles-soil-science-agronomy-1bssa105-205', 'Principles of Soil Science and Agronomy', '1BSSA105/205', 'Theory', 'science', 'C - CHEMISTRY / MATERIAL SCIENCE', 'module', 5, null],
  ['introduction-ai-applications-1baia103-203', 'Introduction to AI and Applications', '1BAIA103/203', 'Theory', 'programming', 'D - PROGRAMMING / COMPUTER SCIENCE', 'module', 5, 10],
  ['programming-in-c-1beit105-205', 'Programming in C', '1BEIT105/205', 'Theory', 'programming', 'D - PROGRAMMING / COMPUTER SCIENCE', 'module', 5, 10],
  ['essentials-information-technology-1besc104e', 'ESSENTIALS OF INFORMATION TECHNOLOGY', '1BESC104E', 'Theory', 'programming', 'D - PROGRAMMING / COMPUTER SCIENCE', 'module', 5, 10],
  ['python-programming-1bplc105b-205b', 'PYTHON PROGRAMMING', '1BPLC105B/205B', 'IPCC', 'programming', 'D - PROGRAMMING / COMPUTER SCIENCE', 'module', 5, 10],
  ['introduction-c-programming-1bplc205e-105e', 'INTRODUCTION TO C PROGRAMMING', '1BPLC205E/105E', 'IPCC', 'programming', 'D - PROGRAMMING / COMPUTER SCIENCE', 'module', 5, 10],
  ['basics-electrical-engineering-1bbee105-205', 'Basics of Electrical Engineering', '1BBEE105/205', 'Theory', 'engineering', 'E - ELECTRICAL / ELECTRONICS', 'module', 5, 12],
  ['computer-aided-engineering-drawing-cv-1bcedc103-203', 'Computer Aided Engineering Drawing for CV Stream', '1BCEDC103/203', 'Theory', 'engineering', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'module', 5, 12],
  ['computer-aided-engineering-drawing-ee-1bcede103-203', 'Computer Aided Engineering Drawing for EE Stream', '1BCEDE103/203', 'Theory', 'engineering', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'module', 5, 12],
  ['computer-aided-engineering-drawing-ece-1bcedec103-203', 'Computer Aided Engineering Drawing for ECE Stream', '1BCEDEC103/203', 'Theory', 'engineering', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'module', 5, 12],
  ['computer-aided-engineering-drawing-me-1bcedm103-203', 'Computer Aided Engineering Drawing for ME Stream', '1BCEDM103/203', 'Theory', 'engineering', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'module', 5, 12],
  ['computer-aided-engineering-drawing-cs-1bceds103-203', 'Computer Aided Engineering Drawing for CS Stream', '1BCEDS103/203', 'Theory', 'engineering', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'module', 5, 12],
  ['engineering-mechanics-1bciv105-205', 'ENGINEERING MECHANICS', '1BCIV105/205', 'Theory', 'engineering', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'module', 5, 12],
  ['elements-of-aeronautics-1beae105-205', 'Elements of Aeronautics', '1BEAE105/205', 'Theory', 'engineering', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'module', 5, 12],
  ['fundamentals-electronics-communication-1bece105-205', 'Fundamentals of Electronics and Communication Engineering', '1BECE105/205', 'Theory', 'engineering', 'E - ELECTRICAL / ELECTRONICS', 'module', 5, 12],
  ['elements-mechanical-engineering-1beme105-205', 'Elements of Mechanical Engineering', '1BEME105/205', 'Theory', 'engineering', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'module', 5, 12],
  ['building-science-mechanics-1besc104a-204a', 'BUILDING SCIENCE AND MECHANICS', '1BESC104A/204A', 'Theory', 'engineering', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'module', 5, 12],
  ['introduction-electrical-engineering-1besc104b-204b', 'Introduction to Electrical Engineering', '1BESC104B/204B', 'Theory', 'engineering', 'E - ELECTRICAL / ELECTRONICS', 'module', 5, 12],
  ['introduction-electronics-communication-1besc104c-204c', 'Introduction to Electronics and Communication Engineering', '1BESC104C/204C', 'Theory', 'engineering', 'E - ELECTRICAL / ELECTRONICS', 'module', 5, 12],
  ['introduction-mechanical-engineering-1besc104d-204d', 'INTRODUCTION TO MECHANICAL ENGINEERING', '1BESC104D/204D', 'Theory', 'engineering', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'module', 5, 12],
  ['communication-skills-1bengl106', 'Communication Skills', '1BENGL106', 'Theory', 'remaining', 'G - COMMUNICATION / HUMANITIES', 'unit', 5, 10],
  ['indian-constitution-engineering-ethics-1bico107-207', 'Indian Constitution and Engineering Ethics', '1BICO107/207', 'Theory', 'remaining', 'G - COMMUNICATION / HUMANITIES', 'module', 5, 10],
  ['balake-kannada-1bkbk109', 'Balake Kannada (Kannada for Usage)', '1BKBK109', 'Language', 'remaining', 'G - LANGUAGE', 'module', 5, 9],
  ['samskrutika-kannada-1bksk109', 'Samskrutika Kannada', '1BKSK109', 'Language', 'remaining', 'G - LANGUAGE', 'unit', 5, 9],
  ['soft-skills-1bsks106-206', 'Soft Skills', '1BSKS106/206', 'Theory', 'remaining', 'G - COMMUNICATION / HUMANITIES', 'module', 5, 10],
  ['basic-electrical-lab-1bbeel107', 'Basic Electrical Lab', '1BBEEL107', 'Lab', 'remaining', 'H - LAB / PRACTICAL', 'experiment', 12, 8],
  ['fundamentals-ece-lab-1becel107', 'Fundamentals of Electronics and Communication Engineering Lab', '1BECEL107', 'Lab', 'remaining', 'H - LAB / PRACTICAL', 'experiment', 12, 8],
  ['elements-mechanical-lab-1bemel105', 'Elements of Mechanical Engineering Lab', '1BEMEL105', 'Lab', 'remaining', 'H - LAB / PRACTICAL', 'experiment', 12, 8],
  ['mechanics-materials-lab-1bmeml107-207', 'MECHANICS AND MATERIALS LABORATORY', '1BMEML107/207', 'Lab', 'remaining', 'H - LAB / PRACTICAL', 'experiment', 9, 8],
  ['c-programming-lab-1bpopl107-207', 'C Programming Lab', '1BPOPL107/207', 'Lab', 'remaining', 'H - LAB / PRACTICAL', 'experiment', 14, 9],
  ['innovation-design-thinking-lab-1bidtl158', 'Innovation & Design Thinking Lab', '1BIDTL158', 'Project / Activity', 'remaining', 'H - PROJECT / ACTIVITY', 'stage', 8, 6],
  ['interdisciplinary-project-work-1bprj258', 'Interdisciplinary Project Work', '1BPRJ258', 'Project / Activity', 'remaining', 'H - PROJECT / ACTIVITY', 'stage', 8, 6],
  ['chemistry', 'Applied Chemistry for Smart Systems', '1BCHES102/202', 'Theory', 'chemistry-preserved', 'C - CHEMISTRY / MATERIAL SCIENCE', 'module', 5, null],
]

function extraCore(code, index) {
  if (code === '1BECE105/205' && index === 0) return 1
  if (code === '1BEME105/205' && index === 3) return 1
  return 0
}

async function walkFiles(dir, predicate) {
  const out = []
  async function walk(current) {
    let entries = []
    try {
      entries = await fs.readdir(current, { withFileTypes: true })
    } catch {
      return
    }
    for (const entry of entries) {
      const full = path.join(current, entry.name)
      if (entry.isDirectory()) await walk(full)
      else if (predicate(entry.name, full)) out.push(full)
    }
  }
  await walk(dir)
  return out
}

function normalize(text) {
  return String(text || '').replace(/\s+/g, ' ').trim().toLowerCase()
}

async function scienceCoreCounts() {
  const src = await fs.readFile(path.join(ROOT, 'src/firstYearScience/index.jsx'), 'utf8')
  const slidesByKey = {}
  const re = /(\w+):\s*\{[\s\S]*?slides:\s*(\d+)/g
  let match
  while ((match = re.exec(src))) slidesByKey[match[1]] = Number(match[2])
  const byCode = {}
  for (const [code, keys] of Object.entries(scienceSubjectModules)) {
    byCode[code] = keys.map((spec) => {
      if (typeof spec === 'string') return slidesByKey[spec]
      return spec.slides || slidesByKey[spec.base]
    })
  }
  return byCode
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true })
  const depthReport = JSON.parse(await fs.readFile(DEPTH_JSON, 'utf8'))
  const pptxFiles = await walkFiles(PPTX, (name) => name.endsWith('.pptx') && !name.includes('.inspect'))
  const inspectFiles = await walkFiles(PPTX, (name) => name.endsWith('.inspect.ndjson'))
  const syllabusFiles = (await fs.readdir(SYLLABUS)).filter((name) => name.endsWith('.pdf'))
  const pptxFolders = (await fs.readdir(PPTX, { withFileTypes: true })).filter((entry) => entry.isDirectory()).map((entry) => entry.name)
  const scienceCores = await scienceCoreCounts()
  const subjectsJsx = await fs.readFile(path.join(ROOT, 'src/data/subjects.jsx'), 'utf8')
  const appJsx = await fs.readFile(path.join(ROOT, 'src/App.jsx'), 'utf8')
  const orderMatch = subjectsJsx.match(/const subjectOrder = \[([\s\S]*?)\]/)
  const registeredIds = orderMatch
    ? [...orderMatch[1].matchAll(/'([^']+)'/g)].map((row) => row[1])
    : []

  const chemistryCounts = []
  for (let i = 1; i <= 5; i += 1) {
    const data = JSON.parse(await fs.readFile(path.join(ROOT, `src/chemistry/data/module${i}.json`), 'utf8'))
    chemistryCounts.push(data.slides.length + 1)
  }

  const pptxByCode = Object.fromEntries((depthReport.subjectRows || []).map((row) => [row.code, row]))
  const identity = []
  const subjectsDetail = []

  for (const [id, title, code, type, family, familyLabel, prefix, n, core] of catalog) {
    const codeHead = code.split('/')[0]
    const syllabusHit = syllabusFiles.find((name) => name.startsWith(codeHead) || name.replace('.pdf', '') === code.replaceAll('/', '_'))
    const pptxHit = pptxFolders.find((folder) => folder.includes(codeHead) || folder.includes(code.replaceAll('/', '_')))
    const inRegistry = registeredIds.includes(id) || subjectsJsx.includes(`id: '${id}'`)
    const routeOk = appJsx.includes('subjects.map') || subjectsJsx.includes(id)
    let identityStatus = 'PASS'
    if (!inRegistry) identityStatus = 'MISSING'
    if (!syllabusHit) identityStatus = identityStatus === 'PASS' ? 'WRONG SYLLABUS' : identityStatus
    if (!pptxHit && family !== 'chemistry-preserved') identityStatus = identityStatus === 'PASS' ? 'WRONG SOURCE' : identityStatus
    if (registeredIds.filter((item) => item === id).length > 1) identityStatus = 'DUPLICATE'
    identity.push({
      id, title, code, type, family: familyLabel, identity: identityStatus,
      syllabusFile: syllabusHit || null, pptxFolder: pptxHit || null, route: `/#/${id}`,
    })

    const segments = []
    if (family === 'chemistry-preserved') {
      chemistryCounts.forEach((slides, index) => {
        segments.push({
          id: `module-${index + 1}`,
          title: ['Functional Materials', 'Quantum & Polymers', 'Energy Systems', 'Sensors & Corrosion', 'Green Materials'][index],
          slides,
          pptxSlides: Math.round((pptxByCode[code]?.slidesAfter || 305) / 5),
          sourceBlocks: 0,
          core: slides,
        })
      })
    } else {
      for (let i = 0; i < n; i += 1) {
        const depth = firstYearDepthModules[`${code}|${i + 1}`]
        const scienceCore = family === 'science' ? scienceCores[code]?.[i] : null
        const coreCount = (scienceCore || core || 8) + extraCore(code, i)
        const blocks = usableSourceBlocks(depth).length
        segments.push({
          id: `${prefix}-${i + 1}`,
          title: depth?.module || `${prefix} ${i + 1}`,
          slides: coreCount + blocks,
          pptxSlides: depth?.pptxSlides || 0,
          sourceBlocks: blocks,
          core: coreCount,
          pptx: depth?.sourcePptx || null,
          ratio: depth?.pptxSlides ? Number(((coreCount + blocks) / depth.pptxSlides).toFixed(3)) : null,
        })
      }
    }
    const webSlides = segments.reduce((sum, row) => sum + row.slides, 0)
    const pptxSlides = family === 'chemistry-preserved'
      ? (pptxByCode[code]?.slidesAfter || 305)
      : segments.reduce((sum, row) => sum + row.pptxSlides, 0)
    subjectsDetail.push({
      id, title, code, type, family, familyLabel, prefix, accent: family,
      syllabus: syllabusHit ? `public/syllabus/1st Year Syllabus/${syllabusHit}` : null,
      pptxFolder: pptxHit ? `First_Year_PPTX/${pptxHit}` : null,
      segments, webSlides, pptxSlides, pptxFiles: pptxHit ? segments.length : 0,
    })
  }

  const blocks = []
  for (const [key, module] of Object.entries(firstYearDepthModules)) {
    for (const block of usableSourceBlocks(module)) {
      blocks.push({
        key, code: module.code, title: block.title, action: block.action,
        range: block.range, points: block.points || [], text: (block.points || []).join(' | '),
      })
    }
  }

  const generic = []
  const placeholders = []
  for (const block of blocks) {
    if (GENERIC_RE.test(block.text) || GENERIC_RE.test(block.title)) generic.push({ code: block.code, title: block.title, sample: block.text.slice(0, 180) })
    if (PLACEHOLDER_RE.test(block.text) || PLACEHOLDER_RE.test(block.title)) placeholders.push({ code: block.code, title: block.title, sample: block.text.slice(0, 180) })
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
      if (GENERIC_RE.test(text) || PLACEHOLDER_RE.test(text)) {
        const line = text.split('\n').find((row) => GENERIC_RE.test(row) || PLACEHOLDER_RE.test(row))
        sourceGeneric.push({ family, file, sample: (line || '').trim().slice(0, 180) })
      }
    }
  }

  const byHash = new Map()
  for (const block of blocks) {
    const hash = normalize(block.text)
    if (hash.length < 90) continue
    if (!byHash.has(hash)) byHash.set(hash, [])
    byHash.get(hash).push(block)
  }
  const duplicateBlocks = [...byHash.values()]
    .filter((group) => new Set(group.map((item) => item.code)).size > 1)
    .map((group) => ({
      codes: [...new Set(group.map((item) => item.code))],
      count: group.length,
      title: group[0].title,
      sample: group[0].text.slice(0, 180),
    }))

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
  for (const subject of subjectsDetail) {
    for (const segment of subject.segments) {
      if (!segment.pptxSlides || !segment.slides) continue
      const ratio = segment.slides / segment.pptxSlides
      if (segment.pptxSlides >= 30 && ratio < 0.45) {
        compression.push({
          subject: subject.title, code: subject.code, segment: segment.id,
          pptx: segment.pptxSlides, web: segment.slides, ratio: Number(ratio.toFixed(2)),
        })
      }
    }
  }

  const chromeBlocks = blocks.filter((block) => CHROME_RE.test(block.title) || block.points.filter((point) => CHROME_RE.test(point)).length >= 2)

  const inspectSlideCount = inspectFiles.length
  let inspectSlides = 0
  for (const file of inspectFiles.slice(0, 0)) inspectSlides += 0
  for (const file of inspectFiles) {
    const raw = await fs.readFile(file, 'utf8')
    inspectSlides += [...raw.matchAll(/"kind":"slide"/g)].length
  }

  const inventory = {
    generatedAt: new Date().toISOString(),
    subjects: subjectsDetail.length,
    segments: subjectsDetail.reduce((sum, row) => sum + row.segments.length, 0),
    webSlides: subjectsDetail.reduce((sum, row) => sum + row.webSlides, 0),
    sourcePptxFiles: pptxFiles.length,
    sourcePptxFolders: pptxFolders.length,
    inspectFiles: inspectSlideCount,
    inspectSlides,
    syllabusPdfCount: syllabusFiles.length,
    sourcePptxSlidesReported: depthReport.totals?.totalSlidesAfter || 9963,
    depthModules: Object.keys(firstYearDepthModules).length,
    sourceBlocks: blocks.length,
    seeds: {},
    subjectsDetail,
  }

  const staticAudit = {
    generatedAt: new Date().toISOString(),
    inventory: { subjects: inventory.subjects, segments: inventory.segments, webSlides: inventory.webSlides },
    identity: {
      pass: identity.filter((row) => row.identity === 'PASS').length,
      failures: identity.filter((row) => row.identity !== 'PASS'),
    },
    genericScaffolding: generic,
    chromeTemplateBlocks: chromeBlocks.length,
    sourceGenericScaffolding: sourceGeneric,
    unjustifiedDuplicateBlocks: duplicateBlocks,
    consecutiveIdenticalSourceBlocks: consecutiveIdentical,
    placeholders,
    suspiciousCompression: compression,
    syllabusPdfCount: syllabusFiles.length,
    pptxFolderCount: pptxFolders.length,
    pptxFileCount: pptxFiles.length,
    inspectSlides,
  }

  await fs.writeFile(path.join(OUT_DIR, 'first-year-phase8-inventory.json'), JSON.stringify(inventory, null, 2))
  await fs.writeFile(path.join(OUT_DIR, 'first-year-phase8-static-audit.json'), JSON.stringify(staticAudit, null, 2))
  console.log(JSON.stringify({
    subjects: inventory.subjects,
    segments: inventory.segments,
    webSlides: inventory.webSlides,
    pptxFiles: pptxFiles.length,
    inspectSlides,
    identityPass: staticAudit.identity.pass,
    identityFailures: staticAudit.identity.failures.length,
    generic: generic.length,
    chromeBlocks: chromeBlocks.length,
    sourceGeneric: sourceGeneric.length,
    duplicateBlockGroups: duplicateBlocks.length,
    consecutiveIdentical: consecutiveIdentical.length,
    placeholders: placeholders.length,
    compressionOutliers: compression.length,
    byFamily: Object.fromEntries(['math', 'science', 'programming', 'engineering', 'remaining', 'chemistry-preserved'].map((family) => {
      const rows = subjectsDetail.filter((row) => row.family === family)
      return [family, { subjects: rows.length, segments: rows.reduce((n, row) => n + row.segments.length, 0), webSlides: rows.reduce((n, row) => n + row.webSlides, 0) }]
    })),
  }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})

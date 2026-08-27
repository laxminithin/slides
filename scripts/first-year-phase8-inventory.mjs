import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { firstYearMathSubjects, firstYearMathReportSeed } from '../src/firstYearMath/index.jsx'
import { firstYearScienceSubjects, firstYearScienceReportSeed } from '../src/firstYearScience/index.jsx'
import { firstYearProgrammingSubjects, firstYearProgrammingReportSeed } from '../src/firstYearProgramming/index.jsx'
import { firstYearEngineeringSubjects, firstYearEngineeringReportSeed } from '../src/firstYearEngineering/index.jsx'
import { firstYearRemainingSubjects, firstYearRemainingReportSeed } from '../src/firstYearRemaining/index.jsx'
import {
  chemistryModule1Slides,
  chemistryModule2Slides,
  chemistryModule3Slides,
  chemistryModule4Slides,
  chemistryModule5Slides,
} from '../src/chemistry/index.jsx'
import { firstYearDepthModules } from '../src/firstYearDepthContent.js'
import { usableSourceBlocks } from '../src/firstYearSourceQuality.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

function summarize(family, list) {
  return list.map((subject) => ({
    family,
    id: subject.id,
    title: subject.title,
    code: subject.code,
    syllabus: subject.syllabusSource || null,
    pptxFolder: subject.pptxFolder || subject.modules?.[0]?.pptxSource || null,
    accent: subject.accent || null,
    prefix: subject.modules?.[0]?.id?.replace(/-\d+$/, '') || 'module',
    segments: subject.modules.map((module) => ({
      id: module.id,
      title: module.title,
      slides: module.slides.length,
      pptx: module.pptxSource || null,
      depthKey: `${subject.code}|${Number.parseInt(module.id.replace(/\D/g, ''), 10) || 1}`,
      depthSlides: firstYearDepthModules[`${subject.code}|${Number.parseInt(module.id.replace(/\D/g, ''), 10) || 1}`]?.pptxSlides || null,
      sourceBlocks: usableSourceBlocks(firstYearDepthModules[`${subject.code}|${Number.parseInt(module.id.replace(/\D/g, ''), 10) || 1}`]).length,
    })),
  }))
}

const chemistry = {
  family: 'chemistry-preserved',
  id: 'chemistry',
  title: 'Applied Chemistry for Smart Systems',
  code: '1BCHES102/202',
  syllabus: 'public/syllabus/1st Year Syllabus/1BCHES102.pdf',
  pptxFolder: 'First_Year_PPTX/Applied_Chemistry_for_Smart_Systems_1BCHES102_202',
  accent: 'chemistry',
  prefix: 'module',
  segments: [
    { id: 'module-1', title: 'Functional Materials', slides: chemistryModule1Slides.length },
    { id: 'module-2', title: 'Quantum & Polymers', slides: chemistryModule2Slides.length },
    { id: 'module-3', title: 'Energy Systems', slides: chemistryModule3Slides.length },
    { id: 'module-4', title: 'Sensors & Corrosion', slides: chemistryModule4Slides.length },
    { id: 'module-5', title: 'Green Materials', slides: chemistryModule5Slides.length },
  ].map((segment, index) => ({
    ...segment,
    pptx: `First_Year_PPTX/Applied_Chemistry_for_Smart_Systems_1BCHES102_202/Module_${index + 1}.pptx`,
    depthKey: `1BCHES102/202|${index + 1}`,
    depthSlides: firstYearDepthModules[`1BCHES102/202|${index + 1}`]?.pptxSlides || null,
    sourceBlocks: 0,
  })),
}

const subjects = [
  ...summarize('math', firstYearMathSubjects),
  ...summarize('science', firstYearScienceSubjects),
  ...summarize('programming', firstYearProgrammingSubjects),
  ...summarize('engineering', firstYearEngineeringSubjects),
  ...summarize('remaining', firstYearRemainingSubjects),
  chemistry,
]

const inventory = {
  generatedAt: new Date().toISOString(),
  subjects: subjects.length,
  segments: subjects.reduce((sum, subject) => sum + subject.segments.length, 0),
  webSlides: subjects.reduce((sum, subject) => sum + subject.segments.reduce((inner, segment) => inner + segment.slides, 0), 0),
  seeds: {
    math: firstYearMathReportSeed,
    science: firstYearScienceReportSeed,
    programming: firstYearProgrammingReportSeed,
    engineering: firstYearEngineeringReportSeed,
    remaining: firstYearRemainingReportSeed,
  },
  subjectsDetail: subjects.map((subject) => ({
    ...subject,
    webSlides: subject.segments.reduce((sum, segment) => sum + segment.slides, 0),
    pptxSlides: subject.segments.reduce((sum, segment) => sum + (segment.depthSlides || 0), 0),
  })),
}

const out = path.join(ROOT, 'qa', 'first-year-phase8-inventory.json')
await fs.mkdir(path.dirname(out), { recursive: true })
await fs.writeFile(out, JSON.stringify(inventory, null, 2))
console.log(JSON.stringify({
  subjects: inventory.subjects,
  segments: inventory.segments,
  webSlides: inventory.webSlides,
  byFamily: Object.fromEntries(['math', 'science', 'programming', 'engineering', 'remaining', 'chemistry-preserved'].map((family) => {
    const rows = inventory.subjectsDetail.filter((row) => row.family === family)
    return [family, { subjects: rows.length, segments: rows.reduce((n, row) => n + row.segments.length, 0), webSlides: rows.reduce((n, row) => n + row.webSlides, 0) }]
  })),
  out,
}, null, 2))

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { firstYearDepthModules } from '../src/firstYearDepthContent.js'
import { usableSourceBlocks } from '../src/firstYearSourceQuality.js'
import { isInternalTeachingLabel, scanTextForPlaceholderLeak } from '../src/firstYearSourceLabels.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const FAMILY_SCENE = {
  math: 'Source Teaching Block N + Finalized PPTX slides {range}',
  science: 'Source Teaching Block N + Finalized PPTX slides {range}',
  programming: 'subtitle Final PPTX teaching block {range} + PPTX depth block',
  engineering: 'title Final PPTX teaching block {range}',
  remaining: 'title Final PPTX teaching block {range}',
}

async function main() {
  const inventory = []
  let modules = 0
  let slides = 0
  let sourceBlocks = 0
  let internalTitles = 0
  const subjects = new Map()

  for (const [key, module] of Object.entries(firstYearDepthModules)) {
    const blocks = usableSourceBlocks(module)
    const badTitles = (module.blocks || []).filter((block) => isInternalTeachingLabel(block.title) || scanTextForPlaceholderLeak(block.title))
    modules += 1
    slides += blocks.length
    sourceBlocks += blocks.length
    internalTitles += badTitles.length
    const code = module.code
    if (!subjects.has(code)) {
      subjects.set(code, {
        subject: module.subject,
        code,
        family: module.family,
        modules: 0,
        slides: 0,
        sourceBlocks: 0,
        currentBadText: FAMILY_SCENE[module.family] || 'source-block label',
        internalTitles: 0,
      })
    }
    const row = subjects.get(code)
    row.modules += 1
    row.slides += blocks.length
    row.sourceBlocks += blocks.length
    row.internalTitles += badTitles.length
    for (const block of blocks) {
      inventory.push({
        subject: module.subject,
        code,
        module: module.module,
        slide: `source ${block.range}`,
        currentBadText: FAMILY_SCENE[module.family],
        sourceBlock: block.range,
        rootCause: module.family === 'programming'
          ? 'sourceSlides() stamped subtitle from block.range; SourceTeachingBlock rendered PPTX slides {range}'
          : /math|science/.test(module.family)
            ? 'buildSourceSlides() used Source Teaching Block N / Finalized PPTX slides {range}; SourceTeachingBlock rendered PPTX slides {range}'
            : 'buildSourceSlides() used title Final PPTX teaching block ${block.range}; SourceTeachingBlock rendered PPTX slides {range}',
      })
    }
  }

  const payload = {
    generatedAt: new Date().toISOString(),
    freezeStatus: 'STALE / REOPENED FOR DEFECT REPAIR',
    firstYearFrozen: false,
    subjectsScanned: subjects.size,
    subjectsAffected: [...subjects.values()].filter((row) => row.slides > 0).length,
    modulesSegmentsAffected: modules,
    slidesAffected: slides,
    sourceBlocksAffected: sourceBlocks,
    internalBlockTitlesInDepthContent: internalTitles,
    subjects: [...subjects.values()],
    inventory,
  }
  const out = path.join(ROOT, 'qa/first-year-block-label-defect-inventory.json')
  await fs.mkdir(path.dirname(out), { recursive: true })
  await fs.writeFile(out, JSON.stringify(payload, null, 2))
  console.log(JSON.stringify({
    freezeStatus: payload.freezeStatus,
    subjectsScanned: payload.subjectsScanned,
    subjectsAffected: payload.subjectsAffected,
    modulesSegmentsAffected: payload.modulesSegmentsAffected,
    slidesAffected: payload.slidesAffected,
    sourceBlocksAffected: payload.sourceBlocksAffected,
    internalBlockTitlesInDepthContent: payload.internalBlockTitlesInDepthContent,
    out,
  }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(2)
})

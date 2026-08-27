import React from 'react'
import { FoundationSlide, SourceTeachingBlock } from './firstYearFoundation'
import { usableSourceBlocks } from './firstYearSourceQuality'
import {
  sourceSlideMetadata,
  studentFacingSubtitle,
  studentFacingTakeaway,
  studentFacingTitle,
} from './firstYearSourceLabels'

export function makeSourceTeachingSlides({
  idPrefix,
  sourceDepth,
  tone = 'core',
  footer,
  compositionFor,
}) {
  const blocks = usableSourceBlocks(sourceDepth)
  if (!blocks.length) return []
  return blocks.map((block, index) => {
    const title = studentFacingTitle(block)
    const subtitle = studentFacingSubtitle(block)
    const meta = sourceSlideMetadata(block, sourceDepth)
    return {
      id: `${idPrefix}-${index + 1}`,
      title,
      subtitle,
      composition: compositionFor
        ? compositionFor(block)
        : (block.kind === 'derivation' || block.kind === 'example' ? 'worked-example' : 'full-canvas-diagram'),
      sourcePptxSlides: meta.sourcePptxSlides,
      sourceBlockId: meta.sourceBlockId,
      sourcePptx: meta.sourcePptx,
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer} hideHeader>
          <SourceTeachingBlock
            range={block.range}
            title={title}
            points={block.points}
            action={block.action}
            mode={block.kind}
            explanation={block.explanation}
          />
        </FoundationSlide>
      ),
      takeaway: studentFacingTakeaway(block),
    }
  })
}

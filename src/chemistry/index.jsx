import './chemistry.css'
import module1Data from './data/module1.json'
import module2Data from './data/module2.json'
import module3Data from './data/module3.json'
import module4Data from './data/module4.json'
import module5Data from './data/module5.json'
import {
  slide,
  Deck,
  Lead,
  Points,
  Definition,
  Example,
  Flow,
  Cards,
  Compare,
  Formula,
  Numerical,
  Opener,
  Remember,
  ResourceHub,
} from './ChemKit.jsx'
import {
  pickChemVisual,
  ChemJourneyPath,
  ChemMindMap,
  ChemExamStrategy,
  ChemRevisionSheet,
  ChemHeroLab,
} from './ChemVisuals.jsx'

const MODULE_META = {
  module1: {
    number: '01',
    routeId: 'module-1',
    tone: 1,
    question: 'Why does material chemistry decide how a phone stores bits and paints pixels?',
    chips: ['Organic semiconductors', 'ReRAM', 'Liquid crystals', 'LED · OLED · AMOLED · QLED'],
    story: ['Memory', 'Organic', 'ReRAM', 'Displays', 'LED family', 'Revision'],
  },
  module2: {
    number: '02',
    routeId: 'module-2',
    tone: 2,
    question: 'How can nanoscale size and polymer architecture create useful smart-system properties?',
    chips: ['Quantum dots', 'QDSSC', 'Mn / Mw', 'Nylon-6,6 · CPVC · PMMA', 'Polyaniline'],
    story: ['Q-dots', 'QDSSC', 'Mw maths', 'Structure', 'Polymers', 'Conducting'],
  },
  module3: {
    number: '03',
    routeId: 'module-3',
    tone: 3,
    question: 'How does chemistry convert, store and deliver electrical energy for sustainable devices?',
    chips: ['Nernst', 'Concentration cells', 'Li-ion · Na-ion', 'Supercapacitors', 'SOFC · PV · Green H₂'],
    story: ['Nernst', 'Cells', 'Li-ion', 'Na-ion', 'Fuel/PV', 'Green H₂'],
  },
  module4: {
    number: '04',
    routeId: 'module-4',
    tone: 4,
    question: 'How do sensors read the world — and how do we stop metals from returning to ore?',
    chips: ['Transducer', 'Conductometry', 'Colorimetry', 'Gas · Biosensors', 'Corrosion · CPR'],
    story: ['Sensors', 'Conduct', 'Color', 'Gas/Bio', 'Corrosion', 'Control'],
  },
  module5: {
    number: '05',
    routeId: 'module-5',
    tone: 5,
    question: 'How do green materials and responsible recovery make electronics more sustainable?',
    chips: ['Green solvents', 'ZnO nanoparticles', 'PLA · PEG', 'Alginate hydrogel', 'E-waste · Bioleaching'],
    story: ['Green', 'ZnO', 'PLA/PEG', 'Hydrogel', 'E-waste', 'Recover'],
  },
}

function storyIndex(n, total, storyLen) {
  if (storyLen <= 1) return 0
  const ratio = (n - 1) / Math.max(1, total - 1)
  return Math.min(storyLen - 1, Math.floor(ratio * storyLen))
}

function takeawayFrom(entry) {
  const candidates = []
  if (entry.definition?.text) candidates.push(entry.definition.text)
  for (const p of entry.points || []) {
    if (!p) continue
    if (/^ask students|^tell students|^explain that|^use |^show |^make |^start |^open with|^connect |^contrast /i.test(p)) continue
    if (p.length >= 24 && p.length <= 140) candidates.push(p)
  }
  if (entry.say) {
    const cleaned = entry.say
      .replace(/^(Tell students|Explain that|Explain|Use|Show|Open with|Connect|Contrast|Make|Start with)\s+/i, '')
      .replace(/\.$/, '')
    if (cleaned.length > 18 && cleaned.length < 150 && !/^ask students/i.test(cleaned)) {
      candidates.push(cleaned[0].toUpperCase() + cleaned.slice(1))
    }
  }
  return candidates[0] || 'Connect the chemical structure to the device function and one engineering use-case.'
}

function splitCompare(points = []) {
  const mid = Math.ceil(points.length / 2)
  return [points.slice(0, mid), points.slice(mid)]
}

function isCue(text = '') {
  return /^(use |show |explain |define |make |start |tell |connect |contrast |compare |open )/i.test(text)
}

function contentPoints(entry) {
  const pts = (entry.points || []).filter((p) => p && !isCue(p))
  if (pts.length) return pts
  return (entry.points || []).slice(0, 6)
}

function buildCards(points) {
  const items = []
  for (let i = 0; i < points.length; i += 1) {
    const title = points[i]
    const body = points[i + 1] && points[i + 1].length > 28 && !/^[A-Z0-9+/−−–—\s-]{1,24}$/.test(points[i + 1])
      ? points[i + 1]
      : 'Key syllabus point for device/material answers.'
    if (body === points[i + 1]) i += 1
    items.push([title, body])
    if (items.length >= 4) break
  }
  return items
}

function renderBody(entry, meta) {
  const layout = entry.layout
  const points = contentPoints(entry)
  const subtitle = entry.subtitle || (entry.points?.[0] && isCue(entry.points[0]) ? entry.points[0] : '')

  if (layout === 'opener') {
    return (
      <Opener
        moduleNumber={meta.number}
        title={entry.title}
        question={meta.question}
        chips={meta.chips}
      />
    )
  }

  if (layout === 'journey') {
    return (
      <>
        <Lead>{subtitle || 'Follow the syllabus checklist as a visual roadmap.'}</Lead>
        <Flow items={points.filter((p) => !/^use the/i.test(p)).slice(0, 6)} />
        <Remember>Every long answer should connect structure → property → device → application.</Remember>
      </>
    )
  }

  if (layout === 'definition' || entry.definition) {
    return (
      <>
        {subtitle ? <Lead>{subtitle}</Lead> : null}
        {entry.definition ? (
          <Definition term={entry.definition.term}>{entry.definition.text}</Definition>
        ) : null}
        <Points items={points.slice(0, entry.definition ? 5 : 6)} />
        {entry.ask ? <Example>{entry.ask}</Example> : null}
      </>
    )
  }

  if (layout === 'compare') {
    const [left, right] = splitCompare(points)
    return (
      <>
        <Lead>{subtitle || 'Hold both sides in one mental picture.'}</Lead>
        <Compare
          leftTitle={left[0] || 'Option A'}
          leftItems={left.slice(1).length ? left.slice(1) : left}
          rightTitle={right[0] || 'Option B'}
          rightItems={right.slice(1).length ? right.slice(1) : right}
        />
      </>
    )
  }

  if (layout === 'process') {
    const flowItems = points.filter((p) => p.split(' ').length <= 6).slice(0, 6)
    const detail = points.filter((p) => !flowItems.includes(p)).slice(0, 4)
    return (
      <>
        <Lead>{subtitle || 'Watch the process as a left-to-right story.'}</Lead>
        {flowItems.length >= 3 ? <Flow items={flowItems} /> : null}
        <Points items={(detail.length ? detail : points).slice(0, 5)} />
        {entry.ask ? <Example>{entry.ask}</Example> : null}
      </>
    )
  }

  if (layout === 'formula') {
    const formulaLine = points.find((p) => /[=≠≈]/.test(p) || /E\s*=|Mn|Mw|CPR|A\s*=/.test(p)) || points[0]
    return (
      <>
        <Lead>{subtitle || 'Read every symbol before substituting numbers.'}</Lead>
        <Formula>{formulaLine}</Formula>
        <Points items={points.filter((p) => p !== formulaLine).slice(0, 5)} />
        <Remember>State units and the physical meaning of each term in the exam answer.</Remember>
      </>
    )
  }

  if (layout === 'numerical') {
    const given = points.find((p) => /given|data|known/i.test(p)) || points[0]
    const required = points.find((p) => /find|calculate|required|determine/i.test(p)) || points[1] || 'Required quantity'
    const formula = points.find((p) => /[=]/.test(p) || /formula|E\s*=|CPR|Mn|Mw/i.test(p)) || 'Use the syllabus formula'
    const answer = points.find((p) => /answer|result|final/i.test(p)) || points[points.length - 1]
    return (
      <>
        <Lead>{subtitle || 'Solve with a visible Given → Formula → Substitution → Answer path.'}</Lead>
        <Numerical
          given={given}
          required={required}
          formula={formula}
          steps={points.slice(0, 4)}
          answer={answer}
        />
      </>
    )
  }

  if (layout === 'cards') {
    return (
      <>
        <Lead>{subtitle || 'Capture the properties and uses as separate cards.'}</Lead>
        <Cards items={buildCards(points)} />
        {entry.ask ? <Example>{entry.ask}</Example> : null}
      </>
    )
  }

  if (layout === 'mindmap') {
    return (
      <>
        <Lead>Hold the whole module as one connected picture.</Lead>
        <Points items={points.slice(0, 8)} />
        <Remember>If you can redraw this map from memory, you are exam-ready.</Remember>
      </>
    )
  }

  if (layout === 'exam') {
    return (
      <>
        <Lead>{subtitle || 'Practice with syllabus language and device-answer structure.'}</Lead>
        <Points items={points.slice(0, 10)} />
        <Example label="Exam tip">Definition → Construction/Working → Advantages/Limitations → Application.</Example>
      </>
    )
  }

  if (layout === 'revision') {
    return (
      <>
        <Lead>One-screen checklist before the exam.</Lead>
        <Points items={points.slice(0, 10)} />
        <Remember>Revise formulas, named materials, and one application for each device.</Remember>
      </>
    )
  }

  return (
    <>
      {subtitle ? <Lead>{subtitle}</Lead> : <Lead>See what happens chemically, then connect it to the engineering device.</Lead>}
      {entry.definition ? <Definition term={entry.definition.term}>{entry.definition.text}</Definition> : null}
      <Points items={points.slice(0, 6)} />
      {entry.ask ? <Example>{entry.ask}</Example> : null}
    </>
  )
}

function visualFor(entry, data, meta) {
  const story = meta.story || data.story
  if (entry.layout === 'opener') return <ChemHeroLab />
  if (entry.layout === 'journey') return <ChemJourneyPath steps={story} />
  if (entry.layout === 'mindmap') {
    return <ChemMindMap title={data.title.split(' ').slice(0, 3).join(' ')} nodes={story} />
  }
  if (entry.layout === 'exam') return <ChemExamStrategy />
  if (entry.layout === 'revision') return <ChemRevisionSheet />
  return pickChemVisual(entry.title, data.id)
}

function createModuleSlides(data) {
  const meta = MODULE_META[data.id]
  const story = meta.story || data.story
  const slides = data.slides.map((entry) => {
    const active = storyIndex(entry.n, data.slides.length, story.length)
    const layout = entry.layout === 'opener' ? 'hero' : entry.layout === 'exam' || entry.layout === 'revision' ? entry.layout : ''
    const full = entry.layout === 'exam' || entry.layout === 'revision'
    const reverse = entry.n % 5 === 0 && entry.layout !== 'opener' && entry.layout !== 'journey'

    return slide({
      id: entry.id,
      kicker: `CHEMISTRY · MODULE ${meta.number}`,
      title: entry.title,
      subtitle: entry.subtitle || undefined,
      hideTitle: entry.layout === 'opener',
      tone: meta.tone,
      layout: entry.layout,
      notes: [entry.say, entry.ask].filter(Boolean).join(' '),
      content: (
        <Deck
          active={active}
          story={story}
          visual={visualFor(entry, data, meta)}
          takeaway={takeawayFrom(entry)}
          reverse={reverse}
          full={full}
          layout={layout}
          tone={meta.tone}
        >
          {renderBody(entry, meta)}
        </Deck>
      ),
    })
  })

  slides.push(
    slide({
      id: `${data.id}-resources`,
      kicker: `CHEMISTRY · MODULE ${meta.number}`,
      title: 'Study resources',
      tone: meta.tone,
      layout: 'resources',
      notes: 'Open notes, practice questions and quick revision after the lecture.',
      content: (
        <Deck
          active={story.length - 1}
          story={story}
          visual={<ChemRevisionSheet />}
          takeaway="Use resources after the lecture — do not interrupt the teaching story with drills."
          tone={meta.tone}
        >
          <Lead>Continue beyond the presentation with focused revision tools.</Lead>
          <ResourceHub moduleId={meta.routeId} />
        </Deck>
      ),
    }),
  )

  return slides
}

export const chemistryModule1Slides = createModuleSlides(module1Data)
export const chemistryModule2Slides = createModuleSlides(module2Data)
export const chemistryModule3Slides = createModuleSlides(module3Data)
export const chemistryModule4Slides = createModuleSlides(module4Data)
export const chemistryModule5Slides = createModuleSlides(module5Data)

export const chemistrySlideCounts = {
  module1: chemistryModule1Slides.length,
  module2: chemistryModule2Slides.length,
  module3: chemistryModule3Slides.length,
  module4: chemistryModule4Slides.length,
  module5: chemistryModule5Slides.length,
  total:
    chemistryModule1Slides.length
    + chemistryModule2Slides.length
    + chemistryModule3Slides.length
    + chemistryModule4Slides.length
    + chemistryModule5Slides.length,
}

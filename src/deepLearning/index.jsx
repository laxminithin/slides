import './deepLearning.css'
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
  Opener,
  Remember,
  ResourceHub,
} from './DlKit.jsx'
import { pickDlScene } from './DlScenes.jsx'
import { getDlSignature } from './DlSignatures.js'

const MODULE_META = {
  module1: {
    number: '01',
    routeId: 'module-1',
    tone: 1,
    question: 'How does a biological metaphor become a trainable mathematical classifier?',
    chips: ['Neuron model', 'Directed graphs', 'Perceptron', 'Convergence', 'Bayes link'],
    story: ['Brain', 'Neuron', 'Graph', 'Architectures', 'Perceptron', 'Convergence', 'Bayes', 'Revision'],
  },
  module2: {
    number: '02',
    routeId: 'module-2',
    tone: 2,
    question: 'How do hidden layers and backpropagation turn error into learning?',
    chips: ['MLP', 'Batch vs online', 'Backprop', 'XOR', 'Heuristics'],
    story: ['MLP', 'Learning Modes', 'Forward', 'Backprop', 'XOR', 'Heuristics', 'Differentiation', 'Revision'],
  },
  module3: {
    number: '03',
    routeId: 'module-3',
    tone: 3,
    question: 'How do we stop overfitting — and why is deep training so hard?',
    chips: ['L2', 'Augmentation', 'Semi-supervised', 'Saddles', 'Ill-conditioning'],
    story: ['Overfitting', 'L2', 'Augment', 'Semi-Supervised', 'Landscape', 'Saddles', 'Workflow', 'Revision'],
  },
  module4: {
    number: '04',
    routeId: 'module-4',
    tone: 4,
    question: 'How does convolution discover visual structure with shared local filters?',
    chips: ['Convolution', 'Pooling', 'Priors', 'Variants', 'CNN history'],
    story: ['Convolution', 'Motivation', 'Pooling', 'Priors', 'Variants', 'Outputs', 'Efficiency', 'History', 'Revision'],
  },
  module5: {
    number: '05',
    routeId: 'module-5',
    tone: 5,
    question: 'How do recurrent and gated models remember what matters across time?',
    chips: ['Unfolding', 'RNN', 'Bidirectional', 'Encoder–Decoder', 'LSTM'],
    story: ['Sequences', 'Unfolding', 'RNN', 'Bidirectional', 'Encoder-Decoder', 'Deep/Recursive', 'LSTM', 'Revision'],
  },
}

function storyIndex(n, total, storyLen) {
  if (storyLen <= 1) return 0
  const ratio = (n - 1) / Math.max(1, total - 1)
  return Math.min(storyLen - 1, Math.floor(ratio * storyLen))
}

function takeawayFrom(entry) {
  if (entry.takeaway && entry.takeaway.length > 18 && entry.takeaway.length < 180) {
    return entry.takeaway
  }
  for (const p of entry.points || []) {
    if (!p) continue
    if (/^ask students|^tell students|^explain that|^use |^show |^make |^start /i.test(p)) continue
    if (p.length >= 28 && p.length <= 160) return p
  }
  return 'Watch the signal flow — then connect the diagram to the syllabus wording.'
}

function pairCards(points = []) {
  const cards = []
  for (let i = 0; i < points.length - 1; i += 1) {
    const a = points[i]
    const b = points[i + 1]
    if (a && b && a.length <= 42 && b.length > 18) {
      cards.push([a, b])
      i += 1
    }
  }
  return cards
}

function splitCompare(points = []) {
  if (points.length < 4) return null
  const mid = Math.ceil(points.length / 2)
  return {
    leftTitle: points[0]?.length < 40 ? points[0] : 'View A',
    leftItems: points.slice(1, mid).filter(Boolean),
    rightTitle: points[mid]?.length < 40 ? points[mid] : 'View B',
    rightItems: points.slice(mid + 1).filter(Boolean),
  }
}

function renderBody(entry, meta) {
  const points = [...(entry.points || []), ...(entry.extraPoints || [])].filter(Boolean)
  const layout = entry.layout || 'concept'
  const cards = pairCards(points)
  const compare = splitCompare(points)

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
        <Lead>Follow the module story — each checkpoint is a syllabus phrase made visual.</Lead>
        <Flow items={meta.story} />
        <Points items={points.slice(0, 5)} />
      </>
    )
  }

  if (layout === 'formula') {
    return (
      <>
        <Lead>Read the equation, then watch what each symbol does in the network.</Lead>
        {entry.formula ? <Formula>{entry.formula}</Formula> : null}
        <Points items={points.filter((p) => p !== entry.formula).slice(0, 5)} />
        <Example label="Intuition">Variables → visual role → one worked teaching example.</Example>
      </>
    )
  }

  if (layout === 'hero') {
    return (
      <>
        <Lead>{points[0] || 'Watch the architecture think on the stage.'}</Lead>
        <Points items={points.slice(1, 4)} />
      </>
    )
  }

  if (layout === 'activity') {
    return (
      <>
        <Lead>Classroom mini-activity — keep the diagram on screen while students reason aloud.</Lead>
        <Points items={points.slice(0, 5)} />
        <Example label="Facilitator tip">Ask for a prediction before revealing the next visual state.</Example>
      </>
    )
  }

  if (layout === 'exam') {
    return (
      <>
        <Lead>Use syllabus language. Separate definition, condition, and consequence.</Lead>
        <Points items={points.slice(0, 8)} />
        <Example label="Exam structure">Define → Derive/Show → Compare → Conclude with one limitation.</Example>
      </>
    )
  }

  if (layout === 'revision') {
    return (
      <>
        <Lead>Module in one glance — keep these phrases ready for the exam.</Lead>
        {cards.length >= 2 ? <Cards items={cards.slice(0, 4)} /> : <Points items={points.slice(0, 8)} />}
        <Remember>If you can redraw the diagram and name the condition, you own the topic.</Remember>
      </>
    )
  }

  if (compare && /vs|versus|compare|feedforward|batch|with l2|without/i.test(entry.title + points.join(' '))) {
    return (
      <>
        <Lead>Compare both sides, then state when each view is the right teaching frame.</Lead>
        <Compare {...compare} />
      </>
    )
  }

  if (cards.length >= 2 && points.length >= 4) {
    return (
      <>
        <Lead>One idea, one visual role — then connect to the takeaway.</Lead>
        <Cards items={cards.slice(0, 4)} />
        {entry.definition?.text ? (
          <Definition term={entry.definition.term || entry.title}>{entry.definition.text}</Definition>
        ) : null}
      </>
    )
  }

  return (
    <>
      <Lead>See the computation, then lock the syllabus wording.</Lead>
      {entry.definition?.text ? (
        <Definition term={entry.definition.term || 'Definition'}>{entry.definition.text}</Definition>
      ) : null}
      {entry.formula ? <Formula>{entry.formula}</Formula> : null}
      <Points items={points.filter((p) => p !== entry.formula).slice(0, 5)} />
    </>
  )
}

function visualFor(entry, meta) {
  const sig = getDlSignature(entry.id)
  if (sig?.key) {
    return pickDlScene(sig.key, {
      steps: meta.story,
      items: meta.story,
      title: entry.title,
      nodes: meta.story,
      mode: sig.mode,
      composition: sig.composition,
      camera: sig.camera,
      action: sig.action,
      family: sig.family,
    })
  }
  // Fallback for resource slide or unknown ids
  return pickDlScene('dl-coverage-m1', { items: meta.story })
}

function createModuleSlides(data) {
  const meta = MODULE_META[data.id]
  const story = meta.story || data.story
  const slides = data.slides.map((entry) => {
    const active = storyIndex(entry.n, data.slides.length, story.length)
    const layout =
      entry.layout === 'opener'
        ? 'hero'
        : entry.layout === 'exam' || entry.layout === 'revision'
          ? entry.layout
          : entry.layout === 'hero'
            ? 'hero'
            : ''
    const reverse = entry.n % 6 === 0 && !['opener', 'journey', 'hero'].includes(entry.layout)

    return slide({
      id: entry.id,
      kicker: `DEEP LEARNING · MODULE ${meta.number}`,
      title: entry.layout === 'opener' ? null : entry.title,
      subtitle: entry.subtitle || undefined,
      hideTitle: entry.layout === 'opener',
      tone: meta.tone,
      layout: entry.layout,
      notes: [entry.say, entry.takeaway].filter(Boolean).join(' '),
      content: (
        <Deck
          active={active}
          story={story}
          visual={visualFor(entry, meta)}
          takeaway={takeawayFrom(entry)}
          reverse={reverse}
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
      kicker: `DEEP LEARNING · MODULE ${meta.number}`,
      title: 'Study resources',
      tone: meta.tone,
      layout: 'resources',
      notes: 'Open notes, practice questions and lab after the lecture.',
      content: (
        <Deck
          active={story.length - 1}
          story={story}
          visual={pickDlScene('dl-coverage-m1', { items: ['Notes', 'PYQ', 'Lab', 'Revise'] })}
          takeaway="Keep the lecture theory-first — use resources after the story ends."
          tone={meta.tone}
        >
          <Lead>Continue with notes, practice questions, and the practical / lab track.</Lead>
          <ResourceHub moduleId={meta.routeId} />
        </Deck>
      ),
    }),
  )

  return slides
}

export const deepLearningModule1Slides = createModuleSlides(module1Data)
export const deepLearningModule2Slides = createModuleSlides(module2Data)
export const deepLearningModule3Slides = createModuleSlides(module3Data)
export const deepLearningModule4Slides = createModuleSlides(module4Data)
export const deepLearningModule5Slides = createModuleSlides(module5Data)

export const deepLearningSlideCounts = {
  module1: deepLearningModule1Slides.length,
  module2: deepLearningModule2Slides.length,
  module3: deepLearningModule3Slides.length,
  module4: deepLearningModule4Slides.length,
  module5: deepLearningModule5Slides.length,
  total:
    deepLearningModule1Slides.length
    + deepLearningModule2Slides.length
    + deepLearningModule3Slides.length
    + deepLearningModule4Slides.length
    + deepLearningModule5Slides.length,
}

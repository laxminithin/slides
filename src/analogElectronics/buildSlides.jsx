import {
  aeSlide,
  Stage,
  Lead,
  Definition,
  Flow,
  Formula,
  Callout,
  NumericalBoard,
  TermChips,
  RoadmapGrid,
  FormulaSheet,
  SyllabusAudit,
  PracticeList,
  ReviewMap,
} from './AelicKit.jsx'
import { ModuleHero, ModuleOutro, beatVisual } from './AelicScenes.jsx'
import { getShowcase } from './AelicShowcase.jsx'
import { getAelicModule } from './curriculum.js'

const FAMILIES = [
  'current-flow',
  'signal-propagation',
  'bias-build',
  'capacitor-charge',
  'amplifier-gain',
  'feedback-loop',
  'waveform-clip',
  'filter-smooth',
  'oscillation-build',
  'saturation',
  'phase-shift',
  'frequency-response',
  'formula-reveal',
  'numerical-board',
  'compare-split',
]

function rotate(list, i) {
  return list[i % list.length]
}

function s(cfg, body) {
  return aeSlide({ ...cfg, content: body })
}

function practiceQuestions(mod) {
  const u = mod.units
  return [
    { marks: '10 marks', text: `Explain ${u[0].topic.toLowerCase()} with a neat circuit diagram.` },
    { marks: '10 marks', text: `Derive or outline the analysis method for ${u[1].topic.toLowerCase()}.` },
    { marks: '10 marks', text: `Compare ${u[2].topic.toLowerCase()} and ${u[3].topic.toLowerCase()}.` },
    { marks: 'short note', text: `Solve a numerical design problem based on ${u[4].topic.toLowerCase()}.` },
    { marks: 'short note', text: `Draw the waveform/response for ${u[5].topic.toLowerCase()} and explain.` },
    { marks: 'short note', text: `Write short notes on ${u[6].topic.toLowerCase()} and applications.` },
  ]
}

/**
 * Build one module deck from curriculum.
 * Pattern per topic (4 beats) + openers/closers — mirrors AELIC_Module_N.pptx coverage.
 */
export function buildAelicModuleSlides(moduleNumber) {
  const mod = getAelicModule(moduleNumber)
  if (!mod) return []

  const k = (t) => `MODULE ${mod.n} · ${t}`
  const story = mod.story
  const slides = []
  let sig = 0

  // Emit a topic beat — swap in a bespoke showcase hero when this id is registered.
  const emitBeat = (cfg, body) => {
    const sc = getShowcase(cfg.id)
    if (sc) {
      slides.push(
        s(
          {
            id: cfg.id,
            kicker: cfg.kicker,
            title: sc.title,
            hideTitle: true,
            composition: 'showcase',
            camera: sc.camera,
            family: sc.family,
            object: sc.object,
            action: 'showcase',
            film: { hero: true, camera: sc.camera, composition: 'showcase', animationFamily: sc.family, dominantObject: sc.object, teachingAction: 'showcase' },
          },
          <Stage composition="showcase" visual={sc.scene} takeaway={sc.takeaway} />,
        ),
      )
    } else {
      slides.push(s(cfg, body))
    }
    sig += 1
  }

  // 1 — Cinematic opener
  slides.push(
    s(
      {
        id: `m${mod.n}-open`,
        kicker: k('OPEN'),
        title: mod.title,
        hideTitle: true,
        composition: 'hero-open',
        camera: 'wide-circuit',
        family: 'signal-propagation',
        object: 'hero',
        action: 'open',
        film: { chapterOpener: true, hero: true },
        notes: `Cinematic open for 1BEC304 Module ${mod.n}. ${mod.hours} teaching hours.`,
      },
      <Stage
        composition="hero-open"
        visual={<ModuleHero module={mod.n} title={mod.title} question={mod.question} hours={mod.hours} />}
        takeaway={mod.question}
      />,
    ),
  )
  sig += 1

  // 2 — Syllabus audit
  slides.push(
    s(
      {
        id: `m${mod.n}-audit`,
        kicker: k('SYLLABUS'),
        title: 'COVERED / MISSING = 0',
        composition: 'board',
        camera: 'overhead-graph',
        family: 'compare-split',
        object: 'syllabus',
        action: 'audit',
        notes: 'Internal cross-check against VTU 1BEC304 module topics.',
      },
      <Stage composition="board" takeaway="Every syllabus topic in this module is covered." exam="Use this map as a revision checklist.">
        <Lead>Module {mod.n} syllabus audit — each row is teaching-ready.</Lead>
        <SyllabusAudit items={mod.syllabus} />
      </Stage>,
    ),
  )
  sig += 1

  // 3 — Roadmap
  slides.push(
    s(
      {
        id: `m${mod.n}-roadmap`,
        kicker: k('SEQUENCE'),
        title: 'Teaching sequence',
        composition: 'pipeline',
        camera: 'side-by-side',
        family: 'phase-shift',
        object: 'roadmap',
        action: 'sequence',
      },
      <Stage
        composition="pipeline"
        story={story}
        beat={0}
        visual={<ModuleHero module={mod.n} />}
        takeaway="Each topic becomes: concept → circuit → analysis → example."
      >
        <Lead>Roadmap for Module {mod.n}</Lead>
        <Flow items={['Concept', 'Circuit', 'Analysis', 'Example']} />
        <RoadmapGrid items={mod.units.map((u) => u.topic)} />
      </Stage>,
    ),
  )
  sig += 1

  // 4 — Formula sheet
  slides.push(
    s(
      {
        id: `m${mod.n}-formulas`,
        kicker: k('EXAM REF'),
        title: 'Formula and design checkpoints',
        composition: 'formula-board',
        camera: 'pull-formula',
        family: 'formula-reveal',
        object: 'formulas',
        action: 'memorize',
      },
      <Stage composition="formula-board" exam="Name the assumptions behind each checkpoint.">
        <Lead>Module {mod.n} quick reference</Lead>
        <FormulaSheet formulas={mod.formulas} />
      </Stage>,
    ),
  )
  sig += 1

  // Topic beats — four DISTINCT cameras per unit:
  //   concept (device close-up) → circuit (working) → analysis (model/graph) → example (numbers)
  mod.units.forEach((unit, ui) => {
    const baseId = `m${mod.n}-u${ui + 1}`
    const topicLc = unit.topic.toLowerCase()

    // 0 — Concept: device close-up is the hero; definition + terms alongside
    const conceptComp = ui % 2 === 0 ? 'inspect' : 'board'
    emitBeat(
      {
        id: `${baseId}-idea`,
        kicker: k(unit.topic.toUpperCase()),
        title: `${unit.topic}: core idea`,
        composition: conceptComp,
        camera: 'close-device',
        family: rotate(FAMILIES, sig),
        object: `${unit.visual}-device`,
        action: 'define',
        notes: unit.definition,
      },
      <Stage
        composition={conceptComp}
        visual={beatVisual(unit, 0)}
        takeaway={unit.takeaway}
      >
        <Definition term={unit.topic}>{unit.definition}</Definition>
        <TermChips items={unit.terms} />
      </Stage>,
    )

    // 1 — Circuit working: the circuit dominates; copy is minimal + specific
    emitBeat(
      {
        id: `${baseId}-circuit`,
        kicker: k('CIRCUIT'),
        title: `${unit.topic}: circuit working`,
        composition: 'circuit-first',
        camera: 'wide-circuit',
        family: rotate(['current-flow', 'signal-propagation', 'bias-build', 'feedback-loop', 'amplifier-gain'], ui),
        object: `${unit.visual}-circuit`,
        action: 'trace',
      },
      <Stage
        composition="circuit-first"
        visual={beatVisual(unit, 1)}
        takeaway={unit.takeaway}
        exam="Trace input → bias path → output on the diagram."
      >
        <Lead>Follow the working path through the {topicLc}.</Lead>
        <Callout kind="know" label="Read the diagram">{unit.takeaway}</Callout>
      </Stage>,
    )

    // 2 — Analysis: the model / graph is the hero; one core relation
    const analysisComp = ui % 2 === 0 ? 'split-left' : 'formula-board'
    emitBeat(
      {
        id: `${baseId}-analysis`,
        kicker: k('ANALYSIS'),
        title: `${unit.topic}: analysis method`,
        composition: analysisComp,
        camera: rotate(['overhead-graph', 'pull-formula', 'follow-signal'], ui),
        family: rotate(['formula-reveal', 'amplifier-gain', 'phase-shift', 'frequency-response'], ui),
        object: `${unit.visual}-model`,
        action: 'derive',
      },
      <Stage
        composition={analysisComp}
        visual={beatVisual(unit, 2)}
        takeaway={unit.takeaway}
      >
        <Lead>One relation carries the {topicLc} analysis:</Lead>
        {unit.formula && (
          <Formula vars={unit.formula.vars}>{unit.formula.eq}</Formula>
        )}
      </Stage>,
    )

    // 3 — Example: worked numbers beside the result waveform
    const num = unit.numerical
    emitBeat(
      {
        id: `${baseId}-example`,
        kicker: k('EXAMPLE'),
        title: `${unit.topic}: classroom example`,
        composition: 'board',
        camera: rotate(['side-by-side', 'overhead-graph'], ui),
        family: rotate(['numerical-board', 'waveform-clip', 'capacitor-charge', 'saturation'], ui),
        object: 'worked-example',
        action: 'solve',
      },
      <Stage
        composition="board"
        visual={beatVisual(unit, 3)}
        takeaway={num.result}
        exam="Check units and region of operation."
      >
        <NumericalBoard given={num.given} find={num.find} steps={num.steps} result={num.result} />
      </Stage>,
    )
  })

  // Review
  slides.push(
    s(
      {
        id: `m${mod.n}-review`,
        kicker: k('REVIEW'),
        title: 'Module summary map',
        composition: 'full-stage',
        camera: 'overhead-graph',
        family: 'compare-split',
        object: 'map',
        action: 'recall',
      },
      <Stage
        composition="full-stage"
        visual={<ReviewMap title={mod.title} topics={mod.units.map((u) => u.topic)} />}
        takeaway="If students can redraw this map, they can revise the module quickly."
      />,
    ),
  )

  // Practice
  slides.push(
    s(
      {
        id: `m${mod.n}-practice`,
        kicker: k('PRACTICE'),
        title: 'Exam-focused questions',
        composition: 'board',
        camera: 'close-device',
        family: 'saturation',
        object: 'questions',
        action: 'practice',
      },
      <Stage composition="board" exam="Sketch the circuit before writing equations.">
        <PracticeList questions={practiceQuestions(mod)} />
      </Stage>,
    ),
  )

  // Second formula checkpoint (mirrors PPT slide 47)
  slides.push(
    s(
      {
        id: `m${mod.n}-formulas-2`,
        kicker: k('CHECKPOINTS'),
        title: 'Design checkpoints — again',
        composition: 'formula-board',
        camera: 'pull-formula',
        family: 'formula-reveal',
        object: 'formulas',
        action: 'reinforce',
      },
      <Stage composition="formula-board" visual={<ModuleHero module={mod.n} />} takeaway="Assumptions matter as much as algebra.">
        <Callout kind="idea" label="Exam tip">
          Recite each formula with the circuit condition that makes it valid.
        </Callout>
        <FormulaSheet formulas={mod.formulas} />
      </Stage>,
    ),
  )

  // Closing review + practice echo (PPT has duplicate review/practice near end)
  slides.push(
    s(
      {
        id: `m${mod.n}-review-2`,
        kicker: k('RECALL'),
        title: 'Redraw the module in one minute',
        composition: 'full-stage',
        camera: 'wide-circuit',
        family: 'signal-propagation',
        object: 'summary',
        action: 'close',
      },
      <Stage
        composition="full-stage"
        visual={<ReviewMap title={mod.title} topics={mod.units.map((u) => u.topic)} />}
        takeaway={mod.question}
      >
        <Lead>Module {mod.n} closed — circuits first, then math, then meaning.</Lead>
      </Stage>,
    ),
  )

  slides.push(
    s(
      {
        id: `m${mod.n}-end`,
        kicker: k('NEXT'),
        title: 'You can now teach this module as a living lab',
        hideTitle: true,
        composition: 'hero-open',
        camera: 'wide-circuit',
        family: 'oscillation-build',
        object: 'hero',
        action: 'close',
        film: { chapterCloser: true },
      },
      <Stage
        composition="hero-open"
        visual={<ModuleOutro module={mod.n} story={story} title={`${mod.title} — complete`} />}
        takeaway="Bias → signal → model → gain → application."
      />,
    ),
  )

  return slides
}

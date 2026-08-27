import {
  unixSlide,
  Stage,
  Lead,
  Definition,
  Flow,
  Points,
  Callout,
  TermChips,
  RoadmapGrid,
  CheckpointSheet,
  SyllabusAudit,
  PracticeList,
  ReviewMap,
  AlgoSteps,
  ComplexityBlock,
  CodePanel,
  DryRunPanel,
  ResourceHub,
} from './UnixKit.jsx'
import { ModuleHero, ModuleOutro, beatVisual } from './UnixScenes.jsx'
import { getShowcase } from './UnixShowcase.jsx'
import { getUnixModule } from './curriculum.js'

const FAMILIES = [
  'process-flow',
  'waterfall-cascade',
  'incremental-grow',
  'evolutionary-cycle',
  'concurrent-states',
  'up-phases',
  'requirements-cycle',
  'usecase-path',
  'agile-loop',
  'xp-pipeline',
  'backlog-move',
  'stakeholder-map',
  'risk-matrix',
  'cost-benefit',
  'estimate-decompose',
  'quality-gate',
  'myth-bust',
  'compare-split',
  'feedback-loop',
  'lifecycle-arc',
]

function rotate(list, i) {
  return list[i % list.length]
}

function s(cfg, body) {
  return unixSlide({ ...cfg, content: body })
}

function practiceQuestions(mod) {
  const u = mod.units.filter((x) => !/^start with why/i.test(x.topic) && !/:\s*terminal\/program view$/i.test(x.topic))
  const pick = (i) => u[Math.min(i, u.length - 1)]
  return [
    { marks: '10 marks', text: `Define ${pick(0).topic.toLowerCase()} and explain its representation with a neat diagram.` },
    { marks: '10 marks', text: `Trace the operations of ${pick(1).topic.toLowerCase()} with a dry run.` },
    { marks: '10 marks', text: `Write an algorithm for ${pick(4).topic.toLowerCase()} and state its complexity.` },
    { marks: 'short note', text: `Compare ${pick(2).topic.toLowerCase()} with ${pick(3).topic.toLowerCase()}.` },
    { marks: 'short note', text: `Explain a common mistake in ${pick(5).topic.toLowerCase()}.` },
    { marks: 'short note', text: `Show a worked example for ${pick(Math.min(7, u.length - 1)).topic.toLowerCase()}.` },
  ]
}

/**
 * Build one DS module deck from curriculum.
 * Teaching beats: concept → watch operation → algorithm/dry-run → code/complexity
 */
export function buildUnixModuleSlides(moduleNumber) {
  const mod = getUnixModule(moduleNumber)
  if (!mod) return []

  const k = (t) => `MODULE ${mod.n} · ${t}`
  const story = mod.story
  const slides = []
  let sig = 0

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
            film: {
              hero: true,
              camera: sc.camera,
              composition: 'showcase',
              animationFamily: sc.family,
              dominantObject: sc.object,
              teachingAction: 'showcase',
            },
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
        camera: 'wide-process',
        family: 'process-flow',
        object: 'hero',
        action: 'open',
        film: { chapterOpener: true, hero: true },
        notes: `Cinematic open for BCS515C Module ${mod.n}. ${mod.hours} teaching hours.`,
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
        composition: 'fill',
        camera: 'overhead-array',
        family: 'compare-split',
        object: 'syllabus',
        action: 'audit',
        notes: 'Internal cross-check against VTU BCS515C module topics.',
      },
      <Stage composition="fill" takeaway="Every syllabus topic in this module is covered." exam="Use this map as a revision checklist.">
        <Lead>Module {mod.n} syllabus audit — each row is teaching-ready.</Lead>
        <SyllabusAudit items={mod.syllabus.filter((t) => !/^start with why/i.test(t) && !/:\s*terminal\/program view$/i.test(t))} />
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
        family: 'pointer-trace',
        object: 'roadmap',
        action: 'sequence',
      },
      <Stage
        composition="pipeline"
        story={story}
        beat={0}
        visual={<ModuleHero module={mod.n} />}
        takeaway="Each topic becomes: problem → structure → watch → algorithm → complexity."
      >
        <Lead>Roadmap for Module {mod.n}</Lead>
        <Flow items={['Problem', 'Structure', 'Watch', 'Algorithm', 'Complexity']} />
        <RoadmapGrid items={mod.units.filter((u) => !/^start with why/i.test(u.topic) && !/:\s*terminal\/program view$/i.test(u.topic)).map((u) => u.topic)} />
      </Stage>,
    ),
  )
  sig += 1

  // 4 — Complexity checkpoints
  slides.push(
    s(
      {
        id: `m${mod.n}-checkpoints`,
        kicker: k('EXAM REF'),
        title: 'Complexity checkpoints',
        composition: 'fill',
        camera: 'pull-complexity',
        family: 'compare-split',
        object: 'checkpoints',
        action: 'memorize',
      },
      <Stage composition="fill" exam="Connect each diagram label to the animation you saw.">
        <Lead>Module {mod.n} exam checkpoints</Lead>
        <CheckpointSheet checkpoints={mod.checkpoints.filter((c) => !/^start with why/i.test(c.label) && !/:\s*(terminal\/program view|message movement)$/i.test(c.label))} />
      </Stage>,
    ),
  )
  sig += 1

  // Topic beats — four DISTINCT cameras per unit
  mod.units.forEach((unit, ui) => {
    // Skip the auto-generated "Start with why the module matters." sentinel
    // unit — it emitted 4 placeholder beats. Skipping in-place preserves ui,
    // so the index-keyed showcase registrations stay aligned.
    if (/^start with why/i.test(unit.topic)) return
    // Skip the ": terminal/program view" twin units. Each real PPTX topic was
    // duplicated into a twin whose beats render the same scene as the base
    // unit (keyword match hits first) — pure Section-18 fragmentation. Skipping
    // in-place keeps ui aligned; the base unit still carries the one showcase.
    if (/:\s*terminal\/program view$/i.test(unit.topic)) return
    const baseId = `m${mod.n}-u${ui + 1}`
    const topicLc = unit.topic.toLowerCase()
    const shortTopic = unit.topic.length > 34 ? `${unit.topic.slice(0, 32)}…` : unit.topic

    // 0 — Concept. Always the visual-dominant "inspect" layout: the earlier
    // "board" variant gave the diagram only a half-width column (~30% of stage)
    // and left the lower-left empty. inspect puts the concept diagram in the
    // wide right column so the structure reads large.
    const conceptComp = 'inspect'
    emitBeat(
      {
        id: `${baseId}-idea`,
        kicker: k(unit.topic.toUpperCase()),
        title: `${shortTopic}: core idea`,
        composition: conceptComp,
        camera: rotate(['close-process', 'wide-process', 'side-by-side'], ui),
        family: rotate(FAMILIES, sig),
        object: `${unit.visual}-idea`,
        action: 'define',
        notes: unit.definition,
      },
      <Stage composition={conceptComp} visual={beatVisual(unit, 0)} takeaway={unit.takeaway}>
        <Definition term={unit.topic}>{unit.definition}</Definition>
        <TermChips items={unit.terms} />
      </Stage>,
    )

    // 1 — Watch the operation (showcase when registered)
    emitBeat(
      {
        id: `${baseId}-ops`,
        kicker: k('WATCH'),
        title: `${shortTopic}: watch`,
        composition: 'inspect',
        camera: rotate(['follow-flow', 'overhead-board', 'side-by-side'], ui),
        family: rotate(
          ['process-flow', 'waterfall-cascade', 'incremental-grow', 'agile-loop', 'xp-pipeline', 'risk-matrix', 'backlog-move'],
          ui,
        ),
        object: `${unit.visual}-ops`,
        action: 'animate',
      },
      <Stage
        composition="inspect"
        visual={beatVisual(unit, 1)}
        takeaway={unit.takeaway}
        exam="Describe the state change you just watched."
      >
        <Lead>Watch how {topicLc} plays out as a living process.</Lead>
        <Callout kind="know" label="State change">{unit.takeaway}</Callout>
        <Points items={unit.terms.slice(0, 4)} />
      </Stage>,
    )

    // 2 — Algorithm + dry run
    const algoComp = ui % 2 === 0 ? 'algo-board' : 'split-left'
    emitBeat(
      {
        id: `${baseId}-algo`,
        kicker: k('ALGORITHM'),
        title: `${shortTopic}: algorithm`,
        composition: algoComp,
        camera: rotate(['side-by-side', 'follow-pointer', 'pull-complexity'], ui),
        family: rotate(['pointer-trace', 'node-insert', 'search-probe', 'tree-search'], ui),
        object: `${unit.visual}-algo`,
        action: 'trace',
      },
      <Stage composition={algoComp} visual={beatVisual(unit, 2)} takeaway={unit.takeaway}>
        <Lead>State → operation → updated state for {topicLc}.</Lead>
        <AlgoSteps steps={unit.algo} />
        <DryRunPanel dryRun={unit.dryRun} />
      </Stage>,
    )

    // 3 — Code + complexity + mistake
    const exComp = unit.code ? 'code-split' : rotate(['board', 'split-right'], ui)
    emitBeat(
      {
        id: `${baseId}-example`,
        kicker: k('EXAMPLE'),
        title: `${shortTopic}: example`,
        composition: exComp,
        camera: rotate(['pull-complexity', 'side-by-side', 'close-node'], ui),
        family: rotate(['compare-split', 'heap-swap', 'array-shift', 'circular-wrap'], ui),
        object: 'worked-example',
        action: 'solve',
      },
      <Stage
        composition={exComp}
        visual={beatVisual(unit, 3)}
        takeaway={unit.dryRun?.result || unit.takeaway}
        exam={unit.mistake}
        cue="COMMON MISTAKE"
      >
        {unit.code ? <CodePanel code={unit.code} /> : <DryRunPanel dryRun={unit.dryRun} />}
        <ComplexityBlock complexity={unit.complexity} />
        <Callout kind="warn" label="Avoid">{unit.mistake}</Callout>
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
        camera: 'overhead-array',
        family: 'compare-split',
        object: 'map',
        action: 'recall',
      },
      <Stage
        composition="full-stage"
        visual={<ReviewMap title={mod.title} topics={mod.units.filter((u) => !/^start with why/i.test(u.topic) && !/:\s*terminal\/program view$/i.test(u.topic)).map((u) => u.topic)} />}
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
        composition: 'fill',
        camera: 'close-node',
        family: 'search-probe',
        object: 'questions',
        action: 'practice',
      },
      <Stage composition="fill" exam="Sketch the diagram before writing the 10-mark answer.">
        <PracticeList questions={practiceQuestions(mod)} />
      </Stage>,
    ),
  )

  // Second checkpoint (mirrors PPT slide 47)
  slides.push(
    s(
      {
        id: `m${mod.n}-checkpoints-2`,
        kicker: k('CHECKPOINTS'),
        title: 'Exam checkpoints — reinforce',
        composition: 'fill',
        camera: 'pull-complexity',
        family: 'compare-split',
        object: 'checkpoints',
        action: 'reinforce',
      },
      <Stage
        composition="fill"
        takeaway="Each checkpoint is explained by the animation you watched."
        exam="Recite each diagram with the process motion that causes it."
      >
        <CheckpointSheet checkpoints={mod.checkpoints.filter((c) => !/^start with why/i.test(c.label) && !/:\s*(terminal\/program view|message movement)$/i.test(c.label))} />
      </Stage>,
    ),
  )

  // Closing review
  slides.push(
    s(
      {
        id: `m${mod.n}-review-2`,
        kicker: k('RECALL'),
        title: 'Redraw the module in one minute',
        composition: 'full-stage',
        camera: 'wide-process',
        family: 'process-flow',
        object: 'summary',
        action: 'close',
      },
      <Stage
        composition="full-stage"
        visual={<ReviewMap title={mod.title} topics={mod.units.filter((u) => !/^start with why/i.test(u.topic) && !/:\s*terminal\/program view$/i.test(u.topic)).map((u) => u.topic)} />}
        takeaway={mod.question}
      >
        <Lead>Module {mod.n} closed — concepts, living diagrams, then exam takeaways.</Lead>
      </Stage>,
    ),
  )

  // Study resources at END
  slides.push(
    s(
      {
        id: `m${mod.n}-resources`,
        kicker: k('RESOURCES'),
        title: 'Notes and practice',
        composition: 'fill',
        camera: 'side-by-side',
        family: 'compare-split',
        object: 'resources',
        action: 'study',
      },
      <Stage composition="fill" takeaway="Practice after you can redraw the process diagrams.">
        <ResourceHub moduleId={mod.id} />
      </Stage>,
    ),
  )

  // Outro
  slides.push(
    s(
      {
        id: `m${mod.n}-end`,
        kicker: k('NEXT'),
        title: 'The software process came alive in this module',
        hideTitle: true,
        composition: 'hero-open',
        camera: 'wide-process',
        family: 'process-flow',
        object: 'hero',
        action: 'close',
        film: { chapterCloser: true },
      },
      <Stage
        composition="hero-open"
        visual={<ModuleOutro module={mod.n} title={`${mod.title} — complete`} />}
        takeaway="Problem → mechanism → animation → example → exam."
      />,
    ),
  )

  return slides
}

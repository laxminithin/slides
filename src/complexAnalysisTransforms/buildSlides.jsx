import {
  catSlide,
  Stage,
  Lead,
  Definition,
  Flow,
  Points,
  Callout,
  TermChips,
  BookCite,
  RoadmapGrid,
  CheckpointSheet,
  SyllabusAudit,
  PracticeList,
  QuizCard,
  ReviewMap,
  AlgoSteps,
  MethodCost,
  WorkedPanel,
  DryRunPanel,
} from './CatKit.jsx'
import { ModuleHero, ModuleOutro, beatVisual } from './CatScenes.jsx'
import { getShowcase } from './CatShowcase.jsx'
import { getModule } from './curriculum.js'

const FAMILIES = [
  'plane-map',
  'limit-approach',
  'contour-walk',
  'residue-pick',
  'harmonic-stack',
  'coefficient-extract',
  'symmetry-fold',
  'spectrum-spread',
  'kernel-slide',
  'pole-place',
  'sequence-step',
  'sample-scatter',
  'density-shade',
  'tail-cut',
  'estimate-narrow',
  'region-carve',
  'vertex-hop',
  'pivot-swap',
  'gradient-slide',
  'bound-tighten',
]

function rotate(list, i) {
  return list[i % list.length]
}

function s(cfg, body) {
  return catSlide({ ...cfg, content: body })
}

// The header holds two lines; 24 chars was cutting 73% of topics and leaving
// 59 pairs of units in the same module with identical visible titles
// (`Capacitance voltage tra…` twice). 40 fills the line it actually has.
function shorten(text, max = 40) {
  if (!text) return ''
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

/**
 * Phase 1 definitions run 800-1200 characters — a full paragraph. That is the
 * right length for the speaker notes and the Notes page (both carry it whole),
 * but it does not fit the copy column at 1280x720, and the overflow silently
 * pushed the term chips and the textbook citation off the stage.
 *
 * On the slide, keep whole sentences up to a budget. Splitting only before a
 * capital letter avoids breaking on "z = 1 + 2i" or "Ch. 7".
 */
function leadSentences(text, budget = 420) {
  if (!text) return ''
  const chunks = text.split(/\.\s+(?=[A-Z])/)
  const parts = chunks.map((p, i) => (i < chunks.length - 1 ? `${p}.` : p))
  let out = ''
  for (const part of parts) {
    if (out && out.length + part.length > budget) break
    out = out ? `${out} ${part}` : part
  }
  return out || text.slice(0, budget)
}

/** Exam checkpoints come straight from the unit records: what it is, which CO
 *  and Bloom level it is assessed at, and the one line worth memorising.
 *
 *  16 units do not fit one stage at 1280x720 — the sheet is split across the
 *  module's two checkpoint slides rather than clipped or shrunk to unreadable.
 */
const CHECKPOINT_SPLIT = 8

function checkpoints(mod, half) {
  const rows = mod.units.map((u) => ({
    label: u.topic,
    formula: [u.co, u.bloom].filter(Boolean).join(' · '),
    why: u.takeaway,
  }))
  if (half === 1) return rows.slice(0, CHECKPOINT_SPLIT)
  if (half === 2) return rows.slice(CHECKPOINT_SPLIT)
  return rows
}

/** Practice list is the module's own graded assignment, not invented questions. */
function practiceQuestions(mod) {
  const tasks = (mod.assignment?.tasks || []).slice(0, 5)
  const theory = (mod.assignment?.theory || []).slice(0, 2)
  return [...tasks, ...theory].map((t) => ({
    id: t.id,
    text: t.text,
    marks: `${t.marks} mark${t.marks === 1 ? '' : 's'} · ${t.co} · ${t.bloom}`,
  }))
}

/**
 * Build one 1BMATEE301 module deck from the Phase 1 curriculum.
 *
 * Teaching beats per unit: core idea → watch the mechanism → method and
 * worked trace → example, cost and the common mistake.
 */
export function buildCatModuleSlides(moduleNumber) {
  const mod = getModule(moduleNumber)
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
            notes: cfg.notes,
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
        camera: 'wide-page',
        family: 'plane-map',
        object: 'hero',
        action: 'open',
        film: { chapterOpener: true, hero: true },
        notes: `Cinematic open for VTU 1BMATEE301 Module ${mod.n}. ${mod.hours} teaching hours. ${mod.notes}`,
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
        camera: 'overhead-board',
        family: 'region-carve',
        object: 'syllabus',
        action: 'audit',
        notes: `Cross-check against the verbatim VTU 1BMATEE301 Module ${mod.n} topic list. Source: ${mod.chapters}`,
      },
      <Stage
        composition="fill"
        takeaway="Every syllabus line in this module is taught somewhere in this deck."
        exam="Use this list as the revision checklist before the exam."
      >
        <Lead>Module {mod.n} syllabus audit — {mod.hours} hours, {mod.units.length} teaching units.</Lead>
        <SyllabusAudit items={mod.syllabus.filter((t) => !/^Number of Hours|^Text book/i.test(t))} />
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
        family: 'coefficient-extract',
        object: 'roadmap',
        action: 'sequence',
        notes: mod.notes,
      },
      <Stage
        composition="pipeline"
        story={story}
        beat={0}
        visual={<ModuleHero module={mod.n} title={mod.title} question={mod.question} />}
        takeaway="Each unit runs: idea → watch the mechanism → method → worked example."
      >
        <Lead>Roadmap for Module {mod.n}</Lead>
        <Flow items={['Idea', 'Watch', 'Method', 'Example', 'Exam']} />
        <RoadmapGrid items={mod.units.map((u) => u.topic)} />
      </Stage>,
    ),
  )
  sig += 1

  // 4 — Exam checkpoints (first pass)
  slides.push(
    s(
      {
        id: `m${mod.n}-checkpoints`,
        kicker: k('EXAM REF'),
        title: `Exam checkpoints 1–${CHECKPOINT_SPLIT}`,
        composition: 'fill',
        camera: 'pull-plane',
        family: 'spectrum-spread',
        object: 'checkpoints',
        action: 'memorize',
        notes: `Course outcomes and Bloom levels for Module ${mod.n}, unit by unit.`,
      },
      <Stage composition="fill" exam="Each row is one answerable exam question — the CO tells you how it will be asked.">
        <Lead>Module {mod.n} — what you are expected to be able to do</Lead>
        <CheckpointSheet checkpoints={checkpoints(mod, 1)} />
      </Stage>,
    ),
  )
  sig += 1

  // Topic beats — four distinct cameras and compositions per unit
  mod.units.forEach((unit, ui) => {
    const baseId = `m${mod.n}-u${ui + 1}`
    const topicLc = unit.topic.toLowerCase()
    const shortTopic = shorten(unit.topic)

    // 0 — Core idea. Visual-dominant: the diagram gets the wide column.
    emitBeat(
      {
        id: `${baseId}-idea`,
        kicker: k(unit.topic.toUpperCase()),
        title: `${shortTopic}: core idea`,
        composition: 'inspect',
        camera: rotate(['close-symbol', 'wide-page', 'side-by-side'], ui),
        family: rotate(FAMILIES, sig),
        object: `${unit.visual}-idea`,
        action: 'define',
        notes: unit.definition,
      },
      <Stage composition="inspect" visual={beatVisual(unit, 0)} takeaway={unit.takeaway}>
        <Definition term={unit.topic}>{leadSentences(unit.definition)}</Definition>
        <TermChips items={unit.terms} />
        <BookCite book={unit.book} co={unit.co} bloom={unit.bloom} />
      </Stage>,
    )

    // 1 — Watch the mechanism (becomes a full-bleed showcase where registered)
    emitBeat(
      {
        id: `${baseId}-ops`,
        kicker: k('WATCH'),
        title: `${shortTopic}: watch it work`,
        composition: 'inspect',
        camera: rotate(['follow-curve', 'overhead-board', 'pull-plane'], ui + 1),
        family: rotate(FAMILIES, sig + 7),
        object: `${unit.visual}-ops`,
        action: 'animate',
        notes: `Animated mechanism for ${unit.topic}. ${unit.visualSpec || ''}`,
      },
      <Stage
        composition="inspect"
        visual={beatVisual(unit, 1)}
        takeaway={unit.takeaway}
        exam="Describe, in words, the state change you just watched."
      >
        {/* Topics here are noun phrases ("the Cauchy-Riemann equations and
            what they really require"), so the lead must not assume a verb follows. */}
        <Lead>Watch the mechanism: {topicLc}.</Lead>
        <Callout kind="know" label="What changes">{unit.takeaway}</Callout>
        <Points items={unit.terms.slice(0, 4)} />
      </Stage>,
    )

    // 2 — Method + worked trace
    const algoComp = ui % 2 === 0 ? 'algo-board' : 'split-left'
    emitBeat(
      {
        id: `${baseId}-algo`,
        kicker: k('METHOD'),
        title: `${shortTopic}: the procedure`,
        composition: algoComp,
        camera: rotate(['side-by-side', 'close-symbol', 'follow-curve'], ui + 2),
        family: rotate(FAMILIES, sig + 3),
        object: `${unit.visual}-method`,
        action: 'trace',
        notes: (unit.algo || []).join(' → '),
      },
      // Steps in the copy, those steps applied in the visual — the dry run is
      // the diagram here, so it is not also printed as a panel.
      <Stage composition={algoComp} visual={beatVisual(unit, 2)} takeaway={unit.takeaway}>
        <Lead>Do these steps in order for {topicLc}.</Lead>
        <AlgoSteps steps={unit.algo} />
      </Stage>,
    )

    // 3 — Worked example, cost of the method and the common mistake
    const exComp = unit.code ? 'code-split' : rotate(['board', 'split-right'], ui)
    emitBeat(
      {
        id: `${baseId}-example`,
        kicker: k('EXAMPLE'),
        title: `${shortTopic}: worked example`,
        composition: exComp,
        camera: rotate(['pull-plane', 'overhead-board', 'close-symbol'], ui + 3),
        family: rotate(FAMILIES, sig + 11),
        object: 'worked-example',
        action: 'solve',
        notes: `${unit.dryRun?.result || unit.takeaway} Common mistake: ${unit.mistake}`,
      },
      <Stage
        composition={exComp}
        visual={beatVisual(unit, 3)}
        takeaway={unit.dryRun?.result || unit.takeaway}
        exam={unit.mistake}
        cue="COMMON MISTAKE"
      >
        {/* The mistake lives in the footer exam band — not repeated here. */}
        {unit.code ? <WorkedPanel code={unit.code} /> : <DryRunPanel dryRun={unit.dryRun} />}
        <MethodCost complexity={unit.complexity} />
      </Stage>,
    )
  })

  // Review map
  slides.push(
    s(
      {
        id: `m${mod.n}-review`,
        kicker: k('REVIEW'),
        title: 'Module summary map',
        composition: 'full-stage',
        camera: 'overhead-board',
        family: 'harmonic-stack',
        object: 'map',
        action: 'recall',
        notes: `All ${mod.units.length} units of Module ${mod.n} on one map.`,
      },
      <Stage
        composition="full-stage"
        visual={<ReviewMap title={mod.title} topics={mod.units.map((u) => u.topic)} />}
        takeaway="If you can redraw this map from memory, you can revise the module in ten minutes."
      />,
    ),
  )

  // Self-check — two MCQs from the module's own quiz bank
  const mcq = (mod.quiz?.mcq || []).slice(0, 2)
  if (mcq.length) {
    slides.push(
      s(
        {
          id: `m${mod.n}-selfcheck`,
          kicker: k('SELF-CHECK'),
          title: 'Two questions before you move on',
          composition: 'fill',
          camera: 'close-symbol',
          family: 'region-carve',
          object: 'quiz',
          action: 'check',
          notes: `Sample from the ${mod.quiz.mcq.length}-question Module ${mod.n} quiz bank.`,
        },
        <Stage
          composition="fill"
          takeaway="Answer before you look — the marked option is the one to justify, not memorise."
          exam={`Full bank: ${mod.quiz.mcq.length} MCQs, ${mod.quiz.meta.totalMarks} marks, ${mod.quiz.meta.duration}.`}
        >
          {mcq.map((item) => (
            <QuizCard key={item.q} item={item} />
          ))}
        </Stage>,
      ),
    )
  }

  // Practice — the module's graded assignment
  slides.push(
    s(
      {
        id: `m${mod.n}-practice`,
        kicker: k('PRACTICE'),
        title: `Assignment ${mod.n}`,
        composition: 'fill',
        camera: 'side-by-side',
        family: 'density-shade',
        object: 'questions',
        action: 'practice',
        notes: mod.assignment?.objective,
      },
      <Stage
        composition="fill"
        takeaway={mod.assignment?.objective}
        exam={`${mod.assignment?.maxMarks} marks · ${mod.assignment?.weightage} · draw the diagram before writing anything.`}
      >
        {/* Full assignment title lives here — in the header it wraps to three
            lines and blows the typography budget. */}
        <Lead>{mod.assignment?.title}</Lead>
        <PracticeList questions={practiceQuestions(mod)} />
      </Stage>,
    ),
  )

  // Second checkpoint pass
  slides.push(
    s(
      {
        id: `m${mod.n}-checkpoints-2`,
        kicker: k('CHECKPOINTS'),
        title: `Exam checkpoints ${CHECKPOINT_SPLIT + 1}–${mod.units.length}`,
        composition: 'fill',
        camera: 'pull-plane',
        family: 'residue-pick',
        object: 'checkpoints',
        action: 'reinforce',
        notes: 'Remaining checkpoints, reached after the mechanisms have been seen.',
      },
      <Stage
        composition="fill"
        takeaway="Each checkpoint is now backed by an animation you have watched."
        exam="Recite the checkpoint, then name the diagram that proves it."
      >
        <CheckpointSheet checkpoints={checkpoints(mod, 2)} />
      </Stage>,
    ),
  )

  // Closing recall
  slides.push(
    s(
      {
        id: `m${mod.n}-review-2`,
        kicker: k('RECALL'),
        title: 'Redraw the module in one minute',
        composition: 'full-stage',
        camera: 'wide-page',
        family: 'plane-map',
        object: 'summary',
        action: 'close',
        notes: mod.question,
      },
      <Stage
        composition="full-stage"
        visual={<ReviewMap title={mod.title} topics={mod.units.map((u) => u.topic)} />}
        takeaway={mod.question}
      >
        <Lead>Module {mod.n} closed — idea, mechanism, method, then the exam answer.</Lead>
      </Stage>,
    ),
  )

  // Outro
  slides.push(
    s(
      {
        id: `m${mod.n}-end`,
        kicker: k('NEXT'),
        title: `${mod.title} — complete`,
        hideTitle: true,
        composition: 'hero-open',
        camera: 'wide-page',
        family: 'bound-tighten',
        object: 'hero',
        action: 'close',
        film: { chapterCloser: true },
        notes: `End of Module ${mod.n}. Source scope: ${mod.chapters}`,
      },
      <Stage
        composition="hero-open"
        visual={<ModuleOutro module={mod.n} title={`${mod.title} — complete`} />}
        takeaway="Analyse → decompose → transform → infer → optimise."
      />,
    ),
  )

  return slides
}

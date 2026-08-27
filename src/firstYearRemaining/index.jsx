import React from 'react'
import {
  ComparisonVisualizer,
  ConceptMap,
  DryRunTable,
  ExecutionTraceVisualizer,
  ExperimentVisualizer,
  FoundationSlide,
  ProcessAnimator,
  TeachingCallout,
  TerminalPanel,
  TimelineEngine,
} from '../firstYearFoundation'
import { firstYearDepthModules } from '../firstYearDepthContent'
import { makeSourceTeachingSlides } from '../firstYearSourceSlides'
import { theoryModules } from './modulesTheory'
import { kannadaModules } from './modulesKannada'
import { electricalLabs, eceLabs } from './modulesLabsA'
import { mechanicalLabs, materialsLabs, cLabs } from './modulesLabsB'
import { idtStages, projectStages } from './modulesProject'
import { DialogueScene, PassageScene, RemainingVisual, VocabScene } from './visuals'
import './remaining.css'

const PPTX_ROOT = 'First_Year_PPTX'
const SYLLABUS_ROOT = 'public/syllabus/1st Year Syllabus'

const TONE = { human: 'human', kannada: 'human', lab: 'lab', project: 'core' }

const KANNADA_DIGITS = ['೦೧', '೦೨', '೦೩', '೦೪', '೦೫', '೦೬', '೦೭', '೦೮']

function TopicMap({ topics, kannada = false }) {
  return (
    <div className="rem-topics" data-slide-content="true">
      {topics.map((topic, i) => (
        <article key={topic} style={{ '--i': i }}>
          <strong>{kannada ? (KANNADA_DIGITS[i] || String(i + 1)) : String(i + 1).padStart(2, '0')}</strong>
          <span>{kannada ? `ವಿಷಯ: ${topic}` : topic}</span>
        </article>
      ))}
    </div>
  )
}

function PracticeBoard({ prompt, kannada = false }) {
  return (
    <div className="rem-practice" data-slide-content="true">
      <article style={{ '--i': 0 }}><strong>{kannada ? 'ಅಭ್ಯಾಸ' : 'Practice'}</strong><span>{prompt}</span></article>
      <article style={{ '--i': 1 }}><strong>{kannada ? 'ಪರೀಕ್ಷಾ ಪ್ರಶ್ನೆಯಲ್ಲ' : 'Not a PYQ'}</strong><span>{kannada ? 'ತರಗತಿ ಅಭ್ಯಾಸ — past paper ಎಂದು ಗುರುತಿಸಿದ್ದರೆ ಮಾತ್ರ PYQ.' : 'Use this as classroom practice unless the source labels a past paper.'}</span></article>
    </div>
  )
}

function ObservationTable({ observation, result }) {
  return (
    <table className="rem-obs" data-slide-content="true">
      <thead><tr><th>Step</th><th>What you record</th></tr></thead>
      <tbody>
        <tr><td>Observation</td><td>{observation}</td></tr>
        <tr className="active"><td>Result</td><td>{result}</td></tr>
      </tbody>
    </table>
  )
}

function CaseBoard({ scenario }) {
  if (!scenario) return null
  return (
    <ProcessAnimator steps={[
      { title: 'Situation', detail: scenario.situation },
      { title: 'Issue', detail: scenario.issue },
      { title: 'Analysis', detail: scenario.analysis },
      { title: 'Response', detail: scenario.response },
      { title: 'Learning', detail: scenario.learning },
    ]} />
  )
}

function buildSourceSlides(subject, unitKey, sourceDepth, tone) {
  return makeSourceTeachingSlides({
    idPrefix: `${subject.id}-${unitKey}-source`,
    sourceDepth,
    tone,
    footer: `${subject.code} / ${unitKey}`,
    compositionFor: (block) => (/SCENARIO|LANGUAGE|TIMELINE|LAB|PROJECT/.test(block.action) ? 'full-canvas-diagram' : 'worked-example'),
  })
}

function recapSlide(base, footer, tone, nodes) {
  return {
    id: `${base}-recap`,
    title: 'Recap',
    subtitle: 'Carry the relationships, not a slogan',
    composition: 'concept-map',
    content: (
      <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
        <ConceptMap nodes={nodes} links={[
          { from: 'a', to: 'c', label: 'grounds' },
          { from: 'c', to: 'b', label: 'becomes' },
          { from: 'b', to: 'd', label: 'practised as' },
          { from: 'd', to: 'c', label: 'checks' },
        ]} />
      </FoundationSlide>
    ),
    takeaway: 'The recap is a relationship map.',
  }
}

function makeTheorySlides(subject, module, index, sourceDepth, label) {
  const base = `${subject.id}-u${index + 1}`
  const tone = TONE[module.domain]
  const footer = `${subject.code} / ${label} ${index + 1}`
  const slides = [
    {
      id: `${base}-open`,
      title: `${label} ${index + 1}: ${module.title}`,
      subtitle: module.why,
      composition: 'visual-hero',
      content: (
        <FoundationSlide layout="visual-hero" tone={tone} footer={footer}>
          <div className="rem-hero" data-slide-content="true">
            <RemainingVisual kind={module.visual} />
            <TeachingCallout kind="WHY THIS UNIT">{module.why}</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.why,
    },
    {
      id: `${base}-journey`,
      title: 'Learning journey',
      subtitle: 'Syllabus topics in teaching order',
      composition: 'full-canvas-diagram',
      content: <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}><TopicMap topics={module.topics} /></FoundationSlide>,
      takeaway: 'Coverage is a journey, not a card grid.',
    },
    {
      id: `${base}-principle`,
      title: 'Framework',
      subtitle: module.principle,
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <div className="rem-hero" data-slide-content="true">
            <RemainingVisual kind={module.visual} />
            <TeachingCallout kind="PRINCIPLE">{module.principle}</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.principle,
    },
    {
      id: `${base}-case`,
      title: module.timeline ? 'Timeline' : 'Case',
      subtitle: module.timeline ? 'Event → significance → next' : 'Situation → issue → analysis → response',
      composition: 'process',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          {module.timeline ? <TimelineEngine events={module.timeline} /> : <div data-slide-content="true"><CaseBoard scenario={module.scenario} /></div>}
        </FoundationSlide>
      ),
      takeaway: 'Cases and timelines carry the idea.',
    },
    {
      id: `${base}-better`,
      title: 'Poor example and improved version',
      subtitle: 'Why the first fails; why the second works',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <DialogueScene poor={module.poor} good={module.good} />
        </FoundationSlide>
      ),
      takeaway: 'Improvement is visible in the wording, not in a virtue word.',
    },
    {
      id: `${base}-compare`,
      title: 'Comparison',
      subtitle: 'Two ways of doing the same job',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <ComparisonVisualizer
            left={{ title: 'Weak move' }}
            right={{ title: 'Source-faithful move' }}
            dimensions={[
              { label: 'What happens', left: module.poor, right: module.good },
              { label: 'Why', left: 'Receiver cannot act', right: module.principle },
            ]}
          />
        </FoundationSlide>
      ),
      takeaway: 'Comparison is of behaviour.',
    },
    {
      id: `${base}-example`,
      title: 'Worked classroom task',
      subtitle: Array.isArray(module.example) ? module.example[0] : module.example,
      composition: 'worked-example',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <ProcessAnimator steps={(Array.isArray(module.example) ? module.example : [module.example]).map((line, i) => ({ title: ['Task', 'Given', 'Expected'][i] || 'Note', detail: line }))} />
        </FoundationSlide>
      ),
      takeaway: 'Practice is specified.',
    },
    {
      id: `${base}-mistake`,
      title: 'Common mistake',
      subtitle: 'Named, then why it is wrong',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <div className="rem-mistake" data-slide-content="true">
            <TeachingCallout kind="WRONG MOVE">{module.mistake}</TeachingCallout>
            <TeachingCallout kind="WHY">{module.principle}</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.mistake,
    },
    {
      id: `${base}-practice`,
      title: 'Practice prompt',
      subtitle: 'Classroom practice — not labelled PYQ',
      composition: 'full-canvas-diagram',
      content: <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}><PracticeBoard prompt={module.practice} /></FoundationSlide>,
      takeaway: module.practice,
    },
    recapSlide(base, footer, tone, [
      { id: 'c', label: 'Idea', x: 380, y: 210, main: true },
      { id: 'a', label: 'Context', x: 160, y: 110 },
      { id: 'b', label: 'Example', x: 600, y: 110 },
      { id: 'd', label: 'Practice', x: 380, y: 340 },
    ]),
  ]
  return [...slides.slice(0, -1), ...buildSourceSlides(subject, `u${index + 1}`, sourceDepth, tone), slides.at(-1)]
}

function makeLanguageSlides(subject, module, index, sourceDepth, label) {
  const base = `${subject.id}-u${index + 1}`
  const tone = 'human'
  const footer = `${subject.code} / ${label} ${index + 1}`
  const slides = [
    {
      id: `${base}-open`,
      title: `${label} ${index + 1}: ${module.title}`,
      subtitle: module.why,
      composition: 'visual-hero',
      content: (
        <FoundationSlide layout="visual-hero" tone={tone} footer={footer}>
          <div className="rem-hero" data-slide-content="true">
            <PassageScene author="ಪಾಠದ ನೆಲೆ" passage={module.why} meaning={module.principle} />
          </div>
        </FoundationSlide>
      ),
      takeaway: module.why,
    },
    {
      id: `${base}-topics`,
      title: 'ಪಠ್ಯಕ್ರಮದ ಮಾರ್ಗ',
      subtitle: 'ಈ ಘಟಕದ ವಿಷಯಗಳು — official topics in teaching order',
      composition: 'full-canvas-diagram',
      content: <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}><TopicMap topics={module.topics} kannada /></FoundationSlide>,
      takeaway: 'Language units follow the official order.',
    },
    {
      id: `${base}-vocab`,
      title: 'Word → meaning → usage',
      subtitle: 'Vocabulary is a sentence, not a translation card only',
      composition: 'full-canvas-diagram',
      content: <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}><VocabScene items={module.vocab} /></FoundationSlide>,
      takeaway: 'Each word is shown in use.',
    },
    {
      id: `${base}-grammar`,
      title: 'Structure change',
      subtitle: `${module.grammar.from} → ${module.grammar.to}`,
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <ProcessAnimator steps={[
            { title: 'From', detail: module.grammar.from },
            { title: 'To', detail: module.grammar.to },
            { title: 'Use', detail: module.grammar.note },
          ]} />
        </FoundationSlide>
      ),
      takeaway: module.grammar.note,
    },
    {
      id: `${base}-passage`,
      title: 'Passage and meaning',
      subtitle: module.passage.author,
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <PassageScene author={module.passage.author} passage={module.passage.passage} meaning={module.passage.meaning} />
        </FoundationSlide>
      ),
      takeaway: module.passage.meaning,
    },
    {
      id: `${base}-example`,
      title: 'ನಿಜವಾದ ಬಳಕೆ',
      subtitle: 'ಸಂದರ್ಭ ಮೊದಲು, ಅಭ್ಯಾಸ ನಂತರ',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <DialogueScene poor="ಪದಪಟ್ಟಿ ಮಾತ್ರ — ವಾಕ್ಯವಿಲ್ಲ." good={module.vocab[0]?.usage || 'ಪೂರ್ಣ ವಾಕ್ಯದಲ್ಲಿ ಬಳಸಿ.'} />
        </FoundationSlide>
      ),
      takeaway: 'Usage is a spoken or written sentence.',
    },
    {
      id: `${base}-mistake`,
      title: 'ಸಾಮಾನ್ಯ ತಪ್ಪು',
      subtitle: 'ವಿನಯ ಮತ್ತು ರೂಪ — politeness and form, not only spelling',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <div className="rem-mistake" data-slide-content="true">
            <TeachingCallout kind="ತಪ್ಪು">{module.mistake}</TeachingCallout>
            <TeachingCallout kind="ಸರಿ">{module.grammar.note} — ಸರಿಯಾದ ರೂಪವನ್ನು ವಾಕ್ಯದಲ್ಲಿ ಬಳಸಿ.</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.mistake,
    },
    {
      id: `${base}-practice`,
      title: 'ಅಭ್ಯಾಸ',
      subtitle: 'Comprehension / production',
      composition: 'full-canvas-diagram',
      content: <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}><PracticeBoard prompt={module.practice} kannada /></FoundationSlide>,
      takeaway: module.practice,
    },
    recapSlide(base, footer, tone, [
      { id: 'c', label: 'ಭಾಷೆ', x: 380, y: 210, main: true },
      { id: 'a', label: 'ಪದ', x: 150, y: 110 },
      { id: 'b', label: 'ವಾಕ್ಯ', x: 610, y: 110 },
      { id: 'd', label: 'ಅಭ್ಯಾಸ', x: 380, y: 340 },
    ]),
  ]
  return [...slides.slice(0, -1), ...buildSourceSlides(subject, `u${index + 1}`, sourceDepth, tone), slides.at(-1)]
}

function makeLabSlides(subject, module, index, sourceDepth) {
  const base = `${subject.id}-e${index + 1}`
  const tone = module.visual === 'code' ? 'code' : 'lab'
  const footer = `${subject.code} / Experiment ${index + 1}`
  const slides = [
    {
      id: `${base}-aim`,
      title: `Experiment ${index + 1}: ${module.title}`,
      subtitle: module.aim,
      composition: 'visual-hero',
      content: (
        <FoundationSlide layout="visual-hero" tone={tone} footer={footer}>
          <ExperimentVisualizer aim={module.aim} setup={module.setup} procedure={module.procedure} observation={module.observation} result={module.result} viva={module.viva} />
        </FoundationSlide>
      ),
      takeaway: module.aim,
    },
    {
      id: `${base}-principle`,
      title: 'Theory / principle',
      subtitle: 'Why this apparatus exists',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <div className="rem-hero" data-slide-content="true">
            <RemainingVisual kind={module.visual} />
            <TeachingCallout kind="PRINCIPLE">{module.principle}</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.principle,
    },
    {
      id: `${base}-tools`,
      title: 'Tools, components, software',
      subtitle: module.tools,
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <ProcessAnimator steps={[
            { title: 'Tools', detail: module.tools },
            { title: 'Setup', detail: module.setup },
            { title: 'Safety / constraint', detail: module.error },
          ]} />
        </FoundationSlide>
      ),
      takeaway: module.tools,
    },
    {
      id: `${base}-procedure`,
      title: 'Procedure',
      subtitle: 'Order is the experiment',
      composition: 'process',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <ProcessAnimator steps={module.procedure.map((step, index, list) => ({
            title: step,
            detail: index === 0
              ? `${step}. Setup: ${module.setup}`
              : index === list.length - 1
                ? `${step}. Expected: ${module.result}`
                : `${step}. ${module.principle}`,
          }))} />
        </FoundationSlide>
      ),
      takeaway: 'Procedure order is not optional.',
    },
    module.code
      ? {
        id: `${base}-code`,
        title: 'Program execution',
        subtitle: 'Problem → code → trace',
        composition: 'code-execution',
        content: (
          <FoundationSlide layout="full-canvas-diagram" tone="code" footer={footer}>
            <ExecutionTraceVisualizer code={module.code} steps={[{ line: 1, statement: module.aim, explain: module.principle, variables: [] }]} input={['lab input']} output={[module.result]} />
          </FoundationSlide>
        ),
        takeaway: 'Code is executed, not displayed only.',
      }
      : {
        id: `${base}-exec`,
        title: 'Connections, input, measurement',
        subtitle: 'The live experiment',
        composition: 'full-canvas-diagram',
        content: (
          <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
            <RemainingVisual kind={module.visual} />
          </FoundationSlide>
        ),
        takeaway: 'Students see what is connected before they copy a table.',
      },
    module.dryRows
      ? {
        id: `${base}-dry`,
        title: 'Dry run',
        subtitle: 'State change before the output line',
        composition: 'dry-run',
        content: (
          <FoundationSlide layout="full-canvas-diagram" tone="code" footer={footer}>
            <DryRunTable columns={['step', 'condition', 'state', 'action', 'output']} rows={module.dryRows} active={Math.max(0, module.dryRows.length - 1)} />
          </FoundationSlide>
        ),
        takeaway: 'Dry run is the observation table of a program.',
      }
      : {
        id: `${base}-obs`,
        title: 'Observation and result',
        subtitle: 'What should appear in the record',
        composition: 'full-canvas-diagram',
        content: <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}><ObservationTable observation={module.observation} result={module.result} /></FoundationSlide>,
        takeaway: module.result,
      },
    {
      id: `${base}-error`,
      title: 'Common errors and precautions',
      subtitle: 'Wrong connection, polarity, unit, or buffer',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <div className="rem-mistake" data-slide-content="true">
            <TeachingCallout kind="ERROR">{module.error}</TeachingCallout>
            <TeachingCallout kind="PRECAUTION">{module.setup}</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.error,
    },
    {
      id: `${base}-viva`,
      title: 'Viva',
      subtitle: 'If you did the experiment, you can answer',
      composition: 'full-canvas-diagram',
      content: <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}><PracticeBoard prompt={module.viva} /></FoundationSlide>,
      takeaway: module.viva,
    },
  ]
  if (module.code) {
    slides.splice(6, 0, {
      id: `${base}-out`,
      title: 'Terminal output',
      subtitle: 'Input visible, output visible',
      composition: 'terminal-output',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone="code" footer={footer}>
          <div className="rem-terminal-wrap" data-slide-content="true">
            <TerminalPanel lines={['$ gcc experiment.c && ./a.out', String(module.result)]} />
          </div>
        </FoundationSlide>
      ),
      takeaway: 'Output is a line the student can check.',
    })
  }
  const source = buildSourceSlides(subject, `e${index + 1}`, sourceDepth, tone)
  const principleAt = slides.findIndex((slide) => String(slide.id).endsWith('-principle'))
  if (principleAt >= 0) {
    return [...slides.slice(0, principleAt + 1), ...source, ...slides.slice(principleAt + 1)]
  }
  return [...slides.slice(0, -1), ...source, slides.at(-1)]
}

function makeProjectSlides(subject, module, index, sourceDepth) {
  const base = `${subject.id}-s${index + 1}`
  const tone = 'core'
  const footer = `${subject.code} / Stage ${index + 1}`
  const slides = [
    {
      id: `${base}-why`,
      title: `Stage ${index + 1}: ${module.title}`,
      subtitle: module.why,
      composition: 'visual-hero',
      content: (
        <FoundationSlide layout="visual-hero" tone={tone} footer={footer}>
          <div className="rem-hero" data-slide-content="true">
            <RemainingVisual kind="project" />
            <TeachingCallout kind="STAGE PURPOSE">{module.why}</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.why,
    },
    {
      id: `${base}-act`,
      title: 'Activities this week-block',
      subtitle: 'Activity order is the course',
      composition: 'process',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <ProcessAnimator steps={module.activities.map((title) => ({ title, detail: 'Complete and record before the next gate.' }))} />
        </FoundationSlide>
      ),
      takeaway: 'Do not invent extra theory chapters.',
    },
    {
      id: `${base}-del`,
      title: 'Deliverable',
      subtitle: 'Only what the syllabus names',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <div className="rem-practice" data-slide-content="true">
            <article style={{ '--i': 0 }}><strong>Deliverable</strong><span>{module.deliverable}</span></article>
            <article style={{ '--i': 1 }}><strong>Named only</strong><span>Do not invent extra reports or artefacts beyond the syllabus list.</span></article>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.deliverable,
    },
    {
      id: `${base}-roles`,
      title: 'Team and roles',
      subtitle: module.roles,
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <ProcessAnimator steps={[
            { title: 'Group size', detail: '4 to 6 students; multidisciplinary as specified.' },
            { title: 'Roles now', detail: module.roles },
            { title: 'Faculty', detail: 'One faculty for about 60 students / one division.' },
          ]} />
        </FoundationSlide>
      ),
      takeaway: module.roles,
    },
    {
      id: `${base}-pit`,
      title: 'Pitfall',
      subtitle: 'Why this stage fails',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <div className="rem-mistake" data-slide-content="true">
            <TeachingCallout kind="PITFALL">{module.pitfall}</TeachingCallout>
            <TeachingCallout kind="NEXT GATE">{module.next}</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.pitfall,
    },
    recapSlide(base, footer, tone, [
      { id: 'c', label: 'Stage', x: 380, y: 210, main: true },
      { id: 'a', label: 'Activity', x: 150, y: 110 },
      { id: 'b', label: 'Deliverable', x: 610, y: 110 },
      { id: 'd', label: 'Jury / next', x: 380, y: 340 },
    ]),
  ]
  return [...slides.slice(0, -1), ...buildSourceSlides(subject, `s${index + 1}`, sourceDepth, tone), slides.at(-1)]
}

function pack(list, builder, subject, sourceCode, pptxFolder, prefix, label, accent, family, segmentLabel, syllabusFile) {
  const modules = list.map((module, index) => {
    const sourceDepth = firstYearDepthModules[`${sourceCode}|${index + 1}`]
    return {
      id: `${prefix}-${index + 1}`,
      number: String(index + 1).padStart(2, '0'),
      label: `${label} ${index + 1}`,
      title: module.title,
      description: module.aim || module.why || module.principle,
      topics: module.topics || module.procedure?.slice(0, 4) || module.activities?.slice(0, 4) || [module.title],
      slides: builder(subject, module, index, sourceDepth, label),
      pptxSource: `${PPTX_ROOT}/${pptxFolder}`,
      depthResync: sourceDepth,
      domain: module.domain,
    }
  })
  return {
    ...subject,
    accent,
    segmentLabel,
    family,
    pptxFolder: `${PPTX_ROOT}/${pptxFolder}`,
    syllabusSource: `${SYLLABUS_ROOT}/${syllabusFile}`,
    phase: 7,
    modules,
    keyAreas: modules.flatMap((m) => m.topics.slice(0, 1)).slice(0, 8),
    moduleFlow: modules.map((m) => m.label),
  }
}

function subjectShell(id, title, code, description) {
  return { id, number: code.replace(/\D/g, '').slice(-3), title, shortTitle: code, code, description }
}

export const firstYearRemainingSubjects = [
  pack(
    [theoryModules.engComm, theoryModules.engInter, theoryModules.engEmploy, theoryModules.engDigital, theoryModules.engJobs],
    makeTheorySlides,
    subjectShell('communication-skills-1bengl106', 'Communication Skills', '1BENGL106', 'G — Communication: process, interpersonal, employability, digital, jobs.'),
    '1BENGL106', 'Communication_Skills_1BENGL106', 'unit', 'Unit', 'first-year-human', 'G - COMMUNICATION / HUMANITIES', 'Unit', '1BENGL106.pdf',
  ),
  pack(
    [theoryModules.icoIntro, theoryModules.icoRights, theoryModules.icoUnion, theoryModules.icoState, theoryModules.icoEthics],
    makeTheorySlides,
    subjectShell('indian-constitution-engineering-ethics-1bico107-207', 'Indian Constitution and Engineering Ethics', '1BICO107/207', 'G — Constitution and engineering ethics, source-grounded.'),
    '1BICO107/207', 'Indian_Constitution_and_Engineering_Ethics_1BICO107_207', 'module', 'Module', 'first-year-human', 'G - COMMUNICATION / HUMANITIES', 'Module', '1BICO107.pdf',
  ),
  pack(
    [kannadaModules.bkIntro, kannadaModules.bkNouns, kannadaModules.bkDative, kannadaModules.bkImperative, kannadaModules.bkTense],
    makeLanguageSlides,
    subjectShell('balake-kannada-1bkbk109', 'Balake Kannada (Kannada for Usage)', '1BKBK109', 'Language — ಬಳಕೆ ಕನ್ನಡ: usage, grammar, polite conversation.'),
    '1BKBK109', 'Balake_Kannada_(Kannada_for_Usage)_1BKBK109', 'module', 'Module', 'first-year-kannada', 'G - LANGUAGE', 'Module', '1BKBK109.pdf',
  ),
  pack(
    [kannadaModules.skCulture, kannadaModules.skBhakti, kannadaModules.skModern, kannadaModules.skScience, kannadaModules.skFolk],
    makeLanguageSlides,
    subjectShell('samskrutika-kannada-1bksk109', 'Samskrutika Kannada', '1BKSK109', 'Language — ಸಾಂಸ್ಕೃತಿಕ ಕನ್ನಡ: culture, vachana, modern verse, prose, folk.'),
    '1BKSK109', 'Samskrutika_Kannada_1BKSK109', 'unit', 'Unit', 'first-year-kannada', 'G - LANGUAGE', 'Unit', '1BKSK109.pdf',
  ),
  pack(
    [theoryModules.sksSocial, theoryModules.sksEmo1, theoryModules.sksEmo2, theoryModules.sksPro1, theoryModules.sksPro2],
    makeTheorySlides,
    subjectShell('soft-skills-1bsks106-206', 'Soft Skills', '1BSKS106/206', 'G — Social, emotional and professional skills as scenarios.'),
    '1BSKS106/206', 'Soft_Skills_1BSKS106_206', 'module', 'Module', 'first-year-human', 'G - COMMUNICATION / HUMANITIES', 'Module', '1BSKS106.pdf',
  ),
  pack(electricalLabs, makeLabSlides, subjectShell('basic-electrical-lab-1bbeel107', 'Basic Electrical Lab', '1BBEEL107', 'H — Electrical experiments, not theory modules.'), '1BBEEL107', 'Basic_Electrical_Lab_1BBEEL107', 'experiment', 'Experiment', 'first-year-lab', 'H - LAB / PRACTICAL', 'Experiment', '1BBEEL107.pdf'),
  pack(eceLabs, makeLabSlides, subjectShell('fundamentals-ece-lab-1becel107', 'Fundamentals of Electronics and Communication Engineering Lab', '1BECEL107', 'H — ECE lab: rectifiers to adders.'), '1BECEL107', 'Fundamentals_of_Electronics_and_Communication_Engineering_Lab_1BECEL107', 'experiment', 'Experiment', 'first-year-lab', 'H - LAB / PRACTICAL', 'Experiment', '1BECEL107.pdf'),
  pack(mechanicalLabs, makeLabSlides, subjectShell('elements-mechanical-lab-1bemel105', 'Elements of Mechanical Engineering Lab', '1BEMEL105', 'H — Workshop and fuels lab.'), '1BEMEL105', 'Elements_of_Mechanical_Engineering_Lab_1BEMEL105', 'experiment', 'Experiment', 'first-year-lab', 'H - LAB / PRACTICAL', 'Experiment', '1BEMEL105.pdf'),
  pack(materialsLabs, makeLabSlides, subjectShell('mechanics-materials-lab-1bmeml107-207', 'MECHANICS AND MATERIALS LABORATORY', '1BMEML107/207', 'H — Statics and construction-materials lab.'), '1BMEML107/207', 'MECHANICS_AND_MATERIALS_LABORATORY_1BMEML107_207', 'experiment', 'Experiment', 'first-year-lab', 'H - LAB / PRACTICAL', 'Experiment', '1BMEML107.pdf'),
  pack(cLabs, makeLabSlides, subjectShell('c-programming-lab-1bpopl107-207', 'C Programming Lab', '1BPOPL107/207', 'H — PART-A and PART-B C experiments with execution and dry run.'), '1BPOPL107/207', 'C_Programming_Lab_1BPOPL107_207', 'experiment', 'Experiment', 'first-year-lab', 'H - LAB / PRACTICAL', 'Experiment', '1BPOPL107.pdf'),
  pack(idtStages, makeProjectSlides, subjectShell('innovation-design-thinking-lab-1bidtl158', 'Innovation & Design Thinking Lab', '1BIDTL158', 'H — Design-thinking activity stages.'), '1BIDTL158', 'Innovation_Design_Thinking_Lab_1BIDTL158', 'stage', 'Stage', 'first-year-project', 'H - PROJECT / ACTIVITY', 'Stage', '1BIDTL158.pdf'),
  pack(projectStages, makeProjectSlides, subjectShell('interdisciplinary-project-work-1bprj258', 'Interdisciplinary Project Work', '1BPRJ258', 'H — Interdisciplinary project journey and named deliverables.'), '1BPRJ258', 'Interdisciplinary_Project_Work_1BPRJ258', 'stage', 'Stage', 'first-year-project', 'H - PROJECT / ACTIVITY', 'Stage', '1BPRJ258.pdf'),
]

export const firstYearRemainingReportSeed = {
  subjectsExpected: 12,
  subjectsCreated: firstYearRemainingSubjects.length,
  theorySubjects: 3,
  languageSubjects: 2,
  labSubjects: 5,
  projectActivitySubjects: 2,
  modulesUnitsExperiments: firstYearRemainingSubjects.reduce((sum, s) => sum + s.modules.length, 0),
  interactiveSlides: firstYearRemainingSubjects.reduce((sum, s) => sum + s.modules.reduce((m, mod) => m + mod.slides.length, 0), 0),
  majorAnimations: firstYearRemainingSubjects.reduce((sum, s) => sum + s.modules.reduce((m, mod) => m + Math.max(6, Math.floor(mod.slides.length / 2)), 0), 0),
}

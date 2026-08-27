import React from 'react'
import {
  ComparisonVisualizer,
  ConceptMap,
  EquationStepper,
  FoundationSlide,
  NumericalBoard,
  ProcessAnimator,
  TeachingCallout,
  WaveformAnimator,
} from '../firstYearFoundation'
import { firstYearDepthModules } from '../firstYearDepthContent'
import { makeSourceTeachingSlides } from '../firstYearSourceSlides'
import { engineeringModules as electrical } from './modulesElectrical'
import { electronicsModules } from './modulesElectronics'
import { mechanicalModules } from './modulesMechanical'
import { civilModules } from './modulesCivil'
import { cadCv, cadEe, cadEce, cadMe, cadCs } from './modulesCad'
import { aeroModules } from './modulesAero'
import { EngineeringVisual, OperationSequence, TruthTableVisual } from './visuals'
import './engineering.css'

const PPTX_ROOT = 'First_Year_PPTX'
const SYLLABUS_ROOT = 'public/syllabus/1st Year Syllabus'

const library = {
  ...electrical,
  ...electronicsModules,
  ...mechanicalModules,
  ...civilModules,
  ...aeroModules,
  ...cadCv,
  ...Object.fromEntries(Object.entries(cadEe).map(([key, value]) => [`ee_${key}`, value])),
  ...Object.fromEntries(Object.entries(cadEce).map(([key, value]) => [`ece_${key}`, value])),
  ...Object.fromEntries(Object.entries(cadMe).map(([key, value]) => [`me_${key}`, value])),
  ...Object.fromEntries(Object.entries(cadCs).map(([key, value]) => [`cs_${key}`, value])),
}

const subjectConfigs = [
  ['basics-electrical-engineering-1bbee105-205', 'Basics of Electrical Engineering', '1BBEE105/205', 'E - ELECTRICAL / ELECTRONICS', 'Basics_of_Electrical_Engineering_1BBEE105_205', ['beeDc', 'beeInduction', 'beeAc', 'beeThree', 'beeWiring']],
  ['computer-aided-engineering-drawing-cv-1bcedc103-203', 'Computer Aided Engineering Drawing for CV Stream', '1BCEDC103/203', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'Computer_Aided_Engineering_Drawing_for_CV_Stream_1BCEDC103_203', ['cadIntro', 'cadSolids', 'cadSection', 'cadIso', 'cadApp']],
  ['computer-aided-engineering-drawing-ee-1bcede103-203', 'Computer Aided Engineering Drawing for EE Stream', '1BCEDE103/203', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'Computer_Aided_Engineering_Drawing_for_EE_Stream_1BCEDE103_203', ['ee_cadIntro', 'ee_cadSolids', 'ee_cadSection', 'ee_cadIso', 'ee_cadApp']],
  ['computer-aided-engineering-drawing-ece-1bcedec103-203', 'Computer Aided Engineering Drawing for ECE Stream', '1BCEDEC103/203', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'Computer_Aided_Engineering_Drawing_for_ECE_Stream_1BCEDEC103_203', ['ece_cadIntro', 'ece_cadSolids', 'ece_cadSection', 'ece_cadIso', 'ece_cadApp']],
  ['computer-aided-engineering-drawing-me-1bcedm103-203', 'Computer Aided Engineering Drawing for ME Stream', '1BCEDM103/203', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'Computer_Aided_Engineering_Drawing_for_ME_Stream_1BCEDM103_203', ['me_cadIntro', 'me_cadSolids', 'me_cadSection', 'me_cadIso', 'me_cadApp']],
  ['computer-aided-engineering-drawing-cs-1bceds103-203', 'Computer Aided Engineering Drawing for CS Stream', '1BCEDS103/203', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'Computer_Aided_Engineering_Drawing_for_CS_Stream_1BCEDS103_203', ['cs_cadIntro', 'cs_cadSolids', 'cs_cadSection', 'cs_cadIso', 'cs_cadApp']],
  ['engineering-mechanics-1bciv105-205', 'ENGINEERING MECHANICS', '1BCIV105/205', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'ENGINEERING_MECHANICS_1BCIV105_205', ['civForces', 'civEquilibrium', 'civFriction', 'civCentroid', 'civInertia']],
  ['elements-of-aeronautics-1beae105-205', 'Elements of Aeronautics', '1BEAE105/205', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'Elements_of_Aeronautics_1BEAE105_205', ['aeoIntro', 'aeoAero', 'aeoProp', 'aeoFlight', 'aeoSystems']],
  ['fundamentals-electronics-communication-1bece105-205', 'Fundamentals of Electronics and Communication Engineering', '1BECE105/205', 'E - ELECTRICAL / ELECTRONICS', 'Fundamentals_of_Electronics_and_Communication_Engineering_1BECE105_205', ['eceDiodes', 'eceTransistors', 'eceOpamp', 'eceComm', 'eceDigital']],
  ['elements-mechanical-engineering-1beme105-205', 'Elements of Mechanical Engineering', '1BEME105/205', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'Elements_of_Mechanical_Engineering_1BEME105_205', ['emeMaterials', 'emeThermo', 'emeTools', 'emeDrives', 'emeCnc']],
  ['building-science-mechanics-1besc104a-204a', 'BUILDING SCIENCE AND MECHANICS', '1BESC104A/204A', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'BUILDING_SCIENCE_AND_MECHANICS_1BESC104A_204A', ['bsmIntro', 'bsmGreen', 'bsmForce', 'bsmReactions', 'bsmCentroid']],
  ['introduction-electrical-engineering-1besc104b-204b', 'Introduction to Electrical Engineering', '1BESC104B/204B', 'E - ELECTRICAL / ELECTRONICS', 'Introduction_to_Electrical_Engineering_1BESC104B_204B', ['ieePower', 'ieeAc', 'ieeDcMachines', 'ieeTransformerMotor', 'ieeSafety']],
  ['introduction-electronics-communication-1besc104c-204c', 'Introduction to Electronics and Communication Engineering', '1BESC104C/204C', 'E - ELECTRICAL / ELECTRONICS', 'Introduction_to_Electronics_and_Communication_Engineering_1BESC104C_204C', ['iecPsu', 'iecOsc', 'iecComm', 'iecEmbedded', 'iecBoolean']],
  ['introduction-mechanical-engineering-1besc104d-204d', 'INTRODUCTION TO MECHANICAL ENGINEERING', '1BESC104D/204D', 'F - MECHANICAL / CIVIL / CORE ENGINEERING', 'INTRODUCTION_TO_MECHANICAL_ENGINEERING_1BESC104D_204D', ['imeIntro', 'imeEngines', 'imeMaterials', 'imeMfg', 'imeAdvances']],
]

const TONE = {
  electrical: 'circuit',
  electronics: 'circuit',
  mechanical: 'core',
  civil: 'core',
  cad: 'math',
  aero: 'core',
}

const PROBLEM_KIND = {
  electrical: 'CIRCUIT PROBLEM',
  electronics: 'CIRCUIT PROBLEM',
  mechanical: 'MECHANICS PROBLEM',
  civil: 'LOAD PATH',
  cad: 'PROJECTION PROBLEM',
  aero: 'FLIGHT PROBLEM',
}

function givenText(value) {
  return Array.isArray(value) ? value.join('; ') : String(value)
}

function eqSteps(items) {
  return items.map(([label, expression, note]) => ({ eq: `<strong>${label}</strong>: ${expression}`, explain: note }))
}

function operationSteps(module) {
  const process = module.process || []
  return process.map((title, index, list) => ({
    title,
    detail: index === 0
      ? `${title}: ${module.problem}`
      : index === list.length - 1
        ? `${title}: ${module.application || module.principle}`
        : `${title}. ${module.principle}`,
  }))
}

function TopicMap({ topics }) {
  return (
    <div className="eng-topic-map" data-slide-content="true">
      {topics.map((topic, i) => (
        <article key={topic} style={{ '--i': i }}>
          <strong>{String(i + 1).padStart(2, '0')}</strong>
          <span>{topic}</span>
        </article>
      ))}
    </div>
  )
}

function Hero({ module }) {
  return (
    <div className="eng-hero" data-eng-domain={module.domain} data-slide-content="true">
      <EngineeringVisual kind={module.visual} module={module} />
      <TeachingCallout kind={PROBLEM_KIND[module.domain] || 'ENGINEERING PROBLEM'}>{module.problem}</TeachingCallout>
    </div>
  )
}

function buildSourceSlides(subject, moduleIndex, sourceDepth) {
  return makeSourceTeachingSlides({
    idPrefix: `${subject.id}-m${moduleIndex + 1}-source`,
    sourceDepth,
    tone: TONE[subject.domain] || 'core',
    footer: `${subject.code} / Module ${moduleIndex + 1}`,
    compositionFor: (block) => (/CIRCUIT|WAVEFORM|MECHANISM|STRUCTURAL/.test(block.action) ? 'full-canvas-diagram' : 'worked-example'),
  })
}

function makeSlides(subject, module, moduleIndex, sourceDepth) {
  const base = `${subject.id}-m${moduleIndex + 1}`
  const tone = TONE[module.domain] || 'core'
  const footer = `${subject.code} / Module ${moduleIndex + 1}`
  const example = module.example || []
  const secondary = module.secondaryVisual || (module.waveform ? 'waveform' : module.truth ? 'logic' : 'graph')
  const slides = [
    {
      id: `${base}-hero`,
      title: `Module ${moduleIndex + 1}: ${module.title}`,
      subtitle: module.problem,
      composition: 'visual-hero',
      content: <FoundationSlide layout="visual-hero" tone={tone} footer={footer}><Hero module={module} /></FoundationSlide>,
      takeaway: module.problem,
    },
    {
      id: `${base}-operate`,
      title: 'Operation in Front of the Student',
      subtitle: 'Initial state → input → response → final labelled state',
      composition: 'process',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <OperationSequence steps={operationSteps(module)} />
        </FoundationSlide>
      ),
      takeaway: module.principle,
    },
    {
      id: `${base}-topics`,
      title: 'Syllabus Coverage Route',
      subtitle: 'Official topics mapped into teaching actions',
      composition: 'full-canvas-diagram',
      content: <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}><TopicMap topics={module.topics} /></FoundationSlide>,
      takeaway: 'Every syllabus topic is scheduled before applications and numericals.',
    },
    {
      id: `${base}-principle`,
      title: 'Principle Connected to the Working System',
      subtitle: module.principle,
      composition: 'visual',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <div className="eng-hero" data-eng-domain={module.domain} data-slide-content="true">
            <EngineeringVisual kind={module.visual} module={module} />
            <TeachingCallout kind="PRINCIPLE">{module.principle}</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.principle,
    },
    {
      id: `${base}-closeup`,
      title: module.domain === 'electronics' ? 'Device Terminals and State' : module.domain === 'cad' ? 'Construction / View Sequence' : module.domain === 'electrical' ? 'Current Path and Polarity' : 'Mechanism or Load Path',
      subtitle: 'The teaching object dominates the canvas',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <EngineeringVisual kind={secondary} module={module} />
        </FoundationSlide>
      ),
      takeaway: 'Labels sit on the working object: path, polarity, force, view or process stage.',
    },
    {
      id: `${base}-signal`,
      title: module.truth ? 'Truth Table and Active Row' : module.waveform || module.domain === 'electrical' || module.domain === 'electronics' ? 'Waveform / Time Behaviour' : 'Graph / Characteristic Reading',
      subtitle: 'Axes, amplitude/period or operating region are readable at classroom scale',
      composition: 'visual',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          {module.truth
            ? <TruthTableVisual />
            : (module.waveform || module.domain === 'electrical' || module.domain === 'electronics')
              ? <WaveformAnimator />
              : <EngineeringVisual kind="graph" module={module} />}
        </FoundationSlide>
      ),
      takeaway: module.truth ? 'The active row is the live input combination.' : 'Read the graph or waveform before quoting a formula.',
    },
    {
      id: `${base}-equation`,
      title: 'Formula With Conditions and Units',
      subtitle: 'Symbols, assumptions and where it applies',
      composition: 'worked-example',
      content: <FoundationSlide layout="derivation" tone={tone} footer={footer}><EquationStepper steps={eqSteps(module.equationSteps)} /></FoundationSlide>,
      takeaway: 'A formula is a model of the visible system, not a detached string.',
    },
    {
      id: `${base}-numerical`,
      title: 'Worked Numerical',
      subtitle: givenText(example[0]),
      composition: 'worked-example',
      content: (
        <FoundationSlide layout="worked-example" tone={tone} footer={footer}>
          <NumericalBoard
            given={givenText(example[1])}
            find={givenText(example[2])}
            formula={givenText(example[3])}
            substitution={givenText(example[4])}
            calculation={givenText(example[5])}
            answer={givenText(example[6])}
            interpretation={givenText(example[7])}
          />
        </FoundationSlide>
      ),
      takeaway: givenText(example[7]),
    },
    {
      id: `${base}-compare`,
      title: 'Engineering Comparison',
      subtitle: 'Construction, operation, behaviour, use and limit',
      composition: 'comparison',
      content: (
        <FoundationSlide layout="comparison" tone={tone} footer={footer}>
          <ComparisonVisualizer
            left={{ title: module.comparison?.[0]?.[1] || 'Option A' }}
            right={{ title: module.comparison?.[0]?.[2] || 'Option B' }}
            dimensions={(module.comparison || []).map((row) => ({ label: row[0], left: row[1], right: row[2] || row[3] || '' }))}
          />
        </FoundationSlide>
      ),
      takeaway: 'Comparison is operational, not a feature-card grid.',
    },
    {
      id: `${base}-mistake`,
      title: 'Common Engineering Mistake',
      subtitle: 'Wrong direction, polarity, unit, view or formula condition',
      composition: 'process',
      content: (
        <FoundationSlide layout="visual-hero" tone={tone} footer={footer}>
          <div className="eng-mistake" data-slide-content="true">
            <TeachingCallout kind="WRONG MODEL">{module.misconception}</TeachingCallout>
            <TeachingCallout kind="WHY IT FAILS">The labelled path, sign, unit or view no longer matches the physical system.</TeachingCallout>
            <TeachingCallout kind="REPAIR">Redraw the circuit, FBD, waveform or projection, then substitute.</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.misconception,
    },
    {
      id: `${base}-apply`,
      title: 'Principle → Behaviour → Application',
      subtitle: module.application,
      composition: 'process',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <ProcessAnimator steps={[
            { title: 'Principle', detail: module.principle },
            { title: 'Behaviour', detail: module.process?.slice(-2).join(' → ') || module.principle },
            { title: 'Application', detail: module.application },
            { title: 'Check', detail: 'Units, direction and final state still match the source PPTX.' },
          ]} />
        </FoundationSlide>
      ),
      takeaway: module.application,
    },
    {
      id: `${base}-recap`,
      title: 'Module Recap',
      subtitle: 'Keep the final engineering state in view',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <ConceptMap
            nodes={[
              { id: 'system', label: 'System', x: 380, y: 90, main: true },
              { id: 'input', label: 'Input', x: 150, y: 200 },
              { id: 'law', label: 'Law', x: 380, y: 230 },
              { id: 'out', label: 'Output', x: 610, y: 200 },
              { id: 'use', label: 'Use', x: 380, y: 360 },
            ]}
            links={[
              { from: 'input', to: 'system', label: 'applied' },
              { from: 'system', to: 'law', label: 'obeys' },
              { from: 'law', to: 'out', label: 'predicts' },
              { from: 'out', to: 'use', label: 'serves' },
              { from: 'use', to: 'system', label: 'checks' },
            ]}
          />
        </FoundationSlide>
      ),
      takeaway: 'A lecturer can teach this module from the web deck at PPTX depth.',
    },
  ]

  if (module.tertiaryVisual) {
    slides.splice(5, 0, {
      id: `${base}-variant`,
      title: 'Operational Variant',
      subtitle: 'The difference is visible in path, waveform or mechanism, not only in a caption',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone={tone} footer={footer}>
          <EngineeringVisual kind={module.tertiaryVisual} module={module} />
        </FoundationSlide>
      ),
      takeaway: 'Variants are taught by changing the working diagram.',
    })
  }

  const sourceSlides = buildSourceSlides(subject, moduleIndex, sourceDepth)
  return [...slides.slice(0, -1), ...sourceSlides, slides.at(-1)]
}

function buildSubject([id, title, code, family, folder, keys]) {
  const modules = keys.map((key, index) => {
    const module = library[key]
    if (!module) throw new Error(`Missing Phase 6 module key ${key}`)
    const sourceDepth = firstYearDepthModules[`${code}|${index + 1}`]
    return {
      id: `module-${index + 1}`,
      number: String(index + 1).padStart(2, '0'),
      label: `Module ${index + 1}`,
      title: module.title,
      description: module.topics.slice(0, 3).join(', ') + '.',
      topics: module.topics,
      slides: makeSlides({ id, title, code, domain: module.domain }, module, index, sourceDepth),
      pptxSource: `${PPTX_ROOT}/${folder}/Module_${index + 1}.pptx`,
      depthResync: sourceDepth,
      domain: module.domain,
      visual: module.visual,
    }
  })
  return {
    id,
    number: code.replace(/\D/g, '').slice(-3),
    title,
    shortTitle: code,
    code,
    description: `${family}: Phase 6 interactive core-engineering teaching deck from finalized First Year PPTX sources.`,
    accent: 'first-year-engineering',
    segmentLabel: 'Module',
    keyAreas: Array.from(new Set(modules.flatMap((module) => module.topics.slice(0, 2)))).slice(0, 8),
    moduleFlow: modules.map((module) => module.title.split(/,| and |:/)[0]),
    phase: 6,
    family,
    pptxFolder: `${PPTX_ROOT}/${folder}`,
    syllabusSource: `${SYLLABUS_ROOT}/${code.split('/')[0]}.pdf`,
    modules,
  }
}

export const firstYearEngineeringSubjects = subjectConfigs.map(buildSubject)

export const firstYearEngineeringReportSeed = {
  subjectsExpected: subjectConfigs.length,
  subjectsCreated: firstYearEngineeringSubjects.length,
  modulesCreated: firstYearEngineeringSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  interactiveSlides: firstYearEngineeringSubjects.reduce((sum, subject) => sum + subject.modules.reduce((m, module) => m + module.slides.length, 0), 0),
  majorAnimations: firstYearEngineeringSubjects.reduce((sum, subject) => sum + subject.modules.reduce((m, module) => m + Math.max(8, Math.floor(module.slides.length / 2)), 0), 0),
  circuitVisuals: firstYearEngineeringSubjects.reduce((sum, subject) => sum + subject.modules.filter((module) => ['electrical', 'electronics'].includes(module.domain)).length * 3, 0),
  waveformVisuals: firstYearEngineeringSubjects.reduce((sum, subject) => sum + subject.modules.filter((module) => ['electrical', 'electronics', 'aero'].includes(module.domain)).length, 0),
  engineeringProcessVisuals: firstYearEngineeringSubjects.reduce((sum, subject) => sum + subject.modules.length * 2, 0),
  workedNumericals: firstYearEngineeringSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
}

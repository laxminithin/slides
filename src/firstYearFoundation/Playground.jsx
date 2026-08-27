import { useLocation } from 'react-router-dom'
import {
  ApparatusLayout,
  ArrayVisualizer,
  CircuitVisualizer,
  CodeExecutionVisualizer,
  ComparisonVisualizer,
  ConceptMap,
  EquationStepper,
  ExperimentVisualizer,
  FoundationSlide,
  GeometryVisualizer,
  GraphAnimator,
  LoopVisualizer,
  NumericalBoard,
  ProcessAnimator,
  TeachingCallout,
  TerminalPanel,
  TimelineEngine,
  WaveformAnimator,
} from './index.jsx'

const nav = [
  'Equation',
  'Numerical',
  'Graph',
  'Code',
  'Circuit',
  'Process',
  'Experiment',
]

function PlaygroundNav() {
  return (
    <nav className="fy-playground-nav" aria-label="Foundation scenes">
      {nav.map((item, index) => <a key={item} href={`#/__first-year-foundation?scene=${index + 1}`}>{item}</a>)}
    </nav>
  )
}

function sceneFromSearch(search) {
  const hash = window.location.hash || ''
  const query = search || (hash.includes('?') ? hash.slice(hash.indexOf('?')) : '')
  const n = Number(new URLSearchParams(query).get('scene') || 1)
  return Math.min(7, Math.max(1, Number.isFinite(n) ? n : 1))
}

export default function FirstYearFoundationPlayground() {
  const location = useLocation()
  const scene = sceneFromSearch(location.search)
  return (
    <>
      <PlaygroundNav />
      {scene === 1 && (
        <FoundationSlide
          kicker="MATHEMATICS FOUNDATION"
          title="Derivative of x squared is built, not flashed"
          subtitle="EquationStepper keeps each algebraic change visible."
          tone="math"
          layout="worked-example"
          visual={(
            <EquationStepper
              steps={[
                { eq: 'f(x) = x<sup>2</sup>', explain: 'Start with the function.' },
                { eq: 'f\\′(x) = lim<sub>h→0</sub> [(<mark>x+h</mark>)<sup>2</sup> - x<sup>2</sup>] / h', explain: 'Substitute x + h in the derivative definition.' },
                { eq: 'lim<sub>h→0</sub> [x<sup>2</sup> + 2xh + h<sup>2</sup> - x<sup>2</sup>] / h', explain: 'Expand the square before cancelling.' },
                { eq: 'lim<sub>h→0</sub> [<s>x<sup>2</sup></s> + 2xh + h<sup>2</sup> - <s>x<sup>2</sup></s>] / h', explain: 'Only opposite x squared terms cancel.' },
                { eq: 'lim<sub>h→0</sub> (2x + h) = <mark>2x</mark>', explain: 'Divide by h, then let h approach zero.' },
              ]}
            />
          )}
        >
          <TeachingCallout kind="WATCH THIS">The highlighted term is the only term being transformed at each step.</TeachingCallout>
          <p>Use this engine for the eight Phase 3 mathematics subjects and for physics/electrical derivations.</p>
        </FoundationSlide>
      )}
      {scene === 2 && (
        <FoundationSlide
          kicker="NUMERICAL FOUNDATION"
          title="A problem solution should read like a teaching board"
          subtitle="The solver structure fits math, physics, chemistry, electrical and engineering examples."
          tone="science"
          layout="worked-example"
          visual={(
            <NumericalBoard
              given="R = 10 Ω, V = 5 V"
              find="Current through resistor"
              formula="I = V / R"
              substitution="I = 5 / 10"
              calculation="I = 0.5 A"
              answer="0.5 ampere"
              interpretation="The branch carries half an ampere."
            />
          )}
        >
          <TeachingCallout kind="EXAM POINT">Keep units visible through substitution and final answer.</TeachingCallout>
        </FoundationSlide>
      )}
      {scene === 3 && (
        <FoundationSlide
          kicker="GRAPH + GEOMETRY FOUNDATION"
          title="Graphs and vectors must occupy the classroom stage"
          subtitle="Large axes, drawn curves and vector primitives support math, physics and CAD streams."
          tone="math"
          layout="full-canvas-diagram"
          visual={(
            <div className="fy-dual-canvas">
              <GraphAnimator
                domain={[-3, 3]}
                range={[-1, 10]}
                xLabel="x"
                yLabel="f(x)"
                curves={[
                  { label: 'x squared', fn: (x) => x * x, color: '#2563eb' },
                  { label: '2x + 1', fn: (x) => 2 * x + 1, color: '#d97706' },
                ]}
                points={[{ xy: [1, 1], label: 'slope point' }, { xy: [2, 5], label: 'intersection' }]}
                highlight="Parameter changes can redraw curve, slope and interpretation."
              />
              <GeometryVisualizer />
            </div>
          )}
        />
      )}
      {scene === 4 && (
        <FoundationSlide
          kicker="PROGRAMMING FOUNDATION"
          title="Code execution is state change students can follow"
          subtitle="C/Python/IPCC subjects need current line, variables, loops, arrays and console output."
          tone="code"
          layout="code-execution"
          visual={(
            <div className="fy-program-stack">
              <CodeExecutionVisualizer
                code={[
                  'int sum = 0;',
                  'for (int i = 0; i < 4; i++) {',
                  '    sum = sum + a[i];',
                  '}',
                  'printf(\"%d\", sum);',
                ]}
                steps={[
                  { line: 1, note: 'Create accumulator', state: 'sum = 0' },
                  { line: 2, note: 'Check loop condition', state: 'i = 0, i < 4 true' },
                  { line: 3, note: 'Add current cell', state: 'sum = 3' },
                  { line: 5, note: 'Print final value', state: 'output: 18' },
                ]}
              />
              <div className="fy-program-row">
                <LoopVisualizer iterations={[
                  { label: 'i = 0', condition: '0 < 4', body: 'sum += 3', update: 'i++' },
                  { label: 'i = 1', condition: '1 < 4', body: 'sum += 4', update: 'i++' },
                  { label: 'i = 2', condition: '2 < 4', body: 'sum += 5', update: 'i++' },
                  { label: 'i = 3', condition: '3 < 4', body: 'sum += 6', update: 'stop next' },
                ]} />
                <ArrayVisualizer values={[3, 4, 5, 6, 9, 2, 1]} active={3} />
                <TerminalPanel lines={['$ ./sum', 'input: 3 4 5 6', 'output: 18']} />
              </div>
            </div>
          )}
        />
      )}
      {scene === 5 && (
        <FoundationSlide
          kicker="ELECTRICAL / ELECTRONICS FOUNDATION"
          title="Circuit and signal behavior must be visible"
          subtitle="Current path, active branch, input/output waveform and labels remain readable."
          tone="circuit"
          layout="full-canvas-diagram"
          visual={(
            <div className="fy-dual-canvas">
              <CircuitVisualizer />
              <WaveformAnimator />
            </div>
          )}
        />
      )}
      {scene === 6 && (
        <FoundationSlide
          kicker="PROCESS / HUMANITIES FOUNDATION"
          title="Teaching journeys replace definition lists"
          subtitle="Process, timeline, comparison and concept map primitives support science and humanities without forcing one template."
          tone="human"
          layout="full-canvas-diagram"
          visual={(
            <div className="fy-process-stack">
              <ProcessAnimator mode="cycle" steps={[
                { title: 'Observe', detail: 'soil sample property' },
                { title: 'Classify', detail: 'texture and nutrients' },
                { title: 'Decide', detail: 'crop and treatment' },
                { title: 'Review', detail: 'feedback to next season' },
              ]} />
              <TimelineEngine events={[
                { when: 'Idea', text: 'identify need' },
                { when: 'Design', text: 'prototype' },
                { when: 'Test', text: 'collect response' },
                { when: 'Improve', text: 'iterate' },
                { when: 'Present', text: 'explain value' },
              ]} />
              <ComparisonVisualizer
                left={{ title: 'Good communication' }}
                right={{ title: 'Weak communication' }}
                dimensions={[
                  { label: 'Purpose', left: 'clear outcome', right: 'unclear aim' },
                  { label: 'Evidence', left: 'specific example', right: 'generic claim' },
                  { label: 'Audience', left: 'matched language', right: 'same wording for all' },
                ]}
              />
              <ConceptMap
                nodes={[
                  { id: 'ethics', label: 'Ethics', x: 380, y: 210, main: true },
                  { id: 'rights', label: 'Rights', x: 180, y: 115 },
                  { id: 'duties', label: 'Duties', x: 580, y: 115 },
                  { id: 'case', label: 'Case', x: 250, y: 330 },
                  { id: 'choice', label: 'Decision', x: 520, y: 330 },
                ]}
                links={[
                  { from: 'ethics', to: 'rights', label: 'protects' },
                  { from: 'ethics', to: 'duties', label: 'requires' },
                  { from: 'case', to: 'ethics', label: 'tests' },
                  { from: 'ethics', to: 'choice', label: 'guides' },
                ]}
              />
            </div>
          )}
        />
      )}
      {scene === 7 && (
        <FoundationSlide
          kicker="LAB / PRACTICAL FOUNDATION"
          title="Labs need procedure, observation, result and viva states"
          subtitle="The shell is shared; apparatus, program or circuit remains subject-specific in later phases."
          tone="lab"
          layout="experiment"
          visual={(
            <div className="fy-lab-stack">
              <ApparatusLayout />
              <ExperimentVisualizer
                aim="Verify Ohm's law for a resistor."
                setup="DC source, resistor, ammeter, voltmeter and switch."
                procedure={['Connect circuit with meter polarities.', 'Vary supply voltage in safe steps.', 'Record V and I readings.', 'Plot V against I.']}
                observation="V/I remains approximately constant."
                output="Graph slope gives resistance."
                result="Ohm's law is verified within experimental tolerance."
                viva="Why should the ammeter be connected in series?"
              />
            </div>
          )}
        />
      )}
    </>
  )
}

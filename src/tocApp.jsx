import { useMemo, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import {
  Binary,
  BookOpen,
  Brain,
  Check,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
  Cpu,
  DoorOpen,
  GitBranch,
  GraduationCap,
  Layers3,
  Network,
  Play,
  Sparkles,
  X,
} from 'lucide-react'
import heroImage from './assets/toc-hero.png'

const moduleCatalog = [
  { id: 'module-1', number: '01', title: 'Introduction to Automata', promise: 'See strings, languages, machines, and decisions come alive.', status: 'Live interactive module', icon: CircuitBoard, topics: ['Computation', 'Languages', 'Strings', 'Finite Automata', 'Recognizers'] },
  { id: 'module-2', number: '02', title: 'Finite Automata', promise: 'DFA, NFA, epsilon moves, equivalence, and minimization.', status: 'Engine ready', icon: Network, topics: ['DFA', 'NFA', 'Epsilon NFA', 'Minimization'] },
  { id: 'module-3', number: '03', title: 'Regular Languages', promise: 'Regular expressions, pumping lemma, closure, and grammar links.', status: 'Engine ready', icon: GitBranch, topics: ['Regex', 'Closure', 'Pumping Lemma', 'Regular Grammar'] },
  { id: 'module-4', number: '04', title: 'Context-Free Languages', promise: 'CFGs, parse trees, PDAs, ambiguity, and simplification.', status: 'Engine ready', icon: BookOpen, topics: ['CFG', 'PDA', 'Parse Tree', 'Ambiguity'] },
  { id: 'module-5', number: '05', title: 'Turing Machines', promise: 'Computation, decidability, reductions, and limits of machines.', status: 'Engine ready', icon: Cpu, topics: ['Turing Tape', 'Decidability', 'Halting', 'Reductions'] },
]

const moduleOneScenes = [
  { kicker: 'Question 01', title: 'Why do computers understand only certain inputs?', subtitle: 'A computer does not understand meaning first. It checks whether the input follows a precise pattern.', demo: 'gate', exam: 'Language recognition asks whether a given string belongs to a language.', summary: 'Inputs are accepted or rejected against a rule.' },
  { kicker: 'Question 02', title: 'What is computation?', subtitle: 'Computation is a step-by-step transformation of symbols according to rules.', demo: 'pipeline', exam: 'An algorithm is a finite procedure; a model of computation lets us reason about what algorithms can do.', summary: 'Rules plus symbols plus steps produce computation.' },
  { kicker: 'Question 03', title: 'What are alphabets, strings, and languages?', subtitle: 'First we define the raw material: symbols, sequences of symbols, and sets of valid sequences.', demo: 'strings', exam: 'Alphabet Sigma is a finite non-empty set. String w is a finite sequence over Sigma. Language L is a set of strings over Sigma.', summary: 'Sigma gives symbols, Sigma* gives all strings, L selects the meaningful ones.' },
  { kicker: 'Question 04', title: 'How do languages grow from operations?', subtitle: 'Union, concatenation, power, and Kleene star let small languages generate large families.', demo: 'language', exam: 'For languages A and B, AB = {xy | x in A and y in B}; A* means zero or more repetitions from A.', summary: 'Language operations are set operations with string-building behavior.' },
  { kicker: 'Question 05', title: 'How does a finite automaton process a string?', subtitle: 'The machine reads one symbol at a time, follows transitions, and ends in accept or reject.', demo: 'automaton', exam: 'A finite automaton is commonly defined as a 5-tuple (Q, Sigma, delta, q0, F).', summary: 'The whole input is accepted only if the final state is accepting.' },
  { kicker: 'Question 06', title: 'Are automata acceptors, recognizers, or decision tools?', subtitle: 'The same idea powers compilers, protocol filters, search, validation, and many exam problems.', demo: 'decision', exam: 'Decision problems have yes/no answers. A decider halts on every input; recognizers may not halt on non-members in stronger models.', summary: 'TOC studies machines, languages, and the boundaries of solvability.' },
]

function routeState(pathname) {
  const [, subject, moduleId] = pathname.split('/')
  if (!subject) return { view: 'landing' }
  if (subject !== 'theory-of-computation') return { view: 'missing' }
  if (!moduleId) return { view: 'modules' }
  const module = moduleCatalog.find((item) => item.id === moduleId)
  return module ? { view: 'module', module } : { view: 'missing' }
}

function LandingPage() {
  return (
    <main className="toc-page">
      <section className="toc-hero">
        <img className="toc-hero-art" src={heroImage} alt="" />
        <div className="toc-hero-shade" />
        <nav className="toc-topbar" aria-label="Primary navigation">
          <Link to="/" className="toc-brand"><Sparkles size={18} /> TOC Studio</Link>
          <Link to="/theory-of-computation" className="toc-pill">Modules</Link>
        </nav>
        <div className="toc-hero-copy">
          <p className="toc-eyebrow">Theory of Computation</p>
          <h1>Computation you can see, test, and feel.</h1>
          <p>A premium interactive learning platform where alphabets become strings, strings become languages, and machines visibly decide what belongs.</p>
          <div className="toc-actions">
            <Link to="/theory-of-computation/module-1" className="toc-primary"><Play size={18} /> Start Module 1</Link>
            <Link to="/theory-of-computation" className="toc-secondary">Explore modules</Link>
          </div>
        </div>
      </section>
      <section className="toc-band">
        <div>
          <p className="toc-eyebrow">Subject</p>
          <h2>Theory of Computation</h2>
          <p>One engine, five modules, every concept taught as a visual question.</p>
        </div>
        <div className="toc-path">
          {['Alphabet', 'String', 'Language', 'Automaton', 'Decision'].map((item, index) => (
            <div key={item} className="toc-path-node"><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>
          ))}
        </div>
      </section>
    </main>
  )
}

function ModuleSelector() {
  return (
    <main className="toc-page toc-modules-page">
      <header className="toc-module-hero">
        <Link to="/" className="toc-back"><ChevronLeft size={18} /> Landing</Link>
        <p className="toc-eyebrow">Theory of Computation</p>
        <h1>Choose a module</h1>
        <p>Each module plugs into the same lesson engine: question, idea, animation, example, demo, exam point, summary.</p>
      </header>
      <section className="toc-module-grid">
        {moduleCatalog.map((module) => {
          const Icon = module.icon
          return (
            <Link key={module.id} className="toc-module-card" to={`/theory-of-computation/${module.id}`}>
              <div className="toc-module-card-head"><span>{module.number}</span><Icon size={26} /></div>
              <h2>{module.title}</h2>
              <p>{module.promise}</p>
              <div className="toc-topic-row">{module.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
              <strong>{module.status}</strong>
            </Link>
          )
        })}
      </section>
    </main>
  )
}

function ModulePage({ module }) {
  const navigate = useNavigate()
  const scenes = module.id === 'module-1' ? moduleOneScenes : placeholderScenes(module)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [reveal, setReveal] = useState(0)
  const scene = scenes[sceneIndex]
  const maxReveal = 4

  const next = () => {
    if (reveal < maxReveal) return setReveal((value) => value + 1)
    setSceneIndex((value) => Math.min(scenes.length - 1, value + 1))
    setReveal(0)
  }
  const prev = () => {
    if (reveal > 0) return setReveal((value) => value - 1)
    setSceneIndex((value) => Math.max(0, value - 1))
    setReveal(0)
  }

  return (
    <main className="toc-learning">
      <aside className="toc-rail">
        <button className="toc-icon-btn" type="button" onClick={() => navigate('/theory-of-computation')} title="Back to modules"><ChevronLeft size={19} /></button>
        <div><p className="toc-eyebrow">Module {module.number}</p><h2>{module.title}</h2></div>
        <div className="toc-scene-list">
          {scenes.map((item, index) => (
            <button key={item.title} type="button" className={index === sceneIndex ? 'active' : ''} onClick={() => { setSceneIndex(index); setReveal(0) }}>
              <span>{String(index + 1).padStart(2, '0')}</span>{item.title}
            </button>
          ))}
        </div>
      </aside>
      <section className="toc-stage" aria-live="polite">
        <div className="toc-progress"><span style={{ width: `${((sceneIndex + 1) / scenes.length) * 100}%` }} /></div>
        <article className="toc-lesson-card">
          <div className="toc-copy">
            <p className="toc-eyebrow">{scene.kicker}</p>
            <h1>{scene.title}</h1>
            {reveal >= 1 && <p>{scene.subtitle}</p>}
            {reveal >= 3 && <div className="toc-exam"><GraduationCap size={20} /><span>{scene.exam}</span></div>}
            {reveal >= 4 && <div className="toc-summary"><Check size={20} /><strong>{scene.summary}</strong></div>}
          </div>
          <div className="toc-demo-surface">{reveal < 2 ? <QuestionBuildUp reveal={reveal} /> : <SceneDemo type={scene.demo} />}</div>
        </article>
        <footer className="toc-controls">
          <button type="button" className="toc-control" onClick={prev} disabled={sceneIndex === 0 && reveal === 0} title="Previous"><ChevronLeft size={20} /></button>
          <div className="toc-dots">{Array.from({ length: maxReveal + 1 }, (_, index) => <span key={index} className={index <= reveal ? 'on' : ''} />)}</div>
          <button type="button" className="toc-control primary" onClick={next} disabled={sceneIndex === scenes.length - 1 && reveal === maxReveal} title="Next"><ChevronRight size={20} /></button>
        </footer>
      </section>
    </main>
  )
}

function placeholderScenes(module) {
  return [{ kicker: `Module ${module.number}`, title: `${module.title} is ready for expansion`, subtitle: 'This module already opens independently through the shared TOC lesson engine.', demo: 'placeholder', exam: 'Add scenes to the module data array and the navigation, reveal system, and layout will work automatically.', summary: 'The platform is future-module ready.' }]
}

function QuestionBuildUp({ reveal }) {
  return <div className="toc-question-build"><Brain size={56} /><span>{reveal === 0 ? 'Question' : 'Idea'}</span><p>{reveal === 0 ? 'What exactly is the machine checking?' : 'Convert the concept into a visible rule.'}</p></div>
}

function SceneDemo({ type }) {
  if (type === 'gate') return <GateDemo />
  if (type === 'pipeline') return <ComputationPipeline />
  if (type === 'strings') return <StringLab />
  if (type === 'language') return <LanguageLab />
  if (type === 'automaton') return <AutomatonSimulator />
  if (type === 'decision') return <DecisionDemo />
  return <FutureModuleDemo />
}

function GateDemo() {
  const [input, setInput] = useState('aab')
  const valid = /^a*b$/.test(input)
  return (
    <div className="toc-gate-demo">
      <div className="toc-input-pad"><label htmlFor="gate-input">Input string</label><input id="gate-input" value={input} onChange={(event) => setInput(event.target.value.toLowerCase())} /></div>
      <div className={`toc-acceptor ${valid ? 'accepted' : 'rejected'}`}>{valid ? <DoorOpen size={50} /> : <X size={50} />}<strong>{valid ? 'Accepted' : 'Rejected'}</strong><span>Rule: zero or more a symbols followed by one b</span></div>
    </div>
  )
}

function ComputationPipeline() {
  return <div className="toc-compute-flow">{[['Input', '1011'], ['Read symbol', '1'], ['Apply rule', 'move right'], ['New state', 'q1'], ['Output', 'decision']].map(([label, value], index) => <div className="toc-compute-step" key={label} style={{ '--i': index }}><span>{label}</span><strong>{value}</strong></div>)}</div>
}

function StringLab() {
  const [alphabet, setAlphabet] = useState(['a', 'b'])
  const [left, setLeft] = useState('ab')
  const [right, setRight] = useState('ba')
  const toggle = (symbol) => setAlphabet((items) => items.includes(symbol) ? items.filter((item) => item !== symbol) : [...items, symbol].sort())
  const allowed = [...left + right].every((char) => alphabet.includes(char))
  return (
    <div className="toc-string-lab">
      <div className="toc-alphabet-row">{['a', 'b', '0', '1'].map((symbol) => <button key={symbol} type="button" className={alphabet.includes(symbol) ? 'active' : ''} onClick={() => toggle(symbol)}>{symbol}</button>)}</div>
      <div className="toc-concat"><input value={left} onChange={(event) => setLeft(event.target.value)} aria-label="First string" /><span>+</span><input value={right} onChange={(event) => setRight(event.target.value)} aria-label="Second string" /><span>=</span><strong>{left + right || 'epsilon'}</strong></div>
      <div className={`toc-validity ${allowed ? 'yes' : 'no'}`}>{allowed ? 'All symbols are in Sigma' : 'String uses symbols outside Sigma'}</div>
    </div>
  )
}

function LanguageLab() {
  const [power, setPower] = useState(3)
  const language = useMemo(() => ['epsilon', ...Array.from({ length: power }, (_, index) => 'a'.repeat(index + 1))], [power])
  return (
    <div className="toc-language-lab">
      <div className="toc-language-rule"><Binary size={24} /><strong>L = {'{ a^n | n >= 0 }'}</strong></div>
      <input type="range" min="1" max="7" value={power} onChange={(event) => setPower(Number(event.target.value))} aria-label="Generate language size" />
      <div className="toc-language-cloud">{language.map((item, index) => <span key={item} className={index === language.length - 1 ? 'fresh' : ''}>{item}</span>)}</div>
    </div>
  )
}

function AutomatonSimulator() {
  const [input, setInput] = useState('1010')
  const [cursor, setCursor] = useState(0)
  const state = [...input.slice(0, cursor)].reduce((current, symbol) => symbol === '1' ? 1 - current : current, 0)
  const accepted = cursor === input.length && state === 0
  return (
    <div className="toc-automaton">
      <div className="toc-machine-row"><div className={`toc-state ${state === 0 ? 'active' : ''} ${accepted ? 'accept' : ''}`}>q0</div><div className="toc-transitions"><span>1</span><span>0 loops</span></div><div className={`toc-state ${state === 1 ? 'active' : ''}`}>q1</div></div>
      <div className="toc-tape">{[...input].map((char, index) => <span key={`${char}-${index}`} className={index === cursor ? 'scan' : index < cursor ? 'done' : ''}>{char}</span>)}</div>
      <div className="toc-sim-actions"><input value={input} onChange={(event) => { setInput(event.target.value.replace(/[^01]/g, '')); setCursor(0) }} aria-label="Binary input" /><button type="button" onClick={() => setCursor((value) => Math.min(input.length, value + 1))} disabled={cursor === input.length}>Step</button><button type="button" onClick={() => setCursor(0)}>Reset</button></div>
      <p className={accepted ? 'toc-accepted-text' : 'toc-state-text'}>{cursor === input.length ? (accepted ? 'Accepted: even number of 1s' : 'Rejected: odd number of 1s') : `Reading position ${cursor + 1}`}</p>
    </div>
  )
}

function DecisionDemo() {
  return <div className="toc-decision-grid">{[['Lexical analyzer', 'Is this token valid?'], ['Login form', 'Does the password match the policy?'], ['Network protocol', 'Is this packet sequence legal?'], ['Search filter', 'Does this text match the pattern?']].map(([title, question], index) => <div key={title} className="toc-decision-card" style={{ '--i': index }}><Layers3 size={23} /><strong>{title}</strong><span>{question}</span></div>)}</div>
}

function FutureModuleDemo() {
  return <div className="toc-future"><CircuitBoard size={64} /><strong>Shared visual engine</strong><p>Drop in new scenes and demos; the module opens with the same controls and progression.</p></div>
}

function TocApp() {
  const current = routeState(useLocation().pathname)
  if (current.view === 'landing') return <LandingPage />
  if (current.view === 'modules') return <ModuleSelector />
  if (current.view === 'module') return <ModulePage module={current.module} />
  return <Navigate to="/" replace />
}

export default TocApp

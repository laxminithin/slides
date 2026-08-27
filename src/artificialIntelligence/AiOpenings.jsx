import { CinematicOpener, SearchOpenerScene, HeuristicLandscape, FolGrowScene, BackwardOpenerScene, JourneyPicture, SynthesisJourney, IntelligenceCore } from './AiUniverse.jsx'

export function Module1Opening() {
  return (
    <CinematicOpener
      kicker="Module 1 · Intelligent Agents"
      title="ARTIFICIAL INTELLIGENCE"
      line="Perceive the world. Choose an action."
      stage={1}
    />
  )
}

export function Module2Opening() {
  return (
    <CinematicOpener
      kicker="Module 2 · Search"
      title="SEARCH"
      line="Finding a path through possibilities."
      stage={2}
      scene={<SearchOpenerScene />}
    />
  )
}

export function Module3Opening() {
  return (
    <CinematicOpener
      kicker="Module 3 · Guidance"
      title="INFORMED SEARCH"
      line="Search with guidance."
      stage={3}
      scene={<HeuristicLandscape />}
    />
  )
}

export function Module4Opening() {
  return (
    <CinematicOpener
      kicker="Module 4 · Knowledge structure"
      title="FIRST-ORDER LOGIC"
      line="Objects, relations, and rules that fire."
      stage={4}
      scene={<FolGrowScene />}
    />
  )
}

export function Module5Opening() {
  return (
    <CinematicOpener
      kicker="Module 5 · Proof → Plan"
      title="REASON BACKWARD"
      line="Start from the question. Then decide what to do."
      stage={5}
      scene={<BackwardOpenerScene />}
    />
  )
}

const ENDINGS = {
  1: {
    title: 'An agent is a loop with a standard',
    points: [
      'AI: build systems that perceive, reason, and act',
      'Four views: human/rational × think/act — this course: rational action',
      'PEAS specifies the task; environment properties predict complexity',
      'Architectures: reflex → model → goal → utility → learning',
    ],
    confuse: 'Rational ≠ omniscient. Rationality maximises expected performance from evidence, not actual future luck.',
    q: 'Define a rational agent. Draw the agent–environment diagram. Write PEAS for an automated taxi.',
  },
  2: {
    title: 'Search is how an agent looks ahead',
    points: [
      'Formulate: initial, ACTIONS, RESULT, goal test, path cost',
      'BFS: FIFO, complete, optimal if step costs equal, O(b^d) memory',
      'DFS: stack, cheap memory, not optimal, can loop',
      'UCS / IDS / bidirectional close the uninformed toolkit',
    ],
    confuse: 'BFS is optimal only for equal (or nondecreasing) step costs. For unequal costs use UCS.',
    q: 'Compare BFS, DFS, UCS, DLS, IDS: completeness, optimality, time, space.',
  },
  3: {
    title: 'Knowledge turns search into reasoning',
    points: [
      'Greedy follows h(n); A* follows f = g + h',
      'Admissible h never overestimates; consistent h is graph-search safe',
      'KB agents: TELL / ASK / infer. Wumpus makes hidden hazards logical',
      'Propositional logic: syntax, semantics, entailment, inference',
    ],
    confuse: 'Greedy found Bucharest via Fagaras — 32 miles longer. Lowest h is not lowest path.',
    q: 'State A* optimality conditions. Define h1 and h2 for the 8-puzzle.',
  },
  4: {
    title: 'FOL names the world’s furniture',
    points: [
      'Constants, variables, functions, predicates, quantifiers',
      'Knowledge engineering: task → vocabulary → axioms → test',
      'Unification finds a substitution that makes expressions identical',
      'Forward chaining: facts fire definite-clause rules to a fixpoint',
    ],
    confuse: 'Quantifier order changes meaning. ∀x∃y Loves(x,y) is not ∃y∀x Loves(x,y).',
    q: 'Encode the Colonel West crime story. Trace two FC iterations to Criminal(West).',
  },
  5: {
    title: 'Queries pull. Plans push.',
    points: [
      'Backward chaining starts at the query; AND/OR proof trees',
      'Resolution: CNF, complementary literals, empty clause = contradiction',
      'Classical planning: PDDL states, action schemas, precond/effect',
      'Progression vs regression; planning graphs + mutex',
    ],
    confuse: 'Empty clause means the KB entails the query — the proof succeeded, the world is not empty.',
    q: 'Convert a FOL sentence to CNF and resolve. Define Fly(p,from,to) in PDDL.',
  },
}

const NEXT = {
  1: 'NEXT: How does the agent find a solution?',
  2: 'NEXT: What if the agent knew which direction looked promising?',
  3: 'NEXT: How can the agent express knowledge about objects and relations?',
  4: 'NEXT: But what if we start from the question itself?',
  5: 'Intelligence is not one algorithm. It is the ability to perceive, reason, choose and act.',
}

export function ModuleEnding({ n = 1 }) {
  const e = ENDINGS[n]
  return (
    <div className="ai-scene" style={{ padding: 18, display: 'grid', gap: 10, alignContent: 'start' }}>
      <strong style={{ fontSize: 22 }}>{e.title}</strong>
      <ul className="ai-points">
        {e.points.map((p) => <li key={p}>{p}</li>)}
      </ul>
      <div className="ai-callout ai-callout-warn"><span>Do not confuse</span><p>{e.confuse}</p></div>
      <div className="ai-callout ai-callout-idea"><span>Common 10-mark</span><p>{e.q}</p></div>
      <p className="ai-lead">{NEXT[n]}</p>
    </div>
  )
}

export function ModuleMotif({ n = 1 }) {
  return <IntelligenceCore stage={n} />
}

export function ModulePicture({ n = 1 }) {
  const pics = {
    1: ['World', 'Perception', 'Agent', 'Rational decision', 'Action'],
    2: ['Start', 'State space', 'Frontier', 'Uninformed strategies', 'Goal'],
    3: ['Heuristic', 'A*', 'Knowledge', 'Wumpus', 'Logic'],
    4: ['Objects', 'Quantifiers', 'Unify', 'Facts + rules', 'New knowledge'],
    5: ['Query', 'Backward chain', 'Resolution □', 'Plan', 'Action'],
  }
  if (n === 5) return <SynthesisJourney />
  return <JourneyPicture items={pics[n]} />
}

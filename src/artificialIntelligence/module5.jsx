import { Callout, CodeBlock, Definition, Flow, Lead, Points, ResourceHub, Stage, aiSlide } from './AiKit.jsx'
import {
  BackwardChainingViz,
  ComparePanel,
  ForwardChainingViz,
  GoalStackPlanner,
  PlanningGraphViz,
  ResolutionScene,
} from './AiScenes.jsx'
import { AirCargoScene, CinematicOpener, CnfPipeline, ContrastPair, FlySchema, PlanningTransition, SynthesisJourney } from './AiUniverse.jsx'
import { Module5Opening, ModuleEnding, ModulePicture } from './AiOpenings.jsx'

const S = ['BC', 'Prolog', 'CNF', 'Resolution', 'PDDL', 'Search', 'Graph']
const k = (t) => `MODULE 5 · ${t}`
function s(cfg, body) {
  return aiSlide({ ...cfg, content: body })
}

export const aiModule5Slides = [
  s({ id: 'm5-open', kicker: k('PROOFS AND PLANS'), title: 'From the query backward. From the state forward', hideTitle: true, composition: 'hero-open', camera: 'wide-world', family: 'backward-trace', object: 'opener', action: 'watch-proof', film: { chapterOpener: true, hero: true } },
    <Stage composition="hero-open" visual={<Module5Opening />} takeaway="The same KB can be run as a proof or as a planner." />),

  s({ id: 'm5-bc', kicker: k('BACKWARD CHAINING'), title: 'Start at Criminal(West). Work back to facts', composition: 'full-stage', camera: 'inspect-kb', family: 'backward-trace', object: 'proof-tree', action: 'trace-back', story: S, beat: 0, film: { hero: true } },
    <Stage composition="full-stage" story={S} beat={0} visual={<BackwardChainingViz />} takeaway="AND: prove every premise. OR: pick a clause whose head unifies with the goal." exam="Called with a list of goals. Returns substitutions. Facts are clauses with a head and no body.">
      <Lead>Each matching clause pushes its body onto the goal stack. A fact matching the goal adds no new subgoals.</Lead>
    </Stage>),

  s({ id: 'm5-vs-fc', kicker: k('FC VS BC'), title: 'Push all consequences, or pull only what the query needs', composition: 'race', camera: 'side-by-side', family: 'compare-split', object: 'twin-chain', action: 'contrast' },
    <Stage composition="race" visual={<ForwardChainingViz step={3} />} visualB={<BackwardChainingViz />} takeaway="FC is data-driven. BC is goal-driven. Same definite clauses, opposite control." exam="BC is efficient when the query is specific. FC derives every reachable fact — including irrelevant ones." />),

  s({ id: 'm5-prolog', kicker: k('LOGIC PROGRAMMING'), title: 'Prolog is depth-first backward chaining with extra sugar', composition: 'terminal', camera: 'inspect-kb', family: 'backward-trace', object: 'prolog', action: 'execute', story: S, beat: 1 },
    <Stage composition="terminal" story={S} beat={1} visual={<CodeBlock lines={['% variables UPPERCASE, constants lower', 'criminal(X) :- american(X), weapon(Y), sells(X,Y,Z), hostile(Z).', 'append([], Y, Y).', 'append([H|T], Y, [H|Z]) :- append(T, Y, Z).']} />} exam="Negation as failure: not P succeeds if P cannot be proved. Occur check omitted. = is unifiability, not true equality.">
      <Points items={['Clause: head :- body.  “:-” is left implication', 'Query append(A,B,[1,2]) returns every split of the list']} />
    </Stage>),

  s({ id: 'm5-wam', kicker: k('PROLOG ENGINE'), title: 'Choice points, the trail, and the Warren machine', composition: 'pipeline', camera: 'dive-tree', family: 'dfs-dive', object: 'wam', action: 'backtrack' },
    <Stage composition="pipeline" visual={<Flow items={['Goal', 'Unify a clause', 'Choice point', 'Succeed or TRAIL undo', 'WAM code']} />} takeaway="Interpreted mode runs FOL-BC-ASK. Compiled mode targets the Warren Abstract Machine.">
      <Points items={['One answer + a promise of the rest = a choice point', 'Bindings are pushed on a trail so failure can unbind', 'Continuations package “what to do when this goal succeeds”']} />
    </Stage>),

  s({ id: 'm5-par', kicker: k('PARALLELISM'), title: 'OR-parallel is easy. AND-parallel is not', composition: 'board', camera: 'side-by-side', family: 'compare-split', object: 'or-and', action: 'split-search' },
    <Stage composition="board" visual={<ComparePanel leftTitle="OR-parallel" rightTitle="AND-parallel" left={['A goal unifies with many clauses', 'Independent branches', 'Each may be a solution']} right={['Conjuncts of one body in parallel', 'Bindings must stay consistent', 'Harder to implement']} />} />),

  s({ id: 'm5-loops', kicker: k('REDUNDANT INFERENCE'), title: 'A three-node graph can still loop forever', composition: 'tree', camera: 'dive-tree', family: 'dfs-dive', object: 'path-loop', action: 'warn-infinite' },
    <Stage composition="tree" visual={<CodeBlock lines={['link(a,b).  link(b,c).', 'path(X,Z) :- link(X,Z).', 'path(X,Z) :- link(X,Y), path(Y,Z).', '% query path(a,c) — watch left recursion']} />} takeaway="Memoization / tabling stops repeated subgoals. Constraint logic programming binds ranges, not only constants." exam="CLP: triangle(3,4,Z) yields 7 ≥ Z ≥ 1 rather than fail." />),

  s({ id: 'm5-res-div', kicker: k('RESOLUTION'), title: 'From facts to a contradiction — or a proof', hideTitle: true, composition: 'hero-open', camera: 'wide-world', family: 'resolve-cancel', object: 'res-open', action: 'open-res', film: { chapterOpener: true } },
    <Stage composition="hero-open" visual={<CinematicOpener kicker="Resolution" title="Complementary literals cancel" line="The empty clause means the KB entails the query." stage={5} scene={<ResolutionScene />} />} />),

  s({ id: 'm5-res', kicker: k('RESOLUTION'), title: 'P ∨ Q  meets  ¬P  and leaves  Q', composition: 'full-stage', camera: 'zoom-clause', family: 'resolve-cancel', object: 'resolvent', action: 'cancel', story: S, beat: 3 },
    <Stage composition="full-stage" story={S} beat={3} visual={<ResolutionScene />} takeaway="First-order resolution unifies complementary literals, then cancels them." exam="Proof by contradiction: add ¬query, resolve until □. Empty clause = success, not “the world is empty.”">
      <Lead>Every FOL sentence has an inferentially equivalent CNF form.</Lead>
    </Stage>),

  s({ id: 'm5-cnf', kicker: k('CNF'), title: 'Everyone who loves all animals is loved by someone', composition: 'timeline', camera: 'inspect-kb', family: 'formula-reveal', object: 'cnf-steps', action: 'convert', story: S, beat: 2 },
    <Stage composition="timeline" story={S} beat={2} visual={<CnfPipeline />} exam="Skolem functions replace existentials. Standardized variables avoid accidental capture.">
      <Lead>The textbook walks this sentence all the way to clauses. Reproduce the pipeline in the exam even if you slip a symbol.</Lead>
    </Stage>),

  s({ id: 'm5-empty', kicker: k('RESOLUTION'), title: 'When nothing is left, the proof is done', composition: 'inspect', camera: 'zoom-clause', family: 'resolve-cancel', object: 'empty', action: 'close-proof' },
    <Stage composition="inspect" visual={<ResolutionScene empty />} takeaway="Backward chaining is resolution with a particular control strategy.">
      <Callout kind="ok" label="Refutation completeness">If KB entails alpha, resolution will find the empty clause — given enough time and the CNF of KB union not-alpha.</Callout>
    </Stage>),

  s({ id: 'm5-plan-div', kicker: k('PLANNING'), title: 'From current state to goal', hideTitle: true, composition: 'hero-open', camera: 'wide-world', family: 'plan-unfold', object: 'plan-open', action: 'open-plan', film: { chapterOpener: true } },
    <Stage composition="hero-open" visual={<PlanningTransition />} />),

  s({ id: 'm5-pddl', kicker: k('CLASSICAL PLANNING'), title: 'PDDL: one schema, not 4 T n² ground actions', composition: 'full-stage', camera: 'pull-formula', family: 'fly-schema', object: 'fly', action: 'write-schema', story: S, beat: 4 },
    <Stage composition="full-stage" story={S} beat={4} visual={<FlySchema />} exam="State = conjunction of ground functionless fluents. Closed-world + unique names. Goal may contain variables (existential).">
      <Definition term="Classical planning">Find an action sequence that reaches a goal, using a factored representation (PDDL), not atomic search states.</Definition>
      <CodeBlock highlight={1} lines={['Action(Fly(p, from, to),', '  PRECOND: At(p,from) ∧ Plane(p) ∧ Airport(from) ∧ Airport(to)', '  EFFECT:  ¬At(p,from) ∧ At(p,to))']} />
    </Stage>),

  s({ id: 'm5-cargo', kicker: k('AIR CARGO'), title: 'Load, Unload, Fly — and At really means “available”', composition: 'pipeline', camera: 'travel-plan', family: 'air-cargo', object: 'cargo', action: 'maintain-at' },
    <Stage composition="pipeline" visual={<AirCargoScene />} takeaway="Basic PDDL has no ∀, so cargo stops being At while In a plane, and becomes At again only when unloaded.">
      <Lead>Otherwise flying would leave ghost cargo at the old airport.</Lead>
    </Stage>),

  s({ id: 'm5-complex', kicker: k('COMPLEXITY'), title: 'PlanSAT is decidable — until you add functions', composition: 'board', camera: 'pull-formula', family: 'formula-reveal', object: 'plansat', action: 'classify' },
    <Stage composition="board" visual={<ComparePanel leftTitle="PlanSAT" rightTitle="Bounded PlanSAT" left={['Does any plan exist?', 'Decidable (finite states)', 'With functions: only semi-decidable']} right={['Is there a plan of length ≤ k?', 'Used to find optimal plans', 'Stays decidable with functions']} />} exam="Both sit in PSPACE. Finite states from finite objects and no function symbols." />),

  s({ id: 'm5-prog', kicker: k('STATE-SPACE PLANNING'), title: 'Progression goes forward. Regression goes back', composition: 'race', camera: 'side-by-side', family: 'prog-reg', object: 'prog-reg', action: 'two-directions', story: S, beat: 5 },
    <Stage composition="race" story={S} beat={5} visual={<ContrastPair leftTitle="Progression" left="From the initial state, apply applicable actions. Irrelevant Buy(isbn) has 10 billion ground instances." rightTitle="Regression" right="From the goal, walk backward through actions that could have achieved a fluent." />} exam="Forward search looked hopeless until good domain-independent heuristics (around 1998).">
      <Lead>Any Chapter 3 heuristic search — plus a log of actions — is a planner.</Lead>
    </Stage>),

  s({ id: 'm5-blocks', kicker: k('BLOCKS WORLD'), title: 'On, Clear, Move — a stack that becomes a goal', composition: 'full-stage', camera: 'inspect-board', family: 'state-transition', object: 'blocks', action: 'restack' },
    <Stage composition="full-stage" visual={<GoalStackPlanner />} takeaway="Operators encode what can change. Preconditions must hold; effects rewrite fluents.">
      <Lead>A concrete symbolic domain for every planning algorithm in the module.</Lead>
    </Stage>),

  s({ id: 'm5-graph', kicker: k('PLANNING GRAPHS'), title: 'Proposition layers, action layers, mutex links', composition: 'full-stage', camera: 'wide-world', family: 'planning-graph-expand', object: 'graphplan', action: 'layer', story: S, beat: 6, notes: 'GraphPlan. Mutex explain impossible pairs. Reachability, not a full plan.' },
    <Stage composition="full-stage" story={S} beat={6} visual={<PlanningGraphViz />} exam="A planning graph is a reachability sketch. Mutex: two actions/fluents cannot co-occur. GraphPlan extracts a plan level by level.">
      <Lead>The graph grows until the goal fluents appear with no mutex among them — then search for a real plan.</Lead>
    </Stage>),

  s({ id: 'm5-course', kicker: k('INTEGRATION'), title: 'Search, logic, planning — one rational agent', composition: 'radial', camera: 'wide-world', family: 'agent-loop', object: 'course', action: 'integrate' },
    <Stage composition="radial" visual={<SynthesisJourney />} takeaway="AI in this syllabus is the study of rational action under representation limits.">
      <Lead>Atomic states, then sentences, then factored fluents. Each was a response to the last one’s weakness.</Lead>
    </Stage>),

  s({ id: 'm5-picture', kicker: k('ONE PICTURE'), title: 'Module 5 in one picture', composition: 'full-stage', camera: 'wide-world', family: 'backward-trace', object: 'summary', action: 'recap' },
    <Stage composition="full-stage" visual={<ModulePicture n={5} />} />),

  s({ id: 'm5-confuse', kicker: k('CONFUSIONS'), title: 'Empty clause is victory', composition: 'before-after', camera: 'side-by-side', family: 'compare-split', object: 'traps', action: 'warn' },
    <Stage composition="before-after" visual={<ContrastPair leftTitle="□" left="KB union not-alpha is unsatisfiable, so KB entails alpha." rightTitle="No plan" right="PlanSAT answered no — a different empty." />}>
      <Points items={['Progression ≠ “just BFS on the real world” — the action schema still has to ground', 'Mutex is not a conflict with the opponent; it is an impossible pair inside one layer']} />
    </Stage>),

  s({ id: 'm5-end', kicker: k('CLOSE'), title: 'Queries pull. Plans push. The agent still acts', composition: 'board', camera: 'wide-world', family: 'plan-unfold', object: 'ending', action: 'close-story' },
    <Stage composition="board" visual={<ModuleEnding n={5} />} />),

  s({ id: 'm5-resources', kicker: k('RESOURCES'), title: 'Notes, questions, quick revision', composition: 'dashboard', camera: 'overhead-map', family: 'compare-split', object: 'hub', action: 'study' },
    <Stage composition="dashboard" visual={<ResourceHub moduleId="module-5" />} />),
]

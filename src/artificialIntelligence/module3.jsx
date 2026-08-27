import { Callout, Definition, Lead, Points, ResourceHub, Stage, aiSlide, Formula } from './AiKit.jsx'
import {
  AStarFormula,
  EightPuzzle,
  HeuristicCompare,
  KnowledgeBaseScene,
  LogicInferenceFlow,
  SearchTree,
  StateSpaceMap,
  WumpusCave,
} from './AiScenes.jsx'
import { ContrastPair, HeuristicLandscape, KnowledgeMorph, MemoryBoundedViz } from './AiUniverse.jsx'
import { Module3Opening, ModuleEnding, ModulePicture } from './AiOpenings.jsx'

const S = ['Informed', 'Greedy', 'A*', 'Heuristics', 'KB', 'Wumpus', 'Logic', 'PL']
const k = (t) => `MODULE 3 · ${t}`
function s(cfg, body) {
  return aiSlide({ ...cfg, content: body })
}

export const aiModule3Slides = [
  s({ id: 'm3-open', kicker: k('INFORMED SEARCH'), title: 'Use knowledge to search smarter', hideTitle: true, composition: 'hero-open', camera: 'wide-world', family: 'heuristic-glow', object: 'opener', action: 'watch-h', film: { chapterOpener: true, hero: true } },
    <Stage composition="hero-open" visual={<Module3Opening />} takeaway="A number that guesses remaining cost can shrink a hopeless tree." />),

  s({ id: 'm3-best', kicker: k('BEST-FIRST'), title: 'Expand the node that looks cheapest under f', composition: 'inspect', camera: 'pull-formula', family: 'formula-reveal', object: 'fn', action: 'define', story: S, beat: 0 },
    <Stage composition="inspect" story={S} beat={0} visual={<HeuristicLandscape />} takeaway="Best-first is UCS with f instead of g. The choice of f is the strategy." exam="h(n) = estimated cheapest cost from n to a goal. h(goal) = 0.">
      <Definition term="Informed search">Uses problem-specific knowledge beyond the problem definition. Usually a heuristic h(n).</Definition>
    </Stage>),

  s({ id: 'm3-greedy', kicker: k('GREEDY'), title: 'Follow the lowest h — the node that looks closest', composition: 'map', camera: 'overhead-map', family: 'heuristic-glow', object: 'hsld', action: 'chase-h', story: S, beat: 1, notes: 'hSLD(Arad)=366. Path Arad-Sibiu-Fagaras-Bucharest is 32 miles longer.' },
    <Stage composition="map" story={S} beat={1} visual={<StateSpaceMap highlight="Fagaras" />} takeaway="Greedy found a path. It was not the shortest. That is why it is called greedy." exam="f(n) = h(n). Complete in finite spaces, not infinite. Worst time/space O(|V|).">
      <Lead>From Arad, Sibiu looks closer than Zerind or Timisoara. Then Fagaras, then Bucharest.</Lead>
    </Stage>),

  s({ id: 'm3-greedy-tree', kicker: k('GREEDY'), title: 'Lowest h lights up. The long way still wins the glow', composition: 'tree', camera: 'follow-frontier', family: 'heuristic-glow', object: 'greedy-tree', action: 'mislead' },
    <Stage composition="tree" visual={<SearchTree mode="greedy" path={['S', 'B', 'G']} heuristics={{ S: 8, A: 6, B: 4, C: 7, D: 5, E: 3, G: 0 }} queue={['E']} />} >
      <Callout kind="warn" label="Danger">A tempting heuristic can skip a cheaper corridor. Always compare with A* on the same map.</Callout>
    </Stage>),

  s({ id: 'm3-astar', kicker: k('A*'), title: 'Pay for the past. Guess the future. Add them', composition: 'full-stage', camera: 'pull-formula', family: 'astar-combine', object: 'fgh', action: 'combine', story: S, beat: 2, film: { hero: true } },
    <Stage composition="full-stage" story={S} beat={2} visual={<AStarFormula />} takeaway="f(n) = g(n) + h(n) never overestimates the solution through n if h is admissible." exam="Write f = g + h with meanings. This is the flagship informed algorithm." />),

  s({ id: 'm3-astar-run', kicker: k('A*'), title: 'Frontier ordered by f. g, h, f sit on every node', composition: 'tree', camera: 'follow-frontier', family: 'astar-combine', object: 'open-list', action: 'select-min-f' },
    <Stage composition="tree" visual={<SearchTree mode="astar" path={['S', 'A']} costs={{ S: 0, A: 2, B: 3 }} heuristics={{ S: 6, A: 4, B: 5, G: 0 }} fvals={{ S: 6, A: 6, B: 8 }} queue={['A', 'B']} />} takeaway="Expand the smallest f. Ties still respect the heuristic’s advice.">
      <Lead>OPEN is the frontier. CLOSED is expanded. Successors inherit g = g(parent) + step.</Lead>
    </Stage>),

  s({ id: 'm3-adm', kicker: k('OPTIMALITY'), title: 'Admissible never overestimates. Consistent obeys the triangle', composition: 'board', camera: 'inspect-kb', family: 'formula-reveal', object: 'adm-cons', action: 'prove-safe' },
    <Stage composition="board" visual={<Formula vars={[['admissible', 'h(n) ≤ true remaining cost'], ['consistent', 'h(n) ≤ c(n,a,n′) + h(n′)'], ['fact', 'consistent ⇒ admissible']]}>h must be optimistic</Formula>} exam="Graph-search A* is optimal if h is consistent. Tree-search A* is optimal if h is admissible.">
      <Points items={['If h is consistent, f is nondecreasing along any path', 'When A* expands n, an optimal path to n is already known']} />
    </Stage>),

  s({ id: 'm3-contour', kicker: k('CONTOURS'), title: 'A* grows bands toward the goal, not circles around start', composition: 'map', camera: 'overhead-map', family: 'heuristic-glow', object: 'bands', action: 'stretch' },
    <Stage composition="map" visual={<StateSpaceMap highlight="Bucharest" />} takeaway="UCS (h=0) has circular contours. Better h stretches and narrows them toward the goal." exam="A* expands all n with f(n) < C*, and some with f = C*. Optimally efficient for a given consistent h.">
      <Lead>Completeness needs a finite number of nodes with f ≤ C* — true if step costs ≥ ε and b is finite.</Lead>
    </Stage>),

  s({ id: 'm3-mem', kicker: k('MEMORY-BOUNDED'), title: 'A* dies of RAM. IDA*, RBFS, SMA* borrow less', composition: 'timeline', camera: 'inspect-kb', family: 'ids-limit', object: 'memory', action: 'save-ram', notes: 'IDA* cutoff is f, not depth. RBFS linear space. SMA* drops worst leaf.' },
    <Stage composition="timeline" visual={<MemoryBoundedViz />} exam="IDA*: next cutoff = smallest f that exceeded last time. SMA*: expand newest / delete oldest on f ties.">
      <Points items={['IDA* keeps one number between iterations — painful with real-valued costs', 'RBFS backs up the best child f so forgotten subtrees can return', 'SMA* uses all available memory, then forgets the worst leaf']} />
    </Stage>),

  s({ id: 'm3-h1h2', kicker: k('8-PUZZLE HEURISTICS'), title: 'Misplaced tiles versus Manhattan distance', composition: 'race', camera: 'inspect-board', family: 'heuristic-glow', object: 'h1h2', action: 'dominate', story: S, beat: 3 },
    <Stage composition="race" story={S} beat={3} visual={<EightPuzzle />} visualB={<HeuristicCompare />} takeaway="h2 = 3+1+2+2+2+3+3+2 = 18. Neither overestimates the true 26. h2 dominates h1." exam="h1 = 8 misplaced. Average solution ~22 steps. Branching ~3. Exhaustive 3^22 ≈ 3.1×10¹⁰.">
      <Lead>Manhattan never uses diagonals — tiles cannot. One move reduces Manhattan by at most 1.</Lead>
    </Stage>),

  s({ id: 'm3-quality', kicker: k('HEURISTIC QUALITY'), title: 'Effective branching factor b* scores a heuristic', composition: 'inspect', camera: 'pull-formula', family: 'formula-reveal', object: 'bstar', action: 'score' },
    <Stage composition="inspect" visual={<Formula vars={[['N', 'nodes generated'], ['d', 'solution depth'], ['b*', 'branching of a uniform tree with N+1 nodes']]}>N + 1 = 1 + b* + (b*)² + … + (b*)^d</Formula>} takeaway="Build heuristics by relaxing the problem, pattern databases, or learning from experience.">
      <Callout kind="ok" label="Dominance">If h2 ≥ h1 for all n and both are admissible, h2 is better — A* expands fewer nodes.</Callout>
    </Stage>),

  s({ id: 'm3-kb-div', kicker: k('KNOWLEDGE'), title: 'How does an AI system store what it knows?', hideTitle: true, composition: 'hero-open', camera: 'wide-world', family: 'logic-fire', object: 'kb-open', action: 'open-logic', film: { chapterOpener: true } },
    <Stage composition="hero-open" visual={<KnowledgeMorph />} />),

  s({ id: 'm3-kb', kicker: k('KB AGENTS'), title: 'TELL the truth. ASK a question. Infer the rest', composition: 'split-left', camera: 'inspect-kb', family: 'logic-fire', object: 'tell-ask', action: 'query', story: S, beat: 4 },
    <Stage composition="split-left" story={S} beat={4} visual={<KnowledgeBaseScene />} exam="Declarative vs procedural. Sentence, KB, background knowledge, knowledge level. Inference is guaranteed if the KB is.">
      <Definition term="Knowledge base">A set of sentences in a knowledge-representation language describing the world.</Definition>
      <Points items={['TELL(P) adds knowledge', 'ASK(P) queries truth', 'The agent is specified by what it knows and what it wants']} />
    </Stage>),

  s({ id: 'm3-wumpus', kicker: k('WUMPUS'), title: 'A 4×4 cave where logic keeps you alive', composition: 'full-stage', camera: 'inspect-board', family: 'wumpus-sense', object: 'cave', action: 'sense', story: S, beat: 5, notes: 'PEAS: +1000 gold, −1000 death, −1/action, −10 arrow.' },
    <Stage composition="full-stage" story={S} beat={5} visual={<WumpusCave />} takeaway="Local percepts (stench, breeze, glitter, bump, scream) support global conclusions." exam="Start [1,1] facing right. Wumpus too big for pits. Adjacent: stench / breeze. Glitter iff gold.">
      <Lead>One arrow. Bottomless pits. A heap of gold. The wumpus eats anyone who shares its square.</Lead>
    </Stage>),

  s({ id: 'm3-w-peas', kicker: k('WUMPUS PEAS'), title: 'The cave as a task environment', composition: 'zoom-detail', camera: 'close-up', family: 'wumpus-percept', object: 'w-peas', action: 'specify' },
    <Stage composition="zoom-detail" visual={<WumpusCave zoom />} exam="Partially observable, deterministic, sequential, static, discrete, single-agent (wumpus is a feature).">
      <Points items={['Actuators: Left, Right, Forward, Grab, Shoot, Climb at [1,1]', 'Sensors: five bits — Stench, Breeze, Glitter, Bump, Scream', 'Gold and wumpus random except start; each other square is a pit with P=0.2']} />
    </Stage>),

  s({ id: 'm3-logic', kicker: k('LOGIC'), title: 'Syntax writes sentences. Semantics gives them truth', composition: 'pipeline', camera: 'inspect-kb', family: 'logic-fire', object: 'syn-sem', action: 'bind-meaning', story: S, beat: 6 },
    <Stage composition="pipeline" story={S} beat={6} visual={<LogicInferenceFlow premises={['Syntax: which strings are sentences', 'Semantics: which sentences are true in which models']} conclusion="Entailment: KB |= alpha if alpha is true in every model of KB" />} exam="Model, entailment, sound inference (truth-preserving), complete inference.">
      <Lead>Logics are formal languages built so that conclusions can be drawn.</Lead>
    </Stage>),

  s({ id: 'm3-pl', kicker: k('PROPOSITIONAL'), title: 'Symbols, connectives, truth tables', composition: 'board', camera: 'pull-formula', family: 'formula-reveal', object: 'connectives', action: 'compose', story: S, beat: 7 },
    <Stage composition="board" story={S} beat={7} visual={<Formula>¬  ∧  ∨  ⇒  ⇔</Formula>} exam="A simple logic: each symbol is true or false. Less expressive than FOL, easier to implement.">
      <Points items={['Syntax: atomic sentences and connectives', 'Semantics: a model assigns T/F to every symbol', 'A sentence is valid if true in all models; satisfiable if true in some']} />
    </Stage>),

  s({ id: 'm3-entail', kicker: k('INFERENCE'), title: 'From facts to conclusions — without adding falsehood', composition: 'cause-effect', camera: 'inspect-kb', family: 'logic-fire', object: 'entailment', action: 'preserve-truth' },
    <Stage composition="cause-effect" visual={<KnowledgeBaseScene facts={['Breeze at [1,2]', 'Breeze => pit adjacent']} derived="Pit in [1,3] or [2,2]" />} takeaway="Model checking enumerates 2^n assignments. Resolution proves by contradiction.">
      <Points items={['Truth-table entailment is sound and complete — and exponential', 'Equivalence, validity, satisfiability are the exam vocabulary']} />
    </Stage>),

  s({ id: 'm3-picture', kicker: k('ONE PICTURE'), title: 'Module 3 in one picture', composition: 'full-stage', camera: 'wide-world', family: 'astar-combine', object: 'summary', action: 'recap' },
    <Stage composition="full-stage" visual={<ModulePicture n={3} />} />),

  s({ id: 'm3-confuse', kicker: k('CONFUSIONS'), title: 'h is guidance, not GPS', composition: 'before-after', camera: 'side-by-side', family: 'compare-split', object: 'traps', action: 'warn' },
    <Stage composition="before-after" visual={<ContrastPair leftTitle="Greedy" left="f = h. Fast. Not optimal on the Romania map." rightTitle="A*" right="f = g + h. Optimal with admissible / consistent h." />}>
      <Points items={['Admissible ⇏ consistent, but consistent ⇒ admissible', 'Logical agents are definite: true, false, or unknown — not “probably”']} />
    </Stage>),

  s({ id: 'm3-end', kicker: k('CLOSE'), title: 'Search got a compass. Then knowledge got a language', composition: 'board', camera: 'wide-world', family: 'logic-fire', object: 'ending', action: 'close-story' },
    <Stage composition="board" visual={<ModuleEnding n={3} />} />),

  s({ id: 'm3-arch', kicker: k('BRIDGE'), title: 'A knowledge-based agent is still an agent', composition: 'split-right', camera: 'zoom-agent', family: 'agent-loop', object: 'kb-agent', action: 'reconnect' },
    <Stage composition="split-right" visual={<KnowledgeMorph />} takeaway="TELL percepts, ASK the next action, TELL that the action was done.">
      <Lead>The rest of the course is how ASK is implemented — FOL, chaining, resolution, planning.</Lead>
    </Stage>),

  s({ id: 'm3-resources', kicker: k('RESOURCES'), title: 'Notes, questions, quick revision', composition: 'dashboard', camera: 'overhead-map', family: 'compare-split', object: 'hub', action: 'study' },
    <Stage composition="dashboard" visual={<ResourceHub moduleId="module-3" />} />),
]

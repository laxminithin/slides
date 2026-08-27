import { Callout, CodeBlock, Definition, Flow, Lead, Points, ResourceHub, Stage, aiSlide, Formula } from './AiKit.jsx'
import {
  BidirectionalSearchViz,
  ComparePanel,
  ComplexityBoard,
  EightPuzzle,
  SearchTree,
  StateSpaceMap,
} from './AiScenes.jsx'
import { ComplexityOnTree, ContrastPair, CinematicOpener, ProblemSolvingFlow, SearchOpenerScene, VacuumConstellation } from './AiUniverse.jsx'
import { Module2Opening, ModuleEnding, ModulePicture } from './AiOpenings.jsx'

const S = ['Problem', 'Formulate', 'Space', 'Tree', 'BFS', 'DFS', 'Cost', 'IDS']
const k = (t) => `MODULE 2 · ${t}`
function s(cfg, body) {
  return aiSlide({ ...cfg, content: body })
}

export const aiModule2Slides = [
  s({ id: 'm2-open', kicker: k('PROBLEM SOLVING'), title: 'Turn the world into states and actions', hideTitle: true, composition: 'hero-open', camera: 'wide-world', family: 'state-expand', object: 'opener', action: 'watch-space', film: { chapterOpener: true, hero: true } },
    <Stage composition="hero-open" visual={<Module2Opening />} takeaway="When the next action is not obvious, the agent looks ahead." />),

  s({ id: 'm2-psa', kicker: k('PROBLEM-SOLVING AGENTS'), title: 'Formulate, search, execute', composition: 'pipeline', camera: 'travel-plan', family: 'goal-seek', object: 'cycle', action: 'sequence', story: S, beat: 0 },
    <Stage composition="pipeline" story={S} beat={0} visual={<ProblemSolvingFlow />} takeaway="A search algorithm returns an action sequence. Execution carries it out, then a new goal is formed." exam="Name the four phases of a problem-solving agent.">
      <Lead>Goal formulation uses the current situation and the performance measure. Problem formulation decides which actions and states to consider.</Lead>
    </Stage>),

  s({ id: 'm2-five', kicker: k('WELL-DEFINED PROBLEMS'), title: 'Five components make a problem precise', composition: 'inspect', camera: 'inspect-board', family: 'formula-reveal', object: 'five-tuple', action: 'define', notes: 'Initial, ACTIONS, RESULT, goal test, path cost. Romania: In(Arad).' },
    <Stage composition="inspect" visual={<StateSpaceMap highlight="Arad" />} exam="A problem = initial state, ACTIONS(s), RESULT(s,a), goal test, path cost.">
      <Definition term="Well-defined problem">Initial state, actions, transition model, goal test, and a path-cost function that matches the performance measure.</Definition>
    </Stage>),

  s({ id: 'm2-romania', kicker: k('ROMANIA'), title: 'From Arad, three roads are applicable', composition: 'map', camera: 'overhead-map', family: 'state-expand', object: 'romania', action: 'branch', story: S, beat: 1 },
    <Stage composition="map" story={S} beat={1} visual={<StateSpaceMap highlight="Arad" />} takeaway="ACTIONS(In(Arad)) = {Go(Sibiu), Go(Timisoara), Go(Zerind)}.">
      <Points items={['RESULT(In(Arad), Go(Zerind)) = In(Zerind)', 'Goal test: { In(Bucharest) }', 'Step cost c(s,a,s′) is kilometres on the map']} />
    </Stage>),

  s({ id: 'm2-space', kicker: k('STATE SPACE'), title: 'Initial + actions + RESULT define a graph', composition: 'full-stage', camera: 'wide-world', family: 'state-expand', object: 'graph', action: 'expand-out' },
    <Stage composition="full-stage" visual={<StateSpaceMap highlight="Sibiu" />} takeaway="Nodes are states. Links are actions. A path is a sequence of both.">
      <Lead>The state space is every state reachable from the initial state by any action sequence.</Lead>
    </Stage>),

  s({ id: 'm2-abs', kicker: k('ABSTRACTION'), title: 'Leave the radio out of the map', composition: 'before-after', camera: 'side-by-side', family: 'compare-split', object: 'detail', action: 'strip' },
    <Stage composition="before-after" visual={<ContrastPair leftTitle="Real drive" left="Companions, radio, scenery, police, rest stops, weather…" rightTitle="Model" right="In(Arad). Only location changes. Roads are bidirectional." />} takeaway="Valid + useful abstraction: every abstract step can be refined, and is easier than the original problem.">
      <Lead>Removing detail is abstraction. Without it, intelligent agents drown in the real world.</Lead>
    </Stage>),

  s({ id: 'm2-vac', kicker: k('TOY: VACUUM'), title: '2 × 2² = 8 world states', composition: 'microscope', camera: 'inspect-board', family: 'vacuum-clean', object: 'eight-states', action: 'count', notes: 'n locations: n·2^n states.' },
    <Stage composition="microscope" visual={<VacuumConstellation active={0} />} exam="Vacuum: states = location × dirt bits. Actions Left, Right, Suck. Goal: all clean. Path cost = steps.">
      <Points items={['Initial state: any of the eight', 'Moving past the end has no effect; sucking a clean square has no effect', 'Larger n: n · 2ⁿ states']} />
    </Stage>),

  s({ id: 'm2-puzzle', kicker: k('TOY: 8-PUZZLE'), title: 'Slide a blank; 9!/2 = 181,440 reachable states', composition: 'inspect', camera: 'inspect-board', family: 'state-expand', object: 'tiles', action: 'slide', story: S, beat: 2 },
    <Stage composition="inspect" story={S} beat={2} visual={<EightPuzzle />} takeaway="Actions are moves of the blank: Left, Right, Up, Down. Each step costs 1. NP-complete family." exam="Half of the initial states cannot reach a given goal.">
      <Lead>The 15-puzzle has ~1.3 trillion states. The 24-puzzle ~10²⁵.</Lead>
    </Stage>),

  s({ id: 'm2-queens', kicker: k('TOY: 8-QUEENS'), title: 'No queen attacks another', composition: 'board', camera: 'inspect-board', family: 'csp-place', object: 'queens', action: 'place' },
    <Stage composition="board" visual={<ComparePanel leftTitle="Naive incremental" rightTitle="Better incremental" left={['0–8 queens anywhere', '64×63×…×57 ≈ 1.8×10¹⁴ sequences']} right={['One queen per left column', 'Never place in an attacked square', '2,057 states']} />} exam="Incremental vs complete-state formulation. Path cost is irrelevant — only the final board counts.">
      <Lead>Incremental: add a queen. Complete-state: all eight are on the board and you move them.</Lead>
    </Stage>),

  s({ id: 'm2-knuth', kicker: k('TOY: KNUTH'), title: 'From 4, factorial / √ / floor can reach any integer', composition: 'timeline', camera: 'pull-formula', family: 'formula-reveal', object: 'infinite', action: 'show-infinite' },
    <Stage composition="timeline" visual={<Formula>start at 4 · apply !, √, ⌊ ⌋ · reach n</Formula>} takeaway="Toy problems can have infinite state spaces. DFS without a limit is then unsafe.">
      <Points items={['States: positive numbers. Initial: 4', 'Donald Knuth (1964) conjectured every positive integer is reachable']} />
    </Stage>),

  s({ id: 'm2-real', kicker: k('REAL-WORLD'), title: 'Route finding, touring, VLSI, robot nav, assembly', composition: 'dashboard', camera: 'overhead-map', family: 'state-expand', object: 'real', action: 'list-worlds' },
    <Stage composition="dashboard" visual={<StateSpaceMap highlight="Bucharest" />}>
      <Lead>A real-world problem is one whose solutions people actually care about. Descriptions are messier than toys.</Lead>
    </Stage>),

  s({ id: 'm2-tree', kicker: k('SEARCH TREES'), title: 'Frontier in, node out, successors on', composition: 'tree', camera: 'dive-tree', family: 'state-expand', object: 'frontier', action: 'expand', story: S, beat: 3, notes: 'GRAPH-SEARCH vs TREE-SEARCH. Explored set avoids repeats.' },
    <Stage composition="tree" story={S} beat={3} visual={<SearchTree mode="idle" queue={['A', 'B']} path={['S']} />} exam="Strategy = which frontier node expands next. Graph search stores the explored set.">
      <Points items={['A node is a bookkeeping structure: state, parent, action, path cost, depth', 'Tree search can re-visit. Graph search does not', 'Goal test timing differs by algorithm']} />
    </Stage>),

  s({ id: 'm2-perf', kicker: k('PERFORMANCE'), title: 'Completeness, optimality, time, space', composition: 'radial', camera: 'pull-formula', family: 'formula-reveal', object: 'bdm', action: 'measure' },
    <Stage composition="radial" visual={<ComplexityOnTree />} exam="Time ~ nodes generated. Space ~ max nodes stored.">
      <Lead>Uninformed search has no extra knowledge: only successors and a goal test.</Lead>
    </Stage>),

  s({ id: 'm2-bfs-div', kicker: k('UNINFORMED'), title: 'Explore without guidance', hideTitle: true, composition: 'hero-open', camera: 'wide-world', family: 'state-expand', object: 'divider', action: 'open-blind', film: { chapterOpener: true } },
    <Stage composition="hero-open" visual={<CinematicOpener kicker="Uninformed search" title="Explore without guidance" line="Generate successors. Recognise the goal. Nothing else." stage={2} scene={<SearchOpenerScene />} />} />),

  s({ id: 'm2-bfs', kicker: k('BFS'), title: 'Shallowest node first — a FIFO queue', composition: 'full-stage', camera: 'overhead-tree', family: 'bfs-wave', object: 'levels', action: 'level-order', story: S, beat: 4, notes: 'Goal test when generated. Optimal for equal step costs. O(b^d).' },
    <Stage composition="full-stage" story={S} beat={4} visual={<SearchTree mode="bfs" depth={1} queue={['A', 'B']} path={['S']} />} takeaway="Depth 0, then 1, then 2. Students should see why BFS is level-order.">
      <Lead>Root, then every successor, then theirs. New nodes go to the back of the queue.</Lead>
    </Stage>),

  s({ id: 'm2-bfs-run', kicker: k('BFS'), title: 'Depth 2 reaches G', composition: 'tree', camera: 'follow-frontier', family: 'bfs-wave', object: 'goal-node', action: 'find-goal' },
    <Stage composition="tree" visual={<SearchTree mode="bfs-goal" depth={2} queue={['C', 'D', 'E', 'G']} path={['S', 'B', 'G']} />} takeaway="Goal test on generation — the first goal is a shallowest goal.">
      <Points items={['Complete if b is finite', 'Optimal when every step has the same cost', 'Memory, not time, is the usual killer']} />
    </Stage>),

  s({ id: 'm2-bfs-code', kicker: k('BFS'), title: 'Pseudocode: FIFO frontier', composition: 'terminal', camera: 'inspect-kb', family: 'formula-reveal', object: 'fifo', action: 'read-code' },
    <Stage composition="terminal" visual={<CodeBlock highlight={3} lines={['frontier ← FIFO queue with node(start)', 'while frontier is not empty', '  n ← pop-front(frontier)', '  for each child in expand(n)', '    if child is goal: return path', '    push-back(frontier, child)']} />} exam="Time and space O(b^d). Advantages: a solution if one exists; a minimal-step solution.">
      <Callout kind="warn" label="Disadvantage">Every level sits in memory. Far-away goals are slow.</Callout>
    </Stage>),

  s({ id: 'm2-dfs', kicker: k('DFS'), title: 'Deepest node first — a stack', composition: 'full-stage', camera: 'dive-tree', family: 'dfs-dive', object: 'branch', action: 'dive', story: S, beat: 5, notes: 'Same tree as BFS. LIFO. O(bm) time, O(bm) space for tree.' },
    <Stage composition="full-stage" story={S} beat={5} visual={<SearchTree mode="dfs" depth={2} stack={['C']} path={['S', 'A', 'C']} />} takeaway="Same tree as BFS. One branch goes to the bottom before any sibling.">
      <Lead>When a node has no successors it is dropped; search backs up to the next deepest unexpanded node.</Lead>
    </Stage>),

  s({ id: 'm2-dfs-prop', kicker: k('DFS'), title: 'Cheap memory, dangerous depth', composition: 'split-right', camera: 'follow-frontier', family: 'dfs-dive', object: 'stack', action: 'warn-loop' },
    <Stage composition="split-right" visual={<SearchTree mode="dfs" stack={['D', 'B']} path={['S', 'A']} />} exam="Advantages: stores only the path. May reach a nearby left goal fast. Disadvantages: loops, incompleteness, not optimal.">
      <Points items={['Space: current path + unexplored siblings', 'Time: O(b^m) — m may be infinite']} />
    </Stage>),

  s({ id: 'm2-vs', kicker: k('BFS VS DFS'), title: 'Same problem, two personalities', composition: 'race', camera: 'side-by-side', family: 'compare-split', object: 'twin-trees', action: 'contrast' },
    <Stage composition="race" visual={<SearchTree mode="bfs" depth={1} queue={['A', 'B']} path={['S']} />} visualB={<SearchTree mode="dfs" stack={['C']} path={['S', 'A', 'C']} />} takeaway="BFS is a rising tide. DFS is a plunge. Memory vs completeness is the exam trade-off." />),

  s({ id: 'm2-ucs', kicker: k('UNIFORM COST'), title: 'Expand the lowest g(n), not the shallowest', composition: 'tree', camera: 'follow-frontier', family: 'ucs-reorder', object: 'priority', action: 'reorder', story: S, beat: 6, notes: 'Sibiu → Bucharest example: 80, 99, 177, 310, then 278.' },
    <Stage composition="tree" story={S} beat={6} visual={<SearchTree mode="ucs" path={['S']} costs={{ S: 0, A: 80, B: 99 }} queue={['A', 'B']} />} takeaway="Frontier is a priority queue on path cost g. Goal test when selected, not when generated." exam="UCS generalises BFS to unequal step costs. Costs must be nonnegative.">
      <Lead>The first generated goal may sit on a worse path — keep going.</Lead>
    </Stage>),

  s({ id: 'm2-ucs-ex', kicker: k('UCS WORKED'), title: 'Sibiu to Bucharest: 310 looks like a goal, 278 wins', composition: 'timeline', camera: 'overhead-map', family: 'ucs-reorder', object: 'romania-cost', action: 'work-example' },
    <Stage composition="timeline" visual={<StateSpaceMap highlight="Pitesti" />} exam="Rimnicu 80 → Pitesti 177; Fagaras 99 → Bucharest 310; then Pitesti → Bucharest 278. Replace the worse path.">
      <Flow items={['Sibiu', 'Rimnicu 80', 'Fagaras 99', 'Pitesti 177', 'Bucharest 310', 'Bucharest 278']} />
    </Stage>),

  s({ id: 'm2-dls', kicker: k('DEPTH-LIMITED'), title: 'Treat depth ℓ as if it had no children', composition: 'tree', camera: 'dive-tree', family: 'ids-limit', object: 'cutoff', action: 'cap-depth' },
    <Stage composition="tree" visual={<SearchTree mode="dls" depth={1} path={['S', 'A']} prune={['C', 'D', 'E', 'G']} />} takeaway="Two failures: standard failure (no solution) and cutoff (none within ℓ)." exam="Time O(b^ℓ), space O(bℓ). Incomplete if ℓ < d. Non-optimal if ℓ > d. DFS is DLS with ℓ = ∞.">
      <Lead>The limit kills infinite paths. The wrong limit hides a real goal.</Lead>
    </Stage>),

  s({ id: 'm2-ids', kicker: k('ITERATIVE DEEPENING'), title: 'ℓ = 0, then 1, then 2, until the goal depth', composition: 'full-stage', camera: 'dive-tree', family: 'ids-limit', object: 'repeated-dfs', action: 'raise-limit', story: S, beat: 7 },
    <Stage composition="full-stage" story={S} beat={7} visual={<SearchTree mode="ids" depth={2} path={['S', 'B', 'G']} />} takeaway="BFS completeness + DFS memory. Nodes near the root are regenerated — the extra cost is small." exam="N(IDS)=(d)b+(d−1)b²+…+b^d = O(b^d). For b=10, d=5: 123,450 vs BFS 111,110.">
      <Lead>The cutoff on the successful iteration is d, the shallowest goal.</Lead>
    </Stage>),

  s({ id: 'm2-bi', kicker: k('BIDIRECTIONAL'), title: 'One search from S, one from G, stop when they touch', composition: 'full-stage', camera: 'wide-world', family: 'meet-in-middle', object: 'two-frontiers', action: 'meet' },
    <Stage composition="full-stage" visual={<BidirectionalSearchViz meet />} takeaway="If both sides are BFS, time and space drop to O(b^{d/2}). At least one tree stays in memory for the meet test." exam="Complete/optimal depends on the two strategies. Checking membership can be O(1).">
      <Lead>Two small graphs instead of one large one. The glow is the meeting point.</Lead>
    </Stage>),

  s({ id: 'm2-table', kicker: k('COMPARISON'), title: 'No uninformed strategy wins every column', composition: 'dashboard', camera: 'pull-formula', family: 'compare-split', object: 'table', action: 'choose-tool' },
    <Stage composition="dashboard" visual={<ComplexityBoard rows={[['BFS', 'Yes*', 'Yes†', 'O(b^d)', 'O(b^d)'], ['DFS', 'No', 'No', 'O(b^m)', 'O(bm)'], ['DLS', 'No', 'No', 'O(b^ℓ)', 'O(bℓ)'], ['IDS', 'Yes*', 'Yes†', 'O(b^d)', 'O(bd)'], ['UCS', 'Yes*', 'Yes‡', 'O(b^{1+⌊C*/ε⌋})', 'same']]} />} exam="* finite b. † equal step costs. ‡ nonnegative costs.">
      <Callout kind="idea" label="Exam move">State the assumption under every Yes.</Callout>
    </Stage>),

  s({ id: 'm2-picture', kicker: k('ONE PICTURE'), title: 'Module 2 in one picture', composition: 'full-stage', camera: 'wide-world', family: 'state-expand', object: 'summary', action: 'recap' },
    <Stage composition="full-stage" visual={<ModulePicture n={2} />} />),

  s({ id: 'm2-confuse', kicker: k('CONFUSIONS'), title: 'Shallowest is not cheapest', composition: 'before-after', camera: 'side-by-side', family: 'compare-split', object: 'traps', action: 'warn' },
    <Stage composition="before-after" visual={<ContrastPair leftTitle="BFS" left="Optimal for equal costs. FIFO. Goal test on generation." rightTitle="UCS" right="Optimal for nonnegative unequal costs. Priority on g. Goal test on expansion." />}>
      <Points items={['IDS is not “slow BFS” — it is BFS quality with DFS memory', 'Cutoff ≠ failure in DLS']} />
    </Stage>),

  s({ id: 'm2-end', kicker: k('CLOSE'), title: 'The frontier is the whole algorithm', composition: 'board', camera: 'wide-world', family: 'state-expand', object: 'ending', action: 'close-story' },
    <Stage composition="board" visual={<ModuleEnding n={2} />} />),

  s({ id: 'm2-resources', kicker: k('RESOURCES'), title: 'Notes, questions, quick revision', composition: 'dashboard', camera: 'overhead-map', family: 'compare-split', object: 'hub', action: 'study' },
    <Stage composition="dashboard" visual={<ResourceHub moduleId="module-2" />} />),
]

/**
 * TOC V2.0 — Module 5 Masterpiece
 * Turing Machines and Undecidability
 */
import { BookOpen, FileQuestion, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  ChipFlow, Compare, Deck, Definition, Divider, Example, Hook, OpeningShell, Points, slide,
} from './components/TocKit'
import { OpeningM5 } from './components/TocOpenings'
import { DecisionGate, HaltingMetaphor, LivingTuringMachine } from './components/TocViz'

const story = ['Tape', 'Read', 'Write', 'Move', 'Universal', 'Decide?', 'Halt']
const icon = { size: 22, strokeWidth: 1.8, 'aria-hidden': true }

export const theoryOfComputationModule5Slides = [
  slide({ id: 'm5-opening', kicker: 'Opening', title: 'TURING MACHINES', subtitle: 'Module 5 — The birth of universal computation', layout: 'full', hideTitle: true, content: (
    <OpeningShell scene={<OpeningM5 />} moduleLabel="VTU — Module 5" title="THE TAPE" subtitle="Read · write · move · think" />
  ) }),
  slide({ id: 'm5-why', kicker: 'The problem', title: 'What is a computer, formally?', subtitle: 'Before silicon: a head on an unbounded road', content: (
    <Deck active={0} story={story} composition="toc-comp-hero" visual={<LivingTuringMachine />} takeaway="A Turing machine captures the idea of an effective mechanical computation.">
      <Hook>A tiny controller becomes universal when it can revisit and rewrite unbounded memory.</Hook>
      <Points items={['Finite states supply control.', 'The tape stores symbols without a fixed bound.', 'Its limitations become limitations of algorithms themselves.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-divider-machine', kicker: 'Chapter', title: 'The machine', layout: 'full', hideTitle: true, content: (
    <Divider number="01" title="A computation one move at a time" subtitle="Configuration · transition · trace · halt" visual={<LivingTuringMachine />} />
  ) }),
  slide({ id: 'm5-transition', kicker: 'Execution', title: 'Read, write, move, change state', subtitle: 'One atomic step', content: (
    <Deck active={2} story={story} composition="toc-comp-blueprint" visual={<LivingTuringMachine />} takeaway="δ(q,a)=(p,b,D): sense a, write b, move D, enter p.">
      <Definition term="TM transition">A transition observes the current state and scanned symbol, then writes one symbol, moves L or R, and changes state.</Definition>
      <Points items={['Blank B marks unused tape.', 'The head may revisit earlier cells.', 'No transition or an explicit halt state ends the run.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-tuple', kicker: 'Formal model', title: 'The seven components', subtitle: 'M = (Q, Σ, Γ, δ, q0, B, F)', content: (
    <Deck active={2} story={story} composition="toc-comp-visual-first" visual={<LivingTuringMachine />} takeaway="The input alphabet excludes blank; the tape alphabet contains both.">
      <Points items={['Q: finite states; Σ: input alphabet.', 'Γ: tape alphabet with Σ⊆Γ and B∈Γ.', 'δ: transition function; q0 start; F accepting states.']} />
      <Example label="Common variant">Separate qaccept and qreject replace the set F.</Example>
    </Deck>
  ) }),
  slide({ id: 'm5-configurations', kicker: 'Snapshots', title: 'An instantaneous description freezes the whole machine', subtitle: 'Tape content, head position, and state', content: (
    <Deck active={3} story={story} composition="toc-comp-reverse" visual={<LivingTuringMachine />} takeaway="αqβ means the head scans the first symbol of β while α lies to its left.">
      <Definition term="Instantaneous description">A finite notation for the nonblank tape region together with the current state inserted immediately before the scanned symbol.</Definition>
      <Points items={['ID ⊢ ID′ means one legal move.', '⊢* means zero or more moves.', 'An accepting computation is a path from the start ID to qaccept.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-trace', kicker: 'Trace', title: 'Read an ID sequence as a moving head', subtitle: 'State symbol marks the cursor', content: (
    <Deck active={3} story={story} composition="toc-comp-timeline" visual={<LivingTuringMachine />} takeaway="A trace is the rigorous execution evidence for a TM design.">
      <ChipFlow items={['q0 110B', 'X q1 10B', 'X1 q1 0B', 'X10 q2 B', 'X1 q3 0B', 'qaccept']} />
      <Example label="Exam habit">Annotate the transition used and stop as soon as acceptance or rejection is forced.</Example>
    </Deck>
  ) }),
  slide({ id: 'm5-design-method', kicker: 'Programming', title: 'Design with sweeps, markers, and invariants', subtitle: 'High-level plan before transition table', content: (
    <Deck active={3} story={story} composition="toc-comp-tree" visual={<LivingTuringMachine />} takeaway="A good TM program says what each sweep establishes.">
      <Points items={['Mark processed symbols with X, Y, or another tape symbol.', 'Sweep right to find a partner; sweep left to reset.', 'Use states as named subroutines and prove the invariant between sweeps.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-design-anbn', kicker: 'Design example', title: 'Recognize 0ⁿ1ⁿ by crossing off pairs', subtitle: 'One 0 earns exactly one 1', content: (
    <Deck active={3} story={story} composition="toc-comp-radial" visual={<LivingTuringMachine />} takeaway="Repeated matching decides the language because every pass makes measurable progress.">
      <ChipFlow items={['mark leftmost 0→X', 'scan right', 'mark first unmatched 1→Y', 'return left', 'repeat', 'verify only Ys remain']} />
      <Points items={['Reject if no 1 matches a chosen 0.', 'Reject if an unmarked 1 remains after all 0s are crossed.', 'Accept the empty input as n=0 when specified.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-design-palindrome', kicker: 'Design example', title: 'Recognize a palindrome from the outside inward', subtitle: 'Remember one symbol in the state', content: (
    <Deck active={3} story={story} composition="toc-comp-compare" visual={<LivingTuringMachine />} takeaway="Finite control remembers the chosen boundary symbol while the tape locates its mate.">
      <Points items={['Mark the leftmost unprocessed symbol.', 'Sweep to the rightmost unprocessed symbol and compare.', 'Reject on mismatch; return left; accept when zero or one symbol remains.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-design-increment', kicker: 'Design example', title: 'Compute, do not merely recognize', subtitle: 'Binary increment on the tape', content: (
    <Deck active={3} story={story} composition="toc-comp-quiet" visual={<LivingTuringMachine />} takeaway="TMs are transducers too: the final tape can encode an output.">
      <ChipFlow items={['scan to right blank', 'move left', '1→0 carry left', '0→1 halt', 'blank→1 halt']} />
      <Example label="Run">1011 becomes 1100.</Example>
    </Deck>
  ) }),
  slide({ id: 'm5-decider-recognizer', kicker: 'Outcomes', title: 'Halting behavior separates deciders from recognizers', subtitle: 'Reject is not the same as loop', content: (
    <Deck active={5} story={story} composition="toc-comp-minimal" visual={<DecisionGate />} takeaway="A decider halts on every input; a recognizer only promises to halt on members.">
      <Compare leftTitle="Decider" rightTitle="Recognizer" left={['Accept members', 'Reject nonmembers', 'Always halts']} right={['Accept members', 'Reject or loop on nonmembers', 'May not halt']} foot="This distinction creates recursive versus recursively enumerable languages." />
    </Deck>
  ) }),
  slide({ id: 'm5-divider-variants', kicker: 'Chapter', title: 'Equivalent variants', layout: 'full', hideTitle: true, content: (
    <Divider number="02" title="More tapes, tracks, or choices" subtitle="Convenience changes; computability power does not" visual={<LivingTuringMachine />} />
  ) }),
  slide({ id: 'm5-multitape', kicker: 'Multitape TM', title: 'Several tapes make algorithms easier to express', subtitle: 'Independent heads, one transition', content: (
    <Deck active={4} story={story} composition="toc-comp-hero" visual={<LivingTuringMachine />} takeaway="A k-tape TM reads k symbols, writes k symbols, and moves k heads per step.">
      <Points items={['Input starts on tape 1; other tapes are blank.', 'Useful for copying, comparison, and work storage.', 'Every multitape TM has an equivalent single-tape simulation.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-multitape-example', kicker: 'Multitape design', title: 'Two tapes compare duplicated blocks cleanly', subtitle: 'Copy on one tape, verify on another', content: (
    <Deck active={4} story={story} composition="toc-comp-blueprint" visual={<ChipFlow items={['Tape 1: w#w', 'Tape 2: BBB…', 'copy first w', 'reset tape 2', 'compare second w', 'accept/reject']} />} takeaway="Auxiliary tape turns repeated rescanning into a direct comparison.">
      <Example label="Language">{"L={w#w | w∈{0,1}*}."}</Example>
    </Deck>
  ) }),
  slide({ id: 'm5-single-simulation', kicker: 'Simulation sketch', title: 'One tape simulates many with tracks and delimiters', subtitle: 'Encode every tape and head position', content: (
    <Deck active={4} story={story} composition="toc-comp-visual-first" visual={<LivingTuringMachine />} takeaway="A full sweep discovers scanned symbols; another sweep updates symbols and head markers.">
      <ChipFlow items={['# tape1 # tape2 # …', 'mark each head', 'sweep to read tuple', 'store tuple in state', 'sweep to write/move', 'repeat']} />
      <Points items={['Extend an encoded tape segment when a head reaches its boundary.', 'Simulation is slower, often quadratic, but recognizes the same language.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-ntm', kicker: 'Nondeterministic TM', title: 'Branching changes time intuition, not language power', subtitle: 'Accept if one branch accepts', content: (
    <Deck active={4} story={story} composition="toc-comp-reverse" visual={<HaltingMetaphor />} takeaway="A deterministic TM can dovetail all branches and preserve recognizability.">
      <Points items={['δ may offer several moves.', 'A decider must halt on every branch.', 'Breadth-first simulation prevents one infinite branch from hiding an accepting one.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-enumerators', kicker: 'Equivalent model', title: 'Enumerators print exactly the RE languages', subtitle: 'Generation meets recognition again', content: (
    <Deck active={4} story={story} composition="toc-comp-timeline" visual={<LivingTuringMachine />} takeaway="A language is Turing-recognizable iff some enumerator lists all and only its strings.">
      <Definition term="Enumerator">A TM with an output device that prints strings over time; order and repetition do not matter.</Definition>
      <Points items={['Recognizer→enumerator: dovetail runs on all strings.', 'Enumerator→recognizer: wait until the requested string is printed.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-utm', kicker: 'Universal machine', title: 'Programs become data', subtitle: 'U receives an encoding 〈M,w〉', content: (
    <Deck active={4} story={story} composition="toc-comp-tree" visual={<LivingTuringMachine />} takeaway="A universal TM simulates any encoded TM on its encoded input.">
      <Definition term="Universal Turing machine">U(〈M,w〉) reproduces the computation of M on w.</Definition>
      <Points items={['Machines and configurations can be encoded as strings.', 'One fixed interpreter can execute many programs.', 'Self-reference becomes possible—and dangerous.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-divider-languages', kicker: 'Chapter', title: 'Language classes', layout: 'full', hideTitle: true, content: (
    <Divider number="03" title="Will the machine always return?" subtitle="Recursive · RE · co-RE · beyond recognition" visual={<HaltingMetaphor />} />
  ) }),
  slide({ id: 'm5-recursive-re', kicker: 'Classes', title: 'Recursive and RE differ on negative instances', subtitle: 'Always halt versus maybe wait forever', content: (
    <Deck active={5} story={story} composition="toc-comp-radial" visual={<Compare leftTitle="Recursive / decidable" rightTitle="RE / recognizable" left={['A decider halts on all inputs', 'Both yes and no are certified', 'Closed under complement']} right={['Recognizer halts on members', 'May loop on nonmembers', 'Not closed under complement']} foot="Recursive ⊊ RE ⊊ all languages." />} takeaway="L is recursive exactly when both L and its complement are RE.">
      <Hook>Run the two recognizers in parallel; one must eventually accept and reveal yes or no.</Hook>
    </Deck>
  ) }),
  slide({ id: 'm5-language-examples', kicker: 'Examples', title: 'Place familiar problems on the map', subtitle: 'The machine’s halting promise matters', content: (
    <Deck active={5} story={story} composition="toc-comp-compare" visual={<DecisionGate />} takeaway="A concrete problem is a language of encoded yes-instances.">
      <Compare leftTitle="Recursive examples" rightTitle="RE but undecidable examples" left={['DFA acceptance A_DFA', 'CFG membership A_CFG', 'Primality encodings']} right={['A_TM = {〈M,w〉 | M accepts w}', 'HALT_TM = {〈M,w〉 | M halts on w}']} foot="A_TM is recognizable by direct simulation, but no decider exists." />
    </Deck>
  ) }),
  slide({ id: 'm5-atm', kicker: 'Canonical problem', title: 'A_TM looks easy until the simulation does not stop', subtitle: 'Acceptance of an encoded machine', content: (
    <Deck active={5} story={story} composition="toc-comp-quiet" visual={<HaltingMetaphor />} takeaway="A_TM is recognizable and undecidable.">
      <Definition term="A_TM">{"{〈M,w〉 | M is a TM that accepts w}."}</Definition>
      <Points items={['Recognizer: simulate M on w and accept when M accepts.', 'If M rejects, reject; if M loops, the recognizer loops.', 'Diagonalization proves no machine decides all encodings.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-halting', kicker: 'Halting problem', title: 'A perfect termination predictor creates a paradox', subtitle: 'Self-reference defeats the decider', content: (
    <Deck active={6} story={story} composition="toc-comp-minimal" visual={<HaltingMetaphor />} takeaway="HALT_TM is RE but undecidable.">
      <Hook>Assume H predicts whether M halts on w. Build D that does the opposite when fed its own encoding.</Hook>
      <ChipFlow items={['assume H', 'construct D', 'D loops if H says halt', 'D halts if H says loop', 'run D on 〈D〉', 'contradiction']} />
    </Deck>
  ) }),
  slide({ id: 'm5-divider-reductions', kicker: 'Chapter', title: 'Reductions and semantic limits', layout: 'full', hideTitle: true, content: (
    <Divider number="04" title="Transfer impossibility" subtitle="A_TM · E_TM · mapping reductions · Rice" visual={<HaltingMetaphor />} />
  ) }),
  slide({ id: 'm5-reduction-method', kicker: 'Technique', title: 'A reduction turns a solver for B into a solver for A', subtitle: 'Reduce known hard to target', content: (
    <Deck active={6} story={story} composition="toc-comp-hero" visual={<ChipFlow items={['instance x of A', 'computable map f', 'instance f(x) of B', 'hypothetical B decider', 'answer for A', 'contradiction']} />} takeaway="To prove B undecidable, show A≤mB for a known undecidable A.">
      <Definition term="Mapping reduction">A≤mB if a computable f satisfies x∈A iff f(x)∈B.</Definition>
      <Hook>Direction is crucial: hardness flows from A into B.</Hook>
    </Deck>
  ) }),
  slide({ id: 'm5-atm-reduction-example', kicker: 'Reduction example', title: 'Reduce A_TM to a new acceptance question', subtitle: 'Wrap the original computation', content: (
    <Deck active={6} story={story} composition="toc-comp-blueprint" visual={<LivingTuringMachine />} takeaway="Build a machine whose target behavior occurs exactly when M accepts w.">
      <Example label="Construction pattern">Given 〈M,w〉, output 〈N〉 where N ignores its own input, simulates M on w, and accepts iff M accepts.</Example>
      <Points items={['The transformation of encodings must halt.', 'Prove both directions of the iff.', 'Then a decider for the target would decide A_TM.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-etm', kicker: 'Emptiness intuition', title: 'E_TM asks whether a machine accepts nothing', subtitle: 'A global property of all inputs', content: (
    <Deck active={6} story={story} composition="toc-comp-visual-first" visual={<DecisionGate />} takeaway="E_TM is undecidable; its complement is recognizable, while E_TM itself is not RE.">
      <Definition term="E_TM">{"{〈M〉 | L(M)=∅}."}</Definition>
      <Points items={['Why hard: checking one rejected input says nothing about every other input.', 'Complement recognizer dovetails M on all strings and accepts when any branch accepts.', 'Reduction idea: make N accept some fixed string exactly when M accepts w.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-rice', kicker: "Rice's theorem", title: 'Every nontrivial semantic property of RE languages is undecidable', subtitle: 'Behavior matters; syntax does not', content: (
    <Deck active={6} story={story} composition="toc-comp-reverse" visual={<HaltingMetaphor />} takeaway="If the property depends only on L(M), contains some RE languages, and excludes others, no decider exists.">
      <Definition term="Rice's theorem">Every nontrivial property of the language recognized by a TM is undecidable.</Definition>
      <Compare leftTitle="Covered" rightTitle="Not covered directly" left={['L(M) is empty', 'L(M) is finite', 'L(M) is regular', 'L(M) contains 101']} right={['M has five states', 'M ever moves left', 'M halts within 100 steps']} foot="Semantic language property versus syntactic machine property." />
    </Deck>
  ) }),
  slide({ id: 'm5-proof-picker', kicker: 'Exam synthesis', title: 'Choose the right impossibility proof', subtitle: 'Diagonal, reduction, or Rice', content: (
    <Deck active={6} story={story} composition="toc-comp-timeline" visual={<ChipFlow items={['self-reference?', 'diagonalization', 'known hard source?', 'mapping reduction', 'nontrivial L(M) property?', "Rice's theorem"]} />} takeaway="The proof must explain why a hypothetical decider would solve something impossible.">
      <Points items={['Use direct simulation to establish recognizability first.', 'Use complements and dovetailing to classify RE/co-RE behavior.', 'State reduction direction and correctness explicitly.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-church-turing', kicker: 'Perspective', title: 'The model is simple; the claim is profound', subtitle: 'Church–Turing thesis', content: (
    <Deck active={4} story={story} composition="toc-comp-tree" visual={<LivingTuringMachine />} takeaway="Every effectively calculable procedure is believed to be TM-computable.">
      <Definition term="Church–Turing thesis">An informal identification of effective algorithmic computation with Turing-machine computability.</Definition>
      <Points items={['It is a thesis, not a formal theorem.', 'Lambda calculus, recursive functions, and modern programming models agree in computability power.']} />
    </Deck>
  ) }),
  slide({ id: 'm5-recap', kicker: 'Recap', title: 'The tape revealed both universality and limits', subtitle: 'Module 5 — and the course — close', content: (
    <Deck active={6} story={story} composition="toc-comp-radial" visual={<LivingTuringMachine />} takeaway="Design computations, classify their halting promises, then prove when no algorithm can exist.">
      <ChipFlow items={['TM', 'ID', 'Design', 'Multitape', 'UTM', 'Recursive/RE', 'A_TM', '≤m', 'Rice']} />
      <div className="toc-chip-flow">
        <Link to="/theory-of-computation/module-5/notes"><BookOpen {...icon} /> Notes</Link>
        <Link to="/theory-of-computation/module-5/previous-year-questions"><FileQuestion {...icon} /> PYQs</Link>
        <span><Sparkles {...icon} /> Living tape</span>
      </div>
    </Deck>
  ) }),
]

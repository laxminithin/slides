/**
 * TOC V2.0 — Module 2 Masterpiece
 * Regular Expressions and Finite Automata
 */
import { BookOpen, FileQuestion, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  ChipFlow, Compare, Deck, Definition, Divider, Example, Hook, OpeningShell, Points, slide,
} from './components/TocKit'
import { OpeningM2 } from './components/TocOpenings'
import {
  EpsilonClosureViz, LivingDfa, LivingDfaRun, LivingNfa, MinimizationMerge,
  RegexWeave, SubsetConstructionViz,
} from './components/TocViz'

const story = ['Pattern', 'Expression', 'Automaton', 'Prove', 'Minimize', 'Decide']
const icon = { size: 22, strokeWidth: 1.8, 'aria-hidden': true }

export const theoryOfComputationModule2Slides = [
  slide({ id: 'm2-opening', kicker: 'Opening', title: 'REGULAR EXPRESSIONS', subtitle: 'Module 2 — Describing languages', layout: 'full', hideTitle: true, content: (
    <OpeningShell scene={<OpeningM2 />} moduleLabel="VTU — Module 2" title="PATTERNS" subtitle="Alphabet → pattern → expression → language" />
  ) }),
  slide({ id: 'm2-why', kicker: 'The problem', title: 'How do we describe an infinite language in one line?', subtitle: 'Story before algebra', content: (
    <Deck active={0} story={story} composition="toc-comp-hero" visual={<RegexWeave />} takeaway="Regex is a finite blueprint for an infinite regular language.">
      <Hook>Writing every string is impossible. Writing the rule that generates them is engineering.</Hook>
      <Points items={['Search, lexers, and validators speak patterns.', 'Regex and finite automata describe exactly the regular languages.', 'This module moves from description to proof and canonical machine.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-divider-re', kicker: 'Chapter', title: 'Regular expressions', layout: 'full', hideTitle: true, content: (
    <Divider number="01" title="Build a language from symbols" subtitle="∅ · ε · union · concatenation · star" visual={<RegexWeave />} />
  ) }),
  slide({ id: 'm2-syntax', kicker: 'Syntax', title: 'The inductive recipe', subtitle: 'Every legal regular expression', content: (
    <Deck active={1} story={story} composition="toc-comp-blueprint" visual={<ChipFlow items={['∅', 'ε', 'a∈Σ', 'r+s', 'rs', 'r*', '(r)']} />} takeaway="The definition is recursive: base expressions plus three constructors.">
      <Definition term="Regular expression">Over Σ, ∅, ε, and every a∈Σ are regex; if r and s are regex, so are r+s, rs, and r*.</Definition>
      <Example label="Read aloud">(0+1)*01 means any binary prefix followed by 01.</Example>
    </Deck>
  ) }),
  slide({ id: 'm2-semantics', kicker: 'Meaning', title: 'Syntax becomes a set of strings', subtitle: 'The language L(r)', content: (
    <Deck active={1} story={story} composition="toc-comp-visual-first" visual={<RegexWeave />} takeaway="Regex operators mirror operations on languages.">
      <Points items={['L(∅)=∅, L(ε)={ε}, and L(a)={a}.', 'L(r+s)=L(r)∪L(s).', 'L(rs)=L(r)L(s); L(r*)=(L(r))*.']} />
      <Hook>The symbols are compact; their meaning is always a language.</Hook>
    </Deck>
  ) }),
  slide({ id: 'm2-example-end-01', kicker: 'Example', title: 'Design: strings ending in 01', subtitle: 'Translate prose into a suffix pattern', content: (
    <Deck active={1} story={story} composition="toc-comp-reverse" visual={<LivingDfaRun input={['1', '0', '0', '1']} />} takeaway="Leave the unrestricted part first; pin the required suffix last.">
      <Example label="Expression">(0+1)*01</Example>
      <Points items={['Accepts 01, 101, 0001.', 'Rejects ε, 10, 011.', 'The star supplies any prefix, including ε.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-example-even-zeros', kicker: 'Example', title: 'Design: an even number of 0s', subtitle: 'Pair every contribution', content: (
    <Deck active={1} story={story} composition="toc-comp-timeline" visual={<RegexWeave />} takeaway="Package zeros in pairs; permit arbitrary 1s around and between them.">
      <Example label="One valid regex">1*(01*01*)*</Example>
      <Points items={['Each repeated block contributes exactly two 0s.', 'The expression includes ε and all-1 strings.', 'Test boundaries before trusting a regex.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-example-substring', kicker: 'Example', title: 'Contains 101 vs avoids 101', subtitle: 'Existence is easier than exclusion', content: (
    <Deck active={1} story={story} composition="toc-comp-tree" visual={<LivingDfa input={['0', '1', '0', '1']} active="q2" litEdge="01" result="Accept" />} takeaway="A required substring is Σ* pattern Σ*; avoidance is often easier as a DFA.">
      <Compare leftTitle="Contains 101" rightTitle="Avoids 101" left={['(0+1)*101(0+1)*', 'One witness is enough']} right={['Track longest matched prefix', 'Convert resulting DFA to regex if required']} foot="Choose the representation that makes the constraint visible." />
    </Deck>
  ) }),
  slide({ id: 'm2-identities', kicker: 'Algebra', title: 'Simplify without changing the language', subtitle: 'Regex identities', content: (
    <Deck active={1} story={story} composition="toc-comp-radial" visual={<ChipFlow items={['r+∅=r', 'rε=r', 'r+r=r', '∅r=∅', '(r*)*=r*']} />} takeaway="Algebra shortens later automata constructions.">
      <Points items={['Union is associative, commutative, and idempotent.', 'Concatenation is associative but generally not commutative.', 'Concatenation distributes over union.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-precedence', kicker: 'Reading', title: 'Precedence prevents silent mistakes', subtitle: 'Star before concatenation before union', content: (
    <Deck active={1} story={story} composition="toc-comp-compare" visual={<Compare leftTitle="Written" rightTitle="Parsed as" left={['ab*+c', '(a+b)*', 'a(b+c)']} right={['(a(b*))+c', 'star over the union', 'explicit grouping']} foot="Parenthesize whenever the intended language could be doubted." />} takeaway="Parsing a regex correctly is the first exam step.">
      <Example label="Quick check">ab* contains a, ab, abb…; it does not mean (ab)*.</Example>
    </Deck>
  ) }),
  slide({ id: 'm2-divider-convert', kicker: 'Chapter', title: 'Regex and automata', layout: 'full', hideTitle: true, content: (
    <Divider number="02" title="Two currencies, one language" subtitle="Thompson · subset construction · elimination · Arden" visual={<LivingNfa />} />
  ) }),
  slide({ id: 'm2-thompson-base', kicker: 'Thompson', title: 'The two base gadgets', subtitle: 'Start small, compose safely', content: (
    <Deck active={2} story={story} composition="toc-comp-quiet" visual={<EpsilonClosureViz />} takeaway="Every fragment has one entry and one exit.">
      <Points items={['Symbol a: one a-labelled edge from entry to exit.', 'ε: one ε-edge; ∅: no path from entry to exit.', 'Fresh states prevent accidental paths during composition.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-thompson-union', kicker: 'Thompson', title: 'Union adds a fork and a join', subtitle: 'r+s', content: (
    <Deck active={2} story={story} composition="toc-comp-minimal" visual={<LivingNfa />} takeaway="ε chooses either fragment; acceptance rejoins at one exit.">
      <Hook>The machine guesses which alternative will explain the input.</Hook>
      <Points items={['New start ε→ start(r), start(s).', 'exit(r), exit(s) ε→ new final.', 'No input is consumed by the choice itself.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-thompson-concat', kicker: 'Thompson', title: 'Concatenation welds fragments', subtitle: 'rs', content: (
    <Deck active={2} story={story} composition="toc-comp-hero" visual={<EpsilonClosureViz />} takeaway="Finish r, take a free ε-bridge, then run s.">
      <Points items={['Connect exit(r) ε→ start(s).', 'Entry is start(r); exit is exit(s).', 'Order matters: L(r)L(s) need not equal L(s)L(r).']} />
    </Deck>
  ) }),
  slide({ id: 'm2-thompson-star', kicker: 'Thompson', title: 'Star creates loop, skip, and return', subtitle: 'r* includes zero repetitions', content: (
    <Deck active={2} story={story} composition="toc-comp-blueprint" visual={<EpsilonClosureViz />} takeaway="Four ε-links encode skip, enter, repeat, and leave.">
      <Points items={['New start ε→ new final handles zero copies.', 'New start ε→ r enters one copy.', 'exit(r) ε→ start(r) repeats; ε→ final leaves.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-thompson-worked', kicker: 'Worked scene', title: 'Build (a+b)*ab one layer at a time', subtitle: 'Operator tree drives construction', content: (
    <Deck active={2} story={story} composition="toc-comp-visual-first" visual={<LivingNfa />} takeaway="Construct leaves, combine union, wrap star, then concatenate a and b.">
      <ChipFlow items={['a,b fragments', 'a+b fork', '(a+b)* loop', 'append a', 'append b', 'ε-NFA']} />
      <Example label="Sanity test">ab and aab are accepted; ε and ba are rejected.</Example>
    </Deck>
  ) }),
  slide({ id: 'm2-determinize', kicker: 'Determinize', title: 'The ε-NFA becomes a DFA', subtitle: 'Closures first, then moves', content: (
    <Deck active={2} story={story} composition="toc-comp-reverse" visual={<SubsetConstructionViz />} takeaway="Each reachable set of NFA states becomes one DFA state.">
      <Points items={['Start state = ε-closure({q0}).', 'On a: move the set on a, then take ε-closure.', 'A subset is accepting if it contains any NFA final state.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-state-elimination', kicker: 'Reverse bridge', title: 'DFA to regex by state elimination', subtitle: 'Collapse the railway', content: (
    <Deck active={2} story={story} composition="toc-comp-timeline" visual={<LivingDfa input={['0', '1']} active="q2" result="Accept" litEdge="01" />} takeaway="Eliminating k adds Rij + Rik(Rkk)*Rkj to every surviving route.">
      <Points items={['Create one new start and one new final.', 'Label absent edges ∅; combine parallel edges by union.', 'Eliminate intermediate states until one regex-labelled edge remains.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-arden', kicker: 'Equation method', title: "Arden's lemma solves language equations", subtitle: 'A useful proof and conversion hint', content: (
    <Deck active={2} story={story} composition="toc-comp-tree" visual={<RegexWeave />} takeaway="If X = Q + XP and ε∉L(P), then X = QP*.">
      <Definition term="Arden's lemma">For language equations R = Q + RP, the unique solution is R = QP* when ε is not in P.</Definition>
      <Example label="Tiny solve">X = a + Xb gives X = ab*.</Example>
    </Deck>
  ) }),
  slide({ id: 'm2-apps', kicker: 'Applications', title: 'Patterns become production tools', subtitle: 'Lexers, search, validation', content: (
    <Deck active={2} story={story} composition="toc-comp-radial" visual={<RegexWeave />} takeaway="Lexer generators compile token regex into efficient DFA tables.">
      <Points items={['Compiler tokens: identifier, number, keyword.', 'Search and input validation.', 'Protocol fields and simple event monitors.']} />
      <Example label="Boundary">Nested parentheses are not regular; regex alone has no unbounded stack.</Example>
    </Deck>
  ) }),
  slide({ id: 'm2-divider-limits', kicker: 'Chapter', title: 'Limits and closure', layout: 'full', hideTitle: true, content: (
    <Divider number="03" title="Finite memory leaves fingerprints" subtitle="Pumping arguments and closure constructions" visual={<LivingDfaRun />} />
  ) }),
  slide({ id: 'm2-pumping-def', kicker: 'Proof tool', title: 'A long regular string must loop', subtitle: 'The pumping lemma', content: (
    <Deck active={3} story={story} composition="toc-comp-compare" visual={<LivingDfa input={['0', '0', '0', '1']} active="q1" litEdge="0" />} takeaway="For w=xyz: |xy|≤p, |y|≥1, and xy^iz∈L for every i≥0.">
      <Definition term="Regular pumping lemma">If L is regular, some p guarantees every w∈L with |w|≥p has a pumpable nonempty loop y among its first p symbols.</Definition>
      <Hook>It is a necessary condition for regularity, not a general way to prove regularity.</Hook>
    </Deck>
  ) }),
  slide({ id: 'm2-pumping-anbn', kicker: 'Counterexample', title: "Why {0ⁿ1ⁿ} cannot be regular", subtitle: 'Adversarial decomposition', content: (
    <Deck active={3} story={story} composition="toc-comp-quiet" visual={<LivingDfa input={['0', '0', '1', '1']} active="q1" litEdge="0" />} takeaway="Because |xy|≤p, y contains only 0s; pumping changes zeros without changing ones.">
      <ChipFlow items={['Assume regular', 'choose 0ᵖ1ᵖ', 'y=0ᵏ, k≥1', 'pump i=0', '0ᵖ⁻ᵏ1ᵖ∉L', 'contradiction']} />
    </Deck>
  ) }),
  slide({ id: 'm2-pumping-more', kicker: 'Practice', title: 'Two more pumping patterns', subtitle: 'Choose the witness to trap y', content: (
    <Deck active={3} story={story} composition="toc-comp-minimal" visual={<RegexWeave />} takeaway="A strong witness makes every legal split fail.">
      <Compare leftTitle="Nonregular" rightTitle="Regular control case" left={['{ww | w∈{0,1}*}: duplicated content', '{0ⁿ | n is prime}: pumping creates composite lengths']} right={['Even number of 0s: two-state DFA', 'Finite languages: always regular']} foot="Never choose y yourself; defeat all y allowed by the lemma." />
    </Deck>
  ) }),
  slide({ id: 'm2-closure', kicker: 'Algebra', title: 'Regular languages survive every standard operation', subtitle: 'Name the witness construction', content: (
    <Deck active={3} story={story} composition="toc-comp-hero" visual={<SubsetConstructionViz />} takeaway="Closure proofs are algorithms for building a recognizer.">
      <Points items={['Union/intersection: product automaton; complement: complete DFA then swap finals.', 'Concatenation/star: ε-NFA wiring.', 'Reverse: reverse edges and exchange start/finals; determinize if needed.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-divider-canonical', kicker: 'Chapter', title: 'Equivalence and minimization', layout: 'full', hideTitle: true, content: (
    <Divider number="04" title="Find the canonical recognizer" subtitle="Compare futures · distinguish states · merge twins" visual={<MinimizationMerge />} />
  ) }),
  slide({ id: 'm2-equivalence-table', kicker: 'Exam table', title: 'Equivalent representations, different jobs', subtitle: 'Know what each form exposes', content: (
    <Deck active={4} story={story} composition="toc-comp-blueprint" visual={<Compare leftTitle="Representation" rightTitle="Best use" left={['Regex', 'ε-NFA / NFA', 'DFA', 'Minimal DFA']} right={['Compact description', 'Easy composition', 'Fast deterministic run', 'Canonical comparison']} foot="RE ⇔ ε-NFA ⇔ NFA ⇔ DFA: exactly the regular languages." />} takeaway="Conversions preserve language, not necessarily size.">
      <Points items={['NFA→DFA may create up to 2ⁿ states.', 'Minimization removes unreachable and equivalent states.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-equivalence-product', kicker: 'Decision', title: 'Do two DFAs accept the same language?', subtitle: 'Search their symmetric difference', content: (
    <Deck active={5} story={story} composition="toc-comp-visual-first" visual={<SubsetConstructionViz />} takeaway="A reachable pair where exactly one component accepts is a counterexample.">
      <Points items={['Build states (p,q) and move both components on each symbol.', 'Mark XOR-final pairs as conflict states.', 'No reachable conflict means equivalent; a path to one gives a distinguishing string.']} />
    </Deck>
  ) }),
  slide({ id: 'm2-myhill-nerode', kicker: 'Deep intuition', title: 'Myhill–Nerode: states are distinct futures', subtitle: 'Prefixes grouped by what can still happen', content: (
    <Deck active={4} story={story} composition="toc-comp-reverse" visual={<MinimizationMerge />} takeaway="A language is regular exactly when it has finitely many distinguishable future classes.">
      <Definition term="Indistinguishable prefixes">x ≡L y when, for every suffix z, xz∈L iff yz∈L.</Definition>
      <Example label="Ends in 01">Prefixes need only remember: no useful suffix, last symbol 0, or suffix 01.</Example>
    </Deck>
  ) }),
  slide({ id: 'm2-minimization', kicker: 'Worked method', title: 'Partition refinement finds the minimal DFA', subtitle: 'Split until behavior stabilizes', content: (
    <Deck active={4} story={story} composition="toc-comp-timeline" visual={<MinimizationMerge />} takeaway="The stable blocks are exactly the states of the unique minimal DFA, up to renaming.">
      <ChipFlow items={['remove unreachable', 'split F / Q−F', 'refine by transitions', 'repeat to stability', 'merge each block', 'draw quotient DFA']} />
      <Example label="Table-filling alternative">Mark final/nonfinal pairs, propagate marks backward, merge every unmarked pair.</Example>
    </Deck>
  ) }),
  slide({ id: 'm2-recap', kicker: 'Recap', title: 'Patterns became canonical machines', subtitle: 'Module 2 in one glance', content: (
    <Deck active={5} story={story} composition="toc-comp-tree" visual={<RegexWeave />} takeaway="Describe → convert → test limits → compare → minimize.">
      <ChipFlow items={['Regex', 'Thompson', 'DFA', 'Pumping', 'Closure', '≡L', 'Minimal DFA']} />
      <div className="toc-chip-flow">
        <Link to="/theory-of-computation/module-2/notes"><BookOpen {...icon} /> Notes</Link>
        <Link to="/theory-of-computation/module-2/previous-year-questions"><FileQuestion {...icon} /> PYQs</Link>
        <span><Sparkles {...icon} /> Living patterns</span>
      </div>
    </Deck>
  ) }),
]

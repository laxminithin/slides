/**
 * TOC V2.0 — Module 3 Masterpiece
 * Context-Free Grammars and Pushdown Automata
 */
import { BookOpen, FileQuestion, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  ChipFlow, Compare, Deck, Definition, Divider, Example, Hook, OpeningShell, Points, slide,
} from './components/TocKit'
import { OpeningM3 } from './components/TocOpenings'
import { DerivationTrail, LivingAmbiguity, LivingParseTree, LivingPda } from './components/TocViz'

const story = ['Sentence', 'Grammar', 'Derive', 'Stack', 'Push/Pop', 'Accept']
const icon = { size: 22, strokeWidth: 1.8, 'aria-hidden': true }

export const theoryOfComputationModule3Slides = [
  slide({ id: 'm3-opening', kicker: 'Opening', title: 'PUSHDOWN AUTOMATA', subtitle: 'Module 3 — Memory changes everything', layout: 'full', hideTitle: true, content: (
    <OpeningShell scene={<OpeningM3 />} moduleLabel="VTU — Module 3" title="STACK MEMORY" subtitle="Input arrives · stack grows · decisions deepen" />
  ) }),
  slide({ id: 'm3-why', kicker: 'The problem', title: 'How do we recognize balanced structure?', subtitle: "Finite memory is not enough", content: (
    <Deck active={0} story={story} composition="toc-comp-hero" visual={<LivingPda input={['(', '(', ')', ')']} cursor={0} stack={['Z']} stage="idle" />} takeaway="A stack remembers an unbounded number of pending obligations.">
      <Hook>A DFA knows where it is. A PDA also remembers what must be matched later.</Hook>
      <Points items={['Push an opening symbol.', 'Pop when its partner arrives.', 'Reject if the stack and input disagree.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-divider-cfg', kicker: 'Chapter', title: 'Context-free grammars', layout: 'full', hideTitle: true, content: (
    <Divider number="01" title="Blueprints for recursive structure" subtitle="Variables expand until only terminals remain" visual={<LivingParseTree />} />
  ) }),
  slide({ id: 'm3-cfg-tuple', kicker: 'Definition', title: 'A grammar is a four-part generator', subtitle: 'G = (V, T, P, S)', content: (
    <Deck active={1} story={story} composition="toc-comp-blueprint" visual={<LivingParseTree />} takeaway="Context-free means one variable appears on the left of each production.">
      <Definition term="Context-free grammar">G=(V,T,P,S), where V is a finite variable set, T terminals, P productions A→α, and S the start variable.</Definition>
      <Points items={['V and T are disjoint.', 'α may contain variables, terminals, or ε.', 'L(G) contains terminal strings derivable from S.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-cfg-balanced', kicker: 'Grammar example', title: 'Balanced parentheses are recursive', subtitle: 'Structure nested inside structure', content: (
    <Deck active={1} story={story} composition="toc-comp-visual-first" visual={<LivingParseTree />} takeaway="A grammar can grow nesting and concatenation without a fixed depth.">
      <Example label="Grammar">S → (S)S | ε</Example>
      <Points items={['(S) adds one matched outer pair.', 'The trailing S concatenates another balanced block.', 'ε closes every recursive branch.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-cfg-anbn', kicker: 'Grammar example', title: 'Generate equal counts: aⁿbⁿ', subtitle: 'One a now creates one b later', content: (
    <Deck active={1} story={story} composition="toc-comp-reverse" visual={<DerivationTrail side="left" />} takeaway="Recursion records a deferred terminal on the far side.">
      <Example label="Grammar">S → aSb | ε</Example>
      <ChipFlow items={['S', 'aSb', 'aaSbb', 'aaaSbbb', 'aaabbb']} />
    </Deck>
  ) }),
  slide({ id: 'm3-cfg-palindrome', kicker: 'Grammar example', title: 'The center-out pattern generates palindromes', subtitle: 'Mirror symbols around a smaller palindrome', content: (
    <Deck active={1} story={story} composition="toc-comp-timeline" visual={<LivingParseTree />} takeaway="Recursive grammar rules often reveal the invariant directly.">
      <Example label="Binary palindromes">S → 0S0 | 1S1 | 0 | 1 | ε</Example>
      <Points items={['Even strings terminate with ε.', 'Odd strings terminate with one terminal.', 'Each recursive step preserves mirror symmetry.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-sentential-forms', kicker: 'Derivation', title: 'A derivation is a controlled rewrite trail', subtitle: '⇒ for one step, ⇒* for many', content: (
    <Deck active={2} story={story} composition="toc-comp-tree" visual={<DerivationTrail side="left" />} takeaway="Intermediate strings may mix terminals and variables; the final sentence has terminals only.">
      <Definition term="Sentential form">Any α∈(V∪T)* such that S⇒*α.</Definition>
      <Example label="Sentence">If α∈T*, it is a sentence in L(G).</Example>
    </Deck>
  ) }),
  slide({ id: 'm3-leftmost', kicker: 'Leftmost derivation', title: 'Always expand the leftmost variable', subtitle: 'A deterministic narration of a grammar', content: (
    <Deck active={2} story={story} composition="toc-comp-radial" visual={<DerivationTrail side="left" />} takeaway="Leftmost derivations are the convention behind top-down parsing.">
      <ChipFlow items={['E', 'E+T', 'T+T', 'id+T', 'id+id']} />
      <Points items={['Write ⇒lm between steps.', 'Only the selected variable changes at each step.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-rightmost', kicker: 'Rightmost derivation', title: 'Now expand the rightmost variable', subtitle: 'Same grammar, opposite frontier', content: (
    <Deck active={2} story={story} composition="toc-comp-compare" visual={<DerivationTrail side="right" />} takeaway="A parse tree can be narrated leftmost or rightmost without changing its yield.">
      <Compare leftTitle="Leftmost" rightTitle="Rightmost" left={['Expand first variable', 'Top-down parser intuition']} right={['Expand last variable', 'Reverse of bottom-up parser intuition']} foot="Different orders need not mean different parse trees." />
    </Deck>
  ) }),
  slide({ id: 'm3-parse-tree', kicker: 'Structure', title: 'The parse tree remembers more than the string', subtitle: 'Derivation history becomes geometry', content: (
    <Deck active={2} story={story} composition="toc-comp-quiet" visual={<LivingParseTree />} takeaway="Root is S; internal nodes are variables; leaves left-to-right form the yield.">
      <Points items={['Children match the RHS of the production used.', 'A tree ignores the order in which independent variables were expanded.', 'Tree shape captures grouping and meaning.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-ambiguity', kicker: 'Danger', title: 'One string, two trees', subtitle: 'Ambiguity changes meaning', content: (
    <Deck active={2} story={story} composition="toc-comp-minimal" visual={<LivingAmbiguity />} takeaway="A grammar is ambiguous when some string has two distinct parse trees.">
      <Definition term="Ambiguous CFG">A CFG with a string having two distinct leftmost derivations, equivalently two parse trees.</Definition>
      <Example label="Expression grammar">E → E+E | E*E | id gives two structures for id+id*id.</Example>
    </Deck>
  ) }),
  slide({ id: 'm3-disambiguate', kicker: 'Grammar design', title: 'Encode precedence and associativity in variables', subtitle: 'Remove ambiguity by architecture', content: (
    <Deck active={2} story={story} composition="toc-comp-hero" visual={<LivingParseTree />} takeaway="Separate expression levels so the grammar itself enforces precedence.">
      <Example label="Unambiguous pattern">E→E+T|T; T→T*F|F; F→(E)|id</Example>
      <Points items={['Multiplication is nested below addition.', 'Left recursion enforces left associativity here.', 'Not every CFL has an unambiguous grammar.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-divider-pda', kicker: 'Chapter', title: 'Pushdown automata', layout: 'full', hideTitle: true, content: (
    <Divider number="02" title="Finite control meets a stack" subtitle="Read input · inspect top · replace top" visual={<LivingPda stack={['Z', '(', '(']} cursor={1} stage="push" />} />
  ) }),
  slide({ id: 'm3-pda-formal', kicker: 'Definition', title: 'A PDA is an NFA with stack memory', subtitle: 'Seven components, one extra alphabet', content: (
    <Deck active={3} story={story} composition="toc-comp-blueprint" visual={<LivingPda stage="idle" stack={['Z']} />} takeaway="δ depends on state, input or ε, and the current stack top.">
      <Definition term="Pushdown automaton">{"M=(Q,Σ,Γ,δ,q0,Z0,F), with δ: Q×(Σ∪{ε})×Γ → finite subsets of Q×Γ*."}</Definition>
      <Points items={['Γ is the stack alphabet.', 'Replacing top by ε pops; by XA effectively pushes X.', 'Nondeterministic choices are allowed.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-transition-labels', kicker: 'Notation', title: 'Read transition labels as actions', subtitle: 'input, top → replacement', content: (
    <Deck active={3} story={story} composition="toc-comp-visual-first" visual={<LivingPda input={['a', 'b']} cursor={0} stack={['Z']} stage="push" />} takeaway="A PDA transition simultaneously reads, checks, and updates.">
      <Example label="Label">a, Z → AZ means consume a, pop Z, then push AZ.</Example>
      <Points items={['ε, A→ε pops without consuming input.', 'b, A→A consumes b but preserves the top.', 'A move is legal only when its input/top requirements match.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-push-demo', kicker: 'Execution', title: 'Phase 1: push while counting a symbols', subtitle: 'Build the obligation stack', content: (
    <Deck active={4} story={story} composition="toc-comp-reverse" visual={<LivingPda input={['a', 'a', 'b', 'b']} cursor={1} stack={['Z', 'A', 'A']} stage="push" />} takeaway="Each a leaves one A marker to be paid by a future b.">
      <ChipFlow items={['aa bb', 'read a / push A', 'read a / push A', 'stack ZAA']} />
    </Deck>
  ) }),
  slide({ id: 'm3-pop-demo', kicker: 'Execution', title: 'Phase 2: pop while matching b symbols', subtitle: 'Spend exactly one marker per b', content: (
    <Deck active={4} story={story} composition="toc-comp-timeline" visual={<LivingPda input={['a', 'a', 'b', 'b']} cursor={2} stack={['Z', 'A']} stage="pop" />} takeaway="Too many or too few b symbols expose a mismatch.">
      <Points items={['The first b nondeterministically or structurally switches phase.', 'Every b must see A on top and pop it.', 'Input ends exactly when the bottom marker is exposed.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-empty-stack-demo', kicker: 'Acceptance scene', title: 'Acceptance by empty stack, step by step', subtitle: 'No final state is required', content: (
    <Deck active={5} story={story} composition="toc-comp-tree" visual={<LivingPda input={['a', 'a', 'b', 'b']} cursor={4} stack={[]} stage="accept" />} takeaway="Consume all input and remove the bottom marker: the stack is truly empty.">
      <ChipFlow items={['(q,aabb,Z)', '(q,abb,AZ)', '(q,bb,AAZ)', '(q,b,AZ)', '(q,ε,Z)', '(q,ε,ε)']} />
      <Definition term="Empty-stack acceptance">w is accepted if (q0,w,Z0) ⊢* (q,ε,ε) for some q.</Definition>
    </Deck>
  ) }),
  slide({ id: 'm3-final-state-demo', kicker: 'Acceptance', title: 'Final state and empty stack have equal power', subtitle: 'But their constructions differ', content: (
    <Deck active={5} story={story} composition="toc-comp-radial" visual={<LivingPda input={['(', ')']} cursor={2} stack={['Z']} stage="accept" />} takeaway="For NPDAs, both acceptance conventions characterize exactly the CFLs.">
      <Compare leftTitle="Final state" rightTitle="Empty stack" left={['All input consumed', 'State belongs to F', 'Stack may remain']} right={['All input consumed', 'Stack becomes empty', 'State unrestricted']} foot="Convert using a fresh start, protected bottom marker, and controlled cleanup." />
    </Deck>
  ) }),
  slide({ id: 'm3-pda-languages', kicker: 'Examples', title: 'What one stack can recognize', subtitle: 'Last-in, first-out structure', content: (
    <Deck active={3} story={story} composition="toc-comp-compare" visual={<LivingPda input={['0', '1', '1', '0']} cursor={2} stack={['Z', '0']} stage="pop" />} takeaway="A stack excels when later input reverses or discharges earlier obligations.">
      <Points items={['{aⁿbⁿ}: push a markers, pop on b.', 'Balanced parentheses: push opens, pop closes.', 'Palindromes: guess midpoint, then match in reverse.']} />
      <Example label="Limit intuition">One stack cannot independently compare aⁿbⁿcⁿ.</Example>
    </Deck>
  ) }),
  slide({ id: 'm3-divider-equivalence', kicker: 'Chapter', title: 'CFG and PDA equivalence', layout: 'full', hideTitle: true, content: (
    <Divider number="03" title="Generate or recognize" subtitle="Two views of exactly the context-free languages" visual={<LivingParseTree />} />
  ) }),
  slide({ id: 'm3-cfg-to-pda-idea', kicker: 'Construction', title: 'CFG → PDA: simulate a leftmost derivation', subtitle: 'Variables expand on the stack', content: (
    <Deck active={5} story={story} composition="toc-comp-quiet" visual={<LivingPda input={['a', 'a', 'b', 'b']} cursor={0} stack={['Z', 'S']} stage="push" />} takeaway="The PDA guesses productions and checks terminals against the input.">
      <Hook>The stack is the unfinished sentential form.</Hook>
      <Points items={['Initialize by pushing S above a bottom marker.', 'If variable A is on top, choose A→α and replace A by α.', 'If terminal a is on top and next input is a, pop and consume.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-cfg-to-pda-steps', kicker: 'Worked bridge', title: 'Run S→aSb | ε on aabb', subtitle: 'Prediction alternates with matching', content: (
    <Deck active={5} story={story} composition="toc-comp-minimal" visual={<LivingPda input={['a', 'a', 'b', 'b']} cursor={2} stack={['Z', 'b', 'b']} stage="pop" />} takeaway="Production choices build exactly the obligations later matched by terminals.">
      <ChipFlow items={['push S', 'S⇒aSb', 'match a', 'S⇒aSb', 'match a', 'S⇒ε', 'match bb', 'empty']} />
    </Deck>
  ) }),
  slide({ id: 'm3-pda-to-cfg', kicker: 'Reverse bridge', title: 'PDA → CFG encodes state-to-state stack work', subtitle: 'Variables summarize computations', content: (
    <Deck active={5} story={story} composition="toc-comp-hero" visual={<LivingParseTree />} takeaway="A variable [pAq] denotes strings that remove A while moving from p to q.">
      <Points items={['Normalize the PDA so transitions push or pop in controlled form.', 'Create variables indexed by start state, stack symbol, and end state.', 'Productions compose matching push/pop segments through intermediate states.']} />
      <Example label="Exam expectation">Explain the invariant and construction shape; avoid treating it as magic.</Example>
    </Deck>
  ) }),
  slide({ id: 'm3-dpda-definition', kicker: 'Determinism', title: 'A DPDA never has two legal next moves', subtitle: 'Input moves and ε-moves must not compete', content: (
    <Deck active={5} story={story} composition="toc-comp-blueprint" visual={<LivingPda input={['a', 'a', 'b', 'b']} cursor={1} stack={['Z', 'A']} stage="push" />} takeaway="Deterministic context-free languages form a strict subset of CFLs.">
      <Definition term="DPDA condition">For each state and stack top, at most one move is enabled; if an ε-input move exists, no consuming move may compete there.</Definition>
    </Deck>
  ) }),
  slide({ id: 'm3-dpda-npda', kicker: 'Deep compare', title: 'DPDA vs NPDA: where the guess matters', subtitle: 'Midpoints expose nondeterminism', content: (
    <Deck active={5} story={story} composition="toc-comp-visual-first" visual={<Compare leftTitle="DPDA" rightTitle="NPDA" left={['One computation path', 'Good for marked midpoint wcwᴿ', 'Closed under complement']} right={['May branch', 'Can guess midpoint in wwᴿ', 'All CFLs']} foot="DPDA languages ⊊ NPDA languages = CFL." />} takeaway="A separator symbol can turn a guess into a deterministic phase change.">
      <Points items={['{wcwᴿ} is deterministic: c announces the midpoint.', '{wwᴿ} needs a midpoint guess and is CFL but not deterministic CFL.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-parser-bridge', kicker: 'Application', title: 'Parsers engineer determinism', subtitle: 'From grammar to predictable stack actions', content: (
    <Deck active={5} story={story} composition="toc-comp-reverse" visual={<DerivationTrail side="right" />} takeaway="LL and LR methods restrict or transform grammars to avoid runtime guessing.">
      <Points items={['Top-down parsing predicts productions.', 'Bottom-up parsing recognizes handles and reduces.', 'Ambiguity, left recursion, and common prefixes affect parser design.']} />
    </Deck>
  ) }),
  slide({ id: 'm3-recap', kicker: 'Recap', title: 'Memory made recursive structure recognizable', subtitle: 'Module 3 close', content: (
    <Deck active={5} story={story} composition="toc-comp-timeline" visual={<LivingPda stack={['Z']} cursor={4} input={['(', '(', ')', ')']} stage="accept" />} takeaway="CFGs generate; PDAs recognize; derivations and stack traces explain why.">
      <ChipFlow items={['CFG', '⇒lm', '⇒rm', 'Parse tree', 'NPDA', 'Empty stack', 'DPDA']} />
      <div className="toc-chip-flow">
        <Link to="/theory-of-computation/module-3/notes"><BookOpen {...icon} /> Notes</Link>
        <Link to="/theory-of-computation/module-3/previous-year-questions"><FileQuestion {...icon} /> PYQs</Link>
        <span><Sparkles {...icon} /> Living stack</span>
      </div>
    </Deck>
  ) }),
]

import {
  DefinitionBlock,
  Lead,
  Points,
  ProcessPath,
  Takeaway,
  TwoColumn,
  VisualFirst,
  VisualPanel,
} from './components/Teaching'

const sigma = 'Σ'
const epsilon = 'ε'

function Formula({ children }) {
  return <div className="toc-formula">{children}</div>
}

function ChipGrid({ items }) {
  return (
    <div className="toc-chip-grid">
      {items.map((item) => <span key={item}>{item}</span>)}
    </div>
  )
}

function SymbolJoin() {
  return (
    <div className="toc-symbol-join" aria-label="Characters joining to form a string">
      {['0', '0', '1', '0'].map((symbol, index) => <span key={`${symbol}-${index}`}>{symbol}</span>)}
      <strong>w = 0010</strong>
    </div>
  )
}

function LanguageVenn() {
  return (
    <div className="toc-language-venn">
      <div className="toc-sigma-star">{sigma}*</div>
      <div className="toc-language-set">L</div>
      {['ε', '0', '1', '00', '01', '10', '11', '101'].map((item, index) => (
        <span key={item} className={`p${index + 1}`}>{item}</span>
      ))}
    </div>
  )
}

function MiniDfa({ states = ['q0', 'q1'], finals = ['q1'], labels = ['a', 'b'], trap = false }) {
  return (
    <div className={`toc-mini-dfa ${trap ? 'with-trap' : ''}`}>
      <span className="toc-start-arrow">start</span>
      {states.map((state) => (
        <div key={state} className={`toc-state ${finals.includes(state) ? 'final' : ''}`}>{state}</div>
      ))}
      <div className="toc-transition t1">{labels[0]}</div>
      <div className="toc-transition t2">{labels[1]}</div>
      {trap && <div className="toc-trap-note">trap catches impossible prefixes</div>}
    </div>
  )
}

function TransitionTable({ headers = ['State', '0', '1'], rows }) {
  return (
    <table className="toc-table">
      <thead>
        <tr>{headers.map((head) => <th key={head}>{head}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.join('-')}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>
        ))}
      </tbody>
    </table>
  )
}

function AutomatonFlow({ result = 'Accept / Reject' }) {
  return (
    <div className="toc-automaton-flow">
      <span>Input string</span>
      <strong>Finite Automaton</strong>
      <span>{result}</span>
    </div>
  )
}

function ProductGrid({ final = 'EE' }) {
  return (
    <div className="toc-product-grid">
      {['EE', 'EO', 'OE', 'OO'].map((state) => (
        <span key={state} className={state === final ? 'final' : ''}>{state}</span>
      ))}
    </div>
  )
}

function PatternStates({ pattern }) {
  return (
    <div className="toc-pattern-states">
      {['q0', ...pattern.split('').map((_, index) => `q${index + 1}`)].map((state, index, items) => (
        <div key={state} className={index === items.length - 1 ? 'final' : ''}>
          <span>{state}</span>
          {index < items.length - 1 && <b>{pattern[index]}</b>}
        </div>
      ))}
    </div>
  )
}

function SubsetBuild() {
  return (
    <div className="toc-subset-build">
      {['{q0}', '{q0,q1}', '{q2}', '{q1,q2}', '∅'].map((set, index) => (
        <span key={set} style={{ '--i': index }}>{set}</span>
      ))}
    </div>
  )
}

function EpsilonClosureViz() {
  return (
    <div className="toc-epsilon-viz">
      <span>q0</span><b>ε</b><span>q1</span><b>ε</b><span>q2</span>
      <strong>ε-closure(q0) = {`{q0, q1, q2}`}</strong>
    </div>
  )
}

function slide(id, kicker, title, content, extra = {}) {
  return { id, kicker, title, content, ...extra }
}

export const theoryOfComputationModule1Slides = [
  slide('title', 'Theory of Computation', null, (
    <div className="title-hero toc-title-hero">
      <div>
        <p className="slide-kicker" style={{ marginBottom: 12 }}>THEORY OF COMPUTATION</p>
        <h1>Module 01</h1>
        <p className="subtitle">Introduction to Automata Theory and Finite Automata</p>
        <p className="lead" style={{ marginTop: 16 }}>From symbols and languages to DFA, NFA, epsilon-NFA and equivalent automata.</p>
        <div className="badge-row">
          <span className="pill">Automata Theory</span>
          <span className="pill">Formal Languages</span>
          <span className="pill">Finite Automata</span>
        </div>
      </div>
      <div className="layout-visual"><MiniDfa states={['q0', 'q1', 'q2']} finals={['q2']} labels={['0', '1']} /></div>
    </div>
  ), { hideTitle: true, layout: 'full' }),
  slide('journey', 'Module Learning Journey', 'Symbols to Equivalent Automata', (
    <VisualFirst
      lead="Module 1 builds the mathematical vocabulary first, then turns languages into machines."
      visual={<ProcessPath steps={['Symbols', 'Strings', 'Languages', 'Problems', 'DFA', 'NFA', 'ε-NFA', 'Equivalent Automata']} />}
      takeaway={<Takeaway>Every automaton in this module answers one question: should this input string be accepted?</Takeaway>}
    />
  )),
  slide('why-toc', 'Motivation', 'Why Theory of Computation?', (
    <TwoColumn visual={<AutomatonFlow />} ratio="copy-visual">
      <Lead>Computers accept some inputs and reject others. Theory of Computation gives us a clean language for that behavior.</Lead>
      <Points items={['Login validation checks whether a password format is valid', 'Pattern recognition checks whether a string has a required form', 'Protocol verification checks legal sequences of messages', 'Compiler token recognition checks identifiers, keywords and numbers']} />
    </TwoColumn>
  )),
  slide('what-automata', 'Big Idea', 'What Is Automata Theory?', (
    <TwoColumn visual={<VisualPanel label="Abstract machine"><MiniDfa states={['q0', 'q1']} finals={['q1']} labels={['read', 'decide']} /></VisualPanel>}>
      <DefinitionBlock>Automata theory studies abstract machines and the formal languages recognized by those machines.</DefinitionBlock>
      <Points items={['The machine has a finite description', 'The input is a finite string of symbols', 'The output is a decision: accept or reject', 'The design ignores hardware details and focuses on logic']} />
    </TwoColumn>
  )),
  slide('alphabet', 'Section 02', 'Alphabet', (
    <TwoColumn visual={<ChipGrid items={['Σ = {0,1}', 'Σ = {a,b,c}', 'Σ = {0,1,2,...,9}']} />}>
      <DefinitionBlock>An alphabet is a finite, non-empty set of symbols.</DefinitionBlock>
      <Takeaway label="Notation">The Greek letter Σ is commonly used to denote an alphabet.</Takeaway>
    </TwoColumn>
  )),
  slide('string', 'Core Term', 'String or Word', (
    <TwoColumn visual={<SymbolJoin />}>
      <DefinitionBlock>A string, also called a word, is a finite sequence of symbols selected from an alphabet.</DefinitionBlock>
      <Points items={['If Σ = {0,1}, then 0010 is a string over Σ', 'The order of symbols matters', 'A string can contain repeated symbols']} />
    </TwoColumn>
  ) ),
  slide('length', 'String Measure', 'Length of a String', (
    <VisualFirst
      lead="The length of a string is the number of symbols in it."
      visual={<Formula>w = 0010 &nbsp;&nbsp; |w| = 4</Formula>}
      takeaway={<Takeaway>Length counts positions, not the numeric value represented by the symbols.</Takeaway>}
    />
  )),
  slide('empty-string', 'Special String', 'Empty String', (
    <TwoColumn visual={<Formula>{epsilon}<br />|{epsilon}| = 0</Formula>}>
      <DefinitionBlock>The empty string ε is the string with zero symbols.</DefinitionBlock>
      <Points items={['ε is a string', 'Its length is zero', 'ε is not the same as the empty language ∅']} />
    </TwoColumn>
  )),
  slide('alphabet-powers', 'Generation', 'Powers of an Alphabet', (
    <TwoColumn visual={<ChipGrid items={['Σ⁰ = {ε}', 'Σ¹ = {0,1}', 'Σ² = {00,01,10,11}', 'Σ³ = all length-3 strings']} />}>
      <Lead>Σⁿ is the set of all strings of length n over alphabet Σ.</Lead>
      <Formula>If Σ = {'{0,1}'}, then Σ² has 2² strings.</Formula>
    </TwoColumn>
  )),
  slide('kleene-star', 'Language Builder', 'Kleene Star', (
    <TwoColumn visual={<LanguageVenn />}>
      <DefinitionBlock>Σ* is the set of all possible finite strings over Σ, including ε.</DefinitionBlock>
      <Formula>Σ* = Σ⁰ ∪ Σ¹ ∪ Σ² ∪ ...</Formula>
    </TwoColumn>
  )),
  slide('kleene-plus', 'Language Builder', 'Kleene Plus', (
    <TwoColumn visual={<Formula>Σ+ = Σ* - {'{ε}'}</Formula>}>
      <DefinitionBlock>Σ+ contains all non-empty strings over Σ.</DefinitionBlock>
      <Points items={['Every string in Σ+ has length at least 1', 'ε belongs to Σ* but not to Σ+', 'Useful when empty input should be rejected']} />
    </TwoColumn>
  )),
  slide('concat-strings', 'Operation', 'Concatenation of Strings', (
    <VisualFirst
      lead="Concatenation joins strings end to end."
      visual={<Formula>x = aaa &nbsp;&nbsp; y = bbb &nbsp;&nbsp; xy = aaabbb</Formula>}
      takeaway={<Takeaway>In general, xy is not the same as yx.</Takeaway>}
    />
  )),
  slide('language', 'Core Term', 'Language', (
    <TwoColumn visual={<LanguageVenn />}>
      <DefinitionBlock>A language over Σ is any subset of Σ*.</DefinitionBlock>
      <Points items={['A language may be finite or infinite', 'A language may contain ε', 'The empty language ∅ contains no strings', 'Automata are built to recognize languages']} />
    </TwoColumn>
  )),
  slide('language-representation', 'Notation', 'Representing Languages', (
    <TwoColumn visual={<ChipGrid items={['{0, 01, 011}', '{w | w begins with 0}', '0(0 or 1)*', '{0ⁿ1ⁿ | n ≥ 0}']} />}>
      <Lead>Languages can be represented using set notation, set-builder notation, or compact pattern descriptions.</Lead>
      <Takeaway label="Careful">Module 1 uses simple pattern notation only; regular expressions belong to a later module.</Takeaway>
    </TwoColumn>
  )),
  slide('language-examples', 'Examples', 'Language Examples', (
    <div className="toc-example-grid">
      {['Strings containing at least one 1', 'Strings beginning with 0', 'Strings with equal restrictions from the notes', 'Strings represented using powers such as aⁿ'].map((item) => (
        <article key={item}><strong>{item}</strong><span>over a chosen alphabet Σ</span></article>
      ))}
    </div>
  )),
  slide('decision-problem', 'Decision Problem', 'Membership in a Language', (
    <TwoColumn visual={<AutomatonFlow result="w ∈ L ?" />}>
      <DefinitionBlock>A decision problem asks a yes/no question.</DefinitionBlock>
      <Lead>For languages, the central decision is: given a string w and a language L, determine whether w ∈ L.</Lead>
    </TwoColumn>
  )),
  slide('repetition', 'Operation', 'String Repetition', (
    <TwoColumn visual={<Formula>a⁴ = aaaa<br />(ab)³ = ababab</Formula>}>
      <Lead>Repetition means concatenating the same symbol or string multiple times.</Lead>
      <Points items={['a⁰ = ε', 'a¹ = a', 'aⁿ contains n copies of a']} />
    </TwoColumn>
  )),
  slide('reversal', 'Operation', 'String Reversal', (
    <TwoColumn visual={<Formula>w = abba → wᴿ = abba<br />x = ab01 → xᴿ = 10ba</Formula>}>
      <Lead>The reversal of a string writes its symbols in reverse order.</Lead>
      <Takeaway>A palindrome is unchanged by reversal.</Takeaway>
    </TwoColumn>
  )),
  slide('language-to-machine', 'Section 03', 'From Language to Machine', (
    <VisualFirst
      lead="A finite automaton converts a language rule into a step-by-step machine."
      visual={<AutomatonFlow />}
      takeaway={<Takeaway>The machine reads the whole input and accepts only if it stops in an accepting state.</Takeaway>}
    />
  )),
  slide('what-dfa', 'Deterministic FA', 'What Is a DFA?', (
    <TwoColumn visual={<MiniDfa states={['q0', 'q1']} finals={['q1']} labels={['a', 'b']} />}>
      <DefinitionBlock>A deterministic finite automaton has exactly one transition for every state-symbol pair.</DefinitionBlock>
      <Points items={['One current state at any moment', 'One input symbol read at a time', 'No guessing and no missing transition', 'Acceptance depends on the final state after the input ends']} />
    </TwoColumn>
  )),
  slide('dfa-formal', 'Formal Definition', 'Formal Definition of DFA', (
    <TwoColumn visual={<Formula>A = (Q, Σ, δ, q₀, F)</Formula>}>
      <Points items={['Q: finite set of states', 'Σ: input alphabet', 'δ: transition function Q × Σ → Q', 'q₀: start state', 'F: set of accepting states, F ⊆ Q']} />
    </TwoColumn>
  ) ),
  slide('diagram-notation', 'Notation', 'Transition Diagram Notation', (
    <TwoColumn visual={<MiniDfa states={['q0', 'q1']} finals={['q1']} labels={['0', '1']} />}>
      <Points items={['Start arrow points to q₀', 'Circle represents an ordinary state', 'Double circle represents an accepting state', 'Arrow label shows the input symbol', 'Self-loop keeps the machine in the same state']} />
    </TwoColumn>
  )),
  slide('transition-table', 'Notation', 'Transition Table', (
    <TwoColumn visual={<TransitionTable rows={[['→q0', 'q0', 'q1'], ['*q1', 'q0', 'q1']]} />}>
      <Lead>A transition table is the tabular form of the same DFA diagram.</Lead>
      <Points items={['Rows are states', 'Columns are input symbols', 'Each cell gives exactly one next state']} />
    </TwoColumn>
  )),
  slide('dfa-processing', 'Execution', 'How a DFA Processes a String', (
    <VisualFirst
      lead="The DFA consumes one input symbol at a time and updates its current state."
      visual={<Formula>q₀ --0→ q₀ --1→ q₁ --1→ q₁</Formula>}
      takeaway={<Takeaway>For input 011, this example ends in q₁, so it accepts if q₁ ∈ F.</Takeaway>}
    />
  ) ),
  slide('extended-transition', 'Formal Tool', 'Extended Transition Function', (
    <TwoColumn visual={<Formula>δ̂(q, ε) = q<br />δ̂(q, wa) = δ(δ̂(q,w), a)</Formula>}>
      <Lead>δ reads one symbol. The extended function δ̂ reads an entire string.</Lead>
      <Points items={['Base case: reading ε changes nothing', 'Recursive case: process prefix w first', 'Then process the last symbol a']} />
    </TwoColumn>
  )),
  slide('worked-verification', 'Worked Example', 'Worked Verification', (
    <TwoColumn visual={<TransitionTable rows={[['→q0', 'q0', 'q1'], ['*q1', 'q0', 'q1']]} />}>
      <Lead>Language: strings over {'{0,1}'} ending in 1. Verify w = 0101.</Lead>
      <Formula>q0 --0→ q0 --1→ q1 --0→ q0 --1→ q1</Formula>
      <Takeaway>Final state q1 is accepting, so 0101 is accepted.</Takeaway>
    </TwoColumn>
  )),
  slide('design-strategy', 'Section 04', 'DFA Design Strategy', (
    <VisualFirst
      lead="Design begins with the language, not with circles."
      visual={<ProcessPath steps={['Understand language', 'Identify memory', 'Create states', 'Add transitions', 'Mark final states', 'Test strings']} />}
      takeaway={<Takeaway>The best state names describe the information that must be remembered.</Takeaway>}
    />
  )),
  slide('ending-a', 'DFA Design', 'DFA for Strings Ending in a', (
    <TwoColumn visual={<MiniDfa states={['not-a', 'last-a']} finals={['last-a']} labels={['a', 'b']} />}>
      <Lead>Alphabet Σ = {'{a,b}'}. The DFA only needs to remember whether the latest symbol is a.</Lead>
      <Points items={['Read a: move to last-a', 'Read b: move to not-a', 'Accept only in last-a']} />
    </TwoColumn>
  )),
  slide('ending-ab', 'DFA Design', 'DFA for Strings Ending in ab', (
    <TwoColumn visual={<PatternStates pattern="ab" />}>
      <Lead>Track the longest useful suffix that is also a prefix of ab.</Lead>
      <Points items={['q0: no useful suffix', 'q1: last symbol is a', 'q2: suffix ab found at the end']} />
    </TwoColumn>
  )),
  slide('beginning-a', 'DFA Design', 'DFA for Strings Beginning with a', (
    <TwoColumn visual={<MiniDfa states={['start', 'ok', 'trap']} finals={['ok']} labels={['a', 'b']} trap />}>
      <Lead>The first symbol decides the language.</Lead>
      <Points items={['If first symbol is a, remain in accepting region', 'If first symbol is b, go to trap', 'Trap state preserves rejection after a bad prefix']} />
    </TwoColumn>
  )),
  slide('beginning-ab', 'DFA Design', 'DFA for Strings Beginning with ab', (
    <TwoColumn visual={<PatternStates pattern="ab" />}>
      <Lead>A mismatch before reading the prefix ab cannot be repaired later.</Lead>
      <Takeaway label="Trap State">All strings that fail the required beginning go permanently to trap.</Takeaway>
    </TwoColumn>
  )),
  slide('containing-ab', 'DFA Design', 'DFA for Strings Containing ab', (
    <TwoColumn visual={<PatternStates pattern="ab" />}>
      <Lead>For substring recognition, once ab is seen, the machine can remain accepting.</Lead>
      <Points items={['q0: no progress', 'q1: have seen a as possible start', 'q2: have seen ab somewhere']} />
    </TwoColumn>
  )),
  slide('containing-abab', 'DFA Design', 'DFA for Strings Containing abab', (
    <TwoColumn visual={<PatternStates pattern="abab" />}>
      <Lead>Each state records progress through the target pattern abab.</Lead>
      <Takeaway>Fallback transitions reuse partial matches such as ab when a mismatch occurs.</Takeaway>
    </TwoColumn>
  )),
  slide('ending-abb', 'DFA Design', 'DFA for Strings Ending with abb', (
    <TwoColumn visual={<PatternStates pattern="abb" />}>
      <Lead>Ending-with problems require the final suffix to match exactly when input finishes.</Lead>
      <Points items={['Remember longest suffix that can still become abb', 'Accept only at the state for full suffix abb', 'Continue transitions because more input may arrive']} />
    </TwoColumn>
  )),
  slide('beginning-101', 'DFA Design', 'DFA for Strings Beginning with 101', (
    <TwoColumn visual={<PatternStates pattern="101" />}>
      <Lead>The DFA verifies the first three symbols, then ignores the remaining symbols in an accepting state.</Lead>
      <Takeaway>A wrong symbol while checking the prefix goes to trap.</Takeaway>
    </TwoColumn>
  )),
  slide('containing-1101', 'DFA Design', 'DFA for Strings Containing 1101', (
    <TwoColumn visual={<PatternStates pattern="1101" />}>
      <Lead>Pattern progress states recognize the substring 1101 anywhere in the input.</Lead>
      <Points items={['q1: seen 1', 'q2: seen 11', 'q3: seen 110', 'q4: seen 1101 and accept']} />
    </TwoColumn>
  )),
  slide('exactly-three-zeros', 'DFA Design', 'DFA for Exactly Three Consecutive Zeros', (
    <TwoColumn visual={<PatternStates pattern="000" />}>
      <Lead>Count a run of zeros and reject if the run becomes longer than three.</Lead>
      <Points items={['q0: no current zero run', 'q1/q2/q3: current run length 1/2/3', 'trap: four or more consecutive zeros']} />
    </TwoColumn>
  )),
  slide('not-containing-110', 'Complement', 'DFA for Strings Not Containing 110', (
    <TwoColumn visual={<PatternStates pattern="110" />}>
      <Lead>Build the DFA for strings containing 110 first. Then complement the accepting states.</Lead>
      <Takeaway label="Complement Rule">For a complete DFA, swap final and non-final states to recognize the complement language.</Takeaway>
    </TwoColumn>
  )),
  slide('even-zero', 'Section 05', 'DFA for an Even Number of 0s', (
    <TwoColumn visual={<MiniDfa states={['even', 'odd']} finals={['even']} labels={['0 toggles', '1 loops']} />}>
      <Lead>Two states are enough: the parity of the number of 0s seen so far.</Lead>
      <Points items={['Start in even because zero 0s is even', 'Every 0 toggles parity', 'Every 1 keeps the same parity']} />
    </TwoColumn>
  )),
  slide('even-one', 'Counting', 'DFA for an Even Number of 1s', (
    <TwoColumn visual={<MiniDfa states={['even', 'odd']} finals={['even']} labels={['1 toggles', '0 loops']} />}>
      <Lead>This is the same parity idea, but now the symbol 1 toggles the state.</Lead>
      <Takeaway>Counting modulo 2 needs two states.</Takeaway>
    </TwoColumn>
  )),
  slide('product-construction', 'Product Automata', 'Product Construction', (
    <TwoColumn visual={<ProductGrid />}>
      <DefinitionBlock>The product construction combines two DFAs by using ordered pairs of states.</DefinitionBlock>
      <Formula>Q = Q₁ × Q₂</Formula>
      <Points items={['Each combined state remembers both machines at once', 'Transitions update both components', 'Final states depend on AND or OR requirement']} />
    </TwoColumn>
  )),
  slide('even-zero-even-one', 'Product Automata', 'Even Number of 0s AND Even Number of 1s', (
    <TwoColumn visual={<ProductGrid final="EE" />}>
      <Lead>Use four product states: EE, EO, OE and OO.</Lead>
      <Takeaway>For AND, accept only when both component DFAs are in accepting states.</Takeaway>
    </TwoColumn>
  )),
  slide('odd-zero-odd-one', 'Product Automata', 'Odd Number of 0s AND Odd Number of 1s', (
    <TwoColumn visual={<ProductGrid final="OO" />}>
      <Lead>The same four product states are reused with a different accepting state.</Lead>
      <Takeaway>Accept OO because both counts must be odd.</Takeaway>
    </TwoColumn>
  )),
  slide('odd-zero-or-even-one', 'Product Automata', 'Odd Number of 0s OR Even Number of 1s', (
    <TwoColumn visual={<div className="toc-product-grid multi-final">{['EE', 'EO', 'OE', 'OO'].map((s) => <span key={s} className={['EE', 'OE', 'OO'].includes(s) ? 'final' : ''}>{s}</span>)}</div>}>
      <Lead>For OR, mark a product state final if at least one component condition is true.</Lead>
      <Points items={['Odd number of 0s: OE or OO', 'Even number of 1s: EE or OE', 'Union of final pairs: EE, OE, OO']} />
    </TwoColumn>
  )),
  slide('divisible-by-3', 'Remainder DFA', 'Binary Numbers Divisible by 3', (
    <TwoColumn visual={<MiniDfa states={['r0', 'r1', 'r2']} finals={['r0']} labels={['0/1', 'mod 3']} />}>
      <Lead>Use states for remainders 0, 1 and 2.</Lead>
      <Formula>new remainder = (2 × old remainder + input bit) mod 3</Formula>
      <Takeaway>Accept remainder 0.</Takeaway>
    </TwoColumn>
  )),
  slide('divisible-by-5', 'Remainder DFA', 'Numbers Divisible by 5', (
    <TwoColumn visual={<ChipGrid items={['r0', 'r1', 'r2', 'r3', 'r4']} />}>
      <Lead>For divisibility by 5, the DFA needs five remainder states.</Lead>
      <Points items={['Each state stores the remainder of the prefix read so far', 'Reading a new digit updates the remainder', 'The accepting state is r0']} />
    </TwoColumn>
  )),
  slide('why-nfa', 'Section 06', 'Why NFA?', (
    <TwoColumn visual={<MiniDfa states={['q0', 'q1', 'q2']} finals={['q2']} labels={['a or b', 'choice']} />}>
      <Lead>An NFA may choose multiple transitions, have no transition, or exist in several possible states.</Lead>
      <Points items={['Useful for compact design', 'Often easier to draw than an equivalent DFA', 'Accepts if at least one path reaches a final state']} />
    </TwoColumn>
  )),
  slide('nfa-definition', 'Formal Definition', 'Formal Definition of NFA', (
    <TwoColumn visual={<Formula>A = (Q, Σ, δ, q₀, F)<br />δ: Q × Σ → 2^Q</Formula>}>
      <Lead>The NFA transition function returns a set of possible next states.</Lead>
      <Takeaway>2^Q means the power set of Q.</Takeaway>
    </TwoColumn>
  )),
  slide('nfa-extended', 'Formal Tool', 'Extended Transition Function of NFA', (
    <TwoColumn visual={<Formula>δ̂(q, w) = set of states reachable after reading w</Formula>}>
      <Lead>For NFAs, the extended transition function collects all states reachable by all possible paths.</Lead>
      <Points items={['Start with a set of possible states', 'Read one symbol at a time', 'Union all reachable next states']} />
    </TwoColumn>
  )),
  slide('nfa-design', 'NFA Design', 'NFA Design Examples', (
    <TwoColumn visual={<PatternStates pattern="ab" />}>
      <Lead>NFA design can guess where a useful pattern begins.</Lead>
      <Points items={['Stay in q0 while scanning irrelevant symbols', 'Branch to q1 when a possible match begins', 'Accept if one branch completes the pattern']} />
    </TwoColumn>
  )),
  slide('dfa-nfa-equivalence', 'Equivalence', 'Equivalence of DFA and NFA', (
    <TwoColumn visual={<SubsetBuild />}>
      <DefinitionBlock>For every NFA, there exists an equivalent DFA that accepts the same language.</DefinitionBlock>
      <Takeaway>The DFA simulates all NFA possibilities using sets of NFA states.</Takeaway>
    </TwoColumn>
  )),
  slide('subset-construction', 'Conversion', 'Subset Construction', (
    <VisualFirst
      lead="Each DFA state is a subset of NFA states."
      visual={<ProcessPath steps={['Start set', 'Read symbol', 'Union moves', 'Create subset state', 'Repeat until closed']} />}
      takeaway={<Takeaway>Unreachable subset states do not need to be included in the final DFA.</Takeaway>}
    />
  )),
  slide('nfa-to-dfa', 'Conversion', 'Conversion from NFA to DFA', (
    <TwoColumn visual={<TransitionTable headers={['DFA state', '0', '1']} rows={[['{q0}', '{q0,q1}', '{q0}'], ['{q0,q1}', '{q0,q1}', '{q0,q2}'], ['{q0,q2}', '{q0,q1}', '{q0}']]} />}>
      <Lead>Build the DFA transition table using subset states.</Lead>
      <Points items={['The start DFA state is {q0}', 'Any subset containing an NFA final state becomes final', 'Continue until no new subsets appear']} />
    </TwoColumn>
  )),
  slide('epsilon-nfa', 'Section 07', 'ε-NFA', (
    <TwoColumn visual={<EpsilonClosureViz />}>
      <DefinitionBlock>An ε-NFA permits transitions on ε, which consume no input symbol.</DefinitionBlock>
      <Points items={['The machine can move without reading input', 'ε-moves make construction convenient', 'They can be eliminated systematically']} />
    </TwoColumn>
  )),
  slide('epsilon-closure', 'ε-Closure', 'ε-Closure', (
    <TwoColumn visual={<EpsilonClosureViz />}>
      <DefinitionBlock>ε-closure(q) is the set of states reachable from q using zero or more ε-transitions.</DefinitionBlock>
      <Points items={['Always includes q itself', 'Follows only ε-labeled arrows', 'Used before and after consuming real input symbols']} />
    </TwoColumn>
  )),
  slide('epsilon-acceptance', 'Acceptance', 'Acceptance of Strings by ε-NFA', (
    <TwoColumn visual={<AutomatonFlow result="some path reaches F" />}>
      <Lead>A string is accepted if at least one possible path, including ε-moves, reaches a final state after the input is consumed.</Lead>
      <Takeaway>All input symbols must be consumed; ε-moves may still be taken at the end.</Takeaway>
    </TwoColumn>
  )),
  slide('eliminate-epsilon', 'Conversion', 'Eliminating ε-Transitions', (
    <VisualFirst
      lead="ε-transitions can be removed while preserving the same accepted language."
      visual={<ProcessPath steps={['Find ε-closures', 'Update transitions', 'Update final states', 'Remove ε-arrows', 'Verify language']} />}
      takeaway={<Takeaway>The new automaton simulates the free moves through ordinary transitions.</Takeaway>}
    />
  )),
  slide('epsilon-to-dfa', 'Conversion', 'Conversion from ε-NFA to DFA', (
    <TwoColumn visual={<SubsetBuild />}>
      <Lead>Combine ε-closure with subset construction.</Lead>
      <Points items={['Start state is ε-closure(q0)', 'For each symbol, move then close again', 'Any subset containing a final NFA state is accepting']} />
    </TwoColumn>
  )),
]

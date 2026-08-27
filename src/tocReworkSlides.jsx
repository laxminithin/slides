/**
 * Theory of Computation V2.0 — Module 1 Masterpiece
 * Introduction to Automata Theory and Finite Automata
 * Story-first living FA: Input → Read → Transition → Decide → Accept
 */
import { BookOpen, FileQuestion, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  ChipFlow,
  Compare,
  Deck,
  Definition,
  Divider,
  Example,
  Hook,
  OpeningShell,
  Points,
  slide,
  tocStory,
} from './components/TocKit'
import { OpeningM1 } from './components/TocOpenings'
import {
  DecisionGate,
  EpsilonClosureViz,
  LanguageCity,
  LivingDfa,
  LivingDfaRun,
  LivingNfa,
  SubsetConstructionViz,
} from './components/TocViz'

const story = tocStory
const icon = { size: 22, strokeWidth: 1.8, 'aria-hidden': true }

function resources() {
  return (
    <div className="toc-chip-flow">
      <Link to="/theory-of-computation/module-1/notes"><BookOpen {...icon} /> Notes</Link>
      <Link to="/theory-of-computation/module-1/previous-year-questions"><FileQuestion {...icon} /> PYQs</Link>
      <span><Sparkles {...icon} /> Living automata</span>
    </div>
  )
}

export const theoryOfComputationModule1Slides = [
  slide({
    id: 'm1-opening',
    kicker: 'Opening',
    title: 'THEORY OF COMPUTATION',
    subtitle: 'Module 1 — Machines that make decisions',
    layout: 'full',
    hideTitle: true,
    content: (
      <OpeningShell
        scene={<OpeningM1 />}
        moduleLabel="VTU — Module 1"
        title="FINITE AUTOMATA"
        subtitle="Learning to make decisions — one symbol at a time"
      />
    ),
    notes: 'Cinematic open: living DFA run. Remount replays animation.',
  }),

  slide({
    id: 'm1-why',
    kicker: 'The problem',
    title: 'Why do we need a machine that decides?',
    subtitle: 'Start with a filter, not a definition',
    content: (
      <Deck active={0} story={story} composition="toc-comp-hero" visual={<DecisionGate />} takeaway="Automata exist to accept or reject strings against a precise rule.">
        <Hook>Compilers, protocols, and validators all ask the same question: does this input belong?</Hook>
        <Points items={[
          'Meaning comes later — first we check pattern membership.',
          'A finite automaton is a decision engine with finite memory.',
          'Every later model (PDA, TM) extends this same idea.',
        ]} />
        <Example label="Motivation">How does a login form reject bad emails before talking to a server?</Example>
      </Deck>
    ),
  }),

  slide({
    id: 'm1-roadmap',
    kicker: 'Module path',
    title: 'From symbols to decisions',
    subtitle: 'The journey of Module 1',
    content: (
      <Deck active={0} story={story} composition="toc-comp-blueprint" visual={
        <ChipFlow items={['Alphabet', 'String', 'Language', 'DFA', 'NFA', 'ε-NFA', 'Subset']} />
      } takeaway="We build vocabulary first, then watch machines execute.">
        <Hook>You will watch computation happen — not memorize circles and arrows.</Hook>
        <Points items={[
          'Alphabets and languages are the raw material.',
          'DFA: exactly one next state for each symbol.',
          'NFA / ε-NFA: branching intuition, then determinize.',
        ]} />
        {resources()}
      </Deck>
    ),
  }),

  slide({
    id: 'm1-divider-foundations',
    kicker: 'Chapter',
    title: 'Foundations',
    layout: 'full',
    hideTitle: true,
    content: (
      <Divider
        number="01"
        title="Alphabets, strings, languages"
        subtitle="The city map before the railway"
        visual={<LanguageCity />}
      />
    ),
  }),

  slide({
    id: 'm1-alphabet',
    kicker: 'Raw material',
    title: 'What is an alphabet?',
    subtitle: 'Finite non-empty set of symbols',
    content: (
      <Deck active={0} story={story} composition="toc-comp-reverse" visual={
        <ChipFlow items={['Σ = {0,1}', 'Σ = {a,b,c}', 'Σ = {0,1,2,…,9}']} />
      } takeaway="Σ is finite and non-empty — the alphabet of discourse.">
        <Hook>Before any machine moves, we name the symbols it can see.</Hook>
        <Definition term="Alphabet Σ">A finite, non-empty set of symbols.</Definition>
        <Points items={[
          'Binary alphabet {0,1} is the classroom classic.',
          'Symbols themselves have no meaning yet.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-strings',
    kicker: 'Sequences',
    title: 'Strings are journeys over Σ',
    subtitle: 'Finite sequences of symbols',
    content: (
      <Deck active={1} story={story} composition="toc-comp-visual-first" visual={
        <LivingDfa input={['0', '0', '1', '0']} active="q0" litEdge="" />
      } takeaway="w ∈ Σ* — a finite walk across the alphabet.">
        <Hook>Characters line up — each position is one step for the machine.</Hook>
        <Definition term="String w">A finite sequence of symbols from Σ. Length |w|. Empty string ε has length 0.</Definition>
        <Example label="Examples">ε, 0, 1, 01, 0010 over Σ = {'{0,1}'}</Example>
      </Deck>
    ),
  }),

  slide({
    id: 'm1-language',
    kicker: 'Sets of strings',
    title: 'A language is a neighbourhood in Σ*',
    subtitle: 'Not every string is welcome',
    content: (
      <Deck active={0} story={story} composition="toc-comp-radial" visual={<LanguageCity />} takeaway="L ⊆ Σ* — the language is the set we care about.">
        <Hook>Σ* is every possible street. Language L picks the addresses that matter.</Hook>
        <Definition term="Language L">Any subset of Σ*. May be finite or infinite.</Definition>
        <Points items={[
          'Operations: union, concatenation, Kleene star.',
          'Recognition: decide whether w ∈ L.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-operations',
    kicker: 'Building languages',
    title: 'How languages grow',
    subtitle: 'Union · Concatenation · Star',
    content: (
      <Deck active={0} story={story} composition="toc-comp-compare" reverse visual={
        <Compare
          leftTitle="Concatenation"
          rightTitle="Kleene star"
          left={['AB = {xy | x∈A, y∈B}', 'order matters']}
          right={['A* = zero or more from A', 'ε always included']}
          foot="These set operations create infinite families from finite seeds."
        />
      } takeaway="Language ops are set ops with string-building behaviour.">
        <Hook>Small languages generate large families through operations.</Hook>
        <Points items={[
          'Union A ∪ B — either neighbourhood.',
          'Power Aⁿ — exactly n concatenations.',
          'Exam staple: write languages using these ops.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-divider-dfa',
    kicker: 'Chapter',
    title: 'Deterministic Finite Automata',
    layout: 'full',
    hideTitle: true,
    content: (
      <Divider
        number="02"
        title="The railway of decisions"
        subtitle="States are stations · transitions are tracks"
        visual={<LivingDfaRun />}
      />
    ),
  }),

  slide({
    id: 'm1-dfa-problem',
    kicker: 'Hero problem',
    title: 'How can a machine recognize binary strings ending in 01?',
    subtitle: 'Story before definition',
    content: (
      <Deck active={1} story={story} composition="toc-comp-hero" visual={
        <LivingDfa input={['0', '1', '0', '1']} active="q0" litEdge="" />
      } takeaway="Design the machine around the last symbols that matter.">
        <Hook>Don't start with a 5-tuple. Start with the decision you need.</Hook>
        <Points items={[
          'Remember whether we just saw 0.',
          'On 1 after that 0 — arrive at accept.',
          'Anything else — fall back to the right station.',
        ]} />
        <Example label="Target language">L = {'{w ∈ {0,1}* | w ends with 01}'}</Example>
      </Deck>
    ),
  }),

  slide({
    id: 'm1-dfa-execute',
    kicker: 'Execution',
    title: 'Watch the DFA think',
    subtitle: 'Input · state · transition · next state',
    content: (
      <Deck active={2} story={story} composition="toc-comp-hero" visual={<LivingDfaRun />} takeaway="The automaton itself teaches — follow the glowing state.">
        <Hook>Current state pulses. The consumed symbol lights the track. Destination appears.</Hook>
        <Points items={[
          'Exactly one transition for each (state, symbol).',
          'After the last symbol, check if the state is accepting.',
          'Reject means you ended somewhere else — not a crash.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-dfa-tuple',
    kicker: 'Formalize',
    title: 'DFA as a 5-tuple',
    subtitle: 'After the story, pin the definition',
    content: (
      <Deck active={2} story={story} composition="toc-comp-blueprint" visual={
        <LivingDfa input={['0', '1']} active="q2" litEdge="01" result="Accept" />
      } takeaway="M = (Q, Σ, δ, q0, F) — finite memory, total transition function.">
        <Definition term="DFA">M = (Q, Σ, δ, q₀, F) where δ: Q × Σ → Q is total, F ⊆ Q.</Definition>
        <Points items={[
          'Q — finite set of states (stations).',
          'δ — complete function: every track exists.',
          'F — accepting states (double circle).',
        ]} />
        <Example label="Extended δ̂">δ̂(q, ε) = q; δ̂(q, wa) = δ(δ̂(q, w), a)</Example>
      </Deck>
    ),
  }),

  slide({
    id: 'm1-dfa-accept',
    kicker: 'Acceptance',
    title: 'When does a DFA accept?',
    subtitle: 'Destination reached after the last symbol',
    content: (
      <Deck active={6} story={story} composition="toc-comp-timeline" visual={
        <LivingDfa input={['1', '0', '1']} active="q2" litEdge="01" result="Accept" />
      } takeaway="Accept iff δ̂(q0, w) ∈ F.">
        <Hook>Acceptance is a property of the final station — not of intermediate stops.</Hook>
        <Points items={[
          'Language of M: L(M) = {w | δ̂(q₀, w) ∈ F}.',
          'Trap / dead states catch impossible prefixes.',
          'Product automata combine decisions (intersection/union).',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-dfa-construct',
    kicker: 'Design craft',
    title: 'Constructing a DFA from a language',
    subtitle: 'What must the machine remember?',
    content: (
      <Deck active={2} story={story} composition="toc-comp-quiet" visual={
        <LivingDfa input={['0', '0', '1']} active="q1" litEdge="1" />
      } takeaway="State = relevant history compressed into finite memory.">
        <Hook>Ask: which prefixes need different futures?</Hook>
        <Points items={[
          'Identify distinguishable prefixes.',
          'Draw states for each memory class.',
          'Fill every transition — DFAs are total.',
        ]} />
        <Example label="Exam tip">For “contains 01”, states track progress through the pattern.</Example>
      </Deck>
    ),
  }),

  slide({
    id: 'm1-divider-nfa',
    kicker: 'Chapter',
    title: 'Nondeterminism',
    layout: 'full',
    hideTitle: true,
    content: (
      <Divider
        number="03"
        title="Many tracks at once"
        subtitle="NFA branching makes guesswork precise"
        visual={<LivingNfa />}
      />
    ),
  }),

  slide({
    id: 'm1-nfa-intuition',
    kicker: 'Hero insight',
    title: 'What if the machine could try both paths?',
    subtitle: 'Nondeterminism as parallel hypothesising',
    content: (
      <Deck active={2} story={story} composition="toc-comp-hero" visual={<LivingNfa />} takeaway="Accept if ANY path accepts — the active set is the truth.">
        <Hook>Several stations light together. That is not chaos — it is speculation with rules.</Hook>
        <Points items={[
          'δ returns a set of states.',
          'Missing transitions = empty set, not a forced track.',
          'Powerful for design; convertible to DFA.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-nfa-formal',
    kicker: 'Definition',
    title: 'NFA 5-tuple',
    subtitle: 'Same shape, set-valued transitions',
    content: (
      <Deck active={2} story={story} composition="toc-comp-compare" visual={
        <Compare
          leftTitle="DFA"
          rightTitle="NFA"
          left={['δ(q,a) = one state', 'total function', 'unique path']}
          right={['δ(q,a) ⊆ Q', 'partial OK', 'many paths']}
          foot="Same languages — different design ergonomics."
        />
      } takeaway="NFA = (Q, Σ, δ, q0, F) with δ: Q × Σ → 2^Q.">
        <Definition term="NFA">Transition function yields a set of next states. Accept if some computation lands in F.</Definition>
        <Points items={['Active-set view = subset of Q alive after reading w.', 'Exam: show acceptance tree or set evolution.']} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-epsilon',
    kicker: 'Free moves',
    title: 'ε-NFA — move without reading',
    subtitle: 'Silent tracks change the active set',
    content: (
      <Deck active={2} story={story} composition="toc-comp-radial" visual={<EpsilonClosureViz />} takeaway="ε-closure(q) = all states reachable from q using only ε.">
        <Hook>Sometimes the railway lets you teleport for free — that is ε.</Hook>
        <Definition term="ε-closure">The set of states reachable from a state (or set) via zero or more ε-transitions.</Definition>
        <Points items={[
          'Before/after every symbol, take ε-closure.',
          'Used heavily in regex → NFA constructions.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-subset',
    kicker: 'Equivalence',
    title: 'From NFA to DFA — subset construction',
    subtitle: 'Sets become single stations',
    content: (
      <Deck active={5} story={story} composition="toc-comp-timeline" visual={<SubsetConstructionViz />} takeaway="Each DFA state is a set of NFA states — languages preserved.">
        <Hook>Nondeterminism was never magic. It was a set of deterministic possibilities.</Hook>
        <Points items={[
          'Start from ε-closure({q₀}).',
          'On symbol a, move then re-close.',
          'Accepting DFA state if the set meets F.',
        ]} />
        <Example label="Complexity">Up to 2^|Q| DFA states — finite still.</Example>
      </Deck>
    ),
  }),

  slide({
    id: 'm1-eliminate-eps',
    kicker: 'Cleanup',
    title: 'Eliminating ε-transitions',
    subtitle: 'Compile free rides into symbol moves',
    content: (
      <Deck active={5} story={story} composition="toc-comp-quiet" visual={<EpsilonClosureViz />} takeaway="ε-NFA → NFA without ε by closing and copying labels.">
        <Hook>Compilers hate silent moves — we inline them.</Hook>
        <Points items={[
          'For each state, compute ε-closure.',
          'Lift symbol transitions across ε-edges.',
          'New start/accept according to closures.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-product',
    kicker: 'Composition',
    title: 'Product automata',
    subtitle: 'Two decisions at once',
    content: (
      <Deck active={5} story={story} composition="toc-comp-blueprint" visual={
        <Compare
          leftTitle="Intersection"
          rightTitle="Union"
          left={['Accept if BOTH accept', 'F = F1 × F2']}
          right={['Accept if EITHER accepts', 'F = (F1×Q2) ∪ (Q1×F2)']}
          foot="States are pairs (p,q) — still finite."
        />
      } takeaway="Products combine recognizers while staying regular.">
        <Hook>Need strings accepted by two machines? Run them in lockstep.</Hook>
        <Points items={['Same alphabet assumed.', 'Classic exam construction for ∩ and ∪.']} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-minimal-insight',
    kicker: 'Insight',
    title: 'Finite memory is the ceiling',
    subtitle: 'What FA cannot count',
    content: (
      <Deck active={6} story={story} composition="toc-comp-minimal" takeaway="Balanced parentheses need a stack — Module 3.">
        <Hook>A DFA cannot reliably match arbitrarily nested structure.</Hook>
        <Points items={[
          'Only finitely many distinguishable histories.',
          'Pumping (Module 2) proves limits formally.',
          'PDA adds memory when counting matters.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-recap',
    kicker: 'Recap',
    title: 'Module 1 — you can see how an automaton thinks',
    subtitle: 'From symbols to acceptance',
    content: (
      <Deck active={6} story={story} composition="toc-comp-hero" visual={<LivingDfaRun />} takeaway="States pulse, tracks light, accept/reject is a destination.">
        <Hook>Remember machines making decisions — not only diagrams.</Hook>
        <Points items={[
          'Alphabet → string → language → recognizer.',
          'DFA executes deterministically; NFA branches.',
          'ε-closure + subset construction connect the models.',
        ]} />
        <ChipFlow items={['Q', 'Σ', 'δ', 'q0', 'F', 'L(M)']} />
      </Deck>
    ),
  }),

  slide({
    id: 'm1-exam',
    kicker: 'Exam ready',
    title: 'What VTU expects from Module 1',
    subtitle: 'Definitions with living intuition',
    content: (
      <Deck active={6} story={story} composition="toc-comp-blueprint" visual={
        <LivingDfa input={['0', '1']} active="q2" result="Accept" litEdge="01" />
      } takeaway="Draw, define, convert, prove membership — with a picture in mind.">
        <Points items={[
          'Define DFA/NFA/ε-NFA and δ̂.',
          'Construct DFA for simple pattern languages.',
          'Convert NFA/ε-NFA → DFA via subset construction.',
          'Explain acceptance with a trace, not only a table.',
        ]} />
        {resources()}
      </Deck>
    ),
  }),
]

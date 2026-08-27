import { Callout, CodeBlock, Definition, Flow, Lead, Points, ResourceHub, Stage, aiSlide, Formula } from './AiKit.jsx'
import {
  ComparePanel,
  KnowledgeBaseScene,
  LogicInferenceFlow,
  UnificationScene,
} from './AiScenes.jsx'
import { ContrastPair, FolAnatomy, QuantifierScene, WestNetwork, CinematicOpener } from './AiUniverse.jsx'
import { Module4Opening, ModuleEnding, ModulePicture } from './AiOpenings.jsx'

const S = ['Objects', 'Syntax', 'Quantifiers', 'Use', 'KE', 'Unify', 'FC']
const k = (t) => `MODULE 4 · ${t}`
function s(cfg, body) {
  return aiSlide({ ...cfg, content: body })
}

export const aiModule4Slides = [
  s({ id: 'm4-open', kicker: k('FIRST-ORDER LOGIC'), title: 'Objects, relations, and rules that fire', hideTitle: true, composition: 'hero-open', camera: 'wide-world', family: 'logic-fire', object: 'opener', action: 'watch-fol', film: { chapterOpener: true, hero: true } },
    <Stage composition="hero-open" visual={<Module4Opening />} takeaway="Propositional logic cannot say “every square adjacent to a pit is breezy” in one sentence." />),

  s({ id: 'm4-why', kicker: k('REPRESENTATION REVISITED'), title: 'The world has things, not just true/false bits', composition: 'inspect', camera: 'inspect-kb', family: 'formula-reveal', object: 'furniture', action: 'motivate', story: S, beat: 0 },
    <Stage composition="inspect" story={S} beat={0} visual={<LogicInferenceFlow premises={['Propositional: one symbol per fact', 'FOL: forall s, Pit(s) implies Breezy(Adjacent(s))']} conclusion="Variables make general knowledge possible." />} exam="FOL represents objects, properties, relations, and general rules more compactly.">
      <Lead>AIMA calls this combining the best of formal and natural language.</Lead>
    </Stage>),

  s({ id: 'm4-syntax', kicker: k('SYNTAX'), title: 'Terms name objects. Predicates make claims', composition: 'board', camera: 'pull-formula', family: 'formula-reveal', object: 'symbols', action: 'parse', story: S, beat: 1 },
    <Stage composition="board" story={S} beat={1} visual={<FolAnatomy />} exam="Term → object. Atomic sentence: predicate(terms). Complex sentences: connectives + quantifiers.">
      <Points items={['Constants: John, Nono, M1', 'Functions: FatherOf(x), Adjacent(s)', 'Predicates: Missile(x), Sells(x,y,z)']} />
    </Stage>),

  s({ id: 'm4-quant', kicker: k('QUANTIFIERS'), title: '∀ everyone. ∃ someone. Order matters', composition: 'before-after', camera: 'side-by-side', family: 'compare-split', object: 'scope', action: 'swap-order', story: S, beat: 2 },
    <Stage composition="before-after" story={S} beat={2} visual={<ContrastPair leftTitle="∀x ∃y Loves(x,y)" left="Everyone loves someone (possibly different y)." rightTitle="∃y ∀x Loves(x,y)" right="There is one y loved by everyone." />} exam="Universal and existential. Nested order changes meaning. Negation flips quantifiers.">
      <Lead>Scope is the portion of the sentence the quantifier owns.</Lead>
    </Stage>),

  s({ id: 'm4-sem', kicker: k('SEMANTICS'), title: 'A model is a domain plus an interpretation', composition: 'pipeline', camera: 'inspect-kb', family: 'logic-fire', object: 'model', action: 'interpret' },
    <Stage composition="pipeline" visual={<QuantifierScene />} takeaway="Semantics decides whether a sentence is true in that model.">
      <Definition term="Interpretation">Which objects the symbols stand for. Change the interpretation, change the truth.</Definition>
    </Stage>),

  s({ id: 'm4-use', kicker: k('USING FOL'), title: 'Assertions go in. Queries come out with bindings', composition: 'split-right', camera: 'inspect-kb', family: 'logic-fire', object: 'ask', action: 'bind', story: S, beat: 3 },
    <Stage composition="split-right" story={S} beat={3} visual={<KnowledgeBaseScene facts={['King(John)', '∀x King(x) ⇒ Person(x)']} derived="Person(John)" />} exam="TELL adds facts and rules. ASK returns substitutions — not only yes/no.">
      <Points items={['Kinship domain: Male, Female, Parent, Sibling axioms', 'Numbers, sets, lists as additional domains', 'Wumpus world rewritten with objects and relations']} />
    </Stage>),

  s({ id: 'm4-ke', kicker: k('KNOWLEDGE ENGINEERING'), title: 'A five-step process, not a single formula dump', composition: 'timeline', camera: 'travel-plan', family: 'goal-seek', object: 'ke-steps', action: 'engineer', story: S, beat: 4, notes: 'Identify task, assemble knowledge, vocabulary, encode, debug with queries.' },
    <Stage composition="timeline" story={S} beat={4} visual={<Flow items={['Identify the task', 'Assemble knowledge', 'Choose vocabulary', 'Encode axioms', 'Test queries']} />} exam="Electronic circuits domain is the textbook KE case: gates, terminals, connected, signals.">
      <Lead>Debugging queries improve the KB. Vocabulary choice is ontology work.</Lead>
    </Stage>),

  s({ id: 'm4-circuits', kicker: k('KE EXAMPLE'), title: 'A 1-bit adder as sentences, not wires on a slide', composition: 'microscope', camera: 'inspect-kb', family: 'logic-fire', object: 'adder', action: 'encode' },
    <Stage composition="microscope" visual={<CodeBlock lines={['Terminal(x) ∧ Gate(g) ∧ Connected(x,g)', 'Signal(t) = 1  or  0', 'Connected is commutative', 'If two terminals connected, they share signal']} />} takeaway="The adder is a test: if the axioms are right, ASK recovers sum and carry.">
      <Callout kind="idea" label="Why this domain">Small, crisp, and every student has seen a circuit diagram.</Callout>
    </Stage>),

  s({ id: 'm4-vs', kicker: k('PROP VS FOL INFERENCE'), title: 'Grounding explodes. Lifted inference does not', composition: 'race', camera: 'side-by-side', family: 'compare-split', object: 'grounding', action: 'lift' },
    <Stage composition="race" visual={<ComparePanel leftTitle="Propositional" rightTitle="Lifted FOL" left={['One symbol per object-fact', 'Wumpus: a breeze axiom per pair of squares', 'Inference tables grow with the grid']} right={['Variables stand for many objects', 'One axiom covers the cave', 'Pay the cost of unification']} />} exam="Propositionalisation (reduction to PL) works in principle; the Herbrand universe can be infinite.">
      <Lead>Avoiding grounding is how FOL stays compact.</Lead>
    </Stage>),

  s({ id: 'm4-unify-div', kicker: k('UNIFICATION'), title: 'The engine behind first-order rule matching', hideTitle: true, composition: 'hero-open', camera: 'wide-world', family: 'unify-match', object: 'unify-open', action: 'open-unify', film: { chapterOpener: true } },
    <Stage composition="hero-open" visual={<CinematicOpener kicker="Unification" title="Make two expressions identical" line="Find a substitution — or fail." stage={4} scene={<UnificationScene />} />} />),

  s({ id: 'm4-unify', kicker: k('UNIFICATION'), title: 'Knows(John, x) meets Knows(John, Jane)', composition: 'full-stage', camera: 'pull-formula', family: 'unify-match', object: 'theta', action: 'substitute', story: S, beat: 5 },
    <Stage composition="full-stage" story={S} beat={5} visual={<UnificationScene />} takeaway="The most general unifier (MGU) adds no extra commitments." exam="UNIFY(A,B) returns a substitution θ such that SUBST(θ,A) = SUBST(θ,B), or fail. Occur-check: x and f(x).">
      <Lead>Matching is consistent substitution. Failure is a first-class answer.</Lead>
    </Stage>),

  s({ id: 'm4-mgu', kicker: k('UNIFICATION'), title: 'Standardizing apart, and the occur check', composition: 'inspect', camera: 'inspect-kb', family: 'occur-guard', object: 'occur', action: 'guard' },
    <Stage composition="inspect" visual={<Formula>{'{x / Jane}'}  is more general than  {'{x / Jane, y / Mother(Jane)}'}</Formula>} takeaway="Rename variables before unifying two rules. Prolog often skips the occur check for speed.">
      <Points items={['Subsumption lattice: children by one substitution', 'Highest common descendant of two nodes is their MGU']} />
    </Stage>),

  s({ id: 'm4-fc-div', kicker: k('FORWARD CHAINING'), title: 'Facts activate rules. New facts appear', hideTitle: true, composition: 'hero-open', camera: 'wide-world', family: 'forward-chain', object: 'fc-open', action: 'open-fc', film: { chapterOpener: true } },
    <Stage composition="hero-open" visual={<CinematicOpener kicker="Forward chaining" title="From facts to conclusions" line="Data-driven. Fire until the query — or a fixpoint." stage={4} scene={<WestNetwork lit={2} />} />} />),

  s({ id: 'm4-fc-def', kicker: k('FORWARD CHAINING'), title: 'Definite clauses: premises ∧ … ⇒ one positive atom', composition: 'split-left', camera: 'inspect-kb', family: 'logic-fire', object: 'definite', action: 'define-clause', story: S, beat: 6 },
    <Stage composition="split-left" story={S} beat={6} visual={<KnowledgeBaseScene facts={['American(x) ∧ Weapon(y) ∧ Sells(x,y,z) ∧ Hostile(z)', '⇒ Criminal(x)']} derived="one positive head" />} exam="Variables in definite clauses are universally quantified. Facts are clauses with no body.">
      <Lead>FOL-FC-ASK is sound (generalised modus ponens) and complete for definite-clause KBs.</Lead>
    </Stage>),

  s({ id: 'm4-west', kicker: k('CRIME EXAMPLE'), title: 'West sells missiles to Nono — encode the story', composition: 'split-left', camera: 'inspect-kb', family: 'knowledge-connect', object: 'west-kb', action: 'encode-story' },
    <Stage composition="split-left" visual={<WestNetwork lit={1} />} exam="Existential “Nono has some missiles” becomes Owns(Nono,M1) and Missile(M1) by Skolem / EE.">
      <CodeBlock lines={['(1) American(x) ∧ Weapon(y) ∧ Sells(x,y,z) ∧ Hostile(z) ⇒ Criminal(x)', '(2) Owns(Nono, M1)   (3) Missile(M1)', '(4) Missile(x) ∧ Owns(Nono,x) ⇒ Sells(West,x,Nono)', '(5) Missile(x) ⇒ Weapon(x)', '(6) Enemy(x,America) ⇒ Hostile(x)', '(7) American(West)   (8) Enemy(Nono,America)']} />
    </Stage>),

  s({ id: 'm4-fc1', kicker: k('FC TRACE'), title: 'Iteration 1: three rules fire', composition: 'full-stage', camera: 'follow-rule', family: 'forward-chain', object: 'iter1', action: 'fire', film: { hero: true } },
    <Stage composition="full-stage" visual={<WestNetwork lit={2} />} takeaway="(4) adds Sells(West,M1,Nono). (5) adds Weapon(M1). (6) adds Hostile(Nono). (1) still waits.">
      <Lead>Start from known facts. Trigger every rule whose premises are already there.</Lead>
    </Stage>),

  s({ id: 'm4-fc2', kicker: k('FC TRACE'), title: 'Iteration 2: Criminal(West) appears', composition: 'dashboard', camera: 'follow-rule', family: 'logic-fire', object: 'criminal', action: 'fixpoint' },
    <Stage composition="dashboard" visual={<WestNetwork lit={3} />} exam="θ = {x/West, y/M1, z/Nono}. Two iterations. Then no new facts — fixpoint.">
      <Callout kind="ok" label="Sound and complete">Every inference is generalised modus ponens. Every entailed definite-clause query is answered.</Callout>
    </Stage>),

  s({ id: 'm4-eff', kicker: k('EFFICIENT FC'), title: 'Three costs: matching, rechecking, irrelevance', composition: 'stack', camera: 'inspect-kb', family: 'compare-split', object: 'costs', action: 'optimize' },
    <Stage composition="stack" visual={<ComparePanel leftTitle="Problem" rightTitle="Fix" left={['Conjunct ordering / pattern match', 'Rechecking every rule every round', 'Irrelevant Americans in a huge KB']} right={['Most-constrained-variable heuristic', 'Incremental FC: a rule fires only if a new fact matches a conjunct', 'Magic sets — bind the query constant into the rule']} />} exam="Matching a definite clause against facts is NP-hard. CSPs are definite clauses + ground facts.">
      <Lead>Magic(West) stops the engine considering a million other Americans.</Lead>
    </Stage>),

  s({ id: 'm4-picture', kicker: k('ONE PICTURE'), title: 'Module 4 in one picture', composition: 'full-stage', camera: 'wide-world', family: 'state-expand', object: 'summary', action: 'recap' },
    <Stage composition="full-stage" visual={<ModulePicture n={4} />} />),

  s({ id: 'm4-confuse', kicker: k('CONFUSIONS'), title: 'Unification is not evaluation', composition: 'before-after', camera: 'side-by-side', family: 'compare-split', object: 'traps', action: 'warn' },
    <Stage composition="before-after" visual={<ContrastPair leftTitle="Unify" left="Find θ that makes two expressions literally the same." rightTitle="Infer" right="Use θ inside a rule to create a new sentence." />}>
      <Points items={['Forward chaining is data-driven; it may derive facts you did not ask for', 'Quantifier order is a 2-mark trap']} />
    </Stage>),

  s({ id: 'm4-end', kicker: k('CLOSE'), title: 'Facts went in. A criminal came out', composition: 'board', camera: 'wide-world', family: 'agent-loop', object: 'ending', action: 'close-story' },
    <Stage composition="board" visual={<ModuleEnding n={4} />} />),

  s({ id: 'm4-resources', kicker: k('RESOURCES'), title: 'Notes, questions, quick revision', composition: 'dashboard', camera: 'overhead-map', family: 'compare-split', object: 'hub', action: 'study' },
    <Stage composition="dashboard" visual={<ResourceHub moduleId="module-4" />} />),
]

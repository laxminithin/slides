/**
 * TOC V2.0 — Module 4 Masterpiece
 * Properties of Context-Free Languages
 */
import { BookOpen, FileQuestion, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  ChipFlow, Compare, Deck, Definition, Divider, Example, Hook, OpeningShell, Points, slide,
} from './components/TocKit'
import { OpeningM4 } from './components/TocOpenings'
import { DerivationTrail, LivingAmbiguity, LivingParseTree, LivingPda } from './components/TocViz'

const story = ['Grammar', 'Simplify', 'Normal form', 'Pump', 'Close', 'Decide']
const icon = { size: 22, strokeWidth: 1.8, 'aria-hidden': true }

export const theoryOfComputationModule4Slides = [
  slide({ id: 'm4-opening', kicker: 'Opening', title: 'CFL PROPERTIES', subtitle: 'Module 4 — Building structure', layout: 'full', hideTitle: true, content: (
    <OpeningShell scene={<OpeningM4 />} moduleLabel="VTU — Module 4" title="STRUCTURE" subtitle="Trees grow · grammars transform · limits appear" />
  ) }),
  slide({ id: 'm4-why', kicker: 'The problem', title: 'When is a grammar ready for an algorithm?', subtitle: 'Clean the structure before using it', content: (
    <Deck active={0} story={story} composition="toc-comp-hero" visual={<LivingParseTree />} takeaway="Equivalent grammars can expose radically different algorithmic structure.">
      <Hook>Dead symbols, silent rules, and long right sides hide the useful skeleton.</Hook>
      <Points items={['Simplify without changing the language.', 'Normalize productions for parsing and proofs.', 'Map the closure and decision boundaries of CFLs.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-divider-simplify', kicker: 'Chapter', title: 'Grammar simplification', layout: 'full', hideTitle: true, content: (
    <Divider number="01" title="Remove what contributes nothing" subtitle="Non-generating · unreachable · ε · unit" visual={<DerivationTrail side="left" />} />
  ) }),
  slide({ id: 'm4-generating', kicker: 'Cleanup', title: 'First ask: can this variable finish?', subtitle: 'Compute generating symbols', content: (
    <Deck active={1} story={story} composition="toc-comp-blueprint" visual={<LivingParseTree />} takeaway="Mark variables that derive terminal strings; discard every rule that depends on the rest.">
      <Points items={['Seed variables with an all-terminal RHS.', 'Repeatedly mark A if A→α and every variable in α is marked.', 'Unmarked variables are non-generating.']} />
      <Example label="Fixed point">For A→a and S→AB, A is generating; S waits until B is generating.</Example>
    </Deck>
  ) }),
  slide({ id: 'm4-reachable', kicker: 'Cleanup', title: 'Then ask: can the start symbol reach it?', subtitle: 'Compute reachable symbols', content: (
    <Deck active={1} story={story} composition="toc-comp-visual-first" visual={<LivingParseTree />} takeaway="A useful symbol must be both generating and reachable.">
      <Points items={['Mark S reachable.', 'If reachable A has A→α, mark every symbol in α.', 'Delete productions containing unreachable variables.']} />
      <Hook>Order matters: remove non-generating symbols before the reachability pass.</Hook>
    </Deck>
  ) }),
  slide({ id: 'm4-useless-worked', kicker: 'Worked cleanup', title: 'Watch a grammar lose dead branches', subtitle: 'Generating pass, then reachability pass', content: (
    <Deck active={1} story={story} composition="toc-comp-reverse" visual={<DerivationTrail side="left" />} takeaway="The surviving grammar preserves every terminal derivation from S.">
      <Example label="Before">S→AB|a; A→aA|a; B→C; C→C; D→d</Example>
      <ChipFlow items={['C non-generating', 'therefore B non-generating', 'remove S→AB', 'D unreachable', 'keep S→a and A rules only if reachable']} />
    </Deck>
  ) }),
  slide({ id: 'm4-nullable', kicker: 'Silent structure', title: 'Nullable variables can disappear', subtitle: 'Find every A with A⇒*ε', content: (
    <Deck active={1} story={story} composition="toc-comp-timeline" visual={<LivingParseTree />} takeaway="For each production, add variants omitting nullable occurrences.">
      <Points items={['Seed A when A→ε.', 'Propagate through RHS made entirely of nullable variables.', 'Add omission variants, then remove ε-rules; preserve S→ε only when ε∈L.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-epsilon-worked', kicker: 'Worked cleanup', title: 'Eliminate ε-productions systematically', subtitle: 'Enumerate nullable choices', content: (
    <Deck active={1} story={story} composition="toc-comp-tree" visual={<LivingParseTree />} takeaway="Nullable occurrences create alternatives; do not simply erase the ε-rule.">
      <Example label="Given">S→ABC; A→a|ε; B→b|ε; C→c</Example>
      <Points items={['Nullable set = {A,B}.', 'Replace S→ABC with ABC | BC | AC | C.', 'Remove A→ε and B→ε after all variants are added.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-unit', kicker: 'Silent structure', title: 'Unit productions only rename a variable', subtitle: 'Collapse A→B chains', content: (
    <Deck active={1} story={story} composition="toc-comp-radial" visual={<DerivationTrail side="right" />} takeaway="Copy non-unit productions across the transitive unit closure.">
      <Example label="Unit chain">S→A, A→B, B→bB|b becomes S→bB|b and A→bB|b.</Example>
      <Points items={['Compute every pair (A,B) with A⇒*unit B.', 'For each pair, copy B→α when α is not a single variable.', 'Delete all unit productions.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-cleanup-order', kicker: 'Exam algorithm', title: 'A safe simplification order', subtitle: 'Each pass protects the next', content: (
    <Deck active={1} story={story} composition="toc-comp-compare" visual={<ChipFlow items={['new start', 'ε-rules', 'unit rules', 'non-generating', 'unreachable']} />} takeaway="Later transformations can expose new useless symbols, so finish with a useless-symbol pass.">
      <Points items={['Introduce S0→S when the start symbol needs protection.', 'Eliminate ε, then unit productions.', 'Remove useless symbols at the end.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-divider-normal', kicker: 'Chapter', title: 'Normal forms', layout: 'full', hideTitle: true, content: (
    <Divider number="02" title="Restrict the shape, preserve the language" subtitle="CNF binary trees · GNF terminal-first steps" visual={<LivingParseTree />} />
  ) }),
  slide({ id: 'm4-cnf-definition', kicker: 'CNF', title: 'Chomsky Normal Form makes every branch binary', subtitle: 'A→BC or A→a', content: (
    <Deck active={2} story={story} composition="toc-comp-quiet" visual={<LivingParseTree />} takeaway="Except optional S0→ε, every rule creates two variables or one terminal.">
      <Definition term="Chomsky Normal Form">Productions are A→BC or A→a, with B,C variables; optionally the protected start may produce ε.</Definition>
      <Points items={['No unit productions.', 'No mixed terminal-variable RHS.', 'No RHS longer than two variables.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-cnf-step-1', kicker: 'CNF conversion', title: 'Step 1: simplify and protect the start', subtitle: 'Remove exceptional structure first', content: (
    <Deck active={2} story={story} composition="toc-comp-minimal" visual={<DerivationTrail side="left" />} takeaway="CNF conversion starts from an equivalent clean grammar.">
      <ChipFlow items={['add S0→S', 'remove ε', 'remove unit', 'remove useless']} />
      <Example label="Reason">S0 never appears on a RHS, so preserving ε does not create recursive exceptions.</Example>
    </Deck>
  ) }),
  slide({ id: 'm4-cnf-step-2', kicker: 'CNF conversion', title: 'Step 2: isolate terminals in long rules', subtitle: 'Give each terminal a variable proxy', content: (
    <Deck active={2} story={story} composition="toc-comp-hero" visual={<LivingParseTree />} takeaway="A terminal may stand alone, but cannot share a long CNF right side.">
      <Example label="Rewrite">A→aBC becomes A→XₐBC and Xₐ→a.</Example>
      <Points items={['Reuse one proxy per terminal when convenient.', 'Rules already of form A→a remain unchanged.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-cnf-step-3', kicker: 'CNF conversion', title: 'Step 3: binarize long variable chains', subtitle: 'Factor from one side consistently', content: (
    <Deck active={2} story={story} composition="toc-comp-blueprint" visual={<LivingParseTree />} takeaway="Fresh helper variables turn a long branch into a binary spine.">
      <Example label="Rewrite">A→BCDE becomes A→BX1, X1→CX2, X2→DE.</Example>
      <Points items={['Every resulting RHS has exactly two variables.', 'Fresh helpers preserve the original order.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-cnf-worked', kicker: 'Worked conversion', title: 'Convert S→aAB, A→a, B→b into CNF', subtitle: 'Proxy, then binarize', content: (
    <Deck active={2} story={story} composition="toc-comp-visual-first" visual={<LivingParseTree />} takeaway="Final grammar: S→XₐX1, X1→AB, Xₐ→a, A→a, B→b.">
      <ChipFlow items={['S→aAB', 'replace a by Xₐ', 'S→XₐAB', 'introduce X1→AB', 'S→XₐX1']} />
      <Example label="Check">Every rule is variable-variable or variable-terminal.</Example>
    </Deck>
  ) }),
  slide({ id: 'm4-gnf', kicker: 'GNF', title: 'Greibach Normal Form emits one terminal per step', subtitle: 'A→aα', content: (
    <Deck active={2} story={story} composition="toc-comp-reverse" visual={<DerivationTrail side="left" />} takeaway="A length-n string has a leftmost derivation of exactly n terminal-emitting steps.">
      <Definition term="Greibach Normal Form">Every production begins with a terminal followed by zero or more variables.</Definition>
      <Points items={['Remove left recursion during conversion.', 'GNF connects naturally to PDA input-consuming moves.', 'CNF is parser/proof friendly; GNF is derivation-length friendly.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-divider-pumping', kicker: 'Chapter', title: 'Pumping context-free languages', layout: 'full', hideTitle: true, content: (
    <Divider number="03" title="A tall parse tree repeats a variable" subtitle="uvxyz · two synchronized pump sites" visual={<LivingParseTree />} />
  ) }),
  slide({ id: 'm4-pumping-definition', kicker: 'Lemma', title: 'CFL pumping stretches two pieces together', subtitle: 'The uvxyz decomposition', content: (
    <Deck active={3} story={story} composition="toc-comp-timeline" visual={<LivingParseTree />} takeaway="|vxy|≤p, |vy|≥1, and uvⁱxyⁱz∈L for every i≥0.">
      <Definition term="CFL pumping lemma">Every sufficiently long string in a CFL has two jointly pumpable regions v and y arising between repeated variables on a parse-tree path.</Definition>
      <Hook>Unlike regular pumping, the repeated structure may touch two separated parts of the string.</Hook>
    </Deck>
  ) }),
  slide({ id: 'm4-pumping-strategy', kicker: 'Proof method', title: 'The quantifiers decide the proof', subtitle: 'You choose w; the opponent chooses the split', content: (
    <Deck active={3} story={story} composition="toc-comp-tree" visual={<ChipFlow items={['assume CFL', 'obtain p', 'choose w', 'all valid splits', 'choose i', 'leave L', 'contradiction']} />} takeaway="A complete proof handles every split satisfying the lemma, usually by cases.">
      <Points items={['Choose w with rigid blocks.', 'Use |vxy|≤p to limit how many boundaries it can cross.', 'For each location of v and y, pump 0 or 2 to break an invariant.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-anbncn-walkthrough', kicker: 'Counterexample', title: "Walkthrough: {aⁿbⁿcⁿ} is not context-free", subtitle: 'A short window cannot coordinate three blocks', content: (
    <Deck active={3} story={story} composition="toc-comp-radial" visual={<LivingPda input={['a', 'b', 'c']} cursor={1} stack={['Z', 'A']} stage="pop" />} takeaway="vxy lies within one block or crosses only one boundary, so pumping cannot preserve all three equal counts.">
      <ChipFlow items={['w=aᵖbᵖcᵖ', '|vxy|≤p', 'touches ≤2 blocks', 'pump i=0 or 2', 'one count changes alone', 'not in L']} />
      <Points items={['If v,y stay in one block, only that symbol count changes.', 'If they cross a boundary, the untouched third block keeps count p.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-pumping-caution', kicker: 'Caution', title: 'Failing to find a contradiction proves nothing', subtitle: 'The lemma is necessary, not sufficient', content: (
    <Deck active={3} story={story} composition="toc-comp-compare" visual={<LivingAmbiguity />} takeaway="Some non-CFLs satisfy the ordinary pumping condition; stronger tools may be needed.">
      <Points items={['Never use the lemma to prove a language is context-free.', 'Ogden’s lemma can mark positions and force pumping where needed.', 'Closure with a regular language often simplifies the target first.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-divider-closure', kicker: 'Chapter', title: 'Closure and decision properties', layout: 'full', hideTitle: true, content: (
    <Divider number="04" title="What survives an operation?" subtitle="Construct witnesses · reuse counterexamples · know decidable questions" visual={<LivingPda />} />
  ) }),
  slide({ id: 'm4-closure-positive', kicker: 'Closure', title: 'CFLs survive generative operations', subtitle: 'Build a grammar from two grammars', content: (
    <Deck active={4} story={story} composition="toc-comp-quiet" visual={<LivingParseTree />} takeaway="CFLs are closed under union, concatenation, star, reversal, homomorphism, and inverse homomorphism.">
      <Points items={['Union: fresh S→S1|S2.', 'Concatenation: fresh S→S1S2.', 'Star: fresh S→S1S|ε.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-nonclosure', kicker: 'Non-closure', title: 'CFLs are not a Boolean algebra', subtitle: 'Intersection and complement can escape', content: (
    <Deck active={4} story={story} composition="toc-comp-minimal" visual={<Compare leftTitle="Closed" rightTitle="Not closed" left={['Union', 'Concatenation', 'Star', 'Homomorphisms', 'Reversal']} right={['Intersection of two CFLs', 'Complement', 'Difference']} foot="If complement were closed, intersection would follow from De Morgan and union." />} takeaway="Non-closure proofs combine familiar CFLs to produce a known non-CFL.">
      <Example label="Witness">{"{aⁱbⁱcʲ} ∩ {aⁱbʲcʲ} = {aⁿbⁿcⁿ}."}</Example>
    </Deck>
  ) }),
  slide({ id: 'm4-intersection-regular', kicker: 'Special closure', title: 'CFL ∩ regular is always context-free', subtitle: 'The finite control rides beside the stack', content: (
    <Deck active={4} story={story} composition="toc-comp-hero" visual={<LivingPda input={['a', 'a', 'b', 'b']} cursor={2} stack={['Z', 'A']} stage="pop" />} takeaway="Product the PDA state with the DFA state; keep the same stack.">
      <Points items={['Product states are (p,q): PDA control plus DFA control.', 'Each consumed symbol updates both; ε-PDA moves update only p.', 'Accept when both components accept.']} />
      <Example label="Proof trick">Intersect with a*b*c* to force a complicated language into three ordered blocks.</Example>
    </Deck>
  ) }),
  slide({ id: 'm4-decision-overview', kicker: 'Decision map', title: 'Which CFG questions have algorithms?', subtitle: 'Separate membership from global comparison', content: (
    <Deck active={5} story={story} composition="toc-comp-blueprint" visual={<Compare leftTitle="Decidable" rightTitle="Undecidable" left={['Membership w∈L(G)', 'Emptiness L(G)=∅', 'Finiteness of L(G)']} right={['Equivalence L(G1)=L(G2)', 'Inclusion L(G1)⊆L(G2)', 'Universality L(G)=Σ*', 'Ambiguity of arbitrary CFG']} foot="Decidable does not always mean computationally cheap." />} takeaway="Local derivation and reachability questions are tractable; broad language comparison is not.">
      <Points items={['CYK decides membership after CNF conversion.', 'Generating-variable analysis decides emptiness.', 'Cycle analysis among useful variables helps decide infiniteness.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-cyk-glimpse', kicker: 'Algorithm glimpse', title: 'CNF turns membership into dynamic programming', subtitle: 'The CYK triangle', content: (
    <Deck active={5} story={story} composition="toc-comp-visual-first" visual={<LivingParseTree />} takeaway="Table cell (i,ℓ) stores variables deriving the substring of length ℓ at i.">
      <Points items={['Initialize length-1 cells using A→a rules.', 'For longer spans, try every split and A→BC.', 'Accept iff S derives the entire input span.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-ambiguity-revisited', kicker: 'Property', title: 'Grammar ambiguity is not merely a bad parse choice', subtitle: 'Some languages are inherently ambiguous', content: (
    <Deck active={5} story={story} composition="toc-comp-reverse" visual={<LivingAmbiguity />} takeaway="Inherent ambiguity means every CFG for the language is ambiguous.">
      <Example label="Classic">{"L={aⁱbʲcᵏ | i=j or j=k} is inherently ambiguous."}</Example>
      <Points items={['Grammar ambiguity asks about one grammar.', 'Inherent ambiguity asks about every grammar for the language.', 'General ambiguity is undecidable.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-exam-map', kicker: 'Exam synthesis', title: 'Pick the tool that matches the claim', subtitle: 'Construction, contradiction, or algorithm', content: (
    <Deck active={5} story={story} composition="toc-comp-timeline" visual={<ChipFlow items={['equivalent grammar?', 'simplify / normalize', 'non-CFL?', 'pump / closure', 'membership?', 'CNF + CYK']} />} takeaway="State the invariant each transformation preserves.">
      <Points items={['For closure, show the new grammar or product machine.', 'For non-closure, name the witness languages and resulting intersection.', 'For decisions, name the finite fixed-point or dynamic-programming procedure.']} />
    </Deck>
  ) }),
  slide({ id: 'm4-recap', kicker: 'Recap', title: 'Structure can be cleaned, normalized, tested, and bounded', subtitle: 'Module 4 close', content: (
    <Deck active={5} story={story} composition="toc-comp-tree" visual={<LivingParseTree />} takeaway="Simplify → normalize → pump → combine → decide what is decidable.">
      <ChipFlow items={['Useful', 'Nullable', 'Unit', 'CNF', 'GNF', 'uvxyz', 'CFL∩REG', 'CYK']} />
      <div className="toc-chip-flow">
        <Link to="/theory-of-computation/module-4/notes"><BookOpen {...icon} /> Notes</Link>
        <Link to="/theory-of-computation/module-4/previous-year-questions"><FileQuestion {...icon} /> PYQs</Link>
        <span><Sparkles {...icon} /> Living trees</span>
      </div>
    </Deck>
  ) }),
]

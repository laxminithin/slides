import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, BookOpen, FileQuestion } from 'lucide-react'
import { getModule } from '../data/subjects'

const module5Notes = [
  ['Module Notes', 'Problems computers cannot solve; hello-world tester; contradiction using H, H1 and H2; reduction direction; calls-foo example.'],
  ['Turing Machine', 'Finite control, infinite tape, read/write head, blank symbol, 7-tuple, transition function, and instantaneous descriptions.'],
  ['Worked TM Example', 'TM for {0^n1^n | n >= 1}: mark 0 as X, mark matching 1 as Y, return, verify, accept or die.'],
  ['Function Computation', 'Proper subtraction m dotminus n = max(m-n,0) on unary input 0^m10^n, with state roles q0 to q6.'],
  ['Programming Techniques', 'Storage in finite control, multiple tracks, marked symbols, subroutines, Copy subroutine, and multiplication outline.'],
  ['Extensions', 'Multitape TMs, one-tape simulation, O(n^2) simulation time, nondeterministic TMs, and breadth-first deterministic simulation.'],
  ['Undecidability', 'TM encoding, diagonalization language Ld, proof Ld is not RE, recursive languages, complements, universal language Lu, and halting problem.'],
  ['Quick Revision', 'Recognizer may loop; decider halts on all inputs; UTM simulates machines; halting cannot be decided for every machine-input pair.'],
]

const module3Notes = [
  ['Module Notes', 'CFGs describe recursive languages: variables, terminals, productions and start symbol G = (V,T,P,S).'],
  ['Palindrome Grammar', 'P -> ε | 0 | 1 | 0P0 | 1P1 generates exactly palindromes over {0,1}; proof uses induction in both directions.'],
  ['Expression Grammar', 'E -> I | E+E | E*E | (E), with I generating identifiers over a, b, 0 and 1.'],
  ['Derivations', 'One-step derivation replaces a variable by a production body; =>* means zero or more steps; L(G) = {w in T* | S =>* w}.'],
  ['Leftmost and Rightmost', 'Leftmost derivation always replaces the leftmost variable; rightmost derivation always replaces the rightmost variable.'],
  ['Parse Trees', 'Parse trees show grammar structure; their yield is the terminal string read from leaves left to right.'],
  ['Ambiguity', 'A grammar is ambiguous when one terminal string has two parse trees; expression ambiguity is removed using E, T and F levels.'],
  ['Pushdown Automata', 'PDA = finite control plus stack; formal tuple P = (Q,Σ,Γ,δ,q0,Z0,F); IDs record state, unread input and stack.'],
  ['PDA Acceptance', 'L(P) accepts by final state; N(P) accepts by empty stack. The PDF proves these modes are equivalent in expressive power.'],
  ['Equivalence and DPDA', 'CFGs, empty-stack PDAs and final-state PDAs define the CFLs; DPDAs include regular languages but not all CFLs.'],
]

const module5Questions = {
  viva: [
    'What is a Turing machine?',
    'Why is the blank symbol not an input symbol?',
    'What is an instantaneous description?',
    'What does it mean for a TM to halt?',
    'What is a recursively enumerable language?',
    'What is a recursive or decidable language?',
    'What is a universal Turing machine?',
    'State the halting problem.',
  ],
  two: [
    'Define Turing machine as a 7-tuple.',
    'Define instantaneous description of a TM.',
    'What is acceptance by final state?',
    'What is acceptance by halting?',
    'Define recursively enumerable language.',
    'Define recursive language.',
    'What is diagonalization language Ld?',
    'What is universal language Lu?',
  ],
  five: [
    'Explain the components and move of a Turing machine.',
    'Explain the TM for accepting {0^n1^n | n >= 1}.',
    'Show the ID sequence for input 0011 or 0010 using the PDF machine.',
    'Explain storage in state and multiple tracks with examples.',
    'Explain reduction direction using hello-world and calls-foo.',
    'Explain why a multitape TM can be simulated by a one-tape TM.',
  ],
  ten: [
    'Prove using contradiction that the hello-world tester cannot exist.',
    'Design and explain the Turing machine for {0^n1^n | n >= 1} with transition table and traces.',
    'Explain proper subtraction using a Turing machine and summarize the role of each state.',
    'State and prove Theorem 8.9 and Theorem 8.10 on multitape simulation.',
    'State and prove Theorem 8.11 on deterministic simulation of nondeterministic TMs.',
    'Explain encoding of TMs, diagonalization, and prove that Ld is not recursively enumerable.',
    'Explain universal language Lu and prove that Lu is RE but not recursive.',
    'Explain the halting problem and why no always-correct halting decider exists.',
  ],
}

const module3Questions = {
  viva: [
    'What is a context-free grammar?',
    'What are terminals and variables in a CFG?',
    'What is the start symbol?',
    'What is a derivation?',
    'What is a leftmost derivation?',
    'What is the yield of a parse tree?',
    'When is a grammar ambiguous?',
    'What is a pushdown automaton?',
    'What is an instantaneous description of a PDA?',
    'What is a deterministic PDA?',
  ],
  two: [
    'Define CFG as a four-tuple.',
    'Write the CFG for palindromes over {0,1}.',
    'Define L(G).',
    'Differentiate ε and empty language in grammar examples.',
    'Define parse tree.',
    'Define ambiguity in a grammar.',
    'Define PDA as a seven-tuple.',
    'Differentiate acceptance by final state and empty stack.',
  ],
  five: [
    'Explain the palindrome CFG and derive 0110.',
    'Explain the expression grammar from the PDF.',
    'Derive a*(a+b00) using leftmost derivation.',
    'Explain how a parse tree represents a derivation.',
    'Explain ambiguity in the expression grammar and how it is removed.',
    'Explain instantaneous descriptions of a PDA with a short trace.',
    'Explain conversion from empty-stack PDA to final-state PDA.',
  ],
  ten: [
    'State and prove Theorem 5.7 for the palindrome grammar.',
    'Explain recursive inference, derivations, leftmost derivations and rightmost derivations with examples.',
    'State the parse-tree equivalence theorems 5.12, 5.14, 5.16 and 5.18 with proof ideas.',
    'Explain ambiguous grammars, unambiguous expression grammar and inherent ambiguity.',
    'Define PDA formally and explain its transition behavior and IDs.',
    'Prove equivalence of final-state and empty-stack acceptance using Theorems 6.9 and 6.11.',
    'Explain CFG to PDA conversion and PDA to CFG conversion using Theorems 6.13 and 6.14.',
    'Define DPDA and explain Theorems 6.17, 6.19, 6.20 and 6.21.',
  ],
}

export default function TocResourcePage({ type }) {
  const { moduleId } = useParams()
  const module = getModule('theory-of-computation', moduleId)

  useEffect(() => {
    document.body.classList.add('study-scroll')
    return () => document.body.classList.remove('study-scroll')
  }, [])

  if (!module || !['module-3', 'module-5'].includes(moduleId)) return <Navigate to="/theory-of-computation" replace />

  const isNotes = type === 'notes'
  const notes = moduleId === 'module-3' ? module3Notes : module5Notes
  const questions = moduleId === 'module-3' ? module3Questions : module5Questions
  const sectionTitle = (section) => {
    if (section === 'viva') return 'Viva Questions'
    return `${section[0].toUpperCase()}${section.slice(1)} Marks`
  }

  return (
    <div className="study-page pyq-page">
      <header className="study-topbar">
        <div className="study-topbar-inner">
          <Link to={`/theory-of-computation/${moduleId}`} className="study-back">
            <ArrowLeft size={18} strokeWidth={2} />
            Back to {module.label}
          </Link>
          <div className="study-topbar-copy">
            <p className="study-label">BCS503 • Theory of Computation • {module.label}</p>
            <h1>{module.title} - {isNotes ? 'Module Notes' : 'Previous Year Questions'}</h1>
            <p className="study-subtitle">Companion revision material retained outside the cinematic presentation.</p>
          </div>
        </div>
      </header>

      <main className="study-main">
        {isNotes ? (
          <section className="most-important">
            <div className="most-important-head">
              <BookOpen size={24} />
              <h2>Module Notes and Quick Revision</h2>
              <p>Use this after the lecture to revise definitions, proofs, algorithms, examples and common exam framing.</p>
            </div>
            <div className="pyq-list-section">
              {notes.map(([title, body], index) => (
                <article key={title} className="question-card">
                  <div className="question-card-main">
                    <span className="question-number">{index + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <section className="most-important">
            <div className="most-important-head">
              <FileQuestion size={24} />
              <h2>Viva, 2 Marks, 5 Marks and 10 Marks</h2>
              <p>Questions are organized by answer depth; build answers from definition, diagram, trace/proof, and final takeaway.</p>
            </div>
            {Object.entries(questions).map(([section, items]) => (
              <div key={section} className="pyq-list-section">
                <h2 className="study-section-heading">{sectionTitle(section)}</h2>
                {items.map((item, index) => (
                  <article key={item} className="question-card">
                    <div className="question-card-main">
                      <span className="question-number">{index + 1}</span>
                      <div>
                        <h3>{item}</h3>
                        <p>Answer cue: anchor to the official {module.label} PDF, draw the matching grammar/machine/proof diagram, and include the classroom running trace where relevant.</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </section>
        )}
      </main>

      <footer className="study-footer-nav">
        <div className="study-footer-inner">
          <Link to={`/theory-of-computation/${moduleId}/${isNotes ? 'previous-year-questions' : 'notes'}`} className="study-footer-btn">
            {isNotes ? 'Previous Year Questions' : 'Open Notes'}
          </Link>
          <Link to={`/theory-of-computation/${moduleId}`} className="study-footer-btn ghost">
            Back to Presentation
          </Link>
        </div>
      </footer>
    </div>
  )
}

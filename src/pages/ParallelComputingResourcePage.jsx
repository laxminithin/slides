import { Link, useParams } from 'react-router-dom'
import { BookOpen, FileQuestion } from 'lucide-react'
import { getSubject } from '../data/subjects'

const notes = [
  ['Need for parallelism', 'Modern problems grow in size, detail and deadline pressure. Weather prediction, AI, medical research, search and cyber security all need faster turnaround than one processor can offer.'],
  ['Core definitions', 'Parallel computing uses multiple processing elements at the same time. A parallel computer supplies processors, memory and interconnects. Parallel programming exposes concurrent work and coordinates it correctly.'],
  ['Algorithmic parallelism', 'Find data dependences. Independent nodes in a dependence graph may run concurrently. Data parallelism applies the same operation to different data. Functional parallelism runs different tasks. Pipelining overlaps stages.'],
  ['Hardware foundations', 'Caches reduce average memory access time, pipelining overlaps instruction stages, instruction-level parallelism uses internal independent operations, hardware multithreading hides latency and multicore hardware exposes explicit parallel execution.'],
  ['Flynn taxonomy', 'SISD is serial, SIMD is one instruction over multiple data, MISD is rare and MIMD is multiple processors running different instructions on different data.'],
  ['Memory models', 'Shared memory uses a common address space with threads, variables, locks and barriers. Distributed memory uses private memory with messages, processes and MPI. UMA has uniform access time; NUMA has non-uniform access time.'],
  ['Networks', 'Interconnection networks connect processors, memory modules or nodes. Compare direct and indirect networks, shared and switched media, and topologies such as bus, crossbar, mesh, torus, tree and hypercube. Use latency, bandwidth, bisection width and contention in answers.'],
  ['Cache coherence', 'Multiple private cached copies of shared data can become stale after writes. Snooping broadcasts or watches changes. Directory coherence tracks sharers and owners. False sharing occurs when different variables share one cache line.'],
  ['Processes and threads', 'A process has its own address space and communicates using messages or OS mechanisms. A thread is a lightweight execution path inside a process and shares variables. Coordination uses communication, synchronization, mutual exclusion and collectives.'],
  ['Quick revision path', 'Need performance -> identify parallelism -> classify hardware -> choose memory/network model -> coordinate processes or threads -> write correct parallel software.'],
]

const viva = [
  'What is parallel computing?',
  'Why is parallel programming needed?',
  'What is a parallel computer?',
  'What is parallel programming?',
  'Differentiate concurrency and parallelism.',
  'What is data parallelism?',
  'What is functional parallelism?',
  'What is pipelining?',
  'What is SIMD?',
  'What is MIMD?',
  'What is shared memory?',
  'What is distributed memory?',
  'What is UMA?',
  'What is NUMA?',
  'What is an interconnection network?',
  'Name common network topologies.',
  'What is cache coherence?',
  'What is false sharing?',
  'Differentiate process and thread.',
  'What are MPI, Pthreads and OpenMP used for?',
]

const twoMarks = [
  'Define parallel computing.',
  'Define parallel computer.',
  'What is data parallelism?',
  'What is functional parallelism?',
  'Define SIMD.',
  'Define MIMD.',
  'What is shared memory?',
  'What is distributed memory?',
  'What is cache coherence?',
  'Define thread.',
]

const fiveMarks = [
  'Explain the need for parallel programming.',
  'Explain data parallelism, functional parallelism and pipelining.',
  "Explain Flynn's taxonomy.",
  'Differentiate SIMD and MIMD systems.',
  'Explain shared-memory architecture.',
  'Explain distributed-memory architecture.',
  'Explain interconnection networks.',
  'Explain the cache coherence problem.',
  'Explain processes and threads.',
  'Explain MPI, Pthreads and OpenMP briefly.',
]

const tenMarks = [
  'Explain introduction to parallel programming, need, concepts and examples.',
  'Explain classifications of parallel computers with SIMD and MIMD systems.',
  'Explain interconnection networks and their importance in parallel computers.',
  'Explain cache coherence and shared-memory vs distributed-memory systems.',
  'Explain coordinating processes/threads and parallel software approaches.',
  'Previous VTU Q1 placeholder: fill from past paper.',
  'Previous VTU Q2 placeholder: fill from past paper.',
  'Previous VTU Q3 placeholder: fill from past paper.',
  'Previous VTU Q4 placeholder: fill from past paper.',
  'Previous VTU Q5 placeholder: fill from past paper.',
]

const questionSections = [
  ['Viva Questions', viva],
  ['2 Marks', twoMarks],
  ['5 Marks', fiveMarks],
  ['10 Marks', tenMarks],
]

export default function ParallelComputingResourcePage({ type }) {
  const { moduleId = 'module-1' } = useParams()
  const subject = getSubject('parallel-computing')
  const module = subject.modules.find((item) => item.id === moduleId) || subject.modules[0]
  const isNotes = type === 'notes'

  return (
    <main className="study-page">
      <section className="study-hero">
        <Link to={`/parallel-computing/${module.id}`} className="study-back-link">Back to presentation</Link>
        <p className="study-kicker">VTU BCS702 | Parallel Computing</p>
        <h1>{module.title} - {isNotes ? 'Module Notes' : 'Previous Year Questions'}</h1>
        <p className="study-subtitle">
          {isNotes ? 'Lecture-first revision notes from the supplied Module 1 PPT.' : 'Viva, 2-mark, 5-mark and 10-mark practice from the supplied Module 1 PPT.'}
        </p>
      </section>

      <section className="study-card">
        {isNotes ? <BookOpen size={24} /> : <FileQuestion size={24} />}
        <h2>{isNotes ? 'Quick Revision' : 'Question Bank'}</h2>
        {isNotes ? (
          <div className="question-list">
            {notes.map(([title, body], index) => (
              <article key={title} className="question-card">
                <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        ) : (
          questionSections.map(([title, items]) => (
            <div key={title} className="question-list">
              <h3>{title}</h3>
              {items.map((item, index) => (
                <article key={item} className="question-card">
                  <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item}</h3>
                  <p>Answer cue: define, draw a small architecture or flow, connect to weather simulation, then add one limitation or exam keyword.</p>
                </article>
              ))}
            </div>
          ))
        )}
      </section>
    </main>
  )
}

import { Link, useParams } from 'react-router-dom'
import { BookOpen, FileQuestion } from 'lucide-react'
import { getSubject } from '../data/subjects'

const module5Questions = [
  'Explain Spark architecture with driver, cluster manager, executors and storage.',
  'Differentiate Spark and MapReduce.',
  'Explain RDD, DataFrame and Dataset.',
  'Explain lazy evaluation, transformations and actions.',
  'Explain Spark SQL, MLlib and GraphX.',
  'Explain text mining pipeline with tokenization, stop-word removal, stemming and TF-IDF.',
  'Explain document-term matrix and TF-IDF with formula.',
  'Explain web mining and its types.',
  'Explain web content analytics and web usage analytics.',
  'Explain link analytics, PageRank, web graph, hubs and authorities.',
]

const module5Notes = [
  'Search-engine master story: query -> Internet -> Spark -> text mining -> web mining -> link analytics -> PageRank -> result.',
  'Spark: need, architecture, driver, executors, RDD, DataFrame, Dataset, lazy evaluation, transformations, actions and word count.',
  'Spark analytics: Spark SQL, MLlib pipeline and GraphX graph analysis.',
  'Text mining: cleaning, tokenization, stop words, stemming, normalization, document-term matrix, TF-IDF, tasks and challenges.',
  'Web mining: content mining, structure mining, usage mining, web logs, clickstream and metrics.',
  'Link analytics: in-links, out-links, web graph, PageRank intuition, damping, iteration, hubs and authorities.',
  'Exam formula: definition + architecture/process diagram + example + application + challenge.',
]

export default function BigDataResourcePage({ type }) {
  const { moduleId = 'module-5' } = useParams()
  const subject = getSubject('big-data-analytics')
  const module = subject.modules.find((item) => item.id === moduleId) || subject.modules.at(-1)
  const isNotes = type === 'notes'
  const items = moduleId === 'module-5'
    ? (isNotes ? module5Notes : module5Questions)
    : ['Use the supplied Module 1 PDF and question bank for this module.']

  return (
    <main className="study-page">
      <section className="study-hero">
        <Link to={`/big-data-analytics/${module.id}`} className="study-back-link">Back to presentation</Link>
        <p className="study-kicker">VTU BIS701 | Big Data Analytics</p>
        <h1>{module.title} - {isNotes ? 'Notes' : 'Previous Year Questions'}</h1>
        <p className="study-subtitle">{isNotes ? 'Module 5 revision outline' : 'High-yield exam and previous-year themes'}</p>
      </section>

      <section className="study-card">
        {isNotes ? <BookOpen size={24} /> : <FileQuestion size={24} />}
        <h2>{isNotes ? 'Notes Outline' : 'Question Bank'}</h2>
        <div className="question-list">
          {items.map((item, index) => (
            <article key={item} className="question-card">
              <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item}</h3>
              <p>{isNotes ? 'Use the interactive Module 5 slides for diagrams, workflow animation and examples.' : 'Answer cue: define, draw the flow or graph, explain steps, add one search-engine example.'}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

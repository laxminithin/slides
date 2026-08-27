import { Link, useParams } from 'react-router-dom'
import { BookOpen, FileQuestion } from 'lucide-react'
import { getSubject } from '../data/subjects'

const notesByModule = {
  'module-1': [
    ['Meaning of research', 'Research is a systematic scientific effort to collect and analyse information in order to gain new knowledge and answer intellectual or practical problems.'],
    ['Engineering research objectives', 'Solve new important problems, develop theoretical or applied knowledge, and treat “why it failed” as a valid contribution when the desired result is not achieved.'],
    ['Motivation', 'Intrinsic motives (curiosity, challenge, learning) and extrinsic motives (rewards, patents, status) both drive research; peer influence, societal need and funding also matter.'],
    ['Types of research', 'Descriptive/Analytical, Applied/Fundamental, Quantitative/Qualitative, Conceptual/Empirical — plus one-time, longitudinal, experimental and historical studies.'],
    ['Worthwhile problem', 'Identify, formulate, test clarity/novelty/feasibility, and remain convinced the problem is worth the investment before deep literature work.'],
    ['Ethics & misconduct', 'Protect integrity across question → data → analysis → interpretation → publication. Fabrication, falsification and plagiarism destroy trust; authorship credit must match contribution.'],
  ],
  'module-2': [
    ['Literature review', 'Place new work in the context of existing knowledge; analyse papers then synthesise patterns, contradictions and gaps.'],
    ['Search tools', 'Bibliographic databases, Web of Science, Google and Google Scholar each have strengths and limits — search is iterative.'],
    ['Technical reading', 'Read critically and creatively; take notes; handle mathematics, algorithms and datasheets deliberately.'],
    ['Citations', 'Citations verify, acknowledge and document knowledge flow. Titles and keywords affect discoverability.'],
    ['Acknowledgments', 'Substantial scholarly contribution → authorship; other support → acknowledgment. Dedication differs from acknowledgment.'],
  ],
  'module-3': [
    ['IP & IPR', 'IP is intangible creation of the mind; IPR are legal privileges granted to creators/inventors.'],
    ['Patentability', 'Novelty, inventive step and industrial application — plus exclusions under Indian patent law.'],
    ['Process', 'Prior art → choose application → file forms → publish → opposition → examination → grant → commercialize.'],
    ['Disclosure', 'Public disclosure before filing can destroy novelty; NDAs and grace-period rules matter.'],
    ['Global filing', 'No single worldwide patent; use national, regional or PCT routes. Indian residents generally file first in India.'],
  ],
  'module-4': [
    ['Copyright', 'Protects original expression (including software/literary works), not ideas alone. Ownership, rights, fair use and registration follow Copyright Act framing.'],
    ['Trademark', 'Protects brand identity — name, logo, symbol. Registration strengthens enforcement but is not compulsory in the course framing.'],
    ['Distinction', 'Copyright protects creative expression; trademark protects marketplace identity.'],
  ],
  'module-5': [
    ['Industrial design', 'Protects visual appearance of articles, distinct from patentable technical function.'],
    ['Geographical Indications', 'Protect reputation linked to geographic origin for qualifying goods.'],
    ['Case studies', 'Turmeric, Neem and Basmati illustrate traditional knowledge and patent challenges; Apple v Samsung illustrates design disputes.'],
    ['IP ecosystem', 'Indian IP organisations and schemes support awareness, filing and commercialization.'],
  ],
}

const vivaByModule = {
  'module-1': [
    'Define research.',
    'State objectives of engineering research.',
    'List motives for engineering research.',
    'Differentiate applied and fundamental research.',
    'What is a worthwhile research problem?',
    'Name types of research misconduct.',
    'What is gift authorship?',
  ],
  'module-2': [
    'What is literature review?',
    'Differentiate analysis and synthesis of prior art.',
    'Compare Google and Google Scholar for research search.',
    'What is critical reading?',
    'State three functions of citation.',
    'Differentiate acknowledgment and authorship.',
  ],
  'module-3': [
    'Define intellectual property.',
    'State conditions for patent protection.',
    'What is prior art?',
    'Why avoid public disclosure before patenting?',
    'Can a worldwide patent be obtained?',
    'What is PCT?',
  ],
  'module-4': [
    'Define copyright.',
    'List classes of copyrights.',
    'What is fair use?',
    'Define trademark.',
    'Is trademark registration compulsory?',
    'Differentiate copyright and trademark.',
  ],
  'module-5': [
    'What is an industrial design?',
    'What is a Geographical Indication?',
    'State learning from the Turmeric patent case.',
    'What does Apple v Samsung illustrate for design rights?',
    'Name Indian IP organisations.',
  ],
}

const twoMarks = {
  'module-1': ['Define research.', 'What is plagiarism?', 'List any four types of research.', 'What is extrinsic motivation in research?'],
  'module-2': ['What is a bibliographic database?', 'Define prior art in literature terms.', 'What is creative reading?', 'Name two citation styles used by engineers.'],
  'module-3': ['Define patent.', 'What is novelty?', 'What is provisional application?', 'Expand WIPO.'],
  'module-4': ['Define copyright.', 'What is © symbol significance?', 'Define trademark.', 'What is joint authorship?'],
  'module-5': ['Define industrial design.', 'Define GI.', 'What is design registration term (as taught)?', 'Name one IP organisation in India.'],
}

const fiveMarks = {
  'module-1': ['Explain objectives of engineering research.', 'Explain types of research with examples.', 'Explain ethics in engineering research practice.', 'Explain authorship-related ethical issues.'],
  'module-2': ['Explain literature review process.', 'Explain Web of Science / Google Scholar use.', 'Explain functions of citations.', 'Explain acknowledgments in dissertations.'],
  'module-3': ['Explain conditions for obtaining a patent.', 'Explain patentable vs non-patentable subject matter.', 'Explain process of patenting in India.', 'Explain commercialization of a patent.'],
  'module-4': ['Explain classes and criteria of copyright.', 'Explain copyright infringement and fair use.', 'Explain trademark registration process.', 'Compare copyright and trademark protection.'],
  'module-5': ['Explain industrial design registration procedure.', 'Explain GI registration and rights.', 'Explain Turmeric or Neem patent case study.', 'Explain the complete innovation-to-IP journey.'],
}

const tenMarks = {
  'module-1': ['Explain meaning, objectives, motivation and types of engineering research.', 'Explain finding a worthwhile problem and ethics including misconduct and authorship.'],
  'module-2': ['Explain literature review, technical reading and citation practices with examples.', 'Explain attributions, citation styles, acknowledgments and dedication.'],
  'module-3': ['Explain introduction to IP and the complete patenting process with forms, opposition and grant.', 'Explain patent rights, infringement, disclosure, PCT and commercialization.'],
  'module-4': ['Explain copyrights and related rights with infringement, fair use and institutional bodies.', 'Explain trademarks with registration, symbols and the Coca-Cola vs Bisleri learning case.'],
  'module-5': ['Explain industrial designs and geographical indications with procedures and examples.', 'Explain patent case studies (Turmeric, Neem, Basmati) and Indian IP organisations/schemes.'],
}

export default function ResearchMethodologyResourcePage({ type }) {
  const { moduleId = 'module-1' } = useParams()
  const subject = getSubject('research-methodology-ipr')
  const module = subject?.modules?.find((item) => item.id === moduleId) || subject?.modules?.[0]
  const isNotes = type === 'notes'
  const key = module?.id || 'module-1'

  const notes = notesByModule[key] || notesByModule['module-1']
  const viva = vivaByModule[key] || vivaByModule['module-1']
  const twos = twoMarks[key] || twoMarks['module-1']
  const fives = fiveMarks[key] || fiveMarks['module-1']
  const tens = tenMarks[key] || tenMarks['module-1']

  return (
    <main className="study-page">
      <section className="study-hero">
        <Link to={`/research-methodology-ipr/${key}`} className="study-back-link">
          Back to presentation
        </Link>
        <p className="study-kicker">VTU BRMK557 | Research Methodology & IPR</p>
        <h1>
          {module?.title || 'Module'} — {isNotes ? 'Module Notes' : 'Practice Questions'}
        </h1>
        <p className="study-subtitle">
          {isNotes
            ? 'Lecture-first revision notes aligned to the module PPT and VTU syllabus.'
            : 'Viva, 2-mark, 5-mark and 10-mark practice. Genuine previous-year university papers will be linked here when available — this bank is practice, not labelled PYQ.'}
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
          [
            ['Viva Questions', viva],
            ['2 Marks', twos],
            ['5 Marks', fives],
            ['10 Marks', tens],
          ].map(([title, items]) => (
            <div key={title} className="question-list">
              <h3>{title}</h3>
              {items.map((item, index) => (
                <article key={item} className="question-card">
                  <span className="question-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item}</h3>
                  <p>Answer cue: define precisely, add one engineering/IP example, then close with the syllabus keyword.</p>
                </article>
              ))}
            </div>
          ))
        )}
      </section>
    </main>
  )
}

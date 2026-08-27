import {
  ArrowRight,
  BarChart3,
  Braces,
  CheckCircle2,
  Database,
  FileCode2,
  Filter,
  Gauge,
  GraduationCap,
  Table2,
} from 'lucide-react'
import { BdaScaleStrip, HeroScene } from './components/BdaKit'
import { OpeningDigitalLibrary } from './components/BdaOpenings'

const icon = { size: 24, strokeWidth: 1.75, 'aria-hidden': true }

const story = [
  'SQL profile',
  'Schema pressure',
  'Document',
  'BSON types',
  'students',
  'CRUD',
  'Filters',
  'Arrays',
  'Aggregation',
  'Index',
  'Exam',
]

const students = [
  { name: 'Asha', dept: 'ISE', cgpa: 8.8, skills: ['Python', 'DBMS'], city: 'Mysuru' },
  { name: 'Rahul', dept: 'CSE', cgpa: 7.9, skills: ['Java', 'UI'], city: 'Mandya' },
  { name: 'Meera', dept: 'ISE', cgpa: 9.1, skills: ['Python', 'ML'], city: 'Mysuru' },
  { name: 'Kiran', dept: 'ECE', cgpa: 8.2, skills: ['IoT', 'Java'], city: 'Hassan' },
  { name: 'Divya', dept: 'AIML', cgpa: 8.6, skills: ['Python', 'Data'], city: 'Bengaluru' },
  { name: 'Nikhil', dept: 'ISE', cgpa: 7.4, skills: ['Cloud'], city: 'Mysuru' },
]

const erpFlow = ['registers', 'profile', 'courses', 'attendance', 'marks', 'projects', 'skills', 'queries', 'reports']

function on(stage, at = 0) {
  return stage >= at ? 'is-on' : ''
}

function slide(id, kicker, title, content, notes) {
  return { id, kicker, title, content, notes }
}

function Deck({ active = 0, children, visual, reverse = false, tight = false }) {
  return (
    <div className={`m3-decklet ${reverse ? 'reverse' : ''} ${tight ? 'tight' : ''}`.trim()}>
      <aside className="m3-story" aria-label="MongoDB module journey">
        {story.map((item, index) => (
          <span key={item} className={`${index <= active ? 'lit' : ''} ${index === active ? 'now' : ''}`.trim()}>
            {item}
          </span>
        ))}
      </aside>
      <div className="m3-copy">{children}</div>
      <div className="m3-visual">{visual}</div>
    </div>
  )
}

function Points({ items }) {
  return (
    <ul className="m3-points">
      {items.map((item, index) => <li key={item} className={on(index, 0)}>{item}</li>)}
    </ul>
  )
}

function Takeaway({ children }) {
  return <p className="m3-takeaway"><CheckCircle2 {...icon} />{children}</p>
}

function Code({ children, focus }) {
  const lines = String(children).trim().split('\n')
  return (
    <pre className="m3-code">
      {lines.map((line, index) => (
        <code key={`${line}-${index}`} className={focus && line.includes(focus) ? 'focus' : ''}>
          {line}
        </code>
      ))}
    </pre>
  )
}

function StudentCard({ compact = false, status = 'registered' }) {
  return (
    <article className={`m3-student-card ${compact ? 'compact' : ''}`}>
      <div className="avatar"><GraduationCap size={30} strokeWidth={1.6} /></div>
      <strong>Asha R</strong>
      <span>4AB23IS001 · ISE · {status}</span>
      {!compact && <em>Student Management Portal</em>}
    </article>
  )
}

function DocumentCard({ level = 0, fields, highlight }) {
  const docFields = fields || [
    ['_id', "ObjectId('64f...')", 0],
    ['usn', "'4AB23IS001'", 0],
    ['name', "'Asha R'", 0],
    ['dept', "'ISE'", 1],
    ['active', 'true', 2],
    ['joinedOn', "ISODate('2026-08-05')", 3],
    ['address.city', "'Mysuru'", 4],
    ['skills', "['Python', 'DBMS']", 5],
    ['attendance.BIS701', '92', 6],
    ['projects[0].title', "'ERP Analytics'", 7],
    ['cgpa', '8.8', 8],
  ].filter(([, , min]) => level >= min)

  const normalized = docFields.map((item) => Array.isArray(item) ? item : [item, '...', 0])
  return (
    <div className="m3-document">
      <header><Braces {...icon} /><strong>students document</strong></header>
      <div>
        {normalized.map(([key, value]) => (
          <p key={key} className={highlight === key || key.includes(highlight || '###') ? 'hot' : ''}>
            <span>{key}</span><code>{value}</code>
          </p>
        ))}
      </div>
    </div>
  )
}

function SqlTables({ stage = 0, joins = false }) {
  const tables = [
    ['students', ['usn', 'name', 'dept']],
    ['skills', ['usn', 'skill']],
    ['projects', ['usn', 'title']],
    ['attendance', ['usn', 'course', 'percent']],
  ]
  return (
    <div className={`m3-sql ${joins ? 'joins' : ''}`}>
      {tables.slice(0, stage + 1).map(([name, cols], index) => (
        <article key={name}>
          <Table2 {...icon} />
          <strong>{name}</strong>
          {cols.map((col) => <span key={col}>{col}</span>)}
          {joins && index > 0 && <i>JOIN</i>}
        </article>
      ))}
    </div>
  )
}

function ErpTimeline({ stage = erpFlow.length - 1 }) {
  return (
    <div className="m3-erp-flow">
      {erpFlow.map((item, index) => (
        <span key={item} className={index <= stage ? 'lit' : ''}>{item}</span>
      ))}
    </div>
  )
}

function TermMorph() {
  const rows = [
    ['Database', 'Database'],
    ['Table', 'Collection'],
    ['Row / tuple', 'Document'],
    ['Column / attribute', 'Field'],
    ['Primary key', '_id'],
  ]
  return (
    <div className="m3-term-morph">
      {rows.map(([sql, mongo]) => (
        <p key={sql}><span>{sql}</span><ArrowRight size={18} /><strong>{mongo}</strong></p>
      ))}
    </div>
  )
}

function CollectionVisual({ highlight, deleted = false }) {
  return (
    <div className="m3-collection">
      <header><Database {...icon} /><strong>college.students</strong></header>
      <div>
        {students.map((student) => {
          const hot = highlight === 'python'
            ? student.skills.includes('Python')
            : highlight === 'java'
              ? student.skills.includes('Java')
              : highlight === 'mysuru'
                ? student.city === 'Mysuru'
                : highlight === 'cgpa'
                  ? student.cgpa >= 8
                  : highlight === student.name.toLowerCase()
          if (deleted && student.name === 'Asha') return null
          return (
            <article key={student.name} className={hot ? 'hot' : ''}>
              <strong>{student.name}</strong>
              <span>{student.dept}</span>
              <em>{student.cgpa}</em>
            </article>
          )
        })}
      </div>
    </div>
  )
}

function BsonFlow() {
  return (
    <div className="m3-bson-flow">
      {['JSON-like document', 'Binary encoding', 'Typed BSON', 'Stored document', 'Fast processing'].map((item, index) => (
        <article key={item}>
          {index === 0 ? <FileCode2 {...icon} /> : index === 2 ? <Braces {...icon} /> : <Database {...icon} />}
          <strong>{item}</strong>
          {index < 4 && <ArrowRight {...icon} />}
        </article>
      ))}
    </div>
  )
}

function CommandLab({ command, result, takeaway, focus }) {
  return (
    <div className="m3-command-lab">
      <Code focus={focus}>{command}</Code>
      <div className="m3-result">
        <strong>visual result</strong>
        <span>{result}</span>
      </div>
      <p>{takeaway}</p>
    </div>
  )
}

function SortLimitSkip({ mode }) {
  const ordered = [...students].sort((a, b) => mode === 'sort' ? b.cgpa - a.cgpa : 0)
  const visible = mode === 'limit' ? ordered.slice(0, 4) : mode === 'skip' ? ordered.slice(2, 5) : ordered
  return (
    <div className={`m3-rank-list ${mode}`}>
      {visible.map((student, index) => (
        <article key={student.name}>
          <b>{index + 1}</b>
          <strong>{student.name}</strong>
          <span>{student.cgpa}</span>
        </article>
      ))}
    </div>
  )
}

function PipelineVisual() {
  const stages = ['$match ISE', '$group dept', '$avg cgpa', '$sort desc', 'dashboard']
  return (
    <div className="m3-pipeline">
      {stages.map((stage, index) => (
        <article key={stage}>
          {index === 4 ? <BarChart3 {...icon} /> : <Filter {...icon} />}
          <strong>{stage}</strong>
          {index < stages.length - 1 && <ArrowRight {...icon} />}
        </article>
      ))}
    </div>
  )
}

function IndexVisual({ indexed = false }) {
  return (
    <div className={`m3-index ${indexed ? 'indexed' : ''}`}>
      <section>
        <strong>{indexed ? 'With index on dept + cgpa' : 'Without index'}</strong>
        <span>{indexed ? 'MongoDB jumps to matching keys' : 'MongoDB scans many documents'}</span>
      </section>
      <div>
        {students.map((student) => (
          <i key={student.name} className={indexed && student.dept === 'ISE' ? 'hit' : ''}>{student.name.slice(0, 1)}</i>
        ))}
      </div>
      <Gauge size={42} strokeWidth={1.6} />
    </div>
  )
}

function DashboardVisual() {
  return (
    <div className="m3-dashboard">
      <article><strong>ISE avg CGPA</strong><span>8.43</span></article>
      <article><strong>Python learners</strong><span>3</span></article>
      <article><strong>Mysuru students</strong><span>3</span></article>
      <article className="wide"><strong>Report pipeline</strong><em>$match → $group → $avg → $sort</em></article>
    </div>
  )
}

function CardGrid({ items }) {
  return (
    <div className="m3-card-grid">
      {items.map(([title, text], index) => (
        <article key={`${title}-${index}`}><b>{String(index + 1).padStart(2, '0')}</b><strong>{title}</strong><span>{text}</span></article>
      ))}
    </div>
  )
}

function Questions({ questions }) {
  return (
    <div className="m3-questions">
      {questions.map((q, index) => <article key={q}><b>{index + 1}</b><span>{q}</span></article>)}
    </div>
  )
}

function MindMap() {
  const items = ['Why MongoDB', 'RDBMS terms', 'BSON types', 'Document model', 'CRUD', 'Filters', 'Arrays', 'Dot notation', 'Aggregation', 'Indexes']
  return (
    <div className="m3-mindmap">
      <strong>Module 3</strong>
      {items.map((item, index) => <span key={item} className={`p${index}`}>{item}</span>)}
    </div>
  )
}

const vivaQuestions = [
  'What is MongoDB?', 'Why MongoDB?', 'What is NoSQL?', 'What is a document?', 'What is a collection?',
  'What is BSON?', 'What is _id?', 'Table vs collection?', 'Row vs document?', 'What is ObjectId?',
  'Name MongoDB data types.', 'What is MQL?', 'What is insertOne?', 'What is find?', 'What is projection?',
  'What is sort?', 'What is limit?', 'What is skip?', 'What is aggregation?', 'What is index?',
]

const twoMarks = [
  'Define MongoDB.', 'What is BSON?', 'What is collection?', 'What is document?', 'What is _id?',
  'List any four MongoDB data types.', 'Write syntax for insertOne.', 'Write syntax for find.', 'What is projection?', 'What is aggregation?',
]

const fiveMarks = [
  'Explain what MongoDB is.', 'Explain why MongoDB is used.', 'Compare RDBMS and MongoDB terms.',
  'Explain MongoDB document model with example.', 'Explain BSON and data types.', 'Explain insert and find commands.',
  'Explain update and delete commands.', 'Explain sort, limit, skip, and count.', 'Explain aggregation pipeline.', 'Explain indexes in MongoDB.',
]

const tenMarks = [
  'Explain MongoDB, features, advantages, and use cases.',
  'Explain why MongoDB is preferred for flexible Big Data applications.',
  'Compare RDBMS and MongoDB with terminology and examples.',
  'Explain MongoDB data types with document examples.',
  'Explain MongoDB Query Language with CRUD, sort, limit, skip, count and aggregate.',
  'Explain document embedding and references with examples.',
  'Explain array queries and dot notation.',
  'Explain indexing and its trade-offs.',
  'Design a student profile document for a college ERP.',
  'Write a long-answer flow for MongoDB application workflow.',
]

export const module3Slides = [
  {
    id: 'm3-title',
    kicker: 'Big Data Analytics · Module 3',
    title: null,
    hideTitle: true,
    tone: 'bd-peak bd-m3',
    content: (
      <div className="m3-hero">
        <div>
          <p className="slide-kicker">VTU BIS701 · MongoDB</p>
          <h1>MongoDB through a Student ERP</h1>
          <p>Watch one student profile evolve from fixed SQL tables into a flexible BSON document — a dynamic digital library of records.</p>
          <BdaScaleStrip variant="mongodb" />
        </div>
        <OpeningDigitalLibrary />
      </div>
    ),
    notes: 'Open with the application story: student registration becomes profile, courses, attendance, marks, projects, skills, queries and reports.',
  },
  slide('m3-journey', 'Learning journey', 'The Module Follows One Application Data Path', (
    <Deck active={0} visual={<ErpTimeline />}>
      <p className="m3-lead">Instead of memorizing MongoDB first, students first see why a modern Student ERP creates flexible and changing data.</p>
      <Points items={['Start with stable SQL tables', 'Let profile fields grow naturally', 'Move related data into one document', 'Use MQL to create, read, update, delete and report', 'Finish with aggregation, indexes and exam-ready answers']} />
    </Deck>
  )),
  slide('m3-hadoop-bridge', 'Opening', 'Why MongoDB Follows Hadoop', (
    <Deck active={0} visual={<CardGrid items={[['Hadoop', 'large files and distributed processing'], ['NoSQL need', 'flexible application records'], ['MongoDB', 'document storage plus query language']]} />}>
      <p className="m3-lead">Module 2 showed large files moving through Hadoop. Module 3 shifts to flexible records created by applications.</p>
      <Takeaway>Hadoop handles large files; MongoDB handles flexible application data.</Takeaway>
    </Deck>
  )),
  slide('m3-sql-start', 'Schema pressure', 'The Portal Starts as Neat SQL Tables', (
    <Deck active={1} visual={<SqlTables stage={0} />}>
      <p className="m3-lead">At registration, SQL works beautifully: every student has a USN, name, department and semester.</p>
      <Points items={['Fixed columns are easy to validate', 'Stable transactions are clean', 'Reports over known columns are simple']} />
    </Deck>
  )),
  slide('m3-profile-grows', 'Schema pressure', 'Then the Student Profile Starts Growing', (
    <Deck active={1} visual={<SqlTables stage={3} joins />}>
      <p className="m3-lead">Skills, certificates, projects, address, internships, hackathons and social links arrive at different times for different students.</p>
      <Takeaway>More profile variety means more tables, more joins and more schema-change planning.</Takeaway>
    </Deck>
  )),
  slide('m3-why', 'Why MongoDB', 'MongoDB Becomes Useful When Records Are Application-Shaped', (
    <Deck active={2} visual={<DocumentCard level={5} />}>
      <p className="m3-lead">MongoDB is a NoSQL document database that stores data as flexible BSON documents inside collections, using JSON-like commands.</p>
      <Points items={['Documents in one collection need not have identical fields', 'Nested objects and arrays reduce unnecessary joins', 'JSON-like shape matches web and mobile app data', 'Designed for large datasets and distributed deployment']} />
    </Deck>
  )),
  slide('m3-good-fit', 'Why MongoDB', 'Good Fit: Flexible, Varied, High-Volume Records', (
    <Deck active={2} visual={<CardGrid items={[['Student profiles', 'skills, projects, achievements vary'], ['Event logs', 'semi-structured activity records'], ['Application backend', 'JSON-like records move quickly'], ['Analytics staging', 'flexible records before reports']]} />}>
      <p className="m3-lead">Use MongoDB by workload, not by fashion. It shines when the data shape follows the application.</p>
    </Deck>
  )),
  slide('m3-not-always', 'Why MongoDB', 'MongoDB Is Useful, Not a Universal Replacement', (
    <Deck active={2} visual={<CardGrid items={[['Prefer SQL', 'many strict relational joins'], ['Prefer SQL', 'small stable schema already solved'], ['Be careful', 'multi-row transaction-heavy workload'], ['Design needed', 'indexes and document shape still matter']]} />}>
      <p className="m3-lead">A strong answer is balanced: MongoDB solves flexible document problems, while SQL remains strong for highly relational stable systems.</p>
    </Deck>
  )),
  slide('m3-document-model', 'Document model', 'Student Becomes JSON, Document, Collection, Database', (
    <Deck active={2} visual={<div className="m3-transform"><StudentCard /><ArrowRight {...icon} /><DocumentCard level={4} /><ArrowRight {...icon} /><Database size={52} /></div>}>
      <p className="m3-lead">The mental model is connected: one real student becomes one document; documents live in a collection; collections live in a database.</p>
      <Takeaway>Student → JSON-like document → students collection → college database.</Takeaway>
    </Deck>
  )),
  slide('m3-terms', 'RDBMS terms', 'Translate SQL Words into MongoDB Words', (
    <Deck active={2} visual={<TermMorph />}>
      <p className="m3-lead">For exams, students can reproduce the terminology mapping as a two-column table.</p>
      <Points items={['Table becomes collection', 'Row or tuple becomes document', 'Column or attribute becomes field', 'Primary key becomes _id']} />
    </Deck>
  )),
  {
    id: 'm3-database-collection',
    kicker: 'RDBMS terms',
    title: 'Database and Collection Organize the ERP',
    tone: 'bd-peak bd-m3',
    content: (
      <Deck active={4} visual={<OpeningDigitalLibrary />}>
        <p className="m3-lead">A database is the logical container. A collection is a group of MongoDB documents, similar to a table but schema-flexible.</p>
        <Takeaway>`college.students` means the students collection inside the college database.</Takeaway>
      </Deck>
    ),
  },
  slide('m3-document-field', 'RDBMS terms', 'Document and Field Hold One Student Record', (
    <Deck active={2} visual={<DocumentCard level={6} highlight="address.city" />}>
      <p className="m3-lead">A document is one BSON object with field-value pairs. A field is a named data item inside that document.</p>
      <Points items={['The whole profile can be read together', 'Different students can have different optional fields', 'Nested paths keep related details grouped']} />
    </Deck>
  )),
  slide('m3-id', 'RDBMS terms', '_id Gives Every Document Identity', (
    <Deck active={2} visual={<DocumentCard level={2} highlight="_id" />}>
      <p className="m3-lead">Every MongoDB document has a mandatory unique `_id`. If the application does not supply one, MongoDB can generate an ObjectId.</p>
      <Takeaway>`_id` is required, unique, indexed and used to identify the document.</Takeaway>
    </Deck>
  )),
  slide('m3-embed', 'Document design', 'Embedding Reduces Join Pressure', (
    <Deck active={2} visual={<DocumentCard level={7} highlight="projects" />}>
      <p className="m3-lead">When data is usually read together, MongoDB can embed it inside the student document.</p>
      <Points items={['Embed one-to-few relationships', 'Embed small bounded arrays', 'Embed when atomic update is useful', 'Reference when the relationship grows or is shared']} />
    </Deck>
  )),
  slide('m3-references', 'Document design', 'References Still Matter for Large Relationships', (
    <Deck active={2} visual={<CardGrid items={[['Embed', 'address, small skills list, latest project'], ['Reference', 'large many-to-many course catalog'], ['Avoid', 'unbounded arrays that make documents bloated'], ['Rule', 'design from query patterns']]} />}>
      <p className="m3-lead">Schema flexibility does not remove design. It changes the design question from normalization-first to query-pattern-first.</p>
    </Deck>
  )),
  slide('m3-design-thinking', 'RDBMS vs MongoDB', 'Design Thinking Changes', (
    <Deck active={2} visual={<CardGrid items={[['RDBMS', 'normalize tables, avoid duplication, use joins'], ['MongoDB', 'model query patterns, embed related data'], ['RDBMS', 'schema before write'], ['MongoDB', 'schema can evolve with rules']]} />}>
      <p className="m3-lead">The comparison is not table versus no table; it is how the application reads and writes data.</p>
    </Deck>
  )),
  slide('m3-flexible-not-careless', 'Schema flexibility', 'Flexible Schema Still Needs Discipline', (
    <Deck active={2} visual={<CardGrid items={[['Rules', 'applications still need required fields'], ['Validation', 'important fields can be enforced'], ['Indexes', 'must match frequent queries'], ['Quality', 'bad document design causes slow queries']]} />}>
      <p className="m3-lead">NoSQL means flexible schema, not no planning.</p>
      <Takeaway>Flexible schema helps evolution, not carelessness.</Takeaway>
    </Deck>
  )),
  slide('m3-bson', 'BSON', 'MongoDB Stores BSON, Not Plain JSON Internally', (
    <Deck active={3} visual={<BsonFlow />}>
      <p className="m3-lead">BSON means Binary JSON: MongoDB’s storage and network format for JSON-like documents with richer data types.</p>
      <Points items={['JSON-like for developers', 'Binary encoded for storage and transfer', 'Typed so dates, numbers, ObjectId and arrays are understood', 'Efficient for document processing']} />
    </Deck>
  )),
  slide('m3-types-grow', 'Data types', 'Build One Student Document Type by Type', (
    <Deck active={3} visual={<DocumentCard level={8} />}>
      <p className="m3-lead">Do not memorize data types as a list. Watch the student document grow with string, number, boolean, date, array, embedded object and ObjectId.</p>
      <Takeaway>Correct BSON types make filtering, comparison and aggregation reliable.</Takeaway>
    </Deck>
  )),
  slide('m3-objectid-null', 'Data types', 'ObjectId and Null Explain Identity and Missing Values', (
    <Deck active={3} visual={<CardGrid items={[['ObjectId', '12-byte identifier commonly used for _id'], ['Null', 'explicitly empty or unavailable field'], ['Use case', 'profile picture may be null until uploaded'], ['Exam cue', 'mention _id when defining documents']]} />}>
      <p className="m3-lead">ObjectId identifies documents; Null represents an intentionally empty value.</p>
    </Deck>
  )),
  slide('m3-nested-array', 'Data types', 'Embedded Objects and Arrays Keep Related Values Together', (
    <Deck active={7} visual={<DocumentCard level={6} highlight="skills" />}>
      <p className="m3-lead">Address is an embedded object. Skills and marks are arrays. They live naturally inside a student profile.</p>
      <Code focus="address.city">{`profile = {
  name: 'Asha',
  address: { city: 'Mysuru', pin: 570001 },
  marks: [78, 82, 91]
}`}</Code>
    </Deck>
  )),
  slide('m3-type-mistakes', 'Data types', 'Type Mistakes Break Good Queries', (
    <Deck active={3} visual={<CardGrid items={[['Mistake', 'store numbers and dates as strings'], ['Correction', 'use proper BSON numeric and date types'], ['Mistake', 'huge unbounded arrays'], ['Correction', 'reference large relationships']]} />}>
      <p className="m3-lead">If CGPA is stored as text, comparison operators stop feeling natural. If dates are text, time-based reports become fragile.</p>
    </Deck>
  )),
  {
    id: 'm3-mql-hero',
    kicker: 'MQL hero',
    title: 'MongoDB Query Language Changes the Document',
    tone: 'bd-peak bd-m3',
    content: (
      <Deck active={5} visual={<HeroScene beat="Organization" metaphor="The librarian’s language for a flexible collection" className="bo-library"><CardGrid items={[['create', 'insert a student'], ['find', 'read matching students'], ['update', 'change CGPA or skills'], ['delete', 'remove selected document'], ['aggregate', 'convert records to dashboard']]} /></HeroScene>}>
        <p className="m3-lead">MQL uses collection methods and JSON-like documents to create, read, update, delete, filter, sort and aggregate data.</p>
        <Takeaway>Read commands as `db.collection.method(filter, action)`.</Takeaway>
      </Deck>
    ),
  },
  slide('m3-command-pattern', 'MQL', 'Every Command Follows One Mental Pattern', (
    <Deck active={5} visual={<div className="m3-command-pattern">{['use database', 'choose collection', 'choose method', 'pass document', 'get result'].map((x) => <span key={x}>{x}</span>)}</div>}>
      <p className="m3-lead">Students should read a MongoDB command from left to right: choose where, choose what operation, pass a JSON-like document.</p>
    </Deck>
  )),
  slide('m3-create-db', 'Lab commands', 'Create the ERP Database and Students Collection', (
    <Deck active={5} visual={<CommandLab command={`use college

db.createCollection('students')

db.students.insertOne({
  name: 'Asha', dept: 'ISE'
})`} result="college database now has a students collection with its first document." takeaway="Collections can also be created implicitly on first insert." focus="createCollection" />}>
      <p className="m3-lead">The lab begins by choosing the database and preparing the collection used throughout the module.</p>
    </Deck>
  )),
  slide('m3-insert-one', 'CRUD', 'Create: insertOne Makes Asha Appear', (
    <Deck active={5} visual={<CommandLab command={`db.students.insertOne({
  usn: '4AB23IS001',
  name: 'Asha',
  dept: 'ISE',
  cgpa: 8.6
})`} result="Asha is now a document inside students." takeaway="insertOne takes one JSON-like document." focus="insertOne" />}>
      <p className="m3-lead">Create means a new student profile enters the collection.</p>
    </Deck>
  )),
  slide('m3-insert-many', 'CRUD', 'Create Many: insertMany Builds the Class', (
    <Deck active={5} visual={<CollectionVisual />}>
      <CommandLab command={`db.students.insertMany([
  { name: 'Asha', cgpa: 8.6 },
  { name: 'Rahul', cgpa: 7.9 },
  { name: 'Meera', cgpa: 9.1 }
])`} result="multiple student documents appear together." takeaway="insertMany takes an array of documents." focus="insertMany" />
    </Deck>
  )),
  slide('m3-find-all', 'CRUD', 'Read: find Shows the Collection', (
    <Deck active={6} visual={<CommandLab command={`db.students.find()

db.students.find().pretty()`} result="all student documents are returned." takeaway="find without a filter reads all matching documents." focus="find" />}>
      <p className="m3-lead">Read starts with seeing what currently exists in `students`.</p>
    </Deck>
  )),
  slide('m3-filter-equality', 'Filtering', 'Filter: Only ISE Students Match', (
    <Deck active={6} visual={<CollectionVisual highlight="cgpa" />}>
      <CommandLab command={`db.students.find({
  dept: 'ISE'
})`} result="documents with dept equal to ISE are highlighted." takeaway="Equality filter uses field: value." focus="dept" />
    </Deck>
  )),
  slide('m3-comparison', 'Operators', 'Comparison Operator: CGPA Greater Than or Equal to 8', (
    <Deck active={6} visual={<CollectionVisual highlight="cgpa" />}>
      <CommandLab command={`db.students.find({
  cgpa: { $gte: 8.0 }
})`} result="students with CGPA >= 8 glow." takeaway="$gte means greater than or equal; also know $gt, $lt, $lte, $ne." focus="$gte" />
    </Deck>
  )),
  slide('m3-logical', 'Operators', 'Logical Operators Combine Conditions', (
    <Deck active={6} visual={<CommandLab command={`db.students.find({
  $and: [
    { dept: 'ISE' },
    { cgpa: { $gte: 8.0 } }
  ]
})`} result="only ISE students with strong CGPA remain." takeaway="$and and $or make multi-condition filters explicit." focus="$and" />}>
      <p className="m3-lead">In real ERP screens, filters rarely use only one condition.</p>
    </Deck>
  )),
  slide('m3-projection', 'Projection', 'Projection Returns Only Needed Fields', (
    <Deck active={6} visual={<CommandLab command={`db.students.find(
  { dept: 'ISE' },
  { name: 1, cgpa: 1, _id: 0 }
)`} result="the report shows only name and CGPA." takeaway="First document is filter; second document is projection." focus="name" />}>
      <p className="m3-lead">Projection avoids returning unnecessary data to the application.</p>
    </Deck>
  )),
  slide('m3-sort', 'Sort', 'Sort Rearranges Students by CGPA', (
    <Deck active={6} visual={<SortLimitSkip mode="sort" />}>
      <CommandLab command={`db.students.find()
  .sort({ cgpa: -1 })`} result="highest CGPA appears first." takeaway="1 means ascending; -1 means descending." focus="sort" />
    </Deck>
  )),
  slide('m3-limit', 'Limit', 'Limit Keeps Only the First Few Results', (
    <Deck active={6} visual={<SortLimitSkip mode="limit" />}>
      <CommandLab command={`db.students.find()
  .sort({ cgpa: -1 })
  .limit(4)`} result="only four ranked students remain visible." takeaway="limit is useful for top-N lists." focus="limit" />
    </Deck>
  )),
  slide('m3-skip', 'Skip', 'Skip Explains Pagination', (
    <Deck active={6} visual={<SortLimitSkip mode="skip" />}>
      <CommandLab command={`db.students.find()
  .sort({ cgpa: -1 })
  .skip(2)
  .limit(3)`} result="page two starts after the first two records." takeaway="skip plus limit creates simple pagination." focus="skip" />
    </Deck>
  )),
  slide('m3-count', 'Count', 'Count Answers How Many Documents Match', (
    <Deck active={6} visual={<CommandLab command={`db.students.countDocuments({
  dept: 'ISE'
})`} result="counter returns the number of ISE student documents." takeaway="countDocuments is a quick summary before aggregation." focus="countDocuments" />}>
      <p className="m3-lead">Count turns a filtered collection into one number.</p>
    </Deck>
  )),
  slide('m3-update-one', 'CRUD', 'Update: CGPA Changes Inside the Document', (
    <Deck active={5} visual={<DocumentCard level={8} highlight="cgpa" />}>
      <CommandLab command={`db.students.updateOne(
  { usn: '4AB23IS001' },
  { $set: { cgpa: 8.8 } }
)`} result="Asha's CGPA changes from 8.6 to 8.8." takeaway="$set updates the selected field." focus="$set" />
    </Deck>
  )),
  slide('m3-update-many', 'CRUD', 'Update Many: Semester Added to ISE Students', (
    <Deck active={5} visual={<CollectionVisual highlight="cgpa" />}>
      <CommandLab command={`db.students.updateMany(
  { dept: 'ISE' },
  { $set: { semester: 7 } }
)`} result="every matching ISE document receives semester: 7." takeaway="Always check the filter before bulk update." focus="updateMany" />
    </Deck>
  )),
  slide('m3-delete', 'CRUD', 'Delete: The Selected Student Disappears', (
    <Deck active={5} visual={<CollectionVisual deleted />}>
      <CommandLab command={`db.students.deleteOne({
  usn: '4AB23IS001'
})

db.students.deleteMany({ dept: 'ISE' })`} result="the selected document is removed; collection shrinks." takeaway="Delete commands are powerful; filters must be checked carefully." focus="deleteOne" />
    </Deck>
  )),
  slide('m3-operators', 'Operators', 'Operators Are the Vocabulary of MQL', (
    <Deck active={6} visual={<CardGrid items={[['Comparison', '$eq, $ne, $gt, $gte, $lt, $lte'], ['Logical', '$and, $or, $not, $nor'], ['Array', '$in, $nin, $all, $size'], ['Update', '$set, $unset, $inc, $push']]} />}>
      <p className="m3-lead">Operators tell MongoDB how to compare, combine, search arrays and modify documents.</p>
    </Deck>
  )),
  slide('m3-array-query', 'Array query', 'Array Query Finds Python or Java Skills', (
    <Deck active={7} visual={<CollectionVisual highlight="python" />}>
      <CommandLab command={`db.students.find({
  skills: 'Python'
})

db.students.find({
  skills: { $in: ['Python', 'Java'] }
})`} result="students whose skills array contains Python or Java are highlighted." takeaway="Arrays can be queried by contained values." focus="$in" />
    </Deck>
  )),
  slide('m3-dot-notation', 'Dot notation', 'Dot Notation Walks Into Nested Documents', (
    <Deck active={7} visual={<DocumentCard level={7} highlight="address.city" />}>
      <CommandLab command={`db.students.find({
  'address.city': 'Mysuru'
})`} result="MongoDB follows address → city → Mysuru." takeaway="Use dot notation for nested fields." focus="address.city" />
    </Deck>
  )),
  slide('m3-aggregation-intro', 'Aggregation', 'Aggregation Transforms Documents Step by Step', (
    <Deck active={8} visual={<PipelineVisual />}>
      <p className="m3-lead">Aggregation is the cinematic reporting section: documents flow through stages and become insight.</p>
      <Points items={['$match filters documents', '$group combines documents', '$avg calculates department average', '$sort ranks the result', '$project controls final shape']} />
    </Deck>
  )),
  slide('m3-aggregation-example', 'Aggregation', 'Average CGPA by Department Becomes a Dashboard', (
    <Deck active={8} visual={<CommandLab command={`db.students.aggregate([
  { $group: {
      _id: '$dept',
      avgCgpa: { $avg: '$cgpa' }
  }},
  { $sort: { avgCgpa: -1 } }
])`} result="department-wise average CGPA report is produced." takeaway="Aggregation converts raw documents into summaries." focus="$group" />}>
      <p className="m3-lead">The ERP report is no longer a list of students; it is department insight.</p>
    </Deck>
  )),
  slide('m3-index-why', 'Index', 'Without an Index, MongoDB Scans Too Much', (
    <Deck active={9} visual={<IndexVisual />}>
      <p className="m3-lead">Indexing is like a textbook index: instead of reading every page, jump to the right entries.</p>
      <Points items={['Without index, many documents are scanned', 'With index, frequent lookups are faster', 'Indexes cost storage', 'Indexes add write overhead']} />
    </Deck>
  )),
  slide('m3-index-create', 'Index', 'Create an Index for the Query Pattern', (
    <Deck active={9} visual={<IndexVisual indexed />}>
      <CommandLab command={`db.students.createIndex({
  dept: 1,
  cgpa: -1
})`} result="department and CGPA lookups become faster for matching reports." takeaway="Index fields should match frequent filters and sorts." focus="createIndex" />
    </Deck>
  )),
  slide('m3-lab-map', 'Lab commands', 'The Syllabus Lab Commands in One Control Board', (
    <Deck active={5} visual={<CardGrid items={[['insert', 'insertOne / insertMany'], ['find', 'filter and projection'], ['update', 'updateOne / updateMany'], ['delete', 'deleteOne / deleteMany'], ['report', 'sort, limit, skip, count, aggregate']]} />}>
      <p className="m3-lead">All practical commands use the same `students` collection so the data story never resets.</p>
    </Deck>
  )),
  slide('m3-workflow', 'Application workflow', 'Full MongoDB Application Workflow', (
    <Deck active={8} visual={<div className="m3-app-workflow">{['Design', 'App request', 'MQL command', 'Collection', 'Documents', 'Response'].map((x) => <span key={x}>{x}</span>)}</div>}>
      <p className="m3-lead">The ERP screen sends a request, MQL acts on `students`, documents change, and the response returns to the app.</p>
      <Takeaway>Students should always know where the application data currently is.</Takeaway>
    </Deck>
  )),
  slide('m3-dashboard', 'Analytics', 'Raw Documents Become Student ERP Analytics', (
    <Deck active={8} visual={<DashboardVisual />}>
      <p className="m3-lead">MongoDB is not only storage. With aggregation, student records become dashboards for departments, skills and attendance.</p>
    </Deck>
  )),
  slide('m3-mistakes', 'Common mistakes', 'Fix These Before the Exam and Lab', (
    <Deck active={10} visual={<CardGrid items={[['Design', 'flexible schema still needs planning'], ['Indexes', 'add them for frequent query patterns'], ['Arrays', 'avoid unbounded growth'], ['Types', 'do not store dates and numbers as strings'], ['Safety', 'check update/delete filters first']]} />}>
      <p className="m3-lead">Most MongoDB mistakes are not syntax mistakes. They are modeling and filtering mistakes.</p>
    </Deck>
  )),
  slide('m3-mindmap', 'Summary', 'Module 3 in One Mind Map', (
    <Deck tight active={10} visual={<MindMap />}>
      <p className="m3-lead">The whole module now has one memory path: why MongoDB, document model, BSON types, MQL CRUD, filtering, aggregation and indexing.</p>
    </Deck>
  )),
  slide('m3-exam-tips', 'Exam preparation', 'Exam-Writing Shortcuts', (
    <Deck active={10} visual={<CardGrid items={[['Definition', 'NoSQL + document + collection + BSON'], ['Comparison', 'two-column RDBMS vs MongoDB terms'], ['Data types', 'explain through one student document'], ['MQL', 'syntax plus visual result'], ['Aggregation', 'draw a stage pipeline']]} />}>
      <p className="m3-lead">Turn concepts into marks by writing definition, mapping, example, command and takeaway.</p>
    </Deck>
  )),
  slide('m3-viva', 'Viva', '20 Important Viva Questions', (
    <Deck tight active={10} visual={<Questions questions={vivaQuestions} />}>
      <p className="m3-lead">Rapid oral revision: answer each in one crisp sentence using the Student ERP example.</p>
    </Deck>
  )),
  slide('m3-two-mark', '2 marks', 'Two-Mark Question Bank', (
    <Deck tight active={10} visual={<Questions questions={twoMarks} />}>
      <p className="m3-lead">Two-mark answers need exact definitions, correct terms and one small example where possible.</p>
    </Deck>
  )),
  slide('m3-five-mark', '5 marks', 'Five-Mark Question Bank', (
    <Deck tight active={10} visual={<Questions questions={fiveMarks} />}>
      <p className="m3-lead">Five-mark answers should include a small diagram, syntax and a student-document example.</p>
    </Deck>
  )),
  slide('m3-ten-mark', '10 marks', 'Ten-Mark Question Bank', (
    <Deck tight active={10} visual={<Questions questions={tenMarks} />}>
      <p className="m3-lead">Long answers need story, definition, concept diagram, command examples, output and conclusion.</p>
    </Deck>
  )),
  slide('m3-revision', 'Revision', 'One-Page Keyword Sheet', (
    <Deck active={10} visual={<div className="m3-keywords">MongoDB · NoSQL · database · collection · document · field · _id · ObjectId · BSON · string · number · boolean · date · array · embedded document · insertOne · insertMany · find · projection · updateOne · deleteOne · sort · limit · skip · countDocuments · aggregate · $match · $group · $sort · index</div>}>
      <p className="m3-lead">End revision by explaining the full module using only these keywords.</p>
      <Takeaway>Traditional SQL works for stable structured data; MongoDB helps modern flexible application records become queryable documents and reports.</Takeaway>
    </Deck>
  )),
  {
    id: 'm3-end',
    kicker: 'Module 3 complete',
    title: null,
    hideTitle: true,
    tone: 'bd-peak bd-m3',
    content: (
      <div className="m3-end">
        <OpeningDigitalLibrary />
        <h2>Students should now understand why MongoDB exists.</h2>
        <p>SQL schema pressure to flexible BSON document to MQL commands to aggregation dashboard to indexed lookup.</p>
      </div>
    ),
  },
]

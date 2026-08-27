import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BookOpen,
  Boxes,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Code2,
  Database,
  Factory,
  FileSpreadsheet,
  FolderTree,
  GraduationCap,
  HardDrive,
  Library,
  PackageOpen,
  Search,
  Sparkles,
  Table2,
  Tags,
  UserRoundCog,
  UsersRound,
  Warehouse,
  Workflow,
  Wrench,
} from 'lucide-react'
import { BdaScaleStrip, HeroScene } from './components/BdaKit'
import { OpeningAnalyticsForge } from './components/BdaOpenings'

const icon = { size: 24, strokeWidth: 1.75, 'aria-hidden': true }

const story = [
  'HDFS',
  'Raw CSV',
  'Messy Data',
  'Pig Clean',
  'Clean Zone',
  'Hive Warehouse',
  'HQL',
  'Jobs',
  'Dashboard',
  'Exam',
]

const rawRows = [
  { usn: '4AB23IS001', name: 'Asha R', dept: 'ISE', attendance: '92', cgpa: '8.8', issue: '' },
  { usn: '4AB23CS011', name: 'Rahul S', dept: 'CSE ', attendance: '', cgpa: '7.9', issue: 'missing' },
  { usn: '4AB23AI022', name: 'Meera P', dept: 'AI&ML', attendance: '88', cgpa: '', issue: 'blank' },
  { usn: '4AB23EC033', name: 'Kiran M', dept: 'E&C', attendance: '76', cgpa: '8.2', issue: 'wrong' },
  { usn: '4AB23IS001', name: 'Asha R', dept: 'ISE', attendance: '92', cgpa: '8.8', issue: 'duplicate' },
]

const cleanRows = [
  { usn: '4AB23IS001', name: 'Asha R', dept: 'ISE', attendance: 92, cgpa: 8.8 },
  { usn: '4AB23CS011', name: 'Rahul S', dept: 'CSE', attendance: 0, cgpa: 7.9 },
  { usn: '4AB23AI022', name: 'Meera P', dept: 'AIML', attendance: 88, cgpa: 0 },
  { usn: '4AB23EC033', name: 'Kiran M', dept: 'ECE', attendance: 76, cgpa: 8.2 },
]

const hiveArchitecture = ['User', 'HQL', 'Driver', 'Compiler', 'Metastore', 'Execution Engine', 'MapReduce/Tez', 'HDFS', 'Results']
const pigArchitecture = ['Pig Script', 'Parser', 'Optimizer', 'Compiler', 'Execution Engine', 'Hadoop', 'Results']

const vivaQuestions = [
  'What is Hive?',
  'Why is Hive needed above Hadoop?',
  'What is HQL?',
  'What does the Hive metastore store?',
  'Name primitive Hive data types.',
  'What are ARRAY, MAP and STRUCT?',
  'What is RCFile?',
  'Managed table vs external table?',
  'What is partition pruning?',
  'What is bucketing?',
  'What is Hive UDF?',
  'What is Pig?',
  'Why is Pig useful for ETL?',
  'What is Pig Latin?',
  'What is Grunt shell?',
  'Local mode vs MapReduce mode?',
  'What do LOAD, FILTER and FOREACH do?',
  'What is a bag in Pig?',
  'What is Piggy Bank?',
  'When should Pig be chosen over Hive?',
]

const twoMarks = [
  'Define Hive.',
  'What is HQL?',
  'Define metastore.',
  'Name two Hive file formats.',
  'What is RCFile?',
  'Define Pig.',
  'What is Pig Latin?',
  'What is Grunt shell?',
  'What is Piggy Bank?',
  'Define Pig UDF.',
]

const fiveMarks = [
  'Explain Hive architecture.',
  'Explain Hive data types using a student table.',
  'Explain Hive file formats and RCFile.',
  'Explain HQL with CREATE, LOAD and SELECT examples.',
  'Explain partitioning and bucketing.',
  'Explain Hive UDF with an example.',
  'Explain Pig anatomy.',
  'Explain Pig on Hadoop and execution modes.',
  'Explain Pig Latin relational and eval operators.',
  'Compare Pig and Hive.',
]

const tenMarks = [
  'Explain Hive architecture, metastore, HQL and file formats.',
  'Explain Hive data types, RCFile, partitioning, bucketing and UDF.',
  'Explain Pig, anatomy, philosophy, use cases and Pig on Hadoop.',
  'Explain Pig Latin overview, data types, execution modes and HDFS commands.',
  'Explain Pig relational operators, eval functions, complex types, Piggy Bank, UDF and Pig vs Hive.',
  'Previous-year theme: Hive architecture and metastore.',
  'Previous-year theme: HQL commands with examples.',
  'Previous-year theme: RCFile and columnar storage.',
  'Previous-year theme: Pig Latin operators and complex types.',
  'Previous-year theme: Pig vs Hive workload comparison.',
]

function on(stage, at = 0) {
  return stage >= at ? 'is-on' : ''
}

function slide(id, kicker, title, content, notes) {
  return { id, kicker, title, content, notes }
}

function Deck({ children, visual, active = 0, reverse = false, tight = false }) {
  return (
    <div className={`m4-decklet ${reverse ? 'reverse' : ''} ${tight ? 'tight' : ''}`.trim()}>
      <aside className="m4-story" aria-label="Digital Campus data journey">
        {story.map((item, index) => (
          <span key={item} className={`${index <= active ? 'lit' : ''} ${index === active ? 'now' : ''}`.trim()}>
            {item}
          </span>
        ))}
      </aside>
      <div className="m4-copy">{children}</div>
      <div className="m4-visual">{visual}</div>
    </div>
  )
}

function Points({ items, stage = 999 }) {
  return (
    <ul className="m4-points">
      {items.map((item, index) => <li key={item} className={on(stage, index)}>{item}</li>)}
    </ul>
  )
}

function Takeaway({ children }) {
  return <p className="m4-takeaway"><CheckCircle2 {...icon} />{children}</p>
}

function Code({ children, focus }) {
  return (
    <pre className="m4-code">
      {String(children).trim().split('\n').map((line, index) => (
        <code key={`${line}-${index}`} className={focus && line.includes(focus) ? 'focus' : ''}>{line}</code>
      ))}
    </pre>
  )
}

function CampusSources() {
  const sources = [
    ['Attendance', ClipboardList],
    ['Marks', GraduationCap],
    ['Library', Library],
    ['LMS', BookOpen],
    ['Placement', BriefcaseBusiness],
    ['Transport', Factory],
  ]
  return (
    <div className="m4-sources">
      {sources.map(([label, Icon]) => (
        <article key={label}>
          <Icon {...icon} />
          <strong>{label}</strong>
          <span>CSV</span>
        </article>
      ))}
    </div>
  )
}

function HdfsStack({ label = 'HDFS /data/raw', clean = false }) {
  return (
    <div className={`m4-hdfs ${clean ? 'clean' : ''}`}>
      <HardDrive size={42} strokeWidth={1.5} />
      <strong>{label}</strong>
      <span>{clean ? 'validated student records' : 'distributed campus files'}</span>
      <i /><i /><i />
    </div>
  )
}

function MasterFlow({ stage = 8 }) {
  const steps = [
    ['Raw CSV Files', FileSpreadsheet],
    ['Stored in HDFS', HardDrive],
    ['Messy data', Tags],
    ['Pig cleans data', Wrench],
    ['Clean data stored', FolderTree],
    ['Hive warehouse', Warehouse],
    ['Business HQL', Code2],
    ['Dashboard', BarChart3],
  ]
  return (
    <div className="m4-master-flow">
      {steps.map(([label, Icon], index) => (
        <article key={label} className={index <= stage ? 'lit' : ''}>
          <Icon {...icon} />
          <strong>{label}</strong>
          {index < steps.length - 1 && <ArrowDown size={20} strokeWidth={1.8} />}
        </article>
      ))}
    </div>
  )
}

function StudentTable({ cleaned = false, highlight, compact = false }) {
  const rows = cleaned ? cleanRows : rawRows
  return (
    <div className={`m4-table ${compact ? 'compact' : ''}`}>
      <header><Table2 {...icon} /><strong>{cleaned ? 'clean_student_records' : 'raw_student_records.csv'}</strong></header>
      <div className="m4-table-grid">
        <b>USN</b><b>Name</b><b>Dept</b><b>Att.</b><b>CGPA</b>
        {rows.map((row, index) => (
          <div key={`${row.usn}-${index}`} className={row.issue || highlight === row.dept || highlight === row.usn ? 'hot' : ''}>
            <span>{row.usn}</span><span>{row.name || '-'}</span><span>{row.dept || '-'}</span><span>{row.attendance || '-'}</span><span>{row.cgpa || '-'}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SplitDecision() {
  return (
    <div className="m4-split">
      <article>
        <UsersRound size={42} strokeWidth={1.5} />
        <strong>Business Analyst</strong>
        <span>SQL questions, reports, dashboards</span>
        <b>Hive</b>
      </article>
      <article>
        <UserRoundCog size={42} strokeWidth={1.5} />
        <strong>Data Engineer</strong>
        <span>cleaning, pipelines, transformations</span>
        <b>Pig</b>
      </article>
      <p>Both generate Hadoop jobs underneath.</p>
    </div>
  )
}

function Architecture({ steps, active = steps.length - 1, variant = 'hive' }) {
  return (
    <div className={`m4-architecture ${variant}`}>
      {steps.map((step, index) => (
        <article key={step} className={index <= active ? 'lit' : ''}>
          <span>{index + 1}</span>
          <strong>{step}</strong>
          {index < steps.length - 1 && <ArrowRight size={20} strokeWidth={1.8} />}
        </article>
      ))}
    </div>
  )
}

function MetastoreCatalog() {
  const rows = [
    ['Book name', 'Table name'],
    ['Shelf', 'HDFS location'],
    ['Author', 'Owner/schema'],
    ['Section', 'Partition'],
    ['Index card', 'Columns and types'],
  ]
  return (
    <div className="m4-catalog">
      <article>
        <Library size={42} strokeWidth={1.5} />
        <strong>Library catalog</strong>
        <span>does not store books</span>
      </article>
      <ArrowRight {...icon} />
      <article>
        <Database size={42} strokeWidth={1.5} />
        <strong>Hive metastore</strong>
        <span>does not store rows</span>
      </article>
      <div>
        {rows.map(([library, hive]) => <p key={library}><span>{library}</span><b>{hive}</b></p>)}
      </div>
    </div>
  )
}

function HqlExecution({ stage = 5 }) {
  const steps = [
    ['SELECT', 'name, dept, cgpa'],
    ['FROM', 'clean_student_records'],
    ['WHERE', 'cgpa >= 8.0'],
    ['GROUP BY', 'dept'],
    ['AVG()', 'average cgpa'],
    ['ORDER BY', 'highest first'],
  ]
  return (
    <div className="m4-hql-exec">
      <Code focus={steps[Math.min(stage, steps.length - 1)][0]}>{`SELECT dept, AVG(cgpa) AS avg_cgpa
FROM clean_student_records
WHERE attendance >= 75
GROUP BY dept
ORDER BY avg_cgpa DESC;`}</Code>
      <div>
        {steps.map(([keyword, meaning], index) => (
          <article key={keyword} className={index <= stage ? 'lit' : ''}>
            <strong>{keyword}</strong>
            <span>{meaning}</span>
          </article>
        ))}
      </div>
    </div>
  )
}

function SchemaGrow({ stage = 6 }) {
  const fields = [
    ['usn', 'STRING', 'student id'],
    ['attendance', 'INT', 'percentage'],
    ['cgpa', 'DOUBLE', 'score'],
    ['placed', 'BOOLEAN', 'status'],
    ['admission_date', 'DATE', 'date'],
    ['skills', 'ARRAY<STRING>', 'list'],
    ['scores', 'MAP<STRING,INT>', 'course marks'],
    ['mentor', 'STRUCT<name:STRING,room:STRING>', 'nested fields'],
  ]
  return (
    <div className="m4-schema">
      {fields.map(([name, type, note], index) => (
        <p key={name} className={index <= stage ? 'lit' : ''}>
          <span>{name}</span><code>{type}</code><em>{note}</em>
        </p>
      ))}
    </div>
  )
}

function FileFormatFlow({ active = 5 }) {
  const items = [
    ['CSV', 'raw and readable'],
    ['TextFile', 'simple Hadoop text'],
    ['SequenceFile', 'binary key-value'],
    ['RCFile', 'row groups + column chunks'],
    ['ORC', 'optimized Hive columnar'],
    ['Parquet', 'modern analytics columnar'],
  ]
  return (
    <div className="m4-format-flow">
      {items.map(([name, note], index) => (
        <article key={name} className={index <= active ? 'lit' : ''}>
          <FileSpreadsheet {...icon} />
          <strong>{name}</strong>
          <span>{note}</span>
        </article>
      ))}
    </div>
  )
}

function RcFileVisual() {
  return (
    <div className="m4-rcfile">
      <section>
        <strong>Row storage</strong>
        {['Asha,ISE,8.8,92', 'Rahul,CSE,7.9,0', 'Meera,AIML,0,88'].map((row) => <span key={row}>{row}</span>)}
      </section>
      <ArrowRight {...icon} />
      <section>
        <strong>Column chunks</strong>
        <p><b>dept</b><b>cgpa</b><b>attendance</b></p>
        <p><span>ISE CSE AIML</span><span>8.8 7.9 0</span><span>92 0 88</span></p>
      </section>
      <ArrowRight {...icon} />
      <section className="hot">
        <strong>Analytics read</strong>
        <span>read only needed columns</span>
        <span>compress similar values</span>
      </section>
    </div>
  )
}

function PartitionVisual() {
  return (
    <div className="m4-partitions">
      {['2023', '2024', '2025', '2026'].map((year) => (
        <article key={year} className={year === '2026' ? 'hot' : ''}>
          <FolderTree {...icon} />
          <strong>year={year}</strong>
          <span>{year === '2026' ? 'query scans this folder' : 'skipped'}</span>
        </article>
      ))}
    </div>
  )
}

function BucketVisual() {
  return (
    <div className="m4-buckets">
      <div>
        {cleanRows.map((row) => <span key={row.usn}>{row.name}<b>{row.cgpa}</b></span>)}
      </div>
      <ArrowDown {...icon} />
      <section>
        {['Bucket 1', 'Bucket 2', 'Bucket 3', 'Bucket 4'].map((bucket, index) => (
          <article key={bucket}>
            <Boxes {...icon} />
            <strong>{bucket}</strong>
            <span>hash(CGPA) = {index}</span>
          </article>
        ))}
      </section>
    </div>
  )
}

function OwnershipVisual({ external = false }) {
  return (
    <div className="m4-ownership">
      <article>
        <Warehouse size={44} strokeWidth={1.5} />
        <strong>{external ? 'External table' : 'Managed table'}</strong>
        <span>{external ? 'Hive owns metadata only' : 'Hive owns metadata and files'}</span>
      </article>
      <ArrowRight {...icon} />
      <article className="danger">
        <PackageOpen size={44} strokeWidth={1.5} />
        <strong>DROP TABLE</strong>
        <span>{external ? 'HDFS files remain' : 'metadata and data deleted'}</span>
      </article>
    </div>
  )
}

function UdfVisual({ tool = 'Hive' }) {
  return (
    <div className="m4-udf">
      <article><Search {...icon} /><strong>Need</strong><span>grade classification</span></article>
      <ArrowRight {...icon} />
      <article><Code2 {...icon} /><strong>{tool} UDF</strong><span>custom reusable logic</span></article>
      <ArrowRight {...icon} />
      <article className="hot"><Sparkles {...icon} /><strong>Output</strong><span>Distinction / First class</span></article>
    </div>
  )
}

function PigPipeline({ stage = 4 }) {
  const ops = [
    ['LOAD', 'students appear'],
    ['FILTER', 'bad rows removed'],
    ['FOREACH', 'fields normalized'],
    ['GROUP', 'departments formed'],
    ['STORE', 'clean output saved'],
  ]
  return (
    <div className="m4-pig-pipeline">
      {ops.map(([op, note], index) => (
        <article key={op} className={index <= stage ? 'lit' : ''}>
          <strong>{op}</strong>
          <span>{note}</span>
        </article>
      ))}
    </div>
  )
}

function CookingAnalogy() {
  const rows = [
    ['Ingredients', 'LOAD'],
    ['Wash', 'FILTER'],
    ['Cut', 'FOREACH'],
    ['Cook', 'GROUP'],
    ['Serve', 'STORE'],
  ]
  return (
    <div className="m4-cooking">
      {rows.map(([cook, pig]) => <p key={cook}><span>{cook}</span><ArrowRight size={18} /><strong>{pig}</strong></p>)}
    </div>
  )
}

function OperatorVisual({ op = 'LOAD' }) {
  const notes = {
    LOAD: 'student rows enter the relation',
    FILTER: 'weak or invalid rows disappear',
    GROUP: 'students collect by department',
    FOREACH: 'only required fields remain',
    JOIN: 'department names attach to records',
    ORDER: 'highest CGPA appears first',
    LIMIT: 'top 10 students remain',
  }
  return (
    <div className={`m4-operator op-${op.toLowerCase()}`}>
      <StudentTable cleaned compact />
      <ArrowDown {...icon} />
      <article>
        <strong>{op}</strong>
        <span>{notes[op]}</span>
      </article>
    </div>
  )
}

function EvalDashboard() {
  return (
    <div className="m4-eval-dashboard">
      {[
        ['ISE', 'COUNT 1', 'AVG 8.8', 'MAX 8.8'],
        ['CSE', 'COUNT 1', 'AVG 7.9', 'MAX 7.9'],
        ['AIML', 'COUNT 1', 'AVG 0.0', 'MAX 0.0'],
        ['ECE', 'COUNT 1', 'AVG 8.2', 'MAX 8.2'],
      ].map(([dept, count, avg, max]) => (
        <article key={dept}><strong>{dept}</strong><span>{count}</span><span>{avg}</span><span>{max}</span></article>
      ))}
    </div>
  )
}

function ComplexTypes() {
  return (
    <div className="m4-complex-types">
      <article><strong>Tuple</strong><code>(4AB23IS001, Asha, 8.8)</code><span>one ordered student record</span></article>
      <article><strong>Bag</strong><code>{'{(Asha),(Rahul),(Meera)}'}</code><span>collection of tuples in a group</span></article>
      <article><strong>Map</strong><code>['city'#'Mysuru']</code><span>key-value lookup</span></article>
    </div>
  )
}

function HdfsCommands({ command = 'mkdir' }) {
  const details = {
    mkdir: ['hdfs dfs -mkdir /v/digital/raw', 'Folder appears for incoming CSV files.'],
    put: ['hdfs dfs -put students.csv /v/digital/raw', 'Local file moves into HDFS.'],
    ls: ['hdfs dfs -ls /v/digital/raw', 'Stored files are listed.'],
    cat: ['hdfs dfs -cat /v/digital/raw/students.csv', 'A preview is printed.'],
  }
  return (
    <div className="m4-hdfs-command">
      <Code focus={command}>{details[command][0]}</Code>
      <ArrowDown {...icon} />
      <HdfsStack label="/v/digital/raw" />
      <p>{details[command][1]}</p>
    </div>
  )
}

function Questions({ questions }) {
  return (
    <div className="m4-questions">
      {questions.map((question, index) => (
        <article key={question}>
          <b>{index + 1}</b>
          <span>{question}</span>
        </article>
      ))}
    </div>
  )
}

function MindMap() {
  const items = ['Hive', 'HQL', 'Metastore', 'Architecture', 'Types', 'File formats', 'RCFile', 'Partitions', 'Buckets', 'UDFs', 'Pig', 'Pig Latin', 'Operators', 'Eval', 'Complex types', 'Piggy Bank']
  return (
    <div className="m4-mindmap">
      <strong>Module 4</strong>
      {items.map((item, index) => <span key={item} style={{ '--i': index }}>{item}</span>)}
    </div>
  )
}

const notes = 'Use the Digital Campus story: HDFS already stores data; Pig cleans raw student files; Hive organizes clean data for HQL reports.'

export const module4Slides = [
  {
    id: 'm4-hero',
    kicker: 'Big Data Analytics · Module 4',
    title: null,
    hideTitle: true,
    tone: 'bd-peak bd-m4',
    content: (
      <div className="m4-hero">
        <div>
          <p className="slide-kicker">DIGITAL CAMPUS</p>
          <h1>Hive and Pig make Hadoop useful.</h1>
          <p>Attendance, marks, library, LMS, placement, hostel and transport files are already in HDFS. Now the campus wants answers — the analytics forge begins.</p>
          <BdaScaleStrip variant="warehouse" />
        </div>
        <OpeningAnalyticsForge />
      </div>
    ),
    notes,
  },
  slide('m4-journey', 'Learning Journey', 'The Whole Module Follows One Data Journey', (
    <Deck active={0} visual={<MasterFlow stage={7} />}>
      <p className="m4-lead">Raw campus CSV files become management decisions through two tools with different jobs.</p>
      <Points items={['Pig prepares messy data', 'Hive analyzes clean warehouse data', 'Both hide low-level Hadoop jobs', 'The same student dataset evolves throughout the module']} />
    </Deck>
  ), notes),
  slide('m4-why-tools', 'Why Tools Above Hadoop', 'HDFS Stores Files, But Departments Ask Questions', (
    <Deck active={1} visual={<CampusSources />}>
      <p className="m4-lead">Principal: “Show average attendance by department.” Admissions: “Find duplicate applicants.” Faculty: “List weak attendance.”</p>
      <Takeaway>Nobody wants to write MapReduce for every report or cleaning job.</Takeaway>
    </Deck>
  ), notes),
  slide('m4-need-hive-pig', 'Why Hive + Pig', 'Two Problems Appear Above HDFS', (
    <Deck active={2} visual={<SplitDecision />}>
      <Points items={['Need cleaning: wrong branch names, blanks, duplicates', 'Need analysis: averages, filters, grouping, dashboards', 'Pig solves the procedural cleaning flow', 'Hive solves SQL-style warehouse querying']} />
    </Deck>
  ), notes),
  {
    id: 'm4-pig-before-hive',
    kicker: 'Master Flow',
    title: 'Pig Comes Before Hive in This Company Story',
    tone: 'bd-peak bd-m4',
    content: (
      <Deck active={3} visual={<HeroScene beat="Transformation" metaphor="Clean before you mint the official answer" className="bo-forge"><MasterFlow stage={5} /></HeroScene>}>
        <p className="m4-lead">Dirty files should not become official dashboards. Data engineers clean first; business users query later.</p>
        <Takeaway>{'Remember the order: HDFS raw zone -> Pig clean zone -> Hive warehouse.'}</Takeaway>
      </Deck>
    ),
    notes,
  },
  slide('m4-raw-data', 'Student Dataset', 'The Same Student Records Keep Evolving', (
    <Deck active={2} visual={<StudentTable />}>
      <Points items={['Missing attendance from faculty upload', 'Wrong department naming: E&C, AI&ML, trailing spaces', 'Duplicate student row', 'Blank CGPA from incomplete marks sheet']} />
    </Deck>
  ), notes),
  slide('m4-hive-intro', 'Hive', 'Hive Feels Like Google Analytics for Hadoop', (
    <Deck active={5} visual={<HdfsStack clean label="Hive warehouse: students" />}>
      <p className="m4-lead">Hive is a Hadoop data warehouse system that lets users query large HDFS datasets using SQL-like Hive Query Language.</p>
      <Points items={['Good for structured analysis', 'Familiar to SQL users', 'Schema is applied when reading data', 'Queries become Hadoop execution jobs']} />
    </Deck>
  ), notes),
  slide('m4-why-hive', 'Hive Story', 'Every Department Request Becomes HQL', (
    <Deck active={6} visual={<div className="m4-request-wall">
      {['Principal: average CGPA', 'Faculty: students above 8 CGPA', 'Library: most borrowed books', 'Placement: eligible students'].map((item) => <span key={item}>{item}</span>)}
    </div>}>
      <p className="m4-lead">Hive exists because business users think in questions and tables, not mapper and reducer classes.</p>
      <Takeaway>Use Hive when the data is structured enough for tables and the task is reporting or analysis.</Takeaway>
    </Deck>
  ), notes),
  slide('m4-hive-not-rdbms', 'Misconception', 'Hive Is Not a Transactional RDBMS', (
    <Deck active={5} visual={<div className="m4-compare-mini"><article><strong>RDBMS</strong><span>low-latency transactions</span><span>frequent updates</span><span>OLTP</span></article><article><strong>Hive</strong><span>batch analytics</span><span>large HDFS scans</span><span>OLAP / ETL</span></article></div>}>
      <p className="m4-lead">Hive uses SQL-like syntax, but its purpose is large-scale batch analytics on Hadoop.</p>
      <Takeaway>Exam trap: do not describe Hive as a normal update-heavy database.</Takeaway>
    </Deck>
  ), notes),
  slide('m4-hive-architecture', 'Hive Architecture', 'Watch One Query Travel Through Hive', (
    <Deck active={7} visual={<Architecture steps={hiveArchitecture} />}>
      <Points items={['User submits HQL', 'Driver manages the query lifecycle', 'Compiler builds an execution plan', 'Metastore supplies schema and locations', 'Execution engine runs MapReduce/Tez jobs over HDFS']} />
    </Deck>
  ), notes),
  slide('m4-metastore', 'Metastore', 'The Metastore Is a Library Catalog for Data', (
    <Deck active={5} visual={<MetastoreCatalog />}>
      <p className="m4-lead">The catalog does not store the books; it tells you what exists and where to find it.</p>
      <Takeaway>Hive metastore stores databases, tables, columns, partitions, schema, file formats and HDFS locations.</Takeaway>
    </Deck>
  ), notes),
  slide('m4-query-lifecycle', 'Query Life Cycle', 'HQL Becomes a Hadoop Job', (
    <Deck active={7} visual={<Architecture steps={['Write HQL', 'Parse', 'Compile', 'Check Metastore', 'Optimize Plan', 'Execute Job', 'Read HDFS', 'Return Result']} />}>
      <p className="m4-lead">Hive hides the mechanics, but the query still travels through Hadoop processing underneath.</p>
    </Deck>
  ), notes),
  slide('m4-hql-visual', 'HQL', 'Read HQL Like a Moving Report', (
    <Deck tight active={6} visual={<HqlExecution stage={5} />}>
      <p className="m4-lead">Each keyword does a visible action on the clean student table.</p>
      <Takeaway>Syntax earns marks when you also explain what each clause does.</Takeaway>
    </Deck>
  ), notes),
  slide('m4-hql-ddl', 'HQL DDL', 'Hive First Creates a College Database and Table', (
    <Deck active={5} visual={<SchemaGrow stage={2} />}>
      <Code focus="CREATE TABLE">{`CREATE DATABASE college;
USE college;

CREATE TABLE students (
  usn STRING,
  name STRING,
  dept STRING,
  cgpa DOUBLE
);`}</Code>
    </Deck>
  ), notes),
  slide('m4-hive-types', 'Hive Data Types', 'A Student Table Grows One Type at a Time', (
    <Deck active={5} visual={<SchemaGrow stage={7} />}>
      <Points items={['STRING stores names and USN values', 'INT and DOUBLE store attendance and CGPA', 'BOOLEAN stores placement status', 'DATE/TIMESTAMP store time values', 'ARRAY, MAP and STRUCT model complex fields']} />
    </Deck>
  ), notes),
  slide('m4-load-data', 'Load Data', 'Clean HDFS Files Enter the Hive Table', (
    <Deck active={5} visual={<HdfsStack clean label="/v/digital/clean/students.csv" />}>
      <Code focus="LOAD DATA">{`LOAD DATA INPATH '/v/digital/clean/students.csv'
INTO TABLE students;`}</Code>
      <Takeaway>Hive maps a table to files already living in Hadoop storage.</Takeaway>
    </Deck>
  ), notes),
  slide('m4-select', 'Basic SELECT', 'Faculty Finds Students Above 8 CGPA', (
    <Deck active={6} visual={<StudentTable cleaned highlight="4AB23IS001" />}>
      <Code focus="WHERE">{`SELECT name, cgpa
FROM students
WHERE cgpa >= 8.0;`}</Code>
    </Deck>
  ), notes),
  slide('m4-group', 'Group and Aggregate', 'Principal Gets Average CGPA by Department', (
    <Deck active={8} visual={<EvalDashboard />}>
      <Code focus="GROUP BY">{`SELECT dept, AVG(cgpa) AS avg_cgpa
FROM students
GROUP BY dept
ORDER BY avg_cgpa DESC;`}</Code>
    </Deck>
  ), notes),
  slide('m4-file-formats', 'Hive File Formats', 'Storage Format Changes Query Speed', (
    <Deck active={5} visual={<FileFormatFlow />}>
      <Points items={['TextFile is simple but scan-heavy', 'SequenceFile stores Hadoop binary key-value records', 'RCFile stores row groups with column chunks', 'ORC and Parquet are modern optimized columnar formats']} />
    </Deck>
  ), notes),
  slide('m4-row-column', 'Row vs Column', 'Analytics Usually Reads Columns, Not Whole Rows', (
    <Deck active={5} visual={<RcFileVisual />}>
      <p className="m4-lead">For “average attendance,” Hive needs attendance and department, not every field in every row.</p>
      <Takeaway>Columnar storage reduces unnecessary reads and improves compression.</Takeaway>
    </Deck>
  ), notes),
  slide('m4-rcfile', 'RCFile', 'RCFile Combines Row Groups and Column Reads', (
    <Deck active={5} visual={<RcFileVisual />}>
      <Points items={['Split data into row groups', 'Store columns separately inside each group', 'Compress blocks of similar values', 'Read only columns required by the query', 'Return rows for the final result']} />
    </Deck>
  ), notes),
  slide('m4-partitions', 'Partitioning', 'A 2026 Attendance Query Scans Only 2026', (
    <Deck active={6} visual={<PartitionVisual />}>
      <Code focus="year=2026">{`SELECT dept, AVG(attendance)
FROM attendance
WHERE year = 2026
GROUP BY dept;`}</Code>
      <Takeaway>Partition pruning skips irrelevant HDFS directories.</Takeaway>
    </Deck>
  ), notes),
  slide('m4-buckets', 'Bucketing', 'Students Are Distributed into Fixed Bucket Files', (
    <Deck active={6} visual={<BucketVisual />}>
      <p className="m4-lead">Bucketing hashes a chosen column and places records into a fixed number of files.</p>
      <Points items={['Useful for joins and sampling', 'More controlled than partitions', 'Common syntax uses CLUSTERED BY', 'Bucket count stays fixed for the table design']} />
    </Deck>
  ), notes),
  slide('m4-managed-external', 'Managed vs External', 'Ownership Decides What DROP TABLE Means', (
    <Deck active={5} visual={<div className="m4-own-stack"><OwnershipVisual /><OwnershipVisual external /></div>}>
      <Points items={['Managed: Hive owns metadata and table files', 'DROP managed table removes data too', 'External: Hive owns only metadata', 'DROP external table leaves HDFS files in place']} />
    </Deck>
  ), notes),
  slide('m4-views', 'Views', 'A Repeated Report Becomes a View', (
    <Deck active={6} visual={<HqlExecution stage={2} />}>
      <Code focus="CREATE VIEW">{`CREATE VIEW high_cgpa AS
SELECT usn, name, cgpa
FROM students
WHERE cgpa >= 8.0;`}</Code>
      <Takeaway>Views simplify repeated HQL without copying the underlying data.</Takeaway>
    </Deck>
  ), notes),
  slide('m4-hive-udf', 'Hive UDF', 'When HQL Lacks a Built-in Function, Extend It', (
    <Deck active={6} visual={<UdfVisual tool="Hive" />}>
      <p className="m4-lead">The Principal wants grade classification. If built-in HQL cannot express the reusable rule cleanly, a UDF is added.</p>
      <Points items={['Use built-ins first', 'Use UDF for repeated custom logic', 'Keep input and output types clear', 'Document and test the function']} />
    </Deck>
  ), notes),
  slide('m4-pig-intro', 'Pig', 'Pig Is the Data Engineer’s Visual Workflow', (
    <Deck active={3} visual={<StudentTable />}>
      <p className="m4-lead">Pig is a Hadoop platform for analyzing large datasets with Pig Latin, a procedural data-flow language that compiles into jobs.</p>
      <Takeaway>Use Pig when the work is cleaning, joining, transforming and preparing data before analysis.</Takeaway>
    </Deck>
  ), notes),
  slide('m4-why-pig', 'Pig Story', 'Admissions Uploaded a Messy CSV', (
    <Deck active={2} visual={<StudentTable />}>
      <Points items={['Duplicate records must be removed', 'Missing names or attendance must be handled', 'Wrong branches must be standardized', 'Blank CGPA values must not break reports', 'Faculty CSV mistakes need a repeatable pipeline']} />
    </Deck>
  ), notes),
  slide('m4-pig-latin-flow', 'Pig Latin', 'First See the Data Flow, Then Read the Script', (
    <Deck active={3} visual={<PigPipeline />}>
      <Code focus="FILTER">{`A = LOAD 'raw_student_records.csv' USING PigStorage(',');
B = FILTER A BY attendance IS NOT NULL;
C = FOREACH B GENERATE usn, name, REPLACE(dept, 'E&C', 'ECE') AS dept, cgpa;
STORE C INTO '/v/digital/clean/students';`}</Code>
    </Deck>
  ), notes),
  slide('m4-pig-anatomy', 'Anatomy of Pig', 'A Pig Script Becomes Hadoop Work', (
    <Deck active={7} visual={<Architecture steps={pigArchitecture} variant="pig" />}>
      <Points items={['Parser checks Pig Latin syntax', 'Optimizer improves the logical plan', 'Compiler creates executable jobs', 'Execution engine runs on Hadoop', 'Input and output usually live in HDFS']} />
    </Deck>
  ), notes),
  slide('m4-pig-on-hadoop', 'Pig on Hadoop', 'Pig Describes the Flow; Hadoop Runs the Jobs', (
    <Deck active={7} visual={<Architecture steps={['Pig Latin', 'Logical Plan', 'Physical Plan', 'MapReduce Jobs', 'HDFS Output']} variant="pig" />}>
      <p className="m4-lead">Pig lets the engineer think in data transformations while Hadoop handles distributed execution.</p>
    </Deck>
  ), notes),
  slide('m4-pig-philosophy', 'Pig Philosophy', 'Pig Programming Feels Like Cooking', (
    <Deck active={3} visual={<CookingAnalogy />}>
      <p className="m4-lead">Each Pig statement creates a new named relation, and the operations form a pipeline.</p>
      <Points items={['Data changes step by step', 'Execution is lazy until output is requested', 'Excellent for exploration and ETL', 'Far less Java than raw MapReduce']} />
    </Deck>
  ), notes),
  slide('m4-pig-use-cases', 'Pig Use Cases', 'Use Pig for Messy Transformation Workloads', (
    <Deck active={3} visual={<MasterFlow stage={4} />}>
      <Points items={['Clean raw log or CSV files before Hive', 'Join large HDFS datasets', 'Group and summarize clickstream or attendance records', 'Filter incomplete records', 'Prepare data for analytics and machine learning']} />
    </Deck>
  ), notes),
  slide('m4-pig-types-modes', 'Pig Data Types and Modes', 'Pig Handles Simple Values and Nested Data', (
    <Deck active={3} visual={<ComplexTypes />}>
      <Points items={['Primitive: int, long, float, double, chararray, bytearray, boolean', 'Complex: tuple, bag and map', 'Grunt shell supports interactive commands', 'Script files run saved .pig workflows', 'Local mode tests samples; MapReduce mode runs on Hadoop']} />
    </Deck>
  ), notes),
  slide('m4-hdfs-commands', 'HDFS Commands', 'Pig Workflows Start by Moving Files', (
    <Deck active={1} visual={<div className="m4-command-grid"><HdfsCommands command="mkdir" /><HdfsCommands command="put" /><HdfsCommands command="ls" /><HdfsCommands command="cat" /></div>}>
      <p className="m4-lead">Before Pig can clean data, raw files must exist in the expected HDFS folders.</p>
    </Deck>
  ), notes),
  slide('m4-operators-one', 'Relational Operators', 'Every Operator Modifies the Same Student Dataset', (
    <Deck active={3} visual={<div className="m4-op-grid">{['LOAD', 'FILTER', 'GROUP', 'FOREACH'].map((op) => <OperatorVisual key={op} op={op} />)}</div>}>
      <Points items={['LOAD reads data into a relation', 'FILTER selects rows matching a condition', 'GROUP collects records by key', 'FOREACH projects or transforms fields']} />
    </Deck>
  ), notes),
  slide('m4-operators-two', 'Join, Order, Limit', 'The Pipeline Adds Context, Ranks, Then Trims', (
    <Deck active={3} visual={<div className="m4-op-grid">{['JOIN', 'ORDER', 'LIMIT'].map((op) => <OperatorVisual key={op} op={op} />)}</div>}>
      <Code focus="JOIN">{`J = JOIN students BY dept, departments BY dept;
S = ORDER students BY cgpa DESC;
T = LIMIT S 10;`}</Code>
    </Deck>
  ), notes),
  slide('m4-project-filter', 'Project and Filter', 'A Lab Query Is a Mini Pipeline', (
    <Deck active={3} visual={<PigPipeline stage={4} />}>
      <Code focus="FOREACH">{`A = LOAD '/v/digital/raw/students' USING PigStorage(',');
B = FILTER A BY cgpa >= 8.0;
C = FOREACH B GENERATE usn, name, dept, cgpa;
D = ORDER C BY cgpa DESC;
STORE D INTO '/v/digital/output/top_students';`}</Code>
    </Deck>
  ), notes),
  slide('m4-eval-functions', 'Eval Functions', 'Departments Become Dashboard Numbers', (
    <Deck active={8} visual={<EvalDashboard />}>
      <Code focus="AVG">{`G = GROUP students BY dept;
R = FOREACH G GENERATE
  group,
  COUNT(students),
  AVG(students.cgpa),
  MAX(students.cgpa);`}</Code>
      <Takeaway>COUNT, SUM, AVG, MIN, MAX and string functions summarize relations.</Takeaway>
    </Deck>
  ), notes),
  slide('m4-complex-types', 'Complex Types', 'Tuple, Bag and Map Come from Student Data', (
    <Deck active={3} visual={<ComplexTypes />}>
      <p className="m4-lead">After GROUP, each department contains a bag of student tuples. Maps store key-value details such as city or skill labels.</p>
    </Deck>
  ), notes),
  slide('m4-piggy-bank', 'Piggy Bank', 'Piggy Bank Is a Toolbox of Existing Tools', (
    <Deck active={3} visual={<div className="m4-toolbox"><PackageOpen size={66} strokeWidth={1.4} /><span>Loaders</span><span>Parsers</span><span>Stats</span><span>String utilities</span><strong>Piggy Bank</strong></div>}>
      <Points items={['Use contributed functions instead of writing every tool', 'Helpful for special file formats', 'Useful for parsing logs and strings', 'Speeds up script development', 'Reduces duplicate custom code']} />
    </Deck>
  ), notes),
  slide('m4-pig-udf', 'Pig UDF', 'Pig Also Extends When Built-ins Are Not Enough', (
    <Deck active={3} visual={<UdfVisual tool="Pig" />}>
      <Code focus="REGISTER">{`REGISTER grade-tools.jar;
R = FOREACH students GENERATE
  usn,
  classify_grade(cgpa) AS grade;`}</Code>
      <Takeaway>{'Problem -> custom function -> register -> run -> validate output.'}</Takeaway>
    </Deck>
  ), notes),
  {
    id: 'm4-pig-vs-hive',
    kicker: 'Pig vs Hive',
    title: 'The Hero Decision Slide',
    tone: 'bd-peak bd-m4',
    content: (
      <Deck tight active={8} visual={<HeroScene beat="Business intelligence" metaphor="Choose the forge tool by the job" className="bo-forge"><SplitDecision /></HeroScene>}>
        <p className="m4-lead">Choose by workload, not by memorized command lists.</p>
        <Points items={['Hive: declarative SQL-like warehouse queries', 'Hive: reports, summaries and dashboards over structured tables', 'Pig: procedural data-flow pipelines', 'Pig: cleaning, transformation and ETL before analytics']} />
      </Deck>
    ),
    notes,
  },
  {
    id: 'm4-ending-story',
    kicker: 'Master Story Ending',
    title: 'Raw Data Becomes Better Institution Decisions',
    tone: 'bd-peak bd-m4',
    content: (
      <Deck active={8} visual={<OpeningAnalyticsForge />}>
        <p className="m4-lead">Raw data is stored inside Hadoop. Pig prepares it. Hive analyzes it. Management sees dashboards and acts.</p>
        <Takeaway>Pig prepares data; Hive analyzes data; together they make Hadoop practical.</Takeaway>
      </Deck>
    ),
    notes,
  },
  slide('m4-mindmap', 'Summary', 'Module 4 in One Mind Map', (
    <Deck tight active={9} visual={<MindMap />}>
      <p className="m4-lead">This mind map matches the PPT checklist: Hive internals, HQL, file formats, RCFile, UDF, Pig Latin, operators, types, Piggy Bank and comparison.</p>
    </Deck>
  ), notes),
  slide('m4-revision-sheet', 'Revision Sheet', 'One-Page Keyword Sheet', (
    <Deck active={9} visual={<div className="m4-keywords">Hive · HQL · metastore · driver · compiler · execution engine · managed table · external table · partition · bucket · TextFile · SequenceFile · RCFile · ORC · Parquet · UDF · Pig · Pig Latin · Grunt · local mode · MapReduce mode · LOAD · FILTER · FOREACH · GROUP · JOIN · ORDER · LIMIT · tuple · bag · map · Piggy Bank</div>}>
      <p className="m4-lead">Exam answer formula: definition + architecture/process diagram + syntax example + use case + comparison.</p>
    </Deck>
  ), notes),
  slide('m4-viva', 'Viva', '20 Important Viva Questions', (
    <Deck tight active={9} visual={<Questions questions={vivaQuestions} />}>
      <p className="m4-lead">Answer each in one crisp sentence using the Student Analytics Platform story.</p>
    </Deck>
  ), notes),
  slide('m4-two-mark', '2 Marks', 'Two-Mark Question Bank', (
    <Deck tight active={9} visual={<Questions questions={twoMarks} />}>
      <p className="m4-lead">Two-mark answers need exact definitions, correct terms and one campus example where possible.</p>
    </Deck>
  ), notes),
  slide('m4-five-mark', '5 Marks', 'Five-Mark Question Bank', (
    <Deck tight active={9} visual={<Questions questions={fiveMarks} />}>
      <p className="m4-lead">Five-mark answers should include one diagram, one command and one takeaway.</p>
    </Deck>
  ), notes),
  slide('m4-ten-mark', '10 Marks', 'Ten-Mark and Previous-Year Themes', (
    <Deck tight active={9} visual={<Questions questions={tenMarks} />}>
      <p className="m4-lead">Long answers should follow the source-PPT scope and avoid generic Hadoop-only explanations.</p>
    </Deck>
  ), notes),
  {
    id: 'm4-end',
    kicker: 'Module 4 Complete',
    title: null,
    hideTitle: true,
    tone: 'bd-peak bd-m4',
    content: (
      <div className="m4-end">
        <OpeningAnalyticsForge />
        <h2>Students should now know when to use Pig and when to use Hive.</h2>
        <p>{'Raw HDFS data -> Pig cleaning pipeline -> Hive warehouse -> HQL reports -> Hadoop jobs -> institutional decisions.'}</p>
      </div>
    ),
    notes,
  },
]

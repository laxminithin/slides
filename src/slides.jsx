import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Database,
  FileJson,
  FileQuestion,
  Files,
  GraduationCap,
  LineChart,
  Network,
  Server,
  ShieldAlert,
  Sparkles,
  Table2,
} from 'lucide-react'
import StudyResourcesSlide from './components/study/StudyResourcesSlide'
import { BdaScaleStrip, HeroScene } from './components/BdaKit'
import { OpeningDigitalPlanet, OpeningLogisticsHub } from './components/BdaOpenings'
import { HadoopCluster, MapReducePipeline } from './components/HadoopViz'

const icon = { size: 24, strokeWidth: 1.8, 'aria-hidden': true }

const campusSources = [
  'Admissions',
  'Attendance',
  'LMS',
  'Internal marks',
  'Exam results',
  'Library',
  'Fees',
  'Placement',
  'Wi-Fi logs',
  'CCTV metadata',
  'Feedback',
  'Website enquiries',
  'Labs',
]

const journey = ['Raw Events', 'Data Types', 'Big Data Pressure', 'Distributed Storage', 'Parallel Processing', 'Analytics', 'Insight', 'Decision']

const sectionNames = {
  opening: 'Opening Story',
  data: 'Data Fundamentals',
  bigdata: 'Big Data Foundations',
  bi: 'BI and Warehouse',
  hadoop: 'Hadoop Need',
  analytics: 'Analytics',
  tech: 'Technology Stack',
  exam: 'Exam Preparation',
}

function visible(step, index) {
  return step >= index ? 'is-visible' : ''
}

function RevealList({ step = 0, items, numbered = false }) {
  const Tag = numbered ? 'ol' : 'ul'
  return (
    <Tag className={`bda-reveal-list ${numbered ? 'numbered' : ''}`}>
      {items.map((item, index) => (
        <li key={item} className={visible(step, index)}>{item}</li>
      ))}
    </Tag>
  )
}

function SlideCanvas({ lead, children, visual, takeaway, reverse = false, className = '' }) {
  return (
    <div className={`bda-canvas ${reverse ? 'reverse' : ''} ${visual ? '' : 'single'} ${className}`.trim()}>
      <div className="bda-copy">
        {lead && <p className="bda-lead">{lead}</p>}
        {children}
        {takeaway && <aside className="bda-takeaway">{takeaway}</aside>}
      </div>
      {visual && <div className="bda-visual">{visual}</div>}
    </div>
  )
}

function MiniRibbon({ step = 0, active = 0 }) {
  return (
    <div className="bda-mini-ribbon" aria-label="Module data journey">
      {journey.map((item, index) => (
        <span key={item} className={`${index <= Math.max(step, active) ? 'active' : ''} ${index === active ? 'current' : ''}`.trim()}>
          {item}
        </span>
      ))}
    </div>
  )
}

function TitleVisual({ step = 0 }) {
  // Director's Cut: the Digital Planet is the unforgettable Module 1 image.
  // Step gating remains for presenter mode — the scene itself teaches the arc.
  if (step < 2) {
    const sources = ['Search', 'Streaming', 'Transactions', 'Apps', 'Sensors', 'Social']
    return (
      <div className="bda-title-visual">
        <div className="bda-source-cloud">
          {sources.map((source, index) => (
            <span key={source} className={visible(step, index + 1)}>{source}</span>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className={`bda-title-visual cinematic ${visible(step, 2)}`}>
      <OpeningDigitalPlanet />
    </div>
  )
}

function JourneyMap({ step = 0 }) {
  const stages = [
    ['Classify Data', 'Recognize structured, semi-structured and unstructured forms.'],
    ['Understand Big Data', 'Define scale, speed, diversity, trust and value.'],
    ['Compare BI', 'Know where traditional reports work and where they struggle.'],
    ['Explore Warehouse', 'Understand ETL and enterprise decision storage.'],
    ['Introduce Hadoop', 'Distribute data and computation across nodes.'],
    ['Classify Analytics', 'Move from description to prescription.'],
    ['Identify Tools', 'Choose storage, processing, querying and visualization tools.'],
  ]
  return (
    <div className="bda-journey-map">
      {stages.map(([title, text], index) => (
        <article key={title} className={visible(step, index)}>
          <strong>{title}</strong>
          <span>{text}</span>
        </article>
      ))}
    </div>
  )
}

function CampusDataSourceMap({ step = 0 }) {
  return (
    <HeroScene
      beat="Discovery"
      metaphor="A campus that quietly becomes a data planet"
      annotations={['signals', 'departments', 'exhaust']}
      className="bo-campus"
    >
      <div className="bda-campus-map">
        <div className="bda-campus-core">
          <GraduationCap size={42} strokeWidth={1.7} />
          <strong>Smart Campus</strong>
          <span>modern college data journey</span>
        </div>
        <div className="bda-campus-sources">
          {campusSources.map((source, index) => (
            <span key={source} className={visible(step, Math.min(index, 8))}>{source}</span>
          ))}
        </div>
      </div>
    </HeroScene>
  )
}

function DepartmentSilos({ step = 0 }) {
  const units = [
    ['Admissions', 'Excel lists'],
    ['Examination', 'RDBMS'],
    ['Library', 'Barcode system'],
    ['Placement', 'Forms'],
    ['Network', 'Logs'],
  ]
  return (
    <div className="bda-silos">
      {units.map(([title, store], index) => (
        <article key={title} className={visible(step, index)}>
          <Database {...icon} />
          <strong>{title}</strong>
          <span>{store}</span>
        </article>
      ))}
      <p className={visible(step, 5)}>Each department can report locally, but cross-campus insight is hard.</p>
    </div>
  )
}

function DataToDecision({ step = 0 }) {
  const stages = [
    ['Raw data', '72, 68, login, absent'],
    ['Information', '72/100 in BIS701'],
    ['Knowledge', 'Strong theory, weak lab trend'],
    ['Decision', 'Assign practice and mentoring'],
  ]
  return (
    <div className="bda-flow-row">
      {stages.map(([title, text], index) => (
        <article key={title} className={visible(step, index)}>
          <strong>{title}</strong>
          <span>{text}</span>
        </article>
      ))}
    </div>
  )
}

function DataTypeTrio({ step = 0 }) {
  const types = [
    ['Structured', 'Rows, columns, schema', 'student marks table', <Table2 key="structured-icon" {...icon} />],
    ['Semi-structured', 'Keys, tags, flexible fields', 'LMS JSON or XML logs', <FileJson key="semi-structured-icon" {...icon} />],
    ['Unstructured', 'Free-form text, image, audio, video', 'feedback text, CCTV metadata', <Files key="unstructured-icon" {...icon} />],
  ]
  return (
    <div className="bda-card-row three">
      {types.map(([title, text, example, typeIcon], index) => (
        <article key={title} className={visible(step, index)}>
          {typeIcon}
          <strong>{title}</strong>
          <span>{text}</span>
          <em>{example}</em>
        </article>
      ))}
    </div>
  )
}

function GrowthScale({ step = 0 }) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB']
  return (
    <div className="bda-growth-scale">
      {units.map((unit, index) => (
        <span key={unit} className={visible(step, index)} style={{ '--i': index }}>{unit}</span>
      ))}
    </div>
  )
}

function PressureMeter({ step = 0 }) {
  const pressures = [
    ['Volume', 'More systems, students and events'],
    ['Velocity', 'Logs and actions arrive continuously'],
    ['Variety', 'Tables, JSON, images, text and metadata'],
    ['Veracity', 'Missing, noisy and duplicated records'],
    ['Value', 'Insight must improve decisions'],
  ]
  return (
    <HeroScene beat="Scale pressure" metaphor="Five forces reshape the system" className="bo-pressure">
      <div className="bda-pressure bda-pressure-hero">
        {pressures.map(([title, text], index) => (
          <article key={title} className={visible(step, index)} style={{ '--i': index }}>
            <b>{title}</b>
            <span>{text}</span>
          </article>
        ))}
      </div>
    </HeroScene>
  )
}

function ScaleCompare({ step = 0 }) {
  return (
    <HeroScene beat="Explosion of scale" metaphor="One tower vs a living city of machines" className="bo-scale">
      <div className="bda-scale-compare">
        <article className={visible(step, 0)}>
          <Server size={48} strokeWidth={1.6} />
          <strong>Scale up</strong>
          <span>Buy a bigger machine: more CPU, RAM and disk.</span>
          <em>Simple, but expensive and limited.</em>
        </article>
        <article className={`scale-out-hero ${visible(step, 1)}`}>
          <div className="bda-node-grid">
            {['N1', 'N2', 'N3', 'N4', 'N5', 'N6'].map((node) => <b key={node}>{node}</b>)}
          </div>
          <strong>Scale out</strong>
          <span>Add many machines and divide storage plus processing.</span>
          <em>This is the Big Data direction.</em>
        </article>
      </div>
    </HeroScene>
  )
}

function BiVsBigData({ step = 0 }) {
  const rows = [
    ['Data', 'Curated, structured, historical', 'Raw, mixed, massive, fast'],
    ['Question', 'Known reports', 'Known and exploratory questions'],
    ['Storage', 'Warehouse, RDBMS', 'HDFS, NoSQL, lake, warehouse'],
    ['Processing', 'Centralized SQL/OLAP', 'Distributed parallel processing'],
    ['Result', 'Dashboards and KPIs', 'Insight, prediction, action'],
  ]
  return (
    <div className="bda-compare-table">
      <div className="head">Dimension</div><div className="head">Traditional BI</div><div className="head">Big Data</div>
      {rows.map((row, rowIndex) => row.map((cell, colIndex) => (
        <div key={`${row[0]}-${colIndex}`} className={visible(step, rowIndex)}>{cell}</div>
      )))}
    </div>
  )
}

function WarehousePipeline({ step = 0 }) {
  const stages = [
    ['Sources', 'ERP, LMS, exams, fees'],
    ['ETL', 'Extract, transform, load'],
    ['Warehouse', 'Integrated historical store'],
    ['OLAP / BI', 'Reports, dashboards, queries'],
    ['Decision', 'Management action'],
  ]
  return (
    <div className="bda-warehouse">
      {stages.map(([title, text], index) => (
        <article key={title} className={visible(step, index)}>
          <strong>{title}</strong>
          <span>{text}</span>
        </article>
      ))}
    </div>
  )
}

function HadoopCore({ step = 0 }) {
  // Director's Cut peak: the living distributed city teaches the concept alone.
  if (step >= 2) {
    return (
      <HeroScene
        beat="Distributed intelligence"
        metaphor="Move compute to a city of commodity nodes"
        annotations={['NameNode', 'racks', 'replication']}
        className="bo-city"
      >
        <HadoopCluster />
      </HeroScene>
    )
  }
  const nodes = ['NameNode', 'DataNode 1', 'DataNode 2', 'DataNode 3', 'DataNode 4']
  return (
    <div className="bda-hadoop-core">
      <div className={`bda-hadoop-label ${visible(step, 0)}`}>Hadoop Cluster</div>
      <div className="bda-hadoop-nodes">
        {nodes.map((node, index) => (
          <article key={node} className={visible(step, index)}>
            <Server {...icon} />
            <strong>{node}</strong>
            <span>{index === 0 ? 'metadata and coordination' : 'blocks + local processing'}</span>
          </article>
        ))}
      </div>
      <div className={`bda-hadoop-strip ${visible(step, 5)}`}>
        <b>HDFS</b><b>MapReduce</b><b>YARN</b>
      </div>
    </div>
  )
}

function MapReduceFlow({ step = 0 }) {
  if (step >= 3) {
    return (
      <HeroScene beat="Movement" metaphor="A massive logistics hub for answers" className="bo-logistics">
        <MapReducePipeline phase={Math.min(9, step + 2)} />
      </HeroScene>
    )
  }
  const stages = [
    ['Input', 'large dataset'],
    ['Split', 'blocks'],
    ['Map', 'process each block'],
    ['Shuffle', 'group intermediate results'],
    ['Reduce', 'combine'],
    ['Output', 'answer'],
  ]
  return (
    <div className="bda-mapreduce">
      {stages.map(([title, text], index) => (
        <article key={title} className={visible(step, index)}>
          <strong>{title}</strong>
          <span>{text}</span>
        </article>
      ))}
    </div>
  )
}

function AnalyticsLevels({ step = 0 }) {
  const levels = [
    ['Descriptive', 'What happened?', 'Attendance dropped in Week 6.'],
    ['Diagnostic', 'Why did it happen?', 'Bus delay and lab schedule clash.'],
    ['Predictive', 'What may happen?', 'At-risk students may miss internals.'],
    ['Prescriptive', 'What should we do?', 'Schedule mentoring and alerts.'],
  ]
  return (
    <HeroScene beat="Transformation" metaphor="Analytics climbs from report to action" className="bo-ladder">
      <div className="bda-analytics-ladder">
        {levels.map(([title, q, eg], index) => (
          <article key={title} className={visible(step, index)}>
            <strong>{title}</strong>
            <b>{q}</b>
            <span>{eg}</span>
          </article>
        ))}
      </div>
    </HeroScene>
  )
}

function TechnologyStack({ step = 0 }) {
  const layers = [
    ['Sources', 'campus systems, apps, sensors, web'],
    ['Ingestion', 'ETL, Sqoop, Flume, Kafka-style streams'],
    ['Storage', 'HDFS, data warehouse, NoSQL'],
    ['Processing', 'MapReduce, Spark, Hive, Pig'],
    ['Analytics', 'R, Python, ML libraries'],
    ['Visualization', 'BI dashboards and reports'],
  ]
  return (
    <div className="bda-tech-stack">
      {layers.map(([title, text], index) => (
        <article key={title} className={visible(step, index)}>
          <strong>{title}</strong>
          <span>{text}</span>
        </article>
      ))}
    </div>
  )
}

function NoSqlTypes({ step = 0 }) {
  const types = [
    ['Key-value', 'fast lookup by key', 'session, cache'],
    ['Document', 'JSON-like documents', 'student profile, LMS event'],
    ['Column family', 'wide sparse tables', 'large logs, time series'],
    ['Graph', 'relationships first', 'social, transport, recommendation'],
  ]
  return (
    <div className="bda-card-row four">
      {types.map(([title, text, eg], index) => (
        <article key={title} className={visible(step, index)}>
          <Network {...icon} />
          <strong>{title}</strong>
          <span>{text}</span>
          <em>{eg}</em>
        </article>
      ))}
    </div>
  )
}

function QuestionGrid({ step = 0, questions }) {
  return (
    <div className="bda-question-grid">
      {questions.map((question, index) => (
        <article key={question} className={visible(step, Math.floor(index / 2))}>
          <FileQuestion {...icon} />
          <span>{question}</span>
        </article>
      ))}
    </div>
  )
}

function MindMap({ step = 0 }) {
  const branches = [
    'Data types',
    '5Vs',
    'BI vs Big Data',
    'Warehouse + ETL',
    'Hadoop core',
    'Analytics types',
    'NoSQL + tools',
    'Exam answers',
  ]
  return (
    <div className="bda-mindmap">
      <strong className="bda-mindmap-core">Module 1</strong>
      {branches.map((branch, index) => (
        <span key={branch} className={visible(step, index)} style={{ '--i': index }}>{branch}</span>
      ))}
    </div>
  )
}

function SectionSlide({ number, title, subtitle, active }) {
  return (
    <div className="bda-section-slide">
      <MiniRibbon step={active} active={active} />
      <div className="bda-section-number">{number}</div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </div>
  )
}

function makeNotes(section, point) {
  return `${sectionNames[section]}. ${point} Use the Smart Campus example first, then connect it to common examples such as Google, Netflix, Amazon, Instagram, banking, healthcare, transport and retail when useful.`
}

const slidesCore = [
  {
    id: 'title',
    kicker: 'VTU BIS701 · Module 1',
    title: null,
    hideTitle: true,
    layout: 'full',
    tone: 'bd-peak bd-m1',
    content: ({ step = 999 }) => (
      <div className="bda-title-slide">
        <div>
          <p className={`slide-kicker ${visible(step, 0)}`}>BIG DATA ANALYTICS</p>
          <h1 className={visible(step, 0)}>Module 1</h1>
          <p className={`bda-title-question ${visible(step, 5)}`}>How do we learn from data that is too large, fast and diverse for traditional systems?</p>
          <div className={visible(step, 4)}>
            <BdaScaleStrip variant="intro" />
          </div>
          <div className={`bda-title-meta ${visible(step, 5)}`}>
            <span>VTU BIS701</span>
            <span>Big Data Analytics</span>
            <span>Module 1</span>
          </div>
        </div>
        <TitleVisual step={step} />
      </div>
    ),
    notes: makeNotes('opening', 'Open with everyday digital actions creating data, then reveal the data-to-insight promise.'),
  },
  {
    id: 'learning-journey',
    kicker: 'Module Learning Journey',
    title: 'Module 1 is one connected data journey',
    subtitle: 'Each part answers the next question raised by the Smart Campus data story.',
    content: ({ step = 999 }) => <JourneyMap step={step} />,
    notes: makeNotes('opening', 'Frame the module as a sequence, not a list of isolated definitions.'),
  },
  {
    id: 'campus-source-story',
    kicker: 'Opening Story',
    title: 'A modern college quietly generates Big Data signals',
    subtitle: 'Admissions, attendance, LMS, exams, library, fees, placement, Wi-Fi, CCTV metadata, feedback, website enquiries and labs all leave traces.',
    tone: 'bd-peak bd-m1',
    content: ({ step = 999 }) => <CampusDataSourceMap step={step} />,
    notes: makeNotes('opening', 'Use the Smart Campus scenario as the recurring anchor for the entire module.'),
  },
  {
    id: 'department-silos',
    kicker: 'Opening Story',
    title: 'At first, each department stores data separately',
    subtitle: 'The system works while data is small, structured and used for local reports.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<DepartmentSilos step={step} />} takeaway="The first problem is not technology; it is fragmented visibility.">
        <RevealList step={step} items={[
          'Admissions maintains student intake records.',
          'Exam section manages marks and results.',
          'Library and placement systems keep their own logs.',
          'Network and lab systems generate technical data.',
          'Cross-department questions become slow to answer.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('opening', 'Show why ordinary files and databases were comfortable in the early stage.'),
  },
  {
    id: 'manageable-phase',
    kicker: 'Opening Story',
    title: 'Files and relational databases are enough while the data is predictable',
    subtitle: 'Traditional systems are excellent when schema, volume and report questions are stable.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<DataTypeTrio step={Math.min(step, 0)} />} takeaway="Traditional systems fail only when the problem changes shape.">
        <RevealList step={step} items={[
          'Rows and columns capture admissions, marks, fees and inventory.',
          'SQL gives accurate operational transactions and reports.',
          'The comfort zone ends when volume, speed and variety grow together.',
          'That pressure creates the need for Big Data technologies.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('opening', 'Avoid making relational databases look weak; they are strong inside the right problem boundary.'),
  },
  {
    id: 'data-information-knowledge',
    kicker: 'Data Fundamentals',
    title: 'Data becomes useful only after context and interpretation',
    subtitle: 'The source deck’s first core idea: data, information, knowledge and decision are not the same thing.',
    content: ({ step = 999 }) => <DataToDecision step={step} />,
    notes: makeNotes('data', 'Use marks as the worked example: 72 becomes meaningful only when subject, max marks and student context are known.'),
  },
  {
    id: 'data-classification',
    kicker: 'Data Fundamentals',
    title: 'Data classification is the first design decision',
    subtitle: 'Storage, processing and analytics choices depend on the shape of data.',
    content: ({ step = 999 }) => <DataTypeTrio step={step} />,
    notes: makeNotes('data', 'Students should be able to classify examples before choosing tools.'),
  },
  {
    id: 'structured-data',
    kicker: 'Data Fundamentals',
    title: 'Structured data behaves like a disciplined table',
    subtitle: 'Rows, columns, keys and constraints are known before storage.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<div className="bda-mini-table">
        {['USN', 'Name', 'Marks', 'Grade'].map((h) => <b key={h}>{h}</b>)}
        {['4AB23IS001', 'Asha', '82', 'A'].map((c) => <span key={c}>{c}</span>)}
        {['4AB23IS017', 'Ravi', '68', 'B'].map((c) => <span key={c}>{c}</span>)}
      </div>}>
        <RevealList step={step} items={[
          'Every record follows the same structure.',
          'SQL databases handle it efficiently.',
          'Examples: student details, marks, fee receipts and library issues.',
          'Exam phrase: fixed schema with rows and columns.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('data', 'Define structured data in direct engineering language and give college examples.'),
  },
  {
    id: 'semi-structured-data',
    kicker: 'Data Fundamentals',
    title: 'Semi-structured data carries meaning without rigid rows',
    subtitle: 'Tags, keys and hierarchy exist, but records may not all share the same fields.',
    content: ({ step = 999 }) => (
      <SlideCanvas reverse visual={<pre className="bda-code">{`{
  "student": "4AB23IS017",
  "event": "quiz_submit",
  "device": "mobile",
  "score": 8
}`}</pre>}>
        <RevealList step={step} items={[
          'Meaning is embedded through labels such as keys or tags.',
          'The schema can evolve across records.',
          'Examples: JSON LMS activity, XML data exchange, logs and metadata.',
          'Exam phrase: self-describing but not fully relational.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('data', 'Use LMS activity as the recurring semi-structured example.'),
  },
  {
    id: 'unstructured-data',
    kicker: 'Data Fundamentals',
    title: 'Unstructured data needs extraction before analysis',
    subtitle: 'Text, images, audio, video and free-form feedback do not directly fit a table.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<div className="bda-extract-flow">
        {['Feedback text', 'Extract sentiment', 'Store features', 'Analyze trend'].map((item, index) => <span key={item} className={visible(step, index)}>{item}</span>)}
      </div>} takeaway="Unstructured does not mean useless; it means meaning must be extracted first.">
        <RevealList step={step} items={[
          'A paragraph, image or recording has no ready table schema.',
          'Algorithms extract features, entities, sentiment or metadata.',
          'Examples: student feedback, CCTV metadata, lab recordings and support emails.',
          'This is where Big Data analytics often creates new value.',
          'Exam phrase: no predefined data model.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('data', 'Clarify the difference between storing unstructured files and analyzing them.'),
  },
  {
    id: 'type-platform-choice',
    kicker: 'Data Fundamentals',
    title: 'The data type points toward the platform choice',
    subtitle: 'The same campus may need SQL, document storage, distributed files and analytics together.',
    content: ({ step = 999 }) => (
      <div className="bda-choice-grid">
        {[
          ['Structured', 'RDBMS / warehouse', 'marks, fees'],
          ['Semi-structured', 'NoSQL document / log tools', 'LMS JSON, XML'],
          ['Unstructured', 'HDFS / object store + analytics', 'text, images, video'],
          ['Mixed at scale', 'Big Data ecosystem', 'complete campus view'],
        ].map(([kind, tool, eg], index) => (
          <article key={kind} className={visible(step, index)}>
            <strong>{kind}</strong>
            <span>{tool}</span>
            <em>{eg}</em>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('data', 'Connect classification to tool selection early so the module has continuity.'),
  },
  {
    id: 'bigdata-section',
    kicker: 'Section 2',
    title: null,
    hideTitle: true,
    layout: 'full',
    content: <SectionSlide number="02" title="When Data Outgrows Traditional Processing" subtitle="Evolution, data growth, data exhaust, definition, 5Vs, value, challenges and misconceptions." active={2} />,
    notes: makeNotes('bigdata', 'Transition from classifying data to explaining why it becomes Big Data.'),
  },
  {
    id: 'bigdata-evolution',
    kicker: 'Big Data Evolution',
    title: 'Big Data evolved from reporting to large-scale learning',
    subtitle: 'The story moves from transaction records to web-scale, mobile, sensor and social data.',
    content: ({ step = 999 }) => (
      <div className="bda-timeline">
        {[
          ['Operational records', 'structured transactions'],
          ['Enterprise reporting', 'data warehouse and BI'],
          ['Web search and e-commerce', 'clickstreams and recommendations'],
          ['Mobile and social', 'continuous digital exhaust'],
          ['IoT and AI', 'distributed analytics at scale'],
          ['Institutional intelligence', 'campus insight and action'],
        ].map(([title, text], index) => (
          <article key={title} className={visible(step, index)}>
            <strong>{title}</strong><span>{text}</span>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('bigdata', 'Keep this as an evolution slide, not a history lecture.'),
  },
  {
    id: 'data-growth-units',
    kicker: 'Data Growth',
    title: 'Data growth changed the unit of thinking',
    subtitle: 'The source deck’s unit ladder matters because architecture changes as data moves from GB to TB, PB and beyond.',
    content: ({ step = 999 }) => <GrowthScale step={step} />,
    notes: makeNotes('bigdata', 'Use units to make scale visible, then connect the scale to distributed architecture.'),
  },
  {
    id: 'data-exhaust',
    kicker: 'Data Exhaust',
    title: 'Digital systems produce data even when nobody is “entering data”',
    subtitle: 'Searches, streams, logins, payments, sensor readings and clicks create secondary traces.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<CampusDataSourceMap step={step + 4} />} takeaway="Data exhaust becomes valuable when it is captured, cleaned and analyzed responsibly.">
        <RevealList step={step} items={[
          'Wi-Fi authentication logs reveal campus usage patterns.',
          'LMS timestamps reveal learning behavior.',
          'Website enquiries reveal admission interest.',
          'CCTV metadata can support safety analysis without storing every frame in reports.',
          'The data was not always collected for analytics, but it can support decisions.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('bigdata', 'Define data exhaust using campus examples and mention responsible use.'),
  },
  {
    id: 'scale-up-scale-out',
    kicker: 'Scalability',
    title: 'Scale-up reaches a ceiling; scale-out changes the design',
    subtitle: 'Big Data systems prefer adding machines and distributing work.',
    tone: 'bd-peak bd-m1',
    content: ({ step = 999 }) => <ScaleCompare step={step} />,
    notes: makeNotes('bigdata', 'This prepares students for Hadoop: many ordinary nodes, not one giant server.'),
  },
  {
    id: 'bigdata-definition',
    kicker: 'Definition',
    title: 'Big Data is defined by the limits of traditional systems',
    subtitle: 'It is not just “large data”; it is data whose scale, speed or diversity requires new storage, processing and analysis methods.',
    tone: 'bd-peak bd-m1',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<PressureMeter step={step + 1} />} takeaway="Write definitions using both the problem and the need for new techniques.">
        <div className={`bda-definition ${visible(step, 0)}`}>
          Big Data refers to datasets whose volume, velocity, variety, veracity and value make them difficult to capture, store, manage, process and analyze using traditional database and BI tools.
        </div>
        <RevealList step={step} items={[
          'Large is not enough.',
          'Fast and diverse data changes system design.',
          'Analytics is the reason for storing and processing it.',
          'The goal is decision-making, not data collection for its own sake.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('bigdata', 'Use this as the exam-ready definition slide.'),
  },
  {
    id: 'five-vs',
    kicker: 'Characteristics',
    title: 'The 5Vs describe the pressure Big Data creates',
    subtitle: 'Volume, Velocity, Variety, Veracity and Value give students a structured answer for definitions and comparisons.',
    tone: 'bd-peak bd-m1',
    content: ({ step = 999 }) => <PressureMeter step={step} />,
    notes: makeNotes('bigdata', 'Reveal each V as a pressure on system design.'),
  },
  {
    id: 'volume-velocity-variety',
    kicker: '5Vs Deepening',
    title: 'Volume, Velocity and Variety explain why storage and processing change',
    subtitle: 'These three Vs create the most visible engineering pressure.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<PressureMeter step={2} />}>
        <RevealList step={step} items={[
          'Volume: more records, files and machine-generated events.',
          'Velocity: data arrives continuously and reports must update faster.',
          'Variety: structured tables, JSON logs, text, media and metadata coexist.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('bigdata', 'Ask students to classify each campus source by these three Vs.'),
  },
  {
    id: 'veracity-value',
    kicker: '5Vs Deepening',
    title: 'Veracity and Value decide whether analytics is trustworthy',
    subtitle: 'Bad, duplicated or biased data can produce confident but wrong answers.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<div className="bda-quality-board">
        {['Missing', 'Duplicate', 'Noisy', 'Biased'].map((item, index) => <span key={item} className={visible(step, index)}>{item}</span>)}
        <strong className={visible(step, 3)}>Trusted Insight</strong>
      </div>} takeaway="Value is the final V: insight must lead to useful action.">
        <RevealList step={step} items={[
          'Veracity asks whether data is accurate, complete and reliable.',
          'Noisy campus logs can mislead attendance or usage analysis.',
          'Value asks whether the result improves planning, teaching or operations.',
          'A technically correct analysis is weak if it does not support a decision.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('bigdata', 'Tie data quality to decision risk.'),
  },
  {
    id: 'importance-advantages',
    kicker: 'Importance',
    title: 'Big Data matters because it converts scale into better decisions',
    subtitle: 'The advantage is not the amount of data; it is the insight possible across the complete system.',
    content: ({ step = 999 }) => (
      <div className="bda-card-row three">
        {[
          ['Better understanding', 'combine academic, usage and feedback signals'],
          ['Faster response', 'detect problems while action is still possible'],
          ['Personalization', 'support students based on learning behavior'],
          ['Operational efficiency', 'optimize resources, library, labs and placements'],
          ['Innovation', 'create new services using data-driven evidence'],
          ['Competitive advantage', 'make decisions before competitors do'],
        ].map(([title, text], index) => (
          <article key={title} className={visible(step, index)}>
            <Sparkles {...icon} /><strong>{title}</strong><span>{text}</span>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('bigdata', 'Preserve both importance and advantages in one richer teaching slide.'),
  },
  {
    id: 'challenges',
    kicker: 'Challenges',
    title: 'Big Data challenges are technical, organizational and ethical',
    subtitle: 'Large-scale analytics brings storage, processing, quality, privacy, security and skills problems.',
    content: ({ step = 999 }) => (
      <div className="bda-card-row three warning">
        {[
          ['Storage', 'huge files and retention'],
          ['Processing', 'parallel algorithms and clusters'],
          ['Quality', 'missing, noisy, duplicate data'],
          ['Privacy', 'student and institutional sensitivity'],
          ['Security', 'access control and governance'],
          ['Skills', 'tools, statistics and domain understanding'],
        ].map(([title, text], index) => (
          <article key={title} className={visible(step, index)}>
            <AlertTriangle {...icon} /><strong>{title}</strong><span>{text}</span>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('bigdata', 'Mention governance without derailing the technical flow.'),
  },
  {
    id: 'misconceptions',
    kicker: 'Misconceptions',
    title: 'Big Data is not just a bigger spreadsheet',
    subtitle: 'Students often lose marks by reducing the concept to size alone.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<ShieldAlert size={180} strokeWidth={1.35} className="bda-large-icon" />}>
        <RevealList step={step} items={[
          'Misconception 1: Big Data means only terabytes or petabytes.',
          'Misconception 2: Big Data replaces all SQL systems.',
          'Misconception 3: More data automatically means better decisions.',
          'Misconception 4: Hadoop alone is the full Big Data ecosystem.',
          'Correct view: choose tools based on data shape, scale and question.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('bigdata', 'Use this as an exam guardrail slide.'),
  },
  {
    id: 'bi-section',
    kicker: 'Section 3',
    title: null,
    hideTitle: true,
    layout: 'full',
    content: <SectionSlide number="03" title="Traditional BI, Data Warehouse and the Breaking Point" subtitle="Understand the classic reporting flow before explaining why Big Data platforms are needed." active={3} />,
    notes: makeNotes('bi', 'Transition from Big Data definition to traditional BI contrast.'),
  },
  {
    id: 'traditional-bi',
    kicker: 'Traditional BI',
    title: 'Traditional BI answers known questions from curated data',
    subtitle: 'Business Intelligence supports reporting, dashboards and decision-making using prepared historical data.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<BarChart3 size={180} strokeWidth={1.25} className="bda-large-icon" />} takeaway="BI is strong when the question is known and the data is structured.">
        <RevealList step={step} items={[
          'Managers ask defined questions such as pass percentage by department.',
          'Data is cleaned, integrated and arranged for reporting.',
          'Outputs include dashboards, scorecards, KPIs and OLAP analysis.',
          'The usual rhythm is periodic reporting, not raw real-time exploration.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('bi', 'Define BI positively before listing limitations.'),
  },
  {
    id: 'bi-workflow',
    kicker: 'BI Workflow',
    title: 'BI begins with a business question and a stable schema',
    subtitle: 'The classic workflow is source systems → ETL → warehouse → OLAP/reporting → decision.',
    content: ({ step = 999 }) => <WarehousePipeline step={step} />,
    notes: makeNotes('bi', 'This slide doubles as the BI workflow and warehouse preview.'),
  },
  {
    id: 'bi-limitations',
    kicker: 'BI Limitations',
    title: 'Traditional BI struggles when data arrives fast, raw and varied',
    subtitle: 'The limitation is not intelligence; it is architecture fit.',
    content: ({ step = 999 }) => (
      <div className="bda-limit-flow">
        {[
          ['Rigid schema', 'new fields require redesign'],
          ['Batch ETL delay', 'late insight'],
          ['Structured bias', 'text, logs and media are hard'],
          ['Scale bottleneck', 'centralized processing slows'],
          ['Exploration gap', 'unknown questions are harder'],
        ].map(([title, text], index) => (
          <article key={title} className={visible(step, index)}>
            <strong>{title}</strong><span>{text}</span>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('bi', 'Connect limitations to why Hadoop and distributed processing appear next.'),
  },
  {
    id: 'bi-vs-bigdata',
    kicker: 'Comparison',
    title: 'Traditional BI and Big Data solve different decision problems',
    subtitle: 'A good exam answer compares data, questions, storage, processing and results.',
    tone: 'bd-peak bd-m1',
    content: ({ step = 999 }) => <BiVsBigData step={step} />,
    notes: makeNotes('bi', 'This is the main comparison table.'),
  },
  {
    id: 'use-cases-choice',
    kicker: 'Use Cases',
    title: 'Use cases decide whether BI or Big Data is the better fit',
    subtitle: 'Most organizations use both, because different questions need different architectures.',
    content: ({ step = 999 }) => (
      <div className="bda-usecase-grid">
        {[
          ['BI', 'Semester pass percentage dashboard', 'known KPI, curated data'],
          ['BI', 'Monthly fee collection report', 'stable transaction data'],
          ['Big Data', 'Predict dropout risk from LMS + attendance + feedback', 'mixed signals'],
          ['Big Data', 'Detect banking fraud from transaction streams', 'fast pattern detection'],
          ['Big Data', 'Netflix/Amazon recommendations', 'large behavioral history'],
        ].map(([kind, title, reason], index) => (
          <article key={title} className={`${kind === 'BI' ? 'bi' : 'big'} ${visible(step, index)}`}>
            <strong>{kind}</strong><span>{title}</span><em>{reason}</em>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('bi', 'Include the requested external examples while keeping the Smart Campus as the anchor.'),
  },
  {
    id: 'data-warehouse',
    kicker: 'Data Warehouse',
    title: 'A data warehouse is the classic home of enterprise BI',
    subtitle: 'It integrates historical data from multiple sources for analysis and decision support.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<WarehousePipeline step={2} />} takeaway="Exam phrase: subject-oriented, integrated, time-variant and non-volatile data store.">
        <RevealList step={step} items={[
          'Subject-oriented: organized around areas such as students, fees and results.',
          'Integrated: combines data from different operational systems.',
          'Time-variant: stores history for trend analysis.',
          'Non-volatile: data is loaded and analyzed, not frequently updated like OLTP.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('bi', 'Preserve the standard warehouse characteristics.'),
  },
  {
    id: 'warehouse-architecture',
    kicker: 'Warehouse Architecture',
    title: 'Warehouse architecture moves data through layers',
    subtitle: 'Source systems are cleaned and loaded before users run reports or analysis.',
    content: ({ step = 999 }) => <WarehousePipeline step={step} />,
    notes: makeNotes('bi', 'Name each architecture layer clearly.'),
  },
  {
    id: 'etl',
    kicker: 'ETL',
    title: 'ETL turns operational data into analysis-ready data',
    subtitle: 'Extract, Transform and Load is the cleaning and movement pipeline behind BI.',
    content: ({ step = 999 }) => (
      <div className="bda-etl">
        {[
          ['Extract', 'collect from admissions, exams, fees, LMS'],
          ['Transform', 'clean, validate, standardize, aggregate'],
          ['Load', 'place into warehouse tables for analysis'],
        ].map(([title, text], index) => (
          <article key={title} className={visible(step, index)}>
            <strong>{title}</strong><span>{text}</span>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('bi', 'Use ETL as the key bridge between operational data and BI.'),
  },
  {
    id: 'warehouse-limitations',
    kicker: 'Warehouse Limits',
    title: 'Warehouse bottlenecks appear when volume and variety rise',
    subtitle: 'Warehouses remain useful, but raw high-volume and mixed-format data needs complementary platforms.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<PressureMeter step={step} />} takeaway="Modern architectures often integrate warehouses with Hadoop or data lakes.">
        <RevealList step={step} items={[
          'Loading massive raw data through ETL can be slow.',
          'Rigid schemas make new formats expensive to add.',
          'Unstructured data needs extraction before warehouse use.',
          'Centralized processing can become a performance bottleneck.',
          'This creates the need for distributed Big Data storage and processing.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('bi', 'Do not say warehouse is obsolete; say it needs integration.'),
  },
  {
    id: 'hadoop-section',
    kicker: 'Section 4',
    title: null,
    hideTitle: true,
    layout: 'full',
    tone: 'bd-peak bd-m1',
    content: <SectionSlide number="04" title="Why Hadoop Enters the Story" subtitle="Distributed storage, parallel processing, ecosystem tools and integration with warehouses." active={4} />,
    notes: makeNotes('hadoop', 'Transition from warehouse bottleneck to distributed storage and compute.'),
  },
  {
    id: 'hadoop-need',
    kicker: 'Hadoop',
    title: 'Hadoop changes the strategy: move compute to distributed data',
    subtitle: 'Instead of moving huge data into one machine, Hadoop stores blocks across nodes and processes near them.',
    tone: 'bd-peak bd-m1',
    content: ({ step = 999 }) => <HadoopCore step={step} />,
    notes: makeNotes('hadoop', 'Introduce Hadoop as a solution to scale-out storage and processing.'),
  },
  {
    id: 'hadoop-ecosystem',
    kicker: 'Hadoop Ecosystem',
    title: 'A Hadoop environment is an ecosystem, not one tool',
    subtitle: 'The syllabus expects students to recognize storage, processing, resource management, querying and coordination pieces.',
    content: ({ step = 999 }) => <TechnologyStack step={step} />,
    notes: makeNotes('hadoop', 'Use stack layers to avoid a memorized list of tool names.'),
  },
  {
    id: 'hdfs',
    kicker: 'HDFS',
    title: 'HDFS stores large files by splitting them into distributed blocks',
    subtitle: 'The mental model is simple: blocks live on DataNodes and metadata is coordinated by the NameNode.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<HadoopCore step={step + 1} />} takeaway="Exam point: HDFS is designed for large files, fault tolerance and streaming reads.">
        <RevealList step={step} items={[
          'A huge file is divided into blocks.',
          'Blocks are distributed across DataNodes.',
          'Replication improves fault tolerance.',
          'The NameNode maintains metadata about block locations.',
          'Processing can run close to where the blocks are stored.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('hadoop', 'Keep HDFS concrete through block movement.'),
  },
  {
    id: 'mapreduce-yarn',
    kicker: 'MapReduce + YARN',
    title: 'MapReduce processes data in parallel; YARN manages cluster resources',
    subtitle: 'MapReduce supplies the divide-process-combine programming model, while YARN schedules resources.',
    tone: 'bd-peak bd-m1',
    content: ({ step = 999 }) => (step >= 3 ? <OpeningLogisticsHub /> : <MapReduceFlow step={step} />),
    notes: makeNotes('hadoop', 'Explain MapReduce and YARN together but separate their roles.'),
  },
  {
    id: 'warehouse-hadoop-integration',
    kicker: 'Integration',
    title: 'Hadoop and warehouses work better as partners',
    subtitle: 'Hadoop can store and process raw large-scale data; the warehouse can serve curated BI reporting.',
    content: ({ step = 999 }) => (
      <div className="bda-integration">
        {[
          ['Raw campus data', 'logs, text, files, clickstreams'],
          ['Hadoop / data lake', 'store and process at scale'],
          ['Curated warehouse', 'structured decision data'],
          ['BI + analytics users', 'reports, prediction, action'],
          ['Feedback loop', 'new questions improve data capture'],
        ].map(([title, text], index) => (
          <article key={title} className={visible(step, index)}>
            <strong>{title}</strong><span>{text}</span>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('hadoop', 'This preserves Hadoop and warehouse integration explicitly.'),
  },
  {
    id: 'distributed-processing-flow',
    kicker: 'Distributed Processing',
    title: 'Distributed processing follows divide, process and combine',
    subtitle: 'The same idea appears in Hadoop, Spark and many scalable analytics platforms.',
    tone: 'bd-peak bd-m1',
    content: ({ step = 999 }) => <MapReduceFlow step={step} />,
    notes: makeNotes('hadoop', 'Use this as the worked flow students can redraw in exams.'),
  },
  {
    id: 'analytics-section',
    kicker: 'Section 5',
    title: null,
    hideTitle: true,
    layout: 'full',
    content: <SectionSlide number="05" title="Big Data Analytics: From Data to Action" subtitle="Descriptive, diagnostic, predictive and prescriptive analytics with campus and industry examples." active={6} />,
    notes: makeNotes('analytics', 'Transition from platform mechanics to analytics value.'),
  },
  {
    id: 'big-data-analytics',
    kicker: 'Big Data Analytics',
    title: 'Big Data Analytics converts large-scale data into action',
    subtitle: 'Storage and processing are means; insight and decision are the goal.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<MiniRibbon step={7} active={6} />} takeaway="Analytics is the bridge from data to institutional action.">
        <RevealList step={step} items={[
          'Collect and store data from many systems.',
          'Process it at scale using suitable platforms.',
          'Discover patterns, correlations, anomalies and predictions.',
          'Convert findings into decisions: teaching support, planning, risk detection and service improvement.',
          'Industry examples: retail recommendations, banking fraud, healthcare monitoring and transport optimization.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('analytics', 'State the definition and outcome of Big Data Analytics.'),
  },
  {
    id: 'analytics-levels',
    kicker: 'Analytics Classification',
    title: 'Analytics asks four levels of questions',
    subtitle: 'Each level increases decision support: what happened, why, what may happen and what should be done.',
    tone: 'bd-peak bd-m1',
    content: ({ step = 999 }) => <AnalyticsLevels step={step} />,
    notes: makeNotes('analytics', 'Use the ladder as a memorable exam structure.'),
  },
  {
    id: 'descriptive-diagnostic',
    kicker: 'Analytics Types',
    title: 'Descriptive and diagnostic analytics explain the past',
    subtitle: 'They are often the first step before prediction or prescription.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<AnalyticsLevels step={1} />}>
        <RevealList step={step} items={[
          'Descriptive analytics summarizes what happened: attendance, marks, placement counts.',
          'Diagnostic analytics investigates why it happened: schedule clash, difficult unit, resource issue.',
          'Together they turn historical data into explanations.',
          'Exam tip: pair each type with its question.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('analytics', 'Separate descriptive from diagnostic with a simple question.'),
  },
  {
    id: 'predictive-prescriptive',
    kicker: 'Analytics Types',
    title: 'Predictive and prescriptive analytics guide future action',
    subtitle: 'Prediction estimates what may happen; prescription recommends what to do.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<AnalyticsLevels step={3} />}>
        <RevealList step={step} items={[
          'Predictive analytics estimates likely outcomes: at-risk students, demand, fraud, failures.',
          'Prescriptive analytics recommends an action: mentoring, schedule change, alert or resource allocation.',
          'Prediction without action is incomplete for management decisions.',
          'Exam tip: use “may happen” vs “should do” to avoid confusion.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('analytics', 'Students often confuse prediction with prescription; make the contrast explicit.'),
  },
  {
    id: 'analytics-importance-applications',
    kicker: 'Applications',
    title: 'Analytics appears wherever decisions repeat',
    subtitle: 'The same analytical structure works in education, banking, healthcare, transport, retail and media platforms.',
    content: ({ step = 999 }) => (
      <div className="bda-card-row three">
        {[
          ['Education', 'student success, resource planning'],
          ['Banking', 'fraud detection, risk scoring'],
          ['Healthcare', 'monitoring, diagnosis support'],
          ['Transport', 'traffic prediction, route planning'],
          ['Retail', 'recommendations, demand forecasting'],
          ['Media', 'Netflix-style viewing recommendations'],
        ].map(([title, text], index) => (
          <article key={title} className={visible(step, index)}>
            <LineChart {...icon} /><strong>{title}</strong><span>{text}</span>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('analytics', 'Preserve importance and applications while using varied examples.'),
  },
  {
    id: 'worked-example',
    kicker: 'Worked Example',
    title: 'Worked example: turn campus traces into a student-support decision',
    subtitle: 'This slide ties together data types, Big Data pressure, Hadoop-style processing and analytics classification.',
    content: ({ step = 999 }) => (
      <div className="bda-worked">
        {[
          ['Events', 'attendance, LMS, marks, feedback'],
          ['Store', 'tables + logs + text in scalable storage'],
          ['Process', 'clean, join and aggregate patterns'],
          ['Analyze', 'predict at-risk students'],
          ['Act', 'mentoring, alerts, timetable support'],
          ['Evaluate', 'track improvement next cycle'],
        ].map(([title, text], index) => (
          <article key={title} className={visible(step, index)}>
            <strong>{title}</strong><span>{text}</span>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('analytics', 'Use this as the concrete classroom worked example requested.'),
  },
  {
    id: 'tech-section',
    kicker: 'Section 6',
    title: null,
    hideTitle: true,
    layout: 'full',
    content: <SectionSlide number="06" title="Technology Stack and Tool Selection" subtitle="NoSQL categories, analytical tools, Hadoop ecosystem tools and a practical selection shortcut." active={7} />,
    notes: makeNotes('tech', 'Transition from analytics questions to technology selection.'),
  },
  {
    id: 'bigdata-technology-stack',
    kicker: 'Technology Stack',
    title: 'Big Data stacks solve storage, processing, querying and visualization problems',
    subtitle: 'Think in layers rather than memorizing isolated tool names.',
    content: ({ step = 999 }) => <TechnologyStack step={step} />,
    notes: makeNotes('tech', 'Use this as the complete stack overview.'),
  },
  {
    id: 'nosql-need',
    kicker: 'NoSQL',
    title: 'NoSQL relaxes the rigid relational model for scale and flexibility',
    subtitle: 'NoSQL databases are useful when data is distributed, rapidly changing or naturally non-tabular.',
    content: ({ step = 999 }) => (
      <SlideCanvas visual={<NoSqlTypes step={step} />} takeaway="NoSQL means Not Only SQL: choose it for access pattern and scalability, not fashion.">
        <RevealList step={step} items={[
          'Flexible schemas handle changing records.',
          'Distributed designs support large-scale storage and access.',
          'Different NoSQL categories optimize different access patterns.',
          'Relational databases still remain strong for structured transactions.',
        ]} />
      </SlideCanvas>
    ),
    notes: makeNotes('tech', 'Clarify “Not Only SQL” and avoid replacement language.'),
  },
  {
    id: 'nosql-categories',
    kicker: 'NoSQL Categories',
    title: 'NoSQL databases are chosen by data access pattern',
    subtitle: 'Key-value, document, column-family and graph stores answer different storage questions.',
    content: ({ step = 999 }) => <NoSqlTypes step={step} />,
    notes: makeNotes('tech', 'This preserves the NoSQL categories section.'),
  },
  {
    id: 'analytical-tools',
    kicker: 'Analytical Tools',
    title: 'Analytical tools sit above storage and processing',
    subtitle: 'They help clean data, run models, query large stores and visualize decisions.',
    content: ({ step = 999 }) => (
      <div className="bda-card-row four">
        {[
          ['Query', 'Hive, Pig, SQL-style layers'],
          ['Processing', 'MapReduce, Spark-style engines'],
          ['Modeling', 'R, Python, ML libraries'],
          ['Visualization', 'BI dashboards and charts'],
          ['Coordination', 'workflow, metadata, scheduling'],
        ].map(([title, text], index) => (
          <article key={title} className={visible(step, index)}>
            <Activity {...icon} /><strong>{title}</strong><span>{text}</span>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('tech', 'Keep tool names lightweight but academically complete.'),
  },
  {
    id: 'technology-selection-shortcut',
    kicker: 'Selection Shortcut',
    title: 'Choose technology by the dominant Big Data problem',
    subtitle: 'Students can remember the stack through the question each tool layer answers.',
    content: ({ step = 999 }) => (
      <div className="bda-shortcut">
        {[
          ['Need rows and transactions?', 'RDBMS'],
          ['Need enterprise reporting?', 'Data warehouse + BI'],
          ['Need huge raw files?', 'HDFS / data lake'],
          ['Need flexible records?', 'NoSQL'],
          ['Need parallel computation?', 'MapReduce / Spark'],
          ['Need decisions?', 'Analytics + visualization'],
        ].map(([q, a], index) => (
          <article key={q} className={visible(step, index)}>
            <span>{q}</span><strong>{a}</strong>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('tech', 'This is the requested technology-selection shortcut.'),
  },
  {
    id: 'exam-section',
    kicker: 'Section 7',
    title: null,
    hideTitle: true,
    layout: 'full',
    content: <SectionSlide number="07" title="Exam Preparation and Revision" subtitle="Mind map, answer patterns, viva, two-mark, five-mark, ten-mark questions and one-page revision." active={7} />,
    notes: makeNotes('exam', 'Transition to exam preparation without dropping the story.'),
  },
  {
    id: 'module-mind-map',
    kicker: 'Mind Map',
    title: 'Module 1 fits into one memory map',
    subtitle: 'Students should be able to redraw this before writing long answers.',
    tone: 'bd-peak bd-m1',
    content: ({ step = 999 }) => <MindMap step={step} />,
    notes: makeNotes('exam', 'Use as the complete module recap.'),
  },
  {
    id: 'exam-writing',
    kicker: 'Exam Preparation',
    title: 'Write answers as definitions, comparisons, flows and examples',
    subtitle: 'The best answers use structure: define, draw, compare, apply and conclude.',
    content: ({ step = 999 }) => (
      <div className="bda-answer-pattern">
        {[
          ['Define', 'start with a crisp textbook definition'],
          ['Draw', 'add 5Vs, BI flow, warehouse or Hadoop diagram'],
          ['Compare', 'show Traditional BI vs Big Data where relevant'],
          ['Example', 'use Smart Campus, Google, Netflix, Amazon or banking fraud'],
          ['Conclude', 'state why the concept supports decisions'],
        ].map(([title, text], index) => (
          <article key={title} className={visible(step, index)}>
            <strong>{title}</strong><span>{text}</span>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('exam', 'This preserves exam-focused answer guidance.'),
  },
  {
    id: 'viva-questions',
    kicker: 'Viva Questions',
    title: 'Important viva questions cover the full story',
    subtitle: 'Use these for quick oral revision and class interaction.',
    content: ({ step = 999 }) => <QuestionGrid step={step} questions={[
      'What is Big Data?',
      'Why did Big Data emerge?',
      'Name the 5Vs.',
      'Give examples of structured, semi-structured and unstructured data.',
      'What is data exhaust?',
      'What is the difference between scale-up and scale-out?',
      'Why is Hadoop needed?',
      'What is HDFS?',
      'What is MapReduce?',
      'What role does YARN play?',
      'What is a data warehouse?',
      'What is ETL?',
      'What is Traditional BI?',
      'Name the four analytics types.',
      'What is NoSQL?',
      'Name NoSQL categories.',
      'Give one Big Data application.',
      'How does Big Data support decisions?',
      'What is veracity?',
      'What is value in Big Data?',
    ]} />,
    notes: makeNotes('exam', 'Keep viva questions interactive by revealing them in groups.'),
  },
  {
    id: 'two-mark-questions',
    kicker: 'Two-Mark Questions',
    title: 'Two-mark answers need crisp definitions and examples',
    subtitle: 'Aim for two to four precise lines with one keyword-rich example.',
    content: ({ step = 999 }) => <QuestionGrid step={step} questions={[
      'Define Big Data.',
      'List the 5Vs of Big Data.',
      'What is structured data?',
      'What is semi-structured data?',
      'What is unstructured data?',
      'Define data exhaust.',
      'What is a data warehouse?',
      'Expand ETL and state its purpose.',
      'What is HDFS?',
      'What is NoSQL?',
    ]} />,
    notes: makeNotes('exam', 'Two-mark questions should be short and exact.'),
  },
  {
    id: 'five-mark-questions',
    kicker: 'Five-Mark Questions',
    title: 'Five-mark answers need one diagram plus explanation',
    subtitle: 'Use a compact structure: definition, diagram, three points and example.',
    content: ({ step = 999 }) => <QuestionGrid step={step} questions={[
      'Explain data classification with examples.',
      'Explain the 5Vs of Big Data.',
      'Differentiate scale-up and scale-out.',
      'Explain Traditional BI workflow.',
      'Explain data warehouse architecture.',
      'Explain ETL with an example.',
      'Explain Hadoop ecosystem briefly.',
      'Explain HDFS, MapReduce and YARN.',
      'Explain types of Big Data Analytics.',
      'Explain NoSQL categories.',
    ]} />,
    notes: makeNotes('exam', 'Encourage small diagrams rather than long paragraphs.'),
  },
  {
    id: 'ten-mark-questions',
    kicker: 'Ten-Mark Questions',
    title: 'Ten-mark answers must connect concepts across the module',
    subtitle: 'Write these as structured essays with diagrams, comparisons and examples.',
    content: ({ step = 999 }) => <QuestionGrid step={step} questions={[
      'Explain Big Data evolution, definition, characteristics, advantages and challenges.',
      'Compare Traditional BI and Big Data in detail.',
      'Explain data warehouse architecture and limitations.',
      'Explain Hadoop architecture and its ecosystem.',
      'Explain HDFS, MapReduce and YARN with distributed-processing flow.',
      'Classify Big Data Analytics and explain applications.',
      'Explain NoSQL and its categories with use cases.',
      'Discuss how Hadoop and data warehouse can be integrated.',
      'Explain Big Data technology stack and selection criteria.',
      'Use a college data scenario to explain the need for Big Data Analytics.',
    ]} />,
    notes: makeNotes('exam', 'These are the long-form preparation anchors.'),
  },
  {
    id: 'revision-sheet',
    kicker: 'One-Page Revision',
    title: 'One-page revision sheet: write these keywords before the exam',
    subtitle: 'This is the final compressed memory layer for Module 1.',
    content: ({ step = 999 }) => (
      <div className="bda-revision-sheet">
        {[
          ['Core', 'Data → Information → Knowledge → Decision'],
          ['Data types', 'Structured · Semi-structured · Unstructured'],
          ['Big Data', 'Volume · Velocity · Variety · Veracity · Value'],
          ['BI/Warehouse', 'Known questions · ETL · OLAP · historical data'],
          ['Hadoop', 'HDFS blocks · MapReduce · YARN · scale-out cluster'],
          ['Analytics', 'Descriptive · Diagnostic · Predictive · Prescriptive'],
        ].map(([title, text], index) => (
          <article key={title} className={visible(step, index)}>
            <strong>{title}</strong><span>{text}</span>
          </article>
        ))}
      </div>
    ),
    notes: makeNotes('exam', 'Close by resolving the opening question: Big Data exists to convert overwhelming data into useful decisions.'),
  },
  {
    id: 'resources',
    kicker: 'Study Resources',
    title: 'Continue with notes and previous-year questions',
    subtitle: 'Use the resources after the story is clear, not before it.',
    content: <StudyResourcesSlide />,
    notes: makeNotes('exam', 'Keep the platform resource slide available for notes and PYQ links.'),
  },
]

export const slides = slidesCore.map((slide, index) => ({
  ...slide,
  notes: slide.notes || makeNotes('opening', 'Use this slide as a classroom explanation beat.'),
  section: slide.section || sectionNames[slide.kicker?.toLowerCase()] || undefined,
  slideNumber: index + 1,
}))

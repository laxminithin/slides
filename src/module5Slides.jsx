import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  CheckCircle2,
  CircleDot,
  Code2,
  Database,
  FileCode2,
  FileText,
  Filter,
  GitBranch,
  Globe2,
  GraduationCap,
  HardDrive,
  Hash,
  Link2,
  ListChecks,
  Network,
  Rows3,
  Search,
  ServerCog,
  ShieldCheck,
  Sparkles,
  Table2,
  Tags,
  UsersRound,
  Workflow,
  Zap,
} from 'lucide-react'
import { BdaScaleStrip, HeroScene } from './components/BdaKit'
import { SparkArchitecture as SparkArchViz, SparkExecutors } from './components/SparkViz'
import { PageRankGraph } from './components/PageRankViz'
import { OpeningSearchQuery } from './components/BdaOpenings'

const icon = { size: 24, strokeWidth: 1.75, 'aria-hidden': true }

const story = ['Search', 'Internet', 'Spark', 'Text', 'Web', 'Links', 'PageRank', 'Result', 'Exam']

const vivaQuestions = [
  ['What is Spark?', 'Apache Spark is a distributed data processing engine used for fast batch, interactive, streaming, SQL, ML and graph analytics on large datasets.'],
  ['Why is Spark faster than MapReduce?', 'Spark keeps reusable intermediate data in memory and executes a DAG of transformations, while MapReduce often writes stage output to disk.'],
  ['What is Spark Core?', 'Spark Core is the base execution engine that provides task scheduling, memory management, fault recovery and RDD operations.'],
  ['What is Spark SQL?', 'Spark SQL allows structured data analysis using SQL queries and DataFrame APIs inside Spark.'],
  ['What is MLlib?', 'MLlib is the Spark scalable machine-learning library for classification, regression, clustering, recommendation and feature pipelines.'],
  ['What is GraphX?', 'GraphX is the Spark graph analytics library for vertices, edges and graph algorithms such as PageRank-style link analysis.'],
  ['What is a DataFrame?', 'A DataFrame is a distributed table with named columns, optimized execution and SQL-like operations.'],
  ['Transformation vs action?', 'Transformations build a new logical plan; actions trigger execution and return or save results.'],
  ['What is text mining?', 'Text mining extracts meaningful patterns, topics, sentiments, entities and relationships from unstructured text.'],
  ['What is tokenization?', 'Tokenization splits text into words, terms or smaller units for analysis.'],
  ['What is TF-IDF?', 'TF-IDF weights a term high when it is frequent in one document but uncommon across the full document collection.'],
  ['What is web mining?', 'Web mining applies data-mining methods to web content, hyperlink structure and user usage data.'],
  ['Types of web mining?', 'The main types are web content mining, web structure mining and web usage mining.'],
  ['What is web content analytics?', 'It analyzes page text, HTML, images, metadata and other content features for search, classification and extraction.'],
  ['What is web usage analytics?', 'It analyzes clickstream, sessions and server logs to understand user behavior and improve web services.'],
  ['What is link analytics?', 'Link analytics studies relationships represented by links, edges and graph structure to estimate importance or communities.'],
  ['What is PageRank?', 'PageRank estimates the importance of a web page from the quantity and quality of incoming links and repeated rank flow.'],
  ['What is a web graph?', 'A web graph models pages as nodes and hyperlinks as directed edges.'],
  ['What are hubs?', 'Hubs are pages with many useful outgoing links, like directories or curated lists.'],
  ['What are authorities?', 'Authorities are trusted pages with many strong incoming links from good hubs or important pages.'],
]

const twoMarks = [
  ['Define Spark.', 'Spark is a fast distributed engine for processing large datasets using memory-aware execution.'],
  ['What is DataFrame?', 'A distributed table with named columns and optimized SQL-style operations.'],
  ['What is lazy evaluation?', 'Spark delays execution until an action such as count, show or write is called.'],
  ['Define text mining.', 'Extraction of useful patterns and knowledge from unstructured text.'],
  ['What is tokenization?', 'Breaking text into tokens such as words or terms.'],
  ['What is TF-IDF?', 'A feature weight based on term frequency and inverse document frequency.'],
  ['Define web mining.', 'Mining patterns from web content, structure and usage data.'],
  ['What is web usage analytics?', 'Analysis of clickstreams, sessions and logs to understand user behavior.'],
  ['Define PageRank.', 'A link-analysis algorithm that ranks pages by link-based importance.'],
  ['What is web graph?', 'A directed graph where pages are nodes and hyperlinks are edges.'],
]

const fiveMarks = [
  'Explain Spark architecture using driver, cluster manager, executors and storage.',
  'Differentiate Spark and MapReduce using disk versus memory execution.',
  'Explain data analysis with Spark using ingest, clean, transform, action and export workflow.',
  'Explain text mining pipeline: clean, tokenize, stop-word removal, stemming, TF-IDF and mining tasks.',
  'Explain TF-IDF with intuition, term frequency, inverse document frequency and formula.',
  'Classify web mining into content, structure and usage mining.',
  'Explain web content analytics with HTML, text, images, metadata and indexing.',
  'Explain web usage analytics with logs, sessions, clickstream, metrics and optimization.',
  'Explain PageRank working with rank initialization, link flow, damping and iteration.',
  'Explain web graph analysis with nodes, edges, communities, hubs and authorities.',
]

const tenMarks = [
  'Explain Spark, its architecture, features, abstractions and applications in Big Data Analytics.',
  'Explain introduction to data analysis with Spark using workflow, transformations, actions, Spark SQL, MLlib and GraphX.',
  'Explain text mining, preprocessing, document-term matrix, TF-IDF, tasks, applications and challenges.',
  'Explain web mining, web content analytics, web usage analytics, web logs and web structure mining.',
  'Explain link analytics, PageRank, damping, web graph structure, hubs, authorities and applications.',
  'Previous VTU theme: Spark architecture and Spark versus MapReduce.',
  'Previous VTU theme: RDD, DataFrame, Dataset, transformations, actions and lazy evaluation.',
  'Previous VTU theme: Text mining pipeline and TF-IDF.',
  'Previous VTU theme: Web mining types, content analytics and usage analytics.',
  'Previous VTU theme: PageRank, web graph analysis, hubs and authorities.',
]

function on(stage, at = 0) {
  return stage >= at ? 'is-on' : ''
}

function slide(id, kicker, title, content, notes) {
  return { id, kicker, title, content, notes }
}

function Deck({ children, visual, active = 0, reverse = false, tight = false }) {
  return (
    <div className={`m5-decklet ${reverse ? 'reverse' : ''} ${tight ? 'tight' : ''}`.trim()}>
      <aside className="m5-story" aria-label="Search engine build journey">
        {story.map((item, index) => (
          <span key={item} className={`${index <= active ? 'lit' : ''} ${index === active ? 'now' : ''}`.trim()}>
            {item}
          </span>
        ))}
      </aside>
      <div className="m5-copy">{children}</div>
      <div className="m5-visual">{visual}</div>
    </div>
  )
}

function Points({ items, stage = 999 }) {
  return <ul className="m5-points">{items.map((item, index) => <li key={item} className={on(stage, index)}>{item}</li>)}</ul>
}

function Takeaway({ children }) {
  return <p className="m5-takeaway"><CheckCircle2 {...icon} />{children}</p>
}

function Code({ children, focus }) {
  return (
    <pre className="m5-code">
      {String(children).trim().split('\n').map((line, index) => (
        <code key={`${line}-${index}`} className={focus && line.includes(focus) ? 'focus' : ''}>{line}</code>
      ))}
    </pre>
  )
}

function SearchJourney({ stage = 7 }) {
  const items = [
    ['Search', Search],
    ['Internet', Globe2],
    ['Spark Cluster', ServerCog],
    ['Text Understanding', BrainCircuit],
    ['Link Analysis', Network],
    ['Rank', BarChart3],
    ['Google Result', Sparkles],
  ]
  return <Flow items={items} stage={stage} />
}

function Flow({ items, stage = 999 }) {
  return (
    <div className="m5-flow">
      {items.map(([label, Icon], index) => (
        <article key={label} className={on(stage, index)}>
          {Icon ? <Icon {...icon} /> : <CircleDot {...icon} />}
          <strong>{label}</strong>
        </article>
      ))}
    </div>
  )
}

function ProblemToSpark({ stage = 4 }) {
  return <Flow stage={stage} items={[['Huge Data', Globe2], ['MapReduce', HardDrive], ['Slow Disk Loops', HardDrive], ['Need Faster Engine', Zap], ['Apache Spark', Sparkles]]} />
}

function MapReduceVsSpark({ stage = 4 }) {
  const disk = ['Read', 'Disk', 'Disk', 'Disk', 'Slow']
  const mem = ['Read', 'Memory', 'Memory', 'Memory', 'Write', 'Fast']
  return (
    <div className="m5-compare-flow">
      <article>
        <h3>MapReduce</h3>
        {disk.map((x, i) => <span key={x + i} className={on(stage, i)}>{x}</span>)}
      </article>
      <article className="fast">
        <h3>Spark</h3>
        {mem.map((x, i) => <span key={x + i} className={on(stage + 1, i)}>{x}</span>)}
      </article>
    </div>
  )
}

function SparkArchitecture({ stage = 6 }) {
  return <SparkArchViz phase={stage >= 4 ? 9 : 3} />
}

function ClassroomAnalogy() {
  return (
    <div className="m5-classroom">
      <article><GraduationCap size={42} /><strong>Teacher</strong><span>assigns work</span><b>Driver</b></article>
      <ArrowRight {...icon} />
      <article><UsersRound size={42} /><strong>Students</strong><span>complete parts</span><b>Executors</b></article>
      <ArrowRight {...icon} />
      <article><CheckCircle2 size={42} /><strong>Answer</strong><span>merged result</span><b>Output</b></article>
    </div>
  )
}

function ExecutorsVisual() {
  return <SparkExecutors />
}

function RddVisual() {
  return <Flow items={[['Giant Textbook', BookOpen], ['Split Pages', FileText], ['Parallel Read', UsersRound], ['Merge Answers', CheckCircle2], ['RDD', Database]]} />
}

function DataFrameVisual() {
  const rows = [
    ['page_id', 'title', 'score'],
    ['p01', 'University Admissions', '0.88'],
    ['p02', 'Mysore Colleges', '0.81'],
    ['p03', 'Engineering Ranking', '0.73'],
  ]
  return (
    <div className="m5-sheet">
      {rows.flatMap((row, r) => row.map((cell, c) => <span key={`${r}-${c}`} className={r === 0 ? 'head' : ''}>{cell}</span>))}
      <b><Filter size={18} /> Filter</b><b><Rows3 size={18} /> Sort</b><b><BarChart3 size={18} /> Aggregate</b>
    </div>
  )
}

function LazyVisual() {
  return (
    <div className="m5-lazy">
      {['Read Data', 'Filter', 'Group', 'Sort'].map((x) => <span key={x}>{x}</span>)}
      <strong>Nothing executes yet</strong>
      <b>Action: count()</b>
      <i>Full optimized plan runs</i>
    </div>
  )
}

function StudentTransforms() {
  return <Flow items={[['Student Database', Table2], ['Filter ISE', Filter], ['Join Marks', GitBranch], ['Group Dept', Rows3], ['Sort CGPA', BarChart3]]} />
}

function ActionVisual() {
  return (
    <div className="m5-actions">
      {[
        ['show()', 'Table'],
        ['count()', 'Number'],
        ['write()', 'File'],
        ['collect()', 'Application'],
      ].map(([cmd, out]) => <article key={cmd}><Code2 {...icon} /><strong>{cmd}</strong><span>{out}</span></article>)}
    </div>
  )
}

function WordCountVisual() {
  return (
    <div className="m5-wordcount">
      <p>best engineering college mysore best college</p>
      <ArrowDown {...icon} />
      <div>{['best', 'engineering', 'college', 'mysore', 'best', 'college'].map((w, i) => <span key={w + i}>{w}</span>)}</div>
      <ArrowDown {...icon} />
      <strong>best: 2 | college: 2 | engineering: 1 | mysore: 1</strong>
    </div>
  )
}

function SqlVisual() {
  return (
    <div className="m5-sql">
      <DataFrameVisual />
      <Code>{`SELECT title, score
FROM pages
WHERE city = 'Mysore'
ORDER BY score DESC`}</Code>
      <strong>Search dashboard</strong>
    </div>
  )
}

function PipelineVisual({ labels = ['Data', 'Features', 'Model', 'Prediction'], icons = [Database, Tags, BrainCircuit, CheckCircle2] }) {
  return <Flow items={labels.map((label, index) => [label, icons[index]])} />
}

function SocialGraph() {
  return (
    <div className="m5-social">
      {['Facebook', 'LinkedIn', 'Instagram', 'Web Pages', 'Users'].map((x) => <span key={x}>{x}</span>)}
      <svg viewBox="0 0 500 250" aria-hidden="true">
        <path d="M90 55 L250 45 L410 80 L335 195 L150 180 L90 55 M250 45 L335 195 M150 180 L410 80" />
      </svg>
    </div>
  )
}

function TextPipeline() {
  return <Flow items={[['Webpage', FileCode2], ['Clean', Filter], ['Tokenize', Hash], ['Stop Words', ShieldCheck], ['Stem', Workflow], ['TF-IDF', BarChart3], ['Knowledge', BrainCircuit]]} />
}

function TokenVisual() {
  return <div className="m5-token"><strong>I Love Big Data</strong><ArrowDown {...icon} /><div>{['I', 'Love', 'Big', 'Data'].map((x) => <span key={x}>{x}</span>)}</div></div>
}

function StopWordsVisual() {
  return <div className="m5-token stop">{['best', 'engineering', 'college', 'is', 'the', 'of', 'mysore', 'and'].map((x) => <span key={x} className={['is', 'the', 'of', 'and'].includes(x) ? 'remove' : ''}>{x}</span>)}</div>
}

function StemVisual() {
  return <div className="m5-token"><div>{['Running', 'Runs', 'Runner'].map((x) => <span key={x}>{x}</span>)}</div><ArrowDown {...icon} /><strong>Run</strong></div>
}

function MatrixVisual() {
  const cells = [
    ['Document', 'college', 'mysore', 'hadoop'],
    ['D1', '2', '1', '0'],
    ['D2', '1', '1', '3'],
    ['D3', '0', '0', '4'],
  ]
  return <div className="m5-matrix">{cells.flatMap((r, ri) => r.map((c, ci) => <span key={`${ri}-${ci}`} className={ri === 0 || ci === 0 ? 'head' : ''}>{c}</span>))}</div>
}

function TfIdfVisual() {
  return (
    <div className="m5-tfidf">
      <article><strong>The</strong><span>appears everywhere</span><b>low weight</b></article>
      <article className="hot"><strong>Hadoop</strong><span>appears in Big Data pages</span><b>high weight</b></article>
      <Code>{`TF-IDF(t,d) = TF(t,d) x IDF(t)`}</Code>
    </div>
  )
}

function TextTasks() {
  return (
    <div className="m5-task-grid">
      {[
        ['Classification', 'Admission query or placement query'],
        ['Clustering', 'Similar college pages'],
        ['Sentiment', 'Positive or negative feedback'],
        ['Entity Recognition', 'Engineering College, Mysore, VTU'],
      ].map(([a, b]) => <article key={a}><strong>{a}</strong><span>{b}</span></article>)}
    </div>
  )
}

function WebMiningTypes() {
  return (
    <div className="m5-three">
      <article><FileText size={42} /><strong>Content</strong><span>page text, media, metadata</span></article>
      <article><Network size={42} /><strong>Structure</strong><span>hyperlinks and graph roles</span></article>
      <article><UsersRound size={42} /><strong>Usage</strong><span>clicks, sessions, logs</span></article>
    </div>
  )
}

function Clickstream() {
  return <Flow items={[['Home', Globe2], ['Admissions', FileText], ['Courses', BookOpen], ['Apply', CheckCircle2], ['Exit', ArrowRight]]} />
}

function WebLogs() {
  return <Flow items={[['Browser', Search], ['Server', ServerCog], ['Logs', FileText], ['Analysis', BarChart3]]} />
}

function WebGraph({ rank = false }) {
  return <PageRankGraph showRanks={rank} />
}

function LinkVotes() {
  return (
    <div className="m5-votes">
      <article><strong>Links are votes</strong><span>but quality matters</span></article>
      <article><strong>{'University -> College Site'}</strong><span>strong signal</span></article>
      <article><strong>{'Spam -> College Site'}</strong><span>weak signal</span></article>
    </div>
  )
}

function PageRankLoop() {
  return <PageRankGraph />
}

function DampingVisual() {
  return (
    <div className="m5-damping">
      <article><Link2 size={42} /><strong>User follows links</strong><span>most of the time</span></article>
      <article><Search size={42} /><strong>User types new URL</strong><span>sometimes jumps anywhere</span></article>
      <Takeaway>Damping prevents trapped rank and models random browsing.</Takeaway>
    </div>
  )
}

function HubsAuthorities({ mode = 'both' }) {
  const showHub = mode !== 'authority'
  const showAuthority = mode !== 'hub'
  return (
    <div className="m5-hubs">
      {showHub && <article><strong>Hub</strong><span>Directory site</span><span>many outgoing links</span><b>routes users</b></article>}
      {showAuthority && <article className="authority"><strong>Authority</strong><span>Trusted answer site</span><span>many incoming links</span><b>earns rank</b></article>}
    </div>
  )
}

function ApplicationIcons() {
  return (
    <div className="m5-apps">
      {['Google', 'YouTube', 'Netflix', 'Amazon', 'Spotify', 'LinkedIn', 'Instagram'].map((x) => <span key={x}>{x}</span>)}
    </div>
  )
}

function MindMap() {
  return (
    <div className="m5-mind">
      <strong>Google Search Result</strong>
      {['Spark', 'Text Mining', 'Web Mining', 'Link Analytics', 'PageRank', 'Web Graphs', 'Exam Answers'].map((x) => <span key={x}>{x}</span>)}
    </div>
  )
}

function AccordionQuestions({ pairs }) {
  return (
    <div className="m5-accordion" data-slide-content="true">
      {pairs.map(([q, a], index) => (
        <details key={q} open={index === 0}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}

function FlashCards({ pairs }) {
  return <div className="m5-flash">{pairs.map(([q, a]) => <article key={q}><strong>{q}</strong><span>{a}</span></article>)}</div>
}

function QuestionCards({ items }) {
  return <div className="m5-questions">{items.map((q, i) => <article key={q}><b>{i + 1}</b><span>{q}</span></article>)}</div>
}

function ResourceButtons() {
  return (
    <div className="m5-resource-buttons">
      <a href="#/big-data-analytics/module-5/previous-year-questions">Previous Year Questions</a>
      <a href="#/big-data-analytics/module-5/notes">Notes</a>
    </div>
  )
}

const note = 'Module 5 search-engine story: preserve Spark, text mining, web mining, link analytics, PageRank, web graph, viva and exam coverage while explaining how a query becomes a ranked result.'

export const module5Slides = [
  {
    id: 'm5-open',
    kicker: 'Opening',
    title: 'How does Google answer in 0.3 seconds?',
    tone: 'bd-peak bd-m5',
    content: (
      <Deck active={0} visual={<OpeningSearchQuery />}>
        <p className="m5-lead">A student searches: <strong>"Best Engineering College in Mysore"</strong>. This entire module explains how a search engine turns the Internet into one ranked answer.</p>
        <Takeaway>This is the journey of Module 5.</Takeaway>
        <BdaScaleStrip variant="spark" />
      </Deck>
    ),
    notes: note,
  },
  slide('m5-journey', 'Opening', 'Every Slide Builds the Search Engine', <Deck active={0} visual={<SearchJourney />}><Points items={['Millions of searches happen every second', 'Millions of webpages must be processed', 'Spark handles scale', 'Text mining understands content', 'Web mining and PageRank decide importance']} /></Deck>, note),
  slide('m5-bridge', 'Opening', 'From Hadoop Storage to Search Intelligence', <Deck active={1} visual={<Flow items={[['HDFS Stores Pages', Database], ['Hive/Pig Prepare Data', Workflow], ['Spark Analyzes Fast', Sparkles], ['Mining Extracts Patterns', BrainCircuit], ['Graphs Rank Links', Network]]} />}><p className="m5-lead">Earlier modules stored and prepared massive data. Module 5 asks what happens next: how do billions of pages become searchable knowledge?</p></Deck>, note),
  {
    id: 'm5-spark-reveal',
    kicker: 'Spark',
    title: 'Billions of Pages Need a Faster Engine',
    tone: 'bd-peak bd-m5',
    content: (
      <Deck active={2} visual={<HeroScene beat="Search intelligence" metaphor="An intelligent compute engine for the web" className="bo-influence"><ProblemToSpark /></HeroScene>}>
        <p className="m5-lead">Search engines collect huge web data. MapReduce made distributed processing possible, but repeated disk writes slow iterative analytics.</p>
        <Takeaway>Apache Spark appears when the search engine needs speed.</Takeaway>
      </Deck>
    ),
    notes: note,
  },
  {
    id: 'm5-what-spark',
    kicker: 'Spark',
    title: 'Reveal: Apache Spark',
    tone: 'bd-peak bd-m5',
    content: (
      <Deck active={2} visual={<HeroScene beat="Intelligent engine" metaphor="Driver plans · executors compute · memory keeps work hot" className="bo-influence"><SparkArchitecture stage={2} /></HeroScene>}>
        <p className="m5-definition"><strong>Apache Spark</strong> is a distributed data processing engine designed for fast batch, interactive, streaming and machine-learning workloads on large datasets.</p>
        <Points items={['Distributed', 'In-memory', 'Batch', 'Streaming', 'ML and graph analytics']} />
      </Deck>
    ),
    notes: note,
  },
  slide('m5-why-spark', 'Spark', 'Why Spark Fits Search-Scale Analytics', <Deck active={2} visual={<PipelineVisual labels={['SQL', 'Streaming', 'MLlib', 'GraphX']} icons={[Table2, Workflow, BrainCircuit, Network]} />}><Points items={['Keeps reusable intermediate data in memory', 'Supports SQL, streaming, ML and graph workloads', 'Provides concise APIs in Scala, Java, Python and R', 'Runs on standalone clusters, YARN, Mesos and cloud platforms']} /></Deck>, note),
  {
    id: 'm5-spark-mapreduce',
    kicker: 'Spark',
    title: 'Spark vs MapReduce: Feel the Bottleneck',
    tone: 'bd-peak bd-m5',
    content: (
      <Deck active={2} visual={<HeroScene beat="Speed" metaphor="Disk loops vs an in-memory engine" className="bo-influence"><MapReduceVsSpark /></HeroScene>}>
        <p className="m5-lead">MapReduce is foundational. Spark is the faster general engine for iterative search analytics, feature extraction and ranking workflows.</p>
      </Deck>
    ),
    notes: note,
  },
  slide('m5-ecosystem', 'Spark', 'Spark Ecosystem Inside the Search Lab', <Deck active={2} visual={<PipelineVisual labels={['Spark Core', 'Spark SQL', 'Structured Streaming', 'MLlib', 'GraphX', 'Cluster Manager']} icons={[Sparkles, Table2, Workflow, BrainCircuit, Network, ServerCog]} />}><p className="m5-lead">Spark Core runs jobs; libraries above it analyze structured tables, streams, machine-learning features and web graphs.</p></Deck>, note),
  {
    id: 'm5-architecture',
    kicker: 'Spark',
    title: 'Spark Architecture as a Search Factory',
    tone: 'bd-peak bd-m5',
    content: (
      <Deck active={2} visual={<HeroScene beat="Intelligent engine" metaphor="A search factory: plan once, compute everywhere" annotations={['driver', 'executors', 'memory']} className="bo-influence"><SparkArchitecture /></HeroScene>}>
        <p className="m5-lead">The user submits a job. The driver plans it, the cluster manager allocates resources, executors process partitions, storage provides data, and results return.</p>
      </Deck>
    ),
    notes: note,
  },
  slide('m5-driver', 'Spark', 'Driver: The Teacher of the Cluster', <Deck active={2} visual={<ClassroomAnalogy />}><p className="m5-lead">Teacher assigns work, students solve parts, and the teacher collects the result. In Spark, the teacher is the driver and the students are executors.</p></Deck>, note),
  slide('m5-executors', 'Spark', 'Executors Process Web Pages in Parallel', <Deck active={2} visual={<ExecutorsVisual />}><p className="m5-lead">Executor 1 reads Page Set A, Executor 2 reads Page Set B, and Executor 3 reads Page Set C at the same time.</p><Takeaway>Parallel execution is how massive web data becomes manageable.</Takeaway></Deck>, note),
  slide('m5-lifecycle', 'Spark', 'Spark Application Life Cycle', <Deck active={2} visual={<Flow items={[['Create SparkSession', Sparkles], ['Read Data', Database], ['Transform Data', Workflow], ['Trigger Action', Zap], ['Return or Store Result', CheckCircle2]]} />}><p className="m5-lead">This is the mental model behind Spark code in analytics pipelines.</p></Deck>, note),
  slide('m5-rdd', 'Spark', 'RDD: One Giant Textbook Split Across Students', <Deck active={2} visual={<RddVisual />}><p className="m5-definition"><strong>RDD</strong> is a low-level distributed collection with transformations and actions. Think of one huge textbook split into pages that many students read together.</p></Deck>, note),
  slide('m5-dataframe', 'Spark', 'DataFrame: Spark as a Distributed Spreadsheet', <Deck active={2} visual={<DataFrameVisual />}><p className="m5-definition"><strong>DataFrame</strong> is a distributed table with named columns and optimized execution. Rows, columns, filters, sorting and aggregation become cluster-scale operations.</p></Deck>, note),
  slide('m5-dataset', 'Spark', 'Dataset: DataFrame Plus Type Safety', <Deck active={2} visual={<PipelineVisual labels={['DataFrame', '+', 'Type Safety', 'Dataset']} icons={[Table2, Sparkles, ShieldCheck, Database]} />}><p className="m5-lead">A Dataset adds compile-time type safety to structured data, mainly in JVM languages such as Scala and Java.</p></Deck>, note),
  slide('m5-lazy', 'Spark', 'Lazy Evaluation: Spark Waits for the Real Question', <Deck active={2} visual={<LazyVisual />}><p className="m5-lead">Read, filter, group and sort only build a plan. When an action such as <code>count()</code> asks for an answer, Spark runs the optimized plan.</p></Deck>, note),
  slide('m5-transformations', 'Spark', 'Transformations Build the Search Plan', <Deck active={2} visual={<StudentTransforms />}><p className="m5-lead">Use one student database to remember transformations: filter, join, group and sort create new distributed data without immediately executing.</p></Deck>, note),
  slide('m5-actions', 'Spark', 'Actions Trigger Results', <Deck active={2} visual={<ActionVisual />}><p className="m5-lead">Actions ask Spark to produce something visible: a table, a number, a file or data returned to the application.</p></Deck>, note),
  slide('m5-word-count', 'Spark', 'Word Count Becomes the First Search Signal', <Deck active={2} visual={<WordCountVisual />}><p className="m5-lead">Before ranking pages, a search engine must know which words appear and how often.</p><Code focus="groupBy">{`text = spark.read.text('hdfs:///input')
words = text.selectExpr("explode(split(value,' ')) as word")
counts = words.groupBy('word').count()
counts.show()`}</Code></Deck>, note),
  slide('m5-analysis', 'Spark', 'Data Analysis With Spark', <Deck active={2} visual={<Flow items={[['Ingest Data', Database], ['Clean Data', Filter], ['Explore Patterns', BarChart3], ['Build Query or Model', BrainCircuit], ['Visualize or Export', CheckCircle2]]} />}><p className="m5-lead">Spark is often the compute layer inside a larger analytics pipeline.</p></Deck>, note),
  slide('m5-spark-sql', 'Spark SQL', 'Spark SQL Turns Pages Into Queryable Tables', <Deck active={2} visual={<SqlVisual />}><p className="m5-lead">Structured page metadata can be queried like SQL and shown in dashboards.</p><Code focus="GROUP BY">{`df.createOrReplaceTempView('students')
spark.sql('''
SELECT dept, AVG(cgpa) AS avg_cgpa
FROM students
GROUP BY dept
''').show()`}</Code></Deck>, note),
  slide('m5-mllib', 'MLlib', 'MLlib: From Page Data to Predictions', <Deck active={2} visual={<PipelineVisual labels={['Data', 'Features', 'Model', 'Prediction']} />}><Points items={['Classification predicts categories', 'Regression predicts numeric values', 'Clustering groups similar records', 'Recommendation suggests items from patterns']} /></Deck>, note),
  slide('m5-graphx', 'GraphX', 'GraphX: Connections Become Computable', <Deck active={2} visual={<SocialGraph />}><p className="m5-lead">Facebook, LinkedIn, Instagram and the web can be viewed as graphs. GraphX supports graph-parallel analytics over vertices and edges.</p></Deck>, note),
  slide('m5-spark-mistakes', 'Spark', 'Common Spark Mistakes to Avoid', <Deck active={2} visual={<PipelineVisual labels={['Only MapReduce?', 'collect() huge data?', 'Data skew?', 'Memory limits?']} icons={[Zap, Database, Workflow, ShieldCheck]} />}><Points items={['Spark is more than faster MapReduce', 'Do not call collect on huge datasets', 'Watch partitioning and data skew', 'Transformations and actions are different', 'Memory is powerful but finite']} /></Deck>, note),
  slide('m5-text-open', 'Text Mining', 'Google Processed Pages. Now It Must Understand Language.', <Deck active={3} visual={<Flow items={[['Documents', FileText], ['Words', Hash], ['Meaning', BrainCircuit]]} />}><p className="m5-definition"><strong>Text mining</strong> extracts meaningful patterns, topics, sentiments, entities and relationships from unstructured text data.</p></Deck>, note),
  slide('m5-text-why', 'Text Mining', 'Why Text Mining Matters to Search', <Deck active={3} visual={<TextPipeline />}><Points items={['Most human communication is text-heavy', 'Manual reading cannot scale to millions of documents', 'Search engines need indexing and ranking', 'Businesses analyze feedback and support tickets', 'Security teams mine logs and messages']} /></Deck>, note),
  slide('m5-text-pipeline', 'Text Mining', 'The Search Engine Text Pipeline', <Deck active={3} visual={<TextPipeline />}><p className="m5-lead">A webpage becomes clean tokens, then weighted features, then searchable knowledge.</p></Deck>, note),
  slide('m5-tokenization', 'Text Mining', 'Tokenization Splits the Query', <Deck active={3} visual={<TokenVisual />}><p className="m5-lead">Tokenization breaks text into terms that algorithms can count, compare and index.</p></Deck>, note),
  slide('m5-stopwords', 'Text Mining', 'Stop Words Remove Low-Value Noise', <Deck active={3} visual={<StopWordsVisual />}><p className="m5-lead">Words such as is, the, of and and appear so frequently that they usually add little search meaning.</p></Deck>, note),
  slide('m5-stemming', 'Text Mining', 'Stemming Merges Word Forms', <Deck active={3} visual={<StemVisual />}><p className="m5-lead">Running, runs and runner can be reduced to a root-like form so related terms match more easily.</p></Deck>, note),
  slide('m5-normalize', 'Text Mining', 'Preprocessing Makes Text Comparable', <Deck active={3} visual={<TextPipeline />}><Points items={['Tokenization splits words or terms', 'Stop words remove common low-value words', 'Stemming reduces words to root-like forms', 'Normalization lowercases and removes noise']} /></Deck>, note),
  slide('m5-dtm', 'Text Mining', 'Document-Term Matrix: Text Becomes Numbers', <Deck active={3} visual={<MatrixVisual />}><p className="m5-definition"><strong>Document-term matrix</strong> represents documents as rows, terms as columns, and counts or weights as values.</p></Deck>, note),
  slide('m5-tfidf', 'Text Mining', 'TF-IDF: Distinctive Words Matter More', <Deck active={3} visual={<TfIdfVisual />}><p className="m5-lead">The appears everywhere, so it gets low importance. Hadoop appears mainly on Big Data pages, so it gets higher importance.</p></Deck>, note),
  slide('m5-text-tasks', 'Text Mining', 'Text Mining Tasks Use the Same Page Dataset', <Deck active={3} visual={<TextTasks />}><Points items={['Classification assigns categories', 'Clustering groups similar documents', 'Sentiment detects opinion polarity', 'Entity recognition finds names, places and organizations']} /></Deck>, note),
  slide('m5-feedback', 'Text Mining', 'Text Analytics Example: Student Feedback', <Deck active={3} visual={<Flow items={[['Feedback Forms', FileText], ['Clean Comments', Filter], ['Extract Terms', Tags], ['Find Topics/Sentiment', BrainCircuit], ['Improve Course', CheckCircle2]]} />}><p className="m5-lead">The same pipeline can analyze college feedback, support tickets, reviews and web pages.</p></Deck>, note),
  slide('m5-text-challenges', 'Text Mining', 'Text Mining Challenges', <Deck active={3} visual={<PipelineVisual labels={['Ambiguity', 'Sarcasm', 'Language Variation', 'Sparse Features', 'Privacy and Bias']} icons={[BrainCircuit, Bot, Globe2, MatrixVisual, ShieldCheck]} />}><Points items={['Context changes meaning', 'Sarcasm is difficult to detect', 'Languages and spelling vary widely', 'Term features can be sparse and high-dimensional', 'Privacy and bias must be handled carefully']} /></Deck>, note),
  slide('m5-web-open', 'Web Mining', 'Google Understands Pages. Now It Needs User and Web Patterns.', <Deck active={4} visual={<Flow items={[['Internet', Globe2], ['Millions of Users', UsersRound], ['Need Patterns', BarChart3]]} />}><p className="m5-definition"><strong>Web mining</strong> applies data-mining techniques to discover patterns from web content, web structure and web usage data.</p></Deck>, note),
  slide('m5-web-types', 'Web Mining', 'Three Types of Web Mining', <Deck active={4} visual={<WebMiningTypes />}><p className="m5-lead">Search quality improves when content, hyperlinks and user behavior are studied together.</p></Deck>, note),
  slide('m5-content', 'Web Content', 'Web Content Analytics Reads the Page', <Deck active={4} visual={<Flow items={[['Page', Globe2], ['HTML', FileCode2], ['Text', FileText], ['Images', Sparkles], ['Metadata', Tags]]} />}><Points items={['Title and headings', 'Body text and keywords', 'Images and alt text', 'Metadata and links', 'Structured snippets and tags']} /></Deck>, note),
  slide('m5-content-pipeline', 'Web Content', 'Content Mining Pipeline', <Deck active={4} visual={<Flow items={[['Crawl Pages', Globe2], ['Extract Content', FileText], ['Clean HTML', Filter], ['Index Features', Tags], ['Classify/Search', Search]]} />}><p className="m5-lead">This converts raw pages into searchable records.</p></Deck>, note),
  slide('m5-usage', 'Web Usage', 'Web Usage Analytics Reads Behavior', <Deck active={4} visual={<Clickstream />}><p className="m5-definition"><strong>Web usage analytics</strong> analyzes clickstream, session and server-log data to understand user behavior and improve websites or services.</p></Deck>, note),
  slide('m5-web-logs', 'Web Usage', 'Web Logs Become Insight', <Deck active={4} visual={<WebLogs />}><Points items={['Collect logs', 'Identify users and sessions', 'Clean bot traffic and noise', 'Mine navigation paths', 'Improve user experience']} /></Deck>, note),
  slide('m5-usage-metrics', 'Web Usage', 'Usage Metrics Search Teams Watch', <Deck active={4} visual={<div className="m5-task-grid">{[['Page views', 'number of page loads'], ['Sessions', 'sequence of user interactions'], ['Bounce rate', 'single-page visit proportion'], ['Conversion', 'desired action completion']].map(([a,b]) => <article key={a}><strong>{a}</strong><span>{b}</span></article>)}</div>}><p className="m5-lead">Metrics reveal whether users find answers or leave confused.</p></Deck>, note),
  slide('m5-structure', 'Web Structure', 'Web Structure Mining Turns Links Into a Graph', <Deck active={5} visual={<Flow items={[['Websites', Globe2], ['Links', Link2], ['Graph', Network]]} />}><p className="m5-lead">Pages become nodes. Hyperlinks become directed edges.</p></Deck>, note),
  slide('m5-link-open', 'Link Analytics', 'Links Are Votes, But Votes Are Not Equal', <Deck active={5} visual={<LinkVotes />}><p className="m5-definition"><strong>Link analytics</strong> analyzes relationships among web pages or entities using links, edges and graph structure to estimate importance or discover communities.</p></Deck>, note),
  slide('m5-webgraph', 'Link Analytics', 'Web Graph: Nodes, Edges, Communities, Important Pages', <Deck active={5} visual={<WebGraph />}><p className="m5-lead">A web graph models pages as nodes and hyperlinks as directed edges. Link analytics studies this graph to identify important pages and communities.</p></Deck>, note),
  slide('m5-inlinks', 'Link Analytics', 'In-Links Increase Popularity Signals', <Deck active={5} visual={<Flow items={[['Other Sites', Globe2], ['Link To', Link2], ['This Page', FileText], ['Popularity Increases', BarChart3]]} />}><p className="m5-lead">In-links are links coming into a page and are often treated as signals of importance.</p></Deck>, note),
  slide('m5-outlinks', 'Link Analytics', 'Out-Links Distribute Authority', <Deck active={5} visual={<Flow items={[['This Page', FileText], ['Links Out', Link2], ['Many Sites', Globe2], ['Authority Distributed', Network]]} />}><p className="m5-lead">Out-links leave a page and distribute attention or authority to other pages.</p></Deck>, note),
  {
    id: 'm5-pagerank-open',
    kicker: 'PageRank',
    title: 'Why Wikipedia Before Random Blogs?',
    tone: 'bd-peak bd-m5',
    content: (
      <Deck active={6} visual={<HeroScene beat="Influence" metaphor="Importance flows through a connected world" className="bo-influence"><WebGraph rank /></HeroScene>}>
        <p className="m5-definition"><strong>PageRank</strong> is a link-analysis algorithm that estimates page importance from the quantity and quality of links pointing to it.</p>
      </Deck>
    ),
    notes: note,
  },
  {
    id: 'm5-pagerank-flow',
    kicker: 'PageRank',
    title: 'Watch Authority Move Through Five Websites',
    tone: 'bd-peak bd-m5',
    content: (
      <Deck active={6} visual={<HeroScene beat="Ranking" metaphor="Authority moves like light through a network" annotations={['quality links', 'damping', 'convergence']} className="bo-influence"><WebGraph rank /></HeroScene>}>
        <p className="m5-lead">Government, University and News pages pass stronger signals than a random blog or spam page. Important pages pass more rank.</p>
      </Deck>
    ),
    notes: note,
  },
  {
    id: 'm5-pagerank-steps',
    kicker: 'PageRank',
    title: 'PageRank Working Process',
    tone: 'bd-peak bd-m5',
    content: (
      <Deck active={6} visual={<HeroScene beat="Connections" metaphor="Iterate until the web’s opinion stabilizes" className="bo-influence"><PageRankLoop /></HeroScene>}>
        <Points items={['Initialize ranks', 'Distribute rank through links', 'Apply damping', 'Update ranks', 'Repeat iterations until stable']} />
      </Deck>
    ),
    notes: note,
  },
  slide('m5-damping', 'PageRank', 'Damping: Users Do Not Follow Links Forever', <Deck active={6} visual={<DampingVisual />}><p className="m5-lead">Usually a user follows links. Sometimes the user types a new URL. That random jump is the intuition behind damping.</p></Deck>, note),
  slide('m5-memory', 'PageRank', 'PageRank Memory Trick', <Deck active={6} visual={<PageRankLoop />}><Points items={['Page = node, hyperlink = directed edge', 'In-links increase possible importance', 'Rank flows from page to linked pages', 'Iterations continue until ranks stabilize', 'Damping handles random jumping and dead ends']} /></Deck>, note),
  slide('m5-graph-analysis', 'Web Graph', 'Analyzing a Web Graph', <Deck active={6} visual={<WebGraph />}><Points items={['Ranking finds important pages or entities', 'Community detection finds related groups', 'Hub detection finds useful directories', 'Path analysis studies reachability and navigation flow']} /></Deck>, note),
  slide('m5-hubs', 'Web Graph', 'Hubs: Directory Pages With Many Outgoing Links', <Deck active={6} visual={<HubsAuthorities mode="hub" />}><p className="m5-lead">A hub points to many useful pages and helps navigation.</p></Deck>, note),
  slide('m5-authorities', 'Web Graph', 'Authorities: Trusted Pages With Many Incoming Links', <Deck active={6} visual={<HubsAuthorities mode="authority" />}><p className="m5-lead">An authority is linked by many good hubs or important pages and becomes a trusted answer source.</p></Deck>, note),
  slide('m5-hubs-authorities', 'Web Graph', 'Hubs and Authorities Work Together', <Deck active={6} visual={<HubsAuthorities />}><p className="m5-lead">Strong hubs point to strong authorities; strong authorities are discovered by strong hubs.</p></Deck>, note),
  slide('m5-challenges', 'Web Graph', 'Web Graph Challenges', <Deck active={6} visual={<PipelineVisual labels={['Huge graph', 'Spam links', 'Dead links', 'Incomplete crawl', 'Freshness']} icons={[Globe2, ShieldCheck, Link2, Search, Zap]} />}><Points items={['The web graph is huge and constantly changing', 'Spam links try to manipulate ranking', 'Dead links and duplicate pages create noise', 'Crawling is incomplete and expensive', 'Freshness matters for current pages']} /></Deck>, note),
  slide('m5-applications', 'Applications', 'Where This Search-Engine Pipeline Appears', <Deck active={7} visual={<ApplicationIcons />}><Points items={['Google indexes, ranks and retrieves pages', 'YouTube and Netflix recommend content', 'Amazon optimizes product discovery', 'Spotify ranks music suggestions', 'LinkedIn and Instagram analyze influence and connections']} /></Deck>, note),
  {
    id: 'm5-final-story',
    kicker: 'Final Story',
    title: 'Now the 0.3 Second Answer Makes Sense',
    tone: 'bd-peak bd-m5',
    content: (
      <Deck active={7} visual={<OpeningSearchQuery />}>
        <p className="m5-lead">{'Internet -> Spark -> Text Mining -> Web Mining -> Link Analytics -> PageRank -> Google Search Result.'}</p>
        <Takeaway>The search engine returns the best result within milliseconds because each layer solves one part of the scale, meaning and importance problem.</Takeaway>
      </Deck>
    ),
    notes: note,
  },
  {
    id: 'm5-summary',
    kicker: 'Summary',
    title: 'Module 5 Mind Map',
    tone: 'bd-peak bd-m5',
    content: (
      <Deck active={8} visual={<HeroScene beat="Reflection" metaphor="Search · understanding · influence · answer" className="bo-influence"><MindMap /></HeroScene>}>
        <p className="m5-lead">Spark processes massive data, text mining understands content, web mining discovers content/usage/structure patterns, and PageRank ranks the web graph.</p>
      </Deck>
    ),
    notes: note,
  },
  slide('m5-revision', 'Revision', 'Interactive Revision Cards', <Deck active={8} visual={<div className="m5-task-grid">{['Definitions', 'Architectures', 'Workflows', 'Algorithms', 'Applications'].map((x) => <article key={x}><strong>{x}</strong><span>click through and explain</span></article>)}</div>}><p className="m5-lead">Use the cards as a final oral walkthrough before exam questions.</p></Deck>, note),
  slide('m5-viva', 'Viva · I', '20 Important Viva Questions — 1', <Deck tight active={8} visual={<AccordionQuestions pairs={vivaQuestions.slice(0, 10)} />}><p className="m5-lead">Open each question, answer in one or two exact sentences, then connect it back to the search-engine story.</p></Deck>, note),
  slide('m5-viva-ii', 'Viva · II', '20 Important Viva Questions — 2', <Deck tight active={8} visual={<AccordionQuestions pairs={vivaQuestions.slice(10)} />}><p className="m5-lead">Finish the remaining viva set, then reconnect each answer to Spark, text mining, web mining or PageRank.</p></Deck>, note),
  slide('m5-two-marks', '2 Marks', '10 Two-Mark Questions', <Deck tight active={8} visual={<FlashCards pairs={twoMarks} />}><p className="m5-lead">Two-mark answers should be compact definitions with one keyword example.</p></Deck>, note),
  slide('m5-five-marks', '5 Marks', '10 Five-Mark Questions', <Deck tight active={8} visual={<QuestionCards items={fiveMarks} />}><p className="m5-lead">Five-mark answers need a flow diagram, definition and example.</p></Deck>, note),
  slide('m5-ten-marks', '10 Marks', '10 Ten-Mark and Previous-Year Themes', <Deck tight active={8} visual={<QuestionCards items={tenMarks} />}><p className="m5-lead">Ten-mark answers need definition, architecture or process diagram, example, application and challenge.</p></Deck>, note),
  slide('m5-keywords', 'Summary', 'One-Page Keyword Sheet', <Deck active={8} visual={<div className="m5-keywords">Spark | driver | executor | cluster manager | RDD | DataFrame | Dataset | Spark SQL | MLlib | GraphX | transformation | action | lazy evaluation | text mining | tokenization | stop words | stemming | TF-IDF | document-term matrix | web mining | content mining | usage mining | structure mining | web logs | link analytics | PageRank | damping | web graph | node | edge | in-link | out-link | hub | authority</div>}><p className="m5-lead">Explain Module 5 using only these keywords and the search query: Best Engineering College in Mysore.</p></Deck>, note),
  slide('m5-resources', 'Resources', 'Previous Year Questions and Notes', <Deck active={8} visual={<><ResourceButtons /><MindMap /></>}><p className="m5-lead">Keep the resource buttons available for revision after the interactive lesson.</p></Deck>, note),
]

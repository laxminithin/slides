import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Boxes,
  CheckCircle2,
  Cpu,
  Database,
  FileArchive,
  FileText,
  Gauge,
  GitBranch,
  HardDrive,
  Network,
  Search,
  Server,
  SplitSquareHorizontal,
  Workflow,
  Zap,
} from 'lucide-react'
import { HadoopCluster, HdfsFlow, YarnWorkflow, MapReducePipeline } from './components/HadoopViz'
import { BdaScaleStrip, HeroScene } from './components/BdaKit'
import { OpeningDistributedCity, OpeningLogisticsHub } from './components/BdaOpenings'

const icon = { size: 25, strokeWidth: 1.75, 'aria-hidden': true }

const story = [
  'Large File',
  'Need Hadoop',
  'Blocks',
  'HDFS',
  'Replication',
  'YARN',
  'Map',
  'Shuffle',
  'Reduce',
  'Compression',
  'Analytics',
]

const blocks = [
  { id: 'B1', tone: 'blue', text: 'big data' },
  { id: 'B2', tone: 'teal', text: 'big analytics' },
  { id: 'B3', tone: 'gold', text: 'weather logs' },
  { id: 'B4', tone: 'rose', text: 'movie tags' },
]

function on(stage, at = 0) {
  return stage >= at ? 'is-on' : ''
}

function Deck({ children, visual, stage = 0, active = 0, reverse = false, tight = false }) {
  return (
    <div className={`m2-decklet stage-${stage} ${reverse ? 'reverse' : ''} ${tight ? 'tight' : ''}`.trim()}>
      <aside className="m2-story" aria-label="Large file journey">
        {story.map((item, index) => (
          <span key={item} className={`${index <= active ? 'lit' : ''} ${index === active ? 'now' : ''}`.trim()}>
            {item}
          </span>
        ))}
      </aside>
      <div className="m2-copy">{children}</div>
      <div className="m2-visual">{visual}</div>
    </div>
  )
}

function Points({ items, stage = 999 }) {
  return (
    <ul className="m2-points">
      {items.map((item, index) => <li key={item} className={on(stage, index)}>{item}</li>)}
    </ul>
  )
}

function Takeaway({ children }) {
  return <p className="m2-takeaway"><CheckCircle2 {...icon} />{children}</p>
}

function BigFile({ stage = 0, label = 'campus-events.log', compressed = false }) {
  return (
    <div className={`m2-file ${compressed ? 'compressed' : ''} ${on(stage, 0)}`}>
      <FileText size={48} strokeWidth={1.4} />
      <strong>{label}</strong>
      <span>{compressed ? '400 MB compressed' : '1 GB large file'}</span>
      <i />
    </div>
  )
}

function BlockStrip({ stage = 0, replicated = false, small = false }) {
  return (
    <div className={`m2-block-strip ${small ? 'small' : ''}`}>
      {blocks.map((block, index) => (
        <div key={block.id} className={`m2-block ${block.tone} ${on(stage, index)}`}>
          <strong>{block.id}</strong>
          <span>{block.text}</span>
          {replicated && <em>x3</em>}
        </div>
      ))}
    </div>
  )
}

function Cluster({ stage = 0, replicas = false, highlight = null }) {
  const racks = [
    ['DN1', 'DN2', 'DN3'],
    ['DN4', 'DN5', 'DN6'],
    ['DN7', 'DN8', 'DN9'],
  ]
  const placement = {
    DN1: ['B1', 'B3'],
    DN2: ['B2'],
    DN3: ['B4', 'B1'],
    DN4: ['B2', 'B4'],
    DN5: ['B3'],
    DN6: ['B1'],
    DN7: ['B4'],
    DN8: ['B2', 'B3'],
    DN9: ['B1', 'B4'],
  }
  return (
    <div className="m2-cluster">
      <div className={`m2-namenode ${on(stage, 1)}`}>
        <Database {...icon} />
        <strong>NameNode</strong>
        <span>metadata: file to blocks to locations</span>
      </div>
      <div className="m2-racks">
        {racks.map((rack, rackIndex) => (
          <section key={`rack-${rackIndex}`} className={on(stage, rackIndex + 2)}>
            <b>Rack {rackIndex + 1}</b>
            <div>
              {rack.map((node) => (
                <article key={node} className={highlight === node ? 'hot' : ''}>
                  <Server size={22} strokeWidth={1.6} />
                  <strong>{node}</strong>
                  <span>{replicas ? placement[node].join(' ') : placement[node].slice(0, 1).join(' ')}</span>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

function NeedVisual({ stage = 0 }) {
  return (
    <div className="m2-need" data-slide-decorative="true">
      <div className={`single ${on(stage, 0)}`}>
        <BigFile stage={0} />
        <ArrowDown {...icon} />
        <article><Server {...icon} /><strong>Central server</strong><span>CPU, disk, network bottleneck</span></article>
      </div>
      <div className={`many ${on(stage, 1)}`}>
        <BigFile stage={0} />
        <ArrowDown {...icon} />
        <Cluster stage={4} />
      </div>
    </div>
  )
}

function PrincipleWheel({ stage = 0 }) {
  const items = [
    ['Split', 'large files into blocks', SplitSquareHorizontal],
    ['Replicate', 'copies across nodes', Boxes],
    ['Locality', 'move compute to data', Network],
    ['Parallel', 'run many tasks together', Cpu],
    ['Recover', 'expect node failures', Zap],
  ]
  return (
    <div className="m2-wheel">
      <BigFile stage={0} label="one file" />
      {items.map(([title, text, Icon], index) => (
        <article key={title} className={on(stage, index)}>
          <Icon {...icon} />
          <strong>{title}</strong>
          <span>{text}</span>
        </article>
      ))}
    </div>
  )
}

function ShuffleVisual({ stage = 0 }) {
  const left = ['big', 'data', 'big', 'analytics', 'data', 'big']
  const right = ['big', 'big', 'big', 'data', 'data', 'analytics']
  return (
    <div className="m2-shuffle">
      <section>
        <strong>Mapper outputs</strong>
        {left.map((key, index) => <span key={`${key}-${index}`} className={`${key} ${on(stage, 0)}`}>{key},1</span>)}
      </section>
      <div className={`network ${on(stage, 1)}`}><Network size={68} strokeWidth={1.25} /><b>network transfer</b></div>
      <section>
        <strong>Reducer input</strong>
        {right.map((key, index) => <span key={`${key}-r-${index}`} className={`${key} ${on(stage, index > 4 ? 4 : index > 2 ? 3 : 2)}`}>{key},1</span>)}
      </section>
    </div>
  )
}

function CombinerVisual({ stage = 0 }) {
  return (
    <div className="m2-combiner">
      <section className={on(stage, 0)}><strong>Without combiner</strong><b>100 records</b><ArrowRight {...icon} /><em>network carries 100</em><ArrowRight {...icon} /><span>Reducer</span></section>
      <section className={on(stage, 1)}><strong>With combiner</strong><b>100 records</b><ArrowRight {...icon} /><em>local mini-reduce: 5</em><ArrowRight {...icon} /><span>Reducer</span></section>
      <Takeaway>Safe only when local aggregation cannot change the final answer.</Takeaway>
    </div>
  )
}

function PartitionerVisual({ stage = 0 }) {
  const keys = ['A', 'B', 'C', 'India', 'India', 'India']
  return (
    <div className="m2-partitioner">
      <div className={`hash ${on(stage, 0)}`}>Hash(key) % reducers</div>
      <div className="key-row">{keys.map((key, i) => <span key={`${key}-${i}`} className={on(stage, 1)}>{key}</span>)}</div>
      <div className="reducer-row">
        {['Reducer A', 'Reducer B', 'Reducer C'].map((name, index) => <article key={name} className={on(stage, 2)}><strong>{name}</strong><em>{stage >= 3 && index === 0 ? 'hot key overload' : 'balanced target'}</em></article>)}
      </div>
      <p className={`partition-note ${on(stage, 3)}`}>Poor partitioning leaves one reducer overloaded while others wait.</p>
    </div>
  )
}

function SearchVisual({ stage = 0 }) {
  const rows = ['2026 Mysuru 31C', '2026 Mandya 42C', '2026 Hassan 28C', '2026 Ballari 44C']
  return (
    <div className="m2-search">
      <div className="condition"><Search {...icon} />temperature &gt; 40</div>
      {blocks.map((block, index) => (
        <section key={block.id} className={on(stage, index)}>
          <strong>{block.id}</strong>
          <span className={index === 1 || index === 3 ? 'match' : ''}>{rows[index]}</span>
        </section>
      ))}
      <div className={`search-result ${on(stage, 4)}`}>matching records emitted by mappers</div>
    </div>
  )
}

function SortVisual({ stage = 0 }) {
  const random = ['K7', 'K2', 'K9', 'K1', 'K5']
  const sorted = ['K1', 'K2', 'K5', 'K7', 'K9']
  return (
    <div className="m2-sort">
      <div><strong>Random mapper keys</strong>{random.map((key) => <span key={key} className={on(stage, 0)}>{key}</span>)}</div>
      <ArrowDown className={on(stage, 1)} {...icon} />
      <div><strong>Shuffle sort</strong>{sorted.map((key, index) => <span key={key} className={on(stage, index + 1)}>{key}</span>)}</div>
      <p className={on(stage, 5)}>Reducers receive ordered key groups.</p>
    </div>
  )
}

function CompressionVisual({ stage = 0 }) {
  return (
    <div className="m2-compression">
      <BigFile stage={0} />
      <ArrowRight className={on(stage, 1)} {...icon} />
      <div className={`codec ${on(stage, 1)}`}><FileArchive {...icon} /><strong>Codec</strong><span>fewer bytes</span></div>
      <ArrowRight className={on(stage, 2)} {...icon} />
      <BigFile stage={stage >= 2 ? 0 : -1} label="compressed block" compressed />
      <div className={`trade ${on(stage, 3)}`}><Cpu {...icon} /><span>saves storage + network, costs CPU</span></div>
    </div>
  )
}

function Compare({ left, right, stage = 0 }) {
  return (
    <div className="m2-compare">
      <section className={on(stage, 0)}><h3>{left.title}</h3>{left.items.map((item) => <p key={item}>{item}</p>)}</section>
      <section className={on(stage, 1)}><h3>{right.title}</h3>{right.items.map((item) => <p key={item}>{item}</p>)}</section>
    </div>
  )
}

function CardGrid({ items, stage = 999 }) {
  return (
    <div className="m2-card-grid">
      {items.map(([title, text, Icon = Boxes], index) => (
        <article key={title} className={on(stage, index)}>
          <Icon {...icon} />
          <strong>{title}</strong>
          <span>{text}</span>
        </article>
      ))}
    </div>
  )
}

function Ecosystem({ stage = 999 }) {
  const tools = [
    ['Hive', 'SQL-like query'],
    ['Pig', 'data-flow scripting'],
    ['HBase', 'NoSQL on HDFS'],
    ['Sqoop', 'RDBMS transfer'],
    ['Flume', 'stream/log ingestion'],
    ['Oozie', 'workflow scheduler'],
    ['Ambari', 'cluster management'],
    ['ZooKeeper', 'coordination'],
    ['Spark', 'fast processing contrast'],
  ]
  return (
    <div className="m2-ecosystem">
      <div className="core">Hadoop Core<br /><span>HDFS + YARN + MapReduce</span></div>
      {tools.map(([name, text], index) => <article key={name} className={on(stage, index)}><strong>{name}</strong><span>{text}</span></article>)}
    </div>
  )
}

function MindMap({ stage = 999 }) {
  const branches = ['Need', 'HDFS', 'YARN', 'MapReduce', 'Ecosystem', 'Exam answers']
  return (
    <div className="m2-mind">
      <div className="root">Module 2<br /><span>Hadoop by watching one file</span></div>
      {branches.map((branch, index) => <article key={branch} className={on(stage, index)}>{branch}</article>)}
    </div>
  )
}

function Questions({ questions, stage = 999 }) {
  return (
    <div className="m2-questions">
      {questions.map((question, index) => <article key={question} className={on(stage, index)}><b>{String(index + 1).padStart(2, '0')}</b><span>{question}</span></article>)}
    </div>
  )
}

function slide(id, kicker, title, content, notes) {
  return { id, kicker, title, content, notes }
}

export const module2Slides = [
  {
    id: 'm2-hero',
    kicker: 'VTU BIS701 · Module 2',
    title: null,
    hideTitle: true,
    tone: 'bd-peak bd-m2',
    content: (
      <div className="m2-hero">
        <div>
          <p className="slide-kicker">BIG DATA ANALYTICS</p>
          <h1>Hadoop and MapReduce</h1>
          <p>One large file travels through a living distributed city — HDFS districts, YARN traffic control, MapReduce logistics.</p>
          <div className="m2-hero-path">{story.slice(0, 6).map((item) => <span key={item}>{item}</span>)}</div>
          <BdaScaleStrip variant="hadoop" />
        </div>
        <OpeningDistributedCity />
      </div>
    ),
  },
  slide('m2-journey', 'Learning journey', 'The One-File Story', (
    <Deck active={0} visual={<PrincipleWheel stage={4} />}>
      <p className="m2-lead">Every concept in this module answers one question: how does Hadoop store and process a file too large for one machine?</p>
      <Points items={['Why Hadoop is needed', 'How HDFS stores and returns blocks', 'How YARN gives resources', 'How MapReduce transforms records', 'How shuffle, combiner, partitioner and compression optimize jobs']} />
      <Takeaway>The file never disappears; each section continues its journey.</Takeaway>
    </Deck>
  )),
  slide('m2-central-bottleneck', 'Need Hadoop', 'A Central Server Meets a 1 GB File', (
    <Deck active={1} visual={<NeedVisual stage={0} />}>
      <p className="m2-lead">A single server is easy to manage, but it becomes the bottleneck when data volume, CPU work and network traffic grow together.</p>
      <Points items={['All data moves to one machine', 'CPU, disk and network saturate', 'Scale-up hardware becomes costly', 'Failure affects the whole workload']} />
    </Deck>
  )),
  {
    id: 'm2-scale-out',
    kicker: 'Need Hadoop',
    title: 'Hadoop Changes the Shape of the Problem',
    tone: 'bd-peak bd-m2',
    content: (
      <Deck active={1} visual={<HeroScene beat="Collaboration" metaphor="Many ordinary machines become one intelligent system" className="bo-city"><NeedVisual stage={1} /></HeroScene>}>
        <p className="m2-lead">Hadoop is an open-source framework for distributed storage and parallel processing of very large datasets across commodity clusters.</p>
        <Points items={['Scale out by adding machines', 'Replicate data for fault tolerance', 'Move computation near data blocks', 'Recover from expected node failures']} />
      </Deck>
    ),
  },
  slide('m2-rdbms-limits', 'RDBMS comparison', 'Why Not Only RDBMS?', (
    <Deck active={1} visual={<Compare stage={1} left={{ title: 'RDBMS', items: ['Structured rows and columns', 'Schema before write', 'ACID transactions', 'Best for OLTP and reports'] }} right={{ title: 'Hadoop', items: ['Files and mixed data', 'Schema can be applied on read', 'Batch distributed processing', 'Best for large-scale analytics'] }} />}>
      <p className="m2-lead">Relational systems are powerful; Hadoop is needed when the workload is large-file, mixed-format and batch-analytic.</p>
      <Takeaway>Exam comparison: structure, schema, transaction model, scaling style and best use case.</Takeaway>
    </Deck>
  )),
  slide('m2-good-fit', 'Use cases', 'When the File Belongs in Hadoop', (
    <Deck active={1} visual={<CardGrid items={[['Logs', 'clickstream and server log analytics', FileText], ['Weather', 'year-temperature extraction', Gauge], ['MovieLens', 'rating and tag aggregation', BarChart3], ['Not ideal', 'tiny low-latency row updates', Zap]]} />}>
      <p className="m2-lead">Hadoop fits huge files and batch analytics; it is not a replacement for every transactional database.</p>
      <Points items={['Good: log processing and clickstream analytics', 'Good: large file storage and batch summarization', 'Poor fit: small frequent row-level updates', 'Poor fit: low-latency transactions']} />
    </Deck>
  )),
  slide('m2-history', 'History', 'Hadoop Grew from Web-Scale Search', (
    <Deck active={1} visual={<CardGrid items={[['Web crawling', 'massive pages to store'], ['Distributed files', 'large files across machines'], ['MapReduce paper', 'divide and combine processing'], ['Nutch to Hadoop', 'Doug Cutting and open source'], ['Ecosystem', 'Hive, Pig, HBase, Sqoop, Flume, Oozie, Spark']]} />}>
      <p className="m2-lead">Search engines needed distributed storage and processing before ordinary enterprises did.</p>
      <Takeaway>Remember the evolution as ideas plus ecosystem, not only dates.</Takeaway>
    </Deck>
  )),
  slide('m2-core-layers', 'Overview', 'Three Core Layers Carry the File', (
    <Deck active={1} visual={<CardGrid items={[['HDFS', 'distributed file storage', HardDrive], ['MapReduce', 'parallel batch processing', GitBranch], ['YARN', 'resource management and scheduling', Workflow]]} />}>
      <p className="m2-lead">Hadoop separates storage, processing and resource negotiation so large jobs can be coordinated across many nodes.</p>
      <Points items={['Hadoop Common provides shared utilities', 'HDFS stores blocks', 'MapReduce processes key-value data', 'YARN allocates containers and schedules applications']} />
    </Deck>
  )),
  slide('m2-design-principles', 'Overview', 'Design Principles Before Architecture', (
    <Deck active={1} visual={<PrincipleWheel stage={4} />}>
      <Points items={['Split large files into fixed-size blocks', 'Replicate blocks for reliability', 'Schedule computation near stored data', 'Run tasks in parallel', 'Expect machine failures and recover automatically']} />
      <Takeaway>These ideas make commodity clusters practical.</Takeaway>
    </Deck>
  )),
  slide('m2-hdfs-definition', 'HDFS', 'HDFS Stores Huge Files as Blocks', (
    <Deck active={3} visual={<><BigFile stage={0} /><ArrowDown className="m2-mid-arrow" {...icon} /><BlockStrip stage={3} replicated /></>}>
      <p className="m2-lead">HDFS is Hadoop Distributed File System: it splits large files into blocks, stores them on DataNodes and uses replication for fault tolerance.</p>
      <Points items={['Designed for very large files', 'Supports gigabytes to petabytes', 'Schema-independent storage', 'High-throughput streaming reads', 'Optimized for write-once, read-many workloads']} />
    </Deck>
  )),
  slide('m2-write-1', 'HDFS write', 'Client Uploads the File', <Deck active={3} visual={<HdfsFlow mode="write" phase={0} />}><p className="m2-lead">The client starts with the same large file and asks HDFS to store it.</p></Deck>),
  slide('m2-write-2', 'HDFS write', 'HDFS Splits the File', <Deck active={2} visual={<HdfsFlow mode="write" phase={1} />}><p className="m2-lead">The file becomes blocks B1, B2, B3 and B4 so storage and processing can be distributed.</p></Deck>),
  slide('m2-write-3', 'HDFS write', 'Metadata Is Created', <Deck active={3} visual={<HdfsFlow mode="write" phase={2} />}><p className="m2-lead">The NameNode records the namespace, block IDs and target locations. It is the metadata brain, not the data warehouse.</p></Deck>),
  slide('m2-write-4', 'HDFS write', 'Blocks Land on DataNodes', <Deck active={3} visual={<HdfsFlow mode="write" phase={3} />}><p className="m2-lead">Actual bytes are stored on DataNodes across racks.</p></Deck>),
  slide('m2-write-5', 'HDFS write', 'Replication Protects the File', <Deck active={4} visual={<HdfsFlow mode="write" phase={4} failure />}><p className="m2-lead">Multiple copies of blocks protect against disk or node failure.</p></Deck>),
  slide('m2-write-6', 'HDFS write', 'Write Complete: HDFS Confirms Storage', <Deck active={4} visual={<HdfsFlow mode="write" phase={5} />}><p className="m2-lead">The file is now distributed, replicated and tracked by metadata.</p><Takeaway>Block + DataNode + replication + NameNode metadata is the HDFS answer pattern.</Takeaway></Deck>),
  slide('m2-read-1', 'HDFS read', 'Client Requests the File', <Deck active={3} visual={<HdfsFlow mode="read" phase={1} />}><p className="m2-lead">To read the file, the client first asks for metadata.</p></Deck>),
  slide('m2-read-2', 'HDFS read', 'NameNode Returns Locations', <Deck active={3} visual={<HdfsFlow mode="read" phase={2} />}><p className="m2-lead">The NameNode returns where B1, B2, B3 and B4 live; normal file data does not flow through the NameNode.</p></Deck>),
  slide('m2-read-3', 'HDFS read', 'Client Contacts DataNodes', <Deck active={3} visual={<HdfsFlow mode="read" phase={3} />}><p className="m2-lead">The client streams blocks from the closest or healthiest DataNodes, often in parallel.</p></Deck>),
  slide('m2-read-4', 'HDFS read', 'Blocks Reconstruct the File', <Deck active={3} visual={<HdfsFlow mode="read" phase={4} />}><p className="m2-lead">Returned blocks are assembled into the original file.</p><Takeaway>Read path: client to NameNode lookup to DataNodes to reconstructed file.</Takeaway></Deck>),
  {
    id: 'm2-namenode-datanode',
    kicker: 'HDFS architecture',
    title: 'NameNode vs DataNode',
    tone: 'bd-peak bd-m2',
    content: (
      <Deck active={3} visual={<OpeningDistributedCity />}>
        <Compare stage={1} left={{ title: 'NameNode', items: ['Stores namespace and metadata', 'Tracks block locations', 'Controls file access', 'Needs strong memory and health'] }} right={{ title: 'DataNode', items: ['Stores actual blocks', 'Serves read/write data', 'Sends heartbeats', 'Reports block status'] }} />
      </Deck>
    ),
  },
  slide('m2-secondary-nn', 'HDFS metadata', 'Primary and Secondary NameNode', (
    <Deck active={3} visual={<Compare stage={1} left={{ title: 'Primary NameNode', items: ['Maintains HDFS metadata', 'Uses FSImage and edit records', 'Tracks namespace and block map'] }} right={{ title: 'Secondary NameNode', items: ['Periodically creates checkpoints', 'Merges metadata state', 'Supports recovery scenarios', 'Not a live automatic standby'] }} />}>
      <p className="m2-lead">The Secondary NameNode helps checkpoint metadata; students should not describe it as the direct live backup.</p>
    </Deck>
  )),
  slide('m2-hdfs-pros-cons', 'HDFS revision', 'HDFS Advantages and Limitations', (
    <Deck active={3} visual={<Compare stage={1} left={{ title: 'Advantages', items: ['High throughput for large files', 'Fault tolerant through replication', 'Commodity clusters', 'Supports data locality'] }} right={{ title: 'Limitations', items: ['Not ideal for many tiny files', 'Not for frequent random updates', 'High latency for small operations', 'Depends on metadata health'] }} />}>
      <Takeaway>HDFS is designed for large streaming reads and writes.</Takeaway>
    </Deck>
  )),
  slide('m2-processing-bridge', 'Processing', 'Now Move the Work to the Blocks', (
    <Deck active={6} visual={<><HadoopCluster /><div className="m2-task-badges"><span>map B1</span><span>map B2</span><span>map B3</span><span>map B4</span></div></>}>
      <p className="m2-lead">Hadoop processing starts with input in HDFS, then schedules tasks near the stored blocks.</p>
      <Points items={['Input in HDFS', 'Job submitted', 'Tasks scheduled near data', 'Parallel processing', 'Output written back to HDFS']} />
    </Deck>
  )),
  slide('m2-data-locality', 'Processing', 'Data Locality Reduces Network Pressure', (
    <Deck active={6} visual={<Compare stage={1} left={{ title: 'Without locality', items: ['Huge data travels across the network to compute'] }} right={{ title: 'With locality', items: ['Small program runs near stored data blocks', 'Less network traffic and better throughput'] }} />}>
      <p className="m2-lead">Sending computation to rooms is cheaper than moving every student into one room.</p>
    </Deck>
  )),
  {
    id: 'm2-yarn-def',
    kicker: 'YARN',
    title: 'YARN Manages Resources and Applications',
    tone: 'bd-peak bd-m2',
    content: (
      <Deck active={5} visual={<HeroScene beat="Movement" metaphor="Cluster traffic control for every job" annotations={['submit', 'allocate', 'run']} className="bo-city"><YarnWorkflow phase={9} /></HeroScene>}>
        <p className="m2-lead">YARN, Yet Another Resource Negotiator, allocates CPU and memory containers and coordinates application execution.</p>
        <Points items={['ResourceManager is the cluster authority', 'NodeManager manages one worker node', 'ApplicationMaster coordinates one job', 'Containers hold CPU and memory', 'Scheduler improves cluster utilization']} />
      </Deck>
    ),
  },
  slide('m2-yarn-1', 'YARN lifecycle', 'Application Submitted', <Deck active={5} visual={<YarnWorkflow phase={0} />}><p className="m2-lead">The word count job enters the cluster as an application.</p></Deck>),
  slide('m2-yarn-2', 'YARN lifecycle', 'ResourceManager Takes Control', <Deck active={5} visual={<YarnWorkflow phase={1} />}><p className="m2-lead">ResourceManager is the central authority for available cluster resources.</p></Deck>),
  slide('m2-yarn-3', 'YARN lifecycle', 'ApplicationMaster Starts', <Deck active={5} visual={<YarnWorkflow phase={2} />}><p className="m2-lead">ApplicationMaster negotiates resources and monitors this one application.</p></Deck>),
  slide('m2-yarn-4', 'YARN lifecycle', 'Containers Are Allocated', <Deck active={5} visual={<YarnWorkflow phase={4} />}><p className="m2-lead">NodeManagers launch tasks inside allocated CPU and memory containers.</p></Deck>),
  slide('m2-yarn-5', 'YARN lifecycle', 'Execution Is Monitored', <Deck active={5} visual={<YarnWorkflow phase={6} />}><p className="m2-lead">YARN lets different processing engines share one cluster instead of tying resource management to MapReduce alone.</p></Deck>),
  {
    id: 'm2-mr-def',
    kicker: 'MapReduce',
    title: 'MapReduce Is Divide and Combine Programming',
    tone: 'bd-peak bd-m2',
    content: (
      <Deck active={6} visual={<OpeningLogisticsHub />}>
        <p className="m2-lead">MapReduce maps records into key-value pairs, groups them, then reduces each group into final output.</p>
        <Points items={['Mapper emits (key, value) pairs', 'Shuffle transfers, groups and sorts keys', "Reducer aggregates each key's values", 'Output written to HDFS']} />
      </Deck>
    ),
  },
  slide('m2-word-1', 'Word count', 'Input Record', <Deck active={6} visual={<MapReducePipeline phase={0} />}><p className="m2-lead">The same file contributes a block containing: big data big analytics.</p></Deck>),
  slide('m2-word-2', 'Word count', 'Mapper Emits Pairs', <Deck active={6} visual={<MapReducePipeline phase={2} />}><p className="m2-lead">For each word, mapper emits `(word, 1)`.</p></Deck>),
  slide('m2-word-3', 'Word count', 'Shuffle Groups Same Keys', <Deck active={7} visual={<MapReducePipeline phase={4} />}><p className="m2-lead">The hidden middle stage moves keys across the network and groups equal keys together.</p></Deck>),
  slide('m2-word-4', 'Word count', 'Reducer Sums Values', <Deck active={8} visual={<MapReducePipeline phase={6} />}><p className="m2-lead">Reducer receives grouped values and writes final counts.</p><Takeaway>Never explain MapReduce without key-value pairs.</Takeaway></Deck>),
  slide('m2-shuffle', 'Shuffle and sort', 'Shuffle Is the Network Middle of MapReduce', (
    <Deck active={7} visual={<ShuffleVisual stage={4} />}>
      <p className="m2-lead">Shuffle transfers mapper output so every reducer receives all values for its assigned keys.</p>
      <Points items={['Mapper outputs intermediate pairs', 'Partitioner chooses reducer destination', 'Network transfer moves the pairs', 'Framework sorts and groups keys', 'Reducer receives ordered key groups']} />
    </Deck>
  )),
  slide('m2-combiner', 'Combiner', 'Combiner Performs Local Mini-Reduce', (
    <Deck active={7} visual={<CombinerVisual stage={1} />}>
      <p className="m2-lead">A combiner is optional local aggregation that reduces mapper output before shuffle.</p>
      <Points items={['Useful for sum, count and min/max', 'Must be associative and logically safe', 'Not safe for naive average without count', 'Reduces network traffic and often speeds jobs']} />
    </Deck>
  )),
  slide('m2-partitioner', 'Partitioner', 'Partitioner Chooses the Reducer', (
    <Deck active={7} visual={<PartitionerVisual stage={3} />}>
      <p className="m2-lead">The partitioner assigns intermediate keys to reducers, usually using a hash, while keeping same-key values together.</p>
      <Takeaway>Good partitioning balances reducers; skew creates bottlenecks.</Takeaway>
    </Deck>
  )),
  slide('m2-searching', 'Searching', 'Searching Happens Inside Distributed Blocks', (
    <Deck active={6} visual={<SearchVisual stage={4} />}>
      <p className="m2-lead">For searching, each mapper checks records in its local block and emits only matching records.</p>
      <Points items={['Input records live across HDFS blocks', 'Mapper checks a condition', 'Matches are highlighted and emitted', 'Reducer may group or summarize if needed']} />
    </Deck>
  )),
  slide('m2-sorting', 'Sorting', 'Sorting Prepares Ordered Reducer Input', (
    <Deck active={7} visual={<SortVisual stage={5} />}>
      <p className="m2-lead">MapReduce sorts intermediate keys before reducers. Secondary sorting uses composite keys to control value order inside groups.</p>
      <Points items={['Primary key controls grouping', 'Secondary key controls value order', 'Useful for time-series records', 'Requires careful composite key design']} />
    </Deck>
  )),
  slide('m2-compression', 'Compression', 'Compression Shrinks the Same File', (
    <Deck active={9} visual={<CompressionVisual stage={3} />}>
      <p className="m2-lead">Compression encodes data using fewer bytes so Hadoop jobs read, write, store and shuffle less data.</p>
      <Points items={['Less disk space and storage cost', 'Less network transfer during shuffle', 'Can speed I/O-heavy jobs', 'Costs CPU', 'Codec and splittability matter']} />
    </Deck>
  )),
  slide('m2-job-anatomy', 'MapReduce revision', 'Complete Job Anatomy', (
    <Deck active={10} visual={<CardGrid stage={5} items={[['InputFormat', 'turns files into splits'], ['Mapper', 'emits key-value pairs'], ['Combiner', 'optional local aggregation'], ['Partitioner', 'routes keys to reducers'], ['Shuffle/sort', 'transfers and groups keys'], ['Reducer', 'writes final output']]} />}>
      <p className="m2-lead">A strong long answer walks through this chain in order.</p>
      <Takeaway>InputFormat to Mapper to Combiner to Partitioner to Shuffle/sort to Reducer.</Takeaway>
    </Deck>
  )),
  slide('m2-mistakes', 'Common mistakes', 'Correct These Before the Exam', (
    <Deck active={10} visual={<CardGrid items={[['Mapper scope', 'mapper does not see the whole dataset'], ['Reducer input', 'receives grouped values for a key'], ['Combiner', 'optional and must be safe'], ['Partitioner', 'controls reducer destination'], ['Shuffle', 'can dominate job time']]} />}>
      <p className="m2-lead">These misconceptions make otherwise correct answers shallow.</p>
    </Deck>
  )),
  slide('m2-ecosystem', 'Ecosystem', 'Hadoop Ecosystem Around the File', (
    <Deck active={10} visual={<Ecosystem stage={8} />}>
      <p className="m2-lead">Hadoop core is surrounded by tools for query, workflow, management, transfer, streaming, coordination and machine learning-style analytics.</p>
      <Points items={['Hive asks SQL-like questions', 'Pig describes data flows', 'Sqoop moves structured data between RDBMS and Hadoop', 'Flume collects logs and streams', 'Oozie schedules workflows; Ambari manages clusters; ZooKeeper coordinates nodes']} />
    </Deck>
  )),
  slide('m2-hadoop1-2', 'Version comparison', 'Hadoop 1 vs Hadoop 2', (
    <Deck active={5} visual={<Compare stage={1} left={{ title: 'Hadoop 1', items: ['Single master architecture', 'JobTracker handles resources and processing', 'Single point of failure concern', 'MapReduce v1'] }} right={{ title: 'Hadoop 2', items: ['YARN separates resource management', 'ApplicationMaster per job', 'Improved availability', 'MapReduce v2 and other engines'] }} />}>
      <Takeaway>YARN is the major architecture shift students should remember.</Takeaway>
    </Deck>
  )),
  slide('m2-zookeeper-oozie', 'Ecosystem tools', 'ZooKeeper and Oozie', (
    <Deck active={10} visual={<Compare stage={1} left={{ title: 'ZooKeeper', items: ['Naming service', 'Configuration management', 'Leader election', 'Locking and synchronization', 'Reliable registry and atomic updates'] }} right={{ title: 'Oozie', items: ['Schedules Hadoop jobs', 'Builds workflow jobs', 'Coordinates jobs by time or data availability'] }} />}>
      <p className="m2-lead">Coordination and workflow are separate needs in a distributed platform.</p>
    </Deck>
  )),
  slide('m2-sqoop-flume', 'Ecosystem tools', 'Sqoop and Flume', (
    <Deck active={10} visual={<Compare stage={1} left={{ title: 'Sqoop', items: ['Transfers structured data between RDBMS and Hadoop', 'Example: MySQL to HDFS', 'Uses parallel import/export'] }} right={{ title: 'Flume', items: ['Collects streaming logs into Hadoop', 'Example: sensors and social logs to HDFS', 'Uses Source, Channel and Sink'] }} />}>
      <Takeaway>Sqoop is for structured database transfer; Flume is for streaming/log ingestion.</Takeaway>
    </Deck>
  )),
  slide('m2-hive-pig-hbase', 'Ecosystem tools', 'Hive, Pig, HBase, Ambari and Mahout', (
    <Deck active={10} visual={<CardGrid items={[['Hive', 'warehouse layer with HiveQL'], ['Pig', 'Pig Latin data-flow scripts'], ['HBase', 'NoSQL real-time read/write on HDFS'], ['Ambari', 'install, configure, monitor clusters'], ['Mahout', 'scalable ML algorithms: clustering, classification, recommendations']]} />}>
      <p className="m2-lead">Each ecosystem tool answers a different user need on top of distributed storage and processing.</p>
    </Deck>
  )),
  slide('m2-mindmap', 'Summary', 'Module 2 in One Mind Map', (
    <Deck active={10} visual={<MindMap stage={5} />}>
      <p className="m2-lead">The complete story is now visible: why Hadoop exists, where the file lives, who manages resources, how computation runs and how the output is optimized.</p>
      <Takeaway>WHY Hadoop to HDFS stores to YARN manages to MapReduce processes to optimizations improve.</Takeaway>
    </Deck>
  )),
  slide('m2-exam-shortcuts', 'Exam preparation', 'Exam-Writing Shortcuts', (
    <Deck active={10} visual={<CardGrid items={[['HDFS answer', 'block, replication, NameNode, DataNode'], ['YARN answer', 'RM, NM, AM, container'], ['MapReduce answer', 'key-value pairs and flow'], ['Comparison', 'table with at least five rows'], ['Long answer', 'definition + diagram + process + example + limitation']]} />}>
      <p className="m2-lead">Turn concepts into marks by using the same structure every time.</p>
    </Deck>
  )),
  slide('m2-viva', 'Viva', '20 Important Viva Questions', (
    <Deck tight active={10} visual={<Questions questions={['What is Hadoop?', 'Why Hadoop?', 'Why not only RDBMS?', 'RDBMS vs Hadoop?', 'What is HDFS?', 'What is a block?', 'What is replication?', 'NameNode role?', 'DataNode role?', 'What is data locality?', 'What is YARN?', 'ResourceManager role?', 'NodeManager role?', 'What is ApplicationMaster?', 'What is MapReduce?', 'Mapper role?', 'Reducer role?', 'Combiner role?', 'Partitioner role?', 'Why compression?']} />}>
      <p className="m2-lead">Rapid-fire oral revision: answer each in one crisp sentence.</p>
    </Deck>
  )),
  slide('m2-two-mark', '2 marks', 'Two-Mark Question Bank', (
    <Deck tight active={10} visual={<Questions questions={['Define Hadoop.', 'Expand HDFS.', 'What is NameNode?', 'What is DataNode?', 'Define YARN.', 'What is a container?', 'Define MapReduce.', 'What is mapper?', 'What is reducer?', 'What is combiner?']} />}>
      <p className="m2-lead">Two-mark answers need exact definitions plus one example where possible.</p>
    </Deck>
  )),
  slide('m2-five-mark', '5 marks', 'Five-Mark Question Bank', (
    <Deck tight active={10} visual={<Questions questions={['Explain why Hadoop is needed.', 'Differentiate RDBMS and Hadoop.', 'Explain Hadoop overview.', 'Explain HDFS architecture.', 'Explain HDFS read/write process.', 'Explain YARN architecture.', 'Explain MapReduce flow.', 'Explain mapper and reducer with example.', 'Explain combiner and partitioner.', 'Explain searching, sorting and compression.']} />}>
      <p className="m2-lead">Five-mark answers should include one diagram and five clear points.</p>
    </Deck>
  )),
  slide('m2-ten-mark', '10 marks', 'Ten-Mark Question Bank', (
    <Deck tight active={10} visual={<Questions questions={['Explain Hadoop, need, history, overview and use cases.', 'Explain HDFS architecture and file read/write process.', 'Explain YARN architecture and application life cycle.', 'Explain MapReduce programming with mapper, reducer, shuffle and sort.', 'Explain combiner, partitioner, searching, sorting and compression.', 'Previous VTU Q1 placeholder: fill from past paper.', 'Previous VTU Q2 placeholder: fill from past paper.', 'Previous VTU Q3 placeholder: fill from past paper.', 'Previous VTU Q4 placeholder: fill from past paper.', 'Previous VTU Q5 placeholder: fill from past paper.']} />}>
      <p className="m2-lead">Long answers need story, definition, architecture diagram, process, example and limitations.</p>
    </Deck>
  )),
  slide('m2-revision', 'Revision', 'One-Page Keyword Sheet', (
    <Deck active={10} visual={<div className="m2-keywords">Hadoop · HDFS · NameNode · DataNode · block · replication · rack awareness · data locality · MapReduce · mapper · reducer · shuffle · sort · combiner · partitioner · YARN · ResourceManager · NodeManager · ApplicationMaster · container · searching · sorting · compression</div>}>
      <p className="m2-lead">End revision by explaining the full module using only these keywords.</p>
      <Takeaway>Definition + architecture diagram + stepwise working + example + limitation = strong answer.</Takeaway>
    </Deck>
  )),
  {
    id: 'm2-end',
    kicker: 'Module 2 complete',
    title: null,
    hideTitle: true,
    tone: 'bd-peak bd-m2',
    content: (
      <div className="m2-end">
        <OpeningDistributedCity />
        <h2>Students should now watch Hadoop work.</h2>
        <p>Large file to HDFS blocks to YARN containers to MapReduce pipeline to optimized analytics output.</p>
      </div>
    ),
  },
]

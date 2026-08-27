import {
  Activity,
  AlertTriangle,
  BarChart3,
  Cloud,
  Database,
  FileJson,
  Film,
  Layers,
  Server,
  ShoppingBag,
  Thermometer,
  WifiOff,
} from 'lucide-react'

const iconProps = { size: 22, strokeWidth: 1.75, 'aria-hidden': true }

export function BigDataPipeline() {
  const sources = ['Social', 'Sensors', 'Transactions', 'Video', 'Web', 'IoT']

  return (
    <div className="viz-pipeline" aria-label="Big Data value pipeline">
      <div className="viz-sources">
        {sources.map((source) => (
          <span key={source} className="viz-chip">{source}</span>
        ))}
      </div>
      <div className="viz-flow-line" aria-hidden="true" />
      <div className="viz-stage">
        <strong>BIG DATA</strong>
        <span>Volume · Velocity · Variety</span>
      </div>
      <div className="viz-flow-line" aria-hidden="true" />
      <div className="viz-stage soft">
        <strong>Analytics</strong>
        <span>Models & discovery</span>
      </div>
      <div className="viz-flow-line" aria-hidden="true" />
      <div className="viz-stage accent">
        <strong>Insights</strong>
        <span>Decisions at scale</span>
      </div>
    </div>
  )
}

export function FourVsWheel() {
  const vs = [
    { key: 'volume', label: 'VOLUME', meaning: 'How much data?', eg: 'Millions of transactions', pos: 'tl' },
    { key: 'velocity', label: 'VELOCITY', meaning: 'How fast?', eg: 'Continuous sensor streams', pos: 'tr' },
    { key: 'variety', label: 'VARIETY', meaning: 'How diverse?', eg: 'Text, video, JSON, logs', pos: 'bl' },
    { key: 'veracity', label: 'VERACITY', meaning: 'How trustworthy?', eg: 'Noise, gaps, uncertainty', pos: 'br' },
  ]

  return (
    <div className="fourvs" aria-label="Big Data 4Vs">
      <div className="fourvs-core">
        <span className="fourvs-core-label">BIG DATA</span>
        <span className="fourvs-core-sub">4Vs</span>
      </div>
      {vs.map((v) => (
        <div key={v.key} className={`fourvs-card fourvs-${v.pos}`}>
          <strong>{v.label}</strong>
          <span className="fourvs-meaning">{v.meaning}</span>
          <span className="fourvs-eg">{v.eg}</span>
        </div>
      ))}
      <svg className="fourvs-lines" viewBox="0 0 400 300" aria-hidden="true">
        <line x1="200" y1="150" x2="100" y2="70" stroke="rgba(37,99,235,0.35)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="200" y1="150" x2="300" y2="70" stroke="rgba(37,99,235,0.35)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="200" y1="150" x2="100" y2="230" stroke="rgba(37,99,235,0.35)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="200" y1="150" x2="300" y2="230" stroke="rgba(37,99,235,0.35)" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function DataClassDiagram() {
  const items = [
    {
      title: 'Structured',
      def: 'Fixed schema, rows & columns',
      eg: 'Student marks table',
      icon: <Database {...iconProps} />,
    },
    {
      title: 'Semi-Structured',
      def: 'Tags/keys, flexible shape',
      eg: 'JSON · XML documents',
      icon: <FileJson {...iconProps} />,
    },
    {
      title: 'Multi-Structured',
      def: 'Mixed formats together',
      eg: 'Sensors + social posts',
      icon: <Layers {...iconProps} />,
    },
    {
      title: 'Unstructured',
      def: 'No ready table schema',
      eg: 'Video · images · email',
      icon: <Film {...iconProps} />,
    },
  ]

  return (
    <div className="data-types" aria-label="Data classification">
      {items.map((item) => (
        <div key={item.title} className="data-type-col">
          <div className="data-type-icon">{item.icon}</div>
          <h3>{item.title}</h3>
          <p className="data-type-def">{item.def}</p>
          <p className="data-type-eg">{item.eg}</p>
        </div>
      ))}
    </div>
  )
}

export function ScaleHeroCompare() {
  return (
    <div className="scale-hero" aria-label="Scale up versus scale out">
      <div className="scale-hero-pane">
        <h3>Scale Up</h3>
        <div className="scale-up-viz">
          <div className="server-tower t1"><Server size={28} strokeWidth={1.6} /><span>8 GB</span></div>
          <div className="scale-arrow-h" aria-hidden="true">→</div>
          <div className="server-tower t2"><Server size={34} strokeWidth={1.6} /><span>16 GB</span></div>
          <div className="scale-arrow-h" aria-hidden="true">→</div>
          <div className="server-tower t3"><Server size={42} strokeWidth={1.6} /><span>64 GB</span></div>
        </div>
        <p className="scale-pane-copy">One machine becomes more powerful — more CPU, RAM and disk.</p>
        <div className="scale-badge">= MORE POWER</div>
      </div>
      <div className="scale-hero-pane">
        <h3>Scale Out</h3>
        <div className="scale-out-viz">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="server-node">
              <Server size={26} strokeWidth={1.6} />
              <span>S{n}</span>
            </div>
          ))}
          <svg className="scale-mesh" viewBox="0 0 220 80" aria-hidden="true">
            <path d="M40 20 H180 M40 60 H180 M40 20 V60 M180 20 V60 M40 20 L180 60 M180 20 L40 60" fill="none" stroke="rgba(37,99,235,0.25)" strokeWidth="1.5" />
          </svg>
        </div>
        <p className="scale-pane-copy">Many identical machines share the workload in parallel.</p>
        <div className="scale-badge out">= MORE MACHINES</div>
      </div>
    </div>
  )
}

export function ScaleUpVisual() {
  return (
    <div className="scale-up-solo" aria-label="Vertical scale up">
      <div className="server-tower t1">
        <Server size={40} strokeWidth={1.55} />
        <strong>Small</strong>
        <span>8 GB · 4 CPU</span>
      </div>
      <div className="scale-upgrade">
        <span className="scale-upgrade-arrow" aria-hidden="true">↓</span>
        <span>Upgrade</span>
        <small>+ CPU · + RAM · + Disk</small>
      </div>
      <div className="server-tower t3">
        <Server size={56} strokeWidth={1.55} />
        <strong>Powerful</strong>
        <span>64 GB · 16 CPU</span>
      </div>
      <p className="viz-caption">One machine becomes more powerful</p>
    </div>
  )
}

export function ScaleOutVisual() {
  return (
    <div className="scale-out-solo" aria-label="Horizontal scale out">
      <div className="workload-pill">Large Workload</div>
      <div className="scale-out-split" aria-hidden="true">↓ split across nodes ↓</div>
      <div className="server-row-viz">
        {['S1', 'S2', 'S3', 'S4'].map((s) => (
          <div key={s} className="server-node large">
            <Server size={36} strokeWidth={1.55} />
            <span>{s}</span>
          </div>
        ))}
      </div>
      <p className="viz-caption">Distribute storage and processing across the cluster</p>
    </div>
  )
}

/** Lightweight shared-nothing node diagram for distributed computing */
export function DistributedNodesVisual() {
  return (
    <div className="dist-nodes" aria-label="Shared-nothing distributed nodes">
      {['Node A', 'Node B', 'Node C', 'Node D'].map((n) => (
        <div key={n} className="dist-node">
          <Server size={28} strokeWidth={1.55} />
          <strong>{n}</strong>
          <span>Local CPU · Disk · RAM</span>
        </div>
      ))}
      <p className="viz-caption">Shared-nothing · coordinated over the network</p>
    </div>
  )
}

/** Compact handling techniques flow */
export function HandlingFlowVisual() {
  const steps = ['Distribute', 'Schedule', 'Store flexibly', 'Analyze']
  return (
    <div className="mini-flow" aria-label="Big Data handling flow">
      {steps.map((step, i) => (
        <div key={step} className="mini-flow-step-wrap">
          <div className={`mini-flow-step ${i === 0 || i === steps.length - 1 ? 'accent' : ''}`.trim()}>
            {step}
          </div>
          {i < steps.length - 1 && <div className="mini-flow-arrow" aria-hidden="true">↓</div>}
        </div>
      ))}
    </div>
  )
}

export function ParallelProcessingVisual() {
  return (
    <div className="parallel-viz" aria-label="Parallel processing">
      <div className="parallel-node dataset">LARGE DATASET</div>
      <svg className="parallel-split" viewBox="0 0 560 56" aria-hidden="true">
        <path d="M280 4 L70 52 M280 4 L210 52 M280 4 L350 52 M280 4 L490 52" fill="none" stroke="rgba(37,99,235,0.45)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="parallel-row">
        {['PROCESS', 'PROCESS', 'PROCESS', 'PROCESS'].map((t, i) => (
          <div key={`${t}-${i}`} className="parallel-node task">{t}</div>
        ))}
      </div>
      <svg className="parallel-merge" viewBox="0 0 560 56" aria-hidden="true">
        <path d="M70 4 L280 52 M210 4 L280 52 M350 4 L280 52 M490 4 L280 52" fill="none" stroke="rgba(14,165,164,0.5)" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <div className="parallel-node result">RESULT</div>
    </div>
  )
}

export function ArchitecturePipeline() {
  const stages = [
    { n: '01', title: 'Sources', eg: 'DB · Sensors · Web', shape: 'dots' },
    { n: '02', title: 'Ingestion', eg: 'ETL · Streams · Batch', shape: 'streams' },
    { n: '03', title: 'Storage', eg: 'HDFS · NoSQL · Cloud', shape: 'blocks' },
    { n: '04', title: 'Processing', eg: 'Spark · MapReduce', shape: 'nodes' },
    { n: '05', title: 'Consumption', eg: 'BI · ML · Dashboards', shape: 'charts' },
  ]

  return (
    <div className="arch-pipeline" aria-label="Five layer Big Data architecture">
      <svg className="arch-flow-line" viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true">
        <path d="M20 12 H980" stroke="rgba(37,99,235,0.35)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6" />
        <circle cx="20" cy="12" r="4" fill="#2563eb" />
        <circle cx="980" cy="12" r="4" fill="#0ea5a4" />
      </svg>
      <div className="arch-stages">
        {stages.map((s, i) => (
          <div key={s.n} className="arch-stage">
            <div className={`arch-glyph arch-${s.shape}`} aria-hidden="true" />
            <span className="arch-num">{s.n}</span>
            <strong>{s.title}</strong>
            <span className="arch-eg">{s.eg}</span>
            {i < stages.length - 1 && <span className="arch-arrow" aria-hidden="true">→</span>}
          </div>
        ))}
      </div>
    </div>
  )
}

export function ArchitectureLayers() {
  return <ArchitecturePipeline />
}

export function PreprocessFlow() {
  const steps = [
    { label: 'Raw', desc: 'As collected' },
    { label: 'Clean', desc: 'Fix / remove' },
    { label: 'Validate', desc: 'Check correctness' },
    { label: 'Transform', desc: 'Convert formats' },
    { label: 'Reduce', desc: 'Keep signal' },
    { label: 'Wrangle', desc: 'Shape for analysis' },
    { label: 'Ready', desc: 'Analytics-ready' },
  ]

  return (
    <div className="preprocess-path" aria-label="Data preprocessing workflow">
      {steps.map((step, i) => (
        <div key={step.label} className="pp-node-wrap">
          <div className={`pp-node ${i === 0 || i === steps.length - 1 ? 'accent' : ''}`.trim()}>
            <span className="pp-label">{step.label}</span>
          </div>
          <span className="pp-desc">{step.desc}</span>
          {i < steps.length - 1 && <div className="pp-connector" aria-hidden="true" />}
        </div>
      ))}
    </div>
  )
}

export function QualityDataset() {
  const raw = [
    { id: '01', name: 'Asha', score: '82', flag: null },
    { id: '02', name: 'Ravi', score: 'NULL', flag: 'missing' },
    { id: '03', name: 'Priya', score: '77', flag: null },
    { id: '04', name: 'Arun', score: '890', flag: 'outlier' },
    { id: '01', name: 'Asha', score: '82', flag: 'duplicate' },
  ]
  const clean = [
    { id: '01', name: 'Asha', score: '82' },
    { id: '02', name: 'Ravi', score: '75' },
    { id: '03', name: 'Priya', score: '77' },
    { id: '04', name: 'Arun', score: '89' },
  ]

  return (
    <div className="quality-dataset" aria-label="Data quality before and after cleaning">
      <div className="qd-panel raw">
        <div className="qd-head">
          <AlertTriangle size={18} strokeWidth={1.75} />
          <strong>RAW STUDENT DATA</strong>
        </div>
        <div className="qd-table">
          {raw.map((row, i) => (
            <div key={`${row.id}-${i}`} className={`qd-row ${row.flag || ''}`.trim()}>
              <span className="qd-id">{row.id}</span>
              <span className="qd-name">{row.name}</span>
              <span className="qd-score">{row.score}</span>
              {row.flag && <span className={`qd-flag ${row.flag}`}>{row.flag}</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="qd-transform" aria-hidden="true">
        <div className="qd-arrow">→</div>
        <span>Cleaning</span>
      </div>
      <div className="qd-panel clean">
        <div className="qd-head">
          <Database size={18} strokeWidth={1.75} />
          <strong>CLEAN DATA</strong>
        </div>
        <div className="qd-table">
          {clean.map((row) => (
            <div key={row.id} className="qd-row ok">
              <span className="qd-id">{row.id}</span>
              <span className="qd-name">{row.name}</span>
              <span className="qd-score">{row.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function QualityPipeline() {
  return <QualityDataset />
}

export function CapTriangle() {
  return (
    <div className="cap-centered" aria-label="CAP theorem">
      <svg viewBox="0 0 420 340" width="100%" height="100%" role="img">
        <polygon points="210,48 380,300 40,300" fill="rgba(37,99,235,0.06)" stroke="#2563eb" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="210" cy="48" r="10" fill="#2563eb" />
        <circle cx="380" cy="300" r="10" fill="#0ea5a4" />
        <circle cx="40" cy="300" r="10" fill="#d97706" />
        <text x="210" y="28" textAnchor="middle" fontSize="16" fontWeight="700" fill="#172033" fontFamily="Plus Jakarta Sans, sans-serif">
          Consistency
        </text>
        <text x="210" y="170" textAnchor="middle" fontSize="22" fontWeight="700" fill="#2563eb" fontFamily="Plus Jakarta Sans, sans-serif">
          CAP
        </text>
        <text x="210" y="194" textAnchor="middle" fontSize="13" fill="#7a8495" fontFamily="Source Sans 3, sans-serif">
          choose any 2
        </text>
        <text x="40" y="328" textAnchor="middle" fontSize="15" fontWeight="700" fill="#172033" fontFamily="Plus Jakarta Sans, sans-serif">
          Partition Tolerance
        </text>
        <text x="380" y="328" textAnchor="middle" fontSize="15" fontWeight="700" fill="#172033" fontFamily="Plus Jakarta Sans, sans-serif">
          Availability
        </text>
      </svg>
      <div className="cap-legend">
        <p><strong>C</strong> Same data everywhere at the same time</p>
        <p><strong>A</strong> Every request gets a response</p>
        <p><strong>P</strong> Works despite network splits</p>
      </div>
    </div>
  )
}

export function OltpOlap() {
  return (
    <div className="oltp-olap" aria-label="OLTP versus OLAP">
      <div className="oo-pane">
        <h3>OLTP</h3>
        <p className="oo-tagline">Running the business</p>
        <div className="oo-story">
          <div className="oo-step">Customer places order</div>
          <div className="oo-flow" aria-hidden="true">↓</div>
          <div className="oo-chips">
            <span>Payment</span>
            <span>Inventory</span>
            <span>Order update</span>
          </div>
        </div>
        <p className="oo-summary">Frequent, simple transactions on current operational data.</p>
      </div>
      <div className="oo-pane">
        <h3>OLAP</h3>
        <p className="oo-tagline">Understanding the business</p>
        <div className="oo-story">
          <div className="oo-step">Thousands of orders</div>
          <div className="oo-flow" aria-hidden="true">↓</div>
          <div className="oo-step soft">Analysis</div>
          <div className="oo-flow" aria-hidden="true">↓</div>
          <div className="oo-step accent">Sales insight</div>
        </div>
        <p className="oo-summary">Complex queries over historical and aggregated data.</p>
      </div>
      <div className="oo-strip">
        <span><strong>OLTP</strong> Runs operations</span>
        <span><strong>OLAP</strong> Supports decisions</span>
        <span>ATM withdrawal vs monthly sales dashboard</span>
      </div>
    </div>
  )
}

export function NoSqlPath() {
  return (
    <div className="nosql-viz" aria-label="Why NoSQL">
      <div className="nosql-hub">Big Data</div>
      <div className="nosql-drivers">
        {['Large Volume', 'Different Formats', 'Distributed Systems', 'Rapid Growth'].map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>
      <div className="nosql-need">needs flexible stores →</div>
      <div className="nosql-hub end">NoSQL</div>
      <div className="nosql-types">
        {[
          ['Key-Value', 'Riak, Redis-style'],
          ['Document', 'MongoDB, CouchDB'],
          ['Column', 'HBase, Cassandra'],
          ['Graph', 'Neo4j'],
        ].map(([t, e]) => (
          <div key={t}>
            <strong>{t}</strong>
            <span>{e}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function HadoopStack() {
  const rows = [
    { title: 'Apps & Analytics', items: 'BI · ML · Visualization' },
    { title: 'Processing', items: 'MapReduce · Spark · Hive · Pig' },
    { title: 'Resource Layer', items: 'YARN · Mesos' },
    { title: 'Storage', items: 'HDFS · HBase · MongoDB · Cassandra' },
    { title: 'Infrastructure', items: 'Clusters · Cloud (EC2 / Azure)' },
  ]

  return (
    <div className="stack-layers" aria-label="Hadoop and platform stack">
      {rows.map((row, i) => (
        <div key={row.title} className="stack-layer" style={{ '--i': i }}>
          <strong>{row.title}</strong>
          <span>{row.items}</span>
        </div>
      ))}
    </div>
  )
}

export function AnalyticsLadder() {
  const steps = [
    { name: 'DESCRIPTIVE', q: 'What happened?', eg: 'Sales fell 10%.', tone: 'd1' },
    { name: 'PREDICTIVE', q: 'What could happen?', eg: 'Sales may fall next month.', tone: 'd2' },
    { name: 'PRESCRIPTIVE', q: 'What should we do?', eg: 'Increase promotion.', tone: 'd3' },
    { name: 'COGNITIVE', q: 'What can the system understand?', eg: 'Customer sentiment.', tone: 'd4' },
  ]

  return (
    <div className="analytics-stairs" aria-label="Analytics types — retail sales">
      <div className="stairs-context">
        <ShoppingBag size={18} strokeWidth={1.75} />
        <span>Example throughout: Retail Sales</span>
      </div>
      <div className="stairs">
        {steps.map((step, i) => (
          <div key={step.name} className={`stair stair-${step.tone}`} style={{ '--step': i }}>
            <strong>{step.name}</strong>
            <span className="stair-eg">{step.eg}</span>
            <span className="stair-q">{step.q}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CloudStackViz() {
  const layers = [
    { name: 'SaaS', role: 'Applications', eg: 'GoogleSQL · IBM BigSQL · Vertica' },
    { name: 'PaaS', role: 'Development Platform', eg: 'Azure HDInsight · IBM BigInsights' },
    { name: 'IaaS', role: 'Servers / Storage / Networking', eg: 'AWS EC2 · virtual data centers' },
  ]

  return (
    <div className="cloud-stack" aria-label="Cloud computing layers">
      {layers.map((layer, i) => (
        <div key={layer.name} className={`cloud-layer l${i + 1}`}>
          <div className="cloud-layer-badge">{layer.name}</div>
          <div className="cloud-layer-copy">
            <strong>{layer.role}</strong>
            <span>{layer.eg}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ComputeCompare() {
  const cols = [
    { title: 'Distributed', points: ['Loosely coupled', 'Networked nodes', 'Shared-nothing friendly'] },
    { title: 'Cluster', points: ['Tightly coupled', 'Often homogeneous', 'Load balancing focus'] },
    { title: 'Grid', points: ['Cross-organization', 'Geographically spread', 'Heterogeneous resources'] },
  ]

  return (
    <div className="topology-compare" aria-label="Compute topology comparison">
      {cols.map((col) => (
        <div key={col.title} className="topology-pane">
          <h3>{col.title}</h3>
          <div className="topology-dots" aria-hidden="true" />
          <ul>
            {col.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export function SizeAnalogy() {
  const sizes = [
    { unit: 'B', label: 'character' },
    { unit: 'KB', label: 'note' },
    { unit: 'MB', label: 'image' },
    { unit: 'GB', label: 'movie' },
    { unit: 'TB', label: 'campus' },
    { unit: 'PB', label: 'web-scale' },
    { unit: 'EB', label: 'global DC' },
    { unit: 'ZB', label: 'world/year' },
    { unit: 'YB', label: 'planetary' },
  ]

  return (
    <div className="size-scale" aria-label="Data size analogy">
      {sizes.map((s, i) => (
        <div key={s.unit} className="size-step">
          <div className="size-dot" style={{ '--s': i }} />
          <strong>{s.unit}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  )
}

export function CaseFlow({ title, sources, insights, outcomeLabel = 'OUTCOME' }) {
  return (
    <div className="case-story" aria-label={`${title} case study`}>
      <div className="case-stage input">
        <span className="case-label">INPUT</span>
        <ul>
          {sources.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <div className="case-engine-wrap">
        <div className="case-engine">
          <Activity size={20} strokeWidth={1.75} />
          <span>BIG DATA ANALYTICS</span>
        </div>
      </div>
      <div className="case-stage outcome">
        <span className="case-label">{outcomeLabel}</span>
        <ul>
          {insights.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function WeatherVisual() {
  return (
    <div className="scene-weather" aria-label="Weather 4Vs scene">
      <div className="wx-sat">
        <Cloud size={36} strokeWidth={1.5} />
        <span>Satellites</span>
      </div>
      <div className="wx-streams">
        <span>Visible</span>
        <span>IR</span>
        <span>SWIR</span>
        <span>MIR</span>
      </div>
      <div className="wx-panel">
        <Thermometer size={22} strokeWidth={1.6} />
        <strong>Forecast</strong>
        <span>Rain · Storm · Alerts</span>
      </div>
    </div>
  )
}

export function DefectCards() {
  const items = [
    { title: 'Noise', eg: 'Wind turbulence distorting WRMP readings', icon: <Activity {...iconProps} /> },
    { title: 'Outliers', eg: 'CGPA entered as 9.0 instead of 3.0', icon: <AlertTriangle {...iconProps} /> },
    { title: 'Missing', eg: 'Power failure gaps at a vending machine', icon: <WifiOff {...iconProps} /> },
    { title: 'Duplicates', eg: 'Repeated sales triggering false refill alarms', icon: <BarChart3 {...iconProps} /> },
  ]

  return (
    <div className="defect-grid">
      {items.map((item) => (
        <div key={item.title} className="defect-card">
          <div className="defect-icon">{item.icon}</div>
          <strong>{item.title}</strong>
          <p>{item.eg}</p>
        </div>
      ))}
    </div>
  )
}

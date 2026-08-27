import {
  AnsCards,
  AnsFlow,
  AnsLead,
  AnsPoints,
  AnsSection,
  AnsSummary,
  AnsTable,
  AnsVsGrid,
  Keyword,
} from '../components/study/AnswerContent'

/**
 * Module 1 PYQ bank.
 * years / marks are set only when verified from VTU sources.
 * Otherwise years stays empty and UI shows "Previous VTU Question".
 */
export const module1Questions = [
  {
    id: 'm1-q1',
    number: 1,
    question: 'Explain the classification of digital data with suitable examples.',
    years: [],
    marks: null,
    marksBand: null,
    priority: 'very-high',
    repeated: true,
    topics: ['Digital Data', 'Classification'],
    shortTitle: 'Classification of Digital Data',
    answer: (
      <>
        <AnsSection title="Definition">
          <AnsLead>
            Digital data can be classified by how strongly it follows a <Keyword>schema</Keyword> or{' '}
            <Keyword>data model</Keyword>. Module 1 groups data as <Keyword>structured</Keyword>,{' '}
            <Keyword>semi-structured</Keyword>, <Keyword>multi-structured</Keyword> and{' '}
            <Keyword>unstructured</Keyword>.
          </AnsLead>
        </AnsSection>

        <AnsSection title="1. Structured Data">
          <AnsPoints
            items={[
              <>
                Conforms to a fixed <Keyword>schema</Keyword> and is stored as rows and columns (tables).
              </>,
              <>
                Supports insert, delete, update, indexing, scaling of capacity, and security operations such as
                encryption.
              </>,
              <>
                About <Keyword>15–20%</Keyword> of enterprise data is structured or semi-structured.
              </>,
              <>
                <Keyword>Example:</Keyword> Student ID, Name, Department, Marks in a MySQL / RDBMS table.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSection title="2. Semi-structured Data">
          <AnsPoints
            items={[
              <>
                Contains <Keyword>tags / markers / keys</Keyword> that separate semantic elements and create
                hierarchies, but does not follow a strict relational table model.
              </>,
              <>
                <Keyword>Examples:</Keyword> XML documents, JSON documents, self-describing web/API records.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSection title="3. Multi-structured Data">
          <AnsPoints
            items={[
              <>
                A mixture of structured, semi-structured and/or unstructured formats in one dataset or stream.
              </>,
              <>
                Common in non-transactional systems: customer interaction streams, sensor feeds, web/enterprise
                server logs, and warehouse data kept in multiple formats.
              </>,
              <>
                <Keyword>Example:</Keyword> Chess move tables + social posts; sensor readings + web logs.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSection title="4. Unstructured Data">
          <AnsPoints
            items={[
              <>Does not associate with a ready-made table or database schema.</>,
              <>
                May have some internal structure (for example, email headers), but relationships must be derived
                separately.
              </>,
              <>
                <Keyword>Examples:</Keyword> TXT/CSV free text, emails, videos, images, chats — most of today’s
                data growth.
              </>,
            ]}
          />
        </AnsSection>

        <AnsTable
          caption="Quick comparison"
          headers={['Type', 'Schema', 'Example']}
          rows={[
            ['Structured', 'Fixed relational model', 'Marks table in RDBMS'],
            ['Semi-structured', 'Tags/keys, flexible hierarchy', 'JSON / XML'],
            ['Multi-structured', 'Mixed formats together', 'Sensors + warehouse + logs'],
            ['Unstructured', 'No ready schema', 'Video, email, image'],
          ]}
        />

        <AnsSummary>
          Write all four classes, one clear difference each, and one example each. Mention that most growth is in
          unstructured / multi-structured data.
        </AnsSummary>
      </>
    ),
  },
  {
    id: 'm1-q2',
    number: 2,
    question: 'Define Big Data. Explain the evolution of Big Data and its characteristics.',
    years: ['VTU Model QP'],
    marks: 10,
    marksBand: '8-10',
    priority: 'very-high',
    repeated: true,
    topics: ['Big Data', 'Evolution', 'Characteristics'],
    shortTitle: 'Big Data — Evolution and Characteristics',
    answer: (
      <>
        <AnsSection title="Definition of Big Data">
          <AnsLead>
            <Keyword>Big Data</Keyword> is a high-<Keyword>volume</Keyword>, high-<Keyword>velocity</Keyword>{' '}
            and/or high-<Keyword>variety</Keyword> information asset that needs new forms of processing for better
            decision making, insight discovery and process optimization (Gartner).
          </AnsLead>
          <AnsPoints
            items={[
              <>Datasets so large or complex that traditional applications are inadequate.</>,
              <>
                Size beyond the ability of typical database tools to capture, store, manage and analyse
                (McKinsey view).
              </>,
            ]}
          />
        </AnsSection>

        <AnsSection title="Evolution of Big Data">
          <AnsFlow
            steps={[
              'Conventional DB / BI',
              'Web & Internet scale',
              'Social media streams',
              'IoT / machine data',
              'Cloud + distributed systems',
              'Big Data platforms',
            ]}
          />
          <AnsPoints
            items={[
              <>
                Earlier systems handled megabytes to gigabytes of mostly structured records using RDBMS and
                warehouses.
              </>,
              <>
                Growth of <Keyword>web data</Keyword> (sites, portals, emails, chats) increased volume and variety.
              </>,
              <>
                <Keyword>Social media</Keyword> added continuous user-generated text, images and video.
              </>,
              <>
                <Keyword>IoT / machine-generated data</Keyword> (sensors, logs, trackers) raised velocity and
                veracity challenges.
              </>,
              <>
                <Keyword>Cloud and distributed computing</Keyword> made scale-out storage and parallel processing
                practical, creating the need for Hadoop, NoSQL and related technologies.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSection title="Characteristics (Vs)">
          <AnsPoints
            items={[
              <>
                <Keyword>Volume</Keyword> — sheer quantity of data generated by applications.
              </>,
              <>
                <Keyword>Velocity</Keyword> — speed of data generation and the need to process it quickly.
              </>,
              <>
                <Keyword>Variety</Keyword> — many forms/formats from heterogeneous sources.
              </>,
              <>
                <Keyword>Veracity</Keyword> — quality/trustworthiness of captured data can vary greatly.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSummary>
          Start with a standard definition, narrate evolution from conventional → web/social/IoT/cloud, then list
          Volume, Velocity, Variety and Veracity with one line each.
        </AnsSummary>
      </>
    ),
  },
  {
    id: 'm1-q3',
    number: 3,
    question: 'Explain the characteristics / V’s of Big Data with suitable examples.',
    years: [],
    marks: null,
    marksBand: null,
    priority: 'very-high',
    repeated: true,
    topics: ['4Vs', 'Characteristics'],
    shortTitle: 'Characteristics / V’s of Big Data',
    answer: (
      <>
        <AnsLead>
          The key Big Data characteristics are commonly explained as the <Keyword>4Vs</Keyword>: Volume, Velocity,
          Variety and Veracity. <Keyword>Value</Keyword> is often added as the purpose of analytics.
        </AnsLead>

        <div className="ans-vs-wheel" aria-label="4Vs of Big Data">
          {['Volume', 'Velocity', 'Variety', 'Veracity'].map((v) => (
            <div key={v} className="ans-vs-chip">
              {v}
            </div>
          ))}
        </div>

        <AnsSection title="Volume">
          <AnsPoints
            items={[
              <>Refers to the size/quantity of data generated by one or more applications.</>,
              <>
                <Keyword>Example:</Keyword> Petabytes of satellite weather imagery or years of retail transactions.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSection title="Velocity">
          <AnsPoints
            items={[
              <>Speed at which data is generated and must be processed.</>,
              <>
                <Keyword>Example:</Keyword> Live sensor feeds, clickstreams, continuous weather readings.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSection title="Variety">
          <AnsPoints
            items={[
              <>Multiple forms and formats from heterogeneous platforms.</>,
              <>
                <Keyword>Example:</Keyword> Tables + JSON logs + images + social posts in one analytics pipeline.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSection title="Veracity">
          <AnsPoints
            items={[
              <>Quality, accuracy and trustworthiness of data; noise and uncertainty affect analysis.</>,
              <>
                <Keyword>Example:</Keyword> Turbulence-affected wind readings or incomplete sales logs.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSection title="Value (related)">
          <AnsPoints
            items={[
              <>
                The useful insight obtained after processing — “value of Big Data is what you do with it, not only
                size.”
              </>,
              <>
                <Keyword>Example:</Keyword> Predicting demand, detecting fraud, or recommending products.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSummary>
          Define each V in one sentence + one example. Mention Value as the business outcome of analytics.
        </AnsSummary>
      </>
    ),
  },
  {
    id: 'm1-q4',
    number: 4,
    question: 'Why is Big Data required? Explain the importance of Big Data.',
    years: [],
    marks: null,
    marksBand: null,
    priority: 'high',
    repeated: true,
    topics: ['Need for Big Data', 'Importance'],
    shortTitle: 'Need and Importance of Big Data',
    answer: (
      <>
        <AnsSection title="Why Big Data is required">
          <AnsPoints
            items={[
              <>
                Technology growth moved storage/processing needs from megabytes to <Keyword>petabytes</Keyword>.
              </>,
              <>
                Conventional systems struggle with huge <Keyword>volume</Keyword>, mixed{' '}
                <Keyword>variety</Keyword>, faster generation (<Keyword>velocity</Keyword>) and uncertain quality (
                <Keyword>veracity</Keyword>).
              </>,
              <>Organizations need quicker processing, analysis and usage of data for knowledge discovery.</>,
              <>Traditional RDBMS-centric approaches cannot scale cost-effectively for these workloads alone.</>,
            ]}
          />
        </AnsSection>

        <AnsSection title="Importance of Big Data">
          <AnsPoints
            items={[
              <>
                <Keyword>Real-time / near-real-time processing</Keyword> of streams and large batches.
              </>,
              <>
                <Keyword>Better decision-making</Keyword> through evidence from large historical and live datasets.
              </>,
              <>
                <Keyword>Pattern discovery</Keyword> that humans cannot spot manually (fraud, demand, risk).
              </>,
              <>
                <Keyword>Scalability</Keyword> via scale-out clusters, cloud and parallel platforms.
              </>,
              <>
                Enables applications in marketing, healthcare, advertising, predictive maintenance and governance.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSummary>
          Contrast limitations of conventional systems with benefits: scale, speed, insight and better decisions.
        </AnsSummary>
      </>
    ),
  },
  {
    id: 'm1-q5',
    number: 5,
    question: 'Compare Traditional Business Intelligence with Big Data.',
    years: [],
    marks: null,
    marksBand: null,
    priority: 'very-high',
    repeated: true,
    topics: ['Traditional BI', 'Big Data'],
    shortTitle: 'Traditional BI vs Big Data',
    answer: (
      <>
        <AnsLead>
          <Keyword>Traditional BI</Keyword> focuses on structured enterprise data and scheduled reporting.{' '}
          <Keyword>Big Data</Keyword> systems handle larger scale, mixed formats and parallel/distributed
          processing.
        </AnsLead>

        <AnsTable
          caption="Traditional BI vs Big Data"
          headers={['Aspect', 'Traditional BI', 'Big Data']}
          rows={[
            ['Data size', 'GB to low TB typical', 'TB to PB and beyond'],
            ['Data type', 'Mostly structured', 'Structured + semi + unstructured'],
            ['Storage', 'RDBMS / data warehouse', 'HDFS, NoSQL, distributed stores'],
            ['Schema', 'Schema-on-write, rigid', 'Often flexible / schema-on-read'],
            ['Processing', 'SQL, ETL, OLAP cubes', 'Batch, streaming, MPP, MapReduce/Spark'],
            ['Scalability', 'Mostly scale-up', 'Scale-out across commodity nodes'],
            ['Architecture', 'Central warehouse-centric', 'Layered ingestion → store → process → consume'],
            ['Analysis', 'Reports, dashboards, KPIs', 'Discovery, ML, real-time insights'],
            ['Data sources', 'Enterprise apps, ERP, CRM', 'Web, social, IoT, logs, warehouse + external'],
            ['Speed', 'Batch / scheduled', 'Batch + near-real-time + streaming'],
          ]}
        />

        <AnsSummary>
          Use a comparison table in the answer booklet. Emphasize data type, scale-out, and flexible schemas.
        </AnsSummary>
      </>
    ),
  },
  {
    id: 'm1-q6',
    number: 6,
    question: 'Explain a typical Data Warehouse environment and Hadoop environment.',
    years: [],
    marks: null,
    marksBand: null,
    priority: 'high',
    repeated: false,
    topics: ['Data Warehouse', 'Hadoop'],
    shortTitle: 'Data Warehouse vs Hadoop Environment',
    answer: (
      <>
        <AnsSection title="Typical Data Warehouse environment">
          <AnsFlow steps={['Sources (OLTP)', 'ETL', 'Staging', 'Warehouse / Marts', 'OLAP & Reports']} />
          <AnsPoints
            items={[
              <>Integrates cleaned structured data from operational systems.</>,
              <>
                Uses <Keyword>ETL</Keyword> (Extract–Transform–Load) into a central warehouse or data marts.
              </>,
              <>
                Supports <Keyword>OLAP</Keyword>, BI reports and historical analysis with a defined schema.
              </>,
              <>Strong for consistent enterprise metrics; weaker for raw multi-format streams at extreme scale.</>,
            ]}
          />
        </AnsSection>

        <AnsSection title="Hadoop / Big Data environment">
          <AnsFlow steps={['Diverse sources', 'Ingestion', 'HDFS / NoSQL', 'MapReduce / Spark', 'Analytics']} />
          <AnsPoints
            items={[
              <>
                Stores large distributed datasets on <Keyword>HDFS</Keyword> (self-managing, self-healing).
              </>,
              <>
                Processing frameworks (for example MapReduce / Spark) run in parallel on commodity clusters.
              </>,
              <>Works with NoSQL stores such as HBase, MongoDB and Cassandra.</>,
              <>Handles unstructured and multi-structured data without forcing early rigid schemas.</>,
            ]}
          />
        </AnsSection>

        <AnsVsGrid
          left={{
            title: 'Warehouse flow',
            items: ['Schema first', 'Clean then store', 'SQL/OLAP heavy', 'Central curated store'],
          }}
          right={{
            title: 'Hadoop flow',
            items: ['Store wide variety first', 'Process in parallel', 'Scale-out cluster', 'Flexible analytics'],
          }}
        />

        <AnsSummary>
          Draw both flows. Warehouse = curated structured BI; Hadoop = distributed storage + parallel processing for
          Big Data variety/scale.
        </AnsSummary>
      </>
    ),
  },
  {
    id: 'm1-q7',
    number: 7,
    question: 'Define Big Data Analytics. Explain the classification of analytics with suitable examples.',
    years: ['VTU Model QP'],
    marks: 10,
    marksBand: '8-10',
    priority: 'very-high',
    repeated: true,
    topics: ['Big Data Analytics', 'Analytics types'],
    shortTitle: 'Classification of Big Data Analytics',
    answer: (
      <>
        <AnsSection title="Definition">
          <AnsLead>
            <Keyword>Big Data Analytics</Keyword> is the process of inspecting, cleaning, transforming and modelling
            large and complex datasets to discover useful information and support decisions.
          </AnsLead>
        </AnsSection>

        <AnsCards
          items={[
            {
              title: '1. Descriptive Analytics',
              question: 'What happened?',
              body: 'Summarises historical data into reports, KPIs and dashboards.',
              example: 'Sales fell 10% last quarter.',
            },
            {
              title: '2. Diagnostic Analytics',
              question: 'Why did it happen?',
              body: 'Explains causes by drilling into patterns, correlations and anomalies.',
              example: 'Sales fell because a region had stock-outs during a festival.',
            },
            {
              title: '3. Predictive Analytics',
              question: 'What could happen?',
              body: 'Uses models on historical/current data to forecast likely outcomes.',
              example: 'Sales may fall further next month without promotion.',
            },
            {
              title: '4. Prescriptive Analytics',
              question: 'What should we do?',
              body: 'Recommends actions or optimised decisions based on predictions.',
              example: 'Increase local promotion and restock high-demand SKUs.',
            },
          ]}
        />

        <AnsSummary>
          Define analytics once, then present all four types with the guiding question + one example each. (Notes may
          also mention cognitive analytics.)
        </AnsSummary>
      </>
    ),
  },
  {
    id: 'm1-q8',
    number: 8,
    question: 'Explain the importance of Big Data Analytics.',
    years: [],
    marks: null,
    marksBand: null,
    priority: 'high',
    repeated: false,
    topics: ['Importance', 'Applications'],
    shortTitle: 'Importance of Big Data Analytics',
    answer: (
      <>
        <AnsPoints
          items={[
            <>
              <Keyword>Data-driven decisions</Keyword> replace guesswork with evidence from large datasets.
            </>,
            <>
              Improves <Keyword>customer understanding</Keyword> (needs, CLTV, personalization).
            </>,
            <>
              Raises <Keyword>operational efficiency</Keyword> through demand sensing and process optimization.
            </>,
            <>
              Supports <Keyword>risk management</Keyword> and credit-risk insights in finance.
            </>,
            <>
              Enables <Keyword>forecasting</Keyword> of demand, churn and capacity needs.
            </>,
            <>
              Strengthens <Keyword>fraud detection</Keyword> by fusing warehouse data with web/social signals.
            </>,
            <>
              In <Keyword>healthcare</Keyword>: real-time monitoring, risk profiling and evidence-based care.
            </>,
            <>
              In <Keyword>education / research</Keyword> and business: pattern discovery for strategy and service
              innovation.
            </>,
            <>
              Powers digital <Keyword>advertising</Keyword> with targeting, bid optimization and ROI tracking.
            </>,
          ]}
        />
        <AnsSummary>
          List importance areas with one concrete domain example (business, healthcare, fraud, ads).
        </AnsSummary>
      </>
    ),
  },
  {
    id: 'm1-q9',
    number: 9,
    question: 'Explain the major technologies used in a Big Data environment.',
    years: [],
    marks: null,
    marksBand: null,
    priority: 'important',
    repeated: false,
    topics: ['Technologies', 'Platform'],
    shortTitle: 'Major Big Data Technologies',
    answer: (
      <>
        <AnsLead>
          A Big Data environment combines distributed storage, parallel processing, flexible data stores and cloud
          infrastructure. Keep Module 1 depth — introduce tools, do not expand into full Module 2 internals.
        </AnsLead>
        <AnsTable
          headers={['Technology', 'Role in Module 1']}
          rows={[
            ['Hadoop', 'Scalable, reliable parallel computing platform for Big Data'],
            ['HDFS', 'Distributed, self-healing file system for large datasets'],
            ['MapReduce', 'Batch parallel processing model over distributed data'],
            ['NoSQL', 'Flexible stores for semi/unstructured and rapidly growing data'],
            ['Distributed computing', 'Cloud / grid / clusters process data across nodes'],
            ['Cloud computing', 'Elastic IaaS/PaaS/SaaS resources for storage and analytics'],
            ['Data integration', 'Ingestion, ETL/ELT and multi-source fusion into platforms'],
            ['Analytics tools', 'Statistical, predictive, ML and visualization workflows'],
          ]}
        />
        <AnsSummary>
          Name the stack pieces and one sentence purpose each: Hadoop/HDFS, MapReduce, NoSQL, cloud/distributed,
          integration and analytics tools.
        </AnsSummary>
      </>
    ),
  },
  {
    id: 'm1-q10',
    number: 10,
    question: 'Explain analytical tools used for Big Data Analytics.',
    years: [],
    marks: null,
    marksBand: null,
    priority: 'important',
    repeated: false,
    topics: ['Analytical tools'],
    shortTitle: 'Analytical Tools for Big Data',
    answer: (
      <>
        <AnsLead>
          Module 1 notes describe analysis methods and platform tools used after data is stored and prepared.
        </AnsLead>
        <AnsTable
          headers={['Tool / Method', 'Purpose', 'Key capability', 'Typical use']}
          rows={[
            ['Statistical analysis', 'Summarise and test relationships', 'Descriptive metrics', 'KPI reporting'],
            ['Predictive / regression', 'Forecast outcomes', 'Model future values', 'Demand / risk prediction'],
            ['Machine learning (e.g. Mahout-style)', 'Learn patterns from data', 'Clustering / classification', 'Segmentation, scoring'],
            ['Text / social analysis', 'Mine unstructured text', 'Topics, sentiment, networks', 'Feedback & brand monitoring'],
            ['Location-based analysis', 'Analyse geo-tagged events', 'Spatial patterns', 'Hotspots, routing'],
            ['Hive / Pig (platform tools)', 'Query / transform HDFS data', 'SQL-like / data-flow jobs', 'Batch analytics on Hadoop'],
            ['Spark ecosystem ideas (BDAS)', 'Faster analytical computation', 'In-memory processing', 'Iterative / near-real-time analytics'],
            ['Visualization & reporting', 'Communicate insights', 'Dashboards / charts', 'Decision support'],
          ]}
        />
        <AnsSummary>
          Group tools as statistical, predictive/ML, text/social, platform query tools and visualization — with one use
          case each.
        </AnsSummary>
      </>
    ),
  },
  {
    id: 'm1-q11',
    number: 11,
    question: 'What is NoSQL? Explain the different types of NoSQL databases with examples.',
    years: [],
    marks: null,
    marksBand: null,
    priority: 'very-high',
    repeated: true,
    topics: ['NoSQL'],
    shortTitle: 'NoSQL and its Types',
    answer: (
      <>
        <AnsSection title="Definition">
          <AnsLead>
            <Keyword>NoSQL</Keyword> means <Keyword>Not Only SQL</Keyword> — a class of non-relational storage
            systems with flexible data models, useful for Big Data and cloud stores.
          </AnsLead>
        </AnsSection>

        <AnsSection title="Why NoSQL is required">
          <AnsPoints
            items={[
              <>Traditional RDBMS struggle with extreme volume, variety and flexible schemas.</>,
              <>Big Data needs horizontal scale, distributed stores and multiple data patterns.</>,
              <>Applications often need documents, key-value pairs, wide columns or graphs — not only tables.</>,
            ]}
          />
        </AnsSection>

        <AnsSection title="Key characteristics">
          <AnsPoints
            items={[
              <>Flexible / multiple schemas rather than one rigid relational model.</>,
              <>Designed for distribution and scale-out workloads.</>,
              <>May relax strict ACID behaviour for availability and partition tolerance (CAP trade-offs).</>,
            ]}
          />
        </AnsSection>

        <AnsSection title="Types of NoSQL databases">
          <AnsTable
            headers={['Type', 'Idea', 'Example']}
            rows={[
              ['Key-Value Store', 'Opaque value accessed by a key', 'Redis, Dynamo-style stores'],
              ['Document Store', 'JSON/XML-like hierarchical documents', 'MongoDB, CouchDB'],
              ['Column-Family Store', 'Column families / wide rows', 'HBase, Cassandra'],
              ['Graph Database', 'Nodes and relationships', 'Neo4j (social / network data)'],
            ]}
          />
        </AnsSection>

        <AnsSummary>
          Define Not Only SQL, give why/characteristics, then all four types with one example each in a compact table.
        </AnsSummary>
      </>
    ),
  },
  {
    id: 'm1-q12',
    number: 12,
    question: 'Write a note on Hadoop and explain its significance in Big Data.',
    years: [],
    marks: null,
    marksBand: null,
    priority: 'high',
    repeated: true,
    topics: ['Hadoop'],
    shortTitle: 'Hadoop and its Significance',
    answer: (
      <>
        <AnsSection title="What is Hadoop?">
          <AnsLead>
            <Keyword>Hadoop</Keyword> is a scalable and reliable <Keyword>parallel computing platform</Keyword> for
            managing and processing Big Data on distributed systems. It packages an application programming model and
            works with distributed storage such as <Keyword>HDFS</Keyword>.
          </AnsLead>
        </AnsSection>

        <AnsSection title="Significance in Big Data (Module 1 depth)">
          <AnsPoints
            items={[
              <>
                <Keyword>Distributed storage</Keyword> via HDFS — open source, scaling, self-managing and
                self-healing.
              </>,
              <>
                <Keyword>Distributed processing</Keyword> of large datasets across commodity cluster nodes.
              </>,
              <>
                <Keyword>Scalability</Keyword> to grow capacity as volume and workload increase.
              </>,
              <>
                <Keyword>Fault tolerance</Keyword> through replication and self-healing behaviour of the file system.
              </>,
              <>Runs on <Keyword>commodity hardware</Keyword>, improving cost efficiency versus only scaling up.</>,
              <>
                Forms a core of Big Data ecosystems together with NoSQL stores (HBase, MongoDB, Cassandra) and
                processing/analytics tools.
              </>,
            ]}
          />
        </AnsSection>

        <AnsSummary>
          Keep introductory: definition + distributed storage/processing + scalability + fault tolerance + commodity
          hardware. Leave deep YARN/MapReduce internals for later modules.
        </AnsSummary>
      </>
    ),
  },
]

export const MOST_IMPORTANT_IDS = ['m1-q1', 'm1-q2', 'm1-q5', 'm1-q7', 'm1-q11']

export function getPriorityLabel(priority) {
  if (priority === 'very-high') return 'Very Important'
  if (priority === 'high') return 'Frequently Asked'
  return 'Important'
}

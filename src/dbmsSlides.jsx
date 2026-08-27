import {
  ArrowRight,
  CheckCircle2,
  FileSpreadsheet,
  Server,
  ShieldCheck,
  Users,
} from 'lucide-react'
import {
  ComparisonLayout,
  DefinitionBlock,
  Lead,
  Points,
  ProcessPath,
  Stack,
  Takeaway,
  TwoColumn,
  VisualFirst,
  VisualPanel,
} from './components/Teaching'

const icon = { size: 30, strokeWidth: 1.7, 'aria-hidden': true }

function MiniTable({ columns, rows, hotCols = [], hotRows = [], dangerRows = [], caption }) {
  return (
    <div className="dbms-mini-table">
      {caption && <strong>{caption}</strong>}
      <table>
        <thead>
          <tr>{columns.map((col, i) => <th key={col} className={hotCols.includes(i) ? 'hot' : ''}>{col}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={`${row.join('-')}-${r}`} className={`${hotRows.includes(r) ? 'hot-row' : ''} ${dangerRows.includes(r) ? 'danger-row' : ''}`.trim()}>
              {row.map((cell, c) => <td key={`${cell}-${c}`} className={hotCols.includes(c) ? 'hot' : ''}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ModuleTitle({ number, title, question, source }) {
  return (
    <div className="dbms-cinema">
      <div className="dbms-cinema-copy">
        <p className="slide-kicker">DATABASE MANAGEMENT SYSTEMS · VTU BCS403</p>
        <h1>Module {number}</h1>
        <p className="subtitle">{title}</p>
        <Lead>{question}</Lead>
        <div className="dbms-source-pill">{source}</div>
      </div>
      <DatabaseCore stage={Number(number)} />
    </div>
  )
}

function Roadmap({ items }) {
  return (
    <VisualFirst
      visual={<ProcessPath steps={items} />}
      takeaway={<Takeaway>Follow the PPT order, but keep one living example: the University Academic Management System.</Takeaway>}
    />
  )
}

function DatabaseCore({ stage = 1 }) {
  const entities = ['STUDENT', 'DEPARTMENT', 'COURSE', 'FACULTY', 'MARKS', 'LIBRARY']
  return (
    <div className={`dbms-core stage-${stage}`} aria-label="University Database Core" data-slide-decorative="true">
      <div className="dbms-core-cylinder">
        <span>University</span>
        <strong>Database Core</strong>
      </div>
      <div className="dbms-core-ring">
        {entities.map((entity, i) => <b key={entity} style={{ '--i': i }}>{entity}</b>)}
      </div>
    </div>
  )
}

function CampusFiles() {
  const files = ['Admissions', 'Department', 'Attendance', 'Marks', 'Library', 'Placement']
  return (
    <div className="dbms-file-stage">
      {files.map((file, i) => (
        <article key={file} style={{ '--i': i }}>
          <FileSpreadsheet {...icon} />
          <strong>{file}.xlsx</strong>
          <span>Asha · 1AB23IS001</span>
        </article>
      ))}
      <div className="dbms-anomaly-beam">duplicate copies create inconsistent truth</div>
    </div>
  )
}

function DbmsEnvironment() {
  return (
    <div className="dbms-environment">
      <div className="dbms-users">
        {['Students', 'Faculty', 'Librarian', 'Accounts'].map((u) => <span key={u}>{u}</span>)}
      </div>
      <ArrowRight {...icon} />
      <div className="dbms-gateway"><Server {...icon} /><strong>DBMS</strong><small>catalog · query processor · transaction manager · storage manager</small></div>
      <ArrowRight {...icon} />
      <DatabaseCore stage={2} />
    </div>
  )
}

function SchemaLayers() {
  return (
    <div className="dbms-layer-stack">
      {[
        ['View level', 'student portal, faculty view, accounts view'],
        ['Logical level', 'entities, relationships, constraints, schemas'],
        ['Physical level', 'files, indexes, records, storage paths'],
      ].map(([title, text], i) => <section key={title} style={{ '--i': i }}><strong>{title}</strong><span>{text}</span></section>)}
    </div>
  )
}

function ModelGallery() {
  return (
    <div className="dbms-model-gallery">
      {[
        ['Hierarchical', 'tree of records'],
        ['Network', 'graph-like links'],
        ['Relational', 'tables with keys'],
        ['Object-oriented', 'objects and classes'],
        ['Document', 'JSON-like documents'],
      ].map(([name, text]) => <article key={name}><strong>{name}</strong><span>{text}</span></article>)}
    </div>
  )
}

function ErDiagram({ mapping = false }) {
  return (
    <div className="dbms-er-map">
      <svg viewBox="0 0 760 360" role="img" aria-label="University ER diagram">
        <g className="entity"><rect x="46" y="64" width="155" height="62" rx="9" /><text x="123" y="99">STUDENT</text></g>
        <g className="entity"><rect x="548" y="64" width="155" height="62" rx="9" /><text x="626" y="99">COURSE</text></g>
        <g className="entity teal"><rect x="292" y="238" width="175" height="62" rx="9" /><text x="380" y="273">DEPARTMENT</text></g>
        <g className="entity purple"><rect x="292" y="64" width="175" height="62" rx="9" /><text x="380" y="99">ENROLLMENT</text></g>
        <path d="M201 95 H292 M467 95 H548 M380 126 V238 M123 126 C155 244 245 270 292 270 M626 126 C603 240 505 270 467 270" />
        <text x="246" y="84">has</text><text x="506" y="84">contains</text><text x="402" y="184">belongs to</text>
        <text x="236" y="118">1:N</text><text x="508" y="118">N:1</text><text x="404" y="224">N:1</text>
        <g className="attr"><ellipse cx="92" cy="28" rx="44" ry="18" /><text x="92" y="33">USN</text></g>
        <g className="attr"><ellipse cx="168" cy="28" rx="48" ry="18" /><text x="168" y="33">Name</text></g>
        <g className="attr"><ellipse cx="592" cy="28" rx="52" ry="18" /><text x="592" y="33">Code</text></g>
        <g className="attr"><ellipse cx="670" cy="28" rx="48" ry="18" /><text x="670" y="33">Title</text></g>
      </svg>
      {mapping && (
        <div className="dbms-table-row-map">
          <MiniTable caption="STUDENT" columns={['USN', 'Name', 'DeptID']} rows={[['1AB23IS001', 'Asha', 'ISE']]} hotCols={[0, 2]} />
          <MiniTable caption="ENROLLMENT" columns={['USN', 'CourseID', 'Sem']} rows={[['1AB23IS001', 'BCS403', '5']]} hotCols={[0, 1]} />
          <MiniTable caption="COURSE" columns={['CourseID', 'Title']} rows={[['BCS403', 'DBMS']]} hotCols={[0]} />
        </div>
      )}
    </div>
  )
}

function RelationalVocabulary() {
  return (
    <div className="dbms-vocab-board">
      <MiniTable caption="STUDENT relation" columns={['USN', 'Name', 'Semester', 'DeptID']} rows={[['1AB23IS001', 'Asha', '5', 'ISE'], ['1AB23CS014', 'Rohan', '5', 'CSE'], ['1AB23IS021', 'Meera', '3', 'ISE']]} hotCols={[0]} />
      {['Domain', 'Attribute', 'Tuple', 'Relation', 'Relation schema', 'Database schema'].map((term) => <span key={term}>{term}</span>)}
    </div>
  )
}

function AlgebraOp({ type }) {
  const base = [
    ['1AB23IS001', 'Asha', 'ISE', '8.7'],
    ['1AB23CS014', 'Rohan', 'CSE', '7.8'],
    ['1AB23IS021', 'Meera', 'ISE', '9.1'],
  ]
  const configs = {
    select: ['SELECT', 'sigma DeptID = ISE (STUDENT)', ['USN', 'Name', 'DeptID', 'CGPA'], base, [0, 2], []],
    project: ['PROJECT', 'pi Name, CGPA (STUDENT)', ['Name', 'CGPA'], [['Asha', '8.7'], ['Rohan', '7.8'], ['Meera', '9.1']], [0, 1, 2], []],
    set: ['UNION / INTERSECTION / MINUS', 'relations must be union compatible', ['USN', 'CourseID'], [['1AB23IS001', 'BCS403'], ['1AB23IS021', 'BCS403'], ['1AB23CS014', 'BCS401']], [0, 1], []],
    join: ['JOIN', 'STUDENT ⋈ Student.DeptID = Department.DeptID DEPARTMENT', ['USN', 'Name', 'DeptName'], [['1AB23IS001', 'Asha', 'Information Science'], ['1AB23CS014', 'Rohan', 'Computer Science']], [0, 1], []],
    division: ['DIVISION', 'students who enrolled in all required courses', ['USN'], [['1AB23IS001'], ['1AB23IS021']], [0, 1], []],
  }
  const [label, expression, columns, rows, hotRows, dangerRows] = configs[type]
  return (
    <div className="dbms-algebra">
      <div className="dbms-operator"><strong>{label}</strong><code>{expression}</code></div>
      <ArrowRight {...icon} />
      <MiniTable columns={columns} rows={rows} hotRows={hotRows} dangerRows={dangerRows} />
    </div>
  )
}

function ConstraintBoard({ mode }) {
  const rows = mode === 'insert'
    ? [['1AB23IS001', 'Asha', 'ISE'], ['1AB23IS001', 'Asha Copy', 'ISE'], ['1AB23ME404', 'Kiran', 'MECH']]
    : mode === 'delete'
      ? [['ISE', 'Information Science'], ['CSE', 'Computer Science'], ['ECE', 'Electronics']]
      : [['1AB23IS001', 'Asha', 'ISE'], ['1AB23CS014', 'Rohan', 'CSE'], ['1AB23IS021', 'Meera', 'CIV']]
  return (
    <div className="dbms-constraint-board">
      <MiniTable columns={mode === 'delete' ? ['DeptID', 'DeptName'] : ['USN', 'Name', 'DeptID']} rows={rows} dangerRows={[1]} hotCols={[0]} />
      <div>
        <DefinitionBlock label={mode.toUpperCase()}>
          {mode === 'insert' && 'Insert can violate domain, key, entity integrity or referential integrity constraints.'}
          {mode === 'delete' && 'Delete may be restricted, cascaded, or set NULL/default when referenced tuples exist.'}
          {mode === 'update' && 'Update may violate the same rules as delete plus insert because old values are replaced by new values.'}
        </DefinitionBlock>
      </div>
    </div>
  )
}

function BadDesignTable() {
  return (
    <div className="dbms-normalize">
      <MiniTable
        caption="STUDENT_COURSE before normalization"
        columns={['USN', 'StudentName', 'Dept', 'CourseID', 'CourseName', 'Faculty', 'FacultyPhone', 'Marks']}
        rows={[
          ['1AB23IS001', 'Asha', 'ISE', 'BCS403', 'DBMS', 'Dr Rao', '9988', '88'],
          ['1AB23IS001', 'Asha', 'ISE', 'BCS401', 'ADA', 'Dr Sen', '8877', '82'],
          ['1AB23IS021', 'Meera', 'ISE', 'BCS403', 'DBMS', 'Dr Rao', '9988', '91'],
        ]}
        hotCols={[0, 3]}
        dangerRows={[0, 2]}
      />
      <div className="dbms-anomaly-list">
        <span>Update anomaly</span><span>Insertion anomaly</span><span>Deletion anomaly</span><span>NULL overload</span><span>Spurious tuple risk</span>
      </div>
    </div>
  )
}

function DependencyVisual() {
  return (
    <div className="dbms-fd-board">
      {[
        ['USN', 'StudentName, Dept'],
        ['CourseID', 'CourseName'],
        ['Faculty', 'FacultyPhone'],
        ['USN + CourseID', 'Marks'],
      ].map(([from, to]) => <p key={from}><strong>{from}</strong><ArrowRight {...icon} /><span>{to}</span></p>)}
    </div>
  )
}

function NormalFormLadder() {
  return (
    <div className="dbms-nf-ladder">
      {[
        ['1NF', 'atomic values, no repeating groups'],
        ['2NF', 'remove partial dependency'],
        ['3NF', 'remove transitive dependency'],
        ['BCNF', 'every determinant is a candidate key'],
        ['4NF', 'control multivalued dependencies'],
        ['5NF', 'control join dependencies'],
      ].map(([nf, rule], i) => <section key={nf} style={{ '--i': i }}><strong>{nf}</strong><span>{rule}</span></section>)}
    </div>
  )
}

function SqlExecution({ type }) {
  const syntax = {
    create: 'CREATE TABLE Student (USN CHAR(10) PRIMARY KEY, Name VARCHAR(30), DeptID CHAR(3));',
    select: 'SELECT Name, CGPA FROM Student WHERE DeptID = \'ISE\' ORDER BY CGPA DESC;',
    insert: 'INSERT INTO Student VALUES (\'1AB23IS021\', \'Meera\', \'ISE\');',
    update: 'UPDATE Student SET DeptID = \'CSE\' WHERE USN = \'1AB23CS014\';',
    delete: 'DELETE FROM Student WHERE USN = \'1AB23ME404\';',
  }
  return (
    <div className="dbms-sql-stage">
      <pre><code>{syntax[type]}</code></pre>
      <ArrowRight {...icon} />
      <MiniTable columns={['USN', 'Name', 'DeptID', 'CGPA']} rows={[['1AB23IS001', 'Asha', 'ISE', '8.7'], ['1AB23CS014', 'Rohan', type === 'update' ? 'CSE' : 'ISE', '7.8'], ['1AB23IS021', 'Meera', 'ISE', '9.1']]} hotRows={type === 'insert' ? [2] : type === 'update' ? [1] : []} dangerRows={type === 'delete' ? [1] : []} />
    </div>
  )
}

function TransactionTimeline({ conflict = false }) {
  return (
    <div className={`dbms-txn-timeline ${conflict ? 'conflict' : ''}`.trim()}>
      {[
        ['T1', 'read(A)', 'A = 100'],
        ['T2', 'read(A)', 'A = 100'],
        ['T1', 'write(A=90)', 'debit'],
        ['T2', 'write(A=80)', conflict ? 'lost update' : 'controlled'],
        ['T1/T2', 'commit', 'durable state'],
      ].map(([txn, op, note], i) => <section key={`${txn}-${op}`} style={{ '--i': i }}><strong>{txn}</strong><code>{op}</code><span>{note}</span></section>)}
    </div>
  )
}

function RecoveryLog() {
  return (
    <div className="dbms-recovery">
      {['<START T1>', '<T1, A, 100, 90>', '<COMMIT T1>', '<START T2>', '<T2, B, 60, 70>', 'CRASH'].map((item, i) => <code key={item} style={{ '--i': i }}>{item}</code>)}
      <div className="dbms-recovery-actions"><span>UNDO uncommitted T2</span><span>REDO committed T1</span><span>checkpoint reduces work</span></div>
    </div>
  )
}

function LockingBoard() {
  return (
    <div className="dbms-lock-board">
      <MiniTable columns={['Requested', 'S lock held', 'X lock held']} rows={[['S lock', 'compatible', 'not compatible'], ['X lock', 'not compatible', 'not compatible']]} hotRows={[0]} dangerRows={[1]} />
      <div className="dbms-2pl"><span>Growing phase: acquire locks</span><span>Lock point</span><span>Shrinking phase: release locks</span></div>
    </div>
  )
}

function DeadlockGraph() {
  return (
    <div className="dbms-deadlock">
      <span>T1 waits for item held by T2</span>
      <ArrowRight {...icon} />
      <span>T2 waits for item held by T1</span>
      <ArrowRight {...icon} />
      <strong>cycle in wait-for graph</strong>
    </div>
  )
}

function NoSqlWorld() {
  return (
    <div className="dbms-nosql">
      {[
        ['Document', '{ student, marks, library }'],
        ['Key-value', 'USN -> profile'],
        ['Wide-column', 'student rows, column families'],
        ['Distributed', 'partition + replicate'],
      ].map(([name, text], i) => <article key={name} style={{ '--i': i }}><strong>{name}</strong><code>{text}</code></article>)}
    </div>
  )
}

function Recap({ moduleName, points }) {
  return (
    <Stack gap="md" className="dbms-recap">
      <DefinitionBlock label="One-page revision">{moduleName}</DefinitionBlock>
      <Points items={points} />
      <Takeaway label="Exam Method">Define the term, draw the visual, write the formal rule or syntax, then connect it to the University database example.</Takeaway>
    </Stack>
  )
}

function slide({ id, kicker, title, subtitle, visual, points, takeaway, layout = 'standard', hideTitle = false }) {
  return {
    id,
    kicker,
    title,
    subtitle,
    layout,
    hideTitle,
    content: (
      <TwoColumn visual={visual} ratio={visual ? 'copy-visual' : 'copy-only'}>
        {subtitle && <Lead>{subtitle}</Lead>}
        {points && <Points items={points} />}
        {takeaway && <Takeaway>{takeaway}</Takeaway>}
      </TwoColumn>
    ),
  }
}

function visualSlide({ id, kicker, title, lead, visual, takeaway }) {
  return { id, kicker, title, content: <VisualFirst lead={lead} visual={visual} takeaway={<Takeaway>{takeaway}</Takeaway>} /> }
}

export const dbmsModule1Slides = [
  { id: 'dbms-m1-title', kicker: 'VTU BCS403', hideTitle: true, layout: 'full', content: <ModuleTitle number="01" title="Fundamentals and ER Model" question="How do we turn scattered institutional records into an organized database system?" source="Source: VTU_DBMS_Module_1_Fundamentals_ER_Model.pptx" /> },
  { id: 'dbms-m1-roadmap', kicker: 'Module journey', title: 'Module 1 learning path', content: <Roadmap items={['Database, DBMS and database system', 'File processing vs DBMS approach', 'Actors, workers, advantages and limitations', 'Models, schemas, instances and architecture', 'Languages, interfaces, utilities and classification', 'ER entities, attributes, keys and relationships']} /> },
  visualSlide({ id: 'm1-file-chaos', kicker: 'Why DBMS', title: 'File processing creates scattered truth', lead: 'The same student appears in admissions, attendance, marks, library and placement files. One update becomes many risky updates.', visual: <CampusFiles />, takeaway: 'Redundancy, inconsistency, isolation, security gaps and weak integrity motivate the DBMS approach.' }),
  visualSlide({ id: 'm1-database-definition', kicker: 'Foundations', title: 'Database, DBMS and database system', lead: 'A database represents a miniworld with logically related data. A DBMS is the software that defines, constructs, manipulates and shares that database.', visual: <DbmsEnvironment />, takeaway: 'Database = organized data. DBMS = controlling software. Database system = DBMS plus database plus users and applications.' }),
  slide({ id: 'm1-implicit-properties', kicker: 'Database properties', title: 'Implicit properties of a database', subtitle: 'The source PPT frames a database as a logically coherent collection with meaning, purpose, and intended users.', visual: <DatabaseCore stage={1} />, points: ['Represents some aspect of the real world.', 'Is logically coherent, not a random pile of records.', 'Is designed and populated for a specific purpose.', 'Changes when the miniworld changes.'], takeaway: 'In the University system, the miniworld is the academic institution.' }),
  slide({ id: 'm1-self-describing', kicker: 'DBMS approach', title: 'Self-describing systems and program-data independence', subtitle: 'The catalog stores metadata: schemas, data types, constraints and access paths.', visual: <SchemaLayers />, points: ['Self-describing DBMS keeps data description inside the system catalog.', 'Program-data independence reduces dependence between programs and file structure.', 'Data abstraction hides lower storage detail behind view, logical and physical levels.'], takeaway: 'Applications should survive storage changes and many logical changes.' }),
  visualSlide({ id: 'm1-views-transactions', kicker: 'Multiuser DBMS', title: 'Multiple views and ACID behavior', lead: 'Students, faculty and accounts do not need the same screen, but they must share one correct database.', visual: <ComparisonLayout left={<VisualPanel label="Views"><Users {...icon} /><Points items={['student marks view', 'faculty attendance view', 'accounts fee view']} /></VisualPanel>} right={<VisualPanel label="Transactions"><ShieldCheck {...icon} /><Points items={['atomic', 'consistent', 'isolated', 'durable']} /></VisualPanel>} />, takeaway: 'A DBMS supports many views while protecting concurrent updates.' }),
  slide({ id: 'm1-actors-workers', kicker: 'People', title: 'Actors on the scene and workers behind the scene', subtitle: 'The PPT separates visible database users from the people who build and operate the DBMS environment.', visual: <ProcessPath direction="vertical" steps={['Naive end users', 'Casual end users', 'Sophisticated users', 'DBA', 'Designers and system analysts', 'DBMS/tool operators']} />, points: ['End users include naive, casual, sophisticated and stand-alone users.', 'DBA authorizes access, coordinates resources, monitors performance, backup and recovery.', 'Behind-the-scene workers include DBMS designers, tool developers and operators.'], takeaway: 'Exam answers should name both user categories and responsibilities.' }),
  slide({ id: 'm1-advantages-limits', kicker: 'Evaluation', title: 'DBMS advantages and when not to use one', subtitle: 'The DBMS is powerful, but the source PPT also warns that cost and complexity must be justified.', visual: <ComparisonLayout left={<VisualPanel label="Advantages"><CheckCircle2 {...icon} /><Points items={['controlled redundancy', 'integrity and security', 'backup and recovery', 'data sharing']} /></VisualPanel>} right={<VisualPanel label="Limitations"><Server {...icon} /><Points items={['high initial investment', 'complexity', 'overhead', 'not ideal for simple single-user data']} /></VisualPanel>} />, takeaway: 'Use DBMS when sharing, constraints, reliability and scale matter.' }),
  visualSlide({ id: 'm1-models-schemas', kicker: 'Abstraction', title: 'Data models, schemas and instances', lead: 'Data models provide concepts. A schema is the blueprint. An instance is the data at a particular moment.', visual: <><ModelGallery /><MiniTable caption="Instance changes under stable STUDENT schema" columns={['USN', 'Name', 'Semester']} rows={[['1AB23IS001', 'Asha', '5'], ['1AB23IS021', 'Meera', '3']]} hotRows={[1]} /></>, takeaway: 'Do not confuse schema structure with current table contents.' }),
  slide({ id: 'm1-languages-interfaces', kicker: 'DBMS tools', title: 'Languages, interfaces, utilities and architectures', subtitle: 'The DBMS environment includes command languages, user interfaces, utilities and deployment architectures.', visual: <ProcessPath direction="vertical" steps={['DDL', 'DML', 'DCL', 'TCL', 'Menus/forms/GUI/NLP', 'Backup, loading, monitoring', 'centralized · client/server · 2-tier · 3-tier · n-tier']} />, points: ['DDL defines schema; DML retrieves and updates data.', 'Interfaces match user skill: forms, menus, GUI, natural language and parametric interfaces.', 'Utilities support loading, backup, reorganization, monitoring and performance.'], takeaway: 'Architecture answers where users, applications, DBMS and data live.' }),
  visualSlide({ id: 'm1-er-core', kicker: 'Conceptual design', title: 'Entities, attributes, keys and relationships', lead: 'Conceptual design starts from requirements and creates an ER model before tables are implemented.', visual: <ErDiagram />, takeaway: 'Entities are objects, attributes describe them, keys identify them, and relationships connect them.' }),
  slide({ id: 'm1-er-constraints', kicker: 'ER constraints', title: 'Cardinality, participation and weak entities', subtitle: 'Relationship constraints capture real institutional rules before code is written.', visual: <ProcessPath steps={['1:1', '1:N', 'M:N', 'total participation', 'partial participation', 'weak entity + identifying relationship']} />, points: ['Cardinality ratios specify how many entity instances may participate.', 'Participation constraints say whether participation is mandatory.', 'Weak entity types depend on an owner entity and a partial key.', 'ER design choices decide whether a concept is an attribute, entity or relationship.'], takeaway: 'Most exam ER diagrams are won by clear keys, cardinalities and participation.' }),
  slide({ id: 'm1-eer', kicker: 'Enhanced ER', title: 'Specialization and generalization', subtitle: 'The PPT closes ER modeling by showing higher-level abstraction when entities share common structure.', visual: <ProcessPath steps={['PERSON', 'STUDENT', 'FACULTY', 'STAFF', 'shared attributes', 'specialized attributes']} />, points: ['Specialization moves from a superclass to subclasses.', 'Generalization abstracts common properties into a superclass.', 'Use the choice only when it clarifies constraints in the miniworld.'], takeaway: 'The University system can generalize Student and Faculty under Person.' }),
  { id: 'm1-recap', kicker: 'Revision', title: 'Module 1 mind map and exam focus', content: <Recap moduleName="Fundamentals and ER Model" points={['Define database, DBMS and database system with implicit properties.', 'Explain file processing problems and DBMS advantages/limitations.', 'Draw database environment, three-schema architecture and client/server tiers.', 'Distinguish data models, schemas, instances and data independence.', 'Build ER models with entities, attributes, keys, relationships, cardinality, participation, weak entities and EER ideas.']} /> },
]

export const dbmsModule2Slides = [
  { id: 'dbms-m2-title', kicker: 'VTU BCS403', hideTitle: true, layout: 'full', content: <ModuleTitle number="02" title="Relational Model and Algebra" question="How do tables represent facts, enforce meaning and answer precise questions?" source="Source: VTU_DBMS_Module_2_Relational_Model_Algebra_Mapping.pptx" /> },
  { id: 'dbms-m2-roadmap', kicker: 'Module journey', title: 'Module 2 learning path', content: <Roadmap items={['Domains, attributes, tuples and relations', 'Relation schemas and characteristics', 'Relational constraints and update violations', 'Relational algebra operations', 'Aggregate, grouping, outer union and recursive closure', 'ER-to-relational mapping']} /> },
  visualSlide({ id: 'm2-relation-basics', kicker: 'Relational model', title: 'Relation basics and notation', lead: 'The relational model represents data as relations. Students see tables; the DBMS enforces a formal structure.', visual: <RelationalVocabulary />, takeaway: 'A relation schema names the relation and its attributes; a database schema collects many relation schemas.' }),
  slide({ id: 'm2-characteristics', kicker: 'Table rules', title: 'Characteristics of relations', subtitle: 'Relations are not spreadsheets with random structure; the model gives them formal properties.', visual: <MiniTable caption="STUDENT(USN, Name, Semester, DeptID)" columns={['USN', 'Name', 'Semester', 'DeptID']} rows={[['1AB23IS001', 'Asha', '5', 'ISE'], ['1AB23CS014', 'Rohan', '5', 'CSE']]} hotCols={[0]} />, points: ['Tuples are unordered; attributes are named.', 'Each cell should hold an atomic value from its domain.', 'Tuple values are distinct when a key is enforced.', 'NULL may mean unknown, unavailable or not applicable.'], takeaway: 'Formal relation properties are the reason SQL tables can be queried predictably.' }),
  slide({ id: 'm2-constraints', kicker: 'Meaning protection', title: 'Domain, key, NULL, entity and referential integrity', subtitle: 'Constraints keep tables believable when users insert, delete or update tuples.', visual: <ConstraintBoard mode="update" />, points: ['Domain constraints restrict allowed attribute values.', 'Key constraints make tuples uniquely identifiable.', 'Entity integrity says primary key values cannot be NULL.', 'Referential integrity says a foreign key must match an existing referenced tuple or be NULL when allowed.'], takeaway: 'Constraints are the DBMS version of institutional rules.' }),
  visualSlide({ id: 'm2-insert-delete-update', kicker: 'Update operations', title: 'Insert, delete and update can violate constraints', lead: 'Every change request is checked before the database accepts it.', visual: <div className="dbms-triple"><ConstraintBoard mode="insert" /><ConstraintBoard mode="delete" /><ConstraintBoard mode="update" /></div>, takeaway: 'The DBMS may reject, cascade, set NULL/default or ask for correction depending on the constraint and action.' }),
  visualSlide({ id: 'm2-select', kicker: 'Relational algebra', title: 'SELECT filters rows', lead: 'Selection chooses tuples that satisfy a condition.', visual: <AlgebraOp type="select" />, takeaway: 'sigma condition (RELATION) is row filtering.' }),
  visualSlide({ id: 'm2-project-rename', kicker: 'Relational algebra', title: 'PROJECT chooses columns and RENAME labels results', lead: 'Projection reduces attributes. Rename gives relation or attribute names to intermediate results.', visual: <AlgebraOp type="project" />, takeaway: 'pi attribute-list (RELATION) is column selection; rename keeps algebra expressions readable.' }),
  visualSlide({ id: 'm2-set-ops', kicker: 'Set operations', title: 'UNION, INTERSECTION and MINUS need compatibility', lead: 'Set operations combine relations only when they have the same degree and compatible domains.', visual: <AlgebraOp type="set" />, takeaway: 'Union compatibility is the exam keyword for set operations.' }),
  visualSlide({ id: 'm2-product-join', kicker: 'Product and join', title: 'CARTESIAN PRODUCT becomes useful when JOIN adds meaning', lead: 'Product combines every pair. Join filters those combinations through a relationship condition.', visual: <AlgebraOp type="join" />, takeaway: 'Equijoin uses equality; natural join automatically matches same-named attributes.' }),
  visualSlide({ id: 'm2-outer-division', kicker: 'Advanced algebra', title: 'Outer joins, division, aggregate and grouping operations', lead: 'Outer joins preserve unmatched tuples. Division answers for-all questions. Aggregation collapses rows into computed values.', visual: <AlgebraOp type="division" />, takeaway: 'Division is best understood as: find students connected to every required course.' }),
  visualSlide({ id: 'm2-query-tree', kicker: 'Expression sequencing', title: 'Sequences become query trees', lead: 'Relational algebra expressions can be represented as trees where leaves are input relations and internal nodes are operations.', visual: <ProcessPath direction="vertical" steps={['STUDENT', 'sigma DeptID=ISE', 'pi USN, Name', 'rename ISE_STUDENTS', 'result relation']} />, takeaway: 'Query trees show operation order and intermediate results.' }),
  visualSlide({ id: 'm2-er-mapping', kicker: 'Logical design', title: 'ER designs map into relational schemas', lead: 'The Module 2 PPT closes by flattening ER designs into implementable relations.', visual: <ErDiagram mapping />, takeaway: 'Regular entities become relations; weak entities include owner keys; 1:N puts FK on N side; M:N creates a new relation.' }),
  { id: 'm2-recap', kicker: 'Revision', title: 'Module 2 mind map and exam focus', content: <Recap moduleName="Relational Model and Algebra" points={['Define domain, attribute, tuple, relation, relation schema and database schema.', 'List relation characteristics and relational notation.', 'Explain domain, key, NULL, entity and referential integrity constraints.', 'Show insert, delete and update violations with remedies.', 'Work selection, projection, rename, set operations, product, join, outer join, division, aggregate and grouping operations.', 'Map ER constructs into relational schemas.']} /> },
]

export const dbmsModule3Slides = [
  { id: 'dbms-m3-title', kicker: 'VTU BCS403', hideTitle: true, layout: 'full', content: <ModuleTitle number="03" title="Normalization and SQL" question="How do we design clean tables and implement them with SQL?" source="Source: VTU_DBMS_Module_3_Normalization_SQL.pptx" /> },
  { id: 'dbms-m3-roadmap', kicker: 'Module journey', title: 'Module 3 learning path', content: <Roadmap items={['Informal design guidelines', 'Redundancy, anomalies, NULLs and spurious tuples', 'Functional dependencies and keys', '1NF, 2NF, 3NF, BCNF, 4NF and 5NF', 'SQL DDL, types and constraints', 'SELECT, INSERT, DELETE, UPDATE and additional features']} /> },
  visualSlide({ id: 'm3-why-normalization', kicker: 'Design quality', title: 'Why normalization matters', lead: 'A single overloaded table makes repeated facts look convenient until updates, inserts and deletes break meaning.', visual: <BadDesignTable />, takeaway: 'Normalization reduces redundancy and anomaly risk while preserving the intended facts.' }),
  slide({ id: 'm3-guidelines', kicker: 'Informal guidelines', title: 'Clear semantics, low redundancy and controlled NULLs', subtitle: 'The PPT begins with design guidelines before formal normal forms.', visual: <ProcessPath direction="vertical" steps={['Clear attribute meaning', 'Avoid repeated information', 'Minimize NULL values', 'Avoid spurious tuples']} />, points: ['Each tuple should represent one entity or relationship fact.', 'Repeated information creates modification anomalies.', 'NULL values should be exceptional, not a design habit.', 'Bad decomposition can create spurious tuples after joins.'], takeaway: 'Good schemas make each fact live in the right table.' }),
  visualSlide({ id: 'm3-fd', kicker: 'Functional dependency', title: 'Functional dependency is the design rule', lead: 'If X determines Y, then two tuples with the same X value must have the same Y value.', visual: <DependencyVisual />, takeaway: 'FD notation is not decoration; it states a rule about the miniworld.' }),
  slide({ id: 'm3-fd-types', kicker: 'FD vocabulary', title: 'Full, partial, transitive and trivial dependencies', subtitle: 'Normal forms depend on recognizing dependency shape.', visual: <ProcessPath direction="vertical" steps={['Full dependency', 'Partial dependency', 'Transitive dependency', 'Trivial dependency', 'Prime attribute', 'Candidate key']} />, points: ['Full dependency needs the whole determinant.', 'Partial dependency uses only part of a composite key.', 'Transitive dependency passes through a non-key attribute.', 'Prime attributes are part of a candidate key.'], takeaway: 'Name the dependency type before choosing the normal form fix.' }),
  visualSlide({ id: 'm3-normal-forms', kicker: 'Normalization sequence', title: '1NF to 5NF as progressive fixes', lead: 'Each normal form removes a particular class of design problem.', visual: <NormalFormLadder />, takeaway: 'BCNF is stricter than 3NF because every determinant must be a candidate key.' }),
  visualSlide({ id: 'm3-decomposition', kicker: 'Before to after', title: 'Decomposition creates cleaner schemas', lead: 'The same University table decomposes into student, course, faculty and marks relations.', visual: <div className="dbms-table-row-map"><MiniTable caption="STUDENT" columns={['USN', 'Name', 'Dept']} rows={[['1AB23IS001', 'Asha', 'ISE'], ['1AB23IS021', 'Meera', 'ISE']]} hotCols={[0]} /><MiniTable caption="COURSE" columns={['CourseID', 'CourseName', 'Faculty']} rows={[['BCS403', 'DBMS', 'Dr Rao'], ['BCS401', 'ADA', 'Dr Sen']]} hotCols={[0]} /><MiniTable caption="MARKS" columns={['USN', 'CourseID', 'Marks']} rows={[['1AB23IS001', 'BCS403', '88'], ['1AB23IS021', 'BCS403', '91']]} hotCols={[0, 1]} /></div>, takeaway: 'A good decomposition should avoid spurious tuples and preserve required dependencies where possible.' }),
  visualSlide({ id: 'm3-create-table', kicker: 'SQL DDL', title: 'CREATE TABLE pattern, data types and constraints', lead: 'SQL turns the relational schema into executable database structure.', visual: <SqlExecution type="create" />, takeaway: 'Use readable data types plus primary key, foreign key, CHECK, DEFAULT and NOT NULL constraints.' }),
  visualSlide({ id: 'm3-select', kicker: 'SQL retrieval', title: 'SELECT-FROM-WHERE, aliases, DISTINCT and ORDER BY', lead: 'Retrieval combines table source, row condition, column choice and final ordering.', visual: <SqlExecution type="select" />, takeaway: 'Aliases remove ambiguous names; DISTINCT removes duplicates; ORDER BY sorts the final result.' }),
  visualSlide({ id: 'm3-insert-update-delete', kicker: 'SQL DML', title: 'INSERT, DELETE and UPDATE modify tuples', lead: 'Every DML command has a before state, a predicate or values, and an after state.', visual: <div className="dbms-triple"><SqlExecution type="insert" /><SqlExecution type="update" /><SqlExecution type="delete" /></div>, takeaway: 'WHERE clauses protect UPDATE and DELETE from changing too much data.' }),
  slide({ id: 'm3-additional-sql', kicker: 'Additional features', title: 'Additional SQL features', subtitle: 'The source PPT groups extra SQL capabilities after core DDL and DML.', visual: <ProcessPath steps={['constraints', 'aliases', 'pattern matching', 'ordering', 'schema evolution', 'views / derived access']} />, points: ['Attribute, key, referential and tuple constraints encode rules.', 'Pattern matching supports flexible text conditions.', 'Derived access simplifies repeated query use when supported.', 'SQL features should be explained through table state changes, not syntax alone.'], takeaway: 'Pair every SQL syntax answer with a small table example.' }),
  { id: 'm3-recap', kicker: 'Revision', title: 'Module 3 mind map and exam focus', content: <Recap moduleName="Normalization and SQL" points={['Explain informal schema design guidelines.', 'Show redundancy, insertion/deletion/modification anomalies, NULL issues and spurious tuples.', 'Use FDs, keys and prime attributes to reason about design.', 'Describe 1NF, 2NF, 3NF, BCNF, 4NF and 5NF.', 'Write CREATE TABLE with data types, defaults, keys, referential constraints and CHECK.', 'Write SELECT, INSERT, DELETE, UPDATE and explain additional SQL features.']} /> },
]

export const dbmsModule4Slides = [
  { id: 'dbms-m4-title', kicker: 'VTU BCS403', hideTitle: true, layout: 'full', content: <ModuleTitle number="04" title="Transactions, Recovery and Serializability" question="How does a DBMS keep data correct when many operations interleave and failures happen?" source="Source: VTU_DBMS_Module_4_Transactions_Recovery_Serializability.pptx" /> },
  { id: 'dbms-m4-roadmap', kicker: 'Module journey', title: 'Module 4 learning path', content: <Roadmap items={['Transaction as logical unit of work', 'Database items, buffers, read/write operations', 'Concurrency problems and recovery needs', 'Transaction states, commit point and system log', 'ACID properties', 'Schedules, recoverability and serializability', 'SQL transaction support and isolation levels']} /> },
  visualSlide({ id: 'm4-transaction-unit', kicker: 'Transaction processing', title: 'A transaction is a logical unit of work', lead: 'A marks update, fee payment or library issue must complete as one meaningful database action.', visual: <TransactionTimeline />, takeaway: 'Read_item and write_item operations move values between database, buffers and transaction variables.' }),
  slide({ id: 'm4-items-buffers', kicker: 'Storage path', title: 'Database items and buffers', subtitle: 'The PPT distinguishes database items on disk from buffered copies used during execution.', visual: <ProcessPath steps={['disk database item X', 'input(X) to buffer', 'read_item(X)', 'write_item(X)', 'output(X) to disk']} />, points: ['A database item may be a record, block or larger data unit depending on granularity.', 'Buffer replacement policies decide when dirty pages return to disk.', 'Concurrency and recovery both depend on when values are read, written and flushed.'], takeaway: 'The log and buffer manager explain what survives a crash.' }),
  visualSlide({ id: 'm4-concurrency-problems', kicker: 'Why control is needed', title: 'Lost update, dirty read, incorrect summary and unrepeatable read', lead: 'Correct transactions can produce incorrect results when their read and write operations interleave without control.', visual: <TransactionTimeline conflict />, takeaway: 'Concurrency control is needed because multiuser speed should not destroy correctness.' }),
  slide({ id: 'm4-recovery-need', kicker: 'Failure handling', title: 'Why recovery is needed and what can fail', subtitle: 'Failures may affect transactions, the system, media or communication.', visual: <RecoveryLog />, points: ['Transaction failure may come from logical error, deadlock or explicit abort.', 'System crash loses volatile memory but not stable storage.', 'Media failure damages the database on disk.', 'Recovery uses log records to restore a consistent state.'], takeaway: 'The system log is recovery memory.' }),
  visualSlide({ id: 'm4-states-commit', kicker: 'Transaction life', title: 'Transaction states and commit point', lead: 'A transaction moves through active, partially committed, committed, failed, aborted and terminated states.', visual: <ProcessPath steps={['active', 'partially committed', 'committed', 'failed', 'aborted', 'terminated']} />, takeaway: 'The commit point is the moment the DBMS can guarantee durability for the transaction.' }),
  slide({ id: 'm4-acid', kicker: 'Correctness promise', title: 'ACID properties define transaction quality', subtitle: 'ACID gives the vocabulary for reliable transactions.', visual: <div className="dbms-acid">{['Atomicity', 'Consistency', 'Isolation', 'Durability'].map((p) => <span key={p}>{p}</span>)}</div>, points: ['Atomicity: all or nothing.', 'Consistency: preserve database rules.', 'Isolation: concurrent work appears controlled.', 'Durability: committed work survives failure.'], takeaway: 'Atomicity and durability connect strongly to recovery; isolation connects strongly to concurrency control.' }),
  slide({ id: 'm4-schedules', kicker: 'Schedules', title: 'Recoverable, cascadeless and strict schedules', subtitle: 'A schedule orders operations from multiple transactions.', visual: <TransactionTimeline conflict />, points: ['Recoverable schedules avoid committing a transaction that read uncommitted data from an aborted transaction.', 'Cascadeless schedules avoid cascading rollbacks by reading only committed values.', 'Strict schedules delay reads/writes of modified items until the writer commits or aborts.'], takeaway: 'Strict is easier for recovery than merely recoverable.' }),
  visualSlide({ id: 'm4-serializability', kicker: 'Gold standard', title: 'Serializability and conflict serializability', lead: 'A nonserial schedule is acceptable when it is equivalent to some serial schedule.', visual: <ProcessPath direction="vertical" steps={['list conflicting operations', 'build precedence graph', 'look for cycle', 'acyclic means conflict-serializable', 'topological order gives serial order']} />, takeaway: 'Conflicts are read-write, write-read and write-write on the same item by different transactions.' }),
  visualSlide({ id: 'm4-precedence', kicker: 'Worked visual', title: 'Precedence graph visual', lead: 'Edges show which transaction must come before another because of a conflict.', visual: <DeadlockGraph />, takeaway: 'For serializability graphs, a cycle means no equivalent serial order.' }),
  slide({ id: 'm4-sql-isolation', kicker: 'SQL support', title: 'SQL transactions and isolation levels', subtitle: 'SQL exposes transaction control and isolation trade-offs to applications.', visual: <ProcessPath steps={['START TRANSACTION', 'read/write SQL statements', 'COMMIT or ROLLBACK', 'READ COMMITTED', 'REPEATABLE READ', 'SERIALIZABLE']} />, points: ['Dirty read, nonrepeatable read and phantom are isolation-level phenomena.', 'Lower isolation may improve concurrency but allows more anomalies.', 'Higher isolation improves correctness but may reduce parallelism.'], takeaway: 'Isolation level is a deliberate correctness-performance trade-off.' }),
  { id: 'm4-recap', kicker: 'Revision', title: 'Module 4 mind map and exam focus', content: <Recap moduleName="Transactions, Recovery and Serializability" points={['Define transaction, database item, buffer, read_item and write_item.', 'Explain lost update, temporary update/dirty read, incorrect summary and unrepeatable read.', 'List failure types, transaction states, commit point and log records.', 'Explain ACID, atomicity/durability, consistency/isolation.', 'Differentiate recoverable, cascadeless and strict schedules.', 'Test conflict serializability using a precedence graph.', 'Explain SQL transaction support and isolation anomalies.']} /> },
]

export const dbmsModule5Slides = [
  { id: 'dbms-m5-title', kicker: 'VTU BCS403', hideTitle: true, layout: 'full', content: <ModuleTitle number="05" title="Concurrency Control and NoSQL" question="What happens when thousands of users and distributed data stores must stay useful at the same time?" source="Source: VTU_DBMS_Module_5_Concurrency_Control_NoSQL.pptx" /> },
  { id: 'dbms-m5-roadmap', kicker: 'Module journey', title: 'Module 5 learning path', content: <Roadmap items={['Purpose of concurrency control', 'Binary, shared and exclusive locks', '2PL variants, deadlock and starvation', 'Timestamp, multiversion and validation protocols', 'Granularity and intention locks', 'NoSQL, BASE, CAP and categories', 'MongoDB, key-value, consistent hashing, HBase']} /> },
  visualSlide({ id: 'm5-lock-purpose', kicker: 'Concurrency control', title: 'Locks control access before use', lead: 'A transaction should request permission before reading or writing a shared database item.', visual: <LockingBoard />, takeaway: 'Shared locks support reads; exclusive locks protect writes.' }),
  slide({ id: 'm5-binary-locks', kicker: 'Lock rules', title: 'Binary locks, read/write compatibility and conversion', subtitle: 'The PPT builds from simple locked/unlocked items toward read/write lock compatibility.', visual: <LockingBoard />, points: ['Binary locks allow locked or unlocked state.', 'Read/write locks distinguish shared and exclusive access.', 'Lock conversion upgrades or downgrades a held lock when rules allow.', 'Compatibility tables tell whether a request can be granted immediately.'], takeaway: 'The compatibility matrix is the fastest way to answer locking questions.' }),
  visualSlide({ id: 'm5-2pl', kicker: 'Two-phase locking', title: '2PL guarantees serializability', lead: 'Two-phase locking divides a transaction into a growing phase and a shrinking phase.', visual: <LockingBoard />, takeaway: 'Conservative 2PL obtains locks before starting; strict and rigorous 2PL hold locks longer to simplify correctness and recovery.' }),
  visualSlide({ id: 'm5-deadlock', kicker: 'Waiting problems', title: 'Deadlock and starvation', lead: 'Deadlock is a cycle of waiting. Starvation means a transaction waits too long because others keep winning.', visual: <DeadlockGraph />, takeaway: 'Prevention, detection, timeout and victim selection are different strategies.' }),
  slide({ id: 'm5-deadlock-strategies', kicker: 'Deadlock control', title: 'Wait-die, wound-wait, no waiting and cautious waiting', subtitle: 'The source PPT compares timestamp-based and waiting-policy approaches.', visual: <ProcessPath direction="vertical" steps={['wait-die', 'wound-wait', 'no waiting', 'cautious waiting', 'wait-for graph detection', 'victim selection']} />, points: ['Wait-die: older may wait; younger aborts.', 'Wound-wait: older preempts younger; younger waits.', 'No waiting aborts if lock is unavailable.', 'Cautious waiting avoids waiting behind a blocked transaction.'], takeaway: 'Mention starvation control when discussing repeated aborts.' }),
  slide({ id: 'm5-timestamp', kicker: 'Timestamp protocols', title: 'Timestamp ordering avoids locks', subtitle: 'Every transaction receives a timestamp, and the DBMS checks read_TS and write_TS values.', visual: <ProcessPath steps={['TS(T)', 'read_TS(X)', 'write_TS(X)', 'read rule', 'write rule', 'abort/restart or allow']} />, points: ['Older transactions should appear before younger transactions.', 'Basic timestamp ordering rejects operations that violate timestamp order.', 'Strict timestamp ordering delays some operations for recoverability.', 'Thomas write rule can ignore obsolete writes in limited cases.'], takeaway: 'Timestamp protocols trade waiting for possible abort and restart.' }),
  slide({ id: 'm5-mvcc-validation', kicker: 'Optimistic control', title: 'Multiversion and validation protocols', subtitle: 'Multiversion concurrency gives readers versions; validation checks optimistic transactions before commit.', visual: <ProcessPath direction="vertical" steps={['read phase', 'validation phase', 'write phase', 'MV timestamp ordering', 'MV 2PL with certify locks', 'validation conditions']} />, points: ['MVCC can let readers proceed without blocking writers.', 'Multiversion timestamp ordering chooses a suitable version for a read.', 'Validation control is useful when conflicts are rare.', 'Validation conditions protect serializability before writes become final.'], takeaway: 'Optimistic control assumes most transactions will not conflict.' }),
  slide({ id: 'm5-granularity', kicker: 'Lock scope', title: 'Granularity of data items and intention locks', subtitle: 'Fine granularity increases concurrency but costs more lock management; coarse granularity is simpler but blocks more work.', visual: <ProcessPath steps={['database', 'table', 'page', 'record', 'field', 'IS / IX / SIX intention locks']} />, points: ['Multiple granularity locking organizes items in a hierarchy.', 'Intention locks announce that lower-level locks exist below a node.', 'Fine vs coarse granularity is a concurrency-overhead trade-off.'], takeaway: 'Choose granularity based on workload size and conflict pattern.' }),
  visualSlide({ id: 'm5-nosql-emerged', kicker: 'Beyond relational', title: 'Why NoSQL emerged', lead: 'Large-scale web and distributed workloads pushed systems toward flexible schemas, horizontal scaling and availability trade-offs.', visual: <NoSqlWorld />, takeaway: 'NoSQL does not mean no data rules; it means different models and different trade-offs.' }),
  slide({ id: 'm5-base-cap', kicker: 'Distributed trade-offs', title: 'ACID vs BASE and CAP theorem', subtitle: 'The PPT frames distributed systems using availability, consistency and partition tolerance trade-offs.', visual: <ProcessPath direction="vertical" steps={['ACID', 'BASE', 'Consistency', 'Availability', 'Partition tolerance', 'CAP choices']} />, points: ['BASE emphasizes Basically Available, Soft state and Eventually consistent behavior.', 'CAP says a distributed system facing a partition must trade consistency and availability.', 'CAP choices explain different NoSQL design decisions.'], takeaway: 'Use CAP to explain behavior during network partition, not as a generic ranking.' }),
  slide({ id: 'm5-nosql-categories', kicker: 'NoSQL models', title: 'Document, key-value and wide-column systems', subtitle: 'NoSQL categories store and retrieve data through different access patterns.', visual: <NoSqlWorld />, points: ['Document-oriented databases keep related data in documents.', 'MongoDB uses collections, documents, BSON-like structure, indexes, replication and sharding ideas.', 'Key-value stores map a key directly to a value.', 'Consistent hashing spreads keys across nodes.', 'Wide-column systems such as HBase organize data with rows and column families.'], takeaway: 'Choose the model that matches query shape, scale and update pattern.' }),
  { id: 'm5-recap', kicker: 'Revision', title: 'Module 5 mind map and exam focus', content: <Recap moduleName="Concurrency Control and NoSQL" points={['Explain lock purpose, binary locks, shared/exclusive locks, compatibility and conversion.', 'Describe 2PL, conservative 2PL, strict 2PL and rigorous 2PL.', 'Explain deadlock, starvation, prevention, wait-die, wound-wait, detection, timeout and victim selection.', 'Work timestamp ordering, read_TS/write_TS, strict ordering and Thomas write rule.', 'Explain MVCC, validation protocol, validation conditions and granularity/intention locks.', 'Compare NoSQL characteristics, ACID vs BASE, CAP choices and NoSQL categories including MongoDB, key-value stores, consistent hashing, HBase and wide-column systems.']} /> },
]

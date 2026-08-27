import {
  Callout,
  CodeTeach,
  DataTable,
  ErrorCard,
  Flow,
  LabGrid,
  LabStage,
  Recap,
  Terminal,
  TitleHero,
  VivaList,
  slide,
  useDryRun,
} from '../LabKit'
import { HIVE } from '../data'

function Title() {
  return (
    <LabStage>
      <TitleHero
        number="7"
        title="Hive Database Operations"
        tech="Apache Hive"
        question="How does HiveQL turn an HDFS text file into a table you can SELECT?"
        chips={['CREATE DATABASE', 'CREATE TABLE', 'LOAD DATA', 'SELECT']}
      />
    </LabStage>
  )
}

function Problem() {
  return (
    <LabStage>
      <p className="lab-lead">Hive is not a second MySQL. It is a warehouse layer: you write HiveQL, the metastore remembers schema, and the bytes stay on HDFS.</p>
      <Flow items={['hive CLI', 'CREATE DATABASE', 'CREATE TABLE', 'LOAD from HDFS', 'SELECT']} />
    </LabStage>
  )
}

function StartHive() {
  const { step, bar } = useDryRun(3, { labels: ['Linux prompt', 'hive', 'hive> ready'] })
  return (
    <LabStage>
      <p className="lab-lead">The lab starts the old Hive CLI. Cloudera prints a deprecation warning — that is expected.</p>
      <Terminal
        hive={step >= 2}
        lines={
          step === 0
            ? [{ kind: 'cmd', text: '' }]
            : [
                { kind: 'cmd', prompt: '[cloudera@quickstart ~]$', text: 'hive' },
                { kind: 'out', text: 'Logging initialized using configuration in hive-common-1.1.0-cdh5.12.0.jar' },
                { kind: 'out', text: 'WARNING: Hive CLI is deprecated and migration to Beeline is recommended.' },
                step >= 2 ? { kind: 'cmd', prompt: 'hive>', text: '' } : null,
              ].filter(Boolean)
        }
      />
      {bar}
    </LabStage>
  )
}

function CreateDb() {
  const { step, bar } = useDryRun(3, { labels: ['Metastore', 'CREATE DATABASE', 'organization exists'] })
  return (
    <LabStage>
      <LabGrid>
        <Terminal
          hive
          lines={[
            { kind: 'cmd', prompt: 'hive>', text: 'create database organization;' },
            step >= 1 ? { kind: 'ok', text: 'OK' } : null,
            step >= 1 ? { kind: 'out', text: 'Time taken: 65.271 seconds' } : null,
          ].filter(Boolean)}
        />
        <div className="lab-db-tree">
          <div>Hive Metastore</div>
          <div>├── default</div>
          <div>{step >= 2 ? '└── ' : '└── '}<b>{step >= 2 ? 'organization' : '(no extra database yet)'}</b></div>
        </div>
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function ShowDb() {
  return (
    <LabStage>
      <p className="lab-lead">`show databases;` reads the metastore, not HDFS data files.</p>
      <Terminal
        hive
        lines={[
          { kind: 'cmd', prompt: 'hive>', text: 'show databases;' },
          { kind: 'ok', text: 'OK' },
          { kind: 'out', text: 'default' },
          { kind: 'out', text: 'organization' },
          { kind: 'out', text: 'Time taken: 1.615 seconds, Fetched: 2 row(s)' },
        ]}
      />
    </LabStage>
  )
}

function CreateTable() {
  return (
    <LabStage>
      <p className="lab-lead">The employee table matches `emp.txt`: id, name, salary. Hive stores that schema in the metastore and will later read comma-delimited files from HDFS.</p>
      <LabGrid>
        <CodeTeach
          caption="CREATE TABLE"
          lines={[
            'use organization;',
            'create table employee (',
            '  id int,',
            '  name string,',
            '  salary float',
            ')',
            'row format delimited',
            "fields terminated by ',';",
          ]}
          highlight={[1, 2, 3, 4, 7]}
          what="Declare a table over delimited text. The delimiter must match emp.txt."
          why="Without a schema, SELECT * cannot name columns. Without the delimiter, one line becomes one broken column."
          data="organization.employee → id INT, name STRING, salary FLOAT"
        />
        <div className="lab-db-tree">
          <div><b>organization</b></div>
          <div>└── employee</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;├── id : INT</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;├── name : STRING</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;└── salary : FLOAT</div>
        </div>
      </LabGrid>
    </LabStage>
  )
}

function LoadFlow() {
  const { step, bar } = useDryRun(3, { labels: ['HDFS emp.txt', 'LOAD DATA', 'Table mapped'] })
  return (
    <LabStage>
      <p className="lab-lead">`LOAD DATA INPATH` moves (or copies, depending on source) the HDFS file into the table’s warehouse location. Hive does not import rows into a proprietary engine.</p>
      <div className="lab-split">
        <div className="lab-pane">
          <h3>HDFS</h3>
          <p>`/user/root/emp.txt`</p>
          {HIVE.rows.map((r) => <p key={r.id}>{r.id},{r.name},{r.salary}</p>)}
        </div>
        <div className="lab-arrow">{step >= 1 ? 'LOAD' : '…'}</div>
        <div className="lab-pane">
          <h3>Hive</h3>
          <p>`organization.employee`</p>
          {step >= 2
            ? <DataTable columns={['id', 'name', 'salary']} rows={HIVE.rows.map((r) => [r.id, r.name, r.salary])} />
            : <p>Schema exists. Data not loaded.</p>}
        </div>
      </div>
      <Terminal
        hive
        lines={[
          { kind: 'cmd', prompt: 'hive>', text: "load data inpath '/user/root/emp.txt' overwrite into table employee;" },
          step >= 2 ? { kind: 'ok', text: 'OK — table now points at the HDFS file' } : null,
        ].filter(Boolean)}
      />
      {bar}
    </LabStage>
  )
}

function SelectScene() {
  const { step, bar } = useDryRun(2, { labels: ['Run SELECT', 'Result grid'] })
  return (
    <LabStage>
      <p className="lab-lead">SELECT uses table metadata to decode HDFS bytes. The 0.13 second fetch in the manual is Hive reading those four rows.</p>
      <Terminal
        hive
        lines={[
          { kind: 'cmd', prompt: 'hive>', text: 'select * from employee;' },
          { kind: 'ok', text: 'OK' },
          ...(step >= 1 ? HIVE.rows.map((r) => ({ kind: 'out', text: `${r.id}\t${r.name}\t${r.salary}` })) : []),
          step >= 1 ? { kind: 'out', text: 'Time taken: 0.13 seconds, Fetched: 4 row(s)' } : null,
        ].filter(Boolean)}
      />
      {bar}
    </LabStage>
  )
}

function Architecture() {
  return (
    <LabStage>
      <Flow items={['HiveQL', 'Hive compiler', 'Metastore schema', 'HDFS file', 'Result set']} />
      <Callout label="Do not treat Hive as MySQL">Tables are directories. LOAD is a filesystem operation plus metadata. Queries can become MapReduce jobs on larger data.</Callout>
    </LabStage>
  )
}

function Procedure() {
  return (
    <LabStage>
      <Terminal
        lines={[
          { kind: 'cmd', text: 'hdfs dfs -copyFromLocal emp.txt /user/root/emp.txt' },
          { kind: 'cmd', text: 'hdfs dfs -cat /user/root/emp.txt' },
          ...HIVE.rows.map((r) => ({ kind: 'out', text: `${r.id},${r.name},${r.salary}` })),
          { kind: 'cmd', text: 'hive' },
        ]}
      />
    </LabStage>
  )
}

function Errors() {
  return (
    <LabStage>
      <ErrorCard
        command="select * from employee;"
        error="One column of whole lines, or NULL salaries"
        cause="Table delimiter does not match the file (comma vs ^A default), or LOAD used a local path instead of an HDFS inpath."
        fix="Create the table with fields terminated by ',' and load from '/user/root/emp.txt'."
      />
    </LabStage>
  )
}

function Viva() {
  return (
    <LabStage>
      <VivaList
        items={[
          { q: 'Where does Hive store schema?', a: 'In the metastore. Data files remain on HDFS.' },
          { q: 'What does CREATE DATABASE do?', a: 'Registers a namespace (organization) in the metastore.' },
          { q: 'Why specify fields terminated by comma?', a: 'emp.txt is comma-delimited. Hive’s default delimiter is not comma.' },
          { q: 'What does LOAD DATA INPATH do?', a: 'Points the table at an HDFS file (overwrite replaces previous data).' },
          { q: 'Is Hive just MySQL?', a: 'No. It is SQL-on-Hadoop: queries are planned against HDFS using Hadoop execution.' },
          { q: 'What are the employee columns?', a: 'id INT, name STRING, salary FLOAT — matching 100,vijayalaxmi,1000.0.' },
        ]}
      />
    </LabStage>
  )
}

function RecapSlide() {
  return (
    <LabStage>
      <Recap
        flow={['hive', 'organization', 'employee schema', 'emp.txt LOAD', 'SELECT *']}
        skills={[
          'Start the Hive CLI',
          'Create a database and table',
          'Load an HDFS file',
          'Query four employee rows',
          'Explain Hive vs MySQL',
          'Name the delimiter pitfall',
        ]}
      />
    </LabStage>
  )
}

export const program7Slides = [
  slide({ id: 'p7-title', hideTitle: true, kicker: 'Lab · Program 7', content: <Title /> }),
  slide({ id: 'p7-problem', kicker: 'Lab · Program 7', title: 'What are we trying to solve?', content: <Problem /> }),
  slide({ id: 'p7-start', kicker: 'Lab · Program 7', title: 'Start the Hive CLI', content: <StartHive /> }),
  slide({ id: 'p7-db', kicker: 'Lab · Program 7', title: 'CREATE DATABASE', content: <CreateDb /> }),
  slide({ id: 'p7-show', kicker: 'Lab · Program 7', title: 'SHOW DATABASES', content: <ShowDb /> }),
  slide({ id: 'p7-tbl', kicker: 'Lab · Program 7', title: 'CREATE TABLE employee', content: <CreateTable /> }),
  slide({ id: 'p7-load', kicker: 'Lab · Program 7', title: 'LOAD DATA from HDFS', content: <LoadFlow /> }),
  slide({ id: 'p7-sel', kicker: 'Lab · Program 7', title: 'SELECT * FROM employee', content: <SelectScene /> }),
  slide({ id: 'p7-arch', kicker: 'Lab · Program 7', title: 'HiveQL sits on Hadoop', content: <Architecture /> }),
  slide({ id: 'p7-run', kicker: 'Lab · Program 7', title: 'Procedure', content: <Procedure /> }),
  slide({ id: 'p7-err', kicker: 'Lab · Program 7', title: 'Common lab errors', content: <Errors /> }),
  slide({ id: 'p7-viva', kicker: 'Lab · Program 7', title: 'Viva check', content: <Viva /> }),
  slide({ id: 'p7-recap', kicker: 'Lab · Program 7', title: 'Program recap', content: <RecapSlide /> }),
]

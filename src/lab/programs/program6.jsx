import {
  Callout,
  CodeTeach,
  DataTable,
  ErrorCard,
  Flow,
  LabStage,
  Recap,
  Terminal,
  TitleHero,
  VivaList,
  slide,
  useDryRun,
} from '../LabKit'
import { PIG, pigGrouped, pigHighScorers, pigProjected, pigSorted } from '../data'

const COLS = ['ID', 'Name', 'Dept', 'Marks']
const rowsOf = (list) => list.map((s) => [s.id, s.name, s.dept, s.marks])

function Title() {
  return (
    <LabStage>
      <TitleHero
        number="6"
        title="Pig Latin Data Operations"
        tech="Apache Pig"
        question="How does one student file become four HDFS relations without writing a Java job?"
        chips={['LOAD', 'FILTER', 'ORDER', 'FOREACH', 'GROUP', 'AVG', 'STORE']}
      />
    </LabStage>
  )
}

function Problem() {
  return (
    <LabStage>
      <p className="lab-lead">Write Pig Latin to sort, group, project and filter. Pig compiles each statement into MapReduce. You describe the relation; Hadoop executes it.</p>
      <Flow items={['students.txt', 'LOAD', 'FILTER / ORDER / FOREACH / GROUP', 'AVG', 'STORE']} />
    </LabStage>
  )
}

function TableSlide() {
  return (
    <LabStage>
      <p className="lab-lead">First see the file as a table. Pig will call this relation `students`.</p>
      <DataTable columns={COLS} rows={rowsOf(PIG.students)} />
    </LabStage>
  )
}

function LoadScene() {
  const { step, bar } = useDryRun(3, { labels: ['Text file', 'LOAD', 'Relation students'] })
  return (
    <LabStage>
      <CodeTeach
        caption="LOAD"
        lines={[
          "students = LOAD '/user/root/pigdata/students.txt'",
          "  USING PigStorage(',')",
          '  AS (id:int, name:chararray, dept:chararray, marks:int);',
        ]}
        highlight={[0, 1, 2]}
        what="Read comma-separated lines from HDFS and name the schema."
        why="Without AS, later FILTER and AVG cannot refer to marks as a field."
        data={step >= 2 ? '7 tuples now live in relation students' : 'Still a text file on HDFS'}
      />
      {step >= 2 && <DataTable columns={COLS} rows={rowsOf(PIG.students)} />}
      {bar}
    </LabStage>
  )
}

function FilterScene() {
  const { step, bar } = useDryRun(2, { labels: ['All students', 'marks > 80'] })
  const dim = step >= 1 ? PIG.students.map((s, i) => (s.marks > 80 ? -1 : i)).filter((i) => i >= 0) : []
  return (
    <LabStage>
      <p className="lab-lead">FILTER students BY marks &gt; 80 keeps John, Alice, David, john and George. Bob (76) and Eve (67) dim out.</p>
      <DataTable columns={COLS} rows={rowsOf(PIG.students)} dim={dim} />
      {step >= 1 && <Callout label="high_scorers">{pigHighScorers().map((s) => s.name).join(', ')}</Callout>}
      {bar}
    </LabStage>
  )
}

function OrderScene() {
  const { step, bar } = useDryRun(2, { labels: ['Original order', 'marks DESC'] })
  const data = step === 0 ? PIG.students : pigSorted()
  return (
    <LabStage>
      <p className="lab-lead">`ORDER students BY marks DESC` physically re-ranks the tuples. George (100) rises to the top.</p>
      <DataTable columns={COLS} rows={rowsOf(data)} highlight={step === 1 ? [0] : []} />
      {bar}
    </LabStage>
  )
}

function ProjectScene() {
  const { step, bar } = useDryRun(2, { labels: ['Four columns', 'Name and Marks only'] })
  return (
    <LabStage>
      <p className="lab-lead">`FOREACH students GENERATE name, marks` drops id and dept. The projected file in the manual is exactly this list.</p>
      {step === 0
        ? <DataTable columns={COLS} rows={rowsOf(PIG.students)} />
        : <DataTable columns={['Name', 'Marks']} rows={pigProjected().map((s) => [s.name, s.marks])} />}
      {bar}
    </LabStage>
  )
}

function GroupScene() {
  const { step, bar } = useDryRun(2, { labels: ['Flat relation', 'Buckets by dept'] })
  const groups = pigGrouped()
  return (
    <LabStage>
      <p className="lab-lead">`GROUP students BY dept` does not average yet. It only builds bags: CS, IT, EC, AIML.</p>
      {step === 0 ? (
        <DataTable columns={COLS} rows={rowsOf(PIG.students)} />
      ) : (
        <div className="lab-buckets">
          {groups.map((g) => (
            <div key={g.dept} className="lab-bucket">
              <h4>{g.dept}</h4>
              {g.rows.map((r) => <p key={r.id}>{r.name} · {r.marks}</p>)}
            </div>
          ))}
        </div>
      )}
      {bar}
    </LabStage>
  )
}

function AvgScene() {
  const groups = pigGrouped()
  const { step, bar } = useDryRun(groups.length, { labels: groups.map((g) => `AVG ${g.dept}`) })
  return (
    <LabStage>
      <p className="lab-lead">`FOREACH grouped GENERATE group AS department, AVG(students.marks)` walks each bag and writes one average.</p>
      <div className="lab-buckets">
        {groups.map((g, i) => (
          <div key={g.dept} className={`lab-bucket ${i === step ? 'is-hot' : ''}`} style={i === step ? { borderColor: '#0f766e' } : undefined}>
            <h4>{g.dept}</h4>
            <p>{g.rows.map((r) => r.marks).join(' + ')}</p>
            <p><strong>{i <= step ? g.avg.toFixed(2) : '…'}</strong></p>
          </div>
        ))}
      </div>
      {bar}
    </LabStage>
  )
}

function StoreScene() {
  return (
    <LabStage>
      <p className="lab-lead">Each STORE writes a directory under `/user/root/pigoutput/`. Inside `projected` the manual shows `part-m-00000`.</p>
      <Terminal
        lines={[
          { kind: 'cmd', text: 'hdfs dfs -ls /user/root/pigoutput/' },
          ...PIG.outputs.map((d) => ({ kind: 'out', text: `/user/root/pigoutput/${d}` })),
          { kind: 'cmd', text: 'hdfs dfs -cat /user/root/pigoutput/projected/part-m-00000' },
          ...pigProjected().map((s) => ({ kind: 'ok', text: `${s.name},${s.marks}` })),
        ]}
      />
    </LabStage>
  )
}

function Procedure() {
  return (
    <LabStage>
      <ol className="lab-points">
        <li>Save the script, for example `/home/cloudera/workspace/PigExample.pig`. Lines starting with `--` are comments.</li>
        <li>Copy `students.txt` to HDFS at `/user/root/pigdata/students.txt`.</li>
        <li>Run Pig in MapReduce mode from the script directory.</li>
      </ol>
      <Terminal
        lines={[
          { kind: 'cmd', prompt: '[cloudera@quickstart workspace]$', text: 'pig -x mapreduce PigExample.pig' },
          { kind: 'ok', text: 'Script stores four relations under /user/root/pigoutput/' },
        ]}
      />
      <Callout tone="amber" label="Manual typing">The printed command `PigRxample.pig` / `studets.txt` are typos. Use `PigExample.pig` and `students.txt`.</Callout>
    </LabStage>
  )
}

function Errors() {
  return (
    <LabStage>
      <ErrorCard
        command="pig -x mapreduce PigExample.pig"
        error="Input path does not exist: hdfs://.../user/root/pigdata/students.txt"
        cause="The LOAD path is wrong, the file was never copied to HDFS, or the name is misspelled (studets.txt)."
        fix="hdfs dfs -copyFromLocal students.txt /user/root/pigdata/ then confirm with hdfs dfs -cat."
      />
    </LabStage>
  )
}

function Viva() {
  return (
    <LabStage>
      <VivaList
        items={[
          { q: 'What does LOAD produce?', a: 'A relation — here students with a declared schema.' },
          { q: 'How does FILTER decide?', a: 'It keeps tuples where marks > 80 and drops the rest.' },
          { q: 'What is FOREACH GENERATE used for?', a: 'Projection: keep only the listed fields, here name and marks.' },
          { q: 'What does GROUP create?', a: 'A bag of tuples per department. AVG then runs inside each bag.' },
          { q: 'Where do results go?', a: 'STORE writes HDFS directories such as /user/root/pigoutput/projected.' },
          { q: 'Why -x mapreduce?', a: 'Pig executes the script as Hadoop MapReduce jobs, not local mode.' },
        ]}
      />
    </LabStage>
  )
}

function RecapSlide() {
  return (
    <LabStage>
      <Recap
        flow={['LOAD students', 'FILTER > 80', 'ORDER DESC', 'FOREACH name,marks', 'GROUP dept', 'AVG', 'STORE']}
        skills={[
          'Read the student schema',
          'Filter and order by marks',
          'Project columns',
          'Group and average',
          'Find part files in pigoutput',
          'Run pig -x mapreduce',
        ]}
      />
    </LabStage>
  )
}

export const program6Slides = [
  slide({ id: 'p6-title', hideTitle: true, kicker: 'Lab · Program 6', content: <Title /> }),
  slide({ id: 'p6-problem', kicker: 'Lab · Program 6', title: 'What are we trying to solve?', content: <Problem /> }),
  slide({ id: 'p6-table', kicker: 'Lab · Program 6', title: 'Input as a table', content: <TableSlide /> }),
  slide({ id: 'p6-load', kicker: 'Lab · Program 6', title: 'LOAD', content: <LoadScene /> }),
  slide({ id: 'p6-filter', kicker: 'Lab · Program 6', title: 'FILTER', content: <FilterScene /> }),
  slide({ id: 'p6-order', kicker: 'Lab · Program 6', title: 'ORDER', content: <OrderScene /> }),
  slide({ id: 'p6-proj', kicker: 'Lab · Program 6', title: 'FOREACH / projection', content: <ProjectScene /> }),
  slide({ id: 'p6-group', kicker: 'Lab · Program 6', title: 'GROUP', content: <GroupScene /> }),
  slide({ id: 'p6-avg', kicker: 'Lab · Program 6', title: 'AVG', content: <AvgScene /> }),
  slide({ id: 'p6-store', kicker: 'Lab · Program 6', title: 'STORE', content: <StoreScene /> }),
  slide({ id: 'p6-run', kicker: 'Lab · Program 6', title: 'Procedure', content: <Procedure /> }),
  slide({ id: 'p6-err', kicker: 'Lab · Program 6', title: 'Common lab errors', content: <Errors /> }),
  slide({ id: 'p6-viva', kicker: 'Lab · Program 6', title: 'Viva check', content: <Viva /> }),
  slide({ id: 'p6-recap', kicker: 'Lab · Program 6', title: 'Program recap', content: <RecapSlide /> }),
]

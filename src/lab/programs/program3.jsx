import {
  Callout,
  CodeTeach,
  ErrorCard,
  Flow,
  KV,
  LabGrid,
  LabStage,
  MapperNode,
  Recap,
  ReducerNode,
  Terminal,
  TitleHero,
  VivaList,
  slide,
  useDryRun,
} from '../LabKit'
import { WEATHER } from '../data'

const mapperLines = [
  'String line = Value.toString();',
  'if (line.length() == 0) return;',
  'String date = line.substring(6, 14);',
  'float temp_Max = Float.parseFloat(line.substring(39, 45).trim());',
  'float temp_Min = Float.parseFloat(line.substring(47, 53).trim());',
  'if (temp_Max > 35.0)',
  '  context.write(new Text("Hot Day " + date), new Text("" + temp_Max));',
  'if (temp_Min < 10)',
  '  context.write(new Text("Cold Day " + date), new Text("" + temp_Min));',
]

function RecordStrip({ text, ranges = [] }) {
  const marks = text.split('').map((ch, i) => {
    const hit = ranges.find((r) => i >= r.a && i < r.b)
    return hit ? <mark key={i} title={hit.label}>{ch === ' ' ? '·' : ch}</mark> : <span key={i}>{ch}</span>
  })
  return <div className="lab-record">{marks}</div>
}

function Title() {
  return (
    <LabStage>
      <TitleHero
        number="3"
        title="Weather Data Analysis using MapReduce"
        tech="Hadoop MapReduce"
        question="How does a mapper turn one long weather line into Hot Day or Cold Day?"
        chips={['substring', 'temp_Max > 35', 'temp_Min < 10']}
      />
    </LabStage>
  )
}

function Problem() {
  return (
    <LabStage>
      <p className="lab-lead">Mine weather records and display a message for the condition of the day. The mapper is a parser plus two decision gates. The reducer simply writes the first temperature it sees for that key.</p>
      <Flow items={['Weather line', 'Extract date / max / min', 'Compare thresholds', 'Emit Hot or Cold', 'Reducer writes the pair']} />
    </LabStage>
  )
}

function InputData() {
  return (
    <LabStage>
      <p className="lab-lead">The manual’s `data.txt` is a space-separated weather extract. Copy it to HDFS before the job. Dates sit in the second field (`20150101` …).</p>
      <Terminal
        lines={[
          { kind: 'cmd', text: 'hdfs dfs -cat /user/root/weather/data.txt' },
          ...WEATHER.records.map((t) => ({ kind: 'out', text: t })),
        ]}
      />
      <Callout tone="amber" label="Parser contract">The Java mapper does not split on spaces. It slices fixed character ranges: date [6,14), max [39,45), min [47,53).</Callout>
    </LabStage>
  )
}

function Anatomy() {
  const { step, bar } = useDryRun(4, { labels: ['Whole record', 'DATE 6→14', 'MAX 39→45', 'MIN 47→53'] })
  const chars = Array.from({ length: 56 }, () => 'X')
  '20150815'.split('').forEach((ch, i) => { chars[6 + i] = ch })
  '  38.0'.split('').forEach((ch, i) => { chars[39 + i] = ch })
  '  22.0'.split('').forEach((ch, i) => { chars[47 + i] = ch })
  const sample = chars.join('')
  const ranges = [
    [],
    [{ a: 6, b: 14, label: 'date' }],
    [{ a: 6, b: 14, label: 'date' }, { a: 39, b: 45, label: 'max' }],
    [{ a: 6, b: 14, label: 'date' }, { a: 39, b: 45, label: 'max' }, { a: 47, b: 53, label: 'min' }],
  ][step]
  return (
    <LabStage>
      <p className="lab-lead">Watch the character window move. Positions are 0-based, and the end index is exclusive — the same rule as `String.substring`.</p>
      <RecordStrip text={sample} ranges={ranges} />
      <LabGrid cols={3}>
        <KV k="date" v={step >= 1 ? '20150815' : '…'} tone="teal" ghost={step < 1} />
        <KV k="temp_Max" v={step >= 2 ? '38.0' : '…'} tone="amber" ghost={step < 2} />
        <KV k="temp_Min" v={step >= 3 ? '22.0' : '…'} tone="blue" ghost={step < 3} />
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function MapperCode() {
  return (
    <LabStage>
      <CodeTeach
        caption="MaxTemperatureMapper"
        lines={mapperLines}
        highlight={[2, 3, 4]}
        what="Read the line, skip blanks, then pull date, maximum temperature and minimum temperature from fixed columns."
        why="NCDC-style weather files are column-aligned. Splitting on commas would break the format."
        data="date = line.substring(6,14)   temp_Max = substring(39,45)   temp_Min = substring(47,53)"
      />
    </LabStage>
  )
}

function HotGate() {
  const { step, bar } = useDryRun(3, { labels: ['MAX = 38', '38 > 35 ?', 'Emit Hot Day'] })
  return (
    <LabStage>
      <p className="lab-lead">First decision gate. Only the maximum temperature is tested here.</p>
      <LabGrid cols={3}>
        <MapperNode hot={step === 0} label="temp_Max">
          <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>38°C</p>
        </MapperNode>
        <div className="lab-pane">
          <h3>Gate</h3>
          <p>`temp_Max &gt; 35.0`</p>
          <p>{step >= 1 ? '38 > 35 → YES' : 'waiting'}</p>
        </div>
        <MapperNode hot={step >= 2} label="context.write">
          {step >= 2 ? <KV k="Hot Day 20150815" v="38.0" tone="rose" /> : <p>No emit yet</p>}
        </MapperNode>
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function ColdGate() {
  const { step, bar } = useDryRun(3, { labels: ['MIN = 7', '7 < 10 ?', 'Emit Cold Day'] })
  return (
    <LabStage>
      <p className="lab-lead">Second decision gate. A single day can theoretically emit both Hot and Cold if the two tests independently pass — they are separate `if`s, not `else if`.</p>
      <LabGrid cols={3}>
        <MapperNode hot={step === 0} label="temp_Min">
          <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>7°C</p>
        </MapperNode>
        <div className="lab-pane">
          <h3>Gate</h3>
          <p>`temp_Min &lt; 10`</p>
          <p>{step >= 1 ? '7 < 10 → YES' : 'waiting'}</p>
        </div>
        <MapperNode hot={step >= 2} label="context.write">
          {step >= 2 ? <KV k="Cold Day 20150112" v="7.0" tone="blue" /> : <p>No emit yet</p>}
        </MapperNode>
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function SampleDry() {
  const parsed = WEATHER.records.map((line) => {
    const date = line.substring(6, 14)
    return { line, date }
  })
  const { step, bar } = useDryRun(parsed.length, { labels: parsed.map((p) => p.date) })
  const row = parsed[step]
  return (
    <LabStage>
      <p className="lab-lead">On the actual `data.txt`, every date is in January 2015 and the printed temperatures are well below 10°C — so the Cold Day gate is the one that fires if those columns parse as min temps.</p>
      <div className="lab-record">{row.line}</div>
      <KV k="date slice" v={row.date} tone="teal" />
      <Callout label="Teaching point">Always check which columns your substring windows land on. The code is a column parser, not a CSV parser.</Callout>
      {bar}
    </LabStage>
  )
}

function ReducerRole() {
  return (
    <LabStage>
      <CodeTeach
        caption="MaxTemperatureReducer"
        lines={[
          'public void reduce(Text Key, Iterator<Text> Values, Context context) {',
          '  String temperature = Values.next().toString();',
          '  context.write(Key, new Text(temperature));',
          '}',
        ]}
        highlight={[1, 2]}
        what="Take the first temperature in the iterator and write it out beside the mapper’s key."
        why="The mapper already decided Hot Day / Cold Day. The reducer is a pass-through that materialises the pair into the output file."
        data={'Key = "Hot Day 20150815"   Value = "38.0"'}
      />
    </LabStage>
  )
}

function Pipeline() {
  return (
    <LabStage>
      <p className="lab-lead">End-to-end: a weather record never becomes a SQL row. It becomes a key/value pair that Hadoop can shuffle.</p>
      <Flow items={['Weather record', 'Mapper parse', 'Condition gate', 'key / value', 'Reducer', 'Result file']} />
      <LabGrid>
        <MapperNode label="Mapper">
          <p>substring → date, max, min</p>
          <p>two independent if-tests</p>
        </MapperNode>
        <ReducerNode label="Reducer">
          <p>Values.next()</p>
          <p>write(Key, temperature)</p>
        </ReducerNode>
      </LabGrid>
    </LabStage>
  )
}

function Procedure() {
  return (
    <LabStage>
      <Terminal
        lines={[
          { kind: 'cmd', text: 'hdfs dfs -copyFromLocal data.txt /user/root/weather/' },
          { kind: 'cmd', text: 'hadoop jar MyMaxMin.jar MyMaxMin /user/root/weather /user/root/weather-out' },
          { kind: 'cmd', text: 'hdfs dfs -cat /user/root/weather-out/part-r-00000' },
        ]}
      />
      <Callout label="Driver">The job class in the manual is `MyMaxMin`. Input path is `args[0]`, output path is `args[1]`.</Callout>
    </LabStage>
  )
}

function Errors() {
  return (
    <LabStage>
      <ErrorCard
        command="hadoop jar MyMaxMin.jar MyMaxMin weather weather-out"
        error={'NumberFormatException: For input string: ""'}
        cause="substring landed on spaces or the record is shorter than 53 characters, so parseFloat received an empty string."
        fix="Confirm the file is the fixed-width (or padded) format the mapper expects. Trim only after slicing the intended columns."
      />
    </LabStage>
  )
}

function Viva() {
  return (
    <LabStage>
      <VivaList
        items={[
          { q: 'Which character range is the date?', a: 'substring(6, 14) — eight characters, typically YYYYMMDD.' },
          { q: 'How is a Hot Day decided?', a: 'If parsed temp_Max is strictly greater than 35.0, emit key "Hot Day " + date.' },
          { q: 'How is a Cold Day decided?', a: 'If parsed temp_Min is less than 10, emit key "Cold Day " + date.' },
          { q: 'Are the two tests exclusive?', a: 'No. They are separate if statements, so both can fire for one line.' },
          { q: 'What does the reducer add?', a: 'Almost nothing: it writes the first value for the key. Classification already happened in the mapper.' },
          { q: 'Why Text, Text as the mapper output types?', a: 'The key is a labelled string such as "Hot Day 20150815" and the value is the temperature as text.' },
        ]}
      />
    </LabStage>
  )
}

function RecapSlide() {
  return (
    <LabStage>
      <Recap
        flow={['data.txt', 'substring windows', '35° / 10° gates', 'Hot Day / Cold Day', 'Reducer write']}
        skills={[
          'Explain the input record',
          'Point to date / max / min columns',
          'Dry-run the Hot Day gate',
          'Dry-run the Cold Day gate',
          'State the reducer role',
          'Run the job with input and output paths',
        ]}
      />
    </LabStage>
  )
}

export const program3Slides = [
  slide({ id: 'p3-title', hideTitle: true, kicker: 'Lab · Program 3', content: <Title /> }),
  slide({ id: 'p3-problem', kicker: 'Lab · Program 3', title: 'What are we trying to solve?', content: <Problem /> }),
  slide({ id: 'p3-input', kicker: 'Lab · Program 3', title: 'Input data', content: <InputData /> }),
  slide({ id: 'p3-anatomy', kicker: 'Lab · Program 3', title: 'Input anatomy — character windows', content: <Anatomy /> }),
  slide({ id: 'p3-code', kicker: 'Lab · Program 3', title: 'Mapper code — extract fields', content: <MapperCode /> }),
  slide({ id: 'p3-hot', kicker: 'Lab · Program 3', title: 'Decision gate — Hot Day', content: <HotGate /> }),
  slide({ id: 'p3-cold', kicker: 'Lab · Program 3', title: 'Decision gate — Cold Day', content: <ColdGate /> }),
  slide({ id: 'p3-sample', kicker: 'Lab · Program 3', title: 'Dry run against data.txt', content: <SampleDry /> }),
  slide({ id: 'p3-red', kicker: 'Lab · Program 3', title: 'Reducer explanation', content: <ReducerRole /> }),
  slide({ id: 'p3-pipe', kicker: 'Lab · Program 3', title: 'Full execution flow', content: <Pipeline /> }),
  slide({ id: 'p3-run', kicker: 'Lab · Program 3', title: 'Commands and procedure', content: <Procedure /> }),
  slide({ id: 'p3-err', kicker: 'Lab · Program 3', title: 'Common lab errors', content: <Errors /> }),
  slide({ id: 'p3-viva', kicker: 'Lab · Program 3', title: 'Viva check', content: <Viva /> }),
  slide({ id: 'p3-recap', kicker: 'Lab · Program 3', title: 'Program recap', content: <RecapSlide /> }),
]

import {
  Callout,
  CodeTeach,
  ErrorCard,
  KV,
  LabGrid,
  LabStage,
  MapperNode,
  Recap,
  Terminal,
  TitleHero,
  VivaList,
  slide,
  useDryRun,
} from '../LabKit'
import { SPARK } from '../data'

const words = SPARK.lines.flatMap((line) => line.split(' '))

function Title() {
  return (
    <LabStage>
      <TitleHero
        number="8"
        title="Word Count using Spark"
        tech="Apache Spark • PySpark"
        question="How does one text file become a list of (word, count) pairs?"
        chips={['textFile', 'flatMap', 'map', 'reduceByKey', 'collect']}
      />
    </LabStage>
  )
}

function Problem() {
  return (
    <LabStage>
      <p className="lab-lead">The manual runs this in Colab. Upload `word.txt`, fix the path, then follow five RDD operations. The first four are transformations; `collect` is an action.</p>
      <div className="lab-highway">
        <span>TEXT FILE</span>
        <span className="op">textFile</span>
        <span>LINES</span>
        <span className="op">flatMap</span>
        <span>WORDS</span>
        <span className="op">map</span>
        <span>(word,1)</span>
        <span className="op">reduceByKey</span>
        <span>(word,count)</span>
        <span className="act">collect</span>
        <span>RESULT</span>
      </div>
    </LabStage>
  )
}

function Input() {
  return (
    <LabStage>
      <p className="lab-lead">Three sentences. Spark will treat each as one RDD element after `textFile`.</p>
      <Terminal
        lines={[
          { kind: 'out', text: '[' },
          ...SPARK.lines.map((l) => ({ kind: 'out', text: ` '${l}',` })),
          { kind: 'out', text: ']' },
        ]}
      />
    </LabStage>
  )
}

function Session() {
  return (
    <LabStage>
      <CodeTeach
        caption="SparkSession + SparkContext"
        lines={[
          'from pyspark.sql import SparkSession',
          'spark = SparkSession.builder.master("local").appName("word_count").getOrCreate()',
          'from pyspark import SparkContext',
          'sc = SparkContext.getOrCreate()',
          'text_file = sc.textFile("/content/sample_data/word.txt")',
          'text_file.collect()',
        ]}
        highlight={[4]}
        what="Create a local Spark context, then read the file as an RDD of lines."
        why="textFile is a transformation-like read: it describes partitions of the file. collect() on the next line is an action that pulls those lines to the driver for inspection."
        data={SPARK.lines.map((l) => `'${l}'`).join('  |  ')}
      />
    </LabStage>
  )
}

function TextFile() {
  const { step, bar } = useDryRun(2, { labels: ['File', 'RDD of 3 lines'] })
  return (
    <LabStage>
      <p className="lab-lead">Step 1 — `textFile()`. Each line is one element. No words yet.</p>
      <LabGrid>
        <div className="lab-pane">
          <h3>word.txt</h3>
          {SPARK.lines.map((l) => <p key={l}>{l}</p>)}
        </div>
        <div className="lab-pane">
          <h3>RDD partitions</h3>
          {step >= 1
            ? SPARK.lines.map((l, i) => <KV key={l} k={`line ${i}`} v={l} />)
            : <p>Not read yet</p>}
        </div>
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function FlatMap() {
  const { step, bar } = useDryRun(SPARK.lines.length, { labels: SPARK.lines })
  const done = SPARK.lines.slice(0, step + 1).flatMap((l) => l.split(' '))
  return (
    <LabStage>
      <p className="lab-lead">Step 2 — `flatMap(lambda line: line.split(" "))`. One sentence becomes many tokens. Nested lists are flattened.</p>
      <LabGrid>
        <MapperNode label="Input line">{SPARK.lines[step]}</MapperNode>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignContent: 'start' }}>
          {done.map((w, i) => <KV key={w + i} k="word" v={w} tone="rose" />)}
        </div>
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function MapPairs() {
  const { step, bar } = useDryRun(Math.min(8, words.length), { labels: words.slice(0, 8) })
  const w = words[step]
  return (
    <LabStage>
      <p className="lab-lead">Step 3 — `map(lambda word: (word, 1))`. Counting has not started. Every token independently becomes a pair.</p>
      <LabGrid>
        <div className="lab-pane">
          <h3>Word</h3>
          <p style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>{w}</p>
        </div>
        <div className="lab-pane">
          <h3>Pair</h3>
          <KV k={w} v="1" tone="rose" />
        </div>
        <CodeTeach
          lines={['.map(lambda word: (word, 1))']}
          highlight={[0]}
          what="Attach the integer 1 to this token."
          data={`"${w}"  →  ("${w}", 1)`}
        />
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function Reduce() {
  const { step, bar } = useDryRun(3, { labels: ['Scatter pairs', 'Group is / Vijayalaxmi', 'Sum'] })
  return (
    <LabStage>
      <p className="lab-lead">Step 4 — `reduceByKey(lambda x, y: x + y)`. Identical words travel into the same group, then the 1s add.</p>
      <LabGrid cols={3}>
        <div className="lab-pane">
          <h3>Pairs</h3>
          <KV k="is" v="1" tone="blue" />
          <KV k="is" v="1" tone="blue" />
          <KV k="Vijayalaxmi" v="1" />
          <KV k="Vijayalaxmi" v="1" />
        </div>
        <div className="lab-pane">
          <h3>Groups</h3>
          {step >= 1 && (
            <>
              <p>(is,1) + (is,1)</p>
              <p>(Vijayalaxmi,1) + (Vijayalaxmi,1)</p>
            </>
          )}
        </div>
        <div className="lab-pane">
          <h3>Reduced</h3>
          {step >= 2 && (
            <>
              <KV k="is" v="2" tone="rose" />
              <KV k="Vijayalaxmi" v="2" tone="rose" />
            </>
          )}
        </div>
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function Collect() {
  const { step, bar } = useDryRun(2, { labels: ['Still on cluster', 'Driver list'] })
  return (
    <LabStage>
      <p className="lab-lead">Step 5 — `collect()` is an action. Transformations above were lazy. collect pulls the final pairs to the notebook.</p>
      {step >= 1 ? (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SPARK.counts.map(([w, n]) => <KV key={w} k={w} v={String(n)} tone="rose" />)}
        </div>
      ) : (
        <Callout label="Lazy until here">flatMap, map and reduceByKey have not necessarily run. collect triggers the pipeline.</Callout>
      )}
      {bar}
    </LabStage>
  )
}

function CodeFull() {
  return (
    <LabStage>
      <CodeTeach
        caption="The transformation chain"
        lines={[
          'counts = text_file.flatMap(lambda line: line.split(" ")) \\',
          '    .map(lambda word: (word, 1)) \\',
          '    .reduceByKey(lambda x, y: x + y)',
          'output = counts.collect()',
          'output',
        ]}
        highlight={[0, 1, 2, 3]}
        what="Split lines, pair each word with 1, add by key, then bring results back."
        why="This is the canonical Spark word-count. Transformations stay distributed; collect is the only action in the chain."
        data="('is', 2), ('Vijayalaxmi', 2), remaining words 1"
      />
    </LabStage>
  )
}

function Output() {
  return (
    <LabStage>
      <Terminal
        lines={[
          { kind: 'out', text: strList() },
        ]}
      />
      <Callout label="Note the counts">`is` and `Vijayalaxmi` appear twice in the three lines; every other token is unique.</Callout>
    </LabStage>
  )
}

function strList() {
  const inner = SPARK.counts.map(([w, n]) => `('${w}', ${n})`).join(', ')
  return `[${inner}]`
}

function Procedure() {
  return (
    <LabStage>
      <ol className="lab-points">
        <li>Open Google Colab and paste the PySpark program.</li>
        <li>Upload `word.txt` (the manual uses Drive / `/content/sample_data/word.txt`).</li>
        <li>Change `sc.textFile(...)` to the actual uploaded path.</li>
        <li>Run the cell and inspect `output`.</li>
      </ol>
      <Callout tone="amber" label="Path">The most common lab failure is leaving the sample path when the file lives somewhere else in Drive.</Callout>
    </LabStage>
  )
}

function Errors() {
  return (
    <LabStage>
      <ErrorCard
        command={'text_file = sc.textFile("/content/sample_data/word.txt")'}
        error="org.apache.hadoop.mapred.InvalidInputException: Input path does not exist"
        cause="Colab cannot see that path. The file was not uploaded, or Drive was not mounted, or the name differs."
        fix="Upload word.txt, copy its real path from Colab, and paste that string into textFile()."
      />
    </LabStage>
  )
}

function Viva() {
  return (
    <LabStage>
      <VivaList
        items={[
          { q: 'What does textFile return?', a: 'An RDD of lines, one element per line of word.txt.' },
          { q: 'Why flatMap not map for splitting?', a: 'map would give an RDD of lists. flatMap flattens them into an RDD of words.' },
          { q: 'What does map produce here?', a: 'Pairs (word, 1) — not yet counts.' },
          { q: 'What does reduceByKey do?', a: 'Adds the integers for each distinct word across partitions.' },
          { q: 'Why is collect an action?', a: 'It triggers execution and brings the result to the driver as a Python list.' },
          { q: 'Which words have count 2?', a: 'is and Vijayalaxmi.' },
        ]}
      />
    </LabStage>
  )
}

function RecapSlide() {
  return (
    <LabStage>
      <Recap
        flow={['word.txt', 'LINES', 'WORDS', '(word,1)', '(word,count)', 'collect']}
        skills={[
          'Read three input lines',
          'Explain flatMap vs map',
          'Dry-run a (word,1) pair',
          'Show is → 2',
          'Name the action',
          'Fix a Colab path error',
        ]}
      />
    </LabStage>
  )
}

export const program8Slides = [
  slide({ id: 'p8-title', hideTitle: true, kicker: 'Lab · Program 8', content: <Title /> }),
  slide({ id: 'p8-problem', kicker: 'Lab · Program 8', title: 'The transformation highway', content: <Problem /> }),
  slide({ id: 'p8-in', kicker: 'Lab · Program 8', title: 'Input file', content: <Input /> }),
  slide({ id: 'p8-sess', kicker: 'Lab · Program 8', title: 'Session, context and textFile', content: <Session /> }),
  slide({ id: 'p8-tf', kicker: 'Lab · Program 8', title: 'Step 1 — textFile()', content: <TextFile /> }),
  slide({ id: 'p8-fm', kicker: 'Lab · Program 8', title: 'Step 2 — flatMap()', content: <FlatMap /> }),
  slide({ id: 'p8-map', kicker: 'Lab · Program 8', title: 'Step 3 — map()', content: <MapPairs /> }),
  slide({ id: 'p8-red', kicker: 'Lab · Program 8', title: 'Step 4 — reduceByKey()', content: <Reduce /> }),
  slide({ id: 'p8-col', kicker: 'Lab · Program 8', title: 'Step 5 — collect()', content: <Collect /> }),
  slide({ id: 'p8-code', kicker: 'Lab · Program 8', title: 'Code walkthrough — the chain', content: <CodeFull /> }),
  slide({ id: 'p8-out', kicker: 'Lab · Program 8', title: 'Final output', content: <Output /> }),
  slide({ id: 'p8-run', kicker: 'Lab · Program 8', title: 'Colab procedure', content: <Procedure /> }),
  slide({ id: 'p8-err', kicker: 'Lab · Program 8', title: 'Common lab errors', content: <Errors /> }),
  slide({ id: 'p8-viva', kicker: 'Lab · Program 8', title: 'Viva check', content: <Viva /> }),
  slide({ id: 'p8-recap', kicker: 'Lab · Program 8', title: 'Program recap', content: <RecapSlide /> }),
]

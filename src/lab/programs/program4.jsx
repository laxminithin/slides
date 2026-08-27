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
  ShuffleLane,
  Terminal,
  TitleHero,
  VivaList,
  slide,
  useDryRun,
} from '../LabKit'
import { MOVIES } from '../data'

function Title() {
  return (
    <LabStage>
      <TitleHero
        number="4"
        title="MovieLens Movie Tags using MapReduce"
        tech="MapReduce • MultipleInputs"
        question="How do two different files meet on movieId and become Movie → [tags]?"
        chips={['MovieMapper', 'TagMapper', 'JoinReducer']}
      />
    </LabStage>
  )
}

function Problem() {
  return (
    <LabStage>
      <p className="lab-lead">Find the tags associated with each movie. Movie titles live in one file, tags in another. The join key is `movieId`.</p>
      <Flow items={['Movie.txt', 'Tags.txt', 'Two mappers', 'movieId', 'Shuffle', 'Reducer join', 'Title → tags']} />
      <Callout label="This is a reduce-side join">Each mapper tags its values with a prefix (`MOVIE::` or `TAG::`). The reducer separates titles from tags after grouping.</Callout>
    </LabStage>
  )
}

function Inputs() {
  return (
    <LabStage>
      <LabGrid>
        <Terminal
          lines={[
            { kind: 'cmd', text: 'hdfs dfs -cat /user/root/movie/Movie.txt' },
            { kind: 'out', text: 'movieId,title,genres' },
            ...MOVIES.movies.map((m) => ({ kind: 'out', text: `${m.id},${m.title},${m.genres}` })),
          ]}
        />
        <Terminal
          lines={[
            { kind: 'cmd', text: 'hdfs dfs -cat /user/root/tag/Tags.txt' },
            { kind: 'out', text: 'userId,movieId,tag,timestamp' },
            ...MOVIES.tags.map((t) => ({ kind: 'out', text: `${t.user},${t.movieId},${t.tag},${t.ts}` })),
          ]}
        />
      </LabGrid>
    </LabStage>
  )
}

function Anatomy() {
  return (
    <LabStage>
      <p className="lab-lead">The files do not share a schema. They share one column. That column becomes the MapReduce key.</p>
      <LabGrid cols={3}>
        {MOVIES.movies.map((m) => (
          <div key={m.id} className="lab-pane">
            <h3>movieId {m.id}</h3>
            <p>{m.title}</p>
            <p>{MOVIES.tags.filter((t) => t.movieId === m.id).map((t) => t.tag).join(', ') || '—'}</p>
          </div>
        ))}
      </LabGrid>
    </LabStage>
  )
}

function DualMap() {
  const { step, bar } = useDryRun(4, {
    labels: ['Toy Story movie', 'funny tag', 'pixar tag', 'Grouped on 1'],
  })
  return (
    <LabStage>
      <p className="lab-lead">Two mappers run in the same job because `MultipleInputs` binds each path to a class.</p>
      <LabGrid>
        <MapperNode hot={step === 0} label="MovieMapper">
          <p>`1,Toy Story (1995),...`</p>
          {step >= 0 && <KV k="1" v="MOVIE::Toy Story (1995)" tone="violet" />}
        </MapperNode>
        <MapperNode hot={step === 1 || step === 2} label="TagMapper">
          <p>`15,1,funny,...` then `20,1,pixar,...`</p>
          {step >= 1 && <KV k="1" v="TAG::funny" tone="amber" />}
          {step >= 2 && <KV k="1" v="TAG::pixar" tone="amber" />}
        </MapperNode>
      </LabGrid>
      {step >= 3 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <strong>KEY = 1 →</strong>
          <KV k="1" v="MOVIE::Toy Story (1995)" tone="violet" />
          <KV k="1" v="TAG::funny" tone="amber" />
          <KV k="1" v="TAG::pixar" tone="amber" />
        </div>
      )}
      {bar}
    </LabStage>
  )
}

function MovieCode() {
  return (
    <LabStage>
      <CodeTeach
        caption="MovieMapper"
        lines={[
          'if (key.get() == 0 && line.contains("movieId")) return;',
          'String[] fields = line.split(",", 3);',
          'String movieId = fields[0].trim();',
          'String title = fields[1].trim();',
          'context.write(new Text(movieId), new Text("MOVIE::" + title));',
        ]}
        highlight={[1, 2, 3, 4]}
        what="Skip the header, split into at most three fields so titles may contain commas, emit movieId → MOVIE::title."
        why="The prefix tells the reducer this value is a title, not a tag."
        data="1 → MOVIE::Toy Story (1995)"
      />
    </LabStage>
  )
}

function TagCode() {
  return (
    <LabStage>
      <CodeTeach
        caption="TagMapper"
        lines={[
          'if (key.get() == 0 && line.contains("userId")) return;',
          'String[] fields = line.split(",", 4);',
          'String movieId = fields[1].trim();',
          'String tag = fields[2].trim();',
          'context.write(new Text(movieId), new Text("TAG::" + tag));',
        ]}
        highlight={[2, 3, 4]}
        what="userId is thrown away. movieId (field 1) is the key. The tag is prefixed with TAG::."
        why="Both mappers must emit the same key type so shuffle can colocate a movie with its tags."
        data="15,1,funny,...  →  1 → TAG::funny"
      />
    </LabStage>
  )
}

function ShuffleJoin() {
  const { step, bar } = useDryRun(3, { labels: ['Key 1', 'Key 2', 'Key 3'] })
  const groups = [
    { key: '1', title: 'Toy Story (1995)', tags: ['funny', 'pixar'] },
    { key: '2', title: 'Jumanji (1995)', tags: ['childish'] },
    { key: '3', title: 'Grumpier Old Men (1995)', tags: ['oldie'] },
  ]
  const g = groups[step]
  return (
    <LabStage>
      <p className="lab-lead">Shuffle delivers every value that shares a movieId to one reducer call.</p>
      <ShuffleLane keys={['1', '2', '3']} active={g.key} />
      <ReducerNode hot label={`Reducer key = ${g.key}`}>
        <KV k={g.key} v={`MOVIE::${g.title}`} tone="violet" />
        {g.tags.map((t) => <KV key={t} k={g.key} v={`TAG::${t}`} tone="amber" />)}
      </ReducerNode>
      {bar}
    </LabStage>
  )
}

function ReducerCode() {
  return (
    <LabStage>
      <CodeTeach
        caption="JoinReducer"
        lines={[
          'String movieTitle = null;',
          'List<String> tags = new ArrayList<>();',
          'for (Text val : values) {',
          '  String value = val.toString();',
          '  if (value.startsWith("MOVIE::")) movieTitle = value.substring(7);',
          '  else if (value.startsWith("TAG::")) tags.add(value.substring(5));',
          '}',
          'if (movieTitle != null && !tags.isEmpty())',
          '  context.write(new Text(movieTitle), new Text("," + tags));',
        ]}
        highlight={[4, 5, 7, 8]}
        what="Peel prefixes. Keep one title and a list of tags. Write only if both exist."
        why="A movie with no tags (or a tag for an unknown movie) is not a useful join result."
        data="Toy Story (1995)  →  , [pixar, funny]"
      />
    </LabStage>
  )
}

function Output() {
  return (
    <LabStage>
      <p className="lab-lead">The reducer prints `new Text("," + tags)`, which is why the manual output has a comma before the list.</p>
      <Terminal
        lines={[
          { kind: 'cmd', text: 'hdfs dfs -cat /user/root/movietags1/part-r-00000' },
          ...MOVIES.output.map((o) => ({ kind: 'ok', text: `${o.title}   , ${o.tags}` })),
        ]}
      />
    </LabStage>
  )
}

function Driver() {
  return (
    <LabStage>
      <CodeTeach
        caption="Driver — MultipleInputs"
        lines={[
          'MultipleInputs.addInputPath(job, new Path(args[0]), TextInputFormat.class, MovieMapper.class);',
          'MultipleInputs.addInputPath(job, new Path(args[1]), TextInputFormat.class, TagMapper.class);',
          'job.setReducerClass(JoinReducer.class);',
          'FileOutputFormat.setOutputPath(job, new Path(args[2]));',
        ]}
        highlight={[0, 1]}
        what="Two input paths, two mapper classes, one reducer, one output path. That is why the jar is launched with three arguments."
        why="A single FileInputFormat cannot attach different mappers to different files."
        data="args[0]=Movie.txt path   args[1]=Tags.txt path   args[2]=/user/root/movietags1"
      />
    </LabStage>
  )
}

function Errors() {
  return (
    <LabStage>
      <ErrorCard
        command="hadoop jar MovieTagsJoin.jar MovieTagsJoin movies tags out"
        error="Output is empty, or titles look like TAG::funny"
        cause="Prefixes were forgotten, header rows were not skipped, or movieId was taken from the wrong CSV field in TagMapper (field 0 is userId)."
        fix="TagMapper must use fields[1] as movieId. MovieMapper must emit MOVIE::. Confirm headers are skipped."
      />
    </LabStage>
  )
}

function Viva() {
  return (
    <LabStage>
      <VivaList
        items={[
          { q: 'What is a reduce-side join?', a: 'Both datasets are mapped to a common key; the reducer concatenates values that share that key.' },
          { q: 'Why MultipleInputs?', a: 'Movie.txt and Tags.txt have different layouts, so each needs its own mapper class.' },
          { q: 'Why MOVIE:: and TAG:: prefixes?', a: 'After shuffle, values are just Text. The prefix is how the reducer knows which is the title.' },
          { q: 'Which field is the join key in tags?', a: 'movieId — the second field (index 1), not userId.' },
          { q: 'What if a movie has no tags?', a: 'JoinReducer writes nothing for that key because tags.isEmpty().' },
          { q: 'How many driver arguments?', a: 'Three: movies path, tags path, output path.' },
        ]}
      />
    </LabStage>
  )
}

function RecapSlide() {
  return (
    <LabStage>
      <Recap
        flow={['Movie.txt + Tags.txt', 'Two mappers', 'movieId', 'Shuffle / group', 'JoinReducer', 'Movie → tags']}
        skills={[
          'Explain both inputs',
          'Explain MovieMapper',
          'Explain TagMapper',
          'Dry-run one movieId',
          'Explain the reducer join',
          'Execute with three paths',
        ]}
      />
    </LabStage>
  )
}

export const program4Slides = [
  slide({ id: 'p4-title', hideTitle: true, kicker: 'Lab · Program 4', content: <Title /> }),
  slide({ id: 'p4-problem', kicker: 'Lab · Program 4', title: 'What are we trying to solve?', content: <Problem /> }),
  slide({ id: 'p4-in', kicker: 'Lab · Program 4', title: 'Two input files', content: <Inputs /> }),
  slide({ id: 'p4-anatomy', kicker: 'Lab · Program 4', title: 'The shared field is movieId', content: <Anatomy /> }),
  slide({ id: 'p4-dual', kicker: 'Lab · Program 4', title: 'Two mappers, one key', content: <DualMap /> }),
  slide({ id: 'p4-mc', kicker: 'Lab · Program 4', title: 'MovieMapper walkthrough', content: <MovieCode /> }),
  slide({ id: 'p4-tc', kicker: 'Lab · Program 4', title: 'TagMapper walkthrough', content: <TagCode /> }),
  slide({ id: 'p4-sh', kicker: 'Lab · Program 4', title: 'Shuffle / group by movieId', content: <ShuffleJoin /> }),
  slide({ id: 'p4-rc', kicker: 'Lab · Program 4', title: 'JoinReducer walkthrough', content: <ReducerCode /> }),
  slide({ id: 'p4-out', kicker: 'Lab · Program 4', title: 'Final output', content: <Output /> }),
  slide({ id: 'p4-drv', kicker: 'Lab · Program 4', title: 'Driver and procedure', content: <Driver /> }),
  slide({ id: 'p4-err', kicker: 'Lab · Program 4', title: 'Common lab errors', content: <Errors /> }),
  slide({ id: 'p4-viva', kicker: 'Lab · Program 4', title: 'Viva check', content: <Viva /> }),
  slide({ id: 'p4-recap', kicker: 'Lab · Program 4', title: 'Program recap', content: <RecapSlide /> }),
]

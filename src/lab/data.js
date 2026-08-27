/** Sample data and reconstructed lab code — taken from the supplied BDA lab manual. */

export const HDFS = {
  localHome: '/home/cloudera',
  localFile: '/home/cloudera/Desktop/temp.txt',
  localHint: '/user/cloudera/Desktop/temp.txt',
  fileName: 'temp.txt',
  hdfsDir: '/user/root/demodir',
  hdfsFile: '/user/root/demodir/temp.txt',
  fileBody: 'This is a sample file copied from the local Desktop into HDFS.',
  commands: [
    { cmd: 'pwd', note: 'Print the local working directory.' },
    { cmd: 'hdfs dfs -ls /', note: 'List the HDFS root namespace.' },
    { cmd: 'hdfs dfs -ls /user', note: 'List user directories in HDFS.' },
    { cmd: 'hdfs dfs -mkdir /user/root/demodir', note: 'Create a directory under /user/root.' },
    { cmd: 'hdfs dfs -ls /user/root/', note: 'Confirm demodir exists.' },
    { cmd: 'cd Desktop', note: 'Move to the local folder that holds temp.txt.' },
    { cmd: 'hdfs dfs -copyFromLocal temp.txt /user/root/demodir', note: 'Copy the local file into HDFS.' },
    { cmd: 'hdfs dfs -ls /user/root/demodir', note: 'Verify the file landed.' },
    { cmd: 'hdfs dfs -cat /user/root/demodir/temp.txt', note: 'Print the HDFS file contents.' },
  ],
  userDirs: ['/user/cloudera', '/user/history', '/user/hive', '/user/hue', '/user/jenkins', '/user/oozie', '/user/root', '/user/spark'],
}

export const MATRIX = {
  inputPath: '/user/root/matin/matrix.txt',
  outputPath: '/user/root/matout',
  m: 2,
  n: 2,
  p: 2,
  inputLines: [
    'M,0,0,1',
    'M,0,1,2',
    'M,1,0,3',
    'M,1,1,4',
    'N,0,0,5',
    'N,0,1,6',
    'N,1,0,7',
    'N,1,1,8',
  ],
  M: [[1, 2], [3, 4]],
  N: [[5, 6], [7, 8]],
  C: [[19, 22], [43, 50]],
  outputLines: ['0,0,19.0', '0,1,22.0', '1,0,43.0', '1,1,50.0'],
  cells: [
    { key: '0,0', label: 'C₀₀', parts: ['1 × 5', '2 × 7'], values: [5, 14], result: 19 },
    { key: '0,1', label: 'C₀₁', parts: ['1 × 6', '2 × 8'], values: [6, 16], result: 22 },
    { key: '1,0', label: 'C₁₀', parts: ['3 × 5', '4 × 7'], values: [15, 28], result: 43 },
    { key: '1,1', label: 'C₁₁', parts: ['3 × 6', '4 × 8'], values: [18, 32], result: 50 },
  ],
}

export const WEATHER = {
  fileName: 'data.txt',
  records: [
    '27516 20150101 2.424 -156.61 71.32 -18.3 -21.8 -20.0 -19.9 0.0 0.00 C -19.2 -24.5 -21.9 83.9 73.7 77.9',
    '27516 20150102 2.424 -156.61 71.32 -20.8 -24.9 -22.8 -22.6 0.2 0.00 C -21.8 -26.4 -23.9 88.1 77.1 80.3',
    '27516 20150106 2.424 -156.61 71.32 -16.4 -26.3 -21.3 -20.5 0.0 0.00 C -18.6 -27.4 -23.1 84.7 76.5 81.3',
    '27516 20150107 2.424 -156.61 71.32 -22.1 -28.7 -25.4 -26.3 0.5 0.00 C -23.5 -29.5 -27.5 79.7 74.9 76.6',
  ],
  hotExample: 'XXXXXX20150815XXXXXXXXXXXXXXXXXXXXX  38.0   22.0',
  coldExample: 'XXXXXX20150112XXXXXXXXXXXXXXXXXXXXX  18.0    7.0',
}

export const MOVIES = {
  moviePath: '/user/root/movie/Movie.txt',
  tagPath: '/user/root/tag/Tags.txt',
  outputPath: '/user/root/movietags1',
  movies: [
    { id: '1', title: 'Toy Story (1995)', genres: 'Adventure|Animation|Children|Comedy|Fantasy' },
    { id: '2', title: 'Jumanji (1995)', genres: 'Adventure|Children|Fantasy' },
    { id: '3', title: 'Grumpier Old Men (1995)', genres: 'Comedy|Romance' },
  ],
  tags: [
    { user: '15', movieId: '1', tag: 'funny', ts: '1139045764' },
    { user: '15', movieId: '2', tag: 'childish', ts: '1139045874' },
    { user: '20', movieId: '1', tag: 'pixar', ts: '1139045984' },
    { user: '20', movieId: '3', tag: 'oldie', ts: '1139046064' },
  ],
  output: [
    { title: 'Toy Story (1995)', tags: ['pixar', 'funny'] },
    { title: 'Jumanji (1995)', tags: ['childish'] },
    { title: 'Grumpier Old Men (1995)', tags: ['oldie'] },
  ],
}

export const PIG = {
  inputPath: '/user/root/pigdata/students.txt',
  scriptPath: '/home/cloudera/workspace/PigExample.pig',
  runCmd: 'pig -x mapreduce PigExample.pig',
  students: [
    { id: 101, name: 'John', dept: 'CS', marks: 85 },
    { id: 102, name: 'Alice', dept: 'IT', marks: 92 },
    { id: 103, name: 'Bob', dept: 'CS', marks: 76 },
    { id: 104, name: 'David', dept: 'EC', marks: 89 },
    { id: 105, name: 'Eve', dept: 'IT', marks: 67 },
    { id: 106, name: 'john', dept: 'AIML', marks: 88 },
    { id: 107, name: 'George', dept: 'EC', marks: 100 },
  ],
  outputs: ['sorted_students', 'high_scorers', 'projected', 'average_marks'],
}

export const HIVE = {
  db: 'organization',
  table: 'employee',
  hdfsFile: '/user/root/emp.txt',
  rows: [
    { id: 100, name: 'vijayalaxmi', salary: '1000.0' },
    { id: 200, name: 'vijaya', salary: '2000.4' },
    { id: 300, name: 'jaya', salary: '400.3' },
    { id: 400, name: 'laxmi', salary: '5000.0' },
  ],
  schema: [
    { name: 'id', type: 'INT' },
    { name: 'name', type: 'STRING' },
    { name: 'salary', type: 'FLOAT' },
  ],
}

export const SPARK = {
  filePath: '/content/sample_data/word.txt',
  lines: ['My name is Vijayalaxmi', 'Vijayalaxmi likes to code', 'she is working in citech'],
  counts: [
    ['My', 1],
    ['name', 1],
    ['is', 2],
    ['Vijayalaxmi', 2],
    ['likes', 1],
    ['to', 1],
    ['code', 1],
    ['she', 1],
    ['working', 1],
    ['in', 1],
    ['citech', 1],
  ],
}

export function pigHighScorers() {
  return PIG.students.filter((s) => s.marks > 80)
}

export function pigSorted() {
  return [...PIG.students].sort((a, b) => b.marks - a.marks)
}

export function pigProjected() {
  return PIG.students.map((s) => ({ name: s.name, marks: s.marks }))
}

export function pigGrouped() {
  const buckets = {}
  for (const s of PIG.students) {
    buckets[s.dept] ??= []
    buckets[s.dept].push(s)
  }
  return Object.entries(buckets).map(([dept, rows]) => ({
    dept,
    rows,
    avg: rows.reduce((sum, r) => sum + r.marks, 0) / rows.length,
  }))
}

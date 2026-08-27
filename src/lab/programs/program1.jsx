import {
  Callout,
  ErrorCard,
  FileToken,
  Flow,
  HdfsTree,
  LabGrid,
  LabStage,
  Recap,
  Terminal,
  TitleHero,
  VivaList,
  slide,
  useDryRun,
} from '../LabKit'
import { HDFS } from '../data'

function tree(showDir, showFile) {
  return [
    {
      path: '/',
      label: '/',
      children: [
        {
          path: '/user',
          label: 'user/',
          children: [
            {
              path: '/user/root',
              label: 'root/',
              children: showDir
                ? [{
                    path: HDFS.hdfsDir,
                    label: 'demodir/',
                    children: showFile ? [{ path: HDFS.hdfsFile, label: 'temp.txt', file: true }] : [],
                  }]
                : [],
            },
          ],
        },
      ],
    },
  ]
}

function Title() {
  return (
    <LabStage>
      <TitleHero
        number="1"
        title="HDFS File Management"
        tech="HDFS"
        question="How does a local file leave the Desktop and become a file inside Hadoop?"
        chips={['mkdir', 'copyFromLocal', 'ls', 'cat']}
      />
    </LabStage>
  )
}

function Problem() {
  return (
    <LabStage>
      <p className="lab-lead">The lab asks you to install Hadoop and then manage files the way a real cluster job does: create folders, copy data in, read it back, and later delete it.</p>
      <ul className="lab-points">
        <li>Adding files and directories</li>
        <li>Retrieving files</li>
        <li>Deleting files and directories</li>
      </ul>
      <Callout label="Typical workflow">A log file is created on the local machine. Hadoop never sees it until you copy it into HDFS with a command-line utility.</Callout>
    </LabStage>
  )
}

function Prerequisite() {
  return (
    <LabStage>
      <p className="lab-lead">Before any `hdfs dfs` command can succeed, the HDFS services must already be running.</p>
      <LabGrid>
        <div className="lab-node mapper is-hot">
          <strong>NameNode</strong>
          <p>Keeps the namespace: which directories exist, which blocks belong to which file. If this is off, `ls` and `mkdir` fail.</p>
        </div>
        <div className="lab-node reducer is-hot">
          <strong>DataNode</strong>
          <p>Stores the actual bytes. `copyFromLocal` and `cat` need at least one live DataNode.</p>
        </div>
      </LabGrid>
      <Callout tone="amber" label="Manual note">Open Cloudera Manager and start HDFS / NameNode / DataNode, or start them from the command line, before typing the lab commands.</Callout>
    </LabStage>
  )
}

function TwoWorlds() {
  return (
    <LabStage>
      <p className="lab-lead">Every HDFS command sits on a boundary: the Linux shell on the left, the Hadoop filesystem on the right.</p>
      <div className="lab-split">
        <div className="lab-pane">
          <h3>Local file system</h3>
          <p>Home: `{HDFS.localHome}`</p>
          <p>Desktop file: `{HDFS.fileName}`</p>
          <FileToken name="temp.txt" side="local" />
          <p style={{ marginTop: 12 }}>Commands such as `pwd` and `cd Desktop` never touch HDFS.</p>
        </div>
        <div className="lab-arrow">→</div>
        <div className="lab-pane">
          <h3>HDFS</h3>
          <p>Every Hadoop command begins with `hdfs dfs`.</p>
          <HdfsTree nodes={tree(false, false)} />
        </div>
      </div>
    </LabStage>
  )
}

function PwdScene() {
  return (
    <LabStage>
      <p className="lab-lead">First confirm where you are on the local machine — not on HDFS.</p>
      <LabGrid>
        <Terminal
          lines={[
            { kind: 'cmd', text: 'pwd' },
            { kind: 'out', text: HDFS.localHome },
            { kind: 'cmd', text: '' },
          ]}
        />
        <Callout label="What changed">Nothing in HDFS. You only learned the local working directory is `/home/cloudera`. The Desktop file still lives outside Hadoop.</Callout>
      </LabGrid>
    </LabStage>
  )
}

function LsRoot() {
  return (
    <LabStage>
      <p className="lab-lead">Now cross the boundary. `hdfs dfs -ls /` lists the HDFS root, the way `ls /` lists Linux root.</p>
      <Terminal
        lines={[
          { kind: 'cmd', text: 'hdfs dfs -ls /' },
          { kind: 'out', text: 'Found items under HDFS root — user/, tmp/, and cluster system directories.' },
        ]}
      />
      <Callout label="Read the command">`hdfs dfs` is the HDFS client. `-ls` is list. `/` is the HDFS namespace root, not `/home/cloudera`.</Callout>
    </LabStage>
  )
}

function LsUser() {
  return (
    <LabStage>
      <p className="lab-lead">The lab then peeks at `/user`, where Cloudera keeps per-service home directories — including `/user/root`.</p>
      <LabGrid>
        <Terminal
          lines={[
            { kind: 'cmd', text: 'hdfs dfs -ls /user' },
            { kind: 'ok', text: 'Found 8 items' },
            ...HDFS.userDirs.map((d) => ({ kind: 'out', text: `drwxr-xr-x  ${d}` })),
          ]}
        />
        <div className="lab-pane">
          <h3>HDFS now</h3>
          <HdfsTree nodes={tree(false, false)} highlight="/user/root" />
        </div>
      </LabGrid>
    </LabStage>
  )
}

function MkdirDry() {
  const { step, bar } = useDryRun(3, { labels: ['Before', 'Run mkdir', 'demodir appears'] })
  const showDir = step >= 2
  return (
    <LabStage>
      <p className="lab-lead">`mkdir` changes the NameNode namespace. No DataNode bytes are written yet — only a new directory entry.</p>
      <LabGrid>
        <div>
          <Terminal
            lines={[
              { kind: 'cmd', text: 'hdfs dfs -mkdir /user/root/demodir' },
              step >= 1 ? { kind: 'ok', text: 'Directory created in the HDFS namespace' } : { kind: 'out', text: '' },
              step >= 2 ? { kind: 'cmd', text: 'hdfs dfs -ls /user/root/' } : null,
              step >= 2 ? { kind: 'out', text: 'drwxr-xr-x  /user/root/demodir' } : null,
            ].filter(Boolean)}
          />
        </div>
        <div className="lab-pane">
          <h3>{step < 2 ? 'Before' : 'After'}</h3>
          <HdfsTree nodes={tree(showDir, false)} highlight={showDir ? HDFS.hdfsDir : '/user/root'} />
        </div>
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function CopyDry() {
  const { step, bar } = useDryRun(4, { labels: ['Local Desktop', 'cd Desktop', 'copyFromLocal', 'File lives in HDFS'] })
  return (
    <LabStage>
      <p className="lab-lead">The file starts on the local Desktop. `copyFromLocal` is the moment it physically enters HDFS.</p>
      <div className="lab-split">
        <div className="lab-pane">
          <h3>Local FS</h3>
          <p>`cd Desktop` because `temp.txt` is on the Desktop.</p>
          <FileToken name="temp.txt" side="local" />
          {step >= 1 && <p style={{ marginTop: 10 }}>Working directory: Desktop</p>}
        </div>
        <div className="lab-arrow">{step >= 2 ? 'copyFromLocal' : '…'}</div>
        <div className="lab-pane">
          <h3>HDFS</h3>
          <HdfsTree nodes={tree(true, step >= 3)} highlight={step >= 3 ? HDFS.hdfsFile : HDFS.hdfsDir} />
          {step >= 3 && <FileToken name="/user/root/demodir/temp.txt" side="hdfs" />}
        </div>
      </div>
      <Terminal
        lines={[
          { kind: 'cmd', text: 'cd Desktop' },
          step >= 2 ? { kind: 'cmd', text: 'hdfs dfs -copyFromLocal temp.txt /user/root/demodir' } : null,
          step >= 3 ? { kind: 'ok', text: 'Copied local temp.txt → /user/root/demodir/temp.txt' } : null,
        ].filter(Boolean)}
      />
      {bar}
    </LabStage>
  )
}

function ListAndCat() {
  const { step, bar } = useDryRun(3, { labels: ['ls demodir', 'Open the file', 'Contents appear'] })
  return (
    <LabStage>
      <p className="lab-lead">Listing proves the file exists. `cat` asks a DataNode for the bytes and prints them in the terminal.</p>
      <LabGrid>
        <Terminal
          lines={[
            { kind: 'cmd', text: 'hdfs dfs -ls /user/root/demodir' },
            { kind: 'out', text: `-rw-r--r--  ${HDFS.hdfsFile}` },
            step >= 1 ? { kind: 'cmd', text: 'hdfs dfs -cat /user/root/demodir/temp.txt' } : null,
            step >= 2 ? { kind: 'ok', text: HDFS.fileBody } : null,
          ].filter(Boolean)}
        />
        <div className="lab-pane">
          <h3>Retrieve</h3>
          <FileToken name="temp.txt" side="hdfs" />
          {step >= 2 && (
            <Callout label="Opened from HDFS">{HDFS.fileBody}</Callout>
          )}
        </div>
      </LabGrid>
      {bar}
    </LabStage>
  )
}

function DeleteAndFlow() {
  return (
    <LabStage>
      <p className="lab-lead">The program title also requires deleting files and directories. Those commands are the inverse of `copyFromLocal` and `mkdir`.</p>
      <LabGrid>
        <Terminal
          lines={[
            { kind: 'cmd', text: 'hdfs dfs -rm /user/root/demodir/temp.txt' },
            { kind: 'out', text: 'Deleted the file; demodir remains.' },
            { kind: 'cmd', text: 'hdfs dfs -rm -r /user/root/demodir' },
            { kind: 'out', text: 'Deleted the directory and anything inside it.' },
          ]}
        />
        <div>
          <Flow items={['Local file', 'copyFromLocal', 'HDFS path', 'ls / cat', 'rm / rm -r']} />
          <Callout label="NameNode vs DataNode">`rm` removes the namespace entry and schedules block deletion on DataNodes. The local Desktop copy is untouched.</Callout>
        </div>
      </LabGrid>
    </LabStage>
  )
}

function CheatSheet() {
  const rows = [
    ['hdfs dfs -ls <path>', 'List files and directories'],
    ['hdfs dfs -mkdir <path>', 'Create a directory'],
    ['hdfs dfs -copyFromLocal <src> <dst>', 'Local → HDFS'],
    ['hdfs dfs -copyToLocal <src> <dst>', 'HDFS → Local'],
    ['hdfs dfs -cat <file>', 'Print file contents'],
    ['hdfs dfs -rm <file>', 'Delete a file'],
    ['hdfs dfs -rm -r <dir>', 'Delete a directory tree'],
    ['hdfs dfs -put / -get', 'Aliases for copy in / out'],
  ]
  return (
    <LabStage>
      <p className="lab-lead">Every HDFS shell command starts with `hdfs dfs`. Memorise this short list for the lab exam.</p>
      <div className="lab-table-wrap">
        <table className="lab-table">
          <thead><tr><th>Command</th><th>Role</th></tr></thead>
          <tbody>
            {rows.map(([c, r]) => (
              <tr key={c}><td><code>{c}</code></td><td>{r}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </LabStage>
  )
}

function Errors() {
  return (
    <LabStage>
      <ErrorCard
        command="hdfs dfs -ls /user/root/demodir"
        error="ls: `/user/root/demodir': No such file or directory"
        cause="The directory was never created, the path is mistyped, or NameNode is not running so the namespace cannot be read."
        fix="Start HDFS services, then `hdfs dfs -mkdir /user/root/demodir` and confirm with `hdfs dfs -ls /user/root/`."
      />
    </LabStage>
  )
}

function Viva() {
  return (
    <LabStage>
      <VivaList
        items={[
          { q: 'Why must every HDFS command start with hdfs dfs?', a: 'Because the next tokens are sent to the HDFS client, not to the local Linux filesystem.' },
          { q: 'What must be running before these commands work?', a: 'HDFS services: NameNode (namespace) and DataNode (block storage).' },
          { q: 'What does copyFromLocal change?', a: 'It reads a local file and writes it into HDFS under the given path. The local file remains on Desktop.' },
          { q: 'Where is the namespace stored?', a: 'On the NameNode. mkdir and ls talk to the NameNode; the file bytes go to DataNodes.' },
          { q: 'How do you delete a directory?', a: '`hdfs dfs -rm -r <dir>` removes the directory tree. `-rm` alone deletes a file.' },
          { q: 'Does pwd look at HDFS?', a: 'No. pwd prints the local working directory, here /home/cloudera.' },
        ]}
      />
    </LabStage>
  )
}

function RecapSlide() {
  return (
    <LabStage>
      <Recap
        flow={['Desktop temp.txt', 'copyFromLocal', '/user/root/demodir/temp.txt', 'cat', 'optional rm']}
        skills={[
          'Explain local FS vs HDFS',
          'Start from NameNode/DataNode being ON',
          'Create a directory with mkdir',
          'Copy a file with copyFromLocal',
          'Retrieve contents with cat',
          'Delete with rm / rm -r',
        ]}
      />
    </LabStage>
  )
}

export const program1Slides = [
  slide({ id: 'p1-title', hideTitle: true, kicker: 'Lab · Program 1', content: <Title />, notes: 'Open on the boundary between Desktop and HDFS.' }),
  slide({ id: 'p1-problem', kicker: 'Lab · Program 1', title: 'What are we trying to solve?', content: <Problem /> }),
  slide({ id: 'p1-prereq', kicker: 'Lab · Program 1', title: 'Services must be running first', content: <Prerequisite /> }),
  slide({ id: 'p1-worlds', kicker: 'Lab · Program 1', title: 'Local file system and HDFS are different worlds', content: <TwoWorlds /> }),
  slide({ id: 'p1-pwd', kicker: 'Lab · Program 1', title: 'pwd — stay on the local machine', content: <PwdScene /> }),
  slide({ id: 'p1-ls-root', kicker: 'Lab · Program 1', title: 'ls / — first look at the HDFS namespace', content: <LsRoot /> }),
  slide({ id: 'p1-ls-user', kicker: 'Lab · Program 1', title: 'ls /user — find /user/root', content: <LsUser /> }),
  slide({ id: 'p1-mkdir', kicker: 'Lab · Program 1', title: 'mkdir — the directory tree grows', content: <MkdirDry /> }),
  slide({ id: 'p1-copy', kicker: 'Lab · Program 1', title: 'copyFromLocal — the file crosses into HDFS', content: <CopyDry /> }),
  slide({ id: 'p1-cat', kicker: 'Lab · Program 1', title: 'ls and cat — prove the file is there', content: <ListAndCat /> }),
  slide({ id: 'p1-delete', kicker: 'Lab · Program 1', title: 'Deleting files and directories', content: <DeleteAndFlow /> }),
  slide({ id: 'p1-cheat', kicker: 'Lab · Program 1', title: 'HDFS command cheat sheet', content: <CheatSheet /> }),
  slide({ id: 'p1-errors', kicker: 'Lab · Program 1', title: 'Common lab errors', content: <Errors /> }),
  slide({ id: 'p1-viva', kicker: 'Lab · Program 1', title: 'Viva check', content: <Viva /> }),
  slide({ id: 'p1-recap', kicker: 'Lab · Program 1', title: 'Program recap', content: <RecapSlide /> }),
]

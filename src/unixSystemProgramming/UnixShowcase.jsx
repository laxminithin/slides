/**
 * UnixShowcase — wide hero teaching scenes for BCS515C.
 * Keyed by slide id for buildSlides showcase layout.
 */
import {
  ForkScene,
  PipeFlowScene,
  PermissionsScene,
  PathLookupScene,
  SignalScene,
  DaemonScene,
  UNIX,
} from './UnixScenes.jsx'

const { BLUE, AMBER, PURP, TEAL, GREEN, RED } = UNIX

function wrap(title, hue, scene, takeaway, camera = 'wide-process', family = 'process-flow', object = 'process') {
  return {
    title,
    camera,
    family,
    object,
    takeaway,
    scene: <div className="unix-showcase-scene">{scene}</div>,
  }
}

const SHOWCASES = {
  // PATH lookup (Module 1)
  'm1-u36-ops': wrap(
    'PATH — shell searches directories left to right',
    TEAL,
    <PathLookupScene />,
    'First match wins; builtins never consult PATH.',
    'path-scan',
    'path-lookup',
    'path',
  ),
  'm1-u37-ops': wrap(
    'PATH — terminal view of command resolution',
    TEAL,
    <PathLookupScene />,
    'type / command -v show where the shell found the name.',
    'path-scan',
    'path-lookup',
    'path',
  ),

  // Permissions (Module 2)
  'm2-u2-ops': wrap(
    'Permissions — Owner · Group · Others × rwx',
    AMBER,
    <PermissionsScene />,
    'Draw rwxr-xr-- then map each triad to octal digits.',
    'perm-triad',
    'permissions-rwx',
    'mode',
  ),
  'm2-u3-ops': wrap(
    'Permissions — read the mode string aloud',
    AMBER,
    <PermissionsScene />,
    'Exam answers always name the three classes explicitly.',
    'perm-triad',
    'permissions-rwx',
    'mode',
  ),

  // Pipes (Module 2 + Module 4)
  'm2-u20-ops': wrap(
    'Pipe — stdout flows into the next stdin',
    BLUE,
    <PipeFlowScene />,
    'cmd1 | cmd2 shares no file on disk — only a kernel buffer.',
    'pipe-flow',
    'pipe-dataflow',
    'pipe',
  ),
  'm2-u21-ops': wrap(
    'Pipe — watch bytes move through the buffer',
    BLUE,
    <PipeFlowScene />,
    'Writer blocks when the pipe fills; reader blocks when empty.',
    'pipe-flow',
    'pipe-dataflow',
    'pipe',
  ),
  'm4-u14-ops': wrap(
    'Pipe IPC — two processes, one buffer',
    BLUE,
    <PipeFlowScene />,
    'Anonymous pipe is unidirectional between related processes.',
    'pipe-flow',
    'pipe-dataflow',
    'pipe',
  ),
  'm4-u15-ops': wrap(
    'Pipe IPC — terminal pipeline view',
    BLUE,
    <PipeFlowScene />,
    'Same mechanism under the shell | operator.',
    'pipe-flow',
    'pipe-dataflow',
    'pipe',
  ),

  // fork (Module 4)
  'm4-u4-ops': wrap(
    'fork() — parent and child with distinct PIDs',
    GREEN,
    <ForkScene />,
    'Parent sees child PID; child sees 0 — then they diverge.',
    'fork-split',
    'fork-parent-child',
    'fork',
  ),
  'm4-u5-ops': wrap(
    'fork() — watch the process tree split',
    GREEN,
    <ForkScene />,
    'vfork is a variant; know when the address space is shared.',
    'fork-split',
    'fork-parent-child',
    'fork',
  ),

  // Signals (Module 5)
  'm5-u2-ops': wrap(
    'Signal — A delivers SIGTERM to B',
    RED,
    <SignalScene />,
    'Kernel delivers asynchronously — default, ignore, or catch.',
    'signal-fly',
    'signal-delivery',
    'signal',
  ),
  'm5-u3-ops': wrap(
    'Signal concepts — name, number, disposition',
    RED,
    <SignalScene />,
    'Label sender, signal name, and receiver disposition in diagrams.',
    'signal-fly',
    'signal-delivery',
    'signal',
  ),

  // Daemon (Module 5)
  'm5-u32-ops': wrap(
    'Daemon — fork, detach, run in background',
    PURP,
    <DaemonScene />,
    'No controlling terminal; parent often exits after the first fork.',
    'daemon-detach',
    'daemon-lifecycle',
    'daemon',
  ),
  'm5-u33-ops': wrap(
    'Daemon characteristics — session and tty detach',
    PURP,
    <DaemonScene />,
    'setsid + close fds + background service loop.',
    'daemon-detach',
    'daemon-lifecycle',
    'daemon',
  ),
}

export function getShowcase(id) {
  return SHOWCASES[id] || null
}

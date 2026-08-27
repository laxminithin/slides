/** Unix System Programming (BCS515C) curriculum — from finalized 5th_Semester_PPTX */
export const COURSE = { id: 'unix-system-programming', title: "Unix System Programming", code: 'BCS515C', shortTitle: 'USP' }
export const MODULES = [
  {
    "n": 1,
    "id": "module-1",
    "title": "Unix Environment, Commands and Files",
    "hours": 8,
    "question": "How does the Unix environment turn commands into kernel work?",
    "story": [
      "Shell",
      "Commands",
      "Files",
      "PATH"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Unix components and architecture",
      "Unix components and architecture: terminal/program view",
      "Features of Unix",
      "Features of Unix: terminal/program view",
      "UNIX environment and structure",
      "UNIX environment and structure: terminal/program view",
      "POSIX and Single UNIX Specification",
      "POSIX and Single UNIX Specification: terminal/program view",
      "Unix command structure",
      "Unix command structure: terminal/program view",
      "Command arguments and options",
      "Command arguments and options: terminal/program view",
      "Basic Unix commands",
      "Basic Unix commands: terminal/program view",
      "Combining commands",
      "Combining commands: terminal/program view",
      "Internal and external commands",
      "Internal and external commands: terminal/program view",
      "type command",
      "type command: terminal/program view",
      "root login and su",
      "root login and su: terminal/program view",
      "Naming files",
      "Naming files: terminal/program view",
      "File types",
      "File types: terminal/program view",
      "Organization of files",
      "Organization of files: terminal/program view",
      "Hidden files",
      "Hidden files: terminal/program view",
      "Standard directories",
      "Standard directories: terminal/program view",
      "Home directory and HOME variable",
      "Home directory and HOME variable: terminal/program view",
      "PATH variable",
      "PATH variable: terminal/program view",
      "Relative and absolute pathnames",
      "Relative and absolute pathnames: terminal/program view",
      "pwd cd mkdir rmdir",
      "pwd cd mkdir rmdir: terminal/program view",
      "dot and double-dot notation",
      "dot and double-dot notation: terminal/program view",
      "cat mv rm cp wc od",
      "cat mv rm cp wc od: terminal/program view"
    ],
    "notes": "Aligned to BCS515C Module_1 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "start-with-why-the-module-matters",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Unix components and architecture",
        "terms": [
          "Unix",
          "components",
          "architecture"
        ],
        "definition": "Unix is layered: the hardware at the centre, the kernel around it (managing CPU, memory, files, devices), the shell as the command interpreter, and the user/application programs outside. Programs reach the kernel only through system calls.",
        "takeaway": "Draw the onion: hardware → kernel → shell → users; the kernel is the only layer that touches hardware.",
        "visual": "unix-components-and-architecture",
        "algo": [
          "User types a command into the shell",
          "Shell parses it and issues system calls",
          "Kernel services the call (CPU/memory/file/device)",
          "Result flows back out to the user"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "hardware→kernel→shell→user; kernel owns hardware"
        },
        "dryRun": {
          "input": "cat file.txt",
          "steps": [
            "Shell forks and execs cat",
            "cat issues read() system calls",
            "Kernel reads disk blocks",
            "Bytes returned and printed"
          ],
          "result": "Command reaches hardware only via the kernel"
        },
        "code": null,
        "mistake": "Thinking the shell talks to hardware directly — it must go through kernel system calls."
      },
      {
        "topic": "Unix components and architecture: terminal/program view",
        "terms": [
          "Unix",
          "components",
          "and",
          "architecture"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "unix-components-and-architecture-terminal-progra",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Features of Unix",
        "terms": [
          "Features",
          "Unix"
        ],
        "definition": "Unix's defining features: multiuser and multitasking, a hierarchical (tree) file system, 'everything is a file' (devices too), a small-tools philosophy combined by pipes, portability (written in C), and a clear kernel/shell separation.",
        "takeaway": "Multiuser + multitasking + everything-is-a-file + small tools joined by pipes — the Unix philosophy.",
        "visual": "features-of-unix",
        "algo": [
          "Many users share the machine (multiuser)",
          "Many processes run concurrently (multitasking)",
          "Files, devices and pipes share one interface",
          "Small tools combine via pipes to do big jobs"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Multiuser·multitasking·everything-is-a-file"
        },
        "dryRun": {
          "input": "who | wc -l",
          "steps": [
            "who lists logged-in users",
            "| sends its output to wc",
            "wc -l counts the lines",
            "Two small tools = 'how many users'"
          ],
          "result": "Small tools + pipes solve a new problem with no new program"
        },
        "code": null,
        "mistake": "Writing one big program when composing small tools with pipes would do."
      },
      {
        "topic": "Features of Unix: terminal/program view",
        "terms": [
          "Features",
          "Unix",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "features-of-unix-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "UNIX environment and structure",
        "terms": [
          "UNIX",
          "environment",
          "structure"
        ],
        "definition": "A Unix process runs in an environment: a set of environment variables (HOME, PATH, USER…), the current working directory, open file descriptors (0,1,2), and the controlling terminal. Children inherit this environment from the parent.",
        "takeaway": "Each process carries an environment (variables + cwd + open fds) that children inherit from the parent.",
        "visual": "unix-environment-and-structure",
        "algo": [
          "Login shell starts with an environment",
          "Variables like PATH, HOME are set",
          "Child processes inherit a copy",
          "Changes in a child do not affect the parent"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "vars+cwd+fds; children inherit a copy"
        },
        "dryRun": {
          "input": "export X=1; bash",
          "steps": [
            "X exported into the environment",
            "New bash inherits X",
            "Child sees X=1",
            "Unsetting X in the child leaves the parent's X"
          ],
          "result": "Environment is inherited by copy, parent unchanged"
        },
        "code": null,
        "mistake": "Expecting a child's variable change to propagate back up to the parent shell."
      },
      {
        "topic": "UNIX environment and structure: terminal/program view",
        "terms": [
          "UNIX",
          "environment",
          "and",
          "structure"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "unix-environment-and-structure-terminal-program-",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "POSIX and Single UNIX Specification",
        "terms": [
          "POSIX",
          "Single",
          "UNIX"
        ],
        "definition": "POSIX (IEEE 1003) and the Single UNIX Specification are portability standards: they define the system-call and utility interface a conforming Unix must provide, so source code compiles and runs across Unix variants.",
        "takeaway": "POSIX/SUS standardize the interface (system calls + utilities) so programs port across Unix systems.",
        "visual": "posix-and-single-unix-specification",
        "algo": [
          "Standard defines required interfaces",
          "Vendors implement to the standard",
          "Portable code uses only standard calls",
          "Same source compiles on any conforming system"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Standardized syscalls+utilities across Unix variants"
        },
        "dryRun": {
          "input": "A program using open()/read()",
          "steps": [
            "Uses only POSIX calls",
            "Compiled on Linux — works",
            "Compiled on macOS/Solaris — works",
            "No vendor-specific calls used"
          ],
          "result": "Write once, build on any POSIX system"
        },
        "code": null,
        "mistake": "Using vendor-specific calls and assuming the code is portable."
      },
      {
        "topic": "POSIX and Single UNIX Specification: terminal/program view",
        "terms": [
          "POSIX",
          "and",
          "Single",
          "UNIX"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "posix-and-single-unix-specification-terminal-pro",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Unix command structure",
        "terms": [
          "Unix",
          "command",
          "structure"
        ],
        "definition": "A Unix command line has the form: command [options] [arguments]. The shell splits it on whitespace into words; word 0 is the command, options (usually -x) modify behaviour, and arguments are the operands.",
        "takeaway": "command -options arguments — the shell tokenizes on whitespace; word 0 is the program to run.",
        "visual": "unix-command-structure",
        "algo": [
          "Shell reads the line and splits on whitespace",
          "First word = command name",
          "Words starting with - = options",
          "Remaining words = arguments"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Shell tokenizes on whitespace; word0=command"
        },
        "dryRun": {
          "input": "ls -l /etc",
          "steps": [
            "command = ls",
            "option = -l (long listing)",
            "argument = /etc",
            "ls lists /etc in long form"
          ],
          "result": "One line parsed into command, option and argument"
        },
        "code": null,
        "mistake": "Omitting the space between command and option, or confusing options with arguments."
      },
      {
        "topic": "Unix command structure: terminal/program view",
        "terms": [
          "Unix",
          "command",
          "structure",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "unix-command-structure-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Command arguments and options",
        "terms": [
          "Command",
          "arguments",
          "options"
        ],
        "definition": "Options change how a command behaves (single-letter -l, or GNU long --all; combinable as -la); arguments are what it acts on (files, directories). Options with values take the value as the next word (e.g. -o file).",
        "takeaway": "Options (-l, --all) modify behaviour and can combine (-la); arguments name the operands.",
        "visual": "command-arguments-and-options",
        "algo": [
          "Read each word after the command",
          "'-' prefix → option flag",
          "Combine single-letter options (-la = -l -a)",
          "Non-option words → arguments/operands"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Options modify; combinable; arguments are operands"
        },
        "dryRun": {
          "input": "ls -la /tmp /var",
          "steps": [
            "-la = -l and -a combined",
            "/tmp and /var are arguments",
            "ls lists both in long form incl. hidden",
            "Two directories processed"
          ],
          "result": "Combined options applied to two argument directories"
        },
        "code": null,
        "mistake": "Treating an option's value as a separate argument, or mis-combining options."
      },
      {
        "topic": "Command arguments and options: terminal/program view",
        "terms": [
          "Command",
          "arguments",
          "and",
          "options"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "command-arguments-and-options-terminal-program-v",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Basic Unix commands",
        "terms": [
          "Basic",
          "Unix",
          "commands"
        ],
        "definition": "The everyday commands: who/date/echo (information), ls (list), cat (show file), cp/mv/rm (copy/move/remove), mkdir/rmdir (directories), and man (manual). Each is a small program the shell locates via PATH and runs.",
        "takeaway": "Know the core set — ls, cat, cp, mv, rm, mkdir, man — each a small standalone program.",
        "visual": "basic-unix-commands",
        "algo": [
          "Shell finds the command via PATH",
          "Forks and execs the program",
          "Program does one job well",
          "Output goes to the terminal (fd 1)"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "ls·cat·cp·mv·rm·mkdir — small single-job programs"
        },
        "dryRun": {
          "input": "date; echo hi",
          "steps": [
            "date prints the current time",
            "; separates commands",
            "echo prints hi",
            "Two commands run in sequence"
          ],
          "result": "Simple commands run one after another"
        },
        "code": null,
        "mistake": "Confusing rm (removes files) with rmdir (only empty directories)."
      },
      {
        "topic": "Basic Unix commands: terminal/program view",
        "terms": [
          "Basic",
          "Unix",
          "commands",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "basic-unix-commands-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Combining commands",
        "terms": [
          "Combining",
          "commands"
        ],
        "definition": "Commands combine with: ; (run in sequence), && (run next only if the previous succeeded), || (run next only if it failed), and | (pipe stdout of one to stdin of the next). This builds pipelines and conditional chains.",
        "takeaway": "; sequence, && on-success, || on-failure, | pipe output→input — the four ways to combine commands.",
        "visual": "combining-commands",
        "algo": [
          "; runs commands unconditionally in order",
          "&& runs the next only on exit status 0",
          "|| runs the next only on non-zero exit",
          "| streams one command's output into the next"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "sequence·on-success·on-failure·pipe"
        },
        "dryRun": {
          "input": "mkdir d && cd d",
          "steps": [
            "mkdir d attempts to create d",
            "If it succeeds (exit 0), && proceeds",
            "cd d runs",
            "If mkdir failed, cd is skipped"
          ],
          "result": "cd runs only because mkdir succeeded"
        },
        "code": null,
        "mistake": "Using ; where && is needed, so a command runs even after the previous one failed."
      },
      {
        "topic": "Combining commands: terminal/program view",
        "terms": [
          "Combining",
          "commands",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "combining-commands-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Internal and external commands",
        "terms": [
          "Internal",
          "external",
          "commands"
        ],
        "definition": "Internal (built-in) commands (cd, echo, pwd, export) are part of the shell itself — no new process. External commands (ls, cat, grep) are separate executables the shell finds via PATH and runs with fork+exec.",
        "takeaway": "Built-ins run inside the shell (no fork); external commands are files found via PATH and fork+exec'd.",
        "visual": "internal-and-external-commands",
        "algo": [
          "Shell reads the command word",
          "If it is a built-in, the shell runs it itself",
          "Else search PATH directories for an executable",
          "fork+exec that executable"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Internal=in shell(no fork); external=exec'd file"
        },
        "dryRun": {
          "input": "type cd; type ls",
          "steps": [
            "type cd → 'cd is a shell builtin'",
            "type ls → '/bin/ls'",
            "cd changes the shell's own directory",
            "ls runs as a child process"
          ],
          "result": "cd is internal (no process); ls is external"
        },
        "code": null,
        "mistake": "Expecting cd in a subshell/child to change the parent shell's directory (it can't — but built-in cd runs in the shell itself)."
      },
      {
        "topic": "Internal and external commands: terminal/program view",
        "terms": [
          "Internal",
          "and",
          "external",
          "commands"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "internal-and-external-commands-terminal-program-",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "type command",
        "terms": [
          "type",
          "command"
        ],
        "definition": "type tells you how the shell will interpret a name: builtin, alias, function, or the pathname of an external file. It is the tool for answering 'which program actually runs when I type X?'",
        "takeaway": "type X reveals whether X is a builtin, alias, function, or an external file (and its path).",
        "visual": "type-command",
        "algo": [
          "type checks aliases and functions first",
          "Then shell built-ins",
          "Then searches PATH for an executable",
          "Reports the resolved category/path"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "builtin/alias/function/file — how the shell reads it"
        },
        "dryRun": {
          "input": "type echo",
          "steps": [
            "Shell checks its built-in table",
            "echo is a built-in",
            "(An external /bin/echo also exists)",
            "type reports 'echo is a shell builtin'"
          ],
          "result": "type resolves the name the same way execution would"
        },
        "code": null,
        "mistake": "Assuming a name is the external program when a shell builtin/alias of the same name shadows it."
      },
      {
        "topic": "type command: terminal/program view",
        "terms": [
          "type",
          "command",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "type-command-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "root login and su",
        "terms": [
          "root",
          "login"
        ],
        "definition": "root (UID 0) is the superuser — it bypasses permission checks. su switches to another user (root by default) in a new shell after authentication; sudo runs a single command as another user. root should be used sparingly.",
        "takeaway": "root = UID 0 (all-powerful); su starts a shell as another user, sudo runs one command as root.",
        "visual": "root-login-and-su",
        "algo": [
          "Ordinary user runs su (or sudo)",
          "System authenticates (password)",
          "A shell/command runs with the target user's UID",
          "root (UID 0) skips permission checks"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "root bypasses checks; su/sudo switch user"
        },
        "dryRun": {
          "input": "su - ; then id",
          "steps": [
            "su prompts for root's password",
            "On success a root shell starts",
            "id shows uid=0(root)",
            "Exit returns to the original user"
          ],
          "result": "Elevated shell with UID 0 until exit"
        },
        "code": null,
        "mistake": "Doing routine work as root, so a mistake or malware has unrestricted power."
      },
      {
        "topic": "root login and su: terminal/program view",
        "terms": [
          "root",
          "login",
          "and",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "root-login-and-su-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Naming files",
        "terms": [
          "Naming",
          "files"
        ],
        "definition": "A Unix filename may use letters, digits, . _ - and is case-sensitive (File ≠ file); it can be up to 255 chars. A leading dot makes it hidden. / cannot appear in a name (it separates path components); avoid spaces and shell metacharacters.",
        "takeaway": "Filenames are case-sensitive, up to 255 chars; leading dot = hidden; / is forbidden (it's the separator).",
        "visual": "naming-files",
        "algo": [
          "Choose letters/digits/._- ",
          "Case matters: Report ≠ report",
          "Leading '.' hides the file",
          "Never use '/' inside a name"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "letters/digits/._- ; dot=hidden; no /"
        },
        "dryRun": {
          "input": "touch Report report .hidden",
          "steps": [
            "Report and report are two distinct files",
            "Both created in the directory",
            "'.hidden' is created but hidden from plain ls",
            "ls -a reveals .hidden"
          ],
          "result": "Three files; case distinguishes two, dot hides one"
        },
        "code": null,
        "mistake": "Assuming filenames are case-insensitive, so Report and report clash."
      },
      {
        "topic": "Naming files: terminal/program view",
        "terms": [
          "Naming",
          "files",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "naming-files-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "File types",
        "terms": [
          "File",
          "types"
        ],
        "definition": "Unix file types (shown by the first ls -l character): - ordinary/regular file, d directory, l symbolic link, c character-special device, b block-special device, p named pipe (FIFO), s socket. Everything is accessed as a file.",
        "takeaway": "First ls -l char gives the type: - reg, d dir, l link, c/b device, p FIFO, s socket.",
        "visual": "file-types",
        "algo": [
          "ls -l prints a type char first",
          "'-' regular data file",
          "'d' directory",
          "'l','c','b','p','s' for link/device/FIFO/socket"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "First ls -l char = file type"
        },
        "dryRun": {
          "input": "ls -l /dev/null /etc",
          "steps": [
            "/dev/null → 'c' (character device)",
            "/etc → 'd' (directory)",
            "A normal file → '-'",
            "Type read from the first column"
          ],
          "result": "One glance at column 1 gives the file type"
        },
        "code": null,
        "mistake": "Reading a device or directory as if it were an ordinary data file."
      },
      {
        "topic": "File types: terminal/program view",
        "terms": [
          "File",
          "types",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "file-types-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Organization of files",
        "terms": [
          "Organization",
          "files"
        ],
        "definition": "Unix files live in a single inverted tree rooted at / . Directories contain files and other directories; there is one root (no drive letters). Any file is reached by a path from / down through directory names.",
        "takeaway": "One tree rooted at / — no drive letters; every file has a path from the root.",
        "visual": "organization-of-files",
        "algo": [
          "Start at the root /",
          "Directories branch into subdirectories",
          "Files are the leaves",
          "A path names the route from / to a file"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "One root; path from / to every file"
        },
        "dryRun": {
          "input": "Locate /home/anita/report",
          "steps": [
            "Begin at /",
            "Descend into home",
            "Descend into anita",
            "report is the file there"
          ],
          "result": "Path traces root → … → file in one tree"
        },
        "code": null,
        "mistake": "Expecting separate drives (C:, D:) — Unix mounts everything into the one tree."
      },
      {
        "topic": "Organization of files: terminal/program view",
        "terms": [
          "Organization",
          "files",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "organization-of-files-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Hidden files",
        "terms": [
          "Hidden",
          "files"
        ],
        "definition": "A file whose name begins with a dot (.bashrc, .profile) is hidden: plain ls omits it, ls -a shows it. Hidden files are ordinary files used for per-user configuration; . and .. are the special hidden directory entries.",
        "takeaway": "Leading dot = hidden (config files like .bashrc); ls -a reveals them.",
        "visual": "hidden-files",
        "algo": [
          "Name starts with '.'",
          "Plain ls skips it (convention, not security)",
          "ls -a lists it",
          "Used for config: .profile, .bashrc"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Hidden config files; ls -a shows them"
        },
        "dryRun": {
          "input": "ls vs ls -a in $HOME",
          "steps": [
            "ls shows visible files only",
            "ls -a adds .bashrc, .profile",
            "Also shows . and ..",
            "Nothing is truly secret — just hidden"
          ],
          "result": "Config dotfiles appear only with ls -a"
        },
        "code": null,
        "mistake": "Thinking hidden means protected — it is only a display convention."
      },
      {
        "topic": "Hidden files: terminal/program view",
        "terms": [
          "Hidden",
          "files",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "hidden-files-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Standard directories",
        "terms": [
          "Standard",
          "directories"
        ],
        "definition": "The Unix directory hierarchy has standard locations: /bin & /usr/bin (commands), /etc (config), /dev (device files), /home (user homes), /tmp (temporary), /var (logs/spool), /lib (libraries). Knowing them lets you find things quickly.",
        "takeaway": "Learn the map: /bin commands, /etc config, /dev devices, /home users, /tmp temp, /var logs.",
        "visual": "standard-directories",
        "algo": [
          "/bin,/usr/bin hold executables",
          "/etc holds system configuration",
          "/dev holds device special files",
          "/home,/tmp,/var hold users, temp, variable data"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "/bin·/etc·/dev·/home·/tmp·/var standard roles"
        },
        "dryRun": {
          "input": "Where is the passwd file?",
          "steps": [
            "Configuration lives in /etc",
            "So /etc/passwd",
            "Commands would be in /bin",
            "Devices in /dev"
          ],
          "result": "Standard layout points straight to /etc/passwd"
        },
        "code": null,
        "mistake": "Scattering config or binaries in non-standard places, breaking the expected layout."
      },
      {
        "topic": "Standard directories: terminal/program view",
        "terms": [
          "Standard",
          "directories",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "standard-directories-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Home directory and HOME variable",
        "terms": [
          "Home",
          "directory",
          "HOME"
        ],
        "definition": "Each user has a home directory (e.g. /home/anita) — their private starting point, given by the HOME variable and by ~ . Login starts the shell there; cd with no argument returns to it.",
        "takeaway": "HOME (and ~) is the user's private base directory; bare cd returns there.",
        "visual": "home-directory-and-home-variable",
        "algo": [
          "Login sets HOME to the user's home path",
          "Shell starts in HOME",
          "~ and $HOME expand to it",
          "cd with no argument goes to HOME"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "User's private base; bare cd returns there"
        },
        "dryRun": {
          "input": "cd /etc; then cd",
          "steps": [
            "cwd becomes /etc",
            "cd with no argument",
            "Shell reads HOME",
            "cwd returns to /home/anita"
          ],
          "result": "Bare cd always returns to HOME"
        },
        "code": null,
        "mistake": "Confusing ~ (your home) with / (the root of the whole tree)."
      },
      {
        "topic": "Home directory and HOME variable: terminal/program view",
        "terms": [
          "Home",
          "directory",
          "and",
          "HOME"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "home-directory-and-home-variable-terminal-progra",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "PATH variable",
        "terms": [
          "PATH",
          "variable"
        ],
        "definition": "PATH is a colon-separated list of directories the shell searches, left to right, to locate an external command. The first match runs. If a command is 'not found', its directory is not in PATH.",
        "takeaway": "PATH = directories searched left-to-right for external commands; first match wins.",
        "visual": "path-variable",
        "algo": [
          "Shell reads the command name",
          "Split PATH on ':'",
          "Check each directory in order for the executable",
          "Run the first match; else 'command not found'"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Left-to-right directory search; first match runs"
        },
        "dryRun": {
          "input": "PATH=/bin:/usr/bin, run ls",
          "steps": [
            "Look in /bin for ls",
            "/bin/ls exists → stop",
            "Execute /bin/ls",
            "Later dirs are not searched"
          ],
          "result": "First PATH directory containing ls wins"
        },
        "code": null,
        "mistake": "Expecting a command in a directory that isn't on PATH (or wrong PATH order shadows it)."
      },
      {
        "topic": "PATH variable: terminal/program view",
        "terms": [
          "PATH",
          "variable",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "path-variable-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Relative and absolute pathnames",
        "terms": [
          "Relative",
          "absolute",
          "pathnames"
        ],
        "definition": "An absolute path starts at / and is unambiguous (/home/anita/report). A relative path starts from the current directory (reports/jan.txt) and uses . (here) and .. (parent). Both name the same file from different starting points.",
        "takeaway": "Absolute path starts at / ; relative path starts from the cwd (with . and ..).",
        "visual": "relative-and-absolute-pathnames",
        "algo": [
          "Absolute: begins with '/', read from root",
          "Relative: begins from the current directory",
          "'.' = current dir, '..' = parent",
          "Both resolve to a real file"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Absolute from root; relative from cwd (. ..)"
        },
        "dryRun": {
          "input": "cwd=/home/anita, open report",
          "steps": [
            "Relative 'report' = /home/anita/report",
            "Absolute '/home/anita/report' same file",
            "'../bob/x' = /home/bob/x",
            "Both forms valid"
          ],
          "result": "Relative and absolute reach the same file"
        },
        "code": null,
        "mistake": "Using a relative path but forgetting it depends on the current directory."
      },
      {
        "topic": "Relative and absolute pathnames: terminal/program view",
        "terms": [
          "Relative",
          "and",
          "absolute",
          "pathnames"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "relative-and-absolute-pathnames-terminal-program",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "pwd cd mkdir rmdir",
        "terms": [
          "pwd",
          "mkdir",
          "rmdir"
        ],
        "definition": "Directory-navigation commands: pwd prints the current working directory, cd changes it, mkdir creates a directory, rmdir removes an EMPTY directory. cd and pwd operate on the shell's own cwd.",
        "takeaway": "pwd shows where you are, cd moves, mkdir creates, rmdir removes (only empty) directories.",
        "visual": "pwd-cd-mkdir-rmdir",
        "algo": [
          "pwd prints the absolute cwd",
          "cd DIR changes the shell's cwd",
          "mkdir DIR creates a new directory",
          "rmdir DIR removes it only if empty"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Navigate; rmdir needs an empty directory"
        },
        "dryRun": {
          "input": "mkdir p; cd p; pwd; cd ..; rmdir p",
          "steps": [
            "mkdir p creates p",
            "cd p enters it; pwd shows …/p",
            "cd .. goes back",
            "rmdir p removes the now-unused p"
          ],
          "result": "Create, enter, confirm, leave, remove a directory"
        },
        "code": null,
        "mistake": "Using rmdir on a non-empty directory (fails — use rm -r deliberately)."
      },
      {
        "topic": "pwd cd mkdir rmdir: terminal/program view",
        "terms": [
          "pwd",
          "mkdir",
          "rmdir",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "pwd-cd-mkdir-rmdir-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "dot and double-dot notation",
        "terms": [
          "dot",
          "double-dot",
          "notation"
        ],
        "definition": ". refers to the current directory and .. to its parent; both are real entries present in every directory. ./prog runs a program in the current directory; .. climbs one level up the tree.",
        "takeaway": ". = current directory, .. = parent; ./prog runs a local program.",
        "visual": "dot-and-double-dot-notation",
        "algo": [
          "Every directory contains '.' and '..'",
          "'.' points to the directory itself",
          "'..' points to its parent",
          "./name forces the current-directory copy"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "current dir / parent; ./ runs a local program"
        },
        "dryRun": {
          "input": "./script.sh from /home/anita",
          "steps": [
            "'.' = /home/anita",
            "./script.sh = /home/anita/script.sh",
            "Runs the local script",
            "'cd ..' would go to /home"
          ],
          "result": "./ runs the local script; .. moves up"
        },
        "code": null,
        "mistake": "Running ./prog without it — the shell won't find a current-dir program unless . is in PATH (usually not)."
      },
      {
        "topic": "dot and double-dot notation: terminal/program view",
        "terms": [
          "dot",
          "and",
          "double-dot",
          "notation"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "dot-and-double-dot-notation-terminal-program-vie",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "cat mv rm cp wc od",
        "terms": [
          "cat"
        ],
        "definition": "File-manipulation basics: cat concatenates/shows files, cp copies, mv moves/renames, rm deletes, wc counts lines/words/bytes, od dumps bytes (octal/hex) to inspect non-printable content.",
        "takeaway": "cat show, cp copy, mv move/rename, rm delete, wc count, od byte-dump.",
        "visual": "cat-mv-rm-cp-wc-od",
        "algo": [
          "cat FILE prints its contents",
          "cp SRC DST duplicates",
          "mv SRC DST renames/moves",
          "wc counts; od shows raw bytes"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "show·copy·move·delete·count·byte-dump"
        },
        "dryRun": {
          "input": "wc -l file; od -c file",
          "steps": [
            "wc -l counts lines in file",
            "od -c shows each byte as a character",
            "Reveals hidden \\n, \\t, etc.",
            "Useful for binary/whitespace bugs"
          ],
          "result": "wc counts; od exposes the raw bytes"
        },
        "code": null,
        "mistake": "Using cat on a binary file (garbles the terminal) instead of od."
      },
      {
        "topic": "cat mv rm cp wc od: terminal/program view",
        "terms": [
          "cat",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "cat-mv-rm-cp-wc-od-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      }
    ],
    "checkpoints": [
      {
        "label": "Start with why the module matters.",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Unix components and architecture",
        "bigO": "kernel core",
        "why": "hardware→kernel→shell→user; kernel owns hardware"
      },
      {
        "label": "Unix components and architecture: terminal/program view",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Features of Unix",
        "bigO": "small tools+pipes",
        "why": "Multiuser·multitasking·everything-is-a-file"
      },
      {
        "label": "Features of Unix: terminal/program view",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "UNIX environment and structure",
        "bigO": "inherited env",
        "why": "vars+cwd+fds; children inherit a copy"
      }
    ]
  },
  {
    "n": 2,
    "id": "module-2",
    "title": "Permissions, Shell Interpretation and Shell Programming",
    "hours": 8,
    "question": "How do permissions, pipes and scripts control the shell?",
    "story": [
      "Perms",
      "Pipes",
      "Regex",
      "Scripts"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "File attributes and permissions",
      "File attributes and permissions: terminal/program view",
      "ls options",
      "ls options: terminal/program view",
      "Changing permissions relatively and absolutely",
      "Changing permissions relatively and absolutely: terminal/program view",
      "Recursive permission changes",
      "Recursive permission changes: terminal/program view",
      "Directory permissions",
      "Directory permissions: terminal/program view",
      "Shell interpretive cycle",
      "Shell interpretive cycle: terminal/program view",
      "Wild cards",
      "Wild cards: terminal/program view",
      "Escaping special meanings",
      "Escaping special meanings: terminal/program view",
      "Standard files and redirection",
      "Standard files and redirection: terminal/program view",
      "Pipes",
      "Pipes: terminal/program view",
      "Basic and extended regular expressions",
      "Basic and extended regular expressions: terminal/program view",
      "grep and egrep",
      "grep and egrep: terminal/program view",
      "Shell variables",
      "Shell variables: terminal/program view",
      "profile",
      "profile: terminal/program view",
      "read and readonly",
      "read and readonly: terminal/program view",
      "Command line arguments",
      "Command line arguments: terminal/program view",
      "exit status",
      "exit status: terminal/program view",
      "Logical operators",
      "Logical operators: terminal/program view",
      "test command",
      "test command: terminal/program view",
      "if while for case",
      "if while for case: terminal/program view",
      "set and shift",
      "set and shift: terminal/program view",
      "here document",
      "here document: terminal/program view",
      "trap",
      "trap: terminal/program view",
      "Simple shell programs",
      "Simple shell programs: terminal/program view"
    ],
    "notes": "Aligned to BCS515C Module_2 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "start-with-why-the-module-matters",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "File attributes and permissions",
        "terms": [
          "File",
          "attributes",
          "permissions"
        ],
        "definition": "ls -l shows permissions as rwxrwxrwx in three triplets — owner, group, others — each granting read(r), write(w), execute(x). Plus owner, group, size and timestamps. The kernel checks these on every file access.",
        "takeaway": "rwx × (owner, group, others): r=read, w=write, x=execute — the kernel checks them per access.",
        "visual": "file-attributes-and-permissions",
        "algo": [
          "ls -l prints type + 9 permission bits",
          "First triplet = owner rights",
          "Second = group rights",
          "Third = others rights"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "owner/group/others × read/write/execute"
        },
        "dryRun": {
          "input": "-rwxr-xr-- for file.sh",
          "steps": [
            "Owner: rwx (read/write/execute)",
            "Group: r-x (read/execute, no write)",
            "Others: r-- (read only)",
            "Kernel enforces per user class"
          ],
          "result": "Nine bits map to owner/group/others read/write/execute"
        },
        "code": null,
        "mistake": "Reading all nine bits as one set instead of three separate user-class triplets."
      },
      {
        "topic": "File attributes and permissions: terminal/program view",
        "terms": [
          "File",
          "attributes",
          "and",
          "permissions"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "file-attributes-and-permissions-terminal-program",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "ls options",
        "terms": [
          "options"
        ],
        "definition": "ls options change the listing: -l long (permissions, owner, size, time), -a all incl. hidden, -R recursive, -t sort by time, -r reverse, -i show inode, -d directory itself. They combine (ls -lart).",
        "takeaway": "-l long, -a hidden, -R recursive, -t by time, -i inode — combinable (ls -lart).",
        "visual": "ls-options",
        "algo": [
          "-l for the detailed columns",
          "-a to include dotfiles",
          "-t / -r to sort by time / reverse",
          "Combine flags: ls -lart"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "long·all·recursive·time-sort·inode; combinable"
        },
        "dryRun": {
          "input": "ls -lt",
          "steps": [
            "-l gives long format",
            "-t sorts newest first",
            "Most recent file at top",
            "Add -r to put oldest first"
          ],
          "result": "Long listing sorted by modification time"
        },
        "code": null,
        "mistake": "Forgetting -a, so hidden config files seem to be missing."
      },
      {
        "topic": "ls options: terminal/program view",
        "terms": [
          "options",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "ls-options-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Changing permissions relatively and absolutely",
        "terms": [
          "Changing",
          "permissions",
          "relatively"
        ],
        "definition": "chmod sets permissions two ways. Symbolic (relative): chmod u+x,go-w file adds/removes bits for user/group/other. Octal (absolute): chmod 754 sets rwx=7(owner), r-x=5(group), r--=4(other), where r=4,w=2,x=1.",
        "takeaway": "chmod symbolic (u+x, go-w) adjusts bits; octal (754) sets them absolutely, r=4 w=2 x=1.",
        "visual": "changing-permissions-relatively-and-absolutely",
        "algo": [
          "Symbolic: who(u/g/o) +/- perms(r/w/x)",
          "Octal: add r=4,w=2,x=1 per triplet",
          "754 = 7(rwx),5(r-x),4(r--)",
          "chmod applies the new mode"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Symbolic +/- vs octal (754) absolute set"
        },
        "dryRun": {
          "input": "chmod 640 secret.txt",
          "steps": [
            "Owner 6 = rw-",
            "Group 4 = r--",
            "Others 0 = ---",
            "Result -rw-r-----"
          ],
          "result": "640 → owner read/write, group read, others nothing"
        },
        "code": null,
        "mistake": "Miscomputing octal (e.g. thinking 7 = rw-) — remember r4 w2 x1, so 7 = rwx."
      },
      {
        "topic": "Changing permissions relatively and absolutely: terminal/program view",
        "terms": [
          "Changing",
          "permissions",
          "relatively",
          "and"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "changing-permissions-relatively-and-absolutely-t",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Recursive permission changes",
        "terms": [
          "Recursive",
          "permission",
          "changes"
        ],
        "definition": "chmod -R applies a mode to a directory and everything beneath it. Powerful but dangerous: applying execute to all files (chmod -R 777) or stripping it from directories can break access. Prefer find with -type to target files vs dirs.",
        "takeaway": "chmod -R changes a whole subtree — use find -type to treat files and directories differently.",
        "visual": "recursive-permission-changes",
        "algo": [
          "chmod -R MODE dir descends the tree",
          "Every file and subdir gets MODE",
          "Dirs need x to be entered — beware stripping it",
          "Use find … -type d/f for precise control"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Applies to all descendants; dirs need x to enter"
        },
        "dryRun": {
          "input": "chmod -R 755 site/",
          "steps": [
            "site/ and all subdirs become rwxr-xr-x",
            "All files become rwxr-xr-x too",
            "Files now wrongly executable",
            "Better: find files → 644, dirs → 755"
          ],
          "result": "Recursive mode hits files and dirs alike — often not what you want"
        },
        "code": null,
        "mistake": "chmod -R 777 (world-writable everything) as a 'fix' — a serious security hole."
      },
      {
        "topic": "Recursive permission changes: terminal/program view",
        "terms": [
          "Recursive",
          "permission",
          "changes",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "recursive-permission-changes-terminal-program-vi",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Directory permissions",
        "terms": [
          "Directory",
          "permissions"
        ],
        "definition": "On a directory the bits mean: r = list names, w = create/delete entries, x = enter/traverse (access files inside). You can have x without r (traverse but not list), and w is useless without x.",
        "takeaway": "Directory rwx: r=list, w=add/remove entries, x=enter. x without r = traverse-only.",
        "visual": "directory-permissions",
        "algo": [
          "r: read the list of names",
          "w: create or delete entries inside",
          "x: cd into / access files by name",
          "Deleting a file needs w+x on the directory, not on the file"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Directory bits differ from file bits"
        },
        "dryRun": {
          "input": "dir with --x (x only)",
          "steps": [
            "No r → can't list names",
            "x → can cd in if you know a name",
            "Access /dir/known.txt works",
            "ls /dir fails (permission denied)"
          ],
          "result": "x-only directory: traverse yes, list no"
        },
        "code": null,
        "mistake": "Assuming you need write permission on a FILE to delete it — you need w+x on its DIRECTORY."
      },
      {
        "topic": "Directory permissions: terminal/program view",
        "terms": [
          "Directory",
          "permissions",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "directory-permissions-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Shell interpretive cycle",
        "terms": [
          "Shell",
          "interpretive",
          "cycle"
        ],
        "definition": "For every command the shell runs a fixed cycle: read the line, split into words, expand wildcards/variables/command-substitution, set up redirection, locate the command, fork+exec it (or run a builtin), then wait and read the next line.",
        "takeaway": "Read → tokenize → expand (wildcards/vars) → redirect → locate → fork/exec → wait — repeated per command.",
        "visual": "shell-interpretive-cycle",
        "algo": [
          "Read a line and split into words",
          "Expand *?[], $vars, `cmd`",
          "Apply <, >, | redirection",
          "Locate + fork/exec, then wait"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Shell expands wildcards/vars before exec"
        },
        "dryRun": {
          "input": "echo $HOME/*.txt",
          "steps": [
            "Split into words",
            "Expand $HOME and the *.txt wildcard",
            "No redirection needed",
            "echo runs on the expanded list"
          ],
          "result": "Shell expands BEFORE the command ever sees its arguments"
        },
        "code": null,
        "mistake": "Thinking the command expands its own wildcards — the SHELL expands them first."
      },
      {
        "topic": "Shell interpretive cycle: terminal/program view",
        "terms": [
          "Shell",
          "interpretive",
          "cycle",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "shell-interpretive-cycle-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Wild cards",
        "terms": [
          "Wild",
          "cards"
        ],
        "definition": "Shell wildcards (globbing) match filenames: * any string, ? any single char, [abc] any listed char, [a-z] a range, [!x] negation. The shell expands them to matching names before running the command.",
        "takeaway": "* any run, ? one char, [set]/[a-z] a class — the shell expands globs to filenames.",
        "visual": "wild-cards",
        "algo": [
          "Shell scans the current directory",
          "* matches any sequence (incl. empty)",
          "? matches exactly one character",
          "[...] matches one char from the set/range"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Filename globbing expanded by the shell"
        },
        "dryRun": {
          "input": "ls *.c",
          "steps": [
            "* matches any prefix",
            "'.c' fixed suffix",
            "Expands to a.c b.c main.c",
            "ls receives the expanded list"
          ],
          "result": "*.c → all C source files"
        },
        "code": null,
        "mistake": "Expecting * to match leading dots (hidden files) — it doesn't by default."
      },
      {
        "topic": "Wild cards: terminal/program view",
        "terms": [
          "Wild",
          "cards",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "wild-cards-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Escaping special meanings",
        "terms": [
          "Escaping",
          "special",
          "meanings"
        ],
        "definition": "To use a metacharacter literally, escape it: \\ escapes one char, 'single quotes' protect everything literally, \"double quotes\" protect most but still allow $ and `…`. This stops the shell from expanding *, $, spaces, etc.",
        "takeaway": "\\ one char, 'hard' quotes = literal, \"soft\" quotes = literal except $ and backticks.",
        "visual": "escaping-special-meanings",
        "algo": [
          "\\c makes c literal",
          "'…' disables all expansion inside",
          "\"…\" allows $var and `cmd` but not globbing",
          "Choose the level of protection you need"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Escape/hard-quote/soft-quote control expansion"
        },
        "dryRun": {
          "input": "echo '$HOME' vs echo \"$HOME\"",
          "steps": [
            "'$HOME' → literal $HOME",
            "\"$HOME\" → /home/anita",
            "Single quotes block expansion",
            "Double quotes allow variable expansion"
          ],
          "result": "Quote type decides whether $HOME expands"
        },
        "code": null,
        "mistake": "Using double quotes when you meant literal — $ and backticks still expand inside them."
      },
      {
        "topic": "Escaping special meanings: terminal/program view",
        "terms": [
          "Escaping",
          "special",
          "meanings",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "escaping-special-meanings-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Standard files and redirection",
        "terms": [
          "Standard",
          "files",
          "redirection"
        ],
        "definition": "Every process starts with three open file descriptors: 0 stdin, 1 stdout, 2 stderr. Redirection reassigns them: < file (stdin), > file (stdout, overwrite), >> (append), 2> (stderr). The program is unaware — it just reads/writes its fds.",
        "takeaway": "fd 0/1/2 = stdin/stdout/stderr; < > >> 2> reassign them to files without changing the program.",
        "visual": "standard-files-and-redirection",
        "algo": [
          "Program reads fd 0, writes fd 1, errors fd 2",
          "'> file' points fd 1 at a file",
          "'2> file' points fd 2 at a file",
          "'< file' feeds fd 0 from a file"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Reassign stdin/stdout/stderr to files"
        },
        "dryRun": {
          "input": "sort < in.txt > out.txt 2> err.log",
          "steps": [
            "fd0 reads from in.txt",
            "fd1 writes to out.txt",
            "fd2 (errors) go to err.log",
            "sort code is unchanged"
          ],
          "result": "Same program, its three streams redirected to files"
        },
        "code": null,
        "mistake": "Forgetting stderr (2>) so error messages still spill to the terminal."
      },
      {
        "topic": "Standard files and redirection: terminal/program view",
        "terms": [
          "Standard",
          "files",
          "and",
          "redirection"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "standard-files-and-redirection-terminal-program-",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Pipes",
        "terms": [
          "Pipes"
        ],
        "definition": "A pipe (|) connects the standard output of one process to the standard input of the next: the kernel creates a buffer, process A writes into it, process B reads from it, and they run concurrently. Data flows A → pipe → B.",
        "takeaway": "cmdA | cmdB — A's stdout becomes B's stdin through a kernel buffer; both run at once.",
        "visual": "pipes",
        "algo": [
          "Kernel creates a pipe buffer",
          "A's fd 1 (stdout) → write end",
          "B's fd 0 (stdin) → read end",
          "A produces while B consumes, concurrently"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "stdout→stdin via kernel buffer; concurrent"
        },
        "dryRun": {
          "input": "ls | wc -l",
          "steps": [
            "ls writes filenames to the pipe",
            "wc reads them from the pipe",
            "wc -l counts the lines",
            "Number of files printed"
          ],
          "result": "ls output streams into wc without a temp file"
        },
        "code": null,
        "mistake": "Thinking data is stored in a temp file — a pipe is an in-memory buffer between live processes."
      },
      {
        "topic": "Pipes: terminal/program view",
        "terms": [
          "Pipes",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "pipes-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Basic and extended regular expressions",
        "terms": [
          "Basic",
          "extended",
          "regular"
        ],
        "definition": "Regular expressions match text patterns. BRE (grep): . any char, * zero-or-more, ^ start, $ end, [..] class, \\{n\\} counts. ERE (grep -E/egrep) adds +, ?, |, () without backslashes. Used by grep, sed, awk.",
        "takeaway": "BRE: . * ^ $ [ ] ; ERE adds + ? | ( ) unescaped — patterns for grep/sed/awk.",
        "visual": "basic-and-extended-regular-expressions",
        "algo": [
          "Anchor with ^ (start) and $ (end)",
          "'.' matches any one character",
          "'*' repeats the previous atom",
          "ERE adds +, ?, alternation | and groups ()"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": ". * ^ $ [ ] ; ERE adds + ? | ( )"
        },
        "dryRun": {
          "input": "grep -E '^(a|b)+$' file",
          "steps": [
            "^ … $ anchors the whole line",
            "(a|b) matches a or b",
            "+ requires one or more",
            "Lines of only a's and b's match"
          ],
          "result": "ERE matches lines made only of a/b"
        },
        "code": null,
        "mistake": "Using +, ?, | in BRE without backslashes (or -E), so they're taken literally."
      },
      {
        "topic": "Basic and extended regular expressions: terminal/program view",
        "terms": [
          "Basic",
          "and",
          "extended",
          "regular"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "basic-and-extended-regular-expressions-terminal-",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "grep and egrep",
        "terms": [
          "grep",
          "egrep"
        ],
        "definition": "grep prints lines matching a pattern; grep -E (egrep) uses extended regex. Key options: -i ignore case, -v invert (non-matching), -n line numbers, -c count, -w whole word, -l list files. It filters streams line by line.",
        "takeaway": "grep filters lines by pattern; -i, -v, -n, -c, -w, -l control the match; -E for ERE.",
        "visual": "grep-and-egrep",
        "algo": [
          "Read input line by line",
          "Test each line against the regex",
          "Print matching lines (or -v for non-matching)",
          "Options adjust case/count/output"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Line filter; -E = extended regex"
        },
        "dryRun": {
          "input": "grep -in error log",
          "steps": [
            "-i ignores case",
            "matches Error, ERROR, error",
            "-n prefixes line numbers",
            "Matching lines printed with numbers"
          ],
          "result": "Case-insensitive, numbered matches of 'error'"
        },
        "code": null,
        "mistake": "Forgetting to quote the pattern, so the shell expands metacharacters before grep sees them."
      },
      {
        "topic": "grep and egrep: terminal/program view",
        "terms": [
          "grep",
          "and",
          "egrep",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "grep-and-egrep-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Shell variables",
        "terms": [
          "Shell",
          "variables"
        ],
        "definition": "Shell variables store values: name=value (no spaces around =), accessed as $name. Local by default (this shell only); export makes them environment variables inherited by children. Special vars: $?, $$, $0, $1…, $#, $*.",
        "takeaway": "name=value (no spaces); $name reads it; export puts it in the environment for children.",
        "visual": "shell-variables",
        "algo": [
          "Assign with name=value",
          "Read with $name or ${name}",
          "export name → child processes inherit it",
          "Special vars carry status/args"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Local by default; export → inherited by children"
        },
        "dryRun": {
          "input": "x=5; export x; bash -c 'echo $x'",
          "steps": [
            "x=5 sets a local variable",
            "export x adds it to the environment",
            "child bash inherits x",
            "echo prints 5"
          ],
          "result": "export makes the variable visible to child processes"
        },
        "code": null,
        "mistake": "Putting spaces around = (x = 5) — the shell then treats x as a command."
      },
      {
        "topic": "Shell variables: terminal/program view",
        "terms": [
          "Shell",
          "variables",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "shell-variables-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "profile",
        "terms": [
          "profile"
        ],
        "definition": "Login startup files configure the environment: /etc/profile (system-wide) then a per-user file (~/.profile or ~/.bash_profile) run at login; ~/.bashrc runs for each interactive non-login shell. They set PATH, prompts, aliases.",
        "takeaway": "/etc/profile + ~/.profile run at login; ~/.bashrc per interactive shell — they set PATH/aliases/prompt.",
        "visual": "profile",
        "algo": [
          "Login shell runs /etc/profile",
          "Then the user's ~/.profile / .bash_profile",
          "Interactive shells run ~/.bashrc",
          "These export PATH, set aliases and prompt"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Login vs interactive startup files set the environment"
        },
        "dryRun": {
          "input": "Add export PATH=$PATH:~/bin to ~/.profile",
          "steps": [
            "Edit ~/.profile",
            "Log out and back in",
            "Login runs ~/.profile",
            "~/bin is now on PATH"
          ],
          "result": "Startup file makes the PATH change permanent"
        },
        "code": null,
        "mistake": "Putting login-only settings in ~/.bashrc (or vice versa) and wondering why they don't apply."
      },
      {
        "topic": "profile: terminal/program view",
        "terms": [
          "profile",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "profile-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "read and readonly",
        "terms": [
          "read",
          "readonly"
        ],
        "definition": "read var reads a line from standard input into a variable (splitting on IFS for multiple vars) — the way a script gets interactive input. readonly var marks a variable constant so further assignment fails.",
        "takeaway": "read gets a line of input into variable(s); readonly locks a variable against change.",
        "visual": "read-and-readonly",
        "algo": [
          "read NAME waits for a line of input",
          "Value stored in NAME (IFS splits multiples)",
          "readonly NAME makes it constant",
          "Later assignment to it errors"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Input into a variable; readonly locks it"
        },
        "dryRun": {
          "input": "read n; echo hi $n",
          "steps": [
            "Script pauses at read",
            "User types Anita",
            "n=Anita",
            "echo prints 'hi Anita'"
          ],
          "result": "read captures interactive input into a variable"
        },
        "code": null,
        "mistake": "Expecting read to return a value like a function — it sets variables from stdin."
      },
      {
        "topic": "read and readonly: terminal/program view",
        "terms": [
          "read",
          "and",
          "readonly",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "read-and-readonly-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Command line arguments",
        "terms": [
          "Command",
          "line",
          "arguments"
        ],
        "definition": "A script receives its arguments in positional parameters: $0 is the script name, $1…$9 the arguments, ${10}+ beyond nine, $# the count, $* / $@ all of them, shift discards $1 and renumbers.",
        "takeaway": "$0 name, $1..$9 args, $# count, $@ all, shift drops $1 — how scripts read their command line.",
        "visual": "command-line-arguments",
        "algo": [
          "$0 = script name",
          "$1,$2,… = individual arguments",
          "$# = number of arguments",
          "$@ = all args; shift renumbers them"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Positional parameters; shift renumbers"
        },
        "dryRun": {
          "input": "./s.sh a b c",
          "steps": [
            "$0=./s.sh",
            "$1=a, $2=b, $3=c",
            "$#=3",
            "$@ = a b c"
          ],
          "result": "Positional parameters expose the command line to the script"
        },
        "code": null,
        "mistake": "Confusing $0 (the script name) with $1 (the first real argument)."
      },
      {
        "topic": "Command line arguments: terminal/program view",
        "terms": [
          "Command",
          "line",
          "arguments",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "command-line-arguments-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "exit status",
        "terms": [
          "exit",
          "status"
        ],
        "definition": "Every command returns an exit status (0–255): 0 means success, non-zero means failure. The shell stores the last status in $?; scripts test it (or use it in if/&&/||) to make decisions. exit N sets a script's status.",
        "takeaway": "$? holds the last command's exit status: 0 = success, non-zero = failure.",
        "visual": "exit-status",
        "algo": [
          "Command finishes and returns a status",
          "0 = success, non-zero = a specific error",
          "$? holds that value",
          "if/&&/|| branch on it"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Exit status: 0 success, non-zero failure"
        },
        "dryRun": {
          "input": "grep x file; echo $?",
          "steps": [
            "grep searches for x",
            "Found → exit 0",
            "Not found → exit 1",
            "echo $? prints 0 or 1"
          ],
          "result": "$? distinguishes match (0) from no-match (1)"
        },
        "code": null,
        "mistake": "Reading $? after another command has already overwritten it — capture it immediately."
      },
      {
        "topic": "exit status: terminal/program view",
        "terms": [
          "exit",
          "status",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "exit-status-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Logical operators",
        "terms": [
          "Logical",
          "operators"
        ],
        "definition": "&& and || chain commands by exit status: A && B runs B only if A succeeded (exit 0); A || B runs B only if A failed (non-zero). They give one-line conditional logic without an if.",
        "takeaway": "&& = 'and then, if success'; || = 'or else, on failure' — conditional command chaining.",
        "visual": "logical-operators",
        "algo": [
          "Run A and inspect its exit status",
          "&&: run B only if A returned 0",
          "||: run B only if A returned non-zero",
          "Chain them for concise logic"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Run-on-success / run-on-failure chaining"
        },
        "dryRun": {
          "input": "test -f f && echo yes || echo no",
          "steps": [
            "test -f f checks the file exists",
            "Exists (0) → && runs echo yes",
            "Missing (1) → || runs echo no",
            "One-line if/else"
          ],
          "result": "Prints yes if the file exists, else no"
        },
        "code": null,
        "mistake": "Chaining cmd && a || b and assuming b runs only when cmd fails — b also runs if a fails."
      },
      {
        "topic": "Logical operators: terminal/program view",
        "terms": [
          "Logical",
          "operators",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "logical-operators-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "test command",
        "terms": [
          "test",
          "command"
        ],
        "definition": "test (also [ ]) evaluates a condition and returns an exit status. It checks files (-f regular, -d dir, -e exists, -r/-w/-x perms), strings (=, !=, -z, -n), and numbers (-eq -ne -lt -gt -le -ge). Used in if/while.",
        "takeaway": "test / [ ] returns 0/1 for file, string and numeric conditions — the engine behind if.",
        "visual": "test-command",
        "algo": [
          "Choose the operator (-f, =, -eq …)",
          "test evaluates the condition",
          "Returns 0 (true) or 1 (false)",
          "if/while branch on that status"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "File/string/numeric tests → exit status for if"
        },
        "dryRun": {
          "input": "[ 5 -gt 3 ]; echo $?",
          "steps": [
            "Numeric test 5 -gt 3",
            "5 > 3 is true",
            "Exit status 0",
            "echo prints 0"
          ],
          "result": "Numeric comparison yields a true (0) status"
        },
        "code": null,
        "mistake": "Using = for numbers or -eq for strings, and omitting spaces inside [ ] (they're required)."
      },
      {
        "topic": "test command: terminal/program view",
        "terms": [
          "test",
          "command",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "test-command-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "if while for case",
        "terms": [
          "while",
          "case"
        ],
        "definition": "Shell control structures branch on exit status. if runs then-branch on success; while loops while a command succeeds; for iterates over a word list; case matches a value against glob patterns. Blocks close with fi/done/esac.",
        "takeaway": "if (branch on status), while (loop on status), for (over a list), case (glob match) — close with fi/done/esac.",
        "visual": "if-while-for-case",
        "algo": [
          "if cmd; then … fi — branch on cmd's status",
          "while cmd; do … done — loop while success",
          "for v in list; do … done — iterate",
          "case $v in pat) … esac — pattern match"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Branch/loop/iterate/match on exit status"
        },
        "dryRun": {
          "input": "for f in *.txt; do echo $f; done",
          "steps": [
            "Shell expands *.txt to a list",
            "for binds f to each name",
            "echo prints each",
            "Loop ends after the list"
          ],
          "result": "Iterates over every .txt file"
        },
        "code": null,
        "mistake": "Forgetting the ; before then/do, or the closing fi/done/esac."
      },
      {
        "topic": "if while for case: terminal/program view",
        "terms": [
          "while",
          "for",
          "case",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "if-while-for-case-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "set and shift",
        "terms": [
          "set",
          "shift"
        ],
        "definition": "set assigns the positional parameters ($1,$2,…) from its arguments (or sets shell options like set -x for tracing). shift discards $1 and renumbers the rest down by one, the standard way to walk an argument list.",
        "takeaway": "set reassigns $1,$2,… (or shell options); shift drops $1 and shifts the rest left.",
        "visual": "set-and-shift",
        "algo": [
          "set a b c → $1=a,$2=b,$3=c",
          "set -x enables command tracing",
          "shift removes $1",
          "$2 becomes $1, and so on"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Set positionals; shift renumbers them left"
        },
        "dryRun": {
          "input": "set p q r; shift; echo $1",
          "steps": [
            "$1=p,$2=q,$3=r",
            "shift discards p",
            "q becomes $1",
            "echo prints q"
          ],
          "result": "shift walks the parameter list one step"
        },
        "code": null,
        "mistake": "Looping with shift but not decrementing/checking $#, causing an infinite or short loop."
      },
      {
        "topic": "set and shift: terminal/program view",
        "terms": [
          "set",
          "and",
          "shift",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "set-and-shift-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "here document",
        "terms": [
          "here",
          "document"
        ],
        "definition": "A here-document (<<WORD … WORD) feeds an inline block of text as a command's standard input, ending at the delimiter word. <<- strips leading tabs; quoting the word (<<'EOF') disables variable expansion inside.",
        "takeaway": "cmd <<EOF … EOF supplies inline stdin; <<- trims tabs; <<'EOF' turns off expansion.",
        "visual": "here-document",
        "algo": [
          "Write cmd <<WORD",
          "Lines until WORD become stdin",
          "Variables expand unless WORD is quoted",
          "WORD on its own line ends the block"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Inline stdin block; <<- trims tabs; quote disables $"
        },
        "dryRun": {
          "input": "cat <<EOF\\nhi $USER\\nEOF",
          "steps": [
            "Text block starts after <<EOF",
            "$USER expands to the login name",
            "EOF ends the input",
            "cat prints 'hi anita'"
          ],
          "result": "Inline text (with expansion) fed to cat"
        },
        "code": null,
        "mistake": "Indenting the closing delimiter (without <<-) so the shell never sees the terminator."
      },
      {
        "topic": "here document: terminal/program view",
        "terms": [
          "here",
          "document",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "here-document-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "trap",
        "terms": [
          "trap"
        ],
        "definition": "trap 'action' SIGNAL runs a handler when the shell receives a signal (e.g. INT from Ctrl-C, EXIT on termination). It is used to clean up temp files or ignore interrupts, keeping scripts robust.",
        "takeaway": "trap 'cleanup' INT TERM EXIT — run an action on a signal; the way scripts clean up or ignore Ctrl-C.",
        "visual": "trap",
        "algo": [
          "Register: trap 'cmds' SIGNAL",
          "Script runs normally",
          "On the signal, cmds execute",
          "trap '' SIG ignores; trap - SIG resets"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Run handler on signal; used for cleanup"
        },
        "dryRun": {
          "input": "trap 'rm -f $tmp' EXIT",
          "steps": [
            "Create a temp file $tmp",
            "Register the trap on EXIT",
            "Script ends (any way)",
            "rm -f removes the temp file"
          ],
          "result": "Temp file cleaned up however the script exits"
        },
        "code": null,
        "mistake": "Trapping a signal that can't be caught (KILL/9) or forgetting EXIT for cleanup."
      },
      {
        "topic": "trap: terminal/program view",
        "terms": [
          "trap",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "trap-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Simple shell programs",
        "terms": [
          "Simple",
          "shell",
          "programs"
        ],
        "definition": "A shell script is a text file of commands with a #! (shebang) first line naming the interpreter (#!/bin/bash), made executable with chmod +x. It combines variables, arguments, tests and loops into a reusable command.",
        "takeaway": "Script = #!/bin/bash + commands, chmod +x to run; combine vars, args, tests, loops.",
        "visual": "simple-shell-programs",
        "algo": [
          "First line: #!/bin/bash (interpreter)",
          "Write commands using $1, tests, loops",
          "chmod +x script.sh",
          "Run ./script.sh args"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Shebang picks interpreter; combine vars/tests/loops"
        },
        "dryRun": {
          "input": "A backup script",
          "steps": [
            "#!/bin/bash shebang",
            "Read source dir from $1",
            "for each file, cp to backup/",
            "exit 0 on success"
          ],
          "result": "Reusable command built from shell features"
        },
        "code": null,
        "mistake": "Omitting the shebang or execute bit, so the file won't run as a command."
      },
      {
        "topic": "Simple shell programs: terminal/program view",
        "terms": [
          "Simple",
          "shell",
          "programs",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "simple-shell-programs-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      }
    ],
    "checkpoints": [
      {
        "label": "Start with why the module matters.",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "File attributes and permissions",
        "bigO": "rwx rwx rwx",
        "why": "owner/group/others × read/write/execute"
      },
      {
        "label": "File attributes and permissions: terminal/program view",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "ls options",
        "bigO": "-l -a -R -t -i",
        "why": "long·all·recursive·time-sort·inode; combinable"
      },
      {
        "label": "ls options: terminal/program view",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Changing permissions relatively and absolutely",
        "bigO": "r4 w2 x1",
        "why": "Symbolic +/- vs octal (754) absolute set"
      }
    ]
  },
  {
    "n": 3,
    "id": "module-3",
    "title": "Unix Standardization, File I/O and Process Environment",
    "hours": 8,
    "question": "How do processes see files, memory and the environment?",
    "story": [
      "POSIX",
      "I/O",
      "Memory",
      "Environ"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Unix standardization",
      "Unix standardization: terminal/program view",
      "UNIX system implementation",
      "UNIX system implementation: terminal/program view",
      "File descriptors",
      "File descriptors: terminal/program view",
      "open create read write close",
      "open create read write close: terminal/program view",
      "fcntl",
      "fcntl: terminal/program view",
      "mkdir and rmdir",
      "mkdir and rmdir: terminal/program view",
      "Reading directories",
      "Reading directories: terminal/program view",
      "chdir fchdir getcwd",
      "chdir fchdir getcwd: terminal/program view",
      "Device special files",
      "Device special files: terminal/program view",
      "main function",
      "main function: terminal/program view",
      "Process termination",
      "Process termination: terminal/program view",
      "Command-line arguments",
      "Command-line arguments: terminal/program view",
      "Environment list",
      "Environment list: terminal/program view",
      "C program memory layout",
      "C program memory layout: terminal/program view",
      "Shared libraries",
      "Shared libraries: terminal/program view",
      "Memory allocation",
      "Memory allocation: terminal/program view",
      "Environment variables",
      "Environment variables: terminal/program view",
      "setjmp and longjmp",
      "setjmp and longjmp: terminal/program view",
      "getrlimit and setrlimit",
      "getrlimit and setrlimit: terminal/program view"
    ],
    "notes": "Aligned to BCS515C Module_3 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "start-with-why-the-module-matters",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Unix standardization",
        "terms": [
          "Unix",
          "standardization"
        ],
        "definition": "Standards keep Unix programs portable: ISO C defines the language/library, POSIX.1 defines the OS system-call interface, and the Single UNIX Specification (XSI) extends it. Feature-test macros (_POSIX_C_SOURCE) select which interfaces are visible.",
        "takeaway": "ISO C + POSIX.1 + SUS define the portable interface; feature-test macros select it at compile time.",
        "visual": "unix-standardization",
        "algo": [
          "ISO C standardizes language + C library",
          "POSIX.1 standardizes OS system calls",
          "SUS/XSI adds extensions",
          "Feature-test macros expose the chosen set"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Standard interface; feature-test macros select it"
        },
        "dryRun": {
          "input": "#define _POSIX_C_SOURCE 200809L",
          "steps": [
            "Set the macro before includes",
            "Headers expose POSIX.1-2008 APIs",
            "Only standard calls compile",
            "Code ports across systems"
          ],
          "result": "Standards + macros give portable, well-defined APIs"
        },
        "code": null,
        "mistake": "Relying on limits as compile-time constants when some are runtime (sysconf/pathconf)."
      },
      {
        "topic": "Unix standardization: terminal/program view",
        "terms": [
          "Unix",
          "standardization",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "unix-standardization-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "UNIX system implementation",
        "terms": [
          "UNIX",
          "system",
          "implementation"
        ],
        "definition": "Stevens frames Unix around the kernel providing services to processes via ~5 system-call groups: file I/O, process control, signals, IPC and memory. Library functions are built ON TOP of system calls; the boundary is the trap into the kernel.",
        "takeaway": "Everything sits on system calls (the kernel boundary); library functions wrap them.",
        "visual": "unix-system-implementation",
        "algo": [
          "Application calls a library function",
          "Library may call a system call",
          "System call traps into the kernel",
          "Kernel services it and returns"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Kernel services via traps; libraries wrap them"
        },
        "dryRun": {
          "input": "printf then write",
          "steps": [
            "printf formats in user space",
            "Buffers, then calls write()",
            "write() traps to the kernel",
            "Kernel sends bytes to the terminal"
          ],
          "result": "Library (printf) layered over the system call (write)"
        },
        "code": null,
        "mistake": "Confusing a library function (fopen) with the system call it uses (open)."
      },
      {
        "topic": "UNIX system implementation: terminal/program view",
        "terms": [
          "UNIX",
          "system",
          "implementation",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "unix-system-implementation-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "File descriptors",
        "terms": [
          "File",
          "descriptors"
        ],
        "definition": "A file descriptor is a small non-negative integer the kernel returns from open(); it indexes the process's file-descriptor table. 0,1,2 are stdin/stdout/stderr by convention. All file I/O system calls take an fd.",
        "takeaway": "An fd is an int index into the per-process open-file table; 0/1/2 = stdin/out/err.",
        "visual": "file-descriptors",
        "algo": [
          "open() returns the lowest free fd",
          "fd indexes the descriptor table",
          "read/write/lseek/close take the fd",
          "close() frees it for reuse"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "fd indexes the open-file table; 0/1/2 std streams"
        },
        "dryRun": {
          "input": "fd = open('f',O_RDONLY)",
          "steps": [
            "Kernel finds lowest free fd (say 3)",
            "Returns 3",
            "read(3,…) reads from f",
            "close(3) frees the descriptor"
          ],
          "result": "open→fd 3, used by all later I/O on that file"
        },
        "code": null,
        "mistake": "Leaking descriptors by not closing them — eventually hitting the per-process limit."
      },
      {
        "topic": "File descriptors: terminal/program view",
        "terms": [
          "File",
          "descriptors",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "file-descriptors-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "open create read write close",
        "terms": [
          "open",
          "create",
          "read",
          "write"
        ],
        "definition": "The core file-I/O system calls: open() (with flags O_RDONLY/O_WRONLY/O_CREAT/O_APPEND) returns an fd; read(fd,buf,n)/write(fd,buf,n) transfer bytes and return the count; lseek repositions; close(fd) releases. These are unbuffered, direct kernel calls.",
        "takeaway": "open→fd, read/write return the byte count, lseek repositions, close releases — unbuffered kernel I/O.",
        "visual": "open-create-read-write-close",
        "algo": [
          "open(path, flags[, mode]) → fd",
          "read(fd,buf,n) → bytes read (0 = EOF)",
          "write(fd,buf,n) → bytes written",
          "close(fd) releases the descriptor"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Unbuffered fd-based kernel I/O; count returned"
        },
        "dryRun": {
          "input": "copy in→out",
          "steps": [
            "in=open('in',O_RDONLY); out=open('out',O_WRONLY|O_CREAT,0644)",
            "n=read(in,buf,N) until 0",
            "write(out,buf,n)",
            "close both fds"
          ],
          "result": "A file copy from five system calls"
        },
        "code": null,
        "mistake": "Assuming read fills the buffer — it may return fewer bytes; always loop on the returned count."
      },
      {
        "topic": "open create read write close: terminal/program view",
        "terms": [
          "open",
          "create",
          "read",
          "write"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "open-create-read-write-close-terminal-program-vi",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "fcntl",
        "terms": [
          "fcntl"
        ],
        "definition": "fcntl(fd,cmd,…) manipulates an open descriptor: F_GETFL/F_SETFL change status flags (O_APPEND, O_NONBLOCK), F_GETFD/F_SETFD set close-on-exec, F_DUPFD duplicates, F_SETLK/F_GETLK do record (byte-range) locking.",
        "takeaway": "fcntl changes descriptor properties: flags, close-on-exec, dup, and byte-range record locks.",
        "visual": "fcntl",
        "algo": [
          "F_GETFL reads current status flags",
          "OR in a flag (e.g. O_NONBLOCK)",
          "F_SETFL writes it back",
          "F_SETLK locks a byte range"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Change fd flags, close-on-exec, dup, record locks"
        },
        "dryRun": {
          "input": "Make fd non-blocking",
          "steps": [
            "flags = fcntl(fd,F_GETFL)",
            "flags |= O_NONBLOCK",
            "fcntl(fd,F_SETFL,flags)",
            "read now returns immediately if no data"
          ],
          "result": "Descriptor switched to non-blocking via fcntl"
        },
        "code": null,
        "mistake": "Calling F_SETFL without first F_GETFL, clobbering the other status flags."
      },
      {
        "topic": "fcntl: terminal/program view",
        "terms": [
          "fcntl",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "fcntl-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "mkdir and rmdir",
        "terms": [
          "mkdir",
          "rmdir"
        ],
        "definition": "mkdir(path,mode) creates a directory with the given permission mode (masked by umask); rmdir(path) removes a directory only if it is empty. These are the system-call equivalents of the shell commands.",
        "takeaway": "mkdir(path,mode) makes a directory (mode & ~umask); rmdir removes it only when empty.",
        "visual": "mkdir-and-rmdir",
        "algo": [
          "mkdir(path,mode) — mode filtered by umask",
          "New directory has only . and ..",
          "rmdir(path) checks it is empty",
          "Removes it, or fails with ENOTEMPTY"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Create with mode&~umask; rmdir needs empty"
        },
        "dryRun": {
          "input": "mkdir('d',0755)",
          "steps": [
            "umask 022 → mode becomes 0755",
            "d created with rwxr-xr-x",
            "rmdir('d') on empty d",
            "d removed"
          ],
          "result": "Directory created then removed while empty"
        },
        "code": null,
        "mistake": "Forgetting umask masks the mode, or calling rmdir on a non-empty directory."
      },
      {
        "topic": "mkdir and rmdir: terminal/program view",
        "terms": [
          "mkdir",
          "and",
          "rmdir",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "mkdir-and-rmdir-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Reading directories",
        "terms": [
          "Reading",
          "directories"
        ],
        "definition": "A directory is read with opendir()/readdir()/closedir(): readdir returns one struct dirent per entry (giving d_name and inode). You cannot read a directory with plain read(); the directory API abstracts the on-disk format.",
        "takeaway": "opendir → readdir (one dirent per call) → closedir; you can't plain-read a directory.",
        "visual": "reading-directories",
        "algo": [
          "dp = opendir(path)",
          "Loop readdir(dp) → struct dirent",
          "Use dirent.d_name for each entry",
          "closedir(dp)"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "struct dirent per entry; no plain read()"
        },
        "dryRun": {
          "input": "list names in a dir",
          "steps": [
            "opendir('.')",
            "readdir returns '.', '..', 'a', 'b'",
            "Print each d_name",
            "closedir when NULL returned"
          ],
          "result": "Directory entries enumerated via readdir"
        },
        "code": null,
        "mistake": "Using read() on a directory fd instead of the opendir/readdir API."
      },
      {
        "topic": "Reading directories: terminal/program view",
        "terms": [
          "Reading",
          "directories",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "reading-directories-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "chdir fchdir getcwd",
        "terms": [
          "chdir",
          "fchdir",
          "getcwd"
        ],
        "definition": "chdir(path)/fchdir(fd) change the calling process's current working directory; getcwd(buf,size) returns its absolute pathname. The cwd is a per-process attribute — a child's chdir does not affect the parent.",
        "takeaway": "chdir/fchdir set the process's cwd; getcwd reads it back; cwd is per-process.",
        "visual": "chdir-fchdir-getcwd",
        "algo": [
          "chdir(path) sets the cwd",
          "fchdir(fd) sets it from an open dir fd",
          "getcwd(buf,size) fills the absolute path",
          "Relative paths now resolve from the new cwd"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Per-process cwd; child's change stays local"
        },
        "dryRun": {
          "input": "chdir('/tmp'); getcwd()",
          "steps": [
            "chdir('/tmp') succeeds",
            "cwd is now /tmp",
            "getcwd fills buf with '/tmp'",
            "Relative opens resolve under /tmp"
          ],
          "result": "Process cwd changed and read back"
        },
        "code": null,
        "mistake": "Expecting a child process's chdir to change the parent shell's directory."
      },
      {
        "topic": "chdir fchdir getcwd: terminal/program view",
        "terms": [
          "chdir",
          "fchdir",
          "getcwd",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "chdir-fchdir-getcwd-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Device special files",
        "terms": [
          "Device",
          "special",
          "files"
        ],
        "definition": "Device special files (in /dev) give file-interface access to devices. Character devices (c) transfer byte streams (terminals, /dev/null); block devices (b) transfer fixed blocks (disks). Each has a major number (driver) and minor number (unit).",
        "takeaway": "/dev files = device interface: char (byte stream) vs block (fixed blocks); major=driver, minor=unit.",
        "visual": "device-special-files",
        "algo": [
          "Device appears as a file in /dev",
          "Type c (char) or b (block)",
          "Major number selects the driver",
          "Minor number selects the specific unit"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Device as a file; driver=major, unit=minor"
        },
        "dryRun": {
          "input": "ls -l /dev/sda /dev/tty",
          "steps": [
            "/dev/sda → 'b' block (disk)",
            "/dev/tty → 'c' char (terminal)",
            "open/read/write like a file",
            "Kernel routes to the driver via major/minor"
          ],
          "result": "Devices used through the ordinary file interface"
        },
        "code": null,
        "mistake": "Treating a character device as seekable/block-structured (or vice versa)."
      },
      {
        "topic": "Device special files: terminal/program view",
        "terms": [
          "Device",
          "special",
          "files",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "device-special-files-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "main function",
        "terms": [
          "main",
          "function"
        ],
        "definition": "A C program's execution begins at main(int argc, char *argv[], char *envp[]): the kernel's exec sets up argc (count), argv (argument vector, argv[0]=program name, argv[argc]=NULL), and the environment before calling a startup routine that invokes main.",
        "takeaway": "main(argc,argv[]) — argv[0]=program name, argv[argc]=NULL; the C start-up routine calls main after exec.",
        "visual": "main-function",
        "algo": [
          "exec loads the program and sets up the stack",
          "Start-up routine gets argc/argv/env from the kernel",
          "It calls main(argc,argv)",
          "main's return value becomes the exit status"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "argv[0]=name, argv[argc]=NULL; start-up calls main"
        },
        "dryRun": {
          "input": "./prog a b",
          "steps": [
            "exec sets argv=['./prog','a','b',NULL]",
            "argc=3",
            "main runs with these",
            "return 0 → exit status 0"
          ],
          "result": "Kernel/start-up hand argc/argv to main"
        },
        "code": null,
        "mistake": "Reading argv[argc] (it's NULL) or forgetting argv[0] is the program name, not the first argument."
      },
      {
        "topic": "main function: terminal/program view",
        "terms": [
          "main",
          "function",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "main-function-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Process termination",
        "terms": [
          "Process",
          "termination"
        ],
        "definition": "A process ends in five normal ways — return from main, exit(), _exit()/_Exit() — and three abnormal — abort() (SIGABRT), a fatal signal, and the last thread's response. exit() runs atexit handlers and flushes stdio; _exit() returns to the kernel immediately.",
        "takeaway": "Normal: return/exit()/_exit(); abnormal: abort/signal. exit() runs atexit + flushes; _exit() does not.",
        "visual": "process-termination",
        "algo": [
          "Normal exit via return or exit()",
          "exit() runs atexit handlers, flushes stdio, then _exit()",
          "_exit() traps straight to the kernel",
          "Abnormal: abort() or an unhandled fatal signal"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "exit()=atexit+flush; _exit()=straight to kernel"
        },
        "dryRun": {
          "input": "exit(1) vs _exit(1)",
          "steps": [
            "exit(1): atexit funcs run",
            "stdio buffers flushed",
            "then kernel notified",
            "_exit(1): kernel notified directly, no flush"
          ],
          "result": "exit cleans up; _exit is the raw kernel termination"
        },
        "code": null,
        "mistake": "Calling _exit after buffered printf — the buffer is lost because stdio isn't flushed."
      },
      {
        "topic": "Process termination: terminal/program view",
        "terms": [
          "Process",
          "termination",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "process-termination-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Command-line arguments",
        "terms": [
          "Command-line",
          "arguments"
        ],
        "definition": "The kernel's exec passes the command line to the new program as argv[], and the C start-up code delivers it to main as argc/argv. Programs parse options from argv (often with getopt). argv[0] is the invocation name.",
        "takeaway": "exec delivers the command line as argv[]; programs parse it (getopt) starting after argv[0].",
        "visual": "command-line-arguments",
        "algo": [
          "Shell builds the argument list",
          "exec passes it to the new program",
          "Start-up code sets argc/argv",
          "getopt loops over options in argv"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Kernel passes the command line; getopt parses"
        },
        "dryRun": {
          "input": "prog -v file",
          "steps": [
            "argv=['prog','-v','file']",
            "getopt returns 'v'",
            "Non-option 'file' is the operand",
            "Program acts accordingly"
          ],
          "result": "Command line reaches the program as parsed argv"
        },
        "code": null,
        "mistake": "Hand-parsing argv and mishandling combined/`--` options that getopt handles correctly."
      },
      {
        "topic": "Command-line arguments: terminal/program view",
        "terms": [
          "Command-line",
          "arguments",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "command-line-arguments-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Environment list",
        "terms": [
          "Environment",
          "list"
        ],
        "definition": "Each process has an environment: an array of 'name=value' strings ending in NULL, reachable via the global environ or the envp argument. getenv/putenv/setenv access it. exec passes it to the new program; children inherit a copy.",
        "takeaway": "environ = NULL-terminated 'name=value' array; getenv/setenv access it; exec passes it on.",
        "visual": "environment-list",
        "algo": [
          "environ points to the name=value array",
          "getenv('PATH') searches it",
          "setenv/putenv modify it",
          "exec hands the environment to the new program"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "NULL-terminated array; getenv/setenv; inherited"
        },
        "dryRun": {
          "input": "getenv('HOME')",
          "steps": [
            "Scan environ for 'HOME='",
            "Return pointer past the '='",
            "Value = /home/anita",
            "NULL if the name is absent"
          ],
          "result": "getenv resolves a variable from the environment array"
        },
        "code": null,
        "mistake": "Assuming environment changes propagate to the parent — they affect only this process and its future children."
      },
      {
        "topic": "Environment list: terminal/program view",
        "terms": [
          "Environment",
          "list",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "environment-list-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "C program memory layout",
        "terms": [
          "program",
          "memory",
          "layout"
        ],
        "definition": "A C process image has regions: text (machine code, read-only, shared), initialized data, uninitialized data (BSS, zeroed), the heap (grows up via malloc), and the stack (grows down, holds frames/locals). Command-line args + environment sit above the stack.",
        "takeaway": "text → data → BSS → heap(↑) … stack(↓): code, globals, malloc, and function frames.",
        "visual": "c-program-memory-layout",
        "algo": [
          "Text: read-only instructions",
          "Data/BSS: initialized/zeroed globals",
          "Heap grows upward (malloc)",
          "Stack grows downward (calls/locals)"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "code·globals·malloc(↑)·frames(↓)"
        },
        "dryRun": {
          "input": "A recursive function + malloc",
          "steps": [
            "Code lives in text",
            "Globals in data/BSS",
            "Each call pushes a stack frame (stack ↓)",
            "malloc extends the heap (↑)"
          ],
          "result": "Heap and stack grow toward each other in the address space"
        },
        "code": null,
        "mistake": "Confusing stack (auto locals, freed on return) with heap (malloc, freed explicitly)."
      },
      {
        "topic": "C program memory layout: terminal/program view",
        "terms": [
          "program",
          "memory",
          "layout",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "c-program-memory-layout-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Shared libraries",
        "terms": [
          "Shared",
          "libraries"
        ],
        "definition": "Shared libraries hold common library code in ONE copy that many programs map at run time, instead of statically copying it into each executable. This shrinks executables and lets a library be updated without relinking programs; the dynamic linker resolves symbols at load/run time.",
        "takeaway": "Shared libs: one run-time copy mapped by many programs — smaller binaries, updatable without relinking.",
        "visual": "shared-libraries",
        "algo": [
          "Program is linked against a shared lib name",
          "At load, the dynamic linker maps the lib",
          "Symbols resolved at load/first-use",
          "One library copy serves all programs"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Dynamic linker maps shared code; smaller, updatable"
        },
        "dryRun": {
          "input": "Two programs using libc",
          "steps": [
            "Both reference libc.so",
            "Loader maps one libc copy",
            "Both call printf from it",
            "Update libc → both benefit, no relink"
          ],
          "result": "Shared code loaded once, used by many"
        },
        "code": null,
        "mistake": "Assuming a static-linked binary and a shared-linked one behave identically on library updates."
      },
      {
        "topic": "Shared libraries: terminal/program view",
        "terms": [
          "Shared",
          "libraries",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "shared-libraries-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Memory allocation",
        "terms": [
          "Memory",
          "allocation"
        ],
        "definition": "Dynamic memory comes from the heap via malloc(size) (uninitialized), calloc(n,size) (zeroed), and realloc(ptr,size) (resize, possibly moving); free(ptr) returns it. The allocator manages the heap; misuse causes leaks or corruption.",
        "takeaway": "malloc/calloc/realloc take heap memory, free returns it; leaks and double-free are the classic bugs.",
        "visual": "memory-allocation",
        "algo": [
          "malloc(n) returns a pointer to n bytes",
          "calloc zeroes; realloc resizes (may move)",
          "Use the memory",
          "free(ptr) returns it to the heap"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Heap alloc; leaks/double-free are the hazards"
        },
        "dryRun": {
          "input": "p=malloc(100); q=realloc(p,200)",
          "steps": [
            "malloc gives 100 bytes",
            "realloc may move to a new 200-byte block",
            "Old p is now invalid; use q",
            "free(q) at the end"
          ],
          "result": "Block grown safely; free the final pointer"
        },
        "code": null,
        "mistake": "Using the old pointer after realloc moves the block, or freeing memory twice."
      },
      {
        "topic": "Memory allocation: terminal/program view",
        "terms": [
          "Memory",
          "allocation",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "memory-allocation-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Environment variables",
        "terms": [
          "Environment",
          "variables"
        ],
        "definition": "Environment variables (PATH, HOME, TZ, LANG) parameterize a program's behaviour without code changes. getenv reads; setenv/putenv set for this process and its future children. Programs read them for configuration and locale.",
        "takeaway": "Env vars configure behaviour externally; getenv reads, setenv sets for this process + children.",
        "visual": "environment-variables",
        "algo": [
          "Program calls getenv('NAME')",
          "Uses the value to configure itself",
          "setenv('NAME',v,1) sets/overwrites",
          "Children inherit the current environment"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "External config; inherited by children"
        },
        "dryRun": {
          "input": "TZ=UTC ./prog",
          "steps": [
            "Shell sets TZ in prog's environment",
            "prog's getenv('TZ') returns 'UTC'",
            "Time functions use UTC",
            "No code change needed"
          ],
          "result": "Behaviour changed purely via an environment variable"
        },
        "code": null,
        "mistake": "Modifying the buffer returned by getenv (it points into the environment — use setenv)."
      },
      {
        "topic": "Environment variables: terminal/program view",
        "terms": [
          "Environment",
          "variables",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "environment-variables-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "setjmp and longjmp",
        "terms": [
          "setjmp",
          "longjmp"
        ],
        "definition": "setjmp(env) saves the stack context and returns 0; a later longjmp(env,val) jumps back to that point, making setjmp appear to return val (non-zero). This gives a non-local goto across function calls — used for error recovery deep in a call chain.",
        "takeaway": "setjmp saves context (returns 0); longjmp jumps back (setjmp then returns val) — a non-local goto.",
        "visual": "setjmp-and-longjmp",
        "algo": [
          "setjmp(env) saves registers/stack, returns 0",
          "Program calls deep into functions",
          "On error, longjmp(env,1)",
          "Control returns to setjmp, which now returns 1"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Non-local goto; save context, jump back with a value"
        },
        "dryRun": {
          "input": "parser error recovery",
          "steps": [
            "setjmp(env) at top level returns 0",
            "Descend into parse functions",
            "Error → longjmp(env,1)",
            "Back at setjmp, returns 1 → handle error"
          ],
          "result": "Unwinds many stack frames in one jump"
        },
        "code": null,
        "mistake": "Relying on the values of automatic (non-volatile) locals after longjmp — they may be indeterminate."
      },
      {
        "topic": "setjmp and longjmp: terminal/program view",
        "terms": [
          "setjmp",
          "and",
          "longjmp",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "setjmp-and-longjmp-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "getrlimit and setrlimit",
        "terms": [
          "getrlimit",
          "setrlimit"
        ],
        "definition": "getrlimit/setrlimit query and change a process's resource limits — each with a soft limit (enforced) and a hard limit (ceiling): RLIMIT_CPU, RLIMIT_FSIZE, RLIMIT_NOFILE, RLIMIT_STACK, etc. A process may raise the soft limit up to the hard limit only.",
        "takeaway": "Resource limits have soft (enforced) and hard (ceiling) values; a process can raise soft only up to hard.",
        "visual": "getrlimit-and-setrlimit",
        "algo": [
          "getrlimit(resource,&rl) reads soft+hard",
          "Adjust rl.rlim_cur (soft)",
          "setrlimit writes it back",
          "Soft may rise only up to the hard limit"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Per-resource limits; soft enforced, hard is ceiling"
        },
        "dryRun": {
          "input": "raise open-file limit",
          "steps": [
            "getrlimit(RLIMIT_NOFILE,&rl)",
            "rl.rlim_cur = rl.rlim_max",
            "setrlimit writes it",
            "Process may now open more files"
          ],
          "result": "Soft limit raised to the hard ceiling"
        },
        "code": null,
        "mistake": "Trying to raise the soft limit above the hard limit (only the superuser can raise the hard limit)."
      },
      {
        "topic": "getrlimit and setrlimit: terminal/program view",
        "terms": [
          "getrlimit",
          "and",
          "setrlimit",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "getrlimit-and-setrlimit-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      }
    ],
    "checkpoints": [
      {
        "label": "Start with why the module matters.",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Unix standardization",
        "bigO": "ISO C·POSIX·SUS",
        "why": "Standard interface; feature-test macros select it"
      },
      {
        "label": "Unix standardization: terminal/program view",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "UNIX system implementation",
        "bigO": "syscall boundary",
        "why": "Kernel services via traps; libraries wrap them"
      },
      {
        "label": "UNIX system implementation: terminal/program view",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "File descriptors",
        "bigO": "int index",
        "why": "fd indexes the open-file table; 0/1/2 std streams"
      }
    ]
  },
  {
    "n": 4,
    "id": "module-4",
    "title": "Process Control and IPC",
    "hours": 8,
    "question": "How do processes fork, exec, wait and communicate?",
    "story": [
      "fork",
      "exec",
      "wait",
      "IPC"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Process identifiers",
      "Process identifiers: terminal/program view",
      "fork and vfork",
      "fork and vfork: terminal/program view",
      "exit wait waitpid wait3 wait4",
      "exit wait waitpid wait3 wait4: terminal/program view",
      "Race conditions",
      "Race conditions: terminal/program view",
      "exec functions",
      "exec functions: terminal/program view",
      "IPC overview",
      "IPC overview: terminal/program view",
      "Pipes",
      "Pipes: terminal/program view",
      "popen and pclose",
      "popen and pclose: terminal/program view",
      "Coprocesses",
      "Coprocesses: terminal/program view",
      "FIFOs",
      "FIFOs: terminal/program view",
      "System V IPC",
      "System V IPC: terminal/program view",
      "Message queues",
      "Message queues: terminal/program view",
      "Semaphores",
      "Semaphores: terminal/program view",
      "Shared memory",
      "Shared memory: terminal/program view",
      "Client-server properties",
      "Client-server properties: terminal/program view",
      "Passing file descriptors",
      "Passing file descriptors: terminal/program view",
      "Open server version 1",
      "Open server version 1: terminal/program view"
    ],
    "notes": "Aligned to BCS515C Module_4 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "start-with-why-the-module-matters",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Process identifiers",
        "terms": [
          "Process",
          "identifiers"
        ],
        "definition": "Every process has a unique PID (a non-negative int). getpid() returns it, getppid() the parent's. PID 0 is the scheduler/swapper and PID 1 is init (the ancestor that adopts orphans). PIDs are reused after a process is reaped.",
        "takeaway": "getpid()=own PID, getppid()=parent; PID 1 = init adopts orphans; PIDs are reused.",
        "visual": "process-identifiers",
        "algo": [
          "Kernel assigns a unique PID at creation",
          "getpid()/getppid() read them",
          "init (PID 1) adopts orphaned children",
          "PID freed and reusable after reaping"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Unique PID; init(1) adopts orphans; PIDs reused"
        },
        "dryRun": {
          "input": "print getpid, getppid",
          "steps": [
            "Process gets PID 4021",
            "getpid() → 4021",
            "getppid() → the shell's PID",
            "If parent dies, getppid() → 1"
          ],
          "result": "Process identity via PID/parent PID"
        },
        "code": null,
        "mistake": "Assuming a PID is unique forever — it is reused after the process is reaped."
      },
      {
        "topic": "Process identifiers: terminal/program view",
        "terms": [
          "Process",
          "identifiers",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "process-identifiers-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "fork and vfork",
        "terms": [
          "fork",
          "vfork"
        ],
        "definition": "fork() creates a child that is a near-duplicate of the parent's address space. It returns TWICE: the child's PID in the parent and 0 in the child (−1 on error). Both continue from the statement after fork(). vfork() shares the parent's space and is meant for an immediate exec.",
        "takeaway": "fork() returns child-PID to the parent and 0 to the child; both continue after fork(). One call, two returns.",
        "visual": "fork-and-vfork",
        "algo": [
          "One process calls fork()",
          "Kernel duplicates the process image",
          "Parent gets the child's PID; child gets 0",
          "Both run the code after fork() — branch on the return value"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "One call, two returns; near-duplicate address space"
        },
        "dryRun": {
          "input": "pid=fork();",
          "steps": [
            "Before: one process (pid 1000)",
            "fork() duplicates it → child pid 1001",
            "In parent pid==1001 (>0)",
            "In child pid==0 → the two branch apart"
          ],
          "result": "One process becomes two; return value distinguishes them"
        },
        "code": null,
        "mistake": "Assuming fork returns once — it returns in BOTH processes with different values; don't assume parent runs first."
      },
      {
        "topic": "fork and vfork: terminal/program view",
        "terms": [
          "fork",
          "and",
          "vfork",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "fork-and-vfork-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "exit wait waitpid wait3 wait4",
        "terms": [
          "exit",
          "wait",
          "waitpid",
          "wait3"
        ],
        "definition": "When a child exits it becomes a zombie until the parent collects its status. wait() blocks for any child; waitpid(pid,&st,opt) waits for a specific child (WNOHANG = don't block). Macros WIFEXITED/WEXITSTATUS decode the status. wait3/wait4 also return resource usage.",
        "takeaway": "Parent calls wait/waitpid to reap a child and read its exit status; unreaped children are zombies.",
        "visual": "exit-wait-waitpid-wait3-wait4",
        "algo": [
          "Child terminates → becomes a zombie",
          "Parent calls wait()/waitpid()",
          "Kernel returns the child's PID + status",
          "WIFEXITED/WEXITSTATUS decode it; zombie cleared"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Reap child, decode status; unreaped = zombie"
        },
        "dryRun": {
          "input": "waitpid(child,&st,0)",
          "steps": [
            "Child exits with code 3",
            "Parent's waitpid returns the child PID",
            "WIFEXITED(st) true",
            "WEXITSTATUS(st) == 3"
          ],
          "result": "Parent reaps the child and reads exit code 3"
        },
        "code": null,
        "mistake": "Never waiting for children, leaving zombies; or misreading raw status without the WIF* macros."
      },
      {
        "topic": "exit wait waitpid wait3 wait4: terminal/program view",
        "terms": [
          "exit",
          "wait",
          "waitpid",
          "wait3"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "exit-wait-waitpid-wait3-wait4-terminal-program-v",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Race conditions",
        "terms": [
          "Race",
          "conditions"
        ],
        "definition": "A race condition occurs when the result depends on the unpredictable ordering of concurrent processes — e.g. parent and child after fork() with no synchronization. Fixes: wait for the child, or use signals/IPC to impose an order.",
        "takeaway": "After fork(), parent/child order is undefined — a race; synchronize with wait or signals.",
        "visual": "race-conditions",
        "algo": [
          "fork() gives two concurrent processes",
          "Scheduler may run either first",
          "Shared assumptions about order break",
          "Add wait()/signals to synchronize"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Concurrent processes; synchronize with wait/signals"
        },
        "dryRun": {
          "input": "parent & child both print",
          "steps": [
            "No synchronization after fork",
            "Output order varies run to run",
            "Sometimes child first, sometimes parent",
            "Add a signal handshake → deterministic"
          ],
          "result": "Nondeterministic output until synchronization is added"
        },
        "code": null,
        "mistake": "Assuming the parent (or child) runs first after fork — the scheduler decides."
      },
      {
        "topic": "Race conditions: terminal/program view",
        "terms": [
          "Race",
          "conditions",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "race-conditions-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "exec functions",
        "terms": [
          "exec",
          "functions"
        ],
        "definition": "The exec family (execl, execv, execle, execve, execlp, execvp) REPLACES the current process image with a new program while keeping the same PID and open descriptors. On success exec never returns; it returns only on error. Typically the child of a fork calls exec.",
        "takeaway": "exec replaces the process image (same PID); it never returns on success. fork then exec = run a new program.",
        "visual": "exec-functions",
        "algo": [
          "Child process calls one of the exec* functions",
          "Kernel loads the new program's text/data/stack",
          "Same PID; open fds persist (unless close-on-exec)",
          "Execution starts at the new program's main()"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Replace program in place; returns only on error"
        },
        "dryRun": {
          "input": "child: execlp('ls','ls','-l',NULL)",
          "steps": [
            "Child has the parent's image",
            "execlp replaces it with /bin/ls",
            "PID unchanged",
            "ls -l runs; exec never returns"
          ],
          "result": "The child becomes the ls program in place"
        },
        "code": null,
        "mistake": "Writing code after a successful exec expecting it to run — it never does (exec replaces the image)."
      },
      {
        "topic": "exec functions: terminal/program view",
        "terms": [
          "exec",
          "functions",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "exec-functions-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "IPC overview",
        "terms": [
          "IPC",
          "overview"
        ],
        "definition": "Inter-process communication lets separate processes exchange data. Unix offers: pipes & FIFOs (byte streams), System V / POSIX message queues (typed messages), semaphores (synchronization), and shared memory (fastest — a common memory region). Choose by pattern: stream vs message vs shared state.",
        "takeaway": "IPC menu: pipes/FIFOs (streams), message queues (messages), semaphores (sync), shared memory (fastest shared region).",
        "visual": "ipc-overview",
        "algo": [
          "Pick the communication pattern",
          "Stream of bytes → pipe/FIFO",
          "Discrete messages → message queue",
          "Shared state → shared memory (+ semaphore)"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "stream·message·sync·shared-region"
        },
        "dryRun": {
          "input": "producer→consumer",
          "steps": [
            "Related processes → pipe",
            "Unrelated → FIFO or message queue",
            "High volume → shared memory",
            "Guard shared memory with a semaphore"
          ],
          "result": "Mechanism chosen to match the data pattern"
        },
        "code": null,
        "mistake": "Using shared memory without a semaphore, so concurrent access corrupts the data."
      },
      {
        "topic": "IPC overview: terminal/program view",
        "terms": [
          "IPC",
          "overview",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "ipc-overview-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Pipes",
        "terms": [
          "Pipes"
        ],
        "definition": "A pipe is a unidirectional byte stream between related processes: pipe(fd) returns fd[0] (read end) and fd[1] (write end). Typically the parent forks, one process writes fd[1], the other reads fd[0]; the kernel buffers the data.",
        "takeaway": "pipe(fd): fd[1] write end → kernel buffer → fd[0] read end; unidirectional, between related processes.",
        "visual": "pipes",
        "algo": [
          "pipe(fd) creates the buffer + two fds",
          "fork(); child and parent share both fds",
          "Writer closes fd[0], writes fd[1]",
          "Reader closes fd[1], reads fd[0]"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Unidirectional stream; related processes"
        },
        "dryRun": {
          "input": "parent writes, child reads",
          "steps": [
            "pipe(fd) then fork()",
            "Parent: close fd[0], write 'hi' to fd[1]",
            "Child: close fd[1], read fd[0]",
            "Child receives 'hi'"
          ],
          "result": "Bytes flow parent → pipe → child"
        },
        "code": null,
        "mistake": "Not closing the unused pipe end, so the reader never sees EOF."
      },
      {
        "topic": "Pipes: terminal/program view",
        "terms": [
          "Pipes",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "pipes-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "popen and pclose",
        "terms": [
          "popen",
          "pclose"
        ],
        "definition": "popen(command,type) forks a shell to run command and returns a FILE* pipe: type \"r\" reads the command's output, \"w\" writes to its input. pclose() closes the stream and waits for the command, returning its exit status. It is a convenience wrapper over pipe+fork+exec.",
        "takeaway": "popen runs a command and gives you a FILE* to its stdout/stdin; pclose waits and returns its status.",
        "visual": "popen-and-pclose",
        "algo": [
          "popen(cmd,'r') forks a shell running cmd",
          "Returns a FILE* to read cmd's stdout",
          "Read it like any stream",
          "pclose() waits for cmd, returns status"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "pipe+fork+exec wrapper; pclose waits"
        },
        "dryRun": {
          "input": "fp=popen('ls','r')",
          "steps": [
            "Shell runs ls, output to the pipe",
            "fgets(fp) reads filenames",
            "Loop to EOF",
            "pclose(fp) reaps the shell"
          ],
          "result": "Command output read as a normal stream"
        },
        "code": null,
        "mistake": "Using fclose instead of pclose (fails to reap the child and get the status)."
      },
      {
        "topic": "popen and pclose: terminal/program view",
        "terms": [
          "popen",
          "and",
          "pclose",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "popen-and-pclose-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Coprocesses",
        "terms": [
          "Coprocesses"
        ],
        "definition": "A coprocess is a child filter that the parent both writes to AND reads from — the parent feeds it input and consumes its output using two pipes. Care is needed: stdio full-buffering in the coprocess can deadlock, so line-buffering/flushing is required.",
        "takeaway": "Coprocess = a child you pipe INTO and read FROM (two pipes); watch for stdio buffering deadlock.",
        "visual": "coprocesses",
        "algo": [
          "Create two pipes and fork",
          "Child reads pipe A, writes pipe B (a filter)",
          "Parent writes A, reads B",
          "Flush/line-buffer to avoid deadlock"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Write-to + read-from a child; buffering can deadlock"
        },
        "dryRun": {
          "input": "parent uses an add filter",
          "steps": [
            "Parent writes '2 3' to pipe A",
            "Coprocess reads, computes 5, writes pipe B",
            "If the coprocess full-buffers, output stalls",
            "Line-buffering delivers '5' back"
          ],
          "result": "Two-way pipe filter — correct only with proper buffering"
        },
        "code": null,
        "mistake": "Leaving the coprocess fully buffered, so its output never reaches the parent and both block."
      },
      {
        "topic": "Coprocesses: terminal/program view",
        "terms": [
          "Coprocesses",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "coprocesses-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "FIFOs",
        "terms": [
          "FIFOs"
        ],
        "definition": "A FIFO (named pipe) is a pipe with a name in the file system, made by mkfifo(). Unlike an anonymous pipe, UNRELATED processes can open it by pathname — one for reading, one for writing — to exchange a byte stream.",
        "takeaway": "FIFO = named pipe (mkfifo) on disk; lets UNRELATED processes stream bytes by opening a pathname.",
        "visual": "fifos",
        "algo": [
          "mkfifo('/tmp/f') creates the named pipe",
          "One process opens it O_RDONLY",
          "Another opens it O_WRONLY",
          "Bytes stream writer → FIFO → reader"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "mkfifo; unrelated processes stream by pathname"
        },
        "dryRun": {
          "input": "two unrelated programs",
          "steps": [
            "mkfifo /tmp/f",
            "Program A: open /tmp/f for read",
            "Program B: open /tmp/f for write, write data",
            "A reads what B wrote"
          ],
          "result": "Unrelated processes communicate via the named pipe"
        },
        "code": null,
        "mistake": "Expecting open() on a FIFO to return immediately — it blocks until the other end is opened."
      },
      {
        "topic": "FIFOs: terminal/program view",
        "terms": [
          "FIFOs",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "fifos-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "System V IPC",
        "terms": [
          "System",
          "IPC"
        ],
        "definition": "System V IPC provides message queues, semaphores and shared memory. Each is created/accessed with a key (ftok) via get calls (msgget/semget/shmget) returning an identifier, controlled with ctl calls, and persists in the kernel until explicitly removed (independent of process lifetime).",
        "takeaway": "System V IPC = message queues + semaphores + shared memory, keyed by ftok, kernel-persistent until removed.",
        "visual": "system-v-ipc",
        "algo": [
          "ftok() makes a key from a path+id",
          "xxxget(key,…) creates/opens the object → id",
          "Use it (msgsnd/semop/shmat)",
          "xxxctl(…,IPC_RMID) removes it"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "MQ/sem/shm via get/ctl; removed explicitly"
        },
        "dryRun": {
          "input": "create a shared segment",
          "steps": [
            "key = ftok('/tmp',1)",
            "id = shmget(key,4096,IPC_CREAT|0666)",
            "Processes shmat to the same id",
            "shmctl(id,IPC_RMID) removes it"
          ],
          "result": "Named, kernel-persistent IPC object shared by key"
        },
        "code": null,
        "mistake": "Forgetting IPC_RMID, leaking kernel IPC objects that outlive all processes."
      },
      {
        "topic": "System V IPC: terminal/program view",
        "terms": [
          "System",
          "IPC",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "system-v-ipc-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Message queues",
        "terms": [
          "Message",
          "queues"
        ],
        "definition": "A System V message queue is a kernel linked-list of typed messages. msgsnd() appends a message (with a long mtype); msgrcv() removes one, selectable BY TYPE (not just FIFO). This lets processes exchange discrete, prioritized/typed messages asynchronously.",
        "takeaway": "Message queue = kernel list of typed messages; msgsnd appends, msgrcv reads by type (not only FIFO).",
        "visual": "message-queues",
        "algo": [
          "msgget → queue id",
          "msgsnd(id,&msg,…) appends {mtype,data}",
          "msgrcv(id,&msg,…,type,…) selects by mtype",
          "Sender/receiver decoupled in time"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "msgsnd/msgrcv; select by mtype, async"
        },
        "dryRun": {
          "input": "two message types",
          "steps": [
            "Send msgs mtype=1 and mtype=2",
            "Receiver asks msgrcv type=2",
            "Gets the type-2 message first",
            "Type-1 stays queued"
          ],
          "result": "Selective, typed message delivery"
        },
        "code": null,
        "mistake": "Assuming strict FIFO — msgrcv can pick by type, reordering delivery."
      },
      {
        "topic": "Message queues: terminal/program view",
        "terms": [
          "Message",
          "queues",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "message-queues-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Semaphores",
        "terms": [
          "Semaphores"
        ],
        "definition": "A semaphore is a kernel counter for synchronization/mutual exclusion. semop() performs P (wait, decrement — blocks at 0) and V (signal, increment) atomically. A binary semaphore (0/1) is a mutex; counting semaphores guard N identical resources.",
        "takeaway": "Semaphore = atomic counter: P (wait/−1, blocks at 0) and V (signal/+1); binary = mutex.",
        "visual": "semaphores",
        "algo": [
          "semget → semaphore set",
          "P: semop decrement — block while 0",
          "Enter the critical section",
          "V: semop increment — release"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Atomic counter; blocks at 0; binary=mutex"
        },
        "dryRun": {
          "input": "protect shared memory",
          "steps": [
            "Semaphore initialized to 1",
            "Process P()s → count 0, enters CS",
            "Second process P()s → blocks",
            "First V()s → count 1, second proceeds"
          ],
          "result": "Only one process in the critical section at a time"
        },
        "code": null,
        "mistake": "Doing the P/V check and update non-atomically — semop must be atomic to be safe."
      },
      {
        "topic": "Semaphores: terminal/program view",
        "terms": [
          "Semaphores",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "semaphores-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Shared memory",
        "terms": [
          "Shared",
          "memory"
        ],
        "definition": "Shared memory is the fastest IPC: shmget creates a segment, shmat maps it into each process's address space, and they read/write the SAME physical memory directly — no kernel copy per access. It must be synchronized (a semaphore) to avoid races.",
        "takeaway": "Shared memory = one region mapped into multiple processes (shmat); fastest IPC, but needs a semaphore.",
        "visual": "shared-memory",
        "algo": [
          "shmget(key,size,…) → segment id",
          "Each process shmat() maps it into its space",
          "Both read/write the same bytes directly",
          "Guard with a semaphore; shmdt/IPC_RMID to remove"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "shmat maps same memory; fastest; needs sync"
        },
        "dryRun": {
          "input": "A writes, B reads",
          "steps": [
            "Both shmat the same segment",
            "A writes 'hello' into it",
            "B reads 'hello' from the same memory",
            "No kernel copy involved"
          ],
          "result": "Two processes share one physical memory region"
        },
        "code": null,
        "mistake": "Accessing shared memory without a semaphore, letting concurrent writes corrupt it."
      },
      {
        "topic": "Shared memory: terminal/program view",
        "terms": [
          "Shared",
          "memory",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "shared-memory-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Client-server properties",
        "terms": [
          "Client-server",
          "properties"
        ],
        "definition": "In a client–server design the server offers a service and waits; clients send requests and receive responses. Key properties: the server may serve many clients (concurrency), must handle crashes/partial requests robustly, and communicates over an IPC channel (pipe/FIFO/socket).",
        "takeaway": "Server waits and serves many clients; must be robust to client crashes; communicate over an IPC channel.",
        "visual": "client-server-properties",
        "algo": [
          "Server creates a well-known channel and waits",
          "Client connects and sends a request",
          "Server processes and replies",
          "Server loops for the next client"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Server waits; clients request/reply over IPC"
        },
        "dryRun": {
          "input": "file-fetch service",
          "steps": [
            "Server opens a FIFO and blocks on read",
            "Client writes a filename",
            "Server reads it, returns the file",
            "Server waits for the next request"
          ],
          "result": "One server, many client request/response cycles"
        },
        "code": null,
        "mistake": "A server that blocks forever on one misbehaving client instead of handling errors/timeouts."
      },
      {
        "topic": "Client-server properties: terminal/program view",
        "terms": [
          "Client-server",
          "properties",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "client-server-properties-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Passing file descriptors",
        "terms": [
          "Passing",
          "file",
          "descriptors"
        ],
        "definition": "A process can pass an OPEN file descriptor to another (unrelated) process over a UNIX-domain socket using sendmsg/recvmsg with an SCM_RIGHTS control message. The receiver gets a NEW descriptor referring to the SAME open file — not just the integer.",
        "takeaway": "Send an open fd to another process via a UNIX socket (SCM_RIGHTS); the receiver gets a new fd to the same file.",
        "visual": "passing-file-descriptors",
        "algo": [
          "Open a UNIX-domain socket pair",
          "Sender puts the fd in an SCM_RIGHTS message",
          "sendmsg transfers it",
          "Receiver's recvmsg yields a new fd to the same open file"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Transfer an open fd; receiver shares the open file"
        },
        "dryRun": {
          "input": "pass an open log fd",
          "steps": [
            "Server opens /var/log/app",
            "Sends the fd over the socket",
            "Worker recvmsg gets fd 5 to the same file",
            "Both write to one open file"
          ],
          "result": "Descriptor (not just the number) shared across processes"
        },
        "code": null,
        "mistake": "Sending the integer value of the fd instead of using SCM_RIGHTS — the number is meaningless in another process."
      },
      {
        "topic": "Passing file descriptors: terminal/program view",
        "terms": [
          "Passing",
          "file",
          "descriptors",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "passing-file-descriptors-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Open server version 1",
        "terms": [
          "Open",
          "server",
          "version"
        ],
        "definition": "Stevens' open-server is a daemon that opens files on behalf of clients that lack permission or need centralized control: a client sends a pathname+flags, the server opens it and passes the open descriptor back over a UNIX-domain socket (fd passing).",
        "takeaway": "Open-server opens files for clients and passes back the open fd — a concrete use of descriptor passing.",
        "visual": "open-server-version-1",
        "algo": [
          "Client sends pathname + open flags",
          "Server (with rights) open()s the file",
          "Server passes the fd back via SCM_RIGHTS",
          "Client uses the returned descriptor"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Server opens files, returns the descriptor to clients"
        },
        "dryRun": {
          "input": "client wants a privileged file",
          "steps": [
            "Client sends '/etc/secret', O_RDONLY",
            "Server opens it (it has permission)",
            "Server sends the fd back",
            "Client reads via the received fd"
          ],
          "result": "Centralized, privileged open via descriptor passing"
        },
        "code": null,
        "mistake": "Expecting the client to reopen the path itself — the point is the server opens and passes the fd."
      },
      {
        "topic": "Open server version 1: terminal/program view",
        "terms": [
          "Open",
          "server",
          "version",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "open-server-version-1-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      }
    ],
    "checkpoints": [
      {
        "label": "Start with why the module matters.",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Process identifiers",
        "bigO": "getpid/getppid",
        "why": "Unique PID; init(1) adopts orphans; PIDs reused"
      },
      {
        "label": "Process identifiers: terminal/program view",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "fork and vfork",
        "bigO": "child:0 parent:pid",
        "why": "One call, two returns; near-duplicate address space"
      },
      {
        "label": "fork and vfork: terminal/program view",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "exit wait waitpid wait3 wait4",
        "bigO": "wait→status",
        "why": "Reap child, decode status; unreaped = zombie"
      }
    ]
  },
  {
    "n": 5,
    "id": "module-5",
    "title": "Signals and Daemon Processes",
    "hours": 8,
    "question": "How do signals and daemons run without a terminal?",
    "story": [
      "Signals",
      "Handlers",
      "Daemon",
      "Logging"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Signal concepts",
      "Signal concepts: terminal/program view",
      "Signal functions",
      "Signal functions: terminal/program view",
      "SIGCLD semantics",
      "SIGCLD semantics: terminal/program view",
      "kill and raise",
      "kill and raise: terminal/program view",
      "alarm and pause",
      "alarm and pause: terminal/program view",
      "Signal sets",
      "Signal sets: terminal/program view",
      "sigprocmask",
      "sigprocmask: terminal/program view",
      "sigpending",
      "sigpending: terminal/program view",
      "sigaction",
      "sigaction: terminal/program view",
      "sigsetjmp and siglongjmp",
      "sigsetjmp and siglongjmp: terminal/program view",
      "sigsuspend",
      "sigsuspend: terminal/program view",
      "abort system sleep nanosleep clock_nanosleep",
      "abort system sleep nanosleep clock_nanosleep: terminal/program view",
      "sigqueue",
      "sigqueue: terminal/program view",
      "Job-control signals",
      "Job-control signals: terminal/program view",
      "Signal names and numbers",
      "Signal names and numbers: terminal/program view",
      "Daemon characteristics",
      "Daemon characteristics: terminal/program view",
      "Coding rules",
      "Coding rules: terminal/program view",
      "Error logging",
      "Error logging: terminal/program view",
      "Client-server model",
      "Client-server model: terminal/program view"
    ],
    "notes": "Aligned to BCS515C Module_5 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "start-with-why-the-module-matters",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Signal concepts",
        "terms": [
          "Signal",
          "concepts"
        ],
        "definition": "A signal is an asynchronous software interrupt telling a process an event occurred (SIGINT from Ctrl-C, SIGSEGV on a bad address, SIGCHLD when a child exits). A process can, per signal, take the default action, ignore it, or catch it with a handler. SIGKILL/SIGSTOP can't be caught.",
        "takeaway": "Signal = async notification; disposition per signal = default | ignore | catch (SIGKILL/SIGSTOP excepted).",
        "visual": "signal-concepts",
        "algo": [
          "An event generates a signal for the process",
          "Kernel checks the signal's disposition",
          "Default (often terminate), ignore, or run the handler",
          "Delivered asynchronously between instructions"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Async interrupt; SIGKILL/SIGSTOP uncatchable"
        },
        "dryRun": {
          "input": "Ctrl-C on a program",
          "steps": [
            "Terminal generates SIGINT",
            "Default disposition = terminate",
            "With a handler installed → handler runs instead",
            "Program can clean up and continue/exit"
          ],
          "result": "SIGINT terminates by default, or is caught"
        },
        "code": null,
        "mistake": "Trying to catch/ignore SIGKILL(9) or SIGSTOP — the kernel forbids it."
      },
      {
        "topic": "Signal concepts: terminal/program view",
        "terms": [
          "Signal",
          "concepts",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "signal-concepts-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Signal functions",
        "terms": [
          "Signal",
          "functions"
        ],
        "definition": "signal(signo,handler) sets a signal's disposition (handler, SIG_IGN, or SIG_DFL) but has historical portability issues (reset semantics). Stevens recommends sigaction() for reliable, well-defined behaviour. The handler runs asynchronously on delivery.",
        "takeaway": "signal() sets a disposition but is unreliable across systems; prefer sigaction() for defined semantics.",
        "visual": "signal-functions",
        "algo": [
          "signal(SIGINT,handler) installs a catcher",
          "On delivery the handler runs",
          "Old signal() may reset to default after one delivery",
          "sigaction() gives reliable, persistent behaviour"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "signal()=unreliable; sigaction()=defined semantics"
        },
        "dryRun": {
          "input": "catch SIGINT",
          "steps": [
            "signal(SIGINT,onint)",
            "Ctrl-C delivers SIGINT",
            "onint() runs",
            "On some systems disposition resets → reinstall or use sigaction"
          ],
          "result": "Handler runs; use sigaction to avoid reset surprises"
        },
        "code": null,
        "mistake": "Relying on signal()'s behaviour being identical everywhere instead of using sigaction()."
      },
      {
        "topic": "Signal functions: terminal/program view",
        "terms": [
          "Signal",
          "functions",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "signal-functions-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "SIGCLD semantics",
        "terms": [
          "SIGCLD",
          "semantics"
        ],
        "definition": "SIGCHLD (historically SIGCLD) is sent to the parent when a child stops or terminates. Its historical semantics differ (System V's SIGCLD could re-raise). Correct handlers call waitpid() in a loop (WNOHANG) to reap all children and avoid zombies and lost signals.",
        "takeaway": "SIGCHLD notifies the parent a child changed state; the handler must waitpid() in a loop to reap all children.",
        "visual": "sigcld-semantics",
        "algo": [
          "Child exits → kernel sends SIGCHLD to parent",
          "Handler is invoked",
          "Loop waitpid(-1,…,WNOHANG) to reap every ready child",
          "Return; zombies cleared"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "SIGCHLD on child exit; reap all (signals not queued)"
        },
        "dryRun": {
          "input": "server reaps children",
          "steps": [
            "Several children exit near-simultaneously",
            "One SIGCHLD may cover multiple",
            "Handler loops waitpid until no more",
            "All zombies reaped"
          ],
          "result": "Loop-reaping avoids leftover zombies"
        },
        "code": null,
        "mistake": "Reaping only one child per SIGCHLD — signals aren't queued, so others become zombies."
      },
      {
        "topic": "SIGCLD semantics: terminal/program view",
        "terms": [
          "SIGCLD",
          "semantics",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "sigcld-semantics-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "kill and raise",
        "terms": [
          "kill",
          "raise"
        ],
        "definition": "kill(pid,signo) sends a signal to a process (or process group if pid≤0); raise(signo) sends a signal to the caller itself. Permission is required (same owner or root). kill is the general signal-sending primitive.",
        "takeaway": "kill(pid,sig) sends a signal to another process; raise(sig) sends one to yourself.",
        "visual": "kill-and-raise",
        "algo": [
          "kill(pid,signo) — send signo to pid",
          "pid=0 → the caller's process group",
          "pid=−1 → all permitted processes",
          "raise(signo) = kill(getpid(),signo)"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Send a signal to another / to self"
        },
        "dryRun": {
          "input": "kill(4021,SIGTERM)",
          "steps": [
            "Send SIGTERM to process 4021",
            "Kernel checks permission",
            "4021's disposition acts (default = terminate)",
            "raise(SIGTERM) would signal self"
          ],
          "result": "Signal delivered to the target process"
        },
        "code": null,
        "mistake": "Assuming kill always terminates — kill just SENDS a signal; the effect depends on the disposition."
      },
      {
        "topic": "kill and raise: terminal/program view",
        "terms": [
          "kill",
          "and",
          "raise",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "kill-and-raise-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "alarm and pause",
        "terms": [
          "alarm",
          "pause"
        ],
        "definition": "alarm(seconds) schedules a SIGALRM after the given time (one pending alarm per process); pause() suspends the process until any signal is caught. Together they implement timeouts — but a race between alarm and pause motivates sigsuspend.",
        "takeaway": "alarm() schedules SIGALRM after N seconds; pause() waits for a signal — the timeout building blocks.",
        "visual": "alarm-and-pause",
        "algo": [
          "alarm(N) arms a SIGALRM timer",
          "pause() blocks until a signal arrives",
          "SIGALRM fires after N seconds",
          "Handler runs, pause returns"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Schedule SIGALRM, wait for it; has a race"
        },
        "dryRun": {
          "input": "5-second timeout",
          "steps": [
            "Install a SIGALRM handler",
            "alarm(5)",
            "pause() blocks",
            "After 5s SIGALRM wakes it"
          ],
          "result": "A crude timeout from alarm + pause"
        },
        "code": null,
        "mistake": "The alarm/pause race — the signal can arrive between arming and pause; use sigsuspend to close it."
      },
      {
        "topic": "alarm and pause: terminal/program view",
        "terms": [
          "alarm",
          "and",
          "pause",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "alarm-and-pause-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Signal sets",
        "terms": [
          "Signal",
          "sets"
        ],
        "definition": "A signal set (sigset_t) is a bit-mask naming a group of signals, built with sigemptyset, sigfillset, sigaddset, sigdelset and tested with sigismember. Signal sets are the argument to sigprocmask and sigaction (the blocked mask).",
        "takeaway": "sigset_t = a set of signals; build with sigemptyset/sigaddset — the currency for masking.",
        "visual": "signal-sets",
        "algo": [
          "sigemptyset(&s) clears the set",
          "sigaddset(&s,SIGINT) adds a signal",
          "Pass the set to sigprocmask/sigaction",
          "sigismember tests membership"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Signal bit-mask; built with sig*set functions"
        },
        "dryRun": {
          "input": "block just SIGINT",
          "steps": [
            "sigemptyset(&s)",
            "sigaddset(&s,SIGINT)",
            "sigprocmask(SIG_BLOCK,&s,…)",
            "SIGINT now blocked"
          ],
          "result": "A one-signal set used to block SIGINT"
        },
        "code": null,
        "mistake": "Passing an uninitialized sigset_t — always sigemptyset/sigfillset it first."
      },
      {
        "topic": "Signal sets: terminal/program view",
        "terms": [
          "Signal",
          "sets",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "signal-sets-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "sigprocmask",
        "terms": [
          "sigprocmask"
        ],
        "definition": "sigprocmask(how,&set,&old) examines/changes the process's signal MASK — the set of currently blocked signals. how = SIG_BLOCK (add), SIG_UNBLOCK (remove), SIG_SETMASK (replace). Blocked signals stay pending until unblocked; used to protect critical sections.",
        "takeaway": "sigprocmask blocks/unblocks signals (SIG_BLOCK/UNBLOCK/SETMASK); blocked signals stay pending.",
        "visual": "sigprocmask",
        "algo": [
          "Build a set of signals to block",
          "sigprocmask(SIG_BLOCK,&set,&old)",
          "Run the critical section undisturbed",
          "sigprocmask(SIG_SETMASK,&old,…) restores"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Change blocked set; blocked stays pending"
        },
        "dryRun": {
          "input": "protect a critical update",
          "steps": [
            "Block SIGINT with SIG_BLOCK",
            "Update shared state safely",
            "A Ctrl-C stays pending",
            "Restore mask → pending SIGINT delivered"
          ],
          "result": "Critical section shielded; signal delivered after"
        },
        "code": null,
        "mistake": "Leaving signals blocked (not restoring the old mask), so they never get delivered."
      },
      {
        "topic": "sigprocmask: terminal/program view",
        "terms": [
          "sigprocmask",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "sigprocmask-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "sigpending",
        "terms": [
          "sigpending"
        ],
        "definition": "sigpending(&set) returns the set of signals that are currently PENDING for the process — generated but blocked, so not yet delivered. It lets a program check what would be delivered once it unblocks signals.",
        "takeaway": "sigpending reports which signals are blocked-and-pending (generated but not yet delivered).",
        "visual": "sigpending",
        "algo": [
          "Signals blocked via sigprocmask become pending when generated",
          "sigpending(&set) fills the pending set",
          "sigismember tests each",
          "Unblocking delivers them"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Signals generated while blocked; not yet delivered"
        },
        "dryRun": {
          "input": "check for a pending SIGINT",
          "steps": [
            "SIGINT blocked; user hits Ctrl-C",
            "SIGINT now pending",
            "sigpending → set contains SIGINT",
            "Unblock → handler runs"
          ],
          "result": "Pending SIGINT detected before unblocking"
        },
        "code": null,
        "mistake": "Assuming multiple blocked instances queue — standard signals collapse to one pending occurrence."
      },
      {
        "topic": "sigpending: terminal/program view",
        "terms": [
          "sigpending",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "sigpending-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "sigaction",
        "terms": [
          "sigaction"
        ],
        "definition": "sigaction(signo,&act,&old) is the reliable way to set a signal's disposition. The struct sigaction gives the handler, a sa_mask of signals blocked DURING the handler, and sa_flags (SA_RESTART to restart interrupted calls, SA_SIGINFO for extra info). Semantics are well-defined across systems.",
        "takeaway": "sigaction reliably installs a handler + a mask blocked during it + flags (SA_RESTART). Prefer over signal().",
        "visual": "sigaction",
        "algo": [
          "Fill struct sigaction {handler, sa_mask, sa_flags}",
          "sigaction(signo,&act,&old) installs it",
          "During the handler, sa_mask signals are blocked",
          "SA_RESTART auto-restarts interrupted syscalls"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Reliable disposition; SA_RESTART, sa_mask during handler"
        },
        "dryRun": {
          "input": "install a robust SIGINT handler",
          "steps": [
            "act.sa_handler=onint; sigemptyset(&act.sa_mask)",
            "act.sa_flags=SA_RESTART",
            "sigaction(SIGINT,&act,NULL)",
            "Ctrl-C runs onint; disposition persists"
          ],
          "result": "Reliable handler with defined semantics"
        },
        "code": null,
        "mistake": "Not initializing sa_mask/sa_flags, or expecting signal()'s reset behaviour from sigaction."
      },
      {
        "topic": "sigaction: terminal/program view",
        "terms": [
          "sigaction",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "sigaction-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "sigsetjmp and siglongjmp",
        "terms": [
          "sigsetjmp",
          "siglongjmp"
        ],
        "definition": "sigsetjmp/siglongjmp are the signal-aware versions of setjmp/longjmp: they optionally save and restore the signal MASK across the non-local jump. Needed in signal handlers, where plain setjmp/longjmp may leave signals wrongly (un)blocked.",
        "takeaway": "sigsetjmp/siglongjmp = setjmp/longjmp that also save/restore the signal mask — for jumps out of handlers.",
        "visual": "sigsetjmp-and-siglongjmp",
        "algo": [
          "sigsetjmp(env,1) saves context + signal mask",
          "Enter a signal handler",
          "siglongjmp(env,val) jumps back, restoring the mask",
          "Signals correctly (un)blocked afterwards"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "setjmp/longjmp that save/restore the signal mask"
        },
        "dryRun": {
          "input": "jump out of a handler",
          "steps": [
            "sigsetjmp saves mask at top level",
            "SIGALRM handler runs (its signal blocked)",
            "siglongjmp back to the saved point",
            "Mask restored so SIGALRM is unblocked again"
          ],
          "result": "Non-local jump with correct signal mask"
        },
        "code": null,
        "mistake": "Using setjmp/longjmp from a handler, leaving the handled signal permanently blocked."
      },
      {
        "topic": "sigsetjmp and siglongjmp: terminal/program view",
        "terms": [
          "sigsetjmp",
          "and",
          "siglongjmp",
          "terminal"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "sigsetjmp-and-siglongjmp-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "sigsuspend",
        "terms": [
          "sigsuspend"
        ],
        "definition": "sigsuspend(&mask) atomically sets the signal mask AND suspends the process until a signal is caught, then restores the old mask. It closes the alarm/pause race by making 'unblock and wait' a single atomic step.",
        "takeaway": "sigsuspend atomically installs a mask and waits for a signal — closing the unblock-then-wait race.",
        "visual": "sigsuspend",
        "algo": [
          "Block the signal while preparing",
          "sigsuspend(&mask) atomically: set mask + wait",
          "Signal arrives, handler runs",
          "Old mask restored on return"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Fixes the alarm/pause race in one step"
        },
        "dryRun": {
          "input": "reliable wait for SIGALRM",
          "steps": [
            "Block SIGALRM, arm alarm",
            "sigsuspend with a mask that unblocks SIGALRM",
            "Atomic: no gap for the signal to slip through",
            "Handler runs, sigsuspend returns"
          ],
          "result": "Race-free wait for the signal"
        },
        "code": null,
        "mistake": "Emulating it with unblock-then-pause — the very race sigsuspend exists to remove."
      },
      {
        "topic": "sigsuspend: terminal/program view",
        "terms": [
          "sigsuspend",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "sigsuspend-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "abort system sleep nanosleep clock_nanosleep",
        "terms": [
          "abort",
          "system",
          "sleep",
          "nanosleep"
        ],
        "definition": "Utility calls: abort() raises SIGABRT to terminate abnormally (core dump); system() runs a shell command (fork+exec+wait); sleep(sec)/nanosleep()/clock_nanosleep() suspend the process for a time interval (finer resolution as you go).",
        "takeaway": "abort()=SIGABRT terminate; system()=run a shell command; sleep/nanosleep=timed suspension.",
        "visual": "abort-system-sleep-nanosleep-clock-nanosleep",
        "algo": [
          "abort() → SIGABRT → abnormal termination",
          "system('cmd') forks a shell, waits, returns status",
          "sleep(n) suspends n seconds",
          "nanosleep/clock_nanosleep give sub-second precision"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "SIGABRT / run-shell-command / timed suspend"
        },
        "dryRun": {
          "input": "system('date')",
          "steps": [
            "fork a child",
            "child execs the shell running date",
            "parent waits",
            "returns the command's exit status"
          ],
          "result": "system() = fork+exec+wait around a shell command"
        },
        "code": null,
        "mistake": "Using system() where fork/exec is safer (system invokes a shell — injection/PATH risks)."
      },
      {
        "topic": "abort system sleep nanosleep clock_nanosleep: terminal/program view",
        "terms": [
          "abort",
          "system",
          "sleep",
          "nanosleep"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "abort-system-sleep-nanosleep-clock-nanosleep-ter",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "sigqueue",
        "terms": [
          "sigqueue"
        ],
        "definition": "sigqueue(pid,signo,value) sends a real-time signal that CAN carry a small data value (union sigval) and, unlike standard signals, is QUEUED — multiple instances are delivered, in order. Handlers use SA_SIGINFO to read the value.",
        "takeaway": "sigqueue sends a real-time signal that carries a value and is queued (multiple deliveries, in order).",
        "visual": "sigqueue",
        "algo": [
          "Handler installed with SA_SIGINFO",
          "sigqueue(pid,SIGRTMIN,val) sends signal+value",
          "Real-time signals queue (not collapsed)",
          "Handler reads siginfo->si_value"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Real-time signals carry sigval and don't collapse"
        },
        "dryRun": {
          "input": "send three RT signals",
          "steps": [
            "Three sigqueue calls with values 1,2,3",
            "All three are queued",
            "Handler runs three times",
            "Reads values 1,2,3 in order"
          ],
          "result": "Queued real-time signals carry data reliably"
        },
        "code": null,
        "mistake": "Expecting standard (non-RT) signals to queue or carry data — only real-time signals do."
      },
      {
        "topic": "sigqueue: terminal/program view",
        "terms": [
          "sigqueue",
          "terminal",
          "program",
          "view"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "sigqueue-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Job-control signals",
        "terms": [
          "Job-control",
          "signals"
        ],
        "definition": "Job-control signals manage foreground/background jobs from the shell: SIGTSTP (Ctrl-Z suspend), SIGCONT (resume), SIGSTOP (unconditional stop), and SIGTTIN/SIGTTOU (background process touches the terminal). They let the shell stop/resume process groups.",
        "takeaway": "Job control uses SIGTSTP/SIGCONT/SIGSTOP and SIGTTIN/SIGTTOU to suspend/resume jobs and guard the terminal.",
        "visual": "job-control-signals",
        "algo": [
          "Ctrl-Z sends SIGTSTP → job stops",
          "bg/fg send SIGCONT → job resumes",
          "Background read of tty → SIGTTIN stops it",
          "Shell manages process groups"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Suspend/resume jobs; TTIN/TTOU guard the tty"
        },
        "dryRun": {
          "input": "Ctrl-Z then fg",
          "steps": [
            "SIGTSTP suspends the foreground job",
            "Shell prompt returns",
            "fg sends SIGCONT",
            "Job resumes in the foreground"
          ],
          "result": "Job suspended and resumed via job-control signals"
        },
        "code": null,
        "mistake": "Confusing SIGSTOP (uncatchable) with SIGTSTP (Ctrl-Z, catchable)."
      },
      {
        "topic": "Job-control signals: terminal/program view",
        "terms": [
          "Job-control",
          "signals",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "job-control-signals-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Signal names and numbers",
        "terms": [
          "Signal",
          "names",
          "numbers"
        ],
        "definition": "Each signal has a symbolic name (SIGINT, SIGKILL) and a number (2, 9). Always use the NAME — numbers vary across systems. psignal/strsignal print a description; kill -l lists them. Common: SIGHUP1, SIGINT2, SIGKILL9, SIGSEGV11, SIGTERM15.",
        "takeaway": "Use signal NAMES (SIGINT, SIGKILL), not numbers — numbers differ across systems.",
        "visual": "signal-names-and-numbers",
        "algo": [
          "Signals have name + number",
          "Numbers are system-dependent",
          "Code with the symbolic names",
          "strsignal() / kill -l map them"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Symbolic names portable; numbers system-specific"
        },
        "dryRun": {
          "input": "kill -l 9",
          "steps": [
            "Number 9 looked up",
            "Maps to KILL",
            "Better: kill -KILL pid",
            "Portable code uses SIGKILL"
          ],
          "result": "Name SIGKILL is portable; number 9 may not be"
        },
        "code": null,
        "mistake": "Hard-coding signal numbers (9, 15) that aren't guaranteed across platforms."
      },
      {
        "topic": "Signal names and numbers: terminal/program view",
        "terms": [
          "Signal",
          "names",
          "and",
          "numbers"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "signal-names-and-numbers-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Daemon characteristics",
        "terms": [
          "Daemon",
          "characteristics"
        ],
        "definition": "A daemon is a long-lived background process with no controlling terminal (e.g. syslogd, cron). Characteristics: runs in the background, is a session leader detached from any tty, usually a child of init, and logs via syslog since it has no terminal for messages.",
        "takeaway": "Daemon = background, no controlling terminal, own session, logs via syslog (no tty to print to).",
        "visual": "daemon-characteristics",
        "algo": [
          "Detach from the controlling terminal",
          "Run in its own session (setsid)",
          "Live in the background indefinitely",
          "Report through syslog, not stdout/stderr"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Detached session leader; long-lived service"
        },
        "dryRun": {
          "input": "identify a daemon",
          "steps": [
            "ps shows it with ? for TTY",
            "Parent is init (PID 1)",
            "Name often ends in 'd' (syslogd)",
            "Messages go to /var/log via syslog"
          ],
          "result": "A tty-less, background service process"
        },
        "code": null,
        "mistake": "Expecting a daemon to print to a terminal — it has none; it logs via syslog."
      },
      {
        "topic": "Daemon characteristics: terminal/program view",
        "terms": [
          "Daemon",
          "characteristics",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "daemon-characteristics-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Coding rules",
        "terms": [
          "Coding",
          "rules"
        ],
        "definition": "Stevens' daemon-creation rules: umask(0); fork() and let the parent exit; setsid() to become a session leader with no controlling tty; chdir('/'); close inherited descriptors 0/1/2 (or reopen to /dev/null); then run. This properly detaches the process.",
        "takeaway": "Daemonize: umask→fork(parent exits)→setsid→chdir('/')→close/redirect 0,1,2. Then it's detached.",
        "visual": "coding-rules",
        "algo": [
          "umask(0) for predictable file modes",
          "fork(); parent exits → child is not a group leader",
          "setsid() → new session, no controlling terminal",
          "chdir('/'), close/reopen fds 0/1/2"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "The steps that detach a process into a daemon"
        },
        "dryRun": {
          "input": "turn a program into a daemon",
          "steps": [
            "fork; parent exits (shell prompt returns)",
            "child setsid() detaches from the tty",
            "chdir('/'), close 0/1/2",
            "Reopen to /dev/null; enter service loop"
          ],
          "result": "Terminal → fork → detach → background service"
        },
        "code": null,
        "mistake": "Skipping setsid(), so the process keeps a controlling terminal and dies with it."
      },
      {
        "topic": "Coding rules: terminal/program view",
        "terms": [
          "Coding",
          "rules",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "coding-rules-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Error logging",
        "terms": [
          "Error",
          "logging"
        ],
        "definition": "A daemon has no terminal, so it logs through the syslog facility: openlog() sets an identity/facility, syslog(priority,fmt,…) sends messages (levels LOG_ERR, LOG_INFO…), closelog() ends. syslogd routes them to files like /var/log/messages.",
        "takeaway": "Daemons log via syslog(): openlog→syslog(priority,…)→closelog; syslogd files the messages.",
        "visual": "error-logging",
        "algo": [
          "openlog('mydaemon',…,LOG_DAEMON)",
          "syslog(LOG_INFO,'started')",
          "syslogd routes by facility/priority",
          "Messages land in /var/log"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Central logging for tty-less daemons; syslogd files it"
        },
        "dryRun": {
          "input": "log a daemon error",
          "steps": [
            "openlog identity 'mydaemon'",
            "syslog(LOG_ERR,'disk full')",
            "syslogd receives it",
            "Written to /var/log/messages"
          ],
          "result": "Error recorded centrally without a terminal"
        },
        "code": null,
        "mistake": "Writing daemon errors to stdout/stderr (closed/redirected) instead of syslog."
      },
      {
        "topic": "Error logging: terminal/program view",
        "terms": [
          "Error",
          "logging",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "error-logging-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      },
      {
        "topic": "Client-server model",
        "terms": [
          "Client-server",
          "model"
        ],
        "definition": "The client–server model structures cooperating processes: a server owns a resource/service and waits on a well-known channel; clients send requests and receive responses. A daemon server may fork per client (concurrent) and communicate over FIFOs, sockets or shared memory.",
        "takeaway": "Server owns the service and waits; clients request/respond over a channel; concurrent servers fork per client.",
        "visual": "client-server-model",
        "algo": [
          "Server sets up a well-known endpoint and waits",
          "Client connects and sends a request",
          "Server processes (maybe forks a child) and replies",
          "Loop for the next client"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Server owns service; clients request; fork per client"
        },
        "dryRun": {
          "input": "a print server",
          "steps": [
            "Server waits on a socket",
            "Client sends a job",
            "Server forks a worker to print",
            "Parent server waits for more jobs"
          ],
          "result": "One server serving many clients concurrently"
        },
        "code": null,
        "mistake": "Serving one client at a time when concurrency (fork/threads) is needed for scalability."
      },
      {
        "topic": "Client-server model: terminal/program view",
        "terms": [
          "Client-server",
          "model",
          "terminal",
          "program"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "client-server-model-terminal-program-view",
        "algo": [
          "—"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "—",
          "steps": [
            "—"
          ],
          "result": "—"
        },
        "code": null,
        "mistake": "—"
      }
    ],
    "checkpoints": [
      {
        "label": "Start with why the module matters.",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Signal concepts",
        "bigO": "default/ignore/catch",
        "why": "Async interrupt; SIGKILL/SIGSTOP uncatchable"
      },
      {
        "label": "Signal concepts: terminal/program view",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Signal functions",
        "bigO": "signal vs sigaction",
        "why": "signal()=unreliable; sigaction()=defined semantics"
      },
      {
        "label": "Signal functions: terminal/program view",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "SIGCLD semantics",
        "bigO": "loop waitpid",
        "why": "SIGCHLD on child exit; reap all (signals not queued)"
      }
    ]
  }
]

export function getModule(n) { return MODULES.find((m) => m.n === n) || null }
export function getUnixModule(n) { return getModule(n) }

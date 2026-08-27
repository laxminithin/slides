import React from 'react'
import {
  AlgorithmTraceVisualizer,
  ArrayVisualizer,
  ConceptMap,
  DryRunTable,
  ExecutionTraceVisualizer,
  FlowchartTrace,
  FoundationSlide,
  MemoryDiagram,
  ProcessAnimator,
  TeachingCallout,
  TerminalPanel,
} from '../firstYearFoundation'
import { firstYearDepthModules } from '../firstYearDepthContent'
import { makeSourceTeachingSlides } from '../firstYearSourceSlides'
import './programming.css'

const PPTX_ROOT = 'First_Year_PPTX'
const SYLLABUS_ROOT = 'public/syllabus/1st Year Syllabus'

const subjectConfigs = [
  ['introduction-ai-applications-1baia103-203', 'Introduction to AI and Applications', '1BAIA103/203', 'Theory', 'Introduction_to_AI_and_Applications_1BAIA103_203', ['aiIntro', 'promptEngineering', 'machineLearning', 'aiTrends', 'aiApplications']],
  ['programming-in-c-1beit105-205', 'Programming in C', '1BEIT105/205', 'Theory', 'Programming_in_C_1BEIT105_205', ['cComputing', 'cControl', 'cArraysPointers', 'cFunctions', 'cStructures']],
  ['essentials-information-technology-1besc104e', 'ESSENTIALS OF INFORMATION TECHNOLOGY', '1BESC104E', 'Theory', 'ESSENTIALS_OF_INFORMATION_TECHNOLOGY_1BESC104E', ['itStorage', 'itOsAlgorithms', 'itNetworkingSecurity', 'itSoftwareDatabase', 'itWebGraphics']],
  ['python-programming-1bplc105b-205b', 'PYTHON PROGRAMMING', '1BPLC105B/205B', 'IPCC', 'PYTHON_PROGRAMMING_1BPLC105B_205B', ['pyBasics', 'pyStringsLists', 'pyDictFiles', 'pyModulesObjects', 'pyInheritanceExceptions']],
  ['introduction-c-programming-1bplc205e-105e', 'INTRODUCTION TO C PROGRAMMING', '1BPLC205E/105E', 'IPCC', 'INTRODUCTION_TO_C_PROGRAMMING_1BPLC205E_105E', ['introCFlow', 'introCControl', 'introCArraysStrings', 'introCFunctions', 'introCStructuresPointers']],
]

const moduleLibrary = {
  aiIntro: {
    title: 'AI, Machine Intelligence and Knowledge Representation',
    topics: ['Artificial intelligence', 'Types of AI', 'Machine intelligence', 'Agent and environment', 'Uninformed and informed search', 'Knowledge-based agents'],
    problem: 'How does an intelligent agent choose an action when it only sees part of the environment?',
    algorithm: ['Sense current environment state', 'Represent the state and possible actions', 'Search for candidate paths', 'Score or test candidate actions', 'Select action and update the environment model'],
    state: [{ label: 'Agent', value: 'vacuum bot' }, { label: 'Environment', value: 'rooms A/B' }, { label: 'Goal', value: 'both clean', active: true }, { label: 'Search', value: 'best-first frontier' }, { label: 'Knowledge', value: 'rules + facts' }, { label: 'Action', value: 'move / clean' }],
    code: ['frontier = [start]', 'while frontier:', '    state = best(frontier)', '    if goal(state): return plan', '    frontier += expand(state)'],
    steps: [{ line: 1, statement: 'Initialize frontier', explain: 'Search begins from the current state.', variables: [{ name: 'frontier', value: '[A_dirty]' }] }, { line: 3, statement: 'Choose best state', explain: 'Informed search uses a heuristic score.', variables: [{ name: 'state', value: 'A_dirty' }, { name: 'h', value: '2' }] }, { line: 5, statement: 'Expand actions', explain: 'New reachable states are added.', variables: [{ name: 'frontier', value: '[A_clean, move_B]' }] }],
    input: ['start: A dirty, B dirty'], output: ['plan: clean A -> move B -> clean B'],
    dryRows: [['0', 'frontier has start', 'state=A dirty', 'initialize', '-'], ['1', 'goal? false', 'clean A', 'add successors', '-'], ['2', 'goal? false', 'move B', 'continue search', '-'], ['3', 'goal? true', 'both clean', 'return plan', 'plan ready']],
    memory: { cells: [{ address: 'agent', name: 'belief', value: '{A: dirty, B: dirty}', active: true }, { address: 'rule', name: 'if dirty', value: 'clean' }, { address: 'goal', name: 'target', value: 'all clean' }, { address: 'h(n)', name: 'score', value: 'dirty rooms' }], pointers: [{ name: 'policy', expression: 'state -> action', target: 'clean / move' }], frames: [{ name: 'search()', locals: ['frontier', 'visited', 'plan'] }] },
    error: 'Calling every automation AI hides the agent model: perception, representation, search, action and learning must be identified.',
  },
  promptEngineering: {
    title: 'Prompt Engineering and Effective LLM Communication',
    topics: ['Prompt engineering', 'Types of prompts', 'Zero-shot, one-shot and few-shot prompting', 'Self-consistency', 'Creative thinking prompts', 'Effective writing prompts'],
    problem: 'How does a vague prompt become an instruction that reliably produces useful output?',
    algorithm: ['State role and task', 'Add context and constraints', 'Provide examples when needed', 'Ask for output format', 'Evaluate response and refine'],
    state: [{ label: 'Prompt', value: 'vague -> specific', active: true }, { label: 'Context', value: 'audience + scope' }, { label: 'Examples', value: '0/1/few-shot' }, { label: 'Output', value: 'structured answer' }, { label: 'Check', value: 'accuracy and gaps' }, { label: 'Refine', value: 'next prompt' }],
    code: ['prompt = role + task', 'prompt += context', 'prompt += examples', 'response = model(prompt)', 'revise(prompt, response)'],
    steps: [{ line: 1, statement: 'Set role and task', explain: 'The model receives the communication job.', variables: [{ name: 'role', value: 'teacher' }, { name: 'task', value: 'explain Ohm law' }] }, { line: 3, statement: 'Add examples', explain: 'Few-shot prompting demonstrates the pattern.', variables: [{ name: 'examples', value: '2 worked samples' }] }, { line: 5, statement: 'Refine', explain: 'Missing constraints are put back into the next prompt.', variables: [{ name: 'quality', value: 'improved' }] }],
    input: ['vague: explain electricity'], output: ['specific: explain Ohm law for first year students with one numeric example'],
    dryRows: [['1', 'Too broad', 'scope missing', 'answer drifts', 'refine'], ['2', 'Role added', 'tone clear', 'better explanation', 'add format'], ['3', 'Example added', 'pattern clear', 'usable answer', 'accept']],
    memory: { cells: [{ address: 'P0', name: 'role', value: 'expert engineer' }, { address: 'P1', name: 'task', value: 'solve' }, { address: 'P2', name: 'constraints', value: 'steps + units', active: true }, { address: 'R', name: 'response', value: 'checked' }], pointers: [{ name: 'refinement', expression: 'feedback -> prompt', target: 'P2' }], frames: [{ name: 'prompt loop', locals: ['draft', 'response', 'revision'] }] },
    error: 'A prompt that only names a topic often produces broad text; the communication function, constraints and output form must be explicit.',
  },
  machineLearning: {
    title: 'Machine Learning Methods: Regression, Classification and Clustering',
    topics: ['Machine learning model', 'Regression', 'Classification', 'Clustering', 'Naive Bayes', 'Neural networks', 'Support vector machine'],
    problem: 'Given data, what kind of prediction or grouping task is the model solving?',
    algorithm: ['Collect examples', 'Choose feature representation', 'Select learning task', 'Train model', 'Test prediction and error'],
    state: [{ label: 'Regression', value: 'number output' }, { label: 'Classification', value: 'class label', active: true }, { label: 'Clustering', value: 'groups' }, { label: 'Feature', value: 'x' }, { label: 'Model', value: 'f(x)' }, { label: 'Metric', value: 'error/accuracy' }],
    code: ['data = load_examples()', 'X, y = features(data)', 'model.fit(X, y)', 'prediction = model.predict(new_x)', 'score = evaluate(prediction)'],
    steps: [{ line: 2, statement: 'Separate features and labels', explain: 'The model learns from measurable inputs and target outputs.', variables: [{ name: 'X', value: 'hours studied' }, { name: 'y', value: 'pass/fail' }] }, { line: 3, statement: 'Train model', explain: 'Parameters are adjusted from examples.', variables: [{ name: 'weights', value: 'updated' }] }, { line: 5, statement: 'Evaluate', explain: 'The test result tells whether learning generalized.', variables: [{ name: 'accuracy', value: 'checked' }] }],
    input: ['marks, attendance, label'], output: ['prediction: pass / needs support'],
    dryRows: [['1', 'features ready', 'label known', 'train', '-'], ['2', 'new student', 'label unknown', 'predict', 'pass'], ['3', 'test label available', 'compare', 'update metric', 'accuracy']],
    memory: { cells: [{ address: 'D', name: 'dataset', value: 'rows' }, { address: 'X', name: 'features', value: '[x1,x2]' }, { address: 'y', name: 'label', value: 'class' }, { address: 'M', name: 'model', value: 'parameters', active: true }], pointers: [{ name: 'predict()', expression: 'new_x -> label', target: 'M' }], frames: [{ name: 'train()', locals: ['X', 'y', 'weights'] }] },
    error: 'Do not treat regression, classification and clustering as interchangeable; the output type changes the method and evaluation.',
  },
  aiTrends: {
    title: 'AI Ethics, AIaaS, Expert Systems, IoT and AIoT',
    topics: ['AI ethics', 'AI as a Service', 'Recent trends', 'Expert systems', 'Internet of Things', 'Artificial Intelligence of Things'],
    problem: 'How does an AI service move from sensor data to a decision while staying accountable?',
    algorithm: ['Capture data from device or user', 'Send request to AI service', 'Run model or rule base', 'Return decision with confidence', 'Check privacy, bias and safety'],
    state: [{ label: 'Device', value: 'sensor/user' }, { label: 'Service', value: 'AIaaS endpoint' }, { label: 'Rules', value: 'expert system' }, { label: 'Model', value: 'AI decision', active: true }, { label: 'Ethics', value: 'bias/privacy' }, { label: 'Action', value: 'accepted/reviewed' }],
    code: ['data = sensor.read()', 'request = anonymize(data)', 'decision = ai_service(request)', 'if risk_high(decision):', '    human_review(decision)'],
    steps: [{ line: 1, statement: 'Read data', explain: 'IoT begins with measured context.', variables: [{ name: 'data', value: 'temperature=39' }] }, { line: 3, statement: 'Service decision', explain: 'AIaaS returns a prediction or recommendation.', variables: [{ name: 'decision', value: 'alert' }] }, { line: 4, statement: 'Risk gate', explain: 'Ethical deployment adds review for high-impact decisions.', variables: [{ name: 'risk', value: 'high' }] }],
    input: ['sensor stream + user context'], output: ['decision: alert, route to review'],
    dryRows: [['1', 'data valid', 'request anonymized', 'model runs', 'score=0.86'], ['2', 'risk high', 'review needed', 'branch selected', 'human review'], ['3', 'review done', 'action logged', 'audit trail', 'complete']],
    memory: { cells: [{ address: 'S', name: 'sensor data', value: 'raw' }, { address: 'A', name: 'anonymized', value: 'safe id' }, { address: 'D', name: 'decision', value: 'alert', active: true }, { address: 'L', name: 'log', value: 'audit' }], pointers: [{ name: 'governance', expression: 'decision -> review', target: 'D' }], frames: [{ name: 'ai_service()', locals: ['request', 'score', 'decision'] }] },
    error: 'A trend slide is incomplete if it celebrates capability without showing privacy, bias, review and accountability paths.',
  },
  aiApplications: {
    title: 'Robotics, Drones, No-Code AI and Industrial Applications',
    topics: ['Robotics as AI application', 'Drones using AI', 'No-code AI', 'Low-code AI', 'Healthcare, finance, retail, agriculture, education and transportation applications'],
    problem: 'How does an AI application turn perception into a domain-specific action?',
    algorithm: ['Observe domain input', 'Classify or estimate state', 'Plan action', 'Execute through tool/robot/workflow', 'Measure result and learn'],
    state: [{ label: 'Perception', value: 'camera/data' }, { label: 'Prediction', value: 'object/crop risk' }, { label: 'Plan', value: 'route/action', active: true }, { label: 'Execution', value: 'robot/drone/app' }, { label: 'Feedback', value: 'result' }, { label: 'Domain', value: 'health/agri/transport' }],
    code: ['image = camera.capture()', 'state = model.detect(image)', 'plan = planner.route(state)', 'actuator.execute(plan)', 'log_result(state, plan)'],
    steps: [{ line: 1, statement: 'Capture input', explain: 'The application starts with real-world data.', variables: [{ name: 'image', value: 'field frame' }] }, { line: 2, statement: 'Detect state', explain: 'AI turns pixels/data into an interpretation.', variables: [{ name: 'state', value: 'weed patch' }] }, { line: 4, statement: 'Execute plan', explain: 'The robot or workflow acts on the prediction.', variables: [{ name: 'plan', value: 'spray zone A' }] }],
    input: ['camera frame: crop row'], output: ['action: targeted spray + log'],
    dryRows: [['1', 'image available', 'detect', 'weed found', 'plan'], ['2', 'safe path', 'execute', 'spray zone A', 'log'], ['3', 'feedback', 'measure result', 'model data saved', 'improve']],
    memory: { cells: [{ address: 'I', name: 'input', value: 'image' }, { address: 'M', name: 'model', value: 'detector' }, { address: 'P', name: 'plan', value: 'route', active: true }, { address: 'O', name: 'output', value: 'action' }], pointers: [{ name: 'application loop', expression: 'sense -> act -> learn', target: 'P' }], frames: [{ name: 'robot_cycle()', locals: ['image', 'state', 'plan'] }] },
    error: 'Domain examples must show what input is sensed, what decision is made and what action follows.',
  },
  cComputing: {
    title: 'Computing, C Program Structure, Data Types and Expressions',
    topics: ['Computer languages', 'Creating and running programs', 'C history', 'Compilers and interpreters', 'Program form', 'Data types', 'Variables', 'Operators', 'Expressions'],
    problem: 'How does a C source program become an executable result with stored variable values?',
    algorithm: ['Write source code', 'Preprocess and compile', 'Link library code', 'Load executable', 'Execute statements and update memory'],
    state: [{ label: 'Source', value: 'hello.c' }, { label: 'Compiler', value: 'checks syntax' }, { label: 'Linker', value: 'adds libraries' }, { label: 'Memory', value: 'variables', active: true }, { label: 'Expression', value: 'a+b' }, { label: 'Output', value: 'printf' }],
    code: ['#include <stdio.h>', 'int main(void) {', '    int a = 5, b = 3;', '    int sum = a + b;', '    printf("%d", sum);', '    return 0;', '}'],
    steps: [{ line: 3, statement: 'Declare and initialize', explain: 'Memory cells for a and b receive values.', variables: [{ name: 'a', value: '5' }, { name: 'b', value: '3' }] }, { line: 4, statement: 'Evaluate expression', explain: 'The right side is computed before assignment.', variables: [{ name: 'sum', before: 'uninitialized', value: '8', after: '8' }] }, { line: 5, statement: 'Print result', explain: 'The value stored in sum is sent to output.', variables: [{ name: 'output', value: '8' }] }],
    input: ['$ gcc sum.c -o sum', '$ ./sum'], output: ['8'],
    dryRows: [['1', 'line 3', 'a=5,b=3', 'allocate + assign', '-'], ['2', 'line 4', 'sum=? -> 8', 'a+b', '-'], ['3', 'line 5', 'sum=8', 'printf', '8']],
    memory: { cells: [{ address: '0x100', name: 'a', value: '5' }, { address: '0x104', name: 'b', value: '3' }, { address: '0x108', name: 'sum', value: '8', active: true }, { address: 'stdout', name: 'screen', value: '8' }], pointers: [{ name: 'assignment', expression: 'sum = a + b', target: '0x108' }], frames: [{ name: 'main()', locals: ['a=5', 'b=3', 'sum=8'] }] },
    error: 'Using an uninitialized variable in an expression produces an unpredictable value.',
  },
  cControl: {
    title: 'Console I/O, Conditions, Loops and Statements',
    topics: ['Character and string I/O', 'printf and scanf', 'True and false in C', 'Selection statements', 'Iteration statements', 'Jump statements', 'Blocks'],
    problem: 'How does input pass through a condition and a loop to create output?',
    algorithm: ['Read input', 'Initialize accumulator', 'Check loop condition', 'Update state in body', 'Stop and print result'],
    state: [{ label: 'Input', value: 'n=4' }, { label: 'Loop', value: 'i<=n', active: true }, { label: 'Accumulator', value: 'sum' }, { label: 'Branch', value: 'condition true/false' }, { label: 'Output', value: 'sum' }, { label: 'Statement', value: 'block scope' }],
    code: ['int n = 4;', 'int sum = 0;', 'for (int i = 1; i <= n; i++) {', '    sum = sum + i;', '}', 'printf("%d", sum);'],
    steps: [{ line: 2, statement: 'Initialize sum', explain: 'The accumulator must start from a known value.', variables: [{ name: 'sum', value: '0' }] }, { line: 3, statement: 'Check condition', explain: 'Loop body runs only while i <= n is true.', variables: [{ name: 'i', value: '1' }, { name: 'n', value: '4' }] }, { line: 4, statement: 'Update accumulator', explain: 'Each iteration adds the current i.', variables: [{ name: 'sum', before: '6', value: '10', after: '10' }, { name: 'i', value: '4' }] }],
    input: ['n = 4'], output: ['10'],
    dryRows: [['1', '1<=4 true', 'sum=0,i=1', 'sum=sum+i', '-'], ['2', '2<=4 true', 'sum=1,i=2', 'sum=3', '-'], ['3', '3<=4 true', 'sum=3,i=3', 'sum=6', '-'], ['4', '4<=4 true', 'sum=6,i=4', 'sum=10', '-'], ['5', '5<=4 false', 'sum=10', 'exit loop', '10']],
    memory: { cells: [{ address: '0x100', name: 'n', value: '4' }, { address: '0x104', name: 'sum', value: '10', active: true }, { address: '0x108', name: 'i', value: '5' }, { address: 'stdout', name: 'screen', value: '10' }], pointers: [{ name: 'loop update', expression: 'i++', target: '0x108' }], frames: [{ name: 'main()', locals: ['n=4', 'sum=10', 'i=5'] }] },
    error: 'Off-by-one loop bounds change the number of iterations and therefore the final output.',
  },
  cArraysPointers: {
    title: 'Arrays, Strings and Pointers',
    topics: ['One-dimensional arrays', 'Two-dimensional arrays', 'Strings', 'Passing arrays to functions', 'Pointer variables', 'Pointer operators', 'Pointers and arrays', 'Multiple indirection'],
    problem: 'How do array indices and pointer addresses refer to the same stored data?',
    algorithm: ['Declare array storage', 'Start at index zero', 'Compare or update active cell', 'Move to next index', 'Use address when pointer access is needed'],
    state: [{ label: 'Array', value: 'a[0..4]' }, { label: 'Index', value: 'i' }, { label: 'Pointer', value: 'p=&a[0]', active: true }, { label: 'String', value: 'char[]' }, { label: 'Traversal', value: 'i++' }, { label: 'Result', value: 'found/sum' }],
    code: ['int a[5] = {2, 4, 7, 9, 11};', 'int key = 7;', 'for (int i = 0; i < 5; i++) {', '    if (a[i] == key) break;', '}', 'int *p = &a[2];'],
    steps: [{ line: 1, statement: 'Create indexed cells', explain: 'The array stores contiguous elements.', variables: [{ name: 'a[0..4]', value: '2,4,7,9,11' }] }, { line: 4, statement: 'Compare active element', explain: 'At i=2 the key is found.', variables: [{ name: 'i', value: '2' }, { name: 'a[i]', value: '7' }, { name: 'key', value: '7' }] }, { line: 6, statement: 'Pointer receives address', explain: 'p stores the address of a[2], not another copy of 7.', variables: [{ name: 'p', value: '&a[2]' }, { name: '*p', value: '7' }] }],
    input: ['key = 7'], output: ['found at index 2'],
    dryRows: [['0', 'i<5 true', 'a[0]=2', '2==7 false', '-'], ['1', 'i<5 true', 'a[1]=4', '4==7 false', '-'], ['2', 'i<5 true', 'a[2]=7', '7==7 true', 'found']],
    memory: { cells: [{ address: '0x200', name: 'a[0]', value: '2' }, { address: '0x204', name: 'a[1]', value: '4' }, { address: '0x208', name: 'a[2]', value: '7', active: true }, { address: '0x20c', name: 'a[3]', value: '9' }, { address: '0x210', name: 'a[4]', value: '11' }, { address: '0x300', name: 'p', value: '0x208' }], pointers: [{ name: 'p', expression: 'p = &a[2]', target: '0x208' }, { name: '*p', expression: 'dereference', target: '7' }], frames: [{ name: 'main()', locals: ['a[5]', 'key=7', 'i=2', 'p=&a[2]'] }] },
    error: 'Accessing a[5] in a five-element array crosses the valid index range 0..4.',
    array: [2, 4, 7, 9, 11],
  },
  cFunctions: {
    title: 'Functions, Arguments, Return Values, Recursion and Dynamic Allocation',
    topics: ['Function form', 'Function scope', 'Arguments', 'return statement', 'main return', 'Recursion', 'Function prototypes', 'Pointers to functions', 'Dynamic allocation'],
    problem: 'How does a function call create local state and return a value to the caller?',
    algorithm: ['Caller evaluates arguments', 'New stack frame is created', 'Function executes with local variables', 'Return value is produced', 'Caller resumes after the call'],
    state: [{ label: 'Caller', value: 'main' }, { label: 'Argument', value: '5' }, { label: 'Frame', value: 'fact(n)', active: true }, { label: 'Base case', value: 'n==1' }, { label: 'Return', value: 'value' }, { label: 'Heap', value: 'malloc when used' }],
    code: ['int fact(int n) {', '    if (n == 1) return 1;', '    return n * fact(n - 1);', '}', 'int ans = fact(4);'],
    steps: [{ line: 5, statement: 'Call fact(4)', explain: 'main pauses while a function frame is pushed.', variables: [{ name: 'ans', before: '?', value: 'waiting' }] }, { line: 3, statement: 'Recursive call', explain: 'Each call has its own n.', variables: [{ name: 'n', value: '4 -> 3 -> 2 -> 1' }] }, { line: 2, statement: 'Base case', explain: 'The recursion stops and returns begin.', variables: [{ name: 'return', value: '1 -> 2 -> 6 -> 24' }] }],
    input: ['fact(4)'], output: ['24'],
    dryRows: [['call 1', 'n=4', 'not base', '4*fact(3)', '-'], ['call 2', 'n=3', 'not base', '3*fact(2)', '-'], ['call 3', 'n=2', 'not base', '2*fact(1)', '-'], ['call 4', 'n=1', 'base', 'return 1', 'unwind'], ['return', '4*6', 'ans=24', 'caller resumes', '24']],
    memory: { cells: [{ address: 'main', name: 'ans', value: '24', active: true }, { address: 'F4', name: 'n', value: '4' }, { address: 'F3', name: 'n', value: '3' }, { address: 'F2', name: 'n', value: '2' }, { address: 'F1', name: 'n', value: '1' }], pointers: [{ name: 'return path', expression: 'fact(1) -> fact(4)', target: 'ans' }], frames: [{ name: 'main()', locals: ['ans=fact(4)'] }, { name: 'fact(4)', locals: ['n=4'] }, { name: 'fact(3)', locals: ['n=3'] }] },
    error: 'A recursive function without a reachable base case keeps creating frames until the stack is exhausted.',
  },
  cStructures: {
    title: 'Structures, Unions, Enumerations and typedef',
    topics: ['Structures', 'Arrays of structures', 'Passing structures to functions', 'Structure pointers', 'Nested structures', 'Unions', 'Bit-fields', 'Enumerations', 'sizeof', 'typedef'],
    problem: 'How does a structure group related values while a pointer accesses fields through one address?',
    algorithm: ['Define record fields', 'Declare instance', 'Assign each member', 'Pass or point to instance', 'Read fields for output or computation'],
    state: [{ label: 'struct', value: 'template' }, { label: 'instance', value: 'emp1', active: true }, { label: 'field', value: '.salary' }, { label: 'pointer', value: 'ptr->salary' }, { label: 'union', value: 'shared storage' }, { label: 'enum', value: 'named constants' }],
    code: ['struct Emp { int id; float salary; };', 'struct Emp e = {101, 45000};', 'struct Emp *p = &e;', 'if (p->salary > 40000)', '    printf("%d", p->id);'],
    steps: [{ line: 1, statement: 'Define structure layout', explain: 'The type names the fields and their order.', variables: [{ name: 'Emp', value: 'id + salary' }] }, { line: 2, statement: 'Create instance', explain: 'e contains actual field values.', variables: [{ name: 'e.id', value: '101' }, { name: 'e.salary', value: '45000' }] }, { line: 3, statement: 'Point to structure', explain: 'p stores the address of e; -> accesses members.', variables: [{ name: 'p', value: '&e' }, { name: 'p->id', value: '101' }] }],
    input: ['employee record'], output: ['101'],
    dryRows: [['1', 'e created', 'id=101 salary=45000', 'p=&e', '-'], ['2', '45000>40000 true', 'selected branch', 'printf id', '101']],
    memory: { cells: [{ address: '0x500', name: 'e.id', value: '101', active: true }, { address: '0x504', name: 'e.salary', value: '45000' }, { address: '0x600', name: 'p', value: '0x500' }, { address: 'stdout', name: 'screen', value: '101' }], pointers: [{ name: 'p', expression: 'p = &e', target: '0x500' }, { name: 'p->salary', expression: 'field through pointer', target: '45000' }], frames: [{ name: 'main()', locals: ['e', 'p=&e'] }] },
    error: 'A union shares storage among members; it should not be read as if every member holds an independent value at once.',
  },
  itStorage: {
    title: 'Data Storage, Bit Patterns and Computer Architecture',
    topics: ['Bits and storage', 'Main memory', 'Mass storage', 'Binary system', 'Integer and fraction representation', 'Machine language', 'Program execution', 'I/O devices'],
    problem: 'How does a decimal value become a bit pattern stored and manipulated by hardware?',
    algorithm: ['Divide decimal number by base 2', 'Record each remainder', 'Continue until quotient is zero', 'Reverse remainders', 'Store result as bits'],
    state: [{ label: 'Decimal', value: '13' }, { label: 'Base', value: '2' }, { label: 'Remainders', value: '1,0,1,1', active: true }, { label: 'Binary', value: '1101' }, { label: 'Memory', value: 'bit cells' }, { label: 'CPU', value: 'fetch-decode-execute' }],
    code: ['13 / 2 = 6 remainder 1', '6 / 2 = 3 remainder 0', '3 / 2 = 1 remainder 1', '1 / 2 = 0 remainder 1', 'reverse -> 1101'],
    steps: [{ line: 1, statement: 'First division', explain: 'The least significant bit is found first.', variables: [{ name: 'quotient', value: '6' }, { name: 'remainder', value: '1' }] }, { line: 4, statement: 'Stop at zero', explain: 'No quotient remains, so conversion is complete.', variables: [{ name: 'remainders', value: '1,0,1,1' }] }, { line: 5, statement: 'Reverse remainders', explain: 'Reading upward gives the stored binary value.', variables: [{ name: 'binary', value: '1101' }] }],
    input: ['decimal 13'], output: ['binary 1101'],
    dryRows: [['1', '13/2', 'q=6', 'r=1', 'save'], ['2', '6/2', 'q=3', 'r=0', 'save'], ['3', '3/2', 'q=1', 'r=1', 'save'], ['4', '1/2', 'q=0', 'r=1', 'reverse -> 1101']],
    memory: { cells: [{ address: 'bit3', name: '8s', value: '1', active: true }, { address: 'bit2', name: '4s', value: '1' }, { address: 'bit1', name: '2s', value: '0' }, { address: 'bit0', name: '1s', value: '1' }], pointers: [{ name: 'value', expression: '8+4+0+1', target: '13' }], frames: [{ name: 'CPU cycle', locals: ['fetch', 'decode', 'execute'] }] },
    error: 'Do not write remainders in the order generated; decimal-to-binary division is read from bottom to top.',
  },
  itOsAlgorithms: {
    title: 'Operating Systems and Algorithm Representation',
    topics: ['OS history', 'Architecture', 'Coordinating machine activities', 'Process competition', 'Security', 'Algorithm concept', 'Algorithm representation', 'Algorithm discovery'],
    problem: 'How does an operating system coordinate competing processes fairly and safely?',
    algorithm: ['Process requests CPU', 'OS checks ready queue', 'Scheduler selects next process', 'Context switch saves/restores state', 'Security policy allows or denies access'],
    state: [{ label: 'Ready Queue', value: 'P1,P2,P3', active: true }, { label: 'CPU', value: 'P1' }, { label: 'State', value: 'registers' }, { label: 'Security', value: 'permission check' }, { label: 'Algorithm', value: 'scheduler' }, { label: 'Output', value: 'process runs' }],
    code: ['ready = [P1, P2, P3]', 'while ready:', '    p = ready.pop(0)', '    run(p, quantum)', '    if p.not_done: ready.append(p)'],
    steps: [{ line: 1, statement: 'Queue ready processes', explain: 'The OS stores runnable work.', variables: [{ name: 'ready', value: '[P1,P2,P3]' }] }, { line: 3, statement: 'Select P1', explain: 'The scheduler chooses the next process.', variables: [{ name: 'p', value: 'P1' }] }, { line: 5, statement: 'Append if unfinished', explain: 'Competition is handled by controlled re-entry.', variables: [{ name: 'ready', value: '[P2,P3,P1]' }] }],
    input: ['P1, P2, P3 ready'], output: ['CPU order: P1 -> P2 -> P3 -> P1'],
    dryRows: [['1', 'queue nonempty', 'p=P1', 'run quantum', 'P1 requeued'], ['2', 'queue nonempty', 'p=P2', 'run quantum', 'P2 done'], ['3', 'queue nonempty', 'p=P3', 'run quantum', 'P3 requeued']],
    memory: { cells: [{ address: 'PCB1', name: 'P1 state', value: 'ready', active: true }, { address: 'PCB2', name: 'P2 state', value: 'ready' }, { address: 'CPU', name: 'current', value: 'P1' }, { address: 'ACL', name: 'permission', value: 'checked' }], pointers: [{ name: 'scheduler', expression: 'ready queue -> CPU', target: 'P1' }], frames: [{ name: 'schedule()', locals: ['ready', 'p', 'quantum'] }] },
    error: 'An algorithm representation must include order and decision points; a loose topic list is not an algorithm.',
  },
  itNetworkingSecurity: {
    title: 'Networking, Internet, Cybersecurity and Ethics',
    topics: ['Network fundamentals', 'Internet', 'World Wide Web', 'Internet protocols', 'Security', 'Cybersecurity history', 'Information security model', 'Cyber hygiene', 'Ethical issues'],
    problem: 'How does a message move through a network while security controls protect it?',
    algorithm: ['Create application message', 'Add protocol headers', 'Route packets across network', 'Verify identity and integrity', 'Deliver and render content'],
    state: [{ label: 'Message', value: 'GET page' }, { label: 'Protocol', value: 'HTTP/TCP/IP', active: true }, { label: 'Packet', value: 'header+data' }, { label: 'Security', value: 'CIA model' }, { label: 'Ethics', value: 'ownership/content' }, { label: 'Destination', value: 'browser' }],
    code: ['message = "GET /index.html"', 'packet = add_headers(message)', 'route(packet)', 'if verify(packet):', '    deliver(packet.data)'],
    steps: [{ line: 1, statement: 'Create message', explain: 'The web request begins at the application layer.', variables: [{ name: 'message', value: 'GET /index.html' }] }, { line: 2, statement: 'Add headers', explain: 'Protocols add addresses and control information.', variables: [{ name: 'packet', value: 'IP+TCP+HTTP' }] }, { line: 4, statement: 'Verify packet', explain: 'Security checks protect integrity and authenticity.', variables: [{ name: 'valid', value: 'true' }] }],
    input: ['URL request'], output: ['HTML page delivered'],
    dryRows: [['1', 'message ready', 'headers added', 'route', '-'], ['2', 'arrives', 'verify true', 'deliver data', 'page'], ['3', 'verify false', 'block', 'alert', 'security event']],
    memory: { cells: [{ address: 'app', name: 'HTTP', value: 'GET' }, { address: 'tcp', name: 'segment', value: 'port' }, { address: 'ip', name: 'packet', value: 'address', active: true }, { address: 'sec', name: 'hash/auth', value: 'valid' }], pointers: [{ name: 'encapsulation', expression: 'message -> packet', target: 'ip' }], frames: [{ name: 'network_send()', locals: ['message', 'packet', 'route'] }] },
    error: 'Cybersecurity is not only antivirus; confidentiality, integrity, availability, hygiene and ethics all shape safe computing.',
  },
  itSoftwareDatabase: {
    title: 'Software Engineering and Database Systems',
    topics: ['Software engineering discipline', 'Software life cycle', 'Methodologies', 'Modularity', 'Tools', 'Database fundamentals', 'Relational model'],
    problem: 'How does a user requirement become modular software backed by relational data?',
    algorithm: ['Capture requirement', 'Design modules and data model', 'Implement and test', 'Store entities in tables', 'Query and maintain the system'],
    state: [{ label: 'Requirement', value: 'student marks' }, { label: 'Module', value: 'input/report' }, { label: 'Table', value: 'Student', active: true }, { label: 'Key', value: 'USN' }, { label: 'Query', value: 'SELECT' }, { label: 'Test', value: 'expected result' }],
    code: ['CREATE TABLE Student(usn, name, marks);', 'INSERT INTO Student VALUES("1VV", "Asha", 89);', 'SELECT name FROM Student WHERE marks > 80;'],
    steps: [{ line: 1, statement: 'Define table', explain: 'The relational model stores rows with named attributes.', variables: [{ name: 'Student', value: 'usn,name,marks' }] }, { line: 2, statement: 'Insert row', explain: 'One entity instance becomes one row.', variables: [{ name: 'row', value: '1VV,Asha,89' }] }, { line: 3, statement: 'Query condition', explain: 'The DBMS filters rows by the predicate.', variables: [{ name: 'output', value: 'Asha' }] }],
    input: ['marks table'], output: ['Asha'],
    dryRows: [['1', 'table created', 'row inserted', 'marks=89', '-'], ['2', '89>80 true', 'select name', 'Asha', 'output']],
    memory: { cells: [{ address: 'R', name: 'requirement', value: 'report' }, { address: 'M1', name: 'input module', value: 'form' }, { address: 'DB', name: 'Student row', value: 'Asha,89', active: true }, { address: 'Q', name: 'query', value: 'marks>80' }], pointers: [{ name: 'data flow', expression: 'module -> table -> report', target: 'DB' }], frames: [{ name: 'life_cycle', locals: ['analysis', 'design', 'code', 'test'] }] },
    error: 'A table without keys and relationships is just a grid; relational design needs identity and meaning.',
  },
  itWebGraphics: {
    title: 'HTML, Website Development and Computer Graphics',
    topics: ['HTML', 'CSS', 'Website design', 'Storyboarding', 'Website structure', 'Scope of graphics', '3D graphics', 'Modeling', 'Rendering'],
    problem: 'How does source markup and style become a rendered web page or 3D scene?',
    algorithm: ['Write semantic HTML structure', 'Apply CSS presentation rules', 'Load assets', 'Build render tree or model', 'Paint pixels to screen'],
    state: [{ label: 'HTML', value: 'structure', active: true }, { label: 'CSS', value: 'style' }, { label: 'Storyboard', value: 'screen plan' }, { label: 'Model', value: '3D object' }, { label: 'Renderer', value: 'pixels' }, { label: 'Output', value: 'page/scene' }],
    code: ['<h1>Campus</h1>', '<p>Welcome</p>', 'h1 { color: navy; }', 'browser parses DOM + CSSOM', 'render pixels'],
    steps: [{ line: 1, statement: 'HTML heading', explain: 'Markup gives the content role.', variables: [{ name: 'node', value: 'h1' }] }, { line: 3, statement: 'CSS rule', explain: 'Style changes presentation without changing meaning.', variables: [{ name: 'color', value: 'navy' }] }, { line: 5, statement: 'Render', explain: 'The browser paints the visible result.', variables: [{ name: 'screen', value: 'Campus page' }] }],
    input: ['HTML + CSS'], output: ['rendered web page'],
    dryRows: [['1', 'parse HTML', 'DOM node h1', 'style pending', '-'], ['2', 'parse CSS', 'color=navy', 'layout', '-'], ['3', 'paint', 'pixels written', 'page visible', 'Campus']],
    memory: { cells: [{ address: 'DOM', name: 'h1', value: 'Campus', active: true }, { address: 'CSSOM', name: 'rule', value: 'color navy' }, { address: 'GPU', name: 'framebuffer', value: 'pixels' }, { address: '3D', name: 'model', value: 'mesh' }], pointers: [{ name: 'render tree', expression: 'DOM + CSSOM', target: 'framebuffer' }], frames: [{ name: 'browser_render()', locals: ['parse', 'layout', 'paint'] }] },
    error: 'HTML is not styling and CSS is not content; mixing the roles makes maintenance and accessibility weaker.',
  },
  pyBasics: {
    title: 'Python Programs, Debugging, Variables, Expressions, Iteration and Functions',
    topics: ['Python language', 'Program and debugging', 'Syntax/runtime/semantic errors', 'Variables', 'Expressions', 'Operators', 'Input', 'for and while loops', 'Nested loops', 'Functions'],
    problem: 'How does Python execute statements and expose errors while variables change?',
    algorithm: ['Read input', 'Convert type', 'Initialize variables', 'Iterate while condition holds', 'Return or print result'],
    state: [{ label: 'Input', value: 'n=5' }, { label: 'Type', value: 'int' }, { label: 'Loop', value: 'for i in range', active: true }, { label: 'Function', value: 'return' }, { label: 'Error', value: 'syntax/runtime/semantic' }, { label: 'Output', value: 'result' }],
    code: ['def total(n):', '    s = 0', '    for i in range(1, n + 1):', '        s = s + i', '    return s', 'print(total(5))'],
    steps: [{ line: 2, statement: 'Initialize s', explain: 'The accumulator starts at zero.', variables: [{ name: 's', value: '0' }] }, { line: 3, statement: 'Iterate range', explain: 'range(1, n+1) produces 1 through 5.', variables: [{ name: 'i', value: '1..5' }] }, { line: 4, statement: 'Update s', explain: 'Each loop adds the current i.', variables: [{ name: 's', before: '10', value: '15', after: '15' }] }],
    input: ['n = 5'], output: ['15'],
    dryRows: [['1', 'i=1', 's=0', 's=1', '-'], ['2', 'i=2', 's=1', 's=3', '-'], ['3', 'i=3', 's=3', 's=6', '-'], ['4', 'i=4', 's=6', 's=10', '-'], ['5', 'i=5', 's=10', 's=15', '15']],
    memory: { cells: [{ address: 'frame total', name: 'n', value: '5' }, { address: 'frame total', name: 's', value: '15', active: true }, { address: 'frame total', name: 'i', value: '5' }, { address: 'caller', name: 'return', value: '15' }], pointers: [{ name: 'call', expression: 'print -> total(5)', target: 'return' }], frames: [{ name: 'global', locals: ['total', 'print(...)'] }, { name: 'total(n)', locals: ['n=5', 's=15', 'i=5'] }] },
    error: 'A semantic error may run without crashing but still produce the wrong answer.',
  },
  pyStringsLists: {
    title: 'Strings, Tuples, Lists, Aliasing and Matrices',
    topics: ['String traversal', 'Slices', 'Comparison', 'Immutability', 'find/split/format', 'Tuples', 'Lists', 'Mutability', 'Aliasing', 'List methods', 'Nested lists', 'Matrices'],
    problem: 'How does indexing reveal parts of a string or list while mutability changes only some objects?',
    algorithm: ['Choose index or slice', 'Read active element', 'Apply operation', 'Update list if mutable', 'Preserve string by creating new value'],
    state: [{ label: 'String', value: '"vtu"' }, { label: 'List', value: '[3,1,4]' }, { label: 'Index', value: '0..n-1', active: true }, { label: 'Alias', value: 'same object' }, { label: 'Tuple', value: 'grouped data' }, { label: 'Matrix', value: 'nested list' }],
    code: ['marks = [30, 45, 40]', 'alias = marks', 'marks.append(50)', 'name = "vtu"', 'part = name[1:3]', 'print(alias, part)'],
    steps: [{ line: 2, statement: 'Create alias', explain: 'alias refers to the same list object.', variables: [{ name: 'alias', value: 'marks object' }] }, { line: 3, statement: 'Append item', explain: 'The list is mutable, so both names see the change.', variables: [{ name: 'marks', value: '[30,45,40,50]' }, { name: 'alias', value: '[30,45,40,50]' }] }, { line: 5, statement: 'Slice string', explain: 'Strings are immutable; slicing creates a new string.', variables: [{ name: 'part', value: '"tu"' }] }],
    input: ['marks list + name'], output: ['[30, 45, 40, 50] tu'],
    dryRows: [['1', 'alias=marks', 'two names', 'same list', '-'], ['2', 'append 50', 'list changes', 'alias sees change', '-'], ['3', 'slice [1:3]', 'new string', 'part=tu', 'output']],
    memory: { cells: [{ address: 'L1', name: 'marks list', value: '[30,45,40,50]', active: true }, { address: 'N1', name: 'marks', value: '-> L1' }, { address: 'N2', name: 'alias', value: '-> L1' }, { address: 'S1', name: 'part', value: 'tu' }], pointers: [{ name: 'marks', expression: 'name -> object', target: 'L1' }, { name: 'alias', expression: 'name -> same object', target: 'L1' }], frames: [{ name: 'global', locals: ['marks', 'alias', 'name', 'part'] }] },
    error: 'Aliasing a mutable list is not copying; a change through either name changes the same object.',
    array: [30, 45, 40, 50],
  },
  pyDictFiles: {
    title: 'Dictionaries, NumPy and File Processing',
    topics: ['Dictionary operations', 'Dictionary methods', 'Aliasing and copying', 'NumPy shape/slicing/masking/broadcasting/dtype', 'Writing files', 'Reading files', 'Binary files', 'Directories', 'Fetching from web'],
    problem: 'How does a dictionary count words from a file line by line?',
    algorithm: ['Open file', 'Read each line', 'Split line into words', 'Update dictionary count', 'Sort or report results'],
    state: [{ label: 'File', value: 'text.txt' }, { label: 'Line', value: 'current text' }, { label: 'Dictionary', value: '{word: count}', active: true }, { label: 'NumPy', value: 'array shape' }, { label: 'Directory', value: 'path' }, { label: 'Output', value: 'top words' }],
    code: ['counts = {}', 'for line in file:', '    for word in line.split():', '        counts[word] = counts.get(word, 0) + 1', 'print(counts)'],
    steps: [{ line: 1, statement: 'Start empty dictionary', explain: 'Keys will be distinct words.', variables: [{ name: 'counts', value: '{}' }] }, { line: 3, statement: 'Split into words', explain: 'Each token becomes a candidate key.', variables: [{ name: 'word', value: 'data' }] }, { line: 4, statement: 'Update count', explain: 'get handles the first occurrence safely.', variables: [{ name: 'counts[\"data\"]', before: '1', value: '2', after: '2' }] }],
    input: ['data data science'], output: ["{'data': 2, 'science': 1}"],
    dryRows: [['1', 'word=data', '{}', '0+1', "{data:1}"], ['2', 'word=data', '{data:1}', '1+1', "{data:2}"], ['3', 'word=science', '{data:2}', '0+1', "{science:1}"]],
    memory: { cells: [{ address: 'D', name: 'counts', value: "{data:2, science:1}", active: true }, { address: 'F', name: 'file', value: 'open stream' }, { address: 'W', name: 'word', value: 'science' }, { address: 'A', name: 'numpy array', value: 'shape=(3,)' }], pointers: [{ name: 'file handle', expression: 'for line in file', target: 'F' }], frames: [{ name: 'count_words()', locals: ['counts', 'line', 'word'] }] },
    error: 'Reading a file all at once can hide line-by-line state; beginners should first trace the stream, the current word and the dictionary update.',
  },
  pyModulesObjects: {
    title: 'Modules, Namespaces, Scope, Aliasing and Classes',
    topics: ['Random, time and math modules', 'Creating modules', 'Namespaces', 'Scope lookup', 'Attributes and dot operator', 'Import variants', 'Mutable versus immutable', 'Classes and objects', 'Methods', 'Instances as arguments and return values'],
    problem: 'How does an object keep attribute state while methods operate on that state?',
    algorithm: ['Define class', 'Create instance', 'Store attributes on self', 'Call method with object as receiver', 'Return or mutate object state'],
    state: [{ label: 'Module', value: 'math/random' }, { label: 'Namespace', value: 'name lookup' }, { label: 'Class', value: 'Complex' }, { label: 'Object', value: 'c1', active: true }, { label: 'Attribute', value: 'real, imag' }, { label: 'Method', value: 'add' }],
    code: ['class Counter:', '    def __init__(self): self.value = 0', '    def inc(self): self.value += 1', 'c = Counter()', 'c.inc()', 'print(c.value)'],
    steps: [{ line: 4, statement: 'Create object', explain: 'The instance gets its own attribute storage.', variables: [{ name: 'c.value', value: '0' }] }, { line: 5, statement: 'Call method', explain: 'self refers to c inside inc.', variables: [{ name: 'self', value: 'c' }, { name: 'value', before: '0', value: '1', after: '1' }] }, { line: 6, statement: 'Print attribute', explain: 'Dot lookup reads the current object state.', variables: [{ name: 'output', value: '1' }] }],
    input: ['Counter object'], output: ['1'],
    dryRows: [['1', 'c=Counter()', 'value=0', 'object created', '-'], ['2', 'c.inc()', 'self=c', 'value=1', '-'], ['3', 'print', 'read value', 'output', '1']],
    memory: { cells: [{ address: 'Obj1', name: 'c.value', value: '1', active: true }, { address: 'Class', name: 'Counter', value: '__init__, inc' }, { address: 'N', name: 'c', value: '-> Obj1' }, { address: 'M', name: 'math', value: 'namespace' }], pointers: [{ name: 'self', expression: 'method receiver', target: 'Obj1' }], frames: [{ name: 'global', locals: ['Counter', 'c'] }, { name: 'inc(self)', locals: ['self=Obj1'] }] },
    error: 'A method call is not magic; the receiver object supplies the state that self updates.',
  },
  pyInheritanceExceptions: {
    title: 'Objects, Inheritance, Polymorphism and Exceptions',
    topics: ['Mutable objects', 'Sameness', 'Copying', 'Inheritance', 'Pure functions', 'Modifiers', 'Generalization', 'Operator overloading', 'Polymorphism', 'Catching exceptions', 'Raising exceptions'],
    problem: 'How does a program continue safely when a function detects invalid input?',
    algorithm: ['Enter try block', 'Call function', 'Check assertion or divisor', 'Raise exception on invalid case', 'Catch and report useful message'],
    state: [{ label: 'Object', value: 'mutable' }, { label: 'Inheritance', value: 'reuse behavior' }, { label: 'Polymorphism', value: 'same call, different class' }, { label: 'Try', value: 'protected code', active: true }, { label: 'Raise', value: 'invalid b=0' }, { label: 'Except', value: 'handled' }],
    code: ['def div_exp(a, b):', '    assert a > 0', '    if b == 0: raise ZeroDivisionError()', '    return a / b', 'try:', '    print(div_exp(10, 0))', 'except ZeroDivisionError:', '    print("division by zero")'],
    steps: [{ line: 6, statement: 'Call function', explain: 'The protected call is inside try.', variables: [{ name: 'a', value: '10' }, { name: 'b', value: '0' }] }, { line: 3, statement: 'Raise exception', explain: 'Division by zero is detected before return.', variables: [{ name: 'exception', value: 'ZeroDivisionError' }] }, { line: 8, statement: 'Handle exception', explain: 'Control jumps to except and a clear message is printed.', variables: [{ name: 'output', value: 'division by zero' }] }],
    input: ['a=10, b=0'], output: ['division by zero'],
    dryRows: [['1', 'a>0 true', 'b=0', 'raise exception', '-'], ['2', 'try catches', 'ZeroDivisionError', 'except branch', 'division by zero']],
    memory: { cells: [{ address: 'F', name: 'a', value: '10' }, { address: 'F', name: 'b', value: '0', active: true }, { address: 'E', name: 'exception', value: 'ZeroDivisionError' }, { address: 'stdout', name: 'screen', value: 'division by zero' }], pointers: [{ name: 'control transfer', expression: 'raise -> except', target: 'E' }], frames: [{ name: 'global', locals: ['try/except'] }, { name: 'div_exp()', locals: ['a=10', 'b=0'] }] },
    error: 'Catching every exception with no explanation hides the actual fault and makes debugging harder.',
  },
}

moduleLibrary.introCFlow = { ...moduleLibrary.cComputing, title: 'Flowcharts, Algorithms, C Structure, Constants, Variables and Data Types', topics: ['Flowcharts', 'Algorithms', 'History and importance of C', 'Basic structure', 'Programming style', 'Compile and execute', 'Constants', 'Variables', 'Data types', 'Input/output statements'] }
moduleLibrary.introCControl = { ...moduleLibrary.cControl, title: 'Operators, Decision Making, Branching and Looping', topics: ['Arithmetic, relational and logical operators', 'Assignment', 'Increment and decrement', 'Conditional operator', 'Precedence', 'if and if-else', 'else-if ladder', 'switch', 'goto', 'while', 'do', 'for', 'jumps in loops'] }
moduleLibrary.introCArraysStrings = { ...moduleLibrary.cArraysPointers, title: 'Arrays and Strings', topics: ['One-dimensional arrays', 'Two-dimensional arrays', 'String variables', 'Array programs', 'Reading strings', 'Writing strings', 'Character arithmetic', 'String comparison', 'String handling functions'] }
moduleLibrary.introCFunctions = { ...moduleLibrary.cFunctions, title: 'User-defined Functions', topics: ['Need for user-defined functions', 'Multi-functional program', 'Function elements', 'Definition', 'Return values', 'Function calls', 'Function declaration', 'No arguments/no return', 'Arguments/no return', 'Nested functions'] }
moduleLibrary.introCStructuresPointers = { ...moduleLibrary.cStructures, title: 'Structures and Pointers', topics: ['Defining structures', 'Structure variables and members', 'Initialization', 'Copying and comparing structures', 'Array of structures', 'Arrays within structures', 'Understanding pointers', 'Address-of', 'Pointer variables', 'Dereferencing'] }

function sourceSlides(subject, moduleIndex, sourceDepth) {
  return makeSourceTeachingSlides({
    idPrefix: `${subject.id}-m${moduleIndex + 1}-source`,
    sourceDepth,
    tone: 'code',
    footer: `${subject.code} / Module ${moduleIndex + 1}`,
    compositionFor: () => 'code-execution',
  })
}

function makeSlides(subject, module, moduleIndex, sourceDepth) {
  const moduleLabel = `Module ${moduleIndex + 1}`
  const baseId = `${subject.id}-m${moduleIndex + 1}`
  const core = [
    {
      id: `${baseId}-opening`,
      title: module.title,
      subtitle: module.problem,
      composition: 'programming-opening',
      content: (
        <FoundationSlide layout="visual-hero" tone="code" title={module.title} subtitle={module.problem} footer={`${subject.code} / ${moduleLabel}`}>
          <div className="fy-programming-opening" data-slide-content="true">
            {module.topics.slice(0, 8).map((topic, index) => <span key={topic} style={{ '--i': index }}>{topic}</span>)}
          </div>
        </FoundationSlide>
      ),
      takeaway: module.problem,
    },
    {
      id: `${baseId}-flow`,
      title: 'Problem to Execution Route',
      subtitle: 'The lecture path keeps concept, syntax, state and output connected.',
      composition: 'full-canvas-diagram',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone="code" title="Problem to execution route" footer={`${subject.code} / ${moduleLabel}`}>
          <FlowchartTrace active={2} nodes={[
            { label: 'Problem', detail: module.problem },
            { label: 'Concept', detail: module.topics.slice(0, 2).join(', ') },
            { label: 'Algorithm', detail: module.algorithm[0] },
            { label: 'Code', detail: 'statement sequence' },
            { label: 'Output', detail: module.output.at(-1) },
          ]} />
        </FoundationSlide>
      ),
      takeaway: 'Students see the path before they see isolated syntax.',
    },
    {
      id: `${baseId}-algorithm`,
      title: 'Algorithm Trace',
      subtitle: 'Each step has visible state, not only a definition.',
      composition: 'algorithm-board',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone="code" title="Algorithm trace" footer={`${subject.code} / ${moduleLabel}`}>
          <AlgorithmTraceVisualizer title={module.title} steps={module.algorithm} state={module.state} active={2} />
        </FoundationSlide>
      ),
      takeaway: 'The algorithm is represented as an ordered executable plan.',
    },
    {
      id: `${baseId}-execution`,
      title: 'Code Execution Visualizer',
      subtitle: 'Active line, variables, input and output stay visible together.',
      composition: 'code-execution',
      content: (
        <FoundationSlide layout="code-execution" tone="code" title="Code execution" footer={`${subject.code} / ${moduleLabel}`}>
          <ExecutionTraceVisualizer code={module.code} steps={module.steps} activeStep={Math.min(1, module.steps.length - 1)} language={subject.code.includes('BPLC105B') || subject.code.includes('BAIA') ? 'python' : 'c'} input={module.input} output={module.output} />
        </FoundationSlide>
      ),
      takeaway: 'The active statement and variable changes explain why the output appears.',
    },
    {
      id: `${baseId}-dry-run`,
      title: 'Dry Run Table',
      subtitle: 'Iteration, branch or transformation state is checked row by row.',
      composition: 'dry-run',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone="code" title="Dry run" footer={`${subject.code} / ${moduleLabel}`}>
          <DryRunTable columns={['Step', 'Condition / Input', 'State', 'Statement', 'Output']} rows={module.dryRows} active={Math.min(2, module.dryRows.length - 1)} />
        </FoundationSlide>
      ),
      takeaway: 'The table matches the code path and final output.',
    },
    {
      id: `${baseId}-state`,
      title: 'Memory and State Model',
      subtitle: 'Variables, records, frames and references are shown as stored state.',
      composition: 'memory-board',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone="code" title="Memory and state" footer={`${subject.code} / ${moduleLabel}`}>
          <MemoryDiagram {...module.memory} />
        </FoundationSlide>
      ),
      takeaway: 'State is explicit, so students can connect names to stored values.',
    },
    {
      id: `${baseId}-array-terminal`,
      title: 'Input, Data Structure and Output',
      subtitle: 'Data movement is visible from input to the final screen.',
      composition: 'terminal-output',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone="code" title="Input -> process -> output" footer={`${subject.code} / ${moduleLabel}`}>
          <div className="fy-programming-split" data-slide-content="true">
            <ArrayVisualizer values={module.array || [1, 2, 3, 4, 5]} active={Math.min(2, (module.array || []).length || 2)} label="Active data cells" />
            <TerminalPanel lines={[...module.input.map((line) => `> ${line}`), ...module.output]} />
          </div>
        </FoundationSlide>
      ),
      takeaway: 'Input, data structure and output are visible at classroom scale.',
    },
    {
      id: `${baseId}-debugging`,
      title: 'Common Error Analysis',
      subtitle: 'The incorrect model is named, explained and corrected.',
      composition: 'debugging',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone="code" title="Debugging checkpoint" footer={`${subject.code} / ${moduleLabel}`}>
          <div className="fy-debug-grid" data-slide-content="true">
            <TeachingCallout kind="BROKEN MODEL">{module.error}</TeachingCallout>
            <TeachingCallout kind="FIX">Trace the active statement, stored value and output before changing the code or design.</TeachingCallout>
            <TeachingCallout kind="EXAM LINK">When asked to explain, include algorithm, state change and final result.</TeachingCallout>
          </div>
        </FoundationSlide>
      ),
      takeaway: module.error,
    },
    {
      id: `${baseId}-application`,
      title: 'Application and Assessment Connection',
      subtitle: 'The source topic is tied to design, execution and result explanation.',
      composition: 'process',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone="code" title="Application route" footer={`${subject.code} / ${moduleLabel}`}>
          <ProcessAnimator steps={[
            { title: 'Problem', detail: module.problem },
            { title: 'Design', detail: module.algorithm.slice(0, 2).join(' -> ') },
            { title: 'Execute', detail: module.steps.at(-1)?.statement || 'run trace' },
            { title: 'Verify', detail: module.output.at(-1) },
          ]} />
        </FoundationSlide>
      ),
      takeaway: 'Application work is complete only when the result is verified.',
    },
    {
      id: `${baseId}-recap`,
      title: 'Module Recap',
      subtitle: 'Concept relationships to carry into programs, algorithms and exams.',
      composition: 'concept-map',
      content: (
        <FoundationSlide layout="full-canvas-diagram" tone="code" title="Module recap" footer={`${subject.code} / ${moduleLabel}`}>
          <ConceptMap
            nodes={[
              { id: 'topic', label: 'Topic', x: 380, y: 205, main: true },
              { id: 'problem', label: 'Problem', x: 170, y: 110 },
              { id: 'algo', label: 'Algorithm', x: 590, y: 110 },
              { id: 'state', label: 'State', x: 170, y: 315 },
              { id: 'output', label: 'Output', x: 590, y: 315 },
            ]}
            links={[
              { from: 'problem', to: 'topic', label: 'motivates' },
              { from: 'topic', to: 'algo', label: 'planned by' },
              { from: 'algo', to: 'state', label: 'changes' },
              { from: 'state', to: 'output', label: 'explains' },
              { from: 'output', to: 'topic', label: 'verifies' },
            ]}
          />
        </FoundationSlide>
      ),
      takeaway: 'Comparable teaching depth means the student can explain why the result occurs.',
    },
  ]
  return [...core.slice(0, 9), ...sourceSlides(subject, moduleIndex, sourceDepth), core.at(-1)]
}

function buildSubject([id, title, code, courseType, folder, keys]) {
  const modules = keys.map((key, index) => {
    const module = moduleLibrary[key]
    const sourceDepth = firstYearDepthModules[`${code}|${index + 1}`]
    return {
      id: `module-${index + 1}`,
      number: String(index + 1).padStart(2, '0'),
      label: `Module ${index + 1}`,
      title: module.title,
      description: module.topics.slice(0, 3).join(', ') + '.',
      topics: module.topics,
      slides: makeSlides({ id, title, code }, module, index, sourceDepth),
      pptxSource: `${PPTX_ROOT}/${folder}/Module_${index + 1}.pptx`,
      depthResync: sourceDepth,
    }
  })
  return {
    id,
    number: code.replace(/\D/g, '').slice(-3),
    title,
    shortTitle: code,
    code,
    description: `${courseType}: Phase 5 interactive programming and computer-science teaching deck with execution traces, algorithms, dry runs and memory state.`,
    accent: 'first-year-programming',
    segmentLabel: 'Module',
    keyAreas: Array.from(new Set(modules.flatMap((module) => module.topics.slice(0, 2)))).slice(0, 8),
    moduleFlow: modules.map((module) => module.title.split(/,| and |:/)[0]),
    phase: 5,
    family: 'D - PROGRAMMING / COMPUTER SCIENCE',
    pptxFolder: `${PPTX_ROOT}/${folder}`,
    syllabusSource: `${SYLLABUS_ROOT}/${code.split('/')[0]}.pdf`,
    modules,
  }
}

export const firstYearProgrammingSubjects = subjectConfigs.map(buildSubject)

export const firstYearProgrammingReportSeed = {
  subjectsExpected: subjectConfigs.length,
  subjectsCreated: firstYearProgrammingSubjects.length,
  modulesCreated: firstYearProgrammingSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  interactiveSlides: firstYearProgrammingSubjects.reduce((sum, subject) => sum + subject.modules.reduce((m, module) => m + module.slides.length, 0), 0),
  majorAnimations: firstYearProgrammingSubjects.reduce((sum, subject) => sum + subject.modules.reduce((m, module) => m + Math.max(7, Math.floor(module.slides.length / 2)), 0), 0),
  codeExecutionScenes: firstYearProgrammingSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  algorithmVisuals: firstYearProgrammingSubjects.reduce((sum, subject) => sum + subject.modules.length * 2, 0),
  dryRuns: firstYearProgrammingSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  flowcharts: firstYearProgrammingSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  memoryVisuals: firstYearProgrammingSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
  debuggingScenes: firstYearProgrammingSubjects.reduce((sum, subject) => sum + subject.modules.length, 0),
}

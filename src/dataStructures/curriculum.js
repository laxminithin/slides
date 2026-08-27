/**
 * DS (1BCS305) curriculum — source of truth aligned to
 * DS_Module_1…5.pptx + DS and DS lab syllabus (lab companion 1BCSL306 noted only).
 * Textbook: Horowitz, Sahni, Anderson-Freed — Fundamentals of Data Structures in C.
 */

export const DS_COURSE = {
  id: 'data-structures',
  title: 'Data Structures and Applications',
  code: '1BCS305',
  shortTitle: 'DS',
  notes:
    'Theory course 1BCS305. Lab companion 1BCSL306 is referenced in notes only — not a separate subject in this curriculum.',
}

export const DS_MODULES = [
  {
    n: 1,
    id: 'module-1',
    title: 'Introduction, Arrays, Pointers, Structures, Polynomials, and Sparse Matrices',
    hours: 8,
    question: 'How do we organize memory so operations stay fast and correct?',
    story: ['ADT', 'Pointer', 'Array', 'Record', 'Sparse'],
    syllabus: [
      'Data structures',
      'Primitive and non-primitive classification',
      'Pointers',
      'Dynamic memory allocation',
      'Arrays',
      'Dynamically allocated arrays',
      'Structures and unions',
      'Polynomials',
      'Sparse matrix representation',
      'Transpose of sparse matrix',
    ],
    notes: 'Lab 1BCSL306 Part-A Exp 1 (structures + dynamic allocation) and Part-B Exp 1 (sparse addition) practice these ideas.',
    units: [
      {
        topic: 'Data structures',
        terms: ['data object', 'operations', 'storage', 'algorithm'],
        definition: 'A data structure organizes data so operations can be performed efficiently.',
        takeaway: 'Name the ADT, its operations, and storage before coding.',
        visual: 'ds-intro',
        algo: [
          'Identify the data object and required operations',
          'Choose a representation (array, list, tree, …)',
          'Specify how each operation updates state',
          'State time and space expectations',
        ],
        complexity: { best: '—', avg: '—', worst: '—', note: 'Cost is defined per operation after representation is chosen' },
        dryRun: {
          input: 'Need frequent end-insert and end-delete on a sequence',
          steps: [
            'Name ADT: stack (LIFO) or deque',
            'Ops: push/pop or insertRear/deleteRear',
            'Pick array or linked representation',
            'Check empty/full (or NULL) before update',
          ],
          result: 'Representation follows the named operations',
        },
        code: null,
        mistake: 'Jumping to code without naming the ADT and its operations.',
      },
      {
        topic: 'Classification',
        terms: ['primitive', 'non-primitive', 'linear', 'non-linear'],
        definition: 'Classification separates basic data types from structured collections.',
        takeaway: 'The course moves from linear to non-linear structures.',
        visual: 'classify',
        algo: [
          'Ask: is the type built-in (primitive) or composed?',
          'If composed: is order linear (one predecessor/successor) or non-linear?',
          'Map examples: int vs array vs tree vs graph',
          'Use the class to predict typical operations',
        ],
        complexity: { best: '—', avg: '—', worst: '—', note: 'Classification is conceptual; complexity comes later with ops' },
        dryRun: {
          input: 'int, array of int, binary tree, city road graph',
          steps: [
            'int → primitive',
            'array → non-primitive, linear',
            'binary tree → non-primitive, non-linear',
            'graph → non-primitive, non-linear',
          ],
          result: 'Four clear slots on the classification map',
        },
        code: null,
        mistake: 'Calling arrays “primitive” because int is primitive.',
      },
      {
        topic: 'Pointers',
        terms: ['address', 'dereference', 'pointer variable', 'NULL'],
        definition: 'Pointers let C programs store and manipulate memory addresses.',
        takeaway: 'Dynamic structures depend on pointer discipline.',
        visual: 'pointer',
        algo: [
          'Declare a pointer of the correct type',
          'Assign it an address (&x or malloc result)',
          'Dereference (*p) to read or write the object',
          'Use NULL to mean “no target”; never dereference NULL',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Address follow is constant time; bugs are logic, not asymptotics' },
        dryRun: {
          input: 'int x = 42; int *p;',
          steps: [
            'p = &x → p holds address of x',
            '*p reads 42',
            '*p = 7 updates x to 7',
            'p = NULL → no valid target',
          ],
          result: 'x is 7; p is NULL',
        },
        code: `int x = 42;
int *p = &x;
printf("%d\\n", *p);  /* 42 */
*p = 7;               /* x becomes 7 */`,
        mistake: 'Dereferencing an uninitialized or NULL pointer.',
      },
      {
        topic: 'Dynamic memory allocation',
        terms: ['malloc', 'calloc', 'free', 'heap'],
        definition: 'Dynamic allocation creates storage at run time when size is not known in advance.',
        takeaway: 'Always pair allocation design with deallocation design.',
        visual: 'malloc',
        algo: [
          'Compute bytes needed (n * sizeof(T))',
          'Call malloc/calloc; check for NULL',
          'Use the block through the returned pointer',
          'free the block exactly once when done',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: '—', note: 'Allocator cost treated as O(1) in course; free does not shrink asymptotics of algorithms' },
        dryRun: {
          input: 'Need room for 5 ints entered at run time',
          steps: [
            'p = malloc(5 * sizeof(int))',
            'Check p != NULL',
            'Fill p[0]…p[4]',
            'free(p); p = NULL',
          ],
          result: 'Heap block used then returned',
        },
        code: `int *p = (int *)malloc(5 * sizeof(int));
if (!p) return;           /* allocation failed */
for (int i = 0; i < 5; i++) p[i] = i;
free(p);`,
        mistake: 'Using the pointer after free, or never calling free (leak).',
      },
      {
        topic: 'Arrays',
        terms: ['index', 'contiguous storage', 'row-major', 'bounds'],
        definition: 'Arrays store homogeneous elements in contiguous memory.',
        takeaway: 'Index calculation gives constant-time access.',
        visual: 'array',
        algo: [
          'Base address + index * element size → element address',
          'For 2D (row-major): addr = base + (i * cols + j) * size',
          'Read/write A[i] in O(1) if bounds are valid',
          'Insert/delete in the middle requires shifting',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(n)', note: 'Access O(1); insert/delete in middle O(n) due to shifts' },
        dryRun: {
          input: 'A = [10, 20, 30, 40]; insert 25 at index 2',
          steps: [
            'Shift 40 → index 4, 30 → index 3',
            'Write 25 at index 2',
            'Length becomes 5',
            'Random access A[3] still O(1)',
          ],
          result: '[10, 20, 25, 30, 40]',
        },
        code: `int A[5] = {10, 20, 30, 40};
/* insert 25 at index 2 */
for (int i = 3; i >= 2; i--) A[i + 1] = A[i];
A[2] = 25;`,
        mistake: 'Assuming insert anywhere is O(1) like access.',
      },
      {
        topic: 'Dynamically allocated arrays',
        terms: ['runtime size', 'pointer to block', 'resizing', 'capacity'],
        definition: 'Dynamic arrays combine array indexing with run-time size selection.',
        takeaway: 'Capacity management matters when size grows.',
        visual: 'dyn-array',
        algo: [
          'Allocate capacity C with malloc',
          'Track size n (used) separately from capacity C',
          'On overflow: allocate larger block, copy, free old',
          'Index as a[i] while 0 ≤ i < n',
        ],
        complexity: { best: 'O(1)', avg: 'O(1) amortized', worst: 'O(n)', note: 'Append is amortized O(1) if capacity doubles; single resize is O(n)' },
        dryRun: {
          input: 'capacity 2, size 2, append 30',
          steps: [
            'Full: allocate capacity 4',
            'Copy old elements',
            'free old block; point to new',
            'Write 30; size = 3',
          ],
          result: 'Array grows without fixed MAX',
        },
        code: `int cap = 2, n = 0;
int *a = malloc(cap * sizeof(int));
/* when n == cap: double cap, realloc/copy, then a[n++] = x */`,
        mistake: 'Confusing size with capacity, or forgetting to copy on resize.',
      },
      {
        topic: 'Structures and unions',
        terms: ['record', 'field', 'typedef', 'shared memory'],
        definition: 'Structures group related fields; unions share storage among alternatives.',
        takeaway: 'Records model real-world entities in C.',
        visual: 'struct',
        algo: [
          'Declare struct with named fields',
          'Access fields with . or -> (via pointer)',
          'Use typedef for a clean type name',
          'For union: only one member is active at a time',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Field access is constant; sizeof may include padding' },
        dryRun: {
          input: 'Book {id, title, price}',
          steps: [
            'Define struct Book',
            'b.id = 101; b.price = 499',
            'Print b.title via b.title',
            'Union example: store either int code or float score in one slot',
          ],
          result: 'One record packs related attributes',
        },
        code: `typedef struct {
  int id;
  char title[40];
  float price;
} Book;
Book b = {101, "DSA", 499.0f};`,
        mistake: 'Treating a union like a struct that holds all members at once.',
      },
      {
        topic: 'Polynomials',
        terms: ['coefficient', 'exponent', 'term', 'array representation'],
        definition: 'Polynomial ADTs store terms and support operations such as addition.',
        takeaway: 'Sparse representation avoids storing zero terms.',
        visual: 'poly',
        algo: [
          'Represent each term as (coefficient, exponent)',
          'Store non-zero terms in an array (or list)',
          'Addition: merge like exponents, add coefficients',
          'Drop terms whose coefficient becomes zero',
        ],
        complexity: { best: 'O(m + n)', avg: 'O(m + n)', worst: 'O(m + n)', note: 'Add two polys with m and n terms by one merge pass' },
        dryRun: {
          input: '3x^2 + 2x  and  x^2 + 5',
          steps: [
            'Terms: (3,2),(2,1) and (1,2),(5,0)',
            'Merge exp 2 → 4x^2',
            'Keep 2x and +5',
            'Result: 4x^2 + 2x + 5',
          ],
          result: '4x^2 + 2x + 5',
        },
        code: `typedef struct { int coef; int exp; } Term;
Term A[] = {{3, 2}, {2, 1}};  /* 3x^2 + 2x */`,
        mistake: 'Storing every exponent including zeros as dense arrays for sparse polys.',
      },
      {
        topic: 'Sparse matrices',
        terms: ['row', 'column', 'value', '3-tuple'],
        definition: 'Sparse matrix representation stores only non-zero elements.',
        takeaway: 'Triples reduce memory and make operations systematic.',
        visual: 'sparse',
        algo: [
          'Scan matrix; collect non-zeros as (row, col, value)',
          'Store count of non-zeros (and often rows/cols) in header',
          'Operate on the triple list instead of full m×n storage',
          'Preserve row-major (or agreed) order of triples',
        ],
        complexity: { best: 'O(t)', avg: 'O(t)', worst: 'O(m·n)', note: 't = non-zeros; building triples may scan full matrix once' },
        dryRun: {
          input: '3×3 matrix with non-zeros a[0][2]=5, a[1][0]=8, a[2][1]=3',
          steps: [
            'Header: rows=3, cols=3, t=3',
            'Triple1: (0,2,5)',
            'Triple2: (1,0,8)',
            'Triple3: (2,1,3)',
          ],
          result: '3 triples instead of 9 cells',
        },
        code: `typedef struct { int r, c, v; } Triple;
/* A[0] = {rows, cols, t}; A[1..] = non-zero triples */`,
        mistake: 'Forgetting the header triple that stores dimensions and count.',
      },
      {
        topic: 'Transpose of sparse matrix',
        terms: ['fast transpose', 'column count', 'starting position', 'result triples'],
        definition: 'Transpose swaps row and column positions in sparse triples.',
        takeaway: 'Fast transpose uses counts to avoid repeated scans.',
        visual: 'transpose',
        algo: [
          'Count non-zeros in each column of A',
          'Prefix sums → starting position of each column in result B',
          'Scan A once; place each triple into its column slot in B',
          'Swap row/col in each placed triple',
        ],
        complexity: { best: 'O(n + t)', avg: 'O(n + t)', worst: 'O(n + t)', note: 'Fast transpose; naive method can be O(n·t)' },
        dryRun: {
          input: 'Triples (0,2,5), (1,0,8), (2,1,3); cols=3',
          steps: [
            'Column counts: col0:1, col1:1, col2:1',
            'Start positions: 1, 2, 3 (after header)',
            'Place (1,0,8)→(0,1,8), (2,1,3)→(1,2,3), (0,2,5)→(2,0,5)',
            'B ordered by new rows (= old cols)',
          ],
          result: 'Transpose triples without rescanning per column',
        },
        code: `/* Fast transpose idea:
   count[col]++; then start[0]=1; start[j]=start[j-1]+count[j-1];
   place each (r,c,v) at B[start[c]++] = (c,r,v); */`,
        mistake: 'Swapping values instead of swapping row and column indices.',
      },
    ],
    checkpoints: [
      { label: 'Array index access', bigO: 'O(1)', why: 'Contiguous layout → address from index' },
      { label: 'Array insert/delete middle', bigO: 'O(n)', why: 'Elements must shift' },
      { label: 'Pointer dereference', bigO: 'O(1)', why: 'Follow one address' },
      { label: 'Build sparse triples', bigO: 'O(m·n)', why: 'May scan full matrix once' },
      { label: 'Fast sparse transpose', bigO: 'O(n + t)', why: 'Counts + one pass over t triples' },
      { label: 'Polynomial add (m,n terms)', bigO: 'O(m + n)', why: 'Single merge of sorted terms' },
    ],
  },

  {
    n: 2,
    id: 'module-2',
    title: 'Stacks, Stack Applications, and Queues',
    hours: 8,
    question: 'How does one end of access create LIFO and FIFO power?',
    story: ['Stack', 'Push/Pop', 'Polish', 'Queue', 'FIFO'],
    syllabus: [
      'Stack definition',
      'Stack operations',
      'Array representation of stacks',
      'Stacks using dynamic arrays',
      'Polish notation',
      'Infix to postfix conversion',
      'Postfix evaluation',
      'Queue definition',
      'Array representation of queues',
      'Queue operations',
    ],
    notes: 'Lab 1BCSL306 Part-A Exp 2 (stack) and Part-B Exp 2 (infix→postfix) map directly here.',
    units: [
      {
        topic: 'Stack ADT',
        terms: ['LIFO', 'top', 'push', 'pop'],
        definition: 'A stack allows insertion and deletion at one end called top.',
        takeaway: 'The last item inserted is the first removed.',
        visual: 'stack-adt',
        algo: [
          'Maintain a single access point: top',
          'push(x): place x at top',
          'pop(): remove and return the top item',
          'Reject pop on empty; reject push on full (fixed size)',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'ADT ops at one end are constant time' },
        dryRun: {
          input: 'push A, push B, push C, pop',
          steps: [
            'After pushes: top → C,B,A',
            'pop returns C',
            'top → B',
            'Next pop would return B',
          ],
          result: 'LIFO order C then B then A',
        },
        code: null,
        mistake: 'Allowing insert/delete at both ends and still calling it a stack.',
      },
      {
        topic: 'Stack operations',
        terms: ['push', 'pop', 'peek', 'isEmpty'],
        definition: 'Stack operations update top while preserving LIFO order.',
        takeaway: 'Underflow and overflow are part of the specification.',
        visual: 'stack-ops',
        algo: [
          'isEmpty / isFull: inspect top (and MAX)',
          'push: if not full, advance top and store',
          'pop: if not empty, read top and retreat',
          'peek: read top without removing',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Each primitive op is O(1)' },
        dryRun: {
          input: 'Empty stack; pop; then push 10; peek',
          steps: [
            'pop on empty → underflow',
            'push 10 → top holds 10',
            'peek → 10 (stack unchanged)',
            'pop → 10; stack empty',
          ],
          result: 'Boundary cases are first-class',
        },
        code: `if (top == MAX - 1) /* overflow */;
else S[++top] = x;
if (top < 0) /* underflow */;
else x = S[top--];`,
        mistake: 'Ignoring underflow/overflow and reading garbage or writing past MAX.',
      },
      {
        topic: 'Array stack',
        terms: ['top index', 'MAX', 'overflow', 'underflow'],
        definition: 'Array representation stores stack elements in consecutive positions.',
        takeaway: 'Simple representation needs size checks.',
        visual: 'array-stack',
        algo: [
          'Use S[0..MAX-1]; top = -1 when empty',
          'push: if top < MAX-1 then S[++top]=x else overflow',
          'pop: if top >= 0 then return S[top--] else underflow',
          'Display from top down to 0',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Fixed array; no resize' },
        dryRun: {
          input: 'MAX=3; push 1,2,3; push 4',
          steps: [
            'top goes -1→0→1→2',
            'S = [1,2,3]',
            'Fourth push → overflow',
            'pop → 3; top=1',
          ],
          result: 'Overflow caught at capacity',
        },
        code: `#define MAX 50
int S[MAX], top = -1;
void push(int x){ if(top==MAX-1) return; S[++top]=x; }`,
        mistake: 'Initializing top to 0 and treating index 0 as empty.',
      },
      {
        topic: 'Dynamic-array stack',
        terms: ['capacity', 'resize', 'amortized cost', 'realloc idea'],
        definition: 'Dynamic stacks grow when capacity is exceeded.',
        takeaway: 'Resizing trades occasional copying for flexibility.',
        visual: 'dyn-stack',
        algo: [
          'Track capacity separately from top',
          'On push when full: allocate larger array',
          'Copy elements; free old storage',
          'Then push as usual',
        ],
        complexity: { best: 'O(1)', avg: 'O(1) amortized', worst: 'O(n)', note: 'Doubling capacity makes push amortized O(1)' },
        dryRun: {
          input: 'capacity 2; push A,B,C',
          steps: [
            'A,B fill capacity',
            'Before C: grow to 4, copy A,B',
            'Push C',
            'top points at C',
          ],
          result: 'Stack grew without a fixed MAX failure',
        },
        code: `/* if (top+1 == cap) { cap*=2; S=realloc(S, cap*sizeof(int)); } */
S[++top] = x;`,
        mistake: 'Resizing by +1 each time (bad amortized cost).',
      },
      {
        topic: 'Polish notation',
        terms: ['prefix', 'postfix', 'operator', 'operand'],
        definition: 'Polish notations remove parentheses by placing operators before or after operands.',
        takeaway: 'Postfix is easy to evaluate with a stack.',
        visual: 'polish',
        algo: [
          'Infix: operator between operands (needs precedence)',
          'Prefix: operator before operands',
          'Postfix: operator after operands',
          'Same expression can be rewritten without parentheses',
        ],
        complexity: { best: '—', avg: '—', worst: '—', note: 'Notation concept; evaluation cost covered next' },
        dryRun: {
          input: 'Infix (A+B)*C',
          steps: [
            'Postfix: AB+C*',
            'Prefix: *+ABC',
            'No parentheses needed',
            'Operators apply to nearest ready operands',
          ],
          result: 'AB+C* is the postfix form',
        },
        code: null,
        mistake: 'Confusing prefix with postfix operator placement.',
      },
      {
        topic: 'Infix to postfix conversion',
        terms: ['precedence', 'associativity', 'parentheses', 'operator stack'],
        definition: 'Conversion uses a stack to delay operators until their operands are ready.',
        takeaway: 'The stack encodes precedence decisions.',
        visual: 'infix-postfix',
        algo: [
          'Scan infix left to right',
          'Operands go straight to output',
          'Push operators; pop while stack-top precedence ≥ incoming (with associativity rules)',
          'Parentheses: push “(”; on “)” pop until “(“',
        ],
        complexity: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)', note: 'Each symbol pushed/popped at most once' },
        dryRun: {
          input: 'A+B*C',
          steps: [
            'A → output',
            '+ → stack',
            'B → output; * has higher precedence → push *',
            'C → output; end: pop * then + → ABC*+',
          ],
          result: 'ABC*+',
        },
        code: `/* while (!empty && prec(top) >= prec(op)) output(pop());
   push(op); */`,
        mistake: 'Popping a lower-precedence operator too early (or never).',
      },
      {
        topic: 'Postfix evaluation',
        terms: ['scan', 'push operand', 'apply operator', 'result'],
        definition: 'Postfix evaluation scans left to right and applies operators to stack operands.',
        takeaway: 'Each operator reduces two operands to one value.',
        visual: 'postfix-eval',
        algo: [
          'Scan token left to right',
          'If operand: push onto value stack',
          'If operator: pop two operands (right then left), apply, push result',
          'Final single stack value is the answer',
        ],
        complexity: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)', note: 'One pass; each token handled once' },
        dryRun: {
          input: '5 1 2 + 4 * + 3 -',
          steps: [
            'Push 5,1,2; + → 1+2=3; push 3',
            'Push 4; * → 3*4=12; push 12',
            '+ → 5+12=17',
            'Push 3; - → 17-3=14',
          ],
          result: '14',
        },
        code: `/* op = pop(); a=pop(); b=pop(); push(b op a); */`,
        mistake: 'Applying operands in the wrong order (a op b vs b op a).',
      },
      {
        topic: 'Queue ADT',
        terms: ['FIFO', 'front', 'rear', 'enqueue'],
        definition: 'A queue removes elements in the same order they arrive.',
        takeaway: 'Queues model waiting lines and scheduling.',
        visual: 'queue-adt',
        algo: [
          'Enqueue at rear',
          'Dequeue from front',
          'Empty when front catches the logical empty state',
          'Preserve arrival order',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'ADT ends are O(1) with proper indices/pointers' },
        dryRun: {
          input: 'enqueue J1,J2,J3; dequeue',
          steps: [
            'Front J1 … rear J3',
            'Dequeue returns J1',
            'Front becomes J2',
            'Order remains J2,J3',
          ],
          result: 'FIFO: J1 leaves first',
        },
        code: null,
        mistake: 'Dequeuing from rear (that is a stack or deque misuse).',
      },
      {
        topic: 'Array queue',
        terms: ['front index', 'rear index', 'linear queue', 'wasted space'],
        definition: 'Array queues need front and rear indices.',
        takeaway: 'Linear queues can waste freed cells.',
        visual: 'array-queue',
        algo: [
          'Initialize front = rear = -1 (or similar sentinel)',
          'Enqueue: advance rear, store item',
          'Dequeue: advance front',
          'After many ops, slots before front are unused in a linear queue',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Ops O(1) but space may look “full” while empty slots exist' },
        dryRun: {
          input: 'MAX=4; enqueue A,B; dequeue; enqueue C,D',
          steps: [
            'front/rear move right',
            'Slot 0 free after dequeue',
            'Linear queue may still hit rear==MAX-1',
            'Wasted space motivates circular queues (Module 3)',
          ],
          result: 'FIFO works; utilization may be poor',
        },
        code: `int Q[MAX], front = -1, rear = -1;
/* enqueue: rear++; Q[rear]=x;  dequeue: front++; */`,
        mistake: 'Resetting only one of front/rear when the queue becomes empty.',
      },
      {
        topic: 'Queue operations',
        terms: ['insert', 'delete', 'display', 'empty/full'],
        definition: 'Queue algorithms maintain FIFO order through front/rear updates.',
        takeaway: 'Boundary cases decide correctness.',
        visual: 'queue-ops',
        algo: [
          'isEmpty / isFull from front/rear (and MAX)',
          'insert (enqueue) only if not full',
          'delete (dequeue) only if not empty',
          'display from front to rear',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(n)', note: 'insert/delete O(1); display O(n)' },
        dryRun: {
          input: 'Empty queue; delete; insert 7; display',
          steps: [
            'delete → underflow',
            'insert 7 → front=rear=0',
            'display shows 7',
            'delete → empty again',
          ],
          result: 'Empty/full checks gate every update',
        },
        code: `if (rear == MAX - 1) /* full */;
else { if (front == -1) front = 0; Q[++rear] = x; }`,
        mistake: 'Displaying the whole array including dead slots outside [front..rear].',
      },
    ],
    checkpoints: [
      { label: 'Stack push/pop', bigO: 'O(1)', why: 'Only top index/pointer moves' },
      { label: 'Infix→postfix', bigO: 'O(n)', why: 'Each token enters/leaves stack once' },
      { label: 'Postfix evaluate', bigO: 'O(n)', why: 'Single left-to-right scan' },
      { label: 'Queue enqueue/dequeue', bigO: 'O(1)', why: 'Front/rear updates only' },
      { label: 'Dynamic stack resize', bigO: 'O(n) / amortized O(1)', why: 'Copy on grow; doubling amortizes' },
    ],
  },

  {
    n: 3,
    id: 'module-3',
    title: 'Circular Queues, Multiple Stacks and Queues, and Linked Lists',
    hours: 9,
    question: 'How do wrapping indices and pointer links reclaim space?',
    story: ['Circular', 'Shared', 'Node', 'Link', 'Rewire'],
    syllabus: [
      'Circular queues',
      'Circular queues using dynamic arrays',
      'Multiple stacks and queues',
      'Singly linked lists and chains',
      'Representing chains in C',
      'Linked stacks and queues',
      'Additional list operations',
      'Sparse matrix representation',
      'Doubly linked list',
    ],
    notes:
      'Syllabus lists sparse matrix representation again here; teaching units keep the 10 core ideas below (sparse triples already in Module 1). Lab: circular queue (Part-B), SLL (Part-A), DLL (Part-B).',
    units: [
      {
        topic: 'Circular queue',
        terms: ['wrap around', 'front', 'rear', 'modulo'],
        definition: 'A circular queue reuses freed array positions by wrapping indices.',
        takeaway: 'Modulo arithmetic removes linear queue wastage.',
        visual: 'circ-queue',
        algo: [
          'rear = (rear + 1) % MAX on enqueue',
          'front = (front + 1) % MAX on dequeue',
          'Distinguish full vs empty (count, or reserve one slot)',
          'Display by walking modulo MAX from front',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Wrap keeps ops O(1) and reclaims slots' },
        dryRun: {
          input: 'MAX=4; enqueue A,B,C; dequeue; enqueue D,E',
          steps: [
            'After three enqueues rear near end',
            'Dequeue frees front slot',
            'Next enqueue wraps rear to index 0',
            'E uses the reclaimed cell',
          ],
          result: 'No wasted free slots at the physical start',
        },
        code: `rear = (rear + 1) % MAX;
Q[rear] = x;
front = (front + 1) % MAX;`,
        mistake: 'Using the same full and empty test (front==rear) without a count or spare slot.',
      },
      {
        topic: 'Dynamic circular queue',
        terms: ['capacity', 'resize', 'preserve order', 'copying'],
        definition: 'Dynamic circular queues grow while maintaining logical order.',
        takeaway: 'Resize carefully because physical order may wrap.',
        visual: 'dyn-circ',
        algo: [
          'Detect full circular state',
          'Allocate larger capacity',
          'Copy elements in logical FIFO order (unwrap)',
          'Reset front/rear in the new linear layout',
        ],
        complexity: { best: 'O(1)', avg: 'O(1) amortized', worst: 'O(n)', note: 'Resize copies n elements once' },
        dryRun: {
          input: 'Wrapped queue [E, _, A, B] logically A,B,E',
          steps: [
            'New capacity 8',
            'Copy A,B,E contiguously',
            'front=0, rear=2',
            'Resume circular ops',
          ],
          result: 'Logical order preserved after grow',
        },
        code: `/* unwrap: for i in 0..n-1: neu[i]=Q[(front+i)%cap]; */`,
        mistake: 'Memcpy of the raw array without unwrapping wrapped contents.',
      },
      {
        topic: 'Multiple stacks',
        terms: ['shared array', 'top pointers', 'space sharing', 'overflow'],
        definition: 'Multiple stacks can share one memory block.',
        takeaway: 'Shared storage improves utilization but complicates overflow handling.',
        visual: 'multi-stack',
        algo: [
          'Place two stacks at opposite ends of one array (classic case)',
          'Grow them toward the center',
          'Overflow when tops meet',
          'Generalize with more tops and partitions or linked free lists',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Push/pop still O(1); space shared' },
        dryRun: {
          input: 'Array size 6; Stack1 push A,B; Stack2 push X,Y,Z',
          steps: [
            'Stack1 uses low indices',
            'Stack2 uses high indices',
            'Tops move toward middle',
            'Next push may collide → overflow',
          ],
          result: 'Two LIFO structures, one block',
        },
        code: `/* twostacks: top1++, S[top1]=x;  top2--, S[top2]=y; */
/* full when top1 + 1 == top2 */`,
        mistake: 'Growing both stacks from the same end.',
      },
      {
        topic: 'Multiple queues',
        terms: ['front/rear arrays', 'free list', 'partitioning', 'linked storage'],
        definition: 'Multiple queues manage several FIFO structures at once.',
        takeaway: 'Representation choice depends on expected queue sizes.',
        visual: 'multi-queue',
        algo: [
          'Option A: partition array into fixed regions per queue',
          'Option B: keep front[]/rear[] plus a free list of slots',
          'Enqueue allocates a free node/slot into the chosen queue',
          'Dequeue returns the slot to the free list',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'With free-list links, enqueue/dequeue stay O(1)' },
        dryRun: {
          input: '3 queues sharing linked slots',
          steps: [
            'Take free node → enqueue on Q2',
            'Dequeue Q0 returns node to free list',
            'Space moves to the busy queue',
            'No fixed partition waste',
          ],
          result: 'Dynamic sharing across FIFOs',
        },
        code: null,
        mistake: 'Fixed equal partitions when one queue is hot and others idle.',
      },
      {
        topic: 'Singly linked list',
        terms: ['node', 'link', 'head', 'NULL'],
        definition: 'A singly linked list stores elements in nodes connected by links.',
        takeaway: 'Insertion and deletion do not require shifting elements.',
        visual: 'sll',
        algo: [
          'Each node holds data + next pointer',
          'head points to first node (NULL if empty)',
          'Insert: allocate node, rewire next pointers',
          'Delete: bypass node by linking predecessor to successor',
        ],
        complexity: { best: 'O(1)', avg: 'O(n)', worst: 'O(n)', note: 'Head insert O(1); search / middle ops O(n)' },
        dryRun: {
          input: 'List A→B→C; insert X after A',
          steps: [
            'Allocate X',
            'X.next = B',
            'A.next = X',
            'List A→X→B→C',
          ],
          result: 'No array shift — only pointer rewiring',
        },
        code: `typedef struct Node { int data; struct Node *next; } Node;
Node *head = NULL;`,
        mistake: 'Losing the only pointer to a node (memory leak / broken chain).',
      },
      {
        topic: 'Chains in C',
        terms: ['struct node', 'self-referential pointer', 'allocation', 'traversal'],
        definition: 'C represents chains using structures with pointer fields.',
        takeaway: 'Every traversal must test for NULL.',
        visual: 'chains-c',
        algo: [
          'Define self-referential struct Node',
          'malloc each node; set data and next',
          'Traverse: for (p=head; p; p=p->next)',
          'free nodes when discarding the chain',
        ],
        complexity: { best: 'O(1)', avg: 'O(n)', worst: 'O(n)', note: 'Traversal visits each node once' },
        dryRun: {
          input: 'Build 10→20→NULL',
          steps: [
            'n1=malloc; n1->data=10',
            'n2=malloc; n2->data=20; n2->next=NULL',
            'n1->next=n2; head=n1',
            'Walk until NULL',
          ],
          result: 'Valid C chain',
        },
        code: `Node *p = (Node *)malloc(sizeof(Node));
p->data = 10;
p->next = NULL;`,
        mistake: 'Forgetting sizeof(Node) or casting without including stdlib.',
      },
      {
        topic: 'Linked stack',
        terms: ['top pointer', 'push front', 'pop front', 'dynamic size'],
        definition: 'A linked stack stores each pushed item in a new node.',
        takeaway: 'No fixed MAX is needed, but memory allocation can fail.',
        visual: 'linked-stack',
        algo: [
          'push: new node → next = top; top = new',
          'pop: if top NULL underflow; else x=top->data; top=top->next; free old',
          'Size grows with successful malloc',
          'Empty when top is NULL',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Always at front — no scan' },
        dryRun: {
          input: 'push 1,2; pop',
          steps: [
            'top → 1',
            'push 2: top → 2→1',
            'pop returns 2',
            'top → 1',
          ],
          result: 'LIFO with dynamic nodes',
        },
        code: `void push(int x){
  Node *n = malloc(sizeof(Node));
  n->data = x; n->next = top; top = n;
}`,
        mistake: 'Not freeing the popped node.',
      },
      {
        topic: 'Linked queue',
        terms: ['front pointer', 'rear pointer', 'enqueue rear', 'dequeue front'],
        definition: 'A linked queue uses two pointers for efficient insertion and deletion.',
        takeaway: 'Both pointers must be updated when queue becomes empty.',
        visual: 'linked-queue',
        algo: [
          'enqueue: add node at rear; if empty set front=rear=new',
          'dequeue: remove front; if last node set front=rear=NULL',
          'Never leave rear dangling after emptying',
          'Display from front following next',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Two pointers avoid O(n) rear scans' },
        dryRun: {
          input: 'enqueue A,B; dequeue; dequeue',
          steps: [
            'front=A, rear=B',
            'dequeue A → front=B=rear',
            'dequeue B → front=rear=NULL',
            'Empty queue consistent',
          ],
          result: 'FIFO with O(1) ends',
        },
        code: `/* enqueue: rear->next=n; rear=n;
   if (!front) front=rear=n; */`,
        mistake: 'Updating only front on last dequeue (rear still points at freed node).',
      },
      {
        topic: 'Additional list operations',
        terms: ['insert', 'delete', 'search', 'count'],
        definition: 'List operations are pointer rewiring algorithms.',
        takeaway: 'Draw links before changing them in code.',
        visual: 'list-ops',
        algo: [
          'search: walk until key or NULL',
          'insert at position: find predecessor, rewire',
          'delete: find predecessor, bypass node, free',
          'count: traverse and tally',
        ],
        complexity: { best: 'O(1)', avg: 'O(n)', worst: 'O(n)', note: 'Most ops need a scan unless at head' },
        dryRun: {
          input: '1→2→3→4; delete 3',
          steps: [
            'Find node 2 (predecessor)',
            '2.next = 4',
            'free node 3',
            'count → 3',
          ],
          result: '1→2→4',
        },
        code: `/* delete after prev:
   Node *t = prev->next; prev->next = t->next; free(t); */`,
        mistake: 'Changing prev->next before saving the node to free.',
      },
      {
        topic: 'Doubly linked list',
        terms: ['prev', 'next', 'bidirectional', 'deque'],
        definition: 'A doubly linked list supports traversal and deletion in both directions.',
        takeaway: 'Extra links improve flexibility but require more updates.',
        visual: 'dll',
        algo: [
          'Each node has prev and next',
          'Insert: update four links (neighbors + new)',
          'Delete: known node can be removed without scanning from head',
          'Use as deque: insert/delete at both ends',
        ],
        complexity: { best: 'O(1)', avg: 'O(n)', worst: 'O(n)', note: 'End ops O(1) with head/tail; search still O(n)' },
        dryRun: {
          input: 'A⇄B⇄C; delete B',
          steps: [
            'A.next = C; C.prev = A',
            'free B',
            'Traverse forward A→C',
            'Traverse backward C→A',
          ],
          result: 'Bidirectional chain intact',
        },
        code: `typedef struct DNode {
  int data; struct DNode *prev, *next;
} DNode;`,
        mistake: 'Updating only next and leaving a stale prev (broken reverse walk).',
      },
    ],
    checkpoints: [
      { label: 'Circular enqueue/dequeue', bigO: 'O(1)', why: 'Modulo index updates' },
      { label: 'SLL insert at head', bigO: 'O(1)', why: 'One pointer rewire' },
      { label: 'SLL search / middle insert', bigO: 'O(n)', why: 'Must walk links' },
      { label: 'Linked stack push/pop', bigO: 'O(1)', why: 'Always at top pointer' },
      { label: 'Linked queue ends', bigO: 'O(1)', why: 'front and rear pointers' },
      { label: 'DLL delete known node', bigO: 'O(1)', why: 'prev/next already known' },
    ],
  },

  {
    n: 4,
    id: 'module-4',
    title: 'Trees, Binary Trees, Traversals, Threaded Trees, and BST',
    hours: 9,
    question: 'How does hierarchy turn recursive structure into searchable order?',
    story: ['Root', 'Binary', 'Traverse', 'Thread', 'BST'],
    syllabus: [
      'Tree terminology',
      'Binary trees',
      'Properties of binary trees',
      'Array representation',
      'Linked representation',
      'Preorder traversal',
      'Inorder traversal',
      'Postorder traversal',
      'Threaded binary trees',
      'Binary search trees',
      'Searching',
      'Insertion',
      'Deletion',
      'Counting binary trees',
    ],
    notes: 'Lab 1BCSL306 Part-A Exp 5 (binary tree traversals) and Part-B Exp 5 (BST menu) align with this module.',
    units: [
      {
        topic: 'Tree terminology',
        terms: ['root', 'parent', 'child', 'leaf'],
        definition: 'A tree is a hierarchical structure with one root and disjoint subtrees.',
        takeaway: 'Terminology makes tree algorithms precise.',
        visual: 'tree-terms',
        algo: [
          'Identify the unique root',
          'Each non-root has exactly one parent',
          'Children of a node form subtrees',
          'Leaves have no children',
        ],
        complexity: { best: '—', avg: '—', worst: '—', note: 'Vocabulary first; costs depend on representation' },
        dryRun: {
          input: 'Root A with children B,C; B has D',
          steps: [
            'root = A',
            'parent(B)=A; child of A includes B',
            'D is a leaf',
            'Subtrees of A are disjoint',
          ],
          result: 'Hierarchy labeled correctly',
        },
        code: null,
        mistake: 'Allowing a node with two parents (that is a graph, not a tree).',
      },
      {
        topic: 'Binary trees',
        terms: ['left child', 'right child', 'subtree', 'empty tree'],
        definition: 'A binary tree has at most two children per node.',
        takeaway: 'Many tree algorithms are naturally recursive.',
        visual: 'bintree',
        algo: [
          'Empty tree is a valid binary tree',
          'Non-empty: root + left binary tree + right binary tree',
          'Left and right positions are ordered (not just a set of children)',
          'Recurse independently on each subtree',
        ],
        complexity: { best: '—', avg: '—', worst: '—', note: 'Structure definition; op costs follow' },
        dryRun: {
          input: 'Root 1; left 2; right 3; left-of-2 is 4',
          steps: [
            '1.left → 2; 1.right → 3',
            '2.left → 4; 2.right empty',
            '3 has empty children',
            'Shape is ordered, not a general tree',
          ],
          result: 'Binary positions matter',
        },
        code: `typedef struct TNode {
  int data; struct TNode *left, *right;
} TNode;`,
        mistake: 'Treating unordered two-child trees as binary (left/right matter).',
      },
      {
        topic: 'Binary tree properties',
        terms: ['level', 'height', 'maximum nodes', 'complete tree'],
        definition: 'Binary tree properties relate height and number of nodes.',
        takeaway: 'Properties help estimate storage and traversal cost.',
        visual: 'bt-props',
        algo: [
          'Max nodes at level i is 2^i (0-based level)',
          'Max nodes in height h is 2^{h+1}-1 (conventions vary — state yours)',
          'Complete trees fill levels left to right',
          'Use properties to choose array vs linked storage',
        ],
        complexity: { best: '—', avg: '—', worst: '—', note: 'Closed forms; height drives many O(h) algorithms' },
        dryRun: {
          input: 'Full binary tree height 2 (root height 0)',
          steps: [
            'Level 0: 1 node',
            'Level 1: 2 nodes',
            'Level 2: 4 nodes',
            'Total 7 = 2^3 - 1',
          ],
          result: 'Maximum packing for that height',
        },
        code: null,
        mistake: 'Mixing 0-based vs 1-based height definitions in formulas.',
      },
      {
        topic: 'Array representation',
        terms: ['level order', 'index relation', 'parent index', 'child index'],
        definition: 'Array representation stores complete binary trees compactly.',
        takeaway: 'It works best when the tree is dense.',
        visual: 'array-tree',
        algo: [
          'Store nodes in level order in A[1..n] (or 0-based variant)',
          'parent(i) = i/2; left(i)=2i; right(i)=2i+1',
          'Missing nodes waste slots in skewed trees',
          'Good fit for heaps / complete trees',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(1)', note: 'Parent/child index math is O(1)' },
        dryRun: {
          input: 'Complete tree A,B,C,D,E',
          steps: [
            'A[1]=A, A[2]=B, A[3]=C, A[4]=D, A[5]=E',
            'left(1)=2, right(1)=3',
            'parent(5)=2',
            'No explicit pointers needed',
          ],
          result: 'Index relations encode edges',
        },
        code: `/* 1-based: left = 2*i; right = 2*i+1; parent = i/2 */`,
        mistake: 'Using array form for a highly skewed tree (huge wasted space).',
      },
      {
        topic: 'Linked representation',
        terms: ['node', 'left pointer', 'right pointer', 'dynamic shape'],
        definition: 'Linked representation stores only existing nodes.',
        takeaway: 'It is flexible for sparse and changing trees.',
        visual: 'linked-tree',
        algo: [
          'malloc each node with left/right pointers',
          'NULL means empty subtree',
          'Insert by linking into a NULL child slot',
          'Shape can be skewed without wasting array slots',
        ],
        complexity: { best: 'O(1)', avg: 'O(h)', worst: 'O(n)', note: 'Local link O(1); finding place is O(h)' },
        dryRun: {
          input: 'Create root 10 with left 5',
          steps: [
            'root = malloc(10)',
            'root->left = malloc(5)',
            'root->right = NULL',
            '5’s children NULL',
          ],
          result: 'Dynamic binary shape',
        },
        code: `TNode *root = malloc(sizeof(TNode));
root->data = 10; root->left = root->right = NULL;`,
        mistake: 'Forgetting to initialize both child pointers to NULL.',
      },
      {
        topic: 'Preorder traversal',
        terms: ['root', 'left', 'right', 'recursive visit'],
        definition: 'Preorder visits the root before its subtrees.',
        takeaway: 'Useful when copying or prefix expression generation.',
        visual: 'preorder',
        algo: [
          'If tree empty, return',
          'Visit root',
          'Preorder left subtree',
          'Preorder right subtree',
        ],
        complexity: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)', note: 'Each node visited once' },
        dryRun: {
          input: 'Tree: A; left B (left D); right C',
          steps: [
            'Visit A',
            'Go left: visit B, then D',
            'Back; go right: visit C',
            'Sequence A B D C',
          ],
          result: 'A B D C',
        },
        code: `void preorder(TNode *t){
  if(!t) return;
  printf("%d ", t->data);
  preorder(t->left);
  preorder(t->right);
}`,
        mistake: 'Visiting root after children (that is postorder).',
      },
      {
        topic: 'Inorder traversal',
        terms: ['left', 'root', 'right', 'sorted BST'],
        definition: 'Inorder visits left subtree, root, then right subtree.',
        takeaway: 'Inorder traversal of BST gives sorted order.',
        visual: 'inorder',
        algo: [
          'If empty, return',
          'Inorder left',
          'Visit root',
          'Inorder right',
        ],
        complexity: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)', note: 'Full walk is Θ(n)' },
        dryRun: {
          input: 'BST 2←1→3 (root 2)',
          steps: [
            'Left: visit 1',
            'Visit 2',
            'Right: visit 3',
            'Sequence 1 2 3',
          ],
          result: 'Sorted keys',
        },
        code: `void inorder(TNode *t){
  if(!t) return;
  inorder(t->left);
  printf("%d ", t->data);
  inorder(t->right);
}`,
        mistake: 'Expecting sorted order from inorder on a non-BST.',
      },
      {
        topic: 'Postorder traversal',
        terms: ['left', 'right', 'root', 'delete tree'],
        definition: 'Postorder visits children before the root.',
        takeaway: 'Useful when freeing or evaluating expression trees.',
        visual: 'postorder',
        algo: [
          'If empty, return',
          'Postorder left',
          'Postorder right',
          'Visit root (e.g., free node)',
        ],
        complexity: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)', note: 'Each node once' },
        dryRun: {
          input: 'Same tree A(B(D), C)',
          steps: [
            'Left of A: postorder B → D then B',
            'Right: visit C',
            'Visit A last',
            'Sequence D B C A',
          ],
          result: 'D B C A',
        },
        code: `void postorder(TNode *t){
  if(!t) return;
  postorder(t->left);
  postorder(t->right);
  printf("%d ", t->data);
}`,
        mistake: 'Freeing the root before freeing children.',
      },
      {
        topic: 'Threaded binary trees',
        terms: ['NULL links', 'threads', 'inorder successor', 'traversal'],
        definition: 'Threaded trees replace selected NULL pointers with traversal links.',
        takeaway: 'Threads reduce stack/recursion needs for traversal.',
        visual: 'threaded',
        algo: [
          'Empty left/right normally NULL',
          'Replace some NULLs with threads to inorder predecessor/successor',
          'Tag bits (or conventions) distinguish threads from child links',
          'Inorder walk can follow threads without an explicit stack',
        ],
        complexity: { best: 'O(n)', avg: 'O(n)', worst: 'O(n)', note: 'Traversal still visits n nodes; space for stack drops' },
        dryRun: {
          input: 'Inorder … P, Q, R …; Q.right was NULL',
          steps: [
            'Thread Q.right → R (inorder successor)',
            'From Q follow thread to R',
            'No recursive call stack needed for that step',
            'Child links remain true edges',
          ],
          result: 'Faster/simpler inorder machinery',
        },
        code: null,
        mistake: 'Following a thread as if it were a real child (infinite loop risk).',
      },
      {
        topic: 'Binary search tree',
        terms: ['key order', 'left less', 'right greater', 'search path'],
        definition: 'A BST stores keys so search follows ordering decisions.',
        takeaway: 'Shape controls performance.',
        visual: 'bst',
        algo: [
          'Start at root',
          'If key < node: go left; if key > node: go right',
          'Equal → found; NULL → not found',
          'Path length depends on tree shape',
        ],
        complexity: { best: 'O(log n)', avg: 'O(log n)', worst: 'O(n)', note: 'Balanced vs skewed shapes' },
        dryRun: {
          input: 'BST root 8; left 3; right 10; search 3',
          steps: [
            '3 < 8 → left',
            '3 == 3 → found',
            'Search 9: 9>8→right; 9<10→left NULL',
            'Not found',
          ],
          result: 'Ordering guides the path',
        },
        code: `TNode *search(TNode *t, int k){
  while(t){
    if(k==t->data) return t;
    t = (k < t->data) ? t->left : t->right;
  }
  return NULL;
}`,
        mistake: 'Assuming every BST search is O(log n) even when skewed.',
      },
      {
        topic: 'BST insertion and deletion',
        terms: ['leaf insert', 'one child', 'two children', 'successor'],
        definition: 'BST updates preserve the ordering property.',
        takeaway: 'Deletion with two children is the tricky case.',
        visual: 'bst-update',
        algo: [
          'Insert: search to NULL link; attach new leaf',
          'Delete leaf: unlink',
          'Delete one child: bypass node',
          'Delete two children: replace with inorder successor (or predecessor), then delete that node',
        ],
        complexity: { best: 'O(log n)', avg: 'O(log n)', worst: 'O(n)', note: 'Same shape dependence as search' },
        dryRun: {
          input: 'Delete 8 from BST where 8 has two children',
          steps: [
            'Find inorder successor (min of right subtree)',
            'Copy successor key into 8’s node',
            'Delete successor node (has ≤1 child)',
            'Ordering preserved',
          ],
          result: 'Two-child delete reduced to easier case',
        },
        code: `/* insert: while walking, remember parent; hang new node on NULL side */`,
        mistake: 'Deleting a two-child node by only unlinking it (orphans a subtree).',
      },
      {
        topic: 'Counting binary trees',
        terms: ['Catalan idea', 'recursive structure', 'n nodes', 'possible shapes'],
        definition: 'Counting binary trees studies how many shapes are possible.',
        takeaway: 'Structure grows combinatorially.',
        visual: 'count-bt',
        algo: [
          'Empty tree: 1 way (n=0)',
          'For n nodes: choose left size k; right has n-1-k',
          'Sum products of counts (Catalan recurrence)',
          'Number of shapes grows very fast with n',
        ],
        complexity: { best: '—', avg: '—', worst: '—', note: 'Counting is combinatorial; not a runtime of a tree op' },
        dryRun: {
          input: 'n = 3 labeled positions / unlabeled shapes',
          steps: [
            'Root fixed; left/right sizes (0,2),(1,1),(2,0)',
            'Use smaller counts recursively',
            'Catalan C_3 = 5 shapes',
            'Many distinct binary layouts',
          ],
          result: '5 binary tree shapes for n=3',
        },
        code: null,
        mistake: 'Confusing number of trees with number of BST insertion sequences without care.',
      },
    ],
    checkpoints: [
      { label: 'Tree traversal (n nodes)', bigO: 'O(n)', why: 'Each node visited once' },
      { label: 'Array parent/child index', bigO: 'O(1)', why: 'Closed-form index arithmetic' },
      { label: 'BST search (balanced)', bigO: 'O(log n)', why: 'Halving search space by order' },
      { label: 'BST search (skewed)', bigO: 'O(n)', why: 'Degenerates to a chain' },
      { label: 'BST insert/delete', bigO: 'O(h)', why: 'Path length = height' },
      { label: 'Threaded inorder', bigO: 'O(n)', why: 'Still visit all; less stack space' },
    ],
  },

  {
    n: 5,
    id: 'module-5',
    title: 'Graphs, Hashing, Priority Queues, and Leftist Trees',
    hours: 8,
    question: 'How do relationships, keys, and priorities choose the next item?',
    story: ['Graph', 'Traverse', 'Hash', 'Priority', 'Merge'],
    syllabus: [
      'Graph ADT / graph abstract data type',
      'Graph representation',
      'Elementary graph operations',
      'Graph traversal',
      'Hashing introduction',
      'Static hashing',
      'Dynamic hashing',
      'Single-ended priority queues',
      'Double-ended priority queues',
      'Leftist trees',
    ],
    notes: 'Lab 1BCSL306 Part-A Exp 6 (graph BFS/DFS) and Part-B Exp 6 (hashing + linear probing) practice Module 5 skills.',
    units: [
      {
        topic: 'Graph ADT / graph abstract data type',
        terms: ['vertices', 'edges', 'directed', 'undirected'],
        definition: 'A graph models relationships among objects.',
        takeaway: 'Graphs generalize lists and trees to many-to-many links.',
        visual: 'graph-adt',
        algo: [
          'Specify vertex set V and edge set E',
          'Directed: edges have orientation; undirected: symmetric',
          'ADT ops create vertices/edges and query adjacency',
          'Choose representation next',
        ],
        complexity: { best: '—', avg: '—', worst: '—', note: 'ADT cost depends on matrix vs list representation' },
        dryRun: {
          input: 'Cities A,B,C; roads A—B, B→C',
          steps: [
            'V = {A,B,C}',
            'Undirected edge {A,B}',
            'Directed edge (B,C)',
            'A’s neighbors include B',
          ],
          result: 'Relationship model ready',
        },
        code: null,
        mistake: 'Assuming every graph is a tree (no cycles / single parent).',
      },
      {
        topic: 'Graph representation',
        terms: ['adjacency matrix', 'adjacency list', 'space', 'density'],
        definition: 'Graph representation determines storage and operation cost.',
        takeaway: 'Dense graphs suit matrices; sparse graphs suit lists.',
        visual: 'graph-rep',
        algo: [
          'Matrix: A[i][j]=1 if edge (i,j); space Θ(V²)',
          'List: for each vertex, store neighbor list; space Θ(V+E)',
          'Edge query faster in matrix; iterating neighbors faster in lists when sparse',
          'Pick by expected density',
        ],
        complexity: { best: 'O(1)', avg: 'O(deg)', worst: 'O(V)', note: 'Edge check O(1) matrix; neighbor scan O(deg) list' },
        dryRun: {
          input: '4 vertices, 3 edges',
          steps: [
            'Matrix uses 16 cells (many zeros)',
            'Lists store 3 edge endpoints (+ undirected twin if needed)',
            'Sparse → prefer lists',
            'Complete graph → matrix may be fine',
          ],
          result: 'Representation matches density',
        },
        code: `int adj[V][V];           /* matrix */
/* or Node *list[V];     adjacency lists */`,
        mistake: 'Using an adjacency matrix for a huge sparse city graph.',
      },
      {
        topic: 'Elementary graph operations',
        terms: ['create', 'insert edge', 'delete edge', 'neighbors'],
        definition: 'Graph ADT operations manipulate vertices and edges.',
        takeaway: 'Operations must match the chosen representation.',
        visual: 'graph-ops',
        algo: [
          'create: allocate matrix or empty lists',
          'insertEdge(u,v): set matrix bit or append list node',
          'deleteEdge(u,v): clear bit or unlink list node',
          'neighbors(u): scan row or walk list',
        ],
        complexity: { best: 'O(1)', avg: 'O(deg)', worst: 'O(V)', note: 'Insert edge O(1) typical; delete in list may scan' },
        dryRun: {
          input: 'Empty digraph on {1,2,3}; insert 1→2, 2→3',
          steps: [
            'create V=3',
            'insertEdge(1,2)',
            'insertEdge(2,3)',
            'neighbors(2) → {3}',
          ],
          result: 'Path 1→2→3 exists',
        },
        code: `void insertEdge(int u, int v){ adj[u][v] = 1; }`,
        mistake: 'Forgetting the reverse edge when the graph is undirected.',
      },
      {
        topic: 'Graph traversal',
        terms: ['DFS', 'BFS', 'visited', 'reachability'],
        definition: 'DFS and BFS explore reachable vertices systematically.',
        takeaway: 'Traversal requires a visited set to avoid repetition.',
        visual: 'graph-trav',
        algo: [
          'Mark start visited',
          'DFS: recurse (or stack) on unvisited neighbors',
          'BFS: queue neighbors level by level',
          'Unvisited after traversal ⇒ not reachable',
        ],
        complexity: { best: 'O(V+E)', avg: 'O(V+E)', worst: 'O(V+E)', note: 'Lists; matrix form often O(V²)' },
        dryRun: {
          input: 'A—B—C, A—D; BFS from A',
          steps: [
            'Visit A; enqueue B,D',
            'Visit B; enqueue C',
            'Visit D',
            'Visit C — order A B D C (example)',
          ],
          result: 'All reachable marked visited',
        },
        code: `void bfs(int s){
  queue_push(s); visited[s]=1;
  while(!queue_empty()){
    int u=queue_pop();
    for(int v of neighbors(u))
      if(!visited[v]){ visited[v]=1; queue_push(v); }
  }
}`,
        mistake: 'Omitting visited[] and looping forever on cycles.',
      },
      {
        topic: 'Hashing introduction',
        terms: ['key', 'hash function', 'table', 'collision'],
        definition: 'Hashing maps keys to table positions for fast search.',
        takeaway: 'Collision handling is unavoidable in real tables.',
        visual: 'hash-intro',
        algo: [
          'Choose table size m',
          'Compute h(k) in 0..m-1',
          'Place record at that slot (or chain)',
          'On collision, apply a resolution strategy',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(n)', note: 'Ideal O(1); collisions degrade' },
        dryRun: {
          input: 'k=25; m=10; h(k)=k mod m',
          steps: [
            'h(25)=5',
            'Store record at index 5',
            'Another key with mod 5 → collision',
            'Need probing or chaining',
          ],
          result: 'Home address 5',
        },
        code: `int h(int k, int m){ return k % m; }`,
        mistake: 'Assuming hash tables never collide.',
      },
      {
        topic: 'Static hashing',
        terms: ['fixed table', 'linear probing', 'chaining', 'load factor'],
        definition: 'Static hashing uses a fixed-size table.',
        takeaway: 'Load factor controls performance.',
        visual: 'hash-static',
        algo: [
          'Linear probing: on collision try i+1, i+2, … mod m',
          'Chaining: store a list at each slot',
          'Load factor α = n/m',
          'Search follows the same probe/chain path',
        ],
        complexity: { best: 'O(1)', avg: 'O(1 + α)', worst: 'O(n)', note: 'High α → long probes/chains' },
        dryRun: {
          input: 'm=7; insert 10,3,17 with h=k%7; linear probe',
          steps: [
            '10→3; 3→3 collision → probe 4',
            '17→3 collision → probe until free',
            'Search 3 follows same probes',
            'α rises as inserts continue',
          ],
          result: 'Fixed table with probing',
        },
        code: `int i = h(k, m);
while (table[i] != EMPTY && table[i] != k)
  i = (i + 1) % m;`,
        mistake: 'Stopping a failed linear-probe search too early (not full cycle / tombstones).',
      },
      {
        topic: 'Dynamic hashing',
        terms: ['growing table', 'rehash', 'extendible idea', 'bucket'],
        definition: 'Dynamic hashing adapts as records grow.',
        takeaway: 'Expansion reduces long collision chains.',
        visual: 'hash-dyn',
        algo: [
          'Watch load factor or bucket overflow',
          'Grow table (or directory) when needed',
          'Rehash keys into the larger structure',
          'Extendible hashing uses directory + buckets (idea-level in syllabus)',
        ],
        complexity: { best: 'O(1)', avg: 'O(1)', worst: 'O(n)', note: 'Rehash is occasional O(n); lookups aim for O(1)' },
        dryRun: {
          input: 'Table nearly full; α too high',
          steps: [
            'Allocate larger table',
            'Rehash each key with new m',
            'Insert new record',
            'Average probe length drops',
          ],
          result: 'Table grows with data',
        },
        code: null,
        mistake: 'Growing without rehashing (old h(k) slots become wrong).',
      },
      {
        topic: 'Priority queue',
        terms: ['priority', 'delete min', 'delete max', 'heap idea'],
        definition: 'A priority queue removes the item with highest or lowest priority.',
        takeaway: 'Priority order is different from arrival order.',
        visual: 'prio-q',
        algo: [
          'insert(x) with its priority',
          'deleteMin or deleteMax returns the extreme',
          'Heap representation: complete tree in array; bubble up/down',
          'Not FIFO unless priorities equal arrival',
        ],
        complexity: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', note: 'Heap insert/delete-min typically O(log n); find-min O(1)' },
        dryRun: {
          input: 'insert (A,3),(B,1),(C,2); deleteMin',
          steps: [
            'Heap orders by priority',
            'Min is B(1)',
            'deleteMin removes B',
            'Heapify restores order',
          ],
          result: 'B leaves before earlier A',
        },
        code: `/* binary heap: parent i/2; siftdown after deleteMin */`,
        mistake: 'Expecting queue FIFO behavior from a priority queue.',
      },
      {
        topic: 'Double-ended priority queue',
        terms: ['min', 'max', 'two-ended access', 'range'],
        definition: 'A DEPQ supports both delete-min and delete-max.',
        takeaway: 'It is useful when extremes are both important.',
        visual: 'depq',
        algo: [
          'Support find/delete at both min and max ends',
          'Structures may combine heaps or use specialized trees',
          'Insert must keep both extremes accessible',
          'Compare with single-ended PQ',
        ],
        complexity: { best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)', note: 'Goal: efficient access to both extremes' },
        dryRun: {
          input: 'Values 4,9,1,7',
          steps: [
            'deleteMin → 1',
            'deleteMax → 9',
            'Remaining 4,7',
            'Both ends mattered',
          ],
          result: 'Min and max removed independently',
        },
        code: null,
        mistake: 'Implementing DEPQ as two independent unsorted scans each time (O(n)).',
      },
      {
        topic: 'Leftist tree',
        terms: ['null path length', 'merge', 'heap order', 'priority queue'],
        definition: 'Leftist trees support efficient mergeable priority queues.',
        takeaway: 'Merge is the central operation.',
        visual: 'leftist',
        algo: [
          'Maintain heap order on keys',
          'Null path length (npl) biases heavy right spine',
          'merge(a,b): recursively merge right spine; swap children to keep leftist property',
          'insert/deleteMin built from merge',
        ],
        complexity: { best: 'O(log n)', avg: 'O(log n)', worst: 'O(log n)', note: 'Merge-based PQ ops are O(log n)' },
        dryRun: {
          input: 'Merge two min-leftist heaps H1, H2',
          steps: [
            'Compare roots; smaller becomes new root',
            'Merge its right child with the other heap',
            'Update npl; swap children if needed',
            'Result is one leftist heap',
          ],
          result: 'Merged priority queue',
        },
        code: null,
        mistake: 'Preserving heap order but forgetting the leftist (npl) child swap.',
      },
    ],
    checkpoints: [
      { label: 'BFS/DFS (list graph)', bigO: 'O(V + E)', why: 'Each vertex/edge processed constantly often' },
      { label: 'Adjacency matrix edge check', bigO: 'O(1)', why: 'Direct A[u][v] lookup' },
      { label: 'Hash search (low α)', bigO: 'O(1)', why: 'Short probe/chain expected' },
      { label: 'Hash search (high α / worst)', bigO: 'O(n)', why: 'Long collision sequence' },
      { label: 'Binary heap delete-min', bigO: 'O(log n)', why: 'Sift down the height' },
      { label: 'Leftist merge', bigO: 'O(log n)', why: 'Right-spine merge + npl fixes' },
    ],
  },
]

export function getDsModule(n) {
  return DS_MODULES.find((m) => m.n === n)
}

export const javaSlideMeta = {
  "module1": {
    "slides": [
      {
        "n": 1,
        "section": "Opening",
        "title": "Java Fundamentals",
        "subtitle": "Module 1 builds the base: OOP ideas, syntax, data, operators and control flow.",
        "layout": "hero",
        "data": {
          "big": "Java\nModule 1",
          "sub": "OOP principles • lexical rules • types • arrays • operators • control statements",
          "mark": "JAVA\nBASICS"
        }
      },
      {
        "n": 2,
        "section": "Opening",
        "title": "Module 1 learning path",
        "subtitle": "Use the syllabus as the checklist.",
        "layout": "bullets",
        "data": [
          "Explain two programming paradigms and the three OOP principles",
          "Use blocks, lexical rules, identifiers, literals, comments, separators and keywords",
          "Use primitive types, variables, conversion, casting, promotion and arrays",
          "Apply arithmetic, relational, boolean, assignment, ternary and precedence rules",
          "Write selection, iteration and jump statements"
        ]
      },
      {
        "n": 3,
        "section": "OOP Overview",
        "title": "Java combines structure with objects",
        "subtitle": "Motivate Java's programming model.",
        "layout": "flow",
        "data": [
          "Problem",
          "Data + behavior",
          "Class",
          "Object",
          "Reusable program"
        ]
      },
      {
        "n": 4,
        "section": "OOP Overview",
        "title": "Two paradigms",
        "subtitle": "Compare process-oriented and object-oriented thinking.",
        "layout": "compare",
        "data": [
          "Process-oriented",
          [
            "Program organized around steps",
            "Functions act on data",
            "Works well for small procedures",
            "Data can be scattered"
          ],
          "Object-oriented",
          [
            "Program organized around objects",
            "Data and methods stay together",
            "Models real-world entities",
            "Supports reuse and extension"
          ]
        ]
      },
      {
        "n": 5,
        "section": "OOP Overview",
        "title": "Abstraction hides unnecessary detail",
        "subtitle": "Define abstraction.",
        "layout": "definition",
        "data": [
          "Abstraction",
          "Abstraction represents essential features without exposing every internal detail of how the work is done.",
          [
            "Essential",
            "Hide detail",
            "Interface",
            "Object",
            "Clarity"
          ]
        ]
      },
      {
        "n": 6,
        "section": "OOP Overview",
        "title": "The three OOP principles",
        "subtitle": "Explain encapsulation, inheritance and polymorphism.",
        "layout": "cards",
        "data": [
          [
            "Encapsulation",
            "Bind data and methods together and protect internal state."
          ],
          [
            "Inheritance",
            "Create new classes from existing classes."
          ],
          [
            "Polymorphism",
            "Use one interface for multiple behaviors."
          ],
          [
            "Design benefit",
            "Programs become easier to extend, test and reuse."
          ]
        ]
      },
      {
        "n": 7,
        "section": "Syntax",
        "title": "Blocks group statements",
        "subtitle": "Explain blocks of code.",
        "layout": "code",
        "data": [
          "if (marks >= 40) {\n    System.out.println(\"Pass\");\n    grade = 'P';\n}",
          "Block"
        ]
      },
      {
        "n": 8,
        "section": "Syntax",
        "title": "Lexical issues are Java's vocabulary rules",
        "subtitle": "Introduce lexical components.",
        "layout": "hub",
        "data": [
          "Lexical",
          [
            [
              "Whitespace",
              "Separates tokens."
            ],
            [
              "Identifiers",
              "Names for variables/classes."
            ],
            [
              "Literals",
              "Fixed values in code."
            ],
            [
              "Comments",
              "Documentation for humans."
            ],
            [
              "Separators",
              "Punctuation tokens."
            ],
            [
              "Keywords",
              "Reserved words."
            ]
          ]
        ]
      },
      {
        "n": 9,
        "section": "Syntax",
        "title": "Identifiers and keywords",
        "subtitle": "Explain naming rules.",
        "layout": "cards",
        "data": [
          [
            "Identifiers",
            "Can contain letters, digits, underscore and currency symbols; cannot start with a digit."
          ],
          [
            "Case-sensitive",
            "Total and total are different names."
          ],
          [
            "Keywords",
            "Reserved words such as class, public, if, for and return."
          ],
          [
            "Convention",
            "ClassName for classes, variableName for variables and methods."
          ]
        ]
      },
      {
        "n": 10,
        "section": "Syntax",
        "title": "Literals, comments and separators",
        "subtitle": "Cover remaining lexical pieces.",
        "layout": "cards",
        "data": [
          [
            "Literals",
            "Examples: 10, 3.14, 'A', true and \"Java\"."
          ],
          [
            "Comments",
            "// single-line, /* block */, /** documentation */."
          ],
          [
            "Separators",
            "Parentheses, braces, brackets, semicolon, comma and dot."
          ],
          [
            "Whitespace",
            "Spaces and line breaks separate tokens but do not change most meanings."
          ]
        ]
      },
      {
        "n": 11,
        "section": "Data Types",
        "title": "Primitive types store simple values",
        "subtitle": "Classify primitive types.",
        "layout": "hub",
        "data": [
          "Primitive",
          [
            [
              "Integer",
              "byte, short, int, long"
            ],
            [
              "Floating",
              "float, double"
            ],
            [
              "Character",
              "char uses Unicode."
            ],
            [
              "Boolean",
              "true or false only."
            ],
            [
              "Size",
              "Types define ranges."
            ],
            [
              "Operations",
              "Promotions can occur."
            ]
          ]
        ]
      },
      {
        "n": 12,
        "section": "Data Types",
        "title": "Integer and floating-point types",
        "subtitle": "Compare numeric families.",
        "layout": "table",
        "data": [
          [
            "Family",
            "Types",
            "Typical use"
          ],
          [
            [
              "Integer",
              "byte, short, int, long",
              "Counts, indexes, exact whole numbers"
            ],
            [
              "Floating point",
              "float, double",
              "Fractions, measurements, scientific values"
            ],
            [
              "Default choices",
              "int and double",
              "Most common numeric starting point"
            ]
          ]
        ]
      },
      {
        "n": 13,
        "section": "Data Types",
        "title": "char and boolean",
        "subtitle": "Explain nonnumeric primitives.",
        "layout": "cards",
        "data": [
          [
            "char",
            "Stores a single Unicode character using single quotes."
          ],
          [
            "boolean",
            "Stores only true or false."
          ],
          [
            "Not integers",
            "Java does not treat boolean as 0 or 1."
          ],
          [
            "Use cases",
            "Characters in text and conditions in control flow."
          ]
        ]
      },
      {
        "n": 14,
        "section": "Variables",
        "title": "Variables name memory values",
        "subtitle": "Explain declaration and initialization.",
        "layout": "code",
        "data": [
          "int count = 10;\ndouble avg = 82.5;\nchar grade = 'A';\nboolean pass = true;",
          "Variable declaration"
        ]
      },
      {
        "n": 15,
        "section": "Variables",
        "title": "Scope and lifetime follow blocks",
        "subtitle": "Explain local variable visibility.",
        "layout": "code",
        "data": [
          "int x = 10;\n{\n    int y = 20;\n    System.out.println(x + y);\n}\n// y is not visible here",
          "Scope"
        ]
      },
      {
        "n": 16,
        "section": "Conversion",
        "title": "Conversion and casting control type changes",
        "subtitle": "Compare automatic and explicit conversion.",
        "layout": "compare",
        "data": [
          "Automatic conversion",
          [
            "Widening conversion",
            "No information loss expected",
            "Example: int to long",
            "Done by compiler"
          ],
          "Casting",
          [
            "Explicit request",
            "May lose information",
            "Example: double to int",
            "Programmer takes responsibility"
          ]
        ]
      },
      {
        "n": 17,
        "section": "Conversion",
        "title": "Promotion happens inside expressions",
        "subtitle": "Explain expression promotion.",
        "layout": "flow",
        "data": [
          "Operands chosen",
          "Smaller numeric types promote",
          "Expression evaluated",
          "Result type decided",
          "Assignment checks compatibility"
        ]
      },
      {
        "n": 18,
        "section": "Arrays",
        "title": "Arrays store indexed collections",
        "subtitle": "Define arrays.",
        "layout": "definition",
        "data": [
          "Array",
          "An array is a fixed-size collection of values of the same type, accessed by zero-based index.",
          [
            "Same type",
            "Fixed length",
            "Index",
            "length",
            "Loop"
          ]
        ]
      },
      {
        "n": 19,
        "section": "Arrays",
        "title": "One-dimensional arrays",
        "subtitle": "Show array declaration and traversal.",
        "layout": "code",
        "data": [
          "int[] marks = {80, 75, 90};\nfor (int i = 0; i < marks.length; i++) {\n    System.out.println(marks[i]);\n}",
          "1D array"
        ]
      },
      {
        "n": 20,
        "section": "Arrays",
        "title": "Multidimensional arrays",
        "subtitle": "Show matrix-style arrays.",
        "layout": "code",
        "data": [
          "int[][] a = {\n    {1, 2, 3},\n    {4, 5, 6}\n};\nSystem.out.println(a[1][2]);",
          "2D array"
        ]
      },
      {
        "n": 21,
        "section": "Operators",
        "title": "Operators build expressions",
        "subtitle": "Introduce operator categories.",
        "layout": "hub",
        "data": [
          "Operators",
          [
            [
              "Arithmetic",
              "+ - * / %"
            ],
            [
              "Relational",
              "< <= > >= == !="
            ],
            [
              "Boolean",
              "&& || !"
            ],
            [
              "Assignment",
              "= += -= ..."
            ],
            [
              "Ternary",
              "condition ? a : b"
            ],
            [
              "Precedence",
              "Evaluation order."
            ]
          ]
        ]
      },
      {
        "n": 22,
        "section": "Operators",
        "title": "Arithmetic and relational operators",
        "subtitle": "Compare value and comparison operators.",
        "layout": "cards",
        "data": [
          [
            "Arithmetic",
            "Compute numeric results using +, -, *, / and %."
          ],
          [
            "Increment/decrement",
            "++ and -- change a variable by one."
          ],
          [
            "Relational",
            "Compare values and produce boolean results."
          ],
          [
            "Equality",
            "Use == and != carefully; assignment uses single =."
          ]
        ]
      },
      {
        "n": 23,
        "section": "Operators",
        "title": "Boolean logical operators",
        "subtitle": "Explain logical combination.",
        "layout": "code",
        "data": [
          "if (age >= 18 && hasId) {\n    System.out.println(\"Allowed\");\n}\n\nif (marks < 40 || attendance < 75) {\n    System.out.println(\"Warning\");\n}",
          "Boolean logic"
        ]
      },
      {
        "n": 24,
        "section": "Operators",
        "title": "Assignment and ternary operators",
        "subtitle": "Show concise forms.",
        "layout": "code",
        "data": [
          "count += 5;\nmax = (a > b) ? a : b;\nstatus = pass ? \"OK\" : \"Repeat\";",
          "Assignment + ternary"
        ]
      },
      {
        "n": 25,
        "section": "Operators",
        "title": "Precedence and parentheses",
        "subtitle": "Explain evaluation order.",
        "layout": "cards",
        "data": [
          [
            "Precedence",
            "Controls which operator binds first."
          ],
          [
            "Associativity",
            "Controls direction when precedence is same."
          ],
          [
            "Parentheses",
            "Make intended order explicit."
          ],
          [
            "Best practice",
            "Use parentheses when readability improves."
          ]
        ]
      },
      {
        "n": 26,
        "section": "Control",
        "title": "Selection statements choose a path",
        "subtitle": "Introduce if and switch.",
        "layout": "flow",
        "data": [
          "Condition",
          "true branch",
          "false/default branch",
          "statement block",
          "continue program"
        ]
      },
      {
        "n": 27,
        "section": "Control",
        "title": "if and nested if",
        "subtitle": "Show branch syntax.",
        "layout": "code",
        "data": [
          "if (score >= 90) {\n    grade = 'A';\n} else if (score >= 75) {\n    grade = 'B';\n} else {\n    grade = 'C';\n}",
          "if / else-if"
        ]
      },
      {
        "n": 28,
        "section": "Control",
        "title": "Traditional switch",
        "subtitle": "Explain multi-way selection.",
        "layout": "code",
        "data": [
          "switch (choice) {\ncase 1: System.out.println(\"Add\"); break;\ncase 2: System.out.println(\"Delete\"); break;\ndefault: System.out.println(\"Invalid\");\n}",
          "switch"
        ]
      },
      {
        "n": 29,
        "section": "Control",
        "title": "Loops repeat work",
        "subtitle": "Compare loop types.",
        "layout": "cards",
        "data": [
          [
            "while",
            "Checks condition before each iteration."
          ],
          [
            "do-while",
            "Runs body at least once."
          ],
          [
            "for",
            "Compact initialization, condition and update."
          ],
          [
            "for-each",
            "Simpler traversal of arrays and iterable collections."
          ]
        ]
      },
      {
        "n": 30,
        "section": "Control",
        "title": "for and for-each loops",
        "subtitle": "Show count loop and traversal loop.",
        "layout": "code",
        "data": [
          "for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}\n\nfor (int mark : marks) {\n    total += mark;\n}",
          "Loop patterns"
        ]
      },
      {
        "n": 31,
        "section": "Control",
        "title": "Nested loops handle grids",
        "subtitle": "Connect loops to matrix work.",
        "layout": "code",
        "data": [
          "for (int i = 0; i < rows; i++) {\n    for (int j = 0; j < cols; j++) {\n        c[i][j] = a[i][j] + b[i][j];\n    }\n}",
          "Nested loops"
        ]
      },
      {
        "n": 32,
        "section": "Control",
        "title": "Jump statements alter normal flow",
        "subtitle": "Explain break, continue and return.",
        "layout": "cards",
        "data": [
          [
            "break",
            "Exit loop or switch."
          ],
          [
            "continue",
            "Skip to next loop iteration."
          ],
          [
            "return",
            "Exit a method, optionally returning a value."
          ],
          [
            "Use carefully",
            "Too many jumps can make code harder to trace."
          ]
        ]
      },
      {
        "n": 33,
        "section": "Lab Link",
        "title": "Module 1 lab connection",
        "subtitle": "Map fundamentals to practice.",
        "layout": "cards",
        "data": [
          [
            "Matrix addition",
            "Uses arrays, nested loops and arithmetic operators."
          ],
          [
            "Input validation",
            "Uses if/switch and boolean conditions."
          ],
          [
            "Debugging",
            "Trace variables, indexes and loop bounds."
          ],
          [
            "Common error",
            "ArrayIndexOutOfBoundsException from wrong index."
          ]
        ]
      },
      {
        "n": 34,
        "section": "OOP Overview",
        "title": "Why OOP helps student programs grow",
        "subtitle": "Explain the practical need for OOP before syntax.",
        "layout": "cards",
        "data": [
          [
            "Without objects",
            "A marks program may scatter names, USNs, totals and grades across separate arrays."
          ],
          [
            "With objects",
            "A Student object can keep related data and behavior together."
          ],
          [
            "Maintenance",
            "Changing one concept is easier when its data and methods are grouped."
          ],
          [
            "Exam idea",
            "OOP reduces complexity through abstraction and encapsulation."
          ]
        ]
      },
      {
        "n": 35,
        "section": "Syntax",
        "title": "How the Java compiler reads a program",
        "subtitle": "Show how source code becomes executable bytecode.",
        "layout": "flow",
        "data": [
          "Write .java file",
          "Compiler tokenizes code",
          "javac checks syntax/types",
          "Bytecode .class created",
          "JVM runs bytecode"
        ]
      },
      {
        "n": 36,
        "section": "Data Types",
        "title": "Choosing the right primitive type",
        "subtitle": "Give student-friendly type selection rules.",
        "layout": "cards",
        "data": [
          [
            "int",
            "Default choice for whole-number counters, indexes and marks."
          ],
          [
            "double",
            "Default choice for decimal calculations such as average."
          ],
          [
            "char",
            "Use for one character such as grade."
          ],
          [
            "boolean",
            "Use when the answer is yes/no or true/false."
          ]
        ]
      },
      {
        "n": 37,
        "section": "Data Types",
        "title": "Worked example: marks total and average",
        "subtitle": "Connect primitive types with arithmetic.",
        "layout": "code",
        "data": [
          "int m1 = 78, m2 = 84, m3 = 91;\nint total = m1 + m2 + m3;\ndouble avg = total / 3.0;\nboolean distinction = avg >= 75;\n\nSystem.out.println(total);\nSystem.out.println(avg);",
          "Worked example"
        ]
      },
      {
        "n": 38,
        "section": "Conversion",
        "title": "Casting can lose information",
        "subtitle": "Make narrowing conversion visible.",
        "layout": "code",
        "data": [
          "double value = 98.75;\nint roundedDown = (int) value;\n\nSystem.out.println(roundedDown); // 98",
          "Casting result"
        ]
      },
      {
        "n": 39,
        "section": "Arrays",
        "title": "Array memory model",
        "subtitle": "Explain indexes using a visual mental model.",
        "layout": "flow",
        "data": [
          "marks",
          "marks[0]",
          "marks[1]",
          "marks[2]",
          "marks.length = 3"
        ]
      },
      {
        "n": 40,
        "section": "Arrays",
        "title": "Common array mistakes",
        "subtitle": "Prevent beginner errors.",
        "layout": "bullets",
        "data": [
          "Using index equal to length",
          "Forgetting arrays are fixed-size after creation",
          "Mixing row and column indexes in 2D arrays",
          "Assuming for-each gives the index",
          "Printing array reference instead of elements"
        ]
      },
      {
        "n": 41,
        "section": "Operators",
        "title": "Predict the output: precedence",
        "subtitle": "Train output tracing.",
        "layout": "code",
        "data": [
          "int a = 2 + 3 * 4;\nint b = (2 + 3) * 4;\nboolean c = a < b && b == 20;\n\nSystem.out.println(a);\nSystem.out.println(b);\nSystem.out.println(c);",
          "Output tracing"
        ]
      },
      {
        "n": 42,
        "section": "Control",
        "title": "Choosing the correct loop",
        "subtitle": "Help students select loop forms.",
        "layout": "table",
        "data": [
          [
            "Situation",
            "Best loop",
            "Reason"
          ],
          [
            [
              "Repeat while condition is true",
              "while",
              "Condition controls continuation"
            ],
            [
              "Menu must run once",
              "do-while",
              "Body executes before check"
            ],
            [
              "Known count",
              "for",
              "Counter logic stays together"
            ],
            [
              "Visit every array value",
              "for-each",
              "Cleaner traversal"
            ]
          ]
        ]
      },
      {
        "n": 43,
        "section": "Control",
        "title": "Trace nested loops slowly",
        "subtitle": "Explain how nested loops execute.",
        "layout": "flow",
        "data": [
          "Outer i = 0",
          "Inner j runs fully",
          "Outer i increments",
          "Inner j runs again",
          "All cells processed"
        ]
      },
      {
        "n": 44,
        "section": "Control",
        "title": "Common control-flow mistakes",
        "subtitle": "Clarify misconceptions.",
        "layout": "bullets",
        "data": [
          "Putting semicolon immediately after if or loop header",
          "Forgetting break in traditional switch",
          "Writing infinite loops accidentally",
          "Using continue when break is needed",
          "Returning too early from a method"
        ]
      },
      {
        "n": 45,
        "section": "Lab Link",
        "title": "Worked lab plan: matrix addition",
        "subtitle": "Break the lab program into teachable steps.",
        "layout": "flow",
        "data": [
          "Read order N",
          "Declare A, B, C",
          "Read matrix values",
          "Use nested loops to add",
          "Print result matrix"
        ]
      },
      {
        "n": 46,
        "section": "Summary",
        "title": "Module 1 mind map",
        "subtitle": "Connect all major headings.",
        "layout": "hub",
        "data": [
          "Module 1",
          [
            [
              "OOP",
              "Abstraction and principles."
            ],
            [
              "Lexical",
              "Tokens and keywords."
            ],
            [
              "Types",
              "Primitive values."
            ],
            [
              "Arrays",
              "Indexed collections."
            ],
            [
              "Operators",
              "Expressions."
            ],
            [
              "Control",
              "Branches and loops."
            ]
          ]
        ]
      },
      {
        "n": 47,
        "section": "Summary",
        "title": "Viva and exam focus",
        "subtitle": "Turn concepts into marks.",
        "layout": "bullets",
        "data": [
          "Differentiate OOP principles with examples",
          "Write valid identifiers, literals and comments",
          "Explain primitive types and conversion/casting",
          "Trace array indexes and nested loops",
          "Predict outputs involving precedence, switch, break and continue"
        ]
      },
      {
        "n": 48,
        "section": "Summary",
        "title": "20 important viva questions",
        "subtitle": "Rapid oral revision.",
        "layout": "questions",
        "data": [
          "What is abstraction?",
          "Name three OOP principles.",
          "What is identifier?",
          "What is keyword?",
          "What is literal?",
          "Primitive types?",
          "What is char?",
          "What is boolean?",
          "What is casting?",
          "What is type promotion?",
          "What is array?",
          "Array index starts from?",
          "Arithmetic operators?",
          "Relational operators?",
          "&& vs ||?",
          "What is ternary operator?",
          "if vs switch?",
          "while vs do-while?",
          "What is for-each?",
          "break vs continue?"
        ]
      },
      {
        "n": 49,
        "section": "Summary",
        "title": "One-page revision sheet",
        "subtitle": "End with compact keywords.",
        "layout": "revision",
        "data": [
          "Java; class; object; abstraction; encapsulation; inheritance; polymorphism; block; whitespace; identifier; literal; comment; separator; keyword; byte; short; int; long; float; double; char; boolean; variable; scope; conversion; casting; promotion; array; length; arithmetic; relational; boolean logical; assignment; ternary; precedence; if; switch; while; do-while; for; for-each; break; continue; return.",
          "For Module 1 answers: define the construct, write syntax, trace one example, mention common error, and connect to a lab problem such as matrix addition."
        ]
      }
    ]
  },
  "module2": {
    "slides": [
      {
        "n": 1,
        "section": "Opening",
        "title": "Classes, Objects and Methods",
        "subtitle": "Module 2 teaches the core mechanics of Java object construction and class design.",
        "layout": "hero",
        "data": {
          "big": "Java\nModule 2",
          "sub": "Classes • objects • methods • constructors • this • access • static • final • nested classes",
          "mark": "CLASS\nOBJECT"
        }
      },
      {
        "n": 2,
        "section": "Opening",
        "title": "Module 2 learning path",
        "subtitle": "Use the syllabus as the checklist.",
        "layout": "bullets",
        "data": [
          "Explain class fundamentals and object declaration",
          "Assign object reference variables and understand garbage collection",
          "Write methods, constructors and use this",
          "Overload methods and pass/return objects",
          "Use recursion, access control, static and final",
          "Use nested and inner classes"
        ]
      },
      {
        "n": 3,
        "section": "Classes",
        "title": "Class, object and reference work together",
        "subtitle": "Visualize the core model.",
        "layout": "classDiagram",
        "data": null
      },
      {
        "n": 4,
        "section": "Classes",
        "title": "Class fundamentals",
        "subtitle": "Define class.",
        "layout": "definition",
        "data": [
          "Class",
          "A class is a blueprint that defines data fields and methods for objects of the same kind.",
          [
            "Fields",
            "Methods",
            "Blueprint",
            "Object",
            "State"
          ]
        ]
      },
      {
        "n": 5,
        "section": "Classes",
        "title": "General form of a class",
        "subtitle": "Show basic class syntax.",
        "layout": "code",
        "data": [
          "class Box {\n    double width;\n    double height;\n    double depth;\n\n    double volume() {\n        return width * height * depth;\n    }\n}",
          "Class syntax"
        ]
      },
      {
        "n": 6,
        "section": "Objects",
        "title": "Declaring and creating objects",
        "subtitle": "Explain reference and new.",
        "layout": "code",
        "data": [
          "Box b;          // declares reference\nb = new Box();  // creates object\n\nb.width = 10;\nSystem.out.println(b.volume());",
          "Object creation"
        ]
      },
      {
        "n": 7,
        "section": "Objects",
        "title": "Object references can share an object",
        "subtitle": "Explain reference assignment.",
        "layout": "flow",
        "data": [
          "Box b1 = new Box()",
          "Box b2 = b1",
          "Both point to same object",
          "Change through b2",
          "b1 sees same state"
        ]
      },
      {
        "n": 8,
        "section": "Methods",
        "title": "Methods define object behavior",
        "subtitle": "Define methods.",
        "layout": "definition",
        "data": [
          "Method",
          "A method is a named block of code inside a class that performs work and can use parameters and return a value.",
          [
            "Name",
            "Parameters",
            "Return type",
            "Body",
            "Behavior"
          ]
        ]
      },
      {
        "n": 9,
        "section": "Methods",
        "title": "Parameters carry data into methods",
        "subtitle": "Show method with parameters.",
        "layout": "code",
        "data": [
          "void setDim(double w, double h, double d) {\n    width = w;\n    height = h;\n    depth = d;\n}\n\nb.setDim(10, 20, 15);",
          "Method parameters"
        ]
      },
      {
        "n": 10,
        "section": "Constructors",
        "title": "Constructors initialize objects",
        "subtitle": "Define constructors.",
        "layout": "definition",
        "data": [
          "Constructor",
          "A constructor is a special member that runs when an object is created and initializes the object's state.",
          [
            "Same name",
            "No return type",
            "new",
            "Initialization",
            "Overloadable"
          ]
        ]
      },
      {
        "n": 11,
        "section": "Constructors",
        "title": "Constructor pattern",
        "subtitle": "Show constructor syntax.",
        "layout": "code",
        "data": [
          "class Box {\n    double width, height, depth;\n\n    Box(double w, double h, double d) {\n        width = w;\n        height = h;\n        depth = d;\n    }\n}",
          "Constructor"
        ]
      },
      {
        "n": 12,
        "section": "this",
        "title": "this names the current object",
        "subtitle": "Explain this keyword.",
        "layout": "code",
        "data": [
          "class Box {\n    double width;\n    Box(double width) {\n        this.width = width;\n    }\n}",
          "this keyword"
        ]
      },
      {
        "n": 13,
        "section": "Garbage Collection",
        "title": "Garbage collection reclaims unused objects",
        "subtitle": "Explain automatic memory cleanup.",
        "layout": "flow",
        "data": [
          "Object created",
          "References point to it",
          "References removed",
          "Object becomes unreachable",
          "Garbage collector may reclaim memory"
        ]
      },
      {
        "n": 14,
        "section": "Overloading",
        "title": "Method overloading gives one name many forms",
        "subtitle": "Define overloading.",
        "layout": "definition",
        "data": [
          "Overloading",
          "Method overloading lets a class define multiple methods with the same name but different parameter lists.",
          [
            "Same name",
            "Different parameters",
            "Compile-time choice",
            "Readability",
            "Polymorphism"
          ]
        ]
      },
      {
        "n": 15,
        "section": "Overloading",
        "title": "Overloading example",
        "subtitle": "Show overloaded methods.",
        "layout": "code",
        "data": [
          "int add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }\nint add(int a, int b, int c) { return a + b + c; }",
          "Overloaded methods"
        ]
      },
      {
        "n": 16,
        "section": "Objects as Parameters",
        "title": "Objects can be method arguments",
        "subtitle": "Explain object parameter passing.",
        "layout": "code",
        "data": [
          "boolean sameBox(Box ob) {\n    return width == ob.width &&\n           height == ob.height &&\n           depth == ob.depth;\n}",
          "Object parameter"
        ]
      },
      {
        "n": 17,
        "section": "Argument Passing",
        "title": "Java passes arguments by value",
        "subtitle": "Clarify primitive vs reference behavior.",
        "layout": "compare",
        "data": [
          "Primitive argument",
          [
            "Value is copied",
            "Method cannot change caller variable directly",
            "Example: int x"
          ],
          "Object reference argument",
          [
            "Reference value is copied",
            "Method can change object state",
            "Reference variable itself is still passed by value"
          ]
        ]
      },
      {
        "n": 18,
        "section": "Returning Objects",
        "title": "Methods can return objects",
        "subtitle": "Show object return pattern.",
        "layout": "code",
        "data": [
          "Box bigger() {\n    return new Box(width * 2,\n                   height * 2,\n                   depth * 2);\n}",
          "Return object"
        ]
      },
      {
        "n": 19,
        "section": "Recursion",
        "title": "Recursion solves a problem by calling itself",
        "subtitle": "Define recursion.",
        "layout": "definition",
        "data": [
          "Recursion",
          "Recursion occurs when a method calls itself, using a base case to stop and smaller subproblems to progress.",
          [
            "Self-call",
            "Base case",
            "Progress",
            "Stack",
            "Subproblem"
          ]
        ]
      },
      {
        "n": 20,
        "section": "Recursion",
        "title": "Recursive factorial",
        "subtitle": "Show recursive method.",
        "layout": "code",
        "data": [
          "int fact(int n) {\n    if (n == 0) return 1;\n    return n * fact(n - 1);\n}",
          "Recursion"
        ]
      },
      {
        "n": 21,
        "section": "Access Control",
        "title": "Access control protects class members",
        "subtitle": "Explain access modifiers.",
        "layout": "table",
        "data": [
          [
            "Modifier",
            "Access meaning",
            "Typical use"
          ],
          [
            [
              "private",
              "Only inside class",
              "Internal fields/helpers"
            ],
            [
              "default",
              "Package access",
              "Package-local collaboration"
            ],
            [
              "protected",
              "Package + subclasses",
              "Inheritance support"
            ],
            [
              "public",
              "Everywhere",
              "Class API"
            ]
          ]
        ]
      },
      {
        "n": 22,
        "section": "static",
        "title": "static belongs to the class",
        "subtitle": "Explain static.",
        "layout": "definition",
        "data": [
          "static",
          "A static member belongs to the class rather than a particular object, so it can be used through the class name.",
          [
            "Class-level",
            "Shared",
            "No object required",
            "Utility",
            "main"
          ]
        ]
      },
      {
        "n": 23,
        "section": "static",
        "title": "static example",
        "subtitle": "Show class-level member.",
        "layout": "code",
        "data": [
          "class Counter {\n    static int count = 0;\n    Counter() { count++; }\n}\n\nSystem.out.println(Counter.count);",
          "static member"
        ]
      },
      {
        "n": 24,
        "section": "final",
        "title": "final prevents change",
        "subtitle": "Explain final uses.",
        "layout": "cards",
        "data": [
          [
            "final variable",
            "Value cannot be reassigned after initialization."
          ],
          [
            "final method",
            "Cannot be overridden in subclasses."
          ],
          [
            "final class",
            "Cannot be extended."
          ],
          [
            "Design use",
            "Express constants, safety and fixed behavior."
          ]
        ]
      },
      {
        "n": 25,
        "section": "Nested Classes",
        "title": "Nested and inner classes localize helper logic",
        "subtitle": "Define nested classes.",
        "layout": "cards",
        "data": [
          [
            "Nested class",
            "A class declared inside another class."
          ],
          [
            "Static nested class",
            "Does not require outer object."
          ],
          [
            "Inner class",
            "Associated with an outer object."
          ],
          [
            "Benefit",
            "Keeps closely related helper code near the class it serves."
          ]
        ]
      },
      {
        "n": 26,
        "section": "Strings and Arguments",
        "title": "Useful nearby class topics",
        "subtitle": "Connect textbook chapter extras.",
        "layout": "cards",
        "data": [
          [
            "String",
            "Immutable text object used heavily in Java programs."
          ],
          [
            "Command-line arguments",
            "main receives String[] args."
          ],
          [
            "Varargs",
            "Methods can accept variable number of arguments."
          ],
          [
            "Local var",
            "var can infer local reference types when initializer is clear."
          ]
        ]
      },
      {
        "n": 27,
        "section": "Lab Link",
        "title": "Module 2 lab connection",
        "subtitle": "Map classes to practice.",
        "layout": "cards",
        "data": [
          [
            "Stack class",
            "Uses fields, methods, constructor and access control."
          ],
          [
            "Student class",
            "Uses object arrays and member variables."
          ],
          [
            "Testing objects",
            "Create several objects and call methods."
          ],
          [
            "Common error",
            "Using object reference before new creates NullPointerException."
          ]
        ]
      },
      {
        "n": 28,
        "section": "Classes",
        "title": "A class separates state from behavior",
        "subtitle": "Make class design more readable.",
        "layout": "cards",
        "data": [
          [
            "State",
            "Fields store what an object knows."
          ],
          [
            "Behavior",
            "Methods define what an object can do."
          ],
          [
            "Constructor",
            "Puts the object into a valid starting state."
          ],
          [
            "Encapsulation",
            "Access control protects the state from careless changes."
          ]
        ]
      },
      {
        "n": 29,
        "section": "Objects",
        "title": "Object lifecycle from new to garbage collection",
        "subtitle": "Explain the lifetime of an object.",
        "layout": "flow",
        "data": [
          "Reference declared",
          "new allocates object",
          "Constructor initializes",
          "Methods use object",
          "Unreachable object collected"
        ]
      },
      {
        "n": 30,
        "section": "Objects",
        "title": "Common reference mistakes",
        "subtitle": "Prevent object-reference misconceptions.",
        "layout": "bullets",
        "data": [
          "Declaring a reference is not creating an object",
          "Two references can point to the same object",
          "Changing through one reference changes the same object",
          "A null reference cannot call methods",
          "Assignment copies references, not object contents"
        ]
      },
      {
        "n": 31,
        "section": "Methods",
        "title": "Method signature decides overloading",
        "subtitle": "Explain what the compiler checks.",
        "layout": "cards",
        "data": [
          [
            "Signature",
            "Method name plus parameter list."
          ],
          [
            "Not signature",
            "Return type alone is not enough for overloading."
          ],
          [
            "Resolution",
            "Compiler chooses the best matching method call."
          ],
          [
            "Promotion",
            "Java may promote argument types to find a match."
          ]
        ]
      },
      {
        "n": 32,
        "section": "Methods",
        "title": "Worked example: object as parameter",
        "subtitle": "Trace reference passing.",
        "layout": "flow",
        "data": [
          "Caller has Box object",
          "Reference value copied",
          "Method parameter points to same Box",
          "Method reads/changes state",
          "Caller sees changed state"
        ]
      },
      {
        "n": 33,
        "section": "Constructors",
        "title": "Default vs parameterized constructors",
        "subtitle": "Compare initialization styles.",
        "layout": "compare",
        "data": [
          "Default constructor",
          [
            "No arguments",
            "May be supplied by compiler if none exists",
            "Often sets default values"
          ],
          "Parameterized constructor",
          [
            "Accepts values",
            "Builds customized object",
            "Compiler default disappears if you define one"
          ]
        ]
      },
      {
        "n": 34,
        "section": "this",
        "title": "this is useful beyond name conflicts",
        "subtitle": "Expand this keyword use cases.",
        "layout": "cards",
        "data": [
          [
            "Field disambiguation",
            "this.x separates field from parameter x."
          ],
          [
            "Constructor chaining",
            "this(...) can call another constructor in same class."
          ],
          [
            "Current object",
            "Can pass current object to another method."
          ],
          [
            "Readable code",
            "Makes object ownership explicit."
          ]
        ]
      },
      {
        "n": 35,
        "section": "Recursion",
        "title": "Recursion uses the call stack",
        "subtitle": "Explain runtime behavior.",
        "layout": "flow",
        "data": [
          "fact(3)",
          "waits for fact(2)",
          "waits for fact(1)",
          "base case returns",
          "pending calls finish"
        ]
      },
      {
        "n": 36,
        "section": "Access Control",
        "title": "Encapsulation design rule",
        "subtitle": "Give practical modifier advice.",
        "layout": "bullets",
        "data": [
          "Keep fields private unless there is a strong reason",
          "Expose behavior through public methods",
          "Use constructors to create valid objects",
          "Use static for class-wide data or utilities",
          "Use final for constants or fixed behavior"
        ]
      },
      {
        "n": 37,
        "section": "static",
        "title": "static vs instance members",
        "subtitle": "Compare ownership.",
        "layout": "compare",
        "data": [
          "Instance member",
          [
            "One copy per object",
            "Accessed through object reference",
            "Represents object state"
          ],
          "static member",
          [
            "One shared class-level copy",
            "Accessed through class name",
            "Represents shared state or utility"
          ]
        ]
      },
      {
        "n": 38,
        "section": "Nested Classes",
        "title": "When nested classes make sense",
        "subtitle": "Explain the design purpose.",
        "layout": "cards",
        "data": [
          [
            "Helper object",
            "A helper used only by one outer class can stay inside it."
          ],
          [
            "Better grouping",
            "Keeps related implementation details together."
          ],
          [
            "Inner access",
            "Inner classes can access outer object members."
          ],
          [
            "Avoid overuse",
            "Use nested classes only when it improves clarity."
          ]
        ]
      },
      {
        "n": 39,
        "section": "Lab Link",
        "title": "Worked lab plan: stack class",
        "subtitle": "Break the stack lab into design steps.",
        "layout": "flow",
        "data": [
          "private int[] stack",
          "top index",
          "push method",
          "pop method",
          "display/test in main"
        ]
      },
      {
        "n": 40,
        "section": "Summary",
        "title": "Module 2 mind map",
        "subtitle": "Connect all major headings.",
        "layout": "hub",
        "data": [
          "Module 2",
          [
            [
              "Class",
              "Blueprint."
            ],
            [
              "Object",
              "Instance."
            ],
            [
              "Methods",
              "Behavior."
            ],
            [
              "Constructor",
              "Initialization."
            ],
            [
              "Access",
              "Encapsulation."
            ],
            [
              "static/final",
              "Class-level and fixed."
            ]
          ]
        ]
      },
      {
        "n": 41,
        "section": "Summary",
        "title": "Viva and exam focus",
        "subtitle": "Convert content into marks.",
        "layout": "bullets",
        "data": [
          "Draw class-object-reference model",
          "Explain constructor and this using code",
          "Differentiate method overloading and argument passing",
          "Use access modifiers for encapsulation",
          "Write Stack or Student class-style lab answers cleanly"
        ]
      },
      {
        "n": 42,
        "section": "Summary",
        "title": "20 important viva questions",
        "subtitle": "Rapid oral revision.",
        "layout": "questions",
        "data": [
          "What is class?",
          "What is object?",
          "What is reference?",
          "What does new do?",
          "What is method?",
          "What is constructor?",
          "Constructor return type?",
          "Use of this?",
          "What is garbage collection?",
          "What is overloading?",
          "Can return type alone overload?",
          "Object as parameter?",
          "Java pass by value?",
          "Return object?",
          "What is recursion?",
          "What is private?",
          "What is public?",
          "What is static?",
          "What is final?",
          "What is inner class?"
        ]
      },
      {
        "n": 43,
        "section": "Summary",
        "title": "One-page revision sheet",
        "subtitle": "End with compact keywords.",
        "layout": "revision",
        "data": [
          "Class; object; reference; new; field; method; parameter; return; constructor; default constructor; parameterized constructor; this; garbage collection; method overloading; object parameter; pass by value; return object; recursion; base case; private; default access; protected; public; static; final; nested class; inner class; String; args; varargs.",
          "For Module 2 answers: draw class/object memory idea, write a small class, show constructor/method calls, then explain access/static/final rules."
        ]
      }
    ]
  },
  "module3": {
    "slides": [
      {
        "n": 1,
        "section": "Opening",
        "title": "Inheritance, Packages and Interfaces",
        "subtitle": "Module 3 teaches reuse, run-time polymorphism, packages and interface-based design.",
        "layout": "hero",
        "data": {
          "big": "Java\nModule 3",
          "sub": "Inheritance • super • overriding • dynamic dispatch • abstract/final • packages • interfaces",
          "mark": "EXTENDS\nIMPLEMENTS"
        }
      },
      {
        "n": 2,
        "section": "Opening",
        "title": "Module 3 learning path",
        "subtitle": "Use the syllabus as the checklist.",
        "layout": "bullets",
        "data": [
          "Explain inheritance basics and member access",
          "Use super, constructors, multilevel hierarchy and method overriding",
          "Explain dynamic method dispatch and abstract classes",
          "Use final with inheritance and understand Object class",
          "Create packages, access members and import packages",
          "Define interfaces, default/static/private interface methods"
        ]
      },
      {
        "n": 3,
        "section": "Inheritance",
        "title": "Inheritance models an is-a relationship",
        "subtitle": "Visualize superclass and subclass.",
        "layout": "inheritanceDiagram",
        "data": null
      },
      {
        "n": 4,
        "section": "Inheritance",
        "title": "Inheritance basics",
        "subtitle": "Define inheritance.",
        "layout": "definition",
        "data": [
          "Inheritance",
          "Inheritance lets one class acquire members of another class, enabling reuse and specialization through superclass-subclass relationships.",
          [
            "extends",
            "Superclass",
            "Subclass",
            "Reuse",
            "Specialization"
          ]
        ]
      },
      {
        "n": 5,
        "section": "Inheritance",
        "title": "extends syntax",
        "subtitle": "Show simple inheritance code.",
        "layout": "code",
        "data": [
          "class Shape {\n    void draw() { System.out.println(\"draw\"); }\n}\n\nclass Circle extends Shape {\n    double radius;\n}",
          "extends"
        ]
      },
      {
        "n": 6,
        "section": "Inheritance",
        "title": "Member access and inheritance",
        "subtitle": "Explain accessibility.",
        "layout": "cards",
        "data": [
          [
            "private",
            "Not directly accessible in subclass."
          ],
          [
            "default",
            "Accessible in same package."
          ],
          [
            "protected",
            "Accessible in subclass and package."
          ],
          [
            "public",
            "Accessible everywhere."
          ]
        ]
      },
      {
        "n": 7,
        "section": "super",
        "title": "super reaches the superclass",
        "subtitle": "Explain super uses.",
        "layout": "cards",
        "data": [
          [
            "Call superclass constructor",
            "super(args) must be first statement in subclass constructor."
          ],
          [
            "Access superclass member",
            "super.method() or super.field when hidden/overridden."
          ],
          [
            "Avoid duplication",
            "Reuse base initialization and behavior."
          ],
          [
            "Clarity",
            "Makes parent-child relationship explicit."
          ]
        ]
      },
      {
        "n": 8,
        "section": "super",
        "title": "Constructor execution order",
        "subtitle": "Show construction flow.",
        "layout": "flow",
        "data": [
          "Object creation",
          "Superclass constructor",
          "Subclass constructor",
          "Fields initialized",
          "Object ready"
        ]
      },
      {
        "n": 9,
        "section": "Hierarchy",
        "title": "Multilevel hierarchy extends reuse",
        "subtitle": "Explain deeper inheritance.",
        "layout": "flow",
        "data": [
          "A",
          "B extends A",
          "C extends B",
          "C gets usable inherited members",
          "C can specialize"
        ]
      },
      {
        "n": 10,
        "section": "Overriding",
        "title": "Method overriding customizes behavior",
        "subtitle": "Define overriding.",
        "layout": "definition",
        "data": [
          "Overriding",
          "A subclass overrides a superclass method by defining a method with the same signature and compatible return type.",
          [
            "Same signature",
            "Subclass",
            "Runtime choice",
            "Polymorphism",
            "Specialization"
          ]
        ]
      },
      {
        "n": 11,
        "section": "Overriding",
        "title": "Overriding example",
        "subtitle": "Show polymorphic method.",
        "layout": "code",
        "data": [
          "class Shape { void draw() { } }\nclass Circle extends Shape {\n    @Override void draw() {\n        System.out.println(\"Circle\");\n    }\n}",
          "Override"
        ]
      },
      {
        "n": 12,
        "section": "Dispatch",
        "title": "Dynamic method dispatch enables runtime polymorphism",
        "subtitle": "Explain dispatch.",
        "layout": "flow",
        "data": [
          "Superclass reference",
          "Subclass object",
          "Overridden method call",
          "JVM chooses actual object method",
          "Polymorphic behavior"
        ]
      },
      {
        "n": 13,
        "section": "Dispatch",
        "title": "Dynamic dispatch code",
        "subtitle": "Show runtime binding.",
        "layout": "code",
        "data": [
          "Shape s;\ns = new Circle();\ns.draw();\n\ns = new Square();\ns.draw();",
          "Runtime dispatch"
        ]
      },
      {
        "n": 14,
        "section": "Abstract",
        "title": "Abstract classes define incomplete templates",
        "subtitle": "Define abstract class.",
        "layout": "definition",
        "data": [
          "Abstract class",
          "An abstract class can contain abstract methods and cannot be instantiated directly; subclasses complete the missing behavior.",
          [
            "abstract",
            "Template",
            "No direct object",
            "Subclass completes",
            "Common base"
          ]
        ]
      },
      {
        "n": 15,
        "section": "Abstract",
        "title": "Abstract class example",
        "subtitle": "Show syntax.",
        "layout": "code",
        "data": [
          "abstract class Shape {\n    abstract void draw();\n}\nclass Triangle extends Shape {\n    void draw() { System.out.println(\"Triangle\"); }\n}",
          "Abstract class"
        ]
      },
      {
        "n": 16,
        "section": "final",
        "title": "final controls inheritance",
        "subtitle": "Explain final in inheritance.",
        "layout": "cards",
        "data": [
          [
            "final method",
            "Cannot be overridden."
          ],
          [
            "final class",
            "Cannot be extended."
          ],
          [
            "final variable",
            "Constant-like value after initialization."
          ],
          [
            "Design reason",
            "Protect behavior or prevent unsafe extension."
          ]
        ]
      },
      {
        "n": 17,
        "section": "Object Class",
        "title": "Object is the root of class hierarchy",
        "subtitle": "Explain Object class.",
        "layout": "cards",
        "data": [
          [
            "Superclass of all classes",
            "Every class ultimately inherits from Object."
          ],
          [
            "Common methods",
            "toString(), equals(), hashCode(), getClass()."
          ],
          [
            "Polymorphic base",
            "Object references can refer to any object."
          ],
          [
            "Override carefully",
            "equals/hashCode should be consistent."
          ]
        ]
      },
      {
        "n": 18,
        "section": "var and Inheritance",
        "title": "Local variable type inference still has a static type",
        "subtitle": "Explain var with inheritance.",
        "layout": "cards",
        "data": [
          [
            "var",
            "Compiler infers local variable type from initializer."
          ],
          [
            "Static type",
            "Inferred at compile time, not changing later."
          ],
          [
            "Inheritance",
            "Initializer decides whether type is Shape or Circle."
          ],
          [
            "Readability",
            "Use explicit type when abstraction matters."
          ]
        ]
      },
      {
        "n": 19,
        "section": "Packages",
        "title": "Packages organize classes",
        "subtitle": "Define package.",
        "layout": "definition",
        "data": [
          "Package",
          "A package groups related classes and interfaces into a namespace that supports organization, access control and reuse.",
          [
            "Namespace",
            "Directory",
            "Access",
            "Reuse",
            "Import"
          ]
        ]
      },
      {
        "n": 20,
        "section": "Packages",
        "title": "Creating a package",
        "subtitle": "Show package declaration.",
        "layout": "code",
        "data": [
          "package mypack;\n\npublic class Message {\n    public void show() {\n        System.out.println(\"Hello\");\n    }\n}",
          "package"
        ]
      },
      {
        "n": 21,
        "section": "Packages",
        "title": "Packages and member access",
        "subtitle": "Summarize access across packages.",
        "layout": "table",
        "data": [
          [
            "Member",
            "Same class",
            "Same package",
            "Subclass outside",
            "World"
          ],
          [
            [
              "private",
              "Yes",
              "No",
              "No",
              "No"
            ],
            [
              "default",
              "Yes",
              "Yes",
              "No",
              "No"
            ],
            [
              "protected",
              "Yes",
              "Yes",
              "Yes",
              "No"
            ],
            [
              "public",
              "Yes",
              "Yes",
              "Yes",
              "Yes"
            ]
          ]
        ]
      },
      {
        "n": 22,
        "section": "Packages",
        "title": "Importing packages",
        "subtitle": "Show import syntax.",
        "layout": "code",
        "data": [
          "import mypack.Message;\n\nclass Test {\n    public static void main(String[] args) {\n        Message m = new Message();\n        m.show();\n    }\n}",
          "import"
        ]
      },
      {
        "n": 23,
        "section": "Interfaces",
        "title": "Interfaces define capabilities",
        "subtitle": "Define interface.",
        "layout": "definition",
        "data": [
          "Interface",
          "An interface specifies a contract of methods and constants that classes can implement, enabling capability-based design.",
          [
            "Contract",
            "implements",
            "Multiple types",
            "API",
            "Abstraction"
          ]
        ]
      },
      {
        "n": 24,
        "section": "Interfaces",
        "title": "Defining and implementing an interface",
        "subtitle": "Show interface code.",
        "layout": "code",
        "data": [
          "interface Resizable {\n    void resizeWidth(int width);\n    void resizeHeight(int height);\n}\nclass Rectangle implements Resizable {\n    public void resizeWidth(int w) { }\n    public void resizeHeight(int h) { }\n}",
          "interface"
        ]
      },
      {
        "n": 25,
        "section": "Interfaces",
        "title": "Interfaces support polymorphism",
        "subtitle": "Explain interface references.",
        "layout": "flow",
        "data": [
          "Interface variable",
          "Object of implementing class",
          "Call interface method",
          "Runtime object executes",
          "Loose coupling"
        ]
      },
      {
        "n": 26,
        "section": "Interfaces",
        "title": "Default and static interface methods",
        "subtitle": "Explain modern interface methods.",
        "layout": "cards",
        "data": [
          [
            "Default method",
            "Has a body and can be inherited by implementing classes."
          ],
          [
            "Why useful",
            "Add behavior to interfaces without breaking existing implementations."
          ],
          [
            "Static method",
            "Belongs to the interface and is called using interface name."
          ],
          [
            "Rule",
            "Static interface methods are not inherited like instance methods."
          ]
        ]
      },
      {
        "n": 27,
        "section": "Interfaces",
        "title": "Private interface methods",
        "subtitle": "Explain helper methods.",
        "layout": "cards",
        "data": [
          [
            "Private method",
            "Helper method inside interface for default/static method reuse."
          ],
          [
            "Purpose",
            "Avoid duplicate code inside interface methods."
          ],
          [
            "Access",
            "Not visible to implementing classes."
          ],
          [
            "Design",
            "Keeps interface internals tidy."
          ]
        ]
      },
      {
        "n": 28,
        "section": "Compare",
        "title": "Abstract class vs interface",
        "subtitle": "Compare abstraction tools.",
        "layout": "compare",
        "data": [
          "Abstract class",
          [
            "Can hold instance state",
            "Single class inheritance",
            "Good for shared base implementation",
            "Use for is-a family"
          ],
          "Interface",
          [
            "Defines capability contract",
            "Multiple interfaces allowed",
            "Good for plug-in behavior",
            "Use for can-do role"
          ]
        ]
      },
      {
        "n": 29,
        "section": "Lab Link",
        "title": "Module 3 lab connection",
        "subtitle": "Map concepts to practicals.",
        "layout": "cards",
        "data": [
          [
            "Shape polymorphism",
            "Circle, triangle and square override draw/erase."
          ],
          [
            "Resizable",
            "Interface implemented by Rectangle."
          ],
          [
            "mypack",
            "Package creation and import practice."
          ],
          [
            "Common error",
            "Weaker access when overriding interface or superclass method."
          ]
        ]
      },
      {
        "n": 30,
        "section": "Inheritance",
        "title": "When inheritance is appropriate",
        "subtitle": "Prevent overusing inheritance.",
        "layout": "cards",
        "data": [
          [
            "Use inheritance",
            "When subclass truly is a specialized form of superclass."
          ],
          [
            "Avoid inheritance",
            "When classes are merely using each other."
          ],
          [
            "Prefer composition",
            "When one object has another object as a part."
          ],
          [
            "Exam phrase",
            "Inheritance models is-a; composition models has-a."
          ]
        ]
      },
      {
        "n": 31,
        "section": "Inheritance",
        "title": "Superclass reference, subclass object",
        "subtitle": "Explain polymorphic reference assignment.",
        "layout": "code",
        "data": [
          "Shape s = new Circle();\ns.draw();\n\n// Allowed: Circle is a Shape\n// Not allowed without cast:\n// Circle c = new Shape();",
          "Polymorphic reference"
        ]
      },
      {
        "n": 32,
        "section": "super",
        "title": "super constructor call rules",
        "subtitle": "Make constructor chaining precise.",
        "layout": "bullets",
        "data": [
          "super(...) calls a superclass constructor",
          "It must be the first statement in a constructor",
          "If not written, Java inserts super() when possible",
          "Superclass construction happens before subclass construction",
          "Use super.method() to call overridden superclass behavior"
        ]
      },
      {
        "n": 33,
        "section": "Overriding",
        "title": "Overriding rules students must remember",
        "subtitle": "List precise rules.",
        "layout": "bullets",
        "data": [
          "Method name and parameter list must match",
          "Return type must be same or covariant",
          "Access cannot be more restrictive",
          "Static methods are hidden, not overridden",
          "final methods cannot be overridden"
        ]
      },
      {
        "n": 34,
        "section": "Dispatch",
        "title": "Output prediction with dynamic dispatch",
        "subtitle": "Train runtime method selection.",
        "layout": "code",
        "data": [
          "class A { void show(){ System.out.println(\"A\"); } }\nclass B extends A { void show(){ System.out.println(\"B\"); } }\n\nA ref = new B();\nref.show();",
          "Predict output"
        ]
      },
      {
        "n": 35,
        "section": "Abstract",
        "title": "Abstract class as a contract plus shared code",
        "subtitle": "Explain why abstract classes exist.",
        "layout": "cards",
        "data": [
          [
            "Common code",
            "Superclass can provide fields and implemented methods."
          ],
          [
            "Required behavior",
            "Abstract methods force subclasses to complete missing parts."
          ],
          [
            "No direct object",
            "Abstract class cannot be instantiated."
          ],
          [
            "Design use",
            "Good when subclasses share identity and implementation."
          ]
        ]
      },
      {
        "n": 36,
        "section": "Packages",
        "title": "Package naming and folder structure",
        "subtitle": "Make packages concrete.",
        "layout": "flow",
        "data": [
          "package mypack;",
          "Save in mypack folder",
          "Compile with package path",
          "Import in another class",
          "Use public class/methods"
        ]
      },
      {
        "n": 37,
        "section": "Packages",
        "title": "Common package mistakes",
        "subtitle": "Prevent lab issues.",
        "layout": "bullets",
        "data": [
          "Forgetting package statement must be first",
          "Folder name not matching package name",
          "Trying to access non-public class from another package",
          "Forgetting public on methods used outside package",
          "Running from wrong classpath location"
        ]
      },
      {
        "n": 38,
        "section": "Interfaces",
        "title": "Interface reference enables flexible code",
        "subtitle": "Explain capability-based design.",
        "layout": "code",
        "data": [
          "Resizable r = new Rectangle();\nr.resizeWidth(200);\nr.resizeHeight(100);\n\n// Code depends on capability,\n// not the concrete Rectangle type.",
          "Interface reference"
        ]
      },
      {
        "n": 39,
        "section": "Interfaces",
        "title": "Default method conflict idea",
        "subtitle": "Explain multiple inheritance issue simply.",
        "layout": "cards",
        "data": [
          [
            "One default method",
            "Class can inherit it if there is no conflict."
          ],
          [
            "Class wins",
            "A class method overrides an interface default."
          ],
          [
            "Conflict",
            "If two interfaces provide same default, class must resolve it."
          ],
          [
            "Why",
            "Prevents ambiguity in multiple interface inheritance."
          ]
        ]
      },
      {
        "n": 40,
        "section": "Compare",
        "title": "extends vs implements",
        "subtitle": "Clarify syntax and meaning.",
        "layout": "compare",
        "data": [
          "extends",
          [
            "Used for class inheritance",
            "One direct superclass",
            "Inherits implementation",
            "Models is-a"
          ],
          "implements",
          [
            "Used for interfaces",
            "Can implement many interfaces",
            "Promises methods",
            "Models can-do capability"
          ]
        ]
      },
      {
        "n": 41,
        "section": "Lab Link",
        "title": "Worked lab plan: Shape polymorphism",
        "subtitle": "Break polymorphism lab into steps.",
        "layout": "flow",
        "data": [
          "Create Shape superclass",
          "Create Circle/Triangle/Square",
          "Override draw and erase",
          "Use Shape reference",
          "Call methods polymorphically"
        ]
      },
      {
        "n": 42,
        "section": "Summary",
        "title": "Module 3 mind map",
        "subtitle": "Connect all major headings.",
        "layout": "hub",
        "data": [
          "Module 3",
          [
            [
              "Inheritance",
              "extends."
            ],
            [
              "super",
              "Parent access."
            ],
            [
              "Overriding",
              "Runtime behavior."
            ],
            [
              "Abstract/final",
              "Extension rules."
            ],
            [
              "Packages",
              "Organization."
            ],
            [
              "Interfaces",
              "Contracts."
            ]
          ]
        ]
      },
      {
        "n": 43,
        "section": "Summary",
        "title": "Viva and exam focus",
        "subtitle": "Convert content into marks.",
        "layout": "bullets",
        "data": [
          "Differentiate overloading and overriding",
          "Trace constructor order with super",
          "Explain dynamic method dispatch with code",
          "Compare abstract class and interface",
          "Write package/import/interface implementation syntax"
        ]
      },
      {
        "n": 44,
        "section": "Summary",
        "title": "20 important viva questions",
        "subtitle": "Rapid oral revision.",
        "layout": "questions",
        "data": [
          "What is inheritance?",
          "What is extends?",
          "Superclass?",
          "Subclass?",
          "Use of super?",
          "Constructor order?",
          "What is overriding?",
          "Overloading vs overriding?",
          "Dynamic dispatch?",
          "What is abstract class?",
          "Can abstract class be instantiated?",
          "Use of final?",
          "What is Object class?",
          "What is package?",
          "Package declaration location?",
          "What is import?",
          "What is interface?",
          "What is implements?",
          "Default method?",
          "Static interface method?"
        ]
      },
      {
        "n": 45,
        "section": "Summary",
        "title": "One-page revision sheet",
        "subtitle": "End with compact keywords.",
        "layout": "revision",
        "data": [
          "Inheritance; extends; superclass; subclass; protected; super; constructor chaining; multilevel hierarchy; method overriding; @Override; dynamic method dispatch; abstract class; abstract method; final method; final class; Object; toString; equals; package; import; access control; interface; implements; default method; static interface method; private interface method; abstract class vs interface.",
          "For Module 3 answers: draw the hierarchy, write extends/implements syntax, explain runtime dispatch, then compare design choices with examples."
        ]
      }
    ]
  },
  "module4": {
    "slides": [
      {
        "n": 1,
        "section": "Opening",
        "title": "Exceptions and Threads",
        "subtitle": "Module 4 teaches robust error handling and concurrent execution.",
        "layout": "hero",
        "data": {
          "big": "Java\nModule 4",
          "sub": "Exception handling • try/catch • throw/throws/finally • custom exceptions • threads",
          "mark": "TRY\nTHREAD"
        }
      },
      {
        "n": 2,
        "section": "Opening",
        "title": "Module 4 learning path",
        "subtitle": "Use the syllabus as the checklist.",
        "layout": "bullets",
        "data": [
          "Explain exception fundamentals, types and uncaught exceptions",
          "Use try, catch, multiple catch and nested try",
          "Use throw, throws and finally",
          "Use built-in, custom and chained exceptions",
          "Explain Java thread model and main thread",
          "Create one or many threads and use isAlive(), join(), priorities and state"
        ]
      },
      {
        "n": 3,
        "section": "Exceptions",
        "title": "Exceptions separate error handling from normal logic",
        "subtitle": "Define exception handling.",
        "layout": "definition",
        "data": [
          "Exception",
          "An exception is an abnormal condition represented as an object that can be thrown and caught to handle errors safely.",
          [
            "throw",
            "catch",
            "try",
            "Exception object",
            "Recovery"
          ]
        ]
      },
      {
        "n": 4,
        "section": "Exceptions",
        "title": "Exception-handling flow",
        "subtitle": "Show runtime process.",
        "layout": "flow",
        "data": [
          "Code in try",
          "Exception occurs",
          "Object thrown",
          "Matching catch runs",
          "Program continues or exits"
        ]
      },
      {
        "n": 5,
        "section": "Exceptions",
        "title": "Exception types",
        "subtitle": "Classify exception categories.",
        "layout": "hub",
        "data": [
          "Throwable",
          [
            [
              "Error",
              "Serious JVM/system problems."
            ],
            [
              "Exception",
              "Program conditions that can be handled."
            ],
            [
              "RuntimeException",
              "Unchecked programming/runtime issues."
            ],
            [
              "Checked exceptions",
              "Compiler requires handling or declaration."
            ],
            [
              "Built-in",
              "Provided by Java."
            ],
            [
              "Custom",
              "Program-defined."
            ]
          ]
        ]
      },
      {
        "n": 6,
        "section": "Exceptions",
        "title": "Uncaught exceptions terminate the thread",
        "subtitle": "Explain default behavior.",
        "layout": "flow",
        "data": [
          "Exception thrown",
          "No matching catch",
          "Call stack unwinds",
          "Default handler reports",
          "Thread terminates"
        ]
      },
      {
        "n": 7,
        "section": "try-catch",
        "title": "try and catch handle failures",
        "subtitle": "Show basic syntax.",
        "layout": "code",
        "data": [
          "try {\n    int x = a / b;\n    System.out.println(x);\n} catch (ArithmeticException e) {\n    System.out.println(\"Cannot divide by zero\");\n}",
          "try / catch"
        ]
      },
      {
        "n": 8,
        "section": "try-catch",
        "title": "Multiple catch clauses handle specific cases",
        "subtitle": "Explain ordering.",
        "layout": "code",
        "data": [
          "try {\n    int n = Integer.parseInt(s);\n    int x = 100 / n;\n} catch (NumberFormatException e) {\n    System.out.println(\"Bad number\");\n} catch (ArithmeticException e) {\n    System.out.println(\"Zero not allowed\");\n}",
          "Multiple catch"
        ]
      },
      {
        "n": 9,
        "section": "try-catch",
        "title": "Nested try statements localize risk",
        "subtitle": "Explain nested try.",
        "layout": "cards",
        "data": [
          [
            "Outer try",
            "Handles broad operation-level failures."
          ],
          [
            "Inner try",
            "Handles a smaller risky block."
          ],
          [
            "Local recovery",
            "Fix error close to where it occurs."
          ],
          [
            "Readability",
            "Use nesting only when it clarifies responsibility."
          ]
        ]
      },
      {
        "n": 10,
        "section": "throw/throws",
        "title": "throw creates an exception event",
        "subtitle": "Explain throw.",
        "layout": "code",
        "data": [
          "if (b == 0) {\n    throw new ArithmeticException(\"Division by zero\");\n}",
          "throw"
        ]
      },
      {
        "n": 11,
        "section": "throw/throws",
        "title": "throws declares possible exceptions",
        "subtitle": "Explain throws.",
        "layout": "code",
        "data": [
          "static void readFile(String name) throws IOException {\n    // file reading code\n}",
          "throws"
        ]
      },
      {
        "n": 12,
        "section": "finally",
        "title": "finally runs cleanup code",
        "subtitle": "Explain finally.",
        "layout": "code",
        "data": [
          "try {\n    process();\n} catch (Exception e) {\n    System.out.println(e.getMessage());\n} finally {\n    System.out.println(\"cleanup\");\n}",
          "finally"
        ]
      },
      {
        "n": 13,
        "section": "Built-in",
        "title": "Built-in exceptions cover common failures",
        "subtitle": "List common exceptions.",
        "layout": "cards",
        "data": [
          [
            "ArithmeticException",
            "Invalid arithmetic operation such as divide by zero."
          ],
          [
            "ArrayIndexOutOfBoundsException",
            "Array index outside valid range."
          ],
          [
            "NullPointerException",
            "Using a null reference as object."
          ],
          [
            "NumberFormatException",
            "Invalid string-to-number conversion."
          ]
        ]
      },
      {
        "n": 14,
        "section": "Custom",
        "title": "Custom exceptions model application rules",
        "subtitle": "Define custom exception.",
        "layout": "code",
        "data": [
          "class DivisionByZeroException extends Exception {\n    DivisionByZeroException(String msg) {\n        super(msg);\n    }\n}",
          "Custom exception"
        ]
      },
      {
        "n": 15,
        "section": "Chained",
        "title": "Chained exceptions preserve root cause",
        "subtitle": "Explain chained exceptions.",
        "layout": "cards",
        "data": [
          [
            "Cause",
            "One exception can wrap another."
          ],
          [
            "Use",
            "Report high-level failure while preserving low-level cause."
          ],
          [
            "Constructors",
            "Many exception types accept a cause."
          ],
          [
            "Debugging",
            "Stack trace shows the chain."
          ]
        ]
      },
      {
        "n": 16,
        "section": "Threads",
        "title": "A thread is a path of execution",
        "subtitle": "Define thread.",
        "layout": "definition",
        "data": [
          "Thread",
          "A thread is an independent path of execution within a program, allowing multiple activities to run concurrently.",
          [
            "Execution path",
            "Concurrency",
            "main",
            "run",
            "Scheduling"
          ]
        ]
      },
      {
        "n": 17,
        "section": "Threads",
        "title": "Java thread model",
        "subtitle": "Show thread model basics.",
        "layout": "threadDiagram",
        "data": null
      },
      {
        "n": 18,
        "section": "Threads",
        "title": "The main thread",
        "subtitle": "Explain initial thread.",
        "layout": "cards",
        "data": [
          [
            "Created by JVM",
            "main starts inside the main thread."
          ],
          [
            "Can create children",
            "main can launch additional threads."
          ],
          [
            "Can finish early",
            "Program may continue while child threads run."
          ],
          [
            "Control",
            "main can use join to wait."
          ]
        ]
      },
      {
        "n": 19,
        "section": "Threads",
        "title": "Creating a thread with Runnable",
        "subtitle": "Show Runnable pattern.",
        "layout": "code",
        "data": [
          "class MyTask implements Runnable {\n    public void run() {\n        System.out.println(\"child\");\n    }\n}\nThread t = new Thread(new MyTask());\nt.start();",
          "Runnable"
        ]
      },
      {
        "n": 20,
        "section": "Threads",
        "title": "Creating a thread by extending Thread",
        "subtitle": "Show Thread subclass pattern.",
        "layout": "code",
        "data": [
          "class MyThread extends Thread {\n    public void run() {\n        System.out.println(\"running\");\n    }\n}\nnew MyThread().start();",
          "extends Thread"
        ]
      },
      {
        "n": 21,
        "section": "Threads",
        "title": "Creating multiple threads",
        "subtitle": "Explain concurrency and scheduling.",
        "layout": "flow",
        "data": [
          "Create t1",
          "Create t2",
          "start t1",
          "start t2",
          "Scheduler interleaves execution"
        ]
      },
      {
        "n": 22,
        "section": "Threads",
        "title": "isAlive and join coordinate threads",
        "subtitle": "Show coordination methods.",
        "layout": "code",
        "data": [
          "t.start();\nSystem.out.println(t.isAlive());\nt.join();\nSystem.out.println(\"child finished\");",
          "isAlive / join"
        ]
      },
      {
        "n": 23,
        "section": "Threads",
        "title": "Thread priorities influence scheduling",
        "subtitle": "Explain priority.",
        "layout": "cards",
        "data": [
          [
            "Priority value",
            "Threads have priority constants such as MIN_PRIORITY, NORM_PRIORITY and MAX_PRIORITY."
          ],
          [
            "Scheduler hint",
            "Priority can influence scheduling but does not guarantee order."
          ],
          [
            "Portable caution",
            "Behavior can vary by platform and JVM."
          ],
          [
            "Best practice",
            "Do not depend on priority for correctness."
          ]
        ]
      },
      {
        "n": 24,
        "section": "Threads",
        "title": "Thread states describe lifecycle",
        "subtitle": "Explain state names.",
        "layout": "hub",
        "data": [
          "Thread state",
          [
            [
              "NEW",
              "Created, not started."
            ],
            [
              "RUNNABLE",
              "Eligible to run."
            ],
            [
              "BLOCKED",
              "Waiting for monitor lock."
            ],
            [
              "WAITING/TIMED",
              "Waiting for signal or time."
            ],
            [
              "TERMINATED",
              "Finished."
            ],
            [
              "getState()",
              "Obtains current state."
            ]
          ]
        ]
      },
      {
        "n": 25,
        "section": "Lab Link",
        "title": "Module 4 lab connection",
        "subtitle": "Map concepts to practicals.",
        "layout": "cards",
        "data": [
          [
            "Custom exception",
            "Use try, catch, throw and finally for DivisionByZero."
          ],
          [
            "MyThread",
            "Call super constructor and start the child thread."
          ],
          [
            "Concurrent output",
            "Observe main and child thread interleaving."
          ],
          [
            "Common error",
            "Calling run() directly does not start a new thread."
          ]
        ]
      },
      {
        "n": 26,
        "section": "Exceptions",
        "title": "Checked vs unchecked exceptions",
        "subtitle": "Make exception categories clearer.",
        "layout": "compare",
        "data": [
          "Checked",
          [
            "Compiler checks handling",
            "Use catch or throws",
            "Often external failures such as I/O"
          ],
          "Unchecked",
          [
            "RuntimeException family",
            "Often programming mistakes",
            "Compiler does not force handling"
          ]
        ]
      },
      {
        "n": 27,
        "section": "Exceptions",
        "title": "Exception stack unwinding",
        "subtitle": "Explain propagation.",
        "layout": "flow",
        "data": [
          "Exception thrown in method C",
          "C has no catch",
          "Return to method B",
          "Return to method A",
          "Matching catch handles"
        ]
      },
      {
        "n": 28,
        "section": "try-catch",
        "title": "Catch order matters",
        "subtitle": "Prevent unreachable catch errors.",
        "layout": "code",
        "data": [
          "try {\n    risky();\n} catch (ArithmeticException e) {\n    System.out.println(\"specific\");\n} catch (Exception e) {\n    System.out.println(\"general\");\n}",
          "Catch order"
        ]
      },
      {
        "n": 29,
        "section": "finally",
        "title": "finally is for cleanup, not normal logic",
        "subtitle": "Clarify proper use.",
        "layout": "cards",
        "data": [
          [
            "Good use",
            "Close files, release resources, print final status."
          ],
          [
            "Runs after try/catch",
            "Usually executes whether exception happens or not."
          ],
          [
            "Not for decisions",
            "Do not hide main program logic inside finally."
          ],
          [
            "Modern note",
            "try-with-resources exists, but this module focuses on finally."
          ]
        ]
      },
      {
        "n": 30,
        "section": "Custom",
        "title": "Worked lab plan: DivisionByZero exception",
        "subtitle": "Break custom exception lab into steps.",
        "layout": "flow",
        "data": [
          "Create exception class",
          "Read numerator/denominator",
          "If denominator is zero, throw",
          "catch and display message",
          "finally prints completion"
        ]
      },
      {
        "n": 31,
        "section": "Threads",
        "title": "start() and run() are not the same",
        "subtitle": "Clarify crucial thread mistake.",
        "layout": "compare",
        "data": [
          "Calling run()",
          [
            "Normal method call",
            "Runs on current thread",
            "No new thread created"
          ],
          "Calling start()",
          [
            "Creates new thread of execution",
            "JVM calls run internally",
            "Main and child can run concurrently"
          ]
        ]
      },
      {
        "n": 32,
        "section": "Threads",
        "title": "Runnable vs extending Thread",
        "subtitle": "Compare creation approaches.",
        "layout": "compare",
        "data": [
          "Runnable",
          [
            "Separates task from thread",
            "Class can still extend another class",
            "Preferred for many designs"
          ],
          "extends Thread",
          [
            "Simple for small demos",
            "Task is tied to Thread subclass",
            "Cannot extend another class"
          ]
        ]
      },
      {
        "n": 33,
        "section": "Threads",
        "title": "Output order in threads is not guaranteed",
        "subtitle": "Explain scheduler behavior.",
        "layout": "code",
        "data": [
          "t1.start();\nt2.start();\nSystem.out.println(\"main\");\n\n// Possible outputs can vary because\n// the scheduler decides execution order.",
          "Thread scheduling"
        ]
      },
      {
        "n": 34,
        "section": "Threads",
        "title": "join creates a predictable checkpoint",
        "subtitle": "Explain coordination.",
        "layout": "flow",
        "data": [
          "Start child thread",
          "Main continues",
          "Main calls join",
          "Main waits",
          "Child finishes then main resumes"
        ]
      },
      {
        "n": 35,
        "section": "Threads",
        "title": "Thread state reading guide",
        "subtitle": "Explain getState output.",
        "layout": "cards",
        "data": [
          [
            "NEW",
            "Thread object exists but start not called."
          ],
          [
            "RUNNABLE",
            "Ready or running according to scheduler."
          ],
          [
            "WAITING/TIMED_WAITING",
            "Waiting for another thread or timeout."
          ],
          [
            "TERMINATED",
            "run method has completed."
          ]
        ]
      },
      {
        "n": 36,
        "section": "Threads",
        "title": "Thread common mistakes",
        "subtitle": "Prevent beginner bugs.",
        "layout": "bullets",
        "data": [
          "Calling run instead of start",
          "Calling start twice on same Thread object",
          "Assuming fixed output order without join",
          "Depending on priority for correctness",
          "Ignoring exceptions inside child threads"
        ]
      },
      {
        "n": 37,
        "section": "Lab Link",
        "title": "Worked lab plan: MyThread",
        "subtitle": "Break thread lab into steps.",
        "layout": "flow",
        "data": [
          "Create MyThread class",
          "Call super in constructor",
          "Override run",
          "Create object",
          "Call start and observe concurrency"
        ]
      },
      {
        "n": 38,
        "section": "Summary",
        "title": "Module 4 mind map",
        "subtitle": "Connect all major headings.",
        "layout": "hub",
        "data": [
          "Module 4",
          [
            [
              "Exceptions",
              "Thrown objects."
            ],
            [
              "try/catch",
              "Handle failures."
            ],
            [
              "throw/throws",
              "Raise/declare."
            ],
            [
              "finally",
              "Cleanup."
            ],
            [
              "Threads",
              "Concurrency."
            ],
            [
              "join/state",
              "Coordination."
            ]
          ]
        ]
      },
      {
        "n": 39,
        "section": "Summary",
        "title": "Viva and exam focus",
        "subtitle": "Convert content into marks.",
        "layout": "bullets",
        "data": [
          "Draw exception flow from try to catch",
          "Differentiate throw and throws",
          "Write custom exception syntax",
          "Compare Runnable and Thread approaches",
          "Explain start, run, isAlive, join, priority and thread states"
        ]
      },
      {
        "n": 40,
        "section": "Summary",
        "title": "20 important viva questions",
        "subtitle": "Rapid oral revision.",
        "layout": "questions",
        "data": [
          "What is exception?",
          "What is try?",
          "What is catch?",
          "Checked vs unchecked?",
          "What is uncaught exception?",
          "Multiple catch?",
          "Nested try?",
          "throw vs throws?",
          "Use of finally?",
          "Built-in exceptions?",
          "Custom exception?",
          "Chained exception?",
          "What is thread?",
          "What is main thread?",
          "Runnable?",
          "Extending Thread?",
          "start vs run?",
          "What is join?",
          "What is isAlive?",
          "Thread states?"
        ]
      },
      {
        "n": 41,
        "section": "Summary",
        "title": "One-page revision sheet",
        "subtitle": "End with compact keywords.",
        "layout": "revision",
        "data": [
          "Exception; Throwable; Error; Exception; RuntimeException; checked; unchecked; uncaught; try; catch; multiple catch; nested try; throw; throws; finally; built-in exception; custom exception; chained exception; Thread; Runnable; main thread; start; run; multiple threads; scheduler; isAlive; join; priority; getState; NEW; RUNNABLE; BLOCKED; WAITING; TIMED_WAITING; TERMINATED.",
          "For Module 4 answers: write the syntax, trace the runtime flow, state the common mistake, and connect exception handling or threads to the lab task."
        ]
      }
    ]
  },
  "module5": {
    "slides": [
      {
        "n": 1,
        "section": "Opening",
        "title": "Enums, Wrappers, Autoboxing and Generics",
        "subtitle": "Module 5 teaches type-safe constants, object wrappers and generic programming.",
        "layout": "hero",
        "data": {
          "big": "Java\nModule 5",
          "sub": "Enumerations • values/valueOf • wrappers • autoboxing • generic classes",
          "mark": "ENUM\n<T>"
        }
      },
      {
        "n": 2,
        "section": "Opening",
        "title": "Module 5 learning path",
        "subtitle": "Use the syllabus as the checklist.",
        "layout": "bullets",
        "data": [
          "Explain enumeration fundamentals and enum constants",
          "Use values() and valueOf() methods",
          "Explain Character, Boolean and numeric type wrappers",
          "Explain autoboxing and unboxing in methods, expressions and boolean/char values",
          "Write a simple generics example",
          "Create generic classes with one or two type parameters and the general class form"
        ]
      },
      {
        "n": 3,
        "section": "Enums",
        "title": "Enums define named constant sets",
        "subtitle": "Define enumeration.",
        "layout": "definition",
        "data": [
          "enum",
          "An enum is a type-safe set of named constants used when a variable should hold one value from a fixed list.",
          [
            "Type-safe",
            "Named constants",
            "Fixed set",
            "switch",
            "Readable"
          ]
        ]
      },
      {
        "n": 4,
        "section": "Enums",
        "title": "Enumeration fundamentals",
        "subtitle": "Show enum syntax.",
        "layout": "code",
        "data": [
          "enum Department {\n    CSE, ISE, ECE, MECH\n}\n\nDepartment d = Department.CSE;",
          "enum"
        ]
      },
      {
        "n": 5,
        "section": "Enums",
        "title": "Enums improve code clarity",
        "subtitle": "Compare strings and enum constants.",
        "layout": "compare",
        "data": [
          "String constants",
          [
            "Can be misspelled",
            "No compiler checking for allowed set",
            "Comparisons can be fragile"
          ],
          "Enum constants",
          [
            "Compiler checks allowed values",
            "Readable names",
            "Works with switch",
            "Can have methods and fields"
          ]
        ]
      },
      {
        "n": 6,
        "section": "Enums",
        "title": "values() lists all constants",
        "subtitle": "Explain values method.",
        "layout": "code",
        "data": [
          "for (Department d : Department.values()) {\n    System.out.println(d);\n}",
          "values()"
        ]
      },
      {
        "n": 7,
        "section": "Enums",
        "title": "valueOf() converts a name to enum",
        "subtitle": "Explain valueOf.",
        "layout": "code",
        "data": [
          "String input = \"CSE\";\nDepartment d = Department.valueOf(input);\nSystem.out.println(d);",
          "valueOf()"
        ]
      },
      {
        "n": 8,
        "section": "Enums",
        "title": "Enums can be used in switch",
        "subtitle": "Show enum switch.",
        "layout": "code",
        "data": [
          "switch (d) {\ncase CSE -> System.out.println(\"Computer Science\");\ncase ISE -> System.out.println(\"Information Science\");\ndefault -> System.out.println(\"Other branch\");\n}",
          "enum switch"
        ]
      },
      {
        "n": 9,
        "section": "Wrappers",
        "title": "Wrapper classes turn primitives into objects",
        "subtitle": "Define wrappers.",
        "layout": "definition",
        "data": [
          "Wrapper class",
          "A wrapper class provides an object representation of a primitive value so it can be used where objects are required.",
          [
            "Primitive",
            "Object",
            "Box",
            "Unbox",
            "Collections"
          ]
        ]
      },
      {
        "n": 10,
        "section": "Wrappers",
        "title": "Wrapper class families",
        "subtitle": "Classify wrappers.",
        "layout": "cards",
        "data": [
          [
            "Character",
            "Wraps char values and offers character utilities."
          ],
          [
            "Boolean",
            "Wraps boolean values."
          ],
          [
            "Numeric wrappers",
            "Byte, Short, Integer, Long, Float and Double."
          ],
          [
            "Utility methods",
            "Parsing, conversion and constants such as MAX_VALUE."
          ]
        ]
      },
      {
        "n": 11,
        "section": "Wrappers",
        "title": "Numeric wrapper example",
        "subtitle": "Show wrapper use.",
        "layout": "code",
        "data": [
          "String s = \"85\";\nInteger marks = Integer.valueOf(s);\nint total = marks + 10;\nSystem.out.println(total);",
          "Wrapper"
        ]
      },
      {
        "n": 12,
        "section": "Autoboxing",
        "title": "Autoboxing reduces wrapper boilerplate",
        "subtitle": "Define autoboxing.",
        "layout": "definition",
        "data": [
          "Autoboxing",
          "Autoboxing is Java's automatic conversion from a primitive value to its corresponding wrapper object; unboxing converts back.",
          [
            "Primitive",
            "Wrapper",
            "Boxing",
            "Unboxing",
            "Automatic"
          ]
        ]
      },
      {
        "n": 13,
        "section": "Autoboxing",
        "title": "Autoboxing with methods",
        "subtitle": "Show method parameter conversion.",
        "layout": "code",
        "data": [
          "static void show(Integer x) {\n    System.out.println(x);\n}\n\nshow(100);   // int autoboxed to Integer",
          "Autoboxing"
        ]
      },
      {
        "n": 14,
        "section": "Autoboxing",
        "title": "Unboxing in expressions",
        "subtitle": "Show expression conversion.",
        "layout": "code",
        "data": [
          "Integer a = 10;\nInteger b = 20;\nint sum = a + b;  // a and b unboxed\nSystem.out.println(sum);",
          "Unboxing"
        ]
      },
      {
        "n": 15,
        "section": "Autoboxing",
        "title": "Boolean and Character autobox too",
        "subtitle": "Show nonnumeric autoboxing.",
        "layout": "code",
        "data": [
          "Boolean flag = true;\nif (flag) System.out.println(\"yes\");\n\nCharacter ch = 'J';\nSystem.out.println(ch);",
          "Boolean / Character"
        ]
      },
      {
        "n": 16,
        "section": "Autoboxing",
        "title": "Autoboxing common mistakes",
        "subtitle": "Prevent misconceptions.",
        "layout": "bullets",
        "data": [
          "Autoboxing does not remove the difference between primitive and object",
          "A wrapper reference can be null; unboxing null causes NullPointerException",
          "Use == carefully with wrapper objects",
          "Prefer primitives for simple numeric loops when object behavior is not needed",
          "Use wrappers when APIs require objects or null is meaningful"
        ]
      },
      {
        "n": 17,
        "section": "Generics",
        "title": "Generics add type parameters",
        "subtitle": "Define generics.",
        "layout": "definition",
        "data": [
          "Generics",
          "Generics let classes and methods operate on a type parameter, giving compile-time type safety without rewriting code for each type.",
          [
            "Type parameter",
            "Type safety",
            "Reusable",
            "Compile-time",
            "Reference types"
          ]
        ]
      },
      {
        "n": 18,
        "section": "Generics",
        "title": "Why generics improve type safety",
        "subtitle": "Compare before and after generics.",
        "layout": "compare",
        "data": [
          "Without generics",
          [
            "Uses Object references",
            "Requires casts",
            "Runtime ClassCastException risk",
            "Less clear intent"
          ],
          "With generics",
          [
            "Compiler checks type",
            "No manual casts in normal use",
            "Reusable with many types",
            "Clearer API"
          ]
        ]
      },
      {
        "n": 19,
        "section": "Generics",
        "title": "A simple generic class",
        "subtitle": "Show one type parameter.",
        "layout": "code",
        "data": [
          "class Box<T> {\n    private T value;\n    Box(T value) { this.value = value; }\n    T get() { return value; }\n}\n\nBox<Integer> b = new Box<>(10);",
          "Generic class"
        ]
      },
      {
        "n": 20,
        "section": "Generics",
        "title": "Generic class with two type parameters",
        "subtitle": "Show two parameters.",
        "layout": "code",
        "data": [
          "class Pair<K, V> {\n    K key;\n    V value;\n    Pair(K k, V v) {\n        key = k; value = v;\n    }\n}",
          "Two type parameters"
        ]
      },
      {
        "n": 21,
        "section": "Generics",
        "title": "General form of a generic class",
        "subtitle": "Explain syntax pattern.",
        "layout": "definition",
        "data": [
          "Generic form",
          "A generic class declares one or more type parameters after the class name and uses them as placeholder types inside the class.",
          [
            "class Name<T>",
            "Type parameter",
            "Reference type",
            "Reusable",
            "Type-safe"
          ]
        ]
      },
      {
        "n": 22,
        "section": "Generics",
        "title": "Generics work with reference types",
        "subtitle": "Clarify primitive limitation.",
        "layout": "cards",
        "data": [
          [
            "Allowed",
            "Box<Integer>, Box<String>, Pair<String, Double>."
          ],
          [
            "Not allowed",
            "Box<int> because type arguments must be reference types."
          ],
          [
            "Wrappers help",
            "Use Integer, Double, Character and Boolean."
          ],
          [
            "Autoboxing helps",
            "Primitive values can be boxed into wrapper objects."
          ]
        ]
      },
      {
        "n": 23,
        "section": "Generics",
        "title": "Raw types should be avoided",
        "subtitle": "Explain legacy compatibility.",
        "layout": "cards",
        "data": [
          [
            "Raw type",
            "Generic class used without type argument."
          ],
          [
            "Why exists",
            "Compatibility with older Java code."
          ],
          [
            "Risk",
            "Compiler loses type checking."
          ],
          [
            "Best practice",
            "Use parameterized types such as Box<String>."
          ]
        ]
      },
      {
        "n": 24,
        "section": "Generics",
        "title": "Type inference with diamond",
        "subtitle": "Explain <>.",
        "layout": "code",
        "data": [
          "Box<String> nameBox = new Box<>(\"Java\");\nPair<String, Integer> p = new Pair<>(\"CSE\", 60);",
          "Diamond operator"
        ]
      },
      {
        "n": 25,
        "section": "Lab Link",
        "title": "Module 5 lab connection",
        "subtitle": "Map concepts to practicals.",
        "layout": "cards",
        "data": [
          [
            "Department enum",
            "Use valueOf() to convert input to enum constant."
          ],
          [
            "Marks as strings",
            "Convert with wrappers and calculate total/average."
          ],
          [
            "Autoboxing",
            "Wrapper objects can participate in expressions."
          ],
          [
            "Generics",
            "Create reusable Box, Pair or stack-style containers."
          ]
        ]
      },
      {
        "n": 26,
        "section": "Enums",
        "title": "When to use enum instead of int or String",
        "subtitle": "Give practical enum design rule.",
        "layout": "cards",
        "data": [
          [
            "Use enum",
            "When values come from a known fixed set."
          ],
          [
            "Avoid raw int",
            "Numbers do not explain their meaning."
          ],
          [
            "Avoid free String",
            "Spelling and capitalization mistakes become runtime bugs."
          ],
          [
            "Benefit",
            "Compiler protects allowed values."
          ]
        ]
      },
      {
        "n": 27,
        "section": "Enums",
        "title": "valueOf input handling",
        "subtitle": "Prevent valueOf runtime mistakes.",
        "layout": "code",
        "data": [
          "String input = \"cse\";\nDepartment d = Department.valueOf(input.toUpperCase());\nSystem.out.println(d);\n\n// Without normalization, \"cse\" fails.",
          "Safe valueOf"
        ]
      },
      {
        "n": 28,
        "section": "Enums",
        "title": "Enum constants can have behavior",
        "subtitle": "Explain enums as richer than constants.",
        "layout": "cards",
        "data": [
          [
            "Enum type",
            "An enum is a class-like type."
          ],
          [
            "Methods",
            "Enums can define methods."
          ],
          [
            "Fields/constructors",
            "Enum constants can carry extra data."
          ],
          [
            "Simple module focus",
            "Syllabus requires fundamentals, values and valueOf."
          ]
        ]
      },
      {
        "n": 29,
        "section": "Wrappers",
        "title": "Why wrappers are needed",
        "subtitle": "Make wrapper motivation clear.",
        "layout": "flow",
        "data": [
          "Primitive value",
          "Need object context",
          "Use wrapper",
          "Autoboxing reduces code",
          "Generic/collection APIs work"
        ]
      },
      {
        "n": 30,
        "section": "Wrappers",
        "title": "Parsing strings with wrappers",
        "subtitle": "Show lab-relevant conversion.",
        "layout": "code",
        "data": [
          "String m1 = \"85\";\nString m2 = \"90\";\nInteger a = Integer.valueOf(m1);\nInteger b = Integer.valueOf(m2);\nint total = a + b;",
          "String to wrapper"
        ]
      },
      {
        "n": 31,
        "section": "Autoboxing",
        "title": "Autoboxing behind the scenes",
        "subtitle": "Reveal compiler-inserted conversion.",
        "layout": "compare",
        "data": [
          "What you write",
          [
            "Integer x = 10;",
            "int y = x + 5;",
            "Looks automatic"
          ],
          "What it means",
          [
            "Integer.valueOf(10)",
            "x.intValue() + 5",
            "Compiler inserts conversions"
          ]
        ]
      },
      {
        "n": 32,
        "section": "Autoboxing",
        "title": "Wrapper comparison warning",
        "subtitle": "Clarify == vs equals.",
        "layout": "code",
        "data": [
          "Integer a = 200;\nInteger b = 200;\n\nSystem.out.println(a == b);      // compares references\nSystem.out.println(a.equals(b)); // compares values",
          "Wrapper comparison"
        ]
      },
      {
        "n": 33,
        "section": "Generics",
        "title": "Generic type parameter naming",
        "subtitle": "Explain common names.",
        "layout": "cards",
        "data": [
          [
            "T",
            "Type."
          ],
          [
            "E",
            "Element, common in collections."
          ],
          [
            "K",
            "Key."
          ],
          [
            "V",
            "Value."
          ],
          [
            "Meaning",
            "Names are conventions; the compiler checks the actual type argument."
          ]
        ]
      },
      {
        "n": 34,
        "section": "Generics",
        "title": "Compile-time type safety example",
        "subtitle": "Show wrong type rejected.",
        "layout": "code",
        "data": [
          "Box<Integer> box = new Box<>(10);\n// box = new Box<String>(\"Java\"); // wrong type\n// box.set(\"Java\");              // compiler rejects\n\nInteger n = box.get();",
          "Type safety"
        ]
      },
      {
        "n": 35,
        "section": "Generics",
        "title": "Two-parameter generic use case",
        "subtitle": "Make Pair practical.",
        "layout": "code",
        "data": [
          "Pair<String, Integer> record =\n    new Pair<>(\"CSE\", 60);\n\n// K is String, V is Integer\n// Useful for key-value style data.",
          "Pair<K,V>"
        ]
      },
      {
        "n": 36,
        "section": "Generics",
        "title": "Common generic mistakes",
        "subtitle": "Prevent syntax and concept errors.",
        "layout": "bullets",
        "data": [
          "Using primitive type argument such as Box<int>",
          "Forgetting the type argument and creating raw types",
          "Assuming generics change runtime primitive behavior",
          "Using unclear type parameter names in larger code",
          "Ignoring compiler warnings about unchecked operations"
        ]
      },
      {
        "n": 37,
        "section": "Lab Link",
        "title": "Worked lab plan: marks with wrappers",
        "subtitle": "Break wrapper lab into steps.",
        "layout": "flow",
        "data": [
          "Read marks as strings",
          "Convert to Integer wrappers",
          "Unbox in total expression",
          "Compute average",
          "Display result"
        ]
      },
      {
        "n": 38,
        "section": "Summary",
        "title": "Module 5 mind map",
        "subtitle": "Connect all major headings.",
        "layout": "hub",
        "data": [
          "Module 5",
          [
            [
              "Enums",
              "Named constants."
            ],
            [
              "values",
              "List constants."
            ],
            [
              "valueOf",
              "Convert name."
            ],
            [
              "Wrappers",
              "Primitive as object."
            ],
            [
              "Autoboxing",
              "Automatic conversion."
            ],
            [
              "Generics",
              "Type-safe reuse."
            ]
          ]
        ]
      },
      {
        "n": 39,
        "section": "Summary",
        "title": "Viva and exam focus",
        "subtitle": "Convert content into marks.",
        "layout": "bullets",
        "data": [
          "Write enum syntax and use values/valueOf",
          "Explain wrapper classes and why they exist",
          "Trace autoboxing/unboxing in methods and expressions",
          "Write a generic class with T",
          "Explain two type parameters and why primitives need wrappers"
        ]
      },
      {
        "n": 40,
        "section": "Summary",
        "title": "20 important viva questions",
        "subtitle": "Rapid oral revision.",
        "layout": "questions",
        "data": [
          "What is enum?",
          "Why enum?",
          "What is values()?",
          "What is valueOf()?",
          "Enum in switch?",
          "What is wrapper class?",
          "Character wrapper?",
          "Boolean wrapper?",
          "Numeric wrappers?",
          "What is parseInt?",
          "What is autoboxing?",
          "What is unboxing?",
          "Autoboxing in method?",
          "Autoboxing in expression?",
          "Wrapper null risk?",
          "What is generics?",
          "What is type parameter?",
          "What is Box<T>?",
          "Two type parameters?",
          "Can generics use int?"
        ]
      },
      {
        "n": 41,
        "section": "Summary",
        "title": "One-page revision sheet",
        "subtitle": "End with compact keywords.",
        "layout": "revision",
        "data": [
          "enum; enum constant; Department; values(); valueOf(); switch; type-safe constant; wrapper; Character; Boolean; Byte; Short; Integer; Long; Float; Double; valueOf; parseInt; autoboxing; unboxing; NullPointerException; generics; type parameter; T; K; V; Box<T>; Pair<K,V>; generic class; reference type; wrapper with generics; raw type; diamond operator.",
          "For Module 5 answers: define the type feature, write a compact code example, explain compiler type safety, then mention one common runtime or syntax mistake."
        ]
      }
    ]
  }
}

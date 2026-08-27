/** Computer Graphics and Visualization (BCS504) curriculum — from finalized 5th_Semester_PPTX */
export const COURSE = { id: 'computer-graphics-visualization', title: "Computer Graphics and Visualization", code: 'BCS504', shortTitle: 'CGV' }
export const MODULES = [
  {
    "n": 1,
    "id": "module-1",
    "title": "Graphics Systems and Models",
    "hours": 8,
    "question": "How does a synthetic camera turn a model into an image?",
    "story": [
      "Camera",
      "Pipeline",
      "Architecture",
      "Performance"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Applications of computer graphics",
      "Graphics system",
      "Physical and synthetic images",
      "Imaging systems",
      "Synthetic-camera model",
      "Programmer's interface",
      "Graphics architectures",
      "Programmable pipelines",
      "Performance characteristics"
    ],
    "notes": "Aligned to BCS504 Module_1 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Module opener (not rendered — the cinematic opener slide covers module motivation).",
        "takeaway": "Module opener (not rendered — the cinematic opener slide covers module motivation).",
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
        "topic": "Applications of computer graphics",
        "terms": [
          "Applications",
          "computer",
          "graphics"
        ],
        "definition": "Computer graphics is the creation, storage and manipulation of pictures by computer. Angel groups its uses into four areas: display of information, design (CAD), simulation & animation, and user interfaces.",
        "takeaway": "Name the four application areas — information display, design, simulation/animation, and UIs — with one example each.",
        "visual": "applications-of-computer-graphics",
        "algo": [
          "Display of information: maps, plots, medical/scientific visualization",
          "Design: CAD/CAM, VLSI and architecture where the picture IS the specification",
          "Simulation & animation: flight simulators, games, special effects",
          "User interfaces: windows, icons and menus (a graphics application itself)"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Info display · design · simulation/animation · UIs"
        },
        "dryRun": {
          "input": "A CAD workstation for aircraft design",
          "steps": [
            "Engineer edits a 3-D model on screen",
            "Graphics system re-renders the view each frame",
            "Simulation animates airflow over the surface",
            "Same model drives the manufacturing spec"
          ],
          "result": "One picture serves design, simulation and documentation"
        },
        "code": null,
        "mistake": "Thinking graphics is only games — half the field is information display and CAD."
      },
      {
        "topic": "Graphics system",
        "terms": [
          "Graphics",
          "system"
        ],
        "definition": "A graphics system has six elements: a processor, memory, a frame buffer, output devices (raster display), input devices, and the GPU/pipeline that connects them. The frame buffer holds one intensity value per pixel.",
        "takeaway": "The frame buffer stores the image as an array of pixels; depth (bits/pixel) sets the colour resolution.",
        "visual": "graphics-system",
        "algo": [
          "CPU/GPU generate primitives and colours",
          "Rasterizer writes pixel values into the frame buffer",
          "Frame buffer depth = bits per pixel (e.g. 24-bit true colour)",
          "Video controller scans the buffer to refresh the raster display"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Pixel array; depth = bits/pixel = colour precision"
        },
        "dryRun": {
          "input": "A 1024×768, 24-bit frame buffer",
          "steps": [
            "Each pixel = 3 bytes (R,G,B)",
            "Buffer size = 1024×768×3 bytes",
            "Video controller reads it 60×/second",
            "Screen shows the stored image"
          ],
          "result": "Image = a pixel array in the frame buffer, refreshed continuously"
        },
        "code": null,
        "mistake": "Confusing resolution (pixel count) with depth (bits per pixel / colour precision)."
      },
      {
        "topic": "Physical and synthetic images",
        "terms": [
          "Physical",
          "synthetic",
          "images"
        ],
        "definition": "A physical image is formed by real light and optics (a camera/eye); a synthetic image is computed by simulating that imaging process. Graphics builds synthetic images using models of objects, a viewer and light.",
        "takeaway": "Synthetic imaging mimics the physical camera: objects + light + viewer produce an image on a projection plane.",
        "visual": "physical-and-synthetic-images",
        "algo": [
          "Physical: real objects reflect light into a lens onto film/retina",
          "Synthetic: replace each with a mathematical model",
          "Model objects, light sources and an imaging device (camera)",
          "Compute which light reaches the image plane"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Synthetic image simulates physical light transport"
        },
        "dryRun": {
          "input": "Render a lit sphere",
          "steps": [
            "Define the sphere geometry",
            "Place a light source",
            "Place a synthetic camera",
            "Compute reflected light on the image plane"
          ],
          "result": "A computed image indistinguishable in principle from a photograph"
        },
        "code": null,
        "mistake": "Treating the synthetic image as arbitrary drawing rather than a simulation of real optics."
      },
      {
        "topic": "Imaging systems",
        "terms": [
          "Imaging",
          "systems"
        ],
        "definition": "Imaging systems (the human eye and the camera) share a structure: light from objects passes through an aperture/lens and forms an image on a sensor (retina/film). This structure motivates the synthetic-camera model.",
        "takeaway": "Eye and camera both project 3-D light onto a 2-D sensor through a lens — the basis of the pinhole/synthetic camera.",
        "visual": "imaging-systems",
        "algo": [
          "Objects emit or reflect light",
          "Light passes through a lens/aperture",
          "A projection forms on the image plane",
          "The pinhole model idealizes this as straight rays through a centre of projection"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "3-D → 2-D projection through a centre of projection"
        },
        "dryRun": {
          "input": "A pinhole camera viewing a point",
          "steps": [
            "Ray from the point through the pinhole",
            "Ray continues to the film plane behind",
            "Image point = intersection with the plane",
            "Similar triangles give the projected coordinates"
          ],
          "result": "3-D point → 2-D projected point via the centre of projection"
        },
        "code": null,
        "mistake": "Forgetting that projection loses depth — many 3-D points map to one image point."
      },
      {
        "topic": "Synthetic-camera model",
        "terms": [
          "Synthetic-camera",
          "model"
        ],
        "definition": "Angel's synthetic-camera model specifies an image from four independent parts: objects, a viewer (camera position/orientation), light sources, and material properties. Objects and camera are defined separately — the API sets each independently.",
        "takeaway": "Separate the specification of objects and the camera; the projection plane sits in front of the centre of projection (COP).",
        "visual": "synthetic-camera-model",
        "algo": [
          "Specify objects independently of the viewer",
          "Specify the camera: position, orientation and lens (projection)",
          "Place the projection (image) plane and clip with the view volume",
          "Project objects through the COP onto the image plane"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Independent specification; project through COP onto image plane"
        },
        "dryRun": {
          "input": "A cube and a camera",
          "steps": [
            "Define the cube once in world coordinates",
            "Position the camera looking at it",
            "Set the view volume (what is visible)",
            "Project cube vertices onto the image plane"
          ],
          "result": "Image of the cube as seen from that camera — change camera, not the cube"
        },
        "code": null,
        "mistake": "Moving/redefining objects to change the view instead of moving the camera."
      },
      {
        "topic": "Programmer's interface",
        "terms": [
          "Programmer",
          "interface"
        ],
        "definition": "The programmer's interface (API) is the set of functions an application uses to specify primitives, attributes, the camera, lights and transformations. OpenGL is such an API; the programmer describes WHAT to draw, the system decides HOW.",
        "takeaway": "A good graphics API exposes primitives, attributes, viewing, transformations and input — the model-view-projection workflow.",
        "visual": "programmer-s-interface",
        "algo": [
          "Application calls API functions (draw primitives, set state)",
          "API forwards work to the graphics pipeline",
          "Pipeline transforms, clips and rasterizes",
          "Programmer never touches individual pixels directly"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Specify primitives/attributes/camera; pipeline does the rest"
        },
        "dryRun": {
          "input": "Draw a red triangle in OpenGL",
          "steps": [
            "Set colour attribute (red)",
            "Specify three vertices as a triangle primitive",
            "Set the camera/projection",
            "Pipeline rasterizes it to pixels"
          ],
          "result": "Declarative call → rendered triangle, pixels handled by the system"
        },
        "code": null,
        "mistake": "Trying to plot pixels directly instead of specifying primitives and letting the pipeline rasterize."
      },
      {
        "topic": "Graphics architectures",
        "terms": [
          "Graphics",
          "architectures"
        ],
        "definition": "Graphics architectures evolved from the display processor to the pipeline architecture: geometry flows through fixed stages (transform → clip → project → rasterize). Special-purpose hardware (the GPU) runs these stages in parallel for speed.",
        "takeaway": "Modern graphics uses a pipeline architecture — parallel, staged processing of vertices then fragments.",
        "visual": "graphics-architectures",
        "algo": [
          "Early: host CPU drove a simple display processor",
          "Pipeline: dedicated stages process a stream of primitives",
          "Each stage works while the next primitive enters (throughput)",
          "GPU runs many such pipelines in parallel"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Staged, parallel geometry→pixel processing (GPU)"
        },
        "dryRun": {
          "input": "A stream of 1000 triangles",
          "steps": [
            "Vertices enter the transform stage",
            "While one triangle clips, the next transforms",
            "Rasterizer fills fragments in parallel",
            "Frame buffer accumulates the result"
          ],
          "result": "High throughput via pipelining and parallel hardware"
        },
        "code": null,
        "mistake": "Judging a pipeline by one primitive's latency instead of overall throughput."
      },
      {
        "topic": "Programmable pipelines",
        "terms": [
          "Programmable",
          "pipelines"
        ],
        "definition": "The programmable pipeline replaces fixed-function stages with shaders: the vertex shader processes each vertex (transform, lighting inputs) and the fragment shader computes each fragment's colour. This gives per-vertex and per-fragment control.",
        "takeaway": "Vertex shader per vertex, fragment shader per fragment — the two programmable stages that replaced fixed function.",
        "visual": "programmable-pipelines",
        "algo": [
          "Vertices enter → vertex shader transforms each to clip space",
          "Primitive assembly + clipping + rasterization produce fragments",
          "Fragment shader computes each fragment's colour/lighting",
          "Per-fragment tests write survivors to the frame buffer"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Two programmable shader stages replace fixed function"
        },
        "dryRun": {
          "input": "A lit triangle with a texture",
          "steps": [
            "Vertex shader outputs clip-space positions + varyings",
            "Rasterizer interpolates varyings across the triangle",
            "Fragment shader samples the texture and applies lighting",
            "Depth test writes visible fragments"
          ],
          "result": "Custom vertex+fragment programs produce the final shaded pixels"
        },
        "code": null,
        "mistake": "Confusing the vertex shader (runs per vertex) with the fragment shader (runs per pixel-fragment)."
      },
      {
        "topic": "Performance characteristics",
        "terms": [
          "Performance",
          "characteristics"
        ],
        "definition": "Graphics performance is described by throughput and latency: geometry rate (vertices/primitives per second) and fill rate (fragments/pixels per second). The pipeline overlaps stages so throughput ≈ the slowest stage's rate.",
        "takeaway": "Throughput is bounded by the slowest (bottleneck) stage; geometry-bound vs fill-bound tells you what to optimize.",
        "visual": "performance-characteristics",
        "algo": [
          "Measure geometry rate (transform stage)",
          "Measure fill rate (rasterizer/fragment stage)",
          "The slower stage is the bottleneck",
          "Balance the load to raise overall throughput"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Throughput = slowest stage; geometry- vs fill-bound"
        },
        "dryRun": {
          "input": "A scene running at 30 fps",
          "steps": [
            "Profile: fragment stage is saturated",
            "Scene is fill-bound (too many pixels)",
            "Reduce overdraw / resolution",
            "Throughput rises toward the geometry limit"
          ],
          "result": "Identify the bottleneck stage, then optimize it"
        },
        "code": null,
        "mistake": "Optimizing geometry when the pipeline is fill-bound (or vice versa)."
      }
    ],
    "checkpoints": [
      {
        "label": "Start with why the module matters.",
        "bigO": "—",
        "why": "Module opener"
      },
      {
        "label": "Applications of computer graphics",
        "bigO": "4 areas",
        "why": "Info display · design · simulation/animation · UIs"
      },
      {
        "label": "Graphics system",
        "bigO": "frame buffer",
        "why": "Pixel array; depth = bits/pixel = colour precision"
      },
      {
        "label": "Physical and synthetic images",
        "bigO": "object+light+viewer",
        "why": "Synthetic image simulates physical light transport"
      },
      {
        "label": "Imaging systems",
        "bigO": "pinhole model",
        "why": "3-D → 2-D projection through a centre of projection"
      },
      {
        "label": "Synthetic-camera model",
        "bigO": "objects ⟂ camera",
        "why": "Independent specification; project through COP onto image plane"
      }
    ]
  },
  {
    "n": 2,
    "id": "module-2",
    "title": "Input and Interaction",
    "hours": 8,
    "question": "How do events and display lists drive interactive graphics?",
    "story": [
      "Input",
      "Events",
      "Display lists",
      "Menus"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Interaction",
      "Input devices",
      "Clients and servers",
      "Display lists",
      "Display lists and modeling",
      "Event driven input",
      "Menus"
    ],
    "notes": "Aligned to BCS504 Module_2 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Module opener (not rendered — the cinematic opener slide covers module motivation).",
        "takeaway": "Module opener (not rendered — the cinematic opener slide covers module motivation).",
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
        "topic": "Interaction",
        "terms": [
          "Interaction"
        ],
        "definition": "Interactive graphics is a loop: the program displays an image, the user acts through an input device, an event is generated, the application updates its model and redisplays. Angel frames graphics as event-driven.",
        "takeaway": "Interaction = the display→input→event→update→redisplay loop, driven by events, not polling.",
        "visual": "interaction",
        "algo": [
          "Display the current image",
          "User manipulates an input device",
          "System queues an event",
          "Callback updates the model and requests redisplay"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "display→input→event→update→redisplay"
        },
        "dryRun": {
          "input": "User drags a slider",
          "steps": [
            "Mouse motion generates a motion event",
            "The motion callback fires",
            "Model value updates",
            "Window is redrawn with the new value"
          ],
          "result": "User action → event → callback → new frame"
        },
        "code": null,
        "mistake": "Writing a busy-poll loop instead of registering event callbacks."
      },
      {
        "topic": "Input devices",
        "terms": [
          "Input",
          "devices"
        ],
        "definition": "Input devices are classified by the logical value they return, not their physical form. Angel's logical device classes include locator (position), pick (object id), keyboard (string), valuator (scalar), choice (menu selection) and stroke (sequence of positions).",
        "takeaway": "Think in LOGICAL input classes — locator, pick, keyboard, valuator, choice, stroke — decoupled from physical hardware.",
        "visual": "input-devices",
        "algo": [
          "Identify the logical value the task needs (position? id? number?)",
          "Map it to a logical class (locator, pick, valuator, …)",
          "Bind any physical device that can supply that class",
          "Application code stays device-independent"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "locator·pick·keyboard·valuator·choice·stroke"
        },
        "dryRun": {
          "input": "Select an on-screen object",
          "steps": [
            "Task needs an object identifier",
            "That is the PICK logical class",
            "A mouse click supplies it",
            "App receives the picked id, not raw pixels"
          ],
          "result": "Device-independent input via logical classes"
        },
        "code": null,
        "mistake": "Coding to a specific device (mouse) instead of the logical input class."
      },
      {
        "topic": "Clients and servers",
        "terms": [
          "Clients",
          "servers"
        ],
        "definition": "In graphics, the display server owns the screen and input; client applications connect to it and send rendering requests. Angel/OpenGL use this client–server model so a program can render on a remote display.",
        "takeaway": "The server owns display+input; clients send graphics requests — enabling network-transparent rendering.",
        "visual": "clients-and-servers",
        "algo": [
          "Client issues graphics/API requests",
          "Requests travel (possibly over a network) to the server",
          "Server executes them on its display hardware",
          "Server routes input events back to the client"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Server owns display/input; clients send requests"
        },
        "dryRun": {
          "input": "Run a plot program on a remote host",
          "steps": [
            "Client program runs on host A",
            "Display server runs on workstation B",
            "Rendering requests sent A→B",
            "B displays and returns mouse events"
          ],
          "result": "Rendering and display can live on different machines"
        },
        "code": null,
        "mistake": "Assuming the application and the display are always the same process/machine."
      },
      {
        "topic": "Display lists",
        "terms": [
          "Display",
          "lists"
        ],
        "definition": "A display list is a named, server-side cache of graphics commands. The client defines it once; later it is executed by name, avoiding repeated client→server traffic. It is retained-mode graphics (vs immediate mode).",
        "takeaway": "Display list = compile once on the server, execute many times — retained mode reduces client/server overhead.",
        "visual": "display-lists",
        "algo": [
          "Client records a sequence of primitives into a list",
          "List is stored on the server",
          "Client calls the list by its id to render",
          "Reuse many times without resending commands"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Retained-mode server-side command cache"
        },
        "dryRun": {
          "input": "A complex logo drawn every frame",
          "steps": [
            "Compile the logo into a display list once",
            "Each frame, call the list id",
            "Server replays stored commands",
            "No re-transmission of geometry"
          ],
          "result": "Repeated geometry rendered cheaply from the cached list"
        },
        "code": null,
        "mistake": "Using immediate mode for static geometry that could be cached in a display list."
      },
      {
        "topic": "Display lists and modeling",
        "terms": [
          "Display",
          "lists",
          "modeling"
        ],
        "definition": "Display lists support hierarchical modeling: a symbol (e.g. a wheel) is stored once as a list, then instanced multiple times with different transformations to build a complex model (a car) from reusable parts.",
        "takeaway": "Model with instances — one stored symbol reused under different transforms builds hierarchical scenes.",
        "visual": "display-lists-and-modeling",
        "algo": [
          "Define a base symbol as a display list",
          "For each instance, set a transformation",
          "Call the list to place a transformed copy",
          "Compose many instances into the whole model"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "One symbol + transforms → hierarchical model"
        },
        "dryRun": {
          "input": "A car with four identical wheels",
          "steps": [
            "Store one wheel as a display list",
            "Translate to front-left, call list",
            "Translate to each remaining corner, call list",
            "Four wheels from one definition"
          ],
          "result": "Hierarchical model built by instancing a symbol"
        },
        "code": null,
        "mistake": "Duplicating geometry for every instance instead of transforming one stored symbol."
      },
      {
        "topic": "Event driven input",
        "terms": [
          "Event",
          "driven",
          "input"
        ],
        "definition": "Event-driven input means the program registers callback functions for event types (mouse, keyboard, motion, display, idle); the windowing system calls them when events occur. The main loop dispatches events to callbacks.",
        "takeaway": "Register callbacks; the main loop dispatches events to them — no explicit polling.",
        "visual": "event-driven-input",
        "algo": [
          "Register callbacks (display, mouse, keyboard, motion, idle)",
          "Enter the main event loop",
          "System delivers each event to its callback",
          "Callbacks update state and request redisplay"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Main loop dispatches events to registered handlers"
        },
        "dryRun": {
          "input": "Handle a key press 'q' to quit",
          "steps": [
            "Register a keyboard callback",
            "Main loop runs",
            "'q' event delivered to the callback",
            "Callback exits the program"
          ],
          "result": "Events routed to the correct registered callbacks"
        },
        "code": null,
        "mistake": "Putting application logic in a manual loop instead of in event callbacks."
      },
      {
        "topic": "Menus",
        "terms": [
          "Menus"
        ],
        "definition": "A menu is a CHOICE logical input device: it presents options and returns the selected entry's id to a callback. Menus (including pop-up and hierarchical/submenus) let the user pick a command without keyboard input.",
        "takeaway": "A menu is a choice device — it returns a selection id to a callback; submenus give hierarchy.",
        "visual": "menus",
        "algo": [
          "Create a menu and attach entries with ids",
          "Attach the menu to a mouse button",
          "User pops it up and selects an entry",
          "The menu callback receives the selected id"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Returns selected entry id to a callback; submenus nest"
        },
        "dryRun": {
          "input": "A right-click colour menu",
          "steps": [
            "Create menu {Red=1, Green=2, Blue=3}",
            "Attach to the right button",
            "User selects Green",
            "Callback gets id 2 → set colour green"
          ],
          "result": "Menu selection delivered as a choice value to the callback"
        },
        "code": null,
        "mistake": "Treating menu entries as pixels instead of logical choice ids."
      }
    ],
    "checkpoints": [
      {
        "label": "Start with why the module matters.",
        "bigO": "—",
        "why": "Module opener"
      },
      {
        "label": "Interaction",
        "bigO": "event loop",
        "why": "display→input→event→update→redisplay"
      },
      {
        "label": "Input devices",
        "bigO": "6 logical classes",
        "why": "locator·pick·keyboard·valuator·choice·stroke"
      },
      {
        "label": "Clients and servers",
        "bigO": "client↔server",
        "why": "Server owns display/input; clients send requests"
      },
      {
        "label": "Display lists",
        "bigO": "compile once",
        "why": "Retained-mode server-side command cache"
      },
      {
        "label": "Display lists and modeling",
        "bigO": "instancing",
        "why": "One symbol + transforms → hierarchical model"
      }
    ]
  },
  {
    "n": 3,
    "id": "module-3",
    "title": "Geometric Objects and Transformations",
    "hours": 8,
    "question": "How do matrices move, rotate and scale geometry?",
    "story": [
      "Frames",
      "Affine",
      "Homogeneous",
      "Order"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Frames in OpenGL",
      "Modeling a colored cube",
      "Affine transformations",
      "Rotation",
      "Translation",
      "Scaling",
      "Homogeneous coordinates",
      "Concatenation of transformations"
    ],
    "notes": "Aligned to BCS504 Module_3 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Module opener (not rendered — the cinematic opener slide covers module motivation).",
        "takeaway": "Module opener (not rendered — the cinematic opener slide covers module motivation).",
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
        "topic": "Frames in OpenGL",
        "terms": [
          "Frames",
          "OpenGL"
        ],
        "definition": "A frame is a coordinate system: an origin plus basis vectors. OpenGL distinguishes several frames — object (model), world, camera/eye, and clip/window — and transformations move points between them.",
        "takeaway": "Points are expressed in a frame; the model-view matrix maps object→eye coordinates.",
        "visual": "frames-in-opengl",
        "algo": [
          "Define geometry in the object (model) frame",
          "Model transform → world frame",
          "View transform → camera/eye frame",
          "Projection → clip → window coordinates"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "model→world→eye→clip via matrices"
        },
        "dryRun": {
          "input": "A vertex of a cube",
          "steps": [
            "Given in object coordinates",
            "Model matrix places it in the world",
            "View matrix expresses it relative to the camera",
            "Projection maps it toward the screen"
          ],
          "result": "Same point, successive coordinate frames via matrices"
        },
        "code": null,
        "mistake": "Ignoring which frame coordinates are in — mixing object and world coordinates."
      },
      {
        "topic": "Modeling a colored cube",
        "terms": [
          "Modeling",
          "colored",
          "cube"
        ],
        "definition": "A colored cube is modeled as 8 vertices grouped into 6 faces (each two triangles), with a colour per vertex. It is the standard example for vertex arrays, per-vertex attributes and interpolation across faces.",
        "takeaway": "Geometry = shared vertex list + face connectivity; colour is a per-vertex attribute interpolated across the face.",
        "visual": "modeling-a-colored-cube",
        "algo": [
          "List the 8 cube vertices once",
          "Define 6 faces (12 triangles) by vertex indices",
          "Attach a colour to each vertex",
          "Rasterizer interpolates vertex colours across each face"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Shared vertices + per-vertex colour interpolation"
        },
        "dryRun": {
          "input": "One cube face, corners red and blue",
          "steps": [
            "Face references 4 shared vertices",
            "Two corners red, two blue",
            "Rasterizer interpolates along the face",
            "Fragments get a red→blue gradient"
          ],
          "result": "Smooth colour gradient from per-vertex colours"
        },
        "code": null,
        "mistake": "Duplicating vertices per face instead of sharing them via an index list."
      },
      {
        "topic": "Affine transformations",
        "terms": [
          "Affine",
          "transformations"
        ],
        "definition": "An affine transformation maps points by a linear part plus a translation: P' = A·P + d. It preserves straight lines and parallelism (but not necessarily lengths/angles). Rotation, translation, scaling and shear are all affine.",
        "takeaway": "Affine = linear + translation; lines and parallelism are preserved. Combine them by matrix multiplication.",
        "visual": "affine-transformations",
        "algo": [
          "Write the transform as matrix A and translation d",
          "Apply P' = A·P + d to each point",
          "Lines map to lines, parallel stays parallel",
          "Compose transforms by multiplying matrices"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Linear+translation; preserves lines & parallelism"
        },
        "dryRun": {
          "input": "Scale then shear a square",
          "steps": [
            "Apply scale matrix to each vertex",
            "Apply shear matrix to the result",
            "Square becomes a parallelogram",
            "Opposite sides remain parallel"
          ],
          "result": "Parallelism preserved; shape mapped by combined affine transform"
        },
        "code": null,
        "mistake": "Assuming affine maps preserve angles/lengths — only lines and parallelism are guaranteed."
      },
      {
        "topic": "Rotation",
        "terms": [
          "Rotation"
        ],
        "definition": "Rotation turns points about a fixed point/axis by angle θ. In 2-D about the origin: x' = x cosθ − y sinθ, y' = x sinθ + y cosθ. It is a rigid transform — lengths and angles are preserved.",
        "takeaway": "2-D rotation matrix [[cosθ,−sinθ],[sinθ,cosθ]]; rotation about an arbitrary point = translate→rotate→translate back.",
        "visual": "rotation",
        "algo": [
          "Choose the rotation angle θ and centre",
          "If centre ≠ origin, translate centre to origin",
          "Apply the rotation matrix to each point",
          "Translate back to the original centre"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Rigid turn; off-origin = translate→rotate→translate-back"
        },
        "dryRun": {
          "input": "Rotate point (1,0) by 90°",
          "steps": [
            "x' = 1·cos90 − 0·sin90 = 0",
            "y' = 1·sin90 + 0·cos90 = 1",
            "Point moves to (0,1)",
            "Distance from origin unchanged (=1)"
          ],
          "result": "(1,0) → (0,1); rigid rotation preserves length"
        },
        "code": null,
        "mistake": "Rotating about the origin when the object should rotate about its own centre."
      },
      {
        "topic": "Translation",
        "terms": [
          "Translation"
        ],
        "definition": "Translation moves every point by a fixed displacement (dx, dy, dz): P' = P + d. It has no fixed point. In homogeneous coordinates it becomes a matrix multiply so it composes with rotation/scaling.",
        "takeaway": "Translation adds a displacement; homogeneous coordinates turn it into a 4×4 matrix so it multiplies with others.",
        "visual": "translation",
        "algo": [
          "Choose displacement vector d = (dx,dy,dz)",
          "Add d to every vertex: P' = P + d",
          "In homogeneous form use the translation matrix T(d)",
          "Compose T with other transforms by multiplication"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Displacement; homogeneous 4×4 so it composes"
        },
        "dryRun": {
          "input": "Translate (2,3) by (4,−1)",
          "steps": [
            "x' = 2 + 4 = 6",
            "y' = 3 + (−1) = 2",
            "Point moves to (6,2)",
            "Shape unchanged, only position moves"
          ],
          "result": "(2,3) → (6,2); pure position change"
        },
        "code": null,
        "mistake": "Trying to translate with a 2×2 linear matrix — needs homogeneous coordinates."
      },
      {
        "topic": "Scaling",
        "terms": [
          "Scaling"
        ],
        "definition": "Scaling multiplies coordinates by factors (sx, sy, sz) about a fixed point: x' = sx·x, etc. Unequal factors give non-uniform scaling; s<1 shrinks, s>1 enlarges; negative s reflects.",
        "takeaway": "Scaling multiplies each axis by a factor about a fixed point; non-uniform factors distort proportions.",
        "visual": "scaling",
        "algo": [
          "Choose scale factors (sx,sy,sz) and the fixed point",
          "If fixed point ≠ origin, translate it to origin",
          "Multiply each coordinate by its factor",
          "Translate back to the fixed point"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Per-axis factor about a fixed point; off-origin needs translate"
        },
        "dryRun": {
          "input": "Scale (2,4) by (2, 0.5)",
          "steps": [
            "x' = 2·2 = 4",
            "y' = 4·0.5 = 2",
            "Point moves to (4,2)",
            "Object stretched in x, squashed in y"
          ],
          "result": "(2,4) → (4,2); non-uniform scaling changes proportions"
        },
        "code": null,
        "mistake": "Scaling about the origin so the object drifts, instead of scaling about its centre."
      },
      {
        "topic": "Homogeneous coordinates",
        "terms": [
          "Homogeneous",
          "coordinates"
        ],
        "definition": "Homogeneous coordinates represent a 3-D point as a 4-vector (x,y,z,1). This lets translation, rotation and scaling all be written as 4×4 matrix multiplications, so any sequence composes into a single matrix.",
        "takeaway": "Add a w=1 coordinate so translation becomes a matrix multiply — then ALL transforms compose by multiplication.",
        "visual": "homogeneous-coordinates",
        "algo": [
          "Represent a point as (x,y,z,1)",
          "Write each transform as a 4×4 matrix",
          "Multiply matrices to combine transforms",
          "Multiply the point by the combined matrix"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "w-coordinate makes translation a 4×4 multiply → composable"
        },
        "dryRun": {
          "input": "Translate then rotate a point",
          "steps": [
            "Point = (x,y,z,1)",
            "Build T (translate) and R (rotate) as 4×4",
            "Combined M = R·T",
            "P' = M·P in one multiply"
          ],
          "result": "A whole transform sequence collapses to one 4×4 matrix"
        },
        "code": null,
        "mistake": "Forgetting w=1, or dividing by w incorrectly after a projection."
      },
      {
        "topic": "Concatenation of transformations",
        "terms": [
          "Concatenation",
          "transformations"
        ],
        "definition": "Concatenation multiplies individual transform matrices into one: M = Mn···M2·M1. Matrices are applied right-to-left to a point (M1 first), and matrix multiplication is NOT commutative, so ORDER MATTERS.",
        "takeaway": "M = ...M3·M2·M1 — rightmost applies first; rotate-then-translate ≠ translate-then-rotate.",
        "visual": "concatenation-of-transformations",
        "algo": [
          "Order the transforms in application order T1,T2,…",
          "Build M = …·M2·M1 (last-applied on the left)",
          "Apply P' = M·P (M1 acts first)",
          "Reversing the order gives a different result"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Right-to-left; non-commutative → order matters"
        },
        "dryRun": {
          "input": "Rotate 90° then translate (5,0) vs the reverse",
          "steps": [
            "R-then-T: point rotates about origin, then shifts +5x",
            "T-then-R: point shifts +5x, then that shifted point rotates about origin",
            "The two final positions differ",
            "Because R·T ≠ T·R"
          ],
          "result": "Order of concatenation changes the outcome — non-commutative"
        },
        "code": null,
        "mistake": "Assuming transforms commute — swapping rotate and translate changes the picture."
      }
    ],
    "checkpoints": [
      {
        "label": "Start with why the module matters.",
        "bigO": "—",
        "why": "Module opener"
      },
      {
        "label": "Frames in OpenGL",
        "bigO": "frame = origin+basis",
        "why": "model→world→eye→clip via matrices"
      },
      {
        "label": "Modeling a colored cube",
        "bigO": "8 verts / 6 faces",
        "why": "Shared vertices + per-vertex colour interpolation"
      },
      {
        "label": "Affine transformations",
        "bigO": "P'=A·P+d",
        "why": "Linear+translation; preserves lines & parallelism"
      },
      {
        "label": "Rotation",
        "bigO": "cosθ/sinθ matrix",
        "why": "Rigid turn; off-origin = translate→rotate→translate-back"
      },
      {
        "label": "Translation",
        "bigO": "P'=P+d",
        "why": "Displacement; homogeneous 4×4 so it composes"
      }
    ]
  },
  {
    "n": 4,
    "id": "module-4",
    "title": "Viewing, Lighting and Shading",
    "hours": 8,
    "question": "How do cameras and lights create shaded surfaces?",
    "story": [
      "View",
      "Light",
      "Phong",
      "Shade"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Classical and computer viewing",
      "Viewing with a computer",
      "Light and matter",
      "Light sources",
      "Phong lighting model",
      "Polygonal shading"
    ],
    "notes": "Aligned to BCS504 Module_4 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Module opener (not rendered — the cinematic opener slide covers module motivation).",
        "takeaway": "Module opener (not rendered — the cinematic opener slide covers module motivation).",
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
        "topic": "Classical and computer viewing",
        "terms": [
          "Classical",
          "computer",
          "viewing"
        ],
        "definition": "Classical viewing (drafting) uses fixed standard views — orthographic, axonometric, oblique and perspective. Computer viewing unifies these through a camera with a view volume and a projection matrix.",
        "takeaway": "Parallel (orthographic/axonometric/oblique) vs perspective projections — computer viewing produces all via a projection matrix + view volume.",
        "visual": "classical-and-computer-viewing",
        "algo": [
          "Classical: pick a standard view (top, isometric, one-point perspective…)",
          "Computer: position a camera and set a view volume",
          "Choose parallel or perspective projection",
          "Projection matrix maps the volume to the screen"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Projection matrix + view volume reproduces classical views"
        },
        "dryRun": {
          "input": "Show a building in isometric and perspective",
          "steps": [
            "Isometric = parallel projection, equal foreshortening",
            "Set an orthographic view volume → isometric",
            "Switch to a perspective frustum → perspective",
            "Same model, two projection matrices"
          ],
          "result": "One camera model reproduces all classical views"
        },
        "code": null,
        "mistake": "Confusing parallel projection (no foreshortening) with perspective (distant = smaller)."
      },
      {
        "topic": "Viewing with a computer",
        "terms": [
          "Viewing",
          "computer"
        ],
        "definition": "Computer viewing has three parts: position the camera (view/model-view transform), set the view volume/projection (orthographic or perspective frustum), and clip to that volume before projecting to the viewport.",
        "takeaway": "View pipeline: model-view transform → projection → clip to the view volume → viewport mapping.",
        "visual": "viewing-with-a-computer",
        "algo": [
          "Set the model-view matrix (camera position/orientation)",
          "Set the projection (ortho box or perspective frustum)",
          "Clip geometry against the view volume",
          "Map the projected result to the viewport"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Position camera, set volume, clip, map to viewport"
        },
        "dryRun": {
          "input": "Look at a scene from above",
          "steps": [
            "Model-view places the camera overhead",
            "Choose an orthographic view volume",
            "Objects outside the box are clipped",
            "Projected result fills the viewport"
          ],
          "result": "Camera + projection + clipping produce the final 2-D view"
        },
        "code": null,
        "mistake": "Forgetting to set the projection/view volume, so geometry is clipped away or distorted."
      },
      {
        "topic": "Light and matter",
        "terms": [
          "Light",
          "matter"
        ],
        "definition": "Realistic shading models how light interacts with surfaces. Reflection splits into diffuse (scattered equally in all directions, matte) and specular (mirror-like highlight), plus an ambient background term. Surface colour comes from wavelength-dependent reflection.",
        "takeaway": "Three interaction types: ambient (background), diffuse (matte, direction-independent view), specular (shiny highlight).",
        "visual": "light-and-matter",
        "algo": [
          "Ambient: uniform background illumination",
          "Diffuse: brightness depends on light–surface angle (Lambert)",
          "Specular: bright highlight near the mirror direction",
          "Total reflected colour = sum of the three, per wavelength"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Diffuse=matte(Lambert); specular=view-dependent highlight"
        },
        "dryRun": {
          "input": "A plastic ball under one lamp",
          "steps": [
            "Ambient gives a base fill everywhere",
            "Diffuse brightens the side facing the lamp",
            "Specular adds a small bright highlight",
            "Sum gives the shaded appearance"
          ],
          "result": "Ambient + diffuse + specular explain the ball's look"
        },
        "code": null,
        "mistake": "Confusing diffuse (view-independent) with specular (view-dependent highlight)."
      },
      {
        "topic": "Light sources",
        "terms": [
          "Light",
          "sources"
        ],
        "definition": "Angel classifies light sources as: ambient (uniform), point (rays from one position, distance attenuation), spotlight (point light limited to a cone), and distant/directional (parallel rays, source at infinity, e.g. the sun).",
        "takeaway": "Four source types — ambient, point, spotlight, distant/directional — differ in where rays come from.",
        "visual": "light-sources",
        "algo": [
          "Ambient: same light everywhere, no direction",
          "Point: rays radiate from a position, attenuate with distance",
          "Spotlight: point light restricted to a cone",
          "Distant: parallel rays, direction only (sun)"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "ambient·point·spotlight·distant(parallel)"
        },
        "dryRun": {
          "input": "Light a scene like sunset",
          "steps": [
            "Add ambient for base fill",
            "Add a distant light for parallel sun rays",
            "Direction fixed, no attenuation",
            "Surfaces facing the sun are brightest"
          ],
          "result": "Distant source = parallel rays, chosen for sunlight"
        },
        "code": null,
        "mistake": "Using a point light (with attenuation) where a distant/directional light (the sun) is intended."
      },
      {
        "topic": "Phong lighting model",
        "terms": [
          "Phong",
          "lighting",
          "model"
        ],
        "definition": "The Phong reflection model computes surface colour as I = ka·Ia + kd·Id·(N·L) + ks·Is·(R·V)^n: an ambient term, a diffuse term proportional to N·L, and a specular term proportional to (R·V) raised to a shininess exponent n.",
        "takeaway": "I = ambient(ka·Ia) + diffuse(kd·Id·(N·L)) + specular(ks·Is·(R·V)^n); n controls highlight tightness.",
        "visual": "phong-lighting-model",
        "algo": [
          "Ambient = ka·Ia (constant)",
          "Diffuse = kd·Id·max(N·L,0) — depends on light angle",
          "Specular = ks·Is·max(R·V,0)^n — depends on view vs reflection",
          "Sum the three per light and per colour channel"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Ambient+diffuse+specular; n = shininess"
        },
        "dryRun": {
          "input": "Shade a point with N·L=0.8, R·V=0.9, n=32",
          "steps": [
            "Ambient contributes ka·Ia",
            "Diffuse contributes kd·Id·0.8",
            "Specular contributes ks·Is·0.9^32 (small, tight highlight)",
            "I = sum of the three"
          ],
          "result": "Numeric colour from the three Phong terms; large n = sharper highlight"
        },
        "code": null,
        "mistake": "Dropping the max(·,0) clamp, or swapping N·L (diffuse) with R·V (specular)."
      },
      {
        "topic": "Polygonal shading",
        "terms": [
          "Polygonal",
          "shading"
        ],
        "definition": "Polygonal shading decides how a lighting model is applied across a polygon: flat (one colour per polygon from the face normal), Gouraud (lighting at vertices, colours interpolated), and Phong shading (normals interpolated, lighting per fragment).",
        "takeaway": "Flat = per-face; Gouraud = interpolate vertex colours; Phong shading = interpolate normals, light per pixel (best highlights).",
        "visual": "polygonal-shading",
        "algo": [
          "Flat: one normal → one colour for the whole face",
          "Gouraud: compute colour at each vertex, interpolate across the face",
          "Phong: interpolate the normal, run lighting per fragment",
          "More per-fragment work → smoother highlights"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Per-face / interpolate colour / interpolate normal"
        },
        "dryRun": {
          "input": "A specular highlight on a coarse mesh",
          "steps": [
            "Flat: faceted, blocky look",
            "Gouraud: highlight may be missed between vertices",
            "Phong shading: interpolated normals catch the highlight",
            "Best realism at higher cost"
          ],
          "result": "Phong shading captures highlights Gouraud can miss"
        },
        "code": null,
        "mistake": "Confusing the Phong lighting MODEL with Phong SHADING (per-fragment normal interpolation)."
      }
    ],
    "checkpoints": [
      {
        "label": "Start with why the module matters.",
        "bigO": "—",
        "why": "Module opener"
      },
      {
        "label": "Classical and computer viewing",
        "bigO": "parallel vs perspective",
        "why": "Projection matrix + view volume reproduces classical views"
      },
      {
        "label": "Viewing with a computer",
        "bigO": "model-view·projection",
        "why": "Position camera, set volume, clip, map to viewport"
      },
      {
        "label": "Light and matter",
        "bigO": "amb+diff+spec",
        "why": "Diffuse=matte(Lambert); specular=view-dependent highlight"
      },
      {
        "label": "Light sources",
        "bigO": "4 source types",
        "why": "ambient·point·spotlight·distant(parallel)"
      },
      {
        "label": "Phong lighting model",
        "bigO": "ka·Ia+kd·Id(N·L)+ks·Is(R·V)^n",
        "why": "Ambient+diffuse+specular; n = shininess"
      }
    ]
  },
  {
    "n": 5,
    "id": "module-5",
    "title": "Clipping and Primitive Algorithms",
    "hours": 8,
    "question": "How do pixels get chosen for lines and circles?",
    "story": [
      "Clip",
      "DDA",
      "Bresenham",
      "Circle"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Vertices to fragments",
      "Implementation strategies",
      "Four major tasks",
      "Clipping",
      "Line segment clipping",
      "Cohen-Sutherland clipping",
      "Liang-Barsky clipping",
      "Line drawing algorithms",
      "DDA algorithm",
      "Bresenham line algorithm",
      "Parallel line algorithms",
      "Frame-buffer values",
      "Circle-generating algorithms",
      "Midpoint circle algorithm"
    ],
    "notes": "Aligned to BCS504 Module_5 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Module opener (not rendered — the cinematic opener slide covers module motivation).",
        "takeaway": "Module opener (not rendered — the cinematic opener slide covers module motivation).",
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
        "topic": "Vertices to fragments",
        "terms": [
          "Vertices",
          "fragments"
        ],
        "definition": "The back end of the pipeline converts projected primitives into fragments (candidate pixels). Its major tasks are clipping, rasterization (scan conversion), hidden-surface removal, and fragment processing before writing the frame buffer.",
        "takeaway": "Back-end order: clip → rasterize to fragments → hidden-surface/fragment tests → frame buffer.",
        "visual": "vertices-to-fragments",
        "algo": [
          "Clip primitives to the view volume",
          "Rasterize each clipped primitive into fragments",
          "Resolve visibility (z-buffer)",
          "Write surviving fragments to the frame buffer"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Primitives become fragments then pixels"
        },
        "dryRun": {
          "input": "A triangle partly off-screen",
          "steps": [
            "Clip it to the window",
            "Scan-convert the visible part into fragments",
            "Depth-test each fragment",
            "Write the visible fragments"
          ],
          "result": "Geometry → fragments → visible pixels"
        },
        "code": null,
        "mistake": "Thinking rasterization happens before clipping — clip first to avoid wasted fragments."
      },
      {
        "topic": "Implementation strategies",
        "terms": [
          "Implementation",
          "strategies"
        ],
        "definition": "Two rendering strategies: the object-order (pipeline) approach processes each object once, writing to all pixels it covers (sort-last, z-buffer); the image-order (ray tracing) approach processes each pixel once, finding what object it sees.",
        "takeaway": "Object-order (for each object → its pixels; z-buffer) vs image-order (for each pixel → its object; ray tracing).",
        "visual": "implementation-strategies",
        "algo": [
          "Object-order: loop over objects, rasterize each",
          "Resolve visibility per pixel with a z-buffer",
          "Image-order: loop over pixels, cast a ray",
          "Find the nearest object the ray hits"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Pipeline+z-buffer vs ray tracing"
        },
        "dryRun": {
          "input": "Render two overlapping triangles",
          "steps": [
            "Object-order: draw both, z-buffer keeps nearest per pixel",
            "Image-order: for each pixel shoot a ray",
            "Ray returns the nearer triangle",
            "Both yield correct visibility"
          ],
          "result": "Two dual strategies; hardware pipelines use object-order + z-buffer"
        },
        "code": null,
        "mistake": "Assuming the GPU ray-traces — the classic pipeline is object-order with a z-buffer."
      },
      {
        "topic": "Four major tasks",
        "terms": [
          "Four",
          "major",
          "tasks"
        ],
        "definition": "Angel lists the four major back-end tasks: modeling (produce primitives), geometric processing (transform, clip, project, compute lighting), rasterization (primitives → fragments), and fragment processing (colour, depth, blend → frame buffer).",
        "takeaway": "Four tasks: modeling → geometry processing → rasterization → fragment processing.",
        "visual": "four-major-tasks",
        "algo": [
          "Modeling: generate primitives from the application",
          "Geometry processing: transform, clip, project, light",
          "Rasterization: convert primitives to fragments",
          "Fragment processing: tests + blend into the frame buffer"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "model→geometry→rasterize→fragment"
        },
        "dryRun": {
          "input": "Render one lit triangle",
          "steps": [
            "Modeling emits 3 vertices",
            "Geometry transforms/clips/lights them",
            "Rasterizer makes fragments",
            "Fragment stage writes pixels"
          ],
          "result": "The triangle flows through all four tasks"
        },
        "code": null,
        "mistake": "Merging geometry processing and rasterization — they are distinct stages."
      },
      {
        "topic": "Clipping",
        "terms": [
          "Clipping"
        ],
        "definition": "Clipping removes the parts of primitives that lie outside the clipping window/view volume so only visible geometry is rasterized. It works on points, lines and polygons and is done before rasterization.",
        "takeaway": "Clip against the window BEFORE rasterizing so off-screen geometry costs nothing.",
        "visual": "clipping",
        "algo": [
          "Define the clipping window (xmin,xmax,ymin,ymax)",
          "Test each primitive against the window",
          "Discard fully-outside parts; keep inside parts",
          "Compute new boundary vertices where a primitive crosses"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Remove out-of-window parts before rasterizing"
        },
        "dryRun": {
          "input": "A line crossing the right edge",
          "steps": [
            "Part inside the window is kept",
            "Intersection with x=xmax is computed",
            "Outside part is discarded",
            "Clipped line ends at the boundary"
          ],
          "result": "Only the in-window portion is passed on"
        },
        "code": null,
        "mistake": "Rasterizing first and relying on the frame buffer to hide overflow — wasteful and can wrap."
      },
      {
        "topic": "Line segment clipping",
        "terms": [
          "Line",
          "segment",
          "clipping"
        ],
        "definition": "Line-segment clipping finds the portion of a segment inside a rectangular window. The three outcomes are: trivially inside (draw whole), trivially outside (reject), or crossing (compute the boundary intersection and keep the inside part).",
        "takeaway": "Three cases: fully in (accept), fully out (reject), crossing (clip at the boundary).",
        "visual": "line-segment-clipping",
        "algo": [
          "Test both endpoints against the window",
          "Both inside → accept whole segment",
          "Both share an outside region → reject",
          "Otherwise compute the crossing point and keep the inside part"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Endpoint tests then boundary intersection"
        },
        "dryRun": {
          "input": "Segment from inside to far right",
          "steps": [
            "One endpoint inside, one right of xmax",
            "Not trivially accepted or rejected",
            "Compute intersection with x=xmax",
            "Draw inside-endpoint → intersection"
          ],
          "result": "Segment clipped to the window boundary"
        },
        "code": null,
        "mistake": "Treating every crossing segment the same without checking trivial accept/reject first."
      },
      {
        "topic": "Cohen-Sutherland clipping",
        "terms": [
          "Cohen-Sutherland",
          "clipping"
        ],
        "definition": "Cohen–Sutherland assigns each endpoint a 4-bit outcode (bits = above-top, below-bottom, right, left of the window). Trivial ACCEPT if both codes are 0000; trivial REJECT if the bitwise AND ≠ 0000; else clip against a boundary where a code bit is set and repeat.",
        "takeaway": "4-bit outcodes: accept if both 0000, reject if AND≠0, else clip at a set-bit boundary and re-test.",
        "visual": "cohen-sutherland-clipping",
        "algo": [
          "Compute the 4-bit outcode of each endpoint (TBRL)",
          "If (code1 OR code2)=0 → accept whole line",
          "If (code1 AND code2)≠0 → reject whole line",
          "Else pick an outside endpoint, clip to that boundary, recompute its code, repeat"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "accept both=0000; reject AND≠0; else clip boundary"
        },
        "dryRun": {
          "input": "Line with codes 0000 (P1) and 0010 (P2, right)",
          "steps": [
            "OR ≠ 0 and AND = 0 → not trivial",
            "P2 is right of xmax (bit set)",
            "Compute intersection with x=xmax",
            "Replace P2, its code becomes 0000 → accept"
          ],
          "result": "Line clipped at the right edge, then accepted"
        },
        "code": null,
        "mistake": "Using OR for rejection — rejection needs bitwise AND ≠ 0 (a common shared outside region)."
      },
      {
        "topic": "Liang-Barsky clipping",
        "terms": [
          "Liang-Barsky",
          "clipping"
        ],
        "definition": "Liang–Barsky clips a segment using its parametric form P(t)=P1+t·(P2−P1), 0≤t≤1. Each boundary gives an inequality p_k·t ≤ q_k; the algorithm tracks t_enter (max of entering t's) and t_leave (min of leaving t's), accepting if t_enter ≤ t_leave. It is more efficient than Cohen–Sutherland.",
        "takeaway": "Parametric clip: compute t for each edge, keep [t_enter, t_leave]; accept iff t_enter ≤ t_leave. Fewer intersections than Cohen–Sutherland.",
        "visual": "liang-barsky-clipping",
        "algo": [
          "Write P(t)=P1+t·Δ, 0≤t≤1",
          "For each edge form p_k·t ≤ q_k",
          "p_k<0 → entering (update t_enter=max); p_k>0 → leaving (update t_leave=min)",
          "Accept the part from t_enter to t_leave if t_enter ≤ t_leave"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Parametric; fewer intersection computations than Cohen–Sutherland"
        },
        "dryRun": {
          "input": "Segment crossing left and right edges",
          "steps": [
            "Left edge gives an entering t → t_enter",
            "Right edge gives a leaving t → t_leave",
            "t_enter = 0.2, t_leave = 0.8",
            "0.2 ≤ 0.8 → draw P(0.2)…P(0.8)"
          ],
          "result": "Visible part = P(t_enter)…P(t_leave)"
        },
        "code": null,
        "mistake": "Swapping entering (p_k<0) and leaving (p_k>0), or forgetting the 0≤t≤1 clamp."
      },
      {
        "topic": "Line drawing algorithms",
        "terms": [
          "Line",
          "drawing",
          "algorithms"
        ],
        "definition": "Line drawing (scan conversion) turns a mathematical segment into the best set of pixels on a raster grid. The goal: pixels close to the true line, evenly spaced, computed fast. DDA and Bresenham are the standard methods.",
        "takeaway": "Scan-convert a line = pick the raster pixels nearest the true line; Bresenham does it with integer math only.",
        "visual": "line-drawing-algorithms",
        "algo": [
          "Take endpoints on the integer raster grid",
          "Step along the major axis one pixel at a time",
          "At each step choose the nearest pixel on the minor axis",
          "Repeat to the far endpoint"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Nearest pixel per step; integer math (Bresenham)"
        },
        "dryRun": {
          "input": "Line (0,0)→(4,2)",
          "steps": [
            "Major axis is x (dx>dy)",
            "Step x = 0,1,2,3,4",
            "Choose the nearest y at each x",
            "Plot 5 pixels approximating the line"
          ],
          "result": "A pixel staircase closely following the true line"
        },
        "code": null,
        "mistake": "Stepping along the minor axis, causing gaps in the rasterized line."
      },
      {
        "topic": "DDA algorithm",
        "terms": [
          "DDA",
          "algorithm"
        ],
        "definition": "The DDA (Digital Differential Analyzer) draws a line by stepping: steps = max(|dx|,|dy|); Xinc = dx/steps, Yinc = dy/steps; starting at (x0,y0) it adds the increments each step and plots round(x),round(y). It uses floating-point and rounding.",
        "takeaway": "DDA: steps=max(|dx|,|dy|), add Xinc=dx/steps and Yinc=dy/steps each step, round to plot. Simple but uses float + rounding.",
        "visual": "dda-algorithm",
        "algo": [
          "dx=x1−x0, dy=y1−y0",
          "steps = max(|dx|,|dy|)",
          "Xinc=dx/steps, Yinc=dy/steps",
          "For each step: x+=Xinc, y+=Yinc, plot round(x),round(y)"
        ],
        "complexity": {
          "best": "O(n)",
          "avg": "O(n)",
          "worst": "O(n)",
          "note": "n = steps = max(|dx|,|dy|); float add + round per pixel"
        },
        "dryRun": {
          "input": "Line (0,0)→(4,2)",
          "steps": [
            "dx=4, dy=2 → steps=4",
            "Xinc=1.0, Yinc=0.5",
            "Points: (0,0),(1,0.5→1),(2,1),(3,1.5→2),(4,2)",
            "Plot (0,0)(1,1)(2,1)(3,2)(4,2)"
          ],
          "result": "5 pixels via floating increments and rounding"
        },
        "code": null,
        "mistake": "Expecting integer speed — DDA's per-step float add + round is its weakness vs Bresenham."
      },
      {
        "topic": "Bresenham line algorithm",
        "terms": [
          "Bresenham",
          "line",
          "algorithm"
        ],
        "definition": "Bresenham's line algorithm draws a line using only integer arithmetic. For 0<m<1 the decision parameter starts p0 = 2·dy − dx; if pk<0 choose E (x+1,y), pk+1 = pk + 2·dy; else choose NE (x+1,y+1), pk+1 = pk + 2·dy − 2·dx. No floats, no rounding.",
        "takeaway": "Bresenham: p0=2dy−dx; pk<0→E, p+=2dy; pk≥0→NE, p+=2dy−2dx. Integer-only, so faster than DDA.",
        "visual": "bresenham-line-algorithm",
        "algo": [
          "Compute dx, dy; p0 = 2·dy − dx",
          "Plot (x0,y0)",
          "If pk<0: x++, pk+1 = pk + 2·dy (E pixel)",
          "Else: x++, y++, pk+1 = pk + 2·dy − 2·dx (NE pixel)"
        ],
        "complexity": {
          "best": "O(n)",
          "avg": "O(n)",
          "worst": "O(n)",
          "note": "n=Δx; integer add/compare per pixel — faster than DDA"
        },
        "dryRun": {
          "input": "Line (0,0)→(4,2), dx=4,dy=2",
          "steps": [
            "p0 = 2·2 − 4 = 0 → NE: plot (1,1), p=0+4−8=−4",
            "p<0 → E: plot (2,1), p=−4+4=0",
            "p≥0 → NE: plot (3,2), p=0+4−8=−4",
            "p<0 → E: plot (4,2)"
          ],
          "result": "(0,0)(1,1)(2,1)(3,2)(4,2) using integer math only"
        },
        "code": null,
        "mistake": "Using the wrong update branch, or applying the 0<m<1 form to steep/negative slopes without swapping axes."
      },
      {
        "topic": "Parallel line algorithms",
        "terms": [
          "Parallel",
          "line",
          "algorithms"
        ],
        "definition": "Parallel line drawing partitions a line's pixels among multiple processors so each computes a disjoint span concurrently. Each processor needs the correct starting decision value for its span; combined, they draw the whole line faster.",
        "takeaway": "Split the line's span across processors; each needs its own starting decision parameter, then draws in parallel.",
        "visual": "parallel-line-algorithms",
        "algo": [
          "Divide the pixel range into P contiguous spans",
          "Give each processor its span endpoints",
          "Compute the correct initial decision value for that span",
          "All processors rasterize concurrently"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Partition pixels; per-span start value; draw concurrently"
        },
        "dryRun": {
          "input": "A 1000-pixel line on 4 processors",
          "steps": [
            "Each processor gets ~250 pixels",
            "Compute each span's start decision value",
            "All four run Bresenham on their span",
            "Spans concatenate into the full line"
          ],
          "result": "~4× speedup for one long line"
        },
        "code": null,
        "mistake": "Giving a processor the wrong starting decision value so its span is offset from the others."
      },
      {
        "topic": "Frame-buffer values",
        "terms": [
          "Frame-buffer",
          "values"
        ],
        "definition": "The frame buffer stores one value per pixel; scan-conversion algorithms write colour/intensity into it via setPixel(x,y). Its depth sets the number of colours and its resolution sets pixel count; the video controller reads it to refresh the display.",
        "takeaway": "Scan conversion = a sequence of setPixel writes into the frame buffer; depth = colours, resolution = pixels.",
        "visual": "frame-buffer-values",
        "algo": [
          "Algorithm computes a pixel (x,y) and colour",
          "setPixel writes it into the frame buffer",
          "Repeat for all pixels of the primitive",
          "Video controller displays the buffer contents"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Scan conversion writes pixel values into the buffer"
        },
        "dryRun": {
          "input": "Bresenham writes 5 pixels",
          "steps": [
            "Each chosen (x,y) → setPixel(x,y,colour)",
            "Values stored in the buffer array",
            "Video controller scans the buffer",
            "The line appears on screen"
          ],
          "result": "Primitive rendered as frame-buffer writes"
        },
        "code": null,
        "mistake": "Ignoring buffer depth/resolution limits — writing outside bounds or beyond the colour range."
      },
      {
        "topic": "Circle-generating algorithms",
        "terms": [
          "Circle-generating",
          "algorithms"
        ],
        "definition": "Circle scan-conversion exploits 8-way symmetry: compute pixels for one 45° octant and reflect to the other seven. This cuts work to one-eighth; the midpoint (Bresenham) circle algorithm computes that octant with integer decisions.",
        "takeaway": "Compute one octant, mirror to 8; the midpoint circle algorithm does the octant with integer decisions.",
        "visual": "circle-generating-algorithms",
        "algo": [
          "Compute pixels for the octant x from 0 to y",
          "For each (x,y) plot all 8 symmetric points",
          "(±x,±y) and (±y,±x) about the centre",
          "Stop when x ≥ y"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Compute one octant, mirror to eight"
        },
        "dryRun": {
          "input": "Circle radius 10",
          "steps": [
            "Compute octant points (x,y) with x:0→y",
            "For (x,y)=(3,10) plot 8 mirrored pixels",
            "Continue until x≥y",
            "Full circle from one octant"
          ],
          "result": "Whole circle drawn from 1/8 of the computation"
        },
        "code": null,
        "mistake": "Recomputing all four quadrants instead of using 8-way symmetry."
      },
      {
        "topic": "Midpoint circle algorithm",
        "terms": [
          "Midpoint",
          "circle",
          "algorithm"
        ],
        "definition": "The midpoint circle algorithm starts at (0,r) with decision parameter p0 = 1 − r. If pk<0 the next pixel is E (x+1,y), pk+1 = pk + 2x + 3; else it is SE (x+1,y−1), pk+1 = pk + 2(x−y) + 5. It plots each octant point in all 8 octants using integer math.",
        "takeaway": "Start (0,r), p0=1−r; pk<0→E, p+=2x+3; pk≥0→SE, p+=2(x−y)+5; mirror to 8 octants. Integer-only.",
        "visual": "midpoint-circle-algorithm",
        "algo": [
          "Start (x,y)=(0,r), p0 = 1 − r",
          "If pk<0: x++, pk+1 = pk + 2x + 3 (E)",
          "Else: x++, y−−, pk+1 = pk + 2(x−y) + 5 (SE)",
          "Plot the 8 symmetric points; stop when x ≥ y"
        ],
        "complexity": {
          "best": "O(r)",
          "avg": "O(r)",
          "worst": "O(r)",
          "note": "One octant (~0.707r steps), integer decisions, mirrored ×8"
        },
        "dryRun": {
          "input": "Circle radius r=10",
          "steps": [
            "Start (0,10), p0 = 1−10 = −9",
            "p<0 → E: (1,10), p = −9+2·1+3 = −4",
            "p<0 → E: (2,10), p = −4+2·2+3 = 3",
            "p≥0 → SE: (3,9), p = 3+2(3−9)+5 = −4 …"
          ],
          "result": "Octant pixels (0,10)(1,10)(2,10)(3,9)… mirrored to full circle"
        },
        "code": null,
        "mistake": "Using the wrong increment (2x+3 vs 2(x−y)+5) or forgetting to decrement y on the SE choice."
      }
    ],
    "checkpoints": [
      {
        "label": "Start with why the module matters.",
        "bigO": "—",
        "why": "Module opener"
      },
      {
        "label": "Vertices to fragments",
        "bigO": "clip→raster→test",
        "why": "Primitives become fragments then pixels"
      },
      {
        "label": "Implementation strategies",
        "bigO": "object vs image order",
        "why": "Pipeline+z-buffer vs ray tracing"
      },
      {
        "label": "Four major tasks",
        "bigO": "4 tasks",
        "why": "model→geometry→rasterize→fragment"
      },
      {
        "label": "Clipping",
        "bigO": "keep inside",
        "why": "Remove out-of-window parts before rasterizing"
      },
      {
        "label": "Line segment clipping",
        "bigO": "accept/reject/clip",
        "why": "Endpoint tests then boundary intersection"
      }
    ]
  }
]

export function getModule(n) { return MODULES.find((m) => m.n === n) || null }
export function getCgModule(n) { return getModule(n) }

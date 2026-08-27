/** Distributed Systems (BCS515D) curriculum — from finalized 5th_Semester_PPTX */
export const COURSE = { id: 'distributed-systems', title: "Distributed Systems", code: 'BCS515D', shortTitle: 'DIST' }
export const MODULES = [
  {
    "n": 1,
    "id": "module-1",
    "title": "Characterization and Remote Invocation",
    "hours": 8,
    "question": "How do independent machines cooperate over a network?",
    "story": [
      "Characterization",
      "RPC",
      "RMI",
      "Challenges"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Introduction to distributed systems",
      "Introduction to distributed systems: message movement",
      "Resource sharing",
      "Resource sharing: message movement",
      "Challenges",
      "Challenges: message movement",
      "Request-reply protocols",
      "Request-reply protocols: message movement",
      "Remote procedure call",
      "Remote procedure call: message movement",
      "Remote method invocation",
      "Remote method invocation: message movement"
    ],
    "notes": "Aligned to BCS515D Module_1 PPTX + VTU 5th sem syllabus.",
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
        "topic": "Introduction to distributed systems",
        "terms": [
          "Introduction",
          "distributed",
          "systems"
        ],
        "definition": "A distributed system is a collection of independent computers that communicate ONLY by passing messages and appears to its users as a single coherent system. There is no shared memory and no global clock; components fail independently.",
        "takeaway": "Independent computers + message passing + no shared memory/clock, presented as one coherent system.",
        "visual": "introduction-to-distributed-systems",
        "algo": [
          "Independent nodes each with local memory",
          "They coordinate only via messages",
          "No global clock, no shared state",
          "Together they present a single system to users"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Independent nodes, no shared memory/clock, one system"
        },
        "dryRun": {
          "input": "A web search across data centres",
          "steps": [
            "Query hits many independent servers",
            "They exchange messages to combine results",
            "No server sees global memory",
            "User sees one 'search engine'"
          ],
          "result": "Many machines act as one system via messaging"
        },
        "code": null,
        "mistake": "Assuming a shared clock or shared memory — distributed nodes have neither."
      },
      {
        "topic": "Introduction to distributed systems: message movement",
        "terms": [
          "Introduction",
          "distributed",
          "systems",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "introduction-to-distributed-systems-message-move",
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
        "topic": "Resource sharing",
        "terms": [
          "Resource",
          "sharing"
        ],
        "definition": "The primary motivation for distributed systems is resource sharing: hardware (printers, storage), data (files, databases) and services are made available to many users over a network, managed by servers that clients access through a service interface.",
        "takeaway": "Distributed systems exist to SHARE resources — hardware, data, services — via client access to servers.",
        "visual": "resource-sharing",
        "algo": [
          "A resource manager (server) owns a resource",
          "It exposes a service interface",
          "Clients request the resource over the network",
          "The server mediates concurrent, shared access"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Servers share hardware/data/services with clients"
        },
        "dryRun": {
          "input": "a shared printer service",
          "steps": [
            "Print server manages the printer",
            "Clients submit jobs over the network",
            "Server queues and serializes them",
            "One printer shared by many users"
          ],
          "result": "A single resource safely shared among clients"
        },
        "code": null,
        "mistake": "Ignoring that shared access needs a manager to handle concurrency and protection."
      },
      {
        "topic": "Resource sharing: message movement",
        "terms": [
          "Resource",
          "sharing",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "resource-sharing-message-movement",
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
        "topic": "Challenges",
        "terms": [
          "Challenges"
        ],
        "definition": "Coulouris lists the key challenges: heterogeneity (different hardware/OS/networks), openness (published interfaces), security, scalability, failure handling (partial failure), concurrency, transparency, and quality of service. Each must be designed for explicitly.",
        "takeaway": "Design for: heterogeneity, openness, security, scalability, failure handling, concurrency, transparency, QoS.",
        "visual": "challenges",
        "algo": [
          "Mask heterogeneity (middleware, standards)",
          "Handle partial failure — some parts fail, others run",
          "Scale without bottlenecks",
          "Provide transparency so complexity is hidden"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "heterogeneity·openness·security·scale·failure·concurrency·transparency·QoS"
        },
        "dryRun": {
          "input": "a node crashes mid-request",
          "steps": [
            "Partial failure: only that node is down",
            "Others keep serving",
            "System detects and reroutes",
            "User ideally unaffected (transparency)"
          ],
          "result": "The system tolerates the failure of one part"
        },
        "code": null,
        "mistake": "Treating failure as all-or-nothing — distributed systems face PARTIAL failure."
      },
      {
        "topic": "Challenges: message movement",
        "terms": [
          "Challenges",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "challenges-message-movement",
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
        "topic": "Request-reply protocols",
        "terms": [
          "Request-reply",
          "protocols"
        ],
        "definition": "Request-reply is the basic client-server communication pattern built on message passing: the client does doOperation (send request, block for reply), the server getRequest, executes, sendReply. It underpins RPC/RMI and must handle lost messages (timeouts, retransmission, duplicate filtering).",
        "takeaway": "doOperation → getRequest → execute → sendReply; add timeouts + duplicate filtering for lost messages.",
        "visual": "request-reply-protocols",
        "algo": [
          "Client doOperation: send request, await reply",
          "Server getRequest, executes the operation",
          "Server sendReply back to the client",
          "Timeouts + request IDs handle loss/duplicates"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Client-server exchange; timeouts+IDs for loss"
        },
        "dryRun": {
          "input": "read a remote value",
          "steps": [
            "Client sends request (id=42)",
            "Server receives, reads the value",
            "Server replies with the value + id 42",
            "If no reply, client retransmits id 42 (server filters duplicates)"
          ],
          "result": "Reliable request/reply over unreliable messages"
        },
        "code": null,
        "mistake": "Ignoring lost/duplicate messages — request-reply must use timeouts and request IDs."
      },
      {
        "topic": "Request-reply protocols: message movement",
        "terms": [
          "Request-reply",
          "protocols",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "request-reply-protocols-message-movement",
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
        "topic": "Remote procedure call",
        "terms": [
          "Remote",
          "procedure",
          "call"
        ],
        "definition": "RPC makes a call to a remote procedure look like a local one. The client stub marshals arguments into a message; it travels over the network to the server stub, which unmarshals and calls the real procedure; the result returns the same way. Stubs hide marshalling and communication.",
        "takeaway": "RPC: client → client stub (marshal) → network → server stub (unmarshal) → procedure → result back. Stubs hide the network.",
        "visual": "remote-procedure-call",
        "algo": [
          "Client calls a local stub",
          "Stub marshals arguments into a request message",
          "Server stub unmarshals and calls the procedure",
          "Result marshalled and returned to the client"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Local-looking call; stubs marshal over the network"
        },
        "dryRun": {
          "input": "add(2,3) on a remote server",
          "steps": [
            "Client calls add(2,3) → client stub",
            "Stub sends {add,2,3} over the network",
            "Server stub calls add → 5",
            "5 marshalled back to the client"
          ],
          "result": "A local-looking call executed remotely"
        },
        "code": null,
        "mistake": "Assuming RPC has exactly local semantics — network failures give at-least/at-most-once, not exactly-once, guarantees."
      },
      {
        "topic": "Remote procedure call: message movement",
        "terms": [
          "Remote",
          "procedure",
          "call",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "remote-procedure-call-message-movement",
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
        "topic": "Remote method invocation",
        "terms": [
          "Remote",
          "method",
          "invocation"
        ],
        "definition": "RMI extends RPC to objects: a client invokes a METHOD on a remote object using a remote object reference. A proxy (client-side stub) forwards the invocation to the remote object via the same request-reply path; it adds object references, remote interfaces and distributed garbage collection.",
        "takeaway": "RMI = RPC for objects: invoke a method via a remote reference and a proxy; adds remote object references.",
        "visual": "remote-method-invocation",
        "algo": [
          "Client holds a remote object reference",
          "Calls a method on the local proxy",
          "Proxy marshals + sends via request-reply",
          "Skeleton invokes the real object's method; result returns"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Method invocation via remote reference; RPC for objects"
        },
        "dryRun": {
          "input": "account.deposit(100) remotely",
          "steps": [
            "Client has a reference to the remote account",
            "Calls deposit(100) on the proxy",
            "Message reaches the server object",
            "deposit runs; new balance returned"
          ],
          "result": "A method invoked on a remote object as if local"
        },
        "code": null,
        "mistake": "Confusing RMI (object methods + references) with plain RPC (standalone procedures)."
      },
      {
        "topic": "Remote method invocation: message movement",
        "terms": [
          "Remote",
          "method",
          "invocation",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "remote-method-invocation-message-movement",
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
        "label": "Introduction to distributed systems",
        "bigO": "message-passing only",
        "why": "Independent nodes, no shared memory/clock, one system"
      },
      {
        "label": "Introduction to distributed systems: message movement",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Resource sharing",
        "bigO": "client↔server share",
        "why": "Servers share hardware/data/services with clients"
      },
      {
        "label": "Resource sharing: message movement",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Challenges",
        "bigO": "8 challenges",
        "why": "heterogeneity·openness·security·scale·failure·concurrency·transparency·QoS"
      }
    ]
  },
  {
    "n": 2,
    "id": "module-2",
    "title": "Distributed File Systems and Name Services",
    "hours": 8,
    "question": "How are remote files and names resolved?",
    "story": [
      "DFS",
      "File service",
      "DNS",
      "Directory"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Distributed file systems",
      "Distributed file systems: message movement",
      "File service architecture",
      "File service architecture: message movement",
      "Name services",
      "Name services: message movement",
      "Domain Name System",
      "Domain Name System: message movement",
      "Directory services",
      "Directory services: message movement"
    ],
    "notes": "Aligned to BCS515D Module_2 PPTX + VTU 5th sem syllabus.",
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
        "topic": "Distributed file systems",
        "terms": [
          "Distributed",
          "file",
          "systems"
        ],
        "definition": "A distributed file system lets clients access files stored on remote servers as if local, over the network. Key goals: access/location transparency, and good performance via client caching. It separates the flat file service, directory service and client module.",
        "takeaway": "DFS = network file access with transparency + caching; client module ↔ file service ↔ directory service.",
        "visual": "distributed-file-systems",
        "algo": [
          "Client module presents a normal file API",
          "Directory service maps names → file ids",
          "Flat file service reads/writes file contents",
          "Caching at the client cuts network traffic"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Transparent remote file access + client caching"
        },
        "dryRun": {
          "input": "open /home/anita/report over NFS",
          "steps": [
            "Client module intercepts open",
            "Directory service resolves the name → file id",
            "File service transfers blocks",
            "Client caches them for reuse"
          ],
          "result": "Remote file used as if it were local"
        },
        "code": null,
        "mistake": "Ignoring cache consistency — cached copies can go stale versus the server."
      },
      {
        "topic": "Distributed file systems: message movement",
        "terms": [
          "Distributed",
          "file",
          "systems",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "distributed-file-systems-message-movement",
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
        "topic": "File service architecture",
        "terms": [
          "File",
          "service",
          "architecture"
        ],
        "definition": "Coulouris's file-service architecture has three components: the flat file service (operations on file contents by unique file id — read, write, create, using stateless, idempotent operations), the directory service (maps text names to file ids), and the client module (integrates them behind the OS file interface).",
        "takeaway": "Three parts: flat file service (contents by id, stateless), directory service (name→id), client module (glue).",
        "visual": "file-service-architecture",
        "algo": [
          "Directory service: name → unique file id",
          "Flat file service: read/write by id (stateless, idempotent)",
          "Client module: presents the standard file API",
          "Statelessness aids failure recovery"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Contents by id (stateless) · name→id · client glue"
        },
        "dryRun": {
          "input": "read a named file",
          "steps": [
            "Client module gets the pathname",
            "Directory service returns the file id",
            "Flat file service reads by id + offset",
            "Stateless op can be safely retried"
          ],
          "result": "Name resolved, content fetched by id"
        },
        "code": null,
        "mistake": "Making the flat file service stateful, which complicates recovery after a server crash."
      },
      {
        "topic": "File service architecture: message movement",
        "terms": [
          "File",
          "service",
          "architecture",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "file-service-architecture-message-movement",
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
        "topic": "Name services",
        "terms": [
          "Name",
          "services"
        ],
        "definition": "A name service stores a collection of name→attribute bindings (e.g. a name → address) and resolves names for clients. It provides name resolution, and supports a structured name space; requirements include scalability, availability and consistent bindings.",
        "takeaway": "A name service binds names to attributes and RESOLVES names to values for clients; must scale and stay available.",
        "visual": "name-services",
        "algo": [
          "Names are bound to attributes/addresses",
          "Client submits a name to resolve",
          "Service looks up the binding",
          "Returns the attribute (e.g. an address)"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Store bindings; resolve names to values"
        },
        "dryRun": {
          "input": "resolve a service name",
          "steps": [
            "Client asks for 'mail.uni.edu'",
            "Name service looks up the binding",
            "Returns the host address",
            "Client connects using it"
          ],
          "result": "Human name resolved to a machine attribute"
        },
        "code": null,
        "mistake": "Assuming one central name server — real name services are partitioned and replicated to scale."
      },
      {
        "topic": "Name services: message movement",
        "terms": [
          "Name",
          "services",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "name-services-message-movement",
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
        "topic": "Domain Name System",
        "terms": [
          "Domain",
          "Name",
          "System"
        ],
        "definition": "DNS is the Internet's hierarchical, distributed name service. The name space is partitioned into zones served by name servers; resolution is iterative/recursive: a resolver queries from the root down (root → TLD → authoritative), and results are cached with a TTL to cut traffic.",
        "takeaway": "DNS resolves names by walking the hierarchy root → TLD → authoritative, with TTL-based caching.",
        "visual": "domain-name-system",
        "algo": [
          "Resolver queries a name server",
          "Referred down: root → .edu → uni.edu",
          "Authoritative server returns the address",
          "Answer cached until its TTL expires"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Hierarchical zones; iterative resolution + TTL cache"
        },
        "dryRun": {
          "input": "resolve www.uni.edu",
          "steps": [
            "Ask root → referral to .edu server",
            "Ask .edu → referral to uni.edu server",
            "uni.edu returns www's IP",
            "Cache it for the TTL"
          ],
          "result": "Address obtained by descending the DNS hierarchy"
        },
        "code": null,
        "mistake": "Thinking DNS is one big server — it is a partitioned, replicated, cached hierarchy."
      },
      {
        "topic": "Domain Name System: message movement",
        "terms": [
          "Domain",
          "Name",
          "System",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "domain-name-system-message-movement",
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
        "topic": "Directory services",
        "terms": [
          "Directory",
          "services"
        ],
        "definition": "A directory service resolves ATTRIBUTES to names/objects — the reverse of a name service: 'find objects with these properties' (a yellow-pages lookup), rather than 'resolve this name'. Examples: X.500/LDAP. It supports attribute-based search over stored entries.",
        "takeaway": "Directory service = attribute-based (yellow-pages) lookup: find objects by their properties (LDAP/X.500).",
        "visual": "directory-services",
        "algo": [
          "Entries stored with attributes",
          "Client queries by desired attributes",
          "Service searches matching entries",
          "Returns the matching names/objects"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Yellow-pages search by property (LDAP/X.500)"
        },
        "dryRun": {
          "input": "find all colour printers on floor 3",
          "steps": [
            "Query attributes: type=printer, colour=yes, floor=3",
            "Directory searches entries",
            "Matches returned",
            "Client picks one"
          ],
          "result": "Objects found by properties, not by name"
        },
        "code": null,
        "mistake": "Confusing a directory service (attributes→objects) with a name service (name→attributes)."
      },
      {
        "topic": "Directory services: message movement",
        "terms": [
          "Directory",
          "services",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "directory-services-message-movement",
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
        "label": "Distributed file systems",
        "bigO": "client↔file↔dir svc",
        "why": "Transparent remote file access + client caching"
      },
      {
        "label": "Distributed file systems: message movement",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "File service architecture",
        "bigO": "flat+dir+client",
        "why": "Contents by id (stateless) · name→id · client glue"
      },
      {
        "label": "File service architecture: message movement",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Name services",
        "bigO": "name→attribute",
        "why": "Store bindings; resolve names to values"
      }
    ]
  },
  {
    "n": 3,
    "id": "module-3",
    "title": "Time and Global States",
    "hours": 8,
    "question": "How do we reason about time and snapshots without a global clock?",
    "story": [
      "Clocks",
      "Sync",
      "Logical",
      "Snapshot"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Clocks events and process states",
      "Clocks events and process states: message movement",
      "Synchronizing physical clocks",
      "Synchronizing physical clocks: message movement",
      "Logical time",
      "Logical time: message movement",
      "Logical clocks",
      "Logical clocks: message movement",
      "Global states",
      "Global states: message movement"
    ],
    "notes": "Aligned to BCS515D Module_3 PPTX + VTU 5th sem syllabus.",
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
        "topic": "Clocks events and process states",
        "terms": [
          "Clocks",
          "events",
          "process"
        ],
        "definition": "Each process has a local state and executes a sequence of events (internal, send, receive), giving a local history. There is no global clock, so we reason about ordering via the happens-before relation rather than real time; a global state is a consistent combination of local states.",
        "takeaway": "Processes have local histories of events; with no global clock, order events by happens-before, not real time.",
        "visual": "clocks-events-and-process-states",
        "algo": [
          "Each process runs a sequence of events",
          "Events: internal, send, receive",
          "No shared clock to timestamp them globally",
          "Order via happens-before (→)"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "No global clock; order by happens-before"
        },
        "dryRun": {
          "input": "two processes exchanging a message",
          "steps": [
            "P1 does event a, then sends m",
            "P2 receives m as event b",
            "a → b (send before receive)",
            "Order known without a global clock"
          ],
          "result": "Causal order established from send/receive"
        },
        "code": null,
        "mistake": "Assuming events across processes can be ordered by wall-clock time — clocks disagree."
      },
      {
        "topic": "Clocks events and process states: message movement",
        "terms": [
          "Clocks",
          "events",
          "and",
          "process"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "clocks-events-and-process-states-message-movemen",
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
        "topic": "Synchronizing physical clocks",
        "terms": [
          "Synchronizing",
          "physical",
          "clocks"
        ],
        "definition": "Physical clocks drift apart, so distributed nodes synchronize them. Cristian's algorithm asks a time server and corrects for round-trip delay; the Berkeley algorithm averages clocks; NTP synchronizes hierarchically over the Internet. Bounds exist because message delay is variable.",
        "takeaway": "Clocks drift; sync via Cristian (server+RTT), Berkeley (averaging) or NTP (hierarchical). Delay limits accuracy.",
        "visual": "synchronizing-physical-clocks",
        "algo": [
          "Clocks drift at different rates",
          "Cristian: request time, adjust by RTT/2",
          "Berkeley: master averages slaves' clocks",
          "NTP: layered servers sync over the Internet"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Correct drift; RTT limits achievable accuracy"
        },
        "dryRun": {
          "input": "Cristian's algorithm",
          "steps": [
            "Client requests time at T0",
            "Server replies t; client receives at T1",
            "Estimate = t + (T1−T0)/2",
            "Client sets its clock to the estimate"
          ],
          "result": "Client clock corrected for network delay"
        },
        "code": null,
        "mistake": "Ignoring round-trip delay, so the received timestamp is already stale."
      },
      {
        "topic": "Synchronizing physical clocks: message movement",
        "terms": [
          "Synchronizing",
          "physical",
          "clocks",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "synchronizing-physical-clocks-message-movement",
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
        "topic": "Logical time",
        "terms": [
          "Logical",
          "time"
        ],
        "definition": "Logical time orders events by CAUSALITY, not real time, using Lamport's happens-before (→): (1) events in one process are ordered; (2) a send happens-before its receive; (3) → is transitive. Events not related by → are concurrent. This captures the only ordering distributed systems can agree on.",
        "takeaway": "Happens-before (→): same-process order, send→receive, transitive; unrelated events are concurrent.",
        "visual": "logical-time",
        "algo": [
          "Within a process, events are ordered a → b",
          "A send happens-before its matching receive",
          "→ is transitive (a→b, b→c ⇒ a→c)",
          "No → either way ⇒ concurrent"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Causal partial order; unrelated = concurrent"
        },
        "dryRun": {
          "input": "is event x before y?",
          "steps": [
            "x, y in the same process, x first → x→y",
            "Or x is a send, y its receive → x→y",
            "Chain via transitivity",
            "Else x and y are concurrent"
          ],
          "result": "Causal order (or concurrency) determined by →"
        },
        "code": null,
        "mistake": "Treating concurrent events as ordered — → is a partial order, not total."
      },
      {
        "topic": "Logical time: message movement",
        "terms": [
          "Logical",
          "time",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "logical-time-message-movement",
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
        "topic": "Logical clocks",
        "terms": [
          "Logical",
          "clocks"
        ],
        "definition": "A Lamport logical clock is a per-process counter Ci that timestamps events consistently with happens-before. Rules: increment Ci before each event; a message carries its sender's timestamp t; on receive set Ci = max(Ci, t) + 1. Then a → b ⇒ C(a) < C(b) (the converse need not hold).",
        "takeaway": "Lamport clock: Ci++ before an event; send carries t; on receive Ci = max(Ci,t)+1. a→b ⇒ C(a)<C(b).",
        "visual": "logical-clocks",
        "algo": [
          "Before each event: Ci = Ci + 1",
          "On send: timestamp the message with Ci",
          "On receive of t: Ci = max(Ci, t) + 1",
          "Guarantees a → b ⇒ C(a) < C(b)"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Counter respecting happens-before; converse not guaranteed"
        },
        "dryRun": {
          "input": "P1 sends to P2 (P1=3, P2=1)",
          "steps": [
            "P1 event: C1 = 3+1 = 4, send t=4",
            "P2 receives t=4 while C2=1",
            "C2 = max(1,4)+1 = 5",
            "Receive (5) > send (4): causal order preserved"
          ],
          "result": "Message receive timestamp exceeds the send timestamp"
        },
        "code": null,
        "mistake": "Concluding causality from C(a)<C(b) — ordered timestamps don't imply a happens-before relation."
      },
      {
        "topic": "Logical clocks: message movement",
        "terms": [
          "Logical",
          "clocks",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "logical-clocks-message-movement",
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
        "topic": "Global states",
        "terms": [
          "Global",
          "states"
        ],
        "definition": "A global state is the set of all process states plus the messages in transit on channels. A CONSISTENT global snapshot (Chandra–Lamport) never records a message as received without recording its send; it is captured with marker messages without stopping the system, to detect stable properties (deadlock, termination).",
        "takeaway": "Global state = process states + channel (in-transit) messages; the Chandy–Lamport marker snapshot is consistent.",
        "visual": "global-states",
        "algo": [
          "An initiator records its state, sends a marker on each channel",
          "On first marker, a process records its state",
          "It records incoming messages until each channel's marker arrives",
          "Snapshot = states + recorded channel messages"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Chandy–Lamport markers give a consistent snapshot"
        },
        "dryRun": {
          "input": "snapshot two processes + a channel",
          "steps": [
            "P1 records its state, sends marker to P2",
            "P2 records its state on receiving the marker",
            "Channel P1→P2 recorded empty; other channels record in-transit msgs",
            "Consistent cut assembled"
          ],
          "result": "A consistent snapshot taken without halting the system"
        },
        "code": null,
        "mistake": "Recording a receive without its send (an inconsistent cut) — the marker protocol prevents this."
      },
      {
        "topic": "Global states: message movement",
        "terms": [
          "Global",
          "states",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "global-states-message-movement",
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
        "label": "Clocks events and process states",
        "bigO": "local histories",
        "why": "No global clock; order by happens-before"
      },
      {
        "label": "Clocks events and process states: message movement",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Synchronizing physical clocks",
        "bigO": "Cristian/Berkeley/NTP",
        "why": "Correct drift; RTT limits achievable accuracy"
      },
      {
        "label": "Synchronizing physical clocks: message movement",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Logical time",
        "bigO": "happens-before →",
        "why": "Causal partial order; unrelated = concurrent"
      }
    ]
  },
  {
    "n": 4,
    "id": "module-4",
    "title": "Coordination and Agreement",
    "hours": 8,
    "question": "How do nodes elect, exclude and agree?",
    "story": [
      "Mutex",
      "Election",
      "Consensus",
      "Groups"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Distributed mutual exclusion",
      "Distributed mutual exclusion: message movement",
      "Elections",
      "Elections: message movement",
      "Group communication coordination",
      "Group communication coordination: message movement",
      "Consensus",
      "Consensus: message movement",
      "Related agreement problems",
      "Related agreement problems: message movement"
    ],
    "notes": "Aligned to BCS515D Module_4 PPTX + VTU 5th sem syllabus.",
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
        "topic": "Distributed mutual exclusion",
        "terms": [
          "Distributed",
          "mutual",
          "exclusion"
        ],
        "definition": "Distributed mutual exclusion ensures at most one process is in the critical section, with no shared memory. Approaches: central server (a coordinator grants a token), a token ring, and Ricart–Agrawala (multicast timestamped requests; enter after all reply). Requirements: safety, liveness, ordering.",
        "takeaway": "One process in the CS at a time, no shared memory: central-server, token-ring, or Ricart–Agrawala (timestamped multicast).",
        "visual": "distributed-mutual-exclusion",
        "algo": [
          "Process wanting the CS requests permission",
          "Central: coordinator grants a token to one",
          "Ricart–Agrawala: multicast a timestamped request, wait for all replies",
          "Release: pass token / send deferred replies"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "One-in-CS via server/token/timestamped multicast"
        },
        "dryRun": {
          "input": "two processes want the CS",
          "steps": [
            "Both multicast timestamped requests",
            "Lower timestamp wins priority",
            "Higher-timestamp process defers its reply",
            "Winner enters; on exit it replies, letting the other in"
          ],
          "result": "Exactly one process in the critical section"
        },
        "code": null,
        "mistake": "Using timestamps without a tie-breaker (process id), so equal timestamps deadlock."
      },
      {
        "topic": "Distributed mutual exclusion: message movement",
        "terms": [
          "Distributed",
          "mutual",
          "exclusion",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "distributed-mutual-exclusion-message-movement",
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
        "topic": "Elections",
        "terms": [
          "Elections"
        ],
        "definition": "An election algorithm chooses a unique coordinator (usually the process with the highest id) after the old one fails. The Bully algorithm: a process notices the failure, sends ELECTION to higher-id processes; if none answer it becomes coordinator (COORDINATOR broadcast); the Ring algorithm circulates ids around a ring.",
        "takeaway": "Elect a unique coordinator (highest id): Bully (challenge higher ids, highest wins) or Ring (circulate ids).",
        "visual": "elections",
        "algo": [
          "A process detects the coordinator has failed",
          "Bully: send ELECTION to all higher ids",
          "If none respond, declare self coordinator",
          "Announce COORDINATOR to all"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Bully (challenge higher) / Ring (circulate) elect one coordinator"
        },
        "dryRun": {
          "input": "coordinator (id 7) fails, ids 1..6 alive",
          "steps": [
            "Process 4 starts an election, messages 5,6",
            "6 responds and starts its own election",
            "No higher id answers 6",
            "6 becomes coordinator, broadcasts it"
          ],
          "result": "Highest live id (6) becomes the new coordinator"
        },
        "code": null,
        "mistake": "Ending up with two coordinators — the algorithm must ensure a single, agreed winner."
      },
      {
        "topic": "Elections: message movement",
        "terms": [
          "Elections",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "elections-message-movement",
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
        "topic": "Group communication coordination",
        "terms": [
          "Group",
          "communication",
          "coordination"
        ],
        "definition": "Group (multicast) communication delivers a message to all members of a group with ordering/reliability guarantees: reliable multicast (all-or-none delivery), and ordering — FIFO, causal (respects happens-before), or total (all deliver in the same order). Used for replication and coordination.",
        "takeaway": "Multicast to a group with guarantees: reliable delivery + ordering (FIFO / causal / total).",
        "visual": "group-communication-coordination",
        "algo": [
          "Message multicast to all group members",
          "Reliable: all correct members deliver, or none",
          "Ordered: FIFO, causal, or total order",
          "Members act on a consistent message sequence"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Group delivery; FIFO/causal/total ordering"
        },
        "dryRun": {
          "input": "totally-ordered multicast of two updates",
          "steps": [
            "Updates U1, U2 multicast to replicas",
            "Total order: every replica delivers U1 then U2",
            "No replica sees U2 before U1",
            "Replicas stay consistent"
          ],
          "result": "All members apply updates in the same order"
        },
        "code": null,
        "mistake": "Assuming multicast is automatically ordered/reliable — those are guarantees you must provide."
      },
      {
        "topic": "Group communication coordination: message movement",
        "terms": [
          "Group",
          "communication",
          "coordination",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "group-communication-coordination-message-movemen",
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
        "topic": "Consensus",
        "terms": [
          "Consensus"
        ],
        "definition": "Consensus is agreement among processes on a single value despite failures: every correct process decides the SAME value (agreement), that value was proposed by someone (integrity/validity), and all correct processes eventually decide (termination). The FLP result shows it's impossible in a purely asynchronous system with even one crash.",
        "takeaway": "All correct processes agree on one proposed value (agreement+validity+termination); FLP: impossible in pure async with one failure.",
        "visual": "consensus",
        "algo": [
          "Each process proposes a value",
          "Processes exchange proposals",
          "They converge on one agreed value",
          "Correct processes all decide it"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Agreement+validity+termination; FLP async limit"
        },
        "dryRun": {
          "input": "three nodes propose 1,1,0",
          "steps": [
            "Values exchanged among nodes",
            "Apply the agreement rule (e.g. majority)",
            "All decide 1",
            "Every correct node holds the same decision"
          ],
          "result": "A single value agreed despite disagreement/failures"
        },
        "code": null,
        "mistake": "Expecting guaranteed consensus in a fully asynchronous system with failures (FLP impossibility)."
      },
      {
        "topic": "Consensus: message movement",
        "terms": [
          "Consensus",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "consensus-message-movement",
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
        "topic": "Related agreement problems",
        "terms": [
          "Related",
          "agreement",
          "problems"
        ],
        "definition": "Consensus relates to Byzantine generals (agreement despite ARBITRARY/malicious failures — needs > 3f nodes to tolerate f traitors), interactive consistency (agree on a vector of values), and atomic (total-order) broadcast. They are inter-reducible variants of the agreement problem.",
        "takeaway": "Agreement family: consensus, Byzantine generals (needs 3f+1 for f faults), interactive consistency, total-order broadcast.",
        "visual": "related-agreement-problems",
        "algo": [
          "Consensus: agree on one value (crash faults)",
          "Byzantine: tolerate arbitrary/malicious faults (need >3f)",
          "Interactive consistency: agree on a vector",
          "Atomic broadcast reduces to consensus"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Consensus variants; Byzantine tolerates f of 3f+1"
        },
        "dryRun": {
          "input": "tolerate 1 Byzantine node",
          "steps": [
            "Faults f = 1",
            "Need 3f+1 = 4 nodes",
            "With 4, loyal majority overrides the traitor",
            "Agreement reached"
          ],
          "result": "4 nodes tolerate 1 arbitrary fault"
        },
        "code": null,
        "mistake": "Applying crash-fault consensus counts to Byzantine faults — Byzantine needs the 3f+1 bound."
      },
      {
        "topic": "Related agreement problems: message movement",
        "terms": [
          "Related",
          "agreement",
          "problems",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "related-agreement-problems-message-movement",
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
        "label": "Distributed mutual exclusion",
        "bigO": "safety+liveness",
        "why": "One-in-CS via server/token/timestamped multicast"
      },
      {
        "label": "Distributed mutual exclusion: message movement",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Elections",
        "bigO": "highest id wins",
        "why": "Bully (challenge higher) / Ring (circulate) elect one coordinator"
      },
      {
        "label": "Elections: message movement",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Group communication coordination",
        "bigO": "reliable+ordered",
        "why": "Group delivery; FIFO/causal/total ordering"
      }
    ]
  },
  {
    "n": 5,
    "id": "module-5",
    "title": "Transactions and Replication",
    "hours": 8,
    "question": "How do distributed transactions and replicas stay consistent?",
    "story": [
      "Transactions",
      "Commit",
      "Deadlock",
      "Replication"
    ],
    "syllabus": [
      "Start with why the module matters.",
      "Flat distributed transactions",
      "Flat distributed transactions: message movement",
      "Nested distributed transactions",
      "Nested distributed transactions: message movement",
      "Atomic commit protocols",
      "Atomic commit protocols: message movement",
      "Concurrency control",
      "Concurrency control: message movement",
      "Distributed deadlocks",
      "Distributed deadlocks: message movement",
      "Transaction recovery",
      "Transaction recovery: message movement",
      "Replication",
      "Replication: message movement"
    ],
    "notes": "Aligned to BCS515D Module_5 PPTX + VTU 5th sem syllabus.",
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
        "topic": "Flat distributed transactions",
        "terms": [
          "Flat",
          "distributed",
          "transactions"
        ],
        "definition": "A distributed transaction accesses objects on multiple servers with ACID guarantees. A FLAT transaction issues its operations in sequence, committing or aborting as one unit across all servers; a coordinator drives atomic commit so either all servers commit or all abort.",
        "takeaway": "Flat distributed transaction = one sequence of operations across servers, committed/aborted atomically as a whole.",
        "visual": "flat-distributed-transactions",
        "algo": [
          "Client begins a transaction (a coordinator)",
          "It issues operations to several servers",
          "All work is provisional until commit",
          "Coordinator runs atomic commit: all commit or all abort"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "One flat sequence across servers; atomic commit"
        },
        "dryRun": {
          "input": "transfer between two banks' servers",
          "steps": [
            "Debit at server A, credit at server B",
            "Both provisional",
            "Coordinator commits both atomically",
            "Or aborts both on any failure"
          ],
          "result": "Multi-server update is all-or-nothing"
        },
        "code": null,
        "mistake": "Letting one server commit while another aborts — atomic commit must keep them together."
      },
      {
        "topic": "Flat distributed transactions: message movement",
        "terms": [
          "Flat",
          "distributed",
          "transactions",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "flat-distributed-transactions-message-movement",
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
        "topic": "Nested distributed transactions",
        "terms": [
          "Nested",
          "distributed",
          "transactions"
        ],
        "definition": "A nested transaction is structured as a tree of sub-transactions. Sub-transactions can commit or abort INDEPENDENTLY and run concurrently; a sub-transaction's commit is provisional until its parent commits, and a parent may abort even if a child committed. This adds modularity and partial recovery.",
        "takeaway": "Nested = tree of sub-transactions; children commit provisionally, only final when the top-level (parent) commits.",
        "visual": "nested-distributed-transactions",
        "algo": [
          "Top-level transaction spawns sub-transactions",
          "Sub-transactions run concurrently, commit/abort independently",
          "A child's commit is provisional",
          "Effects final only when the top-level commits"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Independent children; final on top-level commit"
        },
        "dryRun": {
          "input": "a trip booking (flight+hotel subtxns)",
          "steps": [
            "Flight subtxn commits provisionally",
            "Hotel subtxn aborts (no rooms)",
            "Parent may retry hotel or abort all",
            "Final outcome decided at the top level"
          ],
          "result": "Sub-transactions give partial, modular recovery"
        },
        "code": null,
        "mistake": "Treating a child's provisional commit as final before the parent commits."
      },
      {
        "topic": "Nested distributed transactions: message movement",
        "terms": [
          "Nested",
          "distributed",
          "transactions",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "nested-distributed-transactions-message-movement",
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
        "topic": "Atomic commit protocols",
        "terms": [
          "Atomic",
          "commit",
          "protocols"
        ],
        "definition": "Two-phase commit (2PC) makes a distributed transaction atomic. Phase 1 (voting): the coordinator sends canCommit/PREPARE; each participant votes YES (and prepares, durably) or NO. Phase 2 (decision): if all voted YES the coordinator sends COMMIT, else ABORT; participants act and acknowledge. A YES vote is a promise a participant cannot retract.",
        "takeaway": "2PC: Phase 1 PREPARE → participants vote YES/NO; Phase 2 COMMIT if all YES, else ABORT. YES is a binding promise.",
        "visual": "atomic-commit-protocols",
        "algo": [
          "Phase 1: coordinator sends PREPARE to all",
          "Each participant votes YES (prepared) or NO",
          "Phase 2: all YES → send COMMIT; any NO → send ABORT",
          "Participants act and acknowledge"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Atomic: commit only if all vote YES; else abort"
        },
        "dryRun": {
          "input": "commit across 3 participants",
          "steps": [
            "Coordinator: PREPARE to P1,P2,P3",
            "P1,P2 vote YES; P3 votes NO",
            "Decision = ABORT (not unanimous)",
            "Coordinator sends ABORT to all; all roll back"
          ],
          "result": "One NO vote aborts the whole transaction"
        },
        "code": null,
        "mistake": "Ignoring 2PC's blocking problem — if the coordinator crashes after PREPARE, prepared participants block awaiting the decision."
      },
      {
        "topic": "Atomic commit protocols: message movement",
        "terms": [
          "Atomic",
          "commit",
          "protocols",
          "message"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "atomic-commit-protocols-message-movement",
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
        "topic": "Concurrency control",
        "terms": [
          "Concurrency",
          "control"
        ],
        "definition": "Concurrency control keeps concurrent distributed transactions serializable (equivalent to some serial order). Mechanisms: two-phase LOCKING (acquire locks in a growing phase, release in a shrinking phase; strict 2PL holds to commit), timestamp ordering, and optimistic validation. Applied across all participating servers.",
        "takeaway": "Keep transactions serializable via two-phase locking (grow then shrink), timestamp ordering, or optimistic validation.",
        "visual": "concurrency-control",
        "algo": [
          "2PL: acquire all needed locks (growing phase)",
          "No new locks after the first release (shrinking phase)",
          "Strict 2PL holds locks until commit",
          "Or use timestamp ordering / validation instead"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Serializable via locking/timestamps/validation"
        },
        "dryRun": {
          "input": "two transactions on one object",
          "steps": [
            "T1 locks object X",
            "T2's access to X blocks",
            "T1 commits, releases the lock",
            "T2 proceeds — serial-equivalent order"
          ],
          "result": "Interleaving kept equivalent to a serial schedule"
        },
        "code": null,
        "mistake": "Releasing a lock then acquiring another (violating 2PL), which breaks serializability."
      },
      {
        "topic": "Concurrency control: message movement",
        "terms": [
          "Concurrency",
          "control",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "concurrency-control-message-movement",
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
        "topic": "Distributed deadlocks",
        "terms": [
          "Distributed",
          "deadlocks"
        ],
        "definition": "A distributed deadlock is a cycle of transactions each waiting for a lock held by the next, spanning servers. No single server sees the whole wait-for graph, so detection uses global wait-for graph construction or edge-chasing (probe messages); a cycle means deadlock, broken by aborting a victim.",
        "takeaway": "Deadlock = a cycle in the (global) wait-for graph; detect by combining local graphs or edge-chasing probes, then abort a victim.",
        "visual": "distributed-deadlocks",
        "algo": [
          "Each server tracks local wait-for edges",
          "Combine into a global wait-for graph (or send probes)",
          "A cycle T1→T2→…→T1 means deadlock",
          "Abort one transaction (victim) to break it"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Global graph / edge-chasing; abort a victim"
        },
        "dryRun": {
          "input": "T1 waits for T2, T2 waits for T1 across servers",
          "steps": [
            "Server A: edge T1→T2",
            "Server B: edge T2→T1",
            "Combined graph has a cycle",
            "Abort T2 → cycle broken, T1 proceeds"
          ],
          "result": "Cross-server cycle detected and broken"
        },
        "code": null,
        "mistake": "Detecting phantom deadlocks from a stale/inconsistent global graph, aborting transactions needlessly."
      },
      {
        "topic": "Distributed deadlocks: message movement",
        "terms": [
          "Distributed",
          "deadlocks",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "distributed-deadlocks-message-movement",
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
        "topic": "Transaction recovery",
        "terms": [
          "Transaction",
          "recovery"
        ],
        "definition": "Recovery makes committed effects durable and aborted effects vanish despite crashes. A recovery manager uses a write-ahead LOG (and/or shadow copies) plus checkpoints; on restart it redoes committed transactions and undoes uncommitted ones, restoring a consistent state (the D and A of ACID).",
        "takeaway": "Recovery = write-ahead log + checkpoints; on restart, REDO committed and UNDO uncommitted transactions.",
        "visual": "transaction-recovery",
        "algo": [
          "Log intentions before applying them (write-ahead)",
          "Take periodic checkpoints",
          "On crash restart, scan the log",
          "REDO committed, UNDO uncommitted transactions"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Write-ahead log + checkpoints restore consistency"
        },
        "dryRun": {
          "input": "crash after commit is logged",
          "steps": [
            "Commit record is in the log",
            "Restart scans the log",
            "Transaction is committed → REDO its effects",
            "Uncommitted ones are UNDOne"
          ],
          "result": "Consistent state restored after the crash"
        },
        "code": null,
        "mistake": "Writing data before its log record (violating write-ahead), so recovery can't undo/redo correctly."
      },
      {
        "topic": "Transaction recovery: message movement",
        "terms": [
          "Transaction",
          "recovery",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "transaction-recovery-message-movement",
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
        "topic": "Replication",
        "terms": [
          "Replication"
        ],
        "definition": "Replication keeps copies of data on multiple servers for availability, fault tolerance and performance. Updates must propagate to all replicas while keeping them consistent — via passive (primary-backup: one primary orders updates, backups follow) or active (all replicas process the same totally-ordered requests) replication.",
        "takeaway": "Replicate data for availability/performance; keep replicas consistent via primary-backup or active (total-order) replication.",
        "visual": "replication",
        "algo": [
          "Keep N copies of the data",
          "An update is applied at replicas",
          "Passive: primary orders it, backups apply in order",
          "Active: all replicas apply the same total-order request stream"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Primary-backup or active (total-order) replication"
        },
        "dryRun": {
          "input": "update propagated to 3 replicas",
          "steps": [
            "Client update reaches the primary",
            "Primary applies it, orders it",
            "Update propagated to the two backups",
            "All three converge to the same value"
          ],
          "result": "One update reflected consistently on all replicas"
        },
        "code": null,
        "mistake": "Letting replicas apply updates in different orders, so copies diverge (inconsistency)."
      },
      {
        "topic": "Replication: message movement",
        "terms": [
          "Replication",
          "message",
          "movement"
        ],
        "definition": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "takeaway": "Not rendered — duplicate/opener unit skipped by the deck generator.",
        "visual": "replication-message-movement",
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
        "label": "Flat distributed transactions",
        "bigO": "all-or-nothing",
        "why": "One flat sequence across servers; atomic commit"
      },
      {
        "label": "Flat distributed transactions: message movement",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Nested distributed transactions",
        "bigO": "tree of subtxns",
        "why": "Independent children; final on top-level commit"
      },
      {
        "label": "Nested distributed transactions: message movement",
        "bigO": "—",
        "why": "Not rendered (duplicate/opener)"
      },
      {
        "label": "Atomic commit protocols",
        "bigO": "PREPARE→vote→COMMIT/ABORT",
        "why": "Atomic: commit only if all vote YES; else abort"
      }
    ]
  }
]

export function getModule(n) { return MODULES.find((m) => m.n === n) || null }
export function getDistModule(n) { return getModule(n) }

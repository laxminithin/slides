/** Computer Networks (BCS502) curriculum — concept-specific teaching content.
 * Source scope: Behrouz A. Forouzan, "Data Communications and Networking", 5th ed
 * (prescribed textbook per BCS502 syllabus + finalized 5th_Semester_PPTX).
 * No local textbook PDF was present; content authored to the prescribed-textbook
 * scope. Sentinel ("Start with why") and ":message movement" units are retained
 * as index-holders (skipped at render) so showcase-hero mappings stay aligned.
 */
export const COURSE = {"id":"computer-networks-bcs502","title":"Computer Networks","code":"BCS502","shortTitle":"CN"}
export const MODULES = [
  {
    "n": 1,
    "id": "module-1",
    "title": "Network Foundations and Switching",
    "hours": 8,
    "question": "How does information travel from one host to another?",
    "story": [
      "Message",
      "Layers",
      "Media",
      "Switch"
    ],
    "syllabus": [
      "Data communications",
      "Networks and network types",
      "Protocol layering",
      "TCP/IP protocol suite",
      "OSI model",
      "Transmission media",
      "Guided media",
      "Unguided wireless media",
      "Packet switching and types"
    ],
    "notes": "Aligned to BCS502 Module_1 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Start with why the module matters. is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Start with why the module matters. diagram, label the steps, then explain one example.",
        "visual": "start-with-why-the-module-matters",
        "algo": [
          "Frame the problem Start with why the module matters. solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Start with why the module matters.",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Start with why the module matters. explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Start with why the module matters. as definition-only memorization."
      },
      {
        "topic": "Data communications",
        "terms": [
          "Message",
          "Sender",
          "Receiver",
          "Medium",
          "Protocol"
        ],
        "definition": "Data communication is the exchange of data between two devices over a transmission medium such as a wire. A complete system needs five components: the message, a sender, a receiver, the transmission medium, and a protocol that both ends agree on.",
        "takeaway": "A link only works when sender, receiver, medium and a shared protocol are all present — data alone is not communication.",
        "visual": "data-communications",
        "algo": [
          "Sender encodes the message into signals",
          "Signals travel across the transmission medium",
          "Receiver decodes signals back into the message",
          "Both ends follow the same protocol (rules of format, timing, order)"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Components",
              "v": "5"
            },
            {
              "k": "Delivery",
              "v": "accurate + timely"
            },
            {
              "k": "Effectiveness",
              "v": "jitter-free"
            }
          ],
          "note": "Effectiveness rests on delivery, accuracy, timeliness and low jitter."
        },
        "dryRun": {
          "input": "Alice types \"HI\" to Bob on another machine",
          "steps": [
            "Message = the two characters \"HI\"",
            "Sender (Alice's NIC) encodes them as electrical signals",
            "Medium (cable) carries the signals to Bob",
            "Receiver decodes; the shared protocol fixes bit order and speed"
          ],
          "result": "Bob receives exactly \"HI\" because all five components cooperated"
        },
        "code": null,
        "mistake": "Listing only sender/receiver/medium and forgetting that the protocol and message are also required components."
      },
      {
        "topic": "Data communications: message movement",
        "terms": [
          "Data",
          "communications",
          "message",
          "movement"
        ],
        "definition": "Data communications: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Data communications: message movement diagram, label the steps, then explain one example.",
        "visual": "data-communications-message-movement",
        "algo": [
          "Frame the problem Data communications: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Data communications: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Data communications: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Data communications: message movement as definition-only memorization."
      },
      {
        "topic": "Networks and network types",
        "terms": [
          "LAN",
          "WAN",
          "Topology",
          "Internet",
          "Nodes"
        ],
        "definition": "A network is a set of devices (nodes) connected by links so they can share data. Networks are classified mainly by geographic reach: a LAN spans a room or building and is privately owned, while a WAN spans cities or countries and is often carrier-owned.",
        "takeaway": "Distinguish networks by size and ownership: LAN = small/private, WAN = large/carrier; an internet is a network of networks.",
        "visual": "networks-and-network-types",
        "algo": [
          "Identify the nodes (hosts, routers) and the links between them",
          "Measure geographic reach → LAN, MAN or WAN",
          "Note ownership: private (LAN) vs service-provider (WAN)",
          "Connect multiple networks with routers → an internetwork"
        ],
        "complexity": {
          "cells": [
            {
              "k": "LAN",
              "v": "room/building"
            },
            {
              "k": "WAN",
              "v": "city/country"
            },
            {
              "k": "Internet",
              "v": "net of nets"
            }
          ],
          "note": "The global Internet is the largest example of an internetwork joined by routers."
        },
        "dryRun": {
          "input": "A campus with two buildings linked to the Internet",
          "steps": [
            "Each building's PCs + switch form a LAN",
            "A leased line between buildings extends reach",
            "A router joins the campus to an ISP's WAN",
            "The ISP connects onward to the global Internet"
          ],
          "result": "LANs joined by routers through a WAN become part of the Internet"
        },
        "code": null,
        "mistake": "Calling any large network a \"WAN\" by size alone, ignoring that ownership and the use of routers to join separate networks are the real distinctions."
      },
      {
        "topic": "Networks and network types: message movement",
        "terms": [
          "Networks",
          "and",
          "network",
          "types"
        ],
        "definition": "Networks and network types: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Networks and network types: message movement diagram, label the steps, then explain one example.",
        "visual": "networks-and-network-types-message-movement",
        "algo": [
          "Frame the problem Networks and network types: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Networks and network types: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Networks and network types: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Networks and network types: message movement as definition-only memorization."
      },
      {
        "topic": "Protocol layering",
        "terms": [
          "Layer",
          "Peer",
          "Interface",
          "Service",
          "Modularity"
        ],
        "definition": "Protocol layering splits communication into an ordered stack of layers, each with one well-defined job. A layer uses the service of the layer below and provides a service to the layer above; logically it talks to its peer layer on the other host.",
        "takeaway": "Each layer does one job and talks to its peer; changing one layer never forces a change in the others.",
        "visual": "protocol-layering",
        "algo": [
          "Split the whole task into single-purpose layers",
          "Each layer offers a service to the layer above it",
          "Each layer consumes the service of the layer below it",
          "Layer N on the sender logically communicates with layer N on the receiver (peers)"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Principle",
              "v": "one job / layer"
            },
            {
              "k": "Talks to",
              "v": "peer layer"
            },
            {
              "k": "Benefit",
              "v": "swap layers freely"
            }
          ],
          "note": "Layering gives modularity — Wi-Fi vs Ethernet changes only the lowest layers."
        },
        "dryRun": {
          "input": "Switching a host from Ethernet to Wi-Fi",
          "steps": [
            "Application, transport and network layers are untouched",
            "Only the physical/data-link layer implementation changes",
            "Interfaces between layers stay identical",
            "Peers on each side still speak the same layer-N protocol"
          ],
          "result": "Modularity lets one layer change without breaking the rest of the stack"
        },
        "code": null,
        "mistake": "Thinking a layer sends data directly to the far host — it actually hands data down through its own stack; only logically does it \"talk\" to its peer."
      },
      {
        "topic": "Protocol layering: message movement",
        "terms": [
          "Protocol",
          "layering",
          "message",
          "movement"
        ],
        "definition": "Protocol layering: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Protocol layering: message movement diagram, label the steps, then explain one example.",
        "visual": "protocol-layering-message-movement",
        "algo": [
          "Frame the problem Protocol layering: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Protocol layering: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Protocol layering: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Protocol layering: message movement as definition-only memorization."
      },
      {
        "topic": "TCP/IP protocol suite",
        "terms": [
          "Application",
          "Transport",
          "Network/IP",
          "Link",
          "Suite"
        ],
        "definition": "TCP/IP is the protocol suite that runs the Internet, organised into layers: Application, Transport (TCP/UDP), Network/Internet (IP), and Link (+Physical). IP provides best-effort host-to-host delivery; TCP/UDP provide process-to-process delivery on top.",
        "takeaway": "TCP/IP is the practical Internet stack: IP moves packets between hosts, TCP/UDP move data between processes.",
        "visual": "tcp-ip-protocol-suite",
        "algo": [
          "Application layer creates the data (HTTP, DNS, SMTP…)",
          "Transport layer (TCP/UDP) adds ports for process-to-process delivery",
          "Network layer (IP) adds IP addresses for host-to-host routing",
          "Link layer frames the packet for the physical medium"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Layers",
              "v": "4 (or 5)"
            },
            {
              "k": "IP",
              "v": "best-effort host↔host"
            },
            {
              "k": "TCP/UDP",
              "v": "process↔process"
            }
          ],
          "note": "IP is the \"hourglass waist\" — many protocols above and below, one IP in the middle."
        },
        "dryRun": {
          "input": "A browser fetching a web page",
          "steps": [
            "Application: HTTP GET request built",
            "Transport: TCP adds source/dest ports + reliability",
            "Network: IP adds source/dest IP addresses",
            "Link: Ethernet/Wi-Fi frames it onto the wire"
          ],
          "result": "Four headers stack up so the request reaches the right process on the right host"
        },
        "code": null,
        "mistake": "Confusing TCP/IP layers with the 7 OSI layers — TCP/IP merges OSI's top three into one Application layer."
      },
      {
        "topic": "TCP/IP protocol suite: message movement",
        "terms": [
          "TCP",
          "protocol",
          "suite",
          "message"
        ],
        "definition": "TCP/IP protocol suite: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the TCP/IP protocol suite: message movement diagram, label the steps, then explain one example.",
        "visual": "tcp-ip-protocol-suite-message-movement",
        "algo": [
          "Frame the problem TCP/IP protocol suite: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for TCP/IP protocol suite: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "TCP/IP protocol suite: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating TCP/IP protocol suite: message movement as definition-only memorization."
      },
      {
        "topic": "OSI model",
        "terms": [
          "7 layers",
          "Physical",
          "Data Link",
          "Network",
          "Transport",
          "Application"
        ],
        "definition": "The OSI model is a 7-layer reference model (Physical, Data Link, Network, Transport, Session, Presentation, Application) that standardises what each layer must do. It is a teaching/standards framework; the Internet runs the leaner TCP/IP suite that maps onto it.",
        "takeaway": "OSI = 7-layer reference model; TCP/IP = 4/5-layer working model. OSI's top three layers collapse into TCP/IP's Application layer.",
        "visual": "osi-model",
        "algo": [
          "Physical: bits as signals on the medium",
          "Data Link: framing + MAC + hop-to-hop error control",
          "Network: logical addressing + routing (IP)",
          "Transport: process-to-process, reliability (TCP/UDP)",
          "Session/Presentation/Application: dialog, format, user service"
        ],
        "complexity": {
          "cells": [
            {
              "k": "OSI",
              "v": "7 layers"
            },
            {
              "k": "TCP/IP",
              "v": "4–5 layers"
            },
            {
              "k": "Merged",
              "v": "top 3 → App"
            }
          ],
          "note": "Session and Presentation have no direct TCP/IP counterpart — apps handle them."
        },
        "dryRun": {
          "input": "Map OSI onto TCP/IP",
          "steps": [
            "OSI Physical + Data Link → TCP/IP Link layer",
            "OSI Network → TCP/IP Network (IP)",
            "OSI Transport → TCP/IP Transport (TCP/UDP)",
            "OSI Session+Presentation+Application → TCP/IP Application"
          ],
          "result": "A clean 7→4 mapping that explains why TCP/IP has no session layer"
        },
        "code": null,
        "mistake": "Reversing the layer order or misplacing Transport vs Network — remember bottom-up: Physical, Data Link, Network, Transport…"
      },
      {
        "topic": "OSI model: message movement",
        "terms": [
          "OSI",
          "model",
          "message",
          "movement"
        ],
        "definition": "OSI model: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the OSI model: message movement diagram, label the steps, then explain one example.",
        "visual": "osi-model-message-movement",
        "algo": [
          "Frame the problem OSI model: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for OSI model: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "OSI model: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating OSI model: message movement as definition-only memorization."
      },
      {
        "topic": "Transmission media",
        "terms": [
          "Guided",
          "Unguided",
          "Bandwidth",
          "Attenuation",
          "Signal"
        ],
        "definition": "Transmission media are the physical paths that carry signals between nodes, sitting below the physical layer. They divide into guided media (signal confined to a solid conductor/fibre) and unguided media (signal radiates through free space as radio/microwave/infrared).",
        "takeaway": "Media split into guided (wire/fibre — bounded) and unguided (wireless — unbounded); each choice trades bandwidth, cost and reach.",
        "visual": "transmission-media",
        "algo": [
          "Classify medium: guided (bounded) vs unguided (free space)",
          "Characterise it by bandwidth, attenuation and interference",
          "Match the medium to distance and data-rate needs",
          "Account for noise and repeaters over long runs"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Guided",
              "v": "copper / fibre"
            },
            {
              "k": "Unguided",
              "v": "radio / µwave / IR"
            },
            {
              "k": "Limits",
              "v": "attenuation, noise"
            }
          ],
          "note": "Higher bandwidth media (fibre) carry more data with less attenuation."
        },
        "dryRun": {
          "input": "Choosing a medium for a 10 km backbone",
          "steps": [
            "Guided candidates: twisted pair, coax, fibre",
            "Twisted pair attenuates too fast at 10 km",
            "Fibre offers huge bandwidth and low attenuation",
            "Pick single-mode fibre for the long, high-rate run"
          ],
          "result": "Fibre wins for long-distance, high-bandwidth links"
        },
        "code": null,
        "mistake": "Treating \"transmission media\" as a network layer concept — it lives below the physical layer, carrying signals, not packets."
      },
      {
        "topic": "Transmission media: message movement",
        "terms": [
          "Transmission",
          "media",
          "message",
          "movement"
        ],
        "definition": "Transmission media: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Transmission media: message movement diagram, label the steps, then explain one example.",
        "visual": "transmission-media-message-movement",
        "algo": [
          "Frame the problem Transmission media: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Transmission media: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Transmission media: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Transmission media: message movement as definition-only memorization."
      },
      {
        "topic": "Guided media",
        "terms": [
          "Twisted pair",
          "Coaxial",
          "Optical fibre",
          "UTP/STP",
          "Cladding"
        ],
        "definition": "Guided media confine the signal to a physical conductor. The three types are twisted-pair cable (two insulated copper wires twisted to cancel noise), coaxial cable (a central conductor inside a shield), and optical fibre (light guided by total internal reflection in a glass core).",
        "takeaway": "Twisted pair → cheap short LAN links; coax → higher bandwidth; fibre → highest bandwidth, lowest loss, immune to EMI.",
        "visual": "guided-media",
        "algo": [
          "Twisted pair: twists cancel crosstalk (UTP/STP), used for LANs",
          "Coax: shield gives more bandwidth and noise immunity",
          "Fibre: light bounces by total internal reflection in the core",
          "Pick per bandwidth, distance and interference needs"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Twisted pair",
              "v": "copper, cheap"
            },
            {
              "k": "Coax",
              "v": "shielded, more BW"
            },
            {
              "k": "Fibre",
              "v": "light, huge BW"
            }
          ],
          "note": "Fibre carries light, so it is immune to electromagnetic interference."
        },
        "dryRun": {
          "input": "Wiring an office floor vs a data-centre backbone",
          "steps": [
            "Desktop to switch: short run → UTP twisted pair (Cat6)",
            "Between floors with EMI: consider STP or fibre",
            "Backbone between buildings: single-mode fibre",
            "Match cable to distance + interference each time"
          ],
          "result": "UTP for the desk, fibre for the backbone"
        },
        "code": null,
        "mistake": "Saying fibre carries electrical signals — it carries light by total internal reflection, which is why it resists EMI."
      },
      {
        "topic": "Guided media: message movement",
        "terms": [
          "Guided",
          "media",
          "message",
          "movement"
        ],
        "definition": "Guided media: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Guided media: message movement diagram, label the steps, then explain one example.",
        "visual": "guided-media-message-movement",
        "algo": [
          "Frame the problem Guided media: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Guided media: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Guided media: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Guided media: message movement as definition-only memorization."
      },
      {
        "topic": "Unguided wireless media",
        "terms": [
          "Radio",
          "Microwave",
          "Infrared",
          "Propagation",
          "Line-of-sight"
        ],
        "definition": "Unguided media send electromagnetic signals through free space with no physical conductor. Three bands are used: radio waves (omnidirectional, good for broadcast), microwaves (line-of-sight, used for point-to-point and satellite), and infrared (short-range, blocked by walls).",
        "takeaway": "Radio = omnidirectional broadcast; microwave = focused line-of-sight; infrared = short-range within a room.",
        "visual": "unguided-wireless-media",
        "algo": [
          "Radio waves: omnidirectional, penetrate walls, low frequency",
          "Microwaves: unidirectional, need line-of-sight, higher frequency",
          "Infrared: very short range, blocked by obstacles",
          "Choose band by range, directionality and obstacles"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Radio",
              "v": "omni, broadcast"
            },
            {
              "k": "Microwave",
              "v": "line-of-sight"
            },
            {
              "k": "Infrared",
              "v": "in-room only"
            }
          ],
          "note": "Higher-frequency bands carry more data but need clear line-of-sight."
        },
        "dryRun": {
          "input": "Linking two rooftops 5 km apart with no cable",
          "steps": [
            "Infrared: fails — walls/distance block it",
            "Radio: works but omnidirectional wastes power",
            "Microwave dish: focused, line-of-sight over 5 km",
            "Install aligned microwave antennas on both roofs"
          ],
          "result": "Point-to-point microwave suits a clear 5 km line-of-sight link"
        },
        "code": null,
        "mistake": "Assuming infrared or high microwave can pass through walls — only lower-frequency radio penetrates obstacles well."
      },
      {
        "topic": "Unguided wireless media: message movement",
        "terms": [
          "Unguided",
          "wireless",
          "media",
          "message"
        ],
        "definition": "Unguided wireless media: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Unguided wireless media: message movement diagram, label the steps, then explain one example.",
        "visual": "unguided-wireless-media-message-movement",
        "algo": [
          "Frame the problem Unguided wireless media: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Unguided wireless media: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Unguided wireless media: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Unguided wireless media: message movement as definition-only memorization."
      },
      {
        "topic": "Packet switching and types",
        "terms": [
          "Datagram",
          "Virtual circuit",
          "Store-and-forward",
          "Setup",
          "Independent"
        ],
        "definition": "In packet switching a message is split into packets that are forwarded hop-by-hop (store-and-forward). Two approaches exist: the datagram approach routes each packet independently, while the virtual-circuit approach sets up one path first and sends all packets along it.",
        "takeaway": "Datagram = each packet routed independently (like IP); virtual circuit = one path set up first, then all packets follow it.",
        "visual": "packet-switching-and-types",
        "algo": [
          "Split the message into fixed/variable-size packets",
          "Datagram: each packet carries the full destination address and is routed independently",
          "Virtual circuit: a setup phase reserves a path; packets carry a short VC identifier",
          "Store-and-forward: each switch buffers a whole packet before forwarding"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Datagram",
              "v": "independent routes"
            },
            {
              "k": "Virtual circuit",
              "v": "one fixed path"
            },
            {
              "k": "Header",
              "v": "full addr vs VC id"
            }
          ],
          "note": "IP uses the datagram approach; VC adds setup/teardown but keeps packet order."
        },
        "dryRun": {
          "input": "Send packets P1,P2,P3 from A to B",
          "steps": [
            "Datagram: P1 via R1, P2 via R2, P3 via R1 — may arrive out of order",
            "Each carries B's full address; routers decide per packet",
            "Virtual circuit: setup picks A-R1-B once",
            "P1,P2,P3 all follow that path in order using a VC id"
          ],
          "result": "Datagram trades ordering for flexibility; VC trades setup cost for ordered delivery"
        },
        "code": null,
        "mistake": "Confusing virtual circuit with a dedicated physical circuit — VC still shares links statistically; only a logical path is fixed."
      },
      {
        "topic": "Packet switching and types: message movement",
        "terms": [
          "Packet",
          "switching",
          "and",
          "types"
        ],
        "definition": "Packet switching and types: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Packet switching and types: message movement diagram, label the steps, then explain one example.",
        "visual": "packet-switching-and-types-message-movement",
        "algo": [
          "Frame the problem Packet switching and types: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Packet switching and types: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Packet switching and types: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Packet switching and types: message movement as definition-only memorization."
      }
    ],
    "checkpoints": [
      {
        "label": "Data communications",
        "bigO": "5 parts",
        "why": "Message, sender, receiver, medium and protocol — all five are required."
      },
      {
        "label": "Protocol layering",
        "bigO": "peer",
        "why": "Each layer serves the one above, uses the one below, talks to its peer."
      },
      {
        "label": "OSI vs TCP/IP",
        "bigO": "7 vs 4",
        "why": "OSI's Session+Presentation+Application collapse into TCP/IP's Application."
      },
      {
        "label": "Encapsulation",
        "bigO": "+header/layer",
        "why": "Each layer adds a header going down; the receiver strips them going up."
      },
      {
        "label": "Guided vs unguided",
        "bigO": "wire/air",
        "why": "Guided confines the signal (fibre immune to EMI); unguided radiates in free space."
      },
      {
        "label": "Packet switching",
        "bigO": "datagram",
        "why": "Datagram routes each packet independently; VC fixes one path after setup."
      }
    ]
  },
  {
    "n": 2,
    "id": "module-2",
    "title": "Data Link Layer and Media Access",
    "hours": 8,
    "question": "How do frames survive errors and share a medium?",
    "story": [
      "Error",
      "Frame",
      "Flow",
      "MAC"
    ],
    "syllabus": [
      "Error detection and correction",
      "Block coding",
      "Cyclic codes (CRC)",
      "Framing",
      "Flow control",
      "Error control",
      "Connectionless and connection-oriented services",
      "HDLC",
      "Random access",
      "Controlled access",
      "Checksum",
      "Point-to-Point Protocol (PPP)"
    ],
    "notes": "Aligned to BCS502 Module_2 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Start with why the module matters. is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Start with why the module matters. diagram, label the steps, then explain one example.",
        "visual": "start-with-why-the-module-matters",
        "algo": [
          "Frame the problem Start with why the module matters. solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Start with why the module matters.",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Start with why the module matters. explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Start with why the module matters. as definition-only memorization."
      },
      {
        "topic": "Error detection and correction",
        "terms": [
          "Redundancy",
          "Detection",
          "Correction",
          "Single-bit",
          "Burst error"
        ],
        "definition": "Transmission flips bits due to noise. Error control adds redundant bits so the receiver can spot (detection) or even fix (correction) those flips. Errors are single-bit (one bit changed) or burst (two or more bits within a span changed).",
        "takeaway": "All error control works by adding redundancy — detection just flags an error, correction rebuilds the original bits.",
        "visual": "error-detection-and-correction",
        "algo": [
          "Sender adds redundant (check) bits computed from the data",
          "Receiver recomputes the check from the received bits",
          "Mismatch → error detected",
          "With enough redundancy (e.g. Hamming) the receiver locates and flips the bad bit"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Single-bit",
              "v": "1 bit flips"
            },
            {
              "k": "Burst",
              "v": "≥2 bits in a span"
            },
            {
              "k": "Tool",
              "v": "redundancy bits"
            }
          ],
          "note": "Detection is cheap; correction needs far more redundancy (forward error correction)."
        },
        "dryRun": {
          "input": "Send 1011, noise flips bit 2 → 1111",
          "steps": [
            "Sender appends check bits derived from 1011",
            "Receiver gets 1111 + check bits",
            "Recomputed check ≠ received check",
            "Error detected; request retransmission (or correct if FEC used)"
          ],
          "result": "The redundant bits expose the flipped bit that data alone could not"
        },
        "code": null,
        "mistake": "Believing a single parity bit can correct errors — a lone parity bit only detects an odd number of bit errors, it cannot locate them."
      },
      {
        "topic": "Error detection and correction: message movement",
        "terms": [
          "Error",
          "detection",
          "and",
          "correction"
        ],
        "definition": "Error detection and correction: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Error detection and correction: message movement diagram, label the steps, then explain one example.",
        "visual": "error-detection-and-correction-message-movement",
        "algo": [
          "Frame the problem Error detection and correction: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Error detection and correction: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Error detection and correction: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Error detection and correction: message movement as definition-only memorization."
      },
      {
        "topic": "Block coding",
        "terms": [
          "Dataword",
          "Codeword",
          "Redundancy",
          "Hamming distance",
          "Valid codeword"
        ],
        "definition": "In block coding the k-bit dataword is mapped to an n-bit codeword (n > k) by adding r = n−k redundant bits. Only 2^k of the 2^n possible n-bit patterns are valid codewords; if the receiver gets an invalid pattern it knows an error occurred.",
        "takeaway": "Block coding creates valid codewords with gaps between them — receiving an invalid codeword means an error was detected.",
        "visual": "block-coding",
        "algo": [
          "Take a k-bit dataword",
          "Add r redundant bits by a rule → n-bit codeword (n = k + r)",
          "Transmit only the 2^k valid codewords",
          "Receiver checks: valid codeword → accept; invalid → error"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Dataword",
              "v": "k bits"
            },
            {
              "k": "Codeword",
              "v": "n = k+r bits"
            },
            {
              "k": "Valid",
              "v": "2^k of 2^n"
            }
          ],
          "note": "Minimum Hamming distance d_min decides how many errors can be detected (d_min−1)."
        },
        "dryRun": {
          "input": "k=2 datawords with r=1 parity: rule = even parity",
          "steps": [
            "00→000, 01→011, 10→101, 11→110 (valid codewords)",
            "Send 011 for dataword 01",
            "Noise → 001 (invalid: odd parity)",
            "Receiver rejects 001 as not a valid codeword"
          ],
          "result": "Only 4 of 8 patterns are valid, so the flipped bit is caught"
        },
        "code": null,
        "mistake": "Thinking every n-bit pattern is a legal codeword — only the 2^k generated ones are; the rest are the \"error\" region."
      },
      {
        "topic": "Block coding: message movement",
        "terms": [
          "Block",
          "coding",
          "message",
          "movement"
        ],
        "definition": "Block coding: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Block coding: message movement diagram, label the steps, then explain one example.",
        "visual": "block-coding-message-movement",
        "algo": [
          "Frame the problem Block coding: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Block coding: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Block coding: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Block coding: message movement as definition-only memorization."
      },
      {
        "topic": "Cyclic codes",
        "terms": [
          "CRC",
          "Generator G(x)",
          "Modulo-2",
          "Remainder",
          "Divisor"
        ],
        "definition": "Cyclic codes (CRC) are block codes where a cyclic shift of a codeword is another codeword. CRC treats bits as a polynomial and divides the data (shifted left by r zeros) by an agreed generator polynomial using modulo-2 division; the r-bit remainder becomes the check bits.",
        "takeaway": "CRC = binary polynomial division by the generator; the remainder is appended, and a non-zero remainder at the receiver means error.",
        "visual": "cyclic-codes",
        "algo": [
          "Sender: append r zeros to the k-bit dataword (r = degree of G)",
          "Divide by generator G using modulo-2 (XOR) division",
          "Replace the appended zeros with the r-bit remainder → codeword",
          "Receiver: divide the received codeword by G; remainder 0 → accept, else error"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Divide by",
              "v": "generator G(x)"
            },
            {
              "k": "Arithmetic",
              "v": "modulo-2 (XOR)"
            },
            {
              "k": "Error if",
              "v": "remainder ≠ 0"
            }
          ],
          "note": "A good generator catches all single-bit, many burst and odd-bit errors."
        },
        "dryRun": {
          "input": "Dataword 1001, generator 1011",
          "steps": [
            "Append 3 zeros → 1001000",
            "Modulo-2 divide 1001000 by 1011",
            "Remainder = 101 → codeword 1001101",
            "Receiver divides 1001101 by 1011 → remainder 000 → accept"
          ],
          "result": "Remainder 101 becomes the CRC; a clean receive gives remainder 0"
        },
        "code": "Dataword: 1001,  G = 1011  (r = 3)\nAppend 3 zeros: 1001 000\n  1001000 ÷ 1011  (mod-2, XOR)\n  1011 | 1001000\n         1011\n         ----\n          0100 0\n           1011\n           ----\n            1110\n            1011\n            ----\n             101  <- remainder (CRC)\nCodeword sent: 1001 101\nReceiver: 1001101 ÷ 1011 -> remainder 000 => no error",
        "mistake": "Doing ordinary binary subtraction with borrows — CRC division is modulo-2 (bitwise XOR), never carries or borrows."
      },
      {
        "topic": "Cyclic codes: message movement",
        "terms": [
          "Cyclic",
          "codes",
          "message",
          "movement"
        ],
        "definition": "Cyclic codes: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Cyclic codes: message movement diagram, label the steps, then explain one example.",
        "visual": "cyclic-codes-message-movement",
        "algo": [
          "Frame the problem Cyclic codes: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Cyclic codes: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Cyclic codes: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Cyclic codes: message movement as definition-only memorization."
      },
      {
        "topic": "Framing",
        "terms": [
          "Frame",
          "Flag",
          "Bit stuffing",
          "Byte stuffing",
          "Boundary"
        ],
        "definition": "Framing packs the bit stream into distinct frames so the receiver knows where each frame starts and ends. Boundaries are marked by a special flag byte/bit pattern; to stop that pattern appearing inside the data, byte stuffing (character-oriented) or bit stuffing (bit-oriented) is used.",
        "takeaway": "Framing gives the receiver frame boundaries; bit/byte stuffing stops the flag pattern from appearing inside the payload.",
        "visual": "framing",
        "algo": [
          "Delimit each frame with a start/end flag (e.g. 01111110)",
          "Bit stuffing: after five 1s in data, insert a 0 so the flag never appears",
          "Receiver removes the stuffed bit to recover the data",
          "Alternatives: character count field, or byte stuffing with escape bytes"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Delimiter",
              "v": "flag 01111110"
            },
            {
              "k": "Bit stuff",
              "v": "after five 1s → 0"
            },
            {
              "k": "Byte stuff",
              "v": "escape byte"
            }
          ],
          "note": "Bit stuffing suits bit-oriented protocols (HDLC); byte stuffing suits byte-oriented ones (PPP)."
        },
        "dryRun": {
          "input": "Data contains 0111111 next to a flag 01111110",
          "steps": [
            "Sender scans data: sees five consecutive 1s",
            "Inserts a 0 → 0111110 1, so no accidental flag forms",
            "Frame = flag + stuffed data + flag",
            "Receiver deletes the 0 after five 1s to restore data"
          ],
          "result": "The flag stays unique to boundaries, so frames are delimited correctly"
        },
        "code": null,
        "mistake": "Forgetting to remove stuffed bits at the receiver, which corrupts the payload — stuffing must be perfectly reversed."
      },
      {
        "topic": "Framing: message movement",
        "terms": [
          "Framing",
          "message",
          "movement"
        ],
        "definition": "Framing: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Framing: message movement diagram, label the steps, then explain one example.",
        "visual": "framing-message-movement",
        "algo": [
          "Frame the problem Framing: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Framing: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Framing: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Framing: message movement as definition-only memorization."
      },
      {
        "topic": "Flow control",
        "terms": [
          "Sender rate",
          "Receiver buffer",
          "Stop-and-Wait",
          "Sliding window",
          "ACK"
        ],
        "definition": "Flow control stops a fast sender from overrunning a slow receiver's buffer. In Stop-and-Wait the sender sends one frame then waits for an ACK; in sliding-window the sender may have several unacknowledged frames in flight up to the window size.",
        "takeaway": "Flow control matches sender speed to receiver buffer space; sliding window keeps the pipe full where Stop-and-Wait leaves it idle.",
        "visual": "flow-control",
        "algo": [
          "Receiver advertises how much buffer space it has",
          "Stop-and-Wait: send 1 frame → wait for ACK → send next",
          "Sliding window: send up to W frames before needing an ACK",
          "Each ACK slides the window forward, allowing new frames"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Stop-&-Wait",
              "v": "window = 1"
            },
            {
              "k": "Sliding win",
              "v": "window = W"
            },
            {
              "k": "Feedback",
              "v": "ACK / credit"
            }
          ],
          "note": "Larger windows raise link utilisation on long/fast (high bandwidth-delay) links."
        },
        "dryRun": {
          "input": "Fast sender, receiver buffer holds 3 frames",
          "steps": [
            "Receiver advertises window = 3",
            "Sender sends F1,F2,F3 then pauses (window full)",
            "ACK for F1 arrives → window slides → send F4",
            "Sender never exceeds the 3-frame buffer"
          ],
          "result": "Buffer never overflows because the window caps frames in flight"
        },
        "code": null,
        "mistake": "Conflating flow control (protects the receiver buffer) with congestion control (protects the network core) — they solve different problems."
      },
      {
        "topic": "Flow control: message movement",
        "terms": [
          "Flow",
          "control",
          "message",
          "movement"
        ],
        "definition": "Flow control: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Flow control: message movement diagram, label the steps, then explain one example.",
        "visual": "flow-control-message-movement",
        "algo": [
          "Frame the problem Flow control: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Flow control: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Flow control: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Flow control: message movement as definition-only memorization."
      },
      {
        "topic": "Error control",
        "terms": [
          "ACK",
          "NAK",
          "Timeout",
          "Retransmission",
          "ARQ"
        ],
        "definition": "Error control at the data-link layer adds reliability through ARQ (Automatic Repeat reQuest): detect errors with a CRC/checksum, acknowledge good frames, and retransmit lost or corrupted frames after a timeout. Sequence numbers stop duplicates being accepted.",
        "takeaway": "Error control = detect + acknowledge + retransmit on timeout; sequence numbers prevent duplicate frames from being accepted.",
        "visual": "error-control",
        "algo": [
          "Number each frame with a sequence number",
          "Receiver checks the CRC; good → send ACK, bad → discard (or NAK)",
          "Sender starts a timer per frame; timeout → retransmit",
          "Duplicate sequence numbers are detected and dropped"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Detect",
              "v": "CRC / checksum"
            },
            {
              "k": "Confirm",
              "v": "ACK / NAK"
            },
            {
              "k": "Recover",
              "v": "timeout → resend"
            }
          ],
          "note": "Go-Back-N and Selective-Repeat are the two sliding-window ARQ schemes."
        },
        "dryRun": {
          "input": "Frame 2 is lost in transit",
          "steps": [
            "Sender sends frame 2, starts its timer",
            "No ACK arrives before timeout",
            "Sender retransmits frame 2",
            "Receiver ACKs; sequence number stops a duplicate being kept"
          ],
          "result": "The timeout+retransmit loop recovers the lost frame reliably"
        },
        "code": null,
        "mistake": "Assuming error control only detects errors — the data-link layer also recovers from them via ACKs, timers and retransmission."
      },
      {
        "topic": "Error control: message movement",
        "terms": [
          "Error",
          "control",
          "message",
          "movement"
        ],
        "definition": "Error control: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Error control: message movement diagram, label the steps, then explain one example.",
        "visual": "error-control-message-movement",
        "algo": [
          "Frame the problem Error control: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Error control: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Error control: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Error control: message movement as definition-only memorization."
      },
      {
        "topic": "Connectionless and connection-oriented services",
        "terms": [
          "Connectionless",
          "Connection-oriented",
          "Setup",
          "Ordering",
          "State"
        ],
        "definition": "A connectionless service sends each unit independently with no prior setup and no guaranteed order (like the postal system / UDP / IP datagrams). A connection-oriented service first sets up a connection, transfers data in order, then tears it down (like a phone call / TCP).",
        "takeaway": "Connectionless = no setup, independent units, possible reorder; connection-oriented = setup → ordered transfer → teardown.",
        "visual": "connectionless-and-connection-oriented-services",
        "algo": [
          "Connectionless: send each packet independently, no handshake",
          "Packets may take different paths and arrive out of order",
          "Connection-oriented: setup phase establishes state at both ends",
          "Data flows in order, then a teardown releases the connection"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Connectionless",
              "v": "no setup (UDP/IP)"
            },
            {
              "k": "Conn-oriented",
              "v": "3 phases (TCP)"
            },
            {
              "k": "Ordering",
              "v": "no vs yes"
            }
          ],
          "note": "Connection-oriented service keeps per-connection state at each end; connectionless keeps none."
        },
        "dryRun": {
          "input": "Send 3 messages either way",
          "steps": [
            "Connectionless: M1,M2,M3 sent immediately, may arrive M2,M1,M3",
            "No state kept between messages",
            "Connection-oriented: open connection first",
            "M1,M2,M3 delivered in order, then close"
          ],
          "result": "Same data, but ordering and setup differ sharply between the two services"
        },
        "code": null,
        "mistake": "Assuming connectionless means unreliable and connection-oriented means reliable — reliability is separate; connectionless just skips setup and ordering."
      },
      {
        "topic": "Connectionless and connection-oriented services: message movement",
        "terms": [
          "Connectionless",
          "and",
          "connection-oriented",
          "services"
        ],
        "definition": "Connectionless and connection-oriented services: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Connectionless and connection-oriented services: message movement diagram, label the steps, then explain one example.",
        "visual": "connectionless-and-connection-oriented-services-",
        "algo": [
          "Frame the problem Connectionless and connection-oriented services: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Connectionless and connection-oriented services: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Connectionless and connection-oriented services: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Connectionless and connection-oriented services: message movement as definition-only memorization."
      },
      {
        "topic": "HDLC",
        "terms": [
          "Flag",
          "Address",
          "Control",
          "I/S/U frames",
          "FCS"
        ],
        "definition": "HDLC (High-level Data Link Control) is a bit-oriented data-link protocol. Every frame is delimited by the 01111110 flag and contains Address, Control, Information and FCS fields. The Control field type gives three frame kinds: I-frames (data), S-frames (control/ACK), and U-frames (management).",
        "takeaway": "HDLC frame = Flag · Address · Control · Info · FCS · Flag; the Control field decides I- vs S- vs U-frame.",
        "visual": "hdlc",
        "algo": [
          "Open and close each frame with the 01111110 flag",
          "Address field names the secondary station",
          "Control field carries sequence/ACK numbers and frame type",
          "FCS (CRC) checks the frame; bit stuffing keeps the flag unique"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Flag",
              "v": "01111110"
            },
            {
              "k": "Frames",
              "v": "I · S · U"
            },
            {
              "k": "FCS",
              "v": "CRC-16"
            }
          ],
          "note": "Modes: NRM (primary polls secondaries) and ABM (balanced, either end initiates)."
        },
        "dryRun": {
          "input": "Station sends a data frame + piggybacked ACK",
          "steps": [
            "Build frame: Flag | Addr | Control(I, N(S),N(R)) | Data | FCS | Flag",
            "N(S) numbers this I-frame; N(R) acknowledges received frames",
            "FCS computed over Address..Info",
            "Receiver checks FCS and reads N(R) as the piggybacked ACK"
          ],
          "result": "One I-frame carries both data and an acknowledgement efficiently"
        },
        "code": null,
        "mistake": "Mixing up the frame types — only I-frames carry user data; S-frames are pure control (RR/RNR/REJ), U-frames are management."
      },
      {
        "topic": "HDLC: message movement",
        "terms": [
          "HDLC",
          "message",
          "movement"
        ],
        "definition": "HDLC: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the HDLC: message movement diagram, label the steps, then explain one example.",
        "visual": "hdlc-message-movement",
        "algo": [
          "Frame the problem HDLC: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for HDLC: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "HDLC: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating HDLC: message movement as definition-only memorization."
      },
      {
        "topic": "Random access",
        "terms": [
          "ALOHA",
          "CSMA",
          "CSMA/CD",
          "CSMA/CA",
          "Backoff"
        ],
        "definition": "In random-access MAC no station is scheduled; each decides on its own when to transmit, so collisions can happen. Pure/slotted ALOHA just sends and retries; CSMA senses the channel first; CSMA/CD (Ethernet) also detects collisions; CSMA/CA (Wi-Fi) tries to avoid them.",
        "takeaway": "Random access = sense/send on your own, risk collisions, back off and retry; CD detects collisions, CA avoids them.",
        "visual": "random-access",
        "algo": [
          "ALOHA: transmit whenever ready; on collision wait a random time and resend",
          "CSMA: sense the medium; transmit only if it is idle",
          "CSMA/CD: keep listening while sending; on collision abort and back off",
          "CSMA/CA: use waiting (IFS) + random backoff to reduce collisions before they happen"
        ],
        "complexity": {
          "cells": [
            {
              "k": "ALOHA",
              "v": "send, retry"
            },
            {
              "k": "CSMA/CD",
              "v": "wired Ethernet"
            },
            {
              "k": "CSMA/CA",
              "v": "Wi-Fi"
            }
          ],
          "note": "CD needs to hear collisions (wired); wireless can't reliably, so Wi-Fi uses CA."
        },
        "dryRun": {
          "input": "Stations B and C both ready on an Ethernet segment",
          "steps": [
            "Both sense idle and start sending (CSMA)",
            "Signals overlap → collision detected (CD)",
            "Both abort, send a jam, pick random backoff times",
            "B waits shorter, transmits cleanly; C follows"
          ],
          "result": "Collision is detected and resolved by exponential random backoff"
        },
        "code": null,
        "mistake": "Claiming Wi-Fi uses CSMA/CD — wireless cannot reliably detect its own collisions, so it uses CSMA/CA (collision avoidance)."
      },
      {
        "topic": "Random access: message movement",
        "terms": [
          "Random",
          "access",
          "message",
          "movement"
        ],
        "definition": "Random access: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Random access: message movement diagram, label the steps, then explain one example.",
        "visual": "random-access-message-movement",
        "algo": [
          "Frame the problem Random access: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Random access: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Random access: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Random access: message movement as definition-only memorization."
      },
      {
        "topic": "Controlled access",
        "terms": [
          "Reservation",
          "Polling",
          "Token passing",
          "Primary",
          "Turn"
        ],
        "definition": "In controlled-access MAC stations coordinate so only one transmits at a time, eliminating collisions. The three methods are reservation (stations book slots ahead), polling (a primary invites each secondary in turn), and token passing (a token circulates and only its holder may send).",
        "takeaway": "Controlled access removes collisions by granting turns — via reservation, polling, or a circulating token.",
        "visual": "controlled-access",
        "algo": [
          "Reservation: a reservation frame lets stations claim upcoming slots",
          "Polling: primary asks each secondary \"do you have data?\" in order",
          "Token passing: a token frame circulates; only the holder transmits",
          "After sending, the station passes control/token to the next"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Reservation",
              "v": "book slots"
            },
            {
              "k": "Polling",
              "v": "primary asks"
            },
            {
              "k": "Token",
              "v": "holder sends"
            }
          ],
          "note": "No collisions occur, but there is overhead (polls/token) even when idle."
        },
        "dryRun": {
          "input": "Token ring with stations A,B,C,D",
          "steps": [
            "Token circulates A→B→C→D→A",
            "B holds the token, has data → B transmits its frame",
            "B releases the token to C",
            "C has nothing → passes token onward; no collision ever occurs"
          ],
          "result": "Exactly one station transmits per turn, so collisions are impossible"
        },
        "code": null,
        "mistake": "Thinking controlled access can still have collisions — its whole point is that turn-granting makes simultaneous transmission impossible."
      },
      {
        "topic": "Controlled access: message movement",
        "terms": [
          "Controlled",
          "access",
          "message",
          "movement"
        ],
        "definition": "Controlled access: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Controlled access: message movement diagram, label the steps, then explain one example.",
        "visual": "controlled-access-message-movement",
        "algo": [
          "Frame the problem Controlled access: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Controlled access: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Controlled access: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Controlled access: message movement as definition-only memorization."
      },
      {
        "topic": "Checksum",
        "terms": [
          "Words",
          "One's complement",
          "Sum",
          "Wrap-around carry",
          "Verify"
        ],
        "definition": "The checksum (used by IP/UDP/TCP) splits data into fixed-size words, adds them in one's-complement arithmetic (wrapping the carry back in), then complements the sum to form the checksum. The receiver adds all words plus the checksum; an all-ones result means no error.",
        "takeaway": "Checksum = one's-complement sum of the words, then complemented; at the receiver a correct message sums to all 1s.",
        "visual": "checksum",
        "algo": [
          "Divide the data into n-bit words",
          "Add the words using one's-complement (add end-around carry back)",
          "Complement the final sum → the checksum, sent with the data",
          "Receiver adds all words + checksum; all-1s → accept, else error"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Arithmetic",
              "v": "1's complement"
            },
            {
              "k": "Carry",
              "v": "wrapped around"
            },
            {
              "k": "OK if",
              "v": "sum = all 1s"
            }
          ],
          "note": "Weaker than CRC (misses some reordering) but cheap and easy in software."
        },
        "dryRun": {
          "input": "Two words 1100 and 1010",
          "steps": [
            "Add: 1100 + 1010 = 10110, carry-out 1",
            "Wrap carry: 0110 + 1 = 0111",
            "Checksum = complement(0111) = 1000",
            "Receiver: 1100+1010+1000 = 1111 (all 1s) → no error"
          ],
          "result": "Complemented one's-complement sum verifies to all 1s when intact"
        },
        "code": "Words: 1100 , 1010  (4-bit)\n  1100\n+ 1010\n------\n 10110   carry out = 1\n  0110 + 1 (wrap) = 0111  (sum)\nchecksum = complement(0111) = 1000\nReceiver: 1100 + 1010 + 1000 = 1111  => all 1s => OK",
        "mistake": "Doing plain binary addition and dropping the carry — checksum requires one's-complement with the end-around carry added back."
      },
      {
        "topic": "Checksum: message movement",
        "terms": [
          "Checksum",
          "message",
          "movement"
        ],
        "definition": "Checksum: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Checksum: message movement diagram, label the steps, then explain one example.",
        "visual": "checksum-message-movement",
        "algo": [
          "Frame the problem Checksum: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Checksum: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Checksum: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Checksum: message movement as definition-only memorization."
      },
      {
        "topic": "Point-to-Point Protocol",
        "terms": [
          "PPP",
          "LCP",
          "NCP",
          "Authentication",
          "Byte stuffing"
        ],
        "definition": "PPP is a byte-oriented data-link protocol for point-to-point links (dial-up, DSL, serial). Its frame resembles HDLC (flag 01111110, address, control, protocol, payload, FCS). LCP sets up/tears down and tests the link; NCP configures network-layer options (e.g. an IP address); authentication (PAP/CHAP) can be negotiated.",
        "takeaway": "PPP carries IP over a single point-to-point link: LCP manages the link, NCP configures the network layer, PAP/CHAP authenticate.",
        "visual": "point-to-point-protocol",
        "algo": [
          "LCP phase: establish, configure and test the link",
          "Optional authentication phase (PAP or CHAP)",
          "NCP phase: configure network-layer parameters (e.g. IP)",
          "Carry data frames; LCP tears the link down when finished"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Link mgmt",
              "v": "LCP"
            },
            {
              "k": "Net config",
              "v": "NCP"
            },
            {
              "k": "Auth",
              "v": "PAP / CHAP"
            }
          ],
          "note": "Unlike HDLC, PPP uses byte stuffing and adds a Protocol field to multiplex payloads."
        },
        "dryRun": {
          "input": "A PC dials up an ISP",
          "steps": [
            "LCP negotiates frame options and brings the link up",
            "CHAP authenticates the PC to the ISP",
            "IPCP (an NCP) assigns the PC an IP address",
            "IP packets now flow inside PPP frames"
          ],
          "result": "PPP moves through LCP → auth → NCP before data can flow"
        },
        "code": null,
        "mistake": "Treating PPP as a multi-point/LAN protocol — it is strictly point-to-point (exactly two endpoints on the link)."
      },
      {
        "topic": "Point-to-Point Protocol: message movement",
        "terms": [
          "Point-to-Point",
          "Protocol",
          "message",
          "movement"
        ],
        "definition": "Point-to-Point Protocol: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Point-to-Point Protocol: message movement diagram, label the steps, then explain one example.",
        "visual": "point-to-point-protocol-message-movement",
        "algo": [
          "Frame the problem Point-to-Point Protocol: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Point-to-Point Protocol: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Point-to-Point Protocol: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Point-to-Point Protocol: message movement as definition-only memorization."
      }
    ],
    "checkpoints": [
      {
        "label": "Block coding",
        "bigO": "n=k+r",
        "why": "Only 2^k of 2^n patterns are valid codewords; invalid ⇒ error."
      },
      {
        "label": "CRC",
        "bigO": "rem≠0",
        "why": "Modulo-2 divide by the generator; non-zero remainder means error."
      },
      {
        "label": "Checksum",
        "bigO": "1's comp",
        "why": "One's-complement sum with wrap-around; receiver sums to all 1s."
      },
      {
        "label": "Framing",
        "bigO": "bit-stuff",
        "why": "Flags mark boundaries; stuffing stops the flag appearing in data."
      },
      {
        "label": "Flow vs error control",
        "bigO": "buffer/ACK",
        "why": "Flow control protects the receiver buffer; error control retransmits losses."
      },
      {
        "label": "Random vs controlled",
        "bigO": "collide/turn",
        "why": "Random access risks collisions; controlled access grants turns (no collisions)."
      }
    ]
  },
  {
    "n": 3,
    "id": "module-3",
    "title": "Network Layer and Routing",
    "hours": 8,
    "question": "How do packets find a path across networks?",
    "story": [
      "IP",
      "Route",
      "DVR",
      "LSR"
    ],
    "syllabus": [
      "Network layer services",
      "Packet switching",
      "IPv4 addressing",
      "IPv4 datagram",
      "IPv6 datagram",
      "Routing algorithms",
      "Distance vector routing",
      "Link state routing",
      "Path vector routing",
      "RIP",
      "OSPF",
      "BGP",
      "Multicast routing (MOSPF)"
    ],
    "notes": "Aligned to BCS502 Module_3 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Start with why the module matters. is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Start with why the module matters. diagram, label the steps, then explain one example.",
        "visual": "start-with-why-the-module-matters",
        "algo": [
          "Frame the problem Start with why the module matters. solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Start with why the module matters.",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Start with why the module matters. explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Start with why the module matters. as definition-only memorization."
      },
      {
        "topic": "Network layer services",
        "terms": [
          "Forwarding",
          "Routing",
          "Logical addressing",
          "Fragmentation",
          "Best-effort"
        ],
        "definition": "The network layer moves packets from the source host to the destination host across multiple networks. Its services are logical (IP) addressing, routing (choosing paths) and forwarding (moving a packet to the next hop), plus fragmentation. IP offers a connectionless, best-effort service — no delivery guarantee.",
        "takeaway": "Network layer = host-to-host delivery: it adds logical addressing, routes and forwards packets on a best-effort basis.",
        "visual": "network-layer-services",
        "algo": [
          "Attach source and destination IP addresses",
          "Routing builds the forwarding table (control plane)",
          "Forwarding: each router looks up the destination and picks the next hop",
          "Fragment if the packet exceeds a link's MTU; reassemble at the destination"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Scope",
              "v": "host ↔ host"
            },
            {
              "k": "Service",
              "v": "best-effort"
            },
            {
              "k": "Jobs",
              "v": "route + forward"
            }
          ],
          "note": "Routing = building the table; forwarding = using it for each packet."
        },
        "dryRun": {
          "input": "Packet from host A on net 1 to host B on net 3",
          "steps": [
            "A sends the packet to its default router R1",
            "R1 forwards toward net 3 using its routing table",
            "R2 forwards on; TTL decremented at each hop",
            "Final router delivers the packet to B on net 3"
          ],
          "result": "The packet crosses several networks by per-hop forwarding decisions"
        },
        "code": null,
        "mistake": "Blurring routing and forwarding — routing computes the table periodically; forwarding is the fast per-packet lookup that uses it."
      },
      {
        "topic": "Network layer services: message movement",
        "terms": [
          "Network",
          "layer",
          "services",
          "message"
        ],
        "definition": "Network layer services: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Network layer services: message movement diagram, label the steps, then explain one example.",
        "visual": "network-layer-services-message-movement",
        "algo": [
          "Frame the problem Network layer services: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Network layer services: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Network layer services: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Network layer services: message movement as definition-only memorization."
      },
      {
        "topic": "Packet switching",
        "terms": [
          "Datagram",
          "Virtual circuit",
          "Forwarding table",
          "Next hop",
          "Store-and-forward"
        ],
        "definition": "At the network layer, packet switching forwards each packet through routers by store-and-forward. IP uses the datagram approach: every packet is switched independently using the destination IP address and each router's forwarding table; a virtual-circuit variant would instead label packets and follow a pre-set path.",
        "takeaway": "IP packet switching is datagram-based — each router independently forwards a packet by its destination address, no path reserved.",
        "visual": "packet-switching",
        "algo": [
          "Router receives and buffers the whole packet (store-and-forward)",
          "Extract the destination IP address",
          "Longest-prefix match in the forwarding table → next hop",
          "Send the packet out of that interface toward the next router"
        ],
        "complexity": {
          "cells": [
            {
              "k": "IP uses",
              "v": "datagram"
            },
            {
              "k": "Lookup",
              "v": "dest IP → next hop"
            },
            {
              "k": "Match",
              "v": "longest prefix"
            }
          ],
          "note": "No setup and per-packet routing give robustness but allow reordering."
        },
        "dryRun": {
          "input": "Two packets to 192.168.3.7",
          "steps": [
            "Router R1 receives packet 1, matches prefix 192.168.3.0/24",
            "Forwards via interface to R2",
            "Packet 2 arrives; R1 could send it via a different next hop if the table changed",
            "Each packet decided independently — no reserved circuit"
          ],
          "result": "Independent per-packet forwarding is the essence of IP switching"
        },
        "code": null,
        "mistake": "Assuming IP sets up a path before sending — IP is connectionless datagram switching; every packet is routed on its own."
      },
      {
        "topic": "Packet switching: message movement",
        "terms": [
          "Packet",
          "switching",
          "message",
          "movement"
        ],
        "definition": "Packet switching: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Packet switching: message movement diagram, label the steps, then explain one example.",
        "visual": "packet-switching-message-movement",
        "algo": [
          "Frame the problem Packet switching: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Packet switching: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Packet switching: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Packet switching: message movement as definition-only memorization."
      },
      {
        "topic": "IPv4 address",
        "terms": [
          "32-bit",
          "Dotted decimal",
          "Network/host",
          "Classful",
          "CIDR/mask"
        ],
        "definition": "An IPv4 address is a 32-bit identifier written as four dotted-decimal octets (e.g. 192.168.1.10). It has a network part and a host part; the split is set by classful ranges (A/B/C) or by a subnet mask / CIDR prefix (e.g. /24). Special ranges cover private, loopback and broadcast use.",
        "takeaway": "An IPv4 address is 32 bits = network part + host part; the mask/prefix decides where that boundary sits.",
        "visual": "ipv4-address",
        "algo": [
          "Write the 32 bits as four octets in dotted decimal",
          "The prefix length (/n) or mask marks network vs host bits",
          "AND the address with the mask → network (subnet) address",
          "Host bits all-0 = network id, all-1 = broadcast"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Size",
              "v": "32 bits"
            },
            {
              "k": "Notation",
              "v": "a.b.c.d"
            },
            {
              "k": "Split by",
              "v": "mask / /n"
            }
          ],
          "note": "Class A/B/C default masks: /8, /16, /24; CIDR generalises to any prefix length."
        },
        "dryRun": {
          "input": "192.168.1.10 / 24",
          "steps": [
            "Prefix /24 → first 24 bits network, last 8 bits host",
            "Mask = 255.255.255.0",
            "Network = 192.168.1.0, broadcast = 192.168.1.255",
            "Valid hosts = 192.168.1.1 … 192.168.1.254"
          ],
          "result": "The /24 mask fixes the network/host boundary and host range"
        },
        "code": null,
        "mistake": "Treating all 256 addresses in a /24 as usable hosts — the all-0 (network) and all-1 (broadcast) addresses are reserved."
      },
      {
        "topic": "IPv4 address: message movement",
        "terms": [
          "IPv4",
          "address",
          "message",
          "movement"
        ],
        "definition": "IPv4 address: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the IPv4 address: message movement diagram, label the steps, then explain one example.",
        "visual": "ipv4-address-message-movement",
        "algo": [
          "Frame the problem IPv4 address: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for IPv4 address: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "IPv4 address: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating IPv4 address: message movement as definition-only memorization."
      },
      {
        "topic": "IPv4 datagram",
        "terms": [
          "Header 20–60B",
          "TTL",
          "Protocol",
          "Checksum",
          "Fragment offset"
        ],
        "definition": "An IPv4 datagram has a 20–60 byte header plus payload. Key fields: Version, IHL (header length), Total Length, Identification/Flags/Fragment-Offset (fragmentation), TTL (hop limit), Protocol (TCP=6, UDP=17, ICMP=1), Header Checksum, and the 32-bit Source and Destination addresses.",
        "takeaway": "Know the working fields: TTL stops loops, Protocol demultiplexes to TCP/UDP, ID/Offset reassemble fragments, Checksum guards the header.",
        "visual": "ipv4-datagram",
        "algo": [
          "TTL decremented by each router; hits 0 → packet dropped (ICMP time-exceeded)",
          "Protocol field tells the destination which transport protocol to hand the payload to",
          "If bigger than the link MTU, split using Identification + Fragment Offset + MF flag",
          "Header Checksum recomputed at each hop (TTL changed)"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Header",
              "v": "20–60 B"
            },
            {
              "k": "TTL",
              "v": "per-hop −1"
            },
            {
              "k": "Protocol",
              "v": "TCP6/UDP17/ICMP1"
            }
          ],
          "note": "The header checksum covers only the header, not the payload (transport has its own)."
        },
        "dryRun": {
          "input": "A 4000-byte datagram crossing a link with MTU 1500",
          "steps": [
            "Router must fragment: create fragments ≤ 1500 bytes",
            "Each fragment shares the same Identification value",
            "Fragment Offset marks each fragment's position; MF=1 except the last",
            "Destination reassembles using ID + offsets; TTL−1 at each hop"
          ],
          "result": "Fragmentation fields let the destination rebuild the original datagram"
        },
        "code": null,
        "mistake": "Saying the IPv4 checksum protects the data — it only covers the header, and it must be recomputed every hop because TTL changes."
      },
      {
        "topic": "IPv4 datagram: message movement",
        "terms": [
          "IPv4",
          "datagram",
          "message",
          "movement"
        ],
        "definition": "IPv4 datagram: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the IPv4 datagram: message movement diagram, label the steps, then explain one example.",
        "visual": "ipv4-datagram-message-movement",
        "algo": [
          "Frame the problem IPv4 datagram: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for IPv4 datagram: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "IPv4 datagram: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating IPv4 datagram: message movement as definition-only memorization."
      },
      {
        "topic": "IPv6 datagram",
        "terms": [
          "128-bit",
          "Fixed 40B header",
          "Flow label",
          "Next header",
          "Hop limit"
        ],
        "definition": "IPv6 uses 128-bit addresses and a fixed 40-byte base header that is simpler than IPv4: no header checksum, no fragmentation fields (hosts do path-MTU discovery), and optional features moved to Extension Headers chained via the Next Header field. It adds a Flow Label for QoS.",
        "takeaway": "IPv6 = 128-bit addresses + a streamlined fixed 40-byte header; checksum and router fragmentation are removed, extensions are chained.",
        "visual": "ipv6-datagram",
        "algo": [
          "Address widened 32 → 128 bits (huge address space)",
          "Base header fixed at 40 bytes → faster router processing",
          "Options moved out into Extension Headers (Next Header chain)",
          "No header checksum; no router fragmentation (source does PMTUD)"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Address",
              "v": "128 bits"
            },
            {
              "k": "Base header",
              "v": "fixed 40 B"
            },
            {
              "k": "Removed",
              "v": "checksum, frag"
            }
          ],
          "note": "Hop Limit is IPv6's TTL; Flow Label supports flow-based QoS handling."
        },
        "dryRun": {
          "input": "Compare header processing IPv4 vs IPv6",
          "steps": [
            "IPv4: variable header, checksum recomputed every hop",
            "IPv6: fixed 40-byte header, no checksum to recompute",
            "IPv6 routers never fragment — they signal \"packet too big\"",
            "Faster, simpler forwarding at each router"
          ],
          "result": "A leaner fixed header speeds routing and enlarges the address space"
        },
        "code": null,
        "mistake": "Saying \"IPv6 is just newer/better\" without the specifics — the real gains are 128-bit addressing and a fixed, checksum-free header that routers never fragment."
      },
      {
        "topic": "IPv6 datagram: message movement",
        "terms": [
          "IPv6",
          "datagram",
          "message",
          "movement"
        ],
        "definition": "IPv6 datagram: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the IPv6 datagram: message movement diagram, label the steps, then explain one example.",
        "visual": "ipv6-datagram-message-movement",
        "algo": [
          "Frame the problem IPv6 datagram: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for IPv6 datagram: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "IPv6 datagram: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating IPv6 datagram: message movement as definition-only memorization."
      },
      {
        "topic": "Routing algorithms",
        "terms": [
          "Metric",
          "Cost",
          "Shortest path",
          "Routing table",
          "Convergence"
        ],
        "definition": "A routing algorithm computes least-cost paths across the network graph, where each link has a cost/metric. The output is each router's routing table (destination → next hop). The two families are distance-vector (tell neighbours your distances) and link-state (tell everyone your links).",
        "takeaway": "Routing = find least-cost paths on a weighted graph and fill the routing table; DV and LS are the two ways to gather the needed information.",
        "visual": "routing-algorithms",
        "algo": [
          "Model the network as a graph with link costs",
          "Goal: for each destination, find the minimum-cost path",
          "Distance-vector: iteratively share distance estimates with neighbours",
          "Link-state: flood link info so every node runs Dijkstra on the full map"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Input",
              "v": "weighted graph"
            },
            {
              "k": "Output",
              "v": "routing table"
            },
            {
              "k": "Families",
              "v": "DV · LS"
            }
          ],
          "note": "Convergence = all tables agree; slow convergence causes transient loops."
        },
        "dryRun": {
          "input": "Graph A-B=1, B-C=1, A-C=4",
          "steps": [
            "Direct A→C cost = 4",
            "Consider A→B→C = 1 + 1 = 2",
            "2 < 4 → least-cost path is A-B-C",
            "A's table: dest C, next hop B, cost 2"
          ],
          "result": "The algorithm picks the 2-cost path via B over the direct 4-cost link"
        },
        "code": null,
        "mistake": "Assuming the fewest hops always means least cost — routing minimises the summed link metric, which may prefer more hops over cheaper links."
      },
      {
        "topic": "Routing algorithms: message movement",
        "terms": [
          "Routing",
          "algorithms",
          "message",
          "movement"
        ],
        "definition": "Routing algorithms: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Routing algorithms: message movement diagram, label the steps, then explain one example.",
        "visual": "routing-algorithms-message-movement",
        "algo": [
          "Frame the problem Routing algorithms: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Routing algorithms: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Routing algorithms: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Routing algorithms: message movement as definition-only memorization."
      },
      {
        "topic": "Distance vector routing",
        "terms": [
          "Bellman-Ford",
          "Neighbour vectors",
          "Relaxation",
          "Convergence",
          "Count-to-infinity"
        ],
        "definition": "In distance-vector routing each router keeps a vector of least-cost distances to every destination and periodically shares it with its direct neighbours. On receiving a neighbour's vector it applies the Bellman-Ford update D_x(y)=min_v[c(x,v)+D_v(y)] and updates its table if a cheaper path appears.",
        "takeaway": "Each router knows only its neighbours' distances; Bellman-Ford relaxation spreads costs until every table converges.",
        "visual": "distance-vector-routing",
        "algo": [
          "Initialise: cost 0 to self, link cost to neighbours, ∞ to others",
          "Send your distance vector to all neighbours",
          "On receiving a vector: D_x(y) = min over neighbours v of [c(x,v)+D_v(y)]",
          "If any entry improves, update the table and re-advertise"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Update",
              "v": "Bellman-Ford"
            },
            {
              "k": "Shares with",
              "v": "neighbours only"
            },
            {
              "k": "Risk",
              "v": "count-to-∞"
            }
          ],
          "note": "Split horizon / poisoned reverse mitigate the count-to-infinity loop problem."
        },
        "dryRun": {
          "input": "A-B=2, B-D=1, A-D=5; find A→D",
          "steps": [
            "A initially: D(A→D) = 5 direct",
            "B advertises D(B→D) = 1",
            "A computes c(A,B)+D(B→D) = 2 + 1 = 3",
            "3 < 5 → A updates D→ to cost 3 via B"
          ],
          "result": "A's route to D improves from 5 to 3 via neighbour B"
        },
        "code": "// Bellman-Ford update at router x\nfor each destination y:\n  Dx[y] = min over neighbours v of ( c(x,v) + Dv[y] )\n  nexthop[y] = the v that achieves the minimum\nif any Dx[y] changed: advertise Dx to all neighbours",
        "mistake": "Thinking a router sees the whole topology — it only ever knows neighbour vectors, which is exactly why bad news travels slowly (count-to-infinity)."
      },
      {
        "topic": "Distance vector routing: message movement",
        "terms": [
          "Distance",
          "vector",
          "routing",
          "message"
        ],
        "definition": "Distance vector routing: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Distance vector routing: message movement diagram, label the steps, then explain one example.",
        "visual": "distance-vector-routing-message-movement",
        "algo": [
          "Frame the problem Distance vector routing: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Distance vector routing: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Distance vector routing: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Distance vector routing: message movement as definition-only memorization."
      },
      {
        "topic": "Link state routing",
        "terms": [
          "LSP",
          "Flooding",
          "Topology database",
          "Dijkstra",
          "SPF tree"
        ],
        "definition": "In link-state routing every router discovers its own links/costs, packages them into a Link-State Packet (LSP), and floods it to all routers. Each router thus builds an identical map of the whole topology and runs Dijkstra's SPF algorithm locally to compute shortest paths to every destination.",
        "takeaway": "Link-state = flood your links to everyone, so each router builds the full map and runs Dijkstra independently.",
        "visual": "link-state-routing",
        "algo": [
          "Discover neighbours and the cost to each",
          "Build an LSP listing your links; flood it to all routers",
          "Every router assembles the same topology database",
          "Run Dijkstra's shortest-path-first to build the routing table"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Advertises",
              "v": "links (flooded)"
            },
            {
              "k": "Knows",
              "v": "full topology"
            },
            {
              "k": "Computes",
              "v": "Dijkstra SPF"
            }
          ],
          "note": "LS converges faster and avoids DV's count-to-infinity, at higher memory/CPU cost."
        },
        "dryRun": {
          "input": "Node A runs Dijkstra on the flooded map",
          "steps": [
            "A has the full graph from all LSPs",
            "Start: cost to A = 0, others = ∞",
            "Greedily pick the nearest unvisited node, relax its neighbours",
            "Repeat until every node has a final least cost → SPF tree"
          ],
          "result": "A computes shortest paths to all nodes from its own copy of the map"
        },
        "code": null,
        "mistake": "Confusing DV and LS — LS floods link info to everyone (full map + Dijkstra); DV shares only distance vectors with neighbours (Bellman-Ford)."
      },
      {
        "topic": "Link state routing: message movement",
        "terms": [
          "Link",
          "state",
          "routing",
          "message"
        ],
        "definition": "Link state routing: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Link state routing: message movement diagram, label the steps, then explain one example.",
        "visual": "link-state-routing-message-movement",
        "algo": [
          "Frame the problem Link state routing: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Link state routing: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Link state routing: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Link state routing: message movement as definition-only memorization."
      },
      {
        "topic": "Path vector routing",
        "terms": [
          "AS path",
          "Reachability",
          "Policy",
          "Loop-free",
          "Next AS"
        ],
        "definition": "Path-vector routing (the basis of BGP) advertises, for each destination, the entire list of autonomous systems (the AS-path) a route passes through — not just a numeric distance. A router rejects any advertised path that already contains its own AS, which prevents loops, and can apply policy on the path.",
        "takeaway": "Path vector carries the whole AS-path, not a single cost — seeing your own AS in a path detects and blocks loops.",
        "visual": "path-vector-routing",
        "algo": [
          "Advertise reachability as a full AS-path to each destination",
          "A receiver prepends its own AS number when re-advertising",
          "If an incoming path already lists your AS → reject (loop)",
          "Choose among valid paths by policy, not just shortest length"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Carries",
              "v": "AS-path list"
            },
            {
              "k": "Loop check",
              "v": "own AS in path"
            },
            {
              "k": "Choice",
              "v": "policy-driven"
            }
          ],
          "note": "Because the whole path is visible, operators can enforce business/policy rules."
        },
        "dryRun": {
          "input": "AS1 hears a route with path [AS2, AS1, AS3]",
          "steps": [
            "AS1 scans the advertised AS-path",
            "It finds its own number AS1 already present",
            "That means accepting it would create a loop",
            "AS1 rejects the advertisement"
          ],
          "result": "The visible AS-path lets AS1 detect and drop a looping route"
        },
        "code": null,
        "mistake": "Describing path vector as \"distance vector with hop counts\" — it carries the explicit AS-path for loop detection and policy, not a numeric distance."
      },
      {
        "topic": "Path vector routing: message movement",
        "terms": [
          "Path",
          "vector",
          "routing",
          "message"
        ],
        "definition": "Path vector routing: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Path vector routing: message movement diagram, label the steps, then explain one example.",
        "visual": "path-vector-routing-message-movement",
        "algo": [
          "Frame the problem Path vector routing: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Path vector routing: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Path vector routing: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Path vector routing: message movement as definition-only memorization."
      },
      {
        "topic": "RIP: message movement",
        "terms": [
          "RIP",
          "message",
          "movement"
        ],
        "definition": "RIP: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the RIP: message movement diagram, label the steps, then explain one example.",
        "visual": "rip-message-movement",
        "algo": [
          "Frame the problem RIP: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for RIP: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "RIP: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating RIP: message movement as definition-only memorization."
      },
      {
        "topic": "RIP",
        "terms": [
          "Distance vector",
          "Hop count",
          "Max 15",
          "Interior (IGP)",
          "30s updates"
        ],
        "definition": "RIP (Routing Information Protocol) is an interior distance-vector protocol using hop count as its metric. Routers broadcast their full table to neighbours every 30 seconds. A hop count of 16 means unreachable, capping networks at 15 hops; split horizon and hold-down timers limit routing loops.",
        "takeaway": "RIP = simple interior DV with hop-count metric, 15-hop limit, and 30-second full-table updates.",
        "visual": "rip",
        "algo": [
          "Metric = hop count (each router = 1 hop)",
          "Every 30 s, advertise the whole routing table to neighbours",
          "Apply Bellman-Ford to update least-hop routes",
          "16 hops = infinity (unreachable); split horizon prevents loops"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Type",
              "v": "IGP · DV"
            },
            {
              "k": "Metric",
              "v": "hop count"
            },
            {
              "k": "Limit",
              "v": "15 hops"
            }
          ],
          "note": "The 15-hop cap keeps count-to-infinity bounded but limits RIP to small networks."
        },
        "dryRun": {
          "input": "R1 learns of net N via R2",
          "steps": [
            "R2 advertises N at cost 2 hops",
            "R1 adds its own hop → 3 hops to N via R2",
            "R1 installs N: next hop R2, metric 3",
            "If cost ever reaches 16, N is marked unreachable"
          ],
          "result": "RIP builds routes by adding one hop per router, capped at 15"
        },
        "code": null,
        "mistake": "Calling RIP just \"a distance-vector protocol\" without its defining limits — hop-count metric, 15-hop maximum, periodic 30-second updates."
      },
      {
        "topic": "OSPF",
        "terms": [
          "Link state",
          "Cost metric",
          "Areas",
          "Dijkstra",
          "Interior (IGP)"
        ],
        "definition": "OSPF (Open Shortest Path First) is an interior link-state protocol. Routers flood LSAs describing their links (cost usually based on bandwidth), build an identical link-state database, and run Dijkstra to find shortest paths. Large networks are split into areas around a backbone (area 0) to limit flooding.",
        "takeaway": "OSPF = interior link-state routing with a bandwidth-based cost metric, Dijkstra SPF, and areas to scale flooding.",
        "visual": "ospf",
        "algo": [
          "Discover neighbours; flood LSAs describing local links + costs",
          "Every router builds the same link-state database",
          "Run Dijkstra SPF to compute shortest-path routes",
          "Group routers into areas (backbone area 0) to bound LSA flooding"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Type",
              "v": "IGP · LS"
            },
            {
              "k": "Metric",
              "v": "cost (bandwidth)"
            },
            {
              "k": "Scale",
              "v": "areas / area 0"
            }
          ],
          "note": "Faster convergence than RIP and no hop-count limit; higher CPU/memory cost."
        },
        "dryRun": {
          "input": "A new link comes up in area 1",
          "steps": [
            "The adjacent router originates an updated LSA",
            "The LSA floods within area 1",
            "Each router updates its database and re-runs Dijkstra",
            "New shortest paths install quickly (fast convergence)"
          ],
          "result": "Link-state flooding + Dijkstra converge faster than RIP's periodic updates"
        },
        "code": null,
        "mistake": "Using hop count for OSPF — OSPF's metric is cost (typically derived from link bandwidth), not a hop count."
      },
      {
        "topic": "OSPF: message movement",
        "terms": [
          "OSPF",
          "message",
          "movement"
        ],
        "definition": "OSPF: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the OSPF: message movement diagram, label the steps, then explain one example.",
        "visual": "ospf-message-movement",
        "algo": [
          "Frame the problem OSPF: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for OSPF: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "OSPF: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating OSPF: message movement as definition-only memorization."
      },
      {
        "topic": "BGP: message movement",
        "terms": [
          "BGP",
          "message",
          "movement"
        ],
        "definition": "BGP: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the BGP: message movement diagram, label the steps, then explain one example.",
        "visual": "bgp-message-movement",
        "algo": [
          "Frame the problem BGP: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for BGP: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "BGP: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating BGP: message movement as definition-only memorization."
      },
      {
        "topic": "BGP",
        "terms": [
          "Path vector",
          "Autonomous System",
          "AS-path",
          "Exterior (EGP)",
          "Policy"
        ],
        "definition": "BGP (Border Gateway Protocol) is the exterior path-vector protocol that routes between autonomous systems on the Internet. It advertises reachable prefixes together with the full AS-path; route selection is policy-based (business relationships), and the AS-path both prevents loops and expresses preference.",
        "takeaway": "BGP is the Internet's inter-AS glue: a path-vector protocol choosing routes by policy over the advertised AS-path.",
        "visual": "bgp",
        "algo": [
          "Establish a TCP session between border routers of neighbouring ASes",
          "Advertise reachable prefixes with their AS-path attribute",
          "Reject any path containing your own AS (loop prevention)",
          "Select the best route by policy/attributes, then advertise onward"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Type",
              "v": "EGP · path-vector"
            },
            {
              "k": "Between",
              "v": "autonomous systems"
            },
            {
              "k": "Chooses by",
              "v": "policy"
            }
          ],
          "note": "BGP prioritises policy and stability over shortest path; it runs over TCP port 179."
        },
        "dryRun": {
          "input": "AS100 reaches prefix P via two neighbours",
          "steps": [
            "Neighbour AS200 offers P with AS-path [200, 300]",
            "Neighbour AS400 offers P with AS-path [400, 500, 300]",
            "Loop check passes for both",
            "Policy (e.g. prefer customer/shorter path) selects [200,300]"
          ],
          "result": "BGP picks the policy-preferred AS-path, not necessarily the shortest"
        },
        "code": null,
        "mistake": "Treating BGP like an interior shortest-path protocol — it is policy-driven inter-AS path-vector routing, where business rules can override path length."
      },
      {
        "topic": "MOSPF",
        "terms": [
          "Multicast",
          "Group",
          "One-to-many",
          "OSPF extension",
          "Spanning tree"
        ],
        "definition": "Multicast routing delivers one packet to a group of interested receivers (one-to-many) without unicasting a copy to each. MOSPF (Multicast OSPF) extends OSPF: routers flood group-membership information in the link-state database and compute a source-rooted shortest-path multicast tree using Dijkstra.",
        "takeaway": "Multicast sends one copy per link toward a group; MOSPF adds group membership to OSPF's link-state map to build the delivery tree.",
        "visual": "mospf",
        "algo": [
          "Receivers join a multicast group (e.g. via IGMP)",
          "MOSPF floods group-membership LSAs into the OSPF database",
          "Each router runs Dijkstra to build a source-based shortest-path tree",
          "Packets are copied only where the tree branches toward members"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Delivery",
              "v": "one → many"
            },
            {
              "k": "Base",
              "v": "OSPF (LS)"
            },
            {
              "k": "Tree",
              "v": "source-rooted SPF"
            }
          ],
          "note": "Multicast forwards along a tree, so each link carries at most one copy."
        },
        "dryRun": {
          "input": "Video source S, members at D and E",
          "steps": [
            "D and E join the group; membership floods via MOSPF",
            "Routers compute the shortest-path tree rooted at S",
            "S sends one stream; it is duplicated only at branch routers",
            "D and E each receive a copy without S sending two streams"
          ],
          "result": "A single multicast tree delivers to all members with minimal copies"
        },
        "code": null,
        "mistake": "Confusing multicast with broadcast — multicast reaches only members that joined the group, via a tree, not every host on the network."
      },
      {
        "topic": "MOSPF: message movement",
        "terms": [
          "MOSPF",
          "message",
          "movement"
        ],
        "definition": "MOSPF: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the MOSPF: message movement diagram, label the steps, then explain one example.",
        "visual": "mospf-message-movement",
        "algo": [
          "Frame the problem MOSPF: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for MOSPF: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "MOSPF: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating MOSPF: message movement as definition-only memorization."
      }
    ],
    "checkpoints": [
      {
        "label": "IPv4 address",
        "bigO": "32-bit",
        "why": "Network+host split set by the subnet mask / CIDR prefix."
      },
      {
        "label": "IPv4 datagram",
        "bigO": "TTL,Proto",
        "why": "TTL stops loops; Protocol demultiplexes; ID/Offset reassemble fragments."
      },
      {
        "label": "IPv6",
        "bigO": "128-bit",
        "why": "Fixed 40-byte header, no checksum, no router fragmentation."
      },
      {
        "label": "Distance vector",
        "bigO": "Bellman-Ford",
        "why": "Share distance vectors with neighbours; risk of count-to-infinity."
      },
      {
        "label": "Link state",
        "bigO": "Dijkstra",
        "why": "Flood LSPs → full topology map → SPF at every router."
      },
      {
        "label": "RIP/OSPF/BGP",
        "bigO": "hop/cost/AS",
        "why": "RIP hop-count DV; OSPF cost link-state; BGP policy path-vector."
      }
    ]
  },
  {
    "n": 4,
    "id": "module-4",
    "title": "Transport Layer",
    "hours": 8,
    "question": "How do processes deliver reliable byte streams?",
    "story": [
      "UDP",
      "TCP",
      "Window",
      "Congestion"
    ],
    "syllabus": [
      "Transport-layer services",
      "Transport-layer protocols",
      "UDP",
      "TCP services",
      "TCP features",
      "TCP segments",
      "TCP connections",
      "TCP flow control",
      "TCP error control",
      "TCP congestion control"
    ],
    "notes": "Aligned to BCS502 Module_4 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Start with why the module matters. is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Start with why the module matters. diagram, label the steps, then explain one example.",
        "visual": "start-with-why-the-module-matters",
        "algo": [
          "Frame the problem Start with why the module matters. solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Start with why the module matters.",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Start with why the module matters. explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Start with why the module matters. as definition-only memorization."
      },
      {
        "topic": "Transport-layer services",
        "terms": [
          "Process-to-process",
          "Ports",
          "Multiplexing",
          "Encapsulation",
          "End-to-end"
        ],
        "definition": "The transport layer provides process-to-process delivery, extending IP's host-to-host service down to individual applications using port numbers. It multiplexes many application streams onto IP at the sender and demultiplexes them to the right process at the receiver, and can add reliability, ordering and flow control.",
        "takeaway": "Transport turns host-to-host IP into process-to-process delivery using port numbers to (de)multiplex application streams.",
        "visual": "transport-layer-services",
        "algo": [
          "Each process binds to a port number",
          "Sender multiplexes many streams onto IP (adds source/dest ports)",
          "Receiver demultiplexes by (dest port) to the right process",
          "Optionally add reliability, ordering, flow and congestion control"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Scope",
              "v": "process ↔ process"
            },
            {
              "k": "Uses",
              "v": "port numbers"
            },
            {
              "k": "Adds",
              "v": "mux / reliability"
            }
          ],
          "note": "A socket = (IP address, port) uniquely identifies an endpoint of a connection."
        },
        "dryRun": {
          "input": "One host runs a browser (port 50000) and email (port 50001)",
          "steps": [
            "Both send data down to IP with different source ports",
            "Replies arrive at the host's single IP address",
            "Transport reads the destination port of each segment",
            "Port 50000 → browser, 50001 → email process"
          ],
          "result": "Port-based demultiplexing delivers each segment to the correct process"
        },
        "code": null,
        "mistake": "Thinking IP already delivers to applications — IP only reaches the host; ports at the transport layer reach the specific process."
      },
      {
        "topic": "Transport-layer services: message movement",
        "terms": [
          "Transport-layer",
          "services",
          "message",
          "movement"
        ],
        "definition": "Transport-layer services: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Transport-layer services: message movement diagram, label the steps, then explain one example.",
        "visual": "transport-layer-services-message-movement",
        "algo": [
          "Frame the problem Transport-layer services: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Transport-layer services: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Transport-layer services: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Transport-layer services: message movement as definition-only memorization."
      },
      {
        "topic": "Transport-layer protocols",
        "terms": [
          "UDP",
          "TCP",
          "SCTP",
          "Reliability",
          "Overhead"
        ],
        "definition": "The Internet transport layer offers two main protocols. UDP is connectionless and minimal — just ports and a checksum, no reliability. TCP is connection-oriented, reliable, ordered and flow/congestion controlled. Applications pick based on whether they need speed/simplicity (UDP) or reliability (TCP).",
        "takeaway": "Choose UDP for lightweight, loss-tolerant traffic and TCP when you need a reliable, ordered byte stream.",
        "visual": "transport-layer-protocols",
        "algo": [
          "Need reliability/ordering? → TCP (connection + ACKs + retransmit)",
          "Need low overhead/low delay, loss OK? → UDP",
          "UDP: 8-byte header, no connection, no guarantees",
          "TCP: 20-byte header, handshake, sequence numbers, windows"
        ],
        "complexity": {
          "cells": [
            {
              "k": "UDP",
              "v": "connectionless"
            },
            {
              "k": "TCP",
              "v": "reliable stream"
            },
            {
              "k": "Header",
              "v": "8 B vs 20 B"
            }
          ],
          "note": "DNS queries, streaming and VoIP favour UDP; web, email and file transfer use TCP."
        },
        "dryRun": {
          "input": "Choosing transport for DNS vs a file download",
          "steps": [
            "DNS: one small query/response, speed matters → UDP",
            "File download: every byte must arrive in order → TCP",
            "UDP avoids handshake delay for the tiny DNS exchange",
            "TCP guarantees the file arrives complete and ordered"
          ],
          "result": "The reliability-vs-overhead trade-off decides UDP vs TCP"
        },
        "code": null,
        "mistake": "Assuming TCP is always the right choice — for short or delay-sensitive exchanges the handshake and retransmission overhead of TCP is a drawback."
      },
      {
        "topic": "Transport-layer protocols: message movement",
        "terms": [
          "Transport-layer",
          "protocols",
          "message",
          "movement"
        ],
        "definition": "Transport-layer protocols: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Transport-layer protocols: message movement diagram, label the steps, then explain one example.",
        "visual": "transport-layer-protocols-message-movement",
        "algo": [
          "Frame the problem Transport-layer protocols: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Transport-layer protocols: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Transport-layer protocols: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Transport-layer protocols: message movement as definition-only memorization."
      },
      {
        "topic": "UDP: message movement",
        "terms": [
          "UDP",
          "message",
          "movement"
        ],
        "definition": "UDP: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the UDP: message movement diagram, label the steps, then explain one example.",
        "visual": "udp-message-movement",
        "algo": [
          "Frame the problem UDP: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for UDP: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "UDP: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating UDP: message movement as definition-only memorization."
      },
      {
        "topic": "UDP",
        "terms": [
          "Connectionless",
          "8-byte header",
          "Checksum",
          "No ACK",
          "Datagram"
        ],
        "definition": "UDP (User Datagram Protocol) is a connectionless transport with an 8-byte header (source port, destination port, length, checksum). It offers no handshake, no acknowledgements, no ordering and no flow/congestion control — just process-to-process delivery with an optional checksum, so it is fast and low-overhead.",
        "takeaway": "UDP is a thin wrapper over IP: ports + a checksum, no reliability — perfect for small, fast, loss-tolerant messages.",
        "visual": "udp",
        "algo": [
          "Prepend the 8-byte header (src port, dst port, length, checksum)",
          "Hand the datagram straight to IP — no connection setup",
          "Receiver demultiplexes by destination port",
          "Checksum failure → silently discard; no retransmission"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Header",
              "v": "8 bytes"
            },
            {
              "k": "Setup",
              "v": "none"
            },
            {
              "k": "Reliability",
              "v": "none (app's job)"
            }
          ],
          "note": "Apps needing reliability over UDP (e.g. QUIC, DNS retries) must add it themselves."
        },
        "dryRun": {
          "input": "A DNS query sent over UDP",
          "steps": [
            "Client wraps the query in an 8-byte UDP header (dst port 53)",
            "IP carries the single datagram to the server",
            "Server replies with one UDP datagram",
            "If it is lost, the application (resolver) simply retries"
          ],
          "result": "A one-shot request/reply with no connection — minimal overhead"
        },
        "code": null,
        "mistake": "Expecting UDP to guarantee delivery or order — it does neither; any reliability must be built by the application."
      },
      {
        "topic": "TCP services",
        "terms": [
          "Connection-oriented",
          "Byte stream",
          "Full-duplex",
          "Reliable",
          "Ordered"
        ],
        "definition": "TCP provides a connection-oriented, reliable, ordered, full-duplex byte-stream service between two processes. It presents data as a continuous stream of bytes (not messages), numbers every byte, retransmits losses, delivers bytes in order, and lets both ends send simultaneously.",
        "takeaway": "TCP delivers a reliable, in-order, full-duplex byte stream — the application sees bytes, not TCP's underlying segments.",
        "visual": "tcp-services",
        "algo": [
          "Establish a connection (3-way handshake)",
          "Treat data as a numbered byte stream (not discrete messages)",
          "Acknowledge received bytes; retransmit anything unacknowledged",
          "Deliver bytes to the application strictly in order; close gracefully"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Model",
              "v": "byte stream"
            },
            {
              "k": "Duplex",
              "v": "full-duplex"
            },
            {
              "k": "Guarantee",
              "v": "reliable + ordered"
            }
          ],
          "note": "Byte-stream means TCP may merge/split app writes; message boundaries are not preserved."
        },
        "dryRun": {
          "input": "App writes \"HELLO\" then \"WORLD\"",
          "steps": [
            "TCP numbers bytes H(1)…D(10) in one continuous stream",
            "Segments may carry \"HELLOWO\" then \"RLD\" — boundaries not kept",
            "Receiver ACKs bytes and reorders any that arrive late",
            "App reads back the 10 bytes in exact order"
          ],
          "result": "The receiver sees the correct byte order, but not the original write boundaries"
        },
        "code": null,
        "mistake": "Assuming TCP preserves message boundaries — it is a byte stream, so two app writes can arrive merged into one read (or split)."
      },
      {
        "topic": "TCP services: message movement",
        "terms": [
          "TCP",
          "services",
          "message",
          "movement"
        ],
        "definition": "TCP services: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the TCP services: message movement diagram, label the steps, then explain one example.",
        "visual": "tcp-services-message-movement",
        "algo": [
          "Frame the problem TCP services: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for TCP services: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "TCP services: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating TCP services: message movement as definition-only memorization."
      },
      {
        "topic": "TCP features",
        "terms": [
          "Sequence numbers",
          "Cumulative ACK",
          "Sliding window",
          "Retransmission",
          "Full-duplex"
        ],
        "definition": "TCP's reliability features work together: each byte has a sequence number; the receiver returns cumulative acknowledgements for the next expected byte; a sliding window bounds bytes in flight; timers trigger retransmission of unacknowledged data; and piggybacking carries ACKs on data in the reverse direction.",
        "takeaway": "Sequence numbers + cumulative ACKs + a sliding window + retransmission timers are the machinery behind TCP reliability.",
        "visual": "tcp-features",
        "algo": [
          "Number every byte of the stream (sequence numbers)",
          "Receiver ACKs the next byte it expects (cumulative)",
          "Sender keeps unacked bytes in a window; window slides as ACKs arrive",
          "Timer expiry or duplicate ACKs → retransmit"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Numbering",
              "v": "per byte"
            },
            {
              "k": "ACK",
              "v": "cumulative"
            },
            {
              "k": "In flight",
              "v": "sliding window"
            }
          ],
          "note": "A cumulative ACK for byte N confirms all bytes before N arrived correctly."
        },
        "dryRun": {
          "input": "Bytes 1–1000 sent, segment 501–600 lost",
          "steps": [
            "Receiver gets 1–500, ACKs \"expect 501\"",
            "Later segments 601+ arrive but gap remains",
            "Receiver keeps ACKing 501 (duplicate ACKs)",
            "Sender retransmits 501–600; ACK jumps forward"
          ],
          "result": "Cumulative ACKs and retransmission close the gap in the byte stream"
        },
        "code": null,
        "mistake": "Reading a cumulative ACK as \"only byte N arrived\" — it means every byte up to N−1 arrived; N is the next one expected."
      },
      {
        "topic": "TCP features: message movement",
        "terms": [
          "TCP",
          "features",
          "message",
          "movement"
        ],
        "definition": "TCP features: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the TCP features: message movement diagram, label the steps, then explain one example.",
        "visual": "tcp-features-message-movement",
        "algo": [
          "Frame the problem TCP features: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for TCP features: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "TCP features: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating TCP features: message movement as definition-only memorization."
      },
      {
        "topic": "TCP segments",
        "terms": [
          "Seq number",
          "Ack number",
          "Flags SYN/ACK/FIN",
          "Window",
          "Header 20B"
        ],
        "definition": "A TCP segment has a ≥20-byte header carrying: Source/Destination ports, a 32-bit Sequence number, a 32-bit Acknowledgement number, control Flags (SYN, ACK, FIN, RST, PSH, URG), a Window size (receiver's advertised space), Checksum, and options such as MSS. The header is followed by the byte-stream data.",
        "takeaway": "Learn the working fields: Seq/Ack track bytes, Flags drive connection state, Window carries flow control, Checksum guards the segment.",
        "visual": "tcp-segments",
        "algo": [
          "Ports identify the two processes",
          "Sequence number = byte number of the first data byte in this segment",
          "Acknowledgement number = next byte expected from the other side",
          "Flags set connection state; Window advertises free buffer space"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Header",
              "v": "20–60 B"
            },
            {
              "k": "Seq/Ack",
              "v": "32-bit each"
            },
            {
              "k": "Window",
              "v": "flow control"
            }
          ],
          "note": "The Window field is how the receiver exercises TCP flow control on the sender."
        },
        "dryRun": {
          "input": "Segment carrying bytes 501–600 with an ACK",
          "steps": [
            "Seq = 501 (first data byte in this segment)",
            "Ack = 301, ACK flag set → confirms bytes up to 300 received",
            "Window = 4000 → sender may have ≤4000 bytes unacked",
            "Checksum covers header + data + pseudo-header"
          ],
          "result": "One segment simultaneously carries data, an ACK, and a flow-control window"
        },
        "code": null,
        "mistake": "Confusing the Sequence number (first byte in this segment) with the Acknowledgement number (next byte expected from the peer)."
      },
      {
        "topic": "TCP segments: message movement",
        "terms": [
          "TCP",
          "segments",
          "message",
          "movement"
        ],
        "definition": "TCP segments: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the TCP segments: message movement diagram, label the steps, then explain one example.",
        "visual": "tcp-segments-message-movement",
        "algo": [
          "Frame the problem TCP segments: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for TCP segments: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "TCP segments: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating TCP segments: message movement as definition-only memorization."
      },
      {
        "topic": "TCP connections",
        "terms": [
          "3-way handshake",
          "SYN",
          "SYN-ACK",
          "ACK",
          "FIN teardown"
        ],
        "definition": "TCP is connection-oriented: before data flows both ends synchronise initial sequence numbers via a three-way handshake (SYN → SYN-ACK → ACK), reaching the ESTABLISHED state. Data transfer follows, and the connection is closed gracefully with FIN/ACK exchanges (four-way close).",
        "takeaway": "Three-way handshake (SYN, SYN-ACK, ACK) synchronises both sides' sequence numbers before any data can be sent.",
        "visual": "tcp-connections",
        "algo": [
          "Client → SYN (seq = x): \"let's connect, my ISN is x\"",
          "Server → SYN+ACK (seq = y, ack = x+1): agrees, sends its ISN y",
          "Client → ACK (ack = y+1): confirms server's ISN",
          "Both now ESTABLISHED; FIN/ACK pairs later tear it down"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Open",
              "v": "3-way (SYN…)"
            },
            {
              "k": "Sync",
              "v": "initial seq nums"
            },
            {
              "k": "Close",
              "v": "FIN / ACK ×2"
            }
          ],
          "note": "Both directions must agree on starting sequence numbers, hence three segments not two."
        },
        "dryRun": {
          "input": "Client x=1000, server y=5000",
          "steps": [
            "Client → SYN seq=1000",
            "Server → SYN-ACK seq=5000 ack=1001",
            "Client → ACK ack=5001",
            "ESTABLISHED — data can now flow both ways"
          ],
          "result": "Three segments synchronise sequence numbers x↔y in both directions"
        },
        "code": null,
        "mistake": "Calling it a two-way handshake — three segments are needed so BOTH ends confirm each other's initial sequence number."
      },
      {
        "topic": "TCP connections: message movement",
        "terms": [
          "TCP",
          "connections",
          "message",
          "movement"
        ],
        "definition": "TCP connections: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the TCP connections: message movement diagram, label the steps, then explain one example.",
        "visual": "tcp-connections-message-movement",
        "algo": [
          "Frame the problem TCP connections: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for TCP connections: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "TCP connections: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating TCP connections: message movement as definition-only memorization."
      },
      {
        "topic": "TCP flow control",
        "terms": [
          "rwnd",
          "Advertised window",
          "Receiver buffer",
          "Sliding window",
          "Zero window"
        ],
        "definition": "TCP flow control stops a fast sender from overrunning the receiver's buffer. The receiver advertises its free buffer space in the Window field (rwnd) of every segment; the sender limits its bytes in flight to that advertised window, sliding it forward as ACKs free buffer space.",
        "takeaway": "The receiver's advertised window (rwnd) throttles the sender — bytes in flight never exceed the receiver's free buffer.",
        "visual": "tcp-flow-control",
        "algo": [
          "Receiver reports free buffer space as rwnd in each ACK",
          "Sender keeps (snd_nxt − snd_una) ≤ rwnd",
          "As the app reads data, buffer frees → rwnd grows → window slides",
          "rwnd = 0 pauses the sender until a window update arrives"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Signal",
              "v": "rwnd field"
            },
            {
              "k": "Limit",
              "v": "in-flight ≤ rwnd"
            },
            {
              "k": "Protects",
              "v": "receiver buffer"
            }
          ],
          "note": "A persist timer probes a zero window so the sender is not stuck forever."
        },
        "dryRun": {
          "input": "Receiver buffer = 4 KB, app reading slowly",
          "steps": [
            "Receiver advertises rwnd = 4096",
            "Sender sends 4 KB, then stops (window full)",
            "App reads 2 KB → receiver advertises rwnd = 2048",
            "Sender may now send 2 KB more"
          ],
          "result": "rwnd tracks free buffer so the sender never overflows the receiver"
        },
        "code": null,
        "mistake": "Confusing flow control (receiver window, rwnd) with congestion control (network window, cwnd) — the sender is limited by the minimum of the two."
      },
      {
        "topic": "TCP flow control: message movement",
        "terms": [
          "TCP",
          "flow",
          "control",
          "message"
        ],
        "definition": "TCP flow control: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the TCP flow control: message movement diagram, label the steps, then explain one example.",
        "visual": "tcp-flow-control-message-movement",
        "algo": [
          "Frame the problem TCP flow control: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for TCP flow control: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "TCP flow control: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating TCP flow control: message movement as definition-only memorization."
      },
      {
        "topic": "TCP error control",
        "terms": [
          "Checksum",
          "Sequence numbers",
          "ACK",
          "Timeout/RTO",
          "Fast retransmit"
        ],
        "definition": "TCP error control ensures reliable, ordered delivery. A checksum detects corruption; sequence numbers detect loss, duplication and reordering; cumulative ACKs confirm receipt; a retransmission timer (RTO) resends unacknowledged data; and three duplicate ACKs trigger fast retransmit without waiting for the timer.",
        "takeaway": "TCP recovers errors with checksums, sequence numbers, ACKs, an RTO timer, and fast retransmit on triple duplicate ACKs.",
        "visual": "tcp-error-control",
        "algo": [
          "Checksum on each segment → corrupted segments discarded",
          "Sequence numbers reorder data and drop duplicates",
          "Sender retransmits when the RTO timer expires with no ACK",
          "3 duplicate ACKs → fast retransmit the missing segment immediately"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Detect",
              "v": "checksum + seq"
            },
            {
              "k": "Timer",
              "v": "RTO (adaptive)"
            },
            {
              "k": "Fast path",
              "v": "3 dup ACKs"
            }
          ],
          "note": "RTO is derived from measured RTT (Jacobson's algorithm); it is not a fixed value."
        },
        "dryRun": {
          "input": "Segment 501–600 lost; later segments arrive",
          "steps": [
            "Receiver keeps ACKing \"501\" as gaps arrive",
            "Sender counts 3 duplicate ACKs for 501",
            "Fast retransmit resends 501–600 without waiting for RTO",
            "Receiver ACKs past the gap; stream continues"
          ],
          "result": "Duplicate ACKs let TCP retransmit before the timeout fires"
        },
        "code": null,
        "mistake": "Merging error control with congestion control — error control repairs lost/corrupt data; congestion control adjusts the sending rate. Keep them separate."
      },
      {
        "topic": "TCP error control: message movement",
        "terms": [
          "TCP",
          "error",
          "control",
          "message"
        ],
        "definition": "TCP error control: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the TCP error control: message movement diagram, label the steps, then explain one example.",
        "visual": "tcp-error-control-message-movement",
        "algo": [
          "Frame the problem TCP error control: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for TCP error control: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "TCP error control: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating TCP error control: message movement as definition-only memorization."
      },
      {
        "topic": "TCP congestion control",
        "terms": [
          "cwnd",
          "Slow start",
          "Congestion avoidance",
          "ssthresh",
          "AIMD"
        ],
        "definition": "TCP congestion control protects the network core (not the receiver). The sender keeps a congestion window (cwnd) and sends min(cwnd, rwnd). It grows cwnd exponentially in slow start until ssthresh, then linearly in congestion avoidance (additive increase); a loss cuts cwnd (multiplicative decrease) — the AIMD behaviour.",
        "takeaway": "cwnd grows exponentially (slow start) then linearly (avoidance) and is slashed on loss — additive-increase / multiplicative-decrease.",
        "visual": "tcp-congestion-control",
        "algo": [
          "Slow start: cwnd starts small, doubles each RTT until it reaches ssthresh",
          "Congestion avoidance: past ssthresh, cwnd grows by ~1 MSS per RTT",
          "Loss by timeout: ssthresh = cwnd/2, cwnd = 1 → slow start again",
          "Loss by 3 dup ACKs: fast recovery — halve cwnd, avoid full restart"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Rate limit",
              "v": "min(cwnd,rwnd)"
            },
            {
              "k": "Grow",
              "v": "exp → linear"
            },
            {
              "k": "On loss",
              "v": "cut (MD)"
            }
          ],
          "note": "Sending rate is limited by the smaller of cwnd (network) and rwnd (receiver)."
        },
        "dryRun": {
          "input": "cwnd starts at 1 MSS, ssthresh = 8",
          "steps": [
            "Slow start: cwnd 1→2→4→8 (doubling each RTT)",
            "At cwnd = 8 = ssthresh → switch to congestion avoidance",
            "cwnd grows 8→9→10 (linear, +1 per RTT)",
            "Loss (timeout): ssthresh = cwnd/2, cwnd = 1, slow start again"
          ],
          "result": "The exponential-then-linear sawtooth is classic TCP AIMD"
        },
        "code": "// per-ACK, simplified\nif (cwnd < ssthresh)      // slow start\n    cwnd += 1 MSS;        // doubles per RTT\nelse                      // congestion avoidance\n    cwnd += MSS*MSS/cwnd; // +~1 MSS per RTT\non timeout:  ssthresh = cwnd/2; cwnd = 1 MSS;  // restart slow start\non 3 dupACK: ssthresh = cwnd/2; cwnd = ssthresh; // fast recovery",
        "mistake": "Adding algorithms outside the syllabus (BBR, CUBIC) — stick to slow start, congestion avoidance, ssthresh and AIMD as the source defines them."
      },
      {
        "topic": "TCP congestion control: message movement",
        "terms": [
          "TCP",
          "congestion",
          "control",
          "message"
        ],
        "definition": "TCP congestion control: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the TCP congestion control: message movement diagram, label the steps, then explain one example.",
        "visual": "tcp-congestion-control-message-movement",
        "algo": [
          "Frame the problem TCP congestion control: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for TCP congestion control: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "TCP congestion control: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating TCP congestion control: message movement as definition-only memorization."
      }
    ],
    "checkpoints": [
      {
        "label": "Transport service",
        "bigO": "ports",
        "why": "Ports turn host-to-host IP into process-to-process delivery."
      },
      {
        "label": "UDP vs TCP",
        "bigO": "8B vs 20B",
        "why": "UDP connectionless, no reliability; TCP reliable ordered byte stream."
      },
      {
        "label": "3-way handshake",
        "bigO": "SYN×3",
        "why": "SYN → SYN-ACK → ACK synchronises both sides' sequence numbers."
      },
      {
        "label": "TCP segment",
        "bigO": "seq/ack",
        "why": "Seq = first byte here; Ack = next byte expected from the peer."
      },
      {
        "label": "Flow vs congestion",
        "bigO": "rwnd/cwnd",
        "why": "Sender sends min(rwnd, cwnd); rwnd protects receiver, cwnd protects network."
      },
      {
        "label": "Congestion control",
        "bigO": "AIMD",
        "why": "Slow start (exp) → avoidance (linear) → cut on loss."
      }
    ]
  },
  {
    "n": 5,
    "id": "module-5",
    "title": "Application Layer Protocols",
    "hours": 8,
    "question": "How do applications name, fetch and transfer?",
    "story": [
      "HTTP",
      "DNS",
      "Mail",
      "SSH"
    ],
    "syllabus": [
      "Application layer introduction",
      "Client-server programming",
      "World Wide Web and HTTP",
      "FTP",
      "Electronic mail",
      "Domain Name System (DNS)",
      "TELNET",
      "Secure Shell (SSH)"
    ],
    "notes": "Aligned to BCS502 Module_5 PPTX + VTU 5th sem syllabus.",
    "units": [
      {
        "topic": "Start with why the module matters.",
        "terms": [
          "Start",
          "with",
          "why",
          "the"
        ],
        "definition": "Start with why the module matters. is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Start with why the module matters. diagram, label the steps, then explain one example.",
        "visual": "start-with-why-the-module-matters",
        "algo": [
          "Frame the problem Start with why the module matters. solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Start with why the module matters.",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Start with why the module matters. explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Start with why the module matters. as definition-only memorization."
      },
      {
        "topic": "Application layer introduction",
        "terms": [
          "Client-server",
          "Peer-to-peer",
          "Protocols",
          "Ports",
          "Messages"
        ],
        "definition": "The application layer is the top layer where network programs exchange messages using application protocols (HTTP, FTP, SMTP, DNS…). Two architectural paradigms exist: client-server, where an always-on server answers many clients, and peer-to-peer, where end hosts communicate directly without a central server.",
        "takeaway": "The application layer defines the messages programs exchange; its two paradigms are client-server and peer-to-peer.",
        "visual": "application-layer-introduction",
        "algo": [
          "Pick an application protocol (HTTP, SMTP, DNS…) and its port",
          "Client-server: a fixed server process listens; clients initiate",
          "Peer-to-peer: hosts act as both client and server",
          "Exchange request/response messages defined by the protocol"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Paradigms",
              "v": "C/S · P2P"
            },
            {
              "k": "Uses",
              "v": "ports + protocols"
            },
            {
              "k": "Unit",
              "v": "messages"
            }
          ],
          "note": "The transport layer (TCP/UDP) carries these messages; the app layer defines them."
        },
        "dryRun": {
          "input": "A web app vs a file-sharing swarm",
          "steps": [
            "Web: browser (client) requests from a fixed web server",
            "That is client-server — server always on at a known address",
            "File sharing: each peer both uploads and downloads",
            "That is peer-to-peer — no central server needed"
          ],
          "result": "The same layer supports both centralized and decentralized designs"
        },
        "code": null,
        "mistake": "Confusing the application layer (defines messages/protocols) with the transport layer (moves the bytes) — the app layer never routes or reorders data itself."
      },
      {
        "topic": "Application layer introduction: message movement",
        "terms": [
          "Application",
          "layer",
          "introduction",
          "message"
        ],
        "definition": "Application layer introduction: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Application layer introduction: message movement diagram, label the steps, then explain one example.",
        "visual": "application-layer-introduction-message-movement",
        "algo": [
          "Frame the problem Application layer introduction: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Application layer introduction: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Application layer introduction: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Application layer introduction: message movement as definition-only memorization."
      },
      {
        "topic": "Client-server programming",
        "terms": [
          "Socket",
          "IP + port",
          "listen/accept",
          "connect",
          "Request/response"
        ],
        "definition": "Client-server programming uses sockets — an endpoint identified by (IP address, port). The server creates a socket, binds to a port, listens and accepts connections; the client creates a socket and connects to the server's IP/port. They then exchange request/response messages over the transport connection.",
        "takeaway": "A socket = (IP, port); the server binds-listens-accepts while the client connects, then they exchange messages.",
        "visual": "client-server-programming",
        "algo": [
          "Server: socket() → bind(port) → listen() → accept()",
          "Client: socket() → connect(server IP, port)",
          "Exchange request/response through the connected sockets",
          "close() the sockets when done"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Endpoint",
              "v": "socket = IP:port"
            },
            {
              "k": "Server",
              "v": "bind/listen/accept"
            },
            {
              "k": "Client",
              "v": "connect"
            }
          ],
          "note": "A connection is uniquely identified by the 4-tuple (src IP, src port, dst IP, dst port)."
        },
        "dryRun": {
          "input": "Browser connecting to a web server on port 80",
          "steps": [
            "Server has bind(80) → listen → accept (waiting)",
            "Client socket connect(serverIP, 80)",
            "TCP handshake completes; accept() returns a connected socket",
            "Client sends GET; server sends the page; both close"
          ],
          "result": "The listen/accept + connect pattern sets up the request/response exchange"
        },
        "code": "// TCP server (pseudocode)\ns = socket();  bind(s, port);  listen(s);\nc = accept(s);            // blocks until a client connects\nrecv(c, req);  send(c, resp);  close(c);\n\n// TCP client\ns = socket();  connect(s, serverIP, port);\nsend(s, req);  recv(s, resp);  close(s);",
        "mistake": "Thinking a port alone identifies a connection — a TCP connection needs the full 4-tuple of both IPs and both ports."
      },
      {
        "topic": "Client-server programming: message movement",
        "terms": [
          "Client-server",
          "programming",
          "message",
          "movement"
        ],
        "definition": "Client-server programming: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Client-server programming: message movement diagram, label the steps, then explain one example.",
        "visual": "client-server-programming-message-movement",
        "algo": [
          "Frame the problem Client-server programming: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Client-server programming: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Client-server programming: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Client-server programming: message movement as definition-only memorization."
      },
      {
        "topic": "World Wide Web and HTTP",
        "terms": [
          "URL",
          "Request/response",
          "Methods GET/POST",
          "Status codes",
          "Stateless"
        ],
        "definition": "The Web is a system of hyperlinked resources named by URLs and fetched over HTTP. HTTP is a stateless client-server request/response protocol over TCP (port 80): the client sends a request line (method + URL + version) with headers; the server returns a status code (200, 404…) with headers and the resource body.",
        "takeaway": "HTTP is a stateless request/response protocol: method+URL go up, a status code + body come back; cookies add state.",
        "visual": "world-wide-web-and-http",
        "algo": [
          "Client opens a TCP connection to the server (port 80/443)",
          "Client sends a request: method (GET/POST) + URL + headers",
          "Server returns a status line (e.g. 200 OK) + headers + body",
          "Persistent connections reuse one TCP connection for many requests"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Transport",
              "v": "TCP :80/:443"
            },
            {
              "k": "Model",
              "v": "stateless req/resp"
            },
            {
              "k": "State via",
              "v": "cookies"
            }
          ],
          "note": "HTTP is stateless; persistent (keep-alive) connections avoid a new handshake per object."
        },
        "dryRun": {
          "input": "Browser requests /index.html",
          "steps": [
            "TCP connection to example.com:80",
            "Request: GET /index.html HTTP/1.1, Host: example.com",
            "Server responds: HTTP/1.1 200 OK, Content-Type, body",
            "Browser renders; embedded images fetched over the same connection"
          ],
          "result": "One request/response cycle retrieves the page; keep-alive reuses the connection"
        },
        "code": null,
        "mistake": "Assuming HTTP remembers previous requests — it is stateless, so state (login, cart) is added by cookies/sessions, not by HTTP itself."
      },
      {
        "topic": "World Wide Web and HTTP: message movement",
        "terms": [
          "World",
          "Wide",
          "Web",
          "and"
        ],
        "definition": "World Wide Web and HTTP: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the World Wide Web and HTTP: message movement diagram, label the steps, then explain one example.",
        "visual": "world-wide-web-and-http-message-movement",
        "algo": [
          "Frame the problem World Wide Web and HTTP: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for World Wide Web and HTTP: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "World Wide Web and HTTP: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating World Wide Web and HTTP: message movement as definition-only memorization."
      },
      {
        "topic": "FTP: message movement",
        "terms": [
          "FTP",
          "message",
          "movement"
        ],
        "definition": "FTP: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the FTP: message movement diagram, label the steps, then explain one example.",
        "visual": "ftp-message-movement",
        "algo": [
          "Frame the problem FTP: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for FTP: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "FTP: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating FTP: message movement as definition-only memorization."
      },
      {
        "topic": "FTP",
        "terms": [
          "Control connection",
          "Data connection",
          "Port 21/20",
          "Active/passive",
          "Two channels"
        ],
        "definition": "FTP (File Transfer Protocol) transfers files using two separate TCP connections: a control connection (port 21) that stays open for commands/replies, and a data connection (port 20 in active mode) opened per file transfer. Separating control from data is FTP's defining feature.",
        "takeaway": "FTP uses two connections — a persistent control channel (21) for commands and a separate data channel (20) for the actual file bytes.",
        "visual": "ftp",
        "algo": [
          "Open the control connection to port 21; authenticate",
          "Send commands (USER, PASS, RETR, STOR) over the control channel",
          "Open a separate data connection for each file transfer",
          "Active mode: server connects back; passive mode: client connects to server"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Control",
              "v": "port 21 (persist)"
            },
            {
              "k": "Data",
              "v": "port 20 (per file)"
            },
            {
              "k": "Modes",
              "v": "active / passive"
            }
          ],
          "note": "The control connection persists the whole session; data connections open and close per file."
        },
        "dryRun": {
          "input": "Downloading report.pdf",
          "steps": [
            "Control connection (21) established, USER/PASS accepted",
            "Client issues RETR report.pdf over the control channel",
            "A data connection opens for the file bytes",
            "File transfers on the data channel; it closes; control stays open"
          ],
          "result": "Commands and data flow on separate channels — FTP's two-connection design"
        },
        "code": null,
        "mistake": "Reducing FTP to \"transfers files\" and missing its defining trait: separate control (21) and data (20) connections."
      },
      {
        "topic": "Electronic mail",
        "terms": [
          "UA",
          "MTA/SMTP",
          "MAA/POP3/IMAP",
          "Push vs pull",
          "Mailbox"
        ],
        "definition": "E-mail uses three agents: the User Agent (compose/read), the Message Transfer Agent (MTA) that relays mail server-to-server using SMTP (push), and the Message Access Agent (MAA) that lets the recipient pull mail from their mailbox using POP3 or IMAP. SMTP pushes toward the destination; POP3/IMAP pull to the client.",
        "takeaway": "SMTP pushes mail sender→server→server; POP3/IMAP pull it from the mailbox to the recipient's client.",
        "visual": "electronic-mail",
        "algo": [
          "Sender's UA hands the message to its mail server",
          "MTAs relay it with SMTP (push) to the recipient's mail server",
          "The message sits in the recipient's mailbox",
          "Recipient's UA pulls it with POP3/IMAP (MAA)"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Send",
              "v": "SMTP (push)"
            },
            {
              "k": "Retrieve",
              "v": "POP3 / IMAP"
            },
            {
              "k": "Agents",
              "v": "UA · MTA · MAA"
            }
          ],
          "note": "IMAP keeps mail on the server (multi-device); POP3 typically downloads and deletes."
        },
        "dryRun": {
          "input": "Alice mails Bob",
          "steps": [
            "Alice's UA → her mail server (SMTP)",
            "Her MTA relays via SMTP to Bob's mail server",
            "Message stored in Bob's mailbox",
            "Bob's UA retrieves it with IMAP"
          ],
          "result": "Push (SMTP) delivers to the mailbox; pull (IMAP/POP3) fetches to Bob"
        },
        "code": null,
        "mistake": "Using SMTP to download mail — SMTP only pushes mail between servers; retrieval to the client uses POP3 or IMAP."
      },
      {
        "topic": "Electronic mail: message movement",
        "terms": [
          "Electronic",
          "mail",
          "message",
          "movement"
        ],
        "definition": "Electronic mail: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Electronic mail: message movement diagram, label the steps, then explain one example.",
        "visual": "electronic-mail-message-movement",
        "algo": [
          "Frame the problem Electronic mail: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Electronic mail: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Electronic mail: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Electronic mail: message movement as definition-only memorization."
      },
      {
        "topic": "Domain Name System",
        "terms": [
          "Name→IP",
          "Hierarchy",
          "Root/TLD/Auth",
          "Resolver",
          "Caching"
        ],
        "definition": "DNS maps human-readable names (www.example.com) to IP addresses using a distributed, hierarchical namespace: root servers, top-level-domain (TLD) servers (.com, .org), and authoritative servers for each domain. A local resolver walks this hierarchy (usually iteratively) and caches answers to speed up future lookups.",
        "takeaway": "DNS resolves names to IPs by walking a hierarchy — resolver → root → TLD → authoritative — and caching the answer on the way back.",
        "visual": "domain-name-system",
        "algo": [
          "App asks the local resolver to resolve a name",
          "Resolver queries a root server → referred to the TLD server",
          "TLD server → referred to the domain's authoritative server",
          "Authoritative server returns the IP; resolver caches it (TTL) and replies"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Maps",
              "v": "name → IP"
            },
            {
              "k": "Hierarchy",
              "v": "root·TLD·auth"
            },
            {
              "k": "Speed",
              "v": "caching (TTL)"
            }
          ],
          "note": "From the client it looks recursive; the resolver usually queries iteratively."
        },
        "dryRun": {
          "input": "Resolve www.example.com",
          "steps": [
            "Resolver → root: \"who handles .com?\" → TLD server address",
            "Resolver → .com TLD: \"who handles example.com?\" → auth server",
            "Resolver → authoritative: returns the A record (IP)",
            "Resolver caches the answer and returns the IP to the app"
          ],
          "result": "The name resolves to its IP via a three-level hierarchy walk"
        },
        "code": null,
        "mistake": "Imagining one giant DNS server holding everything — DNS is a distributed hierarchy of root, TLD and authoritative servers, with heavy caching."
      },
      {
        "topic": "Domain Name System: message movement",
        "terms": [
          "Domain",
          "Name",
          "System",
          "message"
        ],
        "definition": "Domain Name System: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Domain Name System: message movement diagram, label the steps, then explain one example.",
        "visual": "domain-name-system-message-movement",
        "algo": [
          "Frame the problem Domain Name System: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Domain Name System: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Domain Name System: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Domain Name System: message movement as definition-only memorization."
      },
      {
        "topic": "TELNET",
        "terms": [
          "Remote login",
          "NVT",
          "Plaintext",
          "Port 23",
          "TCP"
        ],
        "definition": "TELNET provides remote terminal login over TCP (port 23). It maps the client's and server's different terminals onto a common Network Virtual Terminal (NVT) so characters translate correctly. Crucially, TELNET sends everything — including passwords — in plaintext, so it is insecure over untrusted networks.",
        "takeaway": "TELNET is remote login via a Network Virtual Terminal, but it sends everything (including passwords) in plaintext.",
        "visual": "telnet",
        "algo": [
          "Client opens a TCP connection to server port 23",
          "Both ends translate their terminal to/from the NVT format",
          "Keystrokes travel to the server; output returns to the client",
          "All data, including credentials, is unencrypted"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Purpose",
              "v": "remote login"
            },
            {
              "k": "Abstraction",
              "v": "NVT"
            },
            {
              "k": "Security",
              "v": "plaintext (none)"
            }
          ],
          "note": "The NVT abstraction lets dissimilar terminals interoperate over one channel."
        },
        "dryRun": {
          "input": "Logging into a remote host with TELNET",
          "steps": [
            "Client connects to host:23",
            "Login prompt sent back over the NVT",
            "User types username/password — sent as plaintext",
            "Anyone sniffing the link can read the credentials"
          ],
          "result": "Remote login works, but the plaintext channel exposes the password"
        },
        "code": null,
        "mistake": "Treating TELNET as safe for real use — it has no encryption; SSH replaced it precisely because credentials travel in clear text."
      },
      {
        "topic": "TELNET: message movement",
        "terms": [
          "TELNET",
          "message",
          "movement"
        ],
        "definition": "TELNET: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the TELNET: message movement diagram, label the steps, then explain one example.",
        "visual": "telnet-message-movement",
        "algo": [
          "Frame the problem TELNET: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for TELNET: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "TELNET: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating TELNET: message movement as definition-only memorization."
      },
      {
        "topic": "Secure Shell",
        "terms": [
          "Encryption",
          "Authentication",
          "Port 22",
          "Key exchange",
          "Tunneling"
        ],
        "definition": "SSH (Secure Shell) is the secure replacement for TELNET, providing encrypted remote login over TCP (port 22). It negotiates encryption keys, authenticates the server (host key) and user (password or public key), then protects the whole session; it can also tunnel other TCP connections (port forwarding).",
        "takeaway": "SSH does what TELNET does — remote login — but with encryption, strong authentication, and optional tunneling.",
        "visual": "secure-shell",
        "algo": [
          "Client connects to server port 22",
          "Key exchange establishes a shared session encryption key",
          "Server authenticated by its host key; user by password or public key",
          "All traffic is encrypted; SSH can also forward/tunnel other ports"
        ],
        "complexity": {
          "cells": [
            {
              "k": "Purpose",
              "v": "secure login"
            },
            {
              "k": "Protection",
              "v": "encrypted"
            },
            {
              "k": "Auth",
              "v": "password / key"
            }
          ],
          "note": "Public-key authentication and port forwarding are SSH's advantages over TELNET."
        },
        "dryRun": {
          "input": "Compare an SSH login with TELNET",
          "steps": [
            "SSH negotiates a session key first (key exchange)",
            "Server proves its identity via its host key",
            "User authenticates (password/public key) over the encrypted channel",
            "A sniffer sees only ciphertext — credentials are safe"
          ],
          "result": "Encryption + authentication make SSH safe where TELNET is not"
        },
        "code": null,
        "mistake": "Conflating SSH with TELNET — both give remote login, but only SSH encrypts and authenticates; never send passwords over TELNET."
      },
      {
        "topic": "Secure Shell: message movement",
        "terms": [
          "Secure",
          "Shell",
          "message",
          "movement"
        ],
        "definition": "Secure Shell: message movement is taught as a working mechanism: problem context → core idea → steps → classroom example → exam point.",
        "takeaway": "Draw the Secure Shell: message movement diagram, label the steps, then explain one example.",
        "visual": "secure-shell-message-movement",
        "algo": [
          "Frame the problem Secure Shell: message movement solves",
          "State the core mechanism in one sentence",
          "Walk the working steps on a classroom example",
          "Write the exam-ready diagram labels"
        ],
        "complexity": {
          "best": "—",
          "avg": "—",
          "worst": "—",
          "note": "Argue with labelled diagram + animated mechanism"
        },
        "dryRun": {
          "input": "Classroom scenario for Secure Shell: message movement",
          "steps": [
            "Identify actors/context",
            "Apply the mechanism",
            "Observe the outcome",
            "State the exam takeaway"
          ],
          "result": "Secure Shell: message movement explained with a visible mechanism"
        },
        "code": null,
        "mistake": "Treating Secure Shell: message movement as definition-only memorization."
      }
    ],
    "checkpoints": [
      {
        "label": "App paradigms",
        "bigO": "C/S·P2P",
        "why": "Client-server has an always-on server; P2P hosts serve each other."
      },
      {
        "label": "Sockets",
        "bigO": "IP:port",
        "why": "Server bind/listen/accept; client connect; connection = 4-tuple."
      },
      {
        "label": "HTTP",
        "bigO": "stateless",
        "why": "Request (method+URL) → status code + body; cookies add state."
      },
      {
        "label": "FTP",
        "bigO": "2 channels",
        "why": "Control on 21 (persistent) + data on 20 (per transfer)."
      },
      {
        "label": "E-mail",
        "bigO": "push/pull",
        "why": "SMTP pushes server-to-server; POP3/IMAP pull to the client."
      },
      {
        "label": "DNS",
        "bigO": "root→TLD→auth",
        "why": "Hierarchy walk resolves name→IP; answers cache with a TTL."
      }
    ]
  }
]
export function getModule(n) { return MODULES.find((m) => m.n === n) || null }
export function getCn502Module(n) { return getModule(n) }

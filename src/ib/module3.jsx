import {
  buildModule, Frame, Hook,
  MiniCase, ExamPack, Definition, Case,
  Insight, ExamTip, Update, ManagerView, RealWorld, Think, DidYouKnow,
} from './kit'
import {
  InsightOpener,
  InsightQuestion,
  CountryFirmBridge,
  TheoryRolesRadar,
  TheoryEvolution,
  TheoryGapChain,
  MercantilismVault,
  ZeroSumVsGains,
  AbsoluteDuel,
  AssumptionBoard,
  AbsoluteVsComparative,
  ComparativeReasoning,
  FeatureLattice,
  WheatClothLedger,
  ValueChainPlacement,
  FactorBalance,
  FactorAssumptionsBoard,
  ClassicalTrio,
  PlcCurve,
  PlcMigration,
  PlcInnovatorAdvantages,
  SmartphonePlcCase,
  PlcModernSplit,
  RivalryArena,
  RivalryWeapons,
  PorterDiamondBuild,
  DiamondDeterminants,
  BengaluruCluster,
  PorterVsHO,
  TheorySynthesis,
  InsightPayoff,
} from './scenes3'

/**
 * MODULE 3 — Theories of International Business (V9.0, MBA content excellence)
 * Chapter identity: Ⅲ — INSIGHT
 * Syllabus (22MBA401 / VTU): Introduction, Mercantilism, Absolute Cost Advantage,
 * Comparative Cost Advantage, Comparative Cost Advantage with Money, Relative
 * Factor Endowment, Product Life Cycle, Global Strategic Rivalry, Porter’s
 * National Competitive Advantage.
 * Primary source: IB -M-3.pptx. PPT types list also names Haberler (opportunity
 * cost) and Krugman (new trade) — woven into comparative / rivalry enrichment.
 * CONTENT APPROVED & LOCKED — presentation-only cinematic Insight pass.
 * Personality: Observe → Explain → Model → Compare → Apply
 * Visual metaphor: THE BLUEPRINT. Engine V7 frozen — scenes3 + ibChapter3.css only.
 */
const module3 = [
  /* 01 — HOOK ------------------------------------------------------------- */
  {
    id: 'hook',
    labels: ['Mercantilism', 'Absolute', 'Comparative', 'H-O', 'PLC', 'Rivalry', 'Porter'],
    title: 'Why Nations Trade — The Insight Question',
    composition: 'theory-opener',
    tone: 'ib-scene-editorial',
    film: { wow: true, camera: 'push' },
    content: (
      <Hook
        eyebrow="Module 3 · Insight"
        question="If every country can make everything, why does anyone trade?"
        sub="Module 1 showed opportunity across borders. Module 2 taught you to judge the country climate. Module 3 answers the deeper question: what forces make trade, specialization and national competitiveness emerge — and how managers use those explanations."
        visual={<InsightQuestion />}
      />
    ),
  },

  /* 02 — INTRODUCTION ---------------------------------------------------- */
  {
    id: 'intro',
    title: 'Theories of International Business — Introduction',
    composition: 'blueprint',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        mode="standard"
        label="What theories do"
        title="Theories explain patterns, gains and strategies"
        lead="Theories of international business explore the reasons and mechanisms behind trade and investment between countries. They help explain patterns of trade, the benefits derived, and the strategies nations and firms employ in the global marketplace — ranging from early country-based theories of national wealth to modern firm-based theories of company strategy."
        visual={<CountryFirmBridge />}
        takeaway="IB theories = explanations of trade patterns + gains + nation/firm strategies."
      >
        <Definition term="Theories of International Business" keywords={['trade patterns', 'specialization', 'strategy']}>
          Frameworks that explain why countries and firms trade and invest across borders, what benefits arise, and how competitive advantage is created.
        </Definition>
      </Frame>
    ),
  },

  /* 03 — ROLE OF THEORIES ------------------------------------------------ */
  {
    id: 'role',
    title: 'Role of International Trade Theories',
    composition: 'editorial',
    tone: 'ib-scene-emerald',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="Why study them"
        title="Theories guide strategy, policy and evolution of IB"
        lead="Trade theories are not museum pieces. They help managers and policymakers understand dynamics, design strategy, inform policy, interpret the evolution of IB, address global challenges and navigate complexity."
        visual={<TheoryRolesRadar />}
        takeaway="Role of theories = dynamics · strategy · policy · evolution · challenges · complexity."
      >
        <ManagerView>Use theories as lenses, not as laws: each lens highlights a different decision variable — cost, factors, product stage, firm capability or national ecosystem.</ManagerView>
      </Frame>
    ),
  },

  /* 04 — TYPES / MAP ----------------------------------------------------- */
  {
    id: 'types',
    title: 'Types of International Trade Theories',
    composition: 'timeline',
    film: { hero: true, heroTier: '2', camera: 'pan' },
    content: (
      <Frame
        mode="reverse"
        label="Theory map"
        title="From national wealth to firm and industry strategy"
        lead="The PPT organises theories from mercantilism through classical cost theories, factor endowment, opportunity-cost and new-trade thinking, to Vernon’s product cycle and Porter’s national competitive advantage."
        visual={<TheoryEvolution />}
        takeaway="Memorise the ladder: Mercantilism → Absolute → Comparative → H-O → PLC → Rivalry → Porter."
      >
        <DidYouKnow>VTU Module 3 names nine topics; the PPT types slide also lists Haberler’s Opportunity Cost Theory and Krugman’s New Trade Theory — use them as enrichment around comparative advantage and strategic rivalry.</DidYouKnow>
      </Frame>
    ),
  },

  /* 05 — PROGRESSION LOGIC ---------------------------------------------- */
  {
    id: 'progression',
    title: 'How Trade Thinking Evolved',
    composition: 'blueprint',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="Intellectual progression"
        title="Each theory answered a problem the previous one left open"
        lead="Students should not see theories as a random list. Mercantilism made wealth a race; Smith asked for mutual gains through absolute efficiency; Ricardo asked what if one country is better at everything; H-O asked which resources drive that edge; Vernon asked how products move over time; rivalry and Porter asked how firms and nations create lasting advantage."
        visual={<TheoryGapChain />}
        takeaway="Exam gold: explain what gap each theory tried to close."
      >
        <Insight>Why this matters: insight is cumulative. Later theories do not erase earlier ones — they add dimensions managers must hold together.</Insight>
      </Frame>
    ),
  },

  /* 06 — MERCANTILISM ---------------------------------------------------- */
  {
    id: 'mercantilism',
    title: 'Mercantilism — Meaning and Core Ideas',
    composition: 'economic-ledger',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Early trade thinking"
        title="Mercantilism treats trade as a race for national treasure"
        lead="Mercantilism is an early country-based view of international commerce. Mercantilists believed national wealth was measured by gold and silver reserves, pursued a trade surplus, and supported active government intervention — often through colonial systems."
        visual={<MercantilismVault />}
        takeaway="Theory in one line: National wealth = bullion built by trade surplus and state control."
      >
        <Definition term="Mercantilism" keywords={['bullion', 'trade surplus', 'intervention', 'colonialism']}>
          An early trade doctrine that measured national wealth by gold and silver, sought export surplus, and used government intervention and colonial systems to promote exports and restrict imports.
        </Definition>
        <ExamTip>Short note structure: wealth as bullion → trade surplus → government intervention → colonialism.</ExamTip>
      </Frame>
    ),
  },

  /* 07 — MERCANTILISM DEEP ----------------------------------------------- */
  {
    id: 'mercantilism-critique',
    title: 'Mercantilism — Policy Logic and Critique',
    composition: 'comparison-balance',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="What it implied"
        title="Surplus thinking shaped tariffs, subsidies and empire"
        lead="Mercantilist policy used tariffs, subsidies and regulations to promote exports and restrict imports. Colonialism secured raw materials and captive markets. The managerial lesson today is to recognise when governments still behave as if trade is a scoreboard of winners and losers."
        visual={<ZeroSumVsGains />}
        takeaway="Limitation to write in exams: zero-sum view ignores mutual gains from trade."
      >
        <ManagerView>When a host government suddenly raises tariffs or pushes “export or else” industrial policy, you are watching mercantilist logic return — plan dual sourcing and scenario pricing.</ManagerView>
        <Update>Contemporary protectionism and industrial policy debates often reuse mercantilist vocabulary, even when the tools are semiconductors and green subsidies rather than bullion.</Update>
      </Frame>
    ),
  },

  /* 08 — ABSOLUTE ADVANTAGE ---------------------------------------------- */
  {
    id: 'absolute',
    title: 'Theory of Absolute Cost Advantage',
    composition: 'economic-ledger',
    tone: 'ib-scene-graphite',
    film: { camera: 'push' },
    content: (
      <Frame
        label="Adam Smith · 1776"
        title="Specialize where you produce at lower absolute cost"
        lead="Adam Smith’s absolute cost advantage theory states that countries should specialize in producing and exporting goods where they have a lower production cost than other countries. Free trade based on these advantages leads to mutual benefit through higher efficiency and lower prices — a direct challenge to mercantilism’s zero-sum view."
        visual={<AbsoluteDuel
          left={{ country: 'India', product: 'Textiles', score: 92, note: 'Higher productivity' }}
          right={{ country: 'Germany', product: 'Precision machinery', score: 88, note: 'Higher productivity' }}
        />}
        takeaway="Theory in one line: Trade on absolute efficiency — make what you make cheapest."
      >
        <Definition term="Absolute Cost Advantage" keywords={['Adam Smith', 'lower production cost', 'specialization']}>
          A country’s ability to produce a good at a lower absolute production cost (higher productivity) than another country, creating a basis for specialization and mutually beneficial trade.
        </Definition>
      </Frame>
    ),
  },

  /* 09 — ABSOLUTE ASSUMPTIONS + EXAMPLE ---------------------------------- */
  {
    id: 'absolute-assumptions',
    title: 'Absolute Advantage — Assumptions and Simple Logic',
    composition: 'quiet',
    film: { quiet: true, camera: 'dolly' },
    content: (
      <Frame
        label="Model world"
        title="Absolute advantage rests on a clean classical model"
        lead="The PPT lists classical assumptions that keep the model teachable: two countries and two commodities, an efficiency objective, zero transportation costs, factor mobility/immobility rules, and full employment. Real markets violate these — which is why later theories add factors, product stages and firm strategy."
        visual={<AssumptionBoard />}
        takeaway="Always state assumptions before criticising a classical theory in a long answer."
      >
        <RealWorld>Level-1 logic: Country A produces coffee more efficiently; Country B produces software more efficiently — trade raises consumption for both. Level-2: Brazil–Germany coffee/machinery patterns still illustrate absolute productivity differences, even though real trade is far more complex.</RealWorld>
        <ManagerView>Absolute-advantage screens are a first filter for “where is this activity cheapest at current productivity?” — not a final FDI decision.</ManagerView>
      </Frame>
    ),
  },

  /* 10 — COMMON CONFUSION ABSOLUTE VS COMPARATIVE ----------------------- */
  {
    id: 'confusion-absolute-comparative',
    title: 'Common Confusion — Absolute vs Comparative Advantage',
    composition: 'confusion-board',
    tone: 'ib-scene-editorial',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="Do not mix these"
        title="Absolute is about who is better; comparative is about who sacrifices less"
        lead="Students often treat absolute and comparative advantage as synonyms. Absolute advantage asks who produces more with the same resources. Comparative advantage asks who has the lower opportunity cost — and that is what decides specialization when one country is better at everything."
        visual={<AbsoluteVsComparative />}
        takeaway="Remember: Absolute = who is better. Comparative = who sacrifices less."
      >
        <Think>If Country A is better at both wheat and cloth, should A produce both and refuse to trade? Ricardo’s answer is no — and the next slides show why.</Think>
        <ExamTip>In any 10-mark comparison, define both, give one numerical intuition, then state the managerial implication.</ExamTip>
      </Frame>
    ),
  },

  /* 11 — COMPARATIVE ADVANTAGE ------------------------------------------- */
  {
    id: 'comparative',
    title: 'Comparative Cost Advantage Theory',
    composition: 'comparison-balance',
    film: { hero: true, heroTier: '2', camera: 'orbit' },
    content: (
      <Frame
        label="David Ricardo"
        title="Specialize by lower relative opportunity cost"
        lead="David Ricardo’s comparative cost advantage theory explains how countries benefit by specializing in goods they produce at a lower relative opportunity cost — even without absolute advantage in all goods. Specialization plus trade lets countries consume beyond their no-trade production frontier."
        visual={<ComparativeReasoning />}
        takeaway="Theory in one line: Countries gain when they specialize according to relative efficiency."
      >
        <Definition term="Comparative Cost Advantage" keywords={['Ricardo', 'opportunity cost', 'relative']}>
          A country’s ability to produce a good at a lower opportunity cost than another country — forming the basis for mutually beneficial specialization and trade.
        </Definition>
        <DidYouKnow>Haberler’s Opportunity Cost Theory (listed in the PPT types slide) restates comparative advantage in opportunity-cost language — the same logic the numerical example uses.</DidYouKnow>
      </Frame>
    ),
  },

  /* 12 — COMPARATIVE FEATURES ------------------------------------------- */
  {
    id: 'comparative-features',
    title: 'Features of Comparative Cost Advantage Theory',
    composition: 'editorial',
    film: { quiet: true, camera: 'rise' },
    content: (
      <Frame
        label="PPT features"
        title="Comparative advantage is powerful — and incomplete"
        lead="The reference PPT lists distinctive features and caveats of comparative cost advantage: multiplicity of organisations and activities, its two-edged nature, dependence on relative values, expression in money and labour terms, and the unrealism of zero transport cost."
        visual={<FeatureLattice />}
        takeaway="Write features + one limitation (transport costs) for a complete short note."
      >
        <ManagerView>Comparative advantage tells you where relative productivity points — logistics, risk and policy decide whether that point is operable.</ManagerView>
      </Frame>
    ),
  },

  /* 13 — COMPARATIVE WITH MONEY (PPT NUMERICAL) ------------------------- */
  {
    id: 'comparative-money',
    title: 'Comparative Cost Advantage with Money — Worked Example',
    composition: 'worked-example',
    tone: 'ib-scene-graphite',
    film: { camera: 'dolly' },
    content: (
      <Frame
        mode="visual-lead"
        label="PPT numerical example"
        title="Even absolute superiority leaves room for mutual gain"
        lead="Preserve this exam-critical example from the Module 3 PPT. Two countries, A and B, produce wheat and cloth with the same resources. Country A can produce more of both — absolute advantage in everything — yet comparative advantage still creates a trade case."
        visual={<WheatClothLedger />}
        takeaway="Step pattern: Given → Absolute check → Opportunity costs → Specialize → Trade → Mutual gain."
      >
        <ExamTip>Reproduce the PPT numbers. Then conclude: absolute advantage in both goods ≠ no gains from trade.</ExamTip>
        <Insight>Why this matters: the theory shifts the question from “Who is best at production?” to “Who gives up less to produce this good?”</Insight>
      </Frame>
    ),
  },

  /* 14 — COMPARATIVE MANAGERIAL ---------------------------------------- */
  {
    id: 'comparative-manager',
    title: 'Comparative Advantage — Managerial Application',
    composition: 'case-canvas',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="From classroom to boardroom"
        title="Opportunity-cost logic still designs global value chains"
        lead="Managers rarely solve two-country wheat–cloth tables — but they constantly ask which activity should sit where. Comparative advantage is the intellectual root of make-vs-buy, nearshore-vs-offshore, and “China+1” production portfolios."
        visual={<ValueChainPlacement />}
        takeaway="Manager’s view: place each activity where the firm sacrifices least capability elsewhere."
      >
        <RealWorld>India’s IT/services exports illustrate relative strength in skilled talent for digital delivery; manufacturing of some hardware may sit elsewhere — a comparative, not absolute, story.</RealWorld>
        <Case title="Apple’s value chain">Design and IP concentrate where advanced capabilities are densest; assembly migrates toward cost-and-ecosystem balance (China, increasingly India and Vietnam) — opportunity-cost placement across the chain.</Case>
      </Frame>
    ),
  },

  /* 15 — FACTOR ENDOWMENT ------------------------------------------------ */
  {
    id: 'factor-endowment',
    title: 'Relative Factor Endowment Theory (Heckscher–Ohlin)',
    composition: 'factor-scale',
    film: { hero: true, heroTier: '2', camera: 'orbit' },
    content: (
      <Frame
        label="Heckscher–Ohlin"
        title="Export what your abundant factors support"
        lead="The relative factor endowment theory — the Heckscher–Ohlin model — explains that countries specialize in and export goods that intensively use their relatively abundant factors of production, and import goods that require scarce factors. Factor differences (labour, capital, land) drive trade patterns beyond simple labour-cost slogans."
        visual={<FactorBalance />}
        takeaway="Theory in one line: Trade follows relative factor abundance."
      >
        <Definition term="Relative Factor Endowment Theory" keywords={['Heckscher-Ohlin', 'labour', 'capital', 'land']}>
          A theory stating that countries export products that intensively use their relatively abundant factors of production and import products that intensively use their scarce factors.
        </Definition>
        <ExamTip>State H-O in one sentence, then list assumptions, then give the China–USA style example from the PPT.</ExamTip>
      </Frame>
    ),
  },

  /* 16 — H-O ASSUMPTIONS + INDIA ---------------------------------------- */
  {
    id: 'factor-assumptions',
    title: 'Factor Endowment — Assumptions and Indian Context',
    composition: 'quiet',
    tone: 'ib-scene-emerald',
    film: { quiet: true, camera: 'rise' },
    content: (
      <Frame
        label="Model + application"
        title="H-O assumptions keep the model tractable — reality is richer"
        lead="PPT assumptions: two countries, two products, two factors; perfectly competitive inputs and outputs; diminishing returns; identical technologies. Indian illustrations help VTU students see factor logic without treating it as destiny."
        visual={<FactorAssumptionsBoard />}
        takeaway="Common confusion: Factor endowment ≠ Competitive advantage (Porter). Endowment is resource base; diamond is ecosystem."
      >
        <ManagerView>Ask: is this location’s advantage basic labour, skilled talent, capital depth, or supplier density — and is that advantage durable?</ManagerView>
        <RealWorld>Bengaluru’s technology ecosystem exports digitally delivered services — a modern reading of abundant skilled human capital within global value chains.</RealWorld>
      </Frame>
    ),
  },

  /* 17 — COMPARISON CLUSTER --------------------------------------------- */
  {
    id: 'compare-classical',
    title: 'Compare — Absolute, Comparative and Factor Endowment',
    composition: 'comparison-balance',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="Theory cluster"
        title="Three classical lenses — three different drivers of trade"
        lead="Before moving to product and firm theories, lock the classical cluster. Absolute advantage is productivity. Comparative advantage is opportunity cost. Factor endowment is resource abundance."
        visual={<ClassicalTrio />}
        takeaway="What drives trade? Efficiency → Relative efficiency → Factor abundance."
      >
        <ExamTip>10-mark comparison table: core idea · assumption · what explains advantage · limitation · one example each.</ExamTip>
      </Frame>
    ),
  },

  /* 18 — PLC INTRO ------------------------------------------------------- */
  {
    id: 'plc-intro',
    title: 'Product Life Cycle Theory — Introduction',
    composition: 'lifecycle-stage',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Vernon · dynamic trade"
        title="Products — and production — migrate across stages"
        lead="The Product Life Cycle (PLC) theory describes stages a product moves through from introduction to removal: introduction, growth, maturity and decline. In international business, Vernon’s insight is that demand and production locations shift as the product matures — linking innovation, trade and FDI over time."
        visual={<PlcCurve />}
        takeaway="Theory in one line: As products age, production and demand geography change."
      >
        <Definition term="Product Life Cycle Theory" keywords={['introduction', 'growth', 'maturity', 'decline']}>
          A theory describing how a product moves through introduction, growth, maturity and decline — shaping market dynamics, strategy and, in international form, the location of production and trade.
        </Definition>
        <DidYouKnow>VTU names “Product life cycle theory”; IB teaching often emphasises Vernon’s international PLC — production migrating from innovating countries toward lower-cost locations over time.</DidYouKnow>
      </Frame>
    ),
  },

  /* 19 — PLC STAGES DEEP ------------------------------------------------- */
  {
    id: 'plc-stages',
    title: 'PLC Stages — International Movement',
    composition: 'geography-shift',
    film: { hero: true, heroTier: '2', camera: 'pan' },
    content: (
      <Frame
        label="Stage mechanics"
        title="Each stage rewrites where demand and production sit"
        lead="Follow the PPT stage logic carefully. Introduction: once created, production can begin in various locations. Growth: competitors enter and demand rises overseas in developed countries. Maturity: global demand stabilizes despite country-level ups and downs. Decline: demand falls more rapidly in developed countries as wealthy consumers chase newer products."
        visual={<PlcMigration />}
        takeaway="PLC is not only marketing stages — it is an international production-migration story."
      >
        <ManagerView>Match strategy to stage: protect IP early, scale and localize in growth, optimize cost in maturity, harvest or renew in decline.</ManagerView>
      </Frame>
    ),
  },

  /* 20 — PLC ADVANTAGES + EXAMPLE --------------------------------------- */
  {
    id: 'plc-advantages',
    title: 'PLC — Advantages for Innovative Countries',
    composition: 'editorial',
    film: { camera: 'orbit' },
    content: (
      <Frame
        label="Why innovators care"
        title="PLC sustains drive, stimulates trade and renews advantage"
        lead="The PPT lists advantages for innovative countries: sustaining competitive drive, stimulating trade, and enhancing a country’s comparative advantages as new products refresh the specialization pattern."
        visual={<PlcInnovatorAdvantages />}
        takeaway="Innovative countries use PLC dynamics to refresh trade advantage over time."
      >
        <RealWorld>Smartphone generations show the cycle: launch near innovation hubs, global growth with rivals and contract manufacturing, maturity driven by cost, then wealthy markets demand the next model while older models linger elsewhere.</RealWorld>
        <ManagerView>Match strategy to stage: protect IP early, scale and localize in growth, optimize cost in maturity, harvest or renew in decline.</ManagerView>
      </Frame>
    ),
  },

  /* 20b — PLC CASE ------------------------------------------------------- */
  {
    id: 'plc-case',
    title: 'Business Case — Smartphones and the Product Cycle',
    composition: 'case-canvas',
    tone: 'ib-scene-editorial',
    film: { camera: 'pan' },
    content: (
      <MiniCase
        company="Smartphones / Consumer electronics"
        sector="Technology products"
        headline="A product cycle you can see in your pocket"
        situation="A new smartphone generation launches in advanced innovation ecosystems, then scales globally as demand grows and competitors imitate features."
        moves={[
          'Introduction: design and early production near innovation hubs',
          'Growth: global demand; rivals and contract manufacturers expand',
          'Maturity: cost and supply-chain efficiency dominate',
          'Next cycle: wealthy markets demand newer models; older models linger elsewhere',
        ]}
        result="Trade and FDI patterns follow the product’s age — exactly the PLC teaching point."
        lesson="PLC explains timing: when to export, when to produce abroad, when to renew the product."
        canvas={<SmartphonePlcCase />}
      />
    ),
  },

  /* 21 — PLC LIMITS + MODERN -------------------------------------------- */
  {
    id: 'plc-modern',
    title: 'PLC — Limitations and Modern Relevance',
    composition: 'split',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Update the lens"
        title="Digital products compress — and sometimes break — the classic cycle"
        lead="Classic PLC assumed clearer stage borders and physical production migration. Today, software, platforms and rapid imitation compress stages; some digital goods scale globally on day one. Still, hardware, pharma and consumer durables often retain recognisable stage geography."
        visual={<PlcModernSplit />}
        takeaway="Teach original PLC correctly first — then add modern relevance, not buzzword replacement."
      >
        <Update>Semiconductor and EV supply chains still show stage-like migration of capacity, even as AI and software layers globalise instantly.</Update>
        <ExamTip>Limitations paragraph: stage boundaries blur; MNCs plan globally from day one; services/digital disrupt classic geography.</ExamTip>
      </Frame>
    ),
  },

  /* 22 — GLOBAL STRATEGIC RIVALRY ---------------------------------------- */
  {
    id: 'rivalry',
    title: 'Global Strategic Rivalry Theory',
    composition: 'strategy-arena',
    film: { camera: 'push' },
    content: (
      <Frame
        label="Firm-based competition"
        title="MNCs compete with strategy — not only national cost differences"
        lead="Global strategic rivalry theory, associated in the PPT with Paul Krugman and Kelvin Lancaster and emerging in the 1980s, focuses on how multinational corporations compete internationally by building competitive advantages. The unit of analysis shifts from the nation to the firm."
        visual={<RivalryArena />}
        takeaway="Theory in one line: Global winners are built by firm-level competitive weapons."
      >
        <Definition term="Global Strategic Rivalry Theory" keywords={['MNC', 'R&D', 'IP', 'scale', 'market access']}>
          A firm-based theory explaining international competition through strategic advantages such as R&D, intellectual property, economies of scale, experience-curve effects and market access.
        </Definition>
      </Frame>
    ),
  },

  /* 23 — RIVALRY ADVANTAGES ---------------------------------------------- */
  {
    id: 'rivalry-advantages',
    title: 'Strategic Rivalry — Sources of Competitive Advantage',
    composition: 'framework',
    tone: 'ib-scene-graphite',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT competitive advantages"
        title="Five weapons MNCs use in global markets"
        lead="The reference PPT lists the rivalry toolkit clearly: R&D, intellectual property, economies of scale, experience curve, and market access through alliances and distribution networks."
        visual={<RivalryWeapons />}
        takeaway="Rivalry checklist for exams: R&D · IP · Scale · Experience · Market access."
      >
        <Case title="Tesla and NVIDIA">Tesla combines product innovation, software learning and factory scale; NVIDIA combines R&D, CUDA ecosystem lock-in and capacity partnerships — rivalry advantages, not merely cheap labour.</Case>
        <ManagerView>Ask which of the five weapons your firm actually owns — and which a rival can copy in 18 months.</ManagerView>
      </Frame>
    ),
  },

  /* 24 — PORTER INTRO ---------------------------------------------------- */
  {
    id: 'porter-intro',
    title: 'Porter’s National Competitive Advantage Theory',
    composition: 'diamond',
    film: { hero: true, heroTier: '1', wow: true, camera: 'orbit' },
    content: (
      <Frame
        mode="visual-lead"
        label="Diamond model"
        title="Why some nations win in particular industries"
        lead="Porter’s National Competitive Advantage theory — the Diamond Model — explains why some nations become more competitive than others in specific industries. Advantage comes from four interrelated determinants that interact as a diamond to foster innovation and competitiveness."
        visual={<PorterDiamondBuild />}
        takeaway="Theory in one line: National industry success is an ecosystem, not a single cheap input."
      >
        <Definition term="Porter’s Diamond" keywords={['factor', 'demand', 'related industries', 'rivalry']}>
          A framework explaining national competitive advantage in an industry through factor conditions, demand conditions, related and supporting industries, and firm strategy, structure and rivalry.
        </Definition>
        <Insight>Why this matters: Porter shifts the question from “What can a country produce?” to “Why does a country become competitive in a particular industry?”</Insight>
      </Frame>
    ),
  },

  /* 25 — PORTER DETERMINANTS -------------------------------------------- */
  {
    id: 'porter-determinants',
    title: 'Porter’s Diamond — Four Determinants',
    composition: 'framework',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="Build the diamond"
        title="Each determinant must be taught — then shown interacting"
        lead="Do not only flash a finished diamond. Factor conditions include basic and advanced factors that nations create. Demand conditions reward sophisticated domestic buyers. Related and supporting industries supply inputs and knowledge. Firm strategy, structure and rivalry push companies to improve."
        visual={<DiamondDeterminants />}
        takeaway="Advanced factors + demanding buyers + supplier depth + domestic rivalry = diamond heat."
      >
        <ExamTip>Long answer: name four determinants → explain each → show interaction → give industry example → conclude on policy/strategy.</ExamTip>
      </Frame>
    ),
  },

  /* 26 — PORTER INDIA IT CASE ------------------------------------------- */
  {
    id: 'porter-india-it',
    title: 'Business Case — Indian IT through Porter’s Diamond',
    composition: 'cluster',
    tone: 'ib-scene-emerald',
    film: { hero: true, heroTier: '2', wow: true, camera: 'pan' },
    content: (
      <MiniCase
        company="Indian IT / GCC ecosystem"
        sector="Technology services"
        headline="Why India’s IT industry became globally competitive"
        situation="India did not win IT exports through oil or land abundance alone. A diamond of talent, demanding global clients, supporting education/telecom ecosystems and intense firm rivalry created an industry advantage."
        moves={[
          'Factor conditions: large skilled English-capable talent; engineering education pipeline',
          'Demand conditions: exacting global clients forced quality, process and delivery excellence',
          'Related industries: telecom, training, campuses and now cloud/AI service stacks',
          'Firm rivalry: TCS, Infosys, Wipro and others competed hard for talent and clients',
        ]}
        result="A nationally competitive industry that exports services worldwide and anchors global capability centres."
        lesson="Manager’s view: locate where the diamond is hot for your industry — not only where wages are low."
        canvas={<BengaluruCluster />}
      />
    ),
  },

  /* 27 — PORTER + TSMC / COMPARISON ------------------------------------- */
  {
    id: 'porter-compare',
    title: 'Porter vs Factor Endowment — Common Confusion',
    composition: 'confusion-board',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="Clarify the lenses"
        title="Resources start the story; ecosystems finish it"
        lead="Factor endowment explains exports from abundant labour or capital. Porter asks why particular industries thrive through created advanced factors, demanding customers, supplier clusters and rivalry — even when basic endowments look similar across countries."
        visual={<PorterVsHO />}
        takeaway="Country resources ≠ Industry competitiveness ≠ Firm competitive weapons."
      >
        <Case title="TSMC and Taiwan">Advanced skills, supplier depth, demanding customers and concentrated rivalry make Taiwan strategically central in semiconductors — a diamond story more than a simple labour-cost story.</Case>
        <ManagerView>When choosing an R&D or fab location, score the diamond — talent, buyers, suppliers, rivalry — not only the wage spreadsheet.</ManagerView>
      </Frame>
    ),
  },

  /* 28 — SYNTHESIS ------------------------------------------------------- */
  {
    id: 'synthesis',
    title: 'Theory Synthesis — Which Lens When?',
    composition: 'synthesis',
    film: { camera: 'aerial' },
    content: (
      <Frame
        label="Insight complete"
        title="Different theories explain different dimensions of IB"
        lead="No single theory explains all international business. Mercantilism warned about power and surplus politics. Absolute and comparative advantage explained efficiency gains. H-O linked trade to factors. PLC added time. Rivalry added firm strategy. Porter added national industry ecosystems."
        visual={<TheorySynthesis />}
        takeaway="Which theory should a manager use? The one that matches the decision dimension in front of you."
      >
        <Think>You are locating a new EV battery plant. Which lenses matter most — factor costs, PLC stage, rivalry advantages, or the national diamond — and why?</Think>
        <Insight>Managers see markets. Insight explains the forces behind them — then Module 4 shows the institutions that govern those forces.</Insight>
      </Frame>
    ),
  },

  /* 29 — EXAM PACK ------------------------------------------------------- */
  {
    id: 'exam-pack',
    title: 'Module 3 — Exam Pack & Revision',
    composition: 'exam-board',
    tone: 'ib-scene-graphite',
    film: { quiet: true, camera: 'hold' },
    content: (
      <ExamPack
        title="Module 3 — Exam Pack"
        definitions={[
          { term: 'Mercantilism', text: 'Wealth as bullion; seek trade surplus via intervention and colonial patterns.' },
          { term: 'Absolute advantage', text: 'Lower absolute production cost / higher productivity (Adam Smith).' },
          { term: 'Comparative advantage', text: 'Lower opportunity cost specialization (David Ricardo).' },
          { term: 'Factor endowment', text: 'Export abundant-factor goods; import scarce-factor goods (H-O).' },
          { term: 'PLC', text: 'Introduction → growth → maturity → decline with shifting geography.' },
          { term: 'Porter diamond', text: 'Factor, demand, related industries, firm strategy/rivalry.' },
        ]}
        tenMark={[
          'Explain mercantilism with its core ideas and limitations.',
          'Distinguish absolute and comparative cost advantage with a numerical illustration.',
          'Explain Heckscher–Ohlin theory with assumptions and example.',
          'Discuss Product Life Cycle theory and its international implications.',
          'Explain Global Strategic Rivalry theory and sources of MNC advantage.',
          'Explain Porter’s National Competitive Advantage (Diamond) with an industry example.',
        ]}
        comparisons={[
          'Absolute vs Comparative advantage',
          'Factor endowment vs Porter’s competitive advantage',
          'PLC vs Global Strategic Rivalry',
          'Country-based vs Firm-based theories',
        ]}
        memory="Ladder: Bullion → Absolute → Comparative → Factors → Product cycle → Firm rivalry → National diamond. Numerical: A 10/5 vs B 5/4 wheat/cloth."
      />
    ),
  },

  /* 30 — PAYOFF ---------------------------------------------------------- */
  {
    id: 'payoff',
    title: 'Module 3 — The Big Picture',
    composition: 'finale',
    tone: 'ib-scene-dark',
    film: { finale: true, hero: true, heroTier: '1', chapterPayoff: true, callback: true, camera: 'aerial' },
    content: (
      <Frame
        label="Where we’ve been"
        title="Insight explains the forces behind the markets managers see"
        lead="Module 1 showed opportunity. Module 2 taught judgment of the environment. Module 3 explained why trade and competitiveness patterns emerge — from bullion races to opportunity cost, factor bases, product cycles, firm rivalry and national diamonds."
        visual={<InsightPayoff />}
        takeaway="Managers see markets. Insight explains the forces behind them."
      >
        <Insight>Opportunity without judgment is gambling. Judgment without insight is incomplete. Insight without institutions is unfinished — that is Module 4.</Insight>
      </Frame>
    ),
  },
]

export const internationalBusinessModule3Slides = buildModule(3, module3, {
  opener: <InsightOpener module={3} />,
})

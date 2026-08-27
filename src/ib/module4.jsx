import {
  buildModule, Frame, Hook, MiniCase, ExamPack, Definition, Case,
  Insight, ExamTip, Update, ManagerView, RealWorld, Think, DidYouKnow, Explain,
} from './kit'
import {
  GovernanceOpener, GovernanceHook, WhyInstitutionsVisual, InstitutionsDefinedVisual,
  GovernanceArchitecture, UnctadBridge, UnctadObjectivesVisual, UnctadPrinciplesVisual,
  UnctadAchievementsVisual, UnctadStructureVisual, ImfPressureScene, ImfObjectivesVisual,
  ImfFunctionsVisual, ImfVsWorldBank, GattToWto, WtoRulebook, WtoObjectivesVisual,
  WtoPrinciplesRulebook, WtoRoleOps, WtoAdvantagesOutcomes, WtoMarketAccessCase,
  TrimsGate, TripsShield, TripsVsTrims, InstitutionsCompare, BridgeToRegional,
  IntegrationIntroVisual, BlocReasonsVisual, IntegrationLadder, AbcTariffStory,
  LevelsConfusionBoard, EuMarketMap, NaftaUsmcaMap, AseanNetworkMap, SaarcProgression,
  BricsConstellation, GovernanceSynthesis, GovernancePayoff,
} from './scenes4'

/**
 * MODULE 4 — International Institutions & Economic Integration
 * Chapter identity: Ⅳ — GOVERNANCE
 * Syllabus (22MBA401 / VTU, 7 Hours): International Institutions — UNCTAD
 * (Introduction, Principles, Achievements); IMF (Role and objectives);
 * WTO (Role and advantages); TRIMS; TRIPS Features; Economic Integration —
 * Introduction; Levels of Economic Integration; Regional Economic Integration
 * in Europe, USA, ASEAN, SAARC, SAPTA.
 * Primary source: IB -M-4.pptx (public/International Buisness/).
 * PPT also teaches: World Bank as listed major body, GATT→WTO, SAFTA, BRICS,
 * Political Union, UNCTAD/IMF organisational notes, NAFTA→USMCA update.
 * CONTENT APPROVED & LOCKED — presentation-only Governance cinematic pass.
 */
const module4 = [
  /* 01 — HOOK ------------------------------------------------------------- */
  {
    id: 'hook',
    labels: ['UNCTAD', 'IMF', 'WTO', 'TRIMS', 'TRIPS', 'EU', 'ASEAN', 'SAARC', 'SAPTA', 'BRICS'],
    title: 'Who Sets the Rules of International Business?',
    composition: 'governance-opener',
    tone: 'ib-scene-editorial',
    film: { wow: true, camera: 'push' },
    content: (
      <Hook
        eyebrow="Module 4 · Governance"
        question="If markets cross borders, who writes the rules — and who settles the fights?"
        sub="Module 1 opened opportunity. Module 2 taught judgment of country climate. Module 3 explained why trade and competitiveness emerge. Module 4 answers the governance question: which institutions regulate trade and finance, why countries form regional blocs, and how those rules change managerial decisions."
        visual={<GovernanceHook />}
      />
    ),
  },

  /* 02 — WHY INSTITUTIONS ------------------------------------------------ */
  {
    id: 'why-institutions',
    title: 'Why International Business Needs Institutions',
    composition: 'institution-brief',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Intellectual foundation"
        title="Cross-border business needs shared rules and shared backstops"
        lead="Without institutions, every trade dispute, every currency crisis and every investment conflict would be solved by raw power or ad-hoc diplomacy. International economic institutions give countries a common forum to set rules, monitor behaviour, provide assistance and reduce uncertainty for firms."
        visual={<WhyInstitutionsVisual />}
        takeaway="Institutions exist to regulate, negotiate, assist and reduce uncertainty in IB."
      >
        <Think>Who establishes international trade rules? Who helps during financial instability? Who focuses on trade and development? Why do countries also create regional blocs?</Think>
        <ManagerView>Before entering a market, ask which rulebook applies — WTO commitments, regional preferences, IP standards and the host's monetary climate.</ManagerView>
      </Frame>
    ),
  },

  /* 03 — DEFINITION + MAP ------------------------------------------------ */
  {
    id: 'institutions-defined',
    title: 'International Economic Institutions — Meaning',
    composition: 'world-chamber',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT definition"
        title="Institutions coordinate members around shared economic concerns"
        lead="The Module 4 PPT defines an international economic institution as an organization that combines two or more countries as members for mutual financial concerns, regulated by a central body. The major regulatory bodies listed are WTO, UNCTAD, the World Bank and the IMF."
        visual={<InstitutionsDefinedVisual />}
        takeaway="Know the PPT definition + the four named major bodies."
      >
        <Definition term="International Economic Institution" keywords={['members', 'mutual concerns', 'central body']}>
          An organization that combines two or more countries as its members for mutual financial concerns and is regulated by a central body.
        </Definition>
        <ExamTip>Start institutional answers with the definition, then purpose, then functions/role.</ExamTip>
      </Frame>
    ),
  },

  /* 04 — GOVERNANCE ARCHITECTURE ---------------------------------------- */
  {
    id: 'architecture',
    title: 'Global Governance Architecture — Who Does What',
    composition: 'institution-network',
    tone: 'ib-scene-graphite',
    film: { hero: true, heroTier: '2', camera: 'orbit', wow: true },
    content: (
      <Frame
        mode="visual-lead"
        label="Do not memorise a list"
        title="Different institutions solve different international problems"
        lead="Module 4 is not a catalogue of organisations. It is an architecture: trade rules, monetary stability and development sit at the global level; regional blocs deepen cooperation among neighbours. Managers must know which lever affects their decision."
        visual={<GovernanceArchitecture />}
        takeaway="Trade → WTO · Money → IMF · Development → UNCTAD · Neighbours → Regional blocs."
      >
        <Insight>Why this matters: the same firm may face WTO tariff rules, IMF-linked macro reforms in a host country, UNCTAD-relevant development constraints, and regional preference schemes — all at once.</Insight>
      </Frame>
    ),
  },

  /* 05 — UNCTAD INTRO ---------------------------------------------------- */
  {
    id: 'unctad-intro',
    title: 'UNCTAD — Introduction',
    composition: 'development-bridge',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Trade + Development"
        title="UNCTAD is the UN's focal point for trade and development"
        lead="UNCTAD — the United Nations Conference on Trade and Development — is a permanent intergovernmental body within the United Nations Secretariat. Established in 1964 (first conference, Geneva), it deals with trade and development issues and related areas such as finance, technology, investment and sustainable development. Its primary goal is to promote the integration of developing countries into the global economy in a way that fosters development."
        visual={<UnctadBridge />}
        takeaway="Theory in one line: UNCTAD = trade + development for integrating developing countries."
      >
        <Definition term="UNCTAD" keywords={['1964', 'Geneva', 'trade and development']}>
          United Nations Conference on Trade and Development — a permanent UN intergovernmental body (est. 1964, Geneva) focused on trade and development and related areas of finance, technology, investment and sustainable development.
        </Definition>
        <ManagerView>Global markets contain economies at very different stages of development — UNCTAD's lens reminds managers that market access is not the same as development capacity.</ManagerView>
      </Frame>
    ),
  },

  /* 06 — UNCTAD OBJECTIVES ---------------------------------------------- */
  {
    id: 'unctad-objectives',
    title: 'UNCTAD — Objectives',
    composition: 'quiet-policy',
    tone: 'ib-scene-emerald',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT objectives"
        title="What UNCTAD exists to achieve"
        lead="The reference PPT lists five objectives that capture UNCTAD's development-centred mandate."
        visual={<UnctadObjectivesVisual />}
        takeaway="Memorise the five PPT objectives for short notes."
      >
        <ExamTip>For "Objectives of UNCTAD", list all five and add one sentence on integrating developing countries into the world economy.</ExamTip>
      </Frame>
    ),
  },

  /* 07 — UNCTAD PRINCIPLES ---------------------------------------------- */
  {
    id: 'unctad-principles',
    title: 'UNCTAD — Principles',
    composition: 'policy-corridor',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="How UNCTAD works"
        title="Principles guide cooperation with developing countries"
        lead="UNCTAD operates on core principles that shape how technical cooperation and policy dialogue are delivered."
        visual={<UnctadPrinciplesVisual />}
        takeaway="Principles = demand-driven · ownership · transparency · accountability · sovereign equality."
      >
        <DidYouKnow>These principles explain why UNCTAD is often described as a development partner rather than a rule-enforcing court.</DidYouKnow>
      </Frame>
    ),
  },

  /* 08 — UNCTAD ACHIEVEMENTS -------------------------------------------- */
  {
    id: 'unctad-achievements',
    title: 'UNCTAD — Achievements',
    composition: 'development-bridge',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="PPT achievements"
        title="Concrete programmes that shaped developing-country trade agendas"
        lead="The Module 4 PPT highlights four achievements students should be able to name in examinations."
        visual={<UnctadAchievementsVisual />}
        takeaway="Write four achievements with one line of meaning each."
      >
        <RealWorld>Many developing economies remain commodity-exposed; UNCTAD's commodity and debt agendas speak directly to that structural reality.</RealWorld>
        <ExamTip>Achievements answers fail when they only list titles — add one functional phrase under each.</ExamTip>
      </Frame>
    ),
  },

  /* 09 — UNCTAD STRUCTURE (CONDENSED) ----------------------------------- */
  {
    id: 'unctad-structure',
    title: 'UNCTAD — Organisational Focus Areas',
    composition: 'quiet-policy',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="PPT organisational structure"
        title="A secretariat with specialised development divisions"
        lead="The PPT details UNCTAD's organisational structure under the Office of the Secretary-General, with specialised divisions covering globalisation strategies, investment and enterprise, international trade and commodities, technology and logistics, Africa/LDC programmes, statistics, communications and related policy units. Managers need the logic of the organisation more than a memorised org chart."
        visual={<UnctadStructureVisual />}
        takeaway="Exam priority: mandate and achievements over exhaustive division names."
      >
        <ExamTip>If asked organisational structure, group divisions by function (trade, investment, technology, development) rather than listing every unit.</ExamTip>
      </Frame>
    ),
  },

  /* 10 — IMF PROBLEM + INTRO -------------------------------------------- */
  {
    id: 'imf-intro',
    title: 'IMF — When Countries Face Financial Pressure',
    composition: 'financial-pressure',
    film: { camera: 'push' },
    content: (
      <Frame
        label="Bretton Woods · Monetary stability"
        title="What happens when a country faces serious external financial pressure?"
        lead="The International Monetary Fund was conceived at the Bretton Woods Conference in 1944, formally established on 27 December 1945 when 29 nations signed the Articles of Agreement, and began financial operations on 1 March 1947. It exists to support international monetary cooperation and help members manage balance-of-payments difficulties that can destabilise trade and investment."
        visual={<ImfPressureScene />}
        takeaway="Theory in one line: IMF = international monetary cooperation + BoP confidence."
      >
        <Definition term="International Monetary Fund (IMF)" keywords={['Bretton Woods', '1945', 'BoP']}>
          An international financial institution conceived at Bretton Woods (1944), established in 1945, that promotes global monetary cooperation, exchange stability and assistance for members facing balance-of-payments problems.
        </Definition>
        <Update>As noted in the PPT, Ms. Kristalina Georgieva (Bulgaria) has served as Managing Director and Chair of the Executive Board since 1 October 2019 — a factual organisational note, not a syllabus expansion.</Update>
      </Frame>
    ),
  },

  /* 11 — IMF OBJECTIVES ------------------------------------------------- */
  {
    id: 'imf-objectives',
    title: 'IMF — Objectives',
    composition: 'quiet-policy',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT objectives"
        title="Six objectives that define the Fund's mandate"
        lead="Preserve the Module 4 PPT objective list exactly for VTU answers."
        visual={<ImfObjectivesVisual />}
        takeaway="IMF objectives = cooperation · trade · FX stability · payments · confidence · BoP."
      >
        <ExamTip>Long answers: list all six objectives, then connect to surveillance/lending/capacity development.</ExamTip>
      </Frame>
    ),
  },

  /* 12 — IMF FUNCTIONS -------------------------------------------------- */
  {
    id: 'imf-functions',
    title: 'IMF — Role and Functions',
    composition: 'policy-corridor',
    tone: 'ib-scene-graphite',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="PPT role/functions"
        title="Surveillance, lending and capacity development"
        lead="The IMF maintains global economic stability through three primary functions: surveillance (monitoring economies and policy advice), lending/financial assistance (especially for balance-of-payments problems), and capacity development/technical assistance. It fosters international monetary cooperation and promotes sustainable economic growth."
        visual={<ImfFunctionsVisual />}
        takeaway="Role triad: Surveillance · Lending · Technical Assistance."
      >
        <ManagerView>If a host country faces currency instability or an IMF programme, watch FX volatility, import compression, reform timelines and investment confidence — not only the headline loan.</ManagerView>
        <RealWorld>Indian international businesses track global monetary conditions because FX moves, commodity prices and partner-country reforms change export competitiveness and receivable risk.</RealWorld>
      </Frame>
    ),
  },

  /* 13 — IMF VS WORLD BANK ---------------------------------------------- */
  {
    id: 'imf-vs-world-bank',
    title: 'Common Confusion — IMF vs World Bank',
    composition: 'comparison-tableau',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="Clarity only"
        title="Both appear in the PPT map — they are not the same institution"
        lead="The PPT lists the World Bank among major international regulatory bodies. VTU Module 4 examines IMF role and objectives in depth; it does not require a full World Bank chapter. Still, students often confuse the two."
        visual={<ImfVsWorldBank />}
        takeaway="IMF = monetary/BoP stability. World Bank = development finance. Different problems."
      >
        <ExamTip>One clarification paragraph is enough unless the question explicitly asks for World Bank.</ExamTip>
      </Frame>
    ),
  },

  /* 14 — GATT → WTO ----------------------------------------------------- */
  {
    id: 'gatt-to-wto',
    title: 'From GATT to WTO — How Trade Rules Evolved',
    composition: 'treaty',
    film: { hero: true, heroTier: '2', camera: 'pan' },
    content: (
      <Frame
        mode="reverse"
        label="Historical context"
        title="Post-war trade liberalisation needed a stronger institutional home"
        lead="GATT (General Agreement on Tariffs and Trade) primarily focused on trade in goods. The WTO was established on 1 January 1995 as GATT's successor, expanding international trade rules to include services and intellectual property and introducing stronger dispute settlement procedures."
        visual={<GattToWto />}
        takeaway="GATT → goods foundation. WTO → broader rules + stronger dispute system."
      >
        <DidYouKnow>VTU answers often score when students explicitly say WTO succeeded GATT on 1 January 1995 and widened coverage beyond goods.</DidYouKnow>
      </Frame>
    ),
  },

  /* 15 — WTO INTRO ------------------------------------------------------ */
  {
    id: 'wto-intro',
    title: 'WTO — Introduction',
    composition: 'rulebook',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Trade rulebook"
        title="The only global body dealing with the rules of trade between nations"
        lead="The World Trade Organization aims to ensure that trade flows as smoothly, predictably and freely as possible — contributing to higher living standards, job creation and improved lives worldwide. For managers, predictability in tariffs, market access and dispute outcomes is the business value of the system."
        visual={<WtoRulebook />}
        takeaway="Theory in one line: WTO makes trade more predictable through rules and dispute settlement."
      >
        <Definition term="World Trade Organization (WTO)" keywords={['1995', 'rules of trade', 'predictability']}>
          The only global international body dealing with the rules of trade between nations, established on 1 January 1995 as successor to GATT, covering goods, services and intellectual property with dispute settlement procedures.
        </Definition>
        <ManagerView>International rules can change the attractiveness and accessibility of a foreign market — map WTO commitments before locking a market-entry bet.</ManagerView>
      </Frame>
    ),
  },

  /* 16 — WTO OBJECTIVES ------------------------------------------------- */
  {
    id: 'wto-objectives',
    title: 'WTO — Objectives',
    composition: 'institution-brief',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT objectives"
        title="Eight objectives of the WTO"
        lead="Use the PPT's objective list as the examination backbone."
        visual={<WtoObjectivesVisual />}
        takeaway="8 objectives: administer · negotiate · disputes · monitor · assist · free/fair · transparency · cooperate."
      >
        <ExamTip>10-mark WTO answers: definition → GATT link → objectives → principles/functions → one advantage → business relevance.</ExamTip>
      </Frame>
    ),
  },

  /* 17 — WTO PRINCIPLES ------------------------------------------------- */
  {
    id: 'wto-principles',
    title: 'WTO — Principles (Including Non-Discrimination)',
    composition: 'rulebook',
    tone: 'ib-scene-editorial',
    film: { hero: true, heroTier: '2', camera: 'orbit' },
    content: (
      <Frame
        mode="visual-lead"
        label="Principles that make rules meaningful"
        title="Non-discrimination is the heart of the WTO rulebook"
        lead="The PPT lists seven principles. Non-discrimination is especially exam-critical: it is commonly taught through Most-Favoured-Nation (MFN) treatment and National Treatment. MFN means a tariff concession granted to one member is extended to others; National Treatment means imported products, once inside the market, should not face discriminatory internal taxes or regulations versus like domestic products."
        visual={<WtoPrinciplesRulebook />}
        takeaway="Non-discrimination = MFN (among members) + National Treatment (imports vs domestic)."
      >
        <Think>Country A cuts the tariff on steel from Country B. Under MFN logic, what is expected toward other WTO members? An imported phone already cleared customs — under National Treatment, can internal taxes punish it versus a domestic phone of like kind?</Think>
        <ExamTip>Never write only "MFN and National Treatment" — define each with a one-line example.</ExamTip>
      </Frame>
    ),
  },

  /* 18 — WTO ROLE ------------------------------------------------------- */
  {
    id: 'wto-role',
    title: 'WTO — Role and Functioning',
    composition: 'negotiation-table',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="PPT role/functioning"
        title="How the WTO operates day to day"
        lead="Beyond objectives, the PPT emphasises practical functioning: help for developing and transition economies, specialised export help, participation in global economic policy-making, collecting and publishing information, and encouraging development and economic reforms."
        visual={<WtoRoleOps />}
        takeaway="Role = help · export support · policy voice · information · reform encouragement."
      >
        <RealWorld>Indian exporters care about WTO disciplines on tariffs, standards, trade remedies and IP — because destination-market measures decide landed cost and market access.</RealWorld>
      </Frame>
    ),
  },

  /* 19 — WTO ADVANTAGES ------------------------------------------------- */
  {
    id: 'wto-advantages',
    title: 'WTO — Advantages',
    composition: 'quiet-policy',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT advantages"
        title="Why a rules-based system is argued to help societies and firms"
        lead="The Module 4 PPT lists advantages ranging from peace and predictability to consumer choice, income growth and better governance."
        visual={<WtoAdvantagesOutcomes />}
        takeaway="Advantages = peace · predictability · prices/choice · growth · governance."
      >
        <ExamTip>Pick 5–6 advantages with one explanation line each for a 10-mark answer; do not dump titles only.</ExamTip>
      </Frame>
    ),
  },

  /* 20 — WTO CASE ------------------------------------------------------- */
  {
    id: 'wto-case',
    title: 'Business Case — Market Access Under WTO Rules',
    composition: 'case-brief',
    tone: 'ib-scene-editorial',
    film: { wow: true, camera: 'pan' },
    content: (
      <MiniCase
        company="Indian auto-component exporter"
        sector="Manufacturing / Trade"
        headline="When destination tariffs and standards decide the P&L"
        situation="An Indian mid-size auto-component firm evaluates two export markets. Both look attractive on demand, but one market suddenly tightens technical standards and contemplates a safeguard tariff."
        moves={[
          'Map WTO tariff bindings and MFN rates for the product line',
          'Check whether measures are transparent and challengeable under dispute logic',
          'Stress-test landed cost under alternative tariff and standard scenarios',
          'Decide whether to diversify destinations or localise finishing stages',
        ]}
        result="Market attractiveness is rewritten by rules — not only by consumer demand."
        lesson="WTO relevance for managers: tariffs, standards, remedies and predictability change sourcing and export strategy."
        canvas={<WtoMarketAccessCase />}
      />
    ),
  },

  /* 21 — TRIMS ---------------------------------------------------------- */
  {
    id: 'trims',
    title: 'TRIMS — Trade-Related Investment Measures',
    composition: 'investment-gate',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Investment measures × goods trade"
        title="TRIMS disciplines investment rules that distort goods trade"
        lead="TRIMS (Trade-Related Investment Measures) is one of the principal WTO agreements. TRIMs restrict preferences that favour domestic firms in ways that discriminate against imported or exported products, thereby enabling international firms to operate more easily within foreign markets — within the agreement's scope."
        visual={<TrimsGate />}
        takeaway="TRIMS = investment measures that affect goods trade — not a complete FDI law."
      >
        <Definition term="TRIMS" keywords={['investment measures', 'goods trade', 'non-discrimination']}>
          Trade-Related Investment Measures — WTO rules addressing investment measures related to trade in goods that involve discriminatory treatment of imported or exported products.
        </Definition>
        <Explain items={[
          { k: 'Applies to', v: 'Investment measures related to goods trade.' },
          { k: 'Does not apply to', v: 'Trade in services (as per PPT feature list).' },
          { k: 'Does not regulate', v: 'Entry of foreign industry/investment as such.' },
          { k: 'Core concern', v: 'Discriminatory treatment of imported/exported products; measures can apply to foreign and domestic firms.' },
        ]} />
        <ManagerView>Ask: does this host incentive package force local-content or trade-balancing behaviour that conflicts with TRIMS logic?</ManagerView>
      </Frame>
    ),
  },

  /* 22 — TRIPS ---------------------------------------------------------- */
  {
    id: 'trips',
    title: 'TRIPS — Trade-Related Aspects of Intellectual Property Rights',
    composition: 'legal-shield',
    film: { camera: 'push' },
    content: (
      <Frame
        label="Trade + Intellectual Property"
        title="TRIPS sets minimum IPR standards in the trading system"
        lead="The Agreement on Trade-Related Aspects of Intellectual Property Rights (TRIPS), administered by the WTO, sets minimum standards for IPR protection and enforcement. It aims to reduce trade distortions caused by inadequate IPR protection, ensure enforcement measures do not hinder legitimate trade, facilitate international trade in knowledge, and help resolve IP-related trade disputes."
        visual={<TripsShield />}
        takeaway="TRIPS = minimum IPR standards + enforcement logic inside WTO trade rules."
      >
        <Definition term="TRIPS" keywords={['IPR', 'minimum standards', 'enforcement']}>
          Agreement on Trade-Related Aspects of Intellectual Property Rights — a WTO agreement setting minimum standards for protection and enforcement of intellectual property rights.
        </Definition>
        <Case title="Pharmaceutical market entry">A pharma firm entering multiple countries must map patent protection, data exclusivity practices and enforcement quality — TRIPS is the multilateral floor, while national regimes still differ in practice.</Case>
        <ManagerView>If IP protection differs across markets, market-entry mode, licensing and localisation strategy must change — not only the marketing plan.</ManagerView>
      </Frame>
    ),
  },

  /* 23 — TRIPS VS TRIMS ------------------------------------------------- */
  {
    id: 'trips-vs-trims',
    title: 'Common Confusion — TRIPS vs TRIMS',
    composition: 'comparison-tableau',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="Do not mix these acronyms"
        title="IP rights versus investment measures that affect trade"
        lead="Students lose marks when they swap TRIPS and TRIMS. Keep the managerial concern distinct."
        visual={<TripsVsTrims />}
        takeaway="TRIPS = IP. TRIMS = investment measures related to goods trade."
      >
        <ExamTip>Comparison table: purpose · coverage · business example · one limitation each.</ExamTip>
      </Frame>
    ),
  },

  /* 24 — WTO VS IMF VS UNCTAD ------------------------------------------- */
  {
    id: 'institutions-compare',
    title: 'Compare — WTO, IMF and UNCTAD',
    composition: 'institution-network',
    tone: 'ib-scene-graphite',
    film: { camera: 'aerial' },
    content: (
      <Frame
        mode="visual-lead"
        label="Major revision slide"
        title="What problem does each institution address?"
        lead="Global governance is specialised. WTO governs trade rules. IMF supports monetary and financial stability. UNCTAD focuses on trade and development — especially for developing countries."
        visual={<InstitutionsCompare />}
        takeaway="WTO = trade rules · IMF = money/BoP · UNCTAD = trade + development."
      >
        <ExamTip>10-mark comparison: problem · mandate · key instruments · business relevance · one limitation each.</ExamTip>
      </Frame>
    ),
  },

  /* 25 — BRIDGE TO REGIONAL --------------------------------------------- */
  {
    id: 'bridge-regional',
    title: 'From Global Institutions to Regional Integration',
    composition: 'policy-corridor',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="Conceptual bridge"
        title="Global rules exist — neighbours still deepen cooperation"
        lead="WTO, IMF and UNCTAD shape the global layer. But countries also form regional economic groupings to reduce barriers among neighbours, raise bargaining power and coordinate development. Module 4 therefore moves from global institutions into regional economic integration."
        visual={<BridgeToRegional />}
        takeaway="Global governance ≠ the end of regional cooperation."
      >
        <Insight>Regional blocs sit inside (and sometimes tension with) the multilateral system — managers must read both layers.</Insight>
      </Frame>
    ),
  },

  /* 26 — INTEGRATION INTRO ---------------------------------------------- */
  {
    id: 'integration-intro',
    title: 'Regional Economic Integration — Introduction',
    composition: 'tariff-boundary',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Economic Integration"
        title="Associations of countries that reduce barriers and cooperate"
        lead="Regional economic groupings are associations of countries in a geographical region that form agreements to reduce trade barriers and promote economic cooperation, leading to increased trade and investment. They can range from Free Trade Areas to Customs Unions, Common Markets and Economic Unions."
        visual={<IntegrationIntroVisual />}
        takeaway="Integration = regional barrier reduction + cooperation that can deepen over stages."
      >
        <Definition term="Regional Economic Integration" keywords={['barriers', 'cooperation', 'region']}>
          A process in which countries in a geographical region form agreements to reduce trade barriers and promote economic cooperation, increasing trade and investment among members.
        </Definition>
        <DidYouKnow>The PPT also references NAFTA (now USMCA), ASEAN, the EU and RCEP as major examples of regional trade architecture.</DidYouKnow>
      </Frame>
    ),
  },

  /* 27 — REASONS FOR BLOCS ---------------------------------------------- */
  {
    id: 'bloc-reasons',
    title: 'Why Countries Form Regional Trading Blocs',
    composition: 'quiet-policy',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT reasons"
        title="Motives behind regional trading blocs"
        lead="The Module 4 PPT lists the core reasons countries form regional trading blocs."
        visual={<BlocReasonsVisual />}
        takeaway="Reasons = barriers · bargaining · economics · competition · trade · investment · security."
      >
        <ManagerView>If tariffs fall inside a regional bloc, ask whether manufacturing should relocate to serve the bloc from one hub.</ManagerView>
      </Frame>
    ),
  },

  /* 28 — LEVELS OVERVIEW ------------------------------------------------ */
  {
    id: 'levels-overview',
    title: 'Levels of Regional Economic Integration — Overview',
    composition: 'integration-ladder',
    film: { hero: true, heroTier: '2', camera: 'dolly' },
    content: (
      <Frame
        mode="reverse"
        label="Exact PPT sequence"
        title="Integration deepens step by step"
        lead="Use the PPT's ladder exactly: Preferential Trading Agreement → Free Trade Area → Customs Union → Common Market → Economic Union → Political Union."
        visual={<IntegrationLadder />}
        takeaway="Diagram to draw: the six-level integration ladder from the PPT."
      >
        <ExamTip>Always draw the ladder with one distinguishing feature under each step.</ExamTip>
      </Frame>
    ),
  },

  /* 29 — PTA + FTA ------------------------------------------------------ */
  {
    id: 'pta-fta',
    title: 'Preferential Trading Agreement and Free Trade Area',
    composition: 'tariff-boundary',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="First two rungs"
        title="From preference to internal free trade"
        lead="A Preferential Trading Agreement (PTA) grants reduced tariffs or special quotas — preferential, not necessarily zero. A Free Trade Area (FTA) creates a formal tariff-free trading area among members, while each member may keep its own external tariffs toward non-members."
        visual={<AbcTariffStory />}
        takeaway="PTA = preference. FTA = free among members, own external tariffs."
      >
        <Think>Countries A and B remove tariffs on each other but keep different tariffs on Country C. Which level is that — and why do rules of origin appear?</Think>
      </Frame>
    ),
  },

  /* 30 — CUSTOMS UNION + COMMON MARKET ---------------------------------- */
  {
    id: 'cu-cm',
    title: 'Customs Union and Common Market',
    composition: 'comparison-tableau',
    film: { camera: 'orbit' },
    content: (
      <Frame
        label="Deepening"
        title="Add a common external tariff — then free factor movement"
        lead="A Customs Union is a free trade area plus a common external tariff (CET) toward outsiders. A Common Market goes further: customs union plus free movement of goods, services, people and capital."
        visual={<IntegrationLadder />}
        takeaway="CU = FTA + CET. Common Market = CU + factor mobility."
      >
        <ExamTip>Common confusion: FTA ≠ Customs Union — the missing piece is the common external tariff.</ExamTip>
      </Frame>
    ),
  },

  /* 31 — ECONOMIC + POLITICAL UNION ------------------------------------- */
  {
    id: 'eu-political',
    title: 'Economic Union and Political Union',
    composition: 'editorial',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="Deepest rungs"
        title="Policy harmonisation — and then shared sovereignty"
        lead="An Economic Union is a common market plus full economic policy harmonisation. A Political Union involves shared sovereignty or complete unification of nations — the deepest political form on the PPT ladder."
        visual={<IntegrationIntroVisual />}
        takeaway="Economic Union = common market + policy harmonisation. Political Union = shared sovereignty."
      >
        <DidYouKnow>The EU is the PPT's flagship example of deep regional economic integration moving toward economic-union features (including a common currency for euro-area members).</DidYouKnow>
      </Frame>
    ),
  },

  /* 32 — A/B/C WORKED LOGIC --------------------------------------------- */
  {
    id: 'abc-example',
    title: 'Worked Logic — Countries A, B and C',
    composition: 'worked-example',
    tone: 'ib-scene-graphite',
    film: { camera: 'dolly' },
    content: (
      <Frame
        mode="visual-lead"
        label="Make the ladder unforgettable"
        title="Watch barriers fall — then watch external policy unify"
        lead="Start with tariffs among A, B and C. Then advance stage by stage using only the PPT distinctions."
        visual={<AbcTariffStory />}
        takeaway="Internal free trade ≠ common external tariff ≠ factor mobility ≠ policy harmonisation."
      >
        <ExamTip>Reproduce this A–B–C story in 8–10 lines whenever asked to distinguish integration levels.</ExamTip>
      </Frame>
    ),
  },

  /* 33 — LEVELS CONFUSION BOARD ----------------------------------------- */
  {
    id: 'levels-confusion',
    title: 'Common Confusion — FTA vs Customs Union vs Common Market',
    composition: 'confusion-board',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="Exam lock"
        title="Four questions that separate the stages"
        lead="For each stage, ask: Are internal trade barriers removed? Is there a common external tariff? Can factors move freely? Is economic policy harmonised?"
        visual={<LevelsConfusionBoard />}
        takeaway="Memory logic: Free inside → Common outside → Factors move → Policies align."
      >
        <ExamTip>Draw a 4-row table with those four questions as columns — high-scoring exam format.</ExamTip>
      </Frame>
    ),
  },

  /* 34 — EU ------------------------------------------------------------- */
  {
    id: 'eu',
    title: 'Regional Integration in Europe — The European Union',
    composition: 'regional-map',
    film: { hero: true, heroTier: '2', camera: 'pan' },
    content: (
      <Frame
        mode="visual-lead"
        label="Europe"
        title="The world's most integrated economic bloc"
        lead="Regional economic integration in Europe is most notably represented by the European Union (EU): a single market, customs union with a common external tariff, free movement of goods, services, capital and people, and — for euro-area members — a common currency. The process began after World War II with the European Coal and Steel Community and evolved into a deeply intertwined economic and political union among 27 member states, promoting peace and prosperity."
        visual={<EuMarketMap />}
        takeaway="EU = deep integration example — single market + CET + mobility (+ euro for some)."
      >
        <ManagerView>Serving the EU often means designing for one regulated market space — standards, logistics hubs and competition intensify.</ManagerView>
        <Update>Current context: the EU remains a deep integration benchmark even as trade policy, industrial strategy and enlargement debates evolve — use current events only to illustrate, not to replace PPT theory.</Update>
      </Frame>
    ),
  },

  /* 35 — USA / NAFTA / USMCA -------------------------------------------- */
  {
    id: 'nafta-usmca',
    title: 'Regional Integration involving the USA — NAFTA to USMCA',
    composition: 'bloc-canvas',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="USA / North America"
        title="North American integration is a trade agreement story"
        lead="Regional economic integration involving the United States is not about agreements among U.S. states — the U.S. is already a unified national market. Instead, the U.S. participates in regional trade agreements with neighbours. NAFTA began on 1 January 1994 among the U.S., Canada and Mexico; its successor is the United States–Mexico–Canada Agreement (USMCA)."
        visual={<NaftaUsmcaMap />}
        takeaway="Syllabus 'USA' = North American regional agreement (NAFTA → USMCA), not intra-U.S. federalism."
      >
        <ExamTip>Write "NAFTA (1994) succeeded by USMCA" to show both syllabus terminology and current naming.</ExamTip>
        <RealWorld>Rules of origin and automotive/content provisions in North American agreements directly affect where firms locate production stages.</RealWorld>
      </Frame>
    ),
  },

  /* 36 — ASEAN ---------------------------------------------------------- */
  {
    id: 'asean',
    title: 'ASEAN — Association of Southeast Asian Nations',
    composition: 'regional-map',
    tone: 'ib-scene-emerald',
    film: { wow: true, camera: 'pan' },
    content: (
      <Frame
        mode="visual-lead"
        label="Southeast Asia"
        title="Ten economies cooperating for growth, peace and integration"
        lead="ASEAN was founded on 8 August 1967 in Bangkok to accelerate economic growth, social progress and cultural development while promoting peace and regional security. Members: Brunei, Cambodia, Indonesia, Laos, Malaysia, Myanmar, the Philippines, Singapore, Thailand and Vietnam. It fosters economic integration and regional stability through cooperation and the principle of non-interference in internal affairs."
        visual={<AseanNetworkMap />}
        takeaway="ASEAN = 10 members · Bangkok 1967 · growth + peace + cooperation + non-interference."
      >
        <ManagerView>ASEAN matters strategically for manufacturing networks, market growth and regional supply chains — evaluate the region as a production-and-demand system, not ten isolated countries.</ManagerView>
        <Case title="Electronics contract manufacturer — choosing an ASEAN hub">A firm designs multi-country ASEAN capacity near growth markets, checking logistics, talent, incentives and rules of origin. ASEAN becomes a network decision — not a single-country bet. Regional blocs change hub-and-spoke production design.</Case>
      </Frame>
    ),
  },

  /* 37 — SAARC ---------------------------------------------------------- */
  {
    id: 'saarc',
    title: 'SAARC — South Asian Association for Regional Cooperation',
    composition: 'timeline',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="South Asia"
        title="Regional cooperation for welfare, development and self-reliance"
        lead="SAARC, founded in 1985, promotes the welfare of the peoples of South Asia, accelerates economic, social and cultural development, and fosters collective self-reliance. Eight members: Afghanistan, Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan and Sri Lanka. Secretariat: Kathmandu, Nepal."
        visual={<SaarcProgression />}
        takeaway="SAARC = 1985 · 8 members · Kathmandu secretariat · welfare + development + self-reliance."
      >
        <RealWorld>For Indian exporters, South Asian integration matters because neighbour markets are near — but non-tariff frictions and politics often decide whether preferential paper becomes real trade.</RealWorld>
        <ExamTip>Do not merge SAARC, SAPTA and SAFTA into one vague paragraph — keep the progression clear.</ExamTip>
      </Frame>
    ),
  },

  /* 38 — SAPTA ---------------------------------------------------------- */
  {
    id: 'sapta',
    title: 'SAPTA — SAARC Preferential Trading Arrangement',
    composition: 'definition',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="1993 preferential step"
        title="The first trade-liberalisation step under SAARC"
        lead="SAPTA (1993) was a trade agreement among SAARC members (Bangladesh, Bhutan, India, Maldives, Nepal, Pakistan and Sri Lanka) designed to boost intra-regional trade by gradually reducing tariffs and other barriers. It was the first step toward a larger Free Trade Area and has since been succeeded by the more comprehensive SAFTA."
        visual={<IntegrationIntroVisual />}
        takeaway="SAPTA = 1993 preferential arrangement → stepping stone to SAFTA."
      >
        <Definition term="SAPTA" keywords={['1993', 'preferential', 'SAARC']}>
          SAARC Preferential Trading Arrangement — a 1993 agreement to boost intra-SAARC trade through gradual tariff and barrier reductions, laying the foundation for a South Asian Free Trade Area.
        </Definition>
      </Frame>
    ),
  },

  /* 39 — SAFTA + PROGRESSION -------------------------------------------- */
  {
    id: 'safta',
    title: 'SAFTA — South Asian Free Trade Area',
    composition: 'corridor',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="Extension of the South Asian path"
        title="From preference to a free-trade objective"
        lead="The PPT presents SAFTA as an extension to SAARC and as the more comprehensive successor to SAPTA. Students should remember the progression: SAARC (organisation) → SAPTA (preferential arrangement) → SAFTA (free-trade area objective)."
        visual={<SaarcProgression />}
        takeaway="Organisation → Preference → Free-trade ambition."
      >
        <Think>If a question says "SAPTA", do not answer as if it were already a completed customs union — it is the preferential stepping stone.</Think>
        <ManagerView>South Asian market strategies must separate political organisation (SAARC) from actual trade preference depth (SAPTA/SAFTA practice).</ManagerView>
      </Frame>
    ),
  },

  /* 40 — BRICS ---------------------------------------------------------- */
  {
    id: 'brics',
    title: 'BRICS — Emerging-Economy Cooperation',
    composition: 'bloc-canvas',
    film: { camera: 'aerial' },
    content: (
      <Frame
        mode="visual-lead"
        label="PPT + careful current context"
        title="A platform of major emerging economies"
        lead="BRICS began as an acronym for Brazil, Russia, India, China and South Africa — a geopolitical and economic alliance of major emerging economies. Core course idea: foster economic and financial cooperation among large emerging markets and give them a stronger collective voice in global governance debates."
        visual={<BricsConstellation />}
        takeaway="Core concept: emerging-economy cooperation platform (original BRICS five)."
      >
        <Update>Current context (separate from core syllabus memorisation): membership expanded beyond the original five — Egypt, Ethiopia, Iran and the UAE joined in 2024; Indonesia joined in 2025. Official listings and partner-country formats continue to evolve; treat expansion as current enrichment, not as a rewrite of the PPT's core idea.</Update>
        <Case title="Indian firm scanning BRICS demand">An engineering exporter uses BRICS forums and bilateral ties as market-intelligence channels — but still underwrites each country on its own risk, rules and logistics reality.</Case>
        <ExamTip>Lead with the original five and cooperation purpose; add expansion only if the question asks for current membership.</ExamTip>
      </Frame>
    ),
  },

  /* 41 — SYNTHESIS ------------------------------------------------------ */
  {
    id: 'synthesis',
    title: 'Governance Synthesis — Global, Regional, Business',
    composition: 'synthesis-network',
    film: { hero: true, heroTier: '2', camera: 'aerial' },
    content: (
      <Frame
        label="Insight complete"
        title="One architecture — many levers"
        lead="Global business crosses borders; governance determines the rules of crossing them. WTO, IMF and UNCTAD form the global layer. EU, North American agreements, ASEAN, SAARC/SAPTA/SAFTA and BRICS form regional layers. Firms translate those layers into market access, investment, finance, IP and supply-chain choices."
        visual={<GovernanceSynthesis />}
        takeaway="Which theory of governance applies? Match the decision to the institutional layer."
      >
        <Think>You are locating a plant to serve Southeast Asia and also exporting IP-rich software to Europe. Which institutions and agreements matter most — and why?</Think>
        <Insight>Opportunity without rules is fragile. Judgment without institutions is incomplete. Insight without governance cannot explain the constraints managers actually face.</Insight>
      </Frame>
    ),
  },

  /* 42 — EXAM PACK ------------------------------------------------------ */
  {
    id: 'exam-pack',
    title: 'Module 4 — Exam Pack & Revision',
    composition: 'exam-board',
    tone: 'ib-scene-graphite',
    film: { quiet: true, camera: 'hold' },
    content: (
      <ExamPack
        title="Module 4 — Exam Pack"
        definitions={[
          { term: 'UNCTAD', text: 'UN body (1964) for trade and development of developing countries.' },
          { term: 'IMF', text: 'Bretton Woods monetary institution — cooperation, FX stability, BoP support.' },
          { term: 'WTO', text: '1995 successor to GATT — rules of trade, disputes, predictability.' },
          { term: 'TRIMS', text: 'Investment measures related to goods trade; anti-discrimination focus.' },
          { term: 'TRIPS', text: 'Minimum IPR standards and enforcement in the WTO system.' },
          { term: 'Economic integration', text: 'Regional barrier reduction and cooperation across deepening stages.' },
        ]}
        tenMark={[
          'Explain UNCTAD — introduction, principles and achievements.',
          'Explain the role and objectives of the IMF.',
          'Explain the WTO — role, principles and advantages (with GATT link).',
          'Distinguish TRIPS and TRIMS with features and examples.',
          'Explain levels of economic integration with distinctions.',
          'Discuss regional economic integration in Europe / ASEAN / SAARC–SAPTA.',
        ]}
        comparisons={[
          'GATT vs WTO',
          'IMF vs World Bank (clarity)',
          'WTO vs IMF vs UNCTAD',
          'TRIPS vs TRIMS',
          'FTA vs Customs Union vs Common Market vs Economic Union',
          'SAARC vs SAPTA vs SAFTA',
        ]}
        memory="Architecture: Trade→WTO · Money→IMF · Development→UNCTAD · Neighbours→Blocs. Ladder: PTA→FTA→CU→CM→Economic Union→Political Union. South Asia: SAARC→SAPTA→SAFTA. IP=TRIPS · Investment measures=TRIMS."
      />
    ),
  },

  /* 43 — PAYOFF --------------------------------------------------------- */
  {
    id: 'payoff',
    title: 'Module 4 — The Big Picture',
    composition: 'finale',
    tone: 'ib-scene-dark',
    film: { finale: true, hero: true, heroTier: '1', chapterPayoff: true, callback: true, camera: 'aerial' },
    content: (
      <Frame
        label="Where we've been"
        title="Governance determines the rules of crossing borders"
        lead="Opportunity discovered the global market. Judgment taught evaluation. Insight explained why trade and competition happen. Governance shows the institutions and blocs that regulate, negotiate and integrate the system."
        visual={<GovernancePayoff />}
        takeaway="Global business crosses borders. Governance determines the rules of crossing them."
      >
        <Insight>Ⅳ — GOVERNANCE complete. Next seam: Ⅴ — AMBITION — building and competing as a multinational enterprise within the governed world economy.</Insight>
      </Frame>
    ),
  },
]

export const internationalBusinessModule4Slides = buildModule(4, module4, {
  opener: <GovernanceOpener module={4} />,
})

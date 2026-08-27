import {
  buildModule, Frame, Hook, MiniCase, ExamPack, Definition, Case,
  Insight, ExamTip, Update, ManagerView, RealWorld, Think, DidYouKnow, Explain,
  Flow,
} from './kit'
import {
  AmbitionOpener, AmbitionHook, AmbitionJourney, MncDefinitionVisual, MncVsDomesticVisual,
  MncAnatomy, NatureScaleVisual, NatureControlVisual, GrowthEngineIntro, GrowthEngine,
  HostHomeBridge, HostBenefitsVisual, HomeBenefitsVisual, ValueVsRisk, HostRisksVisual,
  HomeRisksVisual, IndiaTimeline, IndiaExamplesVisual, IndiaOutbound, IndiaOpportunitiesVisual,
  StructureNeed, OrgInternational, OrgFunctional, OrgProduct, OrgGeographic, OrgMatrix,
  OrgMixed, StructureCompareVisual, StructureConfusionVisual, TechTransferMeaning,
  TechTransferReasons, TechTransferMethodsOverview, TechMethodsA, TechMethodsB,
  TechMethodCompare, TechImportanceLadder, TechTransferJvCase, CompetitivenessArena,
  CompetitivenessNeed, PillarsArchitecture, PillarsFoundationsVisual, PillarsEfficiencyVisual,
  ImdContextVisual, TechCompetitivenessVisual, TechNotEnoughVisual,
  AmbitionSynthesis, AmbitionPayoff,
} from './scenes5'

/**
 * MODULE 5 — Multinational Corporations & Global Competitiveness
 * Chapter identity: Ⅴ — AMBITION
 * Syllabus topics (22MBA401 / VTU MNC module; course PPT labels Module-5, 6 Hours):
 * Multi-National Corporations — Definition and Meaning; factors that contributed
 * to positive growth of MNCs; Importance of MNCs; Advantages and disadvantages
 * of MNCs; MNCs in India; Organizational structure of MNCs; Transfer of
 * Technology; Global Competitiveness; Indicators of competitiveness; Technology
 * of Global competitiveness.
 * Primary source: IB -M-5.pptx (public/International Buisness/).
 * Note: Some printed VTU scheme PDFs number this block as MODULE-4; this course
 * follows the course IB PPT series where Institutions = Module 4 and MNCs =
 * Module 5. Topic coverage matches the official VTU MNC syllabus block 100%.
 * CONTENT APPROVED & LOCKED — Ambition cinematic presentation pass.
 * Personality: Grow → Expand → Organize → Transfer → Compete.
 */

const module5 = [
  /* 01 — HOOK ------------------------------------------------------------- */
  {
    id: 'hook',
    labels: ['MNCs', 'Host', 'Home', 'India', 'Structure', 'Technology Transfer', 'Competitiveness'],
    title: 'Why Become a Multinational?',
    composition: 'corporate-cinema',
    tone: 'ib-scene-editorial',
    film: { wow: true, camera: 'push' },
    content: (
      <Hook
        eyebrow="Module 5 · Ambition"
        question="A company dominates its domestic market. What next — customers, costs, resources, technology, talent, or strategic markets?"
        sub="Module 1 opened opportunity. Module 2 taught judgment of country climate. Module 3 explained why trade and competition emerge. Module 4 showed who sets the rules. Module 5 answers the ambition question: how a firm grows beyond its home country, organizes globally, transfers technology and builds competitiveness."
        visual={<AmbitionHook />}
      />
    ),
  },

  /* 02 — STORY ARC ------------------------------------------------------- */
  {
    id: 'journey',
    title: 'The Ambition Journey',
    composition: 'corridor',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Chapter map"
        title="From domestic business to global competitiveness"
        lead="Module 5 is not a list of MNC definitions. It is the story of corporate ambition: why firms go abroad, what changes when they become multinational, how they organize, how knowledge moves, and how capability becomes competitiveness."
        visual={<AmbitionJourney />}
        takeaway="Ambition path: Grow → Expand → Organize → Transfer → Compete."
      >
        <Think>Which decision comes first for most firms — new foreign customers, lower costs, or access to technology?</Think>
        <ManagerView>Treat every Module 5 topic as a managerial choice: where to grow, how to control, what to transfer, and how to stay competitive.</ManagerView>
      </Frame>
    ),
  },

  /* 03 — DEFINITION ------------------------------------------------------ */
  {
    id: 'mnc-definition',
    title: 'MNC — Definition and Meaning',
    composition: 'definition',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT · Definition and Meaning"
        title="A multinational corporation manages business across countries under coordinated control"
        lead="A Multi-National Corporation (MNC) owns or controls productive, marketing, financial or service activities in more than one country and coordinates resources, technology, brands and people as one managerial system — not as isolated local shops."
        visual={<MncDefinitionVisual />}
        takeaway="Theory in one line: MNC = coordinated cross-border ownership/control of business activities."
      >
        <Definition term="Multi-National Corporation (MNC)" keywords={['ownership', 'control', 'countries', 'coordination']}>
          A firm that owns or controls business operations in two or more countries and manages them under a unified (or strongly coordinated) managerial system spanning markets, resources and technology.
        </Definition>
        <Explain items={[
          { title: 'Simple explanation', text: 'The firm is no longer only “exporting from home” — it operates and decides across borders.' },
          { title: 'Managerial takeaway', text: 'Becoming multinational changes strategy, structure, risk and capability — not only geography.' },
        ]} />
        <ExamTip>Start 10-mark answers with a crisp definition, then nature, then importance/structures as asked.</ExamTip>
      </Frame>
    ),
  },

  /* 04 — MNC VS DOMESTIC ------------------------------------------------- */
  {
    id: 'mnc-vs-domestic',
    title: 'What Makes an MNC Different from a Domestic Firm?',
    composition: 'comparison-tableau',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="Meaning in contrast"
        title="Domestic success is not the same as multinational capability"
        lead="A domestic firm competes mainly inside one national system of law, currency, culture and customers. An MNC must coordinate across multiple systems — and that changes organization, finance, technology and risk."
        visual={<MncVsDomesticVisual />}
        takeaway="Exporting reaches markets; multinational status redesigns the firm."
      >
        <DidYouKnow>Many firms internationalize step by step — export → agents → subsidiaries — before becoming full MNCs.</DidYouKnow>
        <ManagerView>Ask: are we only selling into a market, or building controllable operations there?</ManagerView>
      </Frame>
    ),
  },

  /* 05 — NATURE OVERVIEW ------------------------------------------------- */
  {
    id: 'nature-overview',
    title: 'Nature of MNCs — Overview',
    composition: 'enterprise-anatomy',
    film: { hero: true, heroTier: '2', camera: 'orbit', wow: true },
    content: (
      <Frame
        label="PPT · Nature of MNCs"
        title="Ten characteristics define the multinational enterprise"
        lead="The Module 5 PPT lists the nature of MNCs through ten characteristics. Retain every term for exams; use the clusters below only as a teaching lens."
        visual={<MncAnatomy />}
        takeaway="Memorise all ten PPT characteristics; cluster only for recall."
      >
        <ExamTip>For “Nature of MNCs”, list all ten PPT points with one line of meaning each.</ExamTip>
      </Frame>
    ),
  },

  /* 06 — CHARACTERISTICS SCALE ------------------------------------------- */
  {
    id: 'nature-scale',
    title: 'Nature — Scale, Operations and Market Power',
    composition: 'boardroom',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="Characteristics 1–5"
        title="Size and reach create power — and require coordination"
        lead="MNCs typically operate at large scale across countries, often in concentrated industries, serving international markets and integrating activities worldwide."
        visual={<NatureScaleVisual />}
        takeaway="Scale without coordination is waste; scale with coordination is advantage."
      >
        <RealWorld>Global FMCG and auto firms illustrate huge size + international operations + scale economies in the same system.</RealWorld>
      </Frame>
    ),
  },

  /* 07 — CHARACTERISTICS CONTROL ----------------------------------------- */
  {
    id: 'nature-control',
    title: 'Nature — Resources, Technology and Managerial Control',
    composition: 'framework',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="Characteristics 6–10"
        title="MNCs move resources and technology under professional, coordinated control"
        lead="Beyond size, the PPT emphasises resource transfer, refined technology, professional management, single managerial control and an integrated worldwide business system."
        visual={<NatureControlVisual />}
        takeaway="Nature = scale + technology + professional control + worldwide integration."
      >
        <ManagerView>If technology and control do not travel with investment, you have presence — not a true multinational system.</ManagerView>
      </Frame>
    ),
  },

  /* 08 — GROWTH INTRO ---------------------------------------------------- */
  {
    id: 'growth-intro',
    title: 'Why MNCs Grew — Cause and Effect',
    composition: 'growth-engine',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="PPT · Positive growth factors"
        title="Growth factors are mechanisms, not a shopping list"
        lead="The PPT lists capital, technology, skill, exports, integration, citizen welfare, local labour investment, FDI-led development, political improvement and the relative ease of FDI through MNCs. Each factor works through a chain: capability → expansion → further advantage."
        visual={<GrowthEngineIntro />}
        takeaway="Ask how each factor enables the next expansion step."
      >
        <Think>Which growth factor matters most for a capital-rich tech firm versus a labour-seeking manufacturer?</Think>
      </Frame>
    ),
  },

  /* 09 — GROWTH FACTORS -------------------------------------------------- */
  {
    id: 'growth-factors',
    title: 'Factors that Contributed to Positive Growth of MNCs',
    composition: 'enterprise-anatomy',
    density: 'compact',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="All PPT growth factors"
        title="Ten drivers behind the rise of multinational enterprise"
        lead="Preserve every PPT factor. Use the explanations as mechanism notes for long answers."
        visual={<GrowthEngine />}
        takeaway="Growth = capital + technology + skill + policy + FDI packaging."
      >
        <ExamTip>Write growth factors as cause→effect pairs, not bare bullets.</ExamTip>
      </Frame>
    ),
  },

  /* 10 — HOST IMPORTANCE ------------------------------------------------- */
  {
    id: 'importance-host',
    title: 'Importance of MNCs — Host Country',
    composition: 'host-home',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="PPT · Importance to Host Country"
        title="Hosts gain markets, capital, technology, jobs and export capacity"
        lead="For the host country, MNCs can open worldwide market access, bring capital investment, transfer technology through R&D, develop local suppliers, create jobs, provide advanced training, improve managerial talent access, offer better products at lower cost, and contribute to exports."
        visual={<HostBenefitsVisual />}
        takeaway="Host benefits span markets, capital, technology, labour and exports — when linkages work."
      >
        <ManagerView>Host benefits are real only if local firms, workers and institutions can absorb the spillovers.</ManagerView>
        <ExamTip>Never mix host and home benefits in one undifferentiated paragraph.</ExamTip>
      </Frame>
    ),
  },

  /* 11 — HOME IMPORTANCE ------------------------------------------------- */
  {
    id: 'importance-home',
    title: 'Importance of MNCs — Home Country',
    composition: 'quiet-executive',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="PPT · Importance to Home Country"
        title="Homes gain growth, jobs and export-led market expansion"
        lead="For the home country, the PPT highlights economical growth, employment opportunities, and expansion of the domestic market by exporting finished goods. Outward MNCs can also strengthen brands and global market intelligence that feed back to HQ."
        visual={<HomeBenefitsVisual />}
        takeaway="Home gains are growth, employment and export expansion — not automatic for every industry."
      >
        <Think>Why might the same MNC create different net benefits for home versus host stakeholders?</Think>
      </Frame>
    ),
  },

  /* 12 — HOST VS HOME ---------------------------------------------------- */
  {
    id: 'host-vs-home',
    title: 'Common Confusion — Host Benefit vs Home Benefit',
    composition: 'host-home',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="Clarity board"
        title="Same firm, different stakeholder calculus"
        lead="Host countries care about jobs, technology absorption, supplier development and sovereignty. Home countries care about growth, employment quality and whether overseas expansion strengthens or hollows the domestic base."
        visual={<HostHomeBridge />}
        takeaway="Do not label MNC impact as simply good or bad — specify for whom."
      >
        <Insight>An MNC can be a capital and skills bridge for a host while raising offshoring anxiety at home — both can be true in the same decade.</Insight>
      </Frame>
    ),
  },

  /* 13 — HOST DISADVANTAGES ---------------------------------------------- */
  {
    id: 'disadvantages-host',
    title: 'Disadvantages — Challenges to Host Country',
    composition: 'boardroom',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="PPT · Challenges to Host Country"
        title="Host gains can arrive with resource, FX, technology and sovereignty pressures"
        lead="The PPT lists host challenges: drain of resources for profit maximisation; strain of scarce foreign-exchange reserves; minimum technology transfer; insignificant employment potential; interference in states’ sovereignty; and influence on culture."
        visual={<HostRisksVisual />}
        takeaway="Host risks = resource/FX pressure, weak transfer, thin jobs, sovereignty and culture."
      >
        <ManagerView>If you are the host policymaker, ask what must be localised — suppliers, skills, R&D — before celebrating FDI announcements.</ManagerView>
      </Frame>
    ),
  },

  /* 14 — HOME DISADVANTAGES ---------------------------------------------- */
  {
    id: 'disadvantages-home',
    title: 'Disadvantages — Challenges to Home Country',
    composition: 'quiet-executive',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="PPT · Challenges to Home Country"
        title="Homes may lose jobs, face repatriation friction and erode advantages"
        lead="Home-country challenges in the PPT: loss of employment; repatriation issues; and possibility of losing competitive advantage when critical capabilities move abroad."
        visual={<HomeRisksVisual />}
        takeaway="Home risks centre on jobs, repatriation and capability loss."
      >
        <ExamTip>Balanced 10-mark answers need host AND home disadvantages when the question says “disadvantages of MNCs”.</ExamTip>
      </Frame>
    ),
  },

  /* 15 — BENEFIT VS RISK ------------------------------------------------- */
  {
    id: 'benefit-vs-risk',
    title: 'MNC Value vs MNC Risk — Synthesis',
    composition: 'balance',
    film: { hero: true, heroTier: '2', camera: 'orbit' },
    content: (
      <Frame
        label="MBA synthesis"
        title="Can MNC impact be labelled simply good or bad?"
        lead="Investment, employment, technology and market access sit on the value side. Profit repatriation, cultural pressure, sovereignty concerns and competitive displacement sit on the risk side. Net impact depends on industry, policy, strategy, host economy, governance and business behaviour."
        visual={<ValueVsRisk />}
        takeaway="Impact is contingent — design policy and strategy for linkages."
      >
        <ManagerView>Can MNC impact be labelled simply good or bad? No — specify stakeholder, time horizon and linkage quality.</ManagerView>
      </Frame>
    ),
  },

  /* 16 — MNCS IN INDIA --------------------------------------------------- */
  {
    id: 'mncs-india',
    title: 'MNCs in India — History and Liberalization',
    composition: 'india-timeline',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="PPT · MNCs in India"
        title="India’s MNC story accelerates after 1991 liberalization"
        lead="MNCs have a long history in India, dating back to the colonial era with companies like the British East India Company and the Dutch East India Company. Their significant presence and growth accelerated after India’s 1991 economic liberalization, which attracted a large influx of foreign investment across sectors. Today, India hosts thousands of MNCs contributing through technology transfer, job creation and global-market integration."
        visual={<IndiaTimeline />}
        takeaway="Liberalization → FDI → market access → MNC expansion in India."
      >
        <Update>Supplementary context: Global Capability Centres, digital services and manufacturing policy continue to reshape where MNCs locate capability in India — keep this distinct from the PPT core narrative.</Update>
      </Frame>
    ),
  },

  /* 17 — INDIA EXAMPLES -------------------------------------------------- */
  {
    id: 'india-examples',
    title: 'Examples of MNCs in India',
    composition: 'corporate-case',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT examples preserved"
        title="Pre-Independence, post-Independence and modern-era names"
        lead="Use the PPT’s example set. Pre-Independence: Philips, Siemens, Unilever (Lever Brothers), GE, and Standard Chartered Bank. Post-Independence: Shell (subsidiary established in 1928). Modern Era: IBM, Microsoft, Google, Nestlé, Coca-Cola, Pfizer, and Tata Consultancy Services."
        visual={<IndiaExamplesVisual />}
        takeaway="Examples show continuity from colonial-era firms to digital-era MNCs — including Indian-origin TCS."
      >
        <DidYouKnow>TCS in the PPT’s modern list reminds students that “MNCs in India” includes Indian firms that became multinational — not only foreign entrants.</DidYouKnow>
      </Frame>
    ),
  },

  /* 18 — INDIAN MNCS ----------------------------------------------------- */
  {
    id: 'indian-mncs',
    title: 'Indian Companies Becoming Multinational',
    composition: 'expansion-map',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="Two-way ambition"
        title="Foreign MNCs enter India — and Indian firms expand abroad"
        lead="MBA learning is incomplete if India is only a host. Indian groups have built multinational footprints in IT services, vehicles, telecom, energy and industrials — using capability, capital and acquisitions."
        visual={<IndiaOutbound />}
        takeaway="Ambition is two-directional: inbound FDI and outbound Indian MNCs."
      >
        <Case title="Tata’s global logic">Tata’s overseas expansions show structure + brand + capability travelling together — not exports alone.</Case>
        <ManagerView>When scanning “India opportunity,” ask both: who is entering India, and which Indian firms are becoming rivals abroad?</ManagerView>
      </Frame>
    ),
  },

  /* 19 — OPPORTUNITIES INDIAN MNCS --------------------------------------- */
  {
    id: 'india-opportunities',
    title: 'Current Opportunities of Indian MNCs',
    composition: 'growth-engine',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT · Current Opportunities"
        title="Six PPT drivers support Indian firms’ international expansion"
        lead="Rapid domestic economic growth, international expansion strategy, factor mobility, economic reforms, market potential and development in communication technology — each supports outbound ambition when paired with management capability."
        visual={<IndiaOpportunitiesVisual />}
        takeaway="PPT opportunities + digital/manufacturing capability = modern Indian MNC runway."
      >
        <Update>Supplementary relevance: digital services, GCCs, manufacturing expansion and supply-chain diversification amplify these PPT drivers — mark as current enrichment.</Update>
        <ExamTip>List all six PPT opportunity points; add one modern example only if asked for illustration.</ExamTip>
      </Frame>
    ),
  },

  /* 20 — STRUCTURE INTRO ------------------------------------------------- */
  {
    id: 'structure-intro',
    title: 'Organizational Structure of MNCs — Why It Matters',
    composition: 'org-network',
    film: { camera: 'push' },
    content: (
      <Frame
        label="PPT · Organizational structure"
        title="Structure is how ambition becomes controllable"
        lead="The PPT lists six structures: International Divisions Structure; Functional Divisions Structure; Product Division Structure; Geographic (Area) Division Structure; Matrix Division Structure; and Mixed Structure. Structure answers: who owns which decisions across countries?"
        visual={<StructureNeed />}
        takeaway="Every structure trades global coordination against local responsiveness."
      >
        <ManagerView>When should a company establish a subsidiary instead of exporting — and which structure will control that subsidiary?</ManagerView>
        <ExamTip>Draw the hierarchy for at least two structures in exams.</ExamTip>
      </Frame>
    ),
  },

  /* 21 — INTERNATIONAL DIVISION ------------------------------------------ */
  {
    id: 'structure-international',
    title: 'International Division Structure',
    composition: 'org-tree',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="Early expansion design"
        title="Domestic core + a dedicated international division"
        lead="The firm keeps domestic business as the main body and creates an International Division to handle overseas sales, subsidiaries and coordination. Common in early internationalization when foreign volume is still secondary."
        visual={<OrgInternational />}
        takeaway="Best for early expansion; can under-serve international strategy as foreign sales grow."
      >
        <Explain items={[
          { title: 'Advantage', text: 'Focuses scarce international skills in one place; simple accountability.' },
          { title: 'Limitation', text: 'Domestic bias may starve foreign units of attention and resources.' },
          { title: 'Strategy fit', text: 'Supports early multi-domestic or export-led expansion.' },
        ]} />
      </Frame>
    ),
  },

  /* 22 — FUNCTIONAL ------------------------------------------------------ */
  {
    id: 'structure-functional',
    title: 'Functional Division Structure',
    composition: 'framework',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="Grouping by function"
        title="Marketing, finance, operations and HR span countries"
        lead="Activities are organised by function — for example marketing, finance, operations and HR — with each function taking global or multi-country responsibility. Coordination is strong inside functions; cross-function country response can be slower."
        visual={<OrgFunctional />}
        takeaway="Functional structures favour expertise depth; watch local responsiveness."
      >
        <ManagerView>Global coordination vs local responsiveness: functional designs lean coordination — add country voices deliberately.</ManagerView>
      </Frame>
    ),
  },

  /* 23 — PRODUCT --------------------------------------------------------- */
  {
    id: 'structure-product',
    title: 'Product Division Structure',
    composition: 'product-tower',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="Global product lines"
        title="Each product division runs across multiple markets"
        lead="The firm organises around product lines. Product A, Product B and Product C each operate internationally, owning P&L logic for their category across countries."
        visual={<OrgProduct />}
        takeaway="Product structure fits diversified MNCs needing deep category expertise worldwide."
      >
        <Case title="Unilever-style logic">Category/product organisations help standardise brands and innovation globally while still needing country execution partners.</Case>
        <Explain items={[
          { title: 'Advantage', text: 'Clear product accountability and global scale in R&D/marketing.' },
          { title: 'Challenge', text: 'Country duplication and weak geographic synergy if regions are ignored.' },
        ]} />
      </Frame>
    ),
  },

  /* 24 — GEOGRAPHIC ------------------------------------------------------ */
  {
    id: 'structure-geographic',
    title: 'Geographic (Area) Division Structure',
    composition: 'geographic-command',
    film: { camera: 'aerial' },
    content: (
      <Frame
        label="Decision-making closer to markets"
        title="Regions own P&L — Asia-Pacific, Europe, Americas, MEA"
        lead="Area divisions group countries into regions so decisions sit closer to customers, regulators and competitors. Local responsiveness and regional coordination rise; duplication of functions across regions is the classic risk."
        visual={<OrgGeographic />}
        takeaway="Geographic structure maximises local feel — manage duplication consciously."
      >
        <ManagerView>Can local responsiveness justify organizational complexity? Only if regional differences truly change offers, channels or regulation.</ManagerView>
        <ExamTip>Contrast Geographic vs International Division: early vs region-heavy internationalisation.</ExamTip>
      </Frame>
    ),
  },

  /* 25 — MATRIX ---------------------------------------------------------- */
  {
    id: 'structure-matrix',
    title: 'Matrix Division Structure',
    composition: 'matrix',
    film: { hero: true, heroTier: '2', camera: 'orbit' },
    content: (
      <Frame
        label="Dual reporting"
        title="Product × Geography — two bosses, one coordinated outcome"
        lead="A matrix combines dimensions — typically global product and geographic area. An Asia manager and a Global Product manager both influence the same business unit. Benefit: dual focus. Cost: complexity and conflict."
        visual={<OrgMatrix />}
        takeaway="Matrix = dual focus; use only when both product excellence and local adaptation are strategic."
      >
        <Think>Why use matrix? When is complexity worth it?</Think>
        <Case title="Tech platform firms">Global product platforms with country sales/compliance partners often behave like soft matrix systems.</Case>
        <ExamTip>Define dual reporting with a one-line example — do not only write “two bosses.”</ExamTip>
      </Frame>
    ),
  },

  /* 26 — MIXED ----------------------------------------------------------- */
  {
    id: 'structure-mixed',
    title: 'Mixed Structure',
    composition: 'hybrid',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Hybrid reality"
        title="Large MNCs rarely match a perfect textbook chart"
        lead="Mixed (hybrid) structures combine product, region and function according to strategic needs — for example global product platforms, regional commercial units and central finance/compliance."
        visual={<OrgMixed />}
        takeaway="Mixed structure = pragmatic combination of textbook forms."
      >
        <ManagerView>Design structure around where value is created and where risk must be controlled — not around the prettiest org chart.</ManagerView>
        <Insight>Ambition outgrows simple charts; hybrids are evidence of learning, not failure.</Insight>
      </Frame>
    ),
  },

  /* 27 — STRUCTURE COMPARISON -------------------------------------------- */
  {
    id: 'structure-compare',
    title: 'Structure Comparison — Exam Anchor',
    composition: 'structure-comparison',
    density: 'compact',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="Revision board"
        title="Basis, fit, strength and weakness at a glance"
        lead="Use this board to choose and explain structures. Dimensions: basis of grouping, best suited for, strength, weakness, global coordination, local responsiveness."
        visual={<StructureCompareVisual />}
        takeaway="Pick structure from strategy stage — not from fashion."
      >
        <ExamTip>10-mark structure answers: define → draw → advantage → limitation → when to use.</ExamTip>
      </Frame>
    ),
  },

  /* 28 — STRUCTURE CONFUSIONS -------------------------------------------- */
  {
    id: 'structure-confusion',
    title: 'Common Confusion — Structure Pairs',
    composition: 'confusion-board',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="Do not mix these"
        title="International Division ≠ Geographic; Product ≠ Matrix"
        lead="International Division keeps overseas work in one unit beside a domestic core. Geographic structure makes regions the primary P&L owners. Product structure owns categories globally. Matrix forces product and geography to share authority."
        visual={<StructureConfusionVisual />}
        takeaway="Count axes of authority before naming the structure."
      />
    ),
  },

  /* 29 — TECH TRANSFER MEANING ------------------------------------------- */
  {
    id: 'tt-meaning',
    title: 'Transfer of Technology — Meaning',
    composition: 'technology-bridge',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT definition"
        title="Technology transfer moves capability — not only machines"
        lead="Transfer of Technology is the process through which technologies, knowledge, skills, manufacturing techniques and facilities between government and other institutions are shared so that users who can develop and utilise existing technology can access new technological and scientific development — creating better processes, products, materials, services and applications."
        visual={<TechTransferMeaning />}
        takeaway="TT = knowledge + skills + techniques + facilities → new capability."
      >
        <Definition term="Transfer of Technology" keywords={['knowledge', 'skills', 'techniques', 'capability']}>
          Sharing of technologies, knowledge, skills, manufacturing techniques and related facilities so recipients can access and use scientific/technological development to create improved processes, products, materials, services or applications.
        </Definition>
        <ManagerView>How much technology should a firm transfer to a partner? Enough to enable the market — not so much that the core advantage walks away unprotected.</ManagerView>
      </Frame>
    ),
  },

  /* 30 — WHY TRANSFER ---------------------------------------------------- */
  {
    id: 'tt-reasons',
    title: 'Reasons for Transfer of Technology',
    composition: 'corridor',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="PPT reasons"
        title="Why owners move technology across borders"
        lead="PPT reasons: Profit from Selling Technology; Locations and Logistics advantage; Competitive Advantage; Government Policies; Market Saturation; Competitive Enhancement."
        visual={<TechTransferReasons />}
        takeaway="Transfer is strategic: profit, location, advantage, policy, saturation, enhancement."
      >
        <Flow steps={[
          { title: 'Technology owner', text: 'Holds advantage' },
          { title: 'Transfer', text: 'Chosen method' },
          { title: 'Recipient', text: 'Builds capability' },
          { title: 'New capability', text: 'Market outcome' },
        ]} />
      </Frame>
    ),
  },

  /* 31 — METHODS OVERVIEW ------------------------------------------------ */
  {
    id: 'tt-methods-overview',
    title: 'Methods of Technology Transfer — Overview',
    composition: 'technology-bridge',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT methods"
        title="Six mechanisms move technology — each with different control"
        lead="Foreign Direct Investment; Licensing; Franchising; Management Contracts or/and Turnkey Arrangement; Contract Manufacturing; Joint Venture."
        visual={<TechTransferMethodsOverview />}
        takeaway="Method choice = control × investment × speed × risk × knowledge depth."
      >
        <ExamTip>Never write only the six names — define each in one sentence.</ExamTip>
      </Frame>
    ),
  },

  /* 32 — METHODS SET A --------------------------------------------------- */
  {
    id: 'tt-methods-a',
    title: 'Methods — FDI, Licensing and Franchising',
    composition: 'transfer-route',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="High-control to rights-based"
        title="From owning the operation to selling the right to use"
        lead="FDI embeds technology inside owned/controlled affiliates. Licensing grants rights to use IP/technology for fees. Franchising transfers a fuller business model and brand system."
        visual={<TechMethodsA />}
        takeaway="FDI = deepest control; licensing = rights; franchising = business-system transfer."
      >
        <DidYouKnow>Common confusion: licensing ≠ franchising — franchising usually transfers a complete operating formula.</DidYouKnow>
        <Case title="Quick-service franchise">A franchise exports store design, recipes, training and brand standards — technology as an operating system.</Case>
      </Frame>
    ),
  },

  /* 33 — METHODS SET B --------------------------------------------------- */
  {
    id: 'tt-methods-b',
    title: 'Methods — Turnkey, Contract Manufacturing and Joint Venture',
    composition: 'capability-build',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="Projects, production partners and shared equity"
        title="Three more routes to move capability"
        lead="Management contracts and turnkey arrangements deliver know-how or a ready facility. Contract manufacturing uses partners to produce to specification. Joint ventures share equity and capability building."
        visual={<TechMethodsB />}
        takeaway="Turnkey delivers a plant; contract mfg delivers output; JV delivers shared capability."
      >
        <ManagerView>FDI vs Joint Venture: full control versus shared risk, shared learning and shared politics.</ManagerView>
      </Frame>
    ),
  },

  /* 34 — METHOD COMPARISON ----------------------------------------------- */
  {
    id: 'tt-method-compare',
    title: 'Technology-Transfer Methods — Comparison',
    composition: 'structure-comparison',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="MBA dimensions"
        title="Control, investment, speed, risk and knowledge depth"
        lead="Qualitative guide only — not numeric scores. FDI: high control, high investment. Licensing: faster, lower investment, shallower control. JV: shared control and learning. Turnkey: project speed. Contract manufacturing: speed to volume with partner risk."
        visual={<TechMethodCompare />}
        takeaway="Choose the method that matches how much advantage you must protect."
      >
        <ExamTip>Compare any two methods on control and knowledge transfer for short notes.</ExamTip>
      </Frame>
    ),
  },

  /* 35 — TT IMPORTANCE --------------------------------------------------- */
  {
    id: 'tt-importance',
    title: 'Importance of Technology Transfer',
    composition: 'quiet-executive',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="PPT importance"
        title="Transfer builds use, edge, R&D, capability and research"
        lead="Promotes Technological Use; Develops Competitive Edge; Encourages Research and Development; Enhances Capability and Innovation; Helps Researchers."
        visual={<TechImportanceLadder />}
        takeaway="TT importance = diffusion + edge + R&D + capability + research support."
      />
    ),
  },

  /* 36 — TT CASE --------------------------------------------------------- */
  {
    id: 'tt-case',
    title: 'Case — Technology Transfer in Practice',
    composition: 'corporate-case',
    film: { hero: true, heroTier: '2', wow: true, camera: 'pan' },
    content: (
      <MiniCase
        company="Auto JV pattern"
        sector="Automotive / manufacturing"
        headline="Joint venture as a capability bridge"
        situation="A host-country automaker needs modern powertrain and quality systems; a foreign MNC needs market access and local presence."
        moves={[
          'Form equity joint venture',
          'Transfer manufacturing techniques, quality systems and training',
          'Localise suppliers over time',
          'Build recipient engineering capability',
        ]}
        result="Host gains process capability; foreign firm gains market access — control and learning are shared."
        lesson="Method = JV; what moves = process + skills; result = mutual capability, not only machines."
        mode="visual-lead"
        canvas={<TechTransferJvCase />}
      />
    ),
  },

  /* 37 — COMPETITIVENESS INTRO ------------------------------------------- */
  {
    id: 'gc-intro',
    title: 'Global Competitiveness — Introduction',
    composition: 'competitiveness-arena',
    film: { camera: 'push' },
    content: (
      <Frame
        label="PPT · Global Competitiveness"
        title="Globalization intensifies competition — technology becomes central to trade"
        lead="The rise of globalization in international business has led to intense competition, because of which the high-technology sector has become a major part of foreign trade. Competitiveness is not only about being cheaper — it involves productivity, innovation, quality, technology, institutions and market capability."
        visual={<CompetitivenessArena />}
        takeaway="Competitiveness = ability to perform under global pressure — not price alone."
      >
        <ManagerView>What creates sustainable global competitiveness — a single cost edge, or a system of capabilities?</ManagerView>
      </Frame>
    ),
  },

  /* 38 — NEED FOR GC ----------------------------------------------------- */
  {
    id: 'gc-need',
    title: 'Need for Global Competitiveness',
    composition: 'quiet-executive',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="PPT need points"
        title="Five managerial reasons to take competitiveness seriously"
        lead="Evaluate the Capability of Countries; Renew and Regenerate; Provide New Viewpoint and Information Competitiveness; Facing International Competition; Re-Examination of Products, Customers, Markets, and Rivals."
        visual={<CompetitivenessNeed />}
        takeaway="Need = evaluate · renew · reframe · face rivals · re-examine the four lenses."
      >
        <ExamTip>Quote all five PPT need points in long answers.</ExamTip>
      </Frame>
    ),
  },

  /* 39 — PILLARS FOUNDATIONS --------------------------------------------- */
  {
    id: 'pillars-foundations',
    title: '12 Pillars — Foundations',
    composition: 'pillar-architecture',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="PPT indicators · group 1"
        title="Institutions, infrastructure, macro stability and education"
        lead="Teaching cluster only — all 12 pillars remain examinable. Foundations: Institutions; Infrastructure; Macroeconomic Stability; Health and Primary Education; Higher Education and Training."
        visual={<PillarsFoundationsVisual />}
        takeaway="Foundations make every later efficiency and innovation pillar possible."
      >
        <Update>These 12 pillars correspond to the older World Economic Forum Global Competitiveness Index teaching set used in the PPT. Keep as course content; do not present as a newly published current WEF release without verification.</Update>
      </Frame>
    ),
  },

  /* 40 — PILLARS EFFICIENCY ---------------------------------------------- */
  {
    id: 'pillars-efficiency',
    title: '12 Pillars — Market Efficiency',
    composition: 'executive-radar',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="PPT indicators · group 2"
        title="Goods, labour and financial market sophistication"
        lead="Market-efficiency cluster: Goods Market Efficiency; Labour Market Efficiency; Financial Market Sophistication. These pillars shape how quickly resources move to productive uses."
        visual={<PillarsEfficiencyVisual />}
        takeaway="Efficient markets convert foundations into productive allocation."
      />
    ),
  },

  /* 41 — PILLARS CAPABILITY ---------------------------------------------- */
  {
    id: 'pillars-capability',
    title: '12 Pillars — Capability and Innovation',
    composition: 'pillar-architecture',
    film: { hero: true, heroTier: '2', camera: 'rise' },
    content: (
      <Frame
        label="PPT indicators · group 3"
        title="Technology readiness, market size, sophistication and innovation"
        lead="Capability cluster: Technological Readiness; Market Size; Business Sophistication; Innovation. Together they describe how ready an economy is to absorb technology and create new value."
        visual={<PillarsArchitecture />}
        takeaway="All 12 pillars must be listed in full for indicator questions."
      >
        <ExamTip>Memorise all 12 names; grouping is only a recall device.</ExamTip>
      </Frame>
    ),
  },

  /* 42 — IMD CURRENT CONTEXT --------------------------------------------- */
  {
    id: 'imd-ranking',
    title: 'Competitiveness Rankings — PPT Note vs Current Context',
    composition: 'current-context',
    film: { camera: 'hold' },
    content: (
      <Frame
        label="Verified current context"
        title="IMD World Competitiveness Ranking is a separate framework from the 12 pillars"
        lead="The PPT cites India’s position in the IMD World Competitiveness Ranking. That ranking is not the same instrument as the older WEF-style 12-pillar teaching list. Keep them conceptually separate."
        visual={<ImdContextVisual />}
        takeaway="Teach 12 pillars as PPT content; cite IMD ranks only as verified current context."
      >
        <Update>Current context (IMD 2025): India 41/69 (−2 from 2024); Switzerland, Singapore, Hong Kong lead. Do not imply the 12 pillars are the IMD scorecard.</Update>
        <ExamTip>If asked for indicators, list the 12 pillars. If asked for a recent ranking snapshot, name IMD and year explicitly.</ExamTip>
      </Frame>
    ),
  },

  /* 43 — TECH OF GC ------------------------------------------------------ */
  {
    id: 'tech-gc',
    title: 'Technology of Global Competitiveness',
    composition: 'capability-build',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="PPT · Technology of Global competitiveness"
        title="Technology drives competitiveness through five channels"
        lead="Technology drives global competitiveness by fostering innovation, increasing productivity, reducing costs, and enabling access to new markets. PPT channels: Innovation; Adoption; Efficiency & Cost Reduction; Market Access; Productivity."
        visual={<TechCompetitivenessVisual />}
        takeaway="Innovation · Adoption · Efficiency · Market access · Productivity."
      >
        <Update>Supplementary relevance: AI, automation, cloud, analytics and advanced manufacturing intensify these channels — use as enrichment, not as a replacement for the PPT five.</Update>
      </Frame>
    ),
  },

  /* 44 — TECH NOT ENOUGH ------------------------------------------------- */
  {
    id: 'tech-not-enough',
    title: 'Insight — Technology Alone Is Not Competitiveness',
    composition: 'quiet-executive',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="MBA insight"
        title="Technology must combine with skills, process, strategy and infrastructure"
        lead="Buying tools does not create competitiveness. Advantage appears when technology meets skilled people, redesigned processes, coherent market strategy, capable management and supporting infrastructure."
        visual={<TechNotEnoughVisual />}
        takeaway="Technology × absorption capability = competitiveness."
      >
        <Insight>Technology transfer without absorption capacity becomes a cost; with absorption, it becomes advantage.</Insight>
        <ManagerView>What creates sustainable global competitiveness? A system — not a single gadget or slogan.</ManagerView>
      </Frame>
    ),
  },

  /* 45 — SYNTHESIS ------------------------------------------------------- */
  {
    id: 'synthesis',
    title: 'Ambition Synthesis — What Makes a Global Enterprise Successful?',
    composition: 'enterprise-synthesis',
    film: { hero: true, heroTier: '2', camera: 'aerial' },
    content: (
      <Frame
        label="Chapter synthesis"
        title="Resources + Structure + Technology + Management + Market capability"
        lead="MNC formation enables global expansion. Structure makes expansion controllable. Technology transfer builds capability. Competitiveness is the performance outcome under global pressure."
        visual={<AmbitionSynthesis />}
        takeaway="Going global creates reach. Building capability creates competitiveness."
      >
        <Think>You can buy market access. Can you buy competitiveness without capability?</Think>
        <Insight>Ambition without structure leaks. Structure without technology stagnates. Technology without management fails to compound.</Insight>
      </Frame>
    ),
  },

  /* 46 — EXAM PACK ------------------------------------------------------- */
  {
    id: 'exam-pack',
    title: 'Module 5 — Exam Pack & Revision',
    composition: 'exam-board',
    tone: 'ib-scene-graphite',
    film: { quiet: true, camera: 'hold' },
    content: (
      <ExamPack
        title="Ambition — Revision Board"
        definitions={[
          'MNC — coordinated cross-border ownership/control of business activities',
          'Technology transfer — sharing tech, knowledge, skills, techniques, facilities for new capability',
          'Global competitiveness — ability to perform under international competitive pressure',
          'Matrix structure — dual reporting (e.g., product × geography)',
          'International Division — domestic core + dedicated overseas unit',
        ]}
        tenMark={[
          'Nature of MNCs — list and explain all ten PPT characteristics',
          'Importance of MNCs — host vs home with full PPT points',
          'Disadvantages of MNCs — host and home challenges',
          'Organizational structures of MNCs — explain with diagrams and fit',
          'Transfer of technology — meaning, reasons, methods, importance',
          'Global competitiveness — need, 12 pillars, technology channels',
          'MNCs in India — liberalization story + examples + Indian MNC opportunities',
        ]}
        comparisons={[
          'Host-country vs Home-country benefits',
          'Host vs Home disadvantages',
          'International Division vs Geographic Structure',
          'Product Structure vs Matrix Structure',
          'Licensing vs Franchising',
          'FDI vs Joint Venture',
          '12 pillars (PPT/WEF-style teaching) vs IMD ranking (current snapshot)',
        ]}
        memory="Ambition path: Grow→Expand→Organize→Transfer→Compete. Nature=10. Growth factors=10. Host benefits=9 · Home=3. Host risks=6 · Home=3. Structures=6. TT reasons=6 · methods=6 · importance=5. Competitiveness need=5 · pillars=12 · tech channels=5."
      />
    ),
  },

  /* 47 — PAYOFF ---------------------------------------------------------- */
  {
    id: 'payoff',
    title: 'Module 5 — The Big Picture',
    composition: 'finale',
    tone: 'ib-scene-dark',
    film: { finale: true, hero: true, heroTier: '1', chapterPayoff: true, camera: 'aerial' },
    content: (
      <Frame
        label="Where we've been"
        title="Going global creates reach. Building capability creates competitiveness."
        lead="Opportunity showed possibilities beyond borders. Judgment evaluated markets. Insight explained trade and competition. Governance explained the rules. Ambition shows how the firm grows, organizes, transfers technology and competes globally."
        visual={<AmbitionPayoff />}
        takeaway="Ⅴ — AMBITION complete. Next seam: Ⅵ — COMMAND — running marketing, people, capital and production as one global machine."
      >
        <Insight>Reach without capability is temporary. Capability without reach is underused. Ambition joins them.</Insight>
        <DidYouKnow>Module 6 will shift from building the multinational to commanding its operating system — marketing, HR, finance and production.</DidYouKnow>
      </Frame>
    ),
  },
]

export const internationalBusinessModule5Slides = buildModule(5, module5, {
  opener: <AmbitionOpener module={5} />,
})

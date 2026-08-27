import {
  buildModule, Frame, Hook, MiniCase, ExamPack, Definition, Case, Explain,
  Insight, ExamTip, Update, ManagerView, RealWorld, Think, DidYouKnow,
} from './kit'
import {
  ClimateScanOpener,
  IbeDefinitionVisual,
  ImportanceScanCards,
  SixForcesEnvironment,
  ScanProcess,
  CountryRiskMap,
  PoliticalContext,
  PoliticalSystemsBoard,
  PoliticalDecisionRoom,
  LegalBodiesStack,
  LegalFactorsBoard,
  ComplianceCorridor,
  EconomicSides,
  IndicatorBoard,
  DevelopmentSplit,
  FxMicroStory,
  TechFeaturesOrbit,
  TechAcceleration,
  TechImpactFlow,
  CultureMeaningOrbit,
  CultureCanvas,
  LocalizationStory,
  EthicsDilemmaBoard,
  EthicsDecisionFlow,
  CsrToolsImpact,
  CsrDebateSplit,
  EsgBoard,
  TeslaJudgmentCanvas,
  UnileverCsrCanvas,
  JudgmentPayoff,
} from './scenes2'

/**
 * MODULE 2 — International Business Environment (V9 content · JUDGMENT cinema)
 * Chapter identity: Ⅱ — JUDGMENT
 * Content APPROVED — this pass wires signature visuals/compositions only.
 * Syllabus (22MBA401, IB - M2.pptx) coverage unchanged. Slide IDs unchanged.
 */
const module2 = [
  /* 01 — HOOK ------------------------------------------------------------- */
  {
    id: 'hook',
    labels: ['IBE', 'Political', 'Legal', 'Economic', 'Technology', 'Culture', 'Ethics', 'CSR'],
    title: 'Why Country Climate Decides Strategy',
    composition: 'quiet-scan',
    tone: 'ib-scene-editorial',
    film: { wow: true, camera: 'push' },
    content: (
      <Hook
        eyebrow="Module 2 · Judgment"
        question="Same product. Same brand. Why does it win in one country and fail in another?"
        sub="A smartphone launch that thrives in Singapore can stall in a market with import bans, weak payment rails, or cultural resistance. International Business Environment is the country climate that turns a good strategy into a workable one — or a costly mistake."
        visual={<CountryRiskMap showQuestion={false} />}
      />
    ),
  },

  /* 02 — MEANING & DEFINITION -------------------------------------------- */
  {
    id: 'meaning',
    title: 'Meaning of International Business Environment',
    composition: 'definition',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        mode="visual-lead"
        label="What it is"
        title="The external climate around a firm abroad"
        lead="The International Business Environment (IBE) is the sum of all external forces that work upon a firm as it operates in foreign markets. It is not inside the company — it is the world the company must adapt to."
        visual={<IbeDefinitionVisual />}
        takeaway="IBE = external forces in foreign markets that shape opportunity, risk, cost and operating design."
      >
        <Definition term="International Business Environment" keywords={['external forces', 'foreign markets', 'adaptation']}>
          The sum of all external forces — economic, political, legal, technological, socio-cultural and ecological — that influence a firm’s operations across borders.
        </Definition>
        <Explain items={[
          { k: 'What', v: 'A complex interplay of country conditions that shape how businesses function on a global scale.' },
          { k: 'Why it matters', v: 'Understanding and adapting to IBE is the difference between profitable entry and expensive withdrawal.' },
          { k: 'How managers use it', v: 'Through country screening, risk scoring, compliance design and localization of product, price and people.' },
          { k: 'Business importance', v: 'Strategy that ignores country climate is strategy written for a fictional market.' },
        ]} />
        <ExamTip>Open any IBE answer with the “sum of external forces” definition, then name the component framework.</ExamTip>
      </Frame>
    ),
  },

  /* 03 — IMPORTANCE ------------------------------------------------------ */
  {
    id: 'importance',
    title: 'Importance of International Business Environment',
    composition: 'intelligence',
    tone: 'ib-scene-emerald',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="Why scan first"
        title="Environmental scanning protects capital before it is committed"
        lead="Firms study IBE because international markets are more dependent on trade conditions, more exposed to global shocks, and more complex than domestic ones — and because anticipating change is cheaper than reacting to it."
        visual={<ImportanceScanCards />}
        takeaway="Importance of IBE = dependence + spillover + complexity + anticipation — use this four-point frame in exams."
      >
        <ManagerView>Before approving FDI or a major export push, ask: which external force can kill this plan in the next 24 months — and what is our response if it does?</ManagerView>
        <Insight>Modern scans also include digital infrastructure, data-protection law, ESG expectations and cyber risk — not only tariffs and GDP.</Insight>
      </Frame>
    ),
  },

  /* 04 — COMPONENTS OVERVIEW -------------------------------------------- */
  {
    id: 'components',
    title: 'Components of International Business Environment',
    composition: 'boardroom',
    tone: 'ib-scene-graphite',
    film: { hero: true, heroTier: '2', camera: 'orbit' },
    content: (
      <Frame
        mode="visual-lead"
        label="The six forces"
        title="Six external forces surround every cross-border decision"
        lead="IBE is best remembered as a force field around the firm. Political power, legal rules, economic capacity, technology readiness, socio-cultural norms and ecological limits each change what a manager can sell, where, and at what risk."
        visual={<SixForcesEnvironment />}
        takeaway="Memorise P-L-E-T-S-E: Political, Legal, Economic, Technological, Socio-cultural, Ecological."
      >
        <DidYouKnow>VTU PPT Figure 3.1 lists these six elements — Ecological is part of the scanning model even when ethics/CSR get separate syllabus headings.</DidYouKnow>
        <ExamTip>For a 10-mark “components” question, define IBE in one line, name all six, and give one business implication for each.</ExamTip>
      </Frame>
    ),
  },

  /* 05 — SCANNING LOGIC ------------------------------------------------- */
  {
    id: 'scanning',
    title: 'How Managers Scan International Markets',
    composition: 'corridor',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="Decision tool"
        title="IBE is a process, not a chapter to memorize"
        lead="Environmental scanning turns country noise into a decision: enter, wait, adapt, partner — or walk away. The sequence is identify forces → estimate impact → redesign strategy → monitor change."
        visual={<ScanProcess />}
        takeaway="IBE is not theory for its own sake — it is the operating system of country selection."
      >
        <Think>If India raises data-localization rules tomorrow, which of your four scanning steps fails first — identification, impact estimate, adaptation, or monitoring?</Think>
        <RealWorld>Amazon’s India model, Tesla’s factory location choices and Apple’s China+1 shift all began as environment scans — not branding exercises.</RealWorld>
      </Frame>
    ),
  },

  /* 06 — POLITICAL: MEANING --------------------------------------------- */
  {
    id: 'political-meaning',
    title: 'Political Environment — Meaning',
    composition: 'editorial',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Power layer"
        title="Government action becomes a daily business condition"
        lead="The political environment is the set of government activities and actions that influence a company’s day-to-day operations. In international business, politics is not background news — it is a pricing, sourcing and ownership variable."
        visual={<PoliticalContext />}
        takeaway="Political environment = government activities/actions that shape daily business operations."
      >
        <Definition term="Political Environment" keywords={['government', 'policy', 'stability', 'foreign firms']}>
          Government activities and actions that influence the daily business operations of a company — especially systems of power, ideology, stability and policy toward international marketing.
        </Definition>
        <ManagerView>Treat politics as power over cash flows: who can raise your costs, block your entry, or seize your assets?</ManagerView>
      </Frame>
    ),
  },

  /* 07 — POLITICAL SYSTEMS ---------------------------------------------- */
  {
    id: 'political-systems',
    title: 'Political Systems and Economic Ideologies',
    composition: 'split',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="How power is organised"
        title="Political systems shape what foreign firms are allowed to do"
        lead="A political system is the system of government and politics in a country. Managers classify systems by institutional form, party structure and economic ideology — because each pattern changes negotiation style, regulation and ownership rules."
        visual={<PoliticalSystemsBoard />}
        takeaway="Classify political systems by form + parties + economic ideology — then link each to business freedom."
      >
        <ExamTip>VTU answers often expect both bases: political-system basis (parliamentary/absolutist; party types) and economic-system basis (communist / socialist / capitalist).</ExamTip>
        <Insight>Even within capitalism, industrial policy and FDI screening can be highly interventionist — ideology labels are a start, not the full risk map.</Insight>
      </Frame>
    ),
  },

  /* 08 — POLITICAL STABILITY & POLICY ----------------------------------- */
  {
    id: 'political-stability',
    title: 'Political Stability and Government Policy',
    composition: 'risk-map',
    tone: 'ib-scene-graphite',
    film: { camera: 'push' },
    content: (
      <Frame
        mode="visual-lead"
        label="Risk dashboard"
        title="Stability and policy direction decide investment appetite"
        lead="Foreign firms look beyond slogans to political ideology, stability, relations with other countries, defence priorities, opposition attitudes, international marketing policy, and controls/restrictions on business."
        visual={<CountryRiskMap showQuestion={false} />}
        takeaway="Influence list for exams: ideology, stability, foreign relations, defence policy, opposition views, marketing policy, controls."
      >
        <Case title="FDI policy as strategy">India’s phased opening of retail, insurance and defence manufacturing shows how policy design can invite capital in some sectors while fencing others — managers must read the FDI circular, not the headline.</Case>
        <Update>Geopolitical risk — US–China tech rivalry, Red Sea shipping disruption, sanctions regimes — is now a board-level political-environment item for global firms.</Update>
      </Frame>
    ),
  },

  /* 09 — POLITICAL IMPACT + EXAMPLE ------------------------------------- */
  {
    id: 'political-impact',
    title: 'Impact of Political Environment on International Business',
    composition: 'decision',
    film: { hero: true, heroTier: '2', camera: 'aerial' },
    content: (
      <Frame
        mode="dashboard"
        label="From politics to P&L"
        title="Political risk shows up as cost, delay and stranded capital"
        lead="Political decisions change tariffs, market access, supply-chain routes and the safety of long-term assets. The managerial job is to translate politics into scenarios — base, adverse and exit."
        visual={<PoliticalDecisionRoom />}
        takeaway="Political impact channels: trade restrictions, FDI rules, sanctions, nationalisation risk and geopolitics."
      >
        <RealWorld>Apple and other electronics firms expanded assembly in India and Vietnam partly to reduce concentration risk linked to geopolitical tension around China — a classic political-environment hedge.</RealWorld>
        <ManagerView>Build a political-risk playbook: local partner quality, insurance, staged investment, dual sourcing and a pre-agreed exit trigger.</ManagerView>
        <ExamTip>Pair every political concept with one example: FDI policy, tariff shock, sanction, or regime instability.</ExamTip>
      </Frame>
    ),
  },

  /* 10 — LEGAL: MEANING & THREE BODIES ---------------------------------- */
  {
    id: 'legal-meaning',
    title: 'Legal Environment — Meaning and Three Bodies of Law',
    composition: 'compliance',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Rules layer"
        title="Law is the enforceable shape of the political environment"
        lead="The legal environment comprises the policies, laws and regulations formulated for conducting business. Global marketing is shaped by three overlapping bodies of law — international, host-country and home-country."
        visual={<LegalBodiesStack />}
        takeaway="Legal environment = government policies, laws and regulations for business; remember International + Host + Home."
      >
        <Definition term="Legal Environment" keywords={['policies', 'laws', 'regulations', 'compliance']}>
          The policies, laws and regulations that govern how business operations may be conducted — domestically and across borders.
        </Definition>
        <ManagerView>Never ask only “Is it legal in the host country?” Ask also “Does home-country law still bind us?” — many MNC fines start at home.</ManagerView>
      </Frame>
    ),
  },

  /* 11 — LEGAL FACTORS -------------------------------------------------- */
  {
    id: 'legal-factors',
    title: 'Legal Factors Affecting International Business',
    composition: 'framework',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="Compliance map"
        title="Contracts, IP, liability and integrity decide operating design"
        lead="Beyond the three bodies of law, managers confront practical legal factors: bribery risk, branch vs subsidiary choice, counterfeiting, strategic legal exposure and grey markets — plus IPR, product liability, advertising rules and contract enforcement."
        visual={<LegalFactorsBoard />}
        takeaway="Legal factors checklist: bribery, entity form, counterfeiting, strategy, grey market, IP, liability, competition, contracts."
      >
        <ExamTip>Influence list from the PPT: deregulation, globalization, environment, IP, product liability, competition, bribes, advertising, contracts.</ExamTip>
        <Case title="Data privacy & product safety">Launching a connected device abroad means GDPR-style privacy rules, local product-safety certification and clear liability for software failures — legal design before marketing launch.</Case>
      </Frame>
    ),
  },

  /* 12 — LEGAL IMPACT + EXAMPLE ----------------------------------------- */
  {
    id: 'legal-impact',
    title: 'Impact of Legal Environment — Compliance in Practice',
    composition: 'corridor',
    tone: 'ib-scene-emerald',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="Legal compliance flow"
        title="Compliance is a sequence: map → design → train → audit"
        lead="Legal risk is managed as a flow: identify applicable laws, design the entity and contracts, train people on integrity and product claims, then audit continuously as rules change."
        visual={<ComplianceCorridor />}
        takeaway="Legal impact is not a list of Acts — it is an operating system of compliance."
      >
        <RealWorld>Google, Meta and other platforms face continuous host-country pressure on content, competition and data — proving that digital scale does not reduce legal exposure; it multiplies it.</RealWorld>
        <Update>Data localization, AI regulation and ESG disclosure rules are expanding the legal environment faster than many textbooks update.</Update>
      </Frame>
    ),
  },

  /* 13 — ECONOMIC: MEANING ---------------------------------------------- */
  {
    id: 'economic-meaning',
    title: 'Economic Environment — Meaning',
    composition: 'editorial',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Market capacity"
        title="Economy decides whether demand can be served profitably"
        lead="The economic environment covers economic factors that largely influence a global firm in any country — the production process and the wealth-distribution system that shape purchasing power, cost structures and growth prospects."
        visual={<EconomicSides />}
        takeaway="Economic environment = economic factors influencing global business via production and wealth distribution."
      >
        <Definition term="Economic Environment" keywords={['income', 'inflation', 'exchange rates', 'trade']}>
          Economic factors — income, inflation, taxes, exchange rates, capital formation, resources and foreign trade — that shape how a firm can operate and grow in a country.
        </Definition>
        <ManagerView>Read an economy as a dashboard: Can customers afford us? Can we price for inflation? Can we repatriate profit without FX shock?</ManagerView>
      </Frame>
    ),
  },

  /* 14 — ECONOMIC INDICATORS -------------------------------------------- */
  {
    id: 'economic-indicators',
    title: 'Economic Indicators Managers Must Track',
    composition: 'indicator',
    tone: 'ib-scene-graphite',
    film: { camera: 'push' },
    content: (
      <Frame
        mode="dashboard"
        label="Indicator board"
        title="Income, inflation, FX and trade conditions rewrite the plan"
        lead="Country screening starts with measurable signals: GDP and growth, per-capita and disposable income, inflation, taxes, exchange rates, current-account health and the composition of the economy."
        visual={<IndicatorBoard />}
        takeaway="Core signals: income · inflation · FX · taxes · trade · market size/composition."
      >
        <Case title="Currency risk">An Indian IT exporter invoicing in dollars can see rupee revenue swing sharply when the dollar moves — hedging is an economic-environment response, not a finance hobby.</Case>
        <RealWorld>Emerging markets attract MNCs with growth (Unilever, Nestlé, Starbucks) but demand patience for inflation spikes, FX volatility and uneven infrastructure.</RealWorld>
      </Frame>
    ),
  },

  /* 15 — ECONOMIC DEVELOPMENT FACTORS ----------------------------------- */
  {
    id: 'economic-development',
    title: 'Determinants of Economic Development',
    composition: 'split',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="Why countries grow differently"
        title="Development is driven by economic and non-economic factors"
        lead="Managers assessing long-term markets look at what makes an economy develop — capital, resources and trade on one side; people, education, institutions and social will on the other."
        visual={<DevelopmentSplit />}
        takeaway="Split determinants into economic vs non-economic — a favourite VTU structure."
      >
        <ExamTip>List both blocks completely. Non-economic factors (especially education, corruption and desire to develop) often separate average answers from high-scoring ones.</ExamTip>
        <Insight>Corruption is both an ethical issue and an economic-development drag — it raises the cost of doing business and deters quality FDI.</Insight>
      </Frame>
    ),
  },

  /* 16 — ECONOMIC IMPACT ------------------------------------------------ */
  {
    id: 'economic-impact',
    title: 'Impact of Economic Environment on International Business',
    composition: 'intelligence',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="Three change channels"
        title="Income, spending patterns and economic conditions reshape demand"
        lead="The PPT frames economic influence through changing income, changing consumer spending patterns and changing economic conditions — boom, slowdown and recession each rewrite category priorities."
        visual={<FxMicroStory />}
        takeaway="Economic impact = income change + spending-pattern change + condition change."
      >
        <Think>In a recession abroad, do you cut price, cut SKUs, pause expansion, or lean into value brands — and which economic signal triggered that choice?</Think>
        <Update>Post-pandemic inflation, rate cycles and emerging-market FX stress have made “economic condition scenarios” mandatory in board investment memos.</Update>
      </Frame>
    ),
  },

  /* 17 — TECHNOLOGICAL: MEANING ----------------------------------------- */
  {
    id: 'tech-meaning',
    title: 'Technological Environment — Meaning and Features',
    composition: 'quiet',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Capability layer"
        title="Technology is applied knowledge that rewrites competition"
        lead="Technology is the systematic application of scientific or other organized knowledge to practical tasks. In IB, the technological environment covers a country’s tech stage, rate of change, R&D infrastructure, orientation, import/absorption of technology and obsolescence risk."
        visual={<TechFeaturesOrbit />}
        takeaway="Technology = systematic application of organized knowledge to practical tasks — scan stage, speed, R&D and absorption."
      >
        <Definition term="Technological Environment" keywords={['R&D', 'infrastructure', 'digital', 'absorption']}>
          The external technological conditions — infrastructure, innovation capacity, digital readiness and rate of change — that affect how firms produce, distribute and compete internationally.
        </Definition>
        <ManagerView>Ask two questions: Can this market run our model (payments, logistics, connectivity)? And can local partners absorb our technology without leaking IP?</ManagerView>
      </Frame>
    ),
  },

  /* 18 — DIGITAL TRANSFORMATION ----------------------------------------- */
  {
    id: 'tech-digital',
    title: 'Digital Transformation in International Business',
    composition: 'world-canvas',
    tone: 'ib-scene-emerald',
    film: { hero: true, heroTier: '2', camera: 'orbit' },
    content: (
      <Frame
        mode="visual-lead"
        label="Modern tech stack"
        title="AI, automation, e-commerce and logistics tech redraw borders"
        lead="Digital transformation has made technology readiness central to global competitiveness. Firms that master AI, automation, platform commerce and smart logistics can serve markets faster — and with leaner physical footprints."
        visual={<TechAcceleration />}
        takeaway="Digital readiness is now a country-screening criterion equal to tariffs and GDP."
      >
        <RealWorld>Infosys and Tata consultancies sell digital transformation globally; Amazon and Reliance build tech-enabled retail ecosystems; Tesla pairs product tech with factory automation across geographies.</RealWorld>
        <Update>Industry 4.0, UPI-style payments, cyber risk and AI regulation are part of today’s technological environment — not optional footnotes.</Update>
      </Frame>
    ),
  },

  /* 19 — TECH IMPACT ---------------------------------------------------- */
  {
    id: 'tech-impact',
    title: 'Impact of Technology on Global Competitiveness',
    composition: 'corridor',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="Competitiveness"
        title="Technology changes cost, speed, reach and imitation risk"
        lead="Technology can create advantage — and erase it. Faster product cycles, digital distribution and global platforms raise reach, but also raise the speed at which rivals copy, undercut or leapfrog."
        visual={<TechImpactFlow />}
        takeaway="Tech impact = cost ↓ · reach ↑ · cycle time ↓ · new risks ↑."
      >
        <Case title="Toyota and continuous improvement">Toyota’s global competitiveness rests as much on process technology and learning systems as on products — proof that “technology” includes operating methods, not only gadgets.</Case>
        <ExamTip>Connect technology answers to competitiveness: productivity, quality, speed-to-market and digital access.</ExamTip>
      </Frame>
    ),
  },

  /* 20 — SOCIO-CULTURAL: MEANING ---------------------------------------- */
  {
    id: 'culture-meaning',
    title: 'Socio-Cultural Environment — Meaning',
    composition: 'editorial',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Human context"
        title="Culture decides whether a strategy feels natural"
        lead="The socio-cultural environment is the human context of business abroad — how people use time, think, relate to family, speak, worship, compete, behave socially and view outsiders. Ignoring it is the fastest path to brand rejection."
        visual={<CultureMeaningOrbit />}
        takeaway="Culture = shared ways of thinking and living that shape demand, work and negotiation."
      >
        <Definition term="Socio-Cultural Environment" keywords={['language', 'religion', 'values', 'demographics']}>
          The social and cultural forces — language, religion, values, beliefs, demographics, literacy and behaviour — that influence how people consume, work and do business.
        </Definition>
        <DidYouKnow>PPT factors of cultural difference also include ethnocentrism, flexibility/sincerity and intercultural socialization — useful depth points in long answers.</DidYouKnow>
      </Frame>
    ),
  },

  /* 21 — CULTURE IMPORTANCE DIMENSIONS ---------------------------------- */
  {
    id: 'culture-dimensions',
    title: 'Language, Religion, Values and Demographics',
    composition: 'culture-canvas',
    film: { camera: 'pan' },
    content: (
      <Frame
        mode="visual-lead"
        label="What to localize"
        title="Culture shows up in taste, work attitude and buying behaviour"
        lead="Managers translate culture into operating levers: national taste, language, values and beliefs, demography, literacy, female workforce participation, dual-income households and impulse buying."
        visual={<CultureCanvas />}
        takeaway="Importance list: taste, language, values, demography, literacy, female workforce, dual income, impulse buying."
      >
        <ManagerView>Localization is not translation. It is redesigning the offer so local customers feel it was made for them — without breaking global brand standards.</ManagerView>
        <ExamTip>Influence answers: culture determines goods/services, attitude to work, global business style, competitive advantage and strategy.</ExamTip>
      </Frame>
    ),
  },

  /* 22 — CULTURAL ADAPTATION CASE --------------------------------------- */
  {
    id: 'culture-adaptation',
    title: 'Cultural Adaptation in Practice',
    composition: 'case',
    tone: 'ib-scene-editorial',
    film: { wow: true, camera: 'orbit' },
    content: (
      <MiniCase
        company="McDonald’s · Starbucks · Netflix"
        sector="Consumer & media"
        headline="Global brands win locally by redesigning the experience"
        situation="A standardized global formula collides with local taste, religion, language and viewing habits. The winners keep the brand core and redesign the edges."
        moves={[
          'McDonald’s India: menu adaptation (McAloo Tikki; no beef/pork) and local franchise partners',
          'Starbucks: store design, beverage mix and ritual adapted to local coffee/tea cultures',
          'Netflix: local-language originals, regional pricing tiers and content that respects cultural norms',
          'IKEA: assortment and store formats adjusted to housing size, family patterns and price sensitivity',
        ]}
        result="Scale with legitimacy — customers experience a global brand that still feels culturally fluent."
        lesson="Cultural adaptation is a competitive advantage: it lowers rejection risk and raises willingness to pay for relevance."
        canvas={<LocalizationStory />}
      />
    ),
  },

  /* 23 — ETHICS: MEANING & ISSUES --------------------------------------- */
  {
    id: 'ethics-meaning',
    title: 'Ethics in International Business — Meaning and Issues',
    composition: 'dilemma',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Trust layer"
        title="Ethics begins where the law ends — and sometimes before it"
        lead="Business ethics studies complex practices and behaviours that raise moral issues in organizations. Across borders, ethical grey zones multiply because legal standards, enforcement and social expectations differ."
        visual={<EthicsDilemmaBoard />}
        takeaway="Six exam issues: export subsidies, bio-piracy, safety/environment, corruption, consumerism, transfer pricing."
      >
        <Definition term="Business Ethics" keywords={['moral issues', 'practices', 'decision making']}>
          The study of complex business practices and behaviours that give rise to ethical issues in organizations — especially acute in cross-border settings.
        </Definition>
        <Think>If a practice is legal in the host country but would scandalize home-country customers, should the firm do it? What decision rule would you use?</Think>
      </Frame>
    ),
  },

  /* 24 — ETHICS IMPORTANCE ---------------------------------------------- */
  {
    id: 'ethics-importance',
    title: 'Importance of Ethics and Ethical Decision Making',
    composition: 'split',
    tone: 'ib-scene-graphite',
    film: { camera: 'push' },
    content: (
      <Frame
        label="Why ethics pays"
        title="Ethics is a governance system, not a slogan"
        lead="Ethics matters because law cannot cover every situation, cooperation depends on trust, and long-run profit rides on reputation. Ethical decision making gives managers a repeatable way to choose under pressure."
        visual={<EthicsDecisionFlow />}
        takeaway="Importance of ethics: human needs · profit · beyond law · better decisions · cooperation · moral values."
      >
        <ManagerView>Write the decision as if it will appear on the front page of a home-country and host-country newspaper tomorrow. If you cannot defend it in both, do not do it.</ManagerView>
        <ExamTip>For “importance of ethics,” use the six PPT points in order — examiners recognise the structure.</ExamTip>
      </Frame>
    ),
  },

  /* 25 — CSR: MEANING & TOOLS ------------------------------------------- */
  {
    id: 'csr-meaning',
    title: 'CSR in International Business — Meaning and Tools',
    composition: 'impact',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        label="Responsibility layer"
        title="CSR is how firms earn a social licence to operate abroad"
        lead="Corporate Social Responsibility is the idea that business — national and international — has duties beyond profit to society and stakeholders. For MNCs, CSR tools make that duty measurable and reportable."
        visual={<CsrToolsImpact />}
        takeaway="CSR tools: accountability, codes of conduct, fair trade, social accountability, SRI, global reporting."
      >
        <Definition term="Corporate Social Responsibility" keywords={['stakeholders', 'society', 'beyond profit']}>
          The responsibility of business toward society and stakeholders — going beyond legal compliance to create social, environmental and ethical value.
        </Definition>
        <Insight>In MNCs, CSR is harder because standards must hold across suppliers in many countries — the weakest link becomes the brand’s risk.</Insight>
      </Frame>
    ),
  },

  /* 26 — CSR ARGUMENTS FOR ---------------------------------------------- */
  {
    id: 'csr-for',
    title: 'Arguments for CSR in MNCs',
    composition: 'framework',
    tone: 'ib-scene-emerald',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="The case for"
        title="Society expects power to travel with responsibility"
        lead="Supporters argue that public expectations have changed, CSR improves the business climate and public image, helps avoid heavier regulation, balances power with duty, and uses business resources for prevention rather than cure."
        visual={<CsrDebateSplit side="for" items={[
          { title: 'Public expectation', text: 'Citizens expect MNCs to act as responsible global citizens.' },
          { title: 'Better business climate', text: 'Stable communities and trust lower long-run operating friction.' },
          { title: 'Image & legitimacy', text: 'Reputation protects market access and talent attraction.' },
          { title: 'Avoid over-regulation', text: 'Self-discipline can reduce the need for heavier state controls.' },
          { title: 'Power with duty', text: 'Large firms have resources — and gratitude obligations to host societies.' },
          { title: 'Prevention logic', text: 'Fixing social/environmental harm early is cheaper than crisis response.' },
        ]} />}
        takeaway="For CSR: expectation · climate · image · regulation · power-duty · resources · citizenship · gratitude · prevention."
      >
        <RealWorld>Unilever’s sustainable living brands, Nestlé’s supplier programmes and Tata’s long social tradition are often cited as strategic CSR — reputation and resilience, not charity alone.</RealWorld>
        <ExamTip>In a 10-mark “arguments for CSR” answer, list 8–10 points with one line of explanation each.</ExamTip>
      </Frame>
    ),
  },

  /* 27 — CSR ARGUMENTS AGAINST ------------------------------------------ */
  {
    id: 'csr-against',
    title: 'Arguments Against CSR in MNCs',
    composition: 'split',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="The case against"
        title="Critics ask who pays — and who holds managers accountable"
        lead="Opponents argue that the firm’s job is profit maximization, that society ultimately pays CSR costs, that managers lack social skills/mandate, that business already has enough power, and that accountability and broad support are weak."
        visual={<CsrDebateSplit side="against" items={[
          { title: 'Core objections', text: 'Profit maximization duty; society bears the cost; lack of social skills; business already powerful.' },
          { title: 'Practical concerns', text: 'Social overhead cost, weak accountability for CSR spend, and lack of broad stakeholder support.' },
        ]} />}
        takeaway="Against CSR: profit focus · cost to society · skill gap · excess power · overhead · accountability · support gap."
      >
        <ManagerView>Balanced exam answers — and balanced board debates — present both sides, then take a reasoned position tied to long-term enterprise value and host-country legitimacy.</ManagerView>
        <Insight>The modern resolution is not “CSR or profit” but “which social investments protect the firm’s licence to operate and which are window dressing.”</Insight>
      </Frame>
    ),
  },

  /* 28 — ESG & CURRENT CSR ---------------------------------------------- */
  {
    id: 'csr-esg',
    title: 'ESG, Sustainability and Modern CSR',
    composition: 'world-canvas',
    film: { camera: 'aerial' },
    content: (
      <Frame
        mode="dashboard"
        label="Current relevance"
        title="CSR has matured into ESG and sustainability strategy"
        lead="Investors, regulators and customers now score firms on Environmental, Social and Governance performance. Climate risk, green supply chains and human-rights due diligence have made CSR a capital-markets and procurement issue."
        visual={<EsgBoard />}
        takeaway="Modern CSR language: ESG, sustainability, climate risk, human-rights diligence, transparent reporting."
      >
        <Update>EU sustainability reporting, Scope-3 emissions pressure and investor ESG screens mean MNCs must measure impact — not only announce initiatives.</Update>
        <Case title="IKEA & Unilever">IKEA’s sustainable materials push and Unilever’s brand-level sustainability targets show CSR moving into product design and supplier contracts — where cost and impact actually live.</Case>
      </Frame>
    ),
  },

  /* 29 — MINI CASE: POLITICAL-LEGAL ------------------------------------- */
  {
    id: 'case-tesla',
    title: 'Business Case — Tesla and Country Climate',
    composition: 'decision',
    film: { hero: true, heroTier: '2', wow: true, camera: 'orbit' },
    content: (
      <MiniCase
        company="Tesla"
        sector="EV / manufacturing"
        headline="Factory location is an environment decision, not only an engineering one"
        situation="Tesla needed scale manufacturing close to demand, talent, incentives and supply chains — while navigating industrial policy, trade tensions and local regulation."
        moves={[
          'Chose Gigafactory sites using incentives, energy policy and market access',
          'Adapted to local labour rules, content expectations and permitting regimes',
          'Managed geopolitical and supply-chain risk in batteries and critical minerals',
          'Used technology (automation) to offset cost and quality variance across countries',
        ]}
        result="A global manufacturing footprint shaped as much by political-economic climate as by vehicle design."
        lesson="Site selection is IBE in action: politics, law, economics and technology must fit together before capital is poured."
        canvas={<TeslaJudgmentCanvas moves={[
          'Chose Gigafactory sites using incentives, energy policy and market access',
          'Adapted to local labour rules, content expectations and permitting regimes',
          'Managed geopolitical and supply-chain risk in batteries and critical minerals',
          'Used technology (automation) to offset cost and quality variance across countries',
        ]} />}
      />
    ),
  },

  /* 30 — MINI CASE: ETHICS / CSR ---------------------------------------- */
  {
    id: 'case-unilever',
    title: 'Business Case — Unilever’s Social Licence',
    composition: 'case',
    tone: 'ib-scene-editorial',
    film: { camera: 'pan' },
    content: (
      <MiniCase
        company="Unilever"
        sector="FMCG / MNC"
        headline="How an MNC turns CSR into market access and brand trust"
        situation="Operating across emerging and developed markets, Unilever faces scrutiny on plastics, livelihoods, palm oil and advertising ethics — issues that can block shelves or funding if ignored."
        moves={[
          'Embedded sustainability goals into brand and supplier programmes',
          'Used codes of conduct and global reporting for accountability',
          'Localized products while keeping global integrity standards',
          'Engaged stakeholders early to reduce regulatory and activist risk',
        ]}
        result="CSR became part of competitiveness — protecting reputation while shaping product and sourcing choices."
        lesson="In international business, ethics and CSR are risk management and brand strategy — not optional extras after profit."
        canvas={<UnileverCsrCanvas moves={[
          'Embedded sustainability goals into brand and supplier programmes',
          'Used codes of conduct and global reporting for accountability',
          'Localized products while keeping global integrity standards',
          'Engaged stakeholders early to reduce regulatory and activist risk',
        ]} />}
      />
    ),
  },

  /* 31 — EXAM PACK ------------------------------------------------------ */
  {
    id: 'exam-pack',
    title: 'Module 2 — Exam Pack & Revision',
    composition: 'summary',
    tone: 'ib-scene-graphite',
    film: { camera: 'hold' },
    content: (
      <ExamPack
        title="Module 2 — Exam Pack"
        definitions={[
          { term: 'IBE', text: 'Sum of external forces working on a firm in foreign markets.' },
          { term: 'Political environment', text: 'Government activities/actions influencing daily business operations.' },
          { term: 'Legal environment', text: 'Policies, laws and regulations governing business — international, host and home.' },
          { term: 'CSR', text: 'Business responsibility toward society and stakeholders beyond pure profit.' },
        ]}
        tenMark={[
          'Explain the meaning and components of International Business Environment.',
          'Discuss the political environment and its influence on international business.',
          'Explain the legal environment affecting global marketing.',
          'Discuss the economic and technological environments of IB.',
          'Explain socio-cultural factors and their impact on international business.',
          'Discuss ethics in international business and the importance of ethical behaviour.',
          'Explain CSR in MNCs — tools, arguments for and against.',
        ]}
        comparisons={[
          'Political vs Legal environment',
          'Home-country law vs Host-country law',
          'Arguments for vs against CSR',
          'Economic vs Socio-cultural environment',
        ]}
        memory="Scan order: Meaning → Importance → Components (P-L-E-T-S-E) → each environment deep → Ethics issues → CSR tools + for/against + ESG."
      />
    ),
  },

  /* 32 — MODULE PAYOFF -------------------------------------------------- */
  {
    id: 'payoff',
    title: 'Module 2 — The Big Picture',
    composition: 'finale',
    tone: 'ib-scene-dark',
    film: { finale: true, hero: true, heroTier: '1', chapterPayoff: true, callback: true, camera: 'aerial' },
    content: (
      <Frame
        mode="visual-lead"
        label="Where we’ve been"
        title="Judgment is reading the country before you commit the firm"
        lead="Module 2 turned the world into a readable climate: political power, legal rules, economic capacity, technology readiness, cultural fluency, ethics and CSR. Strategy that survives contact with reality begins here."
        visual={<JudgmentPayoff />}
        takeaway="Next: Module 3 explains why nations trade — the theories that justify the patterns you now know how to scan."
      >
        <Insight>Opportunity without judgment is gambling. Module 2 is the discipline that turns global ambition into informed commitment.</Insight>
      </Frame>
    ),
  },
]

export const internationalBusinessModule2Slides = buildModule(2, module2, {
  opener: <ClimateScanOpener module={2} />,
})

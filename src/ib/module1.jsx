import { BadgeCheck, Compass, Landmark, Ship, TrendingUp } from 'lucide-react'
import {
  buildModule, Frame, Hook, Cards, Orbit, Compare, Timeline, Explain,
  EntryLadder, MiniCase, ExamPack, Definition, Case,
  Insight, ExamTip, Update, ManagerView, RealWorld, Think, DidYouKnow, WorldMap,
} from './kit'
import {
  WorldOpensScene, GlobalizationNetwork, InternationalizationMap,
  EntryPathway, ForceField, SpiceRouteMini, BorderCrossing,
} from './scenes'

/**
 * MODULE 1 — Introduction to International Business (V9.0, MBA depth)
 * Syllabus (22MBA401, IB-M-1.pptx): Evolution, Meaning, Importance, Nature &
 * Scope, Characteristics, Factors affecting IB, Changing scenario, Advantages,
 * Challenges, Modes of entry, Internationalization Process.
 * Every concept: definition → explanation → business perspective → modern
 * example → current relevance → exam framing, split one-concept-per-slide.
 */
const module1 = [
  /* 01 — HOOK ------------------------------------------------------------- */
  {
    id: 'hook',
    labels: ['Evolution', 'Meaning', 'Scope', 'Entry modes', 'Factors', 'Internationalization'],
    title: 'Why International Business Starts With a Question',
    composition: 'quiet',
    tone: 'ib-scene-editorial',
    film: { wow: true, camera: 'push' },
    content: (
      <Hook
        eyebrow="Module 1 · The story begins"
        question="Why does a ₹200 coffee touch five continents before it reaches your cup?"
        sub="Beans from Colombia, machines from Italy, a brand built in Seattle, an app coded in India, packaging shipped through Singapore. International business is the invisible system that makes this ordinary — and this module explains how firms build and manage value across borders."
        visual={<WorldMap routes={6} pulse="m1" />}
      />
    ),
  },

  /* 02 — MEANING & DEFINITION -------------------------------------------- */
  {
    id: 'meaning',
    title: 'Meaning of International Business',
    composition: 'world-canvas',
    film: { quiet: true, camera: 'hold' },
    content: (
      <Frame
        mode="visual-lead"
        label="What it is"
        title="Business that crosses a national border"
        lead="International Business (IB) is any commercial activity that takes place across two or more countries — not just selling abroad, but investing, sourcing, partnering and managing operations worldwide."
        visual={<BorderCrossing />}
        takeaway="Start every IB answer with this definition, then widen it to trade + investment + multinational operations."
      >
        <Definition term="International Business" keywords={['goods', 'services', 'technology', 'capital', 'knowledge']}>
          Commercial activity that crosses national borders through trade, investment, technology transfer, partnerships and multinational management.
        </Definition>
        <Explain items={[
          { k: 'What', v: 'Trade of goods, services, technology, capital and knowledge across national borders, at a global scale.' },
          { k: 'Why it exists', v: 'No single country has all the demand, resources, talent or cost advantages a firm needs to grow.' },
          { k: 'How', v: 'Through exports/imports, licensing, joint ventures, FDI and multinational management.' },
          { k: 'Business importance', v: 'It is now the default growth path — most large firms earn a major share of revenue outside their home market.' },
        ]} />
      </Frame>
    ),
  },

  /* 03 — EVOLUTION (overview timeline) ----------------------------------- */
  {
    id: 'evolution-overview',
    title: 'Evolution of International Business',
    composition: 'timeline',
    film: { hero: true, heroTier: '2', wow: true, camera: 'pan' },
    content: (
      <Frame
        mode="reverse"
        label="Historical arc"
        title="Commerce evolved by shrinking distance"
        lead="International business has moved through five great phases. Each one reduced the cost of moving goods, money and ideas across borders — and each was powered by a new technology and a new political order."
        visual={<Timeline items={[
          { era: 'Antiquity', title: 'Ancient trade routes', text: 'Silk Road & spice routes exchange goods and ideas.' },
          { era: '1500–1900', title: 'Colonialism', text: 'Empires organise raw materials and captive markets.' },
          { era: '1800s', title: 'Industrial Revolution', text: 'Factories, steamships & railways accelerate trade.' },
          { era: '1945–2000', title: 'Globalization', text: 'Institutions & liberalization cut barriers.' },
          { era: 'Today', title: 'Digital economy', text: 'E-commerce, SaaS & digital payments make trade instant.' },
        ]} />}
        takeaway="Memorise the sequence: ancient routes → colonialism → industrial revolution → globalization → digital economy."
      >
        <DidYouKnow>Roughly one in five containers shipped worldwide passes through a single chokepoint region — the Strait of Malacca near Singapore.</DidYouKnow>
      </Frame>
    ),
  },

  /* 04 — EVOLUTION (early phases, deep) ---------------------------------- */
  {
    id: 'evolution-early',
    title: 'Evolution — From Caravans to Factories',
    composition: 'editorial',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="Phases 1–3"
        title="Trade first followed distance, then power, then machines"
        lead="The early history of IB is a story of who could move goods furthest and cheapest — first merchants, then empires, then industrialists."
        visual={<Cards icon={Ship} items={[
          { title: 'Ancient routes', text: 'Civilizations traded spices, textiles and metals — and carried ideas, religion and technology along the same roads.' },
          { title: 'Colonial trade', text: 'European empires controlled raw materials and overseas markets, shaping an unequal but global commerce.' },
          { title: 'Industrial era', text: 'Mass production plus steamships and railways made large-scale, long-distance trade profitable for the first time.' },
        ]} />}
        takeaway="Each early phase widened the market and lowered the cost of distance."
      >
        <Case title="The spice trade">Control of the pepper and clove routes made cities like Venice and companies like the East India Company among the most valuable enterprises of their age — an early lesson that supply-chain control equals power.</Case>
        <SpiceRouteMini />
      </Frame>
    ),
  },

  /* 05 — EVOLUTION (modern, deep) ---------------------------------------- */
  {
    id: 'evolution-modern',
    title: 'Evolution — Globalization to the Digital Economy',
    composition: 'world-canvas',
    film: { camera: 'aerial' },
    content: (
      <Frame
        mode="dashboard"
        label="Phases 4–5"
        title="After 1945 the world deliberately lowered its walls"
        lead="Post-war institutions (GATT/WTO, IMF, World Bank) and waves of liberalization cut tariffs and opened capital flows. Then the internet made even the smallest firm potentially global."
        visual={<GlobalizationNetwork phases={[
          { title: 'Post-war globalization', text: 'Institutions and trade liberalization reduced barriers; MNCs built worldwide production networks.' },
          { title: 'Container revolution', text: 'The shipping container collapsed freight costs and made global manufacturing viable.' },
          { title: 'Digital economy', text: 'E-commerce, cloud SaaS, app stores and digital payments let firms sell across borders on day one.' },
          { title: 'Platform globalization', text: 'A developer in Mysuru can earn worldwide revenue without ever exporting a physical good.' },
        ]} />}
        takeaway="Modern IB is defined by falling barriers and rising digital reach."
      >
        <RealWorld>Cross-border e-commerce, international SaaS subscriptions and cloud services are now “trade” — even though nothing physical crosses a port.</RealWorld>
      </Frame>
    ),
  },

  /* 06 — IMPORTANCE ------------------------------------------------------ */
  {
    id: 'importance',
    title: 'Importance of International Business',
    composition: 'framework',
    tone: 'ib-scene-emerald',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="Why it matters"
        title="A growth engine for firms — and for nations"
        lead="International business is important because it lets firms grow beyond a saturated home market while raising quality, efficiency and living standards across countries."
        visual={<Cards icon={TrendingUp} items={[
          { title: 'Company growth', text: 'Foreign markets add demand beyond domestic limits and raise profit potential.' },
          { title: 'New technology & ideas', text: 'Global trade spreads better methods, products and ways of doing business.' },
          { title: 'Better quality', text: 'Global competition forces firms to improve products and service.' },
          { title: 'Employment', text: 'New ventures and supply chains create jobs across many regions.' },
          { title: 'Goodwill among nations', text: 'Trade builds economic interdependence, cooperation and peace.' },
        ]} />}
        takeaway="Group the five reasons as firm-level gains + nation-level gains for a full answer."
      >
        <DidYouKnow>International trade is worth well over US$30 trillion a year — larger than the GDP of any single country on earth.</DidYouKnow>
      </Frame>
    ),
  },

  /* 07 — NATURE & SCOPE -------------------------------------------------- */
  {
    id: 'nature-scope',
    title: 'Nature and Scope of International Business',
    composition: 'world-canvas',
    film: { quiet: true, camera: 'orbit' },
    content: (
      <Frame
        mode="visual-lead"
        label="How wide it reaches"
        title="IB touches every function of a firm"
        lead="The scope of IB is vast: it is not one department but a lens on the whole business — production, marketing, finance, HR and technology — all operating across borders."
        visual={<Orbit center="IB Scope" items={['Goods & services', 'Capital', 'Technology', 'Labour', 'Marketing & branding', 'Management']} />}
        takeaway="Scope = trade of goods/services + capital & technology flow + labour movement + global marketing + cross-border management."
      >
        <ManagerView>Because IB spans every function, a market-entry decision is never “a marketing call” or “a finance call” alone — it needs a cross-functional team looking at demand, cost, law, talent and risk together.</ManagerView>
      </Frame>
    ),
  },

  /* 08 — CHARACTERISTICS ------------------------------------------------- */
  {
    id: 'characteristics',
    title: 'Characteristics of International Business',
    composition: 'editorial',
    tone: 'ib-scene-graphite',
    film: { camera: 'dolly' },
    content: (
      <Frame
        label="What makes it different"
        title="Why IB is harder than domestic business"
        lead="International business has distinctive features that make it more complex — and riskier — than trading inside one country. These features are why IB needs its own strategy and its own managers."
        visual={<Cards icon={Compass} items={[
          { title: 'Multi-currency', text: 'Revenue and costs sit in different currencies, creating constant exchange-rate exposure.' },
          { title: 'Multi-cultural & multi-legal', text: 'Every market brings its own culture, language and legal system to satisfy.' },
          { title: 'Large scale & MNC-led', text: 'Big capital needs mean large firms and MNCs dominate global trade.' },
          { title: 'Politically sensitive', text: 'Tariffs, sanctions and policy shifts can change the rules overnight.' },
        ]} />}
        takeaway="Characteristics = distinctive features of IB; do not confuse them with the modes of entry."
      >
        <Insight>These characteristics are exactly why firms need environmental scanning (Module 2) before they enter a market.</Insight>
      </Frame>
    ),
  },

  /* 09 — MODES OF ENTRY (overview ladder) -------------------------------- */
  {
    id: 'entry-overview',
    title: 'Modes of Entry into International Business',
    composition: 'boardroom',
    tone: 'ib-scene-graphite',
    film: { hero: true, heroTier: '2', camera: 'push' },
    content: (
      <Frame
        mode="visual-lead"
        label="The entry ladder"
        title="Entry mode is a trade-off: control vs risk"
        lead="A firm can enter a foreign market in many ways, arranged as a ladder of commitment. Climbing the ladder buys more control and profit — but costs more and risks more."
        visual={<EntryLadder rows={[
          { mode: 'Export / Import', desc: 'Sell to (or buy from) a foreign market directly or via agents', control: 'Low', risk: 'Low' },
          { mode: 'Licensing', desc: 'Let a foreign firm use your product, patent or brand for a fee', control: 'Low', risk: 'Low' },
          { mode: 'Franchising', desc: 'License a whole business model with standards & support', control: 'Medium', risk: 'Low' },
          { mode: 'Joint venture', desc: 'Share ownership, profit and risk with a local partner', control: 'Medium', risk: 'Medium' },
          { mode: 'Contract mfg', desc: 'A foreign firm makes the product for you', control: 'Medium', risk: 'Medium' },
          { mode: 'FDI / M&A', desc: 'Build or buy your own operations abroad', control: 'High', risk: 'High' },
        ]} />}
        takeaway="Golden line for exams: as control rises, so do cost and risk."
      >
        <ExamTip>A 10-mark answer names the modes, explains each in one line, and ends with the control-vs-risk trade-off.</ExamTip>
      </Frame>
    ),
  },

  /* 10 — ENTRY (low commitment, deep) ----------------------------------- */
  {
    id: 'entry-low',
    title: 'Entry Modes — Low Commitment',
    composition: 'corridor',
    film: { camera: 'pan' },
    content: (
      <Frame
        label="Testing the water"
        title="Start light: export, license, franchise"
        lead="Low-commitment modes let a firm reach a market quickly with little capital at stake — ideal for testing demand or entering risky countries. The trade-off is limited control and thinner margins."
        visual={<EntryPathway steps={[
          { title: 'Export / Import', text: 'The simplest form — India exports tea and imports oil. Fast, cheap, reversible, but distant from the customer.' },
          { title: 'Licensing', text: 'A firm lets a foreign company use its brand, patent or process for royalties — low cost, low control.' },
          { title: 'Franchising', text: 'A fuller model transfer with standards and support, so the brand feels identical worldwide.' },
        ]} />}
        takeaway="Low commitment = fast and cheap, but you hand control (and learning) to partners."
      >
        <Case title="McDonald’s in India">McDonald’s enters through franchising: local franchisees run the restaurants, while the brand keeps global standards — and adapts the menu (McAloo Tikki, no beef/pork) to Indian culture.</Case>
      </Frame>
    ),
  },

  /* 11 — ENTRY (high commitment, deep) ---------------------------------- */
  {
    id: 'entry-high',
    title: 'Entry Modes — High Commitment',
    composition: 'split',
    film: { camera: 'dolly' },
    content: (
      <Frame
        mode="reverse"
        label="Going all in"
        title="Commit deeper: JV, contract manufacturing, FDI"
        lead="High-commitment modes give a firm control, local knowledge and higher profit — at the price of more capital and more exposure to political and market risk."
        visual={<EntryPathway steps={[
          { title: 'Joint venture', text: 'Two firms share ownership, profit and risk — the local partner brings market knowledge and access.' },
          { title: 'Contract manufacturing', text: 'A foreign firm produces for you; many tech companies manufacture in China, India or Vietnam.' },
          { title: 'FDI', text: 'Directly build factories or offices abroad — maximum control and commitment.' },
          { title: 'Mergers & acquisitions', text: 'Buy an existing foreign firm to gain instant scale, brand and customers.' },
        ]} />}
        takeaway="High commitment = more control and profit, but more capital and risk at stake."
      >
        <Case title="Tata acquiring Jaguar Land Rover">Tata Motors used acquisition (M&A) to instantly gain premium global brands, technology and markets — a fast, high-commitment route to becoming a global player.</Case>
      </Frame>
    ),
  },

  /* 12 — FACTORS AFFECTING IB ------------------------------------------- */
  {
    id: 'factors',
    title: 'Factors Affecting International Business',
    composition: 'framework',
    film: { quiet: true, camera: 'orbit' },
    content: (
      <Frame
        label="The country scan"
        title="A good product can still fail in the wrong country"
        lead="Before entering a market, firms scan the external environment. Economic, political-legal, cultural, technological, currency and trade-barrier factors can make or break the decision."
        visual={<Orbit center="Market Scan" items={['Economic', 'Political', 'Legal', 'Culture', 'Technology', 'FX risk', 'Tariffs']} />}
        takeaway="Use this scan as a structured answer for any market-entry feasibility question."
      >
        <Think>Why do global firms manufacture in Vietnam rather than the US, even when the customer is American? Which of these factors is driving that choice?</Think>
      </Frame>
    ),
  },

  /* 13 — CHANGING SCENARIO ---------------------------------------------- */
  {
    id: 'scenario',
    title: 'The Changing Scenario of International Business',
    composition: 'world-canvas',
    film: { camera: 'aerial' },
    content: (
      <Frame
        mode="dashboard"
        label="Today’s landscape"
        title="Globalization is no longer only about low cost"
        lead="The IB landscape shifts constantly. Today firms balance growth against geopolitical risk, sustainability and the need for resilient — not just cheap — supply chains."
        visual={<ForceField center="The firm today" forces={[
          { title: 'Digital transformation', text: 'AI, cloud and automation reshape how global firms operate and compete.' },
          { title: 'Geopolitics & trade policy', text: 'Sanctions, tariffs and tensions push firms to diversify locations.' },
          { title: 'Sustainability & ESG', text: 'Climate rules and stakeholder expectations reshape sourcing and reporting.' },
          { title: 'Supply-chain resilience', text: 'After COVID, firms adopt China+1, nearshoring and friend-shoring.' },
        ]} />}
        takeaway="A modern answer balances opportunity with resilience and responsibility."
      >
        <Update>“China+1”, nearshoring, friend-shoring, green logistics and digital control towers are the vocabulary of the current IB scenario.</Update>
      </Frame>
    ),
  },

  /* 14 — ADVANTAGES ----------------------------------------------------- */
  {
    id: 'advantages',
    title: 'Advantages of International Business',
    composition: 'editorial',
    tone: 'ib-scene-emerald',
    film: { camera: 'rise' },
    content: (
      <Frame
        label="The upside"
        title="Why firms and consumers gain from going global"
        lead="International business lets firms use world resources efficiently, cut costs, and reach far larger markets — and consumers gain wider choice at better prices."
        visual={<Cards icon={BadgeCheck} items={[
          { title: 'Effective use of resources', text: 'Countries specialise where they have a comparative advantage and import the rest.' },
          { title: 'Cost reduction', text: 'Source materials and labour where they are cheaper; scale lowers unit cost.' },
          { title: 'Larger markets', text: 'Sell to millions of customers worldwide instead of a limited home market.' },
          { title: 'Consumer benefit', text: 'More choice, better quality and more affordable prices raise living standards.' },
        ]} />}
        takeaway="Split advantages into firm gains (cost, markets, resources) and consumer gains (choice, price, quality)."
      >
        <RealWorld>Your smartphone is designed in one country, chipped in another, assembled in a third and sold everywhere — the direct result of these advantages.</RealWorld>
      </Frame>
    ),
  },

  /* 15 — CHALLENGES ----------------------------------------------------- */
  {
    id: 'challenges',
    title: 'Challenges in International Business',
    composition: 'split',
    tone: 'ib-scene-graphite',
    film: { camera: 'push' },
    content: (
      <Frame
        mode="reverse"
        label="The hard part"
        title="Every advantage brings a matching risk"
        lead="Going global also brings serious challenges: cultural differences, complex laws, tariffs, currency swings and political instability can all disrupt operations."
        visual={<Compare items={[
          { title: 'Culture & etiquette', text: 'Language, business customs and consumer behaviour differ — marketing and service must adapt.' },
          { title: 'Policy & regulation', text: 'Tariffs, trade agreements and local laws constrain operations.' },
          { title: 'Global risk', text: 'Currency movements and political instability create financial and operational risk.' },
        ]} />}
        takeaway="A balanced VTU answer pairs each advantage with its matching challenge — never list only benefits."
      >
        <Case title="Currency risk in practice">A firm that sells in euros but pays suppliers in dollars can see profit vanish on an exchange-rate swing alone — which is why global firms hedge currencies.</Case>
      </Frame>
    ),
  },

  /* 16 — INTERNATIONALIZATION PROCESS ----------------------------------- */
  {
    id: 'internationalization',
    title: 'The Internationalization Process',
    composition: 'corridor',
    film: { quiet: true, camera: 'dolly' },
    content: (
      <Frame
        mode="visual-lead"
        label="The growth ladder"
        title="A firm becomes global in stages"
        lead="Firms rarely leap straight to global. They climb a ladder — from a home-focused domestic firm to a fully integrated transnational company that is both globally efficient and locally responsive."
        visual={<InternationalizationMap stages={[
          { k: 'Domestic', t: 'India only — home market' },
          { k: 'International', t: 'Exports into foreign markets' },
          { k: 'Multinational', t: 'Country-adapted subsidiaries' },
          { k: 'Global', t: 'Coordinated worldwide network' },
          { k: 'Transnational', t: 'Distributed & interconnected' },
        ]} />}
        takeaway="Memorise the ladder in order with one feature of each stage."
      >
        <ManagerView>The manager’s judgement is knowing which rung to stand on: push too fast and you overreach; too slow and rivals lock up the market first.</ManagerView>
      </Frame>
    ),
  },

  /* 17 — CASE: APPLE ---------------------------------------------------- */
  {
    id: 'case-apple',
    title: 'Business Case — The Globalization of Apple',
    composition: 'case',
    film: { hero: true, heroTier: '2', wow: true, camera: 'orbit' },
    content: (
      <MiniCase
        company="Apple"
        sector="Consumer technology"
        headline="How Apple made the whole world its factory and its market"
        situation="Apple designs in California but needed scale, speed and cost that no single country could provide — so it built one of the most sophisticated global value chains on earth."
        moves={[
          'Design & IP kept in the US',
          'Components sourced across Japan, Korea and Taiwan',
          'Final assembly via contract manufacturers in China — now also India & Vietnam',
          'Sold through one global brand with local retail and carrier deals',
        ]}
        result="A worldwide premium business — but with concentrated supplier risk it is now actively diversifying (the “China+1” strategy)."
        lesson="Global reach is a value-chain design choice: place each activity where the capability-cost trade-off is best, then manage the concentration risk you create."
      />
    ),
  },

  /* 18 — CASE: AMAZON --------------------------------------------------- */
  {
    id: 'case-amazon',
    title: 'Business Case — Amazon Entering India',
    composition: 'case',
    tone: 'ib-scene-editorial',
    film: { camera: 'pan' },
    content: (
      <MiniCase
        company="Amazon"
        sector="E-commerce / platform"
        headline="Why a US e-commerce giant had to relearn retail in India"
        situation="Amazon’s US playbook — owned inventory and fast Prime delivery — collided with India’s FDI rules, cash economy and fragmented logistics."
        moves={[
          'Adopted a marketplace (3P) model to fit FDI rules on multi-brand retail',
          'Invested billions to build its own logistics & fulfilment network',
          'Localized: cash-on-delivery, regional languages, low-data app, kirana partners',
          'Competed with Flipkart on selection, price and seller ecosystem',
        ]}
        result="Became one of India’s top e-commerce platforms — by adapting the model, not exporting it."
        lesson="Market entry is adaptation, not translation: regulation, payments and logistics can force a different business model in every country."
      />
    ),
  },

  /* 19 — EXAM PACK ------------------------------------------------------ */
  {
    id: 'exam-pack',
    title: 'Module 1 — Exam Pack & Revision',
    composition: 'summary',
    tone: 'ib-scene-graphite',
    film: { camera: 'hold' },
    content: (
      <ExamPack
        title="Module 1 — Exam Pack"
        definitions={[
          { term: 'International Business', text: 'Trade of goods, services, technology, capital and knowledge across national borders, at a global scale.' },
          { term: 'Mode of entry', text: 'The form a firm uses to enter a foreign market, trading off control, risk, cost and speed.' },
          { term: 'Transnational company', text: 'The most integrated stage — globally efficient yet locally responsive.' },
        ]}
        tenMark={[
          'Explain the evolution of International Business with its key phases.',
          'Discuss the nature, scope and importance of International Business.',
          'Explain the modes of entry with their advantages and risks.',
          'Describe the internationalization process of a firm.',
          'Discuss the advantages and challenges of International Business.',
        ]}
        comparisons={[
          'Domestic vs International business',
          'Export/Import vs FDI (low vs high commitment)',
          'Global company vs Transnational company',
        ]}
        memory="Journey: Routes → Meaning → Scope → Forms → Factors → Internationalization. For entry modes remember: control ↑ ⇒ risk & cost ↑."
      />
    ),
  },

  /* 20 — MODULE PAYOFF -------------------------------------------------- */
  {
    id: 'payoff',
    title: 'Module 1 — The Big Picture',
    composition: 'finale',
    tone: 'ib-scene-dark',
    film: { finale: true, hero: true, heroTier: '1', chapterPayoff: true, callback: true, camera: 'aerial' },
    content: (
      <Frame
        label="Where we’ve been"
        title="From a coffee cup to a global operating system"
        lead="We began with a simple question and ended with a framework: what IB is, how it evolved, why it matters, how firms enter markets, and how they grow into global companies. Every later module builds on this foundation."
        visual={<Cards icon={Landmark} items={[
          { title: 'You can define IB', text: 'Trade + investment + multinational management across borders.' },
          { title: 'You can scan a market', text: 'Economic, political-legal, cultural, technological, FX and tariff factors.' },
          { title: 'You can choose entry', text: 'Match the mode to the control-vs-risk trade-off.' },
          { title: 'You can trace growth', text: 'Domestic → International → MNC → Global → Transnational.' },
        ]} />}
        takeaway="Next: Module 2 zooms into the environment — the country climate that decides whether your strategy survives contact with the real world."
      >
        <Insight>Every strategic choice in IB is a balance of opportunity and risk. Master that balance and the rest of the course becomes application, not memorisation.</Insight>
      </Frame>
    ),
  },
]

export const internationalBusinessModule1Slides = buildModule(1, module1, {
  opener: <WorldOpensScene module={1} />,
})

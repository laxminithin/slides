import './rmIpr.css'
import {
  slide, Deck, Points, Lead, Definition, Example, Flow, Compare, Cards, Divider, ResourceHub,
  PatentPipeline, PriorArtScan, IpEcosystem,
  DocumentJourney, DecisionTree, TrademarkIdentity,
} from './components/RmKit.jsx'

export const rmIprModule3Slides = [

  /* ── 1 ── OPENER ─────────────────────────────────────────────────────── */
  slide({
    id: 'rm3-open',
    kicker: 'BRMK557 · Module 3',
    title: 'From Invention to Patent',
    hideTitle: true,
    content: (
      <Divider number="Module 3" title="From Invention to Patent" subtitle="Novelty has value only when it is protected wisely." visual={<PatentPipeline stage={2} />} />
    ),
    notes: 'opener',
  }),

  /* ── 2 ── MASTER STORY ───────────────────────────────────────────────── */
  slide({
    id: 'rm3-story',
    kicker: 'Master story',
    title: 'Energy invention meets patent strategy',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={0} />} tone={3} layout="process" takeaway="An engineering idea becomes IP strategy only after novelty and disclosure timing are understood.">
        <Flow items={['Idea','New?','Prior art','Patent?','File','Publish','Examine','Grant','Commercialise']} />
        <Example label="Campus story">EcoSense energy controller: should the control method be patented before any public demo?</Example>
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  /* ── 3 ── IP DEFINITIONS ─────────────────────────────────────────────── */
  slide({
    id: 'rm3-ip',
    kicker: 'IP and IPR',
    title: 'Definitions',
    content: (
      <Deck density="dense" active={5} visual={<IpEcosystem />} tone={3} takeaway="IPR privileges creators for revealing intellectual creation — not the physical object.">
        <Definition term="IP">Intangible property created by human intellect in arts, literature, science and trade.</Definition>
        <Definition term="IPR">Legal privileges to use, sell, distribute, offer for sale and restrict unauthorised use — conferred in exchange for revealing the process/invention in the public domain.</Definition>
        <Points items={['Rights do NOT attach to the physical object (book, computer, mobile phone)','Rights attach to the intellectual creativity embodied in the object']} />
      </Deck>
    ),
    notes: 'PPT slides 3–4 aligned.',
  }),

  /* ── 4 ── BOOK AND COMPUTER EXAMPLES ────────────────────────────────── */
  slide({
    id: 'rm3-ex',
    kicker: 'IP layers on products',
    title: 'Book and computer examples',
    content: (
      <Deck active={5} visual={<IpEcosystem />} tone={3} reverse takeaway="One product can carry copyright, design, trademark and patent layers simultaneously.">
        <Cards items={[
          ['Book text / art','Copyright (author lifetime + 60 yrs)'],
          ['Brand / series name','Trademark possible'],
          ['Novel control method','Patent possible'],
          ['PC casing look','Industrial design'],
          ['OS / logo / chip layout','Copyright / TM / Semiconductor IC Act'],
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  /* ── 5 ── TWO BRANCHES ───────────────────────────────────────────────── */
  slide({
    id: 'rm3-br',
    kicker: 'Two branches of IP',
    title: 'Copyrights vs industrial property',
    content: (
      <Deck density="dense" active={5} visual={<IpEcosystem />} tone={3} takeaway="Industrial property includes patents, trademarks, designs and GIs.">
        <Compare
          leftTitle="Copyrights & related rights"
          rightTitle="Industrial property rights"
          left={['Literature and art — books, publications, architecture','Music, films, sculptures, paintings','Computer software / databases','Related rights: performances, phonograms, broadcasts']}
          right={['Patents (technical inventions)','Trademarks / trade service marks','Industrial designs','Geographical indications (GIs)']}
        />
      </Deck>
    ),
    notes: 'PPT slide 6 aligned.',
  }),

  /* ── 6 ── ROLE OF IP — INCENTIVE ────────────────────────────────────── */
  slide({
    id: 'rm3-role-incentive',
    kicker: 'Role of IP · Part 1',
    title: 'Incentivising creativity',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={0} focus="Idea" />} tone={3} layout="process" takeaway="Creativity is the keystone of progress; IPR incentivises creators and motivates others.">
        <Points items={[
          'Economic and social development depends largely on creativity',
          'IP protection acts as incentivisation — creators are rewarded for creating',
          'Motivates others to produce new and novel things',
          'Encourages disclosure of technical knowledge into the public domain',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 7 aligned.',
  }),

  /* ── 7 ── ROLE OF IP — TRIPS TENSION ────────────────────────────────── */
  slide({
    id: 'rm3-role-trips',
    kicker: 'Role of IP · Part 2',
    title: 'When rigid IPR harms society',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={0} focus="Idea" />} tone={3} reverse layout="process" takeaway="TRIPS compliance on seeds shows that rigid IPR can disadvantage farmers and raise prices beyond reach.">
        <Points items={[
          'If IPR is practised rigidly it can have a negative impact on societal progress',
          'TRIPS Agreement compliance: farmers unable to store seeds for the next crop',
          'Multinational companies regulate seed prices — often beyond majority of farmers\' reach',
          'IP must balance private incentive against community wellbeing',
        ]} />
        <Example label="TRIPS seed example (PPT)">An Indian farmer who saves seeds from a patented variety may infringe — illustrating how global IP standards can conflict with local agricultural practice.</Example>
      </Deck>
    ),
    notes: 'PPT slide 8 aligned.',
  }),

  /* ── 8 ── ROLE OF IP — EXCEPTIONS ───────────────────────────────────── */
  slide({
    id: 'rm3-role-exceptions',
    kicker: 'Role of IP · Part 3',
    title: 'Exceptions, TK & Make in India',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={0} focus="Idea" />} tone={3} reverse layout="process" takeaway="Exceptions and TK frameworks maintain balance; Make in India leverages IP for local growth.">
        <Points items={[
          'Laws, exceptions and limitations enacted to balance creator vs community interests',
          'PPV&FR Act 2001 — farmers\' rights: save, use, share, exchange or sell seeds',
          'Copyrighted material for education and religious ceremonies is exempted',
          'Patents can be compulsorily licensed by government in emergency / natural calamity',
          'India\'s biodiversity and Traditional Knowledge (TK) — protected from bio-piracy',
          'Make in India / Atmanirbhar Bharat — accessible patent/TM registration supports local brands',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 9–11 aligned.',
  }),

  /* ── 9 ── GOVERNANCE — DPIIT ─────────────────────────────────────────── */
  slide({
    id: 'rm3-gov-india',
    kicker: 'IP Governance · India',
    title: 'DPIIT and national framework',
    content: (
      <Deck active={5} visual={<IpEcosystem />} tone={3} reverse takeaway="DPIIT under Ministry of Commerce & Industry governs all major IP categories except plant varieties.">
        <Points items={[
          'Each nation has dedicated agencies for guidelines, implementation and enforcement of IP',
          'Department for Promotion of Industry & Internal Trade (DPIIT) — Ministry of Commerce & Industry, GoI',
          'DPIIT governs patents, copyrights, trademarks, designs and GIs',
          'Exception: Plant Variety and Farmers\' Rights Act — governed separately',
          'Office of Controller General of Patents, Designs & Trade Marks (CGPDTM) under DPIIT',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 12 aligned.',
  }),

  /* ── 10 ── GOVERNANCE — TIFAC / NRDC / CIPAM ────────────────────────── */
  slide({
    id: 'rm3-gov-orgs',
    kicker: 'IP Governance · Specialised bodies',
    title: 'TIFAC, NRDC, CIPAM',
    content: (
      <Deck active={5} visual={<DocumentJourney stages={['Policy','Office','Register','Support']} />} tone={3} layout="process" takeaway="TIFAC, NRDC and CIPAM form India's patent ecosystem — awareness, commercialisation and promotion.">
        <Cards items={[
          ['TIFAC','Technology Information Forecasting & Assessment Council — patent awareness and forecasting'],
          ['NRDC','National Research Development Corporation — patent filing and commercialisation support'],
          ['CIPAM','Cell for IPR Promotion & Management — IP awareness campaigns and enforcement'],
          ['IPO / InPASS','Indian Patent Office portal for search and e-filing (ipindiaonline.gov.in)'],
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 13 aligned.',
  }),

  /* ── 11 ── GOVERNANCE — WIPO & TREATIES ─────────────────────────────── */
  slide({
    id: 'rm3-gov-wipo-treaties',
    kicker: 'IP Governance · International',
    title: 'WIPO and key treaties',
    content: (
      <Deck active={5} visual={<DocumentJourney stages={['Policy','Office','Register','Support']} />} tone={3} reverse layout="process" takeaway="WIPO coordinates minimum standards across nations; India is signatory to all major treaties.">
        <Points items={[
          'Minimum standards of rules needed for hassle-free exchange of IP across nations — covering rights, empowerment and exceptions',
          'WIPO (World Intellectual Property Organization) — awareness and international filing',
          'Paris Convention (1883) — industrial property, priority rights',
          'Patent Cooperation Treaty (PCT) — single international patent filing',
          'Berne Convention — copyright minimum standards',
          'Rome Convention — related rights (performers, producers, broadcasters)',
          'TRIPS Agreement (1995) — WTO framework for IP minimum standards',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 14–15 aligned.',
  }),

  /* ── 12 ── INNOVATION INDICATOR ──────────────────────────────────────── */
  slide({
    id: 'rm3-ind',
    kicker: 'IP as innovation indicator',
    title: 'STI rankings and IP metrics',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={1} />} tone={3} layout="process" takeaway="IP — especially patents — is a key cog in national innovation indices.">
        <Points items={[
          'IP is one of the important parameters for assessing the innovation index of a nation',
          'Global ranking organisations use IP or a subset of IP to grade Science, Technology & Innovation (STI) ecosystems',
          'Infrastructure for IP in higher-learning institutions can directly improve national rankings',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 16 aligned.',
  }),

  /* ── 13 ── SCIMAGO ────────────────────────────────────────────────────── */
  slide({
    id: 'rm3-scimago',
    kicker: 'Innovation indicator · Scimago 2020',
    title: "India's ranking gap",
    content: (
      <Deck active={5} visual={<PatentPipeline stage={1} />} tone={3} reverse layout="process" takeaway="India ranks 4th on publications but 50th on IPR — sensitising researchers is the bridge.">
        <Example label="Scimago 2020 (PPT data)">
          India ranked 4th in number of Research Publications — but only 50th in Intellectual Property Rights. Sensitising the teaching and scientific communities about IP and creating IP infrastructure in institutes of higher learning can close this gap.
        </Example>
        <Lead>Scimago is a publicly available online portal ranking journals and countries based on Scopus data.</Lead>
      </Deck>
    ),
    notes: 'PPT slide 17 aligned.',
  }),

  /* ── 14 ── ORIGIN — SYBARIS ──────────────────────────────────────────── */
  slide({
    id: 'rm3-origin-sybaris',
    kicker: 'Origin of IP · Part 1',
    title: 'Sybaris and medieval Europe',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={0} />} tone={3} reverse layout="process" takeaway="IP concepts began as guild privileges; Sybaris (~500 BCE) is the earliest known record.">
        <Points items={[
          '~500 BCE — Sybaris (ancient Greek city in southern Italy): yearly protection for intellectual improvements in luxury',
          'Medieval Europe (476 CE – 14th century) — guild privileges for artisans and merchants',
          '1623 — Britain passes Intellectual Property Legislation entitling guilds to bring innovations to market',
          'Public resentment of guild monopoly led to reform',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 18 aligned.',
  }),

  /* ── 15 ── ORIGIN — STATUTES ─────────────────────────────────────────── */
  slide({
    id: 'rm3-origin-statutes',
    kicker: 'Origin of IP · Part 2',
    title: 'Statute of Monopolies and Statute of Anne',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={0} />} tone={3} reverse layout="process" takeaway="Modern patent and copyright law emerged from British statutes — both granting 14-year terms.">
        <Flow items={['Guild privilege (1623)','Statute of Monopolies','14-yr inventor right','Statute of Anne 1710','14-yr author right','National IP laws by 19th c.']} />
        <Points items={[
          'Statute of Monopolies — replaced guild monopoly; gave rights to the original creator/inventor for 14 years',
          'Statute of Anne (1710) — copyright for authors; right of reproduction and distribution; renewable for another 14 years',
          'By end of 18th / early 19th century — almost every country laid down IP legislation',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 19 aligned.',
  }),

  /* ── 16 ── INDIA HISTORY — PATENTS ──────────────────────────────────── */
  slide({
    id: 'rm3-indhist-patents',
    kicker: 'History of IP in India · Patents',
    title: 'Act VI 1856 to first patents',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={1} />} tone={3} reverse layout="process" takeaway="Indian patent law started in 1856 adapting British law — DePenning's punkah machine was the first.">
        <Points items={[
          'Pre-independence era — British rule: Act VI of 1856 (adapted from British Patent Law 1852)',
          'Objective: encourage inventions of new and useful manufactures; rights = Exclusive Privileges',
          '1859 amendments: grant to useful inventions; priority extended 6 → 12 months; importers excluded from inventor definition',
          'World\'s first patent (1790, USA): Samuel Hopkins — making pot ash and pearl ash',
          'India\'s first patent (1856): George Alfred DePenning, Calcutta — "An Efficient Punkah Pulling Machine"',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 20–22 aligned.',
  }),

  /* ── 17 ── INDIA HISTORY — COPYRIGHT ────────────────────────────────── */
  slide({
    id: 'rm3-indhist-copyright',
    kicker: 'History of IP in India · Copyrights',
    title: 'Three phases of copyright evolution',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={1} />} tone={3} reverse layout="process" takeaway="Printing triggered the need for copyright law; India's Copyright Act 1957 is the modern cornerstone.">
        <Cards items={[
          ['Phase 1 · 1847','East India Company — concept of copyrights introduced; term = author\'s lifetime + 7 years (max 42 years)'],
          ['Phase 2 · 1914','British Raj — Copyright Act 1914 based on UK Imperial Copyright Act 1911; criminal sanction for infringement'],
          ['Phase 3 · 1957 onward','Post-independence Copyright Act 1957; amended 6× (1983, 1984, 1992, 1994, 1999, 2012) to comply with WIPO Copyright Treaty (WCT 1996) and WPPT 1996'],
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 23–24 aligned.',
  }),

  /* ── 18 ── INDIA HISTORY — TM & GI ──────────────────────────────────── */
  slide({
    id: 'rm3-indhist-tm-gi',
    kicker: 'History of IP in India · TM & GI',
    title: 'Trademarks and Geographical Indications',
    content: (
      <Deck density="dense" active={5} visual={<TrademarkIdentity />} tone={3} takeaway="India's TM law traces to 1940; GI Act came into force 2003 under WTO / TRIPS Article 22.">
        <Compare
          leftTitle="Trademarks"
          rightTitle="Geographical Indications"
          left={[
            'Trade Marks Act 1940 — carved from UK Trade Marks Act 1938',
            'Subsequent revisions aligned with TRIPS',
            'Governs distinctive signs identifying goods/services of an enterprise',
          ]}
          right={[
            'India (WTO member) enacted GI of Goods (Registration & Protection) Act 1999',
            'Came into force 15 September 2003',
            'GIs defined under Article 22(1) of WTO TRIPS Agreement',
            'Example: Darjeeling Tea, Basmati Rice, Mysore Silk',
          ]}
        />
      </Deck>
    ),
    notes: 'PPT slide 25 aligned.',
  }),

  /* ── 19 ── AMENDMENTS — EARLY PATENT LAWS ────────────────────────────── */
  slide({
    id: 'rm3-amd-early',
    kicker: 'Major amendments · Table 1.1 Part 1',
    title: 'Patent law history 1856 – 1930',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={2} />} tone={3} reverse layout="process" takeaway="India's patent law evolved in colonial era through six iterations before independence.">
        <Cards items={[
          ['1856 · Act VI','Adapted from British Patent Law 1852 — Exclusive Privileges for new/useful manufactures'],
          ['1859 · Amendment','Priority: 6 → 12 months; importers excluded from inventor definition'],
          ['1883 · Patterns & Designs Protection Act','Introduced novelty requirement; 6-month grace period for disclosure'],
          ['1911 · Indian Patent & Design Act','Renamed; Controller of Patents established'],
          ['1930 · Amendment','Patent of Addition introduced; govt can use invention; term extended 14 → 16 years'],
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 27 / Table 1.1 rows 1–6 aligned.',
  }),

  /* ── 20 ── AMENDMENTS — INDEPENDENCE ERA ────────────────────────────── */
  slide({
    id: 'rm3-amd-independence',
    kicker: 'Major amendments · Table 1.1 Part 2',
    title: 'Patent law history 1945 – 1972',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={2} />} tone={3} reverse layout="process" takeaway="The Bakshi Tek Chand and Ayyangar committee recommendations shaped the landmark Patents Act 1970.">
        <Cards items={[
          ['1945','Provisional specification for priority date; complete spec within 9 months'],
          ['1950','Working statement at Patent Office; "Licence of Right" endorsement'],
          ['1952','Compulsory Licence for food, medicine, insecticide/germicide'],
          ['1949–1965','Bakshi Tek Chand committee review; new bill introduced in Lok Sabha 1965 but not cleared'],
          ['1967–1969','Parliamentary committee review; further revisions'],
          ['1972 · Patents Act 1970 in force','Patent Rules introduced; landmark legislation shaping modern Indian patent law'],
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 27–28 / Table 1.1 rows 7–13 aligned.',
  }),

  /* ── 21 ── AMENDMENTS — TRIPS ERA ────────────────────────────────────── */
  slide({
    id: 'rm3-amd-trips',
    kicker: 'Major amendments · TRIPS transition',
    title: '1995 TRIPS → 1999 mailbox → 2002 uniform term',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={2} />} tone={3} reverse layout="process" takeaway="India took the 1995–2005 TRIPS transition period; mailbox and EMR were interim measures.">
        <Points items={[
          '1995 — TRIPS Agreement signed; India given transition period 1995–2005 to harmonise domestic laws',
          '1999 — Mailbox provisions: product patent applications for pharmaceuticals and agro-chemicals accepted (stored for later examination)',
          '1999 — Exclusive Marketing Rights (EMR) for pharma products on fulfilment of certain conditions',
          '2002 — Uniform 20-year patent term for all inventions; source/geographical origin of biological material disclosure made compulsory; Appellate Board established; compulsory licensing provisions strengthened',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 28–29 / Table 1.1 rows 14–16 aligned.',
  }),

  /* ── 22 ── AMENDMENTS — 2005 PRODUCT PATENTS ────────────────────────── */
  slide({
    id: 'rm3-amd-modern',
    kicker: 'Major amendments · 2005 to present',
    title: 'Product patents, anti-evergreening, opposition',
    content: (
      <Deck active={5} visual={<PatentPipeline stage={2} />} tone={3} reverse layout="process" takeaway="2005 was the most consequential year — product patents, anti-evergreening and dual-stage opposition all arrived.">
        <Points items={[
          '2005 — Product patent extended to all fields: food, drugs, chemicals, microorganisms',
          '2005 — New forms of known substances excluded (anti-evergreening — s.3(d))',
          '2005 — Pre-grant opposition introduced',
          '2005 — Post-grant opposition introduced',
          '2005 — Grace period extended to 12 months',
          '2012 Copyright Amendment — comply with WIPO digital treaties; royalties for authors and music composers; physical disability exception',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 29–30 aligned.',
  }),

  /* ── 23 ── AMENDMENTS — PPV&FR & BIOLOGICAL DIVERSITY ────────────────── */
  slide({
    id: 'rm3-amd-ppvfr-bd',
    kicker: 'Major amendments · PPV&FR & Biodiversity',
    title: "Plant varieties, farmers\\' rights, biodiversity",
    content: (
      <Deck density="dense" active={5} visual={<PatentPipeline stage={0} focus="Idea" />} tone={3} takeaway="TRIPS required sui generis plant protection; Biological Diversity Act guards India's genetic wealth.">
        <Compare
          leftTitle="PPV&FR"
          rightTitle="Biological Diversity"
          left={[
            '1970 Patents Act excluded plants/animals from patentability',
            '1991 — Protection of new plant varieties on sui generis basis (UPOV lines)',
            '2001 — PPV&FR Act in line with TRIPS Agreement',
          ]}
          right={[
            '2002 — Biological Diversity Act (based on CBD 1992)',
            '2003 — National Biodiversity Authority established; repositories designated',
            '2004 — Biological Diversity Rules introduced',
          ]}
        />
      </Deck>
    ),
    notes: 'PPT slide 31 aligned.',
  }),

  /* ── 24 ── PATENTS SECTION DIVIDER ──────────────────────────────────── */
  slide({
    id: 'rm3-pdiv',
    kicker: 'Patents',
    title: 'Exclusive rights for inventions',
    hideTitle: true,
    content: (
      <Divider number="Patents" title="Protecting technical inventions" subtitle="Novelty has value only when it is protected wisely." visual={<PatentPipeline stage={3} />} />
    ),
    notes: 'div',
  }),

  /* ── 25 ── PATENT DEFINITION ─────────────────────────────────────────── */
  slide({
    id: 'rm3-pdef',
    kicker: 'Patent meaning',
    title: 'Invention vs innovation',
    content: (
      <Deck density="dense" active={6} visual={<PatentPipeline stage={0} />} tone={3} takeaway="A patent protects a technical solution disclosed so a skilled person can replicate it.">
        <Definition term="Patent">An exclusive right granted for an innovation that provides a new way of doing something or a new technical solution to a problem — legally protects against copying.</Definition>
        <Compare
          leftTitle="Invention"
          rightTitle="Innovation"
          left={['Creation of a new idea or concept','May or may not reach the market']}
          right={['Process of translating invention into commercial entity or widespread use','Requires business/market execution']}
        />
      </Deck>
    ),
    notes: 'PPT slide 32 aligned.',
  }),

  /* ── 26 ── CONDITIONS — NOVELTY ──────────────────────────────────────── */
  slide({
    id: 'rm3-cond-novelty',
    kicker: 'Conditions for patent · Novelty',
    title: 'Not part of the state of the art',
    content: (
      <Deck density="dense" active={6} visual={<PatentPipeline stage={1} focus="Prior art" />} tone={3} takeaway="Novelty means not in public knowledge, not published anywhere, and not claimed in any prior specification.">
        <Lead>Section 2(1)(j) Patents Act 1970 — three cumulative conditions: novelty, inventive step, industrial application.</Lead>
        <Definition term="Novelty">The innovation is new and not known to anybody in the world — not in public knowledge, not published through any means of publication, and not claimed in any other specification by any other applicant.</Definition>
        <Points items={[
          'Prior art includes all public disclosures before the filing (or priority) date',
          'A single prior publication anywhere in the world can destroy novelty',
          'Grace period of 12 months available in limited circumstances (PPT s.3(d) framing)',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 33 aligned.',
  }),

  /* ── 27 ── CONDITIONS — INVENTIVE STEP + INDUSTRIAL APPLICATION ───────── */
  slide({
    id: 'rm3-cond-inventive-industrial',
    kicker: 'Conditions for patent · Inventive step & industrial application',
    title: 'Non-obvious + capable of use in industry',
    content: (
      <Deck density="dense" active={6} visual={<PatentPipeline stage={1} focus="Prior art" />} tone={3} takeaway="Inventive step bars obvious improvements; industrial application ensures societal benefit.">
        <Compare
          leftTitle="Inventive step"
          rightTitle="Industrial application"
          left={[
            'Not obvious to a person skilled in the art',
            '(a) Technical advancement over existing knowledge',
            '(b) Economic significance',
            '(c) Not obvious to a person skilled in the concerned subject',
          ]}
          right={[
            'For the benefit of society',
            'Invention is capable of being made OR used in any industry',
            'Includes agriculture (broad interpretation)',
          ]}
        />
      </Deck>
    ),
    notes: 'PPT slide 34 aligned.',
  }),

  /* ── 28 ── PATENT VS TRADE SECRET ────────────────────────────────────── */
  slide({
    id: 'rm3-ornot',
    kicker: 'To patent or not',
    title: 'Patent vs trade secret',
    content: (
      <Deck density="dense" active={6} visual={<DecisionTree question="Disclose?" left="Patent path" right="Trade secret" />} tone={3} takeaway="Choose based on secrecy durability and-engineering risk.">
        <Lead>Most inventors seek statutory benefits. A miniscule number place inventions in the public domain — anyone may then exploit without paying the inventor.</Lead>
        <Compare leftTitle="Patent" rightTitle="Trade secret" left={['Requires disclosure','Timed exclusivity (20 yrs)','Better if reverse engineering likely','Statutory benefit; monitored judicially']} right={['Keep secret — no public teaching','No time limit if secrecy holds','Preferred if secrecy durable ≥ 100 yrs','Fails if secrecy breaks']} />
      </Deck>
    ),
    notes: 'PPT slides 35–36 aligned.',
  }),

  /* ── 29 ── RIGHTS ASSOCIATED WITH PATENTS ────────────────────────────── */
  slide({
    id: 'rm3-rights',
    kicker: 'Rights associated with patents',
    title: 'Negative rights in court',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={6} />} tone={3} layout="process" takeaway="Patent rights are negative rights — the owner restricts others from making, using, distributing, importing or selling.">
        <Points items={[
          'Patent owner decides who may or may not use the patented invention',
          'Cannot be commercially made, used, distributed, imported or sold without consent',
          'Owner may permit third parties on mutually agreed terms (licensing)',
          'Rights are negative — restricting others without prior permission',
          'Patent holder may sue infringing party for injunction + compensation',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 37 aligned.',
  }),

  /* ── 30 ── ENFORCEMENT ────────────────────────────────────────────────── */
  slide({
    id: 'rm3-enforcement',
    kicker: 'Enforcement of patent rights',
    title: 'Owner monitors; courts act',
    content: (
      <Deck density="dense" active={6} visual={<PatentPipeline stage={6} focus="Use" />} tone={3} takeaway="Enforcement is the patent owner's primary responsibility — courts have authority to stop infringement.">
        <Definition term="Enforcement">Process of ensuring compliance with laws, regulations, rules, standards and social norms.</Definition>
        <Points items={[
          'Patent rights are usually enforced by judicial courts',
          'Court of Law has authority to stop patent infringement',
          'Main responsibility for monitoring, identifying and taking action against infringers lies with the patent owner',
          'Proactive monitoring (freedom-to-operate watches, market surveillance) recommended',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 38 aligned.',
  }),

  /* ── 31 ── ELIGIBLE INVENTIONS ────────────────────────────────────────── */
  slide({
    id: 'rm3-elig',
    kicker: 'Eligible inventions',
    title: 'Paper clip to penicillin derivatives',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={1} focus="Prior art" />} tone={3} reverse layout="process" takeaway="Improvements over existing inventions are the most common patent grants — everyday products bundle many patents.">
        <Points items={[
          'Patents granted in any field — paper clip, ballpoint pen, nanotechnology chip, Harvard mouse (cancer genes)',
          'Majority of patents are for improvements over existing inventions — not only major breakthroughs',
          'Penicillin and its derivatives (second, third, fourth generation) — each generation separately patentable',
          'Daily-use patented items: toothbrush, toothpaste, shoes, mobile phones, bicycles, televisions, cold drinks',
          'Complex products carry hundreds of patents: laptop computer, car, mobile phone, television',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 39–40 aligned.',
  }),

  /* ── 32 ── NON-PATENTABLE — PART 1 ───────────────────────────────────── */
  slide({
    id: 'rm3-non-1',
    kicker: 'Non-patentable matters · Part 1',
    title: 'Morality, discovery, new form, frivolous',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={1} />} tone={3} reverse layout="process" takeaway="Section 3 Patents Act 1970 lists exclusions — knowing them averts wasted filings.">
        <Cards items={[
          ['Contrary to morality / public order','Method for human cloning, method for gambling'],
          ['Mere discovery','Finding a microorganism in nature, laws of gravity — not patentable'],
          ['New form of known substance','Use of aspirin for heart treatment — aspirin already patented for fever/pain relief'],
          ['Frivolous invention','Dough supplemented with herbs (only taste change), 100-year calendar, bus timetable'],
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 41 aligned.',
  }),

  /* ── 33 ── NON-PATENTABLE — PART 2 ───────────────────────────────────── */
  slide({
    id: 'rm3-non-2',
    kicker: 'Non-patentable matters · Part 2',
    title: 'Arrangements, atomic energy, literary works',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={1} />} tone={3} reverse layout="process" takeaway="Atomic energy materials and works governed by other statutes are explicitly excluded from patents.">
        <Cards items={[
          ['Arrangement or rearrangement','Umbrella fitted with a fan; torch attached to a bucket — no technical advance'],
          ['Atomic Energy Act s.20(1)','Uranium, Beryllium, Thorium, Plutonium, Radium, Graphite, Lithium and Central Govt notified materials'],
          ['Literary / dramatic / musical / artistic','Books, sculptures, paintings, computer programmes, mathematical calculations — governed by Copyright Act 1957'],
          ['Business / teaching methods','Online chatting method, method of teaching, method of learning a language — not patentable'],
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 42 aligned.',
  }),

  /* ── 34 ── NON-PATENTABLE — PART 3 ───────────────────────────────────── */
  slide({
    id: 'rm3-non-3',
    kicker: 'Non-patentable matters · Part 3',
    title: 'IC topography, plants/animals, traditional knowledge',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={1} />} tone={3} reverse layout="process" takeaway="IC layouts, biological material and TK each have specialised protection or are excluded by statute.">
        <Cards items={[
          ['IC topography','Layout designs of integrated circuits — protected under Semiconductor Integrated Circuit Layout Designs Act 2000, not Patents Act'],
          ['Plants and animals','Plants and animals in whole or any part, seeds, varieties and species, essentially biological processes — excluded from patent scope'],
          ['Traditional knowledge','An invention that is in effect traditional knowledge or aggregation/duplication of known properties of traditionally known components — excluded'],
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 43 aligned.',
  }),

  /* ── 35 ── INFRINGEMENT ───────────────────────────────────────────────── */
  slide({
    id: 'rm3-inf',
    kicker: 'Patent infringements',
    title: 'Direct, indirect and reliefs',
    content: (
      <Deck density="dense" active={6} visual={<PatentPipeline stage={6} />} tone={3} takeaway="Reliefs: interlocutory injunction, damages/accounts of profits, permanent injunction.">
        <Compare
          leftTitle="Direct infringement"
          rightTitle="Indirect infringement"
          left={[
            'Product substantially close to patented product',
            'Commercial use / marketing without owner permission',
          ]}
          right={[
            'Deceit or accidental infringement without intention',
            'Still actionable — patentee may sue via judicial intervention',
          ]}
        />
        <Points items={[
          'Reliefs: Interlocutory / interim injunction (temporary court order)',
          'Damages or accounts of profits',
          'Permanent injunction',
          'Central Govt right to use (s.100 Patents Act 1970, Rule 32 Patents Rules 2003) in national emergency / extreme urgency after notifying owner',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 44–45 aligned.',
  }),

  /* ── 36 ── PUBLIC DISCLOSURE BEFORE FILING ────────────────────────────── */
  slide({
    id: 'rm3-disc',
    kicker: 'Avoid public disclosure before filing',
    title: 'Protect novelty',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={1} focus="Prior art" />} tone={3} reverse layout="process" takeaway="Publication or display before filing destroys novelty; use NDAs when investor disclosure is unavoidable.">
        <Points items={[
          'Invention published or publicly displayed → loses Novelty criterion → cannot be patented',
          'Grace period of 12 months available from date of publication in journal / reputed scientific society / exhibition (PPT framing)',
          'Investor disclosure may be unavoidable — sign an NDA or other confidential agreement',
          'Conference abstracts, lab demos, social media posts can all trigger novelty destruction',
        ]} />
        <Example label="EcoSense EnergyController">Filing before the campus demo day is non-negotiable — posting a detailed YouTube walkthrough even the night before destroys novelty internationally.</Example>
      </Deck>
    ),
    notes: 'PPT slide 46 aligned.',
  }),

  /* ── 37 ── PROCESS DIVIDER ────────────────────────────────────────────── */
  slide({
    id: 'rm3-procdiv',
    kicker: 'Process',
    title: 'Process of Patenting',
    hideTitle: true,
    content: (
      <Divider number="Process" title="Process of Patenting" subtitle="One invention document advances through legal gates." visual={<PatentPipeline stage={4} />} />
    ),
    notes: 'div',
  }),

  /* ── 38 ── PROCESS OVERVIEW ───────────────────────────────────────────── */
  slide({
    id: 'rm3-proc-overview',
    kicker: 'Process overview',
    title: '3–4 years from filing to grant',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={3} focus="Publish" />} tone={3} reverse layout="process" takeaway="The Indian patent process can take 3–4+ years; each step is a mandatory legal gate.">
        <Flow items={['Prior art','File','Publish (18 m)','Pre-grant opp.','Request exam','FER / reply','Grant','Post-grant opp.','Validity / renew','Commercialise']} />
        <Lead>In India the process of grant of a patent is a lengthy procedure that may take anywhere 3–4 years or more. Major steps are available at ipindiaonline.gov.in/ePatentfiling.</Lead>
      </Deck>
    ),
    notes: 'PPT slide 47 aligned.',
  }),

  /* ── 39 ── PRIOR ART — DEFINITION ────────────────────────────────────── */
  slide({
    id: 'rm3-prior-def',
    kicker: 'Prior art search · What it is',
    title: 'Everything in the public domain',
    content: (
      <Deck density="dense" active={6} visual={<PriorArtScan />} tone={3} takeaway="Prior art is all information public before your filing / priority date — search it before investing in an application.">
        <Definition term="Prior art">Information lying in the public domain in any form, either before the filing of the patent application or the priority date of the patent application claiming the invention.</Definition>
        <Points items={[
          'Search averts infringement, tracks R&D and reveals detailed technical information',
          'Parameters: novelty, patentability, state of the art, infringement, validity, freedom to operate',
          'Two source categories: (A) Patent databases and (B) Non-Patent Literature (NPL)',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 48–49 aligned.',
  }),

  /* ── 40 ── PRIOR ART — PATENT DATABASES ──────────────────────────────── */
  slide({
    id: 'rm3-prior-db',
    kicker: 'Prior art search · Patent databases',
    title: 'InPASS, Patentscope, Espacenet and more',
    content: (
      <Deck active={6} visual={<PriorArtScan />} tone={3} reverse layout="process" takeaway="Use multiple patent databases for comprehensive novelty search — InPASS for India, Patentscope for WIPO.">
        <Cards items={[
          ['InPASS','Indian Patent Advanced Search System — ipindiaservices.gov.in/publicsearch'],
          ['Patentscope','WIPO — wipo.int/patentscope'],
          ['Espacenet','EU/EPO — worldwide.espacenet.com/patent'],
          ['USPTO','USA — uspto.gov'],
          ['Google Patents','patents.google.com/advanced'],
          ['Orbit Intelligence','Questel — business-intelligence-software/orbit-intelligence'],
          ['Derwent Innovation','Clarivate — comprehensive analytics'],
          ['ProQuest','about.proquest.com — patent + scholarly blend'],
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 50 aligned.',
  }),

  /* ── 41 ── PRIOR ART — NPL ────────────────────────────────────────────── */
  slide({
    id: 'rm3-prior-npl',
    kicker: 'Prior art search · Non-Patent Literature',
    title: 'Journals, dissertations, industry disclosures',
    content: (
      <Deck density="dense" active={6} visual={<PriorArtScan />} tone={3} takeaway="NPL covers all non-patent public disclosures — a blog post or a YouTube video can be prior art.">
        <Compare
          leftTitle="Scholarly / academic"
          rightTitle="Industry & others"
          left={[
            'Handbooks, textbooks, encyclopedias',
            'Journals: IEEE, ResearchGate, Springer, Wiley, etc.',
            'Dissertations / theses',
            'NCBI PubMed, conference proceedings, technical reports',
            'Withdrawn patents',
          ]}
          right={[
            'Industry reviews and public disclosures',
            'Social media, YouTube, books, magazines',
            'Datasheets, blueprints',
            'Newspapers, websites, technology blogs',
            "Researchers' personal websites",
          ]}
        />
      </Deck>
    ),
    notes: 'PPT slide 51 aligned.',
  }),

  /* ── 42 ── CHOICE OF APPLICATION ─────────────────────────────────────── */
  slide({
    id: 'rm3-choice',
    kicker: 'Choice of application',
    title: 'Which filing vehicle?',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={2} focus="File" />} tone={3} layout="process" takeaway="Match filing type to maturity and priority needs — provisional secures the date while you finish experiments.">
        <Cards items={[
          ['Provisional application','Invention not fully finalised; secures priority date while experiments continue'],
          ['Ordinary / complete','Full specifications and claims; no foreign priority claimed'],
          ['Convention application','Claims priority from an earlier foreign filing (12-month window, Paris Convention)'],
          ['PCT (National Phase)','Single application for all PCT member countries; deferred national examination'],
          ['Divisional application','Split parent application when multiple inventions discovered in it'],
          ['Patent of Addition','Improvement or modification of existing patent; no separate renewal fee'],
        ]} />
      </Deck>
    ),
    notes: 'PPT + syllabus gap: Choice of Application.',
  }),

  /* ── 43 ── PATENT APPLICATION FORMS ──────────────────────────────────── */
  slide({
    id: 'rm3-forms-app',
    kicker: 'Patent application forms',
    title: 'Form-1 and Form-2',
    content: (
      <Deck density="dense" active={6} visual={<PatentPipeline stage={2} focus="File" />} tone={3} takeaway="Form-1 holds bibliographic data; Form-2 holds technical content — provisional or complete.">
        <Compare
          leftTitle="Form-1 — bibliographic"
          rightTitle="Form-2 — technical"
          left={[
            'Title of application',
            'Names of applicant(s) and inventor(s)',
            'Type: Ordinary / Convention / PCT-NP / Divisional / Patent of Addition',
            'Filed per s.7/s.135 / rule 20 sub-rule (1)',
          ]}
          right={[
            'Provisional: description of invention + abstract only',
            'Complete: description + abstract + claims + manner of performing',
            'Claims define the actual legal boundary of the invention',
            'Claims: Independent (stand-alone) and Dependent (on independent claim)',
          ]}
        />
      </Deck>
    ),
    notes: 'PPT slide 52 aligned.',
  }),

  /* ── 44 ── CLAIMS ─────────────────────────────────────────────────────── */
  slide({
    id: 'rm3-claims',
    kicker: 'Patent claims',
    title: 'Legal boundary of protection',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={2} focus="File" />} tone={3} reverse layout="process" takeaway="Claims are the most critical part of a patent — they define precisely what is and is not protected.">
        <Points items={[
          'Claims are the crucial part of specifications — they define the actual boundary of the invention',
          'Specify what is claimed and what is sought to be protected',
          'Clearly describe what the patent does and does not cover',
          'Expressed as a declaration of technical particulars in legal terms',
          'Independent Claims: stand-alone; broaden the scope',
          'Dependent Claims: dependent on independent claim; add narrowing detail',
          'Must be drafted precisely and carefully — to protect against infringers and to survive examination',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 53 aligned.',
  }),

  /* ── 45 ── JURISDICTION ───────────────────────────────────────────────── */
  slide({
    id: 'rm3-jur',
    kicker: 'Jurisdiction of filing',
    title: 'Four Patent Offices in India',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={2} focus="File" />} tone={3} reverse layout="process" takeaway="File in the patent office whose jurisdiction matches your residence, domicile, place of business, or origin of invention.">
        <Cards items={[
          ['Northern (New Delhi)','Haryana, HP, Punjab, Rajasthan, UP, Uttarakhand, Delhi, J&K, Ladakh, Chandigarh UT'],
          ['Southern (Chennai)','AP, Karnataka, Kerala, Tamil Nadu, Telangana, Pondicherry, Lakshadweep'],
          ['Western (Mumbai)','Maharashtra, Gujarat, MP, Goa, Chhattisgarh, Daman & Diu, Dadra & Nagar Haveli'],
          ['Eastern (Kolkata)','Rest of India'],
        ]} />
        <Lead>Foreign applicant: address for service in India or patent agent's place of business determines the appropriate office. Joint applications: all applicants have equal rights.</Lead>
      </Deck>
    ),
    notes: 'PPT slides 55–57 / Table 1 aligned.',
  }),

  /* ── 46 ── PUBLICATION ────────────────────────────────────────────────── */
  slide({
    id: 'rm3-pub',
    kicker: 'Publication',
    title: '18-month secrecy window',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={3} focus="Publish" />} tone={3} reverse layout="process" takeaway="Applications are secret for 18 months then published in the Official Journal — unless early publication is requested via Form-9.">
        <Points items={[
          'After filing, application is kept secret for 18 months in the Patent Office',
          'After 18 months from filing date (or priority date, whichever earlier) — published in Official Journal of Patent Office (ipindia.nic.in/journalpatents.htm)',
          'Purpose: inform public about the invention; mandatory step',
          'Early publication available: applicant files Form-9 with Controller General (e.g., to attract investor or licensee)',
          'Early publication reduces secrecy period but also starts the pre-grant opposition window sooner',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 58 aligned.',
  }),

  /* ── 47 ── PRE-GRANT OPPOSITION ──────────────────────────────────────── */
  slide({
    id: 'rm3-pregrant',
    kicker: 'Pre-grant opposition',
    title: '6 months from publication to challenge',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={3} focus="Publish" />} tone={3} reverse layout="process" takeaway="Any person may challenge the application within 6 months of publication — outcome is rejection or forwarding to examination.">
        <Points items={[
          'Anyone with objection approaches Controller of Patents within 6 months from publication date',
          'Outcome: patent application may be rejected OR recommended for examination',
          'Term "patentee" defined: person/organisation who owns the granted patent',
          'Secrecy period (18 months) can be reduced under special circumstances (Form-9 early publication)',
          'Grounds for pre-grant opposition overlap with examination criteria (novelty, inventive step, eligible subject matter)',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 59 aligned.',
  }),

  /* ── 48 ── EXAMINATION ────────────────────────────────────────────────── */
  slide({
    id: 'rm3-exam',
    kicker: 'Examination',
    title: 'Form-18A within 48 months',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={4} focus="Examine" />} tone={3} reverse layout="process" takeaway="Examination is NOT automatic — the applicant must request it via Form-18A within 48 months of filing.">
        <Points items={[
          'Patent examination is a critical step — all novelty/inventive-step criteria scrutinised by professionals',
          'Examiner raises queries/doubts (First Examination Report — FER) which inventors must address',
          'Once examiner is satisfied → application recommended for grant',
          'Examination is NOT automatic after publication — applicant must request examination',
          'File Form-18A and submit within 48 months of filing date',
          'Examiner issues FER; inventor responds; further objections complied → grant; not complied → rejection',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 60 aligned.',
  }),

  /* ── 49 ── GRANT ──────────────────────────────────────────────────────── */
  slide({
    id: 'rm3-grant',
    kicker: 'Grant of a patent',
    title: 'Published every Friday',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={5} focus="Grant" />} tone={3} reverse layout="process" takeaway="After all objections are resolved the patent is granted and published in the Official Journal — every Friday.">
        <Points items={[
          'After fulfilling all requirements (all examiner and public objections addressed) → patent granted to applicant',
          'Granted patent published in Official Journal of the Patent Office',
          'Journal published every Friday; contains: s.11A publications, post-grant publications, restoration notices, non-working patent lists, public notices',
          'Grant date is important — post-grant opposition window of one year opens from grant publication date',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 61 aligned.',
  }),

  /* ── 50 ── VALIDITY & RENEWAL ─────────────────────────────────────────── */
  slide({
    id: 'rm3-validity',
    kicker: 'Validity of patent protection',
    title: '20 years + annual renewal',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={5} focus="Grant" />} tone={3} reverse layout="process" takeaway="20-year protection from filing date; non-payment of annual renewal fee cancels the patent.">
        <Points items={[
          'Patent protection granted for 20 years from date of filing',
          'Renewal: pay Patent Renewal Fee annually as per s.53, Rule 80 Indian Patents Act',
          'Non-payment → cancellation of patent',
          'Some countries extend beyond 20 years to compensate for regulatory approval delay',
          'Form-27 required annually: information on commercialisation/working of the patent ("Working/Licensing of the Patent")',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 63 aligned.',
  }),

  /* ── 51 ── POST-GRANT OPPOSITION & GROUNDS ───────────────────────────── */
  slide({
    id: 'rm3-post-grant',
    kicker: 'Post-grant opposition',
    title: 'One year to challenge; six grounds',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={5} focus="Grant" />} tone={3} reverse layout="process" takeaway="A granted patent can be invalidated by Patent Office or Court within 1 year on six statutory grounds.">
        <Points items={[
          'Challenge within 1 year from date of publication of grant',
          'Via Patent Office or Court of Law — both can invalidate / revoke',
          'Ground 1: applicant wrongfully obtained the invention',
          'Ground 2: invention published before priority date',
          'Ground 3: invention publicly known / used before priority date',
          'Ground 4: invention obvious — lacks inventive step',
          'Ground 5: subject of claim not patentable (Chapter II Patents Act 1970)',
          'Ground 6: specifications do not sufficiently and clearly describe the invention',
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 64 aligned.',
  }),

  /* ── 52 ── COMMERCIALISATION — OVERVIEW ──────────────────────────────── */
  slide({
    id: 'rm3-comm-1',
    kicker: 'Commercialisation · Part 1',
    title: 'Licensing a patent',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={6} focus="Use" />} tone={3} reverse layout="process" takeaway="Licensing converts patent rights into revenue — used when owner lacks capacity, market reach or manufacturing.">
        <Points items={[
          'Patent owner may grant permission to individual/organisation/industry to make, use and sell the invention',
          'Terms agreed between involving parties',
          'Reasons to license: owner has decent job (e.g., university professor) and no desire to exploit alone',
          'Owner may lack manufacturing facilities',
          'Manufacturing facility unable to meet market demand',
          'Owner wants to concentrate on one geographic market; license other markets',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 65–67 aligned.',
  }),

  /* ── 53 ── COMMERCIALISATION — EXCLUSIVE VS NON-EXCLUSIVE ────────────── */
  slide({
    id: 'rm3-comm-2',
    kicker: 'Commercialisation · Part 2',
    title: 'Exclusive vs non-exclusive licence',
    content: (
      <Deck density="dense" active={6} visual={<PatentPipeline stage={6} focus="Use" />} tone={3} takeaway="Exclusive licence provides one licensee sole rights; non-exclusive allows multiple parties — Form-27 annual reporting required.">
        <Compare
          leftTitle="Exclusive licence"
          rightTitle="Non-exclusive licence"
          left={[
            'Patent sold to one individual/organisation for a fixed time period',
            'No other entity may exploit the relevant IP during that period',
            'Higher royalty typically',
          ]}
          right={[
            'Patentee can sell rights to as many parties as desired',
            'Multiple licensees compete — lower individual royalty',
            'Broader market penetration',
          ]}
        />
        <Lead>Annual Form-27 required: information on commercialisation/working of the patent. Only the patentee has the right to licence or deal with the patent.</Lead>
      </Deck>
    ),
    notes: 'PPT slides 68–69 aligned.',
  }),

  /* ── 54 ── PATENT ATTORNEY / AGENT ───────────────────────────────────── */
  slide({
    id: 'rm3-attorney',
    kicker: 'Patent attorney / agent',
    title: 'Why professional help matters',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={2} focus="File" />} tone={3} reverse layout="process" takeaway="Applicants can file without an attorney but given complexity it is strongly advisable — foreign applicants are often required to appoint one.">
        <Points items={[
          'Applicants can prepare and file patent applications without assistance',
          'Given complexity of patent documents, legal assistance from a patent attorney/agent strongly advisable for drafting',
          'Many countries\' legislation requires applicants whose ordinary residence or principal business is outside the country to be represented by a locally qualified attorney/agent',
          'Indian law: foreign applicant must have an address for service in India (often through an Indian patent agent)',
          'Patent agents in India are registered with and regulated by the Indian Patent Office',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 70–71 aligned.',
  }),

  /* ── 55 ── WORLDWIDE PATENT & PCT ────────────────────────────────────── */
  slide({
    id: 'rm3-world',
    kicker: 'Worldwide patent? PCT?',
    title: 'Territorial rights + regional offices',
    content: (
      <Deck active={6} visual={<PriorArtScan />} tone={3} reverse layout="process" takeaway="There is no world patent — file nationally, regionally, or via PCT for multi-country coverage.">
        <Points items={[
          'No Universal Patent / World Patent / International Patent — rights are territorial',
          'Must file with Patent Office of each country where protection is sought',
          'Regional offices ease multi-country filing: European Patent Office (EPO), African Regional Intellectual Property Organization (ARIPO)',
          'PCT (Patent Cooperation Treaty): single application for protection in all PCT member countries',
          'India is a member of PCT along with over 190 nations',
          'PCT delays national-phase examination — useful for assessing commercial potential before large fees',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 72–74 aligned.',
  }),

  /* ── 56 ── FIRST FILE INDIA / FFP ────────────────────────────────────── */
  slide({
    id: 'rm3-first-india',
    kicker: 'First file India + FFP',
    title: 'Mandatory domestic priority and exceptions',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={3} />} tone={3} layout="process" takeaway="Indian residents must generally file in India first; Foreign Filing Permission (FFP) is required for exceptions.">
        <Points items={[
          'Indian residents must file first in India — prior approval needed to file abroad',
          'Approval waived: applicant is NOT an Indian resident',
          'Approval waived: 6 weeks have expired since Indian filing (deemed clearance)',
          'FFP required: two or more inventors in foreign country, one Indian resident — invention has no Indian market',
          'FFP required: international collaboration where one part of invention originated in India',
          'FFP required: invention related to defence or atomic energy (cannot be patented in India)',
          'FFP also applies to utility model: utility model not patentable subject matter in India',
        ]} />
      </Deck>
    ),
    notes: 'PPT slides 75–77 aligned.',
  }),

  /* ── 57 ── FEE STRUCTURE ──────────────────────────────────────────────── */
  slide({
    id: 'rm3-fee',
    kicker: 'Fee structure',
    title: 'E-filing is 10% cheaper',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={2} focus="File" />} tone={3} reverse layout="process" takeaway="Fees scale by entity class: natural person < small entity < others. E-filing saves 10%.">
        <Cards items={[
          ['Provisional / Complete spec','₹1,600 / ₹4,000 / ₹8,000 (natural / small entity / others)'],
          ['Request for early publication','₹2,500 / ₹6,250 / ₹12,500'],
          ['Request for examination','₹4,000 / ₹10,000 / ₹20,000'],
          ['Express request for examination','₹5,600 / ₹14,000 / ₹28,000'],
          ['Renewal: 3rd–6th year','₹800 / ₹2,000 / ₹4,000 annually'],
          ['Renewal: 11th–15th year','₹4,800 / ₹12,000 / ₹24,000 annually'],
        ]} />
        <Lead>Over 30 patent-related forms exist (Table 2). Electronically filed applications are 10% cheaper than physical filing. Source: ipindia.nic.in — Patents Rules 2003 (updated).</Lead>
      </Deck>
    ),
    notes: 'PPT slides 78–80 aligned.',
  }),

  /* ── 58 ── TYPES OF PATENT APPLICATIONS ──────────────────────────────── */
  slide({
    id: 'rm3-types',
    kicker: 'Types of patent applications',
    title: 'Provisional, ordinary, PCT and more',
    content: (
      <Deck active={6} visual={<PatentPipeline stage={2} focus="File" />} tone={3} reverse layout="process" takeaway="Choose the application type that matches your filing maturity, territory and priority needs.">
        <Cards items={[
          ['Provisional','Filed when invention not fully finalised; some part still under experimentation; secures priority date'],
          ['Ordinary application','Filed with complete specifications and claims; no priority date claimed'],
          ['PCT application','International filing under PCT; one application covers all PCT member countries; claim priority in all member nations'],
          ['Convention application','Claims priority from a foreign filing (must file within 12 months of foreign filing date)'],
          ['Divisional application','Split from a parent application when more than one invention identified in parent'],
          ['Patent of Addition','For an improvement or modification of a patented invention; coterminous with parent'],
        ]} />
      </Deck>
    ),
    notes: 'PPT slide 81 aligned.',
  }),

  /* ── 59 ── ADMINISTRATIVE LITERACY — TERMS / BODIES / UTILITY MODELS ─── */
  slide({
    id: 'rm3-admin-lit',
    kicker: 'Administrative literacy',
    title: 'Commonly used terms, national bodies, utility models',
    content: (
      <Deck density="dense" active={6} visual={<PatentPipeline stage={3} />} tone={3} takeaway="Know the paperwork ecosystem — terms, bodies and utility model gaps — before inventing in public.">
        <Compare
          leftTitle="Key terms"
          rightTitle="Bodies & utility models"
          left={[
            'Priority date — filing or claimed foreign date',
            'Specification — complete technical disclosure',
            'Claims — legal boundary of protection',
            'Patentee — holder of a granted patent',
            'Assignment — transfer of patent ownership',
            'Licence — permission to use the patent',
            'Prior art — all public knowledge before priority date',
          ]}
          right={[
            'CGPDTM / IPO — primary patent authority',
            'DPIIT — policy oversight',
            'TIFAC — awareness and forecasting',
            'NRDC — filing and commercialisation support',
            'CIPAM — promotion and enforcement',
            'Utility models: lower inventive step threshold; India does NOT have a utility model system — inventions in this domain must meet full patent criteria or seek protection abroad',
          ]}
        />
      </Deck>
    ),
    notes: 'Syllabus gap: terms / bodies / utility models.',
  }),

  /* ── 60 ── RESOURCE HUB ───────────────────────────────────────────────── */
  slide({
    id: 'rm3-res',
    kicker: 'After the lecture',
    title: 'Notes and practice',
    content: (
      <Deck active={6} full takeaway="Resources to consolidate Module 3 learning." tone={3}>
        <ResourceHub moduleId="module-3" />
      </Deck>
    ),
    notes: 'ResourceHub finale.',
  }),
]

/**
 * BRMK557 Research Methodology & IPR — Module 5
 * Design, Origin & IP Ecosystem
 * Target: 50 slides
 *
 * Covers: Industrial Designs, Geographical Indications, Patent case studies
 * (Turmeric, Neem, Basmati, Apple v Samsung), IP organisations, schemes.
 * All case studies use textbook-level narrative — no invented facts or damages.
 */
import './rmIpr.css'
import {
  slide, Deck, Points, Lead, Definition, Flow, Compare, Cards, Divider, ResourceHub,
  IndustrialDesignScene, GiMap, IpEcosystem, CopyrightLayer,
  DocumentJourney, DecisionTree, InnovationJourney, CaseTimeline,
} from './components/RmKit.jsx'

export const rmIprModule5Slides = [

  /* ── OPENER ─────────────────────────────────────────────── */
  slide({
    id: 'rm5-open',
    kicker: 'BRMK557 · Module 5',
    title: 'Design, Origin & IP Ecosystem',
    hideTitle: true,
    content: (
      <Divider number="Module 5" title="Design, Origin & IP Ecosystem" subtitle="Appearance, origin, and institutions complete the IP ecosystem." visual={<IpEcosystem />} />
    ),
    notes: 'opener',
  }),

  slide({
    id: 'rm5-multi',
    kicker: 'One product, many rights',
    title: 'Synthesis preview — five IP tools',
    content: (
      <Deck active={7} visual={<IpEcosystem />} tone={5} takeaway="Each layer of a product may need a different IP tool — choose deliberately, not by default.">
        <Cards items={[
          ['Technology','Patent — protects the technical solution or process (20-year term)'],
          ['Appearance','Industrial design — protects visual features of an article (10+5 years)'],
          ['Brand','Trademark — protects source identifier (10-year, renewable indefinitely)'],
          ['Creative content','Copyright — protects original expression (life + 60 years, automatic)'],
          ['Geographic reputation','GI — protects place-linked product reputation (registered, renewable)'],
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  /* ================================================================
     SECTION A — INDUSTRIAL DESIGNS
  ================================================================ */
  slide({
    id: 'rm5-ddiv',
    kicker: 'Industrial Designs',
    title: 'Appearance protection',
    hideTitle: true,
    content: (
      <Divider number="A" title="Industrial Designs" subtitle="Protecting how a product looks." visual={<IndustrialDesignScene />} />
    ),
    notes: 'div',
  }),

  slide({
    id: 'rm5-des-intro',
    kicker: 'What is an industrial design?',
    title: 'The look of a product — not how it works',
    content: (
      <Deck density="dense" active={7} visual={<DocumentJourney stages={['Product','Appearance','File','Rights']} />} tone={5} takeaway="Industrial design protects visual features — it fills the gap between patent (function) and copyright (creative expression).">
        <Definition term="Industrial design">
          The ornamental or aesthetic aspect of an article — features of shape, configuration, pattern, or ornament applied to an article by any industrial process, which in the finished article appeal to and are judged solely by the eye.
        </Definition>
        <Compare
          leftTitle="Function — patent domain"
          rightTitle="Appearance — design domain"
          left={[
            'How the product works',
            'Technical mechanism or process',
            'Protected by patent',
          ]}
          right={[
            'How the product looks',
            'Shape, colour, pattern, ornament',
            'Protected by industrial design registration',
          ]}
        />
      </Deck>
    ),
    notes: '__gap:syllabus Industrial Designs introduction.',
  }),

  slide({
    id: 'rm5-des-law',
    kicker: 'Legal framework',
    title: 'Designs Act 2000 — India',
    content: (
      <Deck active={7} visual={<IndustrialDesignScene />} tone={5} reverse takeaway="India's Designs Act 2000 replaced the 1911 Act and aligns with international standards for design protection.">
        <Points items={[
          'Designs Act 2000 (in force from 11 May 2001) — replaced Designs Act 1911',
          'Administered by: CGPDTM — the same controller who manages patents and trademarks',
          'Registration possible for: shapes, configurations, patterns, ornaments, composition of lines or colours applied to any article by industrial process',
          'Article must be finished by an industrial or mechanical process — handcraft-only articles may qualify separately',
          'Design Rights are territorial — registration in India gives no protection abroad',
          'International protection via the Hague System (WIPO) — India is not yet a member as of the syllabus period; applicants must file separately in each country',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Designs Act 2000 framework.',
  }),

  slide({
    id: 'rm5-des-elig',
    kicker: 'Eligibility criteria',
    title: 'New · Original · Not previously published',
    content: (
      <Deck active={7} visual={<DecisionTree question="Appearance?" left="Design right" right="Function only" />} tone={5} reverse takeaway="A design is registrable if it is new and original and has not been disclosed to the public before the date of application.">
        <Cards items={[
          ['New','Not previously known or used — assessed against designs already in existence'],
          ['Original','Not copied from a known design; involves creative authorship in the visual aspect'],
          ['Not previously published','Disclosed to the public before filing = loss of registrability (no general grace period in Indian design law)'],
          ['Applied to an article','The design must be applied to a physical product — abstract patterns alone do not qualify'],
          ['Appeal to the eye','The visual aspect must be the basis of protection — purely functional features are excluded'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Designs Act eligibility.',
  }),

  slide({
    id: 'rm5-des-non',
    kicker: 'Non-protectable designs',
    title: 'What cannot be registered as a design',
    content: (
      <Deck active={7} visual={<IndustrialDesignScene />} tone={5} reverse takeaway="Purely functional features, immoral designs, and features dictated solely by technical function cannot be registered — they belong to the patent or copyright domain.">
        <Points items={[
          'Any mode or principle of construction — that is the patent domain',
          'Mere mechanical device — protection belongs to a patent, not a design',
          'Features of the article that are not visible during normal use',
          'Scandalous or obscene designs — against public morality',
          'Designs contrary to public order',
          'Flags, emblems, and official signs of states or international organisations',
          'Building and structural designs — covered separately by architectural copyright under Copyright Act',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Non-protectable designs.',
  }),

  slide({
    id: 'rm5-des-reg',
    kicker: 'Registration process',
    title: 'From prior-art search to certificate',
    content: (
      <Deck active={7} visual={<DocumentJourney stages={['Product','Appearance','File','Rights']} />} tone={5} reverse takeaway="Design registration is faster than patent prosecution — typically 3–6 months if no objections are raised.">
        <Flow items={['Prior art search','Application (Form 1 + representations)','Examination','Objections addressed','Registration certificate','Publication in Designs Journal']} />
        <Points items={[
          'Application filed at any of the four Patent Office branches (same as patents)',
          'Must include: representations (drawings, photographs, or specimens) clearly showing the design',
          'Examiner checks novelty and compliance — may raise objections',
          'Once registered: published in Official Designs Journal',
          'Registration is proof of ownership but may be challenged for cancellation',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Design registration procedure.',
  }),

  slide({
    id: 'rm5-des-dur',
    kicker: 'Duration and renewal',
    title: 'Initial 10 years + 5 years extension',
    content: (
      <Deck density="dense" active={7} visual={<IndustrialDesignScene />} tone={5} takeaway="A total of 15 years maximum — far shorter than patent or trademark; plan commercialisation to extract value within the window.">
        <Compare
          leftTitle="Initial term"
          rightTitle="Extension"
          left={[
            '10 years from the date of registration',
            'Automatic on registration — no annual renewal needed',
            'Rights are in force from filing date',
          ]}
          right={[
            'May be extended by 5 years on application before expiry',
            'Maximum total protection: 15 years',
            'After 15 years: design enters public domain; anyone can use it',
          ]}
        />
        <Points items={[
          'Compare: Patent — 20 years; Trademark — 10 years renewable indefinitely; Copyright — life + 60 years',
          'Designs are shortest — reflects the rapid pace of product styling change in competitive markets',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Designs Act term and renewal.',
  }),

  slide({
    id: 'rm5-des-locarno',
    kicker: 'Classification',
    title: 'Locarno Classification — 32 classes for industrial designs',
    content: (
      <Deck active={7} visual={<DecisionTree question="Appearance?" left="Design right" right="Function only" />} tone={5} reverse takeaway="The Locarno Agreement provides an international classification for industrial designs — used for search and examination purposes.">
        <Points items={[
          'Locarno Agreement (1968): international classification for industrial designs — 32 classes + subclasses',
          'India uses Locarno classification for design applications',
          'Class examples: Class 12 (transport and hoisting), Class 14 (recording/communication equipment), Class 32 (graphic symbols and logos)',
          'Design applications must specify the correct Locarno class',
          'Class determines examination scope — incorrect classification may cause objection',
          'Searchable internationally via WIPO\'s Global Design Database (Hague Express)',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Locarno classification.',
  }),

  slide({
    id: 'rm5-des-cancel',
    kicker: 'Cancellation',
    title: 'Grounds for design cancellation',
    content: (
      <Deck active={7} visual={<IndustrialDesignScene />} tone={5} reverse takeaway="A registered design can be cancelled if it lacks the fundamental requirements of registration — prior publication or prior use are the most common grounds.">
        <Points items={[
          'Any person interested may petition for cancellation at any time after registration',
          'Grounds for cancellation:',
          ' 1. Design was not new or original at the time of registration',
          ' 2. Design had been published in India or elsewhere before the date of application',
          ' 3. Design is not registrable under the Designs Act 2000',
          ' 4. It is not a design as defined — e.g., it is purely functional',
          'Cancellation petition filed with the Controller of Designs',
          'If cancelled: design is removed from the Register and becomes public domain',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Design cancellation grounds.',
  }),

  slide({
    id: 'rm5-des',
    kicker: 'Industrial design enforcement',
    title: 'Rights, piracy, and remedies',
    content: (
      <Deck active={7} visual={<DocumentJourney stages={['Product','Appearance','File','Rights']} />} tone={5} reverse takeaway="Design rights let the proprietor control commercial use of the registered design — imitation without licence is design piracy.">
        <Points items={[
          'Registered proprietor has the exclusive right to apply the design to the article in the registered class',
          'Without licence: selling, importing, or publishing an article with the registered design is infringement',
          'Civil remedies: injunction, damages or account of profits',
          'Marking: marking articles with the design registration number gives constructive notice to the public',
          'Burden of proof: in infringement proceedings, registered design certificate is prima facie evidence',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus.',
  }),

  slide({
    id: 'rm5-des-overlap',
    kicker: 'Design overlap',
    title: 'Design vs copyright vs patent — where boundaries meet',
    content: (
      <Deck active={7} visual={<IndustrialDesignScene />} tone={5} reverse takeaway="Design, copyright, and patent can overlap — understanding the boundaries avoids misapplication and missed protection opportunities.">
        <Cards items={[
          ['Design vs Copyright','Artistic work not commercially reproduced: copyright. Commercially mass-reproduced article: registered design preferred. Once design registered, copyright in the original artistic work may be restricted.'],
          ['Design vs Patent','Function: patent. Appearance of the article embodying that function: design. Both may be needed simultaneously.'],
          ['Design vs Trademark','3D shape as a source identifier (Coca-Cola bottle shape): may qualify for both design and trademark registration — different time horizons.'],
          ['EcoSense example','Energy controller casing shape → design registration. Control algorithm → patent. "EcoSense" name → trademark. Product manual → copyright.'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Design overlap with other IP.',
  }),

  /* ── APPLE v SAMSUNG ─────────────────────────────────────── */
  slide({
    id: 'rm5-des2',
    kicker: 'Design in practice',
    title: 'Non-protectable elements and design piracy',
    content: (
      <Deck density="dense" active={7} visual={<DecisionTree question="Appearance?" left="Design right" right="Function only" />} tone={5} takeaway="Even a small distinctive design feature can be protected — but purely functional shapes are always excluded.">
        <Compare
          leftTitle="Protectable design features"
          rightTitle="Non-protectable (functional) features"
          left={[
            'Distinctive handle shape with decorative ridges',
            'Specific colour pattern applied to casing',
            'Unique speaker grille pattern on a device',
            'Ornamental cross-section of a chair leg',
          ]}
          right={[
            'Shape dictated entirely by technical function (gear teeth shape)',
            'Features hidden in normal use (internal components)',
            'Features that must fit with another article (must-fit rule)',
            'Standard screw thread — dictated by industrial interface requirement',
          ]}
        />
        <Points items={[
          'Design piracy: copying registered design without licence — civil infringement',
          'Enforcement: marking articles with design registration number gives notice to competitors',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Design piracy and non-protectable elements.',
  }),

  slide({
    id: 'rm5-des3',
    kicker: 'Administration',
    title: 'Forms, classification, trends, treaties',
    content: (
      <Deck active={7} visual={<DocumentJourney stages={['Classify','File','Examine','Register']} />} tone={5} layout="process" takeaway="Classification and treaties support orderly design filing — they do not replace novelty and originality.">
        <Lead>Once eligibility is clear, administration decides how EcoSense’s enclosure look is searched, filed and tracked.</Lead>
        <Points items={[
          'Application forms and Locarno classification organise search and examination',
          'Registration trend in India: growing design awareness among manufacturers and startups',
          'International treaties facilitate cross-border design cooperation — India is not yet in Hague as of the syllabus period',
          'Practical tip: classify the article first, then draft representations that show the protected appearance clearly',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Design administration — forms, classification, trends, treaties.',
  }),

  slide({
    id: 'rm5-apple',
    kicker: 'Case study — Apple vs Samsung',
    title: 'Smartphone design wars',
    content: (
      <Deck active={7} visual={<CaseTimeline title="Apple vs Samsung — design dispute arc" events={[['Design claim','Apple alleged Samsung copied iPhone/iPad product design elements'],['Legal question','Are the registered design features protectable — or purely functional?'],['Courts','Multiple jurisdictions: US, Germany, UK, Netherlands, Korea — varied outcomes'],['Key learning','Appearance and product design have commercial teeth — design protection strategy matters']]} />} tone={5} layout="process" takeaway="The Apple v Samsung litigation confirmed that industrial design rights can be the basis of high-stakes commercial disputes across multiple jurisdictions.">
        <Lead>Textbook-level narrative only — this case illustrates that design protection is a serious competitive tool, not an afterthought.</Lead>
        <Points items={[
          'Apple held registered design rights and utility patents covering the look of iPhone and iPad',
          'Samsung introduced competing smartphones with features Apple alleged were imitated',
          'Design claims centred on: screen shape, icon grid, rounded rectangle form factor',
          'Learning 1: Register designs before product launch — post-launch registration may be barred',
          'Learning 2: Design rights are enforced nationally — multi-country protection requires separate filings',
          'Learning 3: Even partial success in one jurisdiction can force competitor product redesigns',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Apple vs Samsung design dispute.',
  }),

  /* ================================================================
     SECTION B — GEOGRAPHICAL INDICATIONS
  ================================================================ */
  slide({
    id: 'rm5-apple2',
    kicker: 'Apple vs Samsung — design elements',
    title: 'What specific design features were disputed?',
    content: (
      <Deck active={7} visual={<IndustrialDesignScene />} tone={5} reverse takeaway="Design disputes force courts to distinguish between protectable aesthetic features and unprotectable functional requirements — the hardest line to draw.">
        <Points items={[
          'Apple claimed: rounded rectangle form factor, black face down to screen, bezel, grid of icons',
          'Key legal question: are these design features purely aesthetic, or are they functionally dictated?',
          'If a feature is the only way to achieve a technical result, it cannot be protected as a design',
          'If multiple aesthetic options exist to achieve the same result, the chosen aesthetic is protectable',
          'Courts in different countries answered differently — US courts were more sympathetic to Apple than European courts',
          'Learning for engineers: document design decisions (why this shape, not another) — this evidence helps distinguish aesthetic from functional choice',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Apple vs Samsung design elements.',
  }),

  slide({
    id: 'rm5-gidiv',
    kicker: 'Geographical Indications',
    title: 'Origin reputation',
    hideTitle: true,
    content: (
      <Divider number="B" title="Geographical Indications" subtitle="When origin becomes identity." visual={<GiMap />} />
    ),
    notes: 'div',
  }),

  slide({
    id: 'rm5-gi-def',
    kicker: 'What is a GI?',
    title: 'Geographical Indication — definition and rationale',
    content: (
      <Deck density="dense" active={8} visual={<DocumentJourney stages={['Origin','Reputation','Register','Community']} />} tone={5} takeaway="A GI identifies a product as originating in a territory where its quality, reputation, or other characteristic is essentially attributable to that geographic origin.">
        <Definition term="Geographical Indication (GI)">
          An indication that identifies goods as originating in a territory, region, or locality where a given quality, reputation, or other characteristic of the goods is essentially attributable to their geographical origin (TRIPS Article 22(1)).
        </Definition>
        <Points items={[
          'GI protects the collective reputation of producers from a specific region — not individual ownership',
          'Examples: Champagne (France), Darjeeling Tea (India), Scotch Whisky (UK), Basmati Rice (India)',
          'Three criteria: (1) geographic origin clearly identified; (2) link between place and characteristic; (3) a community of legitimate producers exists there',
          'Distinct from trademark: no one producer owns a GI — it belongs to the producer community of the region',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus GI definition and rationale.',
  }),

  slide({
    id: 'rm5-gi-law',
    kicker: 'Legislative framework',
    title: 'GI Act 1999 — India\'s WTO obligation',
    content: (
      <Deck active={8} visual={<GiMap />} tone={5} reverse takeaway="India's GI Act is a TRIPS-mandated obligation — it came into force in 2003 and has protected hundreds of Indian products from misappropriation.">
        <Points items={[
          'Geographical Indications of Goods (Registration and Protection) Act, 1999',
          'Came into force: 15 September 2003',
          'Enacted to fulfil India\'s obligations under TRIPS Article 22 as a WTO member',
          'Geographical Indications of Goods (Regulation and Protection) Rules, 2002',
          'GI Registry: Chennai — maintains the Register of Geographical Indications',
          'GI Journal: Official journal for publication of GI applications — open to opposition',
          'Over 400+ GIs registered in India as of recent years (qualitative reference)',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus GI Act 1999.',
  }),

  slide({
    id: 'rm5-gi-who',
    kicker: 'GI ownership',
    title: 'Who can register and who can use a GI?',
    content: (
      <Deck density="dense" active={8} visual={<GiMap />} tone={5} takeaway="GI registration is by an association or authority representing the producer community — individual producers become authorised users, not owners.">
        <Compare
          leftTitle="Registered Proprietor"
          rightTitle="Authorised User"
          left={[
            'Association of persons, producers, or any organisation',
            'State government or central authority representing the producers',
            'Holds the GI registration on behalf of the community',
            'Cannot prevent genuine local producers from using the indication',
          ]}
          right={[
            'Individual producer / manufacturer located in the GI region',
            'Must meet quality and other standards set for the GI',
            'Applies to the GI Registry for authorised user status',
            'Can take legal action against misuse of the GI',
          ]}
        />
      </Deck>
    ),
    notes: '__gap:syllabus GI ownership and authorised users.',
  }),

  slide({
    id: 'rm5-gi-examples',
    kicker: 'Indian GIs',
    title: 'Registered Geographical Indications from India',
    content: (
      <Deck active={8} visual={<DocumentJourney stages={['Origin','Reputation','Register','Community']} />} tone={5} reverse takeaway="India's GI registry covers agricultural products, handicrafts, foodstuffs, and alcoholic beverages — protecting hundreds of years of regional heritage.">
        <Cards items={[
          ['Darjeeling Tea','First Indian GI (registered 2004) — the "Champagne of teas"; distinctive altitude-grown flavour'],
          ['Kanchipuram Silk Saree','Tamil Nadu — handwoven temple silk with distinctive zari work and colour patterns'],
          ['Mysore Sandal Soap','Karnataka — soap made from Mysore sandalwood oil; unique aroma and quality'],
          ['Kolhapuri Chappal','Maharashtra — traditional leather sandal made by artisans in Kolhapur region'],
          ['Basmati Rice','Protected in India; long-grain aromatic rice from specific Himalayan foothills regions'],
          ['Alponso Mango','Ratnagiri/Sindhudurg, Maharashtra — distinctive variety with specific climate-linked taste profile'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus GI examples from India.',
  }),

  slide({
    id: 'rm5-gi-non',
    kicker: 'Non-registrable GIs',
    title: 'When geographic names cannot be GIs',
    content: (
      <Deck active={8} visual={<GiMap />} tone={5} reverse takeaway="A geographic name that has become generic — the common name for the product regardless of origin — cannot be registered as a GI.">
        <Points items={[
          'Generic names: if a name has become the common name for a type of product (e.g., "cheddar" for cheese style), it cannot be a GI',
          'Misleading indications: names that mislead the public as to the true origin of the goods',
          'Immoral or scandalous indications',
          'Indications that would be contrary to public order',
          'Names that are already protected as trademarks — prior registered trademark may block GI',
          'Indications whose use would be unfair competition under the Paris Convention',
          'Note: the same name may be a GI in one country and generic in another — causes international trade friction',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Non-registrable GIs.',
  }),

  slide({
    id: 'rm5-gi-vs-tm',
    kicker: 'GI vs trademark',
    title: 'Collective identity vs individual brand',
    content: (
      <Deck density="dense" active={8} visual={<GiMap />} tone={5} takeaway="GI and trademark serve different purposes — GI protects collective origin reputation; trademark protects individual commercial identity.">
        <Compare
          leftTitle="GI — Geographical Indication"
          rightTitle="Trademark — Brand Identifier"
          left={[
            'Identifies geographic origin + linked quality',
            'Community-owned — cannot be individually owned',
            'Any legitimate regional producer can use it',
            'Does not expire while the link to geography persists',
            'Protects against misuse by non-regional producers',
          ]}
          right={[
            'Identifies commercial source — one enterprise',
            'Individually owned — one proprietor or joint owners',
            'Licensed to specific parties only',
            'Must be renewed every 10 years and genuinely used',
            'Can protect any distinctive sign, not just geographic names',
          ]}
        />
      </Deck>
    ),
    notes: '__gap:syllabus GI vs trademark.',
  }),

  slide({
    id: 'rm5-gi',
    kicker: 'GI protection',
    title: 'Rights, enforcement, and misuse',
    content: (
      <Deck active={8} visual={<DocumentJourney stages={['Origin','Reputation','Register','Community']} />} tone={5} reverse takeaway="GI protection prevents non-regional producers from falsely claiming the GI — protecting both producers and consumers from fraud.">
        <Points items={[
          'A registered GI prevents: use on non-originating goods, imitation, false description of geographical origin',
          'TRIPS Article 23 provides enhanced protection for wines and spirits — automatic (no need to prove misleading)',
          'India does not distinguish wines/spirits from other goods — same standard of protection under the GI Act',
          'Civil remedies: injunction, damages, delivery-up and destruction of infringing goods',
          'Enforcement challenge: fake GI products sold online require market surveillance — GI Registry and producer associations coordinate',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus with M3 history support.',
  }),

  slide({
    id: 'rm5-gi-reg',
    kicker: 'GI registration procedure',
    title: 'Application to GI Registry — Chennai',
    content: (
      <Deck active={8} visual={<GiMap />} tone={5} reverse takeaway="GI registration is a collective process — the applicant must represent the whole producer community and document the geographic link carefully.">
        <Flow items={['Application filed (GI Registry, Chennai)','Examination','Acceptance + GI Journal publication','Opposition period (3 months)','Registration + GI Certificate']} />
        <Points items={[
          'Application: details of producer group, definition of geographical area, quality/characteristics linked to area, standards and verification method',
          'Opposition: any person may oppose within 3 months of publication in GI Journal',
          'Authorised user registration: separate application by individual producers after GI is registered',
          'Renewal: every 10 years (unlike standard trademark which is also 10 years but can lapse)',
          'No fee for authorised user registration — government policy supports grassroots producers',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus GI registration procedure.',
  }),

  slide({
    id: 'rm5-gi2',
    kicker: 'GI ecosystem and collective marks',
    title: 'GI in India\'s IP toolkit',
    content: (
      <Deck active={8} visual={<GiMap />} tone={5} reverse takeaway="Collective and certification marks can complement GI — understanding all three tools together is essential for protecting region-linked products.">
        <Cards items={[
          ['GI','Geographic origin + linked quality — collective right of the producer community'],
          ['Certification mark','Certifies quality, material, mode of manufacture or other characteristic — not necessarily geographic (ISI, Agmark, Woolmark)'],
          ['Collective mark','Used by members of an association — may relate to origin or standards (e.g., professional body membership)'],
          ['Interaction','A GI product may also carry a certification mark (quality standard) and/or a collective mark (association of producers) — all three can coexist'],
          ['TKDL link','Traditional knowledge often underpins GI products — protecting TK and GI together prevents misappropriation from two directions'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus.',
  }),

  slide({
    id: 'rm5-gi-intl',
    kicker: 'International GI framework',
    title: 'TRIPS · Lisbon · bilateral agreements',
    content: (
      <Deck active={8} visual={<DocumentJourney stages={['Origin','Reputation','Register','Community']} />} tone={5} reverse takeaway="International GI protection is fragmented — TRIPS provides a floor, Lisbon provides a ceiling, and bilateral agreements fill gaps between the two.">
        <Cards items={[
          ['TRIPS Agreement (1994)','Minimum GI protection for all WTO members; enhanced protection for wines and spirits (Article 23)'],
          ['Lisbon Agreement (1958)','Appellations of origin — stronger than TRIPS GI; 30+ member countries; WIPO-administered'],
          ['Geneva Act of Lisbon (2015)','Updated Lisbon to include GIs (not just appellations of origin); broader membership possible'],
          ['Bilateral agreements','India-EU agreements negotiate reciprocal GI recognition — Darjeeling Tea recognition in EU market'],
          ['Relevance to India','India actively negotiates GI recognition abroad; Basmati, Darjeeling, and handicraft GIs are priorities'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus International GI framework.',
  }),

  /* ================================================================
     SECTION C — PATENT CASE STUDIES
  ================================================================ */
  slide({
    id: 'rm5-gi-examples2',
    kicker: 'More Indian GIs',
    title: 'Handicrafts, textiles, and regional foods',
    content: (
      <Deck active={8} visual={<GiMap />} tone={5} reverse takeaway="India's GI portfolio spans agriculture, handicrafts, textiles, and processed goods — reflecting the diversity of regional traditions.">
        <Cards items={[
          ['Chanderi Saree','Madhya Pradesh — fine silk-cotton blend with gold/silver thread work; traditional weaving technique'],
          ['Pochampally Ikat','Telangana — geometric tie-dye resist weaving tradition; UNESCO recognised weaving craft'],
          ['Tirupati Laddu','Andhra Pradesh — GI for prasadam of Tirumala Tirupati temple; specific ingredient and preparation standard'],
          ['Kashmir Pashmina','Jammu & Kashmir — hand-spun, hand-woven pashmina wool from Changthangi goats'],
          ['Darjeeling Tea','West Bengal — first Indian GI; three distinct harvests (flushes) with distinctive muscatel flavour'],
          ['Coorg Orange','Karnataka — distinct citrus variety grown at specific altitude in Kodagu district'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Additional GI examples.',
  }),

  slide({
    id: 'rm5-casesdiv',
    kicker: 'Patent case studies',
    title: 'Traditional knowledge and patents',
    hideTitle: true,
    content: (
      <Divider number="C" title="Patent Case Studies" subtitle="Where intellectual property meets the real world." visual={<CaseTimeline title="TK & Patents" events={[['Tradition','Long use'],['Patent claim','Foreign office'],['Challenge','Evidence and advocacy'],['Outcome','Learning for all inventors']]} />} />
    ),
    notes: 'div',
  }),

  slide({
    id: 'rm5-tk-intro',
    kicker: 'Traditional knowledge and IP',
    title: 'Why TK matters in patent law',
    content: (
      <Deck density="dense" active={8} visual={<IpEcosystem />} tone={5} takeaway="Traditional knowledge held by communities for generations constitutes prior art — even if undocumented in patent databases — and can invalidate patent claims.">
        <Definition term="Traditional Knowledge (TK)">
          Knowledge, know-how, skills, innovations, and practices that are transmitted between generations and developed by indigenous and local communities as part of their cultural or spiritual identity.
        </Definition>
        <Points items={[
          'TK can be oral, undocumented, or embedded in practice — but it is still prior art if it predates the patent claim',
          'Problem: most TK is not in patent databases — examiners in foreign countries cannot find it during prior art search',
          'India\'s response: TKDL (Traditional Knowledge Digital Library) — databases of Ayurveda, Unani, Siddha, Yoga in 5 languages, in patent office format',
          'TKDL is shared with foreign patent offices (EPO, USPTO, JPO) for examination use',
          'Three famous case studies: Turmeric, Neem, Basmati — each challenged a different form of TK misappropriation',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus TK introduction.',
  }),

  slide({
    id: 'rm5-tur',
    kicker: 'Case study — Turmeric',
    title: 'Wound-healing patent challenged by India',
    content: (
      <Deck active={8} visual={<CaseTimeline title="Turmeric / Curcuma case" events={[['Traditional use','Centuries-old use of turmeric for wound healing documented in Indian texts'],['Patent granted','US Patent 5,401,504 granted (1995) for wound-healing use of turmeric'],['India\'s challenge','Indian government filed for re-examination citing ancient Sanskrit texts and published literature as prior art'],['USPTO decision (1997)','Patent revoked — turmeric\'s wound-healing use was well-known traditional knowledge']]} />} tone={5} layout="process" takeaway="Documented traditional knowledge — even in ancient texts — constitutes prior art that can invalidate a granted patent.">
        <Points items={[
          'The US patent claimed: use of turmeric (Curcuma longa) powder for wound healing',
          'India challenged: ancient Sanskrit texts, Dutta (1953) publication documented this use',
          'Result: first successful challenge of a US patent using traditional knowledge — landmark case',
          'Lesson: TK must be documented in patent-searchable formats to be usable as prior art internationally',
          'TKDL was created partly as a direct response to this case',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Turmeric case.',
  }),

  slide({
    id: 'rm5-neem',
    kicker: 'Case study — Neem',
    title: 'Biopesticide patent challenged at EPO',
    content: (
      <Deck active={8} visual={<CaseTimeline title="Neem biopesticide case" events={[['Traditional use','Neem\'s antifungal and pesticide properties known and used in India for generations'],['Patent granted','European Patent (EP0436257) granted to W.R. Grace and USDA for a neem-based fungicide'],['Challenge','Indian government + NGOs + MEPs filed opposition at European Patent Office'],['EPO ruling (2000, 2005)','Patent revoked — prior art established; traditional knowledge documented in Indian literature']]} />} tone={5} reverse layout="process" takeaway="Community knowledge, when organized and submitted as prior art, can successfully challenge and revoke patents in foreign patent offices.">
        <Points items={[
          'The patent claimed a novel fungicide formulation based on neem seed extract',
          'Prior art: Indian research publications and traditional use of neem antifungal properties',
          'Challenge was filed as a formal EPO opposition — required evidence of prior art in patent-searchable form',
          'Lesson: traditional knowledge needs systematic documentation and international sharing to function as prior art',
          'A single strong prior art document is enough to destroy a patent claim — quality over quantity',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Neem case.',
  }),

  slide({
    id: 'rm5-bas',
    kicker: 'Case study — Basmati',
    title: 'Name, geography, and patent conflict',
    content: (
      <Deck active={8} visual={<CaseTimeline title="Basmati rice case" events={[['Origin reputation','Long-grain aromatic rice grown in specific Himalayan foothills region — known for centuries'],['US patent (1997)','RiceTec Inc. granted US patent for Basmati-type rice lines and grains — raised concerns in India and Pakistan'],['India\'s challenge','India formally protested; RiceTec voluntarily surrendered or narrowed several claims after scrutiny'],['Ongoing issue','Basmati GI registered in India; EU GI recognition for Basmati pursued through trade negotiations']]} />} tone={5} reverse layout="process" takeaway="Basmati illustrates how geographic reputation can be threatened by foreign patents and how GI and prior art work together as defences.">
        <Points items={[
          'RiceTec patent covered certain rice varieties and characteristics associated with the Basmati name',
          'India\'s response: prior art challenge + diplomacy + GI registration domestically',
          'Lesson 1: geographic origin products need both GI protection and prior art documentation',
          'Lesson 2: patent challenges and GI negotiations are complementary — not alternative — strategies',
          'Lesson 3: the name "Basmati" is now a recognized GI in India — foreign producers cannot use it',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Basmati case.',
  }),

  slide({
    id: 'rm5-tk-lesson',
    kicker: 'TK case study lessons',
    title: 'What every engineering inventor should know',
    content: (
      <Deck active={8} visual={<IpEcosystem />} tone={5} reverse takeaway="These three cases reveal a systemic problem — and India's systematic response through TKDL and GI law.">
        <Cards items={[
          ['Prior art must be accessible','Traditional knowledge in oral or inaccessible form cannot be found during patent examination — documentation is essential'],
          ['Language barrier','Most patent offices examined in English/European languages; Indian TK was in Sanskrit/regional languages — TKDL solved this'],
          ['Community vs individual','TK belongs to communities; patent law is designed for individual inventors — the mismatch creates misappropriation risks'],
          ['Engineering relevance','As an engineer, verify whether your "innovation" incorporates known traditional methods — cite them; do not claim them as your own'],
          ['TKDL tool','TKDL is shared with EPO, USPTO, JPO — any examiner can now find Indian TK; this protects India\'s knowledge heritage'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus TK case study synthesis.',
  }),

  /* ================================================================
     SECTION D — IP ORGANISATIONS
  ================================================================ */
  slide({
    id: 'rm5-tkdl',
    kicker: 'TKDL — Traditional Knowledge Digital Library',
    title: 'India\'s global shield for traditional knowledge',
    content: (
      <Deck active={8} visual={<IpEcosystem />} tone={5} reverse takeaway="TKDL converts India's vast TK into a format examiners at foreign patent offices can actually use — preventing misappropriation before a bad patent issues.">
        <Points items={[
          'TKDL: collaborative project of Ministry of AYUSH and CSIR — established 2001',
          'Covers: Ayurveda (~ 0.9 million formulations), Unani, Siddha, Yoga (900+ asanas) from 900 classical texts',
          'Available in: English, French, German, Spanish, Japanese — the examination languages of major patent offices',
          'Formatted in TKDL Access Bio-Activity (TKDL-ABA) — compatible with patent office database standards',
          'Access agreements: signed with EPO (2009), USPTO (2009), DPMA Germany, UK IPO — examiners can use TKDL in prior art searches',
          'Result: by 2022 over 300 patent applications rejected or withdrawn globally due to TKDL evidence',
          'Limitation: TKDL is defensive — it prevents bad patents from issuing but does not create rights for India',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus TKDL.',
  }),

  slide({
    id: 'rm5-org-div',
    kicker: 'IP Organisations',
    title: 'India\'s IP ecosystem — institutions and schemes',
    hideTitle: true,
    content: (
      <Divider number="D" title="IP Organisations in India" subtitle="Institutions turn IP law into filing, awareness, and commercialisation support." visual={<DocumentJourney stages={['Policy','Office','Register','Support']} />} />
    ),
    notes: 'div',
  }),

  slide({
    id: 'rm5-ipo',
    kicker: 'Indian Patent Office',
    title: 'CGPDTM — Controller General of Patents, Designs & Trade Marks',
    content: (
      <Deck active={8} visual={<IpEcosystem />} tone={5} reverse takeaway="CGPDTM is the apex administrative authority for patents, designs, and trademarks — not copyright or GI, which have separate Registrars.">
        <Points items={[
          'CGPDTM: head of the Indian IP registration system for patents, designs, and trademarks',
          'Four Patent Office branches: Kolkata (HQ), Delhi, Chennai, Mumbai — each full-service',
          'Kolkata HQ: also processes international patent applications (PCT national phase)',
          'Services: filing, examination, grant/refusal, opposition handling, post-grant management',
          'Online portal: ipindia.gov.in — e-filing, status tracking, form downloads, fee payment',
          'Annual reports and statistics published on IP filing trends in India',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Indian Patent Office / CGPDTM.',
  }),

  slide({
    id: 'rm5-copy-office',
    kicker: 'Copyright Office',
    title: 'Registrar of Copyrights — New Delhi',
    content: (
      <Deck active={8} visual={<CopyrightLayer />} tone={5} takeaway="The Copyright Office is separate from the Patent Office — it handles registration, dispute resolution (via powers of a civil court), and maintains the Register of Copyrights.">
        <Points items={[
          'Headed by the Registrar of Copyrights — operates under the Ministry of Education (not Ministry of Commerce)',
          'Located in New Delhi — no branch offices; all copyright registrations are centralised',
          'Services: registration of copyright, maintenance of register, handling disputes and objections',
          'During proceedings: Registrar has powers of a civil court (summons, discovery, evidence on affidavit)',
          'Online copyright registration: copyright.gov.in — e-filing system, form submission',
          'Copyright Journal: publishes registrations and official notices',
          'Copyright Office also advises government on copyright policy and international treaty implementation',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Copyright Office.',
  }),

  slide({
    id: 'rm5-gi-reg-body',
    kicker: 'GI Registry',
    title: 'GI Registry — Chennai',
    content: (
      <Deck active={8} visual={<GiMap />} tone={5} reverse takeaway="The GI Registry is co-located with the Patent Office in Chennai — it handles all GI applications and the Register of Geographical Indications.">
        <Points items={[
          'Located at: Intellectual Property Building, G.S.T. Road, Guindy, Chennai — same premises as Southern Patent Office',
          'Headed by the Registrar of Geographical Indications',
          'Services: examination of GI applications, opposition handling, registration, authorised user registration',
          'GI Journal: published by the Registry; applications open to opposition for 3 months after publication',
          'GI Database: publicly searchable — all registered Indian GIs visible at ipindiaservices.gov.in',
          'Works with industry associations, state governments, and producer groups to facilitate GI applications',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus GI Registry.',
  }),

  slide({
    id: 'rm5-dpiit',
    kicker: 'Policy leadership',
    title: 'DPIIT — IP policy and the National IPR Policy 2016',
    content: (
      <Deck active={8} visual={<DocumentJourney stages={['Policy','Office','Register','Support']} />} tone={5} layout="process" takeaway="DPIIT sets IP policy direction for India — the National IPR Policy 2016 provides the strategic framework for IP awareness, protection, and enforcement.">
        <Points items={[
          'DPIIT: Department for Promotion of Industry & Internal Trade — Ministry of Commerce & Industry',
          'Governs all IP registration bodies except PPV&FR (Agriculture Ministry) and Copyright Office (Education Ministry)',
          'National IPR Policy 2016: seven objectives — awareness, generation, legal framework, administration, commercialisation, enforcement, human capital',
          'Key programmes: IP Facilitation Centres, Patent Clinics, awareness workshops at universities',
          'DPIIT coordinates India\'s positions in international IP negotiations (WTO, WIPO, bilateral FTAs)',
          'Digital India + Make in India + Startup India: all include IP components championed by DPIIT',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus DPIIT and National IPR Policy.',
  }),

  slide({
    id: 'rm5-tifac',
    kicker: 'Innovation support',
    title: 'TIFAC and NRDC — technology foresight and transfer',
    content: (
      <Deck density="dense" active={8} visual={<DocumentJourney stages={['Policy','Office','Register','Support']} />} tone={5} takeaway="TIFAC and NRDC bridge research institutions and industry — they help convert lab innovations into filed patents and licensed technologies.">
        <Compare
          leftTitle="TIFAC — Technology Forecasting"
          rightTitle="NRDC — Tech Transfer"
          left={[
            'Technology Information Forecasting and Assessment Council',
            'Technology foresight studies — identifies future technology areas for India',
            'Patent awareness and IP literacy programmes for researchers',
            'PATSER scheme: supports filing of patents by Indian inventors',
            'Database of Indian inventors and their technology domains',
          ]}
          right={[
            'National Research Development Corporation',
            'Transfers innovations from CSIR, ICAR, DBT, and other govt labs to industry',
            'Holds patents on behalf of inventors; licenses to Indian industry',
            'Administers royalty distribution to inventors and their institutions',
            'Assistance with technology valuation and licensing negotiation',
          ]}
        />
      </Deck>
    ),
    notes: '__gap:syllabus TIFAC and NRDC.',
  }),

  slide({
    id: 'rm5-cipam',
    kicker: 'Startup and awareness',
    title: 'CIPAM — Cell for IPR Promotion and Management',
    content: (
      <Deck active={8} visual={<DocumentJourney stages={['Policy','Office','Register','Support']} />} tone={5} reverse layout="process" takeaway="CIPAM is the primary IP awareness and startup support arm under DPIIT — it runs the IP Facilitation Centres and the IP awareness programme.">
        <Points items={[
          'CIPAM: Cell for IPR Promotion and Management — established under DPIIT',
          'Primary mandate: implement National IPR Policy, promote IP awareness among MSMEs, startups, students',
          'IP Facilitation Centres (IPFCs): located at technology institutions — provide IP guidance, prior art search help, filing assistance',
          'IP awareness campaign: "Creative India Innovative India" — workshops, training, online modules',
          'Startup IP: facilitates IP Fast-Track scheme — dedicated patent examiner, subsidised official fees for startups',
          'Women entrepreneurship: IP awareness programmes specifically targeting women inventors',
          'Coordination: works with TIFAC, NRDC, Patent Offices, and state governments to reach diverse inventor communities',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus CIPAM.',
  }),

  slide({
    id: 'rm5-org',
    kicker: 'WIPO and international interface',
    title: 'India\'s WIPO engagement — filing and treaties',
    content: (
      <Deck active={8} visual={<DocumentJourney stages={['Policy','Office','Register','Support']} />} tone={5} reverse layout="process" takeaway="WIPO services give Indian innovators access to multi-country filing systems — using WIPO through IP India saves time and cost compared to direct national filings.">
        <Cards items={[
          ['PCT System','India joined PCT 1998 — single international application, processed by IPO as Receiving Office'],
          ['Madrid System','India joined 2013 — international trademark applications through IP India portal'],
          ['Hague System','International design applications — India not yet a member; watch for future accession'],
          ['WIPO ALERT','Global database of contact details for national and regional IP offices — helps with foreign filing'],
          ['WIPO Lex','Free online database of IP laws of all WIPO member countries — useful for comparative research'],
          ['WIPO Academy','Online IP training courses — many available free to Indian students and researchers'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus; builds on M3 governance.',
  }),

  slide({
    id: 'rm5-schemes',
    kicker: 'Schemes and programmes',
    title: 'Government IP support schemes',
    content: (
      <Deck active={8} visual={<IpEcosystem />} tone={5} takeaway="Multiple government schemes reduce the cost and complexity of IP protection for students, startups, and individual inventors.">
        <Cards items={[
          ['IP Fast-Track (Startup India)','Dedicated examiner for startups; accelerated examination; discounted official fees for natural persons and startups'],
          ['SIPP Scheme','Scheme for Facilitating Start-ups Intellectual Property Protection — professional patent agent support at subsidised rates'],
          ['Patent Clinics','Free prior art search and filing advisory sessions at selected universities and technology parks'],
          ['IP Awareness in Institutions','CIPAM-funded workshops at engineering colleges — VTU students eligible'],
          ['MSME IP scheme','Support for small enterprises to file patents and trademarks — state MSME commissionerates co-fund'],
          ['NIF Honeybee Network','Supports grassroots and frugal inventors — often from rural or informal innovation backgrounds'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Schemes and programmes.',
  }),

  /* ================================================================
     SECTION E — SYNTHESIS
  ================================================================ */
  slide({
    id: 'rm5-org-compare',
    kicker: 'Organisation map',
    title: 'Who does what in India\'s IP ecosystem?',
    content: (
      <Deck active={8} visual={<DocumentJourney stages={['Policy','Office','Register','Support']} />} tone={5} reverse layout="process" takeaway="Understanding which body handles which IP type prevents misdirected applications and compliance failures.">
        <Cards items={[
          ['Patent Office (CGPDTM)','Patents, Designs, Trademarks — registration, examination, grant, opposition'],
          ['Copyright Office (Registrar)','Copyright — voluntary registration, dispute resolution, compulsory licences'],
          ['GI Registry (Chennai)','Geographical Indications — registration, opposition, authorised user registration'],
          ['DPIIT','IP policy, National IPR Policy, international negotiations, CGPDTM oversight'],
          ['CIPAM','IP awareness, startup IP facilitation, university IP cells, patent clinics'],
          ['TIFAC + NRDC','Technology foresight + patent awareness (TIFAC); tech transfer and licensing (NRDC)'],
          ['WIPO Interface','PCT (patents), Madrid (TM), WIPO Lex, WIPO Academy — international system access'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus IP organisation map.',
  }),

  slide({
    id: 'rm5-finale',
    kicker: 'Complete innovation journey',
    title: 'From problem to protected value',
    content: (
      <Deck active={8} visual={<InnovationJourney />} tone={5} takeaway="Choose the right IP tool for each layer of creation — then protect and deliver value through the appropriate commercialisation channel.">
        <Flow items={['Problem','Research','Literature','Ethics','Knowledge','Invention','IP choice','Protection','Value']} />
        <Points items={[
          'Patent: the control method or algorithm in EcoSense',
          'Copyright: the software code, circuit documentation, and research paper',
          'Trademark: the "EcoSense" brand name and logo before market launch',
          'Industrial design: the casing shape and display layout of the physical device',
          'GI: not directly applicable — but understanding GI teaches the origin-reputation logic used in regional tech clusters',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm5-decision',
    kicker: 'IP decision matrix',
    title: 'Choosing the right IP tool — decision guide',
    content: (
      <Deck active={8} visual={<IpEcosystem />} tone={5} reverse takeaway="The right IP tool depends on what is being protected, how long it needs protection, and whether disclosure is acceptable.">
        <Cards items={[
          ['Is it a technical solution or process?','→ Consider patent. File before any public disclosure.'],
          ['Is it original creative expression?','→ Copyright applies automatically. Register for enforcement evidence.'],
          ['Is it a brand identifier (name, logo, slogan)?','→ Register as trademark. Do a prior art search first.'],
          ['Is it the visual appearance of a product?','→ Register as industrial design before commercial launch.'],
          ['Is it a region-specific quality product?','→ Consider GI registration through a producer association.'],
          ['Is it commercially sensitive and reversely unengineerable?','→ Consider trade secret with NDAs. No filing needed.'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus IP decision matrix.',
  }),

  slide({
    id: 'rm5-india-future',
    kicker: 'India\'s IP future',
    title: 'From IP consumer to IP creator',
    content: (
      <Deck active={8} visual={<InnovationJourney />} tone={5} takeaway="India's transformation from predominantly citing foreign IP to generating domestic IP is the central challenge — and opportunity — for this generation of engineers.">
        <Points items={[
          'India ranks 40th on Global Innovation Index (qualitative position — improving trend)',
          'Patent filings by Indian residents growing: government targets matching foreign filings in India by domestic applicants',
          'Quality challenge: fewer Indian patents are commercially licensed or litigated — building prosecution and licensing expertise is critical',
          'Engineering colleges: IP cells, patent clinics, and awareness programmes are being established nationwide',
          'Atmanirbhar Bharat: domestic IP creation is a national strategic priority — not just academic compliance',
          'Your role: every patent you file, every copyright you register, every trademark you protect contributes to India\'s innovation index',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus India IP future.',
  }),

  /* ── RESOURCE HUB ─────────────────────────────────────── */
  slide({
    id: 'rm5-res',
    kicker: 'After the lecture',
    title: 'Notes and practice',
    content: (
      <Deck active={8} full takeaway="Resources after class — GI search and design registration exercises recommended." tone={5}>
        <ResourceHub moduleId="module-5" />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),
]

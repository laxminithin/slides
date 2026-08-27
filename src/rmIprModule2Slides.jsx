/**
 * BRMK557 Research Methodology & IPR — Module 2: The Knowledge Landscape
 * Covers: Literature Review, Technical Reading, Citations, Acknowledgments
 * Target: 42 slides
 */
import './rmIpr.css'
import {
  slide, Deck, Points, Lead, Definition, Example, Flow, Compare, Cards, Divider, ResourceHub,
  LiteratureFunnel, AnalysisVsSynthesis, CitationNetwork, ResearchLifecycle, ProcessFlow,
} from './components/RmKit.jsx'

export const rmIprModule2Slides = [

  /* ── OPENER ─────────────────────────────────────────────── */
  slide({
    id: 'rm2-open',
    kicker: 'BRMK557 · Module 2',
    title: 'The Knowledge Landscape',
    hideTitle: true,
    content: (
      <Divider number="Module 2" title="The Knowledge Landscape" subtitle="Research begins where existing knowledge ends." visual={<LiteratureFunnel />} />
    ),
    notes: 'Opener',
  }),

  slide({
    id: 'rm2-story',
    kicker: 'Journey',
    title: 'Research question to cited gap',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} takeaway="Literature turns a universe of papers into a defensible research gap.">
        <Flow items={['Question','Search','Filter','Read','Notes','Compare','Synthesise','Gap','Cite']} />
        <Example label="Campus story">Energy-management students must learn what occupancy sensing and HVAC control research already exists before proposing a solution.</Example>
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  /* ── SECTION A: LITERATURE REVIEW ─────────────────────── */
  slide({
    id: 'rm2-lr',
    kicker: 'Literature review',
    title: 'Purpose and quality',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} reverse takeaway="Quality means breadth, depth, clarity, rigor, consistency and analysis.">
        <Points items={[
          'Identify how literature frames the known problem',
          'Advocate an approach and assess methods',
          'Show the work will contribute something new',
          'Judge review quality on breadth, depth, clarity, rigor, consistency, analysis',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-new',
    kicker: 'New and existing knowledge',
    title: 'Originality needs a map of the known',
    content: (
      <Deck active={2} visual={<CitationNetwork />} tone={2} takeaway="Prove originality by showing what exists and what is missing.">
        <Points items={[
          'New knowledge is interpreted only against existing knowledge',
          'Existing knowledge shows the problem is real and important',
          'Two-step survey: identify topics; place citations into topic categories',
          'Textbooks often hold established knowledge; papers hold newer work',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-source-types',
    kicker: 'Types of sources',
    title: 'Primary, secondary, and tertiary literature',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} reverse takeaway="Primary sources report original data; secondary sources analyse them — know which you are using.">
        <Cards items={[
          ['Primary','Original research: journal articles, conference papers, theses, patents, datasets'],
          ['Secondary','Reviews, meta-analyses, textbooks, encyclopaedias — interpret primary sources'],
          ['Tertiary','Indexes, abstracts, databases — point to primary and secondary sources'],
          ['Grey literature','Technical reports, government documents, white papers — not peer-reviewed but often authoritative'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Primary vs secondary vs tertiary sources.',
  }),

  slide({
    id: 'rm2-as',
    kicker: 'Analysis and synthesis of prior art',
    title: 'Dissect then recombine',
    content: (
      <Deck active={2} visual={<AnalysisVsSynthesis />} tone={2} takeaway="Analysis breaks one paper; synthesis builds the field picture.">
        <Points items={[
          'Prior art: existing knowledge/publications/patents/products before your idea',
          'Analyse hypothesis, models, conditions, connections, contrasts, loopholes',
          'Use an N×M literature survey grid to compare papers across dimensions',
          'Prefer refereed work; evaluate Authority, Accuracy, Scope',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-survey-grid',
    kicker: 'Literature survey grid',
    title: 'N × M comparative analysis',
    content: (
      <Deck density="dense" active={2} visual={<AnalysisVsSynthesis />} tone={2} takeaway="A grid forces systematic comparison — gaps in columns reveal research opportunities.">
        <Definition term="N × M literature grid">
          A table where N rows are the papers (or studies) surveyed and M columns are the key dimensions being compared — methods, datasets, metrics, findings, limitations.
        </Definition>
        <Points items={[
          'Columns might be: problem addressed, method, dataset, accuracy metric, limitations',
          'Empty cells or sparse columns mark unexplored combinations — potential research gaps',
          'Build incrementally: start with 5–10 core papers, expand as reading progresses',
          'Synthesise across rows to write the related-work section of your paper or proposal',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus N×M survey grid',
  }),

  slide({
    id: 'rm2-eval-sources',
    kicker: 'Evaluating sources',
    title: 'Authority · Accuracy · Scope',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} takeaway="Not all sources are equal — apply the AAC test before trusting any claim.">
        <Cards items={[
          ['Authority','Is the author expert? Is the venue peer-reviewed? Is the publisher reputable?'],
          ['Accuracy','Are methods clear? Are claims supported by data? Is the work replicable?'],
          ['Scope','Does it cover the relevant time period, geography, and depth for your problem?'],
          ['Currency','Is it recent enough? Engineering moves fast — a 10-year-old survey may be outdated.'],
          ['Purpose','Why was it written? Commercial interest? Advocacy? Objective research?'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Evaluating sources AAC framework.',
  }),

  /* ── SECTION B: DATABASES ──────────────────────────────── */
  slide({
    id: 'rm2-db',
    kicker: 'Bibliographic databases',
    title: 'Organised scholarly reference collections',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} reverse takeaway="Databases index scholarly metadata — they are not the whole internet.">
        <Cards items={[
          ['Scopus','Journals and conferences — broadest coverage across science and engineering'],
          ['Web of Science','Top-journal references — strong citation tracking and impact metrics'],
          ['PubMed','Medical and life sciences — free, curated by NLM'],
          ['IEEE Xplore','Engineering and computer science — conference and journal papers'],
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-wos',
    kicker: 'Web of Science',
    title: 'Fielded scholarly search',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} reverse takeaway="WoS supports topic/author search and citation sorting under institutional license.">
        <Points items={[
          'Multiple databases and specialised tools under one login',
          'Search title/topic/author/address fields individually or in combination',
          'Sort by citation count or publication date',
          'Shows title, authors, journal, volume/issue/year, abstract, keywords',
          'Generates Citation Reports: h-index, citing articles, self-citations',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-scopus',
    kicker: 'Scopus',
    title: 'Broadest engineering and science coverage',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} reverse takeaway="Scopus covers more journals than WoS — but both are subscription services requiring institutional access.">
        <Points items={[
          'Indexes over 25,000 journals from more than 5,000 publishers',
          'Covers science, technology, medicine, social science, and humanities',
          'Advanced field-specific search: TITLE-ABS-KEY syntax',
          'Author disambiguation and citation metrics (CiteScore, SJR, SNIP)',
          'Document type filters: journal article, conference paper, review, book chapter',
          'Compare journals side by side using the Journal Analyzer tool',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Scopus details.',
  }),

  slide({
    id: 'rm2-ieee-xplore',
    kicker: 'IEEE Xplore',
    title: 'Engineering and computer science flagship database',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} reverse takeaway="For EE, CS, and related engineering disciplines, IEEE Xplore is the primary database — especially strong for conference proceedings.">
        <Points items={[
          'Hosts papers from IEEE journals, transactions, magazines, and conference proceedings',
          'Covers electrical engineering, electronics, computing, information theory, signal processing',
          'Many IEEE conference papers are available free (open access); journals vary by license',
          'Command search: (autonomous AND vehicle) NOT (simulation)',
          'Early Access articles: pre-publication papers available ahead of print issue',
          'Related to the VTU citation style requirement: IEEE style is predominant in engineering',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus IEEE Xplore.',
  }),

  slide({
    id: 'rm2-google',
    kicker: 'Google and Google Scholar',
    title: 'Orientation vs scholarship',
    content: (
      <Deck active={2} visual={<Compare leftTitle="Google" rightTitle="Google Scholar" left={['Good starting point','Govt/org/company reports','Black-box web results','No quality control','Limited refinement']} right={['Scholarly focus','Papers and proceedings','Some non-scholarly noise','Not fully comprehensive','Limited refinement']} />} tone={2}>
        <Lead>Always screen results critically before trusting them as evidence.</Lead>
      </Deck>
    ),
    notes: 'Takeaway embedded in lead.',
  }),

  slide({
    id: 'rm2-boolean',
    kicker: 'Effective search — operators',
    title: 'Boolean and advanced search syntax',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} takeaway="Boolean operators drastically improve search precision — AND narrows, OR broadens, NOT excludes.">
        <Cards items={[
          ['AND','Narrows: energy AND occupancy — both terms must appear'],
          ['OR','Broadens: HVAC OR "heating cooling" — either term matches'],
          ['NOT','Excludes: sensor NOT ultrasonic — excludes a sub-topic'],
          ['Quotes','Exact phrase: "deep learning for energy" — treats as one unit'],
          ['Wildcards','sensor* matches sensor, sensors, sensing, sensory'],
          ['Filters','Year, document type, subject area, open access — refine after initial search'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Boolean search operators.',
  }),

  slide({
    id: 'rm2-search',
    kicker: 'Effective search: the way forward',
    title: 'Iterative and continuous',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} reverse takeaway="Literature survey does not end when experiments begin.">
        <Points items={[
          'Scholarly works are expert-authored, cited, usually peer reviewed',
          'Not all information is online — grey literature and older patents may be offline',
          'Iterate keywords, filters, citation chasing ("backward search") and forward citation tracking',
          'Read critically, summarise, compare — often repeatedly',
          'Keep a log of search queries and results to avoid repeating failed searches',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  /* ── SECTION C: TECHNICAL READING ─────────────────────── */
  slide({
    id: 'rm2-techintro',
    kicker: 'Technical reading',
    title: 'Introduction to Technical Reading',
    content: (
      <Deck active={2} visual={<ResearchLifecycle stage={2} />} tone={2} takeaway="Engineers must read papers, math, algorithms and datasheets as instruments — each requires a different reading strategy.">
        <Points items={[
          'Papers argue with methods and evidence — read to evaluate the argument',
          'Mathematics and algorithms encode mechanisms — read to understand, then prototype',
          'Datasheets define safe operating limits — read to make engineering decisions',
          'Skim first to decide whether deep reading is warranted at all',
          'Reading volume grows with seniority — build the habit early',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Introduction to Technical Reading.',
  }),

  slide({
    id: 'rm2-paper-anatomy',
    kicker: 'Anatomy of a research paper',
    title: 'Where to look for what',
    content: (
      <Deck active={2} visual={<ProcessFlow title="Anatomy of a paper" items={['Abstract','Intro','Related work','Method','Results','Discussion','Conclusion','References']} />} tone={2} reverse takeaway="Read abstract + conclusion first to decide whether to invest in a full read.">
        <Cards items={[
          ['Abstract','Research question, method, main result, implication — 150–250 words'],
          ['Introduction','Context, problem statement, gap, paper structure'],
          ['Related work','Prior art — compare carefully with your own survey'],
          ['Method','Core technical contribution — read closely; look for reproducibility'],
          ['Results','Data, figures, tables — verify claims against evidence'],
          ['Discussion','Interpretation, limitations, future work — often the richest section'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Anatomy of a research paper.',
  }),

  slide({
    id: 'rm2-concept',
    kicker: 'Conceptualizing research',
    title: 'From literature to study design',
    content: (
      <Deck active={2} visual={<ProcessFlow title="Concept to design" items={['Literature','Variables','Approach','Plan']} />} tone={2} reverse takeaway="Conceptualizing research links prior art to a workable investigation.">
        <Points items={[
          'Clarify problem boundaries and variables after reading widely',
          'Choose approaches consistent with what prior research has tested',
          'Identify assumptions to inherit from literature — or challenge with new evidence',
          'Then deep-read only the core papers most directly relevant to your design',
        ]} />
        <Example label="Campus story">Prior occupancy–HVAC papers suggest sensor modalities, control logic architecture, and evaluation metrics — these become the building blocks of the new study design.</Example>
      </Deck>
    ),
    notes: '__gap:syllabus Conceptualizing Research.',
  }),

  slide({
    id: 'rm2-concept2',
    kicker: 'Variables and hypotheses',
    title: 'From concept to testable design',
    content: (
      <Deck active={2} visual={<ResearchLifecycle stage={3} />} tone={2} reverse takeaway="A hypothesis is a precise, falsifiable statement — not a guess — derived from the literature gap.">
        <Definition term="Research hypothesis">
          A testable statement about the relationship between two or more variables, derived from the literature and framed so that it can be confirmed or refuted by evidence.
        </Definition>
        <Cards items={[
          ['Independent variable','What the researcher manipulates or controls (sensor placement)'],
          ['Dependent variable','What is measured as an outcome (energy savings %)'],
          ['Confounding variable','What must be controlled or accounted for (occupancy pattern, building type)'],
          ['Hypothesis format','If X is changed, then Y will change in Z direction, because literature suggests…'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Variables and hypotheses.',
  }),

  slide({
    id: 'rm2-crit',
    kicker: 'Critical reading',
    title: 'Interrogate every claim',
    content: (
      <Deck active={2} visual={<AnalysisVsSynthesis />} tone={2} takeaway="Critical reading hunts mistakes — easier than finding the best ideas.">
        <Points items={[
          'Do not assume results are correct — even peer review misses errors',
          'Right problem? Were simpler solutions missed or dismissed?',
          'What are the stated and unstated limitations?',
          'Are the assumptions reasonable? Are there logical flaws?',
          'Is the data correctly interpreted? Could the same data support a different conclusion?',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-crit2',
    kicker: 'Critical reading checklist',
    title: 'Seven questions to ask every paper',
    content: (
      <Deck active={2} visual={<AnalysisVsSynthesis />} tone={2} reverse takeaway="Running through a checklist transforms passive reading into active evaluation.">
        <Cards items={[
          ['1. Clarity','Is the research question unambiguous?'],
          ['2. Rigour','Are the methods valid, reliable, and reproducible?'],
          ['3. Significance','Does the contribution matter beyond this one paper?'],
          ['4. Coherence','Do the conclusions follow from the results?'],
          ['5. Bias','Are there selection, confirmation, or publication biases?'],
          ['6. Ethics','Were participants/data handled ethically?'],
          ['7. Recency','Is the work current enough to be relevant?'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Critical reading checklist.',
  }),

  slide({
    id: 'rm2-creat',
    kicker: 'Creative reading',
    title: 'Hunt extensions the authors missed',
    content: (
      <Deck active={2} visual={<ResearchLifecycle stage={3} />} tone={2} takeaway="Creative reading asks what else this work could enable.">
        <Points items={[
          'Harder than critical reading — requires a positive, generative stance',
          'Other applications, generalisations, or cross-domain extensions?',
          'What modifications would create new practical challenges or sub-problems?',
          'Could combining this paper with another open a new avenue?',
          'Decide if deeper work is warranted — not every paper needs creative reading',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-notes',
    kicker: 'Taking notes while reading',
    title: 'Writing beats memory',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} reverse takeaway="Notes bridge reading and writing — they are the raw material of the literature review chapter.">
        <Points items={[
          'Annotate margins or use reference managers: Mendeley, Zotero, ResearchGate, Scholar',
          'Capture: definitions, key claims, methods, findings, critiques',
          'End each paper with a three-line summary: what it did, what it found, what it missed',
          'Classify novelty: new idea / new experiment or application / novel combination',
          'Link notes across papers: who agrees with whom? Who disagrees? Why?',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-tools',
    kicker: 'Reference management tools',
    title: 'Mendeley · Zotero · EndNote · ReadCube',
    content: (
      <Deck density="dense" active={2} visual={<LiteratureFunnel />} tone={2} takeaway="Reference managers save hours at citation time — set one up at the start of your project, not at deadline time.">
        <Compare
          leftTitle="Free tools"
          rightTitle="Premium / institutional"
          left={[
            'Mendeley — free, PDF annotation, group libraries, Elsevier integration',
            'Zotero — free, open-source, browser plugin, any citation style',
            'Google Scholar library — basic saving only',
          ]}
          right={[
            'EndNote — industry standard, subscription, powerful but steep learning curve',
            'ReadCube Papers — cloud sync, smart recommendations',
            'Institutional access often provides one of the above free for students',
          ]}
        />
      </Deck>
    ),
    notes: '__gap:syllabus Note-taking tools.',
  }),

  slide({
    id: 'rm2-math',
    kicker: 'Reading mathematics and algorithms',
    title: 'Do not skim the core',
    content: (
      <Deck active={2} visual={<ProcessFlow title="Read the core, don't skim" items={['Formula','Variables','Assumptions','Meaning','Interpretation']} />} tone={2} reverse takeaway="Close reading of proofs and algorithms builds real understanding — skimming only creates the illusion of it.">
        <Points items={[
          'Mathematics often founds the most important engineering advances',
          "Skip equations only if the topic is clearly outside scope or too advanced for the paper's purpose",
          'Prototype algorithms in code — papers can still fail when implemented',
          'Distinguish between derivation (showing how) and specification (stating what)',
        ]} />
        <Example>Algorithm route: Input → Pre-conditions → Steps → Complexity or convergence behaviour → Output → Failure modes</Example>
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-ds',
    kicker: 'Reading a datasheet',
    title: 'Component instruction manuals',
    content: (
      <Deck active={2} visual={<ProcessFlow title="Reading a datasheet" items={['Specification','Operating limits','Performance','Engineering decision']} />} tone={2} reverse takeaway="Datasheets are technical reading too — they define what a component can and cannot do safely.">
        <Points items={[
          'Electronics engineers and system integrators must read datasheets carefully',
          'Skim the first page: function, features, block diagram',
          'Absolute maximum ratings: exceeding them causes permanent damage',
          'Typical vs maximum specifications — design to the maximum, not the typical',
          'Package dimensions and pinout are usually at the end',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-litmap',
    kicker: 'Literature synthesis',
    title: 'From notes to gap map',
    content: (
      <Deck active={2} visual={<AnalysisVsSynthesis />} tone={2} reverse takeaway="A synthesis shows the landscape of what is known — and the white spaces where your work can live.">
        <Flow items={['Read 30–50 papers','Theme clusters','Conflict and consensus','Gaps','Your contribution']} />
        <Points items={[
          'Group papers by theme, method, or outcome — not chronologically',
          'Note where papers agree (consensus) and where they conflict (open question)',
          'Map coverage density: dense areas are well-explored; sparse areas are opportunities',
          'Your contribution sits in a gap — explain the gap clearly in the Introduction',
          'A visual mind-map or affinity diagram can help organise 50+ sources',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Literature synthesis and gap mapping.',
  }),

  /* ── SECTION D: CITATIONS ──────────────────────────────── */
  slide({
    id: 'rm2-citdiv',
    kicker: 'Citations',
    title: 'Attributions and Citations',
    hideTitle: true,
    content: (
      <Divider number="Citations" title="Giving Credit Wherever Due" subtitle="Citation is how knowledge communities stay honest." visual={<CitationNetwork />} />
    ),
    notes: 'divider',
  }),

  slide({
    id: 'rm2-credit',
    kicker: 'Giving credit',
    title: 'Cite · Reference · Attribute · Acknowledge',
    content: (
      <Deck active={2} visual={<CitationNetwork />} tone={2} takeaway="Each credit path has a different job — do not confuse them.">
        <Cards items={[
          ['Citing','In-text mention — "(Smith, 2019)" or "[1]" — links to a reference'],
          ['Referencing','Full details in the reference list — enough to retrieve the source'],
          ['Attributing','Credit for the origin of an idea, figure, or dataset, even without a formal citation'],
          ['Acknowledging','Thanks for non-author support — funding, guidance, lab access'],
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-fn',
    kicker: 'Citation functions',
    title: 'Verification, acknowledgment, documentation',
    content: (
      <Deck active={2} visual={<CitationNetwork />} tone={2} reverse takeaway="Avoid spurious, biased, irrelevant, self-, and coercive citations.">
        <Points items={[
          'Cite when reusing text, ideas, figures, tables, or data from any source',
          'Cite in-text (immediate credit) and again in the reference list (retrieval details)',
          'Verification function: readers can check the source for fairness and accuracy',
          'Acknowledgment function: credit supports careers, funding renewals, and institutional rankings',
          'Documentation function: establishes the historical progression of a technology or idea',
          'Spurious and coercive citations are forms of academic misconduct',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-cite-when',
    kicker: 'When to cite',
    title: 'Everything that is not yours must be cited',
    content: (
      <Deck density="dense" active={2} visual={<CitationNetwork />} tone={2} takeaway="When in doubt, cite — the cost of citing unnecessarily is trivial; the cost of failing to cite is plagiarism.">
        <Compare
          leftTitle="Must be cited"
          rightTitle="Does not need a citation"
          left={[
            'Quoted text — even a single sentence verbatim',
            'Paraphrased or summarised ideas from any source',
            'Specific data, statistics, or experimental results',
            'Figures, tables, or diagrams from published works',
            'Your own previously published work (self-citation)',
          ]}
          right={[
            'Common knowledge in the field (e.g., "electricity is used in HVAC")',
            'Definitions universally accepted across textbooks',
            'Your own original data, methods, and analysis in this paper',
          ]}
        />
      </Deck>
    ),
    notes: '__gap:syllabus When to cite.',
  }),

  slide({
    id: 'rm2-title',
    kicker: 'Title and keywords',
    title: 'Discoverability and citations',
    content: (
      <Deck active={2} visual={<ProcessFlow title="Discoverability chain" items={['Paper','Title+keywords','Indexing','Discovery','Citations']} />} tone={2} reverse takeaway="Titles and keywords steer papers to the right audience — poor keyword choice is a silent citation killer.">
        <Points items={[
          'Citation count also depends on journal prestige, paper type, and research area size',
          'Title types: descriptive / question-based / declarative — each signals differently',
          'Maximise allowed keywords; use terms reviewers and readers actually search for',
          'Avoid obscure new terminology that hides work from its natural audience',
          'Keywords must match database indexing vocabulary (e.g., MeSH for biomedical work)',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-flow',
    kicker: 'Knowledge flow through citation',
    title: 'A → B → C',
    content: (
      <Deck active={2} visual={<CitationNetwork />} tone={2} takeaway="Citation is also knowledge flow across people, institutions, and countries.">
        <Points items={[
          'Knowledge flows among co-authors, papers, institutions and fields through citation',
          'Co-authorship across institutions and countries often correlates with higher citation counts',
          'Collaboration networks shape citation patterns and can accelerate diffusion of ideas',
          'Citation delay: practical impact may lag publication by years — "sleeping beauties"',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-hindex',
    kicker: 'Citation metrics',
    title: 'h-index, CiteScore, Impact Factor',
    content: (
      <Deck active={2} visual={<CitationNetwork />} tone={2} reverse takeaway="Metrics measure impact proxies — useful but gameable; never let them replace reading the actual work.">
        <Cards items={[
          ['h-index','Author metric: h papers each cited at least h times — rewards sustained output'],
          ['Impact Factor (IF)','Journal metric: average citations per article over 2 years — publisher-reported'],
          ['CiteScore','Scopus journal metric: citations over 4 years / documents in same period'],
          ['SJR','SCImago Journal Rank — weighted citation metric accounting for source prestige'],
          ['SNIP','Source Normalised Impact per Paper — adjusts for discipline citation norms'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Citation metrics h-index.',
  }),

  slide({
    id: 'rm2-data',
    kicker: 'Citing datasets',
    title: 'Data deserves credit',
    content: (
      <Deck active={2} visual={<CitationNetwork />} tone={2} reverse takeaway="Include enough detail to retrieve the same dataset later — and to credit those who collected it.">
        <Points items={[
          'Engineering claims increasingly require data as evidence — credit the source',
          'Ownership and permission can be legally complex; check licence before using',
          'Cite retrieval URL, dataset version, and date of access',
          'Unpublished or raw data should be treated as private communication if not deposited',
          'Repositories: Zenodo, IEEE DataPort, Kaggle, UCI ML Repository — check terms of use',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-styles',
    kicker: 'Citation styles',
    title: 'ASCE · IEEE · ASME',
    content: (
      <Deck active={2} visual={<Cards items={[['ASCE','Civil engineering patterns'],['IEEE','Numeric endnotes for EE/CS'],['ASME','Author-year technical style']]} />} tone={2} reverse takeaway="Match the venue's required style exactly — most journals will reject papers with inconsistent citation formatting.">
        <Points items={[
          'IEEE: numeric in-text [1], numbered reference list in order of appearance',
          'ASCE: author-year in-text (Smith 2019), alphabetically sorted reference list',
          'ASME: numeric superscripts in-text, numbered list — similar to IEEE',
          'VTU and most Indian engineering programmes default to IEEE style',
          'Use reference managers to switch styles automatically — do not format manually',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-ieee-ex',
    kicker: 'IEEE style worked example',
    title: 'In-text and reference list format',
    content: (
      <Deck density="dense" active={2} visual={<LiteratureFunnel />} tone={2} takeaway="Every element of the reference entry has a specific position and punctuation — consistency is mandatory.">
        <Definition term="IEEE journal article format">
          [1] A. B. Author and C. D. Author, "Title of article in sentence case," <em>Journal Name</em>, vol. 12, no. 3, pp. 45–67, Month Year.
        </Definition>
        <Definition term="IEEE conference paper format">
          [2] A. B. Author, "Title of paper," in <em>Proc. Int. Conf. on Subject</em>, City, Country, Year, pp. 100–105.
        </Definition>
        <Points items={[
          'Initials before surname; multiple authors separated by "and"',
          'Article title in quotes, sentence case; journal/book in italics, title case',
          'Volume (vol.), number (no.), pages (pp.) before year',
          'Conference papers use "in Proc." and the location after the paper title',
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus IEEE citation worked example.',
  }),

  /* ── SECTION E: ACKNOWLEDGMENTS ─────────────────────── */
  slide({
    id: 'rm2-ack',
    kicker: 'Acknowledgments',
    title: 'Support that is not authorship',
    content: (
      <Deck active={2} visual={<Compare leftTitle="Authorship" rightTitle="Acknowledgment" left={['Significant scholarly contribution','Design / interpretation / writing','Full accountability']} right={['Help that is not authorship','Funding, technicians, discussion','Personal thanks']} />} tone={2} reverse takeaway="Reward triangle: citations, acknowledgment, authorship — each has its proper tier.">
        <Points items={[
          'Categories: moral, financial, editorial, institutional, technical, conceptual',
          'Acknowledge guidance, grants with grant numbers, prior presentations of the work',
          'Order: institutional funders → collaborators → personal support',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  slide({
    id: 'rm2-ack-cat',
    kicker: 'Acknowledgment categories',
    title: 'Who goes in the acknowledgment?',
    content: (
      <Deck active={2} visual={<LiteratureFunnel />} tone={2} takeaway="Recognise contributions at the right level — those who shaped the work go in authorship; the rest go in acknowledgments.">
        <Cards items={[
          ['Financial support','Funding agencies and grants: "This work was supported by DST grant [no.]"'],
          ['Moral support','Advisors who provided guidance without designing the research'],
          ['Technical assistance','Lab technicians, instrument operators, data entry support'],
          ['Editorial/collegial','Colleagues who reviewed drafts, offered suggestions, hosted discussions'],
          ['Institutional','Institutions that provided access to equipment, facilities, or databases'],
          ['Conceptual','Subject-matter experts whose ideas informed — but did not produce — the work'],
        ]} />
      </Deck>
    ),
    notes: '__gap:syllabus Acknowledgment categories.',
  }),

  slide({
    id: 'rm2-ded',
    kicker: 'Dedication or acknowledgments',
    title: 'Books and dissertations',
    content: (
      <Deck active={2} visual={<Compare leftTitle="Acknowledgment" rightTitle="Dedication" left={['Who helped the work','Common in papers and books','Professional language required']} right={['To whom the work is offered','Almost never in journal papers','More personal in tone']} />} tone={2} reverse takeaway="The same person can appear in both — for different reasons and in different language.">
        <Points items={[
          'Thesis acknowledgments are longer than journal paper acknowledgments',
          'Keep language professional even in a thesis — avoid effusive praise',
          'Typical order: supervisor → departmental guides → peers → lab staff → family',
        ]} />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),

  /* ── RESOURCE HUB ──────────────────────────────────────── */
  slide({
    id: 'rm2-res',
    kicker: 'After the lecture',
    title: 'Notes and practice',
    content: (
      <Deck active={2} full takeaway="Resources stay outside the lecture flow." tone={2}>
        <ResourceHub moduleId="module-2" />
      </Deck>
    ),
    notes: 'PPT-aligned.',
  }),
]

/**
 * BRMK557 Research Methodology & IPR
 * Module 4 — Copyright & Trademarks
 * Target: 52 slides
 *
 * Source integrity:
 * Slides m4-copy-intro … m4-copy-ownership use content faithful to the
 * M3 PPT (slides 82–91). All remaining slides are built from the official
 * VTU BRMK557 syllabus and the Nejakar/Bendigeri + Acharya IPR textbook
 * framing; those slides carry notes: '__gap:syllabus'.
 *
 * Running story: EcoSense — a student-built energy-monitoring product
 * whose paper, software, documentation, brand, and device look each need
 * a different flavour of IP.
 */
import './rmIpr.css'
import {
  slide,
  Deck,
  Points,
  Lead,
  Definition,
  Example,
  Flow,
  Compare,
  Cards,
  Divider,
  ResourceHub,
  CopyrightLayer,
  TrademarkIdentity,
  DocumentJourney,
  DecisionTree,
  CaseTimeline,
  IpEcosystem,
} from './components/RmKit'

export const rmIprModule4Slides = [
  /* ================================================================
     MODULE 4 — TITLE DIVIDER
  ================================================================ */
  slide({
    id: 'm4-module-divider',
    title: 'MODULE 4',
    layout: 'full',
    hideTitle: true,
    content: (
      <Divider
        number="4"
        title="PROTECTING CREATIVE & BRAND VALUE"
        subtitle="Rights turn creative work and brand signals into protected value."
        visual={<CopyrightLayer />}
      />
    ),
  }),

  /* ================================================================
     SECTION A — COPYRIGHTS (divider)
  ================================================================ */
  slide({
    id: 'm4-copyright-divider',
    title: 'COPYRIGHTS',
    layout: 'full',
    hideTitle: true,
    content: (
      <Divider
        number="A"
        title="COPYRIGHTS"
        subtitle="Protecting original expression."
        visual={<DocumentJourney stages={['Create','Own','Use','Protect']} />}
      />
    ),
  }),

  /* ---- FROM M3 PPT: Intro copyrights & related rights ---- */
  slide({
    id: 'm4-copy-intro',
    kicker: 'Introduction',
    title: 'Copyright and Related Rights',
    subtitle: 'Protecting how ideas are expressed, not the ideas themselves',
    content: (
      <Deck active={6} visual={<CopyrightLayer />} tone={4} takeaway="Copyright protects expression, not the underlying idea, fact, or method.">
        <Lead>
          Copyright is a bundle of exclusive rights granted to creators of original works —
          literary, artistic, dramatic, musical, and more — arising automatically on creation.
        </Lead>
        <Points items={[
          'Arises automatically on creation — no filing or registration required under Berne.',
          'Related rights (neighbouring rights): cover performers, producers of sound recordings, broadcasters.',
          'The idea–expression dichotomy is foundational: only specific expression is protected, never the concept.',
          'EcoSense story: the moment we write the technical paper or the software code, copyright attaches.',
        ]} />
      </Deck>
    ),
  }),

  /* ---- FROM M3 PPT: Meaning of Author and Work ---- */
  slide({
    id: 'm4-copy-author-work',
    kicker: 'Definitions',
    title: 'Meaning of "Author" and "Work"',
    subtitle: 'Copyright Act 1957, Section 2 — context-sensitive definitions',
    content: (
      <Deck density="dense" active={6} visual={<DecisionTree question="Protected?" left="Expression" right="Idea (free)" />} tone={4} takeaway="The law names a different 'author' depending on work type — always the creative mind behind the expression.">
        <Compare
          leftTitle="Author — by work type"
          rightTitle="What counts as a 'Work'?"
          left={[
            'Literary / dramatic / musical: the creator',
            'Artistic work: the artist',
            'Photograph: the photographer',
            'Cinematograph film: the producer',
            'Sound recording: the producer',
            'Computer programme: the programmer / employing firm',
          ]}
          right={[
            'Any of the six protected categories',
            'Must be fixed in a tangible or perceptible form',
            'Mere ideas, titles, slogans are not "works"',
            'Unpublished works qualify for protection',
            'Derivative and compiled works can qualify',
          ]}
        />
      </Deck>
    ),
  }),

  /* ---- FROM M3 PPT: Classes of works ---- */
  slide({
    id: 'm4-copy-classes',
    kicker: 'Classification',
    title: 'Classes of Works Protected by Copyright',
    subtitle: 'Section 13, Copyright Act 1957 — six categories',
    content: (
      <Deck active={6} visual={<CopyrightLayer />} tone={4} reverse takeaway="Six broad categories; software sits inside literary works; films and recordings are separate categories with their own duration rules.">
        <Cards items={[
          ['Literary Works', 'Books, articles, computer programmes, databases, tables, compilations'],
          ['Dramatic Works', 'Plays, scripts, screenplays, choreography with fixed notation'],
          ['Musical Works', 'Compositions — the music itself; lyrics are literary works'],
          ['Artistic Works', 'Paintings, sculptures, drawings, photographs, architecture, maps'],
          ['Cinematograph Films', 'Films and audiovisual recordings on any medium'],
          ['Sound Recordings', 'Any recording of sounds, regardless of medium or method'],
        ]} />
      </Deck>
    ),
  }),

  /* ---- FROM M3 PPT: Literary works including software ---- */
  slide({
    id: 'm4-copy-literary-software',
    kicker: 'Special category',
    title: 'Software as a Literary Work',
    subtitle: 'Copyright (Amendment) Act 2012 confirmed this expressly',
    content: (
      <Deck density="dense" active={6} visual={<DocumentJourney stages={['Author','Rights','Licence','Enforce']} />} tone={4} takeaway="Source code, object code, and preparatory design material for software are all protected as literary works.">
        <Definition term="Computer programme (Section 2(ffc))">
          A set of instructions expressed in words, codes, schemes, or in any other form,
          capable of causing a computer to perform a particular task or achieve a particular result.
        </Definition>
        <Points items={[
          'Both source code and compiled object code receive literary-work protection.',
          'Preparatory design material (flowcharts, UML diagrams) may also qualify.',
          'User-interface elements can attract artistic or literary copyright.',
          'EcoSense: data-analysis code written by the team is automatically protected from the moment it is written.',
          'Databases with creative selection or arrangement attract copyright in the compilation.',
        ]} />
      </Deck>
    ),
  }),

  /* ---- FROM M3 PPT: Criteria for protection ---- */
  slide({
    id: 'm4-copy-criteria',
    kicker: 'Threshold',
    title: 'Criteria for Copyright Protection',
    subtitle: 'Originality · OWA · Minimal creativity — three interlocking requirements',
    content: (
      <Deck active={6} visual={<CopyrightLayer />} tone={4} reverse takeaway="Original means originating from the author's own intellectual effort — not copied — and reflecting some creative choice, however small.">
        <Lead>Three requirements determine whether copyright subsists in a work:</Lead>
        <Points items={[
          'Originality: the work must originate from the author — not a copy of another work.',
          'Original Work of Authorship (OWA): must reflect the author\'s own intellectual creativity.',
          'Minimal creativity: purely mechanical or clerical arrangements may fall below the threshold.',
          'Fixed form: the expression must be recorded in some tangible or perceptible medium.',
          'No requirement of novelty, artistic merit, or registration for copyright to arise.',
        ]} />
        <Example label="EcoSense parallel">
          Our research paper meets all criteria — original framing, intellectual analysis, written text.
        </Example>
      </Deck>
    ),
  }),

  /* ---- FROM M3 PPT: Address book — limits of originality ---- */
  slide({
    id: 'm4-copy-address-book',
    kicker: 'Limits of originality',
    title: 'When Originality Fails: The Compilation Test',
    subtitle: '"Sweat of the brow" labour alone is not creative authorship',
    content: (
      <Deck active={6} visual={<DocumentJourney stages={['Create','Own','Use','Protect']} />} tone={4} reverse takeaway="Mechanical alphabetical listing of facts does not attract copyright; creative selection or arrangement does.">
        <Example label="Classic textbook illustration">
          A bare alphabetical telephone directory or address book — names and numbers arranged in
          the only predictable sequence — involves no creative authorship beyond raw data collection.
          Courts use this to explain that industrious copying of facts does not create copyright.
        </Example>
        <Points items={[
          'Mere investment of effort ("sweat of brow") does not by itself create copyright.',
          'Creative selection, arrangement, or annotation of facts can qualify.',
          'A curated annotated bibliography with explanatory commentary qualifies.',
          'Facts themselves are never protected — only the creative expression around them.',
          'A research paper analysing the same address data would be protected; the raw list would not.',
        ]} />
      </Deck>
    ),
  }),

  /* ---- FROM M3 PPT: Ownership ---- */
  slide({
    id: 'm4-copy-ownership',
    kicker: 'First ownership',
    title: 'Who Owns the Copyright?',
    subtitle: 'Section 17, Copyright Act 1957 — default and special ownership rules',
    content: (
      <Deck active={6} visual={<CopyrightLayer />} tone={4} reverse takeaway="The default owner is the creator, but employment, government, and commission contexts create critical exceptions.">
        <Cards items={[
          ['Creator Rule', 'Author is the first owner by default in most situations.'],
          ['Employment Rule', 'Work made in the course of employment — employer is first owner unless contract provides otherwise.'],
          ['Government Works', 'Work made under direction or control of Government — Government is first owner.'],
          ['Speeches / Addresses', 'Copyright in a delivered speech belongs to the speaker, not the event organiser.'],
          ['Commissioned portraits', 'For portraits, photographs, engravings commissioned for payment — commissioner owns unless agreed otherwise.'],
          ['EcoSense context', 'Code written by a student during a company internship — employer may own under employment rule.'],
        ]} />
      </Deck>
    ),
  }),

  /* ================================================================
     GAP SLIDES — built from syllabus and textbook framing
  ================================================================ */

  slide({
    id: 'm4-copy-rights-author',
    kicker: 'Author\'s rights',
    title: 'Rights of the Author',
    subtitle: 'Economic rights and moral rights — two distinct pillars',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={7} visual={<DecisionTree question="Protected?" left="Expression" right="Idea (free)" />} tone={4} takeaway="Economic rights can be transferred or licensed; moral rights remain with the author permanently and cannot be assigned away.">
        <Compare
          leftTitle="Economic Rights"
          rightTitle="Moral Rights (Section 57)"
          left={[
            'Reproduce the work in any material form',
            'Issue copies to the public (distribution)',
            'Perform or communicate to the public',
            'Translate or adapt the work',
            'Make cinematograph film or sound recording',
            'Can be assigned or licensed for consideration',
          ]}
          right={[
            'Right of paternity — claim authorship of the work',
            'Right of integrity — prevent distortion, mutilation, or modification prejudicial to honour',
            'Cannot be transferred or assigned',
            'Survive assignment of economic rights',
            'Subsist for the author\'s lifetime',
          ]}
        />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-moral-rights-practice',
    kicker: 'Moral rights in practice',
    title: 'Paternity and integrity — real-world application',
    subtitle: 'Section 57, Copyright Act 1957 — author\'s special rights',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<CopyrightLayer />} tone={4} reverse takeaway="Moral rights allow an author to claim credit and prevent harmful distortion — even after selling all economic rights.">
        <Points items={[
          'Right of paternity: author may always claim authorship — even if economic rights have been sold',
          'Right of integrity: author may object to distortion, mutilation, or modification that harms their honour or reputation',
          'Integrity right survives assignment — a publisher who buys full copyright still cannot mutilate the work',
          'Waiver: moral rights can be waived (in writing) but not assigned away permanently',
          'Practical example: a software developer who assigns code to an employer may still object to having their name removed or the code repurposed in a way that harms their professional reputation',
        ]} />
        <Example label="EcoSense parallel">If the EcoSense team publishes code and an employer later adds malware and credits the team as authors — the team can invoke Section 57 to disassociate from the distorted version.</Example>
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-infringement',
    kicker: 'Violation',
    title: 'Copyright Infringement',
    subtitle: 'Section 51 — unauthorised exercise of an exclusive right',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={7} visual={<DocumentJourney stages={['Author','Rights','Licence','Enforce']} />} tone={4} takeaway="Infringement occurs whenever an exclusive right is exercised without authorisation or lawful justification — even an innocent act qualifies.">
        <Definition term="Infringement (Section 51)">
          Copyright is infringed when any person, without a licence from the owner or the Registrar,
          does anything that only the copyright owner has the exclusive right to do.
        </Definition>
        <Points items={[
          'Primary infringement: direct copying, reproduction, distribution, public performance.',
          'Secondary infringement: selling, distributing, or importing infringing copies with knowledge.',
          '"Substantial part" test: quality of what is taken matters more than quantity.',
          'Innocent infringement does not make the act lawful — it may reduce damages.',
          'Remedies: civil (injunction, damages, account of profits, delivery-up) and criminal.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-criminal',
    kicker: 'Criminal liability',
    title: 'Criminal Offence and Cognizable Offence',
    subtitle: 'Sections 63–70, Copyright Act 1957',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<CopyrightLayer />} tone={4} reverse takeaway="Knowing infringement is a cognizable offence — police may arrest without a warrant and seize infringing copies directly.">
        <Cards items={[
          ['Section 63', 'Knowing infringement: imprisonment 6 months to 3 years + fine. Cognizable and non-bailable for repeat offenders.'],
          ['Cognizable offence', 'Police may register FIR and arrest without a court warrant.'],
          ['Section 63A', 'Second and subsequent offences: enhanced minimum penalties.'],
          ['Section 64', 'Any police officer above Sub-Inspector rank may seize infringing copies without court order.'],
          ['Section 65A', 'Circumventing technological protection measures (TPMs/DRM): separate criminal offence.'],
          ['Section 65B', 'Tampering with Rights Management Information: criminal offence.'],
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-fair-dealing',
    kicker: 'Permitted acts',
    title: 'Fair Dealing — A Specific List, Not a Blanket Exception',
    subtitle: 'Section 52, Copyright Act — education is NOT always automatically allowed',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<DocumentJourney stages={['Create','Own','Use','Protect']} />} tone={4} reverse takeaway="Indian law uses an exhaustive list of permitted 'fair dealing' acts — narrower than the US four-factor 'fair use' doctrine.">
        <Lead>
          Section 52 lists specific acts that do not constitute infringement.
          Falling outside the list means infringement even if use seems harmless.
        </Lead>
        <Points items={[
          'Fair dealing for private or personal use, research, criticism, or review — with acknowledgement.',
          'Reporting current events in newspapers/broadcasts — not a licence to reproduce entire works.',
          'Judicial and legislative proceedings — use in courts or Parliament.',
          'Educational use: reproduction by teacher in classroom — specific conditions apply; NOT a general educational exemption.',
          'Libraries: prescribed conditions on multiple copies and lending apply.',
          'Key distinction: Indian "fair dealing" is a closed list; US "fair use" is a flexible four-factor balancing test.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-internet',
    kicker: 'Digital challenge',
    title: 'Copyright and the Internet',
    subtitle: 'Digital distribution changed the scale of infringement dramatically',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<CopyrightLayer />} tone={4} reverse takeaway="The internet created global, near-zero-cost copying; WIPO Internet Treaties and DRM protections are the primary legal responses.">
        <Cards items={[
          ['Digital piracy', 'Mass reproduction and sharing of files without authorisation at near-zero cost.'],
          ['ISP liability', 'Internet Service Providers are passive conduits; liable only if knowingly hosting infringing content ("safe harbour" doctrine).'],
          ['DRM', 'Digital Rights Management — technical locks on content; circumventing them is a criminal offence (Section 65A).'],
          ['Right of communication', '2012 amendment added right to communicate works via digital networks (Section 14(1)(a)(iii)).'],
          ['WCT / WPPT', 'WIPO Internet Treaties extend Berne protection to online communication rights and performer rights.'],
          ['Streaming services', 'Licensed streaming counts as communication to the public — clearance required.'],
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-oa',
    kicker: 'Open access and Creative Commons',
    title: 'Licensing copyright for sharing',
    subtitle: 'Authors can grant permissions in advance through standardised licences',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<DecisionTree question="Protected?" left="Expression" right="Idea (free)" />} tone={4} reverse takeaway="Open access and Creative Commons are not the absence of copyright — they are copyright holders choosing to grant permissions in advance, under defined conditions.">
        <Cards items={[
          ['Open Access (OA)','Research made freely available online; author retains copyright under an open licence'],
          ['CC BY','Creative Commons Attribution — most permissive; any use including commercial, with credit'],
          ['CC BY-SA','Attribution + ShareAlike — derivative works must carry same licence'],
          ['CC BY-NC','Attribution + NonCommercial — restricts commercial exploitation'],
          ['CC BY-ND','Attribution + NoDerivatives — use verbatim only; no adaptations'],
          ['Relevance to researchers','VTU and many Indian funding agencies now encourage OA publishing; check mandates before submitting'],
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-non-copyright',
    kicker: 'Outer limits',
    title: 'Works Not Protected by Copyright',
    subtitle: 'Ideas, facts, and certain public-domain categories are free for all',
    notes: '__gap:syllabus',
    content: (
      <Deck active={6} visual={<CopyrightLayer />} tone={4} reverse takeaway="Copyright has firm outer limits — it never captures underlying ideas, and expired works enter the public domain freely.">
        <Points items={[
          'Ideas, concepts, themes, plots — only the specific expression in which ideas are clothed.',
          'Facts, data, news events — facts belong to the public and can never be owned.',
          'Mathematical formulae, scientific theories, and natural laws.',
          'Purely functional elements with no room for creative variation.',
          'Works whose copyright term has expired — in the public domain and freely available.',
          'Certain government documents under Section 52(1)(q) — official texts, Acts, judgments.',
          'Titles, slogans, short phrases — generally too brief to attract copyright protection.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-registration',
    kicker: 'Registration',
    title: 'Copyright Registration in India',
    subtitle: 'Voluntary but creates a valuable evidentiary public record',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<DocumentJourney stages={['Create', 'File Form IV', 'Examine', 'Register']} />} tone={4} reverse layout="process" takeaway="Registration is not a condition for protection, but it creates prima facie evidence of ownership — useful in enforcement.">
        <Flow items={['Create work', 'Complete Form IV', 'Submit to Copyright Office', 'Mandatory 30-day waiting period', 'Registration in Register of Copyrights']} />
        <Points items={[
          'Application under Section 44 to the Registrar of Copyrights, New Delhi.',
          'Submit Form IV with details of work, author, owner, nature of work, year.',
          'Mandatory 30-day waiting period allows third parties to file objections.',
          'Registration provides prima facie evidence of ownership in court proceedings.',
          'Registered works can be placed on Customs watch-list to prevent import of infringing copies.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-registrar-powers',
    kicker: 'Administration',
    title: 'Judicial Powers of the Registrar of Copyrights',
    subtitle: 'Chapter XI, Copyright Act — civil court equivalence during proceedings',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<DocumentJourney stages={['Author','Rights','Licence','Enforce']} />} tone={4} takeaway="During proceedings, the Registrar exercises powers of a civil court — summoning witnesses, requiring documents, receiving evidence on affidavit.">
        <Points items={[
          'Summoning and enforcing attendance of witnesses; examining witnesses on oath.',
          'Requiring discovery and production of documents and other material objects.',
          'Receiving evidence on affidavit.',
          'Issuing commissions for examination of witnesses or documents elsewhere.',
          'Hearing disputes regarding assignments, licences, and royalties.',
          'Registrar\'s decisions may be appealed — historically to IPAB, now to jurisdictional High Courts (post-2021 Tribunals Reform).',
          'Deliberate obstruction of Registrar\'s proceedings may constitute contempt.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-fee',
    kicker: 'Fees',
    title: 'Copyright Registration Fee Structure — Qualitative Overview',
    subtitle: 'Fees prescribed in Schedule to Copyright Rules; tiered by work class',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<CopyrightLayer />} tone={4} reverse takeaway="Fees are modest relative to the value of protection; always verify current amounts directly from the Copyright Office as schedules are updated.">
        <Cards items={[
          ['Literary / dramatic / musical / artistic works', 'Lowest fee tier — accessible to individual authors and researchers.'],
          ['Cinematograph films', 'Highest fee tier reflecting the complexity of film works.'],
          ['Sound recordings', 'Intermediate fee tier.'],
          ['Computer programmes', 'Treated as literary works for fee purposes; same tier.'],
          ['Online filing (e-Copyright)', 'Digital filing system available on IP India portal; online payment accepted.'],
          ['Advisory', 'Specific fee amounts change periodically — verify from official Copyright Office schedule before filing.'],
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-symbol',
    kicker: 'Notice',
    title: 'The Copyright Symbol © and Notice',
    subtitle: 'Not required for protection, but signals ownership clearly',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={6} visual={<DocumentJourney stages={['Create','Own','Use','Protect']} />} tone={4} takeaway="Under Berne, no notice is required — protection is automatic. Yet © notice discourages infringement and informs users who to seek permission from.">
        <Definition term="Copyright notice format">
          © [Year of first publication] [Name of copyright owner]
        </Definition>
        <Points items={[
          'The © symbol signals the work is protected and identifies the owner.',
          'India follows Berne Convention — protection is automatic; notice is entirely optional.',
          'Under the Universal Copyright Convention (UCC), notice was a condition; this is now less relevant.',
          'Published works conventionally carry © notice on the title page or a prominent place.',
          'For sound recordings: ℗ (phonogram symbol) is used in addition to © for the sound recording itself.',
          'Absence of notice does not strip copyright protection in India.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-validity',
    kicker: 'Duration',
    title: 'Duration of Copyright in India',
    subtitle: 'Life + 60 years is the standard; some categories count from publication',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<CopyrightLayer />} tone={4} reverse takeaway="Standard term: life of author plus 60 years. Films, sound recordings, and government works run 60 years from publication.">
        <Cards items={[
          ['Literary / dramatic / musical / artistic', 'Life of author + 60 years from the calendar year of death.'],
          ['Joint authorship', 'Life of last surviving joint author + 60 years.'],
          ['Anonymous / pseudonymous works', '60 years from the year of publication.'],
          ['Posthumously published works', '60 years from the year of first publication.'],
          ['Cinematograph films', '60 years from the year of publication.'],
          ['Sound recordings', '60 years from the year of publication.'],
          ['Government works', '60 years from the year of publication.'],
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-profile-india',
    kicker: 'National context',
    title: 'Copyright Profile of India',
    subtitle: 'Legal framework, creative industries, and international standing',
    notes: '__gap:syllabus',
    content: (
      <Deck active={6} visual={<DecisionTree question="Protected?" left="Expression" right="Idea (free)" />} tone={4} reverse takeaway="India has a strong copyright infrastructure serving one of the world's largest film, music, and software export industries.">
        <Points items={[
          'Copyright Act 1957 as amended; major digital updates via Copyright (Amendment) Act 2012.',
          'Member of Berne Convention since 1928; UCC member; WCT/WPPT obligations met via 2012 amendment.',
          'Copyright Office in New Delhi — registration, maintenance of register, policy advice.',
          'Key creative industries: Indian cinema (Bollywood + regional), music recording, publishing, software exports.',
          'India is a top-five global software exporter — copyright of code is commercially vital.',
          'Piracy remains a challenge; Section 65A/65B (DRM) and Customs recordation are enforcement tools.',
          'National IPR Policy 2016 specifically targets awareness and enforcement of copyright.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-publish',
    kicker: 'Publication',
    title: 'Meaning of "Publication"',
    subtitle: 'Section 3, Copyright Act 1957',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={6} visual={<CopyrightLayer />} tone={4} takeaway="Publication triggers duration clocks for some work categories and establishes the work's public existence for Berne purposes.">
        <Definition term="Publication (Section 3)">
          Making a work available to the public by issuing copies or by communicating the work
          to the public. A performance in public does not amount to publication of a dramatic work.
        </Definition>
        <Points items={[
          'Issue of copies in physical form — sale, distribution, rental to the public.',
          'Communication to the public — broadcast, cable transmission, digital streaming.',
          'Performance, exhibition, or recitation alone is NOT publication.',
          'Work published abroad first, then published in India within 30 days — treated as simultaneous publication.',
          'Publication date determines the start of duration for films, recordings, and government works.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-transfer',
    kicker: 'Assignment',
    title: 'Transfer of Copyright to Publisher — Assignment',
    subtitle: 'Sections 18–19, Copyright Act 1957 — must be in writing',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<DocumentJourney stages={['Author','Rights','Licence','Enforce']} />} tone={4} reverse takeaway="Assignment of copyright must be in writing; the author can still reclaim rights if the assignee fails to exercise them.">
        <Points items={[
          'Copyright may be assigned wholly or partially, for all rights or specified rights only.',
          'Assignment must be in writing and signed by the assignor or their authorised agent (Section 19(1)).',
          'The instrument must specify: works covered, rights assigned, territorial extent, duration.',
          'Default assignment period: 5 years if not specified; default territory: India if not specified.',
          'Reversion (Section 19A): if assignee does not exercise rights within one year of assignment, author may apply for reversion.',
          'Authors retain moral rights (paternity and integrity) even after full assignment of economic rights.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-adaptation',
    kicker: 'Derivative works',
    title: 'Adaptation',
    subtitle: 'Transforming an existing work into a new form — Section 2(a)',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={6} visual={<CopyrightLayer />} tone={4} takeaway="Adaptation requires clearance from the original author's copyright holder; the adapter gains copyright in their own creative additions only.">
        <Definition term="Adaptation (Section 2(a))">
          Conversion of a dramatic work into a non-dramatic form; conversion of a work into a
          cinematograph film; translation; abridgement; transcription; any use converting a work
          into a different literary or artistic form.
        </Definition>
        <Points items={[
          'Translation from one language to another is an adaptation requiring permission.',
          'Dramatisation of a novel — script based on book — needs copyright clearance.',
          'A film screenplay based on a novel requires rights from the novelist.',
          'Arrangement or orchestration of a musical work is an adaptation.',
          'The adapter acquires copyright in their own creative contribution to the adaptation only.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-indian-work',
    kicker: 'Territorial scope',
    title: '"Indian Work" — Territorial Connection',
    subtitle: 'Section 2(y), Copyright Act 1957 — determines applicability of Indian law',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={6} visual={<DocumentJourney stages={['Create','Own','Use','Protect']} />} tone={4} takeaway="Indian work status determines applicability of the Copyright Act and India's obligations under international treaties for that work.">
        <Definition term="Indian work (Section 2(y))">
          A literary, dramatic, or musical work whose author is a citizen of India at the time of
          publication, or a work made or first published in India.
        </Definition>
        <Points items={[
          'Indian citizenship of author at time of publication is sufficient.',
          'Works made in India even by foreign nationals may qualify.',
          'Unpublished works: citizenship at time of creation determines status.',
          'For Berne purposes, first publication in any Berne member country gives international protection.',
          'Indian work status ensures that Indian courts have clear jurisdiction in infringement disputes.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-joint',
    kicker: 'Co-creation',
    title: 'Joint Authorship',
    subtitle: 'Two or more authors whose contributions cannot be separately identified',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={6} visual={<CopyrightLayer />} tone={4} takeaway="Joint authors share copyright equally and must act together for assignment; duration is calculated from the last surviving author.">
        <Definition term="Joint authorship (Section 2(z))">
          Work produced by the collaboration of two or more authors in which the contribution of
          one author is not distinct from the contribution of the other author or authors.
        </Definition>
        <Points items={[
          'All co-authors are joint copyright owners with equal undivided shares (unless agreed otherwise).',
          'One co-author cannot assign or license the full copyright without consent of all others.',
          'Duration: life of the last surviving joint author + 60 years.',
          'Distinguished from collective work: in a collective work, each contributor owns their distinct section.',
          'Academic research papers written together by a team — classic joint authorship scenario.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-society',
    kicker: 'Collective management',
    title: 'Copyright Society',
    subtitle: 'Registered organisations managing rights collectively on behalf of owners',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<DecisionTree question="Protected?" left="Expression" right="Idea (free)" />} tone={4} reverse takeaway="Copyright societies enable efficient licensing — one agreement with a society covers thousands of works rather than individual negotiation with each author.">
        <Points items={[
          'Registered under Section 33 of the Copyright Act; minimum 7 members required.',
          'Manages rights of copyright owners collectively: licensing, royalty collection, distribution.',
          'IPRS (Indian Performing Right Society): music performing and broadcasting rights.',
          'IRRO (Indian Reprographic Rights Organisation): photocopying and reprographic rights for publishers.',
          'Broadcasters, streaming platforms, and event organisers deal with the society, not individual authors.',
          'Government may mandate that certain royalties flow exclusively through a registered society.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-board',
    kicker: 'Adjudication',
    title: 'Copyright Board / IPAB — Dispute Resolution',
    subtitle: 'Quasi-judicial body for copyright disputes and compulsory licences',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<CopyrightLayer />} tone={4} reverse takeaway="The Copyright Board adjudicated royalty disputes and compulsory licence applications; post-2021, these functions moved to jurisdictional High Courts.">
        <Points items={[
          'Constituted under Section 11 of the Copyright Act.',
          'Jurisdiction: compulsory licences, royalty fixation, assignment disputes, resale royalty.',
          'Compulsory licence: if owner withholds work from public, Section 31 allows Board to grant compulsory licence.',
          'Compulsory licence for persons with disabilities (Section 31B, added 2012 amendment).',
          'IPAB (Intellectual Property Appellate Board) later absorbed Copyright Board functions.',
          'Tribunals Reforms Act 2021 dissolved IPAB; IP appellate matters now go to jurisdictional High Courts.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-ceac',
    kicker: 'Enforcement advisory',
    title: 'CEAC — Copyright Enforcement Advisory Council',
    subtitle: 'Advisory body for coordinating copyright enforcement across India',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<DocumentJourney stages={['Author','Rights','Licence','Enforce']} />} tone={4} reverse takeaway="CEAC coordinates police, industry, and government to improve awareness and practical enforcement of copyright law at ground level.">
        <Points items={[
          'Advisory body established under the Ministry of Human Resource Development (Education).',
          'Advises government on enforcement strategies and implementation of copyright law.',
          'Reviews performance of enforcement agencies — State police IP cells, Customs.',
          'Recommends awareness campaigns, law enforcement training, judicial capacity building.',
          'Creative industries (film, music, software) coordinate with CEAC to report piracy hotspots.',
          'State governments expected to constitute their own Copyright Enforcement Cells.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-international',
    kicker: 'Global framework',
    title: 'International Copyright Agreements',
    subtitle: 'Four key treaties shaping copyright obligations worldwide',
    notes: '__gap:syllabus',
    content: (
      <Deck active={6} full takeaway="Berne is the foundation; WCT/WPPT extended it to the digital environment; TRIPS embedded copyright enforcement inside global trade law." tone={4}>
        <Cards items={[
          ['Berne Convention (1886)', 'Automatic protection, national treatment, no formalities required, minimum post-mortem term 50 years. India member since 1928.'],
          ['WCT — WIPO Copyright Treaty (1996)', 'Digital extension of Berne: right of making available online, mandatory TPM and RMI protection.'],
          ['WPPT — WIPO Performances & Phonograms Treaty (1996)', 'Extended rights for performers and phonogram producers in the digital environment; moral rights for performers.'],
          ['TRIPS Agreement (1994)', 'Minimum IP standards as part of WTO; enforcement obligations; copyright term minimum life + 50 years.'],
          ['India and WCT / WPPT', '2012 amendment aligned Indian copyright law with WCT/WPPT obligations — digital transmission rights, DRM provisions.'],
          ['National treatment principle', 'Each Berne/TRIPS member must give foreign creators the same protection it gives its own citizens.'],
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-copy-cases',
    kicker: 'Case illustrations',
    title: 'Classic Copyright Case Studies',
    subtitle: 'Learning the idea–expression dichotomy through landmark litigation',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<CopyrightLayer />} tone={4} takeaway="Courts consistently protect specific expression — never the theme, plot, or underlying idea behind a work.">
        <Example label="RG Anand vs Deluxe Films — Supreme Court of India (1978)">
          Playwright alleged that a film was a copy of his stage play on a shared social theme.
          The Court found no infringement: both works treated the same social problem, but the
          expression was independently crafted. Learning: copyright does not protect common themes
          or general plots — only the specific original expression.
        </Example>
        <Example label="Eastern Book Company vs DB Modak — Supreme Court of India (2008)">
          Publisher claimed copyright in editorial annotations to Supreme Court judgments.
          Court held: mere copy-editing a judgment without genuine creative authorial choice
          does not attract copyright. Learning: selection and arrangement requires real creative
          discretion beyond skill and industry alone.
        </Example>
      </Deck>
    ),
  }),

  /* IP Comparison bridge slide */
  slide({
    id: 'm4-ip-comparison',
    kicker: 'IP quick reference',
    title: 'Patent · Copyright · Trademark — at a glance',
    subtitle: 'Choosing the right tool for each layer of the EcoSense product',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<IpEcosystem />} tone={4} reverse layout="process" takeaway="One product may need multiple IP tools — choose based on what is being protected: technical solution, expression, or brand identifier.">
        <Cards items={[
          ['Patent','Protects: technical solution / process. How: registration (20-year term). When: before public disclosure.'],
          ['Copyright','Protects: original expression (software, paper, design drawings). How: automatic. When: on creation.'],
          ['Trademark','Protects: brand identifier (name, logo, slogan). How: registration (10-year renewable). When: before market launch.'],
          ['Industrial Design','Protects: visual appearance of a product. How: registration (10+5 years). When: before commercial launch.'],
          ['Trade Secret','Protects: confidential business information. How: contractual (NDA). When: indefinite if secrecy maintained.'],
        ]} />
      </Deck>
    ),
  }),

  /* ================================================================
     SECTION B — TRADEMARKS (divider)
  ================================================================ */
  slide({
    id: 'm4-trademark-divider',
    title: 'TRADEMARKS',
    layout: 'full',
    hideTitle: true,
    content: (
      <Divider
        number="B"
        title="TRADEMARKS"
        subtitle="Protecting identity in the marketplace."
        visual={<TrademarkIdentity />}
      />
    ),
  }),

  slide({
    id: 'm4-tm-eligibility',
    kicker: 'Trademark basics',
    title: 'What is a Trademark? Eligibility Criteria',
    subtitle: 'Section 2(zb), Trade Marks Act 1999',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={6} visual={<DocumentJourney stages={['Search','Apply','Oppose','Register']} />} tone={4} takeaway="Any distinctive sign that distinguishes goods or services of one enterprise from another can be registered as a trademark.">
        <Definition term="Trademark (Section 2(zb))">
          A mark capable of being represented graphically and capable of distinguishing the goods
          or services of one person from those of others; may include shape of goods, packaging,
          and combination of colours.
        </Definition>
        <Points items={[
          'Eligible: words, letters, numerals, devices, brand names, logos, slogans.',
          'Also eligible: shape of goods, packaging, colour combinations, sounds (if graphically representable).',
          'Key requirement: DISTINCTIVENESS — ability to identify the commercial source.',
          'Generic terms can never be registered (e.g., "WATER" for a water brand).',
          'EcoSense: the brand name is eligible if it carries no descriptive meaning for energy-monitoring devices.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-who-apply',
    kicker: 'Applicant',
    title: 'Who Can Apply for a Trademark?',
    subtitle: 'Any person claiming to be proprietor of the mark',
    notes: '__gap:syllabus',
    content: (
      <Deck active={6} visual={<TrademarkIdentity />} tone={4} reverse takeaway="Any legal or natural person who claims proprietorship — including proposed-use applicants — can file. Use or intent to use is required.">
        <Points items={[
          'Any person: individual, sole proprietor, partnership firm, company, trust, or association.',
          'Applicant must claim to be the proprietor of the mark.',
          'Can apply on "proposed to be used" basis before actual commercial use.',
          'Foreign applicants may apply under Paris Convention convention priority or Madrid System.',
          'A startup can register its brand name before product launch to secure priority rights.',
          'Well-known marks receive broader multi-class protection regardless of registration in unrelated classes.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-acts',
    kicker: 'Legislative history',
    title: 'Trademark Law in India — Legislative Lineage',
    subtitle: 'From colonial statute to TRIPS-compliant modern legislation',
    notes: '__gap:syllabus',
    content: (
      <Deck active={6} visual={<DecisionTree question="Distinctive?" left="Register" right="Descriptive risk" />} tone={4} reverse takeaway="The Trade Marks Act 1999 replaced the 1958 Act and is fully aligned with TRIPS and Paris Convention obligations.">
        <Flow items={['Trade Marks Act 1940', 'Trade & Merchandise Marks Act 1958', 'Trade Marks Act 1999', 'Trade Mark Rules 2017']} />
        <Points items={[
          'Trade Marks Act 1999: TRIPS-compliant; recognises service marks, well-known marks, collective and certification marks.',
          'Trade Mark Rules 2017: simplified procedures, online filing, fee revision, detailed well-known mark protocol.',
          'Section 2: comprehensive definitions including service mark, certification mark, collective mark.',
          'India follows the Nice Agreement classification system (45 classes: 34 goods, 11 services).',
          'Paris Convention: priority filing — apply in India within 6 months of filing abroad to claim that date.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-symbols',
    kicker: 'Symbols',
    title: 'Trademark Symbols: ™ and ®',
    subtitle: 'Signalling registration status to consumers and competitors',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={6} visual={<TrademarkIdentity />} tone={4} takeaway="Using ® for an unregistered mark is a punishable offence; ™ is a legitimate notice of a claimed common-law right.">
        <Compare
          leftTitle="™ — Unregistered claim"
          rightTitle="® — Registered mark"
          left={[
            'Indicates claimed common law / goodwill-based rights',
            'No legal registration required to use ™',
            'Signals trademark intent to the market',
            'Protection via passing off action only',
            'No criminal remedy for passing off alone',
          ]}
          right={[
            'Indicates a formally registered trademark',
            'Legal registration must have been obtained',
            'Strong statutory protection under the Act',
            'Using ® without registration is an offence',
            'Rights limited to registered class(es) of goods/services',
          ]}
        />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-classification',
    kicker: 'Classification',
    title: 'Nice Classification: 45 Classes',
    subtitle: 'International classification governing all trademark searches and registrations',
    notes: '__gap:syllabus',
    content: (
      <Deck active={6} visual={<DocumentJourney stages={['Identity','Search','File','Protect']} />} tone={4} reverse takeaway="Registration is class-specific — a company may need multiple class registrations to fully protect its brand across product and service lines.">
        <Cards items={[
          ['Classes 1–34 (Goods)', 'Chemicals, machinery, electronics, clothing, food, pharmaceuticals, instruments, etc.'],
          ['Classes 35–45 (Services)', 'Advertising, financial, insurance, communication, legal, education, etc.'],
          ['Class 9', 'Scientific instruments, software, electronic devices — directly relevant to EcoSense hardware and app.'],
          ['Class 42', 'Scientific research, software design, technology services.'],
          ['Multi-class filing', 'One application can cover multiple classes; fees multiply per class added.'],
          ['Strategic importance', 'Protection only in registered class(es); different class requires a separate registration.'],
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-not-compulsory',
    kicker: 'Registration vs common law',
    title: 'Registration is Not Compulsory',
    subtitle: 'Unregistered marks protected through the common law action of "passing off"',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={6} visual={<TrademarkIdentity />} tone={4} takeaway="Passing off protects goodwill even without registration, but the evidentiary burden is far heavier — registration is strongly advisable.">
        <Compare
          leftTitle="Registered Mark"
          rightTitle="Unregistered Mark (Passing Off)"
          left={[
            'Statutory rights under Trade Marks Act 1999',
            'Infringement action available directly',
            'Presumption of ownership from filing date',
            'Criminal remedies (imprisonment + fine) available',
            'Customs recordation for border enforcement',
          ]}
          right={[
            'Common law protection based on goodwill',
            'Must prove: reputation, misrepresentation, likely damage',
            'Expensive litigation; goodwill must be proved',
            'No criminal remedy for passing off alone',
            'Cannot display ® symbol; no border enforcement tool',
          ]}
        />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-validity',
    kicker: 'Duration',
    title: 'Trademark Validity and Renewal',
    subtitle: 'Ten years, renewable indefinitely — but actual use is essential',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<DocumentJourney stages={['Search','Apply','Oppose','Register']} />} tone={4} reverse takeaway="Unlike patents and copyrights, a trademark can last forever — as long as it is renewed and genuinely used in trade.">
        <Points items={[
          'Initial registration: 10 years from the date of filing the application.',
          'Renewal: further periods of 10 years, indefinitely, on payment of renewal fee.',
          'Non-renewal: mark becomes liable for removal after a grace period.',
          'Non-use: if a registered mark is not genuinely used for 5 consecutive years, any person may apply for removal (Section 47).',
          'Genericide: if a mark becomes the generic name for a product category, it can be cancelled (e.g., trademarks that became common nouns in some countries).',
          'The EcoSense brand must be continuously used and renewed to remain protected.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-types',
    kicker: 'Varieties',
    title: 'Types of Trademarks Recognised in India',
    subtitle: 'Trade Marks Act 1999 recognises several distinct categories',
    notes: '__gap:syllabus',
    content: (
      <Deck active={6} visual={<TrademarkIdentity />} tone={4} reverse takeaway="Beyond ordinary product marks, India recognises collective, certification, and well-known marks — each with distinct eligibility and enforcement rules.">
        <Cards items={[
          ['Individual / Ordinary Mark', 'Standard mark identifying goods or services of one enterprise.'],
          ['Service Mark', 'Identifies services rather than goods (e.g., a consulting firm\'s logo or tagline).'],
          ['Collective Mark', 'Used by members of an association; indicates membership or shared regional origin.'],
          ['Certification Mark', 'Certifies quality, material, or other standard characteristics (ISI mark, Agmark).'],
          ['Well-Known Mark', 'Enjoys protection across all classes owing to high reputation; cross-class infringement recognised.'],
          ['Series Mark', 'Multiple marks differing only in non-distinctive particulars registered as a single series.'],
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-well-known',
    kicker: 'Well-known marks',
    title: 'Cross-class protection for high-reputation marks',
    subtitle: 'Section 11(6)-(9), Trade Marks Act 1999',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={6} visual={<DecisionTree question="Distinctive?" left="Register" right="Descriptive risk" />} tone={4} takeaway="A well-known mark may be protected even in classes where it is not registered — the reputation itself is the source of protection.">
        <Definition term="Well-known trademark">
          A mark that is widely known to the relevant section of the public in India, such that
          use of that mark on dissimilar goods or services would indicate a connection with the
          registered proprietor and likely cause damage to the proprietor's interests.
        </Definition>
        <Points items={[
          'Recognition criteria: knowledge of the mark in the relevant trade sector, registration history, record of enforcement',
          'Benefit: prevents registration and use of identical/similar marks even in unrelated classes',
          'Examples (internationally): TATA, GOOGLE, APPLE — protection extends to categories they don\'t actively operate in',
          'Application: any person may apply to CGPDTM to have a mark declared well-known',
          'Once declared: entered in the Register of Well-Known Trademarks — publicly searchable',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-registry',
    kicker: 'Administration',
    title: 'Trade Marks Registry in India',
    subtitle: 'Principal Registry Mumbai; branch offices covering all regions',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<TrademarkIdentity />} tone={4} reverse takeaway="The Registry maintains the Register, examines applications, administers opposition proceedings, and publishes the Trade Marks Journal.">
        <Points items={[
          'Head Office: Mumbai. Branch offices: Delhi, Kolkata, Chennai, Ahmedabad.',
          'Jurisdiction based on applicant\'s principal place of business in India.',
          'Maintains the single Register of Trade Marks.',
          'Publishes Trade Marks Journal — required for advertising accepted applications for opposition.',
          'Online filing system available on IP India portal (ipindia.gov.in); real-time status tracking.',
          'Annual statistics reports on trademark filing trends published by the Registry.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-process',
    kicker: 'Registration process',
    title: 'Trademark Registration Process',
    subtitle: 'From prior-art search to registration certificate',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<DocumentJourney stages={['Identity','Search','File','Protect']} />} tone={4} reverse takeaway="Examination for distinctiveness and the opposition window are the two critical gatekeeping stages in trademark registration.">
        <Flow items={['Prior-art search', 'File Form TM-A', 'Examination report', 'Reply to objections', 'Advertise in TM Journal', 'Opposition period (4 months)', 'Registration certificate issued']} />
        <Points items={[
          'Application on Form TM-A; specify class(es), goods/services, applicant details.',
          'Examiner raises objections: descriptiveness, deceptive similarity to existing marks.',
          'If accepted: published in Trade Marks Journal; open to opposition by any person for 4 months.',
          'If unopposed or opposition fails: registration certificate issued.',
          'Registration is backdated to the filing date — important for establishing priority.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-opposition',
    kicker: 'Opposition',
    title: 'Trademark Opposition — Who Can Oppose and When',
    subtitle: 'Sections 25, 57 — opposition and rectification',
    notes: '__gap:syllabus',
    content: (
      <Deck active={7} visual={<TrademarkIdentity />} tone={4} reverse takeaway="The opposition window is the public's primary safeguard against incorrect or deceptive trademark registrations.">
        <Points items={[
          'Any person may file a notice of opposition within 4 months of journal publication',
          'No need to demonstrate a personal interest — any person (individual, company, association) may oppose',
          'Opposition grounds: similar/identical to existing mark, deceptive, generic, against public morality',
          'Process: notice of opposition → counter-statement from applicant → evidence stages → hearing',
          'Post-registration rectification (Section 57): any aggrieved person may apply to remove or amend a registered mark at any time',
          'Groundless threats of opposition proceedings may create a cause of action — do not file without merit',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-prior-art',
    kicker: 'Pre-filing due diligence',
    title: 'Trademark Prior-Art Search',
    subtitle: 'Essential screening before any trademark application is filed',
    notes: '__gap:syllabus',
    content: (
      <Deck active={6} visual={<DocumentJourney stages={['Search','Apply','Oppose','Register']} />} tone={4} reverse takeaway="Searching before filing avoids wasted investment in a mark likely to be refused — and avoids inadvertently infringing an existing registration.">
        <Points items={[
          'Search on IP India Public Search portal (trademark.ipo.gov.in) for identical marks in the class.',
          'Check for deceptively similar marks — phonetically, visually, and conceptually similar marks.',
          'Check unregistered well-known marks used in trade (common law).',
          'International search via WIPO Global Brand Database for marks with India effect.',
          'Consider identical and similar goods/services across adjacent classes.',
          'A clean search report supports the decision to proceed, modify the mark, or abandon it before heavy investment.',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-infringement',
    kicker: 'Trademark infringement',
    title: 'Infringement, passing off, and remedies',
    subtitle: 'Sections 29–30, Trade Marks Act 1999 — statutory and common-law routes',
    notes: '__gap:syllabus',
    content: (
      <Deck density="dense" active={6} visual={<TrademarkIdentity />} tone={4} takeaway="Statutory infringement is simpler to prove than passing off — but both routes lead to injunctions and damages.">
        <Compare
          leftTitle="Statutory infringement (registered mark)"
          rightTitle="Passing off (unregistered mark)"
          left={[
            'Use of identical or deceptively similar mark in registered class',
            'No need to prove actual damage — infringement per se',
            'Criminal remedies available',
            'Police may seize goods on production of registration certificate',
          ]}
          right={[
            'Must prove: goodwill + misrepresentation + damage (the "trinity" test)',
            'More expensive and time-consuming',
            'Civil remedies only',
            'Stronger case requires evidence of actual consumer confusion',
          ]}
        />
        <Points items={[
          'Remedies for both: injunction, damages or account of profits, delivery-up and destruction of infringing goods',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-madrid',
    kicker: 'International trademarks',
    title: 'Madrid System — One Application, Many Countries',
    subtitle: 'WIPO-administered international trademark filing system',
    notes: '__gap:syllabus',
    content: (
      <Deck active={6} visual={<DecisionTree question="Distinctive?" left="Register" right="Descriptive risk" />} tone={4} reverse takeaway="Madrid simplifies multi-country trademark filing — one application in one language, one fee structure, through WIPO.">
        <Points items={[
          'Madrid System: based on two treaties — Madrid Agreement and Madrid Protocol',
          'India joined the Madrid Protocol in July 2013 — Indian applicants can now file internationally via WIPO',
          'Process: file a basic application in India → file international application through IP India → WIPO notifies designated countries',
          'Covers 130+ member countries — most major markets (USA, EU, China, Japan, UK) are members',
          'Centralised management: renewals, owner changes, address changes all handled through one WIPO record',
          'Limitation: if the Indian basic mark fails within 5 years, the international registration also collapses (central attack)',
        ]} />
      </Deck>
    ),
  }),

  slide({
    id: 'm4-tm-coca-cola-bisleri',
    kicker: 'Case study',
    title: 'Coca-Cola vs Bisleri International — Maaza Mark Dispute',
    subtitle: 'Territorial scope of trademark licensing: what counts as "use in India"',
    notes: '__gap:syllabus',
    content: (
      <Deck
        active={7}
        reverse
        tone={4}
        layout="process"
        visual={
          <CaseTimeline
            title="Maaza Mark — Territorial Scope"
            events={[
              ['Background', 'Bisleri held Maaza fruit-drink brand in India'],
              ['Transfer', 'Assigned Maaza formulation & India rights to Coca-Cola'],
              ['Dispute', 'Bisleri later used Maaza mark for export from India'],
              ['Legal Question', 'Does export from India infringe India-specific assignment?'],
              ['Delhi HC', 'Restrained Bisleri — export from India is "use in India"'],
              ['Learning', 'Territory of assignment includes all commercial activity within that territory'],
            ]}
          />
        }
        takeaway="When you assign or license a mark for a territory, all commercial activity within that territory — including manufacturing for export — falls within the assignment."
      >
        <Points items={[
          'Bisleri assigned the Maaza brand, formulation, and trademark for India to Coca-Cola.',
          'Bisleri later attempted to produce and export Maaza-branded drinks from Indian facilities.',
          'Delhi High Court: exporting from India using the mark constitutes use of the mark in India.',
          'Key lesson: territorial IP agreements must precisely define all permitted and excluded commercial acts.',
        ]} />
      </Deck>
    ),
  }),

  /* ================================================================
     MODULE 4 — RESOURCE HUB
  ================================================================ */
  slide({
    id: 'm4-resource-hub',
    kicker: 'Study resources',
    title: 'Module 4 Study Resources',
    subtitle: 'Copyright and Trademarks — revision, practice, and previous-year questions',
    content: (
      <ResourceHub moduleId="module-4" />
    ),
  }),
]

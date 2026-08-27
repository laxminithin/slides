import { Banknote } from 'lucide-react'
import {
  buildModule, Frame, Cards, Flow, Insight, ExamTip, Update, Case, Definition, Compare, Orbit,
} from './kit'

/* NOTE: V8 content — upgraded to full V9 MBA depth in a later pass (Module 1 first). */
const module6 = [
  {
    id: 'marketing',
    labels: ['Global Marketing', 'IHRM', 'Finance', 'Capital Markets', 'Equity Markets', 'Production', 'Manufacturing'],
    title: 'International / Global Marketing',
    content: (
      <Frame
        label="Market studio"
        title="International marketing turns global opportunity into customer value"
        lead="International marketing plans and executes product, price, promotion and distribution across countries to satisfy individual and organizational objectives."
        visual={<Orbit center="Global Marketing" items={['Research', 'Product', 'Price', 'Place', 'Promotion', 'Control']} />}
        takeaway="Marketing questions often combine definition, nature, functions and strategy."
      >
        <Definition term="International Marketing" keywords={['planning', 'pricing', 'promotion', 'distribution', 'exchange']}>
          The multinational process of creating and delivering ideas, goods and services across borders in ways that satisfy customers and organizations.
        </Definition>
      </Frame>
    ),
  },
  {
    id: 'marketing-strategy',
    title: 'Functions, Actors and Competitive Strategies',
    content: (
      <Frame
        mode="visual-lead"
        label="Go-to-market"
        title="Global marketing is a network, not a department"
        lead="It involves MNCs, governments, regulators, international organizations, exporters, importers, intermediaries, agencies, financial institutions, cultural experts and technology providers."
        visual={<Compare items={[
          { title: 'Functions', text: 'analytical, production, control, research, administrative and sales/distribution functions.' },
          { title: 'Strategy', text: 'segmentation, product, price, place and promotion decisions.' },
          { title: 'Competition', text: 'standardization vs adaptation, localization, branding, alliances, e-commerce, CRM and pricing.' },
        ]} />}
        takeaway="A strong marketing answer connects actors, functions and competitive strategy."
      >
        <Case title="Samsung localization">Samsung sells globally but adapts product features, pricing, distribution and campaigns to local competition and customer behavior.</Case>
      </Frame>
    ),
  },
  {
    id: 'ihrm',
    title: 'Global HRM / IHRM',
    content: (
      <Frame
        label="People system"
        title="Global HRM aligns people across countries and cultures"
        lead="IHRM manages recruiting, staffing, training, compensation, performance and employee relations across different legal, economic and cultural environments."
        visual={<Flow steps={[
          { title: 'Planning', text: 'forecast global talent needs' },
          { title: 'Recruitment', text: 'select PCNs, HCNs and TCNs' },
          { title: 'Training', text: 'prepare cultural and technical capability' },
          { title: 'Remuneration', text: 'balance cost, tax and fairness' },
          { title: 'Performance', text: 'align global standards with local realities' },
          { title: 'Relations', text: 'manage employee expectations and law' },
        ]} />}
        takeaway="IHRM is more complex than domestic HRM because environments and employee categories differ."
      >
        <Insight>Remote work, global capability centers and distributed teams have made cross-border HRM important even for firms without traditional expatriate-heavy models.</Insight>
      </Frame>
    ),
  },
  {
    id: 'finance-capital',
    title: 'International Finance and Global Capital Markets',
    content: (
      <Frame
        mode="dashboard"
        label="Finance desk"
        title="Capital connects savers, firms and countries"
        lead="International finance studies monetary interactions between countries, including FDI, exchange rates and global capital flows."
        visual={<Cards icon={Banknote} items={[
          { title: 'Capital markets', text: 'link savers with long-term investment opportunities through intermediaries.' },
          { title: 'Features', text: 'liquidity, long-term investment, instruments, regulation and capital formation.' },
          { title: 'Growth trends', text: 'equity strength, Asian market rise, private-market adaptation and innovation focus.' },
          { title: 'Digital finance', text: 'FinTech, digital payments and blockchain-based trade finance are changing transactions.' },
        ]} />}
        takeaway="Connect finance with exchange-rate risk, investment and capital-market access."
      >
        <ExamTip>Use examples of NYSE, Nasdaq, LSE, Tokyo, Euronext, Shanghai and Hong Kong for global equity markets.</ExamTip>
      </Frame>
    ),
  },
  {
    id: 'equity',
    title: 'Global Equity Market',
    content: (
      <Frame
        label="Exchange floor"
        title="Global equities allow firms and investors to meet worldwide"
        lead="A global equity market is the worldwide system where investors buy and sell shares listed across major exchanges."
        visual={<Orbit center="Equity Markets" items={['NYSE', 'Nasdaq', 'LSE', 'Tokyo', 'Euronext', 'Shanghai', 'Hong Kong']} />}
        takeaway="Equity markets are important for capital raising, valuation and global investor participation."
      >
        <Case title="Indian tech listings">Global investors evaluate Indian IT, platform and manufacturing firms through public markets, ADRs, funds and cross-border investment channels.</Case>
      </Frame>
    ),
  },
  {
    id: 'production',
    title: 'International Production and Global Manufacturing',
    content: (
      <Frame
        mode="visual-lead"
        label="Factory network"
        title="Production is now a global design problem"
        lead="International production management coordinates production activities across countries to optimize efficiency, cost, quality and market responsiveness."
        visual={<Flow steps={[
          { title: 'Location', text: 'choose sites by cost, market demand, regulation and capability' },
          { title: 'Adaptation', text: 'fit technology, design and logistics to local conditions' },
          { title: 'Coordination', text: 'integrate suppliers, factories and distribution networks' },
          { title: 'Quality', text: 'maintain standards across dispersed facilities' },
          { title: 'Resilience', text: 'prepare for disruptions, tariffs and geopolitical risk' },
        ]} />}
        takeaway="Global manufacturing answers should include benefits and challenges."
      >
        <Update>Smart manufacturing, digital twins, green logistics and supply-chain control towers are now central to global production management.</Update>
      </Frame>
    ),
  },
]

export const internationalBusinessModule6Slides = buildModule(6, module6)

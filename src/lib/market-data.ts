// Live market data (display-only, read-only) - simulated realistic prices
export type TickerItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  region: 'crypto' | 'india' | 'us' | 'commodity' | 'forex';
};

export const TICKER_ITEMS: TickerItem[] = [
  { symbol: 'BTC', name: 'Bitcoin', price: 67432.18, change: 1284.32, changePercent: 1.94, region: 'crypto' },
  { symbol: 'ETH', name: 'Ethereum', price: 3542.67, change: -42.18, changePercent: -1.18, region: 'crypto' },
  { symbol: 'SOL', name: 'Solana', price: 178.45, change: 8.92, changePercent: 5.26, region: 'crypto' },
  { symbol: 'NIFTY 50', name: 'NIFTY 50', price: 24847.55, change: 132.40, changePercent: 0.54, region: 'india' },
  { symbol: 'BANK NIFTY', name: 'Bank NIFTY', price: 53412.30, change: -218.65, changePercent: -0.41, region: 'india' },
  { symbol: 'SENSEX', name: 'BSE SENSEX', price: 81342.71, change: 412.18, changePercent: 0.51, region: 'india' },
  { symbol: 'NASDAQ', name: 'NASDAQ', price: 19842.34, change: 124.56, changePercent: 0.63, region: 'us' },
  { symbol: 'S&P 500', name: 'S&P 500', price: 5932.18, change: 18.42, changePercent: 0.31, region: 'us' },
  { symbol: 'GOLD', name: 'Gold (oz)', price: 2642.50, change: 12.40, changePercent: 0.47, region: 'commodity' },
  { symbol: 'SILVER', name: 'Silver (oz)', price: 31.24, change: -0.18, changePercent: -0.57, region: 'commodity' },
  { symbol: 'CRUDE', name: 'Crude Oil', price: 71.84, change: 0.92, changePercent: 1.30, region: 'commodity' },
  { symbol: 'USD/INR', name: 'USD/INR', price: 84.27, change: -0.12, changePercent: -0.14, region: 'forex' },
  { symbol: 'EUR/USD', name: 'EUR/USD', price: 1.0784, change: 0.0024, changePercent: 0.22, region: 'forex' },
  { symbol: 'GBP/USD', name: 'GBP/USD', price: 1.2942, change: -0.0048, changePercent: -0.37, region: 'forex' },
];

export const COURSES = [
  {
    id: 'beginner',
    title: 'Beginner Trading',
    subtitle: 'Foundations of the Markets',
    description:
      'Master the fundamentals: market structure, order types, charting basics, and the discipline required to trade with confidence.',
    duration: '4 Weeks',
    level: 'Beginner',
    price: 4999,
    originalPrice: 8999,
    features: [
      'Market structure & mechanics',
      'Candlestick patterns deep-dive',
      'Risk management foundations',
      'Trading psychology primer',
      '12 live sessions',
      'Private community access',
    ],
    bonuses: ['Trading journal template', 'Beginner checklist', 'Lifetime updates'],
  },
  {
    id: 'price-action',
    title: 'Price Action',
    subtitle: 'Read the Tape Like a Pro',
    description:
      'Trade naked charts with precision. Learn to read institutional order flow, key levels, and high-probability setups without indicators.',
    duration: '6 Weeks',
    level: 'Intermediate',
    price: 7999,
    originalPrice: 12999,
    featured: true,
    features: [
      'Multi-timeframe analysis',
      'Supply & demand zones',
      'Institutional order flow',
      'High-probability setups',
      '18 live sessions',
      '1-on-1 review',
    ],
    bonuses: ['Premium journal', 'Daily watchlist sheet', 'Private mastermind'],
  },
  {
    id: 'swing',
    title: 'Swing Trading',
    subtitle: 'Capture Multi-Day Moves',
    description:
      'Build a complete swing trading playbook. Position sizing, entry refinement, and trade management for consistent multi-day setups.',
    duration: '6 Weeks',
    level: 'Intermediate',
    price: 6999,
    originalPrice: 11999,
    features: [
      'Swing setup identification',
      'Position sizing models',
      'Trade management framework',
      'Sector rotation analysis',
      '14 live sessions',
      'Recorded library',
    ],
    bonuses: ['Sector scanner', 'Risk calculator', 'Mentor Q&A access'],
  },
  {
    id: 'intraday',
    title: 'Intraday Trading',
    subtitle: 'Daily Precision',
    description:
      'Trade the opening range, manage volatility, and exit with discipline. Built for traders ready to be screen-active every day.',
    duration: '8 Weeks',
    level: 'Advanced',
    price: 9999,
    originalPrice: 16999,
    features: [
      'Opening range breakouts',
      'Intraday volatility models',
      'Real-time trade execution',
      'News-based setups',
      '24 live sessions',
      'Daily morning prep',
    ],
    bonuses: ['Live trading room', 'Scanner access', 'Daily recaps'],
  },
  {
    id: 'options',
    title: 'Options Trading',
    subtitle: 'Defined Risk, Asymmetric Returns',
    description:
      'Master options Greeks, spreads, and risk-defined strategies. From directional plays to income generation and volatility trades.',
    duration: '8 Weeks',
    level: 'Advanced',
    price: 11999,
    originalPrice: 19999,
    features: [
      'Greeks mastery',
      'Vertical & iron condors',
      'Earnings strategies',
      'Volatility selling',
      '20 live sessions',
      'Options chain walkthroughs',
    ],
    bonuses: ['Options calculator', 'Payoff diagrams', 'Strategy playbook'],
  },
  {
    id: 'forex',
    title: 'Forex Trading',
    subtitle: 'Global Currency Markets',
    description:
      'Trade the most liquid market in the world. Sessions, correlations, and macro-driven setups across major and minor pairs.',
    duration: '6 Weeks',
    level: 'Intermediate',
    price: 7999,
    originalPrice: 12999,
    features: [
      'Session-based trading',
      'Currency correlations',
      'Carry trade concepts',
      'Macro event plays',
      '16 live sessions',
      'Daily London/NY prep',
    ],
    bonuses: ['Pair correlation sheet', 'Economic calendar', 'Live sessions archive'],
  },
  {
    id: 'crypto',
    title: 'Crypto Trading',
    subtitle: '24/7 Market Edge',
    description:
      'Navigate crypto volatility with structure. Spot, perpetuals, on-chain reads, and risk frameworks for the always-on market.',
    duration: '6 Weeks',
    level: 'Intermediate',
    price: 8999,
    originalPrice: 14999,
    features: [
      'Spot & perpetual strategies',
      'On-chain analysis',
      'Alt-coin selection',
      'DeFi-native setups',
      '16 live sessions',
      'Weekly market reviews',
    ],
    bonuses: ['On-chain dashboard access', 'Alt research reports', 'VIP Discord'],
  },
];

export const TESTIMONIALS = [
  {
    name: 'Rohan Verma',
    role: 'Full-time Trader',
    location: 'Mumbai',
    quote:
      'Trade Boom completely rewired how I approach the markets. The Price Action course gave me a framework I actually trust. I am now consistently profitable after 18 months of struggle.',
    rating: 5,
    course: 'Price Action',
  },
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    location: 'Bangalore',
    quote:
      'I started with zero knowledge. Ankit structured every concept from first principles. The community alone is worth 10x the price. The Intraday course is rigorous and honest.',
    rating: 5,
    course: 'Intraday',
  },
  {
    name: 'Arjun Patel',
    role: 'Options Trader',
    location: 'Delhi',
    quote:
      'What separates Trade Boom is the discipline-first philosophy. No hype, no shortcuts — just clean, executable strategies. The Options course gave me tools I use every single day.',
    rating: 5,
    course: 'Options',
  },
  {
    name: 'Sneha Iyer',
    role: 'Part-time Trader',
    location: 'Pune',
    quote:
      'The mentorship program is unmatched. Ankit reviewed my trades, pointed out blind spots I never saw, and held me accountable. My win rate jumped from 38% to 61% in three months.',
    rating: 5,
    course: 'Mentorship',
  },
  {
    name: 'Karthik Reddy',
    role: 'Swing Trader',
    location: 'Hyderabad',
    quote:
      'I had been burned by signal services before. Trade Boom is different — they teach you to fish. The Swing course gave me independence. I no longer need anyone telling me what to do.',
    rating: 5,
    course: 'Swing Trading',
  },
  {
    name: 'Ananya Krishnan',
    role: 'Crypto Trader',
    location: 'Chennai',
    quote:
      'The Crypto course balances technical skill with risk discipline. Ankit is brutally honest about drawdowns. That honesty is rare and exactly what beginners need to hear.',
    rating: 5,
    course: 'Crypto',
  },
];

export const STATS = [
  { label: 'Active Students', value: 1240, suffix: '+' },
  { label: 'Hours of Mentorship', value: 2300, suffix: '+' },
  { label: 'Years of Experience', value: 7, suffix: '' },
  { label: 'Community Members', value: 2500, suffix: '+' },
];

export const FAQ_ITEMS = [
  {
    question: 'I am a complete beginner. Is Trade Boom right for me?',
    answer:
      'Absolutely. Our Beginner Trading course starts from first principles — market structure, charting, risk management, and the psychology of trading. You will be guided step by step through live sessions, recorded lessons, and personal mentorship. We have helped thousands of complete beginners build a solid foundation.',
  },
  {
    question: 'Do you provide stock tips or investment advice?',
    answer:
      'No. Trade Boom is strictly educational. We are not registered with SEBI and do not provide investment advisory, portfolio management, or stock recommendations. We teach you frameworks, strategies, and risk management so you can make your own informed decisions. Your trading decisions are entirely your own responsibility.',
  },
  {
    question: 'How are the courses delivered?',
    answer:
      'All courses combine pre-recorded high-quality video lessons, weekly live sessions, and a private community. You get lifetime access to updates, downloadable resources, and direct Q&A access. Advanced programs include 1-on-1 trade reviews and personal mentorship.',
  },
  {
    question: 'What is the time commitment?',
    answer:
      'Most courses require 4–6 hours per week (1–2 hours of live session + 3–4 hours of practice and homework). The mentorship program is more flexible and tailored to your schedule. We design programs for working professionals and students.',
  },
  {
    question: 'Do I get a certificate?',
    answer:
      'Yes. Every course includes a verified certificate of completion, which you can add to your LinkedIn and professional profile. More importantly, you will have a verified track record of work, trade journals, and frameworks you have built.',
  },
  {
    question: 'What if I am not satisfied with the course?',
    answer:
      'We offer a 14-day satisfaction guarantee. If you are not happy with the content within the first 14 days, reach out and we will refund your investment in full, no questions asked. We are confident in the quality of our education.',
  },
  {
    question: 'Is there a community I can join?',
    answer:
      'Yes. Every course includes access to our private community on Telegram and Discord. The mentorship program includes a private mastermind group with daily market prep, trade ideas, and direct interaction with Ankit.',
  },
  {
    question: 'How is Trade Boom different from other courses?',
    answer:
      'Three things: 1) We focus on discipline and risk management over flashy strategies. 2) Our mentorship is personal — Ankit reviews trades, not algorithms. 3) We are brutally honest about what works and what does not. No hype, no guaranteed returns, no shortcuts.',
  },
];

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Courses', href: '#courses' },
  { label: 'Results', href: '#results' },
  { label: 'Mentorship', href: '#mentorship' },
  { label: 'Community', href: '#community' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export const TIMELINE = [
  { year: '2019', title: 'First Trade', description: 'Entered the markets with curiosity and a small capital — and a lot to learn.' },
  { year: '2020', title: 'First Drawdown & System', description: 'Experienced real market volatility. Learned that risk management and capital preservation are everything.' },
  { year: '2021', title: 'Consistency & System', description: 'Rebuilt with a rules-based approach, strict risk controls, and disciplined process.' },
  { year: '2023', title: 'Trade Boom Founded', description: 'Launched Trade Boom to bring structured, honest education to retail traders.' },
  { year: '2024', title: 'Community Growth', description: 'Grew active student community across India with structured learning and live market sessions.' },
  { year: '2026', title: 'Premium Mentorship', description: 'Expanded 1-on-1 mentorship and advanced trading frameworks for dedicated traders.' },
];

export const COMMUNITY_LINKS = [
  {
    name: 'Telegram',
    description: 'Real-time trade ideas, daily market prep, and direct community access.',
    members: '2,500+',
    icon: 'telegram',
    href: '#',
  },
  {
    name: 'Discord',
    description: 'Deep-dive discussions, journal reviews, and live session access.',
    members: '1,240+',
    icon: 'discord',
    href: '#',
  },
  {
    name: 'YouTube',
    description: 'Free weekly market breakdowns, educational content, and trade walkthroughs.',
    members: '2,500+',
    icon: 'youtube',
    href: '#',
  },
  {
    name: 'Instagram',
    description: 'Daily charts, mindset posts, and behind-the-scenes from the journey.',
    members: '2,500+',
    icon: 'instagram',
    href: '#',
  },
  {
    name: 'WhatsApp',
    description: 'Exclusive broadcast list for high-signal updates and announcements.',
    members: '1,240+',
    icon: 'whatsapp',
    href: '#',
  },
  {
    name: 'Newsletter',
    description: 'Weekly market insight, psychology, and exclusive frameworks in your inbox.',
    members: '2,500+',
    icon: 'mail',
    href: '#',
  },
];

export const RESOURCES = [
  {
    title: 'Trading Journal',
    description: 'A structured, no-fluff journal template to log every trade and review weekly.',
    type: 'Template',
    icon: 'book',
    href: '/resources/trading-journal.csv',
    download: true,
  },
  {
    title: 'Risk Calculator',
    description: 'Position sizing and risk-reward calculator built for disciplined traders.',
    type: 'Tool',
    icon: 'calculator',
    href: '#trading-calculator',
  },
  {
    title: 'Pre-Market Checklist',
    description: 'The exact checklist Ankit uses every morning before the opening bell.',
    type: 'PDF',
    icon: 'checklist',
    href: '/resources/pre-market-checklist.txt',
    download: true,
  },
  {
    title: 'Trading Psychology Guide',
    description: 'The mental models and routines that separate consistent traders from the rest.',
    type: 'PDF',
    icon: 'brain',
    href: '/resources/trading-psychology-guide.txt',
    download: true,
  },
  {
    title: 'Weekly Newsletter',
    description: 'Market insights, framework breakdowns, and exclusive educational content.',
    type: 'Email',
    icon: 'mail',
    href: '#footer',
  },
  {
    title: 'Market Insights',
    description: 'Long-form analysis of market structure, macro trends, and sector rotation.',
    type: 'Research',
    icon: 'chart',
    href: '#blog',
  },
];

export const BLOG_POSTS = [
  {
    title: 'The Psychology of Cutting Losses Early',
    excerpt: 'Why the hardest trade is the one you should have taken — and how to build the muscle for it.',
    category: 'Psychology',
    readTime: '8 min',
    date: 'Aug 2026',
    featured: true,
  },
  {
    title: 'Position Sizing: The Edge Most Traders Ignore',
    excerpt: 'A deep dive into the math behind risk-per-trade and why most accounts blow up.',
    category: 'Risk',
    readTime: '12 min',
    date: 'Jul 2026',
  },
  {
    title: 'Reading Multi-Timeframe Structure',
    excerpt: 'How to align your trades with the dominant trend without second-guessing every entry.',
    category: 'Technical',
    readTime: '10 min',
    date: 'Jul 2026',
  },
  {
    title: 'The Difference Between a System and a Strategy',
    excerpt: 'Strategies are entries. Systems are businesses. Here is how to build the latter.',
    category: 'Process',
    readTime: '9 min',
    date: 'Jun 2026',
  },
  {
    title: 'Macro Is Always Right: Trading the Big Picture',
    excerpt: 'When the Fed, liquidity, and risk cycles matter more than any pattern on your chart.',
    category: 'Macro',
    readTime: '14 min',
    date: 'Jun 2026',
  },
  {
    title: 'A Trader\'s Relationship with Drawdowns',
    excerpt: 'Drawdowns are not failures. They are tuition. Here is how to pay it once.',
    category: 'Psychology',
    readTime: '7 min',
    date: 'May 2026',
  },
];

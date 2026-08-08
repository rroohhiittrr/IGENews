import { CompanyCard, CompanyDetail, NewsCard, Sector, Country, FilterMeta, CompanyTier } from '@/types/company';

// ─────────────────────────────────────────────────────────────────────────────
// SEEDED RNG FOR CONSISTENT DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const SEED = 42;
let seed = SEED;

function seededRandom(): number {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

function seededChoice<T>(arr: T[]): T {
  return arr[Math.floor(seededRandom() * arr.length)];
}

function seededRange(min: number, max: number): number {
  return min + Math.floor(seededRandom() * (max - min + 1));
}

// Helper to generate a fake UUID since crypto is not guaranteed to be globally available in all environments
function fakeUuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (seededRandom() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM LIGHTWEIGHT FAKERS (Replacement for @faker-js/faker)
// ─────────────────────────────────────────────────────────────────────────────
const LOREM_SENTENCES = [
  "Bilateral trade channels have shown remarkable growth this quarter.",
  "New compliance guidelines are set to reshape manufacturing exports.",
  "Investment in smart grid infrastructure is accelerating across industrial corridors.",
  "Digital integration has improved logistical efficiency by over thirty percent.",
  "Key industry players are expanding their supply chains into secondary trade routes.",
  "Strategic mergers in the semiconductor cluster highlight the competitive landscape.",
  "B2B trade flows remain resilient despite minor regulatory disruptions.",
  "Local manufacturing hubs report high order books for the upcoming export cycle.",
  "Renewable mandates are driving steel manufacturers to transition to zero-carbon energy.",
  "Global container shipping rates have stabilized after a volatile period.",
  "Technological updates in clean energy grids are yielding higher ROI.",
  "Trade policies have simplified custom clearances for micro, small, and medium enterprises."
];

const BUZZ_PHRASES = [
  "Streamline global supply chains with advanced blockchain telemetry.",
  "Accelerate cross-border trade settlements through localized compliance APIs.",
  "Pioneer zero-carbon smelting practices for high-tensile metallurgical output.",
  "Optimize logistics corridors using predictive machine learning algorithms.",
  "Empower MSMEs with frictionless trade finance and credit guarantees.",
  "Deliver end-to-end trace auditing for pharmaceuticals distribution networks.",
  "Enable real-time custom verification using digital container ledger nodes.",
  "Scale decentralized energy distribution modules for industrial parks."
];

const CATCH_PHRASES = [
  "Decentralizing trade intelligence for global supply chains.",
  "Pioneering sustainable engineering solutions for emerging markets.",
  "Revolutionizing logistics telemetry with real-time analytics.",
  "Driving carbon-neutral manufacturing lines for high-tech sectors.",
  "Frictionless trade finance for enterprise exporters.",
  "Connecting bilateral corridors with verified B2B data pipelines."
];

const CITIES = ["Mumbai", "Bengaluru", "Chennai", "Pune", "Gurugram", "San Jose", "Munich", "Singapore City", "Dubai", "London", "Tokyo"];
const STATES = ["Maharashtra", "Karnataka", "Tamil Nadu", "Haryana", "California", "Bavaria", "Central Region", "Dubai", "England", "Kanto"];
const FIRST_NAMES = ["Rohan", "Arjun", "Aditya", "Vikram", "Priyanka", "Neha", "Sarah", "Michael", "Kenji", "Fatima", "Deepak"];
const LAST_NAMES = ["Sharma", "Nair", "Tirakapdi", "Joshi", "Patel", "Smith", "Schmidt", "Tan", "Al-Maktoum", "Sato", "Sen"];
const BUSINESS_VERBS = ["Innovations", "Solutions", "Enterprises", "Logistics", "Energy", "Systems", "Technologies", "Global"];

function fakeCatchPhrase(): string {
  return seededChoice(CATCH_PHRASES);
}

function fakeBuzzPhrase(): string {
  return seededChoice(BUZZ_PHRASES);
}

function fakeLoremParagraphs(count: number): string {
  const paras: string[] = [];
  for (let i = 0; i < count; i++) {
    const sentences = Array.from({ length: 3 }, () => seededChoice(LOREM_SENTENCES));
    paras.push(sentences.join(" "));
  }
  return paras.join("\n\n");
}

function fakeCity(): string {
  return seededChoice(CITIES);
}

function fakeState(): string {
  return seededChoice(STATES);
}

function fakeFullName(): string {
  return `${seededChoice(FIRST_NAMES)} ${seededChoice(LAST_NAMES)}`;
}

function fakeEmail(companyName: string): string {
  const domain = companyName.toLowerCase().replace(/[^a-z0-9]/g, "") || "company";
  return `contact@${domain}.com`;
}

function fakePhone(): string {
  return `+91 ${seededRange(70000, 99999)} ${seededRange(10000, 99999)}`;
}

function fakeProduct(): string {
  const adj = ["Green", "High-Grade", "Smart-Grid", "Autonomous", "Eco-Friendly", "Industrial"];
  const noun = ["Alloy", "Inverter", "Telemetry Suite", "EV Chassis", "Active Ingredient", "Turbine Controller"];
  return `${seededChoice(adj)} ${seededChoice(noun)}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// TAXONOMY (Fixed for demo)
// ─────────────────────────────────────────────────────────────────────────────
const SECTORS_DATA = [
  { id: 'steel-metallurgy', name: 'Steel & Metallurgy', icon: '⚙️', growth: '+12%', top: 'Tata Steel' },
  { id: 'automotive-ev', name: 'Automotive & EV', icon: '🚗', growth: '+28%', top: 'Mahindra Electric' },
  { id: 'pharmaceuticals', name: 'Pharmaceuticals', icon: '💊', growth: '+8%', top: 'Cipla Ltd.' },
  { id: 'renewable-energy', name: 'Renewable Energy', icon: '⚡', growth: '+42%', top: 'Adani Green' },
  { id: 'logistics', name: 'Logistics & Supply Chain', icon: '🚢', growth: '+19%', top: 'Mahindra Logistics' },
  { id: 'it-technology', name: 'IT & Technology', icon: '💻', growth: '+35%', top: 'Infosys BPM' },
  { id: 'agriculture', name: 'Agriculture & Food Processing', icon: '🌾', growth: '+7%', top: 'ITC Agri' },
  { id: 'chemicals', name: 'Chemicals', icon: '🧪', growth: '+11%', top: 'Deepak Nitrite' },
  { id: 'textiles', name: 'Textiles', icon: '🧵', growth: '+5%', top: 'Welspun India' },
  { id: 'defence-aerospace', name: 'Defence & Aerospace', icon: '✈️', growth: '+22%', top: 'HAL India' },
  { id: 'fmcg', name: 'FMCG', icon: '🛒', growth: '+14%', top: 'HUL India' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', growth: '+16%', top: 'Apollo Hospitals' },
];

const COUNTRIES_DATA = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
];

const TIER_DISTRIBUTION: Record<CompanyTier, number> = {
  registered: 120,
  verified: 32,
  top: 10,
};

const COMPANY_NAMES = [
  'Tata Steel Ltd.', 'Mahindra Logistics', 'Adani Green Energy', 'Cipla Pharmaceuticals',
  'Reliance Industries', 'Infosys BPM', 'Sunrise Agro Exports', 'NexusTech Logistics',
  'Bharat Forge', 'Larsen & Toubro', 'Mahindra & Mahindra', 'Bajaj Auto',
  'Sun Pharma', 'Dr Reddys Laboratories', 'Glenmark Pharma', 'Torrent Pharma',
  'Adani Ports', 'JSW Steel', 'Hindalco Industries', 'Vedanta Ltd.',
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY GENERATORS
// ─────────────────────────────────────────────────────────────────────────────
function generateCompanyCard(override: Partial<CompanyCard> = {}): CompanyCard {
  const tier = override.tier || (seededRandom() < 0.78 ? 'registered' : seededRandom() < 0.97 ? 'verified' : 'top');
  const sector = seededChoice(SECTORS_DATA);
  const country = seededChoice(COUNTRIES_DATA);
  const name = override.name || seededChoice(COMPANY_NAMES);
  const initials = name.match(/\b\w/g)?.slice(0, 2).join('').toUpperCase() || 'CO';
  
  return {
    id: override.id || fakeUuid(),
    name,
    logoUrl: null, // Use initials fallback
    logoInitials: initials,
    tagline: override.tagline || fakeCatchPhrase(),
    industry: sector.name,
    industryId: sector.id,
    location: `${fakeCity()}, ${fakeState()}`,
    countryCode: country.code,
    tier,
    followerCount: Math.floor(seededRandom() * 50000),
    isFollowing: false,
    verificationDate: tier !== 'registered' ? new Date(Date.now() - seededRange(1, 1000) * 86400000).toISOString() : null,
    profileCompletion: tier === 'top' ? 100 : tier === 'verified' ? 85 + Math.floor(seededRandom() * 15) : 60 + Math.floor(seededRandom() * 25),
    viewCount30d: Math.floor(seededRandom() * 10000),
    newsCount30d: tier === 'top' ? 15 + Math.floor(seededRandom() * 20) : tier === 'verified' ? 5 + Math.floor(seededRandom() * 10) : Math.floor(seededRandom() * 5),
  };
}

function generateCompanyDetail(card: CompanyCard): CompanyDetail {
  const tier = card.tier;
  const isTop = tier === 'top';
  const isVerified = tier === 'verified' || isTop;
  
  return {
    ...card,
    about: fakeLoremParagraphs(3),
    mission: fakeBuzzPhrase(),
    vision: fakeBuzzPhrase(),
    foundedYear: 1990 + Math.floor(seededRandom() * 35),
    employees: isTop ? `${(1000 + Math.floor(seededRandom() * 5000)).toLocaleString()}+` : `${(50 + Math.floor(seededRandom() * 5000)).toLocaleString()}+`,
    revenue: isTop ? `$${(1 + Math.floor(seededRandom() * 50))}B+` : `₹${(10 + Math.floor(seededRandom() * 5000))} Cr`,
    website: `https://${card.name.toLowerCase().replace(/[^a-z0-9]/g, "") || "company"}.com`,
    phone: fakePhone(),
    email: fakeEmail(card.name),
    products: Array.from({ length: 4 + Math.floor(seededRandom() * 6) }, () => fakeProduct()),
    leadership: Array.from({ length: 2 + Math.floor(seededRandom() * 4) }, () => {
      const name = fakeFullName();
      return {
        name,
        role: seededChoice(['CEO', 'CTO', 'CFO', 'COO', 'VP Sales', 'VP Operations', 'Managing Director', 'Chairman']),
        initials: name.match(/\b\w/g)?.slice(0, 2).join('').toUpperCase() || 'XX',
      };
    }),
    galleryImages: isVerified ? Array.from({ length: 3 + Math.floor(seededRandom() * 4) }, (_, idx) => 
      `https://picsum.photos/seed/img-${card.countryCode}-${idx}/800/600`
    ) : [],
    analytics: isVerified ? {
      profileViews: Math.floor(seededRandom() * 50000),
      newsViews: Math.floor(seededRandom() * 100000),
      leadCount: Math.floor(seededRandom() * 500),
      topCountries: ['IN', 'US', 'AE', 'SG', 'DE'].slice(0, 3 + Math.floor(seededRandom() * 2)),
      topReferrers: ['Google', 'Direct', 'LinkedIn', 'Referral', 'Email'].slice(0, 3),
    } : null,
    crmIntegration: isTop,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// NEWS GENERATORS
// ─────────────────────────────────────────────────────────────────────────────
const NEWS_CATEGORIES = ['Product Launch', 'Deal Announcement', 'Financial Update', 'Milestone', 'Partnership', 'Investment', 'ESG', 'Announcement'] as const;

function generateNewsCard(company: CompanyCard, override: Partial<NewsCard> = {}): NewsCard {
  const category = seededChoice(NEWS_CATEGORIES as any);
  const daysAgo = Math.floor(seededRandom() * 30);
  const publishedAt = new Date(Date.now() - daysAgo * 86400000).toISOString();
  
  return {
    id: fakeUuid(),
    title: override.title || generateNewsTitle(company.name, category),
    summary: seededChoice(LOREM_SENTENCES) + " " + seededChoice(LOREM_SENTENCES),
    thumbnailUrl: seededRandom() < 0.6 ? `https://picsum.photos/seed/${company.id}-${daysAgo}/400/250` : null,
    company: {
      id: company.id,
      name: company.name,
      logoUrl: company.logoUrl,
      tier: company.tier,
    },
    industry: company.industry,
    publishedAt,
    readingTimeMinutes: 2 + Math.floor(seededRandom() * 6),
    viewCount: Math.floor(seededRandom() * 50000) * (company.tier === 'top' ? 10 : company.tier === 'verified' ? 3 : 1),
    shareCount: Math.floor(seededRandom() * 1000),
    commentCount: Math.floor(seededRandom() * 200),
    isBookmarked: false,
    isSponsored: company.tier === 'top' && seededRandom() < 0.15,
    category: category as any,
    trendingVariant: null,
  };
}

function generateNewsTitle(companyName: string, category: string): string {
  const templates: Record<string, string[]> = {
    'Product Launch': [
      `${companyName} Launches Next-Gen Hardware for Global Markets`,
      `New Eco-Smart Logistics Line from ${companyName} Targets APAC and EMEA Regions`,
    ],
    'Deal Announcement': [
      `${companyName} Signs Strategic Deal with Key European Trade Consortium`,
      `Historic ₹2,000 Cr Supply Agreement Secured by ${companyName}`,
    ],
    'Financial Update': [
      `${companyName} Reports 28% YoY Revenue Growth in Latest Fiscal Quarter`,
      `Strong Quarterly Performance: ${companyName} Beats Global Analyst Projections`,
    ],
    'Milestone': [
      `${companyName} Achieves 50 GW Clean Grid Energy Capacity Milestone`,
      `World Record Achievement: ${companyName} Expands Network to 100 Bilateral Corridors`,
    ],
    'Partnership': [
      `${companyName} Partners with Tech Leaders for AI-Driven Telemetry Systems`,
      `Joint Export Venture Formally Launched: ${companyName} Joining Forces with Global Logistics`,
    ],
    'Investment': [
      `${companyName} Announces ₹45,000 Cr Greenfield Smelter Investment`,
      `Board Formally Approves Capacity Expansion Plan for ${companyName}`,
    ],
    'ESG': [
      `${companyName} Ranked Among Top 10 Environmental Performers in Emerging Markets`,
      `Sustainability Milestone: ${companyName} Declares Carbon-Neutral Operations Target`,
    ],
    'Announcement': [
      `${companyName} Appoints New Managing Director to Head Global Trade Division`,
      `${companyName} Formally Expands Export Hub Operations to Singapore and UAE`,
    ],
  };
  return seededChoice(templates[category] || templates['Announcement']);
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────
export const mockData = {
  // Generate N companies with tier distribution
  companies: (count: number = 200): CompanyCard[] => {
    const companies: CompanyCard[] = [];
    const totalDist = TIER_DISTRIBUTION.registered + TIER_DISTRIBUTION.verified + TIER_DISTRIBUTION.top;
    
    Object.entries(TIER_DISTRIBUTION).forEach(([tier, targetCount]) => {
      const actualCount = Math.max(1, Math.round((targetCount / totalDist) * count));
      for (let i = 0; i < actualCount; i++) {
        // Deterministically select names to avoid unbounded random outputs
        const nameIdx = (companies.length) % COMPANY_NAMES.length;
        const baseName = COMPANY_NAMES[nameIdx];
        const uniqueName = baseName.replace(/(Ltd\.|Group|Industries)/i, `$1 #${i + 1}`);
        companies.push(generateCompanyCard({ tier: tier as CompanyTier, name: uniqueName }));
      }
    });
    return companies.slice(0, count);
  },

  // Get company by ID (deterministic)
  companyById: (id: string): CompanyDetail => {
    const card = generateCompanyCard({ id });
    return generateCompanyDetail(card);
  },

  // Featured companies (top-tier weighted)
  featured: (limit: number = 8, tiers: CompanyTier[] = ['verified', 'top']): CompanyCard[] => {
    return Array.from({ length: limit }, (_, idx) => {
      const tier = seededChoice(tiers);
      const name = COMPANY_NAMES[idx % COMPANY_NAMES.length];
      return generateCompanyCard({ tier, name: `Featured ${name}` });
    });
  },

  // Latest news
  latestNews: (limit: number = 10): NewsCard[] => {
    const companies = mockData.companies(50);
    return Array.from({ length: limit }, (_, idx) => {
      const company = companies[idx % companies.length];
      return generateNewsCard(company);
    });
  },

  // Trending news
  trendingNews: (variant: string, limit: number = 10): NewsCard[] => {
    const companies = mockData.companies(50).filter(c => c.tier === 'top' || c.tier === 'verified');
    return Array.from({ length: limit }, (_, idx) => {
      const company = companies[idx % companies.length];
      const news = generateNewsCard(company);
      return { ...news, trendingVariant: variant as NewsCard['trendingVariant'] };
    });
  },

  // Sectors
  sectors: (): Sector[] => SECTORS_DATA.map(s => ({
    id: s.id,
    name: s.name,
    companyCount: Math.floor(100 + seededRandom() * 300),
    growthRate: s.growth,
    topCompany: s.top,
    icon: s.icon,
    isTrending: s.growth.startsWith('+2') || s.growth.startsWith('+4'),
    description: `Browse the latest company registrations and B2B trade intelligence updates in the ${s.name} sector.`,
    parentSectorId: null,
  })),

  // Countries
  countries: (): Country[] => COUNTRIES_DATA.map(c => ({
    code: c.code,
    name: c.name,
    companyCount: Math.floor(50 + seededRandom() * 500),
    flagEmoji: c.flag,
    isBilateral: true,
  })),

  // Filter meta
  filterMeta: (): FilterMeta => ({
    industries: mockData.sectors().map(s => ({ id: s.id, name: s.name, companyCount: s.companyCount })),
    countries: mockData.countries().map(c => ({ code: c.code, name: c.name, companyCount: c.companyCount })),
    tiers: [
      { value: 'registered', label: 'Registered (Free)', companyCount: TIER_DISTRIBUTION.registered },
      { value: 'verified', label: 'Verified (Pro)', companyCount: TIER_DISTRIBUTION.verified },
      { value: 'top', label: 'Enterprise (Top)', companyCount: TIER_DISTRIBUTION.top },
    ],
  }),
};

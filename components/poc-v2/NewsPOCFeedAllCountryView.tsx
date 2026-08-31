"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Globe,
  Award,
  BookOpen,
  Calendar,
  Lock,
  Mail,
  HelpCircle,
  Award as AwardIcon,
  SlidersHorizontal,
  Bookmark,
  Check,
  Zap,
  Star,
  Users,
  Compass,
  CheckCircle,
  Building,
  DollarSign,
  ArrowRight,
  Info,
  MapPin,
  Clock,
  Briefcase,
  AlertTriangle,
  FileText,
  Activity,
  ChevronRight,
  ShieldAlert,
  Crown,
  Flame,
  Sparkles,
  Search,
  ArrowLeft,
  X,
  Share2
} from "lucide-react";

interface NewsPOCFeedAllCountryViewProps {
  onBack?: () => void;
}

interface AllCountryNewsStory {
  id: string;
  country: string;
  countryFlag: string;
  title: string;
  summary: string;
  content?: string;
  category: string;
  companyName: string;
  companyInitials: string;
  time: string;
  readTime: string;
  isSponsored?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isBreaking?: boolean;
  impact?: string;
  views?: string;
}

interface GlobalCountryProfile {
  name: string;
  flag: string;
  region: string;
  capital: string;
  featuredHeadline: string;
  readTime: string;
  snapshot: {
    gdp: string;
    population: string;
    gdpGrowth: string;
    currency: string;
    inflation: string;
    tradeBalance: string;
    fdi: string;
  };
  indicators: {
    label: string;
    current: string;
    previous: string;
    isUp: boolean;
    isGood: boolean;
  }[];
  tradePulse: {
    exports: string;
    imports: string;
    balance: string;
    topMarkets: string[];
    topImports: string[];
    topCategories: string[];
  };
  tradeOpportunities: {
    sector: string;
    demandChange: string;
    title: string;
    market: string;
    trend: string;
    suppliers: string[];
  }[];
  investmentOpportunities: {
    sector: string;
    signal: string;
    theme: string;
    description: string;
  }[];
  companies: {
    sector: string;
    name: string;
    development: string;
  }[];
  leaders: {
    role: string;
    name: string;
    company: string;
    development: string;
  }[];
  events: {
    type: string;
    title: string;
    date: string;
    location: string;
  }[];
}

const GLOBAL_PROFILES: Record<string, GlobalCountryProfile> = {
  "Global All": {
    name: "All Countries (195 Bilateral Corridors)",
    flag: "🌐",
    region: "Worldwide",
    capital: "Global Marketplace",
    featuredHeadline: "Global Bilateral Trade Corridors Expand Cross-Border Clearance by 34% in Q1 2026",
    readTime: "4 min read",
    snapshot: {
      gdp: "$105.4T",
      population: "8.1 Billion",
      gdpGrowth: "+3.4%",
      currency: "Multi-Currency (USD/EUR/INR/AED)",
      inflation: "3.2% Avg",
      tradeBalance: "+$1.85T",
      fdi: "$1.65T"
    },
    indicators: [
      { label: "Global Trade Velocity Index", current: "128.4 pts", previous: "119.2 pts", isUp: true, isGood: true },
      { label: "Cross-Border Freight Rates", current: "$2,450 / FEU", previous: "$2,890 / FEU", isUp: false, isGood: true },
      { label: "Bilateral Tariff Reduction Avg", current: "78.4%", previous: "71.2%", isUp: true, isGood: true },
      { label: "Global FDI Capital Index", current: "142.6 pts", previous: "135.0 pts", isUp: true, isGood: true }
    ],
    tradePulse: {
      exports: "$32.4 Trillion",
      imports: "$31.8 Trillion",
      balance: "+$600 Billion",
      topMarkets: ["United States 🇺🇸", "European Union 🇪🇺", "India 🇮🇳", "United Arab Emirates 🇦🇪", "ASEAN 🇸🇬"],
      topImports: ["Advanced Semiconductors", "Green Hydrogen & Clean Fuels", "Critical Minerals & Lithium", "Precision Machinery"],
      topCategories: ["Electronics & IT (S16)", "Automotive & EV (S45)", "Energy & Sustainability (S17)", "Pharmaceuticals (S31)"]
    },
    tradeOpportunities: [
      {
        sector: "Critical Tech & Hardware",
        demandChange: "+42.5%",
        title: "Global Semiconductor Substrate Supply Routing",
        market: "Asia-Pacific & North America",
        trend: "Diversified manufacturing hubs outside single-region bottlenecks.",
        suppliers: ["Tata Electronics", "TSMC Partners", "ASML Labs", "Foxconn India"]
      },
      {
        sector: "Clean Energy Infrastructure",
        demandChange: "+38.0%",
        title: "Bilateral Green Hydrogen Maritime Corridors",
        market: "Europe & Middle East",
        trend: "Port liquefaction plants offering zero-tariff green fuel exports.",
        suppliers: ["Adani Green", "Linde Clean Energy", "Siemens Energy", "ACWA Power"]
      }
    ],
    investmentOpportunities: [
      {
        sector: "Smart Logistics Hubs",
        signal: "HIGH FDI DEMAND",
        theme: "Automated Deep-Sea Freight Rail Integration",
        description: "Multi-modal transport hubs connecting coastal container ports with landlocked manufacturing corridors."
      },
      {
        sector: "Digital Sovereign Payments",
        signal: "RAPID DEPLOYMENT",
        theme: "Cross-Border Central Bank Micro-Settlement",
        description: "Real-time bilateral settlement rails reducing FX transaction friction by up to 65%."
      }
    ],
    companies: [
      { sector: "Semiconductors", name: "India-US Semiconductor Coalition", development: "Initiates joint OSAT packaging facility investments in Gujarat and Texas." },
      { sector: "Green Energy", name: "Indo-German Hydrogen Alliance", development: "Signs €2.4B green ammonia long-term bilateral procurement contract." },
      { sector: "Digital Rails", name: "UPI-PayNow Cross-Border Network", development: "Processes over 15 million instant micro-settlements monthly." }
    ],
    leaders: [
      { role: "Trade Envoy", name: "Sovereign Trade Advisory Council", company: "Global Bilateral Forum", development: "Publishing unified customs standardization framework for fast-track clearance." },
      { role: "Managing Director", name: "International Supply Chain Institute", company: "Maritime Logistics", development: "Deploying AI-driven predictive rerouting to counter maritime trade disruptions." }
    ],
    events: [
      { type: "Global Summit", title: "World Bilateral Trade & Investment Expo 2026", date: "April 18-20, 2026", location: "New Delhi & Hybrid" },
      { type: "Roundtable", title: "Cross-Border Semiconductor Supply Chain Assembly", date: "May 5, 2026", location: "Frankfurt & Virtual" }
    ]
  },
  "Asia-Pacific": {
    name: "Asia-Pacific Corridors",
    flag: "🌏",
    region: "APAC",
    capital: "Regional Hubs (Singapore/Tokyo)",
    featuredHeadline: "APAC High-Tech Manufacturing Output Rises 28% Driven by India-Japan-Singapore Corridors",
    readTime: "5 min read",
    snapshot: {
      gdp: "$38.2T",
      population: "4.3 Billion",
      gdpGrowth: "+4.8%",
      currency: "JPY / SGD / INR / AUD",
      inflation: "2.8%",
      tradeBalance: "+$890B",
      fdi: "$620B"
    },
    indicators: [
      { label: "APAC Regional Trade Growth", current: "+4.8%", previous: "+4.1%", isUp: true, isGood: true },
      { label: "Intra-Asia Freight Index", current: "115.4 pts", previous: "108.2 pts", isUp: true, isGood: true },
      { label: "Semiconductor Assembly Capacity", current: "82.4%", previous: "74.0%", isUp: true, isGood: true },
      { label: "Bilateral Tariff Elimination", current: "88.2%", previous: "82.5%", isUp: true, isGood: true }
    ],
    tradePulse: {
      exports: "$12.8 Trillion",
      imports: "$11.9 Trillion",
      balance: "+$900 Billion",
      topMarkets: ["India 🇮🇳", "Japan 🇯🇵", "Singapore 🇸🇬", "South Korea 🇰🇷", "Australia 🇦🇺"],
      topImports: ["Silicon Wafers", "Battery Cathodes", "Precision Optics", "LNG"],
      topCategories: ["Electronics", "Automotive", "FinTech", "Chemicals"]
    },
    tradeOpportunities: [
      {
        sector: "Precision Machinery",
        demandChange: "+36.2%",
        title: "Industrial Robotics & Automation Tooling",
        market: "India-Japan Township Corridors",
        trend: "Next-generation automotive assembly tooling localization.",
        suppliers: ["Fanuc", "Yaskawa India", "L&T Automation"]
      },
      {
        sector: "FinTech Digital Corridors",
        demandChange: "+52.0%",
        title: "Instant Bilateral Payment Rails Expansion",
        market: "India-Singapore-ASEAN",
        trend: "Cross-border retail remittances and SME payment gateways.",
        suppliers: ["NPCI International", "MAS FinTech Hub", "DBS Bank"]
      }
    ],
    investmentOpportunities: [
      {
        sector: "Advanced Electronics Hubs",
        signal: "ACTIVE CORRIDOR",
        theme: "High-Density Printed Circuit Board (PCB) Fabrication",
        description: "Special Economic Zones in South India attracting Tier-1 Japanese and Taiwanese component makers."
      }
    ],
    companies: [
      { sector: "Electronics", name: "Foxconn-India Semiconductor", development: "Commences trial production of 28nm display driver components." },
      { sector: "Automotive", name: "Toyota Kirloskar Mobility", development: "Expands solid-state battery testing facility in Bidadi industrial zone." }
    ],
    leaders: [
      { role: "Regional Director", name: "Kenji Sato", company: "Japan External Trade Org", development: "Leading 40-firm delegation to invest in Indian industrial corridors." }
    ],
    events: [
      { type: "Trade Exposition", title: "APAC Electronics & Semiconductor Summit", date: "May 22-24, 2026", location: "Singapore" }
    ]
  },
  "Europe": {
    name: "European Bilateral Corridors",
    flag: "🇪🇺",
    region: "Europe",
    capital: "Brussels / Frankfurt / London",
    featuredHeadline: "EU-India Green Hydrogen Shipping Corridor Accord Ratified with Zero-Tariff Customs Path",
    readTime: "6 min read",
    snapshot: {
      gdp: "$24.5T",
      population: "740 Million",
      gdpGrowth: "+1.9%",
      currency: "EUR / GBP / CHF",
      inflation: "2.4%",
      tradeBalance: "+$410B",
      fdi: "$480B"
    },
    indicators: [
      { label: "EU-India Bilateral Trade Volume", current: "€148B", previous: "€132B", isUp: true, isGood: true },
      { label: "Green Energy Import Quotas", current: "+34.5%", previous: "+21.0%", isUp: true, isGood: true },
      { label: "CBAM Carbon Compliance Index", current: "91.2%", previous: "76.4%", isUp: true, isGood: true },
      { label: "Services Trade Volume", current: "+18.2%", previous: "+14.1%", isUp: true, isGood: true }
    ],
    tradePulse: {
      exports: "$8.4 Trillion",
      imports: "$8.1 Trillion",
      balance: "+$300 Billion",
      topMarkets: ["Germany 🇩🇪", "United Kingdom 🇬🇧", "France 🇫🇷", "Netherlands 🇳🇱", "Italy 🇮🇹"],
      topImports: ["Green Hydrogen", "Pharmaceutical Generics", "Automotive Software", "Specialty Chemicals"],
      topCategories: ["Green Energy", "Pharmaceuticals", "Aerospace & Defence", "Machinery"]
    },
    tradeOpportunities: [
      {
        sector: "Sustainable Energy",
        demandChange: "+45.0%",
        title: "Clean Ammonia & Liquid Hydrogen Corridors",
        market: "India-Germany Maritime Gateways",
        trend: "Direct zero-emission carrier transit between Kochi and Hamburg.",
        suppliers: ["Linde Hydrogen", "Indian Oil Clean Tech", "Siemens Energy"]
      }
    ],
    investmentOpportunities: [
      {
        sector: "Offshore Wind Tech",
        signal: "EUROPEAN BACKING",
        theme: "Deep-Sea Turbine Component Casting",
        description: "Bilateral consortium setting up coastal blade and gear assembly in Tamil Nadu and Gujarat."
      }
    ],
    companies: [
      { sector: "Aerospace", name: "Airbus India Engineering Hub", development: "Expands design center to support next-gen commercial aircraft avionics." },
      { sector: "Pharma", name: "BioPharma EU-India Consortium", development: "Establishes decentralized continuous manufacturing for critical antibiotics." }
    ],
    leaders: [
      { role: "Chief Negotiator", name: "Dr. Elena Richter", company: "EU Trade Directorate", development: "Finalizing FTA service access terms for Indian digital professionals." }
    ],
    events: [
      { type: "Sovereign Forum", title: "Indo-European Clean Energy & Trade Conclave", date: "June 12, 2026", location: "Frankfurt" }
    ]
  },
  "North America": {
    name: "North America (USA & Canada)",
    flag: "🇺🇸",
    region: "North America",
    capital: "Washington D.C. / Ottawa",
    featuredHeadline: "India-US Critical & Emerging Tech (iCET) Accord Drives $191.8B Bilateral Trade Record",
    readTime: "5 min read",
    snapshot: {
      gdp: "$31.2T",
      population: "380 Million",
      gdpGrowth: "+2.6%",
      currency: "USD / CAD",
      inflation: "2.9%",
      tradeBalance: "-$850B",
      fdi: "$540B"
    },
    indicators: [
      { label: "iCET Defense Tech Sourcing", current: "+48.2%", previous: "+29.0%", isUp: true, isGood: true },
      { label: "Bilateral Trade Volume", current: "$191.8B", previous: "$168.4B", isUp: true, isGood: true },
      { label: "US Tech FDI in India", current: "$24.5B", previous: "$18.2B", isUp: true, isGood: true },
      { label: "Pharma Generic Share in US", current: "44.0%", previous: "41.5%", isUp: true, isGood: true }
    ],
    tradePulse: {
      exports: "$2.6 Trillion",
      imports: "$3.4 Trillion",
      balance: "-$800 Billion",
      topMarkets: ["India 🇮🇳", "Mexico 🇲🇽", "Canada 🇨🇦", "Japan 🇯🇵", "UK 🇬🇧"],
      topImports: ["Defense Avionics", "High-End GPUs", "Crude Oil", "Aircraft Turbines"],
      topCategories: ["Defence & AI", "Electronics", "Pharmaceuticals", "Energy"]
    },
    tradeOpportunities: [
      {
        sector: "Defense & Avionics",
        demandChange: "+56.4%",
        title: "Autonomous UAV & Radar Sensor Co-Production",
        market: "India-USA Defense Corridor",
        trend: "Joint technology transfer protocols under iCET defense agreements.",
        suppliers: ["General Atomics", "HAL India", "Bharat Electronics", "Boeing Defense"]
      }
    ],
    investmentOpportunities: [
      {
        sector: "AI Compute Centers",
        signal: "STRATEGIC EXPANSION",
        theme: "Hyperscale Sovereign AI Cloud Facilities",
        description: "US cloud giants deploying $10B in sovereign AI infrastructure in Hyderabad and Bengaluru."
      }
    ],
    companies: [
      { sector: "AI Hardware", name: "NVIDIA-India AI Infrastructure", development: "Partners with Indian telecom conglomerates to build sovereign AI superclusters." },
      { sector: "Semiconductors", name: "Micron OSAT Sanand Facility", development: "Ramps up memory module testing and packaging for worldwide exports." }
    ],
    leaders: [
      { role: "Senior Advisor", name: "Michael Vance", company: "US-India Strategic Partnership", development: "Outlining bilateral supply resilience blueprints for critical minerals." }
    ],
    events: [
      { type: "Executive Summit", title: "US-India Critical Technology & Trade Summit", date: "July 8-10, 2026", location: "Washington D.C." }
    ]
  },
  "Middle East": {
    name: "Middle East & GCC Corridors",
    flag: "🇦🇪",
    region: "Middle East",
    capital: "Abu Dhabi / Riyadh / Dubai",
    featuredHeadline: "India-UAE CEPA Bilateral Cargo Crosses $100B Milestone with 48-Hour Fast-Track Clearance",
    readTime: "4 min read",
    snapshot: {
      gdp: "$4.6T",
      population: "420 Million",
      gdpGrowth: "+4.5%",
      currency: "AED / SAR / QAR",
      inflation: "2.1%",
      tradeBalance: "+$320B",
      fdi: "$210B"
    },
    indicators: [
      { label: "CEPA Bilateral Cargo Volume", current: "$100.8B", previous: "$84.2B", isUp: true, isGood: true },
      { label: "Sovereign Wealth FDI in India", current: "$18.4B", previous: "$12.0B", isUp: true, isGood: true },
      { label: "Mundra-Jebel Ali Shipping Transit", current: "48 Hours", previous: "96 Hours", isUp: false, isGood: true },
      { label: "Services Trade Surge", current: "+40.2%", previous: "+28.5%", isUp: true, isGood: true }
    ],
    tradePulse: {
      exports: "$1.4 Trillion",
      imports: "$1.1 Trillion",
      balance: "+$300 Billion",
      topMarkets: ["India 🇮🇳", "UAE 🇦🇪", "Saudi Arabia 🇸🇦", "Oman 🇴🇲", "Kuwait 🇰🇼"],
      topImports: ["Refined Petroleum", "Gems & Jewellery", "Food Grains & Agri", "Chemicals"],
      topCategories: ["Energy", "Precious Metals", "AgriTech", "Infrastructure"]
    },
    tradeOpportunities: [
      {
        sector: "AgriTech & Food Security",
        demandChange: "+32.0%",
        title: "Fast-Track Agri Logistics Corridors",
        market: "India-GCC Food Corridors",
        trend: "Dedicated cold-chain shipping connecting Indian farming clusters with Gulf supermarkets.",
        suppliers: ["APEDA Exporters", "DP World Food Hub", "Lulu Group International"]
      }
    ],
    investmentOpportunities: [
      {
        sector: "Renewable Megaprojects",
        signal: "SOVEREIGN WEALTH BACKING",
        theme: "Giga-Scale Solar & Grid Interconnection",
        description: "Gulf sovereign funds investing in 20GW solar parks in Rajasthan and Gujarat."
      }
    ],
    companies: [
      { sector: "Logistics", name: "DP World Bilateral Gateways", development: "Integrates digital customs between Mundra and Jebel Ali for rapid cargo turnaround." },
      { sector: "Retail & Trade", name: "Lulu International Logistics", development: "Expands 100% automated food processing parks in Kerala and Uttar Pradesh." }
    ],
    leaders: [
      { role: "Minister of State for Foreign Trade", name: "H.E. Dr. Thani Al Zeyoudi", company: "Ministry of Economy UAE", development: "Announcing expansion of CEPA benefits to emerging SME export sectors." }
    ],
    events: [
      { type: "Trade Conclave", title: "India-GCC Strategic Trade & Investment Summit", date: "August 15, 2026", location: "Dubai" }
    ]
  }
};

const ALL_COUNTRY_STORIES: AllCountryNewsStory[] = [
  {
    id: "gcs-1",
    country: "Global All",
    countryFlag: "🌐",
    title: "Global Supply Chain Rebalancing: 195 Bilateral Corridors Accelerate Digital Customs Integration",
    summary: "Multilateral trade accords deploy standardized XML data payloads and AI inspection tools across 80 major maritime ports, eliminating customs documentation backlogs.",
    content: "The International Chamber of Commerce and global port authorities have ratified unified digital customs standards. Commercial vessels crossing bilateral corridors from Asia, Europe, and the Americas now clear cargo manifests in under two hours compared to historical 48-hour queues. Indian container terminals in Nhava Sheva and Mundra lead the implementation alongside Rotterdam and Singapore.",
    category: "GLOBAL LOGISTICS",
    companyName: "World Trade Customs Council",
    companyInitials: "WTC",
    time: "15 mins ago",
    readTime: "4 min read",
    isSponsored: true,
    isFeatured: true,
    isBreaking: true,
    impact: "+34.2% Faster Clearance",
    views: "18.4K"
  },
  {
    id: "gcs-2",
    country: "North America",
    countryFlag: "🇺🇸",
    title: "India-USA Critical Tech Trade Accord Secures Direct Defense Semiconductor Sourcing",
    summary: "Strategic partnership under iCET initiates raw materials supply guarantees, eliminating semiconductor supply chain vulnerability for commercial and military manufacturing hubs.",
    content: "Under the initiative on Critical and Emerging Technology (iCET), Indian and US aerospace consortiums have locked in five-year silicon substrate supply agreements. This historic treaty guarantees priority allocation for defense avionics and commercial satellite payloads.",
    category: "TECHNOLOGY & CHIPS",
    companyName: "iCET Defense Coalition",
    companyInitials: "iCET",
    time: "45 mins ago",
    readTime: "5 min read",
    isFeatured: true,
    isTrending: true,
    impact: "+48.0% YoY",
    views: "14.2K"
  },
  {
    id: "gcs-3",
    country: "Europe",
    countryFlag: "🇪🇺",
    title: "India-Germany €2 Billion Clean Hydrogen Shipping Corridor Accord Finalized",
    summary: "New green energy corridor maps direct liquefaction container lines from Kochi port to Hamburg, securing zero-emission logistics pipelines and customs tariff exemptions.",
    content: "Germany's Federal Ministry for Economic Affairs and India's Ministry of New and Renewable Energy have officially signed the bilateral green hydrogen framework. Indian hydrogen producers gain guaranteed off-take contracts and direct exemption from European Carbon Border Adjustment Mechanism (CBAM) levies.",
    category: "CLEAN ENERGY",
    companyName: "Indo-German Energy Forum",
    companyInitials: "IGEF",
    time: "1 hour ago",
    readTime: "6 min read",
    isFeatured: true,
    isTrending: true,
    impact: "€2.4B Offtake",
    views: "11.8K"
  },
  {
    id: "gcs-4",
    country: "Middle East",
    countryFlag: "🇦🇪",
    title: "India-UAE CEPA Bilateral Cargo Shipments Cross $100 Billion Milestone",
    summary: "New shipping terminal integrations between Mundra and Jebel Ali reduce transit time by 48 hours, facilitating accelerated cargo clearances.",
    content: "The Comprehensive Economic Partnership Agreement (CEPA) between India and the United Arab Emirates has surpassed $100 billion in bilateral trade volume ahead of target schedules. Precious metals, food security corridors, and specialized electronics lead export growth.",
    category: "BILATERAL TRADE",
    companyName: "UAE-India CEPA Council",
    companyInitials: "CEPA",
    time: "2 hours ago",
    readTime: "4 min read",
    isTrending: true,
    impact: "$100B+ Volume",
    views: "9.5K"
  },
  {
    id: "gcs-5",
    country: "Asia-Pacific",
    countryFlag: "🇸🇬",
    title: "India-Singapore PayNow-UPI Digital Payment Volume Crosses 15 Million Transactions",
    summary: "Bilateral micro-payment tunnel integration achieves rapid retail adoption benchmarks, reducing remittance processing fees by 60% for cross-border businesses.",
    content: "The instant cross-border payment link between India's UPI and Singapore's PayNow recorded its fifteen-millionth commercial transaction today. Financial regulators announced plans to extend real-time settlement capabilities to Malaysia, Thailand, and the Philippines.",
    category: "FINTECH & DIGITAL RAILS",
    companyName: "Monetary Authority of Singapore / NPCI",
    companyInitials: "NPCI",
    time: "3 hours ago",
    readTime: "5 min read",
    isTrending: true,
    impact: "-60% Fee Reduction",
    views: "8.1K"
  },
  {
    id: "gcs-6",
    country: "Asia-Pacific",
    countryFlag: "🇯🇵",
    title: "India-Japan Bilateral Industrial Township Expansion Commences in Rajasthan",
    summary: "Automotive and heavy machinery production facilities lease direct development zones, increasing FDI injection indices and generating 15,000 localized industrial roles.",
    content: "The Japan External Trade Organization (JETRO) and the Government of Rajasthan broke ground on Phase 3 of the Neemrana Japanese Industrial Zone. Advanced robotics and EV battery suppliers will occupy over 500 acres of customized manufacturing infrastructure.",
    category: "MANUFACTURING & FDI",
    companyName: "JETRO Bilateral Forum",
    companyInitials: "JETRO",
    time: "4 hours ago",
    readTime: "5 min read",
    isTrending: true,
    impact: "+15,000 Jobs",
    views: "6.4K"
  },
  {
    id: "gcs-7",
    country: "Europe",
    countryFlag: "🇬🇧",
    title: "India-UK Free Trade Agreement Negotiations Enter Final Regulatory Review Stage",
    summary: "Final tariff tables and intellectual property compliance drafts enter final checks, opening up legal, financial, and educational services flow corridors.",
    content: "Negotiators in London and New Delhi have reached consensus on key chapters of the India-UK Free Trade Agreement. The treaty cuts tariffs on British automotive components and scotch whisky while granting preferential visa pathways for Indian IT and engineering personnel.",
    category: "TRADE POLICY",
    companyName: "UK-India Business Council",
    companyInitials: "UKIBC",
    time: "5 hours ago",
    readTime: "6 min read",
    impact: "FTA Near Signing",
    views: "7.9K"
  }
];

export default function NewsPOCFeedAllCountryView({ onBack }: NewsPOCFeedAllCountryViewProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("Global All");
  const [feedFilter, setFeedFilter] = useState<"all" | "latest" | "trending">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStory, setSelectedStory] = useState<AllCountryNewsStory | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [alertPreferences, setAlertPreferences] = useState({
    economy: true,
    trade: true,
    policy: true,
    investment: true
  });

  const handleBookmarkToggle = (storyId: string) => {
    setBookmarks(prev => prev.includes(storyId) ? prev.filter(id => id !== storyId) : [...prev, storyId]);
  };

  const handleShare = (story: AllCountryNewsStory) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/en/poc-v2/article/${story.id}`);
      setCopiedId(story.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  const currentProfile = GLOBAL_PROFILES[selectedRegion] || GLOBAL_PROFILES["Global All"];

  // Filter stories based on region and search query
  const filteredStories = ALL_COUNTRY_STORIES.filter(s => {
    const matchesRegion = selectedRegion === "Global All" || s.country === selectedRegion;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.companyName.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesRegion || !matchesSearch) return false;

    if (feedFilter === "latest") return true;
    if (feedFilter === "trending") return s.isTrending || s.isFeatured;
    return true;
  });

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
      
      {/* ── PROFESSIONAL HEADER NAVIGATION (FEED SUB-MODULE) ── */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Left Title and Eyebrow */}
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-white transition-all shadow-xs shrink-0 cursor-pointer"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest block font-mono">
                FEED SUB-MODULE · COUNTRY FEED
              </span>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-950 dark:text-white tracking-tight mt-0.5">
                All Country News & Bilateral Corridors
              </h1>
            </div>
          </div>

          {/* Right Selector Switcher (Pills Matching My Country Style) */}
          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-950 p-1.5 rounded-full border border-gray-200 dark:border-gray-800 shadow-xs">
            <Link 
              href="/en/poc-v2/feed/country/my"
              className="px-4 py-1.5 rounded-full text-xs font-bold text-gray-600 dark:text-gray-350 hover:bg-gray-200/60 dark:hover:bg-gray-900 transition-all"
            >
              My Country
            </Link>
            <span 
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs cursor-default"
            >
              All Country
            </span>
            <Link 
              href="/en/poc-v2/feed/country/intelligence"
              className="px-4 py-1.5 rounded-full text-xs font-bold text-gray-600 dark:text-gray-350 hover:bg-gray-200/60 dark:hover:bg-gray-900 transition-all"
            >
              Country Intelligence
            </Link>
          </div>

        </div>
      </div>

      {/* ── 01. ALL COUNTRY / GLOBAL HERO (MATCHING MY COUNTRY HERO SECTION) ── */}
      <section className="bg-gradient-to-br from-[#0c1020] via-[#0d132b] to-[#05070e] text-white relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="space-y-4">
            
            {/* Top Eyebrow & Region Selector */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-[10px] font-mono font-bold bg-blue-600 px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5" /> ALL COUNTRY BILATERAL DIRECTORY
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-bold">Filter Corridors:</span>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="text-xs font-bold bg-white/10 text-white border border-white/20 hover:border-blue-400 rounded-lg px-3 py-1.5 cursor-pointer outline-none transition-colors"
                >
                  <option value="Global All" className="text-gray-950">Global (All 195 Nations) 🌐</option>
                  <option value="Asia-Pacific" className="text-gray-950">Asia-Pacific (APAC) 🌏</option>
                  <option value="Europe" className="text-gray-950">European Union & UK 🇪🇺</option>
                  <option value="North America" className="text-gray-950">North America (USA & Canada) 🇺🇸</option>
                  <option value="Middle East" className="text-gray-950">Middle East & GCC 🇦🇪</option>
                </select>
              </div>
            </div>

            {/* Title and Meta Information */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl md:text-5xl">{currentProfile.flag}</span>
                <div>
                  <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    {currentProfile.name}
                  </h1>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    Region: {currentProfile.region} · Hubs: {currentProfile.capital} · Updated 10 minutes ago
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-300 text-sm md:text-base font-normal max-w-3xl leading-relaxed">
              Real-time bilateral trade intelligence, cross-border macroeconomic indicators, FDI corridor telemetry, and sovereign news streams across all global partner economies.
            </p>

            {/* Featured Briefing Strip */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-xs font-bold text-slate-300 shrink-0">Featured Global Brief ({currentProfile.readTime}):</span>
                <p className="text-xs text-white font-medium leading-normal">{currentProfile.featuredHeadline}</p>
              </div>
              <Link
                href="/en/poc-v2/country-news/intelligence"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs shrink-0 flex items-center gap-1.5"
              >
                Explore Country Intelligence <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT WRAPPER (MATCHING MY COUNTRY SECTION HIERARCHY) ── */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-10">

        {/* ── 02. GLOBAL / ALL COUNTRY SNAPSHOT (7 KPI CARDS) ── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="h-4.5 w-4.5 text-blue-600" /> Global Macroeconomic Snapshot
            </h2>
            <Link href="/en/poc-v2/country-news/intelligence" className="text-[10px] font-extrabold text-blue-600 hover:underline">
              View Complete Sovereign Metrics →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3.5 text-center">
            {[
              { label: "Aggregate GDP", val: currentProfile.snapshot.gdp },
              { label: "Population Reach", val: currentProfile.snapshot.population },
              { label: "Trade Growth", val: currentProfile.snapshot.gdpGrowth },
              { label: "Currencies", val: currentProfile.snapshot.currency },
              { label: "Inflation Avg", val: currentProfile.snapshot.inflation },
              { label: "Trade Surplus", val: currentProfile.snapshot.tradeBalance },
              { label: "Total FDI Flow", val: currentProfile.snapshot.fdi }
            ].map((snap, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 shadow-xs">
                <span className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-wider truncate">{snap.label}</span>
                <span className="block font-display text-xs md:text-sm font-extrabold text-gray-900 dark:text-white mt-1 leading-none truncate">
                  {snap.val}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03. KEY GLOBAL & BILATERAL INDICATORS (4 CARDS WITH YOY TRENDS) ── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
              Key Bilateral & Cross-Border Indicators
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Live telemetry synced across corridors</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {currentProfile.indicators.map((ind, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex justify-between items-center shadow-xs">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block">{ind.label}</span>
                  <span className="font-display text-xl font-bold text-gray-900 dark:text-white block leading-none">{ind.current}</span>
                  <span className="text-[9px] text-gray-500 block">Prev: {ind.previous}</span>
                </div>
                <div className="flex flex-col items-center">
                  {ind.isUp ? (
                    <TrendingUp className={`h-6 w-6 ${ind.isGood ? "text-emerald-500" : "text-red-500"}`} />
                  ) : (
                    <TrendingDown className={`h-6 w-6 ${ind.isGood ? "text-emerald-500" : "text-red-500"}`} />
                  )}
                  <span className="text-[8px] font-bold text-gray-400 uppercase mt-1">YoY Change</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 04. ALL COUNTRY STORIES, FEEDS & SIDEBAR (8-COL / 4-COL LAYOUT) ── */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Featured Stories + Filtered Feed Cards (8 Columns) */}
            <div className="col-span-12 lg:col-span-8 space-y-8">
              
              {/* Featured All Country Story Banner */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 dark:border-gray-800 pb-3">
                  <div>
                    <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Featured Bilateral News Stories
                    </h2>
                    <p className="text-[11px] text-gray-500">Top cross-border sovereign pacts and multilateral trade announcements.</p>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Filter all country stories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Primary Story Card & Compact Secondary List */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Primary Story Card */}
                  <div className="col-span-12 md:col-span-7">
                    {filteredStories.slice(0, 1).map((story) => (
                      <div key={story.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 h-full flex flex-col justify-between space-y-4 border-l-4 border-l-blue-600 shadow-xs">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-[9px] font-bold px-2.5 py-0.5 rounded border border-blue-200/30 flex items-center gap-1">
                              <Sparkles className="h-2.5 w-2.5" />
                              {story.category}
                            </span>
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                              {story.countryFlag} {story.country}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                              {story.companyInitials}
                            </div>
                            <span className="text-xs font-bold text-gray-900 dark:text-white">{story.companyName}</span>
                            <CheckCircle className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                          </div>

                          <h3 
                            onClick={() => setSelectedStory(story)}
                            className="font-display font-bold text-base md:text-lg text-gray-950 dark:text-white leading-tight cursor-pointer hover:text-blue-600 transition-colors"
                          >
                            {story.title}
                          </h3>
                          <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                            {story.summary}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3 text-[10px] font-semibold text-gray-500">
                          <div className="flex items-center gap-3">
                            <span>{story.time}</span>
                            <span>·</span>
                            <span>{story.readTime}</span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <button 
                              onClick={() => handleBookmarkToggle(story.id)} 
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              aria-label="Bookmark story"
                            >
                              <Bookmark className={`h-4 w-4 ${bookmarks.includes(story.id) ? "fill-blue-600 text-blue-600" : ""}`} />
                            </button>
                            <button 
                              onClick={() => setSelectedStory(story)} 
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              Read Story →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Secondary Compact Stories */}
                  <div className="col-span-12 md:col-span-5 space-y-3">
                    {filteredStories.slice(1, 3).map((story) => (
                      <div 
                        key={story.id} 
                        className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:border-blue-400 transition-all flex flex-col justify-between shadow-xs"
                      >
                        <div className="space-y-1.5">
                          <div className="flex justify-between items-center text-[8px] font-bold uppercase">
                            <span className="text-blue-600">{story.category}</span>
                            <span className="text-gray-400">{story.countryFlag} {story.time}</span>
                          </div>
                          <h4 
                            onClick={() => setSelectedStory(story)}
                            className="font-bold text-xs text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            {story.title}
                          </h4>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-2 mt-2 text-[9px]">
                          <span className="text-gray-500 truncate max-w-[160px]">{story.companyName}</span>
                          <button 
                            onClick={() => setSelectedStory(story)} 
                            className="text-blue-600 font-bold hover:underline cursor-pointer"
                          >
                            Read →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Latest & Trending Tabs Feed Stream */}
              <div className="space-y-4">
                <div className="flex gap-4 border-b border-gray-200 dark:border-gray-800 pb-2.5">
                  <button
                    onClick={() => setFeedFilter("all")}
                    className={`text-xs font-bold pb-2 border-b-2 px-1 transition-all cursor-pointer ${
                      feedFilter === "all" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    ALL CORRIDORS
                  </button>
                  <button
                    onClick={() => setFeedFilter("latest")}
                    className={`text-xs font-bold pb-2 border-b-2 px-1 transition-all cursor-pointer ${
                      feedFilter === "latest" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    LATEST FEED
                  </button>
                  <button
                    onClick={() => setFeedFilter("trending")}
                    className={`text-xs font-bold pb-2 border-b-2 px-1 transition-all cursor-pointer ${
                      feedFilter === "trending" ? "border-blue-600 text-blue-600" : "border-transparent text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    TRENDING FEED
                  </button>
                </div>

                <div className="space-y-3.5">
                  {filteredStories.map((story) => (
                    <div 
                      key={story.id} 
                      className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-500 transition-all duration-200 shadow-xs"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[8.5px] font-bold uppercase">
                          <span className="text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                            {story.countryFlag} {story.country} · {story.category}
                          </span>
                          <span className="text-gray-400">{story.time} · {story.readTime}</span>
                        </div>
                        <h4 
                          onClick={() => setSelectedStory(story)}
                          className="font-bold text-sm text-gray-950 dark:text-white leading-snug cursor-pointer hover:text-blue-600 transition-colors"
                        >
                          {story.title}
                        </h4>
                        <p className="text-[11.5px] text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                          {story.summary}
                        </p>
                      </div>

                      <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-800 pt-3 mt-3 text-[10px]">
                        <span className="text-gray-500 font-medium flex items-center gap-1">
                          Source: <strong className="text-gray-800 dark:text-gray-200">{story.companyName}</strong>
                        </span>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleShare(story)}
                            className="text-gray-400 hover:text-blue-600 transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                            {copiedId === story.id && <span className="text-[9px] text-emerald-500">Copied!</span>}
                          </button>
                          <button 
                            onClick={() => handleBookmarkToggle(story.id)}
                            className="text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                          >
                            <Bookmark className={`h-3.5 w-3.5 ${bookmarks.includes(story.id) ? "fill-blue-600 text-blue-600" : ""}`} />
                          </button>
                          <button 
                            onClick={() => setSelectedStory(story)} 
                            className="text-blue-600 font-bold hover:underline cursor-pointer"
                          >
                            Read Full Brief →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column: Sidebar with Live Breaking Updates, Pulse & Reports (4 Columns) */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              
              {/* Breaking & Major Bilateral Updates */}
              <section className="bg-rose-500/10 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 p-4.5 rounded-2xl space-y-3">
                <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-extrabold text-[9.5px] uppercase tracking-wider">
                  <Flame className="h-4 w-4 shrink-0 animate-pulse" />
                  Breaking Bilateral Corridors
                </div>
                <div className="divide-y divide-rose-200/40 dark:divide-rose-900/40">
                  {ALL_COUNTRY_STORIES.filter(s => s.isBreaking).map((story) => (
                    <div key={story.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                      <h4
                        onClick={() => setSelectedStory(story)}
                        className="font-bold text-xs text-gray-950 dark:text-white hover:text-rose-600 cursor-pointer leading-snug"
                      >
                        {story.countryFlag} {story.title}
                      </h4>
                      <div className="flex justify-between items-center text-[9px] text-gray-400">
                        <span>{story.companyName}</span>
                        <button onClick={() => setSelectedStory(story)} className="text-rose-500 font-bold hover:underline cursor-pointer">
                          Read Brief →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Trending Bilateral Topics */}
              <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4.5 rounded-2xl space-y-3 shadow-xs">
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 font-extrabold text-[9px] uppercase tracking-wider">
                  <Flame className="h-4 w-4 shrink-0 text-orange-500 fill-orange-500" />
                  Trending Global Topics
                </div>
                <div className="space-y-2">
                  {[
                    { tag: "#iCET_DefenseTech", count: "14.2k reads" },
                    { tag: "#GreenHydrogen_EU", count: "11.8k reads" },
                    { tag: "#CEPA_BilateralTrade", count: "9.5k reads" },
                    { tag: "#UPI_PayNow_ASEAN", count: "8.1k reads" },
                    { tag: "#SemiconductorMission", count: "6.4k reads" }
                  ].map((topic, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center bg-gray-50/70 dark:bg-gray-900/40 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-blue-400 transition-all cursor-pointer group"
                    >
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                        {topic.tag}
                      </span>
                      <span className="text-[10px] font-semibold text-gray-400">
                        {topic.count}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Recommended Bilateral Intelligence Reports */}
              <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4.5 rounded-2xl space-y-3.5 shadow-xs">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                  <span className="text-[9px] font-bold uppercase text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" /> Intelligence Store
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Q1 2026</span>
                </div>
                
                <div className="space-y-3">
                  {[
                    { title: "US-India Defense & Critical Tech Roadmap", price: "$249", code: "REP-BILA-US" },
                    { title: "Indo-EU Green Hydrogen Tariff Tables", price: "$199", code: "REP-TARIFF-EU" },
                    { title: "Asia-Pacific Semiconductor Flow Matrix", price: "$299", code: "REP-APAC-46" }
                  ].map((rep, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1">{rep.title}</h4>
                        <span className="text-[9px] text-gray-400 font-mono">{rep.code}</span>
                      </div>
                      <Link 
                        href="/eoi"
                        className="text-[10px] font-bold bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded-lg shrink-0 ml-2"
                      >
                        {rep.price}
                      </Link>
                    </div>
                  ))}
                </div>
              </section>

            </div>
          </div>
        </section>

        {/* ── 05. TRADE PULSE SUMMARY (MATCHING MY COUNTRY SECTION 06) ── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-xs space-y-6">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="h-4.5 w-4.5 text-blue-600" /> Bilateral Trade Pulse Summary
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Macro Indicators */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
                Macro Corridor Flows
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800">
                  <span className="text-gray-400 font-bold">Total Exports</span>
                  <span className="text-emerald-500 font-bold">{currentProfile.tradePulse.exports}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800">
                  <span className="text-gray-400 font-bold">Total Imports</span>
                  <span className="text-red-500 font-bold">{currentProfile.tradePulse.imports}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800">
                  <span className="text-gray-400 font-bold">Net Trade Balance</span>
                  <span className="text-gray-950 dark:text-white font-bold">{currentProfile.tradePulse.balance}</span>
                </div>
              </div>
            </div>

            {/* Bilateral Partners */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
                Top Active Markets
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[9px] text-gray-400 font-bold uppercase block mb-1">Leading Corridor Partners</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProfile.tradePulse.topMarkets.map((m, idx) => (
                      <span key={idx} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2.5 py-1 text-[9.5px] font-bold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-[9px] text-gray-400 font-bold uppercase block mb-1">Top Tracked Inflows</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentProfile.tradePulse.topImports.map((m, idx) => (
                      <span key={idx} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2.5 py-1 text-[9.5px] font-bold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Core Commodities */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 pb-2">
                Core Tracked Sectors
              </h3>
              <div className="space-y-2.5">
                <span className="text-[9px] text-gray-400 font-bold uppercase block">Dominant Bilateral Trade Sectors</span>
                <ul className="list-disc pl-4 text-xs font-semibold text-gray-700 dark:text-slate-300 space-y-1">
                  {currentProfile.tradePulse.topCategories.map((cat, idx) => (
                    <li key={idx}>{cat}</li>
                  ))}
                </ul>
                <Link
                  href="/en/poc-v2/country-news/intelligence"
                  className="block text-center w-full bg-blue-600/10 border border-blue-200/50 hover:bg-blue-600/20 text-blue-600 font-bold text-xs py-2 rounded-xl transition-colors"
                >
                  Explore Bilateral Trade Flow Map
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* ── 06. GLOBAL TRADE OPPORTUNITIES (MATCHING SECTION 07) ── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="h-4.5 w-4.5 text-blue-600" /> Bilateral Trade Opportunities
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Active cross-border procurement signals</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentProfile.tradeOpportunities.map((opp, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-blue-500 transition-all duration-300 shadow-xs">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded border border-blue-200/20">
                      {opp.sector}
                    </span>
                    <span className="text-xs font-bold text-emerald-500">{opp.demandChange} YoY</span>
                  </div>
                  <h3 className="text-xs font-extrabold text-gray-950 dark:text-white leading-tight">{opp.title}</h3>
                  <p className="text-[11px] text-gray-500">Target Corridors: {opp.market} · Trend: {opp.trend}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div className="text-[10px] text-gray-400 font-semibold truncate max-w-[200px]">
                    Qualified Suppliers: {opp.suppliers.join(", ")}
                  </div>
                  <Link href="/eoi" className="text-[10px] font-extrabold text-blue-600 hover:underline">
                    Explore Opportunity →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 07. CROSS-BORDER FDI & INVESTMENT OPPORTUNITIES (MATCHING SECTION 08) ── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="h-4.5 w-4.5 text-blue-600" /> Bilateral FDI & Investment Corridors
            </h2>
            <span className="text-[9px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 px-2 py-0.5 rounded">
              Sovereign Capital Allocations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentProfile.investmentOpportunities.map((inv, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-3 shadow-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-0.5 rounded border border-purple-200/20">
                    {inv.sector}
                  </span>
                  <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">{inv.signal}</span>
                </div>
                <h3 className="text-xs font-extrabold text-gray-950 dark:text-white leading-tight">{inv.theme}</h3>
                <p className="text-[11px] text-gray-600 dark:text-slate-300 leading-relaxed font-normal">{inv.description}</p>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                  <Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline">
                    Explore Investment Corridor →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 08. GLOBAL COMPANIES & LEADERS IN FOCUS (MATCHING SECTION 10 & 11) ── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Global Companies in Focus */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 md:p-6 space-y-4 shadow-xs">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Building className="h-4.5 w-4.5 text-blue-600" /> Bilateral Joint Ventures & Companies
              </h3>
            </div>

            <div className="space-y-3">
              {currentProfile.companies.map((comp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center hover:border-blue-500 transition-all bg-gray-50/50 dark:bg-gray-900/20">
                  <div>
                    <span className="text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded uppercase">
                      {comp.sector}
                    </span>
                    <h4 className="text-[11px] font-bold text-gray-900 dark:text-white mt-1 leading-tight">{comp.name}</h4>
                    <p className="text-[10px] text-gray-500 dark:text-slate-300 leading-relaxed font-normal mt-0.5">{comp.development}</p>
                  </div>
                  <Link href="/en/company-news/registered/pages" className="text-[9.5px] font-bold text-blue-600 hover:underline shrink-0 ml-4">
                    View Entity →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Leaders in Focus */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 md:p-6 space-y-4 shadow-xs">
            <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="h-4.5 w-4.5 text-blue-600" /> Sovereign Envoys & Leaders in Focus
              </h3>
            </div>

            <div className="space-y-3">
              {currentProfile.leaders.map((ldr, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center hover:border-blue-500 transition-all bg-gray-50/50 dark:bg-gray-900/20">
                  <div>
                    <span className="text-[8px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded uppercase">
                      {ldr.role}
                    </span>
                    <h4 className="text-[11px] font-bold text-gray-900 dark:text-white mt-1 leading-tight">{ldr.name} ({ldr.company})</h4>
                    <p className="text-[10px] text-gray-500 dark:text-slate-300 leading-relaxed font-normal mt-0.5">{ldr.development}</p>
                  </div>
                  <Link href="/en/leader" className="text-[9.5px] font-bold text-blue-600 hover:underline shrink-0 ml-4">
                    View Profile →
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ── 09. UPCOMING BILATERAL EXPOSITIONS & SUMMITS (MATCHING SECTION 12) ── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-blue-600" /> Upcoming Bilateral Trade Summits & Expositions
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Roundtables & Sovereign Expositions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentProfile.events.map((ev, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex justify-between items-center hover:border-blue-500 transition-all duration-300 shadow-xs">
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded uppercase">
                    {ev.type}
                  </span>
                  <h3 className="text-xs font-bold text-gray-950 dark:text-white mt-1 leading-tight">{ev.title}</h3>
                  <p className="text-[10px] text-gray-500">{ev.date} · Venue: {ev.location}</p>
                </div>
                <Link href="/en/profile/events" className="text-[9.5px] font-bold text-blue-600 hover:underline pl-4 shrink-0 cursor-pointer">
                  Request Access →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10. GLOBAL COUNTRY RISK & OPPORTUNITY OUTLOOK (MATCHING SECTION 14) ── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="h-4.5 w-4.5 text-amber-500" /> Bilateral Risk & Opportunity Outlook
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
            <div className="p-4 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-200/40 dark:border-emerald-900/40 rounded-xl space-y-2">
              <h4 className="font-bold text-emerald-600 uppercase tracking-wide text-[10px] flex items-center gap-1">
                ✓ Primary Growth Vectors
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-gray-600 dark:text-slate-300 leading-relaxed">
                <li>Automated digital customs integration reducing clearance time to under 2 hours.</li>
                <li>Expansion of bilateral CEPA & FTA corridors with tariff waivers on manufactured components.</li>
                <li>Green hydrogen and clean ammonia sovereign purchase accords between Asia and Europe.</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200/40 dark:border-amber-900/40 rounded-xl space-y-2">
              <h4 className="font-bold text-amber-500 uppercase tracking-wide text-[10px] flex items-center gap-1">
                ⚠ Key Watch Areas & Supply Vulnerabilities
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-gray-600 dark:text-slate-300 leading-relaxed">
                <li>Maritime choke point rerouting costs affecting container freight indices.</li>
                <li>Carbon Border Adjustment Mechanism (CBAM) compliance audits for industrial exporters.</li>
                <li>FX volatility margins in non-USD bilateral trade settlements.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── 11. ALL COUNTRY ALERTS PREFERENCES (MATCHING SECTION 15) ── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-xs space-y-4">
          <div className="border-b border-gray-100 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="h-4.5 w-4.5 text-blue-600" /> All Country Alerts & Intelligence Subscription
            </h2>
            <span className="text-[9px] text-gray-400 font-semibold">Custom cross-border news digests</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
            {[
              { id: "economy", label: "Global Macroeconomic Alerts" },
              { id: "trade", label: "Cross-Border Trade Leads" },
              { id: "policy", label: "Tariff & Regulatory Updates" },
              { id: "investment", label: "Bilateral FDI Corridor Signals" }
            ].map((pref) => (
              <label
                key={pref.id}
                className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/20 flex items-center justify-between cursor-pointer hover:border-blue-500 transition-colors"
              >
                <span className="text-gray-800 dark:text-gray-200 text-xs">{pref.label}</span>
                <input
                  type="checkbox"
                  checked={alertPreferences[pref.id as keyof typeof alertPreferences]}
                  onChange={(e) => setAlertPreferences({ ...alertPreferences, [pref.id]: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </section>

      </main>

      {/* ── INTERACTIVE ARTICLE DETAIL MODAL ── */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 md:p-8 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded">
                  {selectedStory.countryFlag} {selectedStory.country} · {selectedStory.category}
                </span>
                <span className="text-xs text-gray-400 font-medium">{selectedStory.time}</span>
              </div>

              <h2 className="font-display text-xl md:text-2xl font-bold text-gray-950 dark:text-white leading-tight">
                {selectedStory.title}
              </h2>

              <div className="flex items-center gap-2 py-2 border-y border-gray-100 dark:border-gray-800 text-xs text-gray-500">
                <span>Source Entity: <strong className="text-gray-900 dark:text-white">{selectedStory.companyName}</strong></span>
                <span>·</span>
                <span>{selectedStory.readTime}</span>
              </div>

              <div className="text-xs md:text-sm text-gray-700 dark:text-gray-300 leading-relaxed space-y-3 pt-2">
                <p>{selectedStory.summary}</p>
                {selectedStory.content && <p>{selectedStory.content}</p>}
                {selectedStory.impact && (
                  <div className="p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/40 dark:border-blue-900/40 text-xs text-blue-700 dark:text-blue-300 font-semibold">
                    Strategic Trade Impact: {selectedStory.impact}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBookmarkToggle(selectedStory.id)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Bookmark className={`h-3.5 w-3.5 ${bookmarks.includes(selectedStory.id) ? "fill-blue-600 text-blue-600" : ""}`} />
                  {bookmarks.includes(selectedStory.id) ? "Saved" : "Save"}
                </button>
                <button
                  onClick={() => handleShare(selectedStory)}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="h-3.5 w-3.5" />
                  Share
                </button>
              </div>
              <button
                onClick={() => setSelectedStory(null)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

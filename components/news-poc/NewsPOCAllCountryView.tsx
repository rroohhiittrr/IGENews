"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Search,
  Scale,
  Compass,
  ArrowRight,
  TrendingUp,
  Building,
  Users,
  Calendar,
  Lock,
  Mail,
  HelpCircle,
  Award,
  SlidersHorizontal,
  Bookmark,
  Check,
  Zap,
  Star,
  Info,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Activity,
  ArrowUpRight,
  Grid,
  List,
  AlertTriangle,
  FolderMinus,
  MapPin,
  Clock,
  BookOpen,
  Briefcase,
  Crown,
  ArrowLeft,
  Flame,
  Radio,
  Eye,
  ThumbsUp,
  Share2,
  FileText,
  Filter,
  Sparkles,
  ShieldAlert,
  BarChart2,
  ExternalLink,
  ChevronDown,
  Layers,
  TrendingDown
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface BreakingStory {
  id: string;
  country: string;
  flag: string;
  headline: string;
  category: string;
  time: string;
  source: string;
  summary: string;
  impactTag: string;
  isLive?: boolean;
}

interface NewsArticle {
  id: string;
  country: string;
  flag: string;
  title: string;
  category: string;
  source: string;
  time: string;
  readTime: string;
  summary: string;
  whyItMatters: string;
  image: string;
  views: string;
  likes: number;
  isFeatured?: boolean;
  isPremium?: boolean;
}

interface TrendingStory {
  id: string;
  title: string;
  countryA: { name: string; flag: string };
  countryB?: { name: string; flag: string };
  category: string;
  newsCount: number;
  engagement: string;
  trend: string;
}

interface CountryDirectoryItem {
  code: string;
  name: string;
  flag: string;
  region: "Asia" | "Europe" | "Africa" | "Middle East" | "North America" | "South America" | "Oceania";
  marketType: "Developed" | "Emerging" | "Frontier";
  newsTag: "Trending" | "Breaking" | "Most Covered";
  newsCount: number;
  latestHeadline: string;
  trendChange: string;
  gdp: string;
  growth: string;
  tradeVolume: string;
  capital: string;
}

interface RegionalNewsHub {
  region: string;
  countries: { name: string; flag: string }[];
  topStory: { title: string; country: string; flag: string; time: string };
  newsCount: number;
  trendingScore: string;
}

interface IndustryNewsGroup {
  industry: string;
  icon: string;
  stories: { country: string; flag: string; headline: string; time: string }[];
}

interface BilateralCorridorItem {
  id: string;
  countryA: string;
  flagA: string;
  countryB: string;
  flagB: string;
  title: string;
  summary: string;
  time: string;
  agreement: string;
  tradeValue: string;
}

interface BilateralMatrixProfile {
  corridor: string;
  countryA: string;
  flagA: string;
  countryB: string;
  flagB: string;
  tradeVolume: string;
  exportsA: string;
  importsA: string;
  growth: string;
  agreement: string;
  opportunityScore: number;
  breakdown: {
    momentum: number;
    demand: number;
    investment: number;
    logistics: number;
    risk: "Low" | "Medium" | "High";
  };
  latestNews: string;
  newsTime: string;
}

interface WhatNewsMeansItem {
  id: string;
  storyTitle: string;
  countries: string[];
  whatHappened: string;
  whyItMatters: string;
  whoIsAffected: {
    countries: string[];
    industries: string[];
  };
  whatCouldHappenNext: string;
}

interface ExportOpportunity {
  sector: string;
  icon: string;
  corridor: string;
  demandLevel: "Very High" | "High" | "Moderate";
  growth: string;
  score: number;
  description: string;
}

interface ImportOpportunity {
  commodity: string;
  demandMarket: string;
  demandFlag: string;
  demandGrowth: string;
  supplierMarkets: { name: string; flag: string }[];
  description: string;
}

interface FastMarketRanking {
  rank: number;
  country: string;
  flag: string;
  growth: string;
  opportunityScore: number;
  keyDriver: string;
  fdiInflow: string;
}

interface InvestmentDestination {
  title: string;
  country: string;
  flag: string;
  sector: string;
  potential: "Very High" | "High" | "Strategic";
  growthForecast: string;
  incentive: string;
  isSponsored?: boolean;
  description: string;
}

interface TradeAgreementItem {
  corridor: string;
  name: string;
  acronym: string;
  tradeImpact: "High" | "Very High" | "Strategic";
  latestUpdate: string;
  status: "Active" | "Phase-In" | "Under Review";
}

interface RiskMonitorItem {
  severity: "high" | "medium" | "low";
  riskType: string;
  title: string;
  affectedCountries: { name: string; flag: string }[];
  summary: string;
  outlook: string;
}

interface PremiumReport {
  id: string;
  title: string;
  code: string;
  type: string;
  pages: string;
  price: string;
  rating: string;
  description: string;
}

interface CountryEvent {
  id: string;
  title: string;
  type: string;
  date: string;
  location: string;
  industry: string;
  isFeatured?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATABASE & MOCK DATA (195 GLOBAL DATASETS)
// ─────────────────────────────────────────────────────────────────────────────

const BREAKING_NEWS_DATA: BreakingStory[] = [
  {
    id: "brk-1",
    country: "India",
    flag: "🇮🇳",
    headline: "Cabinet Clears $2.4B Semiconductor OSAT Incentive Grants for Gujarat Corridor",
    category: "Technology",
    time: "18 min ago",
    source: "iGEN Asian Bureau",
    summary: "New high-density silicon packaging fabs receive fast-track state capex reimbursement and clean energy power guarantees.",
    impactTag: "FDI Boost",
    isLive: true
  },
  {
    id: "brk-2",
    country: "United Arab Emirates",
    flag: "🇦🇪",
    headline: "Digital Single-Window Customs Cuts Khalifa & Mundra Container Transit by 42%",
    category: "Trade",
    time: "32 min ago",
    source: "Gulf Commerce Wire",
    summary: "API container validation reduces customs clearance time to under 90 minutes across the bilateral CEPA corridor.",
    impactTag: "+18.4% Vol",
    isLive: true
  },
  {
    id: "brk-3",
    country: "United States",
    flag: "🇺🇸",
    headline: "Department of Commerce Signs Bilateral Critical Mineral Supply Accord with Japan",
    category: "Manufacturing",
    time: "48 min ago",
    source: "Washington Trade Desk",
    summary: "Joint processing frameworks exempt refined rare earths and battery cathodes from unilateral tariff reviews.",
    impactTag: "Supply Accord"
  },
  {
    id: "brk-4",
    country: "Germany",
    flag: "🇩🇪",
    headline: "Federal Economic Ministry Finalizes €3.2B Clean Energy Port Terminal in Hamburg",
    category: "Energy",
    time: "1 hr ago",
    source: "European Energy Review",
    summary: "Dedicated green ammonia and hydrogen discharge berths constructed to receive dedicated Asian maritime carriers.",
    impactTag: "Cleantech Capex"
  },
  {
    id: "brk-5",
    country: "Vietnam",
    flag: "🇻🇳",
    headline: "Electronics Export Run-Rate Up 24% as Global Tech OEMs Expand Hai Phong Clusters",
    category: "Manufacturing",
    time: "2 hrs ago",
    source: "ASEAN Commerce Bureau",
    summary: "Multi-layer PCB and precision sensor manufacturing hubs operationalized ahead of seasonal hardware ramp-ups.",
    impactTag: "+24% Exports"
  }
];

const LATEST_NEWS_DATA: NewsArticle[] = [
  {
    id: "lat-1",
    country: "India",
    flag: "🇮🇳",
    title: "India-UAE Bilateral Non-Oil Trade Surpasses $87B Run-Rate Under Preferential CEPA",
    category: "Trade",
    source: "iGEN Trade Wire",
    time: "1 hour ago",
    readTime: "5 min read",
    summary: "Comprehensive Economic Partnership Agreement drives record shipments in specialty pharma, precision engineering castings, and petrochemicals.",
    whyItMatters: "Opens immediate zero-tariff supply corridors for tier-1 engineering OEMs, medical manufacturers, and cold-chain agri-exporters.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&auto=format&fit=crop&q=80",
    views: "19.4k",
    likes: 412,
    isFeatured: true,
    isPremium: false
  },
  {
    id: "lat-2",
    country: "United States",
    flag: "🇺🇸",
    title: "US-Mexico Cross-Border Nearshoring Crosses Historic $480B Freight Benchmark",
    category: "Manufacturing",
    source: "North American Commerce",
    time: "2 hours ago",
    readTime: "4 min read",
    summary: "Automotive assembly lines and EV battery pack production clusters in Monterrey accelerate freight rail connectivity to Texas hubs.",
    whyItMatters: "Drastically lowers maritime supply transit risk while boosting North American regional supplier content shares.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=700&auto=format&fit=crop&q=80",
    views: "14.8k",
    likes: 310,
    isFeatured: false,
    isPremium: true
  },
  {
    id: "lat-3",
    country: "Germany",
    flag: "🇩🇪",
    title: "Green Hydrogen Marine Corridors: Hamburg and Kochi Ink Zero-Emission Port Linkage",
    category: "Energy",
    source: "Clean Energy International",
    time: "3 hours ago",
    readTime: "6 min read",
    summary: "Direct containerized hydrogen carrier routes scheduled under ISO clean fuel certification, avoiding early CBAM carbon tariffs.",
    whyItMatters: "Exempts certified renewable fuel suppliers from European carbon border adjustment levies starting Q4.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&auto=format&fit=crop&q=80",
    views: "11.2k",
    likes: 245,
    isFeatured: false,
    isPremium: false
  },
  {
    id: "lat-4",
    country: "Japan",
    flag: "🇯🇵",
    title: "Japan-India Industrial Townships Accelerate High-Purity Silicon Wafer JV Sites",
    category: "Technology",
    source: "Tokyo Tech Monitor",
    time: "4 hours ago",
    readTime: "4 min read",
    summary: "Consortium of Japanese chemical toolmakers and Indian fab builders break ground on 300mm substrate polishing cleanrooms.",
    whyItMatters: "Builds a resilient non-mainland Asian silicon wafer supply chain for next-gen 7nm and 5nm automotive microcontrollers.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80",
    views: "10.5k",
    likes: 198,
    isFeatured: false,
    isPremium: false
  },
  {
    id: "lat-5",
    country: "Singapore",
    flag: "🇸🇬",
    title: "Cross-Border Real-Time Payment Corridors Scale to 8 APAC Sovereign Economies",
    category: "Economy",
    source: "FinTech Sovereign Desk",
    time: "5 hours ago",
    readTime: "3 min read",
    summary: "Instant bilateral FX settlement networks eliminate intermediary correspondent banking fees for SME merchant cross-border transfers.",
    whyItMatters: "Reduces trade settlement clearance times from 48 hours to under 3 seconds with sub-0.2% FX margins.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=700&auto=format&fit=crop&q=80",
    views: "8.9k",
    likes: 172,
    isFeatured: false,
    isPremium: false
  }
];

const TRENDING_STORIES_DATA: TrendingStory[] = [
  {
    id: "tr-1",
    title: "India–UAE Comprehensive Economic Partnership Corridor (CEPA)",
    countryA: { name: "India", flag: "🇮🇳" },
    countryB: { name: "UAE", flag: "🇦🇪" },
    category: "Bilateral Trade",
    newsCount: 42,
    engagement: "98.4k views",
    trend: "+28% Today"
  },
  {
    id: "tr-2",
    title: "US–Mexico Cross-Border Nearshoring & Automotive Manufacturing Surge",
    countryA: { name: "United States", flag: "🇺🇸" },
    countryB: { name: "Mexico", flag: "🇲🇽" },
    category: "Manufacturing",
    newsCount: 36,
    engagement: "74.1k views",
    trend: "+22% Today"
  },
  {
    id: "tr-3",
    title: "China Semiconductor Export Regulations & Asian Supply Realignment",
    countryA: { name: "China", flag: "🇨🇳" },
    category: "Technology",
    newsCount: 51,
    engagement: "112.5k views",
    trend: "+34% Today"
  },
  {
    id: "tr-4",
    title: "Germany Industrial Energy Transition & Clean Hydrogen Corridors",
    countryA: { name: "Germany", flag: "🇩🇪" },
    category: "Energy Policy",
    newsCount: 29,
    engagement: "58.2k views",
    trend: "+16% Today"
  },
  {
    id: "tr-5",
    title: "Vietnam Electronics Export Acceleration & Fab Component Assembly",
    countryA: { name: "Vietnam", flag: "🇻🇳" },
    category: "Hardware",
    newsCount: 24,
    engagement: "46.0k views",
    trend: "+19% Today"
  }
];

const COUNTRIES_195_DIRECTORY: CountryDirectoryItem[] = [
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    region: "Asia",
    marketType: "Emerging",
    newsTag: "Breaking",
    newsCount: 284,
    latestHeadline: "Semiconductor OSAT incentives and CEPA trade expansions cross $12B mark.",
    trendChange: "+24%",
    gdp: "$3.75 Trillion",
    growth: "+7.3%",
    tradeVolume: "$1.67T",
    capital: "New Delhi"
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    marketType: "Emerging",
    newsTag: "Trending",
    newsCount: 196,
    latestHeadline: "Digital single-window container clearances cut port transit latency by 42%.",
    trendChange: "+18%",
    gdp: "$507 Billion",
    growth: "+4.2%",
    tradeVolume: "$635B",
    capital: "Abu Dhabi"
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    region: "North America",
    marketType: "Developed",
    newsTag: "Most Covered",
    newsCount: 512,
    latestHeadline: "Critical mineral agreements signed with Asian partners for EV cathode supply.",
    trendChange: "+12%",
    gdp: "$27.9 Trillion",
    growth: "+2.5%",
    tradeVolume: "$5.17T",
    capital: "Washington D.C."
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    marketType: "Developed",
    newsTag: "Trending",
    newsCount: 215,
    latestHeadline: "Federal clean energy port terminals operationalized in Hamburg.",
    trendChange: "+15%",
    gdp: "$4.46 Trillion",
    growth: "+1.2%",
    tradeVolume: "$3.02T",
    capital: "Berlin"
  },
  {
    code: "VN",
    name: "Vietnam",
    flag: "🇻🇳",
    region: "Asia",
    marketType: "Emerging",
    newsTag: "Trending",
    newsCount: 148,
    latestHeadline: "Electronics manufacturing clusters log 24% quarterly export jump.",
    trendChange: "+28%",
    gdp: "$430 Billion",
    growth: "+6.5%",
    tradeVolume: "$730B",
    capital: "Hanoi"
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    region: "Asia",
    marketType: "Developed",
    newsTag: "Most Covered",
    newsCount: 172,
    latestHeadline: "Cross-border real-time digital currency clearing expands across 8 APAC hubs.",
    trendChange: "+16%",
    gdp: "$501 Billion",
    growth: "+3.1%",
    tradeVolume: "$887B",
    capital: "Singapore"
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    region: "Asia",
    marketType: "Developed",
    newsTag: "Breaking",
    newsCount: 204,
    latestHeadline: "Joint silicon wafer fabrication cleanrooms break ground in South Asia.",
    trendChange: "+11%",
    gdp: "$4.21 Trillion",
    growth: "+1.4%",
    tradeVolume: "$1.52T",
    capital: "Tokyo"
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    marketType: "Developed",
    newsTag: "Most Covered",
    newsCount: 238,
    latestHeadline: "Digital bilateral services accord signed to streamline fintech data flows.",
    trendChange: "+9%",
    gdp: "$3.34 Trillion",
    growth: "+1.1%",
    tradeVolume: "$1.41T",
    capital: "London"
  },
  {
    code: "SA",
    name: "Saudi Arabia",
    flag: "🇸🇦",
    region: "Middle East",
    marketType: "Emerging",
    newsTag: "Trending",
    newsCount: 165,
    latestHeadline: "Vision 2030 industrial logistics zones attract $18B in foreign manufacturing FDI.",
    trendChange: "+21%",
    gdp: "$1.11 Trillion",
    growth: "+4.6%",
    tradeVolume: "$510B",
    capital: "Riyadh"
  },
  {
    code: "MX",
    name: "Mexico",
    flag: "🇲🇽",
    region: "South America",
    marketType: "Emerging",
    newsTag: "Breaking",
    newsCount: 182,
    latestHeadline: "Monterrey cross-border manufacturing park inaugurates second freight rail terminal.",
    trendChange: "+26%",
    gdp: "$1.47 Trillion",
    growth: "+3.2%",
    tradeVolume: "$1.15T",
    capital: "Mexico City"
  },
  {
    code: "ZA",
    name: "South Africa",
    flag: "🇿🇦",
    region: "Africa",
    marketType: "Emerging",
    newsTag: "Trending",
    newsCount: 94,
    latestHeadline: "AfCFTA single market rules boost intra-African mineral and agri-exports.",
    trendChange: "+14%",
    gdp: "$399 Billion",
    growth: "+1.8%",
    tradeVolume: "$230B",
    capital: "Pretoria"
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    region: "Oceania",
    marketType: "Developed",
    newsTag: "Most Covered",
    newsCount: 156,
    latestHeadline: "Critical lithium and green iron supply contracts signed with European automakers.",
    trendChange: "+13%",
    gdp: "$1.72 Trillion",
    growth: "+2.0%",
    tradeVolume: "$680B",
    capital: "Canberra"
  }
];

const REGIONAL_NEWS_DATA: RegionalNewsHub[] = [
  {
    region: "Asia-Pacific (APAC)",
    countries: [{ name: "India", flag: "🇮🇳" }, { name: "China", flag: "🇨🇳" }, { name: "Japan", flag: "🇯🇵" }, { name: "Singapore", flag: "🇸🇬" }, { name: "Vietnam", flag: "🇻🇳" }],
    topStory: { title: "Semiconductor OSAT & Clean Energy Corridors Lead Regional Capex", country: "India", flag: "🇮🇳", time: "2h ago" },
    newsCount: 840,
    trendingScore: "+26% Velocity"
  },
  {
    region: "Europe (EU & UK)",
    countries: [{ name: "Germany", flag: "🇩🇪" }, { name: "United Kingdom", flag: "🇬🇧" }, { name: "France", flag: "🇫🇷" }, { name: "Italy", flag: "🇮🇹" }, { name: "Netherlands", flag: "🇳🇱" }],
    topStory: { title: "Hamburg Marine Clean Fuel Hubs Prepare for CBAM Regulatory Inception", country: "Germany", flag: "🇩🇪", time: "3h ago" },
    newsCount: 620,
    trendingScore: "+14% Velocity"
  },
  {
    region: "Middle East & GCC",
    countries: [{ name: "UAE", flag: "🇦🇪" }, { name: "Saudi Arabia", flag: "🇸🇦" }, { name: "Qatar", flag: "🇶🇦" }, { name: "Oman", flag: "🇴🇲" }],
    topStory: { title: "Non-Oil CEPA Trade Accords Catalyze Sovereign Logistics and AI Infrastructure", country: "UAE", flag: "🇦🇪", time: "1h ago" },
    newsCount: 410,
    trendingScore: "+22% Velocity"
  },
  {
    region: "Americas (North & South)",
    countries: [{ name: "USA", flag: "🇺🇸" }, { name: "Canada", flag: "🇨🇦" }, { name: "Mexico", flag: "🇲🇽" }, { name: "Brazil", flag: "🇧🇷" }],
    topStory: { title: "USMCA Cross-Border Nearshoring Sets All-Time Automotive Freight Volume High", country: "Mexico", flag: "🇲🇽", time: "2h ago" },
    newsCount: 780,
    trendingScore: "+18% Velocity"
  },
  {
    region: "Africa (AfCFTA)",
    countries: [{ name: "South Africa", flag: "🇿🇦" }, { name: "Egypt", flag: "🇪🇬" }, { name: "Nigeria", flag: "🇳🇬" }, { name: "Kenya", flag: "🇰🇪" }],
    topStory: { title: "Intra-African Trade Tariffs Phased Down Under Single Customs Union", country: "South Africa", flag: "🇿🇦", time: "4h ago" },
    newsCount: 290,
    trendingScore: "+19% Velocity"
  },
  {
    region: "Oceania",
    countries: [{ name: "Australia", flag: "🇦🇺" }, { name: "New Zealand", flag: "🇳🇿" }],
    topStory: { title: "Critical Lithium & Green Minerals Long-Term Supply Pacts Signed", country: "Australia", flag: "🇦🇺", time: "5h ago" },
    newsCount: 180,
    trendingScore: "+11% Velocity"
  }
];

const INDUSTRY_NEWS_DATA: IndustryNewsGroup[] = [
  {
    industry: "Semiconductors & Electronics",
    icon: "⚙️",
    stories: [
      { country: "India", flag: "🇮🇳", headline: "Cabinet approves $2.4B semiconductor OSAT capital subsidy package in Sanand.", time: "18m ago" },
      { country: "Taiwan", flag: "🇹🇼", headline: "Advanced 2nm wafer pilot lines achieve record 82% yields for next-gen servers.", time: "2h ago" },
      { country: "South Korea", flag: "🇰🇷", headline: "High-bandwidth memory (HBM3e) export volumes jump 38% on global datacenter demand.", time: "4h ago" }
    ]
  },
  {
    industry: "Renewable Energy & Cleantech",
    icon: "⚡",
    stories: [
      { country: "Germany", flag: "🇩🇪", headline: "Hamburg Port inaugurates dedicated green ammonia and hydrogen discharge terminal.", time: "1h ago" },
      { country: "UAE", flag: "🇦🇪", headline: "Masdar Clean Energy signs 5GW utility-scale solar grid accord in North Africa.", time: "3h ago" },
      { country: "India", flag: "🇮🇳", headline: "Offshore wind transmission tariffs waived for new 5GW seabed lease winners.", time: "5h ago" }
    ]
  },
  {
    industry: "Automotive & Electric Mobility",
    icon: "🚗",
    stories: [
      { country: "Mexico", flag: "🇲🇽", headline: "Monterrey EV mega-cluster launches dedicated high-speed rail connection to Texas.", time: "2h ago" },
      { country: "Japan", flag: "🇯🇵", headline: "Solid-state battery commercialization roadmap moves forward to 2027.", time: "4h ago" },
      { country: "Germany", flag: "🇩🇪", headline: "Automakers accelerate battery cell recycling partnerships across Central Europe.", time: "6h ago" }
    ]
  },
  {
    industry: "Pharmaceuticals & Biotechnology",
    icon: "💊",
    stories: [
      { country: "India", flag: "🇮🇳", headline: "US-FDA approved sterile injectable facilities expand cold-chain air routes to GCC.", time: "3h ago" },
      { country: "Switzerland", flag: "🇨🇭", headline: "Global clinical trial hubs adopt automated AI molecular design protocols.", time: "5h ago" },
      { country: "USA", flag: "🇺🇸", headline: "Biomanufacturing reshoring initiative grants awarded to 12 regional university hubs.", time: "7h ago" }
    ]
  }
];

const BILATERAL_NEWS_ITEMS: BilateralCorridorItem[] = [
  {
    id: "bil-1",
    countryA: "India",
    flagA: "🇮🇳",
    countryB: "United Arab Emirates",
    flagB: "🇦🇪",
    title: "India-UAE CEPA Trade Acceleration Reaches $87.2B Milestone",
    summary: "Preferential tariff phase-outs and digital customs validation cut freight turnaround times, creating immediate high-margin supply contracts.",
    time: "1 hour ago",
    agreement: "CEPA Accord",
    tradeValue: "$87.2B"
  },
  {
    id: "bil-2",
    countryA: "United States",
    flagA: "🇺🇸",
    countryB: "Mexico",
    flagB: "🇲🇽",
    title: "US-Mexico Cross-Border Nearshoring Expands Automotive Component Flows",
    summary: "USMCA compliance accelerates rail container throughput at Laredo and Monterrey dry ports.",
    time: "2 hours ago",
    agreement: "USMCA Framework",
    tradeValue: "$480B"
  },
  {
    id: "bil-3",
    countryA: "Germany",
    flagA: "🇩🇪",
    countryB: "India",
    flagB: "🇮🇳",
    title: "Germany-India Green Hydrogen Corridor Formalized for Hamburg Dispatches",
    summary: "Long-term bilateral off-take agreements ensure zero-emission marine transport without early CBAM penalties.",
    time: "4 hours ago",
    agreement: "Green Energy Corridor",
    tradeValue: "$30.8B"
  },
  {
    id: "bil-4",
    countryA: "United States",
    flagA: "🇺🇸",
    countryB: "India",
    flagB: "🇮🇳",
    title: "US-India iCET Critical Tech Framework Expands Defense & Silicon Packaging JVs",
    summary: "Joint engineering accords remove high-tech export licensing restrictions for aerospace and fab tool components.",
    time: "5 hours ago",
    agreement: "iCET Accord",
    tradeValue: "$191.8B"
  },
  {
    id: "bil-5",
    countryA: "United Arab Emirates",
    flagA: "🇦🇪",
    countryB: "Saudi Arabia",
    flagB: "🇸🇦",
    title: "UAE-Saudi Cross-Border Logistics Modernization Integrates Land Port Single Windows",
    summary: "Unified digital manifest clearance reduces inter-GCC transport clearance to under 2 hours.",
    time: "6 hours ago",
    agreement: "GCC Single Customs Union",
    tradeValue: "$38.4B"
  }
];

const BILATERAL_CORRIDOR_DATABASE: Record<string, BilateralMatrixProfile> = {
  "India-UAE": {
    corridor: "India 🇮🇳 ↔ UAE 🇦🇪",
    countryA: "India",
    flagA: "🇮🇳",
    countryB: "United Arab Emirates",
    flagB: "🇦🇪",
    tradeVolume: "$87.2 Billion",
    exportsA: "$31.6 Billion",
    importsA: "$55.6 Billion",
    growth: "+18.4% YoY",
    agreement: "Comprehensive Economic Partnership Agreement (CEPA)",
    opportunityScore: 94,
    breakdown: {
      momentum: 96,
      demand: 94,
      investment: 92,
      logistics: 95,
      risk: "Low"
    },
    latestNews: "Digital single-window customs cuts Khalifa & Mundra container transit by 42%.",
    newsTime: "32 min ago"
  },
  "India-USA": {
    corridor: "India 🇮🇳 ↔ USA 🇺🇸",
    countryA: "India",
    flagA: "🇮🇳",
    countryB: "United States",
    flagB: "🇺🇸",
    tradeVolume: "$191.8 Billion",
    exportsA: "$118.4 Billion",
    importsA: "$73.4 Billion",
    growth: "+12.4% YoY",
    agreement: "Initiative on Critical and Emerging Technology (iCET)",
    opportunityScore: 92,
    breakdown: {
      momentum: 93,
      demand: 95,
      investment: 91,
      logistics: 89,
      risk: "Low"
    },
    latestNews: "Bilateral defense co-production and aerospace silicon packaging agreements finalized.",
    newsTime: "2 hours ago"
  },
  "India-Germany": {
    corridor: "India 🇮🇳 ↔ Germany 🇩🇪",
    countryA: "India",
    flagA: "🇮🇳",
    countryB: "Germany",
    flagB: "🇩🇪",
    tradeVolume: "$30.8 Billion",
    exportsA: "$10.2 Billion",
    importsA: "$20.6 Billion",
    growth: "+14.5% YoY",
    agreement: "Green and Sustainable Development Partnership",
    opportunityScore: 89,
    breakdown: {
      momentum: 90,
      demand: 88,
      investment: 91,
      logistics: 87,
      risk: "Low"
    },
    latestNews: "Kochi-Hamburg green ammonia maritime shipping route agreement operationalized.",
    newsTime: "4 hours ago"
  },
  "USA-Mexico": {
    corridor: "USA 🇺🇸 ↔ Mexico 🇲🇽",
    countryA: "United States",
    flagA: "🇺🇸",
    countryB: "Mexico",
    flagB: "🇲🇽",
    tradeVolume: "$480.0 Billion",
    exportsA: "$210.0 Billion",
    importsA: "$270.0 Billion",
    growth: "+15.2% YoY",
    agreement: "United States-Mexico-Canada Agreement (USMCA)",
    opportunityScore: 95,
    breakdown: {
      momentum: 97,
      demand: 96,
      investment: 95,
      logistics: 93,
      risk: "Medium"
    },
    latestNews: "Cross-border freight rail throughput sets all-time record at Monterrey dry port.",
    newsTime: "3 hours ago"
  },
  "Germany-China": {
    corridor: "Germany 🇩🇪 ↔ China 🇨🇳",
    countryA: "Germany",
    flagA: "🇩🇪",
    countryB: "China",
    flagB: "🇨🇳",
    tradeVolume: "$254.0 Billion",
    exportsA: "$98.0 Billion",
    importsA: "$156.0 Billion",
    growth: "+3.2% YoY",
    agreement: "EU-China Bilateral Investment Agreement (Under Review)",
    opportunityScore: 78,
    breakdown: {
      momentum: 76,
      demand: 82,
      investment: 79,
      logistics: 81,
      risk: "Medium"
    },
    latestNews: "Automotive battery supply chains adjust for EU local content regulations.",
    newsTime: "6 hours ago"
  }
};

const WHAT_NEWS_MEANS_DATA: WhatNewsMeansItem[] = [
  {
    id: "wnm-1",
    storyTitle: "India-UAE CEPA Logistics Acceleration Cuts Port Waiting Times to Under 90 Minutes",
    countries: ["India 🇮🇳", "UAE 🇦🇪"],
    whatHappened: "Unified API customs declaration and container pre-clearance deployed across Mundra, Nhava Sheva, Khalifa, and Jebel Ali terminals.",
    whyItMatters: "Direct operational costs per container decrease by $340, significantly widening profit margins for perishable agri-exporters and high-value pharmaceuticals.",
    whoIsAffected: {
      countries: ["India", "UAE", "GCC Partners"],
      industries: ["Maritime Freight", "Pharmaceuticals", "Precision Engineering", "Cold-Chain Food"]
    },
    whatCouldHappenNext: "Bilateral non-oil trade run-rate is projected to hit $100B milestone 18 months ahead of the original 2030 target schedule."
  },
  {
    id: "wnm-2",
    storyTitle: "European Union CBAM Carbon Reporting Regulations Take Stage-2 Effect for Metals",
    countries: ["Germany 🇩🇪", "India 🇮🇳", "China 🇨🇳", "UK 🇬🇧"],
    whatHappened: "Importers of steel, aluminium, and cement must submit verified item-level greenhouse gas emissions certificates with every shipment.",
    whyItMatters: "Uncertified foreign smelters face tariff surcharges up to €85/tonne, forcing immediate supply chain decarbonization investments.",
    whoIsAffected: {
      countries: ["EU Members", "Asian Steel Exporters", "Middle Eastern Smelters"],
      industries: ["Metallurgy", "Automotive OEM Supply", "Construction Equipment", "Heavy Engineering"]
    },
    whatCouldHappenNext: "Accelerated capital shift toward green hydrogen electrolysis reduction technologies in steel mills globally."
  }
];

const EXPORT_OPPORTUNITIES_DATA: ExportOpportunity[] = [
  {
    sector: "Pharmaceuticals & Generics",
    icon: "💊",
    corridor: "India 🇮🇳 → UAE 🇦🇪 / GCC",
    demandLevel: "Very High",
    growth: "+18.4% YoY",
    score: 94,
    description: "High requirement for sterile injectables, oncology biosimilars, and oral solids with US-FDA / MOHAP approvals."
  },
  {
    sector: "Precision Automotive Components",
    icon: "⚙️",
    corridor: "Mexico 🇲🇽 → USA 🇺🇸",
    demandLevel: "Very High",
    growth: "+16.2% YoY",
    score: 95,
    description: "Aluminum chassis castings, EV battery tray extrusions, and wiring harness subassemblies under USMCA rules."
  },
  {
    sector: "Green Ammonia & Clean Fuel",
    icon: "⚡",
    corridor: "India 🇮🇳 / Australia 🇦🇺 → Germany 🇩🇪",
    demandLevel: "High",
    growth: "+24.0% YoY",
    score: 91,
    description: "Direct long-term off-take contracts for green hydrogen carriers exempt from EU carbon border adjustment taxes."
  },
  {
    sector: "Precision Electronics & PCBs",
    icon: "💻",
    corridor: "Vietnam 🇻🇳 → North America 🇺🇸",
    demandLevel: "High",
    growth: "+22.5% YoY",
    score: 89,
    description: "Multi-layer rigid-flex boards and IoT edge sensor modules for consumer hardware and telecom OEMs."
  }
];

const IMPORT_OPPORTUNITIES_DATA: ImportOpportunity[] = [
  {
    commodity: "High-Purity Semiconductor Silicon Wafers",
    demandMarket: "India",
    demandFlag: "🇮🇳",
    demandGrowth: "+24.5% YoY",
    supplierMarkets: [{ name: "Japan", flag: "🇯🇵" }, { name: "Taiwan", flag: "🇹🇼" }, { name: "Germany", flag: "🇩🇪" }],
    description: "Urgent demand for 200mm & 300mm polished substrate wafers as 4 new OSAT fab sites break ground."
  },
  {
    commodity: "AI Datacenter Liquid Cooling Hardware",
    demandMarket: "United Arab Emirates",
    demandFlag: "🇦🇪",
    demandGrowth: "+31.0% YoY",
    supplierMarkets: [{ name: "United States", flag: "🇺🇸" }, { name: "Taiwan", flag: "🇹🇼" }, { name: "Singapore", flag: "🇸🇬" }],
    description: "Massive sovereign compute investments in Abu Dhabi & Dubai driving procurement for immersion coolant manifolds."
  },
  {
    commodity: "Automated Industrial Laser Cutters",
    demandMarket: "Vietnam",
    demandFlag: "🇻🇳",
    demandGrowth: "+18.2% YoY",
    supplierMarkets: [{ name: "Germany", flag: "🇩🇪" }, { name: "Japan", flag: "🇯🇵" }, { name: "South Korea", flag: "🇰🇷" }],
    description: "Factory upgrades across Hai Phong electronics clusters requiring high-precision CNC laser tooling."
  }
];

const FAST_MARKET_RANKINGS: FastMarketRanking[] = [
  { rank: 1, country: "Vietnam", flag: "🇻🇳", growth: "+6.5%", opportunityScore: 92, keyDriver: "Electronics Supply Chain Hub", fdiInflow: "$36.6B" },
  { rank: 2, country: "India", flag: "🇮🇳", growth: "+7.3%", opportunityScore: 95, keyDriver: "Semiconductor PLI & Infrastructure Capex", fdiInflow: "$71.4B" },
  { rank: 3, country: "Indonesia", flag: "🇮🇩", growth: "+5.2%", opportunityScore: 84, keyDriver: "Nickel Processing & EV Battery Ecosystem", fdiInflow: "$28.4B" },
  { rank: 4, country: "United Arab Emirates", flag: "🇦🇪", growth: "+4.2%", opportunityScore: 91, keyDriver: "Non-Oil CEPA Trade & Sovereign AI Grids", fdiInflow: "$22.7B" },
  { rank: 5, country: "Mexico", flag: "🇲🇽", growth: "+3.2%", opportunityScore: 88, keyDriver: "USMCA Cross-Border Nearshoring", fdiInflow: "$38.0B" }
];

const INVESTMENT_DESTINATIONS_DATA: InvestmentDestination[] = [
  {
    title: "Gujarat Dholera Semiconductor & Clean Fab Corridor",
    country: "India",
    flag: "🇮🇳",
    sector: "Semiconductors & Technology",
    potential: "Very High",
    growthForecast: "+22.4% CAGR",
    incentive: "50% Fiscal Capex Capital Reimbursement",
    isSponsored: false,
    description: "Sovereign power and purified water infrastructure ready for tier-1 OSAT packaging and display fabrication lines."
  },
  {
    title: "Dubai Multi Commodities Centre (DMCC) Global Freezone",
    country: "UAE",
    flag: "🇦🇪",
    sector: "Logistics, Trade & Commodities",
    potential: "High",
    growthForecast: "+18.0% CAGR",
    incentive: "0% Corporate Tax & 100% Foreign Ownership",
    isSponsored: true,
    description: "Integrated trade logistics and crypto-asset clearing hub connecting Asian exporters directly to African & European trade lanes."
  },
  {
    title: "Monterrey Advanced Automotive & EV Industrial Park",
    country: "Mexico",
    flag: "🇲🇽",
    sector: "Electric Mobility & Auto Components",
    potential: "High",
    growthForecast: "+16.5% CAGR",
    incentive: "USMCA Tariff-Free North American Sourcing",
    isSponsored: false,
    description: "Direct dry port customs terminals linking suppliers in 24 hours directly to assembly lines across Texas and the Midwest."
  }
];

const TRADE_AGREEMENTS_DATA: TradeAgreementItem[] = [
  {
    corridor: "India 🇮🇳 ↔ UAE 🇦🇪",
    name: "Comprehensive Economic Partnership Agreement",
    acronym: "CEPA",
    tradeImpact: "Very High",
    latestUpdate: "Stage-3 tariff concessions activated across 4,200 HS product codes.",
    status: "Active"
  },
  {
    corridor: "USA 🇺🇸 ↔ India 🇮🇳",
    name: "Initiative on Critical & Emerging Technology",
    acronym: "iCET",
    tradeImpact: "High",
    latestUpdate: "Joint defense co-production and aerospace chip packaging agreements ratified.",
    status: "Active"
  },
  {
    corridor: "USA 🇺🇸 ↔ Mexico 🇲🇽 ↔ Canada 🇨🇦",
    name: "United States-Mexico-Canada Agreement",
    acronym: "USMCA",
    tradeImpact: "Very High",
    latestUpdate: "Regional value content threshold updated to 75% for automotive manufacturing.",
    status: "Active"
  },
  {
    corridor: "Pan-Africa (54 Nations) 🌍",
    name: "African Continental Free Trade Area",
    acronym: "AfCFTA",
    tradeImpact: "Strategic",
    latestUpdate: "Digital rules of origin portal operationalized for intra-continental cargo.",
    status: "Phase-In"
  }
];

const RISK_MONITOR_DATA: RiskMonitorItem[] = [
  {
    severity: "high",
    riskType: "Maritime Logistics",
    title: "Red Sea Container Transit Rerouting Surcharges",
    affectedCountries: [{ name: "India", flag: "🇮🇳" }, { name: "China", flag: "🇨🇳" }, { name: "UAE", flag: "🇦🇪" }, { name: "Germany", flag: "🇩🇪" }],
    summary: "Shipping lines serving Mumbai–Rotterdam and Shanghai–Hamburg routes implement $450/TEU Cape of Good Hope bunker surcharges.",
    outlook: "Elevated transit latency (+10 to 14 days) expected to persist through Q4."
  },
  {
    severity: "medium",
    riskType: "Regulatory & Tariffs",
    title: "European CBAM Carbon Declaration Thresholds",
    affectedCountries: [{ name: "Germany", flag: "🇩🇪" }, { name: "India", flag: "🇮🇳" }, { name: "China", flag: "🇨🇳" }],
    summary: "Exporters of aluminium and steel billets must submit verified embedded carbon accounting certificates.",
    outlook: "Compliance friction manageable through ISO-certified green smelter audits."
  },
  {
    severity: "low",
    riskType: "Foreign Exchange & Currency",
    title: "Emerging Market FX Volatility & Central Bank Swap Buffers",
    affectedCountries: [{ name: "India", flag: "🇮🇳" }, { name: "Singapore", flag: "🇸🇬" }, { name: "Japan", flag: "🇯🇵" }],
    summary: "Bilateral currency swap lines and digital local currency settlement systems shield trade lanes from USD spikes.",
    outlook: "Stable reserve coverage buffers across Asian central banks."
  }
];

const GLOBAL_TRENDING_TOPICS = [
  { rank: 1, topic: "Semiconductor Supply Chain Reshoring", count: "14.2k stories", countries: "🇺🇸 🇮🇳 🇯🇵 🇹🇼", trend: "+32%" },
  { rank: 2, topic: "India-UAE CEPA Non-Oil Corridors", count: "9.8k stories", countries: "🇮🇳 🇦🇪 🇸🇦", trend: "+28%" },
  { rank: 3, topic: "Global Carbon Border Tariffs (CBAM)", count: "8.4k stories", countries: "🇩🇪 🇪🇺 🇮🇳 🇨🇳", trend: "+21%" },
  { rank: 4, topic: "USMCA Cross-Border Nearshoring", count: "7.9k stories", countries: "🇺🇸 🇲🇽 🇨🇦", trend: "+18%" },
  { rank: 5, topic: "Green Hydrogen Marine Corridors", count: "6.5k stories", countries: "🇩🇪 🇮🇳 🇦🇪 🇦🇺", trend: "+25%" }
];

const COUNTRY_EVENTS_DATA: CountryEvent[] = [
  { id: "ev-1", title: "Dubai Global Trade & Investment Congress 2026", type: "World Summit", date: "Oct 15-18, 2026", location: "Dubai World Trade Centre, UAE", industry: "Global Commerce & Freezones", isFeatured: true },
  { id: "ev-2", title: "Semicon India International Expo & B2B Matchmaking", type: "Trade Fair", date: "Nov 12-14, 2026", location: "BIEC, Bengaluru, India", industry: "Semiconductors & OSAT", isFeatured: false },
  { id: "ev-3", title: "European Clean Energy & Marine Logistics Forum", type: "Executive Summit", date: "Dec 03-05, 2026", location: "Congress Center Hamburg, Germany", industry: "Renewables & Shipping", isFeatured: false },
  { id: "ev-4", title: "North American Cross-Border Nearshoring Expo", type: "Trade Fair", date: "Jan 20-22, 2027", location: "Cintermex, Monterrey, Mexico", industry: "Automotive & Manufacturing", isFeatured: false }
];

const PREMIUM_REPORTS_DATA: PremiumReport[] = [
  { id: "rep-1", title: "2026 India-UAE Bilateral CEPA Trade & Tariff Phase-Out Dossier", code: "REP-BILA-IN-UAE", type: "Bilateral Intelligence", pages: "84 pages", price: "$249", rating: "4.9 ★", description: "Item-level HS code tariff reductions, customs bonded depot layouts, and gold/petrochemical corridors." },
  { id: "rep-2", title: "Global Semiconductor OSAT & Substrate Reshoring Playbook", code: "REP-SEMI-GLOB-2026", type: "Supply Chain", pages: "112 pages", price: "$349", rating: "4.9 ★", description: "Comprehensive audit of state capex subsidies across India, Japan, Vietnam, and North America." },
  { id: "rep-3", title: "European CBAM Regulatory Compliance & Metal Exporter Manual", code: "REP-CBAM-EU-2026", type: "Trade & Tariffs", pages: "68 pages", price: "$199", rating: "4.8 ★", description: "Step-by-step carbon accounting guides, verification bodies, and border duty exemption pathways." }
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function NewsPOCAllCountryView({ onBack }: { onBack?: () => void }) {
  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [selectedMarketType, setSelectedMarketType] = useState<string>("All");
  const [selectedNewsTag, setSelectedNewsTag] = useState<string>("All");
  const [directoryViewMode, setDirectoryViewMode] = useState<"grid" | "list">("grid");

  // News Feed Tabs & Categories
  const [newsFeedTab, setNewsFeedTab] = useState<"Latest" | "Trending" | "Most Read" | "Breaking">("Latest");
  const [newsFeedCategory, setNewsFeedCategory] = useState<string>("All");

  // Bilateral Selector
  const [matrixCountryA, setMatrixCountryA] = useState("India");
  const [matrixCountryB, setMatrixCountryB] = useState("UAE");

  // Interactive Modals
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [proSuccess, setProSuccess] = useState(false);
  const [aiUnlocked, setAiUnlocked] = useState(false);
  const [selectedArticleModal, setSelectedArticleModal] = useState<NewsArticle | null>(null);

  // Newsletter form
  const [newsletterCadence, setNewsletterCadence] = useState<"daily" | "weekly">("daily");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Filter directory
  const filteredCountries = COUNTRIES_195_DIRECTORY.filter((c) => {
    const matchesSearch =
      searchQuery === "" ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.latestHeadline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = selectedRegion === "All" || c.region === selectedRegion;
    const matchesMarket = selectedMarketType === "All" || c.marketType === selectedMarketType;
    const matchesTag = selectedNewsTag === "All" || c.newsTag === selectedNewsTag;

    return matchesSearch && matchesRegion && matchesMarket && matchesTag;
  });

  // Filter News
  const filteredNewsArticles = LATEST_NEWS_DATA.filter((art) => {
    if (newsFeedCategory === "All") return true;
    return art.category.toLowerCase() === newsFeedCategory.toLowerCase();
  });

  // Active matrix profile
  const matrixLookupKey = `${matrixCountryA}-${matrixCountryB}`;
  const activeMatrix =
    BILATERAL_CORRIDOR_DATABASE[matrixLookupKey] ||
    BILATERAL_CORRIDOR_DATABASE["India-UAE"];

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-20">
      
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. GLOBAL COUNTRY NEWS HERO */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0c1020] via-[#0d132b] to-[#05070e] text-white relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="space-y-6 max-w-4xl">
            
            {/* Breadcrumb / Category Tag */}
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all mr-1 cursor-pointer"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <span className="text-[10px] font-bold bg-blue-600 px-3 py-1 rounded-full uppercase tracking-wider text-white flex items-center gap-1.5 shadow-xs">
                <Globe className="h-3 w-3" /> Country News · 195 Bilateral
              </span>
              <span className="text-xs text-slate-400 font-medium">Global Country Intelligence</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Country News & Bilateral Intelligence
              </h1>
              <p className="text-slate-300 text-sm md:text-base font-normal max-w-2xl leading-relaxed">
                Global news, business developments, and economic intelligence from 195 sovereign countries and their bilateral trade relationships.
              </p>
            </div>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15 shadow-2xl max-w-3xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search country, news, market, company or trade corridor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/10 dark:bg-gray-900/80 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-xs md:text-sm text-white placeholder-slate-400 outline-none focus:border-blue-400 transition-all font-medium"
                />
              </div>
            </div>

            {/* Quick Filters & CTAs */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap gap-2">
                <a
                  href="#directory-section"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Compass className="h-4 w-4" /> Explore 195 Countries
                </a>
                <a
                  href="#bilateral-matrix-section"
                  className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Scale className="h-4 w-4 text-blue-400" /> Bilateral Corridor Matrix
                </a>
              </div>

              {/* Supporting Indicators */}
              <div className="flex items-center gap-4 text-xs text-slate-300 font-semibold">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> 195 Countries</span>
                <span className="flex items-center gap-1.5"><Activity className="h-4 w-4 text-blue-400" /> Live News Stream</span>
                <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-purple-400" /> Bilateral Intelligence</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. BREAKING COUNTRY NEWS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-red-500/5 dark:bg-red-950/10 border-b border-red-200/40 dark:border-red-900/30 py-4">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
            </span>
            <h2 className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1">
              Breaking Country News
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {BREAKING_NEWS_DATA.map((story) => (
              <div
                key={story.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 shadow-2xs hover:border-red-500/50 transition-all flex flex-col justify-between group"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold flex items-center gap-1 text-gray-900 dark:text-white">
                      <span>{story.flag}</span> {story.country}
                    </span>
                    <span className="text-gray-400 font-mono">{story.time}</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {story.headline}
                  </h3>
                  <p className="text-[10.5px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {story.summary}
                  </p>
                </div>

                <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[9px] font-bold">
                  <span className="bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded border border-red-200/30">
                    {story.impactTag}
                  </span>
                  <button
                    onClick={() => {
                      const found = LATEST_NEWS_DATA.find(n => n.country === story.country) || LATEST_NEWS_DATA[0];
                      setSelectedArticleModal(found);
                    }}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-0.5 cursor-pointer"
                  >
                    Read Story →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* MAIN CONTAINER */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6 space-y-14">

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 3. LATEST COUNTRY NEWS (PRIMARY EDITORIAL FEED) */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
            <div>
              <h2 className="font-display text-lg md:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" /> Latest Country News
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Real-time reporting across trade accords, macroeconomic policy, technology, and industry capex.
              </p>
            </div>

            {/* Feed Tabs */}
            <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
              {(["Latest", "Trending", "Most Read", "Breaking"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setNewsFeedTab(tab)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    newsFeedTab === tab
                      ? "bg-white dark:bg-[#0f172a] text-blue-600 shadow-xs"
                      : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {["All", "Economy", "Business", "Trade", "Investment", "Government", "Technology", "Manufacturing", "Energy", "Infrastructure"].map((cat) => (
              <button
                key={cat}
                onClick={() => setNewsFeedCategory(cat)}
                className={`px-3.5 py-1.5 font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  newsFeedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Editorial Grid: 1 Main Story + Supporting Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Featured Hero Story */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs hover:border-blue-500 transition-all group flex flex-col justify-between">
              <div>
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-900">
                  <img
                    src={filteredNewsArticles[0]?.image || LATEST_NEWS_DATA[0].image}
                    alt="Featured Country News"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-blue-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md">
                      Featured Story
                    </span>
                    <span className="bg-black/70 backdrop-blur-md text-white font-bold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span>{filteredNewsArticles[0]?.flag || LATEST_NEWS_DATA[0].flag}</span> {filteredNewsArticles[0]?.country || LATEST_NEWS_DATA[0].country}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">{filteredNewsArticles[0]?.category}</span>
                    <span>•</span>
                    <span>{filteredNewsArticles[0]?.source}</span>
                    <span>•</span>
                    <span>{filteredNewsArticles[0]?.time}</span>
                  </div>

                  <h3 className="font-display text-lg md:text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                    {filteredNewsArticles[0]?.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                    {filteredNewsArticles[0]?.summary}
                  </p>

                  {/* Why It Matters Callout */}
                  <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-xl space-y-1">
                    <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                      Why It Matters to Business
                    </span>
                    <p className="text-xs text-gray-700 dark:text-slate-300 font-medium leading-relaxed">
                      {filteredNewsArticles[0]?.whyItMatters}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-4 text-gray-400">
                  <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {filteredNewsArticles[0]?.views} views</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3.5 w-3.5" /> {filteredNewsArticles[0]?.likes}</span>
                </div>

                <button
                  onClick={() => setSelectedArticleModal(filteredNewsArticles[0] || LATEST_NEWS_DATA[0])}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                >
                  Read Full Briefing →
                </button>
              </div>
            </div>

            {/* Supporting News Stream */}
            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              {filteredNewsArticles.slice(1, 4).map((art) => (
                <div
                  key={art.id}
                  className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs hover:border-blue-500 transition-all flex gap-4 group cursor-pointer"
                  onClick={() => setSelectedArticleModal(art)}
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0"
                  />
                  <div className="space-y-1.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400 font-semibold">
                        <span className="flex items-center gap-1 font-bold text-gray-900 dark:text-white">
                          <span>{art.flag}</span> {art.country}
                        </span>
                        <span>•</span>
                        <span className="text-blue-600 font-bold">{art.category}</span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 mt-1 group-hover:text-blue-600 transition-colors">
                        {art.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium pt-1">
                      <span>{art.time} · {art.readTime}</span>
                      <span className="text-blue-600 font-bold hover:underline">Read →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 4. TRENDING COUNTRY STORIES */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-500 fill-amber-500" /> Trending Around the World
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Fastest-growing global story velocity</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {TRENDING_STORIES_DATA.map((tr) => (
              <div
                key={tr.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-2xs hover:border-amber-500/50 transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1">
                      <span>{tr.countryA.flag}</span>
                      {tr.countryB && <span>↔ {tr.countryB.flag}</span>}
                    </span>
                    <span className="text-amber-500 font-bold font-mono">{tr.trend}</span>
                  </div>

                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug line-clamp-3">
                    {tr.title}
                  </h4>
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                  <span>{tr.newsCount} articles</span>
                  <span className="text-blue-600 font-bold">{tr.engagement}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 5. 195 COUNTRIES DIRECTORY (NEWS DISCOVERY DIRECTORY) */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section id="directory-section" className="space-y-6">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-5">
            
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
              <div>
                <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Globe className="h-5 w-5 text-blue-600" /> 195 Countries Directory
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Explore country news, macroeconomic velocity, and bilateral intelligence across all 195 sovereign markets.
                </p>
              </div>

              {/* Layout Toggle */}
              <div className="flex items-center gap-3">
                <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg p-0.5">
                  <button
                    onClick={() => setDirectoryViewMode("grid")}
                    className={`p-1.5 rounded-md transition-all cursor-pointer ${
                      directoryViewMode === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDirectoryViewMode("list")}
                    className={`p-1.5 rounded-md transition-all cursor-pointer ${
                      directoryViewMode === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Multi-Dimensional Filter Bars */}
            <div className="space-y-3">
              
              {/* Region Filter */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-gray-400 font-bold uppercase text-[9px] w-20">Region:</span>
                {["All", "Asia", "Europe", "Middle East", "North America", "South America", "Africa", "Oceania"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setSelectedRegion(r)}
                    className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                      selectedRegion === r
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-500"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              {/* Market Type & News Filter */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-1 border-t border-gray-100 dark:border-gray-800/60">
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold uppercase text-[9px]">Market Type:</span>
                  {["All", "Developed", "Emerging", "Frontier"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setSelectedMarketType(m)}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                        selectedMarketType === m
                          ? "bg-emerald-600 text-white"
                          : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-gray-400 font-bold uppercase text-[9px]">News Activity:</span>
                  {["All", "Trending", "Breaking", "Most Covered"].map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelectedNewsTag(t)}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                        selectedNewsTag === t
                          ? "bg-purple-600 text-white"
                          : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Country Cards View */}
            {filteredCountries.length === 0 ? (
              <div className="p-12 text-center bg-gray-50 dark:bg-gray-900/50 rounded-xl space-y-3">
                <FolderMinus className="h-10 w-10 text-gray-400 mx-auto" />
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">No Countries Match Filters</h4>
                <p className="text-[10px] text-gray-500">Clear search or choose another region/market filter.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedRegion("All");
                    setSelectedMarketType("All");
                    setSelectedNewsTag("All");
                  }}
                  className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : directoryViewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredCountries.map((c) => (
                  <div
                    key={c.code}
                    className="bg-gray-50/50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-4.5 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{c.flag}</span>
                          <div>
                            <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                              {c.name}
                            </h3>
                            <span className="text-[10px] text-gray-400">{c.capital} · {c.region}</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/20">
                          {c.newsCount}+ News
                        </span>
                      </div>

                      {/* Latest Headline Snippet */}
                      <p className="text-[11px] text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed italic bg-white dark:bg-[#0f172a] p-2.5 rounded-xl border border-gray-150 dark:border-gray-800/80">
                        "{c.latestHeadline}"
                      </p>

                      {/* Economic Snapshot */}
                      <div className="grid grid-cols-2 gap-2 text-[10px] pt-1">
                        <div>
                          <span className="text-gray-400 block">GDP:</span>
                          <span className="font-mono font-bold text-gray-900 dark:text-white">{c.gdp}</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block">Growth:</span>
                          <span className="text-emerald-500 font-bold font-mono">{c.growth}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-[10px] font-bold">
                      <span className="text-emerald-500 font-mono">Trending: {c.trendChange}</span>
                      <Link
                        href={`/en/news-poc/country-news/my`}
                        className="text-blue-600 hover:underline flex items-center gap-0.5"
                      >
                        View Country News →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-100/50 dark:bg-gray-900 text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800 text-[10px]">
                      <th className="p-3">COUNTRY</th>
                      <th className="p-3">REGION</th>
                      <th className="p-3">MARKET</th>
                      <th className="p-3">LATEST NEWS COVERAGE</th>
                      <th className="p-3">GDP</th>
                      <th className="p-3">GROWTH</th>
                      <th className="p-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {filteredCountries.map((c) => (
                      <tr key={c.code} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                        <td className="p-3 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          <span className="text-xl">{c.flag}</span> {c.name}
                        </td>
                        <td className="p-3 text-gray-500">{c.region}</td>
                        <td className="p-3">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                            {c.marketType}
                          </span>
                        </td>
                        <td className="p-3 text-gray-600 dark:text-gray-300 max-w-xs truncate">
                          {c.latestHeadline}
                        </td>
                        <td className="p-3 font-mono font-bold text-gray-900 dark:text-white">{c.gdp}</td>
                        <td className="p-3 text-emerald-500 font-bold">{c.growth}</td>
                        <td className="p-3 text-right">
                          <Link href="/en/news-poc/country-news/my" className="text-blue-600 font-bold hover:underline">
                            Explore →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 6. FEATURED COUNTRY SPOTLIGHT */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-xl border border-blue-800/40">
          <div className="absolute top-0 right-0 p-4">
            <span className="text-[9px] font-mono font-bold bg-amber-400 text-gray-950 px-2.5 py-1 rounded uppercase tracking-widest shadow-xs">
              Country Spotlight
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-5xl">🇦🇪</span>
                <div>
                  <span className="text-xs text-blue-300 font-bold uppercase tracking-wider">Spotlight Feature</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">United Arab Emirates</h3>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-bold text-blue-200">Why UAE is Trending This Week:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Logistics investments cross $12B mark with CEPA corridors.</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Sovereign AI datacenter liquid cooling capex accelerated.</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Port customs latency reduced to under 90 minutes.</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>Non-oil foreign trade targets achieved ahead of schedule.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <Link
                  href="/en/news-poc/country-news/my"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  Explore UAE Intelligence <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3">
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest block">
                Economic Velocity KPI
              </span>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-black/20 p-3 rounded-xl">
                  <span className="text-[9px] text-slate-400 uppercase font-bold">GDP</span>
                  <div className="text-lg font-extrabold text-white">$507B</div>
                </div>
                <div className="bg-black/20 p-3 rounded-xl">
                  <span className="text-[9px] text-slate-400 uppercase font-bold">Growth</span>
                  <div className="text-lg font-extrabold text-emerald-400">+4.2%</div>
                </div>
                <div className="bg-black/20 p-3 rounded-xl">
                  <span className="text-[9px] text-slate-400 uppercase font-bold">Non-Oil Trade</span>
                  <div className="text-lg font-extrabold text-blue-300">$635B</div>
                </div>
                <div className="bg-black/20 p-3 rounded-xl">
                  <span className="text-[9px] text-slate-400 uppercase font-bold">FDI Inflow</span>
                  <div className="text-lg font-extrabold text-purple-300">$22.7B</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 7. COUNTRY NEWS BY REGION */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Compass className="h-4 w-4 text-blue-600" /> Explore News by Region
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">6 Continental & Economic Zones</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REGIONAL_NEWS_DATA.map((reg, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-blue-500 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">{reg.region}</h3>
                    <span className="text-[9px] font-bold text-emerald-500 font-mono">{reg.trendingScore}</span>
                  </div>

                  {/* Flag Hubs */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {reg.countries.map((c, i) => (
                      <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded flex items-center gap-1 text-gray-700 dark:text-gray-300">
                        <span>{c.flag}</span> {c.name}
                      </span>
                    ))}
                  </div>

                  {/* Top Story */}
                  <div className="bg-gray-50 dark:bg-gray-900/60 p-3 rounded-xl border border-gray-150 dark:border-gray-800/80 space-y-1">
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block">
                      Lead Regional Story
                    </span>
                    <p className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2">
                      {reg.topStory.title}
                    </p>
                    <span className="text-[10px] text-gray-400">{reg.topStory.flag} {reg.topStory.country} · {reg.topStory.time}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold">
                  <span className="text-gray-400 text-[10px]">{reg.newsCount} Live Stories</span>
                  <button
                    onClick={() => {
                      setSelectedRegion(reg.region.split(" ")[0]);
                      document.getElementById("directory-section")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-blue-600 hover:underline cursor-pointer"
                  >
                    Explore Region →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 8. COUNTRY NEWS BY INDUSTRY */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Building className="h-4 w-4 text-purple-600" /> Country News by Industry
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Sectoral intelligence across borders</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INDUSTRY_NEWS_DATA.map((ind, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{ind.icon}</span>
                    <h3 className="font-bold text-sm text-gray-900 dark:text-white">{ind.industry}</h3>
                  </div>
                  <Link href="/en/news-poc/industry-news" className="text-[10px] font-bold text-blue-600 hover:underline">
                    View Industry News →
                  </Link>
                </div>

                <div className="space-y-2.5">
                  {ind.stories.map((st, sIdx) => (
                    <div key={sIdx} className="flex items-start gap-2.5 text-xs">
                      <span className="text-lg shrink-0 mt-0.5">{st.flag}</span>
                      <div className="space-y-0.5">
                        <p className="font-bold text-gray-900 dark:text-white leading-snug">
                          {st.headline}
                        </p>
                        <span className="text-[10px] text-gray-400 font-medium">{st.country} · {st.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 9. BILATERAL NEWS */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div>
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-600" /> Bilateral News
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Key developments happening between strategic country pairs.</p>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold">Corridor Tracking</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BILATERAL_NEWS_ITEMS.slice(0, 3).map((bil) => (
              <div
                key={bil.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-blue-500 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                      <span>{bil.flagA} {bil.countryA}</span>
                      <span>↔</span>
                      <span>{bil.flagB} {bil.countryB}</span>
                    </span>
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                      {bil.agreement}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                    {bil.title}
                  </h3>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                    {bil.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold">
                  <span className="font-mono text-gray-900 dark:text-white">{bil.tradeValue}</span>
                  <a
                    href="#bilateral-matrix-section"
                    onClick={() => {
                      setMatrixCountryA(bil.countryA === "United Arab Emirates" ? "UAE" : bil.countryA);
                      setMatrixCountryB(bil.countryB === "United Arab Emirates" ? "UAE" : bil.countryB);
                    }}
                    className="text-blue-600 hover:underline flex items-center gap-0.5 cursor-pointer text-[10px]"
                  >
                    Analyze Corridor →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 10. BILATERAL CORRIDOR MATRIX & OPPORTUNITY SCORE */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section id="bilateral-matrix-section" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Scale className="h-5 w-5 text-blue-600" /> Bilateral Corridor Matrix
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Analyze trade volumes, tariff accords, opportunity scores, and latest news between any two sovereign nations.
              </p>
            </div>

            {/* Country Selector Dropdowns */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Country A:</span>
                <select
                  value={matrixCountryA}
                  onChange={(e) => setMatrixCountryA(e.target.value)}
                  className="text-xs font-bold bg-transparent outline-none cursor-pointer"
                >
                  <option value="India">🇮🇳 India</option>
                  <option value="USA">🇺🇸 United States</option>
                  <option value="Germany">🇩🇪 Germany</option>
                  <option value="UAE">🇦🇪 UAE</option>
                </select>
              </div>

              <span className="text-gray-400 font-bold">↔</span>

              <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 p-2 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Country B:</span>
                <select
                  value={matrixCountryB}
                  onChange={(e) => setMatrixCountryB(e.target.value)}
                  className="text-xs font-bold bg-transparent outline-none cursor-pointer"
                >
                  <option value="UAE">🇦🇪 UAE</option>
                  <option value="USA">🇺🇸 United States</option>
                  <option value="Germany">🇩🇪 Germany</option>
                  <option value="Mexico">🇲🇽 Mexico</option>
                  <option value="China">🇨🇳 China</option>
                </select>
              </div>
            </div>
          </div>

          {/* Corridor Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200/60 dark:border-gray-800 text-center">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Bilateral Volume</span>
              <div className="text-lg font-extrabold text-blue-600 mt-1">{activeMatrix.tradeVolume}</div>
              <span className="text-[10px] text-emerald-500 font-bold">{activeMatrix.growth}</span>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200/60 dark:border-gray-800 text-center">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Exports {activeMatrix.countryA} →</span>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white mt-1">{activeMatrix.exportsA}</div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200/60 dark:border-gray-800 text-center">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Imports from {activeMatrix.countryB}</span>
              <div className="text-lg font-extrabold text-gray-900 dark:text-white mt-1">{activeMatrix.importsA}</div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200/60 dark:border-gray-800 text-center">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Bilateral Accord</span>
              <div className="text-xs font-bold text-purple-600 mt-1 line-clamp-1">{activeMatrix.agreement}</div>
              <span className="text-[9px] text-emerald-500 font-bold">Active Status</span>
            </div>

            {/* Opportunity Score Gauge */}
            <div className="p-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl text-center shadow-md">
              <span className="text-[9px] font-bold text-blue-100 uppercase tracking-widest block">Opportunity Score</span>
              <div className="text-2xl font-black mt-0.5">{activeMatrix.opportunityScore} <span className="text-sm font-normal text-blue-200">/ 100</span></div>
              <span className="text-[9px] text-blue-100 font-bold">High Potential</span>
            </div>
          </div>

          {/* Opportunity Breakdown & Corridor News */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            
            {/* Score Breakdown */}
            <div className="lg:col-span-6 space-y-3 bg-gray-50/70 dark:bg-gray-900/40 p-5 rounded-2xl border border-gray-200 dark:border-gray-800">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Corridor Factor Breakdown
              </h3>
              
              <div className="space-y-2 text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Trade Momentum</span>
                    <span className="text-blue-600">{activeMatrix.breakdown.momentum}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${activeMatrix.breakdown.momentum}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Market Demand</span>
                    <span className="text-emerald-500">{activeMatrix.breakdown.demand}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${activeMatrix.breakdown.demand}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Investment Inflow Potential</span>
                    <span className="text-purple-600">{activeMatrix.breakdown.investment}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${activeMatrix.breakdown.investment}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span>Logistics Speed & Efficiency</span>
                    <span className="text-amber-500">{activeMatrix.breakdown.logistics}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${activeMatrix.breakdown.logistics}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Corridor News & Action */}
            <div className="lg:col-span-6 space-y-4 flex flex-col justify-between bg-blue-50/40 dark:bg-blue-950/10 p-5 rounded-2xl border border-blue-200/50 dark:border-blue-900/40">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    Latest Corridor Intelligence
                  </span>
                  <span className="text-[10px] text-gray-400 font-mono">{activeMatrix.newsTime}</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                  {activeMatrix.latestNews}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  Real-time customs latency validation and bilateral trade facilitation guidelines are updated automatically under the {activeMatrix.agreement}.
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-blue-200/30">
                <span className="text-[10px] font-bold text-gray-400">Risk Assessment: <span className="text-emerald-500">{activeMatrix.breakdown.risk} Risk</span></span>
                <button
                  onClick={() => setIsProModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5" /> Unlock Full Corridor Intelligence
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 11. WHAT THE NEWS MEANS (iGEN DIFFERENTIATOR) */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-600" /> What the News Means (iGEN Intelligence Breakdown)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Connecting daily geopolitical and trade headlines to direct business, supply chain, and revenue impacts.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {WHAT_NEWS_MEANS_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {item.countries.map((c, i) => (
                      <span key={i} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded font-bold">
                        {c}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                    {item.storyTitle}
                  </h3>

                  <div className="space-y-2 text-xs">
                    <div className="bg-gray-50 dark:bg-gray-900/60 p-3 rounded-xl">
                      <span className="font-bold text-gray-400 uppercase text-[9px] block">1. What Happened?</span>
                      <p className="text-gray-700 dark:text-gray-300 mt-0.5">{item.whatHappened}</p>
                    </div>

                    <div className="bg-blue-50/50 dark:bg-blue-950/20 p-3 rounded-xl border border-blue-100 dark:border-blue-900/40">
                      <span className="font-bold text-blue-600 dark:text-blue-400 uppercase text-[9px] block">2. Why It Matters?</span>
                      <p className="text-gray-800 dark:text-slate-200 font-semibold mt-0.5">{item.whyItMatters}</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-900/60 p-3 rounded-xl">
                      <span className="font-bold text-gray-400 uppercase text-[9px] block">3. Who Is Affected?</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.whoIsAffected.industries.map((ind, i) => (
                          <span key={i} className="text-[10px] bg-white dark:bg-gray-800 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700 font-bold">
                            {ind}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-purple-50/50 dark:bg-purple-950/20 p-3 rounded-xl border border-purple-100 dark:border-purple-900/40">
                      <span className="font-bold text-purple-600 dark:text-purple-400 uppercase text-[9px] block">4. What Could Happen Next?</span>
                      <p className="text-gray-800 dark:text-slate-200 mt-0.5">{item.whatCouldHappenNext}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                  <button
                    onClick={() => setIsProModalOpen(true)}
                    className="text-blue-600 hover:text-blue-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    View Deep Intelligence Dossier →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 12. GLOBAL TRADE INTELLIGENCE */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
            <div>
              <h2 className="font-display text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-blue-600" /> Global Trade Intelligence
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Macroeconomic trade flow volumes and top bilateral partner nodes.</p>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold font-mono">Global Coverage</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Total Global Trade</span>
              <div className="text-xl font-black text-blue-600 mt-1">$34.2 Trillion</div>
              <span className="text-[10px] text-emerald-500 font-bold">+4.1% Annualized</span>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Fastest Trade Region</span>
              <div className="text-xl font-black text-purple-600 mt-1">APAC / GCC</div>
              <span className="text-[10px] text-emerald-500 font-bold">+18.4% CEPA Lanes</span>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Global FDI Inflows</span>
              <div className="text-xl font-black text-emerald-600 mt-1">$1.82 Trillion</div>
              <span className="text-[10px] text-gray-400">High Capex Run-Rate</span>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Active Trade Treaties</span>
              <div className="text-xl font-black text-amber-500 mt-1">420+ Accords</div>
              <span className="text-[10px] text-blue-600 font-bold">195 Sovereign Pairs</span>
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 13 & 14. EXPORT & IMPORT OPPORTUNITIES */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* 13. Export Opportunities */}
          <section className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
              <div>
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" /> Global Export Opportunities
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">High-demand product categories across strategic trade corridors.</p>
              </div>
            </div>

            <div className="space-y-3">
              {EXPORT_OPPORTUNITIES_DATA.map((opp, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4.5 shadow-2xs hover:border-emerald-500 transition-all flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{opp.icon}</span>
                        <h3 className="font-bold text-xs text-gray-900 dark:text-white">{opp.sector}</h3>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 block">
                        {opp.corridor}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-emerald-500">{opp.growth}</span>
                      <span className="text-[9px] text-gray-400 block">Score: {opp.score}/100</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    {opp.description}
                  </p>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                    <button
                      onClick={() => setIsProModalOpen(true)}
                      className="text-[10px] font-bold text-emerald-600 hover:underline cursor-pointer"
                    >
                      Explore Opportunity & Buyer Leads →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 14. Import Opportunities */}
          <section className="space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
              <div>
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-blue-600" /> Global Import Opportunities
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">Critical supply shortfalls and supplier diversification sourcing nodes.</p>
              </div>
            </div>

            <div className="space-y-3">
              {IMPORT_OPPORTUNITIES_DATA.map((imp, idx) => (
                <div
                  key={idx}
                  className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4.5 shadow-2xs hover:border-blue-500 transition-all flex flex-col justify-between space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-xs text-gray-900 dark:text-white">{imp.commodity}</h3>
                      <span className="text-[11px] text-gray-500 font-medium">
                        Demand Market: {imp.demandFlag} {imp.demandMarket}
                      </span>
                    </div>
                    <span className="text-xs font-black text-blue-600 font-mono">{imp.demandGrowth}</span>
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    {imp.description}
                  </p>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-gray-400 font-semibold">Suppliers:</span>
                      {imp.supplierMarkets.map((sm, i) => (
                        <span key={i} className="font-bold text-gray-700 dark:text-gray-300">
                          {sm.flag} {sm.name}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => setIsProModalOpen(true)}
                      className="font-bold text-blue-600 hover:underline cursor-pointer"
                    >
                      Source Suppliers →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 15. FASTEST-GROWING MARKETS */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <div>
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-emerald-500" /> Fastest-Growing Markets (2026 Intelligence Ranking)
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Top sovereign economies sorted by GDP velocity, FDI expansion, and opportunity rating.</p>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold">Rankings</span>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-x-auto shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800 text-[10px]">
                  <th className="p-3.5">RANK</th>
                  <th className="p-3.5">COUNTRY</th>
                  <th className="p-3.5">ANNUAL GDP GROWTH</th>
                  <th className="p-3.5">OPPORTUNITY SCORE</th>
                  <th className="p-3.5">PRIMARY CATALYST / DRIVER</th>
                  <th className="p-3.5">ANNUAL FDI INFLOW</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
                {FAST_MARKET_RANKINGS.map((mk) => (
                  <tr key={mk.rank} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-gray-400">#{mk.rank}</td>
                    <td className="p-3.5 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <span className="text-xl">{mk.flag}</span> {mk.country}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-500 font-mono">{mk.growth}</td>
                    <td className="p-3.5">
                      <span className="font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200/20 font-mono">
                        {mk.opportunityScore} / 100
                      </span>
                    </td>
                    <td className="p-3.5 text-gray-600 dark:text-gray-300">{mk.keyDriver}</td>
                    <td className="p-3.5 font-mono font-bold text-gray-900 dark:text-white">{mk.fdiInflow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 16. INVESTMENT OPPORTUNITIES & FDI */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <div>
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-emerald-600" /> Global Investment & FDI Destinations
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Government capital incentives, special economic zones, and infrastructure projects.</p>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold">FDI Intelligence</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INVESTMENT_DESTINATIONS_DATA.map((inv, idx) => (
              <div
                key={idx}
                className={`bg-white dark:bg-[#0f172a] border rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-3 relative ${
                  inv.isSponsored
                    ? "border-amber-400/60 bg-amber-50/10 dark:bg-amber-950/5"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                {inv.isSponsored && (
                  <span className="absolute top-3 right-3 text-[8px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded uppercase tracking-wider">
                    Sponsored Opportunity
                  </span>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{inv.flag}</span>
                    <div>
                      <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-tight">{inv.title}</h3>
                      <span className="text-[10px] text-gray-400">{inv.country} · {inv.sector}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    {inv.description}
                  </p>

                  <div className="bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl text-[10px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Incentive:</span>
                      <span className="font-bold text-emerald-500">{inv.incentive}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">CAGR Growth:</span>
                      <span className="font-mono font-bold text-blue-600">{inv.growthForecast}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                  <Link href="/en/eoi" className="text-xs font-bold text-blue-600 hover:underline">
                    Explore Opportunity →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 17. TRADE AGREEMENTS INDEX */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600" /> Trade Agreements & Treaties Index
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Free Trade Agreements (FTA), CEPAs, and bilateral investment frameworks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRADE_AGREEMENTS_DATA.map((agr, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4.5 shadow-2xs space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-gray-900 dark:text-white">{agr.corridor}</span>
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">
                      {agr.status}
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-blue-600">{agr.name} ({agr.acronym})</h3>

                  <p className="text-[10.5px] text-gray-500 leading-relaxed">
                    {agr.latestUpdate}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-[10px]">
                  <span className="text-gray-400">Impact: <span className="font-bold text-gray-900 dark:text-white">{agr.tradeImpact}</span></span>
                  <Link href="/en/eoi" className="text-blue-600 font-bold hover:underline">
                    View Accord →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 18. COUNTRY RISK MONITOR */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <div>
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <ShieldAlert className="h-4 w-4 text-red-500" /> Country Risk & Logistics Watch Areas
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Real-time alerts covering maritime transit, carbon border regulations, and currency volatility.</p>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold font-mono">Active Alerts</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RISK_MONITOR_DATA.map((risk, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{risk.riskType}</span>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase ${
                      risk.severity === "high"
                        ? "bg-red-500 text-white"
                        : "bg-amber-500 text-white"
                    }`}>
                      {risk.severity} Risk
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{risk.title}</h3>

                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                    <span>Affected:</span>
                    {risk.affectedCountries.map((c, i) => (
                      <span key={i} className="font-bold text-gray-900 dark:text-white">
                        {c.flag} {c.name}
                      </span>
                    ))}
                  </div>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    {risk.summary}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-400 italic">
                  Outlook: {risk.outlook}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 19 & 20. GLOBAL TRENDING TOPICS & COUNTRY EVENTS */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* 19. Global Trending Topics */}
          <section className="lg:col-span-6 space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Flame className="h-4 w-4 text-blue-600" /> What's Trending Globally?
              </h2>
            </div>

            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-3">
              {GLOBAL_TRENDING_TOPICS.map((tp) => (
                <div
                  key={tp.rank}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                  onClick={() => setSearchQuery(tp.topic.split(" ")[0])}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-gray-400 text-sm">#{tp.rank}</span>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{tp.topic}</h4>
                      <span className="text-[10px] text-gray-400">{tp.count} · Countries: {tp.countries}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-500 font-mono">{tp.trend}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 20. Country Events */}
          <section className="lg:col-span-6 space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="h-4 w-4 text-purple-600" /> Global Business Summits & Expos
              </h2>
              <Link href="/en/profile/events" className="text-[10px] font-bold text-blue-600 hover:underline">
                View All Events →
              </Link>
            </div>

            <div className="space-y-3">
              {COUNTRY_EVENTS_DATA.map((ev) => (
                <div
                  key={ev.id}
                  className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs flex items-center justify-between hover:border-purple-500 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-600">
                        {ev.type}
                      </span>
                      <span className="text-[10px] text-gray-400 font-medium">{ev.industry}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{ev.title}</h4>
                    <p className="text-[10px] text-gray-500">{ev.date} · {ev.location}</p>
                  </div>

                  <Link
                    href="/en/profile/events"
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-purple-600 hover:text-white text-gray-700 dark:text-gray-300 font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shrink-0 ml-2"
                  >
                    Register
                  </Link>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 21. AI GLOBAL COUNTRY INTELLIGENCE */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600 fill-purple-600 animate-pulse" /> AI Global Country Intelligence
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Understand what is happening globally and what could happen next across trade, macro, and supply chains.
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-600 px-3 py-1 rounded-full border border-purple-200/20">
              95.4% AI Confidence
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 rounded-2xl border border-purple-200/30 space-y-1">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block">Executive AI Outlook</span>
                <p className="text-xs text-gray-800 dark:text-slate-200 italic font-semibold leading-relaxed">
                  "Vietnam and India continue to capture expanding electronics and clean energy capex inflows, while European exporters navigate early stage CBAM reporting adjustments with minimal short-term friction."
                </p>
              </div>

              {/* Locked dynamic preview */}
              <div className="space-y-2 relative text-xs">
                {!aiUnlocked ? (
                  <>
                    <div className="p-3.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center opacity-60">
                      <span>1. Bilateral tariff phase-out schedule simulator for 195 pairs</span>
                      <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Locked Pro</span>
                    </div>
                    <div className="p-3.5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center opacity-60">
                      <span>2. Predictive Red Sea freight surcharge and latency tracker</span>
                      <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1"><Lock className="h-3.5 w-3.5" /> Locked Pro</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0f172a] flex items-center justify-center pt-8">
                      <button
                        onClick={() => setIsProModalOpen(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg cursor-pointer flex items-center gap-2"
                      >
                        <Lock className="h-4 w-4" /> Unlock AI Global Intelligence
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
                    <h4 className="font-bold text-emerald-600 uppercase tracking-wider text-[10px]">Unlocked AI Briefings</h4>
                    <ul className="list-disc pl-5 space-y-1.5 font-medium leading-relaxed">
                      <li>India-UAE CEPA logistics API integrations projected to reduce export documentation costs by $340 per TEU.</li>
                      <li>EU CBAM steel emissions certs require third-party accreditation before Q4 dispatches.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 p-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl space-y-3 border border-slate-800 shadow-xl">
              <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block">Pro Account Benefit</span>
              <h4 className="text-sm font-bold text-white">Full Global Risk Forecasts</h4>
              <p className="text-xs text-slate-300 leading-normal font-normal">
                Unlock daily tariff updates, phase-out schedules, transport routes delays, and local executive risk scores.
              </p>
              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-full text-center bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs py-2.5 rounded-xl cursor-pointer shadow-md mt-2"
              >
                Upgrade to Pro Intelligence
              </button>
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 22. PREMIUM COUNTRY & BILATERAL REPORTS */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <div>
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" /> Premium Country & Bilateral Reports
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">Authoritative market entry, tariff compliance, and bilateral intelligence PDF packs.</p>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold">Report Store</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PREMIUM_REPORTS_DATA.map((rep) => (
              <div
                key={rep.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-blue-500 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[9px] font-mono font-bold text-gray-400">
                    <span>{rep.code}</span>
                    <span>{rep.pages} · {rep.rating}</span>
                  </div>

                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                    {rep.title}
                  </h3>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                    {rep.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span className="font-display text-base font-extrabold text-gray-900 dark:text-white">{rep.price}</span>
                  <Link
                    href="/en/eoi"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1"
                  >
                    <Lock className="h-3.5 w-3.5" /> Unlock Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 23. GO BEYOND THE NEWS / UPGRADE */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">Access Deeper Intelligence</span>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
              Go Beyond the News
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Turn global country headlines into actionable business intelligence, procurement leads, and tariff optimization strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Free */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Free / Visitor</h3>
                <div className="text-xl font-extrabold text-gray-900 dark:text-white">$0 <span className="text-xs text-gray-400 font-normal">/ forever</span></div>
                <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300 font-medium">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Breaking country news stream</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> 195 Countries Directory search</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Basic bilateral matrix explorer</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Public trade news feeds</li>
                </ul>
              </div>
              <button
                disabled
                className="w-full text-center bg-gray-200 dark:bg-gray-800 text-gray-500 font-bold text-xs py-2.5 rounded-xl cursor-default"
              >
                Current Tier
              </button>
            </div>

            {/* Verified Pro */}
            <div className="p-6 bg-blue-50/20 dark:bg-blue-950/10 rounded-2xl border-2 border-blue-600 space-y-4 flex flex-col justify-between relative shadow-lg">
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl uppercase">
                Most Popular
              </span>

              <div className="space-y-3">
                <h3 className="font-bold text-sm text-blue-600 dark:text-blue-400">Verified Pro</h3>
                <div className="text-xl font-extrabold text-gray-900 dark:text-white">$99 <span className="text-xs text-gray-400 font-normal">/ month</span></div>
                <ul className="space-y-2 text-xs text-gray-700 dark:text-slate-200 font-semibold">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Full AI Global Country Intelligence</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Advanced bilateral corridor analytics</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Verified buyer lead contact reveals</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> PDF report datapack sample downloads</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Custom SMS & Email trade alerts</li>
                </ul>
              </div>

              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md cursor-pointer"
              >
                Upgrade to Pro (14-Day Trial)
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Enterprise Global</h3>
                <div className="text-xl font-extrabold text-gray-900 dark:text-white">Custom <span className="text-xs text-gray-400 font-normal">/ annual</span></div>
                <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300 font-medium">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Organization-wide seat licenses</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Custom advisory & tariff audits</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Multi-country dashboards & APIs</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Dedicated trade analyst support</li>
                </ul>
              </div>

              <Link
                href="/en/eoi"
                className="block text-center w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-all"
              >
                Contact Enterprise
              </Link>
            </div>

          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 24. RECOMMENDED COUNTRIES */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="h-4 w-4 text-blue-600" /> Recommended Countries for You
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Based on active trade relationships</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {[
              { name: "United Arab Emirates", flag: "🇦🇪", tradeVol: "$87.2B", reason: "CEPA Fast Growth" },
              { name: "United States", flag: "🇺🇸", tradeVol: "$191.8B", reason: "iCET High Demand" },
              { name: "Germany", flag: "🇩🇪", tradeVol: "$30.8B", reason: "Green Hydrogen Hub" },
              { name: "Singapore", flag: "🇸🇬", tradeVol: "$35.6B", reason: "Fintech Settlement" },
              { name: "Japan", flag: "🇯🇵", tradeVol: "$21.4B", reason: "Silicon Wafers JV" }
            ].map((rec, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs text-center space-y-2 hover:border-blue-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl block mb-1">{rec.flag}</span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">{rec.name}</h4>
                  <span className="text-[10px] text-blue-600 font-bold block mt-0.5">{rec.tradeVol}</span>
                  <span className="text-[9px] text-gray-400">{rec.reason}</span>
                </div>
                <Link
                  href="/en/news-poc/country-news/my"
                  className="text-[10px] font-bold text-blue-600 hover:underline pt-2 border-t border-gray-100 dark:border-gray-800 block"
                >
                  Explore Country →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────── */}
        {/* 25. GLOBAL COUNTRY NEWSLETTER & ALERT DISPATCHER */}
        {/* ───────────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="max-w-2xl mx-auto text-center space-y-5 relative z-10">
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Daily & Weekly Intelligence Dispatch
            </span>

            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white">
              Get the Global Country Intelligence Brief
            </h2>

            <p className="text-xs md:text-sm text-slate-300 font-normal leading-relaxed">
              Curated daily and weekly briefings covering breaking country news, bilateral corridor velocity, tariff updates, and high-value B2B trade opportunities across 195 markets.
            </p>

            {/* Cadence Radio */}
            <div className="flex justify-center gap-4 text-xs font-bold pt-1">
              <label className="flex items-center gap-2 cursor-pointer bg-white/10 px-4 py-2 rounded-xl border border-white/15">
                <input
                  type="radio"
                  name="cadence"
                  checked={newsletterCadence === "daily"}
                  onChange={() => setNewsletterCadence("daily")}
                  className="accent-blue-500"
                />
                <span>Daily Morning Briefing</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-white/10 px-4 py-2 rounded-xl border border-white/15">
                <input
                  type="radio"
                  name="cadence"
                  checked={newsletterCadence === "weekly"}
                  onChange={() => setNewsletterCadence("weekly")}
                  className="accent-blue-500"
                />
                <span>Weekly Sunday Macro Dossier</span>
              </label>
            </div>

            {/* Subscription Form */}
            {newsletterSuccess ? (
              <div className="p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-2xl space-y-1">
                <h4 className="text-sm font-bold text-emerald-300">✓ Subscription Confirmed!</h4>
                <p className="text-xs text-slate-200">
                  You will now receive our {newsletterCadence} Global Country Intelligence brief directly at <strong>{newsletterEmail}</strong>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterEmail.trim()) {
                    setNewsletterSuccess(true);
                  }
                }}
                className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your corporate work email..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-400 outline-none focus:border-blue-400 flex-1 font-medium"
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer shrink-0"
                >
                  Subscribe
                </button>
              </form>
            )}

            <span className="text-[10px] text-slate-400 block">
              Zero spam. Unsubscribe anytime with 1-click. Enterprise confidentiality guaranteed.
            </span>
          </div>
        </section>

      </main>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ARTICLE READER BRIEFING MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {selectedArticleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedArticleModal.flag}</span>
                <div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{selectedArticleModal.country} · {selectedArticleModal.category}</span>
                  <span className="text-xs text-gray-400 block">{selectedArticleModal.source} · {selectedArticleModal.time}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white leading-snug">
                {selectedArticleModal.title}
              </h3>

              <img
                src={selectedArticleModal.image}
                alt={selectedArticleModal.title}
                className="w-full h-56 object-cover rounded-2xl"
              />

              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedArticleModal.summary}
              </p>

              <div className="p-4 bg-blue-50/60 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-xl space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                  Why It Matters to Business & Trade
                </span>
                <p className="text-xs text-gray-800 dark:text-slate-200 font-semibold leading-relaxed">
                  {selectedArticleModal.whyItMatters}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <span className="text-xs text-gray-400">{selectedArticleModal.readTime}</span>
              <button
                onClick={() => setSelectedArticleModal(null)}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
              >
                Close Briefing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* PRO UPGRADE MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {isProModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="h-5 w-5 text-blue-600 animate-bounce" /> Upgrade to Global Pro
              </h4>
              <button
                onClick={() => {
                  setIsProModalOpen(false);
                  setProSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {proSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-sm font-bold text-gray-900 dark:text-white">Pro Access Active!</h5>
                <p className="text-xs text-gray-500 px-4 font-normal leading-normal">
                  Your 14-day Pro trial has been registered. AI Global Country Intelligence and premium bilateral matrices are now fully unlocked.
                </p>
                <button
                  onClick={() => {
                    setIsProModalOpen(false);
                    setProSuccess(false);
                  }}
                  className="bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-medium text-gray-600 dark:text-gray-300">
                <p className="text-xs leading-relaxed">
                  Unlock advanced 195-country bilateral risk metrics, tariff phase-out schedules, AI market outlooks, and verified buyer lead inquiries.
                </p>
                <div className="p-3 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/40 rounded-xl space-y-1.5">
                  <h5 className="font-bold text-blue-600 uppercase tracking-widest text-[9px]">Included Entitlements</h5>
                  <ul className="list-disc pl-4 space-y-1 text-[11px]">
                    <li>Full AI Global Country Intelligence unlocked</li>
                    <li>PDF report sample download guides</li>
                    <li>Custom tariff & logistics alert notifications</li>
                    <li>Verified B2B buyer leads directory</li>
                  </ul>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsProModalOpen(false)}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setProSuccess(true);
                      setAiUnlocked(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
                  >
                    Confirm Pro Trial Upgrade
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

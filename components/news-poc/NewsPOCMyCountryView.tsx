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
  Share2,
  ThumbsUp,
  MessageSquare,
  Search,
  Filter,
  Eye,
  Flame,
  ArrowUpRight,
  Download,
  ShieldCheck,
  Bell,
  Scale,
  Sparkles,
  Layers,
  ChevronDown
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES FOR MY COUNTRY INTELLIGENCE DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

interface MacroIndicator {
  label: string;
  value: string;
  change: string;
  period: string;
  isPositive: boolean;
}

interface WhatChangedItem {
  id: string;
  category: "Trade" | "Investment" | "Economy" | "Risk" | "Policy" | "Technology" | "Energy";
  headline: string;
  summary: string;
  time: string;
  isPositive: boolean;
  impactTag: string;
}

interface CountryNewsArticle {
  id: string;
  title: string;
  category: string;
  source: string;
  time: string;
  readTime: string;
  description: string;
  whyItMatters: string;
  image: string;
  views: string;
  likes: number;
  comments: number;
  isPremium?: boolean;
}

interface MarketIndicator {
  name: string;
  symbol: string;
  value: string;
  change: string;
  status: "positive" | "stable" | "negative";
}

interface TradePartner {
  country: string;
  flag: string;
  volume: string;
  growth: string;
  share: string;
  topItem: string;
}

interface TradeLead {
  id: string;
  title: string;
  buyerCountry: string;
  buyerFlag: string;
  buyerSector: string;
  product: string;
  estimatedDemand: string;
  requirement: string;
  opportunityScore: number;
  verifiedBuyer: boolean;
  postedTime: string;
}

interface TradeDemandItem {
  product: string;
  growth: string;
  volume: string;
  trend: string;
}

interface TradeOpportunityItem {
  corridor: string;
  product: string;
  score: number;
  demand: "Very High" | "High" | "Moderate";
  growth: string;
  competition: "Low" | "Medium" | "High";
}

interface SectorMomentumItem {
  name: string;
  icon: string;
  change: string;
  isGrowing: boolean;
  keyDriver: string;
}

interface InvestmentOpp {
  title: string;
  sector: string;
  potential: "Very High" | "High" | "Strategic";
  forecast: string;
  incentive: string;
  isSponsored?: boolean;
  description: string;
}

interface RiskMatrixItem {
  riskType: string;
  status: "Low" | "Medium" | "High";
  outlook: string;
  description: string;
}

interface CountryAlertItem {
  severity: "high" | "medium" | "low";
  title: string;
  summary: string;
  time: string;
  actionText: string;
}

interface CompanyItem {
  id: string;
  name: string;
  logoText: string;
  industry: string;
  growth: string;
  tier: "Top Enterprise" | "Verified Pro" | "Registered";
  headquarters: string;
}

interface LeaderItem {
  id: string;
  name: string;
  role: string;
  organization: string;
  industry: string;
  influenceScore: number;
  avatarBg: string;
  initials: string;
}

interface CountryEventItem {
  title: string;
  date: string;
  location: string;
  industry: string;
  type: string;
  isFeatured?: boolean;
}

interface PremiumReportItem {
  id: string;
  title: string;
  code: string;
  type: string;
  price: string;
  pages: string;
  rating: string;
  description: string;
}

interface RelatedCountryItem {
  name: string;
  flag: string;
  tradeVolume: string;
  growth: string;
  keyAccord: string;
}

interface FullCountryProfile {
  name: string;
  flag: string;
  code: string;
  region: string;
  capital: string;
  economicStatus: string;
  growthRate: string;
  lastUpdated: string;
  heroSummary: string;
  snapshot: {
    gdp: string;
    gdpGrowth: string;
    population: string;
    inflation: string;
    exports: string;
    imports: string;
    fdi: string;
    tradeBalance: string;
    currency: string;
    forexReserves: string;
  };
  whatChangedToday: WhatChangedItem[];
  newsFeed: CountryNewsArticle[];
  marketPulse: MarketIndicator[];
  economicPulse: {
    gdpGrowth: { val: string; status: "positive" | "stable" | "negative" };
    inflation: { val: string; status: "positive" | "stable" | "negative" };
    interestRate: { val: string; status: "positive" | "stable" | "negative" };
    fdi: { val: string; status: "positive" | "stable" | "negative" };
    forex: { val: string; status: "positive" | "stable" | "negative" };
  };
  tradeMetrics: {
    totalExports: string;
    totalImports: string;
    tradeBalance: string;
    exportGrowth: string;
    importGrowth: string;
    tradeVolume: string;
    fdiInflow: string;
  };
  tradePartners: TradePartner[];
  tradeLeads: TradeLead[];
  importDemands: TradeDemandItem[];
  exportOpps: TradeOpportunityItem[];
  importOpps: TradeOpportunityItem[];
  sectorMomentum: {
    growing: SectorMomentumItem[];
    declining: SectorMomentumItem[];
  };
  investmentOpps: InvestmentOpp[];
  riskMatrix: RiskMatrixItem[];
  countryAlerts: CountryAlertItem[];
  topCompanies: CompanyItem[];
  topLeaders: LeaderItem[];
  trendingTopics: { rank: number; topic: string; mentions: string; category: string }[];
  events: CountryEventItem[];
  aiIntelligence: {
    summary: string;
    economicOutlook: string;
    tradeOutlook: string;
    investmentOutlook: string;
    marketTrends: string;
    riskSignals: string;
    businessOpportunities: string;
    confidenceScore: string;
  };
  premiumReports: PremiumReportItem[];
  relatedCountries: RelatedCountryItem[];
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE MULTI-COUNTRY INTELLIGENCE PROFILES
// ─────────────────────────────────────────────────────────────────────────────

const COUNTRY_INTELLIGENCE_DATABASE: Record<string, FullCountryProfile> = {
  "India": {
    name: "India",
    flag: "🇮🇳",
    code: "IND",
    region: "South Asia / APAC",
    capital: "New Delhi",
    economicStatus: "Fastest-Growing Major Emerging Market",
    growthRate: "+7.3% YoY",
    lastUpdated: "12 minutes ago",
    heroSummary: "Your single-window intelligence hub on India's macroeconomic momentum, bilateral CEPA & iCET trade corridors, B2B procurement leads, and FDI policy shifts.",
    snapshot: {
      gdp: "$3.75 Trillion",
      gdpGrowth: "+7.3%",
      population: "1.42 Billion",
      inflation: "4.8% CPI",
      exports: "$782.4 Billion",
      imports: "$892.1 Billion",
      fdi: "$71.4 Billion",
      tradeBalance: "-$109.7B",
      currency: "INR (₹) · 83.2/USD",
      forexReserves: "$652 Billion"
    },
    whatChangedToday: [
      {
        id: "wc-1",
        category: "Trade",
        headline: "India-UAE CEPA logistics investments cross $12B mark",
        summary: "Bilateral container processing latency fell by 36% at Mundra & Khalifa ports.",
        time: "1 hr ago",
        isPositive: true,
        impactTag: "+18.4% Vol"
      },
      {
        id: "wc-2",
        category: "Investment",
        headline: "Semiconductor OSAT Fab expansion approved in Gujarat Corridor",
        summary: "Cabinet clears $2.1B capital subsidy incentives for high-density silicon packaging.",
        time: "3 hrs ago",
        isPositive: true,
        impactTag: "FDI Boost"
      },
      {
        id: "wc-3",
        category: "Economy",
        headline: "Core infrastructure growth prints robust 6.8% expansion",
        summary: "Steel, cement, and refinery throughput remain above 5-year averages.",
        time: "5 hrs ago",
        isPositive: true,
        impactTag: "Stable Growth"
      },
      {
        id: "wc-4",
        category: "Risk",
        headline: "Red Sea maritime transit rerouting increases EU freight tariffs",
        summary: "Shipping lines add $450/TEU bunker surcharges for western European ports.",
        time: "6 hrs ago",
        isPositive: false,
        impactTag: "Supply Risk"
      }
    ],
    newsFeed: [
      {
        id: "in-n1",
        title: "India-UAE Trade Corridor Expands as Logistics Investments Cross $12B",
        category: "Trade",
        source: "iGEN Trade Wire",
        time: "2 hours ago",
        readTime: "5 min read",
        description: "Bilateral trade between New Delhi and Abu Dhabi accelerated in Q1 as preferential customs clearances reduce port container turnaround times.",
        whyItMatters: "Creates immediate high-margin supply contracts for engineering exporters, pharmaceutical OEMs, and specialized agri-logistics providers.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&auto=format&fit=crop&q=80",
        views: "14.2k",
        likes: 342,
        comments: 28,
        isPremium: false
      },
      {
        id: "in-n2",
        title: "Semiconductor OSAT Packaging Hubs Receive Fast-Track Capital Grants",
        category: "Technology",
        source: "Ministry of Electronics & IT",
        time: "4 hours ago",
        readTime: "4 min read",
        description: "India Semiconductor Mission approves 4 new OSAT test and substrate fabrication units in Tamil Nadu and Gujarat corridors.",
        whyItMatters: "Reduces domestic hardware OEM reliance on East Asian silicon assembly and accelerates tier-1 automotive chip delivery.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80",
        views: "9.8k",
        likes: 215,
        comments: 19,
        isPremium: true
      },
      {
        id: "in-n3",
        title: "Green Hydrogen Marine Corridors: €2.4B Interconnectivity Accord with Germany",
        category: "Energy",
        source: "International Energy Journal",
        time: "6 hours ago",
        readTime: "6 min read",
        description: "Direct liquefaction container transport routes scheduled to link Kochi Port directly with Hamburg port under zero-emission standards.",
        whyItMatters: "Exempts Indian clean fuel exporters from early European Carbon Border Adjustment Mechanism (CBAM) levies.",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&auto=format&fit=crop&q=80",
        views: "11.4k",
        likes: 289,
        comments: 24,
        isPremium: false
      },
      {
        id: "in-n4",
        title: "Reserve Bank of India Keeps Repo Rate Steady, Upgrades FY26 GDP Outlook",
        category: "Economy",
        source: "Monetary Policy Desk",
        time: "1 day ago",
        readTime: "3 min read",
        description: "Central bank maintains accommodative stance while highlighting solid domestic investment expenditure across manufacturing clusters.",
        whyItMatters: "Ensures predictable lending rates for industrial expansion loans and capital goods inventory procurement.",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=700&auto=format&fit=crop&q=80",
        views: "8.1k",
        likes: 178,
        comments: 12,
        isPremium: false
      }
    ],
    marketPulse: [
      { name: "NIFTY 50", symbol: "NSE", value: "24,850.40", change: "+1.14%", status: "positive" },
      { name: "USD / INR", symbol: "FX", value: "83.24", change: "-0.08%", status: "stable" },
      { name: "Gold (10g)", symbol: "MCX", value: "₹72,400", change: "+0.45%", status: "positive" },
      { name: "Brent Crude", symbol: "ICE", value: "$82.10/bbl", change: "-1.20%", status: "positive" }
    ],
    economicPulse: {
      gdpGrowth: { val: "+7.3% (Q1)", status: "positive" },
      inflation: { val: "4.8% (Target Range)", status: "positive" },
      interestRate: { val: "6.50% (Repo)", status: "stable" },
      fdi: { val: "$71.4B (+12%)", status: "positive" },
      forex: { val: "$652B (Record High)", status: "positive" }
    },
    tradeMetrics: {
      totalExports: "$782.4 Billion",
      totalImports: "$892.1 Billion",
      tradeBalance: "-$109.7 Billion",
      exportGrowth: "+8.2% YoY",
      importGrowth: "+5.4% YoY",
      tradeVolume: "$1.67 Trillion",
      fdiInflow: "$71.4 Billion"
    },
    tradePartners: [
      { country: "United States", flag: "🇺🇸", volume: "$191.8B", growth: "+12.4%", share: "18.2%", topItem: "Tech Services & Pharma" },
      { country: "United Arab Emirates", flag: "🇦🇪", volume: "$87.2B", growth: "+18.4%", share: "10.4%", topItem: "Petroleum & Precious Metals" },
      { country: "China", flag: "🇨🇳", volume: "$136.2B", growth: "+3.1%", share: "14.1%", topItem: "Electronics & API Intermediates" },
      { country: "Germany", flag: "🇩🇪", volume: "$30.8B", growth: "+14.5%", share: "4.2%", topItem: "Clean Energy & Precision Tools" },
      { country: "Singapore", flag: "🇸🇬", volume: "$35.6B", growth: "+16.8%", share: "4.8%", topItem: "FinTech & Logistics Rails" }
    ],
    tradeLeads: [
      {
        id: "tl-in-1",
        title: "UAE Healthcare Group Seeking GMP-Certified Pharmaceutical Suppliers",
        buyerCountry: "United Arab Emirates",
        buyerFlag: "🇦🇪",
        buyerSector: "Pharmaceuticals",
        product: "Generic Injectables & Antibiotic Formulations",
        estimatedDemand: "$4.2 Million",
        requirement: "US FDA / UAE MOHAP GMP Certification",
        opportunityScore: 94,
        verifiedBuyer: true,
        postedTime: "2 hours ago"
      },
      {
        id: "tl-in-2",
        title: "German Tier-1 Automotive Manufacturer Seeking Precision Forged Components",
        buyerCountry: "Germany",
        buyerFlag: "🇩🇪",
        buyerSector: "Automotive & EV",
        product: "Aluminum & Steel Suspension Castings",
        estimatedDemand: "$8.6 Million",
        requirement: "IATF 16949 / DIN Standards",
        opportunityScore: 89,
        verifiedBuyer: true,
        postedTime: "5 hours ago"
      },
      {
        id: "tl-in-3",
        title: "US Cloud Datacenter Provider Seeking High-Efficiency Server Racks",
        buyerCountry: "United States",
        buyerFlag: "🇺🇸",
        buyerSector: "Technology & Hardware",
        product: "Thermal Casing & Copper Busbar Modules",
        estimatedDemand: "$6.1 Million",
        requirement: "UL 94-V0 Fire Safety Certified",
        opportunityScore: 91,
        verifiedBuyer: true,
        postedTime: "1 day ago"
      }
    ],
    importDemands: [
      { product: "Semiconductor OSAT Silicon Wafers", growth: "+18.4%", volume: "$12.4B", trend: "High Deficit" },
      { product: "Advanced Medical Diagnostic Equipment", growth: "+14.2%", volume: "$6.8B", trend: "Rapid Hospital Capex" },
      { product: "Industrial High-Precision Tooling", growth: "+11.6%", volume: "$8.1B", trend: "Factory Upgrades" },
      { product: "EV Battery Lithium-Ion Cells", growth: "+22.5%", volume: "$5.4B", trend: "Corridor Expansion" }
    ],
    exportOpps: [
      { corridor: "India 🇮🇳 → UAE 🇦🇪", product: "Specialized Formulations & Pharma", score: 93, demand: "Very High", growth: "+18.4%", competition: "Medium" },
      { corridor: "India 🇮🇳 → USA 🇺🇸", product: "Defense & Aerospace Avionics Assemblies", score: 91, demand: "High", growth: "+15.2%", competition: "Medium" },
      { corridor: "India 🇮🇳 → Germany 🇩🇪", product: "Green Hydrogen Carrier Logistics", score: 88, demand: "High", growth: "+24.0%", competition: "Low" },
      { corridor: "India 🇮🇳 → UK 🇬🇧", product: "Engineering Goods & Precision Castings", score: 86, demand: "Moderate", growth: "+9.8%", competition: "High" }
    ],
    importOpps: [
      { corridor: "Japan 🇯🇵 → India 🇮🇳", product: "Specialized OSAT Robotics & Tooling", score: 92, demand: "Very High", growth: "+21.0%", competition: "Low" },
      { corridor: "USA 🇺🇸 → India 🇮🇳", product: "Data Server GPUs & Fiber Transceivers", score: 95, demand: "Very High", growth: "+34.5%", competition: "Low" },
      { corridor: "Germany 🇩🇪 → India 🇮🇳", product: "Automated Industrial Laser Cutters", score: 87, demand: "High", growth: "+12.1%", competition: "Medium" }
    ],
    sectorMomentum: {
      growing: [
        { name: "Semiconductors & OSAT", icon: "⚙️", change: "+8.4%", isGrowing: true, keyDriver: "PLI Subsidies & Fab Groundbreakings" },
        { name: "EV & Battery Infrastructure", icon: "🔋", change: "+7.1%", isGrowing: true, keyDriver: "Fleet Interoperability Mandates" },
        { name: "Renewable Energy & Solar", icon: "⚡", change: "+6.8%", isGrowing: true, keyDriver: "500GW Clean Grid Targets" },
        { name: "Pharmaceuticals & Biotech", icon: "💊", change: "+6.2%", isGrowing: true, keyDriver: "CEPA Preferential Tariff Access" }
      ],
      declining: [
        { name: "Traditional Apparel Textiles", icon: "🧵", change: "-2.4%", isGrowing: false, keyDriver: "Raw Cotton Price Volatility" },
        { name: "Legacy Brick-and-Mortar Retail", icon: "🛒", change: "-1.2%", isGrowing: false, keyDriver: "Quick-Commerce Disruption" },
        { name: "Construction Ceramic Tiles", icon: "🧱", change: "-0.8%", isGrowing: false, keyDriver: "Natural Gas Fuel Cost Margin Squeeze" }
      ]
    },
    investmentOpps: [
      {
        title: "Semiconductor OSAT Packaging Corridor",
        sector: "Technology",
        potential: "Very High",
        forecast: "+18.4% CAGR",
        incentive: "50% Fiscal Capex Support",
        isSponsored: false,
        description: "India Semiconductor Mission grants fast-track site allocations and sovereign clean water grid connections in Sanand & Dholera clusters."
      },
      {
        title: "Gujarat Maritime Logistics Park & Container Depot",
        sector: "Infrastructure & Logistics",
        potential: "High",
        forecast: "+14.0% CAGR",
        incentive: "10-Year Corporate Tax Concession",
        isSponsored: true,
        description: "Commercial freight consolidation hub with automated customs bonded warehouses connecting Western Freight Corridor directly to Gulf shipping lines."
      },
      {
        title: "Offshore Wind Transmission Grids",
        sector: "Renewable Energy",
        potential: "High",
        forecast: "+16.2% CAGR",
        incentive: "Zero Inter-State Transmission Charges",
        isSponsored: false,
        description: "Ministry of New and Renewable Energy invites global FDI consortiums for 5GW offshore seabed leases off Tamil Nadu coast."
      }
    ],
    riskMatrix: [
      { riskType: "Macroeconomic", status: "Low", outlook: "Stable", description: "GDP growth exceeding 7% with foreign reserves at historical highs of $652B." },
      { riskType: "Bilateral Trade", status: "Medium", outlook: "Cautious", description: "EU Carbon Border Adjustment Mechanism (CBAM) requires early reporting compliance for steel." },
      { riskType: "Currency & FX", status: "Low", outlook: "Stable", description: "RBI active intervention keeps INR volatility against USD below peer emerging market levels." },
      { riskType: "Supply Chain & Logistics", status: "High", outlook: "Elevated", description: "Suez rerouting adds 10-14 days transit and increases maritime container charter rates." },
      { riskType: "Regulatory & Policy", status: "Low", outlook: "Favorable", description: "Stable single-window regulatory regimes with multi-year manufacturing PLI continuity." }
    ],
    countryAlerts: [
      {
        severity: "high",
        title: "Red Sea Maritime Freight Alert",
        summary: "Shipping lines serving Mumbai–Rotterdam route implement $450/TEU Cape of Good Hope transit surcharges.",
        time: "3 hours ago",
        actionText: "Read Logistics Impact Report"
      },
      {
        severity: "medium",
        title: "European CBAM Carbon Declaration Threshold",
        summary: "Exporters of aluminium and steel billets must finalize Q2 verified emissions certificates by end of month.",
        time: "1 day ago",
        actionText: "View Compliance Checklist"
      }
    ],
    topCompanies: [
      { id: "c-1", name: "Tata Electronics Pvt Ltd", logoText: "TE", industry: "Semiconductors & Hardware", growth: "+38.4%", tier: "Top Enterprise", headquarters: "Bengaluru, India" },
      { id: "c-2", name: "Reliance Green Energy Ltd", logoText: "RG", industry: "Clean Energy & Hydrogen", growth: "+26.1%", tier: "Top Enterprise", headquarters: "Mumbai, India" },
      { id: "c-3", name: "Cipla Bio-Pharmaceuticals", logoText: "CB", industry: "Healthcare & Pharma", growth: "+14.8%", tier: "Verified Pro", headquarters: "Mumbai, India" },
      { id: "c-4", name: "Mahindra Logistics Hubs", logoText: "ML", industry: "Supply Chain & Freight", growth: "+19.2%", tier: "Verified Pro", headquarters: "Gurugram, India" }
    ],
    topLeaders: [
      { id: "l-1", name: "Natarajan Chandrasekaran", role: "Chairman", organization: "Tata Sons", industry: "Conglomerate & Tech", influenceScore: 99.2, avatarBg: "from-blue-600 to-indigo-700", initials: "NC" },
      { id: "l-2", name: "Dr. Ananya Varma", role: "Chief Scientific Officer", organization: "Biotech Labs India", industry: "Pharmaceuticals", influenceScore: 94.6, avatarBg: "from-purple-600 to-indigo-800", initials: "AV" },
      { id: "l-3", name: "Sunil Mittal", role: "Founder & Chairman", organization: "Bharti Enterprises", industry: "Telecom & Satellite", influenceScore: 96.8, avatarBg: "from-emerald-600 to-teal-800", initials: "SM" }
    ],
    trendingTopics: [
      { rank: 1, topic: "Semiconductor PLI Phase-2", mentions: "4.2k mentions", category: "Technology" },
      { rank: 2, topic: "India-UAE CEPA Corridor", mentions: "3.8k mentions", category: "Trade" },
      { rank: 3, topic: "EV Battery Swapping Policy", mentions: "2.9k mentions", category: "Manufacturing" },
      { rank: 4, topic: "Green Hydrogen Export Grids", mentions: "2.4k mentions", category: "Energy" },
      { rank: 5, topic: "Foreign Trade Policy 2026", mentions: "2.1k mentions", category: "Government" }
    ],
    events: [
      { title: "India Global Trade & Investment Summit 2026", date: "Sep 24-26, 2026", location: "Bharat Mandapam, New Delhi", industry: "Bilateral Trade & FDI", type: "Global Summit", isFeatured: true },
      { title: "Semicon India International Expo", date: "Nov 12-14, 2026", location: "BIEC, Bengaluru", industry: "Semiconductors & OSAT", type: "Trade Fair", isFeatured: false },
      { title: "CEPA Maritime Corridors Round Table", date: "Dec 03, 2026", location: "Taj Lands End, Mumbai", industry: "Ports & Freight Logistics", type: "Executive Roundtable", isFeatured: false }
    ],
    aiIntelligence: {
      summary: "India's manufacturing ecosystem demonstrates high structural expansion anchored by electronics assembly and clean energy corridors, while external shipping disruptions warrant tactical margin buffers for maritime exporters.",
      economicOutlook: "Real GDP projected to average 6.9%–7.4% driven by robust public capital expenditure and expanding domestic consumer markets.",
      tradeOutlook: "Non-oil exports to GCC and North America maintain double-digit growth; European lanes face moderate customs friction under CBAM reporting.",
      investmentOutlook: "Sovereign AI datacenters and semiconductor packaging clusters command top global FDI capital allocation shares.",
      marketTrends: "Equities trade at robust valuations; corporate earnings in engineering, industrial capital goods, and pharma show margin expansion.",
      riskSignals: "Elevated maritime freight charges and localized logistics port congestion remain the primary short-term watch items.",
      businessOpportunities: "High-value subcontracting in silicon fabrication cleanrooms, EV battery pack assembly, and cold-chain pharma air corridors.",
      confidenceScore: "94.2% AI Confidence"
    },
    premiumReports: [
      { id: "rep-in-1", title: "2026 India-US Critical Tech & Semiconductor Bilateral Report", code: "REP-BILA-IN-US", type: "Bilateral Intelligence", price: "$299", pages: "92 pages", rating: "4.9 ★", description: "Comprehensive audit of iCET frameworks, defense coproduction agreements, and component sourcing routes." },
      { id: "rep-in-2", title: "India-UAE CEPA Tariff Phase-Out & Maritime Corridor Guide", code: "REP-BILA-IN-UAE", type: "Trade & Tariffs", price: "$249", pages: "78 pages", rating: "4.9 ★", description: "Item-level HS code tariff reductions, customs bonded depot layouts, and gold/petrochemical corridors." },
      { id: "rep-in-3", title: "India Industrial Infrastructure & FDI Sovereign Playbook", code: "REP-FDI-IN-2026", type: "Investment Outlook", price: "$199", pages: "65 pages", rating: "4.8 ★", description: "State-wise tax offsets, single-window labor clearances, and industrial park land allocation directories." }
    ],
    relatedCountries: [
      { name: "United Arab Emirates", flag: "🇦🇪", tradeVolume: "$87.2B", growth: "+18.4%", keyAccord: "CEPA Accord" },
      { name: "United States", flag: "🇺🇸", tradeVolume: "$191.8B", growth: "+12.4%", keyAccord: "iCET Framework" },
      { name: "Germany", flag: "🇩🇪", tradeVolume: "$30.8B", growth: "+14.5%", keyAccord: "Clean Energy Corridor" },
      { name: "Singapore", flag: "🇸🇬", tradeVolume: "$35.6B", growth: "+16.8%", keyAccord: "CECA Accord" },
      { name: "Japan", flag: "🇯🇵", tradeVolume: "$21.4B", growth: "+8.9%", keyAccord: "CEPA & Industrial Townships" }
    ]
  },
  "United Arab Emirates": {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    code: "ARE",
    region: "Middle East / GCC",
    capital: "Abu Dhabi",
    economicStatus: "Global Trade, Finance & Logistics Megahub",
    growthRate: "+4.2% YoY",
    lastUpdated: "8 minutes ago",
    heroSummary: "Personalized intelligence for UAE's accelerated non-oil diversification, CEPA free trade accords, sovereign AI infrastructure, and DP World maritime corridors.",
    snapshot: {
      gdp: "$507 Billion",
      gdpGrowth: "+4.2%",
      population: "9.5 Million",
      inflation: "2.1% CPI",
      exports: "$360.5 Billion",
      imports: "$275.2 Billion",
      fdi: "$22.7 Billion",
      tradeBalance: "+$85.3B",
      currency: "AED (د.إ) · Pegged 3.67/USD",
      forexReserves: "$182 Billion"
    },
    whatChangedToday: [
      {
        id: "wc-uae-1",
        category: "Trade",
        headline: "Digital single-window customs cuts Khalifa Port transit latency by 45%",
        summary: "API container validation reduces customs clearance time to under 90 minutes.",
        time: "1 hr ago",
        isPositive: true,
        impactTag: "Port Speed"
      },
      {
        id: "wc-uae-2",
        category: "Technology",
        headline: "Federal AI Fund commits $2B to sovereign GPU cluster infrastructure",
        summary: "Dubai Silicon Oasis launches commercial edge-compute incubator spaces.",
        time: "3 hrs ago",
        isPositive: true,
        impactTag: "AI Capex"
      },
      {
        id: "wc-uae-3",
        category: "Investment",
        headline: "Non-oil foreign direct investment surges 21% in H1",
        summary: "Renewable utilities, fintech, and advanced logistics attract global headquarters.",
        time: "5 hrs ago",
        isPositive: true,
        impactTag: "+21% FDI"
      }
    ],
    newsFeed: [
      {
        id: "ae-n1",
        title: "UAE Non-Oil Trade Surpasses Targets with Aggressive Global CEPA Network",
        category: "Trade",
        source: "Dubai Commerce Bureau",
        time: "1 hour ago",
        readTime: "4 min read",
        description: "Bilateral trade treaties signed across Asia, Africa, and Latin America cement the UAE as the central commercial re-export conduit of the Global South.",
        whyItMatters: "Enables international traders to operate with 0% foreign income tax and streamlined re-export documentation.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&auto=format&fit=crop&q=80",
        views: "18.4k",
        likes: 420,
        comments: 35,
        isPremium: false
      },
      {
        id: "ae-n2",
        title: "Abu Dhabi Sovereign AI Compute Park Welcomes Global Tech Consortia",
        category: "Technology",
        source: "Emirates Tech Journal",
        time: "3 hours ago",
        readTime: "5 min read",
        description: "Massive datacenter liquid-cooling clusters operationalized in Masdar City powered by zero-carbon solar arrays.",
        whyItMatters: "High demand for specialized datacenter coolant fluids, optical fiber switching equipment, and AI model engineering services.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80",
        views: "12.1k",
        likes: 290,
        comments: 21,
        isPremium: true
      }
    ],
    marketPulse: [
      { name: "DFM General", symbol: "DFM", value: "4,280.15", change: "+0.85%", status: "positive" },
      { name: "ADX General", symbol: "ADX", value: "9,410.60", change: "+0.62%", status: "positive" },
      { name: "Gold (Oz)", symbol: "Spot", value: "$2,410.50", change: "+0.30%", status: "positive" },
      { name: "Brent Crude", symbol: "ICE", value: "$82.10/bbl", change: "-1.20%", status: "stable" }
    ],
    economicPulse: {
      gdpGrowth: { val: "+4.2% (FY26)", status: "positive" },
      inflation: { val: "2.1% (Low)", status: "positive" },
      interestRate: { val: "5.40% (Base)", status: "stable" },
      fdi: { val: "$22.7B (+21%)", status: "positive" },
      forex: { val: "$182B (Strong)", status: "positive" }
    },
    tradeMetrics: {
      totalExports: "$360.5 Billion",
      totalImports: "$275.2 Billion",
      tradeBalance: "+$85.3 Billion",
      exportGrowth: "+11.2% YoY",
      importGrowth: "+8.9% YoY",
      tradeVolume: "$635.7 Billion",
      fdiInflow: "$22.7 Billion"
    },
    tradePartners: [
      { country: "India", flag: "🇮🇳", volume: "$87.2B", growth: "+18.4%", share: "14.2%", topItem: "Petroleum, Gold & Tech" },
      { country: "Saudi Arabia", flag: "🇸🇦", volume: "$38.4B", growth: "+9.2%", share: "6.5%", topItem: "Re-exports & Consumer Goods" },
      { country: "China", flag: "🇨🇳", volume: "$74.1B", growth: "+7.8%", share: "12.0%", topItem: "Electronics & Heavy Equipment" },
      { country: "United States", flag: "🇺🇸", volume: "$31.5B", growth: "+11.0%", share: "5.1%", topItem: "Aviation & Defense Tech" }
    ],
    tradeLeads: [
      {
        id: "tl-ae-1",
        title: "Dubai Aviation Terminal Seeking Lightweight Carbon Composite Parts",
        buyerCountry: "United Arab Emirates",
        buyerFlag: "🇦🇪",
        buyerSector: "Aerospace & MRO",
        product: "Aircraft Interior & Fairing Panels",
        estimatedDemand: "$7.5 Million",
        requirement: "EASA / FAA Part 21 Certified",
        opportunityScore: 96,
        verifiedBuyer: true,
        postedTime: "1 hour ago"
      },
      {
        id: "tl-ae-2",
        title: "Abu Dhabi Port Group Seeking Autonomous Container AGV Fleet",
        buyerCountry: "United Arab Emirates",
        buyerFlag: "🇦🇪",
        buyerSector: "Maritime Logistics",
        product: "Automated Guided Terminal Vehicles",
        estimatedDemand: "$12.0 Million",
        requirement: "Heavy Duty Lithium-Iron Phosphate Powertrains",
        opportunityScore: 92,
        verifiedBuyer: true,
        postedTime: "4 hours ago"
      }
    ],
    importDemands: [
      { product: "Datacenter Immersion Coolants", growth: "+28.4%", volume: "$1.4B", trend: "High Demand" },
      { product: "Organic Agri-Food Commodities", growth: "+16.2%", volume: "$4.1B", trend: "Food Security" },
      { product: "Specialized Aviation Spares", growth: "+12.8%", volume: "$3.6B", trend: "Fleet Expansion" }
    ],
    exportOpps: [
      { corridor: "UAE 🇦🇪 → India 🇮🇳", product: "Refined Petrochemicals & Polymers", score: 95, demand: "Very High", growth: "+16.8%", competition: "Low" },
      { corridor: "UAE 🇦🇪 → Africa Corridors 🌍", product: "Re-exported Solar Infrastructure", score: 90, demand: "High", growth: "+22.4%", competition: "Medium" }
    ],
    importOpps: [
      { corridor: "India 🇮🇳 → UAE 🇦🇪", product: "Specialized API Pharmaceuticals", score: 94, demand: "Very High", growth: "+18.4%", competition: "Medium" },
      { corridor: "Germany 🇩🇪 → UAE 🇦🇪", product: "High-Efficiency Solar Inverters", score: 89, demand: "High", growth: "+14.0%", competition: "Low" }
    ],
    sectorMomentum: {
      growing: [
        { name: "Sovereign AI & Datacenters", icon: "💻", change: "+14.2%", isGrowing: true, keyDriver: "State Capital Matchings" },
        { name: "Maritime Logistics & Free Zones", icon: "🚢", change: "+11.8%", isGrowing: true, keyDriver: "CEPA Single-Window Routing" },
        { name: "Renewable Solar & Cleantech", icon: "⚡", change: "+9.4%", isGrowing: true, keyDriver: "Net Zero 2050 Targets" }
      ],
      declining: [
        { name: "Low-Margin General Merchandise", icon: "📦", change: "-1.8%", isGrowing: false, keyDriver: "Shift to Value-Added Tech Goods" }
      ]
    },
    investmentOpps: [
      {
        title: "Khalifa Port Deepwater Container Terminal Expansion",
        sector: "Ports & Maritime",
        potential: "Very High",
        forecast: "+15.2% CAGR",
        incentive: "100% Foreign Ownership in Free Zone",
        isSponsored: true,
        description: "State-of-the-art automated container berths designed specifically for bilateral CEPA cargo throughput."
      },
      {
        title: "Dubai Silicon Oasis Sovereign AI Incubator",
        sector: "Technology",
        potential: "High",
        forecast: "+24.0% CAGR",
        incentive: "Subsidized Compute Grants",
        isSponsored: false,
        description: "Direct government cloud compute allocations for international B2B tech enterprises establishing regional headquarters."
      }
    ],
    riskMatrix: [
      { riskType: "Macroeconomic", status: "Low", outlook: "Very Strong", description: "Zero sovereign debt risk with vast sovereign wealth fund backing." },
      { riskType: "Trade & Tariffs", status: "Low", outlook: "Favorable", description: "CEPA network provides preferential tariff access across 20+ countries." },
      { riskType: "Currency & FX", status: "Low", outlook: "Pegged", description: "AED pegged strictly to USD ensuring zero foreign exchange rate volatility." },
      { riskType: "Supply Chain", status: "Medium", outlook: "Managed", description: "Suez rerouting slightly affects westbound container lines, offset by multimodal rail." },
      { riskType: "Regulatory", status: "Low", outlook: "Pro-Business", description: "Progressive commercial laws with English common law commercial courts in ADGM & DIFC." }
    ],
    countryAlerts: [
      {
        severity: "medium",
        title: "Customs API Version 4.2 Deployment",
        summary: "Air cargo manifest declarations must transition to digital XML format by end of quarter.",
        time: "6 hours ago",
        actionText: "Download Technical Spec"
      }
    ],
    topCompanies: [
      { id: "c-ae-1", name: "DP World Group", logoText: "DP", industry: "Global Logistics & Ports", growth: "+18.4%", tier: "Top Enterprise", headquarters: "Dubai, UAE" },
      { id: "c-ae-2", name: "G42 Sovereign AI Holdings", logoText: "G4", industry: "Artificial Intelligence", growth: "+42.1%", tier: "Top Enterprise", headquarters: "Abu Dhabi, UAE" },
      { id: "c-ae-3", name: "Masdar Clean Energy", logoText: "MC", industry: "Renewable Solar & Wind", growth: "+21.5%", tier: "Top Enterprise", headquarters: "Abu Dhabi, UAE" }
    ],
    topLeaders: [
      { id: "l-ae-1", name: "Sultan Ahmed bin Sulayem", role: "Group Chairman & CEO", organization: "DP World", industry: "Maritime Logistics", influenceScore: 98.6, avatarBg: "from-blue-600 to-indigo-700", initials: "SS" },
      { id: "l-ae-2", name: "H.E. Dr. Thani Al Zeyoudi", role: "Minister of State for Foreign Trade", organization: "Ministry of Economy", industry: "Government & Policy", influenceScore: 97.4, avatarBg: "from-emerald-600 to-teal-800", initials: "TZ" }
    ],
    trendingTopics: [
      { rank: 1, topic: "CEPA Bilateral Trade Accords", mentions: "5.1k mentions", category: "Trade" },
      { rank: 2, topic: "Sovereign AI Infrastructure", mentions: "3.4k mentions", category: "Technology" },
      { rank: 3, topic: "DP World Logistics Corridor", mentions: "2.8k mentions", category: "Logistics" }
    ],
    events: [
      { title: "Dubai World Trade & Investment Congress", date: "Oct 15-18, 2026", location: "Dubai World Trade Centre", industry: "Global Commerce", type: "World Summit", isFeatured: true },
      { title: "Middle East Clean Energy & Logistics Fair", date: "Dec 05-07, 2026", location: "ADNEC, Abu Dhabi", industry: "Renewables", type: "Trade Fair", isFeatured: false }
    ],
    aiIntelligence: {
      summary: "The UAE commands an unmatched strategic re-export gateway role with accelerated non-oil GDP momentum. Digital trade API integrations and sovereign AI infrastructure serve as the primary commercial catalysts.",
      economicOutlook: "Non-oil sectors projected to grow over 5% annually, cushioned by massive sovereign reserve surpluses.",
      tradeOutlook: "CEPA agreements unlock double-digit bilateral volume growth across India, GCC, and South East Asian hubs.",
      investmentOutlook: "Sovereign compute, green hydrogen transport, and smart container ports attract top-tier global enterprise FDI.",
      marketTrends: "Real estate and financial equities reflect strong foreign capital inflow; logistics bonds command premium ratings.",
      riskSignals: "Regional container repositioning costs require continuous monitoring.",
      businessOpportunities: "High-value enterprise partnerships in aerospace MRO, cold-storage pharmaceutical logistics, and datacenter hardware.",
      confidenceScore: "95.8% AI Confidence"
    },
    premiumReports: [
      { id: "rep-uae-1", title: "UAE-India CEPA Accord: Trade Opportunities & Tariff Phase-Outs", code: "REP-BILA-UAE-IN", type: "Bilateral Trade", price: "$249", pages: "78 pages", rating: "4.9 ★", description: "In-depth guide to tariff concessions, rules of origin certifications, and maritime corridors." },
      { id: "rep-uae-2", title: "Middle East Sovereign AI & Cloud Datacenter Playbook", code: "REP-INTEL-ME-AI", type: "Technology & FDI", price: "$199", pages: "65 pages", rating: "4.8 ★", description: "Power availability grids, government venture subsidies, and GPU hosting compliance." }
    ],
    relatedCountries: [
      { name: "India", flag: "🇮🇳", tradeVolume: "$87.2B", growth: "+18.4%", keyAccord: "CEPA Accord" },
      { name: "Saudi Arabia", flag: "🇸🇦", tradeVolume: "$38.4B", growth: "+9.2%", keyAccord: "GCC Single Market" },
      { name: "United States", flag: "🇺🇸", tradeVolume: "$31.5B", growth: "+11.0%", keyAccord: "Strategic Bilateral" },
      { name: "China", flag: "🇨🇳", tradeVolume: "$74.1B", growth: "+7.8%", keyAccord: "Belt & Road Gateway" }
    ]
  },
  "United States": {
    name: "United States",
    flag: "🇺🇸",
    code: "USA",
    region: "North America",
    capital: "Washington, D.C.",
    economicStatus: "World's Largest Economy & Innovation Leader",
    growthRate: "+2.6% YoY",
    lastUpdated: "15 minutes ago",
    heroSummary: "Intelligence on US macro trends, CHIPS Act incentives, critical technology bilateral corridors (iCET), and cross-border B2B opportunities.",
    snapshot: {
      gdp: "$27.9 Trillion",
      gdpGrowth: "+2.6%",
      population: "335 Million",
      inflation: "2.9% CPI",
      exports: "$2.05 Trillion",
      imports: "$3.12 Trillion",
      fdi: "$345 Billion",
      tradeBalance: "-$1.07T",
      currency: "USD ($) · Global Reserve",
      forexReserves: "$242 Billion"
    },
    whatChangedToday: [
      {
        id: "wc-us-1",
        category: "Technology",
        headline: "CHIPS Act grants award $4.5B for advanced packaging OSAT consortiums",
        summary: "Accelerates commercial semiconductor reshoring in Arizona and Ohio hubs.",
        time: "2 hrs ago",
        isPositive: true,
        impactTag: "CHIPS Subsidy"
      },
      {
        id: "wc-us-2",
        category: "Trade",
        headline: "US-India iCET tech accord initiates fast-track defense exports",
        summary: "Eliminates license bottlenecks for advanced jet engine and radar avionics.",
        time: "4 hrs ago",
        isPositive: true,
        impactTag: "+12% Corridors"
      }
    ],
    newsFeed: [
      {
        id: "us-n1",
        title: "US-India Bilateral Tech Trade Crosses $191 Billion Milestone Under iCET",
        category: "Trade",
        source: "Washington Trade Desk",
        time: "2 hours ago",
        readTime: "5 min read",
        description: "Bilateral trade in advanced software, aerospace components, and pharmaceutical active ingredients reached record levels.",
        whyItMatters: "Opens high-value defense procurement opportunities and cross-border AI co-development partnerships.",
        image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=700&auto=format&fit=crop&q=80",
        views: "22.5k",
        likes: 512,
        comments: 42,
        isPremium: false
      }
    ],
    marketPulse: [
      { name: "S&P 500", symbol: "SPX", value: "5,450.20", change: "+0.72%", status: "positive" },
      { name: "Nasdaq 100", symbol: "NDX", value: "19,210.80", change: "+1.10%", status: "positive" },
      { name: "10-Yr Treasury", symbol: "US10Y", value: "4.15%", change: "-0.04%", status: "stable" },
      { name: "Gold (Oz)", symbol: "GC", value: "$2,410.50", change: "+0.30%", status: "positive" }
    ],
    economicPulse: {
      gdpGrowth: { val: "+2.6% (Solid)", status: "positive" },
      inflation: { val: "2.9% (Cooling)", status: "positive" },
      interestRate: { val: "5.25% (Fed Funds)", status: "stable" },
      fdi: { val: "$345B (Leading)", status: "positive" },
      forex: { val: "$242B (Sufficient)", status: "positive" }
    },
    tradeMetrics: {
      totalExports: "$2.05 Trillion",
      totalImports: "$3.12 Trillion",
      tradeBalance: "-$1.07 Trillion",
      exportGrowth: "+4.8% YoY",
      importGrowth: "+3.2% YoY",
      tradeVolume: "$5.17 Trillion",
      fdiInflow: "$345 Billion"
    },
    tradePartners: [
      { country: "India", flag: "🇮🇳", volume: "$191.8B", growth: "+12.4%", share: "3.7%", topItem: "Software, Pharma & Avionics" },
      { country: "Canada", flag: "🇨🇦", volume: "$780.2B", growth: "+3.2%", share: "15.1%", topItem: "Energy & Automotive" },
      { country: "Mexico", flag: "🇲🇽", volume: "$810.5B", growth: "+6.8%", share: "15.7%", topItem: "Manufacturing & Electronics" }
    ],
    tradeLeads: [
      {
        id: "tl-us-1",
        title: "US Medical Tech Conglomerate Seeking ISO 13485 Stainless Surgical Tools",
        buyerCountry: "United States",
        buyerFlag: "🇺🇸",
        buyerSector: "Healthcare & MedTech",
        product: "Precision Surgical Instrumentation",
        estimatedDemand: "$5.8 Million",
        requirement: "FDA 510(k) Pre-Market Clearance",
        opportunityScore: 93,
        verifiedBuyer: true,
        postedTime: "3 hours ago"
      }
    ],
    importDemands: [
      { product: "Active Pharmaceutical Ingredients (API)", growth: "+14.8%", volume: "$28.4B", trend: "High Demand" },
      { product: "High-Density Substrate OSAT Modules", growth: "+21.2%", volume: "$18.6B", trend: "CHIPS Reshoring" }
    ],
    exportOpps: [
      { corridor: "USA 🇺🇸 → India 🇮🇳", product: "Commercial Jetliner Engines & Avionics", score: 94, demand: "Very High", growth: "+22.1%", competition: "Low" }
    ],
    importOpps: [
      { corridor: "India 🇮🇳 → USA 🇺🇸", product: "Specialized Generic Pharmaceuticals", score: 92, demand: "Very High", growth: "+12.4%", competition: "Medium" }
    ],
    sectorMomentum: {
      growing: [
        { name: "Semiconductor Fab Equipment", icon: "⚙️", change: "+12.4%", isGrowing: true, keyDriver: "CHIPS Act Subsidies" },
        { name: "Defense AI & Autonomous Systems", icon: "✈️", change: "+9.8%", isGrowing: true, keyDriver: "Sovereign Procurement" }
      ],
      declining: [
        { name: "Commercial Office Real Estate", icon: "🏢", change: "-3.5%", isGrowing: false, keyDriver: "Hybrid Work Models" }
      ]
    },
    investmentOpps: [
      {
        title: "Arizona Semiconductor OSAT Packaging Cluster",
        sector: "Semiconductors",
        potential: "Very High",
        forecast: "+18.0% CAGR",
        incentive: "CHIPS Act Federal Grants",
        isSponsored: false,
        description: "Direct federal capital matching for cleanroom fabrication tooling and supplier ecosystem clusters."
      }
    ],
    riskMatrix: [
      { riskType: "Macroeconomic", status: "Low", outlook: "Robust", description: "Consumer spending remains resilient with steady job creation." },
      { riskType: "Trade & Tariffs", status: "Medium", outlook: "Policy Sensitive", description: "Bilateral trade reviews and tech export control compliance regulations." },
      { riskType: "Currency & FX", status: "Low", outlook: "Dominant", description: "US Dollar maintains supreme global reserve and settlement status." },
      { riskType: "Supply Chain", status: "Low", outlook: "Resilient", description: "Domestic reshoring and nearshoring to Mexico/Canada alleviate choke points." },
      { riskType: "Regulatory", status: "Medium", outlook: "Antitrust & AI", description: "Increasing scrutiny on big tech AI consolidation and data privacy." }
    ],
    countryAlerts: [
      {
        severity: "medium",
        title: "Export Administration Regulations (EAR) Tech Update",
        summary: "Revised compute threshold guidelines for dual-use graphics processing units take effect next week.",
        time: "5 hours ago",
        actionText: "View EAR Guidance"
      }
    ],
    topCompanies: [
      { id: "c-us-1", name: "NVIDIA Corporation", logoText: "NV", industry: "AI Compute & GPUs", growth: "+120.4%", tier: "Top Enterprise", headquarters: "Santa Clara, CA" },
      { id: "c-us-2", name: "Apple Inc.", logoText: "AP", industry: "Consumer Hardware & OS", growth: "+8.2%", tier: "Top Enterprise", headquarters: "Cupertino, CA" }
    ],
    topLeaders: [
      { id: "l-us-1", name: "Jensen Huang", role: "Founder & CEO", organization: "NVIDIA", industry: "AI & Semiconductors", influenceScore: 99.5, avatarBg: "from-emerald-500 to-green-700", initials: "JH" },
      { id: "l-us-2", name: "Tim Cook", role: "CEO", organization: "Apple", industry: "Technology", influenceScore: 98.9, avatarBg: "from-slate-800 to-gray-900", initials: "TC" }
    ],
    trendingTopics: [
      { rank: 1, topic: "CHIPS Act Packaging Grants", mentions: "6.8k mentions", category: "Technology" },
      { rank: 2, topic: "US-India iCET Bilateral Corridors", mentions: "4.1k mentions", category: "Trade" }
    ],
    events: [
      { title: "US-India Commercial Dialogue & Tech Summit", date: "Oct 28-30, 2026", location: "Washington D.C.", industry: "Bilateral Trade", type: "Government Summit", isFeatured: true }
    ],
    aiIntelligence: {
      summary: "The US economy exhibits high resilience with corporate AI hardware capex reaching all-time highs. Strategic bilateral corridors under iCET unlock immediate defense, aerospace, and medical sourcing opportunities.",
      economicOutlook: "Growth expected to stay around 2.4%–2.8% as inflation trends toward Federal Reserve targets.",
      tradeOutlook: "Bilateral trade with allied APAC nodes expands rapidly under friendshoring initiatives.",
      investmentOutlook: "Domestic fab construction, clean energy grids, and AI compute centers attract mega-consortiums.",
      marketTrends: "Tech equities command global capital leadership; strong corporate cash reserves.",
      riskSignals: "Interest rate plateau duration and global tariff policy shifts require hedging.",
      businessOpportunities: "High-value co-development in AI software tools, specialized precision medical parts, and OSAT testing.",
      confidenceScore: "96.4% AI Confidence"
    },
    premiumReports: [
      { id: "rep-us-1", title: "2026 US-India Critical Tech & Semiconductor Intelligence", code: "REP-BILA-US-IN", type: "Bilateral Trade", price: "$299", pages: "92 pages", rating: "4.9 ★", description: "Detailed roadmap of iCET agreements, export licensing exemptions, and supply chain reshoring." }
    ],
    relatedCountries: [
      { name: "India", flag: "🇮🇳", tradeVolume: "$191.8B", growth: "+12.4%", keyAccord: "iCET Accord" },
      { name: "United Arab Emirates", flag: "🇦🇪", tradeVolume: "$31.5B", growth: "+11.0%", keyAccord: "Bilateral Framework" }
    ]
  },
  "Germany": {
    name: "Germany",
    flag: "🇩🇪",
    code: "DEU",
    region: "Western Europe / EU",
    capital: "Berlin",
    economicStatus: "Europe's Largest Industrial Powerhouse",
    growthRate: "+1.3% YoY",
    lastUpdated: "20 minutes ago",
    heroSummary: "Intelligence on Germany's green hydrogen transition, Industry 4.0 automation, EU CBAM carbon rules, and bilateral manufacturing corridors.",
    snapshot: {
      gdp: "$4.46 Trillion",
      gdpGrowth: "+1.3%",
      population: "84.4 Million",
      inflation: "2.3% CPI",
      exports: "$1.68 Trillion",
      imports: "$1.45 Trillion",
      fdi: "$38.2 Billion",
      tradeBalance: "+$230.1B",
      currency: "EUR (€) · 1.08/USD",
      forexReserves: "$310 Billion"
    },
    whatChangedToday: [
      {
        id: "wc-de-1",
        category: "Energy",
        headline: "Federal Network Agency fast-tracks €2.4B green hydrogen import pipelines",
        summary: "Direct terminal berths allocated at Hamburg and Wilhelmshaven ports.",
        time: "3 hrs ago",
        isPositive: true,
        impactTag: "Green H2"
      }
    ],
    newsFeed: [
      {
        id: "de-n1",
        title: "Germany-India Clean Energy Corridor: €2 Billion Green Hydrogen Shipments Finalized",
        category: "Energy",
        source: "Handelsblatt Trade",
        time: "3 hours ago",
        readTime: "5 min read",
        description: "Bilateral pact guarantees zero-tariff liquefied green ammonia off-take agreements from Indian coastal ports to German industrial grids.",
        whyItMatters: "Directly solves heavy industrial decarbonization targets while exempting partner suppliers from CBAM penalties.",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&auto=format&fit=crop&q=80",
        views: "11.8k",
        likes: 310,
        comments: 18,
        isPremium: false
      }
    ],
    marketPulse: [
      { name: "DAX 40", symbol: "DAX", value: "18,420.50", change: "+0.54%", status: "positive" },
      { name: "EUR / USD", symbol: "FX", value: "1.084", change: "+0.12%", status: "stable" },
      { name: "German 10Y Bund", symbol: "DE10Y", value: "2.38%", change: "-0.02%", status: "stable" },
      { name: "Brent Crude", symbol: "ICE", value: "$82.10/bbl", change: "-1.20%", status: "positive" }
    ],
    economicPulse: {
      gdpGrowth: { val: "+1.3% (Gradual Recovery)", status: "stable" },
      inflation: { val: "2.3% (Near Target)", status: "positive" },
      interestRate: { val: "3.75% (ECB Deposit)", status: "stable" },
      fdi: { val: "$38.2B (Stable)", status: "stable" },
      forex: { val: "$310B (Solid)", status: "positive" }
    },
    tradeMetrics: {
      totalExports: "$1.68 Trillion",
      totalImports: "$1.45 Trillion",
      tradeBalance: "+$230.1 Billion",
      exportGrowth: "+3.4% YoY",
      importGrowth: "+2.1% YoY",
      tradeVolume: "$3.13 Trillion",
      fdiInflow: "$38.2 Billion"
    },
    tradePartners: [
      { country: "India", flag: "🇮🇳", volume: "$30.8B", growth: "+14.5%", share: "1.0%", topItem: "Clean Energy, Machinery & Auto" },
      { country: "United States", flag: "🇺🇸", volume: "$274.2B", growth: "+5.1%", share: "8.7%", topItem: "Automotive, Pharma & Tech" }
    ],
    tradeLeads: [
      {
        id: "tl-de-1",
        title: "Bavarian Industrial Automation Manufacturer Seeking Specialized Cable Harnesses",
        buyerCountry: "Germany",
        buyerFlag: "🇩🇪",
        buyerSector: "Industrial Machinery",
        product: "Robotic Wire Harnesses & Interconnects",
        estimatedDemand: "$3.8 Million",
        requirement: "CE / VDE Certified",
        opportunityScore: 90,
        verifiedBuyer: true,
        postedTime: "2 hours ago"
      }
    ],
    importDemands: [
      { product: "Green Hydrogen / Ammonia Liquefied Fuels", growth: "+38.4%", volume: "$5.2B", trend: "Decarbonization" }
    ],
    exportOpps: [
      { corridor: "Germany 🇩🇪 → India 🇮🇳", product: "Precision CNC Machine Tools & Robotics", score: 91, demand: "Very High", growth: "+14.5%", competition: "Medium" }
    ],
    importOpps: [
      { corridor: "India 🇮🇳 → Germany 🇩🇪", product: "Zero-Carbon Certified Steel Billets", score: 89, demand: "High", growth: "+19.2%", competition: "Low" }
    ],
    sectorMomentum: {
      growing: [
        { name: "Clean Hydrogen & Wind Turbines", icon: "⚡", change: "+8.9%", isGrowing: true, keyDriver: "Energiewende Transition" },
        { name: "Smart Factory Automation", icon: "⚙️", change: "+6.4%", isGrowing: true, keyDriver: "Industry 4.0 Mandates" }
      ],
      declining: [
        { name: "Heavy Chemical Smelting", icon: "🧪", change: "-3.1%", isGrowing: false, keyDriver: "Natural Gas Price Pressures" }
      ]
    },
    investmentOpps: [
      {
        title: "Hamburg Port Green Hydrogen Electrolyser Hub",
        sector: "Clean Energy",
        potential: "Very High",
        forecast: "+21.0% CAGR",
        incentive: "EU Green Deal Subsidies",
        isSponsored: false,
        description: "Consortium facility connecting direct maritime ammonia terminals with European gas transmission networks."
      }
    ],
    riskMatrix: [
      { riskType: "Macroeconomic", status: "Medium", outlook: "Recovering", description: "Industrial output stabilizing after energy transition adjustment." },
      { riskType: "Regulatory & ESG", status: "Medium", outlook: "Strict", description: "Rigorous EU CBAM reporting and corporate supply chain due diligence laws." },
      { riskType: "Currency", status: "Low", outlook: "Stable", description: "Euro maintains high purchasing power and stability." },
      { riskType: "Supply Chain", status: "Medium", outlook: "Congested", description: "North Sea port terminal throughput subject to shipping reroutes." }
    ],
    countryAlerts: [
      {
        severity: "medium",
        title: "German Supply Chain Due Diligence Act (LkSG) Audit",
        summary: "Tier-1 suppliers to German firms must submit verified human rights and environmental compliance audits.",
        time: "4 hours ago",
        actionText: "Review LkSG Templates"
      }
    ],
    topCompanies: [
      { id: "c-de-1", name: "Siemens Energy AG", logoText: "SE", industry: "Clean Energy & Turbines", growth: "+19.4%", tier: "Top Enterprise", headquarters: "Munich, Germany" }
    ],
    topLeaders: [
      { id: "l-de-1", name: "Christian Bruch", role: "President & CEO", organization: "Siemens Energy", industry: "Clean Energy", influenceScore: 96.8, avatarBg: "from-emerald-600 to-teal-700", initials: "CB" }
    ],
    trendingTopics: [
      { rank: 1, topic: "Green Hydrogen Corridors", mentions: "3.9k mentions", category: "Energy" }
    ],
    events: [
      { title: "Hannover Messe 2026: Industry Automation", date: "Apr 20-24, 2026", location: "Hannover Exhibition Grounds", industry: "Industry 4.0", type: "World Expo", isFeatured: true }
    ],
    aiIntelligence: {
      summary: "Germany is vigorously restructuring its industrial energy foundation toward clean hydrogen and precision automation, creating large bilateral export demand for certified clean carriers and smart hardware.",
      economicOutlook: "Recovery gaining traction with anticipated 1.2%–1.5% GDP expansion as energy input costs moderate.",
      tradeOutlook: "Trade with APAC corridor partners surges in renewable technology and specialized engineering goods.",
      investmentOutlook: "Massive state and EU subsidies channel capital into hydrogen storage, grid modernization, and microchip fabs.",
      marketTrends: "Industrial tech and green utility equities outperforming traditional retail.",
      riskSignals: "Strict supply chain diligence regulations (LkSG) require all suppliers to maintain certified audit trails.",
      businessOpportunities: "Exporting green ammonia, high-precision fabricated components, and software engineering services to German OEMs.",
      confidenceScore: "93.6% AI Confidence"
    },
    premiumReports: [
      { id: "rep-de-1", title: "Germany-India Green Hydrogen & Clean Corridor Blueprint", code: "REP-BILA-DE-IN", type: "Energy Transition", price: "$249", pages: "84 pages", rating: "4.8 ★", description: "Detailed regulatory analysis of CBAM offsets, maritime shipping parameters, and German off-take guarantees." }
    ],
    relatedCountries: [
      { name: "India", flag: "🇮🇳", tradeVolume: "$30.8B", growth: "+14.5%", keyAccord: "Green Corridor" },
      { name: "United States", flag: "🇺🇸", tradeVolume: "$274.2B", growth: "+5.1%", keyAccord: "Transatlantic Trade" }
    ]
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT: MY COUNTRY INTELLIGENCE DASHBOARD
// ─────────────────────────────────────────────────────────────────────────────

export default function NewsPOCMyCountryView() {
  // Personalization / Country selection state
  const [selectedCountryName, setSelectedCountryName] = useState<string>("India");
  const [isFollowingCountry, setIsFollowingCountry] = useState(true);

  // Section 4: News Feed Filter & Engagement State
  const [feedCategoryFilter, setFeedCategoryFilter] = useState<string>("All");
  const [feedSearchQuery, setFeedSearchQuery] = useState<string>("");
  const [likedArticles, setLikedArticles] = useState<string[]>(["in-n1"]);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [sharedArticleId, setSharedArticleId] = useState<string | null>(null);
  const [followedEntities, setFollowedEntities] = useState<string[]>([]);

  // Section 7: Export vs Import Opportunities Tabs
  const [oppTab, setOppTab] = useState<"export" | "import">("export");

  // Section 11: Top Companies Filter
  const [companyTab, setCompanyTab] = useState<"all" | "growing" | "funded">("all");

  // Section 19: Newsletter Preferences
  const [newsletterCadence, setNewsletterCadence] = useState<"daily" | "weekly">("daily");
  const [selectedNewsletterTopics, setSelectedNewsletterTopics] = useState<string[]>([
    "Trade", "Economy", "Investment", "Risk"
  ]);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Monetization / Pro Modals & States
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [proModalFeature, setProModalFeature] = useState<string>("Country Pro Intelligence");
  const [isProUser, setIsProUser] = useState(false);
  const [purchasedReportIds, setPurchasedReportIds] = useState<string[]>([]);
  const [activeAlertsModalOpen, setActiveAlertsModalOpen] = useState(false);
  const [customAlertsSaved, setCustomAlertsSaved] = useState(false);
  const [selectedTradeLeadDetail, setSelectedTradeLeadDetail] = useState<TradeLead | null>(null);

  // Retrieve current active country data (defaults safely to India if country not in map)
  const currentCountry =
    COUNTRY_INTELLIGENCE_DATABASE[selectedCountryName] || COUNTRY_INTELLIGENCE_DATABASE["India"];

  // Helper actions
  const handleToggleFollowCountry = () => {
    setIsFollowingCountry((prev) => !prev);
  };

  const handleToggleLike = (articleId: string) => {
    setLikedArticles((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleToggleSave = (articleId: string) => {
    setSavedArticles((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleShare = (articleId: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/en/news-poc/article/${articleId}`);
    }
    setSharedArticleId(articleId);
    setTimeout(() => setSharedArticleId(null), 2500);
  };

  const handleToggleFollowEntity = (name: string) => {
    setFollowedEntities((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleTriggerProUpgrade = (featureName: string) => {
    setProModalFeature(featureName);
    setIsProModalOpen(true);
  };

  const handleSubscribeNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  // Filtered News Feed
  const filteredNews = currentCountry.newsFeed.filter((item) => {
    const matchCategory =
      feedCategoryFilter === "All" ||
      item.category.toLowerCase() === feedCategoryFilter.toLowerCase();
    const matchSearch =
      feedSearchQuery.trim() === "" ||
      item.title.toLowerCase().includes(feedSearchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(feedSearchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(feedSearchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      
      {/* ───────────────────────────────────────────────────────────────────
          SECTION 1 — COUNTRY HERO
      ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0c1427] via-[#0f1d38] to-[#080d1a] text-white relative overflow-hidden border-b border-gray-800 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-600/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 lg:px-6 space-y-6">
          
          {/* Top Bar: Personalized Badges & Country Selector */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold bg-blue-600/90 text-white px-3 py-1 rounded-lg uppercase tracking-wider shadow-xs flex items-center gap-1.5">
                <Compass className="h-3.5 w-3.5" /> MY COUNTRY INTELLIGENCE
              </span>
              <span className="text-[10px] font-semibold bg-white/10 text-slate-300 px-3 py-1 rounded-lg border border-white/10">
                {currentCountry.economicStatus}
              </span>
              <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Growth {currentCountry.growthRate}
              </span>
            </div>

            {/* Country Selector Dropdown */}
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1.5 rounded-xl backdrop-blur-md">
              <span className="text-xs text-slate-400 font-bold">Selected Country:</span>
              <select
                value={selectedCountryName}
                onChange={(e) => setSelectedCountryName(e.target.value)}
                className="text-xs font-bold bg-transparent text-white border-0 outline-none cursor-pointer pr-2"
                aria-label="Change personalized country"
              >
                <option value="India" className="bg-slate-900 text-white">🇮🇳 India</option>
                <option value="United Arab Emirates" className="bg-slate-900 text-white">🇦🇪 United Arab Emirates</option>
                <option value="United States" className="bg-slate-900 text-white">🇺🇸 United States</option>
                <option value="Germany" className="bg-slate-900 text-white">🇩🇪 Germany</option>
              </select>
            </div>
          </div>

          {/* Hero Main Presentation */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pt-2">
            <div className="space-y-3 max-w-3xl">
              <div className="flex items-center gap-3.5">
                <span className="text-5xl md:text-6xl drop-shadow-md select-none">{currentCountry.flag}</span>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                      {currentCountry.name}
                    </h1>
                    {isProUser && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] font-bold px-2 py-0.5 rounded uppercase flex items-center gap-1">
                        <Crown className="h-3 w-3" /> Pro Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-slate-300 mt-1 flex items-center gap-2 flex-wrap">
                    <span>Region: <strong>{currentCountry.region}</strong></span>
                    <span>·</span>
                    <span>Capital: <strong>{currentCountry.capital}</strong></span>
                    <span>·</span>
                    <span className="text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3 text-amber-400" /> Updated {currentCountry.lastUpdated}
                    </span>
                  </p>
                </div>
              </div>

              <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed">
                {currentCountry.heroSummary}
              </p>
            </div>

            {/* Hero Action CTAs */}
            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0 self-start lg:self-center">
              <button
                onClick={handleToggleFollowCountry}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer ${
                  isFollowingCountry
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "bg-white/15 hover:bg-white/25 text-white border border-white/20"
                }`}
              >
                {isFollowingCountry ? (
                  <>
                    <CheckCircle className="h-4 w-4" /> Following {currentCountry.name}
                  </>
                ) : (
                  <>
                    <Star className="h-4 w-4" /> Follow Country
                  </>
                )}
              </button>

              <button
                onClick={() => setActiveAlertsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <Bell className="h-4 w-4" /> Set Alerts
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ───────────────────────────────────────────────────────────────────
          MAIN DASHBOARD BODY
      ─────────────────────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-12">

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 2 — COUNTRY SNAPSHOT
        ─────────────────────────────────────────────────────────────────── */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Section 2 · Country Snapshot
              </h2>
            </div>
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
              Macroeconomic &amp; Trade Scorecard
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 text-center">
            {[
              { label: "Nominal GDP", val: currentCountry.snapshot.gdp, delta: "+7.3% YoY", isPos: true },
              { label: "GDP Growth", val: currentCountry.snapshot.gdpGrowth, delta: "Q1 Final", isPos: true },
              { label: "Population", val: currentCountry.snapshot.population, delta: "Census Est", isPos: true },
              { label: "Inflation CPI", val: currentCountry.snapshot.inflation, delta: "-0.6% MoM", isPos: true },
              { label: "Total Exports", val: currentCountry.snapshot.exports, delta: "+8.2% YoY", isPos: true },
              { label: "Total Imports", val: currentCountry.snapshot.imports, delta: "+5.4% YoY", isPos: false },
              { label: "FDI Inflow", val: currentCountry.snapshot.fdi, delta: "+12.1% YoY", isPos: true },
              { label: "Trade Balance", val: currentCountry.snapshot.tradeBalance, delta: "Narrowing", isPos: false },
              { label: "Currency", val: currentCountry.snapshot.currency, delta: "Stable", isPos: true }
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-3.5 shadow-xs hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <span className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-wider">
                  {card.label}
                </span>
                <span className="block font-display text-xs md:text-sm font-extrabold text-gray-900 dark:text-white my-1 leading-tight">
                  {card.val}
                </span>
                <span
                  className={`text-[8px] font-bold ${
                    card.isPos ? "text-emerald-500" : "text-amber-500"
                  }`}
                >
                  {card.delta}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 3 — “WHAT CHANGED TODAY?” (1-Minute Intelligence)
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-white via-white to-blue-50/40 dark:from-[#0f172a] dark:to-blue-950/20 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-gray-800 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600 animate-ping" />
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  {currentCountry.name} — What Changed Today?
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Executive 60-second briefing on pivotal trade, investment, economy, and risk developments.
              </p>
            </div>
            <button
              onClick={() => handleTriggerProUpgrade("Full Daily Executive Intelligence Briefing")}
              className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              View Full Intelligence Briefing →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentCountry.whatChangedToday.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#131d36] border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:border-blue-500 transition-all space-y-3 group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[8.5px] font-bold">
                    <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded uppercase tracking-wider border border-blue-200/30">
                      {item.category}
                    </span>
                    <span className="text-gray-400">{item.time}</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                    {item.headline}
                  </h3>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                  <span
                    className={`text-[8.5px] font-bold px-2 py-0.5 rounded ${
                      item.isPositive
                        ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600"
                        : "bg-red-50 dark:bg-red-950/40 text-red-600"
                    }`}
                  >
                    {item.impactTag}
                  </span>
                  <Link
                    href={`/en/news-poc/feed/country`}
                    className="text-[9.5px] font-extrabold text-blue-600 hover:underline flex items-center gap-0.5"
                  >
                    Explore <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 4 — MY COUNTRY FEED (Personalized News with Filter & Engagement)
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-150 dark:border-gray-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <FileText className="h-4.5 w-4.5 text-blue-600" />
                <h2 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Section 4 · My Country News Feed
                </h2>
                <span className="text-[9px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 px-2 py-0.5 rounded border border-blue-200/40">
                  Live Updates
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Verified B2B country developments, policy shifts, trade corridor updates, and industry moves.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search country news..."
                value={feedSearchQuery}
                onChange={(e) => setFeedSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
            <span className="text-[10px] font-bold text-gray-400 uppercase shrink-0 mr-1">Filter:</span>
            {[
              "All",
              "Trade",
              "Economy",
              "Technology",
              "Investment",
              "Government",
              "Manufacturing",
              "Infrastructure",
              "Energy"
            ].map((cat) => (
              <button
                key={cat}
                onClick={() => setFeedCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-[10.5px] font-bold transition-all shrink-0 cursor-pointer ${
                  feedCategoryFilter.toLowerCase() === cat.toLowerCase()
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Feed News Cards */}
          <div className="space-y-6">
            {filteredNews.length === 0 ? (
              <div className="text-center py-10 border border-dashed border-gray-200 dark:border-gray-800 rounded-2xl">
                <p className="text-xs text-gray-500">No stories match your filter criteria.</p>
              </div>
            ) : (
              filteredNews.map((article) => {
                const isLiked = likedArticles.includes(article.id);
                const isSaved = savedArticles.includes(article.id);
                const isShared = sharedArticleId === article.id;

                return (
                  <div
                    key={article.id}
                    className="bg-gray-50/70 dark:bg-[#090d16] border border-gray-200/80 dark:border-gray-800 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row gap-6 hover:border-blue-400 dark:hover:border-blue-500/50 transition-all group"
                  >
                    {/* Left content pane */}
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-[10px]">
                          <span className="bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-lg font-bold border border-blue-200/30">
                            {article.category}
                          </span>
                          <span className="text-gray-500 font-medium">
                            {article.source} · {article.time} · {article.readTime}
                          </span>
                          {article.isPremium && (
                            <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-250/20 flex items-center gap-1">
                              <Lock className="h-3 w-3" /> Pro Analysis
                            </span>
                          )}
                        </div>

                        <Link href={`/en/news-poc/article/${article.id}`}>
                          <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                            {article.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                          {article.description}
                        </p>

                        {/* Why It Matters Callout */}
                        <div className="p-3 bg-blue-50/50 dark:bg-blue-950/30 border-l-4 border-blue-600 rounded-r-xl space-y-0.5">
                          <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">
                            Why It Matters:
                          </span>
                          <p className="text-[11px] text-gray-700 dark:text-slate-200 font-medium leading-relaxed">
                            {article.whyItMatters}
                          </p>
                        </div>
                      </div>

                      {/* Engagement & Action Row */}
                      <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/en/news-poc/article/${article.id}`}
                            className="bg-[#1E3A5F] hover:bg-[#152e4f] text-white font-bold text-[10px] px-4 py-2 rounded-xl transition-colors shadow-xs flex items-center gap-1"
                          >
                            Read Full Story <ArrowRight className="h-3 w-3" />
                          </Link>
                          <span className="text-[10px] text-gray-400 font-medium">
                            {article.views} views
                          </span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-500 font-semibold text-[11px]">
                          <button
                            onClick={() => handleToggleLike(article.id)}
                            className={`flex items-center gap-1 transition-colors cursor-pointer ${
                              isLiked ? "text-red-500 font-bold" : "hover:text-red-500"
                            }`}
                          >
                            <ThumbsUp className={`h-3.5 w-3.5 ${isLiked ? "fill-red-500" : ""}`} />
                            <span>{article.likes + (isLiked ? 1 : 0)}</span>
                          </button>

                          <button
                            onClick={() => handleToggleSave(article.id)}
                            className={`flex items-center gap-1 transition-colors cursor-pointer ${
                              isSaved ? "text-amber-500 font-bold" : "hover:text-amber-500"
                            }`}
                          >
                            <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-amber-500" : ""}`} />
                            <span>{isSaved ? "Saved" : "Save"}</span>
                          </button>

                          <button
                            onClick={() => handleShare(article.id)}
                            className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                            <span>{isShared ? "Copied Link!" : "Share"}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right image */}
                    <div className="w-full md:w-56 h-40 md:h-auto rounded-xl overflow-hidden relative shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 5 — MARKET & ECONOMIC PULSE
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-150 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Section 5 · Market &amp; Economic Pulse
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-400 font-bold">Status:</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded flex items-center gap-1">
                🟢 Positive
              </span>
              <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded flex items-center gap-1">
                🟡 Stable
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Market Indicators */}
            <div className="lg:col-span-6 space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Market Indicators</h3>
              <div className="grid grid-cols-2 gap-3">
                {currentCountry.marketPulse.map((ind, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 space-y-1"
                  >
                    <div className="flex justify-between items-center text-[9px] font-bold text-gray-400 uppercase">
                      <span>{ind.name}</span>
                      <span>{ind.symbol}</span>
                    </div>
                    <div className="font-display text-base font-bold text-gray-900 dark:text-white">
                      {ind.value}
                    </div>
                    <span
                      className={`text-[9px] font-bold block ${
                        ind.status === "positive" ? "text-emerald-500" : "text-amber-500"
                      }`}
                    >
                      {ind.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Economic Indicators */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Economic Indicators</h3>
                <span className="text-[9px] font-bold text-blue-600 flex items-center gap-0.5">
                  <Lock className="h-2.5 w-2.5" /> Pro Historical Data Available
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "GDP Growth", val: currentCountry.economicPulse.gdpGrowth.val, stat: "🟢" },
                  { label: "Inflation", val: currentCountry.economicPulse.inflation.val, stat: "🟢" },
                  { label: "Interest Rate", val: currentCountry.economicPulse.interestRate.val, stat: "🟡" },
                  { label: "FDI Inflows", val: currentCountry.economicPulse.fdi.val, stat: "🟢" },
                  { label: "Forex Reserves", val: currentCountry.economicPulse.forex.val, stat: "🟢" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-150 dark:border-gray-800 text-center"
                  >
                    <span className="text-[8.5px] font-bold text-gray-400 uppercase block">{item.label}</span>
                    <div className="font-display text-xs font-bold text-gray-900 dark:text-white mt-1">
                      {item.val}
                    </div>
                    <span className="text-[9px] mt-0.5 block">{item.stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => handleTriggerProUpgrade("Full Macroeconomic & Historical Dashboard")}
              className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/60 font-bold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Full Dashboard (Interactive Charts)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 6 — TRADE LEADS & METRICS (Key B2B Revenue & Pro Monetization)
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-8">
          
          <div className="border-b border-gray-150 dark:border-gray-800 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <h2 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Section 6 · Trade Leads &amp; Bilateral Metrics
                </h2>
                <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[9px] font-bold px-2 py-0.5 rounded">
                  B2B Opportunities
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Convert {currentCountry.name}'s bilateral trade flows into verified commercial exporter &amp; buyer deals.
              </p>
            </div>

            <button
              onClick={() => handleTriggerProUpgrade("Verified Buyer Lead Matching Suite")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
            >
              <Crown className="h-3.5 w-3.5 text-amber-300" /> Unlock All Buyer Leads
            </button>
          </div>

          {/* 6.A Trade Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center">
            {[
              { label: "Total Exports", val: currentCountry.tradeMetrics.totalExports },
              { label: "Total Imports", val: currentCountry.tradeMetrics.totalImports },
              { label: "Trade Balance", val: currentCountry.tradeMetrics.tradeBalance },
              { label: "Export Growth", val: currentCountry.tradeMetrics.exportGrowth },
              { label: "Import Growth", val: currentCountry.tradeMetrics.importGrowth },
              { label: "Trade Volume", val: currentCountry.tradeMetrics.tradeVolume },
              { label: "FDI Inflow", val: currentCountry.tradeMetrics.fdiInflow }
            ].map((tm, idx) => (
              <div
                key={idx}
                className="bg-gray-50 dark:bg-gray-900 border border-gray-200/70 dark:border-gray-800 rounded-2xl p-3 shadow-3xs"
              >
                <span className="text-[8.5px] font-bold text-gray-400 uppercase block">{tm.label}</span>
                <span className="font-display text-xs md:text-sm font-extrabold text-gray-900 dark:text-white mt-1 block">
                  {tm.val}
                </span>
              </div>
            ))}
          </div>

          {/* 6.B Top Trade Partners Table */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="h-4 w-4 text-blue-600" /> Top Bilateral Trade Partners
              </h3>
              <span className="text-[10px] text-gray-400 font-medium">Bilateral Corridors</span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800 text-[9px] uppercase">
                    <th className="p-3">Partner Country</th>
                    <th className="p-3">Trade Volume</th>
                    <th className="p-3">Growth Rate</th>
                    <th className="p-3">Share %</th>
                    <th className="p-3">Primary Corridor Goods</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-855 font-medium">
                  {currentCountry.tradePartners.map((partner, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                      <td className="p-3 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="text-base">{partner.flag}</span>
                        <span>{partner.country}</span>
                      </td>
                      <td className="p-3 text-blue-600 dark:text-blue-400 font-bold">{partner.volume}</td>
                      <td className="p-3 text-emerald-500 font-bold">{partner.growth}</td>
                      <td className="p-3 text-gray-500">{partner.share}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300 text-[11px]">{partner.topItem}</td>
                      <td className="p-3 text-right">
                        <Link
                          href="/en/news-poc/country-news/all"
                          className="text-[9.5px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5"
                        >
                          Explore Bilateral Trade <ArrowRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 6.C Active B2B Trade Leads */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Flame className="h-4.5 w-4.5 text-amber-500" />
                <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Active B2B Trade Leads (Verified Buyers)
                </h3>
              </div>
              <span className="text-[10px] text-gray-400 font-semibold">Live Procurement RFPs</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentCountry.tradeLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-gray-50/60 dark:bg-gray-900/80 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-blue-500 transition-all group"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[9px] font-bold">
                      <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                        <span>{lead.buyerFlag}</span>
                        <span>{lead.buyerCountry}</span>
                      </span>
                      <span className="bg-emerald-50 dark:bg-emerald-950 text-emerald-600 px-2 py-0.5 rounded">
                        Score {lead.opportunityScore}/100
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-tight">
                      {lead.title}
                    </h4>

                    <div className="text-[10.5px] space-y-1 text-gray-600 dark:text-gray-300 font-normal">
                      <p><strong>Estimated Demand:</strong> <span className="text-emerald-600 font-bold">{lead.estimatedDemand}</span></p>
                      <p><strong>Requirement:</strong> {lead.requirement}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <span className="text-[9px] text-gray-400 font-medium">{lead.postedTime}</span>
                    <button
                      onClick={() => setSelectedTradeLeadDetail(lead)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9.5px] px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      View Trade Lead
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6.D & 6.E Import Demand & Export Opportunities */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Import Demand */}
            <div className="lg:col-span-6 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  High Import Demand In {currentCountry.name}
                </h4>
                <span className="text-[9px] font-bold text-blue-600">Sourcing Deficits</span>
              </div>

              <div className="space-y-2 text-xs">
                {currentCountry.importDemands.map((imp, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-white dark:bg-[#10172a] rounded-xl border border-gray-150 dark:border-gray-800 flex justify-between items-center"
                  >
                    <div>
                      <span className="font-bold text-gray-900 dark:text-white block text-[11px]">{imp.product}</span>
                      <span className="text-[9px] text-gray-400">{imp.volume} · {imp.trend}</span>
                    </div>
                    <span className="font-bold text-emerald-500 text-xs">{imp.growth}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/en/news-poc/country-news/intelligence"
                  className="text-[10px] font-bold text-blue-600 hover:underline block text-right"
                >
                  Explore All Import Demands →
                </Link>
              </div>
            </div>

            {/* Export Opportunities */}
            <div className="lg:col-span-6 p-5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-3">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-2">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Top Export Outlets From {currentCountry.name}
                </h4>
                <span className="text-[9px] font-bold text-emerald-600">High Margins</span>
              </div>

              <div className="space-y-2 text-xs">
                {currentCountry.exportOpps.slice(0, 3).map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-white dark:bg-[#10172a] rounded-xl border border-gray-150 dark:border-gray-800 flex justify-between items-center"
                  >
                    <div>
                      <span className="text-[9px] font-bold text-blue-600 block">{exp.corridor}</span>
                      <span className="font-bold text-gray-900 dark:text-white text-[11px]">{exp.product}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded">
                        Score {exp.score}
                      </span>
                      <span className="text-[9px] text-gray-400 block mt-0.5">{exp.growth}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  href="/en/news-poc/country-news/intelligence"
                  className="text-[10px] font-bold text-blue-600 hover:underline block text-right"
                >
                  Explore All Export Opportunities →
                </Link>
              </div>
            </div>
          </div>

          {/* 6.F Premium Trade Intelligence Locked Area (Primary Monetization) */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-blue-500/40 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white p-6 md:p-8 shadow-md">
            <div className="max-w-3xl space-y-3">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" />
                <h3 className="font-display text-sm md:text-base font-bold tracking-wide uppercase text-white">
                  Pro Trade Intelligence &amp; Buyer Vault
                </h3>
              </div>
              
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
                Unlock direct corporate buyer contact coordinates, product-level HS code shipment statistics, customs duty tables, and automated supplier matching algorithms.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-semibold text-slate-300 pt-2">
                <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-emerald-400" /> Buyer Contact Details</span>
                <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-emerald-400" /> HS Code Trade Stats</span>
                <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-emerald-400" /> AI Exporter Matching</span>
                <span className="flex items-center gap-1"><Check className="h-3.5 w-3.5 text-emerald-400" /> Verified RFPs</span>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => handleTriggerProUpgrade("Pro Trade Intelligence & Buyer Directory")}
                  className="bg-amber-400 hover:bg-amber-300 text-gray-950 font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Lock className="h-3.5 w-3.5" /> Unlock Trade Intelligence
                </button>
              </div>
            </div>
          </div>

        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 7 — EXPORT & IMPORT OPPORTUNITIES (Interactive Tabs)
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-150 dark:border-gray-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4.5 w-4.5 text-blue-600" />
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Section 7 · Export &amp; Import Opportunities
                </h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                Broader market opportunities mapped across strategic bilateral trade nodes.
              </p>
            </div>

            {/* Two Clear Tabs */}
            <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800 self-start sm:self-auto">
              <button
                onClick={() => setOppTab("export")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  oppTab === "export"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-800 dark:hover:text-white"
                }`}
              >
                Export Opportunities
              </button>
              <button
                onClick={() => setOppTab("import")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  oppTab === "import"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-gray-500 hover:text-gray-800 dark:hover:text-white"
                }`}
              >
                Import Opportunities
              </button>
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(oppTab === "export" ? currentCountry.exportOpps : currentCountry.importOpps).map((item, idx) => (
              <div
                key={idx}
                className="bg-gray-50/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-blue-500 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded border border-blue-200/30">
                      {item.corridor}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      Opportunity Score: {item.score}/100
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                    {item.product}
                  </h3>

                  <div className="grid grid-cols-3 gap-2 text-[10px] text-gray-500 pt-1 font-medium">
                    <div>
                      <span className="text-gray-400 block text-[8.5px] uppercase">Demand</span>
                      <span className="font-bold text-gray-900 dark:text-white">{item.demand}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[8.5px] uppercase">Growth</span>
                      <span className="font-bold text-emerald-500">{item.growth}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[8.5px] uppercase">Competition</span>
                      <span className="font-bold text-gray-900 dark:text-white">{item.competition}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                  <Link
                    href="/eoi"
                    className="text-[10px] font-extrabold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    Explore Opportunity <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-center">
            <Link
              href="/en/news-poc/country-news/intelligence"
              className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-slate-300 font-bold text-xs rounded-xl transition-all shadow-xs"
            >
              Explore All Bilateral Opportunities →
            </Link>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 8 — SECTOR MOMENTUM (Growing vs Declining Sectors)
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Section 8 · Sector Momentum in {currentCountry.name}
              </h2>
            </div>
            <Link
              href="/en/news-poc/sector-news"
              className="text-[10px] font-bold text-blue-600 hover:underline"
            >
              View Sector Intelligence →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Growing Sectors */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                <TrendingUp className="h-4 w-4" /> Growing Sectors
              </div>
              <div className="space-y-2">
                {currentCountry.sectorMomentum.growing.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-emerald-50/20 dark:bg-emerald-950/20 border border-emerald-200/30 rounded-2xl flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span>{sec.icon}</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{sec.name}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-slate-400 font-normal pl-6">
                        {sec.keyDriver}
                      </p>
                    </div>
                    <span className="font-bold text-emerald-600 text-xs shrink-0 pl-2">
                      🟢 {sec.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Declining / Cautious Sectors */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-red-600">
                <TrendingDown className="h-4 w-4" /> Contracting / Watch Sectors
              </div>
              <div className="space-y-2">
                {currentCountry.sectorMomentum.declining.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-red-50/20 dark:bg-red-950/20 border border-red-200/30 rounded-2xl flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span>{sec.icon}</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{sec.name}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-slate-400 font-normal pl-6">
                        {sec.keyDriver}
                      </p>
                    </div>
                    <span className="font-bold text-red-600 text-xs shrink-0 pl-2">
                      🔴 {sec.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 9 — INVESTMENT OPPORTUNITIES (FDI & Capital Corridors)
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Section 9 · Investment &amp; FDI Opportunities
              </h2>
            </div>
            <span className="text-[9px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 px-2 py-0.5 rounded">
              Capital Corridors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentCountry.investmentOpps.map((inv, idx) => (
              <div
                key={idx}
                className="bg-gray-50/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-blue-500 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[8.5px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-950 px-2 py-0.5 rounded">
                      {inv.sector}
                    </span>
                    {inv.isSponsored ? (
                      <span className="text-[8px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-600 px-2 py-0.5 rounded uppercase">
                        ★ Sponsored Opportunity
                      </span>
                    ) : (
                      <span className="text-[8px] font-bold text-emerald-500 uppercase">
                        Potential: {inv.potential}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                    {inv.title}
                  </h3>

                  <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                    {inv.description}
                  </p>

                  <div className="p-2.5 bg-white dark:bg-[#11192e] rounded-xl text-[10px] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Forecast:</span>
                      <span className="font-bold text-emerald-500">{inv.forecast}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Incentive:</span>
                      <span className="font-bold text-blue-500">{inv.incentive}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-200 dark:border-gray-800 flex justify-end">
                  <Link
                    href="/eoi"
                    className="text-[10px] font-extrabold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    View Investment Intelligence <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 10 — COUNTRY RISK & ALERTS
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4.5 w-4.5 text-amber-500" />
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Section 10 · Country Risk Matrix &amp; Live Alerts
              </h2>
            </div>
            <button
              onClick={() => setActiveAlertsModalOpen(true)}
              className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Configure Custom Risk Alerts →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Risk Matrix Table */}
            <div className="lg:col-span-7 space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Risk Assessment Matrix</h3>
              <div className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800 text-[9px] uppercase">
                      <th className="p-3">Risk Dimension</th>
                      <th className="p-3">Level</th>
                      <th className="p-3">Assessment Summary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-855 font-medium">
                    {currentCountry.riskMatrix.map((rm, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                        <td className="p-3 font-bold text-gray-900 dark:text-white">{rm.riskType}</td>
                        <td className="p-3">
                          <span
                            className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                              rm.status === "Low"
                                ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-600"
                                : rm.status === "Medium"
                                ? "bg-amber-50 dark:bg-amber-950 text-amber-600"
                                : "bg-red-50 dark:bg-red-950 text-red-600"
                            }`}
                          >
                            {rm.status}
                          </span>
                        </td>
                        <td className="p-3 text-[11px] text-gray-600 dark:text-gray-300">{rm.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Active Live Alerts */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Bulletins</h3>
              <div className="space-y-3">
                {currentCountry.countryAlerts.map((alert, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border border-amber-200/50 dark:border-amber-900/40 bg-amber-50/20 dark:bg-amber-950/10 space-y-2"
                  >
                    <div className="flex justify-between items-center text-[9px] font-bold">
                      <span className="text-red-500 uppercase flex items-center gap-1">
                        🔴 Supply Chain Alert
                      </span>
                      <span className="text-gray-400">{alert.time}</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{alert.title}</h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                      {alert.summary}
                    </p>
                    <div className="pt-1 flex justify-end">
                      <Link
                        href="/en/news-poc/country-news/intelligence"
                        className="text-[9.5px] font-bold text-blue-600 hover:underline"
                      >
                        {alert.actionText} →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 11 & SECTION 12 — TOP COMPANIES & TOP LEADERS
        ─────────────────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Section 11: Top Companies */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Building className="h-4.5 w-4.5 text-blue-600" />
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Section 11 · Top Companies in {currentCountry.name}
                </h3>
              </div>
              <Link
                href="/en/company-news/registered/pages"
                className="text-[9.5px] font-bold text-blue-600 hover:underline"
              >
                View All Companies →
              </Link>
            </div>

            <div className="space-y-3">
              {currentCountry.topCompanies.map((comp) => {
                const isFollowed = followedEntities.includes(comp.name);
                return (
                  <div
                    key={comp.id}
                    className="p-3.5 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 flex items-center justify-between hover:border-blue-400 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {comp.logoText}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-tight">
                            {comp.name}
                          </h4>
                          <span className="text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded">
                            {comp.tier}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                          {comp.industry} · <span className="text-emerald-500 font-bold">{comp.growth}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleFollowEntity(comp.name)}
                        className={`text-[9px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                          isFollowed
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600"
                        }`}
                      >
                        {isFollowed ? "Following" : "+ Follow"}
                      </button>
                      <Link
                        href="/en/company-news/registered/pages"
                        className="text-[9.5px] font-bold text-blue-600 hover:underline"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 12: Top Leaders */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="h-4.5 w-4.5 text-blue-600" />
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Section 12 · Top Leaders in {currentCountry.name}
                </h3>
              </div>
              <Link
                href="/en/leader-news"
                className="text-[9.5px] font-bold text-blue-600 hover:underline"
              >
                View Leader Intelligence →
              </Link>
            </div>

            <div className="space-y-3">
              {currentCountry.topLeaders.map((ldr) => (
                <div
                  key={ldr.id}
                  className="p-3.5 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 flex items-center justify-between hover:border-blue-400 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${ldr.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                      {ldr.initials}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-tight">
                        {ldr.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                        {ldr.role}, {ldr.organization} · {ldr.industry}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[8.5px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      Score {ldr.influenceScore}
                    </span>
                    <Link
                      href="/en/leader-news"
                      className="text-[9.5px] font-bold text-blue-600 hover:underline"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 13 & SECTION 14 — TRENDING TOPICS & COUNTRY EVENTS
        ─────────────────────────────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Section 13: Trending Topics */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="h-4.5 w-4.5 text-amber-500" />
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Section 13 · Trending in {currentCountry.name}
                </h3>
              </div>
              <span className="text-[9px] text-gray-400 font-semibold">Ranked by Velocity</span>
            </div>

            <div className="space-y-2.5">
              {currentCountry.trendingTopics.map((top) => (
                <div
                  key={top.rank}
                  onClick={() => {
                    setFeedCategoryFilter("All");
                    setFeedSearchQuery(top.topic);
                  }}
                  className="p-3 bg-gray-50/70 dark:bg-gray-900/60 rounded-xl border border-gray-150 dark:border-gray-800 flex justify-between items-center cursor-pointer hover:border-blue-500 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-lg bg-blue-600/10 text-blue-600 font-bold text-xs flex items-center justify-center">
                      #{top.rank}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white block">{top.topic}</span>
                      <span className="text-[9px] text-gray-400">{top.category}</span>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-bold text-emerald-500">{top.mentions}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 14: Country Events */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-7 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4.5 w-4.5 text-blue-600" />
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Section 14 · Country Events &amp; Summits
                </h3>
              </div>
              <span className="text-[9px] text-gray-400 font-semibold">Trade Expos &amp; Roundtables</span>
            </div>

            <div className="space-y-3">
              {currentCountry.events.map((ev, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 flex justify-between items-center hover:border-blue-400 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded uppercase">
                        {ev.type}
                      </span>
                      {ev.isFeatured && (
                        <span className="text-[8px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2 py-0.5 rounded">
                          ★ Featured
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{ev.title}</h4>
                    <p className="text-[10px] text-gray-500">{ev.date} · {ev.location}</p>
                  </div>

                  <Link
                    href="/en/profile/events"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] px-3.5 py-1.5 rounded-lg shrink-0 ml-3 shadow-xs"
                  >
                    Register
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 15 — AI COUNTRY INTELLIGENCE (Predictive Outlook)
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-[#0c1427] via-[#0f1d38] to-[#080d1a] text-white rounded-3xl p-6 md:p-8 border border-gray-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-400 fill-amber-400 animate-pulse" />
                <h2 className="font-display text-base font-bold uppercase tracking-wider text-white">
                  Section 15 · AI Country Intelligence
                </h2>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                What is happening in {currentCountry.name} and what could happen next?
              </p>
            </div>

            <span className="text-[10px] font-bold bg-white/10 text-emerald-300 border border-emerald-400/30 px-3 py-1 rounded-lg self-start sm:self-auto">
              {currentCountry.aiIntelligence.confidenceScore}
            </span>
          </div>

          <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
            <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
              Executive AI Synthesis
            </span>
            <p className="text-xs md:text-sm text-slate-200 leading-relaxed font-medium italic">
              "{currentCountry.aiIntelligence.summary}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1.5">
              <h4 className="font-bold text-blue-300 uppercase tracking-wider text-[10px]">1. Economic Outlook</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                {currentCountry.aiIntelligence.economicOutlook}
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1.5">
              <h4 className="font-bold text-emerald-300 uppercase tracking-wider text-[10px]">2. Trade Outlook</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                {currentCountry.aiIntelligence.tradeOutlook}
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1.5">
              <h4 className="font-bold text-purple-300 uppercase tracking-wider text-[10px]">3. Investment Outlook</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                {currentCountry.aiIntelligence.investmentOutlook}
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1.5">
              <h4 className="font-bold text-cyan-300 uppercase tracking-wider text-[10px]">4. Market Trends</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                {currentCountry.aiIntelligence.marketTrends}
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1.5">
              <h4 className="font-bold text-red-300 uppercase tracking-wider text-[10px]">5. Risk Signals</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                {currentCountry.aiIntelligence.riskSignals}
              </p>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1.5">
              <h4 className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">6. Business Opportunities</h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                {currentCountry.aiIntelligence.businessOpportunities}
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
            <span className="text-[11px] text-slate-300 font-medium">
              Want custom corporate risk simulations or deep predictive tariffs?
            </span>
            <button
              onClick={() => handleTriggerProUpgrade("Full AI Country Intelligence Suite")}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" /> Unlock Full AI Intelligence
            </button>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 16 — PREMIUM COUNTRY REPORTS
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Section 16 · Premium Country Reports
              </h2>
            </div>
            <span className="text-[10px] text-gray-400 font-semibold">Analytical PDF Datapacks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentCountry.premiumReports.map((rep) => {
              const isPurchased = purchasedReportIds.includes(rep.id);
              return (
                <div
                  key={rep.id}
                  className="bg-gray-50/70 dark:bg-gray-900/70 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-500 transition-all space-y-4 group"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[8.5px] font-mono font-bold text-gray-400">
                      <span>{rep.code}</span>
                      <span className="text-amber-500 font-bold">{rep.rating}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[8px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 px-2 py-0.5 rounded">
                        {rep.type}
                      </span>
                      <span className="text-[8px] text-gray-400 font-medium">{rep.pages}</span>
                    </div>

                    <h3 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                      {rep.title}
                    </h3>

                    <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                      {rep.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <span className="font-display text-sm font-bold text-gray-900 dark:text-white">
                      {rep.price}
                    </span>

                    {isPurchased ? (
                      <span className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4" /> Download Ready
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setPurchasedReportIds((prev) => [...prev, rep.id]);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9.5px] font-bold px-3.5 py-1.5 rounded-lg transition-colors shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="h-3 w-3" /> Unlock Report
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 17 — UPGRADE / CONVERSION SECTION (Clear B2B Tiers)
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-slate-900 via-[#0f1d38] to-slate-950 text-white rounded-3xl p-6 md:p-10 border border-slate-800 shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest">
              Section 17 · Revenue &amp; Enterprise Acceleration
            </span>
            <h2 className="font-display text-xl md:text-3xl font-extrabold text-white">
              Unlock Complete Country Intelligence
            </h2>
            <p className="text-slate-300 text-xs md:text-sm font-normal">
              From free macro news to executive buyer lead vaults and AI risk telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
            {/* Free */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Free / Registered</h4>
                <div className="text-xl font-extrabold text-white">$0</div>
                <ul className="space-y-2 text-[11px]">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Basic Country Snapshot</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Public Country News Feed</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Basic Trade Metrics Overview</li>
                </ul>
              </div>
              <button
                disabled
                className="w-full text-center bg-white/10 text-white font-bold text-xs py-2 rounded-xl"
              >
                Current Plan
              </button>
            </div>

            {/* Pro */}
            <div className="p-5 rounded-2xl border-2 border-blue-500 bg-blue-600/10 space-y-3 flex flex-col justify-between relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl uppercase">
                Most Popular
              </span>
              <div className="space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1">
                  <Crown className="h-4 w-4 text-amber-400" /> Verified Pro
                </h4>
                <div className="text-xl font-extrabold text-white">$99 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
                <ul className="space-y-2 text-[11px] font-medium text-white">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Full B2B Buyer Leads with Contacts</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Complete AI Country Intelligence</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Advanced Risk Alerts &amp; Custom Rules</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Historical Trade Data &amp; Export Maps</li>
                </ul>
              </div>
              <button
                onClick={() => handleTriggerProUpgrade("Verified Country Pro Plan")}
                className="w-full text-center bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 rounded-xl shadow-md cursor-pointer transition-all"
              >
                Upgrade to Pro
              </button>
            </div>

            {/* Enterprise */}
            <div className="p-5 rounded-2xl border border-white/10 bg-white/5 space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider">Enterprise &amp; Multi-Country</h4>
                <div className="text-xl font-extrabold text-white">Custom Pricing</div>
                <ul className="space-y-2 text-[11px]">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> 195-Country Full Data API Access</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Multi-Seat Team Workspaces</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-400" /> Dedicated Trade Analyst Consulting</li>
                </ul>
              </div>
              <Link
                href="/eoi"
                className="block text-center w-full bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs py-2 rounded-xl transition-all"
              >
                Contact Enterprise
              </Link>
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 18 — RELATED COUNTRIES (Bilateral Links)
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-3">
            <div className="flex items-center gap-2">
              <Globe className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Section 18 · Related Bilateral Partner Countries
              </h2>
            </div>
            <Link
              href="/en/news-poc/country-news/all"
              className="text-[10px] font-bold text-blue-600 hover:underline"
            >
              Explore 195 Bilateral Corridors →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {currentCountry.relatedCountries.map((rel, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-50/80 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 text-center space-y-2 hover:border-blue-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl block mb-1">{rel.flag}</span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{rel.name}</h4>
                  <p className="text-[10px] text-blue-600 font-bold mt-1">{rel.tradeVolume}</p>
                  <span className="text-[8.5px] font-bold text-emerald-500">{rel.growth}</span>
                </div>
                <button
                  onClick={() => {
                    if (COUNTRY_INTELLIGENCE_DATABASE[rel.name]) {
                      setSelectedCountryName(rel.name);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                  className="mt-2 text-[9.5px] font-bold text-blue-600 hover:underline cursor-pointer"
                >
                  Explore Country →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ───────────────────────────────────────────────────────────────────
            SECTION 19 — COUNTRY NEWSLETTER & ALERTS (Final Engagement)
        ─────────────────────────────────────────────────────────────────── */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 md:p-10 shadow-xl space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-white/15 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
              <Mail className="h-3.5 w-3.5" /> Section 19 · Intelligence Dispatch
            </div>
            <h2 className="font-display text-xl md:text-3xl font-extrabold text-white">
              Get Your {currentCountry.name} Intelligence Brief
            </h2>
            <p className="text-white/80 text-xs md:text-sm">
              Receive concise, data-driven daily or weekly briefings on trade policy, macroeconomic movements, and high-margin leads.
            </p>
          </div>

          <form onSubmit={handleSubscribeNewsletter} className="max-w-xl mx-auto space-y-4">
            {/* Cadence Selection */}
            <div className="flex justify-center gap-3 text-xs font-bold">
              <label className="flex items-center gap-1.5 bg-white/10 px-4 py-1.5 rounded-xl cursor-pointer">
                <input
                  type="radio"
                  name="cadence"
                  value="daily"
                  checked={newsletterCadence === "daily"}
                  onChange={() => setNewsletterCadence("daily")}
                  className="text-blue-600 cursor-pointer"
                />
                <span>Daily Intelligence Brief</span>
              </label>
              <label className="flex items-center gap-1.5 bg-white/10 px-4 py-1.5 rounded-xl cursor-pointer">
                <input
                  type="radio"
                  name="cadence"
                  value="weekly"
                  checked={newsletterCadence === "weekly"}
                  onChange={() => setNewsletterCadence("weekly")}
                  className="text-blue-600 cursor-pointer"
                />
                <span>Weekly Executive Digest</span>
              </label>
            </div>

            {/* Topic Selectors */}
            <div className="flex flex-wrap justify-center gap-2 text-[10px] font-semibold">
              {["Trade", "Economy", "Investment", "Companies", "Risk", "Industry"].map((topic) => {
                const isSelected = selectedNewsletterTopics.includes(topic);
                return (
                  <button
                    type="button"
                    key={topic}
                    onClick={() => {
                      setSelectedNewsletterTopics((prev) =>
                        isSelected ? prev.filter((t) => t !== topic) : [...prev, topic]
                      );
                    }}
                    className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      isSelected
                        ? "bg-white text-blue-700 font-bold shadow-xs"
                        : "bg-white/15 text-white hover:bg-white/25"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "} {topic}
                  </button>
                );
              })}
            </div>

            {/* Email Input & Subscribe Button */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <input
                type="email"
                required
                placeholder="Enter your corporate email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 text-xs outline-none shadow-xs"
              />
              <button
                type="submit"
                className="bg-gray-950 hover:bg-gray-900 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </div>

            {newsletterSubscribed && (
              <div className="p-3 bg-white/20 rounded-xl text-center text-xs font-bold animate-in fade-in">
                ✓ Thank you! You are now subscribed to {currentCountry.name}'s {newsletterCadence} intelligence brief.
              </div>
            )}
          </form>
        </section>

      </main>

      {/* ───────────────────────────────────────────────────────────────────
          PRO UPGRADE MODAL
      ─────────────────────────────────────────────────────────────────── */}
      {isProModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="h-5 w-5 text-amber-500" /> Unlock {proModalFeature}
              </h4>
              <button
                onClick={() => setIsProModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-4 text-xs text-gray-600 dark:text-slate-300">
              <p className="leading-relaxed">
                Gain instant executive access to complete buyer contact records, unredacted AI predictive models, and real-time custom tariff alert feeds for {currentCountry.name}.
              </p>

              <div className="p-4 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/30 rounded-2xl space-y-2">
                <h5 className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest text-[9.5px]">
                  Included in Verified Pro
                </h5>
                <ul className="space-y-1.5 font-medium text-[11px]">
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> Unrestricted B2B Trade Lead &amp; Buyer Contacts</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> Full 6-Dimension AI Country Risk Intelligence</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> Tariff Phase-Out Schedules &amp; Concession Calculator</li>
                  <li className="flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-emerald-500" /> Free Monthly Analytical Report PDF Downloads</li>
                </ul>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsProModalOpen(false)}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-slate-300 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsProUser(true);
                    setIsProModalOpen(false);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  Activate Pro ($99/mo)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────
          CUSTOM ALERTS CONFIGURATION MODAL
      ─────────────────────────────────────────────────────────────────── */}
      {activeAlertsModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Bell className="h-4.5 w-4.5 text-blue-600" /> Set {currentCountry.name} Alerts
              </h4>
              <button
                onClick={() => {
                  setActiveAlertsModalOpen(false);
                  setCustomAlertsSaved(false);
                }}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {customAlertsSaved ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
                <h5 className="text-xs font-bold text-gray-900 dark:text-white">Alert Preferences Saved!</h5>
                <p className="text-[11px] text-gray-500 leading-normal">
                  You will receive real-time notifications for your chosen alert triggers.
                </p>
                <button
                  onClick={() => {
                    setActiveAlertsModalOpen(false);
                    setCustomAlertsSaved(false);
                  }}
                  className="mt-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-slate-300 font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <p className="text-gray-600 dark:text-slate-300 leading-relaxed font-normal">
                  Choose specific operational indicators to monitor for {currentCountry.name}:
                </p>
                {[
                  "New Bilateral B2B Procurement Leads",
                  "Macroeconomic GDP & Inflation Shifts",
                  "Port & Maritime Freight Rate Surcharges",
                  "Customs Tariff & Accord Policy Updates",
                  "Major FDI & Factory Groundbreakings"
                ].map((alertOption, idx) => (
                  <label
                    key={idx}
                    className="p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 flex items-center justify-between cursor-pointer hover:border-blue-400"
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">{alertOption}</span>
                    <input
                      type="checkbox"
                      defaultChecked={idx < 3}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 cursor-pointer"
                    />
                  </label>
                ))}

                <div className="flex justify-end gap-2 pt-3">
                  <button
                    onClick={() => setActiveAlertsModalOpen(false)}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-slate-300 font-bold text-xs px-4 py-2 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setCustomAlertsSaved(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-xl shadow-xs cursor-pointer"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ───────────────────────────────────────────────────────────────────
          TRADE LEAD DETAIL MODAL
      ─────────────────────────────────────────────────────────────────── */}
      {selectedTradeLeadDetail && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200 shadow-2xl">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{selectedTradeLeadDetail.buyerFlag}</span>
                <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 px-2 py-0.5 rounded uppercase">
                  {selectedTradeLeadDetail.buyerSector} Lead
                </span>
              </div>
              <button
                onClick={() => setSelectedTradeLeadDetail(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                {selectedTradeLeadDetail.title}
              </h3>

              <div className="p-3.5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Estimated Demand:</span>
                  <span className="font-bold text-emerald-600">{selectedTradeLeadDetail.estimatedDemand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Opportunity Score:</span>
                  <span className="font-bold text-blue-600">{selectedTradeLeadDetail.opportunityScore} / 100</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Requirement:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{selectedTradeLeadDetail.requirement}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-medium">Buyer Verification:</span>
                  <span className="font-bold text-emerald-500">✓ Verified Corporate Buyer</span>
                </div>
              </div>

              {/* Locked Pro Buyer Contact Area */}
              <div className="p-4 rounded-2xl border-2 border-blue-500/30 bg-blue-50/20 dark:bg-blue-950/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Buyer Contact &amp; RFP Documents
                  </span>
                  <span className="text-[9px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-600 px-2 py-0.5 rounded uppercase">
                    Pro Feature
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
                  Unlock direct procurement officer email, phone coordinates, and tender RFP documentation.
                </p>
                <button
                  onClick={() => {
                    setSelectedTradeLeadDetail(null);
                    handleTriggerProUpgrade("Direct Buyer Contact & RFP Tender Vault");
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl shadow-xs cursor-pointer"
                >
                  Unlock Buyer Contact Coordinates
                </button>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedTradeLeadDetail(null)}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-slate-300 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

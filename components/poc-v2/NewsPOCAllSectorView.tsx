"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Flame,
  Zap,
  Building,
  Users,
  Calendar,
  Lock,
  Mail,
  FileText,
  CheckCircle2,
  ThumbsUp,
  Bookmark,
  Share2,
  MessageSquare,
  Globe,
  Scale,
  DollarSign,
  Activity,
  Briefcase,
  AlertTriangle,
  FolderMinus,
  MapPin,
  Clock,
  BookOpen,
  Crown,
  Check,
  Star,
  Plus,
  Compass,
  Factory,
  BarChart2,
  ExternalLink,
  ShieldCheck,
  Eye,
  Filter,
  Layers,
  Sparkles,
  Award,
  Radio,
  ArrowUpRight,
  TrendingDown
} from "lucide-react";
import { IGEN_50_SECTORS, SectorTaxonomyItem } from "./igenTaxonomyData";

// ─────────────────────────────────────────────────────────────────────────────
// DATA TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface TrendingSectorCard {
  code: string;
  name: string;
  icon: string;
  growth: string;
  newsCount: string;
  engagement: string;
  trendVelocity: string;
  category: string;
}

interface FastGrowingSector {
  code: string;
  name: string;
  icon: string;
  cagrGrowth: string;
  marketOpportunity: "Very High" | "High" | "Strategic";
  investmentRunRate: string;
  catalyst: string;
}

interface EmergingIndustry {
  name: string;
  icon: string;
  growthPotential: string;
  marketOutlook: string;
  investmentActivity: string;
  parentSector: string;
}

interface SectorNewsArticle {
  id: string;
  sectorCode: string;
  sectorName: string;
  industry: string;
  headline: string;
  summary: string;
  whyItMatters: string;
  time: string;
  readTime: string;
  source: string;
  image: string;
  views: string;
  likes: number;
  category: "Policy" | "Investment" | "Trade" | "Technology" | "General";
}

interface SectorOpportunityItem {
  id: string;
  sector: string;
  type: "Export" | "Import" | "Investment" | "Government Scheme" | "Project";
  title: string;
  summary: string;
  targetMarket: string;
  score: number;
  isPremium?: boolean;
}

interface TopCompanyItem {
  id: string;
  name: string;
  logoText: string;
  sector: string;
  industry: string;
  growth: string;
  verified: boolean;
  latestActivity: string;
}

interface IndustryLeaderItem {
  id: string;
  name: string;
  role: string;
  company: string;
  sector: string;
  industry: string;
  influenceScore: number;
  avatarBg: string;
  initials: string;
}

interface PremiumSectorReport {
  id: string;
  title: string;
  code: string;
  sector: string;
  date: string;
  pages: string;
  price: string;
  rating: string;
  keyInsight: string;
  description: string;
}

interface SectorEventItem {
  id: string;
  title: string;
  sector: string;
  date: string;
  location: string;
  type: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATASETS & MOCK ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────

const CATEGORY_TAXONOMY_GROUPS = {
  Technology: ["S02", "S11", "S16", "S36", "S38", "S46", "S47"],
  Energy: ["S04", "S10", "S17", "S30", "S31", "S34"],
  Manufacturing: ["S07", "S08", "S24", "S28", "S37", "S45"],
  Healthcare: ["S05", "S06", "S23", "S32"],
  "Financial Services": ["S41", "S42"],
  Logistics: ["S09", "S33", "S43", "S44"],
  Consumer: ["S12", "S21", "S22", "S39", "S48"],
  Infrastructure: ["S26", "S49", "S50"],
  Agriculture: ["S01", "S03", "S19", "S20"],
  Services: ["S13", "S14", "S15", "S18", "S25", "S27", "S40"]
};

const TRENDING_SECTORS_DATA: TrendingSectorCard[] = [
  { code: "S46", name: "Semiconductors", icon: "⚙️", growth: "+38.4%", newsCount: "3.8k Stories", engagement: "94.2k views", trendVelocity: "+34% Today", category: "Technology" },
  { code: "S17", name: "Renewable Clean Energy", icon: "⚡", growth: "+31.0%", newsCount: "2.7k Stories", engagement: "82.5k views", trendVelocity: "+28% Today", category: "Energy" },
  { code: "S45", name: "EV & Electric Mobility", icon: "🚗", growth: "+26.3%", newsCount: "2.4k Stories", engagement: "71.0k views", trendVelocity: "+22% Today", category: "Manufacturing" },
  { code: "S02", name: "AI & Cyber Security", icon: "💻", growth: "+34.1%", newsCount: "3.1k Stories", engagement: "112.0k views", trendVelocity: "+36% Today", category: "Technology" },
  { code: "S13", name: "Defence & Aerospace", icon: "🛡️", growth: "+21.8%", newsCount: "2.1k Stories", engagement: "58.4k views", trendVelocity: "+19% Today", category: "Services" },
  { code: "S06", name: "Biotechnology & Pharma", icon: "💊", growth: "+22.5%", newsCount: "2.0k Stories", engagement: "64.8k views", trendVelocity: "+18% Today", category: "Healthcare" }
];

const FASTEST_GROWING_SECTORS: FastGrowingSector[] = [
  { code: "S46", name: "Semiconductors & Silicon Fabs", icon: "⚙️", cagrGrowth: "+38.2%", marketOpportunity: "Very High", investmentRunRate: "$14.2B Capex", catalyst: "India Semiconductor Mission Phase-2 PLI Subsidies" },
  { code: "S17", name: "Green Hydrogen & Cleantech", icon: "⚡", cagrGrowth: "+31.0%", marketOpportunity: "Very High", investmentRunRate: "$18.5B Capex", catalyst: "National SIGHT Mission & Maritime Ammonia Corridors" },
  { code: "S02", name: "Sovereign AI Compute Infrastructure", icon: "💻", cagrGrowth: "+34.1%", marketOpportunity: "Very High", investmentRunRate: "$8.4B Capex", catalyst: "IndiaAI Sovereign GPU Cluster Allocations" },
  { code: "S45", name: "Commercial EV Batteries & Swapping", icon: "🔋", cagrGrowth: "+26.3%", marketOpportunity: "High", investmentRunRate: "$6.8B Capex", catalyst: "Fleet Electrification Interoperability Mandates" }
];

const EMERGING_INDUSTRIES_DATA: EmergingIndustry[] = [
  { name: "Green Hydrogen & Ammonia", icon: "🌱", growthPotential: "+42.5% CAGR", marketOutlook: "Massive Global Off-Take", investmentActivity: "High Sovereign Grants", parentSector: "Energy & Sustainability (S17)" },
  { name: "Space Technology & Launchers", icon: "🚀", growthPotential: "+36.0% CAGR", marketOutlook: "Commercial Satellite Payloads", investmentActivity: "Rapid Venture FDI", parentSector: "Defence & Aerospace (S13)" },
  { name: "AI Robotics & Edge Automation", icon: "🤖", growthPotential: "+38.4% CAGR", marketOutlook: "Smart Factory Modernization", investmentActivity: "Tier-1 OEM Capex", parentSector: "AI & Cyber Security (S02)" },
  { name: "Quantum Computing & Cryptography", icon: "⚛️", growthPotential: "+48.0% CAGR", marketOutlook: "National Security & Banking", investmentActivity: "State R&D Allocations", parentSector: "Electronics & IT (S16)" },
  { name: "Carbon Capture & Sequestration", icon: "🍃", growthPotential: "+29.2% CAGR", marketOutlook: "CBAM Compliance Grids", investmentActivity: "Smelter Decarbonization", parentSector: "Energy & Sustainability (S17)" },
  { name: "EV Solid-State Battery Cathodes", icon: "🔋", growthPotential: "+44.1% CAGR", marketOutlook: "Next-Gen Range Breakthroughs", investmentActivity: "Battery Gigafactory JVs", parentSector: "Automotive & EV (S45)" },
  { name: "Semiconductor Glass Substrates", icon: "🔬", growthPotential: "+52.0% CAGR", marketOutlook: "High-Density AI Packaging", investmentActivity: "OSAT Cleanroom Capex", parentSector: "Semiconductors (S46)" },
  { name: "Synthetic Biology & Enzymes", icon: "🧬", growthPotential: "+33.5% CAGR", marketOutlook: "Green Chemical Replacements", investmentActivity: "Global Pharma Tie-ups", parentSector: "Biotechnology (S06)" }
];

const SECTOR_NEWS_FEED: SectorNewsArticle[] = [
  {
    id: "sn-1",
    sectorCode: "S46",
    sectorName: "Semiconductors",
    industry: "OSAT Silicon Packaging",
    headline: "Cabinet Clears $2.4B Semiconductor OSAT Incentive Grants for Gujarat Corridor",
    summary: "New high-density silicon packaging fabs receive fast-track state capex reimbursement and clean energy power guarantees, reducing dependence on East Asian packaging lines.",
    whyItMatters: "Directly improves supply availability of automotive microcontrollers and high-bandwidth memory for domestic hardware manufacturers.",
    time: "1 hour ago",
    readTime: "4 min read",
    source: "iGEN Tech Bureau",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=700&auto=format&fit=crop&q=80",
    views: "18.4k",
    likes: 380,
    category: "Investment"
  },
  {
    id: "sn-2",
    sectorCode: "S17",
    sectorName: "Energy & Sustainability",
    industry: "Green Hydrogen Pipelines",
    headline: "India-Germany Green Hydrogen Marine Corridors: Hamburg Inks First Dispatches",
    summary: "Direct containerized clean ammonia export routes scheduled under zero-emission standards, avoiding early European Carbon Border Adjustment Mechanism (CBAM) levies.",
    whyItMatters: "Enables Indian clean fuel producers to lock in long-term 15-year off-take agreements with European industrial conglomerates.",
    time: "3 hours ago",
    readTime: "6 min read",
    source: "Clean Energy Review",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&auto=format&fit=crop&q=80",
    views: "14.1k",
    likes: 295,
    category: "Trade"
  },
  {
    id: "sn-3",
    sectorCode: "S45",
    sectorName: "Automotive & EV",
    industry: "Commercial Fleet Batteries",
    headline: "Next-Gen Commercial EV Battery Interoperability Protocol Mandated for Freight Corridors",
    summary: "Standardized battery-swapping architecture deployed across 60 national freight routes, cutting logistics turnaround latency by 45%.",
    whyItMatters: "Lowers upfront capital expenditure for freight operators transitioning from diesel trucks to electric heavy haulers.",
    time: "5 hours ago",
    readTime: "5 min read",
    source: "Mobility Logistics Desk",
    image: "https://images.unsplash.com/photo-1558441719-8b89ec691456?w=700&auto=format&fit=crop&q=80",
    views: "11.8k",
    likes: 210,
    category: "Policy"
  },
  {
    id: "sn-4",
    sectorCode: "S02",
    sectorName: "AI & Cyber Security",
    industry: "Sovereign Datacenters",
    headline: "Sovereign AI Compute Park Launches 10,000 Liquid-Cooled GPU Cluster in Masdar & Bengaluru",
    summary: "Government-backed enterprise cloud infrastructure offers subsidized compute credits for B2B foundational model training.",
    whyItMatters: "Eliminates cross-border data sovereignty concerns for regulated banking, defense, and healthcare software systems.",
    time: "6 hours ago",
    readTime: "4 min read",
    source: "Enterprise Tech Wire",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80",
    views: "16.5k",
    likes: 340,
    category: "Technology"
  }
];

const SECTOR_OPPORTUNITIES_DATA: SectorOpportunityItem[] = [
  {
    id: "so-1",
    sector: "Renewable Clean Energy (S17)",
    type: "Export",
    title: "Green Ammonia Off-Take Contracts to Western Europe",
    summary: "Long-term procurement tenders opened by German heavy industry consortiums exempt from CBAM tariffs.",
    targetMarket: "Germany 🇩🇪 / EU Ports",
    score: 95,
    isPremium: false
  },
  {
    id: "so-2",
    sector: "Semiconductors & OSAT (S46)",
    type: "Investment",
    title: "High-Density Silicon Packaging & Substrate Fabrication Fabs",
    summary: "50% capital expenditure fiscal reimbursement plus single-window utility allocations in Dholera.",
    targetMarket: "India 🇮🇳 / Global JVs",
    score: 96,
    isPremium: true
  },
  {
    id: "so-3",
    sector: "Biotechnology & Pharma (S06)",
    type: "Export",
    title: "Specialized API & Biosimilars Procurement for UAE Healthcare Grids",
    summary: "CEPA preferential tariff lines allow zero-duty import of verified sterile injectable products into GCC hospitals.",
    targetMarket: "United Arab Emirates 🇦🇪",
    score: 93,
    isPremium: false
  },
  {
    id: "so-4",
    sector: "Automotive & EV (S45)",
    type: "Government Scheme",
    title: "Heavy Commercial Vehicle Battery Swapping Subsidies",
    summary: "Ministry of Heavy Industries capital grants covering 30% of battery charging depot construction costs.",
    targetMarket: "Domestic Freight Corridors",
    score: 91,
    isPremium: true
  }
];

const LEADING_COMPANIES_DATA: TopCompanyItem[] = [
  { id: "c-1", name: "Tata Electronics Pvt Ltd", logoText: "TE", sector: "Semiconductors (S46)", industry: "Silicon OSAT Packaging", growth: "+38.4%", verified: true, latestActivity: "Inaugurated 300mm substrate packaging fab in Sanand." },
  { id: "c-2", name: "Reliance Green Hydrogen Ltd", logoText: "RG", sector: "Energy & Sustainability (S17)", industry: "Clean Hydrogen Electrolyzers", growth: "+31.2%", verified: true, latestActivity: "Signed 5GW solar grid interconnectivity pact." },
  { id: "c-3", name: "Cipla Bio-Pharma Group", logoText: "CB", sector: "Biotechnology & Pharma (S06)", industry: "Sterile Injectable Biosimilars", growth: "+18.6%", verified: true, latestActivity: "Cleared US-FDA audit for sterile respiratory lines." },
  { id: "c-4", name: "Mahindra Electric Mobility Hubs", logoText: "ME", sector: "Automotive & EV (S45)", industry: "Commercial Fleet Powertrains", growth: "+26.1%", verified: true, latestActivity: "Deployed 200 heavy battery swapping stations." }
];

const INDUSTRY_LEADERS_DATA: IndustryLeaderItem[] = [
  { id: "l-1", name: "N. Chandrasekaran", role: "Executive Chairman", company: "Tata Sons", sector: "Semiconductors & Conglomerates", industry: "High-Tech Hardware", influenceScore: 99.4, avatarBg: "from-blue-600 to-indigo-700", initials: "NC" },
  { id: "l-2", name: "Dr. Ananya Varma", role: "Chief Scientific Officer", company: "BioVisions India", sector: "Biotechnology & Pharma", industry: "API Molecular Synthesis", influenceScore: 96.2, avatarBg: "from-purple-600 to-indigo-800", initials: "AV" },
  { id: "l-3", name: "Sunil Bharti Mittal", role: "Founder & Chairman", company: "Bharti Enterprises", sector: "Electronics & IT", industry: "Satellite & Telecom Rails", influenceScore: 97.8, avatarBg: "from-emerald-600 to-teal-800", initials: "SM" }
];

const PREMIUM_SECTOR_REPORTS: PremiumSectorReport[] = [
  {
    id: "psr-1",
    title: "India Semiconductor OSAT & Silicon Packaging Horizon 2026–2030",
    code: "REP-SEMI-IN-2026",
    sector: "Semiconductors (S46)",
    date: "August 2026 Edition",
    pages: "124 Pages",
    price: "$299",
    rating: "4.9 ★",
    keyInsight: "Substrate cleanroom capex projected to reduce East Asian packaging import reliance by 44% by 2028.",
    description: "Detailed roadmap of state fiscal incentives, clean water pipeline layouts, and foundry joint-venture matrices."
  },
  {
    id: "psr-2",
    title: "National Green Hydrogen SIGHT-2 Economics & Maritime Corridor Playbook",
    code: "REP-ENG-HYD-2026",
    sector: "Energy & Sustainability (S17)",
    date: "July 2026 Edition",
    pages: "98 Pages",
    price: "$249",
    rating: "4.9 ★",
    keyInsight: "Levelized Cost of Hydrogen (LCOH) hits $2.10/kg at Mundra and Kochi deepwater ports.",
    description: "Itemized analysis of electrolyzer capital costs, port bunkering terminals, and European CBAM exemption standards."
  },
  {
    id: "psr-3",
    title: "Sovereign AI Compute Infrastructure & Enterprise Datacenter Report",
    code: "REP-AI-GOV-2026",
    sector: "AI & Cyber Security (S02)",
    date: "August 2026 Edition",
    pages: "86 Pages",
    price: "$199",
    rating: "4.8 ★",
    keyInsight: "Subsidized government cloud GPU allocations cut foundational model training expenses by 60%.",
    description: "Audit of sovereign datacenter liquid cooling grids, power availability contracts, and regional compliance laws."
  }
];

const SECTOR_EVENTS_DATA: SectorEventItem[] = [
  { id: "se-1", title: "Semicon India International Expo & B2B Matchmaking 2026", sector: "Semiconductors", date: "Nov 12-14, 2026", location: "BIEC, Bengaluru, India", type: "Global Trade Fair" },
  { id: "se-2", title: "World Hydrogen & Cleantech Infrastructure Summit", sector: "Clean Energy", date: "Dec 03-05, 2026", location: "Bharat Mandapam, New Delhi", type: "Executive Summit" },
  { id: "se-3", title: "Next-Gen Commercial EV & Battery Logistics Forum", sector: "Automotive", date: "Jan 18-20, 2027", location: "Jio World Centre, Mumbai", type: "Industry Conference" }
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function NewsPOCAllSectorView() {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string>("All Sectors");
  const [selectedCategoryGroup, setSelectedCategoryGroup] = useState<string>("All");

  // News feed state
  const [newsTab, setNewsTab] = useState<string>("Latest");

  // Followed sectors state
  const [followedSectors, setFollowedSectors] = useState<string[]>(["S16", "S17", "S46"]);

  // Modals & Overlays
  const [selectedSectorModal, setSelectedSectorModal] = useState<SectorTaxonomyItem | null>(null);
  const [selectedNewsArticleModal, setSelectedNewsArticleModal] = useState<SectorNewsArticle | null>(null);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [proSuccess, setProSuccess] = useState(false);
  const [alertsEmail, setAlertsEmail] = useState("");
  const [alertsSuccess, setAlertsSuccess] = useState(false);

  // Toggle follow state
  const handleToggleFollow = (code: string) => {
    setFollowedSectors(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  // Helper to lookup category group
  const getSectorCategoryGroup = (code: string): string => {
    for (const [catName, codes] of Object.entries(CATEGORY_TAXONOMY_GROUPS)) {
      if (codes.includes(code)) return catName;
    }
    return "Services";
  };

  // Filter 50 sectors
  const filtered50Sectors = IGEN_50_SECTORS.filter(sec => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      sec.name.toLowerCase().includes(q) ||
      sec.code.toLowerCase().includes(q) ||
      sec.ministry.toLowerCase().includes(q);

    if (selectedCategoryGroup !== "All") {
      const group = getSectorCategoryGroup(sec.code);
      if (group !== selectedCategoryGroup) return false;
    }

    if (selectedQuickFilter === "Trending") {
      return matchesSearch && ["S46", "S17", "S02", "S45", "S13", "S06", "S16"].includes(sec.code);
    }
    if (selectedQuickFilter === "Fastest Growing") {
      return matchesSearch && ["S46", "S17", "S02", "S45", "S42", "S06"].includes(sec.code);
    }
    if (selectedQuickFilter === "Emerging") {
      return matchesSearch && ["S46", "S47", "S30", "S02", "S06", "S04"].includes(sec.code);
    }
    if (selectedQuickFilter === "Most Followed") {
      return matchesSearch && followedSectors.includes(sec.code);
    }

    return matchesSearch;
  });

  return (
    <div className="space-y-12">
      
      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 1. HERO / SECTOR DISCOVERY */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0c1020] via-[#0d132b] to-[#05070e] text-white rounded-3xl p-6 md:p-12 relative overflow-hidden border border-gray-800 shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        
        <div className="relative z-10 space-y-6 max-w-4xl">
          
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold bg-blue-600 px-3 py-1 rounded-full uppercase tracking-wider text-white flex items-center gap-1.5 shadow-xs">
              <Factory className="h-3 w-3" /> Sector Discovery Platform
            </span>
            <span className="text-xs text-slate-400 font-medium">50+ Sectors · 1,350+ Industries</span>
          </div>

          <div className="space-y-2">
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Explore 50+ Sectors & 1,350+ Industries
            </h1>
            <p className="text-slate-300 text-xs md:text-sm font-normal max-w-2xl leading-relaxed">
              Discover industry news, companies, leaders, market intelligence, business opportunities, and analytical reports across India's and the global economy.
            </p>
          </div>

          {/* Prominent Universal Search */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/15 shadow-2xl max-w-3xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search sector, industry, company or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 dark:bg-gray-900/80 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-xs md:text-sm text-white placeholder-slate-400 outline-none focus:border-blue-400 transition-all font-medium"
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-1">Quick Filters:</span>
            {["All Sectors", "Trending", "Fastest Growing", "Emerging", "Most Followed", "Recently Updated"].map((qf) => (
              <button
                key={qf}
                onClick={() => setSelectedQuickFilter(qf)}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  selectedQuickFilter === qf
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white/10 border border-white/10 text-slate-300 hover:bg-white/15"
                }`}
              >
                {qf}
              </button>
            ))}
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="#main-sector-directory"
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Compass className="h-4 w-4" /> Explore Sectors
            </a>
            <a
              href="#premium-reports-section"
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="h-4 w-4 text-blue-400" /> View Intelligence Reports
            </a>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 2. TRENDING SECTORS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-500 fill-amber-500" /> Trending Sectors
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Fastest-moving industries with high news velocity and investor engagement.</p>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold font-mono">Live Velocity</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {TRENDING_SECTORS_DATA.map((tr) => (
            <div
              key={tr.code}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-2xs hover:border-amber-500/60 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{tr.icon}</span>
                  <span className="text-[9px] font-bold text-amber-500 font-mono">{tr.trendVelocity}</span>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-gray-400 font-bold">{tr.code}</span>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                    {tr.name}
                  </h3>
                </div>

                <div className="text-[10px] space-y-0.5 pt-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-400">Growth:</span>
                    <span className="text-emerald-500 font-mono">{tr.growth}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>News:</span>
                    <span>{tr.newsCount}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                <button
                  onClick={() => {
                    const found = IGEN_50_SECTORS.find(s => s.code === tr.code);
                    if (found) setSelectedSectorModal(found);
                  }}
                  className="text-[10px] font-bold text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5"
                >
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 3. FASTEST GROWING SECTORS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" /> Fastest Growing Sectors
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">High CAGR momentum backed by state PLI capital grants and private FDI.</p>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold font-mono">Capex Inflows</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FASTEST_GROWING_SECTORS.map((fg) => (
            <div
              key={fg.code}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{fg.icon}</span>
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200/20 uppercase">
                    {fg.marketOpportunity}
                  </span>
                </div>

                <div>
                  <span className="text-[9px] font-mono text-gray-400 font-bold">{fg.code}</span>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-snug">{fg.name}</h3>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/60 p-2.5 rounded-xl text-[10px] space-y-1">
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-400">CAGR Growth:</span>
                    <span className="text-emerald-500 font-mono text-xs">{fg.cagrGrowth}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span className="text-gray-400">Run-Rate:</span>
                    <span className="text-blue-600 font-mono">{fg.investmentRunRate}</span>
                  </div>
                </div>

                <p className="text-[10.5px] text-gray-500 dark:text-gray-400 leading-relaxed italic">
                  "{fg.catalyst}"
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold">
                <button
                  onClick={() => setIsProModalOpen(true)}
                  className="text-[10px] text-emerald-600 hover:underline cursor-pointer"
                >
                  Explore Opportunity →
                </button>
                <button
                  onClick={() => setIsProModalOpen(true)}
                  className="text-[9px] text-gray-400 hover:text-blue-600 cursor-pointer"
                >
                  View Intel
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 4. MAIN SECTOR DIRECTORY (50+ SECTORS TAXONOMY) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section id="main-sector-directory" className="space-y-6">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h2 className="font-display text-lg md:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Factory className="h-5 w-5 text-blue-600" /> 50+ Sector Directory
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Master taxonomy aligned with Government of India ministries, DPIIT codes, and global trade classification systems.
              </p>
            </div>

            {/* Directory Overview Summary Badges */}
            <div className="flex items-center gap-3 text-xs font-mono font-bold text-gray-400">
              <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 px-3 py-1 rounded-xl border border-blue-200/20">
                50 Sectors
              </span>
              <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 px-3 py-1 rounded-xl border border-emerald-200/20">
                1,350+ Industries
              </span>
            </div>
          </div>

          {/* Category Group Filter Bar */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Filter by Category Group:</span>
            <div className="flex flex-wrap gap-2 text-xs">
              {["All", ...Object.keys(CATEGORY_TAXONOMY_GROUPS)].map((cg) => (
                <button
                  key={cg}
                  onClick={() => setSelectedCategoryGroup(cg)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    selectedCategoryGroup === cg
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-blue-500"
                  }`}
                >
                  {cg}
                </button>
              ))}
            </div>
          </div>

          {/* 50 Sector Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered50Sectors.map((sec) => {
              const catGroup = getSectorCategoryGroup(sec.code);
              const isFollowed = followedSectors.includes(sec.code);

              return (
                <div
                  key={sec.code}
                  className="bg-gray-50/60 dark:bg-gray-900/40 border border-gray-200/80 dark:border-gray-800 rounded-2xl p-4.5 hover:border-blue-500 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{sec.icon || "🏭"}</span>
                      <span className="text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded uppercase">
                        {catGroup}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-gray-400 font-bold block">{sec.code} · {sec.ministry}</span>
                      <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors mt-0.5">
                        {sec.name}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] pt-1 text-gray-500">
                      <div>
                        <span className="block text-gray-400">Industries:</span>
                        <span className="font-bold text-gray-800 dark:text-gray-200">{sec.count}</span>
                      </div>
                      <div>
                        <span className="block text-gray-400">Activity:</span>
                        <span className="font-bold text-blue-600">Active Feed</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between text-[10px] font-bold">
                    <button
                      onClick={() => handleToggleFollow(sec.code)}
                      className={`px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                        isFollowed
                          ? "bg-emerald-50 border-emerald-300 text-emerald-600 dark:bg-emerald-950/20"
                          : "border-gray-200 dark:border-gray-800 text-gray-400 hover:text-blue-600"
                      }`}
                    >
                      {isFollowed ? "Following ✓" : "+ Follow"}
                    </button>

                    <button
                      onClick={() => setSelectedSectorModal(sec)}
                      className="text-blue-600 hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      Explore Sector →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 6. EMERGING & FUTURE INDUSTRIES */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-600" /> Emerging & Future Industries
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Next-decade frontier technology domains, deeptech verticals, and commercial applications.</p>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold font-mono">Frontier Verticals</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {EMERGING_INDUSTRIES_DATA.map((em, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4.5 shadow-2xs hover:border-purple-500 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{em.icon}</span>
                  <span className="text-[9px] font-mono font-bold text-purple-600">{em.growthPotential}</span>
                </div>

                <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-snug">{em.name}</h3>

                <div className="text-[10px] space-y-1 text-gray-500">
                  <div>Outlook: <span className="font-bold text-gray-800 dark:text-gray-200">{em.marketOutlook}</span></div>
                  <div>Activity: <span className="font-bold text-blue-600">{em.investmentActivity}</span></div>
                  <div className="text-[9px] text-gray-400 italic pt-0.5">{em.parentSector}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                <button
                  onClick={() => setIsProModalOpen(true)}
                  className="text-[10px] font-bold text-purple-600 hover:underline cursor-pointer"
                >
                  Explore Industry →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 7. SECTOR INTELLIGENCE SNAPSHOT (EXECUTIVE TELEMETRY) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-blue-600" /> Sector Intelligence Snapshot (FY2026)
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Macro telemetry across market size, capital investments, and indexed companies.</p>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-500">Live Global Telemetry</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 text-center">
          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Market Size</span>
            <div className="text-xl font-black text-blue-600 mt-1">$115.4T</div>
            <span className="text-[9px] text-gray-400">Global Economy</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Global Trade</span>
            <div className="text-xl font-black text-emerald-600 mt-1">$34.2T</div>
            <span className="text-[9px] text-emerald-500 font-bold">+4.1% Annualized</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Investment</span>
            <div className="text-xl font-black text-purple-600 mt-1">$1.82T</div>
            <span className="text-[9px] text-gray-400">FDI Run-Rate</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Industries</span>
            <div className="text-xl font-black text-amber-500 mt-1">1,350+</div>
            <span className="text-[9px] text-gray-400">Granular Taxonomy</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">Companies</span>
            <div className="text-xl font-black text-indigo-600 mt-1">45K+</div>
            <span className="text-[9px] text-gray-400">Verified Enterprises</span>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-900/60 rounded-2xl border border-gray-150 dark:border-gray-800">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block">News Signals</span>
            <div className="text-xl font-black text-red-500 mt-1">80K+</div>
            <span className="text-[9px] text-emerald-500 font-bold">Real-time Ingestion</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 8. LATEST NEWS ACROSS SECTORS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" /> Latest News Across Sectors
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Real-time reporting across regulatory schemes, capital investments, and technology breakthroughs.</p>
          </div>

          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800 overflow-x-auto text-xs">
            {["Latest", "Breaking", "Trending", "Policy", "Investment", "Trade", "Technology"].map((tab) => (
              <button
                key={tab}
                onClick={() => setNewsTab(tab)}
                className={`px-3 py-1.5 font-bold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  newsTab === tab
                    ? "bg-white dark:bg-[#0f172a] text-blue-600 shadow-xs"
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SECTOR_NEWS_FEED.map((art) => (
            <div
              key={art.id}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs hover:border-blue-500 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-gray-900">
                  <img
                    src={art.image}
                    alt={art.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-white font-bold text-[9px] px-2 py-0.5 rounded">
                    {art.sectorName}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold">
                    <span>{art.industry}</span>
                    <span>{art.time}</span>
                  </div>

                  <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {art.headline}
                  </h3>

                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] font-bold">
                <span className="text-gray-400">{art.readTime}</span>
                <button
                  onClick={() => setSelectedNewsArticleModal(art)}
                  className="text-blue-600 hover:underline cursor-pointer"
                >
                  Read Story →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 9. SECTOR OPPORTUNITIES */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-emerald-600" /> Sector Opportunities & B2B Matchmaking
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Verified export corridors, government incentives, and procurement tenders.</p>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold font-mono">B2B Opportunities</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SECTOR_OPPORTUNITIES_DATA.map((opp) => (
            <div
              key={opp.id}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-emerald-500 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200/20 uppercase">
                    {opp.type}
                  </span>
                  {opp.isPremium && (
                    <span className="text-[8px] font-bold text-amber-500 flex items-center gap-0.5">
                      <Lock className="h-3 w-3" /> Pro Only
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-snug">{opp.title}</h3>
                <span className="text-[10px] text-blue-600 font-bold block">{opp.sector}</span>

                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  {opp.summary}
                </p>

                <div className="bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl text-[10px] space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Target Market:</span>
                    <span className="font-bold text-gray-800 dark:text-gray-200">{opp.targetMarket}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Opportunity Rating:</span>
                    <span className="font-mono font-bold text-emerald-500">{opp.score}/100</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-end">
                <button
                  onClick={() => setIsProModalOpen(true)}
                  className="text-[10px] font-bold text-emerald-600 hover:underline cursor-pointer"
                >
                  Explore Opportunity →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 10. LEADING COMPANIES BY SECTOR */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Building className="h-5 w-5 text-blue-600" /> Leading Companies Across Sectors
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Enterprise profiles with verified telemetry, Capex expansion, and hiring updates.</p>
          </div>
          <Link href="/en/eoi" className="text-xs font-bold text-blue-600 hover:underline">
            Promote / Verify Your Company →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LEADING_COMPANIES_DATA.map((comp) => (
            <div
              key={comp.id}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-blue-500 transition-all flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-xl bg-blue-600 text-white font-black text-xs flex items-center justify-center shadow-xs">
                    {comp.logoText}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-500 font-mono">{comp.growth}</span>
                </div>

                <div>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-tight">{comp.name}</h3>
                  <span className="text-[10px] text-gray-400">{comp.sector}</span>
                </div>

                <p className="text-[10.5px] text-gray-500 dark:text-gray-400 leading-relaxed italic">
                  "{comp.latestActivity}"
                </p>
              </div>

              <div className="pt-2.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px]">
                <button
                  onClick={() => setIsProModalOpen(true)}
                  className="font-bold text-gray-400 hover:text-blue-600 cursor-pointer"
                >
                  + Follow
                </button>
                <Link href="/en/poc-v2/company-news" className="font-bold text-blue-600 hover:underline">
                  View Company →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 11. INDUSTRY LEADERS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" /> Industry Leaders
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Visionaries, policy makers, and corporate chairs shaping key sector strategies.</p>
          </div>
          <Link href="/en/eoi" className="text-xs font-bold text-purple-600 hover:underline">
            Increase Your Professional Visibility →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INDUSTRY_LEADERS_DATA.map((lead) => (
            <div
              key={lead.id}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs hover:border-purple-500 transition-all flex items-center gap-4"
            >
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${lead.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md`}>
                {lead.initials}
              </div>

              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white">{lead.name}</h3>
                  <span className="text-[9px] font-mono font-bold text-purple-600 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded">
                    {lead.influenceScore} Score
                  </span>
                </div>
                <p className="text-[10px] text-gray-500">{lead.role}, {lead.company}</p>
                <span className="text-[9px] text-gray-400 block">{lead.sector}</span>

                <div className="pt-1 flex justify-end">
                  <Link href="/en/poc-v2/leader-news" className="text-[10px] font-bold text-blue-600 hover:underline">
                    View Profile →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 12. PREMIUM SECTOR INTELLIGENCE */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section id="premium-reports-section" className="space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
          <div>
            <h2 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" /> Featured Sector Intelligence
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">Authoritative market forecasts, supply chain risk matrices, and tariff outlook reports.</p>
          </div>
          <span className="text-[10px] text-gray-400 font-semibold font-mono">PDF Datapacks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PREMIUM_SECTOR_REPORTS.map((rep) => (
            <div
              key={rep.id}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs hover:border-blue-500 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-gray-400">
                  <span>{rep.code}</span>
                  <span className="text-amber-500">{rep.rating}</span>
                </div>

                <h3 className="font-bold text-xs md:text-sm text-gray-900 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                  {rep.title}
                </h3>

                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                  <span>{rep.pages}</span>
                  <span>•</span>
                  <span>{rep.date}</span>
                </div>

                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed">
                  {rep.description}
                </p>

                <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border-l-3 border-blue-600 rounded-r-xl text-[10.5px] text-gray-800 dark:text-slate-300 font-medium leading-relaxed">
                  <span className="font-bold text-blue-600 block text-[9px] uppercase tracking-wider">Key Takeaway</span>
                  {rep.keyInsight}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <span className="font-display text-base font-extrabold text-gray-900 dark:text-white">{rep.price}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsProModalOpen(true)}
                    className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer"
                  >
                    Preview
                  </button>
                  <Link
                    href="/en/eoi"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-1.5 rounded-xl shadow-xs flex items-center gap-1"
                  >
                    Buy Report
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 13. FOLLOW YOUR SECTORS (PERSONALIZED HUB) */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block">Personalized Sector Hub</span>
            <h2 className="font-display text-lg md:text-xl font-bold text-white mt-0.5">
              Follow the Sectors That Matter to You
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Configure automated digest alerts for high-priority policy shifts and Capex projects.
            </p>
          </div>

          <Link
            href="/en/poc-v2/sector-news/engagement"
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shrink-0 text-center"
          >
            View My Sector Feed →
          </Link>
        </div>

        {/* Active Followed Sectors Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {followedSectors.map((code) => {
            const sec = IGEN_50_SECTORS.find(s => s.code === code);
            if (!sec) return null;

            return (
              <div key={code} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{sec.icon || "🏭"}</span>
                  <span className="text-[9px] font-mono font-bold text-emerald-400">+14.2% Growth</span>
                </div>
                <h4 className="font-bold text-xs text-white">{sec.name}</h4>
                <div className="flex items-center justify-between text-[10px] text-slate-300 font-medium">
                  <span>18 New Stories</span>
                  <span className="text-amber-400 font-bold">2 Live Alerts</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 14 & 15. SECTOR EVENTS & SPONSORED SPOTLIGHT */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 14. Sector Events */}
        <section className="lg:col-span-7 space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" /> Upcoming Sector Events
            </h2>
            <Link href="/en/profile/events" className="text-[10px] font-bold text-blue-600 hover:underline">
              View All Events →
            </Link>
          </div>

          <div className="space-y-3">
            {SECTOR_EVENTS_DATA.map((ev) => (
              <div
                key={ev.id}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs flex items-center justify-between hover:border-purple-500 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950/40 text-purple-600">
                      {ev.type}
                    </span>
                    <span className="text-[10px] text-gray-400 font-medium">{ev.sector}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white">{ev.title}</h4>
                  <p className="text-[10px] text-gray-500">{ev.date} · {ev.location}</p>
                </div>

                <Link
                  href="/en/profile/events"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all shrink-0 ml-2 shadow-xs"
                >
                  Register
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 15. Sponsored Sector Spotlight */}
        <section className="lg:col-span-5 space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500" /> Sponsored Sector Spotlight
            </h2>
          </div>

          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-400/40 rounded-3xl p-5 space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold text-amber-600 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded uppercase tracking-wider">
                SPONSORED
              </span>
              <span className="text-[10px] text-gray-400 font-medium">Clean Energy & Hydrogen</span>
            </div>

            <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">
              Adani Green Energy — India's Renewable Mega-Grid Expansion
            </h3>

            <p className="text-[11px] text-gray-600 dark:text-slate-300 leading-relaxed font-normal">
              Expanding 30GW Khavda solar & wind park to deliver ultra-low levelized power costs for green hydrogen electrolysis and industrial exports.
            </p>

            <div className="pt-2 border-t border-amber-200/40 flex justify-end">
              <Link href="/en/eoi" className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1">
                Learn More →
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 16. NEWSLETTER / SECTOR ALERTS */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="max-w-xl mx-auto text-center space-y-2">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">Sector Intelligence Alerts</span>
          <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
            Never Miss an Industry Update
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            Get daily breaking sector policy shifts, weekly market forecasts, and new report notifications.
          </p>
        </div>

        {alertsSuccess ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-center space-y-1 max-w-md mx-auto">
            <h4 className="text-sm font-bold text-emerald-600">✓ Alerts Activated!</h4>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              Sector alerts will be dispatched directly to <strong>{alertsEmail}</strong>.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (alertsEmail.trim()) setAlertsSuccess(true);
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter corporate email for alerts..."
              value={alertsEmail}
              onChange={(e) => setAlertsEmail(e.target.value)}
              className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-xs text-gray-900 dark:text-white outline-none focus:border-blue-500 flex-1 font-medium"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer shrink-0"
            >
              Get Sector Alerts
            </button>
          </form>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* 17. PREMIUM CONVERSION BANNER */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl border border-slate-800 text-center space-y-6">
        <div className="max-w-2xl mx-auto space-y-3 relative z-10">
          <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10">
            Enterprise Tier
          </span>

          <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white">
            Go Beyond Sector News
          </h2>

          <p className="text-xs md:text-sm text-slate-300 font-normal leading-relaxed">
            Unlock deeper intelligence, forecasts, full industry reports, and verified export opportunities across the 50 sectors that matter to your business.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[10px] font-bold text-slate-200 pt-2">
            <div className="bg-white/5 p-2 rounded-xl border border-white/10">✓ Market Forecasts</div>
            <div className="bg-white/5 p-2 rounded-xl border border-white/10">✓ Industry Reports</div>
            <div className="bg-white/5 p-2 rounded-xl border border-white/10">✓ Export Opportunities</div>
            <div className="bg-white/5 p-2 rounded-xl border border-white/10">✓ AI-Powered Analysis</div>
          </div>

          <div className="pt-3 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsProModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md cursor-pointer"
            >
              Upgrade to Premium (14-Day Trial)
            </button>
            <Link
              href="/en/eoi"
              className="bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all"
            >
              View Enterprise Plans
            </Link>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* SECTOR QUICK-PREVIEW MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {selectedSectorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-lg w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedSectorModal.icon || "🏭"}</span>
                <div>
                  <span className="text-[10px] font-mono text-gray-400 font-bold">{selectedSectorModal.code}</span>
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white">{selectedSectorModal.name}</h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedSectorModal(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-xl space-y-1">
                <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block">Ministry Alignment</span>
                <p className="text-gray-800 dark:text-slate-200 font-semibold">{selectedSectorModal.ministry}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[10px]">
                <div className="bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl">
                  <span className="text-gray-400 block">Indexed Industries:</span>
                  <span className="font-bold text-gray-900 dark:text-white text-xs">{selectedSectorModal.count}</span>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl">
                  <span className="text-gray-400 block">Growth Momentum:</span>
                  <span className="font-bold text-emerald-500 text-xs">+14.8% YoY</span>
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Comprehensive sector tracking covering tier-1 OEMs, supply chain telemetry, and regulatory policy notices under {selectedSectorModal.ministry}.
              </p>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-between">
              <Link
                href="/en/poc-v2/sector-news/industry"
                className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-xl transition-all"
              >
                View Industries
              </Link>
              <Link
                href="/en/poc-v2/sector-news/intelligence"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-xs"
              >
                Explore Sector Intelligence →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────── */}
      {/* ARTICLE READER MODAL */}
      {/* ─────────────────────────────────────────────────────────────────── */}
      {selectedNewsArticleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl max-w-2xl w-full p-6 space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{selectedNewsArticleModal.sectorName} · {selectedNewsArticleModal.industry}</span>
                <span className="text-xs text-gray-400 block">{selectedNewsArticleModal.source} · {selectedNewsArticleModal.time}</span>
              </div>
              <button
                onClick={() => setSelectedNewsArticleModal(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white leading-snug">
                {selectedNewsArticleModal.headline}
              </h3>

              <img
                src={selectedNewsArticleModal.image}
                alt={selectedNewsArticleModal.headline}
                className="w-full h-56 object-cover rounded-2xl"
              />

              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedNewsArticleModal.summary}
              </p>

              <div className="p-4 bg-blue-50/60 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-xl space-y-1">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                  Why It Matters to Business
                </span>
                <p className="text-xs text-gray-800 dark:text-slate-200 font-semibold leading-relaxed">
                  {selectedNewsArticleModal.whyItMatters}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                onClick={() => setSelectedNewsArticleModal(null)}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
              >
                Close Story
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
                <Crown className="h-5 w-5 text-blue-600 animate-bounce" /> Upgrade to Sector Pro
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
                <h5 className="text-sm font-bold text-gray-900 dark:text-white">Pro Trial Active!</h5>
                <p className="text-xs text-gray-500 px-4 font-normal leading-normal">
                  Your 14-day Pro trial has been registered. Full sector forecasts, opportunity contacts, and intelligence PDF samples are unlocked.
                </p>
                <button
                  onClick={() => {
                    setIsProModalOpen(false);
                    setProSuccess(false);
                  }}
                  className="bg-blue-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
                >
                  Return to Directory
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-medium text-gray-600 dark:text-gray-300">
                <p className="text-xs leading-relaxed">
                  Unlock advanced sector forecasts, supplier lead reveals, priority whitepaper downloads, and custom alert digests.
                </p>
                <div className="p-3 bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/40 rounded-xl space-y-1.5">
                  <h5 className="font-bold text-blue-600 uppercase tracking-widest text-[9px]">Included Entitlements</h5>
                  <ul className="list-disc pl-4 space-y-1 text-[11px]">
                    <li>Full Sector Forecasts & Capex breakdowns unlocked</li>
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
                    onClick={() => setProSuccess(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer"
                  >
                    Confirm 14-Day Free Trial
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

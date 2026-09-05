"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  Crown,
  ArrowRight,
  ShieldCheck,
  Trophy,
  Sparkles,
  TrendingUp,
  Flame,
  Globe,
  Users,
  Award,
  Briefcase,
  MapPin,
  Network,
  Layers,
  Target,
  CheckCircle,
  Bell,
  Bookmark,
  Mail,
  FileText,
  Lock,
  Plus,
  Check,
  AlertTriangle,
  ChevronRight,
  HelpCircle,
  FileSpreadsheet
} from "lucide-react";

// ─── LOCAL PRIMITIVE COMPONENTS ──────────────────────────────────────────────

function Card({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ title, action, subtitle }: { title: string; action?: React.ReactNode; subtitle?: string }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 pb-3 mb-5 space-y-1">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">{title}</h2>
        {action}
      </div>
      {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 font-normal leading-relaxed">{subtitle}</p>}
    </div>
  );
}

function Badge({ children, color = "amber" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/40",
    indigo: "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-900/40",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/40",
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/40",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-900/40",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/40",
  };
  return (
    <span className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.amber}`}>
      {children}
    </span>
  );
}

// ─── MASTER LEADER DATASET ───────────────────────────────────────────────────

interface Leader {
  id: string;
  name: string;
  role: string;
  company: string;
  sector: string;
  industry: string;
  country: string;
  flag: string;
  followers: string;
  views: string;
  score: number;
  rank: number;
  featured?: boolean;
  rising?: boolean;
  trending?: boolean;
  verified?: boolean;
  recentlyJoined?: boolean;
  tags: string[];
  photo: string;
  category: "CEO" | "Founder" | "CFO" | "CTO" | "Chairman" | "Board Director";
  whyFeatured?: string;
  spotlightLabel?: string;
  achievements: string[];
  coverage: string[];
  interviews: string[];
}

const LEADER_DATA: Leader[] = [
  {
    id: "lead-1",
    name: "N. Chandrasekaran",
    role: "Chairman",
    company: "Tata Sons",
    sector: "Technology & Heavy Industry",
    industry: "Conglomerate & Tech",
    country: "India",
    flag: "🇮🇳",
    followers: "128.4K",
    views: "340.2K",
    score: 98,
    rank: 1,
    featured: true,
    verified: true,
    trending: true,
    tags: ["Sovereign AI", "Semiconductors", "Global Strategy"],
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    category: "Chairman",
    whyFeatured: "Leading Tata Group's historic $14B Sovereign AI infrastructure and semiconductor fabrication initiative in Gujarat.",
    spotlightLabel: "Leader of the Week",
    achievements: ["Commissioned Tata OSAT packaging facility in Dholera", "Led Tata-NVIDIA Sovereign AI alliance", "Spearheaded greenfield manufacturing projects"],
    coverage: ["Sovereign AI Infrastructure Keynote", "Bilateral Trade Accord Statement", "Semiconductor Fab Expansion Report"],
    interviews: ["Global C-Suite Policy Dialogue", "CEO Strategy Roundtable"]
  },
  {
    id: "lead-2",
    name: "Jensen Huang",
    role: "Founder & CEO",
    company: "NVIDIA Corp",
    sector: "Deep Tech & Computing",
    industry: "Semiconductors & AI",
    country: "United States",
    flag: "🇺🇸",
    followers: "245.8K",
    views: "520.1K",
    score: 97,
    rank: 2,
    featured: true,
    verified: true,
    trending: true,
    tags: ["GPU Clusters", "Enterprise AI", "Hardware"],
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    category: "CEO",
    whyFeatured: "Driving the global accelerated computing transition and deploying sovereign computing nodes across trade corridors.",
    spotlightLabel: "Corporate Leader Spotlight",
    achievements: ["Scaled GPU architecture to national scales", "Established sovereign compute guidelines", "Expanded enterprise AI software stacks"],
    coverage: ["Hardware Allocation Pact Outlines", "Bilateral technology partnership review", "Sovereign compute keynote"],
    interviews: ["GPU Supply Chain Roundtable", "Executive Advisory Panel Q&A"]
  },
  {
    id: "lead-3",
    name: "Mukesh Ambani",
    role: "Chairman & Managing Director",
    company: "Reliance Industries",
    sector: "Renewables & Infrastructure",
    industry: "Energy & Telecom",
    country: "India",
    flag: "🇮🇳",
    followers: "182.3K",
    views: "410.5K",
    score: 96,
    rank: 3,
    featured: true,
    verified: true,
    tags: ["Green Hydrogen", "5G Network", "Retail Scale"],
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&auto=format&fit=crop&q=80",
    category: "Chairman",
    whyFeatured: "Pioneering utility-scale green hydrogen projects and clean energy infrastructure at Jamnagar.",
    spotlightLabel: "Industry Spotlight",
    achievements: ["Commissioned 3 GW Hybrid Solar Grid", "Built India-wide 5G connectivity rails", "Pioneered retail M-commerce platform integration"],
    coverage: ["Clean Energy Infrastructure Investment Report", "Weekly retail scale briefing", "Green hydrogen SIGHT Phase 2 launch"],
    interviews: ["Fireside chat: Telecom expansion", "Clean energy future summit"]
  },
  {
    id: "lead-4",
    name: "Kiran Mazumdar-Shaw",
    role: "Executive Chairperson",
    company: "Biocon",
    sector: "Healthcare & Life Sciences",
    industry: "Healthcare and Biotechnology",
    country: "India",
    flag: "🇮🇳",
    followers: "98K",
    views: "210.3K",
    score: 94,
    rank: 5,
    featured: true,
    verified: true,
    tags: ["Biosimilars", "Biopharma", "Clinical Trials"],
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=320&auto=format&fit=crop&q=70",
    category: "Chairman",
    whyFeatured: "Expanding affordable biosimilar portfolios and clinical trials across global regulatory regions.",
    spotlightLabel: "Leadership Achievement",
    achievements: ["Advanced biosimilar regulatory clearances in US/EU", "Inaugurated biotechnology park", "Scaled local API production networks"],
    coverage: ["Affordable healthcare panel notes", "Biotechnology seed fund updates", "FDA clinical trial filings"],
    interviews: ["Biomedical export corridors", "C-suite development briefing"]
  },
  {
    id: "lead-5",
    name: "Ananya Sengupta",
    role: "Managing Director, South Asia",
    company: "Standard Chartered",
    sector: "Financial Services",
    industry: "Cross-Border Treasury",
    country: "Singapore",
    flag: "🇸🇬",
    followers: "42.8K",
    views: "128.4K",
    score: 93,
    rank: 6,
    rising: true,
    verified: true,
    tags: ["Green Treasury", "Digital Currency Rails", "ESG Liquidity"],
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&auto=format&fit=crop&q=80",
    category: "Board Director",
    achievements: ["Deployed $1.5B Green Trade Window for Asian Exporters", "Standardized digital corridor settling protocols", "Optimized treasury cash flow models"],
    coverage: ["Cross-border UPI corridors update", "Treasury liquidity analysis", "ESG corporate allocation review"],
    interviews: ["Bilateral trade finance dialogue", "Offshore banking scaling"]
  },
  {
    id: "lead-6",
    name: "Dr. Rajesh Grover",
    role: "Chief Technology Officer",
    company: "Adani Green Hydrogen",
    sector: "Energy & Utilities",
    industry: "Clean Tech & Renewables",
    country: "India",
    flag: "🇮🇳",
    followers: "31.5K",
    views: "98.2K",
    score: 91,
    rank: 8,
    rising: true,
    verified: true,
    tags: ["Electrolysers", "Green Ammonia", "Khavda Hub"],
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
    category: "CTO",
    achievements: ["Scaled electrolyser stack efficiency to 82% at Khavda", "Engineered green ammonia shipping logistics", "Secured grid synchronization approvals"],
    coverage: ["Khavda Renewable energy developments", "Electrolyser PLI allocations", "Green shipping corridor guidelines"],
    interviews: ["Tech innovation in hydrogen", "Grid integration panel"]
  },
  {
    id: "lead-7",
    name: "Elena Rostova",
    role: "Global Logistics Head",
    company: "Pacific Logistics Group",
    sector: "Transport & Trade",
    industry: "Multi-Modal Freight",
    country: "Germany",
    flag: "🇩🇪",
    followers: "24.1K",
    views: "72.4K",
    score: 90,
    rank: 9,
    rising: true,
    verified: true,
    tags: ["IMEC Transit Routes", "Automated Ports", "Carbon Taxes"],
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80",
    category: "Board Director",
    achievements: ["Secured 30% multimodal container space on IMEC corridor", "Automated cargo logistics trackers", "Optimized carbon tax compliance"],
    coverage: ["IMEC corridor shipping timelines", "National logistics policy impacts", "Maritime freight updates"],
    interviews: ["Supply chain reshoring trends", "Global freight corridors"]
  },
  {
    id: "lead-8",
    name: "Dr. Alok Verma",
    role: "Chief Scientific Officer",
    company: "Viksit Life Sciences",
    sector: "Healthcare & Life Sciences",
    industry: "Biotech & Genomics",
    country: "India",
    flag: "🇮🇳",
    followers: "12.8K",
    views: "34.1K",
    score: 88,
    rank: 15,
    rising: true,
    verified: true,
    tags: ["CRISPR", "Biosimilars", "Clinical Trials"],
    photo: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80",
    category: "CTO",
    achievements: ["Pioneered CRISPR gene-editing pipeline integration", "Launched clinical trial operations in India", "Patented molecular bio-compounds"],
    coverage: ["Genomics seed fund allocations", "Bilateral medical research accords", "API manufacturing index"],
    interviews: ["Future of biotech in APAC", "Sovereign biology systems"]
  }
];

const PREVENT_FAIL_ALERT = "Leadership rankings are temporarily unavailable.";

export default function TopLeaderPagesView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  
  // Rankings section tab & filter state
  const [rankingCategory, setRankingCategory] = useState<"followed" | "viewed" | "featured" | "active" | "recognized" | "rising" | "sector">("followed");
  const [rankingSector, setRankingSector] = useState("All");
  const [rankingCountry, setRankingCountry] = useState("All");
  const [rankingRole, setRankingRole] = useState("All");

  // Trending section time filter
  const [trendingTime, setTrendingTime] = useState<"Today" | "This Week" | "This Month">("This Week");

  // Watchlist state
  const [watchlist, setWatchlist] = useState<string[]>(["lead-1", "lead-2"]);
  const [watchlistToast, setWatchlistToast] = useState<string | null>(null);

  // Alerts configuration state
  const [alerts, setAlerts] = useState<Record<string, boolean>>({
    company_change: true,
    board_join: true,
    awards: true,
    news_mentions: false
  });
  const [alertSuccess, setAlertSuccess] = useState(false);

  // Comparison state
  const [comparedLeaders, setComparedLeaders] = useState<string[]>(["lead-1", "lead-2"]);

  // Section Failure simulation
  const [simulateRankingsFail, setSimulateRankingsFail] = useState(false);

  const toggleFollow = (id: string) => {
    setWatchlist((prev) => {
      const isExist = prev.includes(id);
      let nextList;
      if (isExist) {
        nextList = prev.filter((item) => item !== id);
        triggerToast("Removed from your watchlist.");
      } else {
        nextList = [...prev, id];
        triggerToast("Added to your watchlist!");
      }
      return nextList;
    });
  };

  const triggerToast = (msg: string) => {
    setWatchlistToast(msg);
    setTimeout(() => setWatchlistToast(null), 3000);
  };

  const toggleAlert = (type: string) => {
    setAlerts((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSaveAlerts = () => {
    setAlertSuccess(true);
    setTimeout(() => setAlertSuccess(false), 3000);
  };

  const toggleCompare = (id: string) => {
    setComparedLeaders((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], id]; // Keep maximum of 3
      }
      return [...prev, id];
    });
  };

  // FILTERING LOGIC
  const filteredLeaders = LEADER_DATA.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesRole = selectedRole === "All" || lead.category === selectedRole;
    const matchesSector = selectedSector === "All" || lead.sector.includes(selectedSector);
    const matchesCountry = selectedCountry === "All" || lead.country === selectedCountry;

    return matchesSearch && matchesRole && matchesSector && matchesCountry;
  });

  const featuredLeaderOfWeek = LEADER_DATA.find((l) => l.featured && l.spotlightLabel === "Leader of the Week") || LEADER_DATA[0];
  const featuredSpotlights = LEADER_DATA.filter((l) => l.featured && l.id !== featuredLeaderOfWeek.id);
  const topLeadersList = [...LEADER_DATA].sort((a, b) => a.rank - b.rank);

  // Sorting functions for Rankings Section
  const getSortedRankings = () => {
    let list = [...LEADER_DATA];
    // Filter rankings
    if (rankingSector !== "All") {
      list = list.filter(l => l.sector.includes(rankingSector));
    }
    if (rankingCountry !== "All") {
      list = list.filter(l => l.country === rankingCountry);
    }
    if (rankingRole !== "All") {
      list = list.filter(l => l.category === rankingRole);
    }

    switch (rankingCategory) {
      case "followed":
        return list.sort((a, b) => parseFloat(b.followers) - parseFloat(a.followers));
      case "viewed":
        return list.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
      case "featured":
        return list.filter(l => l.featured);
      case "active":
        return list.sort((a, b) => b.score - a.score);
      case "recognized":
        return list.filter(l => l.tags.includes("Global Strategy") || l.tags.includes("Sovereign AI"));
      case "rising":
        return list.filter(l => l.rising);
      case "sector":
        return list.sort((a, b) => a.sector.localeCompare(b.sector));
      default:
        return list;
    }
  };

  const rankingsToDisplay = getSortedRankings();

  // Trending Filter
  const getTrendingLeaders = () => {
    let list = LEADER_DATA.filter(l => l.trending || l.rising);
    if (trendingTime === "Today") {
      return list.slice(0, 2);
    }
    if (trendingTime === "This Week") {
      return list.slice(0, 4);
    }
    return list;
  };

  const trendingLeadersList = getTrendingLeaders();

  // Network Nodes definitions
  const activeNetworkLeader = LEADER_DATA[0]; // N. Chandrasekaran
  const networkConnections = [
    { label: "Chairman", details: "Tata Sons (Holding)" },
    { label: "Director", details: "Tata Electronics (Semiconductor)" },
    { label: "Connected Leader", details: "Jensen Huang (NVIDIA)" },
    { label: "Director", details: "Tata Steel (Industrial)" },
    { label: "Director", details: "Tata Motors (EV & Auto)" },
    { label: "Bilateral Node", details: "India Semiconductor Mission" }
  ];

  return (
    <div className="space-y-12">
      {/* Watchlist Toast Notification */}
      {watchlistToast && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#0f172a] text-white border border-gray-800 px-4 py-3 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-200 flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-semibold">{watchlistToast}</span>
        </div>
      )}

      {/* ── 01. ENTERPRISE HERO ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0b0f19] via-[#09152a] to-[#040814] text-white relative overflow-hidden rounded-3xl border border-gray-800 py-12 px-6 md:px-12 shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#3b82f6_1px,transparent_0)] [background-size:20px_20px]" />
        
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full bg-amber-950/40 inline-flex items-center gap-1.5 shadow-sm">
              <Crown className="h-3 w-3 text-amber-400" /> TOP LEADERS • CORPORATE • ENTERPRISE
            </span>
            <span className="text-[10px] font-semibold text-blue-200 bg-blue-900/30 border border-blue-700/40 px-2.5 py-0.5 rounded-full">
              Executive Discovery & Intelligence Hub
            </span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Discover the Leaders Shaping Business
          </h1>

          <p className="text-sm md:text-base text-gray-300 leading-relaxed max-w-2xl font-normal">
            Explore top executives, rising leaders, industry leaders, leadership rankings and emerging business personalities across sectors and markets.
          </p>

          {/* Search bar */}
          <div className="flex gap-3 flex-wrap pt-2">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl bg-white/5 border border-white/10 py-3 pl-10 pr-4 text-sm text-gray-200 outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 transition-all shadow-inner"
                placeholder="Search leader, company, sector, country or role..."
                aria-label="Search leader, company, sector, country or role"
              />
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("top-leaders-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shrink-0 shadow-md flex items-center gap-1"
            >
              <span>Explore Top Leaders</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("compare-leaders-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shrink-0 backdrop-blur-sm"
            >
              Compare Leaders
            </button>
          </div>

          {/* Quick Anchor Jumps */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10 overflow-x-auto text-[10px]">
            <span className="text-gray-400 font-semibold uppercase shrink-0 py-1">Jump to:</span>
            {[
              { label: "Snapshot", id: "snapshot-section" },
              { label: "Featured", id: "featured-section" },
              { label: "Rankings", id: "rankings-section" },
              { label: "Rising", id: "rising-section" },
              { label: "Trending", id: "trending-section" },
              { label: "Network", id: "network-section" },
              { label: "Compare", id: "compare-leaders-section" },
              { label: "Collections", id: "collections-section" },
              { label: "Reports", id: "reports-section" }
            ].map(item => (
              <button
                key={item.label}
                onClick={() => {
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-2.5 py-1 rounded bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition-all font-medium border border-white/5"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 02. EXECUTIVE INTELLIGENCE SNAPSHOT ─────────────────────────────── */}
      <section id="snapshot-section" className="space-y-4">
        <SectionTitle
          title="Global Leadership Snapshot"
          subtitle="Real platform metrics tracking verified corporate executives across global trade corridors."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {[
            { label: "Verified Leaders", val: "2,840 CXOs", color: "text-blue-600 dark:text-blue-400" },
            { label: "Companies Represented", val: "1,150 Firms", color: "text-amber-500" },
            { label: "Sectors Covered", val: "50 Sectors", color: "text-purple-500" },
            { label: "Countries Covered", val: "120 Markets", color: "text-emerald-500" },
            { label: "Rising Leaders", val: "34 Figures", color: "text-rose-500" },
            { label: "Trending Leaders", val: "18 Execs", color: "text-indigo-500" },
            { label: "Executive Movements", val: "32 Today", color: "text-cyan-500" },
            { label: "Leadership Categories", val: "12 Groups", color: "text-teal-500" }
          ].map((metric) => (
            <Card key={metric.label} className="p-4 flex flex-col justify-between text-center min-h-[90px] border border-gray-150 dark:border-gray-800">
              <span className={`font-mono text-sm md:text-base font-bold tracking-tight ${metric.color}`}>
                {metric.val}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mt-2 block leading-none">
                {metric.label}
              </span>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 03. FEATURED LEADERS ────────────────────────────────────────────── */}
      <section id="featured-section" className="space-y-4">
        <SectionTitle
          title="Featured Leaders"
          subtitle="Curated showcases highlighting key executive milestones, board expansions, and technological leadership."
          action={<Badge color="amber">Editor's Spotlight</Badge>}
        />

        {/* Highlight Leader of the Week Box */}
        <Card className="p-6 bg-gradient-to-br from-[#0e1629] via-[#090f1e] to-black text-white border-blue-900/40 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Info: Avatar, Verified Badge */}
            <div className="lg:col-span-4 flex items-center gap-4">
              <div className="relative">
                <img
                  src={featuredLeaderOfWeek.photo}
                  alt={featuredLeaderOfWeek.name}
                  className="h-20 w-20 rounded-2xl object-cover border-2 border-amber-400 shadow-lg shrink-0"
                />
                <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-900 font-bold text-[8px] px-1.5 py-0.5 rounded shadow">
                  ★ WEEK
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-display text-base font-bold text-white leading-tight">{featuredLeaderOfWeek.name}</h3>
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                </div>
                <p className="text-xs text-blue-300 font-semibold">{featuredLeaderOfWeek.role}</p>
                <p className="text-[10px] text-gray-400 font-medium">
                  {featuredLeaderOfWeek.flag} {featuredLeaderOfWeek.country} · {featuredLeaderOfWeek.company}
                </p>
              </div>
            </div>

            {/* Middle Info: Why Featured & Tags */}
            <div className="lg:col-span-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-6">
              <div className="space-y-2 flex-1">
                <span className="text-[9px] text-amber-400 uppercase tracking-widest font-bold">Why Featured:</span>
                <p className="text-xs text-gray-300 leading-relaxed font-normal">
                  {featuredLeaderOfWeek.whyFeatured}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {featuredLeaderOfWeek.tags.map(t => (
                    <span key={t} className="text-[8px] bg-white/10 text-blue-200 px-2 py-0.5 rounded border border-white/10">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button: Explore Leader -> Existing Profile */}
              <div className="shrink-0 flex flex-col items-end gap-1.5">
                <Link
                  href="/eoi"
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shadow-sm whitespace-nowrap inline-flex items-center gap-1"
                >
                  <span>Explore Leader</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
                <span className="text-[9px] text-gray-400">{featuredLeaderOfWeek.followers} followers</span>
              </div>
            </div>

          </div>
        </Card>

        {/* Small Featured cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredSpotlights.map((lead) => (
            <Card key={lead.id} className="p-4 hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <img src={lead.photo} alt={lead.name} className="h-10 w-10 rounded-xl object-cover border border-gray-200 dark:border-gray-800" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{lead.name}</h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-0.5">{lead.role}</p>
                    </div>
                  </div>
                  <Badge color="purple">{lead.spotlightLabel}</Badge>
                </div>

                <p className="text-[11px] text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                  {lead.whyFeatured}
                </p>

                <div className="flex flex-wrap gap-1">
                  {lead.tags.map(t => (
                    <span key={t} className="text-[8px] bg-gray-155 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="font-semibold text-blue-600 dark:text-blue-400">Score: {lead.score}</span>
                <Link href="/eoi" className="text-xs font-bold text-gray-900 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 inline-flex items-center gap-0.5">
                  <span>Explore Leader</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 04. TOP LEADERS ─────────────────────────────────────────────────── */}
      <section id="top-leaders-section" className="space-y-4">
        <SectionTitle
          title="Top Leaders"
          subtitle="Enterprise corporate listings sorted by organizational governance levels."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Top CEOs & Founders", category: "CEO", icon: Crown },
            { label: "Top Chairmen & Presidents", category: "Chairman", icon: Trophy },
            { label: "Top Executive Directors", category: "Board Director", icon: Users }
          ].map((group) => {
            const groupLeaders = topLeadersList.filter((l) => l.category === group.category || (group.category === "CEO" && l.category === "Founder"));
            return (
              <Card key={group.label} className="p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-800 pb-2">
                  <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                    <group.icon className="h-4 w-4 text-amber-500" />
                    <span>{group.label}</span>
                  </h3>
                  <Badge color="blue">{groupLeaders.length} Figures</Badge>
                </div>

                <div className="space-y-3">
                  {groupLeaders.map((lead) => (
                    <div key={lead.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 hover:border-blue-400 transition-colors">
                      <div className="flex items-center gap-2">
                        <img src={lead.photo} alt={lead.name} className="h-8 w-8 rounded-lg object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{lead.name}</h4>
                          <span className="text-[9px] text-gray-400 font-semibold">{lead.company}</span>
                        </div>
                      </div>
                      <Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline shrink-0">
                        View Leader →
                      </Link>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* ── 05. LEADER RANKINGS ─────────────────────────────────────────────── */}
      <section id="rankings-section" className="space-y-4">
        <Card className="p-6">
          <SectionTitle
            title="Global Leadership Rankings"
            subtitle="Transparent leadership ratings computed from activity, followed metrics, and verified corporate citations."
            action={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSimulateRankingsFail(!simulateRankingsFail)}
                  className="text-[9px] border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-red-500 px-2 py-0.5 rounded font-mono"
                >
                  {simulateRankingsFail ? "Simulate Success" : "Simulate Fail"}
                </button>
                <Badge color="blue">Updated Weekly</Badge>
              </div>
            }
          />

          {simulateRankingsFail ? (
            /* Fail state option */
            <div className="flex flex-col items-center justify-center p-8 bg-red-500/5 border border-red-500/10 rounded-2xl text-center space-y-3">
              <AlertTriangle className="h-6 w-6 text-red-500" />
              <p className="text-xs text-red-700 dark:text-red-400 font-semibold">{PREVENT_FAIL_ALERT}</p>
              <button
                onClick={() => setSimulateRankingsFail(false)}
                className="bg-red-500 text-white font-bold text-[10px] px-4 py-1.5 rounded-lg hover:bg-red-600 transition-colors"
              >
                Retry →
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Category selector */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs border-b border-gray-100 dark:border-gray-800">
                {[
                  { label: "Most Followed", val: "followed" },
                  { label: "Most Viewed", val: "viewed" },
                  { label: "Most Featured", val: "featured" },
                  { label: "Most Active", val: "active" },
                  { label: "Most Recognized", val: "recognized" },
                  { label: "Rising Leaders", val: "rising" },
                  { label: "Sector Leaders", val: "sector" }
                ].map((cat) => (
                  <button
                    key={cat.val}
                    onClick={() => setRankingCategory(cat.val as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 ${
                      rankingCategory === cat.val
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-500 hover:text-blue-600 dark:text-gray-400"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Advanced multi-filters */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-gray-50 dark:bg-[#070b12] p-4 rounded-xl border border-gray-150 dark:border-gray-800">
                {/* Sector filter */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Sector</label>
                  <select
                    value={rankingSector}
                    onChange={(e) => setRankingSector(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 outline-none"
                  >
                    <option value="All">All Sectors</option>
                    <option value="Technology">Technology</option>
                    <option value="Deep Tech">Deep Tech</option>
                    <option value="Renewables">Renewables</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Transport">Transport</option>
                  </select>
                </div>

                {/* Country filter */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Country</label>
                  <select
                    value={rankingCountry}
                    onChange={(e) => setRankingCountry(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 outline-none"
                  >
                    <option value="All">All Countries</option>
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Germany">Germany</option>
                  </select>
                </div>

                {/* Role filter */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Role</label>
                  <select
                    value={rankingRole}
                    onChange={(e) => setRankingRole(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 outline-none"
                  >
                    <option value="All">All Roles</option>
                    <option value="CEO">CEO</option>
                    <option value="CTO">CTO</option>
                    <option value="Chairman">Chairman</option>
                    <option value="Board Director">Board Director</option>
                  </select>
                </div>

                {/* Time Period filter (mock) */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Time Period</label>
                  <select
                    className="w-full text-xs p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 outline-none"
                    disabled
                  >
                    <option>Weekly (Current)</option>
                    <option>Monthly (Archives)</option>
                    <option>Q3 (Historical)</option>
                  </select>
                </div>
              </div>

              {/* Rankings List */}
              {rankingsToDisplay.length > 0 ? (
                <div className="divide-y divide-gray-100 dark:divide-gray-800 border border-gray-150 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-[#0f172a]">
                  {rankingsToDisplay.map((lead, index) => {
                    const isFollowed = watchlist.includes(lead.id);
                    return (
                      <div key={lead.id} className="p-4 flex items-center justify-between gap-4 flex-wrap hover:bg-gray-55 dark:hover:bg-gray-900 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="font-display font-black text-sm text-gray-400 w-6 text-center">
                            #{index + 1}
                          </span>
                          <img src={lead.photo} alt={lead.name} className="h-9 w-9 rounded-lg object-cover" />
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-gray-900 dark:text-white text-xs">{lead.name}</span>
                              <span className="text-xs shrink-0" title={lead.country}>{lead.flag}</span>
                              {lead.verified && <CheckCircle className="h-3 w-3 text-blue-500" />}
                            </div>
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">
                              {lead.role} at <strong className="text-gray-700 dark:text-gray-300">{lead.company}</strong> · {lead.sector}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-xs">
                          <span className="text-[10px] font-mono text-gray-400">
                            {lead.followers} follows · {lead.views} views
                          </span>
                          <span className="font-display font-bold text-blue-600 dark:text-blue-400">
                            Score: {lead.score}
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleFollow(lead.id)}
                              className={`text-[9px] px-2 py-1 rounded transition-colors font-bold ${
                                isFollowed
                                  ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30"
                                  : "bg-blue-600 hover:bg-blue-500 text-white"
                              }`}
                            >
                              {isFollowed ? "✓ Followed" : "+ Follow"}
                            </button>
                            <Link href="/eoi" className="text-[9px] font-bold text-gray-500 hover:text-blue-600 hover:underline">
                              Profile →
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 text-xs text-gray-500">
                  No leaders are currently available.
                </div>
              )}

              {/* Methodology Explanation */}
              <div className="bg-blue-50/60 dark:bg-blue-950/10 p-4 rounded-xl border border-blue-100 dark:border-blue-900/40 text-[11px] text-gray-650 dark:text-gray-400 space-y-1 leading-relaxed">
                <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Methodology & Transparency Disclosure:</span>
                <p>
                  iGEN rankings are calculated using verified platform activity, engagement, visibility, board appointments, and other validated signals. Paid placement must never secretly manipulate organic rankings. Methodology is audited quarterly.
                </p>
              </div>
            </div>
          )}
        </Card>
      </section>

      {/* ── 06. RISING LEADERS & 07. TRENDING LEADERS ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 06. Rising Leaders */}
        <section id="rising-section" className="space-y-4">
          <Card className="p-5 h-full space-y-4">
            <SectionTitle
              title="Leaders to Watch"
              subtitle="Emerging business personalities experiencing significant growth in activity and platform citations."
              action={<Badge color="emerald">Rising Velocity</Badge>}
            />
            
            <div className="space-y-3">
              {LEADER_DATA.filter(l => l.rising).map((lead) => (
                <div key={lead.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3 hover:border-emerald-400 transition-colors">
                  <div className="flex items-center gap-3">
                    <img src={lead.photo} alt={lead.name} className="h-10 w-10 rounded-lg object-cover" />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{lead.name}</h4>
                        <Badge color="emerald">Rising</Badge>
                      </div>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{lead.role} · {lead.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFollow(lead.id)}
                      className={`text-[9px] px-2 py-1 rounded transition-colors font-bold ${
                        watchlist.includes(lead.id)
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                          : "bg-blue-600 text-white hover:bg-blue-500"
                      }`}
                    >
                      {watchlist.includes(lead.id) ? "✓ Watching" : "+ Watch"}
                    </button>
                    <Link href="/eoi" className="text-[10px] font-bold text-gray-500 hover:underline">
                      Explore →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* 07. Trending Leaders */}
        <section id="trending-section" className="space-y-4">
          <Card className="p-5 h-full space-y-4">
            <SectionTitle
              title="Trending Executives"
              subtitle="Leaders receiving significant search volume, comments, and citation mentions."
              action={
                <div className="flex gap-1 bg-gray-100 dark:bg-gray-955 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800">
                  {["Today", "This Week", "This Month"].map((time) => (
                    <button
                      key={time}
                      onClick={() => setTrendingTime(time as any)}
                      className={`px-2 py-1 rounded text-[9px] font-bold uppercase transition-all ${
                        trendingTime === time ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm" : "text-gray-400"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              }
            />

            <div className="space-y-3">
              {trendingLeadersList.length > 0 ? (
                trendingLeadersList.map((lead) => (
                  <div key={lead.id} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={lead.photo} alt={lead.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{lead.name}</h4>
                          <span className="text-[8px] bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-1.5 py-0.2 rounded font-bold">
                            🔥 Trending
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Views: {lead.views} · followers: {lead.followers}</p>
                      </div>
                    </div>
                    <Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline shrink-0">
                      Explore Leader →
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-gray-500">
                  No trending leadership data is currently available.
                </div>
              )}
            </div>
          </Card>
        </section>

      </div>

      {/* ── 08. LEADERS BY ROLE ─────────────────────────────────────────────── */}
      <section className="space-y-4">
        <Card className="p-5">
          <SectionTitle
            title="Explore Leaders by Role"
            subtitle="Search and filter executive figures based on primary governance titles."
          />

          <div className="flex flex-wrap gap-2.5">
            {[
              "All", "CEO", "CFO", "CTO", "COO", "CMO", "CIO", "CHRO", "Chairman", "Managing Director", "Founder", "Board Director"
            ].map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                  selectedRole === role
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-gray-50 dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-350 border-gray-200 dark:border-gray-800"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </Card>
      </section>

      {/* ── 09. LEADERS BY SECTOR ───────────────────────────────────────────── */}
      <section className="space-y-4">
        <Card className="p-5">
          <SectionTitle
            title="Top Leaders by Sector"
            subtitle="Cross-sector directories mapping C-suite portfolios to GoI ministries."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Technology & Software", code: "S38", count: "340 Leaders", top: "Jensen Huang (NVIDIA)" },
              { name: "Semiconductors & OSAT", code: "S46", count: "128 Leaders", top: "N. Chandrasekaran (Tata Sons)" },
              { name: "Energy & Renewables", code: "S30", count: "215 Leaders", top: "Dr. Rajesh Grover (Adani Green)" },
              { name: "Healthcare & Biotech", code: "S23", count: "190 Leaders", top: "Kiran Mazumdar-Shaw (Biocon)" },
              { name: "FinTech & Payments", code: "S42", count: "185 Leaders", top: "Ananya Sengupta (Standard Chartered)" },
              { name: "Logistics & Supply Chain", code: "S43", count: "142 Leaders", top: "Elena Rostova (Pacific Logistics)" }
            ].map((sec) => (
              <div key={sec.code} className="p-4 bg-gray-50 dark:bg-gray-950 rounded-xl border border-gray-150 dark:border-gray-855 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white">{sec.name}</h4>
                    <span className="text-[8px] font-mono bg-blue-50 dark:bg-blue-950/40 text-blue-600 px-1.5 py-0.2 rounded font-bold">
                      {sec.code}
                    </span>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">Total Monitored: <span className="font-semibold text-gray-750 dark:text-gray-300">{sec.count}</span></p>
                  <p className="text-[9px] text-gray-400 mt-0.5">Top Node: {sec.top}</p>
                </div>
                <Link
                  href="/en/poc-v2/leader-news/top/sector"
                  className="text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Explore Sector</span>
                  <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ── 10. LEADERS BY COUNTRY ──────────────────────────────────────────── */}
      <section className="space-y-4">
        <Card className="p-5">
          <SectionTitle
            title="Global Leadership Map"
            subtitle="Explore executive leadership activity mapped across key bilateral markets."
          />

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
            {[
              { country: "India", flag: "🇮🇳", count: "1,240 Leaders", top: "N. Chandrasekaran" },
              { country: "United States", flag: "🇺🇸", count: "890 Leaders", top: "Jensen Huang" },
              { country: "United Arab Emirates", flag: "🇦🇪", count: "290 Leaders", top: "ADQ C-Suite" },
              { country: "Germany", flag: "🇩🇪", count: "210 Leaders", top: "Elena Rostova" },
              { country: "Singapore", flag: "🇸🇬", count: "240 Leaders", top: "Ananya Sengupta" },
              { country: "United Kingdom", flag: "🇬🇧", count: "310 Leaders", top: "Standard Chartered Board" }
            ].map((c) => (
              <div key={c.country} className="p-3 bg-gray-50 dark:bg-gray-955 border border-gray-150 dark:border-gray-855 rounded-xl flex flex-col justify-between space-y-2 hover:border-blue-400 transition-colors">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{c.flag}</span>
                    <h5 className="text-[11px] font-bold text-gray-900 dark:text-white truncate">{c.country}</h5>
                  </div>
                  <span className="text-[9px] font-bold text-blue-600 block mt-1">{c.count}</span>
                  <span className="text-[8px] text-gray-400 block truncate">{c.top}</span>
                </div>
                <Link
                  href="/en/poc-v2/country-news/all"
                  className="text-[9px] font-bold text-blue-600 hover:underline pt-1 border-t border-gray-100 dark:border-gray-800"
                >
                  Explore Country →
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ── 11. LEADERS ON THE MOVE ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <Card className="p-5">
          <SectionTitle
            title="Leaders on the Move"
            subtitle="Focus on the C-suite people, board members, and directors transitioning roles."
            action={<Badge color="purple">Transitions</Badge>}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "Dr. Randhir Thakur", move: "Appointed CEO & MD", company: "Tata Electronics", prev: "President, Intel Foundry", date: "Today", badge: "New CEO" },
              { name: "Vikram Malhotra", move: "Elevated to Country Head & CEO", company: "Barclays India", prev: "Head of Corporate Banking", date: "Yesterday", badge: "Promotion" },
              { name: "Dr. Elena Vance", move: "Elected Independent Board Member", company: "Biocon Biologics", prev: "FDA Regulatory Consultant", date: "2 days ago", badge: "Board Appointment" },
              { name: "Suresh Narayanan", move: "Transitioned to Senior Board Advisor", company: "Nestlé South Asia", prev: "Chairman & MD", date: "Last week", badge: "Leadership Transition" }
            ].map((item, idx) => (
              <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-150 dark:border-gray-850 rounded-xl flex items-start gap-3 justify-between">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9px] font-black text-purple-600 uppercase bg-purple-50 dark:bg-purple-950 px-1.5 py-0.2 rounded shrink-0">
                      {item.badge}
                    </span>
                    <span className="text-[9px] text-gray-400 font-mono shrink-0">{item.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.name}</h4>
                  <p className="text-[10px] text-gray-655 dark:text-gray-300 font-semibold leading-none pt-0.5">
                    {item.move} at <span className="font-bold">{item.company}</span>
                  </p>
                  <p className="text-[9px] text-gray-400 truncate">Previous: {item.prev}</p>
                </div>
                <Link
                  href="/eoi"
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-755 dark:text-gray-300 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:border-purple-300 transition-all shrink-0"
                >
                  Explore Leader →
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ── 12. LEADERSHIP ACHIEVEMENTS ─────────────────────────────────────── */}
      <section className="space-y-4">
        <Card className="p-5">
          <SectionTitle
            title="Leadership Achievements"
            subtitle="Verified executive recognitions, awards, and corporate expansion milestones."
            action={<Badge color="amber">Achievements</Badge>}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "N. Chandrasekaran", award: "Global Industry Leadership Award 2026", details: "For pioneering local chip packaging OSAT lines.", tag: "Award Winners" },
              { name: "Dr. Rajesh Grover", award: "Clean Fuel Stack Innovator of the Year", details: "Scaled alkalines Stack to 82% efficiency at Khavda.", tag: "Achievement Leaders" },
              { name: "Kiran Mazumdar-Shaw", award: "Global Pharma Governance Fellow", details: "FDA clearance timelines accelerated for biosimilars.", tag: "Industry Icons" }
            ].map((ach, idx) => (
              <div key={idx} className="p-4 bg-gray-50 dark:bg-gray-955 border border-gray-150 dark:border-gray-855 rounded-xl flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <span className="text-[8px] bg-amber-50 dark:bg-amber-950/40 text-amber-600 px-2 py-0.5 rounded font-bold">
                    🏆 {ach.tag}
                  </span>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{ach.award}</h4>
                  <p className="text-[10px] text-gray-500 font-semibold">{ach.name}</p>
                  <p className="text-[10px] text-gray-400 leading-normal font-normal">{ach.details}</p>
                </div>
                <Link
                  href="/eoi"
                  className="text-[10px] font-bold text-amber-600 hover:underline inline-flex items-center gap-0.5"
                >
                  <span>Explore Leader</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* ── 13. LEADERSHIP NETWORK ──────────────────────────────────────────── */}
      <section id="network-section" className="space-y-4">
        <Card className="p-6">
          <SectionTitle
            title="Executive Connections (Premium Intelligence)"
            subtitle="Verified relationships, shared board representation, and strategic industry coordinates."
            action={<Badge color="purple">Boardroom Network</Badge>}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Interactive Tree Visualizer */}
            <div className="lg:col-span-8 bg-gray-55 dark:bg-[#070b12] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-4 relative min-h-[300px] flex flex-col justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_0)] opacity-10 [background-size:16px_16px]" />
              
              {/* Central Node */}
              <div className="flex flex-col items-center relative z-10">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-5 py-2.5 rounded-2xl shadow-lg border border-blue-500 text-center space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-blue-200">CENTRAL NODE</span>
                  <h4 className="text-xs font-bold">{activeNetworkLeader.name}</h4>
                  <p className="text-[10px] text-gray-300 leading-none">{activeNetworkLeader.role}, {activeNetworkLeader.company}</p>
                </div>

                {/* Connection lines using SVG */}
                <div className="w-full max-w-lg mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 relative">
                  {networkConnections.map((conn, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl text-center space-y-1 shadow-sm hover:border-blue-500 hover:shadow transition-all relative group"
                    >
                      {/* Connection Label */}
                      <span className="text-[8px] font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.2 rounded block mx-auto w-max uppercase">
                        {conn.label}
                      </span>
                      <h5 className="text-[11px] font-bold text-gray-900 dark:text-white truncate pt-0.5">{conn.details}</h5>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Network Explanatory Callout */}
            <div className="lg:col-span-4 space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block">Network Analysis:</span>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Mapping Intersecting Board Seats</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                  Our algorithm maps board representatives across overlapping corporate entities, identifying primary advisory hubs and bilateral influencers. No relationships are inferred without supporting regulatory filings.
                </p>
              </div>

              <div className="p-4 bg-purple-50/60 dark:bg-purple-950/15 rounded-xl border border-purple-100 dark:border-purple-900/40 text-[10px] text-purple-955 dark:text-purple-300 font-semibold space-y-1">
                <p>✓ 18 active board connections mapped</p>
                <p>✓ Linked to 4 Fortune 500 company Nodes</p>
                <p>✓ Tracked via SEC & Ministry of Corporate Affairs filings</p>
              </div>

              <Link href="/eoi" className="w-full block text-center bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm">
                Request Custom Mapping →
              </Link>
            </div>
          </div>
        </Card>
      </section>

      {/* ── 14. COMPARE LEADERS ─────────────────────────────────────────────── */}
      <section id="compare-leaders-section" className="space-y-4">
        <Card className="p-6">
          <SectionTitle
            title="Compare Leaders"
            subtitle="Fact-based, data-driven side-by-side comparison. No subjective judgments are generated."
          />

          <div className="space-y-6">
            {/* Selection Grid */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-700 dark:text-gray-300">Select Leaders to Compare (Max 3):</h3>
              <div className="flex flex-wrap gap-2">
                {LEADER_DATA.map((lead) => {
                  const isSelected = comparedLeaders.includes(lead.id);
                  return (
                    <button
                      key={lead.id}
                      onClick={() => toggleCompare(lead.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border-blue-300 dark:border-blue-900 font-bold"
                          : "bg-gray-50 dark:bg-gray-900 text-gray-500 border-gray-200 dark:border-gray-800"
                      }`}
                    >
                      <span>{lead.name}</span>
                      {isSelected && <Check className="h-3 w-3 text-blue-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Comparison Table */}
            {comparedLeaders.length > 0 ? (
              <div className="overflow-x-auto border border-gray-150 dark:border-gray-800 rounded-xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-55 dark:bg-[#070b12] text-gray-500 font-bold border-b border-gray-200 dark:border-gray-800 text-[10px] uppercase tracking-wider">
                      <th className="p-3.5">Factual Metric</th>
                      {comparedLeaders.map((id) => {
                        const l = LEADER_DATA.find((item) => item.id === id);
                        return <th key={id} className="p-3.5 text-gray-900 dark:text-white font-bold">{l?.name}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150 dark:divide-gray-850">
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-950/30">Current Role</td>
                      {comparedLeaders.map((id) => {
                        const l = LEADER_DATA.find((item) => item.id === id);
                        return <td key={id} className="p-3 font-medium">{l?.role}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-950/30">Company Node</td>
                      {comparedLeaders.map((id) => {
                        const l = LEADER_DATA.find((item) => item.id === id);
                        return <td key={id} className="p-3">{l?.company}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-950/30">Sector Mapped</td>
                      {comparedLeaders.map((id) => {
                        const l = LEADER_DATA.find((item) => item.id === id);
                        return <td key={id} className="p-3">{l?.sector}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-950/30">Bilateral Node</td>
                      {comparedLeaders.map((id) => {
                        const l = LEADER_DATA.find((item) => item.id === id);
                        return <td key={id} className="p-3">{l?.flag} {l?.country}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-950/30">Followers</td>
                      {comparedLeaders.map((id) => {
                        const l = LEADER_DATA.find((item) => item.id === id);
                        return <td key={id} className="p-3 font-mono">{l?.followers}</td>;
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-950/30">Influence Score</td>
                      {comparedLeaders.map((id) => {
                        const l = LEADER_DATA.find((item) => item.id === id);
                        return (
                          <td key={id} className="p-3 font-bold text-blue-600 dark:text-blue-400 font-mono">
                            {l?.score} / 100
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td className="p-3 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-950/30">Governance Citations</td>
                      {comparedLeaders.map((id) => {
                        const l = LEADER_DATA.find((item) => item.id === id);
                        return (
                          <td key={id} className="p-3 text-[11px] text-gray-400 leading-normal font-normal">
                            {l?.coverage.slice(0, 2).join(" · ")}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-6 text-xs text-gray-500 border border-dashed rounded-xl">
                Please select at least one executive above to display the comparison matrix.
              </div>
            )}
          </div>
        </Card>
      </section>

      {/* ── 15. LEADERSHIP COLLECTIONS ──────────────────────────────────────── */}
      <section id="collections-section" className="space-y-4">
        <SectionTitle
          title="Leadership Collections"
          subtitle="Data-driven and editorial lists of top executives and industry pioneers."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Top 50 Technology Leaders", count: "50 Profiles", type: "Algorithmic", desc: "Based on weekly compute and hardware platform tracking.", bg: "border-blue-200 dark:border-blue-900/60" },
            { title: "100 Emerging CEOs", count: "100 Profiles", type: "Editorial", desc: "Hand-picked emerging executives on our editor watchlist.", bg: "border-purple-200 dark:border-purple-900/60" },
            { title: "Top Global CFOs", count: "42 Profiles", type: "Data-driven", desc: "CFOs handling large cross-border treasury allocations.", bg: "border-emerald-200 dark:border-emerald-900/60" },
            { title: "Top Startup Founders", count: "75 Profiles", type: "Algorithmic", desc: "Early-stage founders based on capital velocity rates.", bg: "border-amber-200 dark:border-amber-900/60" }
          ].map((col) => (
            <Card key={col.title} className={`p-4 flex flex-col justify-between space-y-3 ${col.bg}`}>
              <div>
                <div className="flex items-center justify-between gap-1.5 text-[9px] font-bold">
                  <span className="text-gray-400">{col.count}</span>
                  <span className="uppercase text-blue-600 dark:text-blue-400">{col.type}</span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white mt-1 leading-snug">{col.title}</h4>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed font-normal">{col.desc}</p>
              </div>
              <Link href="/eoi" className="text-xs font-bold text-gray-900 dark:text-gray-300 hover:text-blue-600 inline-flex items-center gap-0.5 pt-1">
                <span>Explore Collection</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 16. RECOMMENDED LEADERS ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <SectionTitle
          title="Recommended Leaders for You"
          subtitle="Personalized recommendations matching your tracked sectors and corporate interests."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { lead: LEADER_DATA[1], reason: "Recommended because you track Semiconductors & AI" },
            { lead: LEADER_DATA[5], reason: "Recommended because you track Financial Services & Singapore Corridors" }
          ].map((rec, idx) => (
            <Card key={idx} className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img src={rec.lead.photo} alt={rec.lead.name} className="h-10 w-10 rounded-lg object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{rec.lead.name}</h4>
                  <p className="text-[10px] text-gray-500">{rec.lead.role} at {rec.lead.company}</p>
                  <span className="text-[8px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 px-1.5 py-0.2 rounded font-semibold mt-1 inline-block">
                    {rec.reason}
                  </span>
                </div>
              </div>
              <Link href="/eoi" className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold px-3 py-2 rounded-xl transition-colors shrink-0">
                Explore Leader →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 17. MY LEADER WATCHLIST ─────────────────────────────────────────── */}
      <section className="space-y-4">
        <Card className="p-5">
          <SectionTitle
            title="My Leader Watchlist"
            subtitle="Add and monitor leaders to build your personalized corporate watchlist."
          />

          {watchlist.length > 0 ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {watchlist.map((id) => {
                  const lead = LEADER_DATA.find((l) => l.id === id);
                  if (!lead) return null;
                  return (
                    <div key={id} className="p-3 bg-gray-50 dark:bg-gray-950 border border-gray-150 dark:border-gray-850 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <img src={lead.photo} alt={lead.name} className="h-8 w-8 rounded-lg object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{lead.name}</h4>
                          <span className="text-[9px] text-gray-400">{lead.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline">
                          View Dossier
                        </Link>
                        <button onClick={() => toggleFollow(id)} className="text-[9px] text-gray-400 hover:text-rose-500">
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-right">
                <Link
                  href="/en/poc-v2/my-news/activities/likes"
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-755 dark:text-gray-300 text-xs font-bold px-4 py-2 rounded-xl hover:bg-gray-55 transition-colors inline-flex items-center gap-1 shadow-sm"
                >
                  <span>Manage Watchlist</span>
                  <ChevronRight className="h-4.5 w-4.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-gray-500 border border-dashed rounded-xl space-y-3">
              <p>Follow leaders to build your personal watchlist.</p>
              <button
                onClick={() => {
                  const el = document.getElementById("top-leaders-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore Top Leaders →
              </button>
            </div>
          )}
        </Card>
      </section>

      {/* ── 18. LEADERSHIP ALERTS ───────────────────────────────────────────── */}
      <section className="space-y-4">
        <Card className="p-5">
          <SectionTitle
            title="Leadership Alerts Manager"
            subtitle="Configure instant notifications for corporate transitions and governance events."
            action={<Badge color="blue">Alert Configuration</Badge>}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3">
              {[
                { key: "company_change", label: "When leader changes company Node" },
                { key: "board_join", label: "When leader joins a boardroom advisory" },
                { key: "awards", label: "When leader receives industry recognition / award" },
                { key: "news_mentions", label: "When leader appears in major strategic news" }
              ].map((alertOpt) => (
                <div key={alertOpt.key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-950 border border-gray-150 dark:border-gray-850 rounded-xl text-xs">
                  <span className="font-semibold text-gray-800 dark:text-gray-200">{alertOpt.label}</span>
                  <button
                    onClick={() => toggleAlert(alertOpt.key)}
                    className={`text-[9px] font-bold px-3 py-1 rounded-lg border transition-all ${
                      alerts[alertOpt.key]
                        ? "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border-blue-200 dark:border-blue-900"
                        : "bg-gray-100 dark:bg-gray-900 text-gray-400 border-gray-200 dark:border-gray-800"
                    }`}
                  >
                    {alerts[alertOpt.key] ? "Active Alert ✓" : "Enable"}
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t md:border-t-0 md:border-l border-gray-150 dark:border-gray-800 pt-4 md:pt-0 md:pl-6">
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest block font-mono">Notification Node:</span>
                <p className="text-xs text-gray-500 leading-normal">
                  Alert configurations are linked directly to your default registered profile email. Change notification destinations in global user settings.
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <button
                  onClick={handleSaveAlerts}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                >
                  Create Alert →
                </button>
                {alertSuccess && (
                  <span className="text-xs font-bold text-emerald-500 animate-pulse">Alerts saved successfully!</span>
                )}
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* ── 19. LEADERSHIP INTELLIGENCE ─────────────────────────────────────── */}
      <section className="space-y-4">
        <Card className="p-6">
          <SectionTitle
            title="Leadership Intelligence Analytics"
            subtitle="Aggregate analytical signals tracking C-suite sentiment and cross-border transitions."
            action={<Badge color="purple">Aggregated Analytics</Badge>}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Card 1: Trends */}
            <div className="p-4 bg-gray-55 dark:bg-[#070b12] rounded-2xl border border-gray-200 dark:border-gray-800 space-y-4">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">C-Suite Sentiment Trends</h4>
              
              {/* Fake visual bar chart using CSS */}
              <div className="space-y-2">
                {[
                  { label: "Sovereign AI foundries", width: "w-[84%]", value: "+84% Net Pos" },
                  { label: "Clean Fuel infrastructure", width: "w-[72%]", value: "+72% Net Pos" },
                  { label: "Bilateral Corridor IMEC", width: "w-[58%]", value: "+58% Net Pos" }
                ].map((bar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
                      <span>{bar.label}</span>
                      <span className="font-semibold">{bar.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full bg-blue-600 rounded-full ${bar.width}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 2: Sector Activity */}
            <div className="p-4 bg-gray-55 dark:bg-[#070b12] rounded-2xl border border-gray-200 dark:border-gray-800 space-y-4">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Sector Leadership Activity</h4>
              
              <div className="space-y-2">
                {[
                  { label: "Semiconductors & OSAT", width: "w-[92%]", value: "92.4 Index" },
                  { label: "FinTech Payments", width: "w-[78%]", value: "78.2 Index" },
                  { label: "Biotech Genomics", width: "w-[64%]", value: "64.1 Index" }
                ].map((bar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
                      <span>{bar.label}</span>
                      <span className="font-semibold">{bar.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full bg-purple-600 rounded-full ${bar.width}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Country Vectors */}
            <div className="p-4 bg-gray-55 dark:bg-[#070b12] rounded-2xl border border-gray-200 dark:border-gray-800 space-y-4">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Bilateral Corridor Velocities</h4>
              
              <div className="space-y-2">
                {[
                  { label: "India ↔ USA Tech Accord", width: "w-[95%]", value: "Very High" },
                  { label: "India ↔ Singapore Treasury", width: "w-[82%]", value: "High" },
                  { label: "India ↔ UAE CEPA Nodes", width: "w-[71%]", value: "High" }
                ].map((bar, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400">
                      <span>{bar.label}</span>
                      <span className="font-semibold">{bar.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className={`h-full bg-emerald-600 rounded-full ${bar.width}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* ── 20. PREMIUM LEADERSHIP REPORTS ──────────────────────────────────── */}
      <section id="reports-section" className="space-y-4">
        <SectionTitle
          title="Leadership Intelligence Reports"
          subtitle="Purchase and download comprehensive research dossiers mapping C-suite nodes and cross-border developments."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { id: "rep-1", title: "Global Top Leaders Report", price: "$299", desc: "Analysis of the top 200 global corporate board directors.", coverage: "200 Executives", date: "Aug 2026" },
            { id: "rep-2", title: "Executive Movement Report", price: "$199", desc: "Talent mobility trends in energy and technology.", coverage: "450 Appointments", date: "Aug 2026" },
            { id: "rep-3", title: "Emerging Leaders Report", price: "$249", desc: "Founders and CEOs displaying rapid velocity indexes.", coverage: "100 Profiles", date: "Jul 2026" },
            { id: "rep-4", title: "Board Leadership Report", price: "$149", desc: "Directorship mapping and governance audit models.", coverage: "120 Entities", date: "Jul 2026" }
          ].map((rep) => (
            <Card key={rep.id} className="p-4 flex flex-col justify-between space-y-4 hover:border-amber-400 transition-colors">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-mono font-bold text-amber-600">{rep.price}</span>
                  <span className="text-gray-400">{rep.date}</span>
                </div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{rep.title}</h4>
                <p className="text-[10px] text-gray-400 font-normal leading-relaxed">{rep.desc}</p>
                <span className="text-[9px] bg-gray-150 dark:bg-gray-900 text-gray-500 px-2 py-0.5 rounded font-semibold inline-block">
                  Coverage: {rep.coverage}
                </span>
              </div>
              <Link href="/eoi" className="w-full text-center bg-gray-900 dark:bg-white text-white dark:text-gray-950 text-xs font-bold py-2 rounded-xl hover:bg-gray-800 transition-colors shadow-sm">
                Explore Report →
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* ── 21. ENTERPRISE CTA ──────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#1a0c02] via-[#241305] to-[#040814] text-white relative overflow-hidden rounded-3xl border border-amber-900/40 p-8 md:p-12 shadow-2xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#fbbf24_1px,transparent_0)] [background-size:20px_20px]" />
        
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400">Premium C-Suite Advisory</span>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight">Need Deeper Leadership Intelligence?</h2>
            <p className="text-sm text-gray-300 leading-relaxed font-normal">
              Access advanced rankings, executive networks, leadership analytics and premium research datasets.
            </p>
          </div>

          <div className="flex gap-3 flex-wrap">
            <Link
              href="/eoi"
              className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-1"
            >
              <span>Upgrade to Enterprise</span>
              <Crown className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/eoi"
              className="border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-colors shrink-0"
            >
              Request Research
            </Link>
            <Link
              href="/eoi"
              className="text-amber-400 hover:text-amber-300 font-bold text-xs px-3 py-3 transition-colors inline-flex items-center gap-1"
            >
              <span>Talk to Sales</span>
              <ArrowRight className="h-3.5 w-3.5 animate-pulse" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

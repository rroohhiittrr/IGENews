"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  TrendingUp,
  Search,
  ArrowLeft,
  ChevronRight,
  Clock,
  Calendar,
  Flame,
  Lock,
  Mail,
  FileText,
  CheckCircle,
  ThumbsUp,
  Bookmark,
  Share2,
  MessageSquare,
  Globe,
  Scale,
  Headphones,
  Users,
  BarChart3,
  ArrowUpRight,
  Heart,
  Newspaper,
  Play,
  Tag,
  Award,
  Target,
  MessageCircle,
  Info,
  DollarSign,
  Activity,
  Briefcase,
  AlertTriangle,
  FolderMinus,
  MapPin,
  BookOpen,
  Crown,
  Check,
  ShieldAlert,
  ChevronDown,
  Star,
  Plus
} from "lucide-react";
import { IGEN_50_SECTORS, SectorTaxonomyItem } from "./igenTaxonomyData";

// Grouping Categories for Sector taxonomy mapping
const CATEGORY_GROUPS = {
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

export default function NewsPOCAllSectorDirectoryView() {
  const router = useRouter();

  // Local state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeFocusTab, setActiveFocusTab] = useState<"Trending" | "Fast Growing" | "Most Read" | "Most Followed">("Trending");
  const [followedSectors, setFollowedSectors] = useState<string[]>(["S16", "S30", "S46"]);
  const [compareA, setCompareA] = useState<string>("S46"); // default Semiconductor
  const [compareB, setCompareB] = useState<string>("S45"); // default Automotive & EV
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [proSuccess, setProSuccess] = useState(false);
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);

  // Toggle follow
  const toggleFollow = (code: string) => {
    setFollowedSectors(prev =>
      prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
    );
  };

  // Resolve category parent for any sector item
  const getSectorCategory = (code: string): string => {
    for (const [catName, codes] of Object.entries(CATEGORY_GROUPS)) {
      if (codes.includes(code)) return catName;
    }
    return "Services";
  };

  // Filtered sectors list
  const filteredSectors = IGEN_50_SECTORS.filter(sec => {
    const matchesSearch =
      sec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.ministry.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === "All") return matchesSearch;
    const cat = getSectorCategory(sec.code);
    return matchesSearch && cat === selectedCategory;
  });

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-150 min-h-screen pb-16">
      
      {/* 01. DIRECTORY HERO */}
      <section className="bg-gradient-to-br from-[#0b0f19] via-[#091533] to-[#04060b] text-white relative overflow-hidden border-b border-gray-805 py-12">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] font-mono font-bold bg-blue-600 px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs">
              SECTOR DIRECTORY
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Explore 50+ Industry Sectors
            </h1>
            <p className="text-slate-350 text-xs md:text-sm font-normal max-w-2xl leading-relaxed">
              Discover industry sectors, explore market activity, follow sector developments and access deeper industry intelligence.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#directory-grid"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                Explore All Sectors <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="#compare-sectors"
                className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
              >
                Compare Sectors
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-10">

        {/* 02. SECTOR SEARCH & FILTERS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sectors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-250 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 py-3 pl-10 pr-4 outline-none focus:border-blue-500 text-gray-900 dark:text-white"
              />
            </div>

            {/* Quick stats tags */}
            <div className="flex items-center gap-4 text-[10px] font-mono font-bold text-gray-400">
              <span>ACTIVE SECTORS: 50</span>
              <span>INDEXED: 1,350+ INDUSTRIES</span>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100 dark:border-gray-850">
            {["All", ...Object.keys(CATEGORY_GROUPS)].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* 03. SECTOR CATEGORY NAVIGATION */}
        <section className="space-y-4">
          <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest">
            Browse By Category Groups
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {Object.keys(CATEGORY_GROUPS).map((catName) => {
              const codeList = CATEGORY_GROUPS[catName as keyof typeof CATEGORY_GROUPS];
              return (
                <button
                  key={catName}
                  onClick={() => setSelectedCategory(catName)}
                  className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 p-4 rounded-xl text-left hover:border-blue-500 transition-colors cursor-pointer space-y-1.5"
                >
                  <span className="font-bold text-xs text-gray-950 dark:text-white block leading-tight">{catName}</span>
                  <span className="text-[9px] text-gray-400 block font-mono font-bold">{codeList.length} Sectors</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 04. 50+ SECTOR DIRECTORY */}
        <section id="directory-grid" className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">
              Explore All Sectors ({filteredSectors.length})
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold font-mono">Ministry-Aligned Taxonomy</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredSectors.map((sec) => {
              const catName = getSectorCategory(sec.code);
              const isFollowed = followedSectors.includes(sec.code);
              return (
                <div key={sec.code} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 shadow-3xs hover:border-blue-500 transition-all flex flex-col justify-between group">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="text-2xl">{sec.icon || "🏭"}</span>
                      <span className="text-[8px] font-bold text-blue-650 bg-blue-50 dark:bg-blue-955/20 px-2 py-0.5 rounded uppercase">
                        {catName}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-gray-400 block font-bold">{sec.code} · {sec.ministry}</span>
                      <h3 className="font-bold text-xs text-gray-950 dark:text-white mt-1 group-hover:text-blue-650 transition-colors leading-tight">
                        {sec.name}
                      </h3>
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-gray-100 dark:border-gray-855 flex items-center justify-between">
                    <button
                      onClick={() => toggleFollow(sec.code)}
                      className={`text-[9.5px] font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        isFollowed
                          ? "bg-emerald-50 border-emerald-300 text-emerald-600 dark:bg-emerald-950/20"
                          : "border-gray-200 dark:border-gray-800 text-gray-500 hover:text-blue-500"
                      }`}
                    >
                      {isFollowed ? "Following ✓" : "Follow +"}
                    </button>
                    
                    <Link
                      href="/en/poc-v2/feed/sector"
                      className="text-[9.5px] font-bold text-blue-600 hover:underline flex items-center gap-0.5"
                    >
                      Explore Sector <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 05. SECTORS IN FOCUS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex flex-wrap justify-between items-center gap-4">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="h-4.5 w-4.5 text-blue-600" /> Sectors in Focus
            </h2>

            <div className="flex gap-1.5 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
              {["Trending", "Fast Growing", "Most Read", "Most Followed"].map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveFocusTab(t as any)}
                  className={`px-3 py-1.5 rounded-lg text-[9.5px] font-bold transition-all cursor-pointer ${
                    activeFocusTab === t
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-gray-550 dark:text-gray-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { code: "S46", name: "Semiconductors & OSAT", reason: "FDI subsidies phase 2 expansion cleared", signal: "Supply corridor expanding" },
              { code: "S30", name: "New & Renewable Clean Energy", reason: "Green Hydrogen SIGHT 2 initiatives funded", signal: "Capacity increases +28%" },
              { code: "S02", name: "AI & Cyber Security", reason: "Sovereign model nodes subsidies approved", signal: "Substrate deployment focus" }
            ].map((focus) => (
              <div key={focus.code} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center text-[9px] font-mono font-bold text-gray-400">
                  <span>{focus.code}</span>
                  <span className="text-emerald-500 font-bold uppercase">FOCUS HIGH</span>
                </div>
                <h3 className="text-xs font-bold text-gray-955 dark:text-white leading-tight">{focus.name}</h3>
                <p className="text-[11px] text-gray-500 font-semibold leading-relaxed">
                  Reason: {focus.reason}.
                </p>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-855 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-purple-650">{focus.signal}</span>
                  <Link href="/en/poc-v2/feed/sector" className="text-[9.5px] font-bold text-blue-600 hover:underline">
                    Explore →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 06. SECTOR COMPARISON */}
        <section id="compare-sectors" className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="h-4.5 w-4.5 text-blue-600" /> Compare Sectors
            </h2>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">
              Compare two sectors side-by-side across market activity and growth.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-850">
            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={compareA}
                onChange={(e) => setCompareA(e.target.value)}
                className="text-xs font-bold bg-gray-50 dark:bg-gray-900 border border-gray-205 dark:border-gray-800 px-3 py-2 rounded-xl outline-none"
              >
                {IGEN_50_SECTORS.map((s) => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>

              <span className="text-xs font-bold text-gray-400 self-center">VS</span>

              <select
                value={compareB}
                onChange={(e) => setCompareB(e.target.value)}
                className="text-xs font-bold bg-gray-50 dark:bg-gray-900 border border-gray-205 dark:border-gray-800 px-3 py-2 rounded-xl outline-none"
              >
                {IGEN_50_SECTORS.map((s) => (
                  <option key={s.code} value={s.code}>{s.name}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setPremiumUnlocked(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all cursor-pointer"
            >
              Analyze Comparison
            </button>
          </div>

          {/* Comparison results */}
          <div className="grid grid-cols-2 gap-4 text-xs font-semibold leading-relaxed text-gray-700 dark:text-slate-300">
            <div className="p-3.5 bg-gray-50 dark:bg-gray-900 rounded-xl space-y-2 border border-gray-150/40 dark:border-gray-800">
              <h5 className="font-bold text-gray-900 dark:text-white uppercase text-[9px] tracking-wider">
                {IGEN_50_SECTORS.find(s => s.code === compareA)?.name}
              </h5>
              <div className="space-y-1 text-[11px] font-mono">
                <div>Ministry: {IGEN_50_SECTORS.find(s => s.code === compareA)?.ministry}</div>
                <div>Industries Indexed: {IGEN_50_SECTORS.find(s => s.code === compareA)?.count}</div>
              </div>
            </div>

            <div className="p-3.5 bg-gray-55 dark:bg-gray-900 rounded-xl space-y-2 border border-gray-150/40 dark:border-gray-800">
              <h5 className="font-bold text-gray-900 dark:text-white uppercase text-[9px] tracking-wider">
                {IGEN_50_SECTORS.find(s => s.code === compareB)?.name}
              </h5>
              <div className="space-y-1 text-[11px] font-mono">
                <div>Ministry: {IGEN_50_SECTORS.find(s => s.code === compareB)?.ministry}</div>
                <div>Industries Indexed: {IGEN_50_SECTORS.find(s => s.code === compareB)?.count}</div>
              </div>
            </div>
          </div>
        </section>

        {/* 07. SECTOR MARKET SIGNALS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-850 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-4.5 w-4.5 text-blue-600" /> Sector Market Signals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { sector: "Manufacturing", detail: "FDI investment flow speed ▲ +18%" },
              { sector: "Renewable Clean Energy", detail: "Capacity installations index ▲ +28%" },
              { sector: "Technology & Software", detail: "SaaS export contract margins ▲ +15%" },
              { sector: "Logistics & Ports", detail: "Bilateral container freights throughput ▲ +18%" }
            ].map((sig, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-2">
                <span className="text-[8.5px] font-bold text-purple-650 bg-purple-55/20 px-2 py-0.5 rounded uppercase">MARKET SIGNAL</span>
                <h3 className="text-xs font-bold text-gray-955 dark:text-white leading-tight">{sig.sector}</h3>
                <p className="text-[10.5px] text-gray-500 font-semibold leading-relaxed">
                  {sig.detail}. Forward procurement pipelines active.
                </p>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-855 flex justify-end">
                  <Link href="/en/eoi" className="text-[9.5px] font-bold text-purple-600 hover:underline">
                    Explore Signals →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 08. LATEST SECTOR ACTIVITY PREVIEW */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-805 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Latest Sector Activity</h2>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-4">
            {[
              { sector: "Semiconductors", desc: "Phase 2 fab subsidies expand as major OSAT JVs break ground", time: "2h ago" },
              { sector: "Automotive & EV", desc: "Interoperability battery swapping guidelines standardized", time: "4h ago" }
            ].map((item, idx) => (
              <div key={idx} className={`flex justify-between items-center text-xs ${idx > 0 ? "border-t border-gray-100 dark:border-gray-850 pt-3" : ""}`}>
                <div className="space-y-1">
                  <span className="text-[8.5px] font-bold text-blue-650 bg-blue-50 dark:bg-blue-955/25 px-2 py-0.5 rounded uppercase">{item.sector}</span>
                  <p className="text-gray-955 dark:text-white font-bold leading-normal mt-1">{item.desc}</p>
                </div>
                <span className="text-[10px] text-gray-400 font-mono shrink-0 pl-4">{item.time}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 09. FEATURED SECTOR REPORTS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Featured Sector Reports</h2>
            <span className="text-[10px] text-gray-400 font-semibold font-mono">2026 Analytical Series</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Global Renewable Clean Energy Outlook 2026", cat: "Energy" },
              { title: "Global Smart Factory & Robotics Outlook 2026", cat: "Manufacturing" },
              { title: "Sovereign AI Compute & Chip Sourcing Outlook 2026", cat: "Technology" }
            ].map((rep, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-650 transition-all group">
                <div className="space-y-2">
                  <span className="text-[8px] font-mono font-bold text-gray-400 uppercase tracking-widest">{rep.cat} Report</span>
                  <h3 className="text-xs font-bold text-gray-955 dark:text-white mt-1 group-hover:text-blue-650 transition-colors leading-snug">{rep.title}</h3>
                </div>

                <div className="pt-3.5 mt-4 border-t border-gray-100 dark:border-gray-855 flex justify-end">
                  <Link href="/en/eoi" className="bg-blue-600 hover:bg-blue-700 text-white text-[9.5px] font-bold px-3 py-1.5 rounded-lg transition-colors">
                    Buy Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. FOLLOW SECTORS / ALERTS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-1">
            <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white uppercase tracking-wider">Follow Sector Updates</h3>
            <p className="text-xs text-gray-500 leading-normal">
              Activate automated alerts for major customs tariffs modifications, investment changes, and upcoming sector summit notifications.
            </p>
          </div>

          <Link
            href="/en/mynews/bookmarks"
            className="bg-blue-605 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer shrink-0 text-center"
          >
            Configure Alert Feed →
          </Link>
        </section>

        {/* 11. UPCOMING SECTOR EVENTS */}
        <section className="space-y-4">
          <div className="border-b border-gray-205 dark:border-gray-805 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Upcoming Sector Events</h2>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-4 text-xs font-semibold leading-relaxed">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[8px] font-mono font-bold text-purple-650 bg-purple-50 dark:bg-purple-955/20 px-2 py-0.5 rounded uppercase">MANUFACTURING</span>
                <h4 className="text-xs font-bold text-gray-955 dark:text-white mt-1">Global Manufacturing & Edge-AI Summit</h4>
                <p className="text-[11px] text-gray-500 font-normal leading-normal">Location: Singapore · October 2026. Focus: Smart factory automation models.</p>
              </div>

              <Link href="/en/eoi" className="bg-purple-600 hover:bg-purple-705 text-white font-bold text-[9.5px] px-3 py-1.5 rounded-lg shrink-0 text-center">
                Register Event
              </Link>
            </div>
          </div>
        </section>

        {/* 12. FEATURED / SPONSORED SECTORS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-955 dark:text-white uppercase tracking-wider flex items-center gap-1">
              <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-500" /> Featured Sector Promotion
            </h2>
          </div>

          <div className="p-4 rounded-xl border border-amber-250/20 bg-amber-50/15 dark:bg-amber-955/5 space-y-2">
            <span className="text-[8px] font-bold text-amber-600 uppercase tracking-widest block">Sponsored Profile</span>
            <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-tight">Dubai Silicon Oasis (DSO) Semiconductor Hub</h4>
            <p className="text-[11px] text-gray-550 dark:text-slate-350 leading-relaxed font-normal">
              Accelerate tech design operations at the DSO freezone with complete corporate tax waivers and hardware lab credits.
            </p>
            <div className="pt-2 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
              <Link href="/en/eoi" className="text-[9.5px] font-bold text-amber-550 hover:underline">
                Explore DSO Hub →
              </Link>
            </div>
          </div>
        </section>

        {/* 13. PREMIUM SECTOR INTELLIGENCE PREVIEW */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-855 pb-3">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-blue-650" /> Premium Sector Intelligence
            </h3>
            <span className="text-[9px] font-mono font-bold bg-blue-50 dark:bg-blue-955/20 text-blue-605 px-2.5 py-0.5 rounded border border-blue-200/20">
              Model V4 Forecast
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="p-4 bg-blue-50/50 dark:bg-blue-955/10 border border-blue-105/50 rounded-2xl space-y-1">
                <span className="text-[9px] font-bold text-blue-650 uppercase tracking-widest">AI Forecast Brief</span>
                <p className="text-xs text-gray-700 dark:text-slate-350 italic font-semibold leading-relaxed">
                  "Capital subsidies drive domestic capacity increases across Tier-2 industrial hubs."
                </p>
              </div>

              {/* Locked dynamic outlook panels */}
              <div className="space-y-2 text-xs relative">
                {!premiumUnlocked ? (
                  <>
                    <div className="p-3 bg-gray-50/50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-805 flex justify-between items-center opacity-60">
                      <span>1. Custom Sector specific supply chain bottlenecks indexes</span>
                      <span className="text-[8.5px] font-bold text-gray-400 flex items-center gap-0.5"><Lock className="h-3 w-3" /> Locked</span>
                    </div>
                    <div className="p-3 bg-gray-55 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-805 flex justify-between items-center opacity-60">
                      <span>2. Regional shipping lanes delay warning index</span>
                      <span className="text-[8.5px] font-bold text-gray-400 flex items-center gap-0.5"><Lock className="h-3 w-3" /> Locked</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0f172a] flex items-center justify-center pt-8">
                      <button
                        onClick={() => setIsProModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-755 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        Unlock Sector Briefs <Lock className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-gray-50/60 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-805 space-y-2">
                    <h5 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px]">Unlocked Forecast Insights</h5>
                    <ul className="list-disc pl-5 space-y-1.5 font-medium leading-relaxed">
                      <li>Bilateral custom waver regulations decrease OSAT import overheads by 15%.</li>
                      <li>EU CBAM rules impose strict compliance metrics for steel shipping operations.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl space-y-3 border border-slate-805">
              <span className="text-[8.5px] font-bold text-amber-400 uppercase tracking-widest block">Pro Account Benefit</span>
              <h4 className="text-xs font-bold text-white">Full Sector Risk Forecasts</h4>
              <p className="text-[10px] text-slate-300 leading-normal font-normal">
                Unlock daily tariff updates, phase-out schedules, transport routes delays, and local executive risk scores.
              </p>
              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-full text-center bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs py-2 rounded-xl"
              >
                Upgrade Account Pro
              </button>
            </div>

          </div>
        </section>

        {/* 14. PRO / ENTERPRISE CTA */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-blue-500/5 dark:from-[#0f172a] dark:to-blue-955/10">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Go Deeper Into Sector Intelligence</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-655 dark:text-slate-350">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-850 space-y-3">
              <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">FREE</h4>
              <ul className="space-y-1.5 font-semibold text-gray-550 dark:text-gray-300">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Browse 50+ sectors</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Basic sector search</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Basic sector comparisons</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-50/10 dark:bg-blue-955/5 space-y-3 relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-blue-550 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl uppercase">Most Popular</span>
              <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">PRO</h4>
              <ul className="space-y-1.5 font-semibold text-gray-550 dark:text-gray-300">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Premium reports access</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> AI sector intelligence</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Advanced comparison metrics</li>
              </ul>
              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-full text-center bg-blue-600 hover:bg-blue-755 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Upgrade to Pro
              </button>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-855 space-y-3">
              <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">ENTERPRISE</h4>
              <ul className="space-y-1.5 font-semibold text-gray-550 dark:text-gray-300">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Advanced custom reports</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Multi-user seat keys</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Enterprise integrations API</li>
              </ul>
              <Link
                href="/en/eoi"
                className="block text-center w-full bg-slate-900 hover:bg-slate-955 text-white font-bold text-xs py-2 rounded-xl transition-all"
              >
                Explore Enterprise
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* --- PRO UPGRADE MODAL --- */}
      {isProModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="h-5 w-5 text-blue-500 animate-bounce" /> Upgrade to Sector Pro
              </h4>
              <button
                onClick={() => {
                  setIsProModalOpen(false);
                  setProSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-655 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {proSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-955 text-blue-605 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Pro Access Active!</h5>
                <p className="text-[10px] text-gray-555 px-4 font-normal leading-normal">
                  Thank you! Your pro trial has been successfully registered. You can now access locked AI previews.
                </p>
                <button
                  onClick={() => {
                    setIsProModalOpen(false);
                    setProSuccess(false);
                  }}
                  className="bg-gray-105 dark:bg-gray-855 text-gray-655 dark:text-slate-355 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs font-medium text-gray-655 dark:text-slate-355">
                <p className="text-[11px] leading-relaxed font-normal">
                  Unlock advanced sector forecasts, custom comparison tools, and priority whitepaper reviews.
                </p>
                <div className="p-3 bg-blue-50/20 border border-blue-200/20 rounded-xl space-y-1.5">
                  <h5 className="font-bold text-blue-650 uppercase tracking-widest text-[9px]">Included Entitlements</h5>
                  <ul className="list-disc pl-4 space-y-1 font-semibold text-[10.5px]">
                    <li>Full AI Outlook briefings unlocked</li>
                    <li>PDF report sample download guides</li>
                    <li>Advanced comparison selectors</li>
                  </ul>
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setIsProModalOpen(false)}
                    className="bg-gray-105 dark:bg-gray-855 text-gray-605 dark:text-slate-355 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setProSuccess(true);
                      setPremiumUnlocked(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
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

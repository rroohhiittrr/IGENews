"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, CheckCircle, TrendingUp, Bookmark, BookmarkCheck, Bell, BellRing,
  Eye, Building2, Globe, MapPin, Clock, Calendar, Flame, Zap, Rocket,
  Star, Award, Crown, Lock, Sparkles, ChevronRight, ArrowRight, Filter,
  SlidersHorizontal, Plus, Newspaper, BarChart2, BarChart3, Users, Target,
  Briefcase, Mail, MessageSquare, ExternalLink, Package, Handshake,
  DollarSign, Factory, ShieldCheck, PieChart, FileText, Activity,
  Trophy, Medal, ArrowUpRight, RefreshCw, X, ChevronDown, Info,
  Layers, HelpCircle, GitCompare, ChevronUp, Scale, AlertTriangle, ArrowLeft, Download
} from "lucide-react";
import { IGEN_50_SECTORS, SectorTaxonomyItem } from "./igenTaxonomyData";

// ─── Colour tokens (verified = emerald/teal) ─────────────────────────────────
const V = {
  grad:    "from-emerald-600 via-emerald-700 to-teal-800",
  gradBg:  "from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/5 dark:to-teal-950/5",
  bg:      "bg-emerald-600",
  bgSoft:  "bg-emerald-50 dark:bg-emerald-950/20",
  border:  "border-emerald-200 dark:border-emerald-900/60",
  text:    "text-emerald-600 dark:text-emerald-400",
  btn:     "bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all",
  btnOut:  "border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-bold transition-all",
};

// ─── Mock static helper arrays for diverse content ──────────────────────────
const POPULAR_SECTORS_DATA = {
  today: ["S42", "S36", "S46", "S38"],
  week: ["S42", "S36", "S46", "S38", "S30", "S23"],
  month: ["S42", "S36", "S46", "S38", "S30", "S23", "S16", "S41"]
};

const CATEGORY_GROUPS: Record<string, string[]> = {
  "Technology & Digital": ["S02", "S11", "S16", "S36", "S38", "S46", "S47"],
  "Energy & Resources": ["S04", "S10", "S17", "S29", "S30", "S31", "S34"],
  "Manufacturing & Industry": ["S07", "S08", "S24", "S28", "S37", "S45"],
  "Healthcare & Life Sciences": ["S05", "S06", "S23", "S32"],
  "Financial Services": ["S41", "S42"],
  "Logistics & Transport": ["S09", "S33", "S43", "S44"],
  "Consumer & Retail": ["S12", "S21", "S22", "S39", "S48"],
  "Infrastructure & Environment": ["S18", "S26", "S49", "S50"],
  "Agriculture & Food": ["S01", "S03", "S19", "S20"],
  "Services & Professional": ["S13", "S14", "S15", "S25", "S27", "S35", "S40"],
};

const NEWS_MOCK = [
  { id: "s-n1", sector: "AI & Cyber Security", icon: "🤖", title: "National AI Supercomputing Grid phase 3 expansion approved", time: "1h ago", source: "Tech Bureau" },
  { id: "s-n2", sector: "Semiconductors & OSAT", icon: "🎛️", title: "Phase 2 semiconductor fab applications receive ₹45,000 Cr bids", time: "3h ago", source: "Electronics India" },
  { id: "s-n3", sector: "New & Renewable Clean Energy", icon: "☀️", title: "Offshore wind pilot projects to lease 2.5GW capacity next month", time: "5h ago", source: "Green Desk" },
  { id: "s-n4", sector: "FinTech & Digital Payments", icon: "💳", title: "Cross-border retail payments link with Southeast Asia goes live", time: "8h ago", source: "Banking Desk" }
];

export default function VerifiedCompanyAllSectorsView() {
  const router = useRouter();

  // ─── States ─────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState("All");
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Technology & Digital"]);
  const [activePopularTab, setActivePopularTab] = useState<"today" | "week" | "month">("today");
  const [activeRankTab, setActiveRankTab] = useState<"views" | "followers" | "activity">("views");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertSectorCode, setAlertSectorCode] = useState("S16");
  const [watchlist, setWatchlist] = useState<string[]>(["S16", "S30", "S46"]);
  
  // Sector Selection for "Companies Across Industries"
  const [selectedEcosystemSector, setSelectedEcosystemSector] = useState("S16");
  
  // Sector Selection for "Compare Sectors"
  const [compareA, setCompareA] = useState("S16");
  const [compareB, setCompareB] = useState("S46");
  const [compareC, setCompareC] = useState("S38");
  
  // Sector Selection for Leaderboard
  const [leaderboardSector, setLeaderboardSector] = useState("S16");

  // Country Explorer Sector details
  const [selectedCountry, setSelectedCountry] = useState("India");

  // ─── Helpers ────────────────────────────────────────────────────────────────
  const sectorMap = useMemo(() => {
    const m: Record<string, SectorTaxonomyItem> = {};
    IGEN_50_SECTORS.forEach((s) => { m[s.code] = s; });
    return m;
  }, []);

  const alphabetList = useMemo(() => {
    const letters = new Set<string>();
    IGEN_50_SECTORS.forEach((s) => letters.add(s.name.charAt(0).toUpperCase()));
    return Array.from(letters).sort();
  }, []);

  // Filtered sectors list for Search & Quick Filter
  const filteredSectors = useMemo(() => {
    let list = [...IGEN_50_SECTORS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.ministry.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          (s.feed && s.feed.toLowerCase().includes(q))
      );
    }

    if (selectedLetter) {
      list = list.filter((s) => s.name.charAt(0).toUpperCase() === selectedLetter);
    }

    if (quickFilter === "Popular") {
      list = list.sort((a, b) => b.count - a.count).slice(0, 12);
    } else if (quickFilter === "Trending") {
      list = list.filter((s) => ["S02", "S46", "S30", "S42", "S38", "S45"].includes(s.code));
    } else if (quickFilter === "Emerging") {
      list = list.filter((s) => ["S36", "S06", "S49", "S50"].includes(s.code));
    } else if (quickFilter === "Featured") {
      list = list.filter((s) => ["S01", "S16", "S23", "S32", "S43"].includes(s.code));
    } else if (quickFilter === "Recently Updated") {
      list = list.slice(0, 8);
    }

    return list;
  }, [searchQuery, quickFilter, selectedLetter]);

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleFollowSector = (code: string) => {
    setWatchlist((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (alertEmail.trim()) {
      setAlertSuccess(true);
      setTimeout(() => setAlertSuccess(false), 4000);
      setAlertEmail("");
    }
  };

  const activeSectorObj = sectorMap[selectedEcosystemSector] || IGEN_50_SECTORS[0];

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">
      
      {/* ── 1. BREADCRUMB ─────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 lg:px-6 pt-4">
        <nav className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
          <button onClick={() => router.back()} className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back
          </button>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span>Company News</span>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span>Verified Company</span>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-emerald-600 font-bold dark:text-emerald-400">All Sectors</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-6 pt-5 space-y-8">

        {/* ── 2. HERO ───────────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E\")" }} />
          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-bold bg-amber-500 text-gray-950 px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Crown className="h-2 w-2" /> Verified Enterprise Tier
              </span>
              <span className="text-[8px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Globe className="h-2 w-2" /> Global Market Directory
              </span>
            </div>
            <h1 className="font-display text-2xl md:text-3.5xl font-extrabold leading-tight">
              Explore All Sectors
            </h1>
            <p className="text-emerald-100 text-xs md:text-sm font-normal max-w-2xl">
              Explore industries, discover business categories and find companies, products, services and opportunities across the global economy. Secure verified corporate listings, news hubs, and sector growth indicators.
            </p>

            {/* Hero Search input */}
            <div className="relative max-w-xl">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search sectors, industries, companies, products or services..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/25 text-white placeholder-emerald-200 text-xs outline-none focus:border-white/50 focus:bg-white/15 transition-all"
              />
            </div>

            {/* Quick Actions / CTA */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => {
                  const el = document.getElementById("master-directory");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-white text-emerald-800 hover:bg-emerald-50 font-bold text-xs px-5 py-2.5 rounded-lg transition-all inline-flex items-center gap-1.5"
              >
                Explore Industries
              </button>
              <Link href="/eoi" className="border border-white/30 hover:bg-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all inline-flex items-center gap-1.5">
                Register Your Business
              </Link>
            </div>
          </div>
        </div>

        {/* ── 3. GLOBAL SECTOR SEARCH & QUICK FILTERS ───────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex flex-wrap gap-1.5">
            {["All", "Popular", "Trending", "Emerging", "Featured", "Recently Updated"].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setQuickFilter(f);
                  setSelectedLetter(null);
                }}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors ${
                  quickFilter === f && !selectedLetter
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          
          <div className="text-[10px] text-gray-500 font-medium">
            Showing {filteredSectors.length} of {IGEN_50_SECTORS.length} Sectors
          </div>
        </div>

        {/* ── 4. COMPLETE INDUSTRY DIRECTORY ───────────────────────────────── */}
        <div id="master-directory" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-5">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">All Industries</h2>
              <p className="text-[10px] text-gray-500">Expand categories to drill down from sector to industry & sub-industries</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setExpandedCategories(Object.keys(CATEGORY_GROUPS))}
                className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Expand All
              </button>
              <button
                onClick={() => setExpandedCategories([])}
                className="text-[9px] font-bold text-gray-400 hover:underline"
              >
                Collapse All
              </button>
            </div>
          </div>

          {/* Alphabetical Browsing index strip */}
          <div className="flex flex-wrap gap-1 pb-3 border-b border-gray-100 dark:border-gray-850">
            <button
              onClick={() => { setSelectedLetter(null); setQuickFilter("All"); }}
              className={`w-7 h-7 rounded-md text-[9px] font-bold transition-all flex items-center justify-center ${
                !selectedLetter ? "bg-emerald-600 text-white" : "bg-gray-150 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {alphabetList.map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  setSelectedLetter(letter);
                  setQuickFilter("");
                }}
                className={`w-7 h-7 rounded-md text-[9px] font-bold transition-all flex items-center justify-center ${
                  selectedLetter === letter ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-250"
                }`}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Collapsible taxonomy hierarchy tree */}
          <div className="space-y-2">
            {Object.entries(CATEGORY_GROUPS).map(([category, codes]) => {
              const categorySectors = codes
                .map((c) => sectorMap[c])
                .filter(Boolean)
                .filter((s) => {
                  if (selectedLetter && s.name.charAt(0).toUpperCase() !== selectedLetter) return false;
                  if (!searchQuery.trim()) return true;
                  const q = searchQuery.toLowerCase();
                  return s.name.toLowerCase().includes(q) || s.ministry.toLowerCase().includes(q);
                }) as SectorTaxonomyItem[];

              if (categorySectors.length === 0) return null;
              const isExpanded = expandedCategories.includes(category);

              return (
                <div key={category} className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{category}</span>
                      <span className="text-[9px] text-gray-400 font-medium">({categorySectors.length} sectors)</span>
                    </div>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                  </button>

                  {isExpanded && (
                    <div className="divide-y divide-gray-100 dark:divide-gray-850 bg-white dark:bg-[#0b1329]">
                      {categorySectors.map((sector) => (
                        <div key={sector.code} className="px-4 py-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <span className="text-lg">{sector.icon}</span>
                              <div>
                                <span className="font-bold text-xs text-gray-900 dark:text-white block">{sector.name}</span>
                                <span className="text-[9px] text-gray-400">{sector.ministry}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/20">
                                {sector.count} Companies
                              </span>
                              <button
                                onClick={() => handleFollowSector(sector.code)}
                                className={`p-1.5 rounded-lg transition-all ${
                                  watchlist.includes(sector.code)
                                    ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600"
                                    : "bg-gray-100 dark:bg-gray-900 text-gray-400 hover:text-emerald-600"
                                }`}
                              >
                                {watchlist.includes(sector.code) ? <BookmarkCheck className="h-3 w-3" /> : <Bookmark className="h-3 w-3" />}
                              </button>
                            </div>
                          </div>

                          {/* Sub-industry mock indicators */}
                          <div className="pl-7 grid grid-cols-2 md:grid-cols-3 gap-2">
                            {["Primary Research", "Domestic Operations", "Export & Trading"].map((subName, sIdx) => (
                              <div key={sIdx} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-2 flex items-center justify-between text-[10px]">
                                <span className="text-gray-600 dark:text-gray-400">{subName}</span>
                                <span className="text-gray-400 font-bold">{Math.floor(sector.count / 3) + sIdx} cos</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 5. SECTOR CARDS ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {IGEN_50_SECTORS.slice(0, 3).map((sector, sIdx) => (
            <div key={sector.code} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl p-2 rounded-xl bg-gray-50 dark:bg-gray-900">{sector.icon}</span>
                  <div>
                    <h3 className="font-bold text-xs text-gray-900 dark:text-white">{sector.name}</h3>
                    <span className="text-[9px] text-gray-400">{sector.code}</span>
                  </div>
                </div>
                <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded-full uppercase">
                  Active
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-gray-100 dark:border-gray-850 text-center">
                <div>
                  <div className="font-bold text-xs text-gray-900 dark:text-white">{sector.count}</div>
                  <div className="text-[8px] text-gray-400">Companies</div>
                </div>
                <div>
                  <div className="font-bold text-xs text-gray-900 dark:text-white">{14 + sIdx * 5}</div>
                  <div className="text-[8px] text-gray-400">Countries</div>
                </div>
                <div>
                  <div className="font-bold text-xs text-emerald-500">+{20 - sIdx * 4}%</div>
                  <div className="text-[8px] text-gray-400">Growth</div>
                </div>
              </div>
              <Link href="/eoi" className="block text-center text-[10px] font-bold bg-gray-50 dark:bg-gray-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 py-2 rounded-lg transition-colors border border-gray-100 dark:border-gray-800">
                Explore Sector →
              </Link>
            </div>
          ))}
        </div>

        {/* ── 6. FEATURED SECTORS ───────────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Featured Sectors</h2>
              <p className="text-[10px] text-gray-500">Editorially selected and commercially sponsored global industry priorities</p>
            </div>
            <span className="text-[8px] font-bold bg-amber-500 text-gray-950 px-2 py-0.5 rounded-full">PROMOTED</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { code: "S46", name: "Semiconductors & OSAT", icon: "🎛️", tag: "SPONSORED", desc: "India's semiconductor manufacturing ecosystem, attracting major international FAB foundry investments." },
              { code: "S30", name: "New & Renewable Clean Energy", icon: "☀️", tag: "FEATURED", desc: "National solar arrays, wind turbines, and green hydrogen technology expansion blueprints." }
            ].map((fs) => (
              <div key={fs.code} className="border border-amber-200 dark:border-amber-900/30 bg-amber-50/20 dark:bg-amber-950/5 rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{fs.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-gray-900 dark:text-white">{fs.name}</span>
                        <span className="text-[7px] font-bold bg-amber-500 text-white px-1.5 py-0.5 rounded">
                          {fs.tag}
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-1">{fs.desc}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-amber-200/40 dark:border-amber-900/20">
                  <span className="text-[9px] text-gray-500 font-medium">Active news feed connected</span>
                  <Link href="/eoi" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] px-3.5 py-1.5 rounded-lg transition-colors">
                    Explore Hub →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 7. POPULAR SECTORS ───────────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Most Explored Sectors</h2>
              <p className="text-[10px] text-gray-500">Most active sectors based on platform search, view and follow volume</p>
            </div>
            <div className="flex gap-1">
              {(["today", "week", "month"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivePopularTab(tab)}
                  className={`text-[9px] font-bold px-3 py-1 rounded-lg transition-all capitalize ${
                    activePopularTab === tab
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {POPULAR_SECTORS_DATA[activePopularTab].map((code, idx) => {
              const s = sectorMap[code];
              if (!s) return null;
              return (
                <Link href="/eoi" key={code} className="border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 rounded-xl p-3 text-center hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group">
                  <span className="text-xl block mb-1">{s.icon}</span>
                  <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{s.name}</span>
                  <span className="text-[8px] text-emerald-500 font-bold block mt-1">
                    #{idx + 1} Popularity Index
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ── 8. TRENDING SECTORS ───────────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Trending Industries</h2>
            <p className="text-[10px] text-gray-500">Sectors experiencing rapid spikes in weekly corporate registrations and enquiries</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {["S02", "S46", "S30", "S42", "S38", "S45"].map((code, idx) => {
              const s = sectorMap[code];
              if (!s) return null;
              return (
                <div key={code} className="border border-gray-200 dark:border-gray-800 rounded-xl p-3 text-center bg-gray-50/20 dark:bg-gray-900/20">
                  <span className="text-xl block mb-1">{s.icon}</span>
                  <span className="font-bold text-[9px] text-gray-900 dark:text-white block truncate">{s.name}</span>
                  <div className="flex items-center justify-center gap-0.5 mt-1 text-[9px] text-orange-500 font-bold">
                    <TrendingUp className="h-3 w-3" />
                    <span>+{35 - idx * 4}% spike</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 9. EMERGING SECTORS ───────────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Emerging Industries</h2>
              <p className="text-[10px] text-gray-500">New industrial niches with high innovation scores and funding entry pipelines</p>
            </div>
            <span className="text-[8px] font-bold bg-purple-100 dark:bg-purple-950/30 text-purple-600 px-2 py-0.5 rounded-full">INNOVATIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { code: "S36", name: "Space & ISRO Tech", tags: ["Satellite Constellations", "Launchers", "Space Logistics"] },
              { code: "S06", name: "Biotechnology", tags: ["Genomic Editing", "Biologics", "Pharma CDMO"] },
              { code: "S49", name: "Water Resources Tech", tags: ["Desalination Tech", "Recycle Systems", "IoT Quality Monitors"] }
            ].map((es) => (
              <div key={es.code} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 bg-gray-50/10 dark:bg-gray-900/10 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚀</span>
                  <span className="font-bold text-xs text-gray-900 dark:text-white">{es.name}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {es.tags.map((t) => (
                    <span key={t} className="text-[8px] bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 px-1.5 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 10. SECTOR RANKINGS ──────────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Sector Rankings</h2>
              <p className="text-[10px] text-gray-500">Global leaderboard based on verification and activity index metrics</p>
            </div>
            <div className="flex gap-1">
              {(["views", "followers", "activity"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveRankTab(tab)}
                  className={`text-[9px] font-bold px-3 py-1 rounded-lg transition-all capitalize ${
                    activeRankTab === tab
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-gray-500 uppercase border-b border-gray-100 dark:border-gray-850">
                  <th className="text-left py-2 pr-3">Rank</th>
                  <th className="text-left py-2 pr-3">Sector</th>
                  <th className="text-right py-2 pr-3">Verified Cos</th>
                  <th className="text-right py-2 pr-3">News Flow</th>
                  <th className="text-center py-2">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                {IGEN_50_SECTORS.slice(0, 5).map((s, idx) => (
                  <tr key={s.code} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30">
                    <td className="py-2.5 font-bold text-gray-500">#{idx + 1}</td>
                    <td className="py-2.5 font-bold text-gray-900 dark:text-white">{s.icon} {s.name}</td>
                    <td className="py-2.5 text-right font-medium">{s.count}</td>
                    <td className="py-2.5 text-right font-medium">{s.count * 4} stories</td>
                    <td className="py-2.5 text-center">
                      <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded font-bold">
                        {98 - idx * 4}.5
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 11. GLOBAL SECTOR STATISTICS ────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Global Sector Statistics</h2>
            <p className="text-[10px] text-gray-500">Platform-wide statistics regarding sector taxonomy updates and listings</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {[
              { val: "50", label: "Total Sectors", icon: Layers, color: "text-blue-500" },
              { val: "150+", label: "Industries", icon: Activity, color: "text-emerald-500" },
              { val: "3,200+", label: "Verified Companies", icon: CheckCircle, color: "text-orange-500" },
              { val: "84", label: "Countries Active", icon: Globe, color: "text-purple-500" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-50/50 dark:bg-gray-900/30 rounded-xl p-4 border border-gray-100 dark:border-gray-850">
                <stat.icon className={`h-5 w-5 mx-auto mb-1.5 ${stat.color}`} />
                <div className="font-display text-base font-extrabold text-gray-950 dark:text-white">{stat.val}</div>
                <div className="text-[9px] text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 12. SECTOR ACTIVITY ──────────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Sector Activity</h2>
            <p className="text-[10px] text-gray-500">Real-time indicators of business expansion and product catalog upgrades</p>
          </div>

          <div className="space-y-2">
            {[
              { text: "Electronics & IT & Components", event: "32 new verified companies registered from Bengaluru and Noida hubs.", time: "1h ago", icon: "💻" },
              { text: "Logistics & Supply Chain", event: "14 product lines uploaded for cold storage logistics components.", time: "3h ago", icon: "🚚" },
              { text: "Ayush & Ayurveda", event: "Ayurvedic standards draft expansion announced, 10 laboratories added.", time: "6h ago", icon: "🌿" }
            ].map((act, idx) => (
              <div key={idx} className="flex gap-3 text-xs items-start p-3 rounded-xl border border-gray-100 dark:border-gray-850 hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-all">
                <span className="text-base p-1.5 rounded-lg bg-gray-100 dark:bg-gray-900">{act.icon}</span>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{act.text}</div>
                  <p className="text-gray-500 mt-0.5 text-[10px]">{act.event}</p>
                  <span className="text-[8px] text-gray-450 block mt-1"><Clock className="h-2 w-2 inline mr-0.5" />{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 13. COMPANIES ACROSS INDUSTRIES ──────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Discover Companies by Industry</h2>
              <p className="text-[10px] text-gray-500">Gateway to individual verified companies within selected sectors</p>
            </div>
            <select
              value={selectedEcosystemSector}
              onChange={(e) => setSelectedEcosystemSector(e.target.value)}
              className="text-[10px] font-bold p-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none"
            >
              {IGEN_50_SECTORS.slice(0, 15).map((s) => (
                <option key={s.code} value={s.code}>
                  {s.icon} {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-gray-50/50 dark:bg-gray-900/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{activeSectorObj.icon}</span>
              <span className="font-bold text-xs text-gray-950 dark:text-white">{activeSectorObj.name}</span>
            </div>
            <p className="text-[10px] text-gray-500">
              There are {activeSectorObj.count} registered companies in this sector.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {[
                { name: "Alpha Tech Products", country: "India", type: "Verified Manufacturer" },
                { name: "IndoGlobal Export Group", country: "Singapore", type: "Verified Supplier" }
              ].map((co, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-3 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold">{co.name}</div>
                    <div className="text-[9px] text-gray-450">{co.type} · {co.country}</div>
                  </div>
                  <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                    View Profile →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 14. PRODUCTS & SERVICES BY SECTOR ────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Find Products & Services by Industry</h2>
            <p className="text-[10px] text-gray-500">Drill down directly from product taxonomy to verifying business entities</p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              "Agri Fertilizers", "Ayurvedic Oils", "Micro-Sensors", "EV Lithium Cells", "Subsea Telemetry Cables",
              "Green Steel Coils", "Hyperscale Hosting", "CDMO Formulations", "Space Launch Modules"
            ].map((pTag, idx) => (
              <span key={idx} className="text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-lg border border-emerald-100 dark:border-emerald-900/40 inline-flex items-center gap-1">
                <Package className="h-3 w-3" /> {pTag}
              </span>
            ))}
          </div>
        </div>

        {/* ── 15. BUSINESS TYPE EXPLORER ───────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore Businesses by Type</h2>
            <p className="text-[10px] text-gray-500">Filter directory listings based on supply-chain role and business profile</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Manufacturers", icon: Factory, count: "1,200+ listed" },
              { name: "Exporters & Importers", icon: Globe, count: "820+ listed" },
              { name: "Service Providers", icon: Briefcase, count: "1,450+ listed" },
              { name: "Technology Providers", icon: Zap, count: "720+ listed" }
            ].map((bt, idx) => (
              <div key={idx} className="border border-gray-150 dark:border-gray-800 hover:border-emerald-300 dark:hover:border-emerald-800 p-4 rounded-xl text-center space-y-1 bg-gray-50/50 dark:bg-gray-900/30 transition-all">
                <bt.icon className="h-5 w-5 mx-auto text-emerald-600 dark:text-emerald-400" />
                <div className="font-bold text-[10px] text-gray-950 dark:text-white">{bt.name}</div>
                <div className="text-[8px] text-gray-400">{bt.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 16. LATEST SECTOR NEWS ───────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Latest Sector News</h2>
              <p className="text-[10px] text-gray-500">Important regulatory and commercial announcements across major industries</p>
            </div>
            <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
              Explore Sector News →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {NEWS_MOCK.map((n) => (
              <div key={n.id} className="border border-gray-200 dark:border-gray-800 p-3.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all flex gap-3">
                <span className="text-xl p-2 rounded-xl bg-gray-50 dark:bg-gray-900 shrink-0">{n.icon}</span>
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                    {n.sector}
                  </span>
                  <h4 className="font-bold text-xs text-gray-950 dark:text-white leading-tight">
                    {n.title}
                  </h4>
                  <div className="text-[8px] text-gray-400">
                    {n.source} · {n.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 17. SECTOR INTELLIGENCE ──────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-3xl p-6 text-white text-center relative overflow-hidden">
          <div className="relative z-10 space-y-3">
            <span className="text-[8px] font-bold bg-amber-500 text-gray-950 px-2 py-0.5 rounded-full uppercase">
              B2B Market Intelligence
            </span>
            <h3 className="font-display text-base md:text-lg font-bold">Explore Sector Intelligence</h3>
            <p className="text-purple-200 text-[11px] max-w-xl mx-auto">
              Access deep industry forecasts, technological roadmaps, regulatory risk matrix reports, and competitive landscape files verified by analysts.
            </p>
            <Link href="/eoi" className="inline-flex items-center gap-1.5 bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-xs px-5 py-2 rounded-lg transition-colors">
              Explore Industry Intelligence <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* ── 18. FOLLOW A SECTOR ──────────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Follow a Sector</h2>
            <p className="text-[10px] text-gray-500">Configure your personal watch dashboard by subscribing to real-time sector triggers</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {IGEN_50_SECTORS.slice(0, 8).map((s) => (
              <button
                key={s.code}
                onClick={() => handleFollowSector(s.code)}
                className={`p-2.5 rounded-xl border text-[10px] font-bold transition-all flex items-center justify-between gap-2 ${
                  watchlist.includes(s.code)
                    ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] text-gray-700 dark:text-gray-300 hover:border-emerald-300"
                }`}
              >
                <span className="truncate">{s.icon} {s.name}</span>
                {watchlist.includes(s.code) ? (
                  <CheckCircle className="h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Plus className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── 19. SECTOR ALERTS ───────────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Get Sector Alerts</h2>
            <p className="text-[10px] text-gray-500">Configure email triggers for new registrations, investments, and partnership announcements</p>
          </div>

          <form onSubmit={handleCreateAlert} className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <select
              value={alertSectorCode}
              onChange={(e) => setAlertSectorCode(e.target.value)}
              className="text-xs p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none"
            >
              {IGEN_50_SECTORS.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.icon} {s.name}
                </option>
              ))}
            </select>
            <input
              type="email"
              required
              value={alertEmail}
              onChange={(e) => setAlertEmail(e.target.value)}
              placeholder="Enter your corporate email address..."
              className="text-xs p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none"
            />
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2.5 rounded-lg transition-all">
              Create Sector Alert
            </button>
          </form>

          {alertSuccess && (
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 p-3 rounded-lg flex items-center gap-2 text-xs text-emerald-800 dark:text-emerald-400">
              <CheckCircle className="h-4 w-4 shrink-0 text-emerald-600" />
              <span>Sector alert successfully configured! Email verification sent.</span>
            </div>
          )}
        </div>

        {/* ── 20. RECOMMENDED SECTORS ──────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Recommended for You</h2>
            <p className="text-[10px] text-gray-500">Based on your activity logs and watchlisted corporate segments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["S16", "S30", "S42"].map((code) => {
              const s = sectorMap[code];
              if (!s) return null;
              return (
                <div key={code} className="border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/10 dark:bg-emerald-950/5 rounded-xl p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-bold text-xs text-gray-950 dark:text-white">{s.name}</span>
                  </div>
                  <p className="text-[10px] text-gray-500">
                    Recommended because you follow related software and manufacturing categories.
                  </p>
                  <Link href="/eoi" className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] py-2 rounded-lg transition-colors">
                    Explore Recommendations
                  </Link>
                </div>
              );
            })}
          </div>
        </div>



        {/* ── 22. GLOBAL INDUSTRY EXPLORER ─────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Explore Industries Globally</h2>
              <p className="text-[10px] text-gray-500">Filter sector density by geographic headquarters and regional presence</p>
            </div>
            <div className="flex gap-1">
              {["India", "Singapore", "Japan", "USA"].map((country) => (
                <button
                  key={country}
                  onClick={() => setSelectedCountry(country)}
                  className={`text-[9px] font-bold px-3 py-1 rounded-lg transition-colors ${
                    selectedCountry === country
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-500"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50/50 dark:bg-gray-900/30 rounded-xl p-4 space-y-2">
            <span className="text-[9px] font-bold text-emerald-600 uppercase">
              Current Focus Region: {selectedCountry}
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {IGEN_50_SECTORS.slice(0, 4).map((s) => (
                <div key={s.code} className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-150 dark:border-gray-800 text-center">
                  <span className="text-xl block mb-1">{s.icon}</span>
                  <span className="font-bold text-[9px] block text-gray-900 dark:text-white">{s.name}</span>
                  <span className="text-[8.5px] text-gray-400 block mt-0.5">
                    {s.count - 4} verified hubs
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── 23. COMPARE SECTORS ──────────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Compare Industries</h2>
              <p className="text-[10px] text-gray-500">Cross-reference metrics of selected sectors side-by-side</p>
            </div>
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-full flex items-center gap-1">
              <GitCompare className="h-3.5 w-3.5" /> Sector Comparison
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { state: compareA, setState: setCompareA, label: "Sector A" },
              { state: compareB, setState: setCompareB, label: "Sector B" },
              { state: compareC, setState: setCompareC, label: "Sector C" }
            ].map((col, idx) => (
              <div key={idx} className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">{col.label}</label>
                <select
                  value={col.state}
                  onChange={(e) => col.setState(e.target.value)}
                  className="w-full text-[10px] font-bold p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg outline-none"
                >
                  {IGEN_50_SECTORS.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.icon} {s.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto pt-2">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-150 dark:border-gray-800 text-[9px] text-gray-450 uppercase">
                  <th className="text-left py-2">Telemetry Parameter</th>
                  <th className="text-center py-2">{sectorMap[compareA]?.name || "Sector A"}</th>
                  <th className="text-center py-2">{sectorMap[compareB]?.name || "Sector B"}</th>
                  <th className="text-center py-2">{sectorMap[compareC]?.name || "Sector C"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                {[
                  { param: "Listed Companies", a: sectorMap[compareA]?.count, b: sectorMap[compareB]?.count, c: sectorMap[compareC]?.count },
                  { param: "Activity Rating", a: "Very High", b: "High", c: "High" },
                  { param: "Alerts Enabled", a: watchlist.includes(compareA) ? "Yes" : "No", b: watchlist.includes(compareB) ? "Yes" : "No", c: watchlist.includes(compareC) ? "Yes" : "No" }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30">
                    <td className="py-2 text-gray-500 font-medium">{row.param}</td>
                    <td className="py-2 text-center font-bold text-gray-800 dark:text-gray-200">{row.a}</td>
                    <td className="py-2 text-center font-bold text-gray-800 dark:text-gray-200">{row.b}</td>
                    <td className="py-2 text-center font-bold text-gray-800 dark:text-gray-200">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── 24. SECTOR LEADERBOARD ───────────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex items-center justify-between">
            <div>
              <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Leading Sectors</h2>
              <p className="text-[10px] text-gray-500">Highest-ranked sectors in domestic export metrics and capital investment</p>
            </div>
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-1 rounded-full flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5" /> Platform Leaderboard
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { pos: "🥈 2nd Place", name: "Semiconductors", score: "94.2 Score" },
              { pos: "🥇 1st Place", name: "AI & Cyber Security", score: "98.5 Score", highlight: true },
              { pos: "🥉 3rd Place", name: "Electronics & IT", score: "91.8 Score" }
            ].map((lead, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-xl text-center space-y-1.5 border ${
                  lead.highlight
                    ? "border-emerald-300 bg-emerald-50/30 dark:bg-emerald-950/15"
                    : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30"
                }`}
              >
                <span className="text-[9px] font-bold text-gray-400 block">{lead.pos}</span>
                <div className="font-bold text-xs text-gray-950 dark:text-white truncate">{lead.name}</div>
                <span className="text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400">
                  {lead.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 25. INDUSTRY OPPORTUNITIES ───────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Industry Opportunities</h2>
            <p className="text-[10px] text-gray-500">Government initiatives, PLI approvals, and venture pipelines per sector</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { title: "Semiconductor OSAT Hub Incentives", desc: "Government grants up to 50% capital support for chip testing units.", status: "Applications Open" },
              { title: "Green Hydrogen SIGHT Subsidies", desc: "Venture capital match programs for clean energy electrolysis pilot plants.", status: "Draft Phase" }
            ].map((opp, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-800 p-4 rounded-xl bg-gray-50/20 dark:bg-gray-900/20 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">{opp.title}</h4>
                  <p className="text-[10px] text-gray-500 mt-1">{opp.desc}</p>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-[9px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
                    {opp.status}
                  </span>
                  <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── 26. FEATURED INDUSTRY SPOTLIGHT ──────────────────────────────── */}
        <div className="bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/10 dark:to-emerald-950/10 border border-emerald-200 dark:border-emerald-900/30 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Sponsored Spotlight
            </span>
            <h3 className="font-display text-base font-bold text-gray-900 dark:text-white">Clean Tech & Electric Vehicles</h3>
            <p className="text-[11px] text-gray-650 dark:text-gray-400 max-w-xl">
              Gain exclusive visibility within the Clean Mobility sector and connect directly with raw lithium exporters and battery pack assembly units.
            </p>
          </div>
          <Link href="/eoi" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all shrink-0">
            Book Spotlight Package
          </Link>
        </div>

        {/* ── 27. PREMIUM SEARCH & DISCOVERY ───────────────────────────────── */}
        <div className="bg-gradient-to-br from-slate-950 via-[#0a1526] to-[#122847] rounded-3xl p-6 text-white border border-slate-800">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="flex justify-center gap-1.5">
              <span className="text-[8px] font-bold bg-amber-500 text-gray-950 px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Crown className="h-2.5 w-2.5" /> PRO ACCELERATE
              </span>
              <span className="text-[8px] font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Lock className="h-2.5 w-2.5" /> ADVANCED SEARCH
              </span>
            </div>
            <h3 className="font-display text-lg md:text-xl font-bold">Unlock Advanced Industry Discovery</h3>
            <p className="text-slate-400 text-xs md:text-sm font-normal">
              Unlock the advanced corporate search filter suite. Access company contact details, download PDF reports, and export verified supplier directories.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 text-center">
              {[
                { label: "1. Advanced Filters", icon: SlidersHorizontal },
                { label: "2. Sector Comparison", icon: Scale },
                { label: "3. Direct CSV Export", icon: Download },
                { label: "4. Saved Dashboards", icon: BookmarkCheck },
                { label: "5. Deep Statistics", icon: BarChart3 },
                { label: "6. Direct Company Chat", icon: MessageSquare },
                { label: "7. Customized Alerts", icon: BellRing },
                { label: "8. Market Report Access", icon: FileText }
              ].map((feat, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-2.5">
                  <feat.icon className="h-4 w-4 mx-auto text-amber-400 mb-1" />
                  <span className="text-[8px] text-white font-semibold block">{feat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-3 pt-2">
              <Link href="/eoi" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all">
                Upgrade Now
              </Link>
            </div>
          </div>
        </div>

        {/* ── 28. REGISTER YOUR BUSINESS ───────────────────────────────────── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 md:p-8 shadow-xs text-center space-y-4">
          <div className="flex justify-center">
            <span className="text-[8px] font-bold bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Get Listed
            </span>
          </div>
          <h3 className="font-display text-base md:text-lg font-bold text-gray-900 dark:text-white">Get Listed in Your Industry</h3>
          <p className="text-[11px] text-gray-500 max-w-lg mx-auto">
            Register your business profile to become visible to thousands of international buyers, distributors, and venture firms looking for verified corporate entities.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-left max-w-xl mx-auto pt-2">
            {[
              "✓ Standard Business Listing",
              "✓ Verification Connection",
              "✓ Industry Search Priority",
              "✓ Standard Enquiry Mailbox",
              "✓ Basic Visitor Analytics",
              "✓ Custom Keyword Tags"
            ].map((ben, idx) => (
              <span key={idx} className="text-[9.5px] font-medium text-gray-600 dark:text-gray-400">
                {ben}
              </span>
            ))}
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <Link href="/eoi" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-8 py-3 rounded-xl transition-all">
              Register Your Business →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

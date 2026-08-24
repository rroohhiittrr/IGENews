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
  ArrowLeft
} from "lucide-react";
import { mockData } from "@/lib/mock/factory";

// Dynamic country database models
interface GlobalCountryProfile {
  code: string;
  name: string;
  flag: string;
  region: string;
  subRegion: string;
  gdp: string;
  gdpValue: number; // for sorting
  growth: string;
  growthValue: number; // for sorting
  exports: string;
  imports: string;
  capital: string;
  currency: string;
  inflation: string;
  tradeBalance: string;
  fdi: string;
  focusReason?: string;
  mainIndustries: string[];
}

const GLOBAL_COUNTRIES_DB: GlobalCountryProfile[] = [
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    region: "Asia",
    subRegion: "South Asia",
    gdp: "$3.75T",
    gdpValue: 3.75,
    growth: "+7.3%",
    growthValue: 7.3,
    exports: "$450B",
    imports: "$690B",
    capital: "New Delhi",
    currency: "INR (₹)",
    inflation: "4.8%",
    tradeBalance: "-$240B",
    fdi: "$71.4B",
    focusReason: "Manufacturing sector accelerates amid rising global demand.",
    mainIndustries: ["Information Technology", "Pharmaceuticals", "Automotive", "Textiles"]
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    subRegion: "Western Asia",
    gdp: "$507B",
    gdpValue: 0.507,
    growth: "+3.8%",
    growthValue: 3.8,
    exports: "$360B",
    imports: "$275B",
    capital: "Abu Dhabi",
    currency: "AED (د.إ)",
    inflation: "2.4%",
    tradeBalance: "+$85B",
    fdi: "$22.4B",
    focusReason: "Non-oil trade expands as maritime logistics investments cross $12B.",
    mainIndustries: ["Petroleum & Petrochemicals", "Logistics", "Financial Services", "Tourism"]
  },
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    region: "Americas",
    subRegion: "North America",
    gdp: "$27.9T",
    gdpValue: 27.9,
    growth: "+2.5%",
    growthValue: 2.5,
    exports: "$2.05T",
    imports: "$3.12T",
    capital: "Washington D.C.",
    currency: "USD ($)",
    inflation: "3.2%",
    tradeBalance: "-$1.07T",
    fdi: "$285B",
    focusReason: "Defense technology and hardware reshoring agreements in focus.",
    mainIndustries: ["Technology", "Aerospace & Defense", "Financial Services", "Healthcare"]
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    region: "Europe",
    subRegion: "Western Europe",
    gdp: "$4.46T",
    gdpValue: 4.46,
    growth: "+1.2%",
    growthValue: 1.2,
    exports: "$1.62T",
    imports: "$1.40T",
    capital: "Berlin",
    currency: "EUR (€)",
    inflation: "2.1%",
    tradeBalance: "+$220B",
    fdi: "$48.6B",
    focusReason: "Green hydrogen import corridors and auto manufacturing transition.",
    mainIndustries: ["Automotive", "Mechanical Engineering", "Chemicals", "Electrical Equipment"]
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    region: "Asia",
    subRegion: "Southeast Asia",
    gdp: "$501B",
    gdpValue: 0.501,
    growth: "+3.1%",
    growthValue: 3.1,
    exports: "$475B",
    imports: "$412B",
    capital: "Singapore City",
    currency: "SGD ($)",
    inflation: "2.8%",
    tradeBalance: "+$63B",
    fdi: "$141B",
    focusReason: "Cross-border digital settlement systems set up with bilateral nodes.",
    mainIndustries: ["Financial Services", "Semiconductors", "Petroleum Refining", "Biomedical"]
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    region: "Asia",
    subRegion: "East Asia",
    gdp: "$4.21T",
    gdpValue: 4.21,
    growth: "+1.4%",
    growthValue: 1.4,
    exports: "$715B",
    imports: "$810B",
    capital: "Tokyo",
    currency: "JPY (¥)",
    inflation: "2.5%",
    tradeBalance: "-$95B",
    fdi: "$32.1B",
    focusReason: "Joint ventures on high-purity silicon substrate material fabrication.",
    mainIndustries: ["Automotive", "Electronics & Semiconductors", "Machine Tools", "Steel"]
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    region: "Europe",
    subRegion: "Northern Europe",
    gdp: "$3.34T",
    gdpValue: 3.34,
    growth: "+1.1%",
    growthValue: 1.1,
    exports: "$520B",
    imports: "$890B",
    capital: "London",
    currency: "GBP (£)",
    inflation: "2.3%",
    tradeBalance: "-$370B",
    fdi: "$62.4B",
    focusReason: "Digital trade frameworks signed to reduce customs processing overhead.",
    mainIndustries: ["Financial Services", "Aerospace", "Pharmaceuticals", "Creative Industries"]
  },
  {
    code: "VN",
    name: "Vietnam",
    flag: "🇻🇳",
    region: "Asia",
    subRegion: "Southeast Asia",
    gdp: "$430B",
    gdpValue: 0.43,
    growth: "+6.2%",
    growthValue: 6.2,
    exports: "$372B",
    imports: "$358B",
    capital: "Hanoi",
    currency: "VND (₫)",
    inflation: "3.7%",
    tradeBalance: "+$14B",
    fdi: "$36.6B",
    focusReason: "China-Plus-One hardware assemblies and logistics expansion.",
    mainIndustries: ["Electronics", "Textiles", "Footwear", "Agricultural Processing"]
  }
];

export default function NewsPOCAllCountryView({ onBack }: { onBack?: () => void }) {
  // --- STATE VARIABLES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [directoryLayout, setDirectoryLayout] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"name" | "gdp" | "growth">("name");

  // Comparison Tool States
  const [compareA, setCompareA] = useState("India");
  const [compareB, setCompareB] = useState("United Arab Emirates");
  const [compareC, setCompareC] = useState("Germany");
  const [comparisonVisible, setComparisonVisible] = useState(false);

  // Bilateral Explorer States
  const [bilateralA, setBilateralA] = useState("India");
  const [bilateralB, setBilateralB] = useState("United Arab Emirates");
  const [bilateralVisible, setBilateralVisible] = useState(true);

  // AI intelligence states
  const [aiIntelligenceUnlocked, setAiIntelligenceUnlocked] = useState(false);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [proSuccess, setProSuccess] = useState(false);

  const getCountryFlag = (name: string): string => {
    const match = GLOBAL_COUNTRIES_DB.find(c => c.name === name);
    return match ? match.flag : "🌐";
  };

  // Filter & sort directories
  const getFilteredCountries = () => {
    let result = [...GLOBAL_COUNTRIES_DB];

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.capital.toLowerCase().includes(q) || 
        c.region.toLowerCase().includes(q)
      );
    }

    if (selectedRegion !== "All") {
      result = result.filter(c => c.region === selectedRegion);
    }

    if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "gdp") {
      result.sort((a, b) => b.gdpValue - a.gdpValue);
    } else if (sortBy === "growth") {
      result.sort((a, b) => b.growthValue - a.growthValue);
    }

    return result;
  };

  const currentCompareA = GLOBAL_COUNTRIES_DB.find(c => c.name === compareA) || GLOBAL_COUNTRIES_DB[0];
  const currentCompareB = GLOBAL_COUNTRIES_DB.find(c => c.name === compareB) || GLOBAL_COUNTRIES_DB[1];
  const currentCompareC = GLOBAL_COUNTRIES_DB.find(c => c.name === compareC) || GLOBAL_COUNTRIES_DB[3];

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16">
      
      {/* 01. GLOBAL COUNTRIES HERO */}
      <section className="bg-gradient-to-br from-[#0c1020] via-[#0d132b] to-[#05070e] text-white relative overflow-hidden border-b border-gray-805">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                {onBack && (
                  <button
                    onClick={onBack}
                    className="mr-2 p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-all"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                )}
                <span className="text-[10px] font-mono font-bold bg-blue-650 px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs">
                  GLOBAL COUNTRY INTELLIGENCE
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Explore 195 Countries
              </h1>
              <p className="text-slate-350 text-sm md:text-base font-normal max-w-2xl leading-relaxed">
                Discover countries, compare economies, explore bilateral trade relationships and identify global business opportunities.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="#directory-section"
                  className="bg-blue-600 hover:bg-blue-755 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-blue-500/20 flex items-center gap-1.5"
                >
                  Explore Countries <ArrowRight className="h-4.5 w-4.5" />
                </a>
                <a
                  href="#comparison-section"
                  className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Scale className="h-4 w-4 text-blue-450" /> Compare Countries
                </a>
                <a
                  href="#bilateral-section"
                  className="bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
                >
                  Explore Bilateral Trade
                </a>
              </div>
            </div>

            {/* Global Coverage Indicators */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xs shadow-xl">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
                Global Platform Coverage
              </h3>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="text-2xl font-extrabold text-white">195</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Sovereign Countries</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">6+</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Regions Monitored</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">Global</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Trade Coverage</div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">12+</div>
                  <div className="text-[10px] text-slate-400 font-semibold leading-none mt-1">Economic Indicators</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-10">

        {/* 02. COUNTRY SEARCH & QUICK FILTERS */}
        <section id="directory-section" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-blue-500 font-medium text-gray-900 dark:text-white"
              />
            </div>

            {/* Sorting and Layout Selectors */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-semibold">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs font-bold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-1.5 rounded-lg outline-none cursor-pointer"
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="gdp">Nominal GDP</option>
                  <option value="growth">GDP Growth</option>
                </select>
              </div>

              <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg p-0.5">
                <button
                  onClick={() => setDirectoryLayout("grid")}
                  className={`p-1.5 rounded-md transition-all ${directoryLayout === "grid" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDirectoryLayout("list")}
                  className={`p-1.5 rounded-md transition-all ${directoryLayout === "list" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-gray-600"}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Region Tabs */}
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap pt-2 border-t border-gray-100 dark:border-gray-855">
            {["All", "Asia", "Europe", "Middle East", "Americas", "Africa"].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  selectedRegion === region
                    ? "bg-blue-600 text-white"
                    : "bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-500 hover:border-blue-500"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </section>

        {/* 03. COUNTRIES IN FOCUS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Star className="h-4.5 w-4.5 text-blue-600 fill-blue-500" /> Countries in Focus
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Bilateral trade activity</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {GLOBAL_COUNTRIES_DB.slice(0, 4).map((c) => (
              <div
                key={c.code}
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-3xs flex flex-col justify-between hover:border-blue-650 transition-all duration-300 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{c.flag}</span>
                    <span className="text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-955/20 px-2 py-0.5 rounded border border-blue-200/20 uppercase tracking-widest">
                      {c.region}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-955 dark:text-white leading-tight group-hover:text-blue-650 transition-colors">
                    {c.name}
                  </h3>
                  <p className="text-[10.5px] text-gray-500 dark:text-slate-350 leading-relaxed font-normal italic">
                    "{c.focusReason}"
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-gray-100 dark:border-gray-855 flex justify-between items-center text-[9px] font-bold">
                  <span className="text-gray-400">GDP: {c.gdp}</span>
                  <Link href={`/en/news-poc/country-news/my`} className="text-blue-605 hover:underline">
                    Explore Dashboard →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04. ALL 195 COUNTRIES DIRECTORY */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">All Countries Directory</h2>
          </div>

          {getFilteredCountries().length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl space-y-3">
              <FolderMinus className="h-10 w-10 text-gray-400 mx-auto" />
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">No Countries Match</h4>
              <p className="text-[10px] text-gray-500">Clear search or choose another region tab.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedRegion("All");
                }}
                className="bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          ) : directoryLayout === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {getFilteredCountries().map((c) => (
                <div
                  key={c.code}
                  className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-805 rounded-2xl p-5 shadow-3xs hover:border-blue-500 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{c.flag}</span>
                      <span className="text-[9px] font-bold text-gray-400">{c.subRegion}</span>
                    </div>
                    <h3 className="text-xs font-bold text-gray-955 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
                      {c.name}
                    </h3>
                    <div className="space-y-1 text-[10px] text-gray-500 pt-1">
                      <div className="flex justify-between">
                        <span>GDP:</span>
                        <span className="font-mono text-gray-900 dark:text-white font-bold">{c.gdp}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Growth:</span>
                        <span className="text-emerald-500 font-bold">{c.growth}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Exports:</span>
                        <span className="font-mono text-blue-600 font-bold">{c.exports}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-4 border-t border-gray-100 dark:border-gray-855 flex justify-between items-center text-[9px] font-bold">
                    <button
                      onClick={() => {
                        setCompareA(c.name);
                        setComparisonVisible(true);
                        document.getElementById("comparison-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-gray-400 hover:text-blue-605 flex items-center gap-0.5 animate-pulse"
                    >
                      <Scale className="h-3.5 w-3.5" /> Compare
                    </button>
                    <Link href={`/en/news-poc/country-news/my`} className="text-blue-600 hover:underline">
                      View Profile
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#0f172a] border border-gray-255 dark:border-gray-805 rounded-2xl overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 text-gray-455 font-bold border-b border-gray-200 dark:border-gray-800">
                    <th className="p-3">COUNTRY</th>
                    <th className="p-3">REGION</th>
                    <th className="p-3">GDP</th>
                    <th className="p-3">GROWTH</th>
                    <th className="p-3">EXPORTS</th>
                    <th className="p-3 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                  {getFilteredCountries().map((c) => (
                    <tr key={c.code} className="hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                      <td className="p-3 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <span className="text-xl">{c.flag}</span>
                        {c.name}
                      </td>
                      <td className="p-3 text-gray-500">{c.region}</td>
                      <td className="p-3 font-mono font-bold text-gray-800 dark:text-gray-250">{c.gdp}</td>
                      <td className="p-3 text-emerald-500 font-bold">{c.growth}</td>
                      <td className="p-3 font-mono text-blue-600 font-bold">{c.exports}</td>
                      <td className="p-3 text-right space-x-2">
                        <button
                          onClick={() => {
                            setCompareA(c.name);
                            setComparisonVisible(true);
                            document.getElementById("comparison-section")?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="text-[9.5px] font-bold border border-gray-200 dark:border-gray-800 hover:border-blue-500 rounded px-2.5 py-1"
                        >
                          Compare
                        </button>
                        <Link href={`/en/news-poc/country-news/my`} className="text-[9.5px] font-extrabold text-blue-600 hover:underline">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 05. GLOBAL ECONOMIC SNAPSHOT */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-4.5 w-4.5 text-blue-650" /> Global Economic Snapshot (FY2026)
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 text-center">
            {[
              { label: "Global GDP", val: "$115.4T" },
              { label: "Global Trade Output", val: "$34.2T" },
              { label: "Global Avg Growth", val: "3.1%" },
              { label: "Global FDI Capital", val: "$1.8T" },
              { label: "Global Inflation Avg", val: "3.8%" }
            ].map((kpi, idx) => (
              <div key={idx} className="p-3.5 bg-gray-55 dark:bg-gray-900/60 rounded-xl border border-gray-150/40 dark:border-gray-805">
                <span className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-wider">{kpi.label}</span>
                <div className="font-display text-sm font-bold text-blue-650 mt-1">{kpi.val}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 06. GLOBAL COUNTRY RANKINGS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-805 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Award className="h-4.5 w-4.5 text-blue-600" /> Global GDP Rankings
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Top economies</span>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 text-gray-455 font-bold border-b border-gray-200 dark:border-gray-800">
                  <th className="p-3">RANK</th>
                  <th className="p-3">COUNTRY</th>
                  <th className="p-3">NOMINAL GDP</th>
                  <th className="p-3">GROWTH RATE</th>
                  <th className="p-3">CORRIDOR STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                {[...GLOBAL_COUNTRIES_DB].sort((a, b) => b.gdpValue - a.gdpValue).map((c, idx) => (
                  <tr key={c.code} className="hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <td className="p-3 font-mono font-bold text-gray-400">#{idx + 1}</td>
                    <td className="p-3 font-bold text-gray-955 dark:text-white flex items-center gap-2">
                      <span className="text-lg">{c.flag}</span> {c.name}
                    </td>
                    <td className="p-3 font-mono font-bold text-blue-600">{c.gdp}</td>
                    <td className="p-3 text-emerald-500 font-bold">{c.growth}</td>
                    <td className="p-3">
                      <span className="text-[8px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 uppercase">
                        Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 07. COUNTRY COMPARISON */}
        <section id="comparison-section" className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-6">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="h-4.5 w-4.5 text-blue-605" /> Compare Countries
            </h2>
            <p className="text-xs text-gray-400 mt-1 leading-normal font-normal">
              Compare up to three countries side-by-side across economic, trade and business indicators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-3 bg-gray-55 dark:bg-gray-900 rounded-xl space-y-1 border border-gray-200/50 dark:border-gray-805">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Select Country A</label>
              <select
                value={compareA}
                onChange={(e) => setCompareA(e.target.value)}
                className="w-full bg-white dark:bg-gray-955 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs font-bold"
              >
                {GLOBAL_COUNTRIES_DB.map(c => (
                  <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-gray-55 dark:bg-gray-900 rounded-xl space-y-1 border border-gray-200/50 dark:border-gray-805">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Select Country B</label>
              <select
                value={compareB}
                onChange={(e) => setCompareB(e.target.value)}
                className="w-full bg-white dark:bg-gray-955 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs font-bold"
              >
                {GLOBAL_COUNTRIES_DB.map(c => (
                  <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-gray-55 dark:bg-gray-900 rounded-xl space-y-1 border border-gray-200/50 dark:border-gray-805">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Select Country C</label>
              <select
                value={compareC}
                onChange={(e) => setCompareC(e.target.value)}
                className="w-full bg-white dark:bg-gray-955 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs font-bold"
              >
                {GLOBAL_COUNTRIES_DB.map(c => (
                  <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => setComparisonVisible(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Compare Now
            </button>
          </div>

          {comparisonVisible && (
            <div className="overflow-x-auto border-t border-gray-150 dark:border-gray-855 pt-6">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 text-gray-455 font-bold border-b border-gray-200 dark:border-gray-800">
                    <th className="p-3">INDICATOR</th>
                    <th className="p-3">{currentCompareA.flag} {currentCompareA.name}</th>
                    <th className="p-3">{currentCompareB.flag} {currentCompareB.name}</th>
                    <th className="p-3">{currentCompareC.flag} {currentCompareC.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-105 dark:divide-gray-855 font-semibold text-gray-700 dark:text-slate-200">
                  <tr>
                    <td className="p-3 font-bold text-gray-905 dark:text-white uppercase tracking-wider text-[10px]">Capital</td>
                    <td className="p-3">{currentCompareA.capital}</td>
                    <td className="p-3">{currentCompareB.capital}</td>
                    <td className="p-3">{currentCompareC.capital}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-gray-905 dark:text-white uppercase tracking-wider text-[10px]">Nominal GDP</td>
                    <td className="p-3 font-mono text-blue-600">{currentCompareA.gdp}</td>
                    <td className="p-3 font-mono text-blue-600">{currentCompareB.gdp}</td>
                    <td className="p-3 font-mono text-blue-600">{currentCompareC.gdp}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-gray-905 dark:text-white uppercase tracking-wider text-[10px]">GDP Growth</td>
                    <td className="p-3 text-emerald-500">{currentCompareA.growth}</td>
                    <td className="p-3 text-emerald-500">{currentCompareB.growth}</td>
                    <td className="p-3 text-emerald-500">{currentCompareC.growth}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-gray-905 dark:text-white uppercase tracking-wider text-[10px]">Currency</td>
                    <td className="p-3">{currentCompareA.currency}</td>
                    <td className="p-3">{currentCompareB.currency}</td>
                    <td className="p-3">{currentCompareC.currency}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-gray-905 dark:text-white uppercase tracking-wider text-[10px]">Inflation CPI</td>
                    <td className="p-3 text-red-500">{currentCompareA.inflation}</td>
                    <td className="p-3 text-red-500">{currentCompareB.inflation}</td>
                    <td className="p-3 text-red-500">{currentCompareC.inflation}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-gray-905 dark:text-white uppercase tracking-wider text-[10px]">Trade Balance</td>
                    <td className="p-3 font-mono">{currentCompareA.tradeBalance}</td>
                    <td className="p-3 font-mono">{currentCompareB.tradeBalance}</td>
                    <td className="p-3 font-mono">{currentCompareC.tradeBalance}</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-gray-905 dark:text-white uppercase tracking-wider text-[10px]">FDI Inflows</td>
                    <td className="p-3 font-mono text-emerald-650">{currentCompareA.fdi}</td>
                    <td className="p-3 font-mono text-emerald-650">{currentCompareB.fdi}</td>
                    <td className="p-3 font-mono text-emerald-650">{currentCompareC.fdi}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 08. BILATERAL TRADE EXPLORER */}
        <section id="bilateral-section" className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-6">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="h-4.5 w-4.5 text-blue-605" /> Bilateral Trade Explorer
            </h2>
            <p className="text-xs text-gray-400 mt-1 leading-normal font-normal">
              Understand the trade relationship between two countries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-3 bg-gray-55 dark:bg-gray-900 rounded-xl space-y-1 border border-gray-200/50 dark:border-gray-805">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Country A (Origin)</label>
              <select
                value={bilateralA}
                onChange={(e) => setBilateralA(e.target.value)}
                className="w-full bg-white dark:bg-gray-955 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs font-bold"
              >
                {GLOBAL_COUNTRIES_DB.map(c => (
                  <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-gray-55 dark:bg-gray-900 rounded-xl space-y-1 border border-gray-200/50 dark:border-gray-805">
              <label className="text-[9px] font-bold text-gray-400 uppercase">Country B (Destination)</label>
              <select
                value={bilateralB}
                onChange={(e) => setBilateralB(e.target.value)}
                className="w-full bg-white dark:bg-gray-955 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs font-bold"
              >
                {GLOBAL_COUNTRIES_DB.map(c => (
                  <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>

          </div>

          <div className="flex justify-center pt-2">
            <button
              onClick={() => setBilateralVisible(true)}
              className="bg-blue-600 hover:bg-blue-755 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Analyze Bilateral Corridor
            </button>
          </div>

          {bilateralVisible && (
            <div className="border-t border-gray-150 dark:border-gray-855 pt-6 space-y-6">
              
              <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-955/10 border border-blue-200/40 dark:border-blue-900/40 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <span className="block text-[8.5px] font-bold text-gray-400 uppercase">Bilateral Corridor</span>
                  <span className="block font-bold text-xs text-gray-900 dark:text-white mt-1">
                    {getCountryFlag(bilateralA)} {bilateralA} ↔ {getCountryFlag(bilateralB)} {bilateralB}
                  </span>
                </div>
                <div>
                  <span className="block text-[8.5px] font-bold text-gray-400 uppercase">Total Bilateral Trade</span>
                  <span className="block font-bold text-xs text-blue-600 mt-1">$87.2 Billion</span>
                </div>
                <div>
                  <span className="block text-[8.5px] font-bold text-gray-400 uppercase">Exports A → B</span>
                  <span className="block font-bold text-xs text-emerald-500 mt-1">$31.6 Billion</span>
                </div>
                <div>
                  <span className="block text-[8.5px] font-bold text-gray-400 uppercase">Accord status</span>
                  <span className="block font-bold text-xs text-purple-600 mt-1">CEPA Active</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="p-4 border border-gray-200 dark:border-gray-855 rounded-xl space-y-2">
                  <h4 className="font-bold text-gray-955 dark:text-white uppercase text-[10px]">Top Traded Products (A → B)</h4>
                  <ul className="list-disc pl-4 space-y-1 font-semibold text-gray-700 dark:text-slate-350">
                    <li>Precious metals & jewels ($12.4B)</li>
                    <li>Refined petrochemical sub-compounds ($8.2B)</li>
                    <li>Woven apparel and textiles ($4.1B)</li>
                  </ul>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-855 rounded-xl space-y-2">
                  <h4 className="font-bold text-gray-955 dark:text-white uppercase text-[10px]">Top Traded Products (B → A)</h4>
                  <ul className="list-disc pl-4 space-y-1 font-semibold text-gray-700 dark:text-slate-355">
                    <li>Heavy machinery & engine spares ($14.6B)</li>
                    <li>Organic chemical base-compounds ($9.1B)</li>
                    <li>Precision electronics modules ($6.2B)</li>
                  </ul>
                </div>
              </div>

            </div>
          )}
        </section>

        {/* 09. GLOBAL TRADE OPPORTUNITIES */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="h-4.5 w-4.5 text-blue-600" /> Global Trade Opportunities
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Active export corridors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { from: "India 🇮🇳", to: "UAE 🇦🇪", product: "Specialty Chemicals", sector: "Biotech", demand: "↑ 14%" },
              { from: "Germany 🇩🇪", to: "India 🇮🇳", product: "OSAT Fab Machinery", sector: "Electronics", demand: "↑ 18%" },
              { from: "Singapore 🇸🇬", to: "India 🇮🇳", product: "Digital Trade Settlement APIs", sector: "Technology", demand: "↑ 22%" }
            ].map((opp, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-3 flex flex-col justify-between hover:border-blue-600 transition-all duration-300 group">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-blue-600 bg-blue-50 dark:bg-blue-955/20 px-2 py-0.5 rounded uppercase">{opp.sector}</span>
                    <span className="text-emerald-500">{opp.demand} Growth</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-955 dark:text-white mt-1 leading-snug group-hover:text-blue-600 transition-colors">
                    {opp.product} Opportunities
                  </h3>
                  <p className="text-[10.5px] text-gray-500 mt-1">Export Corridor: {opp.from} ➔ {opp.to}</p>
                </div>
                <div className="pt-2.5 border-t border-gray-100 dark:border-gray-855 flex justify-end">
                  <Link href="/en/eoi" className="text-[9.5px] font-extrabold text-blue-605 hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. GLOBAL INVESTMENT DESTINATIONS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="h-4.5 w-4.5 text-blue-600" /> Global Investment Destinations
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Priority FDI sectors</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { country: "UAE", sector: "Infrastructure", theme: "Maritime Berth Expansions", signal: "CEPA priority corridor allocations" },
              { country: "India", sector: "Technology", theme: "Semiconductor OSAT Fabs", signal: "50% capital reimbursement grids" },
              { country: "Germany", sector: "Energy", theme: "Green Hydrogen Electrolysis", signal: "Offshore wind feed-in tariff phaseouts" }
            ].map((inv, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xl">{getCountryFlag(inv.country)}</span>
                    <span className="text-[8px] font-bold text-purple-655 bg-purple-55/20 px-2 py-0.5 rounded uppercase">{inv.sector}</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-955 dark:text-white leading-tight">{inv.theme}</h3>
                  <p className="text-[11px] text-gray-550 leading-normal font-semibold">Signal: {inv.signal}</p>
                </div>
                <div className="pt-3.5 border-t border-gray-100 dark:border-gray-855 flex justify-end">
                  <Link href="/en/eoi" className="text-[10px] font-extrabold text-blue-600 hover:underline">
                    Explore Destination
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. TRADE AGREEMENTS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-805 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Trade Agreements Index</h2>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 text-gray-455 font-bold border-b border-gray-200 dark:border-gray-800">
                  <th className="p-3">CORRIDOR</th>
                  <th className="p-3">AGREEMENT CODE</th>
                  <th className="p-3">STATUS</th>
                  <th className="p-3">TYPE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-855 font-semibold text-gray-700 dark:text-slate-355">
                {[
                  { corridor: "India 🇮🇳 ↔ UAE 🇦🇪", code: "CEPA Accord", status: "Active", type: "Comprehensive Economic Partnership" },
                  { corridor: "USA 🇺🇸 ↔ India 🇮🇳", code: "iCET Tech Pact", status: "Active", type: "Critical & Emerging Tech Agreement" },
                  { corridor: "India 🇮🇳 ↔ Germany 🇩🇪", code: "Green Ammonia Pact", status: "Active", type: "Maritime Hydrogen Corridor" }
                ].map((pact, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <td className="p-3 text-gray-950 dark:text-white">{pact.corridor}</td>
                    <td className="p-3 text-blue-605">{pact.code}</td>
                    <td className="p-3 text-emerald-500">{pact.status}</td>
                    <td className="p-3 text-gray-400 font-normal">{pact.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 12. GLOBAL MARKET SIGNALS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="h-4.5 w-4.5 text-blue-650" /> Global Market Signals & Watch Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-655 dark:text-slate-350">
            <div className="space-y-1 p-3.5 bg-gray-55 dark:bg-gray-900/60 rounded-xl border border-gray-150/45 dark:border-gray-805">
              <h5 className="font-bold text-gray-900 dark:text-white uppercase text-[9px] text-blue-650">Bilateral logistics</h5>
              <p>Red Sea freight routing increases shipping premiums by 12% across Western gateways.</p>
            </div>
            <div className="space-y-1 p-3.5 bg-gray-55 dark:bg-gray-900/60 rounded-xl border border-gray-150/45 dark:border-gray-805">
              <h5 className="font-bold text-gray-900 dark:text-white uppercase text-[9px] text-blue-650">Carbon Taxation</h5>
              <p>Mandatory carbon declarations take effect for metals shipments to EU ports Q4 2026.</p>
            </div>
            <div className="space-y-1 p-3.5 bg-gray-55 dark:bg-gray-900/60 rounded-xl border border-gray-150/45 dark:border-gray-805">
              <h5 className="font-bold text-gray-900 dark:text-white uppercase text-[9px] text-blue-650">Customs Clearance</h5>
              <p>Unified customs portals drop container logistics waiting lines by 38% at GCC terminals.</p>
            </div>
          </div>
        </section>

        {/* 13. GLOBAL BUSINESS & TRADE EVENTS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-blue-650" /> Global Business & Trade Events
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Webinars & expos</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Dubai Trade & Investment Summit", location: "Dubai, UAE", date: "Oct 15, 2026", category: "Summit" },
              { title: "Semicon India Trade Fair", location: "Bengaluru, India", date: "Nov 12, 2026", category: "Trade Fair" }
            ].map((ev, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-850 rounded-2xl p-5 flex justify-between items-center hover:border-blue-600 transition-all duration-300">
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-blue-650 bg-blue-50 dark:bg-blue-955/20 px-2 py-0.5 rounded uppercase">{ev.category}</span>
                  <h3 className="text-xs font-bold text-gray-955 dark:text-white mt-1 leading-tight">{ev.title}</h3>
                  <p className="text-[9.5px] text-gray-450">{ev.date} · Location: {ev.location}</p>
                </div>
                <Link href="/en/profile/events" className="text-[9.5px] font-bold text-blue-655 hover:underline pl-4 shrink-0">
                  Request Access →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 14. AI GLOBAL INTELLIGENCE */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-855 pb-3">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="h-4.5 w-4.5 text-blue-605 fill-blue-500 animate-pulse" /> AI Global Intelligence
            </h3>
            <span className="text-[9px] font-mono font-bold bg-blue-50 dark:bg-blue-955/20 text-blue-605 px-2.5 py-0.5 rounded border border-blue-200/20">
              Model V4 Active
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="p-4 bg-blue-50/50 dark:bg-blue-955/10 border border-blue-105/50 rounded-2xl space-y-1">
                <span className="text-[9px] font-bold text-blue-650 uppercase tracking-widest">Global Trend Forecast</span>
                <p className="text-xs text-gray-700 dark:text-slate-350 italic font-semibold leading-relaxed">
                  "Sovereign trade alignments command double-digit critical tech reshoring volume growth."
                </p>
              </div>

              {/* Locked dynamic outlook panels */}
              <div className="space-y-2 text-xs relative">
                {!aiIntelligenceUnlocked ? (
                  <>
                    <div className="p-3 bg-gray-55/50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-805 flex justify-between items-center opacity-60">
                      <span>1. Custom Bilateral corridor tariff phase-out logs</span>
                      <span className="text-[8.5px] font-bold text-gray-400 flex items-center gap-0.5"><Lock className="h-3 w-3" /> Locked</span>
                    </div>
                    <div className="p-3 bg-gray-55 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-805 flex justify-between items-center opacity-60">
                      <span>2. Regional shipping lanes delay warning index</span>
                      <span className="text-[8.5px] font-bold text-gray-400 flex items-center gap-0.5"><Lock className="h-3 w-3" /> Locked</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0f172a] flex items-center justify-center pt-8">
                      <button
                        onClick={() => setIsProModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        Unlock AI Global Intelligence <Lock className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-gray-50/60 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-805 space-y-2">
                    <h5 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px]">Unlocked Forecast Insights</h5>
                    <ul className="list-disc pl-5 space-y-1.5 font-medium leading-relaxed">
                      <li>India-UAE digital portal integration reduces customs costs by 22%.</li>
                      <li>EU CBAM certification rules impose temporary transport friction for steel exporters.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:col-span-4 p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl space-y-3 border border-slate-805">
              <span className="text-[8.5px] font-bold text-amber-400 uppercase tracking-widest block">Pro Account Benefit</span>
              <h4 className="text-xs font-bold text-white">Full Global Risk Forecasts</h4>
              <p className="text-[10px] text-slate-300 leading-normal font-normal">
                Unlock daily tariff updates, phase-out schedules, transport routes delays, and local executive risk scores.
              </p>
              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-full text-center bg-white text-gray-900 hover:bg-gray-105 font-bold text-xs py-2 rounded-xl"
              >
                Upgrade Account Pro
              </button>
            </div>

          </div>
        </section>

        {/* 15. PREMIUM REPORTS LIBRARY */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="h-4.5 w-4.5 text-blue-600" /> Premium Global Reports Library
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Analytical PDF Datapacks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: "rep-gb-1", title: "2026 Global Economic & Bilateral Trade Outlook", code: "REP-GLOB-2026", price: "$299", pages: "92 pages" },
              { id: "rep-gb-2", title: "Middle East & GCC Sovereign Cloud FDI Forecast", code: "REP-FDI-GCC", price: "$199", pages: "65 pages" }
            ].map((rep) => (
              <div key={rep.id} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-650 transition-all group">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[8px] font-mono font-bold text-gray-400">
                    <span>{rep.code}</span>
                    <span>{rep.pages} · Verified PDF</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-955 dark:text-white mt-1 group-hover:text-blue-605 transition-colors leading-snug">{rep.title}</h3>
                </div>

                <div className="pt-3 mt-4 border-t border-gray-100 dark:border-gray-855 flex justify-between items-center">
                  <span className="font-display text-sm font-bold text-gray-900 dark:text-white">{rep.price}</span>
                  <Link href="/en/eoi" className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9.5px] font-bold px-3.5 py-1.5 rounded-lg transition-colors shadow-xs">
                    Buy Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 16. SPONSORED / FEATURED COUNTRIES */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1">
              <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-500" /> Promoted Business Opportunities
            </h2>
          </div>

          <div className="p-4 rounded-xl border border-amber-250/20 bg-amber-50/15 dark:bg-amber-955/5 space-y-2">
            <span className="text-[8px] font-bold text-amber-600 uppercase tracking-widest block">Sponsored Profile</span>
            <h4 className="text-xs font-bold text-gray-955 dark:text-white leading-tight">Dubai Multi Commodities DMCC Freezone Incentives</h4>
            <p className="text-[11px] text-gray-550 dark:text-slate-350 leading-relaxed font-normal">
              Establish a corporate tech presence in Dubai Silicon Oasis with 0% corporate tax offsets and direct container terminals access.
            </p>
            <div className="pt-2 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
              <Link href="/en/eoi" className="text-[9.5px] font-bold text-amber-550 hover:underline">
                View Investment Brief →
              </Link>
            </div>
          </div>
        </section>

        {/* 17. PRO / ENTERPRISE CTA */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-blue-500/5 dark:from-[#0f172a] dark:to-blue-955/10">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Global Intelligence for Your Business</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-655 dark:text-slate-350">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-850 space-y-3">
              <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">Free / Registered</h4>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Basic Country discovery</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Basic country comparison</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Trade corridor previews</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-50/10 dark:bg-blue-955/5 space-y-3 relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-blue-550 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl uppercase">Most Popular</span>
              <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">Verified Pro</h4>
              <ul className="space-y-1.5 font-semibold">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Full AI Global Intelligence</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Advanced corridor analytics</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> PDF reports sample downloads</li>
              </ul>
              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Upgrade to Pro
              </button>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-855 space-y-3">
              <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">Enterprise</h4>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Multi-country dashboards</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Custom advisory audits</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Custom consulting RFPs</li>
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

        {/* 18. FINAL GLOBAL CTA */}
        <section className="bg-slate-905 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-slate-805 shadow-lg text-center space-y-4">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          
          <div className="relative z-10 space-y-3 max-w-xl mx-auto">
            <h3 className="font-display text-base md:text-xl font-bold text-white">Explore the World. Find Your Next Market.</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-normal">
              Discover countries, compare markets and identify trade and investment opportunities.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <a
                href="#directory-section"
                className="bg-blue-650 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                Explore Countries
              </a>
              <a
                href="#comparison-section"
                className="bg-white/10 hover:bg-white/15 text-white border border-white/10 font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                Compare Countries
              </a>
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
                <Crown className="h-5 w-5 text-blue-500 animate-bounce" /> Upgrade to Global Pro
              </h4>
              <button
                onClick={() => {
                  setIsProModalOpen(false);
                  setProSuccess(false);
                }}
                className="text-gray-400 hover:text-gray-650 text-xl font-bold cursor-pointer"
              >
                &times;
              </button>
            </div>

            {proSuccess ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-955 text-blue-605 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Pro Access Active!</h5>
                <p className="text-[10px] text-gray-550 px-4 font-normal leading-normal">
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
                  Unlock advanced bilateral risk metrics, tariff phase-out schedules, and priority fdi opportunity updates.
                </p>
                <div className="p-3 bg-blue-50/20 border border-blue-200/20 rounded-xl space-y-1.5">
                  <h5 className="font-bold text-blue-650 uppercase tracking-widest text-[9px]">Included Entitlements</h5>
                  <ul className="list-disc pl-4 space-y-1 font-semibold text-[10.5px]">
                    <li>Full AI Outlook briefings unlocked</li>
                    <li>PDF report sample download guides</li>
                    <li>Tariff alert notifications</li>
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
                      setAiIntelligenceUnlocked(true);
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

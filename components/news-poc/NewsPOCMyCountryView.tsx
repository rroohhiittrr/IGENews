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
  Crown
} from "lucide-react";
import { mockData } from "@/lib/mock/factory";

// Types
interface CountryData {
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
  briefs: {
    category: string;
    time: string;
    readTime: string;
    title: string;
    summary: string;
  }[];
  economicHistory: {
    year: string;
    growth: string;
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
    title: string;
    sector: string;
    market: string;
    trend: string;
    demandChange: string;
    suppliers: string[];
  }[];
  investmentOpportunities: {
    sector: string;
    theme: string;
    signal: string;
    description: string;
  }[];
  companies: {
    name: string;
    sector: string;
    development: string;
  }[];
  leaders: {
    name: string;
    role: string;
    company: string;
    development: string;
  }[];
  events: {
    title: string;
    date: string;
    location: string;
    type: string;
  }[];
  aiOutlook: {
    summary: string;
    developments: string[];
    impacts: string[];
    riskRating: string;
  };
  premiumReports: {
    id: string;
    title: string;
    code: string;
    price: string;
    pages: string;
  }[];
}

// Local mock database mapping country profiles dynamically
const COUNTRY_PROFILES: Record<string, CountryData> = {
  "India": {
    name: "India",
    flag: "🇮🇳",
    region: "South Asia",
    capital: "New Delhi",
    featuredHeadline: "India's manufacturing sector accelerates amid rising global demand.",
    readTime: "6 min read",
    snapshot: {
      gdp: "$3.75T",
      population: "1.42B",
      gdpGrowth: "7.3%",
      currency: "INR (₹)",
      inflation: "4.8%",
      tradeBalance: "-$240B",
      fdi: "$71.4B"
    },
    indicators: [
      { label: "GDP Growth", current: "7.3%", previous: "6.9%", isUp: true, isGood: true },
      { label: "Electronics Exports", current: "$45.2B", previous: "$38.6B", isUp: true, isGood: true },
      { label: "Inflation CPI", current: "4.8%", previous: "5.4%", isUp: false, isGood: true },
      { label: "FDI Inflows", current: "$71.4B", previous: "$64.2B", isUp: true, isGood: true }
    ],
    briefs: [
      { category: "Economy", time: "2 hours ago", readTime: "5 min read", title: "India expands manufacturing incentives", summary: "Ministry of Finance rolls out secondary capital offsets for semiconductor component tooling imports." },
      { category: "Trade", time: "4 hours ago", readTime: "4 min read", title: "Phytochemical raw export rules revised", summary: "Acreage benchmarks updated to match chemical declarations with European standards." },
      { category: "Business", time: "1 day ago", readTime: "7 min read", title: "Sovereign datacenter grid launched", summary: "A consortium of domestic tech providers plans 3 core hyper-scale clusters in Mumbai corridor." }
    ],
    economicHistory: [
      { year: "2024", growth: "6.8%" },
      { year: "2025", growth: "7.1%" },
      { year: "2026", growth: "7.3%" }
    ],
    tradePulse: {
      exports: "$450B",
      imports: "$690B",
      balance: "-$240B",
      topMarkets: ["United States 🇺🇸", "UAE 🇦🇪", "Netherlands 🇳🇱"],
      topImports: ["China 🇨🇳", "UAE 🇦🇪", "United States 🇺🇸"],
      topCategories: ["Refined Petroleum", "Precious Gems", "Electronics & Machinery"]
    },
    tradeOpportunities: [
      { title: "Silicon Wafers & Semicon Tools", sector: "Electronics", market: "India", trend: "Rising Import Demand", demandChange: "↑ 14%", suppliers: ["Japan", "Taiwan", "USA"] },
      { title: "Solar Inverter Modules", sector: "Renewable Energy", market: "India", trend: "High Infrastructure Volume", demandChange: "↑ 18%", suppliers: ["Germany", "China", "Singapore"] }
    ],
    investmentOpportunities: [
      { sector: "Renewable Energy", theme: "Offshore Wind Grids", signal: "FDI Priority Corridor", description: "Government targets 5GW offshore capacity by 2030 through direct tariff phase-out incentives." },
      { sector: "Technology", theme: "Semiconductor OSAT Fabs", signal: "Accelerating Expansion", description: "Bilateral frameworks offering 50% capital expense reimbursement on construction audits." }
    ],
    companies: [
      { name: "Tata Electronics Pvt Ltd", sector: "Technology", development: "Broke ground on primary commercial packaging fab facility." },
      { name: "Reliance Green Energy Ltd", sector: "Energy", development: "Partnered on green hydrogen transport corridor to European ports." }
    ],
    leaders: [
      { name: "Natarajan Chandrasekaran", role: "Chairman", company: "Tata Sons", development: "Announced critical digital supply chain expansion maps." },
      { name: "Dr. Ananya Varma", role: "Director", company: "Biotech Labs India", development: "Accredited phytochemical raw testing frameworks." }
    ],
    events: [
      { title: "India Global Business Summit", date: "Sep 24, 2026", location: "New Delhi", type: "Conference" },
      { title: "Semicon India Trade Fair", date: "Nov 12, 2026", location: "Bengaluru", type: "Trade Fair" }
    ],
    aiOutlook: {
      summary: "AI projection identifies high-growth manufacturing clusters in western corridors, offset by ocean container capacity bottlenecks.",
      developments: ["Accelerated PLI semiconductor disbursements", "Maritime transit corridor expansions"],
      impacts: ["Reduced customs clearance lag times", "Bilateral corridor tariff concessions"],
      riskRating: "LOW RISK (18/100)"
    },
    premiumReports: [
      { id: "rep-in-1", title: "2026 India-US Critical Tech & Semiconductor Intelligence", code: "REP-BILA-IN-US", price: "$299", pages: "92 pages" },
      { id: "rep-in-2", title: "India-UAE CEPA Corridor Maritime Logistics Guide", code: "REP-BILA-IN-UAE", price: "$249", pages: "78 pages" }
    ]
  },
  "United Arab Emirates": {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    capital: "Abu Dhabi",
    featuredHeadline: "UAE non-oil trade hits record heights under aggressive CEPA routing.",
    readTime: "5 min read",
    snapshot: {
      gdp: "$507B",
      population: "9.5M",
      gdpGrowth: "3.8%",
      currency: "AED (د.إ)",
      inflation: "2.4%",
      tradeBalance: "+$85B",
      fdi: "$22.4B"
    },
    indicators: [
      { label: "Non-Oil GDP Growth", current: "5.2%", previous: "4.7%", isUp: true, isGood: true },
      { label: "Bilateral Trade Value", current: "$87.2B", previous: "$74.6B", isUp: true, isGood: true },
      { label: "Inflation Rate", current: "2.4%", previous: "3.1%", isUp: false, isGood: true },
      { label: "FDI Inflow Rate", current: "+21.4%", previous: "+18.2%", isUp: true, isGood: true }
    ],
    briefs: [
      { category: "Logistics", time: "1 hour ago", readTime: "4 min read", title: "Abu Dhabi ports roll out digital customs", summary: "API-driven clearance protocols reduce maritime container verification times to under 3 hours." },
      { category: "Policy", time: "3 hours ago", readTime: "5 min read", title: "Sovereign AI infrastructure investments", summary: "Federal capital funds allocate $2B to build private GPU clusters in Dubai Silicon Oasis." }
    ],
    economicHistory: [
      { year: "2024", growth: "3.1%" },
      { year: "2025", growth: "3.5%" },
      { year: "2026", growth: "3.8%" }
    ],
    tradePulse: {
      exports: "$360B",
      imports: "$275B",
      balance: "+$85B",
      topMarkets: ["India 🇮🇳", "Saudi Arabia 🇸🇦", "Japan 🇯🇵"],
      topImports: ["China 🇨🇳", "United States 🇺🇸", "India 🇮🇳"],
      topCategories: ["Crude Petroleum", "Precious Metals", "Broadcast Equipment"]
    },
    tradeOpportunities: [
      { title: "Aviation Maintenance Hubs", sector: "Aerospace", market: "UAE", trend: "High Port Volume Demand", demandChange: "↑ 12%", suppliers: ["USA", "Germany", "France"] },
      { title: "Sovereign Datacenter Coolants", sector: "Technology", market: "UAE", trend: "Datacenter Cluster Expansions", demandChange: "↑ 22%", suppliers: ["Singapore", "Japan", "South Korea"] }
    ],
    investmentOpportunities: [
      { sector: "Logistics", theme: "Maritime Cargo Terminals", signal: "Priority Port Investment", description: "Expansion of deepwater berths in Khalifa Port under bilateral CEPA container allocations." },
      { sector: "Technology", theme: "Edge Compute Sovereign AI", signal: "Strong Growth", description: "Direct capital matching programs for commercial B2B startup incubators in Abu Dhabi." }
    ],
    companies: [
      { name: "DP World Group", sector: "Logistics", development: "Acquired secondary terminal corridors in western India ports." },
      { name: "G42 AI Holdings", sector: "Technology", development: "Released custom Arabic large language models matching sovereign standards." }
    ],
    leaders: [
      { name: "Sultan Ahmed bin Sulayem", role: "Group Chairman", company: "DP World", development: "Announced bilateral shipping lane expansions." },
      { name: "H.E. Dr. Thani Al Zeyoudi", role: "Minister of State", company: "Foreign Trade Ministry", development: "Signed dual corridor digital trade framework agreements." }
    ],
    events: [
      { title: "Dubai Trade & Investment Summit", date: "Oct 15, 2026", location: "Dubai WTC", type: "Summit" },
      { title: "Middle East Logistics Fair", date: "Dec 05, 2026", location: "Abu Dhabi", type: "Trade Fair" }
    ],
    aiOutlook: {
      summary: "AI model projects strong non-oil commerce corridors driven by CEPA Single Window digital setups.",
      developments: ["Bilateral port customs API consolidation", "Venture capital digital matchings"],
      impacts: ["Transit timeline reduction of 38% under CEPA", "Reduced tariff friction across non-oil commodities"],
      riskRating: "LOW RISK (15/100)"
    },
    premiumReports: [
      { id: "rep-uae-1", title: "UAE-India CEPA Accord: Trade Opportunities & Tariff Phase-Outs", code: "REP-BILA-UAE-IN", price: "$249", pages: "78 pages" },
      { id: "rep-uae-2", title: "Middle East Datacenter & Sovereign Cloud Growth Outlook", code: "REP-INTEL-ME-AI", price: "$199", pages: "65 pages" }
    ]
  }
};

export default function NewsPOCMyCountryView() {
  const [selectedCountry, setSelectedCountry] = useState<string>("India");
  const [aiPreviewLocked, setAiPreviewLocked] = useState(true);
  const [alertPreferences, setAlertPreferences] = useState({
    economy: true,
    trade: true,
    policy: false,
    investment: true
  });
  const [reportPurchasedId, setReportPurchasedId] = useState<string | null>(null);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [proSuccess, setProSuccess] = useState(false);

  const currentCountry = COUNTRY_PROFILES[selectedCountry] || COUNTRY_PROFILES["India"];

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16">
      
      {/* 01. COUNTRY HERO */}
      <section className="bg-gradient-to-br from-[#0c1020] via-[#0d132b] to-[#05070e] text-white relative overflow-hidden border-b border-gray-805">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="space-y-4">
            
            {/* Country Selector (33) */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-[10px] font-mono font-bold bg-blue-650 px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs">
                MY COUNTRY
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-bold">Change Country:</span>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="text-xs font-bold bg-white/10 text-white border border-white/10 hover:border-blue-500 rounded-lg px-3 py-1.5 cursor-pointer outline-none"
                >
                  <option value="India" className="text-gray-950">India 🇮🇳</option>
                  <option value="United Arab Emirates" className="text-gray-950">United Arab Emirates 🇦🇪</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-4xl md:text-5xl">{currentCountry.flag}</span>
                <div>
                  <h1 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    {currentCountry.name}
                  </h1>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    Region: {currentCountry.region} · Capital: {currentCountry.capital} · Updated 15 minutes ago
                  </p>
                </div>
              </div>
            </div>

            <p className="text-slate-350 text-sm md:text-base font-normal max-w-3xl leading-relaxed">
              Your personalized view of {currentCountry.name}'s economy, trade, business opportunities and latest developments.
            </p>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="text-xs font-bold text-slate-300">Featured Briefing ({currentCountry.readTime}):</span>
                <p className="text-xs text-white font-medium leading-none">{currentCountry.featuredHeadline}</p>
              </div>
              <Link
                href="/en/news-poc/country-news/intelligence"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10.5px] px-4 py-2 rounded-xl transition-all cursor-pointer shadow-xs shrink-0 flex items-center gap-1"
              >
                Explore Country Intelligence <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* MAIN CONTENT WRAPPER */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-10">

        {/* 02. COUNTRY SNAPSHOT */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="h-4.5 w-4.5 text-blue-600" /> Country Snapshot
            </h2>
            <Link href="/en/news-poc/country-news/intelligence" className="text-[10px] font-extrabold text-blue-600 hover:underline">
              View Full Country Data →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-4 text-center">
            {[
              { label: "Nominal GDP", val: currentCountry.snapshot.gdp },
              { label: "Population", val: currentCountry.snapshot.population },
              { label: "GDP Growth", val: currentCountry.snapshot.gdpGrowth },
              { label: "Currency", val: currentCountry.snapshot.currency },
              { label: "Inflation CPI", val: currentCountry.snapshot.inflation },
              { label: "Trade Balance", val: currentCountry.snapshot.tradeBalance },
              { label: "FDI Inflow", val: currentCountry.snapshot.fdi }
            ].map((snap, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-xl p-3.5 shadow-3xs">
                <span className="block text-[8.5px] font-bold text-gray-400 uppercase tracking-wider">{snap.label}</span>
                <span className="block font-display text-xs md:text-sm font-extrabold text-gray-900 dark:text-white mt-1 leading-none">
                  {snap.val}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 03. KEY COUNTRY INDICATORS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Key Country Indicators</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {currentCountry.indicators.map((ind, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-4 flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase block">{ind.label}</span>
                  <span className="font-display text-xl font-bold text-gray-900 dark:text-white block leading-none">{ind.current}</span>
                  <span className="text-[9px] text-gray-450 block">Prev: {ind.previous}</span>
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

        {/* 04. TODAY'S COUNTRY BRIEF */}
        <section className="space-y-4">
          <div className="border-b border-gray-205 dark:border-gray-850 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-4.5 w-4.5 text-blue-600" /> Today's Country Brief
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentCountry.briefs.map((brf, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-3xs flex flex-col justify-between hover:border-blue-650 transition-all duration-300 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[8px] font-bold text-gray-400">
                    <span className="text-blue-600 uppercase tracking-widest">{brf.category}</span>
                    <span>{brf.time} · {brf.readTime}</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-950 dark:text-white mt-1 group-hover:text-blue-650 transition-colors leading-snug">{brf.title}</h3>
                  <p className="text-[11px] text-gray-600 dark:text-gray-350 leading-relaxed font-normal">{brf.summary}</p>
                </div>
                <div className="pt-3 mt-4 border-t border-gray-100 dark:border-gray-850 flex justify-end">
                  <Link href="/en/headlines" className="text-[9.5px] font-extrabold text-blue-600 hover:underline">
                    Read Story
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 05. ECONOMIC PULSE */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-4.5 w-4.5 text-blue-650" /> Economic Pulse Projections
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-3">
              <p className="text-xs text-gray-550 dark:text-slate-350 leading-relaxed font-normal">
                Projections powered by federal treasury reviews indicate a stable economic expansion pattern for {currentCountry.name} through FY2026.
              </p>
              
              <div className="grid grid-cols-3 gap-4 border-t border-gray-100 dark:border-gray-850 pt-3">
                {currentCountry.economicHistory.map((hist, hIdx) => (
                  <div key={hIdx} className="p-3 bg-gray-55 dark:bg-gray-900/60 rounded-xl border border-gray-150/40 dark:border-gray-805 text-center">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{hist.year}</span>
                    <div className="font-display text-sm font-bold text-blue-650 mt-1">{hist.growth}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-4 p-4 rounded-xl border border-blue-200/40 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-955/15 space-y-3 text-center">
              <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest leading-none">Intelligence Summary</h4>
              <p className="text-[11px] text-gray-655 dark:text-slate-300 italic font-medium leading-relaxed">
                "Nominal GDP forecasts are backed by infrastructural PLI layouts and secondary tariff exemptions."
              </p>
              <Link href="/en/news-poc/country-news/intelligence" className="block text-[10px] font-bold text-blue-600 hover:underline">
                Explore Economic Intelligence →
              </Link>
            </div>
          </div>
        </section>

        {/* 06. TRADE PULSE */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-6">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="h-4.5 w-4.5 text-blue-605" /> Trade Pulse Summary
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="space-y-4">
              <h3 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-850 pb-2">Macro Indicators</h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl border border-gray-105/50 dark:border-gray-805">
                  <span className="text-gray-400 font-bold">Total Exports</span>
                  <span className="text-emerald-500 font-bold">{currentCountry.tradePulse.exports}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl border border-gray-105/50 dark:border-gray-805">
                  <span className="text-gray-400 font-bold">Total Imports</span>
                  <span className="text-red-500 font-bold">{currentCountry.tradePulse.imports}</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 dark:bg-gray-900 p-2.5 rounded-xl border border-gray-105/50 dark:border-gray-805">
                  <span className="text-gray-400 font-bold">Trade Balance</span>
                  <span className="text-gray-950 dark:text-white font-bold">{currentCountry.tradePulse.balance}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-850 pb-2">Bilateral Partners</h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[9px] text-gray-405 font-bold uppercase block mb-1">Top Export Destinations</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCountry.tradePulse.topMarkets.map((m, idx) => (
                      <span key={idx} className="bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2.5 py-1 text-[9.5px] font-bold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-[9px] text-gray-405 font-bold uppercase block mb-1">Top Import Originators</span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentCountry.tradePulse.topImports.map((m, idx) => (
                      <span key={idx} className="bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2.5 py-1 text-[9.5px] font-bold">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-850 pb-2">Key Categories</h3>
              <div className="space-y-2.5">
                <span className="text-[9px] text-gray-405 font-bold uppercase block">Core Tracked Commodities</span>
                <ul className="list-disc pl-4 text-xs font-semibold text-gray-700 dark:text-slate-300 space-y-1">
                  {currentCountry.tradePulse.topCategories.map((cat, idx) => (
                    <li key={idx}>{cat}</li>
                  ))}
                </ul>
                <Link
                  href="/en/news-poc/country-news/intelligence"
                  className="block text-center w-full bg-blue-600/10 border border-blue-200/50 hover:bg-blue-600/20 text-blue-605 font-bold text-xs py-2 rounded-xl"
                >
                  Explore Trade Intelligence
                </Link>
              </div>
            </div>

          </div>
        </section>

        {/* 07. TRADE OPPORTUNITIES */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Briefcase className="h-4.5 w-4.5 text-blue-600" /> Trade Opportunities
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Active demand signals</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCountry.tradeOpportunities.map((opp, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-blue-650 transition-all duration-300">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-955/20 px-2.5 py-0.5 rounded border border-blue-200/20">
                      {opp.sector}
                    </span>
                    <span className="text-xs font-bold text-emerald-500">{opp.demandChange} YoY</span>
                  </div>
                  <h3 className="text-xs font-extrabold text-gray-950 dark:text-white leading-tight">{opp.title}</h3>
                  <p className="text-[11px] text-gray-500">Target Market: {opp.market} · Trend: {opp.trend}</p>
                </div>

                <div className="pt-3 border-t border-gray-100 dark:border-gray-850 flex justify-between items-center">
                  <div className="text-[10px] text-gray-400 font-semibold">
                    Potential Suppliers: {opp.suppliers.join(", ")}
                  </div>
                  <Link href="/eoi" className="text-[10px] font-extrabold text-blue-600 hover:underline">
                    Explore Opportunity →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 08. INVESTMENT OPPORTUNITIES */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="h-4.5 w-4.5 text-blue-600" /> Investment Opportunities
            </h2>
            <span className="text-[9px] font-bold bg-blue-50 dark:bg-blue-955/20 text-blue-650 px-2 py-0.5 rounded">
              Bilateral FDI Corridors
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCountry.investmentOpportunities.map((inv, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-955/20 px-2.5 py-0.5 rounded border border-purple-200/20">
                    {inv.sector}
                  </span>
                  <span className="text-[9px] font-bold text-amber-500 uppercase tracking-widest">{inv.signal}</span>
                </div>
                <h3 className="text-xs font-extrabold text-gray-950 dark:text-white leading-tight">{inv.theme}</h3>
                <p className="text-[11px] text-gray-600 dark:text-slate-350 leading-relaxed font-normal">{inv.description}</p>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex justify-end">
                  <Link href="/eoi" className="text-[10px] font-bold text-blue-605 hover:underline">
                    Explore Investment Opportunity →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 09. MARKET & BUSINESS WATCH */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-4.5 w-4.5 text-blue-650" /> Market & Business Watch
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-semibold">
            <div className="p-3.5 bg-gray-55 dark:bg-gray-900/60 rounded-xl border border-gray-150/40 dark:border-gray-805 space-y-1">
              <span className="text-[9px] text-gray-400 font-bold uppercase block">Technology</span>
              <p className="text-gray-950 dark:text-white">Active software corridors (+14% YoY)</p>
            </div>
            <div className="p-3.5 bg-gray-55 dark:bg-gray-900/60 rounded-xl border border-gray-150/40 dark:border-gray-805 space-y-1">
              <span className="text-[9px] text-gray-400 font-bold uppercase block">Manufacturing</span>
              <p className="text-gray-950 dark:text-white">Gujarat plant expansion commitments</p>
            </div>
            <div className="p-3.5 bg-gray-55 dark:bg-gray-900/60 rounded-xl border border-gray-150/40 dark:border-gray-805 space-y-1">
              <span className="text-[9px] text-gray-400 font-bold uppercase block">Logistics</span>
              <p className="text-gray-950 dark:text-white">DP World terminal consolidations</p>
            </div>
            <div className="p-3.5 bg-gray-55 dark:bg-gray-900/60 rounded-xl border border-gray-150/40 dark:border-gray-805 space-y-1">
              <span className="text-[9px] text-gray-400 font-bold uppercase block">Biotech</span>
              <p className="text-gray-950 dark:text-white">Botanical testing standards active</p>
            </div>
          </div>
        </section>

        {/* 10 & 11. COMPANIES & LEADERS IN FOCUS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Companies in Focus (10) */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 space-y-4">
            <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
              <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Building className="h-4.5 w-4.5 text-blue-600" /> Companies in Focus
              </h3>
            </div>

            <div className="space-y-3">
              {currentCountry.companies.map((comp, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-850 flex justify-between items-center hover:border-blue-500 transition-all bg-gray-50/50 dark:bg-gray-900/10">
                  <div>
                    <span className="text-[8px] font-bold text-blue-650 bg-blue-50 dark:bg-blue-955/20 px-2 py-0.5 rounded uppercase">
                      {comp.sector}
                    </span>
                    <h4 className="text-[11px] font-bold text-gray-900 dark:text-white mt-1 leading-tight">{comp.name}</h4>
                    <p className="text-[10px] text-gray-500 dark:text-slate-350 leading-relaxed font-normal mt-0.5">{comp.development}</p>
                  </div>
                  <Link href="/en/company-news/registered/pages" className="text-[9.5px] font-bold text-blue-655 hover:underline shrink-0 ml-4">
                    View Company →
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Leaders in Focus (11) */}
          <div className="lg:col-span-6 bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 space-y-4">
            <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
              <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Users className="h-4.5 w-4.5 text-blue-600" /> Leaders in Focus
              </h3>
            </div>

            <div className="space-y-3">
              {currentCountry.leaders.map((ldr, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-850 flex justify-between items-center hover:border-blue-500 transition-all bg-gray-50/50 dark:bg-gray-900/10">
                  <div>
                    <span className="text-[8px] font-bold text-purple-600 bg-purple-50 dark:bg-purple-955/20 px-2 py-0.5 rounded uppercase">
                      {ldr.role}
                    </span>
                    <h4 className="text-[11px] font-bold text-gray-900 dark:text-white mt-1 leading-tight">{ldr.name} ({ldr.company})</h4>
                    <p className="text-[10px] text-gray-500 dark:text-slate-355 leading-relaxed font-normal mt-0.5">{ldr.development}</p>
                  </div>
                  <Link href="/en/leader" className="text-[9.5px] font-bold text-blue-655 hover:underline shrink-0 ml-4">
                    View Leader →
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* 12. UPCOMING COUNTRY EVENTS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="h-4.5 w-4.5 text-blue-600" /> Upcoming Country Events
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Roundtables & Expositions</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCountry.events.map((ev, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 flex justify-between items-center hover:border-blue-650 transition-all duration-300">
                <div className="space-y-1">
                  <span className="text-[8px] font-bold text-blue-650 bg-blue-50 dark:bg-blue-955/20 px-2 py-0.5 rounded uppercase">
                    {ev.type}
                  </span>
                  <h3 className="text-xs font-bold text-gray-950 dark:text-white mt-1 leading-tight">{ev.title}</h3>
                  <p className="text-[10px] text-gray-450">{ev.date} · Location: {ev.location}</p>
                </div>
                <Link href="/en/profile/events" className="text-[9.5px] font-bold text-blue-655 hover:underline pl-4 shrink-0 cursor-pointer">
                  Request Access →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 13. AI COUNTRY INTELLIGENCE */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-855 pb-3">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="h-4.5 w-4.5 text-blue-600 fill-blue-500 animate-pulse" /> AI Country Intelligence
            </h3>
            <span className="text-[9px] font-bold bg-blue-50 dark:bg-blue-955/20 text-blue-650 px-2 py-0.5 rounded border border-blue-200/20">
              Risk: {currentCountry.aiOutlook.riskRating}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="p-4 bg-blue-50/50 dark:bg-blue-955/10 border border-blue-105/50 rounded-2xl space-y-1">
                <span className="text-[9px] font-bold text-blue-650 uppercase tracking-widest">AI Trend Outlook</span>
                <p className="text-xs text-gray-700 dark:text-slate-300 italic font-semibold leading-relaxed">
                  "{currentCountry.aiOutlook.summary}"
                </p>
              </div>

              {/* Free users locked preview parameters */}
              <div className="space-y-2 text-xs relative">
                
                {aiPreviewLocked ? (
                  <>
                    <div className="p-3 bg-gray-50/50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-805 flex justify-between items-center opacity-60">
                      <span>1. {currentCountry.aiOutlook.developments[0]}</span>
                      <span className="text-[8.5px] font-bold text-gray-400 flex items-center gap-0.5"><Lock className="h-3 w-3" /> Locked</span>
                    </div>
                    <div className="p-3 bg-gray-50/50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-805 flex justify-between items-center opacity-60">
                      <span>2. {currentCountry.aiOutlook.impacts[0]}</span>
                      <span className="text-[8.5px] font-bold text-gray-400 flex items-center gap-0.5"><Lock className="h-3 w-3" /> Locked</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0f172a] flex items-center justify-center pt-8">
                      <button
                        onClick={() => setIsProModalOpen(true)}
                        className="bg-blue-650 hover:bg-blue-750 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        Unlock AI Country Intelligence <Lock className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <h5 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px]">Key Pro Insights</h5>
                    <ul className="list-disc pl-5 space-y-1 font-semibold text-[11px] text-gray-655 dark:text-slate-350">
                      <li><strong>Developments:</strong> {currentCountry.aiOutlook.developments.join(" · ")}</li>
                      <li><strong>Business Impacts:</strong> {currentCountry.aiOutlook.impacts.join(" · ")}</li>
                    </ul>
                  </div>
                )}

              </div>
            </div>

            <div className="lg:col-span-4 p-5 bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-2xl space-y-3 border border-slate-805">
              <span className="text-[8px] font-bold text-amber-400 uppercase tracking-widest block">Pro Account Benefit</span>
              <h4 className="text-xs font-bold text-white">Full Bilateral Risk Assessments</h4>
              <p className="text-[10px] text-slate-300 leading-normal font-normal">
                Unlock daily tariff updates, phase-out schedules, transport routes delays, and local executive risk scores.
              </p>
              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-full text-center bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs py-2 rounded-xl"
              >
                Upgrade Account Pro
              </button>
            </div>

          </div>
        </section>

        {/* 14. COUNTRY RISK & OPPORTUNITY OUTLOOK */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="h-4.5 w-4.5 text-amber-550" /> Country Risk & Opportunity Outlook
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-semibold">
            <div className="p-4 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-250/20 rounded-xl space-y-2">
              <h4 className="font-bold text-emerald-600 uppercase tracking-wide text-[10px] flex items-center gap-1">
                ✓ Primary Opportunities
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-gray-655 dark:text-slate-350 leading-relaxed">
                <li>Strong digital customs automation in shipping hubs.</li>
                <li>Expansion of bilateral trade corridor concessions.</li>
                <li>Strategic venture alignments with European energy firms.</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50/30 dark:bg-amber-955/10 border border-amber-250/20 rounded-xl space-y-2">
              <h4 className="font-bold text-amber-550 uppercase tracking-wide text-[10px] flex items-center gap-1">
                ⚠ Key Watch Areas & Risks
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-[11px] text-gray-655 dark:text-slate-350 leading-relaxed">
                <li>Maritime transit capacity congestion in major shipping lanes.</li>
                <li>Local carbon taxation declarations adjustments.</li>
                <li>Currency fluctuation margins in export payouts.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 15. MY COUNTRY ALERTS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="h-4.5 w-4.5 text-blue-650" /> My Country Alerts Preference
            </h2>
            <span className="text-[9px] text-gray-400 font-semibold">Receive custom briefings</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-semibold">
            {[
              { id: "economy", label: "Economy Metrics Updates" },
              { id: "trade", label: "Trade Lead Alerts" },
              { id: "policy", label: "Policy & Tariff Alerts" },
              { id: "investment", label: "FDI Capital Alerts" }
            ].map((pref) => (
              <label
                key={pref.id}
                className="p-3 rounded-xl border border-gray-205 dark:border-gray-805 bg-gray-50/50 dark:bg-gray-900/10 flex items-center justify-between cursor-pointer hover:border-blue-500"
              >
                <span>{pref.label}</span>
                <input
                  type="checkbox"
                  checked={(alertPreferences as any)[pref.id]}
                  onChange={(e) => setAlertPreferences({
                    ...alertPreferences,
                    [pref.id]: e.target.checked
                  })}
                  className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 cursor-pointer"
                />
              </label>
            ))}
          </div>
        </section>

        {/* 16. MY SECTORS IN THIS COUNTRY */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <SlidersHorizontal className="h-4.5 w-4.5 text-blue-650" /> Your Tracked Sectors in {currentCountry.name}
            </h2>
            <Link href="/en/profile/settings" className="text-[10px] font-extrabold text-blue-605 hover:underline">
              Manage Interests →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-850 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Manufacturing Sector</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">3 new active policy updates</p>
              </div>
              <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-955/20 px-2 py-0.5 rounded">Active</span>
            </div>
            <div className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-850 flex justify-between items-center">
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Technology Hub</h4>
                <p className="text-[10px] text-gray-400 mt-0.5">5 new active trade opportunities</p>
              </div>
              <span className="text-[9.5px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-955/20 px-2 py-0.5 rounded">Active</span>
            </div>
          </div>
        </section>

        {/* 17. PREMIUM COUNTRY REPORTS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="h-4.5 w-4.5 text-blue-600" /> Premium Country Reports Catalog
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Analytical PDF Datapacks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCountry.premiumReports.map((rep) => (
              <div key={rep.id} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-650 transition-all group">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[8px] font-mono font-bold text-gray-400">
                    <span>{rep.code}</span>
                    <span>{rep.pages} · Verified PDF</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-950 dark:text-white mt-1 group-hover:text-blue-650 transition-colors leading-snug">{rep.title}</h3>
                </div>

                <div className="pt-3 mt-4 border-t border-gray-100 dark:border-gray-850 flex justify-between items-center">
                  <span className="font-display text-sm font-bold text-gray-900 dark:text-white">{rep.price}</span>
                  {reportPurchasedId === rep.id ? (
                    <span className="text-[9.5px] font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" /> Purchased (Sample PDF Downloaded)
                    </span>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setReportPurchasedId(rep.id);
                        }}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[9.5px] font-bold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
                      >
                        Buy Report
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 18. SPONSORED COUNTRY CONTENT */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1">
              <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-500" /> Promoted Business Opportunities
            </h2>
          </div>

          <div className="p-4 rounded-xl border border-amber-250/20 bg-amber-50/15 dark:bg-amber-955/5 space-y-2">
            <span className="text-[8px] font-bold text-amber-600 uppercase tracking-widest block">Sponsored Portfolio</span>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">Gujarat Industrial Park Logistics Corridor Allocations</h4>
            <p className="text-[11px] text-gray-550 dark:text-slate-350 leading-relaxed font-normal">
              Commercial logistics zones offering tax concessions and pre-built tooling hubs are now open for FDI subscription briefs.
            </p>
            <div className="pt-2 border-t border-gray-200/50 dark:border-gray-850 flex justify-end">
              <Link href="/eoi" className="text-[9.5px] font-bold text-amber-550 hover:underline">
                View Investment Brief →
              </Link>
            </div>
          </div>
        </section>

        {/* 19. PRO / ENTERPRISE UPGRADE */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-blue-500/5 dark:from-[#0f172a] dark:to-blue-950/10">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Go Deeper With Country Intelligence</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-655 dark:text-slate-350">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-850 space-y-3">
              <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">Free / Registered</h4>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Basic Country Snapshot</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Public News Feed</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Basic indicators overview</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border-2 border-blue-500 bg-blue-50/10 dark:bg-blue-955/5 space-y-3 relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-blue-550 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl uppercase">Most Popular</span>
              <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">Verified Pro</h4>
              <ul className="space-y-1.5 font-semibold">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Full AI Country Outlook</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Advanced trade index details</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Country opportunity alerts</li>
              </ul>
              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Upgrade to Pro
              </button>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-850 space-y-3">
              <h4 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider">Enterprise</h4>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Multi-country dashboards</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Team workspaces</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Custom consulting RFPs</li>
              </ul>
              <Link
                href="/eoi"
                className="block text-center w-full bg-slate-900 hover:bg-slate-950 text-white font-bold text-xs py-2 rounded-xl transition-all"
              >
                Explore Enterprise
              </Link>
            </div>
          </div>
        </section>

        {/* 20. FINAL COUNTRY CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden border border-slate-800 shadow-lg text-center space-y-4">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
          
          <div className="relative z-10 space-y-3 max-w-xl mx-auto">
            <h3 className="font-display text-base md:text-xl font-bold text-white">Stay Ahead of Your Country</h3>
            <p className="text-slate-300 text-xs leading-relaxed font-normal">
              Get the latest economic, trade, investment and business developments from {selectedCountry} delivered in verified briefs.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link
                href="/en/news-poc/country-news/intelligence"
                className="bg-blue-650 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
              >
                Explore Country Intelligence
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* --- PRO UPGRADE MODAL --- */}
      {isProModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Crown className="h-5 w-5 text-blue-500 animate-bounce" /> Upgrade to Country Pro
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
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-955 text-blue-600 dark:text-blue-405 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Pro Access Active!</h5>
                <p className="text-[10px] text-gray-500 px-4 font-normal leading-normal">
                  Thank you! Your pro trial has been successfully registered. You can now access locked AI previews.
                </p>
                <button
                  onClick={() => {
                    setIsProModalOpen(false);
                    setProSuccess(false);
                  }}
                  className="bg-gray-100 dark:bg-gray-855 text-gray-655 dark:text-slate-355 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
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
                    className="bg-gray-100 dark:bg-gray-855 text-gray-605 dark:text-slate-355 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setProSuccess(true);
                      setAiPreviewLocked(false);
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

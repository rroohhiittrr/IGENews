"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  ArrowRight,
  Star
} from "lucide-react";

// Mock Database of Country Indicators
interface CountryIntelProfile {
  name: string;
  flag: string;
  region: string;
  gdp: string;
  growth: string;
  inflation: string;
  interestRate: string;
  fdi: string;
  unemployment: string;
  currency: string;
  exports: string;
  imports: string;
  tradeBalance: string;
  partners: string[];
  growingProducts: string[];
  fdiThemes: string[];
  watchAreas: string[];
  outlook: string;
}

const COUNTRY_INTEL_DB: Record<string, CountryIntelProfile> = {
  India: {
    name: "India",
    flag: "🇮🇳",
    region: "South Asia",
    gdp: "$3.75T",
    growth: "+7.3% YoY",
    inflation: "4.8%",
    interestRate: "6.50%",
    fdi: "$71.4B",
    unemployment: "6.8%",
    currency: "INR (₹)",
    exports: "$450B",
    imports: "$690B",
    tradeBalance: "-$240B",
    partners: ["United States", "UAE", "Germany", "Japan"],
    growingProducts: ["Electronics & Semiconductors", "Pharmaceuticals", "Automotive Parts"],
    fdiThemes: ["OSAT Substrate Assembly", "Solar Power Corridors", "Urban Rapid Transit"],
    watchAreas: ["Raw material logistics tariffs", "Power grid transmission bottlenecks"],
    outlook: "Accelerating manufacturing capacity and domestic credit expansion."
  },
  "United States": {
    name: "United States",
    flag: "🇺🇸",
    region: "North America",
    gdp: "$27.9T",
    growth: "+2.5% YoY",
    inflation: "3.2%",
    interestRate: "5.25%",
    fdi: "$285B",
    unemployment: "3.9%",
    currency: "USD ($)",
    exports: "$2.05T",
    imports: "$3.12T",
    tradeBalance: "-$1.07T",
    partners: ["Canada", "Mexico", "China", "Japan", "India"],
    growingProducts: ["Defense Technologies", "Commercial Aerospace Equipment", "Liquefied Natural Gas"],
    fdiThemes: ["Domestic Semiconductor Fabs", "HVDC Power Grid Resilience", "AI Data Centers"],
    watchAreas: ["Bilateral tariff adjustments", "Corporate interest expense leverage"],
    outlook: "High defense manufacturing volumes alongside structural capital reshoring."
  },
  UAE: {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    region: "Middle East",
    gdp: "$507B",
    growth: "+3.8% YoY",
    inflation: "2.4%",
    interestRate: "5.15%",
    fdi: "$22.4B",
    unemployment: "2.5%",
    currency: "AED (د.إ)",
    exports: "$360B",
    imports: "$275B",
    tradeBalance: "+$85B",
    partners: ["India", "Saudi Arabia", "China", "Japan"],
    growingProducts: ["Refined Petrochemicals", "Maritime Cargo Freighters", "Gold & Jewelry"],
    fdiThemes: ["Logistics Berth Expansion", "Sovereign Cloud Data Zones", "Hydrogen Hubs"],
    watchAreas: ["Digital customs API settlement wait times", "OPEC production adjustments"],
    outlook: "Non-oil corporate growth remains robust matching CEPA port investments."
  }
};

export default function NewsPOCCountryIntelligenceView() {
  const [selectedCountry, setSelectedCountry] = useState<string>("India");
  const [aiIntelligenceUnlocked, setAiIntelligenceUnlocked] = useState<boolean>(false);
  const [isProModalOpen, setIsProModalOpen] = useState<boolean>(false);
  const [proSuccess, setProSuccess] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  const currentIntel = COUNTRY_INTEL_DB[selectedCountry];

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-150 min-h-screen pb-16">
      
      {/* 01. INTELLIGENCE HERO */}
      <section className="bg-gradient-to-br from-[#0b0f19] via-[#0e1633] to-[#04060b] text-white relative overflow-hidden border-b border-gray-805">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 lg:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] font-mono font-bold bg-purple-650 px-3 py-1 rounded-lg uppercase tracking-wider text-white shadow-xs">
              COUNTRY INTELLIGENCE
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Global Country Intelligence, Built for Business Decisions
            </h1>
            <p className="text-slate-350 text-xs md:text-sm font-normal max-w-2xl leading-relaxed">
              Explore economic trends, trade dynamics, investment opportunities, sector developments, policy changes and country outlooks across global markets.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#explorer-section"
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shadow-md flex items-center gap-1.5"
              >
                Explore Intelligence <ArrowRight className="h-4.5 w-4.5" />
              </a>
              <Link
                href="/en/news-poc/country-news/all"
                className="bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center gap-1.5"
              >
                <Scale className="h-4 w-4 text-purple-400" /> Compare Countries
              </Link>
              <a
                href="#reports-section"
                className="bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer"
              >
                View Premium Reports
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6 space-y-10">

        {/* 02. COUNTRY INTELLIGENCE EXPLORER */}
        <section id="explorer-section" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-sm font-bold text-gray-950 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                Explore Country Intelligence
              </h2>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">
                Select a country to explore macro indicators, trade corridors, and investment policies.
              </p>
            </div>
            
            {/* Country Selector */}
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="text-xs font-bold border border-gray-255 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2.5 rounded-xl outline-none cursor-pointer pr-10 appearance-none min-w-[200px]"
              >
                {Object.keys(COUNTRY_INTEL_DB).map((cName) => (
                  <option key={cName} value={cName}>
                    {COUNTRY_INTEL_DB[cName].flag} {cName}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Intelligence Coverage Flags */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3 border-t border-gray-100 dark:border-gray-850">
            {[
              { label: "Economic Intelligence", active: true },
              { label: "Trade Intelligence", active: true },
              { label: "Investment Intelligence", active: true },
              { label: "Sector Intelligence", active: true },
              { label: "Policy Intelligence", active: true }
            ].map((cov, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900/60 rounded-lg text-[10px] font-bold border border-gray-150/40 dark:border-gray-800">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                <span className="text-gray-600 dark:text-gray-300">{cov.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 03. GLOBAL INTELLIGENCE PULSE */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-950 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-4.5 w-4.5 text-purple-650" /> Global Intelligence Pulse
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Active market indicators</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { category: "TRADE MOMENTUM", route: "Asia → Middle East", status: "Increasing logistics activity under CEPA accord", trend: "↑ High Activity", color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
              { category: "INVESTMENT ACTIVITY", route: "Renewable Energy Corridor", status: "Solar & green hydrogen investments rise 18%", trend: "Growing", color: "text-purple-600 bg-purple-50 dark:bg-purple-955/20" },
              { category: "EMERGING SECTOR", route: "Industrial Semiconductor OSAT", status: "Raw material Material fab fabrication JV signed", trend: "Rapid Expansion", color: "text-blue-600 bg-blue-50 dark:bg-blue-955/20" }
            ].map((pulse, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 shadow-3xs flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[8.5px] font-bold">
                    <span className="text-gray-450 uppercase tracking-widest">{pulse.category}</span>
                    <span className={`px-2 py-0.5 rounded uppercase tracking-wider ${pulse.color}`}>{pulse.trend}</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-950 dark:text-white leading-tight">{pulse.route}</h3>
                  <p className="text-[11px] text-gray-500 leading-normal">{pulse.status}</p>
                </div>
                <div className="pt-3.5 border-t border-gray-100 dark:border-gray-850 flex justify-end">
                  <Link href="/en/eoi" className="text-[9.5px] font-bold text-purple-605 hover:underline">
                    Analyze Signal →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 04. COUNTRY INTELLIGENCE BRIEF */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Country Intelligence Brief</h2>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-3">
              <h3 className="text-xs font-bold text-gray-950 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span>{currentIntel.flag}</span>
                <span>{currentIntel.name} Strategic Briefing</span>
              </h3>
              <span className="text-[9.5px] text-gray-400 font-semibold font-mono">FY2026 Quarter 2 Updates</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs leading-relaxed">
              
              <div className="space-y-1.5 p-3.5 bg-gray-55 dark:bg-gray-900 rounded-xl border border-gray-150/40 dark:border-gray-800">
                <h5 className="font-bold text-gray-950 dark:text-white uppercase text-[9px] text-purple-650">WHAT HAPPENED?</h5>
                <p className="text-gray-500 dark:text-slate-350">
                  Expansion of capital subsidies for {currentIntel.growingProducts[0] || "specialty components"} manufacturing has gone live.
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 bg-gray-55 dark:bg-gray-900 rounded-xl border border-gray-150/40 dark:border-gray-800">
                <h5 className="font-bold text-gray-955 dark:text-white uppercase text-[9px] text-purple-650">WHY IT MATTERS?</h5>
                <p className="text-gray-500 dark:text-slate-350">
                  Simplifies cross-border asset transfers and provides direct corporate tax offsets up to 50% for manufacturing lines.
                </p>
              </div>

              <div className="space-y-1.5 p-3.5 bg-gray-55 dark:bg-gray-900 rounded-xl border border-gray-150/40 dark:border-gray-800">
                <h5 className="font-bold text-gray-955 dark:text-white uppercase text-[9px] text-purple-650">AFFECTED SECTORS</h5>
                <ul className="list-disc pl-4 text-gray-500 dark:text-slate-350 space-y-0.5 font-semibold">
                  {currentIntel.growingProducts.map((p, idx) => (
                    <li key={idx}>{p}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5 p-3.5 bg-gray-55 dark:bg-gray-900 rounded-xl border border-gray-150/40 dark:border-gray-800">
                <h5 className="font-bold text-gray-955 dark:text-white uppercase text-[9px] text-purple-650">WHAT TO WATCH</h5>
                <p className="text-gray-500 dark:text-slate-350 font-normal italic">
                  "{currentIntel.watchAreas[0]}"
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 05. ECONOMIC INTELLIGENCE */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign className="h-4.5 w-4.5 text-purple-600" /> Economic Intelligence
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold font-mono">Source: Central Bank Databanks</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Nominal GDP", val: currentIntel.gdp, sub: "Global ranking index node" },
              { label: "Real GDP Growth", val: currentIntel.growth, sub: "Quarter-on-quarter projection" },
              { label: "CPI Inflation", val: currentIntel.inflation, sub: "Consumer price index metric" },
              { label: "Interest Rate", val: currentIntel.interestRate, sub: "Benchmark monetary rate" },
              { label: "FDI Inflow Influx", val: currentIntel.fdi, sub: "Annual corporate capital flows" },
              { label: "Unemployment", val: currentIntel.unemployment, sub: "Structural labor indicator" },
              { label: "Currency unit", val: currentIntel.currency, sub: "Official trade settlement unit" },
              { label: "Exports Value", val: currentIntel.exports, sub: "Total outbound trade volume" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-4 space-y-1 hover:border-purple-500 transition-colors">
                <span className="text-[8.5px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</span>
                <div className="font-display text-lg font-bold text-purple-650">{stat.val}</div>
                <span className="text-[9px] text-gray-500 block leading-tight">{stat.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 06. ECONOMIC OUTLOOK */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Economic Outlook</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-655 dark:text-slate-350">
            <div className="space-y-1 p-3.5 bg-gray-55 dark:bg-gray-900 rounded-xl border border-gray-150/45 dark:border-gray-800">
              <h5 className="font-bold text-gray-950 dark:text-white uppercase text-[9px] text-purple-650">CURRENT ENVIRONMENT</h5>
              <p className="font-semibold text-gray-700 dark:text-slate-300">
                Indicators confirm stable expansion velocity matching positive output gaps.
              </p>
            </div>
            <div className="space-y-1 p-3.5 bg-gray-55 dark:bg-gray-900 rounded-xl border border-gray-150/45 dark:border-gray-800">
              <h5 className="font-bold text-gray-955 dark:text-white uppercase text-[9px] text-purple-650">KEY DRIVERS</h5>
              <ul className="list-disc pl-4 space-y-0.5 font-medium text-gray-750 dark:text-slate-300">
                {currentIntel.fdiThemes.map((theme, idx) => (
                  <li key={idx}>{theme}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-1 p-3.5 bg-gray-55 dark:bg-gray-900 rounded-xl border border-gray-150/45 dark:border-gray-800">
              <h5 className="font-bold text-gray-955 dark:text-white uppercase text-[9px] text-purple-650">WATCH AREAS</h5>
              <ul className="list-disc pl-4 space-y-0.5 text-red-500 font-bold">
                {currentIntel.watchAreas.map((w, idx) => (
                  <li key={idx}>{w}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 07. TRADE INTELLIGENCE */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="h-4.5 w-4.5 text-purple-650" /> Trade Intelligence
            </h2>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="space-y-3">
              <h4 className="font-bold text-gray-955 dark:text-white uppercase text-[10px]">Trade Indicators</h4>
              <div className="space-y-2">
                <div className="flex justify-between font-mono font-semibold">
                  <span className="text-gray-400">Total Exports:</span>
                  <span className="text-blue-600">{currentIntel.exports}</span>
                </div>
                <div className="flex justify-between font-mono font-semibold">
                  <span className="text-gray-400">Total Imports:</span>
                  <span className="text-red-500">{currentIntel.imports}</span>
                </div>
                <div className="flex justify-between font-mono font-semibold">
                  <span className="text-gray-400">Trade Balance:</span>
                  <span className="text-gray-800 dark:text-white">{currentIntel.tradeBalance}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-955 dark:text-white uppercase text-[10px]">Primary Partners</h4>
              <div className="flex flex-wrap gap-2">
                {currentIntel.partners.map((partner, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-150/40 dark:border-gray-800 font-bold text-gray-655 dark:text-gray-300">
                    {partner}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-gray-955 dark:text-white uppercase text-[10px]">Growing Export Sectors</h4>
              <ul className="list-disc pl-4 text-gray-500 dark:text-slate-350 space-y-1 font-semibold">
                {currentIntel.growingProducts.map((prod, idx) => (
                  <li key={idx}>{prod}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 08. INVESTMENT INTELLIGENCE */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-805 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Investment Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentIntel.fdiThemes.map((theme, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[8px] font-bold text-purple-650 bg-purple-55/20 px-2.5 py-0.5 rounded uppercase">FDI THEME</span>
                  <h3 className="text-xs font-bold text-gray-955 dark:text-white mt-1 leading-tight">{theme}</h3>
                  <p className="text-[11px] text-gray-500 font-semibold leading-normal">
                    Capital allocation priorities and custom regulatory frameworks support development corridors.
                  </p>
                </div>
                <div className="pt-3.5 border-t border-gray-100 dark:border-gray-850 flex justify-end">
                  <Link href="/en/eoi" className="text-[9.5px] font-bold text-purple-600 hover:underline">
                    Explore Theme
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 09. SECTOR INTELLIGENCE */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-805 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Sector Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {currentIntel.growingProducts.map((sector, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-2">
                <span className="text-[8px] font-bold text-blue-650 bg-blue-50 dark:bg-blue-955/20 px-2 py-0.5 rounded uppercase">SECTOR PROFILE</span>
                <h3 className="text-xs font-bold text-gray-955 dark:text-white leading-tight">{sector}</h3>
                <p className="text-[10.5px] text-gray-500 font-semibold leading-relaxed">
                  Accelerated supply chains activity and raw material assembly JVs driving growth.
                </p>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-855 flex justify-end">
                  <Link href="/en/news-poc/feed/sector" className="text-[9px] font-extrabold text-blue-650 hover:underline">
                    View Sector Hub →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 10. POLICY & REGULATORY WATCH */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-805 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-4.5 w-4.5 text-purple-650" /> Policy & Regulatory Watch
            </h2>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900 text-gray-455 font-bold border-b border-gray-200 dark:border-gray-800">
                  <th className="p-3">POLICY REGULATION</th>
                  <th className="p-3">AFFECTED REGION</th>
                  <th className="p-3">EFFECTIVE</th>
                  <th className="p-3">ESTIMATED IMPACT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850 font-semibold text-gray-700 dark:text-slate-355">
                {[
                  { title: "Bilateral custom waivers guidelines", origin: currentIntel.name, date: "Q4 2026", impact: "High" },
                  { title: "HVDC grid resourcing tariff phase-outs", origin: currentIntel.name, date: "Immediate", impact: "Medium" }
                ].map((policy, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <td className="p-3 text-gray-955 dark:text-white font-bold">{policy.title}</td>
                    <td className="p-3 text-purple-605">{policy.origin}</td>
                    <td className="p-3 text-gray-450 font-normal">{policy.date}</td>
                    <td className="p-3 text-emerald-500 font-bold">{policy.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 11. COUNTRY RISK & WATCH AREAS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-950 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="h-4.5 w-4.5 text-red-500" /> Country Risk & Watch Areas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-655 dark:text-slate-350">
            <div className="space-y-1.5 p-3.5 bg-gray-55 dark:bg-gray-900 rounded-xl border border-gray-150/45 dark:border-gray-805">
              <h5 className="font-bold text-gray-900 dark:text-white uppercase text-[9px] text-red-500">Economic inflation</h5>
              <p className="font-semibold text-gray-700 dark:text-gray-300">Monetary CPI metrics watch path (Current: {currentIntel.inflation}).</p>
            </div>
            <div className="space-y-1.5 p-3.5 bg-gray-55 dark:bg-gray-900 rounded-xl border border-gray-150/45 dark:border-gray-805">
              <h5 className="font-bold text-gray-900 dark:text-white uppercase text-[9px] text-red-500">Bilateral restrictions</h5>
              <p className="font-semibold text-gray-700 dark:text-gray-300">Custom declarations rules watch areas: "{currentIntel.watchAreas[0]}"</p>
            </div>
            <div className="space-y-1.5 p-3.5 bg-gray-55 dark:bg-gray-900 rounded-xl border border-gray-150/45 dark:border-gray-805">
              <h5 className="font-bold text-gray-900 dark:text-white uppercase text-[9px] text-red-500">Trade lane delay bottlenecks</h5>
              <p className="font-semibold text-gray-700 dark:text-gray-300">Shipping route bottlenecks matching sustained Red Sea routing Cape rerouting.</p>
            </div>
          </div>
        </section>

        {/* 12. OPPORTUNITY INTELLIGENCE */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-805 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Opportunity Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: "Trade Opportunity", title: currentIntel.growingProducts[0] || "Specialty Chemicals", signal: "Demand expands 18% YoY" },
              { type: "Investment Corridor", title: currentIntel.fdiThemes[0] || "OSAT Assembly", signal: "Subsidies cleared locally" }
            ].map((opp, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[8.5px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded uppercase">{opp.type}</span>
                  <h3 className="text-xs font-bold text-gray-955 dark:text-white mt-1 leading-tight">{opp.title}</h3>
                  <p className="text-[11px] text-gray-500 font-semibold leading-normal">
                    Signal: {opp.signal}. Direct B2B supplier corridor integrations available.
                  </p>
                </div>
                <div className="pt-3 border-t border-gray-100 dark:border-gray-855 flex justify-end">
                  <Link href="/en/eoi" className="text-[9.5px] font-bold text-purple-600 hover:underline">
                    Explore Opportunity →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 13. TRENDING INTELLIGENCE */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-850 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Trending Intelligence Topics</h2>
            <span className="text-[10px] text-gray-400 font-semibold">B2B interest trends</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { label: "Bilateral Tariff Accord", growth: "▲ +45%" },
              { label: "HVDC Power Grids", growth: "▲ +28%" },
              { label: "Customs Declarations Waiver", growth: "▲ +18%" }
            ].map((trend, idx) => (
              <span key={idx} className="px-3.5 py-2 rounded-xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 text-xs font-semibold text-gray-800 dark:text-gray-250 flex items-center gap-2">
                <span>{trend.label}</span>
                <span className="text-emerald-500 font-bold text-[10px]">{trend.growth}</span>
              </span>
            ))}
          </div>
        </section>

        {/* 14. COUNTRY OUTLOOK */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-805 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Country 6-12 Month Outlook</h2>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 p-6 rounded-2xl space-y-3 leading-relaxed text-xs">
            <h4 className="font-bold text-gray-955 dark:text-white uppercase text-[10px]">Macro Outlook Projection</h4>
            <p className="text-gray-500 dark:text-slate-350 font-normal">
              "{currentIntel.outlook}"
            </p>
            <div className="pt-3 border-t border-gray-100 dark:border-gray-855 flex justify-end">
              <button
                onClick={() => setIsProModalOpen(true)}
                className="text-purple-650 hover:underline font-bold text-[10px] flex items-center gap-1 cursor-pointer"
              >
                Unlock Comprehensive Outlook Datapack <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* 15. AI COUNTRY INTELLIGENCE */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-855 pb-3">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-purple-600" /> AI Country Intelligence Insights
            </h3>
            <span className="text-[9px] font-mono font-bold bg-purple-50 dark:bg-purple-955/20 text-purple-605 px-2.5 py-0.5 rounded border border-purple-200/20">
              Model V4 Active
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="p-4 bg-purple-50/50 dark:bg-purple-955/10 border border-purple-105/50 rounded-2xl space-y-1">
                <span className="text-[9px] font-bold text-purple-650 uppercase tracking-widest">AI Summary</span>
                <p className="text-xs text-gray-700 dark:text-slate-350 italic font-semibold leading-relaxed">
                  "Stable GDP metrics output velocity offsets local currency adjustments risks."
                </p>
              </div>

              {/* Locked dynamic outlook panels */}
              <div className="space-y-2 text-xs relative">
                {!aiIntelligenceUnlocked ? (
                  <>
                    <div className="p-3 bg-gray-50/50 dark:bg-gray-900/40 rounded-xl border border-gray-200 dark:border-gray-805 flex justify-between items-center opacity-60">
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
                        className="bg-purple-600 hover:bg-purple-755 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        Unlock AI Outlook Briefs <Lock className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="p-4 bg-gray-50/60 dark:bg-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-805 space-y-2">
                    <h5 className="font-bold text-gray-900 dark:text-white uppercase tracking-wider text-[10px]">Unlocked Forecast Insights</h5>
                    <ul className="list-disc pl-5 space-y-1.5 font-medium leading-relaxed">
                      <li>Bilateral digital portal customs integration reduces logistics delays by 22%.</li>
                      <li>EU CBAM certification deadlines impose compliance frictions for steel exporters.</li>
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
                className="w-full text-center bg-white text-gray-900 hover:bg-gray-100 font-bold text-xs py-2 rounded-xl"
              >
                Upgrade Account Pro
              </button>
            </div>

          </div>
        </section>

        {/* 16. PREMIUM REPORTS LIBRARY */}
        <section id="reports-section" className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="h-4.5 w-4.5 text-purple-600" /> Premium Country Reports Store
            </h2>
            <span className="text-[10px] text-gray-400 font-semibold">Analytical PDF Datapacks</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { id: "rep-intel-1", title: "India Comprehensive B2B Trade & Economic Outlook", code: "REP-IND-2026", price: "$299" },
              { id: "rep-intel-2", title: "UAE Non-Oil Trade Expansion & CEPA Corridor Analysis", code: "REP-UAE-CEPA", price: "$199" }
            ].map((rep) => (
              <div key={rep.id} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 flex flex-col justify-between hover:border-purple-600 transition-all group">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[8px] font-mono font-bold text-gray-400">
                    <span>{rep.code}</span>
                    <span>Verified PDF Report</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-955 dark:text-white mt-1 group-hover:text-purple-650 transition-colors leading-snug">{rep.title}</h3>
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

        {/* 17. EXPERT / ANALYST INSIGHTS */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Expert & Analyst Insights</h2>
            <span className="text-[10px] text-gray-400 font-semibold">Ministerial & Executive Statements</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Priya Sundaram", role: "Trade Economist", org: "IGEN Economic Advisory", text: "Global corridor growth rates highlight persistent demand shifts towards South Asian hubs." },
              { name: "Kenji Sato", role: "Specialty Materials Lead", org: "Tokyo Materials Council", text: "OSAT materials joint initiatives mitigate raw substrate assembly supply bottlenecks." }
            ].map((insight, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-750 font-bold text-xs flex items-center justify-center">
                    {insight.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-gray-955 dark:text-white block text-xs">{insight.name}</span>
                    <span className="text-[9px] text-gray-400 block">{insight.role} · {insight.org}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-350 font-normal leading-relaxed italic">
                  "{insight.text}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 18. RECOMMENDED INTELLIGENCE */}
        <section className="space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-805 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-955 dark:text-white uppercase tracking-wider">Recommended Intelligence</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "Bilateral digital customs corridors manual", desc: "Operational guide for logistics executives." },
              { title: "Cape of Good Hope maritime routing index", desc: "Weekly cost premiums adjustments database." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl flex justify-between items-center hover:border-purple-500 transition-colors">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-xs text-gray-955 dark:text-white">{item.title}</h4>
                  <p className="text-[10px] text-gray-400 leading-normal">{item.desc}</p>
                </div>
                <Link href="/en/eoi" className="text-[9px] font-bold text-purple-650 hover:underline shrink-0 pl-4">
                  View →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* 19. COUNTRY INTELLIGENCE NEWSLETTER */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl space-y-1">
            <h3 className="font-display text-sm font-bold text-gray-950 dark:text-white uppercase tracking-wider">Country Intelligence Briefing</h3>
            <p className="text-xs text-gray-500 leading-normal">
              Get the most important economic, trade, investment and policy developments delivered to your inbox.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="text-xs font-bold text-emerald-500 flex items-center gap-1.5">
              <CheckCircle className="h-4.5 w-4.5" /> Subscribed successfully!
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail.trim()) setNewsletterSubscribed(true);
              }}
              className="flex gap-2 w-full md:max-w-md"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full text-xs bg-gray-55 dark:bg-gray-900 border border-gray-205 dark:border-gray-800 rounded-xl px-3 py-2 outline-none focus:border-purple-600"
                required
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-755 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </section>

        {/* 20. SPONSORED INTELLIGENCE */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h2 className="font-display text-xs font-bold text-gray-955 dark:text-white uppercase tracking-wider flex items-center gap-1">
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

        {/* 21. PRO / ENTERPRISE UPGRADE */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-5 md:p-6 shadow-2xs space-y-4 bg-gradient-to-br from-white via-white to-purple-500/5 dark:from-[#0f172a] dark:to-purple-955/10">
          <div className="border-b border-gray-150 dark:border-gray-855 pb-3">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Unlock Deeper Country Intelligence</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs leading-relaxed text-gray-655 dark:text-slate-350">
            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-850 space-y-3">
              <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">Free / Registered</h4>
              <ul className="space-y-1.5 font-semibold text-gray-550 dark:text-gray-300">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Intelligence Brief</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Basic Economic Indicators</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Sector Previews</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border-2 border-purple-500 bg-purple-50/10 dark:bg-purple-955/5 space-y-3 relative overflow-hidden">
              <span className="absolute top-0 right-0 bg-purple-550 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl uppercase">Most Popular</span>
              <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">Verified Pro</h4>
              <ul className="space-y-1.5 font-semibold text-gray-550 dark:text-gray-300">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> AI Country Intelligence</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Advanced Economic Outlook</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Premium Reports Library</li>
              </ul>
              <button
                onClick={() => setIsProModalOpen(true)}
                className="w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Upgrade to Pro
              </button>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 dark:border-gray-855 space-y-3">
              <h4 className="font-bold text-gray-955 dark:text-white text-xs uppercase tracking-wider">Enterprise</h4>
              <ul className="space-y-1.5 font-semibold text-gray-550 dark:text-gray-300">
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Multi-Country dashboards</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Team Access & API integration</li>
                <li className="flex items-center gap-1.5"><Check className="h-4 w-4 text-emerald-500" /> Custom Consulting RFPs</li>
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
                <Crown className="h-5 w-5 text-purple-500 animate-bounce" /> Upgrade to Global Pro
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
                <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-955 text-purple-605 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
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
                  Unlock advanced country risk metrics, policy watches, and priority FDI opportunity updates.
                </p>
                <div className="p-3 bg-purple-50/20 border border-purple-200/20 rounded-xl space-y-1.5">
                  <h5 className="font-bold text-purple-650 uppercase tracking-widest text-[9px]">Included Entitlements</h5>
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
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer"
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

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Globe, Search, CheckCircle, Crown, Star, TrendingUp,
  ChevronRight, ArrowUpRight, Bookmark, Share2, Eye, Award,
  Sparkles, Lock, Mic, BarChart2, Users, Zap, Trophy,
  MessageSquare, Bell, Filter, Play, ChevronLeft, Target,
  MapPin, Briefcase, Shield, Activity, Calendar, Download, ThumbsUp,
  Building, ArrowDownRight, Layers, FileText, ArrowRight, Mail,
  Coins, Scale, Compass, Flag
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const FEATURED_CORRIDOR_STORY = {
  id: "cou-hero-1",
  corridor: "India–UAE Bilateral Trade Corridor",
  flags: "🇮🇳 🇦🇪",
  headline: "India–UAE Non-Oil Trade Surges 18.4% Crossing $87 Billion Under CEPA Accord",
  summary: "Comprehensive Economic Partnership Agreement (CEPA) accelerates maritime shipping throughput between Mundra Port and Jebel Ali, cutting customs clearance latency by 48 hours.",
  image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1000&auto=format&fit=crop&q=80",
  date: "Updated 2 hrs ago",
  readTime: "6 min read",
  metrics: [
    { label: "Corridor Value (YTD)", value: "$87.2 Billion", color: "text-white" },
    { label: "YoY Growth", value: "+18.4%", color: "text-emerald-400" },
    { label: "Opportunity Score", value: "92 / 100", color: "text-amber-400" }
  ]
};

const PERFORMANCE_METRICS = [
  { label: "Total Bilateral Trade Output", val: "$32.4 Trillion", change: "+14.8% YoY", icon: Globe, color: "text-blue-500" },
  { label: "Global FDI Capital Flows", val: "$1.4 Trillion", change: "+9.2% YoY", icon: TrendingUp, color: "text-emerald-500" },
  { label: "Active Trade Accords", val: "120+ Accords", change: "+12 New Accords", icon: Scale, color: "text-purple-500" },
  { label: "Countries Covered", val: "195 Countries", change: "100% Global Scope", icon: Compass, color: "text-amber-500" }
];

const REGIONS_GRID = [
  { name: "Asia-Pacific", code: "APAC", count: "48 Countries", growth: "+16.4%", icon: "🌏", lead: "India, Japan, Singapore, S. Korea" },
  { name: "Europe & EU", code: "EUR", count: "44 Countries", growth: "+11.2%", icon: "🇪🇺", lead: "Germany, France, UK, Netherlands" },
  { name: "Middle East & N. Africa", code: "MENA", count: "21 Countries", growth: "+21.8%", icon: "🕌", lead: "UAE, Saudi Arabia, Qatar, Oman" },
  { name: "North America", code: "NAM", count: "3 Countries", growth: "+14.1%", icon: "🗽", lead: "USA, Canada, Mexico" },
  { name: "Latin America", code: "LATAM", count: "33 Countries", growth: "+12.5%", icon: "🌴", lead: "Brazil, Argentina, Chile, Colombia" },
  { name: "Africa & AU", code: "AFR", count: "54 Countries", growth: "+18.7%", icon: "🌍", lead: "South Africa, Kenya, Nigeria, Egypt" }
];

const COUNTRY_SPOTLIGHT = {
  name: "United Arab Emirates (UAE)",
  flag: "🇦🇪",
  capital: "Abu Dhabi",
  gdp: "$507 Billion",
  growth: "+3.8%",
  tradeWithIndia: "$87.2 Billion",
  inflation: "2.1%",
  fdiInflows: "$22.7 Billion",
  keyExports: "Refined Petroleum, Gold, Petrochemicals, Metals",
  highlight: "CEPA trade corridor agreement targets $100 Billion non-oil bilateral commerce by 2030."
};

const LATEST_COUNTRY_NEWS = [
  { id: "cn-1", title: "India-USA Critical Tech Trade Accord Secures Direct Defense Semiconductor Sourcing", country: "India-USA", flag: "🇮🇳 🇺🇸", author: "Global Policy Desk", date: "30m ago", views: "3.8K", readTime: "5 min", premium: false },
  { id: "cn-2", title: "India-Germany €2 Billion Clean Hydrogen Shipping Corridor Accord Finalized", country: "India-Germany", flag: "🇮🇳 🇩🇪", author: "Clean Energy Desk", date: "1h ago", views: "2.4K", readTime: "4 min", premium: true },
  { id: "cn-3", title: "India-Japan Bilateral Industrial Township Expansion Commences in Rajasthan", country: "India-Japan", flag: "🇮🇳 🇯🇵", author: "FDI Bureau", date: "2h ago", views: "1.9K", readTime: "6 min", premium: false },
  { id: "cn-4", title: "India-Singapore PayNow-UPI Digital Payment Volume Crosses 15 Million Transactions", country: "India-Singapore", flag: "🇮🇳 🇸🇬", author: "FinTech Bureau", date: "4h ago", views: "3.1K", readTime: "4 min", premium: false },
  { id: "cn-5", title: "India-UK Free Trade Agreement Negotiations Enter Final Regulatory Review Stage", country: "India-UK", flag: "🇮🇳 🇬🇧", author: "Bilateral Trade Desk", date: "5h ago", views: "2.8K", readTime: "5 min", premium: true }
];

const BILATERAL_CORRIDORS_TABLE = [
  { corridor: "India – USA", flags: "🇮🇳 🇺🇸", value: "$191.8 Billion", growth: "+18.2%", keyProducts: "Semiconductors, Defense AI, Pharma", agreement: "Critical & Emerging Tech (iCET)" },
  { corridor: "India – UAE", flags: "🇮🇳 🇦🇪", value: "$87.2 Billion", growth: "+18.4%", keyProducts: "Petrochemicals, Gold, Logistics", agreement: "CEPA Accord (Active)" },
  { corridor: "India – China", flags: "🇮🇳 🇨🇳", value: "$136.2 Billion", growth: "+3.1%", keyProducts: "Electronics, Active Pharma Ingredients", agreement: "Standard MFN Trade" },
  { corridor: "India – Germany", flags: "🇮🇳 🇩🇪", value: "$30.8 Billion", growth: "+14.5%", keyProducts: "Clean Hydrogen, Automotive, Precision Tech", agreement: "India-EU Broad-Based FTA (Pending)" },
  { corridor: "India – Singapore", flags: "🇮🇳 🇸🇬", value: "$35.6 Billion", growth: "+16.8%", keyProducts: "FinTech Rails, Maritime Logistics, OSAT", agreement: "CECA Agreement (Active)" }
];

const FDI_PROJECTS = [
  { title: "Gujarat Maritime Logistics Park & Container Terminal", location: "Mundra, India", value: "$2.4 Billion", investor: "DP World (UAE)", sector: "Ports & Shipping" },
  { title: "Indo-German Clean Hydrogen Electrolyser Hub", location: "Kochi, India", value: "$1.8 Billion", investor: "Siemens Energy (Germany)", sector: "Renewable Energy" },
  { title: "Silicon Substrate OSAT Packaging Plant", location: "Hosur, India", value: "$1.2 Billion", investor: "Foxconn (Taiwan)", sector: "Semiconductors" }
];

const PREMIUM_REPORTS = [
  { title: "2026 India-US Bilateral Trade & Defense Tech Intelligence", code: "REP-BILA-US", price: "$299", pages: "92 pages", rating: "4.9 ★" },
  { title: "India-UAE CEPA Trade Corridor & Customs Playbook", code: "REP-BILA-UAE", price: "$249", pages: "78 pages", rating: "4.9 ★" },
  { title: "India-EU Bilateral Tariff Schedules & Regulatory Analysis", code: "REP-BILA-EU", price: "$199", pages: "65 pages", rating: "4.8 ★" }
];

const TOP_GLOBAL_COMPANIES = [
  { name: "DP World", country: "UAE 🇦🇪", sector: "Port Logistics", tier: "Enterprise", logo: "DP", color: "from-blue-600 to-indigo-700" },
  { name: "Siemens Energy", country: "Germany 🇩🇪", sector: "Clean Energy", tier: "Enterprise", logo: "SE", color: "from-emerald-600 to-teal-700" },
  { name: "Apple Inc.", country: "USA 🇺🇸", sector: "Electronics Mfg", tier: "Enterprise", logo: "AP", color: "from-gray-700 to-slate-900" },
  { name: "Foxconn Technology", country: "Taiwan 🇹🇼", sector: "Semiconductors", tier: "Verified Pro", logo: "FX", color: "from-purple-600 to-indigo-700" }
];

const TOP_COUNTRY_LEADERS = [
  { name: "Sultan Ahmed bin Sulayem", role: "Group Chairman & CEO, DP World", country: "UAE 🇦🇪", score: 98.4, initial: "SS", color: "from-blue-600 to-indigo-700" },
  { name: "Tim Cook", role: "CEO, Apple", country: "USA 🇺🇸", score: 99.1, initial: "TC", color: "from-slate-800 to-gray-900" },
  { name: "Christian Bruch", role: "CEO, Siemens Energy", country: "Germany 🇩🇪", score: 95.8, initial: "CB", color: "from-emerald-600 to-teal-700" },
  { name: "Jensen Huang", role: "CEO, NVIDIA", country: "USA 🇺🇸", score: 98.9, initial: "JH", color: "from-emerald-500 to-green-700" }
];

const NEWS_TABS = ["Latest", "Trending", "Economy", "Trade", "Investment", "Technology"];

export default function NewsPOCCountryNewsHome() {
  const [activeNewsTab, setActiveNewsTab] = useState("Latest");
  const [followedCountries, setFollowedCountries] = useState<string[]>([]);
  const [selectedBulletin, setSelectedBulletin] = useState<{ text: string; cat: string; details: string } | null>(null);
  const [calcOrigin, setCalcOrigin] = useState("India");
  const [calcDest, setCalcDest] = useState("UAE");
  const [calcValue, setCalcValue] = useState("100000");
  const [calcCategory, setCalcCategory] = useState("Gold");
  const [calcResult, setCalcResult] = useState<{ rate: string; duty: string; savings: string; accord: string } | null>(null);

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO BANNER — 195-Country Bilateral Intelligence Hub
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#0b192e] via-[#102747] to-[#071324] text-white overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-600/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-10 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
            <div className="flex-1 space-y-6 max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Global Country Intelligence (IGN-M05)</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Country News & Trade Intelligence
              </h1>
              
              <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed max-w-lg">
                Discover bilateral trade flows, macroeconomic scorecards, FDI investment opportunities, and AI risk forecasts across 195 countries.
              </p>

              {/* Search bar with country & region dropdowns */}
              <div className="flex gap-2 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search 195 countries, trade accords, FDI..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <select className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-3 text-xs outline-none">
                  <option className="bg-gray-955 text-white">All Regions</option>
                  <option className="bg-gray-955 text-white">Asia-Pacific (APAC)</option>
                  <option className="bg-gray-955 text-white">Europe (EU)</option>
                  <option className="bg-gray-955 text-white">Middle East (MENA)</option>
                  <option className="bg-gray-955 text-white">North America (NAM)</option>
                </select>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm shrink-0">
                  Search
                </button>
              </div>
            </div>

            {/* Live Bilateral Alert Bulletin Ticker */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 w-full lg:w-[400px] backdrop-blur-md shadow-xl shrink-0 space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Bilateral Bulletins</span>
                </div>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">G2B & Corridor Alerts</span>
              </div>
              <div className="space-y-3.5">
                {[
                  { text: "India-GCC trade talks enter final bilateral tariff settlement round", time: "2 min ago", cat: "Trade Accords" },
                  { text: "MoU signed for Chennai-Vladivostok maritime corridor expansion", time: "15 min ago", cat: "Logistics" },
                  { text: "Union Cabinet approves 3 new bilateral aerospace tax treaties", time: "1 hr ago", cat: "Policy" }
                ].map((b, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedBulletin({
                      text: b.text,
                      cat: b.cat,
                      details: `Detailed analysis of this ${b.cat} bulletin item: "${b.text}". The trade ministries are negotiating tariff phase-outs and logistics integration parameters. Under the bilateral frameworks, exporters can expect up to a 12% reduction in import customs duty.`
                    })}
                    className="space-y-1 group/item cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-[8px]">
                      <span className="text-blue-400 font-bold uppercase">{b.cat}</span>
                      <span className="text-slate-400">{b.time}</span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-200 group-hover/item:text-blue-300 transition-colors leading-relaxed line-clamp-2">
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Submenu Quick Navigation Strip */}
        <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-xs">
          <div className="mx-auto max-w-7xl px-4 lg:px-6 py-3 flex flex-wrap gap-2 items-center justify-between">
            <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Submenus:</span>
            <div className="flex gap-2 flex-wrap text-xs">
              {[
                { label: "My Country Dashboard", href: "/en/news-poc/country-news/my", badge: "Personalized" },
                { label: "All Countries (195 Bilateral)", href: "/en/news-poc/country-news/all", badge: "Global Directory" }
              ].map((sub, idx) => (
                <Link key={idx} href={sub.href} className="bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all">
                  <span>{sub.label}</span>
                  <ChevronRight className="h-3 w-3 opacity-60" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. FEATURED & LATEST COUNTRY NEWS GRID (2-Column)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-12 gap-8">
          {/* Featured Corridor Briefing (Left 8 cols) */}
          <div className="col-span-12 lg:col-span-8">
            <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white min-h-[380px] h-full flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:scale-102 transition-transform duration-300"
                style={{ backgroundImage: `url(${FEATURED_CORRIDOR_STORY.image})` }}
              />
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="relative z-10 space-y-4 max-w-4xl">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                    BILATERAL SPOTLIGHT CORRIDOR
                  </span>
                  <span className="text-[10px] text-slate-300 font-semibold">
                    {FEATURED_CORRIDOR_STORY.flags} {FEATURED_CORRIDOR_STORY.corridor} · {FEATURED_CORRIDOR_STORY.date}
                  </span>
                </div>

                <h2 className="font-display text-xl md:text-3xl font-bold leading-tight text-white group-hover:text-blue-300 transition-colors">
                  {FEATURED_CORRIDOR_STORY.headline}
                </h2>
                
                <p className="text-slate-300 text-xs md:text-sm font-normal max-w-3xl leading-relaxed">
                  {FEATURED_CORRIDOR_STORY.summary}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-6 border-t border-white/10 pt-4 text-xs font-semibold text-slate-300">
                  {FEATURED_CORRIDOR_STORY.metrics.map((m, idx) => (
                    <div key={idx}>
                      <span className="block text-[8px] text-gray-400 uppercase">{m.label}</span>
                      <span className={`text-xs font-bold ${m.color}`}>{m.value}</span>
                    </div>
                  ))}
                  <div className="ml-auto flex items-center gap-1.5 flex-wrap">
                    <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 text-[9px]">
                      READ BRIEFING <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Latest News Feed List (Right 4 cols) */}
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs h-full flex flex-col justify-between">
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-2">
                  <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Latest News Feed</h3>
                  <div className="flex items-center gap-0.5 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-250 dark:border-gray-850">
                    {["Latest", "Trade", "FDI"].slice(0, 3).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveNewsTab(tab)}
                        className={`px-2 py-0.5 rounded text-[8.5px] font-bold transition-all ${activeNewsTab === tab ? "bg-white dark:bg-gray-800 text-blue-600 shadow-xs" : "text-gray-500 hover:text-gray-700"}`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3.5">
                  {LATEST_COUNTRY_NEWS.slice(0, 3).map((item) => (
                    <div key={item.id} className="space-y-1 group cursor-pointer border-b border-gray-50 dark:border-gray-900/50 pb-2.5 last:border-0 last:pb-0">
                      <div className="flex items-center gap-1.5 flex-wrap text-[8px]">
                        <span className="font-bold text-blue-500">{item.flag} {item.country}</span>
                        <span className="text-gray-400">{item.date}</span>
                        {item.premium && <Lock className="h-2.5 w-2.5 text-amber-500" />}
                      </div>
                      <h4 className="text-[11px] font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-500 transition-colors line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
              
              <Link href="/eoi" className="block text-center border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-slate-300 font-bold text-[10px] py-2 rounded-lg transition-colors mt-4">
                View All Country News →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. MAIN CONTENT GRID (Corridors, FDI, Economic Indicators, Regions, and Right Sidebar)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-12 gap-8">
          
          {/* ── LEFT MAIN COLUMN ── */}
          <div className="col-span-12 lg:col-span-8 space-y-10">

            {/* A. Top Bilateral Trade Corridors */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Top Bilateral Trade Corridors</h2>
                <Link href="/en/news-poc/country-news/all" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View All 195 Bilateral Corridors</Link>
              </div>

              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900 text-gray-400 font-bold border-b border-gray-200 dark:border-gray-800">
                      <th className="p-3.5">CORRIDOR</th>
                      <th className="p-3.5">TRADE VALUE</th>
                      <th className="p-3.5">GROWTH</th>
                      <th className="p-3.5">KEY EXPORTS</th>
                      <th className="p-3.5">ACCORD STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                    {BILATERAL_CORRIDORS_TABLE.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                        <td className="p-3.5 font-bold text-gray-900 dark:text-white">{row.flags} {row.corridor}</td>
                        <td className="p-3.5 font-bold text-blue-600">{row.value}</td>
                        <td className="p-3.5 font-bold text-emerald-500">{row.growth}</td>
                        <td className="p-3.5 text-gray-500 text-[10px]">{row.keyProducts}</td>
                        <td className="p-3.5"><span className="bg-blue-50 dark:bg-blue-950/30 text-blue-600 font-bold text-[8px] px-2 py-0.5 rounded">{row.agreement}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* B. High-Yield FDI & Infrastructure Projects */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">High-Yield FDI & Infrastructure Projects</h2>
                <Link href="/eoi" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View All Projects</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {FDI_PROJECTS.map((proj, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <Link href="/en/news-poc/sector-news" className="inline-block hover:opacity-85">
                        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
                          {proj.sector}
                        </span>
                      </Link>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{proj.title}</h4>
                      <p className="text-[10px] text-gray-500">Location: {proj.location}</p>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-emerald-600">{proj.value}</span>
                      <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold px-2.5 py-1 rounded-lg">
                        Explore
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* C. Global Economic Performance Scoreboard */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Global Economic Performance Scoreboard</h2>
                <span className="text-[9px] font-bold text-gray-400">Macro Indicators</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {PERFORMANCE_METRICS.map((pm, idx) => {
                  const PMIcon = pm.icon;
                  return (
                    <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-2">
                      <PMIcon className={`h-5 w-5 ${pm.color}`} />
                      <span className="text-[8px] font-bold text-gray-400 uppercase block">{pm.label}</span>
                      <div className="font-display text-lg font-bold text-gray-900 dark:text-white leading-tight">{pm.val}</div>
                      <span className="text-[8px] font-bold text-emerald-500 block">{pm.change}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Tariff & Customs Calculator */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-6 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-855 pb-3">
                <div className="flex items-center gap-2">
                  <Coins className="h-4.5 w-4.5 text-blue-500" />
                  <h2 className="font-display text-xs font-bold text-gray-955 dark:text-white uppercase tracking-wider">
                    CEPA Tariff &amp; Customs Calculator
                  </h2>
                </div>
                <span className="bg-blue-100 dark:bg-blue-955 text-blue-600 dark:text-blue-400 text-[8px] font-bold px-2 py-0.5 rounded uppercase">
                  Bilateral Accords Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Inputs */}
                <div className="md:col-span-5 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-gray-400 uppercase">Origin</label>
                      <select 
                        value={calcOrigin} 
                        onChange={(e) => setCalcOrigin(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500"
                      >
                        <option>India</option>
                        <option>UAE</option>
                        <option>USA</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-gray-400 uppercase">Destination</label>
                      <select 
                        value={calcDest} 
                        onChange={(e) => setCalcDest(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500"
                      >
                        <option>UAE</option>
                        <option>India</option>
                        <option>USA</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Declared Value (USD)</label>
                    <input 
                      type="number" 
                      value={calcValue} 
                      onChange={(e) => setCalcValue(e.target.value)}
                      placeholder="e.g. 100000"
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase">Product Category</label>
                    <select 
                      value={calcCategory} 
                      onChange={(e) => setCalcCategory(e.target.value)}
                      className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none focus:border-blue-500"
                    >
                      <option>Gold</option>
                      <option>Electronics</option>
                      <option>Petrochemicals</option>
                      <option>Agriculture</option>
                    </select>
                  </div>

                  <button 
                    onClick={() => {
                      const val = parseFloat(calcValue) || 0;
                      if (calcOrigin === calcDest) {
                        setCalcResult({
                          rate: "0.0%",
                          duty: "$0",
                          savings: "$0",
                          accord: "Domestic Trade (No Customs Duty)"
                        });
                        return;
                      }

                      if (calcOrigin === "India" && calcDest === "UAE") {
                        if (calcCategory === "Gold") {
                          setCalcResult({
                            rate: "5.0% Preferential Rate",
                            duty: `$${(val * 0.05).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                            savings: `$${(val * 0.05).toLocaleString(undefined, { maximumFractionDigits: 0 })} (CEPA Concession Applied)`,
                            accord: "India-UAE CEPA Accord"
                          });
                        } else if (calcCategory === "Petrochemicals") {
                          setCalcResult({
                            rate: "0.0% Preferred Tariff",
                            duty: "$0",
                            savings: `$${(val * 0.075).toLocaleString(undefined, { maximumFractionDigits: 0 })} (Full Exemption)`,
                            accord: "India-UAE CEPA Accord"
                          });
                        } else {
                          setCalcResult({
                            rate: "3.5%",
                            duty: `$${(val * 0.035).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                            savings: `$${(val * 0.04).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                            accord: "India-UAE CEPA Accord"
                          });
                        }
                      } else if (calcOrigin === "UAE" && calcDest === "India") {
                        if (calcCategory === "Gold") {
                          setCalcResult({
                            rate: "10.0% Concession rate",
                            duty: `$${(val * 0.1).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                            savings: `$${(val * 0.05).toLocaleString(undefined, { maximumFractionDigits: 0 })} (CEPA Tariff Concession)`,
                            accord: "India-UAE CEPA Accord"
                          });
                        } else {
                          setCalcResult({
                            rate: "7.5%",
                            duty: `$${(val * 0.075).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                            savings: `$${(val * 0.025).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                            accord: "India-UAE CEPA Accord"
                          });
                        }
                      } else {
                        // USA
                        setCalcResult({
                          rate: "12.5% MFN rate",
                          duty: `$${(val * 0.125).toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
                          savings: "$0 (No Active Preferential Trade Accord)",
                          accord: "Standard WTO MFN Schedules"
                        });
                      }
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors uppercase tracking-wider"
                  >
                    Calculate Tariff Concessions
                  </button>
                </div>

                {/* Outputs */}
                <div className="md:col-span-7 bg-gray-55 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-100 dark:border-gray-800 flex flex-col justify-center space-y-4 min-h-[200px]">
                  {calcResult ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-gray-400 uppercase">Bilateral Framework</span>
                        <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-650 dark:text-emerald-400 text-[8px] font-bold px-2 py-0.5 rounded uppercase font-mono">
                          {calcResult.accord}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] text-gray-400 block uppercase">Duty Rate</span>
                          <div className="text-sm font-bold text-gray-955 dark:text-white font-mono">{calcResult.rate}</div>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] text-gray-400 block uppercase font-bold">Duty Payable</span>
                          <div className="text-sm font-bold text-blue-650 dark:text-blue-400 font-mono">{calcResult.duty}</div>
                        </div>
                      </div>

                      <div className="space-y-1 border-t border-gray-150 dark:border-gray-855 pt-3">
                        <span className="text-[9px] text-emerald-500 font-bold block uppercase">Net Concession Savings</span>
                        <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">{calcResult.savings}</div>
                      </div>

                      <p className="text-[9px] text-gray-400 leading-relaxed font-normal">
                        * Calculations are estimates based on active preferential tariff schedules and certificate of origin registry databases. Review official customs codes before clearing manifests.
                      </p>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-2">
                      <Compass className="h-8 w-8 text-gray-300 mx-auto" />
                      <h5 className="text-xs font-bold text-gray-450 uppercase">No Active Calculation</h5>
                      <p className="text-[10px] text-gray-400 max-w-xs mx-auto leading-relaxed font-normal">
                        Select origin, destination, category, and enter value to query available trade accord concession tariffs.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* D. Browse News by Global Region */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Browse News by Global Region</h2>
                <Link href="/en/news-poc/country-news/all" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View All 195 Countries</Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {REGIONS_GRID.map((reg) => (
                  <Link key={reg.code} href="/eoi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3 rounded-xl text-center hover:shadow-sm hover:border-blue-500 transition-all group space-y-1">
                    <span className="text-xl block mb-1">{reg.icon}</span>
                    <span className="font-bold text-[10px] text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors block leading-tight">{reg.name}</span>
                    <span className="text-[8px] text-gray-450 block">{reg.count}</span>
                    <span className="text-[8px] font-bold text-emerald-500 block">{reg.growth}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* E. AI Risk & Growth Forecasts */}
            <div className="bg-gradient-to-br from-[#0b192e] to-[#142d52] text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <h2 className="font-display text-sm font-bold uppercase tracking-wider">AI Country Risk & Growth Intelligence</h2>
                </div>
                <span className="bg-amber-400 text-gray-950 text-[8px] font-bold px-2 py-0.5 rounded-full">PRO FEATURE</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "UAE CEPA Tariff Phase-Out Schedule", desc: "Tariff reductions on 80% non-oil product codes entering force Q3 2026." },
                  { title: "US Critical Tech Regulatory Forecast", desc: "Export licensing updates for semiconductor equipment approved." },
                  { title: "EU Green Hydrogen Transport Subsidy", desc: "LCOH shipping subsidies lower landed European cost to €3.20/kg." }
                ].map((f, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-1.5">
                    <h4 className="text-xs font-bold text-white">{f.title}</h4>
                    <p className="text-[10px] text-slate-300 font-normal leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs">
                  Unlock AI Country Forecasts
                </Link>
                <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all">
                  Download Risk Matrix
                </Link>
              </div>
            </div>

            {/* F. Bilateral Country Spotlight Curation */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{COUNTRY_SPOTLIGHT.flag}</span>
                  <div>
                    <h3 className="font-bold text-base text-gray-900 dark:text-white">{COUNTRY_SPOTLIGHT.name}</h3>
                    <span className="text-[9px] text-gray-450">Capital: {COUNTRY_SPOTLIGHT.capital}</span>
                  </div>
                </div>
                <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg transition-colors">
                  View Full Country Profile
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <span className="text-[8px] font-bold text-gray-400 uppercase block">GDP Nominal</span>
                  <span className="font-display text-sm font-bold text-gray-900 dark:text-white mt-0.5 block">{COUNTRY_SPOTLIGHT.gdp}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <span className="text-[8px] font-bold text-gray-400 uppercase block">GDP Growth</span>
                  <span className="font-display text-sm font-bold text-emerald-500 mt-0.5 block">{COUNTRY_SPOTLIGHT.growth}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <span className="text-[8px] font-bold text-gray-400 uppercase block">Bilateral Trade</span>
                  <span className="font-display text-sm font-bold text-blue-600 mt-0.5 block">{COUNTRY_SPOTLIGHT.tradeWithIndia}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                  <span className="text-[8px] font-bold text-gray-400 uppercase block">FDI Inflows</span>
                  <span className="font-display text-sm font-bold text-purple-600 mt-0.5 block">{COUNTRY_SPOTLIGHT.fdiInflows}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 italic font-normal leading-relaxed border-t border-gray-100 dark:border-gray-850 pt-3">
                💡 {COUNTRY_SPOTLIGHT.highlight}
              </p>
            </div>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Country of the Week Card */}
            <div className="relative bg-gradient-to-br from-[#0b192e] to-[#142d52] text-white border border-slate-800 p-5 rounded-2xl shadow-sm space-y-4 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-xl" />
              <div className="relative z-10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-500 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest">📅 Country of the Week</span>
                  <button 
                    onClick={() => {
                      setFollowedCountries(prev => prev.includes("United Arab Emirates") ? prev.filter(c => c !== "United Arab Emirates") : [...prev, "United Arab Emirates"]);
                    }}
                    className={`text-[8px] font-bold px-2 py-0.5 rounded-md transition-all ${
                      followedCountries.includes("United Arab Emirates")
                        ? "bg-emerald-500 text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {followedCountries.includes("United Arab Emirates") ? "Following" : "+ Watchlist"}
                  </button>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl">🇦🇪</span>
                  <div>
                    <span className="font-display font-bold text-sm block leading-tight">United Arab Emirates</span>
                    <span className="text-[9px] text-slate-450">Middle East · CEPA Partner</span>
                  </div>
                </div>
                <p className="text-slate-350 text-[10px] leading-relaxed font-normal">
                  Non-oil trade corridor surpasses $87B under CEPA, Jebel Ali Port logs record throughput, and ADIA commits fresh $4.2B into Indian infrastructure.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1.5 border-t border-white/10">
                  <div className="text-center bg-white/5 p-2 rounded-lg">
                    <div className="text-[10px] font-bold text-emerald-400">+18.4%</div>
                    <div className="text-[8px] text-slate-400">Trade Growth</div>
                  </div>
                  <div className="text-center bg-white/5 p-2 rounded-lg">
                    <div className="text-[10px] font-bold text-amber-400">$87.2B</div>
                    <div className="text-[8px] text-slate-400">Bilateral Value</div>
                  </div>
                </div>
                <Link href="/eoi" className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-2 rounded-lg transition-all">
                  Read Full Coverage →
                </Link>
              </div>
            </div>

            {/* Top Global Companies */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
              <div className="px-4 py-2.5 bg-blue-600 text-white flex items-center justify-between font-bold text-xs">
                <span>Top Global Companies</span>
                <Link href="/eoi" className="text-[9px] opacity-80 hover:opacity-100">View All</Link>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {TOP_GLOBAL_COMPANIES.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>{c.logo}</div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{c.name}</span>
                      <span className="text-[8px] text-gray-450 block truncate">{c.country} · {c.sector}</span>
                    </div>
                    <span className="text-[7px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">{c.tier}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Global Leaders */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
              <div className="px-4 py-2.5 bg-purple-600 text-white flex items-center justify-between font-bold text-xs">
                <span>Top Global Leaders</span>
                <Link href="/eoi" className="text-[9px] opacity-80 hover:opacity-100">View All</Link>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {TOP_COUNTRY_LEADERS.map((l, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>{l.initial}</div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{l.name}</span>
                      <span className="text-[8px] text-gray-450 block truncate">{l.role}</span>
                    </div>
                    <span className="font-display text-xs font-bold text-purple-600">{l.score}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Research Reports */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-2">
                <span className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Country Research Reports</span>
                <Download className="h-4 w-4 text-blue-500" />
              </div>
              <div className="space-y-2">
                {PREMIUM_REPORTS.slice(0, 2).map((rep, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-100 dark:border-gray-800 space-y-1">
                    <h5 className="text-[10px] font-bold text-gray-900 dark:text-white leading-snug">{rep.title}</h5>
                    <div className="flex items-center justify-between text-[9px] pt-1">
                      <span className="font-bold text-blue-600">{rep.price}</span>
                      <Link href="/eoi" className="text-emerald-600 font-bold hover:underline">Buy Report →</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Country Brief Newsletter */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-850 pb-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Country Brief Newsletter</span>
              </div>
              <p className="text-[10px] text-gray-500">Get weekly bilateral trade insights in your inbox.</p>
              <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none" placeholder="Enter work email" />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors">
                Subscribe Now
              </button>
            </div>

            {/* Simplified Upgrade Teaser (Moved to bottom) */}
            <div className="bg-gradient-to-br from-[#0b192e] to-[#142d52] text-white border border-slate-800 p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Unlock Country Pro Access</span>
              </div>
              <ul className="space-y-1.5 text-[10px] text-slate-300">
                {[
                  "195 Bilateral Trade Dashboards",
                  "AI Tariff & Country Risk Index",
                  "FDI Opportunity Alerts"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/eoi" className="block text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs py-2.5 rounded-lg transition-colors">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ticker Bulletin Detail Modal */}
      {selectedBulletin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-150 dark:border-gray-850 pb-3">
              <span className="bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                {selectedBulletin.cat}
              </span>
              <button 
                onClick={() => setSelectedBulletin(null)}
                className="text-gray-400 hover:text-gray-600 text-xs font-bold"
              >
                ✕ Close
              </button>
            </div>
            <h3 className="font-display text-sm font-bold text-gray-955 dark:text-white leading-snug">
              {selectedBulletin.text}
            </h3>
            <p className="text-[11px] text-gray-500 leading-relaxed font-normal">
              {selectedBulletin.details}
            </p>
            <div className="pt-4 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between gap-3 flex-wrap">
              <span className="text-[10px] text-amber-500 font-bold flex items-center gap-1">
                <Crown className="h-3.5 w-3.5" /> Subscriber Premium Access
              </span>
              <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors">
                Unlock Trade Accords Data
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Factory, Search, CheckCircle, Crown, Star, Globe, TrendingUp,
  ChevronRight, ArrowUpRight, Bookmark, Share2, Eye, Award,
  Sparkles, Lock, Mic, BarChart2, Users, Zap, Trophy,
  MessageSquare, Bell, Filter, Play, ChevronLeft, Target,
  MapPin, Briefcase, Shield, Activity, Calendar, Download, ThumbsUp,
  Building, ArrowDownRight, Layers, FileText, ArrowRight, Mail
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const FEATURED_SECTOR_STORY = {
  id: "sec-hero-1",
  sector: "Semiconductors & Electronics (S46)",
  headline: "India's Semiconductor Capex Crosses $18 Billion as Phase-2 Packaging Fabs Go Live",
  summary: "Strategic capital allocations across Gujarat and Tamil Nadu silicon corridors trigger massive domestic OSAT output expansion, reducing dependency on East Asian packaging hubs by 32%.",
  image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80",
  date: "Updated 1 hr ago",
  readTime: "7 min read",
  metrics: [
    { label: "YoY Sector Growth", value: "+28.4%", color: "text-emerald-400" },
    { label: "Corridor Capex", value: "$18.2 Billion", color: "text-white" },
    { label: "Export Opportunity Score", value: "94/100", color: "text-amber-400" }
  ]
};

const LIVE_SECTOR_UPDATES = [
  { id: "up-1", sector: "Agriculture (S01)", tag: "POLICY ALERT", time: "12m ago", text: "Ministry of Agriculture approves 100% grant for rural drone spraying equipment in Western states." },
  { id: "up-2", sector: "AI & Cyber (S02)", tag: "INVESTMENT", time: "24m ago", text: "Global cloud hyperscaler commits $4.5B to build sovereign AI data center corridors in Hyderabad." },
  { id: "up-3", sector: "Renewable Energy (S17)", tag: "EXPORT BRIEF", time: "45m ago", text: "Green Hydrogen tariff agreement signed with EU ports, securing 2M metric ton annual supply corridors." },
  { id: "up-4", sector: "Automotive & EV (S45)", tag: "STANDARDS", time: "1h ago", text: "Unified EV battery swapping protocol published by Ministry of Heavy Industries." }
];

const PERFORMANCE_METRICS = [
  { label: "Global Trade Output (YTD)", val: "$782.4B", change: "+12.3% YoY", icon: Globe, color: "text-blue-500" },
  { label: "FDI Capital Inflows", val: "$48.1B", change: "+8.7% YoY", icon: TrendingUp, color: "text-emerald-500" },
  { label: "Active Sector Projects", val: "1,350+", change: "+14.2% YoY", icon: Layers, color: "text-purple-500" },
  { label: "Employment Generation Index", val: "88.4 / 100", change: "+5.1% YoY", icon: Users, color: "text-amber-500" }
];

const SECTORS_50_GRID = [
  { code: "S01", name: "Agriculture & Farmers Welfare", icon: "🌾", count: "28 Industries", growth: "+14.2%", ministry: "Min of Agriculture" },
  { code: "S02", name: "AI & Cyber Security", icon: "🤖", count: "30 Industries", growth: "+34.1%", ministry: "Ministry of Electronics & IT" },
  { code: "S06", name: "Biotechnology", icon: "🧬", count: "30 Industries", growth: "+22.5%", ministry: "Min of Science & Tech" },
  { code: "S13", name: "Defence & Aerospace", icon: "🛡️", count: "25 Industries", growth: "+19.8%", ministry: "Ministry of Defence" },
  { code: "S16", name: "Electronics & IT", icon: "🔌", count: "35 Industries", growth: "+28.7%", ministry: "Ministry of Electronics & IT" },
  { code: "S17", name: "Energy & Sustainability", icon: "⚡", count: "28 Industries", growth: "+31.0%", ministry: "Min of Renewable Energy" },
  { code: "S23", name: "Health & Family Welfare", icon: "🏥", count: "25 Industries", growth: "+18.4%", ministry: "Ministry of Health" },
  { code: "S42", name: "FinTech & Digital Payments", icon: "💳", count: "26 Industries", growth: "+26.9%", ministry: "Reserve Bank of India" },
  { code: "S43", name: "Logistics & Supply Chain", icon: "🚢", count: "26 Industries", growth: "+16.5%", ministry: "Ministry of Commerce" },
  { code: "S45", name: "Automotive & Electric Vehicles", icon: "🚗", count: "26 Industries", growth: "+24.3%", ministry: "Min of Heavy Industries" },
  { code: "S46", name: "Semiconductors", icon: "📟", count: "26 Industries", growth: "+38.2%", ministry: "Ministry of Electronics & IT" },
  { code: "S47", name: "Startups & Innovation", icon: "🚀", count: "26 Industries", growth: "+21.4%", ministry: "DPIIT" }
];

const LATEST_SECTOR_NEWS = [
  { id: "sn-1", title: "India-US Critical Tech Bilateral Accord Drives Semiconductor Substrate Orders", sector: "Semiconductors (S46)", author: "IGEN Tech Desk", date: "25m ago", views: "2.4K", readTime: "5 min", premium: false },
  { id: "sn-2", title: "Green Hydrogen Electrolyser Subsidies Expanded by 20% Under SIGHT Phase-2", sector: "Energy (S17)", author: "CleanTech Bureau", date: "1h ago", views: "1.8K", readTime: "4 min", premium: true },
  { id: "sn-3", title: "Precision Agritech Drone Exports Cross $450 Million Milestone to LATAM", sector: "Agriculture (S01)", author: "AgriTrade Insights", date: "2h ago", views: "1.2K", readTime: "6 min", premium: false },
  { id: "sn-4", title: "Defense Autonomous Avionics Procurement Framework Finalized for IAF", sector: "Defence (S13)", author: "Defence Desk", date: "3h ago", views: "2.9K", readTime: "5 min", premium: true },
  { id: "sn-5", title: "UPI Cross-Border Remittance Corridors Expand to 12 ASEAN Economies", sector: "FinTech (S42)", author: "FinTech Bureau", date: "4h ago", views: "3.1K", readTime: "4 min", premium: false }
];

const AI_INTELLIGENCE_FORECASTS = [
  { topic: "Semiconductor OSAT Localization", sig: "SIGNAL: HIGH CONFIDENCE", desc: "Domestic substrate capex indicates 42% import reduction by Q4 2026.", score: "94/100", confidence: "92%" },
  { topic: "Green Hydrogen Maritime Freight", sig: "SIGNAL: RISING MOMENTUM", desc: "EU trade corridor agreements lower landed transport costs by $1.20/kg.", score: "88/100", confidence: "86%" },
  { topic: "Autonomous Agritech Sprayers", sig: "SIGNAL: EMERGING OPPORTUNITY", desc: "Direct capital grants expected to boost rural crop yield by 18%.", score: "85/100", confidence: "81%" }
];

const PREMIUM_REPORTS = [
  { title: "2026 Semiconductor Substrate & OSAT Market Intelligence", code: "REP-SEM-46", price: "$249", pages: "84 pages", rating: "4.9 ★" },
  { title: "India Green Hydrogen Trade Corridors & LCOH Outlook", code: "REP-ENG-17", price: "$199", pages: "62 pages", rating: "4.8 ★" },
  { title: "Agritech Precision Drone Sprayer Global Export Report", code: "REP-AGR-01", price: "$149", pages: "50 pages", rating: "4.9 ★" }
];

const TOP_COMPANIES = [
  { name: "Tata Electronics", sector: "Semiconductors & IT", tier: "Enterprise", logo: "TE", color: "from-blue-600 to-indigo-700" },
  { name: "Reliance Green Energy", sector: "New & Renewable Energy", tier: "Enterprise", logo: "RE", color: "from-purple-600 to-violet-700" },
  { name: "Biocon Biologics", sector: "Biotechnology & Pharma", tier: "Verified Pro", logo: "BB", color: "from-emerald-600 to-teal-700" },
  { name: "Adani Defense & Aerospace", sector: "Defence & Aerospace", tier: "Enterprise", logo: "AD", color: "from-amber-500 to-orange-600" }
];

const TOP_LEADERS = [
  { name: "Satya Nadella", role: "CEO, Microsoft", sector: "Technology & AI", score: 97.5, initial: "SN", color: "from-teal-500 to-cyan-600" },
  { name: "Kiran Mazumdar-Shaw", role: "Founder, Biocon", sector: "Biotechnology", score: 95.1, initial: "KM", color: "from-rose-500 to-pink-600" },
  { name: "N Chandrasekaran", role: "Chairman, Tata Group", sector: "Manufacturing", score: 94.8, initial: "NC", color: "from-blue-700 to-slate-800" },
  { name: "Gautam Adani", role: "Chairman, Adani Group", sector: "Infrastructure", score: 98.7, initial: "GA", color: "from-blue-600 to-indigo-700" }
];

const NEWS_TABS = ["Latest", "Trending", "Most Read", "Editor's Pick"];

export default function NewsPOCSectorNewsHome() {
  const [activeNewsTab, setActiveNewsTab] = useState("Latest");

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO BANNER — 50-Sector Industry Intelligence Hub
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#0c182b] via-[#122644] to-[#081222] text-white overflow-hidden">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        {/* Glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-10 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
            <div className="flex-1 space-y-6 max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                  <Factory className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Industry Intelligence Hub (IGN-M03)</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Sector News & Intelligence
              </h1>
              
              <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed max-w-lg">
                Real-time sector developments, macroeconomic scorecards, and trade intelligence across 50 sectors, 1,350+ industries, and 23 GoI ministries.
              </p>

              {/* Search bar with filters */}
              <div className="flex gap-2 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search 50 sectors, industries, trade news..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm outline-none focus:border-blue-400 transition-colors"
                  />
                </div>
                <select className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-3 text-xs outline-none">
                  <option className="bg-gray-900 text-white">All 50 Sectors</option>
                  <option className="bg-gray-900 text-white">Semiconductors (S46)</option>
                  <option className="bg-gray-900 text-white">AI & Cyber (S02)</option>
                  <option className="bg-gray-900 text-white">Renewable Energy (S17)</option>
                  <option className="bg-gray-900 text-white">Biotechnology (S06)</option>
                </select>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm shrink-0">
                  Search
                </button>
              </div>

              {/* 4 Primary CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link href="/en/news-poc/sector-news/all" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs">
                  <Factory className="h-3.5 w-3.5" /> Explore All 50 Sectors
                </Link>
                <Link href="/en/news-poc/sector-news/engagement" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs">
                  <Users className="h-3.5 w-3.5" /> Sector Engagement
                </Link>
                <Link href="/en/news-poc/sector-news/intelligence" className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs">
                  <Download className="h-3.5 w-3.5" /> Intelligence Reports
                </Link>
                <Link href="/eoi" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all">
                  <Crown className="h-3.5 w-3.5" /> Upgrade to Pro
                </Link>
              </div>
            </div>

            {/* Quick Stat Counter Panel */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {[
                { val: "50", label: "Core Sectors", icon: Factory, color: "text-blue-400" },
                { val: "1,350+", label: "Industries Tracked", icon: Layers, color: "text-emerald-400" },
                { val: "$782B+", label: "Annual Trade Output", icon: TrendingUp, color: "text-amber-400" },
                { val: "23", label: "GoI Ministries", icon: Building, color: "text-purple-400" }
              ].map((s, idx) => {
                const SIcon = s.icon;
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-1.5 backdrop-blur-xs">
                    <SIcon className={`h-5 w-5 mx-auto ${s.color}`} />
                    <div className={`font-display text-xl font-bold ${s.color}`}>{s.val}</div>
                    <div className="text-slate-400 text-[9px] font-semibold uppercase tracking-wider">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submenu Quick Navigation Strip */}
        <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-xs">
          <div className="mx-auto max-w-7xl px-4 lg:px-6 py-3 flex flex-wrap gap-2 items-center justify-between">
            <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Submenus:</span>
            <div className="flex gap-2 flex-wrap text-xs">
              {[
                { label: "All Sector Directory", href: "/en/news-poc/sector-news/all", badge: "50 Sectors" },
                { label: "Sector Engagement", href: "/en/news-poc/sector-news/engagement", badge: "Community" },
                { label: "Sector Intelligence", href: "/en/news-poc/sector-news/intelligence", badge: "Reports & AI" }
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
          2. FEATURED SECTOR INTELLIGENCE
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="relative rounded-2xl overflow-hidden bg-slate-950 text-white min-h-[380px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-30 group-hover:scale-102 transition-transform duration-300"
            style={{ backgroundImage: `url(${FEATURED_SECTOR_STORY.image})` }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                FEATURED SECTOR INTELLIGENCE
              </span>
              <span className="text-[10px] text-slate-300 font-semibold">
                {FEATURED_SECTOR_STORY.sector} · {FEATURED_SECTOR_STORY.date}
              </span>
            </div>

            <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight text-white group-hover:text-blue-300 transition-colors">
              {FEATURED_SECTOR_STORY.headline}
            </h2>
            
            <p className="text-slate-300 text-xs md:text-sm font-normal max-w-3xl leading-relaxed">
              {FEATURED_SECTOR_STORY.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 border-t border-white/10 pt-4 text-xs font-semibold text-slate-300">
              {FEATURED_SECTOR_STORY.metrics.map((m, idx) => (
                <div key={idx}>
                  <span className="block text-[8px] text-gray-400 uppercase">{m.label}</span>
                  <span className={`text-sm font-bold ${m.color}`}>{m.value}</span>
                </div>
              ))}
              <div className="ml-auto">
                <Link href={`/en/news-poc/article/${FEATURED_SECTOR_STORY.id}`} className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 text-[10px]">
                  READ FULL ANALYSIS <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. LIVE SECTOR UPDATES & TICKER
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
              <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Live Sector Updates</h3>
            </div>
            <Link href="/eoi" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View All Updates</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {LIVE_SECTOR_UPDATES.map((up) => (
              <div key={up.id} className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                <div className="flex items-center justify-between text-[8px] font-bold">
                  <span className="text-blue-600 dark:text-blue-400">{up.sector}</span>
                  <span className="bg-red-50 dark:bg-red-950/20 text-red-600 px-1.5 py-0.5 rounded">{up.tag} · {up.time}</span>
                </div>
                <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{up.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. SECTOR PERFORMANCE DASHBOARD
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Sector Performance Dashboard</h2>
            <span className="text-[9px] font-bold text-gray-400">Macroeconomic Metrics</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PERFORMANCE_METRICS.map((pm, idx) => {
              const PMIcon = pm.icon;
              return (
                <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-2">
                  <PMIcon className={`h-6 w-6 ${pm.color}`} />
                  <span className="text-[9px] font-bold text-gray-400 uppercase block">{pm.label}</span>
                  <div className="font-display text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{pm.val}</div>
                  <span className="text-[9px] font-bold text-emerald-500 block">{pm.change}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          5. BROWSE BY SECTOR (50 SECTORS GRID)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Browse 50 Industry Sectors</h2>
            <Link href="/en/news-poc/sector-news/all" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View Master Directory (All 50)</Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {SECTORS_50_GRID.map((sec) => (
              <Link key={sec.code} href="/eoi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3.5 rounded-xl text-center hover:shadow-sm hover:border-blue-500 transition-all group">
                <span className="text-2xl block mb-1">{sec.icon}</span>
                <span className="text-[9px] font-mono text-gray-400 font-bold block">{sec.code}</span>
                <span className="font-bold text-[10px] text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors block truncate">{sec.name}</span>
                <span className="text-[8px] text-emerald-500 font-bold block mt-0.5">{sec.growth} YoY</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          6. MAIN GRID (Latest News / AI Forecasts / Reports / Companies)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-12 gap-8">

          {/* ── LEFT MAIN COLUMN ── */}
          <div className="col-span-12 lg:col-span-8 space-y-10">

            {/* LATEST SECTOR NEWS (TABBED FEED) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Latest Sector News Feed</h2>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
                  {NEWS_TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveNewsTab(tab)}
                      className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${activeNewsTab === tab ? "bg-white dark:bg-gray-800 text-blue-600 shadow-xs" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {LATEST_SECTOR_NEWS.map((item) => (
                  <Link key={item.id} href={`/en/news-poc/article/${item.id}`} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm hover:border-blue-300 dark:hover:border-blue-900 transition-all group block">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 rounded border border-blue-100/40">
                            {item.sector}
                          </span>
                          <span className="text-[9px] text-gray-400">{item.date} · {item.readTime}</span>
                          {item.premium && <Lock className="h-3 w-3 text-amber-500" />}
                        </div>
                        <h3 className="text-xs md:text-sm font-bold text-gray-950 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                          {item.title}
                        </h3>
                        <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1">
                          <span>By {item.author}</span>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />{item.views}</span>
                            <Bookmark className="h-3 w-3 hover:text-blue-500 cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center">
                <Link href="/eoi" className="text-blue-600 font-bold text-xs hover:underline flex items-center gap-1 justify-center">
                  Load More Sector News <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* AI MARKET INTELLIGENCE & FORECASTS */}
            <div className="bg-gradient-to-br from-[#0c182b] to-[#122b4a] text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <h2 className="font-display text-sm font-bold uppercase tracking-wider">AI Market Intelligence & Signals</h2>
                </div>
                <span className="bg-amber-400 text-gray-950 text-[8px] font-bold px-2 py-0.5 rounded-full">POWERED BY IGEN AI</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {AI_INTELLIGENCE_FORECASTS.map((f, idx) => (
                  <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="text-[8px] font-bold text-blue-400 uppercase block">{f.sig}</span>
                      <h4 className="text-xs font-bold text-white mt-1">{f.topic}</h4>
                      <p className="text-[10px] text-slate-300 mt-1 leading-relaxed font-normal">{f.desc}</p>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[9px]">
                      <span className="text-slate-400">Opportunity: <strong className="text-amber-400">{f.score}</strong></span>
                      <span className="text-slate-400">Confidence: <strong className="text-emerald-400">{f.confidence}</strong></span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs">
                  Unlock AI Insights
                </Link>
                <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all">
                  View Datapack Samples
                </Link>
              </div>
            </div>

            {/* PREMIUM INTELLIGENCE REPORTS STORE */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Premium Sector Intelligence Reports</h2>
                <Link href="/en/news-poc/sector-news/intelligence" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View All Reports</Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PREMIUM_REPORTS.map((rep, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[8px] font-bold text-gray-400">
                        <span>{rep.code}</span>
                        <span className="text-amber-500">{rep.rating}</span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white mt-1 leading-snug">{rep.title}</h4>
                      <span className="text-[9px] text-gray-400 block mt-1">{rep.pages}</span>
                    </div>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between">
                      <span className="font-display text-sm font-bold text-gray-900 dark:text-white">{rep.price}</span>
                      <Link href="/eoi" className="bg-emerald-500 hover:bg-emerald-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-lg transition-colors">
                        Buy Report
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Persistent Upgrade Banner */}
            <div className="bg-gradient-to-br from-slate-950 to-[#122644] text-white border border-slate-800 p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Upgrade to Sector Pro</span>
              </div>
              <ul className="space-y-2 text-[10px] text-slate-300">
                {[
                  "Unlimited Sector News & Datapacks",
                  "AI Forecasts & Opportunity Scores",
                  "Full Access to 50-Sector Dashboards",
                  "Discounted Intelligence Reports",
                  "Custom Sector Alerts & CRM Exports"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-2 pt-2">
                <Link href="/eoi" className="block text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-lg transition-colors">
                  Get Pro Membership
                </Link>
                <Link href="/eoi" className="block text-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950 font-bold text-xs py-2.5 rounded-lg transition-colors">
                  Go Enterprise
                </Link>
              </div>
            </div>

            {/* Top Companies */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
              <div className="px-4 py-2.5 bg-blue-600 text-white flex items-center justify-between font-bold text-xs">
                <span>Top Sector Companies</span>
                <Link href="/eoi" className="text-[9px] opacity-80 hover:opacity-100">View All</Link>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {TOP_COMPANIES.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${c.color} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>{c.logo}</div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{c.name}</span>
                      <span className="text-[8px] text-gray-450 block truncate">{c.sector}</span>
                    </div>
                    <span className="text-[7px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-600">{c.tier}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Leaders */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
              <div className="px-4 py-2.5 bg-purple-600 text-white flex items-center justify-between font-bold text-xs">
                <span>Top Industry Leaders</span>
                <Link href="/eoi" className="text-[9px] opacity-80 hover:opacity-100">View All</Link>
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {TOP_LEADERS.map((l, idx) => (
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

            {/* Newsletter Subscription */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-850 pb-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Sector Digest Newsletter</span>
              </div>
              <p className="text-[10px] text-gray-500">Get daily B2B sector briefs delivered to your inbox.</p>
              <input className="w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs outline-none" placeholder="Enter work email" />
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors">
                Subscribe Now
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import {
  Building2, Search, CheckCircle, Star, Globe, TrendingUp,
  ArrowUpRight, Users, Award, Briefcase, Shield, ChevronLeft, ChevronRight,
  Sparkles, Crown, BarChart2, Mail, Lock, Zap, Target, MapPin
} from "lucide-react";

const FEATURED_COMPANIES = [
  {
    name: "Tata Steel Ltd.",
    badge: "enterprise",
    sector: "Steel & Metallurgy",
    country: "India",
    desc: "World-class steel producer with 26 MTPA capacity across 5 continents. Leader in sustainable manufacturing.",
    logo: "TS",
    color: "from-blue-600 to-indigo-700",
    employees: "65,000+",
    revenue: "$22B+",
    followers: "12.4K"
  },
  {
    name: "Mahindra Logistics",
    badge: "verified",
    sector: "Logistics & Supply Chain",
    country: "India",
    desc: "End-to-end supply chain solutions for enterprise clients across automotive, e-commerce, and FMCG.",
    logo: "ML",
    color: "from-emerald-600 to-teal-700",
    employees: "18,000+",
    revenue: "$1.2B+",
    followers: "6.8K"
  },
  {
    name: "Adani Green Energy",
    badge: "enterprise",
    sector: "Renewable Energy",
    country: "India",
    desc: "Largest solar energy portfolio in Asia with 20.4 GW operational capacity and global expansion plans.",
    logo: "AG",
    color: "from-amber-500 to-orange-600",
    employees: "5,200+",
    revenue: "$1.8B+",
    followers: "9.1K"
  },
  {
    name: "Cipla Pharmaceuticals",
    badge: "verified",
    sector: "Pharmaceuticals",
    country: "India",
    desc: "Trusted generics exporter delivering affordable healthcare solutions to 80+ countries worldwide.",
    logo: "CP",
    color: "from-purple-600 to-violet-700",
    employees: "22,000+",
    revenue: "$3.1B+",
    followers: "5.3K"
  },
  {
    name: "Reliance Industries",
    badge: "enterprise",
    sector: "Conglomerate",
    country: "India",
    desc: "Fortune 500 conglomerate spanning petrochemicals, telecom, retail and digital services globally.",
    logo: "RI",
    color: "from-blue-900 to-slate-800",
    employees: "2,36,000+",
    revenue: "$104B+",
    followers: "41.2K"
  },
  {
    name: "Infosys BPM",
    badge: "verified",
    sector: "IT & Technology",
    country: "India",
    desc: "Global leader in business process management and digital transformation services for Fortune 500 clients.",
    logo: "IB",
    color: "from-teal-600 to-cyan-700",
    employees: "50,000+",
    revenue: "$6.3B+",
    followers: "18.7K"
  }
];

const SECTORS = [
  { name: "Steel & Metallurgy", count: 142, icon: "⚙️", trending: true },
  { name: "Automotive & EV", count: 218, icon: "🚗", trending: true },
  { name: "Pharmaceuticals", count: 195, icon: "💊", trending: false },
  { name: "Renewable Energy", count: 174, icon: "⚡", trending: true },
  { name: "Logistics", count: 231, icon: "🚢", trending: false },
  { name: "IT & Technology", count: 312, icon: "💻", trending: true },
  { name: "Agriculture", count: 158, icon: "🌾", trending: false },
  { name: "Chemicals", count: 124, icon: "🧪", trending: false },
];

const TRENDING_COMPANIES = [
  { name: "NVIDIA India", sector: "Semiconductors", views: "24.1K", change: "+18%" },
  { name: "Ola Electric", sector: "Automotive & EV", views: "18.4K", change: "+31%" },
  { name: "Byju's Global", sector: "EdTech", views: "11.2K", change: "+9%" },
  { name: "PharmEasy", sector: "Pharma", views: "9.8K", change: "+14%" },
];
const LATEST_NEWS = [
  { company: "Tata Steel", news: "Signs 5-year green steel supply agreement with European automotive giant Volkswagen.", time: "2 hrs ago", badge: "enterprise" },
  { company: "Mahindra Logistics", news: "Launches AI-powered warehouse automation suite across 12 distribution centres in Q3.", time: "5 hrs ago", badge: "verified" },
  { company: "Adani Green", news: "Breaks world record with 20 GW solar capacity milestone — fastest in global energy history.", time: "8 hrs ago", badge: "enterprise" },
  { company: "Infosys BPM", news: "Announces expansion of digital trade finance operations across ASEAN markets.", time: "1 day ago", badge: "verified" }
];

const TRENDING_NEWS = [
  { company: "Reliance Industries", news: "Jio Financial Services plans joint venture with BlackRock to launch wealth management services.", time: "Trending #1", badge: "enterprise" },
  { company: "Ola Electric", news: "Secures funding round from global institutional buyers ahead of EV bike rollout.", time: "Trending #2", badge: "verified" },
  { company: "Tata Steel", news: "Announces major decarbonization upgrade at UK port Talbot operations.", time: "Trending #3", badge: "enterprise" },
  { company: "Cipla Pharmaceuticals", news: "Receives US FDA approval for new peptide synthesis production line.", time: "Trending #4", badge: "verified" }
];

const FEATURED_COMPANY_STORY = {
  id: "fcs-1",
  company: "Tata Motors Ltd.",
  sector: "Automotive & Electric Vehicles",
  date: "Updated 10 mins ago",
  headline: "Tata Motors Secures $1.2 Billion Gujarat Maritime EV Battery Hub Contract",
  summary: "India's automotive powerhouse partners with state agencies to construct a mega lithium-ion battery plant in Gujarat's trade corridor, targeting a massive production output of 20 GWh annually to support global zero-emission exports.",
  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
  metrics: [
    { label: "Deal Valuation", value: "$1.2 Billion", color: "text-amber-400" },
    { label: "Annual Output Target", value: "20 GWh", color: "text-emerald-400" },
    { label: "Export Capacity Boost", value: "+45%", color: "text-blue-400" }
  ]
};

export default function NewsPOCCompanyNewsHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "enterprise" | "verified" | "registered">("all");
  const [newsTab, setNewsTab] = useState<"latest" | "trending">("latest");

  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" 
        ? scrollLeft - clientWidth / 2
        : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const filtered = FEATURED_COMPANIES.filter(c =>
    activeTab === "all" ? true : c.badge === activeTab
  );

  const badgeConfig: Record<string, { label: string; color: string; icon: any }> = {
    enterprise: { label: "Enterprise", color: "from-amber-400 to-orange-500", icon: Crown },
    verified: { label: "Verified", color: "from-emerald-500 to-teal-600", icon: CheckCircle },
    registered: { label: "Registered", color: "from-blue-400 to-blue-600", icon: Building2 }
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">

      {/* ── TOP SEARCH & TICKER STRIP ── */}
      <section className="bg-gradient-to-br from-[#0c1931] via-[#0f2444] to-[#0a1628] text-white pt-10 pb-6 border-b border-gray-800">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-amber-400" />
              <h1 className="font-display text-2xl font-bold tracking-tight">Company News Hub</h1>
              <span className="bg-amber-400 text-gray-955 text-[9px] font-extrabold px-1.5 py-0.5 rounded-full ml-1">$</span>
            </div>
            
            {/* Search bar */}
            <div className="flex gap-2 w-full md:max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search corporate updates, sectors, countries..."
                  className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-slate-400 outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <button className="bg-amber-500 hover:bg-amber-600 text-gray-955 text-xs font-bold px-4 py-2 rounded-xl transition-all">
                Search
              </button>
            </div>
          </div>

          {/* Quick filter chips */}
          <div className="flex flex-wrap gap-2 justify-start items-center">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mr-2">Quick filters:</span>
            {["All Sectors", "India", "APAC", "Manufacturing", "Technology", "Energy"].map((chip) => (
              <button key={chip} className="bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[9px] font-bold px-2.5 py-1 rounded-full transition-all">
                {chip}
              </button>
            ))}
          </div>

          {/* Live news updates ticker */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-2.5 backdrop-blur-md flex items-center gap-3">
            <div className="bg-red-600 text-white text-[8px] font-extrabold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 animate-pulse">
              <span className="h-1 w-1 bg-white rounded-full" />
              LIVE UPDATE
            </div>
            <div className="flex-1 overflow-hidden h-5 relative">
              <div className="absolute inset-0 flex items-center animate-marquee whitespace-nowrap text-[11px] text-slate-200 font-semibold gap-8">
                {[...LATEST_NEWS, ...LATEST_NEWS].map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2">
                    <strong className="text-amber-400 font-bold">{item.company}:</strong> {item.news}
                    <span className="text-slate-400 text-[9px]">({item.time})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── MARKET PULSE STRIP ── */}
          <div className="flex flex-wrap items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-2 backdrop-blur-sm">
            <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest shrink-0 flex items-center gap-1">
              <span className="h-1.5 w-1.5 bg-amber-400 rounded-full animate-pulse" />MARKET PULSE
            </span>
            {[
              { label: "SENSEX", val: "82,341", chg: "+0.74%", up: true },
              { label: "NIFTY 50", val: "25,110", chg: "+0.61%", up: true },
              { label: "USD/INR", val: "₹83.42", chg: "-0.12%", up: false },
              { label: "GOLD", val: "₹71,820", chg: "+0.38%", up: true },
              { label: "CRUDE OIL", val: "$83.10", chg: "-0.55%", up: false },
              { label: "IT SECTOR", val: "↑ HOT", chg: "+1.2%", up: true },
            ].map((m, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[10px] font-semibold shrink-0">
                <span className="text-slate-400">{m.label}</span>
                <span className="text-white font-bold">{m.val}</span>
                <span className={m.up ? "text-emerald-400" : "text-red-400"}>{m.chg}</span>
                {i < 5 && <span className="text-white/20 mx-1">|</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED COMPANY STORY (Hero Card style) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="relative rounded-2xl overflow-hidden bg-[#0c1931] text-white min-h-[380px] flex flex-col justify-end p-8 border border-slate-800 shadow-sm group">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-65 group-hover:scale-102 transition-transform duration-300"
            style={{ backgroundImage: `url(${FEATURED_COMPANY_STORY.image})` }}
          />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
          
          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-gray-955 text-[9px] font-bold px-2 py-0.5 rounded uppercase">
                FEATURED COMPANY STORY
              </span>
              <span className="text-[10px] text-slate-300 font-semibold">
                {FEATURED_COMPANY_STORY.company} · {FEATURED_COMPANY_STORY.date}
              </span>
            </div>

            <h2 className="font-display text-2xl md:text-4xl font-bold leading-tight text-white group-hover:text-amber-300 transition-colors">
              {FEATURED_COMPANY_STORY.headline}
            </h2>
            
            <p className="text-slate-300 text-xs md:text-sm font-normal max-w-3xl leading-relaxed">
              {FEATURED_COMPANY_STORY.summary}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 border-t border-white/10 pt-4 text-xs font-semibold text-slate-300">
              {FEATURED_COMPANY_STORY.metrics.map((m, idx) => (
                <div key={idx}>
                  <span className="block text-[8px] text-gray-400 uppercase">{m.label}</span>
                  <span className={`text-sm font-bold ${m.color}`}>{m.value}</span>
                </div>
              ))}
              <div className="ml-auto">
                <Link href={`/en/poc-v2/article/${FEATURED_COMPANY_STORY.id}`} className="bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-1.5 text-[10px]">
                  READ FULL ANALYSIS <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST & TRENDING NEWS (Full Width, 2 Columns for Featured & Stream) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs p-6 space-y-6">
          <div className="border-b border-gray-100 dark:border-gray-855 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-600 animate-ping" />
              <h3 className="font-display text-lg md:text-xl lg:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Latest & Trending News</h3>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800">
                <button
                  onClick={() => setNewsTab("latest")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                    newsTab === "latest" ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Latest Update
                </button>
                <button
                  onClick={() => setNewsTab("trending")}
                  className={`px-4 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                    newsTab === "trending" ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Trending Stream
                </button>
              </div>
              <Link href="/eoi" className="text-xs font-bold text-blue-500 hover:underline uppercase shrink-0">View All</Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left featured column (col-span-6) */}
            <div className="lg:col-span-6 flex flex-col gap-4 group cursor-pointer">
              <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden bg-slate-900 border border-gray-200 dark:border-gray-800 relative shadow-sm shrink-0">
                <img 
                  src={newsTab === "latest" 
                    ? "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=800&auto=format&fit=crop&q=60"
                    : "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60"
                  } 
                  alt="News thumbnail" 
                  className="w-full h-full object-cover opacity-85 group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {newsTab === "latest" ? "BREAKING COVERAGE" : "HOT TOPIC"}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-extrabold text-[10px] md:text-xs px-2.5 py-0.5 rounded border border-blue-100 dark:border-blue-900/30 uppercase">
                    {newsTab === "latest" ? "Tata Steel Ltd." : "Reliance Industries"}
                  </span>
                  <span className="text-xs text-slate-450 font-semibold">• {newsTab === "latest" ? "2 hrs ago" : "Trending #1"}</span>
                </div>
                <h4 className="font-display text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">
                  {newsTab === "latest" 
                    ? "Tata Steel signs 5-year green steel supply agreement with European automotive giant Volkswagen."
                    : "Jio Financial Services plans joint venture with BlackRock to launch wealth management services."
                  }
                </h4>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
                  {newsTab === "latest"
                    ? "In a major leap for carbon-neutral metal exports, Tata Steel has finalized a long-term contract to deliver high-tensile green steel for Volkswagen's upcoming EV fleet. The deal marks a watershed moment for environmental steel compliance."
                    : "The joint venture targets a modern digital platform to disrupt asset management services across Indian retail investment corridors, backed by BlackRock's world-leading Aladdin risk suite."
                  }
                </p>
                {/* Share buttons on featured card */}
                <div className="flex items-center gap-3 pt-1 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Share:</span>
                  <button className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold px-2.5 py-1 rounded-md transition-colors">🔗 LinkedIn</button>
                  <button className="flex items-center gap-1 bg-sky-500 hover:bg-sky-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-md transition-colors">𝕏 Twitter</button>
                  <button className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white text-[9px] font-bold px-2.5 py-1 rounded-md transition-colors">💬 WhatsApp</button>
                  <button className="flex items-center gap-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 text-[9px] font-bold px-2.5 py-1 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">📋 Copy</button>
                </div>
              </div>
            </div>

            {/* Right stream list (col-span-6) */}
            <div className="lg:col-span-6 divide-y divide-gray-100 dark:divide-gray-800 space-y-4 lg:pl-4">
              {(newsTab === "latest" ? LATEST_NEWS.slice(1) : TRENDING_NEWS.slice(1)).map((item, idx) => {
                const badge = badgeConfig[item.badge];
                const BadgeIcon = badge.icon;
                return (
                  <div key={idx} className={`hover:bg-gray-55 dark:hover:bg-gray-955 transition-colors group p-4 rounded-xl cursor-pointer ${idx > 0 ? "pt-4" : ""}`}>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <span className="font-bold text-xs md:text-sm text-gray-900 dark:text-white">{item.company}</span>
                      <BadgeIcon className={`h-3.5 w-3.5 ${item.badge === "enterprise" ? "text-amber-500" : "text-emerald-500"}`} />
                      <span className="text-[10px] text-gray-400 ml-auto font-semibold">{item.time}</span>
                    </div>
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-snug font-semibold group-hover:text-blue-500 transition-colors">{item.news}</p>
                    {/* Share row */}
                    <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="text-[9px] font-bold text-blue-500 hover:underline flex items-center gap-0.5">🔗 LinkedIn</button>
                      <span className="text-gray-300">·</span>
                      <button className="text-[9px] font-bold text-sky-500 hover:underline flex items-center gap-0.5">𝕏 Twitter</button>
                      <span className="text-gray-300">·</span>
                      <button className="text-[9px] font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:underline">📋 Copy Link</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRENDING COMPANIES (Horizontal Strip Rankings) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-gray-100 dark:border-gray-855 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              <h3 className="font-display text-sm md:text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">Trending Companies</h3>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/eoi" className="text-xs font-bold text-blue-500 hover:underline uppercase flex items-center gap-1">
                View Full List <ChevronRight className="h-3 w-3" />
              </Link>
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-gray-100 dark:divide-gray-800">
            {TRENDING_COMPANIES.map((comp, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 hover:bg-gray-55 dark:hover:bg-gray-955 transition-colors group cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="font-display text-xl md:text-2xl font-extrabold text-gray-200 dark:text-gray-800 w-8 text-center">{idx + 1}</span>
                  <div>
                    <span className="font-bold text-xs md:text-sm text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors block leading-tight">{comp.name}</span>
                    <span className="text-[10px] text-gray-450 mt-0.5 block">{comp.sector}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-xs md:text-sm text-gray-900 dark:text-white block">{comp.views}</span>
                  <span className="text-[10px] font-bold text-emerald-500">{comp.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY OF THE WEEK ── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="relative bg-gradient-to-r from-[#0c1931] via-[#0f2444] to-[#162d54] text-white rounded-3xl border border-slate-800 overflow-hidden shadow-lg">
          {/* Background image overlay */}
          <div
            className="absolute inset-0 z-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=60)` }}
          />
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />

          <div className="relative z-10 p-6 md:p-8 flex flex-col lg:flex-row justify-between gap-8 items-start">
            {/* Left — editorial */}
            <div className="space-y-4 max-w-2xl flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-500 text-gray-950 text-[8px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-widest">📅 Company of the Week</span>
                <span className="text-slate-400 text-[10px] font-semibold">Week of Aug 5 – 11, 2026</span>
                <span className="text-[9px] text-slate-500 border border-slate-700 px-2 py-0.5 rounded-full">Editorial Pick</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-900 to-slate-800 border border-white/20 flex items-center justify-center font-display text-base font-extrabold text-white shrink-0">RI</div>
                <div>
                  <h2 className="font-display text-xl md:text-2xl lg:text-3xl font-bold leading-tight">Reliance Industries</h2>
                  <p className="text-slate-400 text-xs mt-0.5">Conglomerate · India · Fortune 500</p>
                </div>
              </div>
              <p className="text-slate-300 text-sm font-normal leading-relaxed">
                <span className="text-amber-400 font-bold">Why in focus this week:</span> Jio Financial Services finalises its landmark joint venture with BlackRock, Reliance Retail crosses ₹3 lakh crore GMV, and the group signals a major green hydrogen push — making it the most-covered conglomerate across IGE this week.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="bg-blue-950/50 text-blue-400 border border-blue-900 text-[9px] font-bold px-2.5 py-1 rounded-full">📈 Stock +2.1% this week</span>
                <span className="bg-emerald-950/50 text-emerald-400 border border-emerald-900 text-[9px] font-bold px-2.5 py-1 rounded-full">🏭 3 Major Announcements</span>
                <span className="bg-purple-950/50 text-purple-400 border border-purple-900 text-[9px] font-bold px-2.5 py-1 rounded-full">🌍 12 Sectors Impacted</span>
              </div>
              <div className="flex gap-3 pt-1">
                <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-lg transition-all flex items-center gap-1.5">
                  Read Full Coverage <ChevronRight className="h-3.5 w-3.5" />
                </Link>
                <Link href="/eoi" className="border border-white/20 text-white hover:bg-white/10 font-bold text-xs px-4 py-2.5 rounded-lg transition-all">
                  Previous Picks →
                </Link>
              </div>
            </div>

            {/* Right — key metrics */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {[
                { label: "Annual Revenue", val: "$104B+", icon: BarChart2, color: "text-amber-400" },
                { label: "Employees", val: "2,36,000+", icon: Users, color: "text-emerald-400" },
                { label: "Countries", val: "50+", icon: Globe, color: "text-blue-400" },
                { label: "News this week", val: "38 Articles", icon: TrendingUp, color: "text-purple-400" }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                    <Icon className={`h-4 w-4 mx-auto mb-1.5 ${stat.color}`} />
                    <div className="font-bold text-white text-sm">{stat.val}</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPANY SPOTLIGHT ── */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="bg-gradient-to-r from-[#0c1931] to-[#162d54] text-white p-6 md:p-8 rounded-3xl border border-slate-800 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 items-start">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" />
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Company Spotlight</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">
                Reliance Industries — Powering Tomorrow's Global Trade
              </h2>
              <p className="text-slate-300 text-sm font-normal leading-relaxed">
                From petrochemicals to Jio's digital backbone, Reliance Industries' $104B+ portfolio is reshaping India's export story and global trade significance across 50+ countries.
              </p>
              <div className="flex gap-3">
                <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-lg transition-all">
                  View Full Profile
                </Link>
                <button className="border border-white/20 text-white hover:bg-white/10 font-bold text-xs px-5 py-2.5 rounded-lg transition-all">
                  Contact Company
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4 shrink-0">
              {[
                { label: "Annual Revenue", val: "$104B+", icon: BarChart2, color: "text-amber-400" },
                { label: "Employees", val: "2,36,000+", icon: Users, color: "text-emerald-400" },
                { label: "Countries", val: "50+", icon: Globe, color: "text-blue-400" },
                { label: "Sectors", val: "12 Verticals", icon: Briefcase, color: "text-purple-400" }
              ].map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-xl text-center">
                    <Icon className={`h-5 w-5 mx-auto mb-1.5 ${stat.color}`} />
                    <div className="font-bold text-white text-sm">{stat.val}</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />

      {/* ── FEATURED COMPANIES (with tier filter and slide controls) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">Featured Companies</h2>
            <p className="text-xs text-gray-500 mt-0.5">Trusted businesses building their presence on IGEN</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
              {(["all", "enterprise", "verified", "registered"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-all capitalize ${
                    activeTab === tab ? "bg-white dark:bg-gray-800 text-blue-600 shadow-xs" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab === "all" ? "All Tiers" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Slide Navigation Buttons */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => scroll("left")} 
                className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <button 
                onClick={() => scroll("right")} 
                className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filtered.map((company, idx) => {
            const badge = badgeConfig[company.badge];
            const BadgeIcon = badge.icon;
            return (
              <div 
                key={idx} 
                className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 snap-start bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group"
              >
                {/* Card header gradient */}
                <div className={`h-20 bg-gradient-to-r ${company.color} relative flex items-center px-5`}>
                  <div className="h-14 w-14 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center font-display text-xl font-extrabold text-white shadow-sm">
                    {company.logo}
                  </div>
                  {/* Tier badge */}
                  <div className={`absolute top-3 right-3 bg-gradient-to-r ${badge.color} text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1`}>
                    <BadgeIcon className="h-2.5 w-2.5" />
                    {badge.label}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-bold text-sm text-gray-950 dark:text-white group-hover:text-blue-500 transition-colors">{company.name}</h3>
                    <div className="flex items-center gap-2 text-[9px] text-gray-450 font-semibold mt-0.5">
                      <span className="flex items-center gap-0.5"><Briefcase className="h-2.5 w-2.5" /> {company.sector}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5"><MapPin className="h-2.5 w-2.5" /> {company.country}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal line-clamp-2">{company.desc}</p>

                  {/* Mini stats */}
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-50 dark:border-gray-855">
                    <div className="text-center">
                      <span className="font-bold text-[10px] text-gray-950 dark:text-white block">{company.employees}</span>
                      <span className="text-[8px] text-gray-450 block">Employees</span>
                    </div>
                    <div className="text-center border-x border-gray-100 dark:border-gray-855">
                      <span className="font-bold text-[10px] text-gray-950 dark:text-white block">{company.revenue}</span>
                      <span className="text-[8px] text-gray-455 block">Revenue</span>
                    </div>
                    <div className="text-center">
                      <span className="font-bold text-[10px] text-emerald-500 block">{company.followers}</span>
                      <span className="text-[8px] text-gray-455 block">Followers</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href="/eoi" className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] py-2 rounded-lg transition-colors">
                      View Profile
                    </Link>
                    <button className="flex-1 text-center border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold text-[10px] py-2 rounded-lg hover:bg-gray-50 transition-colors">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <Link href="/eoi" className="text-blue-500 font-bold text-xs hover:underline flex items-center gap-1 justify-center">
            View All Companies <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* ── BROWSE BY INDUSTRY ── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">Browse by Industry</h2>
            <p className="text-xs text-gray-500 mt-0.5">Quick access to sector-wise company news</p>
          </div>
          <Link href="/eoi" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View All Sectors</Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {SECTORS.map((sector, idx) => (
            <Link key={idx} href="/eoi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl hover:shadow-sm hover:border-blue-300 dark:hover:border-blue-800 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl">{sector.icon}</span>
                {sector.trending && (
                  <span className="bg-red-50 text-red-500 text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                    <TrendingUp className="h-2 w-2" /> HOT
                  </span>
                )}
              </div>
              <h4 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors leading-tight">{sector.name}</h4>
              <span className="text-[10px] text-gray-450 block mt-1">{sector.count} companies</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Upgrade Journey banner removed — consolidated into newsletter strip below */}

      {/* ── NEWSLETTER ── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-gray-950 dark:text-white">Company News Weekly Digest</h4>
            <p className="text-xs text-gray-500 font-normal">Top company announcements and market moves — delivered to 50K+ professionals every week.</p>
          </div>
          {subscribed ? (
            <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-emerald-800 dark:text-emerald-300 px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Subscribed!
            </div>
          ) : (
            <div className="flex gap-2 shrink-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="work@company.com"
                className="px-4 py-2 text-xs rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-955 outline-none focus:border-blue-500"
              />
              <button
                onClick={() => { if (email) setSubscribed(true); }}
                className="bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold text-xs px-5 py-2 rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}

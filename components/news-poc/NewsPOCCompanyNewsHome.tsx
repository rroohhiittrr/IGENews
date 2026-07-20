"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Building2, Search, CheckCircle, Star, Globe, TrendingUp,
  ArrowUpRight, Users, Award, Briefcase, Shield, ChevronRight,
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

const TIER_FEATURES = [
  { feature: "Company Profile", free: "Basic", verified: "Enhanced", enterprise: "Premium" },
  { feature: "News Publishing", free: "Limited (5/mo)", verified: "Unlimited", enterprise: "Unlimited + Sponsored" },
  { feature: "Verification Badge", free: false, verified: true, enterprise: true },
  { feature: "Featured Placement", free: false, verified: "Limited", enterprise: "Homepage Priority" },
  { feature: "Search Ranking", free: "Standard", verified: "Higher", enterprise: "Top Priority" },
  { feature: "Analytics", free: false, verified: "Basic", enterprise: "Advanced + CRM" },
  { feature: "Lead Generation", free: "Basic Form", verified: "Advanced Form", enterprise: "CRM Integration" },
  { feature: "Media Gallery", free: "Limited", verified: "Full Gallery", enterprise: "Premium Gallery + Video" },
  { feature: "Press Kit", free: false, verified: "Basic", enterprise: "Advanced + Downloads" },
  { feature: "Dedicated Support", free: false, verified: "Email", enterprise: "Account Manager" },
];

export default function NewsPOCCompanyNewsHome() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "enterprise" | "verified" | "registered">("all");

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

      {/* ── HERO BANNER ── */}
      <section className="bg-gradient-to-br from-[#0c1931] via-[#0f2444] to-[#0a1628] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1400&auto=format&fit=crop&q=60')] bg-cover opacity-5" />
        
        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 lg:px-6">
          <div className="text-center space-y-4 mb-10">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Building2 className="h-6 w-6 text-amber-400" />
              <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">Company News</h1>
              <span className="bg-amber-400 text-gray-950 text-[10px] font-extrabold px-2 py-0.5 rounded-full ml-1">$</span>
            </div>
            <p className="text-slate-300 text-sm md:text-base font-normal max-w-2xl mx-auto leading-relaxed">
              Discover, connect and grow with verified companies across every industry. Build your digital presence and generate quality leads.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search companies, sectors, countries..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm text-white placeholder:text-slate-400 text-sm outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <button className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-6 py-3 rounded-xl transition-all text-sm">
                Search
              </button>
            </div>
            {/* Quick filter chips */}
            <div className="flex flex-wrap gap-2 mt-3 justify-center">
              {["All Sectors", "India", "APAC", "Manufacturing", "Technology", "Energy"].map((chip) => (
                <button key={chip} className="bg-white/10 hover:bg-white/20 border border-white/15 text-white text-[10px] font-bold px-3 py-1 rounded-full transition-all">
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* 3 CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/eoi" className="bg-white text-gray-950 hover:bg-gray-100 font-bold text-sm px-6 py-3 rounded-xl transition-all flex items-center gap-2 justify-center">
              <Building2 className="h-4 w-4" /> Register Company
            </Link>
            <Link href="/eoi" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all flex items-center gap-2 justify-center">
              <CheckCircle className="h-4 w-4" /> Verify Company (Pro)
            </Link>
            <Link href="/eoi" className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-gray-950 font-bold text-sm px-6 py-3 rounded-xl transition-all flex items-center gap-2 justify-center">
              <Crown className="h-4 w-4" /> Upgrade to Enterprise
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="bg-white/5 border-t border-white/10 py-4">
          <div className="mx-auto max-w-7xl px-4 lg:px-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { val: "12,400+", label: "Registered Companies" },
              { val: "3,200+", label: "Verified Companies" },
              { val: "420+", label: "Enterprise Corporates" },
              { val: "50", label: "Industry Sectors" }
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="font-display text-xl font-bold text-amber-400">{stat.val}</div>
                <div className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIER NAVIGATION (3 columns) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              tier: "registered",
              icon: Building2,
              title: "Registered Companies",
              subtitle: "FREE · Basic Visibility",
              color: "border-blue-500 bg-blue-50/50 dark:bg-blue-950/10",
              headerColor: "bg-blue-600",
              badge: "Free",
              badgeColor: "bg-blue-100 text-blue-700",
              best: "Best for: New Businesses, Startups, Small Companies",
              subMenus: ["Company Pages", "Company News", "By Sector", "All Sector"],
              subMenuSlugs: ["registered/pages", "registered/news", "registered/sector", "registered/all"]
            },
            {
              tier: "verified",
              icon: CheckCircle,
              title: "Verified Companies",
              subtitle: "PRO · More Visibility",
              color: "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/10",
              headerColor: "bg-emerald-600",
              badge: "Pro",
              badgeColor: "bg-emerald-100 text-emerald-700",
              best: "Best for: Growing Businesses, SME, Brand Builders",
              subMenus: ["Company Pages", "Company News", "By Sector", "All Sector"],
              subMenuSlugs: ["verified/pages", "verified/news", "verified/sector", "verified/all"]
            },
            {
              tier: "top",
              icon: Crown,
              title: "Top Companies",
              subtitle: "ENTERPRISE · Maximum Visibility",
              color: "border-amber-500 bg-amber-50/50 dark:bg-amber-950/10",
              headerColor: "bg-gradient-to-r from-amber-500 to-orange-600",
              badge: "Enterprise",
              badgeColor: "bg-amber-100 text-amber-700",
              best: "Best for: Large Enterprises, Corporates, Industry Leaders",
              subMenus: ["Company Pages", "Company News", "By Sector", "All Sector"],
              subMenuSlugs: ["top/pages", "top/news", "top/sector", "top/all"]
            }
          ].map((tier) => {
            const Icon = tier.icon;
            return (
              <div key={tier.tier} className={`border-2 ${tier.color} rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all`}>
                <div className={`${tier.headerColor} text-white p-4 flex items-center gap-3`}>
                  <Icon className="h-5 w-5 shrink-0" />
                  <div>
                    <h3 className="font-bold text-sm">{tier.title}</h3>
                    <p className="text-[10px] font-semibold opacity-85">{tier.subtitle}</p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-[10px] text-gray-500 italic">{tier.best}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {tier.subMenus.map((sub, idx) => (
                      <Link
                        key={sub}
                        href={`/en/news-poc/company-news/${tier.subMenuSlugs[idx]}`}
                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2.5 rounded-lg text-center hover:border-blue-300 hover:shadow-xs transition-all group"
                      >
                        <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors block">{sub}</span>
                        <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-500 mx-auto mt-1" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FEATURED COMPANIES (with tier filter) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
          <div>
            <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">Featured Companies</h2>
            <p className="text-xs text-gray-500 mt-0.5">Trusted businesses building their presence on IGEN</p>
          </div>
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((company, idx) => {
            const badge = badgeConfig[company.badge];
            const BadgeIcon = badge.icon;
            return (
              <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group">
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
                  <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-50 dark:border-gray-850">
                    <div className="text-center">
                      <span className="font-bold text-[10px] text-gray-950 dark:text-white block">{company.employees}</span>
                      <span className="text-[8px] text-gray-450 block">Employees</span>
                    </div>
                    <div className="text-center border-x border-gray-100 dark:border-gray-850">
                      <span className="font-bold text-[10px] text-gray-950 dark:text-white block">{company.revenue}</span>
                      <span className="text-[8px] text-gray-450 block">Revenue</span>
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

      {/* ── COMPANY SPOTLIGHT (High-Yield Module) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="bg-gradient-to-r from-[#0c1931] to-[#162d54] text-white p-8 rounded-3xl border border-slate-800 relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/5 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-8 items-start">
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2">
                <Crown className="h-5 w-5 text-amber-400" />
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Company Spotlight · Enterprise Module</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">
                Reliance Industries — Powering Tomorrow's Global Trade
              </h2>
              <p className="text-slate-300 text-sm font-normal leading-relaxed">
                From petrochemicals to Jio's digital backbone, Reliance Industries' $104B+ portfolio is reshaping India's export story and global trade significance.
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
                    <div className="text-[9px] text-slate-450 mt-0.5">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRENDING COMPANIES + LATEST NEWS (2-col) ── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Trending Companies */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-gray-100 dark:border-gray-850 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-red-500" />
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">Trending Companies</h3>
              </div>
              <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-850">
              {TRENDING_COMPANIES.map((comp, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg font-extrabold text-gray-200 dark:text-gray-800 w-6 text-center">{idx + 1}</span>
                    <div>
                      <span className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors block">{comp.name}</span>
                      <span className="text-[9px] text-gray-450">{comp.sector}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xs text-gray-900 dark:text-white block">{comp.views}</span>
                    <span className="text-[9px] font-bold text-emerald-500">{comp.change}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-850">
              <Link href="/eoi" className="text-blue-500 font-bold text-[10px] hover:underline uppercase flex items-center gap-1 justify-center">
                View Full Rankings <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          {/* Latest Company News */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-gray-100 dark:border-gray-850 flex items-center justify-between">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Latest Company News</h3>
              <Link href="/eoi" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View All</Link>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-850">
              {[
                { company: "Tata Steel", news: "Signs 5-year green steel supply agreement with European automotive giant Volkswagen.", time: "2 hrs ago", badge: "enterprise" },
                { company: "Mahindra Logistics", news: "Launches AI-powered warehouse automation suite across 12 distribution centres in Q3.", time: "5 hrs ago", badge: "verified" },
                { company: "Adani Green", news: "Breaks world record with 20 GW solar capacity milestone — fastest in global energy history.", time: "8 hrs ago", badge: "enterprise" },
                { company: "Infosys BPM", news: "Announces expansion of digital trade finance operations across ASEAN markets.", time: "1 day ago", badge: "verified" }
              ].map((item, idx) => {
                const badge = badgeConfig[item.badge];
                const BadgeIcon = badge.icon;
                return (
                  <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-bold text-[10px] text-gray-900 dark:text-white">{item.company}</span>
                      <BadgeIcon className={`h-3 w-3 ${item.badge === "enterprise" ? "text-amber-500" : "text-emerald-500"}`} />
                    </div>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-snug font-normal group-hover:text-blue-500 transition-colors">{item.news}</p>
                    <span className="text-[9px] text-gray-400 font-semibold mt-1 block">{item.time}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUBSCRIPTION TIER FEATURE MATRIX ── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="space-y-4">
          <div className="text-center space-y-1">
            <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">Subscription Tier Features</h2>
            <p className="text-xs text-gray-500">Compare what's included at each tier</p>
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            {/* Header row */}
            <div className="grid grid-cols-4 bg-gray-50 dark:bg-gray-955 border-b border-gray-200 dark:border-gray-800 text-xs font-bold">
              <div className="p-4 text-gray-500">Feature</div>
              <div className="p-4 text-center text-blue-600 border-l border-gray-200 dark:border-gray-800">
                <Building2 className="h-4 w-4 mx-auto mb-1" />
                Free (Registered)
              </div>
              <div className="p-4 text-center text-emerald-600 border-l border-gray-200 dark:border-gray-800">
                <CheckCircle className="h-4 w-4 mx-auto mb-1" />
                Verified (Pro)
              </div>
              <div className="p-4 text-center text-amber-600 border-l border-gray-200 dark:border-gray-800">
                <Crown className="h-4 w-4 mx-auto mb-1" />
                Enterprise
              </div>
            </div>

            {/* Feature rows */}
            {TIER_FEATURES.map((row, idx) => (
              <div key={idx} className={`grid grid-cols-4 border-b border-gray-50 dark:border-gray-850 last:border-0 text-xs ${idx % 2 === 0 ? "" : "bg-gray-50/50 dark:bg-gray-955/30"}`}>
                <div className="p-3.5 font-semibold text-gray-700 dark:text-gray-300">{row.feature}</div>
                {[row.free, row.verified, row.enterprise].map((val, vIdx) => (
                  <div key={vIdx} className="p-3.5 text-center border-l border-gray-50 dark:border-gray-850">
                    {val === true ? (
                      <CheckCircle className="h-4 w-4 text-emerald-500 mx-auto" />
                    ) : val === false ? (
                      <span className="text-red-400 font-bold text-base leading-none">✕</span>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-400 font-semibold">{val}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPGRADE JOURNEY BANNER ── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="bg-gradient-to-br from-slate-950 to-[#0f172a] text-white border border-slate-900 p-8 rounded-3xl shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=50')] bg-cover opacity-5" />

          <div className="relative z-10 text-center space-y-6">
            <div className="space-y-2">
              <span className="bg-amber-400/15 text-amber-400 border border-amber-400/20 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                Upgrade Journey
              </span>
              <h2 className="font-display text-2xl font-bold">Build. Verify. Grow.</h2>
              <p className="text-slate-400 text-sm font-normal max-w-xl mx-auto">Join India's leading global trade business network. Unlock more visibility, more trust, more business.</p>
            </div>

            {/* Journey steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {[
                { step: 1, tier: "Registered (Free)", color: "border-blue-700 bg-blue-950/30", badge: "FREE", perks: ["Create Online Profile", "Publish Limited News", "Basic Visibility"] },
                { step: 2, tier: "Verified (Pro)", color: "border-emerald-700 bg-emerald-950/30", badge: "PRO", perks: ["Verified Badge", "Unlimited News", "Better Search Ranking"] },
                { step: 3, tier: "Enterprise (Top Co.)", color: "border-amber-600 bg-amber-950/20", badge: "ENTERPRISE", perks: ["Premium Branding", "Sponsored News", "Maximum Leads + CRM"] }
              ].map((s, idx) => (
                <div key={idx} className={`border ${s.color} p-5 rounded-xl text-left space-y-3 relative`}>
                  <span className="absolute -top-2.5 left-4 bg-white text-gray-950 text-[8px] font-extrabold px-2 py-0.5 rounded-full">{s.badge}</span>
                  <h4 className="font-bold text-sm text-white pt-1">{s.tier}</h4>
                  <ul className="space-y-1.5">
                    {s.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                        <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-sm px-8 py-3 rounded-xl transition-all">
                Register Your Company Now
              </Link>
              <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all">
                View Pricing Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

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
                className="bg-[#1E3A5F] hover:bg-[#152e4f] text-white font-bold text-xs px-5 py-2 rounded-lg transition-colors"
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

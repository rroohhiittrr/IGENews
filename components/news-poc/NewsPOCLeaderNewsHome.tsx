"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  User, Search, CheckCircle, Crown, Star, Globe, TrendingUp,
  ChevronRight, ArrowUpRight, Bookmark, Share2, Eye, Award,
  Sparkles, Lock, Mic, BarChart2, Users, Zap, Trophy,
  MessageSquare, Bell, Filter, Play, ChevronLeft, Target,
  MapPin, Briefcase, Shield, Activity
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const FEATURED_LEADERS = [
  {
    id: "fl-1",
    name: "Gautam Adani",
    role: "Chairman",
    company: "Adani Group",
    logo: "AG",
    logoColor: "from-blue-600 to-indigo-700",
    category: "Business Expansion",
    headline: "Gautam Adani Unveils $15B Infrastructure Investment Plan",
    excerpt: "Adani Group to invest in ports, energy and green infrastructure across 12 Indian states, creating 200,000 jobs.",
    date: "May 20, 2025",
    readTime: "5 min",
    tier: "enterprise",
    influence: 98.7,
    followers: "125K"
  },
  {
    id: "fl-2",
    name: "Mukesh Ambani",
    role: "Chairman",
    company: "Reliance Industries",
    logo: "RI",
    logoColor: "from-purple-600 to-violet-700",
    category: "Corporate Update",
    headline: "Mukesh Ambani Highlights Jio's AI-First Strategy for 2025",
    excerpt: "Reliance Jio partners with global AI leaders to accelerate innovation and deploy generative AI for 500M users.",
    date: "May 19, 2025",
    readTime: "4 min",
    tier: "enterprise",
    influence: 98.2,
    followers: "210K"
  },
  {
    id: "fl-3",
    name: "Satya Nadella",
    role: "CEO",
    company: "Microsoft",
    logo: "MS",
    logoColor: "from-teal-500 to-cyan-600",
    category: "Interview",
    headline: "Satya Nadella on the Future of AI and Responsible Innovation",
    excerpt: "Microsoft CEO shares his vision on AI ethics, future of work, and how enterprise software will be reinvented globally.",
    date: "May 18, 2025",
    readTime: "6 min",
    tier: "verified",
    influence: 97.5,
    followers: "185K"
  },
  {
    id: "fl-4",
    name: "Indra Nooyi",
    role: "Former CEO",
    company: "PepsiCo",
    logo: "PC",
    logoColor: "from-rose-500 to-pink-600",
    category: "Achievement",
    headline: "Indra Nooyi Receives Lifetime Achievement Award 2025",
    excerpt: "Recognizing her outstanding contribution to global business and her transformational 12-year tenure as PepsiCo CEO.",
    date: "May 17, 2025",
    readTime: "3 min",
    tier: "verified",
    influence: 95.1,
    followers: "98K"
  }
];

const LATEST_NEWS = [
  { id: "ln-1", leader: "N Chandrasekaran", role: "Chairman, Tata Group", sector: "Technology", time: "2 hrs ago", views: "1.2K", headline: "N Chandrasekaran Appointed Chairman of New Tata Initiative for Global Expansion" },
  { id: "ln-2", leader: "Kiran Mazumdar-Shaw", role: "Founder, Biocon", sector: "Healthcare", time: "3 hrs ago", views: "987", headline: "Kiran Mazumdar-Shaw on Building Innovation-Driven Organizations in Pharma" },
  { id: "ln-3", leader: "Ratan Tata", role: "Trustee, Tata Trusts", sector: "Investment", time: "4 hrs ago", views: "1.5K", headline: "Ratan Tata Trusts Invest in 100 Startups Across India to Boost Deep-Tech" },
  { id: "ln-4", leader: "Sundar Pichai", role: "CEO, Google", sector: "Technology", time: "5 hrs ago", views: "2.3K", headline: "Sundar Pichai Discusses Google's AI Roadmap for 2025 and Global Cloud Push" },
  { id: "ln-5", leader: "Nirmala Sitharaman", role: "Finance Minister, India", sector: "Policy", time: "6 hrs ago", views: "1.8K", headline: "Finance Minister Previews Union Budget 2025-26 Infrastructure Priorities" },
  { id: "ln-6", leader: "Arvind Krishna", role: "CEO, IBM", sector: "Technology", time: "8 hrs ago", views: "1.1K", headline: "Arvind Krishna Signals IBM's Hybrid Cloud Expansion Strategy for APAC" }
];

const SPOTLIGHT_LEADERS = [
  { name: "Gautam Adani", role: "Chairman", company: "Adani Group", initial: "GA", color: "from-blue-600 to-indigo-700", influence: 98.7, followers: "125K", verified: true, tier: "enterprise" },
  { name: "Mukesh Ambani", role: "Chairman", company: "Reliance Ind.", initial: "MA", color: "from-purple-600 to-violet-700", influence: 98.2, followers: "210K", verified: true, tier: "enterprise" },
  { name: "Satya Nadella", role: "CEO", company: "Microsoft", initial: "SN", color: "from-teal-500 to-cyan-600", influence: 97.5, followers: "185K", verified: true, tier: "verified" },
  { name: "Sundar Pichai", role: "CEO", company: "Google", initial: "SP", color: "from-amber-500 to-orange-600", influence: 96.8, followers: "162K", verified: true, tier: "verified" },
  { name: "Kiran Mazumdar-Shaw", role: "Founder", company: "Biocon", initial: "KM", color: "from-rose-500 to-pink-600", influence: 95.1, followers: "98K", verified: true, tier: "verified" }
];

const INTELLIGENCE_MODULES = [
  { title: "Top Leaders Reports", desc: "Weekly / Monthly Top Leader Reports", icon: Trophy, locked: false, badge: "Free" },
  { title: "Executive Rankings", desc: "Global & Sector-wise Rankings", icon: BarChart2, locked: true, badge: "Pro" },
  { title: "AI Leadership Insights", desc: "AI-powered Leadership Intelligence", icon: Sparkles, locked: true, badge: "Pro" },
  { title: "Live Discussions", desc: "Join Live Panels, Webinars & AMAs", icon: MessageSquare, locked: false, badge: "Free" },
  { title: "Leadership Analytics", desc: "Influence Metrics, Comparisons", icon: Activity, locked: true, badge: "Enterprise" },
  { title: "Saved Alerts", desc: "Custom Alerts & Notifications", icon: Bell, locked: true, badge: "Pro" }
];

const INDUSTRIES = [
  { name: "Technology", icon: "💻", count: "2,400 leaders" },
  { name: "Healthcare", icon: "🏥", count: "1,840 leaders" },
  { name: "Manufacturing", icon: "⚙️", count: "1,620 leaders" },
  { name: "Finance", icon: "🏦", count: "2,100 leaders" },
  { name: "Energy", icon: "⚡", count: "980 leaders" },
  { name: "Logistics", icon: "🚢", count: "750 leaders" },
  { name: "Retail", icon: "🛒", count: "1,200 leaders" },
  { name: "Agriculture", icon: "🌾", count: "640 leaders" },
  { name: "Real Estate", icon: "🏢", count: "920 leaders" },
  { name: "Automotive", icon: "🚗", count: "870 leaders" }
];

const TOP_LEADERS = [
  { rank: 1, name: "Gautam Adani", company: "Adani Group", score: 98.7, initial: "GA", color: "from-blue-600 to-indigo-700" },
  { rank: 2, name: "Mukesh Ambani", company: "Reliance Industries", score: 98.2, initial: "MA", color: "from-purple-600 to-violet-700" },
  { rank: 3, name: "Satya Nadella", company: "Microsoft", score: 97.5, initial: "SN", color: "from-teal-500 to-cyan-600" },
  { rank: 4, name: "Sundar Pichai", company: "Google", score: 96.8, initial: "SP", color: "from-amber-500 to-orange-600" },
  { rank: 5, name: "Kiran Mazumdar-Shaw", company: "Biocon", score: 95.1, initial: "KM", color: "from-rose-500 to-pink-600" }
];

const SECTOR_LEADERS = [
  { rank: 1, name: "Satya Nadella", company: "Microsoft", score: 97.5, initial: "SN", color: "from-teal-500 to-cyan-600" },
  { rank: 2, name: "Sundar Pichai", company: "Google", score: 96.8, initial: "SP", color: "from-amber-500 to-orange-600" },
  { rank: 3, name: "Shantanu Narayen", company: "Adobe", score: 93.2, initial: "SHN", color: "from-red-500 to-rose-600" },
  { rank: 4, name: "Arvind Krishna", company: "IBM", score: 92.1, initial: "AK", color: "from-blue-800 to-slate-700" },
  { rank: 5, name: "Nikesh Arora", company: "Palo Alto Networks", score: 91.0, initial: "NA", color: "from-indigo-500 to-blue-600" }
];

const MOST_READ = [
  { headline: "Satya Nadella on the Future of AI", views: "2.3K" },
  { headline: "Mukesh Ambani Highlights Jio's AI Strategy", views: "1.9K" },
  { headline: "Gautam Adani Unveils $15B Plan", views: "1.6K" },
  { headline: "Ratan Tata Trusts Invest in Startups", views: "1.6K" },
  { headline: "Indra Nooyi Receives Award 2024", views: "1.3K" }
];

const NEWS_TABS = ["Latest", "Trending", "Most Read", "Interviews", "Appointments"];

const TIER_BADGE: Record<string, { label: string; bg: string; text: string }> = {
  enterprise: { label: "Enterprise", bg: "bg-gradient-to-r from-amber-400 to-orange-500", text: "text-gray-950" },
  verified: { label: "Verified", bg: "bg-emerald-500", text: "text-white" },
  registered: { label: "Free", bg: "bg-blue-500", text: "text-white" }
};

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function NewsPOCLeaderNewsHome() {
  const [activeNewsTab, setActiveNewsTab] = useState("Latest");
  const [activeSectorTab, setActiveSectorTab] = useState("Technology");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [carouselIdx, setCarouselIdx] = useState(0);

  // Auto-advance featured carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCarouselIdx((prev) => (prev + 1) % FEATURED_LEADERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const tierPath = "/en/news-poc/leader-news";

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO BANNER — Discovery & Conversion
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-[#0c1931] via-[#12224a] to-[#0a1628] text-white overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
        {/* Glow blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-600/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-12 pb-10 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">
            <div className="flex-1 space-y-6 max-w-2xl">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Leadership Intelligence Hub</span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Leader News
              </h1>
              <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed max-w-lg">
                Discover leadership updates, achievements and insights from top executives, founders and innovators across every industry.
              </p>

              {/* Search bar */}
              <div className="flex gap-2 max-w-xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search leaders, companies, industries..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm outline-none focus:border-purple-400 transition-colors"
                  />
                </div>
                <select className="bg-white/10 border border-white/20 text-white rounded-xl px-3 py-3 text-xs outline-none">
                  <option>All Sectors</option>
                  <option>Technology</option>
                  <option>Energy</option>
                  <option>Finance</option>
                </select>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-5 py-3 rounded-xl transition-all text-sm shrink-0">
                  Search
                </button>
              </div>

              {/* 4 CTA buttons */}
              <div className="flex flex-wrap gap-3">
                <Link href={`${tierPath}/registered/news`} className="bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all">
                  <User className="h-3.5 w-3.5" /> Register as Leader (Free)
                </Link>
                <Link href={`${tierPath}/verified/news`} className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all">
                  <CheckCircle className="h-3.5 w-3.5" /> Get Verified (Pro)
                </Link>
                <Link href={`${tierPath}/top/news`} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all">
                  <Crown className="h-3.5 w-3.5" /> Go Enterprise
                </Link>
                <Link href="/eoi" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all">
                  <Mic className="h-3.5 w-3.5" /> Post Leadership News
                </Link>
              </div>
            </div>

            {/* Hero stats panel */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {[
                { val: "42,000+", label: "Registered Leaders", icon: User, color: "text-blue-400" },
                { val: "8,200+", label: "Verified Leaders", icon: CheckCircle, color: "text-emerald-400" },
                { val: "1,200+", label: "Enterprise Leaders", icon: Crown, color: "text-amber-400" },
                { val: "50+", label: "Industry Sectors", icon: Globe, color: "text-purple-400" }
              ].map((s, idx) => {
                const SIcon = s.icon;
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-1.5">
                    <SIcon className={`h-5 w-5 mx-auto ${s.color}`} />
                    <div className={`font-display text-xl font-bold ${s.color}`}>{s.val}</div>
                    <div className="text-slate-400 text-[9px] font-semibold uppercase tracking-wider">{s.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tier navigation strip */}
        <div className="relative z-10 border-t border-white/10 bg-white/5">
          <div className="mx-auto max-w-7xl px-4 lg:px-6 py-3 flex flex-wrap gap-2 items-center justify-between">
            <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Navigate by Tier:</span>
            <div className="flex gap-2 flex-wrap">
              {[
                { tier: "registered", label: "Registered Leaders (Free)", icon: User, color: "bg-blue-600" },
                { tier: "verified", label: "Verified Leaders (Pro)", icon: CheckCircle, color: "bg-emerald-600" },
                { tier: "top", label: "Top Leaders (Enterprise)", icon: Crown, color: "bg-gradient-to-r from-amber-500 to-orange-600" }
              ].map((t) => {
                const TIcon = t.icon;
                return (
                  <Link key={t.tier} href={`${tierPath}/${t.tier}/news`} className={`${t.color} text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:opacity-90 transition-all`}>
                    <TIcon className="h-3 w-3" /> {t.label}
                    <ChevronRight className="h-3 w-3 opacity-60" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          2. FEATURED LEADER NEWS — Enterprise Spotlight Carousel
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-lg font-bold text-gray-900 dark:text-white uppercase tracking-tight">Featured Leader News</h2>
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-gray-950 text-[8px] font-bold px-2 py-0.5 rounded-full">Enterprise Spotlight</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCarouselIdx((prev) => (prev - 1 + FEATURED_LEADERS.length) % FEATURED_LEADERS.length)} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 transition-colors">
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => setCarouselIdx((prev) => (prev + 1) % FEATURED_LEADERS.length)} className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 transition-colors">
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <Link href="/eoi" className="text-[10px] font-bold text-blue-500 hover:underline uppercase ml-2">View All</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURED_LEADERS.map((leader, idx) => {
            const badge = TIER_BADGE[leader.tier];
            const isActive = idx === carouselIdx;
            return (
              <div key={leader.id} className={`bg-white dark:bg-[#0f172a] border rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all group cursor-pointer ${isActive ? "border-purple-300 dark:border-purple-800 shadow-sm" : "border-gray-200 dark:border-gray-800"}`}>
                {/* Leader image placeholder */}
                <div className={`h-32 bg-gradient-to-br ${leader.logoColor} relative flex items-center justify-center`}>
                  <div className="h-16 w-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center font-display text-xl font-bold text-white">
                    {leader.logo}
                  </div>
                  <div className={`absolute top-2 left-2 ${badge.bg} ${badge.text} text-[7px] font-bold px-1.5 py-0.5 rounded`}>
                    {badge.label}
                  </div>
                  <div className="absolute top-2 right-2 bg-black/30 text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                    {leader.category}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div>
                    <span className="font-bold text-[10px] text-gray-900 dark:text-white block">{leader.name}</span>
                    <span className="text-[9px] text-gray-450">{leader.role} · {leader.company}</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-950 dark:text-white leading-snug group-hover:text-purple-500 transition-colors">{leader.headline}</h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-normal line-clamp-2">{leader.excerpt}</p>
                  <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1 border-t border-gray-50 dark:border-gray-850">
                    <span>{leader.date} · {leader.readTime}</span>
                    <div className="flex gap-1.5">
                      <button className="hover:text-purple-500 transition-colors"><Bookmark className="h-3 w-3" /></button>
                      <button className="hover:text-blue-500 transition-colors"><Share2 className="h-3 w-3" /></button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MAIN CONTENT GRID (3 + Latest News / Intelligence / Rankings)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-12 gap-8">

          {/* ── LEFT MAIN COLUMN ── */}
          <div className="col-span-12 lg:col-span-8 space-y-10">

            {/* 3. LATEST LEADER NEWS FEED */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Latest Leader News Feed</h2>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
                  {NEWS_TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveNewsTab(tab)}
                      className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${activeNewsTab === tab ? "bg-white dark:bg-gray-800 text-purple-600 shadow-xs" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {LATEST_NEWS.map((item) => (
                  <div key={item.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm hover:border-purple-300 dark:hover:border-purple-900 transition-all group">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                        {item.leader.split(" ").map(w => w[0]).slice(0, 2).join("")}
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-bold text-[9px] text-gray-900 dark:text-white truncate">{item.leader}</span>
                          <span className="bg-purple-50 dark:bg-purple-950/20 text-purple-600 text-[7px] font-bold px-1.5 py-0.5 rounded">{item.sector}</span>
                        </div>
                        <h4 className="text-[10px] md:text-xs font-bold text-gray-950 dark:text-white leading-snug group-hover:text-purple-500 transition-colors">{item.headline}</h4>
                        <div className="flex items-center justify-between text-[9px] text-gray-400">
                          <span>{item.time}</span>
                          <div className="flex items-center gap-2">
                            <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" />{item.views}</span>
                            <Bookmark className="h-2.5 w-2.5 hover:text-purple-500 cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Link href="/eoi" className="text-purple-500 font-bold text-xs hover:underline flex items-center gap-1 justify-center">
                  Load More Leader News <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* 4. LEADER SPOTLIGHT */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Leader Spotlight</h2>
                  <span className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 text-[8px] font-bold px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">Verified Leaders</span>
                </div>
                <Link href="/eoi" className="text-[10px] font-bold text-purple-500 hover:underline uppercase">View All</Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {SPOTLIGHT_LEADERS.map((leader, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:shadow-md hover:border-purple-300 dark:hover:border-purple-900 transition-all group space-y-2">
                    <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${leader.color} flex items-center justify-center font-bold text-white text-sm mx-auto relative`}>
                      {leader.initial}
                      {leader.verified && (
                        <span className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full p-0.5">
                          <CheckCircle className="h-2.5 w-2.5 text-white" />
                        </span>
                      )}
                    </div>
                    <div>
                      <span className="font-bold text-[9px] text-gray-900 dark:text-white block leading-tight">{leader.name}</span>
                      <span className="text-[8px] text-gray-450 block">{leader.role}</span>
                      <span className="text-[8px] text-gray-400 block truncate">{leader.company}</span>
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-[8px] text-gray-400">Influence Score</div>
                      <div className="font-display font-bold text-sm text-purple-600">{leader.influence}</div>
                      <div className="text-[8px] text-gray-400">{leader.followers} Followers</div>
                    </div>
                    <Link href="/eoi" className="w-full bg-purple-600 hover:bg-purple-700 text-white text-[8px] font-bold py-1.5 rounded-lg block transition-colors">
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. LEADERSHIP INTELLIGENCE MODULES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Leadership Intelligence</h2>
                <span className="text-[9px] font-bold text-gray-400 flex items-center gap-1"><Sparkles className="h-3 w-3 text-amber-500" /> Powered by IGEN AI</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {INTELLIGENCE_MODULES.map((mod, idx) => {
                  const ModIcon = mod.icon;
                  return (
                    <div key={idx} className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-xl hover:shadow-sm transition-all group relative overflow-hidden ${mod.locked ? "opacity-80" : ""}`}>
                      {mod.locked && (
                        <div className="absolute top-3 right-3">
                          <Lock className="h-3.5 w-3.5 text-gray-400" />
                        </div>
                      )}
                      <ModIcon className={`h-6 w-6 mb-3 ${mod.locked ? "text-gray-400" : "text-purple-500"}`} />
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white leading-tight">{mod.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-1 font-normal">{mod.desc}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${mod.badge === "Free" ? "bg-blue-50 text-blue-600" : mod.badge === "Enterprise" ? "bg-amber-50 text-amber-600" : "bg-purple-50 text-purple-600"}`}>
                          {mod.badge}
                        </span>
                        {mod.locked ? (
                          <Link href="/eoi" className="text-[8px] font-bold text-purple-500 hover:underline">Upgrade →</Link>
                        ) : (
                          <Link href="/eoi" className="text-[8px] font-bold text-blue-500 hover:underline">Access →</Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 6. BROWSE BY INDUSTRY */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Browse Leader News by Industry</h2>
                <Link href="/eoi" className="text-[10px] font-bold text-purple-500 hover:underline uppercase">View All Industries</Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {INDUSTRIES.map((ind, idx) => (
                  <Link key={idx} href="/eoi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3 rounded-xl text-center hover:shadow-sm hover:border-purple-300 dark:hover:border-purple-900 transition-all group">
                    <span className="text-2xl block mb-1">{ind.icon}</span>
                    <span className="font-bold text-[10px] text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors block">{ind.name}</span>
                    <span className="text-[8px] text-gray-400 block mt-0.5">{ind.count}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 7. LEADER RANKINGS TABLE (3-column: Top, Sector, Most Read) */}
            <div className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Leader Rankings & Top Lists</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Top Influential */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
                  <div className="bg-indigo-600 text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                    <span>Top Influential Leaders</span>
                    <Link href="/eoi" className="text-[9px] opacity-80 hover:opacity-100">View All</Link>
                  </div>
                  <div className="divide-y divide-gray-50 dark:divide-gray-850">
                    {TOP_LEADERS.map((l) => (
                      <div key={l.rank} className="flex items-center gap-2.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                        <span className="font-display text-sm font-extrabold text-gray-200 dark:text-gray-800 w-4 shrink-0 text-center">{l.rank}</span>
                        <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>{l.initial}</div>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{l.name}</span>
                          <span className="text-[8px] text-gray-450 block truncate">{l.company}</span>
                        </div>
                        <span className="font-display text-xs font-bold text-purple-600 shrink-0">{l.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top by Sector */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
                  <div className="bg-emerald-600 text-white px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                    <span>Top Leaders by Sector</span>
                    <select className="bg-transparent text-white text-[9px] outline-none" value={activeSectorTab} onChange={(e) => setActiveSectorTab(e.target.value)}>
                      <option>Technology</option>
                      <option>Healthcare</option>
                      <option>Finance</option>
                      <option>Energy</option>
                    </select>
                  </div>
                  <div className="divide-y divide-gray-50 dark:divide-gray-850">
                    {SECTOR_LEADERS.map((l) => (
                      <div key={l.rank} className="flex items-center gap-2.5 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                        <span className="font-display text-sm font-extrabold text-gray-200 dark:text-gray-800 w-4 shrink-0 text-center">{l.rank}</span>
                        <div className={`h-7 w-7 rounded-lg bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>{l.initial}</div>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{l.name}</span>
                          <span className="text-[8px] text-gray-450 block truncate">{l.company}</span>
                        </div>
                        <span className="font-display text-xs font-bold text-emerald-600 shrink-0">{l.score}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Most Read */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
                  <div className="bg-amber-500 text-gray-950 px-4 py-2.5 flex items-center justify-between text-xs font-bold">
                    <span>Most Read Stories</span>
                    <Link href="/eoi" className="text-[9px] opacity-70 hover:opacity-100">View All</Link>
                  </div>
                  <div className="divide-y divide-gray-50 dark:divide-gray-850">
                    {MOST_READ.map((s, idx) => (
                      <div key={idx} className="flex items-start gap-2 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                        <span className="font-display text-sm font-extrabold text-gray-200 dark:text-gray-800 w-4 shrink-0 text-center mt-0.5">{idx + 1}</span>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-[10px] text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors block leading-snug">{s.headline}</span>
                          <span className="text-[9px] text-gray-400 flex items-center gap-0.5 mt-0.5"><Eye className="h-2.5 w-2.5" /> {s.views} views</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* 10. AI LEADERSHIP TRENDS (Premium) */}
            <div className="bg-gradient-to-br from-[#0c1931] to-[#162d54] text-white p-6 rounded-2xl border border-slate-800 shadow-lg space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-amber-400" />
                  <h2 className="font-display text-sm font-bold uppercase tracking-wider">AI Leadership Trends</h2>
                </div>
                <span className="bg-amber-400 text-gray-950 text-[8px] font-bold px-2 py-0.5 rounded-full">PRO</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Growth Trend", val: "+28%", desc: "Leadership news growth YoY", icon: TrendingUp, color: "text-emerald-400" },
                  { label: "Positive Sentiment", val: "73%", desc: "Positive media coverage", icon: Star, color: "text-amber-400" },
                  { label: "Executive Moves", val: "142", desc: "New appointments this month", icon: ArrowUpRight, color: "text-blue-400" },
                  { label: "Opportunities", val: "38", desc: "AI-flagged investment signals", icon: Target, color: "text-purple-400" }
                ].map((t, idx) => {
                  const TIcon = t.icon;
                  return (
                    <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-1 text-center">
                      <TIcon className={`h-5 w-5 mx-auto ${t.color}`} />
                      <div className={`font-display text-xl font-bold ${t.color}`}>{t.val}</div>
                      <div className="text-[9px] font-bold text-slate-400 uppercase">{t.label}</div>
                      <div className="text-[9px] text-slate-500 font-normal">{t.desc}</div>
                    </div>
                  );
                })}
              </div>
              <div className="flex gap-3">
                <Link href="/eoi" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2 rounded-lg transition-all">
                  Unlock AI Insights
                </Link>
                <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-xs px-5 py-2 rounded-lg transition-all">
                  View Sample Report
                </Link>
              </div>
            </div>

            {/* 11. LIVE DISCUSSIONS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Live Discussions & Events</h2>
                <span className="flex items-center gap-1 text-[9px] font-bold text-red-500"><span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" /> Live Now</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { type: "WEBINAR", title: "Leadership in the Age of AI — Panel Discussion", host: "IGEN Leadership Council", time: "Live Now", seats: "342 attending", icon: Play },
                  { type: "AMA", title: "Ask Me Anything: Navigating ESG with Kiran Mazumdar-Shaw", host: "Biocon & IGEN Expert Panel", time: "Starting in 20 min", seats: "1.2K registered", icon: MessageSquare },
                  { type: "PODCAST", title: "Trade & Leadership Weekly — Episode 48", host: "Marcus Chen & Priya Sharma", time: "New Episode", seats: "8.4K listeners", icon: Mic },
                  { type: "AMA", title: "Global Supply Chains: Executive Q&A with Julian Vance", host: "Logistics Intelligence Forum", time: "Tomorrow, 3 PM IST", seats: "890 registered", icon: MessageSquare }
                ].map((ev, idx) => {
                  const EvIcon = ev.icon;
                  return (
                    <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex gap-3 hover:border-purple-300 dark:hover:border-purple-900 transition-all group">
                      <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center shrink-0">
                        <EvIcon className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="space-y-1 min-w-0">
                        <span className="text-[8px] font-bold text-red-500 uppercase">{ev.type} · {ev.time}</span>
                        <h4 className="text-xs font-bold text-gray-950 dark:text-white leading-snug group-hover:text-purple-500 transition-colors">{ev.title}</h4>
                        <p className="text-[9px] text-gray-450">{ev.host} · {ev.seats}</p>
                        <Link href="/eoi" className="text-[9px] font-bold text-purple-500 hover:underline">Join Now →</Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Upgrade widget */}
            <div className="bg-gradient-to-br from-slate-950 to-[#162d54] text-white border border-slate-800 p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Upgrade to Access</span>
              </div>
              <ul className="space-y-2 text-[10px] text-slate-300">
                {["Post Leadership News", "Complete Leader Profiles", "AI Insights & Reports", "Executive Rankings", "Export (PDF/Excel)", "Team Collaboration", "API Access"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="space-y-2 pt-2">
                <Link href="/eoi" className="block text-center bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-lg transition-colors">
                  Get Verified (Pro)
                </Link>
                <Link href="/eoi" className="block text-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950 font-bold text-xs py-2.5 rounded-lg transition-colors">
                  Go Enterprise
                </Link>
              </div>
            </div>

            {/* Trending Leaders */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
              <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-850 flex items-center justify-between">
                <span className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Trending Leaders</span>
                <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-pulse" />
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {TOP_LEADERS.slice(0, 4).map((l, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <span className="font-display text-sm font-extrabold text-gray-200 dark:text-gray-800 w-4 text-center">{idx + 1}</span>
                    <div className={`h-8 w-8 rounded-xl bg-gradient-to-br ${l.color} flex items-center justify-center text-white font-bold text-[10px] shrink-0`}>{l.initial}</div>
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{l.name}</span>
                      <span className="text-[9px] text-gray-450 truncate block">{l.company}</span>
                    </div>
                    <button className="text-[8px] font-bold text-purple-500 border border-purple-200 dark:border-purple-900 px-1.5 py-0.5 rounded hover:bg-purple-50 transition-colors shrink-0">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-xl shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-purple-500" />
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">Leadership Intelligence Digest</h4>
              </div>
              <p className="text-[10px] text-gray-500 font-normal leading-relaxed">
                Top executive moves, AI trend reports, and sector rankings — delivered to 80K+ professionals every morning.
              </p>
              {subscribed ? (
                <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 text-emerald-700 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center flex items-center gap-2 justify-center">
                  <CheckCircle className="h-3.5 w-3.5" /> Subscribed!
                </div>
              ) : (
                <div className="space-y-2">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="work@company.com" className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-955 outline-none focus:border-purple-500" />
                  <button onClick={() => { if (email) setSubscribed(true); }} className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2 rounded-lg transition-colors">
                    Subscribe Free
                  </button>
                </div>
              )}
            </div>

            {/* Tier quick-nav */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs text-gray-900 dark:text-white uppercase border-b border-gray-100 dark:border-gray-850 pb-2">Quick Navigation</h4>
              {([
                { tier: "registered", label: "Registered Leaders (Free)", Icon: User, sub: ["Leader News", "Leader Pages", "By Sector", "All Sectors"] },
                { tier: "verified", label: "Verified Leaders (Pro)", Icon: CheckCircle, sub: ["Leader News", "Leader Pages", "By Sector", "All Sectors"] },
                { tier: "top", label: "Top Leaders (Enterprise)", Icon: Crown, sub: ["Leader News", "Leader Pages", "By Sector", "All Sectors"] }
              ] as const).map(({ tier, label, Icon, sub }) => (
                <div key={tier} className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-700 dark:text-gray-300">
                    <Icon className="h-3 w-3" /> {label}
                  </div>
                  <div className="pl-4 space-y-0.5">
                    {sub.map((s) => (
                      <Link key={s} href={`${tierPath}/${tier}/${s.toLowerCase().replace(/ /g, "-").replace("all-sectors", "all").replace("by-sector", "sector").replace("leader-news", "news").replace("leader-pages", "pages")}`} className="text-[9px] text-gray-450 hover:text-purple-500 hover:underline block transition-colors">
                        · {s}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          12. UPGRADE BANNER — Primary Revenue Section
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="bg-gradient-to-br from-[#0c1931] via-[#1a2d5a] to-[#0a1628] text-white p-8 md:p-10 rounded-3xl border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/8 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />

          <div className="relative z-10 text-center space-y-6 max-w-3xl mx-auto">
            <div className="space-y-2">
              <span className="bg-amber-400/15 text-amber-400 border border-amber-400/20 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block">
                Unlock Premium Leadership Intelligence
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Discover. Connect. Lead.
              </h2>
              <p className="text-slate-400 text-sm font-normal max-w-xl mx-auto">
                Get unlimited access to in-depth leader profiles, AI insights, exclusive reports, rankings and more.
              </p>
            </div>

            {/* Feature icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { icon: BarChart2, label: "Unlimited News & Reports" },
                { icon: Sparkles, label: "AI Insights & Analytics" },
                { icon: Search, label: "Advanced Search & Filters" },
                { icon: Shield, label: "Export Data (PDF/Excel)" }
              ].map((f, idx) => {
                const FIcon = f.icon;
                return (
                  <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center space-y-2">
                    <FIcon className="h-5 w-5 mx-auto text-amber-400" />
                    <span className="text-[9px] font-bold text-slate-300 block">{f.label}</span>
                  </div>
                );
              })}
            </div>

            {/* Plan buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/eoi" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all">
                Get Verified (Pro) — from ₹999/mo
              </Link>
              <Link href="/eoi" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950 font-bold text-sm px-8 py-3 rounded-xl transition-all">
                Go Enterprise — Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

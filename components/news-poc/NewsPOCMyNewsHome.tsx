"use client";

import Link from "next/link";
import { useState } from "react";
import {
  User, Search, CheckCircle, Crown, Star, TrendingUp,
  ChevronRight, ArrowUpRight, Bookmark, Share2, Eye, Award,
  Sparkles, Lock, Mic, BarChart2, Zap, Trophy,
  MessageSquare, Bell, Filter, Play, ChevronLeft, Target,
  MapPin, Briefcase, Shield, Activity, Calendar, Download, ThumbsUp,
  Building, ArrowDownRight, Layers, FileText, ArrowRight, Mail,
  Coins, Scale, Compass, Flag, Plus, Check, Flame, Sliders, RefreshCw,
  Clock, Heart, FileEdit
} from "lucide-react";

// ─── DATA ──────────────────────────────────────────────────────────────────

const MY_QUICK_STATS = [
  { val: "48", label: "Articles Read (Week)", icon: Eye, color: "text-blue-500" },
  { val: "14", label: "Saved Bookmarks", icon: Bookmark, color: "text-emerald-500" },
  { val: "8", label: "Followed Entities", icon: User, color: "text-purple-500" },
  { val: "5 Days", label: "Reading Streak 🔥", icon: Flame, color: "text-amber-500" }
];

const FOLLOWED_INTERESTS = [
  { name: "Semiconductors (S46)", type: "Sector", count: "12 new stories" },
  { name: "AI & Cyber Security (S02)", type: "Sector", count: "8 new stories" },
  { name: "India–UAE CEPA", type: "Corridor", count: "5 new stories" },
  { name: "DP World 🇦🇪", type: "Company", count: "3 new stories" },
  { name: "Dr. Aris Thorne", type: "Expert", count: "2 new AMAs" }
];

const PERSONALIZED_FEED = [
  {
    id: "myn-1",
    title: "Hosur Semiconductor Hub Receives $1.2 Billion Equipment Sourcing Approval",
    summary: "High-precision lithography tools clear customs at Chennai Port, accelerating OSAT substrate packaging timeline for Q4 2026 pilot production.",
    sector: "Semiconductors",
    matchedInterest: "Matched to Semiconductors (S46)",
    date: "15m ago",
    readTime: "4 min read",
    views: "2.4K",
    likes: 84,
    comments: 12,
    premium: false
  },
  {
    id: "myn-2",
    title: "India-UAE CEPA Non-Oil Cargo Throughput Increases 18.4% at Mundra Port",
    summary: "Digitized blockchain manifests cut container holding latency by 48 hours for fast-tracked pharmaceutical and renewable energy equipment.",
    sector: "Logistics & Trade",
    matchedInterest: "Matched to India–UAE CEPA",
    date: "1h ago",
    readTime: "5 min read",
    views: "3.8K",
    likes: 120,
    comments: 29,
    premium: true
  },
  {
    id: "myn-3",
    title: "DP World Expands Cold-Chain Storage Infrastructure Across Mundra & Jebel Ali",
    summary: "Strategic agreement opens $140M multi-temperature logistics parks to support perishable agritech and pharmaceutical exports.",
    sector: "Logistics",
    matchedInterest: "Matched to DP World 🇦🇪",
    date: "3h ago",
    readTime: "4 min read",
    views: "1.9K",
    likes: 65,
    comments: 8,
    premium: false
  }
];

const AI_EXECUTIVE_SUMMARY_POINTS = [
  "Semiconductor OSAT equipment tariffs reduced by 12% following Ministry of Commerce directive.",
  "India-UAE CEPA non-oil bilateral commerce pacing toward $100B milestone 2 years ahead of schedule.",
  "Sovereign AI datacenter capital subsidies unlocked for Tier-2 enterprise industrial parks."
];

const MY_ACTIVITY_SUMMARY = [
  { label: "Bookmarked Articles", val: "14 Items", icon: Bookmark, href: "/en/news-poc/my-news/activities" },
  { label: "Liked Stories", val: "38 Likes", icon: Heart, href: "/en/news-poc/my-news/activities" },
  { label: "Comments Posted", val: "19 Comments", icon: MessageSquare, href: "/en/news-poc/my-news/activities" },
  { label: "Followed Authors", val: "8 Profiles", icon: User, href: "/en/news-poc/my-news/activities" }
];

const MY_CONTRIBUTION_METRICS = [
  { label: "Published Articles", val: "3", sub: "1.4K Total Views" },
  { label: "Drafts Saved", val: "2", sub: "In Progress" },
  { label: "Under Review", val: "1", sub: "Editorial Queue" }
];

const FEED_TABS = ["All My Feed", "My Sectors", "My Companies", "My Leaders", "My Countries"];

export default function NewsPOCMyNewsHome() {
  const [activeTab, setActiveTab] = useState("All My Feed");

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">

      {/* ══════════════════════════════════════════════════════════════════
          1. HERO BANNER — Personal Workspace Welcome
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
                  <User className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">Personal Workspace (IGN-M10)</span>
              </div>
              
              <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
                Welcome back, Rajesh! 👋
              </h1>
              
              <p className="text-slate-300 text-sm md:text-base font-normal leading-relaxed max-w-lg">
                Your personalized trade intelligence dashboard, tailored to your followed sectors, companies, leaders, and reading activity.
              </p>

              {/* 4 Action CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs">
                  <Sliders className="h-3.5 w-3.5" /> Customize Interests
                </Link>
                <Link href="/en/news-poc/my-news/activities" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs">
                  <BarChart2 className="h-3.5 w-3.5" /> Reading Analytics
                </Link>
                <Link href="/en/news-poc/my-news/contribution" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs">
                  <FileEdit className="h-3.5 w-3.5" /> Create Contribution
                </Link>
                <Link href="/eoi" className="bg-white/10 border border-white/20 hover:bg-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all">
                  <Crown className="h-3.5 w-3.5" /> Upgrade to Pro
                </Link>
              </div>
            </div>

            {/* Quick Stat Counter Panel */}
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {MY_QUICK_STATS.map((s, idx) => {
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
                { label: "My Sector Trade News", href: "/en/news-poc/my-news/feed", badge: "Personal Feed" },
                { label: "My Activities & Analytics", href: "/en/news-poc/my-news/activities", badge: "Activity Hub" },
                { label: "My Contribution Workspace", href: "/en/news-poc/my-news/contribution", badge: "Authoring" }
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
          2. AI DAILY EXECUTIVE DIGEST (PRO FEATURE)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="bg-gradient-to-br from-[#0c1a2e] to-[#142d52] text-white p-6 rounded-2xl border border-blue-900/60 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <h2 className="font-display text-sm font-bold uppercase tracking-wider">AI Daily Executive News Briefing</h2>
            </div>
            <span className="bg-amber-400 text-gray-950 text-[8px] font-bold px-2.5 py-0.5 rounded-full">PRO AI SUMMARY</span>
          </div>

          <div className="space-y-2 text-xs">
            {AI_EXECUTIVE_SUMMARY_POINTS.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-2 text-slate-200">
                <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="font-normal leading-relaxed">{pt}</p>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
            <span className="text-[10px] text-slate-400">Generated 30m ago based on your 5 followed topics.</span>
            <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-4 py-2 rounded-lg transition-colors">
              Unlock Full Audio Briefing 🎧
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          3. MY INTERESTS CHIPS PANEL
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">My Followed Interests</span>
            </div>
            <Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline">
              Edit Interests →
            </Link>
          </div>

          <div className="flex flex-wrap gap-2">
            {FOLLOWED_INTERESTS.map((item, idx) => (
              <div key={idx} className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs">
                <span className="font-bold text-gray-900 dark:text-white">{item.name}</span>
                <span className="text-[8px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-1.5 py-0.5 rounded">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          4. MAIN CONTENT GRID (Personalized Feed / Activity / Contribution)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="grid grid-cols-12 gap-8">

          {/* ── LEFT MAIN COLUMN ── */}
          <div className="col-span-12 lg:col-span-8 space-y-10">

            {/* PERSONALIZED FEED (TABBED) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">My Personalized Feed</h2>
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
                  {FEED_TABS.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${activeTab === tab ? "bg-white dark:bg-gray-800 text-blue-600 shadow-xs" : "text-gray-500 hover:text-gray-700"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                {PERSONALIZED_FEED.map((story) => (
                  <div key={story.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs space-y-3 hover:border-blue-300 dark:hover:border-blue-900 transition-all group">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/20 px-2 py-0.5 rounded border border-blue-100/40">
                          {story.sector}
                        </span>
                        <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded">
                          {story.matchedInterest}
                        </span>
                      </div>
                      <span className="text-[9px] text-gray-400">{story.date} · {story.readTime}</span>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-gray-950 dark:text-white leading-snug group-hover:text-blue-600 transition-colors">
                      {story.title}
                    </h3>
                    
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-normal leading-relaxed">
                      {story.summary}
                    </p>

                    <div className="pt-2 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[10px] text-gray-500">
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 hover:text-blue-600"><ThumbsUp className="h-3.5 w-3.5" /> {story.likes}</button>
                        <button className="flex items-center gap-1 hover:text-blue-600"><MessageSquare className="h-3.5 w-3.5" /> {story.comments}</button>
                        <button className="hover:text-gray-700"><Share2 className="h-3.5 w-3.5" /></button>
                      </div>
                      <Bookmark className="h-4 w-4 hover:text-blue-500 cursor-pointer" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MY ACTIVITIES DASHBOARD SNAPSHOT */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">My Engagement & Activity Snapshot</h2>
                <Link href="/en/news-poc/my-news/activities" className="text-[10px] font-bold text-blue-500 hover:underline uppercase">View All Activity</Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {MY_ACTIVITY_SUMMARY.map((act, idx) => {
                  const AIcon = act.icon;
                  return (
                    <Link key={idx} href={act.href} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-1.5 hover:border-blue-500 transition-all block">
                      <AIcon className="h-5 w-5 text-blue-500" />
                      <span className="text-[9px] font-bold text-gray-400 uppercase block">{act.label}</span>
                      <div className="font-display text-base font-bold text-gray-900 dark:text-white">{act.val}</div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* MY CONTRIBUTION WORKSPACE SNAPSHOT */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-3">
                <div className="flex items-center gap-2">
                  <FileEdit className="h-5 w-5 text-purple-600" />
                  <h3 className="font-bold text-base text-gray-900 dark:text-white">My Contribution Workspace</h3>
                </div>
                <Link href="/en/news-poc/my-news/contribution" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] px-3 py-1.5 rounded-lg">
                  Submit New Article
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                {MY_CONTRIBUTION_METRICS.map((c, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <span className="text-[8px] font-bold text-gray-400 uppercase block">{c.label}</span>
                    <span className="font-display text-lg font-bold text-purple-600 mt-0.5 block">{c.val}</span>
                    <span className="text-[8px] text-gray-400 block">{c.sub}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Persistent Upgrade Banner */}
            <div className="bg-gradient-to-br from-slate-950 to-[#102747] text-white border border-slate-800 p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Crown className="h-4 w-4 text-amber-400" />
                <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">Upgrade to My News Pro</span>
              </div>
              <ul className="space-y-2 text-[10px] text-slate-300">
                {[
                  "Unlimited AI Daily Executive Summaries",
                  "Pro Trade-News Reading Analytics & PDF Export",
                  "Unlimited Article Bookmarks & Custom Folders",
                  "Priority Editorial Review for Contributions",
                  "Custom Multi-Sector Alert Dashboards"
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
              </div>
            </div>

            {/* Recommended Premium Reports */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-2">
                <span className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Recommended for You</span>
                <Download className="h-4 w-4 text-blue-500" />
              </div>
              <div className="space-y-2">
                {[
                  { title: "2026 Semiconductor Substrate OSAT Playbook", price: "$249" },
                  { title: "India-UAE CEPA Maritime Freight Corridor Report", price: "$199" }
                ].map((rep, idx) => (
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

            {/* Newsletter Preference */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 shadow-xs space-y-3">
              <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-850 pb-2">
                <Mail className="h-4 w-4 text-blue-500" />
                <span className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Personalized Digest</span>
              </div>
              <p className="text-[10px] text-gray-500">Daily morning summary delivered to your inbox.</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2 rounded-lg transition-colors">
                Manage Digest Settings
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

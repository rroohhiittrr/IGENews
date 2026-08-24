"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, Calendar, BookOpen, Clock, Heart, Share2, MessageSquare, 
  ShieldAlert, Lock, ChevronRight, TrendingUp, Search, Bell, AlertTriangle,
  ArrowRight, Download, BarChart2, Eye, Mail, FileText, CheckCircle, Flame,
  ThumbsUp, Bookmark, Globe, MessageCircle
} from "lucide-react";

interface TopStory {
  id: string;
  image: string;
  time: string;
  readers: string;
  category: string;
  categoryColor: string;
  categoryTextColor: string;
  title: string;
  excerpt: string;
}

interface FeedItem {
  id: string;
  image: string;
  category: string;
  title: string;
  excerpt: string;
  impact: string;
  impactColor: string;
  readers: string;
  time: string;
}

const TOP_STORIES: TopStory[] = [
  {
    id: "top-1",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=60",
    time: "9h ago",
    readers: "24.5k reading now",
    category: "HEALTHCARE & PHARMA",
    categoryColor: "border-cyan-500/30 text-cyan-600 bg-cyan-50/50 dark:bg-cyan-950/20",
    categoryTextColor: "text-cyan-600 dark:text-cyan-400",
    title: "Generic Drug Exports Hit $24B Milestone",
    excerpt: "India consolidates position as pharmacy to the world..."
  },
  {
    id: "top-2",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&auto=format&fit=crop&q=60",
    time: "9h ago",
    readers: "24.5k reading now",
    category: "FINANCE & BANKING",
    categoryColor: "border-amber-500/30 text-amber-600 bg-amber-50/50 dark:bg-amber-950/20",
    categoryTextColor: "text-amber-600 dark:text-amber-400",
    title: "Digital Rupee Pilots Expand to 5 New Cities",
    excerpt: "CBDC adoption accelerates with merchant integration..."
  },
  {
    id: "top-3",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&auto=format&fit=crop&q=60",
    time: "9h ago",
    readers: "24.5k reading now",
    category: "SUSTAINABLE ENERGY",
    categoryColor: "border-emerald-500/30 text-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20",
    categoryTextColor: "text-emerald-600 dark:text-emerald-400",
    title: "Solar Grid Interconnectivity Standard Finalized",
    excerpt: "New regulatory framework maps state power lines to central hub..."
  }
];

const FEED_ITEMS: FeedItem[] = [
  {
    id: "feed-1",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&auto=format&fit=crop&q=60",
    category: "HEALTHCARE & PHARMA",
    title: "Green Steel Revolution: India's New Export Frontier to European Markets",
    excerpt: "India's sustainable steel production is opening new corridors to European markets as carbon border regulations reshape global trade dynamics. The €2.4B investment in green hydrogen facilities positions India as a key supplier.",
    impact: "-8%",
    impactColor: "text-red-500",
    readers: "18.2K READING NOW",
    time: "12 MINUTES AGO"
  },
  {
    id: "feed-2",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=500&auto=format&fit=crop&q=60",
    category: "HEALTHCARE & PHARMA",
    title: "Asia bunker premiums hit record highs, some ships struggle to refuel",
    excerpt: "India's sustainable steel production is opening new corridors to European markets as carbon border regulations reshape global trade dynamics. The €2.4B investment in green hydrogen facilities positions India as a key supplier.",
    impact: "+6%",
    impactColor: "text-emerald-500",
    readers: "18.2K READING NOW",
    time: "12 MINUTES AGO"
  },
  {
    id: "feed-3",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&auto=format&fit=crop&q=60",
    category: "HEALTHCARE & PHARMA",
    title: "In charts: Singapore's energy and chemicals sector in focus as Middle East conflict escalates",
    excerpt: "India's sustainable steel production is opening new corridors to European markets as carbon border regulations reshape global trade dynamics. The €2.4B investment in green hydrogen facilities positions India as a key supplier.",
    impact: "-4%",
    impactColor: "text-red-500",
    readers: "18.2K READING NOW",
    time: "12 MINUTES AGO"
  }
];

export default function NewsPOCFeedHome() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [feedTimeFilter, setFeedTimeFilter] = useState<"now" | "today" | "week" | "all">("now");
  const [selectedSector, setSelectedSector] = useState("All");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [activeShareId, setActiveShareId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [feedUpvotes, setFeedUpvotes] = useState<Record<string, number>>({
    "feed-1": 142,
    "feed-2": 98,
    "feed-3": 210
  });

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-12 transition-colors duration-300">
      
      {/* FIRST FOLD: Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="grid grid-cols-12 gap-6">
          
          {/* Left Panel: Hero Main News */}
          <div className="col-span-12 lg:col-span-9 relative rounded-2xl overflow-hidden bg-slate-950 text-white min-h-[420px] flex flex-col justify-end p-8 md:p-12 border border-slate-900">
            {/* Background Graphic */}
            <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1000&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40" />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            
            <div className="relative z-10 space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="bg-white/10 text-white text-[10px] font-bold px-2.5 py-1 rounded">
                  FINANCE
                </span>
                <span className="bg-[#E63946] text-white text-[10px] font-bold px-2.5 py-1 rounded flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-white rounded-full animate-ping" />
                  LATEST
                </span>
                <span className="text-slate-300 text-[11px] font-medium">
                  2 minutes ago
                </span>
              </div>

              <h1 className="font-display text-2xl md:text-5xl font-bold leading-tight">
                India's Manufacturing PMI Hits Record High in February 2026
              </h1>

              <p className="text-slate-300 text-xs md:text-base font-normal max-w-2xl leading-relaxed">
                The Purchasing Managers' Index surged to 59.2, signaling unprecedented expansion across automotive, electronics, and pharmaceutical sectors.
              </p>

              <div className="pt-2 flex items-center gap-4">
                <Link
                  href="/en/news-poc/article/sec-1"
                  className="bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold text-xs px-6 py-3 rounded-lg transition-all shadow-md inline-block tracking-wider"
                >
                  READ FULL ARTICLE
                </Link>
                <button className="p-2.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors text-white">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel: Trade Volume Metrics Widget */}
          <div className="col-span-12 lg:col-span-3 flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-[#2a1b15] to-[#1a0f0a] border border-[#402a1e] text-white">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F0652E]">
                Global Trade Pulse
              </span>
              <h3 className="text-base font-bold font-display mt-1 text-[#FEC970]">
                Trade Volume
              </h3>
            </div>

            <div className="my-8">
              <span className="text-5xl md:text-6xl font-bold font-display text-[#F0652E] tracking-tight">
                $42.8B
              </span>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                <TrendingUp className="h-4 w-4" />
                <span>▲ 18.3% vs last quarter</span>
              </div>
            </div>

            <p className="text-[11px] text-[#e0bba2] leading-snug">
              Bilateral export clearance speeds across major corridors show a strong bullish outlook entering Q1 2026.
            </p>
          </div>

        </div>
      </section>

      {/* SECOND FOLD: Top Stories */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            Top Stories
          </h2>
          <div className="h-5 w-5 text-blue-600 dark:text-blue-400 flex items-center">
            <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 3v18h18" />
              <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
            </svg>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOP_STORIES.map((story) => (
            <Link 
              key={story.id} 
              href={`/en/news-poc/article/${story.id}`}
              className="bg-white dark:bg-[#0f172a] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xs flex flex-col justify-between group hover:shadow-md hover:border-blue-400 transition-all duration-200 block"
            >
              <div>
                <div className="h-40 w-full overflow-hidden relative">
                  <img 
                    src={story.image} 
                    alt={story.title} 
                    className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-250"
                  />
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-gray-400">
                    <span>{story.time}</span>
                    <span>{story.readers}</span>
                  </div>
                  
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[9px] font-bold border ${story.categoryColor}`}>
                    {story.category}
                  </span>

                  <h3 className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                    {story.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer widgets */}
              <div className="px-5 pb-5 pt-3 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-gray-450 text-[11px] font-semibold">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-3.5 w-3.5" /> 1.2K
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-3.5 w-3.5" /> 84
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Share2 className="h-3.5 w-3.5 hover:text-blue-500" />
                  <Bookmark className="h-3.5 w-3.5 hover:text-blue-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* THIRD FOLD: News Feed */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        {/* News Feed Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4 mb-6">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
            News Feed
          </h2>
          
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
            {/* Time filters */}
            <div className="flex bg-gray-105 dark:bg-gray-950 p-1 rounded-lg border border-gray-200 dark:border-gray-850">
              {(["now", "today", "week", "all"] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setFeedTimeFilter(filter)}
                  className={`px-3 py-1 rounded text-[10px] font-bold uppercase transition-all ${
                    feedTimeFilter === filter
                      ? "bg-white dark:bg-[#0f172a] text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-gray-500"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Selector Dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              {["Sector", "Country", "Type", "Strength"].map((sel) => (
                <select 
                  key={sel}
                  className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-gray-800 rounded px-2.5 py-1 text-[11px] font-semibold text-gray-650 dark:text-gray-350 focus:outline-none focus:border-blue-500"
                >
                  <option>{sel}</option>
                </select>
              ))}
            </div>
          </div>
        </div>

        {/* Horizontal scrollbar of sector chips */}
        <div className="flex gap-2 pb-4 mb-4 overflow-x-auto scrollbar-hide border-b border-gray-150 dark:border-gray-850">
          {["All", "HEALTHCARE & PHARMA", "FINANCE & BANKING", "SUSTAINABLE ENERGY"].map((sector) => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
                selectedSector === sector
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border border-gray-200 dark:border-gray-800"
              }`}
            >
              {sector === "All" ? "All Sectors" : sector.replace("HEALTHCARE & PHARMA", "Healthcare").replace("FINANCE & BANKING", "Finance").replace("SUSTAINABLE ENERGY", "Energy")}
            </button>
          ))}
        </div>

        {/* News Feed Items Stack */}
        <div className="space-y-6">
          {FEED_ITEMS
            .filter((item) => selectedSector === "All" || item.category === selectedSector)
            .map((item) => (
              <div 
                key={item.id} 
                className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-xs hover:shadow-md transition-all duration-200 group"
              >
                {/* Left text panel */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <Link href={`/en/news-poc/article/${item.id}`} className="space-y-2 block group">
                    <span className="inline-block border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 bg-cyan-50/20 px-2.5 py-0.5 rounded text-[9px] font-bold">
                      {item.category}
                    </span>
                    
                    <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                      {item.excerpt}
                    </p>
                  </Link>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 dark:border-gray-850 text-[11px] text-gray-500 font-semibold">
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/en/news-poc/article/${item.id}`}
                        className="bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold text-[10px] px-4 py-2 rounded transition-colors"
                      >
                        READ FULL ARTICLE
                      </Link>
                      <span className="flex items-center gap-1">
                        MARKET IMPACT: <span className={item.impactColor}>{item.impact}</span>
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span>{item.readers}</span>
                      <span>•</span>
                      <span>{item.time}</span>
                      <span className="text-gray-300">|</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            setFeedUpvotes(prev => ({
                              ...prev,
                              [item.id]: (prev[item.id] || 12) + 1
                            }));
                            setToastMessage("Insight upvoted!");
                            setTimeout(() => setToastMessage(null), 2500);
                          }}
                          className="flex items-center gap-1 hover:text-red-500"
                        >
                          <ThumbsUp className="h-3.5 w-3.5" /> 
                          <span>{feedUpvotes[item.id] || 12}</span>
                        </button>
                        <button className="hover:text-blue-500"><MessageCircle className="h-3.5 w-3.5" /></button>
                        
                        <div className="relative">
                          <button 
                            onClick={() => setActiveShareId(prev => prev === item.id ? null : item.id)}
                            className="hover:text-blue-500"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                          </button>
                          {activeShareId === item.id && (
                            <div className="absolute right-0 bottom-6 z-20 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 shadow-lg flex flex-col gap-1 text-[10px] w-28 text-left">
                              <button 
                                onClick={() => {
                                  setCopiedPostId(item.id);
                                  setToastMessage("Copied to clipboard ✓");
                                  setTimeout(() => {
                                    setCopiedPostId(null);
                                    setToastMessage(null);
                                  }, 2000);
                                  setActiveShareId(null);
                                }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded text-gray-700 dark:text-gray-300"
                              >
                                {copiedPostId === item.id ? "Copied ✓" : "Copy Link"}
                              </button>
                              <button 
                                onClick={() => {
                                  alert("Sharing to LinkedIn");
                                  setActiveShareId(null);
                                }}
                                className="hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded text-gray-700 dark:text-gray-300"
                              >
                                Share to LinkedIn
                              </button>
                            </div>
                          )}
                        </div>

                        <button 
                          onClick={() => {
                            setBookmarkedIds(prev => 
                              prev.includes(item.id) 
                                ? prev.filter(id => id !== item.id) 
                                : [...prev, item.id]
                            );
                            const isBookmarking = !bookmarkedIds.includes(item.id);
                            setToastMessage(isBookmarking ? "Saved to My Bookmarks" : "Removed from Bookmarks");
                            setTimeout(() => setToastMessage(null), 2500);
                          }}
                          className={`hover:text-amber-500 transition-colors ${
                            bookmarkedIds.includes(item.id) ? "text-amber-500 fill-amber-500" : ""
                          }`}
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              {/* Right Image panel — clicking also goes to article */}
              <Link href={`/en/news-poc/article/${item.id}`} className="w-full md:w-80 h-48 md:h-full min-h-[160px] rounded-xl overflow-hidden relative block">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-250"
                />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FOURTH FOLD: Sector Intelligence Hub */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
          <h2 className="font-display text-xl font-bold text-gray-900 dark:text-white">
            Sector Intelligence Hub
          </h2>
          <div className="flex items-center gap-3">
            <button className="bg-[#E63946] hover:bg-[#c0392b] text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg">
              Live Feed
            </button>
            <button className="bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold text-[10px] px-3.5 py-1.5 rounded-lg">
              Analytics
            </button>
            <Link 
              href="/news-poc/feed/sector/intelligence" 
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              VIEW ALL →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "TECHNOLOGY SECTOR", pct: "+18%", col: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
            { name: "ENERGY SECTOR", pct: "+12%", col: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
            { name: "MANUFACTURING", pct: "+9%", col: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" }
          ].map((sec, idx) => (
            <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-3 mb-4">
                <h4 className="text-xs font-bold text-gray-950 dark:text-white font-display">
                  {sec.name}
                </h4>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-sm ${sec.col}`}>
                  {sec.pct}
                </span>
              </div>
              
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                AI regulations reshape global tech trade landscape with new compliance frameworks emerging across 15 markets.
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-455 font-medium">Article Volume</span>
                  <span className="font-bold text-gray-900 dark:text-white">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-455 font-medium">Weekly Growth</span>
                  <span className="font-bold text-emerald-500">{sec.pct}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-455 font-medium">Trending Topics</span>
                  <div className="flex gap-1.5">
                    <span className="text-blue-500 font-bold hover:underline cursor-pointer">AI</span>,
                    <span className="text-blue-500 font-bold hover:underline cursor-pointer">Semiconductors</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FIFTH FOLD: Start Your Intelligence Journey (Pricing Cards) */}
      <section className="mx-auto max-w-7xl px-4 pt-16 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
            Start Your Intelligence Journey
          </h2>
          
          <div className="flex items-center gap-3 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-1.5 rounded-xl shadow-xs">
            <button 
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                billingPeriod === "monthly"
                  ? "bg-[var(--color-primary)] text-white shadow-xs"
                  : "text-gray-500"
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingPeriod === "annual"
                  ? "bg-[var(--color-primary)] text-white shadow-xs"
                  : "text-gray-500"
              }`}
            >
              Annual
              <span className="bg-amber-400 text-gray-950 text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          
          {/* Card 1: Free */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">FREE</span>
                <h3 className="text-lg font-bold mt-1 text-gray-900 dark:text-white">Basic</h3>
                <p className="text-xs text-gray-500 leading-snug">Essential news for the curious reader.</p>
              </div>

              <div className="py-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">$0</span>
                <p className="text-[10px] text-gray-400 mt-1">Free forever • No credit card</p>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-850 pt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>20 articles / month</span>
                </div>
                <div className="space-y-1.5 pl-6 text-gray-650 dark:text-gray-350">
                  <p>• Daily Headlines</p>
                  <p>• 3 Sector Hubs</p>
                  <p>• Basic Search</p>
                </div>
              </div>
            </div>

            <Link
              href="/eoi"
              className="w-full text-center bg-gray-100 hover:bg-gray-200 dark:bg-gray-850 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs py-3 rounded-xl transition-colors mt-8"
            >
              Get started free
            </Link>
          </div>

          {/* Card 2: Reader */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 flex flex-col justify-between shadow-xs relative">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider">ESSENTIAL</span>
                <h3 className="text-lg font-bold mt-1 text-gray-900 dark:text-white">Reader</h3>
                <p className="text-xs text-gray-500 leading-snug">Complete sector coverage for professionals.</p>
              </div>

              <div className="py-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${billingPeriod === "monthly" ? "19" : "15"}
                </span>
                <span className="text-xs text-gray-500"> / MO</span>
                <p className="text-[10px] text-gray-400 mt-1">Billed annually or monthly</p>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-850 pt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>200 articles / month</span>
                </div>
                <div className="space-y-1.5 pl-6 text-gray-650 dark:text-gray-350">
                  <p>• All 20 Sector Hubs</p>
                  <p>• 50 Country Maps</p>
                  <p>• Advanced Search</p>
                  <p>• Email Alerts</p>
                </div>
              </div>
            </div>

            <Link
              href="/eoi"
              className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-colors mt-8"
            >
              Start 14-day trial
            </Link>
          </div>

          {/* Card 3: Leader (Best value) */}
          <div className="bg-white dark:bg-[#0f172a] border-2 border-amber-500 rounded-3xl p-6 flex flex-col justify-between shadow-md relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-gray-950 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Best Value
            </span>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider">ELITE</span>
                <h3 className="text-lg font-bold mt-1 text-gray-900 dark:text-white">Leader</h3>
                <p className="text-xs text-gray-500 leading-snug">Global intelligence with AI-powered analytics.</p>
              </div>

              <div className="py-2">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  ${billingPeriod === "monthly" ? "49" : "39"}
                </span>
                <span className="text-xs text-gray-500"> / MO</span>
                <p className="text-[10px] text-gray-400 mt-1">Billed annually or monthly</p>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-850 pt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>Unlimited articles - 1 user</span>
                </div>
                <div className="space-y-1.5 pl-6 text-gray-650 dark:text-gray-350">
                  <p>• 195 Country Maps</p>
                  <p>• AI Plus Intelligence</p>
                  <p>• 500+ Leader Profiles</p>
                  <p>• Trade Lab Scenarios</p>
                </div>
              </div>
            </div>

            <Link
              href="/eoi"
              className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 rounded-xl transition-colors mt-8"
            >
              Get Leader
            </Link>
          </div>

          {/* Card 4: Corporate */}
          <div className="bg-[#0f172a] text-white border border-gray-800 rounded-3xl p-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">ENTERPRISE</span>
                <h3 className="text-lg font-bold mt-1 text-white">Corporate</h3>
                <p className="text-xs text-slate-400 leading-snug">Full intelligence suite built for teams.</p>
              </div>

              <div className="py-2">
                <span className="text-3xl font-bold text-[#F0652E]">Custom</span>
                <p className="text-[10px] text-slate-400 mt-1">Tailored to your team's needs</p>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-amber-400">
                  <CheckCircle className="h-4 w-4 shrink-0" />
                  <span>Unlimited 5+ users</span>
                </div>
                <div className="space-y-1.5 pl-6 text-slate-300">
                  <p>• 5 User Licenses</p>
                  <p>• API Access</p>
                  <p>• Priority Support</p>
                  <p>• Custom Reports</p>
                  <p>• Training Programs</p>
                </div>
              </div>
            </div>

            <Link
              href="/eoi"
              className="w-full text-center bg-[#F0652E] hover:bg-[#D44F1C] text-gray-950 font-bold text-xs py-3 rounded-xl transition-colors mt-8"
            >
              Contact sales
            </Link>
          </div>

        </div>
      </section>

      {/* SIXTH FOLD: AI Plus Intelligence Section */}
      <section className="mx-auto max-w-7xl px-4 pt-16 lg:px-6">
        <div className="mb-8 space-y-2">
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white">
            AI Plus Intelligence
          </h2>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-4xl">
            Experience next-generation trade intelligence with AI-powered synthesis, real-time sentiment analysis, and predictive trend spotting that transforms how B2B professionals navigate global markets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Panel 1: AI Powered Features (col-span-7) */}
          <div className="lg:col-span-7 rounded-2xl bg-gradient-to-br from-[#0c1424] to-[#162136] border border-slate-800 text-white p-6 md:p-8 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                AI-Powered Features
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Smart Briefings (Live)
                  </h4>
                  <p className="text-[11px] text-slate-350 leading-relaxed">
                    AI synthesizes 1000+ daily sources into personalized industry briefings with sentiment scoring and impact analysis.
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    Risk Analytics (Active)
                  </h4>
                  <p className="text-[11px] text-slate-350 leading-relaxed">
                    Predictive volatility scoring across 20+ sectors with early warning systems for market disruptions.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                    Global Feed Curation (Streaming)
                  </h4>
                  <p className="text-[11px] text-slate-350 leading-relaxed">
                    AI-powered RSS aggregation from 1000+ premium sources with duplicate removal and relevance ranking.
                  </p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                    Trend Forecasting
                  </h4>
                  <p className="text-[11px] text-slate-350 leading-relaxed">
                    Machine learning models identify emerging patterns 30 days ahead with confidence intervals and impact assessments.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-slate-800 pt-6">
              <Link
                href="/eoi"
                className="bg-[#F0652E] hover:bg-[#D44F1C] text-gray-950 font-bold text-xs px-6 py-3 rounded-lg transition-colors inline-block tracking-wider"
              >
                ACTIVATE AI PLUS
              </Link>
            </div>
          </div>

          {/* Panel 2: Scenario Builder (col-span-5) */}
          <div className="lg:col-span-5 rounded-2xl bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  TRADE LAB SCENARIO BUILDER
                </span>
                <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                  BETA FEATURE
                </span>
              </div>

              {/* Scenario Analysis Input Block */}
              <div className="p-4 bg-gray-50 dark:bg-gray-950 border border-gray-150 dark:border-gray-850 rounded-xl space-y-2">
                <span className="text-[9px] font-bold text-gray-400 uppercase">Scenario Analysis</span>
                <p className="text-xs font-bold text-gray-900 dark:text-white leading-relaxed">
                  "What if EU carbon tariffs increase by 15% in Q2 2026?"
                </p>
                <div className="grid grid-cols-3 gap-2 text-center pt-2">
                  <div className="p-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded">
                    <span className="block text-[8px] text-gray-400">Tariff</span>
                    <span className="text-xs font-bold text-red-500">15%</span>
                  </div>
                  <div className="p-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded">
                    <span className="block text-[8px] text-gray-400">Timeline</span>
                    <span className="text-xs font-bold text-blue-500">Q2 2026</span>
                  </div>
                  <div className="p-1 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-850 rounded">
                    <span className="block text-[8px] text-gray-400">Impact</span>
                    <span className="text-xs font-bold text-amber-500">High</span>
                  </div>
                </div>
              </div>

              {/* Impact Forecast Block */}
              <div className="space-y-2">
                <span className="block text-[9px] font-bold text-gray-400 uppercase">Impact Forecast</span>
                <p className="text-[11px] text-gray-500 leading-snug">Predicted effect on India-Germany steel corridor:</p>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-2.5 rounded-lg border border-red-200 dark:border-red-950/40 bg-red-50/50 dark:bg-red-950/10 text-xs font-bold text-red-600 dark:text-red-400">
                    -8% Volume Impact
                  </div>
                  <div className="p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-950/40 bg-emerald-50/50 dark:bg-emerald-950/10 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    +12% Premium Pricing
                  </div>
                </div>
              </div>

              {/* Opportunity Alert Block */}
              <div className="space-y-2 pt-1">
                <span className="block text-[9px] font-bold text-gray-400 uppercase">Opportunity Alert</span>
                <p className="text-[11px] text-gray-500">Alternative markets identified with growth potential:</p>
                <div className="flex gap-2">
                  <div className="flex-1 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20">
                    +23% Vietnam
                  </div>
                  <div className="flex-1 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/20">
                    +18% Thailand
                  </div>
                </div>
              </div>
            </div>

            {/* Scenario Builder Footer stats */}
            <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[9px] font-mono text-gray-400 uppercase">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Processing: Optimal
              </span>
              <span>2.4M pts/hr</span>
              <span>156 Scenarios/day</span>
            </div>
          </div>

        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-lg shadow-lg text-xs font-bold transition-all">
          {toastMessage}
        </div>
      )}

    </div>
  );
}

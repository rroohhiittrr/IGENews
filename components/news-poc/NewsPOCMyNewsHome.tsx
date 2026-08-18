"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  User, Search, CheckCircle, Crown, Star, TrendingUp,
  ChevronRight, ArrowUpRight, Bookmark, Share2, Eye, Award,
  Sparkles, Lock, Mic, BarChart2, Zap, Trophy, Clock,
  MessageSquare, Bell, Filter, Play, ChevronLeft, Target,
  MapPin, Briefcase, Shield, Activity, Calendar, Download,
  ThumbsUp, Building, ArrowDownRight, Layers, FileText,
  ArrowRight, Mail, Coins, Scale, Compass, Flag, Plus,
  Check, Flame, Sliders, RefreshCw, X, Heart, BellOff
} from "lucide-react";

// --- MOCK DATABASE ---
const INITIAL_ARTICLES = [
  {
    id: "mtn-1",
    title: "Tata Sons & NVIDIA Roll Out $14 Billion Sovereign AI Infrastructure Hub",
    excerpt: "Spearheaded by N. Chandrasekaran and Jensen Huang, the multi-year partnership establishes 100,000 next-gen GPU clusters in Mumbai and Hyderabad.",
    sector: "Technology",
    country: "India",
    company: "NVIDIA",
    leader: "Jensen Huang",
    topic: "Sovereign AI",
    date: "12 min ago",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80",
    reason: "Because you follow Technology & NVIDIA",
    views: "4.8K",
    likes: 312,
    comments: 24,
    isPremium: false,
  },
  {
    id: "mtn-2",
    title: "Reliance Commits to Fast-Track Green Hydrogen Gigafactory Trial Runs",
    excerpt: "Mukesh Ambani announces high-efficiency electrolyzer production benchmarks in Gujarat, targeting sub-$1 per kg green hydrogen production.",
    sector: "Energy",
    country: "India",
    company: "Reliance Industries",
    leader: "Mukesh Ambani",
    topic: "Green Hydrogen",
    date: "1h ago",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    reason: "Because you follow Energy",
    views: "2.9K",
    likes: 185,
    comments: 14,
    isPremium: true,
  },
  {
    id: "mtn-3",
    title: "Bilateral Tech Agreements Signed: US-India Semiconductor R&D Corridor",
    excerpt: "New academic-industry alliance unlocks joint capital funding for sub-20nm fabrication research nodes between Arizona and Bengaluru.",
    sector: "Technology",
    country: "USA",
    company: "Arizona Fab Corp",
    leader: "Dr. Aris Thorne",
    topic: "Semiconductors",
    date: "2 hrs ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    reason: "Because you follow USA & Semiconductors",
    views: "3.2K",
    likes: 204,
    comments: 18,
    isPremium: false,
  },
  {
    id: "mtn-4",
    title: "DP World Secures $140M Cold-Chain Terminal Deal at Mundra & Jebel Ali Ports",
    excerpt: "Multi-temperature warehousing expands bilateral trade capacity for perishable goods and pharma exports under CEPA.",
    sector: "Manufacturing",
    country: "UAE",
    company: "DP World",
    leader: "Sultan Ahmed Bin Sulayem",
    topic: "Trade Corridors",
    date: "4 hrs ago",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=600&auto=format&fit=crop&q=80",
    reason: "Because you follow Manufacturing & UAE",
    views: "1.8K",
    likes: 95,
    comments: 8,
    isPremium: true,
  },
  {
    id: "mtn-5",
    title: "Microsoft Outlines Next-Gen Azure Sovereign Data Cloud Subsidies in Hyderabad",
    excerpt: "Collaborative framework establishes localized cybersecurity rails compliant with upcoming national compliance regulations.",
    sector: "Technology",
    country: "India",
    company: "Microsoft",
    leader: "Satya Nadella",
    topic: "Sovereign AI",
    date: "1 day ago",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=80",
    reason: "Because you follow Microsoft",
    views: "5.4K",
    likes: 420,
    comments: 32,
    isPremium: false,
  }
];

const RECOMMENDED_REPORTS = [
  {
    id: "rep-1",
    title: "Bilateral Indo-US Semiconductor Corridor Outlook 2026",
    desc: "A comprehensive policy and supply chain analysis across Arizona and Indian packaging hubs.",
    topic: "Technology + Semiconductors",
    date: "Q3 2026",
    isPremium: true
  },
  {
    id: "rep-2",
    title: "Sovereign AI Cloud Regulations & Infrastructure Report",
    desc: "Key regulatory data on localization compliance rules and GPU allocation benchmarks.",
    topic: "Technology + Sovereign AI",
    date: "August 2026",
    isPremium: true
  },
  {
    id: "rep-3",
    title: "India-UAE CEPA Maritime Cargo Volume Report",
    desc: "An audit of port latencies, digital manifest savings, and non-oil trade projections.",
    topic: "Manufacturing + UAE",
    date: "July 2026",
    isPremium: false
  }
];

const EVENTS_FOR_YOU = [
  {
    id: "ev-1",
    title: "Global Semiconductor Alliance Summit",
    location: "Singapore",
    date: "Sept 14-16, 2026",
    sector: "Technology"
  },
  {
    id: "ev-2",
    title: "Clean Energy Bilateral Round Table",
    location: "Abu Dhabi, UAE",
    date: "Oct 05, 2026",
    sector: "Energy"
  }
];

const INITIAL_ALERTS = [
  { id: "al-1", entity: "NVIDIA", count: 3, label: "new stories", active: true },
  { id: "al-2", entity: "India", count: 5, label: "new stories", active: true },
  { id: "al-3", entity: "Semiconductors", count: 7, label: "new stories", active: true }
];

export default function NewsPOCMyNewsHome() {
  // App Personalization States
  const [isPro, setIsPro] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("8 minutes ago");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Followed list
  const [followedSectors, setFollowedSectors] = useState(["Technology", "Manufacturing", "Energy"]);
  const [followedCountries, setFollowedCountries] = useState(["India", "USA", "UAE"]);
  const [followedCompanies, setFollowedCompanies] = useState(["NVIDIA", "Tata Motors", "Microsoft"]);
  const [followedLeaders, setFollowedLeaders] = useState(["Jensen Huang", "Nandan Nilekani", "Shaktikanta Das"]);
  const [followedTopics, setFollowedTopics] = useState(["Sovereign AI", "Semiconductors", "Green Hydrogen"]);

  // Custom Selection Box Toggle
  const [showEditPanel, setShowEditPanel] = useState(false);
  
  // Interactive Preferences Edit Inputs
  const [newSector, setNewSector] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newLeader, setNewLeader] = useState("");

  // Feed Filter States
  const [activeFeedTab, setActiveFeedTab] = useState<"For You" | "Latest" | "Most Relevant" | "Most Read">("For You");
  const [feedArticles, setFeedArticles] = useState(INITIAL_ARTICLES);
  const [selectedFeedFilter, setSelectedFeedFilter] = useState("All");

  // Saved & Read Later tabs state
  const [activeArchiveTab, setActiveArchiveTab] = useState<"Saved" | "Read Later" | "Recently Read">("Saved");
  const [savedArticles, setSavedArticles] = useState([
    { id: "save-1", title: "US-India Critical Technology Agreement Implementation Guidelines", sector: "Technology", country: "USA", date: "Saved 2 days ago" },
    { id: "save-2", title: "Maritime Cargo Tariff Adjustments Across Indo-Pacific Corridors", sector: "Manufacturing", country: "India", date: "Saved 4 days ago" }
  ]);
  const [readLaterArticles, setReadLaterArticles] = useState([
    { id: "rl-1", title: "Sovereign Compute Infrastructure Subsidies In Depth", sector: "Technology", date: "Added 1 day ago" }
  ]);
  const [recentlyReadArticles, setRecentlyReadArticles] = useState([
    { id: "rr-1", title: "Green Hydrogen Electrolyzer Production Capacity Audits", sector: "Energy", date: "Read today" },
    { id: "rr-2", title: "Customs Clearance Automation Blueprints for SAARC Gateways", sector: "Manufacturing", date: "Read yesterday" }
  ]);

  // Alerts
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);

  // Newsletter Subscriptions
  const [newsletterFrequency, setNewsletterFrequency] = useState<"Daily" | "Weekly">("Daily");
  const [subscribedCategories, setSubscribedCategories] = useState<string[]>(["CEOs", "Founders"]);

  // Actions
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      const now = new Date();
      setLastUpdated(`Just now (${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
    }, 800);
  };

  const handleToggleAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, active: !a.active } : a));
  };

  const handleDeleteSaved = (id: string) => {
    setSavedArticles(prev => prev.filter(a => a.id !== id));
  };

  const handleDeleteReadLater = (id: string) => {
    setReadLaterArticles(prev => prev.filter(a => a.id !== id));
  };

  const handleToggleSubscribeCategory = (catName: string) => {
    setSubscribedCategories(prev => 
      prev.includes(catName) ? prev.filter(c => c !== catName) : [...prev, catName]
    );
  };

  // Filtered Articles logic
  const filteredArticles = feedArticles.filter(art => {
    // Search filter
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      if (!art.title.toLowerCase().includes(q) && !art.excerpt.toLowerCase().includes(q) && !art.leader.toLowerCase().includes(q)) {
        return false;
      }
    }
    // Tag filter
    if (selectedFeedFilter !== "All") {
      if (selectedFeedFilter === "Sectors" && !followedSectors.includes(art.sector)) return false;
      if (selectedFeedFilter === "Countries" && !followedCountries.includes(art.country)) return false;
      if (selectedFeedFilter === "Companies" && !followedCompanies.includes(art.company)) return false;
      if (selectedFeedFilter === "Leaders" && !followedLeaders.includes(art.leader)) return false;
      if (selectedFeedFilter === "Topics" && !followedTopics.includes(art.topic)) return false;
    }
    return true;
  });

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-150 min-h-screen pb-16 transition-colors duration-300">
      
      {/* 1. PERSONALIZED WORKSPACE HEADER */}
      <section className="bg-gradient-to-br from-[#0c182b] via-[#12284c] to-[#08152b] text-white relative overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-6 justify-between lg:items-center">
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold bg-blue-600 px-2 py-0.5 rounded uppercase tracking-widest text-white">
                  WORKSPACE
                </span>
                <span className="text-[9px] font-bold text-slate-300">
                  Last updated: {lastUpdated}
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-white">
                Welcome back, Rajesh! 👋
              </h1>
              <p className="text-slate-300 text-xs md:text-sm font-normal max-w-xl leading-relaxed">
                Here's what is happening across the sectors, countries, companies and leaders you follow.
              </p>
            </div>

            {/* Header controls & role toggle */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Role Toggle for interaction demonstration */}
              <button 
                onClick={() => setIsPro(!isPro)} 
                className={`text-[10px] font-bold px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                  isPro 
                    ? "bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-600" 
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                }`}
              >
                <Crown className="h-3 w-3" />
                {isPro ? "Simulating Pro" : "Simulate Pro View"}
              </button>

              <button
                onClick={handleRefresh}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>

              <button
                onClick={() => setShowEditPanel(!showEditPanel)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              >
                <Sliders className="h-3.5 w-3.5" />
                Edit Interests
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* EDIT PREFERENCES TOGGLE PANEL */}
      {showEditPanel && (
        <section className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 transition-all duration-300">
          <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Customize followed entities
              </h3>
              <button onClick={() => setShowEditPanel(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {/* Add Sectors */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Add Sectors</span>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="e.g. Semiconductors"
                    value={newSector}
                    onChange={(e) => setNewSector(e.target.value)}
                    className="w-full text-xs border border-gray-200 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => {
                      if (newSector.trim()) {
                        setFollowedSectors(prev => [...new Set([...prev, newSector.trim()])]);
                        setNewSector("");
                      }
                    }}
                    className="bg-blue-600 text-white p-1.5 rounded text-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Add Countries */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Add Countries</span>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="e.g. Germany"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="w-full text-xs border border-gray-200 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => {
                      if (newCountry.trim()) {
                        setFollowedCountries(prev => [...new Set([...prev, newCountry.trim()])]);
                        setNewCountry("");
                      }
                    }}
                    className="bg-blue-600 text-white p-1.5 rounded text-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Add Companies */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Add Companies</span>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="e.g. Microsoft"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full text-xs border border-gray-200 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => {
                      if (newCompany.trim()) {
                        setFollowedCompanies(prev => [...new Set([...prev, newCompany.trim()])]);
                        setNewCompany("");
                      }
                    }}
                    className="bg-blue-600 text-white p-1.5 rounded text-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Add Leaders */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Add Leaders</span>
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="e.g. Satya Nadella"
                    value={newLeader}
                    onChange={(e) => setNewLeader(e.target.value)}
                    className="w-full text-xs border border-gray-200 dark:border-gray-800 bg-gray-55 dark:bg-gray-900 px-2 py-1 rounded"
                  />
                  <button
                    onClick={() => {
                      if (newLeader.trim()) {
                        setFollowedLeaders(prev => [...new Set([...prev, newLeader.trim()])]);
                        setNewLeader("");
                      }
                    }}
                    className="bg-blue-600 text-white p-1.5 rounded text-xs cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 2. MY INTERESTS BAR */}
      <section className="bg-white dark:bg-[#0c1220] border-b border-gray-200 dark:border-gray-850 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 py-3 lg:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-gray-550 dark:text-gray-400 font-bold shrink-0">
              <Sliders className="h-3.5 w-3.5 text-blue-500" />
              <span>Active Preferences:</span>
            </div>
            
            <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
              {followedSectors.map(s => (
                <span key={s} className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded font-bold text-[10px] border border-blue-100 dark:border-blue-900/40">
                  {s}
                </span>
              ))}
              {followedCountries.map(c => (
                <span key={c} className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded font-bold text-[10px] border border-emerald-100 dark:border-emerald-900/40">
                  {c}
                </span>
              ))}
              {followedCompanies.map(cp => (
                <span key={cp} className="px-2 py-0.5 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 rounded font-bold text-[10px] border border-purple-100 dark:border-purple-900/40">
                  {cp}
                </span>
              ))}
              {followedLeaders.map(l => (
                <span key={l} className="px-2 py-0.5 bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 rounded font-bold text-[10px] border border-amber-100 dark:border-amber-900/40">
                  {l}
                </span>
              ))}
              {followedTopics.map(t => (
                <span key={t} className="px-2 py-0.5 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 rounded font-bold text-[10px] border border-slate-200 dark:border-slate-800">
                  #{t}
                </span>
              ))}
            </div>

            <button 
              onClick={() => setShowEditPanel(true)} 
              className="text-blue-500 font-bold hover:underline shrink-0 text-right cursor-pointer"
            >
              Edit Interests →
            </button>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN WORKSPACE LAYOUT */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 8-COLUMNS: PERSONAL DASHBOARD */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 3. TODAY'S PRIORITY NEWS (Today's Trade Brief) */}
            <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm space-y-4">
              <div>
                <h2 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-blue-500" />
                  Today's Trade Brief
                </h2>
                <p className="text-xs text-gray-550 mt-0.5">The most important developments based on your interests.</p>
              </div>

              <div className="grid grid-cols-1 gap-4 divide-y divide-gray-100 dark:divide-gray-800">
                {INITIAL_ARTICLES.slice(0, 3).map((art, idx) => (
                  <div key={art.id} className={`pt-4 first:pt-0 flex flex-col md:flex-row gap-4 items-start justify-between`}>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-[9px] font-bold text-blue-500 uppercase tracking-widest font-mono">
                        <span>{art.sector}</span>
                        <span>·</span>
                        <span>{art.country}</span>
                        {art.isPremium && <span className="bg-purple-100 dark:bg-purple-950 text-purple-600 px-1 rounded">PRO</span>}
                      </div>
                      <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white leading-snug hover:text-blue-500 transition-colors">
                        <Link href={`/en/news-poc/article/${art.id}`}>{art.title}</Link>
                      </h4>
                      <p className="text-[11px] text-gray-550 leading-normal line-clamp-2 font-normal">
                        {art.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-[10px] text-gray-400">
                        <span>🕒 {art.date}</span>
                        <span>·</span>
                        <span>{art.readTime}</span>
                      </div>
                    </div>
                    <Link
                      href={`/en/news-poc/article/${art.id}`}
                      className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-bold text-[10px] px-3.5 py-1.5 rounded-lg border border-blue-100 dark:border-blue-900/40 transition-all shrink-0 hover:bg-blue-600 hover:text-white"
                    >
                      Read Story →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. MY NEWS STATS ROW */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { val: "24", label: "News Read", icon: Eye, color: "text-blue-500", bg: "bg-blue-50/40 dark:bg-blue-950/10" },
                { val: `${savedArticles.length}`, label: "Saved Bookmarks", icon: Bookmark, color: "text-emerald-500", bg: "bg-emerald-50/40 dark:bg-emerald-950/10" },
                { val: `${followedSectors.length + followedCountries.length + followedCompanies.length}`, label: "Following", icon: User, color: "text-purple-500", bg: "bg-purple-50/40 dark:bg-purple-950/10" },
                { val: "5 Days", label: "Streak 🔥", icon: Flame, color: "text-amber-500", bg: "bg-amber-50/40 dark:bg-amber-950/10" }
              ].map((stat, idx) => {
                const SIcon = stat.icon;
                return (
                  <div key={idx} className={`${stat.bg} border border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-center space-y-1`}>
                    <SIcon className={`h-4.5 w-4.5 mx-auto ${stat.color}`} />
                    <div className="font-display text-xl font-bold text-gray-900 dark:text-white">{stat.val}</div>
                    <span className="text-[9px] text-gray-450 font-bold uppercase tracking-wider block">{stat.label}</span>
                  </div>
                );
              })}
            </div>

            {/* 10. AI DAILY BRIEF (PRO PREVIEW / FULL ACCORDING TO SIMULATED ENTITLEMENTS) */}
            <div className="bg-gradient-to-br from-[#0c1a2e] to-[#142d52] text-white p-6 rounded-3xl border border-blue-900/60 shadow-md space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4.5 w-4.5 text-amber-400 animate-pulse" />
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider">AI Daily Brief</h3>
                </div>
                {isPro ? (
                  <span className="bg-amber-500 text-slate-950 text-[8px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    PRO Activated
                  </span>
                ) : (
                  <span className="bg-slate-700/60 text-slate-300 text-[8px] font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
                    <Lock className="h-2 w-2" /> Free Tier Preview
                  </span>
                )}
              </div>

              {/* AI Brief Content */}
              <div className="space-y-4 relative z-10 text-xs font-normal">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
                  <span className="text-[9px] font-bold text-blue-300 uppercase tracking-widest block font-mono">Today's Summary</span>
                  <p className="text-slate-200 leading-relaxed font-serif italic">
                    "AI Summary shows Tata-NVIDIA expanding sovereign compute targets, while green hydrogen electrolyzer test rates drop below target operational costs."
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">1. Technology infrastructure capital allocations spike</span>
                      <span className="text-slate-300">Tata Sons pledges $10B semiconductor assembler expansion in Gujarat.</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-start gap-2.5">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-white block">2. Green Hydrogen corridors decrease transaction latency</span>
                      <span className="text-slate-300">Fast-tracked electrolyzer deployments targeted for sub-$1 benchmark.</span>
                    </div>
                  </div>
                </div>

                {/* Locked / Unlocked Segment */}
                {isPro ? (
                  <div className="space-y-3 pt-2 border-t border-white/10">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block font-mono">Why It Matters</span>
                      <p className="text-slate-300 leading-relaxed">
                        These movements directly mitigate single-region semiconductor dependencies and minimize transaction latencies for digital supply chains.
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-blue-300 uppercase tracking-wider block font-mono">What to Watch</span>
                      <p className="text-slate-300 leading-relaxed">
                        Additional sovereign bilateral agreements are expected during the upcoming G20 nodes in Singapore.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-white/10 space-y-3">
                    <div className="relative p-4 bg-slate-950/60 rounded-xl border border-white/5 text-center space-y-3">
                      <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-xs rounded-xl flex items-center justify-center" />
                      
                      <div className="relative z-10 space-y-2">
                        <Lock className="h-6 w-6 text-amber-400 mx-auto" />
                        <h4 className="font-bold text-white text-xs">Unlock "Why It Matters" & "What to Watch"</h4>
                        <p className="text-slate-400 text-[10px] max-w-sm mx-auto">
                          Get full AI analysis of policy implications and predictions customized for your industry profile.
                        </p>
                        <button 
                          onClick={() => setIsPro(true)} 
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-md cursor-pointer inline-block"
                        >
                          Unlock AI Briefing with Pro
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* 5. PERSONALIZED NEWS FEED */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Latest For You
                </h2>
                
                {/* Controls (For You / Latest / Most Relevant / Most Read) */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {(["For You", "Latest", "Most Relevant", "Most Read"] as const).map((feedTab) => (
                    <button
                      key={feedTab}
                      onClick={() => setActiveFeedTab(feedTab)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                        activeFeedTab === feedTab
                          ? "bg-blue-600 text-white"
                          : "bg-gray-155 dark:bg-gray-900 text-gray-500 hover:text-blue-500"
                      }`}
                    >
                      {feedTab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inline Filters */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] bg-gray-55 dark:bg-gray-905 p-2 rounded-xl border border-gray-200 dark:border-gray-800">
                <span className="text-gray-400 font-bold uppercase tracking-wider text-[9px] mr-1.5 flex items-center gap-1">
                  <Filter className="h-3 w-3 text-blue-500" /> Filter Feed:
                </span>
                {["All", "Sectors", "Countries", "Companies", "Leaders", "Topics"].map((filt) => (
                  <button
                    key={filt}
                    onClick={() => setSelectedFeedFilter(filt)}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-all ${
                      selectedFeedFilter === filt
                        ? "bg-gray-200 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-bold"
                        : "text-gray-550 dark:text-gray-400 hover:text-blue-500"
                    }`}
                  >
                    {filt}
                  </button>
                ))}
              </div>

              {/* Search Bar inside Feed to quickly filter */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles matching followed topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-850 rounded-2xl pl-10 pr-4 py-2.5 text-xs outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Feed Card Grid */}
              <div className="grid grid-cols-1 gap-6">
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((art) => (
                    <div 
                      key={art.id} 
                      className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md flex flex-col md:flex-row gap-6 p-5"
                    >
                      <div 
                        className="w-full md:w-44 h-32 md:h-full bg-cover bg-center rounded-2xl shrink-0 border border-gray-100 dark:border-gray-850"
                        style={{ backgroundImage: `url(${art.image})` }}
                      />
                      
                      <div className="flex-1 flex flex-col justify-between space-y-3 min-w-0">
                        <div className="space-y-1.5">
                          {/* 9. BECAUSE YOU FOLLOW context badges */}
                          <div className="flex items-center justify-between text-[9px] font-bold font-mono">
                            <span className="text-blue-500 uppercase tracking-widest">{art.sector} · {art.country}</span>
                            <span className="bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded font-mono">
                              💡 {art.reason}
                            </span>
                          </div>

                          <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug hover:text-blue-500 transition-colors">
                            <Link href={`/en/news-poc/article/${art.id}`}>{art.title}</Link>
                          </h4>
                          
                          <p className="text-[11px] text-gray-550 leading-relaxed font-normal">
                            {art.excerpt}
                          </p>
                        </div>

                        {/* Card interactions */}
                        <div className="pt-2 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                          <div className="flex items-center gap-4">
                            <span>🕒 {art.date}</span>
                            <span>·</span>
                            <span>{art.readTime}</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <button className="hover:text-blue-500 transition-colors cursor-pointer" title="Save to bookmarks">
                              <Bookmark className="h-3.5 w-3.5" />
                            </button>
                            <button className="hover:text-red-500 transition-colors cursor-pointer" title="Like">
                              <ThumbsUp className="h-3.5 w-3.5" />
                            </button>
                            <button className="hover:text-blue-500 transition-colors cursor-pointer" title="Share link">
                              <Share2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-850 p-6 space-y-3">
                    <Sliders className="h-8 w-8 text-gray-400 mx-auto" />
                    <h4 className="font-bold text-gray-900 dark:text-white text-xs">No articles match your active filter</h4>
                    <p className="text-gray-500 text-[10px] max-w-xs mx-auto font-normal">
                      Try updating your active preferences or clearing the active filter.
                    </p>
                    <button 
                      onClick={() => { setSelectedFeedFilter("All"); setSearchQuery(""); }} 
                      className="bg-blue-600 text-white font-bold text-xs px-3.5 py-1.5 rounded-lg cursor-pointer"
                    >
                      Clear Filter
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 11. SAVED & READ LATER */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                  <Bookmark className="h-4 w-4 text-emerald-500" />
                  Saved & Read Later
                </span>

                <div className="flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800">
                  {(["Saved", "Read Later", "Recently Read"] as const).map((rTab) => (
                    <button
                      key={rTab}
                      onClick={() => setActiveArchiveTab(rTab)}
                      className={`px-2.5 py-1 rounded-md text-[9px] font-bold transition-all cursor-pointer ${
                        activeArchiveTab === rTab
                          ? "bg-blue-600 text-white shadow-xs"
                          : "text-gray-550 hover:text-blue-500"
                      }`}
                    >
                      {rTab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab views */}
              <div className="grid grid-cols-1 gap-3">
                {activeArchiveTab === "Saved" && (
                  savedArticles.length > 0 ? (
                    savedArticles.map((art) => (
                      <div key={art.id} className="p-3 bg-gray-55 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-gray-400 font-mono">{art.sector} · {art.country}</span>
                          <h5 className="text-xs font-bold text-gray-950 dark:text-white hover:text-blue-500 transition-colors">
                            <Link href="/en/news-poc/headlines">{art.title}</Link>
                          </h5>
                          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold block">{art.date}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteSaved(art.id)} 
                          className="p-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-400 hover:text-red-500 cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-gray-500 py-3 text-center">No saved articles in your library.</p>
                  )
                )}

                {activeArchiveTab === "Read Later" && (
                  readLaterArticles.length > 0 ? (
                    readLaterArticles.map((art) => (
                      <div key={art.id} className="p-3 bg-gray-55 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-gray-400 font-mono">{art.sector}</span>
                          <h5 className="text-xs font-bold text-gray-950 dark:text-white hover:text-blue-500 transition-colors">
                            <Link href="/en/news-poc/headlines">{art.title}</Link>
                          </h5>
                          <span className="text-[9px] text-blue-600 dark:text-blue-450 font-bold block">{art.date}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteReadLater(art.id)} 
                          className="p-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-205 border-gray-200 dark:border-gray-800 text-gray-400 hover:text-red-500 cursor-pointer"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-[10px] text-gray-500 py-3 text-center">No articles marked for later.</p>
                  )
                )}

                {activeArchiveTab === "Recently Read" && (
                  recentlyReadArticles.map((art) => (
                    <div key={art.id} className="p-3 bg-gray-55 dark:bg-gray-900/60 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-gray-400 font-mono">{art.sector}</span>
                        <h5 className="text-xs font-bold text-gray-955 dark:text-white hover:text-blue-500 transition-colors">
                          <Link href="/en/news-poc/headlines">{art.title}</Link>
                        </h5>
                        <span className="text-[9px] text-gray-500 font-bold block">{art.date}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* 14. PERSONAL NEWS BRIEFING (Newsletter Control) */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div>
                <h4 className="text-xs font-bold text-gray-905 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                  <Mail className="h-4 w-4 text-blue-500" />
                  Your Daily Trade Brief
                </h4>
                <p className="text-[11px] text-gray-500 mt-1">
                  Receive curated weekly intelligence briefings for followed sectors, countries, companies and leaders.
                </p>
              </div>

              {/* Frequency selection */}
              <div className="flex gap-2">
                {(["Daily", "Weekly"] as const).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setNewsletterFrequency(freq)}
                    className={`px-3 py-1 text-[10px] font-bold rounded-lg border transition-all cursor-pointer ${
                      newsletterFrequency === freq
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white dark:bg-gray-905 border-gray-200 dark:border-gray-800 text-gray-555"
                    }`}
                  >
                    {freq} Briefing
                  </button>
                ))}
              </div>

              {/* Checkbox selector */}
              <div className="grid grid-cols-2 gap-1.5 text-[11px] pt-1">
                {["CEOs", "Founders", "Tech Leaders", "Finance Leaders", "Board Moves"].map((catName) => {
                  const isChecked = subscribedCategories.includes(catName);
                  return (
                    <button
                      key={catName}
                      onClick={() => handleToggleSubscribeCategory(catName)}
                      className={`px-2.5 py-1.5 rounded-lg border text-left flex items-center gap-1.5 transition-all w-full cursor-pointer ${
                        isChecked 
                          ? "bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold"
                          : "bg-gray-55 dark:bg-gray-905 border-gray-200 dark:border-gray-800 text-gray-655 dark:text-gray-400"
                      }`}
                    >
                      <span className={`h-2.5 w-2.5 rounded-full ${isChecked ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'}`} />
                      {catName}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => alert(`Curated Trade Briefing frequency updated to ${newsletterFrequency}!`)}
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Set My Briefing
              </button>
            </div>

          </div>

          {/* RIGHT 4-COLUMNS: SIDEBAR WIDGETS */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* 08. MY ALERTS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                  <Bell className="h-4 w-4 text-amber-500" />
                  My Alerts
                </span>
                <span className="text-[9px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-300 px-2 py-0.5 rounded">
                  Spikes Monitored
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {alerts.map((alertItem) => (
                  <div 
                    key={alertItem.id}
                    className={`p-2.5 bg-gray-55 dark:bg-gray-905 rounded-xl border flex items-center justify-between transition-all ${
                      alertItem.active ? 'border-amber-400/50' : 'border-gray-200 dark:border-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono ${
                        alertItem.active ? 'bg-amber-500/25 text-amber-650' : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                      }`}>
                        {alertItem.entity}
                      </span>
                      <span className="text-[10px] text-gray-500 font-normal">
                        {alertItem.count} {alertItem.label}
                      </span>
                    </div>

                    <button 
                      onClick={() => handleToggleAlert(alertItem.id)}
                      className="text-gray-400 hover:text-gray-600 cursor-pointer"
                    >
                      {alertItem.active ? <Bell className="h-3.5 w-3.5 text-amber-500" /> : <BellOff className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 06. TRENDING IN MY INTERESTS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-3">
              <span className="text-xs font-bold text-gray-905 dark:text-white uppercase tracking-wider block font-display">
                Trending In Your Interests
              </span>
              <p className="text-[10px] text-gray-555 font-normal">
                Click topics spiking in volume among followed entities to filter:
              </p>
              
              <div className="flex flex-wrap gap-1.5">
                {["Sovereign AI", "EV Batteries", "Semiconductors", "Green Hydrogen", "Trade Corridors"].map((trendTopic) => {
                  const isActive = searchQuery.toLowerCase() === trendTopic.toLowerCase();
                  return (
                    <button
                      key={trendTopic}
                      onClick={() => setSearchQuery(isActive ? "" : trendTopic)}
                      className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all border cursor-pointer ${
                        isActive 
                          ? "bg-blue-600 border-blue-600 text-white"
                          : "bg-gray-55 dark:bg-gray-905 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-500"
                      }`}
                    >
                      🔥 #{trendTopic}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 12. RECOMMENDED REPORTS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <span className="text-xs font-bold text-gray-905 dark:text-white uppercase tracking-wider font-display">
                  Recommended Reports
                </span>
              </div>

              <div className="space-y-3">
                {RECOMMENDED_REPORTS.map((rep) => (
                  <div key={rep.id} className="p-3 bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-800 space-y-2">
                    <div className="flex items-center justify-between text-[9px] font-bold text-gray-400 font-mono">
                      <span>{rep.topic}</span>
                      {rep.isPremium ? (
                        <span className="text-purple-600 font-bold uppercase tracking-wider flex items-center gap-0.5">
                          <Lock className="h-2.5 w-2.5" /> PRO
                        </span>
                      ) : (
                        <span className="text-emerald-500 font-bold uppercase">Free</span>
                      )}
                    </div>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{rep.title}</h5>
                    <p className="text-[10px] text-gray-500 leading-normal font-normal">{rep.desc}</p>
                    
                    <div className="pt-2 border-t border-gray-200/50 dark:border-gray-800">
                      {rep.isPremium && !isPro ? (
                        <button
                          onClick={() => setIsPro(true)}
                          className="w-full text-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[9px] py-1.5 rounded-lg transition-all block cursor-pointer"
                        >
                          Unlock Report with Pro →
                        </button>
                      ) : (
                        <Link
                          href="/en/news-poc/headlines"
                          className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] py-1.5 rounded-lg transition-all block"
                        >
                          Download Report →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 13. EVENTS FOR YOU */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-855 pb-3">
                <span className="text-xs font-bold text-gray-905 dark:text-white uppercase tracking-wider font-display">
                  Events For You
                </span>
              </div>

              <div className="space-y-3">
                {EVENTS_FOR_YOU.map((ev) => (
                  <div key={ev.id} className="p-3 bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest block font-mono">{ev.sector}</span>
                      <h5 className="text-xs font-bold text-gray-905 dark:text-white leading-tight">{ev.title}</h5>
                      <span className="text-[9px] text-gray-500 block">🕒 {ev.date} · {ev.location}</span>
                    </div>
                    <Link
                      href="/en/news-poc/headlines"
                      className="p-1.5 bg-white dark:bg-gray-905 border border-gray-200 dark:border-gray-800 text-gray-400 hover:text-blue-500 rounded-lg cursor-pointer"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* 07. MY FOLLOWING */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-3">
              <span className="text-xs font-bold text-gray-905 dark:text-white uppercase tracking-wider block font-display border-b border-gray-100 dark:border-gray-808 pb-3">
                My Following Entities
              </span>
              
              <div className="space-y-2">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">Sectors ({followedSectors.length})</span>
                  <div className="flex flex-wrap gap-1">
                    {followedSectors.map(s => (
                      <span key={s} className="bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-808 text-gray-655 dark:text-gray-404 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">Countries ({followedCountries.length})</span>
                  <div className="flex flex-wrap gap-1">
                    {followedCountries.map(c => (
                      <span key={c} className="bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-808 text-gray-655 dark:text-gray-404 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest font-mono">Companies ({followedCompanies.length})</span>
                  <div className="flex flex-wrap gap-1">
                    {followedCompanies.map(c => (
                      <span key={c} className="bg-gray-55 dark:bg-gray-905 border border-gray-200 dark:border-gray-808 text-gray-655 dark:text-gray-404 text-[9px] font-bold px-1.5 py-0.5 rounded">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 15. PREMIUM UPGRADE CARD */}
            <div className="bg-gradient-to-br from-[#0c1424] to-[#162136] border border-slate-800 text-white p-6 rounded-3xl shadow-sm space-y-4">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Unlock Your Full News Workspace
                </span>
                <h4 className="font-display text-sm md:text-base font-bold text-white mt-1">
                  Upgrade to Reader Pro & Corporate Intelligence
                </h4>
              </div>
              
              <div className="space-y-1.5 text-xs text-slate-300">
                {[
                  "Unlimited personalized news",
                  "AI Daily Brief",
                  "Advanced alerts",
                  "Premium reports",
                  "Advanced personalization",
                  "Deeper news analysis"
                ].map(b => (
                  <div key={b} className="flex items-center gap-2">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-2">
                <button
                  onClick={() => setIsPro(true)}
                  className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-sm cursor-pointer"
                >
                  Upgrade to Reader Pro ($19/mo) →
                </button>
                <Link
                  href="/en/news-poc/headlines"
                  className="block w-full text-center bg-white/10 hover:bg-white/20 text-slate-300 font-bold text-xs py-2.5 rounded-xl transition-colors"
                >
                  Explore Enterprise →
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

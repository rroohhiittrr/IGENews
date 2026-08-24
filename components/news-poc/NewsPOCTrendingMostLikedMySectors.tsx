"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Sparkles, Share2, Lock, ChevronRight, Search, AlertTriangle, 
  CheckCircle, ThumbsUp, Bookmark, MessageCircle, ArrowLeft, X, HelpCircle
} from "lucide-react";
import { IGEN_50_SECTORS } from "./igenTaxonomyData";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  sectorCode: string;
  sectorName: string;
  country: string;
  date: string;
  likes: number;
  shares: number;
  comments: number;
  views: number;
  isTrending: boolean;
  sponsored: boolean;
  author: string;
  role: string;
  image: string;
  companyName?: string;
  topic: string;
  whyTrending?: string;
  sentiment?: number;
  timestamp: "now" | "today" | "week" | "month";
}

interface TopicCluster {
  name: string;
  count: number;
  sector: string;
  engagement: string;
  update: string;
}

interface ExpertComment {
  name: string;
  role: string;
  text: string;
}

// B2B trending stories list
const MOCK_TRENDING_ARTICLES: Article[] = [
  {
    id: "tl-my-1",
    title: "AI Chip Manufacturing Investment Reaches New Milestone in Silicon Corridor",
    excerpt: "NVIDIA and global foundries scale high-density substrate packaging capabilities under new bilateral subsidies. Clean room logistics volumes swell by 45%.",
    sectorCode: "S16",
    sectorName: "Electronics & IT & Components",
    country: "India-Taiwan Bilateral",
    date: "2 hrs ago",
    likes: 14200,
    shares: 4800,
    comments: 240,
    views: 89000,
    isTrending: true,
    sponsored: false,
    author: "Jensen Huang",
    role: "CEO, NVIDIA",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    topic: "AI Investment",
    whyTrending: "This story is receiving increased engagement across the Technology sector following the company's hardware announcement.",
    sentiment: 92,
    timestamp: "now"
  },
  {
    id: "tl-my-2",
    title: "Green Steel Hydrogen Facility Secures €2B Initial Funding Framework",
    excerpt: "New solar grid interconnectivity standard enables remote clean energy hubs to feed metallurgy plants directly, reducing grid tax premiums by 18%.",
    sectorCode: "S17",
    sectorName: "Energy & Sustainability",
    country: "India-Germany Bilateral",
    date: "4 hrs ago",
    likes: 11800,
    shares: 3200,
    comments: 180,
    views: 72000,
    isTrending: true,
    sponsored: false,
    author: "Elena Rostova",
    role: "Energy Policy Lead",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Renewable Energy Policy",
    whyTrending: "This article has gone viral due to high engagement on bilateral clean fuel incentives.",
    sentiment: 85,
    timestamp: "today"
  },
  {
    id: "tl-my-3",
    title: "Active Pharma Ingredients (API) Bulk Manufacturing Parks Open",
    excerpt: "New clinical compliance standards and supply chain clusters lower import dependency by 28%, securing raw materials inventory buffers.",
    sectorCode: "S23",
    sectorName: "Health & Family Welfare & Pharma",
    country: "Domestic Trade",
    date: "6 hrs ago",
    likes: 9700,
    shares: 2100,
    comments: 110,
    views: 54000,
    isTrending: true,
    sponsored: false,
    author: "Priya Sundaram",
    role: "Trade Analyst",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Pharma Supply Chain",
    whyTrending: "Increased discussion volumes on medical self-reliance policies.",
    sentiment: 78,
    timestamp: "week"
  },
  {
    id: "tl-my-4",
    title: "GIFT City Offshore Banking Assets Grow 35% in Q1 Trade Surge",
    excerpt: "Trade clearance volumes peak under revised bilateral CEPA agreements, accelerating export clearance financing approvals.",
    sectorCode: "S41",
    sectorName: "Banking & Financial Services (BFSI)",
    country: "India-UAE Bilateral",
    date: "12 hrs ago",
    likes: 8500,
    shares: 1900,
    comments: 98,
    views: 48000,
    isTrending: true,
    sponsored: false,
    author: "Rajesh Kumar",
    role: "Finance Correspondent",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&auto=format&fit=crop&q=80",
    topic: "Bilateral Trade Expansion",
    whyTrending: "Surging trade volume under CEPA agreements triggers high banking interest.",
    sentiment: 74,
    timestamp: "week"
  },
  {
    id: "tl-my-5",
    title: "Next-Gen Commercial EV Battery Interoperability Protocol Approved",
    excerpt: "Ministry of Heavy Industries releases specs for swap charging, reducing infrastructure deployment cost by 22%.",
    sectorCode: "S45",
    sectorName: "Automotive & Electric Vehicles",
    country: "Domestic Trade",
    date: "1 day ago",
    likes: 7200,
    shares: 1600,
    comments: 85,
    views: 41000,
    isTrending: true,
    sponsored: true,
    author: "Julian Vance",
    role: "CEO Nexus Dynamics",
    image: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Electric Vehicle Growth",
    whyTrending: "This is a sponsored research briefing covering standardization of heavy machinery batteries.",
    sentiment: 68,
    timestamp: "month"
  }
];

// Topic Clusters
const TOPIC_CLUSTERS: TopicCluster[] = [
  { name: "AI Investment", count: 14, sector: "Electronics & IT", engagement: "High", update: "10m ago" },
  { name: "Renewable Energy Policy", count: 21, sector: "Energy & Clean Tech", engagement: "Very High", update: "1h ago" },
  { name: "Pharma Supply Chain", count: 11, sector: "Healthcare", engagement: "Medium", update: "3h ago" },
  { name: "Electric Vehicle Growth", count: 18, sector: "Automotive", engagement: "High", update: "1d ago" }
];

// Experts Comments
const MOCK_EXPERT_COMMENTS: ExpertComment[] = [
  { 
    name: "Dr. Ramesh Nair", 
    role: "Agri Policy Expert", 
    text: "AI drone integration is lowering water waste profiles across rural areas by 38%." 
  },
  { 
    name: "Sonia Marchetti", 
    role: "Sourcing Counsel", 
    text: "HS code adjustments under CEPA require early Form-A certification to claim duty drops." 
  }
];

interface Props {
  onBack?: () => void;
}

export default function NewsPOCTrendingMostLikedMySectors({ onBack }: Props) {
  // Sector preferences management
  const [mySectorCodes, setMySectorCodes] = useState<string[]>(["S16", "S17", "S23", "S41", "S45"]);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [activeTimeRange, setActiveTimeRange] = useState<"now" | "today" | "week" | "month">("now");
  const [searchQuery, setSearchQuery] = useState("");
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [subscribedNewsletter, setSubscribedNewsletter] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [alertConfirmed, setAlertConfirmed] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  
  // CRM leads simulation
  const [enquiryCompany, setEnquiryCompany] = useState<string | null>(null);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Dynamic comment previews list
  const [commentsMap, setCommentsMap] = useState<Record<string, { author: string; text: string }[]>>({
    "tl-my-1": [
      { author: "Vivek Murthy", text: "Substrate packaging in Tamil Nadu is showing real progress." }
    ],
    "tl-my-2": [
      { author: "Devika Sharma", text: "Bilateral green corridors will accelerate solar deployment indices." }
    ]
  });
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleLike = (id: string) => {
    if (likedArticles.includes(id)) {
      setLikedArticles(prev => prev.filter(a => a !== id));
      showToast("Removed like from story");
    } else {
      setLikedArticles(prev => [...prev, id]);
      showToast("Story liked! ❤️");
    }
  };

  const handleBookmark = (id: string) => {
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles(prev => prev.filter(a => a !== id));
      showToast("Removed from My Saved News");
    } else {
      setBookmarkedArticles(prev => [...prev, id]);
      showToast("Saved to My Saved News ✓");
    }
  };

  const handleAddComment = (id: string) => {
    const text = newCommentText[id];
    if (!text || !text.trim()) return;
    setCommentsMap(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { author: "You (Executive)", text: text.trim() }]
    }));
    setNewCommentText(prev => ({ ...prev, [id]: "" }));
    showToast("Comment published to discussion thread");
  };

  // Filtered stories mapping
  const filteredStories = MOCK_TRENDING_ARTICLES.filter(art => {
    // Sector filter
    const matchesPreferred = mySectorCodes.includes(art.sectorCode);
    if (!matchesPreferred) return false;
    
    const matchesSectorPill = selectedSectorFilter === "all" || art.sectorCode === selectedSectorFilter;
    
    // Search filter
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
                          
    // Time filter
    const matchesTime = activeTimeRange === "now" || art.timestamp === activeTimeRange;

    return matchesSectorPill && matchesSearch && matchesTime;
  });

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
      
      {/* ─── Breadcrumb ─── */}
      <nav className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 text-xs text-gray-400 font-semibold flex items-center gap-1.5">
        {onBack && (
          <button onClick={onBack} className="mr-2 hover:text-blue-500 flex items-center gap-1">
            <ArrowLeft className="h-3.5 w-3.5" /> Back
          </button>
        )}
        <span>Trending</span>
        <ChevronRight className="h-3 w-3" />
        <span>Most Liked</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-blue-500 font-bold">My Sectors</span>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xs">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                <Sparkles className="h-2.5 w-2.5" /> AI Trend Intelligence Pro
              </span>
              <button 
                onClick={() => setShowHowItWorks(!showHowItWorks)}
                className="text-[10px] text-gray-400 hover:underline flex items-center gap-0.5"
              >
                <HelpCircle className="h-3.5 w-3.5" /> How Trending Works
              </button>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Most Liked News in My Sectors
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
              Real-time leaderboard detailing the most-liked trade and business stories from your selected industries.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <Link 
              href="/en/news-poc/trending/most-liked/all"
              className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-gray-800 hover:bg-gray-100 text-gray-700 dark:text-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-3xs"
            >
              Explore All Sectors →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works banner */}
      {showHowItWorks && (
        <section className="mx-auto max-w-7xl px-4 pt-4 lg:px-6">
          <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200/50 dark:border-blue-900/40 p-4 rounded-2xl text-xs space-y-1">
            <h4 className="font-bold text-blue-900 dark:text-blue-200">How iGEN Trending Rankings Work</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              Our organic algorithm ranks stories using actual client-side signals: <strong>likes count, share volume, comments frequency, and reading recency</strong>. Paid sector promotions or sponsored slots are marked separately and do not influence organic list rankings.
            </p>
          </div>
        </section>
      )}

      {/* Empty preference fallback warning */}
      {mySectorCodes.length === 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <div className="border border-dashed border-gray-300 dark:border-gray-800 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto animate-bounce" />
            <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase">No Sector Preferences Configured</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
              Choose the sectors you care about to personalize your trending news feed and begin discovering bilateral trade intelligence.
            </p>
            <button 
              onClick={() => setIsManageModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl transition-all"
            >
              Select My Sectors
            </button>
          </div>
        </section>
      )}

      {mySectorCodes.length > 0 && (
        <>
          {/* ─── My Sector Selector Chips ─── */}
          <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full text-xs">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">My Sectors:</span>
                <button 
                  onClick={() => setSelectedSectorFilter("all")}
                  className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all shrink-0 ${
                    selectedSectorFilter === "all"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-600"
                  }`}
                >
                  All My Sectors
                </button>
                {mySectorCodes.map(code => {
                  const sMatch = IGEN_50_SECTORS.find(s => s.code === code);
                  if (!sMatch) return null;
                  return (
                    <button
                      key={code}
                      onClick={() => setSelectedSectorFilter(code)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold transition-all shrink-0 flex items-center gap-1 ${
                        selectedSectorFilter === code
                          ? "bg-blue-600 text-white shadow-xs"
                          : "bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-505"
                      }`}
                    >
                      <span>{sMatch.icon}</span>
                      <span>{sMatch.name.split(" & ")[0]}</span>
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => setIsManageModalOpen(true)}
                className="text-[10px] font-bold text-blue-505 hover:underline tracking-wider uppercase shrink-0"
              >
                + Manage My Sectors
              </button>
            </div>
          </section>

          {/* ─── Trending Overview Dashboard ─── */}
          <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
            <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">What's Trending in Your Sectors?</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { title: "MOST LIKED", label: "AI chip manufacturing", metric: "14.2K Likes", sec: "Electronics", color: "border-blue-500/20" },
                { title: "FASTEST RISING", label: "EV charging plazas", metric: "+140% Velocity", sec: "Automotive", color: "border-emerald-500/20" },
                { title: "MOST DISCUSSED", label: "Carbon tax border dispute", metric: "940 Comments", sec: "Compliance", color: "border-purple-500/20" },
                { title: "MOST SHARED", label: "Da Nang re-routing", metric: "4.8K Shares", sec: "Logistics", color: "border-orange-500/20" },
                { title: "MOST ACTIVE SECTOR", label: "Semiconductors & OSAT", metric: "12 Stories", sec: "High Activity", color: "border-pink-500/20" }
              ].map((item, idx) => (
                <div key={idx} className={`bg-white dark:bg-[#0f172a] border ${item.color} p-4 rounded-xl shadow-3xs flex flex-col justify-between min-h-[96px]`}>
                  <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-wider">{item.title}</span>
                  <div className="my-1.5">
                    <p className="text-[10px] font-bold text-gray-900 dark:text-white line-clamp-1 leading-tight">{item.label}</p>
                    <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 block mt-0.5">{item.metric}</span>
                  </div>
                  <span className="text-[8px] font-mono text-gray-400">{item.sec}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Hero Most-Liked Story ─── */}
          {filteredStories.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[380px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center group-hover:scale-102 transition-transform duration-350"
                  style={{ backgroundImage: `url(${filteredStories[0].image})` }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                
                {/* Metrics pill */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" /> {(filteredStories[0].likes / 1000).toFixed(1)}K
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Share2 className="h-3 w-3" /> {(filteredStories[0].shares / 1000).toFixed(1)}K
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" /> {filteredStories[0].comments}
                  </span>
                </div>

                <div className="relative z-10 space-y-4 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#E63946] text-white text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider block w-max">
                      #1 MOST LIKED
                    </span>
                    <span className="bg-white/10 text-white text-[9px] font-bold px-2.5 py-0.5 rounded backdrop-blur-xs uppercase">
                      {filteredStories[0].sectorName}
                    </span>
                    <span className="text-slate-400 text-[10px] font-semibold">{filteredStories[0].country} • {filteredStories[0].date}</span>
                  </div>
                  
                  <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight text-[#FEC970]">
                    {filteredStories[0].title}
                  </h2>
                  <p className="text-slate-300 text-xs md:text-sm font-normal leading-relaxed max-w-xl">
                    {filteredStories[0].excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link 
                      href={`/en/news-poc/article/${filteredStories[0].id}`}
                      className="bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                    >
                      Read Full Story →
                    </Link>
                    <button 
                      onClick={() => showToast(`Following topic: ${filteredStories[0].topic}`)}
                      className="border border-white/20 hover:bg-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                    >
                      + Follow Topic
                    </button>
                    {filteredStories[0].companyName && (
                      <button 
                        onClick={() => setEnquiryCompany(filteredStories[0].companyName || null)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                      >
                        View Company
                      </button>
                    )}
                    <button 
                      onClick={() => handleBookmark(filteredStories[0].id)}
                      className={`p-2.5 rounded-xl border border-white/20 transition-all ${
                        bookmarkedArticles.includes(filteredStories[0].id)
                          ? "bg-amber-500 text-gray-955 border-amber-500"
                          : "hover:bg-white/10 text-white"
                      }`}
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ─── Main Two Columns Grid ─── */}
          <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left main column (Ranked stories feed & secondary tables) */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Dynamic Filters header bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-3">
                  <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Most Liked Stories
                  </h3>
                  
                  {/* Time Range selection pills */}
                  <div className="flex bg-gray-100 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-250 dark:border-gray-800">
                    {([
                      { key: "now", label: "Trending Now" },
                      { key: "today", label: "Today" },
                      { key: "week", label: "This Week" },
                      { key: "month", label: "This Month" }
                    ] as const).map(pill => (
                      <button
                        key={pill.key}
                        onClick={() => setActiveTimeRange(pill.key)}
                        className={`px-3 py-1 text-[9px] font-bold rounded-md transition-all uppercase ${
                          activeTimeRange === pill.key
                            ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-white shadow-2xs"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {pill.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ranked Articles Stream */}
                {filteredStories.length === 0 ? (
                  <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-8 rounded-2xl text-center space-y-2">
                    <p className="text-xs text-gray-500 font-semibold">No highly engaging stories are available under this selection right now.</p>
                    <button 
                      onClick={() => { setSelectedSectorFilter("all"); setActiveTimeRange("now"); setSearchQuery(""); }}
                      className="text-xs text-blue-500 font-bold hover:underline"
                    >
                      Explore All Trending
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredStories.map((story, idx) => (
                      <div key={story.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs hover:shadow-md transition-all flex gap-4 group">
                        <span className="font-display text-3xl font-extrabold text-gray-200 dark:text-gray-800 group-hover:text-blue-500 transition-colors w-8 text-center shrink-0 leading-none pt-0.5">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        
                        <div className="flex-1 space-y-2.5">
                          <div className="flex justify-between items-start flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase ${
                                story.sponsored 
                                  ? "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400"
                                  : "bg-blue-50 text-blue-600 dark:bg-blue-950/20"
                              }`}>
                                {story.sponsored ? "Sponsored Content" : "Highly Liked"}
                              </span>
                              {story.sponsored && (
                                <span className="text-[7px] font-bold text-amber-500 border border-amber-200 px-1 py-0.5 rounded uppercase tracking-wider font-mono">SPONSORED</span>
                              )}
                            </div>
                            <span className="text-[9px] font-bold text-gray-400">{story.sectorName}</span>
                          </div>

                          <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">
                            {story.title}
                          </h4>
                          <p className="text-xs text-gray-505 leading-relaxed font-normal">
                            {story.excerpt}
                          </p>

                          <div className="flex flex-wrap items-center gap-3 text-[9px] text-gray-500 font-semibold pt-1 border-b border-gray-50 dark:border-gray-800 pb-2">
                            <span>Author: {story.author}</span>
                            <span>•</span>
                            <span>{story.role}</span>
                            <span>•</span>
                            <span>{story.date}</span>
                            <span>•</span>
                            <span>{story.country}</span>
                          </div>

                          {/* Actions bar */}
                          <div className="flex items-center justify-between pt-1 text-[10px]">
                            <div className="flex items-center gap-4 font-bold">
                              <span className="flex items-center gap-1 text-red-500"><ThumbsUp className="h-3.5 w-3.5" /> {(story.likes / 1000).toFixed(1)}K</span>
                              <span className="flex items-center gap-1 text-blue-500"><Share2 className="h-3.5 w-3.5" /> {(story.shares / 1000).toFixed(1)}K</span>
                              <span className="flex items-center gap-1 text-emerald-500"><MessageCircle className="h-3.5 w-3.5" /> {story.comments}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleLike(story.id)}
                                className="text-[9px] font-bold text-gray-500 border border-gray-250 dark:border-gray-800 px-2.5 py-1 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                              >
                                {likedArticles.includes(story.id) ? "Liked ❤️" : "Like"}
                              </button>
                              <button 
                                onClick={() => handleBookmark(story.id)}
                                className={`text-[9px] font-bold px-2.5 py-1 rounded-lg border transition-colors ${
                                  bookmarkedArticles.includes(story.id)
                                    ? "bg-amber-500 border-amber-500 text-gray-950"
                                    : "text-gray-500 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                                }`}
                              >
                                {bookmarkedArticles.includes(story.id) ? "Bookmarked ✓" : "Bookmark"}
                              </button>
                              <Link 
                                href={`/en/news-poc/article/${story.id}`}
                                className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                              >
                                Read Story →
                              </Link>
                            </div>
                          </div>

                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Fastest Rising in My Sectors ── */}
                <div className="space-y-4 pt-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Fastest Rising in My Sectors
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "OSAT Semiconductor Substrate Scaling Accelerates", rate: "+240% Like Velocity", tag: "Semiconductors", rise: true },
                      { title: "Clean Energy infrastructure gets $12B allocation booster", rate: "+185% Share Velocity", tag: "Energy & sustainability", rise: true }
                    ].map((story, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-3xs space-y-2">
                        <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider block w-max">
                          ↑ RISING FAST
                        </span>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">{story.title}</h4>
                        <div className="flex items-center justify-between text-[9px] pt-1">
                          <span className="font-bold text-emerald-500">{story.rate}</span>
                          <span className="text-gray-400 font-semibold">{story.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Most Discussed & Most Shared side-by-side rows ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  
                  {/* Most Discussed in My Sectors */}
                  <div className="space-y-3">
                    <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 pb-2">
                      Most Discussed in My Sectors
                    </h4>
                    <div className="space-y-3">
                      {[
                        { title: "Bilateral Tariff Negotiations: EU Carbon border updates", comments: "940 comments", sec: "Trade compliance" },
                        { title: "Deep Sea Power Grid Investment frameworks", comments: "520 comments", sec: "Energy & infrastructure" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3.5 rounded-xl shadow-3xs space-y-2">
                          <h5 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1 leading-snug">{item.title}</h5>
                          <div className="flex justify-between items-center text-[9px]">
                            <span className="text-gray-500 font-semibold">{item.sec}</span>
                            <button 
                              onClick={() => showToast("Opening community discussion board...")}
                              className="text-blue-500 font-bold hover:underline"
                            >
                              Join Discussion ({item.comments}) →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Most Shared in My Sectors */}
                  <div className="space-y-3">
                    <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 pb-2">
                      Most Shared in My Sectors
                    </h4>
                    <div className="space-y-3">
                      {[
                        { title: "APAC Supply Chain shifts: Cargo Operators bypass Da Nang", shares: "1.4K shares", country: "Global" },
                        { title: "Autonomous Drone Spraying wheat yields expansion", shares: "980 shares", country: "India" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3.5 rounded-xl shadow-3xs space-y-2">
                          <h5 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1 leading-snug">{item.title}</h5>
                          <div className="flex justify-between items-center text-[9px]">
                            <span className="text-gray-500 font-semibold">{item.country}</span>
                            <Link href="/eoi" className="text-blue-500 font-bold hover:underline">
                              Read & Share ({item.shares}) →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

              {/* Right sidebar column (col 9-12) */}
              <div className="lg:col-span-4 space-y-6">

                {/* ── Your Most-Liked Sector ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Your Most-Liked Sector
                  </span>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-extrabold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 uppercase">
                      <span>💻</span> Electronics & IT
                    </h4>
                    <p className="text-[10px] text-gray-500 font-normal leading-relaxed">
                      This sector is receiving the highest aggregate engagement velocity among all your followed options this week.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-[10px] bg-gray-50 dark:bg-gray-900/50 p-2.5 rounded-xl border border-gray-100 dark:border-gray-800 font-bold">
                      <div>
                        <span className="text-[8px] text-gray-400 block uppercase font-normal">Active stories</span>
                        <span>14 Trending</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-gray-400 block uppercase font-normal">Engagement rate</span>
                        <span className="text-emerald-500">High (92%)</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => showToast("Opening Electronics & IT sector dashboard...")}
                      className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white text-[10px] font-bold py-2 rounded-lg transition-colors uppercase tracking-wider mt-1"
                    >
                      Explore Technology Trends →
                    </button>
                  </div>
                </div>

                {/* ── Sector Engagement Comparison ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Engagement Across My Sectors
                  </span>
                  <div className="space-y-2">
                    {[
                      { name: "Electronics & IT", rate: "High", color: "bg-emerald-500" },
                      { name: "Energy & Sustainability", rate: "Medium", color: "bg-amber-500" },
                      { name: "Health & Pharma", rate: "High", color: "bg-emerald-500" },
                      { name: "Automotive & EVs", rate: "Medium", color: "bg-amber-500" }
                    ].map((sec, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">{sec.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className={`h-2 w-2 rounded-full ${sec.color}`} />
                          <span className="font-mono text-[10px] font-bold uppercase">{sec.rate}</span>
                        </div>
                      </div>
                    ))}
                    <button 
                      onClick={() => showToast("Navigating to sector engagement comparison matrix...")}
                      className="w-full mt-2 border border-gray-200 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 text-[10px] font-bold py-2 rounded-lg transition-colors uppercase"
                    >
                      View Sector Trends →
                    </button>
                  </div>
                </div>

                {/* ── Trending Topic Clusters ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Trending Topics in My Sectors
                  </span>
                  <div className="space-y-3.5">
                    {TOPIC_CLUSTERS.map((topic, idx) => (
                      <div key={idx} className="flex justify-between items-start text-xs">
                        <div className="space-y-0.5">
                          <span className="font-bold text-blue-600 dark:text-blue-400 block hover:underline cursor-pointer">
                            #{topic.name.replace(/\s+/g, "")}
                          </span>
                          <span className="text-[9px] text-gray-400 block font-normal">{topic.sector} • Updated {topic.update}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-bold block">{topic.count} stories</span>
                          <button 
                            onClick={() => showToast(`Exploring topic cluster: ${topic.name}`)}
                            className="text-[8px] text-gray-400 hover:text-blue-500 font-bold uppercase"
                          >
                            Explore Topic →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── AI Trend Insights ── */}
                <div className="bg-slate-900 text-white border border-slate-900 p-5 rounded-2xl shadow-3xs space-y-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 pointer-events-none" />
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">AI Trend Insights</span>
                      <span className="bg-amber-500 text-gray-900 text-[8px] font-bold px-2 py-0.5 rounded-full ml-auto font-bold font-sans">PRO ACCESS</span>
                    </div>

                    <h4 className="text-xs font-bold leading-snug">
                      Why are AI Chip and Green Steel stories spiking?
                    </h4>
                    
                    {!isPremiumUnlocked ? (
                      <div className="space-y-3">
                        <p className="text-[10px] text-slate-400 leading-relaxed font-normal line-clamp-2">
                          Exporters and semiconductor sourcing leads are bidding heavily on packaging stocks in APAC hubs due to...
                        </p>
                        <div className="bg-slate-900/80 p-3 rounded-lg border border-white/10 flex items-center justify-between text-[9px] relative overflow-hidden">
                          <Lock className="h-3.5 w-3.5 text-white/40 shrink-0" />
                          <span className="text-slate-300 ml-1.5">Detailed model summaries locked behind Pro License</span>
                          <button 
                            onClick={() => setIsPremiumUnlocked(true)}
                            className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-2.5 py-1 rounded font-sans uppercase shrink-0 font-extrabold"
                          >
                            Unlock
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 bg-slate-900/60 p-3 rounded-lg border border-white/5 text-[10px] text-slate-300 font-normal leading-relaxed">
                        <p><strong>Driver:</strong> Subsidized glass-packaging lease credits in Taiwan and bilateral corridors are reducing sourcing friction, forcing companies to move local assembly hubs to APAC zones.</p>
                        <p><strong>Trend Impact:</strong> Sourcing volume expected to grow by 18% in Q4 2026.</p>
                        <p><strong>Bilateral Node:</strong> Sourcing index has peaked with Taiwanese chip packaging corridors.</p>
                        <button 
                          onClick={() => setIsPremiumUnlocked(false)}
                          className="text-[8px] text-slate-500 hover:underline uppercase"
                        >
                          Lock View
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Community Discussion Previews ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    What Are People Saying?
                  </span>
                  
                  <div className="space-y-4">
                    {filteredStories.slice(0, 2).map((story) => {
                      const comments = commentsMap[story.id] || [];
                      return (
                        <div key={story.id} className="space-y-2">
                          <span className="text-[9px] font-bold text-gray-400 block truncate">{story.title}</span>
                          <div className="space-y-2 max-h-32 overflow-y-auto pl-2 border-l border-blue-500/20">
                            {comments.map((c, cIdx) => (
                              <div key={cIdx} className="text-[10px] space-y-0.5">
                                <span className="font-bold text-gray-950 dark:text-white block">{c.author}</span>
                                <p className="text-gray-505 dark:text-gray-400 font-normal leading-tight">{c.text}</p>
                              </div>
                            ))}
                          </div>
                          
                          {/* comment input form */}
                          <div className="flex gap-1.5 pt-1">
                            <input 
                              type="text" 
                              value={newCommentText[story.id] || ""}
                              onChange={(e) => setNewCommentText(prev => ({ ...prev, [story.id]: e.target.value }))}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleAddComment(story.id);
                              }}
                              placeholder="Write a reply..."
                              className="flex-1 px-2 py-1 rounded bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[10px] outline-none"
                            />
                            <button 
                              onClick={() => handleAddComment(story.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] px-2 rounded-lg"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* ── Expert Reactions ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Expert Reactions
                  </span>
                  <div className="space-y-3">
                    {MOCK_EXPERT_COMMENTS.map((comm, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-[9px]">
                          <span className="font-bold text-gray-950 dark:text-white">{comm.name}</span>
                          <span className="text-blue-500 font-semibold">{comm.role}</span>
                        </div>
                        <p className="text-[10px] text-gray-505 dark:text-gray-450 italic leading-snug font-normal">
                          "{comm.text}"
                        </p>
                      </div>
                    ))}
                    <Link 
                      href="/en/news-poc/expert-news"
                      className="block text-center text-[9px] font-bold text-blue-500 hover:underline uppercase pt-1"
                    >
                      View Expert Perspective →
                    </Link>
                  </div>
                </div>

                {/* ── Related Stories & Recommendations ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2 font-bold font-semibold">
                    Because You Follow These Sectors
                  </span>
                  
                  <div className="space-y-3">
                    {[
                      { title: "Bilateral Silicon Chip export agreements signed: US-India Corridors", sec: "Electronics & IT" },
                      { title: "Hydrogen cargo corridors open in Western port hubs", sec: "Energy & Sustainability" }
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <span className="text-[8px] font-bold text-blue-600 dark:text-blue-400 uppercase">{item.sec}</span>
                        <Link 
                          href="/en/news-poc/article/sec-1"
                          className="text-xs font-bold text-gray-900 dark:text-white block hover:underline leading-tight"
                        >
                          {item.title}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Premium Intelligence Upgrade CTA ── */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white border border-blue-950 p-5 rounded-2xl shadow-3xs space-y-4">
                  <h4 className="font-display text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Go Beyond Likes
                  </h4>
                  <p className="text-[10px] text-slate-350 leading-relaxed font-normal">
                    Understand why stories are trending and what they could mean for the sectors you follow with corporate analytical intelligence.
                  </p>
                  
                  <ul className="space-y-2 text-[10px] text-slate-350 font-semibold">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> AI Trend Analysis
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Engagement Velocity Tracker
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Macro Sector Impact Projections
                    </li>
                  </ul>

                  <button 
                    onClick={() => showToast("Opening premium checkouts flow...")}
                    className="w-full text-center bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-xs py-2 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Unlock Premium Intelligence
                  </button>
                </div>

                {/* ── Never Miss a Trending Story Alerts ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold">
                    Never Miss a Trending Story
                  </h4>
                  
                  {!alertConfirmed ? (
                    <div className="space-y-3 text-[10px]">
                      <p className="text-gray-505 leading-relaxed font-normal">
                        Configure threshold alerts to receive instant notifications when stories in your followed sectors become highly trending.
                      </p>
                      
                      <div className="space-y-1.5">
                        <span className="text-[8px] text-gray-400 uppercase font-bold">Alert Threshold</span>
                        <select className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg font-semibold text-xs outline-none">
                          <option>Highly Trending (&gt;10K Likes)</option>
                          <option>Spiking Fast (&gt;150% Velocity)</option>
                          <option>Breaking News Alerts Only</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => { setAlertConfirmed(true); showToast("Sectors Alert setup completed ✓"); }}
                        className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                      >
                        Create Alert
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Alerts Configured Successfully!
                    </div>
                  )}
                </div>

                {/* ── Featured Company Promo (FEATURED) ── */}
                <div className="border border-blue-200/50 dark:border-blue-900/40 bg-blue-50/10 dark:bg-blue-950/5 p-4 rounded-xl shadow-3xs space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/20">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Featured in Your Sector</span>
                    <span className="bg-blue-600 text-white text-[7px] font-bold px-1.5 py-0.5 rounded font-mono">FEATURED</span>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <div className="h-10 w-10 bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-indigo-950/40 dark:to-blue-900/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-blue-600 rounded-lg text-sm shrink-0">
                      ND
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-extrabold text-gray-900 dark:text-white text-xs">Nexus Dynamics</span>
                        <span className="text-blue-500 text-[10px]">✓</span>
                      </div>
                      <span className="text-[9px] text-gray-400 font-semibold block uppercase">Sustainable Energy Solutions</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-gray-500 leading-relaxed font-normal">
                    Providing high-density battery swapping facilities and clean grid routing systems across 40 shipping expressways.
                  </p>

                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEnquiryCompany("Nexus Dynamics")}
                      className="flex-1 bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold text-[10px] py-1.5 rounded-lg transition-colors text-center"
                    >
                      View Company
                    </button>
                  </div>
                </div>

                {/* ── Banner Advertisement ── */}
                <div className="bg-gray-100 dark:bg-gray-950/60 border border-gray-200 dark:border-gray-800 border-dashed p-4 rounded-2xl text-center space-y-1">
                  <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-widest">Advertisement</span>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">iGEN Ad Network · 300 × 250 Banner Slot</p>
                  <Link href="/eoi" className="text-[9px] font-bold text-blue-500 hover:underline block uppercase mt-1">Request Placement</Link>
                </div>

                {/* ── Weekly Trending Newsletter ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Your Weekly Trending Brief
                  </h4>
                  <p className="text-[10px] text-gray-505 leading-relaxed font-normal">
                    Get the most-liked trade and business stories from your sectors delivered to your inbox every Friday morning.
                  </p>
                  
                  {!subscribedNewsletter ? (
                    <div className="space-y-2">
                      <input 
                        type="email" 
                        placeholder="work@corporation.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500"
                      />
                      <button 
                        onClick={() => { if (emailInput.trim()) { setSubscribedNewsletter(true); showToast("Subscribed successfully!"); } }}
                        className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                      >
                        Subscribe
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Subscribed to Weekly Trending Brief!
                    </div>
                  )}
                </div>

              </div>

            </div>
          </section>
        </>
      )}

      {/* ─── Manage My Sectors Modal/Overlay ─── */}
      {isManageModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold font-bold">
                Manage My Sectors
              </h3>
              <button 
                onClick={() => setIsManageModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-gray-505 leading-relaxed font-normal">
              Select or deselect the sectors you care about to build the primary content boundary for your personalized trending news.
            </p>

            <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto p-1">
              {[
                { code: "S16", name: "💻 Electronics & IT", desc: "Software, components & hardware scaling." },
                { code: "S17", name: "⚡ Energy & Clean Tech", desc: "Solar, wind, clean grids & storage." },
                { code: "S23", name: "🏥 Healthcare & Pharma", desc: "API manufacturing, diagnostics & vaccines." },
                { code: "S41", name: "🏦 Banking & Finance (BFSI)", desc: "Offshore finance, GIFTCity transactions." },
                { code: "S45", name: "🚗 Automotive & EVs", desc: "Swap standards, freight EV standards." }
              ].map(sec => (
                <label 
                  key={sec.code}
                  className={`flex flex-col p-3 rounded-xl border cursor-pointer select-none transition-all ${
                    mySectorCodes.includes(sec.code)
                      ? "border-blue-500 bg-blue-50/10 dark:bg-blue-950/20"
                      : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs">
                    <span>{sec.name}</span>
                    <input 
                      type="checkbox" 
                      checked={mySectorCodes.includes(sec.code)}
                      onChange={() => {
                        setMySectorCodes(prev => 
                          prev.includes(sec.code)
                            ? prev.filter(c => c !== sec.code)
                            : [...prev, sec.code]
                        );
                      }}
                      className="rounded accent-blue-500"
                    />
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 font-normal leading-normal">{sec.desc}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 border-t border-gray-200 dark:border-gray-800 pt-3">
              <button 
                onClick={() => setIsManageModalOpen(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Business Enquiry / Lead Gen Modal (CRM Simulation) ─── */}
      {enquiryCompany && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-2">
              <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold font-bold">
                Business Enquiry: {enquiryCompany}
              </h3>
              <button 
                onClick={() => { setEnquiryCompany(null); setEnquirySuccess(false); }}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!enquirySuccess ? (
              <div className="space-y-4 text-xs">
                <p className="text-gray-500 font-normal leading-relaxed font-semibold">
                  Send a direct request to the procurement or partnership office of {enquiryCompany}. This enquiry will sync directly into the CRM database.
                </p>

                <div className="space-y-1">
                  <span className="text-[8px] text-gray-400 uppercase font-bold block">Enquiry Type</span>
                  <div className="flex gap-2">
                    {["Request Quote", "Request Info", "General Enquiry"].map(type => (
                      <button 
                        key={type}
                        onClick={() => showToast(`Selected Enquiry type: ${type}`)}
                        className="border border-gray-200 dark:border-gray-800 hover:border-blue-500 px-3 py-1.5 rounded-lg text-[10px] font-bold"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] text-gray-400 uppercase font-bold block font-semibold">Your Message</span>
                  <textarea 
                    rows={3}
                    placeholder="Describe your trade requirement..."
                    className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg outline-none text-xs focus:border-blue-500"
                  />
                </div>

                <button 
                  onClick={() => { setEnquirySuccess(true); showToast("Enquiry sent to CRM!"); }}
                  className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2.5 rounded-lg transition-colors uppercase text-xs"
                >
                  Send Enquiry
                </button>
              </div>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-gray-900 dark:text-white text-sm uppercase font-semibold">Enquiry Dispatched Successfully</h4>
                <p className="text-[11px] text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Your business inquiry has been registered in the platform CRM and forwarded to the leadership team of {enquiryCompany}.
                </p>
                <button 
                  onClick={() => { setEnquiryCompany(null); setEnquirySuccess(false); }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── Toast Notification ─── */}
      {toastMsg && (
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold transition-all flex items-center gap-1.5 border border-white/10">
          <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
          <span>{toastMsg}</span>
        </div>
      )}

    </div>
  );
}

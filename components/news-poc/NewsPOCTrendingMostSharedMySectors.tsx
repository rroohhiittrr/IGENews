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
  rankMovement: string;
  velocity: string;
}

interface TopicCluster {
  name: string;
  count: number;
  sector: string;
  shares: string;
  update: string;
}

interface ExpertComment {
  name: string;
  role: string;
  text: string;
}

interface CompanyLeaderboard {
  name: string;
  logo: string;
  sector: string;
  storiesCount: number;
  latestStory: string;
}

// B2B viral most-shared articles
const MOCK_SHARED_ARTICLES: Article[] = [
  {
    id: "ts-my-1",
    title: "APAC Semiconductor Sourcing Corridors Adopt Autonomous Assembly Frameworks",
    excerpt: "Logistics shipping bottlenecks ease by 38% across bilateral routes. Sourcing directors share scheduling layouts to secure priority wafer allocations.",
    sectorCode: "S16",
    sectorName: "Electronics & IT & Components",
    country: "India-Taiwan Bilateral",
    date: "1 hr ago",
    shares: 18400,
    likes: 9200,
    comments: 450,
    views: 124000,
    isTrending: true,
    sponsored: false,
    author: "Jensen Huang",
    role: "CEO, NVIDIA",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    topic: "Semiconductor Supply Chain",
    whyTrending: "This article is being shared rapidly among logistics procurement heads to optimize shipping lanes.",
    sentiment: 88,
    timestamp: "now",
    rankMovement: "↑ 2",
    velocity: "+240 shares/hr"
  },
  {
    id: "ts-my-2",
    title: "Offshore Solar Power Grid Interconnection Standards Formally Ratified",
    excerpt: "New regulatory framework allows clean energy producers to feed metallurgy hubs directly, eliminating local distribution tax premiums by 14%.",
    sectorCode: "S17",
    sectorName: "Energy & Sustainability",
    country: "India-Germany Bilateral",
    date: "3 hrs ago",
    shares: 14200,
    likes: 6100,
    comments: 320,
    views: 98000,
    isTrending: true,
    sponsored: false,
    author: "Elena Rostova",
    role: "Energy Policy Lead",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Renewable Energy Policy",
    whyTrending: "Shared heavily in sustainability channels following energy grid compliance standardization.",
    sentiment: 82,
    timestamp: "today",
    rankMovement: "↑ 1",
    velocity: "+180 shares/hr"
  },
  {
    id: "ts-my-3",
    title: "Pharma Sourcing Leaders Establish Active Ingredients Buffer Pools",
    excerpt: "New clinical compliance standards and supply chain clusters lower import dependency by 28%, securing raw materials inventory buffers.",
    sectorCode: "S23",
    sectorName: "Health & Family Welfare & Pharma",
    country: "Domestic Trade",
    date: "5 hrs ago",
    shares: 11800,
    likes: 4800,
    comments: 280,
    views: 82000,
    isTrending: true,
    sponsored: false,
    author: "Priya Sundaram",
    role: "Trade Analyst",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Pharma Supply Chain",
    whyTrending: "Shared by trade groups concerned with medical resource self-reliance policies.",
    sentiment: 76,
    timestamp: "week",
    rankMovement: "→ 0",
    velocity: "+110 shares/hr"
  },
  {
    id: "ts-my-4",
    title: "GIFT City Custodian Banking Assets Surge on CEPA Trade Clearance Speedups",
    excerpt: "Trade clearance volumes peak under revised bilateral agreements, accelerating export clearance financing approvals.",
    sectorCode: "S41",
    sectorName: "Banking & Financial Services (BFSI)",
    country: "India-UAE Bilateral",
    date: "10 hrs ago",
    shares: 10400,
    likes: 5200,
    comments: 190,
    views: 71000,
    isTrending: true,
    sponsored: false,
    author: "Rajesh Kumar",
    role: "Finance Correspondent",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&auto=format&fit=crop&q=80",
    topic: "Bilateral Trade Expansion",
    whyTrending: "Shared among offshore bankers and trade brokers due to tax credit speedups.",
    sentiment: 79,
    timestamp: "week",
    rankMovement: "↓ 1",
    velocity: "+95 shares/hr"
  },
  {
    id: "ts-my-5",
    title: "Bilateral Heavy EV Swappable Battery Swap Plaza Specifications Released",
    excerpt: "Ministry of Heavy Industries releases specs for swap charging, reducing infrastructure deployment cost by 22%.",
    sectorCode: "S45",
    sectorName: "Automotive & Electric Vehicles",
    country: "Domestic Trade",
    date: "1 day ago",
    shares: 9800,
    likes: 3400,
    comments: 140,
    views: 65000,
    isTrending: true,
    sponsored: true,
    author: "Julian Vance",
    role: "CEO Nexus Dynamics",
    image: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Electric Vehicle Growth",
    whyTrending: "This is a sponsored research briefing covering standardization of heavy machinery batteries.",
    sentiment: 68,
    timestamp: "month",
    rankMovement: "→ 0",
    velocity: "+80 shares/hr"
  }
];

// Most Shared Topics
const TOPIC_CLUSTERS: TopicCluster[] = [
  { name: "Semiconductor Supply Chain", count: 14, sector: "Electronics & IT", shares: "18.4K", update: "10m ago" },
  { name: "Renewable Energy Policy", count: 21, sector: "Energy & Clean Tech", shares: "14.2K", update: "1h ago" },
  { name: "Pharma Supply Chain", count: 11, sector: "Healthcare", shares: "11.8K", update: "3h ago" },
  { name: "Electric Vehicle Growth", count: 18, sector: "Automotive", shares: "9.8K", update: "1d ago" }
];

// Experts Comments
const MOCK_EXPERT_COMMENTS: ExpertComment[] = [
  { 
    name: "Dr. Ramesh Nair", 
    role: "Agri Policy Expert", 
    text: "Decentralized trade logistics apps are helping exporters reduce dispatch delay indices by 28%." 
  },
  { 
    name: "Sonia Marchetti", 
    role: "Sourcing Counsel", 
    text: "EU compliance frameworks require early digital filing options to bypass border customs blocks." 
  }
];

// Companies Behind Most Shared Stories
const MOCK_COMPANIES: CompanyLeaderboard[] = [
  { name: "Nexus Dynamics", logo: "ND", sector: "Energy & Sustainability", storiesCount: 9, latestStory: "Offshore Solar Power Grid Interconnection Standards Formally Ratified" },
  { name: "NVIDIA", logo: "NV", sector: "Electronics & IT", storiesCount: 7, latestStory: "APAC Semiconductor Sourcing Corridors Adopt Autonomous Assembly Frameworks" }
];

interface Props {
  onBack?: () => void;
}

export default function NewsPOCTrendingMostSharedMySectors({ onBack }: Props) {
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
    "ts-my-1": [
      { author: "Devika Sharma", text: "Autonomous frameworks will drastically lower customs clearing cycles." }
    ],
    "ts-my-2": [
      { author: "Vivek Murthy", text: "Standard grid interconnectivity is exactly what heavy metallurgy needed." }
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
  const filteredStories = MOCK_SHARED_ARTICLES.filter(art => {
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
        <span>Most Shared</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-blue-500 font-bold">My Sectors</span>
      </nav>

      {/* ─── Hero Section ─── */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xs">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs">
                <Sparkles className="h-2.5 w-2.5" /> Share Intelligence
              </span>
              <button 
                onClick={() => setShowHowItWorks(!showHowItWorks)}
                className="text-[10px] text-gray-400 hover:underline flex items-center gap-0.5"
              >
                <HelpCircle className="h-3.5 w-3.5" /> How Trending Works
              </button>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Most Shared News in My Sectors
            </h1>
            <p className="text-xs md:text-sm text-gray-500 leading-relaxed max-w-lg font-normal">
              Discover the trade and business stories spreading fastest across the sectors you follow.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => showToast("Exploring personalized sharing metrics...")}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors"
              >
                Explore Shared Stories
              </button>
              <button 
                onClick={() => setIsManageModalOpen(true)}
                className="border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
              >
                Manage My Sectors
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search shared stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500 shadow-2xs"
            />
          </div>
        </div>
      </section>

      {/* How it works details */}
      {showHowItWorks && (
        <section className="mx-auto max-w-7xl px-4 pt-4 lg:px-6">
          <div className="bg-blue-50/50 dark:bg-blue-955/10 border border-blue-200/50 dark:border-blue-900/40 p-4 rounded-2xl text-xs space-y-1">
            <h4 className="font-bold text-blue-900 dark:text-blue-200">How We Rank Shared Stories</h4>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              Our organic algorithm ranks stories using actual client-side signals: <strong>total shares count, share velocity rates, and reading recency</strong>. Sponsored listings do not affect organic ranking lists and are marked separately.
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
              Choose the sectors you care about to personalize your shared-news experience and begin discovering bilateral trade intelligence.
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
                          : "bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-blue-500"
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
                className="text-[10px] font-bold text-blue-500 hover:underline tracking-wider uppercase shrink-0"
              >
                + Manage My Sectors
              </button>
            </div>
          </section>

          {/* ─── Global Sharing Snapshot ─── */}
          <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
            <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">What's Being Shared in Your Sectors?</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { title: "#1 MOST SHARED", label: "Autonomous assembly frameworks", metric: "18.4K Shares", sec: "Electronics", color: "border-blue-500/20" },
                { title: "FASTEST SPREADING", label: "Regulatory offshore solar ratification", metric: "+180 shares/hr", sec: "Energy", color: "border-emerald-500/20" },
                { title: "MOST DISCUSSED", label: "Pharma API supply buffer pools", metric: "280 Comments", sec: "Healthcare", color: "border-purple-500/20" },
                { title: "MOST LIKED", label: "GIFT City banking asset surges", metric: "5.2K Likes", sec: "Banking (BFSI)", color: "border-orange-500/20" },
                { title: "MOST ACTIVE SECTOR", label: "Semiconductors & Components", metric: "14 Stories", sec: "High Activity", color: "border-pink-500/20" }
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

          {/* ─── #1 Most-Shared Story ─── */}
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
                    <Share2 className="h-3 w-3" /> {(filteredStories[0].shares / 1000).toFixed(1)}K Shares
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" /> {(filteredStories[0].likes / 1000).toFixed(1)}K Likes
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" /> {filteredStories[0].comments}
                  </span>
                </div>

                <div className="relative z-10 space-y-4 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#E63946] text-white text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider block w-max">
                      #1 MOST SHARED
                    </span>
                    <span className="bg-emerald-500 text-slate-950 text-[9px] font-bold px-2 py-0.5 rounded tracking-wide font-mono">
                      {filteredStories[0].velocity}
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
                      onClick={() => showToast(`Shared to corporate channels`)}
                      className="border border-white/20 hover:bg-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center gap-1.5"
                    >
                      <Share2 className="h-3.5 w-3.5" /> Share Story
                    </button>
                    {filteredStories[0].companyName && (
                      <button 
                        onClick={() => setEnquiryCompany(filteredStories[0].companyName || null)}
                        className="bg-blue-600 hover:bg-blue-750 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
                      >
                        View Company
                      </button>
                    )}
                    <button 
                      onClick={() => handleBookmark(filteredStories[0].id)}
                      className={`p-2.5 rounded-xl border border-white/20 transition-all ${
                        bookmarkedArticles.includes(filteredStories[0].id)
                          ? "bg-amber-500 text-gray-950 border-amber-500"
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
                    Most Shared Stories
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
                    <p className="text-xs text-gray-500 font-semibold">No highly shared stories are available under this selection right now.</p>
                    <button 
                      onClick={() => { setSelectedSectorFilter("all"); setActiveTimeRange("now"); setSearchQuery(""); }}
                      className="text-xs text-blue-500 font-bold hover:underline"
                    >
                      Explore All Shared News
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredStories.map((story, idx) => (
                      <div key={story.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs hover:shadow-md transition-all group">
                        <div className="flex gap-4 items-start">
                          <div className="flex flex-col items-center w-8 shrink-0">
                            <span className="font-display text-2xl font-extrabold text-gray-200 dark:text-gray-800 group-hover:text-blue-500 transition-colors leading-none pt-0.5">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <span className="text-[7px] font-bold text-emerald-500 tracking-wider mt-1">{story.rankMovement}</span>
                          </div>
                          
                          <div className="flex-1 space-y-2.5">
                            <div className="flex justify-between items-start flex-wrap gap-2">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase ${
                                  story.sponsored 
                                    ? "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400"
                                    : "bg-blue-50 text-blue-600 dark:bg-blue-950/20"
                                }`}>
                                  {story.sponsored ? "Sponsored Content" : "Highly Shared"}
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
                            <p className="text-xs text-gray-500 leading-relaxed font-normal">
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
                                <span className="flex items-center gap-1 text-blue-600"><Share2 className="h-3.5 w-3.5" /> {(story.shares / 1000).toFixed(1)}K Shares</span>
                                <span className="flex items-center gap-1 text-slate-500"><ThumbsUp className="h-3.5 w-3.5" /> {(story.likes / 1000).toFixed(1)}K</span>
                                <span className="flex items-center gap-1 text-slate-500"><MessageCircle className="h-3.5 w-3.5" /> {story.comments}</span>
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
                                  className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                                >
                                  Read Story →
                                </Link>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* ── Fastest Spreading Stories ── */}
                <div className="space-y-4 pt-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Fastest Spreading Stories (Velocity)
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Bilateral Silicon Chip Export Agreements Formally Signed", velocity: "+240 shares/hr", tag: "Semiconductors", rise: true },
                      { title: "Hydrogen Sourcing Plazas open in Western freight hubs", velocity: "+185 shares/hr", tag: "Energy & Infrastructure", rise: true }
                    ].map((story, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-3xs space-y-2">
                        <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider block w-max">
                          ↑ RISING FAST
                        </span>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">{story.title}</h4>
                        <div className="flex items-center justify-between text-[9px] pt-1">
                          <span className="font-bold text-emerald-500">{story.velocity}</span>
                          <span className="text-gray-400 font-semibold">{story.tag}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Top Shared Story From Each Sector ── */}
                <div className="space-y-4 pt-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2 flex justify-between items-center">
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Top Shared Story From Each Sector
                    </h3>
                    <button onClick={() => showToast("Opening sector matrix details...")} className="text-[10px] text-blue-500 font-bold hover:underline uppercase">
                      Explore Sector Sharing →
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { sector: "💻 TECHNOLOGY", title: "APAC Semiconductor Sourcing Corridors Adopt Autonomous Assembly Frameworks", shares: "18.4K Shares" },
                      { sector: "⚡ ENERGY", title: "Offshore Solar Power Grid Interconnection Standards Formally Ratified", shares: "14.2K Shares" },
                      { sector: "🏥 HEALTHCARE", title: "Pharma Sourcing Leaders Establish Active Ingredients Buffer Pools", shares: "11.8K Shares" },
                      { sector: "🏦 FINANCE", title: "GIFT City Custodian Banking Assets Surge on CEPA Trade Clearance Speedups", shares: "10.4K Shares" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-3xs space-y-1">
                        <span className="text-[8px] font-bold text-blue-600 dark:text-blue-400 block uppercase tracking-wider">{item.sector}</span>
                        <h4 className="text-xs font-extrabold text-gray-900 dark:text-white line-clamp-1 leading-snug">{item.title}</h4>
                        <span className="text-[9px] font-extrabold text-blue-600 dark:text-blue-400 block pt-1">↗ {item.shares}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Going Viral in Your Sectors ── */}
                <div className="space-y-4 pt-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Going Viral in Your Sectors
                    </h3>
                  </div>
                  
                  <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-4">
                    {[
                      { title: "Bilateral Tariff Negotiations: EU Carbon Border Tax Revisions", shares: "12.8K Shares", velocity: "+280/hr", rank: "↑ 4" }
                    ].map((story, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1.5">
                          <span className="bg-red-500 text-white text-[7px] font-bold px-2 py-0.5 rounded uppercase tracking-widest font-mono">
                            GOING VIRAL
                          </span>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{story.title}</h4>
                          <span className="text-[9px] text-gray-400 block">Published 45 min ago • Rank movement: {story.rank}</span>
                        </div>
                        <div className="shrink-0 flex sm:flex-col items-end gap-2 text-right">
                          <span className="text-xs font-extrabold text-red-500">{story.shares}</span>
                          <span className="text-[9px] text-emerald-500 font-semibold">{story.velocity}</span>
                          <Link href="/en/news-poc/article/tc-1" className="text-[9px] font-bold text-blue-500 hover:underline block uppercase">Read Story →</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Most Discussed After Sharing ── */}
                <div className="pt-4">
                  
                  {/* Highly discussed */}
                  <div className="space-y-3">
                    <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 pb-2">
                      Stories Creating Discussion
                    </h4>
                    <div className="space-y-3">
                      {[
                        { title: "EU Carbon border tax audit framework updates", comments: 940, shares: "12.8K" },
                        { title: "Deep Sea Power Grid Investment plans", comments: 520, shares: "9.4K" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3.5 rounded-xl shadow-3xs space-y-2">
                          <h5 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1 leading-snug">{item.title}</h5>
                          <div className="flex justify-between items-center text-[9px]">
                            <span className="text-gray-400 font-semibold">{item.shares} Shares</span>
                            <button 
                              onClick={() => showToast("Opening discussion boards...")}
                              className="text-blue-500 font-bold hover:underline"
                            >
                              Join Discussion ({item.comments}) →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>



                </div>

              </div>

              {/* Right sidebar column (col 9-12) */}
              <div className="lg:col-span-4 space-y-6">

                {/* ── Sector Sharing Leaderboard ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-50 dark:border-gray-850 pb-2">
                    Sectors Spreading the Most
                  </span>
                  
                  <div className="space-y-3">
                    {[
                      { name: "🥇 Technology", shares: "48.2K total shares" },
                      { name: "🥈 Energy", shares: "35.1K total shares" },
                      { name: "🥉 Healthcare", shares: "29.7K total shares" },
                      { name: "4. Finance", shares: "24.5K total shares" },
                      { name: "5. Automotive", shares: "19.8K total shares" }
                    ].map((sec, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">{sec.name}</span>
                        <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 font-mono">{sec.shares}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Trending Topic Clusters ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Topics Being Shared Most
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
                          <span className="text-[10px] font-bold block">{topic.shares} Shares</span>
                          <button 
                            onClick={() => showToast(`Following topic cluster: ${topic.name}`)}
                            className="text-[8px] text-gray-400 hover:text-blue-500 font-bold uppercase"
                          >
                            Explore Topic →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── AI Sharing Insights ── */}
                <div className="bg-slate-900 text-white border border-slate-900 p-5 rounded-2xl shadow-3xs space-y-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 pointer-events-none" />
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">AI Sharing Insights</span>
                      <span className="bg-amber-500 text-gray-900 text-[8px] font-bold px-2 py-0.5 rounded-full ml-auto font-bold font-sans">PRO ACCESS</span>
                    </div>

                    <h4 className="text-xs font-bold leading-snug">
                      Why is this story being shared?
                    </h4>
                    
                    {!isPremiumUnlocked ? (
                      <div className="space-y-3">
                        <p className="text-[10px] text-slate-400 leading-relaxed font-normal line-clamp-2">
                          Procurement leads and energy managers are sharing these regulatory interconnection articles heavily to plan local...
                        </p>
                        <div className="bg-slate-900/80 p-3 rounded-lg border border-white/10 flex items-center justify-between text-[9px] relative overflow-hidden">
                          <Lock className="h-3.5 w-3.5 text-white/40 shrink-0" />
                          <span className="text-slate-300 ml-1.5">Detailed viral insights locked under Pro License</span>
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
                        <p><strong>Sharing Motivator:</strong> Exporters are sharing this layout internally to re-verify logistics clearance routes before Q4 tariffs kick in.</p>
                        <p><strong>Sector Impact:</strong> Sourcing managers estimate a 14% drop in warehousing delays if adopted.</p>
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
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-50 dark:border-gray-850 pb-2">
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
                                <p className="text-gray-500 font-normal leading-tight">{c.text}</p>
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
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-50 dark:border-gray-850 pb-2">
                    Expert Reactions to Shared Stories
                  </span>
                  <div className="space-y-3">
                    {MOCK_EXPERT_COMMENTS.map((comm, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-[9px]">
                          <span className="font-bold text-gray-950 dark:text-white">{comm.name}</span>
                          <span className="text-blue-500 font-semibold">{comm.role}</span>
                        </div>
                        <p className="text-[10px] text-gray-500 italic leading-snug font-normal">
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

                {/* ── Companies Behind Most Shared Stories ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-50 dark:border-gray-850 pb-2">
                    Companies Behind Shared Stories
                  </span>
                  
                  <div className="space-y-3.5">
                    {MOCK_COMPANIES.map((company, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex gap-2 items-center">
                          <div className="h-6 w-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-blue-600 rounded text-[10px] shrink-0">
                            {company.logo}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-extrabold text-gray-900 dark:text-white text-xs">{company.name}</span>
                              <span className="text-blue-500 text-[10px]">✓</span>
                            </div>
                            <span className="text-[8px] text-gray-400 block font-normal">{company.sector}</span>
                          </div>
                          <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold ml-auto shrink-0">{company.storiesCount} shared stories</span>
                        </div>
                        <button 
                          onClick={() => setEnquiryCompany(company.name)}
                          className="w-full text-center border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 text-[9px] font-bold py-1 rounded transition-colors uppercase"
                        >
                          View Company →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Most Shared Products & Services ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-50 dark:border-gray-850 pb-2">
                    Most Shared Products & Services
                  </span>
                  
                  <div className="space-y-2 text-xs">
                    {[
                      { name: "OSAT Semiconductor Substrates", company: "NVIDIA", link: "/eoi" },
                      { name: "Hydrogen swappable batteries", company: "Nexus Dynamics", link: "/eoi" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white block">{item.name}</span>
                          <span className="text-[9px] text-gray-400 block font-normal">By {item.company}</span>
                        </div>
                        <Link href={item.link} className="text-[9px] font-bold text-blue-500 hover:underline uppercase shrink-0">Explore Provider →</Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Premium Intelligence Upgrade CTA ── */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white border border-blue-950 p-5 rounded-2xl shadow-3xs space-y-4">
                  <h4 className="font-display text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Go Beyond Share Counts
                  </h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                    Understand how stories spread across your sectors and identify emerging business conversations before they peak.
                  </p>
                  
                  <ul className="space-y-2 text-[10px] text-slate-300 font-semibold">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Share Velocity History Charts
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Distribution Attributed Analytics
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Topic Propagation Maps
                    </li>
                  </ul>

                  <button 
                    onClick={() => showToast("Opening premium checkout flow...")}
                    className="w-full text-center bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Unlock Viral Intelligence
                  </button>
                </div>



                {/* ── Sharing Alerts (ALERT) ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Know When Your Sector Goes Viral
                  </h4>
                  
                  {!alertConfirmed ? (
                    <div className="space-y-3 text-[10px]">
                      <p className="text-gray-500 leading-relaxed font-normal">
                        Configure threshold alerts to receive instant notifications when stories in your followed sectors become highly trending.
                      </p>
                      
                      <div className="space-y-1.5">
                        <span className="text-[8px] text-gray-400 uppercase font-bold">Alert Threshold</span>
                        <select className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-850 rounded-lg font-semibold text-xs outline-none">
                          <option>Spiking Fast (&gt;100 shares/hr)</option>
                          <option>Highly Shared (&gt;10K Shares)</option>
                          <option>Breaking News Alerts Only</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => { setAlertConfirmed(true); showToast("Sectors Alert setup completed ✓"); }}
                        className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                      >
                        Create Sharing Alert
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Alerts Configured Successfully!
                    </div>
                  )}
                </div>

                {/* ── Featured Company (FEATURED) ── */}
                <div className="border border-blue-200/50 dark:border-blue-900/40 bg-blue-50/10 dark:bg-blue-955/5 p-4 rounded-xl shadow-3xs space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/20">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Featured in Your Sector</span>
                    <span className="bg-blue-600 text-white text-[7px] font-bold px-1.5 py-0.5 rounded font-mono">FEATURED</span>
                  </div>
                  
                  <div className="flex gap-3 items-center">
                    <div className="h-10 w-10 bg-gradient-to-br from-indigo-100 to-blue-200 dark:from-indigo-955/40 dark:to-blue-900/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-blue-600 rounded-lg text-sm shrink-0">
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

                  <p className="text-[10px] text-gray-550 leading-relaxed font-normal">
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
                    Your Weekly Viral Business Brief
                  </h4>
                  <p className="text-[10px] text-gray-500 leading-relaxed font-normal">
                    Get the most-shared stories from the sectors you follow delivered to your inbox every Friday morning.
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
                      ✓ Subscribed to Weekly Viral Business Brief!
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

            <p className="text-xs text-gray-500 leading-relaxed font-normal">
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
                className="bg-blue-600 hover:bg-blue-750 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all"
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
                        className="border border-gray-200 dark:border-gray-855 px-3 py-1.5 rounded-lg text-[10px] font-bold"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] text-gray-400 uppercase font-bold block">Your Message</span>
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
                <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto animate-bounce" />
                <h4 className="font-bold text-gray-900 dark:text-white text-sm uppercase">Enquiry Dispatched Successfully</h4>
                <p className="text-[11px] text-gray-550 max-w-xs mx-auto leading-relaxed">
                  Your business inquiry has been registered in the platform CRM and forwarded to the leadership team of {enquiryCompany}.
                </p>
                <button 
                  onClick={() => { setEnquiryCompany(null); setEnquirySuccess(false); }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2 rounded-xl"
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
        <div className="fixed bottom-4 right-4 z-50 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2.5 rounded-xl shadow-lg text-xs font-bold transition-all flex items-center gap-1.5 animate-fade-in border border-white/10">
          <Sparkles className="h-3.5 w-3.5 text-blue-500 animate-pulse" />
          <span>{toastMsg}</span>
        </div>
      )}

    </div>
  );
}

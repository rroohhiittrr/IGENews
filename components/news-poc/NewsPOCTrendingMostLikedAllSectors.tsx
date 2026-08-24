"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, Share2, Lock, ChevronRight, Search, AlertTriangle, 
  CheckCircle, ThumbsUp, Bookmark, MessageCircle, ArrowLeft, X, HelpCircle, 
  TrendingUp, Globe, Filter, Star, Briefcase, Eye, ChevronDown, Check
} from "lucide-react";
import { IGEN_50_SECTORS } from "./igenTaxonomyData";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  sectorCode: string;
  sectorName: string;
  country: string;
  region: "Asia" | "Europe" | "North America" | "Middle East" | "Africa" | "Latin America" | "Global";
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
  rankMovement: "up" | "down" | "stable" | "new";
  rankMovementValue?: number;
  trendScore: number;
}

interface TopicCluster {
  name: string;
  count: number;
  sector: string;
  engagement: string;
  update: string;
  latestStory: string;
}

interface ExpertComment {
  name: string;
  role: string;
  text: string;
}

interface CompanyTrend {
  name: string;
  logo: string;
  sector: string;
  verified: boolean;
  storyCount: number;
  latestStory: string;
}

// B2B global trending stories list (Most Liked across all sectors)
const MOCK_GLOBAL_TRENDING_ARTICLES: Article[] = [
  {
    id: "tl-all-1",
    title: "AI Chip Packaging Fab Hub Ratifies Joint Ventures for Next-Gen Transistor Standard",
    excerpt: "Global foundries team up under new standardizations, slashing assembly cycle times by 32% and unlocking critical supply blocks for enterprise computing pipelines.",
    sectorCode: "S46",
    sectorName: "Semiconductors & OSAT",
    country: "USA-Taiwan Corridors",
    region: "Global",
    date: "1 hr ago",
    likes: 24800,
    shares: 4800,
    comments: 940,
    views: 124000,
    isTrending: true,
    sponsored: false,
    author: "Dr. Aris Thorne",
    role: "Foundry Council Lead",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    topic: "AI Investment",
    whyTrending: "Surging global engagement following multi-lateral OSAT trade agreement approvals across North American and East Asian corridors.",
    sentiment: 94,
    timestamp: "now",
    rankMovement: "new",
    trendScore: 98
  },
  {
    id: "tl-all-2",
    title: "Offshore Solar Interconnection standard Ratified for North Sea Clean Energy grid",
    excerpt: "Bilateral ministries settle offshore private grid line ownership disputes. Direct metallurgy feeds bypass local commercial grid tax premiums by 18%.",
    sectorCode: "S17",
    sectorName: "Energy & Sustainability",
    country: "Germany-Norway Corridor",
    region: "Europe",
    date: "2 hrs ago",
    likes: 21400,
    shares: 3200,
    comments: 520,
    views: 98000,
    isTrending: true,
    sponsored: false,
    author: "Elena Rostova",
    role: "Energy Analyst",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Renewable Energy Expansion",
    whyTrending: "Highly shared across European utility networks following the bilateral infrastructure standardization announcement.",
    sentiment: 88,
    timestamp: "now",
    rankMovement: "up",
    rankMovementValue: 2,
    trendScore: 96
  },
  {
    id: "tl-all-3",
    title: "Commercial Freight EV Swap Batteries Standardized Across Heavy Logistics Fleets",
    excerpt: "Ministry of Heavy Industries releases unified battery interchange specs, reducing grid charging queue times and scaling fleet range indexes by 28%.",
    sectorCode: "S45",
    sectorName: "Automotive & Electric Vehicles",
    country: "Bilateral Trade Ports",
    region: "Asia",
    date: "4 hrs ago",
    likes: 18900,
    shares: 2100,
    comments: 410,
    views: 86000,
    isTrending: true,
    sponsored: false,
    author: "Julian Vance",
    role: "Automotive Advisor",
    image: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "EV Market",
    whyTrending: "Spiking discussion volume in logistics management hubs following the publication of standard battery specs.",
    sentiment: 82,
    timestamp: "today",
    rankMovement: "up",
    rankMovementValue: 3,
    trendScore: 92
  },
  {
    id: "tl-all-4",
    title: "Bilateral Tariff Negotiations: EU Carbon Border Tax Revisions Split Exporters",
    excerpt: "Revised carbon offset compliance rules draw sharp debate from metallurgical shippers. Margin forecast drops of 8-14% are expected under new audits.",
    sectorCode: "S37",
    sectorName: "Steel & Metallurgy",
    country: "India-EU Bilateral",
    region: "Europe",
    date: "6 hrs ago",
    likes: 17200,
    shares: 1900,
    comments: 880,
    views: 74000,
    isTrending: true,
    sponsored: false,
    author: "Sonia Marchetti",
    role: "Sourcing Counsel",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&auto=format&fit=crop&q=80",
    topic: "Trade Policy Revisions",
    whyTrending: "Intense professional debates among steel exporters and compliance officers over revised carbon tariff timelines.",
    sentiment: 64,
    timestamp: "today",
    rankMovement: "down",
    rankMovementValue: 1,
    trendScore: 90
  },
  {
    id: "tl-all-5",
    title: "GIFT City Offshore Banking Hub Registers 35% Asset Growth in Q1",
    excerpt: "Financial clearance workflows surge under revised bilateral CEPA agreements, bringing trade credit clearances to record velocity indexes.",
    sectorCode: "S41",
    sectorName: "Banking & Financial Services (BFSI)",
    country: "India-UAE Bilateral",
    region: "Middle East",
    date: "12 hrs ago",
    likes: 15400,
    shares: 2400,
    comments: 310,
    views: 65000,
    isTrending: true,
    sponsored: false,
    author: "Rajesh Kumar",
    role: "Trade Finance Editor",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&auto=format&fit=crop&q=80",
    topic: "Bilateral Trade Expansion",
    whyTrending: "High institutional likes following reports of simplified asset allocation guidelines in offshore SEZs.",
    sentiment: 90,
    timestamp: "today",
    rankMovement: "stable",
    trendScore: 89
  },
  {
    id: "tl-all-6",
    title: "Specialty Chemicals Export Output Hits Record High in Domestic Hubs",
    excerpt: "Export orders for advanced battery polymer components spike by 45%. Production lines run at full capacity to bypass Southeast Asian logistics delays.",
    sectorCode: "S07",
    sectorName: "Chemicals & Fertilizers & Minerals",
    country: "Domestic Trade Hubs",
    region: "Asia",
    date: "1 day ago",
    likes: 13200,
    shares: 1100,
    comments: 180,
    views: 52000,
    isTrending: true,
    sponsored: false,
    author: "Chloé Moreau",
    role: "Materials Correspondent",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=900&auto=format&fit=crop&q=80",
    topic: "Semiconductor Supply Chain",
    whyTrending: "Strong engagement from industrial sourcing leads trying to lock contracts before seasonal tariff shifts.",
    sentiment: 86,
    timestamp: "week",
    rankMovement: "up",
    rankMovementValue: 1,
    trendScore: 84
  },
  {
    id: "tl-all-7",
    title: "Bilateral Agri-Trade Corridors Adopt Autonomous Smart Drone Spraying Protocols",
    excerpt: "Wheat export cooperatives secure record-high yields. Automated monitoring systems slash pesticide runoff indices by 38% under bilateral grants.",
    sectorCode: "S01",
    sectorName: "Agriculture & Farmers Welfare",
    country: "India-Australia Bilateral",
    region: "Global",
    date: "3 days ago",
    likes: 11900,
    shares: 1300,
    comments: 290,
    views: 47000,
    isTrending: false,
    sponsored: false,
    author: "Dr. Ramesh Nair",
    role: "Agricultural Policy Lead",
    image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=900&auto=format&fit=crop&q=80",
    topic: "AgriTech Advancements",
    whyTrending: "Growing interest in high-efficiency farming techniques among B2B agricultural exporters.",
    sentiment: 88,
    timestamp: "week",
    rankMovement: "stable",
    trendScore: 80
  },
  {
    id: "tl-all-8",
    title: "Silicon Substrate OSAT Advanced Assembly Factory Ratifies Expansion",
    excerpt: "A $2.4B semiconductor packaging facility secures greenfield approvals. Factory features fully autonomous material handling bots.",
    sectorCode: "S46",
    sectorName: "Semiconductors & OSAT",
    country: "Domestic Trade",
    region: "Asia",
    date: "5 days ago",
    likes: 10500,
    shares: 1600,
    comments: 110,
    views: 43000,
    isTrending: false,
    sponsored: true,
    author: "Satoshi Yamamoto",
    role: "Advanced Packaging Editor",
    image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=900&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    topic: "AI Investment",
    whyTrending: "A sponsored industrial update highlighting critical packaging capacity additions in APAC corridors.",
    sentiment: 82,
    timestamp: "week",
    rankMovement: "new",
    trendScore: 78
  },
  {
    id: "tl-all-9",
    title: "Pharma API Import Substitution Standards Lower Logistics Buffers",
    excerpt: "Government initiatives trigger direct sourcing partnerships, reducing domestic medicine base ingredients production times by 22 days.",
    sectorCode: "S23",
    sectorName: "Health & Family Welfare & Pharma",
    country: "Domestic Trade",
    region: "Asia",
    date: "2 weeks ago",
    likes: 9800,
    shares: 950,
    comments: 140,
    views: 39000,
    isTrending: false,
    sponsored: false,
    author: "Priya Sundaram",
    role: "Pharma Policy Analyst",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=900&auto=format&fit=crop&q=80",
    topic: "Pharma Supply Chain",
    whyTrending: "Extended reading patterns in healthcare logistics circles regarding pharmaceutical self-reliance initiatives.",
    sentiment: 76,
    timestamp: "month",
    rankMovement: "down",
    rankMovementValue: 2,
    trendScore: 75
  },
  {
    id: "tl-all-10",
    title: "Hydrogen Cargo Corridor standard Ratified across Western Shipping Expressways",
    excerpt: "Pioneering freight stations install rapid swappable cell systems, cutting long-distance transit emission indices by 42%.",
    sectorCode: "S17",
    sectorName: "Energy & Sustainability",
    country: "Global Trade Hubs",
    region: "Global",
    date: "3 weeks ago",
    likes: 8900,
    shares: 1200,
    comments: 195,
    views: 36000,
    isTrending: false,
    sponsored: false,
    author: "Marcus Chen",
    role: "Energy Infrastructure Lead",
    image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Renewable Energy Expansion",
    whyTrending: "Continued study of clean cargo routing options by trans-national shipping consortiums.",
    sentiment: 92,
    timestamp: "month",
    rankMovement: "stable",
    trendScore: 72
  }
];

// Mock topic clusters globally
const MOCK_TOPIC_CLUSTERS: TopicCluster[] = [
  { name: "Renewable Energy Expansion", count: 21, sector: "Energy & Clean Tech", engagement: "21.4K Likes", update: "1h ago", latestStory: "Offshore Solar Interconnection standard Ratified for North Sea" },
  { name: "Semiconductor Supply Chain", count: 18, sector: "Semiconductors & OSAT", engagement: "35.3K Likes", update: "10m ago", latestStory: "AI Chip Packaging Fab Hub Ratifies Joint Ventures" },
  { name: "AI Investment", count: 14, sector: "Electronics & IT & Components", engagement: "24.8K Likes", update: "1 hr ago", latestStory: "AI Chip Packaging Fab Hub Ratifies Joint Ventures" },
  { name: "EV Market", count: 27, sector: "Automotive & Electric Vehicles", engagement: "18.9K Likes", update: "4 hrs ago", latestStory: "Commercial Freight EV Swap Batteries Standardized" }
];

// Mock companies driving trends
const MOCK_COMPANIES_DRIVING: CompanyTrend[] = [
  { name: "NVIDIA", logo: "NV", sector: "Semiconductors & OSAT", verified: true, storyCount: 12, latestStory: "AI Chip Packaging Fab Hub Ratifies Joint Ventures" },
  { name: "Nexus Dynamics", logo: "ND", sector: "Energy & Utilities", verified: true, storyCount: 8, latestStory: "Offshore Solar Interconnection standard Ratified for North Sea" }
];

// Mock expert perspectives
const MOCK_EXPERT_COMMENTS: ExpertComment[] = [
  { name: "Dr. Ramesh Nair", role: "Agricultural Policy Lead", text: "Autonomous drone protocols allow regional grain cooperatives to secure higher forward contract values." },
  { name: "Sonia Marchetti", role: "Sourcing Counsel", text: "Bilateral carbon tariff audits force manufacturers to calculate scope emissions at the shipping point." }
];

interface Props {
  onBack?: () => void;
}

export default function NewsPOCTrendingMostLikedAllSectors({ onBack }: Props) {
  // Filters state
  const [activeTimeRange, setActiveTimeRange] = useState<"now" | "today" | "week" | "month">("now");
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [selectedGeographyFilter, setSelectedGeographyFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Interactive local actions states
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [commentsMap, setCommentsMap] = useState<Record<string, { author: string; text: string }[]>>({
    "tl-all-1": [
      { author: "Marcus Aurelius", text: "Bilateral subsidization is key to scaling fabrication pipelines quickly." }
    ],
    "tl-all-2": [
      { author: "Julian Vance", text: "Bypassing the grid tax premium represents massive operational savings." }
    ]
  });
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});
  
  // Premium toggle simulator
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  // CRM Lead generation simulator
  const [enquiryCompany, setEnquiryCompany] = useState<string | null>(null);
  const [enquiryType, setEnquiryType] = useState<string>("info");
  const [enquiryText, setEnquiryText] = useState("");
  
  // Info banner overlays
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  
  // Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  // Loading skeleton state simulator
  const [isLoading, setIsLoading] = useState(false);

  // Trigger loading skeleton on filter change for professional feels
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeTimeRange, selectedSectorFilter, selectedGeographyFilter]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLike = (id: string) => {
    if (likedArticles.includes(id)) {
      setLikedArticles(prev => prev.filter(x => x !== id));
      showToast("Removed like");
    } else {
      setLikedArticles(prev => [...prev, id]);
      showToast("Liked story! ❤️");
    }
  };

  const handleBookmark = (id: string) => {
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles(prev => prev.filter(x => x !== id));
      showToast("Removed from Bookmarks");
    } else {
      setBookmarkedArticles(prev => [...prev, id]);
      showToast("Saved to Bookmarks ✓");
    }
  };

  const handleFollowTopic = (topicName: string) => {
    if (followedTopics.includes(topicName)) {
      setFollowedTopics(prev => prev.filter(x => x !== topicName));
      showToast(`Unfollowed topic cluster: ${topicName}`);
    } else {
      setFollowedTopics(prev => [...prev, topicName]);
      showToast(`Following topic cluster: ${topicName} (Notified of updates)`);
    }
  };

  const handleAddComment = (id: string) => {
    const text = newCommentText[id] || "";
    if (!text.trim()) return;

    setCommentsMap(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { author: "You (Corporate Lead)", text }]
    }));
    setNewCommentText(prev => ({ ...prev, [id]: "" }));
    showToast("Comment posted successfully ✓");
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryText.trim()) return;

    showToast(`Lead transmitted to ${enquiryCompany} ✓ (Reference: iGEN-LD-${Math.floor(1000 + Math.random() * 9000)})`);
    setEnquiryCompany(null);
    setEnquiryText("");
  };

  // Filter logic
  const filteredStories = MOCK_GLOBAL_TRENDING_ARTICLES.filter(art => {
    // Search query filter
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Sector filter
    const matchesSector = selectedSectorFilter === "all" || art.sectorName.toLowerCase().includes(selectedSectorFilter.toLowerCase());

    // Geography filter
    const matchesGeography = selectedGeographyFilter === "all" || art.region === selectedGeographyFilter;

    // Time filter
    const matchesTime = activeTimeRange === "now" || art.timestamp === activeTimeRange;

    return matchesSearch && matchesSector && matchesGeography && matchesTime;
  });

  // Dynamic ranking recalculation based on current likes & shares
  const sortedStories = [...filteredStories].sort((a, b) => {
    let aVal = a.likes + (likedArticles.includes(a.id) ? 1 : 0);
    let bVal = b.likes + (likedArticles.includes(b.id) ? 1 : 0);
    return bVal - aVal;
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
        <span className="text-blue-500 font-bold">All Sectors</span>
      </nav>

      {/* ─── Premium Editorial Hero ─── */}
      <header className="mx-auto max-w-7xl px-4 pt-6 pb-4 lg:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Globe className="h-3 w-3" /> Global Leaderboard
              </span>
              <button 
                onClick={() => setShowHowItWorks(!showHowItWorks)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 text-[10px] font-semibold"
              >
                <HelpCircle className="h-3.5 w-3.5" /> How Trending Works
              </button>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Most Liked News — All Sectors
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium max-w-2xl leading-relaxed">
              Discover the trade and business stories receiving the highest engagement across industries and markets worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link 
              href="/en/news-poc/trending/most-liked/my"
              className="bg-white dark:bg-[#0f172a] hover:bg-gray-150 dark:hover:bg-gray-900 border border-gray-300 dark:border-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-3xs"
            >
              <Briefcase className="h-4 w-4 text-blue-500" /> Explore My Sectors →
            </Link>
            <button 
              onClick={() => {
                const leaderboardSec = document.getElementById("leaderboard-anchor");
                if (leaderboardSec) leaderboardSec.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10"
            >
              Explore Trending Stories
            </button>
          </div>
        </div>

        {/* How Trending Works Modal Overlay */}
        {showHowItWorks && (
          <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-905 p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Global Trend Methodology
              </h3>
              <button onClick={() => setShowHowItWorks(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              iGEN News ranks articles using a real-time engagement coefficient: <strong>(Likes * 1.5) + (Shares * 2.0) + (Comments * 1.0)</strong>, weighted heavily by article recency. Verified organic interactions form the complete basis for leaderboard calculation. Sponsored placements are strictly marked and cannot organically alter ranking positions.
            </p>
          </div>
        )}

        {/* ─── Hero-Adjacent Search & Filters Bar ─── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search trending stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
            {/* Time Controls */}
            <div className="flex bg-gray-50 dark:bg-gray-900/60 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800">
              {[
                { code: "now", label: "Now" },
                { code: "today", label: "Today" },
                { code: "week", label: "This Week" },
                { code: "month", label: "This Month" }
              ].map(time => (
                <button
                  key={time.code}
                  onClick={() => setActiveTimeRange(time.code as any)}
                  className={`text-[10px] font-extrabold px-3 py-1.5 rounded-md transition-all ${
                    activeTimeRange === time.code 
                      ? "bg-white dark:bg-[#0f172a] text-blue-600 dark:text-blue-400 shadow-3xs border border-gray-200 dark:border-gray-800" 
                      : "text-gray-400 hover:text-gray-700 dark:hover:text-slate-200"
                  }`}
                >
                  {time.label}
                </button>
              ))}
            </div>

            {/* Geography Filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900/60 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
              <Globe className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={selectedGeographyFilter}
                onChange={(e) => setSelectedGeographyFilter(e.target.value)}
                className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer"
              >
                <option value="all">Global Geography</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="North America">North America</option>
                <option value="Middle East">Middle East</option>
                <option value="Africa">Africa</option>
                <option value="Latin America">Latin America</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Global Trending Snapshot ─── */}
      <section className="mx-auto max-w-7xl px-4 pt-2 lg:px-6">
        <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">What's Trending Globally?</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { title: "#1 MOST LIKED", label: "AI Chip Packaging Fab Hub Ratifies Joint Ventures", metric: "24.8K Likes", sec: "Semiconductors & OSAT", color: "border-blue-500/20" },
            { title: "FASTEST RISING", label: "Freight EV swap standardization", metric: "+280 likes/hr", sec: "Automotive & Electric Vehicles", color: "border-emerald-500/20" },
            { title: "MOST DISCUSSED", label: "EU Carbon Border Tax revisions", metric: "880 Comments", sec: "Steel & Metallurgy", color: "border-purple-500/20" },
            { title: "MOST SHARED", label: "AI chip manufacturing expansion", metric: "4.8K Shares", sec: "Semiconductors & OSAT", color: "border-orange-500/20" },
            { title: "MOST ACTIVE SECTOR", label: "Energy & Utilities", metric: "18 Active Stories", sec: "High Activity", color: "border-pink-500/20" }
          ].map((item, idx) => (
            <div key={idx} className={`bg-white dark:bg-[#0f172a] border ${item.color} p-4 rounded-xl shadow-3xs flex flex-col justify-between min-h-[96px]`}>
              <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-wider">{item.title}</span>
              <div className="my-1">
                <p className="text-[10px] font-bold text-gray-900 dark:text-white line-clamp-1 leading-tight">{item.label}</p>
                <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 block mt-0.5">{item.metric}</span>
              </div>
              <span className="text-[8px] font-mono text-gray-400">{item.sec}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Loading / Skeleton Loader State ─── */}
      {isLoading ? (
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-6">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 min-h-[300px] animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map(x => (
                <div key={x} className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-4 animate-pulse flex gap-4">
                  <div className="h-16 w-16 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-2xl p-6 h-48 animate-pulse"></div>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* ─── #1 Global Most-Liked Story Hero Card ─── */}
          {sortedStories.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
              <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[380px] flex flex-col justify-end p-8 border border-slate-900 shadow-sm group">
                <div 
                  className="absolute inset-0 z-0 bg-cover bg-center group-hover:scale-102 transition-transform duration-350"
                  style={{ backgroundImage: `url(${sortedStories[0].image})` }}
                />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                
                {/* Metrics pill */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3 text-red-500" /> {((sortedStories[0].likes + (likedArticles.includes(sortedStories[0].id) ? 1 : 0)) / 1000).toFixed(1)}K Likes
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Share2 className="h-3 w-3" /> {(sortedStories[0].shares / 1000).toFixed(1)}K
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" /> {(commentsMap[sortedStories[0].id] || []).length + sortedStories[0].comments}
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {(sortedStories[0].views / 1000).toFixed(0)}K Views
                  </span>
                </div>

                <div className="relative z-10 space-y-4 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#E63946] text-white text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider block w-max">
                      Rank #1 • MOST LIKED
                    </span>
                    <span className="bg-emerald-500 text-slate-950 text-[9px] font-bold px-2 py-0.5 rounded tracking-wide font-mono flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3" /> Trend Score {sortedStories[0].trendScore}
                    </span>
                    <span className="bg-white/10 text-white text-[9px] font-bold px-2.5 py-0.5 rounded backdrop-blur-xs uppercase">
                      {sortedStories[0].sectorName}
                    </span>
                    <span className="text-slate-400 text-[10px] font-semibold">{sortedStories[0].country} • {sortedStories[0].date}</span>
                  </div>
                  
                  <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight text-[#FEC970]">
                    {sortedStories[0].title}
                  </h2>
                  <p className="text-slate-300 text-xs md:text-sm font-normal leading-relaxed max-w-xl">
                    {sortedStories[0].excerpt}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Link 
                      href={`/en/news-poc/article/${sortedStories[0].id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all inline-block uppercase tracking-wider text-center"
                    >
                      Read Full Story →
                    </Link>
                    {sortedStories[0].companyName && (
                      <button 
                        onClick={() => {
                          setEnquiryCompany(sortedStories[0].companyName || null);
                          setEnquiryType("quote");
                        }}
                        className="bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider"
                      >
                        View Company ({sortedStories[0].companyName}) →
                      </button>
                    )}
                    <button 
                      onClick={() => handleBookmark(sortedStories[0].id)}
                      className={`h-9 w-9 flex items-center justify-center rounded-xl border transition-colors ${
                        bookmarkedArticles.includes(sortedStories[0].id)
                          ? "bg-amber-500 border-amber-500 text-gray-955"
                          : "border-white/30 text-white hover:bg-white/10"
                      }`}
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => showToast("Copied link to clipboard!")}
                      className="h-9 w-9 flex items-center justify-center rounded-xl border border-white/30 text-white hover:bg-white/10 transition-colors"
                    >
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ─── Main Two-Column Layout ─── */}
          <section id="leaderboard-anchor" className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* ── LEFT COLUMN: Leaderboard & Feed ── */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Leaderboard Header with Filter */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3 flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Global Most-Liked Stories
                    </h2>
                    <span className="text-[10px] text-gray-400 block font-normal">Ranked by user interactions and velocity indices.</span>
                  </div>

                  {/* Sector Filter Dropdown */}
                  <div className="flex items-center gap-1.5 bg-white dark:bg-[#0f172a] px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
                    <Filter className="h-3.5 w-3.5 text-gray-400" />
                    <select
                      value={selectedSectorFilter}
                      onChange={(e) => setSelectedSectorFilter(e.target.value)}
                      className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer"
                    >
                      <option value="all">All Sectors</option>
                      <option value="Semiconductors">Semiconductors</option>
                      <option value="Energy">Energy & Clean Tech</option>
                      <option value="Automotive">Automotive & EVs</option>
                      <option value="Steel">Steel & Metallurgy</option>
                      <option value="Banking">BFSI & Finance</option>
                      <option value="Chemicals">Chemicals & Minerals</option>
                      <option value="Agriculture">Agriculture & Farming</option>
                      <option value="Health">Healthcare & Pharma</option>
                    </select>
                  </div>
                </div>

                {/* Ranked Feed list */}
                {sortedStories.length > 0 ? (
                  <div className="space-y-4">
                    {sortedStories.map((story, index) => {
                      const commentsCount = (commentsMap[story.id] || []).length + story.comments;
                      const displayLikes = story.likes + (likedArticles.includes(story.id) ? 1 : 0);
                      
                      return (
                        <div 
                          key={story.id} 
                          className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm flex gap-4 hover:border-blue-500/35 transition-all group"
                        >
                          {/* Rank Badge Column */}
                          <div className="flex flex-col items-center justify-start pt-1 gap-1 shrink-0">
                            <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                              #{index + 1}
                            </span>
                            {/* Movement indicator */}
                            {story.rankMovement === "up" && (
                              <span className="text-[8px] font-bold text-emerald-500 flex items-center font-mono">
                                ↑ {story.rankMovementValue}
                              </span>
                            )}
                            {story.rankMovement === "down" && (
                              <span className="text-[8px] font-bold text-red-500 flex items-center font-mono">
                                ↓ {story.rankMovementValue}
                              </span>
                            )}
                            {story.rankMovement === "stable" && (
                              <span className="text-[8px] font-bold text-gray-400 flex items-center font-mono">
                                →
                              </span>
                            )}
                            {story.rankMovement === "new" && (
                              <span className="text-[8px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 px-1 py-0.2 rounded font-mono uppercase scale-90">
                                NEW
                              </span>
                            )}
                          </div>

                          {/* Image Column */}
                          <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden bg-gray-100 shrink-0 relative">
                            <img 
                              src={story.image} 
                              alt={story.title} 
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            {story.sponsored && (
                              <span className="absolute top-1 left-1 bg-amber-500 text-gray-950 text-[6px] font-bold px-1 rounded font-mono uppercase">
                                Ad
                              </span>
                            )}
                          </div>

                          {/* Content Column */}
                          <div className="flex-1 space-y-1.5">
                            <div className="flex justify-between items-center text-[9px]">
                              <div className="flex items-center gap-2">
                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                                  story.sponsored 
                                    ? "bg-amber-100 text-amber-805 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400"
                                    : "bg-blue-50 text-blue-600 dark:bg-blue-950/20"
                                }`}>
                                  {story.sponsored ? "Sponsored Content" : "Leaderboard Story"}
                                </span>
                                <span className="text-gray-400">{story.country} • {story.date}</span>
                              </div>
                              <span className="text-[9px] font-extrabold text-blue-500">{story.sectorName}</span>
                            </div>

                            <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">
                              {story.title}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-normal line-clamp-2">
                              {story.excerpt}
                            </p>

                            <div className="flex justify-between items-center pt-2 text-[10px] flex-wrap gap-2">
                              {/* Statistics metrics */}
                              <div className="flex items-center gap-3.5 font-bold text-gray-500">
                                <span className="flex items-center gap-1 text-red-500"><ThumbsUp className="h-3.5 w-3.5" /> {displayLikes.toLocaleString()} Likes</span>
                                <span className="flex items-center gap-1"><Share2 className="h-3.5 w-3.5" /> {story.shares.toLocaleString()}</span>
                                <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {commentsCount}</span>
                                <span className="flex items-center gap-1 font-mono text-[9px] bg-gray-100 dark:bg-gray-900/60 px-1.5 py-0.5 rounded">TS: {story.trendScore}/100</span>
                              </div>

                              {/* Interactive actions */}
                              <div className="flex items-center gap-2 shrink-0">
                                <button 
                                  onClick={() => handleLike(story.id)}
                                  className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                                    likedArticles.includes(story.id)
                                      ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400"
                                      : "text-gray-500 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                                  }`}
                                >
                                  {likedArticles.includes(story.id) ? "Liked ❤️" : "Like"}
                                </button>
                                <button 
                                  onClick={() => handleBookmark(story.id)}
                                  className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                                    bookmarkedArticles.includes(story.id)
                                      ? "bg-amber-500 border-amber-500 text-gray-950"
                                      : "text-gray-500 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                                  }`}
                                >
                                  {bookmarkedArticles.includes(story.id) ? "Saved ✓" : "Save"}
                                </button>
                                <Link 
                                  href={`/en/news-poc/article/${story.id}`}
                                  className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900/60 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                                >
                                  Read →
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-12 rounded-3xl text-center space-y-3">
                    <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto" />
                    <p className="text-xs font-bold text-gray-500">No highly engaging stories are available for the selected filters right now.</p>
                    <button 
                      onClick={() => {
                        setSelectedSectorFilter("all");
                        setSelectedGeographyFilter("all");
                        setSearchQuery("");
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-4 py-2 rounded-xl transition-all"
                    >
                      Reset All Filters
                    </button>
                  </div>
                )}

                {/* ── Fastest Rising Stories ── */}
                <div className="space-y-4 pt-6">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Velocity Index — Fastest Spreading Today
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { title: "Bilateral Tariff Negotiations: EU Carbon Tax Revisions", sector: "Steel & Metallurgy", velocity: "+320 Likes/hr", rank: "#04 ↑ 1", desc: "Sourcing managers and heavy metal exporters sharing and commenting heavily." },
                      { title: "GIFT City Offshore Banking Hub Registers 35% Asset Growth", sector: "Banking & BFSI", velocity: "+180 Likes/hr", rank: "#05 → Stable", desc: "Corporate financial leads discussing compliance guidelines on public boards." }
                    ].map((story, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm flex flex-col justify-between min-h-[120px]">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[8px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                              FASTEST RISING
                            </span>
                            <span className="text-[9px] font-bold text-gray-400">{story.rank}</span>
                          </div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">{story.title}</h4>
                          <p className="text-[10px] text-gray-400 font-normal leading-tight line-clamp-2">{story.desc}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2 text-[10px] border-t border-gray-50 dark:border-gray-800 mt-2">
                          <span className="text-[9px] text-gray-400 font-semibold">{story.sector}</span>
                          <span className="text-xs font-extrabold text-emerald-500">{story.velocity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Top Story by Sector Matrix ── */}
                <div className="space-y-4 pt-6">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Most-Liked Story by Major Sector
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {[
                      { code: "S46", name: "Semiconductors", title: "AI Chip Packaging Fab Hub Ratifies Joint Ventures", likes: "24.8K Likes" },
                      { code: "S17", name: "Energy & Utilities", title: "Offshore Solar Interconnection standard Ratified", likes: "21.4K Likes" },
                      { code: "S45", name: "Automotive & EVs", title: "Commercial Freight EV Swap Batteries Standardized", likes: "18.9K Likes" },
                      { code: "S41", name: "Banking & Finance", title: "GIFT City Offshore Banking Hub Registers 35% Asset Growth", likes: "15.4K Likes" },
                      { code: "S07", name: "Chemicals & Minerals", title: "Specialty Chemicals Export Output Hits Record High", likes: "13.2K Likes" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3 rounded-xl shadow-sm flex flex-col justify-between min-h-[140px] text-left">
                        <div>
                          <span className="text-[8px] font-bold text-blue-500 uppercase block mb-1">{item.name}</span>
                          <p className="text-[10px] font-bold text-gray-900 dark:text-white leading-tight line-clamp-3">{item.title}</p>
                        </div>
                        <div className="pt-2 border-t border-gray-50 dark:border-gray-800 mt-2">
                          <span className="text-[10px] font-extrabold text-red-500 block mb-1">{item.likes}</span>
                          <Link 
                            href={`/en/news-poc/sector/${item.code}`} 
                            className="text-[8px] font-bold text-blue-600 dark:text-blue-400 uppercase hover:underline"
                          >
                            Explore Sector trends →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Most Engaged Sectors Leaderboard ── */}
                <div className="space-y-4 pt-6">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2 flex justify-between items-center">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Most Engaged Sectors (Platform-Wide)
                    </h3>
                    <span className="text-[9px] text-gray-400 font-semibold font-mono">Updated hourly</span>
                  </div>

                  <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-4 divide-y divide-gray-100 dark:divide-gray-800">
                    {[
                      { rank: "🥇", name: "Semiconductors & OSAT", code: "S46", rating: "98/100 Velocity", stories: 12 },
                      { rank: "🥈", name: "Energy & Sustainability", code: "S17", rating: "94/100 Velocity", stories: 21 },
                      { rank: "🥉", name: "Automotive & Electric Vehicles", code: "S45", rating: "88/100 Velocity", stories: 27 },
                      { rank: "4.", name: "Banking & Financial Services (BFSI)", code: "S41", rating: "82/100 Velocity", stories: 14 },
                      { rank: "5.", name: "Chemicals & Fertilizers & Minerals", code: "S07", rating: "79/100 Velocity", stories: 9 }
                    ].map((sec, idx) => (
                      <div key={idx} className="flex justify-between items-center py-2 text-xs">
                        <div className="flex items-center gap-3">
                          <span className="font-extrabold text-gray-400 w-5 text-center">{sec.rank}</span>
                          <div>
                            <span className="font-bold text-gray-900 dark:text-white block">{sec.name}</span>
                            <span className="text-[9px] text-gray-400 block font-normal">{sec.stories} stories active this week</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 block">{sec.rating}</span>
                          <Link href={`/en/news-poc/sector/${sec.code}`} className="text-[9px] font-bold text-gray-400 hover:text-blue-500 uppercase">
                            View Trends →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN: Sidebar Widgets ── */}
              <div className="space-y-6">
                
                {/* ── Personalized Bridge to My Sectors ── */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white border border-blue-950 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="bg-white/10 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block w-max">
                    Personalized Portal
                  </span>
                  <h4 className="font-display text-sm font-bold leading-tight">
                    Want Trends From Your Sectors?
                  </h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                    See the most-liked stories specifically from the sectors you follow and manage your customized tracking alerts.
                  </p>
                  <Link 
                    href="/en/news-poc/trending/most-liked/my"
                    className="w-full text-center bg-white hover:bg-gray-100 text-blue-900 font-bold text-xs py-2 rounded-xl transition-all uppercase tracking-wider block"
                  >
                    Explore My Sectors →
                  </Link>
                </div>

                {/* ── AI Trend Intelligence Unlocker ── */}
                <div className="bg-slate-900 text-white border border-slate-900 p-5 rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 pointer-events-none" />
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">AI Trend Intelligence</span>
                      <span className="bg-amber-500 text-gray-900 text-[8px] font-bold px-2 py-0.5 rounded-full ml-auto font-extrabold font-sans">PRO ACCESS</span>
                    </div>

                    <h4 className="text-xs font-bold leading-snug">
                      Why is this story trending globally?
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
                            className="bg-amber-500 hover:bg-amber-600 text-gray-955 font-extrabold px-2.5 py-1 rounded font-sans uppercase shrink-0"
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
                          className="text-[8px] text-slate-400 hover:underline uppercase font-bold"
                        >
                          Lock View
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Trending Topic Clusters ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Trending Topics Globally
                  </span>
                  <div className="space-y-3.5">
                    {MOCK_TOPIC_CLUSTERS.map((topic, idx) => (
                      <div key={idx} className="flex justify-between items-start text-xs">
                        <div className="space-y-0.5">
                          <span className="font-bold text-blue-600 dark:text-blue-400 block hover:underline cursor-pointer">
                            #{topic.name.replace(/\s+/g, "")}
                          </span>
                          <span className="text-[9px] text-gray-400 block font-normal">{topic.sector} • {topic.count} stories</span>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end gap-1">
                          <span className="text-[10px] font-bold block">{topic.engagement}</span>
                          <button 
                            onClick={() => handleFollowTopic(topic.name)}
                            className={`text-[8px] font-bold uppercase transition-colors px-1.5 py-0.5 rounded ${
                              followedTopics.includes(topic.name)
                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-300/35"
                                : "text-gray-400 hover:text-blue-500"
                            }`}
                          >
                            {followedTopics.includes(topic.name) ? "Followed ✓" : "+ Follow"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Most Discussed & Most Shared Previews ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-850 p-5 rounded-2xl shadow-3xs space-y-4">
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                      Most Discussed Preview
                    </span>
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold leading-tight">EU Carbon Border Tax Revisions Draw Industry Debate</p>
                      <div className="flex justify-between items-center text-[9px] text-gray-400">
                        <span>Trade Compliance</span>
                        <span className="font-extrabold text-blue-600 dark:text-blue-400">880 Comments</span>
                      </div>
                      <Link 
                        href="/en/news-poc/trending/most-commented/my"
                        className="block text-center border border-gray-250 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-900 text-[9px] font-bold py-1.5 rounded transition-colors uppercase text-gray-600 dark:text-gray-300"
                      >
                        View Most Commented →
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                      Most Shared Preview
                    </span>
                    <div className="space-y-2">
                      <p className="text-[11px] font-bold leading-tight">AI Chip Packaging Fab Hub Ratifies Joint Ventures</p>
                      <div className="flex justify-between items-center text-[9px] text-gray-400">
                        <span>Semiconductors</span>
                        <span className="font-extrabold text-emerald-500">4.8K Shares</span>
                      </div>
                      <Link 
                        href="/en/news-poc/trending/most-shared/my"
                        className="block text-center border border-gray-250 dark:border-gray-850 hover:bg-gray-50 dark:hover:bg-gray-900 text-[9px] font-bold py-1.5 rounded transition-colors uppercase text-gray-600 dark:text-gray-300"
                      >
                        View Most Shared →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ── Community Discussion Previews ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    What Is the Community Saying?
                  </span>
                  
                  <div className="space-y-4">
                    {sortedStories.slice(0, 2).map((story) => {
                      const comments = commentsMap[story.id] || [];
                      return (
                        <div key={story.id} className="space-y-2">
                          <span className="text-[9px] font-bold text-gray-400 block truncate">{story.title}</span>
                          <div className="space-y-2 max-h-32 overflow-y-auto pl-2 border-l border-blue-500/20">
                            {comments.map((c, cIdx) => (
                              <div key={cIdx} className="text-[10px] space-y-0.5">
                                <span className="font-bold text-gray-950 dark:text-white block">{c.author}</span>
                                <p className="text-gray-500 dark:text-gray-400 font-normal leading-tight">{c.text}</p>
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
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
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
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 italic leading-snug font-normal">
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

                {/* ── Companies Driving Today's Trends ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Companies Driving Today's Trends
                  </span>
                  
                  <div className="space-y-3.5">
                    {MOCK_COMPANIES_DRIVING.map((company, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex gap-2 items-center">
                          <div className="h-6 w-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-blue-600 rounded text-[10px] shrink-0">
                            {company.logo}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-extrabold text-gray-900 dark:text-white text-xs">{company.name}</span>
                              {company.verified && <span className="text-blue-500 text-[10px]">✓</span>}
                            </div>
                            <span className="text-[8px] text-gray-400 block font-normal">{company.sector}</span>
                          </div>
                          <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold ml-auto shrink-0">{company.storyCount} stories active</span>
                        </div>
                        <button 
                          onClick={() => setEnquiryCompany(company.name)}
                          className="w-full text-center border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 text-[9px] font-bold py-1 rounded transition-colors uppercase font-sans"
                        >
                          View Company →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Trending Products & Services ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Trending Products & Services
                  </span>
                  
                  <div className="space-y-2 text-xs">
                    {[
                      { name: "OSAT Advanced Silicon Packaging", company: "NVIDIA", link: "/eoi" },
                      { name: "Offshore Solar Power Inverters", company: "Nexus Dynamics", link: "/eoi" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white block leading-tight">{item.name}</span>
                          <span className="text-[9px] text-gray-400 block font-normal">By {item.company}</span>
                        </div>
                        <Link href={item.link} className="text-[9px] font-bold text-blue-500 hover:underline uppercase shrink-0">Explore Providers →</Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Global Trend Map ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Where Is the Attention Coming From?
                  </span>
                  <div className="space-y-2">
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal font-normal font-semibold">
                      High-density engagement hubs tracking client actions across core shipping lanes:
                    </p>
                    <div className="space-y-2 font-semibold text-[10px]">
                      {[
                        { country: "🇺🇸 United States", traffic: "38% active traffic", sec: "Technology & Semiconductors" },
                        { country: "🇮🇳 India", traffic: "28% active traffic", sec: "Banking & Infrastructure" },
                        { country: "🇩🇪 Germany", traffic: "18% active traffic", sec: "Clean Tech & Metallurgy" },
                        { country: "🇸🇬 Singapore", traffic: "16% active traffic", sec: "Logistics & Supply Chain" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-100 dark:border-gray-800">
                          <div>
                            <span className="text-gray-950 dark:text-white block">{item.country}</span>
                            <span className="text-[8px] text-gray-400 block font-normal">{item.sec}</span>
                          </div>
                          <span className="text-blue-500 font-bold shrink-0">{item.traffic}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Premium Global Intelligence CTA ── */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white border border-blue-950 p-5 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-display text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Unlock Global Trend Intelligence
                  </h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                    Get full access to ranking history grids, comparative growth statistics, and geographic interest breakdowns.
                  </p>
                  
                  <ul className="space-y-2 text-[10px] text-slate-350 font-semibold">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Advanced Trend Analytics
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Country & Region Comparisons
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Daily/Weekly Custom Trend Alerts
                    </li>
                  </ul>

                  <button 
                    onClick={() => showToast("Opening premium checkout flow...")}
                    className="w-full text-center bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Upgrade to Premium
                  </button>
                </div>

                {/* ── Sponsored Global Story (SPONSORED) ── */}
                <div className="border border-blue-200/50 dark:border-blue-900/40 bg-blue-50/10 dark:bg-blue-900/5 p-4 rounded-xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/20">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Featured Global Story</span>
                    <span className="bg-amber-500 text-gray-955 text-[7px] font-extrabold px-1.5 py-0.5 rounded font-mono">SPONSORED</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-blue-500 uppercase">Sustainable Metallurgy Report</span>
                    <h5 className="text-xs font-bold text-gray-950 dark:text-white leading-tight">Green Greenfield Hydrogen Production Standards ratified</h5>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal font-normal">
                      A comprehensive analysis on clean power grids bypasses grid fees by 18%.
                    </p>
                  </div>
                  <button 
                    onClick={() => showToast("Accessing sponsored research bulletin...")}
                    className="w-full text-center border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                  >
                    Read Report
                  </button>
                </div>

                {/* ── Sponsored Sector Spotlight ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Sector Spotlight</span>
                    <span className="text-amber-500 text-[7px] font-extrabold font-mono uppercase">Featured Sponsor</span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <div className="h-8 w-8 bg-blue-600 text-white flex items-center justify-center font-bold text-xs rounded shrink-0">ND</div>
                    <div>
                      <span className="font-bold text-xs text-gray-900 dark:text-white block leading-tight">Nexus Dynamics</span>
                      <span className="text-[8px] text-gray-400 block font-normal">Energy & Circular Economy Solutions</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setEnquiryCompany("Nexus Dynamics")}
                    className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold py-1.5 rounded uppercase"
                  >
                    Request Information
                  </button>
                </div>

                {/* ── Advertisement Banner Slot ── */}
                <div className="bg-gray-100 dark:bg-gray-950/60 border border-gray-200 dark:border-gray-800 border-dashed p-4 rounded-2xl text-center space-y-1">
                  <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-widest">Advertisement</span>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">iGEN Ad Network · 300 × 250 Banner Slot</p>
                  <Link href="/eoi" className="text-[9px] font-bold text-blue-500 hover:underline block uppercase mt-1">Request Placement</Link>
                </div>

                {/* ── Newsletter: Global Trending Brief ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Global Trending Brief
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    Get the world's most-engaging trade and business stories delivered to your inbox daily or weekly.
                  </p>
                  
                  {!newsletterSubscribed ? (
                    <div className="space-y-2">
                      <input 
                        type="email" 
                        placeholder="work@corporation.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500"
                      />
                      <div className="flex gap-2">
                        <button 
                          onClick={() => { if (emailInput.trim()) { setNewsletterSubscribed(true); showToast("Subscribed Daily Digest ✓"); } }}
                          className="flex-1 bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-1.5 rounded-lg transition-colors uppercase text-[9px]"
                        >
                          Daily
                        </button>
                        <button 
                          onClick={() => { if (emailInput.trim()) { setNewsletterSubscribed(true); showToast("Subscribed Weekly Digest ✓"); } }}
                          className="flex-1 bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-1.5 rounded-lg transition-colors uppercase text-[9px]"
                        >
                          Weekly
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Subscribed to Global Trending Brief!
                    </div>
                  )}
                </div>

              </div>

            </div>
          </section>
        </>
      )}

      {/* ─── CRM Lead Generation Overlay Modal ─── */}
      {enquiryCompany && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold">
                  Lead Inquiry Hub
                </h3>
                <span className="text-[10px] text-gray-400 block font-normal">Secure B2B channel to {enquiryCompany}</span>
              </div>
              <button 
                onClick={() => setEnquiryCompany(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSendEnquiry} className="space-y-4">
              <div className="space-y-1.5">
                <span className="text-[8px] text-gray-400 uppercase font-bold">Inquiry Type</span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { code: "info", label: "Request Info" },
                    { code: "quote", label: "Request Quote" },
                    { code: "enquiry", label: "Business Enquiry" }
                  ].map(t => (
                    <button
                      key={t.code}
                      type="button"
                      onClick={() => setEnquiryType(t.code)}
                      className={`text-[9px] font-bold py-2 rounded-lg border transition-all ${
                        enquiryType === t.code 
                          ? "bg-blue-600 border-blue-600 text-white shadow-3xs"
                          : "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-800 text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[8px] text-gray-400 uppercase font-bold">Message Details</span>
                <textarea 
                  required
                  rows={4}
                  value={enquiryText}
                  onChange={(e) => setEnquiryText(e.target.value)}
                  placeholder={`Describe your requirements for ${enquiryCompany} here...`}
                  className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500 text-gray-955 dark:text-white"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2.5 rounded-xl transition-colors uppercase text-xs shadow-md shadow-blue-900/10"
              >
                Transmit B2B Inquiry
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── Toast Notifications ─── */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-900/95 dark:bg-slate-900/95 text-white border border-slate-800 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 max-w-sm backdrop-blur-xs">
          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-[11px] font-bold">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, Share2, Lock, ChevronRight, Search, AlertTriangle, 
  CheckCircle, ThumbsUp, Bookmark, MessageCircle, ArrowLeft, X, HelpCircle, 
  TrendingUp, Globe, Filter, Star, Briefcase, Eye, ChevronDown, Check,
  MessageSquare, Flame, ShieldAlert
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
  commentVelocity: string; // e.g. "+145 comments/hr"
  isControversial: boolean;
  proSentimentRatio: number; // e.g. 48 for 48% positive
}

interface TopicCluster {
  name: string;
  discussionsCount: number;
  commentsCount: string;
  sector: string;
  countries: string;
  latestStory: string;
}

interface ExpertComment {
  name: string;
  role: string;
  text: string;
  isVerified: boolean;
  avatar: string;
}

interface CompanyLeaderboard {
  name: string;
  logo: string;
  sector: string;
  discussionsCount: number;
  latestStory: string;
  verified: boolean;
}

interface ProductServiceItem {
  name: string;
  category: string;
  provider: string;
  commentsCount: string;
  growth: string;
}

interface CountryMetric {
  name: string;
  flag: string;
  commentsCount: string;
  topSector: string;
  topStory: string;
  commentsValue: number; // raw for sorting
}

interface CommunityContributor {
  name: string;
  commentsCount: number;
  badge: "Industry Expert" | "Verified Professional" | "Community Contributor";
  points: number;
  avatar: string;
}

const MOCK_COMMENTED_ARTICLES: Article[] = [
  {
    id: "tc-all-1",
    title: "Global AI Sovereignty Regulations Trigger Intense Compliance Audits",
    excerpt: "Nations assert regulatory boundaries over offshore GPU clusters. Legal leads and enterprise technology architects debate certification timelines and data localized storage guidelines.",
    sectorCode: "S02",
    sectorName: "AI & Cyber Security",
    country: "Multilateral Lanes",
    region: "Global",
    date: "1 hr ago",
    comments: 18420,
    likes: 7200,
    shares: 5400,
    views: 295000,
    isTrending: true,
    sponsored: false,
    author: "Dr. Aris Thorne",
    role: "AI Sourcing Advisor",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    topic: "AI Regulation",
    whyTrending: "Active debates on whether local fabrication clusters require sovereign clearance certificates.",
    sentiment: 48,
    timestamp: "now",
    rankMovement: "up",
    rankMovementValue: 3,
    commentVelocity: "+320 comments/hr",
    isControversial: true,
    proSentimentRatio: 48
  },
  {
    id: "tc-all-2",
    title: "Cross-Border Solar Grid Interconnection Rules Sparks Sovereign Grid Disputes",
    excerpt: "Ministerial committees reject private power dispatch licensing frameworks. Utility companies claim distribution fees offset carbon savings by 14%, starting regulatory deadlock.",
    sectorCode: "S17",
    sectorName: "Energy & Sustainability",
    country: "Germany-Norway",
    region: "Europe",
    date: "3 hrs ago",
    comments: 16210,
    likes: 6100,
    shares: 4800,
    views: 220000,
    isTrending: true,
    sponsored: false,
    author: "Elena Rostova",
    role: "Grid Policy Counsel",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Energy Transition Policy",
    whyTrending: "Spike in comments as grid administrators defend regional transmission grid fee monopolies.",
    sentiment: 58,
    timestamp: "now",
    rankMovement: "new",
    commentVelocity: "+240 comments/hr",
    isControversial: false,
    proSentimentRatio: 58
  },
  {
    id: "tc-all-3",
    title: "Bilateral Packaging Fabs Subsidies Allocation Criticized by Domestic Builders",
    excerpt: "Sourcing leaders debate priority funding corridors. Independent assembly firms argue that state subsidies favor legacy multinationals over agile domestic chip packaging startups.",
    sectorCode: "S46",
    sectorName: "Semiconductors & OSAT",
    country: "USA-Taiwan Lanes",
    region: "North America",
    date: "5 hrs ago",
    comments: 14820,
    likes: 5400,
    shares: 3200,
    views: 180000,
    isTrending: true,
    sponsored: false,
    author: "Satoshi Yamamoto",
    role: "Sourcing Analyst",
    image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=900&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    topic: "Semiconductor Supply Chain",
    whyTrending: "Heavily debated funding targets with active arguments on domestic wafer reliance metrics.",
    sentiment: 66,
    timestamp: "today",
    rankMovement: "up",
    rankMovementValue: 1,
    commentVelocity: "+180 comments/hr",
    isControversial: true,
    proSentimentRatio: 52
  },
  {
    id: "tc-all-4",
    title: "Global Custodian Banking Asset Standards Split Offshore Asset Managers",
    excerpt: "Revised CEPA banking guidelines create friction between bilateral credit brokers. Smaller asset pools claim capital reserves constraints favor legacy custody groups.",
    sectorCode: "S41",
    sectorName: "Banking & Financial Services (BFSI)",
    country: "India-UAE",
    region: "Middle East",
    date: "8 hrs ago",
    comments: 11240,
    likes: 4900,
    shares: 2100,
    views: 135000,
    isTrending: true,
    sponsored: false,
    author: "Rajesh Kumar",
    role: "Offshore Finance Editor",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&auto=format&fit=crop&q=80",
    topic: "Bilateral Capital Flows",
    whyTrending: "Offshore compliance rules split community opinions on regional capital export incentives.",
    sentiment: 64,
    timestamp: "today",
    rankMovement: "down",
    rankMovementValue: 2,
    commentVelocity: "+110 comments/hr",
    isControversial: false,
    proSentimentRatio: 64
  },
  {
    id: "tc-all-5",
    title: "API feedstock Tariffs Disrupt Generic Sourcing Timelines",
    excerpt: "Clinical boards and generic drug manufacturers face tariff adjustments on core materials. Sourcing networks claim supply delays will increase pricing indexes by 18%.",
    sectorCode: "S23",
    sectorName: "Health & Family Welfare & Pharma",
    country: "Germany-India Hubs",
    region: "Asia",
    date: "12 hrs ago",
    comments: 9890,
    likes: 3800,
    shares: 1800,
    views: 115000,
    isTrending: false,
    sponsored: false,
    author: "Priya Sundaram",
    role: "Pharma Sourcing Expert",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Pharma Sourcing Tariffs",
    whyTrending: "Generic drug formulators debate self-reliance compliance timelines.",
    sentiment: 42,
    timestamp: "today",
    rankMovement: "stable",
    commentVelocity: "+85 comments/hr",
    isControversial: true,
    proSentimentRatio: 42
  },
  {
    id: "tc-all-6",
    title: "Green Steel Scope-3 Compliance Protocols Trigger Bilateral Deadlock",
    excerpt: "Metal exporters clash over carbon audit timeline structures. Small scale mills claim scopes calculations penalize direct shipments under CEPA clearances.",
    sectorCode: "S37",
    sectorName: "Steel & Metallurgy",
    country: "EU-India Lanes",
    region: "Europe",
    date: "1 day ago",
    comments: 8400,
    likes: 2900,
    shares: 1400,
    views: 92000,
    isTrending: false,
    sponsored: true,
    author: "Sonia Marchetti",
    role: "Trade Compliance Counsel",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&auto=format&fit=crop&q=80",
    topic: "Trade Policy Revisions",
    whyTrending: "A sponsored debate review examining metallurgy scope emission balances.",
    sentiment: 50,
    timestamp: "week",
    rankMovement: "down",
    rankMovementValue: 1,
    commentVelocity: "+55 comments/hr",
    isControversial: false,
    proSentimentRatio: 50
  }
];

// Topics creating debates
const TOPIC_CLUSTERS: TopicCluster[] = [
  { name: "AI Regulation", discussionsCount: 24, commentsCount: "24K Comments", sector: "AI & Cyber Security", countries: "USA, EU, India", latestStory: "Global AI Sovereignty Regulations Trigger Intense Compliance Audits" },
  { name: "Global Trade Policy", discussionsCount: 18, commentsCount: "18K Comments", sector: "BFSI & Finance", countries: "India, UAE, EU", latestStory: "Global Custodian Banking Asset Standards Split Offshore Managers" },
  { name: "Energy Transition", discussionsCount: 16, commentsCount: "16K Comments", sector: "Energy & Clean Tech", countries: "Germany, Norway", latestStory: "Cross-Border Solar Grid Interconnection Rules Sparks Disputes" },
  { name: "EV Policy", discussionsCount: 14, commentsCount: "14K Comments", sector: "Automotive & EVs", countries: "USA, Canada", latestStory: "Freight EV battery geometries standards scuffed" }
];

// Expert Perspectives
const MOCK_EXPERT_COMMENTS: ExpertComment[] = [
  { 
    name: "Dr. Ramesh Nair", 
    role: "Agri Policy Expert", 
    text: "Sovereign grid rules will create distribution voids. Independent developers must negotiate private metallurgy corridors to remain solvent.",
    isVerified: true,
    avatar: "RN"
  },
  { 
    name: "Sonia Marchetti", 
    role: "Sourcing Counsel", 
    text: "Scope-3 auditing compliance requires real-time ledger accounting. Fines will hit exporters long before technology corridors align.",
    isVerified: true,
    avatar: "SM"
  }
];

// Companies driving conversations
const MOCK_COMPANIES: CompanyLeaderboard[] = [
  { name: "Nexus Dynamics", logo: "ND", sector: "Energy & Sustainability", discussionsCount: 14, latestStory: "Cross-Border Solar Grid Interconnection Rules Sparks Sovereign Grid Disputes", verified: true },
  { name: "NVIDIA", logo: "NV", sector: "AI & Electronics", discussionsCount: 11, latestStory: "Global AI Sovereignty Regulations Trigger Intense Compliance Audits", verified: true }
];

// Products getting attention
const MOCK_PRODUCTS: ProductServiceItem[] = [
  { name: "Sovereign GPU Clusters", category: "AI Hardware", provider: "NVIDIA Corp", commentsCount: "4.8K Comments", growth: "+38% Growth" },
  { name: "Hybrid solar Inverters", category: "Renewable Systems", provider: "Nexus Dynamics", commentsCount: "3.2K Comments", growth: "+25% Growth" }
];

// Countries showing most discussion activity
const MOCK_COUNTRIES_DISCUSSING: CountryMetric[] = [
  { name: "India", flag: "🇮🇳", commentsCount: "82K Comments", topSector: "Technology & AI", topStory: "Global AI Sovereignty Regulations Trigger Audits", commentsValue: 82000 },
  { name: "USA", flag: "🇺🇸", commentsCount: "76K Comments", topSector: "Semiconductors & OSAT", topStory: "Bilateral Packaging Fabs Subsidies Allocation Criticized", commentsValue: 76000 },
  { name: "Germany", flag: "🇩🇪", commentsCount: "54K Comments", topSector: "Energy & Sustainability", topStory: "Cross-Border Solar Grid Interconnection Rules Sparks Disputes", commentsValue: 54000 },
  { name: "UAE", flag: "🇦🇪", commentsCount: "41K Comments", topSector: "Offshore Custodian Banking", topStory: "Global Custodian Banking Asset Standards Split Managers", commentsValue: 41000 }
];

// Community contributors
const MOCK_CONTRIBUTORS: CommunityContributor[] = [
  { name: "Devika Sharma", commentsCount: 184, badge: "Industry Expert", points: 960, avatar: "DS" },
  { name: "Vivek Murthy", commentsCount: 120, badge: "Verified Professional", points: 640, avatar: "VM" },
  { name: "Marcus Aurelius", commentsCount: 92, badge: "Community Contributor", points: 410, avatar: "MA" }
];

// Interactive map heatmap data
const MOCK_HEATMAP_REGIONS = [
  { region: "Asia", volume: "1.24M Comments", topSector: "AI & Tech", activeDebates: 38 },
  { region: "Europe", volume: "980K Comments", topSector: "Clean Grids & Carbon Policy", activeDebates: 26 },
  { region: "North America", volume: "820K Comments", topSector: "Wafer assembly Fabs", activeDebates: 19 },
  { region: "Middle East", volume: "410K Comments", topSector: "Offshore BFSI", activeDebates: 11 }
];

interface Props {
  onBack?: () => void;
}

export default function NewsPOCTrendingMostCommentedAllSectors({ onBack }: Props) {
  // Filters state
  const [activeTimeRange, setActiveTimeRange] = useState<"now" | "today" | "week" | "month">("now");
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [selectedGeographyFilter, setSelectedGeographyFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Interactive hooks
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);
  const [commentsMap, setCommentsMap] = useState<Record<string, { author: string; text: string; role?: string }[]>>({
    "tc-all-1": [
      { author: "Marcus Aurelius", role: "Sourcing Lead", text: "Localized data storage mandates double operating expenses for offshore GPU networks." }
    ],
    "tc-all-2": [
      { author: "Vivek Murthy", role: "Grid Advisor", text: "Monopolies reject clean solar feed points to protect retail distribution tariffs." }
    ]
  });
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});

  // Dynamic poll vote states
  const [pollVotes, setPollVotes] = useState({ accelerate: 410, slow: 280, noImpact: 84 });
  const [hasVoted, setHasVoted] = useState(false);

  // CRM Lead generation simulator
  const [enquiryCompany, setEnquiryCompany] = useState<string | null>(null);
  const [enquiryType, setEnquiryType] = useState<string>("info");
  const [enquiryText, setEnquiryText] = useState("");

  // Alerts & Newsletter
  const [subscribedNewsletter, setSubscribedNewsletter] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [alertConfigured, setAlertConfigured] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState("10,000");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Interactive Heatmap region selector
  const [selectedHeatmapRegion, setSelectedHeatmapRegion] = useState<string>("Asia");

  // Premium converter view state
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  
  // Info overlays
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  // Loading skeleton simulator
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
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const handleLike = (id: string) => {
    if (likedArticles.includes(id)) {
      setLikedArticles(prev => prev.filter(x => x !== id));
      showToast("Removed like");
    } else {
      setLikedArticles(prev => [...prev, id]);
      showToast("Liked discussion! ❤️");
    }
  };

  const handleBookmark = (id: string) => {
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles(prev => prev.filter(x => x !== id));
      showToast("Removed from Saved Discussions");
    } else {
      setBookmarkedArticles(prev => [...prev, id]);
      showToast("Saved to Bookmarked Discussions ✓");
    }
  };

  const handleFollowTopic = (topicName: string) => {
    if (followedTopics.includes(topicName)) {
      setFollowedTopics(prev => prev.filter(x => x !== topicName));
      showToast(`Unfollowed topic cluster: ${topicName}`);
    } else {
      setFollowedTopics(prev => [...prev, topicName]);
      showToast(`Following topic: ${topicName} (Notified of major updates)`);
    }
  };

  const handleAddComment = (id: string) => {
    const text = newCommentText[id] || "";
    if (!text.trim()) return;

    setCommentsMap(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { author: "You (Executive)", role: "Corporate Lead", text }]
    }));
    setNewCommentText(prev => ({ ...prev, [id]: "" }));
    showToast("Opinion posted to discussion stream ✓");
  };

  const handleCastVote = (option: "acc" | "slow" | "no") => {
    if (hasVoted) return;
    setPollVotes(prev => {
      if (option === "acc") return { ...prev, accelerate: prev.accelerate + 1 };
      if (option === "slow") return { ...prev, slow: prev.slow + 1 };
      return { ...prev, noImpact: prev.noImpact + 1 };
    });
    setHasVoted(true);
    showToast("Poll vote recorded successfully ✓");
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryText.trim()) return;

    showToast(`Lead registered in CRM and sent to ${enquiryCompany} ✓ (ID: iGEN-CM-${Math.floor(1000 + Math.random() * 9000)})`);
    setEnquiryCompany(null);
    setEnquiryText("");
  };

  // Filter logic
  const filteredStories = MOCK_COMMENTED_ARTICLES.filter(art => {
    // Search query filter
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Sector filter
    const matchesSector = selectedSectorFilter === "all" || art.sectorName.toLowerCase().includes(selectedSectorFilter.toLowerCase());

    // Geography / Region filter
    const matchesGeography = selectedGeographyFilter === "all" || art.region === selectedGeographyFilter;

    // Time filter
    const matchesTime = activeTimeRange === "now" || art.timestamp === activeTimeRange;

    return matchesSearch && matchesSector && matchesGeography && matchesTime;
  });

  // Dynamic ranking recalculation based on actual comments count
  const sortedStories = [...filteredStories].sort((a, b) => b.comments - a.comments);

  // Poll totals
  const totalPollVotes = pollVotes.accelerate + pollVotes.slow + pollVotes.noImpact;
  const accPct = Math.round((pollVotes.accelerate / totalPollVotes) * 100);
  const slowPct = Math.round((pollVotes.slow / totalPollVotes) * 100);
  const noPct = Math.round((pollVotes.noImpact / totalPollVotes) * 100);

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
        <span>Most Commented</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-blue-500 font-bold">All Sectors</span>
      </nav>

      {/* ─── Premium Editorial Hero ─── */}
      <header className="mx-auto max-w-7xl px-4 pt-6 pb-4 lg:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Globe className="h-3 w-3" /> Global Discussion Intelligence Center
              </span>
              <button 
                onClick={() => setShowHowItWorks(!showHowItWorks)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 text-[10px] font-semibold"
              >
                <HelpCircle className="h-3.5 w-3.5" /> How Rankings Work
              </button>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Most Discussed News — All Sectors
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
              Discover the trade and business stories generating the strongest conversations across industries worldwide.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <Link 
              href="/en/news-poc/trending/most-commented/my"
              className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-gray-850 hover:bg-gray-100 text-gray-700 dark:text-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-3xs"
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
              Join the Discussion
            </button>
          </div>
        </div>

        {/* How Rankings Work info overlay */}
        {showHowItWorks && (
          <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900 p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Discussion Ranking Methodology
              </h3>
              <button onClick={() => setShowHowItWorks(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              Our organic algorithm ranks discussions using actual verified platform activities: <strong>total comment counts, unique participants, response velocity, and quote replies</strong>. All counts represent verified platform profiles. Sponsored placement content cannot organically influence positions.
            </p>
          </div>
        )}

        {/* Search & Multi-Filters Bar */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search discussions..."
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

            {/* Geography filter selector */}
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

      {/* ─── Global Discussion Snapshot ─── */}
      <section className="mx-auto max-w-7xl px-4 pt-2 lg:px-6">
        <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Global Discussion Snapshot</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {[
            { title: "#1 MOST COMMENTED", label: "Global AI Sovereignty Regulations audits", metric: "18.4K Comments", sec: "AI & Cyber Security", color: "border-blue-500/20" },
            { title: "FASTEST GROWING", label: "Cross-Border Solar Grid Ownership Rules disputes", metric: "+240 comments/hr", sec: "Energy & Sustainability", color: "border-emerald-500/20" },
            { title: "MOST DISCUSSED SECTOR", label: "Technology & AI Fabs", metric: "148K Comments", sec: "High Activity", color: "border-purple-500/20" },
            { title: "MOST DISCUSSED COUNTRY", label: "India Corridors", metric: "82K Comments", sec: "Global Leaders", color: "border-orange-500/20" },
            { title: "MOST ACTIVE DISCUSSION", label: "Bilateral Packaging Fabs subsidies", metric: "14.8K Comments", sec: "Semiconductors & OSAT", color: "border-pink-500/20" },
            { title: "MOST DEBATED TOPIC", label: "AI Sovereign CPU localized storage", metric: "24K Comments", sec: "Highly Debated", color: "border-[# FEC970]/20" }
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

      {/* Loading Skeleton States */}
      {isLoading ? (
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-6">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-3xl p-8 min-h-[300px] animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          </div>
        </section>
      ) : (
        <>
          {/* ─── #1 Most Discussed Spotlight Hero Card ─── */}
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
                    <MessageSquare className="h-3.5 w-3.5 text-blue-400 animate-pulse" /> {((sortedStories[0].comments) / 1000).toFixed(1)}K Comments
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3 text-red-500" /> {(sortedStories[0].likes / 1000).toFixed(1)}K
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Share2 className="h-3 w-3" /> {(sortedStories[0].shares / 1000).toFixed(1)}K
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {(sortedStories[0].views / 1000).toFixed(0)}K
                  </span>
                </div>

                <div className="relative z-10 space-y-4 max-w-3xl font-sans">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-[#E63946] text-white text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider block w-max">
                      Rank #1 • MOST DISCUSSED
                    </span>
                    <span className="bg-emerald-500 text-slate-950 text-[9px] font-bold px-2 py-0.5 rounded tracking-wide font-mono flex items-center gap-0.5">
                      <Flame className="h-3 w-3 animate-bounce" /> Velocity: {sortedStories[0].commentVelocity}
                    </span>
                    {sortedStories[0].isControversial && (
                      <span className="bg-amber-500 text-gray-950 text-[9px] font-extrabold px-2 py-0.5 rounded tracking-wider uppercase font-mono flex items-center gap-0.5">
                        <ShieldAlert className="h-3 w-3" /> HIGHLY DEBATED ({sortedStories[0].proSentimentRatio}% Positive)
                      </span>
                    )}
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
                      Join Discussion →
                    </Link>
                    <Link 
                      href={`/en/news-poc/article/${sortedStories[0].id}`}
                      className="bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold px-5 py-2.5 rounded-xl transition-all uppercase tracking-wider text-center"
                    >
                      Read Full Story
                    </Link>
                    <button 
                      onClick={() => handleBookmark(sortedStories[0].id)}
                      className={`h-9 w-9 flex items-center justify-center rounded-xl border transition-colors ${
                        bookmarkedArticles.includes(sortedStories[0].id)
                          ? "bg-amber-500 border-amber-500 text-gray-950"
                          : "border-white/30 text-white hover:bg-white/10"
                      }`}
                    >
                      <Bookmark className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ─── Main Two-Column Layout ─── */}
          <section id="leaderboard-anchor" className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* ── LEFT COLUMN: Leaderboard list & secondary blocks ── */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Header with Sector filter */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3 flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Most Discussed Stories Worldwide
                    </h2>
                    <span className="text-[10px] text-gray-400 block font-normal">Ranked by verified user replies and active threads.</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white dark:bg-[#0f172a] px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
                    <Filter className="h-3.5 w-3.5 text-gray-400" />
                    <select
                      value={selectedSectorFilter}
                      onChange={(e) => setSelectedSectorFilter(e.target.value)}
                      className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer"
                    >
                      <option value="all">All Sectors</option>
                      <option value="AI">AI & Cyber Security</option>
                      <option value="Energy">Energy & Sustainability</option>
                      <option value="Semiconductors">Semiconductors & OSAT</option>
                      <option value="Banking">BFSI & Finance</option>
                      <option value="Health">Healthcare & Pharma</option>
                      <option value="Steel">Steel & Metallurgy</option>
                    </select>
                  </div>
                </div>

                {/* Main feed stream */}
                {sortedStories.length > 0 ? (
                  <div className="space-y-4">
                    {sortedStories.map((story, index) => {
                      const commentsCount = (commentsMap[story.id] || []).length + story.comments;
                      
                      return (
                        <div 
                          key={story.id} 
                          className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm flex gap-4 hover:border-blue-500/35 transition-all group"
                        >
                          {/* Rank indicator */}
                          <div className="flex flex-col items-center justify-start pt-1 gap-1 shrink-0">
                            <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                              #{index + 1}
                            </span>
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

                          {/* Image */}
                          <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden bg-gray-150 shrink-0 relative">
                            <img 
                              src={story.image} 
                              alt={story.title} 
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 space-y-1.5">
                            <div className="flex justify-between items-center text-[9px]">
                              <div className="flex items-center gap-2">
                                {story.isControversial && (
                                  <span className="bg-amber-500 text-slate-950 text-[7px] font-extrabold px-1 py-0.2 rounded uppercase font-mono tracking-wider flex items-center gap-0.5">
                                    Highly Debated
                                  </span>
                                )}
                                <span className="text-gray-400">{story.country} • {story.date}</span>
                              </div>
                              <span className="text-[9px] font-extrabold text-blue-500">{story.sectorName}</span>
                            </div>

                            <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">
                              {story.title}
                            </h4>
                            <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed font-normal line-clamp-2">
                              {story.excerpt}
                            </p>

                            <div className="flex justify-between items-center pt-2 text-[10px] flex-wrap gap-2">
                              {/* Statistics metrics - Comments emphasized */}
                              <div className="flex items-center gap-3.5 font-bold text-gray-500">
                                <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/50">
                                  <MessageSquare className="h-3.5 w-3.5" /> {commentsCount.toLocaleString()} Comments
                                </span>
                                <span className="flex items-center gap-1 text-red-500"><ThumbsUp className="h-3.5 w-3.5" /> {story.likes.toLocaleString()}</span>
                                <span className="flex items-center gap-1"><Share2 className="h-3.5 w-3.5" /> {story.shares.toLocaleString()}</span>
                                <span className="flex items-center gap-1 font-mono text-[9px]">Velocity: {story.commentVelocity}</span>
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
                                      ? "bg-amber-500 border-amber-500 text-gray-955"
                                      : "text-gray-500 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                                  }`}
                                >
                                  {bookmarkedArticles.includes(story.id) ? "Saved ✓" : "Save"}
                                </button>
                                <Link 
                                  href={`/en/news-poc/article/${story.id}`}
                                  className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900/60 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                                >
                                  Join Discussion →
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
                    <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto animate-pulse" />
                    <p className="text-xs font-bold text-gray-500">No highly discussed stories are available under this selection right now.</p>
                    <button 
                      onClick={() => {
                        setSelectedSectorFilter("all");
                        setSelectedGeographyFilter("all");
                        setSearchQuery("");
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-4 py-2 rounded-xl transition-all"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}

                {/* ── Fastest Growing Discussions ── */}
                <div className="space-y-4 pt-6">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Flame className="h-4 w-4 text-orange-500 animate-pulse" /> Fastest Growing Discussions
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sortedStories.slice(1, 3).map((story, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-sm flex flex-col justify-between min-h-[120px]">
                        <div className="space-y-1">
                          <span className="bg-orange-50 text-orange-600 dark:bg-orange-950/20 text-[8px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                            DISCUSSION RISING
                          </span>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight line-clamp-2 mt-1">{story.title}</h4>
                          <p className="text-[9px] text-gray-400 font-normal leading-normal">{story.whyTrending}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800 mt-2 text-[10px]">
                          <span className="text-gray-400 font-semibold">{story.sectorName}</span>
                          <span className="text-xs font-extrabold text-orange-500">{story.commentVelocity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Sector Discussion Leaderboard ── */}
                <div className="space-y-4 pt-6">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Most Discussed Sectors
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
                    {[
                      { rank: "🥇", name: "Technology & AI", comments: "124K Comments", slug: "S02" },
                      { rank: "🥈", name: "Energy & Utilities", comments: "98K Comments", slug: "S17" },
                      { rank: "🥉", name: "Healthcare & Pharma", comments: "82K Comments", slug: "S23" },
                      { rank: "4.", name: "BFSI & Custody", comments: "74K Comments", slug: "S41" }
                    ].map((sec, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs">
                        <div className="flex justify-between items-center text-[10px]">
                          <span>{sec.rank}</span>
                          <span className="bg-blue-50 dark:bg-blue-950/20 text-blue-500 px-1 py-0.2 rounded font-mono uppercase">{sec.slug}</span>
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white block mt-2 text-[11px] leading-tight">{sec.name}</span>
                        <span className="text-[10px] text-gray-400 font-normal mt-1 block">{sec.comments}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Top Discussion From Each Sector ── */}
                <div className="space-y-4 pt-6">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Top Discussion From Each Sector
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs">
                    {[
                      { sector: "AI & CYBER SECURITY", title: "Global AI Sovereignty Regulations Trigger Intense Compliance Audits", comments: "18.4K Comments", slug: "S02" },
                      { sector: "ENERGY & SUSTAINABILITY", title: "Cross-Border Solar Grid Interconnection Rules Sparks Sovereign Grid Disputes", comments: "16.2K Comments", slug: "S17" },
                      { sector: "SEMICONDUCTORS & OSAT", title: "Bilateral Packaging Fabs Subsidies Allocation Criticized by Domestic Builders", comments: "14.8K Comments", slug: "S46" }
                    ].map((row, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs flex justify-between items-center gap-4">
                        <div>
                          <span className="text-[8px] font-extrabold text-blue-500 block uppercase tracking-wider">{row.sector}</span>
                          <h4 className="font-bold text-gray-900 dark:text-white mt-1 leading-tight">{row.title}</h4>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end gap-1.5">
                          <span className="font-extrabold text-[#E63946] block whitespace-nowrap">{row.comments}</span>
                          <Link 
                            href={`/en/news-poc/sector/${row.slug}`}
                            className="text-[9px] font-bold text-blue-500 hover:underline uppercase block whitespace-nowrap"
                          >
                            Explore →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Country / Region Discussion Intelligence ── */}
                <div className="space-y-4 pt-6">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Where Is the Conversation Happening?
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {MOCK_COUNTRIES_DISCUSSING.map((item, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs flex flex-col justify-between min-h-[120px]">
                        <div>
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-base">{item.flag}</span>
                            <span className="font-bold text-blue-500 uppercase tracking-wide">{item.name}</span>
                          </div>
                          <h4 className="text-xs font-extrabold text-gray-900 dark:text-white mt-2 leading-none">{item.commentsCount}</h4>
                          <span className="text-[8px] text-gray-400 block mt-1 leading-normal font-normal line-clamp-2">
                            Top Story: {item.topStory}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-gray-50 dark:border-gray-800 mt-2 text-[9px] font-semibold text-gray-500">
                          Top Sector: {item.topSector.split(" & ")[0]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN: Sidebar Widgets ── */}
              <div className="space-y-6">
                
                {/* ── AI Discussion Intelligence Widget (Conversion) ── */}
                <div className="bg-slate-900 text-white border border-slate-900 p-5 rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 pointer-events-none" />
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">AI Discussion Intelligence</span>
                      <span className="bg-amber-500 text-gray-900 text-[8px] font-bold px-2 py-0.5 rounded-full ml-auto font-extrabold font-sans">PRO ACCESS</span>
                    </div>

                    <h4 className="text-xs font-bold leading-snug">
                      Why are sourcing groups debating bilateral package subsidies?
                    </h4>
                    
                    {!isPremiumUnlocked ? (
                      <div className="space-y-3">
                        <p className="text-[10px] text-slate-400 leading-relaxed font-normal line-clamp-2">
                          Builders argue legacy groups lock out wafer packaging subsidies, while state commissions claim legacy support secures localized supply chains...
                        </p>
                        <div className="bg-slate-900/80 p-3 rounded-lg border border-white/10 flex items-center justify-between text-[9px] relative overflow-hidden">
                          <Lock className="h-3.5 w-3.5 text-white/40 shrink-0" />
                          <span className="text-slate-300 ml-1.5">Main arguments and emerging concerns locked</span>
                          <button 
                            onClick={() => setIsPremiumUnlocked(true)}
                            className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-extrabold px-2.5 py-1 rounded font-sans uppercase shrink-0"
                          >
                            Unlock
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3 bg-slate-900/60 p-3 rounded-lg border border-white/5 text-[10px] text-slate-300 font-normal leading-relaxed">
                        <p><strong>Main Argument:</strong> Funding models exclude startups from high-density packaging PLIs.</p>
                        <p><strong>Opposing Argument:</strong> Large builders claim legacies provide better supply chain buffers.</p>
                        <button 
                          onClick={() => setIsPremiumUnlocked(false)}
                          className="text-[8px] text-slate-400 hover:underline uppercase font-bold"
                        >
                          Lock Summary
                        </button>
                      </div>
                    )}
                  </div>
                </div>



                {/* ── Global Discussion Heatmap Selector ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Global Discussion Heatmap
                  </span>
                  
                  <div className="space-y-3">
                    <p className="text-[10px] text-gray-500 leading-normal font-normal">
                      Select region to explore regional discussion metrics and volume:
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      {MOCK_HEATMAP_REGIONS.map(reg => (
                        <button
                          key={reg.region}
                          onClick={() => setSelectedHeatmapRegion(reg.region)}
                          className={`px-2 py-1.5 rounded-lg border text-[9px] font-bold transition-all truncate text-center ${
                            selectedHeatmapRegion === reg.region 
                              ? "bg-blue-600 border-blue-600 text-white shadow-3xs"
                              : "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-850 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {reg.region}
                        </button>
                      ))}
                    </div>

                    {selectedHeatmapRegion && (
                      <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-150 dark:border-gray-800 p-3 rounded-xl space-y-2 text-[10px] font-semibold">
                        <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-1.5">
                          <span className="text-[9px] text-gray-400 block uppercase">Region</span>
                          <span className="text-blue-500 font-bold">{selectedHeatmapRegion}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 block font-normal">Discussion Volume</span>
                          <span>{MOCK_HEATMAP_REGIONS.find(r => r.region === selectedHeatmapRegion)?.volume}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 block font-normal">Top Discussed Sector</span>
                          <span>{MOCK_HEATMAP_REGIONS.find(r => r.region === selectedHeatmapRegion)?.topSector}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 block font-normal">Active Debates</span>
                          <span>{MOCK_HEATMAP_REGIONS.find(r => r.region === selectedHeatmapRegion)?.activeDebates} active debates</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Top Debate Topics ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Topics Creating Big Debates
                  </span>
                  <div className="space-y-3.5">
                    {TOPIC_CLUSTERS.map((topic, idx) => (
                      <div key={idx} className="flex justify-between items-start text-xs font-semibold">
                        <div className="space-y-0.5">
                          <span className="font-bold text-blue-600 dark:text-blue-400 block hover:underline cursor-pointer">
                            #{topic.name.replace(/\s+/g, "")}
                          </span>
                          <span className="text-[9px] text-gray-400 block font-normal">{topic.sector} • {topic.discussionsCount} active discussions</span>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end gap-1">
                          <span className="text-[10px] font-bold block">{topic.commentsCount}</span>
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

                {/* ── Most Controversial Discussions ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Most Controversial Discussions
                  </span>
                  
                  <div className="space-y-3.5 text-xs font-semibold">
                    {sortedStories.filter(s => s.isControversial).slice(0, 2).map((story, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px]">
                          <span className="font-bold text-gray-900 dark:text-white line-clamp-1">{story.title}</span>
                          <span className="bg-red-500 text-white text-[7px] font-extrabold px-1 rounded font-mono uppercase shrink-0">HIGHLY DEBATED</span>
                        </div>
                        <div className="flex gap-2 text-[10px] text-gray-500">
                          <span>{story.proSentimentRatio}% Positive</span>
                          <span>•</span>
                          <span>{100 - story.proSentimentRatio}% Negative</span>
                          <span className="ml-auto font-mono text-red-500">{story.comments.toLocaleString()} comments</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Community Poll ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    What Does the Industry Think?
                  </span>
                  
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                      Will sovereign GPU cluster localized mandates slow enterprise cloud adoption?
                    </h4>

                    {!hasVoted ? (
                      <div className="space-y-2 text-xs font-bold">
                        <button 
                          onClick={() => handleCastVote("acc")}
                          className="w-full text-left p-2.5 rounded-xl border border-gray-250 dark:border-gray-850 hover:border-blue-500 hover:bg-blue-50/5 dark:hover:bg-blue-950/10 transition-all flex items-center justify-between"
                        >
                          <span>Accelerate cloud bypass</span>
                          <span className="text-blue-500">Vote & Discuss →</span>
                        </button>
                        <button 
                          onClick={() => handleCastVote("slow")}
                          className="w-full text-left p-2.5 rounded-xl border border-gray-250 dark:border-gray-850 hover:border-blue-500 hover:bg-blue-50/5 dark:hover:bg-blue-950/10 transition-all flex items-center justify-between"
                        >
                          <span>Slow cloud integration</span>
                          <span className="text-blue-500">Vote & Discuss →</span>
                        </button>
                        <button 
                          onClick={() => handleCastVote("no")}
                          className="w-full text-left p-2.5 rounded-xl border border-gray-250 dark:border-gray-850 hover:border-blue-500 hover:bg-blue-50/5 dark:hover:bg-blue-950/10 transition-all flex items-center justify-between"
                        >
                          <span>No major impact</span>
                          <span className="text-blue-500">Vote & Discuss →</span>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3 text-xs font-bold">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span>Accelerate cloud bypass</span>
                            <span>{accPct}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600" style={{ width: `${accPct}%` }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span>Slow cloud integration</span>
                            <span>{slowPct}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500" style={{ width: `${slowPct}%` }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span>No major impact</span>
                            <span>{noPct}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gray-400" style={{ width: `${noPct}%` }} />
                          </div>
                        </div>
                        <span className="text-[9px] text-gray-400 font-semibold block pt-1">Total: {totalPollVotes} votes</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Trending Questions ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Questions the Industry Is Asking
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    {[
                      { question: "Will domestic solar grid tariffs allow developers to secure scope clearances?", comments: "142 comments" },
                      { question: "Are high-density OSAT packages subject to localized chip sovereignty mandates?", comments: "98 comments" }
                    ].map((q, idx) => (
                      <div key={idx} className="space-y-1">
                        <span className="text-gray-900 dark:text-white block leading-snug">{q.question}</span>
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="text-gray-400 font-mono font-normal">{q.comments}</span>
                          <button onClick={() => showToast("Opening discussion room...")} className="text-blue-500 hover:underline uppercase font-bold">Join →</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Expert Perspectives ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Expert Perspectives
                  </span>
                  <div className="space-y-3">
                    {MOCK_EXPERT_COMMENTS.map((comm, idx) => (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between items-center text-[9px] font-bold">
                          <span className="font-bold text-gray-950 dark:text-white flex items-center gap-0.5">
                            {comm.name} {comm.isVerified && <span className="text-blue-500 text-[9px]">✓</span>}
                          </span>
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
                      View Expert Perspectives →
                    </Link>
                  </div>
                </div>

                {/* ── What People Are Saying ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    What People Are Saying
                  </span>
                  
                  <div className="space-y-3.5 text-[10px] font-semibold">
                    <div className="space-y-1">
                      <span className="text-blue-500 block uppercase tracking-wider font-extrabold text-[8px]">MOST COMMON VIEWPOINT</span>
                      <p className="text-gray-500 dark:text-gray-400 font-normal leading-tight">"Subsidy guidelines must favor localized chip fabs to insulate supply corridors against bilateral shipping chokeholds."</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-orange-500 block uppercase tracking-wider font-extrabold text-[8px]">OPPOSING VIEWPOINT</span>
                      <p className="text-gray-500 dark:text-gray-400 font-normal leading-tight">"Subsidizing global conglomerates risks locking out local packaging packaging startups from priority research grants."</p>
                    </div>
                  </div>
                </div>

                {/* ── Discussion Previews & Threads ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Join the Conversation
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
                                <span className="font-bold text-gray-950 dark:text-white block">
                                  {c.author} {c.role && <span className="text-[8px] text-blue-500 font-semibold font-mono uppercase bg-blue-50 dark:bg-blue-950/20 px-1 py-0.2 rounded ml-1">{c.role}</span>}
                                </span>
                                <p className="text-gray-550 dark:text-gray-400 font-normal leading-tight">{c.text}</p>
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
                              className="flex-1 px-2 py-1 rounded bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-gray-800 text-[10px] outline-none"
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

                {/* ── Community Contributor Leaderboard ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Top Community Contributors
                  </span>
                  
                  <div className="space-y-3">
                    {MOCK_CONTRIBUTORS.map((cont, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                          <div className="h-7 w-7 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-bold flex items-center justify-center rounded-full text-[10px] shrink-0 font-mono">
                            {cont.avatar}
                          </div>
                          <div>
                            <span className="font-bold text-gray-905 dark:text-white block">{cont.name}</span>
                            <span className="text-[8px] text-gray-400 block font-normal">{cont.badge}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-extrabold text-blue-500 block">{cont.commentsCount} replies</span>
                          <span className="text-[8px] text-gray-400 font-mono">{cont.points} pts</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Companies driving conversations ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Companies Driving Conversations
                  </span>
                  
                  <div className="space-y-3.5">
                    {MOCK_COMPANIES.map((company, idx) => (
                      <div key={idx} className="space-y-1.5 text-xs font-semibold">
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
                          <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold ml-auto shrink-0">{company.discussionsCount} active discussions</span>
                        </div>
                        <button 
                          onClick={() => setEnquiryCompany(company.name)}
                          className="w-full text-center border border-gray-205 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 text-[9px] font-bold py-1 rounded transition-colors uppercase font-sans"
                        >
                          View Company →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Products & Services being discussed ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Products & Services Getting Attention
                  </span>
                  
                  <div className="space-y-2 text-xs">
                    {MOCK_PRODUCTS.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div>
                          <span className="font-bold text-gray-900 dark:text-white block leading-tight">{item.name}</span>
                          <span className="text-[9px] text-gray-400 block font-normal">By {item.provider}</span>
                        </div>
                        <Link href="/eoi" className="text-[9px] font-bold text-blue-500 hover:underline uppercase shrink-0">Explore Providers →</Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Discussion Alerts Configurator ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold">
                    Never Miss a Major Discussion
                  </h4>
                  
                  {!alertConfigured ? (
                    <div className="space-y-3 text-[10px] font-semibold">
                      <p className="text-gray-500 leading-relaxed font-normal">
                        Configure threshold alerts to receive instant notifications when global stories exceed a specified comment count.
                      </p>
                      
                      <div className="space-y-1.5">
                        <span className="text-[8px] text-gray-400 uppercase font-bold">Comment Threshold</span>
                        <select 
                          value={alertThreshold}
                          onChange={(e) => setAlertThreshold(e.target.value)}
                          className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg text-xs outline-none"
                        >
                          <option value="5,000">Exceeds 5,000 comments</option>
                          <option value="10,000">Exceeds 10,000 comments</option>
                          <option value="20,000">Exceeds 20,000 comments</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => { setAlertConfigured(true); showToast(`Discussion alert threshold established at ${alertThreshold} comments ✓`); }}
                        className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                      >
                        Create Alert
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Discussion Alert Activated Successfully!
                    </div>
                  )}
                </div>

                {/* ── Premium Discussion Intelligence conversion CTA ── */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white border border-blue-955 p-5 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-display text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Go Beyond Comments
                  </h4>
                  <p className="text-[10px] text-slate-350 leading-relaxed font-normal">
                    Turn thousands of comments into structured global business intelligence.
                  </p>
                  
                  <ul className="space-y-2 text-[10px] text-slate-405 font-semibold">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> AI Discussion Summaries & Opinion Clusters
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Expert vs Community Sentiment comparison
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Custom Global Discussion Alerts
                    </li>
                  </ul>

                  <button 
                    onClick={() => showToast("Opening premium checkout flow...")}
                    className="w-full text-center bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-xs py-2 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Unlock Discussion Intelligence
                  </button>
                </div>

                {/* ── Sponsored industry discussion ── */}
                <div className="border border-blue-200/50 dark:border-blue-900/40 bg-blue-50/10 dark:bg-blue-900/5 p-4 rounded-xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/20">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Sponsored Industry Discussion</span>
                    <span className="bg-amber-500 text-gray-950 text-[7px] font-extrabold px-1.5 py-0.5 rounded font-mono">SPONSORED</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-blue-500 uppercase">Circular Energy Standards debate</span>
                    <h5 className="text-xs font-bold text-gray-905 dark:text-white leading-tight">Will battery swapping override stationary grids?</h5>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal font-normal">
                      Explore views on grid infrastructure bypass from sustainable energy experts.
                    </p>
                  </div>
                  <button 
                    onClick={() => showToast("Opening sponsored panel...")}
                    className="w-full text-center border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                  >
                    Join Sponsored Debate
                  </button>
                </div>

                {/* ── Sponsored webinar reports ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Industry Reports</span>
                    <span className="text-amber-500 text-[7px] font-extrabold font-mono uppercase">Featured Sponsor</span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <div className="h-8 w-8 bg-blue-600 text-white flex items-center justify-center font-bold text-xs rounded shrink-0">ND</div>
                    <div>
                      <span className="font-bold text-xs text-gray-900 dark:text-white block leading-tight">Nexus Dynamics</span>
                      <span className="text-[8px] text-gray-400 block font-normal">Sustainable Energy Whitepapers</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => showToast("Downloading sustainable energy whitepaper...")}
                    className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold py-1.5 rounded uppercase"
                  >
                    View Report
                  </button>
                </div>

                {/* ── Advertisement banner slot ── */}
                <div className="bg-gray-100 dark:bg-gray-955/60 border border-gray-200 dark:border-gray-850 border-dashed p-4 rounded-2xl text-center space-y-1">
                  <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-widest">Advertisement</span>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">iGEN Ad Network · 300 × 250 Banner Slot</p>
                  <Link href="/eoi" className="text-[9px] font-bold text-blue-500 hover:underline block uppercase mt-1">Request Placement</Link>
                </div>

                {/* ── Newsletter: global discussion brief ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Global Discussion Brief
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    Get the most discussed trade stories, industry debates, and expert perspectives delivered to your inbox.
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
                      ✓ Subscribed to Global Discussion Brief!
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
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold font-bold">
                  Lead Enquiry Hub
                </h3>
                <span className="text-[10px] text-gray-400 block font-normal">Secure B2B channel to {enquiryCompany}</span>
              </div>
              <button 
                onClick={() => setEnquiryCompany(null)}
                className="p-1.5 rounded-lg hover:bg-gray-150 dark:hover:bg-gray-900"
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
                          : "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-800 text-gray-505 hover:bg-gray-100"
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
                  className="w-full p-3 rounded-xl border border-gray-250 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500 text-gray-950 dark:text-white"
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
      {toastMsg && (
        <div className="fixed bottom-4 right-4 z-50 bg-gray-900/95 dark:bg-slate-900/95 text-white border border-slate-800 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 max-w-sm backdrop-blur-xs">
          <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
          <span className="text-[11px] font-bold">{toastMsg}</span>
        </div>
      )}

    </div>
  );
}

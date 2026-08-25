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
  commentVelocity: string; // e.g. "+85 comments/hr"
  isControversial: boolean;
  proSentimentRatio: number; // e.g. 58 (meaning 58% positive)
}

interface TopicCluster {
  name: string;
  discussionsCount: number;
  commentsCount: string;
  sector: string;
  latestDiscussion: string;
}

interface ExpertComment {
  name: string;
  role: string;
  text: string;
  isVerified: boolean;
}

interface CompanyLeaderboard {
  name: string;
  logo: string;
  sector: string;
  discussionsCount: number;
  latestStory: string;
  verified: boolean;
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
    id: "tc-my-1",
    title: "AI Chip Sourcing Regulations Trigger Intense Bilateral Compliance Debates",
    excerpt: "New compliance mandates on high-density OSAT packages draw sharp reactions from industrial procurement counsels. Corporate legal leads clash over certification timelines.",
    sectorCode: "S16",
    sectorName: "Electronics & IT & Components",
    country: "India-USA Corridors",
    date: "1 hr ago",
    comments: 8420,
    likes: 4200,
    shares: 3800,
    views: 145000,
    isTrending: true,
    sponsored: false,
    author: "Dr. Aris Thorne",
    role: "Semiconductor Sourcing Expert",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    topic: "AI Regulation",
    whyTrending: "This discussion has spiked as corporate sourcing groups analyze strict compliance penalties in local assembly hubs.",
    sentiment: 48,
    timestamp: "now",
    rankMovement: "up",
    rankMovementValue: 2,
    commentVelocity: "+120 comments/hr",
    isControversial: true,
    proSentimentRatio: 48
  },
  {
    id: "tc-my-2",
    title: "Offshore Solar Private Grid Ownership Rules Draw Sharp Ministerial Opposition",
    excerpt: "Disputes erupt over private utility line grid feed licensing. Exporters claim grid tax exclusions represent up to 14% margin deviations, while grid admins defend infrastructure tariffs.",
    sectorCode: "S17",
    sectorName: "Energy & Sustainability",
    country: "Germany-Norway",
    date: "3 hrs ago",
    comments: 7910,
    likes: 3100,
    shares: 2400,
    views: 110000,
    isTrending: true,
    sponsored: false,
    author: "Elena Rostova",
    role: "Energy Infrastructure Counsel",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Energy Transition Policy",
    whyTrending: "Active debates on private distribution versus public grid monopolies.",
    sentiment: 58,
    timestamp: "now",
    rankMovement: "new",
    commentVelocity: "+95 comments/hr",
    isControversial: false,
    proSentimentRatio: 58
  },
  {
    id: "tc-my-3",
    title: "Commercial Freight EV Battery Swap Plaza Specifications Under Scrutiny",
    excerpt: "Corporate logistics fleets debate proposed standard battery geometries. Smaller freight operators push for multiple standard dimensions to prevent factory lock-ins.",
    sectorCode: "S45",
    sectorName: "Automotive & Electric Vehicles",
    country: "Bilateral Trade Ports",
    date: "5 hrs ago",
    comments: 6820,
    likes: 2900,
    shares: 1900,
    views: 95000,
    isTrending: true,
    sponsored: false,
    author: "Julian Vance",
    role: "Fleet Operations Advisor",
    image: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "EV Expansion Standards",
    whyTrending: "Debate is rising regarding single supplier lock-in risks for swappable heavy truck plazas.",
    sentiment: 71,
    timestamp: "today",
    rankMovement: "up",
    rankMovementValue: 4,
    commentVelocity: "+85 comments/hr",
    isControversial: true,
    proSentimentRatio: 52
  },
  {
    id: "tc-my-4",
    title: "GIFT City Custodian Bank Guidelines Split Regional Capital Exporters",
    excerpt: "Offshore finance rules revision splits B2B lenders. Critics argue capital reserve requirements favor multinational banks over local trade finance cooperatives.",
    sectorCode: "S41",
    sectorName: "Banking & Financial Services (BFSI)",
    country: "India-UAE Bilateral",
    date: "10 hrs ago",
    comments: 5240,
    likes: 2100,
    shares: 1200,
    views: 74000,
    isTrending: true,
    sponsored: false,
    author: "Rajesh Kumar",
    role: "Trade Finance Editor",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&auto=format&fit=crop&q=80",
    topic: "Bilateral Capital Flows",
    whyTrending: "Split community reactions following offshore compliance adjustments.",
    sentiment: 66,
    timestamp: "today",
    rankMovement: "down",
    rankMovementValue: 1,
    commentVelocity: "+45 comments/hr",
    isControversial: false,
    proSentimentRatio: 64
  },
  {
    id: "tc-my-5",
    title: "Pharma API Import Substitution Penalties Split Manufacturing Alliances",
    excerpt: "New tariffs on foreign generic drug core materials raise industry concern. Smaller formulators claim compliance penalties will drop production timelines by 22 days.",
    sectorCode: "S23",
    sectorName: "Health & Family Welfare & Pharma",
    country: "Domestic Trade Hubs",
    date: "12 hrs ago",
    comments: 4890,
    likes: 1800,
    shares: 950,
    views: 63000,
    isTrending: false,
    sponsored: false,
    author: "Priya Sundaram",
    role: "Pharma Policy Analyst",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Pharma Supply Chain",
    whyTrending: "Intense discussion among pharma manufacturers concerning raw material tariffs.",
    sentiment: 42,
    timestamp: "week",
    rankMovement: "stable",
    commentVelocity: "+35 comments/hr",
    isControversial: true,
    proSentimentRatio: 42
  }
];

// Topic debate clusters
const TOPIC_CLUSTERS: TopicCluster[] = [
  { name: "AI Regulation", discussionsCount: 18, commentsCount: "8.4K Comments", sector: "Electronics & IT", latestDiscussion: "AI Chip Sourcing Regulations Trigger Intense Bilateral Compliance Debates" },
  { name: "Energy Transition Policy", discussionsCount: 14, commentsCount: "7.9K Comments", sector: "Energy & Clean Tech", latestDiscussion: "Offshore Solar Private Grid Ownership Rules Draw Opposition" },
  { name: "EV Expansion Standards", discussionsCount: 12, commentsCount: "6.8K Comments", sector: "Automotive & EVs", latestDiscussion: "Commercial Freight EV Battery Swap Plaza Specifications Under Scrutiny" },
  { name: "Pharma Supply Chain", discussionsCount: 10, commentsCount: "4.8K Comments", sector: "Health & Pharma", latestDiscussion: "Pharma API Import Substitution Penalties Split Manufacturing Alliances" }
];

// Expert Opinions
const MOCK_EXPERT_COMMENTS: ExpertComment[] = [
  { 
    name: "Dr. Ramesh Nair", 
    role: "Agri Policy Expert", 
    text: "AI drone integration is lowering water waste profiles, but regional wheat cooperatives need unified billing standards before adopting automated spray protocols.",
    isVerified: true
  },
  { 
    name: "Sonia Marchetti", 
    role: "Sourcing Counsel", 
    text: "Exporters are underestimating the scope-3 carbon border tariff timelines. Disagreement will settle only when actual customs audits begin in Q1.",
    isVerified: true
  }
];

// Companies driving conversations
const MOCK_COMPANIES: CompanyLeaderboard[] = [
  { name: "Nexus Dynamics", logo: "ND", sector: "Energy & Sustainability", discussionsCount: 8, latestStory: "Offshore Solar Private Grid Ownership Rules Draw Ministerial Opposition", verified: true },
  { name: "NVIDIA", logo: "NV", sector: "Electronics & IT & Components", discussionsCount: 6, latestStory: "AI Chip Sourcing Regulations Trigger Intense Bilateral Compliance Debates", verified: true }
];

// Top community contributors
const MOCK_CONTRIBUTORS: CommunityContributor[] = [
  { name: "Devika Sharma", commentsCount: 142, badge: "Industry Expert", points: 840, avatar: "DS" },
  { name: "Vivek Murthy", commentsCount: 98, badge: "Verified Professional", points: 520, avatar: "VM" },
  { name: "Julian Vance", commentsCount: 76, badge: "Community Contributor", points: 340, avatar: "JV" }
];

interface Props {
  onBack?: () => void;
}

export default function NewsPOCTrendingMostCommentedMySectors({ onBack }: Props) {
  // Sector preferences management
  const [mySectorCodes, setMySectorCodes] = useState<string[]>(["S16", "S17", "S23", "S41", "S45"]);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [activeTimeRange, setActiveTimeRange] = useState<"now" | "today" | "week" | "month">("now");
  const [searchQuery, setSearchQuery] = useState("");
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  
  // Interactive stats
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [commentsMap, setCommentsMap] = useState<Record<string, { author: string; text: string; role?: string }[]>>({
    "tc-my-1": [
      { author: "Marcus Aurelius", role: "Sourcing Counsel", text: "Wafer allocation restrictions represent a massive barrier to trade velocity." },
      { author: "Devika Sharma", role: "Industry Expert", text: "Agreed, compliance timelines are extremely unrealistic for regional foundries." }
    ],
    "tc-my-2": [
      { author: "Vivek Murthy", role: "Verified Professional", text: "Private solar corridors are the only way to avoid state grid surcharge tariffs." }
    ]
  });
  const [newCommentText, setNewCommentText] = useState<Record<string, string>>({});
  
  // Interactive poll simulator
  const [pollVotes, setPollVotes] = useState({ accelerate: 298, slow: 114, noImpact: 68 });
  const [hasVoted, setHasVoted] = useState(false);
  
  // CRM Lead generation simulator
  const [enquiryCompany, setEnquiryCompany] = useState<string | null>(null);
  const [enquiryType, setEnquiryType] = useState<string>("info");
  const [enquiryText, setEnquiryText] = useState("");
  
  // Alerts and Newsletter
  const [subscribedNewsletter, setSubscribedNewsletter] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [alertConfigured, setAlertConfigured] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState("1,000");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Loading skeleton state simulator
  const [isLoading, setIsLoading] = useState(false);

  // To navigate sectors comparison easily
  const selectedGeographyFilter = "all";

  // Trigger loading skeleton on filter change for professional B2B experience
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
      showToast("Saved discussion to bookmarks ✓");
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
    showToast("Comment successfully dispatched to discussion board ✓");
  };

  const handleCastVote = (option: "acc" | "slow" | "no") => {
    if (hasVoted) return;
    setPollVotes(prev => {
      if (option === "acc") return { ...prev, accelerate: prev.accelerate + 1 };
      if (option === "slow") return { ...prev, slow: prev.slow + 1 };
      return { ...prev, noImpact: prev.noImpact + 1 };
    });
    setHasVoted(true);
    showToast("Your industry vote has been recorded ✓");
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryText.trim()) return;

    showToast(`Lead registered in CRM and sent to ${enquiryCompany} ✓ (ID: iGEN-CM-${Math.floor(1000 + Math.random() * 9000)})`);
    setEnquiryCompany(null);
    setEnquiryText("");
  };

  // Filtered stories mapping
  const filteredStories = MOCK_COMMENTED_ARTICLES.filter(art => {
    // Sector preference filter
    const matchesPreferred = mySectorCodes.includes(art.sectorCode);
    if (!matchesPreferred) return false;

    // Sector Filter pill check
    const matchesSectorPill = selectedSectorFilter === "all" || art.sectorCode === selectedSectorFilter;
    
    // Search filter
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
                          
    // Time range filter
    const matchesTime = activeTimeRange === "now" || art.timestamp === activeTimeRange;

    return matchesSectorPill && matchesSearch && matchesTime;
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
        <span className="text-blue-500 font-bold">My Sectors</span>
      </nav>

      {/* ─── Hero Section ─── */}
      <header className="mx-auto max-w-7xl px-4 pt-6 pb-4 lg:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <MessageSquare className="h-3 w-3" /> Discussion Intelligence
              </span>
              <button 
                onClick={() => setShowHowItWorks(!showHowItWorks)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 text-[10px] font-semibold"
              >
                <HelpCircle className="h-3.5 w-3.5" /> How Rankings Work
              </button>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Most Discussed News in My Sectors
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
              Discover the trade and business stories generating the strongest conversations across the sectors you follow.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button 
              onClick={() => setIsManageModalOpen(true)}
              className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-gray-850 hover:bg-gray-100 text-gray-700 dark:text-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-3xs"
            >
              <Briefcase className="h-4 w-4 text-blue-500" /> Manage My Sectors
            </button>
            <button 
              onClick={() => {
                const leaderboardSec = document.getElementById("discussions-leaderboard");
                if (leaderboardSec) leaderboardSec.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10"
            >
              Join the Discussion
            </button>
          </div>
        </div>

        {/* How Rankings Work modal overlay */}
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
              iGEN News ranks discussions using active feedback loops: <strong>total comment counts, unique participants, response velocity, and quote replies</strong>. All counts represent verified platform profiles. Sponsored placement content cannot organically influence positions.
            </p>
          </div>
        )}

        {/* Search & Time range filters */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

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
        </div>
      </header>

      {/* Empty Preference Fallback Warning */}
      {mySectorCodes.length === 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <div className="border border-dashed border-gray-300 dark:border-gray-800 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto animate-bounce" />
            <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase">No Sector Preferences Configured</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
              Choose the sectors you care about to personalize your discussion feed and begin discovering bilateral trade intelligence.
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
          <section className="mx-auto max-w-7xl px-4 pt-4 lg:px-6">
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

          {/* ─── What's Everyone Discussing Snapshot ─── */}
          <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
            <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">What's Everyone Discussing?</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { title: "#1 MOST COMMENTED", label: "AI Chip Sourcing Regulations Debates", metric: "8.4K Comments", sec: "Electronics & IT", color: "border-blue-500/20" },
                { title: "FASTEST GROWING DISCUSSION", label: "Offshore Solar Private Grid disputes", metric: "+120 comments/hr", sec: "Energy & Sustainability", color: "border-emerald-500/20" },
                { title: "MOST ACTIVE SECTOR", label: "Automotive & Electric Vehicles", metric: "18 Discussions active", sec: "High Activity", color: "border-purple-500/20" },
                { title: "MOST LIKED DISCUSSION", label: "API Import substitution tariffs review", metric: "1.8K Likes", sec: "Health & Pharma", color: "border-orange-500/20" },
                { title: "MOST SHARED DISCUSSION", label: "GIFT City Custodian Guidelines revisions", metric: "1.2K Shares", sec: "Banking & Finance", color: "border-pink-500/20" }
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

          {/* Skeleton Loader Overlay */}
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
              {/* ─── #1 Most Discussed Hero Card ─── */}
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
                        <span className="bg-emerald-500 text-slate-955 text-[9px] font-bold px-2 py-0.5 rounded tracking-wide font-mono flex items-center gap-0.5">
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
              <section id="discussions-leaderboard" className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* ── LEFT COLUMN: Main Ranked feed & secondary widgets ── */}
                  <div className="lg:col-span-2 space-y-6">
                    
                    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3 flex-wrap gap-2">
                      <div className="space-y-0.5">
                        <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                          Most Discussed Stories
                        </h2>
                        <span className="text-[10px] text-gray-400 block font-normal">Ranked by verified user replies and opinions count.</span>
                      </div>
                    </div>

                    {/* Feed list */}
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
                            setActiveTimeRange("now");
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

                    {/* ── Community Polls: What Does the Industry Think? ── */}
                    <div className="space-y-4 pt-6">
                      <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                        <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                          What Does the Industry Think? (Interactive Poll)
                        </h3>
                      </div>

                      <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 space-y-4">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white leading-snug">
                          Will AI sourcing and fabrication guidelines accelerate or slow down regional B2B foundries integration?
                        </h4>

                        {!hasVoted ? (
                          <div className="space-y-2 text-xs font-bold">
                            <button 
                              onClick={() => handleCastVote("acc")}
                              className="w-full text-left p-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50/5 dark:hover:bg-blue-950/10 transition-all flex items-center justify-between"
                            >
                              <span>Accelerate integration rates</span>
                              <span className="text-blue-500">Vote & Discuss →</span>
                            </button>
                            <button 
                              onClick={() => handleCastVote("slow")}
                              className="w-full text-left p-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50/5 dark:hover:bg-blue-950/10 transition-all flex items-center justify-between"
                            >
                              <span>Slow integration rates due to auditing buffers</span>
                              <span className="text-blue-500">Vote & Discuss →</span>
                            </button>
                            <button 
                              onClick={() => handleCastVote("no")}
                              className="w-full text-left p-3 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50/5 dark:hover:bg-blue-950/10 transition-all flex items-center justify-between"
                            >
                              <span>No major impact on supply corridors</span>
                              <span className="text-blue-500">Vote & Discuss →</span>
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-3.5 text-xs font-bold pt-2">
                            <div className="space-y-1.5">
                              <div className="flex justify-between">
                                <span>Accelerate integration rates</span>
                                <span>{accPct}% ({pollVotes.accelerate} votes)</span>
                              </div>
                              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600" style={{ width: `${accPct}%` }} />
                              </div>
                            </div>
                            
                            <div className="space-y-1.5">
                              <div className="flex justify-between">
                                <span>Slow integration rates</span>
                                <span>{slowPct}% ({pollVotes.slow} votes)</span>
                              </div>
                              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500" style={{ width: `${slowPct}%` }} />
                              </div>
                            </div>

                            <div className="space-y-1.5">
                              <div className="flex justify-between">
                                <span>No major impact</span>
                                <span>{noPct}% ({pollVotes.noImpact} votes)</span>
                              </div>
                              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gray-400" style={{ width: `${noPct}%` }} />
                              </div>
                            </div>

                            <div className="pt-2 flex justify-between items-center text-[10px] text-gray-400">
                              <span>Total: {totalPollVotes} votes</span>
                              <button onClick={() => setHasVoted(false)} className="hover:underline font-bold text-blue-500 uppercase">Reset Vote</button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ── Trending Questions the Industry is Asking ── */}
                    <div className="space-y-4 pt-6">
                      <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                        <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                          Questions the Industry Is Asking
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {[
                          { question: "Will local solar grid tarification standards accelerate metallurgy adoption offsets?", sector: "Energy & sustainability", comments: "182 Comments" },
                          { question: "Are heavy EV battery interchange shapes scalable across multilateral cargo logistics hubs?", sector: "Automotive & Electric Vehicles", comments: "94 Comments" }
                        ].map((q, idx) => (
                          <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs flex items-center justify-between gap-4">
                            <div className="space-y-1">
                              <span className="text-[8px] font-bold text-blue-600 dark:text-blue-400 uppercase">{q.sector}</span>
                              <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{q.question}</h4>
                            </div>
                            <button 
                              onClick={() => showToast("Opening thread forum...")}
                              className="text-[9px] font-bold text-blue-500 border border-blue-100 dark:border-blue-900/60 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 shrink-0 font-sans"
                            >
                              Join ({q.comments}) →
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* ── RIGHT COLUMN: Sidebar Widgets ── */}
                  <div className="space-y-6">
                    
                    {/* ── AI Discussion Summary Card (Free vs Premium conversion) ── */}
                    <div className="bg-slate-900 text-white border border-slate-900 p-5 rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 pointer-events-none" />
                      <div className="relative z-10 space-y-3">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-amber-400" />
                          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">AI Discussion Summary</span>
                          <span className="bg-amber-500 text-gray-900 text-[8px] font-bold px-2 py-0.5 rounded-full ml-auto font-extrabold font-sans">PRO ACCESS</span>
                        </div>

                        <h4 className="text-xs font-bold leading-snug">
                          What are key viewpoints in generic material api tariffs?
                        </h4>
                        
                        {!isPremiumUnlocked ? (
                          <div className="space-y-3">
                            <p className="text-[10px] text-slate-400 leading-relaxed font-normal line-clamp-2">
                              Formulators argue raw tariff penalties slow drug delivery buffers, while local producers defend domestic self-reliance initiatives...
                            </p>
                            <div className="bg-slate-900/80 p-3 rounded-lg border border-white/10 flex items-center justify-between text-[9px] relative overflow-hidden">
                              <Lock className="h-3.5 w-3.5 text-white/40 shrink-0" />
                              <span className="text-slate-300 ml-1.5">Opinion clusters & sentiment metrics locked</span>
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
                            <p><strong>Common Viewpoint:</strong> Tarification timelines are too aggressive to organize substitution stocks.</p>
                            <p><strong>Opposing Viewpoint:</strong> Audits protect local manufacturers against scope dump prices.</p>
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



                    {/* ── Topic debate clusters list ── */}
                    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                        Topics Creating Debate
                      </span>
                      <div className="space-y-3.5">
                        {TOPIC_CLUSTERS.map((topic, idx) => (
                          <div key={idx} className="flex justify-between items-start text-xs">
                            <div className="space-y-0.5">
                              <span className="font-bold text-blue-600 dark:text-blue-400 block hover:underline cursor-pointer">
                                #{topic.name.replace(/\s+/g, "")}
                              </span>
                              <span className="text-[9px] text-gray-400 block font-normal">{topic.sector} • {topic.discussionsCount} active threads</span>
                            </div>
                            <span className="text-[10px] font-bold shrink-0">{topic.commentsCount}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* ── Community Thread previews ── */}
                    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-4">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                        What Are People Saying?
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

                    {/* ── Expert Perspectives ── */}
                    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                        Expert Perspectives
                      </span>
                      <div className="space-y-3">
                        {MOCK_EXPERT_COMMENTS.map((comm, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between items-center text-[9px]">
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
                          View Expert Perspective →
                        </Link>
                      </div>
                    </div>

                    {/* ── Top Community Contributors ── */}
                    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                        Top Community Contributors
                      </span>
                      
                      <div className="space-y-3">
                        {MOCK_CONTRIBUTORS.map((cont, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2">
                              <div className="h-7 w-7 bg-blue-150 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-bold flex items-center justify-center rounded-full text-[10px] shrink-0 font-mono">
                                {cont.avatar}
                              </div>
                              <div>
                                <span className="font-bold text-gray-900 dark:text-white block">{cont.name}</span>
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

                    {/* ── Companies driving B2B discussions ── */}
                    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                        Companies Behind Conversations
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
                                  {company.verified && <span className="text-blue-500 text-[10px]">✓</span>}
                                </div>
                                <span className="text-[8px] text-gray-400 block font-normal">{company.sector}</span>
                              </div>
                              <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold ml-auto shrink-0">{company.discussionsCount} active discussions</span>
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

                    {/* ── Global Discussion Alerts Creator ── */}
                    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                      <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold">
                        Never Miss an Important Discussion
                      </h4>
                      
                      {!alertConfigured ? (
                        <div className="space-y-3 text-[10px] font-semibold">
                          <p className="text-gray-500 leading-relaxed font-normal">
                            Configure threshold alerts to receive instant notifications when stories in your followed sectors become highly discussed.
                          </p>
                          
                          <div className="space-y-1.5">
                            <span className="text-[8px] text-gray-400 uppercase font-bold">Comment Threshold</span>
                            <select 
                              value={alertThreshold}
                              onChange={(e) => setAlertThreshold(e.target.value)}
                              className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg text-xs outline-none"
                            >
                              <option value="500">Exceeds 500 comments</option>
                              <option value="1,000">Exceeds 1,000 comments</option>
                              <option value="2,000">Exceeds 2,000 comments</option>
                            </select>
                          </div>

                          <button 
                            onClick={() => { setAlertConfigured(true); showToast(`Alert created for stories exceeding ${alertThreshold} comments ✓`); }}
                            className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                          >
                            Create Discussion Alert
                          </button>
                        </div>
                      ) : (
                        <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                          ✓ Discussion Alert Setup Successfully!
                        </div>
                      )}
                    </div>

                    {/* ── Premium Discussion Intelligence conversion CTA ── */}
                    <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white border border-blue-950 p-5 rounded-2xl shadow-sm space-y-4">
                      <h4 className="font-display text-sm font-bold flex items-center gap-1.5">
                        <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Go Beyond Comments
                      </h4>
                      <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                        Turn thousands of comments into structured business intelligence.
                      </p>
                      
                      <ul className="space-y-2 text-[10px] text-slate-350 font-semibold">
                        <li className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> AI Discussion Summaries & Opinion Clusters
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Expert vs Community Sentiment comparison
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Custom Discussion Threshold Alerts
                        </li>
                      </ul>

                      <button 
                        onClick={() => showToast("Opening premium checkout flow...")}
                        className="w-full text-center bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2 rounded-xl transition-all uppercase tracking-wider"
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

                    {/* ── Newsletter: industry debate digest ── */}
                    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                        Your Weekly Industry Debate Digest
                      </h4>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                        Get the most discussed business stories, opinions, and expert perspectives from your sectors.
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
                          ✓ Subscribed to Industry Debate Digest!
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
                  Select or deselect the sectors you care about to build the primary content boundary for your personalized discussions feed.
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

          {/* ─── Business Lead CRM Modal ─── */}
          {enquiryCompany && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
                  <div>
                    <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold font-bold">
                      Lead Enquiry Hub
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
        </>
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

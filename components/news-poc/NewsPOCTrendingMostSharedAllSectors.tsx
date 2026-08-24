"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, Share2, Lock, ChevronRight, Search, AlertTriangle, 
  CheckCircle, ThumbsUp, Bookmark, MessageCircle, ArrowLeft, X, HelpCircle, 
  Eye, Zap, Globe, Briefcase, TrendingUp, Filter
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
  shareVelocity: string; // e.g. "+380 shares/hr"
  shareVelocityValue: number; // raw value for sorting
  isViral: boolean;
}

interface TopicCluster {
  name: string;
  count: number;
  sector: string;
  shares: string;
  update: string;
  countries: string;
  latestStory: string;
}

interface ExpertComment {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

interface CompanyLeaderboard {
  name: string;
  logo: string;
  sector: string;
  storiesCount: number;
  latestStory: string;
  verified: boolean;
}

interface ProductServiceItem {
  name: string;
  category: string;
  provider: string;
  shares: string;
  growth: string;
}

interface CountryMetric {
  name: string;
  flag: string;
  sharesCount: string;
  topSector: string;
  topStory: string;
  sharesValue: number; // raw for sorting
}

// B2B viral most-shared articles database
const MOCK_SHARED_ARTICLES: Article[] = [
  {
    id: "ts-all-1",
    title: "APAC Semiconductor Sourcing Corridors Adopt Autonomous Assembly Frameworks",
    excerpt: "Logistics shipping bottlenecks ease by 38% across bilateral routes. Sourcing directors share scheduling layouts to secure priority wafer allocations.",
    sectorCode: "S16",
    sectorName: "Electronics & IT & Components",
    country: "India-Taiwan",
    region: "Asia",
    date: "1 hr ago",
    shares: 28400,
    likes: 12100,
    comments: 650,
    views: 195000,
    isTrending: true,
    sponsored: false,
    author: "Jensen Huang",
    role: "CEO, NVIDIA",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    topic: "Semiconductor Supply Chain",
    whyTrending: "Shared heavily by chip design firms and global supply chain managers coordinate delivery schedules.",
    sentiment: 88,
    timestamp: "now",
    rankMovement: "new",
    shareVelocity: "+420 shares/hr",
    shareVelocityValue: 420,
    isViral: true
  },
  {
    id: "ts-all-2",
    title: "Offshore Solar Power Grid Interconnection Standards Formally Ratified",
    excerpt: "New regulatory framework allows clean energy producers to feed metallurgy hubs directly, eliminating local distribution tax premiums by 14%.",
    sectorCode: "S17",
    sectorName: "Energy & Sustainability",
    country: "Germany-Norway",
    region: "Europe",
    date: "3 hrs ago",
    shares: 24700,
    likes: 9800,
    comments: 420,
    views: 145000,
    isTrending: true,
    sponsored: false,
    author: "Elena Rostova",
    role: "Energy Policy Lead",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Renewable Energy Policy",
    whyTrending: "Rapid sharing in utility circles to analyze cross-border grid integration possibilities.",
    sentiment: 85,
    timestamp: "now",
    rankMovement: "up",
    rankMovementValue: 2,
    shareVelocity: "+320 shares/hr",
    shareVelocityValue: 320,
    isViral: true
  },
  {
    id: "ts-all-3",
    title: "Next-Gen Commercial EV Battery Interoperability Protocol Approved",
    excerpt: "Ministry of Heavy Industries releases specs for swap charging, reducing infrastructure deployment cost by 22% and improving route reliability.",
    sectorCode: "S45",
    sectorName: "Automotive & Electric Vehicles",
    country: "USA-Canada Corridor",
    region: "North America",
    date: "5 hrs ago",
    shares: 21900,
    likes: 8500,
    comments: 310,
    views: 120000,
    isTrending: true,
    sponsored: false,
    author: "Julian Vance",
    role: "Automotive Advisor",
    image: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Electric Vehicle Growth",
    whyTrending: "Shared extensively by corporate fleet operators adapting to standardized swappable battery depots.",
    sentiment: 72,
    timestamp: "today",
    rankMovement: "up",
    rankMovementValue: 4,
    shareVelocity: "+290 shares/hr",
    shareVelocityValue: 290,
    isViral: true
  },
  {
    id: "ts-all-4",
    title: "GIFT City Custodian Banking Assets Surge on CEPA Trade Clearance Speedups",
    excerpt: "Trade clearance volumes peak under revised bilateral agreements, accelerating export clearance financing approvals.",
    sectorCode: "S41",
    sectorName: "Banking & Financial Services (BFSI)",
    country: "India-UAE",
    region: "Middle East",
    date: "8 hrs ago",
    shares: 19400,
    likes: 7100,
    comments: 290,
    views: 105000,
    isTrending: true,
    sponsored: false,
    author: "Rajesh Kumar",
    role: "Finance Correspondent",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&auto=format&fit=crop&q=80",
    topic: "Bilateral Trade Expansion",
    whyTrending: "Highly shared among trade brokers and investment consultants utilizing tax-free clearance windows.",
    sentiment: 79,
    timestamp: "today",
    rankMovement: "down",
    rankMovementValue: 1,
    shareVelocity: "+150 shares/hr",
    shareVelocityValue: 150,
    isViral: false
  },
  {
    id: "ts-all-5",
    title: "Pharma API Import Substitution Standards Lower Logistics Buffers",
    excerpt: "New clinical compliance standards and supply chain clusters lower import dependency by 28%, securing raw materials inventory buffers.",
    sectorCode: "S23",
    sectorName: "Health & Family Welfare & Pharma",
    country: "Germany-India",
    region: "Asia",
    date: "12 hrs ago",
    shares: 16500,
    likes: 6400,
    comments: 215,
    views: 92000,
    isTrending: true,
    sponsored: false,
    author: "Priya Sundaram",
    role: "Trade Analyst",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Pharma Supply Chain",
    whyTrending: "Shared amongst pharmaceutical boards mapping local feedstock alternatives.",
    sentiment: 81,
    timestamp: "today",
    rankMovement: "stable",
    shareVelocity: "+110 shares/hr",
    shareVelocityValue: 110,
    isViral: false
  },
  {
    id: "ts-all-6",
    title: "Advanced Specialty Chemicals Export Output Hits Record High",
    excerpt: "Export orders for advanced battery polymer components spike by 45%. Sourcing managers share raw supply indexes to negotiate Q3 contracts early.",
    sectorCode: "S07",
    sectorName: "Chemicals & Fertilizers & Minerals",
    country: "Singapore",
    region: "Asia",
    date: "1 day ago",
    shares: 13900,
    likes: 4200,
    comments: 150,
    views: 78000,
    isTrending: false,
    sponsored: false,
    author: "Chloé Moreau",
    role: "Materials Correspondent",
    image: "https://images.unsplash.com/photo-1616400619175-5ebd36595c6b?w=900&auto=format&fit=crop&q=80",
    topic: "Specialty Chemicals Market",
    whyTrending: "Shared in chemical logistics circles negotiating freight bookings.",
    sentiment: 75,
    timestamp: "week",
    rankMovement: "down",
    rankMovementValue: 2,
    shareVelocity: "+70 shares/hr",
    shareVelocityValue: 70,
    isViral: false
  },
  {
    id: "ts-all-7",
    title: "Bilateral Wheat Export Smart Drone Spraying Protocols Adopted",
    excerpt: "Wheat cooperatives implement autonomous crop scanning, reducing pesticide runoff indices by 38% under bilateral grants.",
    sectorCode: "S01",
    sectorName: "Agriculture & Farmers Welfare",
    country: "Australia-India",
    region: "Global",
    date: "3 days ago",
    shares: 11200,
    likes: 4900,
    comments: 260,
    views: 63000,
    isTrending: false,
    sponsored: false,
    author: "Dr. Ramesh Nair",
    role: "Agricultural Policy Lead",
    image: "https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?w=900&auto=format&fit=crop&q=80",
    topic: "AgriTech Advancements",
    whyTrending: "Shared by agricultural cooperatives exploring automated efficiency metrics.",
    sentiment: 84,
    timestamp: "week",
    rankMovement: "up",
    rankMovementValue: 1,
    shareVelocity: "+55 shares/hr",
    shareVelocityValue: 55,
    isViral: false
  },
  {
    id: "ts-all-8",
    title: "EU Carbon Border Tariff Audits Force Metallurgical Re-evaluations",
    excerpt: "Steel and aluminum exporters face compliance timeline shifts, dropping operating margin projections by 8-14% under scope-3 emissions metrics.",
    sectorCode: "S37",
    sectorName: "Steel & Metallurgy",
    country: "EU-India",
    region: "Europe",
    date: "4 days ago",
    shares: 9805,
    likes: 3100,
    comments: 480,
    views: 59000,
    isTrending: false,
    sponsored: false,
    author: "Sonia Marchetti",
    role: "Sourcing Counsel",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=900&auto=format&fit=crop&q=80",
    topic: "Trade Policy Revisions",
    whyTrending: "Shared heavily by trade lawyers and compliance officers preparing new carbon balance sheets.",
    sentiment: 62,
    timestamp: "week",
    rankMovement: "down",
    rankMovementValue: 3,
    shareVelocity: "+40 shares/hr",
    shareVelocityValue: 40,
    isViral: false
  },
  {
    id: "ts-all-9",
    title: "Greenfield Silicon Wafer Advanced Assembly Packaging Fab Breaks Ground",
    excerpt: "A $2.4B packaging facility begins building. Initial plans feature autonomous material tracking protocols to align with local assembly grants.",
    sectorCode: "S46",
    sectorName: "Semiconductors & OSAT",
    country: "USA-Taiwan",
    region: "North America",
    date: "1 week ago",
    shares: 8400,
    likes: 3900,
    comments: 110,
    views: 48000,
    isTrending: false,
    sponsored: true,
    author: "Satoshi Yamamoto",
    role: "Advanced Packaging Editor",
    image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=900&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    topic: "Semiconductor Supply Chain",
    whyTrending: "A sponsored layout illustrating critical wafer infrastructure expansion points.",
    sentiment: 80,
    timestamp: "month",
    rankMovement: "new",
    shareVelocity: "+25 shares/hr",
    shareVelocityValue: 25,
    isViral: false
  },
  {
    id: "ts-all-10",
    title: "Bilateral Hydrogen Cargo Expressways Ratified",
    excerpt: "Pioneering cargo networks install rapid hydrogen swappable cells, cutting long-distance heavy vehicle emission index by 42%.",
    sectorCode: "S17",
    sectorName: "Energy & Sustainability",
    country: "Norway-Germany",
    region: "Europe",
    date: "2 weeks ago",
    shares: 7200,
    likes: 2800,
    comments: 135,
    views: 41000,
    isTrending: false,
    sponsored: false,
    author: "Marcus Chen",
    role: "Energy Infrastructure Lead",
    image: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?w=900&auto=format&fit=crop&q=80",
    companyName: "Nexus Dynamics",
    topic: "Renewable Energy Policy",
    whyTrending: "Shared in logistics planning channels evaluating green shipping lanes.",
    sentiment: 90,
    timestamp: "month",
    rankMovement: "stable",
    shareVelocity: "+15 shares/hr",
    shareVelocityValue: 15,
    isViral: false
  }
];

// Topic Clusters
const TOPIC_CLUSTERS: TopicCluster[] = [
  { name: "Semiconductor Supply Chain", count: 14, sector: "Semiconductors & OSAT", shares: "36.8K Shares", update: "10m ago", countries: "India, Taiwan, USA", latestStory: "APAC Semiconductor Sourcing Corridors Adopt Autonomous Assembly" },
  { name: "Renewable Energy Policy", count: 21, sector: "Energy & Sustainability", shares: "31.9K Shares", update: "1h ago", countries: "Germany, Norway, India", latestStory: "Offshore Solar Power Grid Interconnection Standards Formally Ratified" },
  { name: "Electric Vehicle Growth", count: 18, sector: "Automotive & Electric Vehicles", shares: "21.9K Shares", update: "1d ago", countries: "USA, Canada", latestStory: "Next-Gen Commercial EV Battery Interoperability Protocol Approved" },
  { name: "Pharma Supply Chain", count: 11, sector: "Health & Pharma", shares: "16.5K Shares", update: "3h ago", countries: "Germany, India", latestStory: "Pharma Sourcing Leaders Establish Active Ingredients Buffer Pools" }
];

// Expert Perspective Comments
const MOCK_EXPERT_COMMENTS: ExpertComment[] = [
  { 
    name: "Dr. Ramesh Nair", 
    role: "Agri Policy Expert", 
    text: "Decentralized trade logistics models combined with autonomous spraying protocols allow regional wheat cooperatives to secure 28% higher margins.",
    avatar: "RN"
  },
  { 
    name: "Sonia Marchetti", 
    role: "Sourcing Counsel", 
    text: "The EU carbon border tariff audits mean companies must calculate scope-3 emissions at point of shipping. Paperless compliance grids are no longer optional.",
    avatar: "SM"
  }
];

// Companies Behind Most Shared Stories
const MOCK_COMPANIES: CompanyLeaderboard[] = [
  { name: "Nexus Dynamics", logo: "ND", sector: "Energy & Sustainability", storiesCount: 9, latestStory: "Offshore Solar Power Grid Interconnection Standards Formally Ratified", verified: true },
  { name: "NVIDIA", logo: "NV", sector: "Electronics & IT & Components", storiesCount: 7, latestStory: "APAC Semiconductor Sourcing Corridors Adopt Autonomous Assembly Frameworks", verified: true }
];

// Most Shared Products & Services
const MOCK_PRODUCTS: ProductServiceItem[] = [
  { name: "OSAT Silicon Packaging Fabs", category: "Semiconductor Assembly", provider: "NVIDIA Corp", shares: "8.4K Shares", growth: "+35% Growth" },
  { name: "Offshore Hybrid solar Inverters", category: "Energy Systems", provider: "Nexus Dynamics", shares: "7.2K Shares", growth: "+28% Growth" }
];

// Countries Sharing the Most News
const MOCK_COUNTRIES_SHARING: CountryMetric[] = [
  { name: "India", flag: "🇮🇳", sharesCount: "1.2M Shares", topSector: "Technology & Semiconductors", topStory: "APAC Semiconductor Sourcing Corridors Adopt Autonomous Assembly", sharesValue: 1200000 },
  { name: "USA", flag: "🇺🇸", sharesCount: "980K Shares", topSector: "Automotive & Electric Vehicles", topStory: "Next-Gen Commercial EV Battery Interoperability Protocol Approved", sharesValue: 980000 },
  { name: "Singapore", flag: "🇸🇬", sharesCount: "720K Shares", topSector: "Logistics & Specialty Chemicals", topStory: "Advanced Specialty Chemicals Export Output Hits Record High", sharesValue: 720000 },
  { name: "Germany", flag: "🇩🇪", sharesCount: "680K Shares", topSector: "Energy & Sustainability", topStory: "Offshore Solar Power Grid Interconnection Standards Formally Ratified", sharesValue: 680000 },
  { name: "UAE", flag: "🇦🇪", sharesCount: "540K Shares", topSector: "Banking & Custodian Services", topStory: "GIFT City Custodian Banking Assets Surge on CEPA Clearance", sharesValue: 540000 }
];

// Heatmap interactive data
const MOCK_HEATMAP_REGIONS = [
  { region: "Asia", volume: "2.46M Shares", topSector: "Semiconductors", activeStories: 45 },
  { region: "Europe", volume: "1.84M Shares", topSector: "Clean Tech & Metallurgy", activeStories: 38 },
  { region: "North America", volume: "1.62M Shares", topSector: "Automotive & EVs", activeStories: 29 },
  { region: "Middle East", volume: "920K Shares", topSector: "Banking & BFSI", activeStories: 18 },
  { region: "Global", volume: "840K Shares", topSector: "Multilateral Policy", activeStories: 12 }
];

interface Props {
  onBack?: () => void;
}

export default function NewsPOCTrendingMostSharedAllSectors({ onBack }: Props) {
  // Filters state
  const [activeTimeRange, setActiveTimeRange] = useState<"now" | "today" | "week" | "month">("now");
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [selectedGeographyFilter, setSelectedGeographyFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Interactive actions states
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);
  const [commentsMap, setCommentsMap] = useState<Record<string, { author: string; text: string }[]>>({
    "ts-all-1": [
      { author: "Marcus Aurelius", text: "Wafer allocation priority queues are now driven entirely by bilateral logistics clearance speed." }
    ],
    "ts-all-2": [
      { author: "Julian Vance", text: "Removing the 14% tax premium bypasses retail utility blockers entirely." }
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
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  
  // Alert builder state
  const [alertSector, setAlertSector] = useState("Technology");
  const [alertSharesThreshold, setAlertSharesThreshold] = useState("10,000");
  const [alertConfigured, setAlertConfigured] = useState(false);

  // Selected region for Heatmap widget
  const [selectedHeatmapRegion, setSelectedHeatmapRegion] = useState<string>("Asia");

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
      [id]: [...(prev[id] || []), { author: "You (Executive)", text }]
    }));
    setNewCommentText(prev => ({ ...prev, [id]: "" }));
    showToast("Comment posted successfully ✓");
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryText.trim()) return;

    showToast(`Lead transmitted to ${enquiryCompany} ✓ (Reference ID: iGEN-LD-${Math.floor(1000 + Math.random() * 9000)})`);
    setEnquiryCompany(null);
    setEnquiryText("");
  };

  // Filter logic
  const filteredStories = MOCK_SHARED_ARTICLES.filter(art => {
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

  // Dynamic ranking recalculation based on actual share count
  const sortedStories = [...filteredStories].sort((a, b) => b.shares - a.shares);

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
        <span className="text-blue-500 font-bold">All Sectors</span>
      </nav>

      {/* ─── Premium Editorial Hero ─── */}
      <header className="mx-auto max-w-7xl px-4 pt-6 pb-4 lg:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Globe className="h-3 w-3" /> Global Discovery Hub
              </span>
              <button 
                onClick={() => setShowHowItWorks(!showHowItWorks)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white flex items-center gap-1 text-[10px] font-semibold"
              >
                <HelpCircle className="h-3.5 w-3.5" /> How Trending Works
              </button>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Most Shared News — All Sectors
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium max-w-2xl leading-relaxed">
              Discover the trade and business stories being shared most widely across industries, markets and regions worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link 
              href="/en/news-poc/trending/most-shared/my"
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

        {/* How Trending Works Info Block */}
        {showHowItWorks && (
          <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900 p-5 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" /> Sharing & Virality Rankings Methodology
              </h3>
              <button onClick={() => setShowHowItWorks(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
              Our organic algorithm ranks stories using actual verified platform actions: <strong>shares count, link copies, email forwards, and social exports</strong>. The primary visual weight is allocated to shares. Sponsored slots and commercial banners are kept strictly isolated and cannot organically alter ranking positions.
            </p>
          </div>
        )}

        {/* ─── Hero-Adjacent Search & Filters Bar ─── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search shared stories..."
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

      {/* ─── Global Sharing Snapshot ─── */}
      <section className="mx-auto max-w-7xl px-4 pt-2 lg:px-6">
        <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Global Sharing Snapshot</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { title: "#1 MOST SHARED", label: "APAC Semiconductor assembly corridors setup", metric: "28.4K Shares", sec: "Semiconductors & OSAT", color: "border-blue-500/20" },
            { title: "FASTEST SPREADING", label: "Offshore Solar Power Interconnection Standards", metric: "+320 shares/hr", sec: "Energy & Sustainability", color: "border-emerald-500/20" },
            { title: "MOST SHARED SECTOR", label: "Automotive & Electric Vehicles", metric: "112K Shares", sec: "High Activity", color: "border-purple-500/20" },
            { title: "MOST SHARED COUNTRY", label: "India Hubs", metric: "1.2M Shares", sec: "Global Sharing Leaders", color: "border-orange-500/20" },
            { title: "MOST DISCUSSED SHARED", label: "EU Carbon Border Tax revisions", metric: "480 Comments", sec: "Steel & Metallurgy", color: "border-pink-500/20" }
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

      {/* ─── Loading Skeleton States ─── */}
      {isLoading ? (
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-6">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-3xl p-8 min-h-[300px] animate-pulse space-y-4">
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
          {/* ─── #1 Global Most-Shared Story Hero Card ─── */}
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
                    <Share2 className="h-3.5 w-3.5 text-blue-400" /> {((sortedStories[0].shares) / 1000).toFixed(1)}K Shares
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3 text-red-500" /> {(sortedStories[0].likes / 1000).toFixed(1)}K
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <MessageCircle className="h-3 w-3" /> {(commentsMap[sortedStories[0].id] || []).length + sortedStories[0].comments}
                  </span>
                  <span className="bg-white/10 backdrop-blur-xs text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {(sortedStories[0].views / 1000).toFixed(0)}K Views
                  </span>
                </div>

                <div className="relative z-10 space-y-4 max-w-3xl font-sans">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-blue-600 text-white text-[9px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider block w-max">
                      Rank #1 • MOST SHARED
                    </span>
                    <span className="bg-emerald-500 text-slate-950 text-[9px] font-bold px-2 py-0.5 rounded tracking-wide font-mono flex items-center gap-0.5">
                      <TrendingUp className="h-3 w-3" /> Velocity: {sortedStories[0].shareVelocity}
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
                    <button 
                      onClick={() => showToast("Copied story share link! ↗")}
                      className="bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold px-5 py-2.5 rounded-xl transition-all uppercase tracking-wider"
                    >
                      Share Story
                    </button>
                    {sortedStories[0].companyName && (
                      <button 
                        onClick={() => {
                          setEnquiryCompany(sortedStories[0].companyName || null);
                          setEnquiryType("quote");
                        }}
                        className="bg-white/5 hover:bg-white/15 text-white border border-white/10 text-xs font-bold px-4 py-2.5 rounded-xl transition-all uppercase tracking-wider"
                      >
                        View Company ({sortedStories[0].companyName}) →
                      </button>
                    )}
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
              
              {/* ── LEFT COLUMN: Leaderboard & Feed ── */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Leaderboard Header with Filter */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3 flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Most Shared Stories Worldwide
                    </h2>
                    <span className="text-[10px] text-gray-400 block font-normal">Ranked by verified user sharing actions across corridors.</span>
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
                      
                      return (
                        <div 
                          key={story.id} 
                          className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm flex gap-4 hover:border-blue-500/35 transition-all group"
                        >
                          {/* Rank Column */}
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
                          <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden bg-gray-150 shrink-0 relative">
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
                                    ? "bg-amber-100 text-amber-700 border border-amber-200 dark:bg-amber-900/20 dark:text-amber-400"
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
                            <p className="text-xs text-gray-550 dark:text-gray-400 leading-relaxed font-normal line-clamp-2">
                              {story.excerpt}
                            </p>

                            <div className="flex justify-between items-center pt-2 text-[10px] flex-wrap gap-2">
                              {/* Statistics metrics - Shares emphasized */}
                              <div className="flex items-center gap-3.5 font-bold text-gray-500">
                                <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 px-2 py-0.5 rounded border border-blue-100 dark:border-blue-900/50">
                                  <Share2 className="h-3.5 w-3.5" /> {story.shares.toLocaleString()} Shares
                                </span>
                                <span className="flex items-center gap-1 text-red-500"><ThumbsUp className="h-3.5 w-3.5" /> {story.likes.toLocaleString()}</span>
                                <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {commentsCount}</span>
                                <span className="flex items-center gap-1 font-mono text-[9px]">Velocity: {story.shareVelocity}</span>
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
                    <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto animate-pulse" />
                    <p className="text-xs font-bold text-gray-500">No highly shared stories are available under this selection right now.</p>
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

                {/* ── Fastest Spreading Stories ── */}
                <div className="space-y-4 pt-6">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-emerald-500" /> Fastest Spreading Stories (velocity tracker)
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sortedStories.slice(1, 3).map((story, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-sm flex flex-col justify-between min-h-[120px]">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 text-[8px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                              FASTEST SPREADING
                            </span>
                            <span className="text-[9px] font-bold text-gray-400">{story.rankMovement}</span>
                          </div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight line-clamp-2">{story.title}</h4>
                          <p className="text-[9px] text-gray-400 font-normal leading-normal">{story.whyTrending}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-800 mt-2 text-[10px]">
                          <span className="text-[9px] text-gray-400 font-semibold">{story.sectorName}</span>
                          <span className="text-xs font-extrabold text-emerald-500">{story.shareVelocity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Viral Stories ── */}
                <div className="space-y-4 pt-6">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Going Viral Globally (Threshold Alarmed)
                    </h3>
                  </div>
                  
                  <div className="space-y-3">
                    {sortedStories.filter(s => s.isViral).map((story, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-red-200/40 dark:border-red-950/30 p-4 rounded-xl shadow-sm flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <span className="bg-red-500 text-white text-[7px] font-extrabold px-1.5 py-0.5 rounded font-mono uppercase tracking-widest">
                            GOING VIRAL
                          </span>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight mt-1">{story.title}</h4>
                          <span className="text-[8px] text-gray-400 font-mono uppercase">{story.sectorName} • {story.country} • {story.date}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-base font-extrabold text-red-500 block font-mono">{story.shares.toLocaleString()}</span>
                          <span className="text-[8px] text-emerald-500 block font-bold">{story.shareVelocity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Sector × Country Intelligence Grid Matrix ── */}
                <div className="space-y-4 pt-6">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Global Sharing Matrix (Sector × Country Activity)
                    </h3>
                  </div>

                  <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-5 space-y-4">
                    <p className="text-[10px] text-gray-500 leading-normal font-semibold">
                      Compare B2B sharing volumes and corporate interactions across regional lanes:
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-800 font-bold text-[9px] text-gray-400 uppercase">
                            <th className="py-2 pr-4">Sector Focus</th>
                            <th className="py-2 px-3">India</th>
                            <th className="py-2 px-3">USA</th>
                            <th className="py-2 px-3">Germany</th>
                            <th className="py-2 px-3">Singapore</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-[10px] font-semibold">
                          {[
                            { sector: "Technology & Semiconductors", in: "48.2K", us: "35.1K", de: "18.2K", sg: "24.9K" },
                            { sector: "Energy & Utilities", in: "32.4K", us: "28.9K", de: "45.0K", sg: "12.5K" },
                            { sector: "Automotive & Electric Vehicles", in: "28.5K", us: "41.2K", de: "24.1K", sg: "19.0K" },
                            { sector: "Health & Pharma Clusters", in: "39.1K", us: "14.8K", de: "22.5K", sg: "11.2K" }
                          ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/40">
                              <td className="py-2.5 pr-4 font-bold text-gray-900 dark:text-white">{row.sector}</td>
                              <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">{row.in}</td>
                              <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">{row.us}</td>
                              <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">{row.de}</td>
                              <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">{row.sg}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* ── Country Sharing Leaderboard ── */}
                <div className="space-y-4 pt-6">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Countries Sharing the Most News
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {MOCK_COUNTRIES_SHARING.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs flex flex-col justify-between min-h-[130px]">
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="text-xl">{item.flag}</span>
                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wide">{item.name}</span>
                          </div>
                          <h4 className="text-xs font-extrabold text-gray-900 dark:text-white mt-2 leading-none">{item.sharesCount}</h4>
                          <span className="text-[8px] text-gray-400 block mt-1 font-normal leading-normal line-clamp-2">
                            Top Story: {item.topStory}
                          </span>
                        </div>
                        <div className="pt-2 border-t border-gray-50 dark:border-gray-800 mt-2 flex justify-between items-center text-[9px]">
                          <span className="font-semibold text-gray-500">Top Sector: {item.topSector.split(" & ")[0]}</span>
                          <button onClick={() => showToast(`Opening country portal for ${item.name}`)} className="text-blue-500 font-bold hover:underline">
                            Explore →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN: Sidebar Widgets ── */}
              <div className="space-y-6">
                
                {/* ── AI Sharing Intelligence Card ── */}
                <div className="bg-slate-900 text-white border border-slate-900 p-5 rounded-2xl shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 pointer-events-none" />
                  <div className="relative z-10 space-y-3">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-amber-400" />
                      <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest">AI Sharing Intelligence</span>
                      <span className="bg-amber-500 text-gray-900 text-[8px] font-bold px-2 py-0.5 rounded-full ml-auto font-extrabold font-sans">PRO ACCESS</span>
                    </div>

                    <h4 className="text-xs font-bold leading-snug">
                      Why are sourcing corridors sharing wafter alignment grids?
                    </h4>
                    
                    {!isPremiumUnlocked ? (
                      <div className="space-y-3">
                        <p className="text-[10px] text-slate-400 leading-relaxed font-normal line-clamp-2">
                          Procurement directors and export coordinators copy-link scheduling indexes to secure wafer allocations under new bilateral...
                        </p>
                        <div className="bg-slate-900/80 p-3 rounded-lg border border-white/10 flex items-center justify-between text-[9px] relative overflow-hidden">
                          <Lock className="h-3.5 w-3.5 text-white/40 shrink-0" />
                          <span className="text-slate-300 ml-1.5">Detailed viral model summaries locked</span>
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
                        <p><strong>Primary Driver:</strong> High sharing activity matches logistics firms planning delivery queues around bilateral wafer assembly parks.</p>
                        <p><strong>Macro Impact:</strong> Operating delays in electronics corridors could drop by 18 days if standards align.</p>
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

                {/* ── Share Reach Impact widget ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Global Share Reach Impact
                  </span>
                  
                  <div className="space-y-4 pt-1 font-semibold text-[10px]">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 block font-normal">Organic Share Count</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">28.4K Shares</span>
                    </div>
                    <div className="h-1 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-full animate-pulse" />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-center text-[10px] pt-1">
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg border border-gray-100 dark:border-gray-800">
                        <span className="text-[8px] text-gray-400 block uppercase font-normal">Reach Views</span>
                        <span>6.2M</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg border border-gray-100 dark:border-gray-800">
                        <span className="text-[8px] text-gray-400 block uppercase font-normal">Comments</span>
                        <span>18.4K</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-2 rounded-lg border border-gray-100 dark:border-gray-800">
                        <span className="text-[8px] text-gray-400 block uppercase font-normal">Likes</span>
                        <span>92K</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Global Sharing Heatmap Widget ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Global Sharing Map (Interactive)
                  </span>
                  
                  <div className="space-y-3">
                    <p className="text-[10px] text-gray-500 leading-normal font-normal">
                      Select region to explore regional sharing activity and key metrics:
                    </p>

                    {/* interactive mock map grid selection list */}
                    <div className="grid grid-cols-3 gap-2">
                      {MOCK_HEATMAP_REGIONS.map(reg => (
                        <button
                          key={reg.region}
                          onClick={() => setSelectedHeatmapRegion(reg.region)}
                          className={`px-2 py-1.5 rounded-lg border text-[9px] font-bold transition-all truncate text-center ${
                            selectedHeatmapRegion === reg.region 
                              ? "bg-blue-600 border-blue-600 text-white shadow-3xs"
                              : "bg-gray-50 border-gray-200 dark:bg-gray-900 dark:border-gray-800 text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {reg.region}
                        </button>
                      ))}
                    </div>

                    {/* selected region details panel */}
                    {selectedHeatmapRegion && (
                      <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 p-3 rounded-xl space-y-2 text-[10px] font-semibold">
                        <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-1.5">
                          <span className="text-[9px] text-gray-400 block uppercase">Selected Region</span>
                          <span className="text-blue-500 font-bold">{selectedHeatmapRegion}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 block font-normal">Sharing Volume</span>
                          <span>{MOCK_HEATMAP_REGIONS.find(r => r.region === selectedHeatmapRegion)?.volume}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 block font-normal">Top Shared Sector</span>
                          <span>{MOCK_HEATMAP_REGIONS.find(r => r.region === selectedHeatmapRegion)?.topSector}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400 block font-normal">Active stories</span>
                          <span>{MOCK_HEATMAP_REGIONS.find(r => r.region === selectedHeatmapRegion)?.activeStories} stories active</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Trending Topic Clusters ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Most Shared Topics Worldwide
                  </span>
                  <div className="space-y-3.5">
                    {TOPIC_CLUSTERS.map((topic, idx) => (
                      <div key={idx} className="flex justify-between items-start text-xs">
                        <div className="space-y-0.5">
                          <span className="font-bold text-blue-600 dark:text-blue-400 block hover:underline cursor-pointer">
                            #{topic.name.replace(/\s+/g, "")}
                          </span>
                          <span className="text-[9px] text-gray-400 block font-normal">{topic.sector} • {topic.count} stories</span>
                        </div>
                        <div className="text-right shrink-0 flex flex-col items-end gap-1">
                          <span className="text-[10px] font-bold block">{topic.shares}</span>
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

                {/* ── Most Discussed Shared Stories ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Stories Creating the Most Discussion
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
                                <span className="font-bold text-gray-955 dark:text-white block">{c.author}</span>
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

                {/* ── Companies Behind Most Shared Stories ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
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
                              {company.verified && <span className="text-blue-500 text-[10px]">✓</span>}
                            </div>
                            <span className="text-[8px] text-gray-400 block font-normal">{company.sector}</span>
                          </div>
                          <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold ml-auto shrink-0">{company.storiesCount} stories</span>
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

                {/* ── Global Sharing Alerts Builder ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold">
                    Know When a Story Goes Viral
                  </h4>
                  
                  {!alertConfigured ? (
                    <div className="space-y-3 text-[10px] font-semibold">
                      <p className="text-gray-500 leading-relaxed font-normal">
                        Configure threshold alerts to receive instant notifications when stories in your followed sectors become highly trending.
                      </p>
                      
                      <div className="space-y-1.5">
                        <span className="text-[8px] text-gray-400 uppercase font-bold">Sector Focus</span>
                        <select 
                          value={alertSector}
                          onChange={(e) => setAlertSector(e.target.value)}
                          className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg text-xs outline-none"
                        >
                          <option value="Technology">Technology & Wafer Packaging</option>
                          <option value="Energy">Energy & Solar grids</option>
                          <option value="Health">Healthcare & API Supply</option>
                          <option value="Automotive">Automotive & Heavy EVs</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[8px] text-gray-400 uppercase font-bold">Alert Threshold</span>
                        <select 
                          value={alertSharesThreshold}
                          onChange={(e) => setAlertSharesThreshold(e.target.value)}
                          className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg text-xs outline-none"
                        >
                          <option value="5,000">Exceeds 5,000 shares</option>
                          <option value="10,000">Exceeds 10,000 shares</option>
                          <option value="20,000">Exceeds 20,000 shares</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => { setAlertConfigured(true); showToast(`Alert created for ${alertSector} stories over ${alertSharesThreshold} shares ✓`); }}
                        className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                      >
                        Create Alert
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Global Sharing Alert Configured Successfully!
                    </div>
                  )}
                </div>

                {/* ── Premium Global Sharing Intelligence CTA ── */}
                <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white border border-blue-950 p-5 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-display text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Go Beyond Share Counts
                  </h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                    Understand how stories spread across industries and markets and identify emerging business conversations.
                  </p>
                  
                  <ul className="space-y-2 text-[10px] text-slate-350 font-semibold">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Share Velocity & Heatmap Grids
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Advanced Viral Threshold Alarms
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Sector × Country Intelligence Matrix
                    </li>
                  </ul>

                  <button 
                    onClick={() => showToast("Opening premium checkout flow...")}
                    className="w-full text-center bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs py-2 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Unlock Global Sharing Intelligence
                  </button>
                </div>

                {/* ── Sponsored Global Campaign (SPONSORED) ── */}
                <div className="border border-blue-200/50 dark:border-blue-900/40 bg-blue-50/10 dark:bg-blue-900/5 p-4 rounded-xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/20">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Featured Global Campaign</span>
                    <span className="bg-amber-500 text-gray-950 text-[7px] font-extrabold px-1.5 py-0.5 rounded font-mono">SPONSORED</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-blue-500 uppercase">Green Wafer Assembly Initiative</span>
                    <h5 className="text-xs font-bold text-gray-950 dark:text-white leading-tight">Bilateral Wafer grants allocated for clean rooms</h5>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal font-normal">
                      A detailed review of logistics alignment grants for corporate wafer buyers.
                    </p>
                  </div>
                  <button 
                    onClick={() => showToast("Accessing sponsored research bulletin...")}
                    className="w-full text-center border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                  >
                    Read Campaign Report
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
                      <span className="text-[8px] text-gray-400 block font-normal">Energy & Grid connectivity Solutions</span>
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
                <div className="bg-gray-100 dark:bg-gray-955/60 border border-gray-200 dark:border-gray-800 border-dashed p-4 rounded-2xl text-center space-y-1">
                  <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-widest">Advertisement</span>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">iGEN Ad Network · 300 × 250 Banner Slot</p>
                  <Link href="/eoi" className="text-[9px] font-bold text-blue-500 hover:underline block uppercase mt-1">Request Placement</Link>
                </div>

                {/* ── Newsletter: Global Sharing Brief ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Global Sharing Brief
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    Get the most-shared trade and business stories from around the world delivered to your inbox.
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
                          onClick={() => { if (emailInput.trim()) { setNewsletterSubscribed(true); showToast("Subscribed Daily digest Brief ✓"); } }}
                          className="flex-1 bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-1.5 rounded-lg transition-colors uppercase text-[9px]"
                        >
                          Daily
                        </button>
                        <button 
                          onClick={() => { if (emailInput.trim()) { setNewsletterSubscribed(true); showToast("Subscribed Weekly digest Brief ✓"); } }}
                          className="flex-1 bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-1.5 rounded-lg transition-colors uppercase text-[9px]"
                        >
                          Weekly
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Subscribed to Global Sharing Brief!
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

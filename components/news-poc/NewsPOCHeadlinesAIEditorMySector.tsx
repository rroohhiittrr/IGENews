"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, Share2, Lock, ChevronRight, Search, AlertTriangle, 
  CheckCircle, ThumbsUp, Bookmark, MessageCircle, ArrowLeft, X, HelpCircle, 
  TrendingUp, Globe, Filter, Star, Briefcase, Eye, ChevronDown, Check,
  Play, Radio, ArrowUpRight, Flame, ShieldAlert, Cpu, Activity, Info
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
  readTime: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  importance: "Critical" | "High" | "Medium";
  aiSummary: string;
  whyItMatters: {
    whatHappened: string;
    whyItMattersText: string;
    whoIsAffected: string;
    whatsNext: string;
  };
  businessImpact: string;
  sectorImpact: string;
  regionalImpact: string;
  nextDevelopments: string;
  trending: boolean;
  breaking: boolean;
  sponsored: boolean;
  author: string;
  role: string;
  image: string;
  companyName?: string;
  companyLogo?: string;
  topic: string;
  timeline: { time: string; event: string }[];
  mySectorImportance: "Very High" | "High" | "Medium";
  globalImportance: "High" | "Medium" | "Low";
}

interface TrendSignal {
  topic: string;
  state: "Emerging" | "Rising" | "Accelerating" | "Stable" | "Declining";
  sentiment: string;
}

interface CompanyHeadline {
  name: string;
  logo: string;
  sector: string;
  verified: boolean;
  headlinesCount: number;
  latestHeadline: string;
}

interface LeaderHeadline {
  name: string;
  role: string;
  company: string;
  sector: string;
  latestHeadline: string;
}

interface TopicCluster {
  topic: string;
  storiesCount: number;
  countriesCount: number;
  companiesCount: number;
  expertOpinions: number;
}

// Simulated User Sector Preferences
// Technology, Energy, Healthcare, BFSI, Automotive
const USER_SECTOR_PREFS = ["S02", "S17", "S23", "S41", "S45"];

const MOCK_AI_ARTICLES: Article[] = [
  {
    id: "ai-my-1",
    title: "AI Sovereignty Mandates Force Multi-Cloud Sourcing Upgrades",
    excerpt: "Sovereign AI localized GPU cluster guidelines mandate that data operations remain strictly within national grid bounds. Enterprise tech leads face unexpected database migrations.",
    sectorCode: "S02",
    sectorName: "AI & Cyber Security",
    country: "India-EU Lanes",
    date: "2 hrs ago",
    readTime: "4 min read",
    likes: 340,
    comments: 48,
    shares: 88,
    views: 45000,
    importance: "Critical",
    aiSummary: "AI GPU sovereignty rules mandate data operations remain strictly within localized national clusters, driving corporate infrastructure migrations.",
    whyItMatters: {
      whatHappened: "Several ministries approved localized sovereign GPU requirements for critical sectors.",
      whyItMattersText: "Operating databases outside sovereign grid boundaries will attract non-compliance penalties up to 8% of revenue.",
      whoIsAffected: "Enterprise CTOs, public sector cloud providers, and global GPU farm operators.",
      whatsNext: "Independent developers must secure localized compliance certs before Q3 audits."
    },
    businessImpact: "Increases migration capital expenditure by 14% for multi-regional SaaS operations.",
    sectorImpact: "Accelerates local data center capacity builds and private cloud hardware sourcing.",
    regionalImpact: "Strengthens Indian and European local sovereign hosting corridors.",
    nextDevelopments: "Bilateral compliance checks start in late Q3 with mandatory audit timelines.",
    trending: true,
    breaking: true,
    sponsored: false,
    author: "Dr. Aris Thorne",
    role: "AI Policy Lead",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    companyLogo: "NV",
    topic: "AI Regulation",
    timeline: [
      { time: "09:00 AM", event: "Ministry releases GPU local storage policy draft." },
      { time: "11:30 AM", event: "Cloud providers publish compliance timelines." },
      { time: "02:00 PM", event: "Legal leads raise concern over cross-border model training." }
    ],
    mySectorImportance: "Very High",
    globalImportance: "High"
  },
  {
    id: "ai-my-2",
    title: "High-Capacity Sodium Battery Standards Disrupted by Raw Metal Pricing Spikes",
    excerpt: "Automotive battery developers clashing over structural raw-metal indices. Procurement leaders claim alternative battery geometry limits offsets grid transition margins by 12%.",
    sectorCode: "S45",
    sectorName: "Automotive & Electric Vehicles",
    country: "Germany-India Hubs",
    date: "4 hrs ago",
    readTime: "5 min read",
    likes: 280,
    comments: 32,
    shares: 64,
    views: 38000,
    importance: "High",
    aiSummary: "Automotive battery developers face procurement bottlenecks as battery raw metal indices spike, squeezing margins for hybrid battery geometries.",
    whyItMatters: {
      whatHappened: "Raw material prices for alternative battery configurations jumped 18% in bilateral spot markets.",
      whyItMattersText: "Rising component costs offset green energy transition subsidies, making hybrid geometries less competitive.",
      whoIsAffected: "Automotive manufacturing groups, cell suppliers, and lithium sourcing pools.",
      whatsNext: "Procurement boards will revise sourcing targets toward domestic sodium alternatives."
    },
    businessImpact: "Forces battery pack manufacturers to renegotiate forward supply commitments.",
    sectorImpact: "Promotes exploration of alternative non-lithium raw battery chemistry.",
    regionalImpact: "Spurs local refinery capacities across Indo-European logistics channels.",
    nextDevelopments: "Revised grid cell standardization rules will be published next week.",
    trending: true,
    breaking: false,
    sponsored: false,
    author: "Elena Rostova",
    role: "Automotive Sourcing Counsel",
    image: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=800&auto=format&fit=crop&q=80",
    companyName: "Tesla Logistics",
    companyLogo: "TL",
    topic: "EV Battery Geometries",
    timeline: [
      { time: "10:30 AM", event: "Bilateral commodity desk reports 18% sodium spot rally." },
      { time: "01:00 PM", event: "Automotive manufacturers associations hold emergency meeting." }
    ],
    mySectorImportance: "High",
    globalImportance: "Medium"
  },
  {
    id: "ai-my-3",
    title: "Regulatory API Standardizations Streamline Generic Drug Distribution",
    excerpt: "Health ministries issue digital public rail frameworks to track medical formulations. Sourcing companies claim standard APIs reduce custom clearing speeds to 12 hours.",
    sectorCode: "S23",
    sectorName: "Health & Family Welfare & Pharma",
    country: "India-Germany Lanes",
    date: "8 hrs ago",
    readTime: "6 min read",
    likes: 195,
    comments: 24,
    shares: 42,
    views: 29000,
    importance: "High",
    aiSummary: "Digital public rails standardizing API endpoints for generic formulation tracking are launched, slicing custom clearance times for exporters.",
    whyItMatters: {
      whatHappened: "Health ministries unified digital registry standards for bulk generic exporters.",
      whyItMattersText: "Standardized API interfaces remove paper customs checks, preventing cold chain shipment spoils.",
      whoIsAffected: "Generic drug formulators, border inspectors, and healthcare supply houses.",
      whatsNext: "Exporters must integrate digital ledger endpoints to qualify for express corridors."
    },
    businessImpact: "Reduces inventory hold periods at transit ports, boosting cash velocity.",
    sectorImpact: "Establishes secure tracking layers for API chemical feedstocks.",
    regionalImpact: "Enhances container shipping lines dispatch frequencies between Mumbai and Hamburg.",
    nextDevelopments: "Phase 2 tracking mandates will include active raw-material sourcing ledgers.",
    trending: false,
    breaking: false,
    sponsored: false,
    author: "Priya Sundaram",
    role: "Pharma Logistics Expert",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    companyName: "EcoHydro Power",
    companyLogo: "EH",
    topic: "Pharma Sourcing Tariffs",
    timeline: [
      { time: "08:00 AM", event: "Bilateral digital public rails go live." },
      { time: "12:00 PM", event: "First automated customs dispatch container verified." }
    ],
    mySectorImportance: "High",
    globalImportance: "Medium"
  },
  {
    id: "ai-my-4",
    title: "Offshore Custody Reserves Auditing Protocols Split BFSI Groups",
    excerpt: "Financial watchdogs update CEPA compliance targets. Asset managers claim rigid reserve rules limit capital dispatch speeds across bilateral investment channels.",
    sectorCode: "S41",
    sectorName: "Banking & Financial Services (BFSI)",
    country: "India-UAE Hubs",
    date: "12 hrs ago",
    readTime: "7 min read",
    likes: 154,
    comments: 19,
    shares: 31,
    views: 24000,
    importance: "Medium",
    aiSummary: "New custody reserves guidelines under CEPA create regulatory friction among offshore financial brokers operating in special economic zones.",
    whyItMatters: {
      whatHappened: "Regulatory agencies updated capital adequacy formulas for bilateral fund dispatches.",
      whyItMattersText: "Brokers claim reserve requirements penalize smaller fund managers, centralizing custody channels.",
      whoIsAffected: "Fund administrators, offshore brokers, and digital payment gateways.",
      whatsNext: "Asset managers will petition for tiered asset reserve targets."
    },
    businessImpact: "Restricts free collateral deployment for offshore corporate acquisitions.",
    sectorImpact: "Increases operational costs for compliance monitoring and reporting audits.",
    regionalImpact: "Favors offshore financial hubs with unified double taxation treaties.",
    nextDevelopments: "Bilateral panels will review implementation schedules in late Q3.",
    trending: false,
    breaking: false,
    sponsored: true,
    author: "Rajesh Kumar",
    role: "Offshore Finance Editor",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800&auto=format&fit=crop&q=80",
    companyName: "Siemens M&A",
    companyLogo: "SM",
    topic: "Bilateral Capital Flows",
    timeline: [],
    mySectorImportance: "Medium",
    globalImportance: "Low"
  }
];

const MOCK_TRENDS: TrendSignal[] = [
  { topic: "Enterprise AI Agents", state: "Emerging", sentiment: "72% Positive" },
  { topic: "Industrial Robotics", state: "Rising", sentiment: "64% Positive" },
  { topic: "AI Semiconductor Demand", state: "Accelerating", sentiment: "81% Positive" },
  { topic: "Clean Energy Micro-Grids", state: "Stable", sentiment: "55% Neutral" }
];

const MOCK_COMPANIES: CompanyHeadline[] = [
  { name: "NVIDIA", logo: "NV", sector: "AI & Cyber Security", verified: true, headlinesCount: 18, latestHeadline: "AI Sovereignty Mandates Force Multi-Cloud Sourcing Upgrades" },
  { name: "Tesla Logistics", logo: "TL", sector: "Automotive & Electric Vehicles", verified: true, headlinesCount: 12, latestHeadline: "High-Capacity Sodium Battery Standards Disrupted" }
];

const MOCK_LEADERS: LeaderHeadline[] = [
  { name: "Jensen Huang", role: "CEO", company: "NVIDIA", sector: "AI & Cyber Security", latestHeadline: "AI Sovereignty Mandates Force Multi-Cloud Curation Updates" },
  { name: "Elon Musk", role: "Technologist", company: "Tesla Logistics", sector: "Automotive & EV", latestHeadline: "High-Capacity Sodium Battery Standards Disrupted" }
];

const MOCK_CLUSTERS: TopicCluster[] = [
  { topic: "AI Regulation", storiesCount: 12, countriesCount: 4, companiesCount: 8, expertOpinions: 3 },
  { topic: "EV Battery Geometries", storiesCount: 8, countriesCount: 2, companiesCount: 5, expertOpinions: 2 },
  { topic: "Pharma Sourcing Tariffs", storiesCount: 6, countriesCount: 3, companiesCount: 4, expertOpinions: 1 }
];

const MOCK_EXPERTS = [
  { name: "Dr. Aris Thorne", org: "AI Policy Alliance", opinion: "Sovereignty directives will divide the cloud market. Exporters must build regional hosting cells.", relatedStory: "AI Sovereignty Mandates Force Curation Upgrades" },
  { name: "Elena Rostova", org: "Automotive Grid Council", opinion: "Sodium cell pricing is volatile. Sourcing groups need mixed-geometry production systems.", relatedStory: "High-Capacity Sodium Battery Standards Disrupted" }
];

interface Props {
  onBack?: () => void;
}

export default function NewsPOCHeadlinesAIEditorMySector({ onBack }: Props) {
  // Sector Preference state
  const [mySectorPreferences, setMySectorPreferences] = useState<string[]>(USER_SECTOR_PREFS);
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [selectedGeographyFilter, setSelectedGeographyFilter] = useState<string>("all");
  const [selectedImportanceFilter, setSelectedImportanceFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // UI state
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);
  
  // Interactive features
  const [showManageSectors, setShowManageSectors] = useState(false);
  const [isBriefGenerating, setIsBriefGenerating] = useState(false);
  const [generatedBriefText, setGeneratedBriefText] = useState<string | null>(null);

  // CRM Enquiry Modal
  const [enquiryCompany, setEnquiryCompany] = useState<string | null>(null);
  const [enquiryText, setEnquiryText] = useState("");

  // Alerts & Newsletter
  const [subscribedNewsletter, setSubscribedNewsletter] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [alertConfigured, setAlertConfigured] = useState(false);
  const [alertThreshold, setAlertThreshold] = useState("High");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // AI Chat Assistant
  const [aiChatQuery, setAiChatQuery] = useState("");
  const [aiChatResponse, setAiChatResponse] = useState<string | null>(null);
  const [isAiAnswering, setIsAiAnswering] = useState(false);

  // 30-Second Summary expanded card ID
  const [expandedSummaryId, setExpandedSummaryId] = useState<string>("ai-my-1");

  // Premium toggle simulator
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);

  // Loading skeleton simulator
  const [isLoading, setIsLoading] = useState(false);

  // Trigger loading skeleton on filter change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [selectedSectorFilter, selectedGeographyFilter, selectedImportanceFilter]);

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
      showToast("Liked story! ❤️");
    }
  };

  const handleBookmark = (id: string) => {
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles(prev => prev.filter(x => x !== id));
      showToast("Removed from Saved Headlines");
    } else {
      setBookmarkedArticles(prev => [...prev, id]);
      showToast("Saved headline for reference ✓");
    }
  };

  const handleFollowTopic = (topicName: string) => {
    if (followedTopics.includes(topicName)) {
      setFollowedTopics(prev => prev.filter(x => x !== topicName));
      showToast(`Unfollowed: ${topicName}`);
    } else {
      setFollowedTopics(prev => [...prev, topicName]);
      showToast(`Following: ${topicName} (Notified of emerging insights)`);
    }
  };

  const handleTogglePreferenceSector = (code: string) => {
    setMySectorPreferences(prev => {
      if (prev.includes(code)) {
        return prev.filter(x => x !== code);
      } else {
        return [...prev, code];
      }
    });
  };

  const handleSaveSectors = () => {
    setShowManageSectors(false);
    showToast("Preferences saved. Recalculating AI Headline Feed ✓");
  };

  const handleGenerateBrief = () => {
    setIsBriefGenerating(true);
    setTimeout(() => {
      setIsBriefGenerating(false);
      setGeneratedBriefText(
        `**AI Daily Curation Brief (My Sectors):**\n` +
        `1. **Biggest Development:** Local sovereign GPU guidelines mandate localized hosting setups.\n` +
        `2. **Biggest Business Impact:** Sourcing battery cells face pricing spikes, increasing pack CapEx by 14%.\n` +
        `3. **Biggest Announcement:** Health ministries standardizing generic pharma APIs.\n` +
        `4. **Emerging Trend:** Enterprise AI Agents gaining 72% positive momentum.\n` +
        `5. **Story to Watch Next:** Late Q3 double taxation treaty clearances on capital flows.`
      );
      showToast("Personalized AI brief generated ✓");
    }, 700);
  };

  const handleAskAi = (q: string) => {
    setAiChatQuery(q);
    setIsAiAnswering(true);
    setTimeout(() => {
      setIsAiAnswering(false);
      if (q.toLowerCase().includes("technology")) {
        setAiChatResponse("Today's technology headlines are dominated by Indian sovereign GPU cloud guidelines. Multinationals have started database migrations to remain compliant.");
      } else if (q.toLowerCase().includes("energy") || q.toLowerCase().includes("battery")) {
        setAiChatResponse("Automotive battery margins are compressed due to an 18% sodium spot market price increase, driving alternative grid geometries standard updates.");
      } else {
        setAiChatResponse("AI analysis shows high priorities in technology GPU mandates (+14% CapEx risks) and pharma standardizations (+12h clearance times).");
      }
    }, 550);
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryText.trim()) return;

    showToast(`Lead captured in CRM system for ${enquiryCompany} ✓ (ID: IGEN-AI-${Math.floor(1000 + Math.random() * 9000)})`);
    setEnquiryCompany(null);
    setEnquiryText("");
  };

  // Filter headlines based on user sector preferences + filter parameters
  const filteredArticles = MOCK_AI_ARTICLES.filter(art => {
    // Sector preferences boundary check (My Sectors)
    const matchesUserPrefs = mySectorPreferences.includes(art.sectorCode);

    // Search query filter
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Dropdown filters
    const matchesSector = selectedSectorFilter === "all" || art.sectorName.toLowerCase().includes(selectedSectorFilter.toLowerCase());
    const matchesGeography = selectedGeographyFilter === "all" || art.country.toLowerCase().includes(selectedGeographyFilter.toLowerCase());
    const matchesImportance = selectedImportanceFilter === "all" || art.importance === selectedImportanceFilter;

    return matchesUserPrefs && matchesSearch && matchesSector && matchesGeography && matchesImportance;
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
        <span>Headlines</span>
        <ChevronRight className="h-3 w-3" />
        <span>IGEN AI Editor</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-blue-500 font-bold">My Sector</span>
      </nav>

      {/* ─── Premium Editorial Hero ─── */}
      <header className="mx-auto max-w-7xl px-4 pt-6 pb-4 lg:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Cpu className="h-3 w-3 animate-pulse" /> AI EDITOR
              </span>
              <span className="bg-slate-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-[9px] font-bold px-2 py-0.5 rounded font-mono">
                My Sectors Enabled ({mySectorPreferences.length} active)
              </span>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              AI Headlines for My Sectors
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
              AI-curated business headlines, important developments and intelligence from the sectors you follow.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <button 
              onClick={() => setShowManageSectors(true)}
              className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-gray-850 hover:bg-gray-100 text-gray-700 dark:text-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-3xs"
            >
              <Briefcase className="h-4 w-4 text-blue-500" /> Manage My Sectors
            </button>
            <Link 
              href="/en/news-poc/headlines/ai-editor/all"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10"
            >
              Explore All Sectors
            </Link>
          </div>
        </div>

        {/* Curation Search & Filters Bar */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search AI headlines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
            {/* Importance filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900/60 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
              <Filter className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={selectedImportanceFilter}
                onChange={(e) => setSelectedImportanceFilter(e.target.value)}
                className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer font-sans"
              >
                <option value="all">Importance Level</option>
                <option value="Critical">Critical Only</option>
                <option value="High">High / Critical</option>
                <option value="Medium">Medium Priority</option>
              </select>
            </div>

            {/* Geography filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900/60 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
              <Globe className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={selectedGeographyFilter}
                onChange={(e) => setSelectedGeographyFilter(e.target.value)}
                className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer font-sans"
              >
                <option value="all">All Geographies</option>
                <option value="India">India</option>
                <option value="Germany">Germany</option>
                <option value="UAE">UAE</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* ─── My Sectors Selector chips strip ─── */}
      <section className="mx-auto max-w-7xl px-4 pt-2 lg:px-6">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2 mb-4">
          <h3 className="font-display text-xs font-bold text-gray-400 uppercase tracking-widest">My Active Sectors</h3>
          <button onClick={() => setShowManageSectors(true)} className="text-[10px] font-bold text-blue-500 hover:underline uppercase">Manage</button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1.5">
          <button 
            onClick={() => setSelectedSectorFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
              selectedSectorFilter === "all"
                ? "bg-blue-600 border-blue-600 text-white shadow-3xs"
                : "bg-white border-gray-200 dark:bg-[#0f172a] dark:border-gray-850 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
            }`}
          >
            All My Sectors ({mySectorPreferences.length})
          </button>
          
          {mySectorPreferences.map(code => {
            const secInfo = IGEN_50_SECTORS.find(s => s.code === code);
            if (!secInfo) return null;
            
            return (
              <button
                key={code}
                onClick={() => setSelectedSectorFilter(secInfo.name)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap border flex items-center gap-1.5 ${
                  selectedSectorFilter === secInfo.name
                    ? "bg-blue-600 border-blue-600 text-white shadow-3xs"
                    : "bg-white border-gray-200 dark:bg-[#0f172a] dark:border-gray-850 text-gray-600 dark:text-gray-300 hover:bg-gray-100"
                }`}
              >
                <span>{secInfo.icon}</span>
                <span>{secInfo.name.split(" & ")[0]}</span>
              </button>
            );
          })}
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
          {/* ─── AI Editor's Top Picks ─── */}
          {filteredArticles.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
                <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                  AI Editor's Top Picks
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.slice(0, 2).map((story) => (
                  <div key={story.id} className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[280px] flex flex-col justify-end p-6 border border-slate-900 shadow-sm group">
                    <div 
                      className="absolute inset-0 z-0 bg-cover bg-center group-hover:scale-102 transition-transform duration-350"
                      style={{ backgroundImage: `url(${story.image})` }}
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
                    
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                      <span className={`text-white text-[9px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs ${
                        story.importance === "Critical" ? "bg-red-600/90" : "bg-blue-600/90"
                      }`}>
                        AI Importance: {story.importance}
                      </span>
                    </div>

                    <div className="relative z-10 space-y-2 max-w-xl font-sans">
                      <div className="flex items-center gap-2 flex-wrap text-[9px]">
                        <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          AI EDITOR'S PICK
                        </span>
                        {story.breaking && (
                          <span className="bg-red-600 text-white font-extrabold px-1.5 py-0.5 rounded tracking-wide font-mono uppercase">
                            BREAKING
                          </span>
                        )}
                        <span className="text-slate-350">{story.country} • {story.date}</span>
                      </div>
                      
                      <h4 className="font-display text-base md:text-lg font-bold leading-tight text-[#FEC970] group-hover:text-blue-400 transition-colors">
                        {story.title}
                      </h4>
                      <p className="text-slate-300 text-[11px] font-normal leading-relaxed line-clamp-2">
                        "{story.aiSummary}"
                      </p>

                      <div className="flex items-center gap-3 pt-2">
                        <Link 
                          href={`/en/news-poc/article/${story.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-[9.5px] font-bold px-4 py-2 rounded-xl transition-all uppercase tracking-wider text-center"
                        >
                          Read Story →
                        </Link>
                        <button 
                          onClick={() => handleBookmark(story.id)}
                          className={`h-8 w-8 flex items-center justify-center rounded-xl border transition-colors ${
                            bookmarkedArticles.includes(story.id)
                              ? "bg-amber-500 border-amber-500 text-gray-950"
                              : "border-white/30 text-white hover:bg-white/10"
                          }`}
                        >
                          <Bookmark className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}



          {/* ─── Main Two-Column Layout ─── */}
          <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* ── LEFT COLUMN: Latest AI Headlines feed & widgets ── */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Section Header */}
                <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Latest AI Headlines
                    </h2>
                    <span className="text-[10px] text-gray-400 block font-normal">Real-time AI-curated compliance updates and trade reports.</span>
                  </div>
                </div>

                {/* Main feed cards */}
                {filteredArticles.length > 0 ? (
                  <div className="space-y-4">
                    {filteredArticles.map((story) => (
                      <div 
                        key={story.id} 
                        className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-sm hover:border-blue-500/35 transition-all group"
                      >
                        <div className="flex gap-4">
                          <div className="h-16 w-16 md:h-20 md:w-20 rounded-lg overflow-hidden bg-gray-150 shrink-0 relative">
                            <img 
                              src={story.image} 
                              alt={story.title} 
                              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>

                          <div className="flex-1 space-y-1.5">
                            <div className="flex justify-between items-center text-[9px] font-bold">
                              <span className={`text-[8px] font-mono px-2 py-0.5 rounded ${
                                story.importance === "Critical" 
                                  ? "bg-red-50 text-red-600 dark:bg-red-950/20 dark:text-red-400"
                                  : "bg-blue-50 text-blue-600 dark:bg-blue-955/20 dark:text-blue-400"
                              }`}>
                                {story.importance} Importance
                              </span>
                              <span className="text-blue-500">{story.sectorName}</span>
                            </div>

                            <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">
                              {story.title}
                            </h4>
                            
                            {/* AI Summary preview */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-2.5 rounded-lg border border-gray-100 dark:border-gray-850 text-[10px] space-y-1 font-normal leading-relaxed text-gray-650 dark:text-gray-400">
                              <span className="font-extrabold text-blue-500 block text-[8px] tracking-wider uppercase">AI-GENERATED SUMMARY</span>
                              <p>"{story.aiSummary}"</p>
                            </div>

                            <div className="flex justify-between items-center pt-2 text-[10px] flex-wrap gap-2">
                              <span className="text-gray-400 font-semibold">{story.country} • {story.date} • {story.readTime}</span>
                              
                              <div className="flex items-center gap-2">
                                <button 
                                  onClick={() => handleLike(story.id)}
                                  className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition-colors ${
                                    likedArticles.includes(story.id)
                                      ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20"
                                      : "text-gray-500 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                                  }`}
                                >
                                  {likedArticles.includes(story.id) ? "Liked ❤️" : "Like"}
                                </button>
                                <button 
                                  onClick={() => {
                                    setExpandedSummaryId(story.id);
                                    const summarySec = document.getElementById("summary-read-anchor");
                                    if (summarySec) summarySec.scrollIntoView({ behavior: "smooth" });
                                  }}
                                  className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900/60 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                                >
                                  30-Sec Curation →
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 p-12 rounded-3xl text-center space-y-3">
                    <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto animate-pulse" />
                    <p className="text-xs font-bold text-gray-500">No AI-curated headlines match your current filters right now.</p>
                    <button 
                      onClick={() => {
                        setSelectedSectorFilter("all");
                        setSelectedGeographyFilter("all");
                        setSelectedImportanceFilter("all");
                        setSearchQuery("");
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-4 py-2 rounded-xl transition-all"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}

                {/* ── AI Summary - Read in 30 Seconds ── */}
                <div id="summary-read-anchor" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="h-4 w-4 text-blue-500" /> Read the Story in 30 Seconds
                    </h3>
                    <span className="text-[8px] text-gray-400 font-mono">AI Curation</span>
                  </div>

                  {(() => {
                    const activeStory = MOCK_AI_ARTICLES.find(a => a.id === expandedSummaryId) || MOCK_AI_ARTICLES[0];
                    return (
                      <div className="space-y-4 text-xs font-semibold">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide block">Active Story: {activeStory.title}</span>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <span className="text-blue-500 block uppercase tracking-wider text-[8px] font-extrabold">WHAT HAPPENED</span>
                            <p className="text-gray-600 dark:text-gray-400 font-normal leading-relaxed">{activeStory.whyItMatters.whatHappened}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-orange-500 block uppercase tracking-wider text-[8px] font-extrabold">WHY IT MATTERS</span>
                            <p className="text-gray-600 dark:text-gray-400 font-normal leading-relaxed">{activeStory.whyItMatters.whyItMattersText}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-purple-500 block uppercase tracking-wider text-[8px] font-extrabold">WHO IS AFFECTED</span>
                            <p className="text-gray-600 dark:text-gray-400 font-normal leading-relaxed">{activeStory.whyItMatters.whoIsAffected}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-emerald-500 block uppercase tracking-wider text-[8px] font-extrabold">WHAT'S NEXT</span>
                            <p className="text-gray-600 dark:text-gray-400 font-normal leading-relaxed">{activeStory.whyItMatters.whatsNext}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* ── Why This Matters (Business C-Suite Impact) ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Activity className="h-4 w-4 text-emerald-500" /> Why This Matters — C-Suite Impact
                    </h3>
                  </div>

                  {(() => {
                    const activeStory = MOCK_AI_ARTICLES.find(a => a.id === expandedSummaryId) || MOCK_AI_ARTICLES[0];
                    return (
                      <div className="space-y-3.5 text-xs font-semibold leading-relaxed">
                        <div className="border-l-2 border-emerald-500 pl-3 space-y-0.5">
                          <span className="text-[8px] text-emerald-600 dark:text-emerald-400 uppercase font-extrabold tracking-wider">Business Impact</span>
                          <p className="text-gray-700 dark:text-gray-400 font-normal">{activeStory.businessImpact}</p>
                        </div>
                        <div className="border-l-2 border-blue-500 pl-3 space-y-0.5">
                          <span className="text-[8px] text-blue-600 dark:text-blue-400 uppercase font-extrabold tracking-wider">Sector Impact</span>
                          <p className="text-gray-700 dark:text-gray-400 font-normal">{activeStory.sectorImpact}</p>
                        </div>
                        <div className="border-l-2 border-purple-500 pl-3 space-y-0.5">
                          <span className="text-[8px] text-purple-600 dark:text-purple-400 uppercase font-extrabold tracking-wider">Regional Impact</span>
                          <p className="text-gray-700 dark:text-gray-400 font-normal">{activeStory.regionalImpact}</p>
                        </div>
                        <div className="border-l-2 border-amber-500 pl-3 space-y-0.5">
                          <span className="text-[8px] text-amber-600 dark:text-amber-400 uppercase font-extrabold tracking-wider">Next Developments</span>
                          <p className="text-gray-700 dark:text-gray-400 font-normal">{activeStory.nextDevelopments}</p>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* ── Sector Highlights ── */}
                <div className="space-y-4 pt-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Sector Highlights
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                    {[
                      { name: "AI & Cyber Security", headlines: 42, devs: 8, trends: 3, breaking: 2, icon: "🤖" },
                      { name: "Energy & Sustainability", headlines: 31, devs: 6, trends: 4, breaking: 1, icon: "⚡" },
                      { name: "Health & Pharma", headlines: 24, devs: 5, trends: 2, breaking: 0, icon: "🏥" }
                    ].map((sec, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-2">
                        <div className="flex items-center gap-1.5 text-sm">
                          <span>{sec.icon}</span>
                          <span className="font-bold text-gray-900 dark:text-white text-xs">{sec.name.split(" & ")[0]}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 pt-2 border-t border-gray-50 dark:border-gray-800">
                          <div>
                            <span className="font-extrabold text-blue-500">{sec.headlines}</span> headlines
                          </div>
                          <div>
                            <span className="font-extrabold text-amber-500">{sec.devs}</span> major devs
                          </div>
                          <div>
                            <span className="font-extrabold text-purple-500">{sec.trends}</span> trends
                          </div>
                          <div>
                            <span className="font-extrabold text-red-500">{sec.breaking}</span> breaking
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN: Sidebar Curation Widgets ── */}
              <div className="space-y-6">
                
                {/* ── Manage My Sectors overlay triggers ── */}
                {showManageSectors && (
                  <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Manage Followed Sectors</h4>
                      <button onClick={() => setShowManageSectors(false)}><X className="h-4 w-4" /></button>
                    </div>
                    <div className="space-y-2 max-h-48 overflow-y-auto pl-1">
                      {IGEN_50_SECTORS.slice(0, 8).map(sec => (
                        <label key={sec.code} className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={mySectorPreferences.includes(sec.code)}
                            onChange={() => handleTogglePreferenceSector(sec.code)}
                            className="rounded text-blue-600 border-gray-300 dark:border-gray-800 focus:ring-blue-500"
                          />
                          <span>{sec.icon} {sec.name}</span>
                        </label>
                      ))}
                    </div>
                    <button 
                      onClick={handleSaveSectors}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl text-xs uppercase"
                    >
                      Save Preferences
                    </button>
                  </div>
                )}

                {/* ── Emerging AI Signals widget ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Emerging AI Signals
                  </span>
                  
                  <div className="space-y-3.5 text-xs font-semibold">
                    {MOCK_TRENDS.map((sig, idx) => (
                      <div key={idx} className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <span className="font-bold text-gray-900 dark:text-white block">{sig.topic}</span>
                          <span className="text-[9px] text-gray-400 block font-normal">Sentiment: {sig.sentiment}</span>
                        </div>
                        <span className={`text-[8.5px] font-extrabold px-1.5 py-0.5 rounded font-mono uppercase ${
                          sig.state === "Accelerating" ? "bg-red-500/10 text-red-500" :
                          sig.state === "Emerging" ? "bg-blue-500/10 text-blue-500" :
                          "bg-emerald-500/10 text-emerald-500"
                        }`}>
                          {sig.state}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── AI Trend Radar Widget ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    AI Trend Radar
                  </span>
                  
                  <div className="space-y-2.5 text-xs font-semibold">
                    {[
                      { topic: "AI Sovereign Hosting", state: "Accelerating", val: 85 },
                      { topic: "Sodium chemistry cell", state: "Emerging", val: 68 },
                      { topic: "Standard generic APIs", state: "Stable", val: 52 }
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span>{row.topic}</span>
                          <span className="text-blue-500">{row.state}</span>
                        </div>
                        <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600" style={{ width: `${row.val}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── My Sector vs Global comparison ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    My Sector vs Global Importance
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    {[
                      { name: "AI Sovereign Hosting", mine: "Very High", global: "High" },
                      { name: "Alternative cell geometry", mine: "High", global: "Medium" }
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-gray-50 dark:border-gray-800/40 pb-2 last:border-0 last:pb-0">
                        <span className="text-gray-900 dark:text-white truncate max-w-[130px]">{row.name}</span>
                        <div className="flex gap-1.5 text-[9px] font-mono">
                          <span className="bg-blue-50 dark:bg-blue-950/20 text-blue-500 px-1 py-0.2 rounded font-bold">Pref: {row.mine}</span>
                          <span className="bg-gray-100 dark:bg-gray-900 text-gray-500 px-1 py-0.2 rounded font-bold">Global: {row.global}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── AI Daily Brief ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Your AI Daily Brief</h4>
                    <span className="bg-amber-500 text-slate-950 text-[7px] font-extrabold px-1 rounded font-mono">PRO</span>
                  </div>

                  {!generatedBriefText ? (
                    <div className="space-y-3 text-[10px] font-semibold text-gray-500">
                      <p className="leading-relaxed font-normal">Generate a 5-point curated executive brief from today's headlines across your followed sectors.</p>
                      <button 
                        onClick={handleGenerateBrief}
                        disabled={isBriefGenerating}
                        className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs disabled:opacity-50"
                      >
                        {isBriefGenerating ? "Generating Brief..." : "Generate My Brief"}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 text-[10px] font-semibold leading-relaxed">
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-150 dark:border-gray-800 text-gray-600 dark:text-gray-300 font-normal whitespace-pre-line">
                        {generatedBriefText}
                      </div>
                      <button 
                        onClick={() => setGeneratedBriefText(null)}
                        className="text-[9px] font-bold text-blue-500 hover:underline uppercase"
                      >
                        Reset Brief
                      </button>
                    </div>
                  )}
                </div>

                {/* ── Ask AI Chat Assistant Widget ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Ask AI About Today's Headlines
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    <div className="flex gap-1.5 flex-wrap">
                      {["What are the biggest technology developments today?", "Summarize battery headlines."].map((pq, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAskAi(pq)}
                          className="text-[9.5px] font-bold border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 px-2 py-1 rounded-lg text-left"
                        >
                          {pq}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-1.5 pt-1">
                      <input 
                        type="text" 
                        placeholder="Ask about compliance audits..."
                        value={aiChatQuery}
                        onChange={(e) => setAiChatQuery(e.target.value)}
                        className="flex-1 px-2.5 py-1.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-250 dark:border-gray-800 text-[10px] outline-none"
                      />
                      <button 
                        onClick={() => handleAskAi(aiChatQuery)}
                        disabled={isAiAnswering}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] px-3 rounded-lg"
                      >
                        Ask
                      </button>
                    </div>

                    {aiChatResponse && (
                      <div className="bg-blue-50/50 dark:bg-blue-950/15 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50 text-[10.5px] leading-relaxed text-gray-600 dark:text-gray-300 font-normal">
                        <strong>AI Response:</strong> {aiChatResponse}
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Companies Making Headlines ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Companies Making Headlines
                  </span>
                  
                  <div className="space-y-3.5">
                    {MOCK_COMPANIES.map((company, idx) => (
                      <div key={idx} className="space-y-1.5 text-xs font-semibold">
                        <div className="flex gap-2 items-center">
                          <div className="h-6 w-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-blue-600 rounded text-[10px] shrink-0 font-mono">
                            {company.logo}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-extrabold text-gray-905 dark:text-white text-xs">{company.name}</span>
                              {company.verified && <span className="text-blue-500 text-[10px]">✓</span>}
                            </div>
                            <span className="text-[8px] text-gray-400 block font-normal">{company.sector}</span>
                          </div>
                          <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold ml-auto shrink-0">{company.headlinesCount} headlines</span>
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

                {/* ── Leaders Making Headlines ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Leaders Making Headlines
                  </span>
                  
                  <div className="space-y-3 text-xs">
                    {MOCK_LEADERS.map((lead, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="font-bold text-gray-900 dark:text-white block hover:underline cursor-pointer">
                          {lead.name} • {lead.role}
                        </span>
                        <span className="text-[9px] text-gray-400 block font-normal">{lead.company} ({lead.sector})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── AI Topic Clusters ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    AI Topic Clusters
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    {MOCK_CLUSTERS.map((clus, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <div>
                          <span className="font-bold text-blue-600 dark:text-blue-400 block hover:underline cursor-pointer">
                            #{clus.topic.replace(/\s+/g, "")}
                          </span>
                          <span className="text-[9px] text-gray-400 block font-normal">
                            {clus.storiesCount} stories • {clus.expertOpinions} expert opinions
                          </span>
                        </div>
                        <button 
                          onClick={() => handleFollowTopic(clus.topic)}
                          className={`text-[8.5px] font-bold uppercase transition-colors px-1.5 py-0.5 rounded ${
                            followedTopics.includes(clus.topic)
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-300/35"
                              : "text-gray-400 hover:text-blue-500"
                          }`}
                        >
                          {followedTopics.includes(clus.topic) ? "Followed ✓" : "+ Follow"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Expert Reactions ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    What Experts Think
                  </span>
                  
                  <div className="space-y-3 text-xs">
                    {MOCK_EXPERTS.map((exp, idx) => (
                      <div key={idx} className="space-y-1">
                        <span className="font-bold text-gray-900 dark:text-white block">{exp.name} ({exp.org})</span>
                        <p className="text-[10px] text-gray-500 italic leading-snug font-normal">"{exp.opinion}"</p>
                      </div>
                    ))}
                  </div>
                </div>



                {/* ── Recommended Intelligence Reports ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-4 rounded-2xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Intelligence Reports</span>
                    <span className="text-amber-500 text-[7px] font-extrabold font-mono uppercase">Premium Report</span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <div className="h-8 w-8 bg-blue-600 text-white flex items-center justify-center font-bold text-xs rounded shrink-0">AI</div>
                    <div>
                      <span className="font-bold text-xs text-gray-900 dark:text-white block leading-tight">The Future of Enterprise AI — 2026</span>
                      <span className="text-[8px] text-gray-400 block font-normal">Strategic Sourcing projections</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => showToast("Downloading executive report...")}
                    className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white text-[9px] font-bold py-1.5 rounded uppercase"
                  >
                    View Report
                  </button>
                </div>

                {/* ── Sponsored AI Insights ── */}
                <div className="border border-blue-200/50 dark:border-blue-900/40 bg-blue-50/10 dark:bg-blue-900/5 p-4 rounded-xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/20">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Sponsored AI Insight</span>
                    <span className="bg-amber-500 text-gray-950 text-[7px] font-extrabold px-1.5 py-0.5 rounded font-mono">SPONSORED</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[8px] font-bold text-blue-500 uppercase">Sustainable Sourcing grids</span>
                    <h5 className="text-xs font-bold text-gray-905 dark:text-white leading-tight">Bilateral Hydrogen Infrastructure investments</h5>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-normal font-normal">
                      Learn how partnerships build carbon border offsets.
                    </p>
                  </div>
                  <button 
                    onClick={() => showToast("Opening sponsored panel...")}
                    className="w-full text-center border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors"
                  >
                    View Insight
                  </button>
                </div>

                {/* ── Advertisement banner slot ── */}
                <div className="bg-gray-100 dark:bg-gray-955/60 border border-gray-200 dark:border-gray-850 border-dashed p-4 rounded-2xl text-center space-y-1">
                  <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-widest">Advertisement</span>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">iGEN Ad Network · 300 × 250 Banner Slot</p>
                  <Link href="/eoi" className="text-[9px] font-bold text-blue-500 hover:underline block uppercase mt-1">Request Placement</Link>
                </div>

                {/* ── Newsletter signup brief ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Your AI News Brief
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    Get AI-curated headlines and important business developments from the sectors you follow.
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
                    <div className="bg-emerald-50 dark:bg-emerald-955/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Subscribed to AI News Brief!
                    </div>
                  )}
                </div>

              </div>

            </div>
          </section>
        </>
      )}

      {/* ─── CRM Lead Generation Modal ─── */}
      {enquiryCompany && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-3">
              <div>
                <h3 className="font-display text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold font-bold">
                  B2B Lead Enquiry Hub
                </h3>
                <span className="text-[10px] text-gray-400 block font-normal">Connect securely to {enquiryCompany} sales channel</span>
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

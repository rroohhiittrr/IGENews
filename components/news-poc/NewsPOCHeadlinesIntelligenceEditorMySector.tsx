"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sparkles, Share2, Lock, ChevronRight, Search, AlertTriangle, 
  CheckCircle, ThumbsUp, Bookmark, MessageCircle, ArrowLeft, X, HelpCircle, 
  TrendingUp, Globe, Filter, Star, Briefcase, Eye, ChevronDown, Check,
  Radio, ArrowUpRight, Flame, ShieldAlert, Cpu, Activity, Info, BarChart2,
  TrendingDown
} from "lucide-react";
import { IGEN_50_SECTORS } from "./igenTaxonomyData";

interface IntelligenceArticle {
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
  intelligenceType: "Market" | "Industry" | "Trade" | "Regulatory" | "Investment" | "Company" | "Leadership";
  executiveSummary: string;
  businessImpact: string;
  marketImpact: string;
  opportunitySignal: string;
  riskSignal: string;
  watchNext: string;
  image: string;
  companyName?: string;
  companyLogo?: string;
  topic: string;
  timeline: { dateStr: string; event: string }[];
}

interface SectorSnapshotItem {
  sectorName: string;
  updatesCount: number;
  developmentsCount: number;
  trendsCount: number;
  highImpactCount: number;
  icon: string;
  code: string;
}

interface OpportunityItem {
  title: string;
  category: "New Market" | "Investment" | "Supply-Chain" | "Export" | "Partnership" | "Tech Adoption";
  sector: string;
  market: string;
  whyItMatters: string;
  supportingIntel: string;
  premiumRequired: boolean;
}

interface WatchlistItem {
  category: "Regulatory Risk" | "Market Risk" | "Supply Chain Risk" | "Geopolitical" | "Competitive Pressure" | "Tech Disruption";
  sector: string;
  riskLevel: "HIGH ATTENTION" | "MEDIUM WATCH" | "STABLE";
  why: string;
}

const USER_SECTOR_PREFS = ["S02", "S17", "S23", "S41", "S45"];

const MOCK_INTELLIGENCE_ARTICLES: IntelligenceArticle[] = [
  {
    id: "intel-my-1",
    title: "Sovereign GPU Datacenter Regulations Trigger Corporate Relocation Audits",
    excerpt: "Sovereign AI mandates require database clusters to operate strictly within national transmission grids. Exporters evaluate secondary migration corridors to prevent audit fines.",
    sectorCode: "S02",
    sectorName: "AI & Cyber Security",
    country: "India-EU Hubs",
    date: "1 hr ago",
    readTime: "6 min read",
    likes: 120,
    comments: 24,
    shares: 42,
    views: 18500,
    importance: "Critical",
    intelligenceType: "Regulatory",
    executiveSummary: "National regulators enforce local storage rules on AI GPU architectures. Corporate nodes must shift training data workloads to prevent non-compliance audits.",
    businessImpact: "CTOs must deploy sovereign hosting cells, increasing operational capital expenditures by 14%.",
    marketImpact: "Drives direct demand spikes for localized datacenter real estate and private cleanroom equipment.",
    opportunitySignal: "Local host providers will secure rapid compliance-as-a-service market shares.",
    riskSignal: "Cross-border database transfers may face temporary clearance holds under CEPA.",
    watchNext: "Unified certification auditing rules go live next month.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    companyLogo: "NV",
    topic: "AI Regulation",
    timeline: [
      { dateStr: "Monday", event: "Regulatory commission issues local GPU database directives." },
      { dateStr: "Wednesday", event: "Cloud consortions release deployment timelines." },
      { dateStr: "Friday", event: "Enterprise boards launch relocation feasibility audits." }
    ]
  },
  {
    id: "intel-my-2",
    title: "Alternative Battery Geometry Sourcing Squeezed by Sodium Volatilities",
    excerpt: "Automotive cell builders face raw materials logistics constraints.Procurement leaders claim index variations compress green grid transport margins by 12%.",
    sectorCode: "S45",
    sectorName: "Automotive & Electric Vehicles",
    country: "Germany-Norway Lanes",
    date: "3 hrs ago",
    readTime: "5 min read",
    likes: 98,
    comments: 18,
    shares: 28,
    views: 14200,
    importance: "High",
    intelligenceType: "Market",
    executiveSummary: "Sodium battery feedstock indices registered an 18% spot price spike. Procurement departments are shifting cell geometries allocations to protect capital margins.",
    businessImpact: "EV manufacturing groups face increased cell pack development costs, slowing high-capacity trials.",
    marketImpact: "Drives alternative sodium-ion battery design research as a hedging buffer.",
    opportunitySignal: "Bilateral supply-chains securing raw sodium mining corridors gain premium margins.",
    riskSignal: "Bilateral grid dependencies on single-source mining locations increase logistical bottlenecks.",
    watchNext: "Bilateral cell standardization guidelines will be published next week.",
    image: "https://images.unsplash.com/photo-1558441719-ff34b0524a24?w=800&auto=format&fit=crop&q=80",
    companyName: "Tesla Logistics",
    companyLogo: "TL",
    topic: "EV Battery Geometries",
    timeline: [
      { dateStr: "Monday", event: "Sodium spot market lists 18% pricing spikes." },
      { dateStr: "Tuesday", event: "Automotive assembly consortia hold emergency session." }
    ]
  },
  {
    id: "intel-my-3",
    title: "Standardized Generic Formulation Registries Slices Transit Customs Delays",
    excerpt: "Health departments implement unified API public rails to track bulk chemicals. Sourcing brokers report customs clearance periods dropping to 12 hours.",
    sectorCode: "S23",
    sectorName: "Health & Family Welfare & Pharma",
    country: "India-Germany",
    date: "6 hrs ago",
    readTime: "7 min read",
    likes: 84,
    comments: 12,
    shares: 19,
    views: 9800,
    importance: "High",
    intelligenceType: "Trade",
    executiveSummary: "Pharma logistics corridors adopt standardized API registry endpoints. Express customs clearing reduces inventory hold durations by 6 days.",
    businessImpact: "Generic drug formulators optimize cargo flow schedules, boosting shipping frequencies.",
    marketImpact: "Lowers transit insurance premium indexes for temperature-sensitive generic dispatches.",
    opportunitySignal: "Agile cold-chain shipping operators gain priority transport dispatch volumes.",
    riskSignal: "Strict API ledgers require real-time documentation updates, penalizing slow exporters.",
    watchNext: "Phase 2 tracing rules will require chemical feedstock origin tracking logs.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80",
    companyName: "EcoHydro Power",
    companyLogo: "EH",
    topic: "Pharma Sourcing Tariffs",
    timeline: []
  }
];

const MOCK_SNAPSHOTS: SectorSnapshotItem[] = [
  { sectorName: "AI & Cyber Security", updatesCount: 28, developmentsCount: 7, trendsCount: 4, highImpactCount: 3, icon: "🤖", code: "S02" },
  { sectorName: "Energy & Sustainability", updatesCount: 21, developmentsCount: 5, trendsCount: 2, highImpactCount: 1, icon: "⚡", code: "S17" },
  { sectorName: "Healthcare & Pharma", updatesCount: 18, developmentsCount: 4, trendsCount: 3, highImpactCount: 0, icon: "🏥", code: "S23" }
];

const MOCK_OPPORTUNITIES: OpportunityItem[] = [
  { title: "Sovereign Hosting Curation", category: "New Market", sector: "AI & Cyber Security", market: "India-EU Hubs", whyItMatters: "Compliance mandates trigger 14% cap-ex database migration runs.", supportingIntel: "Sovereign GPU Datacenter Regulations Trigger Relocation Audits", premiumRequired: false },
  { title: "Alternative Sourcing Nodes", category: "Supply-Chain", sector: "EV Battery Geometries", market: "Germany-Norway", whyItMatters: "Sourcing alternative cell pack chemistry offsets raw metal margins.", supportingIntel: "Alternative Battery Geometry Sourcing Squeezed", premiumRequired: true }
];

const MOCK_WATCHLIST: WatchlistItem[] = [
  { category: "Regulatory Risk", sector: "AI & Cyber Security", riskLevel: "HIGH ATTENTION", why: "GPU local data storage bounds mandate immediate training workload shifts." },
  { category: "Market Risk", sector: "Automotive & Electric Vehicles", riskLevel: "MEDIUM WATCH", why: "Raw sodium feedstock spot spikes by 18% squeeze pack development budgets." }
];

const MOCK_COMPANIES = [
  { name: "NVIDIA", logo: "NV", sector: "AI & Semiconductors", verified: true, developmentsCount: 14, latestStory: "Sovereign GPU Datacenter Regulations Trigger Relocation Audits", trend: "Upward" },
  { name: "Tesla Logistics", logo: "TL", sector: "Automotive & EVs", verified: true, developmentsCount: 8, latestStory: "Alternative Battery Geometry Sourcing Squeezed", trend: "Stable" }
];

const MOCK_LEADERS = [
  { name: "Jensen Huang", role: "CEO", company: "NVIDIA", sector: "AI & Semiconductors", latestHeadline: "Sovereign GPU Datacenter Regulations Trigger Relocation Audits" },
  { name: "Elon Musk", role: "Technologist", company: "Tesla Logistics", sector: "Automotive & EV", latestHeadline: "Alternative Battery Geometry Sourcing Squeezed" }
];

const MOCK_REPORTS = [
  { title: "Bilateral Trade Compliance Manual", sector: "BFSI & Finance", type: "Trade Manual", desc: "Sourcing guide mapping carbon tax compliance timelines and grid clearances.", date: "Aug 2026", premium: true },
  { title: "Enterprise Sovereign AI Outlook 2026", sector: "AI & Cyber Security", type: "Market Outlook", desc: "Detailed analysis of GPU hosting regulations and C-suite relocation grids.", date: "July 2026", premium: false }
];

const MOCK_EXPERTS = [
  { name: "Dr. Aris Thorne", org: "AI Policy Alliance", recommendation: "Exporters must establish local hosting cells before late Q3 audits go live.", relatedIntel: "Sovereign GPU Datacenter Regulations Relocation Audits" },
  { name: "Elena Rostova", org: "Automotive Grid Council", recommendation: "We advise procurement leads to raise sodium geometry buffer targets by 4% to shield operations.", relatedIntel: "Alternative Battery Geometry Sourcing Squeezed" }
];

export default function NewsPOCHeadlinesIntelligenceEditorMySector({ onBack }: Props) {
  // Sector Preference state
  const [mySectorPreferences, setMySectorPreferences] = useState<string[]>(USER_SECTOR_PREFS);
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("all");
  const [selectedGeographyFilter, setSelectedGeographyFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Interactive UI states
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);

  // Features
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

  // Expanded intelligence card ID
  const [expandedIntelId, setExpandedIntelId] = useState<string>("intel-my-1");

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
  }, [selectedSectorFilter, selectedTypeFilter, selectedGeographyFilter]);

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
      showToast("Liked intelligence report! ❤️");
    }
  };

  const handleBookmark = (id: string) => {
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles(prev => prev.filter(x => x !== id));
      showToast("Removed from Saved Intelligence");
    } else {
      setBookmarkedArticles(prev => [...prev, id]);
      showToast("Saved report to intelligence briefcase ✓");
    }
  };

  const handleFollowTopic = (topicName: string) => {
    if (followedTopics.includes(topicName)) {
      setFollowedTopics(prev => prev.filter(x => x !== topicName));
      showToast(`Unfollowed: ${topicName}`);
    } else {
      setFollowedTopics(prev => [...prev, topicName]);
      showToast(`Following: ${topicName} (Notified of major regulatory alerts)`);
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
    showToast("Preferences saved. Recalculating Intelligence Feed ✓");
  };

  const handleGenerateBrief = () => {
    setIsBriefGenerating(true);
    setTimeout(() => {
      setIsBriefGenerating(false);
      setGeneratedBriefText(
        `**Curated B2B Intelligence Brief (My Sectors):**\n` +
        `1. **Biggest Development:** Local sovereign GPU datacenters rules mandate database relocation.\n` +
        `2. **Biggest Opportunity:** Sourcing alternative sodium chemistry buffers shields developers from CapEx volatility.\n` +
        `3. **Biggest Risk:** Sodium cell raw material pricing indices spiked by 18%.\n` +
        `4. **Major Company Movement:** NVIDIA local hosting partnerships launched.\n` +
        `5. **Emerging Trend:** Digital API registries slice generic pharmaceutical customs clearances to 12 hours.\n` +
        `6. **What to Watch Next:** Draft standard verification guidelines on cross-border logistics lanes.`
      );
      showToast("Personalized Intelligence Brief generated ✓");
    }, 700);
  };

  const handleAskAi = (q: string) => {
    setAiChatQuery(q);
    setIsAiAnswering(true);
    setTimeout(() => {
      setIsAiAnswering(false);
      if (q.toLowerCase().includes("risk")) {
        setAiChatResponse("AI analysis indicates critical regulatory risks in technology GPU localization audits, and raw sodium feedstock spot price volatility (+18% spikes) in automotive grids.");
      } else if (q.toLowerCase().includes("opportunity") || q.toLowerCase().includes("growth")) {
        setAiChatResponse("Emerging opportunities exist in compliance-as-a-service sovereign datacenters and cold-chain generic pharma distribution using standardized APIs.");
      } else {
        setAiChatResponse("Available intelligence shows high B2B impact points in technology databases migrations (+14% operational CapEx) and generic custom clearings (-6 days delays).");
      }
    }, 550);
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryText.trim()) return;

    showToast(`Lead captured in CRM system for ${enquiryCompany} ✓ (ID: IGEN-IN-${Math.floor(1000 + Math.random() * 9000)})`);
    setEnquiryCompany(null);
    setEnquiryText("");
  };

  // Filter intelligence articles based on preferences and filters parameters
  const filteredArticles = MOCK_INTELLIGENCE_ARTICLES.filter(art => {
    const matchesUserPrefs = mySectorPreferences.includes(art.sectorCode);

    // Search query filter
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Dropdown filters
    const matchesSector = selectedSectorFilter === "all" || art.sectorName.toLowerCase().includes(selectedSectorFilter.toLowerCase());
    const matchesGeography = selectedGeographyFilter === "all" || art.country.toLowerCase().includes(selectedGeographyFilter.toLowerCase());
    const matchesType = selectedTypeFilter === "all" || art.intelligenceType === selectedTypeFilter;

    return matchesUserPrefs && matchesSearch && matchesSector && matchesGeography && matchesType;
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
        <span>IGEN Intelligence Editor</span>
        <ChevronRight className="h-3 w-3" />
        <span className="text-blue-500 font-bold">My Sector</span>
      </nav>

      {/* ─── Premium Intelligence Hero ─── */}
      <header className="mx-auto max-w-7xl px-4 pt-6 pb-4 lg:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <BarChart2 className="h-3.5 w-3.5" /> IGEN INTELLIGENCE EDITOR
              </span>
              <span className="bg-slate-200 dark:bg-slate-800 text-gray-700 dark:text-gray-300 text-[9px] font-bold px-2 py-0.5 rounded font-mono">
                My Sectors Enabled ({mySectorPreferences.length} active)
              </span>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Intelligence for My Sectors
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
              Stay ahead with curated market intelligence, industry developments, expert perspectives, emerging opportunities and business risks across the sectors you follow.
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
              href="/en/news-poc/headlines/intelligence-editor/all"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10"
            >
              Explore All Sectors
            </Link>
          </div>
        </div>

        {/* Intelligence Filters Bar */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search B2B intelligence..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
            {/* Intelligence Type Filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900/60 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
              <Filter className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={selectedTypeFilter}
                onChange={(e) => setSelectedTypeFilter(e.target.value)}
                className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer font-sans"
              >
                <option value="all">Intelligence Type</option>
                <option value="Regulatory">Regulatory Intelligence</option>
                <option value="Market">Market Curation</option>
                <option value="Trade">Trade & Customs</option>
                <option value="Investment">Investment Curation</option>
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
                <option value="all">Global Geography</option>
                <option value="India">India</option>
                <option value="Germany">Germany-Norway</option>
                <option value="UAE">UAE</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* ─── My Sectors Selector chips strip ─── */}
      <nav className="mx-auto max-w-7xl px-4 pt-2 lg:px-6">
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
      </nav>

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
          {/* ─── Intelligence Editor's Top Picks ─── */}
          {filteredArticles.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
                <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                  Intelligence Editor's Top Picks
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
                        <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          {story.intelligenceType} Intelligence
                        </span>
                        <span className="text-slate-350">{story.country} • {story.date}</span>
                      </div>
                      
                      <h4 className="font-display text-base md:text-lg font-bold leading-tight text-[#FEC970] group-hover:text-blue-400 transition-colors">
                        {story.title}
                      </h4>
                      
                      <div className="bg-slate-950/70 p-2.5 rounded-lg border border-white/10 text-[10px] space-y-1 font-normal leading-relaxed text-slate-300">
                        <span className="text-emerald-400 font-bold block text-[8px] uppercase tracking-wider">Business Impact</span>
                        <p>"{story.businessImpact}"</p>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <Link 
                          href={`/en/news-poc/article/${story.id}`}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-[9.5px] font-bold px-4 py-2 rounded-xl transition-all uppercase tracking-wider text-center"
                        >
                          Read Intelligence →
                        </Link>
                        <button 
                          onClick={() => handleBookmark(story.id)}
                          className={`h-8 w-8 flex items-center justify-center rounded-xl border transition-colors ${
                            bookmarkedArticles.includes(story.id)
                              ? "bg-amber-500 border-amber-500 text-gray-955"
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
              
              {/* ── LEFT COLUMN: Latest Intelligence feed & snapshots ── */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Section Header */}
                <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Latest Intelligence
                    </h2>
                    <span className="text-[10px] text-gray-400 block font-normal">Personalized decision-support, regulatory audits, and CapEx forecasts.</span>
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
                              <span className="text-[8px] bg-blue-50 text-blue-600 dark:bg-blue-955/20 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                                {story.intelligenceType} Intel
                              </span>
                              <span className="text-blue-500">{story.sectorName}</span>
                            </div>

                            <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">
                              {story.title}
                            </h4>
                            
                            {/* Intelligence Box */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-2.5 rounded-lg border border-gray-100 dark:border-gray-850 text-[10px] space-y-1 font-normal leading-relaxed text-gray-650 dark:text-gray-400">
                              <span className="font-extrabold text-blue-500 block text-[8px] tracking-wider uppercase">Executive Summary</span>
                              <p>"{story.executiveSummary}"</p>
                              <div className="pt-1.5 border-t border-gray-150 dark:border-gray-800 mt-1 text-[9.5px] font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                <Info className="h-3 w-3 text-emerald-500 shrink-0" />
                                <span><strong>Business Impact:</strong> {story.businessImpact}</span>
                              </div>
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
                                    setExpandedIntelId(story.id);
                                    const summarySec = document.getElementById("summary-read-anchor");
                                    if (summarySec) summarySec.scrollIntoView({ behavior: "smooth" });
                                  }}
                                  className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900/60 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors"
                                >
                                  C-Suite Curation →
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-12 rounded-3xl text-center space-y-3">
                    <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto animate-pulse" />
                    <p className="text-xs font-bold text-gray-500">No B2B intelligence matches your current preferences right now.</p>
                    <button 
                      onClick={() => {
                        setSelectedSectorFilter("all");
                        setSelectedGeographyFilter("all");
                        setSelectedTypeFilter("all");
                        setSearchQuery("");
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] px-4 py-2 rounded-xl transition-all"
                    >
                      Reset Filters
                    </button>
                  </div>
                )}

                {/* ── My Sector Snapshot ── */}
                <div className="space-y-4 pt-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      My Sector Snapshot
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-semibold">
                    {MOCK_SNAPSHOTS.map((sec, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-2">
                        <div className="flex items-center gap-1.5 text-sm">
                          <span>{sec.icon}</span>
                          <span className="font-bold text-gray-900 dark:text-white text-xs">{sec.sectorName.split(" & ")[0]}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 pt-2 border-t border-gray-50 dark:border-gray-800">
                          <div>
                            <span className="font-extrabold text-blue-500">{sec.updatesCount}</span> updates
                          </div>
                          <div>
                            <span className="font-extrabold text-amber-500">{sec.developmentsCount}</span> major devs
                          </div>
                          <div>
                            <span className="font-extrabold text-purple-500">{sec.trendsCount}</span> trends
                          </div>
                          <div>
                            <span className="font-extrabold text-red-500">{sec.highImpactCount}</span> high-impact
                          </div>
                        </div>
                        <Link 
                          href={`/en/news-poc/sector/${sec.code}`}
                          className="text-[9px] font-bold text-blue-500 hover:underline uppercase block pt-1 border-t border-gray-55 dark:border-gray-800/40"
                        >
                          Explore Sector Curation →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Market Snapshot ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <BarChart2 className="h-4 w-4 text-blue-500" /> Market Snapshot
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { title: "Bilateral CAPEX index", metric: "+14.2% CapEx", desc: "Grid connectivity investments", up: true },
                      { title: "Generic customs clearing", metric: "12 Hours", desc: "Digital rails acceleration", up: false },
                      { title: "Sodium spot materials", metric: "+18% Sourcing cost", desc: "Feedstock volatilities", up: true }
                    ].map((row, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-150 dark:border-gray-850">
                        <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-wider">{row.title}</span>
                        <span className="text-xs font-extrabold text-gray-905 dark:text-white block mt-1.5">{row.metric}</span>
                        <p className="text-[8px] text-gray-400 mt-1 font-normal leading-tight">{row.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── What's Changing in followed sectors ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    What's Changing in My Sectors
                  </span>
                  
                  <div className="space-y-3.5 text-xs font-semibold">
                    {[
                      { sector: "AI & Cyber Security", state: "Rising", signal: "Sovereign local database migration runs", up: true },
                      { sector: "EV Battery Geometries", state: "Rising", signal: "Sodium raw feedstock index spikes by 18%", up: true },
                      { sector: "Health & Generic Pharma", state: "Declining", signal: "Custom clearing delays drop by 6 days", up: false }
                    ].map((row, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div className="space-y-0.5">
                          <span className="font-bold text-gray-900 dark:text-white block">{row.sector}</span>
                          <span className="text-[10px] text-gray-400 block font-normal">{row.signal}</span>
                        </div>
                        <span className={`text-[9px] font-extrabold font-mono uppercase px-2 py-0.5 rounded ${
                          row.up ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                        }`}>
                          {row.state}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Emerging Opportunities ── */}
                <div className="space-y-4 pt-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Emerging Opportunities
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
                    {MOCK_OPPORTUNITIES.map((opp, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs flex flex-col justify-between min-h-[140px]">
                        <div className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 text-[8px] font-bold px-2 py-0.5 rounded font-mono uppercase">
                              {opp.category}
                            </span>
                            {opp.premiumRequired && <span className="bg-amber-500 text-gray-950 text-[7px] font-extrabold px-1 rounded font-mono">PRO</span>}
                          </div>
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight mt-2">{opp.title}</h4>
                          <p className="text-[9px] text-gray-400 font-normal leading-normal">{opp.whyItMatters}</p>
                        </div>
                        <div className="pt-2 border-t border-gray-50 dark:border-gray-800 mt-2 text-[10px] flex justify-between items-center">
                          <span className="text-gray-400 font-semibold">{opp.sector}</span>
                          <Link href="/eoi" className="text-blue-500 hover:underline uppercase text-[9px] font-bold">Explore →</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Sector Watchlist ── */}
                <div className="bg-[#E63946]/5 border border-red-500/10 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 border-b border-red-500/10 pb-2">
                    <ShieldAlert className="h-4 w-4 animate-pulse" />
                    <h3 className="font-display text-xs font-bold uppercase tracking-widest">Sector Watchlist</h3>
                  </div>
                  <div className="space-y-3">
                    {MOCK_WATCHLIST.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start gap-4 text-xs font-semibold">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="bg-red-500 text-white text-[7px] font-mono px-1 py-0.2 rounded uppercase">{item.riskLevel}</span>
                            <span className="text-[10px] text-gray-400">{item.sector}</span>
                          </div>
                          <span className="text-gray-900 dark:text-white block leading-snug">{item.why}</span>
                        </div>
                        <button onClick={() => showToast("Loading risk audit details...")} className="text-red-500 hover:underline uppercase text-[9.5px] font-bold shrink-0">View →</button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN: Sidebar Intelligence Widgets ── */}
              <div className="space-y-6">
                
                {/* ── B2B Decision C-Suite Panel (Understand in 30s expanded) ── */}
                <div id="summary-read-anchor" className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="h-4 w-4 text-blue-500" /> Understand the Story in 30 Seconds
                    </h3>
                  </div>

                  {(() => {
                    const activeStory = MOCK_INTELLIGENCE_ARTICLES.find(a => a.id === expandedIntelId) || MOCK_INTELLIGENCE_ARTICLES[0];
                    return (
                      <div className="space-y-4 text-xs font-semibold leading-relaxed">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide block">Active Curation: {activeStory.title}</span>
                        
                        <div className="space-y-3">
                          <div className="space-y-0.5">
                            <span className="text-blue-500 block uppercase tracking-wider text-[8px] font-extrabold">WHAT HAPPENED</span>
                            <p className="text-gray-600 dark:text-gray-400 font-normal">{activeStory.executiveSummary}</p>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-orange-500 block uppercase tracking-wider text-[8px] font-extrabold">WHY IT MATTERS</span>
                            <p className="text-gray-600 dark:text-gray-400 font-normal">{activeStory.businessImpact}</p>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-purple-500 block uppercase tracking-wider text-[8px] font-extrabold">WHAT IS CHANGING</span>
                            <p className="text-gray-600 dark:text-gray-400 font-normal">{activeStory.marketImpact}</p>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-red-500 block uppercase tracking-wider text-[8px] font-extrabold">WHAT ARE THE RISKS & OPPORTUNITIES</span>
                            <p className="text-gray-600 dark:text-gray-400 font-normal">Risks: {activeStory.riskSignal} • Opportunities: {activeStory.opportunitySignal}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* ── Compare My Sectors table ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Compare My Sectors
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    <div className="grid grid-cols-4 text-[8px] text-gray-400 uppercase font-extrabold pb-1 border-b border-gray-100 dark:border-gray-800">
                      <span>Sector</span>
                      <span className="text-center">Activity</span>
                      <span className="text-center">Signal</span>
                      <span className="text-right">Risk</span>
                    </div>

                    {[
                      { name: "AI & Cyber", act: "High", sig: "↑", risk: "Med" },
                      { name: "Energy & Utilities", act: "Med", sig: "↑", risk: "Low" },
                      { name: "Pharma", act: "High", sig: "→", risk: "Med" }
                    ].map((row, idx) => (
                      <div key={idx} className="grid grid-cols-4 items-center text-[10px] py-1 border-b border-gray-50 dark:border-gray-800/40 last:border-0 last:pb-0">
                        <span className="font-bold truncate">{row.name.split(" & ")[0]}</span>
                        <span className="text-center text-gray-500">{row.act}</span>
                        <span className="text-center text-blue-500 font-bold">{row.sig}</span>
                        <span className="text-right text-gray-550">{row.risk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Country / Market Impact Node lists ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Where Is It Happening?
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    {[
                      { name: "India", activity: "High Activity", flag: "🇮🇳" },
                      { name: "USA", activity: "High Activity", flag: "🇺🇸" },
                      { name: "Germany", activity: "Medium Activity", flag: "🇩🇪" },
                      { name: "Japan", activity: "Rising", flag: "🇯🇵" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-gray-50 dark:border-gray-800/40 pb-2 last:border-0 last:pb-0">
                        <span className="text-gray-905 dark:text-white flex items-center gap-1.5">
                          <span>{item.flag}</span>
                          <span>{item.name}</span>
                        </span>
                        <span className="text-[9.5px] text-blue-500">{item.activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Companies to Watch ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Companies to Watch
                  </span>
                  
                  <div className="space-y-3.5">
                    {MOCK_COMPANIES.map((company, idx) => (
                      <div key={idx} className="space-y-1.5 text-xs font-semibold">
                        <div className="flex gap-2 items-center">
                          <div className="h-6 w-6 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-955/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-blue-600 rounded text-[10px] shrink-0 font-mono">
                            {company.logo}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="font-extrabold text-gray-900 dark:text-white text-xs">{company.name}</span>
                              {company.verified && <span className="text-blue-500 text-[10px]">✓</span>}
                            </div>
                            <span className="text-[8px] text-gray-400 block font-normal">{company.sector}</span>
                          </div>
                          <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold ml-auto shrink-0">{company.developmentsCount} developments</span>
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

                {/* ── Leaders to Watch ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Leaders to Watch
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

                {/* ── Expert Recommendations ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Expert Recommendations
                  </span>
                  
                  <div className="space-y-3 text-xs">
                    {MOCK_EXPERTS.map((exp, idx) => (
                      <div key={idx} className="space-y-1.5 border-b border-gray-50 dark:border-gray-800/40 pb-2 last:border-0 last:pb-0">
                        <span className="font-bold text-gray-900 dark:text-white block leading-snug">{exp.name} ({exp.org})</span>
                        <p className="text-[10.5px] text-gray-550 dark:text-gray-400 italic leading-snug font-normal">"{exp.recommendation}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── My Daily Intelligence Brief ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">My Daily Intelligence Brief</h4>
                    <span className="bg-amber-500 text-slate-950 text-[7px] font-extrabold px-1 rounded font-mono">PRO</span>
                  </div>

                  {!generatedBriefText ? (
                    <div className="space-y-3 text-[10px] font-semibold text-gray-500">
                      <p className="leading-relaxed font-normal">Generate a 6-point curated B2B intelligence brief from today's active reporting lists.</p>
                      <button 
                        onClick={handleGenerateBrief}
                        disabled={isBriefGenerating}
                        className="w-full bg-[#1E3A5F] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs disabled:opacity-50"
                      >
                        {isBriefGenerating ? "Generating Brief..." : "Read Full Brief"}
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

                {/* ── Ask Intelligence AI chat Widget ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Ask Intelligence AI
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    <div className="flex gap-1.5 flex-wrap">
                      {["What are the biggest risks in my sectors?", "Which sector has the strongest growth signals?"].map((pq, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAskAi(pq)}
                          className="text-[9.5px] font-bold border border-gray-205 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 px-2 py-1 rounded-lg text-left"
                        >
                          {pq}
                        </button>
                      ))}
                    </div>

                    <div className="flex gap-1.5 pt-1">
                      <input 
                        type="text" 
                        placeholder="Ask about active opportunities..."
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
                      <div className="bg-blue-50/50 dark:bg-blue-955/15 p-3 rounded-lg border border-blue-100 dark:border-blue-900/50 text-[10.5px] leading-relaxed text-gray-655 dark:text-gray-300 font-normal">
                        <strong>AI Response:</strong> {aiChatResponse}
                      </div>
                    )}
                  </div>
                </div>

                {/* ── Timeline Widget ── */}
                {filteredArticles.length > 0 && filteredArticles[0].timeline.length > 0 && (
                  <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                      Intelligence Timeline
                    </span>
                    
                    <div className="space-y-3.5 text-xs">
                      {filteredArticles[0].timeline.map((step, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start">
                          <span className="bg-blue-50 dark:bg-blue-955/20 text-blue-500 text-[8.5px] font-bold px-1.5 py-0.5 rounded font-mono uppercase shrink-0">{step.dateStr}</span>
                          <span className="text-gray-600 dark:text-gray-400 leading-snug font-semibold">{step.event}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Recommended Intelligence Reports ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-4 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Recommended Intelligence Reports
                  </span>

                  <div className="space-y-3">
                    {MOCK_REPORTS.map((rep, idx) => (
                      <div key={idx} className="space-y-1.5 text-xs font-semibold border-b border-gray-50 dark:border-gray-800/40 pb-2 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900 dark:text-white line-clamp-1">{rep.title}</span>
                          {rep.premium && <span className="bg-amber-500 text-gray-950 text-[7px] font-extrabold px-1.5 py-0.2 rounded font-mono">PRO</span>}
                        </div>
                        <p className="text-[9px] text-gray-400 font-normal leading-normal">{rep.desc}</p>
                        <button 
                          onClick={() => showToast(`Downloading ${rep.title}...`)}
                          className="text-[9px] font-bold text-blue-500 hover:underline uppercase block"
                        >
                          View Report
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Premium Intelligence upgrade lock ── */}
                <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white border border-indigo-900/60 p-5 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-display text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Unlock Advanced Intelligence
                  </h4>
                  <p className="text-[10px] text-slate-300 leading-relaxed font-normal">
                    Secure institutional clearance to access full multi-sector policy radar grids, daily reports, and macro-financial briefings.
                  </p>
                  
                  <ul className="space-y-2 text-[10px] text-slate-350 font-semibold">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Full AI C-Suite Business impact audits
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Advanced multi-sector trend alerts
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" /> Exportable compliance intelligence reports
                    </li>
                  </ul>

                  <button 
                    onClick={() => showToast("Opening premium checkout flow...")}
                    className="w-full text-center bg-amber-500 hover:bg-amber-600 text-gray-955 font-bold text-xs py-2 rounded-xl transition-all uppercase tracking-wider"
                  >
                    Unlock Premium Intelligence
                  </button>
                </div>

                {/* ── Intelligence Alerts Configurator ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold">
                    Never Miss Important Intelligence
                  </h4>
                  
                  {!alertConfigured ? (
                    <div className="space-y-3 text-[10px] font-semibold">
                      <p className="text-gray-550 leading-relaxed font-normal">
                        Configure customized alert rules to receive push notifications when critical B2B intelligence is published about your sectors.
                      </p>
                      
                      <div className="space-y-1.5">
                        <span className="text-[8px] text-gray-400 uppercase font-bold">Importance Target</span>
                        <select 
                          value={alertThreshold}
                          onChange={(e) => setAlertThreshold(e.target.value)}
                          className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg text-xs outline-none"
                        >
                          <option value="Critical">Critical intelligence only</option>
                          <option value="High">High or Critical levels</option>
                          <option value="Medium">Medium & above</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => { setAlertConfigured(true); showToast(`Alert rule created for ${alertThreshold} priority reports ✓`); }}
                        className="w-full bg-[#1E3A5F] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                      >
                        Create Alert
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-955/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Intelligence Alert Activated Successfully!
                    </div>
                  )}
                </div>

                {/* ── Sponsored Research ── */}
                <div className="border border-blue-200/50 dark:border-blue-900/40 bg-blue-50/10 dark:bg-blue-900/5 p-4 rounded-xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-blue-200/20">
                    <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Sponsored Research</span>
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
                    className="w-full text-center border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors"
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
                    My Sector Intelligence Brief
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    Receive the most important intelligence from the sectors you follow.
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
                        className="w-full bg-[#1E3A5F] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                      >
                        Subscribe
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-955/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Subscribed to Sector Intelligence Brief!
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
                className="w-full bg-[#1E3A5F] hover:bg-[#152e4f] text-white font-bold py-2.5 rounded-xl transition-colors uppercase text-xs shadow-md shadow-blue-900/10"
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

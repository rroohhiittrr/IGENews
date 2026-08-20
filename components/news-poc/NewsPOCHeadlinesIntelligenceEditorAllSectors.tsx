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

interface IntelligenceArticle {
  id: string;
  title: string;
  excerpt: string;
  sectorCode: string;
  sectorName: string;
  country: string;
  region: string;
  date: string;
  readTime: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
  importance: "Critical" | "High" | "Medium";
  intelligenceType: "Market" | "Industry" | "Trade" | "Regulatory" | "Investment" | "Company" | "Leadership" | "Technology" | "Economic";
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

interface OpportunityItem {
  title: string;
  category: "Market Opportunity" | "Investment Opportunity" | "Export Opportunity" | "Import Opportunity" | "Partnership Opportunity" | "Supply Chain Opportunity" | "Technology Opportunity" | "Emerging Demand";
  sector: string;
  market: string;
  whyItMatters: string;
  supportingIntel: string;
  premiumRequired: boolean;
}

interface WatchlistItem {
  category: "Regulatory Risk" | "Market Risk" | "Supply Chain Risk" | "Geopolitical Risk" | "Economic Risk" | "Technology Disruption" | "Competitive Risk";
  sector: string;
  riskLevel: "HIGH ATTENTION" | "MEDIUM WATCH" | "STABLE";
  why: string;
}

const MOCK_GLOBAL_INTELLIGENCE: IntelligenceArticle[] = [
  {
    id: "intel-all-1",
    title: "Global Wafer Equipment Sourcing Rules Shift Assembly Capacities",
    excerpt: "Consortiums restrict legacy silicon packaging exports to non-treaty ports. Supply-chain executives deploy local buffers to mitigate clearance holds.",
    sectorCode: "S46",
    sectorName: "Semiconductors & OSAT",
    country: "Japan-Taiwan Hubs",
    region: "Asia-Pacific",
    date: "1 hr ago",
    readTime: "6 min read",
    likes: 210,
    comments: 48,
    shares: 88,
    views: 31000,
    importance: "Critical",
    intelligenceType: "Trade",
    executiveSummary: "Multilateral agencies implement strict export rules on wafer assembly equipment. Silicon packaging hubs seek local verification routes.",
    businessImpact: "Exporters face a 12% rise in equipment certification fees, compressing foundry margins.",
    marketImpact: "Drives equipment migration corridors towards alternative SEA packaging ports.",
    opportunitySignal: "Southeast Asian assembly ports capture critical priority allocation volumes.",
    riskSignal: "Single-source assembly configurations are highly exposed to regional regulatory blocks.",
    watchNext: "Standardized equipment tracking guidelines will be active in late Q3.",
    image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=800&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    companyLogo: "NV",
    topic: "Semiconductor Sourcing",
    timeline: [
      { dateStr: "Monday", event: "Wafer Export Council issues legacy packaging rules draft." },
      { dateStr: "Wednesday", event: "Bilateral ports release implementation guidelines." },
      { dateStr: "Friday", event: "Exporters restructure shipping corridors schedules." }
    ]
  },
  {
    id: "intel-all-2",
    title: "Sovereign AI GPU Datacenter Regulations Force Infrastructure Migrations",
    excerpt: "National regulatory bodies enforce database operations boundaries on offshore cloud hosting setups. Sourcing teams deploy private cells to prevent compliance audits.",
    sectorCode: "S02",
    sectorName: "AI & Cyber Security",
    country: "Multilateral Lanes",
    region: "Europe-APAC",
    date: "2 hrs ago",
    readTime: "5 min read",
    likes: 185,
    comments: 36,
    shares: 62,
    views: 28000,
    importance: "Critical",
    intelligenceType: "Regulatory",
    executiveSummary: "Regulatory directives mandate database clusters comply with localized national grid rules, driving infrastructure transitions.",
    businessImpact: "Tech groups must deploy sovereign database hosting cells, raising operational CapEx by 14%.",
    marketImpact: "Accelerates local data hosting real estate builds across India and EU.",
    opportunitySignal: "Agile local private hosting providers secure immediate B2B client pipelines.",
    riskSignal: "Transnational data flows face clearance suspensions under sovereign frameworks.",
    watchNext: "Phase 1 sovereign datacenter audits start in late Q3.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    companyLogo: "NV",
    topic: "AI Regulation",
    timeline: [
      { dateStr: "Tuesday", event: "Commission publishes local database storage boundaries." },
      { dateStr: "Thursday", event: "Enterprise cloud groups begin feasibility relocation studies." }
    ]
  },
  {
    id: "intel-all-3",
    title: "Bilateral Clean Hydrogen Port Linkages CapEx Subsidies Approved",
    excerpt: "Bilateral commissions authorize public grant formulas for pipeline grids. Sourcing leads project delivery cost indexes to drop 11%.",
    sectorCode: "S17",
    sectorName: "Energy & Sustainability",
    country: "Germany-Norway",
    region: "Europe",
    date: "4 hrs ago",
    readTime: "7 min read",
    likes: 154,
    comments: 29,
    shares: 44,
    views: 22000,
    importance: "High",
    intelligenceType: "Investment",
    executiveSummary: "Unified funding guidelines allocate CapEx support for bilateral hydrogen ports networks, driving clean energy infrastructure.",
    businessImpact: "Reduces initial project development risk metrics for private clean tech groups.",
    marketImpact: "Drives industrial hydrogen grid interconnections and pipeline expansion routes.",
    opportunitySignal: "Bilateral green credit carbon offsets are available for compliant developers.",
    riskSignal: "Complex pipeline routing clearances may delay grid integrations.",
    watchNext: "Bilateral transport tariff structures will be finalized next month.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80",
    companyName: "EcoHydro Power",
    companyLogo: "EH",
    topic: "Energy Transition Policy",
    timeline: []
  }
];

const MOCK_OPPORTUNITIES: OpportunityItem[] = [
  { title: "Sovereign Hosting Rails", category: "Market Opportunity", sector: "AI & Cyber Security", market: "Global", whyItMatters: "Compliance mandates drive 14% operational CapEx migrations.", supportingIntel: "Sovereign AI GPU Datacenter Regulations Force Migrations", premiumRequired: false },
  { title: "Bilateral Hydrogen CapEx", category: "Investment Opportunity", sector: "Clean Tech", market: "Germany-Norway", whyItMatters: "Bilateral funding grants lower initial development risk by 11%.", supportingIntel: "Bilateral Clean Hydrogen Port Linkages Subsidies Approved", premiumRequired: true }
];

const MOCK_RISKS: WatchlistItem[] = [
  { category: "Regulatory Risk", sector: "AI & Cyber Security", riskLevel: "HIGH ATTENTION", why: "GPU local data storage bounds mandate immediate training workload shifts." },
  { category: "Supply Chain Risk", sector: "Semiconductors & OSAT", riskLevel: "HIGH ATTENTION", why: "Legacy equipment export blocks restrict SEA packaging fab expansions." },
  { category: "Market Risk", sector: "Automotive & Electric Vehicles", riskLevel: "MEDIUM WATCH", why: "Raw sodium index spot variations compress green transport margins." }
];

const MOCK_COMPANIES = [
  { name: "NVIDIA", logo: "NV", sector: "AI & Semiconductors", verified: true, developmentsCount: 18, latestStory: "Global Wafer Equipment Sourcing Rules Shift Assembly Capacities", trend: "Upward" },
  { name: "EcoHydro Power", logo: "EH", sector: "Energy & Utilities", verified: true, developmentsCount: 9, latestStory: "Bilateral Clean Hydrogen Port Linkages Subsidies Approved", trend: "Upward" }
];

const MOCK_LEADERS = [
  { name: "Jensen Huang", role: "CEO", company: "NVIDIA", sector: "AI & Semiconductors", latestHeadline: "Global Wafer Equipment Sourcing Rules Shift Assembly Capacities" },
  { name: "Satoshi Yamamoto", role: "Logistics Advisor", company: "Consortium", sector: "Semiconductors", latestHeadline: "Global Wafer Equipment Sourcing Rules Shift Assembly" }
];

const MOCK_REPORTS = [
  { title: "Bilateral Trade Carbon Tax Compliance Manual", sector: "BFSI & Finance", type: "Trade Manual", region: "Europe", desc: "Detailed manual outlining carbon tariffs, compliance audits, and grid connectivity credits.", access: "Premium" },
  { title: "Global Enterprise AI Sovereign Hosting Outlook", sector: "AI & Cyber Security", type: "Outlook Report", region: "Global", desc: "Comprehensive review of GPU datacenters rules, C-suite compliance grids, and relocation costs.", access: "Enterprise" }
];

const MOCK_EXPERTS = [
  { name: "Dr. Aris Thorne", org: "AI Policy Forum", sector: "AI & Cyber Security", country: "Global", perspective: "Sovereign datacenter rules raise database relocation runs capital by 14% for multi-regional hosting models.", relatedIntel: "Sovereign AI GPU Datacenter Regulations Force Migrations" },
  { name: "Satoshi Yamamoto", org: "Wafer Policy Panel", sector: "Semiconductors", country: "Japan", perspective: "Legacy equipment sourcing restrictions will redirect raw wafer fabrication schedules to SEA corridors.", relatedIntel: "Global Wafer Equipment Sourcing Rules Shift Assembly" }
];

const MOCK_COUNTRIES_NEWS = [
  { country: "India", vol: "84K Intel Nodes", devs: 18, leadingSec: "Technology & AI", trend: "↑ Accelerating", latest: "Sovereign AI GPU Datacenter Regulations Force Migrations" },
  { country: "USA", vol: "92K Intel Nodes", devs: 24, leadingSec: "BFSI & Tech Fabs", trend: "→ Stable", latest: "Global Wafer Equipment Sourcing Rules Shift Assembly" },
  { country: "Germany", vol: "64K Intel Nodes", devs: 15, leadingSec: "Energy & sustainability", trend: "↑ Emerging", latest: "Bilateral Clean Hydrogen Port Linkages Subsidies Approved" }
];

const MOCK_REGIONS_NEWS = [
  { region: "Asia-Pacific", devs: 48, topSec: "Semiconductors & OSAT", opps: "Wafer fab capital redirections", risks: "Bilateral equipment export controls" },
  { region: "Europe", devs: 35, topSec: "Energy Transition", opps: "Subsidized pipeline linkages", risks: "Regulatory carbon tax bounds" },
  { region: "North America", devs: 42, topSec: "AI & BFSI Hosting", opps: "Sovereign cluster certifications", risks: "Trade tariff adjustments" }
];

interface Props {
  onBack?: () => void;
}

export default function NewsPOCHeadlinesIntelligenceEditorAllSectors({ onBack }: Props) {
  // Filter states
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [selectedGeographyFilter, setSelectedGeographyFilter] = useState<string>("all");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Interactive UI states
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);

  // Features
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
  const [expandedIntelId, setExpandedIntelId] = useState<string>("intel-all-1");

  // Premium toggle simulator
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);

  // Loading skeleton simulator
  const [isLoading, setIsLoading] = useState(false);

  // Interactive Regional filter state
  const [selectedRegionalTab, setSelectedRegionalTab] = useState<string>("Asia-Pacific");

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
      showToast("Liked global intelligence report! ❤️");
    }
  };

  const handleBookmark = (id: string) => {
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles(prev => prev.filter(x => x !== id));
      showToast("Removed from Saved Intelligence");
    } else {
      setBookmarkedArticles(prev => [...prev, id]);
      showToast("Saved report to global briefs BRIEFCASE ✓");
    }
  };

  const handleFollowTopic = (topicName: string) => {
    if (followedTopics.includes(topicName)) {
      setFollowedTopics(prev => prev.filter(x => x !== topicName));
      showToast(`Unfollowed: ${topicName}`);
    } else {
      setFollowedTopics(prev => [...prev, topicName]);
      showToast(`Following: ${topicName} (Notified of global policy alerts)`);
    }
  };

  const handleGenerateBrief = () => {
    setIsBriefGenerating(true);
    setTimeout(() => {
      setIsBriefGenerating(false);
      setGeneratedBriefText(
        `**Global AI Intelligence Executive Brief:**\n` +
        `1. **Biggest Global Development:** Multilateral wafer equipment sourcing alliances restrict legacy packaging exports.\n` +
        `2. **Biggest Business Impact:** GPU sovereign hosting rules force database migrations, raising CapEx by 14%.\n` +
        `3. **Biggest Market Movement:** Bilateral public grid interconnect pipeline grants lower clean-tech risk by 11%.\n` +
        `4. **Biggest Company Development:** NVIDIA local hosting partnerships launch.\n` +
        `5. **Biggest Regulatory Development:** Phase 1 sovereign datacenter audit timelines published.\n` +
        `6. **Emerging Opportunity:** Southeast Asian assembly fabs capture priority allocations.\n` +
        `7. **Major Risk:** GPU localization mandates restrict cross-border data transfers.\n` +
        `8. **Story to Watch Next:** Draft standard verification guidelines on cross-border logistics lanes.`
      );
      showToast("Global Intelligence Brief generated successfully ✓");
    }, 700);
  };

  const handleAskAi = (q: string) => {
    setAiChatQuery(q);
    setIsAiAnswering(true);
    setTimeout(() => {
      setIsAiAnswering(false);
      if (q.toLowerCase().includes("risk") || q.toLowerCase().includes("trade")) {
        setAiChatResponse("AI analysis indicates significant trade risks in legacy semiconductor equipment exports, and regulatory compliance risks in sovereign GPU datacenters relocation audits (+14% operational CapEx).");
      } else if (q.toLowerCase().includes("opportunity") || q.toLowerCase().includes("growth")) {
        setAiChatResponse("Global growth signals exist in Southeast Asian semiconductor packaging fab expansions and bilaterally subsidized hydrogen pipeline networks.");
      } else {
        setAiChatResponse("Global intelligence audits show high B2B impact points in sovereign hosting localization mandates and clean tech port grid financing schemes.");
      }
    }, 550);
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryText.trim()) return;

    showToast(`Lead registered in CRM system for ${enquiryCompany} ✓ (ID: IGEN-GI-ALL-${Math.floor(1000 + Math.random() * 9000)})`);
    setEnquiryCompany(null);
    setEnquiryText("");
  };

  // Filter global intelligence articles based on filters parameters
  const filteredArticles = MOCK_GLOBAL_INTELLIGENCE.filter(art => {
    // Search query filter
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Dropdown filters
    const matchesSector = selectedSectorFilter === "all" || art.sectorName.toLowerCase().includes(selectedSectorFilter.toLowerCase());
    const matchesGeography = selectedGeographyFilter === "all" || art.country.toLowerCase().includes(selectedGeographyFilter.toLowerCase());
    const matchesType = selectedTypeFilter === "all" || art.intelligenceType === selectedTypeFilter;

    return matchesSearch && matchesSector && matchesGeography && matchesType;
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
        <span className="text-blue-500 font-bold">All Sector</span>
      </nav>

      {/* ─── Premium Intelligence Hero ─── */}
      <header className="mx-auto max-w-7xl px-4 pt-6 pb-4 lg:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <BarChart2 className="h-3.5 w-3.5" /> IGEN INTELLIGENCE EDITOR
              </span>
              <span className="bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded tracking-wide font-mono flex items-center gap-0.5">
                <Globe className="h-3 w-3" /> Global intelligence desk Active
              </span>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Global Intelligence Across All Sectors
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
              Explore market intelligence, industry developments, emerging opportunities, business risks and expert perspectives across industries and markets worldwide.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <Link 
              href="/en/news-poc/headlines/intelligence-editor/my"
              className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-gray-850 hover:bg-gray-100 text-gray-700 dark:text-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-3xs"
            >
              <Briefcase className="h-4 w-4 text-blue-500" /> Explore My Sectors →
            </Link>
            <button 
              onClick={() => {
                const radarSec = document.getElementById("radar-anchor");
                if (radarSec) radarSec.scrollIntoView({ behavior: "smooth" });
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-blue-500/10"
            >
              Explore Intelligence
            </button>
          </div>
        </div>

        {/* Global Search & Filters Bar */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search global intelligence..."
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
                <option value="Global">Global/Multilateral</option>
                <option value="Germany">Germany-Norway</option>
                <option value="Japan">Japan-Taiwan</option>
              </select>
            </div>
          </div>
        </div>
      </header>

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
          {/* ─── Global Intelligence Editor's Top Picks ─── */}
          {filteredArticles.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
                <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                  Intelligence Editor's Global Top Picks
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
              
              {/* ── LEFT COLUMN: Latest Global Intelligence feed & snapshots ── */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Section Header */}
                <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center flex-wrap gap-2">
                  <div className="space-y-0.5">
                    <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Latest Global Intelligence
                    </h2>
                    <span className="text-[10px] text-gray-400 block font-normal">Real-time global regulatory analysis, CapEx grants, and sourcing radar.</span>
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
                                      : "text-gray-550 border-gray-300 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
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
                    <p className="text-xs font-bold text-gray-500">No B2B intelligence matches your current filters right now.</p>
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

                {/* ── Global Intelligence Snapshot ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Global Intelligence Snapshot
                  </span>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs font-semibold">
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                      <span className="font-extrabold text-blue-500 text-base block">342</span>
                      <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">updates</span>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                      <span className="font-extrabold text-amber-500 text-base block">47</span>
                      <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">developments</span>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                      <span className="font-extrabold text-purple-500 text-base block">19</span>
                      <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">trends</span>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl">
                      <span className="font-extrabold text-red-505 text-base block">12</span>
                      <span className="text-[8px] text-gray-450 block uppercase tracking-wider mt-1">high impact</span>
                    </div>
                  </div>
                </div>

                {/* ── Global Market Snapshot ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <BarChart2 className="h-4 w-4 text-blue-500" /> Global Market Snapshot
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { title: "Equipment Export volumes", metric: "-8.4% Sourcing index", desc: "Consortium export restrictions", up: false },
                      { title: "Bilateral grid allocations", metric: "+11.2% CapEx", desc: "German-Norway pipeline grants", up: true },
                      { title: "GPU hosting real estate", metric: "+14% Relocation cost", desc: "Sovereign AI datacenters mandates", up: true }
                    ].map((row, idx) => (
                      <div key={idx} className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-150 dark:border-gray-850">
                        <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-wider">{row.title}</span>
                        <span className="text-xs font-extrabold text-gray-905 dark:text-white block mt-1.5">{row.metric}</span>
                        <p className="text-[8px] text-gray-400 mt-1 font-normal leading-tight">{row.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── What's Changing Globally ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    What's Changing Globally
                  </span>
                  
                  <div className="space-y-3.5 text-xs font-semibold">
                    {[
                      { sector: "Technology & AI", state: "Rising", signal: "Sovereign AI GPU localization mandates forcing migrations", up: true },
                      { sector: "Semiconductors & OSAT", state: "Rising", signal: "Bilateral equipment export controls redistributing wafer fabs", up: true },
                      { sector: "Energy Transition", state: "Emerging", signal: "Bilateral pipeline grants lower development risk by 11%", up: true }
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

                {/* ── Emerging Global Opportunities ── */}
                <div className="space-y-4 pt-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Emerging Global Opportunities
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
                          <span className="text-gray-400 font-semibold">{opp.sector} ({opp.market})</span>
                          <Link href="/eoi" className="text-blue-500 hover:underline uppercase text-[9px] font-bold">Explore →</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Global Risk Watch ── */}
                <div className="bg-[#E63946]/5 border border-red-500/10 p-5 rounded-2xl space-y-3">
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400 border-b border-red-500/10 pb-2">
                    <ShieldAlert className="h-4 w-4 animate-pulse" />
                    <h3 className="font-display text-xs font-bold uppercase tracking-widest">Global Risk Watch</h3>
                  </div>
                  <div className="space-y-3">
                    {MOCK_RISKS.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-start gap-4 text-xs font-semibold">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="bg-red-500 text-white text-[7px] font-mono px-1 py-0.2 rounded uppercase">{item.riskLevel}</span>
                            <span className="text-[10px] text-gray-400">{item.sector}</span>
                          </div>
                          <span className="text-gray-900 dark:text-white block leading-snug">{item.why}</span>
                        </div>
                        <button onClick={() => showToast("Loading global risk details...")} className="text-red-500 hover:underline uppercase text-[9.5px] font-bold shrink-0">View →</button>
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
                    const activeStory = MOCK_GLOBAL_INTELLIGENCE.find(a => a.id === expandedIntelId) || MOCK_GLOBAL_INTELLIGENCE[0];
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

                {/* ── Compare Global Sectors table ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Compare Global Sectors
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    <div className="grid grid-cols-4 text-[8px] text-gray-400 uppercase font-extrabold pb-1 border-b border-gray-100 dark:border-gray-800">
                      <span>Sector</span>
                      <span className="text-center">Activity</span>
                      <span className="text-center">Signal</span>
                      <span className="text-right">Risk</span>
                    </div>

                    {[
                      { name: "Tech & AI", act: "High", sig: "↑", risk: "Med" },
                      { name: "Semiconductors", act: "High", sig: "↑", risk: "High" },
                      { name: "Energy & Utilities", act: "Med", sig: "↑", risk: "Low" }
                    ].map((row, idx) => (
                      <div key={idx} className="grid grid-cols-4 items-center text-[10px] py-1 border-b border-gray-50 dark:border-gray-800/40 last:border-0 last:pb-0">
                        <span className="font-bold truncate">{row.name}</span>
                        <span className="text-center text-gray-500">{row.act}</span>
                        <span className="text-center text-blue-505 font-bold">{row.sig}</span>
                        <span className="text-right text-gray-550">{row.risk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Global Intelligence Trend Radar ── */}
                <div id="radar-anchor" className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Global Intelligence Trend Radar
                  </span>
                  
                  <div className="space-y-3.5 text-xs font-semibold">
                    {[
                      { topic: "Equipment Sourcing", state: "Accelerating", sentiment: "76% Positive" },
                      { topic: "Sovereign Datacenters", state: "Rising", sentiment: "82% Positive" },
                      { topic: "Bilateral Pipeline CapEx", state: "Emerging", sentiment: "61% Neutral" }
                    ].map((sig, idx) => (
                      <div key={idx} className="flex justify-between items-start">
                        <div className="space-y-0.5">
                          <span className="font-bold text-gray-900 dark:text-white block">{sig.topic}</span>
                          <span className="text-[9px] text-gray-450 block font-normal">Sentiment: {sig.sentiment}</span>
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

                {/* ── Today's Most Active Sectors ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Today's Most Active Sectors
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    {[
                      { rank: "1.", name: "Technology & AI", code: "S38" },
                      { rank: "2.", name: "Semiconductors & OSAT", code: "S46" },
                      { rank: "3.", name: "Energy & Utilities", code: "S17" },
                      { rank: "4.", name: "BFSI & Finance", code: "S41" }
                    ].map((sec, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-900 dark:text-white">{sec.rank} {sec.name}</span>
                        <Link href={`/en/news-poc/sector/${sec.code}`} className="text-blue-505 hover:underline font-bold">View →</Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Global Country Intelligence ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Global Intelligence by Country
                  </span>
                  
                  <div className="space-y-3 text-xs">
                    {MOCK_COUNTRIES_NEWS.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center font-semibold">
                          <span className="text-gray-905 dark:text-white">{item.country} ({item.vol})</span>
                          <span className="text-[8px] text-gray-400 font-mono">Devs: {item.devs}</span>
                        </div>
                        <span className="text-[8px] text-gray-450 block font-normal leading-normal">
                          Top Sector: {item.leadingSec} • Latest: {item.latest}
                        </span>
                      </div>
                    ))}
                    <Link 
                      href="/en/news-poc/country/my"
                      className="block text-center text-[9px] font-bold text-blue-500 hover:underline uppercase pt-1"
                    >
                      Explore Country Intelligence →
                    </Link>
                  </div>
                </div>

                {/* ── Regional Intelligence Widget ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Regional Intelligence
                  </span>
                  
                  <div className="space-y-3">
                    <div className="flex gap-1.5 overflow-x-auto no-scrollbar border-b border-gray-100 dark:border-gray-800 pb-1.5">
                      {MOCK_REGIONS_NEWS.map(reg => (
                        <button
                          key={reg.region}
                          onClick={() => setSelectedRegionalTab(reg.region)}
                          className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all whitespace-nowrap ${
                            selectedRegionalTab === reg.region
                              ? "bg-blue-600 text-white"
                              : "bg-gray-50 text-gray-500 dark:bg-gray-900"
                          }`}
                        >
                          {reg.region}
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const activeReg = MOCK_REGIONS_NEWS.find(r => r.region === selectedRegionalTab) || MOCK_REGIONS_NEWS[0];
                      return (
                        <div className="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-xl border border-gray-150 dark:border-gray-800 text-[10px] space-y-2 font-semibold">
                          <div className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-1.5">
                            <span className="text-gray-400 font-normal">Active Developments</span>
                            <span>{activeReg.devs} updates</span>
                          </div>
                          <div>
                            <span className="text-gray-450 block font-normal text-[8px] uppercase tracking-wider">Top Sector</span>
                            <span className="text-gray-900 dark:text-white">{activeReg.topSec}</span>
                          </div>
                          <div>
                            <span className="text-emerald-500 block font-normal text-[8px] uppercase tracking-wider">Emerging Opportunities</span>
                            <span className="text-gray-900 dark:text-white">{activeReg.opps}</span>
                          </div>
                          <div>
                            <span className="text-red-500 block font-normal text-[8px] uppercase tracking-wider">Key Risks</span>
                            <span className="text-gray-900 dark:text-white">{activeReg.risks}</span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* ── Global Topic Clusters ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Global Topic Clusters
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    {[
                      { topic: "Semiconductor Sourcing", updates: 18, countries: 12, companies: 22 },
                      { topic: "AI Regulation", updates: 14, countries: 6, companies: 15 }
                    ].map((clus, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs">
                        <div>
                          <span className="font-bold text-blue-500 hover:underline cursor-pointer block">
                            #{clus.topic.replace(/\s+/g, "")}
                          </span>
                          <span className="text-[9px] text-gray-400 font-normal">
                            {clus.updates} updates • {clus.countries} countries • {clus.companies} companies
                          </span>
                        </div>
                        <button 
                          onClick={() => handleFollowTopic(clus.topic)}
                          className={`text-[8.5px] font-bold uppercase transition-colors px-1.5 py-0.5 rounded ${
                            followedTopics.includes(clus.topic)
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-350/20"
                              : "text-gray-400 hover:text-blue-500"
                          }`}
                        >
                          {followedTopics.includes(clus.topic) ? "Followed ✓" : "+ Follow"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Today's Global Intelligence Brief ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-805 p-5 rounded-2xl shadow-sm space-y-3">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold">Today's Global Intelligence Brief</h4>
                    <span className="bg-amber-500 text-slate-950 text-[7px] font-extrabold px-1 rounded font-mono">PRO</span>
                  </div>

                  {!generatedBriefText ? (
                    <div className="space-y-3 text-[10px] font-semibold text-gray-500">
                      <p className="leading-relaxed font-normal">Generate an 8-point curated global summary mapping developments, Opportunities, and Risks across all sectors.</p>
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
                        className="text-[9px] font-bold text-blue-500 hover:underline uppercase block"
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
                      {["What are the biggest business developments today?", "What are the biggest global trade risks?"].map((pq, idx) => (
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
                        placeholder="Ask about global opportunities..."
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

                {/* ── Companies Making Moves ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Companies Making Moves
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
                            <span className="text-[8px] text-gray-450 block font-normal">{company.sector}</span>
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

                {/* ── Expert Perspectives ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Expert Global Perspectives
                  </span>
                  
                  <div className="space-y-3 text-xs">
                    {MOCK_EXPERTS.map((exp, idx) => (
                      <div key={idx} className="space-y-1.5 border-b border-gray-50 dark:border-gray-800/40 pb-2 last:border-0 last:pb-0">
                        <span className="font-bold text-gray-905 dark:text-white block leading-snug">{exp.name} ({exp.org})</span>
                        <p className="text-[10.5px] text-gray-550 dark:text-gray-400 italic leading-snug font-normal">"{exp.perspective}"</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Global Discussion Sentiment ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Global Intelligence Sentiment
                  </span>
                  
                  <div className="space-y-2.5 text-xs font-semibold">
                    <div className="flex justify-between text-[10px]">
                      <span>Positive Sentiment</span>
                      <span className="text-emerald-500">46%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[46%]" />
                    </div>
                    
                    <div className="flex justify-between text-[10px]">
                      <span>Neutral Sentiment</span>
                      <span className="text-blue-500">32%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[32%]" />
                    </div>

                    <div className="flex justify-between text-[10px]">
                      <span>Negative Sentiment</span>
                      <span className="text-red-500">22%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[22%]" />
                    </div>
                    <span className="text-[9px] text-gray-450 block font-normal pt-1">"AI-estimated sentiment" analytics from global B2B discussions.</span>
                  </div>
                </div>

                {/* ── Premium AI Intelligence Conversion lock ── */}
                <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white border border-indigo-900/60 p-5 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-display text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Unlock Advanced Global Intelligence
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

                {/* ── Recommended Intelligence Reports ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 p-4 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Recommended Global Intelligence Reports
                  </span>

                  <div className="space-y-3">
                    {MOCK_REPORTS.map((rep, idx) => (
                      <div key={idx} className="space-y-1.5 text-xs font-semibold border-b border-gray-50 dark:border-gray-800/40 pb-2 last:border-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900 dark:text-white line-clamp-1">{rep.title}</span>
                          <span className="bg-amber-550 text-gray-955 text-[7px] font-extrabold px-1.5 py-0.2 rounded font-mono uppercase">{rep.access}</span>
                        </div>
                        <p className="text-[9px] text-gray-450 font-normal leading-normal">{rep.desc}</p>
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

                {/* ── Global Alerts Configurator ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold">
                    Never Miss a Major Development
                  </h4>
                  
                  {!alertConfigured ? (
                    <div className="space-y-3 text-[10px] font-semibold">
                      <p className="text-gray-550 leading-relaxed font-normal">
                        Configure customized alert rules to receive push notifications when critical global intelligence is published.
                      </p>
                      
                      <div className="space-y-1.5">
                        <span className="text-[8px] text-gray-400 uppercase font-bold">Importance Target</span>
                        <select 
                          value={alertThreshold}
                          onChange={(e) => setAlertThreshold(e.target.value)}
                          className="w-full p-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800 rounded-lg text-xs outline-none"
                        >
                          <option value="Critical">Critical global news only</option>
                          <option value="High">High or Critical levels</option>
                          <option value="Medium">Medium & above</option>
                        </select>
                      </div>

                      <button 
                        onClick={() => { setAlertConfigured(true); showToast(`Alert rule created for ${alertThreshold} global intelligence reports ✓`); }}
                        className="w-full bg-[#1E3A5F] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                      >
                        Create Alert
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-955/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Global Intelligence Alert Activated!
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
                    Global Intelligence Brief
                  </h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 leading-relaxed font-normal">
                    Receive the most important business intelligence, market developments and emerging opportunities.
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
                      ✓ Subscribed to Global Intelligence Brief!
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
                  className="w-full p-3 rounded-xl border border-gray-250 dark:border-gray-850 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500 text-gray-950 dark:text-white"
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

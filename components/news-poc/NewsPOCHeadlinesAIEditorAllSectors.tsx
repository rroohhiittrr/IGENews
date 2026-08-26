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
  industryImpact: string;
  countryImpact: string;
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
  globalImportance: "Critical" | "High" | "Medium";
  mySectorImportance: "Very High" | "High" | "Medium";
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
  country: string;
}

interface LeaderHeadline {
  name: string;
  role: string;
  company: string;
  sector: string;
  latestHeadline: string;
  country: string;
}

interface TopicCluster {
  topic: string;
  storiesCount: number;
  countriesCount: number;
  companiesCount: number;
  expertOpinions: number;
}

const MOCK_GLOBAL_AI_ARTICLES: Article[] = [
  {
    id: "ai-all-1",
    title: "Global Semiconductor Equipment Sourcing Alliances Reshape APAC Wafer Fabs",
    excerpt: "Consortiums approve legacy assembly gear export corridors to insulate domestic supply networks. Sourcing leads adjust regional logistics schedules to meet new bilateral rules.",
    sectorCode: "S46",
    sectorName: "Semiconductors & OSAT",
    country: "Global",
    date: "1 hr ago",
    readTime: "5 min read",
    likes: 410,
    comments: 62,
    shares: 112,
    views: 58000,
    importance: "Critical",
    aiSummary: "Major equipment sourcing alliances secure legacy assembly equipment corridors, shifting global supply chain dependency configurations.",
    whyItMatters: {
      whatHappened: "Equipment builders established standardized dispatch lanes for wafer machinery.",
      whyItMattersText: "Decouples supply dependency on single-source assembly regions, insulating logistics networks from tariff shocks.",
      whoIsAffected: "Wafer foundry executives, legacy packaging groups, and logistics dispatch handlers.",
      whatsNext: "Equipment certification checks go active next month across APAC hubs."
    },
    businessImpact: "Allows tech groups to diversify supplier redundancy targets, lowering raw hardware dependencies.",
    industryImpact: "Slices equipment deployment wait times by 18% for compliant packaging facilities.",
    countryImpact: "Promotes local clean room expansions across secondary manufacturing ports.",
    regionalImpact: "Accelerates cargo shipping frequency between Southeast Asian wafer assembly hubs.",
    nextDevelopments: "Foundries will release unified capital allocation budgets in late Q3.",
    trending: true,
    breaking: true,
    sponsored: false,
    author: "Satoshi Yamamoto",
    role: "Wafer Logistics Editor",
    image: "https://images.unsplash.com/photo-1601972599720-36938d4ecd31?w=800&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    companyLogo: "NV",
    topic: "Semiconductor Sourcing",
    timeline: [
      { time: "08:30 AM", event: "Consortium publishes draft machinery export specifications." },
      { time: "11:00 AM", event: "Equipment brokers announce priority allocation queues." },
      { time: "03:30 PM", event: "Logistics operators deploy custom verification panels." }
    ],
    globalImportance: "Critical",
    mySectorImportance: "Very High"
  },
  {
    id: "ai-all-2",
    title: "Global AI Sovereignty Mandates Force C-Suite GPU Curation Overhauls",
    excerpt: "Regulatory bodies enforce regional data storage boundaries on offshore GPU setups. Corporate legal leads seek compliance audits to protect cross-border AI models.",
    sectorCode: "S02",
    sectorName: "AI & Cyber Security",
    country: "Multilateral Lanes",
    date: "2 hrs ago",
    readTime: "4 min read",
    likes: 350,
    comments: 54,
    shares: 92,
    views: 49000,
    importance: "Critical",
    aiSummary: "AI GPU sovereignty rules mandate data operations remain strictly within localized national clusters, driving corporate infrastructure migrations.",
    whyItMatters: {
      whatHappened: "International committees approved localized model training and storage policies.",
      whyItMattersText: "Data operations must align to sovereign boundaries or face severe compliance fines.",
      whoIsAffected: "Enterprise CTOs, public sector cloud providers, and global GPU farm operators.",
      whatsNext: "Exporters must secure local hardware clearance certificates before Q3 audits."
    },
    businessImpact: "Increases migration capital expenditure by 14% for multi-regional SaaS operations.",
    industryImpact: "Accelerates local data center capacity builds and private cloud hardware sourcing.",
    countryImpact: "Strengthens Indian and European local sovereign hosting corridors.",
    regionalImpact: "Promotes bilateral database migration service contracts.",
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
      { time: "11:30 AM", event: "Cloud providers publish compliance timelines." }
    ],
    globalImportance: "Critical",
    mySectorImportance: "Very High"
  },
  {
    id: "ai-all-3",
    title: "Bilateral Clean Hydrogen Port Grid Funding Guidelines Unveiled",
    excerpt: "State commissions authorize infrastructure grants for green hydrogen pipeline networks. Sourcing leaders debate dispatch pricing standards and grid access models.",
    sectorCode: "S17",
    sectorName: "Energy & Sustainability",
    country: "Germany-Norway",
    date: "4 hrs ago",
    readTime: "6 min read",
    likes: 290,
    comments: 38,
    shares: 68,
    views: 39000,
    importance: "High",
    aiSummary: "Grid funding rules for clean hydrogen port linkages are approved, securing private developers grid interconnection rights.",
    whyItMatters: {
      whatHappened: "Energy ministries approved CapEx subsidies for bilateral hydrogen distribution hubs.",
      whyItMattersText: "Unified funding formulas allow developers to secure green credit offsets under carbon policies.",
      whoIsAffected: "Hydrogen project developers, port authorities, and utility grid operators.",
      whatsNext: "Feasibility audits for pipeline routing commence next week."
    },
    businessImpact: "Lowers initial infrastructure development risk for industrial clean energy groups.",
    industryImpact: "Slices pipeline dispatch cost indexes by 11% compared to diesel logistics.",
    countryImpact: "Establishes long-term clean energy trade networks between EU export gateways.",
    regionalImpact: "Drives industrial grid cell investment inside regional manufacturing zones.",
    nextDevelopments: "Tariff frameworks for gas dispatch corridors will be published in late Q3.",
    trending: true,
    breaking: false,
    sponsored: false,
    author: "Elena Rostova",
    role: "Grid Policy Counsel",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop&q=80",
    companyName: "EcoHydro Power",
    companyLogo: "EH",
    topic: "Energy Transition Policy",
    timeline: [],
    globalImportance: "High",
    mySectorImportance: "High"
  },
  {
    id: "ai-all-4",
    title: "Bilateral Packaging Fabs Subsidies Allocation Criticized by Domestic Builders",
    excerpt: "Sourcing leaders debate priority funding corridors. Independent assembly firms argue that state subsidies favor legacy multinationals over agile domestic chip packaging startups.",
    sectorCode: "S46",
    sectorName: "Semiconductors & OSAT",
    country: "USA-Taiwan Lanes",
    date: "6 hrs ago",
    readTime: "5 min read",
    likes: 240,
    comments: 29,
    shares: 48,
    views: 31000,
    importance: "High",
    aiSummary: "Domestic chip packaging startups challenge bilateral fab funding models, claiming rules restrict agile assembly builders.",
    whyItMatters: {
      whatHappened: "Subsidies allocation structures favored multi-billion legacy fab groups.",
      whyItMattersText: "Agile domestic assemblers claim legacys lock out early-stage research grant priority pools.",
      whoIsAffected: "Silicon assemblers, research labs, and state funding commissions.",
      whatsNext: "Petitions for startup grant allocation buffers will be submitted this week."
    },
    businessImpact: "Presents regulatory hurdles for small-scale chip packaging operations.",
    industryImpact: "Fosters focus on low-density legacy chip fabrication assembly.",
    countryImpact: "Splits localized research allocations between state and federal pools.",
    regionalImpact: "Refocuses supply chain buffers to alternative assembly centers.",
    nextDevelopments: "Revised allocation tables will be published next month.",
    trending: false,
    breaking: false,
    sponsored: false,
    author: "Satoshi Yamamoto",
    role: "Tech Policy Editor",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    companyName: "NVIDIA",
    companyLogo: "NV",
    topic: "Semiconductor Sourcing",
    timeline: [],
    globalImportance: "High",
    mySectorImportance: "High"
  }
];

const MOCK_TRENDS: TrendSignal[] = [
  { topic: "AI Sovereign Hosting", state: "Accelerating", sentiment: "74% Positive" },
  { topic: "Semiconductor Demand", state: "Rising", sentiment: "81% Positive" },
  { topic: "Green Hydrogen Pipelines", state: "Emerging", sentiment: "58% Neutral" },
  { topic: "Sodium Cell Geometries", state: "Stable", sentiment: "62% Neutral" }
];

const MOCK_COMPANIES: CompanyHeadline[] = [
  { name: "NVIDIA", logo: "NV", sector: "AI & Semiconductors", verified: true, headlinesCount: 18, latestHeadline: "Global Semiconductor Equipment Sourcing Alliances Reshape Fabs", country: "Global" },
  { name: "EcoHydro Power", logo: "EH", sector: "Energy & Utilities", verified: true, headlinesCount: 9, latestHeadline: "Bilateral Clean Hydrogen Port Grid Funding Guidelines Unveiled", country: "Germany" }
];

const MOCK_LEADERS: LeaderHeadline[] = [
  { name: "Jensen Huang", role: "CEO", company: "NVIDIA", sector: "AI & Cyber Security", latestHeadline: "Global Semiconductor Equipment Sourcing Alliances Reshape Fabs", country: "Global" },
  { name: "Satoshi Yamamoto", role: "Policy Advisor", company: "Consortium", sector: "Semiconductors", latestHeadline: "Bilateral Packaging Fabs Subsidies Allocation Criticized", country: "Japan" }
];

const MOCK_CLUSTERS: TopicCluster[] = [
  { topic: "Semiconductor Sourcing", storiesCount: 18, countriesCount: 12, companiesCount: 22, expertOpinions: 8 },
  { topic: "AI Regulation", storiesCount: 14, countriesCount: 6, companiesCount: 15, expertOpinions: 5 },
  { topic: "Energy Transition Policy", storiesCount: 9, countriesCount: 3, companiesCount: 8, expertOpinions: 3 }
];

const MOCK_EXPERTS = [
  { name: "Satoshi Yamamoto", org: "Wafer Policy Forum", opinion: "Sourcing equipment redundancy rules are strict. Packaging facility groups need bilateral clearances.", relatedStory: "Global Semiconductor Equipment Sourcing Alliances Reshape Fabs" },
  { name: "Dr. Aris Thorne", org: "Sovereign AI Alliance", opinion: "Data localization mandates increase operations cap reserves by 14% for multi-regional hosting models.", relatedStory: "Global AI Sovereignty Mandates Force C-Suite Overhauls" }
];

const MOCK_COUNTRIES_NEWS = [
  { country: "India", vol: "84K Headlines", devs: 18, topSec: "Technology & AI", latest: "Global AI Sovereignty Mandates Force Overhauls" },
  { country: "USA", vol: "92K Headlines", devs: 24, topSec: "Semiconductors & BFSI", latest: "Bilateral Packaging Fabs Subsidies Allocation Criticized" },
  { country: "Germany", vol: "64K Headlines", devs: 15, topSec: "Energy & Sustainability", latest: "Bilateral Clean Hydrogen Port Grid Funding Guidelines" }
];

const MOCK_HEATMAP_REGIONS = [
  { region: "Asia", volume: "2.84M Headlines", topSector: "Semiconductors & AI Fabs", activeStories: 68 },
  { region: "Europe", volume: "1.92M Headlines", topSector: "Clean Tech & Metallurgy", activeStories: 42 },
  { region: "North America", volume: "1.74M Headlines", topSector: "Automotive & EVs", activeStories: 35 },
  { region: "Middle East", volume: "890K Headlines", topSector: "Offshore BFSI", activeStories: 16 }
];

interface Props {
  onBack?: () => void;
}

export default function NewsPOCHeadlinesAIEditorAllSectors({ onBack }: Props) {
  // Filters state
  const [selectedSectorFilter, setSelectedSectorFilter] = useState<string>("all");
  const [selectedGeographyFilter, setSelectedGeographyFilter] = useState<string>("all");
  const [selectedImportanceFilter, setSelectedImportanceFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // UI state
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);
  
  // Interactive features
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
  const [expandedSummaryId, setExpandedSummaryId] = useState<string>("ai-all-1");

  // Premium toggle simulator
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);

  // Loading skeleton simulator
  const [isLoading, setIsLoading] = useState(false);

  // Interactive Heatmap region selector
  const [selectedHeatmapRegion, setSelectedHeatmapRegion] = useState<string>("Asia");

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
      showToast("Liked global story! ❤️");
    }
  };

  const handleBookmark = (id: string) => {
    if (bookmarkedArticles.includes(id)) {
      setBookmarkedArticles(prev => prev.filter(x => x !== id));
      showToast("Removed from Saved Headlines");
    } else {
      setBookmarkedArticles(prev => [...prev, id]);
      showToast("Saved headline globally ✓");
    }
  };

  const handleFollowTopic = (topicName: string) => {
    if (followedTopics.includes(topicName)) {
      setFollowedTopics(prev => prev.filter(x => x !== topicName));
      showToast(`Unfollowed: ${topicName}`);
    } else {
      setFollowedTopics(prev => [...prev, topicName]);
      showToast(`Following: ${topicName} (Notified of global emerging alerts)`);
    }
  };

  const handleGenerateBrief = () => {
    setIsBriefGenerating(true);
    setTimeout(() => {
      setIsBriefGenerating(false);
      setGeneratedBriefText(
        `**AI Global Headlines Daily Brief:**\n` +
        `1. **Biggest Global Development:** Equipment sourcing alliances secure legacy assembly corridors globally.\n` +
        `2. **Biggest Business Impact:** GPU sovereignty rules force data migrations, inflating CapEx by 14%.\n` +
        `3. **Biggest Announcement:** Bilateral grid interconnection rules for hydrogen port linkages approved.\n` +
        `4. **Emerging Trend:** Non-lithium sodium cells and standardized generic drug distribution APIs.\n` +
        `5. **Story to Watch Tomorrow:** Late Q3 capital flow double taxation treaties.`
      );
      showToast("Global AI brief compiled successfully ✓");
    }, 700);
  };

  const handleAskAi = (q: string) => {
    setAiChatQuery(q);
    setIsAiAnswering(true);
    setTimeout(() => {
      setIsAiAnswering(false);
      if (q.toLowerCase().includes("technology") || q.toLowerCase().includes("semiconductor")) {
        setAiChatResponse("Semiconductor alliances are routing legacy equipment to Da Nang and Chennai. AI GPU sovereignty regulations have started compliance audits globally.");
      } else if (q.toLowerCase().includes("energy") || q.toLowerCase().includes("hydrogen")) {
        setAiChatResponse("Hydrogen port linkages funding outlines green grid CapEx allocations between Norway and Germany.");
      } else {
        setAiChatResponse("AI analysis projects critical developments in semiconductor equipment networks and sovereign AI hosting architectures.");
      }
    }, 550);
  };

  const handleSendEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryText.trim()) return;

    showToast(`Lead registered in CRM system for ${enquiryCompany} ✓ (ID: IGEN-GL-${Math.floor(1000 + Math.random() * 9000)})`);
    setEnquiryCompany(null);
    setEnquiryText("");
  };

  // Filter global headlines based on filters parameters
  const filteredArticles = MOCK_GLOBAL_AI_ARTICLES.filter(art => {
    // Search query filter
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Dropdown filters
    const matchesSector = selectedSectorFilter === "all" || art.sectorName.toLowerCase().includes(selectedSectorFilter.toLowerCase());
    const matchesGeography = selectedGeographyFilter === "all" || art.country.toLowerCase().includes(selectedGeographyFilter.toLowerCase());
    const matchesImportance = selectedImportanceFilter === "all" || art.importance === selectedImportanceFilter;

    return matchesSearch && matchesSector && matchesGeography && matchesImportance;
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
        <span className="text-blue-500 font-bold">All Sector</span>
      </nav>

      {/* ─── Premium Editorial Hero ─── */}
      <header className="mx-auto max-w-7xl px-4 pt-6 pb-4 lg:px-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-blue-600/10 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                <Cpu className="h-3 w-3" /> AI EDITOR
              </span>
              <span className="bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold px-2 py-0.5 rounded tracking-wide font-mono flex items-center gap-0.5">
                <Globe className="h-3 w-3" /> Global Curation Active
              </span>
            </div>
            
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              AI Headlines — All Sectors
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-normal leading-relaxed">
              AI-curated business headlines, breaking developments and intelligence across industries and markets worldwide.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            <Link 
              href="/en/news-poc/headlines/ai-editor/my"
              className="bg-white dark:bg-[#0f172a] border border-gray-300 dark:border-gray-855 hover:bg-gray-100 text-gray-700 dark:text-gray-300 text-xs font-bold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-3xs"
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
              Explore AI Intelligence
            </button>
          </div>
        </div>

        {/* Global Search & Filters Bar */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-3xs flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search global AI headlines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 font-semibold"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
            {/* Sector filter */}
            <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-gray-900/60 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800">
              <Filter className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={selectedSectorFilter}
                onChange={(e) => setSelectedSectorFilter(e.target.value)}
                className="bg-transparent text-[10px] font-bold text-gray-600 dark:text-gray-300 outline-none cursor-pointer font-sans"
              >
                <option value="all">All Sectors</option>
                <option value="Semiconductors">Semiconductors & OSAT</option>
                <option value="AI">AI & Cyber Security</option>
                <option value="Energy">Energy & Sustainability</option>
                <option value="Pharma">Health & Pharma</option>
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
                <option value="USA">USA-Taiwan</option>
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
          {/* ─── Global AI Editor's Top Picks ─── */}
          {filteredArticles.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-2 flex items-center gap-2">
                <Star className="h-4.5 w-4.5 text-amber-500 fill-amber-500" />
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                  AI Editor's Global Top Picks
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
                        <span className="text-slate-355">{story.country} • {story.date}</span>
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
                    <span className="text-[10px] text-gray-400 block font-normal">Real-time global AI-curated trade alerts.</span>
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
                                  ? "bg-red-50 text-red-600 dark:bg-red-950/20"
                                  : "bg-blue-50 text-blue-600 dark:bg-blue-955/20"
                              }`}>
                                {story.importance} Importance
                              </span>
                              <span className="text-blue-500">{story.sectorName}</span>
                            </div>

                            <h4 className="text-xs md:text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">
                              {story.title}
                            </h4>
                            
                            {/* AI Summary preview */}
                            <div className="bg-gray-50 dark:bg-gray-900/50 p-2.5 rounded-lg border border-gray-100 dark:border-gray-855 text-[10px] space-y-1 font-normal leading-relaxed text-gray-650 dark:text-gray-400">
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
                                  className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900/60 px-2.5 py-1 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors"
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
                  <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-12 rounded-3xl text-center space-y-3">
                    <AlertTriangle className="h-8 w-8 text-gray-400 mx-auto animate-pulse" />
                    <p className="text-xs font-bold text-gray-500">No AI-curated headlines match your filters right now.</p>
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

                {/* ── Global AI Summary - Read in 30 Seconds ── */}
                <div id="summary-read-anchor" className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 p-6 rounded-2xl shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Cpu className="h-4 w-4 text-blue-500" /> Understand the Story in 30 Seconds
                    </h3>
                  </div>

                  {(() => {
                    const activeStory = MOCK_GLOBAL_AI_ARTICLES.find(a => a.id === expandedSummaryId) || MOCK_GLOBAL_AI_ARTICLES[0];
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



                {/* ── Global Sector Highlights ── */}
                <div className="space-y-4 pt-4">
                  <div className="border-b border-gray-200 dark:border-gray-800 pb-2">
                    <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                      Sector Highlights
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-semibold">
                    {[
                      { name: "Technology & AI", headlines: 42, devs: 8, trends: 3, breaking: 2, icon: "🤖", code: "S38" },
                      { name: "Energy & sustainability", headlines: 31, devs: 6, trends: 4, breaking: 1, icon: "⚡", code: "S17" },
                      { name: "Health & Pharma", headlines: 27, devs: 5, trends: 3, breaking: 0, icon: "🏥", code: "S23" },
                      { name: "BFSI & Finance", headlines: 38, devs: 7, trends: 4, breaking: 0, icon: "🏦", code: "S41" }
                    ].map((sec, idx) => (
                      <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-2">
                        <div className="flex items-center gap-1 text-[11px] truncate">
                          <span>{sec.icon}</span>
                          <span className="font-bold text-gray-900 dark:text-white block">{sec.name.split(" & ")[0]}</span>
                        </div>
                        <div className="text-[9px] text-gray-500 pt-1 space-y-0.5">
                          <div><span className="font-bold text-blue-500">{sec.headlines}</span> headlines</div>
                          <div><span className="font-bold text-amber-500">{sec.devs}</span> developments</div>
                        </div>
                        <Link 
                          href={`/en/news-poc/sector/${sec.code}`}
                          className="text-[9px] font-bold text-blue-500 hover:underline uppercase block pt-1.5 border-t border-gray-50 dark:border-gray-800"
                        >
                          Explore Sector →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ── RIGHT COLUMN: Sidebar Widgets ── */}
              <div className="space-y-6">
                
                {/* ── Global AI Trend Radar Widget ── */}
                <div id="radar-anchor" className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Global AI Trend Radar
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

                {/* ── Emerging Global Signals ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-850 p-5 rounded-2xl shadow-xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Emerging Global Signals
                  </span>
                  
                  <div className="space-y-3 text-xs font-semibold">
                    {[
                      { topic: "Equipment Curation", sec: "Semiconductors", country: "Global", trend: "↑ Accelerating" },
                      { topic: "Hydrogen Hubs CapEx", sec: "Energy Policy", country: "EU-Lanes", trend: "↑ Emerging" }
                    ].map((row, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-gray-900 dark:text-white">{row.topic}</span>
                          <span className="text-red-500 font-mono text-[9px]">{row.trend}</span>
                        </div>
                        <div className="flex justify-between text-[8px] text-gray-400">
                          <span>Sector: {row.sec}</span>
                          <span>Region: {row.country}</span>
                        </div>
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
                      { rank: "🥇", name: "Technology & AI", code: "S38" },
                      { rank: "🥈", name: "Energy & sustainability", code: "S17" },
                      { rank: "🥉", name: "BFSI & Custody", code: "S41" },
                      { rank: "4.", name: "Semiconductors & OSAT", code: "S46" }
                    ].map((sec, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px]">
                        <span className="text-gray-900 dark:text-white">{sec.rank} {sec.name}</span>
                        <Link href={`/en/news-poc/sector/${sec.code}`} className="text-blue-500 hover:underline">View →</Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Country & Region Intelligence ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-250 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Global Headlines by Country
                  </span>
                  
                  <div className="space-y-3 text-xs">
                    {MOCK_COUNTRIES_NEWS.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-905 dark:text-white">{item.country} ({item.vol})</span>
                          <span className="text-[8px] text-gray-400 font-mono">Devs: {item.devs}</span>
                        </div>
                        <span className="text-[8px] text-gray-400 block font-normal leading-normal">
                          Top Sector: {item.topSec} • Latest: {item.latest}
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





                {/* ── Companies Making Headlines ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Companies Making Global Headlines
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
                            <span className="text-[8px] text-gray-400 block font-normal">{company.sector} ({company.country})</span>
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
                        <span className="text-[9px] text-gray-400 block font-normal">{lead.company} ({lead.country})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Expert Perspectives ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Expert Perspectives
                  </span>
                  
                  <div className="space-y-3 text-xs">
                    {MOCK_EXPERTS.map((exp, idx) => (
                      <div key={idx} className="space-y-1">
                        <span className="font-bold text-gray-900 dark:text-white block">{exp.name} ({exp.org})</span>
                        <p className="text-[10px] text-gray-555 italic leading-snug font-normal">"{exp.opinion}"</p>
                      </div>
                    ))}
                  </div>
                </div>



                {/* ── Global Industry Reaction Sentiment breakdown ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 p-5 rounded-2xl shadow-3xs space-y-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block border-b border-gray-100 dark:border-gray-800 pb-2">
                    Global Discussion Sentiment
                  </span>
                  
                  <div className="space-y-2.5 text-xs font-semibold">
                    <div className="flex justify-between text-[10px]">
                      <span>Positive Sentiment</span>
                      <span className="text-emerald-500">42%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[42%]" />
                    </div>
                    
                    <div className="flex justify-between text-[10px]">
                      <span>Neutral Sentiment</span>
                      <span className="text-blue-500">31%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[31%]" />
                    </div>

                    <div className="flex justify-between text-[10px]">
                      <span>Negative Sentiment</span>
                      <span className="text-red-500">27%</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 w-[27%]" />
                    </div>
                    <span className="text-[9px] text-gray-450 block font-normal pt-1">"AI-estimated sentiment" analytics from global discussions.</span>
                  </div>
                </div>

                {/* ── Global News Alerts Configurator ── */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-3">
                  <h4 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider font-semibold">
                    Never Miss a Major Global Development
                  </h4>
                  
                  {!alertConfigured ? (
                    <div className="space-y-3 text-[10px] font-semibold">
                      <p className="text-gray-550 leading-relaxed font-normal">
                        Configure customized alert rules to receive push notifications when critical global developments are published.
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
                        onClick={() => { setAlertConfigured(true); showToast(`Alert rule created for ${alertThreshold} global headlines ✓`); }}
                        className="w-full bg-[#1D1D46] hover:bg-[#152e4f] text-white font-bold py-2 rounded-lg transition-colors uppercase text-xs"
                      >
                        Create Alert
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-50 dark:bg-emerald-955/20 border border-emerald-300 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300 p-3 rounded-lg text-[10px] font-bold text-center">
                      ✓ Global Headline Alert Activated Successfully!
                    </div>
                  )}
                </div>

                {/* ── Premium AI Intelligence Conversion widget ── */}
                <div className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white border border-indigo-900/60 p-5 rounded-2xl shadow-sm space-y-4">
                  <h4 className="font-display text-sm font-bold flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-400 animate-pulse" /> Unlock Global AI Intelligence
                  </h4>
                  <p className="text-[10px] text-slate-350 leading-relaxed font-normal">
                    Secure institutional clearance to access full multi-sector policy radar grids, daily reports, and macro-financial briefings.
                  </p>
                  
                  <ul className="space-y-2 text-[10px] text-slate-405 font-semibold">
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
                    Unlock Global AI Intelligence
                  </button>
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
                      <span className="font-bold text-xs text-gray-900 dark:text-white block leading-tight">Global Enterprise AI Outlook 2026</span>
                      <span className="text-[8px] text-gray-400 block font-normal">Strategic Curation projections</span>
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
                    className="w-full text-center border border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-[10px] font-bold py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-955/20 transition-colors"
                  >
                    View Insight
                  </button>
                </div>

                {/* ── Advertisement banner slot ── */}
                <div className="bg-gray-100 dark:bg-gray-955/60 border border-gray-205 dark:border-gray-850 border-dashed p-4 rounded-2xl text-center space-y-1">
                  <span className="text-[8px] font-bold text-gray-400 block uppercase tracking-widest">Advertisement</span>
                  <p className="text-xs font-bold text-gray-600 dark:text-gray-400">iGEN Ad Network · 300 × 250 Banner Slot</p>
                  <Link href="/eoi" className="text-[9px] font-bold text-blue-500 hover:underline block uppercase mt-1">Request Placement</Link>
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

"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart2,
  Bookmark,
  Briefcase,
  Building2,
  Calendar,
  Car,
  Check,
  CheckCircle,
  ChevronRight,
  Clock,
  Compass,
  Cpu,
  Crown,
  Download,
  Eye,
  FileSpreadsheet,
  FileText,
  Filter,
  Flame,
  Globe,
  GraduationCap,
  Heart,
  HelpCircle,
  Layers,
  Lightbulb,
  LineChart,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Network,
  RefreshCw,
  Scale,
  Search,
  Share2,
  ShieldAlert,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  UserCheck,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";

export interface NewsPOCFullDiscoveryViewProps {
  initialCategory?: string;
  initialTopic?: string;
  contextTitle?: string;
  contextSubtitle?: string;
  contextBadge?: string;
  breadcrumbSource?: { label: string; href?: string }[];
  onBack?: () => void;
}

// ─── Datasets ────────────────────────────────────────────────────────────────

const TRENDING_SECTORS = [
  { name: "Electronics & IT", desc: "Tech & Sovereign Compute", code: "IT", status: "↑ Trending", color: "text-emerald-500", bg: "bg-emerald-500/10", flag: "💻" },
  { name: "Renewable Energy", desc: "Green Hydrogen & Solar", code: "RE", status: "↑ High", color: "text-emerald-500", bg: "bg-emerald-500/10", flag: "⚡" },
  { name: "FinTech & Payments", desc: "UPI & Cross-Border API", code: "FT", status: "↑ Rising", color: "text-blue-500", bg: "bg-blue-500/10", flag: "💳" },
  { name: "Logistics & Maritime", desc: "Port Settling & Customs", code: "LM", status: "↑ Rising", color: "text-blue-500", bg: "bg-blue-500/10", flag: "🚢" },
  { name: "Pharma & Biotech", desc: "Bulk API Sourcing", code: "PH", status: "→ Stable", color: "text-gray-400", bg: "bg-gray-400/10", flag: "🔬" }
];

const ALL_DISCOVERY_STORIES = [
  {
    id: "disc-1",
    title: "Global Semiconductor OSAT Substrate Scaling Accelerates Across Asian Corridors",
    excerpt: "Advanced multi-die packaging facilities reach pilot commercial run milestones, reducing dependence on single-region test houses by 35% in Q1.",
    category: "Technology",
    sector: "Electronics & IT",
    country: "India-Taiwan Bilateral",
    source: "IGEN Tech Wire",
    author: "Arun Kulkarni · Tech Lead",
    date: "8m ago",
    readTime: "5 min read",
    likes: 342,
    comments: 28,
    impact: "+38.2% Output",
    isFeatured: true,
    isTrending: true,
    isBreaking: true,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Secures domestic supply resilience for mission-critical automotive ECUs and high-performance server accelerators."
  },
  {
    id: "disc-2",
    title: "Green Hydrogen Marine Corridors: €2.4B Interconnectivity Pipeline Approved with EU Ports",
    excerpt: "Bilateral energy treaties secure offshore solar-wind grid interconnectivity to supply liquefied clean ammonia to Rotterdam and Hamburg terminals.",
    category: "Energy",
    sector: "Renewable Energy",
    country: "India-Germany Bilateral",
    source: "Energy Transition Bureau",
    author: "Vikram Sengupta · Energy Lead",
    date: "25m ago",
    readTime: "6 min read",
    likes: 418,
    comments: 34,
    impact: "€2.4B Pipeline",
    isFeatured: true,
    isTrending: true,
    isBreaking: false,
    isPremium: true,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Positions coastal export terminals as primary clean fuel suppliers for European maritime decarbonization."
  },
  {
    id: "disc-3",
    title: "Cross-Border UPI Integration Deployed Across 14 Major European and Gulf Maritime Ports",
    excerpt: "Real-time port duty and customs settlement rails via UPI go live in UAE, Singapore, and European logistics hubs, removing FX settlement delays.",
    category: "Finance",
    sector: "FinTech & Payments",
    country: "India-UAE-EU",
    source: "Financial Trade Desk",
    author: "Priya Sundaram · Trade Analyst",
    date: "1h ago",
    readTime: "4 min read",
    likes: 388,
    comments: 26,
    impact: "Instant Settlement",
    isFeatured: true,
    isTrending: true,
    isBreaking: false,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Eliminates correspondent banking delays for exporters and importers settling freight charges."
  },
  {
    id: "disc-4",
    title: "Heavy Commercial EV Battery Interoperability Protocol Mandated Across 80 Transit Corridors",
    excerpt: "Standardized 800V fast-swapping battery enclosures across national freight highways cut long-haul logistics fleet turnaround times by 45%.",
    category: "Automotive",
    sector: "Automotive & EV",
    country: "Domestic Corridors",
    source: "Automotive Logistics Bureau",
    author: "Sunita Rao · Auto Desk",
    date: "2h ago",
    readTime: "4 min read",
    likes: 290,
    comments: 18,
    impact: "+45% Turnaround",
    isFeatured: false,
    isTrending: true,
    isBreaking: false,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1558441719-8b89ec691456?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Eliminates proprietary charging barriers for freight logistics operators."
  },
  {
    id: "disc-5",
    title: "API Sovereignty Milestone: Domestic Fermentation Synthesizes 68% of Essential Bulk Drugs",
    excerpt: "Fermentation plants under the PLI bulk drug scheme go commercial, drastically reducing import dependency on active pharmaceutical ingredients.",
    category: "Healthcare",
    sector: "Pharma & Biotech",
    country: "Global Corridors",
    source: "Pharma Pulse Journal",
    author: "Dr. Ananya Sen · Pharma Lead",
    date: "3h ago",
    readTime: "5 min read",
    likes: 312,
    comments: 20,
    impact: "68% Domestic",
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Protects essential life-saving medicine supply chains against global price surges."
  },
  {
    id: "disc-6",
    title: "Tri-Service Autonomous Border UAV & Drone Avionics Cleared for Friendly Foreign Deliveries",
    excerpt: "Operational clearances awarded to indigenously designed radar guidance pods and composite airframes with overseas export pipelines.",
    category: "Defence",
    sector: "Aerospace & Defence",
    country: "Domestic & Global",
    source: "Defence Trade Review",
    author: "Col. Rajesh Verma · Defence Analyst",
    date: "5h ago",
    readTime: "7 min read",
    likes: 420,
    comments: 31,
    impact: "+54% Exports",
    isFeatured: false,
    isTrending: true,
    isBreaking: false,
    isPremium: true,
    image: "https://images.unsplash.com/photo-1517976487588-46c8209ebfa5?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Demonstrates high-tier defense manufacturing export capacity on the world stage."
  },
  {
    id: "disc-7",
    title: "Critical Mineral Refining Hub Commissioned for Domestic Lithium-Iron-Phosphate Cells",
    excerpt: "First commercial refining block processes high-purity battery grade spodumene, supporting domestic gigafactory production pipelines.",
    category: "Mining",
    sector: "Mining & Rare Earths",
    country: "India-Australia Corridor",
    source: "Mineral Economics Bureau",
    author: "Kavita Nair · Commodities",
    date: "7h ago",
    readTime: "6 min read",
    likes: 275,
    comments: 15,
    impact: "Raw Material Security",
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Secures battery precursor materials against international export export quotas."
  },
  {
    id: "disc-8",
    title: "Deep-Sea Automated Port Terminals Cut Berth Latency by 38% at Western Gateways",
    excerpt: "AI-driven container stowage and electric gantry cranes clear 24,000 TEU mega-vessels within 18 hours across primary maritime hubs.",
    category: "Logistics",
    sector: "Logistics & Maritime",
    country: "Global Trade Gateway",
    source: "Maritime Shipping Council",
    author: "Capt. Raghavan Iyer · Maritime Desk",
    date: "9h ago",
    readTime: "4 min read",
    likes: 315,
    comments: 19,
    impact: "-38% Berth Latency",
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Drastically lowers shipping demurrage fees and supply chain friction for global traders."
  },
  {
    id: "disc-9",
    title: "Autonomous Multispectral Drones Deployed Across 1.2M Hectares of High-Yield Cash Crops",
    excerpt: "Precision spraying and soil moisture mapping protocols boost harvest yield predictability while cutting chemical input costs by 30%.",
    category: "Agriculture",
    sector: "AgriTech & Food",
    country: "Domestic Corridors",
    source: "AgriTech Innovation Council",
    author: "Sunil Patel · Agri Lead",
    date: "11h ago",
    readTime: "5 min read",
    likes: 260,
    comments: 14,
    impact: "+22% Yield Margin",
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Improves farmer realizations and satisfies international organic export standards."
  },
  {
    id: "disc-10",
    title: "Next-Gen 6G Terahertz Testbed and Open RAN Telecommunications Sandbox Inaugurated",
    excerpt: "Telecom engineering consortia initiate high-frequency beamforming trials supporting low-latency industrial robotics and automated fab controls.",
    category: "Technology",
    sector: "Telecommunications",
    country: "Global R&D Hubs",
    source: "Department of Telecommunications",
    author: "Aditya Mehta · Telecom Tech",
    date: "14h ago",
    readTime: "6 min read",
    likes: 395,
    comments: 24,
    impact: "Sub-1ms Latency",
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Establishes sovereign standard essential patents (SEPs) for next-decade enterprise networks."
  },
  {
    id: "disc-11",
    title: "Sponsored Insight: Automating Cross-Border Customs Single-Window Systems for Global Shippers",
    excerpt: "Learn how enterprise cloud platforms eliminate paper clearance latency across 40 maritime ports with unified automated APIs.",
    category: "Logistics",
    sector: "Logistics & Maritime",
    country: "Global Maritime Gateway",
    source: "Enterprise Cloud Partner",
    author: "Sponsored Content",
    date: "Sponsored",
    readTime: "3 min read",
    likes: 180,
    comments: 9,
    impact: "Partner Solution",
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    isPremium: false,
    isSponsored: true,
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Verified enterprise software offering for international trade operators."
  },
  {
    id: "disc-12",
    title: "Green Cement & Slag Composites Approved for High-Speed Freight Transit Infrastructure",
    excerpt: "Fly-ash geopolymers and recycled steel slag composite materials achieve structural load certifications across 12 high-speed transit routes.",
    category: "Construction",
    sector: "Construction & Infrastructure",
    country: "National Infrastructure",
    source: "National Highways Infrastructure",
    author: "Meera Joshi · Infra Lead",
    date: "1 day ago",
    readTime: "5 min read",
    likes: 240,
    comments: 11,
    impact: "-45% Carbon Footprint",
    isFeatured: false,
    isTrending: false,
    isBreaking: false,
    isPremium: false,
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?w=800&auto=format&fit=crop&q=80",
    whyItMatters: "Meets international green procurement standards required for multilateral project financing."
  }
];

const TAXONOMY_CATEGORIES = [
  "All",
  "Technology",
  "Energy",
  "Finance",
  "Automotive",
  "Healthcare",
  "Defence",
  "Logistics",
  "Mining",
  "Agriculture",
  "Construction"
];

export default function NewsPOCFullDiscoveryView({
  initialCategory = "All",
  initialTopic,
  contextTitle,
  contextSubtitle,
  contextBadge,
  breadcrumbSource,
  onBack
}: NewsPOCFullDiscoveryViewProps) {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedNewsType, setSelectedNewsType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOption, setSortOption] = useState<"latest" | "trending" | "mostRead">("latest");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);

  // Engagement states
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [followedCategories, setFollowedCategories] = useState<string[]>(["Technology", "Energy"]);
  const [sharedArticleId, setSharedArticleId] = useState<string | null>(null);
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>("");
  const [articleComments, setArticleComments] = useState<Record<string, { author: string; text: string; time: string }[]>>({});

  // Alert & Newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState<string>("");
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  const handleLike = (id: string) => {
    setLikedArticles((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSave = (id: string) => {
    setSavedArticles((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleShare = (id: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/en/news-poc/article/${id}`);
    }
    setSharedArticleId(id);
    setTimeout(() => setSharedArticleId(null), 2500);
  };

  const handleFollowCategory = (cat: string) => {
    setFollowedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleAddComment = (id: string) => {
    if (!commentInput.trim()) return;
    setArticleComments((prev) => ({
      ...prev,
      [id]: [...(prev[id] || []), { author: "You", text: commentInput.trim(), time: "Just now" }]
    }));
    setCommentInput("");
  };

  // Filtered stories
  const filteredStories = useMemo(() => {
    return ALL_DISCOVERY_STORIES.filter((item) => {
      const matchCat = selectedCategory === "All" || item.category === selectedCategory;
      const matchType =
        selectedNewsType === "All" ||
        (selectedNewsType === "Trending" && item.isTrending) ||
        (selectedNewsType === "Breaking" && item.isBreaking) ||
        (selectedNewsType === "Featured" && item.isFeatured) ||
        (selectedNewsType === "Premium" && item.isPremium);
      const matchSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchType && matchSearch;
    }).sort((a, b) => {
      if (sortOption === "trending") return (b.likes + b.comments) - (a.likes + a.comments);
      if (sortOption === "mostRead") return b.likes - a.likes;
      return 0; // default latest
    });
  }, [selectedCategory, selectedNewsType, searchQuery, sortOption]);

  const featuredStories = ALL_DISCOVERY_STORIES.filter((s) => s.isFeatured).slice(0, 3);
  const trendingStories = ALL_DISCOVERY_STORIES.filter((s) => s.isTrending).slice(0, 5);
  const mostReadStories = [...ALL_DISCOVERY_STORIES].sort((a, b) => b.likes - a.likes).slice(0, 5);

  const displayTitle = contextTitle || (selectedCategory === "All" ? "Full News Discovery Hub" : `${selectedCategory} News & Market Updates`);
  const displaySubtitle = contextSubtitle || "Stay informed with real-time news, verified corporate disclosures, cross-border trade agreements, and market-moving developments.";
  const displayBadge = contextBadge || "GLOBAL NEWS SEARCH & DISCOVERY";

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-20 transition-colors">

      {/* ── 01. BREADCRUMB & HEADER ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (onBack) onBack();
                else router.back();
              }}
              className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:text-blue-600 transition-colors shadow-xs"
              aria-label="Go back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs">
                <Link href="/en/news-poc" className="text-gray-500 hover:text-blue-600">Home</Link>
                {breadcrumbSource && breadcrumbSource.length > 0 ? (
                  breadcrumbSource.map((crumb, i) => (
                    <span key={i} className="flex items-center gap-2">
                      <span className="text-gray-400">/</span>
                      {crumb.href ? (
                        <Link href={crumb.href} className="text-gray-500 hover:text-blue-600">{crumb.label}</Link>
                      ) : (
                        <span className="text-gray-500">{crumb.label}</span>
                      )}
                    </span>
                  ))
                ) : (
                  <>
                    <span className="text-gray-400">/</span>
                    <Link href="/en/news-poc/feed" className="text-gray-500 hover:text-blue-600">Feed</Link>
                  </>
                )}
                <span className="text-gray-400">/</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {contextTitle ? "Forecasts & Discovery" : (selectedCategory === "All" ? "All News Discovery" : `${selectedCategory} News`)}
                </span>
              </div>
              <h1 className="font-display text-xl md:text-2xl font-bold leading-tight mt-1 text-gray-900 dark:text-white">
                {displayTitle}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/40 flex items-center gap-1.5 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              Live News Stream
            </span>
          </div>
        </div>
      </section>

      {/* ── 02. COMPACT HERO & SEARCH BAR ───────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="bg-gradient-to-br from-slate-950 via-[#0f172a] to-blue-950 text-white rounded-3xl p-6 md:p-8 border border-slate-800 shadow-md space-y-4">
          <div className="max-w-3xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-400 bg-blue-950/80 border border-blue-800 px-2.5 py-0.5 rounded-full">
                {displayBadge}
              </span>
              <span className="text-[10px] text-slate-400">Over 1,400+ verified trade briefs streaming</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight">
              {displayTitle}
            </h2>
            <p className="text-xs md:text-sm text-slate-300 font-normal leading-relaxed">
              {displaySubtitle}
            </p>
          </div>

          {/* Search bar & quick filter pills */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 pt-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search news, companies, industries, topics, or commodities..."
                className="w-full rounded-xl bg-white/10 border border-white/20 py-2.5 pl-10 pr-4 text-xs text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-400 backdrop-blur-xs"
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-slate-400 hover:text-white px-3 py-2"
              >
                Clear Search
              </button>
            )}
            <button
              onClick={() => setShowFilterDrawer(true)}
              className="md:hidden bg-blue-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center justify-center gap-1.5"
            >
              <Filter className="h-3.5 w-3.5" /> Filters
            </button>
          </div>
        </div>
      </section>

      {/* ── 03. HORIZONTAL CATEGORY NAVIGATION BAR ───────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 sticky top-0 z-20 bg-gray-50/95 dark:bg-[#070b12]/95 backdrop-blur-md pb-2">
        <div className="bg-white dark:bg-[#0f172a] p-3 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs flex-1">
            {TAXONOMY_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(6);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-bold transition-all shrink-0 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-2 shrink-0">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as any)}
              className="text-xs font-bold border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-3 py-1.5 rounded-xl outline-none"
            >
              <option value="latest">Sort: Latest</option>
              <option value="trending">Sort: Trending</option>
              <option value="mostRead">Sort: Most Read</option>
            </select>
          </div>
        </div>
      </section>

      {/* ── 04. FEATURED STORIES GRID ────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2.5">
            <h3 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Flame className="h-4 w-4 text-orange-500" /> Featured & High-Impact Stories
            </h3>
            <span className="text-[10px] font-bold text-blue-600 font-mono">Curated Editorial</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xs hover:border-blue-400 transition-all flex flex-col justify-between group"
              >
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    {story.category}
                  </span>
                  {story.isPremium && (
                    <span className="absolute top-3 right-3 bg-purple-600 text-white text-[8px] font-bold px-2 py-0.5 rounded font-mono">
                      PREMIUM
                    </span>
                  )}
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] text-gray-400">
                      <span>{story.source}</span>
                      <span>{story.date}</span>
                    </div>
                    <Link href={`/en/news-poc/article/${story.id}`}>
                      <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                        {story.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-emerald-600 font-bold font-mono">{story.impact}</span>
                    <Link href={`/en/news-poc/article/${story.id}`} className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-0.5">
                      Read Story →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05. MAIN FEED & SIDEBAR LAYOUT ───────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
        <div className="grid grid-cols-12 gap-8">

          {/* LEFT 8-COLUMN: MAIN NEWS FEED */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Clock className="h-4.5 w-4.5 text-blue-500" />
                  Latest Streaming News
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">Chronological trade dispatches and verified market coverage.</p>
              </div>
              <span className="text-xs font-bold text-gray-400 font-mono">
                {filteredStories.length} Stories Found
              </span>
            </div>

            {/* Stories List */}
            <div className="space-y-6">
              {filteredStories.slice(0, visibleCount).map((art) => {
                const isLiked = likedArticles.includes(art.id);
                const isSaved = savedArticles.includes(art.id);
                const isShared = sharedArticleId === art.id;
                const isCommentOpen = openCommentId === art.id;
                const isFollowed = followedCategories.includes(art.category);
                const comments = articleComments[art.id] || [];

                return (
                  <div
                    key={art.id}
                    className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-xs hover:border-blue-400 transition-all flex flex-col md:flex-row group"
                  >
                    {/* Thumbnail */}
                    <div className="md:w-64 md:shrink-0 relative overflow-hidden bg-slate-900 min-h-[200px] md:min-h-full">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded">
                        {art.category}
                      </span>
                      {art.isSponsored && (
                        <span className="absolute top-3 right-3 bg-amber-500 text-slate-950 text-[8px] font-bold px-2 py-0.5 rounded font-mono">
                          SPONSORED
                        </span>
                      )}
                    </div>

                    {/* Content Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/30">
                              {art.sector}
                            </span>
                            <span className="text-gray-400 text-[10px]">·</span>
                            <span className="text-[10px] text-gray-500 font-medium">{art.country}</span>
                          </div>
                          <button
                            onClick={() => handleFollowCategory(art.category)}
                            className={`text-[9px] font-bold px-2 py-0.5 rounded-lg transition-colors ${
                              isFollowed
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-blue-600"
                            }`}
                          >
                            {isFollowed ? "Following" : "+ Follow"}
                          </button>
                        </div>

                        <Link href={`/en/news-poc/article/${art.id}`}>
                          <h3 className="font-display text-base md:text-lg font-bold text-gray-950 dark:text-white group-hover:text-blue-600 transition-colors leading-snug">
                            {art.title}
                          </h3>
                        </Link>

                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
                          {art.excerpt}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-gray-400 font-medium">
                          <span className="text-gray-700 dark:text-gray-300 font-semibold">{art.source}</span>
                          <span>·</span>
                          <span>{art.author}</span>
                          <span>·</span>
                          <span>{art.date}</span>
                          <span>·</span>
                          <span>{art.readTime}</span>
                          <span className="ml-auto font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                            {art.impact}
                          </span>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleLike(art.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                              isLiked
                                ? "border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-600 font-bold"
                                : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-500"
                            }`}
                          >
                            <Heart className={`h-3.5 w-3.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                            <span>{art.likes + (isLiked ? 1 : 0)}</span>
                          </button>

                          <button
                            onClick={() => setOpenCommentId(isCommentOpen ? null : art.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-blue-600"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            <span>{art.comments + comments.length}</span>
                          </button>

                          <button
                            onClick={() => handleSave(art.id)}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
                              isSaved
                                ? "border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-950/30 text-purple-600 font-bold"
                                : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600"
                            }`}
                          >
                            <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-purple-600 text-purple-600" : ""}`} />
                            <span>{isSaved ? "Saved" : "Save"}</span>
                          </button>

                          <button
                            onClick={() => handleShare(art.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-emerald-600"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                            <span>{isShared ? "Copied!" : "Share"}</span>
                          </button>
                        </div>

                        <Link
                          href={`/en/news-poc/article/${art.id}`}
                          className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 ml-auto"
                        >
                          Read Story <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>

                      {/* Inline Comment Drawer */}
                      {isCommentOpen && (
                        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3 bg-gray-50/70 dark:bg-gray-900/40 -mx-6 -mb-6 p-6 rounded-b-3xl">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                            <MessageSquare className="h-3.5 w-3.5 text-blue-500" />
                            Discussion & Trade Notes ({art.comments + comments.length})
                          </h4>
                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="text"
                              value={commentInput}
                              onChange={(e) => setCommentInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleAddComment(art.id);
                              }}
                              placeholder="Add your trade perspective..."
                              className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0f172a] px-3.5 py-2 text-xs outline-none focus:border-blue-500"
                            />
                            <button
                              onClick={() => handleAddComment(art.id)}
                              className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-xl"
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Stories Action */}
            <div className="text-center pt-6 space-y-4">
              {visibleCount < filteredStories.length ? (
                <button
                  onClick={() => {
                    setIsLoadingMore(true);
                    setTimeout(() => {
                      setVisibleCount((prev) => prev + 6);
                      setIsLoadingMore(false);
                    }, 400);
                  }}
                  disabled={isLoadingMore}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 text-xs font-bold px-8 py-3.5 rounded-2xl shadow-xs transition-all flex items-center gap-2 mx-auto"
                >
                  {isLoadingMore ? (
                    <>
                      <span className="inline-block h-3.5 w-3.5 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                      <span>Loading more stories...</span>
                    </>
                  ) : (
                    <>
                      <span>Load More Stories ↓</span>
                      <span className="text-[10px] text-gray-400 font-mono">({filteredStories.length - visibleCount} remaining)</span>
                    </>
                  )}
                </button>
              ) : (
                <div className="p-6 bg-gray-50 dark:bg-gray-900/60 rounded-3xl border border-gray-200 dark:border-gray-800 space-y-3 max-w-xl mx-auto">
                  <span className="text-xs font-bold text-gray-900 dark:text-white block">
                    ✓ You're all caught up.
                  </span>
                  <p className="text-[11px] text-gray-500">
                    Explore trending stories across global sectors, industry benchmarks, or country trade hubs.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        setSortOption("trending");
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-bold px-3.5 py-1.5 rounded-xl hover:text-blue-600 transition-colors shadow-xs"
                    >
                      Explore Trending →
                    </button>
                    <Link
                      href="/en/news-poc/sector-news/industry"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl transition-colors shadow-xs"
                    >
                      Explore Industry Intelligence →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 4-COLUMN: TRENDING, MOST READ & ENGAGEMENT SIDEBAR */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* ── TRENDING SECTORS ── */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
              <div className="border-b border-gray-200/60 dark:border-gray-800 pb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                  <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                  Trending Sectors
                </span>
                <span className="text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 px-2 py-0.5 rounded">
                  High Traffic
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {TRENDING_SECTORS.map((trend) => (
                  <button
                    key={trend.name}
                    className="p-2.5 bg-gray-50 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 transition-all flex items-center justify-between group text-left w-full cursor-default"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{trend.flag}</span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors block">
                          {trend.name}
                        </span>
                        <span className="text-[9px] text-gray-400 block font-normal">{trend.desc}</span>
                      </div>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${trend.bg} ${trend.color} shrink-0`}>
                      {trend.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Now */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-500" />
                  Trending Now
                </h4>
                <span className="text-[9px] font-bold text-blue-600 font-mono">Live Velocity</span>
              </div>
              <div className="space-y-3">
                {trendingStories.map((item, idx) => (
                  <Link
                    key={item.id}
                    href={`/en/news-poc/article/${item.id}`}
                    className="block p-3 rounded-2xl bg-gray-50 dark:bg-gray-900/60 hover:bg-blue-50/50 dark:hover:bg-gray-900 transition-all border border-gray-100 dark:border-gray-800 space-y-1 group"
                  >
                    <div className="flex items-center justify-between text-[9px]">
                      <span className="font-bold text-blue-600">{item.category}</span>
                      <span className="text-gray-400">{item.date}</span>
                    </div>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 leading-snug line-clamp-2">
                      {item.title}
                    </h5>
                  </Link>
                ))}
              </div>
            </div>

            {/* Most Read Leaderboard */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  Most Read Across IGEN
                </h4>
                <span className="text-[9px] text-gray-400 font-mono">This Week</span>
              </div>
              <div className="space-y-2.5">
                {mostReadStories.map((story, idx) => (
                  <Link
                    key={story.id}
                    href={`/en/news-poc/article/${story.id}`}
                    className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group"
                  >
                    <span className="font-display font-bold text-base text-gray-300 dark:text-gray-700 group-hover:text-blue-600 font-mono">
                      0{idx + 1}
                    </span>
                    <div className="space-y-0.5 flex-1">
                      <h5 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 line-clamp-2 leading-snug">
                        {story.title}
                      </h5>
                      <span className="text-[10px] text-gray-400 block">{story.source} · {story.readTime}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Stay Ahead Newsletter */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-3">
              <div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-blue-600 block">
                  DAILY BRIEFING
                </span>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white mt-0.5">
                  Stay Ahead of Global Industry News
                </h4>
                <p className="text-[11px] text-gray-500 mt-1">
                  Get the top 5 strategic business stories delivered directly to your inbox every morning.
                </p>
              </div>

              {isSubscribed ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-xl text-center">
                  ✓ Subscribed! Check your inbox for confirmation.
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="work@company.com"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-xs outline-none focus:border-blue-500"
                  />
                  <button
                    onClick={() => {
                      if (newsletterEmail) setIsSubscribed(true);
                    }}
                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-950 hover:bg-blue-600 dark:hover:bg-blue-600 dark:hover:text-white font-bold text-xs py-2 rounded-xl transition-colors"
                  >
                    Subscribe Free
                  </button>
                </div>
              )}
            </div>

            {/* Go Beyond the News — Intelligence Cross-Sell */}
            <div className="p-5 bg-gradient-to-br from-purple-950 to-slate-950 text-white rounded-3xl border border-purple-900/60 shadow-md space-y-3">
              <span className="text-[9px] font-bold uppercase tracking-widest text-purple-400 block font-mono">
                ENTERPRISE UPGRADE
              </span>
              <h4 className="text-sm font-bold text-white leading-snug">
                Go Beyond the News with Industry Intelligence
              </h4>
              <p className="text-xs text-purple-200 font-normal leading-relaxed">
                News tells you what happened. Industry Intelligence helps you understand market trends, forecast models, and CapEx signals.
              </p>
              <Link
                href="/en/news-poc/sector-news/industry"
                className="block text-center w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors shadow-xs"
              >
                Explore Intelligence Suite →
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* ── 06. EXPLORE BY INDUSTRY & COUNTRY CROSS-DISCOVERY ────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-12 lg:px-6">
        <div className="bg-white dark:bg-[#0f172a] rounded-3xl border border-gray-200 dark:border-gray-800 p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Explore More Sectors
              </span>
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mt-1">
                Explore News by Industry Vertical
              </h3>
            </div>
            <Link href="/en/news-poc/feed/industry/all" className="text-xs font-bold text-blue-600 hover:underline">
              All 50 Sectors →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { name: "Semiconductors", count: "32 Stories", icon: Cpu },
              { name: "Renewable Energy", count: "28 Stories", icon: Zap },
              { name: "Automotive & EV", count: "24 Stories", icon: Car },
              { name: "Pharma & Biotech", count: "21 Stories", icon: Layers },
              { name: "Aerospace Defence", count: "19 Stories", icon: Globe },
              { name: "FinTech & Banking", count: "18 Stories", icon: Scale }
            ].map((ind, idx) => {
              const IconComp = ind.icon || Layers;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCategory(ind.name.split(" ")[0]);
                    window.scrollTo({ top: 250, behavior: "smooth" });
                  }}
                  className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-150/50 dark:border-gray-800 hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-gray-900 transition-all text-left space-y-1.5 group"
                >
                  <IconComp className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                  <h5 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 block">
                    {ind.name}
                  </h5>
                  <span className="text-[10px] text-gray-400 block font-mono">{ind.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 07. FINAL CONVERSION CTA ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 lg:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-[#0f172a] to-blue-950 text-white p-8 md:p-12 border border-slate-800 text-center space-y-4 shadow-md">
          <span className="bg-blue-600 text-white text-[10px] font-mono font-bold uppercase px-3 py-1 rounded-full inline-block font-mono">
            GLOBAL B2B DISCOVERY
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold max-w-2xl mx-auto leading-tight text-white">
            Access Verified Global Trade & Industry News
          </h2>
          <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Customize alerts, download peer-reviewed trade research briefs, and follow emerging leadership across 50 strategic sectors.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              Get Started Free
            </Link>
            <Link
              href="/eoi"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              Explore Enterprise Plans →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

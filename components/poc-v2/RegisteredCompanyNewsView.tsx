"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Building2,
  CheckCircle,
  Crown,
  Search,
  TrendingUp,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Star,
  Globe,
  Briefcase,
  MapPin,
  Users,
  Mail,
  Phone,
  Calendar,
  Download,
  Shield,
  Lock,
  Eye,
  Share2,
  Bookmark,
  Award,
  FileText,
  Sparkles,
  Filter,
  Plus,
  ExternalLink,
  MessageSquare,
  Target,
  Zap,
  Flame,
  SlidersHorizontal,
  ArrowUpRight,
  HelpCircle,
  Check,
  Clock,
} from "lucide-react";

// ─── Interfaces ─────────────────────────────────────────────────────────────

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  companyId: string;
  companyName: string;
  companyInitials?: string;
  companyTier: "registered" | "verified" | "top";
  industry: string;
  industryId: string;
  country: string;
  countryCode: string;
  publishedAt: string;
  readingTimeMinutes: number;
  viewCount: number;
  shareCount: number;
  commentCount: number;
  isBookmarked: boolean;
  isSponsored: boolean;
  isBreaking?: boolean;
  category:
    | "Product Launch"
    | "Deal Announcement"
    | "Financial Update"
    | "Milestone"
    | "Partnership"
    | "Investment"
    | "ESG"
    | "Announcement"
    | "Expansion"
    | "M&A"
    | "Corporate Restructure"
    | "Leadership Change";
}

// ─── Local UI Components ─────────────────────────────────────────────────────

function Card({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ title, action, subtitle }: { title: string; action?: React.ReactNode; subtitle?: string }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 pb-3 mb-4 space-y-1">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">{title}</h2>
        {action}
      </div>
      {subtitle && <p className="text-[10px] text-gray-500 font-normal">{subtitle}</p>}
    </div>
  );
}

function Badge({ children, color = "blue" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-200 dark:border-blue-900/40",
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200 dark:border-emerald-900/40",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200 dark:border-amber-900/40",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 border border-purple-200 dark:border-purple-900/40",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-200 dark:border-rose-900/40",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.blue}`}>
      {children}
    </span>
  );
}

// ─── Seed Data ───────────────────────────────────────────────────────────────

const MASTER_NEWS: NewsItem[] = [
  {
    id: "news-1",
    title: "Adani Green commissions world's largest renewable energy park in Khavda.",
    summary: "Adani Green commissions a 20 GW clean energy generation site in Gujarat, reinforcing India's bilateral climate roadmap pledges.",
    content: "Adani Green Energy has successfully energized its flagship 20 GW hybrid solar-wind energy installation at Khavda. The project will generate sufficient carbon-free electricity to power 16 million homes annually, establishing the firm as a global clean energy superpower.",
    companyId: "co-3",
    companyName: "Adani Green Energy Ltd.",
    companyInitials: "AG",
    companyTier: "top",
    industry: "Renewable Energy",
    industryId: "renewable-energy",
    country: "India",
    countryCode: "IN",
    publishedAt: "35 min ago",
    readingTimeMinutes: 4,
    viewCount: 48200,
    shareCount: 2300,
    commentCount: 450,
    isBookmarked: false,
    isSponsored: true,
    isBreaking: true,
    category: "Milestone",
  },
  {
    id: "news-2",
    title: "NexusTech Logistics signs 3-year automated contract with Maruti Suzuki.",
    summary: "Pro-Verified NexusTech will deploy clean AI-driven container tracking telemetry across Maruti Suzuki's bilateral logistics routes.",
    content: "NexusTech Logistics has greenlit a strategic 3-year contract with Maruti Suzuki. The agreement will implement smart telemetry devices across automotive supply lines, improving last-mile transit efficiency by over 22% while offsetting logistics greenhouse footprints.",
    companyId: "co-8",
    companyName: "NexusTech Logistics Solutions",
    companyInitials: "NL",
    companyTier: "verified",
    industry: "Logistics & Supply Chain",
    industryId: "logistics",
    country: "India",
    countryCode: "IN",
    publishedAt: "2 hours ago",
    readingTimeMinutes: 3,
    viewCount: 12400,
    shareCount: 650,
    commentCount: 92,
    isBookmarked: true,
    isSponsored: false,
    category: "Deal Announcement",
  },
  {
    id: "news-3",
    title: "Sunrise Agro Exports signs Gulf trade corridor spice export treaty.",
    summary: "Registered agro exporter Sunrise Agro secures new bilateral export distribution pipelines for Middle East organic spices.",
    content: "Sunrise Agro Exports has completed a bilateral distribution framework agreement with leading grocery chains in Dubai and Abu Dhabi. The deal will enable Sunrise to export premium certified cardamom, cumin and turmeric seeds from Maharashtra to Gulf markets starting Q4 2026.",
    companyId: "co-7",
    companyName: "Sunrise Agro Exports Pvt. Ltd.",
    companyInitials: "SA",
    companyTier: "registered",
    industry: "Agriculture & Food Processing",
    industryId: "agriculture",
    country: "India",
    countryCode: "IN",
    publishedAt: "1 day ago",
    readingTimeMinutes: 2,
    viewCount: 1840,
    shareCount: 42,
    commentCount: 5,
    isBookmarked: false,
    isSponsored: false,
    category: "Deal Announcement",
  },
  {
    id: "news-4",
    title: "Tata Steel announces transition to clean electric arc furnace at UK plant.",
    summary: "Tata Steel pledges $1.2B green transition capital for coal-free recycling smelters at Port Talbot steelworks.",
    companyId: "co-1",
    companyName: "Tata Steel Ltd.",
    companyInitials: "TS",
    companyTier: "top",
    industry: "Steel & Metallurgy",
    industryId: "steel-metallurgy",
    country: "United Kingdom",
    countryCode: "GB",
    publishedAt: "4 hours ago",
    readingTimeMinutes: 5,
    viewCount: 31200,
    shareCount: 1450,
    commentCount: 220,
    isBookmarked: false,
    isSponsored: false,
    isBreaking: true,
    category: "Investment",
  },
  {
    id: "news-5",
    title: "Cipla secures FDA approval for green inhaler respiratory drug.",
    summary: "Verified pharma leader Cipla receives regulatory nod for bio-equivalent respiratory generic, targeting US generic markets.",
    companyId: "co-4",
    companyName: "Cipla Pharmaceuticals Ltd.",
    companyInitials: "CP",
    companyTier: "verified",
    industry: "Pharmaceuticals",
    industryId: "pharmaceuticals",
    country: "India",
    countryCode: "IN",
    publishedAt: "5 hours ago",
    readingTimeMinutes: 3,
    viewCount: 18400,
    shareCount: 820,
    commentCount: 145,
    isBookmarked: false,
    isSponsored: false,
    category: "Product Launch",
  },
  {
    id: "news-6",
    title: "L&T wins greenfield hydrogen terminal project pipeline in Abu Dhabi.",
    summary: "L&T Heavy Engineering secures megaproject EPC bid for green hydrogen export pipeline networks in the UAE.",
    companyId: "co-10",
    companyName: "Larsen & Toubro Ltd. (L&T)",
    companyInitials: "LT",
    companyTier: "top",
    industry: "Construction & Engineering",
    industryId: "construction-engineering",
    country: "UAE",
    countryCode: "AE",
    publishedAt: "1 day ago",
    readingTimeMinutes: 4,
    viewCount: 29500,
    shareCount: 1280,
    commentCount: 198,
    isBookmarked: false,
    isSponsored: false,
    category: "Deal Announcement",
  },
  {
    id: "news-7",
    title: "Tesla proposes major EV assembly gigafactory layout for India trade corridor.",
    summary: "Elon Musk meets bilateral trade ministers to finalize $3B EV vehicle assembly plant locations in Gujarat and Tamil Nadu.",
    companyId: "co-11",
    companyName: "Tesla Inc.",
    companyInitials: "TL",
    companyTier: "top",
    industry: "Automotive & EV",
    industryId: "automotive-ev",
    country: "United States",
    countryCode: "US",
    publishedAt: "3 hours ago",
    readingTimeMinutes: 6,
    viewCount: 84000,
    shareCount: 4200,
    commentCount: 940,
    isBookmarked: false,
    isSponsored: false,
    isBreaking: true,
    category: "Expansion",
  },
  {
    id: "news-8",
    title: "Siemens grid software integration partnership with Singapore Power grid.",
    summary: "Siemens AG enters digital twin telemetry grid deployment to optimize grid resilience across Singapore.",
    companyId: "co-12",
    companyName: "Siemens Industrial AG",
    companyInitials: "SI",
    companyTier: "verified",
    industry: "Manufacturing & Equipment",
    industryId: "manufacturing-equipment",
    country: "Singapore",
    countryCode: "SG",
    publishedAt: "2 days ago",
    readingTimeMinutes: 4,
    viewCount: 15400,
    shareCount: 410,
    commentCount: 65,
    isBookmarked: false,
    isSponsored: false,
    category: "Partnership",
  },
  {
    id: "news-9",
    title: "BioNTech initiates Phase II clinical trial of mRNA cancer vaccine.",
    summary: "Germany medical pioneer BioNTech doses first patient with individualized oncology vaccine candidate BNT122.",
    companyId: "co-13",
    companyName: "BioNTech SE",
    companyInitials: "BN",
    companyTier: "verified",
    industry: "Healthcare",
    industryId: "healthcare",
    country: "Germany",
    countryCode: "DE",
    publishedAt: "3 days ago",
    readingTimeMinutes: 4,
    viewCount: 22000,
    shareCount: 910,
    commentCount: 180,
    isBookmarked: false,
    isSponsored: false,
    category: "Milestone",
  },
  {
    id: "news-10",
    title: "G42 AI Group partners with leading US tech firms for Abu Dhabi compute centers.",
    summary: "Sovereign AI orchestrator G42 secures $1.5B investment to scale global compute infrastructure.",
    companyId: "co-14",
    companyName: "G42 AI Group",
    companyInitials: "G4",
    companyTier: "top",
    industry: "IT & Technology",
    industryId: "it-technology",
    country: "UAE",
    countryCode: "AE",
    publishedAt: "12 hours ago",
    readingTimeMinutes: 5,
    viewCount: 38900,
    shareCount: 1950,
    commentCount: 310,
    isBookmarked: false,
    isSponsored: true,
    isBreaking: true,
    category: "Investment",
  },
  {
    id: "news-corp-1",
    title: "Sunrise Agro Appoints New Managing Director to Head Global Trade Division",
    summary: "Sunrise Agro Exports appoints a new MD to direct its expanding global agricultural trade corridors.",
    companyName: "Sunrise Agro Exports",
    companyId: "co-7",
    companyTier: "registered",
    industry: "Agriculture",
    industryId: "agriculture",
    country: "India",
    countryCode: "IN",
    publishedAt: "2 days ago",
    readingTimeMinutes: 2,
    viewCount: 1840,
    shareCount: 42,
    commentCount: 5,
    isBookmarked: false,
    isSponsored: false,
    isBreaking: true,
    category: "Leadership Change",
  },
  {
    id: "news-corp-2",
    title: "Adani Green Board Approves Greenfield Solar Investment Capacity Structure",
    summary: "Adani Green Board clears greenfield solar allocation structures to speed up gigawatt scale installations.",
    companyName: "Adani Green Energy",
    companyId: "co-3",
    companyTier: "top",
    industry: "Renewable Energy",
    industryId: "renewable-energy",
    country: "India",
    countryCode: "IN",
    publishedAt: "1 week ago",
    readingTimeMinutes: 3,
    viewCount: 48200,
    shareCount: 2300,
    commentCount: 450,
    isBookmarked: false,
    isSponsored: true,
    isBreaking: true,
    category: "Corporate Restructure",
  },
];

const INDUSTRIES_LIST = [
  { id: "steel-metallurgy", name: "Steel & Metallurgy", count: 142, icon: "⚙️" },
  { id: "logistics", name: "Logistics & Supply Chain", count: 231, icon: "🚢" },
  { id: "renewable-energy", name: "Renewable Energy", count: 174, icon: "⚡" },
  { id: "pharmaceuticals", name: "Pharmaceuticals", count: 195, icon: "💊" },
  { id: "it-technology", name: "IT & Technology", count: 312, icon: "💻" },
  { id: "construction-engineering", name: "Construction & Engineering", count: 188, icon: "🏗️" },
  { id: "automotive-ev", name: "Automotive & EV", count: 218, icon: "🚗" },
  { id: "agriculture", name: "Agriculture & Food Processing", count: 158, icon: "🌾" },
];

const COUNTRIES_LIST = [
  { code: "IN", name: "India", count: 142, flag: "🇮🇳" },
  { code: "US", name: "United States", count: 85, flag: "🇺🇸" },
  { code: "DE", name: "Germany", count: 48, flag: "🇩🇪" },
  { code: "AE", name: "UAE", count: 32, flag: "🇦🇪" },
  { code: "SG", name: "Singapore", count: 29, flag: "🇸🇬" },
  { code: "GB", name: "United Kingdom", count: 22, flag: "🇬🇧" },
];

export default function RegisteredCompanyNewsView() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  // ─── States ───────────────────────────────────────────────────────────────

  const [searchQuery, setSearchQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState("all");

  // Advanced Filters
  const [advFilters, setAdvFilters] = useState({
    industry: "all",
    country: "all",
    category: "all",
    tier: "all",
    isSponsored: "all",
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Trending & Most Read tabs
  const [trendingPeriod, setTrendingPeriod] = useState<"today" | "week" | "month">("week");
  const [mostReadPeriod, setMostReadPeriod] = useState<"today" | "7d" | "30d">("7d");

  // Local Watchlist / Bookmark list
  const [watchlist, setWatchlist] = useState<string[]>(["co-8"]); // followed company IDs
  const [bookmarks, setBookmarks] = useState<string[]>(["news-2"]); // bookmarked news IDs

  // Direct Enquiry modal
  const [enquiryCompany, setEnquiryCompany] = useState<{ id: string; name: string; tier: string } | null>(null);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  // Alert State
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    term: "",
    type: "all",
  });

  // Story details modal preview
  const [selectedStory, setSelectedStory] = useState<NewsItem | null>(null);

  // ─── Filtering Logic ───────────────────────────────────────────────────────

  const filteredNews = MASTER_NEWS.filter((story) => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        story.title.toLowerCase().includes(q) ||
        story.summary.toLowerCase().includes(q) ||
        story.companyName.toLowerCase().includes(q) ||
        story.industry.toLowerCase().includes(q) ||
        story.category.toLowerCase().includes(q);
      if (!matchSearch) return false;
    }

    // 2. Quick Filters
    if (quickFilter !== "all") {
      if (quickFilter === "latest" && story.publishedAt.includes("day")) return false; // simulated latest
      if (quickFilter === "trending" && story.viewCount < 20000) return false;
      if (quickFilter === "breaking" && !story.isBreaking) return false;
      if (quickFilter === "most_read" && story.viewCount < 25000) return false;
      if (quickFilter === "launches" && story.category !== "Product Launch") return false;
      if (quickFilter === "announcements" && story.category !== "Announcement" && story.category !== "Milestone") return false;
      if (quickFilter === "partnerships" && story.category !== "Partnership") return false;
      if (quickFilter === "investments" && story.category !== "Investment") return false;
      if (quickFilter === "expansion" && story.category !== "Expansion") return false;
      if (quickFilter === "deals" && story.category !== "Deal Announcement") return false;
    }

    // 3. Advanced Filters
    if (advFilters.industry !== "all" && story.industryId !== advFilters.industry) return false;
    if (advFilters.country !== "all" && story.countryCode !== advFilters.country) return false;
    if (advFilters.category !== "all" && story.category !== advFilters.category) return false;
    if (advFilters.tier !== "all" && story.companyTier !== advFilters.tier) return false;
    if (advFilters.isSponsored !== "all") {
      if (advFilters.isSponsored === "yes" && !story.isSponsored) return false;
      if (advFilters.isSponsored === "no" && story.isSponsored) return false;
    }

    return true;
  });

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const handleFollowToggle = (id: string) => {
    if (watchlist.includes(id)) {
      setWatchlist(watchlist.filter((i) => i !== id));
    } else {
      setWatchlist([...watchlist, id]);
    }
  };

  const handleBookmarkToggle = (id: string) => {
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((i) => i !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  const triggerEnquiry = (id: string, name: string, tier: string) => {
    setEnquiryCompany({ id, name, tier });
    setEnquirySuccess(false);
  };

  const submitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySuccess(true);
    setTimeout(() => {
      setEnquiryCompany(null);
      setEnquirySuccess(false);
    }, 2000);
  };

  const submitAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertSuccess(true);
    setTimeout(() => {
      setAlertSuccess(false);
      setAlertConfig({ term: "", type: "all" });
    }, 3000);
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4 space-y-8">

        {/* 1. Breadcrumbs */}
        <nav className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 py-2">
          <Link href="/en/poc-v2" className="hover:text-blue-600">iGEN Home</Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">Company News</span>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="text-blue-600">Directory Hub</span>
        </nav>

        {/* 2. Hero Section */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#141b2c] to-[#201538] text-white p-6 md:p-10 border border-slate-800 shadow-md">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
          <div className="relative z-10 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8 space-y-4">
              <span className="bg-purple-500/20 text-purple-300 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-purple-400/20 inline-block">
                Press & Sourcing Broadcast
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-none">
                Company News
              </h1>
              <p className="text-xs md:text-sm text-slate-350 max-w-lg leading-relaxed font-normal">
                Discover the latest announcements, launches, partnerships, investments and business developments from companies around the world.
              </p>

              {/* Primary Search */}
              <div className="relative max-w-md w-full bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-1.5 flex items-center gap-2 mt-2">
                <Search className="h-4 w-4 text-slate-400 ml-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search company news, companies, announcements..."
                  className="flex-1 bg-transparent border-0 outline-none text-xs text-white placeholder-slate-400 py-1"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-[10px] text-slate-400 hover:text-white px-2">Clear</button>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-bold">
                <a href="#latest-section" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                  Explore Latest News
                </a>
                <Link href="/eoi" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                  Publish Company News
                </Link>
              </div>
            </div>

            {/* Premium CTA */}
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <Link
                href="/eoi"
                className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs px-6 py-3.5 rounded-xl hover:shadow-lg transition-transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-1.5"
              >
                <Plus className="h-4 w-4" />
                Publish Announcements
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Quick News Filters Strip */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3.5 rounded-2xl flex flex-wrap gap-2 items-center shadow-xs">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" />
            Filters:
          </span>
          {[
            { label: "All News", val: "all" },
            { label: "Latest Feed", val: "latest" },
            { label: "Trending", val: "trending" },
            { label: "Breaking", val: "breaking" },
            { label: "Most Read", val: "most_read" },
            { label: "Product Launches", val: "launches" },
            { label: "Announcements", val: "announcements" },
            { label: "Partnerships", val: "partnerships" },
            { label: "Investments", val: "investments" },
            { label: "Expansions", val: "expansion" },
            { label: "Contracts & Deals", val: "deals" },
          ].map((item) => (
            <button
              key={item.val}
              onClick={() => setQuickFilter(item.val)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                quickFilter === item.val
                  ? "bg-blue-600 text-white"
                  : "bg-gray-150 dark:bg-gray-900 text-gray-550 dark:text-gray-400 hover:text-blue-600 hover:bg-blue-50/50"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Toggle Advanced Filters Button */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="ml-auto text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline"
          >
            <Filter className="h-3 w-3" />
            {showAdvanced ? "Hide Filters" : "Advanced Filters"}
          </button>
        </section>

        {/* 4. Advanced Filters Panel */}
        {showAdvanced && (
          <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {/* Industry Select */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Industry</label>
                <select
                  value={advFilters.industry}
                  onChange={(e) => setAdvFilters({ ...advFilters, industry: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none"
                >
                  <option value="all">All Industries</option>
                  {INDUSTRIES_LIST.map((ind) => (
                    <option key={ind.id} value={ind.id}>{ind.name}</option>
                  ))}
                </select>
              </div>

              {/* Country Select */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Country</label>
                <select
                  value={advFilters.country}
                  onChange={(e) => setAdvFilters({ ...advFilters, country: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none"
                >
                  <option value="all">All Countries</option>
                  {COUNTRIES_LIST.map((c) => (
                    <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>

              {/* News Type Select */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">News Category</label>
                <select
                  value={advFilters.category}
                  onChange={(e) => setAdvFilters({ ...advFilters, category: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="Product Launch">Product Launch</option>
                  <option value="Deal Announcement">Deal Announcement</option>
                  <option value="Financial Update">Financial Update</option>
                  <option value="Milestone">Milestone</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Investment">Investment</option>
                  <option value="ESG">ESG</option>
                  <option value="Announcement">Announcement</option>
                  <option value="Expansion">Expansion</option>
                  <option value="M&A">M&A</option>
                </select>
              </div>

              {/* Corporate Tier */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Listing Tier</label>
                <select
                  value={advFilters.tier}
                  onChange={(e) => setAdvFilters({ ...advFilters, tier: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none"
                >
                  <option value="all">All Tiers</option>
                  <option value="registered">Registered</option>
                  <option value="verified">Verified Pro</option>
                  <option value="top">Enterprise</option>
                </select>
              </div>

              {/* Sponsored Status */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Placement</label>
                <select
                  value={advFilters.isSponsored}
                  onChange={(e) => setAdvFilters({ ...advFilters, isSponsored: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none"
                >
                  <option value="all">All Placements</option>
                  <option value="yes">Sponsored / Featured Only</option>
                  <option value="no">Organic Only</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setAdvFilters({ industry: "all", country: "all", category: "all", tier: "all", isSponsored: "all" })}
                className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-900 font-semibold"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowAdvanced(false)}
                className="bg-blue-600 text-white font-bold text-xs px-4 py-1.5 rounded-lg hover:bg-blue-750"
              >
                Apply Filters
              </button>
            </div>
          </section>
        )}

        {/* 5. Featured Company News */}
        <section className="space-y-4">
          <SectionTitle
            title="Featured Business Stories"
            subtitle="Top corporate announcements and paid sponsor updates."
          />

          <div className="grid grid-cols-12 gap-6">
            {/* Primary Story Card */}
            <div className="col-span-12 md:col-span-7">
              {MASTER_NEWS.filter((n) => n.isSponsored).slice(0, 1).map((story) => (
                <Card key={story.id} className="p-6 h-full flex flex-col justify-between space-y-4 border-l-4 border-amber-400">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge color="amber">
                        <Sparkles className="h-2.5 w-2.5" />
                        FEATURED BROADCAST
                      </Badge>
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Sponsored Placement</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                        {story.companyInitials}
                      </div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{story.companyName}</span>
                      {story.companyTier !== "registered" && (
                        <CheckCircle className="h-3 w-3 text-blue-500 shrink-0" />
                      )}
                    </div>

                    <h3 className="font-display font-black text-base md:text-xl text-gray-950 dark:text-white leading-tight">
                      {story.title}
                    </h3>
                    <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                      {story.summary}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-150 dark:border-gray-800 pt-3 text-[10px] font-semibold text-gray-450">
                    <div className="flex items-center gap-3">
                      <span>{story.publishedAt}</span>
                      <span>·</span>
                      <span>{story.readingTimeMinutes} min read</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleBookmarkToggle(story.id)} className="hover:text-blue-600">
                        <Bookmark className={`h-4 w-4 ${bookmarks.includes(story.id) ? "fill-blue-600 text-blue-600" : ""}`} />
                      </button>
                      <button onClick={() => setSelectedStory(story)} className="bg-blue-650 hover:bg-blue-750 text-white font-bold text-[9px] px-3.5 py-1.5 rounded-lg">
                        Read Story →
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Secondary Compact list */}
            <div className="col-span-12 md:col-span-5 space-y-3">
              {MASTER_NEWS.filter((n) => !n.isBreaking && !n.isSponsored).slice(0, 3).map((story) => (
                <Card key={story.id} className="p-4 hover:border-blue-400 transition-all flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[8px] font-bold uppercase">
                      <span className="text-blue-600">{story.category}</span>
                      <span className="text-gray-400">{story.publishedAt}</span>
                    </div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white line-clamp-2 hover:text-blue-500 transition-colors cursor-pointer" onClick={() => setSelectedStory(story)}>
                      {story.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-850 pt-2 mt-2 text-[9px]">
                    <span className="text-gray-400">Company: {story.companyName}</span>
                    <button onClick={() => setSelectedStory(story)} className="text-blue-600 font-bold hover:underline">
                      Read →
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Primary Page Grid */}
        <div className="grid grid-cols-12 gap-8">

          {/* Left Column (News feed directories) */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {/* 6. Latest Company News (paginated Feed) */}
            <section id="latest-section" className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Latest Announcements Feed ({filteredNews.length})
                </h3>
                <span className="text-[10px] text-gray-400 font-semibold">Attributed to platform entities</span>
              </div>

              {filteredNews.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-150 p-6 space-y-3">
                  <SlidersHorizontal className="h-8 w-8 text-gray-300 mx-auto" />
                  <h4 className="text-xs font-bold text-gray-600 dark:text-gray-400">No company news matches your filters.</h4>
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setQuickFilter("all");
                        setAdvFilters({ industry: "all", country: "all", category: "all", tier: "all", isSponsored: "all" });
                        setSearchQuery("");
                      }}
                      className="bg-blue-600 text-white font-bold text-[10px] px-4 py-1.5 rounded-lg"
                    >
                      Clear Filters
                    </button>
                    <button
                      onClick={() => {
                        setQuickFilter("all");
                        setSearchQuery("");
                      }}
                      className="border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold text-[10px] px-4 py-1.5 rounded-lg"
                    >
                      Explore All Company News
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNews.map((story) => (
                    <Card key={story.id} className="p-5 flex flex-col justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 bg-blue-50 dark:bg-blue-950/20 text-blue-600 flex items-center justify-center font-bold text-[10px] rounded">
                              {story.companyInitials}
                            </div>
                            <div>
                              <div className="flex items-center gap-1">
                                <span
                                  onClick={() => router.push(`/${locale}/company-news/${story.companyTier}/pages/${story.companyId}`)}
                                  className="font-bold text-[11px] text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 hover:underline"
                                >
                                  {story.companyName}
                                </span>
                                {story.companyTier !== "registered" && (
                                  <Badge color={story.companyTier === "top" ? "amber" : "emerald"}>
                                    ✓ Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-[8px] text-gray-400 uppercase tracking-widest font-semibold">{story.industry} · {story.country}</p>
                            </div>
                          </div>
                          <span className="text-[8px] bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 px-2 py-0.5 rounded font-bold uppercase">
                            {story.category}
                          </span>
                        </div>

                        <h4
                          onClick={() => setSelectedStory(story)}
                          className="font-display font-bold text-sm text-gray-950 dark:text-white hover:text-blue-500 transition-colors leading-snug cursor-pointer"
                        >
                          {story.title}
                        </h4>
                        <p className="text-[10px] text-gray-500 leading-normal font-normal line-clamp-2">
                          {story.summary}
                        </p>
                      </div>

                      <div className="flex justify-between items-center border-t border-gray-50 dark:border-gray-855 pt-3 text-[9px] text-gray-450">
                        <div className="flex items-center gap-3">
                          <span>Source: Platform Broadcast</span>
                          <span>·</span>
                          <span>{story.publishedAt}</span>
                          <span>·</span>
                          <span>{story.readingTimeMinutes} min read</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleBookmarkToggle(story.id)}
                            className="hover:text-blue-600"
                            title="Save Story"
                          >
                            <Bookmark className={`h-3.5 w-3.5 ${bookmarks.includes(story.id) ? "fill-blue-600 text-blue-600" : ""}`} />
                          </button>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/${locale}/company-news/${story.companyTier}/news/${story.id}`);
                              alert("Link copied to clipboard!");
                            }}
                            className="hover:text-blue-600"
                            title="Copy link"
                          >
                            <Share2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setSelectedStory(story)}
                            className="text-blue-600 font-bold hover:underline"
                          >
                            Read Story →
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* 7. Explore Company News By Type */}
            <section className="space-y-4">
              <SectionTitle
                title="Explore Company News By Category"
                subtitle="Filter company stories instantly by their announcement classification."
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Product Launches", val: "Product Launch", icon: "🚀" },
                  { label: "Contracts & Deals", val: "Deal Announcement", icon: "💼" },
                  { label: "Investments", val: "Investment", icon: "💰" },
                  { label: "Expansions", val: "Expansion", icon: "🌍" },
                  { label: "Partnerships", val: "Partnership", icon: "🤝" },
                  { label: "Milestones", val: "Milestone", icon: "🏆" },
                  { label: "Leadership Changes", val: "Leadership Change", icon: "👥" },
                  { label: "ESG / Sustainability", val: "ESG", icon: "🌱" },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setQuickFilter("all");
                      setAdvFilters({ ...advFilters, category: item.val });
                      setShowAdvanced(true);
                    }}
                    className="p-3 bg-white dark:bg-[#0f172a] border border-gray-250 hover:border-blue-400 dark:border-gray-800 dark:hover:border-blue-800 rounded-xl text-center space-y-1.5 transition-all group"
                  >
                    <span className="text-xl block">{item.icon}</span>
                    <span className="text-[9px] font-bold text-gray-700 dark:text-gray-300 block group-hover:text-blue-600">{item.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* 8. Companies in Focus */}
            <section className="space-y-3">
              <SectionTitle
                title="Companies in Focus"
                subtitle="Businesses generating significant announcement volume and platform activity."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MASTER_NEWS.slice(0, 4).map((c) => (
                  <div key={c.id} className="bg-gray-100 dark:bg-gray-900/50 rounded-xl p-4 flex justify-between items-start gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="h-4 w-4 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-white rounded flex items-center justify-center font-bold text-[8px] uppercase">
                          {c.companyInitials}
                        </span>
                        <h4 className="font-bold text-xs text-gray-900 dark:text-white">{c.companyName}</h4>
                      </div>
                      <p className="text-[9px] text-gray-500 font-semibold">{c.industry} · {c.country}</p>
                      <p className="text-[10px] text-gray-650 dark:text-gray-400 italic">&ldquo;{c.title}&rdquo;</p>
                    </div>
                    <button
                      onClick={() => router.push(`/${locale}/company-news/${c.companyTier}/pages/${c.companyId}`)}
                      className="text-blue-600 text-[9px] font-bold hover:underline shrink-0 whitespace-nowrap mt-1"
                    >
                      View Company News →
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. Product & Service Sourcing Portal */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-850 p-5 rounded-2xl shadow-xs space-y-4">
              <SectionTitle
                title="New Products & Services"
                subtitle="Catalog details of recently announced corporate services."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MASTER_NEWS.filter((n) => n.category === "Product Launch").slice(0, 2).map((story) => (
                  <div key={story.id} className="border border-gray-100 dark:border-gray-800 p-4 rounded-xl bg-slate-50/50 dark:bg-gray-955 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">Product Launch</span>
                      <span className="text-[8px] text-gray-450">{story.publishedAt}</span>
                    </div>
                    <h4 className="font-bold text-xs text-gray-950 dark:text-white leading-tight">{story.title}</h4>
                    <p className="text-[9px] text-gray-500">Industry: {story.industry} · Sourced from {story.companyName}</p>
                    <div className="flex gap-2 pt-1.5">
                      <button
                        onClick={() => setSelectedStory(story)}
                        className="bg-blue-600 text-white text-[8px] font-bold px-3 py-1 rounded"
                      >
                        Explore Offerings
                      </button>
                      <button
                        onClick={() => triggerEnquiry(story.companyId, story.companyName, story.companyTier)}
                        className="border border-gray-200 dark:border-gray-700 text-gray-650 dark:text-gray-400 text-[8px] font-bold px-3 py-1 rounded hover:bg-gray-100"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Right Column (Sidebar charts, recs & newsletters) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* 10. Breaking / Major Updates (If supported) */}
            {MASTER_NEWS.some((n) => n.isBreaking) && (
              <section className="bg-rose-500/10 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 p-4 rounded-2xl space-y-3">
                <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400 font-extrabold text-[9px] uppercase tracking-wider">
                  <Flame className="h-4 w-4 shrink-0" />
                  Breaking & Major Updates
                </div>
                <div className="divide-y divide-rose-200/40 dark:divide-rose-900/40">
                  {MASTER_NEWS.filter((n) => n.isBreaking).map((story) => (
                    <div key={story.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                      <h4
                        onClick={() => setSelectedStory(story)}
                        className="font-bold text-xs text-gray-950 dark:text-white hover:text-rose-600 cursor-pointer"
                      >
                        {story.title}
                      </h4>
                      <div className="flex justify-between items-center text-[9px] text-gray-400">
                        <span>Company: {story.companyName}</span>
                        <button onClick={() => setSelectedStory(story)} className="text-rose-500 font-bold hover:underline">Read Story →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 11. Company News By Industry */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                News By Industry
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {INDUSTRIES_LIST.slice(0, 5).map((ind) => (
                  <button
                    key={ind.id}
                    onClick={() => {
                      setQuickFilter("all");
                      setAdvFilters({ ...advFilters, industry: ind.id });
                      setShowAdvanced(true);
                    }}
                    className="flex justify-between items-center p-2 rounded-xl bg-gray-50 dark:bg-gray-955 hover:bg-blue-50/50 hover:text-blue-600 text-left text-[10px] w-full"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{ind.icon}</span>
                      <span className="font-bold">{ind.name}</span>
                    </div>
                    <span className="font-bold text-slate-500">{ind.count} stories</span>
                  </button>
                ))}
              </div>
            </section>

            {/* 12. Company News By Country */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                News Around the World
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {COUNTRIES_LIST.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setQuickFilter("all");
                      setAdvFilters({ ...advFilters, country: c.code });
                      setShowAdvanced(true);
                    }}
                    className="flex justify-between items-center p-2 rounded-xl bg-gray-50 dark:bg-gray-955 hover:bg-blue-50/50 hover:text-blue-600 text-left text-[10px] w-full"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{c.flag}</span>
                      <span className="font-bold">{c.name}</span>
                    </div>
                    <span className="font-bold text-slate-500">{c.count} stories</span>
                  </button>
                ))}
              </div>
            </section>

            {/* 13. Most Read / Most Shared Leaderboard */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white">Trending Metrics</h4>
                <div className="flex gap-1 bg-gray-150 dark:bg-gray-900 p-0.5 rounded-lg border border-gray-200 dark:border-gray-800">
                  {([
                    { label: "Today", val: "today" },
                    { label: "7 Days", val: "7d" },
                    { label: "30 Days", val: "30d" },
                  ] as const).map((p) => (
                    <button
                      key={p.val}
                      onClick={() => setMostReadPeriod(p.val)}
                      className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                        mostReadPeriod === p.val ? "bg-white dark:bg-gray-850 shadow-xs text-gray-950 dark:text-white" : "text-gray-450"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Leaderboard content */}
              <div className="divide-y divide-gray-50 dark:divide-gray-855">
                {MASTER_NEWS.slice(0, 4)
                  .sort((a, b) => b.viewCount - a.viewCount)
                  .map((story, idx) => (
                    <div key={story.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                      <div className="flex items-start gap-2">
                        <span className="font-display font-extrabold text-xs text-gray-250 mt-0.5 w-4">#{idx + 1}</span>
                        <div className="flex-1 min-w-0">
                          <span
                            onClick={() => setSelectedStory(story)}
                            className="font-bold text-[10px] text-gray-900 dark:text-white block hover:text-blue-500 cursor-pointer line-clamp-2"
                          >
                            {story.title}
                          </span>
                          <div className="flex justify-between items-center text-[8px] text-gray-400 mt-1">
                            <span>{story.companyName}</span>
                            <span className="font-bold">{story.viewCount.toLocaleString()} views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>

          </div>
        </div>

        {/* 14. Recommended Company News (Watchlist & Preferences based) */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle
            title="Recommended Company News"
            subtitle="Personalized content matching your followed companies and reading history."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MASTER_NEWS.slice(3, 5).map((story) => (
              <Card key={story.id} className="p-4 flex gap-4 hover:shadow-md transition-all">
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[8px] bg-purple-50 dark:bg-purple-950 text-purple-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                      Recommended for you
                    </span>
                    <span className="text-[9px] text-gray-400">{story.publishedAt}</span>
                  </div>
                  <h4
                    onClick={() => setSelectedStory(story)}
                    className="font-bold text-xs text-gray-900 dark:text-white hover:text-blue-600 cursor-pointer"
                  >
                    {story.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 line-clamp-2">{story.summary}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 15. Sourcing & Investment feeds */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Business Expansion Section */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
            <SectionTitle title="Companies Expanding" subtitle="Announcements regarding new facility groundbreakings & market entry." />
            <div className="divide-y divide-gray-50 dark:divide-gray-850">
              {MASTER_NEWS.filter((n) => n.category === "Expansion").map((story) => (
                <div key={story.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                  <h4 onClick={() => setSelectedStory(story)} className="font-bold text-[11px] hover:text-blue-500 cursor-pointer">{story.title}</h4>
                  <div className="flex justify-between items-center text-[9px] text-gray-450">
                    <span>Company: {story.companyName}</span>
                    <span>{story.publishedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Funding & Capital Investment Section */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
            <SectionTitle title="Funding & Capital Investment" subtitle="Corporate allocations for green transition projects & tech." />
            <div className="divide-y divide-gray-50 dark:divide-gray-850">
              {MASTER_NEWS.filter((n) => n.category === "Investment").map((story) => (
                <div key={story.id} className="py-2.5 first:pt-0 last:pb-0 space-y-1">
                  <h4 onClick={() => setSelectedStory(story)} className="font-bold text-[11px] hover:text-blue-500 cursor-pointer">{story.title}</h4>
                  <div className="flex justify-between items-center text-[9px] text-gray-450">
                    <span>Company: {story.companyName}</span>
                    <span>{story.publishedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 16. Corporate & Leadership Updates */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle
            title="Corporate & Leadership Updates"
            subtitle="Updates regarding executive C-Suite transitions and board shifts."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { company: "Sunrise Agro Exports", title: "Sunrise Agro Appoints New Managing Director to Head Global Trade Division", time: "2 days ago", type: "Leadership Change" },
              { company: "Adani Green Energy", title: "Adani Green Board Approves Greenfield Solar Investment Capacity Structure", time: "1 week ago", type: "Corporate Restructure" },
            ].map((update, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-955 border border-gray-150 space-y-2">
                <div className="flex justify-between text-[8px] font-bold uppercase tracking-wider">
                  <span className="text-purple-600">{update.type}</span>
                  <span className="text-gray-400">{update.time}</span>
                </div>
                <h4 className="font-bold text-xs text-gray-950 dark:text-white leading-snug">{update.title}</h4>
                <p className="text-[9px] text-gray-500">Corporate update filed by {update.company}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 17. News Alerts Creator (Create alerts for followed targets) */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle
            title="Never Miss Company News"
            subtitle="Configure personalized email notifications matching your criteria."
          />
          <form onSubmit={submitAlert} className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 space-y-1 w-full">
              <label className="text-[8px] font-bold text-gray-400 uppercase">Alert keywords (e.g. Adani, EV, Semiconductor)</label>
              <input
                required
                type="text"
                value={alertConfig.term}
                onChange={(e) => setAlertConfig({ ...alertConfig, term: e.target.value })}
                placeholder="Enter company, keyword, or industry name..."
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-xs outline-none focus:border-blue-500"
              />
            </div>
            <div className="w-full sm:w-44 space-y-1">
              <label className="text-[8px] font-bold text-gray-400 uppercase">News Category</label>
              <select
                value={alertConfig.type}
                onChange={(e) => setAlertConfig({ ...alertConfig, type: e.target.value })}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-xs outline-none"
              >
                <option value="all">All updates</option>
                <option value="Product Launch">Product Launches</option>
                <option value="Deal Announcement">Deals & Contracts</option>
                <option value="Leadership Change">Executive Shifts</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-650 hover:bg-blue-750 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors w-full sm:w-auto h-10 flex items-center justify-center whitespace-nowrap"
            >
              Create News Alert
            </button>
          </form>
          {alertSuccess && (
            <p className="text-[9px] text-emerald-500 font-bold animate-fadeIn">
              ✓ Alert successfully registered! You will receive notification digests in your inbox.
            </p>
          )}
        </section>

        {/* 18. Newsletter Subscription (Bilateral trade & sourcing updates) */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle
            title="Stay Ahead of Company News"
            subtitle="Receive a curated digest of important bilateral company updates directly in your inbox."
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your business email address..."
              className="flex-1 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 text-xs outline-none focus:border-blue-500"
            />
            <button
              onClick={() => alert("Subscribed successfully!")}
              className="bg-blue-600 hover:bg-blue-750 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all"
            >
              Subscribe
            </button>
          </div>
        </section>

        {/* 19. Have Company News to Share CTA (Monetization & publishing onboarding) */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-8 rounded-3xl text-center space-y-4 shadow-xs">
          <MessageSquare className="h-8 w-8 text-blue-500 mx-auto" />
          <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">Have Company News to Share?</h3>
          <p className="text-gray-550 dark:text-slate-400 text-xs font-normal max-w-md mx-auto leading-relaxed">
            Publish press announcements, product launches, partnerships, corporate milestones and leadership changes to over 100,000 global B2B procurement users.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href="/eoi" className="bg-gradient-to-r from-blue-650 to-indigo-650 text-white font-bold text-xs px-8 py-3.5 rounded-xl hover:shadow-md transition-all">
              Publish Company News
            </Link>
            <Link href="/eoi" className="border border-gray-200 dark:border-gray-700 text-gray-650 dark:text-gray-400 hover:bg-gray-50 font-bold text-xs px-8 py-3.5 rounded-xl transition-all">
              Explore Publishing Plans
            </Link>
          </div>
        </section>

        {/* 20. Premium Publishing Cross-Sell (Monetization & payment options) */}
        <section className="bg-gradient-to-br from-indigo-950 via-[#181131] to-[#34165d] text-white rounded-3xl p-6 md:p-8 border border-purple-900/60 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
          <div className="space-y-2">
            <span className="bg-purple-500/20 text-purple-300 text-[8px] font-bold px-2 py-0.5 rounded border border-purple-400/20 uppercase tracking-widest">
              Premium Broadcast Visibility
            </span>
            <h3 className="font-display font-black text-lg md:text-xl">Give Your Company News More Visibility</h3>
            <p className="text-[10px] md:text-xs text-purple-200 max-w-lg leading-relaxed font-normal">
              Activate featured placements, include announcements in global trade newsletters, and track delivery analytics using detailed publishing reports.
            </p>
          </div>
          <Link href="/eoi" className="bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs px-6 py-3.5 rounded-xl transition-transform hover:-translate-y-0.5 whitespace-nowrap">
            Explore Publishing Plans →
          </Link>
        </section>


      </div>

      {/* Story Details Modal Preview */}
      {selectedStory && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="max-w-xl w-full p-6 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-850 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-[8px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded font-bold uppercase">
                  {selectedStory.category}
                </span>
                <span className="text-[10px] text-gray-400">{selectedStory.publishedAt}</span>
              </div>
              <button
                onClick={() => setSelectedStory(null)}
                className="text-gray-400 hover:text-gray-650 font-bold text-sm"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <h3 className="font-display font-black text-base text-gray-950 dark:text-white leading-snug">
                {selectedStory.title}
              </h3>
              <p className="text-[11px] text-gray-500 leading-normal">
                <strong>Company Attribution:</strong> {selectedStory.companyName} ({selectedStory.companyTier.toUpperCase()})
              </p>
              <div className="text-xs text-gray-650 dark:text-gray-400 leading-relaxed font-normal bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-150 max-h-60 overflow-y-auto">
                {selectedStory.content || selectedStory.summary}
              </div>
            </div>
            <div className="flex gap-2 justify-end border-t border-gray-100 dark:border-gray-850 pt-3">
              <button
                onClick={() => {
                  setSelectedStory(null);
                  triggerEnquiry(selectedStory.companyId, selectedStory.companyName, selectedStory.companyTier);
                }}
                className="bg-blue-600 text-white font-bold text-[10px] px-4 py-2 rounded-lg"
              >
                Request Quote / Contact Firm
              </button>
              <button
                onClick={() => setSelectedStory(null)}
                className="border border-gray-250 text-gray-600 text-[10px] font-bold px-4 py-2 rounded-lg"
              >
                Close Preview
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Lead Enquiry Modal */}
      {enquiryCompany && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-850 pb-2">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Business Enquiry for {enquiryCompany.name}</h3>
              <button
                onClick={() => setEnquiryCompany(null)}
                className="text-gray-400 hover:text-gray-650 font-bold"
              >
                ✕
              </button>
            </div>
            {enquirySuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">Enquiry Submitted Successfully!</h4>
                <p className="text-[10px] text-gray-500">Your query has been routed through iGEN CRM to {enquiryCompany.name}.</p>
              </div>
            ) : (
              <form onSubmit={submitEnquiry} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[8px] font-bold text-gray-400 uppercase">Your Work Email</label>
                  <input required type="email" placeholder="you@company.com" className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold text-gray-400 uppercase">Requirement Type</label>
                  <select className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 outline-none">
                    <option>Product Sourcing Quote</option>
                    <option>Supply Chain Collaboration</option>
                    <option>Bilateral Partnership proposal</option>
                    <option>Advisory Speaking Engagement</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-bold text-gray-400 uppercase">Enquiry Message</label>
                  <textarea required rows={4} placeholder="Describe your business procurement requirements in detail..." className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 outline-none resize-none" />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-755 text-white font-bold text-xs py-3 rounded-lg transition-colors">
                  Submit Direct Enquiry
                </button>
              </form>
            )}
          </Card>
        </div>
      )}

    </div>
  );
}

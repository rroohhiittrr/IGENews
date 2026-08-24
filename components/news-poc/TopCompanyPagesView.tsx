"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Building2, CheckCircle, Crown, Search, TrendingUp, ChevronRight, ArrowLeft, ArrowRight,
  Star, Globe, Briefcase, MapPin, Users, Mail, Phone, Calendar, Download, Shield, Lock,
  Eye, Share2, Bookmark, Award, FileText, Sparkles, Filter, Plus, ExternalLink,
  MessageSquare, Target, Zap, Flame, SlidersHorizontal, ArrowUpRight, HelpCircle, Check,
  BarChart2, Activity, Gauge, Trophy, AlertTriangle, RefreshCw, X, ArrowDownRight,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface CompanyItem {
  id: string;
  name: string;
  logoInitials: string;
  tagline: string;
  industry: string;
  industryId: string;
  location: string;
  country: string;
  countryCode: string;
  tier: "registered" | "verified" | "top";
  followerCount: number;
  viewCount30d: number;
  newsCount30d: number;
  profileCompletion: number;
  foundedYear: number;
  employees: string;
  revenue: string;
  products: string[];
  recentHeadline?: string;
  headlineCount?: number;
  isSponsored?: boolean;
  movement?: "up" | "down" | "same" | "new";
  rank?: number;
  prevRank?: number;
  trendingScore?: number;
  activityScore?: number;
  risingReason?: string;
}

// ─── Local UI Helpers ────────────────────────────────────────────────────────
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

function Badge({ children, color = "amber" }: { children: React.ReactNode; color?: string }) {
  const map: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-200 dark:border-blue-900/40",
    emerald: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 border border-emerald-200 dark:border-emerald-900/40",
    amber: "bg-amber-50 dark:bg-amber-950/20 text-amber-600 border border-amber-200 dark:border-amber-900/40",
    purple: "bg-purple-50 dark:bg-purple-950/20 text-purple-600 border border-purple-200 dark:border-purple-900/40",
    rose: "bg-rose-50 dark:bg-rose-950/20 text-rose-600 border border-rose-200 dark:border-rose-900/40",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.amber}`}>
      {children}
    </span>
  );
}

function formatRankMovement(move: CompanyItem["movement"]) {
  if (move === "up") return <span className="text-emerald-500 font-bold" title="Rising">▲</span>;
  if (move === "down") return <span className="text-rose-500 font-bold" title="Falling">▼</span>;
  if (move === "new") return <span className="text-blue-500 font-extrabold text-[8px] bg-blue-100 px-1 rounded">NEW</span>;
  return <span className="text-gray-400 font-bold" title="Stable">→</span>;
}

// ─── Master Dataset (sample platform intelligence) ───────────────────────────
const MASTER_COMPANIES: CompanyItem[] = [
  { id: "co-1", name: "Tata Steel Ltd.", logoInitials: "TS", tagline: "Building green metallurgical capabilities and infrastructure.", industry: "Steel & Metallurgy", industryId: "steel-metallurgy", location: "Mumbai, Maharashtra", country: "India", countryCode: "IN", tier: "top", followerCount: 24500, viewCount30d: 48000, newsCount30d: 22, profileCompletion: 100, foundedYear: 1907, employees: "32,000+", revenue: "$31B+", products: ["Hot Rolled Steel Coils", "Rebars", "Pre-stressed Concrete Wire"], recentHeadline: "Tata Steel announces transition to electric arc furnace at UK plant.", headlineCount: 14, isSponsored: false, movement: "up", rank: 1, prevRank: 3, trendingScore: 98, activityScore: 95 },
  { id: "co-2", name: "Mahindra Logistics Ltd.", logoInitials: "ML", tagline: "Integrated supply chain and multimodal logistics solution providers.", industry: "Logistics & Supply Chain", industryId: "logistics", location: "Pune, Maharashtra", country: "India", countryCode: "IN", tier: "registered", followerCount: 4200, viewCount30d: 8100, newsCount30d: 4, profileCompletion: 70, foundedYear: 2007, employees: "15,000+", revenue: "₹3,200 Cr", products: ["Third-Party Logistics (3PL)", "Freight Forwarding", "Warehousing"], recentHeadline: "Mahindra Logistics expands warehousing capacity in Western Corridor.", headlineCount: 3, isSponsored: false, movement: "same", rank: 11, prevRank: 11, trendingScore: 72, activityScore: 68, risingReason: "Capacity expansion" },
  { id: "co-3", name: "Adani Green Energy Ltd.", logoInitials: "AG", tagline: "Powering India's clean energy grid transition at gigawatt scale.", industry: "Renewable Energy", industryId: "renewable-energy", location: "Ahmedabad, Gujarat", country: "India", countryCode: "IN", tier: "top", followerCount: 18200, viewCount30d: 38200, newsCount30d: 18, profileCompletion: 100, foundedYear: 2015, employees: "5,200+", revenue: "$1.8B+", products: ["Solar PV Generation", "Wind Farm Installation", "Hybrid Power Storage"], recentHeadline: "Adani Green commissions world's largest renewable energy park in Khavda.", headlineCount: 18, isSponsored: true, movement: "up", rank: 2, prevRank: 4, trendingScore: 96, activityScore: 92, risingReason: "Mega-scale project commissioning" },
  { id: "co-4", name: "Cipla Pharmaceuticals Ltd.", logoInitials: "CP", tagline: "Global generic drugs manufacturer and diagnostics developer.", industry: "Pharmaceuticals", industryId: "pharmaceuticals", location: "Mumbai, Maharashtra", country: "India", countryCode: "IN", tier: "verified", followerCount: 11200, viewCount30d: 21000, newsCount30d: 9, profileCompletion: 85, foundedYear: 1935, employees: "22,000+", revenue: "$2.8B+", products: ["Asthma Inhalers", "Active Pharmaceutical Ingredients (APIs)", "Cardiovascular drugs"], recentHeadline: "Cipla secures FDA approval for new respiratory formulation.", headlineCount: 8, isSponsored: false, movement: "up", rank: 3, prevRank: 5, trendingScore: 89, activityScore: 84 },
  { id: "co-5", name: "Reliance Industries Ltd.", logoInitials: "RI", tagline: "Diverse conglomerate spans energy, retail, telecom and technology.", industry: "IT & Technology", industryId: "it-technology", location: "Mumbai, Maharashtra", country: "India", countryCode: "IN", tier: "top", followerCount: 45000, viewCount30d: 95000, newsCount30d: 32, profileCompletion: 100, foundedYear: 1973, employees: "340,000+", revenue: "$110B+", products: ["Jio 5G Network Solutions", "Retail POS Networks", "Polymers & Elastomers"], recentHeadline: "Reliance Jio expands AI Cloud computing trials for enterprise partners.", headlineCount: 25, isSponsored: false, movement: "down", rank: 4, prevRank: 2, trendingScore: 97, activityScore: 98 },
  { id: "co-6", name: "Infosys BPM Ltd.", logoInitials: "IB", tagline: "Outsourcing business processing operations and digital CRM workflows.", industry: "IT & Technology", industryId: "it-technology", location: "Bengaluru, Karnataka", country: "India", countryCode: "IN", tier: "top", followerCount: 14800, viewCount30d: 29500, newsCount30d: 14, profileCompletion: 98, foundedYear: 2002, employees: "50,000+", revenue: "$1.4B+", products: ["Customer Support Outsourcing", "Financial Shared Services", "RPA Automation"], recentHeadline: "Infosys BPM launches clean AI workflow automation suites.", headlineCount: 9, isSponsored: false, movement: "same", rank: 5, prevRank: 5, trendingScore: 85, activityScore: 80 },
  { id: "co-7", name: "Sunrise Agro Exports Pvt. Ltd.", logoInitials: "SA", tagline: "Sourcing premium agricultural seeds and processed spices locally.", industry: "Agriculture & Food Processing", industryId: "agriculture", location: "Pune, Maharashtra", country: "India", countryCode: "IN", tier: "registered", followerCount: 820, viewCount30d: 1940, newsCount30d: 2, profileCompletion: 60, foundedYear: 2018, employees: "85", revenue: "₹12 Cr", products: ["Organic Spices", "Fresh Vegetables", "Packaged Agro Foods"], recentHeadline: "Sunrise Agro signs export treaty with Middle East distribution houses.", headlineCount: 2, isSponsored: false, movement: "new", rank: 15, prevRank: 0, trendingScore: 64, activityScore: 55, risingReason: "New international export treaty" },
  { id: "co-8", name: "NexusTech Logistics Solutions", logoInitials: "NL", tagline: "AI-driven route mapping and cold chain fleet management dashboards.", industry: "Logistics & Supply Chain", industryId: "logistics", location: "Bengaluru, Karnataka", country: "India", countryCode: "IN", tier: "verified", followerCount: 2310, viewCount30d: 4800, newsCount30d: 6, profileCompletion: 80, foundedYear: 2015, employees: "1,240", revenue: "₹180 Cr", products: ["AI Route Optimisation", "Cold Chain Logistics", "E-commerce Fulfilment"], recentHeadline: "NexusTech partners with e-commerce leaders for green fleet delivery.", headlineCount: 5, isSponsored: false, movement: "up", rank: 12, prevRank: 14, trendingScore: 78, activityScore: 72, risingReason: "Strategic partnership" },
  { id: "co-9", name: "Bharat Forge Ltd.", logoInitials: "BF", tagline: "High-performance forged metallurgical components manufacturer.", industry: "Steel & Metallurgy", industryId: "steel-metallurgy", location: "Pune, Maharashtra", country: "India", countryCode: "IN", tier: "verified", followerCount: 6400, viewCount30d: 12400, newsCount30d: 7, profileCompletion: 90, foundedYear: 1961, employees: "10,000+", revenue: "$1.1B+", products: ["Automotive Engine Forgings", "Aerospace Turbine Hubs", "Rail Axles"], recentHeadline: "Bharat Forge expands aerospace components production capacity.", headlineCount: 6, isSponsored: false, movement: "down", rank: 8, prevRank: 6, trendingScore: 82, activityScore: 76 },
  { id: "co-10", name: "Larsen & Toubro Ltd. (L&T)", logoInitials: "LT", tagline: "Heavy engineering, megaproject procurement and infrastructure construction.", industry: "Construction & Engineering", industryId: "construction-engineering", location: "Mumbai, Maharashtra", country: "India", countryCode: "IN", tier: "top", followerCount: 31000, viewCount30d: 68000, newsCount30d: 19, profileCompletion: 100, foundedYear: 1938, employees: "135,000+", revenue: "$21B+", products: ["Rapid Transit Monorail Tracks", "Green Hydrogen Electrolizers", "Offshore Oil Platforms"], recentHeadline: "L&T wins greenfield hydrogen terminal pipeline contract in UAE.", headlineCount: 13, isSponsored: false, movement: "up", rank: 6, prevRank: 7, trendingScore: 92, activityScore: 90 },
  { id: "co-11", name: "Tesla Inc.", logoInitials: "TL", tagline: "Sustainable energy ecosystem developers and autonomous EV makers.", industry: "Automotive & EV", industryId: "automotive-ev", location: "Austin, Texas", country: "United States", countryCode: "US", tier: "top", followerCount: 98000, viewCount30d: 145000, newsCount30d: 48, profileCompletion: 100, foundedYear: 2003, employees: "140,000+", revenue: "$96B+", products: ["Model 3 / Y Vehicles", "Megapack Utility Batteries", "FSD Autonomous Driving"], recentHeadline: "Tesla proposes major EV assembly gigafactory layout for India corridor.", headlineCount: 31, isSponsored: false, movement: "down", rank: 7, prevRank: 5, trendingScore: 95, activityScore: 97 },
  { id: "co-12", name: "Siemens Industrial AG", logoInitials: "SI", tagline: "Smart industrial infrastructure, manufacturing telemetry and grid systems.", industry: "Manufacturing & Equipment", industryId: "manufacturing-equipment", location: "Munich, Bavaria", country: "Germany", countryCode: "DE", tier: "verified", followerCount: 21000, viewCount30d: 42000, newsCount30d: 15, profileCompletion: 95, foundedYear: 1847, employees: "320,000+", revenue: "$85B+", products: ["Industrial CNC Automation controllers", "Gas Turbines", "Digital Twin Telemetry suites"], recentHeadline: "Siemens enters grid software automation partnership with Singapore.", headlineCount: 11, isSponsored: false, movement: "same", rank: 9, prevRank: 9, trendingScore: 84, activityScore: 82 },
  { id: "co-13", name: "BioNTech SE", logoInitials: "BN", tagline: "Next-generation mRNA therapeutics and personalized oncology developer.", industry: "Healthcare", industryId: "healthcare", location: "Mainz, Rhineland-Palatinate", country: "Germany", countryCode: "DE", tier: "verified", followerCount: 12500, viewCount30d: 26000, newsCount30d: 11, profileCompletion: 92, foundedYear: 2008, employees: "5,500+", revenue: "$4B+", products: ["mRNA Vaccine Formulation", "CAR-T Cancer therapies", "Custom PCR assays"], recentHeadline: "BioNTech initiates Phase II clinical trial of personalized oncology vaccine.", headlineCount: 7, isSponsored: false, movement: "up", rank: 10, prevRank: 12, trendingScore: 86, activityScore: 78 },
  { id: "co-14", name: "G42 AI Group", logoInitials: "G4", tagline: "National AI compute orchestrators and cloud infrastructure provider.", industry: "IT & Technology", industryId: "it-technology", location: "Abu Dhabi, Abu Dhabi", country: "UAE", countryCode: "AE", tier: "top", followerCount: 13900, viewCount30d: 28400, newsCount30d: 12, profileCompletion: 96, foundedYear: 2018, employees: "1,800+", revenue: "$2.1B+", products: ["Jais Arabic LLM Model", "Core Cloud Compute Nodes", "Sovereign Data Storage"], recentHeadline: "G42 partners with leading US tech firms for compute center expansion.", headlineCount: 10, isSponsored: true, movement: "new", rank: 14, prevRank: 0, trendingScore: 90, activityScore: 88, risingReason: "New compute center expansion" },
];

const INDUSTRIES_LIST = [
  { id: "steel-metallurgy", name: "Steel & Metallurgy", count: 142, top: "Tata Steel", trendCo: "Bharat Forge", icon: "⚙️" },
  { id: "logistics", name: "Logistics & Supply Chain", count: 231, top: "Mahindra Logistics", trendCo: "NexusTech Logistics", icon: "🚢" },
  { id: "renewable-energy", name: "Renewable Energy", count: 174, top: "Adani Green", trendCo: "Adani Green", icon: "⚡" },
  { id: "pharmaceuticals", name: "Pharmaceuticals", count: 195, top: "Cipla Ltd.", trendCo: "Cipla Ltd.", icon: "💊" },
  { id: "it-technology", name: "IT & Technology", count: 312, top: "Reliance Industries", trendCo: "G42 AI Group", icon: "💻" },
  { id: "construction-engineering", name: "Construction & Engineering", count: 188, top: "L&T Ltd.", trendCo: "L&T Ltd.", icon: "🏗️" },
  { id: "automotive-ev", name: "Automotive & EV", count: 218, top: "Tesla Inc.", trendCo: "Tesla Inc.", icon: "🚗" },
  { id: "agriculture", name: "Agriculture & Food Processing", count: 158, top: "ITC Agri", trendCo: "Sunrise Agro", icon: "🌾" },
];

const COUNTRIES_LIST = [
  { code: "IN", name: "India", count: 1420, flag: "🇮🇳", topCo: "Tata Steel" },
  { code: "US", name: "United States", count: 850, flag: "🇺🇸", topCo: "Tesla Inc." },
  { code: "DE", name: "Germany", count: 480, flag: "🇩🇪", topCo: "Siemens AG" },
  { code: "AE", name: "UAE", count: 320, flag: "🇦🇪", topCo: "G42 AI Group" },
  { code: "SG", name: "Singapore", count: 290, flag: "🇸🇬", topCo: "Pacific Logistics" },
];

const BUSINESS_TYPES = [
  { key: "manufacturers", label: "Manufacturers", desc: "Producers of physical goods and components." },
  { key: "suppliers", label: "Suppliers", desc: "Raw material and component sourcing partners." },
  { key: "exporters", label: "Exporters", desc: "Cross-border outbound trade specialists." },
  { key: "importers", label: "Importers", desc: "Inbound procurement and distribution hubs." },
  { key: "distributors", label: "Distributors", desc: "Channel and logistics resellers." },
  { key: "service", label: "Service Providers", desc: "Professional and managed services." },
  { key: "technology", label: "Technology Providers", desc: "Software, AI and platform vendors." },
  { key: "consultants", label: "Consultants", desc: "Advisory and industry experts." },
];

const TOP_COMPANY_NEWS = [
  { id: "n1", company: "Adani Green Energy", headline: "Adani Green commissions world's largest renewable energy park in Khavda.", date: "30m ago", category: "Milestone", industry: "Renewable Energy", country: "India" },
  { id: "n2", company: "Reliance Industries", headline: "Reliance Jio expands AI Cloud computing trials for enterprise partners.", date: "2 hrs ago", category: "Product Launch", industry: "IT & Technology", country: "India" },
  { id: "n3", company: "Tesla Inc.", headline: "Tesla proposes major EV assembly gigafactory layout for India corridor.", date: "4 hrs ago", category: "Expansion", industry: "Automotive & EV", country: "United States" },
  { id: "n4", company: "Larsen & Toubro", headline: "L&T wins greenfield hydrogen terminal pipeline contract in UAE.", date: "6 hrs ago", category: "Partnership", industry: "Construction & Engineering", country: "India" },
  { id: "n5", company: "G42 AI Group", headline: "G42 partners with leading US tech firms for compute center expansion.", date: "1 day ago", category: "Investment", industry: "IT & Technology", country: "UAE" },
];

const ACTIVITY_FEED = [
  { id: "a1", company: "Tata Steel", action: "Launched electric arc furnace transition program", type: "Product Launch", time: "1 hr ago" },
  { id: "a2", company: "Infosys BPM", action: "Signed automation suite partnership with European bank", type: "Partnership", time: "3 hrs ago" },
  { id: "a3", company: "Cipla", action: "Secured FDA approval for respiratory formulation", type: "Announcement", time: "5 hrs ago" },
  { id: "a4", company: "Bharat Forge", action: "Expanded aerospace components production capacity", type: "Expansion", time: "1 day ago" },
  { id: "a5", company: "BioNTech", action: "Initiated Phase II personalized oncology vaccine trial", type: "Investment", time: "2 days ago" },
];

// ─── Skeleton Loaders ────────────────────────────────────────────────────────
function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className}`} />;
}
function LeaderboardSkeleton() {
  return (
    <Card className="overflow-hidden p-4 space-y-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <SkeletonLine className="h-5 w-8" />
          <SkeletonLine className="h-8 w-8 rounded-lg" />
          <div className="flex-1 space-y-1.5">
            <SkeletonLine className="h-3 w-40" />
            <SkeletonLine className="h-2.5 w-24" />
          </div>
          <SkeletonLine className="h-3 w-16" />
        </div>
      ))}
    </Card>
  );
}
function CardSkeleton() {
  return (
    <Card className="p-5 space-y-3">
      <div className="flex items-center gap-3">
        <SkeletonLine className="h-10 w-10 rounded-xl" />
        <div className="flex-1 space-y-1.5">
          <SkeletonLine className="h-3 w-32" />
          <SkeletonLine className="h-2.5 w-20" />
        </div>
      </div>
      <SkeletonLine className="h-2.5 w-full" />
      <SkeletonLine className="h-2.5 w-3/4" />
    </Card>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function TopCompanyPagesView() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState("all");

  const [advFilters, setAdvFilters] = useState({ industry: "all", country: "all", tier: "all", size: "all", activity: "all" });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [rankingsTab, setRankingsTab] = useState<"overall" | "industry" | "sector" | "country" | "region">("overall");
  const [showMethodology, setShowMethodology] = useState(false);

  const [trendingTab, setTrendingTab] = useState<"today" | "week" | "month">("week");
  const [metricTab, setMetricTab] = useState<"followed" | "viewed" | "active">("followed");
  const [periodTab, setPeriodTab] = useState<"today" | "7d" | "30d">("today");
  const [industryLeaderTab, setIndustryLeaderTab] = useState(INDUSTRIES_LIST[0].id);
  const [countryLeaderCode, setCountryLeaderCode] = useState("IN");

  const [productSearch, setProductSearch] = useState("");

  const [watchlist, setWatchlist] = useState<string[]>(["co-2", "co-8"]);
  const [comparedIds, setComparedIds] = useState<string[]>(["co-1", "co-3"]);

  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [enquiryCompany, setEnquiryCompany] = useState<CompanyItem | null>(null);

  const [alertsConfig, setAlertsConfig] = useState({ news: true, rank: false, products: false });
  const [alertSuccess, setAlertSuccess] = useState(false);

  // Simulated data resolution (no artificial delay — resolves immediately).
  const loadData = () => {
    try {
      setError(false);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };
  const rankedCompanies = [...MASTER_COMPANIES].sort((a, b) => (a.rank ?? 99) - (b.rank ?? 99));
  const topTierCompanies = MASTER_COMPANIES.filter((c) => c.tier === "top");

  const filteredCompanies = MASTER_COMPANIES.filter((company) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        company.name.toLowerCase().includes(q) ||
        company.tagline.toLowerCase().includes(q) ||
        company.industry.toLowerCase().includes(q) ||
        company.products.some((p) => p.toLowerCase().includes(q));
      if (!matchSearch) return false;
    }
    if (quickFilter !== "all") {
      if (quickFilter === "featured" && !company.isSponsored && company.tier !== "top") return false;
      if (quickFilter === "top" && company.tier !== "top") return false;
      if (quickFilter === "trending" && (company.trendingScore ?? 0) < 80) return false;
      if (quickFilter === "verified" && company.tier === "registered") return false;
      if (quickFilter === "emerging" && company.tier !== "registered") return false;
      if (quickFilter === "rising" && company.movement !== "up" && company.movement !== "new") return false;
      if (quickFilter === "most_followed" && company.followerCount < 5000) return false;
      if (quickFilter === "most_viewed" && company.viewCount30d < 20000) return false;
    }
    if (advFilters.industry !== "all" && company.industryId !== advFilters.industry) return false;
    if (advFilters.country !== "all" && company.countryCode !== advFilters.country) return false;
    if (advFilters.tier !== "all" && company.tier !== advFilters.tier) return false;
    return true;
  });

  const handleFollowToggle = (id: string) => {
    setWatchlist(watchlist.includes(id) ? watchlist.filter((i) => i !== id) : [...watchlist, id]);
  };
  const handleCompareToggle = (id: string) => {
    if (comparedIds.includes(id)) {
      setComparedIds(comparedIds.filter((i) => i !== id));
    } else {
      if (comparedIds.length >= 4) { alert("You can compare a maximum of 4 companies."); return; }
      setComparedIds([...comparedIds, id]);
    }
  };
  const triggerEnquiry = (company: CompanyItem) => { setEnquiryCompany(company); setEnquirySuccess(false); };
  const submitEnquiry = (e: React.FormEvent) => { e.preventDefault(); setEnquirySuccess(true); setTimeout(() => { setEnquiryCompany(null); setEnquirySuccess(false); }, 2000); };
  const createAlert = () => { setAlertSuccess(true); setTimeout(() => setAlertSuccess(false), 3000); };

  const profileHref = (c: CompanyItem) => `/${locale}/company-news/${c.tier}/pages/${c.id}`;

  // ─── Error State ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-10">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center space-y-4">
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">We couldn&apos;t load company rankings.</h3>
            <button onClick={() => { setLoading(true); loadData(); }} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Loading State ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-10 space-y-8">
          <SkeletonLine className="h-40 w-full rounded-3xl" />
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <LeaderboardSkeleton />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{[0,1,2,3].map(i => <CardSkeleton key={i} />)}</div>
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-4">
              {[0,1,2].map(i => <CardSkeleton key={i} />)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4 space-y-8">

        {/* 1. Breadcrumb */}
        <nav className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 py-2" aria-label="Breadcrumb">
          <Link href="/en/news-poc" className="hover:text-amber-600">iGEN Home</Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <Link href="/en/news-poc/company-news" className="hover:text-amber-600">Company News</Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <Link href="/en/news-poc/company-news/top" className="hover:text-amber-600">Top Companies</Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="text-amber-600">Company Pages</span>
        </nav>

        {/* 2. Hero */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-[#b45309] text-white p-6 md:p-10 border border-amber-400/40 shadow-md">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
          <div className="relative z-10 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8 space-y-4">
              <span className="bg-white/20 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20 inline-block">
                Enterprise Intelligence Hub
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-none">
                Top Companies Across Industries
              </h1>
              <p className="text-xs md:text-sm text-white/85 max-w-lg leading-relaxed">
                Discover leading companies, industry champions, emerging businesses and influential organizations shaping global markets.
              </p>
              <div className="relative max-w-md w-full bg-white/15 backdrop-blur-md rounded-xl border border-white/25 p-1.5 flex items-center gap-2 mt-2">
                <Search className="h-4 w-4 text-white/70 ml-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search company, industry, sector, country or product..."
                  className="flex-1 bg-transparent border-0 outline-none text-xs text-white placeholder-white/70 py-1"
                />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="text-[10px] text-white/70 hover:text-white px-2">Clear</button>}
              </div>
              <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-bold">
                <a href="#rankings-section" className="bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg border border-white/15 transition-colors">Explore Top Companies</a>
                <a href="#compare-section" className="bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg border border-white/15 transition-colors">Compare Companies</a>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1 text-[9px] font-semibold">
                {["Top Companies", "Rankings", "Trending", "Fastest Rising", "Industry Leaders", "Companies to Watch"].map((q) => (
                  <a key={q} href="#rankings-section" className="bg-black/15 hover:bg-black/25 text-white/90 px-2 py-1 rounded-full">{q}</a>
                ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <Link href="/eoi" className="w-full md:w-auto bg-white text-gray-950 font-bold text-xs px-6 py-3.5 rounded-xl hover:shadow-lg transition-transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-1.5">
                <Plus className="h-4 w-4" /> List Your Company
              </Link>
            </div>
          </div>
        </section>

        {/* 3. Quick Filters */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3.5 rounded-2xl flex flex-wrap gap-2 items-center shadow-xs">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" /> Quick Views:
          </span>
          {[
            { label: "All Companies", val: "all" },
            { label: "Top Enterprise", val: "top" },
            { label: "Featured", val: "featured" },
            { label: "Trending", val: "trending" },
            { label: "Fastest Rising", val: "rising" },
            { label: "Verified Only", val: "verified" },
            { label: "Emerging", val: "emerging" },
            { label: "Most Followed", val: "most_followed" },
            { label: "Most Viewed", val: "most_viewed" },
          ].map((item) => (
            <button key={item.val} onClick={() => setQuickFilter(item.val)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${quickFilter === item.val ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-150 dark:bg-gray-900 text-gray-550 dark:text-gray-400 hover:text-amber-600 hover:bg-amber-50/50"}`}>
              {item.label}
            </button>
          ))}
          <button onClick={() => setShowAdvanced(!showAdvanced)} className="ml-auto text-[10px] font-bold text-amber-600 flex items-center gap-1 hover:underline">
            <Filter className="h-3 w-3" /> {showAdvanced ? "Hide Filters" : "Advanced Filters"}
          </button>
        </section>

        {/* 4. Advanced Filters */}
        {showAdvanced && (
          <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-sm space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Industry</label>
                <select value={advFilters.industry} onChange={(e) => setAdvFilters({ ...advFilters, industry: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none">
                  <option value="all">All Industries</option>
                  {INDUSTRIES_LIST.map((ind) => <option key={ind.id} value={ind.id}>{ind.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Country</label>
                <select value={advFilters.country} onChange={(e) => setAdvFilters({ ...advFilters, country: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none">
                  <option value="all">All Countries</option>
                  {COUNTRIES_LIST.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Listing Tier</label>
                <select value={advFilters.tier} onChange={(e) => setAdvFilters({ ...advFilters, tier: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none">
                  <option value="all">All Tiers</option>
                  <option value="registered">Registered (Free)</option>
                  <option value="verified">Verified (Pro)</option>
                  <option value="top">Enterprise (Top)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Company Size</label>
                <select value={advFilters.size} onChange={(e) => setAdvFilters({ ...advFilters, size: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none">
                  <option value="all">All Sizes</option>
                  <option value="startup">SME / Mid-Market (&lt;1,000)</option>
                  <option value="enterprise">Large Enterprise (1,000+)</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Activity Level</label>
                <select value={advFilters.activity} onChange={(e) => setAdvFilters({ ...advFilters, activity: e.target.value })} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none">
                  <option value="all">All Activity</option>
                  <option value="high">High Activity (&gt;80)</option>
                  <option value="med">Medium Activity</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setAdvFilters({ industry: "all", country: "all", tier: "all", size: "all", activity: "all" })} className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-900 font-semibold">Clear All</button>
              <button onClick={() => setShowAdvanced(false)} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs px-4 py-1.5 rounded-lg">Apply Filters</button>
            </div>
          </section>
        )}

        {/* 4.5 Company Directory (search + filter results) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-2">
            <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Company Directory ({filteredCompanies.length})</h3>
            <span className="text-[10px] text-gray-400 font-semibold">Discovery index</span>
          </div>
          {filteredCompanies.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-gray-855 p-6 space-y-3">
              <SlidersHorizontal className="h-8 w-8 text-gray-300 mx-auto" />
              <h4 className="text-xs font-bold text-gray-600 dark:text-gray-400">No top companies are currently available for these filters.</h4>
              <button onClick={() => { setQuickFilter("all"); setAdvFilters({ industry: "all", country: "all", tier: "all", size: "all", activity: "all" }); setSearchQuery(""); }} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-[10px] px-4 py-1.5 rounded-lg">Explore All Companies</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCompanies.map((comp) => (
                <Card key={comp.id} className="p-4 hover:border-amber-500 dark:hover:border-amber-800 transition-all flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className={`h-8 w-8 rounded-lg ${comp.tier === "top" ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-amber-600"} flex items-center justify-center font-bold text-xs`}>{comp.logoInitials}</div>
                        <div>
                          <h4 className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">{comp.name}{comp.tier === "top" && <Crown className="h-3 w-3 text-amber-500" />}</h4>
                          <p className="text-[8px] text-gray-400">{comp.industry} · {comp.location}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        {comp.tier !== "registered" && <Badge color={comp.tier === "top" ? "amber" : "emerald"}>✓ Verified</Badge>}
                        <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">{comp.country}</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-normal line-clamp-2">{comp.tagline}</p>
                    <div className="flex flex-wrap gap-1">{comp.products.slice(0, 3).map((p, i) => <span key={i} className="text-[8px] bg-gray-55 dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded font-semibold">{p}</span>)}</div>
                  </div>
                  <div className="flex justify-between items-center border-t border-gray-50 dark:border-gray-855 pt-2 text-[10px]">
                    <div className="flex gap-2">
                      <button onClick={() => handleFollowToggle(comp.id)} className={`font-semibold px-2 py-0.5 rounded ${watchlist.includes(comp.id) ? "bg-emerald-500 text-white" : "text-amber-600 hover:bg-amber-50"}`}>{watchlist.includes(comp.id) ? "Following" : "Follow"}</button>
                      <button onClick={() => handleCompareToggle(comp.id)} className={`font-semibold px-2 py-0.5 rounded ${comparedIds.includes(comp.id) ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "text-gray-500 hover:bg-gray-100"}`}>{comparedIds.includes(comp.id) ? "Comparing" : "Compare"}</button>
                    </div>
                    <Link href={profileHref(comp)} className="font-bold text-amber-600 hover:underline">View Company</Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {/* 5. Top Companies Leaderboard */}
            <section id="rankings-section" className="space-y-4">
              <SectionTitle
                title="Top Companies"
                subtitle="Leading corporates ranked by platform intelligence signals."
                action={
                  <div className="flex gap-1 flex-wrap">
                    {([
                      { label: "Overall", val: "overall" },
                      { label: "Industry", val: "industry" },
                      { label: "Sector", val: "sector" },
                      { label: "Country", val: "country" },
                      { label: "Region", val: "region" },
                    ] as const).map((tab) => (
                      <button key={tab.val} onClick={() => setRankingsTab(tab.val)} className={`px-2.5 py-1 text-[9px] font-bold rounded ${rankingsTab === tab.val ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>
                        {tab.label}
                      </button>
                    ))}
                  </div>
                }
              />
              <Card className="overflow-hidden">
                <table className="w-full text-[10px] text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-900/50 text-[8px] font-extrabold uppercase tracking-wider text-gray-550 border-b border-gray-200 dark:border-gray-800">
                      <th className="px-4 py-2.5 w-16">Rank</th>
                      <th className="px-4 py-2.5">Company</th>
                      <th className="px-4 py-2.5">Industry</th>
                      <th className="px-4 py-2.5">Country</th>
                      <th className="px-4 py-2.5 text-center">Movement</th>
                      <th className="px-4 py-2.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-150 dark:divide-gray-855">
                    {rankedCompanies.slice(0, 10).map((comp, idx) => (
                      <tr key={comp.id} className="hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                        <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">#{comp.rank ?? idx + 1}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                          <Link href={profileHref(comp)} className="hover:underline flex items-center gap-1">
                            {comp.name}
                            {comp.tier === "top" && <Crown className="h-3 w-3 text-amber-500" />}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-gray-500">{comp.industry}</td>
                        <td className="px-4 py-3 text-gray-550">{comp.country}</td>
                        <td className="px-4 py-3 text-center">{formatRankMovement(comp.movement)}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => triggerEnquiry(comp)} className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-600 text-[8px] px-2.5 py-1 rounded font-bold hover:bg-amber-500 hover:text-white transition-colors">Enquire</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
              <div className="flex justify-between items-center text-[10px] text-gray-550 font-semibold px-1">
                <button onClick={() => setShowMethodology(!showMethodology)} className="text-amber-600 hover:underline flex items-center gap-0.5">
                  <HelpCircle className="h-3 w-3 text-amber-500" /> How Rankings Work
                </button>
                <Link href="/en/news-poc/company-news/top/all" className="text-amber-600 hover:underline font-bold">View Full Rankings →</Link>
              </div>
              {showMethodology && (
                <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-xl space-y-2 animate-fadeIn text-[10px] text-gray-600 dark:text-gray-400">
                  <h4 className="font-bold text-gray-900 dark:text-white">Ranking Methodology Transparency</h4>
                  <p className="leading-relaxed">Organic rankings are calculated weekly using real-time platform signals, including aggregate profile views, news click-through rates, and follower growth.</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Platform Engagement (40%):</strong> Unique views and interaction counters.</li>
                    <li><strong>Verified Status (30%):</strong> Verification adds trust credentials.</li>
                    <li><strong>Activity Score (30%):</strong> Editorial outputs and frequency of news announcements.</li>
                  </ul>
                  <p className="text-[9px] text-amber-600 dark:text-amber-400 font-bold">✓ Sponsored placements are labeled transparently and do not alter organic positions.</p>
                </div>
              )}
            </section>

            {/* 6. Featured Companies */}
            <section id="featured-section" className="space-y-3">
              <SectionTitle title="Featured Companies" subtitle="Enterprise players with premium sponsored placement (clearly labeled)." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MASTER_COMPANIES.filter((c) => c.tier === "top" || c.isSponsored).map((comp) => (
                  <Card key={comp.id} className="p-5 border-l-4 border-amber-400 hover:border-amber-500 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        {comp.isSponsored ? <Badge color="amber"><Sparkles className="h-2.5 w-2.5" /> SPONSORED</Badge> : <Badge color="amber"><Crown className="h-2.5 w-2.5" /> FEATURED</Badge>}
                        <span className="text-[7px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Paid Placement</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-sm rounded-xl">{comp.logoInitials}</div>
                        <div>
                          <h3 className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1 hover:text-amber-600 transition-colors">{comp.name}<CheckCircle className="h-3 w-3 text-amber-500 shrink-0" /></h3>
                          <p className="text-[8px] text-gray-500 font-semibold">{comp.industry} · {comp.location}</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-600 dark:text-gray-400 font-normal leading-relaxed">{comp.tagline}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {comp.products.slice(0, 2).map((p, idx) => <span key={idx} className="text-[8px] bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded font-semibold">{p}</span>)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleFollowToggle(comp.id)} className={`text-[9px] font-bold px-2 py-1 rounded transition-colors ${watchlist.includes(comp.id) ? "bg-emerald-500 text-white" : "border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"}`}>{watchlist.includes(comp.id) ? "Following" : "Follow"}</button>
                        <button onClick={() => handleCompareToggle(comp.id)} className={`text-[9px] font-bold px-2 py-1 rounded border transition-colors ${comparedIds.includes(comp.id) ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 border-transparent" : "border-gray-250 text-gray-600 dark:border-gray-700 hover:bg-gray-100"}`}>Compare</button>
                      </div>
                      <Link href={profileHref(comp)} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center gap-0.5">View Company<ChevronRight className="h-3 w-3" /></Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 7. Top Companies by Industry (tabs) */}
            <section className="space-y-3">
              <SectionTitle title="Industry Leaders" subtitle="Top-ranked companies within each industry vertical." />
              <div className="flex flex-wrap gap-1 mb-2">
                {INDUSTRIES_LIST.map((ind) => (
                  <button key={ind.id} onClick={() => setIndustryLeaderTab(ind.id)} className={`px-2.5 py-1 text-[9px] font-bold rounded ${industryLeaderTab === ind.id ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>{ind.name}</button>
                ))}
              </div>
              <Card className="p-5 space-y-2">
                {rankedCompanies.filter((c) => c.industryId === industryLeaderTab).slice(0, 5).map((comp, idx) => (
                  <div key={comp.id} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-gray-855 last:border-0">
                    <span className="font-display font-extrabold text-sm text-amber-600 w-6">#{idx + 1}</span>
                    <div className="h-8 w-8 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-[10px]">{comp.logoInitials}</div>
                    <div className="flex-1 min-w-0">
                      <Link href={profileHref(comp)} className="font-bold text-[11px] text-gray-900 dark:text-white hover:text-amber-600 block truncate">{comp.name}</Link>
                      <span className="text-[8px] text-gray-400">{comp.location}</span>
                    </div>
                    <span className="text-[9px] font-bold text-gray-500">{comp.followerCount.toLocaleString()} follows</span>
                  </div>
                ))}
                <Link href={`/en/news-poc/company-news/top/sector?sector=${industryLeaderTab}`} className="text-[10px] text-amber-600 font-bold hover:underline block pt-1">View All {INDUSTRIES_LIST.find(i => i.id === industryLeaderTab)?.name} Companies →</Link>
              </Card>
            </section>

            {/* 8. Top Companies by Country (selector) */}
            <section className="space-y-3">
              <SectionTitle title="Global Company Leaders" subtitle="Explore leading companies by headquarters country." />
              <div className="flex flex-wrap gap-1 mb-2">
                {COUNTRIES_LIST.map((c) => (
                  <button key={c.code} onClick={() => setCountryLeaderCode(c.code)} className={`px-2.5 py-1 text-[9px] font-bold rounded ${countryLeaderCode === c.code ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>{c.flag} {c.name}</button>
                ))}
              </div>
              <Card className="p-5 space-y-2">
                {(() => {
                  const list = rankedCompanies.filter((c) => c.countryCode === countryLeaderCode).slice(0, 5);
                  const country = COUNTRIES_LIST.find((c) => c.code === countryLeaderCode);
                  return (
                    <>
                      <p className="text-[9px] font-bold uppercase tracking-wider text-amber-600">Top Companies in {country?.name}</p>
                      {list.length === 0 ? (
                        <p className="text-[10px] text-gray-500 py-3">No top companies are currently ranked in this country.</p>
                      ) : list.map((comp, idx) => (
                        <div key={comp.id} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-gray-855 last:border-0">
                          <span className="font-display font-extrabold text-sm text-amber-600 w-6">#{idx + 1}</span>
                          <div className="h-8 w-8 rounded-lg bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-[10px]">{comp.logoInitials}</div>
                          <div className="flex-1 min-w-0"><Link href={profileHref(comp)} className="font-bold text-[11px] text-gray-900 dark:text-white hover:text-amber-600 block truncate">{comp.name}</Link><span className="text-[8px] text-gray-400">{comp.industry}</span></div>
                          <span className="text-[9px] font-bold text-gray-500">{comp.viewCount30d.toLocaleString()} views</span>
                        </div>
                      ))}
                      <Link href={`/en/news-poc/company-news/top/all?country=${countryLeaderCode}`} className="text-[10px] text-amber-600 font-bold hover:underline block pt-1">Explore Companies in {country?.name} →</Link>
                    </>
                  );
                })()}
              </Card>
            </section>

            {/* 9. Industry Leaderboards (medals) */}
            <section className="space-y-3">
              <SectionTitle title="Industry Leaderboards" subtitle="Podium rankings across key industries." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INDUSTRIES_LIST.slice(0, 4).map((ind) => {
                  const podium = rankedCompanies.filter((c) => c.industryId === ind.id).slice(0, 3);
                  const medals = ["🥇", "🥈", "🥉"];
                  return (
                    <Card key={ind.id} className="p-4 space-y-2">
                      <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2">
                        <span className="text-base">{ind.icon}</span>
                        <h4 className="font-bold text-[11px] text-gray-900 dark:text-white">{ind.name}</h4>
                      </div>
                      {podium.length === 0 ? <p className="text-[9px] text-gray-400 py-2">No ranked companies yet.</p> :
                        podium.map((comp, idx) => (
                          <div key={comp.id} className="flex items-center gap-2 text-[10px]">
                            <span className="w-5 text-center">{medals[idx]}</span>
                            <Link href={profileHref(comp)} className="flex-1 truncate font-semibold text-gray-800 dark:text-gray-200 hover:text-amber-600">{comp.name}</Link>
                            <span className="text-gray-400">#{comp.rank}</span>
                          </div>
                        ))}
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* 10. Trending Companies */}
            <section className="space-y-3">
              <SectionTitle
                title="Trending Companies"
                action={
                  <div className="flex gap-1">
                    {([{ label: "Today", val: "today" }, { label: "This Week", val: "week" }, { label: "This Month", val: "month" }] as const).map((t) => (
                      <button key={t.val} onClick={() => setTrendingTab(t.val)} className={`px-2.5 py-1 text-[9px] font-bold rounded ${trendingTab === t.val ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>{t.label}</button>
                    ))}
                  </div>
                }
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[...MASTER_COMPANIES].sort((a, b) => (b.trendingScore ?? 0) - (a.trendingScore ?? 0)).slice(0, 3).map((c) => (
                  <Card key={c.id} className="p-4 space-y-2 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded">Trending {trendingTab === "today" ? "today" : trendingTab === "week" ? "this week" : "this month"}</span>
                      <Flame className="h-3.5 w-3.5 text-orange-500" />
                    </div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{c.name}</h4>
                    <p className="text-[9px] text-gray-500">{c.industry}</p>
                    <div className="flex justify-between items-center text-[9px] border-t border-gray-100 dark:border-gray-800 pt-2 font-bold">
                      <span className="text-amber-600">Score {c.trendingScore}</span>
                      <Link href={profileHref(c)} className="text-amber-600 hover:underline">Explore →</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 11. Fastest-Rising Companies */}
            <section className="space-y-3">
              <SectionTitle title="Fastest-Rising Companies" subtitle="Companies gaining meaningful attention from real platform signals." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MASTER_COMPANIES.filter((c) => c.movement === "up" || c.movement === "new").slice(0, 4).map((comp) => (
                  <div key={comp.id} className="bg-amber-50/30 dark:bg-amber-950/5 border border-amber-100 dark:border-amber-900/20 rounded-xl p-4 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[8px] bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-200 dark:border-emerald-900 px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 w-fit">↑ Rising</span>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white pt-1">{comp.name}</h4>
                      <p className="text-[9px] text-gray-500 leading-normal">Reason: {comp.risingReason ?? "Strong platform momentum"}</p>
                    </div>
                    <Link href={profileHref(comp)} className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-amber-600 hover:scale-105 transition-transform shadow-xs shrink-0"><ArrowUpRight className="h-4 w-4" /></Link>
                  </div>
                ))}
              </div>
            </section>

            {/* 12-15. Most Followed / Viewed / Active / Influential */}
            <section className="space-y-3">
              <SectionTitle title="Most Followed · Viewed · Active · Influential" />
              <div className="flex gap-1 flex-wrap mb-1">
                {([{ label: "Most Followed", val: "followed" }, { label: "Most Viewed", val: "viewed" }, { label: "Most Active", val: "active" }, { label: "Most Influential", val: "active" }] as const).map((tab, i) => (
                  <button key={i} onClick={() => setMetricTab(tab.val)} className={`px-2.5 py-1 text-[9px] font-bold rounded ${metricTab === tab.val ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>{tab.label}</button>
                ))}
              </div>
              <div className="flex gap-1 flex-wrap mb-2">
                {([{ label: "Today", val: "today" }, { label: "7 Days", val: "7d" }, { label: "30 Days", val: "30d" }] as const).map((p) => (
                  <button key={p.val} onClick={() => setPeriodTab(p.val)} className={`px-2 py-0.5 rounded text-[8px] font-bold ${periodTab === p.val ? "bg-white dark:bg-gray-850 shadow-xs text-gray-955 dark:text-white" : "text-gray-450"}`}>{p.label}</button>
                ))}
              </div>
              <Card className="p-5 divide-y divide-gray-50 dark:divide-gray-855">
                {[...MASTER_COMPANIES].sort((a, b) => {
                  if (metricTab === "followed") return b.followerCount - a.followerCount;
                  if (metricTab === "viewed") return b.viewCount30d - a.viewCount30d;
                  return (b.activityScore ?? 0) - (a.activityScore ?? 0);
                }).slice(0, 5).map((comp, idx) => (
                  <div key={comp.id} className="flex items-center gap-3 py-2.5">
                    <span className="font-display font-extrabold text-sm text-gray-250 w-5">#{idx + 1}</span>
                    <div className="h-6 w-6 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-[9px] uppercase">{comp.logoInitials}</div>
                    <div className="flex-1 min-w-0"><span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{comp.name}</span><span className="text-[8px] text-gray-400">{comp.industry}</span></div>
                    <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{metricTab === "followed" && `${comp.followerCount.toLocaleString()} follows`}{metricTab === "viewed" && `${comp.viewCount30d.toLocaleString()} views`}{metricTab === "active" && `Score: ${comp.activityScore}`}</span>
                  </div>
                ))}
              </Card>
            </section>

            {/* 16. Companies to Watch */}
            <section className="space-y-3">
              <SectionTitle title="Companies to Watch" subtitle="Fast-growing businesses showing key strategic momentum." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MASTER_COMPANIES.filter((c) => c.tier === "verified" || c.movement === "new").slice(0, 4).map((comp) => (
                  <div key={comp.id} className="bg-gray-100 dark:bg-gray-900/50 rounded-xl p-4 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[8px] bg-purple-50 dark:bg-purple-950 text-purple-600 border border-purple-200 dark:border-purple-900 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Rising Company</span>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white pt-1">{comp.name}</h4>
                      <p className="text-[9px] text-gray-500 leading-normal">{comp.tagline}</p>
                    </div>
                    <Link href={profileHref(comp)} className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-amber-600 hover:scale-105 transition-transform shadow-xs shrink-0"><ArrowUpRight className="h-4 w-4" /></Link>
                  </div>
                ))}
              </div>
            </section>

            {/* 17. Emerging Companies */}
            <section className="space-y-3">
              <SectionTitle title="Emerging Companies" subtitle="Newly registered and newly verified businesses entering the network." />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {MASTER_COMPANIES.filter((c) => c.tier === "registered" || c.movement === "new").slice(0, 3).map((comp) => (
                  <Card key={comp.id} className="p-4 space-y-2 hover:shadow-md transition-all">
                    <span className="text-[8px] bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-200 dark:border-blue-900 px-2 py-0.5 rounded font-bold uppercase">{comp.tier === "registered" ? "Newly Registered" : "New Entry"}</span>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{comp.name}</h4>
                    <p className="text-[9px] text-gray-500">{comp.industry} · {comp.location}</p>
                    <Link href={profileHref(comp)} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">View Company →</Link>
                  </Card>
                ))}
              </div>
            </section>

            {/* 18. Recently Featured */}
            <section className="space-y-3">
              <SectionTitle title="Recently Featured" subtitle="Companies recently highlighted by iGEN editors." />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {MASTER_COMPANIES.filter((c) => c.isSponsored).map((comp) => (
                  <Card key={comp.id} className="p-4 space-y-2 border-t-2 border-amber-400 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 bg-amber-50 dark:bg-amber-950/20 rounded flex items-center justify-center font-bold text-[10px] text-amber-700 dark:text-amber-300">{comp.logoInitials}</div>
                        <div><h4 className="font-bold text-[11px] text-gray-900 dark:text-white">{comp.name}</h4><p className="text-[8px] text-gray-400">{comp.industry}</p></div>
                      </div>
                      <Badge color="amber">FEATURED</Badge>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-2 text-[10px]">
                      <span className="text-gray-400">{comp.country}</span>
                      <Link href={profileHref(comp)} className="text-amber-600 font-bold hover:underline">View Company →</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Metric leaderboard */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-4">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-2.5">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white">Platform Analytics</h4>
                <Trophy className="h-4 w-4 text-amber-500" />
              </div>
              <div className="grid grid-cols-3 gap-1">
                {(["followed", "viewed", "active"] as const).map((tab) => (
                  <button key={tab} onClick={() => setMetricTab(tab)} className={`py-1 text-[9px] font-bold rounded text-center transition-colors ${metricTab === tab ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-50 dark:bg-gray-900 text-gray-500"}`}>{tab.toUpperCase()}</button>
                ))}
              </div>
              <div className="divide-y divide-gray-50 dark:divide-gray-855">
                {[...MASTER_COMPANIES].sort((a, b) => {
                  if (metricTab === "followed") return b.followerCount - a.followerCount;
                  if (metricTab === "viewed") return b.viewCount30d - a.viewCount30d;
                  return (b.activityScore ?? 0) - (a.activityScore ?? 0);
                }).slice(0, 4).map((comp, idx) => (
                  <div key={comp.id} className="flex items-center gap-3 py-2.5">
                    <span className="font-display font-extrabold text-sm text-gray-250 w-5">#{idx + 1}</span>
                    <div className="h-6 w-6 rounded bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-[9px] uppercase">{comp.logoInitials}</div>
                    <div className="flex-1 min-w-0"><span className="font-bold text-[10px] text-gray-900 dark:text-white block truncate">{comp.name}</span><span className="text-[8px] text-gray-400">{comp.industry}</span></div>
                    <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300">{metricTab === "followed" && `${comp.followerCount.toLocaleString()}`}{metricTab === "viewed" && `${comp.viewCount30d.toLocaleString()}`}{metricTab === "active" && `${comp.activityScore}`}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Browse by Industry */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Browse by Industry</h4>
              <div className="grid grid-cols-1 gap-2">
                {INDUSTRIES_LIST.slice(0, 5).map((ind) => (
                  <Link key={ind.id} href={`/en/news-poc/company-news/top/sector?sector=${ind.id}`} className="flex justify-between items-center p-2 rounded-xl bg-gray-50 dark:bg-gray-955 hover:bg-amber-50/50 hover:text-amber-600 transition-all text-[10px]">
                    <div className="flex items-center gap-2"><span className="text-sm">{ind.icon}</span><div><span className="font-bold block">{ind.name}</span><span className="text-[8px] text-gray-400">Top Co: {ind.top}</span></div></div>
                    <span className="font-bold text-slate-500">{ind.count} companies</span>
                  </Link>
                ))}
              </div>
              <Link href="/en/news-poc/company-news/top/all" className="text-[10px] text-amber-600 font-bold hover:underline block text-center pt-1.5">Explore All Sectors →</Link>
            </section>

            {/* Browse by Country */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Browse by Country</h4>
              <div className="grid grid-cols-1 gap-2">
                {COUNTRIES_LIST.map((c) => (
                  <Link key={c.code} href={`/en/news-poc/company-news/top/all?country=${c.code}`} className="flex justify-between items-center p-2 rounded-xl bg-gray-55 dark:bg-gray-955 hover:bg-amber-50/50 hover:text-amber-600 transition-all text-[10px]">
                    <div className="flex items-center gap-2"><span className="text-sm">{c.flag}</span><span className="font-bold">{c.name}</span></div>
                    <span className="font-medium text-slate-500">{c.count} companies</span>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* 19. Company Activity Intelligence */}
        <section className="space-y-4">
          <SectionTitle title="What Top Companies Are Doing" subtitle="Live intelligence on product launches, partnerships, investments and expansion." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACTIVITY_FEED.map((a) => (
              <Card key={a.id} className="p-4 flex items-start gap-3 hover:shadow-md transition-all">
                <div className="h-9 w-9 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0"><Activity className="h-4 w-4" /></div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[11px] text-gray-900 dark:text-white">{a.company}</span>
                    <Badge color="blue">{a.type}</Badge>
                  </div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-normal">{a.action}</p>
                  <span className="text-[8px] text-gray-400">{a.time}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 20. Latest News From Top Companies */}
        <section className="space-y-4">
          <SectionTitle title="Latest News From Top Companies" subtitle="Compact preview of recent corporate announcements." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TOP_COMPANY_NEWS.map((n) => (
              <Card key={n.id} className="p-4 space-y-3 border-t-2 border-amber-500 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-gray-900 dark:text-white">{n.company}</span>
                  <Badge color="blue">{n.category}</Badge>
                </div>
                <p className="text-[10px] text-gray-650 dark:text-gray-450 leading-normal">{n.headline}</p>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-2 text-[9px] text-gray-400">
                  <span>{n.date}</span>
                  <span>{n.industry} · {n.country}</span>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Link href="/en/news-poc/company-news/top/news" className="text-xs font-bold text-amber-600 hover:underline inline-flex items-center gap-0.5">View Company News →<ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
        </section>

        {/* 21. Products & Services From Top Companies */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-5">
          <SectionTitle title="Products & Services From Top Companies" subtitle="Discover offerings and raise a direct business enquiry." />
          <div className="relative max-w-md bg-gray-55 dark:bg-gray-955 rounded-xl border border-gray-200 dark:border-gray-800 p-1.5 flex items-center gap-2">
            <Search className="h-4 w-4 text-gray-450 ml-2" />
            <input type="text" value={productSearch} onChange={(e) => setProductSearch(e.target.value)} placeholder="Search products or services..." className="flex-1 bg-transparent border-0 outline-none text-xs text-gray-900 dark:text-white placeholder-gray-400 py-1" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px] border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-900/50 uppercase tracking-wider text-[8px] font-bold text-gray-450 border-b border-gray-200 dark:border-gray-800">
                  <th className="px-4 py-2.5">Company</th><th className="px-4 py-2.5">Offerings</th><th className="px-4 py-2.5">Industry</th><th className="px-4 py-2.5">Location</th><th className="px-4 py-2.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-855">
                {MASTER_COMPANIES.filter((c) => { if (!productSearch) return true; return c.products.some((p) => p.toLowerCase().includes(productSearch.toLowerCase())); }).map((comp) => (
                  <tr key={comp.id} className="hover:bg-gray-50 dark:hover:bg-gray-955">
                    <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">{comp.name}</td>
                    <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{comp.products.map((p, i) => <span key={i} className="bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded text-[8px] font-semibold">{p}</span>)}</div></td>
                    <td className="px-4 py-3 text-gray-500 font-semibold">{comp.industry}</td>
                    <td className="px-4 py-3 text-gray-550">{comp.location}</td>
                    <td className="px-4 py-3 text-right"><button onClick={() => triggerEnquiry(comp)} className="text-amber-600 font-bold hover:underline">Enquire →</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 22. Top Companies by Business Type */}
        <section className="space-y-4">
          <SectionTitle title="Top Companies by Business Type" subtitle="Filter leading companies by how they operate." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BUSINESS_TYPES.map((bt) => (
              <Card key={bt.key} className="p-4 space-y-2 hover:border-amber-400 transition-all">
                <h4 className="font-bold text-[11px] text-gray-900 dark:text-white">{bt.label}</h4>
                <p className="text-[9px] text-gray-500 leading-normal">{bt.desc}</p>
                <Link href={`/en/news-poc/company-news/top/all?type=${bt.key}`} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">Top {bt.label} →</Link>
              </Card>
            ))}
          </div>
        </section>

        {/* 23. Global Company Explorer */}
        <section className="bg-gradient-to-br from-amber-500 via-orange-600 to-[#b45309] text-white rounded-3xl p-6 md:p-8 border border-amber-400/40 space-y-5">
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            <h3 className="font-display text-lg font-black">Explore Top Companies Globally</h3>
          </div>
          <p className="text-[11px] text-white/85 max-w-lg leading-relaxed">Country → Industry → Top Companies. Narrow the global landscape to the exact market and vertical you care about.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <select className="bg-white/15 border border-white/25 rounded-lg px-3 py-2.5 text-xs text-white outline-none">
              {COUNTRIES_LIST.map((c) => <option key={c.code} className="text-gray-900">{c.flag} {c.name}</option>)}
            </select>
            <select className="bg-white/15 border border-white/25 rounded-lg px-3 py-2.5 text-xs text-white outline-none">
              {INDUSTRIES_LIST.map((ind) => <option key={ind.id} className="text-gray-900">{ind.name}</option>)}
            </select>
            <Link href="/en/news-poc/company-news/top/all" className="bg-white text-gray-950 font-bold text-xs px-6 py-2.5 rounded-lg text-center hover:bg-gray-100 transition-colors">Explore →</Link>
          </div>
        </section>

        {/* 24. Recommended Companies (logged-in) */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title="Companies You May Be Interested In" subtitle="Recommended because you follow Technology and Energy." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MASTER_COMPANIES.filter((c) => c.tier === "top").slice(0, 3).map((comp) => (
              <Card key={comp.id} className="p-4 space-y-2 hover:shadow-md transition-all">
                <div className="flex items-center gap-2"><div className="h-7 w-7 bg-amber-50 dark:bg-amber-950/20 rounded flex items-center justify-center font-bold text-[10px] text-amber-700 dark:text-amber-300">{comp.logoInitials}</div><div><h4 className="font-bold text-[11px] text-gray-900 dark:text-white">{comp.name}</h4><p className="text-[8px] text-gray-400">{comp.industry}</p></div></div>
                <p className="text-[9px] text-amber-600 font-semibold">Recommended because you follow {comp.industry.split(" ")[0]}.</p>
                <Link href={profileHref(comp)} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">View Company →</Link>
              </Card>
            ))}
          </div>
        </section>

        {/* 25. My Watchlist / Followed Companies */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title="Followed Companies" subtitle="Stay updated on companies you follow." />
          {watchlist.length === 0 ? (
            <div className="text-center py-8 bg-gray-55 dark:bg-gray-955 rounded-2xl border border-dashed border-gray-205 dark:border-gray-850 p-4 space-y-2">
              <Star className="h-6 w-6 text-gray-300 mx-auto" />
              <p className="text-xs text-gray-500">You haven&apos;t followed any companies yet.</p>
              <button onClick={() => setWatchlist(["co-1", "co-3", "co-10"])} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-[9px] px-4 py-1.5 rounded-lg">Discover Companies</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {watchlist.map((id) => {
                const comp = MASTER_COMPANIES.find((c) => c.id === id);
                if (!comp) return null;
                return (
                  <Card key={id} className="p-4 space-y-3 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2"><div className="h-6 w-6 rounded bg-amber-50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-[9px]">{comp.logoInitials}</div><div><h4 className="font-bold text-[11px] text-gray-900 dark:text-white leading-tight">{comp.name}</h4><p className="text-[8px] text-gray-400">{comp.industry}</p></div></div>
                      <button onClick={() => handleFollowToggle(id)} className="text-[8px] text-rose-500 font-bold hover:underline">Unfollow</button>
                    </div>
                    <div className="text-[9px] bg-slate-50 dark:bg-slate-900 p-2 rounded text-slate-500 space-y-1"><div><strong>Rank position:</strong> #{comp.rank}</div><div><strong>Recent activity:</strong> {comp.newsCount30d} news updates</div></div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* 26. Company Alerts */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
          <SectionTitle title="Stay Updated on Top Companies" />
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 text-[10px] font-bold text-gray-600 dark:text-gray-400">
              <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={alertsConfig.news} onChange={(e) => setAlertsConfig({ ...alertsConfig, news: e.target.checked })} className="rounded text-amber-600" /> Company News</label>
              <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={alertsConfig.rank} onChange={(e) => setAlertsConfig({ ...alertsConfig, rank: e.target.checked })} className="rounded text-amber-600" /> Ranking Shifts</label>
              <label className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={alertsConfig.products} onChange={(e) => setAlertsConfig({ ...alertsConfig, products: e.target.checked })} className="rounded text-amber-600" /> Product Launches</label>
            </div>
            <button onClick={createAlert} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors w-full sm:w-auto text-center">Create Alert</button>
          </div>
          {alertSuccess && <p className="text-[9px] text-emerald-500 font-bold animate-fadeIn">✓ Company alerts successfully registered to your profile dashboard.</p>}
        </section>

        {/* 27. Company Comparison */}
        <section id="compare-section" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title="Compare Top Companies" subtitle="Select up to 4 companies to compare key signals side-by-side." />
          {comparedIds.length < 2 ? (
            <div className="text-center py-8 bg-gray-55 dark:bg-gray-955 rounded-2xl border border-dashed border-gray-205 dark:border-gray-850 p-4 space-y-2">
              <SlidersHorizontal className="h-6 w-6 text-gray-300 mx-auto" />
              <p className="text-xs text-gray-500">Please select at least 2 companies to see comparative stats.</p>
              <div className="flex gap-2 justify-center text-[9px] font-bold">
                <button onClick={() => setComparedIds(["co-1", "co-3"])} className="text-amber-600 hover:underline">Tata Steel vs Adani Green</button>
                <span className="text-gray-300">|</span>
                <button onClick={() => setComparedIds(["co-4", "co-8"])} className="text-amber-600 hover:underline">Cipla vs NexusTech</button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] border-collapse">
                <thead>
                  <tr className="bg-gray-55 dark:bg-gray-900/50 border-b border-gray-205 dark:border-gray-800 text-[8px] font-extrabold uppercase tracking-wider text-gray-500">
                    <th className="px-4 py-3 w-40">Features</th>
                    {comparedIds.map((id) => {
                      const comp = MASTER_COMPANIES.find((c) => c.id === id);
                      return (
                        <th key={id} className="px-4 py-3">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-900 dark:text-white block">{comp?.name}</span>
                            <button onClick={() => handleCompareToggle(id)} className="text-rose-500 hover:text-rose-700 font-bold ml-2 text-[8px]">Remove</button>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                  {[
                    { label: "Industry", get: (c: CompanyItem) => c.industry },
                    { label: "Geography", get: (c: CompanyItem) => `${c.location} (${c.country})` },
                    { label: "Listing Tier", get: (c: CompanyItem) => c.tier === "top" ? "Enterprise" : c.tier === "verified" ? "Verified Pro" : "Registered" },
                    { label: "Followers", get: (c: CompanyItem) => c.followerCount.toLocaleString() },
                    { label: "30d Views", get: (c: CompanyItem) => c.viewCount30d.toLocaleString() },
                    { label: "Activity Score", get: (c: CompanyItem) => `${c.activityScore}` },
                    { label: "Rank", get: (c: CompanyItem) => `#${c.rank}` },
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="px-4 py-3 font-semibold text-gray-400 uppercase text-[8px]">{row.label}</td>
                      {comparedIds.map((id) => {
                        const comp = MASTER_COMPANIES.find((c) => c.id === id);
                        return <td key={id} className="px-4 py-3 font-bold text-gray-900 dark:text-white">{comp ? row.get(comp) : "—"}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* 28. Company Snapshot (compact discovery preview) */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title="Company Snapshot" subtitle="A compact comparison / discovery preview — open the full profile to explore." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {topTierCompanies.slice(0, 4).map((comp) => (
              <Card key={comp.id} className="p-4 flex items-center gap-3 hover:shadow-md transition-all">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-sm">{comp.logoInitials}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1"><h4 className="font-bold text-[11px] text-gray-900 dark:text-white truncate">{comp.name}</h4><Crown className="h-3 w-3 text-amber-500" /></div>
                  <p className="text-[8px] text-gray-400">{comp.industry} · {comp.country} · Rank #{comp.rank}</p>
                  <div className="flex gap-2 text-[8px] text-gray-500 mt-1"><span>👁 {comp.viewCount30d.toLocaleString()}</span><span>★ {comp.followerCount.toLocaleString()}</span><span>📰 {comp.newsCount30d}</span></div>
                </div>
                <Link href={profileHref(comp)} className="text-[9px] font-bold text-amber-600 hover:underline whitespace-nowrap">View Company →</Link>
              </Card>
            ))}
          </div>
        </section>

        {/* 29. Premium Company Intelligence */}
        <section className="bg-gradient-to-r from-slate-950 via-[#170e30] to-[#2b1754] text-white rounded-3xl p-6 md:p-8 border border-purple-900/60 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
          <div className="space-y-2">
            <span className="bg-purple-500/20 text-purple-300 text-[8px] font-bold px-2.5 py-1 rounded uppercase border border-purple-400/20 tracking-wider">iGEN Intelligence Hub</span>
            <h3 className="font-display font-black text-lg md:text-xl">Unlock Advanced Company Intelligence</h3>
            <p className="text-[10px] md:text-xs text-purple-200 max-w-lg leading-relaxed font-normal">Ranking history, advanced comparison, activity trends, saved company lists, export and premium alerts.</p>
          </div>
          <Link href="/eoi" className="bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs px-6 py-3.5 rounded-xl transition-all hover:shadow-lg whitespace-nowrap">Upgrade</Link>
        </section>

        {/* 30. Featured Company Spotlight */}
        <section className="space-y-4">
          <SectionTitle title="Featured Company Spotlight" subtitle="Commercial placement opportunities — sponsored content is clearly labeled." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MASTER_COMPANIES.filter((c) => c.isSponsored).map((comp) => (
              <Card key={comp.id} className="p-6 border-l-4 border-amber-400 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge color="amber"><Sparkles className="h-2.5 w-2.5" /> SPONSORED</Badge>
                  <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Paid Spotlight</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg">{comp.logoInitials}</div>
                  <div><h3 className="font-bold text-sm text-gray-900 dark:text-white">{comp.name}</h3><p className="text-[9px] text-gray-500">{comp.industry} · {comp.location}</p></div>
                </div>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">{comp.tagline}</p>
                <div className="flex gap-2 pt-1">
                  <button onClick={() => triggerEnquiry(comp)} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-[10px] px-4 py-2 rounded-lg">Send Business Enquiry</button>
                  <Link href={profileHref(comp)} className="border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold text-[10px] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">View Company →</Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 31. Business Lead Generation */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title="Start a Business Conversation" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Send Business Enquiry", icon: Mail },
              { label: "Request Quote", icon: FileText },
              { label: "Schedule Meeting", icon: Calendar },
              { label: "Contact Company", icon: Phone },
            ].map((b, i) => {
              const BIcon = b.icon;
              return (
                <button key={i} onClick={() => triggerEnquiry(topTierCompanies[0])} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-amber-400 hover:bg-amber-50/40 transition-all">
                  <BIcon className="h-5 w-5 text-amber-600" />
                  <span className="text-[9px] font-bold text-gray-700 dark:text-gray-300 text-center">{b.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 32. Register / Promote Your Company */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-8 rounded-3xl text-center space-y-4 shadow-sm">
          <Crown className="h-8 w-8 text-amber-500 mx-auto" />
          <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">Want Your Company to Be Discovered?</h3>
          <p className="text-gray-550 dark:text-slate-400 text-xs font-normal max-w-md mx-auto leading-relaxed">Put your company in front of professionals, buyers and industry audiences. Get a listing, industry visibility, featured placement, business enquiries and analytics.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center text-xs font-bold pt-2">
            <Link href="/eoi" className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 px-8 py-3 rounded-xl hover:shadow-md transition-all">Register Your Company</Link>
            <Link href="/eoi" className="border border-gray-200 dark:border-gray-700 text-gray-650 dark:text-gray-400 hover:bg-gray-55 px-8 py-3 rounded-xl transition-all">Explore Company Plans</Link>
          </div>
        </section>

      </div>

      {/* Lead Enquiry Modal */}
      {enquiryCompany && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-850 pb-2">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">Business Enquiry for {enquiryCompany.name}</h3>
              <button onClick={() => setEnquiryCompany(null)} className="text-gray-400 hover:text-gray-650 font-bold">✕</button>
            </div>
            {enquirySuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" />
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">Enquiry Submitted Successfully!</h4>
                <p className="text-[10px] text-gray-500">Your query has been routed through iGEN CRM to {enquiryCompany.name}.</p>
              </div>
            ) : (
              <form onSubmit={submitEnquiry} className="space-y-3 text-xs">
                <div className="space-y-1"><label className="text-[8px] font-bold text-gray-400 uppercase">Your Work Email</label><input required type="email" placeholder="you@company.com" className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 outline-none" /></div>
                <div className="space-y-1"><label className="text-[8px] font-bold text-gray-400 uppercase">Requirement Type</label><select className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 outline-none"><option>Product Sourcing Quote</option><option>Supply Chain Collaboration</option><option>Bilateral Partnership proposal</option><option>Advisory Speaking Engagement</option></select></div>
                <div className="space-y-1"><label className="text-[8px] font-bold text-gray-400 uppercase">Enquiry Message</label><textarea required rows={4} placeholder="Describe your business procurement requirements in detail..." className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 outline-none resize-none" /></div>
                <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs py-3 rounded-lg transition-colors">Submit Direct Enquiry</button>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}


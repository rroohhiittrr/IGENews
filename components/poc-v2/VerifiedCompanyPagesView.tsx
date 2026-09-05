"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Star,
  Globe,
  Briefcase,
  Users,
  BarChart3,
  ArrowUpRight,
  Sparkles,
  Crown,
  Building2,
  CheckCircle,
  Award,
  Flame,
  Target,
  Zap,
  Bookmark,
  BookmarkCheck,
  Bell,
  BellRing,
  Eye,
  Activity,
  ShieldCheck,
  Shield,
  Lock,
  Newspaper,
  PieChart,
  Rocket,
  Scale,
  Package,
  Truck,
  Wrench,
  Factory,
  Filter,
  SlidersHorizontal,
  Plus,
  Minus,
  Tag,
  Calendar,
  Clock,
  MapPin,
  Share2,
  Download,
  FileText,
  Info,
  AlertTriangle,
  Settings,
  Mail,
  Check,
  ExternalLink,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

interface VerifiedCompany {
  id: string;
  name: string;
  logoInitials: string;
  tagline: string;
  industry: string;
  industryId: string;
  country: string;
  countryCode: string;
  countryFlag: string;
  followers: number;
  views: number;
  newsCount: number;
  products: string[];
  founded: string;
  employees: string;
  verifiedDate: string;
  rank: number;
  prevRank: number;
  movement: "up" | "down" | "same" | "new";
  activityScore: number;
  trendingScore: number;
  isSponsored?: boolean;
  isFeatured?: boolean;
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOCAL UI COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

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
    slate: "bg-slate-50 dark:bg-slate-950/20 text-slate-600 border border-slate-200 dark:border-slate-900/40",
    cyan: "bg-cyan-50 dark:bg-cyan-950/20 text-cyan-600 border border-cyan-200 dark:border-cyan-900/40",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.blue}`}>
      {children}
    </span>
  );
}

function RankBadge({ rank }: { rank: number }) {
  const colors = rank <= 3 ? "bg-amber-500 text-white" : rank <= 10 ? "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300" : "bg-gray-100 dark:bg-gray-900 text-gray-500";
  return <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-[9px] font-bold ${colors}`}>#{rank}</span>;
}

function MovementIndicator({ movement, prevRank, rank }: { movement: string; prevRank: number; rank: number }) {
  if (movement === "up") return <span className="text-[8px] font-bold text-emerald-500 flex items-center gap-0.5"><TrendingUp className="h-3 w-3" />↑{prevRank - rank}</span>;
  if (movement === "down") return <span className="text-[8px] font-bold text-rose-500 flex items-center gap-0.5"><TrendingDown className="h-3 w-3" />↓{rank - prevRank}</span>;
  if (movement === "new") return <Badge color="cyan">NEW</Badge>;
  return <span className="text-[8px] text-gray-400">→</span>;
}

// ═══════════════════════════════════════════════════════════════════════════════
// SEED DATA — VERIFIED COMPANIES
// ═══════════════════════════════════════════════════════════════════════════════

const VERIFIED_COMPANIES: VerifiedCompany[] = [
  { id: "vc-1", name: "Tata Consultancy Services", logoInitials: "TCS", tagline: "Global IT services, consulting and business solutions leader.", industry: "Technology & Enterprise Software", industryId: "tech", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 48200, views: 142000, newsCount: 34, products: ["TCS BaNCS", "TCS iON", "ignio"], founded: "1968", employees: "600,000+", verifiedDate: "2024-01-15", rank: 1, prevRank: 1, movement: "same", activityScore: 96, trendingScore: 88, isFeatured: true },
  { id: "vc-2", name: "Infosys Limited", logoInitials: "INF", tagline: "Digital services and consulting powering enterprises globally.", industry: "Technology & Enterprise Software", industryId: "tech", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 42100, views: 128000, newsCount: 28, products: ["Infosys Nia", "Cobalt", "Wingspan"], founded: "1981", employees: "340,000+", verifiedDate: "2024-02-10", rank: 2, prevRank: 3, movement: "up", activityScore: 94, trendingScore: 91 },
  { id: "vc-3", name: "Reliance Industries", logoInitials: "RIL", tagline: "India's largest conglomerate spanning energy, retail, telecom and digital.", industry: "Energy & Sustainability", industryId: "energy", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 56000, views: 198000, newsCount: 42, products: ["Jio Platforms", "Reliance Retail", "Green H₂"], founded: "1966", employees: "380,000+", verifiedDate: "2024-01-08", rank: 3, prevRank: 2, movement: "down", activityScore: 98, trendingScore: 95, isFeatured: true },
  { id: "vc-4", name: "HDFC Bank", logoInitials: "HDFC", tagline: "India's largest private sector bank by assets and market cap.", industry: "Banking & Financial Services", industryId: "bfsi", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 38500, views: 102000, newsCount: 22, products: ["SmartBuy", "PayZapp", "DigiLocker"], founded: "1994", employees: "180,000+", verifiedDate: "2024-03-01", rank: 4, prevRank: 4, movement: "same", activityScore: 89, trendingScore: 72 },
  { id: "vc-5", name: "Wipro Technologies", logoInitials: "WPR", tagline: "Global technology services and consulting company.", industry: "Technology & Enterprise Software", industryId: "tech", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 29800, views: 86000, newsCount: 19, products: ["Holmes AI", "FullStride Cloud", "Lab45"], founded: "1945", employees: "240,000+", verifiedDate: "2024-04-12", rank: 5, prevRank: 6, movement: "up", activityScore: 85, trendingScore: 68 },
  { id: "vc-6", name: "Larsen & Toubro", logoInitials: "L&T", tagline: "India's leading engineering, construction and technology conglomerate.", industry: "Infrastructure & Urban Development", industryId: "infra", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 31200, views: 94000, newsCount: 25, products: ["L&T EduTech", "L&T Construction", "Smart Cities"], founded: "1938", employees: "130,000+", verifiedDate: "2024-02-28", rank: 6, prevRank: 5, movement: "down", activityScore: 87, trendingScore: 74 },
  { id: "vc-7", name: "Sun Pharmaceutical", logoInitials: "SUN", tagline: "World's 4th largest specialty generic pharmaceutical company.", industry: "Pharmaceuticals & Formulations", industryId: "pharma", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 18900, views: 54000, newsCount: 14, products: ["Absorica", "Ilumya", "Drizalma"], founded: "1983", employees: "41,000+", verifiedDate: "2024-05-20", rank: 7, prevRank: 9, movement: "up", activityScore: 78, trendingScore: 81, isSponsored: true },
  { id: "vc-8", name: "Bharat Electronics Ltd", logoInitials: "BEL", tagline: "India's premier defence electronics company under Ministry of Defence.", industry: "Defence & Aerospace", industryId: "defence", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 22400, views: 68000, newsCount: 18, products: ["Radar Systems", "EW Suites", "Avionics"], founded: "1954", employees: "11,000+", verifiedDate: "2024-06-01", rank: 8, prevRank: 10, movement: "up", activityScore: 82, trendingScore: 86 },
  { id: "vc-9", name: "Adani Green Energy", logoInitials: "AGE", tagline: "India's largest renewable energy company with 20+ GW operational capacity.", industry: "New & Renewable Clean Energy", industryId: "energy", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 26300, views: 78000, newsCount: 21, products: ["Solar Parks", "Wind Farms", "Green Corridor"], founded: "2015", employees: "3,200+", verifiedDate: "2024-04-05", rank: 9, prevRank: 7, movement: "down", activityScore: 84, trendingScore: 79 },
  { id: "vc-10", name: "Zomato", logoInitials: "ZMT", tagline: "India's leading food delivery and quick-commerce platform.", industry: "Retail & E-Commerce", industryId: "retail", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 35600, views: 112000, newsCount: 31, products: ["Blinkit", "Hyperpure", "Zomato Gold"], founded: "2008", employees: "5,800+", verifiedDate: "2024-07-10", rank: 10, prevRank: 12, movement: "up", activityScore: 91, trendingScore: 93, isFeatured: true },
  { id: "vc-11", name: "Mahindra & Mahindra", logoInitials: "M&M", tagline: "Leading manufacturer of SUVs, farm equipment, and tech solutions.", industry: "Automotive & Electric Vehicles", industryId: "auto", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 28700, views: 89000, newsCount: 23, products: ["XUV Series", "Thar", "Farm Machinery"], founded: "1945", employees: "260,000+", verifiedDate: "2024-03-15", rank: 11, prevRank: 11, movement: "same", activityScore: 86, trendingScore: 71 },
  { id: "vc-12", name: "HCL Technologies", logoInitials: "HCL", tagline: "Global technology company delivering end-to-end digital transformation.", industry: "Technology & Enterprise Software", industryId: "tech", country: "India", countryCode: "IN", countryFlag: "🇮🇳", followers: 24100, views: 72000, newsCount: 16, products: ["DRYiCE", "HCL Volt MX", "CloudSMART"], founded: "1976", employees: "225,000+", verifiedDate: "2024-05-01", rank: 12, prevRank: 8, movement: "down", activityScore: 80, trendingScore: 64 },
];

const INDUSTRY_LEADERS_DATA: { industry: string; companies: string[] }[] = [
  { industry: "Technology", companies: ["TCS", "Infosys", "Wipro", "HCL Technologies"] },
  { industry: "Energy", companies: ["Reliance Industries", "Adani Green Energy", "NTPC", "Tata Power"] },
  { industry: "Healthcare", companies: ["Sun Pharmaceutical", "Dr. Reddy's", "Cipla", "Lupin"] },
  { industry: "Financial Services", companies: ["HDFC Bank", "ICICI Bank", "Kotak Mahindra", "Bajaj Finance"] },
  { industry: "Infrastructure", companies: ["L&T", "Adani Ports", "DLF", "Godrej Properties"] },
  { industry: "Automotive", companies: ["Mahindra & Mahindra", "Tata Motors", "Maruti Suzuki", "Bajaj Auto"] },
];

const COUNTRY_DATA: { country: string; flag: string; count: number; topCompany: string }[] = [
  { country: "India", flag: "🇮🇳", count: 1240, topCompany: "TCS" },
  { country: "United States", flag: "🇺🇸", count: 860, topCompany: "Apple" },
  { country: "United Kingdom", flag: "🇬🇧", count: 420, topCompany: "HSBC" },
  { country: "UAE", flag: "🇦🇪", count: 310, topCompany: "ADNOC" },
  { country: "Germany", flag: "🇩🇪", count: 380, topCompany: "Siemens" },
  { country: "Singapore", flag: "🇸🇬", count: 290, topCompany: "DBS" },
  { country: "Japan", flag: "🇯🇵", count: 350, topCompany: "Toyota" },
  { country: "Australia", flag: "🇦🇺", count: 210, topCompany: "BHP" },
];

const NEWS_ITEMS = [
  { id: "n1", company: "TCS", verified: true, title: "TCS wins $2.5B deal with a major European bank for core modernization", type: "Deal", industry: "Technology", time: "2h ago" },
  { id: "n2", company: "Reliance Industries", verified: true, title: "Reliance launches ₹75,000 Cr green hydrogen mega-project in Jamnagar", type: "Expansion", industry: "Energy", time: "4h ago" },
  { id: "n3", company: "Zomato", verified: true, title: "Zomato's Blinkit crosses 1,000 dark stores — Q2 revenue up 68%", type: "Earnings", industry: "E-Commerce", time: "6h ago" },
  { id: "n4", company: "Sun Pharmaceutical", verified: true, title: "Sun Pharma receives FDA approval for new specialty dermatology drug", type: "Regulatory", industry: "Pharma", time: "8h ago" },
  { id: "n5", company: "Bharat Electronics", verified: true, title: "BEL secures ₹8,200 Cr order for advanced radar and EW systems", type: "Contract", industry: "Defence", time: "12h ago" },
];

const PRODUCT_LAUNCHES = [
  { company: "TCS", product: "TCS Pace Studio", desc: "AI-powered innovation lab for enterprise digital acceleration.", industry: "Technology" },
  { company: "Reliance", product: "Jio AirFiber", desc: "Fixed wireless broadband delivering 1Gbps to homes and businesses.", industry: "Telecom" },
  { company: "Infosys", product: "Topaz AI Suite", desc: "Generative AI platform for enterprise workflow automation.", industry: "Technology" },
  { company: "HDFC Bank", product: "SmartWealth 3.0", desc: "AI-driven wealth management platform for HNI and retail investors.", industry: "BFSI" },
  { company: "Zomato", product: "Blinkit Café", desc: "Quick-commerce cafe concept delivering barista coffee in 10 minutes.", industry: "E-Commerce" },
];

const BUSINESS_CATEGORIES = [
  { label: "Manufacturers", icon: Factory, count: "2,400+" },
  { label: "Suppliers", icon: Package, count: "1,600+" },
  { label: "Exporters", icon: Globe, count: "980+" },
  { label: "Importers", icon: Truck, count: "720+" },
  { label: "Service Providers", icon: Wrench, count: "1,800+" },
  { label: "Technology Providers", icon: Zap, count: "1,100+" },
  { label: "Consultants", icon: Briefcase, count: "640+" },
  { label: "Distributors", icon: ArrowRight, count: "890+" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function VerifiedCompanyPagesView() {
  const router = useRouter();

  // ─── State ──────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState<string>("All");
  const [topTab, setTopTab] = useState<"global" | "industry" | "country">("global");
  const [rankTab, setRankTab] = useState<"global" | "industry" | "country" | "followers" | "active" | "views" | "rising" | "engaged">("global");
  const [trendTab, setTrendTab] = useState<"today" | "week" | "month">("week");
  const [followedCompanies, setFollowedCompanies] = useState<string[]>(["vc-1", "vc-3", "vc-10"]);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [showRankInfo, setShowRankInfo] = useState(false);

  // ─── Derived ────────────────────────────────────────────────────────────────
  const companyMap = useMemo(() => {
    const m: Record<string, VerifiedCompany> = {};
    VERIFIED_COMPANIES.forEach((c) => (m[c.id] = c));
    return m;
  }, []);

  const filteredCompanies = useMemo(() => {
    let list = [...VERIFIED_COMPANIES];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.country.toLowerCase().includes(q) ||
          c.products.some((p) => p.toLowerCase().includes(q))
      );
    }
    switch (quickFilter) {
      case "Featured": list = list.filter((c) => c.isFeatured); break;
      case "Top": list = list.sort((a, b) => a.rank - b.rank).slice(0, 5); break;
      case "Trending": list = list.sort((a, b) => b.trendingScore - a.trendingScore).slice(0, 6); break;
      case "Emerging": list = list.filter((c) => c.movement === "up" || c.movement === "new"); break;
      case "Recently Verified": list = list.sort((a, b) => new Date(b.verifiedDate).getTime() - new Date(a.verifiedDate).getTime()).slice(0, 6); break;
      case "Most Followed": list = list.sort((a, b) => b.followers - a.followers).slice(0, 6); break;
      case "Most Active": list = list.sort((a, b) => b.activityScore - a.activityScore).slice(0, 6); break;
      default: break;
    }
    return list;
  }, [searchQuery, quickFilter]);

  const toggleFollow = (id: string) => {
    setFollowedCompanies((prev) => (prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]));
  };

  const toggleCompare = (id: string) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const formatNum = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K`;
    return n.toString();
  };

  // ─── Company Card ───────────────────────────────────────────────────────────
  const CompanyCard = ({ company, showRank = false }: { company: VerifiedCompany; showRank?: boolean }) => (
    <div className={`border rounded-xl p-4 hover:shadow-md transition-all group ${company.isSponsored ? "border-amber-200 dark:border-amber-900/30 bg-amber-50/10 dark:bg-amber-950/5" : "border-gray-200 dark:border-gray-800"}`}>
      <div className="flex items-start gap-3">
        {showRank && <RankBadge rank={company.rank} />}
        <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">
          {company.logoInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="font-bold text-xs text-gray-900 dark:text-white truncate">{company.name}</span>
            <span className="bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 text-[7px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
              <CheckCircle className="h-2.5 w-2.5" /> Verified
            </span>
            {company.isSponsored && <span className="bg-amber-500 text-white text-[6px] font-bold px-1.5 py-0.5 rounded">SPONSORED</span>}
            {company.isFeatured && !company.isSponsored && <span className="bg-blue-500 text-white text-[6px] font-bold px-1.5 py-0.5 rounded">FEATURED</span>}
          </div>
          <p className="text-[9px] text-gray-500 mt-0.5">{company.industry} · {company.countryFlag} {company.country}</p>
          <p className="text-[9px] text-gray-400 mt-0.5 line-clamp-1">{company.tagline}</p>
        </div>
        {showRank && <MovementIndicator movement={company.movement} prevRank={company.prevRank} rank={company.rank} />}
      </div>

      {/* Products */}
      <div className="flex flex-wrap gap-1 mt-2.5">
        {company.products.slice(0, 3).map((p) => (
          <span key={p} className="text-[7px] font-bold bg-gray-100 dark:bg-gray-900 text-gray-500 px-1.5 py-0.5 rounded">{p}</span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-850">
        <button
          onClick={() => toggleFollow(company.id)}
          className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
            followedCompanies.includes(company.id)
              ? "bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600"
              : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-emerald-600"
          }`}
        >
          {followedCompanies.includes(company.id) ? <BookmarkCheck className="h-3 w-3" /> : <Bookmark className="h-3 w-3" />}
          {followedCompanies.includes(company.id) ? "Following" : "Follow"}
        </button>
        <button
          onClick={() => toggleCompare(company.id)}
          className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
            compareList.includes(company.id)
              ? "bg-purple-100 dark:bg-purple-950/30 text-purple-600"
              : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-purple-600"
          }`}
        >
          <Scale className="h-3 w-3" /> Compare
        </button>
        <Link href="/eoi" className="ml-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex items-center gap-1">
          View Company <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  );

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── S1: Breadcrumb ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 lg:px-6 pt-4">
        <nav className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
          <button onClick={() => router.back()} className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back
          </button>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span>Company News</span>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span>Verified Company</span>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-emerald-600 font-bold">Company Pages</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-4 lg:px-6 pt-5 space-y-8">

        {/* ── S2: Hero ─────────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E\")" }} />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Badge color="emerald"><CheckCircle className="h-2.5 w-2.5" /> VERIFIED COMPANIES</Badge>
              <Badge color="amber"><ShieldCheck className="h-2.5 w-2.5" /> TRUSTED</Badge>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold leading-tight">
              Discover Verified Companies
            </h1>
            <p className="text-emerald-100 text-sm font-normal max-w-2xl">
              Explore trusted, verified and high-performing companies across industries, discover rising businesses and find companies worth following.
            </p>

            {/* Search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search verified companies, industries, products or services..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-emerald-200 text-sm outline-none focus:border-white/50 focus:bg-white/15 transition-all"
              />
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3 mt-2">
              <Link href="/eoi" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-xs px-5 py-2.5 rounded-lg transition-all inline-flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" /> Explore Verified Companies
              </Link>
              <Link href="/eoi" className="border border-white/30 hover:bg-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all inline-flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" /> Get Your Company Verified
              </Link>
            </div>
          </div>
        </div>

        {/* ── S3: Quick Filters ─────────────────────────────────────────────── */}
        <Card className="p-4">
          <div className="flex flex-wrap gap-2">
            {["All", "Featured", "Top", "Trending", "Emerging", "Recently Verified", "Most Followed", "Most Active"].map((f) => (
              <button
                key={f}
                onClick={() => setQuickFilter(f)}
                className={`text-[10px] font-bold px-3.5 py-1.5 rounded-lg transition-all ${
                  quickFilter === f
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {f === "Trending" && <Flame className="h-3 w-3 inline mr-1" />}
                {f === "Featured" && <Award className="h-3 w-3 inline mr-1" />}
                {f === "Recently Verified" && <CheckCircle className="h-3 w-3 inline mr-1" />}
                {f}
              </button>
            ))}
          </div>
          {searchQuery && (
            <p className="text-[10px] text-gray-500 mt-2">
              Showing {filteredCompanies.length} result{filteredCompanies.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
            </p>
          )}
        </Card>

        {/* ── S4: Featured Verified Companies ──────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Featured Verified Companies"
            subtitle="Editorially selected and promoted verified businesses"
            action={<Badge color="amber"><Award className="h-2.5 w-2.5" /> FEATURED</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {VERIFIED_COMPANIES.filter((c) => c.isFeatured || c.isSponsored).map((c) => (
              <CompanyCard key={c.id} company={c} />
            ))}
          </div>
        </Card>

        {/* ── S5: Top Verified Companies ───────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Top Verified Companies"
            subtitle="Highest-ranked verified companies on the platform"
            action={
              <div className="flex gap-1">
                {(["global", "industry", "country"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTopTab(tab)}
                    className={`text-[9px] font-bold px-2.5 py-1 rounded-lg transition-all capitalize ${
                      topTab === tab ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-gray-900 text-gray-500"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {VERIFIED_COMPANIES.slice(0, 6).map((c) => (
              <CompanyCard key={c.id} company={c} showRank />
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between">
            <button onClick={() => setShowRankInfo(!showRankInfo)} className="text-[9px] font-bold text-emerald-600 hover:underline flex items-center gap-1">
              <HelpCircle className="h-3 w-3" /> How Rankings Work
            </button>
            <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline flex items-center gap-1">
              View All Rankings <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          {showRankInfo && (
            <div className="mt-3 bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/30 rounded-xl p-4 text-[9px] text-gray-600 dark:text-gray-400 space-y-1">
              <p className="font-bold text-emerald-700 text-[10px]">Ranking Methodology</p>
              <p>Rankings are based on a weighted combination of: profile views (30%), follower count (25%), news activity (20%), engagement rate (15%), and platform activity score (10%). Updated weekly. Paid placements do not influence organic rankings.</p>
            </div>
          )}
        </Card>

        {/* ── S6: Verified Company Rankings ─────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Verified Company Rankings"
            subtitle="Complete ranking table across all categories"
            action={
              <div className="flex flex-wrap gap-1">
                {(["global", "industry", "country", "followers", "active", "views", "rising", "engaged"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setRankTab(tab)}
                    className={`text-[8px] font-bold px-2 py-1 rounded-lg transition-all capitalize ${
                      rankTab === tab ? "bg-emerald-600 text-white" : "bg-gray-100 dark:bg-gray-900 text-gray-500"
                    }`}
                  >
                    {tab === "followers" ? "Most Followed" : tab === "active" ? "Most Active" : tab === "views" ? "Most Viewed" : tab === "rising" ? "Fastest Rising" : tab === "engaged" ? "Most Engaged" : tab}
                  </button>
                ))}
              </div>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-2 pr-2">Rank</th>
                  <th className="text-left py-2 pr-3">Company</th>
                  <th className="text-left py-2 pr-3 hidden md:table-cell">Industry</th>
                  <th className="text-right py-2 pr-3">Views</th>
                  <th className="text-right py-2 pr-3">Followers</th>
                  <th className="text-center py-2 pr-3">Activity</th>
                  <th className="text-center py-2">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                {VERIFIED_COMPANIES.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="py-2.5 pr-2"><RankBadge rank={c.rank} /></td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[7px] shrink-0">{c.logoInitials}</div>
                        <div>
                          <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">
                            {c.name} <CheckCircle className="h-3 w-3 text-emerald-500" />
                          </span>
                          <span className="text-[8px] text-gray-400">{c.countryFlag} {c.country}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3 text-[9px] text-gray-500 hidden md:table-cell">{c.industry.split(" ").slice(0, 2).join(" ")}</td>
                    <td className="text-right py-2.5 pr-3 font-bold text-gray-700 dark:text-gray-300 text-[10px]">{formatNum(c.views)}</td>
                    <td className="text-right py-2.5 pr-3 font-bold text-gray-700 dark:text-gray-300 text-[10px]">{formatNum(c.followers)}</td>
                    <td className="text-center py-2.5 pr-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-1.5 max-w-[60px] mx-auto">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${c.activityScore}%` }} />
                      </div>
                    </td>
                    <td className="text-center py-2.5">
                      <MovementIndicator movement={c.movement} prevRank={c.prevRank} rank={c.rank} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* ── S7: Trending Verified Companies ──────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Trending Verified Companies"
            subtitle="Companies with the highest engagement and activity right now"
            action={
              <div className="flex gap-1">
                {(["today", "week", "month"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setTrendTab(tab)}
                    className={`text-[9px] font-bold px-2.5 py-1 rounded-lg transition-all capitalize ${
                      trendTab === tab ? "bg-orange-500 text-white" : "bg-gray-100 dark:bg-gray-900 text-gray-500"
                    }`}
                  >
                    {tab === "today" ? "Today" : tab === "week" ? "This Week" : "This Month"}
                  </button>
                ))}
              </div>
            }
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...VERIFIED_COMPANIES].sort((a, b) => b.trendingScore - a.trendingScore).slice(0, 6).map((c, idx) => (
              <div key={c.id} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[9px]">{c.logoInitials}</div>
                    <Flame className="absolute -top-1 -right-1 h-4 w-4 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">
                      {c.name} <CheckCircle className="h-3 w-3 text-emerald-500" />
                    </span>
                    <span className="text-[8px] text-gray-400">{c.industry.split(" ").slice(0, 2).join(" ")} · {c.countryFlag}</span>
                  </div>
                  <span className="text-[8px] font-bold text-orange-500">#{idx + 1} Trending</span>
                </div>
                <div className="flex items-center gap-3 mt-2.5 text-[8px] text-gray-500">
                  <span><Eye className="h-3 w-3 inline mr-0.5" /> {formatNum(c.views)} views</span>
                  <span><Users className="h-3 w-3 inline mr-0.5" /> {formatNum(c.followers)} followers</span>
                  <span><Activity className="h-3 w-3 inline mr-0.5" /> {c.activityScore}/100</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S8: Companies on the Rise ─────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Companies on the Rise"
            subtitle="Verified companies with rapidly increasing activity and visibility"
            action={<Badge color="emerald"><ArrowUpRight className="h-2.5 w-2.5" /> RISING</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {VERIFIED_COMPANIES.filter((c) => c.movement === "up" || c.movement === "new").slice(0, 6).map((c) => (
              <div key={c.id} className="border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/20 dark:bg-emerald-950/10 rounded-xl p-4 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[9px]">{c.logoInitials}</div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">
                      {c.name} <CheckCircle className="h-3 w-3 text-emerald-500" />
                    </span>
                    <span className="text-[8px] text-gray-400">{c.industry.split(" ").slice(0, 2).join(" ")}</span>
                  </div>
                  <div className="text-right">
                    <MovementIndicator movement={c.movement} prevRank={c.prevRank} rank={c.rank} />
                    <span className="text-[7px] text-emerald-500 block">Rank #{c.rank}</span>
                  </div>
                </div>
                <Link href="/eoi" className="mt-3 block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] py-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                  View Company →
                </Link>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S9: Recently Verified Companies ──────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Recently Verified Companies"
            subtitle="Companies that recently received verification status"
            action={<Badge color="cyan"><CheckCircle className="h-2.5 w-2.5" /> NEW</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...VERIFIED_COMPANIES].sort((a, b) => new Date(b.verifiedDate).getTime() - new Date(a.verifiedDate).getTime()).slice(0, 6).map((c) => (
              <div key={c.id} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[9px]">{c.logoInitials}</div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">
                      {c.name} <CheckCircle className="h-3 w-3 text-emerald-500" />
                    </span>
                    <span className="text-[8px] text-gray-400">{c.industry.split(" ").slice(0, 2).join(" ")} · {c.countryFlag} {c.country}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-[8px] text-gray-400"><Calendar className="h-3 w-3 inline mr-0.5" /> Verified {c.verifiedDate}</span>
                  <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline">View Company →</Link>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S10: Industry Leaders ────────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Industry Leaders"
            subtitle="Leading verified companies by industry sector"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INDUSTRY_LEADERS_DATA.map((sector) => (
              <div key={sector.industry} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4">
                <h3 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider mb-2">{sector.industry}</h3>
                <div className="space-y-1.5">
                  {sector.companies.map((co, idx) => (
                    <div key={co} className="flex items-center gap-2 text-[10px]">
                      <span className={`font-bold ${idx === 0 ? "text-amber-500" : "text-gray-400"}`}>{idx + 1}.</span>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{co}</span>
                      <CheckCircle className="h-3 w-3 text-emerald-500 ml-auto" />
                    </div>
                  ))}
                </div>
                <Link href="/eoi" className="mt-3 block text-center text-[9px] font-bold text-emerald-600 hover:underline">
                  Explore {sector.industry} →
                </Link>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S11: Country Leaders ──────────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Leading Verified Companies by Country"
            subtitle="Top verified companies across global markets"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {COUNTRY_DATA.map((c) => (
              <Link href="/eoi" key={c.country} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group">
                <span className="text-2xl block mb-1">{c.flag}</span>
                <span className="font-bold text-xs text-gray-900 dark:text-white block">{c.country}</span>
                <span className="text-[9px] text-gray-400">{c.count} verified cos</span>
                <span className="text-[8px] text-emerald-500 font-bold block mt-1">Top: {c.topCompany}</span>
                <span className="text-[8px] text-emerald-600 font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity block">
                  Explore Country →
                </span>
              </Link>
            ))}
          </div>
        </Card>

        {/* ── S12: Most Followed Companies ──────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle title="Most Followed Companies" subtitle="Verified companies with the largest follower base on IGEN" />
          <div className="space-y-2">
            {[...VERIFIED_COMPANIES].sort((a, b) => b.followers - a.followers).slice(0, 6).map((c, idx) => (
              <div key={c.id} className="flex items-center gap-3 border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all">
                <span className={`font-display text-sm font-bold ${idx < 3 ? "text-amber-500" : "text-gray-400"}`}>#{idx + 1}</span>
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[7px]">{c.logoInitials}</div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">{c.name} <CheckCircle className="h-3 w-3 text-emerald-500" /></span>
                  <span className="text-[8px] text-gray-400">{c.industry.split(" ").slice(0, 2).join(" ")}</span>
                </div>
                <span className="font-bold text-xs text-emerald-600">{formatNum(c.followers)} followers</span>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S13: Most Active Companies ────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle title="Most Active Companies" subtitle="Verified companies with the highest platform activity" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[...VERIFIED_COMPANIES].sort((a, b) => b.activityScore - a.activityScore).slice(0, 6).map((c) => (
              <div key={c.id} className="flex items-center gap-3 border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[7px]">{c.logoInitials}</div>
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">{c.name} <CheckCircle className="h-3 w-3 text-emerald-500" /></span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[8px] text-gray-400">{c.newsCount} news · {formatNum(c.views)} views</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-16 bg-gray-200 dark:bg-gray-800 rounded-full h-1.5">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${c.activityScore}%` }} />
                  </div>
                  <span className="text-[8px] text-emerald-500 font-bold">{c.activityScore}/100</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S14: Companies to Watch ──────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Companies to Watch"
            subtitle="Emerging and innovative verified companies worth monitoring"
            action={<Badge color="purple"><Sparkles className="h-2.5 w-2.5" /> WATCHLIST</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {VERIFIED_COMPANIES.filter((c) => c.movement === "up" || c.trendingScore > 80).slice(0, 3).map((c) => (
              <div key={c.id} className="border border-purple-200 dark:border-purple-900/30 bg-purple-50/10 dark:bg-purple-950/5 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[9px]">{c.logoInitials}</div>
                  <div>
                    <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">{c.name} <CheckCircle className="h-3 w-3 text-emerald-500" /></span>
                    <span className="text-[8px] text-gray-400">{c.industry.split(" ").slice(0, 2).join(" ")}</span>
                  </div>
                </div>
                <p className="text-[9px] text-gray-500 line-clamp-2">{c.tagline}</p>
                <div className="flex flex-wrap gap-1">
                  {(c.trendingScore > 85 ? ["Innovative"] : []).concat(c.movement === "up" ? ["Rising"] : []).concat(["High Activity"]).map((tag) => (
                    <span key={tag} className="text-[7px] font-bold bg-purple-100 dark:bg-purple-950/20 text-purple-600 px-1.5 py-0.5 rounded">{tag}</span>
                  ))}
                </div>
                <Link href="/eoi" className="block text-center bg-purple-600 hover:bg-purple-700 text-white font-bold text-[9px] py-1.5 rounded-lg transition-all">
                  View Company →
                </Link>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S15: Compare Verified Companies ──────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Compare Verified Companies"
            subtitle={`Select 2–4 companies to compare · ${compareList.length} selected`}
            action={<Badge color="purple"><Scale className="h-2.5 w-2.5" /> COMPARE</Badge>}
          />
          {compareList.length < 2 ? (
            <div className="text-center py-6">
              <Scale className="h-8 w-8 mx-auto text-gray-300 mb-2" />
              <p className="text-xs text-gray-500">Select companies to compare using the <strong>Compare</strong> button on any company card above.</p>
              <p className="text-[9px] text-gray-400 mt-1">Select at least 2 companies (max 4) to start comparing.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2 pr-3">Metric</th>
                    {compareList.map((id) => {
                      const co = companyMap[id];
                      return co ? <th key={id} className="text-center py-2 pr-2">{co.logoInitials}</th> : null;
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                  {[
                    { metric: "Industry", fn: (c: VerifiedCompany) => c.industry.split(" ").slice(0, 2).join(" ") },
                    { metric: "Country", fn: (c: VerifiedCompany) => `${c.countryFlag} ${c.country}` },
                    { metric: "Employees", fn: (c: VerifiedCompany) => c.employees },
                    { metric: "Founded", fn: (c: VerifiedCompany) => c.founded },
                    { metric: "Followers", fn: (c: VerifiedCompany) => formatNum(c.followers) },
                    { metric: "Views", fn: (c: VerifiedCompany) => formatNum(c.views) },
                    { metric: "Rank", fn: (c: VerifiedCompany) => `#${c.rank}` },
                    { metric: "Activity", fn: (c: VerifiedCompany) => `${c.activityScore}/100` },
                    { metric: "News Count", fn: (c: VerifiedCompany) => c.newsCount.toString() },
                  ].map((row) => (
                    <tr key={row.metric} className="hover:bg-gray-50 dark:hover:bg-gray-900/30">
                      <td className="py-2 pr-3 font-bold text-gray-700 dark:text-gray-300">{row.metric}</td>
                      {compareList.map((id) => {
                        const co = companyMap[id];
                        return co ? <td key={id} className="py-2 pr-2 text-center text-gray-600 dark:text-gray-400">{row.fn(co)}</td> : null;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={() => setCompareList([])} className="mt-3 text-[9px] font-bold text-gray-400 hover:text-red-500 transition-colors">
                Clear Comparison
              </button>
            </div>
          )}
        </Card>

        {/* ── S16: Latest Verified Company News ────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Latest News from Verified Companies"
            subtitle="Recent headlines and announcements from verified businesses"
            action={<Badge color="blue"><Newspaper className="h-2.5 w-2.5" /> NEWS</Badge>}
          />
          <div className="space-y-2">
            {NEWS_ITEMS.map((news) => (
              <div key={news.id} className="flex items-start gap-3 border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[7px] shrink-0 mt-0.5">{news.company.substring(0, 3).toUpperCase()}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[9px] font-bold text-gray-900 dark:text-white">{news.company}</span>
                    <CheckCircle className="h-3 w-3 text-emerald-500" />
                    <Badge color="slate">{news.type}</Badge>
                    <span className="text-[8px] text-gray-400">· {news.time}</span>
                  </div>
                  <p className="font-medium text-xs text-gray-700 dark:text-gray-300 line-clamp-1">{news.title}</p>
                </div>
                <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline shrink-0">Read →</Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/eoi" className="text-[10px] font-bold text-emerald-600 hover:underline inline-flex items-center gap-1">
              View More Company News <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Card>

        {/* ── S17: New Products & Services ──────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="New Launches from Verified Companies"
            subtitle="Latest product launches, service updates, and technology releases"
            action={<Badge color="purple"><Rocket className="h-2.5 w-2.5" /> LAUNCHES</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {PRODUCT_LAUNCHES.map((p) => (
              <div key={p.product} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[8px] font-bold text-emerald-600 uppercase">{p.company}</span>
                  <CheckCircle className="h-3 w-3 text-emerald-500" />
                  <Badge color="slate">{p.industry}</Badge>
                </div>
                <h4 className="font-bold text-xs text-gray-900 dark:text-white">{p.product}</h4>
                <p className="text-[9px] text-gray-500 mt-1">{p.desc}</p>
                <Link href="/eoi" className="mt-2 block text-[9px] font-bold text-emerald-600 hover:underline opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore →
                </Link>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S18: Business Categories ─────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Explore Verified Companies by Business Type"
            subtitle="Discover companies by their role in the business ecosystem"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BUSINESS_CATEGORIES.map((cat) => {
              const CatIcon = cat.icon;
              return (
                <Link href="/eoi" key={cat.label} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group">
                  <CatIcon className="h-6 w-6 mx-auto text-emerald-500 mb-2" />
                  <span className="font-bold text-[10px] text-gray-900 dark:text-white block">{cat.label}</span>
                  <span className="text-[9px] text-gray-400">{cat.count}</span>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* ── S19: Recommended Companies ────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Recommended Companies"
            subtitle="Personalized recommendations based on your activity and interests"
            action={<Badge color="blue"><Target className="h-2.5 w-2.5" /> FOR YOU</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {VERIFIED_COMPANIES.slice(4, 7).map((c) => (
              <div key={c.id} className="border border-blue-200 dark:border-blue-900/30 bg-blue-50/10 dark:bg-blue-950/5 rounded-xl p-4 space-y-2">
                <div className="text-[8px] text-blue-500 font-medium">Recommended because you follow {c.industry.split(" ")[0]}</div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[9px]">{c.logoInitials}</div>
                  <div>
                    <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">{c.name} <CheckCircle className="h-3 w-3 text-emerald-500" /></span>
                    <span className="text-[8px] text-gray-400">{c.countryFlag} {c.country}</span>
                  </div>
                </div>
                <p className="text-[9px] text-gray-500 line-clamp-2">{c.tagline}</p>
                <div className="flex gap-2">
                  <Link href="/eoi" className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[9px] py-1.5 rounded-lg transition-all">View Company</Link>
                  <button onClick={() => toggleFollow(c.id)} className={`p-1.5 rounded-lg transition-all ${followedCompanies.includes(c.id) ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"}`}>
                    {followedCompanies.includes(c.id) ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S20: My Followed Companies ────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="My Followed Companies"
            subtitle={`${followedCompanies.length} companies in your follow list`}
            action={<Badge color="emerald"><BookmarkCheck className="h-2.5 w-2.5" /> FOLLOWING</Badge>}
          />
          {followedCompanies.length > 0 ? (
            <div className="space-y-2">
              {followedCompanies.map((id) => {
                const c = companyMap[id];
                if (!c) return null;
                return (
                  <div key={id} className="flex items-center justify-between border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-[7px]">{c.logoInitials}</div>
                      <div>
                        <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">{c.name} <CheckCircle className="h-3 w-3 text-emerald-500" /></span>
                        <span className="text-[8px] text-gray-400">{c.newsCount} news updates · Rank #{c.rank}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline">View</Link>
                      <button onClick={() => toggleFollow(id)} className="bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/30 font-bold text-[9px] px-2.5 py-1.5 rounded-lg transition-all">
                        Unfollow
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <Bookmark className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs">You are not following any companies yet.</p>
              <Link href="/eoi" className="text-[10px] font-bold text-emerald-600 hover:underline mt-1 inline-block">Explore Verified Companies</Link>
            </div>
          )}
        </Card>

        {/* ── S21: Company Alerts ───────────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Never Miss an Update"
            subtitle="Create alerts for companies, industries, and product launches"
            action={<Badge color="amber"><Bell className="h-2.5 w-2.5" /> ALERTS</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { type: "Company Alerts", desc: "Get notified when followed companies publish news or updates", icon: Building2, color: "text-emerald-500" },
              { type: "Industry Alerts", desc: "Track verified company activity across entire industries", icon: Briefcase, color: "text-blue-500" },
              { type: "Product Alerts", desc: "Be first to know about new product and service launches", icon: Rocket, color: "text-purple-500" },
            ].map((alert) => (
              <div key={alert.type} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <alert.icon className={`h-5 w-5 ${alert.color}`} />
                  <span className="font-bold text-xs text-gray-900 dark:text-white">{alert.type}</span>
                </div>
                <p className="text-[9px] text-gray-500">{alert.desc}</p>
                <button
                  onClick={() => { setAlertSuccess(true); setTimeout(() => setAlertSuccess(false), 3000); }}
                  className="w-full bg-gray-100 dark:bg-gray-900 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-gray-700 dark:text-gray-300 hover:text-emerald-600 font-bold text-[9px] py-2 rounded-lg transition-all"
                >
                  <Bell className="h-3 w-3 inline mr-1" /> Create Company Alert
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Alert success banner */}
        {alertSuccess && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-4">
            <Check className="h-4 w-4" />
            <span className="font-bold text-xs">Alert created! You&apos;ll receive notifications.</span>
          </div>
        )}

        {/* ── S22: What Does Verified Mean? ─────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle title="What Does Verified Mean?" subtitle="Understanding IGEN's company verification program" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-xs text-gray-900 dark:text-white">Identity Confirmed</p>
                  <p className="text-[9px] text-gray-500">Company identity, registration, and legal status have been reviewed and confirmed.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-xs text-gray-900 dark:text-white">Operational Validation</p>
                  <p className="text-[9px] text-gray-500">The company has demonstrated active business operations and platform engagement.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-xs text-gray-900 dark:text-white">Enhanced Visibility</p>
                  <p className="text-[9px] text-gray-500">Verified companies receive priority placement, verified badges, and discovery benefits.</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-amber-50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-4">
                <p className="font-bold text-xs text-amber-700 dark:text-amber-400 mb-1"><AlertTriangle className="h-3.5 w-3.5 inline mr-1" /> Important Disclaimer</p>
                <p className="text-[9px] text-gray-600 dark:text-gray-400">Verification confirms identity and operational status. It does not constitute an endorsement, guarantee of quality, or validation of financial performance. Users should conduct their own due diligence.</p>
              </div>
              <Link href="/eoi" className="block text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-lg transition-all">
                Learn About Verification →
              </Link>
            </div>
          </div>
        </Card>

        {/* ── S23: Get Verified ─────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 rounded-3xl p-6 md:p-8 text-white border border-emerald-500/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23fff'/%3E%3C/svg%3E\")" }} />
          <div className="relative z-10 text-center space-y-4">
            <Badge color="amber"><ShieldCheck className="h-2.5 w-2.5" /> VERIFICATION</Badge>
            <h3 className="font-display text-xl md:text-2xl font-bold">Get Your Company Verified</h3>
            <p className="text-emerald-100 text-sm font-normal max-w-xl mx-auto">
              Build trust, improve discoverability and unlock enhanced business visibility on iGEN.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {[
                { label: "Verified Badge", icon: CheckCircle },
                { label: "Enhanced Listing", icon: Star },
                { label: "Featured Placement", icon: Award },
                { label: "Industry Visibility", icon: Eye },
                { label: "Business Enquiries", icon: MessageSquare },
                { label: "Analytics", icon: BarChart3 },
                { label: "Product Showcase", icon: Package },
                { label: "Priority Search", icon: Search },
              ].map((feat) => (
                <div key={feat.label} className="bg-white/10 border border-white/15 rounded-xl p-3 text-center">
                  <feat.icon className="h-4 w-4 mx-auto text-white mb-1" />
                  <span className="text-[8px] text-white font-bold">{feat.label}</span>
                </div>
              ))}
            </div>
            <Link href="/eoi" className="bg-white text-emerald-700 hover:bg-emerald-50 font-bold text-sm px-8 py-3 rounded-xl transition-all inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Get Verified →
            </Link>
          </div>
        </div>

        {/* ── S24: Premium Company Visibility ──────────────────────────────── */}
        <div className="bg-gradient-to-br from-slate-950 via-[#0f1d36] to-[#162d54] rounded-3xl p-6 md:p-8 text-white border border-slate-800/50">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2">
              <Badge color="amber"><Crown className="h-2.5 w-2.5" /> PREMIUM</Badge>
              <Badge color="purple"><Lock className="h-2.5 w-2.5" /> ENTERPRISE</Badge>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold">Increase Your Company Visibility</h3>
            <p className="text-slate-400 text-sm font-normal max-w-lg mx-auto">
              Unlock featured placement, industry spotlight, premium listing, sponsored visibility, and advanced business analytics.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {[
                { label: "Featured Company", icon: Award },
                { label: "Industry Spotlight", icon: Target },
                { label: "Premium Listing", icon: Crown },
                { label: "Business Analytics", icon: PieChart },
              ].map((feat) => (
                <div key={feat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <feat.icon className="h-5 w-5 mx-auto text-amber-400 mb-1" />
                  <span className="text-[9px] text-white font-bold">{feat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
              <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-sm px-8 py-3 rounded-xl transition-all">
                Explore Business Plans →
              </Link>
              <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all">
                Compare Plans
              </Link>
            </div>
          </div>
        </div>

        {/* ── S25: Sponsored / Featured Showcase ──────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Sponsored Showcase"
            subtitle="Premium sponsored company placements"
            action={<Badge color="amber"><Award className="h-2.5 w-2.5" /> AD</Badge>}
          />
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-5">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="flex-1 space-y-2">
                <span className="text-[8px] font-bold text-amber-600 uppercase tracking-widest">SPONSORED</span>
                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Your Company, Featured</h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 max-w-md">
                  Get premium visibility on the Verified Companies hub. Reach business professionals actively discovering trusted companies.
                </p>
                <div className="flex gap-2">
                  <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] px-4 py-2 rounded-lg transition-all">
                    Book Sponsored Placement
                  </Link>
                  <Link href="/eoi" className="border border-amber-300 dark:border-amber-800 text-amber-600 font-bold text-[10px] px-4 py-2 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-950/20 transition-all">
                    View Pricing
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {["48K+", "94%", "3.8x"].map((val, idx) => (
                  <div key={idx} className="bg-white dark:bg-[#0f172a] border border-amber-200 dark:border-amber-900/30 rounded-lg px-3 py-2 text-center">
                    <div className="font-display text-lg font-bold text-amber-600">{val}</div>
                    <div className="text-[8px] text-gray-500">{["Daily Views", "B2B Audience", "CTR Boost"][idx]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* ── S26: Intelligence CTA ────────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-violet-900 rounded-3xl p-6 md:p-8 text-white border border-indigo-800/50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23fff'/%3E%3C/svg%3E\")" }} />
          <div className="relative z-10 text-center space-y-3">
            <Badge color="amber"><Crown className="h-2.5 w-2.5" /> INTELLIGENCE</Badge>
            <h3 className="font-display text-lg md:text-xl font-bold">Go Beyond Company Discovery</h3>
            <p className="text-purple-200 text-sm font-normal max-w-lg mx-auto">
              Explore deeper company and industry intelligence, business signals and premium research.
            </p>
            <Link href="/eoi" className="bg-white text-purple-900 hover:bg-purple-50 font-bold text-xs px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2">
              <FileText className="h-4 w-4" /> Explore Intelligence →
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}

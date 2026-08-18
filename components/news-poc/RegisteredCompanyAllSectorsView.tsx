"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ArrowLeft,
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
  Layers,
  Factory,
  ShieldCheck,
  Lock,
  Newspaper,
  PieChart,
  Rocket,
  Scale,
  Package,
  Truck,
  Wrench,
  Filter,
  SlidersHorizontal,
  ArrowRight,
  ExternalLink,
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
  Check
} from "lucide-react";
import { IGEN_50_SECTORS, SectorTaxonomyItem } from "./igenTaxonomyData";

// ═══════════════════════════════════════════════════════════════════════════════
// LOCAL TYPES & INTERFACES
// ═══════════════════════════════════════════════════════════════════════════════

interface IndustrySnapshotItem {
  code: string;
  name: string;
  icon: string;
  companies: number;
  products: number;
  partnerships: number;
  activeNews: number;
  growth: string;
}

interface IndustryRankItem {
  rank: number;
  code: string;
  name: string;
  icon: string;
  views: string;
  followers: string;
  activity: string;
  trend: "up" | "down" | "stable";
}

interface NewsItem {
  id: string;
  title: string;
  industry: string;
  industryIcon: string;
  source: string;
  time: string;
  isBreaking: boolean;
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
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.blue}`}>
      {children}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, color, sub }: { icon: React.ElementType; label: string; value: string; color: string; sub?: string }) {
  return (
    <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs text-center space-y-1.5">
      <Icon className={`h-5 w-5 mx-auto ${color}`} />
      <div className="font-display text-base font-bold text-gray-950 dark:text-white">{value}</div>
      <div className="text-[9px] text-gray-450 font-medium">{label}</div>
      {sub && <div className="text-[8px] text-emerald-500 font-bold">{sub}</div>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORY GROUPS FOR A-Z DIRECTORY
// ═══════════════════════════════════════════════════════════════════════════════

const CATEGORY_GROUPS: Record<string, string[]> = {
  "Technology & Digital": ["S02", "S11", "S16", "S36", "S38", "S46", "S47"],
  "Energy & Resources": ["S04", "S10", "S17", "S29", "S30", "S31", "S34"],
  "Manufacturing & Industry": ["S07", "S08", "S24", "S28", "S37", "S45"],
  "Healthcare & Life Sciences": ["S05", "S06", "S23", "S32"],
  "Financial Services": ["S41", "S42"],
  "Logistics & Transport": ["S09", "S33", "S43", "S44"],
  "Consumer & Retail": ["S12", "S21", "S22", "S39", "S48"],
  "Infrastructure & Environment": ["S18", "S26", "S49", "S50"],
  "Agriculture & Food": ["S01", "S03", "S19", "S20"],
  "Services & Professional": ["S13", "S14", "S15", "S25", "S27", "S35", "S40"],
};

// ═══════════════════════════════════════════════════════════════════════════════
// SEED DATA
// ═══════════════════════════════════════════════════════════════════════════════

const FEATURED_INDUSTRIES: { code: string; badge: "SPONSORED" | "FEATURED"; tagline: string }[] = [
  { code: "S46", badge: "SPONSORED", tagline: "India's semiconductor revolution — FAB subsidies, OSAT, and chip design." },
  { code: "S38", badge: "FEATURED", tagline: "Enterprise SaaS exports cross $30B — India's software powerhouse." },
  { code: "S45", badge: "SPONSORED", tagline: "Electric vehicles, battery swap, and green mobility transformation." },
  { code: "S30", badge: "FEATURED", tagline: "Green Hydrogen, Solar, and Wind — India's clean energy transition." },
];

const TRENDING_INDUSTRIES: string[] = ["S02", "S46", "S47", "S42", "S36", "S45"];

const EMERGING_INDUSTRIES: { code: string; tags: string[] }[] = [
  { code: "S36", tags: ["Space Tech", "Private Launch", "IN-SPACe"] },
  { code: "S30", tags: ["Green H₂", "Solar", "Wind"] },
  { code: "S02", tags: ["GenAI", "Cybersec", "LLMs"] },
  { code: "S47", tags: ["Unicorns", "Seed Fund", "Deep Tech"] },
  { code: "S49", tags: ["Desalination", "Water Tech", "IoT Sensors"] },
];

const INDUSTRY_SNAPSHOTS: IndustrySnapshotItem[] = [
  { code: "S16", name: "Electronics & IT", icon: "💻", companies: 1280, products: 4200, partnerships: 380, activeNews: 92, growth: "+18%" },
  { code: "S46", name: "Semiconductors", icon: "🎛️", companies: 460, products: 1100, partnerships: 210, activeNews: 74, growth: "+32%" },
  { code: "S23", name: "Health & Pharma", icon: "🏥", companies: 980, products: 3400, partnerships: 290, activeNews: 61, growth: "+14%" },
  { code: "S38", name: "Enterprise Software", icon: "🖥️", companies: 860, products: 2800, partnerships: 310, activeNews: 88, growth: "+22%" },
  { code: "S45", name: "Automotive & EV", icon: "🚗", companies: 720, products: 1800, partnerships: 190, activeNews: 56, growth: "+26%" },
  { code: "S41", name: "Banking & BFSI", icon: "🏦", companies: 540, products: 900, partnerships: 120, activeNews: 43, growth: "+11%" },
];

const INDUSTRY_RANKINGS: IndustryRankItem[] = [
  { rank: 1, code: "S16", name: "Electronics & IT", icon: "💻", views: "2.4M", followers: "142K", activity: "Very High", trend: "up" },
  { rank: 2, code: "S46", name: "Semiconductors", icon: "🎛️", views: "1.8M", followers: "98K", activity: "Very High", trend: "up" },
  { rank: 3, code: "S38", name: "Enterprise Software", icon: "🖥️", views: "1.6M", followers: "89K", activity: "High", trend: "up" },
  { rank: 4, code: "S45", name: "Automotive & EV", icon: "🚗", views: "1.4M", followers: "76K", activity: "High", trend: "up" },
  { rank: 5, code: "S23", name: "Health & Pharma", icon: "🏥", views: "1.2M", followers: "71K", activity: "High", trend: "stable" },
  { rank: 6, code: "S42", name: "FinTech", icon: "💳", views: "1.1M", followers: "64K", activity: "High", trend: "up" },
  { rank: 7, code: "S30", name: "Clean Energy", icon: "☀️", views: "980K", followers: "58K", activity: "Medium", trend: "up" },
  { rank: 8, code: "S41", name: "Banking & BFSI", icon: "🏦", views: "890K", followers: "52K", activity: "Medium", trend: "down" },
];

const RISING_INDUSTRIES: string[] = ["S36", "S02", "S49", "S47", "S29"];

const CROSS_INDUSTRY_NEWS: NewsItem[] = [
  { id: "n1", title: "India's semiconductor ecosystem attracts $12B in new FAB investments", industry: "Semiconductors", industryIcon: "🎛️", source: "IGEN Bureau", time: "2h ago", isBreaking: true },
  { id: "n2", title: "Green hydrogen pilot projects cross 500MW capacity milestone", industry: "Clean Energy", industryIcon: "☀️", source: "Energy Desk", time: "4h ago", isBreaking: false },
  { id: "n3", title: "Enterprise SaaS exports from India projected to hit $40B by 2027", industry: "Enterprise Software", industryIcon: "🖥️", source: "Tech Wire", time: "6h ago", isBreaking: false },
  { id: "n4", title: "EV battery swap infrastructure receives ₹8,000 Cr government push", industry: "Automotive & EV", industryIcon: "🚗", source: "Auto Desk", time: "8h ago", isBreaking: false },
  { id: "n5", title: "UPI transaction volumes hit 18 billion in Q2 — fintech boom continues", industry: "FinTech", industryIcon: "💳", source: "Finance Wire", time: "12h ago", isBreaking: false },
];

const ECOSYSTEM_SEGMENTS = [
  { label: "Manufacturers", icon: Factory, count: "3,200+" },
  { label: "Importers & Exporters", icon: Truck, count: "1,800+" },
  { label: "Suppliers & Vendors", icon: Package, count: "4,500+" },
  { label: "Service Providers", icon: Wrench, count: "2,100+" },
  { label: "Consultants & Advisors", icon: Briefcase, count: "960+" },
  { label: "Startups & Innovators", icon: Rocket, count: "2,800+" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function RegisteredCompanyAllSectorsView() {
  const router = useRouter();

  // ─── State ──────────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState<string>("All");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Technology & Digital"]);
  const [followedSectors, setFollowedSectors] = useState<string[]>(["S16", "S46", "S38"]);
  const [alertSectors, setAlertSectors] = useState<string[]>(["S46"]);
  const [compareA, setCompareA] = useState<string>("S46");
  const [compareB, setCompareB] = useState<string>("S45");
  const [activeRankTab, setActiveRankTab] = useState<"views" | "followers" | "activity">("views");
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile on mount
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ─── Derived ────────────────────────────────────────────────────────────────
  const sectorMap = useMemo(() => {
    const m: Record<string, SectorTaxonomyItem> = {};
    IGEN_50_SECTORS.forEach((s) => (m[s.code] = s));
    return m;
  }, []);

  const filteredSectors = useMemo(() => {
    let list = [...IGEN_50_SECTORS];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.ministry.toLowerCase().includes(q) || s.code.toLowerCase().includes(q));
    }
    if (quickFilter === "Popular") list = list.sort((a, b) => b.count - a.count);
    if (quickFilter === "Trending") list = list.filter((s) => TRENDING_INDUSTRIES.includes(s.code));
    if (quickFilter === "Emerging") list = list.filter((s) => EMERGING_INDUSTRIES.some((e) => e.code === s.code));
    if (quickFilter === "Most Companies") list = list.sort((a, b) => b.count - a.count).slice(0, 15);
    if (quickFilter === "Most Active") list = list.filter((s) => INDUSTRY_RANKINGS.some((r) => r.code === s.code));
    if (quickFilter === "Recently Added") list = list.slice(-10).reverse();
    if (quickFilter === "A-Z") list = list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [searchQuery, quickFilter]);

  const alphabetLetters = useMemo(() => {
    const letters = new Set<string>();
    IGEN_50_SECTORS.forEach((s) => letters.add(s.name.charAt(0).toUpperCase()));
    return Array.from(letters).sort();
  }, []);

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  };

  const toggleFollow = (code: string) => {
    setFollowedSectors((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
  };

  const toggleAlert = (code: string) => {
    setAlertSectors((prev) => {
      const next = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code];
      if (!prev.includes(code)) {
        setAlertSuccess(true);
        setTimeout(() => setAlertSuccess(false), 3000);
      }
      return next;
    });
  };

  const getSector = (code: string) => sectorMap[code];

  const compA = getSector(compareA);
  const compB = getSector(compareB);

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">
      {/* ── S1: Breadcrumb ────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 lg:px-6 pt-4">
        <nav className="flex items-center gap-1.5 text-[10px] text-gray-500 font-medium">
          <button onClick={() => router.back()} className="hover:text-blue-600 transition-colors flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" /> Back
          </button>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span>Company News</span>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span>Registered Company</span>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-blue-600 font-bold">All Sectors</span>
        </nav>
      </div>

      <section className="mx-auto max-w-7xl px-4 lg:px-6 pt-5 space-y-8">

        {/* ── S2: Hero ──────────────────────────────────────────────────────── */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0v60M0 30h60' stroke='%23fff' stroke-width='.5'/%3E%3C/svg%3E\")" }} />
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <Badge color="amber"><Crown className="h-2.5 w-2.5" /> REGISTERED TIER</Badge>
              <Badge color="blue"><Globe className="h-2.5 w-2.5" /> ALL INDUSTRIES</Badge>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold leading-tight">
              Explore All Industries
            </h1>
            <p className="text-blue-100 text-sm font-normal max-w-2xl">
              Master industry directory with 50+ sectors, 12,400+ companies, real-time activity tracking, and intelligent discovery tools — your gateway to global B2B opportunity.
            </p>

            {/* Hero search */}
            <div className="relative max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search industries by name, ministry, or code…"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-blue-200 text-sm outline-none focus:border-white/50 focus:bg-white/15 transition-all"
              />
            </div>

            {/* Platform metrics */}
            <div className="flex flex-wrap gap-4 mt-3">
              {[
                { label: "Total Industries", val: "50+" },
                { label: "Companies Listed", val: "12,400+" },
                { label: "Verified Companies", val: "3,200+" },
                { label: "Active News", val: "820+" },
              ].map((m) => (
                <div key={m.label} className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-lg px-4 py-2 text-center min-w-[100px]">
                  <div className="font-display text-base font-bold">{m.val}</div>
                  <div className="text-[9px] text-blue-200">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Register your business CTA */}
            <div className="flex items-center gap-3 mt-2">
              <Link href="/eoi" className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs px-5 py-2.5 rounded-lg transition-all inline-flex items-center gap-1.5">
                <Plus className="h-3.5 w-3.5" /> Register Your Business
              </Link>
              <Link href="/eoi" className="border border-white/30 hover:bg-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all inline-flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5" /> Browse All Sectors
              </Link>
            </div>
          </div>
        </div>

        {/* ── S3: Quick Discovery Filters ──────────────────────────────────── */}
        <Card className="p-4">
          <SectionTitle title="Quick Discovery Filters" subtitle="Filter and sort the master industry list" />
          <div className="flex flex-wrap gap-2">
            {["All", "Popular", "Trending", "Emerging", "Most Companies", "Most Active", "Recently Added", "A-Z"].map((f) => (
              <button
                key={f}
                onClick={() => setQuickFilter(f)}
                className={`text-[10px] font-bold px-3.5 py-1.5 rounded-lg transition-all ${
                  quickFilter === f
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                {f === "Trending" && <Flame className="h-3 w-3 inline mr-1" />}
                {f === "Emerging" && <Sparkles className="h-3 w-3 inline mr-1" />}
                {f === "A-Z" && <SlidersHorizontal className="h-3 w-3 inline mr-1" />}
                {f}
              </button>
            ))}
          </div>
          {searchQuery && (
            <p className="text-[10px] text-gray-500 mt-2">
              Showing {filteredSectors.length} result{filteredSectors.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
            </p>
          )}
        </Card>

        {/* ── S4: Featured Industries ──────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Featured Industries"
            subtitle="Sponsored and editorially featured sectors with high activity"
            action={<Badge color="amber"><Award className="h-2.5 w-2.5" /> PROMOTED</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FEATURED_INDUSTRIES.map((fi) => {
              const sector = getSector(fi.code);
              if (!sector) return null;
              return (
                <div
                  key={fi.code}
                  className="border border-amber-200 dark:border-amber-900/30 bg-amber-50/30 dark:bg-amber-950/10 rounded-xl p-4 hover:shadow-md transition-all group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sector.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-gray-900 dark:text-white">{sector.name}</span>
                          <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded ${fi.badge === "SPONSORED" ? "bg-amber-500 text-white" : "bg-blue-500 text-white"}`}>
                            {fi.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 mt-0.5">{fi.tagline}</p>
                      </div>
                    </div>
                    <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg transition-all shrink-0 opacity-0 group-hover:opacity-100">
                      Explore →
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <span className="text-[9px] text-gray-500"><Building2 className="h-3 w-3 inline mr-0.5" /> {sector.count} companies</span>
                    <span className="text-[9px] text-gray-500"><Activity className="h-3 w-3 inline mr-0.5" /> High activity</span>
                    <span className="text-[9px] text-emerald-500 font-bold"><TrendingUp className="h-3 w-3 inline mr-0.5" /> Growing</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── S5: Trending Industries ──────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Trending Industries"
            subtitle="Sectors with the highest activity and search volume this week"
            action={<Badge color="rose"><Flame className="h-2.5 w-2.5" /> LIVE</Badge>}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {TRENDING_INDUSTRIES.map((code, idx) => {
              const s = getSector(code);
              if (!s) return null;
              return (
                <Link href="/eoi" key={code} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-3 text-center hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-sm transition-all group">
                  <span className="text-2xl block mb-1.5">{s.icon}</span>
                  <span className="font-bold text-[10px] text-gray-900 dark:text-white block">{s.name}</span>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span className="text-[8px] text-orange-500 font-bold">#{idx + 1} Trending</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* ── S6: All Industries Master Directory ─────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="All Industries — Master Directory"
            subtitle={`${filteredSectors.length} industries across 10 categories · Click to expand`}
            action={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpandedCategories(Object.keys(CATEGORY_GROUPS))}
                  className="text-[9px] font-bold text-blue-600 hover:underline"
                >
                  Expand All
                </button>
                <button
                  onClick={() => setExpandedCategories([])}
                  className="text-[9px] font-bold text-gray-400 hover:underline"
                >
                  Collapse All
                </button>
              </div>
            }
          />

          {/* A-Z navigation strip */}
          <div className="flex flex-wrap gap-1 mb-4 pb-3 border-b border-gray-100 dark:border-gray-850">
            {alphabetLetters.map((letter) => (
              <button
                key={letter}
                onClick={() => {
                  const el = document.getElementById(`letter-${letter}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="w-7 h-7 rounded-md text-[10px] font-bold bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center"
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Category groupings */}
          <div className="space-y-2">
            {Object.entries(CATEGORY_GROUPS).map(([category, codes]) => {
              const categorySectors = codes
                .map((c) => getSector(c))
                .filter(Boolean)
                .filter((s) => {
                  if (!searchQuery.trim()) return true;
                  const q = searchQuery.toLowerCase();
                  return s!.name.toLowerCase().includes(q) || s!.ministry.toLowerCase().includes(q);
                }) as SectorTaxonomyItem[];

              if (categorySectors.length === 0) return null;
              const isExpanded = expandedCategories.includes(category);

              return (
                <div key={category} className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-blue-500" />
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{category}</span>
                      <span className="text-[9px] text-gray-400 font-medium">({categorySectors.length} industries)</span>
                    </div>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                  </button>

                  {isExpanded && (
                    <div className="divide-y divide-gray-100 dark:divide-gray-850">
                      {categorySectors.map((sector) => (
                        <div
                          key={sector.code}
                          id={`letter-${sector.name.charAt(0).toUpperCase()}`}
                          className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors group"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <span className="text-lg shrink-0">{sector.icon}</span>
                            <div className="min-w-0">
                              <span className="font-bold text-xs text-gray-900 dark:text-white block truncate">{sector.name}</span>
                              <span className="text-[9px] text-gray-400 block truncate">{sector.ministry}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <span className="text-[9px] text-gray-500 font-medium">{sector.count} cos</span>
                            {sector.feed && (
                              <span className="text-[8px] text-emerald-500 font-medium hidden lg:block max-w-[160px] truncate">
                                {sector.feed}
                              </span>
                            )}
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleFollow(sector.code); }}
                              className={`text-[9px] font-bold px-2 py-1 rounded-lg transition-all ${
                                followedSectors.includes(sector.code)
                                  ? "bg-blue-100 dark:bg-blue-950/30 text-blue-600"
                                  : "bg-gray-100 dark:bg-gray-900 text-gray-400 hover:text-blue-600"
                              }`}
                            >
                              {followedSectors.includes(sector.code) ? <BookmarkCheck className="h-3 w-3 inline" /> : <Bookmark className="h-3 w-3 inline" />}
                            </button>
                            <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[8px] px-2.5 py-1 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                              Explore →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── S7: Industry Snapshots ──────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Industry Snapshots"
            subtitle="Key metrics for major industries — companies, products, partnerships, and active news"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {INDUSTRY_SNAPSHOTS.map((snap) => (
              <div key={snap.code} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">{snap.icon}</span>
                  <div>
                    <span className="font-bold text-xs text-gray-900 dark:text-white">{snap.name}</span>
                    <span className="text-[9px] text-emerald-500 font-bold ml-2">{snap.growth}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "Companies", val: snap.companies.toLocaleString(), icon: Building2 },
                    { label: "Products", val: snap.products.toLocaleString(), icon: Package },
                    { label: "Partnerships", val: snap.partnerships.toLocaleString(), icon: Users },
                    { label: "Active News", val: snap.activeNews.toString(), icon: Newspaper },
                  ].map((m) => (
                    <div key={m.label} className="bg-gray-50 dark:bg-gray-900/50 rounded-lg px-3 py-2 text-center">
                      <m.icon className="h-3 w-3 mx-auto text-gray-400 mb-0.5" />
                      <div className="font-bold text-xs text-gray-900 dark:text-white">{m.val}</div>
                      <div className="text-[8px] text-gray-400">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S8: Industry Landscape / Statistics ─────────────────────────── */}
        <Card className="p-5">
          <SectionTitle title="Industry Landscape" subtitle="Platform-wide activity telemetry and industry health metrics" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard icon={Globe} label="Total Industries" value="50+" color="text-blue-500" sub="+3 new this quarter" />
            <StatCard icon={Building2} label="Companies Listed" value="12,400+" color="text-emerald-500" sub="+820 this month" />
            <StatCard icon={Newspaper} label="News Articles" value="24,600+" color="text-purple-500" sub="+1.2K this week" />
            <StatCard icon={Activity} label="Daily Searches" value="48K" color="text-orange-500" sub="+12% vs last month" />
            <StatCard icon={Users} label="Active Businesses" value="6,200+" color="text-cyan-500" />
            <StatCard icon={Target} label="Products Listed" value="18,400+" color="text-rose-500" />
            <StatCard icon={Scale} label="Partnerships" value="4,200+" color="text-amber-500" />
            <StatCard icon={ShieldCheck} label="Verified Entities" value="3,200+" color="text-indigo-500" />
          </div>
        </Card>

        {/* ── S9: Industry Rankings ───────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Industry Rankings"
            subtitle="Most viewed, most followed, and most active industries on the platform"
            action={
              <div className="flex gap-1">
                {(["views", "followers", "activity"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveRankTab(tab)}
                    className={`text-[9px] font-bold px-2.5 py-1 rounded-lg transition-all capitalize ${
                      activeRankTab === tab ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-900 text-gray-500"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                  <th className="text-left py-2 pr-3">Rank</th>
                  <th className="text-left py-2 pr-3">Industry</th>
                  <th className="text-right py-2 pr-3">Views</th>
                  <th className="text-right py-2 pr-3">Followers</th>
                  <th className="text-center py-2 pr-3">Activity</th>
                  <th className="text-center py-2">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                {INDUSTRY_RANKINGS.map((item) => (
                  <tr key={item.rank} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="py-2.5 pr-3">
                      <span className={`font-display text-sm font-bold ${item.rank <= 3 ? "text-amber-500" : "text-gray-400"}`}>
                        #{item.rank}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-bold text-xs text-gray-900 dark:text-white">{item.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-2.5 pr-3 font-bold text-gray-700 dark:text-gray-300">{item.views}</td>
                    <td className="text-right py-2.5 pr-3 font-bold text-gray-700 dark:text-gray-300">{item.followers}</td>
                    <td className="text-center py-2.5 pr-3">
                      <Badge color={item.activity === "Very High" ? "rose" : item.activity === "High" ? "emerald" : "blue"}>
                        {item.activity}
                      </Badge>
                    </td>
                    <td className="text-center py-2.5">
                      {item.trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-500 mx-auto" />}
                      {item.trend === "down" && <TrendingDown className="h-4 w-4 text-rose-500 mx-auto" />}
                      {item.trend === "stable" && <Minus className="h-4 w-4 text-gray-400 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-850">
            <p className="text-[9px] text-gray-400">
              <Info className="h-3 w-3 inline mr-1" />
              Rankings based on platform views, follower counts, and content activity over the last 30 days. Updated weekly.
            </p>
          </div>
        </Card>

        {/* ── S10: Industries on the Rise ─────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Industries on the Rise"
            subtitle="Sectors with the fastest-growing search interest and engagement"
            action={<Badge color="emerald"><TrendingUp className="h-2.5 w-2.5" /> RISING</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {RISING_INDUSTRIES.map((code, idx) => {
              const s = getSector(code);
              if (!s) return null;
              return (
                <Link href="/eoi" key={code} className="border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/20 dark:bg-emerald-950/10 rounded-xl p-3 text-center hover:shadow-sm transition-all">
                  <span className="text-2xl block mb-1">{s.icon}</span>
                  <span className="font-bold text-[10px] text-gray-900 dark:text-white block">{s.name}</span>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    <span className="text-[8px] text-emerald-500 font-bold">+{30 - idx * 4}% searches</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* ── S11: Emerging Industries ────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Emerging Industries"
            subtitle="Innovative and fast-growing sectors shaping the next decade"
            action={<Badge color="purple"><Sparkles className="h-2.5 w-2.5" /> INNOVATIVE</Badge>}
          />
          <div className="space-y-3">
            {EMERGING_INDUSTRIES.map((ei) => {
              const s = getSector(ei.code);
              if (!s) return null;
              return (
                <div key={ei.code} className="flex items-center justify-between border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{s.name}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ei.tags.map((tag) => (
                          <span key={tag} className="text-[7px] font-bold bg-purple-100 dark:bg-purple-950/20 text-purple-600 px-1.5 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link href="/eoi" className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg transition-all">
                    Explore →
                  </Link>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── S12: Companies by Industry ──────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Companies by Industry"
            subtitle="Quick access to companies within each sector — bridges to the By Sector view"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {IGEN_50_SECTORS.slice(0, 15).map((s) => (
              <Link
                href="/eoi"
                key={s.code}
                className="border border-gray-200 dark:border-gray-800 rounded-xl p-3 text-center hover:border-blue-300 dark:hover:border-blue-800 hover:shadow-sm transition-all group"
              >
                <span className="text-lg block">{s.icon}</span>
                <span className="font-bold text-[9px] text-gray-900 dark:text-white block mt-1 truncate">{s.name}</span>
                <span className="text-[8px] text-gray-400">{s.count} companies</span>
                <div className="text-[8px] text-blue-500 font-bold mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Companies →
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-4">
            <Link href="/eoi" className="text-[10px] font-bold text-blue-600 hover:underline inline-flex items-center gap-1">
              View all 50 industries <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </Card>

        {/* ── S13: Latest Company News Across Industries ──────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Latest Company News Across Industries"
            subtitle="Real-time news feed across all sectors"
            action={<Badge color="blue"><Newspaper className="h-2.5 w-2.5" /> LIVE FEED</Badge>}
          />
          <div className="space-y-2">
            {CROSS_INDUSTRY_NEWS.map((news) => (
              <div key={news.id} className="flex items-start gap-3 border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all">
                <span className="text-lg shrink-0 mt-0.5">{news.industryIcon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {news.isBreaking && (
                      <span className="text-[7px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded animate-pulse">BREAKING</span>
                    )}
                    <span className="text-[8px] font-bold text-blue-600">{news.industry}</span>
                    <span className="text-[8px] text-gray-400">· {news.source}</span>
                    <span className="text-[8px] text-gray-400">· {news.time}</span>
                  </div>
                  <p className="font-bold text-xs text-gray-900 dark:text-white leading-snug">{news.title}</p>
                </div>
                <Link href="/eoi" className="text-[9px] font-bold text-blue-600 hover:underline shrink-0">Read →</Link>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S14: Products & Services (B2B Catalog Tags) ────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Products & Services"
            subtitle="B2B catalog — discover products and services across all industries"
          />
          <div className="flex flex-wrap gap-2">
            {[
              "Solar Panels", "EV Batteries", "API Formulations", "Semiconductor Chips", "SaaS Platforms",
              "Fertilizers", "Steel Coils", "Medical Devices", "Drone Systems", "Payment Gateways",
              "Heavy Machinery", "FMCG Brands", "Green Hydrogen", "Smart Meters", "EdTech Solutions",
              "Cybersecurity Tools", "Defense UAVs", "Marine Products", "Textile Fabrics", "Logistics Solutions",
            ].map((tag) => (
              <Link
                href="/eoi"
                key={tag}
                className="text-[9px] font-bold bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-transparent hover:border-blue-200 dark:hover:border-blue-900/40"
              >
                <Tag className="h-3 w-3 inline mr-1" />
                {tag}
              </Link>
            ))}
          </div>
        </Card>

        {/* ── S15: Business Ecosystem ─────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Business Ecosystem"
            subtitle="Discover companies by their role in the supply chain and business ecosystem"
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {ECOSYSTEM_SEGMENTS.map((seg) => {
              const SIcon = seg.icon;
              return (
                <Link href="/eoi" key={seg.label} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:shadow-sm hover:border-blue-300 dark:hover:border-blue-800 transition-all group">
                  <SIcon className="h-6 w-6 mx-auto text-blue-500 mb-2" />
                  <span className="font-bold text-[10px] text-gray-900 dark:text-white block">{seg.label}</span>
                  <span className="text-[9px] text-gray-400">{seg.count}</span>
                </Link>
              );
            })}
          </div>
        </Card>

        {/* ── S16: Compare Industries ─────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Compare Industries"
            subtitle="Side-by-side comparison of key industry metrics"
            action={<Badge color="purple"><Scale className="h-2.5 w-2.5" /> COMPARE</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Industry A</label>
              <select
                value={compareA}
                onChange={(e) => setCompareA(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-blue-500"
              >
                {IGEN_50_SECTORS.map((s) => (
                  <option key={s.code} value={s.code}>{s.icon} {s.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[9px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">Industry B</label>
              <select
                value={compareB}
                onChange={(e) => setCompareB(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-blue-500"
              >
                {IGEN_50_SECTORS.map((s) => (
                  <option key={s.code} value={s.code}>{s.icon} {s.name}</option>
                ))}
              </select>
            </div>
          </div>
          {compA && compB && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-2">Metric</th>
                    <th className="text-center py-2">{compA.icon} {compA.name}</th>
                    <th className="text-center py-2">{compB.icon} {compB.name}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                  {[
                    { metric: "Companies Listed", a: compA.count.toString(), b: compB.count.toString() },
                    { metric: "Ministry/Dept", a: compA.ministry.split(" ").slice(0, 3).join(" ") + "…", b: compB.ministry.split(" ").slice(0, 3).join(" ") + "…" },
                    { metric: "Growth Trend", a: "↑ Active", b: "↑ Active" },
                    { metric: "Platform Activity", a: "High", b: "High" },
                    { metric: "Latest News", a: compA.feed || "—", b: compB.feed || "—" },
                  ].map((row) => (
                    <tr key={row.metric} className="hover:bg-gray-50 dark:hover:bg-gray-900/30">
                      <td className="py-2 font-bold text-gray-700 dark:text-gray-300">{row.metric}</td>
                      <td className="py-2 text-center text-gray-600 dark:text-gray-400">{row.a}</td>
                      <td className="py-2 text-center text-gray-600 dark:text-gray-400">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* ── S17: Recommended Industries ─────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Recommended for You"
            subtitle="Personalized industry recommendations based on your activity and watchlist"
            action={<Badge color="blue"><Target className="h-2.5 w-2.5" /> PERSONALIZED</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {["S42", "S36", "S47"].map((code) => {
              const s = getSector(code);
              if (!s) return null;
              return (
                <div key={code} className="border border-blue-200 dark:border-blue-900/30 bg-blue-50/20 dark:bg-blue-950/10 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-bold text-xs text-gray-900 dark:text-white">{s.name}</span>
                  </div>
                  <p className="text-[9px] text-gray-500">{s.feed}</p>
                  <div className="flex items-center gap-2">
                    <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg transition-all flex-1 text-center">
                      Explore Industry
                    </Link>
                    <button
                      onClick={() => toggleFollow(code)}
                      className={`p-1.5 rounded-lg transition-all ${
                        followedSectors.includes(code) ? "bg-blue-100 dark:bg-blue-950/30 text-blue-600" : "bg-gray-100 dark:bg-gray-900 text-gray-400"
                      }`}
                    >
                      {followedSectors.includes(code) ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* ── S18: My Industries (Watchlist) ──────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="My Industries"
            subtitle={`${followedSectors.length} industries in your watchlist — toggle to follow or unfollow`}
            action={<Badge color="emerald"><BookmarkCheck className="h-2.5 w-2.5" /> WATCHLIST</Badge>}
          />
          {followedSectors.length > 0 ? (
            <div className="space-y-2">
              {followedSectors.map((code) => {
                const s = getSector(code);
                if (!s) return null;
                return (
                  <div key={code} className="flex items-center justify-between border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{s.icon}</span>
                      <div>
                        <span className="font-bold text-xs text-gray-900 dark:text-white">{s.name}</span>
                        <span className="text-[9px] text-gray-400 block">{s.count} companies · {s.ministry}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleAlert(code)}
                        className={`p-1.5 rounded-lg transition-all ${
                          alertSectors.includes(code) ? "bg-amber-100 dark:bg-amber-950/30 text-amber-600" : "bg-gray-100 dark:bg-gray-900 text-gray-400"
                        }`}
                        title="Toggle alerts"
                      >
                        {alertSectors.includes(code) ? <BellRing className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        onClick={() => toggleFollow(code)}
                        className="bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/30 font-bold text-[9px] px-2.5 py-1.5 rounded-lg transition-all"
                      >
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
              <p className="text-xs">No industries in your watchlist yet. Start following industries above.</p>
            </div>
          )}
        </Card>

        {/* Alert success banner */}
        {alertSuccess && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-4">
            <Check className="h-4 w-4" />
            <span className="font-bold text-xs">Alert configured! You&apos;ll receive notifications for this industry.</span>
          </div>
        )}

        {/* ── S19: Industry Alerts ────────────────────────────────────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Industry Alerts"
            subtitle="Configure alerts for breaking news, new company listings, and industry updates"
            action={<Badge color="amber"><Bell className="h-2.5 w-2.5" /> ALERTS</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { type: "Breaking News", desc: "Instant alerts for industry-breaking developments", icon: Zap, color: "text-red-500" },
              { type: "New Companies", desc: "Notifications when new companies list in your industries", icon: Building2, color: "text-blue-500" },
              { type: "Weekly Digest", desc: "Weekly summary of activity across your followed industries", icon: Mail, color: "text-purple-500" },
            ].map((alert) => (
              <div key={alert.type} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <alert.icon className={`h-5 w-5 ${alert.color}`} />
                  <span className="font-bold text-xs text-gray-900 dark:text-white">{alert.type}</span>
                </div>
                <p className="text-[9px] text-gray-500">{alert.desc}</p>
                <button
                  onClick={() => {
                    setAlertSuccess(true);
                    setTimeout(() => setAlertSuccess(false), 3000);
                  }}
                  className="w-full bg-gray-100 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-gray-700 dark:text-gray-300 hover:text-blue-600 font-bold text-[9px] py-2 rounded-lg transition-all"
                >
                  <Bell className="h-3 w-3 inline mr-1" /> Enable Alert
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* ── S20: Industry Intelligence CTA ─────────────────────────────── */}
        <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-violet-900 rounded-3xl p-6 md:p-8 text-white border border-indigo-800/50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23fff'/%3E%3C/svg%3E\")" }} />
          <div className="relative z-10 text-center space-y-4">
            <Badge color="amber"><Crown className="h-2.5 w-2.5" /> PREMIUM REPORT</Badge>
            <h3 className="font-display text-xl md:text-2xl font-bold">Industry Intelligence Report</h3>
            <p className="text-purple-200 text-sm font-normal max-w-xl mx-auto">
              Get deep analytics, market size projections, competitive landscape maps, and investment flow data for any industry on the platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/eoi" className="bg-white text-purple-900 hover:bg-purple-50 font-bold text-xs px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2">
                <FileText className="h-4 w-4" /> Request Full Report
              </Link>
              <Link href="/eoi" className="border border-white/30 hover:bg-white/10 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2">
                <Download className="h-4 w-4" /> Sample Report (PDF)
              </Link>
            </div>
          </div>
        </div>

        {/* ── S21: Featured / Sponsored Industries (Ad Showcase) ──────────── */}
        <Card className="p-5">
          <SectionTitle
            title="Sponsored Showcase"
            subtitle="Premium industry placements and sponsored content"
            action={<Badge color="amber"><Award className="h-2.5 w-2.5" /> AD</Badge>}
          />
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10 border border-amber-200 dark:border-amber-900/30 rounded-xl p-5 flex flex-col md:flex-row items-center gap-5">
            <div className="flex-1 space-y-2">
              <span className="text-[8px] font-bold text-amber-600 uppercase tracking-widest">Featured Placement</span>
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Your Industry at the Top</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 max-w-md">
                Get premium placement for your industry on the All Sectors page. Reach 48K+ daily platform visitors with sponsored industry visibility.
              </p>
              <div className="flex gap-2 mt-2">
                <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] px-4 py-2 rounded-lg transition-all">
                  Book Featured Placement
                </Link>
                <Link href="/eoi" className="border border-amber-300 dark:border-amber-800 text-amber-600 font-bold text-[10px] px-4 py-2 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-950/20 transition-all">
                  View Pricing
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["48K+", "92%", "3.2x"].map((val, idx) => (
                <div key={idx} className="bg-white dark:bg-[#0f172a] border border-amber-200 dark:border-amber-900/30 rounded-lg px-3 py-2 text-center">
                  <div className="font-display text-lg font-bold text-amber-600">{val}</div>
                  <div className="text-[8px] text-gray-500">{["Daily Views", "Engagement", "CTR Boost"][idx]}</div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── S22: Premium Industry Discovery ─────────────────────────────── */}
        <div className="bg-gradient-to-br from-slate-950 via-[#0f1d36] to-[#162d54] rounded-3xl p-6 md:p-8 text-white border border-slate-800/50">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2">
              <Badge color="amber"><Crown className="h-2.5 w-2.5" /> VERIFIED+</Badge>
              <Badge color="purple"><Lock className="h-2.5 w-2.5" /> PREMIUM</Badge>
            </div>
            <h3 className="font-display text-xl md:text-2xl font-bold">Unlock Premium Industry Discovery</h3>
            <p className="text-slate-400 text-sm font-normal max-w-lg mx-auto">
              Upgrade to access advanced industry analytics, deep comparison tools, competitive intelligence, investment flow data, and priority search placement.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mt-4">
              {[
                { label: "Deep Analytics", icon: BarChart3 },
                { label: "Market Maps", icon: PieChart },
                { label: "Investment Data", icon: Target },
                { label: "Priority Search", icon: Zap },
              ].map((feat) => (
                <div key={feat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <feat.icon className="h-5 w-5 mx-auto text-amber-400 mb-1" />
                  <span className="text-[9px] text-white font-bold">{feat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
              <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-sm px-8 py-3 rounded-xl transition-all">
                Upgrade to Verified
              </Link>
              <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all">
                Compare Plans
              </Link>
            </div>
          </div>
        </div>

        {/* ── S23: Register Your Business ─────────────────────────────────── */}
        <Card className="p-6 md:p-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center gap-2">
              <Badge color="emerald"><CheckCircle className="h-2.5 w-2.5" /> FREE TO LIST</Badge>
            </div>
            <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">Register Your Business on IGEN</h3>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">
              List your company for free in any industry. Get discovered by buyers, partners, investors, and media across 50+ sectors.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {[
                { label: "Free Company Profile", icon: Building2 },
                { label: "Industry Visibility", icon: Eye },
                { label: "Partner Discovery", icon: Users },
                { label: "News Publishing", icon: Newspaper },
              ].map((feat) => (
                <div key={feat.label} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-3 text-center">
                  <feat.icon className="h-5 w-5 mx-auto text-blue-500 mb-1" />
                  <span className="text-[9px] text-gray-700 dark:text-gray-300 font-bold">{feat.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
              <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all inline-flex items-center gap-2">
                <Plus className="h-4 w-4" /> Register Your Business — Free
              </Link>
              <Link href="/eoi" className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-bold text-sm px-8 py-3 rounded-xl transition-all inline-flex items-center gap-2">
                <Info className="h-4 w-4" /> Learn More
              </Link>
            </div>
          </div>
        </Card>

      </section>
    </div>
  );
}

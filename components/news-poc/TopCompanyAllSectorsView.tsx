"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Search, ChevronRight, ChevronDown, ChevronUp, TrendingUp,
  Star, Globe, Briefcase, BarChart3, ArrowUpRight, Sparkles, Crown, Building2,
  CheckCircle, Award, Flame, Target, Zap, Bookmark, BookmarkCheck, Bell, BellRing, Eye,
  Layers, Lock, Newspaper, Rocket, Scale, Package,
  Filter, SlidersHorizontal, ArrowRight, Plus, Tag,
  MapPin, Download, FileText, Info, AlertTriangle, RefreshCw,
  Mail, Check, Gauge,
} from "lucide-react";
import { IGEN_50_SECTORS, SectorTaxonomyItem } from "./igenTaxonomyData";

// ─── Reuse existing analytics architecture (no new system created) ──────────
type IgenTrack = (event: string, payload?: Record<string, unknown>) => void;
const track = (event: string, payload?: Record<string, unknown>) => {
  if (typeof window !== "undefined") {
    const w = window as unknown as { __igenTrack?: IgenTrack };
    if (typeof w.__igenTrack === "function") w.__igenTrack(event, payload);
  }
};

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
    slate: "bg-slate-50 dark:bg-slate-950/20 text-slate-600 border border-slate-200 dark:border-slate-900/40",
    green: "bg-green-50 dark:bg-green-950/20 text-green-600 border border-green-200 dark:border-green-900/40",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.amber}`}>
      {children}
    </span>
  );
}

function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className}`} />;
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

// ─── Sector category groups (existing iGEN taxonomy groupings) ────────────────
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

// ─── Seed / sample platform data (reused taxonomy as source of truth) ────────
const FEATURED_SECTORS: { code: string; badge: "SPONSORED" | "FEATURED"; tagline: string }[] = [
  { code: "S46", badge: "SPONSORED", tagline: "India's semiconductor revolution — FAB subsidies, OSAT, and chip design hubs." },
  { code: "S38", badge: "FEATURED", tagline: "Enterprise SaaS exports cross $30B — India's software powerhouse." },
  { code: "S45", badge: "SPONSORED", tagline: "Electric vehicles, battery swapping, and green mobility transformation." },
  { code: "S30", badge: "FEATURED", tagline: "Green Hydrogen, Solar, and Wind — India's clean energy transition." },
];

const TRENDING_SECTORS: string[] = ["S02", "S46", "S47", "S42", "S36", "S45"];
const RISING_SECTORS: string[] = ["S36", "S02", "S49", "S47", "S29"];

const EMERGING_SECTORS: { code: string; tags: string[] }[] = [
  { code: "S36", tags: ["Space Tech", "Private Launch", "IN-SPACe"] },
  { code: "S30", tags: ["Green H2", "Solar", "Wind"] },
  { code: "S02", tags: ["GenAI", "Cybersec", "LLMs"] },
  { code: "S45", tags: ["EV", "Battery Swap", "Mobility"] },
  { code: "S47", tags: ["Unicorns", "Seed Fund", "Deep Tech"] },
  { code: "S06", tags: ["mRNA", "Biologics", "Therapeutics"] },
];

const LEADING_COMPANIES: Record<string, string[]> = {
  "S46": ["Tata Electronics", "CG Power", "Kaynes Technology"],
  "S38": ["Infosys", "Wipro", "Persistent Systems"],
  "S30": ["Adani Green", "ReNew Power", "Suzlon Energy"],
  "S45": ["Tata Motors", "Mahindra EV", "Ola Electric"],
  "S23": ["Cipla", "Sun Pharma", "Apollo Hospitals"],
  "S42": ["Razorpay", "PhonePe", "Pine Labs"],
};

const SECTOR_NEWS: { id: string; sectorCode: string; sector: string; company: string; headline: string; category: string; date: string }[] = [
  { id: "n1", sectorCode: "S46", sector: "Semiconductors", company: "Tata Electronics", headline: "Tata Electronics expands OSAT packaging capacity in Tamil Nadu", category: "Expansion", date: "2h ago" },
  { id: "n2", sectorCode: "S30", sector: "Clean Energy", company: "Adani Green", headline: "Adani Green commissions world's largest renewable energy park in Khavda", category: "Milestone", date: "4h ago" },
  { id: "n3", sectorCode: "S38", sector: "Enterprise Software", company: "Infosys", headline: "Infosys launches clean AI workflow automation suites", category: "Product Launch", date: "6h ago" },
  { id: "n4", sectorCode: "S45", sector: "Automotive & EV", company: "Tata Motors", headline: "Tata Motors proposes EV assembly expansion across India corridor", category: "Expansion", date: "8h ago" },
  { id: "n5", sectorCode: "S42", sector: "FinTech", company: "Razorpay", headline: "UPI records 15B transactions — fintech adoption accelerates", category: "Investment", date: "12h ago" },
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

const PRODUCTS_BY_SECTOR: Record<string, string[]> = {
  "S46": ["Semiconductor Chips", "OSAT Packaging", "Fab Equipment"],
  "S38": ["Enterprise SaaS", "Cloud Platforms", "AI Workflows"],
  "S30": ["Solar Modules", "Wind Turbines", "Green Hydrogen"],
  "S45": ["EV Batteries", "Charging Networks", "Power Electronics"],
  "S23": ["Pharmaceuticals", "Medical Devices", "Diagnostics"],
  "S42": ["Payment Gateways", "Lending APIs", "Wealth Tech"],
  "S16": ["Consumer Electronics", "IoT Devices", "Components"],
};

const COUNTRIES = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "AE", name: "UAE", flag: "🇦🇪" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
];

const COMPANIES_TO_WATCH: { id: string; name: string; sectorCode: string; sector: string; reason: string; tag: string }[] = [
  { id: "cw1", name: "Tata Electronics", sectorCode: "S46", sector: "Semiconductors", reason: "Major OSAT fab expansion", tag: "Expansion" },
  { id: "cw2", name: "ReNew Power", sectorCode: "S30", sector: "Clean Energy", reason: "Green hydrogen SIGHT Phase 2", tag: "Investment" },
  { id: "cw3", name: "Ola Electric", sectorCode: "S45", sector: "Automotive & EV", reason: "Battery swap standards finalized", tag: "Product Launch" },
  { id: "cw4", name: "Persistent Systems", sectorCode: "S38", sector: "Enterprise Software", reason: "AI workflow automation suites", tag: "Partnership" },
  { id: "cw5", name: "Pine Labs", sectorCode: "S42", sector: "FinTech", reason: "Cross-border payments expansion", tag: "New Market" },
  { id: "cw6", name: "Sun Pharma", sectorCode: "S23", sector: "Healthcare", reason: "New API bulk drug park ops", tag: "Announcement" },
];

const HERO_CHIPS = ["Technology", "Healthcare", "Finance", "Energy", "Manufacturing", "Automotive", "Agriculture", "Retail", "Logistics"];

export default function TopCompanyAllSectorsView() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  // ─── State ──────────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState<string>("all");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["Technology & Digital"]);
  const [followedSectors, setFollowedSectors] = useState<string[]>(["S16", "S46", "S38"]);
  const [alertSectors, setAlertSectors] = useState<string[]>(["S46"]);
  const [compareA, setCompareA] = useState<string>("S46");
  const [compareB, setCompareB] = useState<string>("S45");
  const [compareExtra, setCompareExtra] = useState<string[]>([]);
  const [businessSector, setBusinessSector] = useState<string>("S46");
  const [businessType, setBusinessType] = useState<string>("manufacturers");
  const [activityCountry, setActivityCountry] = useState<string>("IN");
  const [alertSuccess, setAlertSuccess] = useState(false);

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
    if (quickFilter === "trending") list = list.filter((s) => TRENDING_SECTORS.includes(s.code));
    if (quickFilter === "rising") list = list.filter((s) => RISING_SECTORS.includes(s.code));
    if (quickFilter === "emerging") list = list.filter((s) => EMERGING_SECTORS.some((e) => e.code === s.code));
    if (quickFilter === "featured") list = list.filter((s) => FEATURED_SECTORS.some((f) => f.code === s.code));
    if (quickFilter === "a-z") list = list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [searchQuery, quickFilter]);

  const totalSectors = IGEN_50_SECTORS.length;
  const totalCategories = Object.keys(CATEGORY_GROUPS).length;
  const featuredCount = FEATURED_SECTORS.length;

  // ─── Helpers ────────────────────────────────────────────────────────────────
  const getSector = (code: string) => sectorMap[code];
  const sectorHref = (code: string) => `/${locale}/news-poc/company-news/top/sector?sector=${code}`;
  const companyHref = (id: string) => `/${locale}/news-poc/company-news/top/pages/${id}`;
  const toggleCategory = (cat: string) =>
    setExpandedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
  const toggleFollow = (code: string) => {
    setFollowedSectors((prev) => (prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]));
    track("top_company_all_sectors_follow", { sector: code });
  };
  const toggleAlert = (code: string) => {
    setAlertSectors((prev) => {
      const next = prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code];
      if (!prev.includes(code)) {
        setAlertSuccess(true);
        setTimeout(() => setAlertSuccess(false), 3000);
        track("top_company_all_sectors_alert_create", { sector: code });
      }
      return next;
    });
  };

  const loadData = () => {
    try {
      setError(false);
      setLoading(false);
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  // ─── Error State ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-10">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center space-y-4">
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">We couldn&apos;t load sectors.</h3>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[0, 1, 2].map((i) => <CardSkeleton key={i} />)}</div>
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
          <span className="text-amber-600">All Sectors</span>
        </nav>

        {/* 2. Hero */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-[#b45309] text-white p-6 md:p-10 border border-amber-400/40 shadow-md">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
          <div className="relative z-10 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8 space-y-4">
              <Badge color="amber"><Crown className="h-2.5 w-2.5" /> TOP COMPANIES · ALL SECTORS</Badge>
              <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-none">Explore All Sectors</h1>
              <p className="text-xs md:text-sm text-white/85 max-w-lg leading-relaxed">
                Discover industries, leading companies, sector activity, market developments and business opportunities across the global economy.
              </p>
              <div className="relative max-w-md w-full bg-white/15 backdrop-blur-md rounded-xl border border-white/25 p-1.5 flex items-center gap-2 mt-2">
                <Search className="h-4 w-4 text-white/70 ml-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sectors, industries, companies or topics..."
                  className="flex-1 bg-transparent border-0 outline-none text-xs text-white placeholder-white/70 py-1"
                  aria-label="Search sectors, industries, companies or topics"
                />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="text-[10px] text-white/70 hover:text-white px-2">Clear</button>}
              </div>
              <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-bold">
                <a href="#directory" onClick={() => track("top_company_all_sectors_directory_click")} className="bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg border border-white/15 transition-colors">Explore Sectors</a>
                <a href="#compare" onClick={() => track("top_company_all_sectors_compare")} className="bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg border border-white/15 transition-colors">Compare Sectors</a>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1 text-[9px] font-semibold">
                {HERO_CHIPS.map((q) => (
                  <span key={q} className="bg-black/15 hover:bg-black/25 text-white/90 px-2 py-1 rounded-full">{q}</span>
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
            { label: "All Sectors", val: "all" },
            { label: "Trending", val: "trending" },
            { label: "Rising", val: "rising" },
            { label: "Emerging", val: "emerging" },
            { label: "Featured", val: "featured" },
            { label: "A–Z", val: "a-z" },
          ].map((item) => (
            <button key={item.val} onClick={() => { setQuickFilter(item.val); track("top_company_all_sectors_filter", { filter: item.val }); }} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${quickFilter === item.val ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-150 dark:bg-gray-900 text-gray-550 dark:text-gray-400 hover:text-amber-600 hover:bg-amber-50/50"}`}>
              {item.label}
            </button>
          ))}
        </section>

        {/* 4. Global Sector Directory */}
        <section id="directory" className="space-y-4">
          <SectionTitle
            title="All Industries & Sectors"
            subtitle={`${filteredSectors.length} sectors across ${totalCategories} categories · Master discovery hub`}
            action={
              <div className="flex items-center gap-2">
                <button onClick={() => setExpandedCategories(Object.keys(CATEGORY_GROUPS))} className="text-[9px] font-bold text-amber-600 hover:underline">Expand All</button>
                <button onClick={() => setExpandedCategories([])} className="text-[9px] font-bold text-gray-400 hover:underline">Collapse All</button>
              </div>
            }
          />
          {filteredSectors.length === 0 ? (
            <div className="text-center py-12 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-gray-800 p-6 space-y-3">
              <Layers className="h-8 w-8 text-gray-300 mx-auto" />
              <h4 className="text-xs font-bold text-gray-600 dark:text-gray-400">No sectors are currently available.</h4>
              <button onClick={() => setSearchQuery("")} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-[10px] px-4 py-1.5 rounded-lg">Explore Other Content</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredSectors.map((sec) => {
                const isFollowed = followedSectors.includes(sec.code);
                const featured = FEATURED_SECTORS.find((f) => f.code === sec.code);
                return (
                  <Card key={sec.code} className="p-5 hover:border-amber-500 dark:hover:border-amber-800 transition-all flex flex-col justify-between gap-3 group">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="text-2xl">{sec.icon}</span>
                        <div className="flex items-center gap-1.5">
                          {featured && <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded ${featured.badge === "SPONSORED" ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"}`}>{featured.badge}</span>}
                          {isFollowed && <Badge color="amber"><BookmarkCheck className="h-2.5 w-2.5" /> FOLLOWING</Badge>}
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-gray-400 block font-bold">{sec.code} · {sec.ministry}</span>
                        <h3 className="font-bold text-xs text-gray-900 dark:text-white mt-0.5 group-hover:text-amber-600 transition-colors leading-tight">{sec.name}</h3>
                      </div>
                      <p className="text-[10px] text-gray-500 leading-normal">{sec.feed || "Discover companies, news and intelligence across this sector."}</p>
                      <div className="flex flex-wrap gap-3 text-[9px] text-gray-500">
                        <span><Building2 className="h-3 w-3 inline mr-0.5" /> {sec.count} industries</span>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
                      <button
                        onClick={() => toggleFollow(sec.code)}
                        className={`text-[9.5px] font-bold px-3 py-1.5 rounded-lg border transition-all ${isFollowed ? "bg-emerald-500 text-white border-transparent" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:text-amber-600"}`}
                      >
                        {isFollowed ? "Following" : "Follow +"}
                      </button>
                      <Link href={sectorHref(sec.code)} onClick={() => track("top_company_all_sectors_sector_select", { sector: sec.code })} className="text-[9.5px] font-bold text-amber-600 hover:underline flex items-center gap-0.5">
                        Explore Sector <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* 5. Sector Categories */}
        <section className="space-y-4">
          <SectionTitle title="Explore by Industry Category" subtitle="Organized using the iGEN sector taxonomy" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(CATEGORY_GROUPS).map(([category, codes]) => {
              const categorySectors = codes.map((c) => getSector(c)).filter(Boolean) as SectorTaxonomyItem[];
              if (categorySectors.length === 0) return null;
              const isExpanded = expandedCategories.includes(category);
              return (
                <Card key={category} className="overflow-hidden">
                  <button onClick={() => { toggleCategory(category); track("top_company_all_sectors_filter", { category }); }} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-amber-500" />
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{category}</span>
                      <span className="text-[9px] text-gray-400 font-medium">({categorySectors.length} sectors)</span>
                    </div>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
                  </button>
                  {isExpanded && (
                    <div className="grid grid-cols-2 gap-1 p-3">
                      {categorySectors.map((s) => (
                        <Link key={s.code} href={sectorHref(s.code)} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/10 transition-colors text-left">
                          <span className="text-base">{s.icon}</span>
                          <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 truncate">{s.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </section>

        {/* 6. Featured Sectors */}
        <section className="space-y-4">
          <SectionTitle
            title="Featured Sectors"
            subtitle="Sponsored and editorially featured sectors"
            action={<Badge color="amber"><Award className="h-2.5 w-2.5" /> PROMOTED</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_SECTORS.map((fi) => {
              const sector = getSector(fi.code);
              if (!sector) return null;
              return (
                <Card key={fi.code} className="p-5 border-l-4 border-amber-400 hover:border-amber-500 transition-all flex flex-col justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded ${fi.badge === "SPONSORED" ? "bg-amber-500 text-white" : "bg-emerald-500 text-white"}`}>{fi.badge}</span>
                      <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Paid Placement</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{sector.icon}</span>
                      <div>
                        <h3 className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">{sector.name}</h3>
                        <p className="text-[8px] text-gray-500">{sector.ministry}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-600 dark:text-gray-400 font-normal leading-relaxed">{fi.tagline}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
                    <span className="text-[9px] text-gray-500"><Building2 className="h-3 w-3 inline mr-0.5" /> {sector.count} industries</span>
                    <Link href={sectorHref(sector.code)} onClick={() => track("top_company_all_sectors_featured_click", { sector: fi.code })} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center gap-0.5">Explore Sector <ChevronRight className="h-3 w-3" /></Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 7. Trending Sectors */}
        <section className="space-y-4">
          <SectionTitle
            title="Trending Sectors"
            subtitle="Sectors receiving increased platform attention"
            action={<Badge color="rose"><Flame className="h-2.5 w-2.5" /> LIVE</Badge>}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {TRENDING_SECTORS.map((code, idx) => {
              const s = getSector(code);
              if (!s) return null;
              return (
                <Link href={sectorHref(code)} key={code} onClick={() => track("top_company_all_sectors_trending_click", { sector: code })} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-3 text-center hover:border-amber-300 dark:hover:border-amber-800 hover:shadow-sm transition-all group">
                  <span className="text-2xl block mb-1.5">{s.icon}</span>
                  <span className="font-bold text-[10px] text-gray-900 dark:text-white block leading-tight">{s.name}</span>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Flame className="h-3 w-3 text-orange-500" />
                    <span className="text-[8px] text-orange-500 font-bold">#{idx + 1} Trending</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 8. Rising Sectors */}
        <section className="space-y-4">
          <SectionTitle
            title="Rising Sectors"
            subtitle="Sectors experiencing increasing activity"
            action={<Badge color="emerald"><TrendingUp className="h-2.5 w-2.5" /> RISING</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {RISING_SECTORS.map((code) => {
              const s = getSector(code);
              if (!s) return null;
              return (
                <Link href={sectorHref(code)} key={code} onClick={() => track("top_company_all_sectors_rising_click", { sector: code })} className="border border-emerald-200 dark:border-emerald-900/30 bg-emerald-50/20 dark:bg-emerald-950/10 rounded-xl p-3 text-center hover:shadow-sm transition-all">
                  <span className="text-2xl block mb-1">{s.icon}</span>
                  <span className="font-bold text-[10px] text-gray-900 dark:text-white block leading-tight">{s.name}</span>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                    <span className="text-[8px] text-emerald-500 font-bold">Rising</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 9. Global Sector Snapshot */}
        <section className="space-y-4">
          <SectionTitle title="Global Sector Snapshot" subtitle="Platform-wide sector discovery metrics" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs text-center space-y-2">
              <Globe className="h-6 w-6 mx-auto text-amber-500" />
              <div className="font-display text-lg font-bold text-gray-950 dark:text-white">{totalSectors}+</div>
              <div className="text-[10px] text-gray-450">Total Sectors</div>
            </div>
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs text-center space-y-2">
              <Layers className="h-6 w-6 mx-auto text-blue-500" />
              <div className="font-display text-lg font-bold text-gray-950 dark:text-white">{totalCategories}</div>
              <div className="text-[10px] text-gray-450">Industry Categories</div>
            </div>
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs text-center space-y-2">
              <Star className="h-6 w-6 mx-auto text-emerald-500" />
              <div className="font-display text-lg font-bold text-gray-950 dark:text-white">{featuredCount}</div>
              <div className="text-[10px] text-gray-450">Featured Sectors</div>
            </div>
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs text-center space-y-2">
              <Building2 className="h-6 w-6 mx-auto text-purple-500" />
              <div className="font-display text-lg font-bold text-gray-950 dark:text-white">{followedSectors.length}</div>
              <div className="text-[10px] text-gray-450">Sectors You Follow</div>
            </div>
          </div>
        </section>

        {/* 10. Leading Companies Across Sectors */}
        <section className="space-y-4">
          <SectionTitle
            title="Leading Companies Across Sectors"
            subtitle="A preview connecting top sectors to leading companies"
            action={<Link href="/en/news-poc/company-news/top/pages" onClick={() => track("top_company_all_sectors_company_click")} className="text-[10px] font-bold text-amber-600 hover:underline">Explore Sector Leaders →</Link>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(LEADING_COMPANIES).map(([code, companies]) => {
              const s = getSector(code);
              if (!s) return null;
              return (
                <Card key={code} className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-bold text-xs text-gray-900 dark:text-white">{s.name}</span>
                  </div>
                  <div className="space-y-2">
                    {companies.map((name) => {
                      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      return (
                        <Link key={name} href={companyHref(slug)} onClick={() => track("top_company_all_sectors_company_click", { company: name, sector: code })} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/10 transition-colors group">
                          <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 group-hover:text-amber-600">{name}</span>
                          <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-amber-600" />
                        </Link>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 11. What's Happening Across Industries */}
        <section className="space-y-4">
          <SectionTitle
            title="What's Happening Across Industries?"
            subtitle="Compact sector news preview"
            action={<Badge color="blue"><Newspaper className="h-2.5 w-2.5" /> NEWS</Badge>}
          />
          <div className="space-y-2">
            {SECTOR_NEWS.map((news) => {
              const s = getSector(news.sectorCode);
              return (
                <div key={news.id} className="flex items-start gap-3 border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all">
                  <span className="text-lg shrink-0 mt-0.5">{s?.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge color="amber">{news.sector}</Badge>
                      <span className="text-[8px] font-bold text-gray-500">{news.company}</span>
                      <span className="text-[8px] text-gray-400">· {news.category}</span>
                      <span className="text-[8px] text-gray-400">· {news.date}</span>
                    </div>
                    <p className="font-bold text-xs text-gray-900 dark:text-white leading-snug">{news.headline}</p>
                  </div>
                  <Link href="/en/news-poc/company-news/top/news" onClick={() => track("top_company_all_sectors_news_click", { sector: news.sectorCode })} className="text-[9px] font-bold text-amber-600 hover:underline shrink-0">Read →</Link>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <Link href="/en/news-poc/company-news/top/news" onClick={() => track("top_company_all_sectors_news_click")} className="text-[10px] font-bold text-amber-600 hover:underline inline-flex items-center gap-1">View Sector News <ArrowRight className="h-3 w-3" /></Link>
          </div>
        </section>

        {/* 12. Industry Intelligence */}
        <section className="space-y-4">
          <SectionTitle title="Industry Intelligence" subtitle="Market trends, strategic developments and emerging themes" />
          <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-violet-900 rounded-2xl p-6 md:p-8 text-white border border-indigo-800/50 relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='1' fill='%23fff'/%3E%3C/svg%3E\")" }} />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
              <div className="space-y-2">
                <Badge color="amber"><Crown className="h-2.5 w-2.5" /> PREMIUM INTELLIGENCE</Badge>
                <h3 className="font-display text-lg md:text-xl font-bold">Industry Intelligence & Market Outlook</h3>
                <p className="text-purple-200 text-xs font-normal max-w-md">Explore market trends, strategic developments, opportunities, risks and major companies across every sector.</p>
              </div>
              <Link href="/en/news-poc/sector-news/industry" onClick={() => track("top_company_all_sectors_intelligence_click")} className="bg-white text-purple-900 hover:bg-purple-50 font-bold text-xs px-6 py-3 rounded-xl transition-all inline-flex items-center gap-2 shrink-0">
                <FileText className="h-4 w-4" /> Explore Industry Intelligence
              </Link>
            </div>
          </div>
        </section>

        {/* 13. Country × Sector Explorer */}
        <section className="space-y-4">
          <SectionTitle
            title="Explore Sectors by Country"
            subtitle="Combine a country and a sector to discover leading companies"
            action={<Badge color="blue"><MapPin className="h-2.5 w-2.5" /> GEOGRAPHY</Badge>}
          />
          <Card className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Country</label>
                <select value={activityCountry} onChange={(e) => setActivityCountry(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none">
                  {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Sector</label>
                <select value={businessSector} onChange={(e) => setBusinessSector(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none">
                  {IGEN_50_SECTORS.map((s) => <option key={s.code} value={s.code}>{s.icon} {s.name}</option>)}
                </select>
              </div>
            </div>
            <Link
              href={`/${locale}/news-poc/company-news/top/sector?sector=${businessSector}&country=${activityCountry}`}
              onClick={() => track("top_company_all_sectors_country_click", { country: activityCountry, sector: businessSector })}
              className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-lg inline-flex items-center justify-center gap-1.5 hover:from-amber-600 hover:to-orange-700 transition-all"
            >
              Explore {getSector(businessSector)?.name} in {COUNTRIES.find((c) => c.code === activityCountry)?.name} <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </Card>
        </section>

        {/* 14. Compare Industries */}
        <section id="compare" className="space-y-4">
          <SectionTitle
            title="Compare Industries"
            subtitle="Select 2–4 sectors to compare real platform metrics"
            action={<Badge color="purple"><Scale className="h-2.5 w-2.5" /> COMPARE</Badge>}
          />
          <Card className="p-5 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <select value={compareA} onChange={(e) => setCompareA(e.target.value)} className="text-xs font-bold bg-gray-50 dark:bg-gray-900 border border-gray-205 dark:border-gray-800 px-3 py-2 rounded-xl outline-none">
                {IGEN_50_SECTORS.map((s) => <option key={s.code} value={s.code}>{s.icon} {s.name}</option>)}
              </select>
              <span className="text-xs font-bold text-gray-400">vs</span>
              <select value={compareB} onChange={(e) => setCompareB(e.target.value)} className="text-xs font-bold bg-gray-50 dark:bg-gray-900 border border-gray-205 dark:border-gray-800 px-3 py-2 rounded-xl outline-none">
                {IGEN_50_SECTORS.map((s) => <option key={s.code} value={s.code}>{s.icon} {s.name}</option>)}
              </select>
              <select
                value={compareExtra[0] || ""}
                onChange={(e) => setCompareExtra(e.target.value ? [e.target.value] : [])}
                className="text-xs font-bold bg-gray-50 dark:bg-gray-900 border border-gray-205 dark:border-gray-800 px-3 py-2 rounded-xl outline-none"
              >
                <option value="">+ Add sector (optional)</option>
                {IGEN_50_SECTORS.filter((s) => s.code !== compareA && s.code !== compareB).map((s) => <option key={s.code} value={s.code}>{s.icon} {s.name}</option>)}
              </select>
            </div>
            {(() => {
              const codes = [compareA, compareB, ...compareExtra].filter(Boolean);
              const cols = codes.map((c) => getSector(c)).filter(Boolean) as SectorTaxonomyItem[];
              if (cols.length < 2) return null;
              return (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-[10px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                        <th className="text-left py-2">Metric</th>
                        {cols.map((c) => <th key={c.code} className="text-center py-2">{c.icon} {c.name}</th>)}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                      {[
                        { metric: "Industries Indexed", get: (c: SectorTaxonomyItem) => c.count.toString() },
                        { metric: "Ministry / Dept", get: (c: SectorTaxonomyItem) => c.ministry.split(" ").slice(0, 3).join(" ") + "…" },
                        { metric: "Latest Signal", get: (c: SectorTaxonomyItem) => c.feed || "—" },
                      ].map((row) => (
                        <tr key={row.metric} className="hover:bg-gray-50 dark:hover:bg-gray-900/30">
                          <td className="py-2 font-bold text-gray-700 dark:text-gray-300">{row.metric}</td>
                          {cols.map((c) => <td key={c.code} className="py-2 text-center text-gray-600 dark:text-gray-400 text-[10px]">{row.get(c)}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })()}
            <p className="text-[9px] text-gray-400">Advanced comparison metrics (company counts, news activity, product activity) are available with a Premium account.</p>
          </Card>
        </section>

        {/* 15. Business Type Explorer */}
        <section className="space-y-4">
          <SectionTitle
            title="Find Companies by Business Type"
            subtitle="Narrow discovery by sector and business role"
            action={<Badge color="slate"><Briefcase className="h-2.5 w-2.5" /> ECOSYSTEM</Badge>}
          />
          <Card className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Sector</label>
                <select value={businessSector} onChange={(e) => setBusinessSector(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none">
                  {IGEN_50_SECTORS.map((s) => <option key={s.code} value={s.code}>{s.icon} {s.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-bold text-gray-400 uppercase">Business Type</label>
                <select value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-xs outline-none">
                  {BUSINESS_TYPES.map((b) => <option key={b.key} value={b.key}>{b.label}</option>)}
                </select>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-850 pt-3">
              <p className="text-[10px] text-gray-500">{BUSINESS_TYPES.find((b) => b.key === businessType)?.desc}</p>
              <Link href={sectorHref(businessSector)} onClick={() => track("top_company_all_sectors_business_type_click", { sector: businessSector, type: businessType })} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-[10px] px-4 py-2 rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all">
                View {BUSINESS_TYPES.find((b) => b.key === businessType)?.label} →
              </Link>
            </div>
          </Card>
        </section>

        {/* 16. Products & Services Explorer */}
        <section className="space-y-4">
          <SectionTitle
            title="Explore Products & Services by Sector"
            subtitle="Sector → Product/Service → Company → Business Enquiry"
            action={<Badge color="blue"><Package className="h-2.5 w-2.5" /> CATALOG</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(PRODUCTS_BY_SECTOR).map(([code, products]) => {
              const s = getSector(code);
              if (!s) return null;
              return (
                <Card key={code} className="p-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="font-bold text-xs text-gray-900 dark:text-white">{s.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {products.map((p) => (
                      <Link key={p} href={sectorHref(code)} onClick={() => track("top_company_all_sectors_product_click", { sector: code, product: p })} className="text-[9px] font-bold bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-2.5 py-1 rounded-lg hover:bg-amber-50 dark:hover:bg-amber-950/20 hover:text-amber-600 dark:hover:text-amber-400 transition-all">
                        <Tag className="h-3 w-3 inline mr-1" />{p}
                      </Link>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 17. Companies to Watch */}
        <section className="space-y-4">
          <SectionTitle
            title="Companies to Watch Across Industries"
            subtitle="Companies receiving meaningful platform attention"
            action={<Badge color="amber"><Eye className="h-2.5 w-2.5" /> WATCHLIST</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPANIES_TO_WATCH.map((c) => {
              const s = getSector(c.sectorCode);
              return (
                <Card key={c.id} className="p-5 hover:border-amber-500 dark:hover:border-amber-800 transition-all space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xl">{s?.icon}</span>
                    <Badge color="amber">{c.tag}</Badge>
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-gray-900 dark:text-white">{c.name}</h3>
                    <p className="text-[9px] text-gray-400">{s?.name}</p>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed">{c.reason}</p>
                  <Link href={companyHref(c.id)} onClick={() => track("top_company_all_sectors_watch_click", { company: c.id })} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center gap-0.5">View Company <ChevronRight className="h-3 w-3" /></Link>
                </Card>
              );
            })}
          </div>
        </section>

        {/* 18. Emerging & High-Interest Sectors */}
        <section className="space-y-4">
          <SectionTitle
            title="Emerging & High-Interest Sectors"
            subtitle="Innovative sectors shaping the next decade"
            action={<Badge color="purple"><Sparkles className="h-2.5 w-2.5" /> INNOVATIVE</Badge>}
          />
          <div className="space-y-3">
            {EMERGING_SECTORS.map((ei) => {
              const s = getSector(ei.code);
              if (!s) return null;
              return (
                <div key={ei.code} className="flex items-center justify-between border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{s.icon}</span>
                    <div>
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{s.name}</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {ei.tags.map((tag) => <span key={tag} className="text-[7px] font-bold bg-purple-100 dark:bg-purple-950/20 text-purple-600 px-1.5 py-0.5 rounded">{tag}</span>)}
                      </div>
                    </div>
                  </div>
                  <Link href={sectorHref(ei.code)} onClick={() => track("top_company_all_sectors_sector_select", { sector: ei.code })} className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg transition-all">Explore →</Link>
                </div>
              );
            })}
          </div>
        </section>

        {/* 19. Recommended For You */}
        <section className="space-y-4">
          <SectionTitle
            title="Recommended for You"
            subtitle="Personalized sector suggestions based on sectors you follow"
            action={<Badge color="blue"><Target className="h-2.5 w-2.5" /> PERSONALIZED</Badge>}
          />
          {followedSectors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {EMERGING_SECTORS.map((ei) => {
                const s = getSector(ei.code);
                if (!s || followedSectors.includes(ei.code)) return null;
                return (
                  <div key={ei.code} className="border border-blue-200 dark:border-blue-900/30 bg-blue-50/20 dark:bg-blue-950/10 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{s.icon}</span>
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{s.name}</span>
                    </div>
                    <p className="text-[9px] text-gray-500">Recommended because you follow related sectors.</p>
                    <div className="flex items-center gap-2">
                      <Link href={sectorHref(ei.code)} onClick={() => track("top_company_all_sectors_recommended_click", { sector: ei.code })} className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg transition-all flex-1 text-center">Explore Sector</Link>
                      <button onClick={() => toggleFollow(ei.code)} className={`p-1.5 rounded-lg transition-all ${followedSectors.includes(ei.code) ? "bg-blue-100 dark:bg-blue-950/30 text-blue-600" : "bg-gray-100 dark:bg-gray-900 text-gray-400"}`}>
                        {followedSectors.includes(ei.code) ? <BookmarkCheck className="h-3.5 w-3.5" /> : <Bookmark className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
              <Target className="h-8 w-8 text-gray-300 mx-auto" />
              <p className="text-xs text-gray-500">Follow sectors and companies to personalize your experience.</p>
            </div>
          )}
        </section>

        {/* 20. Followed Sectors */}
        <section className="space-y-4">
          <SectionTitle
            title="Sectors You Follow"
            subtitle="Get updates about companies, news and developments in these sectors"
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
                        <span className="text-[9px] text-gray-400 block">{s.ministry}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleAlert(code)} className={`p-1.5 rounded-lg transition-all ${alertSectors.includes(code) ? "bg-amber-100 dark:bg-amber-950/30 text-amber-600" : "bg-gray-100 dark:bg-gray-900 text-gray-400"}`} title="Toggle alerts">
                        {alertSectors.includes(code) ? <BellRing className="h-3.5 w-3.5" /> : <Bell className="h-3.5 w-3.5" />}
                      </button>
                      <button onClick={() => toggleFollow(code)} className="bg-red-50 dark:bg-red-950/20 text-red-500 hover:bg-red-100 dark:hover:bg-red-950/30 font-bold text-[9px] px-2.5 py-1.5 rounded-lg transition-all">Unfollow</button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-gray-800 space-y-2">
              <Bookmark className="h-8 w-8 text-gray-300 mx-auto" />
              <p className="text-xs text-gray-500">You are not following any sectors yet. Use “Follow +” on any sector card above.</p>
            </div>
          )}
        </section>

        {/* 21. Sector Alerts */}
        <section className="space-y-4">
          <SectionTitle
            title="Never Miss Sector Updates"
            subtitle="Create alerts for news, new companies, product launches and more"
            action={<Badge color="amber"><Bell className="h-2.5 w-2.5" /> ALERTS</Badge>}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { type: "Sector News", desc: "Instant alerts for sector-breaking developments", icon: Zap, color: "text-red-500" },
              { type: "New Companies", desc: "Notifications when new companies list in your sectors", icon: Building2, color: "text-blue-500" },
              { type: "Product Launches", desc: "Track new product and service announcements", icon: Rocket, color: "text-purple-500" },
            ].map((alert) => (
              <div key={alert.type} className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <alert.icon className={`h-5 w-5 ${alert.color}`} />
                  <span className="font-bold text-xs text-gray-900 dark:text-white">{alert.type}</span>
                </div>
                <p className="text-[9px] text-gray-500">{alert.desc}</p>
                <button
                  onClick={() => { setAlertSuccess(true); setTimeout(() => setAlertSuccess(false), 3000); track("top_company_all_sectors_alert_create"); }}
                  className="w-full bg-gray-100 dark:bg-gray-900 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-gray-700 dark:text-gray-300 hover:text-amber-600 font-bold text-[9px] py-2 rounded-lg transition-all"
                >
                  <Bell className="h-3 w-3 inline mr-1" /> Create Alert
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 22. Global Sector Activity */}
        <section className="space-y-4">
          <SectionTitle
            title="Global Sector Activity"
            subtitle="Sector presence by country — directory-based discovery"
            action={<Badge color="blue"><Globe className="h-2.5 w-2.5" /> GLOBAL</Badge>}
          />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {COUNTRIES.map((c) => (
              <Card key={c.code} className="p-4 text-center space-y-2 hover:border-amber-500 transition-all">
                <span className="text-3xl block">{c.flag}</span>
                <span className="font-bold text-[10px] text-gray-900 dark:text-white block">{c.name}</span>
                <Link href={`/${locale}/news-poc/company-news/top/sector?country=${c.code}`} onClick={() => track("top_company_all_sectors_country_click", { country: c.code })} className="text-[8.5px] font-bold text-amber-600 hover:underline inline-flex items-center gap-0.5">
                  Explore Sectors <ChevronRight className="h-3 w-3" />
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* 23. Advanced Sector Discovery (Premium) */}
        <section className="space-y-4">
          <div className="bg-gradient-to-br from-slate-950 via-[#0f1d36] to-[#162d54] rounded-3xl p-6 md:p-8 text-white border border-slate-800/50">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-2">
                <Badge color="amber"><Crown className="h-2.5 w-2.5" /> TOP COMPANY</Badge>
                <Badge color="purple"><Lock className="h-2.5 w-2.5" /> PREMIUM</Badge>
              </div>
              <h3 className="font-display text-xl md:text-2xl font-bold">Advanced Sector Discovery</h3>
              <p className="text-slate-400 text-sm font-normal max-w-lg mx-auto">
                Upgrade to access advanced sector filters, company comparison, historical sector data, saved searches, advanced alerts, sector analytics, export reports and premium intelligence.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto mt-4">
                {[
                  { label: "Advanced Filters", icon: Filter },
                  { label: "Sector Analytics", icon: BarChart3 },
                  { label: "Export Reports", icon: Download },
                  { label: "Premium Intelligence", icon: Sparkles },
                ].map((feat) => (
                  <div key={feat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <feat.icon className="h-5 w-5 mx-auto text-amber-400 mb-1" />
                    <span className="text-[9px] text-white font-bold">{feat.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
                <Link href="/eoi" onClick={() => track("top_company_all_sectors_premium_click")} className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-sm px-8 py-3 rounded-xl transition-all">
                  Unlock Advanced Discovery
                </Link>
                <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all">
                  Compare Plans
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 24. Sector Spotlight (Sponsored) */}
        <section className="space-y-4">
          <SectionTitle
            title="Sector Spotlight"
            subtitle="Premium sector placements and sponsored content"
            action={<Badge color="amber"><Award className="h-2.5 w-2.5" /> AD</Badge>}
          />
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/10 dark:to-orange-950/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-5">
            <div className="flex-1 space-y-2">
              <span className="text-[8px] font-bold text-amber-600 uppercase tracking-widest">Sponsored Sector Spotlight</span>
              <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">Your Sector at the Top of Discovery</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 max-w-md">
                Get premium placement for your sector on the All Sectors hub. Reach decision-makers exploring your industry across the platform.
              </p>
              <div className="flex gap-2 mt-2">
                <Link href="/eoi" onClick={() => track("top_company_all_sectors_sponsored_click")} className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-[10px] px-4 py-2 rounded-lg transition-all">Book Spotlight</Link>
                <Link href="/eoi" className="border border-amber-300 dark:border-amber-800 text-amber-600 font-bold text-[10px] px-4 py-2 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-950/20 transition-all">View Pricing</Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Featured", "Sponsored", "Premium"].map((val, idx) => (
                <div key={idx} className="bg-white dark:bg-[#0f172a] border border-amber-200 dark:border-amber-900/30 rounded-lg px-3 py-2 text-center">
                  <div className="font-display text-sm font-bold text-amber-600">{val}</div>
                  <div className="text-[8px] text-gray-500">Placement</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 25. Get Discovered In Your Industry */}
        <section className="space-y-4">
          <Card className="p-6 md:p-8">
            <div className="text-center space-y-4">
              <div className="flex justify-center gap-2">
                <Badge color="emerald"><CheckCircle className="h-2.5 w-2.5" /> FREE TO LIST</Badge>
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">Get Discovered in Your Industry</h3>
              <p className="text-sm text-gray-500 max-w-lg mx-auto">
                Put your company in front of professionals, buyers and business audiences exploring your industry.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 max-w-3xl mx-auto">
                {[
                  { label: "Company Listing", icon: Building2 },
                  { label: "Sector Visibility", icon: Eye },
                  { label: "Featured Placement", icon: Star },
                  { label: "Business Enquiries", icon: Mail },
                  { label: "Analytics", icon: Gauge },
                  { label: "Premium Visibility", icon: Crown },
                ].map((feat) => (
                  <div key={feat.label} className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-xl p-3 text-center">
                    <feat.icon className="h-5 w-5 mx-auto text-amber-500 mb-1" />
                    <span className="text-[8.5px] text-gray-700 dark:text-gray-300 font-bold">{feat.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
                <Link href="/eoi" onClick={() => track("top_company_all_sectors_register_click")} className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950 font-bold text-sm px-8 py-3 rounded-xl transition-all inline-flex items-center gap-2">
                  <Plus className="h-4 w-4" /> Register Your Company
                </Link>
                <Link href="/eoi" onClick={() => track("top_company_all_sectors_enquiry_click")} className="border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-300 font-bold text-sm px-8 py-3 rounded-xl transition-all inline-flex items-center gap-2">
                  <Info className="h-4 w-4" /> Explore Company Plans
                </Link>
              </div>
            </div>
          </Card>
        </section>

        {/* Alert success banner */}
        {alertSuccess && (
          <div className="fixed bottom-6 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-bottom-4">
            <Check className="h-4 w-4" />
            <span className="font-bold text-xs">Alert created! You&apos;ll receive notifications for this sector.</span>
          </div>
        )}

      </div>
    </div>
  );
}

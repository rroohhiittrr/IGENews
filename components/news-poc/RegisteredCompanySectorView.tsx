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
  TrendingDown,
} from "lucide-react";

// ─── Interfaces ─────────────────────────────────────────────────────────────

interface CompanyItem {
  id: string;
  name: string;
  initials: string;
  logoInitials: string;
  tagline: string;
  industry: string;
  industryId: string;
  country: string;
  countryCode: string;
  views: number;
  followers: number;
  growth: string;
  ranking: number;
  isVerified: boolean;
  isFeatured: boolean;
  featuredText?: string;
  products: string[];
  founded: string;
  employees: string;
  listedDate: string;
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

const SECTOR_COMPANIES: CompanyItem[] = [
  {
    id: "co-1",
    name: "Tata Steel Ltd.",
    initials: "TS",
    logoInitials: "TS",
    tagline: "Tata Steel is a top global producer specializing in carbon-free recycling smelters and raw metallurgy projects.",
    industry: "Steel & Metallurgy",
    industryId: "steel-metallurgy",
    country: "India",
    countryCode: "IN",
    views: 31200,
    followers: 4800,
    growth: "+14.2%",
    ranking: 1,
    isVerified: true,
    isFeatured: true,
    featuredText: "Featured Global Supplier",
    products: ["Hot Rolled Coils", "Galvanized Steel", "Structural Rebars"],
    founded: "1907",
    employees: "32,000+",
    listedDate: "2024-01-10",
  },
  {
    id: "co-3",
    name: "Adani Green Energy Ltd.",
    initials: "AG",
    logoInitials: "AG",
    tagline: "Adani Green Energy commissions world-scale clean hybrid solar-wind energy installations.",
    industry: "Renewable Energy",
    industryId: "renewable-energy",
    country: "India",
    countryCode: "IN",
    views: 48200,
    followers: 6900,
    growth: "+22.8%",
    ranking: 1,
    isVerified: true,
    isFeatured: false,
    products: ["Solar Farms", "Wind Power Generators", "Grid Integration Systems"],
    founded: "2015",
    employees: "14,500+",
    listedDate: "2024-03-12",
  },
  {
    id: "co-4",
    name: "Cipla Pharmaceuticals Ltd.",
    initials: "CP",
    logoInitials: "CP",
    tagline: "Cipla Pharma designs regulatory approved respiratory generics and active pharmaceutical ingredients.",
    industry: "Pharmaceuticals",
    industryId: "pharmaceuticals",
    country: "India",
    countryCode: "IN",
    views: 18400,
    followers: 2900,
    growth: "+8.5%",
    ranking: 2,
    isVerified: true,
    isFeatured: false,
    products: ["Generic Albuterol", "Asthma Inhalers", "Active API Ingredients"],
    founded: "1935",
    employees: "22,000+",
    listedDate: "2024-02-15",
  },
  {
    id: "co-7",
    name: "Sunrise Agro Exports Pvt. Ltd.",
    initials: "SA",
    logoInitials: "SA",
    tagline: "Sunrise Agro specializes in spices, pulses, and organic grains for domestic and Gulf trade corridors.",
    industry: "Agriculture",
    industryId: "agriculture",
    country: "India",
    countryCode: "IN",
    views: 1840,
    followers: 320,
    growth: "+18.5%",
    ranking: 4,
    isVerified: false,
    isFeatured: false,
    products: ["Organic Cardamom", "Cumin Seeds", "Turmeric Extracts"],
    founded: "2022",
    employees: "150",
    listedDate: "2026-03-10",
  },
  {
    id: "co-8",
    name: "NexusTech Logistics Solutions",
    initials: "NL",
    logoInitials: "NL",
    tagline: "NexusTech designs AI-driven container tracking telemetry and automated fleet management panels.",
    industry: "Logistics",
    industryId: "logistics",
    country: "India",
    countryCode: "IN",
    views: 12400,
    followers: 1850,
    growth: "+31.2%",
    ranking: 2,
    isVerified: true,
    isFeatured: true,
    featuredText: "Sponsored Tech Partner",
    products: ["GPS Telemetry Hubs", "Supply Chain Analytics Dashboard", "Last-Mile Delivery Bots"],
    founded: "2020",
    employees: "850",
    listedDate: "2025-06-18",
  },
  {
    id: "co-10",
    name: "Larsen & Toubro Ltd. (L&T)",
    initials: "LT",
    logoInitials: "LT",
    tagline: "L&T Heavy Engineering executes greenfield hydrogen terminals and EPC pipelines in the UAE.",
    industry: "Construction & Engineering",
    industryId: "construction-engineering",
    country: "UAE",
    countryCode: "AE",
    views: 29500,
    followers: 4300,
    growth: "+11.4%",
    ranking: 1,
    isVerified: true,
    isFeatured: false,
    products: ["Hydrogen Pipelines", "Refinery EPC Projects", "Smart Infrastructure Layouts"],
    founded: "1938",
    employees: "54,000+",
    listedDate: "2024-05-20",
  },
];

const INDUSTRIES_TAXONOMY = [
  {
    id: "steel-metallurgy",
    name: "Steel & Metallurgy",
    icon: "⚙️",
    count: 142,
    newsCount: 820,
    trending: true,
    topCo: "Tata Steel Ltd.",
    subcategories: ["Raw Ore Smelting", "Electric Arc Furnaces", "Structural Rebars", "Flat Rolled Sheets"],
  },
  {
    id: "logistics",
    name: "Logistics & Supply Chain",
    icon: "🚢",
    count: 231,
    newsCount: 1420,
    trending: true,
    topCo: "NexusTech Logistics Solutions",
    subcategories: ["Telemetry GPS", "Automated Fleet", "Container Freight", "Cold Chain Warehousing"],
  },
  {
    id: "renewable-energy",
    name: "Renewable Energy",
    icon: "⚡",
    count: 174,
    newsCount: 2150,
    trending: true,
    topCo: "Adani Green Energy Ltd.",
    subcategories: ["Solar Farms", "Offshore Wind", "Battery Grid Storage", "Hydrogen Electrolyzers"],
  },
  {
    id: "pharmaceuticals",
    name: "Pharmaceuticals",
    icon: "💊",
    count: 195,
    newsCount: 1840,
    trending: false,
    topCo: "Cipla Pharmaceuticals Ltd.",
    subcategories: ["Generic Respiratory", "API Formulations", "Oncology Research", "Bio-similars"],
  },
  {
    id: "it-technology",
    name: "IT & Technology",
    icon: "💻",
    count: 312,
    newsCount: 4200,
    trending: true,
    topCo: "G42 AI Group",
    subcategories: ["Sovereign Compute", "Enterprise Cloud", "Cybersecurity Shield", "LLM Fine-tuning"],
  },
  {
    id: "construction-engineering",
    name: "Construction & Engineering",
    icon: "🏗️",
    count: 188,
    newsCount: 1540,
    trending: false,
    topCo: "L&T Heavy Engineering",
    subcategories: ["EPC Green Pipelines", "Infrastructure Layouts", "Marine Terminals", "Bridge Slabs"],
  },
  {
    id: "automotive-ev",
    name: "Automotive & EV",
    icon: "🚗",
    count: 218,
    newsCount: 3100,
    trending: true,
    topCo: "Tesla Inc.",
    subcategories: ["EV Assembly Lines", "Autonomous Assist", "Giga Castings", "Solid State Cells"],
  },
  {
    id: "agriculture",
    name: "Agriculture",
    icon: "🌾",
    count: 158,
    newsCount: 650,
    trending: false,
    topCo: "Sunrise Agro Exports",
    subcategories: ["Organic Spice Treaties", "Grain Processing", "Bilateral Freight Sourcing", "Packaging Systems"],
  },
];

export default function RegisteredCompanySectorView() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || "en";

  // ─── States ───────────────────────────────────────────────────────────────

  const [searchQuery, setSearchQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState("all");

  // Followed watchlist (Follow Industry / Follow Company)
  const [followedIndustries, setFollowedIndustries] = useState<string[]>(["renewable-energy"]);
  const [followedCompanies, setFollowedCompanies] = useState<string[]>(["co-1"]);

  // Comparative selection list (up to 4 companies)
  const [comparedCos, setComparedCos] = useState<string[]>(["co-1", "co-3"]);
  const [showComparisonPanel, setShowComparisonPanel] = useState(false);

  // Industry Alerts States
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    industryId: "all",
    frequency: "daily",
  });

  // Ranking Drawer Info Modal
  const [showRankingInfo, setShowRankingInfo] = useState(false);

  // ─── Filter Logic ─────────────────────────────────────────────────────────

  const filteredIndustries = INDUSTRIES_TAXONOMY.filter((ind) => {
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchQuery =
        ind.name.toLowerCase().includes(q) ||
        ind.topCo.toLowerCase().includes(q) ||
        ind.subcategories.some((sub) => sub.toLowerCase().includes(q));
      if (!matchQuery) return false;
    }

    // Quick filter classification
    if (quickFilter !== "all") {
      if (quickFilter === "popular" && ind.count < 180) return false;
      if (quickFilter === "trending" && !ind.trending) return false;
      if (quickFilter === "emerging" && ind.count > 200) return false; // simulated emerging (smaller count)
      if (quickFilter === "most_companies" && ind.count < 200) return false;
      if (quickFilter === "most_active" && ind.newsCount < 1500) return false;
    }

    return true;
  });

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const toggleFollowIndustry = (id: string) => {
    if (followedIndustries.includes(id)) {
      setFollowedIndustries(followedIndustries.filter((i) => i !== id));
    } else {
      setFollowedIndustries([...followedIndustries, id]);
    }
  };

  const toggleFollowCompany = (id: string) => {
    if (followedCompanies.includes(id)) {
      setFollowedCompanies(followedCompanies.filter((c) => c !== id));
    } else {
      setFollowedCompanies([...followedCompanies, id]);
    }
  };

  const handleCompareSelect = (id: string) => {
    if (comparedCos.includes(id)) {
      setComparedCos(comparedCos.filter((i) => i !== id));
    } else {
      if (comparedCos.length >= 4) {
        alert("You can compare a maximum of 4 companies side by side.");
        return;
      }
      setComparedCos([...comparedCos, id]);
    }
  };

  const submitAlert = (e: React.FormEvent) => {
    e.preventDefault();
    setAlertSuccess(true);
    setTimeout(() => {
      setAlertSuccess(false);
      setAlertConfig({ industryId: "all", frequency: "daily" });
    }, 3000);
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4 space-y-8">

        {/* 1. Breadcrumbs */}
        <nav className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 py-2">
          <Link href="/en/news-poc" className="hover:text-blue-600">iGEN Home</Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">Registered Company</span>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="text-blue-600">By Sector</span>
        </nav>

        {/* 2. Hero Section */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-[#141b2c] to-[#0b1b36] text-white p-6 md:p-10 border border-indigo-900 shadow-md">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
          <div className="relative z-10 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8 space-y-4">
              <span className="bg-blue-500/20 text-blue-300 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-400/20 inline-block">
                Industry Sourcing Matrix
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-none">
                Explore Companies by Industry
              </h1>
              <p className="text-xs md:text-sm text-slate-300 max-w-lg leading-relaxed font-normal">
                Discover leading, emerging and verified companies across industries and explore the latest business activity within each sector.
              </p>

              {/* Primary Search */}
              <div className="relative max-w-md w-full bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-1.5 flex items-center gap-2 mt-2">
                <Search className="h-4 w-4 text-slate-400 ml-2 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search industries, companies, products or services..."
                  className="flex-1 bg-transparent border-0 outline-none text-xs text-white placeholder-slate-400 py-1"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="text-[10px] text-slate-400 hover:text-white px-2">Clear</button>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-bold">
                <a href="#directory-section" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                  Explore Industries
                </a>
                <Link href="/eoi" className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/10 transition-colors">
                  Register Your Business
                </Link>
              </div>
            </div>

            {/* Quick conversion tags */}
            <div className="col-span-12 md:col-span-4 flex flex-col gap-2 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Quick Links</span>
              <div className="grid grid-cols-2 gap-2 text-[9px] font-semibold text-white/90">
                <button onClick={() => setQuickFilter("popular")} className="bg-white/10 p-2 rounded text-left hover:bg-white/20">🔥 Popular</button>
                <button onClick={() => setQuickFilter("trending")} className="bg-white/10 p-2 rounded text-left hover:bg-white/20">⚡ Trending</button>
                <button onClick={() => setQuickFilter("emerging")} className="bg-white/10 p-2 rounded text-left hover:bg-white/20">🌱 Emerging</button>
                <button onClick={() => setQuickFilter("all")} className="bg-white/10 p-2 rounded text-left hover:bg-white/20">📂 All Sectors</button>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Quick Filters Strip */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3.5 rounded-2xl flex flex-wrap gap-2 items-center shadow-xs">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" />
            Sort / Filter:
          </span>
          {[
            { label: "All Industries", val: "all" },
            { label: "Popular", val: "popular" },
            { label: "Trending", val: "trending" },
            { label: "Emerging", val: "emerging" },
            { label: "Most Companies", val: "most_companies" },
            { label: "Most Active", val: "most_active" },
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
        </section>

        {/* 4. Popular Industries Grid */}
        <section className="space-y-4">
          <SectionTitle
            title="Popular Industries"
            subtitle="Sectors attracting strong user interest and procurement search volumes."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {INDUSTRIES_TAXONOMY.slice(0, 4).map((ind) => (
              <Card key={ind.id} className="p-5 flex flex-col justify-between hover:border-blue-400 transition-all">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{ind.icon}</span>
                    {ind.trending && (
                      <Badge color="amber">
                        <TrendingUp className="h-2.5 w-2.5" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-sm text-gray-900 dark:text-white leading-tight">{ind.name}</h3>
                  <div className="flex flex-col text-[10px] text-gray-400 font-semibold space-y-0.5 pt-1">
                    <span>🏢 {ind.count} Companies</span>
                    <span>📄 {ind.newsCount} News Stories</span>
                    <span>👑 Lead: {ind.topCo}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery(ind.name);
                    document.getElementById("directory-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-4 bg-blue-50 dark:bg-blue-950/20 text-blue-600 hover:bg-blue-100 text-[10px] font-bold py-2 rounded-lg w-full text-center transition-colors"
                >
                  Explore Industry →
                </button>
              </Card>
            ))}
          </div>
        </section>

        {/* 5. Trending Industries Section */}
        <section className="space-y-3">
          <SectionTitle
            title="Trending Industries"
            subtitle="Sectors experiencing high company registration volumes and news engagement spike."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {INDUSTRIES_TAXONOMY.filter((i) => i.trending).slice(0, 3).map((ind) => (
              <div key={ind.id} className="bg-gradient-to-r from-amber-50 to-orange-50/50 dark:from-amber-950/15 dark:to-orange-950/5 border border-amber-200 dark:border-amber-900 p-4 rounded-xl flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-[9px] font-bold text-amber-600 uppercase tracking-widest">
                    <Flame className="h-3.5 w-3.5" />
                    Trending this week
                  </div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">{ind.name}</h4>
                  <p className="text-[10px] text-gray-500 font-normal">Active leader: {ind.topCo}</p>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery(ind.name);
                    document.getElementById("directory-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-amber-600 text-white font-bold text-[9px] px-3.5 py-1.5 rounded-lg shrink-0"
                >
                  Explore →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Complete Industry Directory Tree */}
        <section id="directory-section" className="space-y-4">
          <SectionTitle
            title="Explore All Industries"
            subtitle="Complete B2B company directory categorization mapped to existing taxonomy."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs">
            {filteredIndustries.length === 0 ? (
              <div className="col-span-2 text-center py-8 space-y-2">
                <SlidersHorizontal className="h-8 w-8 text-gray-300 mx-auto" />
                <h4 className="text-xs font-bold text-gray-600">No industries match your search query.</h4>
                <button onClick={() => setSearchQuery("")} className="bg-blue-600 text-white font-bold text-[10px] px-4 py-1.5 rounded-lg">
                  Explore All Industries
                </button>
              </div>
            ) : (
              filteredIndustries.map((ind) => (
                <div key={ind.id} className="border border-gray-100 dark:border-gray-850 p-4 rounded-2xl bg-gray-50 dark:bg-gray-955 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{ind.icon}</span>
                      <h4 className="font-bold text-xs text-gray-950 dark:text-white">{ind.name}</h4>
                    </div>
                    <button
                      onClick={() => toggleFollowIndustry(ind.id)}
                      className={`text-[8px] font-bold px-2 py-0.5 rounded border transition-colors ${
                        followedIndustries.includes(ind.id)
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-white text-gray-500 border-gray-200 hover:text-blue-600"
                      }`}
                    >
                      {followedIndustries.includes(ind.id) ? "✓ Following" : "+ Follow"}
                    </button>
                  </div>

                  {/* Subcategories (Taxonomy nodes) */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ind.subcategories.map((sub, idx) => (
                      <span key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-[8px] font-semibold px-2 py-0.5 rounded">
                        {sub}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[9px] border-t border-gray-150 dark:border-gray-800 pt-2 text-gray-450 font-semibold">
                    <span>🏢 {ind.count} registered companies</span>
                    <button
                      onClick={() => {
                        setAlertConfig({ ...alertConfig, industryId: ind.id });
                        document.getElementById("alerts-section")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-blue-650 hover:underline"
                    >
                      Create alert
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Primary Page Grid */}
        <div className="grid grid-cols-12 gap-8">

          {/* Left Column (Rankings, Emerging, Watching) */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {/* 7. Top Companies by Industry */}
            <section className="space-y-4">
              <SectionTitle
                title="Top Companies by Industry"
                subtitle="High ranking enterprise leaders mapped to platforms."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INDUSTRIES_TAXONOMY.slice(0, 4).map((ind) => (
                  <div key={ind.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-850 p-4 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-1.5">
                      <span className="font-bold text-xs text-gray-900 dark:text-white uppercase">{ind.name}</span>
                      <span className="text-[9px] text-gray-400">Ranked Lead</span>
                    </div>
                    <div className="space-y-2">
                      {SECTOR_COMPANIES.filter((c) => c.industryId === ind.id).map((c, idx) => (
                        <div key={c.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-extrabold text-gray-300">#{idx + 1}</span>
                            <span
                              onClick={() => router.push(`/${locale}/company-news/top/pages/${c.id}`)}
                              className="font-bold text-gray-900 dark:text-white hover:text-blue-600 hover:underline cursor-pointer"
                            >
                              {c.name}
                            </span>
                            {c.isVerified && <CheckCircle className="h-3 w-3 text-blue-500 shrink-0" />}
                          </div>
                          <span className="text-[10px] text-slate-450">{c.views.toLocaleString()} views</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 8. Industry Company Rankings Grid */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-850 rounded-2xl overflow-hidden shadow-xs space-y-4 p-5">
              <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                  Industry Company Rankings
                </h3>
                <button onClick={() => setShowRankingInfo(true)} className="text-[9px] text-blue-500 font-bold hover:underline flex items-center gap-1">
                  <HelpCircle className="h-3.5 w-3.5" /> How Rankings Work
                </button>
              </div>

              {/* Table listings */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-800 text-[10px] font-bold text-gray-400 uppercase">
                      <th className="py-2.5">Rank</th>
                      <th>Company</th>
                      <th>Industry</th>
                      <th>Country</th>
                      <th className="text-center">Views</th>
                      <th className="text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-850">
                    {SECTOR_COMPANIES.sort((a, b) => b.views - a.views).map((c, idx) => (
                      <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-955 transition-colors">
                        <td className="py-3 font-display font-extrabold text-gray-300">#{idx + 1}</td>
                        <td className="font-bold text-gray-900 dark:text-white">
                          <div className="flex items-center gap-1">
                            {c.name}
                            {c.isVerified && <CheckCircle className="h-3 w-3 text-blue-500" />}
                          </div>
                        </td>
                        <td>{c.industry}</td>
                        <td>{c.country}</td>
                        <td className="text-center font-semibold text-gray-500">{c.views.toLocaleString()}</td>
                        <td className="text-right">
                          <button
                            onClick={() => handleCompareSelect(c.id)}
                            className={`text-[9px] font-bold px-2.5 py-1 rounded transition-colors ${
                              comparedCos.includes(c.id)
                                ? "bg-blue-600 text-white"
                                : "border border-gray-200 dark:border-gray-700 text-gray-650 hover:bg-gray-100"
                            }`}
                          >
                            {comparedCos.includes(c.id) ? "Selected" : "Compare"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 9. Emerging Companies & watching panel */}
            <section className="space-y-4">
              <SectionTitle
                title="Emerging Companies & Watchlist"
                subtitle="Businesses gaining meaningful platform growth and recent list registrations."
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SECTOR_COMPANIES.filter((c) => !c.isVerified).map((c) => (
                  <Card key={c.id} className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[8px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded font-bold uppercase border border-emerald-100">
                        New Market Entrant
                      </span>
                      <span className="text-[9px] text-emerald-500 font-bold">{c.growth} growth</span>
                    </div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{c.name}</h4>
                    <p className="text-[10px] text-gray-500 leading-normal">{c.tagline}</p>
                    <div className="flex justify-between items-center border-t border-gray-100 dark:border-gray-850 pt-2 text-[9px] text-gray-450 mt-2">
                      <span>Industry: {c.industry}</span>
                      <button
                        onClick={() => router.push(`/${locale}/company-news/registered/pages/${c.id}`)}
                        className="text-blue-600 font-bold hover:underline"
                      >
                        View Company →
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 10. Industry Activity Snapshot */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-4">
              <SectionTitle
                title="Industry Activity Snapshot"
                subtitle="Current cumulative counts based on active directory profiles."
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="bg-slate-50 dark:bg-gray-955 p-3.5 rounded-xl border border-gray-150">
                  <span className="text-xl block">🏢</span>
                  <span className="text-base font-extrabold text-gray-900 dark:text-white block mt-1">1,624</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">Total Companies</span>
                </div>
                <div className="bg-slate-50 dark:bg-gray-955 p-3.5 rounded-xl border border-gray-150">
                  <span className="text-xl block">📄</span>
                  <span className="text-base font-extrabold text-gray-900 dark:text-white block mt-1">12,680</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">News Stories</span>
                </div>
                <div className="bg-slate-50 dark:bg-gray-955 p-3.5 rounded-xl border border-gray-150">
                  <span className="text-xl block">🚀</span>
                  <span className="text-base font-extrabold text-gray-900 dark:text-white block mt-1">420</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">Product Launches</span>
                </div>
                <div className="bg-slate-50 dark:bg-gray-955 p-3.5 rounded-xl border border-gray-150">
                  <span className="text-xl block">🤝</span>
                  <span className="text-base font-extrabold text-gray-900 dark:text-white block mt-1">186</span>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider block">Partnerships</span>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column (Sidebar watchlist alerts & intelligence conversions) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* 11. B2B Sourcing Products Search */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                Find Companies by Product
              </h4>
              <div className="space-y-2">
                {[
                  { name: "Solar Farms & Wind Power", count: 34 },
                  { name: "GPS Telemetry Tracking Sensors", count: 28 },
                  { name: "Galvanized Steel & Flat Sheets", count: 22 },
                  { name: "Generic Respiratory Inhalers", count: 18 },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 rounded bg-gray-50 dark:bg-gray-955 text-[10px]">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{item.name}</span>
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold">{item.count} firms</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 12. Business Ecosystem segmentations */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                Industry Ecosystem
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[9px] font-bold text-center">
                <button className="p-2 border border-gray-150 hover:border-blue-400 rounded-lg">Manufacturers</button>
                <button className="p-2 border border-gray-150 hover:border-blue-400 rounded-lg">Suppliers</button>
                <button className="p-2 border border-gray-150 hover:border-blue-400 rounded-lg">Exporters</button>
                <button className="p-2 border border-gray-150 hover:border-blue-400 rounded-lg">Distributors</button>
              </div>
            </section>

            {/* 13. Industry Leaders segment (top enterprise list) */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                Industry Leaders
              </h4>
              <div className="space-y-2">
                {SECTOR_COMPANIES.filter((c) => c.isVerified).map((c) => (
                  <div key={c.id} className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-700 dark:text-gray-300">{c.name}</span>
                    <Badge color="amber">✓ Leader</Badge>
                  </div>
                ))}
              </div>
            </section>

            {/* 14. Watchlist quick toggle */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">
                My Followed Companies
              </h4>
              <div className="space-y-2">
                {SECTOR_COMPANIES.map((c) => (
                  <div key={c.id} className="flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-gray-655 dark:text-gray-300">{c.name}</span>
                    <button
                      onClick={() => toggleFollowCompany(c.id)}
                      className={`text-[8px] font-bold px-2 py-0.5 rounded ${
                        followedCompanies.includes(c.id) ? "bg-emerald-50 text-emerald-650" : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {followedCompanies.includes(c.id) ? "Following" : "Follow"}
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* 15. Compare Companies Panel (Fixed Comparison details) */}
        {comparedCos.length > 0 && (
          <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-850 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Compare Selected Companies ({comparedCos.length}/4)
              </h3>
              <button
                onClick={() => setComparedCos([])}
                className="text-[10px] text-gray-500 font-bold hover:underline"
              >
                Clear Selection
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              {comparedCos.map((coId) => {
                const co = SECTOR_COMPANIES.find((c) => c.id === coId);
                if (!co) return null;
                return (
                  <div key={co.id} className="border border-gray-150 p-4 rounded-xl bg-slate-50/50 dark:bg-gray-955 space-y-3">
                    <div className="space-y-1">
                      <h4 className="font-bold text-gray-950 dark:text-white">{co.name}</h4>
                      <p className="text-[9px] text-gray-400">{co.industry}</p>
                    </div>
                    <div className="space-y-1 text-[10px] text-gray-550 dark:text-gray-400 font-medium">
                      <p><strong>Country:</strong> {co.country}</p>
                      <p><strong>Founded:</strong> {co.founded}</p>
                      <p><strong>Employees:</strong> {co.employees}</p>
                      <p><strong>Views:</strong> {co.views.toLocaleString()}</p>
                    </div>
                    <button
                      onClick={() => handleCompareSelect(co.id)}
                      className="text-[9px] text-rose-500 font-bold hover:underline block pt-1.5"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 16. Industry Alerts Form Builder */}
        <section id="alerts-section" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle
            title="Create Industry Alert"
            subtitle="Subscribe to notification digests for new company listings and product launches."
          />
          <form onSubmit={submitAlert} className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1 space-y-1 w-full">
              <label className="text-[8px] font-bold text-gray-400 uppercase">Selected Industry</label>
              <select
                value={alertConfig.industryId}
                onChange={(e) => setAlertConfig({ ...alertConfig, industryId: e.target.value })}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-xs outline-none focus:border-blue-500"
              >
                <option value="all">All Industries</option>
                {INDUSTRIES_TAXONOMY.map((ind) => (
                  <option key={ind.id} value={ind.id}>{ind.name}</option>
                ))}
              </select>
            </div>
            <div className="w-full sm:w-44 space-y-1">
              <label className="text-[8px] font-bold text-gray-400 uppercase">Alert Frequency</label>
              <select
                value={alertConfig.frequency}
                onChange={(e) => setAlertConfig({ ...alertConfig, frequency: e.target.value })}
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 text-xs outline-none"
              >
                <option value="daily">Daily digest</option>
                <option value="weekly">Weekly digest</option>
                <option value="instant">Instant updates</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-blue-650 hover:bg-blue-750 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors w-full sm:w-auto h-10 flex items-center justify-center whitespace-nowrap"
            >
              Create Alert
            </button>
          </form>
          {alertSuccess && (
            <p className="text-[9px] text-emerald-500 font-bold animate-fadeIn">
              ✓ Industry alert successfully registered! You will receive notification digests in your inbox.
            </p>
          )}
        </section>

        {/* 17. Industry Intelligence Cross-Sell */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-8 rounded-3xl shadow-sm text-center space-y-4">
          <Shield className="h-8 w-8 text-indigo-500 mx-auto" />
          <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">Want Deeper Industry Intelligence?</h3>
          <p className="text-gray-550 dark:text-slate-400 text-xs font-normal max-w-md mx-auto leading-relaxed">
            Explore market research reports, sector forecasts, supply chain risk indicators, and premium intelligence for this industry.
          </p>
          <Link href="/en/news-poc/company-news/top/sector" className="bg-gradient-to-r from-blue-650 to-indigo-650 text-white font-bold text-xs px-8 py-3.5 rounded-xl inline-block transition-transform hover:-translate-y-0.5">
            Explore Industry Intelligence →
          </Link>
        </section>

        {/* 18. Featured & Sponsored Companies (paid placement showcase) */}
        <section className="space-y-4">
          <SectionTitle
            title="Featured Companies"
            subtitle="Leading verified suppliers with paid editorial placements."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SECTOR_COMPANIES.filter((c) => c.isFeatured).map((c) => (
              <Card key={c.id} className="p-5 flex flex-col justify-between border-l-4 border-amber-400 bg-amber-50/5">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="bg-amber-100 text-amber-800 text-[8px] font-bold px-2 py-0.5 rounded border border-amber-200">
                      SPONSORED PLACEMENT
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold">{c.featuredText}</span>
                  </div>
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1.5">
                    {c.name}
                    {c.isVerified && <CheckCircle className="h-3 w-3 text-blue-500" />}
                  </h4>
                  <p className="text-[10px] text-gray-500 leading-normal">{c.tagline}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <button
                    onClick={() => router.push(`/${locale}/company-news/${c.isVerified ? "verified" : "registered"}/pages/${c.id}`)}
                    className="bg-blue-600 text-white text-[9px] font-bold px-4 py-1.5 rounded-lg"
                  >
                    View Company
                  </button>
                  <button
                    onClick={() => handleCompareSelect(c.id)}
                    className="border border-gray-200 dark:border-gray-700 text-gray-650 text-[9px] font-bold px-4 py-1.5 rounded-lg"
                  >
                    Compare
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 19. Register Your Business CTA */}
        <section className="bg-gradient-to-br from-indigo-950 via-[#181131] to-[#34165d] text-white rounded-3xl p-8 border border-purple-900/60 flex flex-col md:flex-row justify-between items-center gap-6 shadow-md">
          <div className="space-y-2">
            <span className="bg-purple-500/20 text-purple-300 text-[8px] font-bold px-2 py-0.5 rounded border border-purple-400/20 uppercase tracking-widest">
              Business Directory Onboarding
            </span>
            <h3 className="font-display font-black text-lg md:text-xl">Get Your Company Discovered</h3>
            <p className="text-[10px] md:text-xs text-purple-200 max-w-lg leading-relaxed font-normal">
              List your business on iGEN and connect with professionals, buyers, and industry audiences to generate B2B leads.
            </p>
          </div>
          <Link href="/eoi" className="bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs px-6 py-3.5 rounded-xl transition-transform hover:-translate-y-0.5 whitespace-nowrap">
            Register Your Business →
          </Link>
        </section>

      </div>

      {/* Rankings Info Modal */}
      {showRankingInfo && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <Card className="max-w-md w-full p-6 space-y-4 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-850 pb-2">
              <h3 className="font-bold text-sm text-gray-900 dark:text-white">How Rankings Work</h3>
              <button
                onClick={() => setShowRankingInfo(false)}
                className="text-gray-400 hover:text-gray-650 font-bold"
              >
                ✕
              </button>
            </div>
            <div className="text-xs text-gray-650 dark:text-gray-400 space-y-2 leading-relaxed font-normal">
              <p>Rankings are computed dynamically based on the following cumulative signals:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Search & Impressions:</strong> Weekly unique searches and organic profile view counts.</li>
                <li><strong>Watchlist Follows:</strong> The number of procurement professionals tracking the entity.</li>
                <li><strong>Announcement Velocity:</strong> Document publication volume and verified lead response rates.</li>
              </ul>
              <p className="text-[10px] text-amber-500 font-semibold mt-2">
                ⚠️ Sponsored placements do NOT affect organic ranking positions.
              </p>
            </div>
            <button
              onClick={() => setShowRankingInfo(false)}
              className="w-full bg-gray-150 hover:bg-gray-200 text-gray-800 font-bold text-xs py-2.5 rounded-lg"
            >
              Close Methodology Drawer
            </button>
          </Card>
        </div>
      )}

    </div>
  );
}

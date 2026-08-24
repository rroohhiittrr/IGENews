"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import {
  Building2, CheckCircle, Crown, Search, TrendingUp, ChevronRight, ArrowRight,
  Star, Globe, Briefcase, MapPin, Users, Mail, Phone, Calendar, FileText,
  Sparkles, Filter, Plus, ExternalLink, HelpCircle, Check, Activity, Trophy,
  AlertTriangle, RefreshCw, Handshake, Rocket, Target, Flame, ArrowUpRight,
  Eye, BarChart2, Award, Bell, Send, Layers,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Sector {
  id: string;
  name: string;
  icon: string;
  count: number;
  countries: number;
  topCompany: string;
  activity: string;
  trending?: boolean;
  newsStories?: number;
  newCompanies?: number;
}
interface SectorCompany {
  id: string;
  name: string;
  logo: string;
  industry: string;
  industryId: string;
  country: string;
  countryCode: string;
  tier: "registered" | "verified" | "top";
  rank: number;
  prevRank: number;
  movement: "up" | "down" | "same" | "new";
  followerCount: number;
  viewCount30d: number;
  newsCount30d: number;
  activityScore: number;
  products: string[];
  tagline: string;
  isSponsored?: boolean;
}
interface SectorNews {
  id: string;
  company: string;
  headline: string;
  category: string;
  date: string;
  country: string;
  summary: string;
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
    slate: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700",
  };
  return (
    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${map[color] ?? map.amber}`}>
      {children}
    </span>
  );
}
function formatRankMovement(move: SectorCompany["movement"]) {
  if (move === "up") return <span className="text-emerald-500 font-bold" title="Rising">▲2</span>;
  if (move === "down") return <span className="text-rose-500 font-bold" title="Falling">▼1</span>;
  if (move === "new") return <span className="text-blue-500 font-extrabold text-[8px] bg-blue-100 px-1 rounded">NEW</span>;
  return <span className="text-gray-400 font-bold" title="Stable">→</span>;
}

// ─── Sample dataset (representative platform content) ────────────────────────
const SECTORS: Sector[] = [
  { id: "it-technology", name: "IT & Technology", icon: "💻", count: 312, countries: 74, topCompany: "Reliance Industries", activity: "High", trending: true, newsStories: 1250, newCompanies: 320 },
  { id: "renewable-energy", name: "Renewable Energy", icon: "⚡", count: 174, countries: 52, topCompany: "Adani Green Energy", activity: "Very High", trending: true, newsStories: 880, newCompanies: 210 },
  { id: "automotive-ev", name: "Automotive & EV", icon: "🚗", count: 218, countries: 61, topCompany: "Tesla Inc.", activity: "High", trending: true, newsStories: 940, newCompanies: 180 },
  { id: "pharmaceuticals", name: "Pharmaceuticals", icon: "💊", count: 195, countries: 48, topCompany: "Cipla Ltd.", activity: "Medium", trending: false, newsStories: 610, newCompanies: 95 },
  { id: "steel-metallurgy", name: "Steel & Metallurgy", icon: "⚙️", count: 142, countries: 39, topCompany: "Tata Steel", activity: "Medium", trending: false, newsStories: 430, newCompanies: 60 },
  { id: "construction-engineering", name: "Construction & Engineering", icon: "🏗️", count: 188, countries: 57, topCompany: "Larsen & Toubro", activity: "High", trending: true, newsStories: 720, newCompanies: 140 },
  { id: "healthcare", name: "Healthcare", icon: "🏥", count: 210, countries: 63, topCompany: "BioNTech SE", activity: "Medium", trending: false, newsStories: 540, newCompanies: 110 },
  { id: "manufacturing-equipment", name: "Manufacturing & Equipment", icon: "🏭", count: 165, countries: 44, topCompany: "Siemens Industrial", activity: "Medium", trending: false, newsStories: 390, newCompanies: 70 },
];

const COMPANIES: SectorCompany[] = [
  { id: "co-5", name: "Reliance Industries Ltd.", logo: "RI", industry: "IT & Technology", industryId: "it-technology", country: "India", countryCode: "IN", tier: "top", rank: 1, prevRank: 2, movement: "up", followerCount: 45000, viewCount30d: 95000, newsCount30d: 32, activityScore: 98, products: ["Jio 5G Network", "Retail POS", "Polymers"], tagline: "Diverse conglomerate spanning energy, retail, telecom and technology." },
  { id: "co-14", name: "G42 AI Group", logo: "G4", industry: "IT & Technology", industryId: "it-technology", country: "United Arab Emirates", countryCode: "AE", tier: "top", rank: 2, prevRank: 3, movement: "up", followerCount: 13900, viewCount30d: 28400, newsCount30d: 12, activityScore: 88, products: ["Jais LLM", "Cloud Compute", "Sovereign Storage"], tagline: "National AI compute orchestrators and cloud infrastructure provider." },
  { id: "co-6", name: "Infosys BPM Ltd.", logo: "IB", industry: "IT & Technology", industryId: "it-technology", country: "India", countryCode: "IN", tier: "top", rank: 3, prevRank: 3, movement: "same", followerCount: 14800, viewCount30d: 29500, newsCount30d: 14, activityScore: 80, products: ["CX Outsourcing", "RPA Automation", "FS Shared Svcs"], tagline: "Outsourcing business processing operations and digital CRM workflows." },
  { id: "co-3", name: "Adani Green Energy Ltd.", logo: "AG", industry: "Renewable Energy", industryId: "renewable-energy", country: "India", countryCode: "IN", tier: "top", rank: 1, prevRank: 1, movement: "same", followerCount: 18200, viewCount30d: 38200, newsCount30d: 18, activityScore: 92, products: ["Solar PV", "Wind Farms", "Hybrid Storage"], tagline: "Powering India's clean energy grid transition at gigawatt scale.", isSponsored: true },
  { id: "co-11", name: "Tesla Inc.", logo: "TL", industry: "Automotive & EV", industryId: "automotive-ev", country: "United States", countryCode: "US", tier: "top", rank: 1, prevRank: 2, movement: "up", followerCount: 98000, viewCount30d: 145000, newsCount30d: 48, activityScore: 97, products: ["Model 3/Y", "Megapack", "FSD"], tagline: "Sustainable energy ecosystem and autonomous EV maker." },
  { id: "co-1", name: "Tata Steel Ltd.", logo: "TS", industry: "Steel & Metallurgy", industryId: "steel-metallurgy", country: "India", countryCode: "IN", tier: "top", rank: 1, prevRank: 3, movement: "up", followerCount: 24500, viewCount30d: 48000, newsCount30d: 22, activityScore: 95, products: ["Hot Rolled Coils", "Rebars", "Wire"], tagline: "Building green metallurgical capabilities and infrastructure." },
  { id: "co-10", name: "Larsen & Toubro Ltd.", logo: "LT", industry: "Construction & Engineering", industryId: "construction-engineering", country: "India", countryCode: "IN", tier: "top", rank: 1, prevRank: 1, movement: "same", followerCount: 31000, viewCount30d: 68000, newsCount30d: 19, activityScore: 90, products: ["Monorail Tracks", "Hydrogen Electrolizers", "Offshore Platforms"], tagline: "Heavy engineering, megaproject procurement and infrastructure construction." },
  { id: "co-4", name: "Cipla Pharmaceuticals Ltd.", logo: "CP", industry: "Pharmaceuticals", industryId: "pharmaceuticals", country: "India", countryCode: "IN", tier: "verified", rank: 2, prevRank: 4, movement: "up", followerCount: 11200, viewCount30d: 21000, newsCount30d: 9, activityScore: 84, products: ["Asthma Inhalers", "APIs", "Cardiovascular"], tagline: "Global generic drugs manufacturer and diagnostics developer." },
  { id: "co-13", name: "BioNTech SE", logo: "BN", industry: "Healthcare", industryId: "healthcare", country: "Germany", countryCode: "DE", tier: "verified", rank: 1, prevRank: 2, movement: "up", followerCount: 12500, viewCount30d: 26000, newsCount30d: 11, activityScore: 78, products: ["mRNA Vaccines", "CAR-T", "PCR assays"], tagline: "Next-generation mRNA therapeutics and personalized oncology." },
  { id: "co-12", name: "Siemens Industrial AG", logo: "SI", industry: "Manufacturing & Equipment", industryId: "manufacturing-equipment", country: "Germany", countryCode: "DE", tier: "verified", rank: 1, prevRank: 1, movement: "same", followerCount: 21000, viewCount30d: 42000, newsCount30d: 15, activityScore: 82, products: ["CNC Automation", "Gas Turbines", "Digital Twin"], tagline: "Smart industrial infrastructure and manufacturing telemetry." },
];

const SECTOR_NEWS: SectorNews[] = [
  { id: "sn1", company: "Reliance Industries", headline: "Reliance Jio expands AI Cloud computing trials for enterprise partners", category: "Product Launch", date: "2 hrs ago", country: "India", summary: "Jio's sovereign AI Cloud stack opens to 500+ enterprise partners." },
  { id: "sn2", company: "Adani Green Energy", headline: "Adani Green commissions world's largest renewable energy park", category: "Announcement", date: "30m ago", country: "India", summary: "A 30 GW integrated renewable cluster advances India's clean export goals." },
  { id: "sn3", company: "Tesla Inc.", headline: "Tesla proposes major EV assembly gigafactory layout for India", category: "Expansion", date: "4 hrs ago", country: "United States", summary: "Tesla outlines a phased India manufacturing roadmap with local suppliers." },
  { id: "sn4", company: "Larsen & Toubro", headline: "L&T wins greenfield hydrogen terminal pipeline contract in UAE", category: "Partnership", date: "6 hrs ago", country: "India", summary: "A $1.2B EPC award strengthens L&T's clean-energy footprint in the Gulf." },
  { id: "sn5", company: "Cipla", headline: "Cipla secures FDA approval for new respiratory formulation", category: "Certification", date: "2 days ago", country: "India", summary: "Approval expands Cipla's US respiratory franchise." },
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

const COUNTRIES_LIST = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
];

const PRODUCTS_BY_SECTOR: Record<string, string[]> = {
  "it-technology": ["AI Solutions", "Cloud Services", "Cybersecurity", "Enterprise Software", "IT Consulting"],
  "renewable-energy": ["Solar PV", "Wind Turbines", "Energy Storage", "Green Hydrogen", "Grid Software"],
  "automotive-ev": ["EV Platforms", "Battery Systems", "Charging Networks", "Autonomous Driving", "Mobility Apps"],
  "pharmaceuticals": ["Generic Drugs", "APIs", "Vaccines", "Diagnostics", "Therapeutics"],
  "steel-metallurgy": ["Rebars", "Hot Rolled Coils", "Forgings", "Tubes", "Alloys"],
  "construction-engineering": ["EPC Services", "Electrolizers", "Rail Systems", "Offshore Platforms", "Smart Grid"],
  "healthcare": ["Hospitals", "Medical Devices", "Telemedicine", "Diagnostics", "Health AI"],
  "manufacturing-equipment": ["CNC Machines", "Turbines", "Robotics", "Industrial IoT", "Digital Twin"],
};

// ─── Skeleton Loaders ────────────────────────────────────────────────────────
function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className}`} />;
}
function CardSkeleton() {
  return (<Card className="p-5 space-y-3"><div className="flex items-center gap-3"><SkeletonLine className="h-10 w-10 rounded-xl" /><div className="flex-1 space-y-1.5"><SkeletonLine className="h-3 w-32" /><SkeletonLine className="h-2.5 w-20" /></div></div><SkeletonLine className="h-2.5 w-full" /><SkeletonLine className="h-2.5 w-3/4" /></Card>);
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function TopCompanyBySectorView() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';
  const initialSector = searchParams.get('sector');
  const SECTORS_SAFE = SECTORS;
  const startSector = (initialSector && SECTORS_SAFE.find((s) => s.id === initialSector)) ? initialSector : SECTORS_SAFE[0].id;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string>(startSector);
  const [searchQuery, setSearchQuery] = useState("");

  const [rankingCategory, setRankingCategory] = useState<"overall" | "active" | "viewed" | "followed" | "rising" | "news">("overall");
  const [rankingScope, setRankingScope] = useState<"global" | "country" | "region">("global");
  const [showMethodology, setShowMethodology] = useState(false);

  const [comparedCompanyIds, setComparedCompanyIds] = useState<string[]>(["co-5", "co-14"]);
  const [comparedSectorIds, setComparedSectorIds] = useState<string[]>(["it-technology", "renewable-energy"]);
  const [countrySectorCode, setCountrySectorCode] = useState("IN");

  const [followedSector, setFollowedSector] = useState(false);
  const [followedCompanies, setFollowedCompanies] = useState<string[]>(["co-3", "co-11"]);
  const [alertsConfig, setAlertsConfig] = useState({ newCompanies: true, news: false, launches: false, partnerships: false, investments: false, ma: false, expansion: false });
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [enquiryCompany, setEnquiryCompany] = useState<SectorCompany | null>(null);
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  const loadData = () => { try { setError(false); setLoading(false); } catch { setError(true); setLoading(false); } };

  const sector = SECTORS.find((s) => s.id === selectedSector) ?? SECTORS[0];
  const sectorCompanies = COMPANIES.filter((c) => c.industryId === selectedSector);
  const profileHref = (c: SectorCompany) => `/${locale}/company-news/${c.tier}/pages/${c.id}`;

  const filteredCompanies = sectorCompanies.filter((c) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.tagline.toLowerCase().includes(q) || c.products.some((p) => p.toLowerCase().includes(q));
  });

  const rankedCompanies = [...filteredCompanies].sort((a, b) => {
    if (rankingCategory === "active") return b.activityScore - a.activityScore;
    if (rankingCategory === "viewed") return b.viewCount30d - a.viewCount30d;
    if (rankingCategory === "followed") return b.followerCount - a.followerCount;
    if (rankingCategory === "news") return b.newsCount30d - a.newsCount30d;
    if (rankingCategory === "rising") return (a.movement === "up" || a.movement === "new" ? -1 : 1);
    return a.rank - b.rank;
  });

  const toggleFollowCompany = (id: string) => setFollowedCompanies(followedCompanies.includes(id) ? followedCompanies.filter((i) => i !== id) : [...followedCompanies, id]);
  const handleCompareCompany = (id: string) => {
    if (comparedCompanyIds.includes(id)) setComparedCompanyIds(comparedCompanyIds.filter((i) => i !== id));
    else if (comparedCompanyIds.length >= 4) alert("You can compare a maximum of 4 companies.");
    else setComparedCompanyIds([...comparedCompanyIds, id]);
  };
  const toggleCompareSector = (id: string) => {
    if (comparedSectorIds.includes(id)) setComparedSectorIds(comparedSectorIds.filter((i) => i !== id));
    else if (comparedSectorIds.length >= 4) alert("You can compare a maximum of 4 sectors.");
    else setComparedSectorIds([...comparedSectorIds, id]);
  };
  const triggerEnquiry = (c: SectorCompany) => { setEnquiryCompany(c); setEnquirySuccess(false); };
  const submitEnquiry = (e: React.FormEvent) => { e.preventDefault(); setEnquirySuccess(true); setTimeout(() => { setEnquiryCompany(null); setEnquirySuccess(false); }, 2000); };
  const createAlert = () => { setAlertSuccess(true); setTimeout(() => setAlertSuccess(false), 3000); };

  // Error State
  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-10">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center space-y-4">
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">We couldn&apos;t load sector rankings.</h3>
            <button onClick={() => { setLoading(true); loadData(); }} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5" /> Retry</button>
          </div>
        </div>
      </div>
    );
  }

  // Loading State
  if (loading) {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-10 space-y-8">
          <SkeletonLine className="h-40 w-full rounded-3xl" />
          <div className="grid grid-cols-12 gap-8"><div className="col-span-12 lg:col-span-8 space-y-6">{[0,1,2].map(i => <CardSkeleton key={i} />)}</div><div className="col-span-12 lg:col-span-4 space-y-4">{[0,1,2].map(i => <CardSkeleton key={i} />)}</div></div>
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
          <span className="text-amber-600">By Sector</span>
        </nav>

        {/* 2. Hero */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-[#b45309] text-white p-6 md:p-10 border border-amber-400/40 shadow-md">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
          <div className="relative z-10 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8 space-y-4">
              <span className="bg-white/20 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20 inline-block">Sector Intelligence Hub</span>
              <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-none">Top Companies by Sector</h1>
              <p className="text-xs md:text-sm text-white/85 max-w-lg leading-relaxed">Discover leading companies, sector rankings, emerging businesses and market activity across global industries.</p>
              <div className="relative max-w-md w-full bg-white/15 backdrop-blur-md rounded-xl border border-white/25 p-1.5 flex items-center gap-2 mt-2">
                <Search className="h-4 w-4 text-white/70 ml-2 shrink-0" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search sector, industry or company..." className="flex-1 bg-transparent border-0 outline-none text-xs text-white placeholder-white/70 py-1" />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="text-[10px] text-white/70 hover:text-white px-2">Clear</button>}
              </div>
              <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-bold">
                <a href="#sector-context" className="bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg border border-white/15 transition-colors">Explore Sectors</a>
                <a href="#compare-section" className="bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg border border-white/15 transition-colors">Compare Companies</a>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1 text-[9px] font-semibold">
                {SECTORS.slice(0, 8).map((s) => (
                  <button key={s.id} onClick={() => setSelectedSector(s.id)} className={`px-2 py-1 rounded-full ${selectedSector === s.id ? "bg-white text-gray-950" : "bg-black/15 hover:bg-black/25 text-white/90"}`}>{s.name}</button>
                ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <Link href="/eoi" className="w-full md:w-auto bg-white text-gray-950 font-bold text-xs px-6 py-3.5 rounded-xl hover:shadow-lg transition-transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-1.5"><Plus className="h-4 w-4" /> List Your Company</Link>
            </div>
          </div>
        </section>

        {/* 5. Selected Sector Context */}
        <section id="sector-context" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{sector.icon}</span>
              <div>
                <h2 className="font-display text-xl font-black text-gray-900 dark:text-white">{sector.name}</h2>
                <p className="text-[10px] text-gray-500">Top Companies · Sector Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-4 text-center">
                <div><div className="font-display font-extrabold text-lg text-amber-600">{sector.count.toLocaleString()}</div><div className="text-[8px] uppercase tracking-widest text-gray-400">Companies</div></div>
                <div><div className="font-display font-extrabold text-lg text-amber-600">{sector.countries}</div><div className="text-[8px] uppercase tracking-widest text-gray-400">Countries</div></div>
                <div><div className="font-display font-extrabold text-lg text-amber-600">{sector.activity}</div><div className="text-[8px] uppercase tracking-widest text-gray-400">Activity</div></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setFollowedSector(!followedSector)} className={`text-[10px] font-bold px-3 py-2 rounded-lg ${followedSector ? "bg-emerald-500 text-white" : "border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100"}`}>{followedSector ? "Following Sector" : "Follow Sector"}</button>
                <button onClick={createAlert} className="text-[10px] font-bold px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950">Create Alert</button>
              </div>
            </div>
          </div>
          {followedSector && <p className="text-[9px] text-emerald-600 font-semibold mt-2">✓ Get updates about companies, news, products and developments in {sector.name}.</p>}
        </section>

        {/* 6. Sector Explorer */}
        <section className="space-y-3">
          <SectionTitle title="Explore Companies by Sector" subtitle="Select a sector to view its leading companies and intelligence." />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SECTORS.map((s) => (
              <button key={s.id} onClick={() => setSelectedSector(s.id)} className={`text-left p-4 rounded-2xl border transition-all ${selectedSector === s.id ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white border-transparent shadow-md" : "bg-white dark:bg-[#0f172a] border-gray-200 dark:border-gray-800 hover:border-amber-400"}`}>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{s.icon}</span>
                  {s.trending && <Flame className="h-4 w-4 text-orange-500" />}
                </div>
                <h4 className={`font-bold text-[11px] mt-2 ${selectedSector === s.id ? "text-white" : "text-gray-900 dark:text-white"}`}>{s.name}</h4>
                <p className={`text-[9px] ${selectedSector === s.id ? "text-white/85" : "text-gray-500"}`}>{s.count.toLocaleString()} companies</p>
                <p className={`text-[8px] ${selectedSector === s.id ? "text-white/70" : "text-gray-400"}`}>Top: {s.topCompany}</p>
                <span className={`text-[8px] font-bold mt-1 inline-block ${selectedSector === s.id ? "text-white/90" : "text-amber-600"}`}>{s.activity} Activity</span>
              </button>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {/* 7. Top Companies by Sector */}
            <section className="space-y-3">
              <SectionTitle title={`Top Companies in ${sector.name}`} subtitle="Multi-company discovery list within the selected sector." />
              {rankedCompanies.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-gray-855 p-6 space-y-3"><Building2 className="h-8 w-8 text-gray-300 mx-auto" /><h4 className="text-xs font-bold text-gray-600 dark:text-gray-400">No companies are currently available in this sector.</h4><button onClick={() => setSelectedSector(SECTORS[0].id)} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-[10px] px-4 py-1.5 rounded-lg">Explore Other Sectors</button></div>
              ) : (
                <Card className="overflow-hidden">
                  {filteredCompanies.length === 0 ? (
                    <div className="text-center py-10 text-xs text-gray-500">No companies match your search in this sector.</div>
                  ) : (
                    <table className="w-full text-[10px] text-left border-collapse">
                      <thead><tr className="bg-gray-50 dark:bg-gray-900/50 text-[8px] font-extrabold uppercase tracking-wider text-gray-550 border-b border-gray-200 dark:border-gray-800"><th className="px-4 py-2.5 w-12">Rank</th><th className="px-4 py-2.5">Company</th><th className="px-4 py-2.5">Country</th><th className="px-4 py-2.5 text-center">Movement</th><th className="px-4 py-2.5 text-right">Action</th></tr></thead>
                      <tbody className="divide-y divide-gray-150 dark:divide-gray-855">
                        {rankedCompanies.slice(0, 10).map((c) => (
                          <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                            <td className="px-4 py-3 font-bold text-gray-900 dark:text-white">#{c.rank}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className={`h-7 w-7 rounded-lg ${c.tier === "top" ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white" : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300"} flex items-center justify-center font-bold text-[10px]`}>{c.logo}</div>
                                <div><Link href={profileHref(c)} className="font-semibold text-gray-900 dark:text-white hover:text-amber-600 flex items-center gap-1">{c.name}{c.tier === "top" && <Crown className="h-3 w-3 text-amber-500" />}</Link><span className="text-[8px] text-gray-400">{c.industry}</span></div>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-500">{c.country}</td>
                            <td className="px-4 py-3 text-center">{formatRankMovement(c.movement)}</td>
                            <td className="px-4 py-3 text-right">
                              <div className="flex justify-end gap-1">
                                <button onClick={() => toggleFollowCompany(c.id)} className={`text-[8px] font-bold px-2 py-1 rounded ${followedCompanies.includes(c.id) ? "bg-emerald-500 text-white" : "border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100"}`}>{followedCompanies.includes(c.id) ? "Following" : "Follow"}</button>
                                <button onClick={() => handleCompareCompany(c.id)} className={`text-[8px] font-bold px-2 py-1 rounded border ${comparedCompanyIds.includes(c.id) ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 border-transparent" : "border-gray-250 text-gray-600 dark:border-gray-700 hover:bg-gray-100"}`}>Compare</button>
                                <Link href={profileHref(c)} className="text-[8px] font-bold text-amber-600 hover:underline px-1 py-1">View</Link>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </Card>
              )}
              <div className="text-right"><Link href={`/en/news-poc/company-news/top/all?sector=${sector.id}`} className="text-[10px] text-amber-600 font-bold hover:underline">View Full Ranking →</Link></div>
            </section>

            {/* 3. Sector Company Rankings */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
              <SectionTitle title="Company Rankings" action={
                <div className="flex gap-1">
                  {([{ label: "Global", val: "global" }, { label: "Country", val: "country" }, { label: "Region", val: "region" }] as const).map((s) => (
                    <button key={s.val} onClick={() => setRankingScope(s.val)} className={`px-2.5 py-1 text-[9px] font-bold rounded ${rankingScope === s.val ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>{s.label}</button>
                  ))}
                </div>
              } />
              <div className="flex flex-wrap gap-1">
                {([{ label: "Overall", val: "overall" }, { label: "Most Active", val: "active" }, { label: "Most Viewed", val: "viewed" }, { label: "Most Followed", val: "followed" }, { label: "Fastest Rising", val: "rising" }, { label: "Most News Activity", val: "news" }] as const).map((c) => (
                  <button key={c.val} onClick={() => setRankingCategory(c.val)} className={`px-2.5 py-1 text-[9px] font-bold rounded ${rankingCategory === c.val ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>{c.label}</button>
                ))}
              </div>
              {rankedCompanies.slice(0, 6).map((c) => (
                <div key={c.id} className="flex items-center gap-3 py-2 border-b border-gray-50 dark:border-gray-855 last:border-0">
                  <span className="font-display font-extrabold text-sm text-amber-600 w-8">#{c.rank}</span>
                  <div className={`h-7 w-7 rounded-lg ${c.tier === "top" ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white" : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300"} flex items-center justify-center font-bold text-[9px]`}>{c.logo}</div>
                  <div className="flex-1 min-w-0"><Link href={profileHref(c)} className="font-bold text-[10px] text-gray-900 dark:text-white hover:text-amber-600 block truncate">{c.name}</Link><span className="text-[8px] text-gray-400">{c.industry} · {c.country}</span></div>
                  <span className="text-[10px] font-bold">{formatRankMovement(c.movement)}</span>
                  <Link href={profileHref(c)} className="text-[9px] font-bold text-amber-600 hover:underline">View →</Link>
                </div>
              ))}
              <div className="flex justify-between items-center text-[10px] text-gray-550 font-semibold pt-1">
                <button onClick={() => setShowMethodology(!showMethodology)} className="text-amber-600 hover:underline flex items-center gap-0.5"><HelpCircle className="h-3 w-3 text-amber-500" /> How Rankings Work</button>
              </div>
              {showMethodology && (
                <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/30 p-4 rounded-xl space-y-2 animate-fadeIn text-[10px] text-gray-600 dark:text-gray-400">
                  <h4 className="font-bold text-gray-900 dark:text-white">Ranking Methodology Transparency</h4>
                  <p className="leading-relaxed">Organic rankings are calculated using real-time platform signals: aggregate profile views, news click-through rates and follower growth.</p>
                  <ul className="list-disc pl-4 space-y-1"><li><strong>Platform Engagement (40%):</strong> Unique views and interaction.</li><li><strong>Verified Status (30%):</strong> Trust credentials.</li><li><strong>Activity Score (30%):</strong> Editorial outputs and news frequency.</li></ul>
                  <p className="text-[9px] text-amber-600 dark:text-amber-400 font-bold">✓ Sponsored placements are labeled and do not alter organic positions.</p>
                </div>
              )}
            </section>

            {/* 9. Trending Sectors */}
            <section className="space-y-3">
              <SectionTitle title="Trending Sectors" subtitle="Sectors receiving increased platform attention." />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {SECTORS.filter((s) => s.trending).map((s) => (
                  <button key={s.id} onClick={() => setSelectedSector(s.id)} className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100 dark:border-amber-900/20 rounded-xl p-4 text-left hover:shadow-md transition-all">
                    <div className="flex items-center justify-between"><span className="text-xl">{s.icon}</span><TrendingUp className="h-4 w-4 text-emerald-500" /></div>
                    <h4 className="font-bold text-[11px] text-gray-900 dark:text-white mt-2">{s.name}</h4>
                    <p className="text-[8px] text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-0.5"><ArrowUpRight className="h-3 w-3" /> Trending</p>
                  </button>
                ))}
              </div>
            </section>

            {/* 10. Fastest-Rising Companies */}
            <section className="space-y-3">
              <SectionTitle title="Fastest-Rising Companies" subtitle={`Within ${sector.name}.`} />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sectorCompanies.filter((c) => c.movement === "up" || c.movement === "new").slice(0, 4).map((c) => (
                  <div key={c.id} className="bg-amber-50/30 dark:bg-amber-950/5 border border-amber-100 dark:border-amber-900/20 rounded-xl p-4 flex justify-between items-start gap-4">
                    <div className="space-y-1"><span className="text-[8px] bg-emerald-50 dark:bg-emerald-950 text-emerald-600 border border-emerald-200 dark:border-emerald-900 px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 w-fit">↑ Rising</span><h4 className="font-bold text-xs text-gray-900 dark:text-white pt-1">{c.name}</h4><p className="text-[9px] text-gray-500">{c.industry}</p></div>
                    <Link href={profileHref(c)} className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-amber-600 hover:scale-105 transition-transform shadow-xs shrink-0"><ArrowUpRight className="h-4 w-4" /></Link>
                  </div>
                ))}
              </div>
            </section>

            {/* 11. Companies to Watch */}
            <section className="space-y-3">
              <SectionTitle title="Companies to Watch" subtitle="Receiving notable attention from real platform signals." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sectorCompanies.filter((c) => c.tier !== "registered").slice(0, 4).map((c) => (
                  <div key={c.id} className="bg-gray-100 dark:bg-gray-900/50 rounded-xl p-4 flex justify-between items-start gap-4">
                    <div className="space-y-1"><span className="text-[8px] bg-purple-50 dark:bg-purple-950 text-purple-600 border border-purple-200 dark:border-purple-900 px-2 py-0.5 rounded font-bold uppercase tracking-wider">Watch</span><h4 className="font-bold text-xs text-gray-900 dark:text-white pt-1">{c.name}</h4><p className="text-[9px] text-gray-500">{c.tagline}</p></div>
                    <Link href={profileHref(c)} className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-amber-600 hover:scale-105 transition-transform shadow-xs shrink-0"><ArrowUpRight className="h-4 w-4" /></Link>
                  </div>
                ))}
              </div>
            </section>

            {/* 12. Emerging Companies */}
            <section className="space-y-3">
              <SectionTitle title="Emerging Companies" subtitle="Newly registered and verified businesses entering the network." />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {sectorCompanies.filter((c) => c.tier === "registered" || c.movement === "new").slice(0, 3).map((c) => (
                  <Card key={c.id} className="p-4 space-y-2 hover:shadow-md transition-all">
                    <span className="text-[8px] bg-blue-50 dark:bg-blue-950/20 text-blue-600 border border-blue-200 dark:border-blue-900 px-2 py-0.5 rounded font-bold uppercase">{c.tier === "registered" ? "Newly Registered" : "New Entry"}</span>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{c.name}</h4>
                    <p className="text-[9px] text-gray-500">{c.industry} · {c.country}</p>
                    <Link href="#" className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">View Company →</Link>
                  </Card>
                ))}
              </div>
            </section>

            {/* 14. Sector Activity */}
            <section className="space-y-4">
              <SectionTitle title={`What's Happening in ${sector.name}`} subtitle="Recent business activity across the sector." />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SECTOR_NEWS.map((n) => (
                  <Card key={n.id} className="p-4 flex items-start gap-3 hover:shadow-md transition-all">
                    <div className="h-9 w-9 rounded-xl bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 flex items-center justify-center shrink-0"><Activity className="h-4 w-4" /></div>
                    <div className="space-y-1"><div className="flex items-center gap-2 flex-wrap"><span className="font-bold text-[11px] text-gray-900 dark:text-white">{n.company}</span><Badge color="blue">{n.category}</Badge></div><p className="text-[10px] text-gray-600 dark:text-gray-400 leading-normal">{n.summary}</p><span className="text-[8px] text-gray-400">{n.date} · {n.country}</span></div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 15. Latest Sector News */}
            <section className="space-y-4">
              <SectionTitle title="Latest Sector News" subtitle="Compact preview — link to the full news experience." />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SECTOR_NEWS.slice(0, 3).map((n) => (
                  <Card key={n.id} className="p-4 space-y-3 border-t-2 border-amber-500 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between"><span className="font-bold text-[11px] text-gray-900 dark:text-white">{n.company}</span><Badge color="blue">{n.category}</Badge></div>
                    <p className="text-[10px] text-gray-650 dark:text-gray-450 leading-normal">{n.headline}</p>
                    <Link href="/en/news-poc/company-news/top/news" className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">View Sector News →</Link>
                  </Card>
                ))}
              </div>
            </section>

            {/* 16. Sector Intelligence */}
            <section className="bg-gradient-to-br from-amber-500 via-orange-600 to-[#b45309] text-white rounded-3xl p-6 md:p-8 border border-amber-400/40 space-y-4">
              <div className="flex items-center gap-2"><Layers className="h-5 w-5" /><h3 className="font-display text-lg font-black">Sector Intelligence</h3></div>
              <p className="text-[11px] text-white/85 max-w-lg leading-relaxed">Market trends, strategic developments, opportunities and risks across {sector.name}. Connect to deep industry intelligence.</p>
              <Link href="/en/news-poc/industry-intelligence" className="inline-flex items-center gap-1 text-xs font-bold bg-white text-gray-950 px-5 py-2.5 rounded-xl hover:bg-gray-100 transition-colors">Explore Industry Intelligence →</Link>
            </section>

            {/* 17. Compare Sector Leaders */}
            <section id="compare-section" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
              <SectionTitle title="Compare Sector Leaders" subtitle="Select up to 4 companies within this sector to compare." />
              {comparedCompanyIds.filter((id) => sectorCompanies.find((c) => c.id === id)).length < 2 ? (
                <div className="text-center py-8 bg-gray-55 dark:bg-gray-955 rounded-2xl border border-dashed border-gray-205 dark:border-gray-850 p-4 space-y-2"><Target className="h-6 w-6 text-gray-300 mx-auto" /><p className="text-xs text-gray-500">Please select at least 2 companies to see comparative stats.</p></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-[10px] border-collapse">
                    <thead><tr className="bg-gray-55 dark:bg-gray-900/50 border-b border-gray-205 dark:border-gray-800 text-[8px] font-extrabold uppercase tracking-wider text-gray-500"><th className="px-4 py-3 w-40">Features</th>{comparedCompanyIds.filter((id) => sectorCompanies.find((c) => c.id === id)).map((id) => { const c = sectorCompanies.find((x) => x.id === id); return (<th key={id} className="px-4 py-3"><div className="flex items-center justify-between"><span className="font-bold text-gray-900 dark:text-white block">{c?.name}</span><button onClick={() => handleCompareCompany(id)} className="text-rose-500 hover:text-rose-700 font-bold ml-2 text-[8px]">Remove</button></div></th>); })}</tr></thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                      {[{ label: "Industry", get: (c: SectorCompany) => c.industry }, { label: "Country", get: (c: SectorCompany) => `${c.country}` }, { label: "Rank", get: (c: SectorCompany) => `#${c.rank}` }, { label: "Followers", get: (c: SectorCompany) => c.followerCount.toLocaleString() }, { label: "30d Views", get: (c: SectorCompany) => c.viewCount30d.toLocaleString() }, { label: "Activity", get: (c: SectorCompany) => `${c.activityScore}` }, { label: "News Activity", get: (c: SectorCompany) => c.newsCount30d.toString() }].map((row) => (
                        <tr key={row.label}><td className="px-4 py-3 font-semibold text-gray-400 uppercase text-[8px]">{row.label}</td>{comparedCompanyIds.filter((id) => sectorCompanies.find((c) => c.id === id)).map((id) => { const c = sectorCompanies.find((x) => x.id === id); return <td key={id} className="px-4 py-3 font-bold text-gray-900 dark:text-white">{c ? row.get(c) : "—"}</td>; })}</tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* 13. Sector Statistics */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-2"><BarChart2 className="h-4 w-4 text-amber-500" /> {sector.name} at a Glance</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3"><div className="font-display font-extrabold text-lg text-amber-600">{sector.count.toLocaleString()}</div><div className="text-[8px] uppercase tracking-widest text-gray-400">Companies</div></div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3"><div className="font-display font-extrabold text-lg text-amber-600">{sector.countries}</div><div className="text-[8px] uppercase tracking-widest text-gray-400">Countries</div></div>
                {sector.newsStories != null && <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3"><div className="font-display font-extrabold text-lg text-amber-600">{sector.newsStories.toLocaleString()}</div><div className="text-[8px] uppercase tracking-widest text-gray-400">News Stories</div></div>}
                {sector.newCompanies != null && <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3"><div className="font-display font-extrabold text-lg text-amber-600">{sector.newCompanies.toLocaleString()}</div><div className="text-[8px] uppercase tracking-widest text-gray-400">New Companies</div></div>}
              </div>
            </section>

            {/* 23. Follow Sector */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Follow {sector.name}</h4>
              <button onClick={() => setFollowedSector(!followedSector)} className={`w-full text-[10px] font-bold px-4 py-2.5 rounded-lg transition-colors ${followedSector ? "bg-emerald-500 text-white" : "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950"}`}>{followedSector ? "Following Sector" : "Follow Sector"}</button>
              <p className="text-[9px] text-gray-500">Get updates about companies, news, products and developments in this sector.</p>
            </section>

            {/* 24. Sector Alerts */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-2"><Bell className="h-4 w-4 text-amber-500" /> Get Sector Alerts</h4>
              <div className="flex flex-col gap-2 text-[10px] font-bold text-gray-600 dark:text-gray-400">
                {([{ label: "New Companies", key: "newCompanies" }, { label: "Company News", key: "news" }, { label: "Product Launches", key: "launches" }, { label: "Partnerships", key: "partnerships" }, { label: "Investments", key: "investments" }, { label: "M&A", key: "ma" }, { label: "Expansion", key: "expansion" }] as const).map((opt) => (
                  <label key={opt.key} className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={alertsConfig[opt.key]} onChange={(e) => setAlertsConfig({ ...alertsConfig, [opt.key]: e.target.checked })} className="rounded text-amber-600" /> {opt.label}</label>
                ))}
              </div>
              <button onClick={createAlert} className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs px-4 py-2.5 rounded-lg">Create Alert</button>
              {alertSuccess && <p className="text-[9px] text-emerald-500 font-bold">✓ Sector alerts registered to your profile.</p>}
            </section>

          </div>
        </div>

        {/* 18. Top Products & Services */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-5">
          <SectionTitle title={`Products & Services in ${sector.name}`} subtitle="Discover solutions, then the companies that provide them." />
          <div className="flex flex-wrap gap-2">
            {(PRODUCTS_BY_SECTOR[selectedSector] ?? []).map((p) => (
              <span key={p} className="bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300 px-3 py-1.5 rounded-full text-[10px] font-semibold">{p}</span>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sectorCompanies.slice(0, 3).map((c) => (
              <Card key={c.id} className="p-4 space-y-2 hover:shadow-md transition-all">
                <div className="flex items-center gap-2"><div className={`h-7 w-7 rounded-lg ${c.tier === "top" ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white" : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300"} flex items-center justify-center font-bold text-[9px]`}>{c.logo}</div><div><h4 className="font-bold text-[11px] text-gray-900 dark:text-white">{c.name}</h4><p className="text-[8px] text-gray-400">{c.industry}</p></div></div>
                <div className="flex flex-wrap gap-1">{c.products.slice(0, 3).map((p, i) => <span key={i} className="text-[8px] bg-gray-55 dark:bg-gray-900 text-gray-600 dark:text-gray-400 px-1.5 py-0.5 rounded">{p}</span>)}</div>
                <button onClick={() => triggerEnquiry(c)} className="text-[9px] font-bold text-amber-600 hover:underline">Request Product Info →</button>
              </Card>
            ))}
          </div>
        </section>

        {/* 19. Business Type Explorer */}
        <section className="space-y-4">
          <SectionTitle title="Companies by Business Type" subtitle={`Within ${sector.name}.`} />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {BUSINESS_TYPES.map((bt) => (
              <Card key={bt.key} className="p-4 space-y-2 hover:border-amber-400 transition-all">
                <h4 className="font-bold text-[11px] text-gray-900 dark:text-white">Top {bt.label}</h4>
                <p className="text-[9px] text-gray-500 leading-normal">{bt.desc}</p>
                <Link href={`/en/news-poc/company-news/top/all?sector=${selectedSector}&type=${bt.key}`} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">Explore →</Link>
              </Card>
            ))}
          </div>
        </section>

        {/* 20. Country × Sector Explorer */}
        <section className="bg-gradient-to-br from-amber-500 via-orange-600 to-[#b45309] text-white rounded-3xl p-6 md:p-8 border border-amber-400/40 space-y-5">
          <div className="flex items-center gap-2"><Globe className="h-5 w-5" /><h3 className="font-display text-lg font-black">Explore {sector.name} by Country</h3></div>
          <p className="text-[11px] text-white/85 max-w-lg leading-relaxed">Country + Sector → Top companies in that market.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <select value={countrySectorCode} onChange={(e) => setCountrySectorCode(e.target.value)} className="bg-white/15 border border-white/25 rounded-lg px-3 py-2.5 text-xs text-white outline-none">
              {COUNTRIES_LIST.map((c) => <option key={c.code} className="text-gray-900">{c.flag} {c.name}</option>)}
            </select>
            <div className="text-xs font-bold">{countrySectorCode && COUNTRIES_LIST.find((c) => c.code === countrySectorCode)?.name} + {sector.name}</div>
            <Link href={`/en/news-poc/company-news/top/all?sector=${selectedSector}&country=${countrySectorCode}`} className="bg-white text-gray-950 font-bold text-xs px-6 py-2.5 rounded-lg text-center hover:bg-gray-100 transition-colors">Top Companies →</Link>
          </div>
        </section>

        {/* 21. Compare Sectors */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title="Compare Sectors" subtitle="Select 2–4 sectors to benchmark." />
          <div className="flex flex-wrap gap-2">
            {SECTORS.map((s) => (
              <button key={s.id} onClick={() => toggleCompareSector(s.id)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${comparedSectorIds.includes(s.id) ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>{s.icon} {s.name}</button>
            ))}
          </div>
          {comparedSectorIds.length < 2 ? (
            <div className="text-center py-8 bg-gray-55 dark:bg-gray-955 rounded-2xl border border-dashed border-gray-205 dark:border-gray-850 p-4"><p className="text-xs text-gray-500">Select at least 2 sectors to compare.</p></div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[10px] border-collapse">
                <thead><tr className="bg-gray-55 dark:bg-gray-900/50 border-b border-gray-205 dark:border-gray-800 text-[8px] font-extrabold uppercase tracking-wider text-gray-500"><th className="px-4 py-3">Metric</th>{comparedSectorIds.map((id) => { const s = SECTORS.find((x) => x.id === id); return <th key={id} className="px-4 py-3">{s?.icon} {s?.name}</th>; })}</tr></thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                  {[{ label: "Companies", get: (s: Sector) => s.count.toLocaleString() }, { label: "Countries", get: (s: Sector) => s.countries.toString() }, { label: "News Stories", get: (s: Sector) => (s.newsStories ?? 0).toLocaleString() }, { label: "New Companies", get: (s: Sector) => (s.newCompanies ?? 0).toLocaleString() }, { label: "Activity", get: (s: Sector) => s.activity }].map((row) => (
                    <tr key={row.label}><td className="px-4 py-3 font-semibold text-gray-400 uppercase text-[8px]">{row.label}</td>{comparedSectorIds.map((id) => { const s = SECTORS.find((x) => x.id === id); return <td key={id} className="px-4 py-3 font-bold text-gray-900 dark:text-white">{s ? row.get(s) : "—"}</td>; })}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <Link href="/eoi" className="text-[10px] text-amber-600 font-bold hover:underline inline-flex items-center">Advanced Sector Comparison →</Link>
        </section>

        {/* 22. Recommended Companies */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title={`Recommended in ${sector.name}`} subtitle={`Recommended because you follow ${sector.name.split(" ")[0]}.`} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {sectorCompanies.slice(0, 3).map((c) => (
              <Card key={c.id} className="p-4 space-y-2 hover:shadow-md transition-all">
                <div className="flex items-center gap-2"><div className={`h-7 w-7 rounded-lg ${c.tier === "top" ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white" : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300"} flex items-center justify-center font-bold text-[9px]`}>{c.logo}</div><div><h4 className="font-bold text-[11px] text-gray-900 dark:text-white">{c.name}</h4><p className="text-[8px] text-gray-400">{c.industry}</p></div></div>
                <Link href={profileHref(c)} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">View Company →</Link>
              </Card>
            ))}
          </div>
        </section>

        {/* 24. Featured Companies in Sector */}
        <section className="space-y-3">
          <SectionTitle title={`Featured Companies in ${sector.name}`} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectorCompanies.map((c) => (
              <Card key={c.id} className="p-5 border-l-4 border-amber-400 hover:border-amber-500 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    {c.isSponsored ? <Badge color="amber"><Sparkles className="h-2.5 w-2.5" /> SPONSORED</Badge> : <Badge color="amber"><Crown className="h-2.5 w-2.5" /> FEATURED</Badge>}
                    <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Paid</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 ${c.tier === "top" ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white" : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300"} rounded-xl flex items-center justify-center font-bold text-sm`}>{c.logo}</div>
                    <div><h3 className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">{c.name}<CheckCircle className="h-3 w-3 text-amber-500" /></h3><p className="text-[8px] text-gray-500 font-semibold">{c.industry} · {c.country}</p></div>
                  </div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 font-normal leading-relaxed">{c.tagline}</p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3">
                  <div className="flex gap-2"><button onClick={() => toggleFollowCompany(c.id)} className={`text-[9px] font-bold px-2 py-1 rounded ${followedCompanies.includes(c.id) ? "bg-emerald-500 text-white" : "border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100"}`}>{followedCompanies.includes(c.id) ? "Following" : "Follow"}</button><button onClick={() => handleCompareCompany(c.id)} className={`text-[9px] font-bold px-2 py-1 rounded border ${comparedCompanyIds.includes(c.id) ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 border-transparent" : "border-gray-250 text-gray-600 dark:border-gray-700 hover:bg-gray-100"}`}>Compare</button></div>
                  <Link href={profileHref(c)} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">View Company<ChevronRight className="h-3 w-3" /></Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 25. Sponsored Sector Spotlight */}
        <section className="space-y-4">
          <SectionTitle title="Sector Spotlight" subtitle="Commercial placement — sponsored content is clearly labelled." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectorCompanies.filter((c) => c.isSponsored).map((c) => (
              <Card key={c.id} className="p-6 border-l-4 border-amber-400 space-y-3">
                <div className="flex items-center justify-between"><Badge color="amber"><Sparkles className="h-2.5 w-2.5" /> SPONSORED</Badge><span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Paid Spotlight</span></div>
                <div className="flex items-center gap-3"><div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-lg">{c.logo}</div><div><h3 className="font-bold text-sm text-gray-900 dark:text-white">{c.name}</h3><p className="text-[9px] text-gray-500">{c.industry} · {c.country}</p></div></div>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-relaxed">{c.tagline}</p>
                <div className="flex gap-2 pt-1"><button onClick={() => triggerEnquiry(c)} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-[10px] px-4 py-2 rounded-lg">Send Business Enquiry</button><Link href={profileHref(c)} className="border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold text-[10px] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">View Company →</Link></div>
              </Card>
            ))}
          </div>
        </section>

        {/* 26. Premium Sector Intelligence */}
        <section className="bg-gradient-to-r from-slate-950 via-[#170e30] to-[#2b1754] text-white rounded-3xl p-6 md:p-8 border border-purple-900/60 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
          <div className="space-y-2">
            <span className="bg-purple-500/20 text-purple-300 text-[8px] font-bold px-2.5 py-1 rounded uppercase border border-purple-400/20 tracking-wider">iGEN Intelligence Hub</span>
            <h3 className="font-display font-black text-lg md:text-xl">Unlock Advanced Sector Intelligence</h3>
            <p className="text-[10px] md:text-xs text-purple-200 max-w-lg leading-relaxed font-normal">Advanced sector filters, company comparison, ranking history, sector analytics, export reports and saved dashboards.</p>
          </div>
          <Link href="/eoi" className="bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs px-6 py-3.5 rounded-xl transition-all hover:shadow-lg whitespace-nowrap">Upgrade</Link>
        </section>

        {/* 27. Business Lead Generation */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title="Start a Business Conversation" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[{ label: "Send Business Enquiry", icon: Send }, { label: "Request Quote", icon: FileText }, { label: "Request Meeting", icon: Calendar }, { label: "Request Product Info", icon: Mail }].map((b, i) => { const BIcon = b.icon; return (<button key={i} onClick={() => triggerEnquiry(sectorCompanies[0])} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-amber-400 hover:bg-amber-50/40 transition-all"><BIcon className="h-5 w-5 text-amber-600" /><span className="text-[9px] font-bold text-gray-700 dark:text-gray-300 text-center">{b.label}</span></button>); })}
          </div>
        </section>

        {/* 28. Register / Promote Company */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-8 rounded-3xl text-center space-y-4 shadow-sm">
          <Crown className="h-8 w-8 text-amber-500 mx-auto" />
          <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white">Get Your Company Discovered</h3>
          <p className="text-gray-550 dark:text-slate-400 text-xs font-normal max-w-md mx-auto leading-relaxed">Put your company in front of professionals, buyers and industry audiences looking for businesses in your sector.</p>
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
              <div className="text-center py-6 space-y-2"><CheckCircle className="h-10 w-10 text-emerald-500 mx-auto" /><h4 className="font-bold text-xs text-gray-900 dark:text-white">Enquiry Submitted Successfully!</h4><p className="text-[10px] text-gray-500">Your query has been routed through iGEN CRM to {enquiryCompany.name}.</p></div>
            ) : (
              <form onSubmit={submitEnquiry} className="space-y-3 text-xs">
                <div className="space-y-1"><label className="text-[8px] font-bold text-gray-400 uppercase">Your Work Email</label><input required type="email" placeholder="you@company.com" className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 outline-none" /></div>
                <div className="space-y-1"><label className="text-[8px] font-bold text-gray-400 uppercase">Requirement Type</label><select className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 outline-none"><option>Product Sourcing Quote</option><option>Supply Chain Collaboration</option><option>Bilateral Partnership proposal</option><option>Advisory Engagement</option></select></div>
                <div className="space-y-1"><label className="text-[8px] font-bold text-gray-400 uppercase">Enquiry Message</label><textarea required rows={4} placeholder="Describe your business requirements in detail..." className="w-full bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-2.5 outline-none resize-none" /></div>
                <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs py-3 rounded-lg transition-colors">Submit Direct Enquiry</button>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}


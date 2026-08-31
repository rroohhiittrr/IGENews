"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";
import {
  Building2, CheckCircle, Crown, Search, TrendingUp, ChevronRight, ArrowRight,
  Star, Globe, Briefcase, MapPin, Users, BarChart2, Mail, Phone, Calendar,
  Download, Shield, Lock, Eye, Share2, Bookmark, Award, FileText, Sparkles,
  Filter, Plus, ExternalLink, MessageSquare, Target, Zap, Flame, SlidersHorizontal,
  ArrowUpRight, HelpCircle, Check, Activity, Trophy, AlertTriangle, RefreshCw,
  ArrowDownRight, Handshake, Newspaper, Megaphone, Rocket, Tag, Bell, Send,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface CompanyRef {
  id: string;
  name: string;
  logoInitials: string;
  industry: string;
  industryId: string;
  country: string;
  countryCode: string;
  tier: "registered" | "verified" | "top";
  storyCount: number;
  trending: boolean;
}

interface NewsArticle {
  id: string;
  companyId: string;
  company: string;
  logo: string;
  industry: string;
  industryId: string;
  country: string;
  countryCode: string;
  headline: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  views: number;
  shares: number;
  saves: number;
  sponsored?: boolean;
  featured?: boolean;
  image?: string;
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

// ─── Sample dataset (representative platform content) ────────────────────────
const COMPANIES: CompanyRef[] = [
  { id: "co-1", name: "Tata Steel Ltd.", logoInitials: "TS", industry: "Steel & Metallurgy", industryId: "steel-metallurgy", country: "India", countryCode: "IN", tier: "top", storyCount: 14, trending: true },
  { id: "co-3", name: "Adani Green Energy Ltd.", logoInitials: "AG", industry: "Renewable Energy", industryId: "renewable-energy", country: "India", countryCode: "IN", tier: "top", storyCount: 18, trending: true },
  { id: "co-5", name: "Reliance Industries Ltd.", logoInitials: "RI", industry: "IT & Technology", industryId: "it-technology", country: "India", countryCode: "IN", tier: "top", storyCount: 25, trending: true },
  { id: "co-6", name: "Infosys BPM Ltd.", logoInitials: "IB", industry: "IT & Technology", industryId: "it-technology", country: "India", countryCode: "IN", tier: "top", storyCount: 9, trending: false },
  { id: "co-10", name: "Larsen & Toubro Ltd.", logoInitials: "LT", industry: "Construction & Engineering", industryId: "construction-engineering", country: "India", countryCode: "IN", tier: "top", storyCount: 13, trending: true },
  { id: "co-11", name: "Tesla Inc.", logoInitials: "TL", industry: "Automotive & EV", industryId: "automotive-ev", country: "United States", countryCode: "US", tier: "top", storyCount: 31, trending: true },
  { id: "co-12", name: "Siemens Industrial AG", logoInitials: "SI", industry: "Manufacturing & Equipment", industryId: "manufacturing-equipment", country: "Germany", countryCode: "DE", tier: "verified", storyCount: 11, trending: false },
  { id: "co-13", name: "BioNTech SE", logoInitials: "BN", industry: "Healthcare", industryId: "healthcare", country: "Germany", countryCode: "DE", tier: "verified", storyCount: 7, trending: false },
  { id: "co-14", name: "G42 AI Group", logoInitials: "G4", industry: "IT & Technology", industryId: "it-technology", country: "United Arab Emirates", countryCode: "AE", tier: "top", storyCount: 10, trending: true },
  { id: "co-4", name: "Cipla Pharmaceuticals Ltd.", logoInitials: "CP", industry: "Pharmaceuticals", industryId: "pharmaceuticals", country: "India", countryCode: "IN", tier: "verified", storyCount: 8, trending: false },
];

const CATEGORIES = ["Announcements", "Product Launches", "Partnerships", "Investments", "Expansion", "M&A", "Leadership Changes", "Financial Updates", "Awards", "Certifications"];

const INDUSTRIES_LIST = [
  { id: "it-technology", name: "IT & Technology", icon: "💻" },
  { id: "renewable-energy", name: "Renewable Energy", icon: "⚡" },
  { id: "automotive-ev", name: "Automotive & EV", icon: "🚗" },
  { id: "pharmaceuticals", name: "Pharmaceuticals", icon: "💊" },
  { id: "steel-metallurgy", name: "Steel & Metallurgy", icon: "⚙️" },
  { id: "construction-engineering", name: "Construction & Engineering", icon: "🏗️" },
  { id: "healthcare", name: "Healthcare", icon: "🏥" },
  { id: "manufacturing-equipment", name: "Manufacturing & Equipment", icon: "🏭" },
];

const COUNTRIES_LIST = [
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
];

const ARTICLES: NewsArticle[] = [
  { id: "n1", companyId: "co-3", company: "Adani Green Energy", logo: "AG", industry: "Renewable Energy", industryId: "renewable-energy", country: "India", countryCode: "IN", headline: "Adani Green commissions world's largest renewable energy park in Khavda", summary: "The 2,000 sq km integrated renewable cluster adds 30 GW of clean capacity, positioning India as a global clean-energy exporter.", category: "Announcements", date: "30m ago", readTime: "4 min read", views: 48200, shares: 3200, saves: 1800, sponsored: true, featured: true, image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80" },
  { id: "n2", companyId: "co-5", company: "Reliance Industries", logo: "RI", industry: "IT & Technology", industryId: "it-technology", country: "India", countryCode: "IN", headline: "Reliance Jio expands AI Cloud computing trials for enterprise partners", summary: "Jio's sovereign AI Cloud stack opens to 500+ enterprise partners, targeting localized large-language-model workloads.", category: "Product Launches", date: "2 hrs ago", readTime: "5 min read", views: 39100, shares: 2100, saves: 1450, featured: true, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80" },
  { id: "n3", companyId: "co-11", company: "Tesla Inc.", logo: "TL", industry: "Automotive & EV", industryId: "automotive-ev", country: "United States", countryCode: "US", headline: "Tesla proposes major EV assembly gigafactory layout for India corridor", summary: "Tesla outlines a phased India manufacturing roadmap with local supplier integration across six states.", category: "Expansion", date: "4 hrs ago", readTime: "6 min read", views: 71200, shares: 5400, saves: 2900, featured: true, image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&auto=format&fit=crop&q=80" },
  { id: "n4", companyId: "co-10", company: "Larsen & Toubro", logo: "LT", industry: "Construction & Engineering", industryId: "construction-engineering", country: "India", countryCode: "IN", headline: "L&T wins greenfield hydrogen terminal pipeline contract in UAE", summary: "The $1.2B EPC award strengthens L&T's clean-energy infrastructure footprint across the Gulf corridor.", category: "Partnerships", date: "6 hrs ago", readTime: "4 min read", views: 22400, shares: 980, saves: 720, image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&auto=format&fit=crop&q=80" },
  { id: "n5", companyId: "co-14", company: "G42 AI Group", logo: "G4", industry: "IT & Technology", industryId: "it-technology", country: "United Arab Emirates", countryCode: "AE", headline: "G42 partners with leading US tech firms for compute center expansion", summary: "A new sovereign AI compute corridor adds 1.2 exaflops of capacity dedicated to regional model training.", category: "Investments", date: "1 day ago", readTime: "5 min read", views: 19800, shares: 1120, saves: 640, sponsored: true, image: "https://images.unsplash.com/photo-1620712943543-bcc4610101b2?w=600&auto=format&fit=crop&q=80" },
  { id: "n6", companyId: "co-1", company: "Tata Steel", logo: "TS", industry: "Steel & Metallurgy", industryId: "steel-metallurgy", country: "India", countryCode: "IN", headline: "Tata Steel transitions UK plant to electric arc furnace", summary: "The decarbonization program cuts 3.2 Mt of CO2 annually and secures long-term green steel demand.", category: "Announcements", date: "3 hrs ago", readTime: "4 min read", views: 26700, shares: 1400, saves: 880, image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&auto=format&fit=crop&q=80" },
  { id: "n7", companyId: "co-12", company: "Siemens Industrial", logo: "SI", industry: "Manufacturing & Equipment", industryId: "manufacturing-equipment", country: "Germany", countryCode: "DE", headline: "Siemens enters grid software automation partnership with Singapore", summary: "A joint digital-twin program modernizes Singapore's industrial energy management backbone.", category: "Partnerships", date: "1 day ago", readTime: "4 min read", views: 14300, shares: 610, saves: 420, image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80" },
  { id: "n8", companyId: "co-4", company: "Cipla", logo: "CP", industry: "Pharmaceuticals", industryId: "pharmaceuticals", country: "India", countryCode: "IN", headline: "Cipla secures FDA approval for new respiratory formulation", summary: "The approval expands Cipla's US respiratory franchise with a differentiated delivery platform.", category: "Certifications", date: "2 days ago", readTime: "3 min read", views: 9600, shares: 320, saves: 280, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&auto=format&fit=crop&q=80" },
  { id: "n9", companyId: "co-13", company: "BioNTech", logo: "BN", industry: "Healthcare", industryId: "healthcare", country: "Germany", countryCode: "DE", headline: "BioNTech initiates Phase II personalized oncology vaccine trial", summary: "The candidate leverages individualized mRNA constructs targeting patient-specific tumor neoantigens.", category: "Investments", date: "2 days ago", readTime: "5 min read", views: 11200, shares: 540, saves: 390, image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&auto=format&fit=crop&q=80" },
  { id: "n10", companyId: "co-6", company: "Infosys BPM", logo: "IB", industry: "IT & Technology", industryId: "it-technology", country: "India", countryCode: "IN", headline: "Infosys BPM launches clean AI workflow automation suites", summary: "New agentic automation bundles reduce manual processing time across finance and HR shared services.", category: "Product Launches", date: "5 hrs ago", readTime: "4 min read", views: 17300, shares: 760, saves: 510, image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&auto=format&fit=crop&q=80" },
  { id: "n11", companyId: "co-5", company: "Reliance Industries", logo: "RI", industry: "IT & Technology", industryId: "it-technology", country: "India", countryCode: "IN", headline: "Reliance Retail signs omnichannel logistics partnership with Mahindra", summary: "A shared last-mile network aims to cut delivery costs across tier-2 and tier-3 markets.", category: "Partnerships", date: "8 hrs ago", readTime: "4 min read", views: 20100, shares: 880, saves: 600, image: "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=600&auto=format&fit=crop&q=80" },
  { id: "n12", companyId: "co-3", company: "Adani Green Energy", logo: "AG", industry: "Renewable Energy", industryId: "renewable-energy", country: "India", countryCode: "IN", headline: "Adani Green forms joint venture with TotalEnergies for 2 GW wind farm", summary: "The Rajasthan wind JV diversifies the group's hybrid portfolio with a marquee global energy partner.", category: "M&A", date: "1 day ago", readTime: "5 min read", views: 28900, shares: 1500, saves: 980, image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&auto=format&fit=crop&q=80" },
  { id: "n13", companyId: "co-11", company: "Tesla Inc.", logo: "TL", industry: "Automotive & EV", industryId: "automotive-ev", country: "United States", countryCode: "US", headline: "Tesla Energy signs grid storage supply agreement in Germany", summary: "Megapack deployments support Bavaria's industrial decarbonization and frequency regulation.", category: "Investments", date: "2 days ago", readTime: "5 min read", views: 33400, shares: 2100, saves: 1300, image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80" },
  { id: "n14", companyId: "co-1", company: "Tata Steel", logo: "TS", industry: "Steel & Metallurgy", industryId: "steel-metallurgy", country: "India", countryCode: "IN", headline: "Tata Steel acquires specialty alloys producer to expand aerospace supply", summary: "The acquisition strengthens high-margin advanced-materials capability for defense and aerospace.", category: "M&A", date: "3 days ago", readTime: "4 min read", views: 15800, shares: 700, saves: 520, image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&auto=format&fit=crop&q=80" },
  { id: "n15", companyId: "co-10", company: "Larsen & Toubro", logo: "LT", industry: "Construction & Engineering", industryId: "construction-engineering", country: "India", countryCode: "IN", headline: "L&T expands offshore fabrication capacity in Saudi Arabia", summary: "A new yard supports regional oil & gas and green-hydrogen infrastructure projects.", category: "Expansion", date: "4 days ago", readTime: "4 min read", views: 13400, shares: 540, saves: 410, image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80" },
  { id: "n16", companyId: "co-14", company: "G42 AI Group", logo: "G4", industry: "IT & Technology", industryId: "it-technology", country: "United Arab Emirates", countryCode: "AE", headline: "G42 appoints new Chief AI Officer to lead sovereign model strategy", summary: "The leadership change accelerates regional model governance and talent development.", category: "Leadership Changes", date: "5 days ago", readTime: "3 min read", views: 8900, shares: 320, saves: 240, image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80" },
  { id: "n17", companyId: "co-12", company: "Siemens Industrial", logo: "SI", industry: "Manufacturing & Equipment", industryId: "manufacturing-equipment", country: "Germany", countryCode: "DE", headline: "Siemens launches industrial CNC automation controller series", summary: "The new controllers add edge AI telemetry for predictive maintenance in smart factories.", category: "Product Launches", date: "6 days ago", readTime: "4 min read", views: 10100, shares: 410, saves: 300, image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&auto=format&fit=crop&q=80" },
  { id: "n18", companyId: "co-5", company: "Reliance Industries", logo: "RI", industry: "IT & Technology", industryId: "it-technology", country: "India", countryCode: "IN", headline: "Reliance reports record digital services revenue in quarterly update", summary: "Strong ARPU and enterprise cloud adoption drive the conglomerate's financial momentum.", category: "Financial Updates", date: "1 week ago", readTime: "5 min read", views: 24600, shares: 980, saves: 700, image: "https://images.unsplash.com/photo-1554260570-9140fd3b7614?w=600&auto=format&fit=crop&q=80" },
  { id: "n19", companyId: "co-13", company: "BioNTech", logo: "BN", industry: "Healthcare", industryId: "healthcare", country: "Germany", countryCode: "DE", headline: "BioNTech earns manufacturing certification for expanded EU supply", summary: "The certification unlocks capacity for regional vaccine and therapy production.", category: "Certifications", date: "1 week ago", readTime: "3 min read", views: 7600, shares: 240, saves: 190, image: "https://images.unsplash.com/photo-1532187863486-4c3ed78a25a4?w=600&auto=format&fit=crop&q=80" },
  { id: "n20", companyId: "co-4", company: "Cipla", logo: "CP", industry: "Pharmaceuticals", industryId: "pharmaceuticals", country: "India", countryCode: "IN", headline: "Cipla partners with diagnostics network for respiratory screening", summary: "A joint initiative expands early detection across tier-2 clinics in western India.", category: "Partnerships", date: "1 week ago", readTime: "4 min read", views: 8200, shares: 280, saves: 210, image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80" },
];

const PARTNERSHIPS = ARTICLES.filter((a) => a.category === "Partnerships");
const INVESTMENTS = ARTICLES.filter((a) => a.category === "Investments");
const MA_DEALS = ARTICLES.filter((a) => a.category === "M&A");
const EXPANSIONS = ARTICLES.filter((a) => a.category === "Expansion");
const PRODUCT_LAUNCHES = ARTICLES.filter((a) => a.category === "Product Launches");
const EXECUTIVE_MOVES = ARTICLES.filter((a) => a.category === "Leadership Changes");

const ACTIVITY_TIMELINE = [
  { id: "t1", company: "Adani Green", type: "Product Launch", text: "Commissioned 30 GW Khavda renewable park", date: "30m ago", color: "amber" },
  { id: "t2", company: "Reliance Industries", type: "Partnership", text: "Omnichannel logistics JV with Mahindra", date: "8 hrs ago", color: "blue" },
  { id: "t3", company: "Tesla", type: "Expansion", text: "India gigafactory corridor proposal", date: "4 hrs ago", color: "emerald" },
  { id: "t4", company: "L&T", type: "Investment", text: "Hydrogen terminal EPC in UAE", date: "6 hrs ago", color: "purple" },
  { id: "t5", company: "Tata Steel", type: "M&A", text: "Acquired specialty alloys producer", date: "3 days ago", color: "rose" },
];

// ─── Skeleton Loaders ────────────────────────────────────────────────────────
function SkeletonLine({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded ${className}`} />;
}
function NewsCardSkeleton() {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center gap-2"><SkeletonLine className="h-7 w-7 rounded-lg" /><div className="flex-1 space-y-1.5"><SkeletonLine className="h-3 w-32" /><SkeletonLine className="h-2.5 w-20" /></div></div>
      <SkeletonLine className="h-3 w-full" /><SkeletonLine className="h-2.5 w-3/4" /><SkeletonLine className="h-2.5 w-1/2" />
    </Card>
  );
}
function FeaturedSkeleton() {
  return <Card className="overflow-hidden"><SkeletonLine className="h-64 w-full rounded-none" /><div className="p-5 space-y-3"><SkeletonLine className="h-4 w-3/4" /><SkeletonLine className="h-2.5 w-full" /><SkeletonLine className="h-2.5 w-2/3" /></div></Card>;
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function TopCompanyNewsView() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [quickFilter, setQuickFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [trendingTab, setTrendingTab] = useState<"today" | "week" | "month">("week");
  const [mostReadTab, setMostReadTab] = useState<"today" | "week" | "month">("week");
  const [industryNewsTab, setIndustryNewsTab] = useState(INDUSTRIES_LIST[0].id);
  const [countryNewsCode, setCountryNewsCode] = useState("IN");

  const [savedIds, setSavedIds] = useState<string[]>(["n2"]);
  const [followedIds, setFollowedIds] = useState<string[]>(["co-3", "co-11"]);
  const [alertsConfig, setAlertsConfig] = useState({ company: true, industry: false, country: false, launches: false, partnerships: false, investments: false, ma: false, expansion: false });
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [aiSummaryId, setAiSummaryId] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  const loadData = () => { try { setError(false); setLoading(false); } catch { setError(true); setLoading(false); } };

  const companyProfileHref = (c: { tier: string; id: string }) => `/${locale}/company-news/${c.tier}/pages/${c.id}`;
  const companyNewsHref = (c: { tier: string; id: string }) => `/${locale}/company-news/${c.tier}/news/${c.id}`;
  const articleHref = (id: string) => `/en/poc-v2/article/${id}`;

  const filteredArticles = ARTICLES.filter((a) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!(a.headline.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q) || a.company.toLowerCase().includes(q) || a.industry.toLowerCase().includes(q) || a.category.toLowerCase().includes(q))) return false;
    }
    if (categoryFilter !== "all" && a.category !== categoryFilter) return false;
    if (quickFilter !== "all") {
      const map: Record<string, string> = {
        trending: "trending", latest: "latest", top: "top", industry: "industry", country: "country",
        launches: "Product Launches", partnerships: "Partnerships", investments: "Investments", ma: "M&A", expansion: "Expansion",
      };
      const f = map[quickFilter];
      if (!f) return true;
      if (f === "trending") return a.views > 25000;
      if (f === "top") return COMPANIES.find((c) => c.id === a.companyId)?.tier === "top";
      if (f === "latest") return true;
      if (f === "industry" || f === "country") return true;
      return a.category === f;
    }
    return true;
  });

  const toggleSave = (id: string) => setSavedIds(savedIds.includes(id) ? savedIds.filter((i) => i !== id) : [...savedIds, id]);
  const toggleFollow = (id: string) => setFollowedIds(followedIds.includes(id) ? followedIds.filter((i) => i !== id) : [...followedIds, id]);
  const createAlert = () => { setAlertSuccess(true); setTimeout(() => setAlertSuccess(false), 3000); };
  const shareArticle = (id: string) => { if (typeof window !== "undefined" && navigator.clipboard) navigator.clipboard.writeText(`${window.location.origin}/en/poc-v2/article/${id}`); };
  const submitNewsletter = (e: React.FormEvent) => { e.preventDefault(); setNewsletterDone(true); setTimeout(() => setNewsletterDone(false), 3000); };

  // ─── Error State ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 font-sans">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-10">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center space-y-4">
            <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
            <h3 className="font-bold text-sm text-gray-900 dark:text-white">We couldn&apos;t load company news.</h3>
            <button onClick={() => { setLoading(true); loadData(); }} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-lg inline-flex items-center gap-1.5"><RefreshCw className="h-3.5 w-3.5" /> Retry</button>
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
          <div className="grid grid-cols-12 gap-8"><div className="col-span-12 lg:col-span-8 space-y-4">{[0,1,2,3].map(i => <NewsCardSkeleton key={i} />)}</div><div className="col-span-12 lg:col-span-4 space-y-4">{[0,1,2].map(i => <NewsCardSkeleton key={i} />)}</div></div>
        </div>
      </div>
    );
  }

  const featured = ARTICLES.find((a) => a.featured) ?? ARTICLES[0];

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 pt-4 space-y-8">

        {/* 1. Breadcrumb */}
        <nav className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5 py-2" aria-label="Breadcrumb">
          <Link href="/en/poc-v2" className="hover:text-amber-600">iGEN Home</Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <Link href="/en/poc-v2/company-news" className="hover:text-amber-600">Company News</Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <Link href="/en/poc-v2/company-news/top" className="hover:text-amber-600">Top Companies</Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="text-amber-600">Company News</span>
        </nav>

        {/* 2. Hero */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-amber-500 via-orange-600 to-[#b45309] text-white p-6 md:p-10 border border-amber-400/40 shadow-md">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]" />
          <div className="relative z-10 grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8 space-y-4">
              <span className="bg-white/20 text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20 inline-block">Aggregated Corporate Intelligence</span>
              <h1 className="font-display text-3xl md:text-5xl font-black tracking-tight leading-none">Top Company News</h1>
              <p className="text-xs md:text-sm text-white/85 max-w-lg leading-relaxed">Stay updated on announcements, launches, partnerships, investments and strategic developments from leading companies shaping global markets.</p>
              <div className="relative max-w-md w-full bg-white/15 backdrop-blur-md rounded-xl border border-white/25 p-1.5 flex items-center gap-2 mt-2">
                <Search className="h-4 w-4 text-white/70 ml-2 shrink-0" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search company news, company, industry or topic..." className="flex-1 bg-transparent border-0 outline-none text-xs text-white placeholder-white/70 py-1" />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="text-[10px] text-white/70 hover:text-white px-2">Clear</button>}
              </div>
              <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-bold">
                <a href="#latest-section" className="bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg border border-white/15 transition-colors">Explore Latest News</a>
                <a href="#alerts-section" className="bg-white/15 hover:bg-white/25 text-white px-3 py-1.5 rounded-lg border border-white/15 transition-colors">Create News Alert</a>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1 text-[9px] font-semibold">
                {["Latest", "Trending", "Top Companies", "Industry", "Country", "Product Launches", "Partnerships", "Investments", "M&A", "Expansion"].map((q) => (
                  <a key={q} href="#latest-section" className="bg-black/15 hover:bg-black/25 text-white/90 px-2 py-1 rounded-full">{q}</a>
                ))}
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 flex justify-end">
              <Link href="/eoi" className="w-full md:w-auto bg-white text-gray-950 font-bold text-xs px-6 py-3.5 rounded-xl hover:shadow-lg transition-transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-1.5"><Plus className="h-4 w-4" /> Publish Company News</Link>
            </div>
          </div>
        </section>

        {/* 3. Quick Filters */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-3.5 rounded-2xl flex flex-wrap gap-2 items-center shadow-xs">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mr-2 flex items-center gap-1"><SlidersHorizontal className="h-3 w-3" /> Quick Views:</span>
          {[
            { label: "All News", val: "all" }, { label: "Trending", val: "trending" }, { label: "Top Companies", val: "top" },
            { label: "Product Launches", val: "launches" }, { label: "Partnerships", val: "partnerships" },
            { label: "Investments", val: "investments" }, { label: "M&A", val: "ma" }, { label: "Expansion", val: "expansion" },
          ].map((item) => (
            <button key={item.val} onClick={() => { setQuickFilter(item.val); setCategoryFilter("all"); }} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${quickFilter === item.val ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-150 dark:bg-gray-900 text-gray-550 dark:text-gray-400 hover:text-amber-600 hover:bg-amber-50/50"}`}>{item.label}</button>
          ))}
          <div className="ml-auto flex items-center gap-2">
            <Filter className="h-3 w-3 text-gray-400" />
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-1.5 text-[10px] outline-none">
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </section>

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT COLUMN */}
          <div className="col-span-12 lg:col-span-8 space-y-8">

            {/* 4. Featured Company Story */}
            <section className="space-y-3">
              <SectionTitle title="Featured Company Story" />
              <Card className="overflow-hidden">
                {featured.image && <div className="relative h-56 md:h-64 bg-cover bg-center" style={{ backgroundImage: `url(${featured.image})` }}><div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" /></div>}
                <div className="p-5 md:p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className={`h-8 w-8 rounded-lg ${featured.sponsored ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white" : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300"} flex items-center justify-center font-bold text-[10px]`}>{featured.logo}</div>
                      <div>
                        <Link href={companyProfileHref({ tier: (COMPANIES.find(c => c.id === featured.companyId)?.tier) ?? "top", id: featured.companyId })} className="font-bold text-xs text-gray-900 dark:text-white hover:text-amber-600 flex items-center gap-1">{featured.company}{featured.sponsored && <Crown className="h-3 w-3 text-amber-500" />}</Link>
                        <p className="text-[8px] text-gray-400">{featured.industry} · {featured.country}</p>
                      </div>
                    </div>
                    {featured.sponsored ? <Badge color="amber"><Sparkles className="h-2.5 w-2.5" /> SPONSORED</Badge> : <Badge color="amber">FEATURED</Badge>}
                  </div>
                  <h3 className="font-display text-lg md:text-2xl font-bold text-gray-900 dark:text-white leading-tight hover:text-amber-600 transition-colors"><Link href={articleHref(featured.id)}>{featured.headline}</Link></h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{featured.summary}</p>
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-3 text-[10px] text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {featured.date}</span>
                      <span>{featured.readTime}</span>
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {featured.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => toggleSave(featured.id)} className={`flex items-center gap-1 px-2 py-1 rounded ${savedIds.includes(featured.id) ? "bg-emerald-500 text-white" : "border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100"}`}><Bookmark className="h-3 w-3" /> {savedIds.includes(featured.id) ? "Saved" : "Save"}</button>
                      <button onClick={() => shareArticle(featured.id)} className="flex items-center gap-1 px-2 py-1 rounded border border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100"><Share2 className="h-3 w-3" /> Share</button>
                    </div>
                  </div>
                  <Link href={articleHref(featured.id)} className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 hover:underline">Read Full Story <ChevronRight className="h-3.5 w-3.5" /></Link>
                </div>
              </Card>
            </section>

            {/* 5. Latest Company Developments */}
            <section id="latest-section" className="space-y-4">
              <SectionTitle title="Latest Company Developments" subtitle="The main aggregated feed from leading companies." />
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-[#0f172a] rounded-2xl border border-gray-100 dark:border-gray-855 p-6 space-y-3">
                  <Newspaper className="h-8 w-8 text-gray-300 mx-auto" />
                  <h4 className="text-xs font-bold text-gray-600 dark:text-gray-400">No company news is currently available for these filters.</h4>
                  <button onClick={() => { setQuickFilter("all"); setCategoryFilter("all"); setSearchQuery(""); }} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-[10px] px-4 py-1.5 rounded-lg">Explore All News</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredArticles.map((a) => {
                    const co = COMPANIES.find((c) => c.id === a.companyId);
                    return (
                      <Card key={a.id} className="p-4 hover:border-amber-400 dark:hover:border-amber-800 transition-all flex flex-col justify-between gap-3">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <div className={`h-7 w-7 rounded-lg ${a.sponsored ? "bg-gradient-to-br from-amber-500 to-orange-600 text-white" : "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-300"} flex items-center justify-center font-bold text-[9px]`}>{a.logo}</div>
                              <div>
                                <Link href={companyProfileHref({ tier: co?.tier ?? "top", id: a.companyId })} className="font-bold text-[11px] text-gray-900 dark:text-white hover:text-amber-600">{a.company}</Link>
                                <p className="text-[8px] text-gray-400">{a.industry} · {a.country}</p>
                              </div>
                            </div>
                            <Badge color="blue">{a.category}</Badge>
                          </div>
                          <h4 className="font-bold text-xs text-gray-900 dark:text-white leading-snug hover:text-amber-600 transition-colors"><Link href={articleHref(a.id)}>{a.headline}</Link></h4>
                          <p className="text-[10px] text-gray-500 leading-normal line-clamp-2">{a.summary}</p>
                        </div>
                        <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-855 pt-2 text-[10px] text-gray-400">
                          <div className="flex items-center gap-2">
                            <span>{a.date}</span>
                            <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" /> {a.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => toggleSave(a.id)} className={`px-1.5 py-0.5 rounded ${savedIds.includes(a.id) ? "text-emerald-600" : "text-gray-500 hover:text-amber-600"}`} aria-label="Save"><Bookmark className="h-3 w-3" /></button>
                            <button onClick={() => shareArticle(a.id)} className="px-1.5 py-0.5 rounded text-gray-500 hover:text-amber-600" aria-label="Share"><Share2 className="h-3 w-3" /></button>
                            <Link href={articleHref(a.id)} className="text-amber-600 font-bold hover:underline ml-1">Read →</Link>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
            </section>

            {/* 7. Trending Company News */}
            <section className="space-y-3">
              <SectionTitle title="Trending Company News" action={
                <div className="flex gap-1">
                  {([{ label: "Today", val: "today" }, { label: "This Week", val: "week" }, { label: "This Month", val: "month" }] as const).map((t) => (
                    <button key={t.val} onClick={() => setTrendingTab(t.val)} className={`px-2.5 py-1 text-[9px] font-bold rounded ${trendingTab === t.val ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>{t.label}</button>
                  ))}
                </div>
              } />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 4).map((a) => (
                  <Card key={a.id} className="p-4 space-y-2 hover:shadow-md transition-all">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-bold text-amber-600 uppercase tracking-widest bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded">Trending {trendingTab === "today" ? "today" : trendingTab === "week" ? "this week" : "this month"}</span>
                      <Flame className="h-3.5 w-3.5 text-orange-500" />
                    </div>
                    <h4 className="font-bold text-xs text-gray-900 dark:text-white">{a.headline}</h4>
                    <p className="text-[9px] text-gray-500">{a.company} · {a.industry}</p>
                    <div className="flex justify-between items-center text-[9px] border-t border-gray-100 dark:border-gray-800 pt-2 font-bold">
                      <span className="text-amber-600">{a.views.toLocaleString()} views</span>
                      <Link href={articleHref(a.id)} className="text-amber-600 hover:underline">Read →</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 8. Most Read */}
            <section className="space-y-3">
              <SectionTitle title="Most Read" action={
                <div className="flex gap-1">
                  {([{ label: "Today", val: "today" }, { label: "This Week", val: "week" }, { label: "This Month", val: "month" }] as const).map((t) => (
                    <button key={t.val} onClick={() => setMostReadTab(t.val)} className={`px-2.5 py-1 text-[9px] font-bold rounded ${mostReadTab === t.val ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>{t.label}</button>
                  ))}
                </div>
              } />
              <Card className="p-5 divide-y divide-gray-50 dark:divide-gray-855">
                {[...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 6).map((a, idx) => (
                  <div key={a.id} className="flex items-center gap-3 py-2.5">
                    <span className="font-display font-extrabold text-lg text-amber-600 w-6">{idx + 1}</span>
                    <div className="flex-1 min-w-0"><Link href={articleHref(a.id)} className="font-bold text-[10px] text-gray-900 dark:text-white hover:text-amber-600 block truncate">{a.headline}</Link><span className="text-[8px] text-gray-400">{a.company} · {a.industry}</span></div>
                    <span className="text-[9px] font-bold text-gray-500">{a.views.toLocaleString()}</span>
                  </div>
                ))}
              </Card>
            </section>

            {/* 9. Companies Making Headlines */}
            <section className="space-y-3">
              <SectionTitle title="Companies Making Headlines" subtitle="Discovery cards — not company profiles." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COMPANIES.filter((c) => c.tier === "top").slice(0, 6).map((comp) => (
                  <div key={comp.id} className="bg-gray-100 dark:bg-gray-900/50 rounded-xl p-4 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-[10px]">{comp.logoInitials}</div>
                        <div><h4 className="font-bold text-xs text-gray-900 dark:text-white flex items-center gap-1">{comp.name}<CheckCircle className="h-3 w-3 text-amber-500" /></h4><p className="text-[8px] text-gray-400">{comp.industry} · {comp.country}</p></div>
                      </div>
                      <p className="text-[9px] text-gray-500">{comp.storyCount} recent stories {comp.trending && <span className="text-emerald-500 font-bold">↑ Trending</span>}</p>
                    </div>
                    <Link href={companyNewsHref(comp)} className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-amber-600 hover:scale-105 transition-transform shadow-xs shrink-0" aria-label="View company news"><ArrowUpRight className="h-4 w-4" /></Link>
                  </div>
                ))}
              </div>
            </section>

            {/* 10. Product Launches */}
            <section className="space-y-3">
              <SectionTitle title="New Products & Launches" subtitle="Highly visual launch highlights." />
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {PRODUCT_LAUNCHES.map((a) => (
                  <Card key={a.id} className="overflow-hidden hover:shadow-md transition-all">
                    {a.image && <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${a.image})` }} />}
                    <div className="p-4 space-y-2">
                      <Badge color="amber"><Rocket className="h-2.5 w-2.5" /> Launch</Badge>
                      <h4 className="font-bold text-[11px] text-gray-900 dark:text-white leading-snug"><Link href={articleHref(a.id)}>{a.headline}</Link></h4>
                      <p className="text-[9px] text-gray-500">{a.company} · {a.industry}</p>
                      <Link href={articleHref(a.id)} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">Explore Launch →</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 13. Partnerships */}
            <section className="space-y-3">
              <SectionTitle title="Strategic Partnerships" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PARTNERSHIPS.map((a) => (
                  <Card key={a.id} className="p-4 flex items-start gap-3 hover:shadow-md transition-all">
                    <div className="h-9 w-9 rounded-xl bg-blue-50 dark:bg-blue-950/20 text-blue-600 flex items-center justify-center shrink-0"><Handshake className="h-4 w-4" /></div>
                    <div className="space-y-1">
                      <Badge color="blue">{a.category}</Badge>
                      <h4 className="font-bold text-[11px] text-gray-900 dark:text-white leading-snug"><Link href={articleHref(a.id)}>{a.headline}</Link></h4>
                      <p className="text-[9px] text-gray-500">{a.company} · {a.industry} · {a.country}</p>
                      <Link href={articleHref(a.id)} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">Read Development →</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 14. Investments & Funding */}
            <section className="space-y-3">
              <SectionTitle title="Investment & Funding Updates" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INVESTMENTS.map((a) => (
                  <Card key={a.id} className="p-4 flex items-start gap-3 hover:shadow-md transition-all">
                    <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 flex items-center justify-center shrink-0"><TrendingUp className="h-4 w-4" /></div>
                    <div className="space-y-1">
                      <Badge color="emerald">{a.category}</Badge>
                      <h4 className="font-bold text-[11px] text-gray-900 dark:text-white leading-snug"><Link href={articleHref(a.id)}>{a.headline}</Link></h4>
                      <p className="text-[9px] text-gray-500">{a.company} · {a.industry} · {a.country}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 15. M&A / Corporate Moves */}
            <section className="space-y-3">
              <SectionTitle title="M&A & Corporate Developments" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MA_DEALS.map((a) => (
                  <Card key={a.id} className="p-4 flex items-start gap-3 hover:shadow-md transition-all">
                    <div className="h-9 w-9 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 flex items-center justify-center shrink-0"><ArrowDownRight className="h-4 w-4" /></div>
                    <div className="space-y-1">
                      <Badge color="rose">{a.category}</Badge>
                      <h4 className="font-bold text-[11px] text-gray-900 dark:text-white leading-snug"><Link href={articleHref(a.id)}>{a.headline}</Link></h4>
                      <p className="text-[9px] text-gray-500">{a.company} · {a.industry}</p>
                      <Link href={articleHref(a.id)} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">Read Development →</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 16. Global Expansion */}
            <section className="space-y-3">
              <SectionTitle title="Companies Expanding Globally" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {EXPANSIONS.map((a) => (
                  <Card key={a.id} className="p-4 flex items-start gap-3 hover:shadow-md transition-all">
                    <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-950/20 text-purple-600 flex items-center justify-center shrink-0"><Globe className="h-4 w-4" /></div>
                    <div className="space-y-1">
                      <Badge color="purple">{a.category}</Badge>
                      <h4 className="font-bold text-[11px] text-gray-900 dark:text-white leading-snug"><Link href={articleHref(a.id)}>{a.headline}</Link></h4>
                      <p className="text-[9px] text-gray-500">{a.company} · {a.country}</p>
                      <Link href={articleHref(a.id)} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">Read Development →</Link>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* 17. Companies to Watch */}
            <section className="space-y-3">
              <SectionTitle title="Companies to Watch" subtitle="Receiving significant attention from real platform signals." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COMPANIES.filter((c) => c.trending).map((comp) => (
                  <div key={comp.id} className="bg-amber-50/30 dark:bg-amber-950/5 border border-amber-100 dark:border-amber-900/20 rounded-xl p-4 flex justify-between items-start gap-4">
                    <div className="space-y-1">
                      <span className="text-[8px] bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider flex items-center gap-1 w-fit">↑ Watch</span>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white pt-1">{comp.name}</h4>
                      <p className="text-[9px] text-gray-500 leading-normal">{comp.industry} · {comp.storyCount} recent stories</p>
                    </div>
                    <Link href={companyProfileHref(comp)} className="h-8 w-8 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-amber-600 hover:scale-105 transition-transform shadow-xs shrink-0"><ArrowUpRight className="h-4 w-4" /></Link>
                  </div>
                ))}
              </div>
            </section>

            {/* 18. Executive Movements */}
            <section className="space-y-3">
              <SectionTitle title="Executive Moves" subtitle="Compact cross-link to leadership news." />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EXECUTIVE_MOVES.map((a) => (
                  <Card key={a.id} className="p-4 flex items-start gap-3 hover:shadow-md transition-all">
                    <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0"><Users className="h-4 w-4" /></div>
                    <div className="space-y-1">
                      <Badge color="slate">{a.category}</Badge>
                      <h4 className="font-bold text-[11px] text-gray-900 dark:text-white leading-snug"><Link href={articleHref(a.id)}>{a.headline}</Link></h4>
                      <p className="text-[9px] text-gray-500">{a.company} · {a.date}</p>
                    </div>
                  </Card>
                ))}
              </div>
              <Link href="/en/poc-v2/leader-news" className="text-[10px] text-amber-600 font-bold hover:underline inline-flex items-center gap-0.5">Explore Leadership News →</Link>
            </section>

            {/* 19. Company Activity Timeline */}
            <section className="space-y-3">
              <SectionTitle title="Company Activity" subtitle="Aggregated preview of top-company developments." />
              <Card className="p-5 space-y-0">
                <div className="relative border-l-2 border-amber-200 dark:border-amber-900 pl-5 space-y-4">
                  {ACTIVITY_TIMELINE.map((ev) => (
                    <div key={ev.id} className="relative">
                      <span className={`absolute -left-[26px] top-1 h-3 w-3 rounded-full bg-${ev.color}-500 ring-4 ring-white dark:ring-gray-900`} />
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="font-bold text-[11px] text-gray-900 dark:text-white">{ev.company}</span>
                        <Badge color={ev.color === "amber" ? "amber" : ev.color === "blue" ? "blue" : ev.color === "emerald" ? "emerald" : ev.color === "purple" ? "purple" : "rose"}>{ev.type}</Badge>
                      </div>
                      <p className="text-[10px] text-gray-600 dark:text-gray-400">{ev.text}</p>
                      <span className="text-[8px] text-gray-400">{ev.date}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

          </div>

          {/* RIGHT COLUMN */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Most Read compact */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2 flex items-center gap-2"><Trophy className="h-4 w-4 text-amber-500" /> Most Read This Week</h4>
              <div className="divide-y divide-gray-50 dark:divide-gray-855">
                {[...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5).map((a, idx) => (
                  <div key={a.id} className="flex items-center gap-3 py-2.5">
                    <span className="font-display font-extrabold text-sm text-amber-600 w-5">{idx + 1}</span>
                    <div className="min-w-0 flex-1"><Link href={articleHref(a.id)} className="font-bold text-[10px] text-gray-900 dark:text-white hover:text-amber-600 block truncate">{a.headline}</Link><span className="text-[8px] text-gray-400">{a.company}</span></div>
                  </div>
                ))}
              </div>
            </section>

            {/* Browse by Industry */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">News by Industry</h4>
              <div className="grid grid-cols-1 gap-2">
                {INDUSTRIES_LIST.map((ind) => (
                  <Link key={ind.id} href={`/en/poc-v2/company-news/top/news?industry=${ind.id}`} className="flex justify-between items-center p-2 rounded-xl bg-gray-50 dark:bg-gray-955 hover:bg-amber-50/50 hover:text-amber-600 transition-all text-[10px]">
                    <span className="flex items-center gap-2"><span className="text-sm">{ind.icon}</span><span className="font-bold">{ind.name}</span></span>
                    <span className="text-amber-600 font-bold">View →</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* Browse by Country */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Company News by Country</h4>
              <div className="grid grid-cols-1 gap-2">
                {COUNTRIES_LIST.map((c) => (
                  <Link key={c.code} href={`/en/poc-v2/company-news/top/news?country=${c.code}`} className="flex justify-between items-center p-2 rounded-xl bg-gray-55 dark:bg-gray-955 hover:bg-amber-50/50 hover:text-amber-600 transition-all text-[10px]">
                    <span className="flex items-center gap-2"><span className="text-sm">{c.flag}</span><span className="font-bold">{c.name}</span></span>
                    <span className="text-amber-600 font-bold">View →</span>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </div>

        {/* 10. News by Industry */}
        <section className="space-y-3">
          <SectionTitle title="Explore Company News by Industry" subtitle="Cross-links to the existing industry news experience." />
          <div className="flex flex-wrap gap-1 mb-2">
            {INDUSTRIES_LIST.map((ind) => (
              <button key={ind.id} onClick={() => setIndustryNewsTab(ind.id)} className={`px-2.5 py-1 text-[9px] font-bold rounded ${industryNewsTab === ind.id ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>{ind.name}</button>
            ))}
          </div>
          <Card className="p-5 space-y-3">
            {(() => {
              const ind = INDUSTRIES_LIST.find((i) => i.id === industryNewsTab);
              const stories = ARTICLES.filter((a) => a.industryId === industryNewsTab);
              return (
                <>
                  <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-2"><span className="text-base">{ind?.icon}</span><h4 className="font-bold text-[11px] text-gray-900 dark:text-white">Latest in {ind?.name}</h4></div>
                  {stories.length === 0 ? <p className="text-[10px] text-gray-500 py-2">No company news indexed for this industry yet.</p> :
                    stories.slice(0, 4).map((a) => (
                      <div key={a.id} className="py-2 border-b border-gray-50 dark:border-gray-855 last:border-0">
                        <Link href={articleHref(a.id)} className="font-bold text-[11px] text-gray-900 dark:text-white hover:text-amber-600 block">{a.headline}</Link>
                        <span className="text-[8px] text-gray-400">{a.company} · {a.date}</span>
                      </div>
                    ))}
                  <Link href={`/en/poc-v2/company-news/top/news?industry=${industryNewsTab}`} className="text-[10px] text-amber-600 font-bold hover:underline block pt-1">View {ind?.name} Company News →</Link>
                </>
              );
            })()}
          </Card>
        </section>

        {/* 11. News by Country */}
        <section className="space-y-3">
          <SectionTitle title="Company News Around the World" />
          <div className="flex flex-wrap gap-1 mb-2">
            {COUNTRIES_LIST.map((c) => (
              <button key={c.code} onClick={() => setCountryNewsCode(c.code)} className={`px-2.5 py-1 text-[9px] font-bold rounded ${countryNewsCode === c.code ? "bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950" : "bg-gray-100 dark:bg-gray-900 text-gray-550"}`}>{c.flag} {c.name}</button>
            ))}
          </div>
          <Card className="p-5 space-y-3">
            {(() => {
              const country = COUNTRIES_LIST.find((c) => c.code === countryNewsCode);
              const stories = ARTICLES.filter((a) => a.countryCode === countryNewsCode);
              return (
                <>
                  <h4 className="font-bold text-[11px] text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-800 pb-2">Latest Company News — {country?.name}</h4>
                  {stories.length === 0 ? <p className="text-[10px] text-gray-500 py-2">No company news indexed for this country yet.</p> :
                    stories.slice(0, 5).map((a) => (
                      <div key={a.id} className="flex items-center justify-between gap-3 py-2 border-b border-gray-50 dark:border-gray-855 last:border-0">
                        <Link href={articleHref(a.id)} className="font-bold text-[10px] text-gray-900 dark:text-white hover:text-amber-600 truncate">{a.headline}</Link>
                        <span className="text-[8px] text-gray-400 shrink-0">{a.company}</span>
                      </div>
                    ))}
                </>
              );
            })()}
          </Card>
        </section>

        {/* 20. AI News Summary */}
        <section className="space-y-3">
          <SectionTitle title="AI Summary" subtitle="Concise, source-linked takeaways from existing story data." />
          <Card className="p-5 space-y-3 border-l-4 border-amber-400">
            {(() => {
              const a = ARTICLES.find((x) => x.id === aiSummaryId) ?? featured;
              const whyMap: Record<string, string> = {
                "Product Launches": "Signals new revenue streams and competitive positioning.",
                Partnerships: "Expands market reach and shared capability.",
                Investments: "Reflects confidence and capital allocation priorities.",
                "M&A": "Reshapes competitive landscape and capacity.",
                Expansion: "Opens new geographic demand and distribution.",
                Announcements: "Marks a strategic milestone for the organization.",
                "Leadership Changes": "Indicates a shift in strategic direction.",
                "Financial Updates": "Demonstrates business momentum and health.",
                Certifications: "Unlocks regulated markets and trust.",
              };
              return (
                <>
                  <div className="flex items-center justify-between gap-2">
                    <Badge color="amber"><Sparkles className="h-2.5 w-2.5" /> AI Summary</Badge>
                    <span className="text-[8px] text-gray-400 font-bold uppercase">{a.category}</span>
                  </div>
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white">{a.headline}</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px]">
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 space-y-1"><span className="font-bold text-amber-600 uppercase text-[8px]">What happened</span><p className="text-gray-600 dark:text-gray-400">{a.summary}</p></div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 space-y-1"><span className="font-bold text-amber-600 uppercase text-[8px]">Why it matters</span><p className="text-gray-600 dark:text-gray-400">{whyMap[a.category] ?? "Relevant corporate development."}</p></div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 space-y-1"><span className="font-bold text-amber-600 uppercase text-[8px]">Companies involved</span><p className="text-gray-600 dark:text-gray-400">{a.company}</p></div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-3 space-y-1"><span className="font-bold text-amber-600 uppercase text-[8px]">Industry relevance</span><p className="text-gray-600 dark:text-gray-400">{a.industry}</p></div>
                  </div>
                  <p className="text-[9px] text-gray-400">Premium users receive deeper, multi-source AI briefings where supported.</p>
                </>
              );
            })()}
          </Card>
        </section>

        {/* 21. Recommended Company News */}
        <section className="space-y-3">
          <SectionTitle title="You May Also Like" subtitle="Recommended from followed companies, industries and topics." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ARTICLES.filter((a) => !savedIds.includes(a.id)).slice(0, 3).map((a) => (
              <Card key={a.id} className="p-4 space-y-2 hover:shadow-md transition-all">
                <Badge color="blue">{a.category}</Badge>
                <h4 className="font-bold text-[11px] text-gray-900 dark:text-white leading-snug"><Link href={articleHref(a.id)}>{a.headline}</Link></h4>
                <p className="text-[9px] text-gray-500">{a.company} · {a.industry}</p>
                <Link href={articleHref(a.id)} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">Read Story →</Link>
              </Card>
            ))}
          </div>
        </section>

        {/* 22. Follow Companies */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title="Follow Companies" subtitle="Get updates when companies publish important news." />
          {followedIds.length === 0 ? (
            <div className="text-center py-8 bg-gray-55 dark:bg-gray-955 rounded-2xl border border-dashed border-gray-205 dark:border-gray-850 p-4 space-y-2"><Star className="h-6 w-6 text-gray-300 mx-auto" /><p className="text-xs text-gray-500">You haven&apos;t followed any companies yet.</p><button onClick={() => setFollowedIds(["co-1", "co-3", "co-11"])} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-[9px] px-4 py-1.5 rounded-lg">Discover Companies</button></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {followedIds.map((id) => {
                const comp = COMPANIES.find((c) => c.id === id);
                if (!comp) return null;
                return (
                  <Card key={id} className="p-4 space-y-3 hover:shadow-md transition-all">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2"><div className="h-6 w-6 rounded bg-amber-50 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-[9px]">{comp.logoInitials}</div><div><h4 className="font-bold text-[11px] text-gray-900 dark:text-white leading-tight">{comp.name}</h4><p className="text-[8px] text-gray-400">{comp.industry}</p></div></div>
                      <button onClick={() => toggleFollow(id)} className="text-[8px] text-rose-500 font-bold hover:underline">Unfollow</button>
                    </div>
                    <p className="text-[9px] text-emerald-600 font-semibold">Get updates when this company publishes important news.</p>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        {/* 23. Company Alerts */}
        <section id="alerts-section" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs space-y-3">
          <SectionTitle title="Never Miss Important Company News" />
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3 text-[10px] font-bold text-gray-600 dark:text-gray-400">
              {([{ label: "Specific Company", key: "company" }, { label: "Industry", key: "industry" }, { label: "Country", key: "country" }, { label: "Product Launches", key: "launches" }, { label: "Partnerships", key: "partnerships" }, { label: "Investments", key: "investments" }, { label: "M&A", key: "ma" }, { label: "Expansion", key: "expansion" }] as const).map((opt) => (
                <label key={opt.key} className="flex items-center gap-1.5 cursor-pointer"><input type="checkbox" checked={alertsConfig[opt.key]} onChange={(e) => setAlertsConfig({ ...alertsConfig, [opt.key]: e.target.checked })} className="rounded text-amber-600" /> {opt.label}</label>
              ))}
            </div>
            <button onClick={createAlert} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-lg transition-colors w-full sm:w-auto text-center flex items-center justify-center gap-1.5"><Bell className="h-3.5 w-3.5" /> Create Alert</button>
          </div>
          {alertSuccess && <p className="text-[9px] text-emerald-500 font-bold animate-fadeIn">✓ Company news alerts successfully registered to your profile dashboard.</p>}
        </section>

        {/* 25. Personalized Company News */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title="Your Company News" subtitle="Because you follow Technology and Energy." />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {ARTICLES.filter((a) => a.industryId === "it-technology" || a.industryId === "renewable-energy").slice(0, 3).map((a) => (
              <Card key={a.id} className="p-4 space-y-2 hover:shadow-md transition-all">
                <Badge color="amber">{a.category}</Badge>
                <h4 className="font-bold text-[11px] text-gray-900 dark:text-white leading-snug"><Link href={articleHref(a.id)}>{a.headline}</Link></h4>
                <p className="text-[9px] text-gray-500">{a.company} · {a.industry}</p>
                <Link href={articleHref(a.id)} className="text-[9px] font-bold text-amber-600 hover:underline inline-flex items-center">Read Story →</Link>
              </Card>
            ))}
          </div>
        </section>

        {/* 26. Premium Company Intelligence */}
        <section className="bg-gradient-to-r from-slate-950 via-[#170e30] to-[#2b1754] text-white rounded-3xl p-6 md:p-8 border border-purple-900/60 flex flex-col md:flex-row justify-between items-center gap-6 shadow-lg">
          <div className="space-y-2">
            <span className="bg-purple-500/20 text-purple-300 text-[8px] font-bold px-2.5 py-1 rounded uppercase border border-purple-400/20 tracking-wider">iGEN Intelligence Hub</span>
            <h3 className="font-display font-black text-lg md:text-xl">Go Beyond the Headlines</h3>
            <p className="text-[10px] md:text-xs text-purple-200 max-w-lg leading-relaxed font-normal">AI-powered summaries, advanced news filters, historical company news, saved searches, premium alerts, activity timelines, comparisons and export.</p>
          </div>
          <Link href="/eoi" className="bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs px-6 py-3.5 rounded-xl transition-all hover:shadow-lg whitespace-nowrap">Unlock Company Intelligence</Link>
        </section>

        {/* 27. Sponsored Company Spotlight */}
        <section className="space-y-4">
          <SectionTitle title="Company Spotlight" subtitle="Commercial placement — sponsored stories are clearly labeled." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ARTICLES.filter((a) => a.sponsored).map((a) => (
              <Card key={a.id} className="p-5 border-l-4 border-amber-400 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge color="amber"><Sparkles className="h-2.5 w-2.5" /> SPONSORED</Badge>
                  <span className="text-[7px] font-bold text-gray-400 uppercase tracking-widest">Paid Story</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold text-sm">{a.logo}</div>
                  <div><h3 className="font-bold text-sm text-gray-900 dark:text-white">{a.company}</h3><p className="text-[9px] text-gray-500">{a.industry} · {a.country}</p></div>
                </div>
                <h4 className="font-bold text-[12px] text-gray-900 dark:text-white leading-snug"><Link href={articleHref(a.id)}>{a.headline}</Link></h4>
                <div className="flex gap-2 pt-1">
                  <Link href={articleHref(a.id)} className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 font-bold text-xs px-4 py-2 rounded-lg">Read Story</Link>
                  <Link href={companyProfileHref({ tier: (COMPANIES.find(c => c.id === a.companyId)?.tier) ?? "top", id: a.companyId })} className="border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold text-[10px] px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">View Company →</Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* 28. Publish Company News */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title="Publish Your Company News" />
          <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">Share announcements, launches, partnerships and business updates with the iGEN audience. Submit → Review → Approve → Publish.</p>
          <div className="flex flex-col sm:flex-row gap-3 text-xs font-bold">
            <Link href="/eoi" className="bg-gradient-to-r from-amber-500 to-orange-600 text-gray-950 px-6 py-3 rounded-xl hover:shadow-md transition-all flex items-center justify-center gap-1.5"><Megaphone className="h-4 w-4" /> Publish Company News</Link>
            <Link href="/eoi" className="border border-gray-200 dark:border-gray-700 text-gray-650 dark:text-gray-400 hover:bg-gray-55 px-6 py-3 rounded-xl transition-all">Explore Publishing Plans</Link>
          </div>
        </section>

        {/* 29. Business Lead Generation */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-6 rounded-3xl shadow-xs space-y-4">
          <SectionTitle title="Start a Business Conversation" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[{ label: "Contact Company", icon: Mail }, { label: "Send Business Enquiry", icon: Send }, { label: "Request Quote", icon: FileText }, { label: "Request Meeting", icon: Calendar }].map((b, i) => {
              const BIcon = b.icon;
              return (
                <button key={i} onClick={() => { const c = COMPANIES.find(x => x.id === "co-3"); window.location.href = `/eoi`; }} className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-amber-400 hover:bg-amber-50/40 transition-all">
                  <BIcon className="h-5 w-5 text-amber-600" /><span className="text-[9px] font-bold text-gray-700 dark:text-gray-300 text-center">{b.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 30. Newsletter */}
        <section className="bg-gradient-to-br from-amber-500 via-orange-600 to-[#b45309] text-white rounded-3xl p-6 md:p-8 border border-amber-400/40 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-2">
            <span className="bg-white/20 text-white text-[8px] font-bold px-2 py-1 rounded uppercase border border-white/20">Daily Brief</span>
            <h3 className="font-display font-black text-lg md:text-xl">Top Company News — Daily Brief</h3>
            <p className="text-[11px] text-white/85 max-w-lg leading-relaxed">Get the most important company developments delivered to your inbox.</p>
          </div>
          <form onSubmit={submitNewsletter} className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
            <input type="email" required value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="you@company.com" className="bg-white/15 border border-white/25 rounded-lg px-3 py-2.5 text-xs text-white outline-none placeholder-white/70" />
            <button type="submit" className="bg-white text-gray-950 font-bold text-xs px-6 py-2.5 rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center justify-center gap-1.5"><Mail className="h-3.5 w-3.5" /> Subscribe</button>
          </form>
          {newsletterDone && <p className="text-[9px] text-white font-bold w-full md:w-auto">✓ You&apos;re subscribed to the Top Company News Daily Brief.</p>}
        </section>

      </div>
    </div>
  );
}


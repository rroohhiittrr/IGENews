"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2, CheckCircle, Crown, Search, TrendingUp, ChevronRight,
  ArrowLeft, Star, Globe, Briefcase, MapPin, Users, BarChart2,
  Mail, Phone, Calendar, Download, Shield, Lock, Eye, Share2,
  Bookmark, Award, FileText, Sparkles, Filter, Plus, ExternalLink,
  MessageSquare, Target, Zap, BarChart, PieChart, Activity
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Tier = "registered" | "verified" | "top";
type SubMenu = "pages" | "news" | "sector" | "all";

interface Props {
  tier: Tier;
  submenu: SubMenu;
}

// ─── Tier Config ─────────────────────────────────────────────────────────────
const TIER_CONFIG = {
  registered: {
    label: "Registered",
    sublabel: "Free Tier",
    tagline: "Basic Visibility · Limited Features",
    icon: Building2,
    color: "blue",
    gradFrom: "from-blue-600",
    gradTo: "to-indigo-700",
    bgCard: "bg-blue-50 dark:bg-blue-950/10",
    borderCard: "border-blue-200 dark:border-blue-900",
    badgeBg: "bg-blue-600",
    textAccent: "text-blue-600",
    btnPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
    btnOutline: "border-blue-300 text-blue-600 hover:bg-blue-50",
    verifiedBadge: false,
    publishLimit: "5 articles/month",
    analyticsLevel: "None",
    leadGen: "Basic Form",
    searchRank: "Standard"
  },
  verified: {
    label: "Verified",
    sublabel: "Pro Tier",
    tagline: "More Visibility · More Features",
    icon: CheckCircle,
    color: "emerald",
    gradFrom: "from-emerald-500",
    gradTo: "to-teal-600",
    bgCard: "bg-emerald-50 dark:bg-emerald-950/10",
    borderCard: "border-emerald-200 dark:border-emerald-900",
    badgeBg: "bg-emerald-600",
    textAccent: "text-emerald-600",
    btnPrimary: "bg-emerald-600 hover:bg-emerald-700 text-white",
    btnOutline: "border-emerald-300 text-emerald-600 hover:bg-emerald-50",
    verifiedBadge: true,
    publishLimit: "Unlimited",
    analyticsLevel: "Basic Analytics",
    leadGen: "Advanced Form",
    searchRank: "Higher"
  },
  top: {
    label: "Enterprise",
    sublabel: "Top Companies",
    tagline: "Maximum Visibility · Premium Benefits",
    icon: Crown,
    color: "amber",
    gradFrom: "from-amber-500",
    gradTo: "to-orange-600",
    bgCard: "bg-amber-50 dark:bg-amber-950/10",
    borderCard: "border-amber-200 dark:border-amber-900",
    badgeBg: "bg-gradient-to-r from-amber-500 to-orange-600",
    textAccent: "text-amber-600",
    btnPrimary: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-gray-950",
    btnOutline: "border-amber-300 text-amber-600 hover:bg-amber-50",
    verifiedBadge: true,
    publishLimit: "Unlimited + Sponsored",
    analyticsLevel: "Advanced + CRM",
    leadGen: "CRM Integration",
    searchRank: "Top Priority"
  }
} as const;

const SUBMENU_LABELS: Record<SubMenu, string> = {
  pages: "Company Pages",
  news: "Company News",
  sector: "By Sector",
  all: "All Sectors"
};

// ─── Sample company data per tier ───────────────────────────────────────────
const COMPANY_PROFILES: Record<Tier, any> = {
  registered: {
    name: "Sunrise Agro Exports Pvt. Ltd.",
    tagline: "Quality Agricultural Produce from the Heart of India",
    logo: "SA",
    industry: "Agriculture & Food Processing",
    location: "Pune, Maharashtra",
    country: "India",
    founded: "2018",
    employees: "85",
    revenue: "₹12 Cr",
    about: "Sunrise Agro Exports is a registered agro-processing company specialising in fresh produce, spices, and packaged foods for domestic and export markets.",
    mission: "Delivering fresh, high-quality agricultural products through ethical sourcing.",
    vision: "To become a preferred agro-export brand from Western India by 2028.",
    products: ["Organic Spices", "Fresh Vegetables", "Packaged Foods", "Export Fruits"],
    website: "sunriseagro.in",
    phone: "+91-20-4567-8901",
    email: "info@sunriseagro.in"
  },
  verified: {
    name: "NexusTech Logistics Solutions",
    tagline: "Smarter Supply Chains, Faster Deliveries Across APAC",
    logo: "NL",
    industry: "Logistics & Supply Chain",
    location: "Bengaluru, Karnataka",
    country: "India",
    founded: "2015",
    employees: "1,240",
    revenue: "₹180 Cr",
    about: "NexusTech is a Pro-Verified logistics company delivering AI-driven supply chain management, warehousing, and last-mile solutions for enterprise clients.",
    mission: "Reducing delivery friction with technology-first logistics.",
    vision: "Connecting India's manufacturing sector to global markets by 2030.",
    products: ["Warehousing Solutions", "Last-Mile Delivery", "AI Route Optimisation", "Cold Chain Logistics"],
    website: "nexustech.in",
    phone: "+91-80-7654-3210",
    email: "bizdev@nexustech.in"
  },
  top: {
    name: "Adani Green Energy Ltd.",
    tagline: "Powering India's Clean Energy Revolution at Scale",
    logo: "AG",
    industry: "Renewable Energy",
    location: "Ahmedabad, Gujarat",
    country: "India",
    founded: "2015",
    employees: "5,200+",
    revenue: "$1.8B+",
    about: "Adani Green Energy is India's largest solar energy producer and one of the world's fastest growing renewable energy platforms with over 20 GW operational capacity.",
    mission: "Accelerating the global transition to clean, affordable energy.",
    vision: "50 GW renewable portfolio by 2030, powering 100 million homes.",
    products: ["Solar Energy", "Wind Energy", "Hybrid Power", "Energy Storage"],
    website: "adanigreenenergy.com",
    phone: "+91-79-2555-6789",
    email: "investor@adanigreen.com"
  }
};

const SAMPLE_NEWS: Record<Tier, any[]> = {
  registered: [
    { id: "r1", title: "Sunrise Agro Launches New Export-Grade Spice Line for Gulf Markets", date: "3 days ago", views: 480, category: "Product Launch", featured: false },
    { id: "r2", title: "Company Achieves FSSAI Gold Certification for Export Standards", date: "1 week ago", views: 290, category: "Announcement", featured: false }
  ],
  verified: [
    { id: "v1", title: "NexusTech Signs 3-Year Contract with Maruti Suzuki for Pan-India Logistics", date: "1 hr ago", views: 4200, category: "Deal Announcement", featured: true },
    { id: "v2", title: "AI-Powered Route Optimization Platform Reduces Delivery Times by 22%", date: "1 day ago", views: 2100, category: "Product Launch", featured: false },
    { id: "v3", title: "Q2 Revenue Grows 34% YoY as E-commerce Logistics Demand Accelerates", date: "3 days ago", views: 1800, category: "Financial Update", featured: false }
  ],
  top: [
    { id: "t1", title: "Adani Green Breaks World Record with 20 GW Operational Solar Capacity", date: "30 mins ago", views: 48200, category: "Milestone", featured: true, sponsored: true },
    { id: "t2", title: "Joint Venture with TotalEnergies to Build 2 GW Wind Farm in Rajasthan", date: "4 hrs ago", views: 31000, category: "Partnership", featured: true, sponsored: false },
    { id: "t3", title: "Board Approves ₹45,000 Cr Greenfield Solar Investment for FY26-27", date: "1 day ago", views: 24500, category: "Investment", featured: false, sponsored: false },
    { id: "t4", title: "Adani Green Rated Among Top 10 ESG Performers in Asia by MSCI 2025", date: "2 days ago", views: 18700, category: "ESG", featured: false, sponsored: false }
  ]
};

const SECTOR_DATA = [
  { name: "Steel & Metallurgy", count: 142, growth: "+12%", topCo: "Tata Steel", icon: "⚙️", featured: false },
  { name: "Automotive & EV", count: 218, growth: "+28%", topCo: "Mahindra Electric", icon: "🚗", featured: true },
  { name: "Pharmaceuticals", count: 195, growth: "+8%", topCo: "Cipla Ltd.", icon: "💊", featured: false },
  { name: "Renewable Energy", count: 174, growth: "+42%", topCo: "Adani Green", icon: "⚡", featured: true },
  { name: "Logistics", count: 231, growth: "+19%", topCo: "Mahindra Logistics", icon: "🚢", featured: false },
  { name: "IT & Technology", count: 312, growth: "+35%", topCo: "Infosys BPM", icon: "💻", featured: true },
  { name: "Agriculture", count: 158, growth: "+7%", topCo: "ITC Agri", icon: "🌾", featured: false },
  { name: "Chemicals", count: 124, growth: "+11%", topCo: "Deepak Nitrite", icon: "🧪", featured: false },
  { name: "Textiles", count: 186, growth: "+5%", topCo: "Welspun India", icon: "🧵", featured: false },
  { name: "Defence & Aerospace", count: 68, growth: "+22%", topCo: "HAL India", icon: "✈️", featured: false },
  { name: "FMCG", count: 244, growth: "+14%", topCo: "HUL India", icon: "🛒", featured: true },
  { name: "Healthcare", count: 203, growth: "+16%", topCo: "Apollo Hospitals", icon: "🏥", featured: false }
];

const LEADERSHIP: Record<Tier, any[]> = {
  registered: [
    { name: "Rajesh Patil", role: "Managing Director", initial: "RP" },
    { name: "Sneha Kulkarni", role: "Head of Operations", initial: "SK" }
  ],
  verified: [
    { name: "Arjun Mehta", role: "CEO & Co-Founder", initial: "AM" },
    { name: "Divya Nair", role: "CTO", initial: "DN" },
    { name: "Rohan Kapoor", role: "VP Sales & BD", initial: "RK" }
  ],
  top: [
    { name: "Gautam Adani", role: "Chairman", initial: "GA" },
    { name: "Vneet Jaain", role: "MD & CEO", initial: "VJ" },
    { name: "Sagar Adani", role: "Executive Director", initial: "SA" },
    { name: "Kaushal Shah", role: "CFO", initial: "KS" }
  ]
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function NewsPOCCompanyNewsSubmenu({ tier, submenu }: Props) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [activeSectorFilter, setActiveSectorFilter] = useState("all");

  const tc = TIER_CONFIG[tier];
  const TierIcon = tc.icon;
  const company = COMPANY_PROFILES[tier];
  const news = SAMPLE_NEWS[tier];
  const leadership = LEADERSHIP[tier];

  const tierPath = `/en/news-poc/company-news`;

  // ─── Sub-menu tab strip ──────────────────────────────────────────────────
  const SubMenuTabs = () => (
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="flex items-center gap-2 py-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-300 transition-all mr-1"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {/* Tier badge */}
        <div className={`bg-gradient-to-r ${tc.gradFrom} ${tc.gradTo} text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0`}>
          <TierIcon className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold">{tc.label}</span>
        </div>

        <span className="text-gray-300 dark:text-gray-700">/</span>

        {/* Sub-menu tabs */}
        <div className="flex gap-1 flex-wrap">
          {(["pages", "news", "sector", "all"] as SubMenu[]).map((sm) => (
            <button
              key={sm}
              onClick={() => router.push(`${tierPath}/${tier}/${sm}`)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                submenu === sm
                  ? `${tc.badgeBg} text-white shadow-xs`
                  : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-700"
              }`}
            >
              {SUBMENU_LABELS[sm]}
            </button>
          ))}
        </div>

        {/* Tier switcher */}
        <div className="ml-auto flex gap-1 bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
          {(["registered", "verified", "top"] as Tier[]).map((t) => (
            <button
              key={t}
              onClick={() => router.push(`${tierPath}/${t}/${submenu}`)}
              className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition-all ${
                tier === t
                  ? "bg-white dark:bg-gray-800 shadow-xs text-gray-900 dark:text-white"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {TIER_CONFIG[t].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // ─── Upgrade Banner (shows for registered, partial for verified) ─────────
  const UpgradeBanner = ({ variant = "full" }: { variant?: "full" | "inline" }) => {
    if (tier === "top") return null;
    const nextTier = tier === "registered" ? "verified" : "top";
    const ntc = TIER_CONFIG[nextTier];
    return (
      <div className={`${variant === "full" ? "p-6 rounded-2xl" : "p-4 rounded-xl"} bg-gradient-to-r from-slate-950 to-[#162d54] text-white border border-slate-800 space-y-3`}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <span className={`text-[9px] font-bold uppercase tracking-widest ${ntc.textAccent}`}>
              Upgrade to {ntc.label}
            </span>
            <h4 className={`font-bold ${variant === "full" ? "text-sm" : "text-xs"} text-white`}>
              Unlock {ntc.analyticsLevel}, {ntc.leadGen}, and more
            </h4>
            <p className="text-slate-400 text-[10px] font-normal">
              {tier === "registered"
                ? "Get your Verified Badge, unlimited news publishing, and advanced lead generation."
                : "Go Enterprise for CRM integration, sponsored news, homepage priority, and dedicated support."}
            </p>
          </div>
          <Lock className="h-5 w-5 text-slate-600 shrink-0" />
        </div>
        <Link href="/eoi" className={`${ntc.btnPrimary} font-bold text-xs px-4 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all`}>
          <Sparkles className="h-3 w-3" /> Upgrade Now
        </Link>
      </div>
    );
  };

  // ══════════════════════════════════════════════════════════════════════════
  // VIEW 1 ── COMPANY PAGES (Professional Digital Profile)
  // ══════════════════════════════════════════════════════════════════════════
  if (submenu === "pages") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />

        {/* Hero Section */}
        <section className={`bg-gradient-to-br ${tc.gradFrom} ${tc.gradTo} text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=60')] bg-cover" />
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-10 lg:px-6">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Logo */}
              <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center font-display text-2xl font-extrabold text-white shadow-lg shrink-0">
                {company.logo}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-display text-2xl md:text-3xl font-bold">{company.name}</h1>
                  {tc.verifiedBadge && (
                    <span className="bg-white/20 border border-white/30 text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <CheckCircle className="h-2.5 w-2.5" /> {tc.label === "Enterprise" ? "Top Company" : "Verified"}
                    </span>
                  )}
                  {tier === "registered" && (
                    <span className="bg-white/10 border border-white/20 text-white text-[8px] font-bold px-2 py-0.5 rounded-full">
                      Registered
                    </span>
                  )}
                </div>
                <p className="text-white/80 text-sm font-normal">{company.tagline}</p>
                <div className="flex flex-wrap gap-3 text-[10px] font-semibold text-white/70">
                  <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{company.industry}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{company.location}</span>
                  <span className="flex items-center gap-1"><Globe className="h-3 w-3" />{company.website}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />Est. {company.founded}</span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0 flex-wrap">
                <button className="bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5">
                  <Bookmark className="h-3.5 w-3.5" /> Follow
                </button>
                <button className="bg-white/20 hover:bg-white/30 border border-white/30 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5">
                  <Share2 className="h-3.5 w-3.5" /> Share
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6">
          <div className="grid grid-cols-12 gap-8">

            {/* Left (main) */}
            <div className="col-span-12 lg:col-span-8 space-y-8">

              {/* Company Overview */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4 shadow-xs">
                <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-850 pb-3">Company Overview</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{company.about}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="bg-gray-50 dark:bg-gray-955 rounded-xl p-4 space-y-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">Mission</span>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-normal">{company.mission}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-955 rounded-xl p-4 space-y-1">
                    <span className="text-[9px] font-bold text-gray-400 uppercase">Vision</span>
                    <p className="text-xs text-gray-700 dark:text-gray-300 font-normal">{company.vision}</p>
                  </div>
                </div>
                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-3 border-t border-gray-100 dark:border-gray-850 pt-4">
                  {[
                    { label: "Employees", val: company.employees, icon: Users },
                    { label: "Revenue", val: company.revenue, icon: BarChart2 },
                    { label: "Founded", val: company.founded, icon: Calendar }
                  ].map((s, idx) => {
                    const SIcon = s.icon;
                    return (
                      <div key={idx} className="text-center">
                        <SIcon className={`h-4 w-4 mx-auto mb-1 ${tc.textAccent}`} />
                        <div className="font-bold text-sm text-gray-950 dark:text-white">{s.val}</div>
                        <div className="text-[9px] text-gray-450">{s.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Products & Services */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-3">
                  <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Products & Services</h2>
                  {tier !== "registered" && (
                    <button className="text-[9px] font-bold text-blue-500 border border-blue-200 dark:border-blue-900 px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1">
                      <Download className="h-2.5 w-2.5" /> Download Catalogue
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {company.products.map((prod: string, idx: number) => (
                    <div key={idx} className={`${tc.bgCard} ${tc.borderCard} border p-3 rounded-xl text-center`}>
                      <div className={`h-8 w-8 rounded-full ${tc.badgeBg} flex items-center justify-center mx-auto mb-2`}>
                        <Award className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 block">{prod}</span>
                    </div>
                  ))}
                </div>
                {tier === "registered" && (
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-3 rounded-lg flex items-center gap-2">
                    <Lock className="h-4 w-4 text-blue-500 shrink-0" />
                    <span className="text-[10px] font-semibold text-blue-600">Gallery & Brochure downloads available for Verified and Enterprise companies.</span>
                    <Link href="/eoi" className="ml-auto text-[9px] font-bold text-blue-600 hover:underline whitespace-nowrap">Upgrade →</Link>
                  </div>
                )}
              </div>

              {/* Leadership Team */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4 shadow-xs">
                <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-850 pb-3">Leadership Team</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {leadership.map((person: any, idx: number) => (
                    <div key={idx} className="text-center space-y-2">
                      <div className={`h-14 w-14 rounded-2xl ${tc.badgeBg} flex items-center justify-center font-display text-lg font-bold text-white mx-auto`}>
                        {person.initial}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-gray-900 dark:text-white block">{person.name}</span>
                        <span className="text-[9px] text-gray-450">{person.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Gallery (locked for registered) */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-4 shadow-xs">
                <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-850 pb-3">Company Gallery</h2>
                {tier === "registered" ? (
                  <div className="relative">
                    <div className="grid grid-cols-3 gap-3 blur-xs pointer-events-none">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-xl" />
                      ))}
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 dark:bg-gray-900/70 rounded-xl">
                      <Lock className="h-6 w-6 text-gray-500 mb-2" />
                      <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Gallery unlocked for Verified+</span>
                      <Link href="/eoi" className="mt-2 bg-emerald-500 text-white font-bold text-[10px] px-3 py-1 rounded">Upgrade to Verified</Link>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&auto=format&fit=crop",
                      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop"
                    ].map((src, idx) => (
                      <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-gray-200">
                        <img src={src} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-6">

              {/* Lead Generation Block */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
                <div className={`bg-gradient-to-r ${tc.gradFrom} ${tc.gradTo} text-white p-4`}>
                  <h3 className="font-bold text-sm">Get in Touch</h3>
                  <p className="text-[10px] text-white/75 mt-0.5">Lead Generation · {tc.leadGen}</p>
                </div>
                <div className="p-4 space-y-3">
                  <div className="space-y-2">
                    <input type="text" placeholder="Your Name" className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-955 outline-none focus:border-blue-500" />
                    <input type="email" placeholder="Work Email" className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-955 outline-none focus:border-blue-500" />
                    <input type="text" placeholder="Company Name" className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-955 outline-none focus:border-blue-500" />
                    {(tier === "verified" || tier === "top") && (
                      <select className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-955 outline-none">
                        <option>Request a Quote</option>
                        <option>Schedule Meeting</option>
                        <option>General Inquiry</option>
                        {tier === "top" && <option>Partnership Proposal</option>}
                        {tier === "top" && <option>Investor Relations</option>}
                      </select>
                    )}
                    <textarea rows={3} placeholder="Your message..." className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-955 outline-none focus:border-blue-500 resize-none" />
                  </div>
                  <button className={`w-full ${tc.btnPrimary} font-bold text-xs py-2.5 rounded-lg transition-all`}>
                    {tier === "top" ? "Submit & Connect" : tier === "verified" ? "Request Quote / Meeting" : "Send Inquiry"}
                  </button>

                  {/* Contact info */}
                  <div className="border-t border-gray-100 dark:border-gray-850 pt-3 space-y-1.5 text-[10px] text-gray-500">
                    <div className="flex items-center gap-2"><Phone className="h-3 w-3" />{company.phone}</div>
                    <div className="flex items-center gap-2"><Mail className="h-3 w-3" />{company.email}</div>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-xs space-y-3">
                <h4 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-gray-850 pb-2">Business Information</h4>
                <div className="space-y-2 text-xs">
                  {[
                    { label: "Industry", val: company.industry },
                    { label: "Location", val: company.location },
                    { label: "Founded", val: company.founded },
                    { label: "Employees", val: company.employees },
                    { label: "Listing Tier", val: tc.label },
                    { label: "Search Ranking", val: tc.searchRank }
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span className="text-gray-500 font-semibold">{row.label}</span>
                      <span className="text-gray-900 dark:text-white font-bold">{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics preview */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-2xl shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-850 pb-2">
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Analytics</h4>
                  {tier === "registered" && <Lock className="h-3.5 w-3.5 text-gray-400" />}
                </div>
                {tier === "registered" ? (
                  <div className="text-center space-y-2 py-4">
                    <Lock className="h-8 w-8 text-gray-300 mx-auto" />
                    <p className="text-xs text-gray-400">Analytics unlocked for Verified tier</p>
                    <Link href="/eoi" className="text-[10px] font-bold text-blue-500 hover:underline">Upgrade Now →</Link>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {[
                      { label: "Profile Views (7d)", val: tier === "top" ? "14,280" : "2,340", change: "+18%" },
                      { label: "Inquiries This Month", val: tier === "top" ? "142" : "28", change: "+31%" },
                      { label: "News Impressions", val: tier === "top" ? "48,200" : "8,100", change: "+22%" }
                    ].map((stat, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-500">{stat.label}</span>
                        <div className="text-right">
                          <span className="font-bold text-xs text-gray-900 dark:text-white block">{stat.val}</span>
                          <span className="text-[9px] font-bold text-emerald-500">{stat.change}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Upgrade CTA */}
              <UpgradeBanner />

            </div>
          </div>
        </section>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // VIEW 2 ── COMPANY NEWS (News Publishing Hub)
  // ══════════════════════════════════════════════════════════════════════════
  if (submenu === "news") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />

        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 space-y-8">

          {/* Header + Publish CTA */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-xl font-bold text-gray-900 dark:text-white">{company.name} · News</h1>
              <p className="text-xs text-gray-500 mt-0.5">Publishing: <span className={`font-bold ${tc.textAccent}`}>{tc.publishLimit}</span></p>
            </div>
            <div className="flex gap-2">
              {tier === "registered" ? (
                <Link href="/eoi" className="border border-gray-200 dark:border-gray-700 text-gray-500 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 opacity-60 cursor-not-allowed">
                  <Lock className="h-3.5 w-3.5" /> Publish Article (Upgrade)
                </Link>
              ) : (
                <Link href="/eoi" className={`${tc.btnPrimary} font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all`}>
                  <Plus className="h-3.5 w-3.5" /> Publish Company News
                </Link>
              )}
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-wrap gap-3 items-center shadow-xs">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search news..." className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-blue-500" />
            </div>
            {["All Categories", "Product Launch", "Announcement", "Financial", "ESG", "Partnership"].map((cat) => (
              <button key={cat} className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold px-3 py-1.5 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-6">

              {/* Featured News */}
              {news.some((n: any) => n.featured) && (
                <div className="space-y-3">
                  <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 pb-2">Featured News</h3>
                  {news.filter((n: any) => n.featured).map((article: any) => (
                    <div key={article.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
                      <div className={`h-40 bg-gradient-to-r ${tc.gradFrom} ${tc.gradTo} relative flex items-end p-5`}>
                        <div>
                          <span className={`bg-white/20 text-white text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-wider`}>{article.category}</span>
                          {article.sponsored && <span className="ml-1.5 bg-amber-400 text-gray-950 text-[7px] font-bold px-1.5 py-0.5 rounded">SPONSORED</span>}
                        </div>
                      </div>
                      <div className="p-5 space-y-2">
                        <h4 className="font-bold text-sm text-gray-950 dark:text-white leading-snug hover:text-blue-500 transition-colors cursor-pointer">{article.title}</h4>
                        <div className="flex items-center justify-between text-[10px] text-gray-400">
                          <span>{article.date}</span>
                          <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {typeof article.views === 'number' ? article.views.toLocaleString() : article.views} views</span>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <Link href="/eoi" className={`${tc.btnPrimary} font-bold text-[10px] px-4 py-1.5 rounded-lg transition-all`}>Read Full Story</Link>
                          <button className="border border-gray-200 dark:border-gray-700 text-gray-500 font-bold text-[10px] px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1"><Share2 className="h-3 w-3" /> Share</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Latest News Feed */}
              <div className="space-y-3">
                <h3 className="font-display text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-200 dark:border-gray-800 pb-2">Latest News Feed</h3>
                <div className="space-y-3">
                  {news.map((article: any) => (
                    <div key={article.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm transition-all group">
                      <div className="flex items-start gap-3">
                        <div className={`h-10 w-10 rounded-xl ${tc.badgeBg} flex items-center justify-center font-display text-sm font-bold text-white shrink-0`}>
                          {company.logo}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${tc.bgCard} ${tc.textAccent} border ${tc.borderCard}`}>{article.category}</span>
                            {article.sponsored && <span className="text-[7px] font-bold bg-amber-50 text-amber-600 border border-amber-200 px-1.5 py-0.5 rounded">SPONSORED</span>}
                          </div>
                          <h4 className="text-xs font-bold text-gray-950 dark:text-white leading-snug group-hover:text-blue-500 transition-colors">{article.title}</h4>
                          <div className="flex items-center justify-between text-[9px] text-gray-400">
                            <span>{article.date}</span>
                            <div className="flex items-center gap-2">
                              <span className="flex items-center gap-0.5"><Eye className="h-2.5 w-2.5" /> {typeof article.views === 'number' ? article.views.toLocaleString() : article.views}</span>
                              <Link href="/eoi" className="text-blue-500 font-bold hover:underline">Read →</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {tier === "registered" && (
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-5 rounded-xl text-center space-y-2">
                  <Lock className="h-6 w-6 text-blue-400 mx-auto" />
                  <p className="text-xs font-bold text-blue-600">You can publish up to 5 articles per month.</p>
                  <p className="text-[10px] text-blue-500">Upgrade to Verified for unlimited publishing + media gallery.</p>
                  <Link href="/eoi" className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2 rounded-lg inline-block transition-colors">Upgrade to Verified</Link>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-5">

              {/* Publish stats */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3 shadow-xs">
                <h4 className="font-bold text-xs text-gray-900 dark:text-white uppercase border-b border-gray-100 dark:border-gray-850 pb-2">Publishing Dashboard</h4>
                <div className="space-y-2">
                  {[
                    { label: "Articles Published", val: tier === "top" ? "124" : tier === "verified" ? "38" : "5/5" },
                    { label: "Total Views", val: tier === "top" ? "1.2M" : tier === "verified" ? "42K" : "1,840" },
                    { label: "Avg. Read Time", val: "4.2 min" },
                    { label: "Sponsored Slots", val: tier === "top" ? "4 Active" : "Upgrade Required" }
                  ].map((s, idx) => (
                    <div key={idx} className="flex justify-between text-xs">
                      <span className="text-gray-500">{s.label}</span>
                      <span className={`font-bold ${s.val === "Upgrade Required" ? "text-gray-400" : "text-gray-900 dark:text-white"}`}>{s.val}</span>
                    </div>
                  ))}
                </div>
                <UpgradeBanner variant="inline" />
              </div>

              {/* Trending Topics */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 space-y-3 shadow-xs">
                <h4 className="font-bold text-xs text-gray-900 dark:text-white uppercase border-b border-gray-100 dark:border-gray-850 pb-2">Trending in Your Sector</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["#RenewableEnergy", "#SolarPower", "#CleanTech", "#ESG2025", "#NetZero", "#GreenBonds"].map((tag, idx) => (
                    <span key={idx} className="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-2 py-0.5 rounded-full text-[9px] font-bold text-blue-600 hover:bg-blue-50 cursor-pointer">{tag}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // VIEW 3 ── BY SECTOR (Company Discovery by Industry)
  // ══════════════════════════════════════════════════════════════════════════
  if (submenu === "sector") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />

        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-xl font-bold text-gray-900 dark:text-white">Browse Companies by Sector</h1>
              <p className="text-xs text-gray-500 mt-0.5">Discover and compare companies across all industries on the {tc.label} tier</p>
            </div>
            <Link href="/eoi" className={`${tc.btnPrimary} font-bold text-xs px-5 py-2.5 rounded-lg transition-all flex items-center gap-1.5`}>
              <Plus className="h-3.5 w-3.5" /> Register Your Business
            </Link>
          </div>

          {/* Industry Search */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-wrap gap-3 shadow-xs">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input type="text" placeholder="Search industries..." className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-blue-500" />
            </div>
            <select className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 text-xs outline-none">
              <option>All Regions</option>
              <option>India</option>
              <option>APAC</option>
              <option>Global</option>
            </select>
            <select className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 text-xs outline-none">
              <option>Company Size</option>
              <option>Startup (1–50)</option>
              <option>SME (51–500)</option>
              <option>Enterprise (500+)</option>
            </select>
          </div>

          {/* Sector Cards */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {SECTOR_DATA.map((sector, idx) => (
                  <Link key={idx} href="/eoi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl hover:shadow-md hover:border-blue-300 dark:hover:border-blue-800 transition-all group space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{sector.icon}</span>
                      {sector.featured && (
                        <span className={`text-[7px] font-bold px-1.5 py-0.5 rounded-full ${tc.badgeBg} text-white`}>FEATURED</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{sector.name}</h4>
                      <p className="text-[9px] text-gray-450 mt-0.5">{sector.count} companies</p>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-50 dark:border-gray-850 pt-2">
                      <span className="text-[9px] text-gray-500">Top: <span className="font-bold text-gray-700 dark:text-gray-300">{sector.topCo}</span></span>
                      <span className="text-[9px] font-bold text-emerald-500">{sector.growth}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar - Industry Insights */}
            <div className="col-span-12 lg:col-span-4 space-y-5">

              {/* Top Companies in Sector */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-xs">
                <div className={`bg-gradient-to-r ${tc.gradFrom} ${tc.gradTo} text-white p-3 flex items-center justify-between`}>
                  <span className="font-bold text-xs">Top Companies This Week</span>
                  <TrendingUp className="h-3.5 w-3.5" />
                </div>
                <div className="divide-y divide-gray-50 dark:divide-gray-850">
                  {[
                    { name: "Tata Steel", sector: "Steel", rank: 1 },
                    { name: "Adani Green", sector: "Energy", rank: 2 },
                    { name: "Infosys BPM", sector: "IT", rank: 3 },
                    { name: "Mahindra Logistics", sector: "Logistics", rank: 4 }
                  ].map((comp, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                      <span className="font-display text-sm font-extrabold text-gray-200 dark:text-gray-800 w-5">{comp.rank}</span>
                      <div className={`h-7 w-7 rounded-lg ${tc.badgeBg} flex items-center justify-center text-white font-bold text-[10px]`}>{comp.name[0]}</div>
                      <div>
                        <span className="font-bold text-[10px] text-gray-900 dark:text-white block">{comp.name}</span>
                        <span className="text-[8px] text-gray-450">{comp.sector}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Industry Insights */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-4 rounded-xl shadow-xs space-y-3">
                <h4 className="font-bold text-xs text-gray-900 dark:text-white uppercase border-b border-gray-100 dark:border-gray-850 pb-2">Industry Insights</h4>
                <div className="space-y-3">
                  {[
                    { label: "Fastest Growing", val: "Renewable Energy (+42%)", icon: Zap },
                    { label: "Most Companies", val: "IT & Technology (312)", icon: Building2 },
                    { label: "Most Verified", val: "Pharmaceuticals (82%)", icon: CheckCircle }
                  ].map((insight, idx) => {
                    const IIcon = insight.icon;
                    return (
                      <div key={idx} className="flex items-start gap-2">
                        <IIcon className={`h-4 w-4 shrink-0 ${tc.textAccent} mt-0.5`} />
                        <div>
                          <span className="text-[9px] text-gray-400 font-semibold block">{insight.label}</span>
                          <span className="text-[10px] font-bold text-gray-900 dark:text-white">{insight.val}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <UpgradeBanner />
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // VIEW 4 ── ALL SECTORS (Full Industry Directory)
  // ══════════════════════════════════════════════════════════════════════════
  if (submenu === "all") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />

        <section className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-xl font-bold text-gray-900 dark:text-white">All Sectors · Industry Directory</h1>
              <p className="text-xs text-gray-500 mt-0.5">Every industry on the IGEN platform — {tc.label} tier view</p>
            </div>
            <div className="flex gap-2 text-xs font-bold">
              <span className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300">12 Industries</span>
              <span className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300">12,400+ Companies</span>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-wrap gap-3 shadow-xs">
            <div className="relative flex-1 min-w-52">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input type="text" placeholder="Search all industries..." className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-blue-500" />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {["All", "Trending", "Featured", "High Growth"].map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveSectorFilter(f.toLowerCase())}
                  className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors ${activeSectorFilter === f.toLowerCase() ? `${tc.badgeBg} text-white` : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-700"}`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Sectors banner */}
          {tier !== "registered" && (
            <div className={`bg-gradient-to-r ${tc.gradFrom} ${tc.gradTo} text-white p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4`}>
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Featured Sector Placement</span>
                <h3 className="font-display text-lg font-bold">Your sector featured at the top of all listings</h3>
                <p className="text-white/70 text-xs font-normal">{tier === "top" ? "Maximum homepage visibility + sponsored placement" : "Limited featured placement — upgrade to Enterprise for top-of-page priority"}</p>
              </div>
              <Link href="/eoi" className="bg-white text-gray-950 hover:bg-gray-100 font-bold text-xs px-5 py-2.5 rounded-lg transition-all shrink-0">
                {tier === "top" ? "Manage Your Featured Sectors" : "Upgrade for Homepage Priority"}
              </Link>
            </div>
          )}

          {/* Industry Directory Table */}
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
            {/* Table header */}
            <div className="grid grid-cols-12 bg-gray-50 dark:bg-gray-955 border-b border-gray-200 dark:border-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-wider px-5 py-3">
              <span className="col-span-4">Industry</span>
              <span className="col-span-2 text-center">Companies</span>
              <span className="col-span-2 text-center">Growth</span>
              <span className="col-span-2 text-center">Top Company</span>
              <span className="col-span-2 text-center">Action</span>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-850">
              {SECTOR_DATA.map((sector, idx) => (
                <div key={idx} className={`grid grid-cols-12 px-5 py-3.5 items-center hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors ${sector.featured && tier !== "registered" ? "bg-amber-50/30 dark:bg-amber-950/5" : ""}`}>
                  <div className="col-span-4 flex items-center gap-2.5">
                    <span className="text-lg">{sector.icon}</span>
                    <div>
                      <span className="font-bold text-xs text-gray-900 dark:text-white block">{sector.name}</span>
                      {sector.featured && tier !== "registered" && (
                        <span className={`text-[7px] font-bold ${tc.textAccent} uppercase`}>Featured</span>
                      )}
                    </div>
                  </div>
                  <div className="col-span-2 text-center font-bold text-xs text-gray-700 dark:text-gray-300">{sector.count}</div>
                  <div className="col-span-2 text-center font-bold text-xs text-emerald-500">{sector.growth}</div>
                  <div className="col-span-2 text-center text-[10px] text-gray-500">{sector.topCo}</div>
                  <div className="col-span-2 text-center">
                    <Link href="/eoi" className={`${tc.btnPrimary} text-[9px] font-bold px-2.5 py-1 rounded-lg transition-all`}>
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Industry Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Total Companies", val: "12,400+", icon: Building2, color: "text-blue-500" },
              { label: "Verified Companies", val: "3,200+", icon: CheckCircle, color: "text-emerald-500" },
              { label: "Enterprise Listings", val: "420+", icon: Crown, color: "text-amber-500" },
              { label: "Industries Covered", val: "50+", icon: Globe, color: "text-purple-500" }
            ].map((stat, idx) => {
              const SIcon = stat.icon;
              return (
                <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 p-5 rounded-2xl shadow-xs text-center space-y-2">
                  <SIcon className={`h-6 w-6 mx-auto ${stat.color}`} />
                  <div className="font-display text-lg font-bold text-gray-950 dark:text-white">{stat.val}</div>
                  <div className="text-[10px] text-gray-450">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Upgrade CTA (for non-enterprise) */}
          {tier !== "top" && (
            <div className="bg-gradient-to-r from-slate-950 to-[#162d54] text-white p-8 rounded-3xl border border-slate-900 text-center space-y-4">
              <Crown className="h-8 w-8 text-amber-400 mx-auto" />
              <h3 className="font-display text-xl font-bold">Get Homepage Featured Placement</h3>
              <p className="text-slate-400 text-sm font-normal max-w-lg mx-auto">Enterprise companies get homepage-featured sector placements, premium search priority, and sponsored promotions across the platform.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/eoi" className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-sm px-8 py-3 rounded-xl transition-all">
                  Upgrade to Enterprise
                </Link>
                <Link href="/eoi" className="border border-white/20 hover:bg-white/10 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all">
                  View Pricing Plans
                </Link>
              </div>
            </div>
          )}

        </section>
      </div>
    );
  }

  return null;
}

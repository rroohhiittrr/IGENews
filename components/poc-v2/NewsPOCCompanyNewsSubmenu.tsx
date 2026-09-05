"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import RegisteredCompanyPagesView from "./RegisteredCompanyPagesView";
import RegisteredCompanyNewsView from "./RegisteredCompanyNewsView";
import RegisteredCompanySectorView from "./RegisteredCompanySectorView";
import RegisteredCompanyAllSectorsView from "./RegisteredCompanyAllSectorsView";
import VerifiedCompanyPagesView from "./VerifiedCompanyPagesView";
import VerifiedCompanyNewsView from "./VerifiedCompanyNewsView";
import VerifiedCompanyBySectorView from "./VerifiedCompanyBySectorView";
import VerifiedCompanyAllSectorsView from "./VerifiedCompanyAllSectorsView";
import TopCompanyPagesView from "./TopCompanyPagesView";
import TopCompanyNewsView from "./TopCompanyNewsView";
import TopCompanyBySectorView from "./TopCompanyBySectorView";
import TopCompanyAllSectorsView from "./TopCompanyAllSectorsView";
import {
  Building2, CheckCircle, Crown, Search, TrendingUp, ChevronRight,
  ArrowLeft, Star, Briefcase, MapPin, Users, BarChart2,
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
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const tc = TIER_CONFIG[tier];
  const TierIcon = tc.icon;
  const company = COMPANY_PROFILES[tier];
  const news = SAMPLE_NEWS[tier];
  const leadership = LEADERSHIP[tier];

  const tierPath = `/en/poc-v2/company-news`;

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
    if (tier === "registered") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <RegisteredCompanyPagesView />
        </div>
      );
    }
    if ((tier as string) === "verified") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <VerifiedCompanyPagesView />
        </div>
      );
    }

    // Enterprise / Top Companies → Company Pages
    // Discovery, ranking, comparison & business-intelligence hub (NOT a single-company profile).
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />
        <TopCompanyPagesView />
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // VIEW 2 ── COMPANY NEWS (News Publishing Hub)
  // ══════════════════════════════════════════════════════════════════════════
  if (submenu === "news") {
    if (tier === "registered") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <RegisteredCompanyNewsView />
        </div>
      );
    }

    if ((tier as string) === "verified") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <VerifiedCompanyNewsView />
        </div>
      );
    }

    // Enterprise / Top Companies → Company News
    // Aggregated multi-company news & corporate-intelligence hub (NOT a single-company newsroom).
    if (tier === "top") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
          <SubMenuTabs />
          <TopCompanyNewsView />
        </div>
      );
    }

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />

      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // VIEW 3 ── BY SECTOR (Company Discovery by Industry)
  // ══════════════════════════════════════════════════════════════════════════
  if (submenu === "sector") {
    if (tier === "registered") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <RegisteredCompanySectorView />
        </div>
      );
    }

    if ((tier as string) === "verified") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100">
          <SubMenuTabs />
          <VerifiedCompanyBySectorView />
        </div>
      );
    }

    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />
        <TopCompanyBySectorView />
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════════════════
  // VIEW 4 ── ALL SECTORS (Full Industry Directory)
  // ══════════════════════════════════════════════════════════════════════════
  if (submenu === "all") {
    if ((tier as string) === "registered") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
          <SubMenuTabs />
          <RegisteredCompanyAllSectorsView />
        </div>
      );
    }
    if ((tier as string) === "verified") {
      return (
        <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
          <SubMenuTabs />
          <VerifiedCompanyAllSectorsView />
        </div>
      );
    }
    // Enterprise / Top Companies → All Sectors
    // Master sector discovery & business-intelligence hub (NOT a single-sector view).
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuTabs />
        <TopCompanyAllSectorsView />
      </div>
    );
  }

  return null;
}

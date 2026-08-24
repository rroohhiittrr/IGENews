"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
import NewsPOCMyCountryView from "./NewsPOCMyCountryView";
import NewsPOCAllCountryView from "./NewsPOCAllCountryView";
import NewsPOCCountryIntelligenceView from "./NewsPOCCountryIntelligenceView";
import {
  ArrowLeft,
  Award,
  BarChart2,
  Bell,
  Bookmark,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Crown,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  Lock,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Mic,
  Plus,
  Search,
  Share2,
  Shield,
  ShieldAlert,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  User,
  Users,
  Zap,
  ThumbsUp,
  Flag,
  Scale,
  Compass,
  ArrowRight,
  Layers,
  Building,
  Check,
  Coins
} from "lucide-react";

type Submenu = "my" | "all" | "intelligence";

interface Props {
  submenu: Submenu;
}

const SUBMENU_CONFIG: Record<Submenu, {
  label: string;
  sublabel: string;
  purpose: string;
  icon: ComponentType<{ className?: string }>;
  gradFrom: string;
  gradTo: string;
  badgeBg: string;
  button: string;
}> = {
  my: {
    label: "My Country Dashboard",
    sublabel: "Personalized Country Intelligence & News Feed",
    purpose: "Access country snapshot, economic metrics, trade leads, and local company profiles.",
    icon: Flag,
    gradFrom: "from-blue-600",
    gradTo: "to-indigo-700",
    badgeBg: "bg-blue-600",
    button: "bg-blue-600 hover:bg-blue-700 text-white"
  },
  all: {
    label: "All Countries (195 Bilateral)",
    sublabel: "Global Directory, Bilateral Trade Explorer & Comparison",
    purpose: "Discover 195 countries, explore bilateral trade flows, and compare economies side-by-side.",
    icon: Globe,
    gradFrom: "from-emerald-600",
    gradTo: "to-teal-700",
    badgeBg: "bg-emerald-600",
    button: "bg-emerald-600 hover:bg-emerald-700 text-white"
  },
  intelligence: {
    label: "Country Intelligence",
    sublabel: "Bilateral Trade Flow Visualizers, AI Risk & Report Store",
    purpose: "View AI risk scores, tariff phase-out schedules, buy reports, and order custom consulting.",
    icon: Sparkles,
    gradFrom: "from-purple-600",
    gradTo: "to-indigo-700",
    badgeBg: "bg-purple-600",
    button: "bg-purple-600 hover:bg-purple-700 text-white"
  }
};

const COUNTRIES_195_SAMPLE = [
  { name: "India", flag: "🇮🇳", capital: "New Delhi", gdp: "$3.75T", growth: "+6.8%", region: "APAC", trade: "$1.11T" },
  { name: "United Arab Emirates", flag: "🇦🇪", capital: "Abu Dhabi", gdp: "$507B", growth: "+3.8%", region: "MENA", trade: "$87.2B" },
  { name: "United States", flag: "🇺🇸", capital: "Washington D.C.", gdp: "$27.9T", growth: "+2.5%", region: "NAM", trade: "$191.8B" },
  { name: "Germany", flag: "🇩🇪", capital: "Berlin", gdp: "$4.46T", growth: "+1.2%", region: "EUR", trade: "$30.8B" },
  { name: "Singapore", flag: "🇸🇬", capital: "Singapore", gdp: "$501B", growth: "+3.1%", region: "APAC", trade: "$35.6B" },
  { name: "Japan", flag: "🇯🇵", capital: "Tokyo", gdp: "$4.21T", growth: "+1.4%", region: "APAC", trade: "$21.4B" },
  { name: "United Kingdom", flag: "🇬🇧", capital: "London", gdp: "$3.34T", growth: "+1.1%", region: "EUR", trade: "$24.2B" },
  { name: "South Korea", flag: "🇰🇷", capital: "Seoul", gdp: "$1.71T", growth: "+2.2%", region: "APAC", trade: "$27.8B" }
];

const BILATERAL_CORRIDORS = [
  { countryA: "India 🇮🇳", countryB: "USA 🇺🇸", totalValue: "$191.8B", exportsA: "$118.4B", exportsB: "$73.4B", agreement: "Critical & Emerging Tech (iCET)", status: "Active" },
  { countryA: "India 🇮🇳", countryB: "UAE 🇦🇪", totalValue: "$87.2B", exportsA: "$31.6B", exportsB: "$55.6B", agreement: "CEPA Accord", status: "Active" },
  { countryA: "India 🇮🇳", countryB: "Germany 🇩🇪", totalValue: "$30.8B", exportsA: "$10.2B", exportsB: "$20.6B", agreement: "Green Hydrogen Corridor", status: "Active" },
  { countryA: "India 🇮🇳", countryB: "Singapore 🇸🇬", totalValue: "$35.6B", exportsA: "$12.1B", exportsB: "$23.5B", agreement: "CECA & PayNow-UPI", status: "Active" }
];

const COUNTRY_INTELLIGENCE_KPIS = [
  { label: "Top Strategic Corridor", val: "India ⇄ UAE", sub: "$87.2B Bilateral (CEPA Active)", color: "text-purple-600", icon: Globe },
  { label: "Total Tracked Corridors", val: "195 Countries", sub: "1,200+ Bilateral Trade Pairs", color: "text-blue-600", icon: BarChart2 },
  { label: "Global Trade Risk Average", val: "21.4 / 100", sub: "Low Risk Environment Index", color: "text-emerald-500", icon: Target },
  { label: "Active Trade Alerts", val: "4 Key Lanes", sub: "Red Sea & CBAM Compliance", color: "text-amber-500", icon: ShieldAlert }
];

const PREDICTIVE_COUNTRY_SIGNALS = [
  {
    name: "India-UAE Logistics Expansion",
    sig: "SIGNAL: HIGH CONFIDENCE (88%)",
    desc: "Bilateral non-oil trade target of $100B by 2030 supported by direct container terminals and CEPA tariff phase-outs.",
    w: "88%",
    color: "bg-purple-600"
  },
  {
    name: "US-India Semiconductor Reshoring",
    sig: "SIGNAL: HIGH ACCELERATION (92%)",
    desc: "iCET capital frameworks accelerate fab equipment imports and OSAT test-assembly volume shipments.",
    w: "92%",
    color: "bg-blue-600"
  },
  {
    name: "European CBAM Carbon Boundary Compliance",
    sig: "SIGNAL: MODERATE RISK (68%)",
    desc: "New carbon declaration benchmarks for steel and aluminium exports to EU ports take effect Q4 2026.",
    w: "68%",
    color: "bg-amber-500"
  }
];

const LEADERSHIP_SIGNALS_DATA = [
  {
    name: "Jonathan Hayes",
    des: "Minister of Trade, UK",
    text: "We are finalizing the framework for the digital trade corridor, expecting a 30% reduction in customs processing overhead by Q3.",
    status: "Positive Growth",
    col: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800"
  },
  {
    name: "Sarah Lin",
    des: "CEO, Pacific Logistics Group",
    text: "Capacity constraints at major west coast ports remain a structural issue. We advise clients to diversify entry points through secondary hubs.",
    status: "Neutral / Cautious",
    col: "text-amber-600 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800"
  },
  {
    name: "Carlos Mendoza",
    des: "Head of Commodities, Banco Sur",
    text: "Agricultural export tariffs introduced overnight will impact Q2 forecasts. Immediate margin recalculation is advised.",
    status: "Risk Alert",
    col: "text-red-600 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800"
  }
];

const MARKET_PERFORMANCE_DATA = [
  { market: "India", vol: "$112.4B", growth: "+8.2%", risk: "LOW RISK", riskColor: "text-emerald-500" },
  { market: "Vietnam", vol: "$94.8B", growth: "+11.5%", risk: "MODERATE", riskColor: "text-amber-500" },
  { market: "UAE", vol: "$87.2B", growth: "+18.4%", risk: "LOW RISK", riskColor: "text-emerald-500" },
  { market: "Mexico", vol: "$68.4B", growth: "+6.2%", risk: "MODERATE", riskColor: "text-amber-500" }
];

const AI_RISK_SCORES = [
  { country: "United Arab Emirates 🇦🇪", riskScore: 18, riskLevel: "LOW RISK", tariffTrend: "-12% Tariff Reductions", fdiOutlook: "Very Strong (+21%)" },
  { country: "United States 🇺🇸", riskScore: 22, riskLevel: "LOW RISK", tariffTrend: "Stable MFN Tariffs", fdiOutlook: "Robust (+14%)" },
  { country: "Germany 🇩🇪", riskScore: 28, riskLevel: "MODERATE", tariffTrend: "EU Carbon Adjustment Tax", fdiOutlook: "Steady (+9%)" },
  { country: "Vietnam 🇻🇳", riskScore: 24, riskLevel: "LOW RISK", tariffTrend: "ASEAN Single Window", fdiOutlook: "Accelerating (+28%)" }
];

const INTELLIGENCE_REPORTS = [
  { id: "rep-1", title: "2026 India-US Bilateral Critical Tech & Semiconductor Intelligence", code: "REP-BILA-US", price: "$299", category: "Bilateral Trade", pages: "92 pages", downloads: 1420 },
  { id: "rep-2", title: "India-UAE CEPA Tariff Phase-Out & Maritime Corridor Guide", code: "REP-BILA-UAE", price: "$249", category: "CEPA Accord", pages: "78 pages", downloads: 1890 },
  { id: "rep-3", title: "India-EU Broad-Based Trade Accord & Regulatory Matrix", code: "REP-BILA-EU", price: "$199", category: "EU Policy", pages: "65 pages", downloads: 1150 }
];

const AI_COUNTRY_PREVIEWS: Record<string, { summary: string; developments: string; impact: string; opportunities: string; risks: string; outlook: string }> = {
  India: {
    summary: "India shows strong growth trends in electronics OSAT packaging and renewable infrastructure corridors.",
    developments: "🔒 Key Developments: Accelerated PLI chip assemblies disbursements",
    impact: "🔒 Business Impact: Reduced customs clearance latency for electronics OEMs",
    opportunities: "🔒 Opportunities: Bilateral trade treaty tariff reductions with EU nodes",
    risks: "🔒 Risks: Power grid transmission integration delays",
    outlook: "🔒 12-Month Outlook: Capital flow expansion matching Southeast Asian supply chains"
  },
  "United States": {
    summary: "US-India bilateral trade corridors commands double-digit software and critical aerospace design premiums.",
    developments: "🔒 Key Developments: Joint tech accords signed in Washington",
    impact: "🔒 Business Impact: Simplified FDI compliance structures for tech startups",
    opportunities: "🔒 Opportunities: Advanced manufacturing co-development ventures",
    risks: "🔒 Risks: Macroeconomic interest rates and FX index volatility",
    outlook: "🔒 12-Month Outlook: Strong bilateral commerce volume expansion"
  },
  UAE: {
    summary: "UAE-India CEPA corridors accelerate supply flow through single-window digital customs integrations.",
    developments: "🔒 Key Developments: Digital customs API deployment across UAE ports",
    impact: "🔒 Business Impact: Logistics transit times dropped by 38% under CEPA rules",
    opportunities: "🔒 Opportunities: GCC-wide logistics distribution partnerships",
    risks: "🔒 Risks: Shipping corridor container capacity shortages",
    outlook: "🔒 12-Month Outlook: Non-oil trade flow target of $100B reached ahead of schedule"
  }
};

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs ${className}`}>
      {children}
    </div>
  );
}

function SectionTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-800 pb-3">
      <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">{title}</h2>
      {action}
    </div>
  );
}

export default function NewsPOCCountryNewsSubmenu({ submenu }: Props) {
  const router = useRouter();
  const cfg = SUBMENU_CONFIG[submenu];
  const IconComp = cfg.icon;
  const basePath = "/en/news-poc/country-news";

  const [selectedCountryA, setSelectedCountryA] = useState("India 🇮🇳");
  const [selectedCountryB, setSelectedCountryB] = useState("UAE 🇦🇪");
  const [aiPreviewCountry, setAiPreviewCountry] = useState<string>("India");

  const SubMenuHeader = () => (
    <div className="mx-auto max-w-7xl px-4 lg:px-6">
      <div className="flex items-center gap-2 py-4 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => router.push(basePath)}
          className="p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all mr-1"
          aria-label="Go back to Country News main page"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <div className={`bg-gradient-to-r ${cfg.gradFrom} ${cfg.gradTo} text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shrink-0 shadow-xs`}>
          <IconComp className="h-3.5 w-3.5" />
          <span className="text-[10px] font-bold">{cfg.label}</span>
        </div>

        <div className="flex gap-1 flex-wrap">
          {(["my", "all", "intelligence"] as Submenu[]).map((s) => (
            <button
              key={s}
              onClick={() => router.push(`${basePath}/${s}`)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                submenu === s
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
              }`}
            >
              {SUBMENU_CONFIG[s].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const HeroBanner = ({ title, description }: { title: string; description: string }) => (
    <section className={`bg-gradient-to-br ${cfg.gradFrom} ${cfg.gradTo} text-white relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 lg:px-6">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <IconComp className="h-4 w-4 text-white/80" />
            <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{cfg.sublabel}</span>
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
          <p className="text-white/80 text-xs md:text-sm font-normal leading-relaxed">{description}</p>
        </div>
      </div>
    </section>
  );

  // VIEW 1: MY COUNTRY DASHBOARD
  if (submenu === "my") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <NewsPOCMyCountryView />
      </div>
    );
  }

  // VIEW 2: ALL COUNTRIES (195 Bilateral Explorer)
  if (submenu === "all") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <NewsPOCAllCountryView />
      </div>
    );
  }

  // VIEW 3: INTELLIGENCE (Comprehensive Country Intelligence & Bilateral Analytics)
  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
      <SubMenuHeader />
      <NewsPOCCountryIntelligenceView />
    </div>
  );
}
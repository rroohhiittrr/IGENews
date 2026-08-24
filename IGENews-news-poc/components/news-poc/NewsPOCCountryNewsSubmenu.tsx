"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentType, ReactNode } from "react";
import { useState } from "react";
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
  Crown,
  Download,
  Eye,
  FileText,
  Filter,
  Globe,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Mic,
  Plus,
  Search,
  Share2,
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
  Coins,
  Shield
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
        <div className="flex flex-col lg:flex-row gap-6 lg:items-end justify-between">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
                <IconComp className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">{cfg.sublabel}</span>
            </div>
            <h1 className="font-display text-2xl md:text-4xl font-bold tracking-tight">{title}</h1>
            <p className="text-sm text-white/85 leading-relaxed font-normal">{description}</p>
          </div>
          
          <div className="flex gap-2">
            <Link href="/eoi" className="bg-white text-gray-950 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-gray-100 transition-all">
              Explore Countries
            </Link>
            <Link href="/eoi" className="bg-white/15 border border-white/20 text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-white/25 transition-all">
              Download Reports
            </Link>
          </div>
        </div>
      </div>
    </section>
  );

  // VIEW 1: MY COUNTRY (Personalized Dashboard)
  if (submenu === "my") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <HeroBanner
          title="My Country Intelligence Dashboard (India 🇮🇳)"
          description="Personalized country news, macro indicators, trade leads, and FDI project updates."
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          
          {/* Country Snapshot */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "GDP Nominal", val: "$3.75 Trillion", sub: "+6.8% Growth", icon: Globe, color: "text-blue-500" },
              { label: "Population", val: "1.42 Billion", sub: "52% Under 30", icon: Users, color: "text-emerald-500" },
              { label: "Total Trade Volume", val: "$1.11 Trillion", sub: "+12.4% YoY", icon: TrendingUp, color: "text-purple-500" },
              { label: "Currency Stability", val: "INR (₹ 83.4 / $)", sub: "Stable Band", icon: Coins, color: "text-amber-500" }
            ].map((snap, idx) => {
              const SIcon = snap.icon;
              return (
                <Card key={idx} className="p-4 space-y-1.5">
                  <SIcon className={`h-5 w-5 ${snap.color}`} />
                  <span className="text-[9px] font-bold text-gray-400 uppercase block">{snap.label}</span>
                  <div className="font-display text-lg font-bold text-gray-900 dark:text-white">{snap.val}</div>
                  <span className="text-[9px] text-emerald-500 font-bold block">{snap.sub}</span>
                </Card>
              );
            })}
          </div>

          {/* Today's Country News & Trade Opportunities */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-8 space-y-4">
              <SectionTitle title="Today's Country News & Briefings" />
              {[
                { title: "Union Budget Infrastructure Allocation Boosts Port Interconnectivity by $12 Billion", date: "45m ago", readTime: "5 min", sector: "Infrastructure", views: "2.1K" },
                { title: "National Quantum & AI Hardware Mission Releases $600M Capital Subsidies", date: "2h ago", readTime: "4 min", sector: "AI & Electronics", views: "1.8K" },
                { title: "Agritech Export Volumes Surge 16% to European Distribution Hubs", date: "4h ago", readTime: "6 min", sector: "Agriculture", views: "1.4K" }
              ].map((news, idx) => (
                <Card key={idx} className="p-4 space-y-1.5 hover:border-blue-500 transition-all">
                  <div className="flex items-center justify-between text-[8px] font-bold text-gray-400">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{news.sector}</span>
                    <span>{news.date} · {news.readTime}</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{news.title}</h3>
                  <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1">
                    <span>Source: iGEN Country Desk</span>
                    <span className="flex items-center gap-0.5"><Eye className="h-3 w-3" />{news.views}</span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="col-span-12 lg:col-span-4 space-y-5">
              <Card className="p-4 space-y-3">
                <SectionTitle title="Trade Opportunities" action={<Target className="h-4 w-4 text-emerald-500" />} />
                {[
                  { title: "Phytochemical Extracts to EU Ports", buyer: "German Pharma Co.", val: "$4.2M" },
                  { title: "Solar Cell Modules to UAE Grid", buyer: "Abu Dhabi Energy", val: "$12.8M" }
                ].map((opp, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 space-y-1">
                    <span className="text-[8px] font-bold text-emerald-600 uppercase block">ACTIVE BUY LEAD</span>
                    <h5 className="text-[10px] font-bold text-gray-900 dark:text-white leading-snug">{opp.title}</h5>
                    <div className="flex items-center justify-between text-[9px] pt-1">
                      <span className="text-gray-400">{opp.buyer}</span>
                      <span className="font-bold text-emerald-600">{opp.val}</span>
                    </div>
                  </div>
                ))}
              </Card>

              <Card className="p-4 space-y-3">
                <SectionTitle title="AI Country Risk Alerts" action={<Shield className="h-4 w-4 text-amber-500" />} />
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-amber-700 dark:text-amber-400 block">LOW GEOPOLITICAL RISK</span>
                  <p className="text-[10px] text-amber-800 dark:text-amber-300 font-normal">Macroeconomic stability index rating: 18/100 (Optimal rating for FDI commitments).</p>
                </div>
              </Card>
            </div>
          </div>

        </section>
      </div>
    );
  }

  // VIEW 2: ALL COUNTRIES (195 Bilateral Directory & Comparison)
  if (submenu === "all") {
    return (
      <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
        <SubMenuHeader />
        <HeroBanner
          title="All 195 Countries Bilateral Directory & Comparison"
          description="Explore 195 countries, inspect bilateral trade flows, and compare macro indicators side-by-side."
        />

        <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
          
          {/* Bilateral Trade Explorer (Interactive Country A ↔ Country B) */}
          <Card className="p-6 space-y-4 border-blue-500/30">
            <SectionTitle title="Interactive Bilateral Trade Explorer" action={<Compass className="h-4 w-4 text-blue-500" />} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Country A (Origin)</label>
                <select value={selectedCountryA} onChange={(e) => setSelectedCountryA(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs font-bold outline-none">
                  <option>India 🇮🇳</option>
                  <option>USA 🇺🇸</option>
                  <option>UAE 🇦🇪</option>
                  <option>Germany 🇩🇪</option>
                  <option>Singapore 🇸🇬</option>
                </select>
              </div>

              <div className="text-center font-display font-bold text-sm text-blue-600">
                ⚡ BILATERAL CORRIDOR ⚡
              </div>

              <div>
                <label className="text-[9px] font-bold text-gray-400 uppercase block mb-1">Country B (Destination)</label>
                <select value={selectedCountryB} onChange={(e) => setSelectedCountryB(e.target.value)} className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-xs font-bold outline-none">
                  <option>UAE 🇦🇪</option>
                  <option>USA 🇺🇸</option>
                  <option>Germany 🇩🇪</option>
                  <option>Singapore 🇸🇬</option>
                  <option>Japan 🇯🇵</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-[9px] text-gray-400 uppercase block">Selected Corridor</span>
                <span className="font-bold text-gray-900 dark:text-white">{selectedCountryA} ↔ {selectedCountryB}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 uppercase block">Bilateral Trade Output</span>
                <span className="font-bold text-blue-600">$87.2 Billion</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 uppercase block">YoY Corridor Growth</span>
                <span className="font-bold text-emerald-500">+18.4%</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 uppercase block">Trade Accord</span>
                <span className="font-bold text-purple-600">CEPA Accord (Active)</span>
              </div>
              <Link href="/eoi" className="bg-blue-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg">
                View Full Corridor Datapack
              </Link>
            </div>
          </Card>

          {/* 195 Country Directory Grid */}
          <div className="space-y-4">
            <SectionTitle title="195 Countries Directory" action={<span className="text-[10px] font-bold text-gray-400">Showing sample 8 / 195</span>} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {COUNTRIES_195_SAMPLE.map((c, idx) => (
                <Card key={idx} className="p-4 hover:border-emerald-500 transition-all space-y-2 group">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">{c.growth} YoY</span>
                  </div>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-snug">{c.name}</h3>
                  <p className="text-[10px] text-gray-500">Capital: {c.capital} · Region: {c.region}</p>
                  <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[9px]">
                    <span className="text-gray-400">GDP: {c.gdp}</span>
                    <span className="text-blue-600 font-bold">Trade: {c.trade}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

        </section>
      </div>
    );
  }

  // VIEW 3: INTELLIGENCE (Country Intelligence, Risk AI & Reports)
  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-16">
      <SubMenuHeader />
      <HeroBanner
        title="Country Intelligence, AI Risk Scorecards & Market Research Store"
        description="View AI country risk scores (0-100), tariff phase-out schedules, buy reports, and order custom consulting."
      />

      <section className="mx-auto max-w-7xl px-4 pt-8 lg:px-6 space-y-8">
        
        {/* AI Country Risk Scorecards */}
        <div className="space-y-4">
          <SectionTitle title="AI Country Risk Scorecards & Tariff Outlook" action={<Sparkles className="h-4 w-4 text-amber-500" />} />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {AI_RISK_SCORES.map((r, idx) => (
              <Card key={idx} className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-gray-900 dark:text-white">{r.country}</h4>
                  <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600">{r.riskLevel}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[8px] text-gray-400 block uppercase">Risk Score (0-100)</span>
                  <div className="font-display text-xl font-bold text-blue-600">{r.riskScore} / 100</div>
                </div>
                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-1 text-[9px]">
                  <span className="text-gray-500 block font-semibold">{r.tariffTrend}</span>
                  <span className="text-emerald-600 block font-bold">{r.fdiOutlook}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium Country Reports Store */}
        <div className="space-y-4">
          <SectionTitle title="Country Research & Bilateral Intelligence Reports" action={<span className="text-[10px] font-bold text-purple-600">PDF Datapacks</span>} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INTELLIGENCE_REPORTS.map((rep) => (
              <Card key={rep.id} className="p-5 space-y-3 flex flex-col justify-between hover:border-purple-500 transition-all group">
                <div>
                  <div className="flex items-center justify-between text-[8px] font-bold text-gray-400">
                    <span>{rep.code}</span>
                    <span className="text-purple-600 font-bold">{rep.category}</span>
                  </div>
                  <h3 className="text-xs font-bold text-gray-950 dark:text-white mt-2 leading-snug group-hover:text-purple-600 transition-colors">{rep.title}</h3>
                  <span className="text-[9px] text-gray-400 block mt-1">{rep.pages} · {rep.downloads} downloads</span>
                </div>

                <div className="pt-2 border-t border-gray-100 dark:border-gray-850 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-base font-bold text-gray-900 dark:text-white">{rep.price}</span>
                    <Link href="/eoi" className="bg-emerald-500 hover:bg-emerald-600 text-white text-[9px] font-bold px-3 py-1.5 rounded-lg transition-colors">
                      Buy Report
                    </Link>
                  </div>
                  <Link href="/eoi" className="w-full text-center border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 text-[9px] font-bold py-1.5 rounded-lg block hover:bg-gray-100 dark:hover:bg-gray-900">
                    Download Sample PDF
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom RFP / Enterprise Consulting Request Form */}
        <Card className="p-6 bg-gradient-to-br from-slate-950 to-[#102747] text-white border border-blue-900/60 shadow-lg space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[9px] font-bold text-blue-400 uppercase tracking-widest">Enterprise Advisory</span>
              <h3 className="text-base font-bold text-white mt-1">Order Custom Country Intelligence & Bilateral Tariff Audits</h3>
              <p className="text-xs text-slate-300 font-normal mt-0.5">Need customized country risk modeling, tariff impact audits, or trade mission advisory? Submit a custom research request.</p>
            </div>
            <Link href="/eoi" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shrink-0">
              Submit RFP / Inquiry
            </Link>
          </div>
        </Card>

      </section>
    </div>
  );
}
